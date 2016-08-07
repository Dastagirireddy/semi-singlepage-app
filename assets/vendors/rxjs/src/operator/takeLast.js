System.register(['../Subscriber', '../util/ArgumentOutOfRangeError', '../observable/EmptyObservable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1, ArgumentOutOfRangeError_1, EmptyObservable_1;
    var TakeLastOperator, TakeLastSubscriber;
    /**
     * Emits only the last `count` values emitted by the source Observable.
     *
     * <span class="informal">Remembers the latest `count` values, then emits those
     * only when the source completes.</span>
     *
     * <img src="./img/takeLast.png" width="100%">
     *
     * `takeLast` returns an Observable that emits at most the last `count` values
     * emitted by the source Observable. If the source emits fewer than `count`
     * values then all of its values are emitted. This operator must wait until the
     * `complete` notification emission from the source in order to emit the `next`
     * values on the output Observable, because otherwise it is impossible to know
     * whether or not more values will be emitted on the source. For this reason,
     * all values are emitted synchronously, followed by the complete notification.
     *
     * @example <caption>Take the last 3 values of an Observable with many values</caption>
     * var many = Rx.Observable.range(1, 100);
     * var lastThree = many.takeLast(3);
     * lastThree.subscribe(x => console.log(x));
     *
     * @see {@link take}
     * @see {@link takeUntil}
     * @see {@link takeWhile}
     * @see {@link skip}
     *
     * @throws {ArgumentOutOfRangeError} When using `takeLast(i)`, it delivers an
     * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
     *
     * @param {number} count The maximum number of values to emit from the end of
     * the sequence of values emitted by the source Observable.
     * @return {Observable<T>} An Observable that emits at most the last count
     * values emitted by the source Observable.
     * @method takeLast
     * @owner Observable
     */
    function takeLast(count) {
        if (count === 0) {
            return new EmptyObservable_1.EmptyObservable();
        }
        else {
            return this.lift(new TakeLastOperator(count));
        }
    }
    exports_1("takeLast", takeLast);
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
            TakeLastOperator = (function () {
                function TakeLastOperator(total) {
                    this.total = total;
                    if (this.total < 0) {
                        throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
                    }
                }
                TakeLastOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new TakeLastSubscriber(subscriber, this.total));
                };
                return TakeLastOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            TakeLastSubscriber = (function (_super) {
                __extends(TakeLastSubscriber, _super);
                function TakeLastSubscriber(destination, total) {
                    _super.call(this, destination);
                    this.total = total;
                    this.ring = new Array();
                    this.count = 0;
                }
                TakeLastSubscriber.prototype._next = function (value) {
                    var ring = this.ring;
                    var total = this.total;
                    var count = this.count++;
                    if (ring.length < total) {
                        ring.push(value);
                    }
                    else {
                        var index = count % total;
                        ring[index] = value;
                    }
                };
                TakeLastSubscriber.prototype._complete = function () {
                    var destination = this.destination;
                    var count = this.count;
                    if (count > 0) {
                        var total = this.count >= this.total ? this.total : this.count;
                        var ring = this.ring;
                        for (var i = 0; i < total; i++) {
                            var idx = (count++) % total;
                            destination.next(ring[idx]);
                        }
                    }
                    destination.complete();
                };
                return TakeLastSubscriber;
            }(Subscriber_1.Subscriber));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL3Rha2VMYXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFNQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtQ0c7SUFDSCxrQkFBNEIsS0FBYTtRQUN2QyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQixNQUFNLENBQUMsSUFBSSxpQ0FBZSxFQUFLLENBQUM7UUFDbEMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2hELENBQUM7SUFDSCxDQUFDO0lBTkQsK0JBTUMsQ0FBQTs7Ozs7Ozs7Ozs7OztZQU1EO2dCQUNFLDBCQUFvQixLQUFhO29CQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7b0JBQy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbkIsTUFBTSxJQUFJLGlEQUF1QixDQUFDO29CQUNwQyxDQUFDO2dCQUNILENBQUM7Z0JBRUQsK0JBQUksR0FBSixVQUFLLFVBQXlCLEVBQUUsTUFBVztvQkFDekMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzNFLENBQUM7Z0JBQ0gsdUJBQUM7WUFBRCxDQVZBLEFBVUMsSUFBQTtZQUVEOzs7O2VBSUc7WUFDSDtnQkFBb0Msc0NBQWE7Z0JBSS9DLDRCQUFZLFdBQTBCLEVBQVUsS0FBYTtvQkFDM0Qsa0JBQU0sV0FBVyxDQUFDLENBQUM7b0JBRDJCLFVBQUssR0FBTCxLQUFLLENBQVE7b0JBSHJELFNBQUksR0FBYSxJQUFJLEtBQUssRUFBRSxDQUFDO29CQUM3QixVQUFLLEdBQVcsQ0FBQyxDQUFDO2dCQUkxQixDQUFDO2dCQUVTLGtDQUFLLEdBQWYsVUFBZ0IsS0FBUTtvQkFDdEIsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDdkIsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFDekIsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUUzQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ25CLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sSUFBTSxLQUFLLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQzt3QkFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztvQkFDdEIsQ0FBQztnQkFDSCxDQUFDO2dCQUVTLHNDQUFTLEdBQW5CO29CQUNFLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7b0JBQ3JDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7b0JBRXZCLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNkLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7d0JBQ2pFLElBQU0sSUFBSSxHQUFJLElBQUksQ0FBQyxJQUFJLENBQUM7d0JBRXhCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7NEJBQy9CLElBQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7NEJBQzlCLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQzlCLENBQUM7b0JBQ0gsQ0FBQztvQkFFRCxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3pCLENBQUM7Z0JBQ0gseUJBQUM7WUFBRCxDQXJDQSxBQXFDQyxDQXJDbUMsdUJBQVUsR0FxQzdDIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL3Rha2VMYXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPcGVyYXRvcn0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHtTdWJzY3JpYmVyfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7QXJndW1lbnRPdXRPZlJhbmdlRXJyb3J9IGZyb20gJy4uL3V0aWwvQXJndW1lbnRPdXRPZlJhbmdlRXJyb3InO1xuaW1wb3J0IHtFbXB0eU9ic2VydmFibGV9IGZyb20gJy4uL29ic2VydmFibGUvRW1wdHlPYnNlcnZhYmxlJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5cbi8qKlxuICogRW1pdHMgb25seSB0aGUgbGFzdCBgY291bnRgIHZhbHVlcyBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+UmVtZW1iZXJzIHRoZSBsYXRlc3QgYGNvdW50YCB2YWx1ZXMsIHRoZW4gZW1pdHMgdGhvc2VcbiAqIG9ubHkgd2hlbiB0aGUgc291cmNlIGNvbXBsZXRlcy48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy90YWtlTGFzdC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBgdGFrZUxhc3RgIHJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGF0IG1vc3QgdGhlIGxhc3QgYGNvdW50YCB2YWx1ZXNcbiAqIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLiBJZiB0aGUgc291cmNlIGVtaXRzIGZld2VyIHRoYW4gYGNvdW50YFxuICogdmFsdWVzIHRoZW4gYWxsIG9mIGl0cyB2YWx1ZXMgYXJlIGVtaXR0ZWQuIFRoaXMgb3BlcmF0b3IgbXVzdCB3YWl0IHVudGlsIHRoZVxuICogYGNvbXBsZXRlYCBub3RpZmljYXRpb24gZW1pc3Npb24gZnJvbSB0aGUgc291cmNlIGluIG9yZGVyIHRvIGVtaXQgdGhlIGBuZXh0YFxuICogdmFsdWVzIG9uIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZSwgYmVjYXVzZSBvdGhlcndpc2UgaXQgaXMgaW1wb3NzaWJsZSB0byBrbm93XG4gKiB3aGV0aGVyIG9yIG5vdCBtb3JlIHZhbHVlcyB3aWxsIGJlIGVtaXR0ZWQgb24gdGhlIHNvdXJjZS4gRm9yIHRoaXMgcmVhc29uLFxuICogYWxsIHZhbHVlcyBhcmUgZW1pdHRlZCBzeW5jaHJvbm91c2x5LCBmb2xsb3dlZCBieSB0aGUgY29tcGxldGUgbm90aWZpY2F0aW9uLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlRha2UgdGhlIGxhc3QgMyB2YWx1ZXMgb2YgYW4gT2JzZXJ2YWJsZSB3aXRoIG1hbnkgdmFsdWVzPC9jYXB0aW9uPlxuICogdmFyIG1hbnkgPSBSeC5PYnNlcnZhYmxlLnJhbmdlKDEsIDEwMCk7XG4gKiB2YXIgbGFzdFRocmVlID0gbWFueS50YWtlTGFzdCgzKTtcbiAqIGxhc3RUaHJlZS5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgdGFrZX1cbiAqIEBzZWUge0BsaW5rIHRha2VVbnRpbH1cbiAqIEBzZWUge0BsaW5rIHRha2VXaGlsZX1cbiAqIEBzZWUge0BsaW5rIHNraXB9XG4gKlxuICogQHRocm93cyB7QXJndW1lbnRPdXRPZlJhbmdlRXJyb3J9IFdoZW4gdXNpbmcgYHRha2VMYXN0KGkpYCwgaXQgZGVsaXZlcnMgYW5cbiAqIEFyZ3VtZW50T3V0T3JSYW5nZUVycm9yIHRvIHRoZSBPYnNlcnZlcidzIGBlcnJvcmAgY2FsbGJhY2sgaWYgYGkgPCAwYC5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gY291bnQgVGhlIG1heGltdW0gbnVtYmVyIG9mIHZhbHVlcyB0byBlbWl0IGZyb20gdGhlIGVuZCBvZlxuICogdGhlIHNlcXVlbmNlIG9mIHZhbHVlcyBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8VD59IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBhdCBtb3N0IHRoZSBsYXN0IGNvdW50XG4gKiB2YWx1ZXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiBAbWV0aG9kIHRha2VMYXN0XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdGFrZUxhc3Q8VD4oY291bnQ6IG51bWJlcik6IE9ic2VydmFibGU8VD4ge1xuICBpZiAoY291bnQgPT09IDApIHtcbiAgICByZXR1cm4gbmV3IEVtcHR5T2JzZXJ2YWJsZTxUPigpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLmxpZnQobmV3IFRha2VMYXN0T3BlcmF0b3IoY291bnQpKTtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRha2VMYXN0U2lnbmF0dXJlPFQ+IHtcbiAgKGNvdW50OiBudW1iZXIpOiBPYnNlcnZhYmxlPFQ+O1xufVxuXG5jbGFzcyBUYWtlTGFzdE9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgVD4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRvdGFsOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy50b3RhbCA8IDApIHtcbiAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFcnJvcjtcbiAgICB9XG4gIH1cblxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gc291cmNlLl9zdWJzY3JpYmUobmV3IFRha2VMYXN0U3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLnRvdGFsKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIFRha2VMYXN0U3Vic2NyaWJlcjxUPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuICBwcml2YXRlIHJpbmc6IEFycmF5PFQ+ID0gbmV3IEFycmF5KCk7XG4gIHByaXZhdGUgY291bnQ6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8VD4sIHByaXZhdGUgdG90YWw6IG51bWJlcikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIGNvbnN0IHJpbmcgPSB0aGlzLnJpbmc7XG4gICAgY29uc3QgdG90YWwgPSB0aGlzLnRvdGFsO1xuICAgIGNvbnN0IGNvdW50ID0gdGhpcy5jb3VudCsrO1xuXG4gICAgaWYgKHJpbmcubGVuZ3RoIDwgdG90YWwpIHtcbiAgICAgIHJpbmcucHVzaCh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gY291bnQgJSB0b3RhbDtcbiAgICAgIHJpbmdbaW5kZXhdID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHRoaXMuZGVzdGluYXRpb247XG4gICAgbGV0IGNvdW50ID0gdGhpcy5jb3VudDtcblxuICAgIGlmIChjb3VudCA+IDApIHtcbiAgICAgIGNvbnN0IHRvdGFsID0gdGhpcy5jb3VudCA+PSB0aGlzLnRvdGFsID8gdGhpcy50b3RhbCA6IHRoaXMuY291bnQ7XG4gICAgICBjb25zdCByaW5nICA9IHRoaXMucmluZztcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3RhbDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGlkeCA9IChjb3VudCsrKSAlIHRvdGFsO1xuICAgICAgICBkZXN0aW5hdGlvbi5uZXh0KHJpbmdbaWR4XSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
