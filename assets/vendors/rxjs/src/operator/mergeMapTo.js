System.register(['../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var OuterSubscriber_1, subscribeToResult_1;
    var MergeMapToOperator, MergeMapToSubscriber;
    /**
     * Projects each source value to the same Observable which is merged multiple
     * times in the output Observable.
     *
     * <span class="informal">It's like {@link mergeMap}, but maps each value always
     * to the same inner Observable.</span>
     *
     * <img src="./img/mergeMapTo.png" width="100%">
     *
     * Maps each source value to the given Observable `innerObservable` regardless
     * of the source value, and then merges those resulting Observables into one
     * single Observable, which is the output Observable.
     *
     * @example <caption>For each click event, start an interval Observable ticking every 1 second</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var result = clicks.mergeMapTo(Rx.Observable.interval(1000));
     * result.subscribe(x => console.log(x));
     *
     * @see {@link concatMapTo}
     * @see {@link merge}
     * @see {@link mergeAll}
     * @see {@link mergeMap}
     * @see {@link mergeScan}
     * @see {@link switchMapTo}
     *
     * @param {Observable} innerObservable An Observable to replace each value from
     * the source Observable.
     * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
     * A function to produce the value on the output Observable based on the values
     * and the indices of the source (outer) emission and the inner Observable
     * emission. The arguments passed to this function are:
     * - `outerValue`: the value that came from the source
     * - `innerValue`: the value that came from the projected Observable
     * - `outerIndex`: the "index" of the value that came from the source
     * - `innerIndex`: the "index" of the value from the projected Observable
     * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
     * Observables being subscribed to concurrently.
     * @return {Observable} An Observable that emits items from the given
     * `innerObservable` (and optionally transformed through `resultSelector`) every
     * time a value is emitted on the source Observable.
     * @method mergeMapTo
     * @owner Observable
     */
    function mergeMapTo(innerObservable, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        if (typeof resultSelector === 'number') {
            concurrent = resultSelector;
            resultSelector = null;
        }
        return this.lift(new MergeMapToOperator(innerObservable, resultSelector, concurrent));
    }
    exports_1("mergeMapTo", mergeMapTo);
    return {
        setters:[
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            // TODO: Figure out correct signature here: an Operator<Observable<T>, R>
            //       needs to implement call(observer: Subscriber<R>): Subscriber<Observable<T>>
            MergeMapToOperator = (function () {
                function MergeMapToOperator(ish, resultSelector, concurrent) {
                    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
                    this.ish = ish;
                    this.resultSelector = resultSelector;
                    this.concurrent = concurrent;
                }
                MergeMapToOperator.prototype.call = function (observer, source) {
                    return source._subscribe(new MergeMapToSubscriber(observer, this.ish, this.resultSelector, this.concurrent));
                };
                return MergeMapToOperator;
            }());
            exports_1("MergeMapToOperator", MergeMapToOperator);
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            MergeMapToSubscriber = (function (_super) {
                __extends(MergeMapToSubscriber, _super);
                function MergeMapToSubscriber(destination, ish, resultSelector, concurrent) {
                    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
                    _super.call(this, destination);
                    this.ish = ish;
                    this.resultSelector = resultSelector;
                    this.concurrent = concurrent;
                    this.hasCompleted = false;
                    this.buffer = [];
                    this.active = 0;
                    this.index = 0;
                }
                MergeMapToSubscriber.prototype._next = function (value) {
                    if (this.active < this.concurrent) {
                        var resultSelector = this.resultSelector;
                        var index = this.index++;
                        var ish = this.ish;
                        var destination = this.destination;
                        this.active++;
                        this._innerSub(ish, destination, resultSelector, value, index);
                    }
                    else {
                        this.buffer.push(value);
                    }
                };
                MergeMapToSubscriber.prototype._innerSub = function (ish, destination, resultSelector, value, index) {
                    this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
                };
                MergeMapToSubscriber.prototype._complete = function () {
                    this.hasCompleted = true;
                    if (this.active === 0 && this.buffer.length === 0) {
                        this.destination.complete();
                    }
                };
                MergeMapToSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
                    if (resultSelector) {
                        this.trySelectResult(outerValue, innerValue, outerIndex, innerIndex);
                    }
                    else {
                        destination.next(innerValue);
                    }
                };
                MergeMapToSubscriber.prototype.trySelectResult = function (outerValue, innerValue, outerIndex, innerIndex) {
                    var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
                    var result;
                    try {
                        result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
                    }
                    catch (err) {
                        destination.error(err);
                        return;
                    }
                    destination.next(result);
                };
                MergeMapToSubscriber.prototype.notifyError = function (err) {
                    this.destination.error(err);
                };
                MergeMapToSubscriber.prototype.notifyComplete = function (innerSub) {
                    var buffer = this.buffer;
                    this.remove(innerSub);
                    this.active--;
                    if (buffer.length > 0) {
                        this._next(buffer.shift());
                    }
                    else if (this.active === 0 && this.hasCompleted) {
                        this.destination.complete();
                    }
                };
                return MergeMapToSubscriber;
            }(OuterSubscriber_1.OuterSubscriber));
            exports_1("MergeMapToSubscriber", MergeMapToSubscriber);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL21lcmdlTWFwVG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQVNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EwQ0c7SUFDSCxvQkFBb0MsZUFBOEIsRUFDOUIsY0FBdUcsRUFDdkcsVUFBNkM7UUFBN0MsMEJBQTZDLEdBQTdDLGFBQXFCLE1BQU0sQ0FBQyxpQkFBaUI7UUFDL0UsRUFBRSxDQUFDLENBQUMsT0FBTyxjQUFjLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN2QyxVQUFVLEdBQVcsY0FBYyxDQUFDO1lBQ3BDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDeEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksa0JBQWtCLENBQUMsZUFBZSxFQUFPLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQzdGLENBQUM7SUFSRCxtQ0FRQyxDQUFBOzs7Ozs7Ozs7O1lBU0QseUVBQXlFO1lBQ3pFLG9GQUFvRjtZQUNwRjtnQkFDRSw0QkFBb0IsR0FBdUIsRUFDdkIsY0FBNEYsRUFDNUYsVUFBNkM7b0JBQXJELDBCQUFxRCxHQUFyRCxhQUE2QixNQUFNLENBQUMsaUJBQWlCO29CQUY3QyxRQUFHLEdBQUgsR0FBRyxDQUFvQjtvQkFDdkIsbUJBQWMsR0FBZCxjQUFjLENBQThFO29CQUM1RixlQUFVLEdBQVYsVUFBVSxDQUFtQztnQkFDakUsQ0FBQztnQkFFRCxpQ0FBSSxHQUFKLFVBQUssUUFBdUIsRUFBRSxNQUFXO29CQUN2QyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQy9HLENBQUM7Z0JBQ0gseUJBQUM7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VUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztvQkFDMUUsQ0FBRTtvQkFBQSxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNiLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3ZCLE1BQU0sQ0FBQztvQkFDVCxDQUFDO29CQUVELFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzNCLENBQUM7Z0JBRUQsMENBQVcsR0FBWCxVQUFZLEdBQVE7b0JBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM5QixDQUFDO2dCQUVELDZDQUFjLEdBQWQsVUFBZSxRQUFzQjtvQkFDbkMsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztvQkFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDdEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNkLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFDN0IsQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7d0JBQ2xELElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQzlCLENBQUM7Z0JBQ0gsQ0FBQztnQkFDSCwyQkFBQztZQUFELENBakZBLEFBaUZDLENBakZrRCxpQ0FBZSxHQWlGakU7WUFqRkQsdURBaUZDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvcnhqcy9zcmMvb3BlcmF0b3IvbWVyZ2VNYXBUby5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T2JzZXJ2YWJsZSwgT2JzZXJ2YWJsZUlucHV0fSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7T3BlcmF0b3J9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7UGFydGlhbE9ic2VydmVyfSBmcm9tICcuLi9PYnNlcnZlcic7XG5pbXBvcnQge1N1YnNjcmliZXJ9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQge091dGVyU3Vic2NyaWJlcn0gZnJvbSAnLi4vT3V0ZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7SW5uZXJTdWJzY3JpYmVyfSBmcm9tICcuLi9Jbm5lclN1YnNjcmliZXInO1xuaW1wb3J0IHtzdWJzY3JpYmVUb1Jlc3VsdH0gZnJvbSAnLi4vdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdCc7XG5cbi8qKlxuICogUHJvamVjdHMgZWFjaCBzb3VyY2UgdmFsdWUgdG8gdGhlIHNhbWUgT2JzZXJ2YWJsZSB3aGljaCBpcyBtZXJnZWQgbXVsdGlwbGVcbiAqIHRpbWVzIGluIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+SXQncyBsaWtlIHtAbGluayBtZXJnZU1hcH0sIGJ1dCBtYXBzIGVhY2ggdmFsdWUgYWx3YXlzXG4gKiB0byB0aGUgc2FtZSBpbm5lciBPYnNlcnZhYmxlLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL21lcmdlTWFwVG8ucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogTWFwcyBlYWNoIHNvdXJjZSB2YWx1ZSB0byB0aGUgZ2l2ZW4gT2JzZXJ2YWJsZSBgaW5uZXJPYnNlcnZhYmxlYCByZWdhcmRsZXNzXG4gKiBvZiB0aGUgc291cmNlIHZhbHVlLCBhbmQgdGhlbiBtZXJnZXMgdGhvc2UgcmVzdWx0aW5nIE9ic2VydmFibGVzIGludG8gb25lXG4gKiBzaW5nbGUgT2JzZXJ2YWJsZSwgd2hpY2ggaXMgdGhlIG91dHB1dCBPYnNlcnZhYmxlLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkZvciBlYWNoIGNsaWNrIGV2ZW50LCBzdGFydCBhbiBpbnRlcnZhbCBPYnNlcnZhYmxlIHRpY2tpbmcgZXZlcnkgMSBzZWNvbmQ8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHJlc3VsdCA9IGNsaWNrcy5tZXJnZU1hcFRvKFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCkpO1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBjb25jYXRNYXBUb31cbiAqIEBzZWUge0BsaW5rIG1lcmdlfVxuICogQHNlZSB7QGxpbmsgbWVyZ2VBbGx9XG4gKiBAc2VlIHtAbGluayBtZXJnZU1hcH1cbiAqIEBzZWUge0BsaW5rIG1lcmdlU2Nhbn1cbiAqIEBzZWUge0BsaW5rIHN3aXRjaE1hcFRvfVxuICpcbiAqIEBwYXJhbSB7T2JzZXJ2YWJsZX0gaW5uZXJPYnNlcnZhYmxlIEFuIE9ic2VydmFibGUgdG8gcmVwbGFjZSBlYWNoIHZhbHVlIGZyb21cbiAqIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24ob3V0ZXJWYWx1ZTogVCwgaW5uZXJWYWx1ZTogSSwgb3V0ZXJJbmRleDogbnVtYmVyLCBpbm5lckluZGV4OiBudW1iZXIpOiBhbnl9IFtyZXN1bHRTZWxlY3Rvcl1cbiAqIEEgZnVuY3Rpb24gdG8gcHJvZHVjZSB0aGUgdmFsdWUgb24gdGhlIG91dHB1dCBPYnNlcnZhYmxlIGJhc2VkIG9uIHRoZSB2YWx1ZXNcbiAqIGFuZCB0aGUgaW5kaWNlcyBvZiB0aGUgc291cmNlIChvdXRlcikgZW1pc3Npb24gYW5kIHRoZSBpbm5lciBPYnNlcnZhYmxlXG4gKiBlbWlzc2lvbi4gVGhlIGFyZ3VtZW50cyBwYXNzZWQgdG8gdGhpcyBmdW5jdGlvbiBhcmU6XG4gKiAtIGBvdXRlclZhbHVlYDogdGhlIHZhbHVlIHRoYXQgY2FtZSBmcm9tIHRoZSBzb3VyY2VcbiAqIC0gYGlubmVyVmFsdWVgOiB0aGUgdmFsdWUgdGhhdCBjYW1lIGZyb20gdGhlIHByb2plY3RlZCBPYnNlcnZhYmxlXG4gKiAtIGBvdXRlckluZGV4YDogdGhlIFwiaW5kZXhcIiBvZiB0aGUgdmFsdWUgdGhhdCBjYW1lIGZyb20gdGhlIHNvdXJjZVxuICogLSBgaW5uZXJJbmRleGA6IHRoZSBcImluZGV4XCIgb2YgdGhlIHZhbHVlIGZyb20gdGhlIHByb2plY3RlZCBPYnNlcnZhYmxlXG4gKiBAcGFyYW0ge251bWJlcn0gW2NvbmN1cnJlbnQ9TnVtYmVyLlBPU0lUSVZFX0lORklOSVRZXSBNYXhpbXVtIG51bWJlciBvZiBpbnB1dFxuICogT2JzZXJ2YWJsZXMgYmVpbmcgc3Vic2NyaWJlZCB0byBjb25jdXJyZW50bHkuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgaXRlbXMgZnJvbSB0aGUgZ2l2ZW5cbiAqIGBpbm5lck9ic2VydmFibGVgIChhbmQgb3B0aW9uYWxseSB0cmFuc2Zvcm1lZCB0aHJvdWdoIGByZXN1bHRTZWxlY3RvcmApIGV2ZXJ5XG4gKiB0aW1lIGEgdmFsdWUgaXMgZW1pdHRlZCBvbiB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiBAbWV0aG9kIG1lcmdlTWFwVG9cbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZU1hcFRvPFQsIEksIFI+KGlubmVyT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxJPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFNlbGVjdG9yPzogKChvdXRlclZhbHVlOiBULCBpbm5lclZhbHVlOiBJLCBvdXRlckluZGV4OiBudW1iZXIsIGlubmVySW5kZXg6IG51bWJlcikgPT4gUikgfCBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25jdXJyZW50OiBudW1iZXIgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkpOiBPYnNlcnZhYmxlPFI+IHtcbiAgaWYgKHR5cGVvZiByZXN1bHRTZWxlY3RvciA9PT0gJ251bWJlcicpIHtcbiAgICBjb25jdXJyZW50ID0gPG51bWJlcj5yZXN1bHRTZWxlY3RvcjtcbiAgICByZXN1bHRTZWxlY3RvciA9IG51bGw7XG4gIH1cbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgTWVyZ2VNYXBUb09wZXJhdG9yKGlubmVyT2JzZXJ2YWJsZSwgPGFueT5yZXN1bHRTZWxlY3RvciwgY29uY3VycmVudCkpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1lcmdlTWFwVG9TaWduYXR1cmU8VD4ge1xuICA8Uj4ob2JzZXJ2YWJsZTogT2JzZXJ2YWJsZUlucHV0PFI+LCBjb25jdXJyZW50PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxSPjtcbiAgPEksIFI+KG9ic2VydmFibGU6IE9ic2VydmFibGVJbnB1dDxJPixcbiAgICAgICAgIHJlc3VsdFNlbGVjdG9yOiAob3V0ZXJWYWx1ZTogVCwgaW5uZXJWYWx1ZTogSSwgb3V0ZXJJbmRleDogbnVtYmVyLCBpbm5lckluZGV4OiBudW1iZXIpID0+IFIsXG4gICAgICAgICBjb25jdXJyZW50PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxSPjtcbn1cblxuLy8gVE9ETzogRmlndXJlIG91dCBjb3JyZWN0IHNpZ25hdHVyZSBoZXJlOiBhbiBPcGVyYXRvcjxPYnNlcnZhYmxlPFQ+LCBSPlxuLy8gICAgICAgbmVlZHMgdG8gaW1wbGVtZW50IGNhbGwob2JzZXJ2ZXI6IFN1YnNjcmliZXI8Uj4pOiBTdWJzY3JpYmVyPE9ic2VydmFibGU8VD4+XG5leHBvcnQgY2xhc3MgTWVyZ2VNYXBUb09wZXJhdG9yPFQsIEksIFI+IGltcGxlbWVudHMgT3BlcmF0b3I8T2JzZXJ2YWJsZTxUPiwgUj4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGlzaDogT2JzZXJ2YWJsZUlucHV0PEk+LFxuICAgICAgICAgICAgICBwcml2YXRlIHJlc3VsdFNlbGVjdG9yPzogKG91dGVyVmFsdWU6IFQsIGlubmVyVmFsdWU6IEksIG91dGVySW5kZXg6IG51bWJlciwgaW5uZXJJbmRleDogbnVtYmVyKSA9PiBSLFxuICAgICAgICAgICAgICBwcml2YXRlIGNvbmN1cnJlbnQ6IG51bWJlciA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSkge1xuICB9XG5cbiAgY2FsbChvYnNlcnZlcjogU3Vic2NyaWJlcjxSPiwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2UuX3N1YnNjcmliZShuZXcgTWVyZ2VNYXBUb1N1YnNjcmliZXIob2JzZXJ2ZXIsIHRoaXMuaXNoLCB0aGlzLnJlc3VsdFNlbGVjdG9yLCB0aGlzLmNvbmN1cnJlbnQpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuZXhwb3J0IGNsYXNzIE1lcmdlTWFwVG9TdWJzY3JpYmVyPFQsIEksIFI+IGV4dGVuZHMgT3V0ZXJTdWJzY3JpYmVyPFQsIEk+IHtcbiAgcHJpdmF0ZSBoYXNDb21wbGV0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBidWZmZXI6IFRbXSA9IFtdO1xuICBwcml2YXRlIGFjdGl2ZTogbnVtYmVyID0gMDtcbiAgcHJvdGVjdGVkIGluZGV4OiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPFI+LFxuICAgICAgICAgICAgICBwcml2YXRlIGlzaDogT2JzZXJ2YWJsZUlucHV0PEk+LFxuICAgICAgICAgICAgICBwcml2YXRlIHJlc3VsdFNlbGVjdG9yPzogKG91dGVyVmFsdWU6IFQsIGlubmVyVmFsdWU6IEksIG91dGVySW5kZXg6IG51bWJlciwgaW5uZXJJbmRleDogbnVtYmVyKSA9PiBSLFxuICAgICAgICAgICAgICBwcml2YXRlIGNvbmN1cnJlbnQ6IG51bWJlciA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSkge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmFjdGl2ZSA8IHRoaXMuY29uY3VycmVudCkge1xuICAgICAgY29uc3QgcmVzdWx0U2VsZWN0b3IgPSB0aGlzLnJlc3VsdFNlbGVjdG9yO1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmluZGV4Kys7XG4gICAgICBjb25zdCBpc2ggPSB0aGlzLmlzaDtcbiAgICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gdGhpcy5kZXN0aW5hdGlvbjtcblxuICAgICAgdGhpcy5hY3RpdmUrKztcbiAgICAgIHRoaXMuX2lubmVyU3ViKGlzaCwgZGVzdGluYXRpb24sIHJlc3VsdFNlbGVjdG9yLCB2YWx1ZSwgaW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJ1ZmZlci5wdXNoKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pbm5lclN1Yihpc2g6IE9ic2VydmFibGVJbnB1dDxJPixcbiAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb246IFBhcnRpYWxPYnNlcnZlcjxJPixcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0U2VsZWN0b3I6IChvdXRlclZhbHVlOiBULCBpbm5lclZhbHVlOiBJLCBvdXRlckluZGV4OiBudW1iZXIsIGlubmVySW5kZXg6IG51bWJlcikgPT4gUixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFQsXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmFkZChzdWJzY3JpYmVUb1Jlc3VsdDxULCBJPih0aGlzLCBpc2gsIHZhbHVlLCBpbmRleCkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmhhc0NvbXBsZXRlZCA9IHRydWU7XG4gICAgaWYgKHRoaXMuYWN0aXZlID09PSAwICYmIHRoaXMuYnVmZmVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5vdGlmeU5leHQob3V0ZXJWYWx1ZTogVCwgaW5uZXJWYWx1ZTogSSxcbiAgICAgICAgICAgICBvdXRlckluZGV4OiBudW1iZXIsIGlubmVySW5kZXg6IG51bWJlcixcbiAgICAgICAgICAgICBpbm5lclN1YjogSW5uZXJTdWJzY3JpYmVyPFQsIEk+KTogdm9pZCB7XG4gICAgY29uc3QgeyByZXN1bHRTZWxlY3RvciwgZGVzdGluYXRpb24gfSA9IHRoaXM7XG4gICAgaWYgKHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgICB0aGlzLnRyeVNlbGVjdFJlc3VsdChvdXRlclZhbHVlLCBpbm5lclZhbHVlLCBvdXRlckluZGV4LCBpbm5lckluZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVzdGluYXRpb24ubmV4dChpbm5lclZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRyeVNlbGVjdFJlc3VsdChvdXRlclZhbHVlOiBULCBpbm5lclZhbHVlOiBJLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRlckluZGV4OiBudW1iZXIsIGlubmVySW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHsgcmVzdWx0U2VsZWN0b3IsIGRlc3RpbmF0aW9uIH0gPSB0aGlzO1xuICAgIGxldCByZXN1bHQ6IFI7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IHJlc3VsdFNlbGVjdG9yKG91dGVyVmFsdWUsIGlubmVyVmFsdWUsIG91dGVySW5kZXgsIGlubmVySW5kZXgpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkZXN0aW5hdGlvbi5uZXh0KHJlc3VsdCk7XG4gIH1cblxuICBub3RpZnlFcnJvcihlcnI6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgfVxuXG4gIG5vdGlmeUNvbXBsZXRlKGlubmVyU3ViOiBTdWJzY3JpcHRpb24pOiB2b2lkIHtcbiAgICBjb25zdCBidWZmZXIgPSB0aGlzLmJ1ZmZlcjtcbiAgICB0aGlzLnJlbW92ZShpbm5lclN1Yik7XG4gICAgdGhpcy5hY3RpdmUtLTtcbiAgICBpZiAoYnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuX25leHQoYnVmZmVyLnNoaWZ0KCkpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5hY3RpdmUgPT09IDAgJiYgdGhpcy5oYXNDb21wbGV0ZWQpIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
