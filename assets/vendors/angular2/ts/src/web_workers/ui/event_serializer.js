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
            NODES_WITH_VALUE = new collection_1.Set(["input", "select", "option", "button", "li", "meter", "progress", "param", "textarea"]);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy93ZWJfd29ya2Vycy91aS9ldmVudF9zZXJpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFHTSxzQkFBc0IsRUFnQnRCLHlCQUF5QixFQWV6QiwyQkFBMkIsRUFFM0IsZ0JBQWdCLEVBRWhCLGdCQUFnQjtJQUd0QiwrQkFBc0MsQ0FBUTtRQUM1QyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFGRCx5REFFQyxDQUFBO0lBRUQsd0ZBQXdGO0lBQ3hGLCtCQUErQjtJQUMvQixrQ0FBeUMsQ0FBUTtRQUMvQyxJQUFJLGVBQWUsR0FBRyxjQUFjLENBQUMsQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDMUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUhELCtEQUdDLENBQUE7SUFFRCw2QkFBb0MsQ0FBYTtRQUMvQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFGRCxxREFFQyxDQUFBO0lBRUQsZ0NBQXVDLENBQWdCO1FBQ3JELElBQUksZUFBZSxHQUFHLGNBQWMsQ0FBQyxDQUFDLEVBQUUseUJBQXlCLENBQUMsQ0FBQztRQUNuRSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBSEQsMkRBR0MsQ0FBQTtJQUVELGtDQUF5QyxDQUFrQjtRQUN6RCxJQUFJLGVBQWUsR0FBRyxjQUFjLENBQUMsQ0FBQyxFQUFFLDJCQUEyQixDQUFDLENBQUM7UUFDckUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUhELCtEQUdDLENBQUE7SUFFRCx1Q0FBdUM7SUFDdkMsbUJBQW1CLENBQVEsRUFBRSxlQUFxQztRQUNoRSxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQWUsQ0FBQyxDQUFDLE1BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEUsSUFBSSxNQUFNLEdBQXFCLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDeEMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUMsQ0FBQztZQUNwRCxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ3BELENBQUM7UUFDSCxDQUFDO1FBQ0QsTUFBTSxDQUFDLGVBQWUsQ0FBQztJQUN6QixDQUFDO0lBRUQsd0JBQXdCLENBQU0sRUFBRSxVQUFvQjtRQUNsRCxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDcEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDM0MsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsQ0FBQztRQUNELE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDcEIsQ0FBQzs7Ozs7Ozs7OztZQWxGSyxzQkFBc0IsR0FBRztnQkFDN0IsUUFBUTtnQkFDUixRQUFRO2dCQUNSLFNBQVM7Z0JBQ1QsU0FBUztnQkFDVCxTQUFTO2dCQUNULFdBQVc7Z0JBQ1gsV0FBVztnQkFDWCxTQUFTO2dCQUNULFNBQVM7Z0JBQ1QsUUFBUTtnQkFDUixTQUFTO2dCQUNULFNBQVM7Z0JBQ1QsVUFBVTthQUNYLENBQUM7WUFFSSx5QkFBeUIsR0FBRztnQkFDaEMsUUFBUTtnQkFDUixVQUFVO2dCQUNWLE1BQU07Z0JBQ04sU0FBUztnQkFDVCxhQUFhO2dCQUNiLEtBQUs7Z0JBQ0wsU0FBUztnQkFDVCxVQUFVO2dCQUNWLFNBQVM7Z0JBQ1QsUUFBUTtnQkFDUixVQUFVO2dCQUNWLE9BQU87YUFDUixDQUFDO1lBRUksMkJBQTJCLEdBQUcsQ0FBQyxjQUFjLEVBQUUsYUFBYSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBRS9FLGdCQUFnQixHQUFHLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUVyRCxnQkFBZ0IsR0FBRyxJQUFJLGdCQUFHLENBQzVCLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy93ZWJfd29ya2Vycy91aS9ldmVudF9zZXJpYWxpemVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTZXR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge2lzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuY29uc3QgTU9VU0VfRVZFTlRfUFJPUEVSVElFUyA9IFtcbiAgXCJhbHRLZXlcIixcbiAgXCJidXR0b25cIixcbiAgXCJjbGllbnRYXCIsXG4gIFwiY2xpZW50WVwiLFxuICBcIm1ldGFLZXlcIixcbiAgXCJtb3ZlbWVudFhcIixcbiAgXCJtb3ZlbWVudFlcIixcbiAgXCJvZmZzZXRYXCIsXG4gIFwib2Zmc2V0WVwiLFxuICBcInJlZ2lvblwiLFxuICBcInNjcmVlblhcIixcbiAgXCJzY3JlZW5ZXCIsXG4gIFwic2hpZnRLZXlcIlxuXTtcblxuY29uc3QgS0VZQk9BUkRfRVZFTlRfUFJPUEVSVElFUyA9IFtcbiAgJ2FsdGtleScsXG4gICdjaGFyQ29kZScsXG4gICdjb2RlJyxcbiAgJ2N0cmxLZXknLFxuICAnaXNDb21wb3NpbmcnLFxuICAna2V5JyxcbiAgJ2tleUNvZGUnLFxuICAnbG9jYXRpb24nLFxuICAnbWV0YUtleScsXG4gICdyZXBlYXQnLFxuICAnc2hpZnRLZXknLFxuICAnd2hpY2gnXG5dO1xuXG5jb25zdCBUUkFOU0lUSU9OX0VWRU5UX1BST1BFUlRJRVMgPSBbJ3Byb3BlcnR5TmFtZScsICdlbGFwc2VkVGltZScsICdwc2V1ZG9FbGVtZW50J107XG5cbmNvbnN0IEVWRU5UX1BST1BFUlRJRVMgPSBbJ3R5cGUnLCAnYnViYmxlcycsICdjYW5jZWxhYmxlJ107XG5cbmNvbnN0IE5PREVTX1dJVEhfVkFMVUUgPSBuZXcgU2V0KFxuICAgIFtcImlucHV0XCIsIFwic2VsZWN0XCIsIFwib3B0aW9uXCIsIFwiYnV0dG9uXCIsIFwibGlcIiwgXCJtZXRlclwiLCBcInByb2dyZXNzXCIsIFwicGFyYW1cIiwgXCJ0ZXh0YXJlYVwiXSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemVHZW5lcmljRXZlbnQoZTogRXZlbnQpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gIHJldHVybiBzZXJpYWxpemVFdmVudChlLCBFVkVOVF9QUk9QRVJUSUVTKTtcbn1cblxuLy8gVE9ETyhqdGVwbGl0ejYwMik6IEFsbG93IHVzZXJzIHRvIHNwZWNpZnkgdGhlIHByb3BlcnRpZXMgdGhleSBuZWVkIHJhdGhlciB0aGFuIGFsd2F5c1xuLy8gYWRkaW5nIHZhbHVlIGFuZCBmaWxlcyAjMzM3NFxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZUV2ZW50V2l0aFRhcmdldChlOiBFdmVudCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgdmFyIHNlcmlhbGl6ZWRFdmVudCA9IHNlcmlhbGl6ZUV2ZW50KGUsIEVWRU5UX1BST1BFUlRJRVMpO1xuICByZXR1cm4gYWRkVGFyZ2V0KGUsIHNlcmlhbGl6ZWRFdmVudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemVNb3VzZUV2ZW50KGU6IE1vdXNlRXZlbnQpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gIHJldHVybiBzZXJpYWxpemVFdmVudChlLCBNT1VTRV9FVkVOVF9QUk9QRVJUSUVTKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZUtleWJvYXJkRXZlbnQoZTogS2V5Ym9hcmRFdmVudCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgdmFyIHNlcmlhbGl6ZWRFdmVudCA9IHNlcmlhbGl6ZUV2ZW50KGUsIEtFWUJPQVJEX0VWRU5UX1BST1BFUlRJRVMpO1xuICByZXR1cm4gYWRkVGFyZ2V0KGUsIHNlcmlhbGl6ZWRFdmVudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemVUcmFuc2l0aW9uRXZlbnQoZTogVHJhbnNpdGlvbkV2ZW50KToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICB2YXIgc2VyaWFsaXplZEV2ZW50ID0gc2VyaWFsaXplRXZlbnQoZSwgVFJBTlNJVElPTl9FVkVOVF9QUk9QRVJUSUVTKTtcbiAgcmV0dXJuIGFkZFRhcmdldChlLCBzZXJpYWxpemVkRXZlbnQpO1xufVxuXG4vLyBUT0RPKGp0ZXBsaXR6NjAyKTogIzMzNzQuIFNlZSBhYm92ZS5cbmZ1bmN0aW9uIGFkZFRhcmdldChlOiBFdmVudCwgc2VyaWFsaXplZEV2ZW50OiB7W2tleTogc3RyaW5nXTogYW55fSk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgaWYgKE5PREVTX1dJVEhfVkFMVUUuaGFzKCg8SFRNTEVsZW1lbnQ+ZS50YXJnZXQpLnRhZ05hbWUudG9Mb3dlckNhc2UoKSkpIHtcbiAgICB2YXIgdGFyZ2V0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZS50YXJnZXQ7XG4gICAgc2VyaWFsaXplZEV2ZW50Wyd0YXJnZXQnXSA9IHsndmFsdWUnOiB0YXJnZXQudmFsdWV9O1xuICAgIGlmIChpc1ByZXNlbnQodGFyZ2V0LmZpbGVzKSkge1xuICAgICAgc2VyaWFsaXplZEV2ZW50Wyd0YXJnZXQnXVsnZmlsZXMnXSA9IHRhcmdldC5maWxlcztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHNlcmlhbGl6ZWRFdmVudDtcbn1cblxuZnVuY3Rpb24gc2VyaWFsaXplRXZlbnQoZTogYW55LCBwcm9wZXJ0aWVzOiBzdHJpbmdbXSk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgdmFyIHNlcmlhbGl6ZWQgPSB7fTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHByb3AgPSBwcm9wZXJ0aWVzW2ldO1xuICAgIHNlcmlhbGl6ZWRbcHJvcF0gPSBlW3Byb3BdO1xuICB9XG4gIHJldHVybiBzZXJpYWxpemVkO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
