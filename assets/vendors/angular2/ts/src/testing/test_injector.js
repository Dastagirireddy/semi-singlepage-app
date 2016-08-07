System.register(['angular2/core', 'angular2/src/facade/exceptions', 'angular2/src/facade/collection', 'angular2/src/facade/lang', './async', './async_test_completer'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, exceptions_1, collection_1, lang_1, async_1, async_test_completer_1;
    var TestInjector, _testInjector, InjectSetupWrapper;
    function getTestInjector() {
        if (_testInjector == null) {
            _testInjector = new TestInjector();
        }
        return _testInjector;
    }
    exports_1("getTestInjector", getTestInjector);
    /**
     * Set the providers that the test injector should use. These should be providers
     * common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on teh current platform. If you absolutely need to change the providers,
     * first use `resetBaseTestProviders`.
     *
     * Test Providers for individual platforms are available from
     * 'angular2/platform/testing/<platform_name>'.
     */
    function setBaseTestProviders(platformProviders, applicationProviders) {
        var testInjector = getTestInjector();
        if (testInjector.platformProviders.length > 0 || testInjector.applicationProviders.length > 0) {
            throw new exceptions_1.BaseException('Cannot set base providers because it has already been called');
        }
        testInjector.platformProviders = platformProviders;
        testInjector.applicationProviders = applicationProviders;
        var injector = testInjector.createInjector();
        var inits = injector.get(core_1.PLATFORM_INITIALIZER, null);
        if (lang_1.isPresent(inits)) {
            inits.forEach(function (init) { return init(); });
        }
        testInjector.reset();
    }
    exports_1("setBaseTestProviders", setBaseTestProviders);
    /**
     * Reset the providers for the test injector.
     */
    function resetBaseTestProviders() {
        var testInjector = getTestInjector();
        testInjector.platformProviders = [];
        testInjector.applicationProviders = [];
        testInjector.reset();
    }
    exports_1("resetBaseTestProviders", resetBaseTestProviders);
    /**
     * Allows injecting dependencies in `beforeEach()` and `it()`.
     *
     * Example:
     *
     * ```
     * beforeEach(inject([Dependency, AClass], (dep, object) => {
     *   // some code that uses `dep` and `object`
     *   // ...
     * }));
     *
     * it('...', inject([AClass], (object) => {
     *   object.doSomething();
     *   expect(...);
     * })
     * ```
     *
     * Notes:
     * - inject is currently a function because of some Traceur limitation the syntax should
     * eventually
     *   becomes `it('...', @Inject (object: AClass, async: AsyncTestCompleter) => { ... });`
     *
     * @param {Array} tokens
     * @param {Function} fn
     * @return {Function}
     */
    function inject(tokens, fn) {
        var testInjector = getTestInjector();
        if (tokens.indexOf(async_test_completer_1.AsyncTestCompleter) >= 0) {
            // Return an async test method that returns a Promise if AsyncTestCompleter is one of the
            // injected tokens.
            return function () {
                var completer = testInjector.get(async_test_completer_1.AsyncTestCompleter);
                testInjector.execute(tokens, fn);
                return completer.promise;
            };
        }
        else {
            // Return a synchronous test method with the injected tokens.
            return function () { return getTestInjector().execute(tokens, fn); };
        }
    }
    exports_1("inject", inject);
    function withProviders(providers) {
        return new InjectSetupWrapper(providers);
    }
    exports_1("withProviders", withProviders);
    /**
     * @Deprecated {use async(inject())}
     *
     * Allows injecting dependencies in `beforeEach()` and `it()`. The test must return
     * a promise which will resolve when all asynchronous activity is complete.
     *
     * Example:
     *
     * ```
     * it('...', injectAsync([AClass], (object) => {
     *   return object.doSomething().then(() => {
     *     expect(...);
     *   });
     * })
     * ```
     *
     * @param {Array} tokens
     * @param {Function} fn
     * @return {Function}
     */
    function injectAsync(tokens, fn) {
        return async_1.async(inject(tokens, fn));
    }
    exports_1("injectAsync", injectAsync);
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
                exports_1({
                    "async": async_1_1["async"]
                });
            },
            function (async_test_completer_1_1) {
                async_test_completer_1 = async_test_completer_1_1;
            }],
        execute: function() {
            TestInjector = (function () {
                function TestInjector() {
                    this._instantiated = false;
                    this._injector = null;
                    this._providers = [];
                    this.platformProviders = [];
                    this.applicationProviders = [];
                }
                TestInjector.prototype.reset = function () {
                    this._injector = null;
                    this._providers = [];
                    this._instantiated = false;
                };
                TestInjector.prototype.addProviders = function (providers) {
                    if (this._instantiated) {
                        throw new exceptions_1.BaseException('Cannot add providers after test injector is instantiated');
                    }
                    this._providers = collection_1.ListWrapper.concat(this._providers, providers);
                };
                TestInjector.prototype.createInjector = function () {
                    var rootInjector = core_1.ReflectiveInjector.resolveAndCreate(this.platformProviders);
                    this._injector = rootInjector.resolveAndCreateChild(collection_1.ListWrapper.concat(this.applicationProviders, this._providers));
                    this._instantiated = true;
                    return this._injector;
                };
                TestInjector.prototype.get = function (token) {
                    if (!this._instantiated) {
                        this.createInjector();
                    }
                    return this._injector.get(token);
                };
                TestInjector.prototype.execute = function (tokens, fn) {
                    var _this = this;
                    if (!this._instantiated) {
                        this.createInjector();
                    }
                    var params = tokens.map(function (t) { return _this._injector.get(t); });
                    return lang_1.FunctionWrapper.apply(fn, params);
                };
                return TestInjector;
            }());
            exports_1("TestInjector", TestInjector);
            _testInjector = null;
            InjectSetupWrapper = (function () {
                function InjectSetupWrapper(_providers) {
                    this._providers = _providers;
                }
                InjectSetupWrapper.prototype._addProviders = function () {
                    var additionalProviders = this._providers();
                    if (additionalProviders.length > 0) {
                        getTestInjector().addProviders(additionalProviders);
                    }
                };
                InjectSetupWrapper.prototype.inject = function (tokens, fn) {
                    var _this = this;
                    return function () {
                        _this._addProviders();
                        return inject(tokens, fn)();
                    };
                };
                /** @Deprecated {use async(withProviders().inject())} */
                InjectSetupWrapper.prototype.injectAsync = function (tokens, fn) {
                    var _this = this;
                    return function () {
                        _this._addProviders();
                        return injectAsync(tokens, fn)();
                    };
                };
                return InjectSetupWrapper;
            }());
            exports_1("InjectSetupWrapper", InjectSetupWrapper);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy90ZXN0aW5nL3Rlc3RfaW5qZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztzQkEwREksYUFBYTtJQUVqQjtRQUNFLEVBQUUsQ0FBQyxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFCLGFBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3JDLENBQUM7UUFDRCxNQUFNLENBQUMsYUFBYSxDQUFDO0lBQ3ZCLENBQUM7SUFMRCw2Q0FLQyxDQUFBO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILDhCQUFxQyxpQkFBaUQsRUFDakQsb0JBQW9EO1FBQ3ZGLElBQUksWUFBWSxHQUFHLGVBQWUsRUFBRSxDQUFDO1FBQ3JDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5RixNQUFNLElBQUksMEJBQWEsQ0FBQyw4REFBOEQsQ0FBQyxDQUFDO1FBQzFGLENBQUM7UUFDRCxZQUFZLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7UUFDbkQsWUFBWSxDQUFDLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDO1FBQ3pELElBQUksUUFBUSxHQUFHLFlBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUM3QyxJQUFJLEtBQUssR0FBZSxRQUFRLENBQUMsR0FBRyxDQUFDLDJCQUFvQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pFLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLEVBQUUsRUFBTixDQUFNLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBQ0QsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFD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QyxlQUFlLEVBQUUsQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsQ0FBQztvQkFDdEQsQ0FBQztnQkFDSCxDQUFDO2dCQUVELG1DQUFNLEdBQU4sVUFBTyxNQUFhLEVBQUUsRUFBWTtvQkFBbEMsaUJBS0M7b0JBSkMsTUFBTSxDQUFDO3dCQUNMLEtBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzt3QkFDckIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztvQkFDOUIsQ0FBQyxDQUFBO2dCQUNILENBQUM7Z0JBRUQsd0RBQXdEO2dCQUN4RCx3Q0FBVyxHQUFYLFVBQVksTUFBYSxFQUFFLEVBQVk7b0JBQXZDLGlCQUtDO29CQUpDLE1BQU0sQ0FBQzt3QkFDTCxLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7d0JBQ3JCLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBQ25DLENBQUMsQ0FBQTtnQkFDSCxDQUFDO2dCQUNILHlCQUFDO1lBQUQsQ0F4QkEsQUF3QkMsSUFBQTtZQXhCRCxtREF3QkMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvdGVzdGluZy90ZXN0X2luamVjdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWZsZWN0aXZlSW5qZWN0b3IsIFByb3ZpZGVyLCBQTEFURk9STV9JTklUSUFMSVpFUn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb24sIEV4Y2VwdGlvbkhhbmRsZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge0xpc3RXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtGdW5jdGlvbldyYXBwZXIsIGlzUHJlc2VudCwgVHlwZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuaW1wb3J0IHthc3luY30gZnJvbSAnLi9hc3luYyc7XG5pbXBvcnQge0FzeW5jVGVzdENvbXBsZXRlcn0gZnJvbSAnLi9hc3luY190ZXN0X2NvbXBsZXRlcic7XG5cbmV4cG9ydCB7YXN5bmN9IGZyb20gJy4vYXN5bmMnO1xuXG5leHBvcnQgY2xhc3MgVGVzdEluamVjdG9yIHtcbiAgcHJpdmF0ZSBfaW5zdGFudGlhdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfaW5qZWN0b3I6IFJlZmxlY3RpdmVJbmplY3RvciA9IG51bGw7XG5cbiAgcHJpdmF0ZSBfcHJvdmlkZXJzOiBBcnJheTxUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXT4gPSBbXTtcblxuICByZXNldCgpIHtcbiAgICB0aGlzLl9pbmplY3RvciA9IG51bGw7XG4gICAgdGhpcy5fcHJvdmlkZXJzID0gW107XG4gICAgdGhpcy5faW5zdGFudGlhdGVkID0gZmFsc2U7XG4gIH1cblxuICBwbGF0Zm9ybVByb3ZpZGVyczogQXJyYXk8VHlwZSB8IFByb3ZpZGVyIHwgYW55W10+ID0gW107XG5cbiAgYXBwbGljYXRpb25Qcm92aWRlcnM6IEFycmF5PFR5cGUgfCBQcm92aWRlciB8IGFueVtdPiA9IFtdO1xuXG4gIGFkZFByb3ZpZGVycyhwcm92aWRlcnM6IEFycmF5PFR5cGUgfCBQcm92aWRlciB8IGFueVtdPikge1xuICAgIGlmICh0aGlzLl9pbnN0YW50aWF0ZWQpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKCdDYW5ub3QgYWRkIHByb3ZpZGVycyBhZnRlciB0ZXN0IGluamVjdG9yIGlzIGluc3RhbnRpYXRlZCcpO1xuICAgIH1cbiAgICB0aGlzLl9wcm92aWRlcnMgPSBMaXN0V3JhcHBlci5jb25jYXQodGhpcy5fcHJvdmlkZXJzLCBwcm92aWRlcnMpO1xuICB9XG5cbiAgY3JlYXRlSW5qZWN0b3IoKSB7XG4gICAgdmFyIHJvb3RJbmplY3RvciA9IFJlZmxlY3RpdmVJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKHRoaXMucGxhdGZvcm1Qcm92aWRlcnMpO1xuICAgIHRoaXMuX2luamVjdG9yID0gcm9vdEluamVjdG9yLnJlc29sdmVBbmRDcmVhdGVDaGlsZChcbiAgICAgICAgTGlzdFdyYXBwZXIuY29uY2F0KHRoaXMuYXBwbGljYXRpb25Qcm92aWRlcnMsIHRoaXMuX3Byb3ZpZGVycykpO1xuICAgIHRoaXMuX2luc3RhbnRpYXRlZCA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXMuX2luamVjdG9yO1xuICB9XG5cbiAgZ2V0KHRva2VuOiBhbnkpIHtcbiAgICBpZiAoIXRoaXMuX2luc3RhbnRpYXRlZCkge1xuICAgICAgdGhpcy5jcmVhdGVJbmplY3RvcigpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5faW5qZWN0b3IuZ2V0KHRva2VuKTtcbiAgfVxuXG4gIGV4ZWN1dGUodG9rZW5zOiBhbnlbXSwgZm46IEZ1bmN0aW9uKTogYW55IHtcbiAgICBpZiAoIXRoaXMuX2luc3RhbnRpYXRlZCkge1xuICAgICAgdGhpcy5jcmVhdGVJbmplY3RvcigpO1xuICAgIH1cbiAgICB2YXIgcGFyYW1zID0gdG9rZW5zLm1hcCh0ID0+IHRoaXMuX2luamVjdG9yLmdldCh0KSk7XG4gICAgcmV0dXJuIEZ1bmN0aW9uV3JhcHBlci5hcHBseShmbiwgcGFyYW1zKTtcbiAgfVxufVxuXG52YXIgX3Rlc3RJbmplY3RvcjogVGVzdEluamVjdG9yID0gbnVsbDtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRlc3RJbmplY3RvcigpIHtcbiAgaWYgKF90ZXN0SW5qZWN0b3IgPT0gbnVsbCkge1xuICAgIF90ZXN0SW5qZWN0b3IgPSBuZXcgVGVzdEluamVjdG9yKCk7XG4gIH1cbiAgcmV0dXJuIF90ZXN0SW5qZWN0b3I7XG59XG5cbi8qKlxuICogU2V0IHRoZSBwcm92aWRlcnMgdGhhdCB0aGUgdGVzdCBpbmplY3RvciBzaG91bGQgdXNlLiBUaGVzZSBzaG91bGQgYmUgcHJvdmlkZXJzXG4gKiBjb21tb24gdG8gZXZlcnkgdGVzdCBpbiB0aGUgc3VpdGUuXG4gKlxuICogVGhpcyBtYXkgb25seSBiZSBjYWxsZWQgb25jZSwgdG8gc2V0IHVwIHRoZSBjb21tb24gcHJvdmlkZXJzIGZvciB0aGUgY3VycmVudCB0ZXN0XG4gKiBzdWl0ZSBvbiB0ZWggY3VycmVudCBwbGF0Zm9ybS4gSWYgeW91IGFic29sdXRlbHkgbmVlZCB0byBjaGFuZ2UgdGhlIHByb3ZpZGVycyxcbiAqIGZpcnN0IHVzZSBgcmVzZXRCYXNlVGVzdFByb3ZpZGVyc2AuXG4gKlxuICogVGVzdCBQcm92aWRlcnMgZm9yIGluZGl2aWR1YWwgcGxhdGZvcm1zIGFyZSBhdmFpbGFibGUgZnJvbVxuICogJ2FuZ3VsYXIyL3BsYXRmb3JtL3Rlc3RpbmcvPHBsYXRmb3JtX25hbWU+Jy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEJhc2VUZXN0UHJvdmlkZXJzKHBsYXRmb3JtUHJvdmlkZXJzOiBBcnJheTxUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXT4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb25Qcm92aWRlcnM6IEFycmF5PFR5cGUgfCBQcm92aWRlciB8IGFueVtdPikge1xuICB2YXIgdGVzdEluamVjdG9yID0gZ2V0VGVzdEluamVjdG9yKCk7XG4gIGlmICh0ZXN0SW5qZWN0b3IucGxhdGZvcm1Qcm92aWRlcnMubGVuZ3RoID4gMCB8fCB0ZXN0SW5qZWN0b3IuYXBwbGljYXRpb25Qcm92aWRlcnMubGVuZ3RoID4gMCkge1xuICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKCdDYW5ub3Qgc2V0IGJhc2UgcHJvdmlkZXJzIGJlY2F1c2UgaXQgaGFzIGFscmVhZHkgYmVlbiBjYWxsZWQnKTtcbiAgfVxuICB0ZXN0SW5qZWN0b3IucGxhdGZvcm1Qcm92aWRlcnMgPSBwbGF0Zm9ybVByb3ZpZGVycztcbiAgdGVzdEluamVjdG9yLmFwcGxpY2F0aW9uUHJvdmlkZXJzID0gYXBwbGljYXRpb25Qcm92aWRlcnM7XG4gIHZhciBpbmplY3RvciA9IHRlc3RJbmplY3Rvci5jcmVhdGVJbmplY3RvcigpO1xuICBsZXQgaW5pdHM6IEZ1bmN0aW9uW10gPSBpbmplY3Rvci5nZXQoUExBVEZPUk1fSU5JVElBTElaRVIsIG51bGwpO1xuICBpZiAoaXNQcmVzZW50KGluaXRzKSkge1xuICAgIGluaXRzLmZvckVhY2goaW5pdCA9PiBpbml0KCkpO1xuICB9XG4gIHRlc3RJbmplY3Rvci5yZXNldCgpO1xufVxuXG4vKipcbiAqIFJlc2V0IHRoZSBwcm92aWRlcnMgZm9yIHRoZSB0ZXN0IGluamVjdG9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRCYXNlVGVzdFByb3ZpZGVycygpIHtcbiAgdmFyIHRlc3RJbmplY3RvciA9IGdldFRlc3RJbmplY3RvcigpO1xuICB0ZXN0SW5qZWN0b3IucGxhdGZvcm1Qcm92aWRlcnMgPSBbXTtcbiAgdGVzdEluamVjdG9yLmFwcGxpY2F0aW9uUHJvdmlkZXJzID0gW107XG4gIHRlc3RJbmplY3Rvci5yZXNldCgpO1xufVxuXG4vKipcbiAqIEFsbG93cyBpbmplY3RpbmcgZGVwZW5kZW5jaWVzIGluIGBiZWZvcmVFYWNoKClgIGFuZCBgaXQoKWAuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBcbiAqIGJlZm9yZUVhY2goaW5qZWN0KFtEZXBlbmRlbmN5LCBBQ2xhc3NdLCAoZGVwLCBvYmplY3QpID0+IHtcbiAqICAgLy8gc29tZSBjb2RlIHRoYXQgdXNlcyBgZGVwYCBhbmQgYG9iamVjdGBcbiAqICAgLy8gLi4uXG4gKiB9KSk7XG4gKlxuICogaXQoJy4uLicsIGluamVjdChbQUNsYXNzXSwgKG9iamVjdCkgPT4ge1xuICogICBvYmplY3QuZG9Tb21ldGhpbmcoKTtcbiAqICAgZXhwZWN0KC4uLik7XG4gKiB9KVxuICogYGBgXG4gKlxuICogTm90ZXM6XG4gKiAtIGluamVjdCBpcyBjdXJyZW50bHkgYSBmdW5jdGlvbiBiZWNhdXNlIG9mIHNvbWUgVHJhY2V1ciBsaW1pdGF0aW9uIHRoZSBzeW50YXggc2hvdWxkXG4gKiBldmVudHVhbGx5XG4gKiAgIGJlY29tZXMgYGl0KCcuLi4nLCBASW5qZWN0IChvYmplY3Q6IEFDbGFzcywgYXN5bmM6IEFzeW5jVGVzdENvbXBsZXRlcikgPT4geyAuLi4gfSk7YFxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHRva2Vuc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5qZWN0KHRva2VuczogYW55W10sIGZuOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgbGV0IHRlc3RJbmplY3RvciA9IGdldFRlc3RJbmplY3RvcigpO1xuICBpZiAodG9rZW5zLmluZGV4T2YoQXN5bmNUZXN0Q29tcGxldGVyKSA+PSAwKSB7XG4gICAgLy8gUmV0dXJuIGFuIGFzeW5jIHRlc3QgbWV0aG9kIHRoYXQgcmV0dXJucyBhIFByb21pc2UgaWYgQXN5bmNUZXN0Q29tcGxldGVyIGlzIG9uZSBvZiB0aGVcbiAgICAvLyBpbmplY3RlZCB0b2tlbnMuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGxldCBjb21wbGV0ZXI6IEFzeW5jVGVzdENvbXBsZXRlciA9IHRlc3RJbmplY3Rvci5nZXQoQXN5bmNUZXN0Q29tcGxldGVyKTtcbiAgICAgIHRlc3RJbmplY3Rvci5leGVjdXRlKHRva2VucywgZm4pO1xuICAgICAgcmV0dXJuIGNvbXBsZXRlci5wcm9taXNlO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBSZXR1cm4gYSBzeW5jaHJvbm91cyB0ZXN0IG1ldGhvZCB3aXRoIHRoZSBpbmplY3RlZCB0b2tlbnMuXG4gICAgcmV0dXJuICgpID0+IHsgcmV0dXJuIGdldFRlc3RJbmplY3RvcigpLmV4ZWN1dGUodG9rZW5zLCBmbik7IH07XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEluamVjdFNldHVwV3JhcHBlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3Byb3ZpZGVyczogKCkgPT4gYW55KSB7fVxuXG4gIHByaXZhdGUgX2FkZFByb3ZpZGVycygpIHtcbiAgICB2YXIgYWRkaXRpb25hbFByb3ZpZGVycyA9IHRoaXMuX3Byb3ZpZGVycygpO1xuICAgIGlmIChhZGRpdGlvbmFsUHJvdmlkZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIGdldFRlc3RJbmplY3RvcigpLmFkZFByb3ZpZGVycyhhZGRpdGlvbmFsUHJvdmlkZXJzKTtcbiAgICB9XG4gIH1cblxuICBpbmplY3QodG9rZW5zOiBhbnlbXSwgZm46IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB0aGlzLl9hZGRQcm92aWRlcnMoKTtcbiAgICAgIHJldHVybiBpbmplY3QodG9rZW5zLCBmbikoKTtcbiAgICB9XG4gIH1cblxuICAvKiogQERlcHJlY2F0ZWQge3VzZSBhc3luYyh3aXRoUHJvdmlkZXJzKCkuaW5qZWN0KCkpfSAqL1xuICBpbmplY3RBc3luYyh0b2tlbnM6IGFueVtdLCBmbjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHRoaXMuX2FkZFByb3ZpZGVycygpO1xuICAgICAgcmV0dXJuIGluamVjdEFzeW5jKHRva2VucywgZm4pKCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3aXRoUHJvdmlkZXJzKHByb3ZpZGVyczogKCkgPT4gYW55KSB7XG4gIHJldHVybiBuZXcgSW5qZWN0U2V0dXBXcmFwcGVyKHByb3ZpZGVycyk7XG59XG5cbi8qKlxuICogQERlcHJlY2F0ZWQge3VzZSBhc3luYyhpbmplY3QoKSl9XG4gKlxuICogQWxsb3dzIGluamVjdGluZyBkZXBlbmRlbmNpZXMgaW4gYGJlZm9yZUVhY2goKWAgYW5kIGBpdCgpYC4gVGhlIHRlc3QgbXVzdCByZXR1cm5cbiAqIGEgcHJvbWlzZSB3aGljaCB3aWxsIHJlc29sdmUgd2hlbiBhbGwgYXN5bmNocm9ub3VzIGFjdGl2aXR5IGlzIGNvbXBsZXRlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiBpdCgnLi4uJywgaW5qZWN0QXN5bmMoW0FDbGFzc10sIChvYmplY3QpID0+IHtcbiAqICAgcmV0dXJuIG9iamVjdC5kb1NvbWV0aGluZygpLnRoZW4oKCkgPT4ge1xuICogICAgIGV4cGVjdCguLi4pO1xuICogICB9KTtcbiAqIH0pXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSB0b2tlbnNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluamVjdEFzeW5jKHRva2VuczogYW55W10sIGZuOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgcmV0dXJuIGFzeW5jKGluamVjdCh0b2tlbnMsIGZuKSk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
