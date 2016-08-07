System.register(['../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1;
    var PairwiseOperator, PairwiseSubscriber;
    /**
     * Groups pairs of consecutive emissions together and emits them as an array of
     * two values.
     *
     * <span class="informal">Puts the current value and previous value together as
     * an array, and emits that.</span>
     *
     * <img src="./img/pairwise.png" width="100%">
     *
     * The Nth emission from the source Observable will cause the output Observable
     * to emit an array [(N-1)th, Nth] of the previous and the current value, as a
     * pair. For this reason, `pairwise` emits on the second and subsequent
     * emissions from the source Observable, but not on the first emission, because
     * there is no previous value in that case.
     *
     * @example <caption>On every click (starting from the second), emit the relative distance to the previous click</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var pairs = clicks.pairwise();
     * var distance = pairs.map(pair => {
     *   var x0 = pair[0].clientX;
     *   var y0 = pair[0].clientY;
     *   var x1 = pair[1].clientX;
     *   var y1 = pair[1].clientY;
     *   return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
     * });
     * distance.subscribe(x => console.log(x));
     *
     * @see {@link buffer}
     * @see {@link bufferCount}
     *
     * @return {Observable<Array<T>>} An Observable of pairs (as arrays) of
     * consecutive values from the source Observable.
     * @method pairwise
     * @owner Observable
     */
    function pairwise() {
        return this.lift(new PairwiseOperator());
    }
    exports_1("pairwise", pairwise);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            PairwiseOperator = (function () {
                function PairwiseOperator() {
                }
                PairwiseOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new PairwiseSubscriber(subscriber));
                };
                return PairwiseOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            PairwiseSubscriber = (function (_super) {
                __extends(PairwiseSubscriber, _super);
                function PairwiseSubscriber(destination) {
                    _super.call(this, destination);
                    this.hasPrev = false;
                }
                PairwiseSubscriber.prototype._next = function (value) {
                    if (this.hasPrev) {
                        this.destination.next([this.prev, value]);
                    }
                    else {
                        this.hasPrev = true;
                    }
                    this.prev = value;
                };
                return PairwiseSubscriber;
            }(Subscriber_1.Subscriber));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL3BhaXJ3aXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFJQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtDRztJQUNIO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUZELCtCQUVDLENBQUE7Ozs7Ozs7WUFNRDtnQkFBQTtnQkFJQSxDQUFDO2dCQUhDLCtCQUFJLEdBQUosVUFBSyxVQUE4QixFQUFFLE1BQVc7b0JBQzlDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDL0QsQ0FBQztnQkFDSCx1QkFBQztZQUFELENBSkEsQUFJQyxJQUFBO1lBRUQ7Ozs7ZUFJRztZQUNIO2dCQUFvQyxzQ0FBYTtnQkFJL0MsNEJBQVksV0FBK0I7b0JBQ3pDLGtCQUFNLFdBQVcsQ0FBQyxDQUFDO29CQUhiLFlBQU8sR0FBWSxLQUFLLENBQUM7Z0JBSWpDLENBQUM7Z0JBRUQsa0NBQUssR0FBTCxVQUFNLEtBQVE7b0JBQ1osRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQ2pCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUM1QyxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO29CQUN0QixDQUFDO29CQUVELElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO2dCQUNwQixDQUFDO2dCQUNILHlCQUFDO1lBQUQsQ0FqQkEsQUFpQkMsQ0FqQm1DLHVCQUFVLEdBaUI3QyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9yeGpzL3NyYy9vcGVyYXRvci9wYWlyd2lzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T3BlcmF0b3J9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQge1N1YnNjcmliZXJ9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuXG4vKipcbiAqIEdyb3VwcyBwYWlycyBvZiBjb25zZWN1dGl2ZSBlbWlzc2lvbnMgdG9nZXRoZXIgYW5kIGVtaXRzIHRoZW0gYXMgYW4gYXJyYXkgb2ZcbiAqIHR3byB2YWx1ZXMuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPlB1dHMgdGhlIGN1cnJlbnQgdmFsdWUgYW5kIHByZXZpb3VzIHZhbHVlIHRvZ2V0aGVyIGFzXG4gKiBhbiBhcnJheSwgYW5kIGVtaXRzIHRoYXQuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvcGFpcndpc2UucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogVGhlIE50aCBlbWlzc2lvbiBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB3aWxsIGNhdXNlIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZVxuICogdG8gZW1pdCBhbiBhcnJheSBbKE4tMSl0aCwgTnRoXSBvZiB0aGUgcHJldmlvdXMgYW5kIHRoZSBjdXJyZW50IHZhbHVlLCBhcyBhXG4gKiBwYWlyLiBGb3IgdGhpcyByZWFzb24sIGBwYWlyd2lzZWAgZW1pdHMgb24gdGhlIHNlY29uZCBhbmQgc3Vic2VxdWVudFxuICogZW1pc3Npb25zIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCBidXQgbm90IG9uIHRoZSBmaXJzdCBlbWlzc2lvbiwgYmVjYXVzZVxuICogdGhlcmUgaXMgbm8gcHJldmlvdXMgdmFsdWUgaW4gdGhhdCBjYXNlLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPk9uIGV2ZXJ5IGNsaWNrIChzdGFydGluZyBmcm9tIHRoZSBzZWNvbmQpLCBlbWl0IHRoZSByZWxhdGl2ZSBkaXN0YW5jZSB0byB0aGUgcHJldmlvdXMgY2xpY2s8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHBhaXJzID0gY2xpY2tzLnBhaXJ3aXNlKCk7XG4gKiB2YXIgZGlzdGFuY2UgPSBwYWlycy5tYXAocGFpciA9PiB7XG4gKiAgIHZhciB4MCA9IHBhaXJbMF0uY2xpZW50WDtcbiAqICAgdmFyIHkwID0gcGFpclswXS5jbGllbnRZO1xuICogICB2YXIgeDEgPSBwYWlyWzFdLmNsaWVudFg7XG4gKiAgIHZhciB5MSA9IHBhaXJbMV0uY2xpZW50WTtcbiAqICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh4MCAtIHgxLCAyKSArIE1hdGgucG93KHkwIC0geTEsIDIpKTtcbiAqIH0pO1xuICogZGlzdGFuY2Uuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGJ1ZmZlcn1cbiAqIEBzZWUge0BsaW5rIGJ1ZmZlckNvdW50fVxuICpcbiAqIEByZXR1cm4ge09ic2VydmFibGU8QXJyYXk8VD4+fSBBbiBPYnNlcnZhYmxlIG9mIHBhaXJzIChhcyBhcnJheXMpIG9mXG4gKiBjb25zZWN1dGl2ZSB2YWx1ZXMgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiBAbWV0aG9kIHBhaXJ3aXNlXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFpcndpc2U8VD4oKTogT2JzZXJ2YWJsZTxbVCwgVF0+IHtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgUGFpcndpc2VPcGVyYXRvcigpKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYWlyd2lzZVNpZ25hdHVyZTxUPiB7XG4gICgpOiBPYnNlcnZhYmxlPFtULCBUXT47XG59XG5cbmNsYXNzIFBhaXJ3aXNlT3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBbVCwgVF0+IHtcbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFtULCBUXT4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gc291cmNlLl9zdWJzY3JpYmUobmV3IFBhaXJ3aXNlU3Vic2NyaWJlcihzdWJzY3JpYmVyKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIFBhaXJ3aXNlU3Vic2NyaWJlcjxUPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuICBwcml2YXRlIHByZXY6IFQ7XG4gIHByaXZhdGUgaGFzUHJldjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPFtULCBUXT4pIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBfbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmhhc1ByZXYpIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dChbdGhpcy5wcmV2LCB2YWx1ZV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhhc1ByZXYgPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMucHJldiA9IHZhbHVlO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
