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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL3BsYXRmb3JtL2RvbS9kZWJ1Zy90cy9ieS9ieS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBR0ksWUFBWTs7Ozs7OztZQUNoQjtnQkFBQTtnQkFBbUIsQ0FBQztnQkFBRCxrQkFBQztZQUFELENBQW5CLEFBQW9CLElBQUE7WUFFcEIsb0JBQW9CO1lBQ3BCLFlBQVksQ0FBQyxLQUFLLENBQUMsWUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDN0IsZ0JBQWdCO1lBRWhCLG9CQUFvQjtZQUNwQixZQUFZLENBQUMsS0FBSyxDQUFDLFlBQUUsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUMxQyxnQkFBZ0I7WUFFaEIsMEJBQTBCO1lBQzFCLFlBQVksQ0FBQyxLQUFLLENBQUMsWUFBRSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOzs7O0FBQzlDLGdCQUFnQiIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9leGFtcGxlcy9wbGF0Zm9ybS9kb20vZGVidWcvdHMvYnkvYnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0J5fSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9icm93c2VyJztcbmltcG9ydCB7RGVidWdFbGVtZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcblxudmFyIGRlYnVnRWxlbWVudDogRGVidWdFbGVtZW50O1xuY2xhc3MgTXlEaXJlY3RpdmUge31cblxuLy8gI2RvY3JlZ2lvbiBieV9hbGxcbmRlYnVnRWxlbWVudC5xdWVyeShCeS5hbGwoKSk7XG4vLyAjZW5kZG9jcmVnaW9uXG5cbi8vICNkb2NyZWdpb24gYnlfY3NzXG5kZWJ1Z0VsZW1lbnQucXVlcnkoQnkuY3NzKCdbYXR0cmlidXRlXScpKTtcbi8vICNlbmRkb2NyZWdpb25cblxuLy8gI2RvY3JlZ2lvbiBieV9kaXJlY3RpdmVcbmRlYnVnRWxlbWVudC5xdWVyeShCeS5kaXJlY3RpdmUoTXlEaXJlY3RpdmUpKTtcbi8vICNlbmRkb2NyZWdpb25cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
