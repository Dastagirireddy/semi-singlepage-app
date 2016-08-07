System.register(['angular2/src/core/di', '../metadata/view', '../metadata/directives', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/collection', 'angular2/src/core/reflection/reflector_reader', 'angular2/src/core/reflection/reflection'], function(exports_1, context_1) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvbGlua2VyL3ZpZXdfcmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFXQTs7ZUFFRztZQUVIO2dCQU1FLHNCQUFZLFVBQTRCO29CQUh4QyxnQkFBZ0I7b0JBQ2hCLFdBQU0sR0FBRyxJQUFJLGdCQUFHLEVBQXNCLENBQUM7b0JBR3JDLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztvQkFDL0IsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixJQUFJLENBQUMsVUFBVSxHQUFHLHNCQUFTLENBQUM7b0JBQzlCLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCw4QkFBTyxHQUFQLFVBQVEsU0FBZTtvQkFDckIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBRXRDLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2xCLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ25DLENBQUM7b0JBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDZCxDQUFDO2dCQUVELGdCQUFnQjtnQkFDaEIsK0JBQVEsR0FBUixVQUFTLFNBQWU7b0JBQ3RCLElBQUksUUFBMkIsQ0FBQztvQkFDaEMsSUFBSSxRQUFzQixDQUFDO29CQUUzQixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxD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QyxJQUFJLG1CQUFZLENBQUM7Z0NBQ3RCLFdBQVcsRUFBRSxRQUFRLENBQUMsV0FBVztnQ0FDakMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRO2dDQUMzQixVQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVU7Z0NBQy9CLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSztnQ0FDckIsYUFBYSxFQUFFLFFBQVEsQ0FBQyxhQUFhO2dDQUNyQyxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU07Z0NBQ3ZCLFNBQVMsRUFBRSxRQUFRLENBQUMsU0FBUzs2QkFDOUIsQ0FBQyxDQUFDO3dCQUNMLENBQUM7b0JBQ0gsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN0QixNQUFNLElBQUksMEJBQWEsQ0FDbkIsd0JBQXNCLGdCQUFTLENBQUMsU0FBUyxDQUFDLHFDQUFrQyxDQUFDLENBQUM7d0JBQ3BGLENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ04sTUFBTSxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsQ0FBQztvQkFDSCxDQUFDO29CQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQztnQkFFRCxnQkFBZ0I7Z0JBQ2hCLG1EQUE0QixHQUE1QixVQUE2QixZQUFvQixFQUFFLFNBQWU7b0JBQ2hFLE1BQU0sSUFBSSwwQkFBYSxDQUNuQixnQkFBYyxnQkFBUyxDQUFDLFNBQVMsQ0FBQyw0QkFBdUIsWUFBWSx5Q0FBcUMsQ0FBQyxDQUFDO2dCQUNsSCxDQUFDO2dCQS9GSDtvQkFBQyxlQUFVLEVBQUU7O2dDQUFBO2dCQWdHYixtQkFBQztZQUFELENBL0ZBLEFBK0ZDLElBQUE7WUEvRkQsdUNBK0ZDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29yZS9saW5rZXIvdmlld19yZXNvbHZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtWaWV3TWV0YWRhdGF9IGZyb20gJy4uL21ldGFkYXRhL3ZpZXcnO1xuaW1wb3J0IHtDb21wb25lbnRNZXRhZGF0YX0gZnJvbSAnLi4vbWV0YWRhdGEvZGlyZWN0aXZlcyc7XG5cbmltcG9ydCB7VHlwZSwgc3RyaW5naWZ5LCBpc0JsYW5rLCBpc1ByZXNlbnR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge01hcH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcblxuaW1wb3J0IHtSZWZsZWN0b3JSZWFkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlZmxlY3Rpb24vcmVmbGVjdG9yX3JlYWRlcic7XG5pbXBvcnQge3JlZmxlY3Rvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVmbGVjdGlvbi9yZWZsZWN0aW9uJztcblxuLyoqXG4gKiBSZXNvbHZlcyB0eXBlcyB0byB7QGxpbmsgVmlld01ldGFkYXRhfS5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFZpZXdSZXNvbHZlciB7XG4gIHByaXZhdGUgX3JlZmxlY3RvcjogUmVmbGVjdG9yUmVhZGVyO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NhY2hlID0gbmV3IE1hcDxUeXBlLCBWaWV3TWV0YWRhdGE+KCk7XG5cbiAgY29uc3RydWN0b3IoX3JlZmxlY3Rvcj86IFJlZmxlY3RvclJlYWRlcikge1xuICAgIGlmIChpc1ByZXNlbnQoX3JlZmxlY3RvcikpIHtcbiAgICAgIHRoaXMuX3JlZmxlY3RvciA9IF9yZWZsZWN0b3I7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3JlZmxlY3RvciA9IHJlZmxlY3RvcjtcbiAgICB9XG4gIH1cblxuICByZXNvbHZlKGNvbXBvbmVudDogVHlwZSk6IFZpZXdNZXRhZGF0YSB7XG4gICAgdmFyIHZpZXcgPSB0aGlzLl9jYWNoZS5nZXQoY29tcG9uZW50KTtcblxuICAgIGlmIChpc0JsYW5rKHZpZXcpKSB7XG4gICAgICB2aWV3ID0gdGhpcy5fcmVzb2x2ZShjb21wb25lbnQpO1xuICAgICAgdGhpcy5fY2FjaGUuc2V0KGNvbXBvbmVudCwgdmlldyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZpZXc7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9yZXNvbHZlKGNvbXBvbmVudDogVHlwZSk6IFZpZXdNZXRhZGF0YSB7XG4gICAgdmFyIGNvbXBNZXRhOiBDb21wb25lbnRNZXRhZGF0YTtcbiAgICB2YXIgdmlld01ldGE6IFZpZXdNZXRhZGF0YTtcblxuICAgIHRoaXMuX3JlZmxlY3Rvci5hbm5vdGF0aW9ucyhjb21wb25lbnQpLmZvckVhY2gobSA9PiB7XG4gICAgICBpZiAobSBpbnN0YW5jZW9mIFZpZXdNZXRhZGF0YSkge1xuICAgICAgICB2aWV3TWV0YSA9IG07XG4gICAgICB9XG4gICAgICBpZiAobSBpbnN0YW5jZW9mIENvbXBvbmVudE1ldGFkYXRhKSB7XG4gICAgICAgIGNvbXBNZXRhID0gbTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChpc1ByZXNlbnQoY29tcE1ldGEpKSB7XG4gICAgICBpZiAoaXNCbGFuayhjb21wTWV0YS50ZW1wbGF0ZSkgJiYgaXNCbGFuayhjb21wTWV0YS50ZW1wbGF0ZVVybCkgJiYgaXNCbGFuayh2aWV3TWV0YSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgICAgICBgQ29tcG9uZW50ICcke3N0cmluZ2lmeShjb21wb25lbnQpfScgbXVzdCBoYXZlIGVpdGhlciAndGVtcGxhdGUnIG9yICd0ZW1wbGF0ZVVybCcgc2V0LmApO1xuXG4gICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudChjb21wTWV0YS50ZW1wbGF0ZSkgJiYgaXNQcmVzZW50KHZpZXdNZXRhKSkge1xuICAgICAgICB0aGlzLl90aHJvd01peGluZ1ZpZXdBbmRDb21wb25lbnQoXCJ0ZW1wbGF0ZVwiLCBjb21wb25lbnQpO1xuXG4gICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudChjb21wTWV0YS50ZW1wbGF0ZVVybCkgJiYgaXNQcmVzZW50KHZpZXdNZXRhKSkge1xuICAgICAgICB0aGlzLl90aHJvd01peGluZ1ZpZXdBbmRDb21wb25lbnQoXCJ0ZW1wbGF0ZVVybFwiLCBjb21wb25lbnQpO1xuXG4gICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudChjb21wTWV0YS5kaXJlY3RpdmVzKSAmJiBpc1ByZXNlbnQodmlld01ldGEpKSB7XG4gICAgICAgIHRoaXMuX3Rocm93TWl4aW5nVmlld0FuZENvbXBvbmVudChcImRpcmVjdGl2ZXNcIiwgY29tcG9uZW50KTtcblxuICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQoY29tcE1ldGEucGlwZXMpICYmIGlzUHJlc2VudCh2aWV3TWV0YSkpIHtcbiAgICAgICAgdGhpcy5fdGhyb3dNaXhpbmdWaWV3QW5kQ29tcG9uZW50KFwicGlwZXNcIiwgY29tcG9uZW50KTtcblxuICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQoY29tcE1ldGEuZW5jYXBzdWxhdGlvbikgJiYgaXNQcmVzZW50KHZpZXdNZXRhKSkge1xuICAgICAgICB0aGlzLl90aHJvd01peGluZ1ZpZXdBbmRDb21wb25lbnQoXCJlbmNhcHN1bGF0aW9uXCIsIGNvbXBvbmVudCk7XG5cbiAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KGNvbXBNZXRhLnN0eWxlcykgJiYgaXNQcmVzZW50KHZpZXdNZXRhKSkge1xuICAgICAgICB0aGlzLl90aHJvd01peGluZ1ZpZXdBbmRDb21wb25lbnQoXCJzdHlsZXNcIiwgY29tcG9uZW50KTtcblxuICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQoY29tcE1ldGEuc3R5bGVVcmxzKSAmJiBpc1ByZXNlbnQodmlld01ldGEpKSB7XG4gICAgICAgIHRoaXMuX3Rocm93TWl4aW5nVmlld0FuZENvbXBvbmVudChcInN0eWxlVXJsc1wiLCBjb21wb25lbnQpO1xuXG4gICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudCh2aWV3TWV0YSkpIHtcbiAgICAgICAgcmV0dXJuIHZpZXdNZXRhO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IFZpZXdNZXRhZGF0YSh7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6IGNvbXBNZXRhLnRlbXBsYXRlVXJsLFxuICAgICAgICAgIHRlbXBsYXRlOiBjb21wTWV0YS50ZW1wbGF0ZSxcbiAgICAgICAgICBkaXJlY3RpdmVzOiBjb21wTWV0YS5kaXJlY3RpdmVzLFxuICAgICAgICAgIHBpcGVzOiBjb21wTWV0YS5waXBlcyxcbiAgICAgICAgICBlbmNhcHN1bGF0aW9uOiBjb21wTWV0YS5lbmNhcHN1bGF0aW9uLFxuICAgICAgICAgIHN0eWxlczogY29tcE1ldGEuc3R5bGVzLFxuICAgICAgICAgIHN0eWxlVXJsczogY29tcE1ldGEuc3R5bGVVcmxzXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaXNCbGFuayh2aWV3TWV0YSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgICAgICBgQ291bGQgbm90IGNvbXBpbGUgJyR7c3RyaW5naWZ5KGNvbXBvbmVudCl9JyBiZWNhdXNlIGl0IGlzIG5vdCBhIGNvbXBvbmVudC5gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB2aWV3TWV0YTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF90aHJvd01peGluZ1ZpZXdBbmRDb21wb25lbnQocHJvcGVydHlOYW1lOiBzdHJpbmcsIGNvbXBvbmVudDogVHlwZSk6IHZvaWQge1xuICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFxuICAgICAgICBgQ29tcG9uZW50ICcke3N0cmluZ2lmeShjb21wb25lbnQpfScgY2Fubm90IGhhdmUgYm90aCAnJHtwcm9wZXJ0eU5hbWV9JyBhbmQgJ0BWaWV3JyBzZXQgYXQgdGhlIHNhbWUgdGltZVwiYCk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
