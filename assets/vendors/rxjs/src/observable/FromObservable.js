System.register(['../util/isArray', '../util/isFunction', '../util/isPromise', '../util/isScheduler', './PromiseObservable', './IteratorObservable', './ArrayObservable', './ArrayLikeObservable', '../symbol/iterator', '../Observable', '../operator/observeOn', 'symbol-observable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var isArray_1, isFunction_1, isPromise_1, isScheduler_1, PromiseObservable_1, IteratorObservable_1, ArrayObservable_1, ArrayLikeObservable_1, iterator_1, Observable_1, observeOn_1, symbol_observable_1;
    var isArrayLike, FromObservable;
    return {
        setters:[
            function (isArray_1_1) {
                isArray_1 = isArray_1_1;
            },
            function (isFunction_1_1) {
                isFunction_1 = isFunction_1_1;
            },
            function (isPromise_1_1) {
                isPromise_1 = isPromise_1_1;
            },
            function (isScheduler_1_1) {
                isScheduler_1 = isScheduler_1_1;
            },
            function (PromiseObservable_1_1) {
                PromiseObservable_1 = PromiseObservable_1_1;
            },
            function (IteratorObservable_1_1) {
                IteratorObservable_1 = IteratorObservable_1_1;
            },
            function (ArrayObservable_1_1) {
                ArrayObservable_1 = ArrayObservable_1_1;
            },
            function (ArrayLikeObservable_1_1) {
                ArrayLikeObservable_1 = ArrayLikeObservable_1_1;
            },
            function (iterator_1_1) {
                iterator_1 = iterator_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (observeOn_1_1) {
                observeOn_1 = observeOn_1_1;
            },
            function (symbol_observable_1_1) {
                symbol_observable_1 = symbol_observable_1_1;
            }],
        execute: function() {
            isArrayLike = (function (x) { return x && typeof x.length === 'number'; });
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @extends {Ignored}
             * @hide true
             */
            FromObservable = (function (_super) {
                __extends(FromObservable, _super);
                function FromObservable(ish, scheduler) {
                    _super.call(this, null);
                    this.ish = ish;
                    this.scheduler = scheduler;
                }
                /**
                 * Creates an Observable from an Array, an array-like object, a Promise, an
                 * iterable object, or an Observable-like object.
                 *
                 * <span class="informal">Converts almost anything to an Observable.</span>
                 *
                 * <img src="./img/from.png" width="100%">
                 *
                 * Convert various other objects and data types into Observables. `from`
                 * converts a Promise or an array-like or an
                 * [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)
                 * object into an Observable that emits the items in that promise or array or
                 * iterable. A String, in this context, is treated as an array of characters.
                 * Observable-like objects (contains a function named with the ES2015 Symbol
                 * for Observable) can also be converted through this operator.
                 *
                 * @example <caption>Converts an array to an Observable</caption>
                 * var array = [10, 20, 30];
                 * var result = Rx.Observable.from(array);
                 * result.subscribe(x => console.log(x));
                 *
                 * @example <caption>Convert an infinite iterable (from a generator) to an Observable</caption>
                 * function* generateDoubles(seed) {
                 *   var i = seed;
                 *   while (true) {
                 *     yield i;
                 *     i = 2 * i; // double it
                 *   }
                 * }
                 *
                 * var iterator = generateDoubles(3);
                 * var result = Rx.Observable.from(iterator).take(10);
                 * result.subscribe(x => console.log(x));
                 *
                 * @see {@link create}
                 * @see {@link fromEvent}
                 * @see {@link fromEventPattern}
                 * @see {@link fromPromise}
                 *
                 * @param {ObservableInput<T>} ish A subscribable object, a Promise, an
                 * Observable-like, an Array, an iterable or an array-like object to be
                 * converted.
                 * @param {function(x: any, i: number): T} [mapFn] A "map" function to call
                 * when converting array-like objects, where `x` is a value from the
                 * array-like and `i` is the index of that value in the sequence.
                 * @param {any} [thisArg] The context object to use when calling the `mapFn`,
                 * if provided.
                 * @param {Scheduler} [scheduler] The scheduler on which to schedule the
                 * emissions of values.
                 * @return {Observable<T>} The Observable whose values are originally from the
                 * input object that was converted.
                 * @static true
                 * @name from
                 * @owner Observable
                 */
                FromObservable.create = function (ish, mapFnOrScheduler, thisArg, lastScheduler) {
                    var scheduler = null;
                    var mapFn = null;
                    if (isFunction_1.isFunction(mapFnOrScheduler)) {
                        scheduler = lastScheduler || null;
                        mapFn = mapFnOrScheduler;
                    }
                    else if (isScheduler_1.isScheduler(scheduler)) {
                        scheduler = mapFnOrScheduler;
                    }
                    if (ish != null) {
                        if (typeof ish[symbol_observable_1.default] === 'function') {
                            if (ish instanceof Observable_1.Observable && !scheduler) {
                                return ish;
                            }
                            return new FromObservable(ish, scheduler);
                        }
                        else if (isArray_1.isArray(ish)) {
                            return new ArrayObservable_1.ArrayObservable(ish, scheduler);
                        }
                        else if (isPromise_1.isPromise(ish)) {
                            return new PromiseObservable_1.PromiseObservable(ish, scheduler);
                        }
                        else if (typeof ish[iterator_1.$$iterator] === 'function' || typeof ish === 'string') {
                            return new IteratorObservable_1.IteratorObservable(ish, null, null, scheduler);
                        }
                        else if (isArrayLike(ish)) {
                            return new ArrayLikeObservable_1.ArrayLikeObservable(ish, mapFn, thisArg, scheduler);
                        }
                    }
                    throw new TypeError((ish !== null && typeof ish || ish) + ' is not observable');
                };
                FromObservable.prototype._subscribe = function (subscriber) {
                    var ish = this.ish;
                    var scheduler = this.scheduler;
                    if (scheduler == null) {
                        return ish[symbol_observable_1.default]().subscribe(subscriber);
                    }
                    else {
                        return ish[symbol_observable_1.default]().subscribe(new observeOn_1.ObserveOnSubscriber(subscriber, scheduler, 0));
                    }
                };
                return FromObservable;
            }(Observable_1.Observable));
            exports_1("FromObservable", FromObservable);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29ic2VydmFibGUvRnJvbU9ic2VydmFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O1FBaUJNLFdBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFBWCxXQUFXLEdBQUcsQ0FBQyxVQUFJLENBQU0sSUFBd0IsT0FBQSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBakMsQ0FBaUMsQ0FBQyxDQUFDO1lBRTFGOzs7O2VBSUc7WUFDSDtnQkFBdUMsa0NBQWE7Z0JBQ2xELHdCQUFvQixHQUF1QixFQUFVLFNBQW9CO29CQUN2RSxrQkFBTSxJQUFJLENBQUMsQ0FBQztvQkFETSxRQUFHLEdBQUgsR0FBRyxDQUFvQjtvQkFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO2dCQUV6RSxDQUFDO2dCQUtEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUJBc0RHO2dCQUNJLHFCQUFNLEdBQWIsVUFBaUIsR0FBdUIsRUFDdkIsZ0JBQXlELEVBQ3pELE9BQWEsRUFDYixhQUF5QjtvQkFDeEMsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDO29CQUNoQyxJQUFJLEtBQUssR0FBNkIsSUFBSSxDQUFDO29CQUMzQyxFQUFFLENBQUMsQ0FBQyx1QkFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNqQyxTQUFTLEdBQUcsYUFBYSxJQUFJLElBQUksQ0FBQzt3QkFDbEMsS0FBSyxHQUE4QixnQkFBZ0IsQ0FBQztvQkFDdEQsQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMseUJBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2xDLFNBQVMsR0FBZSxnQkFBZ0IsQ0FBQztvQkFDM0MsQ0FBQztvQkFFRCxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDaEIsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsMkJBQVksQ0FBQyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7NEJBQzVDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsWUFBWSx1QkFBVSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQ0FDNUMsTUFBTSxDQUFDLEdBQUcsQ0FBQzs0QkFDYixDQUFDOzRCQUNELE1BQU0sQ0FBQyxJQUFJLGNBQWMsQ0FBSSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7d0JBQy9DLENBQUM7d0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGlCQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN4QixNQUFNLENBQUMsSUFBSSxpQ0FBZSxDQUFJLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQzt3QkFDaEQsQ0FBQzt3QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMscUJBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzFCLE1BQU0sQ0FBQyxJQUFJLHFDQUFpQixDQUFJLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQzt3QkFDbEQsQ0FBQzt3QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMscUJBQVUsQ0FBQyxLQUFLLFVBQVUsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDOzRCQUM1RSxNQUFNLENBQUMsSUFBSSx1Q0FBa0IsQ0FBUyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQzt3QkFDcEUsQ0FBQzt3QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDNUIsTUFBTSxDQUFDLElBQUkseUNBQW1CLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7d0JBQ2pFLENBQUM7b0JBQ0gsQ0FBQztvQkFFRCxNQUFNLElBQUksU0FBUyxDQUFDLENBQUMsR0FBRyxLQUFLLElBQUksSUFBSSxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxDQUFDO2dCQUNsRixDQUFDO2dCQUVTLG1DQUFVLEdBQXBCLFVBQXFCLFVBQXlCO29CQUM1QyxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO29CQUNyQixJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUNqQyxFQUFFLENBQUMsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQywyQkFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ25ELENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sTUFBTSxDQUFDLEdBQUcsQ0FBQywyQkFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSwrQkFBbUIsQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFGLENBQUM7Z0JBQ0gsQ0FBQztnQkFDSCxxQkFBQztZQUFELENBekdBLEFBeUdDLENBekdzQyx1QkFBVSxHQXlHaEQ7WUF6R0QsMkNBeUdDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvcnhqcy9zcmMvb2JzZXJ2YWJsZS9Gcm9tT2JzZXJ2YWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNBcnJheX0gZnJvbSAnLi4vdXRpbC9pc0FycmF5JztcbmltcG9ydCB7aXNGdW5jdGlvbn0gZnJvbSAnLi4vdXRpbC9pc0Z1bmN0aW9uJztcbmltcG9ydCB7aXNQcm9taXNlfSBmcm9tICcuLi91dGlsL2lzUHJvbWlzZSc7XG5pbXBvcnQge2lzU2NoZWR1bGVyfSBmcm9tICcuLi91dGlsL2lzU2NoZWR1bGVyJztcbmltcG9ydCB7UHJvbWlzZU9ic2VydmFibGV9IGZyb20gJy4vUHJvbWlzZU9ic2VydmFibGUnO1xuaW1wb3J0IHtJdGVyYXRvck9ic2VydmFibGV9IGZyb20nLi9JdGVyYXRvck9ic2VydmFibGUnO1xuaW1wb3J0IHtBcnJheU9ic2VydmFibGV9IGZyb20gJy4vQXJyYXlPYnNlcnZhYmxlJztcbmltcG9ydCB7QXJyYXlMaWtlT2JzZXJ2YWJsZX0gZnJvbSAnLi9BcnJheUxpa2VPYnNlcnZhYmxlJztcblxuaW1wb3J0IHtTY2hlZHVsZXJ9IGZyb20gJy4uL1NjaGVkdWxlcic7XG5pbXBvcnQgeyQkaXRlcmF0b3J9IGZyb20gJy4uL3N5bWJvbC9pdGVyYXRvcic7XG5pbXBvcnQge09ic2VydmFibGUsIE9ic2VydmFibGVJbnB1dH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQge1N1YnNjcmliZXJ9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHtPYnNlcnZlT25TdWJzY3JpYmVyfSBmcm9tICcuLi9vcGVyYXRvci9vYnNlcnZlT24nO1xuXG5pbXBvcnQgJCRvYnNlcnZhYmxlIGZyb20gJ3N5bWJvbC1vYnNlcnZhYmxlJztcblxuY29uc3QgaXNBcnJheUxpa2UgPSAoPFQ+KHg6IGFueSk6IHggaXMgQXJyYXlMaWtlPFQ+ID0+IHggJiYgdHlwZW9mIHgubGVuZ3RoID09PSAnbnVtYmVyJyk7XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICogQGhpZGUgdHJ1ZVxuICovXG5leHBvcnQgY2xhc3MgRnJvbU9ic2VydmFibGU8VD4gZXh0ZW5kcyBPYnNlcnZhYmxlPFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpc2g6IE9ic2VydmFibGVJbnB1dDxUPiwgcHJpdmF0ZSBzY2hlZHVsZXI6IFNjaGVkdWxlcikge1xuICAgIHN1cGVyKG51bGwpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZTxUPihpc2g6IE9ic2VydmFibGVJbnB1dDxUPiwgc2NoZWR1bGVyPzogU2NoZWR1bGVyKTogT2JzZXJ2YWJsZTxUPjtcbiAgc3RhdGljIGNyZWF0ZTxULCBSPihpc2g6IEFycmF5TGlrZTxUPiwgbWFwRm46ICh4OiBhbnksIHk6IG51bWJlcikgPT4gUiwgdGhpc0FyZz86IGFueSwgc2NoZWR1bGVyPzogU2NoZWR1bGVyKTogT2JzZXJ2YWJsZTxSPjtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBPYnNlcnZhYmxlIGZyb20gYW4gQXJyYXksIGFuIGFycmF5LWxpa2Ugb2JqZWN0LCBhIFByb21pc2UsIGFuXG4gICAqIGl0ZXJhYmxlIG9iamVjdCwgb3IgYW4gT2JzZXJ2YWJsZS1saWtlIG9iamVjdC5cbiAgICpcbiAgICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkNvbnZlcnRzIGFsbW9zdCBhbnl0aGluZyB0byBhbiBPYnNlcnZhYmxlLjwvc3Bhbj5cbiAgICpcbiAgICogPGltZyBzcmM9XCIuL2ltZy9mcm9tLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICAgKlxuICAgKiBDb252ZXJ0IHZhcmlvdXMgb3RoZXIgb2JqZWN0cyBhbmQgZGF0YSB0eXBlcyBpbnRvIE9ic2VydmFibGVzLiBgZnJvbWBcbiAgICogY29udmVydHMgYSBQcm9taXNlIG9yIGFuIGFycmF5LWxpa2Ugb3IgYW5cbiAgICogW2l0ZXJhYmxlXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9JdGVyYXRpb25fcHJvdG9jb2xzI2l0ZXJhYmxlKVxuICAgKiBvYmplY3QgaW50byBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdGhlIGl0ZW1zIGluIHRoYXQgcHJvbWlzZSBvciBhcnJheSBvclxuICAgKiBpdGVyYWJsZS4gQSBTdHJpbmcsIGluIHRoaXMgY29udGV4dCwgaXMgdHJlYXRlZCBhcyBhbiBhcnJheSBvZiBjaGFyYWN0ZXJzLlxuICAgKiBPYnNlcnZhYmxlLWxpa2Ugb2JqZWN0cyAoY29udGFpbnMgYSBmdW5jdGlvbiBuYW1lZCB3aXRoIHRoZSBFUzIwMTUgU3ltYm9sXG4gICAqIGZvciBPYnNlcnZhYmxlKSBjYW4gYWxzbyBiZSBjb252ZXJ0ZWQgdGhyb3VnaCB0aGlzIG9wZXJhdG9yLlxuICAgKlxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5Db252ZXJ0cyBhbiBhcnJheSB0byBhbiBPYnNlcnZhYmxlPC9jYXB0aW9uPlxuICAgKiB2YXIgYXJyYXkgPSBbMTAsIDIwLCAzMF07XG4gICAqIHZhciByZXN1bHQgPSBSeC5PYnNlcnZhYmxlLmZyb20oYXJyYXkpO1xuICAgKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICAgKlxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5Db252ZXJ0IGFuIGluZmluaXRlIGl0ZXJhYmxlIChmcm9tIGEgZ2VuZXJhdG9yKSB0byBhbiBPYnNlcnZhYmxlPC9jYXB0aW9uPlxuICAgKiBmdW5jdGlvbiogZ2VuZXJhdGVEb3VibGVzKHNlZWQpIHtcbiAgICogICB2YXIgaSA9IHNlZWQ7XG4gICAqICAgd2hpbGUgKHRydWUpIHtcbiAgICogICAgIHlpZWxkIGk7XG4gICAqICAgICBpID0gMiAqIGk7IC8vIGRvdWJsZSBpdFxuICAgKiAgIH1cbiAgICogfVxuICAgKuKAg+KAg1xuICAgKiB2YXIgaXRlcmF0b3IgPSBnZW5lcmF0ZURvdWJsZXMoMyk7XG4gICAqIHZhciByZXN1bHQgPSBSeC5PYnNlcnZhYmxlLmZyb20oaXRlcmF0b3IpLnRha2UoMTApO1xuICAgKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICAgKlxuICAgKiBAc2VlIHtAbGluayBjcmVhdGV9XG4gICAqIEBzZWUge0BsaW5rIGZyb21FdmVudH1cbiAgICogQHNlZSB7QGxpbmsgZnJvbUV2ZW50UGF0dGVybn1cbiAgICogQHNlZSB7QGxpbmsgZnJvbVByb21pc2V9XG4gICAq4oCD4oCDXG4gICAqIEBwYXJhbSB7T2JzZXJ2YWJsZUlucHV0PFQ+fSBpc2ggQSBzdWJzY3JpYmFibGUgb2JqZWN0LCBhIFByb21pc2UsIGFuXG4gICAqIE9ic2VydmFibGUtbGlrZSwgYW4gQXJyYXksIGFuIGl0ZXJhYmxlIG9yIGFuIGFycmF5LWxpa2Ugb2JqZWN0IHRvIGJlXG4gICAqIGNvbnZlcnRlZC5cbiAgICogQHBhcmFtIHtmdW5jdGlvbih4OiBhbnksIGk6IG51bWJlcik6IFR9IFttYXBGbl0gQSBcIm1hcFwiIGZ1bmN0aW9uIHRvIGNhbGxcbiAgICogd2hlbiBjb252ZXJ0aW5nIGFycmF5LWxpa2Ugb2JqZWN0cywgd2hlcmUgYHhgIGlzIGEgdmFsdWUgZnJvbSB0aGVcbiAgICogYXJyYXktbGlrZSBhbmQgYGlgIGlzIHRoZSBpbmRleCBvZiB0aGF0IHZhbHVlIGluIHRoZSBzZXF1ZW5jZS5cbiAgICogQHBhcmFtIHthbnl9IFt0aGlzQXJnXSBUaGUgY29udGV4dCBvYmplY3QgdG8gdXNlIHdoZW4gY2FsbGluZyB0aGUgYG1hcEZuYCxcbiAgICogaWYgcHJvdmlkZWQuXG4gICAqIEBwYXJhbSB7U2NoZWR1bGVyfSBbc2NoZWR1bGVyXSBUaGUgc2NoZWR1bGVyIG9uIHdoaWNoIHRvIHNjaGVkdWxlIHRoZVxuICAgKiBlbWlzc2lvbnMgb2YgdmFsdWVzLlxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fSBUaGUgT2JzZXJ2YWJsZSB3aG9zZSB2YWx1ZXMgYXJlIG9yaWdpbmFsbHkgZnJvbSB0aGVcbiAgICogaW5wdXQgb2JqZWN0IHRoYXQgd2FzIGNvbnZlcnRlZC5cbiAgICogQHN0YXRpYyB0cnVlXG4gICAqIEBuYW1lIGZyb21cbiAgICogQG93bmVyIE9ic2VydmFibGVcbiAgICovXG4gIHN0YXRpYyBjcmVhdGU8VD4oaXNoOiBPYnNlcnZhYmxlSW5wdXQ8VD4sXG4gICAgICAgICAgICAgICAgICAgbWFwRm5PclNjaGVkdWxlcj86IFNjaGVkdWxlciB8ICgoeDogYW55LCB5OiBudW1iZXIpID0+IFQpLFxuICAgICAgICAgICAgICAgICAgIHRoaXNBcmc/OiBhbnksXG4gICAgICAgICAgICAgICAgICAgbGFzdFNjaGVkdWxlcj86IFNjaGVkdWxlcik6IE9ic2VydmFibGU8VD4ge1xuICAgIGxldCBzY2hlZHVsZXI6IFNjaGVkdWxlciA9IG51bGw7XG4gICAgbGV0IG1hcEZuOiAoeDogYW55LCBpOiBudW1iZXIpID0+IFQgPSBudWxsO1xuICAgIGlmIChpc0Z1bmN0aW9uKG1hcEZuT3JTY2hlZHVsZXIpKSB7XG4gICAgICBzY2hlZHVsZXIgPSBsYXN0U2NoZWR1bGVyIHx8IG51bGw7XG4gICAgICBtYXBGbiA9IDwoeDogYW55LCBpOiBudW1iZXIpID0+IFQ+IG1hcEZuT3JTY2hlZHVsZXI7XG4gICAgfSBlbHNlIGlmIChpc1NjaGVkdWxlcihzY2hlZHVsZXIpKSB7XG4gICAgICBzY2hlZHVsZXIgPSA8U2NoZWR1bGVyPiBtYXBGbk9yU2NoZWR1bGVyO1xuICAgIH1cblxuICAgIGlmIChpc2ggIT0gbnVsbCkge1xuICAgICAgaWYgKHR5cGVvZiBpc2hbJCRvYnNlcnZhYmxlXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBpZiAoaXNoIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSAmJiAhc2NoZWR1bGVyKSB7XG4gICAgICAgICAgcmV0dXJuIGlzaDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IEZyb21PYnNlcnZhYmxlPFQ+KGlzaCwgc2NoZWR1bGVyKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShpc2gpKSB7XG4gICAgICAgIHJldHVybiBuZXcgQXJyYXlPYnNlcnZhYmxlPFQ+KGlzaCwgc2NoZWR1bGVyKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNQcm9taXNlKGlzaCkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlT2JzZXJ2YWJsZTxUPihpc2gsIHNjaGVkdWxlcik7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpc2hbJCRpdGVyYXRvcl0gPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGlzaCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJdGVyYXRvck9ic2VydmFibGU8VD4oPGFueT5pc2gsIG51bGwsIG51bGwsIHNjaGVkdWxlcik7XG4gICAgICB9IGVsc2UgaWYgKGlzQXJyYXlMaWtlKGlzaCkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBcnJheUxpa2VPYnNlcnZhYmxlKGlzaCwgbWFwRm4sIHRoaXNBcmcsIHNjaGVkdWxlcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigoaXNoICE9PSBudWxsICYmIHR5cGVvZiBpc2ggfHwgaXNoKSArICcgaXMgbm90IG9ic2VydmFibGUnKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4pIHtcbiAgICBjb25zdCBpc2ggPSB0aGlzLmlzaDtcbiAgICBjb25zdCBzY2hlZHVsZXIgPSB0aGlzLnNjaGVkdWxlcjtcbiAgICBpZiAoc2NoZWR1bGVyID09IG51bGwpIHtcbiAgICAgIHJldHVybiBpc2hbJCRvYnNlcnZhYmxlXSgpLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGlzaFskJG9ic2VydmFibGVdKCkuc3Vic2NyaWJlKG5ldyBPYnNlcnZlT25TdWJzY3JpYmVyKHN1YnNjcmliZXIsIHNjaGVkdWxlciwgMCkpO1xuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
