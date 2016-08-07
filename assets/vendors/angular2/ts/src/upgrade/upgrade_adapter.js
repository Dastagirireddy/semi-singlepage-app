System.register(['angular2/core', 'angular2/src/facade/lang', 'angular2/src/facade/async', 'angular2/platform/browser', './metadata', './util', './constants', './downgrade_ng2_adapter', './upgrade_ng1_adapter', './angular_js'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, lang_1, async_1, browser_1, metadata_1, util_1, constants_1, downgrade_ng2_adapter_1, upgrade_ng1_adapter_1, angular;
    var upgradeCount, UpgradeAdapter, UpgradeAdapterRef;
    function ng1ComponentDirective(info, idPrefix) {
        directiveFactory.$inject = [constants_1.NG2_COMPONENT_FACTORY_REF_MAP, constants_1.NG1_PARSE];
        function directiveFactory(componentFactoryRefMap, parse) {
            var componentFactory = componentFactoryRefMap[info.selector];
            if (!componentFactory)
                throw new Error('Expecting ComponentFactory for: ' + info.selector);
            var idCount = 0;
            return {
                restrict: 'E',
                require: constants_1.REQUIRE_INJECTOR,
                link: {
                    post: function (scope, element, attrs, parentInjector, transclude) {
                        var domElement = element[0];
                        var facade = new downgrade_ng2_adapter_1.DowngradeNg2ComponentAdapter(idPrefix + (idCount++), info, element, attrs, scope, parentInjector, parse, componentFactory);
                        facade.setupInputs();
                        facade.bootstrapNg2();
                        facade.projectContent();
                        facade.setupOutputs();
                        facade.registerCleanup();
                    }
                }
            };
        }
        return directiveFactory;
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (metadata_1_1) {
                metadata_1 = metadata_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            },
            function (downgrade_ng2_adapter_1_1) {
                downgrade_ng2_adapter_1 = downgrade_ng2_adapter_1_1;
            },
            function (upgrade_ng1_adapter_1_1) {
                upgrade_ng1_adapter_1 = upgrade_ng1_adapter_1_1;
            },
            function (angular_1) {
                angular = angular_1;
            }],
        execute: function() {
            upgradeCount = 0;
            /**
             * Use `UpgradeAdapter` to allow AngularJS v1 and Angular v2 to coexist in a single application.
             *
             * The `UpgradeAdapter` allows:
             * 1. creation of Angular v2 component from AngularJS v1 component directive
             *    (See [UpgradeAdapter#upgradeNg1Component()])
             * 2. creation of AngularJS v1 directive from Angular v2 component.
             *    (See [UpgradeAdapter#downgradeNg2Component()])
             * 3. Bootstrapping of a hybrid Angular application which contains both of the frameworks
             *    coexisting in a single application.
             *
             * ## Mental Model
             *
             * When reasoning about how a hybrid application works it is useful to have a mental model which
             * describes what is happening and explains what is happening at the lowest level.
             *
             * 1. There are two independent frameworks running in a single application, each framework treats
             *    the other as a black box.
             * 2. Each DOM element on the page is owned exactly by one framework. Whichever framework
             *    instantiated the element is the owner. Each framework only updates/interacts with its own
             *    DOM elements and ignores others.
             * 3. AngularJS v1 directives always execute inside AngularJS v1 framework codebase regardless of
             *    where they are instantiated.
             * 4. Angular v2 components always execute inside Angular v2 framework codebase regardless of
             *    where they are instantiated.
             * 5. An AngularJS v1 component can be upgraded to an Angular v2 component. This creates an
             *    Angular v2 directive, which bootstraps the AngularJS v1 component directive in that location.
             * 6. An Angular v2 component can be downgraded to an AngularJS v1 component directive. This creates
             *    an AngularJS v1 directive, which bootstraps the Angular v2 component in that location.
             * 7. Whenever an adapter component is instantiated the host element is owned by the framework
             *    doing the instantiation. The other framework then instantiates and owns the view for that
             *    component. This implies that component bindings will always follow the semantics of the
             *    instantiation framework. The syntax is always that of Angular v2 syntax.
             * 8. AngularJS v1 is always bootstrapped first and owns the bottom most view.
             * 9. The new application is running in Angular v2 zone, and therefore it no longer needs calls to
             *    `$apply()`.
             *
             * ### Example
             *
             * ```
             * var adapter = new UpgradeAdapter();
             * var module = angular.module('myExample', []);
             * module.directive('ng2', adapter.downgradeNg2Component(Ng2));
             *
             * module.directive('ng1', function() {
             *   return {
             *      scope: { title: '=' },
             *      template: 'ng1[Hello {{title}}!](<span ng-transclude></span>)'
             *   };
             * });
             *
             *
             * @Component({
             *   selector: 'ng2',
             *   inputs: ['name'],
             *   template: 'ng2[<ng1 [title]="name">transclude</ng1>](<ng-content></ng-content>)',
             *   directives: [adapter.upgradeNg1Component('ng1')]
             * })
             * class Ng2 {
             * }
             *
             * document.body.innerHTML = '<ng2 name="World">project</ng2>';
             *
             * adapter.bootstrap(document.body, ['myExample']).ready(function() {
             *   expect(document.body.textContent).toEqual(
             *       "ng2[ng1[Hello World!](transclude)](project)");
             * });
             * ```
             */
            UpgradeAdapter = (function () {
                function UpgradeAdapter() {
                    /* @internal */
                    this.idPrefix = "NG2_UPGRADE_" + upgradeCount++ + "_";
                    /* @internal */
                    this.upgradedComponents = [];
                    /* @internal */
                    this.downgradedComponents = {};
                    /* @internal */
                    this.providers = [];
                }
                /**
                 * Allows Angular v2 Component to be used from AngularJS v1.
                 *
                 * Use `downgradeNg2Component` to create an AngularJS v1 Directive Definition Factory from
                 * Angular v2 Component. The adapter will bootstrap Angular v2 component from within the
                 * AngularJS v1 template.
                 *
                 * ## Mental Model
                 *
                 * 1. The component is instantiated by being listed in AngularJS v1 template. This means that the
                 *    host element is controlled by AngularJS v1, but the component's view will be controlled by
                 *    Angular v2.
                 * 2. Even thought the component is instantiated in AngularJS v1, it will be using Angular v2
                 *    syntax. This has to be done, this way because we must follow Angular v2 components do not
                 *    declare how the attributes should be interpreted.
                 *
                 * ## Supported Features
                 *
                 * - Bindings:
                 *   - Attribute: `<comp name="World">`
                 *   - Interpolation:  `<comp greeting="Hello {{name}}!">`
                 *   - Expression:  `<comp [name]="username">`
                 *   - Event:  `<comp (close)="doSomething()">`
                 * - Content projection: yes
                 *
                 * ### Example
                 *
                 * ```
                 * var adapter = new UpgradeAdapter();
                 * var module = angular.module('myExample', []);
                 * module.directive('greet', adapter.downgradeNg2Component(Greeter));
                 *
                 * @Component({
                 *   selector: 'greet',
                 *   template: '{{salutation}} {{name}}! - <ng-content></ng-content>'
                 * })
                 * class Greeter {
                 *   @Input() salutation: string;
                 *   @Input() name: string;
                 * }
                 *
                 * document.body.innerHTML =
                 *   'ng1 template: <greet salutation="Hello" [name]="world">text</greet>';
                 *
                 * adapter.bootstrap(document.body, ['myExample']).ready(function() {
                 *   expect(document.body.textContent).toEqual("ng1 template: Hello world! - text");
                 * });
                 * ```
                 */
                UpgradeAdapter.prototype.downgradeNg2Component = function (type) {
                    this.upgradedComponents.push(type);
                    var info = metadata_1.getComponentInfo(type);
                    return ng1ComponentDirective(info, "" + this.idPrefix + info.selector + "_c");
                };
                /**
                 * Allows AngularJS v1 Component to be used from Angular v2.
                 *
                 * Use `upgradeNg1Component` to create an Angular v2 component from AngularJS v1 Component
                 * directive. The adapter will bootstrap AngularJS v1 component from within the Angular v2
                 * template.
                 *
                 * ## Mental Model
                 *
                 * 1. The component is instantiated by being listed in Angular v2 template. This means that the
                 *    host element is controlled by Angular v2, but the component's view will be controlled by
                 *    AngularJS v1.
                 *
                 * ## Supported Features
                 *
                 * - Bindings:
                 *   - Attribute: `<comp name="World">`
                 *   - Interpolation:  `<comp greeting="Hello {{name}}!">`
                 *   - Expression:  `<comp [name]="username">`
                 *   - Event:  `<comp (close)="doSomething()">`
                 * - Transclusion: yes
                 * - Only some of the features of
                 *   [Directive Definition Object](https://docs.angularjs.org/api/ng/service/$compile) are
                 *   supported:
                 *   - `compile`: not supported because the host element is owned by Angular v2, which does
                 *     not allow modifying DOM structure during compilation.
                 *   - `controller`: supported. (NOTE: injection of `$attrs` and `$transclude` is not supported.)
                 *   - `controllerAs': supported.
                 *   - `bindToController': supported.
                 *   - `link': supported. (NOTE: only pre-link function is supported.)
                 *   - `name': supported.
                 *   - `priority': ignored.
                 *   - `replace': not supported.
                 *   - `require`: supported.
                 *   - `restrict`: must be set to 'E'.
                 *   - `scope`: supported.
                 *   - `template`: supported.
                 *   - `templateUrl`: supported.
                 *   - `terminal`: ignored.
                 *   - `transclude`: supported.
                 *
                 *
                 * ### Example
                 *
                 * ```
                 * var adapter = new UpgradeAdapter();
                 * var module = angular.module('myExample', []);
                 *
                 * module.directive('greet', function() {
                 *   return {
                 *     scope: {salutation: '=', name: '=' },
                 *     template: '{{salutation}} {{name}}! - <span ng-transclude></span>'
                 *   };
                 * });
                 *
                 * module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                 *
                 * @Component({
                 *   selector: 'ng2',
                 *   template: 'ng2 template: <greet salutation="Hello" [name]="world">text</greet>'
                 *   directives: [adapter.upgradeNg1Component('greet')]
                 * })
                 * class Ng2 {
                 * }
                 *
                 * document.body.innerHTML = '<ng2></ng2>';
                 *
                 * adapter.bootstrap(document.body, ['myExample']).ready(function() {
                 *   expect(document.body.textContent).toEqual("ng2 template: Hello world! - text");
                 * });
                 * ```
                 */
                UpgradeAdapter.prototype.upgradeNg1Component = function (name) {
                    if (this.downgradedComponents.hasOwnProperty(name)) {
                        return this.downgradedComponents[name].type;
                    }
                    else {
                        return (this.downgradedComponents[name] = new upgrade_ng1_adapter_1.UpgradeNg1ComponentAdapterBuilder(name)).type;
                    }
                };
                /**
                 * Bootstrap a hybrid AngularJS v1 / Angular v2 application.
                 *
                 * This `bootstrap` method is a direct replacement (takes same arguments) for AngularJS v1
                 * [`bootstrap`](https://docs.angularjs.org/api/ng/function/angular.bootstrap) method. Unlike
                 * AngularJS v1, this bootstrap is asynchronous.
                 *
                 * ### Example
                 *
                 * ```
                 * var adapter = new UpgradeAdapter();
                 * var module = angular.module('myExample', []);
                 * module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                 *
                 * module.directive('ng1', function() {
                 *   return {
                 *      scope: { title: '=' },
                 *      template: 'ng1[Hello {{title}}!](<span ng-transclude></span>)'
                 *   };
                 * });
                 *
                 *
                 * @Component({
                 *   selector: 'ng2',
                 *   inputs: ['name'],
                 *   template: 'ng2[<ng1 [title]="name">transclude</ng1>](<ng-content></ng-content>)',
                 *   directives: [adapter.upgradeNg1Component('ng1')]
                 * })
                 * class Ng2 {
                 * }
                 *
                 * document.body.innerHTML = '<ng2 name="World">project</ng2>';
                 *
                 * adapter.bootstrap(document.body, ['myExample']).ready(function() {
                 *   expect(document.body.textContent).toEqual(
                 *       "ng2[ng1[Hello World!](transclude)](project)");
                 * });
                 * ```
                 */
                UpgradeAdapter.prototype.bootstrap = function (element, modules, config) {
                    var _this = this;
                    var upgrade = new UpgradeAdapterRef();
                    var ng1Injector = null;
                    var platformRef = browser_1.browserPlatform();
                    var applicationRef = core_1.ReflectiveInjector.resolveAndCreate([
                        browser_1.BROWSER_APP_PROVIDERS,
                        core_1.provide(constants_1.NG1_INJECTOR, { useFactory: function () { return ng1Injector; } }),
                        core_1.provide(constants_1.NG1_COMPILE, { useFactory: function () { return ng1Injector.get(constants_1.NG1_COMPILE); } }),
                        this.providers
                    ], platformRef.injector)
                        .get(core_1.ApplicationRef);
                    var injector = applicationRef.injector;
                    var ngZone = injector.get(core_1.NgZone);
                    var compiler = injector.get(core_1.ComponentResolver);
                    var delayApplyExps = [];
                    var original$applyFn;
                    var rootScopePrototype;
                    var rootScope;
                    var componentFactoryRefMap = {};
                    var ng1Module = angular.module(this.idPrefix, modules);
                    var ng1BootstrapPromise = null;
                    var ng1compilePromise = null;
                    ng1Module.value(constants_1.NG2_INJECTOR, injector)
                        .value(constants_1.NG2_ZONE, ngZone)
                        .value(constants_1.NG2_COMPILER, compiler)
                        .value(constants_1.NG2_COMPONENT_FACTORY_REF_MAP, componentFactoryRefMap)
                        .config([
                        '$provide',
                        function (provide) {
                            provide.decorator(constants_1.NG1_ROOT_SCOPE, [
                                '$delegate',
                                function (rootScopeDelegate) {
                                    rootScopePrototype = rootScopeDelegate.constructor.prototype;
                                    if (rootScopePrototype.hasOwnProperty('$apply')) {
                                        original$applyFn = rootScopePrototype.$apply;
                                        rootScopePrototype.$apply = function (exp) { return delayApplyExps.push(exp); };
                                    }
                                    else {
                                        throw new Error("Failed to find '$apply' on '$rootScope'!");
                                    }
                                    return rootScope = rootScopeDelegate;
                                }
                            ]);
                            provide.decorator(constants_1.NG1_TESTABILITY, [
                                '$delegate',
                                function (testabilityDelegate) {
                                    var _this = this;
                                    var ng2Testability = injector.get(core_1.Testability);
                                    var origonalWhenStable = testabilityDelegate.whenStable;
                                    var newWhenStable = function (callback) {
                                        var whenStableContext = _this;
                                        origonalWhenStable.call(_this, function () {
                                            if (ng2Testability.isStable()) {
                                                callback.apply(this, arguments);
                                            }
                                            else {
                                                ng2Testability.whenStable(newWhenStable.bind(whenStableContext, callback));
                                            }
                                        });
                                    };
                                    testabilityDelegate.whenStable = newWhenStable;
                                    return testabilityDelegate;
                                }
                            ]);
                        }
                    ]);
                    ng1compilePromise = new Promise(function (resolve, reject) {
                        ng1Module.run([
                            '$injector',
                            '$rootScope',
                            function (injector, rootScope) {
                                ng1Injector = injector;
                                async_1.ObservableWrapper.subscribe(ngZone.onMicrotaskEmpty, function (_) { return ngZone.runOutsideAngular(function () { return rootScope.$apply(); }); });
                                upgrade_ng1_adapter_1.UpgradeNg1ComponentAdapterBuilder.resolve(_this.downgradedComponents, injector)
                                    .then(resolve, reject);
                            }
                        ]);
                    });
                    // Make sure resumeBootstrap() only exists if the current bootstrap is deferred
                    var windowAngular = lang_1.global.angular;
                    windowAngular.resumeBootstrap = undefined;
                    angular.element(element).data(util_1.controllerKey(constants_1.NG2_INJECTOR), injector);
                    ngZone.run(function () { angular.bootstrap(element, [_this.idPrefix], config); });
                    ng1BootstrapPromise = new Promise(function (resolve, reject) {
                        if (windowAngular.resumeBootstrap) {
                            var originalResumeBootstrap = windowAngular.resumeBootstrap;
                            windowAngular.resumeBootstrap = function () {
                                windowAngular.resumeBootstrap = originalResumeBootstrap;
                                windowAngular.resumeBootstrap.apply(this, arguments);
                                resolve();
                            };
                        }
                        else {
                            resolve();
                        }
                    });
                    Promise.all([
                        this.compileNg2Components(compiler, componentFactoryRefMap),
                        ng1BootstrapPromise,
                        ng1compilePromise
                    ])
                        .then(function () {
                        ngZone.run(function () {
                            if (rootScopePrototype) {
                                rootScopePrototype.$apply = original$applyFn; // restore original $apply
                                while (delayApplyExps.length) {
                                    rootScope.$apply(delayApplyExps.shift());
                                }
                                upgrade._bootstrapDone(applicationRef, ng1Injector);
                                rootScopePrototype = null;
                            }
                        });
                    }, util_1.onError);
                    return upgrade;
                };
                /**
                 * Adds a provider to the top level environment of a hybrid AngularJS v1 / Angular v2 application.
                 *
                 * In hybrid AngularJS v1 / Angular v2 application, there is no one root Angular v2 component,
                 * for this reason we provide an application global way of registering providers which is
                 * consistent with single global injection in AngularJS v1.
                 *
                 * ### Example
                 *
                 * ```
                 * class Greeter {
                 *   greet(name) {
                 *     alert('Hello ' + name + '!');
                 *   }
                 * }
                 *
                 * @Component({
                 *   selector: 'app',
                 *   template: ''
                 * })
                 * class App {
                 *   constructor(greeter: Greeter) {
                 *     this.greeter('World');
                 *   }
                 * }
                 *
                 * var adapter = new UpgradeAdapter();
                 * adapter.addProvider(Greeter);
                 *
                 * var module = angular.module('myExample', []);
                 * module.directive('app', adapter.downgradeNg2Component(App));
                 *
                 * document.body.innerHTML = '<app></app>'
                 * adapter.bootstrap(document.body, ['myExample']);
                 *```
                 */
                UpgradeAdapter.prototype.addProvider = function (provider) { this.providers.push(provider); };
                /**
                 * Allows AngularJS v1 service to be accessible from Angular v2.
                 *
                 *
                 * ### Example
                 *
                 * ```
                 * class Login { ... }
                 * class Server { ... }
                 *
                 * @Injectable()
                 * class Example {
                 *   constructor(@Inject('server') server, login: Login) {
                 *     ...
                 *   }
                 * }
                 *
                 * var module = angular.module('myExample', []);
                 * module.service('server', Server);
                 * module.service('login', Login);
                 *
                 * var adapter = new UpgradeAdapter();
                 * adapter.upgradeNg1Provider('server');
                 * adapter.upgradeNg1Provider('login', {asToken: Login});
                 * adapter.addProvider(Example);
                 *
                 * adapter.bootstrap(document.body, ['myExample']).ready((ref) => {
                 *   var example: Example = ref.ng2Injector.get(Example);
                 * });
                 *
                 * ```
                 */
                UpgradeAdapter.prototype.upgradeNg1Provider = function (name, options) {
                    var token = options && options.asToken || name;
                    this.providers.push(core_1.provide(token, {
                        useFactory: function (ng1Injector) { return ng1Injector.get(name); },
                        deps: [constants_1.NG1_INJECTOR]
                    }));
                };
                /**
                 * Allows Angular v2 service to be accessible from AngularJS v1.
                 *
                 *
                 * ### Example
                 *
                 * ```
                 * class Example {
                 * }
                 *
                 * var adapter = new UpgradeAdapter();
                 * adapter.addProvider(Example);
                 *
                 * var module = angular.module('myExample', []);
                 * module.factory('example', adapter.downgradeNg2Provider(Example));
                 *
                 * adapter.bootstrap(document.body, ['myExample']).ready((ref) => {
                 *   var example: Example = ref.ng1Injector.get('example');
                 * });
                 *
                 * ```
                 */
                UpgradeAdapter.prototype.downgradeNg2Provider = function (token) {
                    var factory = function (injector) { return injector.get(token); };
                    factory.$inject = [constants_1.NG2_INJECTOR];
                    return factory;
                };
                /* @internal */
                UpgradeAdapter.prototype.compileNg2Components = function (compiler, componentFactoryRefMap) {
                    var _this = this;
                    var promises = [];
                    var types = this.upgradedComponents;
                    for (var i = 0; i < types.length; i++) {
                        promises.push(compiler.resolveComponent(types[i]));
                    }
                    return Promise.all(promises).then(function (componentFactories) {
                        var types = _this.upgradedComponents;
                        for (var i = 0; i < componentFactories.length; i++) {
                            componentFactoryRefMap[metadata_1.getComponentInfo(types[i]).selector] = componentFactories[i];
                        }
                        return componentFactoryRefMap;
                    }, util_1.onError);
                };
                return UpgradeAdapter;
            }());
            exports_1("UpgradeAdapter", UpgradeAdapter);
            /**
             * Use `UgradeAdapterRef` to control a hybrid AngularJS v1 / Angular v2 application.
             */
            UpgradeAdapterRef = (function () {
                function UpgradeAdapterRef() {
                    /* @internal */
                    this._readyFn = null;
                    this.ng1RootScope = null;
                    this.ng1Injector = null;
                    this.ng2ApplicationRef = null;
                    this.ng2Injector = null;
                }
                /* @internal */
                UpgradeAdapterRef.prototype._bootstrapDone = function (applicationRef, ng1Injector) {
                    this.ng2ApplicationRef = applicationRef;
                    this.ng2Injector = applicationRef.injector;
                    this.ng1Injector = ng1Injector;
                    this.ng1RootScope = ng1Injector.get(constants_1.NG1_ROOT_SCOPE);
                    this._readyFn && this._readyFn(this);
                };
                /**
                 * Register a callback function which is notified upon successful hybrid AngularJS v1 / Angular v2
                 * application has been bootstrapped.
                 *
                 * The `ready` callback function is invoked inside the Angular v2 zone, therefore it does not
                 * require a call to `$apply()`.
                 */
                UpgradeAdapterRef.prototype.ready = function (fn) { this._readyFn = fn; };
                /**
                 * Dispose of running hybrid AngularJS v1 / Angular v2 application.
                 */
                UpgradeAdapterRef.prototype.dispose = function () {
                    this.ng1Injector.get(constants_1.NG1_ROOT_SCOPE).$destroy();
                    this.ng2ApplicationRef.dispose();
                };
                return UpgradeAdapterRef;
            }());
            exports_1("UpgradeAdapterRef", UpgradeAdapterRef);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy91cGdyYWRlL3VwZ3JhZGVfYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBcUNJLFlBQVk7SUE0ZmhCLCtCQUErQixJQUFtQixFQUFFLFFBQWdCO1FBQzVELGdCQUFpQixDQUFDLE9BQU8sR0FBRyxDQUFDLHlDQUE2QixFQUFFLHFCQUFTLENBQUMsQ0FBQztRQUM3RSwwQkFBMEIsc0JBQThDLEVBQzlDLEtBQTRCO1lBQ3BELElBQUksZ0JBQWdCLEdBQXFCLHNCQUFzQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMvRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDO2dCQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNGLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztZQUNoQixNQUFNLENBQUM7Z0JBQ0wsUUFBUSxFQUFFLEdBQUc7Z0JBQ2IsT0FBTyxFQUFFLDRCQUFnQjtnQkFDekIsSUFBSSxFQUFFO29CQUNKLElBQUksRUFBRSxVQUFDLEtBQXFCLEVBQUUsT0FBaUMsRUFBRSxLQUEwQixFQUNwRixjQUFtQixFQUFFLFVBQXVDO3dCQUNqRSxJQUFJLFVBQVUsR0FBUSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2pDLElBQUksTUFBTSxHQUNOLElBQUksb0RBQTRCLENBQUMsUUFBUSxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQ3pDLGNBQWMsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQzt3QkFDeEYsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO3dCQUNyQixNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7d0JBQ3RCLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQzt3QkFDeEIsTUFBTSxDQUFD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QUFXLENBQUMsR0FBRyxDQUFDLDBCQUFjLENBQUMsQ0FBQztvQkFDcEQsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN2QyxDQUFDO2dCQUVEOzs7Ozs7bUJBTUc7Z0JBQ0ksaUNBQUssR0FBWixVQUFhLEVBQW1ELElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUV6Rjs7bUJBRUc7Z0JBQ0ksbUNBQU8sR0FBZDtvQkFDRSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQywwQkFBYyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ2hELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDbkMsQ0FBQztnQkFDSCx3QkFBQztZQUFELENBbENBLEFBa0NDLElBQUE7WUFsQ0QsaURBa0NDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL3VwZ3JhZGUvdXBncmFkZV9hZGFwdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgcHJvdmlkZSxcbiAgQXBwbGljYXRpb25SZWYsXG4gIENvbXBvbmVudFJlc29sdmVyLFxuICBJbmplY3RvcixcbiAgTmdab25lLFxuICBQbGF0Zm9ybVJlZixcbiAgUmVmbGVjdGl2ZUluamVjdG9yLFxuICBDb21wb25lbnRGYWN0b3J5LFxuICBQcm92aWRlcixcbiAgVHlwZSxcbiAgVGVzdGFiaWxpdHksXG4gIEFQUExJQ0FUSU9OX0NPTU1PTl9QUk9WSURFUlNcbn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge2dsb2JhbH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7T2JzZXJ2YWJsZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYXN5bmMnO1xuaW1wb3J0IHtCUk9XU0VSX1BST1ZJREVSUywgQlJPV1NFUl9BUFBfUFJPVklERVJTLCBicm93c2VyUGxhdGZvcm19IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXInO1xuXG5pbXBvcnQge2dldENvbXBvbmVudEluZm8sIENvbXBvbmVudEluZm99IGZyb20gJy4vbWV0YWRhdGEnO1xuaW1wb3J0IHtvbkVycm9yLCBjb250cm9sbGVyS2V5fSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHtcbiAgTkcxX0NPTVBJTEUsXG4gIE5HMV9JTkpFQ1RPUixcbiAgTkcxX1BBUlNFLFxuICBORzFfUk9PVF9TQ09QRSxcbiAgTkcxX1NDT1BFLFxuICBORzFfVEVTVEFCSUxJVFksXG4gIE5HMl9DT01QSUxFUixcbiAgTkcyX0lOSkVDVE9SLFxuICBORzJfQ09NUE9ORU5UX0ZBQ1RPUllfUkVGX01BUCxcbiAgTkcyX1pPTkUsXG4gIFJFUVVJUkVfSU5KRUNUT1Jcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHtEb3duZ3JhZGVOZzJDb21wb25lbnRBZGFwdGVyfSBmcm9tICcuL2Rvd25ncmFkZV9uZzJfYWRhcHRlcic7XG5pbXBvcnQge1VwZ3JhZGVOZzFDb21wb25lbnRBZGFwdGVyQnVpbGRlcn0gZnJvbSAnLi91cGdyYWRlX25nMV9hZGFwdGVyJztcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnLi9hbmd1bGFyX2pzJztcblxudmFyIHVwZ3JhZGVDb3VudDogbnVtYmVyID0gMDtcblxuLyoqXG4gKiBVc2UgYFVwZ3JhZGVBZGFwdGVyYCB0byBhbGxvdyBBbmd1bGFySlMgdjEgYW5kIEFuZ3VsYXIgdjIgdG8gY29leGlzdCBpbiBhIHNpbmdsZSBhcHBsaWNhdGlvbi5cbiAqXG4gKiBUaGUgYFVwZ3JhZGVBZGFwdGVyYCBhbGxvd3M6XG4gKiAxLiBjcmVhdGlvbiBvZiBBbmd1bGFyIHYyIGNvbXBvbmVudCBmcm9tIEFuZ3VsYXJKUyB2MSBjb21wb25lbnQgZGlyZWN0aXZlXG4gKiAgICAoU2VlIFtVcGdyYWRlQWRhcHRlciN1cGdyYWRlTmcxQ29tcG9uZW50KCldKVxuICogMi4gY3JlYXRpb24gb2YgQW5ndWxhckpTIHYxIGRpcmVjdGl2ZSBmcm9tIEFuZ3VsYXIgdjIgY29tcG9uZW50LlxuICogICAgKFNlZSBbVXBncmFkZUFkYXB0ZXIjZG93bmdyYWRlTmcyQ29tcG9uZW50KCldKVxuICogMy4gQm9vdHN0cmFwcGluZyBvZiBhIGh5YnJpZCBBbmd1bGFyIGFwcGxpY2F0aW9uIHdoaWNoIGNvbnRhaW5zIGJvdGggb2YgdGhlIGZyYW1ld29ya3NcbiAqICAgIGNvZXhpc3RpbmcgaW4gYSBzaW5nbGUgYXBwbGljYXRpb24uXG4gKlxuICogIyMgTWVudGFsIE1vZGVsXG4gKlxuICogV2hlbiByZWFzb25pbmcgYWJvdXQgaG93IGEgaHlicmlkIGFwcGxpY2F0aW9uIHdvcmtzIGl0IGlzIHVzZWZ1bCB0byBoYXZlIGEgbWVudGFsIG1vZGVsIHdoaWNoXG4gKiBkZXNjcmliZXMgd2hhdCBpcyBoYXBwZW5pbmcgYW5kIGV4cGxhaW5zIHdoYXQgaXMgaGFwcGVuaW5nIGF0IHRoZSBsb3dlc3QgbGV2ZWwuXG4gKlxuICogMS4gVGhlcmUgYXJlIHR3byBpbmRlcGVuZGVudCBmcmFtZXdvcmtzIHJ1bm5pbmcgaW4gYSBzaW5nbGUgYXBwbGljYXRpb24sIGVhY2ggZnJhbWV3b3JrIHRyZWF0c1xuICogICAgdGhlIG90aGVyIGFzIGEgYmxhY2sgYm94LlxuICogMi4gRWFjaCBET00gZWxlbWVudCBvbiB0aGUgcGFnZSBpcyBvd25lZCBleGFjdGx5IGJ5IG9uZSBmcmFtZXdvcmsuIFdoaWNoZXZlciBmcmFtZXdvcmtcbiAqICAgIGluc3RhbnRpYXRlZCB0aGUgZWxlbWVudCBpcyB0aGUgb3duZXIuIEVhY2ggZnJhbWV3b3JrIG9ubHkgdXBkYXRlcy9pbnRlcmFjdHMgd2l0aCBpdHMgb3duXG4gKiAgICBET00gZWxlbWVudHMgYW5kIGlnbm9yZXMgb3RoZXJzLlxuICogMy4gQW5ndWxhckpTIHYxIGRpcmVjdGl2ZXMgYWx3YXlzIGV4ZWN1dGUgaW5zaWRlIEFuZ3VsYXJKUyB2MSBmcmFtZXdvcmsgY29kZWJhc2UgcmVnYXJkbGVzcyBvZlxuICogICAgd2hlcmUgdGhleSBhcmUgaW5zdGFudGlhdGVkLlxuICogNC4gQW5ndWxhciB2MiBjb21wb25lbnRzIGFsd2F5cyBleGVjdXRlIGluc2lkZSBBbmd1bGFyIHYyIGZyYW1ld29yayBjb2RlYmFzZSByZWdhcmRsZXNzIG9mXG4gKiAgICB3aGVyZSB0aGV5IGFyZSBpbnN0YW50aWF0ZWQuXG4gKiA1LiBBbiBBbmd1bGFySlMgdjEgY29tcG9uZW50IGNhbiBiZSB1cGdyYWRlZCB0byBhbiBBbmd1bGFyIHYyIGNvbXBvbmVudC4gVGhpcyBjcmVhdGVzIGFuXG4gKiAgICBBbmd1bGFyIHYyIGRpcmVjdGl2ZSwgd2hpY2ggYm9vdHN0cmFwcyB0aGUgQW5ndWxhckpTIHYxIGNvbXBvbmVudCBkaXJlY3RpdmUgaW4gdGhhdCBsb2NhdGlvbi5cbiAqIDYuIEFuIEFuZ3VsYXIgdjIgY29tcG9uZW50IGNhbiBiZSBkb3duZ3JhZGVkIHRvIGFuIEFuZ3VsYXJKUyB2MSBjb21wb25lbnQgZGlyZWN0aXZlLiBUaGlzIGNyZWF0ZXNcbiAqICAgIGFuIEFuZ3VsYXJKUyB2MSBkaXJlY3RpdmUsIHdoaWNoIGJvb3RzdHJhcHMgdGhlIEFuZ3VsYXIgdjIgY29tcG9uZW50IGluIHRoYXQgbG9jYXRpb24uXG4gKiA3LiBXaGVuZXZlciBhbiBhZGFwdGVyIGNvbXBvbmVudCBpcyBpbnN0YW50aWF0ZWQgdGhlIGhvc3QgZWxlbWVudCBpcyBvd25lZCBieSB0aGUgZnJhbWV3b3JrXG4gKiAgICBkb2luZyB0aGUgaW5zdGFudGlhdGlvbi4gVGhlIG90aGVyIGZyYW1ld29yayB0aGVuIGluc3RhbnRpYXRlcyBhbmQgb3ducyB0aGUgdmlldyBmb3IgdGhhdFxuICogICAgY29tcG9uZW50LiBUaGlzIGltcGxpZXMgdGhhdCBjb21wb25lbnQgYmluZGluZ3Mgd2lsbCBhbHdheXMgZm9sbG93IHRoZSBzZW1hbnRpY3Mgb2YgdGhlXG4gKiAgICBpbnN0YW50aWF0aW9uIGZyYW1ld29yay4gVGhlIHN5bnRheCBpcyBhbHdheXMgdGhhdCBvZiBBbmd1bGFyIHYyIHN5bnRheC5cbiAqIDguIEFuZ3VsYXJKUyB2MSBpcyBhbHdheXMgYm9vdHN0cmFwcGVkIGZpcnN0IGFuZCBvd25zIHRoZSBib3R0b20gbW9zdCB2aWV3LlxuICogOS4gVGhlIG5ldyBhcHBsaWNhdGlvbiBpcyBydW5uaW5nIGluIEFuZ3VsYXIgdjIgem9uZSwgYW5kIHRoZXJlZm9yZSBpdCBubyBsb25nZXIgbmVlZHMgY2FsbHMgdG9cbiAqICAgIGAkYXBwbHkoKWAuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGBcbiAqIHZhciBhZGFwdGVyID0gbmV3IFVwZ3JhZGVBZGFwdGVyKCk7XG4gKiB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ215RXhhbXBsZScsIFtdKTtcbiAqIG1vZHVsZS5kaXJlY3RpdmUoJ25nMicsIGFkYXB0ZXIuZG93bmdyYWRlTmcyQ29tcG9uZW50KE5nMikpO1xuICpcbiAqIG1vZHVsZS5kaXJlY3RpdmUoJ25nMScsIGZ1bmN0aW9uKCkge1xuICogICByZXR1cm4ge1xuICogICAgICBzY29wZTogeyB0aXRsZTogJz0nIH0sXG4gKiAgICAgIHRlbXBsYXRlOiAnbmcxW0hlbGxvIHt7dGl0bGV9fSFdKDxzcGFuIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPiknXG4gKiAgIH07XG4gKiB9KTtcbiAqXG4gKlxuICogQENvbXBvbmVudCh7XG4gKiAgIHNlbGVjdG9yOiAnbmcyJyxcbiAqICAgaW5wdXRzOiBbJ25hbWUnXSxcbiAqICAgdGVtcGxhdGU6ICduZzJbPG5nMSBbdGl0bGVdPVwibmFtZVwiPnRyYW5zY2x1ZGU8L25nMT5dKDxuZy1jb250ZW50PjwvbmctY29udGVudD4pJyxcbiAqICAgZGlyZWN0aXZlczogW2FkYXB0ZXIudXBncmFkZU5nMUNvbXBvbmVudCgnbmcxJyldXG4gKiB9KVxuICogY2xhc3MgTmcyIHtcbiAqIH1cbiAqXG4gKiBkb2N1bWVudC5ib2R5LmlubmVySFRNTCA9ICc8bmcyIG5hbWU9XCJXb3JsZFwiPnByb2plY3Q8L25nMj4nO1xuICpcbiAqIGFkYXB0ZXIuYm9vdHN0cmFwKGRvY3VtZW50LmJvZHksIFsnbXlFeGFtcGxlJ10pLnJlYWR5KGZ1bmN0aW9uKCkge1xuICogICBleHBlY3QoZG9jdW1lbnQuYm9keS50ZXh0Q29udGVudCkudG9FcXVhbChcbiAqICAgICAgIFwibmcyW25nMVtIZWxsbyBXb3JsZCFdKHRyYW5zY2x1ZGUpXShwcm9qZWN0KVwiKTtcbiAqIH0pO1xuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBVcGdyYWRlQWRhcHRlciB7XG4gIC8qIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIGlkUHJlZml4OiBzdHJpbmcgPSBgTkcyX1VQR1JBREVfJHt1cGdyYWRlQ291bnQrK31fYDtcbiAgLyogQGludGVybmFsICovXG4gIHByaXZhdGUgdXBncmFkZWRDb21wb25lbnRzOiBUeXBlW10gPSBbXTtcbiAgLyogQGludGVybmFsICovXG4gIHByaXZhdGUgZG93bmdyYWRlZENvbXBvbmVudHM6IHtbbmFtZTogc3RyaW5nXTogVXBncmFkZU5nMUNvbXBvbmVudEFkYXB0ZXJCdWlsZGVyfSA9IHt9O1xuICAvKiBAaW50ZXJuYWwgKi9cbiAgcHJpdmF0ZSBwcm92aWRlcnM6IEFycmF5PFR5cGUgfCBQcm92aWRlciB8IGFueVtdPiA9IFtdO1xuXG4gIC8qKlxuICAgKiBBbGxvd3MgQW5ndWxhciB2MiBDb21wb25lbnQgdG8gYmUgdXNlZCBmcm9tIEFuZ3VsYXJKUyB2MS5cbiAgICpcbiAgICogVXNlIGBkb3duZ3JhZGVOZzJDb21wb25lbnRgIHRvIGNyZWF0ZSBhbiBBbmd1bGFySlMgdjEgRGlyZWN0aXZlIERlZmluaXRpb24gRmFjdG9yeSBmcm9tXG4gICAqIEFuZ3VsYXIgdjIgQ29tcG9uZW50LiBUaGUgYWRhcHRlciB3aWxsIGJvb3RzdHJhcCBBbmd1bGFyIHYyIGNvbXBvbmVudCBmcm9tIHdpdGhpbiB0aGVcbiAgICogQW5ndWxhckpTIHYxIHRlbXBsYXRlLlxuICAgKlxuICAgKiAjIyBNZW50YWwgTW9kZWxcbiAgICpcbiAgICogMS4gVGhlIGNvbXBvbmVudCBpcyBpbnN0YW50aWF0ZWQgYnkgYmVpbmcgbGlzdGVkIGluIEFuZ3VsYXJKUyB2MSB0ZW1wbGF0ZS4gVGhpcyBtZWFucyB0aGF0IHRoZVxuICAgKiAgICBob3N0IGVsZW1lbnQgaXMgY29udHJvbGxlZCBieSBBbmd1bGFySlMgdjEsIGJ1dCB0aGUgY29tcG9uZW50J3MgdmlldyB3aWxsIGJlIGNvbnRyb2xsZWQgYnlcbiAgICogICAgQW5ndWxhciB2Mi5cbiAgICogMi4gRXZlbiB0aG91Z2h0IHRoZSBjb21wb25lbnQgaXMgaW5zdGFudGlhdGVkIGluIEFuZ3VsYXJKUyB2MSwgaXQgd2lsbCBiZSB1c2luZyBBbmd1bGFyIHYyXG4gICAqICAgIHN5bnRheC4gVGhpcyBoYXMgdG8gYmUgZG9uZSwgdGhpcyB3YXkgYmVjYXVzZSB3ZSBtdXN0IGZvbGxvdyBBbmd1bGFyIHYyIGNvbXBvbmVudHMgZG8gbm90XG4gICAqICAgIGRlY2xhcmUgaG93IHRoZSBhdHRyaWJ1dGVzIHNob3VsZCBiZSBpbnRlcnByZXRlZC5cbiAgICpcbiAgICogIyMgU3VwcG9ydGVkIEZlYXR1cmVzXG4gICAqXG4gICAqIC0gQmluZGluZ3M6XG4gICAqICAgLSBBdHRyaWJ1dGU6IGA8Y29tcCBuYW1lPVwiV29ybGRcIj5gXG4gICAqICAgLSBJbnRlcnBvbGF0aW9uOiAgYDxjb21wIGdyZWV0aW5nPVwiSGVsbG8ge3tuYW1lfX0hXCI+YFxuICAgKiAgIC0gRXhwcmVzc2lvbjogIGA8Y29tcCBbbmFtZV09XCJ1c2VybmFtZVwiPmBcbiAgICogICAtIEV2ZW50OiAgYDxjb21wIChjbG9zZSk9XCJkb1NvbWV0aGluZygpXCI+YFxuICAgKiAtIENvbnRlbnQgcHJvamVjdGlvbjogeWVzXG4gICAqXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIGBgYFxuICAgKiB2YXIgYWRhcHRlciA9IG5ldyBVcGdyYWRlQWRhcHRlcigpO1xuICAgKiB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ215RXhhbXBsZScsIFtdKTtcbiAgICogbW9kdWxlLmRpcmVjdGl2ZSgnZ3JlZXQnLCBhZGFwdGVyLmRvd25ncmFkZU5nMkNvbXBvbmVudChHcmVldGVyKSk7XG4gICAqXG4gICAqIEBDb21wb25lbnQoe1xuICAgKiAgIHNlbGVjdG9yOiAnZ3JlZXQnLFxuICAgKiAgIHRlbXBsYXRlOiAne3tzYWx1dGF0aW9ufX0ge3tuYW1lfX0hIC0gPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PidcbiAgICogfSlcbiAgICogY2xhc3MgR3JlZXRlciB7XG4gICAqICAgQElucHV0KCkgc2FsdXRhdGlvbjogc3RyaW5nO1xuICAgKiAgIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcbiAgICogfVxuICAgKlxuICAgKiBkb2N1bWVudC5ib2R5LmlubmVySFRNTCA9XG4gICAqICAgJ25nMSB0ZW1wbGF0ZTogPGdyZWV0IHNhbHV0YXRpb249XCJIZWxsb1wiIFtuYW1lXT1cIndvcmxkXCI+dGV4dDwvZ3JlZXQ+JztcbiAgICpcbiAgICogYWRhcHRlci5ib290c3RyYXAoZG9jdW1lbnQuYm9keSwgWydteUV4YW1wbGUnXSkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAqICAgZXhwZWN0KGRvY3VtZW50LmJvZHkudGV4dENvbnRlbnQpLnRvRXF1YWwoXCJuZzEgdGVtcGxhdGU6IEhlbGxvIHdvcmxkISAtIHRleHRcIik7XG4gICAqIH0pO1xuICAgKiBgYGBcbiAgICovXG4gIGRvd25ncmFkZU5nMkNvbXBvbmVudCh0eXBlOiBUeXBlKTogRnVuY3Rpb24ge1xuICAgIHRoaXMudXBncmFkZWRDb21wb25lbnRzLnB1c2godHlwZSk7XG4gICAgdmFyIGluZm86IENvbXBvbmVudEluZm8gPSBnZXRDb21wb25lbnRJbmZvKHR5cGUpO1xuICAgIHJldHVybiBuZzFDb21wb25lbnREaXJlY3RpdmUoaW5mbywgYCR7dGhpcy5pZFByZWZpeH0ke2luZm8uc2VsZWN0b3J9X2NgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGxvd3MgQW5ndWxhckpTIHYxIENvbXBvbmVudCB0byBiZSB1c2VkIGZyb20gQW5ndWxhciB2Mi5cbiAgICpcbiAgICogVXNlIGB1cGdyYWRlTmcxQ29tcG9uZW50YCB0byBjcmVhdGUgYW4gQW5ndWxhciB2MiBjb21wb25lbnQgZnJvbSBBbmd1bGFySlMgdjEgQ29tcG9uZW50XG4gICAqIGRpcmVjdGl2ZS4gVGhlIGFkYXB0ZXIgd2lsbCBib290c3RyYXAgQW5ndWxhckpTIHYxIGNvbXBvbmVudCBmcm9tIHdpdGhpbiB0aGUgQW5ndWxhciB2MlxuICAgKiB0ZW1wbGF0ZS5cbiAgICpcbiAgICogIyMgTWVudGFsIE1vZGVsXG4gICAqXG4gICAqIDEuIFRoZSBjb21wb25lbnQgaXMgaW5zdGFudGlhdGVkIGJ5IGJlaW5nIGxpc3RlZCBpbiBBbmd1bGFyIHYyIHRlbXBsYXRlLiBUaGlzIG1lYW5zIHRoYXQgdGhlXG4gICAqICAgIGhvc3QgZWxlbWVudCBpcyBjb250cm9sbGVkIGJ5IEFuZ3VsYXIgdjIsIGJ1dCB0aGUgY29tcG9uZW50J3MgdmlldyB3aWxsIGJlIGNvbnRyb2xsZWQgYnlcbiAgICogICAgQW5ndWxhckpTIHYxLlxuICAgKlxuICAgKiAjIyBTdXBwb3J0ZWQgRmVhdHVyZXNcbiAgICpcbiAgICogLSBCaW5kaW5nczpcbiAgICogICAtIEF0dHJpYnV0ZTogYDxjb21wIG5hbWU9XCJXb3JsZFwiPmBcbiAgICogICAtIEludGVycG9sYXRpb246ICBgPGNvbXAgZ3JlZXRpbmc9XCJIZWxsbyB7e25hbWV9fSFcIj5gXG4gICAqICAgLSBFeHByZXNzaW9uOiAgYDxjb21wIFtuYW1lXT1cInVzZXJuYW1lXCI+YFxuICAgKiAgIC0gRXZlbnQ6ICBgPGNvbXAgKGNsb3NlKT1cImRvU29tZXRoaW5nKClcIj5gXG4gICAqIC0gVHJhbnNjbHVzaW9uOiB5ZXNcbiAgICogLSBPbmx5IHNvbWUgb2YgdGhlIGZlYXR1cmVzIG9mXG4gICAqICAgW0RpcmVjdGl2ZSBEZWZpbml0aW9uIE9iamVjdF0oaHR0cHM6Ly9kb2NzLmFuZ3VsYXJqcy5vcmcvYXBpL25nL3NlcnZpY2UvJGNvbXBpbGUpIGFyZVxuICAgKiAgIHN1cHBvcnRlZDpcbiAgICogICAtIGBjb21waWxlYDogbm90IHN1cHBvcnRlZCBiZWNhdXNlIHRoZSBob3N0IGVsZW1lbnQgaXMgb3duZWQgYnkgQW5ndWxhciB2Miwgd2hpY2ggZG9lc1xuICAgKiAgICAgbm90IGFsbG93IG1vZGlmeWluZyBET00gc3RydWN0dXJlIGR1cmluZyBjb21waWxhdGlvbi5cbiAgICogICAtIGBjb250cm9sbGVyYDogc3VwcG9ydGVkLiAoTk9URTogaW5qZWN0aW9uIG9mIGAkYXR0cnNgIGFuZCBgJHRyYW5zY2x1ZGVgIGlzIG5vdCBzdXBwb3J0ZWQuKVxuICAgKiAgIC0gYGNvbnRyb2xsZXJBcyc6IHN1cHBvcnRlZC5cbiAgICogICAtIGBiaW5kVG9Db250cm9sbGVyJzogc3VwcG9ydGVkLlxuICAgKiAgIC0gYGxpbmsnOiBzdXBwb3J0ZWQuIChOT1RFOiBvbmx5IHByZS1saW5rIGZ1bmN0aW9uIGlzIHN1cHBvcnRlZC4pXG4gICAqICAgLSBgbmFtZSc6IHN1cHBvcnRlZC5cbiAgICogICAtIGBwcmlvcml0eSc6IGlnbm9yZWQuXG4gICAqICAgLSBgcmVwbGFjZSc6IG5vdCBzdXBwb3J0ZWQuXG4gICAqICAgLSBgcmVxdWlyZWA6IHN1cHBvcnRlZC5cbiAgICogICAtIGByZXN0cmljdGA6IG11c3QgYmUgc2V0IHRvICdFJy5cbiAgICogICAtIGBzY29wZWA6IHN1cHBvcnRlZC5cbiAgICogICAtIGB0ZW1wbGF0ZWA6IHN1cHBvcnRlZC5cbiAgICogICAtIGB0ZW1wbGF0ZVVybGA6IHN1cHBvcnRlZC5cbiAgICogICAtIGB0ZXJtaW5hbGA6IGlnbm9yZWQuXG4gICAqICAgLSBgdHJhbnNjbHVkZWA6IHN1cHBvcnRlZC5cbiAgICpcbiAgICpcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICogYGBgXG4gICAqIHZhciBhZGFwdGVyID0gbmV3IFVwZ3JhZGVBZGFwdGVyKCk7XG4gICAqIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbXlFeGFtcGxlJywgW10pO1xuICAgKlxuICAgKiBtb2R1bGUuZGlyZWN0aXZlKCdncmVldCcsIGZ1bmN0aW9uKCkge1xuICAgKiAgIHJldHVybiB7XG4gICAqICAgICBzY29wZToge3NhbHV0YXRpb246ICc9JywgbmFtZTogJz0nIH0sXG4gICAqICAgICB0ZW1wbGF0ZTogJ3t7c2FsdXRhdGlvbn19IHt7bmFtZX19ISAtIDxzcGFuIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPidcbiAgICogICB9O1xuICAgKiB9KTtcbiAgICpcbiAgICogbW9kdWxlLmRpcmVjdGl2ZSgnbmcyJywgYWRhcHRlci5kb3duZ3JhZGVOZzJDb21wb25lbnQoTmcyKSk7XG4gICAqXG4gICAqIEBDb21wb25lbnQoe1xuICAgKiAgIHNlbGVjdG9yOiAnbmcyJyxcbiAgICogICB0ZW1wbGF0ZTogJ25nMiB0ZW1wbGF0ZTogPGdyZWV0IHNhbHV0YXRpb249XCJIZWxsb1wiIFtuYW1lXT1cIndvcmxkXCI+dGV4dDwvZ3JlZXQ+J1xuICAgKiAgIGRpcmVjdGl2ZXM6IFthZGFwdGVyLnVwZ3JhZGVOZzFDb21wb25lbnQoJ2dyZWV0JyldXG4gICAqIH0pXG4gICAqIGNsYXNzIE5nMiB7XG4gICAqIH1cbiAgICpcbiAgICogZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSAnPG5nMj48L25nMj4nO1xuICAgKlxuICAgKiBhZGFwdGVyLmJvb3RzdHJhcChkb2N1bWVudC5ib2R5LCBbJ215RXhhbXBsZSddKS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICogICBleHBlY3QoZG9jdW1lbnQuYm9keS50ZXh0Q29udGVudCkudG9FcXVhbChcIm5nMiB0ZW1wbGF0ZTogSGVsbG8gd29ybGQhIC0gdGV4dFwiKTtcbiAgICogfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgdXBncmFkZU5nMUNvbXBvbmVudChuYW1lOiBzdHJpbmcpOiBUeXBlIHtcbiAgICBpZiAoKDxhbnk+dGhpcy5kb3duZ3JhZGVkQ29tcG9uZW50cykuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmRvd25ncmFkZWRDb21wb25lbnRzW25hbWVdLnR5cGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAodGhpcy5kb3duZ3JhZGVkQ29tcG9uZW50c1tuYW1lXSA9IG5ldyBVcGdyYWRlTmcxQ29tcG9uZW50QWRhcHRlckJ1aWxkZXIobmFtZSkpLnR5cGU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEJvb3RzdHJhcCBhIGh5YnJpZCBBbmd1bGFySlMgdjEgLyBBbmd1bGFyIHYyIGFwcGxpY2F0aW9uLlxuICAgKlxuICAgKiBUaGlzIGBib290c3RyYXBgIG1ldGhvZCBpcyBhIGRpcmVjdCByZXBsYWNlbWVudCAodGFrZXMgc2FtZSBhcmd1bWVudHMpIGZvciBBbmd1bGFySlMgdjFcbiAgICogW2Bib290c3RyYXBgXShodHRwczovL2RvY3MuYW5ndWxhcmpzLm9yZy9hcGkvbmcvZnVuY3Rpb24vYW5ndWxhci5ib290c3RyYXApIG1ldGhvZC4gVW5saWtlXG4gICAqIEFuZ3VsYXJKUyB2MSwgdGhpcyBib290c3RyYXAgaXMgYXN5bmNocm9ub3VzLlxuICAgKlxuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiBgYGBcbiAgICogdmFyIGFkYXB0ZXIgPSBuZXcgVXBncmFkZUFkYXB0ZXIoKTtcbiAgICogdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdteUV4YW1wbGUnLCBbXSk7XG4gICAqIG1vZHVsZS5kaXJlY3RpdmUoJ25nMicsIGFkYXB0ZXIuZG93bmdyYWRlTmcyQ29tcG9uZW50KE5nMikpO1xuICAgKlxuICAgKiBtb2R1bGUuZGlyZWN0aXZlKCduZzEnLCBmdW5jdGlvbigpIHtcbiAgICogICByZXR1cm4ge1xuICAgKiAgICAgIHNjb3BlOiB7IHRpdGxlOiAnPScgfSxcbiAgICogICAgICB0ZW1wbGF0ZTogJ25nMVtIZWxsbyB7e3RpdGxlfX0hXSg8c3BhbiBuZy10cmFuc2NsdWRlPjwvc3Bhbj4pJ1xuICAgKiAgIH07XG4gICAqIH0pO1xuICAgKlxuICAgKlxuICAgKiBAQ29tcG9uZW50KHtcbiAgICogICBzZWxlY3RvcjogJ25nMicsXG4gICAqICAgaW5wdXRzOiBbJ25hbWUnXSxcbiAgICogICB0ZW1wbGF0ZTogJ25nMls8bmcxIFt0aXRsZV09XCJuYW1lXCI+dHJhbnNjbHVkZTwvbmcxPl0oPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiknLFxuICAgKiAgIGRpcmVjdGl2ZXM6IFthZGFwdGVyLnVwZ3JhZGVOZzFDb21wb25lbnQoJ25nMScpXVxuICAgKiB9KVxuICAgKiBjbGFzcyBOZzIge1xuICAgKiB9XG4gICAqXG4gICAqIGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0gJzxuZzIgbmFtZT1cIldvcmxkXCI+cHJvamVjdDwvbmcyPic7XG4gICAqXG4gICAqIGFkYXB0ZXIuYm9vdHN0cmFwKGRvY3VtZW50LmJvZHksIFsnbXlFeGFtcGxlJ10pLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgKiAgIGV4cGVjdChkb2N1bWVudC5ib2R5LnRleHRDb250ZW50KS50b0VxdWFsKFxuICAgKiAgICAgICBcIm5nMltuZzFbSGVsbG8gV29ybGQhXSh0cmFuc2NsdWRlKV0ocHJvamVjdClcIik7XG4gICAqIH0pO1xuICAgKiBgYGBcbiAgICovXG4gIGJvb3RzdHJhcChlbGVtZW50OiBFbGVtZW50LCBtb2R1bGVzPzogYW55W10sXG4gICAgICAgICAgICBjb25maWc/OiBhbmd1bGFyLklBbmd1bGFyQm9vdHN0cmFwQ29uZmlnKTogVXBncmFkZUFkYXB0ZXJSZWYge1xuICAgIHZhciB1cGdyYWRlID0gbmV3IFVwZ3JhZGVBZGFwdGVyUmVmKCk7XG4gICAgdmFyIG5nMUluamVjdG9yOiBhbmd1bGFyLklJbmplY3RvclNlcnZpY2UgPSBudWxsO1xuICAgIHZhciBwbGF0Zm9ybVJlZjogUGxhdGZvcm1SZWYgPSBicm93c2VyUGxhdGZvcm0oKTtcbiAgICB2YXIgYXBwbGljYXRpb25SZWY6IEFwcGxpY2F0aW9uUmVmID1cbiAgICAgICAgUmVmbGVjdGl2ZUluamVjdG9yLnJlc29sdmVBbmRDcmVhdGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJST1dTRVJfQVBQX1BST1ZJREVSUyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZShORzFfSU5KRUNUT1IsIHt1c2VGYWN0b3J5OiAoKSA9PiBuZzFJbmplY3Rvcn0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlKE5HMV9DT01QSUxFLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt1c2VGYWN0b3J5OiAoKSA9PiBuZzFJbmplY3Rvci5nZXQoTkcxX0NPTVBJTEUpfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvdmlkZXJzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhdGZvcm1SZWYuaW5qZWN0b3IpXG4gICAgICAgICAgICAuZ2V0KEFwcGxpY2F0aW9uUmVmKTtcbiAgICB2YXIgaW5qZWN0b3I6IEluamVjdG9yID0gYXBwbGljYXRpb25SZWYuaW5qZWN0b3I7XG4gICAgdmFyIG5nWm9uZTogTmdab25lID0gaW5qZWN0b3IuZ2V0KE5nWm9uZSk7XG4gICAgdmFyIGNvbXBpbGVyOiBDb21wb25lbnRSZXNvbHZlciA9IGluamVjdG9yLmdldChDb21wb25lbnRSZXNvbHZlcik7XG4gICAgdmFyIGRlbGF5QXBwbHlFeHBzOiBGdW5jdGlvbltdID0gW107XG4gICAgdmFyIG9yaWdpbmFsJGFwcGx5Rm46IEZ1bmN0aW9uO1xuICAgIHZhciByb290U2NvcGVQcm90b3R5cGU6IGFueTtcbiAgICB2YXIgcm9vdFNjb3BlOiBhbmd1bGFyLklSb290U2NvcGVTZXJ2aWNlO1xuICAgIHZhciBjb21wb25lbnRGYWN0b3J5UmVmTWFwOiBDb21wb25lbnRGYWN0b3J5UmVmTWFwID0ge307XG4gICAgdmFyIG5nMU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKHRoaXMuaWRQcmVmaXgsIG1vZHVsZXMpO1xuICAgIHZhciBuZzFCb290c3RyYXBQcm9taXNlOiBQcm9taXNlPGFueT4gPSBudWxsO1xuICAgIHZhciBuZzFjb21waWxlUHJvbWlzZTogUHJvbWlzZTxhbnk+ID0gbnVsbDtcbiAgICBuZzFNb2R1bGUudmFsdWUoTkcyX0lOSkVDVE9SLCBpbmplY3RvcilcbiAgICAgICAgLnZhbHVlKE5HMl9aT05FLCBuZ1pvbmUpXG4gICAgICAgIC52YWx1ZShORzJfQ09NUElMRVIsIGNvbXBpbGVyKVxuICAgICAgICAudmFsdWUoTkcyX0NPTVBPTkVOVF9GQUNUT1JZX1JFRl9NQVAsIGNvbXBvbmVudEZhY3RvcnlSZWZNYXApXG4gICAgICAgIC5jb25maWcoW1xuICAgICAgICAgICckcHJvdmlkZScsXG4gICAgICAgICAgKHByb3ZpZGUpID0+IHtcbiAgICAgICAgICAgIHByb3ZpZGUuZGVjb3JhdG9yKE5HMV9ST09UX1NDT1BFLCBbXG4gICAgICAgICAgICAgICckZGVsZWdhdGUnLFxuICAgICAgICAgICAgICBmdW5jdGlvbihyb290U2NvcGVEZWxlZ2F0ZTogYW5ndWxhci5JUm9vdFNjb3BlU2VydmljZSkge1xuICAgICAgICAgICAgICAgIHJvb3RTY29wZVByb3RvdHlwZSA9IHJvb3RTY29wZURlbGVnYXRlLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgICAgICAgICAgICAgICBpZiAocm9vdFNjb3BlUHJvdG90eXBlLmhhc093blByb3BlcnR5KCckYXBwbHknKSkge1xuICAgICAgICAgICAgICAgICAgb3JpZ2luYWwkYXBwbHlGbiA9IHJvb3RTY29wZVByb3RvdHlwZS4kYXBwbHk7XG4gICAgICAgICAgICAgICAgICByb290U2NvcGVQcm90b3R5cGUuJGFwcGx5ID0gKGV4cCkgPT4gZGVsYXlBcHBseUV4cHMucHVzaChleHApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmluZCAnJGFwcGx5JyBvbiAnJHJvb3RTY29wZSchXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcm9vdFNjb3BlID0gcm9vdFNjb3BlRGVsZWdhdGU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgcHJvdmlkZS5kZWNvcmF0b3IoTkcxX1RFU1RBQklMSVRZLCBbXG4gICAgICAgICAgICAgICckZGVsZWdhdGUnLFxuICAgICAgICAgICAgICBmdW5jdGlvbih0ZXN0YWJpbGl0eURlbGVnYXRlOiBhbmd1bGFyLklUZXN0YWJpbGl0eVNlcnZpY2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmcyVGVzdGFiaWxpdHk6IFRlc3RhYmlsaXR5ID0gaW5qZWN0b3IuZ2V0KFRlc3RhYmlsaXR5KTtcblxuICAgICAgICAgICAgICAgIHZhciBvcmlnb25hbFdoZW5TdGFibGU6IEZ1bmN0aW9uID0gdGVzdGFiaWxpdHlEZWxlZ2F0ZS53aGVuU3RhYmxlO1xuICAgICAgICAgICAgICAgIHZhciBuZXdXaGVuU3RhYmxlID0gKGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgICAgdmFyIHdoZW5TdGFibGVDb250ZXh0OiBhbnkgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgb3JpZ29uYWxXaGVuU3RhYmxlLmNhbGwodGhpcywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZzJUZXN0YWJpbGl0eS5pc1N0YWJsZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBuZzJUZXN0YWJpbGl0eS53aGVuU3RhYmxlKG5ld1doZW5TdGFibGUuYmluZCh3aGVuU3RhYmxlQ29udGV4dCwgY2FsbGJhY2spKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHRlc3RhYmlsaXR5RGVsZWdhdGUud2hlblN0YWJsZSA9IG5ld1doZW5TdGFibGU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRlc3RhYmlsaXR5RGVsZWdhdGU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgXSk7XG5cbiAgICBuZzFjb21waWxlUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIG5nMU1vZHVsZS5ydW4oW1xuICAgICAgICAnJGluamVjdG9yJyxcbiAgICAgICAgJyRyb290U2NvcGUnLFxuICAgICAgICAoaW5qZWN0b3I6IGFuZ3VsYXIuSUluamVjdG9yU2VydmljZSwgcm9vdFNjb3BlOiBhbmd1bGFyLklSb290U2NvcGVTZXJ2aWNlKSA9PiB7XG4gICAgICAgICAgbmcxSW5qZWN0b3IgPSBpbmplY3RvcjtcbiAgICAgICAgICBPYnNlcnZhYmxlV3JhcHBlci5zdWJzY3JpYmUobmdab25lLm9uTWljcm90YXNrRW1wdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChfKSA9PiBuZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gcm9vdFNjb3BlLiRhcHBseSgpKSk7XG4gICAgICAgICAgVXBncmFkZU5nMUNvbXBvbmVudEFkYXB0ZXJCdWlsZGVyLnJlc29sdmUodGhpcy5kb3duZ3JhZGVkQ29tcG9uZW50cywgaW5qZWN0b3IpXG4gICAgICAgICAgICAgIC50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH1cbiAgICAgIF0pO1xuICAgIH0pO1xuXG4gICAgLy8gTWFrZSBzdXJlIHJlc3VtZUJvb3RzdHJhcCgpIG9ubHkgZXhpc3RzIGlmIHRoZSBjdXJyZW50IGJvb3RzdHJhcCBpcyBkZWZlcnJlZFxuICAgIHZhciB3aW5kb3dBbmd1bGFyID0gKDxhbnk+Z2xvYmFsKS5hbmd1bGFyO1xuICAgIHdpbmRvd0FuZ3VsYXIucmVzdW1lQm9vdHN0cmFwID0gdW5kZWZpbmVkO1xuXG4gICAgYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmRhdGEoY29udHJvbGxlcktleShORzJfSU5KRUNUT1IpLCBpbmplY3Rvcik7XG4gICAgbmdab25lLnJ1bigoKSA9PiB7IGFuZ3VsYXIuYm9vdHN0cmFwKGVsZW1lbnQsIFt0aGlzLmlkUHJlZml4XSwgY29uZmlnKTsgfSk7XG4gICAgbmcxQm9vdHN0cmFwUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh3aW5kb3dBbmd1bGFyLnJlc3VtZUJvb3RzdHJhcCkge1xuICAgICAgICB2YXIgb3JpZ2luYWxSZXN1bWVCb290c3RyYXA6ICgpID0+IHZvaWQgPSB3aW5kb3dBbmd1bGFyLnJlc3VtZUJvb3RzdHJhcDtcbiAgICAgICAgd2luZG93QW5ndWxhci5yZXN1bWVCb290c3RyYXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB3aW5kb3dBbmd1bGFyLnJlc3VtZUJvb3RzdHJhcCA9IG9yaWdpbmFsUmVzdW1lQm9vdHN0cmFwO1xuICAgICAgICAgIHdpbmRvd0FuZ3VsYXIucmVzdW1lQm9vdHN0cmFwLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgIHRoaXMuY29tcGlsZU5nMkNvbXBvbmVudHMoY29tcGlsZXIsIGNvbXBvbmVudEZhY3RvcnlSZWZNYXApLFxuICAgICAgICAgICAgIG5nMUJvb3RzdHJhcFByb21pc2UsXG4gICAgICAgICAgICAgbmcxY29tcGlsZVByb21pc2VcbiAgICAgICAgICAgXSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIG5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHJvb3RTY29wZVByb3RvdHlwZSkge1xuICAgICAgICAgICAgICByb290U2NvcGVQcm90b3R5cGUuJGFwcGx5ID0gb3JpZ2luYWwkYXBwbHlGbjsgIC8vIHJlc3RvcmUgb3JpZ2luYWwgJGFwcGx5XG4gICAgICAgICAgICAgIHdoaWxlIChkZWxheUFwcGx5RXhwcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByb290U2NvcGUuJGFwcGx5KGRlbGF5QXBwbHlFeHBzLnNoaWZ0KCkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICg8YW55PnVwZ3JhZGUpLl9ib290c3RyYXBEb25lKGFwcGxpY2F0aW9uUmVmLCBuZzFJbmplY3Rvcik7XG4gICAgICAgICAgICAgIHJvb3RTY29wZVByb3RvdHlwZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sIG9uRXJyb3IpO1xuICAgIHJldHVybiB1cGdyYWRlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBwcm92aWRlciB0byB0aGUgdG9wIGxldmVsIGVudmlyb25tZW50IG9mIGEgaHlicmlkIEFuZ3VsYXJKUyB2MSAvIEFuZ3VsYXIgdjIgYXBwbGljYXRpb24uXG4gICAqXG4gICAqIEluIGh5YnJpZCBBbmd1bGFySlMgdjEgLyBBbmd1bGFyIHYyIGFwcGxpY2F0aW9uLCB0aGVyZSBpcyBubyBvbmUgcm9vdCBBbmd1bGFyIHYyIGNvbXBvbmVudCxcbiAgICogZm9yIHRoaXMgcmVhc29uIHdlIHByb3ZpZGUgYW4gYXBwbGljYXRpb24gZ2xvYmFsIHdheSBvZiByZWdpc3RlcmluZyBwcm92aWRlcnMgd2hpY2ggaXNcbiAgICogY29uc2lzdGVudCB3aXRoIHNpbmdsZSBnbG9iYWwgaW5qZWN0aW9uIGluIEFuZ3VsYXJKUyB2MS5cbiAgICpcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICogYGBgXG4gICAqIGNsYXNzIEdyZWV0ZXIge1xuICAgKiAgIGdyZWV0KG5hbWUpIHtcbiAgICogICAgIGFsZXJ0KCdIZWxsbyAnICsgbmFtZSArICchJyk7XG4gICAqICAgfVxuICAgKiB9XG4gICAqXG4gICAqIEBDb21wb25lbnQoe1xuICAgKiAgIHNlbGVjdG9yOiAnYXBwJyxcbiAgICogICB0ZW1wbGF0ZTogJydcbiAgICogfSlcbiAgICogY2xhc3MgQXBwIHtcbiAgICogICBjb25zdHJ1Y3RvcihncmVldGVyOiBHcmVldGVyKSB7XG4gICAqICAgICB0aGlzLmdyZWV0ZXIoJ1dvcmxkJyk7XG4gICAqICAgfVxuICAgKiB9XG4gICAqXG4gICAqIHZhciBhZGFwdGVyID0gbmV3IFVwZ3JhZGVBZGFwdGVyKCk7XG4gICAqIGFkYXB0ZXIuYWRkUHJvdmlkZXIoR3JlZXRlcik7XG4gICAqXG4gICAqIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbXlFeGFtcGxlJywgW10pO1xuICAgKiBtb2R1bGUuZGlyZWN0aXZlKCdhcHAnLCBhZGFwdGVyLmRvd25ncmFkZU5nMkNvbXBvbmVudChBcHApKTtcbiAgICpcbiAgICogZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSAnPGFwcD48L2FwcD4nXG4gICAqIGFkYXB0ZXIuYm9vdHN0cmFwKGRvY3VtZW50LmJvZHksIFsnbXlFeGFtcGxlJ10pO1xuICAgKmBgYFxuICAgKi9cbiAgcHVibGljIGFkZFByb3ZpZGVyKHByb3ZpZGVyOiBUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXSk6IHZvaWQgeyB0aGlzLnByb3ZpZGVycy5wdXNoKHByb3ZpZGVyKTsgfVxuXG4gIC8qKlxuICAgKiBBbGxvd3MgQW5ndWxhckpTIHYxIHNlcnZpY2UgdG8gYmUgYWNjZXNzaWJsZSBmcm9tIEFuZ3VsYXIgdjIuXG4gICAqXG4gICAqXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIGBgYFxuICAgKiBjbGFzcyBMb2dpbiB7IC4uLiB9XG4gICAqIGNsYXNzIFNlcnZlciB7IC4uLiB9XG4gICAqXG4gICAqIEBJbmplY3RhYmxlKClcbiAgICogY2xhc3MgRXhhbXBsZSB7XG4gICAqICAgY29uc3RydWN0b3IoQEluamVjdCgnc2VydmVyJykgc2VydmVyLCBsb2dpbjogTG9naW4pIHtcbiAgICogICAgIC4uLlxuICAgKiAgIH1cbiAgICogfVxuICAgKlxuICAgKiB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ215RXhhbXBsZScsIFtdKTtcbiAgICogbW9kdWxlLnNlcnZpY2UoJ3NlcnZlcicsIFNlcnZlcik7XG4gICAqIG1vZHVsZS5zZXJ2aWNlKCdsb2dpbicsIExvZ2luKTtcbiAgICpcbiAgICogdmFyIGFkYXB0ZXIgPSBuZXcgVXBncmFkZUFkYXB0ZXIoKTtcbiAgICogYWRhcHRlci51cGdyYWRlTmcxUHJvdmlkZXIoJ3NlcnZlcicpO1xuICAgKiBhZGFwdGVyLnVwZ3JhZGVOZzFQcm92aWRlcignbG9naW4nLCB7YXNUb2tlbjogTG9naW59KTtcbiAgICogYWRhcHRlci5hZGRQcm92aWRlcihFeGFtcGxlKTtcbiAgICpcbiAgICogYWRhcHRlci5ib290c3RyYXAoZG9jdW1lbnQuYm9keSwgWydteUV4YW1wbGUnXSkucmVhZHkoKHJlZikgPT4ge1xuICAgKiAgIHZhciBleGFtcGxlOiBFeGFtcGxlID0gcmVmLm5nMkluamVjdG9yLmdldChFeGFtcGxlKTtcbiAgICogfSk7XG4gICAqXG4gICAqIGBgYFxuICAgKi9cbiAgcHVibGljIHVwZ3JhZGVOZzFQcm92aWRlcihuYW1lOiBzdHJpbmcsIG9wdGlvbnM/OiB7YXNUb2tlbjogYW55fSkge1xuICAgIHZhciB0b2tlbiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5hc1Rva2VuIHx8IG5hbWU7XG4gICAgdGhpcy5wcm92aWRlcnMucHVzaChwcm92aWRlKHRva2VuLCB7XG4gICAgICB1c2VGYWN0b3J5OiAobmcxSW5qZWN0b3I6IGFuZ3VsYXIuSUluamVjdG9yU2VydmljZSkgPT4gbmcxSW5qZWN0b3IuZ2V0KG5hbWUpLFxuICAgICAgZGVwczogW05HMV9JTkpFQ1RPUl1cbiAgICB9KSk7XG4gIH1cblxuICAvKipcbiAgICogQWxsb3dzIEFuZ3VsYXIgdjIgc2VydmljZSB0byBiZSBhY2Nlc3NpYmxlIGZyb20gQW5ndWxhckpTIHYxLlxuICAgKlxuICAgKlxuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiBgYGBcbiAgICogY2xhc3MgRXhhbXBsZSB7XG4gICAqIH1cbiAgICpcbiAgICogdmFyIGFkYXB0ZXIgPSBuZXcgVXBncmFkZUFkYXB0ZXIoKTtcbiAgICogYWRhcHRlci5hZGRQcm92aWRlcihFeGFtcGxlKTtcbiAgICpcbiAgICogdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdteUV4YW1wbGUnLCBbXSk7XG4gICAqIG1vZHVsZS5mYWN0b3J5KCdleGFtcGxlJywgYWRhcHRlci5kb3duZ3JhZGVOZzJQcm92aWRlcihFeGFtcGxlKSk7XG4gICAqXG4gICAqIGFkYXB0ZXIuYm9vdHN0cmFwKGRvY3VtZW50LmJvZHksIFsnbXlFeGFtcGxlJ10pLnJlYWR5KChyZWYpID0+IHtcbiAgICogICB2YXIgZXhhbXBsZTogRXhhbXBsZSA9IHJlZi5uZzFJbmplY3Rvci5nZXQoJ2V4YW1wbGUnKTtcbiAgICogfSk7XG4gICAqXG4gICAqIGBgYFxuICAgKi9cbiAgcHVibGljIGRvd25ncmFkZU5nMlByb3ZpZGVyKHRva2VuOiBhbnkpOiBGdW5jdGlvbiB7XG4gICAgdmFyIGZhY3RvcnkgPSBmdW5jdGlvbihpbmplY3RvcjogSW5qZWN0b3IpIHsgcmV0dXJuIGluamVjdG9yLmdldCh0b2tlbik7IH07XG4gICAgKDxhbnk+ZmFjdG9yeSkuJGluamVjdCA9IFtORzJfSU5KRUNUT1JdO1xuICAgIHJldHVybiBmYWN0b3J5O1xuICB9XG5cbiAgLyogQGludGVybmFsICovXG4gIHByaXZhdGUgY29tcGlsZU5nMkNvbXBvbmVudHMoY29tcGlsZXI6IENvbXBvbmVudFJlc29sdmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudEZhY3RvcnlSZWZNYXA6IENvbXBvbmVudEZhY3RvcnlSZWZNYXApOlxuICAgICAgUHJvbWlzZTxDb21wb25lbnRGYWN0b3J5UmVmTWFwPiB7XG4gICAgdmFyIHByb21pc2VzOiBBcnJheTxQcm9taXNlPENvbXBvbmVudEZhY3Rvcnk+PiA9IFtdO1xuICAgIHZhciB0eXBlcyA9IHRoaXMudXBncmFkZWRDb21wb25lbnRzO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHByb21pc2VzLnB1c2goY29tcGlsZXIucmVzb2x2ZUNvbXBvbmVudCh0eXBlc1tpXSkpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKGNvbXBvbmVudEZhY3RvcmllczogQXJyYXk8Q29tcG9uZW50RmFjdG9yeT4pID0+IHtcbiAgICAgIHZhciB0eXBlcyA9IHRoaXMudXBncmFkZWRDb21wb25lbnRzO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb21wb25lbnRGYWN0b3JpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29tcG9uZW50RmFjdG9yeVJlZk1hcFtnZXRDb21wb25lbnRJbmZvKHR5cGVzW2ldKS5zZWxlY3Rvcl0gPSBjb21wb25lbnRGYWN0b3JpZXNbaV07XG4gICAgICB9XG4gICAgICByZXR1cm4gY29tcG9uZW50RmFjdG9yeVJlZk1hcDtcbiAgICB9LCBvbkVycm9yKTtcbiAgfVxufVxuXG5pbnRlcmZhY2UgQ29tcG9uZW50RmFjdG9yeVJlZk1hcCB7XG4gIFtzZWxlY3Rvcjogc3RyaW5nXTogQ29tcG9uZW50RmFjdG9yeTtcbn1cblxuZnVuY3Rpb24gbmcxQ29tcG9uZW50RGlyZWN0aXZlKGluZm86IENvbXBvbmVudEluZm8sIGlkUHJlZml4OiBzdHJpbmcpOiBGdW5jdGlvbiB7XG4gICg8YW55PmRpcmVjdGl2ZUZhY3RvcnkpLiRpbmplY3QgPSBbTkcyX0NPTVBPTkVOVF9GQUNUT1JZX1JFRl9NQVAsIE5HMV9QQVJTRV07XG4gIGZ1bmN0aW9uIGRpcmVjdGl2ZUZhY3RvcnkoY29tcG9uZW50RmFjdG9yeVJlZk1hcDogQ29tcG9uZW50RmFjdG9yeVJlZk1hcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZTogYW5ndWxhci5JUGFyc2VTZXJ2aWNlKTogYW5ndWxhci5JRGlyZWN0aXZlIHtcbiAgICB2YXIgY29tcG9uZW50RmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeSA9IGNvbXBvbmVudEZhY3RvcnlSZWZNYXBbaW5mby5zZWxlY3Rvcl07XG4gICAgaWYgKCFjb21wb25lbnRGYWN0b3J5KSB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGluZyBDb21wb25lbnRGYWN0b3J5IGZvcjogJyArIGluZm8uc2VsZWN0b3IpO1xuICAgIHZhciBpZENvdW50ID0gMDtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcXVpcmU6IFJFUVVJUkVfSU5KRUNUT1IsXG4gICAgICBsaW5rOiB7XG4gICAgICAgIHBvc3Q6IChzY29wZTogYW5ndWxhci5JU2NvcGUsIGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgYXR0cnM6IGFuZ3VsYXIuSUF0dHJpYnV0ZXMsXG4gICAgICAgICAgICAgICBwYXJlbnRJbmplY3RvcjogYW55LCB0cmFuc2NsdWRlOiBhbmd1bGFyLklUcmFuc2NsdWRlRnVuY3Rpb24pOiB2b2lkID0+IHtcbiAgICAgICAgICB2YXIgZG9tRWxlbWVudCA9IDxhbnk+ZWxlbWVudFswXTtcbiAgICAgICAgICB2YXIgZmFjYWRlID1cbiAgICAgICAgICAgICAgbmV3IERvd25ncmFkZU5nMkNvbXBvbmVudEFkYXB0ZXIoaWRQcmVmaXggKyAoaWRDb3VudCsrKSwgaW5mbywgZWxlbWVudCwgYXR0cnMsIHNjb3BlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW5qZWN0b3I+cGFyZW50SW5qZWN0b3IsIHBhcnNlLCBjb21wb25lbnRGYWN0b3J5KTtcbiAgICAgICAgICBmYWNhZGUuc2V0dXBJbnB1dHMoKTtcbiAgICAgICAgICBmYWNhZGUuYm9vdHN0cmFwTmcyKCk7XG4gICAgICAgICAgZmFjYWRlLnByb2plY3RDb250ZW50KCk7XG4gICAgICAgICAgZmFjYWRlLnNldHVwT3V0cHV0cygpO1xuICAgICAgICAgIGZhY2FkZS5yZWdpc3RlckNsZWFudXAoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cbiAgcmV0dXJuIGRpcmVjdGl2ZUZhY3Rvcnk7XG59XG5cbi8qKlxuICogVXNlIGBVZ3JhZGVBZGFwdGVyUmVmYCB0byBjb250cm9sIGEgaHlicmlkIEFuZ3VsYXJKUyB2MSAvIEFuZ3VsYXIgdjIgYXBwbGljYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBVcGdyYWRlQWRhcHRlclJlZiB7XG4gIC8qIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIF9yZWFkeUZuOiAodXBncmFkZUFkYXB0ZXJSZWY/OiBVcGdyYWRlQWRhcHRlclJlZikgPT4gdm9pZCA9IG51bGw7XG5cbiAgcHVibGljIG5nMVJvb3RTY29wZTogYW5ndWxhci5JUm9vdFNjb3BlU2VydmljZSA9IG51bGw7XG4gIHB1YmxpYyBuZzFJbmplY3RvcjogYW5ndWxhci5JSW5qZWN0b3JTZXJ2aWNlID0gbnVsbDtcbiAgcHVibGljIG5nMkFwcGxpY2F0aW9uUmVmOiBBcHBsaWNhdGlvblJlZiA9IG51bGw7XG4gIHB1YmxpYyBuZzJJbmplY3RvcjogSW5qZWN0b3IgPSBudWxsO1xuXG4gIC8qIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIF9ib290c3RyYXBEb25lKGFwcGxpY2F0aW9uUmVmOiBBcHBsaWNhdGlvblJlZiwgbmcxSW5qZWN0b3I6IGFuZ3VsYXIuSUluamVjdG9yU2VydmljZSkge1xuICAgIHRoaXMubmcyQXBwbGljYXRpb25SZWYgPSBhcHBsaWNhdGlvblJlZjtcbiAgICB0aGlzLm5nMkluamVjdG9yID0gYXBwbGljYXRpb25SZWYuaW5qZWN0b3I7XG4gICAgdGhpcy5uZzFJbmplY3RvciA9IG5nMUluamVjdG9yO1xuICAgIHRoaXMubmcxUm9vdFNjb3BlID0gbmcxSW5qZWN0b3IuZ2V0KE5HMV9ST09UX1NDT1BFKTtcbiAgICB0aGlzLl9yZWFkeUZuICYmIHRoaXMuX3JlYWR5Rm4odGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgYSBjYWxsYmFjayBmdW5jdGlvbiB3aGljaCBpcyBub3RpZmllZCB1cG9uIHN1Y2Nlc3NmdWwgaHlicmlkIEFuZ3VsYXJKUyB2MSAvIEFuZ3VsYXIgdjJcbiAgICogYXBwbGljYXRpb24gaGFzIGJlZW4gYm9vdHN0cmFwcGVkLlxuICAgKlxuICAgKiBUaGUgYHJlYWR5YCBjYWxsYmFjayBmdW5jdGlvbiBpcyBpbnZva2VkIGluc2lkZSB0aGUgQW5ndWxhciB2MiB6b25lLCB0aGVyZWZvcmUgaXQgZG9lcyBub3RcbiAgICogcmVxdWlyZSBhIGNhbGwgdG8gYCRhcHBseSgpYC5cbiAgICovXG4gIHB1YmxpYyByZWFkeShmbjogKHVwZ3JhZGVBZGFwdGVyUmVmPzogVXBncmFkZUFkYXB0ZXJSZWYpID0+IHZvaWQpIHsgdGhpcy5fcmVhZHlGbiA9IGZuOyB9XG5cbiAgLyoqXG4gICAqIERpc3Bvc2Ugb2YgcnVubmluZyBoeWJyaWQgQW5ndWxhckpTIHYxIC8gQW5ndWxhciB2MiBhcHBsaWNhdGlvbi5cbiAgICovXG4gIHB1YmxpYyBkaXNwb3NlKCkge1xuICAgIHRoaXMubmcxSW5qZWN0b3IuZ2V0KE5HMV9ST09UX1NDT1BFKS4kZGVzdHJveSgpO1xuICAgIHRoaXMubmcyQXBwbGljYXRpb25SZWYuZGlzcG9zZSgpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
