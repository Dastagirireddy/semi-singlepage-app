System.register(['angular2/src/core/di', 'angular2/src/core/metadata/view', 'angular2/src/core/metadata/directives', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/collection', 'angular2/src/core/reflection/reflector_reader', 'angular2/src/core/reflection/reflection'], function(exports_1, context_1) {
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
    var di_1, view_1, directives_1, lang_1, exceptions_1, collection_1, reflector_reader_1, reflection_1;
    var ViewResolver;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (view_1_1) {
                view_1 = view_1_1;
            },
            function (directives_1_1) {
                directives_1 = directives_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (reflector_reader_1_1) {
                reflector_reader_1 = reflector_reader_1_1;
            },
            function (reflection_1_1) {
                reflection_1 = reflection_1_1;
            }],
        execute: function() {
            /**
             * Resolves types to {@link ViewMetadata}.
             */
            ViewResolver = (function () {
                function ViewResolver(_reflector) {
                    /** @internal */
                    this._cache = new collection_1.Map();
                    if (lang_1.isPresent(_reflector)) {
                        this._reflector = _reflector;
                    }
                    else {
                        this._reflector = reflection_1.reflector;
                    }
                }
                ViewResolver.prototype.resolve = function (component) {
                    var view = this._cache.get(component);
                    if (lang_1.isBlank(view)) {
                        view = this._resolve(component);
                        this._cache.set(component, view);
                    }
                    return view;
                };
                /** @internal */
                ViewResolver.prototype._resolve = function (component) {
                    var compMeta;
                    var viewMeta;
                    this._reflector.annotations(component).forEach(function (m) {
                        if (m instanceof view_1.ViewMetadata) {
                            viewMeta = m;
                        }
                        if (m instanceof directives_1.ComponentMetadata) {
                            compMeta = m;
                        }
                    });
                    if (lang_1.isPresent(compMeta)) {
                        if (lang_1.isBlank(compMeta.template) && lang_1.isBlank(compMeta.templateUrl) && lang_1.isBlank(viewMeta)) {
                            throw new exceptions_1.BaseException("Component '" + lang_1.stringify(component) + "' must have either 'template' or 'templateUrl' set.");
                        }
                        else if (lang_1.isPresent(compMeta.template) && lang_1.isPresent(viewMeta)) {
                            this._throwMixingViewAndComponent("template", component);
                        }
                        else if (lang_1.isPresent(compMeta.templateUrl) && lang_1.isPresent(viewMeta)) {
                            this._throwMixingViewAndComponent("templateUrl", component);
                        }
                        else if (lang_1.isPresent(compMeta.directives) && lang_1.isPresent(viewMeta)) {
                            this._throwMixingViewAndComponent("directives", component);
                        }
                        else if (lang_1.isPresent(compMeta.pipes) && lang_1.isPresent(viewMeta)) {
                            this._throwMixingViewAndComponent("pipes", component);
                        }
                        else if (lang_1.isPresent(compMeta.encapsulation) && lang_1.isPresent(viewMeta)) {
                            this._throwMixingViewAndComponent("encapsulation", component);
                        }
                        else if (lang_1.isPresent(compMeta.styles) && lang_1.isPresent(viewMeta)) {
                            this._throwMixingViewAndComponent("styles", component);
                        }
                        else if (lang_1.isPresent(compMeta.styleUrls) && lang_1.isPresent(viewMeta)) {
                            this._throwMixingViewAndComponent("styleUrls", component);
                        }
                        else if (lang_1.isPresent(viewMeta)) {
                            return viewMeta;
                        }
                        else {
                            return new view_1.ViewMetadata({
                                templateUrl: compMeta.templateUrl,
                                template: compMeta.template,
                                directives: compMeta.directives,
                                pipes: compMeta.pipes,
                                encapsulation: compMeta.encapsulation,
                                styles: compMeta.styles,
                                styleUrls: compMeta.styleUrls
                            });
                        }
                    }
                    else {
                        if (lang_1.isBlank(viewMeta)) {
                            throw new exceptions_1.BaseException("Could not compile '" + lang_1.stringify(component) + "' because it is not a component.");
                        }
                        else {
                            return viewMeta;
                        }
                    }
                    return null;
                };
                /** @internal */
                ViewResolver.prototype._throwMixingViewAndComponent = function (propertyName, component) {
                    throw new exceptions_1.BaseException("Component '" + lang_1.stringify(component) + "' cannot have both '" + propertyName + "' and '@View' set at the same time\"");
                };
                ViewResolver = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [reflector_reader_1.ReflectorReader])
                ], ViewResolver);
                return ViewResolver;
            }());
            exports_1("ViewResolver", ViewResolver);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci92aWV3X3Jlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBV0E7O2VBRUc7WUFFSDtnQkFNRSxzQkFBWSxVQUE0QjtvQkFIeEMsZ0JBQWdCO29CQUNoQixXQUFNLEdBQUcsSUFBSSxnQkFBRyxFQUFzQixDQUFDO29CQUdyQyxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7b0JBQy9CLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sSUFBSSxDQUFDLFVBQVUsR0FBRyxzQkFBUyxDQUFDO29CQUM5QixDQUFDO2dCQUNILENBQUM7Z0JBRUQsOEJBQU8sR0FBUCxVQUFRLFNBQWU7b0JBQ3JCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUV0QyxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNsQixJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNuQyxDQUFDO29CQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQztnQkFFRCxnQkFBZ0I7Z0JBQ2hCLCtCQUFRLEdBQVIsVUFBUyxTQUFlO29CQUN0QixJQUFJLFFBQTJCLENBQUM7b0JBQ2hDLElBQUksUUFBc0IsQ0FBQztvQkFFM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQzt3QkFD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QkFBWSxDQUFDO2dDQUN0QixXQUFXLEVBQUUsUUFBUSxDQUFDLFdBQVc7Z0NBQ2pDLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUTtnQ0FDM0IsVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVO2dDQUMvQixLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUs7Z0NBQ3JCLGFBQWEsRUFBRSxRQUFRLENBQUMsYUFBYTtnQ0FDckMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNO2dDQUN2QixTQUFTLEVBQUUsUUFBUSxDQUFDLFNBQVM7NkJBQzlCLENBQUMsQ0FBQzt3QkFDTCxDQUFDO29CQUNILENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDdEIsTUFBTSxJQUFJLDBCQUFhLENBQ25CLHdCQUFzQixnQkFBUyxDQUFDLFNBQVMsQ0FBQyxxQ0FBa0MsQ0FBQyxDQUFDO3dCQUNwRixDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLE1BQU0sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLENBQUM7b0JBQ0gsQ0FBQztvQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNkLENBQUM7Z0JBRUQsZ0JBQWdCO2dCQUNoQixtREFBNEIsR0FBNUIsVUFBNkIsWUFBb0IsRUFBRSxTQUFlO29CQUNoRSxNQUFNLElBQUksMEJBQWEsQ0FDbkIsZ0JBQWMsZ0JBQVMsQ0FBQyxTQUFTLENBQUMsNEJBQXVCLFlBQVkseUNBQXFDLENBQUMsQ0FBQztnQkFDbEgsQ0FBQztnQkEvRkg7b0JBQUMsZUFBVSxFQUFFOztnQ0FBQTtnQkFnR2IsbUJBQUM7WUFBRCxDQS9GQSxBQStGQyxJQUFBO1lBL0ZELHVDQStGQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci92aWV3X3Jlc29sdmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge1ZpZXdNZXRhZGF0YX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbWV0YWRhdGEvdmlldyc7XG5pbXBvcnQge0NvbXBvbmVudE1ldGFkYXRhfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9tZXRhZGF0YS9kaXJlY3RpdmVzJztcblxuaW1wb3J0IHtUeXBlLCBzdHJpbmdpZnksIGlzQmxhbmssIGlzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7TWFwfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuXG5pbXBvcnQge1JlZmxlY3RvclJlYWRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVmbGVjdGlvbi9yZWZsZWN0b3JfcmVhZGVyJztcbmltcG9ydCB7cmVmbGVjdG9yfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9yZWZsZWN0aW9uL3JlZmxlY3Rpb24nO1xuXG4vKipcbiAqIFJlc29sdmVzIHR5cGVzIHRvIHtAbGluayBWaWV3TWV0YWRhdGF9LlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVmlld1Jlc29sdmVyIHtcbiAgcHJpdmF0ZSBfcmVmbGVjdG9yOiBSZWZsZWN0b3JSZWFkZXI7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY2FjaGUgPSBuZXcgTWFwPFR5cGUsIFZpZXdNZXRhZGF0YT4oKTtcblxuICBjb25zdHJ1Y3RvcihfcmVmbGVjdG9yPzogUmVmbGVjdG9yUmVhZGVyKSB7XG4gICAgaWYgKGlzUHJlc2VudChfcmVmbGVjdG9yKSkge1xuICAgICAgdGhpcy5fcmVmbGVjdG9yID0gX3JlZmxlY3RvcjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVmbGVjdG9yID0gcmVmbGVjdG9yO1xuICAgIH1cbiAgfVxuXG4gIHJlc29sdmUoY29tcG9uZW50OiBUeXBlKTogVmlld01ldGFkYXRhIHtcbiAgICB2YXIgdmlldyA9IHRoaXMuX2NhY2hlLmdldChjb21wb25lbnQpO1xuXG4gICAgaWYgKGlzQmxhbmsodmlldykpIHtcbiAgICAgIHZpZXcgPSB0aGlzLl9yZXNvbHZlKGNvbXBvbmVudCk7XG4gICAgICB0aGlzLl9jYWNoZS5zZXQoY29tcG9uZW50LCB2aWV3KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmlldztcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3Jlc29sdmUoY29tcG9uZW50OiBUeXBlKTogVmlld01ldGFkYXRhIHtcbiAgICB2YXIgY29tcE1ldGE6IENvbXBvbmVudE1ldGFkYXRhO1xuICAgIHZhciB2aWV3TWV0YTogVmlld01ldGFkYXRhO1xuXG4gICAgdGhpcy5fcmVmbGVjdG9yLmFubm90YXRpb25zKGNvbXBvbmVudCkuZm9yRWFjaChtID0+IHtcbiAgICAgIGlmIChtIGluc3RhbmNlb2YgVmlld01ldGFkYXRhKSB7XG4gICAgICAgIHZpZXdNZXRhID0gbTtcbiAgICAgIH1cbiAgICAgIGlmIChtIGluc3RhbmNlb2YgQ29tcG9uZW50TWV0YWRhdGEpIHtcbiAgICAgICAgY29tcE1ldGEgPSBtO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGlzUHJlc2VudChjb21wTWV0YSkpIHtcbiAgICAgIGlmIChpc0JsYW5rKGNvbXBNZXRhLnRlbXBsYXRlKSAmJiBpc0JsYW5rKGNvbXBNZXRhLnRlbXBsYXRlVXJsKSAmJiBpc0JsYW5rKHZpZXdNZXRhKSkge1xuICAgICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcbiAgICAgICAgICAgIGBDb21wb25lbnQgJyR7c3RyaW5naWZ5KGNvbXBvbmVudCl9JyBtdXN0IGhhdmUgZWl0aGVyICd0ZW1wbGF0ZScgb3IgJ3RlbXBsYXRlVXJsJyBzZXQuYCk7XG5cbiAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KGNvbXBNZXRhLnRlbXBsYXRlKSAmJiBpc1ByZXNlbnQodmlld01ldGEpKSB7XG4gICAgICAgIHRoaXMuX3Rocm93TWl4aW5nVmlld0FuZENvbXBvbmVudChcInRlbXBsYXRlXCIsIGNvbXBvbmVudCk7XG5cbiAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KGNvbXBNZXRhLnRlbXBsYXRlVXJsKSAmJiBpc1ByZXNlbnQodmlld01ldGEpKSB7XG4gICAgICAgIHRoaXMuX3Rocm93TWl4aW5nVmlld0FuZENvbXBvbmVudChcInRlbXBsYXRlVXJsXCIsIGNvbXBvbmVudCk7XG5cbiAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KGNvbXBNZXRhLmRpcmVjdGl2ZXMpICYmIGlzUHJlc2VudCh2aWV3TWV0YSkpIHtcbiAgICAgICAgdGhpcy5fdGhyb3dNaXhpbmdWaWV3QW5kQ29tcG9uZW50KFwiZGlyZWN0aXZlc1wiLCBjb21wb25lbnQpO1xuXG4gICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudChjb21wTWV0YS5waXBlcykgJiYgaXNQcmVzZW50KHZpZXdNZXRhKSkge1xuICAgICAgICB0aGlzLl90aHJvd01peGluZ1ZpZXdBbmRDb21wb25lbnQoXCJwaXBlc1wiLCBjb21wb25lbnQpO1xuXG4gICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudChjb21wTWV0YS5lbmNhcHN1bGF0aW9uKSAmJiBpc1ByZXNlbnQodmlld01ldGEpKSB7XG4gICAgICAgIHRoaXMuX3Rocm93TWl4aW5nVmlld0FuZENvbXBvbmVudChcImVuY2Fwc3VsYXRpb25cIiwgY29tcG9uZW50KTtcblxuICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQoY29tcE1ldGEuc3R5bGVzKSAmJiBpc1ByZXNlbnQodmlld01ldGEpKSB7XG4gICAgICAgIHRoaXMuX3Rocm93TWl4aW5nVmlld0FuZENvbXBvbmVudChcInN0eWxlc1wiLCBjb21wb25lbnQpO1xuXG4gICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudChjb21wTWV0YS5zdHlsZVVybHMpICYmIGlzUHJlc2VudCh2aWV3TWV0YSkpIHtcbiAgICAgICAgdGhpcy5fdGhyb3dNaXhpbmdWaWV3QW5kQ29tcG9uZW50KFwic3R5bGVVcmxzXCIsIGNvbXBvbmVudCk7XG5cbiAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KHZpZXdNZXRhKSkge1xuICAgICAgICByZXR1cm4gdmlld01ldGE7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgVmlld01ldGFkYXRhKHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogY29tcE1ldGEudGVtcGxhdGVVcmwsXG4gICAgICAgICAgdGVtcGxhdGU6IGNvbXBNZXRhLnRlbXBsYXRlLFxuICAgICAgICAgIGRpcmVjdGl2ZXM6IGNvbXBNZXRhLmRpcmVjdGl2ZXMsXG4gICAgICAgICAgcGlwZXM6IGNvbXBNZXRhLnBpcGVzLFxuICAgICAgICAgIGVuY2Fwc3VsYXRpb246IGNvbXBNZXRhLmVuY2Fwc3VsYXRpb24sXG4gICAgICAgICAgc3R5bGVzOiBjb21wTWV0YS5zdHlsZXMsXG4gICAgICAgICAgc3R5bGVVcmxzOiBjb21wTWV0YS5zdHlsZVVybHNcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChpc0JsYW5rKHZpZXdNZXRhKSkge1xuICAgICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcbiAgICAgICAgICAgIGBDb3VsZCBub3QgY29tcGlsZSAnJHtzdHJpbmdpZnkoY29tcG9uZW50KX0nIGJlY2F1c2UgaXQgaXMgbm90IGEgY29tcG9uZW50LmApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZpZXdNZXRhO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3Rocm93TWl4aW5nVmlld0FuZENvbXBvbmVudChwcm9wZXJ0eU5hbWU6IHN0cmluZywgY29tcG9uZW50OiBUeXBlKTogdm9pZCB7XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgIGBDb21wb25lbnQgJyR7c3RyaW5naWZ5KGNvbXBvbmVudCl9JyBjYW5ub3QgaGF2ZSBib3RoICcke3Byb3BlcnR5TmFtZX0nIGFuZCAnQFZpZXcnIHNldCBhdCB0aGUgc2FtZSB0aW1lXCJgKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
