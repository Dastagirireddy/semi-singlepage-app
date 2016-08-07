System.register(['../Observable', '../util/tryCatch', '../util/errorObject', '../AsyncSubject'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Observable_1, tryCatch_1, errorObject_1, AsyncSubject_1;
    var BoundCallbackObservable;
    function dispatchNext(arg) {
        var value = arg.value, subject = arg.subject;
        subject.next(value);
        subject.complete();
    }
    function dispatchError(arg) {
        var err = arg.err, subject = arg.subject;
        subject.error(err);
    }
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (tryCatch_1_1) {
                tryCatch_1 = tryCatch_1_1;
            },
            function (errorObject_1_1) {
                errorObject_1 = errorObject_1_1;
            },
            function (AsyncSubject_1_1) {
                AsyncSubject_1 = AsyncSubject_1_1;
            }],
        execute: function() {
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @extends {Ignored}
             * @hide true
             */
            BoundCallbackObservable = (function (_super) {
                __extends(BoundCallbackObservable, _super);
                function BoundCallbackObservable(callbackFunc, selector, args, scheduler) {
                    _super.call(this);
                    this.callbackFunc = callbackFunc;
                    this.selector = selector;
                    this.args = args;
                    this.scheduler = scheduler;
                }
                /* tslint:enable:max-line-length */
                /**
                 * Converts a callback API to a function that returns an Observable.
                 *
                 * <span class="informal">Give it a function `f` of type `f(x, callback)` and
                 * it will return a function `g` that when called as `g(x)` will output an
                 * Observable.</span>
                 *
                 * `bindCallback` is not an operator because its input and output are not
                 * Observables. The input is a function `func` with some parameters, but the
                 * last parameter must be a callback function that `func` calls when it is
                 * done. The output of `bindCallback` is a function that takes the same
                 * parameters as `func`, except the last one (the callback). When the output
                 * function is called with arguments, it will return an Observable where the
                 * results will be delivered to.
                 *
                 * @example <caption>Convert jQuery's getJSON to an Observable API</caption>
                 * // Suppose we have jQuery.getJSON('/my/url', callback)
                 * var getJSONAsObservable = Rx.Observable.bindCallback(jQuery.getJSON);
                 * var result = getJSONAsObservable('/my/url');
                 * result.subscribe(x => console.log(x), e => console.error(e));
                 *
                 * @see {@link bindNodeCallback}
                 * @see {@link from}
                 * @see {@link fromPromise}
                 *
                 * @param {function} func Function with a callback as the last parameter.
                 * @param {function} selector A function which takes the arguments from the
                 * callback and maps those a value to emit on the output Observable.
                 * @param {Scheduler} [scheduler] The scheduler on which to schedule the
                 * callbacks.
                 * @return {function(...params: *): Observable} A function which returns the
                 * Observable that delivers the same values the callback would deliver.
                 * @static true
                 * @name bindCallback
                 * @owner Observable
                 */
                BoundCallbackObservable.create = function (func, selector, scheduler) {
                    if (selector === void 0) { selector = undefined; }
                    return function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i - 0] = arguments[_i];
                        }
                        return new BoundCallbackObservable(func, selector, args, scheduler);
                    };
                };
                BoundCallbackObservable.prototype._subscribe = function (subscriber) {
                    var callbackFunc = this.callbackFunc;
                    var args = this.args;
                    var scheduler = this.scheduler;
                    var subject = this.subject;
                    if (!scheduler) {
                        if (!subject) {
                            subject = this.subject = new AsyncSubject_1.AsyncSubject();
                            var handler = function handlerFn() {
                                var innerArgs = [];
                                for (var _i = 0; _i < arguments.length; _i++) {
                                    innerArgs[_i - 0] = arguments[_i];
                                }
                                var source = handlerFn.source;
                                var selector = source.selector, subject = source.subject;
                                if (selector) {
                                    var result_1 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
                                    if (result_1 === errorObject_1.errorObject) {
                                        subject.error(errorObject_1.errorObject.e);
                                    }
                                    else {
                                        subject.next(result_1);
                                        subject.complete();
                                    }
                                }
                                else {
                                    subject.next(innerArgs.length === 1 ? innerArgs[0] : innerArgs);
                                    subject.complete();
                                }
                            };
                            // use named function instance to avoid closure.
                            handler.source = this;
                            var result = tryCatch_1.tryCatch(callbackFunc).apply(this, args.concat(handler));
                            if (result === errorObject_1.errorObject) {
                                subject.error(errorObject_1.errorObject.e);
                            }
                        }
                        return subject.subscribe(subscriber);
                    }
                    else {
                        return scheduler.schedule(BoundCallbackObservable.dispatch, 0, { source: this, subscriber: subscriber });
                    }
                };
                BoundCallbackObservable.dispatch = function (state) {
                    var self = this;
                    var source = state.source, subscriber = state.subscriber;
                    var callbackFunc = source.callbackFunc, args = source.args, scheduler = source.scheduler;
                    var subject = source.subject;
                    if (!subject) {
                        subject = source.subject = new AsyncSubject_1.AsyncSubject();
                        var handler = function handlerFn() {
                            var innerArgs = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                innerArgs[_i - 0] = arguments[_i];
                            }
                            var source = handlerFn.source;
                            var selector = source.selector, subject = source.subject;
                            if (selector) {
                                var result_2 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
                                if (result_2 === errorObject_1.errorObject) {
                                    self.add(scheduler.schedule(dispatchError, 0, { err: errorObject_1.errorObject.e, subject: subject }));
                                }
                                else {
                                    self.add(scheduler.schedule(dispatchNext, 0, { value: result_2, subject: subject }));
                                }
                            }
                            else {
                                var value = innerArgs.length === 1 ? innerArgs[0] : innerArgs;
                                self.add(scheduler.schedule(dispatchNext, 0, { value: value, subject: subject }));
                            }
                        };
                        // use named function to pass values in without closure
                        handler.source = source;
                        var result = tryCatch_1.tryCatch(callbackFunc).apply(this, args.concat(handler));
                        if (result === errorObject_1.errorObject) {
                            subject.error(errorObject_1.errorObject.e);
                        }
                    }
                    self.add(subject.subscribe(subscriber));
                };
                return BoundCallbackObservable;
            }(Observable_1.Observable));
            exports_1("BoundCallbackObservable", BoundCallbackObservable);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29ic2VydmFibGUvQm91bmRDYWxsYmFja09ic2VydmFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQXNLQSxzQkFBeUIsR0FBdUI7UUFDdEMscUJBQUssRUFBRSxxQkFBTyxDQUFTO1FBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEIsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFNRCx1QkFBMEIsR0FBd0I7UUFDeEMsaUJBQUcsRUFBRSxxQkFBTyxDQUFTO1FBQzdCLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztZQTNLRDs7OztlQUlHO1lBQ0g7Z0JBQWdELDJDQUFhO2dCQWtFM0QsaUNBQW9CLFlBQXNCLEVBQ3RCLFFBQWtCLEVBQ2xCLElBQVcsRUFDWCxTQUFvQjtvQkFDdEMsaUJBQU8sQ0FBQztvQkFKVSxpQkFBWSxHQUFaLFlBQVksQ0FBVTtvQkFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtvQkFDbEIsU0FBSSxHQUFKLElBQUksQ0FBTztvQkFDWCxjQUFTLEdBQVQsU0FBUyxDQUFXO2dCQUV4QyxDQUFDO2dCQW5ERCxtQ0FBbUM7Z0JBRW5DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQkFtQ0c7Z0JBQ0ksOEJBQU0sR0FBYixVQUFpQixJQUFjLEVBQ2QsUUFBcUMsRUFDckMsU0FBcUI7b0JBRHJCLHdCQUFxQyxHQUFyQyxvQkFBcUM7b0JBRXBELE1BQU0sQ0FBQzt3QkFBQyxjQUFjOzZCQUFkLFdBQWMsQ0FBZCxzQkFBYyxDQUFkLElBQWM7NEJBQWQsNkJBQWM7O3dCQUNwQixNQUFNLENBQUMsSUFBSSx1QkFBdUIsQ0FBSSxJQUFJLEVBQU8sUUFBUSxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztvQkFDOUUsQ0FBQyxDQUFDO2dCQUNKLENBQUM7Z0JBU1MsNENBQVUsR0FBcEIsVUFBcUIsVUFBK0I7b0JBQ2xELElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7b0JBQ3ZDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQ3ZCLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7b0JBQ2pDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBRTNCLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDZixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7NEJBQ2IsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSwyQkFBWSxFQUFLLENBQUM7NEJBQy9DLElBQU0sT0FBTyxHQUFHO2dDQUFtQixtQkFBbUI7cUNBQW5CLFdBQW1CLENBQW5CLHNCQUFtQixDQUFuQixJQUFtQjtvQ0FBbkIsa0NBQW1COztnQ0FDcEQsSUFBTSxNQUFNLEdBQVMsU0FBVSxDQUFDLE1BQU0sQ0FBQztnQ0FDL0IsOEJBQVEsRUFBRSx3QkFBTyxDQUFZO2dDQUNyQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29DQUNiLElBQU0sUUFBTSxHQUFHLG1CQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztvQ0FDekQsRUFBRSxDQUFDLENBQUMsUUFBTSxLQUFLLHlCQUFXLENBQUMsQ0FBQyxDQUFDO3dDQUMzQixPQUFPLENBQUMsS0FBSyxDQUFDLHlCQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBQ2pDLENBQUM7b0NBQUMsSUFBSSxDQUFDLENBQUM7d0NBQ0osT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFNLENBQUMsQ0FBQzt3Q0FDckIsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO29DQUNyQixDQUFDO2dDQUNILENBQUM7Z0NBQUMsSUFBSSxDQUFDLENBQUM7b0NBQ04sT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUM7b0NBQ2hFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQ0FDckIsQ0FBQzs0QkFDSCxDQUFDLENBQUM7NEJBQ0YsZ0RBQWdEOzRCQUMxQyxPQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzs0QkFFN0IsSUFBTSxNQUFNLEdBQUcsbUJBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs0QkFDeEUsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLHlCQUFXLENBQUMsQ0FBQyxDQUFDO2dDQUMzQixPQUFPLENBQUMsS0FBSyxDQUFDLHlCQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQy9CLENBQUM7d0JBQ0gsQ0FBQzt3QkFDRCxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDdkMsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxZQUFBLFVBQVUsRUFBRSxDQUFDLENBQUM7b0JBQy9GLENBQUM7Z0JBQ0gsQ0FBQztnQkFFTSxnQ0FBUSxHQUFmLFVBQW1CLEtBQXdFO29CQUN6RixJQUFNLElBQUksR0FBdUIsSUFBSyxDQUFDO29CQUMvQix5QkFBTSxFQUFFLDZCQUFVLENBQVc7b0JBQzdCLHNDQUFZLEVBQUUsa0JBQUksRUFBRSw0QkFBUyxDQUFZO29CQUNqRCxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO29CQUU3QixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQ2IsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSwyQkFBWSxFQUFLLENBQUM7d0JBRWpELElBQU0sT0FBTyxHQUFHOzRCQUFtQixtQkFBbUI7aUNBQW5CLFdBQW1CLENBQW5CLHNCQUFtQixDQUFuQixJQUFtQjtnQ0FBbkIsa0NBQW1COzs0QkFDcEQsSUFBTSxNQUFNLEdBQVMsU0FBVSxDQUFDLE1BQU0sQ0FBQzs0QkFDL0IsOEJBQVEsRUFBRSx3QkFBTyxDQUFZOzRCQUNyQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dDQUNiLElBQU0sUUFBTSxHQUFHLG1CQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztnQ0FDekQsRUFBRSxDQUFDLENBQUMsUUFBTSxLQUFLLHlCQUFXLENBQUMsQ0FBQyxDQUFDO29DQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSx5QkFBVyxDQUFDLENBQUMsRUFBRSxTQUFBLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztnQ0FDbEYsQ0FBQztnQ0FBQyxJQUFJLENBQUMsQ0FBQztvQ0FDTixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFNLEVBQUUsU0FBQSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0NBQzVFLENBQUM7NEJBQ0gsQ0FBQzs0QkFBQyxJQUFJLENBQUMsQ0FBQztnQ0FDTixJQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDO2dDQUNoRSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLE9BQUEsS0FBSyxFQUFFLFNBQUEsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUNwRSxDQUFDO3dCQUNILENBQUMsQ0FBQzt3QkFDRix1REFBdUQ7d0JBQ2pELE9BQVEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO3dCQUUvQixJQUFNLE1BQU0sR0FBRyxtQkFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO3dCQUN4RSxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUsseUJBQVcsQ0FBQyxDQUFDLENBQUM7NEJBQzNCLE9BQU8sQ0FBQyxLQUFLLENBQUMseUJBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDL0IsQ0FBQztvQkFDSCxDQUFDO29CQUVELElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxDQUFDO2dCQUNILDhCQUFDO1lBQUQsQ0FuSkEsQUFtSkMsQ0FuSitDLHVCQUFVLEdBbUp6RDtZQW5KRCw2REFtSkMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9yeGpzL3NyYy9vYnNlcnZhYmxlL0JvdW5kQ2FsbGJhY2tPYnNlcnZhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7U3Vic2NyaWJlcn0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7U2NoZWR1bGVyfSBmcm9tICcuLi9TY2hlZHVsZXInO1xuaW1wb3J0IHt0cnlDYXRjaH0gZnJvbSAnLi4vdXRpbC90cnlDYXRjaCc7XG5pbXBvcnQge2Vycm9yT2JqZWN0fSBmcm9tICcuLi91dGlsL2Vycm9yT2JqZWN0JztcbmltcG9ydCB7QXN5bmNTdWJqZWN0fSBmcm9tICcuLi9Bc3luY1N1YmplY3QnO1xuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqIEBoaWRlIHRydWVcbiAqL1xuZXhwb3J0IGNsYXNzIEJvdW5kQ2FsbGJhY2tPYnNlcnZhYmxlPFQ+IGV4dGVuZHMgT2JzZXJ2YWJsZTxUPiB7XG4gIHN1YmplY3Q6IEFzeW5jU3ViamVjdDxUPjtcblxuICAvKiB0c2xpbnQ6ZGlzYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbiAgc3RhdGljIGNyZWF0ZTxSPihjYWxsYmFja0Z1bmM6IChjYWxsYmFjazogKHJlc3VsdDogUikgPT4gYW55KSA9PiBhbnksIHNlbGVjdG9yPzogdm9pZCwgc2NoZWR1bGVyPzogU2NoZWR1bGVyKTogKCkgPT4gT2JzZXJ2YWJsZTxSPjtcbiAgc3RhdGljIGNyZWF0ZTxULCBSPihjYWxsYmFja0Z1bmM6ICh2MTogVCwgY2FsbGJhY2s6IChyZXN1bHQ6IFIpID0+IGFueSkgPT4gYW55LCBzZWxlY3Rvcj86IHZvaWQsIHNjaGVkdWxlcj86IFNjaGVkdWxlcik6ICh2MTogVCkgPT4gT2JzZXJ2YWJsZTxSPjtcbiAgc3RhdGljIGNyZWF0ZTxULCBUMiwgUj4oY2FsbGJhY2tGdW5jOiAodjE6IFQsIHYyOiBUMiwgY2FsbGJhY2s6IChyZXN1bHQ6IFIpID0+IGFueSkgPT4gYW55LCBzZWxlY3Rvcj86IHZvaWQsIHNjaGVkdWxlcj86IFNjaGVkdWxlcik6ICh2MTogVCwgdjI6IFQyKSA9PiBPYnNlcnZhYmxlPFI+O1xuICBzdGF0aWMgY3JlYXRlPFQsIFQyLCBUMywgUj4oY2FsbGJhY2tGdW5jOiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzLCBjYWxsYmFjazogKHJlc3VsdDogUikgPT4gYW55KSA9PiBhbnksIHNlbGVjdG9yPzogdm9pZCwgc2NoZWR1bGVyPzogU2NoZWR1bGVyKTogKHYxOiBULCB2MjogVDIsIHYzOiBUMykgPT4gT2JzZXJ2YWJsZTxSPjtcbiAgc3RhdGljIGNyZWF0ZTxULCBUMiwgVDMsIFQ0LCBSPihjYWxsYmFja0Z1bmM6ICh2MTogVCwgdjI6IFQyLCB2MzogVDMsIHY0OiBUNCwgY2FsbGJhY2s6IChyZXN1bHQ6IFIpID0+IGFueSkgPT4gYW55LCBzZWxlY3Rvcj86IHZvaWQsIHNjaGVkdWxlcj86IFNjaGVkdWxlcik6ICh2MTogVCwgdjI6IFQyLCB2MzogVDMsIHY0OiBUNCkgPT4gT2JzZXJ2YWJsZTxSPjtcbiAgc3RhdGljIGNyZWF0ZTxULCBUMiwgVDMsIFQ0LCBUNSwgUj4oY2FsbGJhY2tGdW5jOiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzLCB2NDogVDQsIHY1OiBUNSwgY2FsbGJhY2s6IChyZXN1bHQ6IFIpID0+IGFueSkgPT4gYW55LCBzZWxlY3Rvcj86IHZvaWQsIHNjaGVkdWxlcj86IFNjaGVkdWxlcik6ICh2MTogVCwgdjI6IFQyLCB2MzogVDMsIHY0OiBUNCwgdjU6IFQ1KSA9PiBPYnNlcnZhYmxlPFI+O1xuICBzdGF0aWMgY3JlYXRlPFQsIFQyLCBUMywgVDQsIFQ1LCBUNiwgUj4oY2FsbGJhY2tGdW5jOiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzLCB2NDogVDQsIHY1OiBUNSwgdjY6IFQ2LCBjYWxsYmFjazogKHJlc3VsdDogUikgPT4gYW55KSA9PiBhbnksIHNlbGVjdG9yPzogdm9pZCwgc2NoZWR1bGVyPzogU2NoZWR1bGVyKTogKHYxOiBULCB2MjogVDIsIHYzOiBUMywgdjQ6IFQ0LCB2NTogVDUsIHY2OiBUNikgPT4gT2JzZXJ2YWJsZTxSPjtcbiAgc3RhdGljIGNyZWF0ZTxSPihjYWxsYmFja0Z1bmM6IChjYWxsYmFjazogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnkpID0+IGFueSwgc2VsZWN0b3I6ICguLi5hcmdzOiBhbnlbXSkgPT4gUiwgc2NoZWR1bGVyPzogU2NoZWR1bGVyKTogKCkgPT4gT2JzZXJ2YWJsZTxSPjtcbiAgc3RhdGljIGNyZWF0ZTxULCBSPihjYWxsYmFja0Z1bmM6ICh2MTogVCwgY2FsbGJhY2s6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KSA9PiBhbnksIHNlbGVjdG9yOiAoLi4uYXJnczogYW55W10pID0+IFIsIHNjaGVkdWxlcj86IFNjaGVkdWxlcik6ICh2MTogVCkgPT4gT2JzZXJ2YWJsZTxSPjtcbiAgc3RhdGljIGNyZWF0ZTxULCBUMiwgUj4oY2FsbGJhY2tGdW5jOiAodjE6IFQsIHYyOiBUMiwgY2FsbGJhY2s6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KSA9PiBhbnksIHNlbGVjdG9yOiAoLi4uYXJnczogYW55W10pID0+IFIsIHNjaGVkdWxlcj86IFNjaGVkdWxlcik6ICh2MTogVCwgdjI6IFQyKSA9PiBPYnNlcnZhYmxlPFI+O1xuICBzdGF0aWMgY3JlYXRlPFQsIFQyLCBUMywgUj4oY2FsbGJhY2tGdW5jOiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzLCBjYWxsYmFjazogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnkpID0+IGFueSwgc2VsZWN0b3I6ICguLi5hcmdzOiBhbnlbXSkgPT4gUiwgc2NoZWR1bGVyPzogU2NoZWR1bGVyKTogKHYxOiBULCB2MjogVDIsIHYzOiBUMykgPT4gT2JzZXJ2YWJsZTxSPjtcbiAgc3RhdGljIGNyZWF0ZTxULCBUMiwgVDMsIFQ0LCBSPihjYWxsYmFja0Z1bmM6ICh2MTogVCwgdjI6IFQyLCB2MzogVDMsIHY0OiBUNCwgY2FsbGJhY2s6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KSA9PiBhbnksIHNlbGVjdG9yOiAoLi4uYXJnczogYW55W10pID0+IFIsIHNjaGVkdWxlcj86IFNjaGVkdWxlcik6ICh2MTogVCwgdjI6IFQyLCB2MzogVDMsIHY0OiBUNCkgPT4gT2JzZXJ2YWJsZTxSPjtcbiAgc3RhdGljIGNyZWF0ZTxULCBUMiwgVDMsIFQ0LCBUNSwgUj4oY2FsbGJhY2tGdW5jOiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzLCB2NDogVDQsIHY1OiBUNSwgY2FsbGJhY2s6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KSA9PiBhbnksIHNlbGVjdG9yOiAoLi4uYXJnczogYW55W10pID0+IFIsIHNjaGVkdWxlcj86IFNjaGVkdWxlcik6ICh2MTogVCwgdjI6IFQyLCB2MzogVDMsIHY0OiBUNCwgdjU6IFQ1KSA9PiBPYnNlcnZhYmxlPFI+O1xuICBzdGF0aWMgY3JlYXRlPFQsIFQyLCBUMywgVDQsIFQ1LCBUNiwgUj4oY2FsbGJhY2tGdW5jOiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzLCB2NDogVDQsIHY1OiBUNSwgdjY6IFQ2LCBjYWxsYmFjazogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnkpID0+IGFueSwgc2VsZWN0b3I6ICguLi5hcmdzOiBhbnlbXSkgPT4gUiwgc2NoZWR1bGVyPzogU2NoZWR1bGVyKTogKHYxOiBULCB2MjogVDIsIHYzOiBUMywgdjQ6IFQ0LCB2NTogVDUsIHY2OiBUNikgPT4gT2JzZXJ2YWJsZTxSPjtcbiAgc3RhdGljIGNyZWF0ZTxUPihjYWxsYmFja0Z1bmM6IEZ1bmN0aW9uLCBzZWxlY3Rvcj86IHZvaWQsIHNjaGVkdWxlcj86IFNjaGVkdWxlcik6ICguLi5hcmdzOiBhbnlbXSkgPT4gT2JzZXJ2YWJsZTxUPjtcbiAgc3RhdGljIGNyZWF0ZTxUPihjYWxsYmFja0Z1bmM6IEZ1bmN0aW9uLCBzZWxlY3Rvcj86ICguLi5hcmdzOiBhbnlbXSkgPT4gVCwgc2NoZWR1bGVyPzogU2NoZWR1bGVyKTogKC4uLmFyZ3M6IGFueVtdKSA9PiBPYnNlcnZhYmxlPFQ+O1xuICAvKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhIGNhbGxiYWNrIEFQSSB0byBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhbiBPYnNlcnZhYmxlLlxuICAgKlxuICAgKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+R2l2ZSBpdCBhIGZ1bmN0aW9uIGBmYCBvZiB0eXBlIGBmKHgsIGNhbGxiYWNrKWAgYW5kXG4gICAqIGl0IHdpbGwgcmV0dXJuIGEgZnVuY3Rpb24gYGdgIHRoYXQgd2hlbiBjYWxsZWQgYXMgYGcoeClgIHdpbGwgb3V0cHV0IGFuXG4gICAqIE9ic2VydmFibGUuPC9zcGFuPlxuICAgKlxuICAgKiBgYmluZENhbGxiYWNrYCBpcyBub3QgYW4gb3BlcmF0b3IgYmVjYXVzZSBpdHMgaW5wdXQgYW5kIG91dHB1dCBhcmUgbm90XG4gICAqIE9ic2VydmFibGVzLiBUaGUgaW5wdXQgaXMgYSBmdW5jdGlvbiBgZnVuY2Agd2l0aCBzb21lIHBhcmFtZXRlcnMsIGJ1dCB0aGVcbiAgICogbGFzdCBwYXJhbWV0ZXIgbXVzdCBiZSBhIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgYGZ1bmNgIGNhbGxzIHdoZW4gaXQgaXNcbiAgICogZG9uZS4gVGhlIG91dHB1dCBvZiBgYmluZENhbGxiYWNrYCBpcyBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgdGhlIHNhbWVcbiAgICogcGFyYW1ldGVycyBhcyBgZnVuY2AsIGV4Y2VwdCB0aGUgbGFzdCBvbmUgKHRoZSBjYWxsYmFjaykuIFdoZW4gdGhlIG91dHB1dFxuICAgKiBmdW5jdGlvbiBpcyBjYWxsZWQgd2l0aCBhcmd1bWVudHMsIGl0IHdpbGwgcmV0dXJuIGFuIE9ic2VydmFibGUgd2hlcmUgdGhlXG4gICAqIHJlc3VsdHMgd2lsbCBiZSBkZWxpdmVyZWQgdG8uXG4gICAqXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPkNvbnZlcnQgalF1ZXJ5J3MgZ2V0SlNPTiB0byBhbiBPYnNlcnZhYmxlIEFQSTwvY2FwdGlvbj5cbiAgICogLy8gU3VwcG9zZSB3ZSBoYXZlIGpRdWVyeS5nZXRKU09OKCcvbXkvdXJsJywgY2FsbGJhY2spXG4gICAqIHZhciBnZXRKU09OQXNPYnNlcnZhYmxlID0gUnguT2JzZXJ2YWJsZS5iaW5kQ2FsbGJhY2soalF1ZXJ5LmdldEpTT04pO1xuICAgKiB2YXIgcmVzdWx0ID0gZ2V0SlNPTkFzT2JzZXJ2YWJsZSgnL215L3VybCcpO1xuICAgKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCksIGUgPT4gY29uc29sZS5lcnJvcihlKSk7XG4gICAqXG4gICAqIEBzZWUge0BsaW5rIGJpbmROb2RlQ2FsbGJhY2t9XG4gICAqIEBzZWUge0BsaW5rIGZyb219XG4gICAqIEBzZWUge0BsaW5rIGZyb21Qcm9taXNlfVxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIEZ1bmN0aW9uIHdpdGggYSBjYWxsYmFjayBhcyB0aGUgbGFzdCBwYXJhbWV0ZXIuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IHNlbGVjdG9yIEEgZnVuY3Rpb24gd2hpY2ggdGFrZXMgdGhlIGFyZ3VtZW50cyBmcm9tIHRoZVxuICAgKiBjYWxsYmFjayBhbmQgbWFwcyB0aG9zZSBhIHZhbHVlIHRvIGVtaXQgb24gdGhlIG91dHB1dCBPYnNlcnZhYmxlLlxuICAgKiBAcGFyYW0ge1NjaGVkdWxlcn0gW3NjaGVkdWxlcl0gVGhlIHNjaGVkdWxlciBvbiB3aGljaCB0byBzY2hlZHVsZSB0aGVcbiAgICogY2FsbGJhY2tzLlxuICAgKiBAcmV0dXJuIHtmdW5jdGlvbiguLi5wYXJhbXM6ICopOiBPYnNlcnZhYmxlfSBBIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgdGhlXG4gICAqIE9ic2VydmFibGUgdGhhdCBkZWxpdmVycyB0aGUgc2FtZSB2YWx1ZXMgdGhlIGNhbGxiYWNrIHdvdWxkIGRlbGl2ZXIuXG4gICAqIEBzdGF0aWMgdHJ1ZVxuICAgKiBAbmFtZSBiaW5kQ2FsbGJhY2tcbiAgICogQG93bmVyIE9ic2VydmFibGVcbiAgICovXG4gIHN0YXRpYyBjcmVhdGU8VD4oZnVuYzogRnVuY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6IEZ1bmN0aW9uIHwgdm9pZCA9IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICBzY2hlZHVsZXI/OiBTY2hlZHVsZXIpOiAoLi4uYXJnczogYW55W10pID0+IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiAoLi4uYXJnczogYW55W10pOiBPYnNlcnZhYmxlPFQ+ID0+IHtcbiAgICAgIHJldHVybiBuZXcgQm91bmRDYWxsYmFja09ic2VydmFibGU8VD4oZnVuYywgPGFueT5zZWxlY3RvciwgYXJncywgc2NoZWR1bGVyKTtcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYWxsYmFja0Z1bmM6IEZ1bmN0aW9uLFxuICAgICAgICAgICAgICBwcml2YXRlIHNlbGVjdG9yOiBGdW5jdGlvbixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBhcmdzOiBhbnlbXSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IFNjaGVkdWxlcikge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3N1YnNjcmliZShzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQgfCBUW10+KTogU3Vic2NyaXB0aW9uIHtcbiAgICBjb25zdCBjYWxsYmFja0Z1bmMgPSB0aGlzLmNhbGxiYWNrRnVuYztcbiAgICBjb25zdCBhcmdzID0gdGhpcy5hcmdzO1xuICAgIGNvbnN0IHNjaGVkdWxlciA9IHRoaXMuc2NoZWR1bGVyO1xuICAgIGxldCBzdWJqZWN0ID0gdGhpcy5zdWJqZWN0O1xuXG4gICAgaWYgKCFzY2hlZHVsZXIpIHtcbiAgICAgIGlmICghc3ViamVjdCkge1xuICAgICAgICBzdWJqZWN0ID0gdGhpcy5zdWJqZWN0ID0gbmV3IEFzeW5jU3ViamVjdDxUPigpO1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gZnVuY3Rpb24gaGFuZGxlckZuKC4uLmlubmVyQXJnczogYW55W10pIHtcbiAgICAgICAgICBjb25zdCBzb3VyY2UgPSAoPGFueT5oYW5kbGVyRm4pLnNvdXJjZTtcbiAgICAgICAgICBjb25zdCB7IHNlbGVjdG9yLCBzdWJqZWN0IH0gPSBzb3VyY2U7XG4gICAgICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB0cnlDYXRjaChzZWxlY3RvcikuYXBwbHkodGhpcywgaW5uZXJBcmdzKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IGVycm9yT2JqZWN0KSB7XG4gICAgICAgICAgICAgIHN1YmplY3QuZXJyb3IoZXJyb3JPYmplY3QuZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc3ViamVjdC5uZXh0KHJlc3VsdCk7XG4gICAgICAgICAgICAgIHN1YmplY3QuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3ViamVjdC5uZXh0KGlubmVyQXJncy5sZW5ndGggPT09IDEgPyBpbm5lckFyZ3NbMF0gOiBpbm5lckFyZ3MpO1xuICAgICAgICAgICAgc3ViamVjdC5jb21wbGV0ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLy8gdXNlIG5hbWVkIGZ1bmN0aW9uIGluc3RhbmNlIHRvIGF2b2lkIGNsb3N1cmUuXG4gICAgICAgICg8YW55PmhhbmRsZXIpLnNvdXJjZSA9IHRoaXM7XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdHJ5Q2F0Y2goY2FsbGJhY2tGdW5jKS5hcHBseSh0aGlzLCBhcmdzLmNvbmNhdChoYW5kbGVyKSk7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IGVycm9yT2JqZWN0KSB7XG4gICAgICAgICAgc3ViamVjdC5lcnJvcihlcnJvck9iamVjdC5lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHN1YmplY3Quc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc2NoZWR1bGVyLnNjaGVkdWxlKEJvdW5kQ2FsbGJhY2tPYnNlcnZhYmxlLmRpc3BhdGNoLCAwLCB7IHNvdXJjZTogdGhpcywgc3Vic2NyaWJlciB9KTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZGlzcGF0Y2g8VD4oc3RhdGU6IHsgc291cmNlOiBCb3VuZENhbGxiYWNrT2JzZXJ2YWJsZTxUPiwgc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPiB9KSB7XG4gICAgY29uc3Qgc2VsZiA9ICg8U3Vic2NyaXB0aW9uPjxhbnk+dGhpcyk7XG4gICAgY29uc3QgeyBzb3VyY2UsIHN1YnNjcmliZXIgfSA9IHN0YXRlO1xuICAgIGNvbnN0IHsgY2FsbGJhY2tGdW5jLCBhcmdzLCBzY2hlZHVsZXIgfSA9IHNvdXJjZTtcbiAgICBsZXQgc3ViamVjdCA9IHNvdXJjZS5zdWJqZWN0O1xuXG4gICAgaWYgKCFzdWJqZWN0KSB7XG4gICAgICBzdWJqZWN0ID0gc291cmNlLnN1YmplY3QgPSBuZXcgQXN5bmNTdWJqZWN0PFQ+KCk7XG5cbiAgICAgIGNvbnN0IGhhbmRsZXIgPSBmdW5jdGlvbiBoYW5kbGVyRm4oLi4uaW5uZXJBcmdzOiBhbnlbXSkge1xuICAgICAgICBjb25zdCBzb3VyY2UgPSAoPGFueT5oYW5kbGVyRm4pLnNvdXJjZTtcbiAgICAgICAgY29uc3QgeyBzZWxlY3Rvciwgc3ViamVjdCB9ID0gc291cmNlO1xuICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSB0cnlDYXRjaChzZWxlY3RvcikuYXBwbHkodGhpcywgaW5uZXJBcmdzKTtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSBlcnJvck9iamVjdCkge1xuICAgICAgICAgICAgc2VsZi5hZGQoc2NoZWR1bGVyLnNjaGVkdWxlKGRpc3BhdGNoRXJyb3IsIDAsIHsgZXJyOiBlcnJvck9iamVjdC5lLCBzdWJqZWN0IH0pKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5hZGQoc2NoZWR1bGVyLnNjaGVkdWxlKGRpc3BhdGNoTmV4dCwgMCwgeyB2YWx1ZTogcmVzdWx0LCBzdWJqZWN0IH0pKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBpbm5lckFyZ3MubGVuZ3RoID09PSAxID8gaW5uZXJBcmdzWzBdIDogaW5uZXJBcmdzO1xuICAgICAgICAgIHNlbGYuYWRkKHNjaGVkdWxlci5zY2hlZHVsZShkaXNwYXRjaE5leHQsIDAsIHsgdmFsdWUsIHN1YmplY3QgfSkpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgLy8gdXNlIG5hbWVkIGZ1bmN0aW9uIHRvIHBhc3MgdmFsdWVzIGluIHdpdGhvdXQgY2xvc3VyZVxuICAgICAgKDxhbnk+aGFuZGxlcikuc291cmNlID0gc291cmNlO1xuXG4gICAgICBjb25zdCByZXN1bHQgPSB0cnlDYXRjaChjYWxsYmFja0Z1bmMpLmFwcGx5KHRoaXMsIGFyZ3MuY29uY2F0KGhhbmRsZXIpKTtcbiAgICAgIGlmIChyZXN1bHQgPT09IGVycm9yT2JqZWN0KSB7XG4gICAgICAgIHN1YmplY3QuZXJyb3IoZXJyb3JPYmplY3QuZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2VsZi5hZGQoc3ViamVjdC5zdWJzY3JpYmUoc3Vic2NyaWJlcikpO1xuICB9XG59XG5cbmludGVyZmFjZSBEaXNwYXRjaE5leHRBcmc8VD4ge1xuICBzdWJqZWN0OiBBc3luY1N1YmplY3Q8VD47XG4gIHZhbHVlOiBUO1xufVxuZnVuY3Rpb24gZGlzcGF0Y2hOZXh0PFQ+KGFyZzogRGlzcGF0Y2hOZXh0QXJnPFQ+KSB7XG4gIGNvbnN0IHsgdmFsdWUsIHN1YmplY3QgfSA9IGFyZztcbiAgc3ViamVjdC5uZXh0KHZhbHVlKTtcbiAgc3ViamVjdC5jb21wbGV0ZSgpO1xufVxuXG5pbnRlcmZhY2UgRGlzcGF0Y2hFcnJvckFyZzxUPiB7XG4gIHN1YmplY3Q6IEFzeW5jU3ViamVjdDxUPjtcbiAgZXJyOiBhbnk7XG59XG5mdW5jdGlvbiBkaXNwYXRjaEVycm9yPFQ+KGFyZzogRGlzcGF0Y2hFcnJvckFyZzxUPikge1xuICBjb25zdCB7IGVyciwgc3ViamVjdCB9ID0gYXJnO1xuICBzdWJqZWN0LmVycm9yKGVycik7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
