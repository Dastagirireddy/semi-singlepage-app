System.register(['../../Subject', '../../Subscriber', '../../Observable', '../../Subscription', '../../util/root', '../../ReplaySubject', '../../util/tryCatch', '../../util/errorObject', '../../util/assign'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subject_1, Subscriber_1, Observable_1, Subscription_1, root_1, ReplaySubject_1, tryCatch_1, errorObject_1, assign_1;
    var WebSocketSubject;
    return {
        setters:[
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
            },
            function (root_1_1) {
                root_1 = root_1_1;
            },
            function (ReplaySubject_1_1) {
                ReplaySubject_1 = ReplaySubject_1_1;
            },
            function (tryCatch_1_1) {
                tryCatch_1 = tryCatch_1_1;
            },
            function (errorObject_1_1) {
                errorObject_1 = errorObject_1_1;
            },
            function (assign_1_1) {
                assign_1 = assign_1_1;
            }],
        execute: function() {
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @extends {Ignored}
             * @hide true
             */
            WebSocketSubject = (function (_super) {
                __extends(WebSocketSubject, _super);
                function WebSocketSubject(urlConfigOrSource, destination) {
                    if (urlConfigOrSource instanceof Observable_1.Observable) {
                        _super.call(this, destination, urlConfigOrSource);
                    }
                    else {
                        _super.call(this);
                        this.WebSocketCtor = root_1.root.WebSocket;
                        this._output = new Subject_1.Subject();
                        if (typeof urlConfigOrSource === 'string') {
                            this.url = urlConfigOrSource;
                        }
                        else {
                            // WARNING: config object could override important members here.
                            assign_1.assign(this, urlConfigOrSource);
                        }
                        if (!this.WebSocketCtor) {
                            throw new Error('no WebSocket constructor can be found');
                        }
                        this.destination = new ReplaySubject_1.ReplaySubject();
                    }
                }
                WebSocketSubject.prototype.resultSelector = function (e) {
                    return JSON.parse(e.data);
                };
                /**
                 * @param urlConfigOrSource
                 * @return {WebSocketSubject}
                 * @static true
                 * @name webSocket
                 * @owner Observable
                 */
                WebSocketSubject.create = function (urlConfigOrSource) {
                    return new WebSocketSubject(urlConfigOrSource);
                };
                WebSocketSubject.prototype.lift = function (operator) {
                    var sock = new WebSocketSubject(this, this.destination);
                    sock.operator = operator;
                    return sock;
                };
                // TODO: factor this out to be a proper Operator/Subscriber implementation and eliminate closures
                WebSocketSubject.prototype.multiplex = function (subMsg, unsubMsg, messageFilter) {
                    var self = this;
                    return new Observable_1.Observable(function (observer) {
                        var result = tryCatch_1.tryCatch(subMsg)();
                        if (result === errorObject_1.errorObject) {
                            observer.error(errorObject_1.errorObject.e);
                        }
                        else {
                            self.next(result);
                        }
                        var subscription = self.subscribe(function (x) {
                            var result = tryCatch_1.tryCatch(messageFilter)(x);
                            if (result === errorObject_1.errorObject) {
                                observer.error(errorObject_1.errorObject.e);
                            }
                            else if (result) {
                                observer.next(x);
                            }
                        }, function (err) { return observer.error(err); }, function () { return observer.complete(); });
                        return function () {
                            var result = tryCatch_1.tryCatch(unsubMsg)();
                            if (result === errorObject_1.errorObject) {
                                observer.error(errorObject_1.errorObject.e);
                            }
                            else {
                                self.next(result);
                            }
                            subscription.unsubscribe();
                        };
                    });
                };
                WebSocketSubject.prototype._connectSocket = function () {
                    var _this = this;
                    var WebSocketCtor = this.WebSocketCtor;
                    var socket = this.protocol ?
                        new WebSocketCtor(this.url, this.protocol) :
                        new WebSocketCtor(this.url);
                    this.socket = socket;
                    var subscription = new Subscription_1.Subscription(function () {
                        _this.socket = null;
                        if (socket && socket.readyState === 1) {
                            socket.close();
                        }
                    });
                    var observer = this._output;
                    socket.onopen = function (e) {
                        var openObserver = _this.openObserver;
                        if (openObserver) {
                            openObserver.next(e);
                        }
                        var queue = _this.destination;
                        _this.destination = Subscriber_1.Subscriber.create(function (x) { return socket.readyState === 1 && socket.send(x); }, function (e) {
                            var closingObserver = _this.closingObserver;
                            if (closingObserver) {
                                closingObserver.next(undefined);
                            }
                            if (e && e.code) {
                                socket.close(e.code, e.reason);
                            }
                            else {
                                observer.error(new TypeError('WebSocketSubject.error must be called with an object with an error code, ' +
                                    'and an optional reason: { code: number, reason: string }'));
                            }
                            _this.destination = new ReplaySubject_1.ReplaySubject();
                            _this.socket = null;
                        }, function () {
                            var closingObserver = _this.closingObserver;
                            if (closingObserver) {
                                closingObserver.next(undefined);
                            }
                            socket.close();
                            _this.destination = new ReplaySubject_1.ReplaySubject();
                            _this.socket = null;
                        });
                        if (queue && queue instanceof ReplaySubject_1.ReplaySubject) {
                            subscription.add(queue.subscribe(_this.destination));
                        }
                    };
                    socket.onerror = function (e) { return observer.error(e); };
                    socket.onclose = function (e) {
                        var closeObserver = _this.closeObserver;
                        if (closeObserver) {
                            closeObserver.next(e);
                        }
                        if (e.wasClean) {
                            observer.complete();
                        }
                        else {
                            observer.error(e);
                        }
                    };
                    socket.onmessage = function (e) {
                        var result = tryCatch_1.tryCatch(_this.resultSelector)(e);
                        if (result === errorObject_1.errorObject) {
                            observer.error(errorObject_1.errorObject.e);
                        }
                        else {
                            observer.next(result);
                        }
                    };
                };
                WebSocketSubject.prototype._subscribe = function (subscriber) {
                    var _this = this;
                    var source = this.source;
                    if (source) {
                        return source.subscribe(subscriber);
                    }
                    if (!this.socket) {
                        this._connectSocket();
                    }
                    var subscription = new Subscription_1.Subscription();
                    subscription.add(this._output.subscribe(subscriber));
                    subscription.add(function () {
                        var socket = _this.socket;
                        if (socket && socket.readyState === 1) {
                            socket.close();
                            _this.socket = null;
                        }
                    });
                    return subscription;
                };
                WebSocketSubject.prototype.unsubscribe = function () {
                    var _a = this, source = _a.source, socket = _a.socket;
                    if (socket && socket.readyState === 1) {
                        socket.close();
                        this.socket = null;
                    }
                    _super.prototype.unsubscribe.call(this);
                    if (!source) {
                        this.destination = new ReplaySubject_1.ReplaySubject();
                    }
                };
                return WebSocketSubject;
            }(Subject_1.AnonymousSubject));
            exports_1("WebSocketSubject", WebSocketSubject);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29ic2VydmFibGUvZG9tL1dlYlNvY2tldFN1YmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQXNCQTs7OztlQUlHO1lBQ0g7Z0JBQXlDLG9DQUFtQjtnQkEyQjFELDBCQUFZLGlCQUFrRSxFQUFFLFdBQXlCO29CQUN2RyxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsWUFBWSx1QkFBVSxDQUFDLENBQUMsQ0FBQzt3QkFDNUMsa0JBQU0sV0FBVyxFQUFrQixpQkFBaUIsQ0FBQyxDQUFDO29CQUN4RCxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLGlCQUFPLENBQUM7d0JBQ1IsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFJLENBQUMsU0FBUyxDQUFDO3dCQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksaUJBQU8sRUFBSyxDQUFDO3dCQUNoQyxFQUFFLENBQUMsQ0FBQyxPQUFPLGlCQUFpQixLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7NEJBQzFDLElBQUksQ0FBQyxHQUFHLEdBQUcsaUJBQWlCLENBQUM7d0JBQy9CLENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ04sZ0VBQWdFOzRCQUNoRSxlQUFNLENBQUMsSUFBSSxFQUFFLGlCQUFpQixDQUFDLENBQUM7d0JBQ2xDLENBQUM7d0JBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzs0QkFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO3dCQUMzRCxDQUFDO3dCQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSw2QkFBYSxFQUFFLENBQUM7b0JBQ3pDLENBQUM7Z0JBQ0gsQ0FBQztnQkFqQ0QseUNBQWMsR0FBZCxVQUFlLENBQWU7b0JBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFD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LEdBQUcsQ0FBQzt3QkFDUCx5QkFBTSxDQUFVO3dCQUN4QixFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLFVBQVUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN0QyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7NEJBQ2YsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7d0JBQ3JCLENBQUM7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsTUFBTSxDQUFDLFlBQVksQ0FBQztnQkFDdEIsQ0FBQztnQkFFRCxzQ0FBVyxHQUFYO29CQUNFLElBQUEsU0FBK0IsRUFBdkIsa0JBQU0sRUFBRSxrQkFBTSxDQUFVO29CQUNoQyxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLFVBQVUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN0QyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQ3JCLENBQUM7b0JBQ0QsZ0JBQUssQ0FBQyxXQUFXLFdBQUUsQ0FBQztvQkFDcEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUNaLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSw2QkFBYSxFQUFFLENBQUM7b0JBQ3pDLENBQUM7Z0JBQ0gsQ0FBQztnQkFDSCx1QkFBQztZQUFELENBck1BLEFBcU1DLENBck13QywwQkFBZ0IsR0FxTXhEO1lBck1ELCtDQXFNQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29ic2VydmFibGUvZG9tL1dlYlNvY2tldFN1YmplY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N1YmplY3QsIEFub255bW91c1N1YmplY3R9IGZyb20gJy4uLy4uL1N1YmplY3QnO1xuaW1wb3J0IHtTdWJzY3JpYmVyfSBmcm9tICcuLi8uLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAnLi4vLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAnLi4vLi4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7T3BlcmF0b3J9IGZyb20gJy4uLy4uL09wZXJhdG9yJztcbmltcG9ydCB7cm9vdH0gZnJvbSAnLi4vLi4vdXRpbC9yb290JztcbmltcG9ydCB7UmVwbGF5U3ViamVjdH0gZnJvbSAnLi4vLi4vUmVwbGF5U3ViamVjdCc7XG5pbXBvcnQge09ic2VydmVyLCBOZXh0T2JzZXJ2ZXJ9IGZyb20gJy4uLy4uL09ic2VydmVyJztcbmltcG9ydCB7dHJ5Q2F0Y2h9IGZyb20gJy4uLy4uL3V0aWwvdHJ5Q2F0Y2gnO1xuaW1wb3J0IHtlcnJvck9iamVjdH0gZnJvbSAnLi4vLi4vdXRpbC9lcnJvck9iamVjdCc7XG5pbXBvcnQge2Fzc2lnbn0gZnJvbSAnLi4vLi4vdXRpbC9hc3NpZ24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIFdlYlNvY2tldFN1YmplY3RDb25maWcge1xuICB1cmw6IHN0cmluZztcbiAgcHJvdG9jb2w/OiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+O1xuICByZXN1bHRTZWxlY3Rvcj86IDxUPihlOiBNZXNzYWdlRXZlbnQpID0+IFQ7XG4gIG9wZW5PYnNlcnZlcj86IE5leHRPYnNlcnZlcjxFdmVudD47XG4gIGNsb3NlT2JzZXJ2ZXI/OiBOZXh0T2JzZXJ2ZXI8Q2xvc2VFdmVudD47XG4gIGNsb3NpbmdPYnNlcnZlcj86IE5leHRPYnNlcnZlcjx2b2lkPjtcbiAgV2ViU29ja2V0Q3Rvcj86IHsgbmV3KHVybDogc3RyaW5nLCBwcm90b2NvbD86IHN0cmluZ3xBcnJheTxzdHJpbmc+KTogV2ViU29ja2V0IH07XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICogQGhpZGUgdHJ1ZVxuICovXG5leHBvcnQgY2xhc3MgV2ViU29ja2V0U3ViamVjdDxUPiBleHRlbmRzIEFub255bW91c1N1YmplY3Q8VD4ge1xuXG4gIHVybDogc3RyaW5nO1xuICBwcm90b2NvbDogc3RyaW5nfEFycmF5PHN0cmluZz47XG4gIHNvY2tldDogV2ViU29ja2V0O1xuICBvcGVuT2JzZXJ2ZXI6IE5leHRPYnNlcnZlcjxFdmVudD47XG4gIGNsb3NlT2JzZXJ2ZXI6IE5leHRPYnNlcnZlcjxDbG9zZUV2ZW50PjtcbiAgY2xvc2luZ09ic2VydmVyOiBOZXh0T2JzZXJ2ZXI8dm9pZD47XG4gIFdlYlNvY2tldEN0b3I6IHsgbmV3KHVybDogc3RyaW5nLCBwcm90b2NvbD86IHN0cmluZ3xBcnJheTxzdHJpbmc+KTogV2ViU29ja2V0IH07XG5cbiAgcHJpdmF0ZSBfb3V0cHV0OiBTdWJqZWN0PFQ+O1xuXG4gIHJlc3VsdFNlbGVjdG9yKGU6IE1lc3NhZ2VFdmVudCkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKGUuZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHVybENvbmZpZ09yU291cmNlXG4gICAqIEByZXR1cm4ge1dlYlNvY2tldFN1YmplY3R9XG4gICAqIEBzdGF0aWMgdHJ1ZVxuICAgKiBAbmFtZSB3ZWJTb2NrZXRcbiAgICogQG93bmVyIE9ic2VydmFibGVcbiAgICovXG4gIHN0YXRpYyBjcmVhdGU8VD4odXJsQ29uZmlnT3JTb3VyY2U6IHN0cmluZyB8IFdlYlNvY2tldFN1YmplY3RDb25maWcpOiBXZWJTb2NrZXRTdWJqZWN0PFQ+IHtcbiAgICByZXR1cm4gbmV3IFdlYlNvY2tldFN1YmplY3Q8VD4odXJsQ29uZmlnT3JTb3VyY2UpO1xuICB9XG5cbiAgY29uc3RydWN0b3IodXJsQ29uZmlnT3JTb3VyY2U6IHN0cmluZyB8IFdlYlNvY2tldFN1YmplY3RDb25maWcgfCBPYnNlcnZhYmxlPFQ+LCBkZXN0aW5hdGlvbj86IE9ic2VydmVyPFQ+KSB7XG4gICAgaWYgKHVybENvbmZpZ09yU291cmNlIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkge1xuICAgICAgc3VwZXIoZGVzdGluYXRpb24sIDxPYnNlcnZhYmxlPFQ+PiB1cmxDb25maWdPclNvdXJjZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLldlYlNvY2tldEN0b3IgPSByb290LldlYlNvY2tldDtcbiAgICAgIHRoaXMuX291dHB1dCA9IG5ldyBTdWJqZWN0PFQ+KCk7XG4gICAgICBpZiAodHlwZW9mIHVybENvbmZpZ09yU291cmNlID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLnVybCA9IHVybENvbmZpZ09yU291cmNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gV0FSTklORzogY29uZmlnIG9iamVjdCBjb3VsZCBvdmVycmlkZSBpbXBvcnRhbnQgbWVtYmVycyBoZXJlLlxuICAgICAgICBhc3NpZ24odGhpcywgdXJsQ29uZmlnT3JTb3VyY2UpO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLldlYlNvY2tldEN0b3IpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBXZWJTb2NrZXQgY29uc3RydWN0b3IgY2FuIGJlIGZvdW5kJyk7XG4gICAgICB9XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uID0gbmV3IFJlcGxheVN1YmplY3QoKTtcbiAgICB9XG4gIH1cblxuICBsaWZ0PFI+KG9wZXJhdG9yOiBPcGVyYXRvcjxULCBSPik6IFdlYlNvY2tldFN1YmplY3Q8Uj4ge1xuICAgIGNvbnN0IHNvY2sgPSBuZXcgV2ViU29ja2V0U3ViamVjdDxSPih0aGlzLCA8YW55PiB0aGlzLmRlc3RpbmF0aW9uKTtcbiAgICBzb2NrLm9wZXJhdG9yID0gb3BlcmF0b3I7XG4gICAgcmV0dXJuIHNvY2s7XG4gIH1cblxuICAvLyBUT0RPOiBmYWN0b3IgdGhpcyBvdXQgdG8gYmUgYSBwcm9wZXIgT3BlcmF0b3IvU3Vic2NyaWJlciBpbXBsZW1lbnRhdGlvbiBhbmQgZWxpbWluYXRlIGNsb3N1cmVzXG4gIG11bHRpcGxleChzdWJNc2c6ICgpID0+IGFueSwgdW5zdWJNc2c6ICgpID0+IGFueSwgbWVzc2FnZUZpbHRlcjogKHZhbHVlOiBUKSA9PiBib29sZWFuKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8YW55PikgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0ID0gdHJ5Q2F0Y2goc3ViTXNnKSgpO1xuICAgICAgaWYgKHJlc3VsdCA9PT0gZXJyb3JPYmplY3QpIHtcbiAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZXJyb3JPYmplY3QuZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLm5leHQocmVzdWx0KTtcbiAgICAgIH1cblxuICAgICAgbGV0IHN1YnNjcmlwdGlvbiA9IHNlbGYuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0cnlDYXRjaChtZXNzYWdlRmlsdGVyKSh4KTtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gZXJyb3JPYmplY3QpIHtcbiAgICAgICAgICBvYnNlcnZlci5lcnJvcihlcnJvck9iamVjdC5lKTtcbiAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICBvYnNlcnZlci5uZXh0KHgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgICBlcnIgPT4gb2JzZXJ2ZXIuZXJyb3IoZXJyKSxcbiAgICAgICAgKCkgPT4gb2JzZXJ2ZXIuY29tcGxldGUoKSk7XG5cbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRyeUNhdGNoKHVuc3ViTXNnKSgpO1xuICAgICAgICBpZiAocmVzdWx0ID09PSBlcnJvck9iamVjdCkge1xuICAgICAgICAgIG9ic2VydmVyLmVycm9yKGVycm9yT2JqZWN0LmUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGYubmV4dChyZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2Nvbm5lY3RTb2NrZXQoKSB7XG4gICAgY29uc3QgeyBXZWJTb2NrZXRDdG9yIH0gPSB0aGlzO1xuICAgIGNvbnN0IHNvY2tldCA9IHRoaXMucHJvdG9jb2wgP1xuICAgICAgbmV3IFdlYlNvY2tldEN0b3IodGhpcy51cmwsIHRoaXMucHJvdG9jb2wpIDpcbiAgICAgIG5ldyBXZWJTb2NrZXRDdG9yKHRoaXMudXJsKTtcbiAgICB0aGlzLnNvY2tldCA9IHNvY2tldDtcbiAgICBjb25zdCBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCgpID0+IHtcbiAgICAgIHRoaXMuc29ja2V0ID0gbnVsbDtcbiAgICAgIGlmIChzb2NrZXQgJiYgc29ja2V0LnJlYWR5U3RhdGUgPT09IDEpIHtcbiAgICAgICAgc29ja2V0LmNsb3NlKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBvYnNlcnZlciA9IHRoaXMuX291dHB1dDtcblxuICAgIHNvY2tldC5vbm9wZW4gPSAoZTogRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IG9wZW5PYnNlcnZlciA9IHRoaXMub3Blbk9ic2VydmVyO1xuICAgICAgaWYgKG9wZW5PYnNlcnZlcikge1xuICAgICAgICBvcGVuT2JzZXJ2ZXIubmV4dChlKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcXVldWUgPSB0aGlzLmRlc3RpbmF0aW9uO1xuXG4gICAgICB0aGlzLmRlc3RpbmF0aW9uID0gU3Vic2NyaWJlci5jcmVhdGUoXG4gICAgICAgICh4KSA9PiBzb2NrZXQucmVhZHlTdGF0ZSA9PT0gMSAmJiBzb2NrZXQuc2VuZCh4KSxcbiAgICAgICAgKGUpID0+IHtcbiAgICAgICAgICBjb25zdCBjbG9zaW5nT2JzZXJ2ZXIgPSB0aGlzLmNsb3NpbmdPYnNlcnZlcjtcbiAgICAgICAgICBpZiAoY2xvc2luZ09ic2VydmVyKSB7XG4gICAgICAgICAgICBjbG9zaW5nT2JzZXJ2ZXIubmV4dCh1bmRlZmluZWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZSAmJiBlLmNvZGUpIHtcbiAgICAgICAgICAgIHNvY2tldC5jbG9zZShlLmNvZGUsIGUucmVhc29uKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IobmV3IFR5cGVFcnJvcignV2ViU29ja2V0U3ViamVjdC5lcnJvciBtdXN0IGJlIGNhbGxlZCB3aXRoIGFuIG9iamVjdCB3aXRoIGFuIGVycm9yIGNvZGUsICcgK1xuICAgICAgICAgICAgICAnYW5kIGFuIG9wdGlvbmFsIHJlYXNvbjogeyBjb2RlOiBudW1iZXIsIHJlYXNvbjogc3RyaW5nIH0nKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBuZXcgUmVwbGF5U3ViamVjdCgpO1xuICAgICAgICAgIHRoaXMuc29ja2V0ID0gbnVsbDtcbiAgICAgICAgfSxcbiAgICAgICAgKCApID0+IHtcbiAgICAgICAgICBjb25zdCBjbG9zaW5nT2JzZXJ2ZXIgPSB0aGlzLmNsb3NpbmdPYnNlcnZlcjtcbiAgICAgICAgICBpZiAoY2xvc2luZ09ic2VydmVyKSB7XG4gICAgICAgICAgICBjbG9zaW5nT2JzZXJ2ZXIubmV4dCh1bmRlZmluZWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzb2NrZXQuY2xvc2UoKTtcbiAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gbmV3IFJlcGxheVN1YmplY3QoKTtcbiAgICAgICAgICB0aGlzLnNvY2tldCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICAgIGlmIChxdWV1ZSAmJiBxdWV1ZSBpbnN0YW5jZW9mIFJlcGxheVN1YmplY3QpIHtcbiAgICAgICAgc3Vic2NyaXB0aW9uLmFkZCgoPFJlcGxheVN1YmplY3Q8VD4+cXVldWUpLnN1YnNjcmliZSh0aGlzLmRlc3RpbmF0aW9uKSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHNvY2tldC5vbmVycm9yID0gKGU6IEV2ZW50KSA9PiBvYnNlcnZlci5lcnJvcihlKTtcblxuICAgIHNvY2tldC5vbmNsb3NlID0gKGU6IENsb3NlRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGNsb3NlT2JzZXJ2ZXIgPSB0aGlzLmNsb3NlT2JzZXJ2ZXI7XG4gICAgICBpZiAoY2xvc2VPYnNlcnZlcikge1xuICAgICAgICBjbG9zZU9ic2VydmVyLm5leHQoZSk7XG4gICAgICB9XG4gICAgICBpZiAoZS53YXNDbGVhbikge1xuICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHNvY2tldC5vbm1lc3NhZ2UgPSAoZTogTWVzc2FnZUV2ZW50KSA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSB0cnlDYXRjaCh0aGlzLnJlc3VsdFNlbGVjdG9yKShlKTtcbiAgICAgIGlmIChyZXN1bHQgPT09IGVycm9yT2JqZWN0KSB7XG4gICAgICAgIG9ic2VydmVyLmVycm9yKGVycm9yT2JqZWN0LmUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXN1bHQpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBwcm90ZWN0ZWQgX3N1YnNjcmliZShzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+KTogU3Vic2NyaXB0aW9uIHtcbiAgICBjb25zdCB7IHNvdXJjZSB9ID0gdGhpcztcbiAgICBpZiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnNvY2tldCkge1xuICAgICAgdGhpcy5fY29ubmVjdFNvY2tldCgpO1xuICAgIH1cbiAgICBsZXQgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgIHN1YnNjcmlwdGlvbi5hZGQodGhpcy5fb3V0cHV0LnN1YnNjcmliZShzdWJzY3JpYmVyKSk7XG4gICAgc3Vic2NyaXB0aW9uLmFkZCgoKSA9PiB7XG4gICAgICBjb25zdCB7IHNvY2tldCB9ID0gdGhpcztcbiAgICAgIGlmIChzb2NrZXQgJiYgc29ja2V0LnJlYWR5U3RhdGUgPT09IDEpIHtcbiAgICAgICAgc29ja2V0LmNsb3NlKCk7XG4gICAgICAgIHRoaXMuc29ja2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICB9XG5cbiAgdW5zdWJzY3JpYmUoKSB7XG4gICAgY29uc3QgeyBzb3VyY2UsIHNvY2tldCB9ID0gdGhpcztcbiAgICBpZiAoc29ja2V0ICYmIHNvY2tldC5yZWFkeVN0YXRlID09PSAxKSB7XG4gICAgICBzb2NrZXQuY2xvc2UoKTtcbiAgICAgIHRoaXMuc29ja2V0ID0gbnVsbDtcbiAgICB9XG4gICAgc3VwZXIudW5zdWJzY3JpYmUoKTtcbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IG5ldyBSZXBsYXlTdWJqZWN0KCk7XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
