System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1;
    var trace, events;
    function detectWTF() {
        var wtf = lang_1.global['wtf'];
        if (wtf) {
            trace = wtf['trace'];
            if (trace) {
                events = trace['events'];
                return true;
            }
        }
        return false;
    }
    exports_1("detectWTF", detectWTF);
    function createScope(signature, flags) {
        if (flags === void 0) { flags = null; }
        return events.createScope(signature, flags);
    }
    exports_1("createScope", createScope);
    function leave(scope, returnValue) {
        trace.leaveScope(scope, returnValue);
        return returnValue;
    }
    exports_1("leave", leave);
    function startTimeRange(rangeType, action) {
        return trace.beginTimeRange(rangeType, action);
    }
    exports_1("startTimeRange", startTimeRange);
    function endTimeRange(range) {
        trace.endTimeRange(range);
    }
    exports_1("endTimeRange", endTimeRange);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvcHJvZmlsZS93dGZfaW1wbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBMEJJLEtBQUssRUFDTCxNQUFNO0lBRVY7UUFDRSxJQUFJLEdBQUcsR0FBUSxhQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNSLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDckIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDVixNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2QsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQVZELGlDQVVDLENBQUE7SUFFRCxxQkFBNEIsU0FBaUIsRUFBRSxLQUFpQjtRQUFqQixxQkFBaUIsR0FBakIsWUFBaUI7UUFDOUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFGRCxxQ0FFQyxDQUFBO0lBRUQsZUFBeUIsS0FBWSxFQUFFLFdBQWU7UUFDcEQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDckMsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBSEQseUJBR0MsQ0FBQTtJQUVELHdCQUErQixTQUFpQixFQUFFLE1BQWM7UUFDOUQsTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFGRCwyQ0FFQyxDQUFBO0lBRUQsc0JBQTZCLEtBQVk7UUFDdkMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRkQsdUNBRUMsQ0FBQTs7Ozs7OztZQTdCa0IiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29yZS9wcm9maWxlL3d0Zl9pbXBsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtnbG9iYWx9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbi8qKlxuICogQSBzY29wZSBmdW5jdGlvbiBmb3IgdGhlIFdlYiBUcmFjaW5nIEZyYW1ld29yayAoV1RGKS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBXdGZTY29wZUZuIHsgKGFyZzA/OiBhbnksIGFyZzE/OiBhbnkpOiBhbnk7IH1cblxuaW50ZXJmYWNlIFdURiB7XG4gIHRyYWNlOiBUcmFjZTtcbn1cblxuaW50ZXJmYWNlIFRyYWNlIHtcbiAgZXZlbnRzOiBFdmVudHM7XG4gIGxlYXZlU2NvcGUoc2NvcGU6IFNjb3BlLCByZXR1cm5WYWx1ZTogYW55KTtcbiAgYmVnaW5UaW1lUmFuZ2UocmFuZ2VUeXBlOiBzdHJpbmcsIGFjdGlvbjogc3RyaW5nKTogUmFuZ2U7XG4gIGVuZFRpbWVSYW5nZShyYW5nZTogUmFuZ2UpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJhbmdlIHt9XG5cbmludGVyZmFjZSBFdmVudHMge1xuICBjcmVhdGVTY29wZShzaWduYXR1cmU6IHN0cmluZywgZmxhZ3M6IGFueSk6IFNjb3BlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNjb3BlIHsgKC4uLmFyZ3MpOiBhbnk7IH1cblxudmFyIHRyYWNlOiBUcmFjZTtcbnZhciBldmVudHM6IEV2ZW50cztcblxuZXhwb3J0IGZ1bmN0aW9uIGRldGVjdFdURigpOiBib29sZWFuIHtcbiAgdmFyIHd0ZjogV1RGID0gZ2xvYmFsWyd3dGYnXTtcbiAgaWYgKHd0Zikge1xuICAgIHRyYWNlID0gd3RmWyd0cmFjZSddO1xuICAgIGlmICh0cmFjZSkge1xuICAgICAgZXZlbnRzID0gdHJhY2VbJ2V2ZW50cyddO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNjb3BlKHNpZ25hdHVyZTogc3RyaW5nLCBmbGFnczogYW55ID0gbnVsbCk6IGFueSB7XG4gIHJldHVybiBldmVudHMuY3JlYXRlU2NvcGUoc2lnbmF0dXJlLCBmbGFncyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsZWF2ZTxUPihzY29wZTogU2NvcGUsIHJldHVyblZhbHVlPzogVCk6IFQge1xuICB0cmFjZS5sZWF2ZVNjb3BlKHNjb3BlLCByZXR1cm5WYWx1ZSk7XG4gIHJldHVybiByZXR1cm5WYWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0VGltZVJhbmdlKHJhbmdlVHlwZTogc3RyaW5nLCBhY3Rpb246IHN0cmluZyk6IFJhbmdlIHtcbiAgcmV0dXJuIHRyYWNlLmJlZ2luVGltZVJhbmdlKHJhbmdlVHlwZSwgYWN0aW9uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuZFRpbWVSYW5nZShyYW5nZTogUmFuZ2UpOiB2b2lkIHtcbiAgdHJhY2UuZW5kVGltZVJhbmdlKHJhbmdlKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
