(function (global) {
    ;
    ;
    // Detect and setup WTF.
    var wtfTrace = null;
    var wtfEvents = null;
    var wtfEnabled = (function () {
        var wtf = global['wtf'];
        if (wtf) {
            wtfTrace = wtf.trace;
            if (wtfTrace) {
                wtfEvents = wtfTrace.events;
                return true;
            }
        }
        return false;
    })();
    var WtfZoneSpec = (function () {
        function WtfZoneSpec() {
            this.name = 'WTF';
        }
        WtfZoneSpec.prototype.onFork = function (parentZoneDelegate, currentZone, targetZone, zoneSpec) {
            var retValue = parentZoneDelegate.fork(targetZone, zoneSpec);
            WtfZoneSpec.forkInstance(zonePathName(targetZone), retValue.name);
            return retValue;
        };
        WtfZoneSpec.prototype.onInvoke = function (parentZoneDelegate, currentZone, targetZone, delegate, applyThis, applyArgs, source) {
            var scope = WtfZoneSpec.invokeScope[source];
            if (!scope) {
                scope = WtfZoneSpec.invokeScope[source]
                    = wtfEvents.createScope("Zone:invoke:" + source + "(ascii zone)");
            }
            return wtfTrace.leaveScope(scope(zonePathName(targetZone)), parentZoneDelegate.invoke(targetZone, delegate, applyThis, applyArgs, source));
        };
        WtfZoneSpec.prototype.onHandleError = function (parentZoneDelegate, currentZone, targetZone, error) {
            return parentZoneDelegate.handleError(targetZone, error);
        };
        WtfZoneSpec.prototype.onScheduleTask = function (parentZoneDelegate, currentZone, targetZone, task) {
            var key = task.type + ':' + task.source;
            var instance = WtfZoneSpec.scheduleInstance[key];
            if (!instance) {
                instance = WtfZoneSpec.scheduleInstance[key]
                    = wtfEvents.createInstance("Zone:schedule:" + key + "(ascii zone, any data)");
            }
            var retValue = parentZoneDelegate.scheduleTask(targetZone, task);
            instance(zonePathName(targetZone), shallowObj(task.data, 2));
            return retValue;
        };
        WtfZoneSpec.prototype.onInvokeTask = function (parentZoneDelegate, currentZone, targetZone, task, applyThis, applyArgs) {
            var source = task.source;
            var scope = WtfZoneSpec.invokeTaskScope[source];
            if (!scope) {
                scope = WtfZoneSpec.invokeTaskScope[source]
                    = wtfEvents.createScope("Zone:invokeTask:" + source + "(ascii zone)");
            }
            return wtfTrace.leaveScope(scope(zonePathName(targetZone)), parentZoneDelegate.invokeTask(targetZone, task, applyThis, applyArgs));
        };
        WtfZoneSpec.prototype.onCancelTask = function (parentZoneDelegate, currentZone, targetZone, task) {
            var key = task.source;
            var instance = WtfZoneSpec.cancelInstance[key];
            if (!instance) {
                instance = WtfZoneSpec.cancelInstance[key]
                    = wtfEvents.createInstance("Zone:cancel:" + key + "(ascii zone, any options)");
            }
            var retValue = parentZoneDelegate.cancelTask(targetZone, task);
            instance(zonePathName(targetZone), shallowObj(task.data, 2));
            return retValue;
        };
        ;
        WtfZoneSpec.forkInstance = wtfEnabled && wtfEvents.createInstance('Zone:fork(ascii zone, ascii newZone)');
        WtfZoneSpec.scheduleInstance = {};
        WtfZoneSpec.cancelInstance = {};
        WtfZoneSpec.invokeScope = {};
        WtfZoneSpec.invokeTaskScope = {};
        return WtfZoneSpec;
    }());
    function shallowObj(obj, depth) {
        if (!depth)
            return null;
        var out = {};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var value = obj[key];
                switch (typeof value) {
                    case 'object':
                        var name = value && value.constructor && value.constructor.name;
                        value = name == Object.name ? shallowObj(value, depth - 1) : name;
                        break;
                    case 'function':
                        value = value.name || undefined;
                        break;
                }
                out[key] = value;
            }
        }
        return out;
    }
    function zonePathName(zone) {
        var name = zone.name;
        zone = zone.parent;
        while (zone != null) {
            name = zone.name + '::' + name;
            zone = zone.parent;
        }
        return name;
    }
    Zone['wtfZoneSpec'] = !wtfEnabled ? null : new WtfZoneSpec();
})(typeof window == 'undefined' ? global : window);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvem9uZS5qcy9saWIvem9uZS1zcGVjL3d0Zi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxDQUFDLFVBQVMsTUFBTTtJQUVPLENBQUM7SUFDRCxDQUFDO0lBZXRCLHdCQUF3QjtJQUN4QixJQUFJLFFBQVEsR0FBYSxJQUFJLENBQUM7SUFDOUIsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDO0lBQ2hDLElBQUksVUFBVSxHQUFZLENBQUM7UUFDekIsSUFBSSxHQUFHLEdBQVEsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDUixRQUFRLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUNyQixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNiLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO2dCQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2QsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUVMO1FBQUE7WUFDRSxTQUFJLEdBQVcsS0FBSyxDQUFDO1FBdUV2QixDQUFDO1FBL0RDLDRCQUFNLEdBQU4sVUFBTyxrQkFBZ0MsRUFBRSxXQUFpQixFQUFFLFVBQWdCLEVBQ3JFLFFBQWtCO1lBQ3ZCLElBQUksUUFBUSxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDN0QsV0FBVyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xFLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDbEIsQ0FBQztRQUVELDhCQUFRLEdBQVIsVUFBUyxrQkFBZ0MsRUFBRSxXQUFpQixFQUFFLFVBQWdCLEVBQ3JFLFFBQWtCLEVBQUUsU0FBYyxF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SUFBVSxLQUFLLENBQUMsV0FBWSxDQUFDLElBQUksQ0FBQzt3QkFDdkUsS0FBSyxHQUFHLElBQUksSUFBVSxNQUFPLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQzt3QkFDekUsS0FBSyxDQUFDO29CQUNSLEtBQUssVUFBVTt3QkFDYixLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUM7d0JBQ2hDLEtBQUssQ0FBQztnQkFDVixDQUFDO2dCQUNELEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDbkIsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVELHNCQUFzQixJQUFVO1FBQzlCLElBQUksSUFBSSxHQUFXLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDN0IsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDbkIsT0FBTSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7WUFDbkIsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQztZQUMvQixJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7QUFDL0QsQ0FBQyxDQUFDLENBQUMsT0FBTyxNQUFNLElBQUksV0FBVyxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL3pvbmUuanMvbGliL3pvbmUtc3BlYy93dGYuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oZ2xvYmFsKSB7XG4gIGludGVyZmFjZSBXdGYgeyB0cmFjZTogV3RmVHJhY2U7IH1cbiAgaW50ZXJmYWNlIFd0ZlNjb3BlIHt9O1xuICBpbnRlcmZhY2UgV3RmUmFuZ2Uge307XG4gIGludGVyZmFjZSBXdGZUcmFjZSB7XG4gICAgZXZlbnRzOiBXdGZFdmVudHM7XG4gICAgbGVhdmVTY29wZShzY29wZTogV3RmU2NvcGUsIHJldHVyblZhbHVlPzogYW55KTogdm9pZDtcbiAgICBiZWdpblRpbWVSYW5nZShyYW5nZVR5cGU6IHN0cmluZywgYWN0aW9uOiBzdHJpbmcpOiBXdGZSYW5nZTtcbiAgICBlbmRUaW1lUmFuZ2UocmFuZ2U6IFd0ZlJhbmdlKTogdm9pZDtcbiAgfVxuICBpbnRlcmZhY2UgV3RmRXZlbnRzIHtcbiAgICBjcmVhdGVTY29wZShzaWduYXR1cmU6IHN0cmluZywgZmxhZ3M/OiBhbnkpOiBXdGZTY29wZUZuO1xuICAgIGNyZWF0ZUluc3RhbmNlKHNpZ25hdHVyZTogc3RyaW5nLCBmbGFncz86IGFueSk6IFd0ZkV2ZW50Rm47XG4gIH1cblxuICB0eXBlIFd0ZlNjb3BlRm4gPSAoLi4uYXJncykgPT4gV3RmU2NvcGU7XG4gIHR5cGUgV3RmRXZlbnRGbiA9ICguLi5hcmdzKSA9PiBhbnk7XG5cbiAgLy8gRGV0ZWN0IGFuZCBzZXR1cCBXVEYuXG4gIHZhciB3dGZUcmFjZTogV3RmVHJhY2UgPSBudWxsO1xuICB2YXIgd3RmRXZlbnRzOiBXdGZFdmVudHMgPSBudWxsO1xuICB2YXIgd3RmRW5hYmxlZDogYm9vbGVhbiA9IChmdW5jdGlvbiAoKTogYm9vbGVhbiB7XG4gICAgdmFyIHd0ZjogV3RmID0gZ2xvYmFsWyd3dGYnXTtcbiAgICBpZiAod3RmKSB7XG4gICAgICB3dGZUcmFjZSA9IHd0Zi50cmFjZTtcbiAgICAgIGlmICh3dGZUcmFjZSkge1xuICAgICAgICB3dGZFdmVudHMgPSB3dGZUcmFjZS5ldmVudHM7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pKCk7XG5cbiAgY2xhc3MgV3RmWm9uZVNwZWMgaW1wbGVtZW50cyBab25lU3BlYyB7XG4gICAgbmFtZTogc3RyaW5nID0gJ1dURic7XG5cbiAgICBzdGF0aWMgZm9ya0luc3RhbmNlID0gd3RmRW5hYmxlZCAmJiB3dGZFdmVudHMuY3JlYXRlSW5zdGFuY2UoJ1pvbmU6Zm9yayhhc2NpaSB6b25lLCBhc2NpaSBuZXdab25lKScpO1xuICAgIHN0YXRpYyBzY2hlZHVsZUluc3RhbmNlOiB7W2tleTogc3RyaW5nXTogV3RmRXZlbnRGbn0gPSB7fTtcbiAgICBzdGF0aWMgY2FuY2VsSW5zdGFuY2U6IHtba2V5OiBzdHJpbmddOiBXdGZFdmVudEZufSA9IHt9O1xuICAgIHN0YXRpYyBpbnZva2VTY29wZToge1trZXk6IHN0cmluZ106IFd0ZkV2ZW50Rm59ID0ge307XG4gICAgc3RhdGljIGludm9rZVRhc2tTY29wZToge1trZXk6IHN0cmluZ106IFd0ZkV2ZW50Rm59ID0ge307XG5cbiAgICBvbkZvcmsocGFyZW50Wm9uZURlbGVnYXRlOiBab25lRGVsZWdhdGUsIGN1cnJlbnRab25lOiBab25lLCB0YXJnZXRab25lOiBab25lLFxuICAgICAgICAgICB6b25lU3BlYzogWm9uZVNwZWMpOiBab25lIHtcbiAgICAgIHZhciByZXRWYWx1ZSA9IHBhcmVudFpvbmVEZWxlZ2F0ZS5mb3JrKHRhcmdldFpvbmUsIHpvbmVTcGVjKTtcbiAgICAgIFd0ZlpvbmVTcGVjLmZvcmtJbnN0YW5jZSh6b25lUGF0aE5hbWUodGFyZ2V0Wm9uZSksIHJldFZhbHVlLm5hbWUpO1xuICAgICAgcmV0dXJuIHJldFZhbHVlO1xuICAgIH1cblxuICAgIG9uSW52b2tlKHBhcmVudFpvbmVEZWxlZ2F0ZTogWm9uZURlbGVnYXRlLCBjdXJyZW50Wm9uZTogWm9uZSwgdGFyZ2V0Wm9uZTogWm9uZSxcbiAgICAgICAgICAgICBkZWxlZ2F0ZTogRnVuY3Rpb24sIGFwcGx5VGhpczogYW55LCBhcHBseUFyZ3M6IGFueVtdLCBzb3VyY2U6IHN0cmluZyk6IGFueSB7XG4gICAgICB2YXIgc2NvcGUgPSBXdGZab25lU3BlYy5pbnZva2VTY29wZVtzb3VyY2VdO1xuICAgICAgaWYgKCFzY29wZSkge1xuICAgICAgICBzY29wZSA9IFd0ZlpvbmVTcGVjLmludm9rZVNjb3BlW3NvdXJjZV1cbiAgICAgICAgICAgID0gd3RmRXZlbnRzLmNyZWF0ZVNjb3BlKGBab25lOmludm9rZToke3NvdXJjZX0oYXNjaWkgem9uZSlgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB3dGZUcmFjZS5sZWF2ZVNjb3BlKHNjb3BlKHpvbmVQYXRoTmFtZSh0YXJnZXRab25lKSksXG4gICAgICAgICAgcGFyZW50Wm9uZURlbGVnYXRlLmludm9rZSh0YXJnZXRab25lLCBkZWxlZ2F0ZSwgYXBwbHlUaGlzLCBhcHBseUFyZ3MsIHNvdXJjZSkpO1xuICAgIH1cblxuXG4gICAgb25IYW5kbGVFcnJvcihwYXJlbnRab25lRGVsZWdhdGU6IFpvbmVEZWxlZ2F0ZSwgY3VycmVudFpvbmU6IFpvbmUsIHRhcmdldFpvbmU6IFpvbmUsXG4gICAgICAgICAgICAgICAgICBlcnJvcjogYW55KTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gcGFyZW50Wm9uZURlbGVnYXRlLmhhbmRsZUVycm9yKHRhcmdldFpvbmUsIGVycm9yKTtcbiAgICB9XG5cbiAgICBvblNjaGVkdWxlVGFzayhwYXJlbnRab25lRGVsZWdhdGU6IFpvbmVEZWxlZ2F0ZSwgY3VycmVudFpvbmU6IFpvbmUsIHRhcmdldFpvbmU6IFpvbmUsXG4gICAgICAgICAgICAgICAgICAgdGFzazogVGFzayk6IGFueSB7XG4gICAgICB2YXIga2V5ID0gdGFzay50eXBlICsgJzonICsgdGFzay5zb3VyY2U7XG4gICAgICB2YXIgaW5zdGFuY2UgPSBXdGZab25lU3BlYy5zY2hlZHVsZUluc3RhbmNlW2tleV07XG4gICAgICBpZiAoIWluc3RhbmNlKSB7XG4gICAgICAgIGluc3RhbmNlID0gV3RmWm9uZVNwZWMuc2NoZWR1bGVJbnN0YW5jZVtrZXldXG4gICAgICAgICAgICA9IHd0ZkV2ZW50cy5jcmVhdGVJbnN0YW5jZShgWm9uZTpzY2hlZHVsZToke2tleX0oYXNjaWkgem9uZSwgYW55IGRhdGEpYCk7XG4gICAgICB9XG4gICAgICB2YXIgcmV0VmFsdWUgPSBwYXJlbnRab25lRGVsZWdhdGUuc2NoZWR1bGVUYXNrKHRhcmdldFpvbmUsIHRhc2spO1xuICAgICAgaW5zdGFuY2Uoem9uZVBhdGhOYW1lKHRhcmdldFpvbmUpLCBzaGFsbG93T2JqKHRhc2suZGF0YSwgMikpO1xuICAgICAgcmV0dXJuIHJldFZhbHVlO1xuICAgIH1cblxuXG4gICAgb25JbnZva2VUYXNrKHBhcmVudFpvbmVEZWxlZ2F0ZTogWm9uZURlbGVnYXRlLCBjdXJyZW50Wm9uZTogWm9uZSwgdGFyZ2V0Wm9uZTogWm9uZSxcbiAgICAgICAgICAgICAgICAgdGFzazogVGFzaywgYXBwbHlUaGlzOiBhbnksIGFwcGx5QXJnczogYW55W10pOiBhbnlcbiAgICB7XG4gICAgICB2YXIgc291cmNlID0gdGFzay5zb3VyY2U7XG4gICAgICB2YXIgc2NvcGUgPSBXdGZab25lU3BlYy5pbnZva2VUYXNrU2NvcGVbc291cmNlXTtcbiAgICAgIGlmICghc2NvcGUpIHtcbiAgICAgICAgc2NvcGUgPSBXdGZab25lU3BlYy5pbnZva2VUYXNrU2NvcGVbc291cmNlXVxuICAgICAgICAgICAgPSB3dGZFdmVudHMuY3JlYXRlU2NvcGUoYFpvbmU6aW52b2tlVGFzazoke3NvdXJjZX0oYXNjaWkgem9uZSlgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB3dGZUcmFjZS5sZWF2ZVNjb3BlKHNjb3BlKHpvbmVQYXRoTmFtZSh0YXJnZXRab25lKSksXG4gICAgICAgICAgcGFyZW50Wm9uZURlbGVnYXRlLmludm9rZVRhc2sodGFyZ2V0Wm9uZSwgdGFzaywgYXBwbHlUaGlzLCBhcHBseUFyZ3MpKTtcbiAgICB9XG5cbiAgICBvbkNhbmNlbFRhc2socGFyZW50Wm9uZURlbGVnYXRlOiBab25lRGVsZWdhdGUsIGN1cnJlbnRab25lOiBab25lLCB0YXJnZXRab25lOiBab25lLFxuICAgICAgICAgICAgICAgICB0YXNrOiBUYXNrKTogYW55IHtcbiAgICAgIHZhciBrZXkgPSB0YXNrLnNvdXJjZTtcbiAgICAgIHZhciBpbnN0YW5jZSA9IFd0ZlpvbmVTcGVjLmNhbmNlbEluc3RhbmNlW2tleV07XG4gICAgICBpZiAoIWluc3RhbmNlKSB7XG4gICAgICAgIGluc3RhbmNlID0gV3RmWm9uZVNwZWMuY2FuY2VsSW5zdGFuY2Vba2V5XVxuICAgICAgICAgICAgPSB3dGZFdmVudHMuY3JlYXRlSW5zdGFuY2UoYFpvbmU6Y2FuY2VsOiR7a2V5fShhc2NpaSB6b25lLCBhbnkgb3B0aW9ucylgKTtcbiAgICAgIH1cbiAgICAgIHZhciByZXRWYWx1ZSA9IHBhcmVudFpvbmVEZWxlZ2F0ZS5jYW5jZWxUYXNrKHRhcmdldFpvbmUsIHRhc2spO1xuICAgICAgaW5zdGFuY2Uoem9uZVBhdGhOYW1lKHRhcmdldFpvbmUpLCBzaGFsbG93T2JqKHRhc2suZGF0YSwgMikpO1xuICAgICAgcmV0dXJuIHJldFZhbHVlO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBzaGFsbG93T2JqKG9iajogYW55LCBkZXB0aDogbnVtYmVyKTogYW55IHtcbiAgICBpZiAoIWRlcHRoKSByZXR1cm4gbnVsbDtcbiAgICB2YXIgb3V0ID0ge307XG4gICAgZm9yKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gb2JqW2tleV07XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XG4gICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgIHZhciBuYW1lID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IgJiYgKDxhbnk+dmFsdWUuY29uc3RydWN0b3IpLm5hbWU7XG4gICAgICAgICAgICB2YWx1ZSA9IG5hbWUgPT0gKDxhbnk+T2JqZWN0KS5uYW1lID8gc2hhbGxvd09iaih2YWx1ZSwgZGVwdGggLSAxKSA6IG5hbWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLm5hbWUgfHwgdW5kZWZpbmVkO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgb3V0W2tleV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHpvbmVQYXRoTmFtZSh6b25lOiBab25lKSB7XG4gICAgdmFyIG5hbWU6IHN0cmluZyA9IHpvbmUubmFtZTtcbiAgICB6b25lID0gem9uZS5wYXJlbnQ7XG4gICAgd2hpbGUoem9uZSAhPSBudWxsKSB7XG4gICAgICBuYW1lID0gem9uZS5uYW1lICsgJzo6JyArIG5hbWU7XG4gICAgICB6b25lID0gem9uZS5wYXJlbnQ7XG4gICAgfVxuICAgIHJldHVybiBuYW1lO1xuICB9XG5cbiAgWm9uZVsnd3RmWm9uZVNwZWMnXSA9ICF3dGZFbmFibGVkID8gbnVsbCA6IG5ldyBXdGZab25lU3BlYygpO1xufSkodHlwZW9mIHdpbmRvdyA9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHdpbmRvdyk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
