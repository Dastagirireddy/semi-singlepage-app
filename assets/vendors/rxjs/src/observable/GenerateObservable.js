System.register(['../Observable', '../util/isScheduler'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Observable_1, isScheduler_1;
    var selfSelector, GenerateObservable;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (isScheduler_1_1) {
                isScheduler_1 = isScheduler_1_1;
            }],
        execute: function() {
            selfSelector = function (value) { return value; };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @extends {Ignored}
             * @hide true
             */
            GenerateObservable = (function (_super) {
                __extends(GenerateObservable, _super);
                function GenerateObservable(initialState, condition, iterate, resultSelector, scheduler) {
                    _super.call(this);
                    this.initialState = initialState;
                    this.condition = condition;
                    this.iterate = iterate;
                    this.resultSelector = resultSelector;
                    this.scheduler = scheduler;
                }
                GenerateObservable.create = function (initialStateOrOptions, condition, iterate, resultSelectorOrObservable, scheduler) {
                    if (arguments.length == 1) {
                        return new GenerateObservable(initialStateOrOptions.initialState, initialStateOrOptions.condition, initialStateOrOptions.iterate, initialStateOrOptions.resultSelector || selfSelector, initialStateOrOptions.scheduler);
                    }
                    if (resultSelectorOrObservable === undefined || isScheduler_1.isScheduler(resultSelectorOrObservable)) {
                        return new GenerateObservable(initialStateOrOptions, condition, iterate, selfSelector, resultSelectorOrObservable);
                    }
                    return new GenerateObservable(initialStateOrOptions, condition, iterate, resultSelectorOrObservable, scheduler);
                };
                GenerateObservable.prototype._subscribe = function (subscriber) {
                    var state = this.initialState;
                    if (this.scheduler) {
                        return this.scheduler.schedule(GenerateObservable.dispatch, 0, {
                            subscriber: subscriber,
                            iterate: this.iterate,
                            condition: this.condition,
                            resultSelector: this.resultSelector,
                            state: state });
                    }
                    var _a = this, condition = _a.condition, resultSelector = _a.resultSelector, iterate = _a.iterate;
                    do {
                        if (condition) {
                            var conditionResult = void 0;
                            try {
                                conditionResult = condition(state);
                            }
                            catch (err) {
                                subscriber.error(err);
                                return;
                            }
                            if (!conditionResult) {
                                subscriber.complete();
                                break;
                            }
                        }
                        var value = void 0;
                        try {
                            value = resultSelector(state);
                        }
                        catch (err) {
                            subscriber.error(err);
                            return;
                        }
                        subscriber.next(value);
                        if (subscriber.isUnsubscribed) {
                            break;
                        }
                        try {
                            state = iterate(state);
                        }
                        catch (err) {
                            subscriber.error(err);
                            return;
                        }
                    } while (true);
                };
                GenerateObservable.dispatch = function (state) {
                    var subscriber = state.subscriber, condition = state.condition;
                    if (subscriber.isUnsubscribed) {
                        return;
                    }
                    if (state.needIterate) {
                        try {
                            state.state = state.iterate(state.state);
                        }
                        catch (err) {
                            subscriber.error(err);
                            return;
                        }
                    }
                    else {
                        state.needIterate = true;
                    }
                    if (condition) {
                        var conditionResult = void 0;
                        try {
                            conditionResult = condition(state.state);
                        }
                        catch (err) {
                            subscriber.error(err);
                            return;
                        }
                        if (!conditionResult) {
                            subscriber.complete();
                            return;
                        }
                        if (subscriber.isUnsubscribed) {
                            return;
                        }
                    }
                    var value;
                    try {
                        value = state.resultSelector(state.state);
                    }
                    catch (err) {
                        subscriber.error(err);
                        return;
                    }
                    if (subscriber.isUnsubscribed) {
                        return;
                    }
                    subscriber.next(value);
                    if (subscriber.isUnsubscribed) {
                        return;
                    }
                    return this.schedule(state);
                };
                return GenerateObservable;
            }(Observable_1.Observable));
            exports_1("GenerateObservable", GenerateObservable);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29ic2VydmFibGUvR2VuZXJhdGVPYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztRQVFNLFlBQVk7Ozs7Ozs7Ozs7WUFBWixZQUFZLEdBQUcsVUFBSSxLQUFRLElBQUssT0FBQSxLQUFLLEVBQUwsQ0FBSyxDQUFDO1lBNEM1Qzs7OztlQUlHO1lBQ0g7Z0JBQThDLHNDQUFhO2dCQUN6RCw0QkFBb0IsWUFBZSxFQUNmLFNBQTJCLEVBQzNCLE9BQXVCLEVBQ3ZCLGNBQWdDLEVBQ2hDLFNBQXFCO29CQUNyQyxpQkFBTyxDQUFDO29CQUxRLGlCQUFZLEdBQVosWUFBWSxDQUFHO29CQUNmLGNBQVMsR0FBVCxTQUFTLENBQWtCO29CQUMzQixZQUFPLEdBQVAsT0FBTyxDQUFnQjtvQkFDdkIsbUJBQWMsR0FBZCxjQUFjLENBQWtCO29CQUNoQyxjQUFTLEdBQVQsU0FBUyxDQUFZO2dCQUV6QyxDQUFDO2dCQTRHTSx5QkFBTSxHQUFiLFVBQW9CLHFCQUFnRCxFQUNoRCxTQUE0QixFQUM1QixPQUF3QixFQUN4QiwwQkFBMkQsRUFDM0QsU0FBcUI7b0JBQ3ZDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUIsTUFBTSxDQUFDLElBQUksa0JBQWtCLENBQ0gscUJBQXNCLENBQUMsWUFBWSxFQUNuQyxxQkFBc0IsQ0FBQyxTQUFTLEVBQ2hDLHFCQUFzQixDQUFDLE9BQU8sRUFDOUIscUJBQXNCLENBQUMsY0FBYyxJQUFJLFlBQVksRUFDckQscUJBQXNCLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQzlELENBQUM7b0JBRUQsRUFBRSxDQUFDLENBQUMsMEJBQTBCLEtBQUssU0FBUyxJQUFJLHlCQUFXLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3hGLE1BQU0sQ0FBQyxJQUFJLGtCQUFrQixDQUN4QixxQkFBcUIsRUFD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QyxDQUFDLENBQUM7d0JBQzlCLE1BQU0sQ0FBQztvQkFDVCxDQUFDO29CQUNELFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3ZCLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO3dCQUM5QixNQUFNLENBQUM7b0JBQ1QsQ0FBQztvQkFDRCxNQUFNLENBQXFDLElBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25FLENBQUM7Z0JBQ0gseUJBQUM7WUFBRCxDQTlPQSxBQThPQyxDQTlPNkMsdUJBQVUsR0E4T3ZEO1lBOU9ELG1EQThPQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29ic2VydmFibGUvR2VuZXJhdGVPYnNlcnZhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICcuLi9PYnNlcnZhYmxlJyA7XG5pbXBvcnQge1NjaGVkdWxlcn0gZnJvbSAnLi4vU2NoZWR1bGVyJztcbmltcG9ydCB7U3Vic2NyaWJlcn0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7QWN0aW9ufSBmcm9tICcuLi9zY2hlZHVsZXIvQWN0aW9uJztcblxuaW1wb3J0IHtpc1NjaGVkdWxlcn0gZnJvbSAnLi4vdXRpbC9pc1NjaGVkdWxlcic7XG5cbmNvbnN0IHNlbGZTZWxlY3RvciA9IDxUPih2YWx1ZTogVCkgPT4gdmFsdWU7XG5cbmV4cG9ydCB0eXBlIENvbmRpdGlvbkZ1bmM8Uz4gPSAoc3RhdGU6IFMpID0+IGJvb2xlYW47XG5leHBvcnQgdHlwZSBJdGVyYXRlRnVuYzxTPiA9IChzdGF0ZTogUykgPT4gUztcbmV4cG9ydCB0eXBlIFJlc3VsdEZ1bmM8UywgVD4gPSAoc3RhdGU6IFMpID0+IFQ7XG5cbmludGVyZmFjZSBTY2hlZHVsZXJTdGF0ZTxULCBTPiB7XG4gIG5lZWRJdGVyYXRlPzogYm9vbGVhbjtcbiAgc3RhdGU6IFM7XG4gIHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD47XG4gIGNvbmRpdGlvbj86IENvbmRpdGlvbkZ1bmM8Uz47XG4gIGl0ZXJhdGU6IEl0ZXJhdGVGdW5jPFM+O1xuICByZXN1bHRTZWxlY3RvcjogUmVzdWx0RnVuYzxTLCBUPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHZW5lcmF0ZUJhc2VPcHRpb25zPFM+IHtcbiAgLyoqXG4gICAqIEluaXRhbCBzdGF0ZS5cbiAgKi9cbiAgaW5pdGlhbFN0YXRlOiBTO1xuICAvKipcbiAgICogQ29uZGl0aW9uIGZ1bmN0aW9uIHRoYXQgYWNjZXB0cyBzdGF0ZSBhbmQgcmV0dXJucyBib29sZWFuLlxuICAgKiBXaGVuIGl0IHJldHVybnMgZmFsc2UsIHRoZSBnZW5lcmF0b3Igc3RvcHMuXG4gICAqIElmIG5vdCBzcGVjaWZpZWQsIGEgZ2VuZXJhdG9yIG5ldmVyIHN0b3BzLlxuICAqL1xuICBjb25kaXRpb24/OiBDb25kaXRpb25GdW5jPFM+O1xuICAvKipcbiAgICogSXRlcmF0ZSBmdW5jdGlvbiB0aGF0IGFjY2VwdHMgc3RhdGUgYW5kIHJldHVybnMgbmV3IHN0YXRlLlxuICAgKi9cbiAgaXRlcmF0ZTogSXRlcmF0ZUZ1bmM8Uz47XG4gIC8qKlxuICAgKiBTY2hlZHVsZXIgdG8gdXNlIGZvciBnZW5lcmF0aW9uIHByb2Nlc3MuXG4gICAqIEJ5IGRlZmF1bHQsIGEgZ2VuZXJhdG9yIHN0YXJ0cyBpbW1lZGlhdGVseS5cbiAgKi9cbiAgc2NoZWR1bGVyPzogU2NoZWR1bGVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdlbmVyYXRlT3B0aW9uczxULCBTPiBleHRlbmRzIEdlbmVyYXRlQmFzZU9wdGlvbnM8Uz4ge1xuICAvKipcbiAgICogUmVzdWx0IHNlbGVjdGlvbiBmdW5jdGlvbiB0aGF0IGFjY2VwdHMgc3RhdGUgYW5kIHJldHVybnMgYSB2YWx1ZSB0byBlbWl0LlxuICAgKi9cbiAgcmVzdWx0U2VsZWN0b3I6IFJlc3VsdEZ1bmM8UywgVD47XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICogQGhpZGUgdHJ1ZVxuICovXG5leHBvcnQgY2xhc3MgR2VuZXJhdGVPYnNlcnZhYmxlPFQsIFM+IGV4dGVuZHMgT2JzZXJ2YWJsZTxUPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5pdGlhbFN0YXRlOiBTLFxuICAgICAgICAgICAgICBwcml2YXRlIGNvbmRpdGlvbjogQ29uZGl0aW9uRnVuYzxTPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBpdGVyYXRlOiBJdGVyYXRlRnVuYzxTPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSByZXN1bHRTZWxlY3RvcjogUmVzdWx0RnVuYzxTLCBUPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI/OiBTY2hlZHVsZXIpIHtcbiAgICAgIHN1cGVyKCk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIGFuIG9ic2VydmFibGUgc2VxdWVuY2UgYnkgcnVubmluZyBhIHN0YXRlLWRyaXZlbiBsb29wXG4gICAqIHByb2R1Y2luZyB0aGUgc2VxdWVuY2UncyBlbGVtZW50cywgdXNpbmcgdGhlIHNwZWNpZmllZCBzY2hlZHVsZXJcbiAgICogdG8gc2VuZCBvdXQgb2JzZXJ2ZXIgbWVzc2FnZXMuXG4gICAqXG4gICAqIDxpbWcgc3JjPVwiLi9pbWcvZ2VuZXJhdGUucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gICAqIFxuICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5Qcm9kdWNlcyBzZXF1ZW5jZSBvZiAwLCAxLCAyLCAuLi4gOSwgdGhlbiBjb21wbGV0ZXMuPC9jYXB0aW9uPlxuICAgKiB2YXIgcmVzID0gUnguT2JzZXJ2YWJsZS5nZW5lcmF0ZSgwLCB4ID0+IHggPCAxMCwgeCA9PiB4ICsgMSwgeCA9PiB4KTtcbiAgICogXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPlVzaW5nIGFzYXAgc2NoZWR1bGVyLCBwcm9kdWNlcyBzZXF1ZW5jZSBvZiAyLCAzLCA1LCB0aGVuIGNvbXBsZXRlcy48L2NhcHRpb24+XG4gICAqIHZhciByZXMgPSBSeC5PYnNlcnZhYmxlLmdlbmVyYXRlKDEsIHggPT4geCA8IDUsIHggPT4geCAqIDIsIHggPT4geCArIDEsIFJ4LlNjaGVkdWxlci5hc2FwKTtcbiAgICpcbiAgICogQHNlZSB7QGxpbmsgZnJvbX1cbiAgICogQHNlZSB7QGxpbmsgY3JlYXRlfVxuICAgKiBcbiAgICogQHBhcmFtIHtTfSBpbml0aWFsU3RhdGUgSW5pdGlhbCBzdGF0ZS5cbiAgICogQHBhcmFtIHtmdW5jdGlvbiAoc3RhdGU6IFMpOiBib29sZWFufSBjb25kaXRpb24gQ29uZGl0aW9uIHRvIHRlcm1pbmF0ZSBnZW5lcmF0aW9uICh1cG9uIHJldHVybmluZyBmYWxzZSkuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24gKHN0YXRlOiBTKTogU30gaXRlcmF0ZSBJdGVyYXRpb24gc3RlcCBmdW5jdGlvbi5cbiAgICogQHBhcmFtIHtmdW5jdGlvbiAoc3RhdGU6IFMpOiBUfSByZXN1bHRTZWxlY3RvciBTZWxlY3RvciBmdW5jdGlvbiBmb3IgcmVzdWx0cyBwcm9kdWNlZCBpbiB0aGUgc2VxdWVuY2UuXG4gICAqIEBwYXJhbSB7U2NoZWR1bGVyfSBbc2NoZWR1bGVyXSBBIHtAbGluayBTY2hlZHVsZXJ9IG9uIHdoaWNoIHRvIHJ1biB0aGUgZ2VuZXJhdG9yIGxvb3AuIElmIG5vdCBwcm92aWRlZCwgZGVmYXVsdHMgdG8gZW1pdCBpbW1lZGlhdGVseS5cbiAgICogQHJldHVybnMge09ic2VydmFibGU8VD59IFRoZSBnZW5lcmF0ZWQgc2VxdWVuY2UuXG4gICAqL1xuICBzdGF0aWMgY3JlYXRlPFQsIFM+KGluaXRpYWxTdGF0ZTogUyxcbiAgICAgICAgICAgICAgICAgICAgICBjb25kaXRpb246IENvbmRpdGlvbkZ1bmM8Uz4sXG4gICAgICAgICAgICAgICAgICAgICAgaXRlcmF0ZTogSXRlcmF0ZUZ1bmM8Uz4sXG4gICAgICAgICAgICAgICAgICAgICAgcmVzdWx0U2VsZWN0b3I6IFJlc3VsdEZ1bmM8UywgVD4sXG4gICAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVyPzogU2NoZWR1bGVyKTogT2JzZXJ2YWJsZTxUPlxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYW4gb2JzZXJ2YWJsZSBzZXF1ZW5jZSBieSBydW5uaW5nIGEgc3RhdGUtZHJpdmVuIGxvb3BcbiAgICogcHJvZHVjaW5nIHRoZSBzZXF1ZW5jZSdzIGVsZW1lbnRzLCB1c2luZyB0aGUgc3BlY2lmaWVkIHNjaGVkdWxlclxuICAgKiB0byBzZW5kIG91dCBvYnNlcnZlciBtZXNzYWdlcy5cbiAgICogVGhlIG92ZXJsb2FkIHVzZXMgc3RhdGUgYXMgYW4gZW1pdHRlZCB2YWx1ZS5cbiAgICogXG4gICAqIDxpbWcgc3JjPVwiLi9pbWcvZ2VuZXJhdGUucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gICAqXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPlByb2R1Y2VzIHNlcXVlbmNlIG9mIDAsIDEsIDIsIC4uLiA5LCB0aGVuIGNvbXBsZXRlcy48L2NhcHRpb24+XG4gICAqIHZhciByZXMgPSBSeC5PYnNlcnZhYmxlLmdlbmVyYXRlKDAsIHggPT4geCA8IDEwLCB4ID0+IHggKyAxKTtcbiAgICogXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPlVzaW5nIGFzYXAgc2NoZWR1bGVyLCBwcm9kdWNlcyBzZXF1ZW5jZSBvZiAxLCAyLCA0LCB0aGVuIGNvbXBsZXRlcy48L2NhcHRpb24+XG4gICAqIHZhciByZXMgPSBSeC5PYnNlcnZhYmxlLmdlbmVyYXRlKDEsIHggPT4geCA8IDUsIHggPT4geCAqIDIsIFJ4LlNjaGVkdWxlci5hc2FwKTtcbiAgICpcbiAgICogQHNlZSB7QGxpbmsgZnJvbX1cbiAgICogQHNlZSB7QGxpbmsgY3JlYXRlfVxuICAgKlxuICAgKiBAcGFyYW0ge1N9IGluaXRpYWxTdGF0ZSBJbml0aWFsIHN0YXRlLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uIChzdGF0ZTogUyk6IGJvb2xlYW59IGNvbmRpdGlvbiBDb25kaXRpb24gdG8gdGVybWluYXRlIGdlbmVyYXRpb24gKHVwb24gcmV0dXJuaW5nIGZhbHNlKS5cbiAgICogQHBhcmFtIHtmdW5jdGlvbiAoc3RhdGU6IFMpOiBTfSBpdGVyYXRlIEl0ZXJhdGlvbiBzdGVwIGZ1bmN0aW9uLlxuICAgKiBAcGFyYW0ge1NjaGVkdWxlcn0gW3NjaGVkdWxlcl0gQSB7QGxpbmsgU2NoZWR1bGVyfSBvbiB3aGljaCB0byBydW4gdGhlIGdlbmVyYXRvciBsb29wLiBJZiBub3QgcHJvdmlkZWQsIGRlZmF1bHRzIHRvIGVtaXQgaW1tZWRpYXRlbHkuXG4gICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFM+fSBUaGUgZ2VuZXJhdGVkIHNlcXVlbmNlLlxuICAgKi9cbiAgc3RhdGljIGNyZWF0ZTxTPihpbml0aWFsU3RhdGU6IFMsXG4gICAgICAgICAgICAgICAgICAgY29uZGl0aW9uOiBDb25kaXRpb25GdW5jPFM+LFxuICAgICAgICAgICAgICAgICAgIGl0ZXJhdGU6IEl0ZXJhdGVGdW5jPFM+LFxuICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlcj86IFNjaGVkdWxlcik6IE9ic2VydmFibGU8Uz5cblxuICAvKipcbiAgICogR2VuZXJhdGVzIGFuIG9ic2VydmFibGUgc2VxdWVuY2UgYnkgcnVubmluZyBhIHN0YXRlLWRyaXZlbiBsb29wXG4gICAqIHByb2R1Y2luZyB0aGUgc2VxdWVuY2UncyBlbGVtZW50cywgdXNpbmcgdGhlIHNwZWNpZmllZCBzY2hlZHVsZXJcbiAgICogdG8gc2VuZCBvdXQgb2JzZXJ2ZXIgbWVzc2FnZXMuXG4gICAqIFRoZSBvdmVybG9hZCBhY2NlcHRzIG9wdGlvbnMgb2JqZWN0IHRoYXQgbWlnaHQgY29udGFpbiBpbml0YWwgc3RhdGUsIGl0ZXJhdGUsXG4gICAqIGNvbmRpdGlvbiBhbmQgc2NoZWR1bGVyLlxuICAgKiBcbiAgICogPGltZyBzcmM9XCIuL2ltZy9nZW5lcmF0ZS5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAgICpcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+UHJvZHVjZXMgc2VxdWVuY2Ugb2YgMCwgMSwgMiwgLi4uIDksIHRoZW4gY29tcGxldGVzLjwvY2FwdGlvbj5cbiAgICogdmFyIHJlcyA9IFJ4Lk9ic2VydmFibGUuZ2VuZXJhdGUoe1xuICAgKiAgIGluaXRpYWxTdGF0ZTogMCxcbiAgICogICBjb25kaXRpb246IHggPT4geCA8IDEwLFxuICAgKiAgIGl0ZXJhdGU6IHggPT4geCArIDFcbiAgICogfSk7XG4gICAqXG4gICAqIEBzZWUge0BsaW5rIGZyb219XG4gICAqIEBzZWUge0BsaW5rIGNyZWF0ZX1cbiAgICpcbiAgICogQHBhcmFtIHtHZW5lcmF0ZUJhc2VPcHRpb25zPFM+fSBvcHRpb25zIE9iamVjdCB0aGF0IG11c3QgY29udGFpbiBpbml0aWFsU3RhdGUsIGl0ZXJhdGUgYW5kIG1pZ2h0IGNvbnRhaW4gY29uZGl0aW9uIGFuZCBzY2hlZHVsZXIuXG4gICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFM+fSBUaGUgZ2VuZXJhdGVkIHNlcXVlbmNlLlxuICAgKi9cbiAgc3RhdGljIGNyZWF0ZTxTPihvcHRpb25zOiBHZW5lcmF0ZUJhc2VPcHRpb25zPFM+KTogT2JzZXJ2YWJsZTxTPlxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYW4gb2JzZXJ2YWJsZSBzZXF1ZW5jZSBieSBydW5uaW5nIGEgc3RhdGUtZHJpdmVuIGxvb3BcbiAgICogcHJvZHVjaW5nIHRoZSBzZXF1ZW5jZSdzIGVsZW1lbnRzLCB1c2luZyB0aGUgc3BlY2lmaWVkIHNjaGVkdWxlclxuICAgKiB0byBzZW5kIG91dCBvYnNlcnZlciBtZXNzYWdlcy5cbiAgICogVGhlIG92ZXJsb2FkIGFjY2VwdHMgb3B0aW9ucyBvYmplY3QgdGhhdCBtaWdodCBjb250YWluIGluaXRhbCBzdGF0ZSwgaXRlcmF0ZSxcbiAgICogY29uZGl0aW9uLCByZXN1bHQgc2VsZWN0b3IgYW5kIHNjaGVkdWxlci5cbiAgICogXG4gICAqIDxpbWcgc3JjPVwiLi9pbWcvZ2VuZXJhdGUucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gICAqXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPlByb2R1Y2VzIHNlcXVlbmNlIG9mIDAsIDEsIDIsIC4uLiA5LCB0aGVuIGNvbXBsZXRlcy48L2NhcHRpb24+XG4gICAqIHZhciByZXMgPSBSeC5PYnNlcnZhYmxlLmdlbmVyYXRlKHtcbiAgICogICBpbml0aWFsU3RhdGU6IDAsXG4gICAqICAgY29uZGl0aW9uOiB4ID0+IHggPCAxMCxcbiAgICogICBpdGVyYXRlOiB4ID0+IHggKyAxLFxuICAgKiAgIHJlc3VsdFNlbGVjdG9yOiB4ID0+IHhcbiAgICogfSk7XG4gICAqXG4gICAqIEBzZWUge0BsaW5rIGZyb219XG4gICAqIEBzZWUge0BsaW5rIGNyZWF0ZX1cbiAgICpcbiAgICogQHBhcmFtIHtHZW5lcmF0ZU9wdGlvbnM8VCwgUz59IG9wdGlvbnMgT2JqZWN0IHRoYXQgbXVzdCBjb250YWluIGluaXRpYWxTdGF0ZSwgaXRlcmF0ZSwgcmVzdWx0U2VsZWN0b3IgYW5kIG1pZ2h0IGNvbnRhaW4gY29uZGl0aW9uIGFuZCBzY2hlZHVsZXIuXG4gICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFQ+fSBUaGUgZ2VuZXJhdGVkIHNlcXVlbmNlLlxuICAgKi9cbiAgc3RhdGljIGNyZWF0ZTxULCBTPihvcHRpb25zOiBHZW5lcmF0ZU9wdGlvbnM8VCwgUz4pOiBPYnNlcnZhYmxlPFQ+XG5cbiAgc3RhdGljIGNyZWF0ZTxULCBTPihpbml0aWFsU3RhdGVPck9wdGlvbnM6IFMgfCBHZW5lcmF0ZU9wdGlvbnM8VCwgUz4sXG4gICAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9uPzogQ29uZGl0aW9uRnVuYzxTPixcbiAgICAgICAgICAgICAgICAgICAgICBpdGVyYXRlPzogSXRlcmF0ZUZ1bmM8Uz4sXG4gICAgICAgICAgICAgICAgICAgICAgcmVzdWx0U2VsZWN0b3JPck9ic2VydmFibGU/OiAoUmVzdWx0RnVuYzxTLCBUPikgfCBTY2hlZHVsZXIsXG4gICAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVyPzogU2NoZWR1bGVyKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMSkge1xuICAgICAgcmV0dXJuIG5ldyBHZW5lcmF0ZU9ic2VydmFibGU8VCwgUz4oXG4gICAgICAgICg8R2VuZXJhdGVPcHRpb25zPFQsIFM+PmluaXRpYWxTdGF0ZU9yT3B0aW9ucykuaW5pdGlhbFN0YXRlLFxuICAgICAgICAoPEdlbmVyYXRlT3B0aW9uczxULCBTPj5pbml0aWFsU3RhdGVPck9wdGlvbnMpLmNvbmRpdGlvbixcbiAgICAgICAgKDxHZW5lcmF0ZU9wdGlvbnM8VCwgUz4+aW5pdGlhbFN0YXRlT3JPcHRpb25zKS5pdGVyYXRlLFxuICAgICAgICAoPEdlbmVyYXRlT3B0aW9uczxULCBTPj5pbml0aWFsU3RhdGVPck9wdGlvbnMpLnJlc3VsdFNlbGVjdG9yIHx8IHNlbGZTZWxlY3RvcixcbiAgICAgICAgKDxHZW5lcmF0ZU9wdGlvbnM8VCwgUz4+aW5pdGlhbFN0YXRlT3JPcHRpb25zKS5zY2hlZHVsZXIpO1xuICAgIH1cblxuICAgIGlmIChyZXN1bHRTZWxlY3Rvck9yT2JzZXJ2YWJsZSA9PT0gdW5kZWZpbmVkIHx8IGlzU2NoZWR1bGVyKHJlc3VsdFNlbGVjdG9yT3JPYnNlcnZhYmxlKSkge1xuICAgICAgcmV0dXJuIG5ldyBHZW5lcmF0ZU9ic2VydmFibGU8VCwgUz4oXG4gICAgICAgIDxTPmluaXRpYWxTdGF0ZU9yT3B0aW9ucyxcbiAgICAgICAgY29uZGl0aW9uLFxuICAgICAgICBpdGVyYXRlLFxuICAgICAgICBzZWxmU2VsZWN0b3IsXG4gICAgICAgIDxTY2hlZHVsZXI+cmVzdWx0U2VsZWN0b3JPck9ic2VydmFibGUpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgR2VuZXJhdGVPYnNlcnZhYmxlPFQsIFM+KFxuICAgICAgPFM+aW5pdGlhbFN0YXRlT3JPcHRpb25zLFxuICAgICAgY29uZGl0aW9uLFxuICAgICAgaXRlcmF0ZSxcbiAgICAgIDxSZXN1bHRGdW5jPFMsIFQ+PnJlc3VsdFNlbGVjdG9yT3JPYnNlcnZhYmxlLFxuICAgICAgPFNjaGVkdWxlcj5zY2hlZHVsZXIpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmUoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxhbnk+KTogU3Vic2NyaXB0aW9uIHwgRnVuY3Rpb24gfCB2b2lkIHtcbiAgICBsZXQgc3RhdGUgPSB0aGlzLmluaXRpYWxTdGF0ZTtcbiAgICBpZiAodGhpcy5zY2hlZHVsZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLnNjaGVkdWxlci5zY2hlZHVsZTxTY2hlZHVsZXJTdGF0ZTxULCBTPj4oR2VuZXJhdGVPYnNlcnZhYmxlLmRpc3BhdGNoLCAwLCB7XG4gICAgICAgIHN1YnNjcmliZXIsXG4gICAgICAgIGl0ZXJhdGU6IHRoaXMuaXRlcmF0ZSxcbiAgICAgICAgY29uZGl0aW9uOiB0aGlzLmNvbmRpdGlvbixcbiAgICAgICAgcmVzdWx0U2VsZWN0b3I6IHRoaXMucmVzdWx0U2VsZWN0b3IsXG4gICAgICAgIHN0YXRlIH0pO1xuICAgIH1cbiAgICBjb25zdCB7IGNvbmRpdGlvbiwgcmVzdWx0U2VsZWN0b3IsIGl0ZXJhdGUgfSA9IHRoaXM7XG4gICAgZG8ge1xuICAgICAgaWYgKGNvbmRpdGlvbikge1xuICAgICAgICBsZXQgY29uZGl0aW9uUmVzdWx0OiBib29sZWFuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbmRpdGlvblJlc3VsdCA9IGNvbmRpdGlvbihzdGF0ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb25kaXRpb25SZXN1bHQpIHtcbiAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxldCB2YWx1ZTogVDtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhbHVlID0gcmVzdWx0U2VsZWN0b3Ioc3RhdGUpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHN1YnNjcmliZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgIGlmIChzdWJzY3JpYmVyLmlzVW5zdWJzY3JpYmVkKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgc3RhdGUgPSBpdGVyYXRlKHN0YXRlKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBzdWJzY3JpYmVyLmVycm9yKGVycik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IHdoaWxlICh0cnVlKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGRpc3BhdGNoPFQsIFM+KHN0YXRlOiBTY2hlZHVsZXJTdGF0ZTxULCBTPikge1xuICAgIGNvbnN0IHsgc3Vic2NyaWJlciwgY29uZGl0aW9uIH0gPSBzdGF0ZTtcbiAgICBpZiAoc3Vic2NyaWJlci5pc1Vuc3Vic2NyaWJlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoc3RhdGUubmVlZEl0ZXJhdGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHN0YXRlLnN0YXRlID0gc3RhdGUuaXRlcmF0ZShzdGF0ZS5zdGF0ZSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgc3Vic2NyaWJlci5lcnJvcihlcnIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlLm5lZWRJdGVyYXRlID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGNvbmRpdGlvbikge1xuICAgICAgbGV0IGNvbmRpdGlvblJlc3VsdDogYm9vbGVhbjtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbmRpdGlvblJlc3VsdCA9IGNvbmRpdGlvbihzdGF0ZS5zdGF0ZSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgc3Vic2NyaWJlci5lcnJvcihlcnIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoIWNvbmRpdGlvblJlc3VsdCkge1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChzdWJzY3JpYmVyLmlzVW5zdWJzY3JpYmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IHZhbHVlOiBUO1xuICAgIHRyeSB7XG4gICAgICB2YWx1ZSA9IHN0YXRlLnJlc3VsdFNlbGVjdG9yKHN0YXRlLnN0YXRlKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHN1YnNjcmliZXIuZXJyb3IoZXJyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHN1YnNjcmliZXIuaXNVbnN1YnNjcmliZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICBpZiAoc3Vic2NyaWJlci5pc1Vuc3Vic2NyaWJlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gKDxBY3Rpb248U2NoZWR1bGVyU3RhdGU8VCwgUz4+Pjxhbnk+dGhpcykuc2NoZWR1bGUoc3RhdGUpO1xuICB9XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
