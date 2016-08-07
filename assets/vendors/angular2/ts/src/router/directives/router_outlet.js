System.register(['angular2/src/facade/async', 'angular2/src/facade/collection', 'angular2/src/facade/lang', 'angular2/core', '../router', '../instruction', '../lifecycle/lifecycle_annotations', '../lifecycle/route_lifecycle_reflector'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var async_1, collection_1, lang_1, core_1, routerMod, instruction_1, hookMod, route_lifecycle_reflector_1;
    var _resolveToTrue, RouterOutlet;
    return {
        setters:[
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (routerMod_1) {
                routerMod = routerMod_1;
            },
            function (instruction_1_1) {
                instruction_1 = instruction_1_1;
            },
            function (hookMod_1) {
                hookMod = hookMod_1;
            },
            function (route_lifecycle_reflector_1_1) {
                route_lifecycle_reflector_1 = route_lifecycle_reflector_1_1;
            }],
        execute: function() {
            _resolveToTrue = async_1.PromiseWrapper.resolve(true);
            /**
             * A router outlet is a placeholder that Angular dynamically fills based on the application's route.
             *
             * ## Use
             *
             * ```
             * <router-outlet></router-outlet>
             * ```
             */
            RouterOutlet = (function () {
                function RouterOutlet(_viewContainerRef, _loader, _parentRouter, nameAttr) {
                    this._viewContainerRef = _viewContainerRef;
                    this._loader = _loader;
                    this._parentRouter = _parentRouter;
                    this.name = null;
                    this._componentRef = null;
                    this._currentInstruction = null;
                    this.activateEvents = new async_1.EventEmitter();
                    if (lang_1.isPresent(nameAttr)) {
                        this.name = nameAttr;
                        this._parentRouter.registerAuxOutlet(this);
                    }
                    else {
                        this._parentRouter.registerPrimaryOutlet(this);
                    }
                }
                /**
                 * Called by the Router to instantiate a new component during the commit phase of a navigation.
                 * This method in turn is responsible for calling the `routerOnActivate` hook of its child.
                 */
                RouterOutlet.prototype.activate = function (nextInstruction) {
                    var _this = this;
                    var previousInstruction = this._currentInstruction;
                    this._currentInstruction = nextInstruction;
                    var componentType = nextInstruction.componentType;
                    var childRouter = this._parentRouter.childRouter(componentType);
                    var providers = core_1.ReflectiveInjector.resolve([
                        core_1.provide(instruction_1.RouteData, { useValue: nextInstruction.routeData }),
                        core_1.provide(instruction_1.RouteParams, { useValue: new instruction_1.RouteParams(nextInstruction.params) }),
                        core_1.provide(routerMod.Router, { useValue: childRouter })
                    ]);
                    this._componentRef =
                        this._loader.loadNextToLocation(componentType, this._viewContainerRef, providers);
                    return this._componentRef.then(function (componentRef) {
                        _this.activateEvents.emit(componentRef.instance);
                        if (route_lifecycle_reflector_1.hasLifecycleHook(hookMod.routerOnActivate, componentType)) {
                            return _this._componentRef.then(function (ref) {
                                return ref.instance.routerOnActivate(nextInstruction, previousInstruction);
                            });
                        }
                        else {
                            return componentRef;
                        }
                    });
                };
                /**
                 * Called by the {@link Router} during the commit phase of a navigation when an outlet
                 * reuses a component between different routes.
                 * This method in turn is responsible for calling the `routerOnReuse` hook of its child.
                 */
                RouterOutlet.prototype.reuse = function (nextInstruction) {
                    var previousInstruction = this._currentInstruction;
                    this._currentInstruction = nextInstruction;
                    // it's possible the component is removed before it can be reactivated (if nested withing
                    // another dynamically loaded component, for instance). In that case, we simply activate
                    // a new one.
                    if (lang_1.isBlank(this._componentRef)) {
                        return this.activate(nextInstruction);
                    }
                    else {
                        return async_1.PromiseWrapper.resolve(route_lifecycle_reflector_1.hasLifecycleHook(hookMod.routerOnReuse, this._currentInstruction.componentType) ?
                            this._componentRef.then(function (ref) {
                                return ref.instance.routerOnReuse(nextInstruction, previousInstruction);
                            }) :
                            true);
                    }
                };
                /**
                 * Called by the {@link Router} when an outlet disposes of a component's contents.
                 * This method in turn is responsible for calling the `routerOnDeactivate` hook of its child.
                 */
                RouterOutlet.prototype.deactivate = function (nextInstruction) {
                    var _this = this;
                    var next = _resolveToTrue;
                    if (lang_1.isPresent(this._componentRef) && lang_1.isPresent(this._currentInstruction) &&
                        route_lifecycle_reflector_1.hasLifecycleHook(hookMod.routerOnDeactivate, this._currentInstruction.componentType)) {
                        next = this._componentRef.then(function (ref) {
                            return ref.instance
                                .routerOnDeactivate(nextInstruction, _this._currentInstruction);
                        });
                    }
                    return next.then(function (_) {
                        if (lang_1.isPresent(_this._componentRef)) {
                            var onDispose = _this._componentRef.then(function (ref) { return ref.destroy(); });
                            _this._componentRef = null;
                            return onDispose;
                        }
                    });
                };
                /**
                 * Called by the {@link Router} during recognition phase of a navigation.
                 *
                 * If this resolves to `false`, the given navigation is cancelled.
                 *
                 * This method delegates to the child component's `routerCanDeactivate` hook if it exists,
                 * and otherwise resolves to true.
                 */
                RouterOutlet.prototype.routerCanDeactivate = function (nextInstruction) {
                    var _this = this;
                    if (lang_1.isBlank(this._currentInstruction)) {
                        return _resolveToTrue;
                    }
                    if (route_lifecycle_reflector_1.hasLifecycleHook(hookMod.routerCanDeactivate, this._currentInstruction.componentType)) {
                        return this._componentRef.then(function (ref) {
                            return ref.instance
                                .routerCanDeactivate(nextInstruction, _this._currentInstruction);
                        });
                    }
                    else {
                        return _resolveToTrue;
                    }
                };
                /**
                 * Called by the {@link Router} during recognition phase of a navigation.
                 *
                 * If the new child component has a different Type than the existing child component,
                 * this will resolve to `false`. You can't reuse an old component when the new component
                 * is of a different Type.
                 *
                 * Otherwise, this method delegates to the child component's `routerCanReuse` hook if it exists,
                 * or resolves to true if the hook is not present.
                 */
                RouterOutlet.prototype.routerCanReuse = function (nextInstruction) {
                    var _this = this;
                    var result;
                    if (lang_1.isBlank(this._currentInstruction) ||
                        this._currentInstruction.componentType != nextInstruction.componentType) {
                        result = false;
                    }
                    else if (route_lifecycle_reflector_1.hasLifecycleHook(hookMod.routerCanReuse, this._currentInstruction.componentType)) {
                        result = this._componentRef.then(function (ref) {
                            return ref.instance.routerCanReuse(nextInstruction, _this._currentInstruction);
                        });
                    }
                    else {
                        result = nextInstruction == this._currentInstruction ||
                            (lang_1.isPresent(nextInstruction.params) && lang_1.isPresent(this._currentInstruction.params) &&
                                collection_1.StringMapWrapper.equals(nextInstruction.params, this._currentInstruction.params));
                    }
                    return async_1.PromiseWrapper.resolve(result);
                };
                RouterOutlet.prototype.ngOnDestroy = function () { this._parentRouter.unregisterPrimaryOutlet(this); };
                __decorate([
                    core_1.Output('activate'), 
                    __metadata('design:type', Object)
                ], RouterOutlet.prototype, "activateEvents", void 0);
                RouterOutlet = __decorate([
                    core_1.Directive({ selector: 'router-outlet' }),
                    __param(3, core_1.Attribute('name')), 
                    __metadata('design:paramtypes', [core_1.ViewContainerRef, core_1.DynamicComponentLoader, routerMod.Router, String])
                ], RouterOutlet);
                return RouterOutlet;
            }());
            exports_1("RouterOutlet", RouterOutlet);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvZGlyZWN0aXZlcy9yb3V0ZXJfb3V0bGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7UUFzQkksY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUFkLGNBQWMsR0FBRyxzQkFBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVsRDs7Ozs7Ozs7ZUFRRztZQUVIO2dCQU9FLHNCQUFvQixpQkFBbUMsRUFBVSxPQUErQixFQUM1RSxhQUErQixFQUFxQixRQUFnQjtvQkFEcEUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtvQkFBVSxZQUFPLEdBQVAsT0FBTyxDQUF3QjtvQkFDNUUsa0JBQWEsR0FBYixhQUFhLENBQWtCO29CQVBuRCxTQUFJLEdBQVcsSUFBSSxDQUFDO29CQUNaLGtCQUFhLEdBQTBCLElBQUksQ0FBQztvQkFDNUMsd0JBQW1CLEdBQXlCLElBQUksQ0FBQztvQkFFOUIsbUJBQWMsR0FBRyxJQUFJLG9CQUFZLEVBQU8sQ0FBQztvQkFJbEUsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO3dCQUNyQixJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM3QyxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2pELENBQUM7Z0JBQ0gsQ0FBQztnQkFFRDs7O21CQUdHO2dCQUNILCtCQUFRLEdBQVIsVUFBUyxlQUFxQztvQkFBOUMsaUJBdUJDO29CQXRCQyxJQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztvQkFDbkQsSUFBSSxDQUFDLG1CQUFtQixHQUFH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QUFDLENBQUM7b0JBQzlGLENBQUM7b0JBQ0QsTUFBTSxDQUFtQixzQkFBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDMUQsQ0FBQztnQkFFRCxrQ0FBVyxHQUFYLGNBQXNCLElBQUksQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQXpJekU7b0JBQUMsYUFBTSxDQUFDLFVBQVUsQ0FBQzs7b0VBQUE7Z0JBTnJCO29CQUFDLGdCQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUsZUFBZSxFQUFDLENBQUM7K0JBU2lCLGdCQUFTLENBQUMsTUFBTSxDQUFDO3VIQUExQixNQUFNO2dDQVRkO2dCQWdKdkMsbUJBQUM7WUFBRCxDQS9JQSxBQStJQyxJQUFBO1lBL0lELHVDQStJQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvZGlyZWN0aXZlcy9yb3V0ZXJfb3V0bGV0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQcm9taXNlV3JhcHBlciwgRXZlbnRFbWl0dGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jJztcbmltcG9ydCB7U3RyaW5nTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7aXNCbGFuaywgaXNQcmVzZW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG5pbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEF0dHJpYnV0ZSxcbiAgRHluYW1pY0NvbXBvbmVudExvYWRlcixcbiAgQ29tcG9uZW50UmVmLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBwcm92aWRlLFxuICBSZWZsZWN0aXZlSW5qZWN0b3IsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0XG59IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuXG5pbXBvcnQgKiBhcyByb3V0ZXJNb2QgZnJvbSAnLi4vcm91dGVyJztcbmltcG9ydCB7Q29tcG9uZW50SW5zdHJ1Y3Rpb24sIFJvdXRlUGFyYW1zLCBSb3V0ZURhdGF9IGZyb20gJy4uL2luc3RydWN0aW9uJztcbmltcG9ydCAqIGFzIGhvb2tNb2QgZnJvbSAnLi4vbGlmZWN5Y2xlL2xpZmVjeWNsZV9hbm5vdGF0aW9ucyc7XG5pbXBvcnQge2hhc0xpZmVjeWNsZUhvb2t9IGZyb20gJy4uL2xpZmVjeWNsZS9yb3V0ZV9saWZlY3ljbGVfcmVmbGVjdG9yJztcbmltcG9ydCB7T25BY3RpdmF0ZSwgQ2FuUmV1c2UsIE9uUmV1c2UsIE9uRGVhY3RpdmF0ZSwgQ2FuRGVhY3RpdmF0ZX0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5cbmxldCBfcmVzb2x2ZVRvVHJ1ZSA9IFByb21pc2VXcmFwcGVyLnJlc29sdmUodHJ1ZSk7XG5cbi8qKlxuICogQSByb3V0ZXIgb3V0bGV0IGlzIGEgcGxhY2Vob2xkZXIgdGhhdCBBbmd1bGFyIGR5bmFtaWNhbGx5IGZpbGxzIGJhc2VkIG9uIHRoZSBhcHBsaWNhdGlvbidzIHJvdXRlLlxuICpcbiAqICMjIFVzZVxuICpcbiAqIGBgYFxuICogPHJvdXRlci1vdXRsZXQ+PC9yb3V0ZXItb3V0bGV0PlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAncm91dGVyLW91dGxldCd9KVxuZXhwb3J0IGNsYXNzIFJvdXRlck91dGxldCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIG5hbWU6IHN0cmluZyA9IG51bGw7XG4gIHByaXZhdGUgX2NvbXBvbmVudFJlZjogUHJvbWlzZTxDb21wb25lbnRSZWY+ID0gbnVsbDtcbiAgcHJpdmF0ZSBfY3VycmVudEluc3RydWN0aW9uOiBDb21wb25lbnRJbnN0cnVjdGlvbiA9IG51bGw7XG5cbiAgQE91dHB1dCgnYWN0aXZhdGUnKSBwdWJsaWMgYWN0aXZhdGVFdmVudHMgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIF9sb2FkZXI6IER5bmFtaWNDb21wb25lbnRMb2FkZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3BhcmVudFJvdXRlcjogcm91dGVyTW9kLlJvdXRlciwgQEF0dHJpYnV0ZSgnbmFtZScpIG5hbWVBdHRyOiBzdHJpbmcpIHtcbiAgICBpZiAoaXNQcmVzZW50KG5hbWVBdHRyKSkge1xuICAgICAgdGhpcy5uYW1lID0gbmFtZUF0dHI7XG4gICAgICB0aGlzLl9wYXJlbnRSb3V0ZXIucmVnaXN0ZXJBdXhPdXRsZXQodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3BhcmVudFJvdXRlci5yZWdpc3RlclByaW1hcnlPdXRsZXQodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCBieSB0aGUgUm91dGVyIHRvIGluc3RhbnRpYXRlIGEgbmV3IGNvbXBvbmVudCBkdXJpbmcgdGhlIGNvbW1pdCBwaGFzZSBvZiBhIG5hdmlnYXRpb24uXG4gICAqIFRoaXMgbWV0aG9kIGluIHR1cm4gaXMgcmVzcG9uc2libGUgZm9yIGNhbGxpbmcgdGhlIGByb3V0ZXJPbkFjdGl2YXRlYCBob29rIG9mIGl0cyBjaGlsZC5cbiAgICovXG4gIGFjdGl2YXRlKG5leHRJbnN0cnVjdGlvbjogQ29tcG9uZW50SW5zdHJ1Y3Rpb24pOiBQcm9taXNlPGFueT4ge1xuICAgIHZhciBwcmV2aW91c0luc3RydWN0aW9uID0gdGhpcy5fY3VycmVudEluc3RydWN0aW9uO1xuICAgIHRoaXMuX2N1cnJlbnRJbnN0cnVjdGlvbiA9IG5leHRJbnN0cnVjdGlvbjtcbiAgICB2YXIgY29tcG9uZW50VHlwZSA9IG5leHRJbnN0cnVjdGlvbi5jb21wb25lbnRUeXBlO1xuICAgIHZhciBjaGlsZFJvdXRlciA9IHRoaXMuX3BhcmVudFJvdXRlci5jaGlsZFJvdXRlcihjb21wb25lbnRUeXBlKTtcblxuICAgIHZhciBwcm92aWRlcnMgPSBSZWZsZWN0aXZlSW5qZWN0b3IucmVzb2x2ZShbXG4gICAgICBwcm92aWRlKFJvdXRlRGF0YSwge3VzZVZhbHVlOiBuZXh0SW5zdHJ1Y3Rpb24ucm91dGVEYXRhfSksXG4gICAgICBwcm92aWRlKFJvdXRlUGFyYW1zLCB7dXNlVmFsdWU6IG5ldyBSb3V0ZVBhcmFtcyhuZXh0SW5zdHJ1Y3Rpb24ucGFyYW1zKX0pLFxuICAgICAgcHJvdmlkZShyb3V0ZXJNb2QuUm91dGVyLCB7dXNlVmFsdWU6IGNoaWxkUm91dGVyfSlcbiAgICBdKTtcbiAgICB0aGlzLl9jb21wb25lbnRSZWYgPVxuICAgICAgICB0aGlzLl9sb2FkZXIubG9hZE5leHRUb0xvY2F0aW9uKGNvbXBvbmVudFR5cGUsIHRoaXMuX3ZpZXdDb250YWluZXJSZWYsIHByb3ZpZGVycyk7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudFJlZi50aGVuKChjb21wb25lbnRSZWYpID0+IHtcbiAgICAgIHRoaXMuYWN0aXZhdGVFdmVudHMuZW1pdChjb21wb25lbnRSZWYuaW5zdGFuY2UpO1xuICAgICAgaWYgKGhhc0xpZmVjeWNsZUhvb2soaG9va01vZC5yb3V0ZXJPbkFjdGl2YXRlLCBjb21wb25lbnRUeXBlKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29tcG9uZW50UmVmLnRoZW4oXG4gICAgICAgICAgICAocmVmOiBDb21wb25lbnRSZWYpID0+XG4gICAgICAgICAgICAgICAgKDxPbkFjdGl2YXRlPnJlZi5pbnN0YW5jZSkucm91dGVyT25BY3RpdmF0ZShuZXh0SW5zdHJ1Y3Rpb24sIHByZXZpb3VzSW5zdHJ1Y3Rpb24pKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRSZWY7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIGJ5IHRoZSB7QGxpbmsgUm91dGVyfSBkdXJpbmcgdGhlIGNvbW1pdCBwaGFzZSBvZiBhIG5hdmlnYXRpb24gd2hlbiBhbiBvdXRsZXRcbiAgICogcmV1c2VzIGEgY29tcG9uZW50IGJldHdlZW4gZGlmZmVyZW50IHJvdXRlcy5cbiAgICogVGhpcyBtZXRob2QgaW4gdHVybiBpcyByZXNwb25zaWJsZSBmb3IgY2FsbGluZyB0aGUgYHJvdXRlck9uUmV1c2VgIGhvb2sgb2YgaXRzIGNoaWxkLlxuICAgKi9cbiAgcmV1c2UobmV4dEluc3RydWN0aW9uOiBDb21wb25lbnRJbnN0cnVjdGlvbik6IFByb21pc2U8YW55PiB7XG4gICAgdmFyIHByZXZpb3VzSW5zdHJ1Y3Rpb24gPSB0aGlzLl9jdXJyZW50SW5zdHJ1Y3Rpb247XG4gICAgdGhpcy5fY3VycmVudEluc3RydWN0aW9uID0gbmV4dEluc3RydWN0aW9uO1xuXG4gICAgLy8gaXQncyBwb3NzaWJsZSB0aGUgY29tcG9uZW50IGlzIHJlbW92ZWQgYmVmb3JlIGl0IGNhbiBiZSByZWFjdGl2YXRlZCAoaWYgbmVzdGVkIHdpdGhpbmdcbiAgICAvLyBhbm90aGVyIGR5bmFtaWNhbGx5IGxvYWRlZCBjb21wb25lbnQsIGZvciBpbnN0YW5jZSkuIEluIHRoYXQgY2FzZSwgd2Ugc2ltcGx5IGFjdGl2YXRlXG4gICAgLy8gYSBuZXcgb25lLlxuICAgIGlmIChpc0JsYW5rKHRoaXMuX2NvbXBvbmVudFJlZikpIHtcbiAgICAgIHJldHVybiB0aGlzLmFjdGl2YXRlKG5leHRJbnN0cnVjdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBQcm9taXNlV3JhcHBlci5yZXNvbHZlKFxuICAgICAgICAgIGhhc0xpZmVjeWNsZUhvb2soaG9va01vZC5yb3V0ZXJPblJldXNlLCB0aGlzLl9jdXJyZW50SW5zdHJ1Y3Rpb24uY29tcG9uZW50VHlwZSkgP1xuICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRSZWYudGhlbihcbiAgICAgICAgICAgICAgICAgIChyZWY6IENvbXBvbmVudFJlZikgPT5cbiAgICAgICAgICAgICAgICAgICAgICAoPE9uUmV1c2U+cmVmLmluc3RhbmNlKS5yb3V0ZXJPblJldXNlKG5leHRJbnN0cnVjdGlvbiwgcHJldmlvdXNJbnN0cnVjdGlvbikpIDpcbiAgICAgICAgICAgICAgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCBieSB0aGUge0BsaW5rIFJvdXRlcn0gd2hlbiBhbiBvdXRsZXQgZGlzcG9zZXMgb2YgYSBjb21wb25lbnQncyBjb250ZW50cy5cbiAgICogVGhpcyBtZXRob2QgaW4gdHVybiBpcyByZXNwb25zaWJsZSBmb3IgY2FsbGluZyB0aGUgYHJvdXRlck9uRGVhY3RpdmF0ZWAgaG9vayBvZiBpdHMgY2hpbGQuXG4gICAqL1xuICBkZWFjdGl2YXRlKG5leHRJbnN0cnVjdGlvbjogQ29tcG9uZW50SW5zdHJ1Y3Rpb24pOiBQcm9taXNlPGFueT4ge1xuICAgIHZhciBuZXh0ID0gX3Jlc29sdmVUb1RydWU7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl9jb21wb25lbnRSZWYpICYmIGlzUHJlc2VudCh0aGlzLl9jdXJyZW50SW5zdHJ1Y3Rpb24pICYmXG4gICAgICAgIGhhc0xpZmVjeWNsZUhvb2soaG9va01vZC5yb3V0ZXJPbkRlYWN0aXZhdGUsIHRoaXMuX2N1cnJlbnRJbnN0cnVjdGlvbi5jb21wb25lbnRUeXBlKSkge1xuICAgICAgbmV4dCA9IHRoaXMuX2NvbXBvbmVudFJlZi50aGVuKFxuICAgICAgICAgIChyZWY6IENvbXBvbmVudFJlZikgPT5cbiAgICAgICAgICAgICAgKDxPbkRlYWN0aXZhdGU+cmVmLmluc3RhbmNlKVxuICAgICAgICAgICAgICAgICAgLnJvdXRlck9uRGVhY3RpdmF0ZShuZXh0SW5zdHJ1Y3Rpb24sIHRoaXMuX2N1cnJlbnRJbnN0cnVjdGlvbikpO1xuICAgIH1cbiAgICByZXR1cm4gbmV4dC50aGVuKChfKSA9PiB7XG4gICAgICBpZiAoaXNQcmVzZW50KHRoaXMuX2NvbXBvbmVudFJlZikpIHtcbiAgICAgICAgdmFyIG9uRGlzcG9zZSA9IHRoaXMuX2NvbXBvbmVudFJlZi50aGVuKChyZWY6IENvbXBvbmVudFJlZikgPT4gcmVmLmRlc3Ryb3koKSk7XG4gICAgICAgIHRoaXMuX2NvbXBvbmVudFJlZiA9IG51bGw7XG4gICAgICAgIHJldHVybiBvbkRpc3Bvc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIGJ5IHRoZSB7QGxpbmsgUm91dGVyfSBkdXJpbmcgcmVjb2duaXRpb24gcGhhc2Ugb2YgYSBuYXZpZ2F0aW9uLlxuICAgKlxuICAgKiBJZiB0aGlzIHJlc29sdmVzIHRvIGBmYWxzZWAsIHRoZSBnaXZlbiBuYXZpZ2F0aW9uIGlzIGNhbmNlbGxlZC5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZGVsZWdhdGVzIHRvIHRoZSBjaGlsZCBjb21wb25lbnQncyBgcm91dGVyQ2FuRGVhY3RpdmF0ZWAgaG9vayBpZiBpdCBleGlzdHMsXG4gICAqIGFuZCBvdGhlcndpc2UgcmVzb2x2ZXMgdG8gdHJ1ZS5cbiAgICovXG4gIHJvdXRlckNhbkRlYWN0aXZhdGUobmV4dEluc3RydWN0aW9uOiBDb21wb25lbnRJbnN0cnVjdGlvbik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGlmIChpc0JsYW5rKHRoaXMuX2N1cnJlbnRJbnN0cnVjdGlvbikpIHtcbiAgICAgIHJldHVybiBfcmVzb2x2ZVRvVHJ1ZTtcbiAgICB9XG4gICAgaWYgKGhhc0xpZmVjeWNsZUhvb2soaG9va01vZC5yb3V0ZXJDYW5EZWFjdGl2YXRlLCB0aGlzLl9jdXJyZW50SW5zdHJ1Y3Rpb24uY29tcG9uZW50VHlwZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb21wb25lbnRSZWYudGhlbihcbiAgICAgICAgICAocmVmOiBDb21wb25lbnRSZWYpID0+XG4gICAgICAgICAgICAgICg8Q2FuRGVhY3RpdmF0ZT5yZWYuaW5zdGFuY2UpXG4gICAgICAgICAgICAgICAgICAucm91dGVyQ2FuRGVhY3RpdmF0ZShuZXh0SW5zdHJ1Y3Rpb24sIHRoaXMuX2N1cnJlbnRJbnN0cnVjdGlvbikpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gX3Jlc29sdmVUb1RydWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCBieSB0aGUge0BsaW5rIFJvdXRlcn0gZHVyaW5nIHJlY29nbml0aW9uIHBoYXNlIG9mIGEgbmF2aWdhdGlvbi5cbiAgICpcbiAgICogSWYgdGhlIG5ldyBjaGlsZCBjb21wb25lbnQgaGFzIGEgZGlmZmVyZW50IFR5cGUgdGhhbiB0aGUgZXhpc3RpbmcgY2hpbGQgY29tcG9uZW50LFxuICAgKiB0aGlzIHdpbGwgcmVzb2x2ZSB0byBgZmFsc2VgLiBZb3UgY2FuJ3QgcmV1c2UgYW4gb2xkIGNvbXBvbmVudCB3aGVuIHRoZSBuZXcgY29tcG9uZW50XG4gICAqIGlzIG9mIGEgZGlmZmVyZW50IFR5cGUuXG4gICAqXG4gICAqIE90aGVyd2lzZSwgdGhpcyBtZXRob2QgZGVsZWdhdGVzIHRvIHRoZSBjaGlsZCBjb21wb25lbnQncyBgcm91dGVyQ2FuUmV1c2VgIGhvb2sgaWYgaXQgZXhpc3RzLFxuICAgKiBvciByZXNvbHZlcyB0byB0cnVlIGlmIHRoZSBob29rIGlzIG5vdCBwcmVzZW50LlxuICAgKi9cbiAgcm91dGVyQ2FuUmV1c2UobmV4dEluc3RydWN0aW9uOiBDb21wb25lbnRJbnN0cnVjdGlvbik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHZhciByZXN1bHQ7XG5cbiAgICBpZiAoaXNCbGFuayh0aGlzLl9jdXJyZW50SW5zdHJ1Y3Rpb24pIHx8XG4gICAgICAgIHRoaXMuX2N1cnJlbnRJbnN0cnVjdGlvbi5jb21wb25lbnRUeXBlICE9IG5leHRJbnN0cnVjdGlvbi5jb21wb25lbnRUeXBlKSB7XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGhhc0xpZmVjeWNsZUhvb2soaG9va01vZC5yb3V0ZXJDYW5SZXVzZSwgdGhpcy5fY3VycmVudEluc3RydWN0aW9uLmNvbXBvbmVudFR5cGUpKSB7XG4gICAgICByZXN1bHQgPSB0aGlzLl9jb21wb25lbnRSZWYudGhlbihcbiAgICAgICAgICAocmVmOiBDb21wb25lbnRSZWYpID0+XG4gICAgICAgICAgICAgICg8Q2FuUmV1c2U+cmVmLmluc3RhbmNlKS5yb3V0ZXJDYW5SZXVzZShuZXh0SW5zdHJ1Y3Rpb24sIHRoaXMuX2N1cnJlbnRJbnN0cnVjdGlvbikpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSBuZXh0SW5zdHJ1Y3Rpb24gPT0gdGhpcy5fY3VycmVudEluc3RydWN0aW9uIHx8XG4gICAgICAgICAgICAgICAoaXNQcmVzZW50KG5leHRJbnN0cnVjdGlvbi5wYXJhbXMpICYmIGlzUHJlc2VudCh0aGlzLl9jdXJyZW50SW5zdHJ1Y3Rpb24ucGFyYW1zKSAmJlxuICAgICAgICAgICAgICAgIFN0cmluZ01hcFdyYXBwZXIuZXF1YWxzKG5leHRJbnN0cnVjdGlvbi5wYXJhbXMsIHRoaXMuX2N1cnJlbnRJbnN0cnVjdGlvbi5wYXJhbXMpKTtcbiAgICB9XG4gICAgcmV0dXJuIDxQcm9taXNlPGJvb2xlYW4+PlByb21pc2VXcmFwcGVyLnJlc29sdmUocmVzdWx0KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQgeyB0aGlzLl9wYXJlbnRSb3V0ZXIudW5yZWdpc3RlclByaW1hcnlPdXRsZXQodGhpcyk7IH1cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
