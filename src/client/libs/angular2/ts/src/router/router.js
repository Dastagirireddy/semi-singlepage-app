System.register(['angular2/src/facade/async', 'angular2/src/facade/collection', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/core', './route_registry', './location/location', './lifecycle/route_lifecycle_reflector'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var async_1, collection_1, lang_1, exceptions_1, core_1, route_registry_1, location_1, route_lifecycle_reflector_1;
    var _resolveToTrue, _resolveToFalse, Router, RootRouter, ChildRouter;
    function canActivateOne(nextInstruction, prevInstruction) {
        var next = _resolveToTrue;
        if (lang_1.isBlank(nextInstruction.component)) {
            return next;
        }
        if (lang_1.isPresent(nextInstruction.child)) {
            next = canActivateOne(nextInstruction.child, lang_1.isPresent(prevInstruction) ? prevInstruction.child : null);
        }
        return next.then(function (result) {
            if (result == false) {
                return false;
            }
            if (nextInstruction.component.reuse) {
                return true;
            }
            var hook = route_lifecycle_reflector_1.getCanActivateHook(nextInstruction.component.componentType);
            if (lang_1.isPresent(hook)) {
                return hook(nextInstruction.component, lang_1.isPresent(prevInstruction) ? prevInstruction.component : null);
            }
            return true;
        });
    }
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
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (route_registry_1_1) {
                route_registry_1 = route_registry_1_1;
            },
            function (location_1_1) {
                location_1 = location_1_1;
            },
            function (route_lifecycle_reflector_1_1) {
                route_lifecycle_reflector_1 = route_lifecycle_reflector_1_1;
            }],
        execute: function() {
            _resolveToTrue = async_1.PromiseWrapper.resolve(true);
            _resolveToFalse = async_1.PromiseWrapper.resolve(false);
            /**
             * The `Router` is responsible for mapping URLs to components.
             *
             * You can see the state of the router by inspecting the read-only field `router.navigating`.
             * This may be useful for showing a spinner, for instance.
             *
             * ## Concepts
             *
             * Routers and component instances have a 1:1 correspondence.
             *
             * The router holds reference to a number of {@link RouterOutlet}.
             * An outlet is a placeholder that the router dynamically fills in depending on the current URL.
             *
             * When the router navigates from a URL, it must first recognize it and serialize it into an
             * `Instruction`.
             * The router uses the `RouteRegistry` to get an `Instruction`.
             */
            Router = (function () {
                function Router(registry, parent, hostComponent, root) {
                    this.registry = registry;
                    this.parent = parent;
                    this.hostComponent = hostComponent;
                    this.root = root;
                    this.navigating = false;
                    /**
                     * The current `Instruction` for the router
                     */
                    this.currentInstruction = null;
                    this._currentNavigation = _resolveToTrue;
                    this._outlet = null;
                    this._auxRouters = new collection_1.Map();
                    this._subject = new async_1.EventEmitter();
                }
                /**
                 * Constructs a child router. You probably don't need to use this unless you're writing a reusable
                 * component.
                 */
                Router.prototype.childRouter = function (hostComponent) {
                    return this._childRouter = new ChildRouter(this, hostComponent);
                };
                /**
                 * Constructs a child router. You probably don't need to use this unless you're writing a reusable
                 * component.
                 */
                Router.prototype.auxRouter = function (hostComponent) { return new ChildRouter(this, hostComponent); };
                /**
                 * Register an outlet to be notified of primary route changes.
                 *
                 * You probably don't need to use this unless you're writing a reusable component.
                 */
                Router.prototype.registerPrimaryOutlet = function (outlet) {
                    if (lang_1.isPresent(outlet.name)) {
                        throw new exceptions_1.BaseException("registerPrimaryOutlet expects to be called with an unnamed outlet.");
                    }
                    if (lang_1.isPresent(this._outlet)) {
                        throw new exceptions_1.BaseException("Primary outlet is already registered.");
                    }
                    this._outlet = outlet;
                    if (lang_1.isPresent(this.currentInstruction)) {
                        return this.commit(this.currentInstruction, false);
                    }
                    return _resolveToTrue;
                };
                /**
                 * Unregister an outlet (because it was destroyed, etc).
                 *
                 * You probably don't need to use this unless you're writing a custom outlet implementation.
                 */
                Router.prototype.unregisterPrimaryOutlet = function (outlet) {
                    if (lang_1.isPresent(outlet.name)) {
                        throw new exceptions_1.BaseException("registerPrimaryOutlet expects to be called with an unnamed outlet.");
                    }
                    this._outlet = null;
                };
                /**
                 * Register an outlet to notified of auxiliary route changes.
                 *
                 * You probably don't need to use this unless you're writing a reusable component.
                 */
                Router.prototype.registerAuxOutlet = function (outlet) {
                    var outletName = outlet.name;
                    if (lang_1.isBlank(outletName)) {
                        throw new exceptions_1.BaseException("registerAuxOutlet expects to be called with an outlet with a name.");
                    }
                    var router = this.auxRouter(this.hostComponent);
                    this._auxRouters.set(outletName, router);
                    router._outlet = outlet;
                    var auxInstruction;
                    if (lang_1.isPresent(this.currentInstruction) &&
                        lang_1.isPresent(auxInstruction = this.currentInstruction.auxInstruction[outletName])) {
                        return router.commit(auxInstruction);
                    }
                    return _resolveToTrue;
                };
                /**
                 * Given an instruction, returns `true` if the instruction is currently active,
                 * otherwise `false`.
                 */
                Router.prototype.isRouteActive = function (instruction) {
                    var router = this;
                    while (lang_1.isPresent(router.parent) && lang_1.isPresent(instruction.child)) {
                        router = router.parent;
                        instruction = instruction.child;
                    }
                    return lang_1.isPresent(this.currentInstruction) &&
                        this.currentInstruction.component == instruction.component;
                };
                /**
                 * Dynamically update the routing configuration and trigger a navigation.
                 *
                 * ### Usage
                 *
                 * ```
                 * router.config([
                 *   { 'path': '/', 'component': IndexComp },
                 *   { 'path': '/user/:id', 'component': UserComp },
                 * ]);
                 * ```
                 */
                Router.prototype.config = function (definitions) {
                    var _this = this;
                    definitions.forEach(function (routeDefinition) { _this.registry.config(_this.hostComponent, routeDefinition); });
                    return this.renavigate();
                };
                /**
                 * Navigate based on the provided Route Link DSL. It's preferred to navigate with this method
                 * over `navigateByUrl`.
                 *
                 * ### Usage
                 *
                 * This method takes an array representing the Route Link DSL:
                 * ```
                 * ['./MyCmp', {param: 3}]
                 * ```
                 * See the {@link RouterLink} directive for more.
                 */
                Router.prototype.navigate = function (linkParams) {
                    var instruction = this.generate(linkParams);
                    return this.navigateByInstruction(instruction, false);
                };
                /**
                 * Navigate to a URL. Returns a promise that resolves when navigation is complete.
                 * It's preferred to navigate with `navigate` instead of this method, since URLs are more brittle.
                 *
                 * If the given URL begins with a `/`, router will navigate absolutely.
                 * If the given URL does not begin with `/`, the router will navigate relative to this component.
                 */
                Router.prototype.navigateByUrl = function (url, _skipLocationChange) {
                    var _this = this;
                    if (_skipLocationChange === void 0) { _skipLocationChange = false; }
                    return this._currentNavigation = this._currentNavigation.then(function (_) {
                        _this.lastNavigationAttempt = url;
                        _this._startNavigating();
                        return _this._afterPromiseFinishNavigating(_this.recognize(url).then(function (instruction) {
                            if (lang_1.isBlank(instruction)) {
                                return false;
                            }
                            return _this._navigate(instruction, _skipLocationChange);
                        }));
                    });
                };
                /**
                 * Navigate via the provided instruction. Returns a promise that resolves when navigation is
                 * complete.
                 */
                Router.prototype.navigateByInstruction = function (instruction, _skipLocationChange) {
                    var _this = this;
                    if (_skipLocationChange === void 0) { _skipLocationChange = false; }
                    if (lang_1.isBlank(instruction)) {
                        return _resolveToFalse;
                    }
                    return this._currentNavigation = this._currentNavigation.then(function (_) {
                        _this._startNavigating();
                        return _this._afterPromiseFinishNavigating(_this._navigate(instruction, _skipLocationChange));
                    });
                };
                /** @internal */
                Router.prototype._settleInstruction = function (instruction) {
                    var _this = this;
                    return instruction.resolveComponent().then(function (_) {
                        var unsettledInstructions = [];
                        if (lang_1.isPresent(instruction.component)) {
                            instruction.component.reuse = false;
                        }
                        if (lang_1.isPresent(instruction.child)) {
                            unsettledInstructions.push(_this._settleInstruction(instruction.child));
                        }
                        collection_1.StringMapWrapper.forEach(instruction.auxInstruction, function (instruction, _) {
                            unsettledInstructions.push(_this._settleInstruction(instruction));
                        });
                        return async_1.PromiseWrapper.all(unsettledInstructions);
                    });
                };
                /** @internal */
                Router.prototype._navigate = function (instruction, _skipLocationChange) {
                    var _this = this;
                    return this._settleInstruction(instruction)
                        .then(function (_) { return _this._routerCanReuse(instruction); })
                        .then(function (_) { return _this._canActivate(instruction); })
                        .then(function (result) {
                        if (!result) {
                            return false;
                        }
                        return _this._routerCanDeactivate(instruction)
                            .then(function (result) {
                            if (result) {
                                return _this.commit(instruction, _skipLocationChange)
                                    .then(function (_) {
                                    _this._emitNavigationFinish(instruction.toRootUrl());
                                    return true;
                                });
                            }
                        });
                    });
                };
                Router.prototype._emitNavigationFinish = function (url) { async_1.ObservableWrapper.callEmit(this._subject, url); };
                Router.prototype._emitNavigationFail = function (url) { async_1.ObservableWrapper.callError(this._subject, url); };
                Router.prototype._afterPromiseFinishNavigating = function (promise) {
                    var _this = this;
                    return async_1.PromiseWrapper.catchError(promise.then(function (_) { return _this._finishNavigating(); }), function (err) {
                        _this._finishNavigating();
                        throw err;
                    });
                };
                /*
                 * Recursively set reuse flags
                 */
                /** @internal */
                Router.prototype._routerCanReuse = function (instruction) {
                    var _this = this;
                    if (lang_1.isBlank(this._outlet)) {
                        return _resolveToFalse;
                    }
                    if (lang_1.isBlank(instruction.component)) {
                        return _resolveToTrue;
                    }
                    return this._outlet.routerCanReuse(instruction.component)
                        .then(function (result) {
                        instruction.component.reuse = result;
                        if (result && lang_1.isPresent(_this._childRouter) && lang_1.isPresent(instruction.child)) {
                            return _this._childRouter._routerCanReuse(instruction.child);
                        }
                    });
                };
                Router.prototype._canActivate = function (nextInstruction) {
                    return canActivateOne(nextInstruction, this.currentInstruction);
                };
                Router.prototype._routerCanDeactivate = function (instruction) {
                    var _this = this;
                    if (lang_1.isBlank(this._outlet)) {
                        return _resolveToTrue;
                    }
                    var next;
                    var childInstruction = null;
                    var reuse = false;
                    var componentInstruction = null;
                    if (lang_1.isPresent(instruction)) {
                        childInstruction = instruction.child;
                        componentInstruction = instruction.component;
                        reuse = lang_1.isBlank(instruction.component) || instruction.component.reuse;
                    }
                    if (reuse) {
                        next = _resolveToTrue;
                    }
                    else {
                        next = this._outlet.routerCanDeactivate(componentInstruction);
                    }
                    // TODO: aux route lifecycle hooks
                    return next.then(function (result) {
                        if (result == false) {
                            return false;
                        }
                        if (lang_1.isPresent(_this._childRouter)) {
                            return _this._childRouter._routerCanDeactivate(childInstruction);
                        }
                        return true;
                    });
                };
                /**
                 * Updates this router and all descendant routers according to the given instruction
                 */
                Router.prototype.commit = function (instruction, _skipLocationChange) {
                    var _this = this;
                    if (_skipLocationChange === void 0) { _skipLocationChange = false; }
                    this.currentInstruction = instruction;
                    var next = _resolveToTrue;
                    if (lang_1.isPresent(this._outlet) && lang_1.isPresent(instruction.component)) {
                        var componentInstruction = instruction.component;
                        if (componentInstruction.reuse) {
                            next = this._outlet.reuse(componentInstruction);
                        }
                        else {
                            next =
                                this.deactivate(instruction).then(function (_) { return _this._outlet.activate(componentInstruction); });
                        }
                        if (lang_1.isPresent(instruction.child)) {
                            next = next.then(function (_) {
                                if (lang_1.isPresent(_this._childRouter)) {
                                    return _this._childRouter.commit(instruction.child);
                                }
                            });
                        }
                    }
                    var promises = [];
                    this._auxRouters.forEach(function (router, name) {
                        if (lang_1.isPresent(instruction.auxInstruction[name])) {
                            promises.push(router.commit(instruction.auxInstruction[name]));
                        }
                    });
                    return next.then(function (_) { return async_1.PromiseWrapper.all(promises); });
                };
                /** @internal */
                Router.prototype._startNavigating = function () { this.navigating = true; };
                /** @internal */
                Router.prototype._finishNavigating = function () { this.navigating = false; };
                /**
                 * Subscribe to URL updates from the router
                 */
                Router.prototype.subscribe = function (onNext, onError) {
                    return async_1.ObservableWrapper.subscribe(this._subject, onNext, onError);
                };
                /**
                 * Removes the contents of this router's outlet and all descendant outlets
                 */
                Router.prototype.deactivate = function (instruction) {
                    var _this = this;
                    var childInstruction = null;
                    var componentInstruction = null;
                    if (lang_1.isPresent(instruction)) {
                        childInstruction = instruction.child;
                        componentInstruction = instruction.component;
                    }
                    var next = _resolveToTrue;
                    if (lang_1.isPresent(this._childRouter)) {
                        next = this._childRouter.deactivate(childInstruction);
                    }
                    if (lang_1.isPresent(this._outlet)) {
                        next = next.then(function (_) { return _this._outlet.deactivate(componentInstruction); });
                    }
                    // TODO: handle aux routes
                    return next;
                };
                /**
                 * Given a URL, returns an instruction representing the component graph
                 */
                Router.prototype.recognize = function (url) {
                    var ancestorComponents = this._getAncestorInstructions();
                    return this.registry.recognize(url, ancestorComponents);
                };
                Router.prototype._getAncestorInstructions = function () {
                    var ancestorInstructions = [this.currentInstruction];
                    var ancestorRouter = this;
                    while (lang_1.isPresent(ancestorRouter = ancestorRouter.parent)) {
                        ancestorInstructions.unshift(ancestorRouter.currentInstruction);
                    }
                    return ancestorInstructions;
                };
                /**
                 * Navigates to either the last URL successfully navigated to, or the last URL requested if the
                 * router has yet to successfully navigate.
                 */
                Router.prototype.renavigate = function () {
                    if (lang_1.isBlank(this.lastNavigationAttempt)) {
                        return this._currentNavigation;
                    }
                    return this.navigateByUrl(this.lastNavigationAttempt);
                };
                /**
                 * Generate an `Instruction` based on the provided Route Link DSL.
                 */
                Router.prototype.generate = function (linkParams) {
                    var ancestorInstructions = this._getAncestorInstructions();
                    return this.registry.generate(linkParams, ancestorInstructions);
                };
                Router = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [route_registry_1.RouteRegistry, Router, Object, Router])
                ], Router);
                return Router;
            }());
            exports_1("Router", Router);
            RootRouter = (function (_super) {
                __extends(RootRouter, _super);
                function RootRouter(registry, location, primaryComponent) {
                    var _this = this;
                    _super.call(this, registry, null, primaryComponent);
                    this.root = this;
                    this._location = location;
                    this._locationSub = this._location.subscribe(function (change) {
                        // we call recognize ourselves
                        _this.recognize(change['url'])
                            .then(function (instruction) {
                            if (lang_1.isPresent(instruction)) {
                                _this.navigateByInstruction(instruction, lang_1.isPresent(change['pop']))
                                    .then(function (_) {
                                    // this is a popstate event; no need to change the URL
                                    if (lang_1.isPresent(change['pop']) && change['type'] != 'hashchange') {
                                        return;
                                    }
                                    var emitPath = instruction.toUrlPath();
                                    var emitQuery = instruction.toUrlQuery();
                                    if (emitPath.length > 0 && emitPath[0] != '/') {
                                        emitPath = '/' + emitPath;
                                    }
                                    // Because we've opted to use All hashchange events occur outside Angular.
                                    // However, apps that are migrating might have hash links that operate outside
                                    // angular to which routing must respond.
                                    // To support these cases where we respond to hashchanges and redirect as a
                                    // result, we need to replace the top item on the stack.
                                    if (change['type'] == 'hashchange') {
                                        if (instruction.toRootUrl() != _this._location.path()) {
                                            _this._location.replaceState(emitPath, emitQuery);
                                        }
                                    }
                                    else {
                                        _this._location.go(emitPath, emitQuery);
                                    }
                                });
                            }
                            else {
                                _this._emitNavigationFail(change['url']);
                            }
                        });
                    });
                    this.registry.configFromComponent(primaryComponent);
                    this.navigateByUrl(location.path());
                }
                RootRouter.prototype.commit = function (instruction, _skipLocationChange) {
                    var _this = this;
                    if (_skipLocationChange === void 0) { _skipLocationChange = false; }
                    var emitPath = instruction.toUrlPath();
                    var emitQuery = instruction.toUrlQuery();
                    if (emitPath.length > 0 && emitPath[0] != '/') {
                        emitPath = '/' + emitPath;
                    }
                    var promise = _super.prototype.commit.call(this, instruction);
                    if (!_skipLocationChange) {
                        promise = promise.then(function (_) { _this._location.go(emitPath, emitQuery); });
                    }
                    return promise;
                };
                RootRouter.prototype.dispose = function () {
                    if (lang_1.isPresent(this._locationSub)) {
                        async_1.ObservableWrapper.dispose(this._locationSub);
                        this._locationSub = null;
                    }
                };
                RootRouter = __decorate([
                    core_1.Injectable(),
                    __param(2, core_1.Inject(route_registry_1.ROUTER_PRIMARY_COMPONENT)), 
                    __metadata('design:paramtypes', [route_registry_1.RouteRegistry, location_1.Location, lang_1.Type])
                ], RootRouter);
                return RootRouter;
            }(Router));
            exports_1("RootRouter", RootRouter);
            ChildRouter = (function (_super) {
                __extends(ChildRouter, _super);
                function ChildRouter(parent, hostComponent) {
                    _super.call(this, parent.registry, parent, hostComponent, parent.root);
                    this.parent = parent;
                }
                ChildRouter.prototype.navigateByUrl = function (url, _skipLocationChange) {
                    if (_skipLocationChange === void 0) { _skipLocationChange = false; }
                    // Delegate navigation to the root router
                    return this.parent.navigateByUrl(url, _skipLocationChange);
                };
                ChildRouter.prototype.navigateByInstruction = function (instruction, _skipLocationChange) {
                    if (_skipLocationChange === void 0) { _skipLocationChange = false; }
                    // Delegate navigation to the root router
                    return this.parent.navigateByInstruction(instruction, _skipLocationChange);
                };
                return ChildRouter;
            }(Router));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9yb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBZ0JJLGNBQWMsRUFDZCxlQUFlO0lBa2dCbkIsd0JBQXdCLGVBQTRCLEVBQzVCLGVBQTRCO1FBQ2xELElBQUksSUFBSSxHQUFHLGNBQWMsQ0FBQztRQUMxQixFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLEdBQUcsY0FBYyxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQ3JCLGdCQUFTLENBQUMsZUFBZSxDQUFDLEdBQUcsZUFBZSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNuRixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQVUsVUFBQyxNQUFlO1lBQ3hDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2YsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNkLENBQUM7WUFDRCxJQUFJLElBQUksR0FBRyw4Q0FBa0IsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3ZFLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQ3pCLGdC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QUM7Z0JBdEVIO29CQUFDLGlCQUFVLEVBQUU7K0JBUUUsYUFBTSxDQUFDLHlDQUF3QixDQUFDOzs4QkFSbEM7Z0JBdUViLGlCQUFDO1lBQUQsQ0F0RUEsQUFzRUMsQ0F0RStCLE1BQU0sR0FzRXJDO1lBdEVELG1DQXNFQyxDQUFBO1lBRUQ7Z0JBQTBCLCtCQUFNO2dCQUM5QixxQkFBWSxNQUFjLEVBQUUsYUFBYTtvQkFDdkMsa0JBQU0sTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDM0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Z0JBQ3ZCLENBQUM7Z0JBR0QsbUNBQWEsR0FBYixVQUFjLEdBQVcsRUFBRSxtQkFBb0M7b0JBQXBDLG1DQUFvQyxHQUFwQywyQkFBb0M7b0JBQzdELHlDQUF5QztvQkFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO2dCQUM3RCxDQUFDO2dCQUVELDJDQUFxQixHQUFyQixVQUFzQixXQUF3QixFQUN4QixtQkFBb0M7b0JBQXBDLG1DQUFvQyxHQUFwQywyQkFBb0M7b0JBQ3hELHlDQUF5QztvQkFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsV0FBVyxFQUFFLG1CQUFtQixDQUFDLENBQUM7Z0JBQzdFLENBQUM7Z0JBQ0gsa0JBQUM7WUFBRCxDQWpCQSxBQWlCQyxDQWpCeUIsTUFBTSxHQWlCL0IiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvcm91dGVyL3JvdXRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UHJvbWlzZVdyYXBwZXIsIEV2ZW50RW1pdHRlciwgT2JzZXJ2YWJsZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYXN5bmMnO1xuaW1wb3J0IHtNYXAsIFN0cmluZ01hcFdyYXBwZXIsIE1hcFdyYXBwZXIsIExpc3RXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtpc0JsYW5rLCBpc1N0cmluZywgaXNQcmVzZW50LCBUeXBlLCBpc0FycmF5fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9uLCBXcmFwcGVkRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuXG5pbXBvcnQge1JvdXRlUmVnaXN0cnksIFJPVVRFUl9QUklNQVJZX0NPTVBPTkVOVH0gZnJvbSAnLi9yb3V0ZV9yZWdpc3RyeSc7XG5pbXBvcnQge1xuICBDb21wb25lbnRJbnN0cnVjdGlvbixcbiAgSW5zdHJ1Y3Rpb24sXG59IGZyb20gJy4vaW5zdHJ1Y3Rpb24nO1xuaW1wb3J0IHtSb3V0ZXJPdXRsZXR9IGZyb20gJy4vZGlyZWN0aXZlcy9yb3V0ZXJfb3V0bGV0JztcbmltcG9ydCB7TG9jYXRpb259IGZyb20gJy4vbG9jYXRpb24vbG9jYXRpb24nO1xuaW1wb3J0IHtnZXRDYW5BY3RpdmF0ZUhvb2t9IGZyb20gJy4vbGlmZWN5Y2xlL3JvdXRlX2xpZmVjeWNsZV9yZWZsZWN0b3InO1xuaW1wb3J0IHtSb3V0ZURlZmluaXRpb259IGZyb20gJy4vcm91dGVfY29uZmlnL3JvdXRlX2NvbmZpZ19pbXBsJztcblxubGV0IF9yZXNvbHZlVG9UcnVlID0gUHJvbWlzZVdyYXBwZXIucmVzb2x2ZSh0cnVlKTtcbmxldCBfcmVzb2x2ZVRvRmFsc2UgPSBQcm9taXNlV3JhcHBlci5yZXNvbHZlKGZhbHNlKTtcblxuLyoqXG4gKiBUaGUgYFJvdXRlcmAgaXMgcmVzcG9uc2libGUgZm9yIG1hcHBpbmcgVVJMcyB0byBjb21wb25lbnRzLlxuICpcbiAqIFlvdSBjYW4gc2VlIHRoZSBzdGF0ZSBvZiB0aGUgcm91dGVyIGJ5IGluc3BlY3RpbmcgdGhlIHJlYWQtb25seSBmaWVsZCBgcm91dGVyLm5hdmlnYXRpbmdgLlxuICogVGhpcyBtYXkgYmUgdXNlZnVsIGZvciBzaG93aW5nIGEgc3Bpbm5lciwgZm9yIGluc3RhbmNlLlxuICpcbiAqICMjIENvbmNlcHRzXG4gKlxuICogUm91dGVycyBhbmQgY29tcG9uZW50IGluc3RhbmNlcyBoYXZlIGEgMToxIGNvcnJlc3BvbmRlbmNlLlxuICpcbiAqIFRoZSByb3V0ZXIgaG9sZHMgcmVmZXJlbmNlIHRvIGEgbnVtYmVyIG9mIHtAbGluayBSb3V0ZXJPdXRsZXR9LlxuICogQW4gb3V0bGV0IGlzIGEgcGxhY2Vob2xkZXIgdGhhdCB0aGUgcm91dGVyIGR5bmFtaWNhbGx5IGZpbGxzIGluIGRlcGVuZGluZyBvbiB0aGUgY3VycmVudCBVUkwuXG4gKlxuICogV2hlbiB0aGUgcm91dGVyIG5hdmlnYXRlcyBmcm9tIGEgVVJMLCBpdCBtdXN0IGZpcnN0IHJlY29nbml6ZSBpdCBhbmQgc2VyaWFsaXplIGl0IGludG8gYW5cbiAqIGBJbnN0cnVjdGlvbmAuXG4gKiBUaGUgcm91dGVyIHVzZXMgdGhlIGBSb3V0ZVJlZ2lzdHJ5YCB0byBnZXQgYW4gYEluc3RydWN0aW9uYC5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJvdXRlciB7XG4gIG5hdmlnYXRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgbGFzdE5hdmlnYXRpb25BdHRlbXB0OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCBgSW5zdHJ1Y3Rpb25gIGZvciB0aGUgcm91dGVyXG4gICAqL1xuICBwdWJsaWMgY3VycmVudEluc3RydWN0aW9uOiBJbnN0cnVjdGlvbiA9IG51bGw7XG5cbiAgcHJpdmF0ZSBfY3VycmVudE5hdmlnYXRpb246IFByb21pc2U8YW55PiA9IF9yZXNvbHZlVG9UcnVlO1xuICBwcml2YXRlIF9vdXRsZXQ6IFJvdXRlck91dGxldCA9IG51bGw7XG5cbiAgcHJpdmF0ZSBfYXV4Um91dGVycyA9IG5ldyBNYXA8c3RyaW5nLCBSb3V0ZXI+KCk7XG4gIHByaXZhdGUgX2NoaWxkUm91dGVyOiBSb3V0ZXI7XG5cbiAgcHJpdmF0ZSBfc3ViamVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVnaXN0cnk6IFJvdXRlUmVnaXN0cnksIHB1YmxpYyBwYXJlbnQ6IFJvdXRlciwgcHVibGljIGhvc3RDb21wb25lbnQ6IGFueSxcbiAgICAgICAgICAgICAgcHVibGljIHJvb3Q/OiBSb3V0ZXIpIHt9XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYSBjaGlsZCByb3V0ZXIuIFlvdSBwcm9iYWJseSBkb24ndCBuZWVkIHRvIHVzZSB0aGlzIHVubGVzcyB5b3UncmUgd3JpdGluZyBhIHJldXNhYmxlXG4gICAqIGNvbXBvbmVudC5cbiAgICovXG4gIGNoaWxkUm91dGVyKGhvc3RDb21wb25lbnQ6IGFueSk6IFJvdXRlciB7XG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkUm91dGVyID0gbmV3IENoaWxkUm91dGVyKHRoaXMsIGhvc3RDb21wb25lbnQpO1xuICB9XG5cblxuICAvKipcbiAgICogQ29uc3RydWN0cyBhIGNoaWxkIHJvdXRlci4gWW91IHByb2JhYmx5IGRvbid0IG5lZWQgdG8gdXNlIHRoaXMgdW5sZXNzIHlvdSdyZSB3cml0aW5nIGEgcmV1c2FibGVcbiAgICogY29tcG9uZW50LlxuICAgKi9cbiAgYXV4Um91dGVyKGhvc3RDb21wb25lbnQ6IGFueSk6IFJvdXRlciB7IHJldHVybiBuZXcgQ2hpbGRSb3V0ZXIodGhpcywgaG9zdENvbXBvbmVudCk7IH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgYW4gb3V0bGV0IHRvIGJlIG5vdGlmaWVkIG9mIHByaW1hcnkgcm91dGUgY2hhbmdlcy5cbiAgICpcbiAgICogWW91IHByb2JhYmx5IGRvbid0IG5lZWQgdG8gdXNlIHRoaXMgdW5sZXNzIHlvdSdyZSB3cml0aW5nIGEgcmV1c2FibGUgY29tcG9uZW50LlxuICAgKi9cbiAgcmVnaXN0ZXJQcmltYXJ5T3V0bGV0KG91dGxldDogUm91dGVyT3V0bGV0KTogUHJvbWlzZTxhbnk+IHtcbiAgICBpZiAoaXNQcmVzZW50KG91dGxldC5uYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYHJlZ2lzdGVyUHJpbWFyeU91dGxldCBleHBlY3RzIHRvIGJlIGNhbGxlZCB3aXRoIGFuIHVubmFtZWQgb3V0bGV0LmApO1xuICAgIH1cblxuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fb3V0bGV0KSkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYFByaW1hcnkgb3V0bGV0IGlzIGFscmVhZHkgcmVnaXN0ZXJlZC5gKTtcbiAgICB9XG5cbiAgICB0aGlzLl9vdXRsZXQgPSBvdXRsZXQ7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLmN1cnJlbnRJbnN0cnVjdGlvbikpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbW1pdCh0aGlzLmN1cnJlbnRJbnN0cnVjdGlvbiwgZmFsc2UpO1xuICAgIH1cbiAgICByZXR1cm4gX3Jlc29sdmVUb1RydWU7XG4gIH1cblxuICAvKipcbiAgICogVW5yZWdpc3RlciBhbiBvdXRsZXQgKGJlY2F1c2UgaXQgd2FzIGRlc3Ryb3llZCwgZXRjKS5cbiAgICpcbiAgICogWW91IHByb2JhYmx5IGRvbid0IG5lZWQgdG8gdXNlIHRoaXMgdW5sZXNzIHlvdSdyZSB3cml0aW5nIGEgY3VzdG9tIG91dGxldCBpbXBsZW1lbnRhdGlvbi5cbiAgICovXG4gIHVucmVnaXN0ZXJQcmltYXJ5T3V0bGV0KG91dGxldDogUm91dGVyT3V0bGV0KTogdm9pZCB7XG4gICAgaWYgKGlzUHJlc2VudChvdXRsZXQubmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGByZWdpc3RlclByaW1hcnlPdXRsZXQgZXhwZWN0cyB0byBiZSBjYWxsZWQgd2l0aCBhbiB1bm5hbWVkIG91dGxldC5gKTtcbiAgICB9XG4gICAgdGhpcy5fb3V0bGV0ID0gbnVsbDtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGFuIG91dGxldCB0byBub3RpZmllZCBvZiBhdXhpbGlhcnkgcm91dGUgY2hhbmdlcy5cbiAgICpcbiAgICogWW91IHByb2JhYmx5IGRvbid0IG5lZWQgdG8gdXNlIHRoaXMgdW5sZXNzIHlvdSdyZSB3cml0aW5nIGEgcmV1c2FibGUgY29tcG9uZW50LlxuICAgKi9cbiAgcmVnaXN0ZXJBdXhPdXRsZXQob3V0bGV0OiBSb3V0ZXJPdXRsZXQpOiBQcm9taXNlPGFueT4ge1xuICAgIHZhciBvdXRsZXROYW1lID0gb3V0bGV0Lm5hbWU7XG4gICAgaWYgKGlzQmxhbmsob3V0bGV0TmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGByZWdpc3RlckF1eE91dGxldCBleHBlY3RzIHRvIGJlIGNhbGxlZCB3aXRoIGFuIG91dGxldCB3aXRoIGEgbmFtZS5gKTtcbiAgICB9XG5cbiAgICB2YXIgcm91dGVyID0gdGhpcy5hdXhSb3V0ZXIodGhpcy5ob3N0Q29tcG9uZW50KTtcblxuICAgIHRoaXMuX2F1eFJvdXRlcnMuc2V0KG91dGxldE5hbWUsIHJvdXRlcik7XG4gICAgcm91dGVyLl9vdXRsZXQgPSBvdXRsZXQ7XG5cbiAgICB2YXIgYXV4SW5zdHJ1Y3Rpb247XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLmN1cnJlbnRJbnN0cnVjdGlvbikgJiZcbiAgICAgICAgaXNQcmVzZW50KGF1eEluc3RydWN0aW9uID0gdGhpcy5jdXJyZW50SW5zdHJ1Y3Rpb24uYXV4SW5zdHJ1Y3Rpb25bb3V0bGV0TmFtZV0pKSB7XG4gICAgICByZXR1cm4gcm91dGVyLmNvbW1pdChhdXhJbnN0cnVjdGlvbik7XG4gICAgfVxuICAgIHJldHVybiBfcmVzb2x2ZVRvVHJ1ZTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEdpdmVuIGFuIGluc3RydWN0aW9uLCByZXR1cm5zIGB0cnVlYCBpZiB0aGUgaW5zdHJ1Y3Rpb24gaXMgY3VycmVudGx5IGFjdGl2ZSxcbiAgICogb3RoZXJ3aXNlIGBmYWxzZWAuXG4gICAqL1xuICBpc1JvdXRlQWN0aXZlKGluc3RydWN0aW9uOiBJbnN0cnVjdGlvbik6IGJvb2xlYW4ge1xuICAgIHZhciByb3V0ZXI6IFJvdXRlciA9IHRoaXM7XG4gICAgd2hpbGUgKGlzUHJlc2VudChyb3V0ZXIucGFyZW50KSAmJiBpc1ByZXNlbnQoaW5zdHJ1Y3Rpb24uY2hpbGQpKSB7XG4gICAgICByb3V0ZXIgPSByb3V0ZXIucGFyZW50O1xuICAgICAgaW5zdHJ1Y3Rpb24gPSBpbnN0cnVjdGlvbi5jaGlsZDtcbiAgICB9XG4gICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmN1cnJlbnRJbnN0cnVjdGlvbikgJiZcbiAgICAgICAgICAgdGhpcy5jdXJyZW50SW5zdHJ1Y3Rpb24uY29tcG9uZW50ID09IGluc3RydWN0aW9uLmNvbXBvbmVudDtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIER5bmFtaWNhbGx5IHVwZGF0ZSB0aGUgcm91dGluZyBjb25maWd1cmF0aW9uIGFuZCB0cmlnZ2VyIGEgbmF2aWdhdGlvbi5cbiAgICpcbiAgICogIyMjIFVzYWdlXG4gICAqXG4gICAqIGBgYFxuICAgKiByb3V0ZXIuY29uZmlnKFtcbiAgICogICB7ICdwYXRoJzogJy8nLCAnY29tcG9uZW50JzogSW5kZXhDb21wIH0sXG4gICAqICAgeyAncGF0aCc6ICcvdXNlci86aWQnLCAnY29tcG9uZW50JzogVXNlckNvbXAgfSxcbiAgICogXSk7XG4gICAqIGBgYFxuICAgKi9cbiAgY29uZmlnKGRlZmluaXRpb25zOiBSb3V0ZURlZmluaXRpb25bXSk6IFByb21pc2U8YW55PiB7XG4gICAgZGVmaW5pdGlvbnMuZm9yRWFjaChcbiAgICAgICAgKHJvdXRlRGVmaW5pdGlvbikgPT4geyB0aGlzLnJlZ2lzdHJ5LmNvbmZpZyh0aGlzLmhvc3RDb21wb25lbnQsIHJvdXRlRGVmaW5pdGlvbik7IH0pO1xuICAgIHJldHVybiB0aGlzLnJlbmF2aWdhdGUoKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIE5hdmlnYXRlIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBSb3V0ZSBMaW5rIERTTC4gSXQncyBwcmVmZXJyZWQgdG8gbmF2aWdhdGUgd2l0aCB0aGlzIG1ldGhvZFxuICAgKiBvdmVyIGBuYXZpZ2F0ZUJ5VXJsYC5cbiAgICpcbiAgICogIyMjIFVzYWdlXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIHRha2VzIGFuIGFycmF5IHJlcHJlc2VudGluZyB0aGUgUm91dGUgTGluayBEU0w6XG4gICAqIGBgYFxuICAgKiBbJy4vTXlDbXAnLCB7cGFyYW06IDN9XVxuICAgKiBgYGBcbiAgICogU2VlIHRoZSB7QGxpbmsgUm91dGVyTGlua30gZGlyZWN0aXZlIGZvciBtb3JlLlxuICAgKi9cbiAgbmF2aWdhdGUobGlua1BhcmFtczogYW55W10pOiBQcm9taXNlPGFueT4ge1xuICAgIHZhciBpbnN0cnVjdGlvbiA9IHRoaXMuZ2VuZXJhdGUobGlua1BhcmFtcyk7XG4gICAgcmV0dXJuIHRoaXMubmF2aWdhdGVCeUluc3RydWN0aW9uKGluc3RydWN0aW9uLCBmYWxzZSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZSB0byBhIFVSTC4gUmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIG5hdmlnYXRpb24gaXMgY29tcGxldGUuXG4gICAqIEl0J3MgcHJlZmVycmVkIHRvIG5hdmlnYXRlIHdpdGggYG5hdmlnYXRlYCBpbnN0ZWFkIG9mIHRoaXMgbWV0aG9kLCBzaW5jZSBVUkxzIGFyZSBtb3JlIGJyaXR0bGUuXG4gICAqXG4gICAqIElmIHRoZSBnaXZlbiBVUkwgYmVnaW5zIHdpdGggYSBgL2AsIHJvdXRlciB3aWxsIG5hdmlnYXRlIGFic29sdXRlbHkuXG4gICAqIElmIHRoZSBnaXZlbiBVUkwgZG9lcyBub3QgYmVnaW4gd2l0aCBgL2AsIHRoZSByb3V0ZXIgd2lsbCBuYXZpZ2F0ZSByZWxhdGl2ZSB0byB0aGlzIGNvbXBvbmVudC5cbiAgICovXG4gIG5hdmlnYXRlQnlVcmwodXJsOiBzdHJpbmcsIF9za2lwTG9jYXRpb25DaGFuZ2U6IGJvb2xlYW4gPSBmYWxzZSk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnROYXZpZ2F0aW9uID0gdGhpcy5fY3VycmVudE5hdmlnYXRpb24udGhlbigoXykgPT4ge1xuICAgICAgdGhpcy5sYXN0TmF2aWdhdGlvbkF0dGVtcHQgPSB1cmw7XG4gICAgICB0aGlzLl9zdGFydE5hdmlnYXRpbmcoKTtcbiAgICAgIHJldHVybiB0aGlzLl9hZnRlclByb21pc2VGaW5pc2hOYXZpZ2F0aW5nKHRoaXMucmVjb2duaXplKHVybCkudGhlbigoaW5zdHJ1Y3Rpb24pID0+IHtcbiAgICAgICAgaWYgKGlzQmxhbmsoaW5zdHJ1Y3Rpb24pKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9uYXZpZ2F0ZShpbnN0cnVjdGlvbiwgX3NraXBMb2NhdGlvbkNoYW5nZSk7XG4gICAgICB9KSk7XG4gICAgfSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZSB2aWEgdGhlIHByb3ZpZGVkIGluc3RydWN0aW9uLiBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gbmF2aWdhdGlvbiBpc1xuICAgKiBjb21wbGV0ZS5cbiAgICovXG4gIG5hdmlnYXRlQnlJbnN0cnVjdGlvbihpbnN0cnVjdGlvbjogSW5zdHJ1Y3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBfc2tpcExvY2F0aW9uQ2hhbmdlOiBib29sZWFuID0gZmFsc2UpOiBQcm9taXNlPGFueT4ge1xuICAgIGlmIChpc0JsYW5rKGluc3RydWN0aW9uKSkge1xuICAgICAgcmV0dXJuIF9yZXNvbHZlVG9GYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnROYXZpZ2F0aW9uID0gdGhpcy5fY3VycmVudE5hdmlnYXRpb24udGhlbigoXykgPT4ge1xuICAgICAgdGhpcy5fc3RhcnROYXZpZ2F0aW5nKCk7XG4gICAgICByZXR1cm4gdGhpcy5fYWZ0ZXJQcm9taXNlRmluaXNoTmF2aWdhdGluZyh0aGlzLl9uYXZpZ2F0ZShpbnN0cnVjdGlvbiwgX3NraXBMb2NhdGlvbkNoYW5nZSkpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc2V0dGxlSW5zdHJ1Y3Rpb24oaW5zdHJ1Y3Rpb246IEluc3RydWN0aW9uKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gaW5zdHJ1Y3Rpb24ucmVzb2x2ZUNvbXBvbmVudCgpLnRoZW4oKF8pID0+IHtcbiAgICAgIHZhciB1bnNldHRsZWRJbnN0cnVjdGlvbnM6IEFycmF5PFByb21pc2U8YW55Pj4gPSBbXTtcblxuICAgICAgaWYgKGlzUHJlc2VudChpbnN0cnVjdGlvbi5jb21wb25lbnQpKSB7XG4gICAgICAgIGluc3RydWN0aW9uLmNvbXBvbmVudC5yZXVzZSA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNQcmVzZW50KGluc3RydWN0aW9uLmNoaWxkKSkge1xuICAgICAgICB1bnNldHRsZWRJbnN0cnVjdGlvbnMucHVzaCh0aGlzLl9zZXR0bGVJbnN0cnVjdGlvbihpbnN0cnVjdGlvbi5jaGlsZCkpO1xuICAgICAgfVxuXG4gICAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2goaW5zdHJ1Y3Rpb24uYXV4SW5zdHJ1Y3Rpb24sIChpbnN0cnVjdGlvbjogSW5zdHJ1Y3Rpb24sIF8pID0+IHtcbiAgICAgICAgdW5zZXR0bGVkSW5zdHJ1Y3Rpb25zLnB1c2godGhpcy5fc2V0dGxlSW5zdHJ1Y3Rpb24oaW5zdHJ1Y3Rpb24pKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIFByb21pc2VXcmFwcGVyLmFsbCh1bnNldHRsZWRJbnN0cnVjdGlvbnMpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfbmF2aWdhdGUoaW5zdHJ1Y3Rpb246IEluc3RydWN0aW9uLCBfc2tpcExvY2F0aW9uQ2hhbmdlOiBib29sZWFuKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fc2V0dGxlSW5zdHJ1Y3Rpb24oaW5zdHJ1Y3Rpb24pXG4gICAgICAgIC50aGVuKChfKSA9PiB0aGlzLl9yb3V0ZXJDYW5SZXVzZShpbnN0cnVjdGlvbikpXG4gICAgICAgIC50aGVuKChfKSA9PiB0aGlzLl9jYW5BY3RpdmF0ZShpbnN0cnVjdGlvbikpXG4gICAgICAgIC50aGVuKChyZXN1bHQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhpcy5fcm91dGVyQ2FuRGVhY3RpdmF0ZShpbnN0cnVjdGlvbilcbiAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbW1pdChpbnN0cnVjdGlvbiwgX3NraXBMb2NhdGlvbkNoYW5nZSlcbiAgICAgICAgICAgICAgICAgICAgICAudGhlbigoXykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZW1pdE5hdmlnYXRpb25GaW5pc2goaW5zdHJ1Y3Rpb24udG9Sb290VXJsKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9lbWl0TmF2aWdhdGlvbkZpbmlzaCh1cmwpOiB2b2lkIHsgT2JzZXJ2YWJsZVdyYXBwZXIuY2FsbEVtaXQodGhpcy5fc3ViamVjdCwgdXJsKTsgfVxuICBfZW1pdE5hdmlnYXRpb25GYWlsKHVybCk6IHZvaWQgeyBPYnNlcnZhYmxlV3JhcHBlci5jYWxsRXJyb3IodGhpcy5fc3ViamVjdCwgdXJsKTsgfVxuXG4gIHByaXZhdGUgX2FmdGVyUHJvbWlzZUZpbmlzaE5hdmlnYXRpbmcocHJvbWlzZTogUHJvbWlzZTxhbnk+KTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gUHJvbWlzZVdyYXBwZXIuY2F0Y2hFcnJvcihwcm9taXNlLnRoZW4oKF8pID0+IHRoaXMuX2ZpbmlzaE5hdmlnYXRpbmcoKSksIChlcnIpID0+IHtcbiAgICAgIHRoaXMuX2ZpbmlzaE5hdmlnYXRpbmcoKTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICAqIFJlY3Vyc2l2ZWx5IHNldCByZXVzZSBmbGFnc1xuICAgKi9cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcm91dGVyQ2FuUmV1c2UoaW5zdHJ1Y3Rpb246IEluc3RydWN0aW9uKTogUHJvbWlzZTxhbnk+IHtcbiAgICBpZiAoaXNCbGFuayh0aGlzLl9vdXRsZXQpKSB7XG4gICAgICByZXR1cm4gX3Jlc29sdmVUb0ZhbHNlO1xuICAgIH1cbiAgICBpZiAoaXNCbGFuayhpbnN0cnVjdGlvbi5jb21wb25lbnQpKSB7XG4gICAgICByZXR1cm4gX3Jlc29sdmVUb1RydWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9vdXRsZXQucm91dGVyQ2FuUmV1c2UoaW5zdHJ1Y3Rpb24uY29tcG9uZW50KVxuICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgaW5zdHJ1Y3Rpb24uY29tcG9uZW50LnJldXNlID0gcmVzdWx0O1xuICAgICAgICAgIGlmIChyZXN1bHQgJiYgaXNQcmVzZW50KHRoaXMuX2NoaWxkUm91dGVyKSAmJiBpc1ByZXNlbnQoaW5zdHJ1Y3Rpb24uY2hpbGQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY2hpbGRSb3V0ZXIuX3JvdXRlckNhblJldXNlKGluc3RydWN0aW9uLmNoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2FuQWN0aXZhdGUobmV4dEluc3RydWN0aW9uOiBJbnN0cnVjdGlvbik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBjYW5BY3RpdmF0ZU9uZShuZXh0SW5zdHJ1Y3Rpb24sIHRoaXMuY3VycmVudEluc3RydWN0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JvdXRlckNhbkRlYWN0aXZhdGUoaW5zdHJ1Y3Rpb246IEluc3RydWN0aW9uKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKGlzQmxhbmsodGhpcy5fb3V0bGV0KSkge1xuICAgICAgcmV0dXJuIF9yZXNvbHZlVG9UcnVlO1xuICAgIH1cbiAgICB2YXIgbmV4dDogUHJvbWlzZTxib29sZWFuPjtcbiAgICB2YXIgY2hpbGRJbnN0cnVjdGlvbjogSW5zdHJ1Y3Rpb24gPSBudWxsO1xuICAgIHZhciByZXVzZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHZhciBjb21wb25lbnRJbnN0cnVjdGlvbjogQ29tcG9uZW50SW5zdHJ1Y3Rpb24gPSBudWxsO1xuICAgIGlmIChpc1ByZXNlbnQoaW5zdHJ1Y3Rpb24pKSB7XG4gICAgICBjaGlsZEluc3RydWN0aW9uID0gaW5zdHJ1Y3Rpb24uY2hpbGQ7XG4gICAgICBjb21wb25lbnRJbnN0cnVjdGlvbiA9IGluc3RydWN0aW9uLmNvbXBvbmVudDtcbiAgICAgIHJldXNlID0gaXNCbGFuayhpbnN0cnVjdGlvbi5jb21wb25lbnQpIHx8IGluc3RydWN0aW9uLmNvbXBvbmVudC5yZXVzZTtcbiAgICB9XG4gICAgaWYgKHJldXNlKSB7XG4gICAgICBuZXh0ID0gX3Jlc29sdmVUb1RydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHQgPSB0aGlzLl9vdXRsZXQucm91dGVyQ2FuRGVhY3RpdmF0ZShjb21wb25lbnRJbnN0cnVjdGlvbik7XG4gICAgfVxuICAgIC8vIFRPRE86IGF1eCByb3V0ZSBsaWZlY3ljbGUgaG9va3NcbiAgICByZXR1cm4gbmV4dC50aGVuPGJvb2xlYW4+KChyZXN1bHQpOiBib29sZWFuIHwgUHJvbWlzZTxib29sZWFuPiA9PiB7XG4gICAgICBpZiAocmVzdWx0ID09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5fY2hpbGRSb3V0ZXIpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGlsZFJvdXRlci5fcm91dGVyQ2FuRGVhY3RpdmF0ZShjaGlsZEluc3RydWN0aW9uKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhpcyByb3V0ZXIgYW5kIGFsbCBkZXNjZW5kYW50IHJvdXRlcnMgYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBpbnN0cnVjdGlvblxuICAgKi9cbiAgY29tbWl0KGluc3RydWN0aW9uOiBJbnN0cnVjdGlvbiwgX3NraXBMb2NhdGlvbkNoYW5nZTogYm9vbGVhbiA9IGZhbHNlKTogUHJvbWlzZTxhbnk+IHtcbiAgICB0aGlzLmN1cnJlbnRJbnN0cnVjdGlvbiA9IGluc3RydWN0aW9uO1xuXG4gICAgdmFyIG5leHQ6IFByb21pc2U8YW55PiA9IF9yZXNvbHZlVG9UcnVlO1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fb3V0bGV0KSAmJiBpc1ByZXNlbnQoaW5zdHJ1Y3Rpb24uY29tcG9uZW50KSkge1xuICAgICAgdmFyIGNvbXBvbmVudEluc3RydWN0aW9uID0gaW5zdHJ1Y3Rpb24uY29tcG9uZW50O1xuICAgICAgaWYgKGNvbXBvbmVudEluc3RydWN0aW9uLnJldXNlKSB7XG4gICAgICAgIG5leHQgPSB0aGlzLl9vdXRsZXQucmV1c2UoY29tcG9uZW50SW5zdHJ1Y3Rpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dCA9XG4gICAgICAgICAgICB0aGlzLmRlYWN0aXZhdGUoaW5zdHJ1Y3Rpb24pLnRoZW4oKF8pID0+IHRoaXMuX291dGxldC5hY3RpdmF0ZShjb21wb25lbnRJbnN0cnVjdGlvbikpO1xuICAgICAgfVxuICAgICAgaWYgKGlzUHJlc2VudChpbnN0cnVjdGlvbi5jaGlsZCkpIHtcbiAgICAgICAgbmV4dCA9IG5leHQudGhlbigoXykgPT4ge1xuICAgICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5fY2hpbGRSb3V0ZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY2hpbGRSb3V0ZXIuY29tbWl0KGluc3RydWN0aW9uLmNoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcm9taXNlczogUHJvbWlzZTxhbnk+W10gPSBbXTtcbiAgICB0aGlzLl9hdXhSb3V0ZXJzLmZvckVhY2goKHJvdXRlciwgbmFtZSkgPT4ge1xuICAgICAgaWYgKGlzUHJlc2VudChpbnN0cnVjdGlvbi5hdXhJbnN0cnVjdGlvbltuYW1lXSkpIHtcbiAgICAgICAgcHJvbWlzZXMucHVzaChyb3V0ZXIuY29tbWl0KGluc3RydWN0aW9uLmF1eEluc3RydWN0aW9uW25hbWVdKSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmV4dC50aGVuKChfKSA9PiBQcm9taXNlV3JhcHBlci5hbGwocHJvbWlzZXMpKTtcbiAgfVxuXG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc3RhcnROYXZpZ2F0aW5nKCk6IHZvaWQgeyB0aGlzLm5hdmlnYXRpbmcgPSB0cnVlOyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZmluaXNoTmF2aWdhdGluZygpOiB2b2lkIHsgdGhpcy5uYXZpZ2F0aW5nID0gZmFsc2U7IH1cblxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmUgdG8gVVJMIHVwZGF0ZXMgZnJvbSB0aGUgcm91dGVyXG4gICAqL1xuICBzdWJzY3JpYmUob25OZXh0OiAodmFsdWU6IGFueSkgPT4gdm9pZCwgb25FcnJvcj86ICh2YWx1ZTogYW55KSA9PiB2b2lkKTogT2JqZWN0IHtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZVdyYXBwZXIuc3Vic2NyaWJlKHRoaXMuX3N1YmplY3QsIG9uTmV4dCwgb25FcnJvcik7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBjb250ZW50cyBvZiB0aGlzIHJvdXRlcidzIG91dGxldCBhbmQgYWxsIGRlc2NlbmRhbnQgb3V0bGV0c1xuICAgKi9cbiAgZGVhY3RpdmF0ZShpbnN0cnVjdGlvbjogSW5zdHJ1Y3Rpb24pOiBQcm9taXNlPGFueT4ge1xuICAgIHZhciBjaGlsZEluc3RydWN0aW9uOiBJbnN0cnVjdGlvbiA9IG51bGw7XG4gICAgdmFyIGNvbXBvbmVudEluc3RydWN0aW9uOiBDb21wb25lbnRJbnN0cnVjdGlvbiA9IG51bGw7XG4gICAgaWYgKGlzUHJlc2VudChpbnN0cnVjdGlvbikpIHtcbiAgICAgIGNoaWxkSW5zdHJ1Y3Rpb24gPSBpbnN0cnVjdGlvbi5jaGlsZDtcbiAgICAgIGNvbXBvbmVudEluc3RydWN0aW9uID0gaW5zdHJ1Y3Rpb24uY29tcG9uZW50O1xuICAgIH1cbiAgICB2YXIgbmV4dDogUHJvbWlzZTxhbnk+ID0gX3Jlc29sdmVUb1RydWU7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl9jaGlsZFJvdXRlcikpIHtcbiAgICAgIG5leHQgPSB0aGlzLl9jaGlsZFJvdXRlci5kZWFjdGl2YXRlKGNoaWxkSW5zdHJ1Y3Rpb24pO1xuICAgIH1cbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuX291dGxldCkpIHtcbiAgICAgIG5leHQgPSBuZXh0LnRoZW4oKF8pID0+IHRoaXMuX291dGxldC5kZWFjdGl2YXRlKGNvbXBvbmVudEluc3RydWN0aW9uKSk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogaGFuZGxlIGF1eCByb3V0ZXNcblxuICAgIHJldHVybiBuZXh0O1xuICB9XG5cblxuICAvKipcbiAgICogR2l2ZW4gYSBVUkwsIHJldHVybnMgYW4gaW5zdHJ1Y3Rpb24gcmVwcmVzZW50aW5nIHRoZSBjb21wb25lbnQgZ3JhcGhcbiAgICovXG4gIHJlY29nbml6ZSh1cmw6IHN0cmluZyk6IFByb21pc2U8SW5zdHJ1Y3Rpb24+IHtcbiAgICB2YXIgYW5jZXN0b3JDb21wb25lbnRzID0gdGhpcy5fZ2V0QW5jZXN0b3JJbnN0cnVjdGlvbnMoKTtcbiAgICByZXR1cm4gdGhpcy5yZWdpc3RyeS5yZWNvZ25pemUodXJsLCBhbmNlc3RvckNvbXBvbmVudHMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0QW5jZXN0b3JJbnN0cnVjdGlvbnMoKTogSW5zdHJ1Y3Rpb25bXSB7XG4gICAgdmFyIGFuY2VzdG9ySW5zdHJ1Y3Rpb25zOiBJbnN0cnVjdGlvbltdID0gW3RoaXMuY3VycmVudEluc3RydWN0aW9uXTtcbiAgICB2YXIgYW5jZXN0b3JSb3V0ZXI6IFJvdXRlciA9IHRoaXM7XG4gICAgd2hpbGUgKGlzUHJlc2VudChhbmNlc3RvclJvdXRlciA9IGFuY2VzdG9yUm91dGVyLnBhcmVudCkpIHtcbiAgICAgIGFuY2VzdG9ySW5zdHJ1Y3Rpb25zLnVuc2hpZnQoYW5jZXN0b3JSb3V0ZXIuY3VycmVudEluc3RydWN0aW9uKTtcbiAgICB9XG4gICAgcmV0dXJuIGFuY2VzdG9ySW5zdHJ1Y3Rpb25zO1xuICB9XG5cblxuICAvKipcbiAgICogTmF2aWdhdGVzIHRvIGVpdGhlciB0aGUgbGFzdCBVUkwgc3VjY2Vzc2Z1bGx5IG5hdmlnYXRlZCB0bywgb3IgdGhlIGxhc3QgVVJMIHJlcXVlc3RlZCBpZiB0aGVcbiAgICogcm91dGVyIGhhcyB5ZXQgdG8gc3VjY2Vzc2Z1bGx5IG5hdmlnYXRlLlxuICAgKi9cbiAgcmVuYXZpZ2F0ZSgpOiBQcm9taXNlPGFueT4ge1xuICAgIGlmIChpc0JsYW5rKHRoaXMubGFzdE5hdmlnYXRpb25BdHRlbXB0KSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnROYXZpZ2F0aW9uO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5uYXZpZ2F0ZUJ5VXJsKHRoaXMubGFzdE5hdmlnYXRpb25BdHRlbXB0KTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIGFuIGBJbnN0cnVjdGlvbmAgYmFzZWQgb24gdGhlIHByb3ZpZGVkIFJvdXRlIExpbmsgRFNMLlxuICAgKi9cbiAgZ2VuZXJhdGUobGlua1BhcmFtczogYW55W10pOiBJbnN0cnVjdGlvbiB7XG4gICAgdmFyIGFuY2VzdG9ySW5zdHJ1Y3Rpb25zID0gdGhpcy5fZ2V0QW5jZXN0b3JJbnN0cnVjdGlvbnMoKTtcbiAgICByZXR1cm4gdGhpcy5yZWdpc3RyeS5nZW5lcmF0ZShsaW5rUGFyYW1zLCBhbmNlc3Rvckluc3RydWN0aW9ucyk7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJvb3RSb3V0ZXIgZXh0ZW5kcyBSb3V0ZXIge1xuICAvKiogQGludGVybmFsICovXG4gIF9sb2NhdGlvbjogTG9jYXRpb247XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2xvY2F0aW9uU3ViOiBPYmplY3Q7XG5cbiAgY29uc3RydWN0b3IocmVnaXN0cnk6IFJvdXRlUmVnaXN0cnksIGxvY2F0aW9uOiBMb2NhdGlvbixcbiAgICAgICAgICAgICAgQEluamVjdChST1VURVJfUFJJTUFSWV9DT01QT05FTlQpIHByaW1hcnlDb21wb25lbnQ6IFR5cGUpIHtcbiAgICBzdXBlcihyZWdpc3RyeSwgbnVsbCwgcHJpbWFyeUNvbXBvbmVudCk7XG4gICAgdGhpcy5yb290ID0gdGhpcztcbiAgICB0aGlzLl9sb2NhdGlvbiA9IGxvY2F0aW9uO1xuICAgIHRoaXMuX2xvY2F0aW9uU3ViID0gdGhpcy5fbG9jYXRpb24uc3Vic2NyaWJlKChjaGFuZ2UpID0+IHtcbiAgICAgIC8vIHdlIGNhbGwgcmVjb2duaXplIG91cnNlbHZlc1xuICAgICAgdGhpcy5yZWNvZ25pemUoY2hhbmdlWyd1cmwnXSlcbiAgICAgICAgICAudGhlbigoaW5zdHJ1Y3Rpb24pID0+IHtcbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQoaW5zdHJ1Y3Rpb24pKSB7XG4gICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVCeUluc3RydWN0aW9uKGluc3RydWN0aW9uLCBpc1ByZXNlbnQoY2hhbmdlWydwb3AnXSkpXG4gICAgICAgICAgICAgICAgICAudGhlbigoXykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGEgcG9wc3RhdGUgZXZlbnQ7IG5vIG5lZWQgdG8gY2hhbmdlIHRoZSBVUkxcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzUHJlc2VudChjaGFuZ2VbJ3BvcCddKSAmJiBjaGFuZ2VbJ3R5cGUnXSAhPSAnaGFzaGNoYW5nZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIGVtaXRQYXRoID0gaW5zdHJ1Y3Rpb24udG9VcmxQYXRoKCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbWl0UXVlcnkgPSBpbnN0cnVjdGlvbi50b1VybFF1ZXJ5KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbWl0UGF0aC5sZW5ndGggPiAwICYmIGVtaXRQYXRoWzBdICE9ICcvJykge1xuICAgICAgICAgICAgICAgICAgICAgIGVtaXRQYXRoID0gJy8nICsgZW1pdFBhdGg7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBCZWNhdXNlIHdlJ3ZlIG9wdGVkIHRvIHVzZSBBbGwgaGFzaGNoYW5nZSBldmVudHMgb2NjdXIgb3V0c2lkZSBBbmd1bGFyLlxuICAgICAgICAgICAgICAgICAgICAvLyBIb3dldmVyLCBhcHBzIHRoYXQgYXJlIG1pZ3JhdGluZyBtaWdodCBoYXZlIGhhc2ggbGlua3MgdGhhdCBvcGVyYXRlIG91dHNpZGVcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5ndWxhciB0byB3aGljaCByb3V0aW5nIG11c3QgcmVzcG9uZC5cbiAgICAgICAgICAgICAgICAgICAgLy8gVG8gc3VwcG9ydCB0aGVzZSBjYXNlcyB3aGVyZSB3ZSByZXNwb25kIHRvIGhhc2hjaGFuZ2VzIGFuZCByZWRpcmVjdCBhcyBhXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlc3VsdCwgd2UgbmVlZCB0byByZXBsYWNlIHRoZSB0b3AgaXRlbSBvbiB0aGUgc3RhY2suXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VbJ3R5cGUnXSA9PSAnaGFzaGNoYW5nZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdHJ1Y3Rpb24udG9Sb290VXJsKCkgIT0gdGhpcy5fbG9jYXRpb24ucGF0aCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2NhdGlvbi5yZXBsYWNlU3RhdGUoZW1pdFBhdGgsIGVtaXRRdWVyeSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uLmdvKGVtaXRQYXRoLCBlbWl0UXVlcnkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuX2VtaXROYXZpZ2F0aW9uRmFpbChjaGFuZ2VbJ3VybCddKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMucmVnaXN0cnkuY29uZmlnRnJvbUNvbXBvbmVudChwcmltYXJ5Q29tcG9uZW50KTtcbiAgICB0aGlzLm5hdmlnYXRlQnlVcmwobG9jYXRpb24ucGF0aCgpKTtcbiAgfVxuXG4gIGNvbW1pdChpbnN0cnVjdGlvbjogSW5zdHJ1Y3Rpb24sIF9za2lwTG9jYXRpb25DaGFuZ2U6IGJvb2xlYW4gPSBmYWxzZSk6IFByb21pc2U8YW55PiB7XG4gICAgdmFyIGVtaXRQYXRoID0gaW5zdHJ1Y3Rpb24udG9VcmxQYXRoKCk7XG4gICAgdmFyIGVtaXRRdWVyeSA9IGluc3RydWN0aW9uLnRvVXJsUXVlcnkoKTtcbiAgICBpZiAoZW1pdFBhdGgubGVuZ3RoID4gMCAmJiBlbWl0UGF0aFswXSAhPSAnLycpIHtcbiAgICAgIGVtaXRQYXRoID0gJy8nICsgZW1pdFBhdGg7XG4gICAgfVxuICAgIHZhciBwcm9taXNlID0gc3VwZXIuY29tbWl0KGluc3RydWN0aW9uKTtcbiAgICBpZiAoIV9za2lwTG9jYXRpb25DaGFuZ2UpIHtcbiAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oKF8pID0+IHsgdGhpcy5fbG9jYXRpb24uZ28oZW1pdFBhdGgsIGVtaXRRdWVyeSk7IH0pO1xuICAgIH1cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl9sb2NhdGlvblN1YikpIHtcbiAgICAgIE9ic2VydmFibGVXcmFwcGVyLmRpc3Bvc2UodGhpcy5fbG9jYXRpb25TdWIpO1xuICAgICAgdGhpcy5fbG9jYXRpb25TdWIgPSBudWxsO1xuICAgIH1cbiAgfVxufVxuXG5jbGFzcyBDaGlsZFJvdXRlciBleHRlbmRzIFJvdXRlciB7XG4gIGNvbnN0cnVjdG9yKHBhcmVudDogUm91dGVyLCBob3N0Q29tcG9uZW50KSB7XG4gICAgc3VwZXIocGFyZW50LnJlZ2lzdHJ5LCBwYXJlbnQsIGhvc3RDb21wb25lbnQsIHBhcmVudC5yb290KTtcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgfVxuXG5cbiAgbmF2aWdhdGVCeVVybCh1cmw6IHN0cmluZywgX3NraXBMb2NhdGlvbkNoYW5nZTogYm9vbGVhbiA9IGZhbHNlKTogUHJvbWlzZTxhbnk+IHtcbiAgICAvLyBEZWxlZ2F0ZSBuYXZpZ2F0aW9uIHRvIHRoZSByb290IHJvdXRlclxuICAgIHJldHVybiB0aGlzLnBhcmVudC5uYXZpZ2F0ZUJ5VXJsKHVybCwgX3NraXBMb2NhdGlvbkNoYW5nZSk7XG4gIH1cblxuICBuYXZpZ2F0ZUJ5SW5zdHJ1Y3Rpb24oaW5zdHJ1Y3Rpb246IEluc3RydWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3NraXBMb2NhdGlvbkNoYW5nZTogYm9vbGVhbiA9IGZhbHNlKTogUHJvbWlzZTxhbnk+IHtcbiAgICAvLyBEZWxlZ2F0ZSBuYXZpZ2F0aW9uIHRvIHRoZSByb290IHJvdXRlclxuICAgIHJldHVybiB0aGlzLnBhcmVudC5uYXZpZ2F0ZUJ5SW5zdHJ1Y3Rpb24oaW5zdHJ1Y3Rpb24sIF9za2lwTG9jYXRpb25DaGFuZ2UpO1xuICB9XG59XG5cblxuZnVuY3Rpb24gY2FuQWN0aXZhdGVPbmUobmV4dEluc3RydWN0aW9uOiBJbnN0cnVjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZJbnN0cnVjdGlvbjogSW5zdHJ1Y3Rpb24pOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgdmFyIG5leHQgPSBfcmVzb2x2ZVRvVHJ1ZTtcbiAgaWYgKGlzQmxhbmsobmV4dEluc3RydWN0aW9uLmNvbXBvbmVudCkpIHtcbiAgICByZXR1cm4gbmV4dDtcbiAgfVxuICBpZiAoaXNQcmVzZW50KG5leHRJbnN0cnVjdGlvbi5jaGlsZCkpIHtcbiAgICBuZXh0ID0gY2FuQWN0aXZhdGVPbmUobmV4dEluc3RydWN0aW9uLmNoaWxkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBpc1ByZXNlbnQocHJldkluc3RydWN0aW9uKSA/IHByZXZJbnN0cnVjdGlvbi5jaGlsZCA6IG51bGwpO1xuICB9XG4gIHJldHVybiBuZXh0LnRoZW48Ym9vbGVhbj4oKHJlc3VsdDogYm9vbGVhbik6IGJvb2xlYW4gPT4ge1xuICAgIGlmIChyZXN1bHQgPT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKG5leHRJbnN0cnVjdGlvbi5jb21wb25lbnQucmV1c2UpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICB2YXIgaG9vayA9IGdldENhbkFjdGl2YXRlSG9vayhuZXh0SW5zdHJ1Y3Rpb24uY29tcG9uZW50LmNvbXBvbmVudFR5cGUpO1xuICAgIGlmIChpc1ByZXNlbnQoaG9vaykpIHtcbiAgICAgIHJldHVybiBob29rKG5leHRJbnN0cnVjdGlvbi5jb21wb25lbnQsXG4gICAgICAgICAgICAgICAgICBpc1ByZXNlbnQocHJldkluc3RydWN0aW9uKSA/IHByZXZJbnN0cnVjdGlvbi5jb21wb25lbnQgOiBudWxsKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0pO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
