System.register(['angular2/src/facade/exceptions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var exceptions_1;
    var _FakeAsyncTestZoneSpecType;
    /**
     * Wraps a function to be executed in the fakeAsync zone:
     * - microtasks are manually executed by calling `flushMicrotasks()`,
     * - timers are synchronous, `tick()` simulates the asynchronous passage of time.
     *
     * If there are any pending timers at the end of the function, an exception will be thrown.
     *
     * Can be used to wrap inject() calls.
     *
     * ## Example
     *
     * {@example testing/ts/fake_async.ts region='basic'}
     *
     * @param fn
     * @returns {Function} The function wrapped to be executed in the fakeAsync zone
     */
    function fakeAsync(fn) {
        if (Zone.current.get('FakeAsyncTestZoneSpec') != null) {
            throw new exceptions_1.BaseException('fakeAsync() calls can not be nested');
        }
        var fakeAsyncTestZoneSpec = new _FakeAsyncTestZoneSpecType();
        var fakeAsyncZone = Zone.current.fork(fakeAsyncTestZoneSpec);
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var res = fakeAsyncZone.run(function () {
                var res = fn.apply(void 0, args);
                flushMicrotasks();
                return res;
            });
            if (fakeAsyncTestZoneSpec.pendingPeriodicTimers.length > 0) {
                throw new exceptions_1.BaseException((fakeAsyncTestZoneSpec.pendingPeriodicTimers.length + " ") +
                    "periodic timer(s) still in the queue.");
            }
            if (fakeAsyncTestZoneSpec.pendingTimers.length > 0) {
                throw new exceptions_1.BaseException(fakeAsyncTestZoneSpec.pendingTimers.length + " timer(s) still in the queue.");
            }
            return res;
        };
    }
    exports_1("fakeAsync", fakeAsync);
    function _getFakeAsyncZoneSpec() {
        var zoneSpec = Zone.current.get('FakeAsyncTestZoneSpec');
        if (zoneSpec == null) {
            throw new Error('The code should be running in the fakeAsync zone to call this function');
        }
        return zoneSpec;
    }
    /**
     * Clear the queue of pending timers and microtasks.
     * Tests no longer need to call this explicitly.
     *
     * @deprecated
     */
    function clearPendingTimers() {
        // Do nothing.
    }
    exports_1("clearPendingTimers", clearPendingTimers);
    /**
     * Simulates the asynchronous passage of time for the timers in the fakeAsync zone.
     *
     * The microtasks queue is drained at the very start of this function and after any timer callback
     * has been executed.
     *
     * ## Example
     *
     * {@example testing/ts/fake_async.ts region='basic'}
     *
     * @param {number} millis Number of millisecond, defaults to 0
     */
    function tick(millis) {
        if (millis === void 0) { millis = 0; }
        _getFakeAsyncZoneSpec().tick(millis);
    }
    exports_1("tick", tick);
    /**
     * Flush any pending microtasks.
     */
    function flushMicrotasks() {
        _getFakeAsyncZoneSpec().flushMicrotasks();
    }
    exports_1("flushMicrotasks", flushMicrotasks);
    return {
        setters:[
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
            _FakeAsyncTestZoneSpecType = Zone['FakeAsyncTestZoneSpec'];
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy90ZXN0aW5nL2Zha2VfYXN5bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQUdJLDBCQUEwQjtJQUU5Qjs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxtQkFBMEIsRUFBWTtRQUNwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdEQsTUFBTSxJQUFJLDBCQUFhLENBQUMscUNBQXFDLENBQUMsQ0FBQztRQUNqRSxDQUFDO1FBRUQsSUFBSSxxQkFBcUIsR0FBRyxJQUFJLDBCQUEwQixFQUFFLENBQUM7UUFDN0QsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUU3RCxNQUFNLENBQUM7WUFBUyxjQUFPO2lCQUFQLFdBQU8sQ0FBUCxzQkFBTyxDQUFQLElBQU87Z0JBQVAsNkJBQU87O1lBQ3JCLElBQUksR0FBRyxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUM7Z0JBQzFCLElBQUksR0FBRyxHQUFHLEVBQUUsZUFBSSxJQUFJLENBQUMsQ0FBQztnQkFDdEIsZUFBZSxFQUFFLENBQUM7Z0JBQ2xCLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDYixDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLHFCQUFxQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxNQUFNLElBQUksMEJBQWEsQ0FBQyxDQUFHLHFCQUFxQixDQUFDLHFCQUFxQixDQUFDLE1BQU0sT0FBRztvQkFDeEQsdUNBQXVDLENBQUMsQ0FBQztZQUNuRSxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMscUJBQXFCLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCxNQUFNLElBQUksMEJBQWEsQ0FDaEIscUJBQXFCLENBQUMsYUFBYSxDQUFDLE1BQU0sa0NBQStCLENBQUMsQ0FBQztZQUNwRixDQUFDO1lBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNiLENBQUMsQ0FBQztJQUNKLENBQUM7SUExQkQsaUNBMEJDLENBQUE7SUFFRDtRQUNFLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDekQsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyx3RUFBd0UsQ0FBQyxDQUFDO1FBQzVGLENBQUM7UUFDRCxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNIO1FBQ0UsY0FBYztJQUNoQixDQUFDO0lBRkQsbURBRUMsQ0FBQTtJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsY0FBcUIsTUFBa0I7UUFBbEIsc0JBQWtCLEdBQWxCLFVBQWtCO1FBQ3JDLHFCQUFxQixFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFGRCx1QkFFQyxDQUFBO0lBRUQ7O09BRUc7SUFDSDtRQUNFLHFCQUFxQixFQUFFLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUZELDZDQUVDLENBQUE7Ozs7Ozs7WUFyRkcsMEJBQTBCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUMiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL3Rlc3RpbmcvZmFrZV9hc3luYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7Z2V0VGVzdEluamVjdG9yfSBmcm9tICcuL3Rlc3RfaW5qZWN0b3InO1xuXG5sZXQgX0Zha2VBc3luY1Rlc3Rab25lU3BlY1R5cGUgPSBab25lWydGYWtlQXN5bmNUZXN0Wm9uZVNwZWMnXTtcblxuLyoqXG4gKiBXcmFwcyBhIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIGluIHRoZSBmYWtlQXN5bmMgem9uZTpcbiAqIC0gbWljcm90YXNrcyBhcmUgbWFudWFsbHkgZXhlY3V0ZWQgYnkgY2FsbGluZyBgZmx1c2hNaWNyb3Rhc2tzKClgLFxuICogLSB0aW1lcnMgYXJlIHN5bmNocm9ub3VzLCBgdGljaygpYCBzaW11bGF0ZXMgdGhlIGFzeW5jaHJvbm91cyBwYXNzYWdlIG9mIHRpbWUuXG4gKlxuICogSWYgdGhlcmUgYXJlIGFueSBwZW5kaW5nIHRpbWVycyBhdCB0aGUgZW5kIG9mIHRoZSBmdW5jdGlvbiwgYW4gZXhjZXB0aW9uIHdpbGwgYmUgdGhyb3duLlxuICpcbiAqIENhbiBiZSB1c2VkIHRvIHdyYXAgaW5qZWN0KCkgY2FsbHMuXG4gKlxuICogIyMgRXhhbXBsZVxuICpcbiAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL2Zha2VfYXN5bmMudHMgcmVnaW9uPSdiYXNpYyd9XG4gKlxuICogQHBhcmFtIGZuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFRoZSBmdW5jdGlvbiB3cmFwcGVkIHRvIGJlIGV4ZWN1dGVkIGluIHRoZSBmYWtlQXN5bmMgem9uZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmFrZUFzeW5jKGZuOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgaWYgKFpvbmUuY3VycmVudC5nZXQoJ0Zha2VBc3luY1Rlc3Rab25lU3BlYycpICE9IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbignZmFrZUFzeW5jKCkgY2FsbHMgY2FuIG5vdCBiZSBuZXN0ZWQnKTtcbiAgfVxuXG4gIGxldCBmYWtlQXN5bmNUZXN0Wm9uZVNwZWMgPSBuZXcgX0Zha2VBc3luY1Rlc3Rab25lU3BlY1R5cGUoKTtcbiAgbGV0IGZha2VBc3luY1pvbmUgPSBab25lLmN1cnJlbnQuZm9yayhmYWtlQXN5bmNUZXN0Wm9uZVNwZWMpO1xuXG4gIHJldHVybiBmdW5jdGlvbiguLi5hcmdzKSB7XG4gICAgbGV0IHJlcyA9IGZha2VBc3luY1pvbmUucnVuKCgpID0+IHtcbiAgICAgIGxldCByZXMgPSBmbiguLi5hcmdzKTtcbiAgICAgIGZsdXNoTWljcm90YXNrcygpO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9KTtcblxuICAgIGlmIChmYWtlQXN5bmNUZXN0Wm9uZVNwZWMucGVuZGluZ1BlcmlvZGljVGltZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGAke2Zha2VBc3luY1Rlc3Rab25lU3BlYy5wZW5kaW5nUGVyaW9kaWNUaW1lcnMubGVuZ3RofSBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBwZXJpb2RpYyB0aW1lcihzKSBzdGlsbCBpbiB0aGUgcXVldWUuYCk7XG4gICAgfVxuXG4gICAgaWYgKGZha2VBc3luY1Rlc3Rab25lU3BlYy5wZW5kaW5nVGltZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFxuICAgICAgICAgIGAke2Zha2VBc3luY1Rlc3Rab25lU3BlYy5wZW5kaW5nVGltZXJzLmxlbmd0aH0gdGltZXIocykgc3RpbGwgaW4gdGhlIHF1ZXVlLmApO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9O1xufVxuXG5mdW5jdGlvbiBfZ2V0RmFrZUFzeW5jWm9uZVNwZWMoKTogYW55IHtcbiAgbGV0IHpvbmVTcGVjID0gWm9uZS5jdXJyZW50LmdldCgnRmFrZUFzeW5jVGVzdFpvbmVTcGVjJyk7XG4gIGlmICh6b25lU3BlYyA9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY29kZSBzaG91bGQgYmUgcnVubmluZyBpbiB0aGUgZmFrZUFzeW5jIHpvbmUgdG8gY2FsbCB0aGlzIGZ1bmN0aW9uJyk7XG4gIH1cbiAgcmV0dXJuIHpvbmVTcGVjO1xufVxuXG4vKipcbiAqIENsZWFyIHRoZSBxdWV1ZSBvZiBwZW5kaW5nIHRpbWVycyBhbmQgbWljcm90YXNrcy5cbiAqIFRlc3RzIG5vIGxvbmdlciBuZWVkIHRvIGNhbGwgdGhpcyBleHBsaWNpdGx5LlxuICpcbiAqIEBkZXByZWNhdGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGVhclBlbmRpbmdUaW1lcnMoKTogdm9pZCB7XG4gIC8vIERvIG5vdGhpbmcuXG59XG5cbi8qKlxuICogU2ltdWxhdGVzIHRoZSBhc3luY2hyb25vdXMgcGFzc2FnZSBvZiB0aW1lIGZvciB0aGUgdGltZXJzIGluIHRoZSBmYWtlQXN5bmMgem9uZS5cbiAqXG4gKiBUaGUgbWljcm90YXNrcyBxdWV1ZSBpcyBkcmFpbmVkIGF0IHRoZSB2ZXJ5IHN0YXJ0IG9mIHRoaXMgZnVuY3Rpb24gYW5kIGFmdGVyIGFueSB0aW1lciBjYWxsYmFja1xuICogaGFzIGJlZW4gZXhlY3V0ZWQuXG4gKlxuICogIyMgRXhhbXBsZVxuICpcbiAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL2Zha2VfYXN5bmMudHMgcmVnaW9uPSdiYXNpYyd9XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IG1pbGxpcyBOdW1iZXIgb2YgbWlsbGlzZWNvbmQsIGRlZmF1bHRzIHRvIDBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRpY2sobWlsbGlzOiBudW1iZXIgPSAwKTogdm9pZCB7XG4gIF9nZXRGYWtlQXN5bmNab25lU3BlYygpLnRpY2sobWlsbGlzKTtcbn1cblxuLyoqXG4gKiBGbHVzaCBhbnkgcGVuZGluZyBtaWNyb3Rhc2tzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmx1c2hNaWNyb3Rhc2tzKCk6IHZvaWQge1xuICBfZ2V0RmFrZUFzeW5jWm9uZVNwZWMoKS5mbHVzaE1pY3JvdGFza3MoKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
