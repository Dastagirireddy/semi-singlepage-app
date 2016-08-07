System.register(['angular2/core', 'angular2/src/facade/exceptions', 'angular2/src/facade/collection', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, exceptions_1, collection_1, lang_1;
    var TestInjector, _testInjector, InjectSetupWrapper, FunctionWithParamTokens;
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
        var inits = injector.getOptional(core_1.PLATFORM_INITIALIZER);
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
     * @return {FunctionWithParamTokens}
     */
    function inject(tokens, fn) {
        return new FunctionWithParamTokens(tokens, fn, false);
    }
    exports_1("inject", inject);
    function withProviders(providers) {
        return new InjectSetupWrapper(providers);
    }
    exports_1("withProviders", withProviders);
    /**
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
     * @return {FunctionWithParamTokens}
     */
    function injectAsync(tokens, fn) {
        return new FunctionWithParamTokens(tokens, fn, true);
    }
    exports_1("injectAsync", injectAsync);
    function emptyArray() {
        return [];
    }
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
                    var rootInjector = core_1.Injector.resolveAndCreate(this.platformProviders);
                    this._injector = rootInjector.resolveAndCreateChild(collection_1.ListWrapper.concat(this.applicationProviders, this._providers));
                    this._instantiated = true;
                    return this._injector;
                };
                TestInjector.prototype.execute = function (fn) {
                    var additionalProviders = fn.additionalProviders();
                    if (additionalProviders.length > 0) {
                        this.addProviders(additionalProviders);
                    }
                    if (!this._instantiated) {
                        this.createInjector();
                    }
                    return fn.execute(this._injector);
                };
                return TestInjector;
            }());
            exports_1("TestInjector", TestInjector);
            _testInjector = null;
            InjectSetupWrapper = (function () {
                function InjectSetupWrapper(_providers) {
                    this._providers = _providers;
                }
                InjectSetupWrapper.prototype.inject = function (tokens, fn) {
                    return new FunctionWithParamTokens(tokens, fn, false, this._providers);
                };
                InjectSetupWrapper.prototype.injectAsync = function (tokens, fn) {
                    return new FunctionWithParamTokens(tokens, fn, true, this._providers);
                };
                return InjectSetupWrapper;
            }());
            exports_1("InjectSetupWrapper", InjectSetupWrapper);
            FunctionWithParamTokens = (function () {
                function FunctionWithParamTokens(_tokens, _fn, isAsync, additionalProviders) {
                    if (additionalProviders === void 0) { additionalProviders = emptyArray; }
                    this._tokens = _tokens;
                    this._fn = _fn;
                    this.isAsync = isAsync;
                    this.additionalProviders = additionalProviders;
                }
                /**
                 * Returns the value of the executed function.
                 */
                FunctionWithParamTokens.prototype.execute = function (injector) {
                    var params = this._tokens.map(function (t) { return injector.get(t); });
                    return lang_1.FunctionWrapper.apply(this._fn, params);
                };
                FunctionWithParamTokens.prototype.hasToken = function (token) { return this._tokens.indexOf(token) > -1; };
                return FunctionWithParamTokens;
            }());
            exports_1("FunctionWithParamTokens", FunctionWithParamTokens);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3Rlc3RpbmcvdGVzdF9pbmplY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O3NCQWlESSxhQUFhO0lBRWpCO1FBQ0UsRUFBRSxDQUFDLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsYUFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDckMsQ0FBQztRQUNELE1BQU0sQ0FBQyxhQUFhLENBQUM7SUFDdkIsQ0FBQztJQUxELDZDQUtDLENBQUE7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsOEJBQXFDLGlCQUFpRCxFQUNqRCxvQkFBb0Q7UUFDdkYsSUFBSSxZQUFZLEdBQUcsZUFBZSxFQUFFLENBQUM7UUFDckMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksWUFBWSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlGLE1BQU0sSUFBSSwwQkFBYSxDQUFDLDhEQUE4RCxDQUFDLENBQUM7UUFDMUYsQ0FBQztRQUNELFlBQVksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztRQUNuRCxZQUFZLENBQUMsb0JBQW9CLEdBQUcsb0JBQW9CLENBQUM7UUFDekQsSUFBSSxRQUFRLEdBQUcsWUFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzdDLElBQUksS0FBSyxHQUFlLFFBQVEsQ0FBQyxXQUFXLENBQUMsMkJBQW9CLENBQUMsQ0FBQztRQUNuRSxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxFQUFFLEVBQU4sQ0FBTSxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUNELFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN2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QyxDQUFDO29CQUNwRCxNQUFNLENBQUMsc0JBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDakQsQ0FBQztnQkFFRCwwQ0FBUSxHQUFSLFVBQVMsS0FBVSxJQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVFLDhCQUFDO1lBQUQsQ0FiQSxBQWFDLElBQUE7WUFiRCw2REFhQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3Rlc3RpbmcvdGVzdF9pbmplY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0b3IsIFByb3ZpZGVyLCBQTEFURk9STV9JTklUSUFMSVpFUn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb24sIEV4Y2VwdGlvbkhhbmRsZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge0xpc3RXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtGdW5jdGlvbldyYXBwZXIsIGlzUHJlc2VudCwgVHlwZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuZXhwb3J0IGNsYXNzIFRlc3RJbmplY3RvciB7XG4gIHByaXZhdGUgX2luc3RhbnRpYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX2luamVjdG9yOiBJbmplY3RvciA9IG51bGw7XG5cbiAgcHJpdmF0ZSBfcHJvdmlkZXJzOiBBcnJheTxUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXT4gPSBbXTtcblxuICByZXNldCgpIHtcbiAgICB0aGlzLl9pbmplY3RvciA9IG51bGw7XG4gICAgdGhpcy5fcHJvdmlkZXJzID0gW107XG4gICAgdGhpcy5faW5zdGFudGlhdGVkID0gZmFsc2U7XG4gIH1cblxuICBwbGF0Zm9ybVByb3ZpZGVyczogQXJyYXk8VHlwZSB8IFByb3ZpZGVyIHwgYW55W10+ID0gW107XG5cbiAgYXBwbGljYXRpb25Qcm92aWRlcnM6IEFycmF5PFR5cGUgfCBQcm92aWRlciB8IGFueVtdPiA9IFtdO1xuXG4gIGFkZFByb3ZpZGVycyhwcm92aWRlcnM6IEFycmF5PFR5cGUgfCBQcm92aWRlciB8IGFueVtdPikge1xuICAgIGlmICh0aGlzLl9pbnN0YW50aWF0ZWQpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKCdDYW5ub3QgYWRkIHByb3ZpZGVycyBhZnRlciB0ZXN0IGluamVjdG9yIGlzIGluc3RhbnRpYXRlZCcpO1xuICAgIH1cbiAgICB0aGlzLl9wcm92aWRlcnMgPSBMaXN0V3JhcHBlci5jb25jYXQodGhpcy5fcHJvdmlkZXJzLCBwcm92aWRlcnMpO1xuICB9XG5cbiAgY3JlYXRlSW5qZWN0b3IoKSB7XG4gICAgdmFyIHJvb3RJbmplY3RvciA9IEluamVjdG9yLnJlc29sdmVBbmRDcmVhdGUodGhpcy5wbGF0Zm9ybVByb3ZpZGVycyk7XG4gICAgdGhpcy5faW5qZWN0b3IgPSByb290SW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZUNoaWxkKFxuICAgICAgICBMaXN0V3JhcHBlci5jb25jYXQodGhpcy5hcHBsaWNhdGlvblByb3ZpZGVycywgdGhpcy5fcHJvdmlkZXJzKSk7XG4gICAgdGhpcy5faW5zdGFudGlhdGVkID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcy5faW5qZWN0b3I7XG4gIH1cblxuICBleGVjdXRlKGZuOiBGdW5jdGlvbldpdGhQYXJhbVRva2Vucyk6IGFueSB7XG4gICAgdmFyIGFkZGl0aW9uYWxQcm92aWRlcnMgPSBmbi5hZGRpdGlvbmFsUHJvdmlkZXJzKCk7XG4gICAgaWYgKGFkZGl0aW9uYWxQcm92aWRlcnMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5hZGRQcm92aWRlcnMoYWRkaXRpb25hbFByb3ZpZGVycyk7XG4gICAgfVxuICAgIGlmICghdGhpcy5faW5zdGFudGlhdGVkKSB7XG4gICAgICB0aGlzLmNyZWF0ZUluamVjdG9yKCk7XG4gICAgfVxuICAgIHJldHVybiBmbi5leGVjdXRlKHRoaXMuX2luamVjdG9yKTtcbiAgfVxufVxuXG52YXIgX3Rlc3RJbmplY3RvcjogVGVzdEluamVjdG9yID0gbnVsbDtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRlc3RJbmplY3RvcigpIHtcbiAgaWYgKF90ZXN0SW5qZWN0b3IgPT0gbnVsbCkge1xuICAgIF90ZXN0SW5qZWN0b3IgPSBuZXcgVGVzdEluamVjdG9yKCk7XG4gIH1cbiAgcmV0dXJuIF90ZXN0SW5qZWN0b3I7XG59XG5cbi8qKlxuICogU2V0IHRoZSBwcm92aWRlcnMgdGhhdCB0aGUgdGVzdCBpbmplY3RvciBzaG91bGQgdXNlLiBUaGVzZSBzaG91bGQgYmUgcHJvdmlkZXJzXG4gKiBjb21tb24gdG8gZXZlcnkgdGVzdCBpbiB0aGUgc3VpdGUuXG4gKlxuICogVGhpcyBtYXkgb25seSBiZSBjYWxsZWQgb25jZSwgdG8gc2V0IHVwIHRoZSBjb21tb24gcHJvdmlkZXJzIGZvciB0aGUgY3VycmVudCB0ZXN0XG4gKiBzdWl0ZSBvbiB0ZWggY3VycmVudCBwbGF0Zm9ybS4gSWYgeW91IGFic29sdXRlbHkgbmVlZCB0byBjaGFuZ2UgdGhlIHByb3ZpZGVycyxcbiAqIGZpcnN0IHVzZSBgcmVzZXRCYXNlVGVzdFByb3ZpZGVyc2AuXG4gKlxuICogVGVzdCBQcm92aWRlcnMgZm9yIGluZGl2aWR1YWwgcGxhdGZvcm1zIGFyZSBhdmFpbGFibGUgZnJvbVxuICogJ2FuZ3VsYXIyL3BsYXRmb3JtL3Rlc3RpbmcvPHBsYXRmb3JtX25hbWU+Jy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEJhc2VUZXN0UHJvdmlkZXJzKHBsYXRmb3JtUHJvdmlkZXJzOiBBcnJheTxUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXT4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb25Qcm92aWRlcnM6IEFycmF5PFR5cGUgfCBQcm92aWRlciB8IGFueVtdPikge1xuICB2YXIgdGVzdEluamVjdG9yID0gZ2V0VGVzdEluamVjdG9yKCk7XG4gIGlmICh0ZXN0SW5qZWN0b3IucGxhdGZvcm1Qcm92aWRlcnMubGVuZ3RoID4gMCB8fCB0ZXN0SW5qZWN0b3IuYXBwbGljYXRpb25Qcm92aWRlcnMubGVuZ3RoID4gMCkge1xuICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKCdDYW5ub3Qgc2V0IGJhc2UgcHJvdmlkZXJzIGJlY2F1c2UgaXQgaGFzIGFscmVhZHkgYmVlbiBjYWxsZWQnKTtcbiAgfVxuICB0ZXN0SW5qZWN0b3IucGxhdGZvcm1Qcm92aWRlcnMgPSBwbGF0Zm9ybVByb3ZpZGVycztcbiAgdGVzdEluamVjdG9yLmFwcGxpY2F0aW9uUHJvdmlkZXJzID0gYXBwbGljYXRpb25Qcm92aWRlcnM7XG4gIHZhciBpbmplY3RvciA9IHRlc3RJbmplY3Rvci5jcmVhdGVJbmplY3RvcigpO1xuICBsZXQgaW5pdHM6IEZ1bmN0aW9uW10gPSBpbmplY3Rvci5nZXRPcHRpb25hbChQTEFURk9STV9JTklUSUFMSVpFUik7XG4gIGlmIChpc1ByZXNlbnQoaW5pdHMpKSB7XG4gICAgaW5pdHMuZm9yRWFjaChpbml0ID0+IGluaXQoKSk7XG4gIH1cbiAgdGVzdEluamVjdG9yLnJlc2V0KCk7XG59XG5cbi8qKlxuICogUmVzZXQgdGhlIHByb3ZpZGVycyBmb3IgdGhlIHRlc3QgaW5qZWN0b3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNldEJhc2VUZXN0UHJvdmlkZXJzKCkge1xuICB2YXIgdGVzdEluamVjdG9yID0gZ2V0VGVzdEluamVjdG9yKCk7XG4gIHRlc3RJbmplY3Rvci5wbGF0Zm9ybVByb3ZpZGVycyA9IFtdO1xuICB0ZXN0SW5qZWN0b3IuYXBwbGljYXRpb25Qcm92aWRlcnMgPSBbXTtcbiAgdGVzdEluamVjdG9yLnJlc2V0KCk7XG59XG5cbi8qKlxuICogQWxsb3dzIGluamVjdGluZyBkZXBlbmRlbmNpZXMgaW4gYGJlZm9yZUVhY2goKWAgYW5kIGBpdCgpYC5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYFxuICogYmVmb3JlRWFjaChpbmplY3QoW0RlcGVuZGVuY3ksIEFDbGFzc10sIChkZXAsIG9iamVjdCkgPT4ge1xuICogICAvLyBzb21lIGNvZGUgdGhhdCB1c2VzIGBkZXBgIGFuZCBgb2JqZWN0YFxuICogICAvLyAuLi5cbiAqIH0pKTtcbiAqXG4gKiBpdCgnLi4uJywgaW5qZWN0KFtBQ2xhc3NdLCAob2JqZWN0KSA9PiB7XG4gKiAgIG9iamVjdC5kb1NvbWV0aGluZygpO1xuICogICBleHBlY3QoLi4uKTtcbiAqIH0pXG4gKiBgYGBcbiAqXG4gKiBOb3RlczpcbiAqIC0gaW5qZWN0IGlzIGN1cnJlbnRseSBhIGZ1bmN0aW9uIGJlY2F1c2Ugb2Ygc29tZSBUcmFjZXVyIGxpbWl0YXRpb24gdGhlIHN5bnRheCBzaG91bGRcbiAqIGV2ZW50dWFsbHlcbiAqICAgYmVjb21lcyBgaXQoJy4uLicsIEBJbmplY3QgKG9iamVjdDogQUNsYXNzLCBhc3luYzogQXN5bmNUZXN0Q29tcGxldGVyKSA9PiB7IC4uLiB9KTtgXG4gKlxuICogQHBhcmFtIHtBcnJheX0gdG9rZW5zXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RnVuY3Rpb25XaXRoUGFyYW1Ub2tlbnN9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbmplY3QodG9rZW5zOiBhbnlbXSwgZm46IEZ1bmN0aW9uKTogRnVuY3Rpb25XaXRoUGFyYW1Ub2tlbnMge1xuICByZXR1cm4gbmV3IEZ1bmN0aW9uV2l0aFBhcmFtVG9rZW5zKHRva2VucywgZm4sIGZhbHNlKTtcbn1cblxuZXhwb3J0IGNsYXNzIEluamVjdFNldHVwV3JhcHBlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3Byb3ZpZGVyczogKCkgPT4gYW55KSB7fVxuXG4gIGluamVjdCh0b2tlbnM6IGFueVtdLCBmbjogRnVuY3Rpb24pOiBGdW5jdGlvbldpdGhQYXJhbVRva2VucyB7XG4gICAgcmV0dXJuIG5ldyBGdW5jdGlvbldpdGhQYXJhbVRva2Vucyh0b2tlbnMsIGZuLCBmYWxzZSwgdGhpcy5fcHJvdmlkZXJzKTtcbiAgfVxuXG4gIGluamVjdEFzeW5jKHRva2VuczogYW55W10sIGZuOiBGdW5jdGlvbik6IEZ1bmN0aW9uV2l0aFBhcmFtVG9rZW5zIHtcbiAgICByZXR1cm4gbmV3IEZ1bmN0aW9uV2l0aFBhcmFtVG9rZW5zKHRva2VucywgZm4sIHRydWUsIHRoaXMuX3Byb3ZpZGVycyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdpdGhQcm92aWRlcnMocHJvdmlkZXJzOiAoKSA9PiBhbnkpIHtcbiAgcmV0dXJuIG5ldyBJbmplY3RTZXR1cFdyYXBwZXIocHJvdmlkZXJzKTtcbn1cblxuLyoqXG4gKiBBbGxvd3MgaW5qZWN0aW5nIGRlcGVuZGVuY2llcyBpbiBgYmVmb3JlRWFjaCgpYCBhbmQgYGl0KClgLiBUaGUgdGVzdCBtdXN0IHJldHVyblxuICogYSBwcm9taXNlIHdoaWNoIHdpbGwgcmVzb2x2ZSB3aGVuIGFsbCBhc3luY2hyb25vdXMgYWN0aXZpdHkgaXMgY29tcGxldGUuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBcbiAqIGl0KCcuLi4nLCBpbmplY3RBc3luYyhbQUNsYXNzXSwgKG9iamVjdCkgPT4ge1xuICogICByZXR1cm4gb2JqZWN0LmRvU29tZXRoaW5nKCkudGhlbigoKSA9PiB7XG4gKiAgICAgZXhwZWN0KC4uLik7XG4gKiAgIH0pO1xuICogfSlcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHRva2Vuc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0Z1bmN0aW9uV2l0aFBhcmFtVG9rZW5zfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5qZWN0QXN5bmModG9rZW5zOiBhbnlbXSwgZm46IEZ1bmN0aW9uKTogRnVuY3Rpb25XaXRoUGFyYW1Ub2tlbnMge1xuICByZXR1cm4gbmV3IEZ1bmN0aW9uV2l0aFBhcmFtVG9rZW5zKHRva2VucywgZm4sIHRydWUpO1xufVxuXG5mdW5jdGlvbiBlbXB0eUFycmF5KCk6IEFycmF5PGFueT4ge1xuICByZXR1cm4gW107XG59XG5cbmV4cG9ydCBjbGFzcyBGdW5jdGlvbldpdGhQYXJhbVRva2VucyB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3Rva2VuczogYW55W10sIHByaXZhdGUgX2ZuOiBGdW5jdGlvbiwgcHVibGljIGlzQXN5bmM6IGJvb2xlYW4sXG4gICAgICAgICAgICAgIHB1YmxpYyBhZGRpdGlvbmFsUHJvdmlkZXJzOiAoKSA9PiBhbnkgPSBlbXB0eUFycmF5KSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgZXhlY3V0ZWQgZnVuY3Rpb24uXG4gICAqL1xuICBleGVjdXRlKGluamVjdG9yOiBJbmplY3Rvcik6IGFueSB7XG4gICAgdmFyIHBhcmFtcyA9IHRoaXMuX3Rva2Vucy5tYXAodCA9PiBpbmplY3Rvci5nZXQodCkpO1xuICAgIHJldHVybiBGdW5jdGlvbldyYXBwZXIuYXBwbHkodGhpcy5fZm4sIHBhcmFtcyk7XG4gIH1cblxuICBoYXNUb2tlbih0b2tlbjogYW55KTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl90b2tlbnMuaW5kZXhPZih0b2tlbikgPiAtMTsgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
