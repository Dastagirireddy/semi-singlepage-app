System.register(['./utils'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var utils_1;
    // we have to patch the instance since the proto is non-configurable
    function apply(_global) {
        var WS = _global.WebSocket;
        // On Safari window.EventTarget doesn't exist so need to patch WS add/removeEventListener
        // On older Chrome, no need since EventTarget was already patched
        if (!_global.EventTarget) {
            utils_1.patchEventTargetMethods(WS.prototype);
        }
        _global.WebSocket = function (a, b) {
            var socket = arguments.length > 1 ? new WS(a, b) : new WS(a);
            var proxySocket;
            // Safari 7.0 has non-configurable own 'onmessage' and friends properties on the socket instance
            var onmessageDesc = Object.getOwnPropertyDescriptor(socket, 'onmessage');
            if (onmessageDesc && onmessageDesc.configurable === false) {
                proxySocket = Object.create(socket);
                ['addEventListener', 'removeEventListener', 'send', 'close'].forEach(function (propName) {
                    proxySocket[propName] = function () {
                        return socket[propName].apply(socket, arguments);
                    };
                });
            }
            else {
                // we can patch the real socket
                proxySocket = socket;
            }
            utils_1.patchOnProperties(proxySocket, ['close', 'error', 'message', 'open']);
            return proxySocket;
        };
        global.WebSocket.prototype = Object.create(WS.prototype, { constructor: { value: WebSocket } });
    }
    exports_1("apply", apply);
    return {
        setters:[
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvem9uZS5qcy9saWIvYnJvd3Nlci93ZWJzb2NrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQUVBLG9FQUFvRTtJQUNwRSxlQUFzQixPQUFZO1FBQ2hDLElBQUksRUFBRSxHQUFTLE9BQVEsQ0FBQyxTQUFTLENBQUM7UUFDbEMseUZBQXlGO1FBQ3pGLGlFQUFpRTtRQUNqRSxFQUFFLENBQUMsQ0FBQyxDQUFPLE9BQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLCtCQUF1QixDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBQ0ssT0FBUSxDQUFDLFNBQVMsR0FBRyxVQUFTLENBQUMsRUFBRSxDQUFDO1lBQ3RDLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3RCxJQUFJLFdBQVcsQ0FBQztZQUVoQixnR0FBZ0c7WUFDaEcsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztZQUN6RSxFQUFFLENBQUMsQ0FBQyxhQUFhLElBQUksYUFBYSxDQUFDLFlBQVksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMxRCxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDcEMsQ0FBQyxrQkFBa0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVMsUUFBUTtvQkFDcEYsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHO3dCQUN0QixNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQ25ELENBQUMsQ0FBQztnQkFDSixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTiwrQkFBK0I7Z0JBQy9CLFdBQVcsR0FBRyxNQUFNLENBQUM7WUFDdkIsQ0FBQztZQUVELHlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFFdEUsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUNyQixDQUFDLENBQUM7UUFDSSxNQUFPLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBQyxXQUFXLEVBQUMsRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFDLEVBQUMsQ0FBQyxDQUFDO0lBQ3BHLENBQUM7SUE5QkQseUJBOEJDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy96b25lLmpzL2xpYi9icm93c2VyL3dlYnNvY2tldC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7cGF0Y2hFdmVudFRhcmdldE1ldGhvZHMsIHBhdGNoT25Qcm9wZXJ0aWVzfSBmcm9tICcuL3V0aWxzJztcblxuLy8gd2UgaGF2ZSB0byBwYXRjaCB0aGUgaW5zdGFuY2Ugc2luY2UgdGhlIHByb3RvIGlzIG5vbi1jb25maWd1cmFibGVcbmV4cG9ydCBmdW5jdGlvbiBhcHBseShfZ2xvYmFsOiBhbnkpIHtcbiAgdmFyIFdTID0gKDxhbnk+X2dsb2JhbCkuV2ViU29ja2V0O1xuICAvLyBPbiBTYWZhcmkgd2luZG93LkV2ZW50VGFyZ2V0IGRvZXNuJ3QgZXhpc3Qgc28gbmVlZCB0byBwYXRjaCBXUyBhZGQvcmVtb3ZlRXZlbnRMaXN0ZW5lclxuICAvLyBPbiBvbGRlciBDaHJvbWUsIG5vIG5lZWQgc2luY2UgRXZlbnRUYXJnZXQgd2FzIGFscmVhZHkgcGF0Y2hlZFxuICBpZiAoISg8YW55Pl9nbG9iYWwpLkV2ZW50VGFyZ2V0KSB7XG4gICAgcGF0Y2hFdmVudFRhcmdldE1ldGhvZHMoV1MucHJvdG90eXBlKTtcbiAgfVxuICAoPGFueT5fZ2xvYmFsKS5XZWJTb2NrZXQgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHNvY2tldCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gbmV3IFdTKGEsIGIpIDogbmV3IFdTKGEpO1xuICAgIHZhciBwcm94eVNvY2tldDtcblxuICAgIC8vIFNhZmFyaSA3LjAgaGFzIG5vbi1jb25maWd1cmFibGUgb3duICdvbm1lc3NhZ2UnIGFuZCBmcmllbmRzIHByb3BlcnRpZXMgb24gdGhlIHNvY2tldCBpbnN0YW5jZVxuICAgIHZhciBvbm1lc3NhZ2VEZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb2NrZXQsICdvbm1lc3NhZ2UnKTtcbiAgICBpZiAob25tZXNzYWdlRGVzYyAmJiBvbm1lc3NhZ2VEZXNjLmNvbmZpZ3VyYWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgIHByb3h5U29ja2V0ID0gT2JqZWN0LmNyZWF0ZShzb2NrZXQpO1xuICAgICAgWydhZGRFdmVudExpc3RlbmVyJywgJ3JlbW92ZUV2ZW50TGlzdGVuZXInLCAnc2VuZCcsICdjbG9zZSddLmZvckVhY2goZnVuY3Rpb24ocHJvcE5hbWUpIHtcbiAgICAgICAgcHJveHlTb2NrZXRbcHJvcE5hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHNvY2tldFtwcm9wTmFtZV0uYXBwbHkoc29ja2V0LCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHdlIGNhbiBwYXRjaCB0aGUgcmVhbCBzb2NrZXRcbiAgICAgIHByb3h5U29ja2V0ID0gc29ja2V0O1xuICAgIH1cblxuICAgIHBhdGNoT25Qcm9wZXJ0aWVzKHByb3h5U29ja2V0LCBbJ2Nsb3NlJywgJ2Vycm9yJywgJ21lc3NhZ2UnLCAnb3BlbiddKTtcblxuICAgIHJldHVybiBwcm94eVNvY2tldDtcbiAgfTtcbiAgKDxhbnk+Z2xvYmFsKS5XZWJTb2NrZXQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShXUy5wcm90b3R5cGUsIHtjb25zdHJ1Y3Rvcjp7dmFsdWU6IFdlYlNvY2tldH19KTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
