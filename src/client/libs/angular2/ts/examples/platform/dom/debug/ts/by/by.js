System.register(['angular2/platform/browser'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1;
    var debugElement, MyDirective;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            }],
        execute: function() {
            MyDirective = (function () {
                function MyDirective() {
                }
                return MyDirective;
            }());
            // #docregion by_all
            debugElement.query(browser_1.By.all());
            // #enddocregion
            // #docregion by_css
            debugElement.query(browser_1.By.css('[attribute]'));
            // #enddocregion
            // #docregion by_directive
            debugElement.query(browser_1.By.directive(MyDirective));
        }
    }
});
// #enddocregion

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvcGxhdGZvcm0vZG9tL2RlYnVnL3RzL2J5L2J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFHSSxZQUFZOzs7Ozs7O1lBQ2hCO2dCQUFBO2dCQUFtQixDQUFDO2dCQUFELGtCQUFDO1lBQUQsQ0FBbkIsQUFBb0IsSUFBQTtZQUVwQixvQkFBb0I7WUFDcEIsWUFBWSxDQUFDLEtBQUssQ0FBQyxZQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUM3QixnQkFBZ0I7WUFFaEIsb0JBQW9CO1lBQ3BCLFlBQVksQ0FBQyxLQUFLLENBQUMsWUFBRSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQzFDLGdCQUFnQjtZQUVoQiwwQkFBMEI7WUFDMUIsWUFBWSxDQUFDLEtBQUssQ0FBQyxZQUFFLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Ozs7QUFDOUMsZ0JBQWdCIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvcGxhdGZvcm0vZG9tL2RlYnVnL3RzL2J5L2J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCeX0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vYnJvd3Nlcic7XG5pbXBvcnQge0RlYnVnRWxlbWVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5cbnZhciBkZWJ1Z0VsZW1lbnQ6IERlYnVnRWxlbWVudDtcbmNsYXNzIE15RGlyZWN0aXZlIHt9XG5cbi8vICNkb2NyZWdpb24gYnlfYWxsXG5kZWJ1Z0VsZW1lbnQucXVlcnkoQnkuYWxsKCkpO1xuLy8gI2VuZGRvY3JlZ2lvblxuXG4vLyAjZG9jcmVnaW9uIGJ5X2Nzc1xuZGVidWdFbGVtZW50LnF1ZXJ5KEJ5LmNzcygnW2F0dHJpYnV0ZV0nKSk7XG4vLyAjZW5kZG9jcmVnaW9uXG5cbi8vICNkb2NyZWdpb24gYnlfZGlyZWN0aXZlXG5kZWJ1Z0VsZW1lbnQucXVlcnkoQnkuZGlyZWN0aXZlKE15RGlyZWN0aXZlKSk7XG4vLyAjZW5kZG9jcmVnaW9uXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
