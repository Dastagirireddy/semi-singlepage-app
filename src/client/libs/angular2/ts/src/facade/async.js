System.register(['angular2/src/facade/lang', 'angular2/src/facade/promise', 'rxjs/Subject', 'rxjs/observable/PromiseObservable', 'rxjs/operator/toPromise', 'rxjs/Observable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lang_1, Subject_1, PromiseObservable_1, toPromise_1;
    var TimerWrapper, ObservableWrapper, EventEmitter;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (promise_1_1) {
                exports_1({
                    "PromiseWrapper": promise_1_1["PromiseWrapper"],
                    "PromiseCompleter": promise_1_1["PromiseCompleter"]
                });
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
                exports_1({
                    "Subject": Subject_1_1["Subject"]
                });
            },
            function (PromiseObservable_1_1) {
                PromiseObservable_1 = PromiseObservable_1_1;
            },
            function (toPromise_1_1) {
                toPromise_1 = toPromise_1_1;
            },
            function (Observable_1_1) {
                exports_1({
                    "Observable": Observable_1_1["Observable"]
                });
            }],
        execute: function() {
            TimerWrapper = (function () {
                function TimerWrapper() {
                }
                TimerWrapper.setTimeout = function (fn, millis) {
                    return lang_1.global.setTimeout(fn, millis);
                };
                TimerWrapper.clearTimeout = function (id) { lang_1.global.clearTimeout(id); };
                TimerWrapper.setInterval = function (fn, millis) {
                    return lang_1.global.setInterval(fn, millis);
                };
                TimerWrapper.clearInterval = function (id) { lang_1.global.clearInterval(id); };
                return TimerWrapper;
            }());
            exports_1("TimerWrapper", TimerWrapper);
            ObservableWrapper = (function () {
                function ObservableWrapper() {
                }
                // TODO(vsavkin): when we use rxnext, try inferring the generic type from the first arg
                ObservableWrapper.subscribe = function (emitter, onNext, onError, onComplete) {
                    if (onComplete === void 0) { onComplete = function () { }; }
                    onError = (typeof onError === "function") && onError || lang_1.noop;
                    onComplete = (typeof onComplete === "function") && onComplete || lang_1.noop;
                    return emitter.subscribe({ next: onNext, error: onError, complete: onComplete });
                };
                ObservableWrapper.isObservable = function (obs) { return !!obs.subscribe; };
                /**
                 * Returns whether `obs` has any subscribers listening to events.
                 */
                ObservableWrapper.hasSubscribers = function (obs) { return obs.observers.length > 0; };
                ObservableWrapper.dispose = function (subscription) { subscription.unsubscribe(); };
                /**
                 * @deprecated - use callEmit() instead
                 */
                ObservableWrapper.callNext = function (emitter, value) { emitter.next(value); };
                ObservableWrapper.callEmit = function (emitter, value) { emitter.emit(value); };
                ObservableWrapper.callError = function (emitter, error) { emitter.error(error); };
                ObservableWrapper.callComplete = function (emitter) { emitter.complete(); };
                ObservableWrapper.fromPromise = function (promise) {
                    return PromiseObservable_1.PromiseObservable.create(promise);
                };
                ObservableWrapper.toPromise = function (obj) { return toPromise_1.toPromise.call(obj); };
                return ObservableWrapper;
            }());
            exports_1("ObservableWrapper", ObservableWrapper);
            /**
             * Use by directives and components to emit custom Events.
             *
             * ### Examples
             *
             * In the following example, `Zippy` alternatively emits `open` and `close` events when its
             * title gets clicked:
             *
             * ```
             * @Component({
             *   selector: 'zippy',
             *   template: `
             *   <div class="zippy">
             *     <div (click)="toggle()">Toggle</div>
             *     <div [hidden]="!visible">
             *       <ng-content></ng-content>
             *     </div>
             *  </div>`})
             * export class Zippy {
             *   visible: boolean = true;
             *   @Output() open: EventEmitter<any> = new EventEmitter();
             *   @Output() close: EventEmitter<any> = new EventEmitter();
             *
             *   toggle() {
             *     this.visible = !this.visible;
             *     if (this.visible) {
             *       this.open.emit(null);
             *     } else {
             *       this.close.emit(null);
             *     }
             *   }
             * }
             * ```
             *
             * Use Rx.Observable but provides an adapter to make it work as specified here:
             * https://github.com/jhusain/observable-spec
             *
             * Once a reference implementation of the spec is available, switch to it.
             */
            EventEmitter = (function (_super) {
                __extends(EventEmitter, _super);
                /**
                 * Creates an instance of [EventEmitter], which depending on [isAsync],
                 * delivers events synchronously or asynchronously.
                 */
                function EventEmitter(isAsync) {
                    if (isAsync === void 0) { isAsync = true; }
                    _super.call(this);
                    this._isAsync = isAsync;
                }
                EventEmitter.prototype.emit = function (value) { _super.prototype.next.call(this, value); };
                /**
                 * @deprecated - use .emit(value) instead
                 */
                EventEmitter.prototype.next = function (value) { _super.prototype.next.call(this, value); };
                EventEmitter.prototype.subscribe = function (generatorOrNext, error, complete) {
                    var schedulerFn;
                    var errorFn = function (err) { return null; };
                    var completeFn = function () { return null; };
                    if (generatorOrNext && typeof generatorOrNext === 'object') {
                        schedulerFn = this._isAsync ? function (value) { setTimeout(function () { return generatorOrNext.next(value); }); } :
                            function (value) { generatorOrNext.next(value); };
                        if (generatorOrNext.error) {
                            errorFn = this._isAsync ? function (err) { setTimeout(function () { return generatorOrNext.error(err); }); } :
                                function (err) { generatorOrNext.error(err); };
                        }
                        if (generatorOrNext.complete) {
                            completeFn = this._isAsync ? function () { setTimeout(function () { return generatorOrNext.complete(); }); } :
                                function () { generatorOrNext.complete(); };
                        }
                    }
                    else {
                        schedulerFn = this._isAsync ? function (value) { setTimeout(function () { return generatorOrNext(value); }); } :
                            function (value) { generatorOrNext(value); };
                        if (error) {
                            errorFn =
                                this._isAsync ? function (err) { setTimeout(function () { return error(err); }); } : function (err) { error(err); };
                        }
                        if (complete) {
                            completeFn =
                                this._isAsync ? function () { setTimeout(function () { return complete(); }); } : function () { complete(); };
                        }
                    }
                    return _super.prototype.subscribe.call(this, schedulerFn, errorFn, completeFn);
                };
                return EventEmitter;
            }(Subject_1.Subject));
            exports_1("EventEmitter", EventEmitter);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2ZhY2FkZS9hc3luYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFZQTtnQkFBQTtnQkFVQSxDQUFDO2dCQVRRLHVCQUFVLEdBQWpCLFVBQWtCLEVBQTRCLEVBQUUsTUFBYztvQkFDNUQsTUFBTSxDQUFDLGFBQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUN2QyxDQUFDO2dCQUNNLHlCQUFZLEdBQW5CLFVBQW9CLEVBQVUsSUFBVSxhQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFM0Qsd0JBQVcsR0FBbEIsVUFBbUIsRUFBNEIsRUFBRSxNQUFjO29CQUM3RCxNQUFNLENBQUMsYUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ3hDLENBQUM7Z0JBQ00sMEJBQWEsR0FBcEIsVUFBcUIsRUFBVSxJQUFVLGFBQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0RSxtQkFBQztZQUFELENBVkEsQUFVQyxJQUFBO1lBVkQsdUNBVUMsQ0FBQTtZQUVEO2dCQUFBO2dCQWtDQSxDQUFDO2dCQWpDQyx1RkFBdUY7Z0JBQ2hGLDJCQUFTLEdBQWhCLFVBQW9CLE9BQVksRUFBRSxNQUEwQixFQUFFLE9BQWtDLEVBQzVFLFVBQWlDO29CQUFqQywwQkFBaUMsR0FBakMsYUFBeUIsY0FBTyxDQUFDO29CQUNuRCxPQUFPLEdBQUcsQ0FBQyxPQUFPLE9BQU8sS0FBSyxVQUFVLENBQUMsSUFBSSxPQUFPLElBQUksV0FBSSxDQUFDO29CQUM3RCxVQUFVLEdBQUcsQ0FBQyxPQUFPLFVBQVUsS0FBSyxVQUFVLENBQUMsSUFBSSxVQUFVLElBQUksV0FBSSxDQUFDO29CQUN0RSxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQztnQkFDakYsQ0FBQztnQkFFTSw4QkFBWSxHQUFuQixVQUFvQixHQUFRLElBQWEsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFFbEU7O21CQUVHO2dCQUNJLGdDQUFjLEdBQXJCLFVBQXNCLEdBQXNCLElBQWEsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXBGLHlCQUFPLEdBQWQsVUFBZSxZQUFpQixJQUFJLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRWpFOzttQkFFRztnQkFDSSwwQkFBUSxHQUFmLFVBQWdCLE9BQTBCLEVBQUUsS0FBVSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUV6RSwwQkFBUSxHQUFmLFVBQWdCLE9BQTBCLEVBQUUsS0FBVSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUV6RSwyQkFBUyxHQUFoQixVQUFpQixPQUEwQixFQUFFLEtBQVUsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFM0UsOEJBQVksR0FBbkIsVUFBb0IsT0FBMEIsSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUVoRSw2QkFBVyxHQUFsQixVQUFtQixPQUFxQjtvQkFDdEMsTUFBTSxDQUFDLHFDQUFpQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDM0MsQ0FBQztnQkFFTSwyQkFBUyxHQUFoQixVQUFpQixHQUFvQixJQUFrQixNQUFNLENBQUMscUJBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0Rix3QkFBQztZQUFELENBbENBLEFBa0NDLElBQUE7WUFsQ0QsaURBa0NDLENBQUE7WUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFzQ0c7WUFDSDtnQkFBcUMsZ0NBQVU7Z0JBSTdDOzs7bUJBR0c7Z0JBQ0gsc0JBQVksT0FBdUI7b0JBQXZCLHVCQUF1QixHQUF2QixjQUF1QjtvQkFDakMsaUJBQU8sQ0FBQztvQkFDUixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztnQkFDMUIsQ0FBQztnQkFFRCwyQkFBSSxHQUFKLFVBQUssS0FBUSxJQUFJLGdCQUFLLENBQUMsSUFBSSxZQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFckM7O21CQUVHO2dCQUNILDJCQUFJLEdBQUosVUFBSyxLQUFVLElBQUksZ0JBQUssQ0FBQyxJQUFJLFlBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUV2QyxnQ0FBUyxHQUFULFVBQVUsZUFBcUIsRUFBRSxLQUFXLEVBQUUsUUFBYztvQkFDMUQsSUFBSSxXQUFXLENBQUM7b0JBQ2hCLElBQUksT0FBTyxHQUFHLFVBQUMsR0FBUSxJQUFLLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQztvQkFDakMsSUFBSSxVQUFVLEdBQUcsY0FBTSxPQUFBLElBQUksRUFBSixDQUFJLENBQUM7b0JBRTVCLEVBQUUsQ0FBQyxDQUFDLGVBQWUsSUFBSSxPQUFPLGVBQWUsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO3dCQUMzRCxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFDLEtBQUssSUFBTyxVQUFVLENBQUMsY0FBTSxPQUFBLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQTNCLENBQTJCLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzdELFVBQUMsS0FBSyxJQUFPLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBRTFFLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzRCQUMxQixPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFDLEdBQUcsSUFBTyxVQUFVLENBQUMsY0FBTSxPQUFBLGVBQWUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQTFCLENBQTBCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQzFELFVBQUMsR0FBRyxJQUFPLGVBQWUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3JFLENBQUM7d0JBRUQsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7NEJBQzdCLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLGNBQVEsVUFBVSxDQUFDLGNBQU0sT0FBQSxlQUFlLENBQUMsUUFBUSxFQUFFLEVBQTFCLENBQTBCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ3ZELGNBQVEsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNyRSxDQUFDO29CQUNILENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBQyxLQUFLLElBQU8sVUFBVSxDQUFDLGNBQU0sT0FBQSxlQUFlLENBQUMsS0FBSyxDQUFDLEVBQXRCLENBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3hELFVBQUMsS0FBSyxJQUFPLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFFckUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs0QkFDVixPQUFPO2dDQUNILElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBQyxHQUFHLElBQU8sVUFBVSxDQUFDLGNBQU0sT0FBQSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQVYsQ0FBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBQyxHQUFHLElBQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM1RixDQUFDO3dCQUVELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7NEJBQ2IsVUFBVTtnQ0FDTixJQUFJLENBQUMsUUFBUSxHQUFHLGNBQVEsVUFBVSxDQUFDLGNBQU0sT0FBQSxRQUFRLEVBQUUsRUFBVixDQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxjQUFRLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN0RixDQUFDO29CQUNILENBQUM7b0JBRUQsTUFBTSxDQUFDLGdCQUFLLENBQUMsU0FBUyxZQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQzNELENBQUM7Z0JBQ0gsbUJBQUM7WUFBRCxDQXZEQSxBQXVEQyxDQXZEb0MsaUJBQU8sR0F1RDNDO1lBdkRELHVDQXVEQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2ZhY2FkZS9hc3luYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Z2xvYmFsLCBub29wfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuZXhwb3J0IHtQcm9taXNlV3JhcHBlciwgUHJvbWlzZUNvbXBsZXRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9wcm9taXNlJztcblxuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzL1N1YmplY3QnO1xuXG5pbXBvcnQge1Byb21pc2VPYnNlcnZhYmxlfSBmcm9tICdyeGpzL29ic2VydmFibGUvUHJvbWlzZU9ic2VydmFibGUnO1xuaW1wb3J0IHt0b1Byb21pc2V9IGZyb20gJ3J4anMvb3BlcmF0b3IvdG9Qcm9taXNlJztcblxuZXhwb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuZXhwb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzL1N1YmplY3QnO1xuXG5leHBvcnQgY2xhc3MgVGltZXJXcmFwcGVyIHtcbiAgc3RhdGljIHNldFRpbWVvdXQoZm46ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCwgbWlsbGlzOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBnbG9iYWwuc2V0VGltZW91dChmbiwgbWlsbGlzKTtcbiAgfVxuICBzdGF0aWMgY2xlYXJUaW1lb3V0KGlkOiBudW1iZXIpOiB2b2lkIHsgZ2xvYmFsLmNsZWFyVGltZW91dChpZCk7IH1cblxuICBzdGF0aWMgc2V0SW50ZXJ2YWwoZm46ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCwgbWlsbGlzOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBnbG9iYWwuc2V0SW50ZXJ2YWwoZm4sIG1pbGxpcyk7XG4gIH1cbiAgc3RhdGljIGNsZWFySW50ZXJ2YWwoaWQ6IG51bWJlcik6IHZvaWQgeyBnbG9iYWwuY2xlYXJJbnRlcnZhbChpZCk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIE9ic2VydmFibGVXcmFwcGVyIHtcbiAgLy8gVE9ETyh2c2F2a2luKTogd2hlbiB3ZSB1c2UgcnhuZXh0LCB0cnkgaW5mZXJyaW5nIHRoZSBnZW5lcmljIHR5cGUgZnJvbSB0aGUgZmlyc3QgYXJnXG4gIHN0YXRpYyBzdWJzY3JpYmU8VD4oZW1pdHRlcjogYW55LCBvbk5leHQ6ICh2YWx1ZTogVCkgPT4gdm9pZCwgb25FcnJvcj86IChleGNlcHRpb246IGFueSkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB2b2lkID0gKCkgPT4ge30pOiBPYmplY3Qge1xuICAgIG9uRXJyb3IgPSAodHlwZW9mIG9uRXJyb3IgPT09IFwiZnVuY3Rpb25cIikgJiYgb25FcnJvciB8fCBub29wO1xuICAgIG9uQ29tcGxldGUgPSAodHlwZW9mIG9uQ29tcGxldGUgPT09IFwiZnVuY3Rpb25cIikgJiYgb25Db21wbGV0ZSB8fCBub29wO1xuICAgIHJldHVybiBlbWl0dGVyLnN1YnNjcmliZSh7bmV4dDogb25OZXh0LCBlcnJvcjogb25FcnJvciwgY29tcGxldGU6IG9uQ29tcGxldGV9KTtcbiAgfVxuXG4gIHN0YXRpYyBpc09ic2VydmFibGUob2JzOiBhbnkpOiBib29sZWFuIHsgcmV0dXJuICEhb2JzLnN1YnNjcmliZTsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgYG9ic2AgaGFzIGFueSBzdWJzY3JpYmVycyBsaXN0ZW5pbmcgdG8gZXZlbnRzLlxuICAgKi9cbiAgc3RhdGljIGhhc1N1YnNjcmliZXJzKG9iczogRXZlbnRFbWl0dGVyPGFueT4pOiBib29sZWFuIHsgcmV0dXJuIG9icy5vYnNlcnZlcnMubGVuZ3RoID4gMDsgfVxuXG4gIHN0YXRpYyBkaXNwb3NlKHN1YnNjcmlwdGlvbjogYW55KSB7IHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpOyB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIC0gdXNlIGNhbGxFbWl0KCkgaW5zdGVhZFxuICAgKi9cbiAgc3RhdGljIGNhbGxOZXh0KGVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxhbnk+LCB2YWx1ZTogYW55KSB7IGVtaXR0ZXIubmV4dCh2YWx1ZSk7IH1cblxuICBzdGF0aWMgY2FsbEVtaXQoZW1pdHRlcjogRXZlbnRFbWl0dGVyPGFueT4sIHZhbHVlOiBhbnkpIHsgZW1pdHRlci5lbWl0KHZhbHVlKTsgfVxuXG4gIHN0YXRpYyBjYWxsRXJyb3IoZW1pdHRlcjogRXZlbnRFbWl0dGVyPGFueT4sIGVycm9yOiBhbnkpIHsgZW1pdHRlci5lcnJvcihlcnJvcik7IH1cblxuICBzdGF0aWMgY2FsbENvbXBsZXRlKGVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxhbnk+KSB7IGVtaXR0ZXIuY29tcGxldGUoKTsgfVxuXG4gIHN0YXRpYyBmcm9tUHJvbWlzZShwcm9taXNlOiBQcm9taXNlPGFueT4pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiBQcm9taXNlT2JzZXJ2YWJsZS5jcmVhdGUocHJvbWlzZSk7XG4gIH1cblxuICBzdGF0aWMgdG9Qcm9taXNlKG9iajogT2JzZXJ2YWJsZTxhbnk+KTogUHJvbWlzZTxhbnk+IHsgcmV0dXJuIHRvUHJvbWlzZS5jYWxsKG9iaik7IH1cbn1cblxuLyoqXG4gKiBVc2UgYnkgZGlyZWN0aXZlcyBhbmQgY29tcG9uZW50cyB0byBlbWl0IGN1c3RvbSBFdmVudHMuXG4gKlxuICogIyMjIEV4YW1wbGVzXG4gKlxuICogSW4gdGhlIGZvbGxvd2luZyBleGFtcGxlLCBgWmlwcHlgIGFsdGVybmF0aXZlbHkgZW1pdHMgYG9wZW5gIGFuZCBgY2xvc2VgIGV2ZW50cyB3aGVuIGl0c1xuICogdGl0bGUgZ2V0cyBjbGlja2VkOlxuICpcbiAqIGBgYFxuICogQENvbXBvbmVudCh7XG4gKiAgIHNlbGVjdG9yOiAnemlwcHknLFxuICogICB0ZW1wbGF0ZTogYFxuICogICA8ZGl2IGNsYXNzPVwiemlwcHlcIj5cbiAqICAgICA8ZGl2IChjbGljayk9XCJ0b2dnbGUoKVwiPlRvZ2dsZTwvZGl2PlxuICogICAgIDxkaXYgW2hpZGRlbl09XCIhdmlzaWJsZVwiPlxuICogICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICogICAgIDwvZGl2PlxuICogIDwvZGl2PmB9KVxuICogZXhwb3J0IGNsYXNzIFppcHB5IHtcbiAqICAgdmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG4gKiAgIEBPdXRwdXQoKSBvcGVuOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAqICAgQE91dHB1dCgpIGNsb3NlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAqXG4gKiAgIHRvZ2dsZSgpIHtcbiAqICAgICB0aGlzLnZpc2libGUgPSAhdGhpcy52aXNpYmxlO1xuICogICAgIGlmICh0aGlzLnZpc2libGUpIHtcbiAqICAgICAgIHRoaXMub3Blbi5lbWl0KG51bGwpO1xuICogICAgIH0gZWxzZSB7XG4gKiAgICAgICB0aGlzLmNsb3NlLmVtaXQobnVsbCk7XG4gKiAgICAgfVxuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBVc2UgUnguT2JzZXJ2YWJsZSBidXQgcHJvdmlkZXMgYW4gYWRhcHRlciB0byBtYWtlIGl0IHdvcmsgYXMgc3BlY2lmaWVkIGhlcmU6XG4gKiBodHRwczovL2dpdGh1Yi5jb20vamh1c2Fpbi9vYnNlcnZhYmxlLXNwZWNcbiAqXG4gKiBPbmNlIGEgcmVmZXJlbmNlIGltcGxlbWVudGF0aW9uIG9mIHRoZSBzcGVjIGlzIGF2YWlsYWJsZSwgc3dpdGNoIHRvIGl0LlxuICovXG5leHBvcnQgY2xhc3MgRXZlbnRFbWl0dGVyPFQ+IGV4dGVuZHMgU3ViamVjdDxUPiB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2lzQXN5bmM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgW0V2ZW50RW1pdHRlcl0sIHdoaWNoIGRlcGVuZGluZyBvbiBbaXNBc3luY10sXG4gICAqIGRlbGl2ZXJzIGV2ZW50cyBzeW5jaHJvbm91c2x5IG9yIGFzeW5jaHJvbm91c2x5LlxuICAgKi9cbiAgY29uc3RydWN0b3IoaXNBc3luYzogYm9vbGVhbiA9IHRydWUpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2lzQXN5bmMgPSBpc0FzeW5jO1xuICB9XG5cbiAgZW1pdCh2YWx1ZTogVCkgeyBzdXBlci5uZXh0KHZhbHVlKTsgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCAtIHVzZSAuZW1pdCh2YWx1ZSkgaW5zdGVhZFxuICAgKi9cbiAgbmV4dCh2YWx1ZTogYW55KSB7IHN1cGVyLm5leHQodmFsdWUpOyB9XG5cbiAgc3Vic2NyaWJlKGdlbmVyYXRvck9yTmV4dD86IGFueSwgZXJyb3I/OiBhbnksIGNvbXBsZXRlPzogYW55KTogYW55IHtcbiAgICBsZXQgc2NoZWR1bGVyRm47XG4gICAgbGV0IGVycm9yRm4gPSAoZXJyOiBhbnkpID0+IG51bGw7XG4gICAgbGV0IGNvbXBsZXRlRm4gPSAoKSA9PiBudWxsO1xuXG4gICAgaWYgKGdlbmVyYXRvck9yTmV4dCAmJiB0eXBlb2YgZ2VuZXJhdG9yT3JOZXh0ID09PSAnb2JqZWN0Jykge1xuICAgICAgc2NoZWR1bGVyRm4gPSB0aGlzLl9pc0FzeW5jID8gKHZhbHVlKSA9PiB7IHNldFRpbWVvdXQoKCkgPT4gZ2VuZXJhdG9yT3JOZXh0Lm5leHQodmFsdWUpKTsgfSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmFsdWUpID0+IHsgZ2VuZXJhdG9yT3JOZXh0Lm5leHQodmFsdWUpOyB9O1xuXG4gICAgICBpZiAoZ2VuZXJhdG9yT3JOZXh0LmVycm9yKSB7XG4gICAgICAgIGVycm9yRm4gPSB0aGlzLl9pc0FzeW5jID8gKGVycikgPT4geyBzZXRUaW1lb3V0KCgpID0+IGdlbmVyYXRvck9yTmV4dC5lcnJvcihlcnIpKTsgfSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVycikgPT4geyBnZW5lcmF0b3JPck5leHQuZXJyb3IoZXJyKTsgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKGdlbmVyYXRvck9yTmV4dC5jb21wbGV0ZSkge1xuICAgICAgICBjb21wbGV0ZUZuID0gdGhpcy5faXNBc3luYyA/ICgpID0+IHsgc2V0VGltZW91dCgoKSA9PiBnZW5lcmF0b3JPck5leHQuY29tcGxldGUoKSk7IH0gOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHsgZ2VuZXJhdG9yT3JOZXh0LmNvbXBsZXRlKCk7IH07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNjaGVkdWxlckZuID0gdGhpcy5faXNBc3luYyA/ICh2YWx1ZSkgPT4geyBzZXRUaW1lb3V0KCgpID0+IGdlbmVyYXRvck9yTmV4dCh2YWx1ZSkpOyB9IDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2YWx1ZSkgPT4geyBnZW5lcmF0b3JPck5leHQodmFsdWUpOyB9O1xuXG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgZXJyb3JGbiA9XG4gICAgICAgICAgICB0aGlzLl9pc0FzeW5jID8gKGVycikgPT4geyBzZXRUaW1lb3V0KCgpID0+IGVycm9yKGVycikpOyB9IDogKGVycikgPT4geyBlcnJvcihlcnIpOyB9O1xuICAgICAgfVxuXG4gICAgICBpZiAoY29tcGxldGUpIHtcbiAgICAgICAgY29tcGxldGVGbiA9XG4gICAgICAgICAgICB0aGlzLl9pc0FzeW5jID8gKCkgPT4geyBzZXRUaW1lb3V0KCgpID0+IGNvbXBsZXRlKCkpOyB9IDogKCkgPT4geyBjb21wbGV0ZSgpOyB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzdXBlci5zdWJzY3JpYmUoc2NoZWR1bGVyRm4sIGVycm9yRm4sIGNvbXBsZXRlRm4pO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
