System.register(['../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1;
    var DefaultIfEmptyOperator, DefaultIfEmptySubscriber;
    /**
     * Emits a given value if the source Observable completes without emitting any
     * `next` value, otherwise mirrors the source Observable.
     *
     * <span class="informal">If the source Observable turns out to be empty, then
     * this operator will emit a default value.</span>
     *
     * <img src="./img/defaultIfEmpty.png" width="100%">
     *
     * `defaultIfEmpty` emits the values emitted by the source Observable or a
     * specified default value if the source Observable is empty (completes without
     * having emitted any `next` value).
     *
     * @example <caption>If no clicks happen in 5 seconds, then emit "no clicks"</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var clicksBeforeFive = clicks.takeUntil(Rx.Observable.interval(5000));
     * var result = clicksBeforeFive.defaultIfEmpty('no clicks');
     * result.subscribe(x => console.log(x));
     *
     * @see {@link empty}
     * @see {@link last}
     *
     * @param {any} [defaultValue=null] The default value used if the source
     * Observable is empty.
     * @return {Observable} An Observable that emits either the specified
     * `defaultValue` if the source Observable emits no items, or the values emitted
     * by the source Observable.
     * @method defaultIfEmpty
     * @owner Observable
     */
    function defaultIfEmpty(defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        return this.lift(new DefaultIfEmptyOperator(defaultValue));
    }
    exports_1("defaultIfEmpty", defaultIfEmpty);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            DefaultIfEmptyOperator = (function () {
                function DefaultIfEmptyOperator(defaultValue) {
                    this.defaultValue = defaultValue;
                }
                DefaultIfEmptyOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new DefaultIfEmptySubscriber(subscriber, this.defaultValue));
                };
                return DefaultIfEmptyOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            DefaultIfEmptySubscriber = (function (_super) {
                __extends(DefaultIfEmptySubscriber, _super);
                function DefaultIfEmptySubscriber(destination, defaultValue) {
                    _super.call(this, destination);
                    this.defaultValue = defaultValue;
                    this.isEmpty = true;
                }
                DefaultIfEmptySubscriber.prototype._next = function (value) {
                    this.isEmpty = false;
                    this.destination.next(value);
                };
                DefaultIfEmptySubscriber.prototype._complete = function () {
                    if (this.isEmpty) {
                        this.destination.next(this.defaultValue);
                    }
                    this.destination.complete();
                };
                return DefaultIfEmptySubscriber;
            }(Subscriber_1.Subscriber));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL2RlZmF1bHRJZkVtcHR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFJQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E2Qkc7SUFDSCx3QkFBcUMsWUFBc0I7UUFBdEIsNEJBQXNCLEdBQXRCLG1CQUFzQjtRQUN6RCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLHNCQUFzQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUZELDJDQUVDLENBQUE7Ozs7Ozs7WUFPRDtnQkFFRSxnQ0FBb0IsWUFBZTtvQkFBZixpQkFBWSxHQUFaLFlBQVksQ0FBRztnQkFDbkMsQ0FBQztnQkFFRCxxQ0FBSSxHQUFKLFVBQUssVUFBNkIsRUFBRSxNQUFXO29CQUM3QyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLHdCQUF3QixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDeEYsQ0FBQztnQkFDSCw2QkFBQztZQUFELENBUkEsQUFRQyxJQUFBO1lBRUQ7Ozs7ZUFJRztZQUNIO2dCQUE2Qyw0Q0FBYTtnQkFHeEQsa0NBQVksV0FBOEIsRUFBVSxZQUFlO29CQUNqRSxrQkFBTSxXQUFXLENBQUMsQ0FBQztvQkFEK0IsaUJBQVksR0FBWixZQUFZLENBQUc7b0JBRjNELFlBQU8sR0FBWSxJQUFJLENBQUM7Z0JBSWhDLENBQUM7Z0JBRVMsd0NBQUssR0FBZixVQUFnQixLQUFRO29CQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztvQkFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQy9CLENBQUM7Z0JBRVMsNENBQVMsR0FBbkI7b0JBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQ2pCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDM0MsQ0FBQztvQkFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUM5QixDQUFDO2dCQUNILCtCQUFDO1lBQUQsQ0FsQkEsQUFrQkMsQ0FsQjRDLHVCQUFVLEdBa0J0RCIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9yeGpzL3NyYy9vcGVyYXRvci9kZWZhdWx0SWZFbXB0eS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T3BlcmF0b3J9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQge1N1YnNjcmliZXJ9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuXG4vKipcbiAqIEVtaXRzIGEgZ2l2ZW4gdmFsdWUgaWYgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGNvbXBsZXRlcyB3aXRob3V0IGVtaXR0aW5nIGFueVxuICogYG5leHRgIHZhbHVlLCBvdGhlcndpc2UgbWlycm9ycyB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPklmIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB0dXJucyBvdXQgdG8gYmUgZW1wdHksIHRoZW5cbiAqIHRoaXMgb3BlcmF0b3Igd2lsbCBlbWl0IGEgZGVmYXVsdCB2YWx1ZS48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9kZWZhdWx0SWZFbXB0eS5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBgZGVmYXVsdElmRW1wdHlgIGVtaXRzIHRoZSB2YWx1ZXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUgb3IgYVxuICogc3BlY2lmaWVkIGRlZmF1bHQgdmFsdWUgaWYgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGlzIGVtcHR5IChjb21wbGV0ZXMgd2l0aG91dFxuICogaGF2aW5nIGVtaXR0ZWQgYW55IGBuZXh0YCB2YWx1ZSkuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+SWYgbm8gY2xpY2tzIGhhcHBlbiBpbiA1IHNlY29uZHMsIHRoZW4gZW1pdCBcIm5vIGNsaWNrc1wiPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciBjbGlja3NCZWZvcmVGaXZlID0gY2xpY2tzLnRha2VVbnRpbChSeC5PYnNlcnZhYmxlLmludGVydmFsKDUwMDApKTtcbiAqIHZhciByZXN1bHQgPSBjbGlja3NCZWZvcmVGaXZlLmRlZmF1bHRJZkVtcHR5KCdubyBjbGlja3MnKTtcbiAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgZW1wdHl9XG4gKiBAc2VlIHtAbGluayBsYXN0fVxuICpcbiAqIEBwYXJhbSB7YW55fSBbZGVmYXVsdFZhbHVlPW51bGxdIFRoZSBkZWZhdWx0IHZhbHVlIHVzZWQgaWYgdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZSBpcyBlbXB0eS5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBlaXRoZXIgdGhlIHNwZWNpZmllZFxuICogYGRlZmF1bHRWYWx1ZWAgaWYgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGVtaXRzIG5vIGl0ZW1zLCBvciB0aGUgdmFsdWVzIGVtaXR0ZWRcbiAqIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqIEBtZXRob2QgZGVmYXVsdElmRW1wdHlcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0SWZFbXB0eTxULCBSPihkZWZhdWx0VmFsdWU6IFIgPSBudWxsKTogT2JzZXJ2YWJsZTxUIHwgUj4ge1xuICByZXR1cm4gdGhpcy5saWZ0KG5ldyBEZWZhdWx0SWZFbXB0eU9wZXJhdG9yKGRlZmF1bHRWYWx1ZSkpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERlZmF1bHRJZkVtcHR5U2lnbmF0dXJlPFQ+IHtcbiAgKGRlZmF1bHRWYWx1ZT86IFQpOiBPYnNlcnZhYmxlPFQ+O1xuICA8Uj4oZGVmYXVsdFZhbHVlPzogUik6IE9ic2VydmFibGU8VCB8IFI+O1xufVxuXG5jbGFzcyBEZWZhdWx0SWZFbXB0eU9wZXJhdG9yPFQsIFI+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgVCB8IFI+IHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlZmF1bHRWYWx1ZTogUikge1xuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQgfCBSPiwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2UuX3N1YnNjcmliZShuZXcgRGVmYXVsdElmRW1wdHlTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMuZGVmYXVsdFZhbHVlKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIERlZmF1bHRJZkVtcHR5U3Vic2NyaWJlcjxULCBSPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuICBwcml2YXRlIGlzRW1wdHk6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPFQgfCBSPiwgcHJpdmF0ZSBkZWZhdWx0VmFsdWU6IFIpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IFQpOiB2b2lkIHtcbiAgICB0aGlzLmlzRW1wdHkgPSBmYWxzZTtcbiAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQodmFsdWUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0VtcHR5KSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQodGhpcy5kZWZhdWx0VmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
