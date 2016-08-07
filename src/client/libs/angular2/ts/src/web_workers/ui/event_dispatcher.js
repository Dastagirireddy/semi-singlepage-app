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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3dlYl93b3JrZXJzL3VpL2V2ZW50X2Rpc3BhdGNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFZQTtnQkFDRSx5QkFBb0IsS0FBd0IsRUFBVSxXQUF1QjtvQkFBekQsVUFBSyxHQUFMLEtBQUssQ0FBbUI7b0JBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7Z0JBQUcsQ0FBQztnQkFFakYsNkNBQW1CLEdBQW5CLFVBQW9CLE9BQVksRUFBRSxXQUFtQixFQUFFLFNBQWlCLEVBQUUsS0FBVTtvQkFDbEYsSUFBSSxlQUFlLENBQUM7b0JBQ3BCLGtEQUFrRDtvQkFDbEQsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ25CLEtBQUssT0FBTyxDQUFDO3dCQUNiLEtBQUssU0FBUyxDQUFDO3dCQUNmLEtBQUssV0FBVyxDQUFDO3dCQUNqQixLQUFLLFVBQVUsQ0FBQzt3QkFDaEIsS0FBSyxhQUFhLENBQUM7d0JBQ25CLEtBQUssWUFBWSxDQUFDO3dCQUNsQixLQUFLLFlBQVksQ0FBQzt3QkFDbEIsS0FBSyxXQUFXLENBQUM7d0JBQ2pCLEtBQUssVUFBVSxDQUFDO3dCQUNoQixLQUFLLFdBQVcsQ0FBQzt3QkFDakIsS0FBSyxNQUFNOzRCQUNULGVBQWUsR0FBRyxzQ0FBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDN0MsS0FBSyxDQUFDO3dCQUNSLEtBQUssU0FBUyxDQUFDO3dCQUNmLEtBQUssVUFBVSxDQUFDO3dCQUNoQixLQUFLLE9BQU87NEJBQ1YsZUFBZSxHQUFHLHlDQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUNoRCxLQUFLLENBQUM7d0JBQ1IsS0FBSyxPQUFPLENBQUM7d0JBQ2IsS0FBSyxRQUFRLENBQUM7d0JBQ2QsS0FBSyxNQUFNOzRCQUNULGVBQWUsR0FBRywyQ0FBd0IsQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDbEQsS0FBSyxDQUFDO3dCQUNSLEtBQUssT0FBTyxDQUFDO3dCQUNiLEtBQUssWUFBWSxDQUFDO3dCQUNsQixLQUFLLGFBQWEsQ0FBQzt3QkFDbkIsS0FBSyxRQUFRLENBQUM7d0JBQ2QsS0FBSyxTQUFTLENBQUM7d0JBQ2YsS0FBSyxnQkFBZ0IsQ0FBQzt3QkFDdEIsS0FBSyxnQkFBZ0IsQ0FBQzt3QkFDdEIsS0FBSyxvQkFBb0IsQ0FBQzt3QkFDMUIsS0FBSyxPQUFPLENBQUM7d0JBQ2IsS0FBSyx1QkFBdUIsQ0FBQzt3QkFDN0IsS0FBSyxrQkFBa0IsQ0FBQzt3QkFDeEIsS0FBSyxhQUFhLENBQUM7d0JBQ25CLEtBQUssZ0JBQWdCLENBQUM7d0JBQ3RCLEtBQUssU0FBUyxDQUFDO3dCQUNmLEtBQUssT0FBTyxDQUFDO3dCQUNiLEtBQUssT0FBTyxDQUFDO3dCQUNiLEtBQUssa0JBQWtCLENBQUM7d0JBQ3hCLEtBQUssaUJBQWlCLENBQUM7d0JBQ3ZCLEtBQUssU0FBUyxDQUFDO3dCQUNmLEtBQUssZ0JBQWdCLENBQUM7d0JBQ3RCLEtBQUssY0FBYyxDQUFDO3dCQUNwQixLQUFLLFlBQVksQ0FBQzt3QkFDbEIsS0FBSyxnQkFBZ0IsQ0FBQzt3QkFDdEIsS0FBSyxVQUFVLENBQUM7d0JBQ2hCLEtBQUssU0FBUyxDQUFDO3dCQUNmLEtBQUssUUFBUSxDQUFDO3dCQUNkLEtBQUssTUFBTSxDQUFDO3dCQUNaLEtBQUssbUJBQW1CLENBQUM7d0JBQ3pCLEtBQUssT0FBTyxDQUFDO3dCQUNiLEtBQUssbUJBQW1CLENBQUM7d0JBQ3pCLEtBQUssa0JBQWtCLENBQUM7d0JBQ3hCLEtBQUssTUFBTSxDQUFDO3dCQUNaLEtBQUssU0FBUyxDQUFDO3dCQUNmLEtBQUssWUFBWSxDQUFDO3dCQUNsQixLQUFLLGtCQUFrQixDQUFDO3dCQUN4QixLQUFLLE9BQU8sQ0FBQzt3QkFDYixLQUFLLFFBQVEsQ0FBQzt3QkFDZCxLQUFLLFFBQVEsQ0FBQzt3QkFDZCxLQUFLLFNBQVMsQ0FBQzt3QkFDZixLQUFLLFNBQVMsQ0FBQzt3QkFDZixLQUFLLFFBQVEsQ0FBQzt3QkFDZCxLQUFLLFNBQVMsQ0FBQzt3QkFDZixLQUFLLFNBQVMsQ0FBQzt3QkFDZixLQUFLLFlBQVksQ0FBQzt3QkFDbEIsS0FBSyxhQUFhLENBQUM7d0JBQ25CLEtBQUssa0JBQWtCLENBQUM7d0JBQ3hCLEtBQUssY0FBYyxDQUFDO3dCQUNwQixLQUFLLFNBQVM7NEJBQ1osZUFBZSxHQUFHLHdDQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUMvQyxLQUFLLENBQUM7d0JBQ1IsS0FBSyxlQUFlOzRCQUNsQixlQUFlLEdBQUcsMkNBQXdCLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQ2xELEtBQUssQ0FBQzt3QkFDUjs0QkFDRSxNQUFNLElBQUksMEJBQWEsQ0FBQyxTQUFTLEdBQUcsOEJBQThCLENBQUMsQ0FBQztvQkFDeEUsQ0FBQztvQkFDRCx5QkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDckMsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSw4QkFBaUIsQ0FBQzt3QkFDakUsV0FBVyxFQUFFLFNBQVM7d0JBQ3RCLGFBQWEsRUFBRSxXQUFXO3dCQUMxQixPQUFPLEVBQUUsZUFBZTtxQkFDekIsQ0FBQyxDQUFDO29CQUVILDhGQUE4RjtvQkFDOUYsd0ZBQXdGO29CQUN4RixNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNmLENBQUM7Z0JBQ0gsc0JBQUM7WUFBRCxDQWpHQSxBQWlHQyxJQUFBO1lBakdELDZDQWlHQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3dlYl93b3JrZXJzL3VpL2V2ZW50X2Rpc3BhdGNoZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1NlcmlhbGl6ZXIsIFJlbmRlclN0b3JlT2JqZWN0fSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtcbiAgc2VyaWFsaXplTW91c2VFdmVudCxcbiAgc2VyaWFsaXplS2V5Ym9hcmRFdmVudCxcbiAgc2VyaWFsaXplR2VuZXJpY0V2ZW50LFxuICBzZXJpYWxpemVFdmVudFdpdGhUYXJnZXQsXG4gIHNlcmlhbGl6ZVRyYW5zaXRpb25FdmVudFxufSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvdWkvZXZlbnRfc2VyaWFsaXplcic7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb24sIFdyYXBwZWRFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge1N0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge0V2ZW50RW1pdHRlciwgT2JzZXJ2YWJsZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYXN5bmMnO1xuXG5leHBvcnQgY2xhc3MgRXZlbnREaXNwYXRjaGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2luazogRXZlbnRFbWl0dGVyPGFueT4sIHByaXZhdGUgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXIpIHt9XG5cbiAgZGlzcGF0Y2hSZW5kZXJFdmVudChlbGVtZW50OiBhbnksIGV2ZW50VGFyZ2V0OiBzdHJpbmcsIGV2ZW50TmFtZTogc3RyaW5nLCBldmVudDogYW55KTogYm9vbGVhbiB7XG4gICAgdmFyIHNlcmlhbGl6ZWRFdmVudDtcbiAgICAvLyBUT0RPIChqdGVwbGl0ejYwMik6IHN1cHBvcnQgY3VzdG9tIGV2ZW50cyAjMzM1MFxuICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgY2FzZSBcImNsaWNrXCI6XG4gICAgICBjYXNlIFwibW91c2V1cFwiOlxuICAgICAgY2FzZSBcIm1vdXNlZG93blwiOlxuICAgICAgY2FzZSBcImRibGNsaWNrXCI6XG4gICAgICBjYXNlIFwiY29udGV4dG1lbnVcIjpcbiAgICAgIGNhc2UgXCJtb3VzZWVudGVyXCI6XG4gICAgICBjYXNlIFwibW91c2VsZWF2ZVwiOlxuICAgICAgY2FzZSBcIm1vdXNlbW92ZVwiOlxuICAgICAgY2FzZSBcIm1vdXNlb3V0XCI6XG4gICAgICBjYXNlIFwibW91c2VvdmVyXCI6XG4gICAgICBjYXNlIFwic2hvd1wiOlxuICAgICAgICBzZXJpYWxpemVkRXZlbnQgPSBzZXJpYWxpemVNb3VzZUV2ZW50KGV2ZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwia2V5ZG93blwiOlxuICAgICAgY2FzZSBcImtleXByZXNzXCI6XG4gICAgICBjYXNlIFwia2V5dXBcIjpcbiAgICAgICAgc2VyaWFsaXplZEV2ZW50ID0gc2VyaWFsaXplS2V5Ym9hcmRFdmVudChldmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImlucHV0XCI6XG4gICAgICBjYXNlIFwiY2hhbmdlXCI6XG4gICAgICBjYXNlIFwiYmx1clwiOlxuICAgICAgICBzZXJpYWxpemVkRXZlbnQgPSBzZXJpYWxpemVFdmVudFdpdGhUYXJnZXQoZXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJhYm9ydFwiOlxuICAgICAgY2FzZSBcImFmdGVycHJpbnRcIjpcbiAgICAgIGNhc2UgXCJiZWZvcmVwcmludFwiOlxuICAgICAgY2FzZSBcImNhY2hlZFwiOlxuICAgICAgY2FzZSBcImNhbnBsYXlcIjpcbiAgICAgIGNhc2UgXCJjYW5wbGF5dGhyb3VnaFwiOlxuICAgICAgY2FzZSBcImNoYXJnaW5nY2hhbmdlXCI6XG4gICAgICBjYXNlIFwiY2hhcmdpbmd0aW1lY2hhbmdlXCI6XG4gICAgICBjYXNlIFwiY2xvc2VcIjpcbiAgICAgIGNhc2UgXCJkaXNjaGFyZ2luZ3RpbWVjaGFuZ2VcIjpcbiAgICAgIGNhc2UgXCJET01Db250ZW50TG9hZGVkXCI6XG4gICAgICBjYXNlIFwiZG93bmxvYWRpbmdcIjpcbiAgICAgIGNhc2UgXCJkdXJhdGlvbmNoYW5nZVwiOlxuICAgICAgY2FzZSBcImVtcHRpZWRcIjpcbiAgICAgIGNhc2UgXCJlbmRlZFwiOlxuICAgICAgY2FzZSBcImVycm9yXCI6XG4gICAgICBjYXNlIFwiZnVsbHNjcmVlbmNoYW5nZVwiOlxuICAgICAgY2FzZSBcImZ1bGxzY3JlZW5lcnJvclwiOlxuICAgICAgY2FzZSBcImludmFsaWRcIjpcbiAgICAgIGNhc2UgXCJsYW5ndWFnZWNoYW5nZVwiOlxuICAgICAgY2FzZSBcImxldmVsZmNoYW5nZVwiOlxuICAgICAgY2FzZSBcImxvYWRlZGRhdGFcIjpcbiAgICAgIGNhc2UgXCJsb2FkZWRtZXRhZGF0YVwiOlxuICAgICAgY2FzZSBcIm9ic29sZXRlXCI6XG4gICAgICBjYXNlIFwib2ZmbGluZVwiOlxuICAgICAgY2FzZSBcIm9ubGluZVwiOlxuICAgICAgY2FzZSBcIm9wZW5cIjpcbiAgICAgIGNhc2UgXCJvcmllbnRhdG9pbmNoYW5nZVwiOlxuICAgICAgY2FzZSBcInBhdXNlXCI6XG4gICAgICBjYXNlIFwicG9pbnRlcmxvY2tjaGFuZ2VcIjpcbiAgICAgIGNhc2UgXCJwb2ludGVybG9ja2Vycm9yXCI6XG4gICAgICBjYXNlIFwicGxheVwiOlxuICAgICAgY2FzZSBcInBsYXlpbmdcIjpcbiAgICAgIGNhc2UgXCJyYXRlY2hhbmdlXCI6XG4gICAgICBjYXNlIFwicmVhZHlzdGF0ZWNoYW5nZVwiOlxuICAgICAgY2FzZSBcInJlc2V0XCI6XG4gICAgICBjYXNlIFwic2Nyb2xsXCI6XG4gICAgICBjYXNlIFwic2Vla2VkXCI6XG4gICAgICBjYXNlIFwic2Vla2luZ1wiOlxuICAgICAgY2FzZSBcInN0YWxsZWRcIjpcbiAgICAgIGNhc2UgXCJzdWJtaXRcIjpcbiAgICAgIGNhc2UgXCJzdWNjZXNzXCI6XG4gICAgICBjYXNlIFwic3VzcGVuZFwiOlxuICAgICAgY2FzZSBcInRpbWV1cGRhdGVcIjpcbiAgICAgIGNhc2UgXCJ1cGRhdGVyZWFkeVwiOlxuICAgICAgY2FzZSBcInZpc2liaWxpdHljaGFuZ2VcIjpcbiAgICAgIGNhc2UgXCJ2b2x1bWVjaGFuZ2VcIjpcbiAgICAgIGNhc2UgXCJ3YWl0aW5nXCI6XG4gICAgICAgIHNlcmlhbGl6ZWRFdmVudCA9IHNlcmlhbGl6ZUdlbmVyaWNFdmVudChldmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInRyYW5zaXRpb25lbmRcIjpcbiAgICAgICAgc2VyaWFsaXplZEV2ZW50ID0gc2VyaWFsaXplVHJhbnNpdGlvbkV2ZW50KGV2ZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihldmVudE5hbWUgKyBcIiBub3Qgc3VwcG9ydGVkIG9uIFdlYldvcmtlcnNcIik7XG4gICAgfVxuICAgIE9ic2VydmFibGVXcmFwcGVyLmNhbGxFbWl0KHRoaXMuX3NpbmssIHtcbiAgICAgIFwiZWxlbWVudFwiOiB0aGlzLl9zZXJpYWxpemVyLnNlcmlhbGl6ZShlbGVtZW50LCBSZW5kZXJTdG9yZU9iamVjdCksXG4gICAgICBcImV2ZW50TmFtZVwiOiBldmVudE5hbWUsXG4gICAgICBcImV2ZW50VGFyZ2V0XCI6IGV2ZW50VGFyZ2V0LFxuICAgICAgXCJldmVudFwiOiBzZXJpYWxpemVkRXZlbnRcbiAgICB9KTtcblxuICAgIC8vIFRPRE8oa2VnbHVuZXEpOiBFdmVudHVhbGx5LCB3ZSB3YW50IHRoZSB1c2VyIHRvIGluZGljYXRlIGZyb20gdGhlIFVJIHNpZGUgd2hldGhlciB0aGUgZXZlbnRcbiAgICAvLyBzaG91bGQgYmUgY2FuY2VsZWQsIGJ1dCBmb3Igbm93IGp1c3QgY2FsbCBgcHJldmVudERlZmF1bHRgIG9uIHRoZSBvcmlnaW5hbCBET00gZXZlbnQuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
