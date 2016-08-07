System.register(['../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var OuterSubscriber_1, subscribeToResult_1;
    var SampleOperator, SampleSubscriber;
    /**
     * Emits the most recently emitted value from the source Observable whenever
     * another Observable, the `notifier`, emits.
     *
     * <span class="informal">It's like {@link sampleTime}, but samples whenever
     * the `notifier` Observable emits something.</span>
     *
     * <img src="./img/sample.png" width="100%">
     *
     * Whenever the `notifier` Observable emits a value or completes, `sample`
     * looks at the source Observable and emits whichever value it has most recently
     * emitted since the previous sampling, unless the source has not emitted
     * anything since the previous sampling. The `notifier` is subscribed to as soon
     * as the output Observable is subscribed.
     *
     * @example <caption>On every click, sample the most recent "seconds" timer</caption>
     * var seconds = Rx.Observable.interval(1000);
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var result = seconds.sample(clicks);
     * result.subscribe(x => console.log(x));
     *
     * @see {@link audit}
     * @see {@link debounce}
     * @see {@link sampleTime}
     * @see {@link throttle}
     *
     * @param {Observable<any>} notifier The Observable to use for sampling the
     * source Observable.
     * @return {Observable<T>} An Observable that emits the results of sampling the
     * values emitted by the source Observable whenever the notifier Observable
     * emits value or completes.
     * @method sample
     * @owner Observable
     */
    function sample(notifier) {
        return this.lift(new SampleOperator(notifier));
    }
    exports_1("sample", sample);
    return {
        setters:[
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            SampleOperator = (function () {
                function SampleOperator(notifier) {
                    this.notifier = notifier;
                }
                SampleOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new SampleSubscriber(subscriber, this.notifier));
                };
                return SampleOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            SampleSubscriber = (function (_super) {
                __extends(SampleSubscriber, _super);
                function SampleSubscriber(destination, notifier) {
                    _super.call(this, destination);
                    this.hasValue = false;
                    this.add(subscribeToResult_1.subscribeToResult(this, notifier));
                }
                SampleSubscriber.prototype._next = function (value) {
                    this.value = value;
                    this.hasValue = true;
                };
                SampleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.emitValue();
                };
                SampleSubscriber.prototype.notifyComplete = function () {
                    this.emitValue();
                };
                SampleSubscriber.prototype.emitValue = function () {
                    if (this.hasValue) {
                        this.hasValue = false;
                        this.destination.next(this.value);
                    }
                };
                return SampleSubscriber;
            }(OuterSubscriber_1.OuterSubscriber));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL3NhbXBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBUUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWlDRztJQUNILGdCQUEwQixRQUF5QjtRQUNqRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFGRCwyQkFFQyxDQUFBOzs7Ozs7Ozs7O1lBTUQ7Z0JBQ0Usd0JBQW9CLFFBQXlCO29CQUF6QixhQUFRLEdBQVIsUUFBUSxDQUFpQjtnQkFDN0MsQ0FBQztnQkFFRCw2QkFBSSxHQUFKLFVBQUssVUFBeUIsRUFBRSxNQUFXO29CQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDNUUsQ0FBQztnQkFDSCxxQkFBQztZQUFELENBUEEsQUFPQyxJQUFBO1lBRUQ7Ozs7ZUFJRztZQUNIO2dCQUFxQyxvQ0FBcUI7Z0JBSXhELDBCQUFZLFdBQTRCLEVBQUUsUUFBeUI7b0JBQ2pFLGtCQUFNLFdBQVcsQ0FBQyxDQUFDO29CQUhiLGFBQVEsR0FBWSxLQUFLLENBQUM7b0JBSWhDLElBQUksQ0FBQyxHQUFHLENBQUMscUNBQWlCLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLENBQUM7Z0JBRVMsZ0NBQUssR0FBZixVQUFnQixLQUFRO29CQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLENBQUM7Z0JBRUQscUNBQVUsR0FBVixVQUFXLFVBQWEsRUFBRSxVQUFhLEVBQzVCLFVBQWtCLEVBQUUsVUFBa0IsRUFDdEMsUUFBK0I7b0JBQ3hDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDbkIsQ0FBQztnQkFFRCx5Q0FBYyxHQUFkO29CQUNFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDbkIsQ0FBQztnQkFFRCxvQ0FBUyxHQUFUO29CQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO3dCQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQzt3QkFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNwQyxDQUFDO2dCQUNILENBQUM7Z0JBQ0gsdUJBQUM7WUFBRCxDQTlCQSxBQThCQyxDQTlCb0MsaUNBQWUsR0E4Qm5EIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL3NhbXBsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T3BlcmF0b3J9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQge1N1YnNjcmliZXJ9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuXG5pbXBvcnQge091dGVyU3Vic2NyaWJlcn0gZnJvbSAnLi4vT3V0ZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7SW5uZXJTdWJzY3JpYmVyfSBmcm9tICcuLi9Jbm5lclN1YnNjcmliZXInO1xuaW1wb3J0IHtzdWJzY3JpYmVUb1Jlc3VsdH0gZnJvbSAnLi4vdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdCc7XG5cbi8qKlxuICogRW1pdHMgdGhlIG1vc3QgcmVjZW50bHkgZW1pdHRlZCB2YWx1ZSBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB3aGVuZXZlclxuICogYW5vdGhlciBPYnNlcnZhYmxlLCB0aGUgYG5vdGlmaWVyYCwgZW1pdHMuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkl0J3MgbGlrZSB7QGxpbmsgc2FtcGxlVGltZX0sIGJ1dCBzYW1wbGVzIHdoZW5ldmVyXG4gKiB0aGUgYG5vdGlmaWVyYCBPYnNlcnZhYmxlIGVtaXRzIHNvbWV0aGluZy48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9zYW1wbGUucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogV2hlbmV2ZXIgdGhlIGBub3RpZmllcmAgT2JzZXJ2YWJsZSBlbWl0cyBhIHZhbHVlIG9yIGNvbXBsZXRlcywgYHNhbXBsZWBcbiAqIGxvb2tzIGF0IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBhbmQgZW1pdHMgd2hpY2hldmVyIHZhbHVlIGl0IGhhcyBtb3N0IHJlY2VudGx5XG4gKiBlbWl0dGVkIHNpbmNlIHRoZSBwcmV2aW91cyBzYW1wbGluZywgdW5sZXNzIHRoZSBzb3VyY2UgaGFzIG5vdCBlbWl0dGVkXG4gKiBhbnl0aGluZyBzaW5jZSB0aGUgcHJldmlvdXMgc2FtcGxpbmcuIFRoZSBgbm90aWZpZXJgIGlzIHN1YnNjcmliZWQgdG8gYXMgc29vblxuICogYXMgdGhlIG91dHB1dCBPYnNlcnZhYmxlIGlzIHN1YnNjcmliZWQuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+T24gZXZlcnkgY2xpY2ssIHNhbXBsZSB0aGUgbW9zdCByZWNlbnQgXCJzZWNvbmRzXCIgdGltZXI8L2NhcHRpb24+XG4gKiB2YXIgc2Vjb25kcyA9IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCk7XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHJlc3VsdCA9IHNlY29uZHMuc2FtcGxlKGNsaWNrcyk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGF1ZGl0fVxuICogQHNlZSB7QGxpbmsgZGVib3VuY2V9XG4gKiBAc2VlIHtAbGluayBzYW1wbGVUaW1lfVxuICogQHNlZSB7QGxpbmsgdGhyb3R0bGV9XG4gKlxuICogQHBhcmFtIHtPYnNlcnZhYmxlPGFueT59IG5vdGlmaWVyIFRoZSBPYnNlcnZhYmxlIHRvIHVzZSBmb3Igc2FtcGxpbmcgdGhlXG4gKiBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8VD59IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyB0aGUgcmVzdWx0cyBvZiBzYW1wbGluZyB0aGVcbiAqIHZhbHVlcyBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB3aGVuZXZlciB0aGUgbm90aWZpZXIgT2JzZXJ2YWJsZVxuICogZW1pdHMgdmFsdWUgb3IgY29tcGxldGVzLlxuICogQG1ldGhvZCBzYW1wbGVcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYW1wbGU8VD4obm90aWZpZXI6IE9ic2VydmFibGU8YW55Pik6IE9ic2VydmFibGU8VD4ge1xuICByZXR1cm4gdGhpcy5saWZ0KG5ldyBTYW1wbGVPcGVyYXRvcihub3RpZmllcikpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNhbXBsZVNpZ25hdHVyZTxUPiB7XG4gIChub3RpZmllcjogT2JzZXJ2YWJsZTxhbnk+KTogT2JzZXJ2YWJsZTxUPjtcbn1cblxuY2xhc3MgU2FtcGxlT3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbm90aWZpZXI6IE9ic2VydmFibGU8YW55Pikge1xuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+LCBzb3VyY2U6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHNvdXJjZS5fc3Vic2NyaWJlKG5ldyBTYW1wbGVTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMubm90aWZpZXIpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgU2FtcGxlU3Vic2NyaWJlcjxULCBSPiBleHRlbmRzIE91dGVyU3Vic2NyaWJlcjxULCBSPiB7XG4gIHByaXZhdGUgdmFsdWU6IFQ7XG4gIHByaXZhdGUgaGFzVmFsdWU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxhbnk+LCBub3RpZmllcjogT2JzZXJ2YWJsZTxhbnk+KSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICAgIHRoaXMuYWRkKHN1YnNjcmliZVRvUmVzdWx0KHRoaXMsIG5vdGlmaWVyKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IFQpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5oYXNWYWx1ZSA9IHRydWU7XG4gIH1cblxuICBub3RpZnlOZXh0KG91dGVyVmFsdWU6IFQsIGlubmVyVmFsdWU6IFIsXG4gICAgICAgICAgICAgb3V0ZXJJbmRleDogbnVtYmVyLCBpbm5lckluZGV4OiBudW1iZXIsXG4gICAgICAgICAgICAgaW5uZXJTdWI6IElubmVyU3Vic2NyaWJlcjxULCBSPik6IHZvaWQge1xuICAgIHRoaXMuZW1pdFZhbHVlKCk7XG4gIH1cblxuICBub3RpZnlDb21wbGV0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmVtaXRWYWx1ZSgpO1xuICB9XG5cbiAgZW1pdFZhbHVlKCkge1xuICAgIGlmICh0aGlzLmhhc1ZhbHVlKSB7XG4gICAgICB0aGlzLmhhc1ZhbHVlID0gZmFsc2U7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQodGhpcy52YWx1ZSk7XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
