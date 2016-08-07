System.register(['../Subscriber', '../Notification'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1, Notification_1;
    var MaterializeOperator, MaterializeSubscriber;
    /**
     * Represents all of the notifications from the source Observable as `next`
     * emissions marked with their original types within {@link Notification}
     * objects.
     *
     * <span class="informal">Wraps `next`, `error` and `complete` emissions in
     * {@link Notification} objects, emitted as `next` on the output Observable.
     * </span>
     *
     * <img src="./img/materialize.png" width="100%">
     *
     * `materialize` returns an Observable that emits a `next` notification for each
     * `next`, `error`, or `complete` emission of the source Observable. When the
     * source Observable emits `complete`, the output Observable will emit `next` as
     * a Notification of type "complete", and then it will emit `complete` as well.
     * When the source Observable emits `error`, the output will emit `next` as a
     * Notification of type "error", and then `complete`.
     *
     * This operator is useful for producing metadata of the source Observable, to
     * be consumed as `next` emissions. Use it in conjunction with
     * {@link dematerialize}.
     *
     * @example <caption>Convert a faulty Observable to an Observable of Notifications</caption>
     * var letters = Rx.Observable.of('a', 'b', 13, 'd');
     * var upperCase = letters.map(x => x.toUpperCase());
     * var materialized = upperCase.materialize();
     * materialized.subscribe(x => console.log(x));
     *
     * @see {@link Notification}
     * @see {@link dematerialize}
     *
     * @return {Observable<Notification<T>>} An Observable that emits
     * {@link Notification} objects that wrap the original emissions from the source
     * Observable with metadata.
     * @method materialize
     * @owner Observable
     */
    function materialize() {
        return this.lift(new MaterializeOperator());
    }
    exports_1("materialize", materialize);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (Notification_1_1) {
                Notification_1 = Notification_1_1;
            }],
        execute: function() {
            MaterializeOperator = (function () {
                function MaterializeOperator() {
                }
                MaterializeOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new MaterializeSubscriber(subscriber));
                };
                return MaterializeOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            MaterializeSubscriber = (function (_super) {
                __extends(MaterializeSubscriber, _super);
                function MaterializeSubscriber(destination) {
                    _super.call(this, destination);
                }
                MaterializeSubscriber.prototype._next = function (value) {
                    this.destination.next(Notification_1.Notification.createNext(value));
                };
                MaterializeSubscriber.prototype._error = function (err) {
                    var destination = this.destination;
                    destination.next(Notification_1.Notification.createError(err));
                    destination.complete();
                };
                MaterializeSubscriber.prototype._complete = function () {
                    var destination = this.destination;
                    destination.next(Notification_1.Notification.createComplete());
                    destination.complete();
                };
                return MaterializeSubscriber;
            }(Subscriber_1.Subscriber));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL21hdGVyaWFsaXplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFLQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bb0NHO0lBQ0g7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLG1CQUFtQixFQUFFLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRkQscUNBRUMsQ0FBQTs7Ozs7Ozs7OztZQU1EO2dCQUFBO2dCQUlBLENBQUM7Z0JBSEMsa0NBQUksR0FBSixVQUFLLFVBQXVDLEVBQUUsTUFBVztvQkFDdkQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNsRSxDQUFDO2dCQUNILDBCQUFDO1lBQUQsQ0FKQSxBQUlDLElBQUE7WUFFRDs7OztlQUlHO1lBQ0g7Z0JBQXVDLHlDQUFhO2dCQUNsRCwrQkFBWSxXQUF3QztvQkFDbEQsa0JBQU0sV0FBVyxDQUFDLENBQUM7Z0JBQ3JCLENBQUM7Z0JBRVMscUNBQUssR0FBZixVQUFnQixLQUFRO29CQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQywyQkFBWSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUN4RCxDQUFDO2dCQUVTLHNDQUFNLEdBQWhCLFVBQWlCLEdBQVE7b0JBQ3ZCLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7b0JBQ3JDLFdBQVcsQ0FBQyxJQUFJLENBQUMsMkJBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDaEQsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUN6QixDQUFDO2dCQUVTLHlDQUFTLEdBQW5CO29CQUNFLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7b0JBQ3JDLFdBQVcsQ0FBQyxJQUFJLENBQUMsMkJBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO29CQUNoRCxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3pCLENBQUM7Z0JBQ0gsNEJBQUM7WUFBRCxDQXBCQSxBQW9CQyxDQXBCc0MsdUJBQVUsR0FvQmhEIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL21hdGVyaWFsaXplLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPcGVyYXRvcn0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7U3Vic2NyaWJlcn0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQge05vdGlmaWNhdGlvbn0gZnJvbSAnLi4vTm90aWZpY2F0aW9uJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFsbCBvZiB0aGUgbm90aWZpY2F0aW9ucyBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBhcyBgbmV4dGBcbiAqIGVtaXNzaW9ucyBtYXJrZWQgd2l0aCB0aGVpciBvcmlnaW5hbCB0eXBlcyB3aXRoaW4ge0BsaW5rIE5vdGlmaWNhdGlvbn1cbiAqIG9iamVjdHMuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPldyYXBzIGBuZXh0YCwgYGVycm9yYCBhbmQgYGNvbXBsZXRlYCBlbWlzc2lvbnMgaW5cbiAqIHtAbGluayBOb3RpZmljYXRpb259IG9iamVjdHMsIGVtaXR0ZWQgYXMgYG5leHRgIG9uIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZS5cbiAqIDwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL21hdGVyaWFsaXplLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGBtYXRlcmlhbGl6ZWAgcmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgYSBgbmV4dGAgbm90aWZpY2F0aW9uIGZvciBlYWNoXG4gKiBgbmV4dGAsIGBlcnJvcmAsIG9yIGBjb21wbGV0ZWAgZW1pc3Npb24gb2YgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLiBXaGVuIHRoZVxuICogc291cmNlIE9ic2VydmFibGUgZW1pdHMgYGNvbXBsZXRlYCwgdGhlIG91dHB1dCBPYnNlcnZhYmxlIHdpbGwgZW1pdCBgbmV4dGAgYXNcbiAqIGEgTm90aWZpY2F0aW9uIG9mIHR5cGUgXCJjb21wbGV0ZVwiLCBhbmQgdGhlbiBpdCB3aWxsIGVtaXQgYGNvbXBsZXRlYCBhcyB3ZWxsLlxuICogV2hlbiB0aGUgc291cmNlIE9ic2VydmFibGUgZW1pdHMgYGVycm9yYCwgdGhlIG91dHB1dCB3aWxsIGVtaXQgYG5leHRgIGFzIGFcbiAqIE5vdGlmaWNhdGlvbiBvZiB0eXBlIFwiZXJyb3JcIiwgYW5kIHRoZW4gYGNvbXBsZXRlYC5cbiAqXG4gKiBUaGlzIG9wZXJhdG9yIGlzIHVzZWZ1bCBmb3IgcHJvZHVjaW5nIG1ldGFkYXRhIG9mIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgdG9cbiAqIGJlIGNvbnN1bWVkIGFzIGBuZXh0YCBlbWlzc2lvbnMuIFVzZSBpdCBpbiBjb25qdW5jdGlvbiB3aXRoXG4gKiB7QGxpbmsgZGVtYXRlcmlhbGl6ZX0uXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+Q29udmVydCBhIGZhdWx0eSBPYnNlcnZhYmxlIHRvIGFuIE9ic2VydmFibGUgb2YgTm90aWZpY2F0aW9uczwvY2FwdGlvbj5cbiAqIHZhciBsZXR0ZXJzID0gUnguT2JzZXJ2YWJsZS5vZignYScsICdiJywgMTMsICdkJyk7XG4gKiB2YXIgdXBwZXJDYXNlID0gbGV0dGVycy5tYXAoeCA9PiB4LnRvVXBwZXJDYXNlKCkpO1xuICogdmFyIG1hdGVyaWFsaXplZCA9IHVwcGVyQ2FzZS5tYXRlcmlhbGl6ZSgpO1xuICogbWF0ZXJpYWxpemVkLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBOb3RpZmljYXRpb259XG4gKiBAc2VlIHtAbGluayBkZW1hdGVyaWFsaXplfVxuICpcbiAqIEByZXR1cm4ge09ic2VydmFibGU8Tm90aWZpY2F0aW9uPFQ+Pn0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzXG4gKiB7QGxpbmsgTm90aWZpY2F0aW9ufSBvYmplY3RzIHRoYXQgd3JhcCB0aGUgb3JpZ2luYWwgZW1pc3Npb25zIGZyb20gdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZSB3aXRoIG1ldGFkYXRhLlxuICogQG1ldGhvZCBtYXRlcmlhbGl6ZVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hdGVyaWFsaXplPFQ+KCk6IE9ic2VydmFibGU8Tm90aWZpY2F0aW9uPFQ+PiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IE1hdGVyaWFsaXplT3BlcmF0b3IoKSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWF0ZXJpYWxpemVTaWduYXR1cmU8VD4ge1xuICAoKTogT2JzZXJ2YWJsZTxOb3RpZmljYXRpb248VD4+O1xufVxuXG5jbGFzcyBNYXRlcmlhbGl6ZU9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgTm90aWZpY2F0aW9uPFQ+PiB7XG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxOb3RpZmljYXRpb248VD4+LCBzb3VyY2U6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHNvdXJjZS5fc3Vic2NyaWJlKG5ldyBNYXRlcmlhbGl6ZVN1YnNjcmliZXIoc3Vic2NyaWJlcikpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBNYXRlcmlhbGl6ZVN1YnNjcmliZXI8VD4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8Tm90aWZpY2F0aW9uPFQ+Pikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCkge1xuICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dChOb3RpZmljYXRpb24uY3JlYXRlTmV4dCh2YWx1ZSkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9lcnJvcihlcnI6IGFueSkge1xuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gdGhpcy5kZXN0aW5hdGlvbjtcbiAgICBkZXN0aW5hdGlvbi5uZXh0KE5vdGlmaWNhdGlvbi5jcmVhdGVFcnJvcihlcnIpKTtcbiAgICBkZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpIHtcbiAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHRoaXMuZGVzdGluYXRpb247XG4gICAgZGVzdGluYXRpb24ubmV4dChOb3RpZmljYXRpb24uY3JlYXRlQ29tcGxldGUoKSk7XG4gICAgZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
