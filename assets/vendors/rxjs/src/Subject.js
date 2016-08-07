System.register(['./Observable', './Subscriber', './Subscription', './util/ObjectUnsubscribedError', './SubjectSubscription', './symbol/rxSubscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Observable_1, Subscriber_1, Subscription_1, ObjectUnsubscribedError_1, SubjectSubscription_1, rxSubscriber_1;
    var SubjectSubscriber, Subject, AnonymousSubject;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
            },
            function (ObjectUnsubscribedError_1_1) {
                ObjectUnsubscribedError_1 = ObjectUnsubscribedError_1_1;
            },
            function (SubjectSubscription_1_1) {
                SubjectSubscription_1 = SubjectSubscription_1_1;
            },
            function (rxSubscriber_1_1) {
                rxSubscriber_1 = rxSubscriber_1_1;
            }],
        execute: function() {
            /**
             * @class SubjectSubscriber<T>
             */
            SubjectSubscriber = (function (_super) {
                __extends(SubjectSubscriber, _super);
                function SubjectSubscriber(destination) {
                    _super.call(this, destination);
                    this.destination = destination;
                }
                return SubjectSubscriber;
            }(Subscriber_1.Subscriber));
            exports_1("SubjectSubscriber", SubjectSubscriber);
            /**
             * @class Subject<T>
             */
            Subject = (function (_super) {
                __extends(Subject, _super);
                function Subject() {
                    _super.call(this);
                    this.observers = [];
                    this.isUnsubscribed = false;
                    this.isStopped = false;
                    this.hasError = false;
                    this.thrownError = null;
                }
                Subject.prototype[rxSubscriber_1.$$rxSubscriber] = function () {
                    return new SubjectSubscriber(this);
                };
                Subject.prototype.lift = function (operator) {
                    var subject = new AnonymousSubject(this, this);
                    subject.operator = operator;
                    return subject;
                };
                Subject.prototype.next = function (value) {
                    if (this.isUnsubscribed) {
                        throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
                    }
                    if (!this.isStopped) {
                        var observers = this.observers;
                        var len = observers.length;
                        var copy = observers.slice();
                        for (var i = 0; i < len; i++) {
                            copy[i].next(value);
                        }
                    }
                };
                Subject.prototype.error = function (err) {
                    if (this.isUnsubscribed) {
                        throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
                    }
                    this.hasError = true;
                    this.thrownError = err;
                    this.isStopped = true;
                    var observers = this.observers;
                    var len = observers.length;
                    var copy = observers.slice();
                    for (var i = 0; i < len; i++) {
                        copy[i].error(err);
                    }
                    this.observers.length = 0;
                };
                Subject.prototype.complete = function () {
                    if (this.isUnsubscribed) {
                        throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
                    }
                    this.isStopped = true;
                    var observers = this.observers;
                    var len = observers.length;
                    var copy = observers.slice();
                    for (var i = 0; i < len; i++) {
                        copy[i].complete();
                    }
                    this.observers.length = 0;
                };
                Subject.prototype.unsubscribe = function () {
                    this.isStopped = true;
                    this.isUnsubscribed = true;
                    this.observers = null;
                };
                Subject.prototype._subscribe = function (subscriber) {
                    if (this.isUnsubscribed) {
                        throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
                    }
                    else if (this.hasError) {
                        subscriber.error(this.thrownError);
                        return Subscription_1.Subscription.EMPTY;
                    }
                    else if (this.isStopped) {
                        subscriber.complete();
                        return Subscription_1.Subscription.EMPTY;
                    }
                    else {
                        this.observers.push(subscriber);
                        return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
                    }
                };
                Subject.prototype.asObservable = function () {
                    var observable = new Observable_1.Observable();
                    observable.source = this;
                    return observable;
                };
                Subject.create = function (destination, source) {
                    return new AnonymousSubject(destination, source);
                };
                return Subject;
            }(Observable_1.Observable));
            exports_1("Subject", Subject);
            /**
             * @class AnonymousSubject<T>
             */
            AnonymousSubject = (function (_super) {
                __extends(AnonymousSubject, _super);
                function AnonymousSubject(destination, source) {
                    _super.call(this);
                    this.destination = destination;
                    this.source = source;
                }
                AnonymousSubject.prototype.next = function (value) {
                    var destination = this.destination;
                    if (destination && destination.next) {
                        destination.next(value);
                    }
                };
                AnonymousSubject.prototype.error = function (err) {
                    var destination = this.destination;
                    if (destination && destination.error) {
                        this.destination.error(err);
                    }
                };
                AnonymousSubject.prototype.complete = function () {
                    var destination = this.destination;
                    if (destination && destination.complete) {
                        this.destination.complete();
                    }
                };
                AnonymousSubject.prototype._subscribe = function (subscriber) {
                    var source = this.source;
                    if (source) {
                        return this.source.subscribe(subscriber);
                    }
                    else {
                        return Subscription_1.Subscription.EMPTY;
                    }
                };
                return AnonymousSubject;
            }(Subject));
            exports_1("AnonymousSubject", AnonymousSubject);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL1N1YmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQVNBOztlQUVHO1lBQ0g7Z0JBQTBDLHFDQUFhO2dCQUNyRCwyQkFBc0IsV0FBdUI7b0JBQzNDLGtCQUFNLFdBQVcsQ0FBQyxDQUFDO29CQURDLGdCQUFXLEdBQVgsV0FBVyxDQUFZO2dCQUU3QyxDQUFDO2dCQUNILHdCQUFDO1lBQUQsQ0FKQSxBQUlDLENBSnlDLHVCQUFVLEdBSW5EO1lBSkQsaURBSUMsQ0FBQTtZQUVEOztlQUVHO1lBQ0g7Z0JBQWdDLDJCQUFhO2dCQWdCM0M7b0JBQ0UsaUJBQU8sQ0FBQztvQkFYVixjQUFTLEdBQWtCLEVBQUUsQ0FBQztvQkFFOUIsbUJBQWMsR0FBRyxLQUFLLENBQUM7b0JBRXZCLGNBQVMsR0FBRyxLQUFLLENBQUM7b0JBRWxCLGFBQVEsR0FBRyxLQUFLLENBQUM7b0JBRWpCLGdCQUFXLEdBQVEsSUFBSSxDQUFDO2dCQUl4QixDQUFDO2dCQWhCRCxrQkFBQyw2QkFBYyxDQUFDLEdBQWhCO29CQUNFLE1BQU0sQ0FBQyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNyQyxDQUFDO2dCQW9CRCxzQkFBSSxHQUFKLFVBQVcsUUFBd0I7b0JBQ2pDLElBQU0sT0FBTyxHQUFHLElBQUksZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNqRCxPQUFPLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztvQkFDNUIsTUFBTSxDQUFNLE9BQU8sQ0FBQztnQkFDdEIsQ0FBQztnQkFFRCxzQkFBSSxHQUFKLFVBQUssS0FBUztvQkFDWixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQzt3QkFDeEIsTUFBTSxJQUFJLGlEQUF1QixFQUFFLENBQUM7b0JBQ3RDLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMs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QUFLLEdBQUwsVUFBTSxHQUFRO29CQUNKLGtDQUFXLENBQVU7b0JBQzdCLEVBQUUsQ0FBQyxDQUFDLFdBQVcsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzlCLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCxtQ0FBUSxHQUFSO29CQUNVLGtDQUFXLENBQVU7b0JBQzdCLEVBQUUsQ0FBQyxDQUFDLFdBQVcsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzt3QkFDeEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDOUIsQ0FBQztnQkFDSCxDQUFDO2dCQUVTLHFDQUFVLEdBQXBCLFVBQXFCLFVBQXlCO29CQUNwQyx3QkFBTSxDQUFVO29CQUN4QixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDM0MsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixNQUFNLENBQUMsMkJBQVksQ0FBQyxLQUFLLENBQUM7b0JBQzVCLENBQUM7Z0JBQ0gsQ0FBQztnQkFDSCx1QkFBQztZQUFELENBbENBLEFBa0NDLENBbEN3QyxPQUFPLEdBa0MvQztZQWxDRCwrQ0FrQ0MsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9yeGpzL3NyYy9TdWJqZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPcGVyYXRvcn0gZnJvbSAnLi9PcGVyYXRvcic7XG5pbXBvcnQge09ic2VydmVyfSBmcm9tICcuL09ic2VydmVyJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAnLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7U3Vic2NyaWJlcn0gZnJvbSAnLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7SVN1YnNjcmlwdGlvbiwgU3Vic2NyaXB0aW9ufSBmcm9tICcuL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQge09iamVjdFVuc3Vic2NyaWJlZEVycm9yfSBmcm9tICcuL3V0aWwvT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3InO1xuaW1wb3J0IHtTdWJqZWN0U3Vic2NyaXB0aW9ufSBmcm9tICcuL1N1YmplY3RTdWJzY3JpcHRpb24nO1xuaW1wb3J0IHskJHJ4U3Vic2NyaWJlcn0gZnJvbSAnLi9zeW1ib2wvcnhTdWJzY3JpYmVyJztcblxuLyoqXG4gKiBAY2xhc3MgU3ViamVjdFN1YnNjcmliZXI8VD5cbiAqL1xuZXhwb3J0IGNsYXNzIFN1YmplY3RTdWJzY3JpYmVyPFQ+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBkZXN0aW5hdGlvbjogU3ViamVjdDxUPikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxufVxuXG4vKipcbiAqIEBjbGFzcyBTdWJqZWN0PFQ+XG4gKi9cbmV4cG9ydCBjbGFzcyBTdWJqZWN0PFQ+IGV4dGVuZHMgT2JzZXJ2YWJsZTxUPiBpbXBsZW1lbnRzIElTdWJzY3JpcHRpb24ge1xuXG4gIFskJHJ4U3Vic2NyaWJlcl0oKSB7XG4gICAgcmV0dXJuIG5ldyBTdWJqZWN0U3Vic2NyaWJlcih0aGlzKTtcbiAgfVxuXG4gIG9ic2VydmVyczogT2JzZXJ2ZXI8VD5bXSA9IFtdO1xuXG4gIGlzVW5zdWJzY3JpYmVkID0gZmFsc2U7XG5cbiAgaXNTdG9wcGVkID0gZmFsc2U7XG5cbiAgaGFzRXJyb3IgPSBmYWxzZTtcblxuICB0aHJvd25FcnJvcjogYW55ID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZTogRnVuY3Rpb24gPSA8VD4oZGVzdGluYXRpb246IE9ic2VydmVyPFQ+LCBzb3VyY2U6IE9ic2VydmFibGU8VD4pOiBBbm9ueW1vdXNTdWJqZWN0PFQ+ID0+IHtcbiAgICByZXR1cm4gbmV3IEFub255bW91c1N1YmplY3Q8VD4oZGVzdGluYXRpb24sIHNvdXJjZSk7XG4gIH07XG5cbiAgbGlmdDxULCBSPihvcGVyYXRvcjogT3BlcmF0b3I8VCwgUj4pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICBjb25zdCBzdWJqZWN0ID0gbmV3IEFub255bW91c1N1YmplY3QodGhpcywgdGhpcyk7XG4gICAgc3ViamVjdC5vcGVyYXRvciA9IG9wZXJhdG9yO1xuICAgIHJldHVybiA8YW55PnN1YmplY3Q7XG4gIH1cblxuICBuZXh0KHZhbHVlPzogVCkge1xuICAgIGlmICh0aGlzLmlzVW5zdWJzY3JpYmVkKSB7XG4gICAgICB0aHJvdyBuZXcgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IoKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgY29uc3QgeyBvYnNlcnZlcnMgfSA9IHRoaXM7XG4gICAgICBjb25zdCBsZW4gPSBvYnNlcnZlcnMubGVuZ3RoO1xuICAgICAgY29uc3QgY29weSA9IG9ic2VydmVycy5zbGljZSgpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBjb3B5W2ldLm5leHQodmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGVycm9yKGVycjogYW55KSB7XG4gICAgaWYgKHRoaXMuaXNVbnN1YnNjcmliZWQpIHtcbiAgICAgIHRocm93IG5ldyBPYmplY3RVbnN1YnNjcmliZWRFcnJvcigpO1xuICAgIH1cbiAgICB0aGlzLmhhc0Vycm9yID0gdHJ1ZTtcbiAgICB0aGlzLnRocm93bkVycm9yID0gZXJyO1xuICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICBjb25zdCB7IG9ic2VydmVycyB9ID0gdGhpcztcbiAgICBjb25zdCBsZW4gPSBvYnNlcnZlcnMubGVuZ3RoO1xuICAgIGNvbnN0IGNvcHkgPSBvYnNlcnZlcnMuc2xpY2UoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb3B5W2ldLmVycm9yKGVycik7XG4gICAgfVxuICAgIHRoaXMub2JzZXJ2ZXJzLmxlbmd0aCA9IDA7XG4gIH1cblxuICBjb21wbGV0ZSgpIHtcbiAgICBpZiAodGhpcy5pc1Vuc3Vic2NyaWJlZCkge1xuICAgICAgdGhyb3cgbmV3IE9iamVjdFVuc3Vic2NyaWJlZEVycm9yKCk7XG4gICAgfVxuICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICBjb25zdCB7IG9ic2VydmVycyB9ID0gdGhpcztcbiAgICBjb25zdCBsZW4gPSBvYnNlcnZlcnMubGVuZ3RoO1xuICAgIGNvbnN0IGNvcHkgPSBvYnNlcnZlcnMuc2xpY2UoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb3B5W2ldLmNvbXBsZXRlKCk7XG4gICAgfVxuICAgIHRoaXMub2JzZXJ2ZXJzLmxlbmd0aCA9IDA7XG4gIH1cblxuICB1bnN1YnNjcmliZSgpIHtcbiAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgdGhpcy5pc1Vuc3Vic2NyaWJlZCA9IHRydWU7XG4gICAgdGhpcy5vYnNlcnZlcnMgPSBudWxsO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmUoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPik6IFN1YnNjcmlwdGlvbiB7XG4gICAgaWYgKHRoaXMuaXNVbnN1YnNjcmliZWQpIHtcbiAgICAgIHRocm93IG5ldyBPYmplY3RVbnN1YnNjcmliZWRFcnJvcigpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5oYXNFcnJvcikge1xuICAgICAgc3Vic2NyaWJlci5lcnJvcih0aGlzLnRocm93bkVycm9yKTtcbiAgICAgIHJldHVybiBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgcmV0dXJuIFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vYnNlcnZlcnMucHVzaChzdWJzY3JpYmVyKTtcbiAgICAgIHJldHVybiBuZXcgU3ViamVjdFN1YnNjcmlwdGlvbih0aGlzLCBzdWJzY3JpYmVyKTtcbiAgICB9XG4gIH1cblxuICBhc09ic2VydmFibGUoKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgY29uc3Qgb2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlPFQ+KCk7XG4gICAgKDxhbnk+b2JzZXJ2YWJsZSkuc291cmNlID0gdGhpcztcbiAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgfVxufVxuXG4vKipcbiAqIEBjbGFzcyBBbm9ueW1vdXNTdWJqZWN0PFQ+XG4gKi9cbmV4cG9ydCBjbGFzcyBBbm9ueW1vdXNTdWJqZWN0PFQ+IGV4dGVuZHMgU3ViamVjdDxUPiB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBkZXN0aW5hdGlvbj86IE9ic2VydmVyPFQ+LCBwcm90ZWN0ZWQgc291cmNlPzogT2JzZXJ2YWJsZTxUPikge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBuZXh0KHZhbHVlOiBUKSB7XG4gICAgY29uc3QgeyBkZXN0aW5hdGlvbiB9ID0gdGhpcztcbiAgICBpZiAoZGVzdGluYXRpb24gJiYgZGVzdGluYXRpb24ubmV4dCkge1xuICAgICAgZGVzdGluYXRpb24ubmV4dCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgZXJyb3IoZXJyOiBhbnkpIHtcbiAgICBjb25zdCB7IGRlc3RpbmF0aW9uIH0gPSB0aGlzO1xuICAgIGlmIChkZXN0aW5hdGlvbiAmJiBkZXN0aW5hdGlvbi5lcnJvcikge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBsZXRlKCkge1xuICAgIGNvbnN0IHsgZGVzdGluYXRpb24gfSA9IHRoaXM7XG4gICAgaWYgKGRlc3RpbmF0aW9uICYmIGRlc3RpbmF0aW9uLmNvbXBsZXRlKSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmUoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPik6IFN1YnNjcmlwdGlvbiB7XG4gICAgY29uc3QgeyBzb3VyY2UgfSA9IHRoaXM7XG4gICAgaWYgKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIHRoaXMuc291cmNlLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
