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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL2Jyb3dzZXIvdGl0bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7WUFFQTs7Ozs7OztlQU9HO1lBQ0g7Z0JBQUE7Z0JBWUEsQ0FBQztnQkFYQzs7O21CQUdHO2dCQUNILHdCQUFRLEdBQVIsY0FBcUIsTUFBTSxDQUFDLGlCQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUU3Qzs7O21CQUdHO2dCQUNILHdCQUFRLEdBQVIsVUFBUyxRQUFnQixJQUFJLGlCQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEQsWUFBQztZQUFELENBWkEsQUFZQyxJQUFBO1lBWkQseUJBWUMsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9icm93c2VyL3RpdGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtET019IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZG9tX2FkYXB0ZXInO1xuXG4vKipcbiAqIEEgc2VydmljZSB0aGF0IGNhbiBiZSB1c2VkIHRvIGdldCBhbmQgc2V0IHRoZSB0aXRsZSBvZiBhIGN1cnJlbnQgSFRNTCBkb2N1bWVudC5cbiAqXG4gKiBTaW5jZSBhbiBBbmd1bGFyIDIgYXBwbGljYXRpb24gY2FuJ3QgYmUgYm9vdHN0cmFwcGVkIG9uIHRoZSBlbnRpcmUgSFRNTCBkb2N1bWVudCAoYDxodG1sPmAgdGFnKVxuICogaXQgaXMgbm90IHBvc3NpYmxlIHRvIGJpbmQgdG8gdGhlIGB0ZXh0YCBwcm9wZXJ0eSBvZiB0aGUgYEhUTUxUaXRsZUVsZW1lbnRgIGVsZW1lbnRzXG4gKiAocmVwcmVzZW50aW5nIHRoZSBgPHRpdGxlPmAgdGFnKS4gSW5zdGVhZCwgdGhpcyBzZXJ2aWNlIGNhbiBiZSB1c2VkIHRvIHNldCBhbmQgZ2V0IHRoZSBjdXJyZW50XG4gKiB0aXRsZSB2YWx1ZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFRpdGxlIHtcbiAgLyoqXG4gICAqIEdldCB0aGUgdGl0bGUgb2YgdGhlIGN1cnJlbnQgSFRNTCBkb2N1bWVudC5cbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIGdldFRpdGxlKCk6IHN0cmluZyB7IHJldHVybiBET00uZ2V0VGl0bGUoKTsgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIHRpdGxlIG9mIHRoZSBjdXJyZW50IEhUTUwgZG9jdW1lbnQuXG4gICAqIEBwYXJhbSBuZXdUaXRsZVxuICAgKi9cbiAgc2V0VGl0bGUobmV3VGl0bGU6IHN0cmluZykgeyBET00uc2V0VGl0bGUobmV3VGl0bGUpOyB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
