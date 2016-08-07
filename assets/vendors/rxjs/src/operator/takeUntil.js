System.register(['../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var OuterSubscriber_1, subscribeToResult_1;
    var TakeUntilOperator, TakeUntilSubscriber;
    /**
     * Emits the values emitted by the source Observable until a `notifier`
     * Observable emits a value.
     *
     * <span class="informal">Lets values pass until a second Observable,
     * `notifier`, emits something. Then, it completes.</span>
     *
     * <img src="./img/takeUntil.png" width="100%">
     *
     * `takeUntil` subscribes and begins mirroring the source Observable. It also
     * monitors a second Observable, `notifier` that you provide. If the `notifier`
     * emits a value or a complete notification, the output Observable stops
     * mirroring the source Observable and completes.
     *
     * @example <caption>Tick every second until the first click happens</caption>
     * var interval = Rx.Observable.interval(1000);
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var result = interval.takeUntil(clicks);
     * result.subscribe(x => console.log(x));
     *
     * @see {@link take}
     * @see {@link takeLast}
     * @see {@link takeWhile}
     * @see {@link skip}
     *
     * @param {Observable} notifier The Observable whose first emitted value will
     * cause the output Observable of `takeUntil` to stop emitting values from the
     * source Observable.
     * @return {Observable<T>} An Observable that emits the values from the source
     * Observable until such time as `notifier` emits its first value.
     * @method takeUntil
     * @owner Observable
     */
    function takeUntil(notifier) {
        return this.lift(new TakeUntilOperator(notifier));
    }
    exports_1("takeUntil", takeUntil);
    return {
        setters:[
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            TakeUntilOperator = (function () {
                function TakeUntilOperator(notifier) {
                    this.notifier = notifier;
                }
                TakeUntilOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new TakeUntilSubscriber(subscriber, this.notifier));
                };
                return TakeUntilOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            TakeUntilSubscriber = (function (_super) {
                __extends(TakeUntilSubscriber, _super);
                function TakeUntilSubscriber(destination, notifier) {
                    _super.call(this, destination);
                    this.notifier = notifier;
                    this.add(subscribeToResult_1.subscribeToResult(this, notifier));
                }
                TakeUntilSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.complete();
                };
                TakeUntilSubscriber.prototype.notifyComplete = function () {
                    // noop
                };
                return TakeUntilSubscriber;
            }(OuterSubscriber_1.OuterSubscriber));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL3Rha2VVbnRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBUUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BZ0NHO0lBQ0gsbUJBQTZCLFFBQXlCO1FBQ3BELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRkQsaUNBRUMsQ0FBQTs7Ozs7Ozs7OztZQU1EO2dCQUNFLDJCQUFvQixRQUF5QjtvQkFBekIsYUFBUSxHQUFSLFFBQVEsQ0FBaUI7Z0JBQzdDLENBQUM7Z0JBRUQsZ0NBQUksR0FBSixVQUFLLFVBQXlCLEVBQUUsTUFBVztvQkFDekMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQy9FLENBQUM7Z0JBQ0gsd0JBQUM7WUFBRCxDQVBBLEFBT0MsSUFBQTtZQUVEOzs7O2VBSUc7WUFDSDtnQkFBd0MsdUNBQXFCO2dCQUUzRCw2QkFBWSxXQUE0QixFQUNwQixRQUF5QjtvQkFDM0Msa0JBQU0sV0FBVyxDQUFDLENBQUM7b0JBREQsYUFBUSxHQUFSLFFBQVEsQ0FBaUI7b0JBRTNDLElBQUksQ0FBQyxHQUFHLENBQUMscUNBQWlCLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLENBQUM7Z0JBRUQsd0NBQVUsR0FBVixVQUFXLFVBQWEsRUFBRSxVQUFhLEVBQzVCLFVBQWtCLEVBQUUsVUFBa0IsRUFDdEMsUUFBK0I7b0JBQ3hDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDbEIsQ0FBQztnQkFFRCw0Q0FBYyxHQUFkO29CQUNFLE9BQU87Z0JBQ1QsQ0FBQztnQkFDSCwwQkFBQztZQUFELENBakJBLEFBaUJDLENBakJ1QyxpQ0FBZSxHQWlCdEQiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvcnhqcy9zcmMvb3BlcmF0b3IvdGFrZVVudGlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPcGVyYXRvcn0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7U3Vic2NyaWJlcn0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5cbmltcG9ydCB7T3V0ZXJTdWJzY3JpYmVyfSBmcm9tICcuLi9PdXRlclN1YnNjcmliZXInO1xuaW1wb3J0IHtJbm5lclN1YnNjcmliZXJ9IGZyb20gJy4uL0lubmVyU3Vic2NyaWJlcic7XG5pbXBvcnQge3N1YnNjcmliZVRvUmVzdWx0fSBmcm9tICcuLi91dGlsL3N1YnNjcmliZVRvUmVzdWx0JztcblxuLyoqXG4gKiBFbWl0cyB0aGUgdmFsdWVzIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHVudGlsIGEgYG5vdGlmaWVyYFxuICogT2JzZXJ2YWJsZSBlbWl0cyBhIHZhbHVlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5MZXRzIHZhbHVlcyBwYXNzIHVudGlsIGEgc2Vjb25kIE9ic2VydmFibGUsXG4gKiBgbm90aWZpZXJgLCBlbWl0cyBzb21ldGhpbmcuIFRoZW4sIGl0IGNvbXBsZXRlcy48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy90YWtlVW50aWwucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogYHRha2VVbnRpbGAgc3Vic2NyaWJlcyBhbmQgYmVnaW5zIG1pcnJvcmluZyB0aGUgc291cmNlIE9ic2VydmFibGUuIEl0IGFsc29cbiAqIG1vbml0b3JzIGEgc2Vjb25kIE9ic2VydmFibGUsIGBub3RpZmllcmAgdGhhdCB5b3UgcHJvdmlkZS4gSWYgdGhlIGBub3RpZmllcmBcbiAqIGVtaXRzIGEgdmFsdWUgb3IgYSBjb21wbGV0ZSBub3RpZmljYXRpb24sIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZSBzdG9wc1xuICogbWlycm9yaW5nIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBhbmQgY29tcGxldGVzLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlRpY2sgZXZlcnkgc2Vjb25kIHVudGlsIHRoZSBmaXJzdCBjbGljayBoYXBwZW5zPC9jYXB0aW9uPlxuICogdmFyIGludGVydmFsID0gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKTtcbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcmVzdWx0ID0gaW50ZXJ2YWwudGFrZVVudGlsKGNsaWNrcyk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIHRha2V9XG4gKiBAc2VlIHtAbGluayB0YWtlTGFzdH1cbiAqIEBzZWUge0BsaW5rIHRha2VXaGlsZX1cbiAqIEBzZWUge0BsaW5rIHNraXB9XG4gKlxuICogQHBhcmFtIHtPYnNlcnZhYmxlfSBub3RpZmllciBUaGUgT2JzZXJ2YWJsZSB3aG9zZSBmaXJzdCBlbWl0dGVkIHZhbHVlIHdpbGxcbiAqIGNhdXNlIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZSBvZiBgdGFrZVVudGlsYCB0byBzdG9wIGVtaXR0aW5nIHZhbHVlcyBmcm9tIHRoZVxuICogc291cmNlIE9ic2VydmFibGUuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdGhlIHZhbHVlcyBmcm9tIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUgdW50aWwgc3VjaCB0aW1lIGFzIGBub3RpZmllcmAgZW1pdHMgaXRzIGZpcnN0IHZhbHVlLlxuICogQG1ldGhvZCB0YWtlVW50aWxcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0YWtlVW50aWw8VD4obm90aWZpZXI6IE9ic2VydmFibGU8YW55Pik6IE9ic2VydmFibGU8VD4ge1xuICByZXR1cm4gdGhpcy5saWZ0KG5ldyBUYWtlVW50aWxPcGVyYXRvcihub3RpZmllcikpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRha2VVbnRpbFNpZ25hdHVyZTxUPiB7XG4gIChub3RpZmllcjogT2JzZXJ2YWJsZTxhbnk+KTogT2JzZXJ2YWJsZTxUPjtcbn1cblxuY2xhc3MgVGFrZVVudGlsT3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbm90aWZpZXI6IE9ic2VydmFibGU8YW55Pikge1xuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+LCBzb3VyY2U6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHNvdXJjZS5fc3Vic2NyaWJlKG5ldyBUYWtlVW50aWxTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMubm90aWZpZXIpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgVGFrZVVudGlsU3Vic2NyaWJlcjxULCBSPiBleHRlbmRzIE91dGVyU3Vic2NyaWJlcjxULCBSPiB7XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8YW55PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBub3RpZmllcjogT2JzZXJ2YWJsZTxhbnk+KSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICAgIHRoaXMuYWRkKHN1YnNjcmliZVRvUmVzdWx0KHRoaXMsIG5vdGlmaWVyKSk7XG4gIH1cblxuICBub3RpZnlOZXh0KG91dGVyVmFsdWU6IFQsIGlubmVyVmFsdWU6IFIsXG4gICAgICAgICAgICAgb3V0ZXJJbmRleDogbnVtYmVyLCBpbm5lckluZGV4OiBudW1iZXIsXG4gICAgICAgICAgICAgaW5uZXJTdWI6IElubmVyU3Vic2NyaWJlcjxULCBSPik6IHZvaWQge1xuICAgIHRoaXMuY29tcGxldGUoKTtcbiAgfVxuXG4gIG5vdGlmeUNvbXBsZXRlKCk6IHZvaWQge1xuICAgIC8vIG5vb3BcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
