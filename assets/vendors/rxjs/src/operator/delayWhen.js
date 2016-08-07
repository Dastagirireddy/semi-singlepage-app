System.register(['../Subscriber', '../Observable', '../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1, Observable_1, OuterSubscriber_1, subscribeToResult_1;
    var DelayWhenOperator, DelayWhenSubscriber, SubscriptionDelayObservable, SubscriptionDelaySubscriber;
    /**
     * Delays the emission of items from the source Observable by a given time span
     * determined by the emissions of another Observable.
     *
     * <span class="informal">It's like {@link delay}, but the time span of the
     * delay duration is determined by a second Observable.</span>
     *
     * <img src="./img/delayWhen.png" width="100%">
     *
     * `delayWhen` time shifts each emitted value from the source Observable by a
     * time span determined by another Observable. When the source emits a value,
     * the `delayDurationSelector` function is called with the source value as
     * argument, and should return an Observable, called the "duration" Observable.
     * The source value is emitted on the output Observable only when the duration
     * Observable emits a value or completes.
     *
     * Optionally, `delayWhen` takes a second argument, `subscriptionDelay`, which
     * is an Observable. When `subscriptionDelay` emits its first value or
     * completes, the source Observable is subscribed to and starts behaving like
     * described in the previous paragraph. If `subscriptionDelay` is not provided,
     * `delayWhen` will subscribe to the source Observable as soon as the output
     * Observable is subscribed.
     *
     * @example <caption>Delay each click by a random amount of time, between 0 and 5 seconds</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var delayedClicks = clicks.delayWhen(event =>
     *   Rx.Observable.interval(Math.random() * 5000)
     * );
     * delayedClicks.subscribe(x => console.log(x));
     *
     * @see {@link debounce}
     * @see {@link delay}
     *
     * @param {function(value: T): Observable} delayDurationSelector A function that
     * returns an Observable for each value emitted by the source Observable, which
     * is then used to delay the emission of that item on the output Observable
     * until the Observable returned from this function emits a value.
     * @param {Observable} subscriptionDelay An Observable that triggers the
     * subscription to the source Observable once it emits any value.
     * @return {Observable} An Observable that delays the emissions of the source
     * Observable by an amount of time specified by the Observable returned by
     * `delayDurationSelector`.
     * @method delayWhen
     * @owner Observable
     */
    function delayWhen(delayDurationSelector, subscriptionDelay) {
        if (subscriptionDelay) {
            return new SubscriptionDelayObservable(this, subscriptionDelay)
                .lift(new DelayWhenOperator(delayDurationSelector));
        }
        return this.lift(new DelayWhenOperator(delayDurationSelector));
    }
    exports_1("delayWhen", delayWhen);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            DelayWhenOperator = (function () {
                function DelayWhenOperator(delayDurationSelector) {
                    this.delayDurationSelector = delayDurationSelector;
                }
                DelayWhenOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new DelayWhenSubscriber(subscriber, this.delayDurationSelector));
                };
                return DelayWhenOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            DelayWhenSubscriber = (function (_super) {
                __extends(DelayWhenSubscriber, _super);
                function DelayWhenSubscriber(destination, delayDurationSelector) {
                    _super.call(this, destination);
                    this.delayDurationSelector = delayDurationSelector;
                    this.completed = false;
                    this.delayNotifierSubscriptions = [];
                    this.values = [];
                }
                DelayWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.destination.next(outerValue);
                    this.removeSubscription(innerSub);
                    this.tryComplete();
                };
                DelayWhenSubscriber.prototype.notifyError = function (error, innerSub) {
                    this._error(error);
                };
                DelayWhenSubscriber.prototype.notifyComplete = function (innerSub) {
                    var value = this.removeSubscription(innerSub);
                    if (value) {
                        this.destination.next(value);
                    }
                    this.tryComplete();
                };
                DelayWhenSubscriber.prototype._next = function (value) {
                    try {
                        var delayNotifier = this.delayDurationSelector(value);
                        if (delayNotifier) {
                            this.tryDelay(delayNotifier, value);
                        }
                    }
                    catch (err) {
                        this.destination.error(err);
                    }
                };
                DelayWhenSubscriber.prototype._complete = function () {
                    this.completed = true;
                    this.tryComplete();
                };
                DelayWhenSubscriber.prototype.removeSubscription = function (subscription) {
                    subscription.unsubscribe();
                    var subscriptionIdx = this.delayNotifierSubscriptions.indexOf(subscription);
                    var value = null;
                    if (subscriptionIdx !== -1) {
                        value = this.values[subscriptionIdx];
                        this.delayNotifierSubscriptions.splice(subscriptionIdx, 1);
                        this.values.splice(subscriptionIdx, 1);
                    }
                    return value;
                };
                DelayWhenSubscriber.prototype.tryDelay = function (delayNotifier, value) {
                    var notifierSubscription = subscribeToResult_1.subscribeToResult(this, delayNotifier, value);
                    this.add(notifierSubscription);
                    this.delayNotifierSubscriptions.push(notifierSubscription);
                    this.values.push(value);
                };
                DelayWhenSubscriber.prototype.tryComplete = function () {
                    if (this.completed && this.delayNotifierSubscriptions.length === 0) {
                        this.destination.complete();
                    }
                };
                return DelayWhenSubscriber;
            }(OuterSubscriber_1.OuterSubscriber));
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            SubscriptionDelayObservable = (function (_super) {
                __extends(SubscriptionDelayObservable, _super);
                function SubscriptionDelayObservable(source, subscriptionDelay) {
                    _super.call(this);
                    this.source = source;
                    this.subscriptionDelay = subscriptionDelay;
                }
                SubscriptionDelayObservable.prototype._subscribe = function (subscriber) {
                    this.subscriptionDelay.subscribe(new SubscriptionDelaySubscriber(subscriber, this.source));
                };
                return SubscriptionDelayObservable;
            }(Observable_1.Observable));
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            SubscriptionDelaySubscriber = (function (_super) {
                __extends(SubscriptionDelaySubscriber, _super);
                function SubscriptionDelaySubscriber(parent, source) {
                    _super.call(this);
                    this.parent = parent;
                    this.source = source;
                    this.sourceSubscribed = false;
                }
                SubscriptionDelaySubscriber.prototype._next = function (unused) {
                    this.subscribeToSource();
                };
                SubscriptionDelaySubscriber.prototype._error = function (err) {
                    this.unsubscribe();
                    this.parent.error(err);
                };
                SubscriptionDelaySubscriber.prototype._complete = function () {
                    this.subscribeToSource();
                };
                SubscriptionDelaySubscriber.prototype.subscribeToSource = function () {
                    if (!this.sourceSubscribed) {
                        this.sourceSubscribed = true;
                        this.unsubscribe();
                        this.source.subscribe(this.parent);
                    }
                };
                return SubscriptionDelaySubscriber;
            }(Subscriber_1.Subscriber));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL2RlbGF5V2hlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBU0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNENHO0lBQ0gsbUJBQTZCLHFCQUFvRCxFQUNwRCxpQkFBbUM7UUFDOUQsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxJQUFJLDJCQUEyQixDQUFDLElBQUksRUFBRSxpQkFBaUIsQ0FBQztpQkFDdEQsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO1FBQzlELENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFpQixDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBUEQsaUNBT0MsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7OztZQU1EO2dCQUNFLDJCQUFvQixxQkFBb0Q7b0JBQXBELDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBK0I7Z0JBQ3hFLENBQUM7Z0JBRUQsZ0NBQUksR0FBSixVQUFLLFVBQXlCLEVBQUUsTUFBVztvQkFDekMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztnQkFDNUYsQ0FBQztnQkFDSCx3QkFBQztZQUFELENBUEEsQUFPQyxJQUFBO1lBRUQ7Ozs7ZUFJRztZQUNIO2dCQUF3Qyx1Q0FBcUI7Z0JBSzNELDZCQUFZLFdBQTBCLEVBQ2xCLHFCQUFvRDtvQkFDdEUsa0JBQU0sV0FBVyxDQUFDLENBQUM7b0JBREQsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUErQjtvQkFMaEUsY0FBUyxHQUFZLEtBQUssQ0FBQztvQkFDM0IsK0JBQTBCLEdBQXdCLEVBQUUsQ0FB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LGlCQUFpQixFQUFFLENBQUM7Z0JBQzNCLENBQUM7Z0JBRU8sdURBQWlCLEdBQXpCO29CQUNFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQzt3QkFDM0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQzt3QkFDN0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO3dCQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3JDLENBQUM7Z0JBQ0gsQ0FBQztnQkFDSCxrQ0FBQztZQUFELENBM0JBLEFBMkJDLENBM0I0Qyx1QkFBVSxHQTJCdEQiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvcnhqcy9zcmMvb3BlcmF0b3IvZGVsYXlXaGVuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPcGVyYXRvcn0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHtTdWJzY3JpYmVyfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcblxuaW1wb3J0IHtPdXRlclN1YnNjcmliZXJ9IGZyb20gJy4uL091dGVyU3Vic2NyaWJlcic7XG5pbXBvcnQge0lubmVyU3Vic2NyaWJlcn0gZnJvbSAnLi4vSW5uZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7c3Vic2NyaWJlVG9SZXN1bHR9IGZyb20gJy4uL3V0aWwvc3Vic2NyaWJlVG9SZXN1bHQnO1xuXG4vKipcbiAqIERlbGF5cyB0aGUgZW1pc3Npb24gb2YgaXRlbXMgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUgYnkgYSBnaXZlbiB0aW1lIHNwYW5cbiAqIGRldGVybWluZWQgYnkgdGhlIGVtaXNzaW9ucyBvZiBhbm90aGVyIE9ic2VydmFibGUuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkl0J3MgbGlrZSB7QGxpbmsgZGVsYXl9LCBidXQgdGhlIHRpbWUgc3BhbiBvZiB0aGVcbiAqIGRlbGF5IGR1cmF0aW9uIGlzIGRldGVybWluZWQgYnkgYSBzZWNvbmQgT2JzZXJ2YWJsZS48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9kZWxheVdoZW4ucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogYGRlbGF5V2hlbmAgdGltZSBzaGlmdHMgZWFjaCBlbWl0dGVkIHZhbHVlIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGJ5IGFcbiAqIHRpbWUgc3BhbiBkZXRlcm1pbmVkIGJ5IGFub3RoZXIgT2JzZXJ2YWJsZS4gV2hlbiB0aGUgc291cmNlIGVtaXRzIGEgdmFsdWUsXG4gKiB0aGUgYGRlbGF5RHVyYXRpb25TZWxlY3RvcmAgZnVuY3Rpb24gaXMgY2FsbGVkIHdpdGggdGhlIHNvdXJjZSB2YWx1ZSBhc1xuICogYXJndW1lbnQsIGFuZCBzaG91bGQgcmV0dXJuIGFuIE9ic2VydmFibGUsIGNhbGxlZCB0aGUgXCJkdXJhdGlvblwiIE9ic2VydmFibGUuXG4gKiBUaGUgc291cmNlIHZhbHVlIGlzIGVtaXR0ZWQgb24gdGhlIG91dHB1dCBPYnNlcnZhYmxlIG9ubHkgd2hlbiB0aGUgZHVyYXRpb25cbiAqIE9ic2VydmFibGUgZW1pdHMgYSB2YWx1ZSBvciBjb21wbGV0ZXMuXG4gKlxuICogT3B0aW9uYWxseSwgYGRlbGF5V2hlbmAgdGFrZXMgYSBzZWNvbmQgYXJndW1lbnQsIGBzdWJzY3JpcHRpb25EZWxheWAsIHdoaWNoXG4gKiBpcyBhbiBPYnNlcnZhYmxlLiBXaGVuIGBzdWJzY3JpcHRpb25EZWxheWAgZW1pdHMgaXRzIGZpcnN0IHZhbHVlIG9yXG4gKiBjb21wbGV0ZXMsIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBpcyBzdWJzY3JpYmVkIHRvIGFuZCBzdGFydHMgYmVoYXZpbmcgbGlrZVxuICogZGVzY3JpYmVkIGluIHRoZSBwcmV2aW91cyBwYXJhZ3JhcGguIElmIGBzdWJzY3JpcHRpb25EZWxheWAgaXMgbm90IHByb3ZpZGVkLFxuICogYGRlbGF5V2hlbmAgd2lsbCBzdWJzY3JpYmUgdG8gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGFzIHNvb24gYXMgdGhlIG91dHB1dFxuICogT2JzZXJ2YWJsZSBpcyBzdWJzY3JpYmVkLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkRlbGF5IGVhY2ggY2xpY2sgYnkgYSByYW5kb20gYW1vdW50IG9mIHRpbWUsIGJldHdlZW4gMCBhbmQgNSBzZWNvbmRzPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciBkZWxheWVkQ2xpY2tzID0gY2xpY2tzLmRlbGF5V2hlbihldmVudCA9PlxuICogICBSeC5PYnNlcnZhYmxlLmludGVydmFsKE1hdGgucmFuZG9tKCkgKiA1MDAwKVxuICogKTtcbiAqIGRlbGF5ZWRDbGlja3Muc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGRlYm91bmNlfVxuICogQHNlZSB7QGxpbmsgZGVsYXl9XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbih2YWx1ZTogVCk6IE9ic2VydmFibGV9IGRlbGF5RHVyYXRpb25TZWxlY3RvciBBIGZ1bmN0aW9uIHRoYXRcbiAqIHJldHVybnMgYW4gT2JzZXJ2YWJsZSBmb3IgZWFjaCB2YWx1ZSBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgd2hpY2hcbiAqIGlzIHRoZW4gdXNlZCB0byBkZWxheSB0aGUgZW1pc3Npb24gb2YgdGhhdCBpdGVtIG9uIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZVxuICogdW50aWwgdGhlIE9ic2VydmFibGUgcmV0dXJuZWQgZnJvbSB0aGlzIGZ1bmN0aW9uIGVtaXRzIGEgdmFsdWUuXG4gKiBAcGFyYW0ge09ic2VydmFibGV9IHN1YnNjcmlwdGlvbkRlbGF5IEFuIE9ic2VydmFibGUgdGhhdCB0cmlnZ2VycyB0aGVcbiAqIHN1YnNjcmlwdGlvbiB0byB0aGUgc291cmNlIE9ic2VydmFibGUgb25jZSBpdCBlbWl0cyBhbnkgdmFsdWUuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgZGVsYXlzIHRoZSBlbWlzc2lvbnMgb2YgdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZSBieSBhbiBhbW91bnQgb2YgdGltZSBzcGVjaWZpZWQgYnkgdGhlIE9ic2VydmFibGUgcmV0dXJuZWQgYnlcbiAqIGBkZWxheUR1cmF0aW9uU2VsZWN0b3JgLlxuICogQG1ldGhvZCBkZWxheVdoZW5cbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWxheVdoZW48VD4oZGVsYXlEdXJhdGlvblNlbGVjdG9yOiAodmFsdWU6IFQpID0+IE9ic2VydmFibGU8YW55PixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uRGVsYXk/OiBPYnNlcnZhYmxlPGFueT4pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgaWYgKHN1YnNjcmlwdGlvbkRlbGF5KSB7XG4gICAgcmV0dXJuIG5ldyBTdWJzY3JpcHRpb25EZWxheU9ic2VydmFibGUodGhpcywgc3Vic2NyaXB0aW9uRGVsYXkpXG4gICAgICAgICAgICAubGlmdChuZXcgRGVsYXlXaGVuT3BlcmF0b3IoZGVsYXlEdXJhdGlvblNlbGVjdG9yKSk7XG4gIH1cbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgRGVsYXlXaGVuT3BlcmF0b3IoZGVsYXlEdXJhdGlvblNlbGVjdG9yKSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGVsYXlXaGVuU2lnbmF0dXJlPFQ+IHtcbiAgKGRlbGF5RHVyYXRpb25TZWxlY3RvcjogKHZhbHVlOiBUKSA9PiBPYnNlcnZhYmxlPGFueT4sIHN1YnNjcmlwdGlvbkRlbGF5PzogT2JzZXJ2YWJsZTxhbnk+KTogT2JzZXJ2YWJsZTxUPjtcbn1cblxuY2xhc3MgRGVsYXlXaGVuT3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVsYXlEdXJhdGlvblNlbGVjdG9yOiAodmFsdWU6IFQpID0+IE9ic2VydmFibGU8YW55Pikge1xuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+LCBzb3VyY2U6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHNvdXJjZS5fc3Vic2NyaWJlKG5ldyBEZWxheVdoZW5TdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMuZGVsYXlEdXJhdGlvblNlbGVjdG9yKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIERlbGF5V2hlblN1YnNjcmliZXI8VCwgUj4gZXh0ZW5kcyBPdXRlclN1YnNjcmliZXI8VCwgUj4ge1xuICBwcml2YXRlIGNvbXBsZXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGRlbGF5Tm90aWZpZXJTdWJzY3JpcHRpb25zOiBBcnJheTxTdWJzY3JpcHRpb24+ID0gW107XG4gIHByaXZhdGUgdmFsdWVzOiBBcnJheTxUPiA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPFQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIGRlbGF5RHVyYXRpb25TZWxlY3RvcjogKHZhbHVlOiBUKSA9PiBPYnNlcnZhYmxlPGFueT4pIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBub3RpZnlOZXh0KG91dGVyVmFsdWU6IFQsIGlubmVyVmFsdWU6IGFueSxcbiAgICAgICAgICAgICBvdXRlckluZGV4OiBudW1iZXIsIGlubmVySW5kZXg6IG51bWJlcixcbiAgICAgICAgICAgICBpbm5lclN1YjogSW5uZXJTdWJzY3JpYmVyPFQsIFI+KTogdm9pZCB7XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KG91dGVyVmFsdWUpO1xuICAgIHRoaXMucmVtb3ZlU3Vic2NyaXB0aW9uKGlubmVyU3ViKTtcbiAgICB0aGlzLnRyeUNvbXBsZXRlKCk7XG4gIH1cblxuICBub3RpZnlFcnJvcihlcnJvcjogYW55LCBpbm5lclN1YjogSW5uZXJTdWJzY3JpYmVyPFQsIFI+KTogdm9pZCB7XG4gICAgdGhpcy5fZXJyb3IoZXJyb3IpO1xuICB9XG5cbiAgbm90aWZ5Q29tcGxldGUoaW5uZXJTdWI6IElubmVyU3Vic2NyaWJlcjxULCBSPik6IHZvaWQge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5yZW1vdmVTdWJzY3JpcHRpb24oaW5uZXJTdWIpO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy50cnlDb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKTogdm9pZCB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGRlbGF5Tm90aWZpZXIgPSB0aGlzLmRlbGF5RHVyYXRpb25TZWxlY3Rvcih2YWx1ZSk7XG4gICAgICBpZiAoZGVsYXlOb3RpZmllcikge1xuICAgICAgICB0aGlzLnRyeURlbGF5KGRlbGF5Tm90aWZpZXIsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfY29tcGxldGUoKTogdm9pZCB7XG4gICAgdGhpcy5jb21wbGV0ZWQgPSB0cnVlO1xuICAgIHRoaXMudHJ5Q29tcGxldGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlU3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbjogSW5uZXJTdWJzY3JpYmVyPFQsIFI+KTogVCB7XG4gICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cbiAgICBjb25zdCBzdWJzY3JpcHRpb25JZHggPSB0aGlzLmRlbGF5Tm90aWZpZXJTdWJzY3JpcHRpb25zLmluZGV4T2Yoc3Vic2NyaXB0aW9uKTtcbiAgICBsZXQgdmFsdWU6IFQgPSBudWxsO1xuXG4gICAgaWYgKHN1YnNjcmlwdGlvbklkeCAhPT0gLTEpIHtcbiAgICAgIHZhbHVlID0gdGhpcy52YWx1ZXNbc3Vic2NyaXB0aW9uSWR4XTtcbiAgICAgIHRoaXMuZGVsYXlOb3RpZmllclN1YnNjcmlwdGlvbnMuc3BsaWNlKHN1YnNjcmlwdGlvbklkeCwgMSk7XG4gICAgICB0aGlzLnZhbHVlcy5zcGxpY2Uoc3Vic2NyaXB0aW9uSWR4LCAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIHRyeURlbGF5KGRlbGF5Tm90aWZpZXI6IE9ic2VydmFibGU8YW55PiwgdmFsdWU6IFQpOiB2b2lkIHtcbiAgICBjb25zdCBub3RpZmllclN1YnNjcmlwdGlvbiA9IHN1YnNjcmliZVRvUmVzdWx0KHRoaXMsIGRlbGF5Tm90aWZpZXIsIHZhbHVlKTtcbiAgICB0aGlzLmFkZChub3RpZmllclN1YnNjcmlwdGlvbik7XG5cbiAgICB0aGlzLmRlbGF5Tm90aWZpZXJTdWJzY3JpcHRpb25zLnB1c2gobm90aWZpZXJTdWJzY3JpcHRpb24pO1xuICAgIHRoaXMudmFsdWVzLnB1c2godmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSB0cnlDb21wbGV0ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb21wbGV0ZWQgJiYgdGhpcy5kZWxheU5vdGlmaWVyU3Vic2NyaXB0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIFN1YnNjcmlwdGlvbkRlbGF5T2JzZXJ2YWJsZTxUPiBleHRlbmRzIE9ic2VydmFibGU8VD4ge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgc291cmNlOiBPYnNlcnZhYmxlPFQ+LCBwcml2YXRlIHN1YnNjcmlwdGlvbkRlbGF5OiBPYnNlcnZhYmxlPGFueT4pIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmUoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPikge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uRGVsYXkuc3Vic2NyaWJlKG5ldyBTdWJzY3JpcHRpb25EZWxheVN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5zb3VyY2UpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgU3Vic2NyaXB0aW9uRGVsYXlTdWJzY3JpYmVyPFQ+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG4gIHByaXZhdGUgc291cmNlU3Vic2NyaWJlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFyZW50OiBTdWJzY3JpYmVyPFQ+LCBwcml2YXRlIHNvdXJjZTogT2JzZXJ2YWJsZTxUPikge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodW51c2VkOiBhbnkpIHtcbiAgICB0aGlzLnN1YnNjcmliZVRvU291cmNlKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2Vycm9yKGVycjogYW55KSB7XG4gICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMucGFyZW50LmVycm9yKGVycik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NvbXBsZXRlKCkge1xuICAgIHRoaXMuc3Vic2NyaWJlVG9Tb3VyY2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9Tb3VyY2UoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnNvdXJjZVN1YnNjcmliZWQpIHtcbiAgICAgIHRoaXMuc291cmNlU3Vic2NyaWJlZCA9IHRydWU7XG4gICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLnNvdXJjZS5zdWJzY3JpYmUodGhpcy5wYXJlbnQpO1xuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
