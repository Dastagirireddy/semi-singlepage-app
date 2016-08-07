System.register(['angular2/src/web_workers/shared/serializer', 'angular2/src/web_workers/ui/event_serializer', 'angular2/src/facade/exceptions', 'angular2/src/facade/async'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var serializer_1, event_serializer_1, exceptions_1, async_1;
    var EventDispatcher;
    return {
        setters:[
            function (serializer_1_1) {
                serializer_1 = serializer_1_1;
            },
            function (event_serializer_1_1) {
                event_serializer_1 = event_serializer_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            }],
        execute: function() {
            EventDispatcher = (function () {
                function EventDispatcher(_sink, _serializer) {
                    this._sink = _sink;
                    this._serializer = _serializer;
                }
                EventDispatcher.prototype.dispatchRenderEvent = function (element, eventTarget, eventName, event) {
                    var serializedEvent;
                    // TODO (jteplitz602): support custom events #3350
                    switch (event.type) {
                        case "click":
                        case "mouseup":
                        case "mousedown":
                        case "dblclick":
                        case "contextmenu":
                        case "mouseenter":
                        case "mouseleave":
                        case "mousemove":
                        case "mouseout":
                        case "mouseover":
                        case "show":
                            serializedEvent = event_serializer_1.serializeMouseEvent(event);
                            break;
                        case "keydown":
                        case "keypress":
                        case "keyup":
                            serializedEvent = event_serializer_1.serializeKeyboardEvent(event);
                            break;
                        case "input":
                        case "change":
                        case "blur":
                            serializedEvent = event_serializer_1.serializeEventWithTarget(event);
                            break;
                        case "abort":
                        case "afterprint":
                        case "beforeprint":
                        case "cached":
                        case "canplay":
                        case "canplaythrough":
                        case "chargingchange":
                        case "chargingtimechange":
                        case "close":
                        case "dischargingtimechange":
                        case "DOMContentLoaded":
                        case "downloading":
                        case "durationchange":
                        case "emptied":
                        case "ended":
                        case "error":
                        case "fullscreenchange":
                        case "fullscreenerror":
                        case "invalid":
                        case "languagechange":
                        case "levelfchange":
                        case "loadeddata":
                        case "loadedmetadata":
                        case "obsolete":
                        case "offline":
                        case "online":
                        case "open":
                        case "orientatoinchange":
                        case "pause":
                        case "pointerlockchange":
                        case "pointerlockerror":
                        case "play":
                        case "playing":
                        case "ratechange":
                        case "readystatechange":
                        case "reset":
                        case "scroll":
                        case "seeked":
                        case "seeking":
                        case "stalled":
                        case "submit":
                        case "success":
                        case "suspend":
                        case "timeupdate":
                        case "updateready":
                        case "visibilitychange":
                        case "volumechange":
                        case "waiting":
                            serializedEvent = event_serializer_1.serializeGenericEvent(event);
                            break;
                        case "transitionend":
                            serializedEvent = event_serializer_1.serializeTransitionEvent(event);
                            break;
                        default:
                            throw new exceptions_1.BaseException(eventName + " not supported on WebWorkers");
                    }
                    async_1.ObservableWrapper.callEmit(this._sink, {
                        "element": this._serializer.serialize(element, serializer_1.RenderStoreObject),
                        "eventName": eventName,
                        "eventTarget": eventTarget,
                        "event": serializedEvent
                    });
                    // TODO(kegluneq): Eventually, we want the user to indicate from the UI side whether the event
                    // should be canceled, but for now just call `preventDefault` on the original DOM event.
                    return false;
                };
                return EventDispatcher;
            }());
            exports_1("EventDispatcher", EventDispatcher);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy93ZWJfd29ya2Vycy91aS9ldmVudF9kaXNwYXRjaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBWUE7Z0JBQ0UseUJBQW9CLEtBQXdCLEVBQVUsV0FBdUI7b0JBQXpELFVBQUssR0FBTCxLQUFLLENBQW1CO29CQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFZO2dCQUFHLENBQUM7Z0JBRWpGLDZDQUFtQixHQUFuQixVQUFvQixPQUFZLEVBQUUsV0FBbUIsRUFBRSxTQUFpQixFQUFFLEtBQVU7b0JBQ2xGLElBQUksZUFBZSxDQUFDO29CQUNwQixrREFBa0Q7b0JBQ2xELE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNuQixLQUFLLE9BQU8sQ0FBQzt3QkFDYixLQUFLLFNBQVMsQ0FBQzt3QkFDZixLQUFLLFdBQVcsQ0FBQzt3QkFDakIsS0FBSyxVQUFVLENBQUM7d0JBQ2hCLEtBQUssYUFBYSxDQUFDO3dCQUNuQixLQUFLLFlBQVksQ0FBQzt3QkFDbEIsS0FBSyxZQUFZLENBQUM7d0JBQ2xCLEtBQUssV0FBVyxDQUFDO3dCQUNqQixLQUFLLFVBQVUsQ0FBQzt3QkFDaEIsS0FBSyxXQUFXLENBQUM7d0JBQ2pCLEtBQUssTUFBTTs0QkFDVCxlQUFlLEdBQUcsc0NBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQzdDLEtBQUssQ0FBQzt3QkFDUixLQUFLLFNBQVMsQ0FBQzt3QkFDZixLQUFLLFVBQVUsQ0FBQzt3QkFDaEIsS0FBSyxPQUFPOzRCQUNWLGVBQWUsR0FBRyx5Q0FBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDaEQsS0FBSyxDQUFDO3dCQUNSLEtBQUssT0FBTyxDQUFDO3dCQUNiLEtBQUssUUFBUSxDQUFDO3dCQUNkLEtBQUssTUFBTTs0QkFDVCxlQUFlLEdBQUcsMkNBQXdCLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQ2xELEtBQUssQ0FBQzt3QkFDUixLQUFLLE9BQU8sQ0FBQzt3QkFDYixLQUFLLFlBQVksQ0FBQzt3QkFDbEIsS0FBSyxhQUFhLENBQUM7d0JBQ25CLEtBQUssUUFBUSxDQUFDO3dCQUNkLEtBQUssU0FBUyxDQUFDO3dCQUNmLEtBQUssZ0JBQWdCLENBQUM7d0JBQ3RCLEtBQUssZ0JBQWdCLENBQUM7d0JBQ3RCLEtBQUssb0JBQW9CLENBQUM7d0JBQzFCLEtBQUssT0FBTyxDQUFDO3dCQUNiLEtBQUssdUJBQXVCLENBQUM7d0JBQzdCLEtBQUssa0JBQWtCLENBQUM7d0JBQ3hCLEtBQUssYUFBYSxDQUFDO3dCQUNuQixLQUFLLGdCQUFnQixDQUFDO3dCQUN0QixLQUFLLFNBQVMsQ0FBQzt3QkFDZixLQUFLLE9BQU8sQ0FBQzt3QkFDYixLQUFLLE9BQU8sQ0FBQzt3QkFDYixLQUFLLGtCQUFrQixDQUFDO3dCQUN4QixLQUFLLGlCQUFpQixDQUFDO3dCQUN2QixLQUFLLFNBQVMsQ0FBQzt3QkFDZixLQUFLLGdCQUFnQixDQUFDO3dCQUN0QixLQUFLLGNBQWMsQ0FBQzt3QkFDcEIsS0FBSyxZQUFZLENBQUM7d0JBQ2xCLEtBQUssZ0JBQWdCLENBQUM7d0JBQ3RCLEtBQUssVUFBVSxDQUFDO3dCQUNoQixLQUFLLFNBQVMsQ0FBQzt3QkFDZixLQUFLLFFBQVEsQ0FBQzt3QkFDZCxLQUFLLE1BQU0sQ0FBQzt3QkFDWixLQUFLLG1CQUFtQixDQUFDO3dCQUN6QixLQUFLLE9BQU8sQ0FBQzt3QkFDYixLQUFLLG1CQUFtQixDQUFDO3dCQUN6QixLQUFLLGtCQUFrQixDQUFDO3dCQUN4QixLQUFLLE1BQU0sQ0FBQzt3QkFDWixLQUFLLFNBQVMsQ0FBQzt3QkFDZixLQUFLLFlBQVksQ0FBQzt3QkFDbEIsS0FBSyxrQkFBa0IsQ0FBQzt3QkFDeEIsS0FBSyxPQUFPLENBQUM7d0JBQ2IsS0FBSyxRQUFRLENBQUM7d0JBQ2QsS0FBSyxRQUFRLENBQUM7d0JBQ2QsS0FBSyxTQUFTLENBQUM7d0JBQ2YsS0FBSyxTQUFTLENBQUM7d0JBQ2YsS0FBSyxRQUFRLENBQUM7d0JBQ2QsS0FBSyxTQUFTLENBQUM7d0JBQ2YsS0FBSyxTQUFTLENBQUM7d0JBQ2YsS0FBSyxZQUFZLENBQUM7d0JBQ2xCLEtBQUssYUFBYSxDQUFDO3dCQUNuQixLQUFLLGtCQUFrQixDQUFDO3dCQUN4QixLQUFLLGNBQWMsQ0FBQzt3QkFDcEIsS0FBSyxTQUFTOzRCQUNaLGVBQWUsR0FBRyx3Q0FBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDL0MsS0FBSyxDQUFDO3dCQUNSLEtBQUssZUFBZTs0QkFDbEIsZUFBZSxHQUFHLDJDQUF3QixDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUNsRCxLQUFLLENBQUM7d0JBQ1I7NEJBQ0UsTUFBTSxJQUFJLDBCQUFhLENBQUMsU0FBUyxHQUFHLDhCQUE4QixDQUFDLENBQUM7b0JBQ3hFLENBQUM7b0JBQ0QseUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ3JDLFNBQVMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsOEJBQWlCLENBQUM7d0JBQ2pFLFdBQVcsRUFBRSxTQUFTO3dCQUN0QixhQUFhLEVBQUUsV0FBVzt3QkFDMUIsT0FBTyxFQUFFLGVBQWU7cUJBQ3pCLENBQUMsQ0FBQztvQkFFSCw4RkFBOEY7b0JBQzlGLHdGQUF3RjtvQkFDeEYsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFDZixDQUFDO2dCQUNILHNCQUFDO1lBQUQsQ0FqR0EsQUFpR0MsSUFBQTtZQWpHRCw2Q0FpR0MsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvd2ViX3dvcmtlcnMvdWkvZXZlbnRfZGlzcGF0Y2hlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U2VyaWFsaXplciwgUmVuZGVyU3RvcmVPYmplY3R9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvc2VyaWFsaXplcic7XG5pbXBvcnQge1xuICBzZXJpYWxpemVNb3VzZUV2ZW50LFxuICBzZXJpYWxpemVLZXlib2FyZEV2ZW50LFxuICBzZXJpYWxpemVHZW5lcmljRXZlbnQsXG4gIHNlcmlhbGl6ZUV2ZW50V2l0aFRhcmdldCxcbiAgc2VyaWFsaXplVHJhbnNpdGlvbkV2ZW50XG59IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy91aS9ldmVudF9zZXJpYWxpemVyJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbiwgV3JhcHBlZEV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7U3RyaW5nTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBPYnNlcnZhYmxlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5cbmV4cG9ydCBjbGFzcyBFdmVudERpc3BhdGNoZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zaW5rOiBFdmVudEVtaXR0ZXI8YW55PiwgcHJpdmF0ZSBfc2VyaWFsaXplcjogU2VyaWFsaXplcikge31cblxuICBkaXNwYXRjaFJlbmRlckV2ZW50KGVsZW1lbnQ6IGFueSwgZXZlbnRUYXJnZXQ6IHN0cmluZywgZXZlbnROYW1lOiBzdHJpbmcsIGV2ZW50OiBhbnkpOiBib29sZWFuIHtcbiAgICB2YXIgc2VyaWFsaXplZEV2ZW50O1xuICAgIC8vIFRPRE8gKGp0ZXBsaXR6NjAyKTogc3VwcG9ydCBjdXN0b20gZXZlbnRzICMzMzUwXG4gICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICBjYXNlIFwiY2xpY2tcIjpcbiAgICAgIGNhc2UgXCJtb3VzZXVwXCI6XG4gICAgICBjYXNlIFwibW91c2Vkb3duXCI6XG4gICAgICBjYXNlIFwiZGJsY2xpY2tcIjpcbiAgICAgIGNhc2UgXCJjb250ZXh0bWVudVwiOlxuICAgICAgY2FzZSBcIm1vdXNlZW50ZXJcIjpcbiAgICAgIGNhc2UgXCJtb3VzZWxlYXZlXCI6XG4gICAgICBjYXNlIFwibW91c2Vtb3ZlXCI6XG4gICAgICBjYXNlIFwibW91c2VvdXRcIjpcbiAgICAgIGNhc2UgXCJtb3VzZW92ZXJcIjpcbiAgICAgIGNhc2UgXCJzaG93XCI6XG4gICAgICAgIHNlcmlhbGl6ZWRFdmVudCA9IHNlcmlhbGl6ZU1vdXNlRXZlbnQoZXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJrZXlkb3duXCI6XG4gICAgICBjYXNlIFwia2V5cHJlc3NcIjpcbiAgICAgIGNhc2UgXCJrZXl1cFwiOlxuICAgICAgICBzZXJpYWxpemVkRXZlbnQgPSBzZXJpYWxpemVLZXlib2FyZEV2ZW50KGV2ZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiaW5wdXRcIjpcbiAgICAgIGNhc2UgXCJjaGFuZ2VcIjpcbiAgICAgIGNhc2UgXCJibHVyXCI6XG4gICAgICAgIHNlcmlhbGl6ZWRFdmVudCA9IHNlcmlhbGl6ZUV2ZW50V2l0aFRhcmdldChldmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImFib3J0XCI6XG4gICAgICBjYXNlIFwiYWZ0ZXJwcmludFwiOlxuICAgICAgY2FzZSBcImJlZm9yZXByaW50XCI6XG4gICAgICBjYXNlIFwiY2FjaGVkXCI6XG4gICAgICBjYXNlIFwiY2FucGxheVwiOlxuICAgICAgY2FzZSBcImNhbnBsYXl0aHJvdWdoXCI6XG4gICAgICBjYXNlIFwiY2hhcmdpbmdjaGFuZ2VcIjpcbiAgICAgIGNhc2UgXCJjaGFyZ2luZ3RpbWVjaGFuZ2VcIjpcbiAgICAgIGNhc2UgXCJjbG9zZVwiOlxuICAgICAgY2FzZSBcImRpc2NoYXJnaW5ndGltZWNoYW5nZVwiOlxuICAgICAgY2FzZSBcIkRPTUNvbnRlbnRMb2FkZWRcIjpcbiAgICAgIGNhc2UgXCJkb3dubG9hZGluZ1wiOlxuICAgICAgY2FzZSBcImR1cmF0aW9uY2hhbmdlXCI6XG4gICAgICBjYXNlIFwiZW1wdGllZFwiOlxuICAgICAgY2FzZSBcImVuZGVkXCI6XG4gICAgICBjYXNlIFwiZXJyb3JcIjpcbiAgICAgIGNhc2UgXCJmdWxsc2NyZWVuY2hhbmdlXCI6XG4gICAgICBjYXNlIFwiZnVsbHNjcmVlbmVycm9yXCI6XG4gICAgICBjYXNlIFwiaW52YWxpZFwiOlxuICAgICAgY2FzZSBcImxhbmd1YWdlY2hhbmdlXCI6XG4gICAgICBjYXNlIFwibGV2ZWxmY2hhbmdlXCI6XG4gICAgICBjYXNlIFwibG9hZGVkZGF0YVwiOlxuICAgICAgY2FzZSBcImxvYWRlZG1ldGFkYXRhXCI6XG4gICAgICBjYXNlIFwib2Jzb2xldGVcIjpcbiAgICAgIGNhc2UgXCJvZmZsaW5lXCI6XG4gICAgICBjYXNlIFwib25saW5lXCI6XG4gICAgICBjYXNlIFwib3BlblwiOlxuICAgICAgY2FzZSBcIm9yaWVudGF0b2luY2hhbmdlXCI6XG4gICAgICBjYXNlIFwicGF1c2VcIjpcbiAgICAgIGNhc2UgXCJwb2ludGVybG9ja2NoYW5nZVwiOlxuICAgICAgY2FzZSBcInBvaW50ZXJsb2NrZXJyb3JcIjpcbiAgICAgIGNhc2UgXCJwbGF5XCI6XG4gICAgICBjYXNlIFwicGxheWluZ1wiOlxuICAgICAgY2FzZSBcInJhdGVjaGFuZ2VcIjpcbiAgICAgIGNhc2UgXCJyZWFkeXN0YXRlY2hhbmdlXCI6XG4gICAgICBjYXNlIFwicmVzZXRcIjpcbiAgICAgIGNhc2UgXCJzY3JvbGxcIjpcbiAgICAgIGNhc2UgXCJzZWVrZWRcIjpcbiAgICAgIGNhc2UgXCJzZWVraW5nXCI6XG4gICAgICBjYXNlIFwic3RhbGxlZFwiOlxuICAgICAgY2FzZSBcInN1Ym1pdFwiOlxuICAgICAgY2FzZSBcInN1Y2Nlc3NcIjpcbiAgICAgIGNhc2UgXCJzdXNwZW5kXCI6XG4gICAgICBjYXNlIFwidGltZXVwZGF0ZVwiOlxuICAgICAgY2FzZSBcInVwZGF0ZXJlYWR5XCI6XG4gICAgICBjYXNlIFwidmlzaWJpbGl0eWNoYW5nZVwiOlxuICAgICAgY2FzZSBcInZvbHVtZWNoYW5nZVwiOlxuICAgICAgY2FzZSBcIndhaXRpbmdcIjpcbiAgICAgICAgc2VyaWFsaXplZEV2ZW50ID0gc2VyaWFsaXplR2VuZXJpY0V2ZW50KGV2ZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwidHJhbnNpdGlvbmVuZFwiOlxuICAgICAgICBzZXJpYWxpemVkRXZlbnQgPSBzZXJpYWxpemVUcmFuc2l0aW9uRXZlbnQoZXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGV2ZW50TmFtZSArIFwiIG5vdCBzdXBwb3J0ZWQgb24gV2ViV29ya2Vyc1wiKTtcbiAgICB9XG4gICAgT2JzZXJ2YWJsZVdyYXBwZXIuY2FsbEVtaXQodGhpcy5fc2luaywge1xuICAgICAgXCJlbGVtZW50XCI6IHRoaXMuX3NlcmlhbGl6ZXIuc2VyaWFsaXplKGVsZW1lbnQsIFJlbmRlclN0b3JlT2JqZWN0KSxcbiAgICAgIFwiZXZlbnROYW1lXCI6IGV2ZW50TmFtZSxcbiAgICAgIFwiZXZlbnRUYXJnZXRcIjogZXZlbnRUYXJnZXQsXG4gICAgICBcImV2ZW50XCI6IHNlcmlhbGl6ZWRFdmVudFxuICAgIH0pO1xuXG4gICAgLy8gVE9ETyhrZWdsdW5lcSk6IEV2ZW50dWFsbHksIHdlIHdhbnQgdGhlIHVzZXIgdG8gaW5kaWNhdGUgZnJvbSB0aGUgVUkgc2lkZSB3aGV0aGVyIHRoZSBldmVudFxuICAgIC8vIHNob3VsZCBiZSBjYW5jZWxlZCwgYnV0IGZvciBub3cganVzdCBjYWxsIGBwcmV2ZW50RGVmYXVsdGAgb24gdGhlIG9yaWdpbmFsIERPTSBldmVudC5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
