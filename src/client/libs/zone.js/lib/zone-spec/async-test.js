(function () {
    var AsyncTestZoneSpec = (function () {
        function AsyncTestZoneSpec(finishCallback, failCallback, namePrefix) {
            this._pendingMicroTasks = false;
            this._pendingMacroTasks = false;
            this._alreadyErrored = false;
            this.runZone = Zone.current;
            this._finishCallback = finishCallback;
            this._failCallback = failCallback;
            this.name = 'asyncTestZone for ' + namePrefix;
        }
        AsyncTestZoneSpec.prototype._finishCallbackIfDone = function () {
            var _this = this;
            if (!(this._pendingMicroTasks || this._pendingMacroTasks)) {
                // We do this because we would like to catch unhandled rejected promises.
                // To do this quickly when there are native promises, we must run using an unwrapped
                // promise implementation.
                var symbol = Zone.__symbol__;
                var NativePromise = window[symbol('Promise')];
                if (NativePromise) {
                    NativePromise.resolve(true)[symbol('then')](function () {
                        if (!_this._alreadyErrored) {
                            _this.runZone.run(_this._finishCallback);
                        }
                    });
                }
                else {
                    // For implementations which do not have nativePromise, use setTimeout(0). This is slower,
                    // but it also works because Zones will handle errors when rejected promises have no
                    // listeners after one macrotask.
                    this.runZone.run(function () {
                        setTimeout(function () {
                            if (!_this._alreadyErrored) {
                                _this._finishCallback();
                            }
                        }, 0);
                    });
                }
            }
        };
        // Note - we need to use onInvoke at the moment to call finish when a test is
        // fully synchronous. TODO(juliemr): remove this when the logic for
        // onHasTask changes and it calls whenever the task queues are dirty.
        AsyncTestZoneSpec.prototype.onInvoke = function (parentZoneDelegate, currentZone, targetZone, delegate, applyThis, applyArgs, source) {
            try {
                return parentZoneDelegate.invoke(targetZone, delegate, applyThis, applyArgs, source);
            }
            finally {
                this._finishCallbackIfDone();
            }
        };
        AsyncTestZoneSpec.prototype.onHandleError = function (parentZoneDelegate, currentZone, targetZone, error) {
            // Let the parent try to handle the error.
            var result = parentZoneDelegate.handleError(targetZone, error);
            if (result) {
                this._failCallback(error.message ? error.message : 'unknown error');
                this._alreadyErrored = true;
            }
            return false;
        };
        AsyncTestZoneSpec.prototype.onScheduleTask = function (delegate, currentZone, targetZone, task) {
            if (task.type == 'macroTask' && task.source == 'setInterval') {
                this._failCallback('Cannot use setInterval from within an async zone test.');
                return;
            }
            return delegate.scheduleTask(targetZone, task);
        };
        AsyncTestZoneSpec.prototype.onHasTask = function (delegate, current, target, hasTaskState) {
            delegate.hasTask(target, hasTaskState);
            if (hasTaskState.change == 'microTask') {
                this._pendingMicroTasks = hasTaskState.microTask;
                this._finishCallbackIfDone();
            }
            else if (hasTaskState.change == 'macroTask') {
                this._pendingMacroTasks = hasTaskState.macroTask;
                this._finishCallbackIfDone();
            }
        };
        return AsyncTestZoneSpec;
    }());
    // Export the class so that new instances can be created with proper
    // constructor params.
    Zone['AsyncTestZoneSpec'] = AsyncTestZoneSpec;
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvem9uZS5qcy9saWIvem9uZS1zcGVjL2FzeW5jLXRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQztJQUNDO1FBUUUsMkJBQVksY0FBd0IsRUFBRSxZQUFzQixFQUFFLFVBQWtCO1lBTGhGLHVCQUFrQixHQUFZLEtBQUssQ0FBQztZQUNwQyx1QkFBa0IsR0FBWSxLQUFLLENBQUM7WUFDcEMsb0JBQWUsR0FBWSxLQUFLLENBQUM7WUFDakMsWUFBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFHckIsSUFBSSxDQUFDLGVBQWUsR0FBRyxjQUFjLENBQUM7WUFDdEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUM7WUFDbEMsSUFBSSxDQUFDLElBQUksR0FBRyxvQkFBb0IsR0FBRyxVQUFVLENBQUM7UUFDaEQsQ0FBQztRQUVELGlEQUFxQixHQUFyQjtZQUFBLGlCQTBCQztZQXpCQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUQseUVBQXlFO2dCQUN6RSxvRkFBb0Y7Z0JBQ3BGLDBCQUEwQjtnQkFDMUIsSUFBSSxNQUFNLEdBQVMsSUFBSyxDQUFDLFVBQVUsQ0FBQztnQkFDcEMsSUFBSSxhQUFhLEdBQXdCLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDbkUsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztvQkFDbEIsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFDMUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQzs0QkFDMUIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLGVBQWUs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c0I7SUFDdEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsaUJBQWlCLENBQUM7QUFDaEQsQ0FBQyxDQUFDLEVBQUUsQ0FBQyIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL3pvbmUuanMvbGliL3pvbmUtc3BlYy9hc3luYy10ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBBc3luY1Rlc3Rab25lU3BlYyBpbXBsZW1lbnRzIFpvbmVTcGVjIHtcbiAgICBfZmluaXNoQ2FsbGJhY2s6IEZ1bmN0aW9uO1xuICAgIF9mYWlsQ2FsbGJhY2s6IEZ1bmN0aW9uO1xuICAgIF9wZW5kaW5nTWljcm9UYXNrczogYm9vbGVhbiA9IGZhbHNlO1xuICAgIF9wZW5kaW5nTWFjcm9UYXNrczogYm9vbGVhbiA9IGZhbHNlO1xuICAgIF9hbHJlYWR5RXJyb3JlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHJ1blpvbmUgPSBab25lLmN1cnJlbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihmaW5pc2hDYWxsYmFjazogRnVuY3Rpb24sIGZhaWxDYWxsYmFjazogRnVuY3Rpb24sIG5hbWVQcmVmaXg6IHN0cmluZykge1xuICAgICAgdGhpcy5fZmluaXNoQ2FsbGJhY2sgPSBmaW5pc2hDYWxsYmFjaztcbiAgICAgIHRoaXMuX2ZhaWxDYWxsYmFjayA9IGZhaWxDYWxsYmFjaztcbiAgICAgIHRoaXMubmFtZSA9ICdhc3luY1Rlc3Rab25lIGZvciAnICsgbmFtZVByZWZpeDtcbiAgICB9XG5cbiAgICBfZmluaXNoQ2FsbGJhY2tJZkRvbmUoKSB7XG4gICAgICBpZiAoISh0aGlzLl9wZW5kaW5nTWljcm9UYXNrcyB8fCB0aGlzLl9wZW5kaW5nTWFjcm9UYXNrcykpIHtcbiAgICAgICAgLy8gV2UgZG8gdGhpcyBiZWNhdXNlIHdlIHdvdWxkIGxpa2UgdG8gY2F0Y2ggdW5oYW5kbGVkIHJlamVjdGVkIHByb21pc2VzLlxuICAgICAgICAvLyBUbyBkbyB0aGlzIHF1aWNrbHkgd2hlbiB0aGVyZSBhcmUgbmF0aXZlIHByb21pc2VzLCB3ZSBtdXN0IHJ1biB1c2luZyBhbiB1bndyYXBwZWRcbiAgICAgICAgLy8gcHJvbWlzZSBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgdmFyIHN5bWJvbCA9ICg8YW55PlpvbmUpLl9fc3ltYm9sX187XG4gICAgICAgIHZhciBOYXRpdmVQcm9taXNlOiB0eXBlb2YgUHJvbWlzZSA9IDxhbnk+d2luZG93W3N5bWJvbCgnUHJvbWlzZScpXTtcbiAgICAgICAgaWYgKE5hdGl2ZVByb21pc2UpIHtcbiAgICAgICAgICBOYXRpdmVQcm9taXNlLnJlc29sdmUodHJ1ZSlbc3ltYm9sKCd0aGVuJyldKCgpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fYWxyZWFkeUVycm9yZWQpIHtcbiAgICAgICAgICAgICAgdGhpcy5ydW5ab25lLnJ1bih0aGlzLl9maW5pc2hDYWxsYmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gRm9yIGltcGxlbWVudGF0aW9ucyB3aGljaCBkbyBub3QgaGF2ZSBuYXRpdmVQcm9taXNlLCB1c2Ugc2V0VGltZW91dCgwKS4gVGhpcyBpcyBzbG93ZXIsXG4gICAgICAgICAgLy8gYnV0IGl0IGFsc28gd29ya3MgYmVjYXVzZSBab25lcyB3aWxsIGhhbmRsZSBlcnJvcnMgd2hlbiByZWplY3RlZCBwcm9taXNlcyBoYXZlIG5vXG4gICAgICAgICAgLy8gbGlzdGVuZXJzIGFmdGVyIG9uZSBtYWNyb3Rhc2suXG4gICAgICAgICAgdGhpcy5ydW5ab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCF0aGlzLl9hbHJlYWR5RXJyb3JlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZpbmlzaENhbGxiYWNrKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gWm9uZVNwZWMgaW1wbGVtZW50YXRpb24gYmVsb3cuXG5cbiAgICBuYW1lOiBzdHJpbmc7XG5cbiAgICAvLyBOb3RlIC0gd2UgbmVlZCB0byB1c2Ugb25JbnZva2UgYXQgdGhlIG1vbWVudCB0byBjYWxsIGZpbmlzaCB3aGVuIGEgdGVzdCBpc1xuICAgIC8vIGZ1bGx5IHN5bmNocm9ub3VzLiBUT0RPKGp1bGllbXIpOiByZW1vdmUgdGhpcyB3aGVuIHRoZSBsb2dpYyBmb3JcbiAgICAvLyBvbkhhc1Rhc2sgY2hhbmdlcyBhbmQgaXQgY2FsbHMgd2hlbmV2ZXIgdGhlIHRhc2sgcXVldWVzIGFyZSBkaXJ0eS5cbiAgICBvbkludm9rZShwYXJlbnRab25lRGVsZWdhdGU6IFpvbmVEZWxlZ2F0ZSwgY3VycmVudFpvbmU6IFpvbmUsIHRhcmdldFpvbmU6IFpvbmUsXG4gICAgICBkZWxlZ2F0ZTogRnVuY3Rpb24sIGFwcGx5VGhpczogYW55LCBhcHBseUFyZ3M6IGFueVtdLCBzb3VyY2U6IHN0cmluZyk6IGFueSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gcGFyZW50Wm9uZURlbGVnYXRlLmludm9rZSh0YXJnZXRab25lLCBkZWxlZ2F0ZSwgYXBwbHlUaGlzLCBhcHBseUFyZ3MsIHNvdXJjZSk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0aGlzLl9maW5pc2hDYWxsYmFja0lmRG9uZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIG9uSGFuZGxlRXJyb3IocGFyZW50Wm9uZURlbGVnYXRlOiBab25lRGVsZWdhdGUsIGN1cnJlbnRab25lOiBab25lLCB0YXJnZXRab25lOiBab25lLFxuICAgICAgZXJyb3I6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgLy8gTGV0IHRoZSBwYXJlbnQgdHJ5IHRvIGhhbmRsZSB0aGUgZXJyb3IuXG4gICAgICB2YXIgcmVzdWx0ID0gcGFyZW50Wm9uZURlbGVnYXRlLmhhbmRsZUVycm9yKHRhcmdldFpvbmUsIGVycm9yKTtcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgdGhpcy5fZmFpbENhbGxiYWNrKGVycm9yLm1lc3NhZ2UgPyBlcnJvci5tZXNzYWdlIDogJ3Vua25vd24gZXJyb3InKTtcbiAgICAgICAgdGhpcy5fYWxyZWFkeUVycm9yZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIG9uU2NoZWR1bGVUYXNrKGRlbGVnYXRlOiBab25lRGVsZWdhdGUsIGN1cnJlbnRab25lOiBab25lLCB0YXJnZXRab25lOiBab25lLCB0YXNrOiBUYXNrKTogVGFzayB7XG4gICAgICBpZiAodGFzay50eXBlID09ICdtYWNyb1Rhc2snICYmIHRhc2suc291cmNlID09ICdzZXRJbnRlcnZhbCcpIHtcbiAgICAgICAgdGhpcy5fZmFpbENhbGxiYWNrKCdDYW5ub3QgdXNlIHNldEludGVydmFsIGZyb20gd2l0aGluIGFuIGFzeW5jIHpvbmUgdGVzdC4nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGVsZWdhdGUuc2NoZWR1bGVUYXNrKHRhcmdldFpvbmUsIHRhc2spO1xuICAgIH1cblxuICAgIG9uSGFzVGFzayhkZWxlZ2F0ZTogWm9uZURlbGVnYXRlLCBjdXJyZW50OiBab25lLCB0YXJnZXQ6IFpvbmUsIGhhc1Rhc2tTdGF0ZTogSGFzVGFza1N0YXRlKSB7XG4gICAgICBkZWxlZ2F0ZS5oYXNUYXNrKHRhcmdldCwgaGFzVGFza1N0YXRlKTtcblxuICAgICAgaWYgKGhhc1Rhc2tTdGF0ZS5jaGFuZ2UgPT0gJ21pY3JvVGFzaycpIHtcbiAgICAgICAgdGhpcy5fcGVuZGluZ01pY3JvVGFza3MgPSBoYXNUYXNrU3RhdGUubWljcm9UYXNrO1xuICAgICAgICB0aGlzLl9maW5pc2hDYWxsYmFja0lmRG9uZSgpO1xuICAgICAgfSBlbHNlIGlmIChoYXNUYXNrU3RhdGUuY2hhbmdlID09ICdtYWNyb1Rhc2snKSB7XG4gICAgICAgIHRoaXMuX3BlbmRpbmdNYWNyb1Rhc2tzID0gaGFzVGFza1N0YXRlLm1hY3JvVGFzaztcbiAgICAgICAgdGhpcy5fZmluaXNoQ2FsbGJhY2tJZkRvbmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBFeHBvcnQgdGhlIGNsYXNzIHNvIHRoYXQgbmV3IGluc3RhbmNlcyBjYW4gYmUgY3JlYXRlZCB3aXRoIHByb3BlclxuICAvLyBjb25zdHJ1Y3RvciBwYXJhbXMuXG4gIFpvbmVbJ0FzeW5jVGVzdFpvbmVTcGVjJ10gPSBBc3luY1Rlc3Rab25lU3BlYztcbn0pKCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
