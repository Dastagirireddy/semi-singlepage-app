System.register(['./util/isFunction', './Subscription', './Observer', './symbol/rxSubscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var isFunction_1, Subscription_1, Observer_1, rxSubscriber_1;
    var Subscriber, SafeSubscriber;
    return {
        setters:[
            function (isFunction_1_1) {
                isFunction_1 = isFunction_1_1;
            },
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
            },
            function (Observer_1_1) {
                Observer_1 = Observer_1_1;
            },
            function (rxSubscriber_1_1) {
                rxSubscriber_1 = rxSubscriber_1_1;
            }],
        execute: function() {
            /**
             * Implements the {@link Observer} interface and extends the
             * {@link Subscription} class. While the {@link Observer} is the public API for
             * consuming the values of an {@link Observable}, all Observers get converted to
             * a Subscriber, in order to provide Subscription-like capabilities such as
             * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
             * implementing operators, but it is rarely used as a public API.
             *
             * @class Subscriber<T>
             */
            Subscriber = (function (_super) {
                __extends(Subscriber, _super);
                /**
                 * @param {Observer|function(value: T): void} [destinationOrNext] A partially
                 * defined Observer or a `next` callback function.
                 * @param {function(e: ?any): void} [error] The `error` callback of an
                 * Observer.
                 * @param {function(): void} [complete] The `complete` callback of an
                 * Observer.
                 */
                function Subscriber(destinationOrNext, error, complete) {
                    _super.call(this);
                    this.syncErrorValue = null;
                    this.syncErrorThrown = false;
                    this.syncErrorThrowable = false;
                    this.isStopped = false;
                    switch (arguments.length) {
                        case 0:
                            this.destination = Observer_1.empty;
                            break;
                        case 1:
                            if (!destinationOrNext) {
                                this.destination = Observer_1.empty;
                                break;
                            }
                            if (typeof destinationOrNext === 'object') {
                                if (destinationOrNext instanceof Subscriber) {
                                    this.destination = destinationOrNext;
                                    this.destination.add(this);
                                }
                                else {
                                    this.syncErrorThrowable = true;
                                    this.destination = new SafeSubscriber(this, destinationOrNext);
                                }
                                break;
                            }
                        default:
                            this.syncErrorThrowable = true;
                            this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                            break;
                    }
                }
                Subscriber.prototype[rxSubscriber_1.$$rxSubscriber] = function () { return this; };
                /**
                 * A static factory for a Subscriber, given a (potentially partial) definition
                 * of an Observer.
                 * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
                 * @param {function(e: ?any): void} [error] The `error` callback of an
                 * Observer.
                 * @param {function(): void} [complete] The `complete` callback of an
                 * Observer.
                 * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
                 * Observer represented by the given arguments.
                 */
                Subscriber.create = function (next, error, complete) {
                    var subscriber = new Subscriber(next, error, complete);
                    subscriber.syncErrorThrowable = false;
                    return subscriber;
                };
                /**
                 * The {@link Observer} callback to receive notifications of type `next` from
                 * the Observable, with a value. The Observable may call this method 0 or more
                 * times.
                 * @param {T} [value] The `next` value.
                 * @return {void}
                 */
                Subscriber.prototype.next = function (value) {
                    if (!this.isStopped) {
                        this._next(value);
                    }
                };
                /**
                 * The {@link Observer} callback to receive notifications of type `error` from
                 * the Observable, with an attached {@link Error}. Notifies the Observer that
                 * the Observable has experienced an error condition.
                 * @param {any} [err] The `error` exception.
                 * @return {void}
                 */
                Subscriber.prototype.error = function (err) {
                    if (!this.isStopped) {
                        this.isStopped = true;
                        this._error(err);
                    }
                };
                /**
                 * The {@link Observer} callback to receive a valueless notification of type
                 * `complete` from the Observable. Notifies the Observer that the Observable
                 * has finished sending push-based notifications.
                 * @return {void}
                 */
                Subscriber.prototype.complete = function () {
                    if (!this.isStopped) {
                        this.isStopped = true;
                        this._complete();
                    }
                };
                Subscriber.prototype.unsubscribe = function () {
                    if (this.isUnsubscribed) {
                        return;
                    }
                    this.isStopped = true;
                    _super.prototype.unsubscribe.call(this);
                };
                Subscriber.prototype._next = function (value) {
                    this.destination.next(value);
                };
                Subscriber.prototype._error = function (err) {
                    this.destination.error(err);
                    this.unsubscribe();
                };
                Subscriber.prototype._complete = function () {
                    this.destination.complete();
                    this.unsubscribe();
                };
                return Subscriber;
            }(Subscription_1.Subscription));
            exports_1("Subscriber", Subscriber);
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            SafeSubscriber = (function (_super) {
                __extends(SafeSubscriber, _super);
                function SafeSubscriber(_parent, observerOrNext, error, complete) {
                    _super.call(this);
                    this._parent = _parent;
                    var next;
                    var context = this;
                    if (isFunction_1.isFunction(observerOrNext)) {
                        next = observerOrNext;
                    }
                    else if (observerOrNext) {
                        context = observerOrNext;
                        next = observerOrNext.next;
                        error = observerOrNext.error;
                        complete = observerOrNext.complete;
                        if (isFunction_1.isFunction(context.unsubscribe)) {
                            this.add(context.unsubscribe.bind(context));
                        }
                        context.unsubscribe = this.unsubscribe.bind(this);
                    }
                    this._context = context;
                    this._next = next;
                    this._error = error;
                    this._complete = complete;
                }
                SafeSubscriber.prototype.next = function (value) {
                    if (!this.isStopped && this._next) {
                        var _parent = this._parent;
                        if (!_parent.syncErrorThrowable) {
                            this.__tryOrUnsub(this._next, value);
                        }
                        else if (this.__tryOrSetError(_parent, this._next, value)) {
                            this.unsubscribe();
                        }
                    }
                };
                SafeSubscriber.prototype.error = function (err) {
                    if (!this.isStopped) {
                        var _parent = this._parent;
                        if (this._error) {
                            if (!_parent.syncErrorThrowable) {
                                this.__tryOrUnsub(this._error, err);
                                this.unsubscribe();
                            }
                            else {
                                this.__tryOrSetError(_parent, this._error, err);
                                this.unsubscribe();
                            }
                        }
                        else if (!_parent.syncErrorThrowable) {
                            this.unsubscribe();
                            throw err;
                        }
                        else {
                            _parent.syncErrorValue = err;
                            _parent.syncErrorThrown = true;
                            this.unsubscribe();
                        }
                    }
                };
                SafeSubscriber.prototype.complete = function () {
                    if (!this.isStopped) {
                        var _parent = this._parent;
                        if (this._complete) {
                            if (!_parent.syncErrorThrowable) {
                                this.__tryOrUnsub(this._complete);
                                this.unsubscribe();
                            }
                            else {
                                this.__tryOrSetError(_parent, this._complete);
                                this.unsubscribe();
                            }
                        }
                        else {
                            this.unsubscribe();
                        }
                    }
                };
                SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
                    try {
                        fn.call(this._context, value);
                    }
                    catch (err) {
                        this.unsubscribe();
                        throw err;
                    }
                };
                SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
                    try {
                        fn.call(this._context, value);
                    }
                    catch (err) {
                        parent.syncErrorValue = err;
                        parent.syncErrorThrown = true;
                        return true;
                    }
                    return false;
                };
                SafeSubscriber.prototype._unsubscribe = function () {
                    var _parent = this._parent;
                    this._context = null;
                    this._parent = null;
                    _parent.unsubscribe();
                };
                return SafeSubscriber;
            }(Subscriber));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL1N1YnNjcmliZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQU1BOzs7Ozs7Ozs7ZUFTRztZQUNIO2dCQUFtQyw4QkFBWTtnQkE4QjdDOzs7Ozs7O21CQU9HO2dCQUNILG9CQUFZLGlCQUErRCxFQUMvRCxLQUF5QixFQUN6QixRQUFxQjtvQkFDL0IsaUJBQU8sQ0FBQztvQkFsQkgsbUJBQWMsR0FBUSxJQUFJLENBQUM7b0JBQzNCLG9CQUFlLEdBQVksS0FBSyxDQUFDO29CQUNqQyx1QkFBa0IsR0FBWSxLQUFLLENBQUM7b0JBRWpDLGNBQVMsR0FBWSxLQUFLLENBQUM7b0JBZ0JuQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFDekIsS0FBSyxDQUFDOzRCQUNKLElBQUksQ0FBQyxXQUFXLEdBQUcsZ0JBQWEsQ0FBQzs0QkFDakMsS0FBSyxDQUFDO3dCQUNSLEtBQUssQ0FBQzs0QkFDSixFQUFFLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztnQ0FDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxnQkFBYSxDQUFDO2dDQUNqQyxLQUFLLENBQUM7NEJBQ1IsQ0FBQzs0QkFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLGlCQUFpQixLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0NBQzFDLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixZQUFZLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0NBQzVDLElBQUksQ0FBQyxXQUFXLEdBQXNCLGlCQUFrQixDQUFDO29DQUNsRCxJQUFJLENBQUMsV0FBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQ0FDckMsQ0FBQztnQ0FBQyxJQUFJLENBQUMsQ0FBQztvQ0FDTixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO29DQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLElB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QXdCLE1BQXFCLEVBQUUsRUFBWSxFQUFFLEtBQVc7b0JBQ3RFLElBQUksQ0FBQzt3QkFDSCxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ2hDLENBQUU7b0JBQUEsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDYixNQUFNLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQzt3QkFDNUIsTUFBTSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7d0JBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ2QsQ0FBQztvQkFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNmLENBQUM7Z0JBRVMscUNBQVksR0FBdEI7b0JBQ1UsMEJBQU8sQ0FBVTtvQkFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO29CQUNwQixPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3hCLENBQUM7Z0JBQ0gscUJBQUM7WUFBRCxDQTVHQSxBQTRHQyxDQTVHK0IsVUFBVSxHQTRHekMiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvcnhqcy9zcmMvU3Vic2NyaWJlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNGdW5jdGlvbn0gZnJvbSAnLi91dGlsL2lzRnVuY3Rpb24nO1xuaW1wb3J0IHtPYnNlcnZlciwgUGFydGlhbE9ic2VydmVyfSBmcm9tICcuL09ic2VydmVyJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICcuL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQge2VtcHR5IGFzIGVtcHR5T2JzZXJ2ZXJ9IGZyb20gJy4vT2JzZXJ2ZXInO1xuaW1wb3J0IHskJHJ4U3Vic2NyaWJlcn0gZnJvbSAnLi9zeW1ib2wvcnhTdWJzY3JpYmVyJztcblxuLyoqXG4gKiBJbXBsZW1lbnRzIHRoZSB7QGxpbmsgT2JzZXJ2ZXJ9IGludGVyZmFjZSBhbmQgZXh0ZW5kcyB0aGVcbiAqIHtAbGluayBTdWJzY3JpcHRpb259IGNsYXNzLiBXaGlsZSB0aGUge0BsaW5rIE9ic2VydmVyfSBpcyB0aGUgcHVibGljIEFQSSBmb3JcbiAqIGNvbnN1bWluZyB0aGUgdmFsdWVzIG9mIGFuIHtAbGluayBPYnNlcnZhYmxlfSwgYWxsIE9ic2VydmVycyBnZXQgY29udmVydGVkIHRvXG4gKiBhIFN1YnNjcmliZXIsIGluIG9yZGVyIHRvIHByb3ZpZGUgU3Vic2NyaXB0aW9uLWxpa2UgY2FwYWJpbGl0aWVzIHN1Y2ggYXNcbiAqIGB1bnN1YnNjcmliZWAuIFN1YnNjcmliZXIgaXMgYSBjb21tb24gdHlwZSBpbiBSeEpTLCBhbmQgY3J1Y2lhbCBmb3JcbiAqIGltcGxlbWVudGluZyBvcGVyYXRvcnMsIGJ1dCBpdCBpcyByYXJlbHkgdXNlZCBhcyBhIHB1YmxpYyBBUEkuXG4gKlxuICogQGNsYXNzIFN1YnNjcmliZXI8VD5cbiAqL1xuZXhwb3J0IGNsYXNzIFN1YnNjcmliZXI8VD4gZXh0ZW5kcyBTdWJzY3JpcHRpb24gaW1wbGVtZW50cyBPYnNlcnZlcjxUPiB7XG5cbiAgWyQkcnhTdWJzY3JpYmVyXSgpIHsgcmV0dXJuIHRoaXM7IH1cblxuICAvKipcbiAgICogQSBzdGF0aWMgZmFjdG9yeSBmb3IgYSBTdWJzY3JpYmVyLCBnaXZlbiBhIChwb3RlbnRpYWxseSBwYXJ0aWFsKSBkZWZpbml0aW9uXG4gICAqIG9mIGFuIE9ic2VydmVyLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKHg6ID9UKTogdm9pZH0gW25leHRdIFRoZSBgbmV4dGAgY2FsbGJhY2sgb2YgYW4gT2JzZXJ2ZXIuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oZTogP2FueSk6IHZvaWR9IFtlcnJvcl0gVGhlIGBlcnJvcmAgY2FsbGJhY2sgb2YgYW5cbiAgICogT2JzZXJ2ZXIuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oKTogdm9pZH0gW2NvbXBsZXRlXSBUaGUgYGNvbXBsZXRlYCBjYWxsYmFjayBvZiBhblxuICAgKiBPYnNlcnZlci5cbiAgICogQHJldHVybiB7U3Vic2NyaWJlcjxUPn0gQSBTdWJzY3JpYmVyIHdyYXBwaW5nIHRoZSAocGFydGlhbGx5IGRlZmluZWQpXG4gICAqIE9ic2VydmVyIHJlcHJlc2VudGVkIGJ5IHRoZSBnaXZlbiBhcmd1bWVudHMuXG4gICAqL1xuICBzdGF0aWMgY3JlYXRlPFQ+KG5leHQ/OiAoeD86IFQpID0+IHZvaWQsXG4gICAgICAgICAgICAgICAgICAgZXJyb3I/OiAoZT86IGFueSkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgICAgICBjb21wbGV0ZT86ICgpID0+IHZvaWQpOiBTdWJzY3JpYmVyPFQ+IHtcbiAgICBjb25zdCBzdWJzY3JpYmVyID0gbmV3IFN1YnNjcmliZXIobmV4dCwgZXJyb3IsIGNvbXBsZXRlKTtcbiAgICBzdWJzY3JpYmVyLnN5bmNFcnJvclRocm93YWJsZSA9IGZhbHNlO1xuICAgIHJldHVybiBzdWJzY3JpYmVyO1xuICB9XG5cbiAgcHVibGljIHN5bmNFcnJvclZhbHVlOiBhbnkgPSBudWxsO1xuICBwdWJsaWMgc3luY0Vycm9yVGhyb3duOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBzeW5jRXJyb3JUaHJvd2FibGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcm90ZWN0ZWQgaXNTdG9wcGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByb3RlY3RlZCBkZXN0aW5hdGlvbjogUGFydGlhbE9ic2VydmVyPGFueT47IC8vIHRoaXMgYGFueWAgaXMgdGhlIGVzY2FwZSBoYXRjaCB0byBlcmFzZSBleHRyYSB0eXBlIHBhcmFtIChlLmcuIFIpXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JzZXJ2ZXJ8ZnVuY3Rpb24odmFsdWU6IFQpOiB2b2lkfSBbZGVzdGluYXRpb25Pck5leHRdIEEgcGFydGlhbGx5XG4gICAqIGRlZmluZWQgT2JzZXJ2ZXIgb3IgYSBgbmV4dGAgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oZTogP2FueSk6IHZvaWR9IFtlcnJvcl0gVGhlIGBlcnJvcmAgY2FsbGJhY2sgb2YgYW5cbiAgICogT2JzZXJ2ZXIuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oKTogdm9pZH0gW2NvbXBsZXRlXSBUaGUgYGNvbXBsZXRlYCBjYWxsYmFjayBvZiBhblxuICAgKiBPYnNlcnZlci5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uT3JOZXh0PzogUGFydGlhbE9ic2VydmVyPGFueT4gfCAoKHZhbHVlOiBUKSA9PiB2b2lkKSxcbiAgICAgICAgICAgICAgZXJyb3I/OiAoZT86IGFueSkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgY29tcGxldGU/OiAoKSA9PiB2b2lkKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gZW1wdHlPYnNlcnZlcjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGlmICghZGVzdGluYXRpb25Pck5leHQpIHtcbiAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gZW1wdHlPYnNlcnZlcjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGRlc3RpbmF0aW9uT3JOZXh0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGlmIChkZXN0aW5hdGlvbk9yTmV4dCBpbnN0YW5jZW9mIFN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSAoPFN1YnNjcmliZXI8YW55Pj4gZGVzdGluYXRpb25Pck5leHQpO1xuICAgICAgICAgICAgKDxhbnk+IHRoaXMuZGVzdGluYXRpb24pLmFkZCh0aGlzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zeW5jRXJyb3JUaHJvd2FibGUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IG5ldyBTYWZlU3Vic2NyaWJlcjxUPih0aGlzLCA8UGFydGlhbE9ic2VydmVyPGFueT4+IGRlc3RpbmF0aW9uT3JOZXh0KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuc3luY0Vycm9yVGhyb3dhYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IG5ldyBTYWZlU3Vic2NyaWJlcjxUPih0aGlzLCA8KCh2YWx1ZTogVCkgPT4gdm9pZCk+IGRlc3RpbmF0aW9uT3JOZXh0LCBlcnJvciwgY29tcGxldGUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIHtAbGluayBPYnNlcnZlcn0gY2FsbGJhY2sgdG8gcmVjZWl2ZSBub3RpZmljYXRpb25zIG9mIHR5cGUgYG5leHRgIGZyb21cbiAgICogdGhlIE9ic2VydmFibGUsIHdpdGggYSB2YWx1ZS4gVGhlIE9ic2VydmFibGUgbWF5IGNhbGwgdGhpcyBtZXRob2QgMCBvciBtb3JlXG4gICAqIHRpbWVzLlxuICAgKiBAcGFyYW0ge1R9IFt2YWx1ZV0gVGhlIGBuZXh0YCB2YWx1ZS5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIG5leHQodmFsdWU/OiBUKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgdGhpcy5fbmV4dCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSB7QGxpbmsgT2JzZXJ2ZXJ9IGNhbGxiYWNrIHRvIHJlY2VpdmUgbm90aWZpY2F0aW9ucyBvZiB0eXBlIGBlcnJvcmAgZnJvbVxuICAgKiB0aGUgT2JzZXJ2YWJsZSwgd2l0aCBhbiBhdHRhY2hlZCB7QGxpbmsgRXJyb3J9LiBOb3RpZmllcyB0aGUgT2JzZXJ2ZXIgdGhhdFxuICAgKiB0aGUgT2JzZXJ2YWJsZSBoYXMgZXhwZXJpZW5jZWQgYW4gZXJyb3IgY29uZGl0aW9uLlxuICAgKiBAcGFyYW0ge2FueX0gW2Vycl0gVGhlIGBlcnJvcmAgZXhjZXB0aW9uLlxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgZXJyb3IoZXJyPzogYW55KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fZXJyb3IoZXJyKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIHtAbGluayBPYnNlcnZlcn0gY2FsbGJhY2sgdG8gcmVjZWl2ZSBhIHZhbHVlbGVzcyBub3RpZmljYXRpb24gb2YgdHlwZVxuICAgKiBgY29tcGxldGVgIGZyb20gdGhlIE9ic2VydmFibGUuIE5vdGlmaWVzIHRoZSBPYnNlcnZlciB0aGF0IHRoZSBPYnNlcnZhYmxlXG4gICAqIGhhcyBmaW5pc2hlZCBzZW5kaW5nIHB1c2gtYmFzZWQgbm90aWZpY2F0aW9ucy5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIGNvbXBsZXRlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2NvbXBsZXRlKCk7XG4gICAgfVxuICB9XG5cbiAgdW5zdWJzY3JpYmUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNVbnN1YnNjcmliZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgIHN1cGVyLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IFQpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQodmFsdWUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9lcnJvcihlcnI6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NvbXBsZXRlKCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIFNhZmVTdWJzY3JpYmVyPFQ+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG5cbiAgcHJpdmF0ZSBfY29udGV4dDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BhcmVudDogU3Vic2NyaWJlcjxUPixcbiAgICAgICAgICAgICAgb2JzZXJ2ZXJPck5leHQ/OiBQYXJ0aWFsT2JzZXJ2ZXI8VD4gfCAoKHZhbHVlOiBUKSA9PiB2b2lkKSxcbiAgICAgICAgICAgICAgZXJyb3I/OiAoZT86IGFueSkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgY29tcGxldGU/OiAoKSA9PiB2b2lkKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGxldCBuZXh0OiAoKHZhbHVlOiBUKSA9PiB2b2lkKTtcbiAgICBsZXQgY29udGV4dDogYW55ID0gdGhpcztcblxuICAgIGlmIChpc0Z1bmN0aW9uKG9ic2VydmVyT3JOZXh0KSkge1xuICAgICAgbmV4dCA9ICg8KCh2YWx1ZTogVCkgPT4gdm9pZCk+IG9ic2VydmVyT3JOZXh0KTtcbiAgICB9IGVsc2UgaWYgKG9ic2VydmVyT3JOZXh0KSB7XG4gICAgICBjb250ZXh0ID0gb2JzZXJ2ZXJPck5leHQ7XG4gICAgICBuZXh0ID0gKDxQYXJ0aWFsT2JzZXJ2ZXI8VD4+IG9ic2VydmVyT3JOZXh0KS5uZXh0O1xuICAgICAgZXJyb3IgPSAoPFBhcnRpYWxPYnNlcnZlcjxUPj4gb2JzZXJ2ZXJPck5leHQpLmVycm9yO1xuICAgICAgY29tcGxldGUgPSAoPFBhcnRpYWxPYnNlcnZlcjxUPj4gb2JzZXJ2ZXJPck5leHQpLmNvbXBsZXRlO1xuICAgICAgaWYgKGlzRnVuY3Rpb24oY29udGV4dC51bnN1YnNjcmliZSkpIHtcbiAgICAgICAgdGhpcy5hZGQoPCgpID0+IHZvaWQ+IGNvbnRleHQudW5zdWJzY3JpYmUuYmluZChjb250ZXh0KSk7XG4gICAgICB9XG4gICAgICBjb250ZXh0LnVuc3Vic2NyaWJlID0gdGhpcy51bnN1YnNjcmliZS5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMuX25leHQgPSBuZXh0O1xuICAgIHRoaXMuX2Vycm9yID0gZXJyb3I7XG4gICAgdGhpcy5fY29tcGxldGUgPSBjb21wbGV0ZTtcbiAgfVxuXG4gIG5leHQodmFsdWU/OiBUKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzU3RvcHBlZCAmJiB0aGlzLl9uZXh0KSB7XG4gICAgICBjb25zdCB7IF9wYXJlbnQgfSA9IHRoaXM7XG4gICAgICBpZiAoIV9wYXJlbnQuc3luY0Vycm9yVGhyb3dhYmxlKSB7XG4gICAgICAgIHRoaXMuX190cnlPclVuc3ViKHRoaXMuX25leHQsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fX3RyeU9yU2V0RXJyb3IoX3BhcmVudCwgdGhpcy5fbmV4dCwgdmFsdWUpKSB7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBlcnJvcihlcnI/OiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICBjb25zdCB7IF9wYXJlbnQgfSA9IHRoaXM7XG4gICAgICBpZiAodGhpcy5fZXJyb3IpIHtcbiAgICAgICAgaWYgKCFfcGFyZW50LnN5bmNFcnJvclRocm93YWJsZSkge1xuICAgICAgICAgIHRoaXMuX190cnlPclVuc3ViKHRoaXMuX2Vycm9yLCBlcnIpO1xuICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9fdHJ5T3JTZXRFcnJvcihfcGFyZW50LCB0aGlzLl9lcnJvciwgZXJyKTtcbiAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoIV9wYXJlbnQuc3luY0Vycm9yVGhyb3dhYmxlKSB7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3BhcmVudC5zeW5jRXJyb3JWYWx1ZSA9IGVycjtcbiAgICAgICAgX3BhcmVudC5zeW5jRXJyb3JUaHJvd24gPSB0cnVlO1xuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29tcGxldGUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgY29uc3QgeyBfcGFyZW50IH0gPSB0aGlzO1xuICAgICAgaWYgKHRoaXMuX2NvbXBsZXRlKSB7XG4gICAgICAgIGlmICghX3BhcmVudC5zeW5jRXJyb3JUaHJvd2FibGUpIHtcbiAgICAgICAgICB0aGlzLl9fdHJ5T3JVbnN1Yih0aGlzLl9jb21wbGV0ZSk7XG4gICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX190cnlPclNldEVycm9yKF9wYXJlbnQsIHRoaXMuX2NvbXBsZXRlKTtcbiAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9fdHJ5T3JVbnN1YihmbjogRnVuY3Rpb24sIHZhbHVlPzogYW55KTogdm9pZCB7XG4gICAgdHJ5IHtcbiAgICAgIGZuLmNhbGwodGhpcy5fY29udGV4dCwgdmFsdWUpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX190cnlPclNldEVycm9yKHBhcmVudDogU3Vic2NyaWJlcjxUPiwgZm46IEZ1bmN0aW9uLCB2YWx1ZT86IGFueSk6IGJvb2xlYW4ge1xuICAgIHRyeSB7XG4gICAgICBmbi5jYWxsKHRoaXMuX2NvbnRleHQsIHZhbHVlKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHBhcmVudC5zeW5jRXJyb3JWYWx1ZSA9IGVycjtcbiAgICAgIHBhcmVudC5zeW5jRXJyb3JUaHJvd24gPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfdW5zdWJzY3JpYmUoKTogdm9pZCB7XG4gICAgY29uc3QgeyBfcGFyZW50IH0gPSB0aGlzO1xuICAgIHRoaXMuX2NvbnRleHQgPSBudWxsO1xuICAgIHRoaXMuX3BhcmVudCA9IG51bGw7XG4gICAgX3BhcmVudC51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
