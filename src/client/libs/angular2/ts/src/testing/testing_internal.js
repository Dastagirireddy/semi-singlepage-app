System.register(['angular2/src/facade/collection', 'angular2/src/facade/lang', 'angular2/core', './test_injector', './utils', './matchers'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var collection_1, lang_1, core_1, test_injector_1, utils_1;
    var proxy, _global, afterEach, AsyncTestCompleter, jsmBeforeEach, jsmDescribe, jsmDDescribe, jsmXDescribe, jsmIt, jsmIIt, jsmXIt, runnerStack, inIt, globalTimeOut, testInjector, BeforeEachRunner, SpyObject;
    function _describe(jsmFn) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var parentRunner = runnerStack.length === 0 ? null : runnerStack[runnerStack.length - 1];
        var runner = new BeforeEachRunner(parentRunner);
        runnerStack.push(runner);
        var suite = jsmFn.apply(void 0, args);
        runnerStack.pop();
        return suite;
    }
    function describe() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return _describe.apply(void 0, [jsmDescribe].concat(args));
    }
    exports_1("describe", describe);
    function ddescribe() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return _describe.apply(void 0, [jsmDDescribe].concat(args));
    }
    exports_1("ddescribe", ddescribe);
    function xdescribe() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return _describe.apply(void 0, [jsmXDescribe].concat(args));
    }
    exports_1("xdescribe", xdescribe);
    function beforeEach(fn) {
        if (runnerStack.length > 0) {
            // Inside a describe block, beforeEach() uses a BeforeEachRunner
            runnerStack[runnerStack.length - 1].beforeEach(fn);
        }
        else {
            // Top level beforeEach() are delegated to jasmine
            jsmBeforeEach(fn);
        }
    }
    exports_1("beforeEach", beforeEach);
    /**
     * Allows overriding default providers defined in test_injector.js.
     *
     * The given function must return a list of DI providers.
     *
     * Example:
     *
     *   beforeEachProviders(() => [
     *     provide(Compiler, {useClass: MockCompiler}),
     *     provide(SomeToken, {useValue: myValue}),
     *   ]);
     */
    function beforeEachProviders(fn) {
        jsmBeforeEach(function () {
            var providers = fn();
            if (!providers)
                return;
            testInjector.addProviders(providers);
        });
    }
    exports_1("beforeEachProviders", beforeEachProviders);
    /**
     * @deprecated
     */
    function beforeEachBindings(fn) {
        beforeEachProviders(fn);
    }
    exports_1("beforeEachBindings", beforeEachBindings);
    function _it(jsmFn, name, testFn, testTimeOut) {
        var runner = runnerStack[runnerStack.length - 1];
        var timeOut = lang_1.Math.max(globalTimeOut, testTimeOut);
        if (testFn instanceof test_injector_1.FunctionWithParamTokens) {
            // The test case uses inject(). ie `it('test', inject([AsyncTestCompleter], (async) => { ...
            // }));`
            if (testFn.hasToken(AsyncTestCompleter)) {
                jsmFn(name, function (done) {
                    var completerProvider = core_1.provide(AsyncTestCompleter, {
                        useFactory: function () {
                            // Mark the test as async when an AsyncTestCompleter is injected in an it()
                            if (!inIt)
                                throw new Error('AsyncTestCompleter can only be injected in an "it()"');
                            return new AsyncTestCompleter(done);
                        }
                    });
                    testInjector.addProviders([completerProvider]);
                    runner.run();
                    inIt = true;
                    testInjector.execute(testFn);
                    inIt = false;
                }, timeOut);
            }
            else {
                jsmFn(name, function () {
                    runner.run();
                    testInjector.execute(testFn);
                }, timeOut);
            }
        }
        else {
            // The test case doesn't use inject(). ie `it('test', (done) => { ... }));`
            if (testFn.length === 0) {
                jsmFn(name, function () {
                    runner.run();
                    testFn();
                }, timeOut);
            }
            else {
                jsmFn(name, function (done) {
                    runner.run();
                    testFn(done);
                }, timeOut);
            }
        }
    }
    function it(name, fn, timeOut) {
        if (timeOut === void 0) { timeOut = null; }
        return _it(jsmIt, name, fn, timeOut);
    }
    exports_1("it", it);
    function xit(name, fn, timeOut) {
        if (timeOut === void 0) { timeOut = null; }
        return _it(jsmXIt, name, fn, timeOut);
    }
    exports_1("xit", xit);
    function iit(name, fn, timeOut) {
        if (timeOut === void 0) { timeOut = null; }
        return _it(jsmIIt, name, fn, timeOut);
    }
    exports_1("iit", iit);
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (test_injector_1_1) {
                test_injector_1 = test_injector_1_1;
                exports_1({
                    "inject": test_injector_1_1["inject"]
                });
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (matchers_1_1) {
                exports_1({
                    "expect": matchers_1_1["expect"],
                    "NgMatchers": matchers_1_1["NgMatchers"]
                });
            }],
        execute: function() {
            exports_1("proxy", proxy = function (t) { return t; });
            _global = (typeof window === 'undefined' ? lang_1.global : window);
            exports_1("afterEach", afterEach = _global.afterEach);
            /**
             * Injectable completer that allows signaling completion of an asynchronous test. Used internally.
             */
            AsyncTestCompleter = (function () {
                function AsyncTestCompleter(_done) {
                    this._done = _done;
                }
                AsyncTestCompleter.prototype.done = function () { this._done(); };
                return AsyncTestCompleter;
            }());
            exports_1("AsyncTestCompleter", AsyncTestCompleter);
            jsmBeforeEach = _global.beforeEach;
            jsmDescribe = _global.describe;
            jsmDDescribe = _global.fdescribe;
            jsmXDescribe = _global.xdescribe;
            jsmIt = _global.it;
            jsmIIt = _global.fit;
            jsmXIt = _global.xit;
            runnerStack = [];
            inIt = false;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 500;
            globalTimeOut = utils_1.browserDetection.isSlow ? 3000 : jasmine.DEFAULT_TIMEOUT_INTERVAL;
            testInjector = test_injector_1.getTestInjector();
            /**
             * Mechanism to run `beforeEach()` functions of Angular tests.
             *
             * Note: Jasmine own `beforeEach` is used by this library to handle DI providers.
             */
            BeforeEachRunner = (function () {
                function BeforeEachRunner(_parent) {
                    this._parent = _parent;
                    this._fns = [];
                }
                BeforeEachRunner.prototype.beforeEach = function (fn) { this._fns.push(fn); };
                BeforeEachRunner.prototype.run = function () {
                    if (this._parent)
                        this._parent.run();
                    this._fns.forEach(function (fn) {
                        return lang_1.isFunction(fn) ? fn() :
                            (testInjector.execute(fn));
                    });
                };
                return BeforeEachRunner;
            }());
            // Reset the test providers before each test
            jsmBeforeEach(function () { testInjector.reset(); });
            SpyObject = (function () {
                function SpyObject(type) {
                    if (type === void 0) { type = null; }
                    if (type) {
                        for (var prop in type.prototype) {
                            var m = null;
                            try {
                                m = type.prototype[prop];
                            }
                            catch (e) {
                            }
                            if (typeof m === 'function') {
                                this.spy(prop);
                            }
                        }
                    }
                }
                // Noop so that SpyObject has the same interface as in Dart
                SpyObject.prototype.noSuchMethod = function (args) { };
                SpyObject.prototype.spy = function (name) {
                    if (!this[name]) {
                        this[name] = this._createGuinnessCompatibleSpy(name);
                    }
                    return this[name];
                };
                SpyObject.prototype.prop = function (name, value) { this[name] = value; };
                SpyObject.stub = function (object, config, overrides) {
                    if (object === void 0) { object = null; }
                    if (config === void 0) { config = null; }
                    if (overrides === void 0) { overrides = null; }
                    if (!(object instanceof SpyObject)) {
                        overrides = config;
                        config = object;
                        object = new SpyObject();
                    }
                    var m = collection_1.StringMapWrapper.merge(config, overrides);
                    collection_1.StringMapWrapper.forEach(m, function (value, key) { object.spy(key).andReturn(value); });
                    return object;
                };
                /** @internal */
                SpyObject.prototype._createGuinnessCompatibleSpy = function (name) {
                    var newSpy = jasmine.createSpy(name);
                    newSpy.andCallFake = newSpy.and.callFake;
                    newSpy.andReturn = newSpy.and.returnValue;
                    newSpy.reset = newSpy.calls.reset;
                    // revisit return null here (previously needed for rtts_assert).
                    newSpy.and.returnValue(null);
                    return newSpy;
                };
                return SpyObject;
            }());
            exports_1("SpyObject", SpyObject);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3Rlc3RpbmcvdGVzdGluZ19pbnRlcm5hbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBYVcsS0FBSyxFQUVaLE9BQU8sRUFFQSxTQUFTLHNCQWVoQixhQUFhLEVBQ2IsV0FBVyxFQUNYLFlBQVksRUFDWixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixNQUFNLEVBRU4sV0FBVyxFQUNYLElBQUksRUFFSixhQUFhLEVBRWIsWUFBWTtJQTBCaEIsbUJBQW1CLEtBQUs7UUFBRSxjQUFPO2FBQVAsV0FBTyxDQUFQLHNCQUFPLENBQVAsSUFBTztZQUFQLDZCQUFPOztRQUMvQixJQUFJLFlBQVksR0FBRyxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsR0FBRyxJQUFJLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDekYsSUFBSSxNQUFNLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNoRCxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pCLElBQUksS0FBSyxHQUFHLEtBQUssZUFBSSxJQUFJLENBQUMsQ0FBQztRQUMzQixXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEIsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRDtRQUF5QixjQUFPO2FBQVAsV0FBTyxDQUFQLHNCQUFPLENBQVAsSUFBTztZQUFQLDZCQUFPOztRQUM5QixNQUFNLENBQUMsU0FBUyxnQkFBQyxXQUFXLFNBQUssSUFBSSxFQUFDLENBQUM7SUFDekMsQ0FBQztJQUZELCtCQUVDLENBQUE7SUFFRDtRQUEwQixjQUFPO2FBQVAsV0FBTyxDQUFQLHNCQUFPLENBQVAsSUFBTztZQUFQLDZCQUFPOztRQUMvQixNQUFNLENBQUMsU0FBUyxnQkFBQyxZQUFZLFNBQUssSUFBSSxFQUFDLENBQUM7SUFDMUMsQ0FBQztJQUZELGlDQUVDLENBQUE7SUFFRDtRQUEwQixjQUFPO2FBQVAsV0FBTyxDQUFQLHNCQUFPLENBQVAsSUFBTztZQUFQLDZCQUFPOztRQUMvQixNQUFNLENBQUMsU0FBUyxnQkFBQyxZQUFZLFNBQUssSUFBSSxFQUFDLENBQUM7SUFDMUMsQ0FBQztJQUZELGlDQUVDLENBQUE7SUFFRCxvQkFBMkIsRUFBd0M7UUFDakUsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLGdFQUFnRTtZQUNoRSxXQUFXLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sa0RBQWtEO1lBQ2xELGFBQWEsQ0FBYSxFQUFFLENBQUMsQ0FBQztRQUNoQyxDQUFDO0lBQ0gsQ0FBQztJQVJELG1DQVFDLENBQUE7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILDZCQUFvQyxFQUFFO1FBQ3BDLGFBQWEsQ0FBQztZQUNaLElBQUksU0FBUyxHQUFHLEVBQUUsRUFBRSxDQUFDO1lBQ3JCLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUFDLE1BQU0sQ0FBQztZQUN2QixZQUFZLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQU5ELHFEQU1DLENBQUE7SUFFRDs7T0FFRztJQUNILDRCQUFtQyxFQUFFO1FBQ25DLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFGRCxtREFFQyxDQUFBO0lBRUQsYUFBYSxLQUFlLEVBQUUsSUFBWSxFQUFFLE1BQTJDLEVBQzFFLFdBQW1CO1FBQzlCLElBQUksTUFBTSxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2pELElBQUksT0FBTyxHQUFHLFdBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRW5ELEVBQUUsQ0FBQyxDQUFDLE1BQU0sWUFBWSx1Q0FBdUIsQ0FBQyxDQUFDLENBQUM7WUFDOUMsNEZBQTRGO1lBQzVGLFFBQVE7WUFFUixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxLQUFLLENBQUMsSUFBSSxFQUFFLFVBQUMsSUFBSTtvQkFDZixJQUFJLGlCQUFpQixHQUFHLGNBQU8sQ0FBQyxrQkFBa0IsRUFBRTt3QkFDbEQsVUFBVSxFQUFFOzRCQUNWLDJFQUEyRTs0QkFDM0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0NBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxzREFBc0QsQ0FBQyxDQUFDOzRCQUNuRixNQUFNLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDdEMsQ0FBQztxQkFDRixDQUFDLENBQUM7b0JBRUgsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztvQkFDL0MsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUViLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ1osWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxHQUFHLEtBQUssQ0FBQztnQkFDZixDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDZCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sS0FBSyxDQUFDLElBQUksRUFBRTtvQkFDVixNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQ2IsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0IsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ2QsQ0FBQztRQUVILENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLDJFQUEyRTtZQUUzRSxFQUFFLENBQUMsQ0FBTyxNQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLEtBQUssQ0FBQyxJQUFJLEVBQUU7b0JBQ1YsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUNBLE1BQU8sRUFBRSxDQUFDO2dCQUN6QixDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDZCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sS0FBSyxDQUFDLElBQUksRUFBRSxVQUFDLElBQUk7b0JBQ2YsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUNDLE1BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDOUIsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ2QsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRUQsWUFBbUIsSUFBSSxFQUFFLEVBQUUsRUFBRSxPQUFjO1FBQWQsdUJBQWMsR0FBZCxjQUFjO1FBQ3pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUZELG1CQUVDLENBQUE7SUFFRCxhQUFvQixJQUFJLEVBQUUsRUFBRSxFQUFFLE9BQWM7UUFBZCx1QkFBYyxHQUFkLGNBQWM7UUFDMUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRkQscUJBRUMsQ0FBQTtJQUVELGFBQW9CLElBQUksRUFBRSxFQUFFLEVBQUUsT0FBYztRQUFkLHVCQUFjLEdBQWQsY0FBYztRQUMxQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFGRCxxQkFFQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBaExVLG1CQUFBLEtBQUssR0FBbUIsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLEVBQUQsQ0FBQyxDQUFBLENBQUM7WUFFeEMsT0FBTyxHQUFRLENBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxHQUFHLGFBQU0sR0FBRyxNQUFNLENBQUMsQ0FBQztZQUUxRCx1QkFBQSxTQUFTLEdBQWEsT0FBTyxDQUFDLFNBQVMsQ0FBQSxDQUFDO1lBTW5EOztlQUVHO1lBQ0g7Z0JBQ0UsNEJBQW9CLEtBQWU7b0JBQWYsVUFBSyxHQUFMLEtBQUssQ0FBVTtnQkFBRyxDQUFDO2dCQUV2QyxpQ0FBSSxHQUFKLGNBQWUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDaEMseUJBQUM7WUFBRCxDQUpBLEFBSUMsSUFBQTtZQUpELG1EQUlDLENBQUE7WUFFRyxhQUFhLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztZQUNuQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztZQUMvQixZQUFZLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztZQUNqQyxZQUFZLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztZQUNqQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNuQixNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNyQixNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUVyQixXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLElBQUksR0FBRyxLQUFLLENBQUM7WUFDakIsT0FBTyxDQUFDLHdCQUF3QixHQUFHLEdBQUcsQ0FBQztZQUNuQyxhQUFhLEdBQUcsd0JBQWdCLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxPQUFPLENBQUMsd0JBQXdCLENBQUM7WUFFbEYsWUFBWSxHQUFHLCtCQUFlLEVBQUUsQ0FBQztZQUVyQzs7OztlQUlHO1lBQ0g7Z0JBR0UsMEJBQW9CLE9BQXlCO29CQUF6QixZQUFPLEdBQVAsT0FBTyxDQUFrQjtvQkFGckMsU0FBSSxHQUFnRCxFQUFFLENBQUM7Z0JBRWYsQ0FBQztnQkFFakQscUNBQVUsR0FBVixVQUFXLEVBQXdDLElBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVsRiw4QkFBRyxHQUFIO29CQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7d0JBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQyxFQUFFO3dCQUNuQixNQUFNLENBQUMsaUJBQVUsQ0FBQyxFQUFFLENBQUMsR0FBZ0IsRUFBRyxFQUFFOzRCQUNsQixDQUFDLFlBQVksQ0FBQyxPQUFPLENBQTBCLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQzlFLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUM7Z0JBQ0gsdUJBQUM7WUFBRCxDQWRBLEFBY0MsSUFBQTtZQUVELDRDQUE0QztZQUM1QyxhQUFhLENBQUMsY0FBUSxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQXNJL0M7Z0JBQ0UsbUJBQVksSUFBVztvQkFBWCxvQkFBVyxHQUFYLFdBQVc7b0JBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ1QsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7NEJBQ2hDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQzs0QkFDYixJQUFJLENBQUM7Z0NBQ0gsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQzNCLENBQUU7NEJBQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFLYixDQUFDOzRCQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0NBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ2pCLENBQUM7d0JBQ0gsQ0FBQztvQkFDSCxDQUFDO2dCQUNILENBQUM7Z0JBQ0QsMkRBQTJEO2dCQUMzRCxnQ0FBWSxHQUFaLFVBQWEsSUFBSSxJQUFHLENBQUM7Z0JBRXJCLHVCQUFHLEdBQUgsVUFBSSxJQUFJO29CQUNOLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDdkQsQ0FBQztvQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwQixDQUFDO2dCQUVELHdCQUFJLEdBQUosVUFBSyxJQUFJLEVBQUUsS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUVsQyxjQUFJLEdBQVgsVUFBWSxNQUFhLEVBQUUsTUFBYSxFQUFFLFNBQWdCO29CQUE5QyxzQkFBYSxHQUFiLGFBQWE7b0JBQUUsc0JBQWEsR0FBYixhQUFhO29CQUFFLHlCQUFnQixHQUFoQixnQkFBZ0I7b0JBQ3hELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLFlBQVksU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNuQyxTQUFTLEdBQUcsTUFBTSxDQUFDO3dCQUNuQixNQUFNLEdBQUcsTUFBTSxDQUFDO3dCQUNoQixNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztvQkFDM0IsQ0FBQztvQkFFRCxJQUFJLENBQUMsR0FBRyw2QkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUNsRCw2QkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLFVBQUMsS0FBSyxFQUFFLEdBQUcsSUFBTyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNuRixNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNoQixDQUFDO2dCQUVELGdCQUFnQjtnQkFDaEIsZ0RBQTRCLEdBQTVCLFVBQTZCLElBQUk7b0JBQy9CLElBQUksTUFBTSxHQUE4QixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNoRSxNQUFNLENBQUMsV0FBVyxHQUFRLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO29CQUM5QyxNQUFNLENBQUMsU0FBUyxHQUFRLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO29CQUMvQyxNQUFNLENBQUMsS0FBSyxHQUFRLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO29CQUN2QyxnRUFBZ0U7b0JBQ2hFLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM3QixNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNoQixDQUFDO2dCQUNILGdCQUFDO1lBQUQsQ0FyREEsQUFxREMsSUFBQTtZQXJERCxpQ0FxREMsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy90ZXN0aW5nL3Rlc3RpbmdfaW50ZXJuYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge2dsb2JhbCwgaXNGdW5jdGlvbiwgTWF0aH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuaW1wb3J0IHtwcm92aWRlfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcblxuaW1wb3J0IHtnZXRUZXN0SW5qZWN0b3IsIEZ1bmN0aW9uV2l0aFBhcmFtVG9rZW5zLCBpbmplY3R9IGZyb20gJy4vdGVzdF9pbmplY3Rvcic7XG5pbXBvcnQge2Jyb3dzZXJEZXRlY3Rpb259IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHtOZ1pvbmV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3pvbmUvbmdfem9uZSc7XG5cbmV4cG9ydCB7aW5qZWN0fSBmcm9tICcuL3Rlc3RfaW5qZWN0b3InO1xuXG5leHBvcnQge2V4cGVjdCwgTmdNYXRjaGVyc30gZnJvbSAnLi9tYXRjaGVycyc7XG5cbmV4cG9ydCB2YXIgcHJveHk6IENsYXNzRGVjb3JhdG9yID0gKHQpID0+IHQ7XG5cbnZhciBfZ2xvYmFsID0gPGFueT4odHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB3aW5kb3cpO1xuXG5leHBvcnQgdmFyIGFmdGVyRWFjaDogRnVuY3Rpb24gPSBfZ2xvYmFsLmFmdGVyRWFjaDtcblxuZXhwb3J0IHR5cGUgU3luY1Rlc3RGbiA9ICgpID0+IHZvaWQ7XG50eXBlIEFzeW5jVGVzdEZuID0gKGRvbmU6ICgpID0+IHZvaWQpID0+IHZvaWQ7XG50eXBlIEFueVRlc3RGbiA9IFN5bmNUZXN0Rm4gfCBBc3luY1Rlc3RGbjtcblxuLyoqXG4gKiBJbmplY3RhYmxlIGNvbXBsZXRlciB0aGF0IGFsbG93cyBzaWduYWxpbmcgY29tcGxldGlvbiBvZiBhbiBhc3luY2hyb25vdXMgdGVzdC4gVXNlZCBpbnRlcm5hbGx5LlxuICovXG5leHBvcnQgY2xhc3MgQXN5bmNUZXN0Q29tcGxldGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZG9uZTogRnVuY3Rpb24pIHt9XG5cbiAgZG9uZSgpOiB2b2lkIHsgdGhpcy5fZG9uZSgpOyB9XG59XG5cbnZhciBqc21CZWZvcmVFYWNoID0gX2dsb2JhbC5iZWZvcmVFYWNoO1xudmFyIGpzbURlc2NyaWJlID0gX2dsb2JhbC5kZXNjcmliZTtcbnZhciBqc21ERGVzY3JpYmUgPSBfZ2xvYmFsLmZkZXNjcmliZTtcbnZhciBqc21YRGVzY3JpYmUgPSBfZ2xvYmFsLnhkZXNjcmliZTtcbnZhciBqc21JdCA9IF9nbG9iYWwuaXQ7XG52YXIganNtSUl0ID0gX2dsb2JhbC5maXQ7XG52YXIganNtWEl0ID0gX2dsb2JhbC54aXQ7XG5cbnZhciBydW5uZXJTdGFjayA9IFtdO1xudmFyIGluSXQgPSBmYWxzZTtcbmphc21pbmUuREVGQVVMVF9USU1FT1VUX0lOVEVSVkFMID0gNTAwO1xudmFyIGdsb2JhbFRpbWVPdXQgPSBicm93c2VyRGV0ZWN0aW9uLmlzU2xvdyA/IDMwMDAgOiBqYXNtaW5lLkRFRkFVTFRfVElNRU9VVF9JTlRFUlZBTDtcblxudmFyIHRlc3RJbmplY3RvciA9IGdldFRlc3RJbmplY3RvcigpO1xuXG4vKipcbiAqIE1lY2hhbmlzbSB0byBydW4gYGJlZm9yZUVhY2goKWAgZnVuY3Rpb25zIG9mIEFuZ3VsYXIgdGVzdHMuXG4gKlxuICogTm90ZTogSmFzbWluZSBvd24gYGJlZm9yZUVhY2hgIGlzIHVzZWQgYnkgdGhpcyBsaWJyYXJ5IHRvIGhhbmRsZSBESSBwcm92aWRlcnMuXG4gKi9cbmNsYXNzIEJlZm9yZUVhY2hSdW5uZXIge1xuICBwcml2YXRlIF9mbnM6IEFycmF5PEZ1bmN0aW9uV2l0aFBhcmFtVG9rZW5zIHwgU3luY1Rlc3RGbj4gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wYXJlbnQ6IEJlZm9yZUVhY2hSdW5uZXIpIHt9XG5cbiAgYmVmb3JlRWFjaChmbjogRnVuY3Rpb25XaXRoUGFyYW1Ub2tlbnMgfCBTeW5jVGVzdEZuKTogdm9pZCB7IHRoaXMuX2Zucy5wdXNoKGZuKTsgfVxuXG4gIHJ1bigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fcGFyZW50KSB0aGlzLl9wYXJlbnQucnVuKCk7XG4gICAgdGhpcy5fZm5zLmZvckVhY2goKGZuKSA9PiB7XG4gICAgICByZXR1cm4gaXNGdW5jdGlvbihmbikgPyAoPFN5bmNUZXN0Rm4+Zm4pKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRlc3RJbmplY3Rvci5leGVjdXRlKDxGdW5jdGlvbldpdGhQYXJhbVRva2Vucz5mbikpO1xuICAgIH0pO1xuICB9XG59XG5cbi8vIFJlc2V0IHRoZSB0ZXN0IHByb3ZpZGVycyBiZWZvcmUgZWFjaCB0ZXN0XG5qc21CZWZvcmVFYWNoKCgpID0+IHsgdGVzdEluamVjdG9yLnJlc2V0KCk7IH0pO1xuXG5mdW5jdGlvbiBfZGVzY3JpYmUoanNtRm4sIC4uLmFyZ3MpIHtcbiAgdmFyIHBhcmVudFJ1bm5lciA9IHJ1bm5lclN0YWNrLmxlbmd0aCA9PT0gMCA/IG51bGwgOiBydW5uZXJTdGFja1tydW5uZXJTdGFjay5sZW5ndGggLSAxXTtcbiAgdmFyIHJ1bm5lciA9IG5ldyBCZWZvcmVFYWNoUnVubmVyKHBhcmVudFJ1bm5lcik7XG4gIHJ1bm5lclN0YWNrLnB1c2gocnVubmVyKTtcbiAgdmFyIHN1aXRlID0ganNtRm4oLi4uYXJncyk7XG4gIHJ1bm5lclN0YWNrLnBvcCgpO1xuICByZXR1cm4gc3VpdGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXNjcmliZSguLi5hcmdzKTogdm9pZCB7XG4gIHJldHVybiBfZGVzY3JpYmUoanNtRGVzY3JpYmUsIC4uLmFyZ3MpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGRlc2NyaWJlKC4uLmFyZ3MpOiB2b2lkIHtcbiAgcmV0dXJuIF9kZXNjcmliZShqc21ERGVzY3JpYmUsIC4uLmFyZ3MpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24geGRlc2NyaWJlKC4uLmFyZ3MpOiB2b2lkIHtcbiAgcmV0dXJuIF9kZXNjcmliZShqc21YRGVzY3JpYmUsIC4uLmFyZ3MpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmVmb3JlRWFjaChmbjogRnVuY3Rpb25XaXRoUGFyYW1Ub2tlbnMgfCBTeW5jVGVzdEZuKTogdm9pZCB7XG4gIGlmIChydW5uZXJTdGFjay5sZW5ndGggPiAwKSB7XG4gICAgLy8gSW5zaWRlIGEgZGVzY3JpYmUgYmxvY2ssIGJlZm9yZUVhY2goKSB1c2VzIGEgQmVmb3JlRWFjaFJ1bm5lclxuICAgIHJ1bm5lclN0YWNrW3J1bm5lclN0YWNrLmxlbmd0aCAtIDFdLmJlZm9yZUVhY2goZm4pO1xuICB9IGVsc2Uge1xuICAgIC8vIFRvcCBsZXZlbCBiZWZvcmVFYWNoKCkgYXJlIGRlbGVnYXRlZCB0byBqYXNtaW5lXG4gICAganNtQmVmb3JlRWFjaCg8U3luY1Rlc3RGbj5mbik7XG4gIH1cbn1cblxuLyoqXG4gKiBBbGxvd3Mgb3ZlcnJpZGluZyBkZWZhdWx0IHByb3ZpZGVycyBkZWZpbmVkIGluIHRlc3RfaW5qZWN0b3IuanMuXG4gKlxuICogVGhlIGdpdmVuIGZ1bmN0aW9uIG11c3QgcmV0dXJuIGEgbGlzdCBvZiBESSBwcm92aWRlcnMuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgIGJlZm9yZUVhY2hQcm92aWRlcnMoKCkgPT4gW1xuICogICAgIHByb3ZpZGUoQ29tcGlsZXIsIHt1c2VDbGFzczogTW9ja0NvbXBpbGVyfSksXG4gKiAgICAgcHJvdmlkZShTb21lVG9rZW4sIHt1c2VWYWx1ZTogbXlWYWx1ZX0pLFxuICogICBdKTtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJlZm9yZUVhY2hQcm92aWRlcnMoZm4pOiB2b2lkIHtcbiAganNtQmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgdmFyIHByb3ZpZGVycyA9IGZuKCk7XG4gICAgaWYgKCFwcm92aWRlcnMpIHJldHVybjtcbiAgICB0ZXN0SW5qZWN0b3IuYWRkUHJvdmlkZXJzKHByb3ZpZGVycyk7XG4gIH0pO1xufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiZWZvcmVFYWNoQmluZGluZ3MoZm4pOiB2b2lkIHtcbiAgYmVmb3JlRWFjaFByb3ZpZGVycyhmbik7XG59XG5cbmZ1bmN0aW9uIF9pdChqc21GbjogRnVuY3Rpb24sIG5hbWU6IHN0cmluZywgdGVzdEZuOiBGdW5jdGlvbldpdGhQYXJhbVRva2VucyB8IEFueVRlc3RGbixcbiAgICAgICAgICAgICB0ZXN0VGltZU91dDogbnVtYmVyKTogdm9pZCB7XG4gIHZhciBydW5uZXIgPSBydW5uZXJTdGFja1tydW5uZXJTdGFjay5sZW5ndGggLSAxXTtcbiAgdmFyIHRpbWVPdXQgPSBNYXRoLm1heChnbG9iYWxUaW1lT3V0LCB0ZXN0VGltZU91dCk7XG5cbiAgaWYgKHRlc3RGbiBpbnN0YW5jZW9mIEZ1bmN0aW9uV2l0aFBhcmFtVG9rZW5zKSB7XG4gICAgLy8gVGhlIHRlc3QgY2FzZSB1c2VzIGluamVjdCgpLiBpZSBgaXQoJ3Rlc3QnLCBpbmplY3QoW0FzeW5jVGVzdENvbXBsZXRlcl0sIChhc3luYykgPT4geyAuLi5cbiAgICAvLyB9KSk7YFxuXG4gICAgaWYgKHRlc3RGbi5oYXNUb2tlbihBc3luY1Rlc3RDb21wbGV0ZXIpKSB7XG4gICAgICBqc21GbihuYW1lLCAoZG9uZSkgPT4ge1xuICAgICAgICB2YXIgY29tcGxldGVyUHJvdmlkZXIgPSBwcm92aWRlKEFzeW5jVGVzdENvbXBsZXRlciwge1xuICAgICAgICAgIHVzZUZhY3Rvcnk6ICgpID0+IHtcbiAgICAgICAgICAgIC8vIE1hcmsgdGhlIHRlc3QgYXMgYXN5bmMgd2hlbiBhbiBBc3luY1Rlc3RDb21wbGV0ZXIgaXMgaW5qZWN0ZWQgaW4gYW4gaXQoKVxuICAgICAgICAgICAgaWYgKCFpbkl0KSB0aHJvdyBuZXcgRXJyb3IoJ0FzeW5jVGVzdENvbXBsZXRlciBjYW4gb25seSBiZSBpbmplY3RlZCBpbiBhbiBcIml0KClcIicpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBBc3luY1Rlc3RDb21wbGV0ZXIoZG9uZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0ZXN0SW5qZWN0b3IuYWRkUHJvdmlkZXJzKFtjb21wbGV0ZXJQcm92aWRlcl0pO1xuICAgICAgICBydW5uZXIucnVuKCk7XG5cbiAgICAgICAgaW5JdCA9IHRydWU7XG4gICAgICAgIHRlc3RJbmplY3Rvci5leGVjdXRlKHRlc3RGbik7XG4gICAgICAgIGluSXQgPSBmYWxzZTtcbiAgICAgIH0sIHRpbWVPdXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBqc21GbihuYW1lLCAoKSA9PiB7XG4gICAgICAgIHJ1bm5lci5ydW4oKTtcbiAgICAgICAgdGVzdEluamVjdG9yLmV4ZWN1dGUodGVzdEZuKTtcbiAgICAgIH0sIHRpbWVPdXQpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIC8vIFRoZSB0ZXN0IGNhc2UgZG9lc24ndCB1c2UgaW5qZWN0KCkuIGllIGBpdCgndGVzdCcsIChkb25lKSA9PiB7IC4uLiB9KSk7YFxuXG4gICAgaWYgKCg8YW55PnRlc3RGbikubGVuZ3RoID09PSAwKSB7XG4gICAgICBqc21GbihuYW1lLCAoKSA9PiB7XG4gICAgICAgIHJ1bm5lci5ydW4oKTtcbiAgICAgICAgKDxTeW5jVGVzdEZuPnRlc3RGbikoKTtcbiAgICAgIH0sIHRpbWVPdXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBqc21GbihuYW1lLCAoZG9uZSkgPT4ge1xuICAgICAgICBydW5uZXIucnVuKCk7XG4gICAgICAgICg8QXN5bmNUZXN0Rm4+dGVzdEZuKShkb25lKTtcbiAgICAgIH0sIHRpbWVPdXQpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXQobmFtZSwgZm4sIHRpbWVPdXQgPSBudWxsKTogdm9pZCB7XG4gIHJldHVybiBfaXQoanNtSXQsIG5hbWUsIGZuLCB0aW1lT3V0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHhpdChuYW1lLCBmbiwgdGltZU91dCA9IG51bGwpOiB2b2lkIHtcbiAgcmV0dXJuIF9pdChqc21YSXQsIG5hbWUsIGZuLCB0aW1lT3V0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlpdChuYW1lLCBmbiwgdGltZU91dCA9IG51bGwpOiB2b2lkIHtcbiAgcmV0dXJuIF9pdChqc21JSXQsIG5hbWUsIGZuLCB0aW1lT3V0KTtcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIEd1aW5lc3NDb21wYXRpYmxlU3B5IGV4dGVuZHMgamFzbWluZS5TcHkge1xuICAvKiogQnkgY2hhaW5pbmcgdGhlIHNweSB3aXRoIGFuZC5yZXR1cm5WYWx1ZSwgYWxsIGNhbGxzIHRvIHRoZSBmdW5jdGlvbiB3aWxsIHJldHVybiBhIHNwZWNpZmljXG4gICAqIHZhbHVlLiAqL1xuICBhbmRSZXR1cm4odmFsOiBhbnkpOiB2b2lkO1xuICAvKiogQnkgY2hhaW5pbmcgdGhlIHNweSB3aXRoIGFuZC5jYWxsRmFrZSwgYWxsIGNhbGxzIHRvIHRoZSBzcHkgd2lsbCBkZWxlZ2F0ZSB0byB0aGUgc3VwcGxpZWRcbiAgICogZnVuY3Rpb24uICovXG4gIGFuZENhbGxGYWtlKGZuOiBGdW5jdGlvbik6IEd1aW5lc3NDb21wYXRpYmxlU3B5O1xuICAvKiogcmVtb3ZlcyBhbGwgcmVjb3JkZWQgY2FsbHMgKi9cbiAgcmVzZXQoKTtcbn1cblxuZXhwb3J0IGNsYXNzIFNweU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKHR5cGUgPSBudWxsKSB7XG4gICAgaWYgKHR5cGUpIHtcbiAgICAgIGZvciAodmFyIHByb3AgaW4gdHlwZS5wcm90b3R5cGUpIHtcbiAgICAgICAgdmFyIG0gPSBudWxsO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIG0gPSB0eXBlLnByb3RvdHlwZVtwcm9wXTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIEFzIHdlIGFyZSBjcmVhdGluZyBzcHlzIGZvciBhYnN0cmFjdCBjbGFzc2VzLFxuICAgICAgICAgIC8vIHRoZXNlIGNsYXNzZXMgbWlnaHQgaGF2ZSBnZXR0ZXJzIHRoYXQgdGhyb3cgd2hlbiB0aGV5IGFyZSBhY2Nlc3NlZC5cbiAgICAgICAgICAvLyBBcyB3ZSBhcmUgb25seSBhdXRvIGNyZWF0aW5nIHNweXMgZm9yIG1ldGhvZHMsIHRoaXNcbiAgICAgICAgICAvLyBzaG91bGQgbm90IG1hdHRlci5cbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIG0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0aGlzLnNweShwcm9wKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICAvLyBOb29wIHNvIHRoYXQgU3B5T2JqZWN0IGhhcyB0aGUgc2FtZSBpbnRlcmZhY2UgYXMgaW4gRGFydFxuICBub1N1Y2hNZXRob2QoYXJncykge31cblxuICBzcHkobmFtZSkge1xuICAgIGlmICghdGhpc1tuYW1lXSkge1xuICAgICAgdGhpc1tuYW1lXSA9IHRoaXMuX2NyZWF0ZUd1aW5uZXNzQ29tcGF0aWJsZVNweShuYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNbbmFtZV07XG4gIH1cblxuICBwcm9wKG5hbWUsIHZhbHVlKSB7IHRoaXNbbmFtZV0gPSB2YWx1ZTsgfVxuXG4gIHN0YXRpYyBzdHViKG9iamVjdCA9IG51bGwsIGNvbmZpZyA9IG51bGwsIG92ZXJyaWRlcyA9IG51bGwpIHtcbiAgICBpZiAoIShvYmplY3QgaW5zdGFuY2VvZiBTcHlPYmplY3QpKSB7XG4gICAgICBvdmVycmlkZXMgPSBjb25maWc7XG4gICAgICBjb25maWcgPSBvYmplY3Q7XG4gICAgICBvYmplY3QgPSBuZXcgU3B5T2JqZWN0KCk7XG4gICAgfVxuXG4gICAgdmFyIG0gPSBTdHJpbmdNYXBXcmFwcGVyLm1lcmdlKGNvbmZpZywgb3ZlcnJpZGVzKTtcbiAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2gobSwgKHZhbHVlLCBrZXkpID0+IHsgb2JqZWN0LnNweShrZXkpLmFuZFJldHVybih2YWx1ZSk7IH0pO1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9jcmVhdGVHdWlubmVzc0NvbXBhdGlibGVTcHkobmFtZSk6IEd1aW5lc3NDb21wYXRpYmxlU3B5IHtcbiAgICB2YXIgbmV3U3B5OiBHdWluZXNzQ29tcGF0aWJsZVNweSA9IDxhbnk+amFzbWluZS5jcmVhdGVTcHkobmFtZSk7XG4gICAgbmV3U3B5LmFuZENhbGxGYWtlID0gPGFueT5uZXdTcHkuYW5kLmNhbGxGYWtlO1xuICAgIG5ld1NweS5hbmRSZXR1cm4gPSA8YW55Pm5ld1NweS5hbmQucmV0dXJuVmFsdWU7XG4gICAgbmV3U3B5LnJlc2V0ID0gPGFueT5uZXdTcHkuY2FsbHMucmVzZXQ7XG4gICAgLy8gcmV2aXNpdCByZXR1cm4gbnVsbCBoZXJlIChwcmV2aW91c2x5IG5lZWRlZCBmb3IgcnR0c19hc3NlcnQpLlxuICAgIG5ld1NweS5hbmQucmV0dXJuVmFsdWUobnVsbCk7XG4gICAgcmV0dXJuIG5ld1NweTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
