System.register(['../zone', './event-target', './define-property', './register-element', './property-descriptor', "./utils"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var event_target_1, define_property_1, register_element_1, property_descriptor_1, utils_1;
    var set, clear, blockingMethods, _global, i, name;
    function patchTimer(window, setName, cancelName, nameSuffix) {
        setName += nameSuffix;
        cancelName += nameSuffix;
        function scheduleTask(task) {
            var data = task.data;
            data.args[0] = task.invoke;
            data.handleId = setNative.apply(window, data.args);
            return task;
        }
        function clearTask(task) {
            return clearNative(task.data.handleId);
        }
        var setNative = utils_1.patchMethod(window, setName, function (delegate) { return function (self, args) {
            if (typeof args[0] === 'function') {
                var zone = Zone.current;
                var options = {
                    handleId: null,
                    isPeriodic: nameSuffix == 'Interval',
                    delay: (nameSuffix == 'Timeout' || nameSuffix == 'Interval') ? args[1] || 0 : null,
                    args: args
                };
                return zone.scheduleMacroTask(setName, args[0], options, scheduleTask, clearTask);
            }
            else {
                // cause an error by calling it directly.
                return delegate.apply(window, args);
            }
        }; });
        var clearNative = utils_1.patchMethod(window, cancelName, function (delegate) { return function (self, args) {
            var task = args[0];
            if (task && typeof task.type == 'string') {
                if (task.cancelFn) {
                    // Do not cancel already canceled functions
                    task.zone.cancelTask(task);
                }
            }
            else {
                // cause an error by calling it directly.
                delegate.apply(window, args);
            }
        }; });
    }
    return {
        setters:[
            function (_1) {},
            function (event_target_1_1) {
                event_target_1 = event_target_1_1;
            },
            function (define_property_1_1) {
                define_property_1 = define_property_1_1;
            },
            function (register_element_1_1) {
                register_element_1 = register_element_1_1;
            },
            function (property_descriptor_1_1) {
                property_descriptor_1 = property_descriptor_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }],
        execute: function() {
            set = 'set';
            clear = 'clear';
            blockingMethods = ['alert', 'prompt', 'confirm'];
            _global = typeof window == 'undefined' ? global : window;
            patchTimer(_global, set, clear, 'Timeout');
            patchTimer(_global, set, clear, 'Interval');
            patchTimer(_global, set, clear, 'Immediate');
            patchTimer(_global, 'request', 'cancelMacroTask', 'AnimationFrame');
            patchTimer(_global, 'mozRequest', 'mozCancel', 'AnimationFrame');
            patchTimer(_global, 'webkitRequest', 'webkitCancel', 'AnimationFrame');
            for (i = 0; i < blockingMethods.length; i++) {
                name = blockingMethods[i];
                utils_1.patchMethod(_global, name, function (delegate, symbol, name) {
                    return function (s, args) {
                        return Zone.current.run(delegate, _global, args, name);
                    };
                });
            }
            event_target_1.eventTargetPatch(_global);
            property_descriptor_1.propertyDescriptorPatch(_global);
            utils_1.patchClass('MutationObserver');
            utils_1.patchClass('WebKitMutationObserver');
            utils_1.patchClass('FileReader');
            define_property_1.propertyPatch();
            register_element_1.registerElementPatch(_global);
            /// GEO_LOCATION
            if (_global['navigator'] && _global['navigator'].geolocation) {
                utils_1.patchPrototype(_global['navigator'].geolocation, [
                    'getCurrentPosition',
                    'watchPosition'
                ]);
            }
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvem9uZS5qcy9saWIvYnJvd3Nlci9icm93c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFPTSxHQUFHLEVBQ0gsS0FBSyxFQUNMLGVBQWUsRUFDZixPQUFPLEVBU0osQ0FBQyxFQUNKLElBQUk7SUE2QlYsb0JBQ0ksTUFBVyxFQUNYLE9BQWUsRUFDZixVQUFrQixFQUNsQixVQUFrQjtRQUVwQixPQUFPLElBQUksVUFBVSxDQUFDO1FBQ3RCLFVBQVUsSUFBSSxVQUFVLENBQUM7UUFFekIsc0JBQXNCLElBQVU7WUFDOUIsSUFBSSxJQUFJLEdBQWlCLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25ELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBRUQsbUJBQW1CLElBQVU7WUFDM0IsTUFBTSxDQUFDLFdBQVcsQ0FBZ0IsSUFBSSxDQUFDLElBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6RCxDQUFDO1FBRUQsSUFBSSxTQUFTLEdBQUcsbUJBQVcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFVBQUMsUUFBa0IsSUFBSyxPQUFBLFVBQVMsSUFBUyxFQUFFLElBQVc7WUFDbEcsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDeEIsSUFBSSxPQUFPLEdBQWdCO29CQUN6QixRQUFRLEVBQUUsSUFBSTtvQkFDZCxVQUFVLEVBQUUsVUFBVSxJQUFJLFVBQVU7b0JBQ3BDLEtBQUssRUFBRSxDQUFDLFVB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QUFDO1lBRUQsK0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDMUIsNkNBQXVCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakMsa0JBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQy9CLGtCQUFVLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUNyQyxrQkFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3pCLCtCQUFhLEVBQUUsQ0FBQztZQUNoQix1Q0FBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUU5QixnQkFBZ0I7WUFDaEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUM3RCxzQkFBYyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxXQUFXLEVBQUU7b0JBQy9DLG9CQUFvQjtvQkFDcEIsZUFBZTtpQkFDaEIsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL3pvbmUuanMvbGliL2Jyb3dzZXIvYnJvd3Nlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vem9uZSc7XG5pbXBvcnQge2V2ZW50VGFyZ2V0UGF0Y2h9IGZyb20gJy4vZXZlbnQtdGFyZ2V0JztcbmltcG9ydCB7cHJvcGVydHlQYXRjaH0gZnJvbSAnLi9kZWZpbmUtcHJvcGVydHknO1xuaW1wb3J0IHtyZWdpc3RlckVsZW1lbnRQYXRjaH0gZnJvbSAnLi9yZWdpc3Rlci1lbGVtZW50JztcbmltcG9ydCB7cHJvcGVydHlEZXNjcmlwdG9yUGF0Y2h9IGZyb20gJy4vcHJvcGVydHktZGVzY3JpcHRvcic7XG5pbXBvcnQge3BhdGNoTWV0aG9kLCBwYXRjaFByb3RvdHlwZSwgcGF0Y2hDbGFzc30gZnJvbSBcIi4vdXRpbHNcIjtcblxuY29uc3Qgc2V0ID0gJ3NldCc7XG5jb25zdCBjbGVhciA9ICdjbGVhcic7XG5jb25zdCBibG9ja2luZ01ldGhvZHMgPSBbJ2FsZXJ0JywgJ3Byb21wdCcsICdjb25maXJtJ107XG5jb25zdCBfZ2xvYmFsID0gdHlwZW9mIHdpbmRvdyA9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHdpbmRvdztcblxucGF0Y2hUaW1lcihfZ2xvYmFsLCBzZXQsIGNsZWFyLCAnVGltZW91dCcpO1xucGF0Y2hUaW1lcihfZ2xvYmFsLCBzZXQsIGNsZWFyLCAnSW50ZXJ2YWwnKTtcbnBhdGNoVGltZXIoX2dsb2JhbCwgc2V0LCBjbGVhciwgJ0ltbWVkaWF0ZScpO1xucGF0Y2hUaW1lcihfZ2xvYmFsLCAncmVxdWVzdCcsICdjYW5jZWxNYWNyb1Rhc2snLCAnQW5pbWF0aW9uRnJhbWUnKTtcbnBhdGNoVGltZXIoX2dsb2JhbCwgJ21velJlcXVlc3QnLCAnbW96Q2FuY2VsJywgJ0FuaW1hdGlvbkZyYW1lJyk7XG5wYXRjaFRpbWVyKF9nbG9iYWwsICd3ZWJraXRSZXF1ZXN0JywgJ3dlYmtpdENhbmNlbCcsICdBbmltYXRpb25GcmFtZScpXG5cbmZvciAodmFyIGkgPSAwOyBpIDwgYmxvY2tpbmdNZXRob2RzLmxlbmd0aDsgaSsrKSB7XG4gIHZhciBuYW1lID0gYmxvY2tpbmdNZXRob2RzW2ldO1xuICBwYXRjaE1ldGhvZChfZ2xvYmFsLCBuYW1lLCAoZGVsZWdhdGUsIHN5bWJvbCwgbmFtZSkgPT4ge1xuICAgIHJldHVybiBmdW5jdGlvbiAoczphbnksIGFyZ3M6IGFueVtdKSB7XG4gICAgICByZXR1cm4gWm9uZS5jdXJyZW50LnJ1bihkZWxlZ2F0ZSwgX2dsb2JhbCwgYXJncywgbmFtZSlcbiAgICB9XG4gIH0pO1xufVxuXG5ldmVudFRhcmdldFBhdGNoKF9nbG9iYWwpO1xucHJvcGVydHlEZXNjcmlwdG9yUGF0Y2goX2dsb2JhbCk7XG5wYXRjaENsYXNzKCdNdXRhdGlvbk9ic2VydmVyJyk7XG5wYXRjaENsYXNzKCdXZWJLaXRNdXRhdGlvbk9ic2VydmVyJyk7XG5wYXRjaENsYXNzKCdGaWxlUmVhZGVyJyk7XG5wcm9wZXJ0eVBhdGNoKCk7XG5yZWdpc3RlckVsZW1lbnRQYXRjaChfZ2xvYmFsKTtcblxuLy8vIEdFT19MT0NBVElPTlxuaWYgKF9nbG9iYWxbJ25hdmlnYXRvciddICYmIF9nbG9iYWxbJ25hdmlnYXRvciddLmdlb2xvY2F0aW9uKSB7XG4gIHBhdGNoUHJvdG90eXBlKF9nbG9iYWxbJ25hdmlnYXRvciddLmdlb2xvY2F0aW9uLCBbXG4gICAgJ2dldEN1cnJlbnRQb3NpdGlvbicsXG4gICAgJ3dhdGNoUG9zaXRpb24nXG4gIF0pO1xufVxuXG5pbnRlcmZhY2UgVGltZXJPcHRpb25zIGV4dGVuZHMgVGFza0RhdGEge1xuICBoYW5kbGVJZDogbnVtYmVyLFxuICBhcmdzOiBhbnlbXVxufVxuXG5mdW5jdGlvbiBwYXRjaFRpbWVyKFxuICAgIHdpbmRvdzogYW55LFxuICAgIHNldE5hbWU6IHN0cmluZyxcbiAgICBjYW5jZWxOYW1lOiBzdHJpbmcsXG4gICAgbmFtZVN1ZmZpeDogc3RyaW5nKVxue1xuICBzZXROYW1lICs9IG5hbWVTdWZmaXg7XG4gIGNhbmNlbE5hbWUgKz0gbmFtZVN1ZmZpeDtcblxuICBmdW5jdGlvbiBzY2hlZHVsZVRhc2sodGFzazogVGFzaykge1xuICAgIHZhciBkYXRhID0gPFRpbWVyT3B0aW9ucz50YXNrLmRhdGE7XG4gICAgZGF0YS5hcmdzWzBdID0gdGFzay5pbnZva2U7XG4gICAgZGF0YS5oYW5kbGVJZCA9IHNldE5hdGl2ZS5hcHBseSh3aW5kb3csIGRhdGEuYXJncyk7XG4gICAgcmV0dXJuIHRhc2s7XG4gIH1cblxuICBmdW5jdGlvbiBjbGVhclRhc2sodGFzazogVGFzaykge1xuICAgIHJldHVybiBjbGVhck5hdGl2ZSgoPFRpbWVyT3B0aW9ucz50YXNrLmRhdGEpLmhhbmRsZUlkKTtcbiAgfVxuXG4gIHZhciBzZXROYXRpdmUgPSBwYXRjaE1ldGhvZCh3aW5kb3csIHNldE5hbWUsIChkZWxlZ2F0ZTogRnVuY3Rpb24pID0+IGZ1bmN0aW9uKHNlbGY6IGFueSwgYXJnczogYW55W10pIHtcbiAgICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhciB6b25lID0gWm9uZS5jdXJyZW50O1xuICAgICAgdmFyIG9wdGlvbnM6VGltZXJPcHRpb25zID0ge1xuICAgICAgICBoYW5kbGVJZDogbnVsbCxcbiAgICAgICAgaXNQZXJpb2RpYzogbmFtZVN1ZmZpeCA9PSAnSW50ZXJ2YWwnLFxuICAgICAgICBkZWxheTogKG5hbWVTdWZmaXggPT0gJ1RpbWVvdXQnIHx8IG5hbWVTdWZmaXggPT0gJ0ludGVydmFsJykgPyBhcmdzWzFdIHx8IDAgOiBudWxsLFxuICAgICAgICBhcmdzOiBhcmdzXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHpvbmUuc2NoZWR1bGVNYWNyb1Rhc2soc2V0TmFtZSwgYXJnc1swXSwgb3B0aW9ucywgc2NoZWR1bGVUYXNrLCBjbGVhclRhc2spO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjYXVzZSBhbiBlcnJvciBieSBjYWxsaW5nIGl0IGRpcmVjdGx5LlxuICAgICAgcmV0dXJuIGRlbGVnYXRlLmFwcGx5KHdpbmRvdywgYXJncyk7XG4gICAgfVxuICB9KTtcblxuICB2YXIgY2xlYXJOYXRpdmUgPSBwYXRjaE1ldGhvZCh3aW5kb3csIGNhbmNlbE5hbWUsIChkZWxlZ2F0ZTogRnVuY3Rpb24pID0+IGZ1bmN0aW9uKHNlbGY6IGFueSwgYXJnczogYW55W10pIHtcbiAgICB2YXIgdGFzazogVGFzayA9IGFyZ3NbMF07XG4gICAgaWYgKHRhc2sgJiYgdHlwZW9mIHRhc2sudHlwZSA9PSAnc3RyaW5nJykge1xuICAgICAgaWYgKHRhc2suY2FuY2VsRm4pIHtcbiAgICAgICAgLy8gRG8gbm90IGNhbmNlbCBhbHJlYWR5IGNhbmNlbGVkIGZ1bmN0aW9uc1xuICAgICAgICB0YXNrLnpvbmUuY2FuY2VsVGFzayh0YXNrKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY2F1c2UgYW4gZXJyb3IgYnkgY2FsbGluZyBpdCBkaXJlY3RseS5cbiAgICAgIGRlbGVnYXRlLmFwcGx5KHdpbmRvdywgYXJncyk7XG4gICAgfVxuICB9KTtcbn1cblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
