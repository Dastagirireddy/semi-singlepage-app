System.register(['../observable/FromObservable', '../util/isArray', '../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var FromObservable_1, isArray_1, OuterSubscriber_1, subscribeToResult_1;
    var OnErrorResumeNextOperator, OnErrorResumeNextSubscriber;
    function onErrorResumeNext() {
        var nextSources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            nextSources[_i - 0] = arguments[_i];
        }
        if (nextSources.length === 1 && isArray_1.isArray(nextSources[0])) {
            nextSources = nextSources[0];
        }
        return this.lift(new OnErrorResumeNextOperator(nextSources));
    }
    exports_1("onErrorResumeNext", onErrorResumeNext);
    /* tslint:enable:max-line-length */
    function onErrorResumeNextStatic() {
        var nextSources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            nextSources[_i - 0] = arguments[_i];
        }
        var source = null;
        if (nextSources.length === 1 && isArray_1.isArray(nextSources[0])) {
            nextSources = nextSources[0];
        }
        source = nextSources.shift();
        return new FromObservable_1.FromObservable(source, null).lift(new OnErrorResumeNextOperator(nextSources));
    }
    exports_1("onErrorResumeNextStatic", onErrorResumeNextStatic);
    return {
        setters:[
            function (FromObservable_1_1) {
                FromObservable_1 = FromObservable_1_1;
            },
            function (isArray_1_1) {
                isArray_1 = isArray_1_1;
            },
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            OnErrorResumeNextOperator = (function () {
                function OnErrorResumeNextOperator(nextSources) {
                    this.nextSources = nextSources;
                }
                OnErrorResumeNextOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new OnErrorResumeNextSubscriber(subscriber, this.nextSources));
                };
                return OnErrorResumeNextOperator;
            }());
            OnErrorResumeNextSubscriber = (function (_super) {
                __extends(OnErrorResumeNextSubscriber, _super);
                function OnErrorResumeNextSubscriber(destination, nextSources) {
                    _super.call(this, destination);
                    this.destination = destination;
                    this.nextSources = nextSources;
                }
                OnErrorResumeNextSubscriber.prototype.notifyError = function (error, innerSub) {
                    this.subscribeToNextSource();
                };
                OnErrorResumeNextSubscriber.prototype.notifyComplete = function (innerSub) {
                    this.subscribeToNextSource();
                };
                OnErrorResumeNextSubscriber.prototype._error = function (err) {
                    this.subscribeToNextSource();
                };
                OnErrorResumeNextSubscriber.prototype._complete = function () {
                    this.subscribeToNextSource();
                };
                OnErrorResumeNextSubscriber.prototype.subscribeToNextSource = function () {
                    var next = this.nextSources.shift();
                    if (next) {
                        this.add(subscribeToResult_1.subscribeToResult(this, next));
                    }
                    else {
                        this.destination.complete();
                    }
                };
                return OnErrorResumeNextSubscriber;
            }(OuterSubscriber_1.OuterSubscriber));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL29uRXJyb3JSZXN1bWVOZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFTQTtRQUF3QyxxQkFFOEM7YUFGOUMsV0FFOEMsQ0FGOUMsc0JBRThDLENBRjlDLElBRThDO1lBRjlDLG9DQUU4Qzs7UUFDcEYsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksaUJBQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEQsV0FBVyxHQUEyQixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUkseUJBQXlCLENBQU8sV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBUkQsaURBUUMsQ0FBQTtJQXdCRCxtQ0FBbUM7SUFFbkM7UUFBOEMscUJBRStDO2FBRi9DLFdBRStDLENBRi9DLHNCQUUrQyxDQUYvQyxJQUUrQztZQUYvQyxvQ0FFK0M7O1FBQzNGLElBQUksTUFBTSxHQUF5QixJQUFJLENBQUM7UUFFeEMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksaUJBQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEQsV0FBVyxHQUFnQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUQsQ0FBQztRQUNELE1BQU0sR0FBRyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFN0IsTUFBTSxDQUFDLElBQUksK0JBQWMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUkseUJBQXlCLENBQU8sV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNqRyxDQUFDO0lBWEQsNkRBV0MsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7OztZQUVEO2dCQUNFLG1DQUFvQixXQUF3QztvQkFBeEMsZ0JBQVcsR0FBWCxXQUFXLENBQTZCO2dCQUM1RCxDQUFDO2dCQUVELHdDQUFJLEdBQUosVUFBSyxVQUF5QixFQUFFLE1BQVc7b0JBQ3pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksMkJBQTJCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUMxRixDQUFDO2dCQUNILGdDQUFDO1lBQUQsQ0FQQSxBQU9DLElBQUE7WUFFRDtnQkFBZ0QsK0NBQXFCO2dCQUNuRSxxQ0FBc0IsV0FBMEIsRUFDNUIsV0FBd0M7b0JBQzFELGtCQUFNLFdBQVcsQ0FBQyxDQUFDO29CQUZDLGdCQUFXLEdBQVgsV0FBVyxDQUFlO29CQUM1QixnQkFBVyxHQUFYLFdBQVcsQ0FBNkI7Z0JBRTVELENBQUM7Z0JBRUQsaURBQVcsR0FBWCxVQUFZLEtBQVUsRUFBRSxRQUFpQztvQkFDdkQsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7Z0JBQy9CLENBQUM7Z0JBRUQsb0RBQWMsR0FBZCxVQUFlLFFBQWlDO29CQUM5QyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztnQkFDL0IsQ0FBQztnQkFFUyw0Q0FBTSxHQUFoQixVQUFpQixHQUFRO29CQUN2QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztnQkFDL0IsQ0FBQztnQkFFUywrQ0FBUyxHQUFuQjtvQkFDRSxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztnQkFDL0IsQ0FBQztnQkFFTywyREFBcUIsR0FBN0I7b0JBQ0UsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDdEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDVCxJQUFJLENBQUMsR0FBRyxDQUFDLHFDQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUMxQyxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQzlCLENBQUM7Z0JBQ0gsQ0FBQztnQkFDSCxrQ0FBQztZQUFELENBOUJBLEFBOEJDLENBOUIrQyxpQ0FBZSxHQThCOUQiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvcnhqcy9zcmMvb3BlcmF0b3Ivb25FcnJvclJlc3VtZU5leHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09ic2VydmFibGUsIE9ic2VydmFibGVJbnB1dH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7RnJvbU9ic2VydmFibGV9IGZyb20gJy4uL29ic2VydmFibGUvRnJvbU9ic2VydmFibGUnO1xyXG5pbXBvcnQge09wZXJhdG9yfSBmcm9tICcuLi9PcGVyYXRvcic7XHJcbmltcG9ydCB7U3Vic2NyaWJlcn0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XHJcbmltcG9ydCB7aXNBcnJheX0gZnJvbSAnLi4vdXRpbC9pc0FycmF5JztcclxuaW1wb3J0IHtPdXRlclN1YnNjcmliZXJ9IGZyb20gJy4uL091dGVyU3Vic2NyaWJlcic7XHJcbmltcG9ydCB7SW5uZXJTdWJzY3JpYmVyfSBmcm9tICcuLi9Jbm5lclN1YnNjcmliZXInO1xyXG5pbXBvcnQge3N1YnNjcmliZVRvUmVzdWx0fSBmcm9tICcuLi91dGlsL3N1YnNjcmliZVRvUmVzdWx0JztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvbkVycm9yUmVzdW1lTmV4dDxULCBSPiguLi5uZXh0U291cmNlczogQXJyYXk8T2JzZXJ2YWJsZUlucHV0PGFueT4gfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXJyYXk8T2JzZXJ2YWJsZUlucHV0PGFueT4+IHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoLi4udmFsdWVzOiBBcnJheTxhbnk+KSA9PiBSKT4pOiBPYnNlcnZhYmxlPFI+IHtcclxuICBpZiAobmV4dFNvdXJjZXMubGVuZ3RoID09PSAxICYmIGlzQXJyYXkobmV4dFNvdXJjZXNbMF0pKSB7XHJcbiAgICBuZXh0U291cmNlcyA9IDxBcnJheTxPYnNlcnZhYmxlPGFueT4+Pm5leHRTb3VyY2VzWzBdO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgT25FcnJvclJlc3VtZU5leHRPcGVyYXRvcjxULCBSPihuZXh0U291cmNlcykpO1xyXG59XHJcblxyXG4vKiB0c2xpbnQ6ZGlzYWJsZTptYXgtbGluZS1sZW5ndGggKi9cclxuZXhwb3J0IGludGVyZmFjZSBPbkVycm9yUmVzdW1lTmV4dFNpZ25hdHVyZTxUPiB7XHJcbiAgPFI+KHY6IE9ic2VydmFibGVJbnB1dDxSPik6IE9ic2VydmFibGU8Uj47XHJcbiAgPFQyLCBUMywgUj4odjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+KTogT2JzZXJ2YWJsZTxSPjtcclxuICA8VDIsIFQzLCBUNCwgUj4odjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCB2NDogT2JzZXJ2YWJsZUlucHV0PFQ0Pik6IE9ic2VydmFibGU8Uj47XHJcbiAgPFQyLCBUMywgVDQsIFQ1LCBSPih2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgdjM6IE9ic2VydmFibGVJbnB1dDxUMz4sIHY0OiBPYnNlcnZhYmxlSW5wdXQ8VDQ+LCB2NTogT2JzZXJ2YWJsZUlucHV0PFQ1Pik6IE9ic2VydmFibGU8Uj47XHJcbiAgPFQyLCBUMywgVDQsIFQ1LCBUNiwgUj4odjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCB2NDogT2JzZXJ2YWJsZUlucHV0PFQ0PiwgdjU6IE9ic2VydmFibGVJbnB1dDxUNT4sIHY2OiBPYnNlcnZhYmxlSW5wdXQ8VDY+KTogT2JzZXJ2YWJsZTxSPjtcclxuXHJcbiAgPFI+KC4uLm9ic2VydmFibGVzOiBBcnJheTxPYnNlcnZhYmxlSW5wdXQ8YW55PiB8ICgoLi4udmFsdWVzOiBBcnJheTxhbnk+KSA9PiBSKT4pOiBPYnNlcnZhYmxlPFI+O1xyXG4gIDxSPihhcnJheTogT2JzZXJ2YWJsZUlucHV0PGFueT5bXSk6IE9ic2VydmFibGU8Uj47XHJcbn1cclxuLyogdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGggKi9cclxuXHJcbi8qIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gb25FcnJvclJlc3VtZU5leHRTdGF0aWM8Uj4odjogT2JzZXJ2YWJsZUlucHV0PFI+KTogT2JzZXJ2YWJsZTxSPjtcclxuZXhwb3J0IGZ1bmN0aW9uIG9uRXJyb3JSZXN1bWVOZXh0U3RhdGljPFQyLCBUMywgUj4odjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+KTogT2JzZXJ2YWJsZTxSPjtcclxuZXhwb3J0IGZ1bmN0aW9uIG9uRXJyb3JSZXN1bWVOZXh0U3RhdGljPFQyLCBUMywgVDQsIFI+KHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgdjQ6IE9ic2VydmFibGVJbnB1dDxUND4pOiBPYnNlcnZhYmxlPFI+O1xyXG5leHBvcnQgZnVuY3Rpb24gb25FcnJvclJlc3VtZU5leHRTdGF0aWM8VDIsIFQzLCBUNCwgVDUsIFI+KHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgdjQ6IE9ic2VydmFibGVJbnB1dDxUND4sIHY1OiBPYnNlcnZhYmxlSW5wdXQ8VDU+KTogT2JzZXJ2YWJsZTxSPjtcclxuZXhwb3J0IGZ1bmN0aW9uIG9uRXJyb3JSZXN1bWVOZXh0U3RhdGljPFQyLCBUMywgVDQsIFQ1LCBUNiwgUj4odjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCB2NDogT2JzZXJ2YWJsZUlucHV0PFQ0PiwgdjU6IE9ic2VydmFibGVJbnB1dDxUNT4sIHY2OiBPYnNlcnZhYmxlSW5wdXQ8VDY+KTogT2JzZXJ2YWJsZTxSPjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvbkVycm9yUmVzdW1lTmV4dFN0YXRpYzxSPiguLi5vYnNlcnZhYmxlczogQXJyYXk8T2JzZXJ2YWJsZUlucHV0PGFueT4gfCAoKC4uLnZhbHVlczogQXJyYXk8YW55PikgPT4gUik+KTogT2JzZXJ2YWJsZTxSPjtcclxuZXhwb3J0IGZ1bmN0aW9uIG9uRXJyb3JSZXN1bWVOZXh0U3RhdGljPFI+KGFycmF5OiBPYnNlcnZhYmxlSW5wdXQ8YW55PltdKTogT2JzZXJ2YWJsZTxSPjtcclxuLyogdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGggKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvbkVycm9yUmVzdW1lTmV4dFN0YXRpYzxULCBSPiguLi5uZXh0U291cmNlczogQXJyYXk8T2JzZXJ2YWJsZUlucHV0PGFueT4gfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFycmF5PE9ic2VydmFibGVJbnB1dDxhbnk+PiB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCguLi52YWx1ZXM6IEFycmF5PGFueT4pID0+IFIpPik6IE9ic2VydmFibGU8Uj4ge1xyXG4gIGxldCBzb3VyY2U6IE9ic2VydmFibGVJbnB1dDxhbnk+ID0gbnVsbDtcclxuXHJcbiAgaWYgKG5leHRTb3VyY2VzLmxlbmd0aCA9PT0gMSAmJiBpc0FycmF5KG5leHRTb3VyY2VzWzBdKSkge1xyXG4gICAgbmV4dFNvdXJjZXMgPSA8QXJyYXk8T2JzZXJ2YWJsZUlucHV0PGFueT4+Pm5leHRTb3VyY2VzWzBdO1xyXG4gIH1cclxuICBzb3VyY2UgPSBuZXh0U291cmNlcy5zaGlmdCgpO1xyXG5cclxuICByZXR1cm4gbmV3IEZyb21PYnNlcnZhYmxlKHNvdXJjZSwgbnVsbCkubGlmdChuZXcgT25FcnJvclJlc3VtZU5leHRPcGVyYXRvcjxULCBSPihuZXh0U291cmNlcykpO1xyXG59XHJcblxyXG5jbGFzcyBPbkVycm9yUmVzdW1lTmV4dE9wZXJhdG9yPFQsIFI+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgUj4ge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmV4dFNvdXJjZXM6IEFycmF5PE9ic2VydmFibGVJbnB1dDxhbnk+Pikge1xyXG4gIH1cclxuXHJcbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFI+LCBzb3VyY2U6IGFueSk6IGFueSB7XHJcbiAgICByZXR1cm4gc291cmNlLl9zdWJzY3JpYmUobmV3IE9uRXJyb3JSZXN1bWVOZXh0U3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLm5leHRTb3VyY2VzKSk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBPbkVycm9yUmVzdW1lTmV4dFN1YnNjcmliZXI8VCwgUj4gZXh0ZW5kcyBPdXRlclN1YnNjcmliZXI8VCwgUj4ge1xyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxUPixcclxuICAgICAgICAgICAgICBwcml2YXRlIG5leHRTb3VyY2VzOiBBcnJheTxPYnNlcnZhYmxlSW5wdXQ8YW55Pj4pIHtcclxuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcclxuICB9XHJcblxyXG4gIG5vdGlmeUVycm9yKGVycm9yOiBhbnksIGlubmVyU3ViOiBJbm5lclN1YnNjcmliZXI8VCwgYW55Pik6IHZvaWQge1xyXG4gICAgdGhpcy5zdWJzY3JpYmVUb05leHRTb3VyY2UoKTtcclxuICB9XHJcblxyXG4gIG5vdGlmeUNvbXBsZXRlKGlubmVyU3ViOiBJbm5lclN1YnNjcmliZXI8VCwgYW55Pik6IHZvaWQge1xyXG4gICAgdGhpcy5zdWJzY3JpYmVUb05leHRTb3VyY2UoKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfZXJyb3IoZXJyOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMuc3Vic2NyaWJlVG9OZXh0U291cmNlKCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX2NvbXBsZXRlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zdWJzY3JpYmVUb05leHRTb3VyY2UoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9OZXh0U291cmNlKCk6IHZvaWQge1xyXG4gICAgY29uc3QgbmV4dCA9IHRoaXMubmV4dFNvdXJjZXMuc2hpZnQoKTtcclxuICAgIGlmIChuZXh0KSB7XHJcbiAgICAgIHRoaXMuYWRkKHN1YnNjcmliZVRvUmVzdWx0KHRoaXMsIG5leHQpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcclxuICAgIH1cclxuICB9XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
