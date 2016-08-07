System.register(['angular2/core', 'angular2/src/facade/lang', 'angular2/src/facade/collection', './utils', 'angular2/src/platform/dom/dom_tokens', 'angular2/src/platform/dom/dom_adapter', 'angular2/src/core/debug/debug_node'], function(exports_1, context_1) {
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
    var core_1, lang_1, collection_1, utils_1, dom_tokens_1, dom_adapter_1, debug_node_1;
    var ComponentFixture, ComponentFixture_, _nextRootElementId, TestComponentBuilder;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (dom_tokens_1_1) {
                dom_tokens_1 = dom_tokens_1_1;
            },
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            },
            function (debug_node_1_1) {
                debug_node_1 = debug_node_1_1;
            }],
        execute: function() {
            /**
             * Fixture for debugging and testing a component.
             */
            ComponentFixture = (function () {
                function ComponentFixture() {
                }
                return ComponentFixture;
            }());
            exports_1("ComponentFixture", ComponentFixture);
            ComponentFixture_ = (function (_super) {
                __extends(ComponentFixture_, _super);
                function ComponentFixture_(componentRef) {
                    _super.call(this);
                    this._componentParentView = componentRef.hostView.internalView;
                    this.elementRef = this._componentParentView.appElements[0].ref;
                    this.debugElement = debug_node_1.getDebugNode(this._componentParentView.rootNodesOrAppElements[0].nativeElement);
                    this.componentInstance = this.debugElement.componentInstance;
                    this.nativeElement = this.debugElement.nativeElement;
                    this._componentRef = componentRef;
                }
                ComponentFixture_.prototype.detectChanges = function () {
                    this._componentParentView.changeDetector.detectChanges();
                    this._componentParentView.changeDetector.checkNoChanges();
                };
                ComponentFixture_.prototype.destroy = function () { this._componentRef.dispose(); };
                return ComponentFixture_;
            }(ComponentFixture));
            exports_1("ComponentFixture_", ComponentFixture_);
            _nextRootElementId = 0;
            /**
             * Builds a ComponentFixture for use in component level tests.
             */
            TestComponentBuilder = (function () {
                function TestComponentBuilder(_injector) {
                    this._injector = _injector;
                    /** @internal */
                    this._bindingsOverrides = new Map();
                    /** @internal */
                    this._directiveOverrides = new Map();
                    /** @internal */
                    this._templateOverrides = new Map();
                    /** @internal */
                    this._viewBindingsOverrides = new Map();
                    /** @internal */
                    this._viewOverrides = new Map();
                }
                /** @internal */
                TestComponentBuilder.prototype._clone = function () {
                    var clone = new TestComponentBuilder(this._injector);
                    clone._viewOverrides = collection_1.MapWrapper.clone(this._viewOverrides);
                    clone._directiveOverrides = collection_1.MapWrapper.clone(this._directiveOverrides);
                    clone._templateOverrides = collection_1.MapWrapper.clone(this._templateOverrides);
                    return clone;
                };
                /**
                 * Overrides only the html of a {@link ComponentMetadata}.
                 * All the other properties of the component's {@link ViewMetadata} are preserved.
                 *
                 * @param {Type} component
                 * @param {string} html
                 *
                 * @return {TestComponentBuilder}
                 */
                TestComponentBuilder.prototype.overrideTemplate = function (componentType, template) {
                    var clone = this._clone();
                    clone._templateOverrides.set(componentType, template);
                    return clone;
                };
                /**
                 * Overrides a component's {@link ViewMetadata}.
                 *
                 * @param {Type} component
                 * @param {view} View
                 *
                 * @return {TestComponentBuilder}
                 */
                TestComponentBuilder.prototype.overrideView = function (componentType, view) {
                    var clone = this._clone();
                    clone._viewOverrides.set(componentType, view);
                    return clone;
                };
                /**
                 * Overrides the directives from the component {@link ViewMetadata}.
                 *
                 * @param {Type} component
                 * @param {Type} from
                 * @param {Type} to
                 *
                 * @return {TestComponentBuilder}
                 */
                TestComponentBuilder.prototype.overrideDirective = function (componentType, from, to) {
                    var clone = this._clone();
                    var overridesForComponent = clone._directiveOverrides.get(componentType);
                    if (!lang_1.isPresent(overridesForComponent)) {
                        clone._directiveOverrides.set(componentType, new Map());
                        overridesForComponent = clone._directiveOverrides.get(componentType);
                    }
                    overridesForComponent.set(from, to);
                    return clone;
                };
                /**
                 * Overrides one or more injectables configured via `providers` metadata property of a directive
                 * or
                 * component.
                 * Very useful when certain providers need to be mocked out.
                 *
                 * The providers specified via this method are appended to the existing `providers` causing the
                 * duplicated providers to
                 * be overridden.
                 *
                 * @param {Type} component
                 * @param {any[]} providers
                 *
                 * @return {TestComponentBuilder}
                 */
                TestComponentBuilder.prototype.overrideProviders = function (type, providers) {
                    var clone = this._clone();
                    clone._bindingsOverrides.set(type, providers);
                    return clone;
                };
                /**
                 * @deprecated
                 */
                TestComponentBuilder.prototype.overrideBindings = function (type, providers) {
                    return this.overrideProviders(type, providers);
                };
                /**
                 * Overrides one or more injectables configured via `providers` metadata property of a directive
                 * or
                 * component.
                 * Very useful when certain providers need to be mocked out.
                 *
                 * The providers specified via this method are appended to the existing `providers` causing the
                 * duplicated providers to
                 * be overridden.
                 *
                 * @param {Type} component
                 * @param {any[]} providers
                 *
                 * @return {TestComponentBuilder}
                 */
                TestComponentBuilder.prototype.overrideViewProviders = function (type, providers) {
                    var clone = this._clone();
                    clone._viewBindingsOverrides.set(type, providers);
                    return clone;
                };
                /**
                 * @deprecated
                 */
                TestComponentBuilder.prototype.overrideViewBindings = function (type, providers) {
                    return this.overrideViewProviders(type, providers);
                };
                /**
                 * Builds and returns a ComponentFixture.
                 *
                 * @return {Promise<ComponentFixture>}
                 */
                TestComponentBuilder.prototype.createAsync = function (rootComponentType) {
                    var mockDirectiveResolver = this._injector.get(core_1.DirectiveResolver);
                    var mockViewResolver = this._injector.get(core_1.ViewResolver);
                    this._viewOverrides.forEach(function (view, type) { return mockViewResolver.setView(type, view); });
                    this._templateOverrides.forEach(function (template, type) {
                        return mockViewResolver.setInlineTemplate(type, template);
                    });
                    this._directiveOverrides.forEach(function (overrides, component) {
                        overrides.forEach(function (to, from) { mockViewResolver.overrideViewDirective(component, from, to); });
                    });
                    this._bindingsOverrides.forEach(function (bindings, type) {
                        return mockDirectiveResolver.setBindingsOverride(type, bindings);
                    });
                    this._viewBindingsOverrides.forEach(function (bindings, type) { return mockDirectiveResolver.setViewBindingsOverride(type, bindings); });
                    var rootElId = "root" + _nextRootElementId++;
                    var rootEl = utils_1.el("<div id=\"" + rootElId + "\"></div>");
                    var doc = this._injector.get(dom_tokens_1.DOCUMENT);
                    // TODO(juliemr): can/should this be optional?
                    var oldRoots = dom_adapter_1.DOM.querySelectorAll(doc, '[id^=root]');
                    for (var i = 0; i < oldRoots.length; i++) {
                        dom_adapter_1.DOM.remove(oldRoots[i]);
                    }
                    dom_adapter_1.DOM.appendChild(doc.body, rootEl);
                    var promise = this._injector.get(core_1.DynamicComponentLoader)
                        .loadAsRoot(rootComponentType, "#" + rootElId, this._injector);
                    return promise.then(function (componentRef) { return new ComponentFixture_(componentRef); });
                };
                TestComponentBuilder = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [core_1.Injector])
                ], TestComponentBuilder);
                return TestComponentBuilder;
            }());
            exports_1("TestComponentBuilder", TestComponentBuilder);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3Rlc3RpbmcvdGVzdF9jb21wb25lbnRfYnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7NkNBd0ZJLGtCQUFrQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQTdEdEI7O2VBRUc7WUFDSDtnQkFBQTtnQkE4QkEsQ0FBQztnQkFBRCx1QkFBQztZQUFELENBOUJBLEFBOEJDLElBQUE7WUE5QkQsK0NBOEJDLENBQUE7WUFHRDtnQkFBdUMscUNBQWdCO2dCQU1yRCwyQkFBWSxZQUEwQjtvQkFDcEMsaUJBQU8sQ0FBQztvQkFDUixJQUFJLENBQUMsb0JBQW9CLEdBQWMsWUFBWSxDQUFDLFFBQVMsQ0FBQyxZQUFZLENBQUM7b0JBQzNFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7b0JBQy9ELElBQUksQ0FBQyxZQUFZLEdBQWlCLHlCQUFZLENBQzFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDdkUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUM7b0JBQzdELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUM7b0JBQ3JELElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDO2dCQUNwQyxDQUFDO2dCQUVELHlDQUFhLEdBQWI7b0JBQ0UsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDekQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDNUQsQ0FBQztnQkFFRCxtQ0FBTyxHQUFQLGNBQWtCLElBQUksQ0FB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QUFHLEVBQUUsWUFBWSxDQUFDLENBQUM7b0JBQ3ZELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUN6QyxpQkFBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDMUIsQ0FBQztvQkFDRCxpQkFBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUdsQyxJQUFJLE9BQU8sR0FDUCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyw2QkFBc0IsQ0FBQzt5QkFDckMsVUFBVSxDQUFDLGlCQUFpQixFQUFFLE1BQUksUUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDdkUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBQyxZQUFZLElBQU8sTUFBTSxDQUFDLElBQUksaUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekYsQ0FBQztnQkF2S0g7b0JBQUMsaUJBQVUsRUFBRTs7d0NBQUE7Z0JBd0tiLDJCQUFDO1lBQUQsQ0F2S0EsQUF1S0MsSUFBQTtZQXZLRCx1REF1S0MsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy90ZXN0aW5nL3Rlc3RfY29tcG9uZW50X2J1aWxkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnRSZWYsXG4gIERpcmVjdGl2ZVJlc29sdmVyLFxuICBEeW5hbWljQ29tcG9uZW50TG9hZGVyLFxuICBJbmplY3RvcixcbiAgSW5qZWN0YWJsZSxcbiAgVmlld01ldGFkYXRhLFxuICBFbGVtZW50UmVmLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIFZpZXdSZXNvbHZlcixcbiAgcHJvdmlkZVxufSBmcm9tICdhbmd1bGFyMi9jb3JlJztcblxuaW1wb3J0IHtUeXBlLCBpc1ByZXNlbnQsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0xpc3RXcmFwcGVyLCBNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuXG5pbXBvcnQge1ZpZXdSZWZffSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvdmlld19yZWYnO1xuaW1wb3J0IHtBcHBWaWV3fSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvdmlldyc7XG5cbmltcG9ydCB7ZWx9IGZyb20gJy4vdXRpbHMnO1xuXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV90b2tlbnMnO1xuaW1wb3J0IHtET019IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZG9tX2FkYXB0ZXInO1xuXG5pbXBvcnQge0RlYnVnTm9kZSwgRGVidWdFbGVtZW50LCBnZXREZWJ1Z05vZGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RlYnVnL2RlYnVnX25vZGUnO1xuXG5cbi8qKlxuICogRml4dHVyZSBmb3IgZGVidWdnaW5nIGFuZCB0ZXN0aW5nIGEgY29tcG9uZW50LlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29tcG9uZW50Rml4dHVyZSB7XG4gIC8qKlxuICAgKiBUaGUgRGVidWdFbGVtZW50IGFzc29jaWF0ZWQgd2l0aCB0aGUgcm9vdCBlbGVtZW50IG9mIHRoaXMgY29tcG9uZW50LlxuICAgKi9cbiAgZGVidWdFbGVtZW50OiBEZWJ1Z0VsZW1lbnQ7XG5cbiAgLyoqXG4gICAqIFRoZSBpbnN0YW5jZSBvZiB0aGUgcm9vdCBjb21wb25lbnQgY2xhc3MuXG4gICAqL1xuICBjb21wb25lbnRJbnN0YW5jZTogYW55O1xuXG4gIC8qKlxuICAgKiBUaGUgbmF0aXZlIGVsZW1lbnQgYXQgdGhlIHJvb3Qgb2YgdGhlIGNvbXBvbmVudC5cbiAgICovXG4gIG5hdGl2ZUVsZW1lbnQ6IGFueTtcblxuICAvKipcbiAgICogVGhlIEVsZW1lbnRSZWYgZm9yIHRoZSBlbGVtZW50IGF0IHRoZSByb290IG9mIHRoZSBjb21wb25lbnQuXG4gICAqL1xuICBlbGVtZW50UmVmOiBFbGVtZW50UmVmO1xuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIGEgY2hhbmdlIGRldGVjdGlvbiBjeWNsZSBmb3IgdGhlIGNvbXBvbmVudC5cbiAgICovXG4gIGFic3RyYWN0IGRldGVjdENoYW5nZXMoKTogdm9pZDtcblxuICAvKipcbiAgICogVHJpZ2dlciBjb21wb25lbnQgZGVzdHJ1Y3Rpb24uXG4gICAqL1xuICBhYnN0cmFjdCBkZXN0cm95KCk6IHZvaWQ7XG59XG5cblxuZXhwb3J0IGNsYXNzIENvbXBvbmVudEZpeHR1cmVfIGV4dGVuZHMgQ29tcG9uZW50Rml4dHVyZSB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmO1xuICAvKiogQGludGVybmFsICovXG4gIF9jb21wb25lbnRQYXJlbnRWaWV3OiBBcHBWaWV3O1xuXG4gIGNvbnN0cnVjdG9yKGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9jb21wb25lbnRQYXJlbnRWaWV3ID0gKDxWaWV3UmVmXz5jb21wb25lbnRSZWYuaG9zdFZpZXcpLmludGVybmFsVmlldztcbiAgICB0aGlzLmVsZW1lbnRSZWYgPSB0aGlzLl9jb21wb25lbnRQYXJlbnRWaWV3LmFwcEVsZW1lbnRzWzBdLnJlZjtcbiAgICB0aGlzLmRlYnVnRWxlbWVudCA9IDxEZWJ1Z0VsZW1lbnQ+Z2V0RGVidWdOb2RlKFxuICAgICAgICB0aGlzLl9jb21wb25lbnRQYXJlbnRWaWV3LnJvb3ROb2Rlc09yQXBwRWxlbWVudHNbMF0ubmF0aXZlRWxlbWVudCk7XG4gICAgdGhpcy5jb21wb25lbnRJbnN0YW5jZSA9IHRoaXMuZGVidWdFbGVtZW50LmNvbXBvbmVudEluc3RhbmNlO1xuICAgIHRoaXMubmF0aXZlRWxlbWVudCA9IHRoaXMuZGVidWdFbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5fY29tcG9uZW50UmVmID0gY29tcG9uZW50UmVmO1xuICB9XG5cbiAgZGV0ZWN0Q2hhbmdlcygpOiB2b2lkIHtcbiAgICB0aGlzLl9jb21wb25lbnRQYXJlbnRWaWV3LmNoYW5nZURldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcbiAgICB0aGlzLl9jb21wb25lbnRQYXJlbnRWaWV3LmNoYW5nZURldGVjdG9yLmNoZWNrTm9DaGFuZ2VzKCk7XG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQgeyB0aGlzLl9jb21wb25lbnRSZWYuZGlzcG9zZSgpOyB9XG59XG5cbnZhciBfbmV4dFJvb3RFbGVtZW50SWQgPSAwO1xuXG4vKipcbiAqIEJ1aWxkcyBhIENvbXBvbmVudEZpeHR1cmUgZm9yIHVzZSBpbiBjb21wb25lbnQgbGV2ZWwgdGVzdHMuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUZXN0Q29tcG9uZW50QnVpbGRlciB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2JpbmRpbmdzT3ZlcnJpZGVzID0gbmV3IE1hcDxUeXBlLCBhbnlbXT4oKTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZGlyZWN0aXZlT3ZlcnJpZGVzID0gbmV3IE1hcDxUeXBlLCBNYXA8VHlwZSwgVHlwZT4+KCk7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3RlbXBsYXRlT3ZlcnJpZGVzID0gbmV3IE1hcDxUeXBlLCBzdHJpbmc+KCk7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3ZpZXdCaW5kaW5nc092ZXJyaWRlcyA9IG5ldyBNYXA8VHlwZSwgYW55W10+KCk7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3ZpZXdPdmVycmlkZXMgPSBuZXcgTWFwPFR5cGUsIFZpZXdNZXRhZGF0YT4oKTtcblxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2luamVjdG9yOiBJbmplY3Rvcikge31cblxuICAvKiogQGludGVybmFsICovXG4gIF9jbG9uZSgpOiBUZXN0Q29tcG9uZW50QnVpbGRlciB7XG4gICAgdmFyIGNsb25lID0gbmV3IFRlc3RDb21wb25lbnRCdWlsZGVyKHRoaXMuX2luamVjdG9yKTtcbiAgICBjbG9uZS5fdmlld092ZXJyaWRlcyA9IE1hcFdyYXBwZXIuY2xvbmUodGhpcy5fdmlld092ZXJyaWRlcyk7XG4gICAgY2xvbmUuX2RpcmVjdGl2ZU92ZXJyaWRlcyA9IE1hcFdyYXBwZXIuY2xvbmUodGhpcy5fZGlyZWN0aXZlT3ZlcnJpZGVzKTtcbiAgICBjbG9uZS5fdGVtcGxhdGVPdmVycmlkZXMgPSBNYXBXcmFwcGVyLmNsb25lKHRoaXMuX3RlbXBsYXRlT3ZlcnJpZGVzKTtcbiAgICByZXR1cm4gY2xvbmU7XG4gIH1cblxuICAvKipcbiAgICogT3ZlcnJpZGVzIG9ubHkgdGhlIGh0bWwgb2YgYSB7QGxpbmsgQ29tcG9uZW50TWV0YWRhdGF9LlxuICAgKiBBbGwgdGhlIG90aGVyIHByb3BlcnRpZXMgb2YgdGhlIGNvbXBvbmVudCdzIHtAbGluayBWaWV3TWV0YWRhdGF9IGFyZSBwcmVzZXJ2ZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7VHlwZX0gY29tcG9uZW50XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBodG1sXG4gICAqXG4gICAqIEByZXR1cm4ge1Rlc3RDb21wb25lbnRCdWlsZGVyfVxuICAgKi9cbiAgb3ZlcnJpZGVUZW1wbGF0ZShjb21wb25lbnRUeXBlOiBUeXBlLCB0ZW1wbGF0ZTogc3RyaW5nKTogVGVzdENvbXBvbmVudEJ1aWxkZXIge1xuICAgIHZhciBjbG9uZSA9IHRoaXMuX2Nsb25lKCk7XG4gICAgY2xvbmUuX3RlbXBsYXRlT3ZlcnJpZGVzLnNldChjb21wb25lbnRUeXBlLCB0ZW1wbGF0ZSk7XG4gICAgcmV0dXJuIGNsb25lO1xuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlcyBhIGNvbXBvbmVudCdzIHtAbGluayBWaWV3TWV0YWRhdGF9LlxuICAgKlxuICAgKiBAcGFyYW0ge1R5cGV9IGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge3ZpZXd9IFZpZXdcbiAgICpcbiAgICogQHJldHVybiB7VGVzdENvbXBvbmVudEJ1aWxkZXJ9XG4gICAqL1xuICBvdmVycmlkZVZpZXcoY29tcG9uZW50VHlwZTogVHlwZSwgdmlldzogVmlld01ldGFkYXRhKTogVGVzdENvbXBvbmVudEJ1aWxkZXIge1xuICAgIHZhciBjbG9uZSA9IHRoaXMuX2Nsb25lKCk7XG4gICAgY2xvbmUuX3ZpZXdPdmVycmlkZXMuc2V0KGNvbXBvbmVudFR5cGUsIHZpZXcpO1xuICAgIHJldHVybiBjbG9uZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVycmlkZXMgdGhlIGRpcmVjdGl2ZXMgZnJvbSB0aGUgY29tcG9uZW50IHtAbGluayBWaWV3TWV0YWRhdGF9LlxuICAgKlxuICAgKiBAcGFyYW0ge1R5cGV9IGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge1R5cGV9IGZyb21cbiAgICogQHBhcmFtIHtUeXBlfSB0b1xuICAgKlxuICAgKiBAcmV0dXJuIHtUZXN0Q29tcG9uZW50QnVpbGRlcn1cbiAgICovXG4gIG92ZXJyaWRlRGlyZWN0aXZlKGNvbXBvbmVudFR5cGU6IFR5cGUsIGZyb206IFR5cGUsIHRvOiBUeXBlKTogVGVzdENvbXBvbmVudEJ1aWxkZXIge1xuICAgIHZhciBjbG9uZSA9IHRoaXMuX2Nsb25lKCk7XG4gICAgdmFyIG92ZXJyaWRlc0ZvckNvbXBvbmVudCA9IGNsb25lLl9kaXJlY3RpdmVPdmVycmlkZXMuZ2V0KGNvbXBvbmVudFR5cGUpO1xuICAgIGlmICghaXNQcmVzZW50KG92ZXJyaWRlc0ZvckNvbXBvbmVudCkpIHtcbiAgICAgIGNsb25lLl9kaXJlY3RpdmVPdmVycmlkZXMuc2V0KGNvbXBvbmVudFR5cGUsIG5ldyBNYXA8VHlwZSwgVHlwZT4oKSk7XG4gICAgICBvdmVycmlkZXNGb3JDb21wb25lbnQgPSBjbG9uZS5fZGlyZWN0aXZlT3ZlcnJpZGVzLmdldChjb21wb25lbnRUeXBlKTtcbiAgICB9XG4gICAgb3ZlcnJpZGVzRm9yQ29tcG9uZW50LnNldChmcm9tLCB0byk7XG4gICAgcmV0dXJuIGNsb25lO1xuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlcyBvbmUgb3IgbW9yZSBpbmplY3RhYmxlcyBjb25maWd1cmVkIHZpYSBgcHJvdmlkZXJzYCBtZXRhZGF0YSBwcm9wZXJ0eSBvZiBhIGRpcmVjdGl2ZVxuICAgKiBvclxuICAgKiBjb21wb25lbnQuXG4gICAqIFZlcnkgdXNlZnVsIHdoZW4gY2VydGFpbiBwcm92aWRlcnMgbmVlZCB0byBiZSBtb2NrZWQgb3V0LlxuICAgKlxuICAgKiBUaGUgcHJvdmlkZXJzIHNwZWNpZmllZCB2aWEgdGhpcyBtZXRob2QgYXJlIGFwcGVuZGVkIHRvIHRoZSBleGlzdGluZyBgcHJvdmlkZXJzYCBjYXVzaW5nIHRoZVxuICAgKiBkdXBsaWNhdGVkIHByb3ZpZGVycyB0b1xuICAgKiBiZSBvdmVycmlkZGVuLlxuICAgKlxuICAgKiBAcGFyYW0ge1R5cGV9IGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge2FueVtdfSBwcm92aWRlcnNcbiAgICpcbiAgICogQHJldHVybiB7VGVzdENvbXBvbmVudEJ1aWxkZXJ9XG4gICAqL1xuICBvdmVycmlkZVByb3ZpZGVycyh0eXBlOiBUeXBlLCBwcm92aWRlcnM6IGFueVtdKTogVGVzdENvbXBvbmVudEJ1aWxkZXIge1xuICAgIHZhciBjbG9uZSA9IHRoaXMuX2Nsb25lKCk7XG4gICAgY2xvbmUuX2JpbmRpbmdzT3ZlcnJpZGVzLnNldCh0eXBlLCBwcm92aWRlcnMpO1xuICAgIHJldHVybiBjbG9uZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZFxuICAgKi9cbiAgb3ZlcnJpZGVCaW5kaW5ncyh0eXBlOiBUeXBlLCBwcm92aWRlcnM6IGFueVtdKTogVGVzdENvbXBvbmVudEJ1aWxkZXIge1xuICAgIHJldHVybiB0aGlzLm92ZXJyaWRlUHJvdmlkZXJzKHR5cGUsIHByb3ZpZGVycyk7XG4gIH1cblxuICAvKipcbiAgICogT3ZlcnJpZGVzIG9uZSBvciBtb3JlIGluamVjdGFibGVzIGNvbmZpZ3VyZWQgdmlhIGBwcm92aWRlcnNgIG1ldGFkYXRhIHByb3BlcnR5IG9mIGEgZGlyZWN0aXZlXG4gICAqIG9yXG4gICAqIGNvbXBvbmVudC5cbiAgICogVmVyeSB1c2VmdWwgd2hlbiBjZXJ0YWluIHByb3ZpZGVycyBuZWVkIHRvIGJlIG1vY2tlZCBvdXQuXG4gICAqXG4gICAqIFRoZSBwcm92aWRlcnMgc3BlY2lmaWVkIHZpYSB0aGlzIG1ldGhvZCBhcmUgYXBwZW5kZWQgdG8gdGhlIGV4aXN0aW5nIGBwcm92aWRlcnNgIGNhdXNpbmcgdGhlXG4gICAqIGR1cGxpY2F0ZWQgcHJvdmlkZXJzIHRvXG4gICAqIGJlIG92ZXJyaWRkZW4uXG4gICAqXG4gICAqIEBwYXJhbSB7VHlwZX0gY29tcG9uZW50XG4gICAqIEBwYXJhbSB7YW55W119IHByb3ZpZGVyc1xuICAgKlxuICAgKiBAcmV0dXJuIHtUZXN0Q29tcG9uZW50QnVpbGRlcn1cbiAgICovXG4gIG92ZXJyaWRlVmlld1Byb3ZpZGVycyh0eXBlOiBUeXBlLCBwcm92aWRlcnM6IGFueVtdKTogVGVzdENvbXBvbmVudEJ1aWxkZXIge1xuICAgIHZhciBjbG9uZSA9IHRoaXMuX2Nsb25lKCk7XG4gICAgY2xvbmUuX3ZpZXdCaW5kaW5nc092ZXJyaWRlcy5zZXQodHlwZSwgcHJvdmlkZXJzKTtcbiAgICByZXR1cm4gY2xvbmU7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWRcbiAgICovXG4gIG92ZXJyaWRlVmlld0JpbmRpbmdzKHR5cGU6IFR5cGUsIHByb3ZpZGVyczogYW55W10pOiBUZXN0Q29tcG9uZW50QnVpbGRlciB7XG4gICAgcmV0dXJuIHRoaXMub3ZlcnJpZGVWaWV3UHJvdmlkZXJzKHR5cGUsIHByb3ZpZGVycyk7XG4gIH1cblxuICAvKipcbiAgICogQnVpbGRzIGFuZCByZXR1cm5zIGEgQ29tcG9uZW50Rml4dHVyZS5cbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZTxDb21wb25lbnRGaXh0dXJlPn1cbiAgICovXG4gIGNyZWF0ZUFzeW5jKHJvb3RDb21wb25lbnRUeXBlOiBUeXBlKTogUHJvbWlzZTxDb21wb25lbnRGaXh0dXJlPiB7XG4gICAgdmFyIG1vY2tEaXJlY3RpdmVSZXNvbHZlciA9IHRoaXMuX2luamVjdG9yLmdldChEaXJlY3RpdmVSZXNvbHZlcik7XG4gICAgdmFyIG1vY2tWaWV3UmVzb2x2ZXIgPSB0aGlzLl9pbmplY3Rvci5nZXQoVmlld1Jlc29sdmVyKTtcbiAgICB0aGlzLl92aWV3T3ZlcnJpZGVzLmZvckVhY2goKHZpZXcsIHR5cGUpID0+IG1vY2tWaWV3UmVzb2x2ZXIuc2V0Vmlldyh0eXBlLCB2aWV3KSk7XG4gICAgdGhpcy5fdGVtcGxhdGVPdmVycmlkZXMuZm9yRWFjaCgodGVtcGxhdGUsIHR5cGUpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9ja1ZpZXdSZXNvbHZlci5zZXRJbmxpbmVUZW1wbGF0ZSh0eXBlLCB0ZW1wbGF0ZSkpO1xuICAgIHRoaXMuX2RpcmVjdGl2ZU92ZXJyaWRlcy5mb3JFYWNoKChvdmVycmlkZXMsIGNvbXBvbmVudCkgPT4ge1xuICAgICAgb3ZlcnJpZGVzLmZvckVhY2goXG4gICAgICAgICAgKHRvLCBmcm9tKSA9PiB7IG1vY2tWaWV3UmVzb2x2ZXIub3ZlcnJpZGVWaWV3RGlyZWN0aXZlKGNvbXBvbmVudCwgZnJvbSwgdG8pOyB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuX2JpbmRpbmdzT3ZlcnJpZGVzLmZvckVhY2goKGJpbmRpbmdzLCB0eXBlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vY2tEaXJlY3RpdmVSZXNvbHZlci5zZXRCaW5kaW5nc092ZXJyaWRlKHR5cGUsIGJpbmRpbmdzKSk7XG4gICAgdGhpcy5fdmlld0JpbmRpbmdzT3ZlcnJpZGVzLmZvckVhY2goXG4gICAgICAgIChiaW5kaW5ncywgdHlwZSkgPT4gbW9ja0RpcmVjdGl2ZVJlc29sdmVyLnNldFZpZXdCaW5kaW5nc092ZXJyaWRlKHR5cGUsIGJpbmRpbmdzKSk7XG5cbiAgICB2YXIgcm9vdEVsSWQgPSBgcm9vdCR7X25leHRSb290RWxlbWVudElkKyt9YDtcbiAgICB2YXIgcm9vdEVsID0gZWwoYDxkaXYgaWQ9XCIke3Jvb3RFbElkfVwiPjwvZGl2PmApO1xuICAgIHZhciBkb2MgPSB0aGlzLl9pbmplY3Rvci5nZXQoRE9DVU1FTlQpO1xuXG4gICAgLy8gVE9ETyhqdWxpZW1yKTogY2FuL3Nob3VsZCB0aGlzIGJlIG9wdGlvbmFsP1xuICAgIHZhciBvbGRSb290cyA9IERPTS5xdWVyeVNlbGVjdG9yQWxsKGRvYywgJ1tpZF49cm9vdF0nKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9sZFJvb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBET00ucmVtb3ZlKG9sZFJvb3RzW2ldKTtcbiAgICB9XG4gICAgRE9NLmFwcGVuZENoaWxkKGRvYy5ib2R5LCByb290RWwpO1xuXG5cbiAgICB2YXIgcHJvbWlzZTogUHJvbWlzZTxDb21wb25lbnRSZWY+ID1cbiAgICAgICAgdGhpcy5faW5qZWN0b3IuZ2V0KER5bmFtaWNDb21wb25lbnRMb2FkZXIpXG4gICAgICAgICAgICAubG9hZEFzUm9vdChyb290Q29tcG9uZW50VHlwZSwgYCMke3Jvb3RFbElkfWAsIHRoaXMuX2luamVjdG9yKTtcbiAgICByZXR1cm4gcHJvbWlzZS50aGVuKChjb21wb25lbnRSZWYpID0+IHsgcmV0dXJuIG5ldyBDb21wb25lbnRGaXh0dXJlXyhjb21wb25lbnRSZWYpOyB9KTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
