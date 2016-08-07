System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Wraps a test function in an asynchronous test zone. The test will automatically
     * complete when all asynchronous calls within this zone are done. Can be used
     * to wrap an {@link inject} call.
     *
     * Example:
     *
     * ```
     * it('...', async(inject([AClass], (object) => {
     *   object.doSomething.then(() => {
     *     expect(...);
     *   })
     * });
     * ```
     */
    function async(fn) {
        return function () {
            return new Promise(function (finishCallback, failCallback) {
                var AsyncTestZoneSpec = Zone['AsyncTestZoneSpec'];
                var testZoneSpec = new AsyncTestZoneSpec(finishCallback, failCallback, 'test');
                var testZone = Zone.current.fork(testZoneSpec);
                return testZone.run(fn);
            });
        };
    }
    exports_1("async", async);
    return {
        setters:[],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy90ZXN0aW5nL2FzeW5jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsZUFBc0IsRUFBWTtRQUNoQyxNQUFNLENBQUM7WUFDTCxNQUFNLENBQUMsSUFBSSxPQUFPLENBQU8sVUFBQyxjQUFjLEVBQUUsWUFBWTtnQkFDcEQsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxZQUFZLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxjQUFjLEVBQUUsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUMvRSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDL0MsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUE7SUFDSCxDQUFDO0lBVEQseUJBU0MsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvdGVzdGluZy9hc3luYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogV3JhcHMgYSB0ZXN0IGZ1bmN0aW9uIGluIGFuIGFzeW5jaHJvbm91cyB0ZXN0IHpvbmUuIFRoZSB0ZXN0IHdpbGwgYXV0b21hdGljYWxseVxuICogY29tcGxldGUgd2hlbiBhbGwgYXN5bmNocm9ub3VzIGNhbGxzIHdpdGhpbiB0aGlzIHpvbmUgYXJlIGRvbmUuIENhbiBiZSB1c2VkXG4gKiB0byB3cmFwIGFuIHtAbGluayBpbmplY3R9IGNhbGwuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBcbiAqIGl0KCcuLi4nLCBhc3luYyhpbmplY3QoW0FDbGFzc10sIChvYmplY3QpID0+IHtcbiAqICAgb2JqZWN0LmRvU29tZXRoaW5nLnRoZW4oKCkgPT4ge1xuICogICAgIGV4cGVjdCguLi4pO1xuICogICB9KVxuICogfSk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzeW5jKGZuOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKGZpbmlzaENhbGxiYWNrLCBmYWlsQ2FsbGJhY2spID0+IHtcbiAgICAgIHZhciBBc3luY1Rlc3Rab25lU3BlYyA9IFpvbmVbJ0FzeW5jVGVzdFpvbmVTcGVjJ107XG4gICAgICB2YXIgdGVzdFpvbmVTcGVjID0gbmV3IEFzeW5jVGVzdFpvbmVTcGVjKGZpbmlzaENhbGxiYWNrLCBmYWlsQ2FsbGJhY2ssICd0ZXN0Jyk7XG4gICAgICB2YXIgdGVzdFpvbmUgPSBab25lLmN1cnJlbnQuZm9yayh0ZXN0Wm9uZVNwZWMpO1xuICAgICAgcmV0dXJuIHRlc3Rab25lLnJ1bihmbik7XG4gICAgfSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
