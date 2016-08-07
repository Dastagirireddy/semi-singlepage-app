System.register(['angular2/src/core/di', 'angular2/src/facade/collection', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions', '../core/metadata', 'angular2/src/compiler/view_resolver'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var di_1, di_2, collection_1, lang_1, exceptions_1, metadata_1, view_resolver_1;
    var MockViewResolver;
    function flattenArray(tree, out) {
        for (var i = 0; i < tree.length; i++) {
            var item = di_1.resolveForwardRef(tree[i]);
            if (lang_1.isArray(item)) {
                flattenArray(item, out);
            }
            else {
                out.push(item);
            }
        }
    }
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
                di_2 = di_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (metadata_1_1) {
                metadata_1 = metadata_1_1;
            },
            function (view_resolver_1_1) {
                view_resolver_1 = view_resolver_1_1;
            }],
        execute: function() {
            MockViewResolver = (function (_super) {
                __extends(MockViewResolver, _super);
                function MockViewResolver() {
                    _super.call(this);
                    /** @internal */
                    this._views = new collection_1.Map();
                    /** @internal */
                    this._inlineTemplates = new collection_1.Map();
                    /** @internal */
                    this._viewCache = new collection_1.Map();
                    /** @internal */
                    this._directiveOverrides = new collection_1.Map();
                }
                /**
                 * Overrides the {@link ViewMetadata} for a component.
                 *
                 * @param {Type} component
                 * @param {ViewDefinition} view
                 */
                MockViewResolver.prototype.setView = function (component, view) {
                    this._checkOverrideable(component);
                    this._views.set(component, view);
                };
                /**
                 * Overrides the inline template for a component - other configuration remains unchanged.
                 *
                 * @param {Type} component
                 * @param {string} template
                 */
                MockViewResolver.prototype.setInlineTemplate = function (component, template) {
                    this._checkOverrideable(component);
                    this._inlineTemplates.set(component, template);
                };
                /**
                 * Overrides a directive from the component {@link ViewMetadata}.
                 *
                 * @param {Type} component
                 * @param {Type} from
                 * @param {Type} to
                 */
                MockViewResolver.prototype.overrideViewDirective = function (component, from, to) {
                    this._checkOverrideable(component);
                    var overrides = this._directiveOverrides.get(component);
                    if (lang_1.isBlank(overrides)) {
                        overrides = new collection_1.Map();
                        this._directiveOverrides.set(component, overrides);
                    }
                    overrides.set(from, to);
                };
                /**
                 * Returns the {@link ViewMetadata} for a component:
                 * - Set the {@link ViewMetadata} to the overridden view when it exists or fallback to the default
                 * `ViewResolver`,
                 *   see `setView`.
                 * - Override the directives, see `overrideViewDirective`.
                 * - Override the @View definition, see `setInlineTemplate`.
                 *
                 * @param component
                 * @returns {ViewDefinition}
                 */
                MockViewResolver.prototype.resolve = function (component) {
                    var view = this._viewCache.get(component);
                    if (lang_1.isPresent(view))
                        return view;
                    view = this._views.get(component);
                    if (lang_1.isBlank(view)) {
                        view = _super.prototype.resolve.call(this, component);
                    }
                    var directives = [];
                    var overrides = this._directiveOverrides.get(component);
                    if (lang_1.isPresent(overrides) && lang_1.isPresent(view.directives)) {
                        flattenArray(view.directives, directives);
                        overrides.forEach(function (to, from) {
                            var srcIndex = directives.indexOf(from);
                            if (srcIndex == -1) {
                                throw new exceptions_1.BaseException("Overriden directive " + lang_1.stringify(from) + " not found in the template of " + lang_1.stringify(component));
                            }
                            directives[srcIndex] = to;
                        });
                        view = new metadata_1.ViewMetadata({ template: view.template, templateUrl: view.templateUrl, directives: directives });
                    }
                    var inlineTemplate = this._inlineTemplates.get(component);
                    if (lang_1.isPresent(inlineTemplate)) {
                        view = new metadata_1.ViewMetadata({ template: inlineTemplate, templateUrl: null, directives: view.directives });
                    }
                    this._viewCache.set(component, view);
                    return view;
                };
                /**
                 * @internal
                 *
                 * Once a component has been compiled, the AppProtoView is stored in the compiler cache.
                 *
                 * Then it should not be possible to override the component configuration after the component
                 * has been compiled.
                 *
                 * @param {Type} component
                 */
                MockViewResolver.prototype._checkOverrideable = function (component) {
                    var cached = this._viewCache.get(component);
                    if (lang_1.isPresent(cached)) {
                        throw new exceptions_1.BaseException("The component " + lang_1.stringify(component) + " has already been compiled, its configuration can not be changed");
                    }
                };
                MockViewResolver = __decorate([
                    di_2.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], MockViewResolver);
                return MockViewResolver;
            }(view_resolver_1.ViewResolver));
            exports_1("MockViewResolver", MockViewResolver);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9tb2NrL3ZpZXdfcmVzb2x2ZXJfbW9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBbUlBLHNCQUFzQixJQUFXLEVBQUUsR0FBd0I7UUFDekQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDckMsSUFBSSxJQUFJLEdBQUcsc0JBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsWUFBWSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMxQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBbElEO2dCQUFzQyxvQ0FBWTtnQkFVaEQ7b0JBQWdCLGlCQUFPLENBQUM7b0JBVHhCLGdCQUFnQjtvQkFDaEIsV0FBTSxHQUFHLElBQUksZ0JBQUcsRUFBc0IsQ0FBQztvQkFDdkMsZ0JBQWdCO29CQUNoQixxQkFBZ0IsR0FBRyxJQUFJLGdCQUFHLEVBQWdCLENBQUM7b0JBQzNDLGdCQUFnQjtvQkFDaEIsZUFBVSxHQUFHLElBQUksZ0JBQUcsRUFBc0IsQ0FBQztvQkFDM0MsZ0JBQWdCO29CQUNoQix3QkFBbUIsR0FBRyxJQUFJLGdCQUFHLEVBQXlCLENBQUM7Z0JBRTlCLENBQUM7Z0JBRTFCOzs7OzttQkFLRztnQkFDSCxrQ0FBTyxHQUFQLFVBQVEsU0FBZSxFQUFFLElBQWtCO29CQUN6QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxD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QixDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDMUQsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzlCLElBQUksR0FBRyxJQUFJLHVCQUFZLENBQ25CLEVBQUMsUUFBUSxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQztvQkFDbEYsQ0FBQztvQkFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQztnQkFFRDs7Ozs7Ozs7O21CQVNHO2dCQUNILDZDQUFrQixHQUFsQixVQUFtQixTQUFlO29CQUNoQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFFNUMsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3RCLE1BQU0sSUFBSSwwQkFBYSxDQUNuQixtQkFBaUIsZ0JBQVMsQ0FBQyxTQUFTLENBQUMscUVBQWtFLENBQUMsQ0FBQztvQkFDL0csQ0FBQztnQkFDSCxDQUFDO2dCQXZISDtvQkFBQyxlQUFVLEVBQUU7O29DQUFBO2dCQXdIYix1QkFBQztZQUFELENBdkhBLEFBdUhDLENBdkhxQyw0QkFBWSxHQXVIakQ7WUF2SEQsK0NBdUhDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL21vY2svdmlld19yZXNvbHZlcl9tb2NrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtyZXNvbHZlRm9yd2FyZFJlZn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge01hcCwgTWFwV3JhcHBlciwgTGlzdFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge1R5cGUsIGlzUHJlc2VudCwgaXNBcnJheSwgc3RyaW5naWZ5LCBpc0JsYW5rfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9uLCBXcmFwcGVkRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuXG5pbXBvcnQge1ZpZXdNZXRhZGF0YX0gZnJvbSAnLi4vY29yZS9tZXRhZGF0YSc7XG5pbXBvcnQge1ZpZXdSZXNvbHZlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3ZpZXdfcmVzb2x2ZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9ja1ZpZXdSZXNvbHZlciBleHRlbmRzIFZpZXdSZXNvbHZlciB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3ZpZXdzID0gbmV3IE1hcDxUeXBlLCBWaWV3TWV0YWRhdGE+KCk7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2lubGluZVRlbXBsYXRlcyA9IG5ldyBNYXA8VHlwZSwgc3RyaW5nPigpO1xuICAvKiogQGludGVybmFsICovXG4gIF92aWV3Q2FjaGUgPSBuZXcgTWFwPFR5cGUsIFZpZXdNZXRhZGF0YT4oKTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZGlyZWN0aXZlT3ZlcnJpZGVzID0gbmV3IE1hcDxUeXBlLCBNYXA8VHlwZSwgVHlwZT4+KCk7XG5cbiAgY29uc3RydWN0b3IoKSB7IHN1cGVyKCk7IH1cblxuICAvKipcbiAgICogT3ZlcnJpZGVzIHRoZSB7QGxpbmsgVmlld01ldGFkYXRhfSBmb3IgYSBjb21wb25lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7VHlwZX0gY29tcG9uZW50XG4gICAqIEBwYXJhbSB7Vmlld0RlZmluaXRpb259IHZpZXdcbiAgICovXG4gIHNldFZpZXcoY29tcG9uZW50OiBUeXBlLCB2aWV3OiBWaWV3TWV0YWRhdGEpOiB2b2lkIHtcbiAgICB0aGlzLl9jaGVja092ZXJyaWRlYWJsZShjb21wb25lbnQpO1xuICAgIHRoaXMuX3ZpZXdzLnNldChjb21wb25lbnQsIHZpZXcpO1xuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlcyB0aGUgaW5saW5lIHRlbXBsYXRlIGZvciBhIGNvbXBvbmVudCAtIG90aGVyIGNvbmZpZ3VyYXRpb24gcmVtYWlucyB1bmNoYW5nZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7VHlwZX0gY29tcG9uZW50XG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZW1wbGF0ZVxuICAgKi9cbiAgc2V0SW5saW5lVGVtcGxhdGUoY29tcG9uZW50OiBUeXBlLCB0ZW1wbGF0ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fY2hlY2tPdmVycmlkZWFibGUoY29tcG9uZW50KTtcbiAgICB0aGlzLl9pbmxpbmVUZW1wbGF0ZXMuc2V0KGNvbXBvbmVudCwgdGVtcGxhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlcyBhIGRpcmVjdGl2ZSBmcm9tIHRoZSBjb21wb25lbnQge0BsaW5rIFZpZXdNZXRhZGF0YX0uXG4gICAqXG4gICAqIEBwYXJhbSB7VHlwZX0gY29tcG9uZW50XG4gICAqIEBwYXJhbSB7VHlwZX0gZnJvbVxuICAgKiBAcGFyYW0ge1R5cGV9IHRvXG4gICAqL1xuICBvdmVycmlkZVZpZXdEaXJlY3RpdmUoY29tcG9uZW50OiBUeXBlLCBmcm9tOiBUeXBlLCB0bzogVHlwZSk6IHZvaWQge1xuICAgIHRoaXMuX2NoZWNrT3ZlcnJpZGVhYmxlKGNvbXBvbmVudCk7XG5cbiAgICB2YXIgb3ZlcnJpZGVzID0gdGhpcy5fZGlyZWN0aXZlT3ZlcnJpZGVzLmdldChjb21wb25lbnQpO1xuXG4gICAgaWYgKGlzQmxhbmsob3ZlcnJpZGVzKSkge1xuICAgICAgb3ZlcnJpZGVzID0gbmV3IE1hcDxUeXBlLCBUeXBlPigpO1xuICAgICAgdGhpcy5fZGlyZWN0aXZlT3ZlcnJpZGVzLnNldChjb21wb25lbnQsIG92ZXJyaWRlcyk7XG4gICAgfVxuXG4gICAgb3ZlcnJpZGVzLnNldChmcm9tLCB0byk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUge0BsaW5rIFZpZXdNZXRhZGF0YX0gZm9yIGEgY29tcG9uZW50OlxuICAgKiAtIFNldCB0aGUge0BsaW5rIFZpZXdNZXRhZGF0YX0gdG8gdGhlIG92ZXJyaWRkZW4gdmlldyB3aGVuIGl0IGV4aXN0cyBvciBmYWxsYmFjayB0byB0aGUgZGVmYXVsdFxuICAgKiBgVmlld1Jlc29sdmVyYCxcbiAgICogICBzZWUgYHNldFZpZXdgLlxuICAgKiAtIE92ZXJyaWRlIHRoZSBkaXJlY3RpdmVzLCBzZWUgYG92ZXJyaWRlVmlld0RpcmVjdGl2ZWAuXG4gICAqIC0gT3ZlcnJpZGUgdGhlIEBWaWV3IGRlZmluaXRpb24sIHNlZSBgc2V0SW5saW5lVGVtcGxhdGVgLlxuICAgKlxuICAgKiBAcGFyYW0gY29tcG9uZW50XG4gICAqIEByZXR1cm5zIHtWaWV3RGVmaW5pdGlvbn1cbiAgICovXG4gIHJlc29sdmUoY29tcG9uZW50OiBUeXBlKTogVmlld01ldGFkYXRhIHtcbiAgICB2YXIgdmlldyA9IHRoaXMuX3ZpZXdDYWNoZS5nZXQoY29tcG9uZW50KTtcbiAgICBpZiAoaXNQcmVzZW50KHZpZXcpKSByZXR1cm4gdmlldztcblxuICAgIHZpZXcgPSB0aGlzLl92aWV3cy5nZXQoY29tcG9uZW50KTtcbiAgICBpZiAoaXNCbGFuayh2aWV3KSkge1xuICAgICAgdmlldyA9IHN1cGVyLnJlc29sdmUoY29tcG9uZW50KTtcbiAgICB9XG5cbiAgICB2YXIgZGlyZWN0aXZlcyA9IFtdO1xuICAgIHZhciBvdmVycmlkZXMgPSB0aGlzLl9kaXJlY3RpdmVPdmVycmlkZXMuZ2V0KGNvbXBvbmVudCk7XG5cbiAgICBpZiAoaXNQcmVzZW50KG92ZXJyaWRlcykgJiYgaXNQcmVzZW50KHZpZXcuZGlyZWN0aXZlcykpIHtcbiAgICAgIGZsYXR0ZW5BcnJheSh2aWV3LmRpcmVjdGl2ZXMsIGRpcmVjdGl2ZXMpO1xuICAgICAgb3ZlcnJpZGVzLmZvckVhY2goKHRvLCBmcm9tKSA9PiB7XG4gICAgICAgIHZhciBzcmNJbmRleCA9IGRpcmVjdGl2ZXMuaW5kZXhPZihmcm9tKTtcbiAgICAgICAgaWYgKHNyY0luZGV4ID09IC0xKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgICAgICAgIGBPdmVycmlkZW4gZGlyZWN0aXZlICR7c3RyaW5naWZ5KGZyb20pfSBub3QgZm91bmQgaW4gdGhlIHRlbXBsYXRlIG9mICR7c3RyaW5naWZ5KGNvbXBvbmVudCl9YCk7XG4gICAgICAgIH1cbiAgICAgICAgZGlyZWN0aXZlc1tzcmNJbmRleF0gPSB0bztcbiAgICAgIH0pO1xuICAgICAgdmlldyA9IG5ldyBWaWV3TWV0YWRhdGEoXG4gICAgICAgICAge3RlbXBsYXRlOiB2aWV3LnRlbXBsYXRlLCB0ZW1wbGF0ZVVybDogdmlldy50ZW1wbGF0ZVVybCwgZGlyZWN0aXZlczogZGlyZWN0aXZlc30pO1xuICAgIH1cblxuICAgIHZhciBpbmxpbmVUZW1wbGF0ZSA9IHRoaXMuX2lubGluZVRlbXBsYXRlcy5nZXQoY29tcG9uZW50KTtcbiAgICBpZiAoaXNQcmVzZW50KGlubGluZVRlbXBsYXRlKSkge1xuICAgICAgdmlldyA9IG5ldyBWaWV3TWV0YWRhdGEoXG4gICAgICAgICAge3RlbXBsYXRlOiBpbmxpbmVUZW1wbGF0ZSwgdGVtcGxhdGVVcmw6IG51bGwsIGRpcmVjdGl2ZXM6IHZpZXcuZGlyZWN0aXZlc30pO1xuICAgIH1cblxuICAgIHRoaXMuX3ZpZXdDYWNoZS5zZXQoY29tcG9uZW50LCB2aWV3KTtcbiAgICByZXR1cm4gdmlldztcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICpcbiAgICogT25jZSBhIGNvbXBvbmVudCBoYXMgYmVlbiBjb21waWxlZCwgdGhlIEFwcFByb3RvVmlldyBpcyBzdG9yZWQgaW4gdGhlIGNvbXBpbGVyIGNhY2hlLlxuICAgKlxuICAgKiBUaGVuIGl0IHNob3VsZCBub3QgYmUgcG9zc2libGUgdG8gb3ZlcnJpZGUgdGhlIGNvbXBvbmVudCBjb25maWd1cmF0aW9uIGFmdGVyIHRoZSBjb21wb25lbnRcbiAgICogaGFzIGJlZW4gY29tcGlsZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7VHlwZX0gY29tcG9uZW50XG4gICAqL1xuICBfY2hlY2tPdmVycmlkZWFibGUoY29tcG9uZW50OiBUeXBlKTogdm9pZCB7XG4gICAgdmFyIGNhY2hlZCA9IHRoaXMuX3ZpZXdDYWNoZS5nZXQoY29tcG9uZW50KTtcblxuICAgIGlmIChpc1ByZXNlbnQoY2FjaGVkKSkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgICAgYFRoZSBjb21wb25lbnQgJHtzdHJpbmdpZnkoY29tcG9uZW50KX0gaGFzIGFscmVhZHkgYmVlbiBjb21waWxlZCwgaXRzIGNvbmZpZ3VyYXRpb24gY2FuIG5vdCBiZSBjaGFuZ2VkYCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGZsYXR0ZW5BcnJheSh0cmVlOiBhbnlbXSwgb3V0OiBBcnJheTxUeXBlIHwgYW55W10+KTogdm9pZCB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdHJlZS5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gcmVzb2x2ZUZvcndhcmRSZWYodHJlZVtpXSk7XG4gICAgaWYgKGlzQXJyYXkoaXRlbSkpIHtcbiAgICAgIGZsYXR0ZW5BcnJheShpdGVtLCBvdXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXQucHVzaChpdGVtKTtcbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
