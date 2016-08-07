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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2kxOG4vbWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztJQWFBOztPQUVHO0lBQ0gsWUFBbUIsQ0FBVTtRQUMzQixJQUFJLE9BQU8sR0FBRyxnQkFBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNwRCxJQUFJLE9BQU8sR0FBRyxnQkFBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNwRCxNQUFNLENBQUMsYUFBTSxDQUFDLFNBQU8sT0FBTyxTQUFJLE9BQVMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFKRCxtQkFJQyxDQUFBOzs7Ozs7O1lBbEJEOzs7Ozs7ZUFNRztZQUNIO2dCQUNFLGlCQUFtQixPQUFlLEVBQVMsT0FBZSxFQUFTLFdBQTBCO29CQUFqQywyQkFBaUMsR0FBakMsa0JBQWlDO29CQUExRSxZQUFPLEdBQVAsT0FBTyxDQUFRO29CQUFTLFlBQU8sR0FBUCxPQUFPLENBQVE7b0JBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQWU7Z0JBQUcsQ0FBQztnQkFDbkcsY0FBQztZQUFELENBRkEsQUFFQyxJQUFBO1lBRkQsNkJBRUMsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9pMThuL21lc3NhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzUHJlc2VudCwgZXNjYXBlfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG4vKipcbiAqIEEgbWVzc2FnZSBleHRyYWN0ZWQgZnJvbSBhIHRlbXBsYXRlLlxuICpcbiAqIFRoZSBpZGVudGl0eSBvZiBhIG1lc3NhZ2UgaXMgY29tcHJpc2VkIG9mIGBjb250ZW50YCBhbmQgYG1lYW5pbmdgLlxuICpcbiAqIGBkZXNjcmlwdGlvbmAgaXMgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiBwcm92aWRlZCB0byB0aGUgdHJhbnNsYXRvci5cbiAqL1xuZXhwb3J0IGNsYXNzIE1lc3NhZ2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29udGVudDogc3RyaW5nLCBwdWJsaWMgbWVhbmluZzogc3RyaW5nLCBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZyA9IG51bGwpIHt9XG59XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIGlkIG9mIGEgbWVzc2FnZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaWQobTogTWVzc2FnZSk6IHN0cmluZyB7XG4gIGxldCBtZWFuaW5nID0gaXNQcmVzZW50KG0ubWVhbmluZykgPyBtLm1lYW5pbmcgOiBcIlwiO1xuICBsZXQgY29udGVudCA9IGlzUHJlc2VudChtLmNvbnRlbnQpID8gbS5jb250ZW50IDogXCJcIjtcbiAgcmV0dXJuIGVzY2FwZShgJG5nfCR7bWVhbmluZ318JHtjb250ZW50fWApO1xufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
