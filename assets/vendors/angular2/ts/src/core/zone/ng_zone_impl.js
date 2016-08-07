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
                NgZoneImpl.prototype.runInner = function (fn) { return this.inner.run(fn); };
                ;
                NgZoneImpl.prototype.runInnerGuarded = function (fn) { return this.inner.runGuarded(fn); };
                ;
                NgZoneImpl.prototype.runOuter = function (fn) { return this.outer.run(fn); };
                ;
                return NgZoneImpl;
            }());
            exports_1("NgZoneImpl", NgZoneImpl);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL3pvbmUvbmdfem9uZV9pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7WUFFQTs7ZUFFRztZQUNIO2dCQUNFLHFCQUFtQixLQUFVLEVBQVMsVUFBZTtvQkFBbEMsVUFBSyxHQUFMLEtBQUssQ0FBSztvQkFBUyxlQUFVLEdBQVYsVUFBVSxDQUFLO2dCQUFHLENBQUM7Z0JBQzNELGtCQUFDO1lBQUQsQ0FGQSxBQUVDLElBQUE7WUFGRCxxQ0FFQyxDQUFBO1lBR0Q7Z0JBY0Usb0JBQVksRUFPWDtvQkFyQkgsaUJBeUZDO3dCQTNFYyxnQkFBSyxFQUFFLG9CQUFPLEVBQUUsb0JBQU8sRUFBRSw4QkFBWSxFQUFFLDhCQUFZLEVBQUUsb0JBQU87b0JBUXZFLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO29CQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztvQkFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7b0JBQ2pDLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO29CQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztvQkFFdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDVCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQzt3QkFDdkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzt3QkFDcEQsQ0FBQzt3QkFDRCxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUM1QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7d0JBQy9ELENBQUM7d0JBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzs0QkFDM0IsSUFBSSxFQUFFLFNBQVM7NEJBQ2YsVUFBVSxFQUFNLEVBQUMsZUFBZSxFQUFFLElBQUksRUFBQzs0QkFDdkMsWUFBWSxFQUFFLFVBQUMsUUFBc0IsRUFBRSxPQUFhLEVBQUUsTUFBWSxFQUFFLElBQVUsRUFDL0QsU0FBYyxFQUFFLFNBQWM7Z0NBQzNDLElBQUksQ0FBQztvQ0FDSCxLQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7b0NBQ2YsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0NBQ2pFLENBQUM7d0NBQVMsQ0FBQztvQ0FDVCxLQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0NBQ2pCLENBQUM7NEJBQ0gsQ0FBQzs0QkFHRCxRQUFRLEVBQUUsVUFBQyxRQUFzQixFQUFFLE9BQWEsRUFBRSxNQUFZLEVBQUUsUUFBa0IsRUFDdkUsU0FBYyxFQUFFLFNBQWdCLEVBQUUsTUFBYztnQ0FDekQsSUFBSSxDQUFDO29DQUNILEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQ0FDZixNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0NBQ3pFLENBQUM7d0NBQVMsQ0FBQztvQ0FDVCxLQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0NBQ2pCLENBQUM7NEJBQ0gsQ0FBQzs0QkFFRCxTQUFTLEVBQ0wsVUFBQyxRQUFzQixFQUFFLE9BQWEsRUFBRSxNQUFZLEVBQUUsWUFBMEI7Z0NBQzlFLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDO2dDQUN2QyxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztvQ0FDdEIseUVBQXlFO29DQUN6RSxtREFBbUQ7b0NBQ25ELEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQzt3Q0FDdkMsS0FBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7b0NBQzVDLENBQUM7b0NBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQzt3Q0FDOUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7b0NBQzVDLENBQUM7Z0NBQ0gsQ0FBQzs0QkFDSCxDQUFDOzRCQUVMLGFBQWEsRUFBRSxVQUFDLFFBQXNCLEVBQUUsT0FBYSxFQUFFLE1BQVksRUFBRSxLQUFVO2dDQUUxRCxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztnQ0FDcEMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0NBQ2xELE1BQU0sQ0FBQyxLQUFLLENBQUM7NEJBQ2YsQ0FBQzt5QkFDckIsQ0FBQyxDQUFDO29CQUNMLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sTUFBTSxJQUFJLEtBQUssQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO29CQUNyRSxDQUFDO2dCQUNILENBQUM7Z0JBbkZNLDBCQUFlLEdBQXRCLGNBQW9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQXFGeEYsNkJBQVEsR0FBUixVQUFTLEVBQWEsSUFBUyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOztnQkFDM0Qsb0NBQWUsR0FBZixVQUFnQixFQUFhLElBQVMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0JBQ3pFLDZCQUFRLEdBQVIsVUFBUyxFQUFhLElBQVMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0JBQzdELGlCQUFDO1lBQUQsQ0F6RkEsQUF5RkMsSUFBQTtZQXpGRCxtQ0F5RkMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29yZS96b25lL25nX3pvbmVfaW1wbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Z2xvYmFsfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG4vKipcbiAqIFN0b3JlcyBlcnJvciBpbmZvcm1hdGlvbjsgZGVsaXZlcmVkIHZpYSBbTmdab25lLm9uRXJyb3JdIHN0cmVhbS5cbiAqL1xuZXhwb3J0IGNsYXNzIE5nWm9uZUVycm9yIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVycm9yOiBhbnksIHB1YmxpYyBzdGFja1RyYWNlOiBhbnkpIHt9XG59XG5cblxuZXhwb3J0IGNsYXNzIE5nWm9uZUltcGwge1xuICBzdGF0aWMgaXNJbkFuZ3VsYXJab25lKCk6IGJvb2xlYW4geyByZXR1cm4gWm9uZS5jdXJyZW50LmdldCgnaXNBbmd1bGFyWm9uZScpID09PSB0cnVlOyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIG91dGVyOiBab25lO1xuICAvKiogQGludGVybmFsICovXG4gIHByaXZhdGUgaW5uZXI6IFpvbmU7XG5cbiAgcHJpdmF0ZSBvbkVudGVyOiAoKSA9PiB2b2lkO1xuICBwcml2YXRlIG9uTGVhdmU6ICgpID0+IHZvaWQ7XG4gIHByaXZhdGUgc2V0TWljcm90YXNrOiAoaGFzTWljcm90YXNrczogYm9vbGVhbikgPT4gdm9pZDtcbiAgcHJpdmF0ZSBzZXRNYWNyb3Rhc2s6IChoYXNNYWNyb3Rhc2tzOiBib29sZWFuKSA9PiB2b2lkO1xuICBwcml2YXRlIG9uRXJyb3I6IChlcnJvcjogTmdab25lRXJyb3IpID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3Ioe3RyYWNlLCBvbkVudGVyLCBvbkxlYXZlLCBzZXRNaWNyb3Rhc2ssIHNldE1hY3JvdGFzaywgb25FcnJvcn06IHtcbiAgICB0cmFjZTogYm9vbGVhbixcbiAgICBvbkVudGVyOiAoKSA9PiB2b2lkLFxuICAgIG9uTGVhdmU6ICgpID0+IHZvaWQsXG4gICAgc2V0TWljcm90YXNrOiAoaGFzTWljcm90YXNrczogYm9vbGVhbikgPT4gdm9pZCxcbiAgICBzZXRNYWNyb3Rhc2s6IChoYXNNYWNyb3Rhc2tzOiBib29sZWFuKSA9PiB2b2lkLFxuICAgIG9uRXJyb3I6IChlcnJvcjogTmdab25lRXJyb3IpID0+IHZvaWRcbiAgfSkge1xuICAgIHRoaXMub25FbnRlciA9IG9uRW50ZXI7XG4gICAgdGhpcy5vbkxlYXZlID0gb25MZWF2ZTtcbiAgICB0aGlzLnNldE1pY3JvdGFzayA9IHNldE1pY3JvdGFzaztcbiAgICB0aGlzLnNldE1hY3JvdGFzayA9IHNldE1hY3JvdGFzaztcbiAgICB0aGlzLm9uRXJyb3IgPSBvbkVycm9yO1xuXG4gICAgaWYgKFpvbmUpIHtcbiAgICAgIHRoaXMub3V0ZXIgPSB0aGlzLmlubmVyID0gWm9uZS5jdXJyZW50O1xuICAgICAgaWYgKFpvbmVbJ3d0ZlpvbmVTcGVjJ10pIHtcbiAgICAgICAgdGhpcy5pbm5lciA9IHRoaXMuaW5uZXIuZm9yayhab25lWyd3dGZab25lU3BlYyddKTtcbiAgICAgIH1cbiAgICAgIGlmICh0cmFjZSAmJiBab25lWydsb25nU3RhY2tUcmFjZVpvbmVTcGVjJ10pIHtcbiAgICAgICAgdGhpcy5pbm5lciA9IHRoaXMuaW5uZXIuZm9yayhab25lWydsb25nU3RhY2tUcmFjZVpvbmVTcGVjJ10pO1xuICAgICAgfVxuICAgICAgdGhpcy5pbm5lciA9IHRoaXMuaW5uZXIuZm9yayh7XG4gICAgICAgIG5hbWU6ICdhbmd1bGFyJyxcbiAgICAgICAgcHJvcGVydGllczo8YW55PnsnaXNBbmd1bGFyWm9uZSc6IHRydWV9LFxuICAgICAgICBvbkludm9rZVRhc2s6IChkZWxlZ2F0ZTogWm9uZURlbGVnYXRlLCBjdXJyZW50OiBab25lLCB0YXJnZXQ6IFpvbmUsIHRhc2s6IFRhc2ssXG4gICAgICAgICAgICAgICAgICAgICAgIGFwcGx5VGhpczogYW55LCBhcHBseUFyZ3M6IGFueSk6IGFueSA9PiB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMub25FbnRlcigpO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlLmludm9rZVRhc2sodGFyZ2V0LCB0YXNrLCBhcHBseVRoaXMsIGFwcGx5QXJncyk7XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMub25MZWF2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuXG4gICAgICAgIG9uSW52b2tlOiAoZGVsZWdhdGU6IFpvbmVEZWxlZ2F0ZSwgY3VycmVudDogWm9uZSwgdGFyZ2V0OiBab25lLCBjYWxsYmFjazogRnVuY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgYXBwbHlUaGlzOiBhbnksIGFwcGx5QXJnczogYW55W10sIHNvdXJjZTogc3RyaW5nKTogYW55ID0+IHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5vbkVudGVyKCk7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGUuaW52b2tlKHRhcmdldCwgY2FsbGJhY2ssIGFwcGx5VGhpcywgYXBwbHlBcmdzLCBzb3VyY2UpO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLm9uTGVhdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgb25IYXNUYXNrOlxuICAgICAgICAgICAgKGRlbGVnYXRlOiBab25lRGVsZWdhdGUsIGN1cnJlbnQ6IFpvbmUsIHRhcmdldDogWm9uZSwgaGFzVGFza1N0YXRlOiBIYXNUYXNrU3RhdGUpID0+IHtcbiAgICAgICAgICAgICAgZGVsZWdhdGUuaGFzVGFzayh0YXJnZXQsIGhhc1Rhc2tTdGF0ZSk7XG4gICAgICAgICAgICAgIGlmIChjdXJyZW50ID09IHRhcmdldCkge1xuICAgICAgICAgICAgICAgIC8vIFdlIGFyZSBvbmx5IGludGVyZXN0ZWQgaW4gaGFzVGFzayBldmVudHMgd2hpY2ggb3JpZ2luYXRlIGZyb20gb3VyIHpvbmVcbiAgICAgICAgICAgICAgICAvLyAoQSBjaGlsZCBoYXNUYXNrIGV2ZW50IGlzIG5vdCBpbnRlcmVzdGluZyB0byB1cylcbiAgICAgICAgICAgICAgICBpZiAoaGFzVGFza1N0YXRlLmNoYW5nZSA9PSAnbWljcm9UYXNrJykge1xuICAgICAgICAgICAgICAgICAgdGhpcy5zZXRNaWNyb3Rhc2soaGFzVGFza1N0YXRlLm1pY3JvVGFzayk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNUYXNrU3RhdGUuY2hhbmdlID09ICdtYWNyb1Rhc2snKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnNldE1hY3JvdGFzayhoYXNUYXNrU3RhdGUubWFjcm9UYXNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgb25IYW5kbGVFcnJvcjogKGRlbGVnYXRlOiBab25lRGVsZWdhdGUsIGN1cnJlbnQ6IFpvbmUsIHRhcmdldDogWm9uZSwgZXJyb3I6IGFueSk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBib29sZWFuID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZWdhdGUuaGFuZGxlRXJyb3IodGFyZ2V0LCBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25FcnJvcihuZXcgTmdab25lRXJyb3IoZXJyb3IsIGVycm9yLnN0YWNrKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FuZ3VsYXIyIG5lZWRzIHRvIGJlIHJ1biB3aXRoIFpvbmUuanMgcG9seWZpbGwuJyk7XG4gICAgfVxuICB9XG5cbiAgcnVuSW5uZXIoZm46ICgpID0+IGFueSk6IGFueSB7IHJldHVybiB0aGlzLmlubmVyLnJ1bihmbik7IH07XG4gIHJ1bklubmVyR3VhcmRlZChmbjogKCkgPT4gYW55KTogYW55IHsgcmV0dXJuIHRoaXMuaW5uZXIucnVuR3VhcmRlZChmbik7IH07XG4gIHJ1bk91dGVyKGZuOiAoKSA9PiBhbnkpOiBhbnkgeyByZXR1cm4gdGhpcy5vdXRlci5ydW4oZm4pOyB9O1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
