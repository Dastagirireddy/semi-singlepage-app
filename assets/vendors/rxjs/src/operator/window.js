System.register(['../Subject', '../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subject_1, OuterSubscriber_1, subscribeToResult_1;
    var WindowOperator, WindowSubscriber;
    /**
     * Branch out the source Observable values as a nested Observable whenever
     * `windowBoundaries` emits.
     *
     * <span class="informal">It's like {@link buffer}, but emits a nested Observable
     * instead of an array.</span>
     *
     * <img src="./img/window.png" width="100%">
     *
     * Returns an Observable that emits windows of items it collects from the source
     * Observable. The output Observable emits connected, non-overlapping
     * windows. It emits the current window and opens a new one whenever the
     * Observable `windowBoundaries` emits an item. Because each window is an
     * Observable, the output is a higher-order Observable.
     *
     * @example <caption>In every window of 1 second each, emit at most 2 click events</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var interval = Rx.Observable.interval(1000);
     * var result = clicks.window(interval)
     *   .map(win => win.take(2)) // each window has at most 2 emissions
     *   .mergeAll(); // flatten the Observable-of-Observables
     * result.subscribe(x => console.log(x));
     *
     * @see {@link windowCount}
     * @see {@link windowTime}
     * @see {@link windowToggle}
     * @see {@link windowWhen}
     * @see {@link buffer}
     *
     * @param {Observable<any>} windowBoundaries An Observable that completes the
     * previous window and starts a new window.
     * @return {Observable<Observable<T>>} An Observable of windows, which are
     * Observables emitting values of the source Observable.
     * @method window
     * @owner Observable
     */
    function window(windowBoundaries) {
        return this.lift(new WindowOperator(windowBoundaries));
    }
    exports_1("window", window);
    return {
        setters:[
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            WindowOperator = (function () {
                function WindowOperator(windowBoundaries) {
                    this.windowBoundaries = windowBoundaries;
                }
                WindowOperator.prototype.call = function (subscriber, source) {
                    var windowSubscriber = new WindowSubscriber(subscriber);
                    var sourceSubscription = source._subscribe(windowSubscriber);
                    if (!sourceSubscription.isUnsubscribed) {
                        windowSubscriber.add(subscribeToResult_1.subscribeToResult(windowSubscriber, this.windowBoundaries));
                    }
                    return sourceSubscription;
                };
                return WindowOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            WindowSubscriber = (function (_super) {
                __extends(WindowSubscriber, _super);
                function WindowSubscriber(destination) {
                    _super.call(this, destination);
                    this.window = new Subject_1.Subject();
                    destination.next(this.window);
                }
                WindowSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.openWindow();
                };
                WindowSubscriber.prototype.notifyError = function (error, innerSub) {
                    this._error(error);
                };
                WindowSubscriber.prototype.notifyComplete = function (innerSub) {
                    this._complete();
                };
                WindowSubscriber.prototype._next = function (value) {
                    this.window.next(value);
                };
                WindowSubscriber.prototype._error = function (err) {
                    this.window.error(err);
                    this.destination.error(err);
                };
                WindowSubscriber.prototype._complete = function () {
                    this.window.complete();
                    this.destination.complete();
                };
                WindowSubscriber.prototype._unsubscribe = function () {
                    this.window = null;
                };
                WindowSubscriber.prototype.openWindow = function () {
                    var prevWindow = this.window;
                    if (prevWindow) {
                        prevWindow.complete();
                    }
                    var destination = this.destination;
                    var newWindow = this.window = new Subject_1.Subject();
                    destination.next(newWindow);
                };
                return WindowSubscriber;
            }(OuterSubscriber_1.OuterSubscriber));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL3dpbmRvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBU0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BbUNHO0lBQ0gsZ0JBQTBCLGdCQUFpQztRQUN6RCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGNBQWMsQ0FBSSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUZELDJCQUVDLENBQUE7Ozs7Ozs7Ozs7Ozs7WUFNRDtnQkFFRSx3QkFBb0IsZ0JBQWlDO29CQUFqQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO2dCQUNyRCxDQUFDO2dCQUVELDZCQUFJLEdBQUosVUFBSyxVQUFxQyxFQUFFLE1BQVc7b0JBQ3JELElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDMUQsSUFBTSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7b0JBQy9ELEVBQUUsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQzt3QkFDdkMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLHFDQUFpQixDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7b0JBQ25GLENBQUM7b0JBQ0QsTUFBTSxDQUFDLGtCQUFrQixDQUFDO2dCQUM1QixDQUFDO2dCQUNILHFCQUFDO1lBQUQsQ0FiQSxBQWFDLElBQUE7WUFFRDs7OztlQUlHO1lBQ0g7Z0JBQWtDLG9DQUF1QjtnQkFJdkQsMEJBQVksV0FBc0M7b0JBQ2hELGtCQUFNLFdBQVcsQ0FBQyxDQUFDO29CQUhiLFdBQU0sR0FBZSxJQUFJLGlCQUFPLEVBQUssQ0FBQztvQkFJNUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2hDLENBQUM7Z0JBRUQscUNBQVUsR0FBVixVQUFXLFVBQWEsRUFBRSxVQUFlLEVBQzlCLFVBQWtCLEVBQUUsVUFBa0IsRUFDdEMsUUFBaUM7b0JBQzFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDcEIsQ0FBQztnQkFFRCxzQ0FBVyxHQUFYLFVBQVksS0FBVSxFQUFFLFFBQWlDO29CQUN2RCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNyQixDQUFDO2dCQUVELHlDQUFjLEdBQWQsVUFBZSxRQUFpQztvQkFDOUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNuQixDQUFDO2dCQUVTLGdDQUFLLEdBQWYsVUFBZ0IsS0FBUTtvQkFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzFCLENBQUM7Z0JBRVMsaUNBQU0sR0FBaEIsVUFBaUIsR0FBUTtvQkFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM5QixDQUFDO2dCQUVTLG9DQUFTLEdBQW5CO29CQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQzlCLENBQUM7Z0JBRVMsdUNBQVksR0FBdEI7b0JBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLENBQUM7Z0JBRU8scUNBQVUsR0FBbEI7b0JBQ0UsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztvQkFDL0IsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzt3QkFDZixVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ3hCLENBQUM7b0JBQ0QsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztvQkFDckMsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGlCQUFPLEVBQUssQ0FBQztvQkFDakQsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDOUIsQ0FBQztnQkFDSCx1QkFBQztZQUFELENBbERBLEFBa0RDLENBbERpQyxpQ0FBZSxHQWtEaEQiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvcnhqcy9zcmMvb3BlcmF0b3Ivd2luZG93LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPcGVyYXRvcn0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHtTdWJzY3JpYmVyfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJy4uL1N1YmplY3QnO1xuXG5pbXBvcnQge091dGVyU3Vic2NyaWJlcn0gZnJvbSAnLi4vT3V0ZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7SW5uZXJTdWJzY3JpYmVyfSBmcm9tICcuLi9Jbm5lclN1YnNjcmliZXInO1xuaW1wb3J0IHtzdWJzY3JpYmVUb1Jlc3VsdH0gZnJvbSAnLi4vdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdCc7XG5cbi8qKlxuICogQnJhbmNoIG91dCB0aGUgc291cmNlIE9ic2VydmFibGUgdmFsdWVzIGFzIGEgbmVzdGVkIE9ic2VydmFibGUgd2hlbmV2ZXJcbiAqIGB3aW5kb3dCb3VuZGFyaWVzYCBlbWl0cy5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+SXQncyBsaWtlIHtAbGluayBidWZmZXJ9LCBidXQgZW1pdHMgYSBuZXN0ZWQgT2JzZXJ2YWJsZVxuICogaW5zdGVhZCBvZiBhbiBhcnJheS48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy93aW5kb3cucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgd2luZG93cyBvZiBpdGVtcyBpdCBjb2xsZWN0cyBmcm9tIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUuIFRoZSBvdXRwdXQgT2JzZXJ2YWJsZSBlbWl0cyBjb25uZWN0ZWQsIG5vbi1vdmVybGFwcGluZ1xuICogd2luZG93cy4gSXQgZW1pdHMgdGhlIGN1cnJlbnQgd2luZG93IGFuZCBvcGVucyBhIG5ldyBvbmUgd2hlbmV2ZXIgdGhlXG4gKiBPYnNlcnZhYmxlIGB3aW5kb3dCb3VuZGFyaWVzYCBlbWl0cyBhbiBpdGVtLiBCZWNhdXNlIGVhY2ggd2luZG93IGlzIGFuXG4gKiBPYnNlcnZhYmxlLCB0aGUgb3V0cHV0IGlzIGEgaGlnaGVyLW9yZGVyIE9ic2VydmFibGUuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+SW4gZXZlcnkgd2luZG93IG9mIDEgc2Vjb25kIGVhY2gsIGVtaXQgYXQgbW9zdCAyIGNsaWNrIGV2ZW50czwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgaW50ZXJ2YWwgPSBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApO1xuICogdmFyIHJlc3VsdCA9IGNsaWNrcy53aW5kb3coaW50ZXJ2YWwpXG4gKiAgIC5tYXAod2luID0+IHdpbi50YWtlKDIpKSAvLyBlYWNoIHdpbmRvdyBoYXMgYXQgbW9zdCAyIGVtaXNzaW9uc1xuICogICAubWVyZ2VBbGwoKTsgLy8gZmxhdHRlbiB0aGUgT2JzZXJ2YWJsZS1vZi1PYnNlcnZhYmxlc1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayB3aW5kb3dDb3VudH1cbiAqIEBzZWUge0BsaW5rIHdpbmRvd1RpbWV9XG4gKiBAc2VlIHtAbGluayB3aW5kb3dUb2dnbGV9XG4gKiBAc2VlIHtAbGluayB3aW5kb3dXaGVufVxuICogQHNlZSB7QGxpbmsgYnVmZmVyfVxuICpcbiAqIEBwYXJhbSB7T2JzZXJ2YWJsZTxhbnk+fSB3aW5kb3dCb3VuZGFyaWVzIEFuIE9ic2VydmFibGUgdGhhdCBjb21wbGV0ZXMgdGhlXG4gKiBwcmV2aW91cyB3aW5kb3cgYW5kIHN0YXJ0cyBhIG5ldyB3aW5kb3cuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPE9ic2VydmFibGU8VD4+fSBBbiBPYnNlcnZhYmxlIG9mIHdpbmRvd3MsIHdoaWNoIGFyZVxuICogT2JzZXJ2YWJsZXMgZW1pdHRpbmcgdmFsdWVzIG9mIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqIEBtZXRob2Qgd2luZG93XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gd2luZG93PFQ+KHdpbmRvd0JvdW5kYXJpZXM6IE9ic2VydmFibGU8YW55Pik6IE9ic2VydmFibGU8T2JzZXJ2YWJsZTxUPj4ge1xuICByZXR1cm4gdGhpcy5saWZ0KG5ldyBXaW5kb3dPcGVyYXRvcjxUPih3aW5kb3dCb3VuZGFyaWVzKSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2luZG93U2lnbmF0dXJlPFQ+IHtcbiAgKHdpbmRvd0JvdW5kYXJpZXM6IE9ic2VydmFibGU8YW55Pik6IE9ic2VydmFibGU8T2JzZXJ2YWJsZTxUPj47XG59XG5cbmNsYXNzIFdpbmRvd09wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgT2JzZXJ2YWJsZTxUPj4ge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgd2luZG93Qm91bmRhcmllczogT2JzZXJ2YWJsZTxhbnk+KSB7XG4gIH1cblxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8T2JzZXJ2YWJsZTxUPj4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICBjb25zdCB3aW5kb3dTdWJzY3JpYmVyID0gbmV3IFdpbmRvd1N1YnNjcmliZXIoc3Vic2NyaWJlcik7XG4gICAgY29uc3Qgc291cmNlU3Vic2NyaXB0aW9uID0gc291cmNlLl9zdWJzY3JpYmUod2luZG93U3Vic2NyaWJlcik7XG4gICAgaWYgKCFzb3VyY2VTdWJzY3JpcHRpb24uaXNVbnN1YnNjcmliZWQpIHtcbiAgICAgIHdpbmRvd1N1YnNjcmliZXIuYWRkKHN1YnNjcmliZVRvUmVzdWx0KHdpbmRvd1N1YnNjcmliZXIsIHRoaXMud2luZG93Qm91bmRhcmllcykpO1xuICAgIH1cbiAgICByZXR1cm4gc291cmNlU3Vic2NyaXB0aW9uO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBXaW5kb3dTdWJzY3JpYmVyPFQ+IGV4dGVuZHMgT3V0ZXJTdWJzY3JpYmVyPFQsIGFueT4ge1xuXG4gIHByaXZhdGUgd2luZG93OiBTdWJqZWN0PFQ+ID0gbmV3IFN1YmplY3Q8VD4oKTtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxPYnNlcnZhYmxlPFQ+Pikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgICBkZXN0aW5hdGlvbi5uZXh0KHRoaXMud2luZG93KTtcbiAgfVxuXG4gIG5vdGlmeU5leHQob3V0ZXJWYWx1ZTogVCwgaW5uZXJWYWx1ZTogYW55LFxuICAgICAgICAgICAgIG91dGVySW5kZXg6IG51bWJlciwgaW5uZXJJbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgIGlubmVyU3ViOiBJbm5lclN1YnNjcmliZXI8VCwgYW55Pik6IHZvaWQge1xuICAgIHRoaXMub3BlbldpbmRvdygpO1xuICB9XG5cbiAgbm90aWZ5RXJyb3IoZXJyb3I6IGFueSwgaW5uZXJTdWI6IElubmVyU3Vic2NyaWJlcjxULCBhbnk+KTogdm9pZCB7XG4gICAgdGhpcy5fZXJyb3IoZXJyb3IpO1xuICB9XG5cbiAgbm90aWZ5Q29tcGxldGUoaW5uZXJTdWI6IElubmVyU3Vic2NyaWJlcjxULCBhbnk+KTogdm9pZCB7XG4gICAgdGhpcy5fY29tcGxldGUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIHRoaXMud2luZG93Lm5leHQodmFsdWUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9lcnJvcihlcnI6IGFueSk6IHZvaWQge1xuICAgIHRoaXMud2luZG93LmVycm9yKGVycik7XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLndpbmRvdy5jb21wbGV0ZSgpO1xuICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfdW5zdWJzY3JpYmUoKSB7XG4gICAgdGhpcy53aW5kb3cgPSBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBvcGVuV2luZG93KCk6IHZvaWQgIHtcbiAgICBjb25zdCBwcmV2V2luZG93ID0gdGhpcy53aW5kb3c7XG4gICAgaWYgKHByZXZXaW5kb3cpIHtcbiAgICAgIHByZXZXaW5kb3cuY29tcGxldGUoKTtcbiAgICB9XG4gICAgY29uc3QgZGVzdGluYXRpb24gPSB0aGlzLmRlc3RpbmF0aW9uO1xuICAgIGNvbnN0IG5ld1dpbmRvdyA9IHRoaXMud2luZG93ID0gbmV3IFN1YmplY3Q8VD4oKTtcbiAgICBkZXN0aW5hdGlvbi5uZXh0KG5ld1dpbmRvdyk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
