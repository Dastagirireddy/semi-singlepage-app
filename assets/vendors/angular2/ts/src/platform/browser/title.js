System.register(['angular2/src/platform/dom/dom_adapter'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var dom_adapter_1;
    var Title;
    return {
        setters:[
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            }],
        execute: function() {
            /**
             * A service that can be used to get and set the title of a current HTML document.
             *
             * Since an Angular 2 application can't be bootstrapped on the entire HTML document (`<html>` tag)
             * it is not possible to bind to the `text` property of the `HTMLTitleElement` elements
             * (representing the `<title>` tag). Instead, this service can be used to set and get the current
             * title value.
             */
            Title = (function () {
                function Title() {
                }
                /**
                 * Get the title of the current HTML document.
                 * @returns {string}
                 */
                Title.prototype.getTitle = function () { return dom_adapter_1.DOM.getTitle(); };
                /**
                 * Set the title of the current HTML document.
                 * @param newTitle
                 */
                Title.prototype.setTitle = function (newTitle) { dom_adapter_1.DOM.setTitle(newTitle); };
                return Title;
            }());
            exports_1("Title", Title);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9icm93c2VyL3RpdGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O1lBRUE7Ozs7Ozs7ZUFPRztZQUNIO2dCQUFBO2dCQVlBLENBQUM7Z0JBWEM7OzttQkFHRztnQkFDSCx3QkFBUSxHQUFSLGNBQXFCLE1BQU0sQ0FBQyxpQkFBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFN0M7OzttQkFHRztnQkFDSCx3QkFBUSxHQUFSLFVBQVMsUUFBZ0IsSUFBSSxpQkFBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hELFlBQUM7WUFBRCxDQVpBLEFBWUMsSUFBQTtZQVpELHlCQVlDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL2Jyb3dzZXIvdGl0bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RPTX0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fYWRhcHRlcic7XG5cbi8qKlxuICogQSBzZXJ2aWNlIHRoYXQgY2FuIGJlIHVzZWQgdG8gZ2V0IGFuZCBzZXQgdGhlIHRpdGxlIG9mIGEgY3VycmVudCBIVE1MIGRvY3VtZW50LlxuICpcbiAqIFNpbmNlIGFuIEFuZ3VsYXIgMiBhcHBsaWNhdGlvbiBjYW4ndCBiZSBib290c3RyYXBwZWQgb24gdGhlIGVudGlyZSBIVE1MIGRvY3VtZW50IChgPGh0bWw+YCB0YWcpXG4gKiBpdCBpcyBub3QgcG9zc2libGUgdG8gYmluZCB0byB0aGUgYHRleHRgIHByb3BlcnR5IG9mIHRoZSBgSFRNTFRpdGxlRWxlbWVudGAgZWxlbWVudHNcbiAqIChyZXByZXNlbnRpbmcgdGhlIGA8dGl0bGU+YCB0YWcpLiBJbnN0ZWFkLCB0aGlzIHNlcnZpY2UgY2FuIGJlIHVzZWQgdG8gc2V0IGFuZCBnZXQgdGhlIGN1cnJlbnRcbiAqIHRpdGxlIHZhbHVlLlxuICovXG5leHBvcnQgY2xhc3MgVGl0bGUge1xuICAvKipcbiAgICogR2V0IHRoZSB0aXRsZSBvZiB0aGUgY3VycmVudCBIVE1MIGRvY3VtZW50LlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0VGl0bGUoKTogc3RyaW5nIHsgcmV0dXJuIERPTS5nZXRUaXRsZSgpOyB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgdGl0bGUgb2YgdGhlIGN1cnJlbnQgSFRNTCBkb2N1bWVudC5cbiAgICogQHBhcmFtIG5ld1RpdGxlXG4gICAqL1xuICBzZXRUaXRsZShuZXdUaXRsZTogc3RyaW5nKSB7IERPTS5zZXRUaXRsZShuZXdUaXRsZSk7IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
