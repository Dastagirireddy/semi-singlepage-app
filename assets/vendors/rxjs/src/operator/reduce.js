System.register(['../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1;
    var ReduceOperator, ReduceSubscriber;
    /**
     * Applies an accumulator function over the source Observable, and returns the
     * accumulated result when the source completes, given an optional seed value.
     *
     * <span class="informal">Combines together all values emitted on the source,
     * using an accumulator function that knows how to join a new source value into
     * the accumulation from the past.</span>
     *
     * <img src="./img/reduce.png" width="100%">
     *
     * Like
     * [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce),
     * `reduce` applies an `accumulator` function against an accumulation and each
     * value of the source Observable (from the past) to reduce it to a single
     * value, emitted on the output Observable. Note that `reduce` will only emit
     * one value, only when the source Observable completes. It is equivalent to
     * applying operator {@link scan} followed by operator {@link last}.
     *
     * Returns an Observable that applies a specified `accumulator` function to each
     * item emitted by the source Observable. If a `seed` value is specified, then
     * that value will be used as the initial value for the accumulator. If no seed
     * value is specified, the first item of the source is used as the seed.
     *
     * @example <caption>Count the number of click events that happened in 5 seconds</caption>
     * var clicksInFiveSeconds = Rx.Observable.fromEvent(document, 'click')
     *   .takeUntil(Rx.Observable.interval(5000));
     * var ones = clicksInFiveSeconds.mapTo(1);
     * var seed = 0;
     * var count = ones.reduce((acc, one) => acc + one, seed);
     * count.subscribe(x => console.log(x));
     *
     * @see {@link count}
     * @see {@link expand}
     * @see {@link mergeScan}
     * @see {@link scan}
     *
     * @param {function(acc: R, value: T): R} accumulator The accumulator function
     * called on each source value.
     * @param {R} [seed] The initial accumulation value.
     * @return {Observable<R>} An observable of the accumulated values.
     * @return {Observable<R>} An Observable that emits a single value that is the
     * result of accumulating the values emitted by the source Observable.
     * @method reduce
     * @owner Observable
     */
    function reduce(accumulator, seed) {
        return this.lift(new ReduceOperator(accumulator, seed));
    }
    exports_1("reduce", reduce);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            ReduceOperator = (function () {
                function ReduceOperator(accumulator, seed) {
                    this.accumulator = accumulator;
                    this.seed = seed;
                }
                ReduceOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new ReduceSubscriber(subscriber, this.accumulator, this.seed));
                };
                return ReduceOperator;
            }());
            exports_1("ReduceOperator", ReduceOperator);
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            ReduceSubscriber = (function (_super) {
                __extends(ReduceSubscriber, _super);
                function ReduceSubscriber(destination, accumulator, seed) {
                    _super.call(this, destination);
                    this.accumulator = accumulator;
                    this.hasValue = false;
                    this.acc = seed;
                    this.accumulator = accumulator;
                    this.hasSeed = typeof seed !== 'undefined';
                }
                ReduceSubscriber.prototype._next = function (value) {
                    if (this.hasValue || (this.hasValue = this.hasSeed)) {
                        this._tryReduce(value);
                    }
                    else {
                        this.acc = value;
                        this.hasValue = true;
                    }
                };
                ReduceSubscriber.prototype._tryReduce = function (value) {
                    var result;
                    try {
                        result = this.accumulator(this.acc, value);
                    }
                    catch (err) {
                        this.destination.error(err);
                        return;
                    }
                    this.acc = result;
                };
                ReduceSubscriber.prototype._complete = function () {
                    if (this.hasValue || this.hasSeed) {
                        this.destination.next(this.acc);
                    }
                    this.destination.complete();
                };
                return ReduceSubscriber;
            }(Subscriber_1.Subscriber));
            exports_1("ReduceSubscriber", ReduceSubscriber);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL3JlZHVjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNENHO0lBQ0gsZ0JBQTZCLFdBQW9DLEVBQUUsSUFBUTtRQUN6RSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGNBQWMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRkQsMkJBRUMsQ0FBQTs7Ozs7OztZQU1EO2dCQUVFLHdCQUFvQixXQUFvQyxFQUFVLElBQVE7b0JBQXRELGdCQUFXLEdBQVgsV0FBVyxDQUF5QjtvQkFBVSxTQUFJLEdBQUosSUFBSSxDQUFJO2dCQUMxRSxDQUFDO2dCQUVELDZCQUFJLEdBQUosVUFBSyxVQUF5QixFQUFFLE1BQVc7b0JBQ3pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksZ0JBQWdCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzFGLENBQUM7Z0JBQ0gscUJBQUM7WUFBRCxDQVJBLEFBUUMsSUFBQTtZQVJELDJDQVFDLENBQUE7WUFFRDs7OztlQUlHO1lBQ0g7Z0JBQTRDLG9DQUFhO2dCQU12RCwwQkFBWSxXQUEwQixFQUNsQixXQUFvQyxFQUM1QyxJQUFRO29CQUNsQixrQkFBTSxXQUFXLENBQUMsQ0FBQztvQkFGRCxnQkFBVyxHQUFYLFdBQVcsQ0FBeUI7b0JBSHhELGFBQVEsR0FBWSxLQUFLLENBQUM7b0JBTXhCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztvQkFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLElBQUksS0FBSyxXQUFXLENBQUM7Z0JBQzdDLENBQUM7Z0JBRVMsZ0NBQUssR0FBZixVQUFnQixLQUFRO29CQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNwRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN6QixDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO3dCQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztvQkFDdkIsQ0FBQztnQkFDSCxDQUFDO2dCQUVPLHFDQUFVLEdBQWxCLFVBQW1CLEtBQVE7b0JBQ3pCLElBQUksTUFBVyxDQUFDO29CQUNoQixJQUFJLENBQUM7d0JBQ0gsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDaEQsQ0FBRTtvQkFBQSxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUM1QixNQUFNLENBQUM7b0JBQ1QsQ0FBQztvQkFDRCxJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztnQkFDcEIsQ0FBQztnQkFFUyxvQ0FBUyxHQUFuQjtvQkFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO3dCQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2xDLENBQUM7b0JBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDOUIsQ0FBQztnQkFDSCx1QkFBQztZQUFELENBekNBLEFBeUNDLENBekMyQyx1QkFBVSxHQXlDckQ7WUF6Q0QsK0NBeUNDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvcnhqcy9zcmMvb3BlcmF0b3IvcmVkdWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7T3BlcmF0b3J9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7U3Vic2NyaWJlcn0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5cbi8qKlxuICogQXBwbGllcyBhbiBhY2N1bXVsYXRvciBmdW5jdGlvbiBvdmVyIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgYW5kIHJldHVybnMgdGhlXG4gKiBhY2N1bXVsYXRlZCByZXN1bHQgd2hlbiB0aGUgc291cmNlIGNvbXBsZXRlcywgZ2l2ZW4gYW4gb3B0aW9uYWwgc2VlZCB2YWx1ZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+Q29tYmluZXMgdG9nZXRoZXIgYWxsIHZhbHVlcyBlbWl0dGVkIG9uIHRoZSBzb3VyY2UsXG4gKiB1c2luZyBhbiBhY2N1bXVsYXRvciBmdW5jdGlvbiB0aGF0IGtub3dzIGhvdyB0byBqb2luIGEgbmV3IHNvdXJjZSB2YWx1ZSBpbnRvXG4gKiB0aGUgYWNjdW11bGF0aW9uIGZyb20gdGhlIHBhc3QuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvcmVkdWNlLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIExpa2VcbiAqIFtBcnJheS5wcm90b3R5cGUucmVkdWNlKCldKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L3JlZHVjZSksXG4gKiBgcmVkdWNlYCBhcHBsaWVzIGFuIGBhY2N1bXVsYXRvcmAgZnVuY3Rpb24gYWdhaW5zdCBhbiBhY2N1bXVsYXRpb24gYW5kIGVhY2hcbiAqIHZhbHVlIG9mIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSAoZnJvbSB0aGUgcGFzdCkgdG8gcmVkdWNlIGl0IHRvIGEgc2luZ2xlXG4gKiB2YWx1ZSwgZW1pdHRlZCBvbiB0aGUgb3V0cHV0IE9ic2VydmFibGUuIE5vdGUgdGhhdCBgcmVkdWNlYCB3aWxsIG9ubHkgZW1pdFxuICogb25lIHZhbHVlLCBvbmx5IHdoZW4gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGNvbXBsZXRlcy4gSXQgaXMgZXF1aXZhbGVudCB0b1xuICogYXBwbHlpbmcgb3BlcmF0b3Ige0BsaW5rIHNjYW59IGZvbGxvd2VkIGJ5IG9wZXJhdG9yIHtAbGluayBsYXN0fS5cbiAqXG4gKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBhcHBsaWVzIGEgc3BlY2lmaWVkIGBhY2N1bXVsYXRvcmAgZnVuY3Rpb24gdG8gZWFjaFxuICogaXRlbSBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS4gSWYgYSBgc2VlZGAgdmFsdWUgaXMgc3BlY2lmaWVkLCB0aGVuXG4gKiB0aGF0IHZhbHVlIHdpbGwgYmUgdXNlZCBhcyB0aGUgaW5pdGlhbCB2YWx1ZSBmb3IgdGhlIGFjY3VtdWxhdG9yLiBJZiBubyBzZWVkXG4gKiB2YWx1ZSBpcyBzcGVjaWZpZWQsIHRoZSBmaXJzdCBpdGVtIG9mIHRoZSBzb3VyY2UgaXMgdXNlZCBhcyB0aGUgc2VlZC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Db3VudCB0aGUgbnVtYmVyIG9mIGNsaWNrIGV2ZW50cyB0aGF0IGhhcHBlbmVkIGluIDUgc2Vjb25kczwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3NJbkZpdmVTZWNvbmRzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpXG4gKiAgIC50YWtlVW50aWwoUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCg1MDAwKSk7XG4gKiB2YXIgb25lcyA9IGNsaWNrc0luRml2ZVNlY29uZHMubWFwVG8oMSk7XG4gKiB2YXIgc2VlZCA9IDA7XG4gKiB2YXIgY291bnQgPSBvbmVzLnJlZHVjZSgoYWNjLCBvbmUpID0+IGFjYyArIG9uZSwgc2VlZCk7XG4gKiBjb3VudC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgY291bnR9XG4gKiBAc2VlIHtAbGluayBleHBhbmR9XG4gKiBAc2VlIHtAbGluayBtZXJnZVNjYW59XG4gKiBAc2VlIHtAbGluayBzY2FufVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oYWNjOiBSLCB2YWx1ZTogVCk6IFJ9IGFjY3VtdWxhdG9yIFRoZSBhY2N1bXVsYXRvciBmdW5jdGlvblxuICogY2FsbGVkIG9uIGVhY2ggc291cmNlIHZhbHVlLlxuICogQHBhcmFtIHtSfSBbc2VlZF0gVGhlIGluaXRpYWwgYWNjdW11bGF0aW9uIHZhbHVlLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxSPn0gQW4gb2JzZXJ2YWJsZSBvZiB0aGUgYWNjdW11bGF0ZWQgdmFsdWVzLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxSPn0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGEgc2luZ2xlIHZhbHVlIHRoYXQgaXMgdGhlXG4gKiByZXN1bHQgb2YgYWNjdW11bGF0aW5nIHRoZSB2YWx1ZXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiBAbWV0aG9kIHJlZHVjZVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZTxULCBSPihhY2N1bXVsYXRvcjogKGFjYzogUiwgdmFsdWU6IFQpID0+IFIsIHNlZWQ/OiBSKTogT2JzZXJ2YWJsZTxSPiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IFJlZHVjZU9wZXJhdG9yKGFjY3VtdWxhdG9yLCBzZWVkKSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVkdWNlU2lnbmF0dXJlPFQ+IHtcbiAgPFI+KGFjY3VtdWxhdG9yOiAoYWNjOiBSLCB2YWx1ZTogVCkgPT4gUiwgc2VlZD86IFIpOiBPYnNlcnZhYmxlPFI+O1xufVxuXG5leHBvcnQgY2xhc3MgUmVkdWNlT3BlcmF0b3I8VCwgUj4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBSPiB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhY2N1bXVsYXRvcjogKGFjYzogUiwgdmFsdWU6IFQpID0+IFIsIHByaXZhdGUgc2VlZD86IFIpIHtcbiAgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxSPiwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2UuX3N1YnNjcmliZShuZXcgUmVkdWNlU3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLmFjY3VtdWxhdG9yLCB0aGlzLnNlZWQpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuZXhwb3J0IGNsYXNzIFJlZHVjZVN1YnNjcmliZXI8VCwgUj4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcblxuICBhY2M6IFQgfCBSO1xuICBoYXNTZWVkOiBib29sZWFuO1xuICBoYXNWYWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPFI+LFxuICAgICAgICAgICAgICBwcml2YXRlIGFjY3VtdWxhdG9yOiAoYWNjOiBSLCB2YWx1ZTogVCkgPT4gUixcbiAgICAgICAgICAgICAgc2VlZD86IFIpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gICAgdGhpcy5hY2MgPSBzZWVkO1xuICAgIHRoaXMuYWNjdW11bGF0b3IgPSBhY2N1bXVsYXRvcjtcbiAgICB0aGlzLmhhc1NlZWQgPSB0eXBlb2Ygc2VlZCAhPT0gJ3VuZGVmaW5lZCc7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IFQpIHtcbiAgICBpZiAodGhpcy5oYXNWYWx1ZSB8fCAodGhpcy5oYXNWYWx1ZSA9IHRoaXMuaGFzU2VlZCkpIHtcbiAgICAgIHRoaXMuX3RyeVJlZHVjZSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWNjID0gdmFsdWU7XG4gICAgICB0aGlzLmhhc1ZhbHVlID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF90cnlSZWR1Y2UodmFsdWU6IFQpIHtcbiAgICBsZXQgcmVzdWx0OiBhbnk7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuYWNjdW11bGF0b3IoPFI+dGhpcy5hY2MsIHZhbHVlKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5hY2MgPSByZXN1bHQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NvbXBsZXRlKCkge1xuICAgIGlmICh0aGlzLmhhc1ZhbHVlIHx8IHRoaXMuaGFzU2VlZCkge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHRoaXMuYWNjKTtcbiAgICB9XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
