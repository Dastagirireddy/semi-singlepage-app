System.register(['../facade/lang', '../facade/exceptions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, exceptions_1;
    function assertArrayOfStrings(identifier, value) {
        if (!lang_1.assertionsEnabled() || lang_1.isBlank(value)) {
            return;
        }
        if (!lang_1.isArray(value)) {
            throw new exceptions_1.BaseException("Expected '" + identifier + "' to be an array of strings.");
        }
        for (var i = 0; i < value.length; i += 1) {
            if (!lang_1.isString(value[i])) {
                throw new exceptions_1.BaseException("Expected '" + identifier + "' to be an array of strings.");
            }
        }
    }
    exports_1("assertArrayOfStrings", assertArrayOfStrings);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9hc3NlcnRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7SUFHQSw4QkFBcUMsVUFBa0IsRUFBRSxLQUFVO1FBQ2pFLEVBQUUsQ0FBQyxDQUFDLENBQUMsd0JBQWlCLEVBQUUsSUFBSSxjQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sQ0FBQztRQUNULENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsTUFBTSxJQUFJLDBCQUFhLENBQUMsZUFBYSxVQUFVLGlDQUE4QixDQUFDLENBQUM7UUFDakYsQ0FBQztRQUNELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDekMsRUFBRSxDQUFDLENBQUMsQ0FBQyxlQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixNQUFNLElBQUksMEJBQWEsQ0FBQyxlQUFhLFVBQVUsaUNBQThCLENBQUMsQ0FBQztZQUNqRixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFaRCx1REFZQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9hc3NlcnRpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc0FycmF5LCBpc1N0cmluZywgaXNCbGFuaywgYXNzZXJ0aW9uc0VuYWJsZWR9IGZyb20gJy4uL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnLi4vZmFjYWRlL2V4Y2VwdGlvbnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0QXJyYXlPZlN0cmluZ3MoaWRlbnRpZmllcjogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gIGlmICghYXNzZXJ0aW9uc0VuYWJsZWQoKSB8fCBpc0JsYW5rKHZhbHVlKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIWlzQXJyYXkodmFsdWUpKSB7XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYEV4cGVjdGVkICcke2lkZW50aWZpZXJ9JyB0byBiZSBhbiBhcnJheSBvZiBzdHJpbmdzLmApO1xuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAoIWlzU3RyaW5nKHZhbHVlW2ldKSkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYEV4cGVjdGVkICcke2lkZW50aWZpZXJ9JyB0byBiZSBhbiBhcnJheSBvZiBzdHJpbmdzLmApO1xuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
