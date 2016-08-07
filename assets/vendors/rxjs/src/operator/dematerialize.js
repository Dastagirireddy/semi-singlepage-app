System.register(['../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1;
    var DeMaterializeOperator, DeMaterializeSubscriber;
    /**
     * Converts an Observable of {@link Notification} objects into the emissions
     * that they represent.
     *
     * <span class="informal">Unwraps {@link Notification} objects as actual `next`,
     * `error` and `complete` emissions. The opposite of {@link materialize}.</span>
     *
     * <img src="./img/dematerialize.png" width="100%">
     *
     * `dematerialize` is assumed to operate an Observable that only emits
     * {@link Notification} objects as `next` emissions, and does not emit any
     * `error`. Such Observable is the output of a `materialize` operation. Those
     * notifications are then unwrapped using the metadata they contain, and emitted
     * as `next`, `error`, and `complete` on the output Observable.
     *
     * Use this operator in conjunction with {@link materialize}.
     *
     * @example <caption>Convert an Observable of Notifications to an actual Observable</caption>
     * var notifA = new Rx.Notification('N', 'A');
     * var notifB = new Rx.Notification('N', 'B');
     * var notifE = new Rx.Notification('E', void 0,
     *   new TypeError('x.toUpperCase is not a function')
     * );
     * var materialized = Rx.Observable.of(notifA, notifB, notifE);
     * var upperCase = materialized.dematerialize();
     * upperCase.subscribe(x => console.log(x), e => console.error(e));
     *
     * @see {@link Notification}
     * @see {@link materialize}
     *
     * @return {Observable} An Observable that emits items and notifications
     * embedded in Notification objects emitted by the source Observable.
     * @method dematerialize
     * @owner Observable
     */
    function dematerialize() {
        return this.lift(new DeMaterializeOperator());
    }
    exports_1("dematerialize", dematerialize);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            DeMaterializeOperator = (function () {
                function DeMaterializeOperator() {
                }
                DeMaterializeOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new DeMaterializeSubscriber(subscriber));
                };
                return DeMaterializeOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            DeMaterializeSubscriber = (function (_super) {
                __extends(DeMaterializeSubscriber, _super);
                function DeMaterializeSubscriber(destination) {
                    _super.call(this, destination);
                }
                DeMaterializeSubscriber.prototype._next = function (value) {
                    value.observe(this.destination);
                };
                return DeMaterializeSubscriber;
            }(Subscriber_1.Subscriber));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL2RlbWF0ZXJpYWxpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUtBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Ba0NHO0lBQ0g7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLHFCQUFxQixFQUFFLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRkQseUNBRUMsQ0FBQTs7Ozs7OztZQU1EO2dCQUFBO2dCQUlBLENBQUM7Z0JBSEMsb0NBQUksR0FBSixVQUFLLFVBQTJCLEVBQUUsTUFBVztvQkFDM0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSx1QkFBdUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNwRSxDQUFDO2dCQUNILDRCQUFDO1lBQUQsQ0FKQSxBQUlDLElBQUE7WUFFRDs7OztlQUlHO1lBQ0g7Z0JBQW1FLDJDQUFhO2dCQUM5RSxpQ0FBWSxXQUE0QjtvQkFDdEMsa0JBQU0sV0FBVyxDQUFDLENBQUM7Z0JBQ3JCLENBQUM7Z0JBRVMsdUNBQUssR0FBZixVQUFnQixLQUFRO29CQUN0QixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDbEMsQ0FBQztnQkFDSCw4QkFBQztZQUFELENBUkEsQUFRQyxDQVJrRSx1QkFBVSxHQVE1RSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9yeGpzL3NyYy9vcGVyYXRvci9kZW1hdGVyaWFsaXplLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPcGVyYXRvcn0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7U3Vic2NyaWJlcn0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQge05vdGlmaWNhdGlvbn0gZnJvbSAnLi4vTm90aWZpY2F0aW9uJztcblxuLyoqXG4gKiBDb252ZXJ0cyBhbiBPYnNlcnZhYmxlIG9mIHtAbGluayBOb3RpZmljYXRpb259IG9iamVjdHMgaW50byB0aGUgZW1pc3Npb25zXG4gKiB0aGF0IHRoZXkgcmVwcmVzZW50LlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5VbndyYXBzIHtAbGluayBOb3RpZmljYXRpb259IG9iamVjdHMgYXMgYWN0dWFsIGBuZXh0YCxcbiAqIGBlcnJvcmAgYW5kIGBjb21wbGV0ZWAgZW1pc3Npb25zLiBUaGUgb3Bwb3NpdGUgb2Yge0BsaW5rIG1hdGVyaWFsaXplfS48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9kZW1hdGVyaWFsaXplLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGBkZW1hdGVyaWFsaXplYCBpcyBhc3N1bWVkIHRvIG9wZXJhdGUgYW4gT2JzZXJ2YWJsZSB0aGF0IG9ubHkgZW1pdHNcbiAqIHtAbGluayBOb3RpZmljYXRpb259IG9iamVjdHMgYXMgYG5leHRgIGVtaXNzaW9ucywgYW5kIGRvZXMgbm90IGVtaXQgYW55XG4gKiBgZXJyb3JgLiBTdWNoIE9ic2VydmFibGUgaXMgdGhlIG91dHB1dCBvZiBhIGBtYXRlcmlhbGl6ZWAgb3BlcmF0aW9uLiBUaG9zZVxuICogbm90aWZpY2F0aW9ucyBhcmUgdGhlbiB1bndyYXBwZWQgdXNpbmcgdGhlIG1ldGFkYXRhIHRoZXkgY29udGFpbiwgYW5kIGVtaXR0ZWRcbiAqIGFzIGBuZXh0YCwgYGVycm9yYCwgYW5kIGBjb21wbGV0ZWAgb24gdGhlIG91dHB1dCBPYnNlcnZhYmxlLlxuICpcbiAqIFVzZSB0aGlzIG9wZXJhdG9yIGluIGNvbmp1bmN0aW9uIHdpdGgge0BsaW5rIG1hdGVyaWFsaXplfS5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Db252ZXJ0IGFuIE9ic2VydmFibGUgb2YgTm90aWZpY2F0aW9ucyB0byBhbiBhY3R1YWwgT2JzZXJ2YWJsZTwvY2FwdGlvbj5cbiAqIHZhciBub3RpZkEgPSBuZXcgUnguTm90aWZpY2F0aW9uKCdOJywgJ0EnKTtcbiAqIHZhciBub3RpZkIgPSBuZXcgUnguTm90aWZpY2F0aW9uKCdOJywgJ0InKTtcbiAqIHZhciBub3RpZkUgPSBuZXcgUnguTm90aWZpY2F0aW9uKCdFJywgdm9pZCAwLFxuICogICBuZXcgVHlwZUVycm9yKCd4LnRvVXBwZXJDYXNlIGlzIG5vdCBhIGZ1bmN0aW9uJylcbiAqICk7XG4gKiB2YXIgbWF0ZXJpYWxpemVkID0gUnguT2JzZXJ2YWJsZS5vZihub3RpZkEsIG5vdGlmQiwgbm90aWZFKTtcbiAqIHZhciB1cHBlckNhc2UgPSBtYXRlcmlhbGl6ZWQuZGVtYXRlcmlhbGl6ZSgpO1xuICogdXBwZXJDYXNlLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpLCBlID0+IGNvbnNvbGUuZXJyb3IoZSkpO1xuICpcbiAqIEBzZWUge0BsaW5rIE5vdGlmaWNhdGlvbn1cbiAqIEBzZWUge0BsaW5rIG1hdGVyaWFsaXplfVxuICpcbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBpdGVtcyBhbmQgbm90aWZpY2F0aW9uc1xuICogZW1iZWRkZWQgaW4gTm90aWZpY2F0aW9uIG9iamVjdHMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiBAbWV0aG9kIGRlbWF0ZXJpYWxpemVcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZW1hdGVyaWFsaXplPFQ+KCk6IE9ic2VydmFibGU8YW55PiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IERlTWF0ZXJpYWxpemVPcGVyYXRvcigpKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEZW1hdGVyaWFsaXplU2lnbmF0dXJlPFQ+IHtcbiAgPFI+KCk6IE9ic2VydmFibGU8Uj47XG59XG5cbmNsYXNzIERlTWF0ZXJpYWxpemVPcGVyYXRvcjxUIGV4dGVuZHMgTm90aWZpY2F0aW9uPGFueT4sIFI+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgUj4ge1xuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8YW55Piwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2UuX3N1YnNjcmliZShuZXcgRGVNYXRlcmlhbGl6ZVN1YnNjcmliZXIoc3Vic2NyaWJlcikpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBEZU1hdGVyaWFsaXplU3Vic2NyaWJlcjxUIGV4dGVuZHMgTm90aWZpY2F0aW9uPGFueT4+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPGFueT4pIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IFQpIHtcbiAgICB2YWx1ZS5vYnNlcnZlKHRoaXMuZGVzdGluYXRpb24pO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
