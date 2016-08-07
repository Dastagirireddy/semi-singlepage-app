System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/collection'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, exceptions_1, collection_1;
    var _scheduler, _microtasks, _pendingPeriodicTimers, _pendingTimers, FakeAsyncZoneSpec;
    /**
     * Wraps a function to be executed in the fakeAsync zone:
     * - microtasks are manually executed by calling `flushMicrotasks()`,
     * - timers are synchronous, `tick()` simulates the asynchronous passage of time.
     *
     * If there are any pending timers at the end of the function, an exception will be thrown.
     *
     * ## Example
     *
     * {@example testing/ts/fake_async.ts region='basic'}
     *
     * @param fn
     * @returns {Function} The function wrapped to be executed in the fakeAsync zone
     */
    function fakeAsync(fn) {
        if (Zone.current.get('inFakeAsyncZone')) {
            throw new Error('fakeAsync() calls can not be nested');
        }
        var fakeAsyncZone = Zone.current.fork(new FakeAsyncZoneSpec());
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            // TODO(tbosch): This class should already be part of the jasmine typings but it is not...
            _scheduler = new jasmine.DelayedFunctionScheduler();
            clearPendingTimers();
            var res = fakeAsyncZone.run(function () {
                var res = fn.apply(void 0, args);
                flushMicrotasks();
                return res;
            });
            if (_pendingPeriodicTimers.length > 0) {
                throw new exceptions_1.BaseException(_pendingPeriodicTimers.length + " periodic timer(s) still in the queue.");
            }
            if (_pendingTimers.length > 0) {
                throw new exceptions_1.BaseException(_pendingTimers.length + " timer(s) still in the queue.");
            }
            _scheduler = null;
            collection_1.ListWrapper.clear(_microtasks);
            return res;
        };
    }
    exports_1("fakeAsync", fakeAsync);
    /**
     * Clear the queue of pending timers and microtasks.
     *
     * Useful for cleaning up after an asynchronous test passes.
     *
     * ## Example
     *
     * {@example testing/ts/fake_async.ts region='pending'}
     */
    function clearPendingTimers() {
        // TODO we should fix tick to dequeue the failed timer instead of relying on clearPendingTimers
        collection_1.ListWrapper.clear(_microtasks);
        collection_1.ListWrapper.clear(_pendingPeriodicTimers);
        collection_1.ListWrapper.clear(_pendingTimers);
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
        FakeAsyncZoneSpec.assertInZone();
        flushMicrotasks();
        _scheduler.tick(millis);
    }
    exports_1("tick", tick);
    /**
     * Flush any pending microtasks.
     */
    function flushMicrotasks() {
        FakeAsyncZoneSpec.assertInZone();
        while (_microtasks.length > 0) {
            var microtask = collection_1.ListWrapper.removeAt(_microtasks, 0);
            microtask();
        }
    }
    exports_1("flushMicrotasks", flushMicrotasks);
    function _setTimeout(fn, delay, args) {
        var cb = _fnAndFlush(fn);
        var id = _scheduler.scheduleFunction(cb, delay, args);
        _pendingTimers.push(id);
        _scheduler.scheduleFunction(_dequeueTimer(id), delay);
        return id;
    }
    function _clearTimeout(id) {
        _dequeueTimer(id);
        return _scheduler.removeFunctionWithId(id);
    }
    function _setInterval(fn, interval) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var cb = _fnAndFlush(fn);
        var id = _scheduler.scheduleFunction(cb, interval, args, true);
        _pendingPeriodicTimers.push(id);
        return id;
    }
    function _clearInterval(id) {
        collection_1.ListWrapper.remove(_pendingPeriodicTimers, id);
        return _scheduler.removeFunctionWithId(id);
    }
    function _fnAndFlush(fn) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            fn.apply(lang_1.global, args);
            flushMicrotasks();
        };
    }
    function _dequeueTimer(id) {
        return function () { collection_1.ListWrapper.remove(_pendingTimers, id); };
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            }],
        execute: function() {
            _microtasks = [];
            _pendingPeriodicTimers = [];
            _pendingTimers = [];
            FakeAsyncZoneSpec = (function () {
                function FakeAsyncZoneSpec() {
                    this.name = 'fakeAsync';
                    this.properties = { 'inFakeAsyncZone': true };
                }
                FakeAsyncZoneSpec.assertInZone = function () {
                    if (!Zone.current.get('inFakeAsyncZone')) {
                        throw new Error('The code should be running in the fakeAsync zone to call this function');
                    }
                };
                FakeAsyncZoneSpec.prototype.onScheduleTask = function (delegate, current, target, task) {
                    switch (task.type) {
                        case 'microTask':
                            _microtasks.push(task.invoke);
                            break;
                        case 'macroTask':
                            switch (task.source) {
                                case 'setTimeout':
                                    task.data['handleId'] = _setTimeout(task.invoke, task.data['delay'], task.data['args']);
                                    break;
                                case 'setInterval':
                                    task.data['handleId'] =
                                        _setInterval(task.invoke, task.data['delay'], task.data['args']);
                                    break;
                                default:
                                    task = delegate.scheduleTask(target, task);
                            }
                            break;
                        case 'eventTask':
                            task = delegate.scheduleTask(target, task);
                            break;
                    }
                    return task;
                };
                FakeAsyncZoneSpec.prototype.onCancelTask = function (delegate, current, target, task) {
                    switch (task.source) {
                        case 'setTimeout':
                            return _clearTimeout(task.data['handleId']);
                        case 'setInterval':
                            return _clearInterval(task.data['handleId']);
                        default:
                            return delegate.scheduleTask(target, task);
                    }
                };
                return FakeAsyncZoneSpec;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3Rlc3RpbmcvZmFrZV9hc3luYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBSUksVUFBVSxFQUNWLFdBQVcsRUFDWCxzQkFBc0IsRUFDdEIsY0FBYztJQWtEbEI7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILG1CQUEwQixFQUFZO1FBQ3BDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztRQUN6RCxDQUFDO1FBRUQsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxpQkFBaUIsRUFBRSxDQUFDLENBQUM7UUFFL0QsTUFBTSxDQUFDO1lBQVMsY0FBTztpQkFBUCxXQUFPLENBQVAsc0JBQU8sQ0FBUCxJQUFPO2dCQUFQLDZCQUFPOztZQUNyQiwwRkFBMEY7WUFDMUYsVUFBVSxHQUFHLElBQVUsT0FBUSxDQUFDLHdCQUF3QixFQUFFLENBQUM7WUFDM0Qsa0JBQWtCLEVBQUUsQ0FBQztZQUVyQixJQUFJLEdBQUcsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDO2dCQUMxQixJQUFJLEdBQUcsR0FBRyxFQUFFLGVBQUksSUFBSSxDQUFDLENBQUM7Z0JBQ3RCLGVBQWUsRUFBRSxDQUFDO2dCQUNsQixNQUFNLENBQUMsR0FBRyxDQUFDO1lBQ2IsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEMsTUFBTSxJQUFJLDBCQUFhLENBQ2hCLHNCQUFzQixDQUFDLE1BQU0sMkNBQXdDLENBQUMsQ0FBQztZQUNoRixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENB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b2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy90ZXN0aW5nL2Zha2VfYXN5bmMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2dsb2JhbH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7TGlzdFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5cbnZhciBfc2NoZWR1bGVyO1xudmFyIF9taWNyb3Rhc2tzOiBGdW5jdGlvbltdID0gW107XG52YXIgX3BlbmRpbmdQZXJpb2RpY1RpbWVyczogbnVtYmVyW10gPSBbXTtcbnZhciBfcGVuZGluZ1RpbWVyczogbnVtYmVyW10gPSBbXTtcblxuY2xhc3MgRmFrZUFzeW5jWm9uZVNwZWMgaW1wbGVtZW50cyBab25lU3BlYyB7XG4gIHN0YXRpYyBhc3NlcnRJblpvbmUoKTogdm9pZCB7XG4gICAgaWYgKCFab25lLmN1cnJlbnQuZ2V0KCdpbkZha2VBc3luY1pvbmUnKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY29kZSBzaG91bGQgYmUgcnVubmluZyBpbiB0aGUgZmFrZUFzeW5jIHpvbmUgdG8gY2FsbCB0aGlzIGZ1bmN0aW9uJyk7XG4gICAgfVxuICB9XG5cbiAgbmFtZTogc3RyaW5nID0gJ2Zha2VBc3luYyc7XG5cbiAgcHJvcGVydGllczoge1trZXk6IHN0cmluZ106IGFueX0gPSB7J2luRmFrZUFzeW5jWm9uZSc6IHRydWV9O1xuXG4gIG9uU2NoZWR1bGVUYXNrKGRlbGVnYXRlOiBab25lRGVsZWdhdGUsIGN1cnJlbnQ6IFpvbmUsIHRhcmdldDogWm9uZSwgdGFzazogVGFzayk6IFRhc2sge1xuICAgIHN3aXRjaCAodGFzay50eXBlKSB7XG4gICAgICBjYXNlICdtaWNyb1Rhc2snOlxuICAgICAgICBfbWljcm90YXNrcy5wdXNoKHRhc2suaW52b2tlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtYWNyb1Rhc2snOlxuICAgICAgICBzd2l0Y2ggKHRhc2suc291cmNlKSB7XG4gICAgICAgICAgY2FzZSAnc2V0VGltZW91dCc6XG4gICAgICAgICAgICB0YXNrLmRhdGFbJ2hhbmRsZUlkJ10gPSBfc2V0VGltZW91dCh0YXNrLmludm9rZSwgdGFzay5kYXRhWydkZWxheSddLCB0YXNrLmRhdGFbJ2FyZ3MnXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdzZXRJbnRlcnZhbCc6XG4gICAgICAgICAgICB0YXNrLmRhdGFbJ2hhbmRsZUlkJ10gPVxuICAgICAgICAgICAgICAgIF9zZXRJbnRlcnZhbCh0YXNrLmludm9rZSwgdGFzay5kYXRhWydkZWxheSddLCB0YXNrLmRhdGFbJ2FyZ3MnXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGFzayA9IGRlbGVnYXRlLnNjaGVkdWxlVGFzayh0YXJnZXQsIHRhc2spO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZXZlbnRUYXNrJzpcbiAgICAgICAgdGFzayA9IGRlbGVnYXRlLnNjaGVkdWxlVGFzayh0YXJnZXQsIHRhc2spO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIHRhc2s7XG4gIH1cblxuICBvbkNhbmNlbFRhc2soZGVsZWdhdGU6IFpvbmVEZWxlZ2F0ZSwgY3VycmVudDogWm9uZSwgdGFyZ2V0OiBab25lLCB0YXNrOiBUYXNrKTogYW55IHtcbiAgICBzd2l0Y2ggKHRhc2suc291cmNlKSB7XG4gICAgICBjYXNlICdzZXRUaW1lb3V0JzpcbiAgICAgICAgcmV0dXJuIF9jbGVhclRpbWVvdXQodGFzay5kYXRhWydoYW5kbGVJZCddKTtcbiAgICAgIGNhc2UgJ3NldEludGVydmFsJzpcbiAgICAgICAgcmV0dXJuIF9jbGVhckludGVydmFsKHRhc2suZGF0YVsnaGFuZGxlSWQnXSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZGVsZWdhdGUuc2NoZWR1bGVUYXNrKHRhcmdldCwgdGFzayk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogV3JhcHMgYSBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCBpbiB0aGUgZmFrZUFzeW5jIHpvbmU6XG4gKiAtIG1pY3JvdGFza3MgYXJlIG1hbnVhbGx5IGV4ZWN1dGVkIGJ5IGNhbGxpbmcgYGZsdXNoTWljcm90YXNrcygpYCxcbiAqIC0gdGltZXJzIGFyZSBzeW5jaHJvbm91cywgYHRpY2soKWAgc2ltdWxhdGVzIHRoZSBhc3luY2hyb25vdXMgcGFzc2FnZSBvZiB0aW1lLlxuICpcbiAqIElmIHRoZXJlIGFyZSBhbnkgcGVuZGluZyB0aW1lcnMgYXQgdGhlIGVuZCBvZiB0aGUgZnVuY3Rpb24sIGFuIGV4Y2VwdGlvbiB3aWxsIGJlIHRocm93bi5cbiAqXG4gKiAjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIHRlc3RpbmcvdHMvZmFrZV9hc3luYy50cyByZWdpb249J2Jhc2ljJ31cbiAqXG4gKiBAcGFyYW0gZm5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gVGhlIGZ1bmN0aW9uIHdyYXBwZWQgdG8gYmUgZXhlY3V0ZWQgaW4gdGhlIGZha2VBc3luYyB6b25lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmYWtlQXN5bmMoZm46IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICBpZiAoWm9uZS5jdXJyZW50LmdldCgnaW5GYWtlQXN5bmNab25lJykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2Zha2VBc3luYygpIGNhbGxzIGNhbiBub3QgYmUgbmVzdGVkJyk7XG4gIH1cblxuICB2YXIgZmFrZUFzeW5jWm9uZSA9IFpvbmUuY3VycmVudC5mb3JrKG5ldyBGYWtlQXN5bmNab25lU3BlYygpKTtcblxuICByZXR1cm4gZnVuY3Rpb24oLi4uYXJncykge1xuICAgIC8vIFRPRE8odGJvc2NoKTogVGhpcyBjbGFzcyBzaG91bGQgYWxyZWFkeSBiZSBwYXJ0IG9mIHRoZSBqYXNtaW5lIHR5cGluZ3MgYnV0IGl0IGlzIG5vdC4uLlxuICAgIF9zY2hlZHVsZXIgPSBuZXcgKDxhbnk+amFzbWluZSkuRGVsYXllZEZ1bmN0aW9uU2NoZWR1bGVyKCk7XG4gICAgY2xlYXJQZW5kaW5nVGltZXJzKCk7XG5cbiAgICBsZXQgcmVzID0gZmFrZUFzeW5jWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgbGV0IHJlcyA9IGZuKC4uLmFyZ3MpO1xuICAgICAgZmx1c2hNaWNyb3Rhc2tzKCk7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0pO1xuXG4gICAgaWYgKF9wZW5kaW5nUGVyaW9kaWNUaW1lcnMubGVuZ3RoID4gMCkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgICAgYCR7X3BlbmRpbmdQZXJpb2RpY1RpbWVycy5sZW5ndGh9IHBlcmlvZGljIHRpbWVyKHMpIHN0aWxsIGluIHRoZSBxdWV1ZS5gKTtcbiAgICB9XG5cbiAgICBpZiAoX3BlbmRpbmdUaW1lcnMubGVuZ3RoID4gMCkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYCR7X3BlbmRpbmdUaW1lcnMubGVuZ3RofSB0aW1lcihzKSBzdGlsbCBpbiB0aGUgcXVldWUuYCk7XG4gICAgfVxuXG4gICAgX3NjaGVkdWxlciA9IG51bGw7XG4gICAgTGlzdFdyYXBwZXIuY2xlYXIoX21pY3JvdGFza3MpO1xuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxufVxuXG4vKipcbiAqIENsZWFyIHRoZSBxdWV1ZSBvZiBwZW5kaW5nIHRpbWVycyBhbmQgbWljcm90YXNrcy5cbiAqXG4gKiBVc2VmdWwgZm9yIGNsZWFuaW5nIHVwIGFmdGVyIGFuIGFzeW5jaHJvbm91cyB0ZXN0IHBhc3Nlcy5cbiAqXG4gKiAjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIHRlc3RpbmcvdHMvZmFrZV9hc3luYy50cyByZWdpb249J3BlbmRpbmcnfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJQZW5kaW5nVGltZXJzKCk6IHZvaWQge1xuICAvLyBUT0RPIHdlIHNob3VsZCBmaXggdGljayB0byBkZXF1ZXVlIHRoZSBmYWlsZWQgdGltZXIgaW5zdGVhZCBvZiByZWx5aW5nIG9uIGNsZWFyUGVuZGluZ1RpbWVyc1xuICBMaXN0V3JhcHBlci5jbGVhcihfbWljcm90YXNrcyk7XG4gIExpc3RXcmFwcGVyLmNsZWFyKF9wZW5kaW5nUGVyaW9kaWNUaW1lcnMpO1xuICBMaXN0V3JhcHBlci5jbGVhcihfcGVuZGluZ1RpbWVycyk7XG59XG5cblxuLyoqXG4gKiBTaW11bGF0ZXMgdGhlIGFzeW5jaHJvbm91cyBwYXNzYWdlIG9mIHRpbWUgZm9yIHRoZSB0aW1lcnMgaW4gdGhlIGZha2VBc3luYyB6b25lLlxuICpcbiAqIFRoZSBtaWNyb3Rhc2tzIHF1ZXVlIGlzIGRyYWluZWQgYXQgdGhlIHZlcnkgc3RhcnQgb2YgdGhpcyBmdW5jdGlvbiBhbmQgYWZ0ZXIgYW55IHRpbWVyIGNhbGxiYWNrXG4gKiBoYXMgYmVlbiBleGVjdXRlZC5cbiAqXG4gKiAjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIHRlc3RpbmcvdHMvZmFrZV9hc3luYy50cyByZWdpb249J2Jhc2ljJ31cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gbWlsbGlzIE51bWJlciBvZiBtaWxsaXNlY29uZCwgZGVmYXVsdHMgdG8gMFxuICovXG5leHBvcnQgZnVuY3Rpb24gdGljayhtaWxsaXM6IG51bWJlciA9IDApOiB2b2lkIHtcbiAgRmFrZUFzeW5jWm9uZVNwZWMuYXNzZXJ0SW5ab25lKCk7XG4gIGZsdXNoTWljcm90YXNrcygpO1xuICBfc2NoZWR1bGVyLnRpY2sobWlsbGlzKTtcbn1cblxuLyoqXG4gKiBGbHVzaCBhbnkgcGVuZGluZyBtaWNyb3Rhc2tzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmx1c2hNaWNyb3Rhc2tzKCk6IHZvaWQge1xuICBGYWtlQXN5bmNab25lU3BlYy5hc3NlcnRJblpvbmUoKTtcbiAgd2hpbGUgKF9taWNyb3Rhc2tzLmxlbmd0aCA+IDApIHtcbiAgICB2YXIgbWljcm90YXNrID0gTGlzdFdyYXBwZXIucmVtb3ZlQXQoX21pY3JvdGFza3MsIDApO1xuICAgIG1pY3JvdGFzaygpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9zZXRUaW1lb3V0KGZuOiBGdW5jdGlvbiwgZGVsYXk6IG51bWJlciwgYXJnczogYW55W10pOiBudW1iZXIge1xuICB2YXIgY2IgPSBfZm5BbmRGbHVzaChmbik7XG4gIHZhciBpZCA9IF9zY2hlZHVsZXIuc2NoZWR1bGVGdW5jdGlvbihjYiwgZGVsYXksIGFyZ3MpO1xuICBfcGVuZGluZ1RpbWVycy5wdXNoKGlkKTtcbiAgX3NjaGVkdWxlci5zY2hlZHVsZUZ1bmN0aW9uKF9kZXF1ZXVlVGltZXIoaWQpLCBkZWxheSk7XG4gIHJldHVybiBpZDtcbn1cblxuZnVuY3Rpb24gX2NsZWFyVGltZW91dChpZDogbnVtYmVyKSB7XG4gIF9kZXF1ZXVlVGltZXIoaWQpO1xuICByZXR1cm4gX3NjaGVkdWxlci5yZW1vdmVGdW5jdGlvbldpdGhJZChpZCk7XG59XG5cbmZ1bmN0aW9uIF9zZXRJbnRlcnZhbChmbjogRnVuY3Rpb24sIGludGVydmFsOiBudW1iZXIsIC4uLmFyZ3MpIHtcbiAgdmFyIGNiID0gX2ZuQW5kRmx1c2goZm4pO1xuICB2YXIgaWQgPSBfc2NoZWR1bGVyLnNjaGVkdWxlRnVuY3Rpb24oY2IsIGludGVydmFsLCBhcmdzLCB0cnVlKTtcbiAgX3BlbmRpbmdQZXJpb2RpY1RpbWVycy5wdXNoKGlkKTtcbiAgcmV0dXJuIGlkO1xufVxuXG5mdW5jdGlvbiBfY2xlYXJJbnRlcnZhbChpZDogbnVtYmVyKSB7XG4gIExpc3RXcmFwcGVyLnJlbW92ZShfcGVuZGluZ1BlcmlvZGljVGltZXJzLCBpZCk7XG4gIHJldHVybiBfc2NoZWR1bGVyLnJlbW92ZUZ1bmN0aW9uV2l0aElkKGlkKTtcbn1cblxuZnVuY3Rpb24gX2ZuQW5kRmx1c2goZm46IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICBmbi5hcHBseShnbG9iYWwsIGFyZ3MpO1xuICAgIGZsdXNoTWljcm90YXNrcygpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9kZXF1ZXVlVGltZXIoaWQ6IG51bWJlcik6IEZ1bmN0aW9uIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkgeyBMaXN0V3JhcHBlci5yZW1vdmUoX3BlbmRpbmdUaW1lcnMsIGlkKTsgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
