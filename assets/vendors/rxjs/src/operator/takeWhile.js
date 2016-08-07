System.register(['../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1;
    var TakeWhileOperator, TakeWhileSubscriber;
    /**
     * Emits values emitted by the source Observable so long as each value satisfies
     * the given `predicate`, and then completes as soon as this `predicate` is not
     * satisfied.
     *
     * <span class="informal">Takes values from the source only while they pass the
     * condition given. When the first value does not satisfy, it completes.</span>
     *
     * <img src="./img/takeWhile.png" width="100%">
     *
     * `takeWhile` subscribes and begins mirroring the source Observable. Each value
     * emitted on the source is given to the `predicate` function which returns a
     * boolean, representing a condition to be satisfied by the source values. The
     * output Observable emits the source values until such time as the `predicate`
     * returns false, at which point `takeWhile` stops mirroring the source
     * Observable and completes the output Observable.
     *
     * @example <caption>Emit click events only while the clientX property is greater than 200</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var result = clicks.takeWhile(ev => ev.clientX > 200);
     * result.subscribe(x => console.log(x));
     *
     * @see {@link take}
     * @see {@link takeLast}
     * @see {@link takeUntil}
     * @see {@link skip}
     *
     * @param {function(value: T, index: number): boolean} predicate A function that
     * evaluates a value emitted by the source Observable and returns a boolean.
     * Also takes the (zero-based) index as the second argument.
     * @return {Observable<T>} An Observable that emits the values from the source
     * Observable so long as each value satisfies the condition defined by the
     * `predicate`, then completes.
     * @method takeWhile
     * @owner Observable
     */
    function takeWhile(predicate) {
        return this.lift(new TakeWhileOperator(predicate));
    }
    exports_1("takeWhile", takeWhile);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            TakeWhileOperator = (function () {
                function TakeWhileOperator(predicate) {
                    this.predicate = predicate;
                }
                TakeWhileOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new TakeWhileSubscriber(subscriber, this.predicate));
                };
                return TakeWhileOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            TakeWhileSubscriber = (function (_super) {
                __extends(TakeWhileSubscriber, _super);
                function TakeWhileSubscriber(destination, predicate) {
                    _super.call(this, destination);
                    this.predicate = predicate;
                    this.index = 0;
                }
                TakeWhileSubscriber.prototype._next = function (value) {
                    var destination = this.destination;
                    var result;
                    try {
                        result = this.predicate(value, this.index++);
                    }
                    catch (err) {
                        destination.error(err);
                        return;
                    }
                    this.nextOrComplete(value, result);
                };
                TakeWhileSubscriber.prototype.nextOrComplete = function (value, predicateResult) {
                    var destination = this.destination;
                    if (Boolean(predicateResult)) {
                        destination.next(value);
                    }
                    else {
                        destination.complete();
                    }
                };
                return TakeWhileSubscriber;
            }(Subscriber_1.Subscriber));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL3Rha2VXaGlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BbUNHO0lBQ0gsbUJBQTZCLFNBQStDO1FBQzFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRkQsaUNBRUMsQ0FBQTs7Ozs7OztZQU1EO2dCQUNFLDJCQUFvQixTQUErQztvQkFBL0MsY0FBUyxHQUFULFNBQVMsQ0FBc0M7Z0JBQ25FLENBQUM7Z0JBRUQsZ0NBQUksR0FBSixVQUFLLFVBQXlCLEVBQUUsTUFBVztvQkFDekMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hGLENBQUM7Z0JBQ0gsd0JBQUM7WUFBRCxDQVBBLEFBT0MsSUFBQTtZQUVEOzs7O2VBSUc7WUFDSDtnQkFBcUMsdUNBQWE7Z0JBR2hELDZCQUFZLFdBQTBCLEVBQ2xCLFNBQStDO29CQUNqRSxrQkFBTSxXQUFXLENBQUMsQ0FBQztvQkFERCxjQUFTLEdBQVQsU0FBUyxDQUFzQztvQkFIM0QsVUFBSyxHQUFXLENBQUMsQ0FBQztnQkFLMUIsQ0FBQztnQkFFUyxtQ0FBSyxHQUFmLFVBQWdCLEtBQVE7b0JBQ3RCLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7b0JBQ3JDLElBQUksTUFBZSxDQUFDO29CQUNwQixJQUFJLENBQUM7d0JBQ0gsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO29CQUMvQyxDQUFFO29CQUFBLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ2IsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDdkIsTUFBTSxDQUFDO29CQUNULENBQUM7b0JBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ3JDLENBQUM7Z0JBRU8sNENBQWMsR0FBdEIsVUFBdUIsS0FBUSxFQUFFLGVBQXdCO29CQUN2RCxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO29CQUNyQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM3QixXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMxQixDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDekIsQ0FBQztnQkFDSCxDQUFDO2dCQUNILDBCQUFDO1lBQUQsQ0E1QkEsQUE0QkMsQ0E1Qm9DLHVCQUFVLEdBNEI5QyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9yeGpzL3NyYy9vcGVyYXRvci90YWtlV2hpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09wZXJhdG9yfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHtTdWJzY3JpYmVyfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcblxuLyoqXG4gKiBFbWl0cyB2YWx1ZXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUgc28gbG9uZyBhcyBlYWNoIHZhbHVlIHNhdGlzZmllc1xuICogdGhlIGdpdmVuIGBwcmVkaWNhdGVgLCBhbmQgdGhlbiBjb21wbGV0ZXMgYXMgc29vbiBhcyB0aGlzIGBwcmVkaWNhdGVgIGlzIG5vdFxuICogc2F0aXNmaWVkLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5UYWtlcyB2YWx1ZXMgZnJvbSB0aGUgc291cmNlIG9ubHkgd2hpbGUgdGhleSBwYXNzIHRoZVxuICogY29uZGl0aW9uIGdpdmVuLiBXaGVuIHRoZSBmaXJzdCB2YWx1ZSBkb2VzIG5vdCBzYXRpc2Z5LCBpdCBjb21wbGV0ZXMuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvdGFrZVdoaWxlLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGB0YWtlV2hpbGVgIHN1YnNjcmliZXMgYW5kIGJlZ2lucyBtaXJyb3JpbmcgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLiBFYWNoIHZhbHVlXG4gKiBlbWl0dGVkIG9uIHRoZSBzb3VyY2UgaXMgZ2l2ZW4gdG8gdGhlIGBwcmVkaWNhdGVgIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYVxuICogYm9vbGVhbiwgcmVwcmVzZW50aW5nIGEgY29uZGl0aW9uIHRvIGJlIHNhdGlzZmllZCBieSB0aGUgc291cmNlIHZhbHVlcy4gVGhlXG4gKiBvdXRwdXQgT2JzZXJ2YWJsZSBlbWl0cyB0aGUgc291cmNlIHZhbHVlcyB1bnRpbCBzdWNoIHRpbWUgYXMgdGhlIGBwcmVkaWNhdGVgXG4gKiByZXR1cm5zIGZhbHNlLCBhdCB3aGljaCBwb2ludCBgdGFrZVdoaWxlYCBzdG9wcyBtaXJyb3JpbmcgdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZSBhbmQgY29tcGxldGVzIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZS5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0IGNsaWNrIGV2ZW50cyBvbmx5IHdoaWxlIHRoZSBjbGllbnRYIHByb3BlcnR5IGlzIGdyZWF0ZXIgdGhhbiAyMDA8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHJlc3VsdCA9IGNsaWNrcy50YWtlV2hpbGUoZXYgPT4gZXYuY2xpZW50WCA+IDIwMCk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIHRha2V9XG4gKiBAc2VlIHtAbGluayB0YWtlTGFzdH1cbiAqIEBzZWUge0BsaW5rIHRha2VVbnRpbH1cbiAqIEBzZWUge0BsaW5rIHNraXB9XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbih2YWx1ZTogVCwgaW5kZXg6IG51bWJlcik6IGJvb2xlYW59IHByZWRpY2F0ZSBBIGZ1bmN0aW9uIHRoYXRcbiAqIGV2YWx1YXRlcyBhIHZhbHVlIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGFuZCByZXR1cm5zIGEgYm9vbGVhbi5cbiAqIEFsc28gdGFrZXMgdGhlICh6ZXJvLWJhc2VkKSBpbmRleCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50LlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHRoZSB2YWx1ZXMgZnJvbSB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlIHNvIGxvbmcgYXMgZWFjaCB2YWx1ZSBzYXRpc2ZpZXMgdGhlIGNvbmRpdGlvbiBkZWZpbmVkIGJ5IHRoZVxuICogYHByZWRpY2F0ZWAsIHRoZW4gY29tcGxldGVzLlxuICogQG1ldGhvZCB0YWtlV2hpbGVcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0YWtlV2hpbGU8VD4ocHJlZGljYXRlOiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIpID0+IGJvb2xlYW4pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgVGFrZVdoaWxlT3BlcmF0b3IocHJlZGljYXRlKSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGFrZVdoaWxlU2lnbmF0dXJlPFQ+IHtcbiAgKHByZWRpY2F0ZTogKHZhbHVlOiBULCBpbmRleDogbnVtYmVyKSA9PiBib29sZWFuKTogT2JzZXJ2YWJsZTxUPjtcbn1cblxuY2xhc3MgVGFrZVdoaWxlT3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcHJlZGljYXRlOiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIpID0+IGJvb2xlYW4pIHtcbiAgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPiwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2UuX3N1YnNjcmliZShuZXcgVGFrZVdoaWxlU3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLnByZWRpY2F0ZSkpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBUYWtlV2hpbGVTdWJzY3JpYmVyPFQ+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG4gIHByaXZhdGUgaW5kZXg6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgcHJlZGljYXRlOiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIpID0+IGJvb2xlYW4pIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IFQpOiB2b2lkIHtcbiAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHRoaXMuZGVzdGluYXRpb247XG4gICAgbGV0IHJlc3VsdDogYm9vbGVhbjtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5wcmVkaWNhdGUodmFsdWUsIHRoaXMuaW5kZXgrKyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBkZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm5leHRPckNvbXBsZXRlKHZhbHVlLCByZXN1bHQpO1xuICB9XG5cbiAgcHJpdmF0ZSBuZXh0T3JDb21wbGV0ZSh2YWx1ZTogVCwgcHJlZGljYXRlUmVzdWx0OiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgZGVzdGluYXRpb24gPSB0aGlzLmRlc3RpbmF0aW9uO1xuICAgIGlmIChCb29sZWFuKHByZWRpY2F0ZVJlc3VsdCkpIHtcbiAgICAgIGRlc3RpbmF0aW9uLm5leHQodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
