System.register(['angular2/src/core/zone/ng_zone', 'angular2/src/facade/lang', 'angular2/src/core/di', './application_tokens', 'angular2/src/facade/async', 'angular2/src/facade/collection', 'angular2/src/core/testability/testability', 'angular2/src/core/linker/dynamic_component_loader', 'angular2/src/facade/exceptions', 'angular2/src/core/console', './profile/profile'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var ng_zone_1, lang_1, di_1, application_tokens_1, async_1, collection_1, testability_1, dynamic_component_loader_1, exceptions_1, console_1, profile_1, lang_2;
    var _platform, _platformProviders, PlatformRef, PlatformRef_, ApplicationRef, ApplicationRef_;
    /**
     * Construct providers specific to an individual root component.
     */
    function _componentProviders(appComponentType) {
        return [
            di_1.provide(application_tokens_1.APP_COMPONENT, { useValue: appComponentType }),
            di_1.provide(application_tokens_1.APP_COMPONENT_REF_PROMISE, {
                useFactory: function (dynamicComponentLoader, appRef, injector) {
                    // Save the ComponentRef for disposal later.
                    var ref;
                    // TODO(rado): investigate whether to support providers on root component.
                    return dynamicComponentLoader.loadAsRoot(appComponentType, null, injector, function () { appRef._unloadComponent(ref); })
                        .then(function (componentRef) {
                        ref = componentRef;
                        var testability = injector.getOptional(testability_1.Testability);
                        if (lang_1.isPresent(testability)) {
                            injector.get(testability_1.TestabilityRegistry)
                                .registerApplication(componentRef.location.nativeElement, testability);
                        }
                        return componentRef;
                    });
                },
                deps: [dynamic_component_loader_1.DynamicComponentLoader, ApplicationRef, di_1.Injector]
            }),
            di_1.provide(appComponentType, {
                useFactory: function (p) { return p.then(function (ref) { return ref.instance; }); },
                deps: [application_tokens_1.APP_COMPONENT_REF_PROMISE]
            }),
        ];
    }
    /**
     * Create an Angular zone.
     */
    function createNgZone() {
        return new ng_zone_1.NgZone({ enableLongStackTrace: lang_1.assertionsEnabled() });
    }
    exports_1("createNgZone", createNgZone);
    /**
     * Initialize the Angular 'platform' on the page.
     *
     * See {@link PlatformRef} for details on the Angular platform.
     *
     * It is also possible to specify providers to be made in the new platform. These providers
     * will be shared between all applications on the page. For example, an abstraction for
     * the browser cookie jar should be bound at the platform level, because there is only one
     * cookie jar regardless of how many applications on the page will be accessing it.
     *
     * The platform function can be called multiple times as long as the same list of providers
     * is passed into each call. If the platform function is called with a different set of
     * provides, Angular will throw an exception.
     */
    function platform(providers) {
        lang_2.lockMode();
        if (lang_1.isPresent(_platform)) {
            if (collection_1.ListWrapper.equals(_platformProviders, providers)) {
                return _platform;
            }
            else {
                throw new exceptions_1.BaseException("platform cannot be initialized with different sets of providers.");
            }
        }
        else {
            return _createPlatform(providers);
        }
    }
    exports_1("platform", platform);
    /**
     * Dispose the existing platform.
     */
    function disposePlatform() {
        if (lang_1.isPresent(_platform)) {
            _platform.dispose();
            _platform = null;
        }
    }
    exports_1("disposePlatform", disposePlatform);
    function _createPlatform(providers) {
        _platformProviders = providers;
        var injector = di_1.Injector.resolveAndCreate(providers);
        _platform = new PlatformRef_(injector, function () {
            _platform = null;
            _platformProviders = null;
        });
        _runPlatformInitializers(injector);
        return _platform;
    }
    function _runPlatformInitializers(injector) {
        var inits = injector.getOptional(application_tokens_1.PLATFORM_INITIALIZER);
        if (lang_1.isPresent(inits))
            inits.forEach(function (init) { return init(); });
    }
    function _runAppInitializers(injector) {
        var inits = injector.getOptional(application_tokens_1.APP_INITIALIZER);
        var promises = [];
        if (lang_1.isPresent(inits)) {
            inits.forEach(function (init) {
                var retVal = init();
                if (async_1.PromiseWrapper.isPromise(retVal)) {
                    promises.push(retVal);
                }
            });
        }
        if (promises.length > 0) {
            return async_1.PromiseWrapper.all(promises);
        }
        else {
            return null;
        }
    }
    return {
        setters:[
            function (ng_zone_1_1) {
                ng_zone_1 = ng_zone_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
                lang_2 = lang_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (application_tokens_1_1) {
                application_tokens_1 = application_tokens_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (testability_1_1) {
                testability_1 = testability_1_1;
            },
            function (dynamic_component_loader_1_1) {
                dynamic_component_loader_1 = dynamic_component_loader_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (console_1_1) {
                console_1 = console_1_1;
            },
            function (profile_1_1) {
                profile_1 = profile_1_1;
            }],
        execute: function() {
            /**
             * The Angular platform is the entry point for Angular on a web page. Each page
             * has exactly one platform, and services (such as reflection) which are common
             * to every Angular application running on the page are bound in its scope.
             *
             * A page's platform is initialized implicitly when {@link bootstrap}() is called, or
             * explicitly by calling {@link platform}().
             */
            PlatformRef = (function () {
                function PlatformRef() {
                }
                Object.defineProperty(PlatformRef.prototype, "injector", {
                    /**
                     * Retrieve the platform {@link Injector}, which is the parent injector for
                     * every Angular application on the page and provides singleton providers.
                     */
                    get: function () { throw exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                ;
                return PlatformRef;
            }());
            exports_1("PlatformRef", PlatformRef);
            PlatformRef_ = (function (_super) {
                __extends(PlatformRef_, _super);
                function PlatformRef_(_injector, _dispose) {
                    _super.call(this);
                    this._injector = _injector;
                    this._dispose = _dispose;
                    /** @internal */
                    this._applications = [];
                    /** @internal */
                    this._disposeListeners = [];
                }
                PlatformRef_.prototype.registerDisposeListener = function (dispose) { this._disposeListeners.push(dispose); };
                Object.defineProperty(PlatformRef_.prototype, "injector", {
                    get: function () { return this._injector; },
                    enumerable: true,
                    configurable: true
                });
                PlatformRef_.prototype.application = function (providers) {
                    var app = this._initApp(createNgZone(), providers);
                    if (async_1.PromiseWrapper.isPromise(app)) {
                        throw new exceptions_1.BaseException("Cannot use asyncronous app initializers with application. Use asyncApplication instead.");
                    }
                    return app;
                };
                PlatformRef_.prototype.asyncApplication = function (bindingFn, additionalProviders) {
                    var _this = this;
                    var zone = createNgZone();
                    var completer = async_1.PromiseWrapper.completer();
                    if (bindingFn === null) {
                        completer.resolve(this._initApp(zone, additionalProviders));
                    }
                    else {
                        zone.run(function () {
                            async_1.PromiseWrapper.then(bindingFn(zone), function (providers) {
                                if (lang_1.isPresent(additionalProviders)) {
                                    providers = collection_1.ListWrapper.concat(providers, additionalProviders);
                                }
                                var promise = _this._initApp(zone, providers);
                                completer.resolve(promise);
                            });
                        });
                    }
                    return completer.promise;
                };
                PlatformRef_.prototype._initApp = function (zone, providers) {
                    var _this = this;
                    var injector;
                    var app;
                    zone.run(function () {
                        providers = collection_1.ListWrapper.concat(providers, [
                            di_1.provide(ng_zone_1.NgZone, { useValue: zone }),
                            di_1.provide(ApplicationRef, { useFactory: function () { return app; }, deps: [] })
                        ]);
                        var exceptionHandler;
                        try {
                            injector = _this.injector.resolveAndCreateChild(providers);
                            exceptionHandler = injector.get(exceptions_1.ExceptionHandler);
                            async_1.ObservableWrapper.subscribe(zone.onError, function (error) {
                                exceptionHandler.call(error.error, error.stackTrace);
                            });
                        }
                        catch (e) {
                            if (lang_1.isPresent(exceptionHandler)) {
                                exceptionHandler.call(e, e.stack);
                            }
                            else {
                                lang_1.print(e.toString());
                            }
                        }
                    });
                    app = new ApplicationRef_(this, zone, injector);
                    this._applications.push(app);
                    var promise = _runAppInitializers(injector);
                    if (promise !== null) {
                        return async_1.PromiseWrapper.then(promise, function (_) { return app; });
                    }
                    else {
                        return app;
                    }
                };
                PlatformRef_.prototype.dispose = function () {
                    collection_1.ListWrapper.clone(this._applications).forEach(function (app) { return app.dispose(); });
                    this._disposeListeners.forEach(function (dispose) { return dispose(); });
                    this._dispose();
                };
                /** @internal */
                PlatformRef_.prototype._applicationDisposed = function (app) { collection_1.ListWrapper.remove(this._applications, app); };
                return PlatformRef_;
            }(PlatformRef));
            exports_1("PlatformRef_", PlatformRef_);
            /**
             * A reference to an Angular application running on a page.
             *
             * For more about Angular applications, see the documentation for {@link bootstrap}.
             */
            ApplicationRef = (function () {
                function ApplicationRef() {
                }
                Object.defineProperty(ApplicationRef.prototype, "injector", {
                    /**
                     * Retrieve the application {@link Injector}.
                     */
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(ApplicationRef.prototype, "zone", {
                    /**
                     * Retrieve the application {@link NgZone}.
                     */
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(ApplicationRef.prototype, "componentTypes", {
                    /**
                     * Get a list of component types registered to this application.
                     */
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                ;
                return ApplicationRef;
            }());
            exports_1("ApplicationRef", ApplicationRef);
            ApplicationRef_ = (function (_super) {
                __extends(ApplicationRef_, _super);
                function ApplicationRef_(_platform, _zone, _injector) {
                    var _this = this;
                    _super.call(this);
                    this._platform = _platform;
                    this._zone = _zone;
                    this._injector = _injector;
                    /** @internal */
                    this._bootstrapListeners = [];
                    /** @internal */
                    this._disposeListeners = [];
                    /** @internal */
                    this._rootComponents = [];
                    /** @internal */
                    this._rootComponentTypes = [];
                    /** @internal */
                    this._changeDetectorRefs = [];
                    /** @internal */
                    this._runningTick = false;
                    /** @internal */
                    this._enforceNoNewChanges = false;
                    if (lang_1.isPresent(this._zone)) {
                        async_1.ObservableWrapper.subscribe(this._zone.onMicrotaskEmpty, function (_) { _this._zone.run(function () { _this.tick(); }); });
                    }
                    this._enforceNoNewChanges = lang_1.assertionsEnabled();
                }
                ApplicationRef_.prototype.registerBootstrapListener = function (listener) {
                    this._bootstrapListeners.push(listener);
                };
                ApplicationRef_.prototype.registerDisposeListener = function (dispose) { this._disposeListeners.push(dispose); };
                ApplicationRef_.prototype.registerChangeDetector = function (changeDetector) {
                    this._changeDetectorRefs.push(changeDetector);
                };
                ApplicationRef_.prototype.unregisterChangeDetector = function (changeDetector) {
                    collection_1.ListWrapper.remove(this._changeDetectorRefs, changeDetector);
                };
                ApplicationRef_.prototype.bootstrap = function (componentType, providers) {
                    var _this = this;
                    var completer = async_1.PromiseWrapper.completer();
                    this._zone.run(function () {
                        var componentProviders = _componentProviders(componentType);
                        if (lang_1.isPresent(providers)) {
                            componentProviders.push(providers);
                        }
                        var exceptionHandler = _this._injector.get(exceptions_1.ExceptionHandler);
                        _this._rootComponentTypes.push(componentType);
                        try {
                            var injector = _this._injector.resolveAndCreateChild(componentProviders);
                            var compRefToken = injector.get(application_tokens_1.APP_COMPONENT_REF_PROMISE);
                            var tick = function (componentRef) {
                                _this._loadComponent(componentRef);
                                completer.resolve(componentRef);
                            };
                            var tickResult = async_1.PromiseWrapper.then(compRefToken, tick);
                            async_1.PromiseWrapper.then(tickResult, null, function (err, stackTrace) {
                                completer.reject(err, stackTrace);
                                exceptionHandler.call(err, stackTrace);
                            });
                        }
                        catch (e) {
                            exceptionHandler.call(e, e.stack);
                            completer.reject(e, e.stack);
                        }
                    });
                    return completer.promise.then(function (ref) {
                        var c = _this._injector.get(console_1.Console);
                        if (lang_1.assertionsEnabled()) {
                            c.log("Angular 2 is running in the development mode. Call enableProdMode() to enable the production mode.");
                        }
                        return ref;
                    });
                };
                /** @internal */
                ApplicationRef_.prototype._loadComponent = function (componentRef) {
                    var appChangeDetector = componentRef.location.internalElement.parentView.changeDetector;
                    this._changeDetectorRefs.push(appChangeDetector.ref);
                    this.tick();
                    this._rootComponents.push(componentRef);
                    this._bootstrapListeners.forEach(function (listener) { return listener(componentRef); });
                };
                /** @internal */
                ApplicationRef_.prototype._unloadComponent = function (componentRef) {
                    if (!collection_1.ListWrapper.contains(this._rootComponents, componentRef)) {
                        return;
                    }
                    this.unregisterChangeDetector(componentRef.location.internalElement.parentView.changeDetector.ref);
                    collection_1.ListWrapper.remove(this._rootComponents, componentRef);
                };
                Object.defineProperty(ApplicationRef_.prototype, "injector", {
                    get: function () { return this._injector; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ApplicationRef_.prototype, "zone", {
                    get: function () { return this._zone; },
                    enumerable: true,
                    configurable: true
                });
                ApplicationRef_.prototype.tick = function () {
                    if (this._runningTick) {
                        throw new exceptions_1.BaseException("ApplicationRef.tick is called recursively");
                    }
                    var s = ApplicationRef_._tickScope();
                    try {
                        this._runningTick = true;
                        this._changeDetectorRefs.forEach(function (detector) { return detector.detectChanges(); });
                        if (this._enforceNoNewChanges) {
                            this._changeDetectorRefs.forEach(function (detector) { return detector.checkNoChanges(); });
                        }
                    }
                    finally {
                        this._runningTick = false;
                        profile_1.wtfLeave(s);
                    }
                };
                ApplicationRef_.prototype.dispose = function () {
                    // TODO(alxhub): Dispose of the NgZone.
                    collection_1.ListWrapper.clone(this._rootComponents).forEach(function (ref) { return ref.dispose(); });
                    this._disposeListeners.forEach(function (dispose) { return dispose(); });
                    this._platform._applicationDisposed(this);
                };
                Object.defineProperty(ApplicationRef_.prototype, "componentTypes", {
                    get: function () { return this._rootComponentTypes; },
                    enumerable: true,
                    configurable: true
                });
                /** @internal */
                ApplicationRef_._tickScope = profile_1.wtfCreateScope('ApplicationRef#tick()');
                return ApplicationRef_;
            }(ApplicationRef));
            exports_1("ApplicationRef_", ApplicationRef_);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvYXBwbGljYXRpb25fcmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztRQThFSSxTQUFTLEVBQ1Qsa0JBQWtCO0lBM0N0Qjs7T0FFRztJQUNILDZCQUE2QixnQkFBc0I7UUFDakQsTUFBTSxDQUFDO1lBQ0wsWUFBTyxDQUFDLGtDQUFhLEVBQUUsRUFBQyxRQUFRLEVBQUUsZ0JBQWdCLEVBQUMsQ0FBQztZQUNwRCxZQUFPLENBQUMsOENBQXlCLEVBQ3pCO2dCQUNFLFVBQVUsRUFBRSxVQUFDLHNCQUE4QyxFQUFFLE1BQXVCLEVBQ3ZFLFFBQWtCO29CQUM3Qiw0Q0FBNEM7b0JBQzVDLElBQUksR0FBaUIsQ0FBQztvQkFDdEIsMEVBQTBFO29CQUMxRSxNQUFNLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQ2hDLGNBQVEsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUM1RSxJQUFJLENBQUMsVUFBQyxZQUFZO3dCQUNqQixHQUFHLEdBQUcsWUFBWSxDQUFDO3dCQUNuQixJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLHlCQUFXLENBQUMsQ0FBQzt3QkFDcEQsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzNCLFFBQVEsQ0FBQyxHQUFHLENBQUMsaUNBQW1CLENBQUM7aUNBQzVCLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO3dCQUM3RSxDQUFDO3dCQUNELE1BQU0sQ0FBQyxZQUFZLENBQUM7b0JBQ3RCLENBQUMsQ0FBQyxDQUFDO2dCQUNULENBQUM7Z0JBQ0QsSUFBSSxFQUFFLENBQUMsaURBQXNCLEVBQUUsY0FBYyxFQUFFLGFBQVEs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LENBQUM7Z0JBRUQsaUNBQU8sR0FBUDtvQkFDRSx1Q0FBdUM7b0JBQ3ZDLHdCQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHLElBQUssT0FBQSxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQWIsQ0FBYSxDQUFDLENBQUM7b0JBQ3hFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsVUFBQyxPQUFPLElBQUssT0FBQSxPQUFPLEVBQUUsRUFBVCxDQUFTLENBQUMsQ0FBQztvQkFDdkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUMsQ0FBQztnQkFFRCxzQkFBSSwyQ0FBYzt5QkFBbEIsY0FBK0IsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFqSWpFLGdCQUFnQjtnQkFDVCwwQkFBVSxHQUFlLHdCQUFjLENBQUMsdUJBQXVCLENBQUMsQ0FBQztnQkFpSTFFLHNCQUFDO1lBQUQsQ0FuSUEsQUFtSUMsQ0FuSW9DLGNBQWMsR0FtSWxEO1lBbklELDZDQW1JQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvYXBwbGljYXRpb25fcmVmLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ1pvbmUsIE5nWm9uZUVycm9yfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS96b25lL25nX3pvbmUnO1xuaW1wb3J0IHtcbiAgVHlwZSxcbiAgaXNCbGFuayxcbiAgaXNQcmVzZW50LFxuICBhc3NlcnRpb25zRW5hYmxlZCxcbiAgcHJpbnQsXG4gIElTX0RBUlRcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7cHJvdmlkZSwgUHJvdmlkZXIsIEluamVjdG9yLCBPcGFxdWVUb2tlbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtcbiAgQVBQX0NPTVBPTkVOVF9SRUZfUFJPTUlTRSxcbiAgQVBQX0NPTVBPTkVOVCxcbiAgQVBQX0lEX1JBTkRPTV9QUk9WSURFUixcbiAgUExBVEZPUk1fSU5JVElBTElaRVIsXG4gIEFQUF9JTklUSUFMSVpFUlxufSBmcm9tICcuL2FwcGxpY2F0aW9uX3Rva2Vucyc7XG5pbXBvcnQge1Byb21pc2VXcmFwcGVyLCBQcm9taXNlQ29tcGxldGVyLCBPYnNlcnZhYmxlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5pbXBvcnQge0xpc3RXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtUZXN0YWJpbGl0eVJlZ2lzdHJ5LCBUZXN0YWJpbGl0eX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvdGVzdGFiaWxpdHkvdGVzdGFiaWxpdHknO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50UmVmLFxuICBEeW5hbWljQ29tcG9uZW50TG9hZGVyXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9keW5hbWljX2NvbXBvbmVudF9sb2FkZXInO1xuaW1wb3J0IHtcbiAgQmFzZUV4Y2VwdGlvbixcbiAgV3JhcHBlZEV4Y2VwdGlvbixcbiAgRXhjZXB0aW9uSGFuZGxlcixcbiAgdW5pbXBsZW1lbnRlZFxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtDb25zb2xlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9jb25zb2xlJztcbmltcG9ydCB7d3RmTGVhdmUsIHd0ZkNyZWF0ZVNjb3BlLCBXdGZTY29wZUZufSBmcm9tICcuL3Byb2ZpbGUvcHJvZmlsZSc7XG5pbXBvcnQge0NoYW5nZURldGVjdG9yUmVmfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2NoYW5nZV9kZXRlY3Rvcl9yZWYnO1xuaW1wb3J0IHtsb2NrTW9kZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7RWxlbWVudFJlZl99IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9lbGVtZW50X3JlZic7XG5cbi8qKlxuICogQ29uc3RydWN0IHByb3ZpZGVycyBzcGVjaWZpYyB0byBhbiBpbmRpdmlkdWFsIHJvb3QgY29tcG9uZW50LlxuICovXG5mdW5jdGlvbiBfY29tcG9uZW50UHJvdmlkZXJzKGFwcENvbXBvbmVudFR5cGU6IFR5cGUpOiBBcnJheTxUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXT4ge1xuICByZXR1cm4gW1xuICAgIHByb3ZpZGUoQVBQX0NPTVBPTkVOVCwge3VzZVZhbHVlOiBhcHBDb21wb25lbnRUeXBlfSksXG4gICAgcHJvdmlkZShBUFBfQ09NUE9ORU5UX1JFRl9QUk9NSVNFLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB1c2VGYWN0b3J5OiAoZHluYW1pY0NvbXBvbmVudExvYWRlcjogRHluYW1pY0NvbXBvbmVudExvYWRlciwgYXBwUmVmOiBBcHBsaWNhdGlvblJlZl8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBpbmplY3RvcjogSW5qZWN0b3IpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBTYXZlIHRoZSBDb21wb25lbnRSZWYgZm9yIGRpc3Bvc2FsIGxhdGVyLlxuICAgICAgICAgICAgICAgIHZhciByZWY6IENvbXBvbmVudFJlZjtcbiAgICAgICAgICAgICAgICAvLyBUT0RPKHJhZG8pOiBpbnZlc3RpZ2F0ZSB3aGV0aGVyIHRvIHN1cHBvcnQgcHJvdmlkZXJzIG9uIHJvb3QgY29tcG9uZW50LlxuICAgICAgICAgICAgICAgIHJldHVybiBkeW5hbWljQ29tcG9uZW50TG9hZGVyLmxvYWRBc1Jvb3QoYXBwQ29tcG9uZW50VHlwZSwgbnVsbCwgaW5qZWN0b3IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7IGFwcFJlZi5fdW5sb2FkQ29tcG9uZW50KHJlZik7IH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChjb21wb25lbnRSZWYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICByZWYgPSBjb21wb25lbnRSZWY7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHRlc3RhYmlsaXR5ID0gaW5qZWN0b3IuZ2V0T3B0aW9uYWwoVGVzdGFiaWxpdHkpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChpc1ByZXNlbnQodGVzdGFiaWxpdHkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmplY3Rvci5nZXQoVGVzdGFiaWxpdHlSZWdpc3RyeSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVnaXN0ZXJBcHBsaWNhdGlvbihjb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCwgdGVzdGFiaWxpdHkpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9uZW50UmVmO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZGVwczogW0R5bmFtaWNDb21wb25lbnRMb2FkZXIsIEFwcGxpY2F0aW9uUmVmLCBJbmplY3Rvcl1cbiAgICAgICAgICAgIH0pLFxuICAgIHByb3ZpZGUoYXBwQ29tcG9uZW50VHlwZSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdXNlRmFjdG9yeTogKHA6IFByb21pc2U8YW55PikgPT4gcC50aGVuKHJlZiA9PiByZWYuaW5zdGFuY2UpLFxuICAgICAgICAgICAgICBkZXBzOiBbQVBQX0NPTVBPTkVOVF9SRUZfUFJPTUlTRV1cbiAgICAgICAgICAgIH0pLFxuICBdO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhbiBBbmd1bGFyIHpvbmUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVOZ1pvbmUoKTogTmdab25lIHtcbiAgcmV0dXJuIG5ldyBOZ1pvbmUoe2VuYWJsZUxvbmdTdGFja1RyYWNlOiBhc3NlcnRpb25zRW5hYmxlZCgpfSk7XG59XG5cbnZhciBfcGxhdGZvcm06IFBsYXRmb3JtUmVmO1xudmFyIF9wbGF0Zm9ybVByb3ZpZGVyczogYW55W107XG5cbi8qKlxuICogSW5pdGlhbGl6ZSB0aGUgQW5ndWxhciAncGxhdGZvcm0nIG9uIHRoZSBwYWdlLlxuICpcbiAqIFNlZSB7QGxpbmsgUGxhdGZvcm1SZWZ9IGZvciBkZXRhaWxzIG9uIHRoZSBBbmd1bGFyIHBsYXRmb3JtLlxuICpcbiAqIEl0IGlzIGFsc28gcG9zc2libGUgdG8gc3BlY2lmeSBwcm92aWRlcnMgdG8gYmUgbWFkZSBpbiB0aGUgbmV3IHBsYXRmb3JtLiBUaGVzZSBwcm92aWRlcnNcbiAqIHdpbGwgYmUgc2hhcmVkIGJldHdlZW4gYWxsIGFwcGxpY2F0aW9ucyBvbiB0aGUgcGFnZS4gRm9yIGV4YW1wbGUsIGFuIGFic3RyYWN0aW9uIGZvclxuICogdGhlIGJyb3dzZXIgY29va2llIGphciBzaG91bGQgYmUgYm91bmQgYXQgdGhlIHBsYXRmb3JtIGxldmVsLCBiZWNhdXNlIHRoZXJlIGlzIG9ubHkgb25lXG4gKiBjb29raWUgamFyIHJlZ2FyZGxlc3Mgb2YgaG93IG1hbnkgYXBwbGljYXRpb25zIG9uIHRoZSBwYWdlIHdpbGwgYmUgYWNjZXNzaW5nIGl0LlxuICpcbiAqIFRoZSBwbGF0Zm9ybSBmdW5jdGlvbiBjYW4gYmUgY2FsbGVkIG11bHRpcGxlIHRpbWVzIGFzIGxvbmcgYXMgdGhlIHNhbWUgbGlzdCBvZiBwcm92aWRlcnNcbiAqIGlzIHBhc3NlZCBpbnRvIGVhY2ggY2FsbC4gSWYgdGhlIHBsYXRmb3JtIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aXRoIGEgZGlmZmVyZW50IHNldCBvZlxuICogcHJvdmlkZXMsIEFuZ3VsYXIgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwbGF0Zm9ybShwcm92aWRlcnM/OiBBcnJheTxUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXT4pOiBQbGF0Zm9ybVJlZiB7XG4gIGxvY2tNb2RlKCk7XG4gIGlmIChpc1ByZXNlbnQoX3BsYXRmb3JtKSkge1xuICAgIGlmIChMaXN0V3JhcHBlci5lcXVhbHMoX3BsYXRmb3JtUHJvdmlkZXJzLCBwcm92aWRlcnMpKSB7XG4gICAgICByZXR1cm4gX3BsYXRmb3JtO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcInBsYXRmb3JtIGNhbm5vdCBiZSBpbml0aWFsaXplZCB3aXRoIGRpZmZlcmVudCBzZXRzIG9mIHByb3ZpZGVycy5cIik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBfY3JlYXRlUGxhdGZvcm0ocHJvdmlkZXJzKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3Bvc2UgdGhlIGV4aXN0aW5nIHBsYXRmb3JtLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzcG9zZVBsYXRmb3JtKCk6IHZvaWQge1xuICBpZiAoaXNQcmVzZW50KF9wbGF0Zm9ybSkpIHtcbiAgICBfcGxhdGZvcm0uZGlzcG9zZSgpO1xuICAgIF9wbGF0Zm9ybSA9IG51bGw7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZVBsYXRmb3JtKHByb3ZpZGVycz86IEFycmF5PFR5cGUgfCBQcm92aWRlciB8IGFueVtdPik6IFBsYXRmb3JtUmVmIHtcbiAgX3BsYXRmb3JtUHJvdmlkZXJzID0gcHJvdmlkZXJzO1xuICBsZXQgaW5qZWN0b3IgPSBJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKHByb3ZpZGVycyk7XG4gIF9wbGF0Zm9ybSA9IG5ldyBQbGF0Zm9ybVJlZl8oaW5qZWN0b3IsICgpID0+IHtcbiAgICBfcGxhdGZvcm0gPSBudWxsO1xuICAgIF9wbGF0Zm9ybVByb3ZpZGVycyA9IG51bGw7XG4gIH0pO1xuICBfcnVuUGxhdGZvcm1Jbml0aWFsaXplcnMoaW5qZWN0b3IpO1xuICByZXR1cm4gX3BsYXRmb3JtO1xufVxuXG5mdW5jdGlvbiBfcnVuUGxhdGZvcm1Jbml0aWFsaXplcnMoaW5qZWN0b3I6IEluamVjdG9yKTogdm9pZCB7XG4gIGxldCBpbml0czogRnVuY3Rpb25bXSA9IDxGdW5jdGlvbltdPmluamVjdG9yLmdldE9wdGlvbmFsKFBMQVRGT1JNX0lOSVRJQUxJWkVSKTtcbiAgaWYgKGlzUHJlc2VudChpbml0cykpIGluaXRzLmZvckVhY2goaW5pdCA9PiBpbml0KCkpO1xufVxuXG4vKipcbiAqIFRoZSBBbmd1bGFyIHBsYXRmb3JtIGlzIHRoZSBlbnRyeSBwb2ludCBmb3IgQW5ndWxhciBvbiBhIHdlYiBwYWdlLiBFYWNoIHBhZ2VcbiAqIGhhcyBleGFjdGx5IG9uZSBwbGF0Zm9ybSwgYW5kIHNlcnZpY2VzIChzdWNoIGFzIHJlZmxlY3Rpb24pIHdoaWNoIGFyZSBjb21tb25cbiAqIHRvIGV2ZXJ5IEFuZ3VsYXIgYXBwbGljYXRpb24gcnVubmluZyBvbiB0aGUgcGFnZSBhcmUgYm91bmQgaW4gaXRzIHNjb3BlLlxuICpcbiAqIEEgcGFnZSdzIHBsYXRmb3JtIGlzIGluaXRpYWxpemVkIGltcGxpY2l0bHkgd2hlbiB7QGxpbmsgYm9vdHN0cmFwfSgpIGlzIGNhbGxlZCwgb3JcbiAqIGV4cGxpY2l0bHkgYnkgY2FsbGluZyB7QGxpbmsgcGxhdGZvcm19KCkuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQbGF0Zm9ybVJlZiB7XG4gIC8qKlxuICAgKiBSZWdpc3RlciBhIGxpc3RlbmVyIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBwbGF0Zm9ybSBpcyBkaXNwb3NlZC5cbiAgICovXG4gIGFic3RyYWN0IHJlZ2lzdGVyRGlzcG9zZUxpc3RlbmVyKGRpc3Bvc2U6ICgpID0+IHZvaWQpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSB0aGUgcGxhdGZvcm0ge0BsaW5rIEluamVjdG9yfSwgd2hpY2ggaXMgdGhlIHBhcmVudCBpbmplY3RvciBmb3JcbiAgICogZXZlcnkgQW5ndWxhciBhcHBsaWNhdGlvbiBvbiB0aGUgcGFnZSBhbmQgcHJvdmlkZXMgc2luZ2xldG9uIHByb3ZpZGVycy5cbiAgICovXG4gIGdldCBpbmplY3RvcigpOiBJbmplY3RvciB7IHRocm93IHVuaW1wbGVtZW50ZWQoKTsgfTtcblxuICAvKipcbiAgICogSW5zdGFudGlhdGUgYSBuZXcgQW5ndWxhciBhcHBsaWNhdGlvbiBvbiB0aGUgcGFnZS5cbiAgICpcbiAgICogIyMjIFdoYXQgaXMgYW4gYXBwbGljYXRpb24/XG4gICAqXG4gICAqIEVhY2ggQW5ndWxhciBhcHBsaWNhdGlvbiBoYXMgaXRzIG93biB6b25lLCBjaGFuZ2UgZGV0ZWN0aW9uLCBjb21waWxlcixcbiAgICogcmVuZGVyZXIsIGFuZCBvdGhlciBmcmFtZXdvcmsgY29tcG9uZW50cy4gQW4gYXBwbGljYXRpb24gaG9zdHMgb25lIG9yIG1vcmVcbiAgICogcm9vdCBjb21wb25lbnRzLCB3aGljaCBjYW4gYmUgaW5pdGlhbGl6ZWQgdmlhIGBBcHBsaWNhdGlvblJlZi5ib290c3RyYXAoKWAuXG4gICAqXG4gICAqICMjIyBBcHBsaWNhdGlvbiBQcm92aWRlcnNcbiAgICpcbiAgICogQW5ndWxhciBhcHBsaWNhdGlvbnMgcmVxdWlyZSBudW1lcm91cyBwcm92aWRlcnMgdG8gYmUgcHJvcGVybHkgaW5zdGFudGlhdGVkLlxuICAgKiBXaGVuIHVzaW5nIGBhcHBsaWNhdGlvbigpYCB0byBjcmVhdGUgYSBuZXcgYXBwIG9uIHRoZSBwYWdlLCB0aGVzZSBwcm92aWRlcnNcbiAgICogbXVzdCBiZSBwcm92aWRlZC4gRm9ydHVuYXRlbHksIHRoZXJlIGFyZSBoZWxwZXIgZnVuY3Rpb25zIHRvIGNvbmZpZ3VyZVxuICAgKiB0eXBpY2FsIHByb3ZpZGVycywgYXMgc2hvd24gaW4gdGhlIGV4YW1wbGUgYmVsb3cuXG4gICAqXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSBjb3JlL3RzL3BsYXRmb3JtL3BsYXRmb3JtLnRzIHJlZ2lvbj0nbG9uZ2Zvcm0nfVxuICAgKiAjIyMgU2VlIEFsc29cbiAgICpcbiAgICogU2VlIHRoZSB7QGxpbmsgYm9vdHN0cmFwfSBkb2N1bWVudGF0aW9uIGZvciBtb3JlIGRldGFpbHMuXG4gICAqL1xuICBhYnN0cmFjdCBhcHBsaWNhdGlvbihwcm92aWRlcnM6IEFycmF5PFR5cGUgfCBQcm92aWRlciB8IGFueVtdPik6IEFwcGxpY2F0aW9uUmVmO1xuXG4gIC8qKlxuICAgKiBJbnN0YW50aWF0ZSBhIG5ldyBBbmd1bGFyIGFwcGxpY2F0aW9uIG9uIHRoZSBwYWdlLCB1c2luZyBwcm92aWRlcnMgd2hpY2hcbiAgICogYXJlIG9ubHkgYXZhaWxhYmxlIGFzeW5jaHJvbm91c2x5LiBPbmUgc3VjaCB1c2UgY2FzZSBpcyB0byBpbml0aWFsaXplIGFuXG4gICAqIGFwcGxpY2F0aW9uIHJ1bm5pbmcgaW4gYSB3ZWIgd29ya2VyLlxuICAgKlxuICAgKiAjIyMgVXNhZ2VcbiAgICpcbiAgICogYGJpbmRpbmdGbmAgaXMgYSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIGluIHRoZSBuZXcgYXBwbGljYXRpb24ncyB6b25lLlxuICAgKiBJdCBzaG91bGQgcmV0dXJuIGEgYFByb21pc2VgIHRvIGEgbGlzdCBvZiBwcm92aWRlcnMgdG8gYmUgdXNlZCBmb3IgdGhlXG4gICAqIG5ldyBhcHBsaWNhdGlvbi4gT25jZSB0aGlzIHByb21pc2UgcmVzb2x2ZXMsIHRoZSBhcHBsaWNhdGlvbiB3aWxsIGJlXG4gICAqIGNvbnN0cnVjdGVkIGluIHRoZSBzYW1lIG1hbm5lciBhcyBhIG5vcm1hbCBgYXBwbGljYXRpb24oKWAuXG4gICAqL1xuICBhYnN0cmFjdCBhc3luY0FwcGxpY2F0aW9uKGJpbmRpbmdGbjogKHpvbmU6IE5nWm9uZSkgPT4gUHJvbWlzZTxBcnJheTxUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXT4+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVycz86IEFycmF5PFR5cGUgfCBQcm92aWRlciB8IGFueVtdPik6IFByb21pc2U8QXBwbGljYXRpb25SZWY+O1xuXG4gIC8qKlxuICAgKiBEZXN0cm95IHRoZSBBbmd1bGFyIHBsYXRmb3JtIGFuZCBhbGwgQW5ndWxhciBhcHBsaWNhdGlvbnMgb24gdGhlIHBhZ2UuXG4gICAqL1xuICBhYnN0cmFjdCBkaXNwb3NlKCk6IHZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBQbGF0Zm9ybVJlZl8gZXh0ZW5kcyBQbGF0Zm9ybVJlZiB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2FwcGxpY2F0aW9uczogQXBwbGljYXRpb25SZWZbXSA9IFtdO1xuICAvKiogQGludGVybmFsICovXG4gIF9kaXNwb3NlTGlzdGVuZXJzOiBGdW5jdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yLCBwcml2YXRlIF9kaXNwb3NlOiAoKSA9PiB2b2lkKSB7IHN1cGVyKCk7IH1cblxuICByZWdpc3RlckRpc3Bvc2VMaXN0ZW5lcihkaXNwb3NlOiAoKSA9PiB2b2lkKTogdm9pZCB7IHRoaXMuX2Rpc3Bvc2VMaXN0ZW5lcnMucHVzaChkaXNwb3NlKTsgfVxuXG4gIGdldCBpbmplY3RvcigpOiBJbmplY3RvciB7IHJldHVybiB0aGlzLl9pbmplY3RvcjsgfVxuXG4gIGFwcGxpY2F0aW9uKHByb3ZpZGVyczogQXJyYXk8VHlwZSB8IFByb3ZpZGVyIHwgYW55W10+KTogQXBwbGljYXRpb25SZWYge1xuICAgIHZhciBhcHAgPSB0aGlzLl9pbml0QXBwKGNyZWF0ZU5nWm9uZSgpLCBwcm92aWRlcnMpO1xuICAgIGlmIChQcm9taXNlV3JhcHBlci5pc1Byb21pc2UoYXBwKSkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgICAgXCJDYW5ub3QgdXNlIGFzeW5jcm9ub3VzIGFwcCBpbml0aWFsaXplcnMgd2l0aCBhcHBsaWNhdGlvbi4gVXNlIGFzeW5jQXBwbGljYXRpb24gaW5zdGVhZC5cIik7XG4gICAgfVxuICAgIHJldHVybiA8QXBwbGljYXRpb25SZWY+YXBwO1xuICB9XG5cbiAgYXN5bmNBcHBsaWNhdGlvbihiaW5kaW5nRm46ICh6b25lOiBOZ1pvbmUpID0+IFByb21pc2U8QXJyYXk8VHlwZSB8IFByb3ZpZGVyIHwgYW55W10+PixcbiAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsUHJvdmlkZXJzPzogQXJyYXk8VHlwZSB8IFByb3ZpZGVyIHwgYW55W10+KTogUHJvbWlzZTxBcHBsaWNhdGlvblJlZj4ge1xuICAgIHZhciB6b25lID0gY3JlYXRlTmdab25lKCk7XG4gICAgdmFyIGNvbXBsZXRlciA9IFByb21pc2VXcmFwcGVyLmNvbXBsZXRlcjxBcHBsaWNhdGlvblJlZj4oKTtcbiAgICBpZiAoYmluZGluZ0ZuID09PSBudWxsKSB7XG4gICAgICBjb21wbGV0ZXIucmVzb2x2ZSh0aGlzLl9pbml0QXBwKHpvbmUsIGFkZGl0aW9uYWxQcm92aWRlcnMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICBQcm9taXNlV3JhcHBlci50aGVuKGJpbmRpbmdGbih6b25lKSwgKHByb3ZpZGVyczogQXJyYXk8VHlwZSB8IFByb3ZpZGVyIHwgYW55W10+KSA9PiB7XG4gICAgICAgICAgaWYgKGlzUHJlc2VudChhZGRpdGlvbmFsUHJvdmlkZXJzKSkge1xuICAgICAgICAgICAgcHJvdmlkZXJzID0gTGlzdFdyYXBwZXIuY29uY2F0KHByb3ZpZGVycywgYWRkaXRpb25hbFByb3ZpZGVycyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxldCBwcm9taXNlID0gdGhpcy5faW5pdEFwcCh6b25lLCBwcm92aWRlcnMpO1xuICAgICAgICAgIGNvbXBsZXRlci5yZXNvbHZlKHByb21pc2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gY29tcGxldGVyLnByb21pc2U7XG4gIH1cblxuICBwcml2YXRlIF9pbml0QXBwKHpvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgICAgICBwcm92aWRlcnM6IEFycmF5PFR5cGUgfCBQcm92aWRlciB8IGFueVtdPik6IFByb21pc2U8QXBwbGljYXRpb25SZWY+fFxuICAgICAgQXBwbGljYXRpb25SZWYge1xuICAgIHZhciBpbmplY3RvcjogSW5qZWN0b3I7XG4gICAgdmFyIGFwcDogQXBwbGljYXRpb25SZWY7XG4gICAgem9uZS5ydW4oKCkgPT4ge1xuICAgICAgcHJvdmlkZXJzID0gTGlzdFdyYXBwZXIuY29uY2F0KHByb3ZpZGVycywgW1xuICAgICAgICBwcm92aWRlKE5nWm9uZSwge3VzZVZhbHVlOiB6b25lfSksXG4gICAgICAgIHByb3ZpZGUoQXBwbGljYXRpb25SZWYsIHt1c2VGYWN0b3J5OiAoKTogQXBwbGljYXRpb25SZWYgPT4gYXBwLCBkZXBzOiBbXX0pXG4gICAgICBdKTtcblxuICAgICAgdmFyIGV4Y2VwdGlvbkhhbmRsZXI6IEZ1bmN0aW9uO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaW5qZWN0b3IgPSB0aGlzLmluamVjdG9yLnJlc29sdmVBbmRDcmVhdGVDaGlsZChwcm92aWRlcnMpO1xuICAgICAgICBleGNlcHRpb25IYW5kbGVyID0gaW5qZWN0b3IuZ2V0KEV4Y2VwdGlvbkhhbmRsZXIpO1xuICAgICAgICBPYnNlcnZhYmxlV3JhcHBlci5zdWJzY3JpYmUoem9uZS5vbkVycm9yLCAoZXJyb3I6IE5nWm9uZUVycm9yKSA9PiB7XG4gICAgICAgICAgZXhjZXB0aW9uSGFuZGxlci5jYWxsKGVycm9yLmVycm9yLCBlcnJvci5zdGFja1RyYWNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoZXhjZXB0aW9uSGFuZGxlcikpIHtcbiAgICAgICAgICBleGNlcHRpb25IYW5kbGVyLmNhbGwoZSwgZS5zdGFjayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJpbnQoZS50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIGFwcCA9IG5ldyBBcHBsaWNhdGlvblJlZl8odGhpcywgem9uZSwgaW5qZWN0b3IpO1xuICAgIHRoaXMuX2FwcGxpY2F0aW9ucy5wdXNoKGFwcCk7XG4gICAgdmFyIHByb21pc2UgPSBfcnVuQXBwSW5pdGlhbGl6ZXJzKGluamVjdG9yKTtcbiAgICBpZiAocHJvbWlzZSAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFByb21pc2VXcmFwcGVyLnRoZW4ocHJvbWlzZSwgKF8pID0+IGFwcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBhcHA7XG4gICAgfVxuICB9XG5cbiAgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICBMaXN0V3JhcHBlci5jbG9uZSh0aGlzLl9hcHBsaWNhdGlvbnMpLmZvckVhY2goKGFwcCkgPT4gYXBwLmRpc3Bvc2UoKSk7XG4gICAgdGhpcy5fZGlzcG9zZUxpc3RlbmVycy5mb3JFYWNoKChkaXNwb3NlKSA9PiBkaXNwb3NlKCkpO1xuICAgIHRoaXMuX2Rpc3Bvc2UoKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2FwcGxpY2F0aW9uRGlzcG9zZWQoYXBwOiBBcHBsaWNhdGlvblJlZik6IHZvaWQgeyBMaXN0V3JhcHBlci5yZW1vdmUodGhpcy5fYXBwbGljYXRpb25zLCBhcHApOyB9XG59XG5cbmZ1bmN0aW9uIF9ydW5BcHBJbml0aWFsaXplcnMoaW5qZWN0b3I6IEluamVjdG9yKTogUHJvbWlzZTxhbnk+IHtcbiAgbGV0IGluaXRzOiBGdW5jdGlvbltdID0gaW5qZWN0b3IuZ2V0T3B0aW9uYWwoQVBQX0lOSVRJQUxJWkVSKTtcbiAgbGV0IHByb21pc2VzOiBQcm9taXNlPGFueT5bXSA9IFtdO1xuICBpZiAoaXNQcmVzZW50KGluaXRzKSkge1xuICAgIGluaXRzLmZvckVhY2goaW5pdCA9PiB7XG4gICAgICB2YXIgcmV0VmFsID0gaW5pdCgpO1xuICAgICAgaWYgKFByb21pc2VXcmFwcGVyLmlzUHJvbWlzZShyZXRWYWwpKSB7XG4gICAgICAgIHByb21pc2VzLnB1c2gocmV0VmFsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBpZiAocHJvbWlzZXMubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBQcm9taXNlV3JhcHBlci5hbGwocHJvbWlzZXMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8qKlxuICogQSByZWZlcmVuY2UgdG8gYW4gQW5ndWxhciBhcHBsaWNhdGlvbiBydW5uaW5nIG9uIGEgcGFnZS5cbiAqXG4gKiBGb3IgbW9yZSBhYm91dCBBbmd1bGFyIGFwcGxpY2F0aW9ucywgc2VlIHRoZSBkb2N1bWVudGF0aW9uIGZvciB7QGxpbmsgYm9vdHN0cmFwfS5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFwcGxpY2F0aW9uUmVmIHtcbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGEgbGlzdGVuZXIgdG8gYmUgY2FsbGVkIGVhY2ggdGltZSBgYm9vdHN0cmFwKClgIGlzIGNhbGxlZCB0byBib290c3RyYXBcbiAgICogYSBuZXcgcm9vdCBjb21wb25lbnQuXG4gICAqL1xuICBhYnN0cmFjdCByZWdpc3RlckJvb3RzdHJhcExpc3RlbmVyKGxpc3RlbmVyOiAocmVmOiBDb21wb25lbnRSZWYpID0+IHZvaWQpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhIGxpc3RlbmVyIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBhcHBsaWNhdGlvbiBpcyBkaXNwb3NlZC5cbiAgICovXG4gIGFic3RyYWN0IHJlZ2lzdGVyRGlzcG9zZUxpc3RlbmVyKGRpc3Bvc2U6ICgpID0+IHZvaWQpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBCb290c3RyYXAgYSBuZXcgY29tcG9uZW50IGF0IHRoZSByb290IGxldmVsIG9mIHRoZSBhcHBsaWNhdGlvbi5cbiAgICpcbiAgICogIyMjIEJvb3RzdHJhcCBwcm9jZXNzXG4gICAqXG4gICAqIFdoZW4gYm9vdHN0cmFwcGluZyBhIG5ldyByb290IGNvbXBvbmVudCBpbnRvIGFuIGFwcGxpY2F0aW9uLCBBbmd1bGFyIG1vdW50cyB0aGVcbiAgICogc3BlY2lmaWVkIGFwcGxpY2F0aW9uIGNvbXBvbmVudCBvbnRvIERPTSBlbGVtZW50cyBpZGVudGlmaWVkIGJ5IHRoZSBbY29tcG9uZW50VHlwZV0nc1xuICAgKiBzZWxlY3RvciBhbmQga2lja3Mgb2ZmIGF1dG9tYXRpYyBjaGFuZ2UgZGV0ZWN0aW9uIHRvIGZpbmlzaCBpbml0aWFsaXppbmcgdGhlIGNvbXBvbmVudC5cbiAgICpcbiAgICogIyMjIE9wdGlvbmFsIFByb3ZpZGVyc1xuICAgKlxuICAgKiBQcm92aWRlcnMgZm9yIHRoZSBnaXZlbiBjb21wb25lbnQgY2FuIG9wdGlvbmFsbHkgYmUgb3ZlcnJpZGRlbiB2aWEgdGhlIGBwcm92aWRlcnNgXG4gICAqIHBhcmFtZXRlci4gVGhlc2UgcHJvdmlkZXJzIHdpbGwgb25seSBhcHBseSBmb3IgdGhlIHJvb3QgY29tcG9uZW50IGJlaW5nIGFkZGVkIGFuZCBhbnlcbiAgICogY2hpbGQgY29tcG9uZW50cyB1bmRlciBpdC5cbiAgICpcbiAgICogIyMjIEV4YW1wbGVcbiAgICoge0BleGFtcGxlIGNvcmUvdHMvcGxhdGZvcm0vcGxhdGZvcm0udHMgcmVnaW9uPSdsb25nZm9ybSd9XG4gICAqL1xuICBhYnN0cmFjdCBib290c3RyYXAoY29tcG9uZW50VHlwZTogVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVycz86IEFycmF5PFR5cGUgfCBQcm92aWRlciB8IGFueVtdPik6IFByb21pc2U8Q29tcG9uZW50UmVmPjtcblxuICAvKipcbiAgICogUmV0cmlldmUgdGhlIGFwcGxpY2F0aW9uIHtAbGluayBJbmplY3Rvcn0uXG4gICAqL1xuICBnZXQgaW5qZWN0b3IoKTogSW5qZWN0b3IgeyByZXR1cm4gPEluamVjdG9yPnVuaW1wbGVtZW50ZWQoKTsgfTtcblxuICAvKipcbiAgICogUmV0cmlldmUgdGhlIGFwcGxpY2F0aW9uIHtAbGluayBOZ1pvbmV9LlxuICAgKi9cbiAgZ2V0IHpvbmUoKTogTmdab25lIHsgcmV0dXJuIDxOZ1pvbmU+dW5pbXBsZW1lbnRlZCgpOyB9O1xuXG4gIC8qKlxuICAgKiBEaXNwb3NlIG9mIHRoaXMgYXBwbGljYXRpb24gYW5kIGFsbCBvZiBpdHMgY29tcG9uZW50cy5cbiAgICovXG4gIGFic3RyYWN0IGRpc3Bvc2UoKTogdm9pZDtcblxuICAvKipcbiAgICogSW52b2tlIHRoaXMgbWV0aG9kIHRvIGV4cGxpY2l0bHkgcHJvY2VzcyBjaGFuZ2UgZGV0ZWN0aW9uIGFuZCBpdHMgc2lkZS1lZmZlY3RzLlxuICAgKlxuICAgKiBJbiBkZXZlbG9wbWVudCBtb2RlLCBgdGljaygpYCBhbHNvIHBlcmZvcm1zIGEgc2Vjb25kIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUgdG8gZW5zdXJlIHRoYXQgbm9cbiAgICogZnVydGhlciBjaGFuZ2VzIGFyZSBkZXRlY3RlZC4gSWYgYWRkaXRpb25hbCBjaGFuZ2VzIGFyZSBwaWNrZWQgdXAgZHVyaW5nIHRoaXMgc2Vjb25kIGN5Y2xlLFxuICAgKiBiaW5kaW5ncyBpbiB0aGUgYXBwIGhhdmUgc2lkZS1lZmZlY3RzIHRoYXQgY2Fubm90IGJlIHJlc29sdmVkIGluIGEgc2luZ2xlIGNoYW5nZSBkZXRlY3Rpb25cbiAgICogcGFzcy5cbiAgICogSW4gdGhpcyBjYXNlLCBBbmd1bGFyIHRocm93cyBhbiBlcnJvciwgc2luY2UgYW4gQW5ndWxhciBhcHBsaWNhdGlvbiBjYW4gb25seSBoYXZlIG9uZSBjaGFuZ2VcbiAgICogZGV0ZWN0aW9uIHBhc3MgZHVyaW5nIHdoaWNoIGFsbCBjaGFuZ2UgZGV0ZWN0aW9uIG11c3QgY29tcGxldGUuXG4gICAqL1xuICBhYnN0cmFjdCB0aWNrKCk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEdldCBhIGxpc3Qgb2YgY29tcG9uZW50IHR5cGVzIHJlZ2lzdGVyZWQgdG8gdGhpcyBhcHBsaWNhdGlvbi5cbiAgICovXG4gIGdldCBjb21wb25lbnRUeXBlcygpOiBUeXBlW10geyByZXR1cm4gPFR5cGVbXT51bmltcGxlbWVudGVkKCk7IH07XG59XG5cbmV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvblJlZl8gZXh0ZW5kcyBBcHBsaWNhdGlvblJlZiB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgc3RhdGljIF90aWNrU2NvcGU6IFd0ZlNjb3BlRm4gPSB3dGZDcmVhdGVTY29wZSgnQXBwbGljYXRpb25SZWYjdGljaygpJyk7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIF9ib290c3RyYXBMaXN0ZW5lcnM6IEZ1bmN0aW9uW10gPSBbXTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIF9kaXNwb3NlTGlzdGVuZXJzOiBGdW5jdGlvbltdID0gW107XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJpdmF0ZSBfcm9vdENvbXBvbmVudHM6IENvbXBvbmVudFJlZltdID0gW107XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJpdmF0ZSBfcm9vdENvbXBvbmVudFR5cGVzOiBUeXBlW10gPSBbXTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZnM6IENoYW5nZURldGVjdG9yUmVmW10gPSBbXTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIF9ydW5uaW5nVGljazogYm9vbGVhbiA9IGZhbHNlO1xuICAvKiogQGludGVybmFsICovXG4gIHByaXZhdGUgX2VuZm9yY2VOb05ld0NoYW5nZXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wbGF0Zm9ybTogUGxhdGZvcm1SZWZfLCBwcml2YXRlIF96b25lOiBOZ1pvbmUsIHByaXZhdGUgX2luamVjdG9yOiBJbmplY3Rvcikge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl96b25lKSkge1xuICAgICAgT2JzZXJ2YWJsZVdyYXBwZXIuc3Vic2NyaWJlKHRoaXMuX3pvbmUub25NaWNyb3Rhc2tFbXB0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoXykgPT4geyB0aGlzLl96b25lLnJ1bigoKSA9PiB7IHRoaXMudGljaygpOyB9KTsgfSk7XG4gICAgfVxuICAgIHRoaXMuX2VuZm9yY2VOb05ld0NoYW5nZXMgPSBhc3NlcnRpb25zRW5hYmxlZCgpO1xuICB9XG5cbiAgcmVnaXN0ZXJCb290c3RyYXBMaXN0ZW5lcihsaXN0ZW5lcjogKHJlZjogQ29tcG9uZW50UmVmKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fYm9vdHN0cmFwTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICB9XG5cbiAgcmVnaXN0ZXJEaXNwb3NlTGlzdGVuZXIoZGlzcG9zZTogKCkgPT4gdm9pZCk6IHZvaWQgeyB0aGlzLl9kaXNwb3NlTGlzdGVuZXJzLnB1c2goZGlzcG9zZSk7IH1cblxuICByZWdpc3RlckNoYW5nZURldGVjdG9yKGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZik6IHZvaWQge1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmcy5wdXNoKGNoYW5nZURldGVjdG9yKTtcbiAgfVxuXG4gIHVucmVnaXN0ZXJDaGFuZ2VEZXRlY3RvcihjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYpOiB2b2lkIHtcbiAgICBMaXN0V3JhcHBlci5yZW1vdmUodGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWZzLCBjaGFuZ2VEZXRlY3Rvcik7XG4gIH1cblxuICBib290c3RyYXAoY29tcG9uZW50VHlwZTogVHlwZSxcbiAgICAgICAgICAgIHByb3ZpZGVycz86IEFycmF5PFR5cGUgfCBQcm92aWRlciB8IGFueVtdPik6IFByb21pc2U8Q29tcG9uZW50UmVmPiB7XG4gICAgdmFyIGNvbXBsZXRlciA9IFByb21pc2VXcmFwcGVyLmNvbXBsZXRlcigpO1xuICAgIHRoaXMuX3pvbmUucnVuKCgpID0+IHtcbiAgICAgIHZhciBjb21wb25lbnRQcm92aWRlcnMgPSBfY29tcG9uZW50UHJvdmlkZXJzKGNvbXBvbmVudFR5cGUpO1xuICAgICAgaWYgKGlzUHJlc2VudChwcm92aWRlcnMpKSB7XG4gICAgICAgIGNvbXBvbmVudFByb3ZpZGVycy5wdXNoKHByb3ZpZGVycyk7XG4gICAgICB9XG4gICAgICB2YXIgZXhjZXB0aW9uSGFuZGxlciA9IHRoaXMuX2luamVjdG9yLmdldChFeGNlcHRpb25IYW5kbGVyKTtcbiAgICAgIHRoaXMuX3Jvb3RDb21wb25lbnRUeXBlcy5wdXNoKGNvbXBvbmVudFR5cGUpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIGluamVjdG9yOiBJbmplY3RvciA9IHRoaXMuX2luamVjdG9yLnJlc29sdmVBbmRDcmVhdGVDaGlsZChjb21wb25lbnRQcm92aWRlcnMpO1xuICAgICAgICB2YXIgY29tcFJlZlRva2VuOiBQcm9taXNlPENvbXBvbmVudFJlZj4gPSBpbmplY3Rvci5nZXQoQVBQX0NPTVBPTkVOVF9SRUZfUFJPTUlTRSk7XG4gICAgICAgIHZhciB0aWNrID0gKGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmKSA9PiB7XG4gICAgICAgICAgdGhpcy5fbG9hZENvbXBvbmVudChjb21wb25lbnRSZWYpO1xuICAgICAgICAgIGNvbXBsZXRlci5yZXNvbHZlKGNvbXBvbmVudFJlZik7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHRpY2tSZXN1bHQgPSBQcm9taXNlV3JhcHBlci50aGVuKGNvbXBSZWZUb2tlbiwgdGljayk7XG5cbiAgICAgICAgUHJvbWlzZVdyYXBwZXIudGhlbih0aWNrUmVzdWx0LCBudWxsLCAoZXJyLCBzdGFja1RyYWNlKSA9PiB7XG4gICAgICAgICAgY29tcGxldGVyLnJlamVjdChlcnIsIHN0YWNrVHJhY2UpO1xuICAgICAgICAgIGV4Y2VwdGlvbkhhbmRsZXIuY2FsbChlcnIsIHN0YWNrVHJhY2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZXhjZXB0aW9uSGFuZGxlci5jYWxsKGUsIGUuc3RhY2spO1xuICAgICAgICBjb21wbGV0ZXIucmVqZWN0KGUsIGUuc3RhY2spO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjb21wbGV0ZXIucHJvbWlzZS50aGVuPENvbXBvbmVudFJlZj4oKHJlZjogQ29tcG9uZW50UmVmKSA9PiB7XG4gICAgICBsZXQgYyA9IHRoaXMuX2luamVjdG9yLmdldChDb25zb2xlKTtcbiAgICAgIGlmIChhc3NlcnRpb25zRW5hYmxlZCgpKSB7XG4gICAgICAgIGMubG9nKFxuICAgICAgICAgICAgXCJBbmd1bGFyIDIgaXMgcnVubmluZyBpbiB0aGUgZGV2ZWxvcG1lbnQgbW9kZS4gQ2FsbCBlbmFibGVQcm9kTW9kZSgpIHRvIGVuYWJsZSB0aGUgcHJvZHVjdGlvbiBtb2RlLlwiKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZWY7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9sb2FkQ29tcG9uZW50KGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmKTogdm9pZCB7XG4gICAgdmFyIGFwcENoYW5nZURldGVjdG9yID1cbiAgICAgICAgKDxFbGVtZW50UmVmXz5jb21wb25lbnRSZWYubG9jYXRpb24pLmludGVybmFsRWxlbWVudC5wYXJlbnRWaWV3LmNoYW5nZURldGVjdG9yO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmcy5wdXNoKGFwcENoYW5nZURldGVjdG9yLnJlZik7XG4gICAgdGhpcy50aWNrKCk7XG4gICAgdGhpcy5fcm9vdENvbXBvbmVudHMucHVzaChjb21wb25lbnRSZWYpO1xuICAgIHRoaXMuX2Jvb3RzdHJhcExpc3RlbmVycy5mb3JFYWNoKChsaXN0ZW5lcikgPT4gbGlzdGVuZXIoY29tcG9uZW50UmVmKSk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF91bmxvYWRDb21wb25lbnQoY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWYpOiB2b2lkIHtcbiAgICBpZiAoIUxpc3RXcmFwcGVyLmNvbnRhaW5zKHRoaXMuX3Jvb3RDb21wb25lbnRzLCBjb21wb25lbnRSZWYpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudW5yZWdpc3RlckNoYW5nZURldGVjdG9yKFxuICAgICAgICAoPEVsZW1lbnRSZWZfPmNvbXBvbmVudFJlZi5sb2NhdGlvbikuaW50ZXJuYWxFbGVtZW50LnBhcmVudFZpZXcuY2hhbmdlRGV0ZWN0b3IucmVmKTtcbiAgICBMaXN0V3JhcHBlci5yZW1vdmUodGhpcy5fcm9vdENvbXBvbmVudHMsIGNvbXBvbmVudFJlZik7XG4gIH1cblxuICBnZXQgaW5qZWN0b3IoKTogSW5qZWN0b3IgeyByZXR1cm4gdGhpcy5faW5qZWN0b3I7IH1cblxuICBnZXQgem9uZSgpOiBOZ1pvbmUgeyByZXR1cm4gdGhpcy5fem9uZTsgfVxuXG4gIHRpY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3J1bm5pbmdUaWNrKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcIkFwcGxpY2F0aW9uUmVmLnRpY2sgaXMgY2FsbGVkIHJlY3Vyc2l2ZWx5XCIpO1xuICAgIH1cblxuICAgIHZhciBzID0gQXBwbGljYXRpb25SZWZfLl90aWNrU2NvcGUoKTtcbiAgICB0cnkge1xuICAgICAgdGhpcy5fcnVubmluZ1RpY2sgPSB0cnVlO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWZzLmZvckVhY2goKGRldGVjdG9yKSA9PiBkZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCkpO1xuICAgICAgaWYgKHRoaXMuX2VuZm9yY2VOb05ld0NoYW5nZXMpIHtcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWZzLmZvckVhY2goKGRldGVjdG9yKSA9PiBkZXRlY3Rvci5jaGVja05vQ2hhbmdlcygpKTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5fcnVubmluZ1RpY2sgPSBmYWxzZTtcbiAgICAgIHd0ZkxlYXZlKHMpO1xuICAgIH1cbiAgfVxuXG4gIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgLy8gVE9ETyhhbHhodWIpOiBEaXNwb3NlIG9mIHRoZSBOZ1pvbmUuXG4gICAgTGlzdFdyYXBwZXIuY2xvbmUodGhpcy5fcm9vdENvbXBvbmVudHMpLmZvckVhY2goKHJlZikgPT4gcmVmLmRpc3Bvc2UoKSk7XG4gICAgdGhpcy5fZGlzcG9zZUxpc3RlbmVycy5mb3JFYWNoKChkaXNwb3NlKSA9PiBkaXNwb3NlKCkpO1xuICAgIHRoaXMuX3BsYXRmb3JtLl9hcHBsaWNhdGlvbkRpc3Bvc2VkKHRoaXMpO1xuICB9XG5cbiAgZ2V0IGNvbXBvbmVudFR5cGVzKCk6IFR5cGVbXSB7IHJldHVybiB0aGlzLl9yb290Q29tcG9uZW50VHlwZXM7IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
