System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1;
    var Message;
    /**
     * Computes the id of a message
     */
    function id(m) {
        var meaning = lang_1.isPresent(m.meaning) ? m.meaning : "";
        var content = lang_1.isPresent(m.content) ? m.content : "";
        return lang_1.escape("$ng|" + meaning + "|" + content);
    }
    exports_1("id", id);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * A message extracted from a template.
             *
             * The identity of a message is comprised of `content` and `meaning`.
             *
             * `description` is additional information provided to the translator.
             */
            Message = (function () {
                function Message(content, meaning, description) {
                    if (description === void 0) { description = null; }
                    this.content = content;
                    this.meaning = meaning;
                    this.description = description;
                }
                return Message;
            }());
            exports_1("Message", Message);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9pMThuL21lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7SUFhQTs7T0FFRztJQUNILFlBQW1CLENBQVU7UUFDM0IsSUFBSSxPQUFPLEdBQUcsZ0JBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDcEQsSUFBSSxPQUFPLEdBQUcsZ0JBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDcEQsTUFBTSxDQUFDLGFBQU0sQ0FBQyxTQUFPLE9BQU8sU0FBSSxPQUFTLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBSkQsbUJBSUMsQ0FBQTs7Ozs7OztZQWxCRDs7Ozs7O2VBTUc7WUFDSDtnQkFDRSxpQkFBbUIsT0FBZSxFQUFTLE9BQWUsRUFBUyxXQUEwQjtvQkFBakMsMkJBQWlDLEdBQWpDLGtCQUFpQztvQkFBMUUsWUFBTyxHQUFQLE9BQU8sQ0FBUTtvQkFBUyxZQUFPLEdBQVAsT0FBTyxDQUFRO29CQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFlO2dCQUFHLENBQUM7Z0JBQ25HLGNBQUM7WUFBRCxDQUZBLEFBRUMsSUFBQTtZQUZELDZCQUVDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2kxOG4vbWVzc2FnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNQcmVzZW50LCBlc2NhcGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbi8qKlxuICogQSBtZXNzYWdlIGV4dHJhY3RlZCBmcm9tIGEgdGVtcGxhdGUuXG4gKlxuICogVGhlIGlkZW50aXR5IG9mIGEgbWVzc2FnZSBpcyBjb21wcmlzZWQgb2YgYGNvbnRlbnRgIGFuZCBgbWVhbmluZ2AuXG4gKlxuICogYGRlc2NyaXB0aW9uYCBpcyBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHByb3ZpZGVkIHRvIHRoZSB0cmFuc2xhdG9yLlxuICovXG5leHBvcnQgY2xhc3MgTWVzc2FnZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb250ZW50OiBzdHJpbmcsIHB1YmxpYyBtZWFuaW5nOiBzdHJpbmcsIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nID0gbnVsbCkge31cbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgaWQgb2YgYSBtZXNzYWdlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpZChtOiBNZXNzYWdlKTogc3RyaW5nIHtcbiAgbGV0IG1lYW5pbmcgPSBpc1ByZXNlbnQobS5tZWFuaW5nKSA/IG0ubWVhbmluZyA6IFwiXCI7XG4gIGxldCBjb250ZW50ID0gaXNQcmVzZW50KG0uY29udGVudCkgPyBtLmNvbnRlbnQgOiBcIlwiO1xuICByZXR1cm4gZXNjYXBlKGAkbmd8JHttZWFuaW5nfXwke2NvbnRlbnR9YCk7XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
