System.register(['../util/root', '../Observable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var root_1, Observable_1;
    var PromiseObservable;
    function dispatchNext(arg) {
        var value = arg.value, subscriber = arg.subscriber;
        if (!subscriber.isUnsubscribed) {
            subscriber.next(value);
            subscriber.complete();
        }
    }
    function dispatchError(arg) {
        var err = arg.err, subscriber = arg.subscriber;
        if (!subscriber.isUnsubscribed) {
            subscriber.error(err);
        }
    }
    return {
        setters:[
            function (root_1_1) {
                root_1 = root_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @extends {Ignored}
             * @hide true
             */
            PromiseObservable = (function (_super) {
                __extends(PromiseObservable, _super);
                function PromiseObservable(promise, scheduler) {
                    if (scheduler === void 0) { scheduler = null; }
                    _super.call(this);
                    this.promise = promise;
                    this.scheduler = scheduler;
                }
                /**
                 * Converts a Promise to an Observable.
                 *
                 * <span class="informal">Returns an Observable that just emits the Promise's
                 * resolved value, then completes.</span>
                 *
                 * Converts an ES2015 Promise or a Promises/A+ spec compliant Promise to an
                 * Observable. If the Promise resolves with a value, the output Observable
                 * emits that resolved value as a `next`, and then completes. If the Promise
                 * is rejected, then the output Observable emits the corresponding Error.
                 *
                 * @example <caption>Convert the Promise returned by Fetch to an Observable</caption>
                 * var result = Rx.Observable.fromPromise(fetch('http://myserver.com/'));
                 * result.subscribe(x => console.log(x), e => console.error(e));
                 *
                 * @see {@link bindCallback}
                 * @see {@link from}
                 *
                 * @param {Promise<T>} promise The promise to be converted.
                 * @param {Scheduler} [scheduler] An optional Scheduler to use for scheduling
                 * the delivery of the resolved value (or the rejection).
                 * @return {Observable<T>} An Observable which wraps the Promise.
                 * @static true
                 * @name fromPromise
                 * @owner Observable
                 */
                PromiseObservable.create = function (promise, scheduler) {
                    if (scheduler === void 0) { scheduler = null; }
                    return new PromiseObservable(promise, scheduler);
                };
                PromiseObservable.prototype._subscribe = function (subscriber) {
                    var _this = this;
                    var promise = this.promise;
                    var scheduler = this.scheduler;
                    if (scheduler == null) {
                        if (this._isScalar) {
                            if (!subscriber.isUnsubscribed) {
                                subscriber.next(this.value);
                                subscriber.complete();
                            }
                        }
                        else {
                            promise.then(function (value) {
                                _this.value = value;
                                _this._isScalar = true;
                                if (!subscriber.isUnsubscribed) {
                                    subscriber.next(value);
                                    subscriber.complete();
                                }
                            }, function (err) {
                                if (!subscriber.isUnsubscribed) {
                                    subscriber.error(err);
                                }
                            })
                                .then(null, function (err) {
                                // escape the promise trap, throw unhandled errors
                                root_1.root.setTimeout(function () { throw err; });
                            });
                        }
                    }
                    else {
                        if (this._isScalar) {
                            if (!subscriber.isUnsubscribed) {
                                return scheduler.schedule(dispatchNext, 0, { value: this.value, subscriber: subscriber });
                            }
                        }
                        else {
                            promise.then(function (value) {
                                _this.value = value;
                                _this._isScalar = true;
                                if (!subscriber.isUnsubscribed) {
                                    subscriber.add(scheduler.schedule(dispatchNext, 0, { value: value, subscriber: subscriber }));
                                }
                            }, function (err) {
                                if (!subscriber.isUnsubscribed) {
                                    subscriber.add(scheduler.schedule(dispatchError, 0, { err: err, subscriber: subscriber }));
                                }
                            })
                                .then(null, function (err) {
                                // escape the promise trap, throw unhandled errors
                                root_1.root.setTimeout(function () { throw err; });
                            });
                        }
                    }
                };
                return PromiseObservable;
            }(Observable_1.Observable));
            exports_1("PromiseObservable", PromiseObservable);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29ic2VydmFibGUvUHJvbWlzZU9ic2VydmFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQWdIQSxzQkFBeUIsR0FBdUI7UUFDdEMscUJBQUssRUFBRSwyQkFBVSxDQUFTO1FBQ2xDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QixVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDeEIsQ0FBQztJQUNILENBQUM7SUFNRCx1QkFBMEIsR0FBd0I7UUFDeEMsaUJBQUcsRUFBRSwyQkFBVSxDQUFTO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QixDQUFDO0lBQ0gsQ0FBQzs7Ozs7Ozs7OztZQTNIRDs7OztlQUlHO1lBQ0g7Z0JBQTBDLHFDQUFhO2dCQWtDckQsMkJBQW9CLE9BQW1CLEVBQVMsU0FBMkI7b0JBQWxDLHlCQUFrQyxHQUFsQyxnQkFBa0M7b0JBQ3pFLGlCQUFPLENBQUM7b0JBRFUsWUFBTyxHQUFQLE9BQU8sQ0FBWTtvQkFBUyxjQUFTLEdBQVQsU0FBUyxDQUFrQjtnQkFFM0UsQ0FBQztnQkFoQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUJBeUJHO2dCQUNJLHdCQUFNLEdBQWIsVUFBaUIsT0FBbUIsRUFBRSxTQUEyQjtvQkFBM0IseUJBQTJCLEdBQTNCLGdCQUEyQjtvQkFDL0QsTUFBTSxDQUFDLElBQUksaUJBQWlCLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUNuRCxDQUFDO2dCQU1TLHNDQUFVLEdBQXBCLFVBQXFCLFVBQXlCO29CQUE5QyxpQkF3REM7b0JBdkRDLElBQU0sT0FBTyxHQUFH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QUFDLGNBQVEsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDeEMsQ0FBQyxDQUFDLENBQUM7d0JBQ1AsQ0FBQztvQkFDSCxDQUFDO2dCQUNILENBQUM7Z0JBQ0gsd0JBQUM7WUFBRCxDQS9GQSxBQStGQyxDQS9GeUMsdUJBQVUsR0ErRm5EO1lBL0ZELGlEQStGQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29ic2VydmFibGUvUHJvbWlzZU9ic2VydmFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3Jvb3R9IGZyb20gJy4uL3V0aWwvcm9vdCc7XG5pbXBvcnQge1NjaGVkdWxlcn0gZnJvbSAnLi4vU2NoZWR1bGVyJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQge1N1YnNjcmliZXJ9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHtUZWFyZG93bkxvZ2ljfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqIEBoaWRlIHRydWVcbiAqL1xuZXhwb3J0IGNsYXNzIFByb21pc2VPYnNlcnZhYmxlPFQ+IGV4dGVuZHMgT2JzZXJ2YWJsZTxUPiB7XG5cbiAgcHVibGljIHZhbHVlOiBUO1xuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhIFByb21pc2UgdG8gYW4gT2JzZXJ2YWJsZS5cbiAgICpcbiAgICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPlJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGp1c3QgZW1pdHMgdGhlIFByb21pc2Unc1xuICAgKiByZXNvbHZlZCB2YWx1ZSwgdGhlbiBjb21wbGV0ZXMuPC9zcGFuPlxuICAgKlxuICAgKiBDb252ZXJ0cyBhbiBFUzIwMTUgUHJvbWlzZSBvciBhIFByb21pc2VzL0ErIHNwZWMgY29tcGxpYW50IFByb21pc2UgdG8gYW5cbiAgICogT2JzZXJ2YWJsZS4gSWYgdGhlIFByb21pc2UgcmVzb2x2ZXMgd2l0aCBhIHZhbHVlLCB0aGUgb3V0cHV0IE9ic2VydmFibGVcbiAgICogZW1pdHMgdGhhdCByZXNvbHZlZCB2YWx1ZSBhcyBhIGBuZXh0YCwgYW5kIHRoZW4gY29tcGxldGVzLiBJZiB0aGUgUHJvbWlzZVxuICAgKiBpcyByZWplY3RlZCwgdGhlbiB0aGUgb3V0cHV0IE9ic2VydmFibGUgZW1pdHMgdGhlIGNvcnJlc3BvbmRpbmcgRXJyb3IuXG4gICAqXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPkNvbnZlcnQgdGhlIFByb21pc2UgcmV0dXJuZWQgYnkgRmV0Y2ggdG8gYW4gT2JzZXJ2YWJsZTwvY2FwdGlvbj5cbiAgICogdmFyIHJlc3VsdCA9IFJ4Lk9ic2VydmFibGUuZnJvbVByb21pc2UoZmV0Y2goJ2h0dHA6Ly9teXNlcnZlci5jb20vJykpO1xuICAgKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCksIGUgPT4gY29uc29sZS5lcnJvcihlKSk7XG4gICAqXG4gICAqIEBzZWUge0BsaW5rIGJpbmRDYWxsYmFja31cbiAgICogQHNlZSB7QGxpbmsgZnJvbX1cbiAgICpcbiAgICogQHBhcmFtIHtQcm9taXNlPFQ+fSBwcm9taXNlIFRoZSBwcm9taXNlIHRvIGJlIGNvbnZlcnRlZC5cbiAgICogQHBhcmFtIHtTY2hlZHVsZXJ9IFtzY2hlZHVsZXJdIEFuIG9wdGlvbmFsIFNjaGVkdWxlciB0byB1c2UgZm9yIHNjaGVkdWxpbmdcbiAgICogdGhlIGRlbGl2ZXJ5IG9mIHRoZSByZXNvbHZlZCB2YWx1ZSAob3IgdGhlIHJlamVjdGlvbikuXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59IEFuIE9ic2VydmFibGUgd2hpY2ggd3JhcHMgdGhlIFByb21pc2UuXG4gICAqIEBzdGF0aWMgdHJ1ZVxuICAgKiBAbmFtZSBmcm9tUHJvbWlzZVxuICAgKiBAb3duZXIgT2JzZXJ2YWJsZVxuICAgKi9cbiAgc3RhdGljIGNyZWF0ZTxUPihwcm9taXNlOiBQcm9taXNlPFQ+LCBzY2hlZHVsZXI6IFNjaGVkdWxlciA9IG51bGwpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2VPYnNlcnZhYmxlKHByb21pc2UsIHNjaGVkdWxlcik7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHByb21pc2U6IFByb21pc2U8VD4sIHB1YmxpYyBzY2hlZHVsZXI6IFNjaGVkdWxlciA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmUoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPik6IFRlYXJkb3duTG9naWMge1xuICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLnByb21pc2U7XG4gICAgY29uc3Qgc2NoZWR1bGVyID0gdGhpcy5zY2hlZHVsZXI7XG5cbiAgICBpZiAoc2NoZWR1bGVyID09IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLl9pc1NjYWxhcikge1xuICAgICAgICBpZiAoIXN1YnNjcmliZXIuaXNVbnN1YnNjcmliZWQpIHtcbiAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodGhpcy52YWx1ZSk7XG4gICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9taXNlLnRoZW4oXG4gICAgICAgICAgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9pc1NjYWxhciA9IHRydWU7XG4gICAgICAgICAgICBpZiAoIXN1YnNjcmliZXIuaXNVbnN1YnNjcmliZWQpIHtcbiAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgKGVycikgPT4ge1xuICAgICAgICAgICAgaWYgKCFzdWJzY3JpYmVyLmlzVW5zdWJzY3JpYmVkKSB7XG4gICAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgICAgLnRoZW4obnVsbCwgZXJyID0+IHtcbiAgICAgICAgICAvLyBlc2NhcGUgdGhlIHByb21pc2UgdHJhcCwgdGhyb3cgdW5oYW5kbGVkIGVycm9yc1xuICAgICAgICAgIHJvb3Quc2V0VGltZW91dCgoKSA9PiB7IHRocm93IGVycjsgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5faXNTY2FsYXIpIHtcbiAgICAgICAgaWYgKCFzdWJzY3JpYmVyLmlzVW5zdWJzY3JpYmVkKSB7XG4gICAgICAgICAgcmV0dXJuIHNjaGVkdWxlci5zY2hlZHVsZShkaXNwYXRjaE5leHQsIDAsIHsgdmFsdWU6IHRoaXMudmFsdWUsIHN1YnNjcmliZXIgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb21pc2UudGhlbihcbiAgICAgICAgICAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX2lzU2NhbGFyID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICghc3Vic2NyaWJlci5pc1Vuc3Vic2NyaWJlZCkge1xuICAgICAgICAgICAgICBzdWJzY3JpYmVyLmFkZChzY2hlZHVsZXIuc2NoZWR1bGUoZGlzcGF0Y2hOZXh0LCAwLCB7IHZhbHVlLCBzdWJzY3JpYmVyIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIChlcnIpID0+IHtcbiAgICAgICAgICAgIGlmICghc3Vic2NyaWJlci5pc1Vuc3Vic2NyaWJlZCkge1xuICAgICAgICAgICAgICBzdWJzY3JpYmVyLmFkZChzY2hlZHVsZXIuc2NoZWR1bGUoZGlzcGF0Y2hFcnJvciwgMCwgeyBlcnIsIHN1YnNjcmliZXIgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4obnVsbCwgKGVycikgPT4ge1xuICAgICAgICAgICAgLy8gZXNjYXBlIHRoZSBwcm9taXNlIHRyYXAsIHRocm93IHVuaGFuZGxlZCBlcnJvcnNcbiAgICAgICAgICAgIHJvb3Quc2V0VGltZW91dCgoKSA9PiB7IHRocm93IGVycjsgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmludGVyZmFjZSBEaXNwYXRjaE5leHRBcmc8VD4ge1xuICBzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+O1xuICB2YWx1ZTogVDtcbn1cbmZ1bmN0aW9uIGRpc3BhdGNoTmV4dDxUPihhcmc6IERpc3BhdGNoTmV4dEFyZzxUPikge1xuICBjb25zdCB7IHZhbHVlLCBzdWJzY3JpYmVyIH0gPSBhcmc7XG4gIGlmICghc3Vic2NyaWJlci5pc1Vuc3Vic2NyaWJlZCkge1xuICAgIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICB9XG59XG5cbmludGVyZmFjZSBEaXNwYXRjaEVycm9yQXJnPFQ+IHtcbiAgc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPjtcbiAgZXJyOiBhbnk7XG59XG5mdW5jdGlvbiBkaXNwYXRjaEVycm9yPFQ+KGFyZzogRGlzcGF0Y2hFcnJvckFyZzxUPikge1xuICBjb25zdCB7IGVyciwgc3Vic2NyaWJlciB9ID0gYXJnO1xuICBpZiAoIXN1YnNjcmliZXIuaXNVbnN1YnNjcmliZWQpIHtcbiAgICBzdWJzY3JpYmVyLmVycm9yKGVycik7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
