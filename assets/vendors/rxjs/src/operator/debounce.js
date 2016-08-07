System.register(['../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var OuterSubscriber_1, subscribeToResult_1;
    var DebounceOperator, DebounceSubscriber;
    /**
     * Emits a value from the source Observable only after a particular time span
     * determined by another Observable has passed without another source emission.
     *
     * <span class="informal">It's like {@link debounceTime}, but the time span of
     * emission silence is determined by a second Observable.</span>
     *
     * <img src="./img/debounce.png" width="100%">
     *
     * `debounce` delays values emitted by the source Observable, but drops previous
     * pending delayed emissions if a new value arrives on the source Observable.
     * This operator keeps track of the most recent value from the source
     * Observable, and spawns a duration Observable by calling the
     * `durationSelector` function. The value is emitted only when the duration
     * Observable emits a value or completes, and if no other value was emitted on
     * the source Observable since the duration Observable was spawned. If a new
     * value appears before the duration Observable emits, the previous value will
     * be dropped and will not be emitted on the output Observable.
     *
     * Like {@link debounceTime}, this is a rate-limiting operator, and also a
     * delay-like operator since output emissions do not necessarily occur at the
     * same time as they did on the source Observable.
     *
     * @example <caption>Emit the most recent click after a burst of clicks</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var result = clicks.debounce(() => Rx.Observable.interval(1000));
     * result.subscribe(x => console.log(x));
     *
     * @see {@link audit}
     * @see {@link debounceTime}
     * @see {@link delayWhen}
     * @see {@link throttle}
     *
     * @param {function(value: T): Observable|Promise} durationSelector A function
     * that receives a value from the source Observable, for computing the timeout
     * duration for each source value, returned as an Observable or a Promise.
     * @return {Observable} An Observable that delays the emissions of the source
     * Observable by the specified duration Observable returned by
     * `durationSelector`, and may drop some values if they occur too frequently.
     * @method debounce
     * @owner Observable
     */
    function debounce(durationSelector) {
        return this.lift(new DebounceOperator(durationSelector));
    }
    exports_1("debounce", debounce);
    return {
        setters:[
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            DebounceOperator = (function () {
                function DebounceOperator(durationSelector) {
                    this.durationSelector = durationSelector;
                }
                DebounceOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new DebounceSubscriber(subscriber, this.durationSelector));
                };
                return DebounceOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            DebounceSubscriber = (function (_super) {
                __extends(DebounceSubscriber, _super);
                function DebounceSubscriber(destination, durationSelector) {
                    _super.call(this, destination);
                    this.durationSelector = durationSelector;
                    this.hasValue = false;
                    this.durationSubscription = null;
                }
                DebounceSubscriber.prototype._next = function (value) {
                    try {
                        var result = this.durationSelector.call(this, value);
                        if (result) {
                            this._tryNext(value, result);
                        }
                    }
                    catch (err) {
                        this.destination.error(err);
                    }
                };
                DebounceSubscriber.prototype._complete = function () {
                    this.emitValue();
                    this.destination.complete();
                };
                DebounceSubscriber.prototype._tryNext = function (value, duration) {
                    var subscription = this.durationSubscription;
                    this.value = value;
                    this.hasValue = true;
                    if (subscription) {
                        subscription.unsubscribe();
                        this.remove(subscription);
                    }
                    subscription = subscribeToResult_1.subscribeToResult(this, duration);
                    if (!subscription.isUnsubscribed) {
                        this.add(this.durationSubscription = subscription);
                    }
                };
                DebounceSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.emitValue();
                };
                DebounceSubscriber.prototype.notifyComplete = function () {
                    this.emitValue();
                };
                DebounceSubscriber.prototype.emitValue = function () {
                    if (this.hasValue) {
                        var value = this.value;
                        var subscription = this.durationSubscription;
                        if (subscription) {
                            this.durationSubscription = null;
                            subscription.unsubscribe();
                            this.remove(subscription);
                        }
                        this.value = null;
                        this.hasValue = false;
                        _super.prototype._next.call(this, value);
                    }
                };
                return DebounceSubscriber;
            }(OuterSubscriber_1.OuterSubscriber));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL2RlYm91bmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFTQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Q0c7SUFDSCxrQkFBNEIsZ0JBQTZEO1FBQ3ZGLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFGRCwrQkFFQyxDQUFBOzs7Ozs7Ozs7O1lBTUQ7Z0JBQ0UsMEJBQW9CLGdCQUE2RDtvQkFBN0QscUJBQWdCLEdBQWhCLGdCQUFnQixDQUE2QztnQkFDakYsQ0FBQztnQkFFRCwrQkFBSSxHQUFKLFVBQUssVUFBeUIsRUFBRSxNQUFXO29CQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO2dCQUN0RixDQUFDO2dCQUNILHVCQUFDO1lBQUQsQ0FQQSxBQU9DLElBQUE7WUFFRDs7OztlQUlHO1lBQ0g7Z0JBQXVDLHNDQUFxQjtnQkFLMUQsNEJBQVksV0FBMEIsRUFDbEIsZ0JBQTZEO29CQUMvRSxrQkFBTSxXQUFXLENBQUMsQ0FBQztvQkFERCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQTZDO29CQUp6RSxhQUFRLEdBQVksS0FBSyxDQUFDO29CQUMxQix5QkFBb0IsR0FBaUIsSUFBSSxDQUFDO2dCQUtsRCxDQUFDO2dCQUVTLGtDQUFLLEdBQWYsVUFBZ0IsS0FBUTtvQkFDdEIsSUFBSSxDQUFDO3dCQUNILElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO3dCQUV2RCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOzRCQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO3dCQUMvQixDQUFDO29CQUNILENBQUU7b0JBQUEsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDYixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDOUIsQ0FBQztnQkFDSCxDQUFDO2dCQUVTLHNDQUFTLEdBQW5CO29CQUNFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDOUIsQ0FBQztnQkFFTyxxQ0FBUSxHQUFoQixVQUFpQixLQUFRLEVBQUUsUUFBdUM7b0JBQ2hFLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztvQkFDN0MsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7b0JBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO29CQUNyQixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO3dCQUNqQixZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7d0JBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQzVCLENBQUM7b0JBRUQsWUFBWSxHQUFHLHFDQUFpQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDakQsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQzt3QkFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsWUFBWSxDQUFDLENBQUM7b0JBQ3JELENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCx1Q0FBVSxHQUFWLFVBQVcsVUFBYSxFQUFFLFVBQWEsRUFDNUIsVUFBa0IsRUFBRSxVQUFrQixFQUN0QyxRQUErQjtvQkFDeEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNuQixDQUFDO2dCQUVELDJDQUFjLEdBQWQ7b0JBQ0UsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNuQixDQUFDO2dCQUVELHNDQUFTLEdBQVQ7b0JBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7d0JBQ2xCLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7d0JBQ3pCLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQzt3QkFDL0MsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzs0QkFDakIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQzs0QkFDakMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDOzRCQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO3dCQUM1QixDQUFDO3dCQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO3dCQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQzt3QkFDdEIsZ0JBQUssQ0FBQyxLQUFLLFlBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3JCLENBQUM7Z0JBQ0gsQ0FBQztnQkFDSCx5QkFBQztZQUFELENBbEVBLEFBa0VDLENBbEVzQyxpQ0FBZSxHQWtFckQiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvcnhqcy9zcmMvb3BlcmF0b3IvZGVib3VuY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09wZXJhdG9yfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmliYWJsZU9yUHJvbWlzZX0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQge1N1YnNjcmliZXJ9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5cbmltcG9ydCB7T3V0ZXJTdWJzY3JpYmVyfSBmcm9tICcuLi9PdXRlclN1YnNjcmliZXInO1xuaW1wb3J0IHtJbm5lclN1YnNjcmliZXJ9IGZyb20gJy4uL0lubmVyU3Vic2NyaWJlcic7XG5pbXBvcnQge3N1YnNjcmliZVRvUmVzdWx0fSBmcm9tICcuLi91dGlsL3N1YnNjcmliZVRvUmVzdWx0JztcblxuLyoqXG4gKiBFbWl0cyBhIHZhbHVlIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIG9ubHkgYWZ0ZXIgYSBwYXJ0aWN1bGFyIHRpbWUgc3BhblxuICogZGV0ZXJtaW5lZCBieSBhbm90aGVyIE9ic2VydmFibGUgaGFzIHBhc3NlZCB3aXRob3V0IGFub3RoZXIgc291cmNlIGVtaXNzaW9uLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5JdCdzIGxpa2Uge0BsaW5rIGRlYm91bmNlVGltZX0sIGJ1dCB0aGUgdGltZSBzcGFuIG9mXG4gKiBlbWlzc2lvbiBzaWxlbmNlIGlzIGRldGVybWluZWQgYnkgYSBzZWNvbmQgT2JzZXJ2YWJsZS48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9kZWJvdW5jZS5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBgZGVib3VuY2VgIGRlbGF5cyB2YWx1ZXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUsIGJ1dCBkcm9wcyBwcmV2aW91c1xuICogcGVuZGluZyBkZWxheWVkIGVtaXNzaW9ucyBpZiBhIG5ldyB2YWx1ZSBhcnJpdmVzIG9uIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqIFRoaXMgb3BlcmF0b3Iga2VlcHMgdHJhY2sgb2YgdGhlIG1vc3QgcmVjZW50IHZhbHVlIGZyb20gdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZSwgYW5kIHNwYXducyBhIGR1cmF0aW9uIE9ic2VydmFibGUgYnkgY2FsbGluZyB0aGVcbiAqIGBkdXJhdGlvblNlbGVjdG9yYCBmdW5jdGlvbi4gVGhlIHZhbHVlIGlzIGVtaXR0ZWQgb25seSB3aGVuIHRoZSBkdXJhdGlvblxuICogT2JzZXJ2YWJsZSBlbWl0cyBhIHZhbHVlIG9yIGNvbXBsZXRlcywgYW5kIGlmIG5vIG90aGVyIHZhbHVlIHdhcyBlbWl0dGVkIG9uXG4gKiB0aGUgc291cmNlIE9ic2VydmFibGUgc2luY2UgdGhlIGR1cmF0aW9uIE9ic2VydmFibGUgd2FzIHNwYXduZWQuIElmIGEgbmV3XG4gKiB2YWx1ZSBhcHBlYXJzIGJlZm9yZSB0aGUgZHVyYXRpb24gT2JzZXJ2YWJsZSBlbWl0cywgdGhlIHByZXZpb3VzIHZhbHVlIHdpbGxcbiAqIGJlIGRyb3BwZWQgYW5kIHdpbGwgbm90IGJlIGVtaXR0ZWQgb24gdGhlIG91dHB1dCBPYnNlcnZhYmxlLlxuICpcbiAqIExpa2Uge0BsaW5rIGRlYm91bmNlVGltZX0sIHRoaXMgaXMgYSByYXRlLWxpbWl0aW5nIG9wZXJhdG9yLCBhbmQgYWxzbyBhXG4gKiBkZWxheS1saWtlIG9wZXJhdG9yIHNpbmNlIG91dHB1dCBlbWlzc2lvbnMgZG8gbm90IG5lY2Vzc2FyaWx5IG9jY3VyIGF0IHRoZVxuICogc2FtZSB0aW1lIGFzIHRoZXkgZGlkIG9uIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0IHRoZSBtb3N0IHJlY2VudCBjbGljayBhZnRlciBhIGJ1cnN0IG9mIGNsaWNrczwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcmVzdWx0ID0gY2xpY2tzLmRlYm91bmNlKCgpID0+IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCkpO1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBhdWRpdH1cbiAqIEBzZWUge0BsaW5rIGRlYm91bmNlVGltZX1cbiAqIEBzZWUge0BsaW5rIGRlbGF5V2hlbn1cbiAqIEBzZWUge0BsaW5rIHRocm90dGxlfVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24odmFsdWU6IFQpOiBPYnNlcnZhYmxlfFByb21pc2V9IGR1cmF0aW9uU2VsZWN0b3IgQSBmdW5jdGlvblxuICogdGhhdCByZWNlaXZlcyBhIHZhbHVlIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCBmb3IgY29tcHV0aW5nIHRoZSB0aW1lb3V0XG4gKiBkdXJhdGlvbiBmb3IgZWFjaCBzb3VyY2UgdmFsdWUsIHJldHVybmVkIGFzIGFuIE9ic2VydmFibGUgb3IgYSBQcm9taXNlLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSB0aGF0IGRlbGF5cyB0aGUgZW1pc3Npb25zIG9mIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUgYnkgdGhlIHNwZWNpZmllZCBkdXJhdGlvbiBPYnNlcnZhYmxlIHJldHVybmVkIGJ5XG4gKiBgZHVyYXRpb25TZWxlY3RvcmAsIGFuZCBtYXkgZHJvcCBzb21lIHZhbHVlcyBpZiB0aGV5IG9jY3VyIHRvbyBmcmVxdWVudGx5LlxuICogQG1ldGhvZCBkZWJvdW5jZVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlYm91bmNlPFQ+KGR1cmF0aW9uU2VsZWN0b3I6ICh2YWx1ZTogVCkgPT4gU3Vic2NyaWJhYmxlT3JQcm9taXNlPG51bWJlcj4pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgRGVib3VuY2VPcGVyYXRvcihkdXJhdGlvblNlbGVjdG9yKSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGVib3VuY2VTaWduYXR1cmU8VD4ge1xuICAoZHVyYXRpb25TZWxlY3RvcjogKHZhbHVlOiBUKSA9PiBTdWJzY3JpYmFibGVPclByb21pc2U8bnVtYmVyPik6IE9ic2VydmFibGU8VD47XG59XG5cbmNsYXNzIERlYm91bmNlT3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZHVyYXRpb25TZWxlY3RvcjogKHZhbHVlOiBUKSA9PiBTdWJzY3JpYmFibGVPclByb21pc2U8bnVtYmVyPikge1xuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+LCBzb3VyY2U6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHNvdXJjZS5fc3Vic2NyaWJlKG5ldyBEZWJvdW5jZVN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5kdXJhdGlvblNlbGVjdG9yKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIERlYm91bmNlU3Vic2NyaWJlcjxULCBSPiBleHRlbmRzIE91dGVyU3Vic2NyaWJlcjxULCBSPiB7XG4gIHByaXZhdGUgdmFsdWU6IFQ7XG4gIHByaXZhdGUgaGFzVmFsdWU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBkdXJhdGlvblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxSPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBkdXJhdGlvblNlbGVjdG9yOiAodmFsdWU6IFQpID0+IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxudW1iZXI+KSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKTogdm9pZCB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuZHVyYXRpb25TZWxlY3Rvci5jYWxsKHRoaXMsIHZhbHVlKTtcblxuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICB0aGlzLl90cnlOZXh0KHZhbHVlLCByZXN1bHQpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfY29tcGxldGUoKTogdm9pZCB7XG4gICAgdGhpcy5lbWl0VmFsdWUoKTtcbiAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcml2YXRlIF90cnlOZXh0KHZhbHVlOiBULCBkdXJhdGlvbjogU3Vic2NyaWJhYmxlT3JQcm9taXNlPG51bWJlcj4pOiB2b2lkIHtcbiAgICBsZXQgc3Vic2NyaXB0aW9uID0gdGhpcy5kdXJhdGlvblN1YnNjcmlwdGlvbjtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5oYXNWYWx1ZSA9IHRydWU7XG4gICAgaWYgKHN1YnNjcmlwdGlvbikge1xuICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLnJlbW92ZShzdWJzY3JpcHRpb24pO1xuICAgIH1cblxuICAgIHN1YnNjcmlwdGlvbiA9IHN1YnNjcmliZVRvUmVzdWx0KHRoaXMsIGR1cmF0aW9uKTtcbiAgICBpZiAoIXN1YnNjcmlwdGlvbi5pc1Vuc3Vic2NyaWJlZCkge1xuICAgICAgdGhpcy5hZGQodGhpcy5kdXJhdGlvblN1YnNjcmlwdGlvbiA9IHN1YnNjcmlwdGlvbik7XG4gICAgfVxuICB9XG5cbiAgbm90aWZ5TmV4dChvdXRlclZhbHVlOiBULCBpbm5lclZhbHVlOiBSLFxuICAgICAgICAgICAgIG91dGVySW5kZXg6IG51bWJlciwgaW5uZXJJbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgIGlubmVyU3ViOiBJbm5lclN1YnNjcmliZXI8VCwgUj4pOiB2b2lkIHtcbiAgICB0aGlzLmVtaXRWYWx1ZSgpO1xuICB9XG5cbiAgbm90aWZ5Q29tcGxldGUoKTogdm9pZCB7XG4gICAgdGhpcy5lbWl0VmFsdWUoKTtcbiAgfVxuXG4gIGVtaXRWYWx1ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5oYXNWYWx1ZSkge1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gdGhpcy5kdXJhdGlvblN1YnNjcmlwdGlvbjtcbiAgICAgIGlmIChzdWJzY3JpcHRpb24pIHtcbiAgICAgICAgdGhpcy5kdXJhdGlvblN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnJlbW92ZShzdWJzY3JpcHRpb24pO1xuICAgICAgfVxuICAgICAgdGhpcy52YWx1ZSA9IG51bGw7XG4gICAgICB0aGlzLmhhc1ZhbHVlID0gZmFsc2U7XG4gICAgICBzdXBlci5fbmV4dCh2YWx1ZSk7XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
