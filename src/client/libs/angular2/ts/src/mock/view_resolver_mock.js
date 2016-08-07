System.register(['angular2/src/core/di', 'angular2/src/facade/collection', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions', '../core/metadata', 'angular2/src/core/linker/view_resolver'], function(exports_1, context_1) {
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
    var di_1, collection_1, lang_1, exceptions_1, metadata_1, view_resolver_1;
    var MockViewResolver;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
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
                    var directives = view.directives;
                    var overrides = this._directiveOverrides.get(component);
                    if (lang_1.isPresent(overrides) && lang_1.isPresent(directives)) {
                        directives = collection_1.ListWrapper.clone(view.directives);
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
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], MockViewResolver);
                return MockViewResolver;
            }(view_resolver_1.ViewResolver));
            exports_1("MockViewResolver", MockViewResolver);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL21vY2svdmlld19yZXNvbHZlcl9tb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFTQTtnQkFBc0Msb0NBQVk7Z0JBVWhEO29CQUFnQixpQkFBTyxDQUFDO29CQVR4QixnQkFBZ0I7b0JBQ2hCLFdBQU0sR0FBRyxJQUFJLGdCQUFHLEVBQXNCLENBQUM7b0JBQ3ZDLGdCQUFnQjtvQkFDaEIscUJBQWdCLEdBQUcsSUFBSSxnQkFBRyxFQUFnQixDQUFDO29CQUMzQyxnQkFBZ0I7b0JBQ2hCLGVBQVUsR0FBRyxJQUFJLGdCQUFHLEVBQXNCLENBQUM7b0JBQzNDLGdCQUFnQjtvQkFDaEIsd0JBQW1CLEdBQUcsSUFBSSxnQkFBRyxFQUF5QixDQUFDO2dCQUU5QixDQUFDO2dCQUUxQjs7Ozs7bUJBS0c7Z0JBQ0gsa0NBQU8sR0FBUCxVQUFRLFNBQWUsRUFBRSxJQUFrQjtvQkFDekMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ25DLENBQUM7Z0JBRUQ7Ozs7O21CQUtHO2dCQUNILDRDQUFpQixHQUFqQixVQUFrQixTQUFlLEVBQUUsUUFBZ0I7b0JBQ2pELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDbkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ2pELENBQUM7Z0JBRUQ7Ozs7OzttQkFNRztnQkFDSCxnREFBcUIsR0FBckIsVUFBc0IsU0FBZSxFQUFFLElBQVUsRUFBRSxFQUFRO29CQUN6RCxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBRW5DLElBQUksU0FB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QyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFFNUMsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3RCLE1BQU0sSUFBSSwwQkFBYSxDQUNuQixtQkFBaUIsZ0JBQVMsQ0FBQyxTQUFTLENBQUMscUVBQWtFLENBQUMsQ0FBQztvQkFDL0csQ0FBQztnQkFDSCxDQUFDO2dCQXZISDtvQkFBQyxlQUFVLEVBQUU7O29DQUFBO2dCQXdIYix1QkFBQztZQUFELENBdkhBLEFBdUhDLENBdkhxQyw0QkFBWSxHQXVIakQ7WUF2SEQsK0NBdUhDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvbW9jay92aWV3X3Jlc29sdmVyX21vY2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7TWFwLCBNYXBXcmFwcGVyLCBMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7VHlwZSwgaXNQcmVzZW50LCBzdHJpbmdpZnksIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb24sIFdyYXBwZWRFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5cbmltcG9ydCB7Vmlld01ldGFkYXRhfSBmcm9tICcuLi9jb3JlL21ldGFkYXRhJztcbmltcG9ydCB7Vmlld1Jlc29sdmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvdmlld19yZXNvbHZlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNb2NrVmlld1Jlc29sdmVyIGV4dGVuZHMgVmlld1Jlc29sdmVyIHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfdmlld3MgPSBuZXcgTWFwPFR5cGUsIFZpZXdNZXRhZGF0YT4oKTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfaW5saW5lVGVtcGxhdGVzID0gbmV3IE1hcDxUeXBlLCBzdHJpbmc+KCk7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3ZpZXdDYWNoZSA9IG5ldyBNYXA8VHlwZSwgVmlld01ldGFkYXRhPigpO1xuICAvKiogQGludGVybmFsICovXG4gIF9kaXJlY3RpdmVPdmVycmlkZXMgPSBuZXcgTWFwPFR5cGUsIE1hcDxUeXBlLCBUeXBlPj4oKTtcblxuICBjb25zdHJ1Y3RvcigpIHsgc3VwZXIoKTsgfVxuXG4gIC8qKlxuICAgKiBPdmVycmlkZXMgdGhlIHtAbGluayBWaWV3TWV0YWRhdGF9IGZvciBhIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHBhcmFtIHtUeXBlfSBjb21wb25lbnRcbiAgICogQHBhcmFtIHtWaWV3RGVmaW5pdGlvbn0gdmlld1xuICAgKi9cbiAgc2V0Vmlldyhjb21wb25lbnQ6IFR5cGUsIHZpZXc6IFZpZXdNZXRhZGF0YSk6IHZvaWQge1xuICAgIHRoaXMuX2NoZWNrT3ZlcnJpZGVhYmxlKGNvbXBvbmVudCk7XG4gICAgdGhpcy5fdmlld3Muc2V0KGNvbXBvbmVudCwgdmlldyk7XG4gIH1cblxuICAvKipcbiAgICogT3ZlcnJpZGVzIHRoZSBpbmxpbmUgdGVtcGxhdGUgZm9yIGEgY29tcG9uZW50IC0gb3RoZXIgY29uZmlndXJhdGlvbiByZW1haW5zIHVuY2hhbmdlZC5cbiAgICpcbiAgICogQHBhcmFtIHtUeXBlfSBjb21wb25lbnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRlbXBsYXRlXG4gICAqL1xuICBzZXRJbmxpbmVUZW1wbGF0ZShjb21wb25lbnQ6IFR5cGUsIHRlbXBsYXRlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9jaGVja092ZXJyaWRlYWJsZShjb21wb25lbnQpO1xuICAgIHRoaXMuX2lubGluZVRlbXBsYXRlcy5zZXQoY29tcG9uZW50LCB0ZW1wbGF0ZSk7XG4gIH1cblxuICAvKipcbiAgICogT3ZlcnJpZGVzIGEgZGlyZWN0aXZlIGZyb20gdGhlIGNvbXBvbmVudCB7QGxpbmsgVmlld01ldGFkYXRhfS5cbiAgICpcbiAgICogQHBhcmFtIHtUeXBlfSBjb21wb25lbnRcbiAgICogQHBhcmFtIHtUeXBlfSBmcm9tXG4gICAqIEBwYXJhbSB7VHlwZX0gdG9cbiAgICovXG4gIG92ZXJyaWRlVmlld0RpcmVjdGl2ZShjb21wb25lbnQ6IFR5cGUsIGZyb206IFR5cGUsIHRvOiBUeXBlKTogdm9pZCB7XG4gICAgdGhpcy5fY2hlY2tPdmVycmlkZWFibGUoY29tcG9uZW50KTtcblxuICAgIHZhciBvdmVycmlkZXMgPSB0aGlzLl9kaXJlY3RpdmVPdmVycmlkZXMuZ2V0KGNvbXBvbmVudCk7XG5cbiAgICBpZiAoaXNCbGFuayhvdmVycmlkZXMpKSB7XG4gICAgICBvdmVycmlkZXMgPSBuZXcgTWFwPFR5cGUsIFR5cGU+KCk7XG4gICAgICB0aGlzLl9kaXJlY3RpdmVPdmVycmlkZXMuc2V0KGNvbXBvbmVudCwgb3ZlcnJpZGVzKTtcbiAgICB9XG5cbiAgICBvdmVycmlkZXMuc2V0KGZyb20sIHRvKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB7QGxpbmsgVmlld01ldGFkYXRhfSBmb3IgYSBjb21wb25lbnQ6XG4gICAqIC0gU2V0IHRoZSB7QGxpbmsgVmlld01ldGFkYXRhfSB0byB0aGUgb3ZlcnJpZGRlbiB2aWV3IHdoZW4gaXQgZXhpc3RzIG9yIGZhbGxiYWNrIHRvIHRoZSBkZWZhdWx0XG4gICAqIGBWaWV3UmVzb2x2ZXJgLFxuICAgKiAgIHNlZSBgc2V0Vmlld2AuXG4gICAqIC0gT3ZlcnJpZGUgdGhlIGRpcmVjdGl2ZXMsIHNlZSBgb3ZlcnJpZGVWaWV3RGlyZWN0aXZlYC5cbiAgICogLSBPdmVycmlkZSB0aGUgQFZpZXcgZGVmaW5pdGlvbiwgc2VlIGBzZXRJbmxpbmVUZW1wbGF0ZWAuXG4gICAqXG4gICAqIEBwYXJhbSBjb21wb25lbnRcbiAgICogQHJldHVybnMge1ZpZXdEZWZpbml0aW9ufVxuICAgKi9cbiAgcmVzb2x2ZShjb21wb25lbnQ6IFR5cGUpOiBWaWV3TWV0YWRhdGEge1xuICAgIHZhciB2aWV3ID0gdGhpcy5fdmlld0NhY2hlLmdldChjb21wb25lbnQpO1xuICAgIGlmIChpc1ByZXNlbnQodmlldykpIHJldHVybiB2aWV3O1xuXG4gICAgdmlldyA9IHRoaXMuX3ZpZXdzLmdldChjb21wb25lbnQpO1xuICAgIGlmIChpc0JsYW5rKHZpZXcpKSB7XG4gICAgICB2aWV3ID0gc3VwZXIucmVzb2x2ZShjb21wb25lbnQpO1xuICAgIH1cblxuICAgIHZhciBkaXJlY3RpdmVzID0gdmlldy5kaXJlY3RpdmVzO1xuICAgIHZhciBvdmVycmlkZXMgPSB0aGlzLl9kaXJlY3RpdmVPdmVycmlkZXMuZ2V0KGNvbXBvbmVudCk7XG5cbiAgICBpZiAoaXNQcmVzZW50KG92ZXJyaWRlcykgJiYgaXNQcmVzZW50KGRpcmVjdGl2ZXMpKSB7XG4gICAgICBkaXJlY3RpdmVzID0gTGlzdFdyYXBwZXIuY2xvbmUodmlldy5kaXJlY3RpdmVzKTtcbiAgICAgIG92ZXJyaWRlcy5mb3JFYWNoKCh0bywgZnJvbSkgPT4ge1xuICAgICAgICB2YXIgc3JjSW5kZXggPSBkaXJlY3RpdmVzLmluZGV4T2YoZnJvbSk7XG4gICAgICAgIGlmIChzcmNJbmRleCA9PSAtMSkge1xuICAgICAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFxuICAgICAgICAgICAgICBgT3ZlcnJpZGVuIGRpcmVjdGl2ZSAke3N0cmluZ2lmeShmcm9tKX0gbm90IGZvdW5kIGluIHRoZSB0ZW1wbGF0ZSBvZiAke3N0cmluZ2lmeShjb21wb25lbnQpfWApO1xuICAgICAgICB9XG4gICAgICAgIGRpcmVjdGl2ZXNbc3JjSW5kZXhdID0gdG87XG4gICAgICB9KTtcbiAgICAgIHZpZXcgPSBuZXcgVmlld01ldGFkYXRhKFxuICAgICAgICAgIHt0ZW1wbGF0ZTogdmlldy50ZW1wbGF0ZSwgdGVtcGxhdGVVcmw6IHZpZXcudGVtcGxhdGVVcmwsIGRpcmVjdGl2ZXM6IGRpcmVjdGl2ZXN9KTtcbiAgICB9XG5cbiAgICB2YXIgaW5saW5lVGVtcGxhdGUgPSB0aGlzLl9pbmxpbmVUZW1wbGF0ZXMuZ2V0KGNvbXBvbmVudCk7XG4gICAgaWYgKGlzUHJlc2VudChpbmxpbmVUZW1wbGF0ZSkpIHtcbiAgICAgIHZpZXcgPSBuZXcgVmlld01ldGFkYXRhKFxuICAgICAgICAgIHt0ZW1wbGF0ZTogaW5saW5lVGVtcGxhdGUsIHRlbXBsYXRlVXJsOiBudWxsLCBkaXJlY3RpdmVzOiB2aWV3LmRpcmVjdGl2ZXN9KTtcbiAgICB9XG5cbiAgICB0aGlzLl92aWV3Q2FjaGUuc2V0KGNvbXBvbmVudCwgdmlldyk7XG4gICAgcmV0dXJuIHZpZXc7XG4gIH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqXG4gICAqIE9uY2UgYSBjb21wb25lbnQgaGFzIGJlZW4gY29tcGlsZWQsIHRoZSBBcHBQcm90b1ZpZXcgaXMgc3RvcmVkIGluIHRoZSBjb21waWxlciBjYWNoZS5cbiAgICpcbiAgICogVGhlbiBpdCBzaG91bGQgbm90IGJlIHBvc3NpYmxlIHRvIG92ZXJyaWRlIHRoZSBjb21wb25lbnQgY29uZmlndXJhdGlvbiBhZnRlciB0aGUgY29tcG9uZW50XG4gICAqIGhhcyBiZWVuIGNvbXBpbGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge1R5cGV9IGNvbXBvbmVudFxuICAgKi9cbiAgX2NoZWNrT3ZlcnJpZGVhYmxlKGNvbXBvbmVudDogVHlwZSk6IHZvaWQge1xuICAgIHZhciBjYWNoZWQgPSB0aGlzLl92aWV3Q2FjaGUuZ2V0KGNvbXBvbmVudCk7XG5cbiAgICBpZiAoaXNQcmVzZW50KGNhY2hlZCkpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFxuICAgICAgICAgIGBUaGUgY29tcG9uZW50ICR7c3RyaW5naWZ5KGNvbXBvbmVudCl9IGhhcyBhbHJlYWR5IGJlZW4gY29tcGlsZWQsIGl0cyBjb25maWd1cmF0aW9uIGNhbiBub3QgYmUgY2hhbmdlZGApO1xuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
