System.register(['angular2/src/facade/lang', './test_injector', './matchers'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, test_injector_1;
    var _global, afterEach, describe, ddescribe, fdescribe, xdescribe, jsmBeforeEach, jsmIt, jsmIIt, jsmXIt, testInjector;
    /**
     * Allows overriding default providers of the test injector,
     * which are defined in test_injector.js.
     *
     * The given function must return a list of DI providers.
     *
     * ## Example:
     *
     * {@example testing/ts/testing.ts region='beforeEachProviders'}
     */
    function beforeEachProviders(fn) {
        jsmBeforeEach(function () {
            var providers = fn();
            if (!providers)
                return;
            try {
                testInjector.addProviders(providers);
            }
            catch (e) {
                throw new Error('beforeEachProviders was called after the injector had ' +
                    'been used in a beforeEach or it block. This invalidates the ' +
                    'test injector');
            }
        });
    }
    exports_1("beforeEachProviders", beforeEachProviders);
    function _wrapTestFn(fn) {
        // Wraps a test or beforeEach function to handle synchronous and asynchronous execution.
        return function (done) {
            if (fn.length === 0) {
                var retVal = fn();
                if (lang_1.isPromise(retVal)) {
                    // Asynchronous test function - wait for completion.
                    retVal.then(done, done.fail);
                }
                else {
                    // Synchronous test function - complete immediately.
                    done();
                }
            }
            else {
                // Asynchronous test function that takes "done" as parameter.
                fn(done);
            }
        };
    }
    function _it(jsmFn, name, testFn, testTimeOut) {
        jsmFn(name, _wrapTestFn(testFn), testTimeOut);
    }
    /**
     * Wrapper around Jasmine beforeEach function.
     *
     * beforeEach may be used with the `inject` function to fetch dependencies.
     *
     * See http://jasmine.github.io/ for more details.
     *
     * ## Example:
     *
     * {@example testing/ts/testing.ts region='beforeEach'}
     */
    function beforeEach(fn) {
        jsmBeforeEach(_wrapTestFn(fn));
    }
    exports_1("beforeEach", beforeEach);
    /**
     * Define a single test case with the given test name and execution function.
     *
     * The test function can be either a synchronous function, the result of {@link async},
     * or an injected function created via {@link inject}.
     *
     * Wrapper around Jasmine it function. See http://jasmine.github.io/ for more details.
     *
     * ## Example:
     *
     * {@example testing/ts/testing.ts region='describeIt'}
     */
    function it(name, fn, timeOut) {
        if (timeOut === void 0) { timeOut = null; }
        return _it(jsmIt, name, fn, timeOut);
    }
    exports_1("it", it);
    /**
     * Like {@link it}, but instructs the test runner to exclude this test
     * entirely. Useful for debugging or for excluding broken tests until
     * they can be fixed.
     *
     * Wrapper around Jasmine xit function. See http://jasmine.github.io/ for more details.
     *
     * ## Example:
     *
     * {@example testing/ts/testing.ts region='xit'}
     */
    function xit(name, fn, timeOut) {
        if (timeOut === void 0) { timeOut = null; }
        return _it(jsmXIt, name, fn, timeOut);
    }
    exports_1("xit", xit);
    /**
     * See {@link fit}.
     */
    function iit(name, fn, timeOut) {
        if (timeOut === void 0) { timeOut = null; }
        return _it(jsmIIt, name, fn, timeOut);
    }
    exports_1("iit", iit);
    /**
     * Like {@link it}, but instructs the test runner to only run this test.
     * Useful for debugging.
     *
     * Wrapper around Jasmine fit function. See http://jasmine.github.io/ for more details.
     *
     * ## Example:
     *
     * {@example testing/ts/testing.ts region='fit'}
     */
    function fit(name, fn, timeOut) {
        if (timeOut === void 0) { timeOut = null; }
        return _it(jsmIIt, name, fn, timeOut);
    }
    exports_1("fit", fit);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (test_injector_1_1) {
                test_injector_1 = test_injector_1_1;
                exports_1({
                    "inject": test_injector_1_1["inject"],
                    "async": test_injector_1_1["async"],
                    "injectAsync": test_injector_1_1["injectAsync"]
                });
            },
            function (matchers_1_1) {
                exports_1({
                    "expect": matchers_1_1["expect"],
                    "NgMatchers": matchers_1_1["NgMatchers"]
                });
            }],
        execute: function() {
            _global = (typeof window === 'undefined' ? lang_1.global : window);
            /**
             * Run a function (with an optional asynchronous callback) after each test case.
             *
             * See http://jasmine.github.io/ for more details.
             *
             * ## Example:
             *
             * {@example testing/ts/testing.ts region='afterEach'}
             */
            exports_1("afterEach", afterEach = _global.afterEach);
            /**
             * Group test cases together under a common description prefix.
             *
             * See http://jasmine.github.io/ for more details.
             *
             * ## Example:
             *
             * {@example testing/ts/testing.ts region='describeIt'}
             */
            exports_1("describe", describe = _global.describe);
            /**
             * See {@link fdescribe}.
             */
            exports_1("ddescribe", ddescribe = _global.fdescribe);
            /**
             * Like {@link describe}, but instructs the test runner to only run
             * the test cases in this group. This is useful for debugging.
             *
             * See http://jasmine.github.io/ for more details.
             *
             * ## Example:
             *
             * {@example testing/ts/testing.ts region='fdescribe'}
             */
            exports_1("fdescribe", fdescribe = _global.fdescribe);
            /**
             * Like {@link describe}, but instructs the test runner to exclude
             * this group of test cases from execution. This is useful for
             * debugging, or for excluding broken tests until they can be fixed.
             *
             * See http://jasmine.github.io/ for more details.
             *
             * ## Example:
             *
             * {@example testing/ts/testing.ts region='xdescribe'}
             */
            exports_1("xdescribe", xdescribe = _global.xdescribe);
            jsmBeforeEach = _global.beforeEach;
            jsmIt = _global.it;
            jsmIIt = _global.fit;
            jsmXIt = _global.xit;
            testInjector = test_injector_1.getTestInjector();
            // Reset the test providers before each test.
            jsmBeforeEach(function () { testInjector.reset(); });
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy90ZXN0aW5nL3Rlc3RpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQVlJLE9BQU8sRUFXQSxTQUFTLEVBV1QsUUFBUSxFQUtSLFNBQVMsRUFZVCxTQUFTLEVBYVQsU0FBUyxFQUVoQixhQUFhLEVBQ2IsS0FBSyxFQUNMLE1BQU0sRUFDTixNQUFNLEVBRU4sWUFBWTtJQUtoQjs7Ozs7Ozs7O09BU0c7SUFDSCw2QkFBb0MsRUFBRTtRQUNwQyxhQUFhLENBQUM7WUFDWixJQUFJLFNBQVMsR0FBRyxFQUFFLEVBQUUsQ0FBQztZQUNyQixFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFBQyxNQUFNLENBQUM7WUFDdkIsSUFBSSxDQUFDO2dCQUNILFlBQVksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkMsQ0FBRTtZQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsTUFBTSxJQUFJLEtBQUssQ0FBQyx3REFBd0Q7b0JBQ3hELDhEQUE4RDtvQkFDOUQsZUFBZSxDQUFDLENBQUM7WUFDbkMsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQVpELHFEQVlDLENBQUE7SUFFRCxxQkFBcUIsRUFBWTtRQUMvQix3RkFBd0Y7UUFDeEYsTUFBTSxDQUFDLFVBQUMsSUFBUztZQUNmLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxNQUFNLEdBQUcsRUFBRSxFQUFFLENBQUM7Z0JBQ2xCLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0QixvREFBb0Q7b0JBQ3JDLE1BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDL0MsQ0FBQztnQkFBQyxJQUFJLENB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Mi90cy9zcmMvdGVzdGluZy90ZXN0aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBQdWJsaWMgVGVzdCBMaWJyYXJ5IGZvciB1bml0IHRlc3RpbmcgQW5ndWxhcjIgQXBwbGljYXRpb25zLiBVc2VzIHRoZVxuICogSmFzbWluZSBmcmFtZXdvcmsuXG4gKi9cbmltcG9ydCB7Z2xvYmFsLCBpc1Byb21pc2V9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbmltcG9ydCB7aW5qZWN0LCBhc3luYywgaW5qZWN0QXN5bmMsIFRlc3RJbmplY3RvciwgZ2V0VGVzdEluamVjdG9yfSBmcm9tICcuL3Rlc3RfaW5qZWN0b3InO1xuXG5leHBvcnQge2luamVjdCwgYXN5bmMsIGluamVjdEFzeW5jfSBmcm9tICcuL3Rlc3RfaW5qZWN0b3InO1xuXG5leHBvcnQge2V4cGVjdCwgTmdNYXRjaGVyc30gZnJvbSAnLi9tYXRjaGVycyc7XG5cbnZhciBfZ2xvYmFsID0gPGFueT4odHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB3aW5kb3cpO1xuXG4vKipcbiAqIFJ1biBhIGZ1bmN0aW9uICh3aXRoIGFuIG9wdGlvbmFsIGFzeW5jaHJvbm91cyBjYWxsYmFjaykgYWZ0ZXIgZWFjaCB0ZXN0IGNhc2UuXG4gKlxuICogU2VlIGh0dHA6Ly9qYXNtaW5lLmdpdGh1Yi5pby8gZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiAjIyBFeGFtcGxlOlxuICpcbiAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL3Rlc3RpbmcudHMgcmVnaW9uPSdhZnRlckVhY2gnfVxuICovXG5leHBvcnQgdmFyIGFmdGVyRWFjaDogRnVuY3Rpb24gPSBfZ2xvYmFsLmFmdGVyRWFjaDtcblxuLyoqXG4gKiBHcm91cCB0ZXN0IGNhc2VzIHRvZ2V0aGVyIHVuZGVyIGEgY29tbW9uIGRlc2NyaXB0aW9uIHByZWZpeC5cbiAqXG4gKiBTZWUgaHR0cDovL2phc21pbmUuZ2l0aHViLmlvLyBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqICMjIEV4YW1wbGU6XG4gKlxuICoge0BleGFtcGxlIHRlc3RpbmcvdHMvdGVzdGluZy50cyByZWdpb249J2Rlc2NyaWJlSXQnfVxuICovXG5leHBvcnQgdmFyIGRlc2NyaWJlOiBGdW5jdGlvbiA9IF9nbG9iYWwuZGVzY3JpYmU7XG5cbi8qKlxuICogU2VlIHtAbGluayBmZGVzY3JpYmV9LlxuICovXG5leHBvcnQgdmFyIGRkZXNjcmliZTogRnVuY3Rpb24gPSBfZ2xvYmFsLmZkZXNjcmliZTtcblxuLyoqXG4gKiBMaWtlIHtAbGluayBkZXNjcmliZX0sIGJ1dCBpbnN0cnVjdHMgdGhlIHRlc3QgcnVubmVyIHRvIG9ubHkgcnVuXG4gKiB0aGUgdGVzdCBjYXNlcyBpbiB0aGlzIGdyb3VwLiBUaGlzIGlzIHVzZWZ1bCBmb3IgZGVidWdnaW5nLlxuICpcbiAqIFNlZSBodHRwOi8vamFzbWluZS5naXRodWIuaW8vIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogIyMgRXhhbXBsZTpcbiAqXG4gKiB7QGV4YW1wbGUgdGVzdGluZy90cy90ZXN0aW5nLnRzIHJlZ2lvbj0nZmRlc2NyaWJlJ31cbiAqL1xuZXhwb3J0IHZhciBmZGVzY3JpYmU6IEZ1bmN0aW9uID0gX2dsb2JhbC5mZGVzY3JpYmU7XG5cbi8qKlxuICogTGlrZSB7QGxpbmsgZGVzY3JpYmV9LCBidXQgaW5zdHJ1Y3RzIHRoZSB0ZXN0IHJ1bm5lciB0byBleGNsdWRlXG4gKiB0aGlzIGdyb3VwIG9mIHRlc3QgY2FzZXMgZnJvbSBleGVjdXRpb24uIFRoaXMgaXMgdXNlZnVsIGZvclxuICogZGVidWdnaW5nLCBvciBmb3IgZXhjbHVkaW5nIGJyb2tlbiB0ZXN0cyB1bnRpbCB0aGV5IGNhbiBiZSBmaXhlZC5cbiAqXG4gKiBTZWUgaHR0cDovL2phc21pbmUuZ2l0aHViLmlvLyBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqICMjIEV4YW1wbGU6XG4gKlxuICoge0BleGFtcGxlIHRlc3RpbmcvdHMvdGVzdGluZy50cyByZWdpb249J3hkZXNjcmliZSd9XG4gKi9cbmV4cG9ydCB2YXIgeGRlc2NyaWJlOiBGdW5jdGlvbiA9IF9nbG9iYWwueGRlc2NyaWJlO1xuXG52YXIganNtQmVmb3JlRWFjaCA9IF9nbG9iYWwuYmVmb3JlRWFjaDtcbnZhciBqc21JdCA9IF9nbG9iYWwuaXQ7XG52YXIganNtSUl0ID0gX2dsb2JhbC5maXQ7XG52YXIganNtWEl0ID0gX2dsb2JhbC54aXQ7XG5cbnZhciB0ZXN0SW5qZWN0b3I6IFRlc3RJbmplY3RvciA9IGdldFRlc3RJbmplY3RvcigpO1xuXG4vLyBSZXNldCB0aGUgdGVzdCBwcm92aWRlcnMgYmVmb3JlIGVhY2ggdGVzdC5cbmpzbUJlZm9yZUVhY2goKCkgPT4geyB0ZXN0SW5qZWN0b3IucmVzZXQoKTsgfSk7XG5cbi8qKlxuICogQWxsb3dzIG92ZXJyaWRpbmcgZGVmYXVsdCBwcm92aWRlcnMgb2YgdGhlIHRlc3QgaW5qZWN0b3IsXG4gKiB3aGljaCBhcmUgZGVmaW5lZCBpbiB0ZXN0X2luamVjdG9yLmpzLlxuICpcbiAqIFRoZSBnaXZlbiBmdW5jdGlvbiBtdXN0IHJldHVybiBhIGxpc3Qgb2YgREkgcHJvdmlkZXJzLlxuICpcbiAqICMjIEV4YW1wbGU6XG4gKlxuICoge0BleGFtcGxlIHRlc3RpbmcvdHMvdGVzdGluZy50cyByZWdpb249J2JlZm9yZUVhY2hQcm92aWRlcnMnfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYmVmb3JlRWFjaFByb3ZpZGVycyhmbik6IHZvaWQge1xuICBqc21CZWZvcmVFYWNoKCgpID0+IHtcbiAgICB2YXIgcHJvdmlkZXJzID0gZm4oKTtcbiAgICBpZiAoIXByb3ZpZGVycykgcmV0dXJuO1xuICAgIHRyeSB7XG4gICAgICB0ZXN0SW5qZWN0b3IuYWRkUHJvdmlkZXJzKHByb3ZpZGVycyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdiZWZvcmVFYWNoUHJvdmlkZXJzIHdhcyBjYWxsZWQgYWZ0ZXIgdGhlIGluamVjdG9yIGhhZCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAnYmVlbiB1c2VkIGluIGEgYmVmb3JlRWFjaCBvciBpdCBibG9jay4gVGhpcyBpbnZhbGlkYXRlcyB0aGUgJyArXG4gICAgICAgICAgICAgICAgICAgICAgJ3Rlc3QgaW5qZWN0b3InKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBfd3JhcFRlc3RGbihmbjogRnVuY3Rpb24pIHtcbiAgLy8gV3JhcHMgYSB0ZXN0IG9yIGJlZm9yZUVhY2ggZnVuY3Rpb24gdG8gaGFuZGxlIHN5bmNocm9ub3VzIGFuZCBhc3luY2hyb25vdXMgZXhlY3V0aW9uLlxuICByZXR1cm4gKGRvbmU6IGFueSkgPT4ge1xuICAgIGlmIChmbi5sZW5ndGggPT09IDApIHtcbiAgICAgIGxldCByZXRWYWwgPSBmbigpO1xuICAgICAgaWYgKGlzUHJvbWlzZShyZXRWYWwpKSB7XG4gICAgICAgIC8vIEFzeW5jaHJvbm91cyB0ZXN0IGZ1bmN0aW9uIC0gd2FpdCBmb3IgY29tcGxldGlvbi5cbiAgICAgICAgKDxQcm9taXNlPGFueT4+cmV0VmFsKS50aGVuKGRvbmUsIGRvbmUuZmFpbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBTeW5jaHJvbm91cyB0ZXN0IGZ1bmN0aW9uIC0gY29tcGxldGUgaW1tZWRpYXRlbHkuXG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQXN5bmNocm9ub3VzIHRlc3QgZnVuY3Rpb24gdGhhdCB0YWtlcyBcImRvbmVcIiBhcyBwYXJhbWV0ZXIuXG4gICAgICBmbihkb25lKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIF9pdChqc21GbjogRnVuY3Rpb24sIG5hbWU6IHN0cmluZywgdGVzdEZuOiBGdW5jdGlvbiwgdGVzdFRpbWVPdXQ6IG51bWJlcik6IHZvaWQge1xuICBqc21GbihuYW1lLCBfd3JhcFRlc3RGbih0ZXN0Rm4pLCB0ZXN0VGltZU91dCk7XG59XG5cbi8qKlxuICogV3JhcHBlciBhcm91bmQgSmFzbWluZSBiZWZvcmVFYWNoIGZ1bmN0aW9uLlxuICpcbiAqIGJlZm9yZUVhY2ggbWF5IGJlIHVzZWQgd2l0aCB0aGUgYGluamVjdGAgZnVuY3Rpb24gdG8gZmV0Y2ggZGVwZW5kZW5jaWVzLlxuICpcbiAqIFNlZSBodHRwOi8vamFzbWluZS5naXRodWIuaW8vIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogIyMgRXhhbXBsZTpcbiAqXG4gKiB7QGV4YW1wbGUgdGVzdGluZy90cy90ZXN0aW5nLnRzIHJlZ2lvbj0nYmVmb3JlRWFjaCd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiZWZvcmVFYWNoKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICBqc21CZWZvcmVFYWNoKF93cmFwVGVzdEZuKGZuKSk7XG59XG5cbi8qKlxuICogRGVmaW5lIGEgc2luZ2xlIHRlc3QgY2FzZSB3aXRoIHRoZSBnaXZlbiB0ZXN0IG5hbWUgYW5kIGV4ZWN1dGlvbiBmdW5jdGlvbi5cbiAqXG4gKiBUaGUgdGVzdCBmdW5jdGlvbiBjYW4gYmUgZWl0aGVyIGEgc3luY2hyb25vdXMgZnVuY3Rpb24sIHRoZSByZXN1bHQgb2Yge0BsaW5rIGFzeW5jfSxcbiAqIG9yIGFuIGluamVjdGVkIGZ1bmN0aW9uIGNyZWF0ZWQgdmlhIHtAbGluayBpbmplY3R9LlxuICpcbiAqIFdyYXBwZXIgYXJvdW5kIEphc21pbmUgaXQgZnVuY3Rpb24uIFNlZSBodHRwOi8vamFzbWluZS5naXRodWIuaW8vIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogIyMgRXhhbXBsZTpcbiAqXG4gKiB7QGV4YW1wbGUgdGVzdGluZy90cy90ZXN0aW5nLnRzIHJlZ2lvbj0nZGVzY3JpYmVJdCd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpdChuYW1lOiBzdHJpbmcsIGZuOiBGdW5jdGlvbiwgdGltZU91dDogbnVtYmVyID0gbnVsbCk6IHZvaWQge1xuICByZXR1cm4gX2l0KGpzbUl0LCBuYW1lLCBmbiwgdGltZU91dCk7XG59XG5cbi8qKlxuICogTGlrZSB7QGxpbmsgaXR9LCBidXQgaW5zdHJ1Y3RzIHRoZSB0ZXN0IHJ1bm5lciB0byBleGNsdWRlIHRoaXMgdGVzdFxuICogZW50aXJlbHkuIFVzZWZ1bCBmb3IgZGVidWdnaW5nIG9yIGZvciBleGNsdWRpbmcgYnJva2VuIHRlc3RzIHVudGlsXG4gKiB0aGV5IGNhbiBiZSBmaXhlZC5cbiAqXG4gKiBXcmFwcGVyIGFyb3VuZCBKYXNtaW5lIHhpdCBmdW5jdGlvbi4gU2VlIGh0dHA6Ly9qYXNtaW5lLmdpdGh1Yi5pby8gZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiAjIyBFeGFtcGxlOlxuICpcbiAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL3Rlc3RpbmcudHMgcmVnaW9uPSd4aXQnfVxuICovXG5leHBvcnQgZnVuY3Rpb24geGl0KG5hbWU6IHN0cmluZywgZm46IEZ1bmN0aW9uLCB0aW1lT3V0OiBudW1iZXIgPSBudWxsKTogdm9pZCB7XG4gIHJldHVybiBfaXQoanNtWEl0LCBuYW1lLCBmbiwgdGltZU91dCk7XG59XG5cbi8qKlxuICogU2VlIHtAbGluayBmaXR9LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaWl0KG5hbWU6IHN0cmluZywgZm46IEZ1bmN0aW9uLCB0aW1lT3V0OiBudW1iZXIgPSBudWxsKTogdm9pZCB7XG4gIHJldHVybiBfaXQoanNtSUl0LCBuYW1lLCBmbiwgdGltZU91dCk7XG59XG5cbi8qKlxuICogTGlrZSB7QGxpbmsgaXR9LCBidXQgaW5zdHJ1Y3RzIHRoZSB0ZXN0IHJ1bm5lciB0byBvbmx5IHJ1biB0aGlzIHRlc3QuXG4gKiBVc2VmdWwgZm9yIGRlYnVnZ2luZy5cbiAqXG4gKiBXcmFwcGVyIGFyb3VuZCBKYXNtaW5lIGZpdCBmdW5jdGlvbi4gU2VlIGh0dHA6Ly9qYXNtaW5lLmdpdGh1Yi5pby8gZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiAjIyBFeGFtcGxlOlxuICpcbiAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL3Rlc3RpbmcudHMgcmVnaW9uPSdmaXQnfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZml0KG5hbWU6IHN0cmluZywgZm46IEZ1bmN0aW9uLCB0aW1lT3V0OiBudW1iZXIgPSBudWxsKTogdm9pZCB7XG4gIHJldHVybiBfaXQoanNtSUl0LCBuYW1lLCBmbiwgdGltZU91dCk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
