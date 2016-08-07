System.register(['angular2/src/facade/lang', 'angular2/src/platform/dom/dom_adapter'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, dom_adapter_1;
    var By;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            }],
        execute: function() {
            /**
             * Predicates for use with {@link DebugElement}'s query functions.
             */
            By = (function () {
                function By() {
                }
                /**
                 * Match all elements.
                 *
                 * ## Example
                 *
                 * {@example platform/dom/debug/ts/by/by.ts region='by_all'}
                 */
                By.all = function () { return function (debugElement) { return true; }; };
                /**
                 * Match elements by the given CSS selector.
                 *
                 * ## Example
                 *
                 * {@example platform/dom/debug/ts/by/by.ts region='by_css'}
                 */
                By.css = function (selector) {
                    return function (debugElement) {
                        return lang_1.isPresent(debugElement.nativeElement) ?
                            dom_adapter_1.DOM.elementMatches(debugElement.nativeElement, selector) :
                            false;
                    };
                };
                /**
                 * Match elements that have the given directive present.
                 *
                 * ## Example
                 *
                 * {@example platform/dom/debug/ts/by/by.ts region='by_directive'}
                 */
                By.directive = function (type) {
                    return function (debugElement) { return debugElement.providerTokens.indexOf(type) !== -1; };
                };
                return By;
            }());
            exports_1("By", By);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9kb20vZGVidWcvYnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7WUFLQTs7ZUFFRztZQUNIO2dCQUFBO2dCQW1DQSxDQUFDO2dCQWxDQzs7Ozs7O21CQU1HO2dCQUNJLE1BQUcsR0FBVixjQUF3QyxNQUFNLENBQUMsVUFBQyxZQUFZLElBQUssT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDLENBQUMsQ0FBQztnQkFFeEU7Ozs7OzttQkFNRztnQkFDSSxNQUFHLEdBQVYsVUFBVyxRQUFnQjtvQkFDekIsTUFBTSxDQUFDLFVBQUMsWUFBWTt3QkFDbEIsTUFBTSxDQUFDLGdCQUFTLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQzs0QkFDakMsaUJBQUcsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUM7NEJBQ3hELEtBQUssQ0FBQztvQkFDbkIsQ0FBQyxDQUFDO2dCQUNKLENBQUM7Z0JBRUQ7Ozs7OzttQkFNRztnQkFDSSxZQUFTLEdBQWhCLFVBQWlCLElBQVU7b0JBQ3pCLE1BQU0sQ0FBQyxVQUFDLFlBQVksSUFBTyxNQUFNLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hGLENBQUM7Z0JBQ0gsU0FBQztZQUFELENBbkNBLEFBbUNDLElBQUE7WUFuQ0QsbUJBbUNDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL2RvbS9kZWJ1Zy9ieS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VHlwZSwgaXNQcmVzZW50LCBpc0JsYW5rfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtQcmVkaWNhdGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge0RPTX0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fYWRhcHRlcic7XG5pbXBvcnQge0RlYnVnRWxlbWVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5cbi8qKlxuICogUHJlZGljYXRlcyBmb3IgdXNlIHdpdGgge0BsaW5rIERlYnVnRWxlbWVudH0ncyBxdWVyeSBmdW5jdGlvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBCeSB7XG4gIC8qKlxuICAgKiBNYXRjaCBhbGwgZWxlbWVudHMuXG4gICAqXG4gICAqICMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIHBsYXRmb3JtL2RvbS9kZWJ1Zy90cy9ieS9ieS50cyByZWdpb249J2J5X2FsbCd9XG4gICAqL1xuICBzdGF0aWMgYWxsKCk6IFByZWRpY2F0ZTxEZWJ1Z0VsZW1lbnQ+IHsgcmV0dXJuIChkZWJ1Z0VsZW1lbnQpID0+IHRydWU7IH1cblxuICAvKipcbiAgICogTWF0Y2ggZWxlbWVudHMgYnkgdGhlIGdpdmVuIENTUyBzZWxlY3Rvci5cbiAgICpcbiAgICogIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgcGxhdGZvcm0vZG9tL2RlYnVnL3RzL2J5L2J5LnRzIHJlZ2lvbj0nYnlfY3NzJ31cbiAgICovXG4gIHN0YXRpYyBjc3Moc2VsZWN0b3I6IHN0cmluZyk6IFByZWRpY2F0ZTxEZWJ1Z0VsZW1lbnQ+IHtcbiAgICByZXR1cm4gKGRlYnVnRWxlbWVudCkgPT4ge1xuICAgICAgcmV0dXJuIGlzUHJlc2VudChkZWJ1Z0VsZW1lbnQubmF0aXZlRWxlbWVudCkgP1xuICAgICAgICAgICAgICAgICBET00uZWxlbWVudE1hdGNoZXMoZGVidWdFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIHNlbGVjdG9yKSA6XG4gICAgICAgICAgICAgICAgIGZhbHNlO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogTWF0Y2ggZWxlbWVudHMgdGhhdCBoYXZlIHRoZSBnaXZlbiBkaXJlY3RpdmUgcHJlc2VudC5cbiAgICpcbiAgICogIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgcGxhdGZvcm0vZG9tL2RlYnVnL3RzL2J5L2J5LnRzIHJlZ2lvbj0nYnlfZGlyZWN0aXZlJ31cbiAgICovXG4gIHN0YXRpYyBkaXJlY3RpdmUodHlwZTogVHlwZSk6IFByZWRpY2F0ZTxEZWJ1Z0VsZW1lbnQ+IHtcbiAgICByZXR1cm4gKGRlYnVnRWxlbWVudCkgPT4geyByZXR1cm4gZGVidWdFbGVtZW50LnByb3ZpZGVyVG9rZW5zLmluZGV4T2YodHlwZSkgIT09IC0xOyB9O1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
