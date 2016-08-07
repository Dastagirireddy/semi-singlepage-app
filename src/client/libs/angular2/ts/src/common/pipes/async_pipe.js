System.register(['angular2/src/facade/lang', 'angular2/src/facade/async', 'angular2/core', './invalid_pipe_argument_exception'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var lang_1, async_1, core_1, invalid_pipe_argument_exception_1;
    var ObservableStrategy, PromiseStrategy, _promiseStrategy, _observableStrategy, __unused, AsyncPipe;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (invalid_pipe_argument_exception_1_1) {
                invalid_pipe_argument_exception_1 = invalid_pipe_argument_exception_1_1;
            }],
        execute: function() {
            ObservableStrategy = (function () {
                function ObservableStrategy() {
                }
                ObservableStrategy.prototype.createSubscription = function (async, updateLatestValue) {
                    return async_1.ObservableWrapper.subscribe(async, updateLatestValue, function (e) { throw e; });
                };
                ObservableStrategy.prototype.dispose = function (subscription) { async_1.ObservableWrapper.dispose(subscription); };
                ObservableStrategy.prototype.onDestroy = function (subscription) { async_1.ObservableWrapper.dispose(subscription); };
                return ObservableStrategy;
            }());
            PromiseStrategy = (function () {
                function PromiseStrategy() {
                }
                PromiseStrategy.prototype.createSubscription = function (async, updateLatestValue) {
                    return async.then(updateLatestValue);
                };
                PromiseStrategy.prototype.dispose = function (subscription) { };
                PromiseStrategy.prototype.onDestroy = function (subscription) { };
                return PromiseStrategy;
            }());
            _promiseStrategy = new PromiseStrategy();
            _observableStrategy = new ObservableStrategy();
             // avoid unused import when Promise union types are erased
            /**
             * The `async` pipe subscribes to an Observable or Promise and returns the latest value it has
             * emitted.
             * When a new value is emitted, the `async` pipe marks the component to be checked for changes.
             *
             * ### Example
             *
             * This example binds a `Promise` to the view. Clicking the `Resolve` button resolves the
             * promise.
             *
             * {@example core/pipes/ts/async_pipe/async_pipe_example.ts region='AsyncPipe'}
             *
             * It's also possible to use `async` with Observables. The example below binds the `time` Observable
             * to the view. Every 500ms, the `time` Observable updates the view with the current time.
             *
             * ```typescript
             * ```
             */
            AsyncPipe = (function () {
                function AsyncPipe(_ref) {
                    /** @internal */
                    this._latestValue = null;
                    /** @internal */
                    this._latestReturnedValue = null;
                    /** @internal */
                    this._subscription = null;
                    /** @internal */
                    this._obj = null;
                    this._strategy = null;
                    this._ref = _ref;
                }
                AsyncPipe.prototype.ngOnDestroy = function () {
                    if (lang_1.isPresent(this._subscription)) {
                        this._dispose();
                    }
                };
                AsyncPipe.prototype.transform = function (obj, args) {
                    if (lang_1.isBlank(this._obj)) {
                        if (lang_1.isPresent(obj)) {
                            this._subscribe(obj);
                        }
                        this._latestReturnedValue = this._latestValue;
                        return this._latestValue;
                    }
                    if (obj !== this._obj) {
                        this._dispose();
                        return this.transform(obj);
                    }
                    if (this._latestValue === this._latestReturnedValue) {
                        return this._latestReturnedValue;
                    }
                    else {
                        this._latestReturnedValue = this._latestValue;
                        return core_1.WrappedValue.wrap(this._latestValue);
                    }
                };
                /** @internal */
                AsyncPipe.prototype._subscribe = function (obj) {
                    var _this = this;
                    this._obj = obj;
                    this._strategy = this._selectStrategy(obj);
                    this._subscription = this._strategy.createSubscription(obj, function (value) { return _this._updateLatestValue(obj, value); });
                };
                /** @internal */
                AsyncPipe.prototype._selectStrategy = function (obj) {
                    if (lang_1.isPromise(obj)) {
                        return _promiseStrategy;
                    }
                    else if (async_1.ObservableWrapper.isObservable(obj)) {
                        return _observableStrategy;
                    }
                    else {
                        throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(AsyncPipe, obj);
                    }
                };
                /** @internal */
                AsyncPipe.prototype._dispose = function () {
                    this._strategy.dispose(this._subscription);
                    this._latestValue = null;
                    this._latestReturnedValue = null;
                    this._subscription = null;
                    this._obj = null;
                };
                /** @internal */
                AsyncPipe.prototype._updateLatestValue = function (async, value) {
                    if (async === this._obj) {
                        this._latestValue = value;
                        this._ref.markForCheck();
                    }
                };
                AsyncPipe = __decorate([
                    // avoid unused import when Promise union types are erased
                    core_1.Pipe({ name: 'async', pure: false }),
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
                ], AsyncPipe);
                return AsyncPipe;
            }());
            exports_1("AsyncPipe", AsyncPipe);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9waXBlcy9hc3luY19waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7NkNBaUNJLGdCQUFnQixFQUNoQixtQkFBbUIsRUFDbkIsUUFBUTs7Ozs7Ozs7Ozs7Ozs7OztZQXRCWjtnQkFBQTtnQkFRQSxDQUFDO2dCQVBDLCtDQUFrQixHQUFsQixVQUFtQixLQUFVLEVBQUUsaUJBQXNCO29CQUNuRCxNQUFNLENBQUMseUJBQWlCLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxVQUFBLENBQUMsSUFBTSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsRixDQUFDO2dCQUVELG9DQUFPLEdBQVAsVUFBUSxZQUFpQixJQUFVLHlCQUFpQixDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTdFLHNDQUFTLEdBQVQsVUFBVSxZQUFpQixJQUFVLHlCQUFpQixDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pGLHlCQUFDO1lBQUQsQ0FSQSxBQVFDLElBQUE7WUFFRDtnQkFBQTtnQkFRQSxDQUFDO2dCQVBDLDRDQUFrQixHQUFsQixVQUFtQixLQUFtQixFQUFFLGlCQUFrQztvQkFDeEUsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDdkMsQ0FBQztnQkFFRCxpQ0FBTyxHQUFQLFVBQVEsWUFBaUIsSUFBUyxDQUFDO2dCQUVuQyxtQ0FBUyxHQUFULFVBQVUsWUFBaUIsSUFBUyxDQUFDO2dCQUN2QyxzQkFBQztZQUFELENBUkEsQUFRQyxJQUFBO1lBRUcsZ0JBQWdCLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztZQUN6QyxtQkFBbUIsR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7WUFDeEIsQ0FBRSwwREFBMEQ7WUFF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QUE0QixDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDekQsQ0FBQztnQkFDSCxDQUFDO2dCQUVELGdCQUFnQjtnQkFDaEIsNEJBQVEsR0FBUjtvQkFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQzNDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO29CQUN6QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO29CQUNqQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztvQkFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ25CLENBQUM7Z0JBRUQsZ0JBQWdCO2dCQUNoQixzQ0FBa0IsR0FBbEIsVUFBbUIsS0FBVSxFQUFFLEtBQWE7b0JBQzFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7d0JBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQzNCLENBQUM7Z0JBQ0gsQ0FBQztnQkEvRUg7b0JBcEI2QiwwREFBMEQ7b0JBb0J0RixXQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQztvQkFDbEMsaUJBQVUsRUFBRTs7NkJBQUE7Z0JBK0ViLGdCQUFDO1lBQUQsQ0E5RUEsQUE4RUMsSUFBQTtZQTlFRCxpQ0E4RUMsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vcGlwZXMvYXN5bmNfcGlwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNCbGFuaywgaXNQcmVzZW50LCBpc1Byb21pc2UsIENPTlNUfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtPYnNlcnZhYmxlV3JhcHBlciwgT2JzZXJ2YWJsZSwgRXZlbnRFbWl0dGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jJztcbmltcG9ydCB7XG4gIFBpcGUsXG4gIEluamVjdGFibGUsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBPbkRlc3Ryb3ksXG4gIFBpcGVUcmFuc2Zvcm0sXG4gIFdyYXBwZWRWYWx1ZVxufSBmcm9tICdhbmd1bGFyMi9jb3JlJztcblxuaW1wb3J0IHtJbnZhbGlkUGlwZUFyZ3VtZW50RXhjZXB0aW9ufSBmcm9tICcuL2ludmFsaWRfcGlwZV9hcmd1bWVudF9leGNlcHRpb24nO1xuXG5jbGFzcyBPYnNlcnZhYmxlU3RyYXRlZ3kge1xuICBjcmVhdGVTdWJzY3JpcHRpb24oYXN5bmM6IGFueSwgdXBkYXRlTGF0ZXN0VmFsdWU6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIE9ic2VydmFibGVXcmFwcGVyLnN1YnNjcmliZShhc3luYywgdXBkYXRlTGF0ZXN0VmFsdWUsIGUgPT4geyB0aHJvdyBlOyB9KTtcbiAgfVxuXG4gIGRpc3Bvc2Uoc3Vic2NyaXB0aW9uOiBhbnkpOiB2b2lkIHsgT2JzZXJ2YWJsZVdyYXBwZXIuZGlzcG9zZShzdWJzY3JpcHRpb24pOyB9XG5cbiAgb25EZXN0cm95KHN1YnNjcmlwdGlvbjogYW55KTogdm9pZCB7IE9ic2VydmFibGVXcmFwcGVyLmRpc3Bvc2Uoc3Vic2NyaXB0aW9uKTsgfVxufVxuXG5jbGFzcyBQcm9taXNlU3RyYXRlZ3kge1xuICBjcmVhdGVTdWJzY3JpcHRpb24oYXN5bmM6IFByb21pc2U8YW55PiwgdXBkYXRlTGF0ZXN0VmFsdWU6ICh2OiBhbnkpID0+IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIGFzeW5jLnRoZW4odXBkYXRlTGF0ZXN0VmFsdWUpO1xuICB9XG5cbiAgZGlzcG9zZShzdWJzY3JpcHRpb246IGFueSk6IHZvaWQge31cblxuICBvbkRlc3Ryb3koc3Vic2NyaXB0aW9uOiBhbnkpOiB2b2lkIHt9XG59XG5cbnZhciBfcHJvbWlzZVN0cmF0ZWd5ID0gbmV3IFByb21pc2VTdHJhdGVneSgpO1xudmFyIF9vYnNlcnZhYmxlU3RyYXRlZ3kgPSBuZXcgT2JzZXJ2YWJsZVN0cmF0ZWd5KCk7XG52YXIgX191bnVzZWQ6IFByb21pc2U8YW55PjsgIC8vIGF2b2lkIHVudXNlZCBpbXBvcnQgd2hlbiBQcm9taXNlIHVuaW9uIHR5cGVzIGFyZSBlcmFzZWRcblxuLyoqXG4gKiBUaGUgYGFzeW5jYCBwaXBlIHN1YnNjcmliZXMgdG8gYW4gT2JzZXJ2YWJsZSBvciBQcm9taXNlIGFuZCByZXR1cm5zIHRoZSBsYXRlc3QgdmFsdWUgaXQgaGFzXG4gKiBlbWl0dGVkLlxuICogV2hlbiBhIG5ldyB2YWx1ZSBpcyBlbWl0dGVkLCB0aGUgYGFzeW5jYCBwaXBlIG1hcmtzIHRoZSBjb21wb25lbnQgdG8gYmUgY2hlY2tlZCBmb3IgY2hhbmdlcy5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIFRoaXMgZXhhbXBsZSBiaW5kcyBhIGBQcm9taXNlYCB0byB0aGUgdmlldy4gQ2xpY2tpbmcgdGhlIGBSZXNvbHZlYCBidXR0b24gcmVzb2x2ZXMgdGhlXG4gKiBwcm9taXNlLlxuICpcbiAqIHtAZXhhbXBsZSBjb3JlL3BpcGVzL3RzL2FzeW5jX3BpcGUvYXN5bmNfcGlwZV9leGFtcGxlLnRzIHJlZ2lvbj0nQXN5bmNQaXBlJ31cbiAqXG4gKiBJdCdzIGFsc28gcG9zc2libGUgdG8gdXNlIGBhc3luY2Agd2l0aCBPYnNlcnZhYmxlcy4gVGhlIGV4YW1wbGUgYmVsb3cgYmluZHMgdGhlIGB0aW1lYCBPYnNlcnZhYmxlXG4gKiB0byB0aGUgdmlldy4gRXZlcnkgNTAwbXMsIHRoZSBgdGltZWAgT2JzZXJ2YWJsZSB1cGRhdGVzIHRoZSB2aWV3IHdpdGggdGhlIGN1cnJlbnQgdGltZS5cbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBgYGBcbiAqL1xuQFBpcGUoe25hbWU6ICdhc3luYycsIHB1cmU6IGZhbHNlfSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBc3luY1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtLCBPbkRlc3Ryb3kge1xuICAvKiogQGludGVybmFsICovXG4gIF9sYXRlc3RWYWx1ZTogT2JqZWN0ID0gbnVsbDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfbGF0ZXN0UmV0dXJuZWRWYWx1ZTogT2JqZWN0ID0gbnVsbDtcblxuICAvKiogQGludGVybmFsICovXG4gIF9zdWJzY3JpcHRpb246IE9iamVjdCA9IG51bGw7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX29iajogT2JzZXJ2YWJsZTxhbnk+fCBQcm9taXNlPGFueT58IEV2ZW50RW1pdHRlcjxhbnk+ID0gbnVsbDtcbiAgcHJpdmF0ZSBfc3RyYXRlZ3k6IGFueSA9IG51bGw7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHVibGljIF9yZWY6IENoYW5nZURldGVjdG9yUmVmO1xuICBjb25zdHJ1Y3RvcihfcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikgeyB0aGlzLl9yZWYgPSBfcmVmOyB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl9zdWJzY3JpcHRpb24pKSB7XG4gICAgICB0aGlzLl9kaXNwb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgdHJhbnNmb3JtKG9iajogT2JzZXJ2YWJsZTxhbnk+fCBQcm9taXNlPGFueT58IEV2ZW50RW1pdHRlcjxhbnk+LCBhcmdzPzogYW55W10pOiBhbnkge1xuICAgIGlmIChpc0JsYW5rKHRoaXMuX29iaikpIHtcbiAgICAgIGlmIChpc1ByZXNlbnQob2JqKSkge1xuICAgICAgICB0aGlzLl9zdWJzY3JpYmUob2JqKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2xhdGVzdFJldHVybmVkVmFsdWUgPSB0aGlzLl9sYXRlc3RWYWx1ZTtcbiAgICAgIHJldHVybiB0aGlzLl9sYXRlc3RWYWx1ZTtcbiAgICB9XG5cbiAgICBpZiAob2JqICE9PSB0aGlzLl9vYmopIHtcbiAgICAgIHRoaXMuX2Rpc3Bvc2UoKTtcbiAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybShvYmopO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9sYXRlc3RWYWx1ZSA9PT0gdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2xhdGVzdFJldHVybmVkVmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2xhdGVzdFJldHVybmVkVmFsdWUgPSB0aGlzLl9sYXRlc3RWYWx1ZTtcbiAgICAgIHJldHVybiBXcmFwcGVkVmFsdWUud3JhcCh0aGlzLl9sYXRlc3RWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc3Vic2NyaWJlKG9iajogT2JzZXJ2YWJsZTxhbnk+fCBQcm9taXNlPGFueT58IEV2ZW50RW1pdHRlcjxhbnk+KTogdm9pZCB7XG4gICAgdGhpcy5fb2JqID0gb2JqO1xuICAgIHRoaXMuX3N0cmF0ZWd5ID0gdGhpcy5fc2VsZWN0U3RyYXRlZ3kob2JqKTtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSB0aGlzLl9zdHJhdGVneS5jcmVhdGVTdWJzY3JpcHRpb24oXG4gICAgICAgIG9iaiwgKHZhbHVlOiBPYmplY3QpID0+IHRoaXMuX3VwZGF0ZUxhdGVzdFZhbHVlKG9iaiwgdmFsdWUpKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3NlbGVjdFN0cmF0ZWd5KG9iajogT2JzZXJ2YWJsZTxhbnk+fCBQcm9taXNlPGFueT58IEV2ZW50RW1pdHRlcjxhbnk+KTogYW55IHtcbiAgICBpZiAoaXNQcm9taXNlKG9iaikpIHtcbiAgICAgIHJldHVybiBfcHJvbWlzZVN0cmF0ZWd5O1xuICAgIH0gZWxzZSBpZiAoT2JzZXJ2YWJsZVdyYXBwZXIuaXNPYnNlcnZhYmxlKG9iaikpIHtcbiAgICAgIHJldHVybiBfb2JzZXJ2YWJsZVN0cmF0ZWd5O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZFBpcGVBcmd1bWVudEV4Y2VwdGlvbihBc3luY1BpcGUsIG9iaik7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZGlzcG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zdHJhdGVneS5kaXNwb3NlKHRoaXMuX3N1YnNjcmlwdGlvbik7XG4gICAgdGhpcy5fbGF0ZXN0VmFsdWUgPSBudWxsO1xuICAgIHRoaXMuX2xhdGVzdFJldHVybmVkVmFsdWUgPSBudWxsO1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgdGhpcy5fb2JqID0gbnVsbDtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3VwZGF0ZUxhdGVzdFZhbHVlKGFzeW5jOiBhbnksIHZhbHVlOiBPYmplY3QpIHtcbiAgICBpZiAoYXN5bmMgPT09IHRoaXMuX29iaikge1xuICAgICAgdGhpcy5fbGF0ZXN0VmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX3JlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
