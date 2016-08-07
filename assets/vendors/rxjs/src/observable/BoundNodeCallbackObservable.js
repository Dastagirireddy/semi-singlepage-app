System.register(['../Observable', '../util/tryCatch', '../util/errorObject', '../AsyncSubject'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Observable_1, tryCatch_1, errorObject_1, AsyncSubject_1;
    var BoundNodeCallbackObservable;
    function dispatch(state) {
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
                var err = innerArgs.shift();
                if (err) {
                    subject.error(err);
                }
                else if (selector) {
                    var result_1 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
                    if (result_1 === errorObject_1.errorObject) {
                        self.add(scheduler.schedule(dispatchError, 0, { err: errorObject_1.errorObject.e, subject: subject }));
                    }
                    else {
                        self.add(scheduler.schedule(dispatchNext, 0, { value: result_1, subject: subject }));
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
    }
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
            BoundNodeCallbackObservable = (function (_super) {
                __extends(BoundNodeCallbackObservable, _super);
                function BoundNodeCallbackObservable(callbackFunc, selector, args, scheduler) {
                    _super.call(this);
                    this.callbackFunc = callbackFunc;
                    this.selector = selector;
                    this.args = args;
                    this.scheduler = scheduler;
                }
                /* tslint:enable:max-line-length */
                /**
                 * Converts a Node.js-style callback API to a function that returns an
                 * Observable.
                 *
                 * <span class="informal">It's just like {@link bindCallback}, but the
                 * callback is expected to be of type `callback(error, result)`.</span>
                 *
                 * `bindNodeCallback` is not an operator because its input and output are not
                 * Observables. The input is a function `func` with some parameters, but the
                 * last parameter must be a callback function that `func` calls when it is
                 * done. The callback function is expected to follow Node.js conventions,
                 * where the first argument to the callback is an error, while remaining
                 * arguments are the callback result. The output of `bindNodeCallback` is a
                 * function that takes the same parameters as `func`, except the last one (the
                 * callback). When the output function is called with arguments, it will
                 * return an Observable where the results will be delivered to.
                 *
                 * @example <caption>Read a file from the filesystem and get the data as an Observable</caption>
                 * import * as fs from 'fs';
                 * var readFileAsObservable = Rx.Observable.bindNodeCallback(fs.readFile);
                 * var result = readFileAsObservable('./roadNames.txt', 'utf8');
                 * result.subscribe(x => console.log(x), e => console.error(e));
                 *
                 * @see {@link bindCallback}
                 * @see {@link from}
                 * @see {@link fromPromise}
                 *
                 * @param {function} func Function with a callback as the last parameter.
                 * @param {function} selector A function which takes the arguments from the
                 * callback and maps those a value to emit on the output Observable.
                 * @param {Scheduler} [scheduler] The scheduler on which to schedule the
                 * callbacks.
                 * @return {function(...params: *): Observable} A function which returns the
                 * Observable that delivers the same values the Node.js callback would
                 * deliver.
                 * @static true
                 * @name bindNodeCallback
                 * @owner Observable
                 */
                BoundNodeCallbackObservable.create = function (func, selector, scheduler) {
                    if (selector === void 0) { selector = undefined; }
                    return function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i - 0] = arguments[_i];
                        }
                        return new BoundNodeCallbackObservable(func, selector, args, scheduler);
                    };
                };
                BoundNodeCallbackObservable.prototype._subscribe = function (subscriber) {
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
                                var err = innerArgs.shift();
                                if (err) {
                                    subject.error(err);
                                }
                                else if (selector) {
                                    var result_2 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
                                    if (result_2 === errorObject_1.errorObject) {
                                        subject.error(errorObject_1.errorObject.e);
                                    }
                                    else {
                                        subject.next(result_2);
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
                        return scheduler.schedule(dispatch, 0, { source: this, subscriber: subscriber });
                    }
                };
                return BoundNodeCallbackObservable;
            }(Observable_1.Observable));
            exports_1("BoundNodeCallbackObservable", BoundNodeCallbackObservable);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29ic2VydmFibGUvQm91bmROb2RlQ2FsbGJhY2tPYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUE4SEEsa0JBQXFCLEtBQTRFO1FBQy9GLElBQU0sSUFBSSxHQUFtQixJQUFLLENBQUM7UUFDM0IseUJBQU0sRUFBRSw2QkFBVSxDQUFXO1FBQzdCLHNDQUFZLEVBQUUsa0JBQUksRUFBRSw0QkFBUyxDQUFZO1FBQ2pELElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFFN0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2IsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSwyQkFBWSxFQUFLLENBQUM7WUFFakQsSUFBTSxPQUFPLEdBQUc7Z0JBQW1CLG1CQUFtQjtxQkFBbkIsV0FBbUIsQ0FBbkIsc0JBQW1CLENBQW5CLElBQW1CO29CQUFuQixrQ0FBbUI7O2dCQUNwRCxJQUFNLE1BQU0sR0FBUyxTQUFVLENBQUMsTUFBTSxDQUFDO2dCQUMvQiw4QkFBUSxFQUFFLHdCQUFPLENBQVk7Z0JBQ3JDLElBQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFFOUIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDUixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQixDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUNwQixJQUFNLFFBQU0sR0FBRyxtQkFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQ3pELEVBQUUsQ0FBQyxDQUFDLFFBQU0sS0FBSyx5QkFBVyxDQUFDLENBQUMsQ0FBQzt3QkFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FB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O2dDQUFDLElBQUksQ0FBQyxDQUFDO29DQUNOLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDO29DQUNoRSxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7Z0NBQ3JCLENBQUM7NEJBQ0gsQ0FBQyxDQUFDOzRCQUNGLGdEQUFnRDs0QkFDMUMsT0FBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7NEJBRTdCLElBQU0sTUFBTSxHQUFHLG1CQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7NEJBQ3hFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyx5QkFBVyxDQUFDLENBQUMsQ0FBQztnQ0FDM0IsT0FBTyxDQUFDLEtBQUssQ0FBQyx5QkFBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUMvQixDQUFDO3dCQUNILENBQUM7d0JBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3ZDLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsWUFBQSxVQUFVLEVBQUUsQ0FBQyxDQUFDO29CQUN2RSxDQUFDO2dCQUNILENBQUM7Z0JBQ0gsa0NBQUM7WUFBRCxDQS9HQSxBQStHQyxDQS9HbUQsdUJBQVUsR0ErRzdEO1lBL0dELHFFQStHQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29ic2VydmFibGUvQm91bmROb2RlQ2FsbGJhY2tPYnNlcnZhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7U3Vic2NyaWJlcn0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7U2NoZWR1bGVyfSBmcm9tICcuLi9TY2hlZHVsZXInO1xuaW1wb3J0IHt0cnlDYXRjaH0gZnJvbSAnLi4vdXRpbC90cnlDYXRjaCc7XG5pbXBvcnQge2Vycm9yT2JqZWN0fSBmcm9tICcuLi91dGlsL2Vycm9yT2JqZWN0JztcbmltcG9ydCB7QXN5bmNTdWJqZWN0fSBmcm9tICcuLi9Bc3luY1N1YmplY3QnO1xuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqIEBoaWRlIHRydWVcbiAqL1xuZXhwb3J0IGNsYXNzIEJvdW5kTm9kZUNhbGxiYWNrT2JzZXJ2YWJsZTxUPiBleHRlbmRzIE9ic2VydmFibGU8VD4ge1xuICBzdWJqZWN0OiBBc3luY1N1YmplY3Q8VD47XG5cbiAgLyogdHNsaW50OmRpc2FibGU6bWF4LWxpbmUtbGVuZ3RoICovXG4gIHN0YXRpYyBjcmVhdGU8Uj4oY2FsbGJhY2tGdW5jOiAoY2FsbGJhY2s6IChlcnI6IGFueSwgcmVzdWx0OiBSKSA9PiBhbnkpID0+IGFueSwgc2VsZWN0b3I/OiB2b2lkLCBzY2hlZHVsZXI/OiBTY2hlZHVsZXIpOiAoKSA9PiBPYnNlcnZhYmxlPFI+O1xuICBzdGF0aWMgY3JlYXRlPFQsIFI+KGNhbGxiYWNrRnVuYzogKHYxOiBULCBjYWxsYmFjazogKGVycjogYW55LCByZXN1bHQ6IFIpID0+IGFueSkgPT4gYW55LCBzZWxlY3Rvcj86IHZvaWQsIHNjaGVkdWxlcj86IFNjaGVkdWxlcik6ICh2MTogVCkgPT4gT2JzZXJ2YWJsZTxSPjtcbiAgc3RhdGljIGNyZWF0ZTxULCBUMiwgUj4oY2FsbGJhY2tGdW5jOiAodjE6IFQsIHYyOiBUMiwgY2FsbGJhY2s6IChlcnI6IGFueSwgcmVzdWx0OiBSKSA9PiBhbnkpID0+IGFueSwgc2VsZWN0b3I/OiB2b2lkLCBzY2hlZHVsZXI/OiBTY2hlZHVsZXIpOiAodjE6IFQsIHYyOiBUMikgPT4gT2JzZXJ2YWJsZTxSPjtcbiAgc3RhdGljIGNyZWF0ZTxULCBUMiwgVDMsIFI+KGNhbGxiYWNrRnVuYzogKHYxOiBULCB2MjogVDIsIHYzOiBUMywgY2FsbGJhY2s6IChlcnI6IGFueSwgcmVzdWx0OiBSKSA9PiBhbnkpID0+IGFueSwgc2VsZWN0b3I/OiB2b2lkLCBzY2hlZHVsZXI/OiBTY2hlZHVsZXIpOiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzKSA9PiBPYnNlcnZhYmxlPFI+O1xuICBzdGF0aWMgY3JlYXRlPFQsIFQyLCBUMywgVDQsIFI+KGNhbGxiYWNrRnVuYzogKHYxOiBULCB2MjogVDIsIHYzOiBUMywgdjQ6IFQ0LCBjYWxsYmFjazogKGVycjogYW55LCByZXN1bHQ6IFIpID0+IGFueSkgPT4gYW55LCBzZWxlY3Rvcj86IHZvaWQsIHNjaGVkdWxlcj86IFNjaGVkdWxlcik6ICh2MTogVCwgdjI6IFQyLCB2MzogVDMsIHY0OiBUNCkgPT4gT2JzZXJ2YWJsZTxSPjtcbiAgc3RhdGljIGNyZWF0ZTxULCBUMiwgVDMsIFQ0LCBUNSwgUj4oY2FsbGJhY2tGdW5jOiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzLCB2NDogVDQsIHY1OiBUNSwgY2FsbGJhY2s6IChlcnI6IGFueSwgcmVzdWx0OiBSKSA9PiBhbnkpID0+IGFueSwgc2VsZWN0b3I/OiB2b2lkLCBzY2hlZHVsZXI/OiBTY2hlZHVsZXIpOiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzLCB2NDogVDQsIHY1OiBUNSkgPT4gT2JzZXJ2YWJsZTxSPjtcbiAgc3RhdGljIGNyZWF0ZTxULCBUMiwgVDMsIFQ0LCBUNSwgVDYsIFI+KGNhbGxiYWNrRnVuYzogKHYxOiBULCB2MjogVDIsIHYzOiBUMywgdjQ6IFQ0LCB2NTogVDUsIHY2OiBUNiwgY2FsbGJhY2s6IChlcnI6IGFueSwgcmVzdWx0OiBSKSA9PiBhbnkpID0+IGFueSwgc2VsZWN0b3I/OiB2b2lkLCBzY2hlZHVsZXI/OiBTY2hlZHVsZXIpOiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzLCB2NDogVDQsIHY1OiBUNSwgdjY6IFQ2KSA9PiBPYnNlcnZhYmxlPFI+O1xuICBzdGF0aWMgY3JlYXRlPFQ+KGNhbGxiYWNrRnVuYzogRnVuY3Rpb24sIHNlbGVjdG9yPzogdm9pZCwgc2NoZWR1bGVyPzogU2NoZWR1bGVyKTogKC4uLmFyZ3M6IGFueVtdKSA9PiBPYnNlcnZhYmxlPFQ+O1xuICBzdGF0aWMgY3JlYXRlPFQ+KGNhbGxiYWNrRnVuYzogRnVuY3Rpb24sIHNlbGVjdG9yPzogKC4uLmFyZ3M6IGFueVtdKSA9PiBULCBzY2hlZHVsZXI/OiBTY2hlZHVsZXIpOiAoLi4uYXJnczogYW55W10pID0+IE9ic2VydmFibGU8VD47XG4gIC8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgTm9kZS5qcy1zdHlsZSBjYWxsYmFjayBBUEkgdG8gYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYW5cbiAgICogT2JzZXJ2YWJsZS5cbiAgICpcbiAgICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkl0J3MganVzdCBsaWtlIHtAbGluayBiaW5kQ2FsbGJhY2t9LCBidXQgdGhlXG4gICAqIGNhbGxiYWNrIGlzIGV4cGVjdGVkIHRvIGJlIG9mIHR5cGUgYGNhbGxiYWNrKGVycm9yLCByZXN1bHQpYC48L3NwYW4+XG4gICAqXG4gICAqIGBiaW5kTm9kZUNhbGxiYWNrYCBpcyBub3QgYW4gb3BlcmF0b3IgYmVjYXVzZSBpdHMgaW5wdXQgYW5kIG91dHB1dCBhcmUgbm90XG4gICAqIE9ic2VydmFibGVzLiBUaGUgaW5wdXQgaXMgYSBmdW5jdGlvbiBgZnVuY2Agd2l0aCBzb21lIHBhcmFtZXRlcnMsIGJ1dCB0aGVcbiAgICogbGFzdCBwYXJhbWV0ZXIgbXVzdCBiZSBhIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgYGZ1bmNgIGNhbGxzIHdoZW4gaXQgaXNcbiAgICogZG9uZS4gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGlzIGV4cGVjdGVkIHRvIGZvbGxvdyBOb2RlLmpzIGNvbnZlbnRpb25zLFxuICAgKiB3aGVyZSB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlIGNhbGxiYWNrIGlzIGFuIGVycm9yLCB3aGlsZSByZW1haW5pbmdcbiAgICogYXJndW1lbnRzIGFyZSB0aGUgY2FsbGJhY2sgcmVzdWx0LiBUaGUgb3V0cHV0IG9mIGBiaW5kTm9kZUNhbGxiYWNrYCBpcyBhXG4gICAqIGZ1bmN0aW9uIHRoYXQgdGFrZXMgdGhlIHNhbWUgcGFyYW1ldGVycyBhcyBgZnVuY2AsIGV4Y2VwdCB0aGUgbGFzdCBvbmUgKHRoZVxuICAgKiBjYWxsYmFjaykuIFdoZW4gdGhlIG91dHB1dCBmdW5jdGlvbiBpcyBjYWxsZWQgd2l0aCBhcmd1bWVudHMsIGl0IHdpbGxcbiAgICogcmV0dXJuIGFuIE9ic2VydmFibGUgd2hlcmUgdGhlIHJlc3VsdHMgd2lsbCBiZSBkZWxpdmVyZWQgdG8uXG4gICAqXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPlJlYWQgYSBmaWxlIGZyb20gdGhlIGZpbGVzeXN0ZW0gYW5kIGdldCB0aGUgZGF0YSBhcyBhbiBPYnNlcnZhYmxlPC9jYXB0aW9uPlxuICAgKiBpbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG4gICAqIHZhciByZWFkRmlsZUFzT2JzZXJ2YWJsZSA9IFJ4Lk9ic2VydmFibGUuYmluZE5vZGVDYWxsYmFjayhmcy5yZWFkRmlsZSk7XG4gICAqIHZhciByZXN1bHQgPSByZWFkRmlsZUFzT2JzZXJ2YWJsZSgnLi9yb2FkTmFtZXMudHh0JywgJ3V0ZjgnKTtcbiAgICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpLCBlID0+IGNvbnNvbGUuZXJyb3IoZSkpO1xuICAgKlxuICAgKiBAc2VlIHtAbGluayBiaW5kQ2FsbGJhY2t9XG4gICAqIEBzZWUge0BsaW5rIGZyb219XG4gICAqIEBzZWUge0BsaW5rIGZyb21Qcm9taXNlfVxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIEZ1bmN0aW9uIHdpdGggYSBjYWxsYmFjayBhcyB0aGUgbGFzdCBwYXJhbWV0ZXIuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IHNlbGVjdG9yIEEgZnVuY3Rpb24gd2hpY2ggdGFrZXMgdGhlIGFyZ3VtZW50cyBmcm9tIHRoZVxuICAgKiBjYWxsYmFjayBhbmQgbWFwcyB0aG9zZSBhIHZhbHVlIHRvIGVtaXQgb24gdGhlIG91dHB1dCBPYnNlcnZhYmxlLlxuICAgKiBAcGFyYW0ge1NjaGVkdWxlcn0gW3NjaGVkdWxlcl0gVGhlIHNjaGVkdWxlciBvbiB3aGljaCB0byBzY2hlZHVsZSB0aGVcbiAgICogY2FsbGJhY2tzLlxuICAgKiBAcmV0dXJuIHtmdW5jdGlvbiguLi5wYXJhbXM6ICopOiBPYnNlcnZhYmxlfSBBIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgdGhlXG4gICAqIE9ic2VydmFibGUgdGhhdCBkZWxpdmVycyB0aGUgc2FtZSB2YWx1ZXMgdGhlIE5vZGUuanMgY2FsbGJhY2sgd291bGRcbiAgICogZGVsaXZlci5cbiAgICogQHN0YXRpYyB0cnVlXG4gICAqIEBuYW1lIGJpbmROb2RlQ2FsbGJhY2tcbiAgICogQG93bmVyIE9ic2VydmFibGVcbiAgICovXG4gIHN0YXRpYyBjcmVhdGU8VD4oZnVuYzogRnVuY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6IEZ1bmN0aW9uIHwgdm9pZCA9IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICBzY2hlZHVsZXI/OiBTY2hlZHVsZXIpOiAoLi4uYXJnczogYW55W10pID0+IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiAoLi4uYXJnczogYW55W10pOiBPYnNlcnZhYmxlPFQ+ID0+IHtcbiAgICAgIHJldHVybiBuZXcgQm91bmROb2RlQ2FsbGJhY2tPYnNlcnZhYmxlPFQ+KGZ1bmMsIDxhbnk+c2VsZWN0b3IsIGFyZ3MsIHNjaGVkdWxlcik7XG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FsbGJhY2tGdW5jOiBGdW5jdGlvbixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzZWxlY3RvcjogRnVuY3Rpb24sXG4gICAgICAgICAgICAgIHByaXZhdGUgYXJnczogYW55W10sXG4gICAgICAgICAgICAgIHB1YmxpYyBzY2hlZHVsZXI6IFNjaGVkdWxlcikge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3N1YnNjcmliZShzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQgfCBUW10+KTogU3Vic2NyaXB0aW9uIHtcbiAgICBjb25zdCBjYWxsYmFja0Z1bmMgPSB0aGlzLmNhbGxiYWNrRnVuYztcbiAgICBjb25zdCBhcmdzID0gdGhpcy5hcmdzO1xuICAgIGNvbnN0IHNjaGVkdWxlciA9IHRoaXMuc2NoZWR1bGVyO1xuICAgIGxldCBzdWJqZWN0ID0gdGhpcy5zdWJqZWN0O1xuXG4gICAgaWYgKCFzY2hlZHVsZXIpIHtcbiAgICAgIGlmICghc3ViamVjdCkge1xuICAgICAgICBzdWJqZWN0ID0gdGhpcy5zdWJqZWN0ID0gbmV3IEFzeW5jU3ViamVjdDxUPigpO1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gZnVuY3Rpb24gaGFuZGxlckZuKC4uLmlubmVyQXJnczogYW55W10pIHtcbiAgICAgICAgICBjb25zdCBzb3VyY2UgPSAoPGFueT5oYW5kbGVyRm4pLnNvdXJjZTtcbiAgICAgICAgICBjb25zdCB7IHNlbGVjdG9yLCBzdWJqZWN0IH0gPSBzb3VyY2U7XG4gICAgICAgICAgY29uc3QgZXJyID0gaW5uZXJBcmdzLnNoaWZ0KCk7XG5cbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBzdWJqZWN0LmVycm9yKGVycik7XG4gICAgICAgICAgfSBlbHNlIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdHJ5Q2F0Y2goc2VsZWN0b3IpLmFwcGx5KHRoaXMsIGlubmVyQXJncyk7XG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBlcnJvck9iamVjdCkge1xuICAgICAgICAgICAgICBzdWJqZWN0LmVycm9yKGVycm9yT2JqZWN0LmUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc3ViamVjdC5uZXh0KHJlc3VsdCk7XG4gICAgICAgICAgICAgIHN1YmplY3QuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3ViamVjdC5uZXh0KGlubmVyQXJncy5sZW5ndGggPT09IDEgPyBpbm5lckFyZ3NbMF0gOiBpbm5lckFyZ3MpO1xuICAgICAgICAgICAgc3ViamVjdC5jb21wbGV0ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLy8gdXNlIG5hbWVkIGZ1bmN0aW9uIGluc3RhbmNlIHRvIGF2b2lkIGNsb3N1cmUuXG4gICAgICAgICg8YW55PmhhbmRsZXIpLnNvdXJjZSA9IHRoaXM7XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdHJ5Q2F0Y2goY2FsbGJhY2tGdW5jKS5hcHBseSh0aGlzLCBhcmdzLmNvbmNhdChoYW5kbGVyKSk7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IGVycm9yT2JqZWN0KSB7XG4gICAgICAgICAgc3ViamVjdC5lcnJvcihlcnJvck9iamVjdC5lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHN1YmplY3Quc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc2NoZWR1bGVyLnNjaGVkdWxlKGRpc3BhdGNoLCAwLCB7IHNvdXJjZTogdGhpcywgc3Vic2NyaWJlciB9KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZGlzcGF0Y2g8VD4oc3RhdGU6IHsgc291cmNlOiBCb3VuZE5vZGVDYWxsYmFja09ic2VydmFibGU8VD4sIHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4gfSkge1xuICBjb25zdCBzZWxmID0gKDxTdWJzY3JpcHRpb24+IHRoaXMpO1xuICBjb25zdCB7IHNvdXJjZSwgc3Vic2NyaWJlciB9ID0gc3RhdGU7XG4gIGNvbnN0IHsgY2FsbGJhY2tGdW5jLCBhcmdzLCBzY2hlZHVsZXIgfSA9IHNvdXJjZTtcbiAgbGV0IHN1YmplY3QgPSBzb3VyY2Uuc3ViamVjdDtcblxuICBpZiAoIXN1YmplY3QpIHtcbiAgICBzdWJqZWN0ID0gc291cmNlLnN1YmplY3QgPSBuZXcgQXN5bmNTdWJqZWN0PFQ+KCk7XG5cbiAgICBjb25zdCBoYW5kbGVyID0gZnVuY3Rpb24gaGFuZGxlckZuKC4uLmlubmVyQXJnczogYW55W10pIHtcbiAgICAgIGNvbnN0IHNvdXJjZSA9ICg8YW55PmhhbmRsZXJGbikuc291cmNlO1xuICAgICAgY29uc3QgeyBzZWxlY3Rvciwgc3ViamVjdCB9ID0gc291cmNlO1xuICAgICAgY29uc3QgZXJyID0gaW5uZXJBcmdzLnNoaWZ0KCk7XG5cbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgc3ViamVjdC5lcnJvcihlcnIpO1xuICAgICAgfSBlbHNlIGlmIChzZWxlY3Rvcikge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0cnlDYXRjaChzZWxlY3RvcikuYXBwbHkodGhpcywgaW5uZXJBcmdzKTtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gZXJyb3JPYmplY3QpIHtcbiAgICAgICAgICBzZWxmLmFkZChzY2hlZHVsZXIuc2NoZWR1bGUoZGlzcGF0Y2hFcnJvciwgMCwgeyBlcnI6IGVycm9yT2JqZWN0LmUsIHN1YmplY3QgfSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGYuYWRkKHNjaGVkdWxlci5zY2hlZHVsZShkaXNwYXRjaE5leHQsIDAsIHsgdmFsdWU6IHJlc3VsdCwgc3ViamVjdCB9KSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gaW5uZXJBcmdzLmxlbmd0aCA9PT0gMSA/IGlubmVyQXJnc1swXSA6IGlubmVyQXJncztcbiAgICAgICAgc2VsZi5hZGQoc2NoZWR1bGVyLnNjaGVkdWxlKGRpc3BhdGNoTmV4dCwgMCwgeyB2YWx1ZSwgc3ViamVjdCB9KSk7XG4gICAgICB9XG4gICAgfTtcbiAgICAvLyB1c2UgbmFtZWQgZnVuY3Rpb24gdG8gcGFzcyB2YWx1ZXMgaW4gd2l0aG91dCBjbG9zdXJlXG4gICAgKDxhbnk+aGFuZGxlcikuc291cmNlID0gc291cmNlO1xuXG4gICAgY29uc3QgcmVzdWx0ID0gdHJ5Q2F0Y2goY2FsbGJhY2tGdW5jKS5hcHBseSh0aGlzLCBhcmdzLmNvbmNhdChoYW5kbGVyKSk7XG4gICAgaWYgKHJlc3VsdCA9PT0gZXJyb3JPYmplY3QpIHtcbiAgICAgIHN1YmplY3QuZXJyb3IoZXJyb3JPYmplY3QuZSk7XG4gICAgfVxuICB9XG5cbiAgc2VsZi5hZGQoc3ViamVjdC5zdWJzY3JpYmUoc3Vic2NyaWJlcikpO1xufVxuXG5pbnRlcmZhY2UgRGlzcGF0Y2hOZXh0QXJnPFQ+IHtcbiAgc3ViamVjdDogQXN5bmNTdWJqZWN0PFQ+O1xuICB2YWx1ZTogVDtcbn1cbmZ1bmN0aW9uIGRpc3BhdGNoTmV4dDxUPihhcmc6IERpc3BhdGNoTmV4dEFyZzxUPikge1xuICBjb25zdCB7IHZhbHVlLCBzdWJqZWN0IH0gPSBhcmc7XG4gIHN1YmplY3QubmV4dCh2YWx1ZSk7XG4gIHN1YmplY3QuY29tcGxldGUoKTtcbn1cblxuaW50ZXJmYWNlIERpc3BhdGNoRXJyb3JBcmc8VD4ge1xuICBzdWJqZWN0OiBBc3luY1N1YmplY3Q8VD47XG4gIGVycjogYW55O1xufVxuZnVuY3Rpb24gZGlzcGF0Y2hFcnJvcjxUPihhcmc6IERpc3BhdGNoRXJyb3JBcmc8VD4pIHtcbiAgY29uc3QgeyBlcnIsIHN1YmplY3QgfSA9IGFyZztcbiAgc3ViamVjdC5lcnJvcihlcnIpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
