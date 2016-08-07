System.register(['../Subscriber', '../util/ArgumentOutOfRangeError'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1, ArgumentOutOfRangeError_1;
    var ElementAtOperator, ElementAtSubscriber;
    /**
     * Emits the single value at the specified `index` in a sequence of emissions
     * from the source Observable.
     *
     * <span class="informal">Emits only the i-th value, then completes.</span>
     *
     * <img src="./img/elementAt.png" width="100%">
     *
     * `elementAt` returns an Observable that emits the item at the specified
     * `index` in the source Observable, or a default value if that `index` is out
     * of range and the `default` argument is provided. If the `default` argument is
     * not given and the `index` is out of range, the output Observable will emit an
     * `ArgumentOutOfRangeError` error.
     *
     * @example <caption>Emit only the third click event</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var result = clicks.elementAt(2);
     * result.subscribe(x => console.log(x));
     *
     * @see {@link first}
     * @see {@link last}
     * @see {@link skip}
     * @see {@link single}
     * @see {@link take}
     *
     * @throws {ArgumentOutOfRangeError} When using `elementAt(i)`, it delivers an
     * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0` or the
     * Observable has completed before emitting the i-th `next` notification.
     *
     * @param {number} index Is the number `i` for the i-th source emission that has
     * happened since the subscription, starting from the number `0`.
     * @param {T} [defaultValue] The default value returned for missing indices.
     * @return {Observable} An Observable that emits a single item, if it is found.
     * Otherwise, will emit the default value if given. If not, then emits an error.
     * @method elementAt
     * @owner Observable
     */
    function elementAt(index, defaultValue) {
        return this.lift(new ElementAtOperator(index, defaultValue));
    }
    exports_1("elementAt", elementAt);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (ArgumentOutOfRangeError_1_1) {
                ArgumentOutOfRangeError_1 = ArgumentOutOfRangeError_1_1;
            }],
        execute: function() {
            ElementAtOperator = (function () {
                function ElementAtOperator(index, defaultValue) {
                    this.index = index;
                    this.defaultValue = defaultValue;
                    if (index < 0) {
                        throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
                    }
                }
                ElementAtOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new ElementAtSubscriber(subscriber, this.index, this.defaultValue));
                };
                return ElementAtOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            ElementAtSubscriber = (function (_super) {
                __extends(ElementAtSubscriber, _super);
                function ElementAtSubscriber(destination, index, defaultValue) {
                    _super.call(this, destination);
                    this.index = index;
                    this.defaultValue = defaultValue;
                }
                ElementAtSubscriber.prototype._next = function (x) {
                    if (this.index-- === 0) {
                        this.destination.next(x);
                        this.destination.complete();
                    }
                };
                ElementAtSubscriber.prototype._complete = function () {
                    var destination = this.destination;
                    if (this.index >= 0) {
                        if (typeof this.defaultValue !== 'undefined') {
                            destination.next(this.defaultValue);
                        }
                        else {
                            destination.error(new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError);
                        }
                    }
                    destination.complete();
                };
                return ElementAtSubscriber;
            }(Subscriber_1.Subscriber));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL2VsZW1lbnRBdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBS0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW9DRztJQUNILG1CQUE2QixLQUFhLEVBQUUsWUFBZ0I7UUFDMUQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRkQsaUNBRUMsQ0FBQTs7Ozs7Ozs7OztZQU1EO2dCQUVFLDJCQUFvQixLQUFhLEVBQVUsWUFBZ0I7b0JBQXZDLFVBQUssR0FBTCxLQUFLLENBQVE7b0JBQVUsaUJBQVksR0FBWixZQUFZLENBQUk7b0JBQ3pELEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNkLE1BQU0sSUFBSSxpREFBdUIsQ0FBQztvQkFDcEMsQ0FBQztnQkFDSCxDQUFDO2dCQUVELGdDQUFJLEdBQUosVUFBSyxVQUF5QixFQUFFLE1BQVc7b0JBQ3pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksbUJBQW1CLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQy9GLENBQUM7Z0JBQ0gsd0JBQUM7WUFBRCxDQVhBLEFBV0MsSUFBQTtZQUVEOzs7O2VBSUc7WUFDSDtnQkFBcUMsdUNBQWE7Z0JBRWhELDZCQUFZLFdBQTBCLEVBQVUsS0FBYSxFQUFVLFlBQWdCO29CQUNyRixrQkFBTSxXQUFXLENBQUMsQ0FBQztvQkFEMkIsVUFBSyxHQUFMLEtBQUssQ0FBUTtvQkFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBSTtnQkFFdkYsQ0FBQztnQkFFUyxtQ0FBSyxHQUFmLFVBQWdCLENBQUk7b0JBQ2xCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDOUIsQ0FBQztnQkFDSCxDQUFDO2dCQUVTLHVDQUFTLEdBQW5CO29CQUNFLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7b0JBQ3JDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDcEIsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsWUFBWSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7NEJBQzdDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO3dCQUN0QyxDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxpREFBdUIsQ0FBQyxDQUFDO3dCQUNqRCxDQUFDO29CQUNILENBQUM7b0JBQ0QsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUN6QixDQUFDO2dCQUNILDBCQUFDO1lBQUQsQ0F4QkEsQUF3QkMsQ0F4Qm9DLHVCQUFVLEdBd0I5QyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9yeGpzL3NyYy9vcGVyYXRvci9lbGVtZW50QXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09wZXJhdG9yfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQge1N1YnNjcmliZXJ9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHtBcmd1bWVudE91dE9mUmFuZ2VFcnJvcn0gZnJvbSAnLi4vdXRpbC9Bcmd1bWVudE91dE9mUmFuZ2VFcnJvcic7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJy4uL09ic2VydmFibGUnO1xuXG4vKipcbiAqIEVtaXRzIHRoZSBzaW5nbGUgdmFsdWUgYXQgdGhlIHNwZWNpZmllZCBgaW5kZXhgIGluIGEgc2VxdWVuY2Ugb2YgZW1pc3Npb25zXG4gKiBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+RW1pdHMgb25seSB0aGUgaS10aCB2YWx1ZSwgdGhlbiBjb21wbGV0ZXMuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvZWxlbWVudEF0LnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGBlbGVtZW50QXRgIHJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHRoZSBpdGVtIGF0IHRoZSBzcGVjaWZpZWRcbiAqIGBpbmRleGAgaW4gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCBvciBhIGRlZmF1bHQgdmFsdWUgaWYgdGhhdCBgaW5kZXhgIGlzIG91dFxuICogb2YgcmFuZ2UgYW5kIHRoZSBgZGVmYXVsdGAgYXJndW1lbnQgaXMgcHJvdmlkZWQuIElmIHRoZSBgZGVmYXVsdGAgYXJndW1lbnQgaXNcbiAqIG5vdCBnaXZlbiBhbmQgdGhlIGBpbmRleGAgaXMgb3V0IG9mIHJhbmdlLCB0aGUgb3V0cHV0IE9ic2VydmFibGUgd2lsbCBlbWl0IGFuXG4gKiBgQXJndW1lbnRPdXRPZlJhbmdlRXJyb3JgIGVycm9yLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkVtaXQgb25seSB0aGUgdGhpcmQgY2xpY2sgZXZlbnQ8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHJlc3VsdCA9IGNsaWNrcy5lbGVtZW50QXQoMik7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGZpcnN0fVxuICogQHNlZSB7QGxpbmsgbGFzdH1cbiAqIEBzZWUge0BsaW5rIHNraXB9XG4gKiBAc2VlIHtAbGluayBzaW5nbGV9XG4gKiBAc2VlIHtAbGluayB0YWtlfVxuICpcbiAqIEB0aHJvd3Mge0FyZ3VtZW50T3V0T2ZSYW5nZUVycm9yfSBXaGVuIHVzaW5nIGBlbGVtZW50QXQoaSlgLCBpdCBkZWxpdmVycyBhblxuICogQXJndW1lbnRPdXRPclJhbmdlRXJyb3IgdG8gdGhlIE9ic2VydmVyJ3MgYGVycm9yYCBjYWxsYmFjayBpZiBgaSA8IDBgIG9yIHRoZVxuICogT2JzZXJ2YWJsZSBoYXMgY29tcGxldGVkIGJlZm9yZSBlbWl0dGluZyB0aGUgaS10aCBgbmV4dGAgbm90aWZpY2F0aW9uLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBJcyB0aGUgbnVtYmVyIGBpYCBmb3IgdGhlIGktdGggc291cmNlIGVtaXNzaW9uIHRoYXQgaGFzXG4gKiBoYXBwZW5lZCBzaW5jZSB0aGUgc3Vic2NyaXB0aW9uLCBzdGFydGluZyBmcm9tIHRoZSBudW1iZXIgYDBgLlxuICogQHBhcmFtIHtUfSBbZGVmYXVsdFZhbHVlXSBUaGUgZGVmYXVsdCB2YWx1ZSByZXR1cm5lZCBmb3IgbWlzc2luZyBpbmRpY2VzLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGEgc2luZ2xlIGl0ZW0sIGlmIGl0IGlzIGZvdW5kLlxuICogT3RoZXJ3aXNlLCB3aWxsIGVtaXQgdGhlIGRlZmF1bHQgdmFsdWUgaWYgZ2l2ZW4uIElmIG5vdCwgdGhlbiBlbWl0cyBhbiBlcnJvci5cbiAqIEBtZXRob2QgZWxlbWVudEF0XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZWxlbWVudEF0PFQ+KGluZGV4OiBudW1iZXIsIGRlZmF1bHRWYWx1ZT86IFQpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgRWxlbWVudEF0T3BlcmF0b3IoaW5kZXgsIGRlZmF1bHRWYWx1ZSkpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVsZW1lbnRBdFNpZ25hdHVyZTxUPiB7XG4gIChpbmRleDogbnVtYmVyLCBkZWZhdWx0VmFsdWU/OiBUKTogT2JzZXJ2YWJsZTxUPjtcbn1cblxuY2xhc3MgRWxlbWVudEF0T3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUPiB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpbmRleDogbnVtYmVyLCBwcml2YXRlIGRlZmF1bHRWYWx1ZT86IFQpIHtcbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXJyb3I7XG4gICAgfVxuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+LCBzb3VyY2U6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHNvdXJjZS5fc3Vic2NyaWJlKG5ldyBFbGVtZW50QXRTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMuaW5kZXgsIHRoaXMuZGVmYXVsdFZhbHVlKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIEVsZW1lbnRBdFN1YnNjcmliZXI8VD4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxUPiwgcHJpdmF0ZSBpbmRleDogbnVtYmVyLCBwcml2YXRlIGRlZmF1bHRWYWx1ZT86IFQpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQoeDogVCkge1xuICAgIGlmICh0aGlzLmluZGV4LS0gPT09IDApIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dCh4KTtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NvbXBsZXRlKCkge1xuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gdGhpcy5kZXN0aW5hdGlvbjtcbiAgICBpZiAodGhpcy5pbmRleCA+PSAwKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuZGVmYXVsdFZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBkZXN0aW5hdGlvbi5uZXh0KHRoaXMuZGVmYXVsdFZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlc3RpbmF0aW9uLmVycm9yKG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFcnJvcik7XG4gICAgICB9XG4gICAgfVxuICAgIGRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
