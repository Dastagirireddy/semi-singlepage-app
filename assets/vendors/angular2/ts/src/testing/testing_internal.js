System.register(['angular2/src/facade/collection', 'angular2/src/facade/lang', 'angular2/core', './async_test_completer', './test_injector', './utils', './matchers'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var collection_1, lang_1, core_1, async_test_completer_1, test_injector_1, utils_1;
    var proxy, _global, afterEach, jsmBeforeEach, jsmDescribe, jsmDDescribe, jsmXDescribe, jsmIt, jsmIIt, jsmXIt, runnerStack, inIt, globalTimeOut, testInjector, BeforeEachRunner, SpyObject;
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
        jsmFn(name, function (done) {
            var completerProvider = core_1.provide(async_test_completer_1.AsyncTestCompleter, {
                useFactory: function () {
                    // Mark the test as async when an AsyncTestCompleter is injected in an it()
                    if (!inIt)
                        throw new Error('AsyncTestCompleter can only be injected in an "it()"');
                    return new async_test_completer_1.AsyncTestCompleter();
                }
            });
            testInjector.addProviders([completerProvider]);
            runner.run();
            inIt = true;
            if (testFn.length == 0) {
                var retVal = testFn();
                if (lang_1.isPromise(retVal)) {
                    // Asynchronous test function that returns a Promise - wait for completion.
                    retVal.then(done, done.fail);
                }
                else {
                    // Synchronous test function - complete immediately.
                    done();
                }
            }
            else {
                // Asynchronous test function that takes in 'done' parameter.
                testFn(done);
            }
            inIt = false;
        }, timeOut);
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
            function (async_test_completer_1_1) {
                async_test_completer_1 = async_test_completer_1_1;
                exports_1({
                    "AsyncTestCompleter": async_test_completer_1_1["AsyncTestCompleter"]
                });
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
                    this._fns.forEach(function (fn) { fn(); });
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy90ZXN0aW5nL3Rlc3RpbmdfaW50ZXJuYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQWNXLEtBQUssRUFFWixPQUFPLEVBRUEsU0FBUyxFQUVoQixhQUFhLEVBQ2IsV0FBVyxFQUNYLFlBQVksRUFDWixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixNQUFNLEVBRU4sV0FBVyxFQUNYLElBQUksRUFFSixhQUFhLEVBRWIsWUFBWTtJQXVCaEIsbUJBQW1CLEtBQUs7UUFBRSxjQUFPO2FBQVAsV0FBTyxDQUFQLHNCQUFPLENBQVAsSUFBTztZQUFQLDZCQUFPOztRQUMvQixJQUFJLFlBQVksR0FBRyxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsR0FBRyxJQUFJLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDekYsSUFBSSxNQUFNLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNoRCxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pCLElBQUksS0FBSyxHQUFHLEtBQUssZUFBSSxJQUFJLENBQUMsQ0FBQztRQUMzQixXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEIsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRDtRQUF5QixjQUFPO2FBQVAsV0FBTyxDQUFQLHNCQUFPLENBQVAsSUFBTztZQUFQLDZCQUFPOztRQUM5QixNQUFNLENBQUMsU0FBUyxnQkFBQyxXQUFXLFNBQUssSUFBSSxFQUFDLENBQUM7SUFDekMsQ0FBQztJQUZELCtCQUVDLENBQUE7SUFFRDtRQUEwQixjQUFPO2FBQVAsV0FBTyxDQUFQLHNCQUFPLENBQVAsSUFBTztZQUFQLDZCQUFPOztRQUMvQixNQUFNLENBQUMsU0FBUyxnQkFBQyxZQUFZLFNBQUssSUFBSSxFQUFDLENBQUM7SUFDMUMsQ0FBQztJ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LENBQUMsR0FBRyw2QkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUNsRCw2QkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLFVBQUMsS0FBSyxFQUFFLEdBQUcsSUFBTyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNuRixNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNoQixDQUFDO2dCQUVELGdCQUFnQjtnQkFDaEIsZ0RBQTRCLEdBQTVCLFVBQTZCLElBQUk7b0JBQy9CLElBQUksTUFBTSxHQUE4QixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNoRSxNQUFNLENBQUMsV0FBVyxHQUFRLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO29CQUM5QyxNQUFNLENBQUMsU0FBUyxHQUFRLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO29CQUMvQyxNQUFNLENBQUMsS0FBSyxHQUFRLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO29CQUN2QyxnRUFBZ0U7b0JBQ2hFLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM3QixNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNoQixDQUFDO2dCQUNILGdCQUFDO1lBQUQsQ0FyREEsQUFxREMsSUFBQTtZQXJERCxpQ0FxREMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvdGVzdGluZy90ZXN0aW5nX2ludGVybmFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdHJpbmdNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtnbG9iYWwsIGlzUHJvbWlzZSwgTWF0aH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuaW1wb3J0IHtwcm92aWRlfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcblxuaW1wb3J0IHtBc3luY1Rlc3RDb21wbGV0ZXJ9IGZyb20gJy4vYXN5bmNfdGVzdF9jb21wbGV0ZXInO1xuaW1wb3J0IHtnZXRUZXN0SW5qZWN0b3IsIGluamVjdH0gZnJvbSAnLi90ZXN0X2luamVjdG9yJztcbmltcG9ydCB7YnJvd3NlckRldGVjdGlvbn0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCB7QXN5bmNUZXN0Q29tcGxldGVyfSBmcm9tICcuL2FzeW5jX3Rlc3RfY29tcGxldGVyJztcbmV4cG9ydCB7aW5qZWN0fSBmcm9tICcuL3Rlc3RfaW5qZWN0b3InO1xuXG5leHBvcnQge2V4cGVjdCwgTmdNYXRjaGVyc30gZnJvbSAnLi9tYXRjaGVycyc7XG5cbmV4cG9ydCB2YXIgcHJveHk6IENsYXNzRGVjb3JhdG9yID0gKHQpID0+IHQ7XG5cbnZhciBfZ2xvYmFsID0gPGFueT4odHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB3aW5kb3cpO1xuXG5leHBvcnQgdmFyIGFmdGVyRWFjaDogRnVuY3Rpb24gPSBfZ2xvYmFsLmFmdGVyRWFjaDtcblxudmFyIGpzbUJlZm9yZUVhY2ggPSBfZ2xvYmFsLmJlZm9yZUVhY2g7XG52YXIganNtRGVzY3JpYmUgPSBfZ2xvYmFsLmRlc2NyaWJlO1xudmFyIGpzbUREZXNjcmliZSA9IF9nbG9iYWwuZmRlc2NyaWJlO1xudmFyIGpzbVhEZXNjcmliZSA9IF9nbG9iYWwueGRlc2NyaWJlO1xudmFyIGpzbUl0ID0gX2dsb2JhbC5pdDtcbnZhciBqc21JSXQgPSBfZ2xvYmFsLmZpdDtcbnZhciBqc21YSXQgPSBfZ2xvYmFsLnhpdDtcblxudmFyIHJ1bm5lclN0YWNrID0gW107XG52YXIgaW5JdCA9IGZhbHNlO1xuamFzbWluZS5ERUZBVUxUX1RJTUVPVVRfSU5URVJWQUwgPSA1MDA7XG52YXIgZ2xvYmFsVGltZU91dCA9IGJyb3dzZXJEZXRlY3Rpb24uaXNTbG93ID8gMzAwMCA6IGphc21pbmUuREVGQVVMVF9USU1FT1VUX0lOVEVSVkFMO1xuXG52YXIgdGVzdEluamVjdG9yID0gZ2V0VGVzdEluamVjdG9yKCk7XG5cbi8qKlxuICogTWVjaGFuaXNtIHRvIHJ1biBgYmVmb3JlRWFjaCgpYCBmdW5jdGlvbnMgb2YgQW5ndWxhciB0ZXN0cy5cbiAqXG4gKiBOb3RlOiBKYXNtaW5lIG93biBgYmVmb3JlRWFjaGAgaXMgdXNlZCBieSB0aGlzIGxpYnJhcnkgdG8gaGFuZGxlIERJIHByb3ZpZGVycy5cbiAqL1xuY2xhc3MgQmVmb3JlRWFjaFJ1bm5lciB7XG4gIHByaXZhdGUgX2ZuczogQXJyYXk8RnVuY3Rpb24+ID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGFyZW50OiBCZWZvcmVFYWNoUnVubmVyKSB7fVxuXG4gIGJlZm9yZUVhY2goZm46IEZ1bmN0aW9uKTogdm9pZCB7IHRoaXMuX2Zucy5wdXNoKGZuKTsgfVxuXG4gIHJ1bigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fcGFyZW50KSB0aGlzLl9wYXJlbnQucnVuKCk7XG4gICAgdGhpcy5fZm5zLmZvckVhY2goKGZuKSA9PiB7IGZuKCk7IH0pO1xuICB9XG59XG5cbi8vIFJlc2V0IHRoZSB0ZXN0IHByb3ZpZGVycyBiZWZvcmUgZWFjaCB0ZXN0XG5qc21CZWZvcmVFYWNoKCgpID0+IHsgdGVzdEluamVjdG9yLnJlc2V0KCk7IH0pO1xuXG5mdW5jdGlvbiBfZGVzY3JpYmUoanNtRm4sIC4uLmFyZ3MpIHtcbiAgdmFyIHBhcmVudFJ1bm5lciA9IHJ1bm5lclN0YWNrLmxlbmd0aCA9PT0gMCA/IG51bGwgOiBydW5uZXJTdGFja1tydW5uZXJTdGFjay5sZW5ndGggLSAxXTtcbiAgdmFyIHJ1bm5lciA9IG5ldyBCZWZvcmVFYWNoUnVubmVyKHBhcmVudFJ1bm5lcik7XG4gIHJ1bm5lclN0YWNrLnB1c2gocnVubmVyKTtcbiAgdmFyIHN1aXRlID0ganNtRm4oLi4uYXJncyk7XG4gIHJ1bm5lclN0YWNrLnBvcCgpO1xuICByZXR1cm4gc3VpdGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXNjcmliZSguLi5hcmdzKTogdm9pZCB7XG4gIHJldHVybiBfZGVzY3JpYmUoanNtRGVzY3JpYmUsIC4uLmFyZ3MpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGRlc2NyaWJlKC4uLmFyZ3MpOiB2b2lkIHtcbiAgcmV0dXJuIF9kZXNjcmliZShqc21ERGVzY3JpYmUsIC4uLmFyZ3MpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24geGRlc2NyaWJlKC4uLmFyZ3MpOiB2b2lkIHtcbiAgcmV0dXJuIF9kZXNjcmliZShqc21YRGVzY3JpYmUsIC4uLmFyZ3MpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmVmb3JlRWFjaChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgaWYgKHJ1bm5lclN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAvLyBJbnNpZGUgYSBkZXNjcmliZSBibG9jaywgYmVmb3JlRWFjaCgpIHVzZXMgYSBCZWZvcmVFYWNoUnVubmVyXG4gICAgcnVubmVyU3RhY2tbcnVubmVyU3RhY2subGVuZ3RoIC0gMV0uYmVmb3JlRWFjaChmbik7XG4gIH0gZWxzZSB7XG4gICAgLy8gVG9wIGxldmVsIGJlZm9yZUVhY2goKSBhcmUgZGVsZWdhdGVkIHRvIGphc21pbmVcbiAgICBqc21CZWZvcmVFYWNoKGZuKTtcbiAgfVxufVxuXG4vKipcbiAqIEFsbG93cyBvdmVycmlkaW5nIGRlZmF1bHQgcHJvdmlkZXJzIGRlZmluZWQgaW4gdGVzdF9pbmplY3Rvci5qcy5cbiAqXG4gKiBUaGUgZ2l2ZW4gZnVuY3Rpb24gbXVzdCByZXR1cm4gYSBsaXN0IG9mIERJIHByb3ZpZGVycy5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgYmVmb3JlRWFjaFByb3ZpZGVycygoKSA9PiBbXG4gKiAgICAgcHJvdmlkZShDb21waWxlciwge3VzZUNsYXNzOiBNb2NrQ29tcGlsZXJ9KSxcbiAqICAgICBwcm92aWRlKFNvbWVUb2tlbiwge3VzZVZhbHVlOiBteVZhbHVlfSksXG4gKiAgIF0pO1xuICovXG5leHBvcnQgZnVuY3Rpb24gYmVmb3JlRWFjaFByb3ZpZGVycyhmbik6IHZvaWQge1xuICBqc21CZWZvcmVFYWNoKCgpID0+IHtcbiAgICB2YXIgcHJvdmlkZXJzID0gZm4oKTtcbiAgICBpZiAoIXByb3ZpZGVycykgcmV0dXJuO1xuICAgIHRlc3RJbmplY3Rvci5hZGRQcm92aWRlcnMocHJvdmlkZXJzKTtcbiAgfSk7XG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJlZm9yZUVhY2hCaW5kaW5ncyhmbik6IHZvaWQge1xuICBiZWZvcmVFYWNoUHJvdmlkZXJzKGZuKTtcbn1cblxuZnVuY3Rpb24gX2l0KGpzbUZuOiBGdW5jdGlvbiwgbmFtZTogc3RyaW5nLCB0ZXN0Rm46IEZ1bmN0aW9uLCB0ZXN0VGltZU91dDogbnVtYmVyKTogdm9pZCB7XG4gIHZhciBydW5uZXIgPSBydW5uZXJTdGFja1tydW5uZXJTdGFjay5sZW5ndGggLSAxXTtcbiAgdmFyIHRpbWVPdXQgPSBNYXRoLm1heChnbG9iYWxUaW1lT3V0LCB0ZXN0VGltZU91dCk7XG5cbiAganNtRm4obmFtZSwgKGRvbmUpID0+IHtcbiAgICB2YXIgY29tcGxldGVyUHJvdmlkZXIgPSBwcm92aWRlKEFzeW5jVGVzdENvbXBsZXRlciwge1xuICAgICAgdXNlRmFjdG9yeTogKCkgPT4ge1xuICAgICAgICAvLyBNYXJrIHRoZSB0ZXN0IGFzIGFzeW5jIHdoZW4gYW4gQXN5bmNUZXN0Q29tcGxldGVyIGlzIGluamVjdGVkIGluIGFuIGl0KClcbiAgICAgICAgaWYgKCFpbkl0KSB0aHJvdyBuZXcgRXJyb3IoJ0FzeW5jVGVzdENvbXBsZXRlciBjYW4gb25seSBiZSBpbmplY3RlZCBpbiBhbiBcIml0KClcIicpO1xuICAgICAgICByZXR1cm4gbmV3IEFzeW5jVGVzdENvbXBsZXRlcigpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRlc3RJbmplY3Rvci5hZGRQcm92aWRlcnMoW2NvbXBsZXRlclByb3ZpZGVyXSk7XG4gICAgcnVubmVyLnJ1bigpO1xuXG4gICAgaW5JdCA9IHRydWU7XG4gICAgaWYgKHRlc3RGbi5sZW5ndGggPT0gMCkge1xuICAgICAgbGV0IHJldFZhbCA9IHRlc3RGbigpO1xuICAgICAgaWYgKGlzUHJvbWlzZShyZXRWYWwpKSB7XG4gICAgICAgIC8vIEFzeW5jaHJvbm91cyB0ZXN0IGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIFByb21pc2UgLSB3YWl0IGZvciBjb21wbGV0aW9uLlxuICAgICAgICAoPFByb21pc2U8YW55Pj5yZXRWYWwpLnRoZW4oZG9uZSwgZG9uZS5mYWlsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFN5bmNocm9ub3VzIHRlc3QgZnVuY3Rpb24gLSBjb21wbGV0ZSBpbW1lZGlhdGVseS5cbiAgICAgICAgZG9uZSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBBc3luY2hyb25vdXMgdGVzdCBmdW5jdGlvbiB0aGF0IHRha2VzIGluICdkb25lJyBwYXJhbWV0ZXIuXG4gICAgICB0ZXN0Rm4oZG9uZSk7XG4gICAgfVxuICAgIGluSXQgPSBmYWxzZTtcbiAgfSwgdGltZU91dCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpdChuYW1lLCBmbiwgdGltZU91dCA9IG51bGwpOiB2b2lkIHtcbiAgcmV0dXJuIF9pdChqc21JdCwgbmFtZSwgZm4sIHRpbWVPdXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24geGl0KG5hbWUsIGZuLCB0aW1lT3V0ID0gbnVsbCk6IHZvaWQge1xuICByZXR1cm4gX2l0KGpzbVhJdCwgbmFtZSwgZm4sIHRpbWVPdXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaWl0KG5hbWUsIGZuLCB0aW1lT3V0ID0gbnVsbCk6IHZvaWQge1xuICByZXR1cm4gX2l0KGpzbUlJdCwgbmFtZSwgZm4sIHRpbWVPdXQpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEd1aW5lc3NDb21wYXRpYmxlU3B5IGV4dGVuZHMgamFzbWluZS5TcHkge1xuICAvKiogQnkgY2hhaW5pbmcgdGhlIHNweSB3aXRoIGFuZC5yZXR1cm5WYWx1ZSwgYWxsIGNhbGxzIHRvIHRoZSBmdW5jdGlvbiB3aWxsIHJldHVybiBhIHNwZWNpZmljXG4gICAqIHZhbHVlLiAqL1xuICBhbmRSZXR1cm4odmFsOiBhbnkpOiB2b2lkO1xuICAvKiogQnkgY2hhaW5pbmcgdGhlIHNweSB3aXRoIGFuZC5jYWxsRmFrZSwgYWxsIGNhbGxzIHRvIHRoZSBzcHkgd2lsbCBkZWxlZ2F0ZSB0byB0aGUgc3VwcGxpZWRcbiAgICogZnVuY3Rpb24uICovXG4gIGFuZENhbGxGYWtlKGZuOiBGdW5jdGlvbik6IEd1aW5lc3NDb21wYXRpYmxlU3B5O1xuICAvKiogcmVtb3ZlcyBhbGwgcmVjb3JkZWQgY2FsbHMgKi9cbiAgcmVzZXQoKTtcbn1cblxuZXhwb3J0IGNsYXNzIFNweU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKHR5cGUgPSBudWxsKSB7XG4gICAgaWYgKHR5cGUpIHtcbiAgICAgIGZvciAodmFyIHByb3AgaW4gdHlwZS5wcm90b3R5cGUpIHtcbiAgICAgICAgdmFyIG0gPSBudWxsO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIG0gPSB0eXBlLnByb3RvdHlwZVtwcm9wXTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIEFzIHdlIGFyZSBjcmVhdGluZyBzcHlzIGZvciBhYnN0cmFjdCBjbGFzc2VzLFxuICAgICAgICAgIC8vIHRoZXNlIGNsYXNzZXMgbWlnaHQgaGF2ZSBnZXR0ZXJzIHRoYXQgdGhyb3cgd2hlbiB0aGV5IGFyZSBhY2Nlc3NlZC5cbiAgICAgICAgICAvLyBBcyB3ZSBhcmUgb25seSBhdXRvIGNyZWF0aW5nIHNweXMgZm9yIG1ldGhvZHMsIHRoaXNcbiAgICAgICAgICAvLyBzaG91bGQgbm90IG1hdHRlci5cbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIG0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0aGlzLnNweShwcm9wKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICAvLyBOb29wIHNvIHRoYXQgU3B5T2JqZWN0IGhhcyB0aGUgc2FtZSBpbnRlcmZhY2UgYXMgaW4gRGFydFxuICBub1N1Y2hNZXRob2QoYXJncykge31cblxuICBzcHkobmFtZSkge1xuICAgIGlmICghdGhpc1tuYW1lXSkge1xuICAgICAgdGhpc1tuYW1lXSA9IHRoaXMuX2NyZWF0ZUd1aW5uZXNzQ29tcGF0aWJsZVNweShuYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNbbmFtZV07XG4gIH1cblxuICBwcm9wKG5hbWUsIHZhbHVlKSB7IHRoaXNbbmFtZV0gPSB2YWx1ZTsgfVxuXG4gIHN0YXRpYyBzdHViKG9iamVjdCA9IG51bGwsIGNvbmZpZyA9IG51bGwsIG92ZXJyaWRlcyA9IG51bGwpIHtcbiAgICBpZiAoIShvYmplY3QgaW5zdGFuY2VvZiBTcHlPYmplY3QpKSB7XG4gICAgICBvdmVycmlkZXMgPSBjb25maWc7XG4gICAgICBjb25maWcgPSBvYmplY3Q7XG4gICAgICBvYmplY3QgPSBuZXcgU3B5T2JqZWN0KCk7XG4gICAgfVxuXG4gICAgdmFyIG0gPSBTdHJpbmdNYXBXcmFwcGVyLm1lcmdlKGNvbmZpZywgb3ZlcnJpZGVzKTtcbiAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2gobSwgKHZhbHVlLCBrZXkpID0+IHsgb2JqZWN0LnNweShrZXkpLmFuZFJldHVybih2YWx1ZSk7IH0pO1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9jcmVhdGVHdWlubmVzc0NvbXBhdGlibGVTcHkobmFtZSk6IEd1aW5lc3NDb21wYXRpYmxlU3B5IHtcbiAgICB2YXIgbmV3U3B5OiBHdWluZXNzQ29tcGF0aWJsZVNweSA9IDxhbnk+amFzbWluZS5jcmVhdGVTcHkobmFtZSk7XG4gICAgbmV3U3B5LmFuZENhbGxGYWtlID0gPGFueT5uZXdTcHkuYW5kLmNhbGxGYWtlO1xuICAgIG5ld1NweS5hbmRSZXR1cm4gPSA8YW55Pm5ld1NweS5hbmQucmV0dXJuVmFsdWU7XG4gICAgbmV3U3B5LnJlc2V0ID0gPGFueT5uZXdTcHkuY2FsbHMucmVzZXQ7XG4gICAgLy8gcmV2aXNpdCByZXR1cm4gbnVsbCBoZXJlIChwcmV2aW91c2x5IG5lZWRlZCBmb3IgcnR0c19hc3NlcnQpLlxuICAgIG5ld1NweS5hbmQucmV0dXJuVmFsdWUobnVsbCk7XG4gICAgcmV0dXJuIG5ld1NweTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
