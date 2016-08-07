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
                function RouterOutlet(_elementRef, _loader, _parentRouter, nameAttr) {
                    this._elementRef = _elementRef;
                    this._loader = _loader;
                    this._parentRouter = _parentRouter;
                    this.name = null;
                    this._componentRef = null;
                    this._currentInstruction = null;
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
                    var providers = core_1.Injector.resolve([
                        core_1.provide(instruction_1.RouteData, { useValue: nextInstruction.routeData }),
                        core_1.provide(instruction_1.RouteParams, { useValue: new instruction_1.RouteParams(nextInstruction.params) }),
                        core_1.provide(routerMod.Router, { useValue: childRouter })
                    ]);
                    this._componentRef =
                        this._loader.loadNextToLocation(componentType, this._elementRef, providers);
                    return this._componentRef.then(function (componentRef) {
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
                            var onDispose = _this._componentRef.then(function (ref) { return ref.dispose(); });
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
                RouterOutlet = __decorate([
                    core_1.Directive({ selector: 'router-outlet' }),
                    __param(3, core_1.Attribute('name')), 
                    __metadata('design:paramtypes', [core_1.ElementRef, core_1.DynamicComponentLoader, routerMod.Router, String])
                ], RouterOutlet);
                return RouterOutlet;
            }());
            exports_1("RouterOutlet", RouterOutlet);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9kaXJlY3RpdmVzL3JvdXRlcl9vdXRsZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztRQXNCSSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBQWQsY0FBYyxHQUFHLHNCQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRWxEOzs7Ozs7OztlQVFHO1lBRUg7Z0JBS0Usc0JBQW9CLFdBQXVCLEVBQVUsT0FBK0IsRUFDaEUsYUFBK0IsRUFBcUIsUUFBZ0I7b0JBRHBFLGdCQUFXLEdBQVgsV0FBVyxDQUFZO29CQUFVLFlBQU8sR0FBUCxPQUFPLENBQXdCO29CQUNoRSxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7b0JBTG5ELFNBQUksR0FBVyxJQUFJLENBQUM7b0JBQ1osa0JBQWEsR0FBMEIsSUFBSSxDQUFDO29CQUM1Qyx3QkFBbUIsR0FBeUIsSUFBSSxDQUFDO29CQUl2RCxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7d0JBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzdDLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDakQsQ0FBQztnQkFDSCxDQUFDO2dCQUVEOzs7bUJBR0c7Z0JBQ0gsK0JBQVEsR0FBUixVQUFTLGVBQXFDO29CQUE5QyxpQkFzQkM7b0JBckJDLElBQUksbUJBQW1CLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDO29CQUNuRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsZUFBZSxDQUFDO29CQUMzQyxJQUFJLGFBQWEsR0FBRyxlQUFlLENB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c0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBNUkzRTtvQkFBQyxnQkFBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLGVBQWUsRUFBQyxDQUFDOytCQU9pQixnQkFBUyxDQUFDLE1BQU0sQ0FBQztpSEFBMUIsTUFBTTtnQ0FQZDtnQkE2SXZDLG1CQUFDO1lBQUQsQ0E1SUEsQUE0SUMsSUFBQTtZQTVJRCx1Q0E0SUMsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvZGlyZWN0aXZlcy9yb3V0ZXJfb3V0bGV0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQcm9taXNlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5pbXBvcnQge1N0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge2lzQmxhbmssIGlzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBBdHRyaWJ1dGUsXG4gIER5bmFtaWNDb21wb25lbnRMb2FkZXIsXG4gIENvbXBvbmVudFJlZixcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0b3IsXG4gIHByb3ZpZGUsXG4gIERlcGVuZGVuY3ksXG4gIE9uRGVzdHJveVxufSBmcm9tICdhbmd1bGFyMi9jb3JlJztcblxuaW1wb3J0ICogYXMgcm91dGVyTW9kIGZyb20gJy4uL3JvdXRlcic7XG5pbXBvcnQge0NvbXBvbmVudEluc3RydWN0aW9uLCBSb3V0ZVBhcmFtcywgUm91dGVEYXRhfSBmcm9tICcuLi9pbnN0cnVjdGlvbic7XG5pbXBvcnQgKiBhcyBob29rTW9kIGZyb20gJy4uL2xpZmVjeWNsZS9saWZlY3ljbGVfYW5ub3RhdGlvbnMnO1xuaW1wb3J0IHtoYXNMaWZlY3ljbGVIb29rfSBmcm9tICcuLi9saWZlY3ljbGUvcm91dGVfbGlmZWN5Y2xlX3JlZmxlY3Rvcic7XG5pbXBvcnQge09uQWN0aXZhdGUsIENhblJldXNlLCBPblJldXNlLCBPbkRlYWN0aXZhdGUsIENhbkRlYWN0aXZhdGV9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuXG5sZXQgX3Jlc29sdmVUb1RydWUgPSBQcm9taXNlV3JhcHBlci5yZXNvbHZlKHRydWUpO1xuXG4vKipcbiAqIEEgcm91dGVyIG91dGxldCBpcyBhIHBsYWNlaG9sZGVyIHRoYXQgQW5ndWxhciBkeW5hbWljYWxseSBmaWxscyBiYXNlZCBvbiB0aGUgYXBwbGljYXRpb24ncyByb3V0ZS5cbiAqXG4gKiAjIyBVc2VcbiAqXG4gKiBgYGBcbiAqIDxyb3V0ZXItb3V0bGV0Pjwvcm91dGVyLW91dGxldD5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ3JvdXRlci1vdXRsZXQnfSlcbmV4cG9ydCBjbGFzcyBSb3V0ZXJPdXRsZXQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBuYW1lOiBzdHJpbmcgPSBudWxsO1xuICBwcml2YXRlIF9jb21wb25lbnRSZWY6IFByb21pc2U8Q29tcG9uZW50UmVmPiA9IG51bGw7XG4gIHByaXZhdGUgX2N1cnJlbnRJbnN0cnVjdGlvbjogQ29tcG9uZW50SW5zdHJ1Y3Rpb24gPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgX2xvYWRlcjogRHluYW1pY0NvbXBvbmVudExvYWRlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfcGFyZW50Um91dGVyOiByb3V0ZXJNb2QuUm91dGVyLCBAQXR0cmlidXRlKCduYW1lJykgbmFtZUF0dHI6IHN0cmluZykge1xuICAgIGlmIChpc1ByZXNlbnQobmFtZUF0dHIpKSB7XG4gICAgICB0aGlzLm5hbWUgPSBuYW1lQXR0cjtcbiAgICAgIHRoaXMuX3BhcmVudFJvdXRlci5yZWdpc3RlckF1eE91dGxldCh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcGFyZW50Um91dGVyLnJlZ2lzdGVyUHJpbWFyeU91dGxldCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIGJ5IHRoZSBSb3V0ZXIgdG8gaW5zdGFudGlhdGUgYSBuZXcgY29tcG9uZW50IGR1cmluZyB0aGUgY29tbWl0IHBoYXNlIG9mIGEgbmF2aWdhdGlvbi5cbiAgICogVGhpcyBtZXRob2QgaW4gdHVybiBpcyByZXNwb25zaWJsZSBmb3IgY2FsbGluZyB0aGUgYHJvdXRlck9uQWN0aXZhdGVgIGhvb2sgb2YgaXRzIGNoaWxkLlxuICAgKi9cbiAgYWN0aXZhdGUobmV4dEluc3RydWN0aW9uOiBDb21wb25lbnRJbnN0cnVjdGlvbik6IFByb21pc2U8YW55PiB7XG4gICAgdmFyIHByZXZpb3VzSW5zdHJ1Y3Rpb24gPSB0aGlzLl9jdXJyZW50SW5zdHJ1Y3Rpb247XG4gICAgdGhpcy5fY3VycmVudEluc3RydWN0aW9uID0gbmV4dEluc3RydWN0aW9uO1xuICAgIHZhciBjb21wb25lbnRUeXBlID0gbmV4dEluc3RydWN0aW9uLmNvbXBvbmVudFR5cGU7XG4gICAgdmFyIGNoaWxkUm91dGVyID0gdGhpcy5fcGFyZW50Um91dGVyLmNoaWxkUm91dGVyKGNvbXBvbmVudFR5cGUpO1xuXG4gICAgdmFyIHByb3ZpZGVycyA9IEluamVjdG9yLnJlc29sdmUoW1xuICAgICAgcHJvdmlkZShSb3V0ZURhdGEsIHt1c2VWYWx1ZTogbmV4dEluc3RydWN0aW9uLnJvdXRlRGF0YX0pLFxuICAgICAgcHJvdmlkZShSb3V0ZVBhcmFtcywge3VzZVZhbHVlOiBuZXcgUm91dGVQYXJhbXMobmV4dEluc3RydWN0aW9uLnBhcmFtcyl9KSxcbiAgICAgIHByb3ZpZGUocm91dGVyTW9kLlJvdXRlciwge3VzZVZhbHVlOiBjaGlsZFJvdXRlcn0pXG4gICAgXSk7XG4gICAgdGhpcy5fY29tcG9uZW50UmVmID1cbiAgICAgICAgdGhpcy5fbG9hZGVyLmxvYWROZXh0VG9Mb2NhdGlvbihjb21wb25lbnRUeXBlLCB0aGlzLl9lbGVtZW50UmVmLCBwcm92aWRlcnMpO1xuICAgIHJldHVybiB0aGlzLl9jb21wb25lbnRSZWYudGhlbigoY29tcG9uZW50UmVmKSA9PiB7XG4gICAgICBpZiAoaGFzTGlmZWN5Y2xlSG9vayhob29rTW9kLnJvdXRlck9uQWN0aXZhdGUsIGNvbXBvbmVudFR5cGUpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wb25lbnRSZWYudGhlbihcbiAgICAgICAgICAgIChyZWY6IENvbXBvbmVudFJlZikgPT5cbiAgICAgICAgICAgICAgICAoPE9uQWN0aXZhdGU+cmVmLmluc3RhbmNlKS5yb3V0ZXJPbkFjdGl2YXRlKG5leHRJbnN0cnVjdGlvbiwgcHJldmlvdXNJbnN0cnVjdGlvbikpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFJlZjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgYnkgdGhlIHtAbGluayBSb3V0ZXJ9IGR1cmluZyB0aGUgY29tbWl0IHBoYXNlIG9mIGEgbmF2aWdhdGlvbiB3aGVuIGFuIG91dGxldFxuICAgKiByZXVzZXMgYSBjb21wb25lbnQgYmV0d2VlbiBkaWZmZXJlbnQgcm91dGVzLlxuICAgKiBUaGlzIG1ldGhvZCBpbiB0dXJuIGlzIHJlc3BvbnNpYmxlIGZvciBjYWxsaW5nIHRoZSBgcm91dGVyT25SZXVzZWAgaG9vayBvZiBpdHMgY2hpbGQuXG4gICAqL1xuICByZXVzZShuZXh0SW5zdHJ1Y3Rpb246IENvbXBvbmVudEluc3RydWN0aW9uKTogUHJvbWlzZTxhbnk+IHtcbiAgICB2YXIgcHJldmlvdXNJbnN0cnVjdGlvbiA9IHRoaXMuX2N1cnJlbnRJbnN0cnVjdGlvbjtcbiAgICB0aGlzLl9jdXJyZW50SW5zdHJ1Y3Rpb24gPSBuZXh0SW5zdHJ1Y3Rpb247XG5cbiAgICAvLyBpdCdzIHBvc3NpYmxlIHRoZSBjb21wb25lbnQgaXMgcmVtb3ZlZCBiZWZvcmUgaXQgY2FuIGJlIHJlYWN0aXZhdGVkIChpZiBuZXN0ZWQgd2l0aGluZ1xuICAgIC8vIGFub3RoZXIgZHluYW1pY2FsbHkgbG9hZGVkIGNvbXBvbmVudCwgZm9yIGluc3RhbmNlKS4gSW4gdGhhdCBjYXNlLCB3ZSBzaW1wbHkgYWN0aXZhdGVcbiAgICAvLyBhIG5ldyBvbmUuXG4gICAgaWYgKGlzQmxhbmsodGhpcy5fY29tcG9uZW50UmVmKSkge1xuICAgICAgcmV0dXJuIHRoaXMuYWN0aXZhdGUobmV4dEluc3RydWN0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFByb21pc2VXcmFwcGVyLnJlc29sdmUoXG4gICAgICAgICAgaGFzTGlmZWN5Y2xlSG9vayhob29rTW9kLnJvdXRlck9uUmV1c2UsIHRoaXMuX2N1cnJlbnRJbnN0cnVjdGlvbi5jb21wb25lbnRUeXBlKSA/XG4gICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFJlZi50aGVuKFxuICAgICAgICAgICAgICAgICAgKHJlZjogQ29tcG9uZW50UmVmKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICg8T25SZXVzZT5yZWYuaW5zdGFuY2UpLnJvdXRlck9uUmV1c2UobmV4dEluc3RydWN0aW9uLCBwcmV2aW91c0luc3RydWN0aW9uKSkgOlxuICAgICAgICAgICAgICB0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIGJ5IHRoZSB7QGxpbmsgUm91dGVyfSB3aGVuIGFuIG91dGxldCBkaXNwb3NlcyBvZiBhIGNvbXBvbmVudCdzIGNvbnRlbnRzLlxuICAgKiBUaGlzIG1ldGhvZCBpbiB0dXJuIGlzIHJlc3BvbnNpYmxlIGZvciBjYWxsaW5nIHRoZSBgcm91dGVyT25EZWFjdGl2YXRlYCBob29rIG9mIGl0cyBjaGlsZC5cbiAgICovXG4gIGRlYWN0aXZhdGUobmV4dEluc3RydWN0aW9uOiBDb21wb25lbnRJbnN0cnVjdGlvbik6IFByb21pc2U8YW55PiB7XG4gICAgdmFyIG5leHQgPSBfcmVzb2x2ZVRvVHJ1ZTtcbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuX2NvbXBvbmVudFJlZikgJiYgaXNQcmVzZW50KHRoaXMuX2N1cnJlbnRJbnN0cnVjdGlvbikgJiZcbiAgICAgICAgaGFzTGlmZWN5Y2xlSG9vayhob29rTW9kLnJvdXRlck9uRGVhY3RpdmF0ZSwgdGhpcy5fY3VycmVudEluc3RydWN0aW9uLmNvbXBvbmVudFR5cGUpKSB7XG4gICAgICBuZXh0ID0gdGhpcy5fY29tcG9uZW50UmVmLnRoZW4oXG4gICAgICAgICAgKHJlZjogQ29tcG9uZW50UmVmKSA9PlxuICAgICAgICAgICAgICAoPE9uRGVhY3RpdmF0ZT5yZWYuaW5zdGFuY2UpXG4gICAgICAgICAgICAgICAgICAucm91dGVyT25EZWFjdGl2YXRlKG5leHRJbnN0cnVjdGlvbiwgdGhpcy5fY3VycmVudEluc3RydWN0aW9uKSk7XG4gICAgfVxuICAgIHJldHVybiBuZXh0LnRoZW4oKF8pID0+IHtcbiAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5fY29tcG9uZW50UmVmKSkge1xuICAgICAgICB2YXIgb25EaXNwb3NlID0gdGhpcy5fY29tcG9uZW50UmVmLnRoZW4oKHJlZjogQ29tcG9uZW50UmVmKSA9PiByZWYuZGlzcG9zZSgpKTtcbiAgICAgICAgdGhpcy5fY29tcG9uZW50UmVmID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIG9uRGlzcG9zZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgYnkgdGhlIHtAbGluayBSb3V0ZXJ9IGR1cmluZyByZWNvZ25pdGlvbiBwaGFzZSBvZiBhIG5hdmlnYXRpb24uXG4gICAqXG4gICAqIElmIHRoaXMgcmVzb2x2ZXMgdG8gYGZhbHNlYCwgdGhlIGdpdmVuIG5hdmlnYXRpb24gaXMgY2FuY2VsbGVkLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBkZWxlZ2F0ZXMgdG8gdGhlIGNoaWxkIGNvbXBvbmVudCdzIGByb3V0ZXJDYW5EZWFjdGl2YXRlYCBob29rIGlmIGl0IGV4aXN0cyxcbiAgICogYW5kIG90aGVyd2lzZSByZXNvbHZlcyB0byB0cnVlLlxuICAgKi9cbiAgcm91dGVyQ2FuRGVhY3RpdmF0ZShuZXh0SW5zdHJ1Y3Rpb246IENvbXBvbmVudEluc3RydWN0aW9uKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKGlzQmxhbmsodGhpcy5fY3VycmVudEluc3RydWN0aW9uKSkge1xuICAgICAgcmV0dXJuIF9yZXNvbHZlVG9UcnVlO1xuICAgIH1cbiAgICBpZiAoaGFzTGlmZWN5Y2xlSG9vayhob29rTW9kLnJvdXRlckNhbkRlYWN0aXZhdGUsIHRoaXMuX2N1cnJlbnRJbnN0cnVjdGlvbi5jb21wb25lbnRUeXBlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudFJlZi50aGVuKFxuICAgICAgICAgIChyZWY6IENvbXBvbmVudFJlZikgPT5cbiAgICAgICAgICAgICAgKDxDYW5EZWFjdGl2YXRlPnJlZi5pbnN0YW5jZSlcbiAgICAgICAgICAgICAgICAgIC5yb3V0ZXJDYW5EZWFjdGl2YXRlKG5leHRJbnN0cnVjdGlvbiwgdGhpcy5fY3VycmVudEluc3RydWN0aW9uKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBfcmVzb2x2ZVRvVHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIGJ5IHRoZSB7QGxpbmsgUm91dGVyfSBkdXJpbmcgcmVjb2duaXRpb24gcGhhc2Ugb2YgYSBuYXZpZ2F0aW9uLlxuICAgKlxuICAgKiBJZiB0aGUgbmV3IGNoaWxkIGNvbXBvbmVudCBoYXMgYSBkaWZmZXJlbnQgVHlwZSB0aGFuIHRoZSBleGlzdGluZyBjaGlsZCBjb21wb25lbnQsXG4gICAqIHRoaXMgd2lsbCByZXNvbHZlIHRvIGBmYWxzZWAuIFlvdSBjYW4ndCByZXVzZSBhbiBvbGQgY29tcG9uZW50IHdoZW4gdGhlIG5ldyBjb21wb25lbnRcbiAgICogaXMgb2YgYSBkaWZmZXJlbnQgVHlwZS5cbiAgICpcbiAgICogT3RoZXJ3aXNlLCB0aGlzIG1ldGhvZCBkZWxlZ2F0ZXMgdG8gdGhlIGNoaWxkIGNvbXBvbmVudCdzIGByb3V0ZXJDYW5SZXVzZWAgaG9vayBpZiBpdCBleGlzdHMsXG4gICAqIG9yIHJlc29sdmVzIHRvIHRydWUgaWYgdGhlIGhvb2sgaXMgbm90IHByZXNlbnQuXG4gICAqL1xuICByb3V0ZXJDYW5SZXVzZShuZXh0SW5zdHJ1Y3Rpb246IENvbXBvbmVudEluc3RydWN0aW9uKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgdmFyIHJlc3VsdDtcblxuICAgIGlmIChpc0JsYW5rKHRoaXMuX2N1cnJlbnRJbnN0cnVjdGlvbikgfHxcbiAgICAgICAgdGhpcy5fY3VycmVudEluc3RydWN0aW9uLmNvbXBvbmVudFR5cGUgIT0gbmV4dEluc3RydWN0aW9uLmNvbXBvbmVudFR5cGUpIHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoaGFzTGlmZWN5Y2xlSG9vayhob29rTW9kLnJvdXRlckNhblJldXNlLCB0aGlzLl9jdXJyZW50SW5zdHJ1Y3Rpb24uY29tcG9uZW50VHlwZSkpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuX2NvbXBvbmVudFJlZi50aGVuKFxuICAgICAgICAgIChyZWY6IENvbXBvbmVudFJlZikgPT5cbiAgICAgICAgICAgICAgKDxDYW5SZXVzZT5yZWYuaW5zdGFuY2UpLnJvdXRlckNhblJldXNlKG5leHRJbnN0cnVjdGlvbiwgdGhpcy5fY3VycmVudEluc3RydWN0aW9uKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IG5leHRJbnN0cnVjdGlvbiA9PSB0aGlzLl9jdXJyZW50SW5zdHJ1Y3Rpb24gfHxcbiAgICAgICAgICAgICAgIChpc1ByZXNlbnQobmV4dEluc3RydWN0aW9uLnBhcmFtcykgJiYgaXNQcmVzZW50KHRoaXMuX2N1cnJlbnRJbnN0cnVjdGlvbi5wYXJhbXMpICYmXG4gICAgICAgICAgICAgICAgU3RyaW5nTWFwV3JhcHBlci5lcXVhbHMobmV4dEluc3RydWN0aW9uLnBhcmFtcywgdGhpcy5fY3VycmVudEluc3RydWN0aW9uLnBhcmFtcykpO1xuICAgIH1cbiAgICByZXR1cm4gPFByb21pc2U8Ym9vbGVhbj4+UHJvbWlzZVdyYXBwZXIucmVzb2x2ZShyZXN1bHQpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7IHRoaXMuX3BhcmVudFJvdXRlci51bnJlZ2lzdGVyUHJpbWFyeU91dGxldCh0aGlzKTsgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
