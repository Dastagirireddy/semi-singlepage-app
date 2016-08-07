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
                AsyncPipe.prototype.transform = function (obj) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vcGlwZXMvYXN5bmNfcGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OzZDQTBCSSxnQkFBZ0IsRUFDaEIsbUJBQW1CLEVBQ25CLFFBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7WUF0Qlo7Z0JBQUE7Z0JBUUEsQ0FBQztnQkFQQywrQ0FBa0IsR0FBbEIsVUFBbUIsS0FBVSxFQUFFLGlCQUFzQjtvQkFDbkQsTUFBTSxDQUFDLHlCQUFpQixDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsVUFBQSxDQUFDLElBQU0sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEYsQ0FBQztnQkFFRCxvQ0FBTyxHQUFQLFVBQVEsWUFBaUIsSUFBVSx5QkFBaUIsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU3RSxzQ0FBUyxHQUFULFVBQVUsWUFBaUIsSUFBVSx5QkFBaUIsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRix5QkFBQztZQUFELENBUkEsQUFRQyxJQUFBO1lBRUQ7Z0JBQUE7Z0JBUUEsQ0FBQztnQkFQQyw0Q0FBa0IsR0FBbEIsVUFBbUIsS0FBbUIsRUFBRSxpQkFBa0M7b0JBQ3hFLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQ3ZDLENBQUM7Z0JBRUQsaUNBQU8sR0FBUCxVQUFRLFlBQWlCLElBQVMsQ0FBQztnQkFFbkMsbUNBQVMsR0FBVCxVQUFVLFlBQWlCLElBQVMsQ0FBQztnQkFDdkMsc0JBQUM7WUFBRCxDQVJBLEFBUUMsSUFBQTtZQUVHLGdCQUFnQixHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7WUFDekMsbUJBQW1CLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1lBQ3hCLENBQUUsMERBQTBEO1lBRXZGOzs7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RUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDekQsQ0FBQztnQkFDSCxDQUFDO2dCQUVELGdCQUFnQjtnQkFDaEIsNEJBQVEsR0FBUjtvQkFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQzNDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO29CQUN6QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO29CQUNqQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztvQkFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ25CLENBQUM7Z0JBRUQsZ0JBQWdCO2dCQUNoQixzQ0FBa0IsR0FBbEIsVUFBbUIsS0FBVSxFQUFFLEtBQWE7b0JBQzFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7d0JBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQzNCLENBQUM7Z0JBQ0gsQ0FBQztnQkEvRUg7b0JBcEI2QiwwREFBMEQ7b0JBb0J0RixXQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQztvQkFDbEMsaUJBQVUsRUFBRTs7NkJBQUE7Z0JBK0ViLGdCQUFDO1lBQUQsQ0E5RUEsQUE4RUMsSUFBQTtZQTlFRCxpQ0E4RUMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tbW9uL3BpcGVzL2FzeW5jX3BpcGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzQmxhbmssIGlzUHJlc2VudCwgaXNQcm9taXNlLCBDT05TVH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7T2JzZXJ2YWJsZVdyYXBwZXIsIE9ic2VydmFibGUsIEV2ZW50RW1pdHRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5pbXBvcnQge1BpcGUsIEluamVjdGFibGUsIENoYW5nZURldGVjdG9yUmVmLCBPbkRlc3Ryb3ksIFdyYXBwZWRWYWx1ZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5cbmltcG9ydCB7SW52YWxpZFBpcGVBcmd1bWVudEV4Y2VwdGlvbn0gZnJvbSAnLi9pbnZhbGlkX3BpcGVfYXJndW1lbnRfZXhjZXB0aW9uJztcblxuY2xhc3MgT2JzZXJ2YWJsZVN0cmF0ZWd5IHtcbiAgY3JlYXRlU3Vic2NyaXB0aW9uKGFzeW5jOiBhbnksIHVwZGF0ZUxhdGVzdFZhbHVlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBPYnNlcnZhYmxlV3JhcHBlci5zdWJzY3JpYmUoYXN5bmMsIHVwZGF0ZUxhdGVzdFZhbHVlLCBlID0+IHsgdGhyb3cgZTsgfSk7XG4gIH1cblxuICBkaXNwb3NlKHN1YnNjcmlwdGlvbjogYW55KTogdm9pZCB7IE9ic2VydmFibGVXcmFwcGVyLmRpc3Bvc2Uoc3Vic2NyaXB0aW9uKTsgfVxuXG4gIG9uRGVzdHJveShzdWJzY3JpcHRpb246IGFueSk6IHZvaWQgeyBPYnNlcnZhYmxlV3JhcHBlci5kaXNwb3NlKHN1YnNjcmlwdGlvbik7IH1cbn1cblxuY2xhc3MgUHJvbWlzZVN0cmF0ZWd5IHtcbiAgY3JlYXRlU3Vic2NyaXB0aW9uKGFzeW5jOiBQcm9taXNlPGFueT4sIHVwZGF0ZUxhdGVzdFZhbHVlOiAodjogYW55KSA9PiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBhc3luYy50aGVuKHVwZGF0ZUxhdGVzdFZhbHVlKTtcbiAgfVxuXG4gIGRpc3Bvc2Uoc3Vic2NyaXB0aW9uOiBhbnkpOiB2b2lkIHt9XG5cbiAgb25EZXN0cm95KHN1YnNjcmlwdGlvbjogYW55KTogdm9pZCB7fVxufVxuXG52YXIgX3Byb21pc2VTdHJhdGVneSA9IG5ldyBQcm9taXNlU3RyYXRlZ3koKTtcbnZhciBfb2JzZXJ2YWJsZVN0cmF0ZWd5ID0gbmV3IE9ic2VydmFibGVTdHJhdGVneSgpO1xudmFyIF9fdW51c2VkOiBQcm9taXNlPGFueT47ICAvLyBhdm9pZCB1bnVzZWQgaW1wb3J0IHdoZW4gUHJvbWlzZSB1bmlvbiB0eXBlcyBhcmUgZXJhc2VkXG5cbi8qKlxuICogVGhlIGBhc3luY2AgcGlwZSBzdWJzY3JpYmVzIHRvIGFuIE9ic2VydmFibGUgb3IgUHJvbWlzZSBhbmQgcmV0dXJucyB0aGUgbGF0ZXN0IHZhbHVlIGl0IGhhc1xuICogZW1pdHRlZC5cbiAqIFdoZW4gYSBuZXcgdmFsdWUgaXMgZW1pdHRlZCwgdGhlIGBhc3luY2AgcGlwZSBtYXJrcyB0aGUgY29tcG9uZW50IHRvIGJlIGNoZWNrZWQgZm9yIGNoYW5nZXMuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBUaGlzIGV4YW1wbGUgYmluZHMgYSBgUHJvbWlzZWAgdG8gdGhlIHZpZXcuIENsaWNraW5nIHRoZSBgUmVzb2x2ZWAgYnV0dG9uIHJlc29sdmVzIHRoZVxuICogcHJvbWlzZS5cbiAqXG4gKiB7QGV4YW1wbGUgY29yZS9waXBlcy90cy9hc3luY19waXBlL2FzeW5jX3BpcGVfZXhhbXBsZS50cyByZWdpb249J0FzeW5jUGlwZSd9XG4gKlxuICogSXQncyBhbHNvIHBvc3NpYmxlIHRvIHVzZSBgYXN5bmNgIHdpdGggT2JzZXJ2YWJsZXMuIFRoZSBleGFtcGxlIGJlbG93IGJpbmRzIHRoZSBgdGltZWAgT2JzZXJ2YWJsZVxuICogdG8gdGhlIHZpZXcuIEV2ZXJ5IDUwMG1zLCB0aGUgYHRpbWVgIE9ic2VydmFibGUgdXBkYXRlcyB0aGUgdmlldyB3aXRoIHRoZSBjdXJyZW50IHRpbWUuXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogYGBgXG4gKi9cbkBQaXBlKHtuYW1lOiAnYXN5bmMnLCBwdXJlOiBmYWxzZX0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXN5bmNQaXBlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfbGF0ZXN0VmFsdWU6IE9iamVjdCA9IG51bGw7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2xhdGVzdFJldHVybmVkVmFsdWU6IE9iamVjdCA9IG51bGw7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc3Vic2NyaXB0aW9uOiBPYmplY3QgPSBudWxsO1xuICAvKiogQGludGVybmFsICovXG4gIF9vYmo6IE9ic2VydmFibGU8YW55PnwgUHJvbWlzZTxhbnk+fCBFdmVudEVtaXR0ZXI8YW55PiA9IG51bGw7XG4gIHByaXZhdGUgX3N0cmF0ZWd5OiBhbnkgPSBudWxsO1xuICAvKiogQGludGVybmFsICovXG4gIHB1YmxpYyBfcmVmOiBDaGFuZ2VEZXRlY3RvclJlZjtcbiAgY29uc3RydWN0b3IoX3JlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHsgdGhpcy5fcmVmID0gX3JlZjsgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fc3Vic2NyaXB0aW9uKSkge1xuICAgICAgdGhpcy5fZGlzcG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIHRyYW5zZm9ybShvYmo6IE9ic2VydmFibGU8YW55PnwgUHJvbWlzZTxhbnk+fCBFdmVudEVtaXR0ZXI8YW55Pik6IGFueSB7XG4gICAgaWYgKGlzQmxhbmsodGhpcy5fb2JqKSkge1xuICAgICAgaWYgKGlzUHJlc2VudChvYmopKSB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmliZShvYmopO1xuICAgICAgfVxuICAgICAgdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZSA9IHRoaXMuX2xhdGVzdFZhbHVlO1xuICAgICAgcmV0dXJuIHRoaXMuX2xhdGVzdFZhbHVlO1xuICAgIH1cblxuICAgIGlmIChvYmogIT09IHRoaXMuX29iaikge1xuICAgICAgdGhpcy5fZGlzcG9zZSgpO1xuICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtKG9iaik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2xhdGVzdFZhbHVlID09PSB0aGlzLl9sYXRlc3RSZXR1cm5lZFZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZSA9IHRoaXMuX2xhdGVzdFZhbHVlO1xuICAgICAgcmV0dXJuIFdyYXBwZWRWYWx1ZS53cmFwKHRoaXMuX2xhdGVzdFZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9zdWJzY3JpYmUob2JqOiBPYnNlcnZhYmxlPGFueT58IFByb21pc2U8YW55PnwgRXZlbnRFbWl0dGVyPGFueT4pOiB2b2lkIHtcbiAgICB0aGlzLl9vYmogPSBvYmo7XG4gICAgdGhpcy5fc3RyYXRlZ3kgPSB0aGlzLl9zZWxlY3RTdHJhdGVneShvYmopO1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IHRoaXMuX3N0cmF0ZWd5LmNyZWF0ZVN1YnNjcmlwdGlvbihcbiAgICAgICAgb2JqLCAodmFsdWU6IE9iamVjdCkgPT4gdGhpcy5fdXBkYXRlTGF0ZXN0VmFsdWUob2JqLCB2YWx1ZSkpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc2VsZWN0U3RyYXRlZ3kob2JqOiBPYnNlcnZhYmxlPGFueT58IFByb21pc2U8YW55PnwgRXZlbnRFbWl0dGVyPGFueT4pOiBhbnkge1xuICAgIGlmIChpc1Byb21pc2Uob2JqKSkge1xuICAgICAgcmV0dXJuIF9wcm9taXNlU3RyYXRlZ3k7XG4gICAgfSBlbHNlIGlmIChPYnNlcnZhYmxlV3JhcHBlci5pc09ic2VydmFibGUob2JqKSkge1xuICAgICAgcmV0dXJuIF9vYnNlcnZhYmxlU3RyYXRlZ3k7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkUGlwZUFyZ3VtZW50RXhjZXB0aW9uKEFzeW5jUGlwZSwgb2JqKTtcbiAgICB9XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9kaXNwb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuX3N0cmF0ZWd5LmRpc3Bvc2UodGhpcy5fc3Vic2NyaXB0aW9uKTtcbiAgICB0aGlzLl9sYXRlc3RWYWx1ZSA9IG51bGw7XG4gICAgdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZSA9IG51bGw7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICB0aGlzLl9vYmogPSBudWxsO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfdXBkYXRlTGF0ZXN0VmFsdWUoYXN5bmM6IGFueSwgdmFsdWU6IE9iamVjdCkge1xuICAgIGlmIChhc3luYyA9PT0gdGhpcy5fb2JqKSB7XG4gICAgICB0aGlzLl9sYXRlc3RWYWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5fcmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
