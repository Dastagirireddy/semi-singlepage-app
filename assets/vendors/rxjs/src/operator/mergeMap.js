System.register(['../util/subscribeToResult', '../OuterSubscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var subscribeToResult_1, OuterSubscriber_1;
    var MergeMapOperator, MergeMapSubscriber;
    /**
     * Projects each source value to an Observable which is merged in the output
     * Observable.
     *
     * <span class="informal">Maps each value to an Observable, then flattens all of
     * these inner Observables using {@link mergeAll}.</span>
     *
     * <img src="./img/mergeMap.png" width="100%">
     *
     * Returns an Observable that emits items based on applying a function that you
     * supply to each item emitted by the source Observable, where that function
     * returns an Observable, and then merging those resulting Observables and
     * emitting the results of this merger.
     *
     * @example <caption>Map and flatten each letter to an Observable ticking every 1 second</caption>
     * var letters = Rx.Observable.of('a', 'b', 'c');
     * var result = letters.mergeMap(x =>
     *   Rx.Observable.interval(1000).map(i => x+i)
     * );
     * result.subscribe(x => console.log(x));
     *
     * @see {@link concatMap}
     * @see {@link exhaustMap}
     * @see {@link merge}
     * @see {@link mergeAll}
     * @see {@link mergeMapTo}
     * @see {@link mergeScan}
     * @see {@link switchMap}
     *
     * @param {function(value: T, ?index: number): Observable} project A function
     * that, when applied to an item emitted by the source Observable, returns an
     * Observable.
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
     * @return {Observable} An Observable that emits the result of applying the
     * projection function (and the optional `resultSelector`) to each item emitted
     * by the source Observable and merging the results of the Observables obtained
     * from this transformation.
     * @method mergeMap
     * @owner Observable
     */
    function mergeMap(project, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        if (typeof resultSelector === 'number') {
            concurrent = resultSelector;
            resultSelector = null;
        }
        return this.lift(new MergeMapOperator(project, resultSelector, concurrent));
    }
    exports_1("mergeMap", mergeMap);
    return {
        setters:[
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            },
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            }],
        execute: function() {
            MergeMapOperator = (function () {
                function MergeMapOperator(project, resultSelector, concurrent) {
                    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
                    this.project = project;
                    this.resultSelector = resultSelector;
                    this.concurrent = concurrent;
                }
                MergeMapOperator.prototype.call = function (observer, source) {
                    return source._subscribe(new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent));
                };
                return MergeMapOperator;
            }());
            exports_1("MergeMapOperator", MergeMapOperator);
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            MergeMapSubscriber = (function (_super) {
                __extends(MergeMapSubscriber, _super);
                function MergeMapSubscriber(destination, project, resultSelector, concurrent) {
                    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
                    _super.call(this, destination);
                    this.project = project;
                    this.resultSelector = resultSelector;
                    this.concurrent = concurrent;
                    this.hasCompleted = false;
                    this.buffer = [];
                    this.active = 0;
                    this.index = 0;
                }
                MergeMapSubscriber.prototype._next = function (value) {
                    if (this.active < this.concurrent) {
                        this._tryNext(value);
                    }
                    else {
                        this.buffer.push(value);
                    }
                };
                MergeMapSubscriber.prototype._tryNext = function (value) {
                    var result;
                    var index = this.index++;
                    try {
                        result = this.project(value, index);
                    }
                    catch (err) {
                        this.destination.error(err);
                        return;
                    }
                    this.active++;
                    this._innerSub(result, value, index);
                };
                MergeMapSubscriber.prototype._innerSub = function (ish, value, index) {
                    this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
                };
                MergeMapSubscriber.prototype._complete = function () {
                    this.hasCompleted = true;
                    if (this.active === 0 && this.buffer.length === 0) {
                        this.destination.complete();
                    }
                };
                MergeMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    if (this.resultSelector) {
                        this._notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex);
                    }
                    else {
                        this.destination.next(innerValue);
                    }
                };
                MergeMapSubscriber.prototype._notifyResultSelector = function (outerValue, innerValue, outerIndex, innerIndex) {
                    var result;
                    try {
                        result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
                    }
                    catch (err) {
                        this.destination.error(err);
                        return;
                    }
                    this.destination.next(result);
                };
                MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {
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
                return MergeMapSubscriber;
            }(OuterSubscriber_1.OuterSubscriber));
            exports_1("MergeMapSubscriber", MergeMapSubscriber);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL21lcmdlTWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFRQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BZ0RHO0lBQ0gsa0JBQWtDLE9BQXdELEVBQ3hELGNBQXVHLEVBQ3ZHLFVBQTZDO1FBQTdDLDBCQUE2QyxHQUE3QyxhQUFxQixNQUFNLENBQUMsaUJBQWlCO1FBQzdFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sY0FBYyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDdkMsVUFBVSxHQUFXLGNBQWMsQ0FBQztZQUNwQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGdCQUFnQixDQUFDLE9BQU8sRUFBTyxjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBUkQsK0JBUUMsQ0FBQTs7Ozs7Ozs7OztZQVNEO2dCQUNFLDBCQUFvQixPQUF3RCxFQUN4RCxjQUE0RixFQUM1RixVQUE2QztvQkFBckQsMEJBQXFELEdBQXJELGFBQTZCLE1BQU0sQ0FBQyxpQkFBaUI7b0JBRjdDLFlBQU8sR0FBUCxPQUFPLENBQWlEO29CQUN4RCxtQkFBYyxHQUFkLGNBQWMsQ0FBOEU7b0JBQzVGLGVBQVUsR0FBVixVQUFVLENBQW1DO2dCQUNqRSxDQUFDO2dCQUVELCtCQUFJLEdBQUosVUFBSyxRQUF1QixFQUFFLE1BQVc7b0JBQ3ZDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksa0JBQWtCLENBQzdDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FDN0QsQ0FBQyxDQUFDO2dCQUNMLENBQUM7Z0JBQ0gsdUJBQUM7WUFBRCxDQVhBLEFBV0MsSUFBQTtZQVhELCtDQVdDLENBQUE7WUFFRDs7OztlQUlHO1lBQ0g7Z0JBQWlELHNDQUFxQjtnQkFNcEUsNEJBQVksV0FBMEIsRUFDbEIsT0FBd0QsRUFDeEQsY0FBNEYsRUFDNUYsVUFBNkM7b0JBQXJELDBCQUFxRCxHQUFyRCxhQUE2QixNQUFNLENBQUMsaUJBQWlCO29CQUMvRCxrQkFBTSxXQUFXLENBQUMsQ0FBQztvQkFIRCxZQUFPLEdBQVAsT0FBTyxDQUFpRDtvQkFDeEQsbUJBQWMsR0FBZCxjQUFjLENBQThFO29CQUM1RixlQUFVLEdBQVYsVUFBVSxDQUFtQztvQkFSekQsaUJBQVksR0FBWSxLQUFLLENBQUM7b0JBQzlCLFdBQU0sR0FBUSxFQUFFLENBQUM7b0JBQ2pCLFdBQU0sR0FBVyxDQUFDLENBQUM7b0JBQ2pCLFVBQUssR0FBVyxDQUFDLENBQUM7Z0JBTzVCLENBQUM7Z0JBRVMsa0NBQUssR0FBZixVQUFnQixLQUFRO29CQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO3dCQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN2QixDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMxQixDQUFDO2dCQUNILENBQUM7Z0JBRVMscUNBQVEsR0FBbEIsVUFBbUIsS0FBUTtvQkFDekIsSUFBSSxNQUEwQixDQUFDO29CQUMvQixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQzNCLElBQUksQ0FBQzt3QkFDSCxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ3RDLENBQUU7b0JBQUEsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDYixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDNUIsTUFBTSxDQUFDO29CQUNULENBQUM7b0JBQ0QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDdkMsQ0FBQztnQkFFTyxzQ0FBUyxHQUFqQixVQUFrQixHQUF1QixFQUFFLEtBQVEsRUFBRSxLQUFhO29CQUNoRSxJQUFJLENBQUMsR0FBRyxDQUFDLHFDQUFpQixDQUFPLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzdELENBQUM7Z0JBRVMsc0NBQVMsR0FBbkI7b0JBQ0UsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7b0JBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2xELElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQzlCLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCx1Q0FBVSxHQUFWLFVBQVcsVUFBYSxFQUFFLFVBQWEsRUFDNUIsVUFBa0IsRUFBRSxVQUFrQixFQUN0QyxRQUErQjtvQkFDeEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7d0JBQ3hCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztvQkFDN0UsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDcEMsQ0FBQztnQkFDSCxDQUFDO2dCQUVPLGtEQUFxQixHQUE3QixVQUE4QixVQUFhLEVBQUUsVUFBYSxFQUFFLFVBQWtCLEVBQUUsVUFBa0I7b0JBQ2hHLElBQUksTUFBUyxDQUFDO29CQUNkLElBQUksQ0FBQzt3QkFDSCxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztvQkFDL0UsQ0FBRTtvQkFBQSxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUM1QixNQUFNLENBQUM7b0JBQ1QsQ0FBQztvQkFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDaEMsQ0FBQztnQkFFRCwyQ0FBYyxHQUFkLFVBQWUsUUFBc0I7b0JBQ25DLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7b0JBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3RCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDZCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7b0JBQzdCLENBQUM7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO3dCQUNsRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUM5QixDQUFDO2dCQUNILENBQUM7Z0JBQ0gseUJBQUM7WUFBRCxDQTVFQSxBQTRFQyxDQTVFZ0QsaUNBQWUsR0E0RS9EO1lBNUVELG1EQTRFQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL21lcmdlTWFwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPYnNlcnZhYmxlLCBPYnNlcnZhYmxlSW5wdXR9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHtPcGVyYXRvcn0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHtTdWJzY3JpYmVyfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHtzdWJzY3JpYmVUb1Jlc3VsdH0gZnJvbSAnLi4vdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdCc7XG5pbXBvcnQge091dGVyU3Vic2NyaWJlcn0gZnJvbSAnLi4vT3V0ZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7SW5uZXJTdWJzY3JpYmVyfSBmcm9tICcuLi9Jbm5lclN1YnNjcmliZXInO1xuXG4vKipcbiAqIFByb2plY3RzIGVhY2ggc291cmNlIHZhbHVlIHRvIGFuIE9ic2VydmFibGUgd2hpY2ggaXMgbWVyZ2VkIGluIHRoZSBvdXRwdXRcbiAqIE9ic2VydmFibGUuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPk1hcHMgZWFjaCB2YWx1ZSB0byBhbiBPYnNlcnZhYmxlLCB0aGVuIGZsYXR0ZW5zIGFsbCBvZlxuICogdGhlc2UgaW5uZXIgT2JzZXJ2YWJsZXMgdXNpbmcge0BsaW5rIG1lcmdlQWxsfS48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9tZXJnZU1hcC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBpdGVtcyBiYXNlZCBvbiBhcHBseWluZyBhIGZ1bmN0aW9uIHRoYXQgeW91XG4gKiBzdXBwbHkgdG8gZWFjaCBpdGVtIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCB3aGVyZSB0aGF0IGZ1bmN0aW9uXG4gKiByZXR1cm5zIGFuIE9ic2VydmFibGUsIGFuZCB0aGVuIG1lcmdpbmcgdGhvc2UgcmVzdWx0aW5nIE9ic2VydmFibGVzIGFuZFxuICogZW1pdHRpbmcgdGhlIHJlc3VsdHMgb2YgdGhpcyBtZXJnZXIuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+TWFwIGFuZCBmbGF0dGVuIGVhY2ggbGV0dGVyIHRvIGFuIE9ic2VydmFibGUgdGlja2luZyBldmVyeSAxIHNlY29uZDwvY2FwdGlvbj5cbiAqIHZhciBsZXR0ZXJzID0gUnguT2JzZXJ2YWJsZS5vZignYScsICdiJywgJ2MnKTtcbiAqIHZhciByZXN1bHQgPSBsZXR0ZXJzLm1lcmdlTWFwKHggPT5cbiAqICAgUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKS5tYXAoaSA9PiB4K2kpXG4gKiApO1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBjb25jYXRNYXB9XG4gKiBAc2VlIHtAbGluayBleGhhdXN0TWFwfVxuICogQHNlZSB7QGxpbmsgbWVyZ2V9XG4gKiBAc2VlIHtAbGluayBtZXJnZUFsbH1cbiAqIEBzZWUge0BsaW5rIG1lcmdlTWFwVG99XG4gKiBAc2VlIHtAbGluayBtZXJnZVNjYW59XG4gKiBAc2VlIHtAbGluayBzd2l0Y2hNYXB9XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbih2YWx1ZTogVCwgP2luZGV4OiBudW1iZXIpOiBPYnNlcnZhYmxlfSBwcm9qZWN0IEEgZnVuY3Rpb25cbiAqIHRoYXQsIHdoZW4gYXBwbGllZCB0byBhbiBpdGVtIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCByZXR1cm5zIGFuXG4gKiBPYnNlcnZhYmxlLlxuICogQHBhcmFtIHtmdW5jdGlvbihvdXRlclZhbHVlOiBULCBpbm5lclZhbHVlOiBJLCBvdXRlckluZGV4OiBudW1iZXIsIGlubmVySW5kZXg6IG51bWJlcik6IGFueX0gW3Jlc3VsdFNlbGVjdG9yXVxuICogQSBmdW5jdGlvbiB0byBwcm9kdWNlIHRoZSB2YWx1ZSBvbiB0aGUgb3V0cHV0IE9ic2VydmFibGUgYmFzZWQgb24gdGhlIHZhbHVlc1xuICogYW5kIHRoZSBpbmRpY2VzIG9mIHRoZSBzb3VyY2UgKG91dGVyKSBlbWlzc2lvbiBhbmQgdGhlIGlubmVyIE9ic2VydmFibGVcbiAqIGVtaXNzaW9uLiBUaGUgYXJndW1lbnRzIHBhc3NlZCB0byB0aGlzIGZ1bmN0aW9uIGFyZTpcbiAqIC0gYG91dGVyVmFsdWVgOiB0aGUgdmFsdWUgdGhhdCBjYW1lIGZyb20gdGhlIHNvdXJjZVxuICogLSBgaW5uZXJWYWx1ZWA6IHRoZSB2YWx1ZSB0aGF0IGNhbWUgZnJvbSB0aGUgcHJvamVjdGVkIE9ic2VydmFibGVcbiAqIC0gYG91dGVySW5kZXhgOiB0aGUgXCJpbmRleFwiIG9mIHRoZSB2YWx1ZSB0aGF0IGNhbWUgZnJvbSB0aGUgc291cmNlXG4gKiAtIGBpbm5lckluZGV4YDogdGhlIFwiaW5kZXhcIiBvZiB0aGUgdmFsdWUgZnJvbSB0aGUgcHJvamVjdGVkIE9ic2VydmFibGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBbY29uY3VycmVudD1OdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFldIE1heGltdW0gbnVtYmVyIG9mIGlucHV0XG4gKiBPYnNlcnZhYmxlcyBiZWluZyBzdWJzY3JpYmVkIHRvIGNvbmN1cnJlbnRseS5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyB0aGUgcmVzdWx0IG9mIGFwcGx5aW5nIHRoZVxuICogcHJvamVjdGlvbiBmdW5jdGlvbiAoYW5kIHRoZSBvcHRpb25hbCBgcmVzdWx0U2VsZWN0b3JgKSB0byBlYWNoIGl0ZW0gZW1pdHRlZFxuICogYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGFuZCBtZXJnaW5nIHRoZSByZXN1bHRzIG9mIHRoZSBPYnNlcnZhYmxlcyBvYnRhaW5lZFxuICogZnJvbSB0aGlzIHRyYW5zZm9ybWF0aW9uLlxuICogQG1ldGhvZCBtZXJnZU1hcFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlTWFwPFQsIEksIFI+KHByb2plY3Q6ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlcikgPT4gT2JzZXJ2YWJsZUlucHV0PEk+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFNlbGVjdG9yPzogKChvdXRlclZhbHVlOiBULCBpbm5lclZhbHVlOiBJLCBvdXRlckluZGV4OiBudW1iZXIsIGlubmVySW5kZXg6IG51bWJlcikgPT4gUikgfCBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uY3VycmVudDogbnVtYmVyID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZKTogT2JzZXJ2YWJsZTxSPiB7XG4gIGlmICh0eXBlb2YgcmVzdWx0U2VsZWN0b3IgPT09ICdudW1iZXInKSB7XG4gICAgY29uY3VycmVudCA9IDxudW1iZXI+cmVzdWx0U2VsZWN0b3I7XG4gICAgcmVzdWx0U2VsZWN0b3IgPSBudWxsO1xuICB9XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IE1lcmdlTWFwT3BlcmF0b3IocHJvamVjdCwgPGFueT5yZXN1bHRTZWxlY3RvciwgY29uY3VycmVudCkpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1lcmdlTWFwU2lnbmF0dXJlPFQ+IHtcbiAgPFI+KHByb2plY3Q6ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlcikgPT4gT2JzZXJ2YWJsZUlucHV0PFI+LCBjb25jdXJyZW50PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxSPjtcbiAgPEksIFI+KHByb2plY3Q6ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlcikgPT4gT2JzZXJ2YWJsZUlucHV0PEk+LFxuICAgICAgICAgcmVzdWx0U2VsZWN0b3I6IChvdXRlclZhbHVlOiBULCBpbm5lclZhbHVlOiBJLCBvdXRlckluZGV4OiBudW1iZXIsIGlubmVySW5kZXg6IG51bWJlcikgPT4gUixcbiAgICAgICAgIGNvbmN1cnJlbnQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPFI+O1xufVxuXG5leHBvcnQgY2xhc3MgTWVyZ2VNYXBPcGVyYXRvcjxULCBJLCBSPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIEk+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwcm9qZWN0OiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIpID0+IE9ic2VydmFibGVJbnB1dDxJPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSByZXN1bHRTZWxlY3Rvcj86IChvdXRlclZhbHVlOiBULCBpbm5lclZhbHVlOiBJLCBvdXRlckluZGV4OiBudW1iZXIsIGlubmVySW5kZXg6IG51bWJlcikgPT4gUixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjb25jdXJyZW50OiBudW1iZXIgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkpIHtcbiAgfVxuXG4gIGNhbGwob2JzZXJ2ZXI6IFN1YnNjcmliZXI8ST4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gc291cmNlLl9zdWJzY3JpYmUobmV3IE1lcmdlTWFwU3Vic2NyaWJlcihcbiAgICAgIG9ic2VydmVyLCB0aGlzLnByb2plY3QsIHRoaXMucmVzdWx0U2VsZWN0b3IsIHRoaXMuY29uY3VycmVudFxuICAgICkpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5leHBvcnQgY2xhc3MgTWVyZ2VNYXBTdWJzY3JpYmVyPFQsIEksIFI+IGV4dGVuZHMgT3V0ZXJTdWJzY3JpYmVyPFQsIEk+IHtcbiAgcHJpdmF0ZSBoYXNDb21wbGV0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBidWZmZXI6IFRbXSA9IFtdO1xuICBwcml2YXRlIGFjdGl2ZTogbnVtYmVyID0gMDtcbiAgcHJvdGVjdGVkIGluZGV4OiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPEk+LFxuICAgICAgICAgICAgICBwcml2YXRlIHByb2plY3Q6ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlcikgPT4gT2JzZXJ2YWJsZUlucHV0PEk+LFxuICAgICAgICAgICAgICBwcml2YXRlIHJlc3VsdFNlbGVjdG9yPzogKG91dGVyVmFsdWU6IFQsIGlubmVyVmFsdWU6IEksIG91dGVySW5kZXg6IG51bWJlciwgaW5uZXJJbmRleDogbnVtYmVyKSA9PiBSLFxuICAgICAgICAgICAgICBwcml2YXRlIGNvbmN1cnJlbnQ6IG51bWJlciA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSkge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmFjdGl2ZSA8IHRoaXMuY29uY3VycmVudCkge1xuICAgICAgdGhpcy5fdHJ5TmV4dCh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYnVmZmVyLnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfdHJ5TmV4dCh2YWx1ZTogVCkge1xuICAgIGxldCByZXN1bHQ6IE9ic2VydmFibGVJbnB1dDxJPjtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuaW5kZXgrKztcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5wcm9qZWN0KHZhbHVlLCBpbmRleCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuYWN0aXZlKys7XG4gICAgdGhpcy5faW5uZXJTdWIocmVzdWx0LCB2YWx1ZSwgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5uZXJTdWIoaXNoOiBPYnNlcnZhYmxlSW5wdXQ8ST4sIHZhbHVlOiBULCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5hZGQoc3Vic2NyaWJlVG9SZXN1bHQ8VCwgST4odGhpcywgaXNoLCB2YWx1ZSwgaW5kZXgpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY29tcGxldGUoKTogdm9pZCB7XG4gICAgdGhpcy5oYXNDb21wbGV0ZWQgPSB0cnVlO1xuICAgIGlmICh0aGlzLmFjdGl2ZSA9PT0gMCAmJiB0aGlzLmJ1ZmZlci5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICB9XG4gIH1cblxuICBub3RpZnlOZXh0KG91dGVyVmFsdWU6IFQsIGlubmVyVmFsdWU6IEksXG4gICAgICAgICAgICAgb3V0ZXJJbmRleDogbnVtYmVyLCBpbm5lckluZGV4OiBudW1iZXIsXG4gICAgICAgICAgICAgaW5uZXJTdWI6IElubmVyU3Vic2NyaWJlcjxULCBJPik6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlc3VsdFNlbGVjdG9yKSB7XG4gICAgICB0aGlzLl9ub3RpZnlSZXN1bHRTZWxlY3RvcihvdXRlclZhbHVlLCBpbm5lclZhbHVlLCBvdXRlckluZGV4LCBpbm5lckluZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KGlubmVyVmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX25vdGlmeVJlc3VsdFNlbGVjdG9yKG91dGVyVmFsdWU6IFQsIGlubmVyVmFsdWU6IEksIG91dGVySW5kZXg6IG51bWJlciwgaW5uZXJJbmRleDogbnVtYmVyKSB7XG4gICAgbGV0IHJlc3VsdDogUjtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5yZXN1bHRTZWxlY3RvcihvdXRlclZhbHVlLCBpbm5lclZhbHVlLCBvdXRlckluZGV4LCBpbm5lckluZGV4KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHJlc3VsdCk7XG4gIH1cblxuICBub3RpZnlDb21wbGV0ZShpbm5lclN1YjogU3Vic2NyaXB0aW9uKTogdm9pZCB7XG4gICAgY29uc3QgYnVmZmVyID0gdGhpcy5idWZmZXI7XG4gICAgdGhpcy5yZW1vdmUoaW5uZXJTdWIpO1xuICAgIHRoaXMuYWN0aXZlLS07XG4gICAgaWYgKGJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLl9uZXh0KGJ1ZmZlci5zaGlmdCgpKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYWN0aXZlID09PSAwICYmIHRoaXMuaGFzQ29tcGxldGVkKSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
