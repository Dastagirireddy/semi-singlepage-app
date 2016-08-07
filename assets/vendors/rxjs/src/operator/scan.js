System.register(['../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1;
    var ScanOperator, ScanSubscriber;
    /**
     * Applies an accumulator function over the source Observable, and returns each
     * intermediate result, with an optional seed value.
     *
     * <span class="informal">It's like {@link reduce}, but emits the current
     * accumulation whenever the source emits a value.</span>
     *
     * <img src="./img/scan.png" width="100%">
     *
     * Combines together all values emitted on the source, using an accumulator
     * function that knows how to join a new source value into the accumulation from
     * the past. Is similar to {@link reduce}, but emits the intermediate
     * accumulations.
     *
     * Returns an Observable that applies a specified `accumulator` function to each
     * item emitted by the source Observable. If a `seed` value is specified, then
     * that value will be used as the initial value for the accumulator. If no seed
     * value is specified, the first item of the source is used as the seed.
     *
     * @example <caption>Count the number of click events</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var ones = clicks.mapTo(1);
     * var seed = 0;
     * var count = ones.scan((acc, one) => acc + one, seed);
     * count.subscribe(x => console.log(x));
     *
     * @see {@link expand}
     * @see {@link mergeScan}
     * @see {@link reduce}
     *
     * @param {function(acc: R, value: T, index: number): R} accumulator
     * The accumulator function called on each source value.
     * @param {T|R} [seed] The initial accumulation value.
     * @return {Observable<R>} An observable of the accumulated values.
     * @method scan
     * @owner Observable
     */
    function scan(accumulator, seed) {
        return this.lift(new ScanOperator(accumulator, seed));
    }
    exports_1("scan", scan);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            ScanOperator = (function () {
                function ScanOperator(accumulator, seed) {
                    this.accumulator = accumulator;
                    this.seed = seed;
                }
                ScanOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new ScanSubscriber(subscriber, this.accumulator, this.seed));
                };
                return ScanOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            ScanSubscriber = (function (_super) {
                __extends(ScanSubscriber, _super);
                function ScanSubscriber(destination, accumulator, seed) {
                    _super.call(this, destination);
                    this.accumulator = accumulator;
                    this.index = 0;
                    this.accumulatorSet = false;
                    this.seed = seed;
                    this.accumulatorSet = typeof seed !== 'undefined';
                }
                Object.defineProperty(ScanSubscriber.prototype, "seed", {
                    get: function () {
                        return this._seed;
                    },
                    set: function (value) {
                        this.accumulatorSet = true;
                        this._seed = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                ScanSubscriber.prototype._next = function (value) {
                    if (!this.accumulatorSet) {
                        this.seed = value;
                        this.destination.next(value);
                    }
                    else {
                        return this._tryNext(value);
                    }
                };
                ScanSubscriber.prototype._tryNext = function (value) {
                    var index = this.index++;
                    var result;
                    try {
                        result = this.accumulator(this.seed, value, index);
                    }
                    catch (err) {
                        this.destination.error(err);
                    }
                    this.seed = result;
                    this.destination.next(result);
                };
                return ScanSubscriber;
            }(Subscriber_1.Subscriber));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL3NjYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FvQ0c7SUFDSCxjQUEyQixXQUFtRCxFQUFFLElBQVk7UUFDMUYsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxZQUFZLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUZELHVCQUVDLENBQUE7Ozs7Ozs7WUFNRDtnQkFDRSxzQkFBb0IsV0FBbUQsRUFBVSxJQUFZO29CQUF6RSxnQkFBVyxHQUFYLFdBQVcsQ0FBd0M7b0JBQVUsU0FBSSxHQUFKLElBQUksQ0FBUTtnQkFDN0YsQ0FBQztnQkFFRCwyQkFBSSxHQUFKLFVBQUssVUFBeUIsRUFBRSxNQUFXO29CQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDeEYsQ0FBQztnQkFDSCxtQkFBQztZQUFELENBUEEsQUFPQyxJQUFBO1lBRUQ7Ozs7ZUFJRztZQUNIO2dCQUFtQyxrQ0FBYTtnQkFjOUMsd0JBQVksV0FBMEIsRUFBVSxXQUFtRCxFQUFFLElBQVU7b0JBQzdHLGtCQUFNLFdBQVcsQ0FBQyxDQUFDO29CQUQyQixnQkFBVyxHQUFYLFdBQVcsQ0FBd0M7b0JBYjNGLFVBQUssR0FBVyxDQUFDLENBQUM7b0JBQ2xCLG1CQUFjLEdBQVksS0FBSyxDQUFDO29CQWN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLElBQUksS0FBSyxXQUFXLENBQUM7Z0JBQ3BELENBQUM7Z0JBYkQsc0JBQUksZ0NBQUk7eUJBQVI7d0JBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7b0JBQ3BCLENBQUM7eUJBRUQsVUFBUyxLQUFZO3dCQUNuQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQzt3QkFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7b0JBQ3JCLENBQUM7OzttQkFMQTtnQkFhUyw4QkFBSyxHQUFmLFVBQWdCLEtBQVE7b0JBQ3RCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7d0JBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO3dCQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDL0IsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDOUIsQ0FBQztnQkFDSCxDQUFDO2dCQUVPLGlDQUFRLEdBQWhCLFVBQWlCLEtBQVE7b0JBQ3ZCLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDM0IsSUFBSSxNQUFXLENBQUM7b0JBQ2hCLElBQUksQ0FBQzt3QkFDSCxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDeEQsQ0FBRTtvQkFBQSxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM5QixDQUFDO29CQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO29CQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDaEMsQ0FBQztnQkFDSCxxQkFBQztZQUFELENBeENBLEFBd0NDLENBeENrQyx1QkFBVSxHQXdDNUMiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvcnhqcy9zcmMvb3BlcmF0b3Ivc2Nhbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T3BlcmF0b3J9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQge1N1YnNjcmliZXJ9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuXG4vKipcbiAqIEFwcGxpZXMgYW4gYWNjdW11bGF0b3IgZnVuY3Rpb24gb3ZlciB0aGUgc291cmNlIE9ic2VydmFibGUsIGFuZCByZXR1cm5zIGVhY2hcbiAqIGludGVybWVkaWF0ZSByZXN1bHQsIHdpdGggYW4gb3B0aW9uYWwgc2VlZCB2YWx1ZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+SXQncyBsaWtlIHtAbGluayByZWR1Y2V9LCBidXQgZW1pdHMgdGhlIGN1cnJlbnRcbiAqIGFjY3VtdWxhdGlvbiB3aGVuZXZlciB0aGUgc291cmNlIGVtaXRzIGEgdmFsdWUuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvc2Nhbi5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBDb21iaW5lcyB0b2dldGhlciBhbGwgdmFsdWVzIGVtaXR0ZWQgb24gdGhlIHNvdXJjZSwgdXNpbmcgYW4gYWNjdW11bGF0b3JcbiAqIGZ1bmN0aW9uIHRoYXQga25vd3MgaG93IHRvIGpvaW4gYSBuZXcgc291cmNlIHZhbHVlIGludG8gdGhlIGFjY3VtdWxhdGlvbiBmcm9tXG4gKiB0aGUgcGFzdC4gSXMgc2ltaWxhciB0byB7QGxpbmsgcmVkdWNlfSwgYnV0IGVtaXRzIHRoZSBpbnRlcm1lZGlhdGVcbiAqIGFjY3VtdWxhdGlvbnMuXG4gKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgYXBwbGllcyBhIHNwZWNpZmllZCBgYWNjdW11bGF0b3JgIGZ1bmN0aW9uIHRvIGVhY2hcbiAqIGl0ZW0gZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUuIElmIGEgYHNlZWRgIHZhbHVlIGlzIHNwZWNpZmllZCwgdGhlblxuICogdGhhdCB2YWx1ZSB3aWxsIGJlIHVzZWQgYXMgdGhlIGluaXRpYWwgdmFsdWUgZm9yIHRoZSBhY2N1bXVsYXRvci4gSWYgbm8gc2VlZFxuICogdmFsdWUgaXMgc3BlY2lmaWVkLCB0aGUgZmlyc3QgaXRlbSBvZiB0aGUgc291cmNlIGlzIHVzZWQgYXMgdGhlIHNlZWQuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+Q291bnQgdGhlIG51bWJlciBvZiBjbGljayBldmVudHM8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIG9uZXMgPSBjbGlja3MubWFwVG8oMSk7XG4gKiB2YXIgc2VlZCA9IDA7XG4gKiB2YXIgY291bnQgPSBvbmVzLnNjYW4oKGFjYywgb25lKSA9PiBhY2MgKyBvbmUsIHNlZWQpO1xuICogY291bnQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGV4cGFuZH1cbiAqIEBzZWUge0BsaW5rIG1lcmdlU2Nhbn1cbiAqIEBzZWUge0BsaW5rIHJlZHVjZX1cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKGFjYzogUiwgdmFsdWU6IFQsIGluZGV4OiBudW1iZXIpOiBSfSBhY2N1bXVsYXRvclxuICogVGhlIGFjY3VtdWxhdG9yIGZ1bmN0aW9uIGNhbGxlZCBvbiBlYWNoIHNvdXJjZSB2YWx1ZS5cbiAqIEBwYXJhbSB7VHxSfSBbc2VlZF0gVGhlIGluaXRpYWwgYWNjdW11bGF0aW9uIHZhbHVlLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxSPn0gQW4gb2JzZXJ2YWJsZSBvZiB0aGUgYWNjdW11bGF0ZWQgdmFsdWVzLlxuICogQG1ldGhvZCBzY2FuXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2NhbjxULCBSPihhY2N1bXVsYXRvcjogKGFjYzogUiwgdmFsdWU6IFQsIGluZGV4OiBudW1iZXIpID0+IFIsIHNlZWQ/OiBUIHwgUik6IE9ic2VydmFibGU8Uj4ge1xuICByZXR1cm4gdGhpcy5saWZ0KG5ldyBTY2FuT3BlcmF0b3IoYWNjdW11bGF0b3IsIHNlZWQpKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTY2FuU2lnbmF0dXJlPFQ+IHtcbiAgPFI+KGFjY3VtdWxhdG9yOiAoYWNjOiBSLCB2YWx1ZTogVCwgaW5kZXg6IG51bWJlcikgPT4gUiwgc2VlZD86IFQgfCBSKTogT2JzZXJ2YWJsZTxSPjtcbn1cblxuY2xhc3MgU2Nhbk9wZXJhdG9yPFQsIFI+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgUj4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFjY3VtdWxhdG9yOiAoYWNjOiBSLCB2YWx1ZTogVCwgaW5kZXg6IG51bWJlcikgPT4gUiwgcHJpdmF0ZSBzZWVkPzogVCB8IFIpIHtcbiAgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxSPiwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2UuX3N1YnNjcmliZShuZXcgU2NhblN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5hY2N1bXVsYXRvciwgdGhpcy5zZWVkKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIFNjYW5TdWJzY3JpYmVyPFQsIFI+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG4gIHByaXZhdGUgaW5kZXg6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgYWNjdW11bGF0b3JTZXQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfc2VlZDogVCB8IFI7XG5cbiAgZ2V0IHNlZWQoKTogVCB8IFIge1xuICAgIHJldHVybiB0aGlzLl9zZWVkO1xuICB9XG5cbiAgc2V0IHNlZWQodmFsdWU6IFQgfCBSKSB7XG4gICAgdGhpcy5hY2N1bXVsYXRvclNldCA9IHRydWU7XG4gICAgdGhpcy5fc2VlZCA9IHZhbHVlO1xuICB9XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8Uj4sIHByaXZhdGUgYWNjdW11bGF0b3I6IChhY2M6IFIsIHZhbHVlOiBULCBpbmRleDogbnVtYmVyKSA9PiBSLCBzZWVkPzogVHxSKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICAgIHRoaXMuc2VlZCA9IHNlZWQ7XG4gICAgdGhpcy5hY2N1bXVsYXRvclNldCA9IHR5cGVvZiBzZWVkICE9PSAndW5kZWZpbmVkJztcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5hY2N1bXVsYXRvclNldCkge1xuICAgICAgdGhpcy5zZWVkID0gdmFsdWU7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5fdHJ5TmV4dCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdHJ5TmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbmRleCsrO1xuICAgIGxldCByZXN1bHQ6IGFueTtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5hY2N1bXVsYXRvcig8Uj50aGlzLnNlZWQsIHZhbHVlLCBpbmRleCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgfVxuICAgIHRoaXMuc2VlZCA9IHJlc3VsdDtcbiAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQocmVzdWx0KTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
