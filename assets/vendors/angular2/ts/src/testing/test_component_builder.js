System.register(['angular2/core', 'angular2/compiler', 'angular2/src/facade/lang', 'angular2/src/facade/async', 'angular2/src/facade/collection', './utils', 'angular2/src/platform/dom/dom_tokens', 'angular2/src/platform/dom/dom_adapter', 'angular2/src/core/debug/debug_node', './fake_async'], function(exports_1, context_1) {
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
    var core_1, compiler_1, lang_1, async_1, collection_1, utils_1, dom_tokens_1, dom_adapter_1, debug_node_1, fake_async_1;
    var ComponentFixture, _nextRootElementId, TestComponentBuilder;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (compiler_1_1) {
                compiler_1 = compiler_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
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
            },
            function (fake_async_1_1) {
                fake_async_1 = fake_async_1_1;
            }],
        execute: function() {
            /**
             * Fixture for debugging and testing a component.
             */
            ComponentFixture = (function () {
                function ComponentFixture(componentRef) {
                    this.changeDetectorRef = componentRef.changeDetectorRef;
                    this.elementRef = componentRef.location;
                    this.debugElement = debug_node_1.getDebugNode(this.elementRef.nativeElement);
                    this.componentInstance = componentRef.instance;
                    this.nativeElement = this.elementRef.nativeElement;
                    this.componentRef = componentRef;
                }
                /**
                 * Trigger a change detection cycle for the component.
                 */
                ComponentFixture.prototype.detectChanges = function (checkNoChanges) {
                    if (checkNoChanges === void 0) { checkNoChanges = true; }
                    this.changeDetectorRef.detectChanges();
                    if (checkNoChanges) {
                        this.checkNoChanges();
                    }
                };
                ComponentFixture.prototype.checkNoChanges = function () { this.changeDetectorRef.checkNoChanges(); };
                /**
                 * Trigger component destruction.
                 */
                ComponentFixture.prototype.destroy = function () { this.componentRef.destroy(); };
                return ComponentFixture;
            }());
            exports_1("ComponentFixture", ComponentFixture);
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
                    clone._bindingsOverrides = collection_1.MapWrapper.clone(this._bindingsOverrides);
                    clone._viewBindingsOverrides = collection_1.MapWrapper.clone(this._viewBindingsOverrides);
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
                    var mockDirectiveResolver = this._injector.get(compiler_1.DirectiveResolver);
                    var mockViewResolver = this._injector.get(compiler_1.ViewResolver);
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
                    return promise.then(function (componentRef) { return new ComponentFixture(componentRef); });
                };
                TestComponentBuilder.prototype.createFakeAsync = function (rootComponentType) {
                    var result;
                    var error;
                    async_1.PromiseWrapper.then(this.createAsync(rootComponentType), function (_result) { result = _result; }, function (_error) { error = _error; });
                    fake_async_1.tick();
                    if (lang_1.isPresent(error)) {
                        throw error;
                    }
                    return result;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy90ZXN0aW5nL3Rlc3RfY29tcG9uZW50X2J1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OzswQkF1Rkksa0JBQWtCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBN0R0Qjs7ZUFFRztZQUNIO2dCQStCRSwwQkFBWSxZQUEwQjtvQkFDcEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQztvQkFDeEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO29CQUN4QyxJQUFJLENBQUMsWUFBWSxHQUFpQix5QkFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQzlFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO29CQUMvQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO29CQUNuRCxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztnQkFDbkMsQ0FBQztnQkFFRDs7bUJBRUc7Z0JBQ0gsd0NBQWEsR0FBYixVQUFjLGNBQThCO29CQUE5Qiw4QkFBOEIsR0FBOUIscUJBQThCO29CQUMxQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3ZDLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7d0JBQ25CLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDeEIsQ0FBQztnQkFDSCxDQUFDO2dCQUVELHlDQUFjLEdBQWQsY0FBeUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFbkU7O21CQUVHO2dCQUNILGtDQUFPLEdBQVAsY0FBa0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7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Z0JBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3JCLE1BQU0sS0FBSyxDQUFDO29CQUNkLENBQUM7b0JBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDaEIsQ0FBQztnQkFuTEg7b0JBQUMsaUJBQVUsRUFBRTs7d0NBQUE7Z0JBb0xiLDJCQUFDO1lBQUQsQ0FuTEEsQUFtTEMsSUFBQTtZQW5MRCx1REFtTEMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvdGVzdGluZy90ZXN0X2NvbXBvbmVudF9idWlsZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50UmVmLFxuICBEeW5hbWljQ29tcG9uZW50TG9hZGVyLFxuICBJbmplY3RvcixcbiAgSW5qZWN0YWJsZSxcbiAgVmlld01ldGFkYXRhLFxuICBFbGVtZW50UmVmLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBwcm92aWRlXG59IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtEaXJlY3RpdmVSZXNvbHZlciwgVmlld1Jlc29sdmVyfSBmcm9tICdhbmd1bGFyMi9jb21waWxlcic7XG5cbmltcG9ydCB7VHlwZSwgaXNQcmVzZW50LCBpc0JsYW5rfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtQcm9taXNlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5pbXBvcnQge0xpc3RXcmFwcGVyLCBNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuXG5pbXBvcnQge2VsfSBmcm9tICcuL3V0aWxzJztcblxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fdG9rZW5zJztcbmltcG9ydCB7RE9NfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9hZGFwdGVyJztcblxuaW1wb3J0IHtEZWJ1Z05vZGUsIERlYnVnRWxlbWVudCwgZ2V0RGVidWdOb2RlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kZWJ1Zy9kZWJ1Z19ub2RlJztcblxuaW1wb3J0IHt0aWNrfSBmcm9tICcuL2Zha2VfYXN5bmMnO1xuXG4vKipcbiAqIEZpeHR1cmUgZm9yIGRlYnVnZ2luZyBhbmQgdGVzdGluZyBhIGNvbXBvbmVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbXBvbmVudEZpeHR1cmUge1xuICAvKipcbiAgICogVGhlIERlYnVnRWxlbWVudCBhc3NvY2lhdGVkIHdpdGggdGhlIHJvb3QgZWxlbWVudCBvZiB0aGlzIGNvbXBvbmVudC5cbiAgICovXG4gIGRlYnVnRWxlbWVudDogRGVidWdFbGVtZW50O1xuXG4gIC8qKlxuICAgKiBUaGUgaW5zdGFuY2Ugb2YgdGhlIHJvb3QgY29tcG9uZW50IGNsYXNzLlxuICAgKi9cbiAgY29tcG9uZW50SW5zdGFuY2U6IGFueTtcblxuICAvKipcbiAgICogVGhlIG5hdGl2ZSBlbGVtZW50IGF0IHRoZSByb290IG9mIHRoZSBjb21wb25lbnQuXG4gICAqL1xuICBuYXRpdmVFbGVtZW50OiBhbnk7XG5cbiAgLyoqXG4gICAqIFRoZSBFbGVtZW50UmVmIGZvciB0aGUgZWxlbWVudCBhdCB0aGUgcm9vdCBvZiB0aGUgY29tcG9uZW50LlxuICAgKi9cbiAgZWxlbWVudFJlZjogRWxlbWVudFJlZjtcblxuICAvKipcbiAgICogVGhlIENvbXBvbmVudFJlZiBmb3IgdGhlIGNvbXBvbmVudFxuICAgKi9cbiAgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY7XG5cbiAgLyoqXG4gICAqIFRoZSBDaGFuZ2VEZXRlY3RvclJlZiBmb3IgdGhlIGNvbXBvbmVudFxuICAgKi9cbiAgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmO1xuXG4gIGNvbnN0cnVjdG9yKGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmKSB7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZiA9IGNvbXBvbmVudFJlZi5jaGFuZ2VEZXRlY3RvclJlZjtcbiAgICB0aGlzLmVsZW1lbnRSZWYgPSBjb21wb25lbnRSZWYubG9jYXRpb247XG4gICAgdGhpcy5kZWJ1Z0VsZW1lbnQgPSA8RGVidWdFbGVtZW50PmdldERlYnVnTm9kZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgdGhpcy5jb21wb25lbnRJbnN0YW5jZSA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZTtcbiAgICB0aGlzLm5hdGl2ZUVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmNvbXBvbmVudFJlZiA9IGNvbXBvbmVudFJlZjtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIGEgY2hhbmdlIGRldGVjdGlvbiBjeWNsZSBmb3IgdGhlIGNvbXBvbmVudC5cbiAgICovXG4gIGRldGVjdENoYW5nZXMoY2hlY2tOb0NoYW5nZXM6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgaWYgKGNoZWNrTm9DaGFuZ2VzKSB7XG4gICAgICB0aGlzLmNoZWNrTm9DaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tOb0NoYW5nZXMoKTogdm9pZCB7IHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuY2hlY2tOb0NoYW5nZXMoKTsgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIGNvbXBvbmVudCBkZXN0cnVjdGlvbi5cbiAgICovXG4gIGRlc3Ryb3koKTogdm9pZCB7IHRoaXMuY29tcG9uZW50UmVmLmRlc3Ryb3koKTsgfVxufVxuXG52YXIgX25leHRSb290RWxlbWVudElkID0gMDtcblxuLyoqXG4gKiBCdWlsZHMgYSBDb21wb25lbnRGaXh0dXJlIGZvciB1c2UgaW4gY29tcG9uZW50IGxldmVsIHRlc3RzLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGVzdENvbXBvbmVudEJ1aWxkZXIge1xuICAvKiogQGludGVybmFsICovXG4gIF9iaW5kaW5nc092ZXJyaWRlcyA9IG5ldyBNYXA8VHlwZSwgYW55W10+KCk7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2RpcmVjdGl2ZU92ZXJyaWRlcyA9IG5ldyBNYXA8VHlwZSwgTWFwPFR5cGUsIFR5cGU+PigpO1xuICAvKiogQGludGVybmFsICovXG4gIF90ZW1wbGF0ZU92ZXJyaWRlcyA9IG5ldyBNYXA8VHlwZSwgc3RyaW5nPigpO1xuICAvKiogQGludGVybmFsICovXG4gIF92aWV3QmluZGluZ3NPdmVycmlkZXMgPSBuZXcgTWFwPFR5cGUsIGFueVtdPigpO1xuICAvKiogQGludGVybmFsICovXG4gIF92aWV3T3ZlcnJpZGVzID0gbmV3IE1hcDxUeXBlLCBWaWV3TWV0YWRhdGE+KCk7XG5cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9pbmplY3RvcjogSW5qZWN0b3IpIHt9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY2xvbmUoKTogVGVzdENvbXBvbmVudEJ1aWxkZXIge1xuICAgIHZhciBjbG9uZSA9IG5ldyBUZXN0Q29tcG9uZW50QnVpbGRlcih0aGlzLl9pbmplY3Rvcik7XG4gICAgY2xvbmUuX3ZpZXdPdmVycmlkZXMgPSBNYXBXcmFwcGVyLmNsb25lKHRoaXMuX3ZpZXdPdmVycmlkZXMpO1xuICAgIGNsb25lLl9kaXJlY3RpdmVPdmVycmlkZXMgPSBNYXBXcmFwcGVyLmNsb25lKHRoaXMuX2RpcmVjdGl2ZU92ZXJyaWRlcyk7XG4gICAgY2xvbmUuX3RlbXBsYXRlT3ZlcnJpZGVzID0gTWFwV3JhcHBlci5jbG9uZSh0aGlzLl90ZW1wbGF0ZU92ZXJyaWRlcyk7XG4gICAgY2xvbmUuX2JpbmRpbmdzT3ZlcnJpZGVzID0gTWFwV3JhcHBlci5jbG9uZSh0aGlzLl9iaW5kaW5nc092ZXJyaWRlcyk7XG4gICAgY2xvbmUuX3ZpZXdCaW5kaW5nc092ZXJyaWRlcyA9IE1hcFdyYXBwZXIuY2xvbmUodGhpcy5fdmlld0JpbmRpbmdzT3ZlcnJpZGVzKTtcbiAgICByZXR1cm4gY2xvbmU7XG4gIH1cblxuICAvKipcbiAgICogT3ZlcnJpZGVzIG9ubHkgdGhlIGh0bWwgb2YgYSB7QGxpbmsgQ29tcG9uZW50TWV0YWRhdGF9LlxuICAgKiBBbGwgdGhlIG90aGVyIHByb3BlcnRpZXMgb2YgdGhlIGNvbXBvbmVudCdzIHtAbGluayBWaWV3TWV0YWRhdGF9IGFyZSBwcmVzZXJ2ZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7VHlwZX0gY29tcG9uZW50XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBodG1sXG4gICAqXG4gICAqIEByZXR1cm4ge1Rlc3RDb21wb25lbnRCdWlsZGVyfVxuICAgKi9cbiAgb3ZlcnJpZGVUZW1wbGF0ZShjb21wb25lbnRUeXBlOiBUeXBlLCB0ZW1wbGF0ZTogc3RyaW5nKTogVGVzdENvbXBvbmVudEJ1aWxkZXIge1xuICAgIHZhciBjbG9uZSA9IHRoaXMuX2Nsb25lKCk7XG4gICAgY2xvbmUuX3RlbXBsYXRlT3ZlcnJpZGVzLnNldChjb21wb25lbnRUeXBlLCB0ZW1wbGF0ZSk7XG4gICAgcmV0dXJuIGNsb25lO1xuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlcyBhIGNvbXBvbmVudCdzIHtAbGluayBWaWV3TWV0YWRhdGF9LlxuICAgKlxuICAgKiBAcGFyYW0ge1R5cGV9IGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge3ZpZXd9IFZpZXdcbiAgICpcbiAgICogQHJldHVybiB7VGVzdENvbXBvbmVudEJ1aWxkZXJ9XG4gICAqL1xuICBvdmVycmlkZVZpZXcoY29tcG9uZW50VHlwZTogVHlwZSwgdmlldzogVmlld01ldGFkYXRhKTogVGVzdENvbXBvbmVudEJ1aWxkZXIge1xuICAgIHZhciBjbG9uZSA9IHRoaXMuX2Nsb25lKCk7XG4gICAgY2xvbmUuX3ZpZXdPdmVycmlkZXMuc2V0KGNvbXBvbmVudFR5cGUsIHZpZXcpO1xuICAgIHJldHVybiBjbG9uZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVycmlkZXMgdGhlIGRpcmVjdGl2ZXMgZnJvbSB0aGUgY29tcG9uZW50IHtAbGluayBWaWV3TWV0YWRhdGF9LlxuICAgKlxuICAgKiBAcGFyYW0ge1R5cGV9IGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge1R5cGV9IGZyb21cbiAgICogQHBhcmFtIHtUeXBlfSB0b1xuICAgKlxuICAgKiBAcmV0dXJuIHtUZXN0Q29tcG9uZW50QnVpbGRlcn1cbiAgICovXG4gIG92ZXJyaWRlRGlyZWN0aXZlKGNvbXBvbmVudFR5cGU6IFR5cGUsIGZyb206IFR5cGUsIHRvOiBUeXBlKTogVGVzdENvbXBvbmVudEJ1aWxkZXIge1xuICAgIHZhciBjbG9uZSA9IHRoaXMuX2Nsb25lKCk7XG4gICAgdmFyIG92ZXJyaWRlc0ZvckNvbXBvbmVudCA9IGNsb25lLl9kaXJlY3RpdmVPdmVycmlkZXMuZ2V0KGNvbXBvbmVudFR5cGUpO1xuICAgIGlmICghaXNQcmVzZW50KG92ZXJyaWRlc0ZvckNvbXBvbmVudCkpIHtcbiAgICAgIGNsb25lLl9kaXJlY3RpdmVPdmVycmlkZXMuc2V0KGNvbXBvbmVudFR5cGUsIG5ldyBNYXA8VHlwZSwgVHlwZT4oKSk7XG4gICAgICBvdmVycmlkZXNGb3JDb21wb25lbnQgPSBjbG9uZS5fZGlyZWN0aXZlT3ZlcnJpZGVzLmdldChjb21wb25lbnRUeXBlKTtcbiAgICB9XG4gICAgb3ZlcnJpZGVzRm9yQ29tcG9uZW50LnNldChmcm9tLCB0byk7XG4gICAgcmV0dXJuIGNsb25lO1xuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlcyBvbmUgb3IgbW9yZSBpbmplY3RhYmxlcyBjb25maWd1cmVkIHZpYSBgcHJvdmlkZXJzYCBtZXRhZGF0YSBwcm9wZXJ0eSBvZiBhIGRpcmVjdGl2ZVxuICAgKiBvclxuICAgKiBjb21wb25lbnQuXG4gICAqIFZlcnkgdXNlZnVsIHdoZW4gY2VydGFpbiBwcm92aWRlcnMgbmVlZCB0byBiZSBtb2NrZWQgb3V0LlxuICAgKlxuICAgKiBUaGUgcHJvdmlkZXJzIHNwZWNpZmllZCB2aWEgdGhpcyBtZXRob2QgYXJlIGFwcGVuZGVkIHRvIHRoZSBleGlzdGluZyBgcHJvdmlkZXJzYCBjYXVzaW5nIHRoZVxuICAgKiBkdXBsaWNhdGVkIHByb3ZpZGVycyB0b1xuICAgKiBiZSBvdmVycmlkZGVuLlxuICAgKlxuICAgKiBAcGFyYW0ge1R5cGV9IGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge2FueVtdfSBwcm92aWRlcnNcbiAgICpcbiAgICogQHJldHVybiB7VGVzdENvbXBvbmVudEJ1aWxkZXJ9XG4gICAqL1xuICBvdmVycmlkZVByb3ZpZGVycyh0eXBlOiBUeXBlLCBwcm92aWRlcnM6IGFueVtdKTogVGVzdENvbXBvbmVudEJ1aWxkZXIge1xuICAgIHZhciBjbG9uZSA9IHRoaXMuX2Nsb25lKCk7XG4gICAgY2xvbmUuX2JpbmRpbmdzT3ZlcnJpZGVzLnNldCh0eXBlLCBwcm92aWRlcnMpO1xuICAgIHJldHVybiBjbG9uZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZFxuICAgKi9cbiAgb3ZlcnJpZGVCaW5kaW5ncyh0eXBlOiBUeXBlLCBwcm92aWRlcnM6IGFueVtdKTogVGVzdENvbXBvbmVudEJ1aWxkZXIge1xuICAgIHJldHVybiB0aGlzLm92ZXJyaWRlUHJvdmlkZXJzKHR5cGUsIHByb3ZpZGVycyk7XG4gIH1cblxuICAvKipcbiAgICogT3ZlcnJpZGVzIG9uZSBvciBtb3JlIGluamVjdGFibGVzIGNvbmZpZ3VyZWQgdmlhIGBwcm92aWRlcnNgIG1ldGFkYXRhIHByb3BlcnR5IG9mIGEgZGlyZWN0aXZlXG4gICAqIG9yXG4gICAqIGNvbXBvbmVudC5cbiAgICogVmVyeSB1c2VmdWwgd2hlbiBjZXJ0YWluIHByb3ZpZGVycyBuZWVkIHRvIGJlIG1vY2tlZCBvdXQuXG4gICAqXG4gICAqIFRoZSBwcm92aWRlcnMgc3BlY2lmaWVkIHZpYSB0aGlzIG1ldGhvZCBhcmUgYXBwZW5kZWQgdG8gdGhlIGV4aXN0aW5nIGBwcm92aWRlcnNgIGNhdXNpbmcgdGhlXG4gICAqIGR1cGxpY2F0ZWQgcHJvdmlkZXJzIHRvXG4gICAqIGJlIG92ZXJyaWRkZW4uXG4gICAqXG4gICAqIEBwYXJhbSB7VHlwZX0gY29tcG9uZW50XG4gICAqIEBwYXJhbSB7YW55W119IHByb3ZpZGVyc1xuICAgKlxuICAgKiBAcmV0dXJuIHtUZXN0Q29tcG9uZW50QnVpbGRlcn1cbiAgICovXG4gIG92ZXJyaWRlVmlld1Byb3ZpZGVycyh0eXBlOiBUeXBlLCBwcm92aWRlcnM6IGFueVtdKTogVGVzdENvbXBvbmVudEJ1aWxkZXIge1xuICAgIHZhciBjbG9uZSA9IHRoaXMuX2Nsb25lKCk7XG4gICAgY2xvbmUuX3ZpZXdCaW5kaW5nc092ZXJyaWRlcy5zZXQodHlwZSwgcHJvdmlkZXJzKTtcbiAgICByZXR1cm4gY2xvbmU7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWRcbiAgICovXG4gIG92ZXJyaWRlVmlld0JpbmRpbmdzKHR5cGU6IFR5cGUsIHByb3ZpZGVyczogYW55W10pOiBUZXN0Q29tcG9uZW50QnVpbGRlciB7XG4gICAgcmV0dXJuIHRoaXMub3ZlcnJpZGVWaWV3UHJvdmlkZXJzKHR5cGUsIHByb3ZpZGVycyk7XG4gIH1cblxuICAvKipcbiAgICogQnVpbGRzIGFuZCByZXR1cm5zIGEgQ29tcG9uZW50Rml4dHVyZS5cbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZTxDb21wb25lbnRGaXh0dXJlPn1cbiAgICovXG4gIGNyZWF0ZUFzeW5jKHJvb3RDb21wb25lbnRUeXBlOiBUeXBlKTogUHJvbWlzZTxDb21wb25lbnRGaXh0dXJlPiB7XG4gICAgdmFyIG1vY2tEaXJlY3RpdmVSZXNvbHZlciA9IHRoaXMuX2luamVjdG9yLmdldChEaXJlY3RpdmVSZXNvbHZlcik7XG4gICAgdmFyIG1vY2tWaWV3UmVzb2x2ZXIgPSB0aGlzLl9pbmplY3Rvci5nZXQoVmlld1Jlc29sdmVyKTtcbiAgICB0aGlzLl92aWV3T3ZlcnJpZGVzLmZvckVhY2goKHZpZXcsIHR5cGUpID0+IG1vY2tWaWV3UmVzb2x2ZXIuc2V0Vmlldyh0eXBlLCB2aWV3KSk7XG4gICAgdGhpcy5fdGVtcGxhdGVPdmVycmlkZXMuZm9yRWFjaCgodGVtcGxhdGUsIHR5cGUpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9ja1ZpZXdSZXNvbHZlci5zZXRJbmxpbmVUZW1wbGF0ZSh0eXBlLCB0ZW1wbGF0ZSkpO1xuICAgIHRoaXMuX2RpcmVjdGl2ZU92ZXJyaWRlcy5mb3JFYWNoKChvdmVycmlkZXMsIGNvbXBvbmVudCkgPT4ge1xuICAgICAgb3ZlcnJpZGVzLmZvckVhY2goXG4gICAgICAgICAgKHRvLCBmcm9tKSA9PiB7IG1vY2tWaWV3UmVzb2x2ZXIub3ZlcnJpZGVWaWV3RGlyZWN0aXZlKGNvbXBvbmVudCwgZnJvbSwgdG8pOyB9KTtcbiAgICB9KTtcbiAgICB0aGlzLl9iaW5kaW5nc092ZXJyaWRlcy5mb3JFYWNoKChiaW5kaW5ncywgdHlwZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2NrRGlyZWN0aXZlUmVzb2x2ZXIuc2V0QmluZGluZ3NPdmVycmlkZSh0eXBlLCBiaW5kaW5ncykpO1xuICAgIHRoaXMuX3ZpZXdCaW5kaW5nc092ZXJyaWRlcy5mb3JFYWNoKFxuICAgICAgICAoYmluZGluZ3MsIHR5cGUpID0+IG1vY2tEaXJlY3RpdmVSZXNvbHZlci5zZXRWaWV3QmluZGluZ3NPdmVycmlkZSh0eXBlLCBiaW5kaW5ncykpO1xuXG4gICAgdmFyIHJvb3RFbElkID0gYHJvb3Qke19uZXh0Um9vdEVsZW1lbnRJZCsrfWA7XG4gICAgdmFyIHJvb3RFbCA9IGVsKGA8ZGl2IGlkPVwiJHtyb290RWxJZH1cIj48L2Rpdj5gKTtcbiAgICB2YXIgZG9jID0gdGhpcy5faW5qZWN0b3IuZ2V0KERPQ1VNRU5UKTtcblxuICAgIC8vIFRPRE8oanVsaWVtcik6IGNhbi9zaG91bGQgdGhpcyBiZSBvcHRpb25hbD9cbiAgICB2YXIgb2xkUm9vdHMgPSBET00ucXVlcnlTZWxlY3RvckFsbChkb2MsICdbaWRePXJvb3RdJyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvbGRSb290cy5sZW5ndGg7IGkrKykge1xuICAgICAgRE9NLnJlbW92ZShvbGRSb290c1tpXSk7XG4gICAgfVxuICAgIERPTS5hcHBlbmRDaGlsZChkb2MuYm9keSwgcm9vdEVsKTtcblxuICAgIHZhciBwcm9taXNlOiBQcm9taXNlPENvbXBvbmVudFJlZj4gPVxuICAgICAgICB0aGlzLl9pbmplY3Rvci5nZXQoRHluYW1pY0NvbXBvbmVudExvYWRlcilcbiAgICAgICAgICAgIC5sb2FkQXNSb290KHJvb3RDb21wb25lbnRUeXBlLCBgIyR7cm9vdEVsSWR9YCwgdGhpcy5faW5qZWN0b3IpO1xuICAgIHJldHVybiBwcm9taXNlLnRoZW4oKGNvbXBvbmVudFJlZikgPT4geyByZXR1cm4gbmV3IENvbXBvbmVudEZpeHR1cmUoY29tcG9uZW50UmVmKTsgfSk7XG4gIH1cblxuICBjcmVhdGVGYWtlQXN5bmMocm9vdENvbXBvbmVudFR5cGU6IFR5cGUpOiBDb21wb25lbnRGaXh0dXJlIHtcbiAgICB2YXIgcmVzdWx0O1xuICAgIHZhciBlcnJvcjtcbiAgICBQcm9taXNlV3JhcHBlci50aGVuKHRoaXMuY3JlYXRlQXN5bmMocm9vdENvbXBvbmVudFR5cGUpLCAoX3Jlc3VsdCkgPT4geyByZXN1bHQgPSBfcmVzdWx0OyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgKF9lcnJvcikgPT4geyBlcnJvciA9IF9lcnJvcjsgfSk7XG4gICAgdGljaygpO1xuICAgIGlmIChpc1ByZXNlbnQoZXJyb3IpKSB7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
