System.register(['angular2/src/facade/collection', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var collection_1, lang_1;
    var MOUSE_EVENT_PROPERTIES, KEYBOARD_EVENT_PROPERTIES, TRANSITION_EVENT_PROPERTIES, EVENT_PROPERTIES, NODES_WITH_VALUE;
    function serializeGenericEvent(e) {
        return serializeEvent(e, EVENT_PROPERTIES);
    }
    exports_1("serializeGenericEvent", serializeGenericEvent);
    // TODO(jteplitz602): Allow users to specify the properties they need rather than always
    // adding value and files #3374
    function serializeEventWithTarget(e) {
        var serializedEvent = serializeEvent(e, EVENT_PROPERTIES);
        return addTarget(e, serializedEvent);
    }
    exports_1("serializeEventWithTarget", serializeEventWithTarget);
    function serializeMouseEvent(e) {
        return serializeEvent(e, MOUSE_EVENT_PROPERTIES);
    }
    exports_1("serializeMouseEvent", serializeMouseEvent);
    function serializeKeyboardEvent(e) {
        var serializedEvent = serializeEvent(e, KEYBOARD_EVENT_PROPERTIES);
        return addTarget(e, serializedEvent);
    }
    exports_1("serializeKeyboardEvent", serializeKeyboardEvent);
    function serializeTransitionEvent(e) {
        var serializedEvent = serializeEvent(e, TRANSITION_EVENT_PROPERTIES);
        return addTarget(e, serializedEvent);
    }
    exports_1("serializeTransitionEvent", serializeTransitionEvent);
    // TODO(jteplitz602): #3374. See above.
    function addTarget(e, serializedEvent) {
        if (NODES_WITH_VALUE.has(e.target.tagName.toLowerCase())) {
            var target = e.target;
            serializedEvent['target'] = { 'value': target.value };
            if (lang_1.isPresent(target.files)) {
                serializedEvent['target']['files'] = target.files;
            }
        }
        return serializedEvent;
    }
    function serializeEvent(e, properties) {
        var serialized = {};
        for (var i = 0; i < properties.length; i++) {
            var prop = properties[i];
            serialized[prop] = e[prop];
        }
        return serialized;
    }
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            MOUSE_EVENT_PROPERTIES = [
                "altKey",
                "button",
                "clientX",
                "clientY",
                "metaKey",
                "movementX",
                "movementY",
                "offsetX",
                "offsetY",
                "region",
                "screenX",
                "screenY",
                "shiftKey"
            ];
            KEYBOARD_EVENT_PROPERTIES = [
                'altkey',
                'charCode',
                'code',
                'ctrlKey',
                'isComposing',
                'key',
                'keyCode',
                'location',
                'metaKey',
                'repeat',
                'shiftKey',
                'which'
            ];
            TRANSITION_EVENT_PROPERTIES = ['propertyName', 'elapsedTime', 'pseudoElement'];
            EVENT_PROPERTIES = ['type', 'bubbles', 'cancelable'];
            NODES_WITH_VALUE = new collection_1.Set(["input", "select", "option", "button", "li", "meter", "progress", "param"]);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3dlYl93b3JrZXJzL3VpL2V2ZW50X3NlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQUdNLHNCQUFzQixFQWdCdEIseUJBQXlCLEVBZXpCLDJCQUEyQixFQUUzQixnQkFBZ0IsRUFFaEIsZ0JBQWdCO0lBR3RCLCtCQUFzQyxDQUFRO1FBQzVDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUZELHlEQUVDLENBQUE7SUFFRCx3RkFBd0Y7SUFDeEYsK0JBQStCO0lBQy9CLGtDQUF5QyxDQUFRO1FBQy9DLElBQUksZUFBZSxHQUFHLGNBQWMsQ0FBQyxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUMxRCxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBSEQsK0RBR0MsQ0FBQTtJQUVELDZCQUFvQyxDQUFhO1FBQy9DLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLHNCQUFzQixDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUZELHFEQUVDLENBQUE7SUFFRCxnQ0FBdUMsQ0FBZ0I7UUFDckQsSUFBSSxlQUFlLEdBQUcsY0FBYyxDQUFDLENBQUMsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO1FBQ25FLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFIRCwyREFHQyxDQUFBO0lBRUQsa0NBQXlDLENBQWtCO1FBQ3pELElBQUksZUFBZSxHQUFHLGNBQWMsQ0FBQyxDQUFDLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztRQUNyRSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBSEQsK0RBR0MsQ0FBQTtJQUVELHVDQUF1QztJQUN2QyxtQkFBbUIsQ0FBUSxFQUFFLGVBQXFDO1FBQ2hFLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBZSxDQUFDLENBQUMsTUFBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4RSxJQUFJLE1BQU0sR0FBcUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUN4QyxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBQyxDQUFDO1lBQ3BELEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDcEQsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsZUFBZSxDQUFDO0lBQ3pCLENBQUM7SUFFRCx3QkFBd0IsQ0FBTSxFQUFFLFVBQW9CO1FBQ2xELElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNwQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUMzQyxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBQ0QsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUNwQixDQUFDOzs7Ozs7Ozs7O1lBbEZLLHNCQUFzQixHQUFHO2dCQUM3QixRQUFRO2dCQUNSLFFBQVE7Z0JBQ1IsU0FBUztnQkFDVCxTQUFTO2dCQUNULFNBQVM7Z0JBQ1QsV0FBVztnQkFDWCxXQUFXO2dCQUNYLFNBQVM7Z0JBQ1QsU0FBUztnQkFDVCxRQUFRO2dCQUNSLFNBQVM7Z0JBQ1QsU0FBUztnQkFDVCxVQUFVO2FBQ1gsQ0FBQztZQUVJLHlCQUF5QixHQUFHO2dCQUNoQyxRQUFRO2dCQUNSLFVBQVU7Z0JBQ1YsTUFBTTtnQkFDTixTQUFTO2dCQUNULGFBQWE7Z0JBQ2IsS0FBSztnQkFDTCxTQUFTO2dCQUNULFVBQVU7Z0JBQ1YsU0FBUztnQkFDVCxRQUFRO2dCQUNSLFVBQVU7Z0JBQ1YsT0FBTzthQUNSLENBQUM7WUFFSSwyQkFBMkIsR0FBRyxDQUFDLGNBQWMsRUFBRSxhQUFhLEVBQUUsZUFBZSxDQUFDLENBQUM7WUFFL0UsZ0JBQWdCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBRXJELGdCQUFnQixHQUNsQixJQUFJLGdCQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy93ZWJfd29ya2Vycy91aS9ldmVudF9zZXJpYWxpemVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTZXR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge2lzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuY29uc3QgTU9VU0VfRVZFTlRfUFJPUEVSVElFUyA9IFtcbiAgXCJhbHRLZXlcIixcbiAgXCJidXR0b25cIixcbiAgXCJjbGllbnRYXCIsXG4gIFwiY2xpZW50WVwiLFxuICBcIm1ldGFLZXlcIixcbiAgXCJtb3ZlbWVudFhcIixcbiAgXCJtb3ZlbWVudFlcIixcbiAgXCJvZmZzZXRYXCIsXG4gIFwib2Zmc2V0WVwiLFxuICBcInJlZ2lvblwiLFxuICBcInNjcmVlblhcIixcbiAgXCJzY3JlZW5ZXCIsXG4gIFwic2hpZnRLZXlcIlxuXTtcblxuY29uc3QgS0VZQk9BUkRfRVZFTlRfUFJPUEVSVElFUyA9IFtcbiAgJ2FsdGtleScsXG4gICdjaGFyQ29kZScsXG4gICdjb2RlJyxcbiAgJ2N0cmxLZXknLFxuICAnaXNDb21wb3NpbmcnLFxuICAna2V5JyxcbiAgJ2tleUNvZGUnLFxuICAnbG9jYXRpb24nLFxuICAnbWV0YUtleScsXG4gICdyZXBlYXQnLFxuICAnc2hpZnRLZXknLFxuICAnd2hpY2gnXG5dO1xuXG5jb25zdCBUUkFOU0lUSU9OX0VWRU5UX1BST1BFUlRJRVMgPSBbJ3Byb3BlcnR5TmFtZScsICdlbGFwc2VkVGltZScsICdwc2V1ZG9FbGVtZW50J107XG5cbmNvbnN0IEVWRU5UX1BST1BFUlRJRVMgPSBbJ3R5cGUnLCAnYnViYmxlcycsICdjYW5jZWxhYmxlJ107XG5cbmNvbnN0IE5PREVTX1dJVEhfVkFMVUUgPVxuICAgIG5ldyBTZXQoW1wiaW5wdXRcIiwgXCJzZWxlY3RcIiwgXCJvcHRpb25cIiwgXCJidXR0b25cIiwgXCJsaVwiLCBcIm1ldGVyXCIsIFwicHJvZ3Jlc3NcIiwgXCJwYXJhbVwiXSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemVHZW5lcmljRXZlbnQoZTogRXZlbnQpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gIHJldHVybiBzZXJpYWxpemVFdmVudChlLCBFVkVOVF9QUk9QRVJUSUVTKTtcbn1cblxuLy8gVE9ETyhqdGVwbGl0ejYwMik6IEFsbG93IHVzZXJzIHRvIHNwZWNpZnkgdGhlIHByb3BlcnRpZXMgdGhleSBuZWVkIHJhdGhlciB0aGFuIGFsd2F5c1xuLy8gYWRkaW5nIHZhbHVlIGFuZCBmaWxlcyAjMzM3NFxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZUV2ZW50V2l0aFRhcmdldChlOiBFdmVudCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgdmFyIHNlcmlhbGl6ZWRFdmVudCA9IHNlcmlhbGl6ZUV2ZW50KGUsIEVWRU5UX1BST1BFUlRJRVMpO1xuICByZXR1cm4gYWRkVGFyZ2V0KGUsIHNlcmlhbGl6ZWRFdmVudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemVNb3VzZUV2ZW50KGU6IE1vdXNlRXZlbnQpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gIHJldHVybiBzZXJpYWxpemVFdmVudChlLCBNT1VTRV9FVkVOVF9QUk9QRVJUSUVTKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZUtleWJvYXJkRXZlbnQoZTogS2V5Ym9hcmRFdmVudCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgdmFyIHNlcmlhbGl6ZWRFdmVudCA9IHNlcmlhbGl6ZUV2ZW50KGUsIEtFWUJPQVJEX0VWRU5UX1BST1BFUlRJRVMpO1xuICByZXR1cm4gYWRkVGFyZ2V0KGUsIHNlcmlhbGl6ZWRFdmVudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemVUcmFuc2l0aW9uRXZlbnQoZTogVHJhbnNpdGlvbkV2ZW50KToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICB2YXIgc2VyaWFsaXplZEV2ZW50ID0gc2VyaWFsaXplRXZlbnQoZSwgVFJBTlNJVElPTl9FVkVOVF9QUk9QRVJUSUVTKTtcbiAgcmV0dXJuIGFkZFRhcmdldChlLCBzZXJpYWxpemVkRXZlbnQpO1xufVxuXG4vLyBUT0RPKGp0ZXBsaXR6NjAyKTogIzMzNzQuIFNlZSBhYm92ZS5cbmZ1bmN0aW9uIGFkZFRhcmdldChlOiBFdmVudCwgc2VyaWFsaXplZEV2ZW50OiB7W2tleTogc3RyaW5nXTogYW55fSk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgaWYgKE5PREVTX1dJVEhfVkFMVUUuaGFzKCg8SFRNTEVsZW1lbnQ+ZS50YXJnZXQpLnRhZ05hbWUudG9Mb3dlckNhc2UoKSkpIHtcbiAgICB2YXIgdGFyZ2V0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZS50YXJnZXQ7XG4gICAgc2VyaWFsaXplZEV2ZW50Wyd0YXJnZXQnXSA9IHsndmFsdWUnOiB0YXJnZXQudmFsdWV9O1xuICAgIGlmIChpc1ByZXNlbnQodGFyZ2V0LmZpbGVzKSkge1xuICAgICAgc2VyaWFsaXplZEV2ZW50Wyd0YXJnZXQnXVsnZmlsZXMnXSA9IHRhcmdldC5maWxlcztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHNlcmlhbGl6ZWRFdmVudDtcbn1cblxuZnVuY3Rpb24gc2VyaWFsaXplRXZlbnQoZTogYW55LCBwcm9wZXJ0aWVzOiBzdHJpbmdbXSk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgdmFyIHNlcmlhbGl6ZWQgPSB7fTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHByb3AgPSBwcm9wZXJ0aWVzW2ldO1xuICAgIHNlcmlhbGl6ZWRbcHJvcF0gPSBlW3Byb3BdO1xuICB9XG4gIHJldHVybiBzZXJpYWxpemVkO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
