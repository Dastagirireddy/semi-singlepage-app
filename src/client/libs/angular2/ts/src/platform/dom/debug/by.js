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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL2RvbS9kZWJ1Zy9ieS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztZQUtBOztlQUVHO1lBQ0g7Z0JBQUE7Z0JBbUNBLENBQUM7Z0JBbENDOzs7Ozs7bUJBTUc7Z0JBQ0ksTUFBRyxHQUFWLGNBQXdDLE1BQU0sQ0FBQyxVQUFDLFlBQVksSUFBSyxPQUFBLElBQUksRUFBSixDQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUV4RTs7Ozs7O21CQU1HO2dCQUNJLE1BQUcsR0FBVixVQUFXLFFBQWdCO29CQUN6QixNQUFNLENBQUMsVUFBQyxZQUFZO3dCQUNsQixNQUFNLENBQUMsZ0JBQVMsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDOzRCQUNqQyxpQkFBRyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQzs0QkFDeEQsS0FBSyxDQUFDO29CQUNuQixDQUFDLENBQUM7Z0JBQ0osQ0FBQztnQkFFRDs7Ozs7O21CQU1HO2dCQUNJLFlBQVMsR0FBaEIsVUFBaUIsSUFBVTtvQkFDekIsTUFBTSxDQUFDLFVBQUMsWUFBWSxJQUFPLE1BQU0sQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEYsQ0FBQztnQkFDSCxTQUFDO1lBQUQsQ0FuQ0EsQUFtQ0MsSUFBQTtZQW5DRCxtQkFtQ0MsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9kb20vZGVidWcvYnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1R5cGUsIGlzUHJlc2VudCwgaXNCbGFua30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7UHJlZGljYXRlfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtET019IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZG9tX2FkYXB0ZXInO1xuaW1wb3J0IHtEZWJ1Z0VsZW1lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuXG4vKipcbiAqIFByZWRpY2F0ZXMgZm9yIHVzZSB3aXRoIHtAbGluayBEZWJ1Z0VsZW1lbnR9J3MgcXVlcnkgZnVuY3Rpb25zLlxuICovXG5leHBvcnQgY2xhc3MgQnkge1xuICAvKipcbiAgICogTWF0Y2ggYWxsIGVsZW1lbnRzLlxuICAgKlxuICAgKiAjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSBwbGF0Zm9ybS9kb20vZGVidWcvdHMvYnkvYnkudHMgcmVnaW9uPSdieV9hbGwnfVxuICAgKi9cbiAgc3RhdGljIGFsbCgpOiBQcmVkaWNhdGU8RGVidWdFbGVtZW50PiB7IHJldHVybiAoZGVidWdFbGVtZW50KSA9PiB0cnVlOyB9XG5cbiAgLyoqXG4gICAqIE1hdGNoIGVsZW1lbnRzIGJ5IHRoZSBnaXZlbiBDU1Mgc2VsZWN0b3IuXG4gICAqXG4gICAqICMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIHBsYXRmb3JtL2RvbS9kZWJ1Zy90cy9ieS9ieS50cyByZWdpb249J2J5X2Nzcyd9XG4gICAqL1xuICBzdGF0aWMgY3NzKHNlbGVjdG9yOiBzdHJpbmcpOiBQcmVkaWNhdGU8RGVidWdFbGVtZW50PiB7XG4gICAgcmV0dXJuIChkZWJ1Z0VsZW1lbnQpID0+IHtcbiAgICAgIHJldHVybiBpc1ByZXNlbnQoZGVidWdFbGVtZW50Lm5hdGl2ZUVsZW1lbnQpID9cbiAgICAgICAgICAgICAgICAgRE9NLmVsZW1lbnRNYXRjaGVzKGRlYnVnRWxlbWVudC5uYXRpdmVFbGVtZW50LCBzZWxlY3RvcikgOlxuICAgICAgICAgICAgICAgICBmYWxzZTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIE1hdGNoIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgZ2l2ZW4gZGlyZWN0aXZlIHByZXNlbnQuXG4gICAqXG4gICAqICMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIHBsYXRmb3JtL2RvbS9kZWJ1Zy90cy9ieS9ieS50cyByZWdpb249J2J5X2RpcmVjdGl2ZSd9XG4gICAqL1xuICBzdGF0aWMgZGlyZWN0aXZlKHR5cGU6IFR5cGUpOiBQcmVkaWNhdGU8RGVidWdFbGVtZW50PiB7XG4gICAgcmV0dXJuIChkZWJ1Z0VsZW1lbnQpID0+IHsgcmV0dXJuIGRlYnVnRWxlbWVudC5wcm92aWRlclRva2Vucy5pbmRleE9mKHR5cGUpICE9PSAtMTsgfTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
