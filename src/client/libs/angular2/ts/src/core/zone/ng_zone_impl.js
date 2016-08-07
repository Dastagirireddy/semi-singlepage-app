System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var NgZoneError, NgZoneImpl;
    return {
        setters:[],
        execute: function() {
            /**
             * Stores error information; delivered via [NgZone.onError] stream.
             */
            NgZoneError = (function () {
                function NgZoneError(error, stackTrace) {
                    this.error = error;
                    this.stackTrace = stackTrace;
                }
                return NgZoneError;
            }());
            exports_1("NgZoneError", NgZoneError);
            NgZoneImpl = (function () {
                function NgZoneImpl(_a) {
                    var _this = this;
                    var trace = _a.trace, onEnter = _a.onEnter, onLeave = _a.onLeave, setMicrotask = _a.setMicrotask, setMacrotask = _a.setMacrotask, onError = _a.onError;
                    this.onEnter = onEnter;
                    this.onLeave = onLeave;
                    this.setMicrotask = setMicrotask;
                    this.setMacrotask = setMacrotask;
                    this.onError = onError;
                    if (Zone) {
                        this.outer = this.inner = Zone.current;
                        if (Zone['wtfZoneSpec']) {
                            this.inner = this.inner.fork(Zone['wtfZoneSpec']);
                        }
                        if (trace && Zone['longStackTraceZoneSpec']) {
                            this.inner = this.inner.fork(Zone['longStackTraceZoneSpec']);
                        }
                        this.inner = this.inner.fork({
                            name: 'angular',
                            properties: { 'isAngularZone': true },
                            onInvokeTask: function (delegate, current, target, task, applyThis, applyArgs) {
                                try {
                                    _this.onEnter();
                                    return delegate.invokeTask(target, task, applyThis, applyArgs);
                                }
                                finally {
                                    _this.onLeave();
                                }
                            },
                            onInvoke: function (delegate, current, target, callback, applyThis, applyArgs, source) {
                                try {
                                    _this.onEnter();
                                    return delegate.invoke(target, callback, applyThis, applyArgs, source);
                                }
                                finally {
                                    _this.onLeave();
                                }
                            },
                            onHasTask: function (delegate, current, target, hasTaskState) {
                                delegate.hasTask(target, hasTaskState);
                                if (current == target) {
                                    // We are only interested in hasTask events which originate from our zone
                                    // (A child hasTask event is not interesting to us)
                                    if (hasTaskState.change == 'microTask') {
                                        _this.setMicrotask(hasTaskState.microTask);
                                    }
                                    else if (hasTaskState.change == 'macroTask') {
                                        _this.setMacrotask(hasTaskState.macroTask);
                                    }
                                }
                            },
                            onHandleError: function (delegate, current, target, error) {
                                delegate.handleError(target, error);
                                _this.onError(new NgZoneError(error, error.stack));
                                return false;
                            }
                        });
                    }
                    else {
                        throw new Error('Angular2 needs to be run with Zone.js polyfill.');
                    }
                }
                NgZoneImpl.isInAngularZone = function () { return Zone.current.get('isAngularZone') === true; };
                NgZoneImpl.prototype.runInner = function (fn) { return this.inner.runGuarded(fn); };
                ;
                NgZoneImpl.prototype.runOuter = function (fn) { return this.outer.run(fn); };
                ;
                return NgZoneImpl;
            }());
            exports_1("NgZoneImpl", NgZoneImpl);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvem9uZS9uZ196b25lX2ltcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQUVBOztlQUVHO1lBQ0g7Z0JBQ0UscUJBQW1CLEtBQVUsRUFBUyxVQUFlO29CQUFsQyxVQUFLLEdBQUwsS0FBSyxDQUFLO29CQUFTLGVBQVUsR0FBVixVQUFVLENBQUs7Z0JBQUcsQ0FBQztnQkFDM0Qsa0JBQUM7WUFBRCxDQUZBLEFBRUMsSUFBQTtZQUZELHFDQUVDLENBQUE7WUFHRDtnQkFjRSxvQkFBWSxFQU9YO29CQXJCSCxpQkF3RkM7d0JBMUVjLGdCQUFLLEVBQUUsb0JBQU8sRUFBRSxvQkFBTyxFQUFFLDhCQUFZLEVBQUUsOEJBQVksRUFBRSxvQkFBTztvQkFRdkUsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO29CQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztvQkFDakMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7b0JBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO29CQUV2QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNULElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO3dCQUN2QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO3dCQUNwRCxDQUFDO3dCQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJB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QUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQUNsRSw2QkFBUSxHQUFSLFVBQVMsRUFBYSxJQUFTLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQUM3RCxpQkFBQztZQUFELENBeEZBLEFBd0ZDLElBQUE7WUF4RkQsbUNBd0ZDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29yZS96b25lL25nX3pvbmVfaW1wbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Z2xvYmFsfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG4vKipcbiAqIFN0b3JlcyBlcnJvciBpbmZvcm1hdGlvbjsgZGVsaXZlcmVkIHZpYSBbTmdab25lLm9uRXJyb3JdIHN0cmVhbS5cbiAqL1xuZXhwb3J0IGNsYXNzIE5nWm9uZUVycm9yIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVycm9yOiBhbnksIHB1YmxpYyBzdGFja1RyYWNlOiBhbnkpIHt9XG59XG5cblxuZXhwb3J0IGNsYXNzIE5nWm9uZUltcGwge1xuICBzdGF0aWMgaXNJbkFuZ3VsYXJab25lKCk6IGJvb2xlYW4geyByZXR1cm4gWm9uZS5jdXJyZW50LmdldCgnaXNBbmd1bGFyWm9uZScpID09PSB0cnVlOyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIG91dGVyOiBab25lO1xuICAvKiogQGludGVybmFsICovXG4gIHByaXZhdGUgaW5uZXI6IFpvbmU7XG5cbiAgcHJpdmF0ZSBvbkVudGVyOiAoKSA9PiB2b2lkO1xuICBwcml2YXRlIG9uTGVhdmU6ICgpID0+IHZvaWQ7XG4gIHByaXZhdGUgc2V0TWljcm90YXNrOiAoaGFzTWljcm90YXNrczogYm9vbGVhbikgPT4gdm9pZDtcbiAgcHJpdmF0ZSBzZXRNYWNyb3Rhc2s6IChoYXNNYWNyb3Rhc2tzOiBib29sZWFuKSA9PiB2b2lkO1xuICBwcml2YXRlIG9uRXJyb3I6IChlcnJvcjogTmdab25lRXJyb3IpID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3Ioe3RyYWNlLCBvbkVudGVyLCBvbkxlYXZlLCBzZXRNaWNyb3Rhc2ssIHNldE1hY3JvdGFzaywgb25FcnJvcn06IHtcbiAgICB0cmFjZTogYm9vbGVhbixcbiAgICBvbkVudGVyOiAoKSA9PiB2b2lkLFxuICAgIG9uTGVhdmU6ICgpID0+IHZvaWQsXG4gICAgc2V0TWljcm90YXNrOiAoaGFzTWljcm90YXNrczogYm9vbGVhbikgPT4gdm9pZCxcbiAgICBzZXRNYWNyb3Rhc2s6IChoYXNNYWNyb3Rhc2tzOiBib29sZWFuKSA9PiB2b2lkLFxuICAgIG9uRXJyb3I6IChlcnJvcjogTmdab25lRXJyb3IpID0+IHZvaWRcbiAgfSkge1xuICAgIHRoaXMub25FbnRlciA9IG9uRW50ZXI7XG4gICAgdGhpcy5vbkxlYXZlID0gb25MZWF2ZTtcbiAgICB0aGlzLnNldE1pY3JvdGFzayA9IHNldE1pY3JvdGFzaztcbiAgICB0aGlzLnNldE1hY3JvdGFzayA9IHNldE1hY3JvdGFzaztcbiAgICB0aGlzLm9uRXJyb3IgPSBvbkVycm9yO1xuXG4gICAgaWYgKFpvbmUpIHtcbiAgICAgIHRoaXMub3V0ZXIgPSB0aGlzLmlubmVyID0gWm9uZS5jdXJyZW50O1xuICAgICAgaWYgKFpvbmVbJ3d0ZlpvbmVTcGVjJ10pIHtcbiAgICAgICAgdGhpcy5pbm5lciA9IHRoaXMuaW5uZXIuZm9yayhab25lWyd3dGZab25lU3BlYyddKTtcbiAgICAgIH1cbiAgICAgIGlmICh0cmFjZSAmJiBab25lWydsb25nU3RhY2tUcmFjZVpvbmVTcGVjJ10pIHtcbiAgICAgICAgdGhpcy5pbm5lciA9IHRoaXMuaW5uZXIuZm9yayhab25lWydsb25nU3RhY2tUcmFjZVpvbmVTcGVjJ10pO1xuICAgICAgfVxuICAgICAgdGhpcy5pbm5lciA9IHRoaXMuaW5uZXIuZm9yayh7XG4gICAgICAgIG5hbWU6ICdhbmd1bGFyJyxcbiAgICAgICAgcHJvcGVydGllczo8YW55PnsnaXNBbmd1bGFyWm9uZSc6IHRydWV9LFxuICAgICAgICBvbkludm9rZVRhc2s6IChkZWxlZ2F0ZTogWm9uZURlbGVnYXRlLCBjdXJyZW50OiBab25lLCB0YXJnZXQ6IFpvbmUsIHRhc2s6IFRhc2ssXG4gICAgICAgICAgICAgICAgICAgICAgIGFwcGx5VGhpczogYW55LCBhcHBseUFyZ3M6IGFueSk6IGFueSA9PiB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMub25FbnRlcigpO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlLmludm9rZVRhc2sodGFyZ2V0LCB0YXNrLCBhcHBseVRoaXMsIGFwcGx5QXJncyk7XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMub25MZWF2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuXG4gICAgICAgIG9uSW52b2tlOiAoZGVsZWdhdGU6IFpvbmVEZWxlZ2F0ZSwgY3VycmVudDogWm9uZSwgdGFyZ2V0OiBab25lLCBjYWxsYmFjazogRnVuY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgYXBwbHlUaGlzOiBhbnksIGFwcGx5QXJnczogYW55W10sIHNvdXJjZTogc3RyaW5nKTogYW55ID0+IHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5vbkVudGVyKCk7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGUuaW52b2tlKHRhcmdldCwgY2FsbGJhY2ssIGFwcGx5VGhpcywgYXBwbHlBcmdzLCBzb3VyY2UpO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLm9uTGVhdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgb25IYXNUYXNrOlxuICAgICAgICAgICAgKGRlbGVnYXRlOiBab25lRGVsZWdhdGUsIGN1cnJlbnQ6IFpvbmUsIHRhcmdldDogWm9uZSwgaGFzVGFza1N0YXRlOiBIYXNUYXNrU3RhdGUpID0+IHtcbiAgICAgICAgICAgICAgZGVsZWdhdGUuaGFzVGFzayh0YXJnZXQsIGhhc1Rhc2tTdGF0ZSk7XG4gICAgICAgICAgICAgIGlmIChjdXJyZW50ID09IHRhcmdldCkge1xuICAgICAgICAgICAgICAgIC8vIFdlIGFyZSBvbmx5IGludGVyZXN0ZWQgaW4gaGFzVGFzayBldmVudHMgd2hpY2ggb3JpZ2luYXRlIGZyb20gb3VyIHpvbmVcbiAgICAgICAgICAgICAgICAvLyAoQSBjaGlsZCBoYXNUYXNrIGV2ZW50IGlzIG5vdCBpbnRlcmVzdGluZyB0byB1cylcbiAgICAgICAgICAgICAgICBpZiAoaGFzVGFza1N0YXRlLmNoYW5nZSA9PSAnbWljcm9UYXNrJykge1xuICAgICAgICAgICAgICAgICAgdGhpcy5zZXRNaWNyb3Rhc2soaGFzVGFza1N0YXRlLm1pY3JvVGFzayk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNUYXNrU3RhdGUuY2hhbmdlID09ICdtYWNyb1Rhc2snKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnNldE1hY3JvdGFzayhoYXNUYXNrU3RhdGUubWFjcm9UYXNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgb25IYW5kbGVFcnJvcjogKGRlbGVnYXRlOiBab25lRGVsZWdhdGUsIGN1cnJlbnQ6IFpvbmUsIHRhcmdldDogWm9uZSwgZXJyb3I6IGFueSk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBib29sZWFuID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZWdhdGUuaGFuZGxlRXJyb3IodGFyZ2V0LCBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25FcnJvcihuZXcgTmdab25lRXJyb3IoZXJyb3IsIGVycm9yLnN0YWNrKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FuZ3VsYXIyIG5lZWRzIHRvIGJlIHJ1biB3aXRoIFpvbmUuanMgcG9seWZpbGwuJyk7XG4gICAgfVxuICB9XG5cbiAgcnVuSW5uZXIoZm46ICgpID0+IGFueSk6IGFueSB7IHJldHVybiB0aGlzLmlubmVyLnJ1bkd1YXJkZWQoZm4pOyB9O1xuICBydW5PdXRlcihmbjogKCkgPT4gYW55KTogYW55IHsgcmV0dXJuIHRoaXMub3V0ZXIucnVuKGZuKTsgfTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
