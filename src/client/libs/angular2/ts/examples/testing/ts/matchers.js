System.register(['angular2/testing'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var testing_1;
    var value, element, exception, OtherClass, SomeClass;
    return {
        setters:[
            function (testing_1_1) {
                testing_1 = testing_1_1;
            }],
        execute: function() {
            OtherClass = (function () {
                function OtherClass() {
                }
                return OtherClass;
            }());
            SomeClass = (function () {
                function SomeClass() {
                }
                return SomeClass;
            }());
            // #docregion toBePromise
            testing_1.expect(value).toBePromise();
            // #enddocregion
            // #docregion toBeAnInstanceOf
            testing_1.expect(value).toBeAnInstanceOf(SomeClass);
            // #enddocregion
            // #docregion toHaveText
            testing_1.expect(element).toHaveText('Hello world!');
            // #enddocregion
            // #docregion toHaveCssClass
            testing_1.expect(element).toHaveCssClass('current');
            // #enddocregion
            // #docregion toHaveCssStyle
            testing_1.expect(element).toHaveCssStyle({ width: '100px', height: 'auto' });
            // #enddocregion
            // #docregion toContainError
            testing_1.expect(exception).toContainError('Failed to load');
            // #enddocregion
            // #docregion toThrowErrorWith
            testing_1.expect(function () { throw 'Failed to load'; }).toThrowErrorWith('Failed to load');
            // #enddocregion
            // #docregion toImplement
            testing_1.expect(SomeClass).toImplement(OtherClass);
        }
    }
});
// #enddocregion

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvdGVzdGluZy90cy9tYXRjaGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBRUksS0FBSyxFQUNMLE9BQU8sRUFDUCxTQUFTOzs7Ozs7O1lBRWI7Z0JBQUE7Z0JBQTJCLENBQUM7Z0JBQUQsaUJBQUM7WUFBRCxDQUEzQixBQUE0QixJQUFBO1lBQzVCO2dCQUFBO2dCQUFpQixDQUFDO2dCQUFELGdCQUFDO1lBQUQsQ0FBakIsQUFBa0IsSUFBQTtZQUVsQix5QkFBeUI7WUFDekIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUM1QixnQkFBZ0I7WUFFaEIsOEJBQThCO1lBQzlCLGdCQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDMUMsZ0JBQWdCO1lBRWhCLHdCQUF3QjtZQUN4QixnQkFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUMzQyxnQkFBZ0I7WUFFaEIsNEJBQTRCO1lBQzVCLGdCQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzFDLGdCQUFnQjtZQUVoQiw0QkFBNEI7WUFDNUIsZ0JBQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxjQUFjLENBQUMsRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO1lBQ2pFLGdCQUFnQjtZQUVoQiw0QkFBNEI7WUFDNUIsZ0JBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNuRCxnQkFBZ0I7WUFFaEIsOEJBQThCO1lBQzlCLGdCQUFNLENBQUMsY0FBUSxNQUFNLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUM3RSxnQkFBZ0I7WUFFaEIseUJBQXlCO1lBQ3pCLGdCQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDOzs7O0FBQzFDLGdCQUFnQiIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL3Rlc3RpbmcvdHMvbWF0Y2hlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2V4cGVjdH0gZnJvbSAnYW5ndWxhcjIvdGVzdGluZyc7XG5cbnZhciB2YWx1ZTogYW55O1xudmFyIGVsZW1lbnQ6IGFueTtcbnZhciBleGNlcHRpb246IGFueTtcblxuYWJzdHJhY3QgY2xhc3MgT3RoZXJDbGFzcyB7fVxuY2xhc3MgU29tZUNsYXNzIHt9XG5cbi8vICNkb2NyZWdpb24gdG9CZVByb21pc2VcbmV4cGVjdCh2YWx1ZSkudG9CZVByb21pc2UoKTtcbi8vICNlbmRkb2NyZWdpb25cblxuLy8gI2RvY3JlZ2lvbiB0b0JlQW5JbnN0YW5jZU9mXG5leHBlY3QodmFsdWUpLnRvQmVBbkluc3RhbmNlT2YoU29tZUNsYXNzKTtcbi8vICNlbmRkb2NyZWdpb25cblxuLy8gI2RvY3JlZ2lvbiB0b0hhdmVUZXh0XG5leHBlY3QoZWxlbWVudCkudG9IYXZlVGV4dCgnSGVsbG8gd29ybGQhJyk7XG4vLyAjZW5kZG9jcmVnaW9uXG5cbi8vICNkb2NyZWdpb24gdG9IYXZlQ3NzQ2xhc3NcbmV4cGVjdChlbGVtZW50KS50b0hhdmVDc3NDbGFzcygnY3VycmVudCcpO1xuLy8gI2VuZGRvY3JlZ2lvblxuXG4vLyAjZG9jcmVnaW9uIHRvSGF2ZUNzc1N0eWxlXG5leHBlY3QoZWxlbWVudCkudG9IYXZlQ3NzU3R5bGUoe3dpZHRoOiAnMTAwcHgnLCBoZWlnaHQ6ICdhdXRvJ30pO1xuLy8gI2VuZGRvY3JlZ2lvblxuXG4vLyAjZG9jcmVnaW9uIHRvQ29udGFpbkVycm9yXG5leHBlY3QoZXhjZXB0aW9uKS50b0NvbnRhaW5FcnJvcignRmFpbGVkIHRvIGxvYWQnKTtcbi8vICNlbmRkb2NyZWdpb25cblxuLy8gI2RvY3JlZ2lvbiB0b1Rocm93RXJyb3JXaXRoXG5leHBlY3QoKCkgPT4geyB0aHJvdyAnRmFpbGVkIHRvIGxvYWQnOyB9KS50b1Rocm93RXJyb3JXaXRoKCdGYWlsZWQgdG8gbG9hZCcpO1xuLy8gI2VuZGRvY3JlZ2lvblxuXG4vLyAjZG9jcmVnaW9uIHRvSW1wbGVtZW50XG5leHBlY3QoU29tZUNsYXNzKS50b0ltcGxlbWVudChPdGhlckNsYXNzKTtcbi8vICNlbmRkb2NyZWdpb25cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
