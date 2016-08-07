System.register(['../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var OuterSubscriber_1, subscribeToResult_1;
    var ThrottleOperator, ThrottleSubscriber;
    /**
     * Emits a value from the source Observable, then ignores subsequent source
     * values for a duration determined by another Observable, then repeats this
     * process.
     *
     * <span class="informal">It's like {@link throttleTime}, but the silencing
     * duration is determined by a second Observable.</span>
     *
     * <img src="./img/throttle.png" width="100%">
     *
     * `throttle` emits the source Observable values on the output Observable
     * when its internal timer is disabled, and ignores source values when the timer
     * is enabled. Initially, the timer is disabled. As soon as the first source
     * value arrives, it is forwarded to the output Observable, and then the timer
     * is enabled by calling the `durationSelector` function with the source value,
     * which returns the "duration" Observable. When the duration Observable emits a
     * value or completes, the timer is disabled, and this process repeats for the
     * next source value.
     *
     * @example <caption>Emit clicks at a rate of at most one click per second</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var result = clicks.throttle(ev => Rx.Observable.interval(1000));
     * result.subscribe(x => console.log(x));
     *
     * @see {@link audit}
     * @see {@link debounce}
     * @see {@link delayWhen}
     * @see {@link sample}
     * @see {@link throttleTime}
     *
     * @param {function(value: T): Observable|Promise} durationSelector A function
     * that receives a value from the source Observable, for computing the silencing
     * duration for each source value, returned as an Observable or a Promise.
     * @return {Observable<T>} An Observable that performs the throttle operation to
     * limit the rate of emissions from the source.
     * @method throttle
     * @owner Observable
     */
    function throttle(durationSelector) {
        return this.lift(new ThrottleOperator(durationSelector));
    }
    exports_1("throttle", throttle);
    return {
        setters:[
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            ThrottleOperator = (function () {
                function ThrottleOperator(durationSelector) {
                    this.durationSelector = durationSelector;
                }
                ThrottleOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new ThrottleSubscriber(subscriber, this.durationSelector));
                };
                return ThrottleOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            ThrottleSubscriber = (function (_super) {
                __extends(ThrottleSubscriber, _super);
                function ThrottleSubscriber(destination, durationSelector) {
                    _super.call(this, destination);
                    this.destination = destination;
                    this.durationSelector = durationSelector;
                }
                ThrottleSubscriber.prototype._next = function (value) {
                    if (!this.throttled) {
                        this.tryDurationSelector(value);
                    }
                };
                ThrottleSubscriber.prototype.tryDurationSelector = function (value) {
                    var duration = null;
                    try {
                        duration = this.durationSelector(value);
                    }
                    catch (err) {
                        this.destination.error(err);
                        return;
                    }
                    this.emitAndThrottle(value, duration);
                };
                ThrottleSubscriber.prototype.emitAndThrottle = function (value, duration) {
                    this.add(this.throttled = subscribeToResult_1.subscribeToResult(this, duration));
                    this.destination.next(value);
                };
                ThrottleSubscriber.prototype._unsubscribe = function () {
                    var throttled = this.throttled;
                    if (throttled) {
                        this.remove(throttled);
                        this.throttled = null;
                        throttled.unsubscribe();
                    }
                };
                ThrottleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this._unsubscribe();
                };
                ThrottleSubscriber.prototype.notifyComplete = function () {
                    this._unsubscribe();
                };
                return ThrottleSubscriber;
            }(OuterSubscriber_1.OuterSubscriber));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL3Rocm90dGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFTQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFDRztJQUNILGtCQUE0QixnQkFBNkQ7UUFDdkYsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUZELCtCQUVDLENBQUE7Ozs7Ozs7Ozs7WUFNRDtnQkFDRSwwQkFBb0IsZ0JBQTZEO29CQUE3RCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQTZDO2dCQUNqRixDQUFDO2dCQUVELCtCQUFJLEdBQUosVUFBSyxVQUF5QixFQUFFLE1BQVc7b0JBQ3pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksa0JBQWtCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RGLENBQUM7Z0JBQ0gsdUJBQUM7WUFBRCxDQVBBLEFBT0MsSUFBQTtZQUVEOzs7O2VBSUc7WUFDSDtnQkFBdUMsc0NBQXFCO2dCQUcxRCw0QkFBc0IsV0FBMEIsRUFDNUIsZ0JBQTZEO29CQUMvRSxrQkFBTSxXQUFXLENBQUMsQ0FBQztvQkFGQyxnQkFBVyxHQUFYLFdBQVcsQ0FBZTtvQkFDNUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUE2QztnQkFFakYsQ0FBQztnQkFFUyxrQ0FBSyxHQUFmLFVBQWdCLEtBQVE7b0JBQ3RCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDbEMsQ0FBQztnQkFDSCxDQUFDO2dCQUVPLGdEQUFtQixHQUEzQixVQUE0QixLQUFRO29CQUNsQyxJQUFJLFFBQVEsR0FBa0MsSUFBSSxDQUFDO29CQUNuRCxJQUFJLENBQUM7d0JBQ0gsUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDMUMsQ0FBRTtvQkFBQSxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUM1QixNQUFNLENBQUM7b0JBQ1QsQ0FBQztvQkFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDeEMsQ0FBQztnQkFFTyw0Q0FBZSxHQUF2QixVQUF3QixLQUFRLEVBQUUsUUFBdUM7b0JBQ3ZFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQ0FBaUIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDN0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQy9CLENBQUM7Z0JBRVMseUNBQVksR0FBdEI7b0JBQ0UsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFDakMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzt3QkFDdEIsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUMxQixDQUFDO2dCQUNILENBQUM7Z0JBRUQsdUNBQVUsR0FBVixVQUFXLFVBQWEsRUFBRSxVQUFhLEVBQzVCLFVBQWtCLEVBQUUsVUFBa0IsRUFDdEMsUUFBK0I7b0JBQ3hDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQztnQkFFRCwyQ0FBYyxHQUFkO29CQUNFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQztnQkFDSCx5QkFBQztZQUFELENBaERBLEFBZ0RDLENBaERzQyxpQ0FBZSxHQWdEckQiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvcnhqcy9zcmMvb3BlcmF0b3IvdGhyb3R0bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09wZXJhdG9yfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmliYWJsZU9yUHJvbWlzZX0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQge1N1YnNjcmliZXJ9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5cbmltcG9ydCB7T3V0ZXJTdWJzY3JpYmVyfSBmcm9tICcuLi9PdXRlclN1YnNjcmliZXInO1xuaW1wb3J0IHtJbm5lclN1YnNjcmliZXJ9IGZyb20gJy4uL0lubmVyU3Vic2NyaWJlcic7XG5pbXBvcnQge3N1YnNjcmliZVRvUmVzdWx0fSBmcm9tICcuLi91dGlsL3N1YnNjcmliZVRvUmVzdWx0JztcblxuLyoqXG4gKiBFbWl0cyBhIHZhbHVlIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCB0aGVuIGlnbm9yZXMgc3Vic2VxdWVudCBzb3VyY2VcbiAqIHZhbHVlcyBmb3IgYSBkdXJhdGlvbiBkZXRlcm1pbmVkIGJ5IGFub3RoZXIgT2JzZXJ2YWJsZSwgdGhlbiByZXBlYXRzIHRoaXNcbiAqIHByb2Nlc3MuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkl0J3MgbGlrZSB7QGxpbmsgdGhyb3R0bGVUaW1lfSwgYnV0IHRoZSBzaWxlbmNpbmdcbiAqIGR1cmF0aW9uIGlzIGRldGVybWluZWQgYnkgYSBzZWNvbmQgT2JzZXJ2YWJsZS48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy90aHJvdHRsZS5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBgdGhyb3R0bGVgIGVtaXRzIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB2YWx1ZXMgb24gdGhlIG91dHB1dCBPYnNlcnZhYmxlXG4gKiB3aGVuIGl0cyBpbnRlcm5hbCB0aW1lciBpcyBkaXNhYmxlZCwgYW5kIGlnbm9yZXMgc291cmNlIHZhbHVlcyB3aGVuIHRoZSB0aW1lclxuICogaXMgZW5hYmxlZC4gSW5pdGlhbGx5LCB0aGUgdGltZXIgaXMgZGlzYWJsZWQuIEFzIHNvb24gYXMgdGhlIGZpcnN0IHNvdXJjZVxuICogdmFsdWUgYXJyaXZlcywgaXQgaXMgZm9yd2FyZGVkIHRvIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZSwgYW5kIHRoZW4gdGhlIHRpbWVyXG4gKiBpcyBlbmFibGVkIGJ5IGNhbGxpbmcgdGhlIGBkdXJhdGlvblNlbGVjdG9yYCBmdW5jdGlvbiB3aXRoIHRoZSBzb3VyY2UgdmFsdWUsXG4gKiB3aGljaCByZXR1cm5zIHRoZSBcImR1cmF0aW9uXCIgT2JzZXJ2YWJsZS4gV2hlbiB0aGUgZHVyYXRpb24gT2JzZXJ2YWJsZSBlbWl0cyBhXG4gKiB2YWx1ZSBvciBjb21wbGV0ZXMsIHRoZSB0aW1lciBpcyBkaXNhYmxlZCwgYW5kIHRoaXMgcHJvY2VzcyByZXBlYXRzIGZvciB0aGVcbiAqIG5leHQgc291cmNlIHZhbHVlLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkVtaXQgY2xpY2tzIGF0IGEgcmF0ZSBvZiBhdCBtb3N0IG9uZSBjbGljayBwZXIgc2Vjb25kPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciByZXN1bHQgPSBjbGlja3MudGhyb3R0bGUoZXYgPT4gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKSk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGF1ZGl0fVxuICogQHNlZSB7QGxpbmsgZGVib3VuY2V9XG4gKiBAc2VlIHtAbGluayBkZWxheVdoZW59XG4gKiBAc2VlIHtAbGluayBzYW1wbGV9XG4gKiBAc2VlIHtAbGluayB0aHJvdHRsZVRpbWV9XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbih2YWx1ZTogVCk6IE9ic2VydmFibGV8UHJvbWlzZX0gZHVyYXRpb25TZWxlY3RvciBBIGZ1bmN0aW9uXG4gKiB0aGF0IHJlY2VpdmVzIGEgdmFsdWUgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUsIGZvciBjb21wdXRpbmcgdGhlIHNpbGVuY2luZ1xuICogZHVyYXRpb24gZm9yIGVhY2ggc291cmNlIHZhbHVlLCByZXR1cm5lZCBhcyBhbiBPYnNlcnZhYmxlIG9yIGEgUHJvbWlzZS5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8VD59IEFuIE9ic2VydmFibGUgdGhhdCBwZXJmb3JtcyB0aGUgdGhyb3R0bGUgb3BlcmF0aW9uIHRvXG4gKiBsaW1pdCB0aGUgcmF0ZSBvZiBlbWlzc2lvbnMgZnJvbSB0aGUgc291cmNlLlxuICogQG1ldGhvZCB0aHJvdHRsZVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRocm90dGxlPFQ+KGR1cmF0aW9uU2VsZWN0b3I6ICh2YWx1ZTogVCkgPT4gU3Vic2NyaWJhYmxlT3JQcm9taXNlPG51bWJlcj4pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgVGhyb3R0bGVPcGVyYXRvcihkdXJhdGlvblNlbGVjdG9yKSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGhyb3R0bGVTaWduYXR1cmU8VD4ge1xuICAoZHVyYXRpb25TZWxlY3RvcjogKHZhbHVlOiBUKSA9PiBTdWJzY3JpYmFibGVPclByb21pc2U8bnVtYmVyPik6IE9ic2VydmFibGU8VD47XG59XG5cbmNsYXNzIFRocm90dGxlT3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZHVyYXRpb25TZWxlY3RvcjogKHZhbHVlOiBUKSA9PiBTdWJzY3JpYmFibGVPclByb21pc2U8bnVtYmVyPikge1xuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+LCBzb3VyY2U6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHNvdXJjZS5fc3Vic2NyaWJlKG5ldyBUaHJvdHRsZVN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5kdXJhdGlvblNlbGVjdG9yKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIFRocm90dGxlU3Vic2NyaWJlcjxULCBSPiBleHRlbmRzIE91dGVyU3Vic2NyaWJlcjxULCBSPiB7XG4gIHByaXZhdGUgdGhyb3R0bGVkOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPFQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIGR1cmF0aW9uU2VsZWN0b3I6ICh2YWx1ZTogVCkgPT4gU3Vic2NyaWJhYmxlT3JQcm9taXNlPG51bWJlcj4pIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IFQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMudGhyb3R0bGVkKSB7XG4gICAgICB0aGlzLnRyeUR1cmF0aW9uU2VsZWN0b3IodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdHJ5RHVyYXRpb25TZWxlY3Rvcih2YWx1ZTogVCk6IHZvaWQge1xuICAgIGxldCBkdXJhdGlvbjogU3Vic2NyaWJhYmxlT3JQcm9taXNlPG51bWJlcj4gPSBudWxsO1xuICAgIHRyeSB7XG4gICAgICBkdXJhdGlvbiA9IHRoaXMuZHVyYXRpb25TZWxlY3Rvcih2YWx1ZSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZW1pdEFuZFRocm90dGxlKHZhbHVlLCBkdXJhdGlvbik7XG4gIH1cblxuICBwcml2YXRlIGVtaXRBbmRUaHJvdHRsZSh2YWx1ZTogVCwgZHVyYXRpb246IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxudW1iZXI+KSB7XG4gICAgdGhpcy5hZGQodGhpcy50aHJvdHRsZWQgPSBzdWJzY3JpYmVUb1Jlc3VsdCh0aGlzLCBkdXJhdGlvbikpO1xuICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dCh2YWx1ZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3Vuc3Vic2NyaWJlKCkge1xuICAgIGNvbnN0IHRocm90dGxlZCA9IHRoaXMudGhyb3R0bGVkO1xuICAgIGlmICh0aHJvdHRsZWQpIHtcbiAgICAgIHRoaXMucmVtb3ZlKHRocm90dGxlZCk7XG4gICAgICB0aGlzLnRocm90dGxlZCA9IG51bGw7XG4gICAgICB0aHJvdHRsZWQudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBub3RpZnlOZXh0KG91dGVyVmFsdWU6IFQsIGlubmVyVmFsdWU6IFIsXG4gICAgICAgICAgICAgb3V0ZXJJbmRleDogbnVtYmVyLCBpbm5lckluZGV4OiBudW1iZXIsXG4gICAgICAgICAgICAgaW5uZXJTdWI6IElubmVyU3Vic2NyaWJlcjxULCBSPik6IHZvaWQge1xuICAgIHRoaXMuX3Vuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBub3RpZnlDb21wbGV0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl91bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
