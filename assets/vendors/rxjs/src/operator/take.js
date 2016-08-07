System.register(['../Subscriber', '../util/ArgumentOutOfRangeError', '../observable/EmptyObservable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1, ArgumentOutOfRangeError_1, EmptyObservable_1;
    var TakeOperator, TakeSubscriber;
    /**
     * Emits only the first `count` values emitted by the source Observable.
     *
     * <span class="informal">Takes the first `count` values from the source, then
     * completes.</span>
     *
     * <img src="./img/take.png" width="100%">
     *
     * `take` returns an Observable that emits only the first `count` values emitted
     * by the source Observable. If the source emits fewer than `count` values then
     * all of its values are emitted. After that, it completes, regardless if the
     * source completes.
     *
     * @example <caption>Take the first 5 seconds of an infinite 1-second interval Observable</caption>
     * var interval = Rx.Observable.interval(1000);
     * var five = interval.take(5);
     * five.subscribe(x => console.log(x));
     *
     * @see {@link takeLast}
     * @see {@link takeUntil}
     * @see {@link takeWhile}
     * @see {@link skip}
     *
     * @throws {ArgumentOutOfRangeError} When using `take(i)`, it delivers an
     * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
     *
     * @param {number} count The maximum number of `next` values to emit.
     * @return {Observable<T>} An Observable that emits only the first `count`
     * values emitted by the source Observable, or all of the values from the source
     * if the source emits fewer than `count` values.
     * @method take
     * @owner Observable
     */
    function take(count) {
        if (count === 0) {
            return new EmptyObservable_1.EmptyObservable();
        }
        else {
            return this.lift(new TakeOperator(count));
        }
    }
    exports_1("take", take);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (ArgumentOutOfRangeError_1_1) {
                ArgumentOutOfRangeError_1 = ArgumentOutOfRangeError_1_1;
            },
            function (EmptyObservable_1_1) {
                EmptyObservable_1 = EmptyObservable_1_1;
            }],
        execute: function() {
            TakeOperator = (function () {
                function TakeOperator(total) {
                    this.total = total;
                    if (this.total < 0) {
                        throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
                    }
                }
                TakeOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new TakeSubscriber(subscriber, this.total));
                };
                return TakeOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            TakeSubscriber = (function (_super) {
                __extends(TakeSubscriber, _super);
                function TakeSubscriber(destination, total) {
                    _super.call(this, destination);
                    this.total = total;
                    this.count = 0;
                }
                TakeSubscriber.prototype._next = function (value) {
                    var total = this.total;
                    if (++this.count <= total) {
                        this.destination.next(value);
                        if (this.count === total) {
                            this.destination.complete();
                            this.unsubscribe();
                        }
                    }
                };
                return TakeSubscriber;
            }(Subscriber_1.Subscriber));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL3Rha2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQU1BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWdDRztJQUNILGNBQXdCLEtBQWE7UUFDbkMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTSxDQUFDLElBQUksaUNBQWUsRUFBSyxDQUFDO1FBQ2xDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDNUMsQ0FBQztJQUNILENBQUM7SUFORCx1QkFNQyxDQUFBOzs7Ozs7Ozs7Ozs7O1lBTUQ7Z0JBQ0Usc0JBQW9CLEtBQWE7b0JBQWIsVUFBSyxHQUFMLEtBQUssQ0FBUTtvQkFDL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNuQixNQUFNLElBQUksaURBQXVCLENBQUM7b0JBQ3BDLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCwyQkFBSSxHQUFKLFVBQUssVUFBeUIsRUFBRSxNQUFXO29CQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZFLENBQUM7Z0JBQ0gsbUJBQUM7WUFBRCxDQVZBLEFBVUMsSUFBQTtZQUVEOzs7O2VBSUc7WUFDSDtnQkFBZ0Msa0NBQWE7Z0JBRzNDLHdCQUFZLFdBQTBCLEVBQVUsS0FBYTtvQkFDM0Qsa0JBQU0sV0FBVyxDQUFDLENBQUM7b0JBRDJCLFVBQUssR0FBTCxLQUFLLENBQVE7b0JBRnJELFVBQUssR0FBVyxDQUFDLENBQUM7Z0JBSTFCLENBQUM7Z0JBRVMsOEJBQUssR0FBZixVQUFnQixLQUFRO29CQUN0QixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUN6QixFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQzdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQzs0QkFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs0QkFDNUIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO3dCQUNyQixDQUFDO29CQUNILENBQUM7Z0JBQ0gsQ0FBQztnQkFDSCxxQkFBQztZQUFELENBakJBLEFBaUJDLENBakIrQix1QkFBVSxHQWlCekMiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvcnhqcy9zcmMvb3BlcmF0b3IvdGFrZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T3BlcmF0b3J9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7U3Vic2NyaWJlcn0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQge0FyZ3VtZW50T3V0T2ZSYW5nZUVycm9yfSBmcm9tICcuLi91dGlsL0FyZ3VtZW50T3V0T2ZSYW5nZUVycm9yJztcbmltcG9ydCB7RW1wdHlPYnNlcnZhYmxlfSBmcm9tICcuLi9vYnNlcnZhYmxlL0VtcHR5T2JzZXJ2YWJsZSc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJy4uL09ic2VydmFibGUnO1xuXG4vKipcbiAqIEVtaXRzIG9ubHkgdGhlIGZpcnN0IGBjb3VudGAgdmFsdWVzIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5UYWtlcyB0aGUgZmlyc3QgYGNvdW50YCB2YWx1ZXMgZnJvbSB0aGUgc291cmNlLCB0aGVuXG4gKiBjb21wbGV0ZXMuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvdGFrZS5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBgdGFrZWAgcmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgb25seSB0aGUgZmlyc3QgYGNvdW50YCB2YWx1ZXMgZW1pdHRlZFxuICogYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLiBJZiB0aGUgc291cmNlIGVtaXRzIGZld2VyIHRoYW4gYGNvdW50YCB2YWx1ZXMgdGhlblxuICogYWxsIG9mIGl0cyB2YWx1ZXMgYXJlIGVtaXR0ZWQuIEFmdGVyIHRoYXQsIGl0IGNvbXBsZXRlcywgcmVnYXJkbGVzcyBpZiB0aGVcbiAqIHNvdXJjZSBjb21wbGV0ZXMuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+VGFrZSB0aGUgZmlyc3QgNSBzZWNvbmRzIG9mIGFuIGluZmluaXRlIDEtc2Vjb25kIGludGVydmFsIE9ic2VydmFibGU8L2NhcHRpb24+XG4gKiB2YXIgaW50ZXJ2YWwgPSBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApO1xuICogdmFyIGZpdmUgPSBpbnRlcnZhbC50YWtlKDUpO1xuICogZml2ZS5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgdGFrZUxhc3R9XG4gKiBAc2VlIHtAbGluayB0YWtlVW50aWx9XG4gKiBAc2VlIHtAbGluayB0YWtlV2hpbGV9XG4gKiBAc2VlIHtAbGluayBza2lwfVxuICpcbiAqIEB0aHJvd3Mge0FyZ3VtZW50T3V0T2ZSYW5nZUVycm9yfSBXaGVuIHVzaW5nIGB0YWtlKGkpYCwgaXQgZGVsaXZlcnMgYW5cbiAqIEFyZ3VtZW50T3V0T3JSYW5nZUVycm9yIHRvIHRoZSBPYnNlcnZlcidzIGBlcnJvcmAgY2FsbGJhY2sgaWYgYGkgPCAwYC5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gY291bnQgVGhlIG1heGltdW0gbnVtYmVyIG9mIGBuZXh0YCB2YWx1ZXMgdG8gZW1pdC5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8VD59IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBvbmx5IHRoZSBmaXJzdCBgY291bnRgXG4gKiB2YWx1ZXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUsIG9yIGFsbCBvZiB0aGUgdmFsdWVzIGZyb20gdGhlIHNvdXJjZVxuICogaWYgdGhlIHNvdXJjZSBlbWl0cyBmZXdlciB0aGFuIGBjb3VudGAgdmFsdWVzLlxuICogQG1ldGhvZCB0YWtlXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdGFrZTxUPihjb3VudDogbnVtYmVyKTogT2JzZXJ2YWJsZTxUPiB7XG4gIGlmIChjb3VudCA9PT0gMCkge1xuICAgIHJldHVybiBuZXcgRW1wdHlPYnNlcnZhYmxlPFQ+KCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRoaXMubGlmdChuZXcgVGFrZU9wZXJhdG9yKGNvdW50KSk7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBUYWtlU2lnbmF0dXJlPFQ+IHtcbiAgKGNvdW50OiBudW1iZXIpOiBPYnNlcnZhYmxlPFQ+O1xufVxuXG5jbGFzcyBUYWtlT3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdG90YWw6IG51bWJlcikge1xuICAgIGlmICh0aGlzLnRvdGFsIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUVycm9yO1xuICAgIH1cbiAgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPiwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2UuX3N1YnNjcmliZShuZXcgVGFrZVN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy50b3RhbCkpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBUYWtlU3Vic2NyaWJlcjxUPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuICBwcml2YXRlIGNvdW50OiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPFQ+LCBwcml2YXRlIHRvdGFsOiBudW1iZXIpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IFQpOiB2b2lkIHtcbiAgICBjb25zdCB0b3RhbCA9IHRoaXMudG90YWw7XG4gICAgaWYgKCsrdGhpcy5jb3VudCA8PSB0b3RhbCkge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHZhbHVlKTtcbiAgICAgIGlmICh0aGlzLmNvdW50ID09PSB0b3RhbCkge1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
