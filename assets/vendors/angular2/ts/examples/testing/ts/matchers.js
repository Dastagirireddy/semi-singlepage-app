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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL3Rlc3RpbmcvdHMvbWF0Y2hlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQUVJLEtBQUssRUFDTCxPQUFPLEVBQ1AsU0FBUzs7Ozs7OztZQUViO2dCQUFBO2dCQUEyQixDQUFDO2dCQUFELGlCQUFDO1lBQUQsQ0FBM0IsQUFBNEIsSUFBQTtZQUM1QjtnQkFBQTtnQkFBaUIsQ0FBQztnQkFBRCxnQkFBQztZQUFELENBQWpCLEFBQWtCLElBQUE7WUFFbEIseUJBQXlCO1lBQ3pCLGdCQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDNUIsZ0JBQWdCO1lBRWhCLDhCQUE4QjtZQUM5QixnQkFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzFDLGdCQUFnQjtZQUVoQix3QkFBd0I7WUFDeEIsZ0JBQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDM0MsZ0JBQWdCO1lBRWhCLDRCQUE0QjtZQUM1QixnQkFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMxQyxnQkFBZ0I7WUFFaEIsNEJBQTRCO1lBQzVCLGdCQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsY0FBYyxDQUFDLEVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztZQUNqRSxnQkFBZ0I7WUFFaEIsNEJBQTRCO1lBQzVCLGdCQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDbkQsZ0JBQWdCO1lBRWhCLDhCQUE4QjtZQUM5QixnQkFBTSxDQUFDLGNBQVEsTUFBTSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDN0UsZ0JBQWdCO1lBRWhCLHlCQUF5QjtZQUN6QixnQkFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7OztBQUMxQyxnQkFBZ0IiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvdGVzdGluZy90cy9tYXRjaGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7ZXhwZWN0fSBmcm9tICdhbmd1bGFyMi90ZXN0aW5nJztcblxudmFyIHZhbHVlOiBhbnk7XG52YXIgZWxlbWVudDogYW55O1xudmFyIGV4Y2VwdGlvbjogYW55O1xuXG5hYnN0cmFjdCBjbGFzcyBPdGhlckNsYXNzIHt9XG5jbGFzcyBTb21lQ2xhc3Mge31cblxuLy8gI2RvY3JlZ2lvbiB0b0JlUHJvbWlzZVxuZXhwZWN0KHZhbHVlKS50b0JlUHJvbWlzZSgpO1xuLy8gI2VuZGRvY3JlZ2lvblxuXG4vLyAjZG9jcmVnaW9uIHRvQmVBbkluc3RhbmNlT2ZcbmV4cGVjdCh2YWx1ZSkudG9CZUFuSW5zdGFuY2VPZihTb21lQ2xhc3MpO1xuLy8gI2VuZGRvY3JlZ2lvblxuXG4vLyAjZG9jcmVnaW9uIHRvSGF2ZVRleHRcbmV4cGVjdChlbGVtZW50KS50b0hhdmVUZXh0KCdIZWxsbyB3b3JsZCEnKTtcbi8vICNlbmRkb2NyZWdpb25cblxuLy8gI2RvY3JlZ2lvbiB0b0hhdmVDc3NDbGFzc1xuZXhwZWN0KGVsZW1lbnQpLnRvSGF2ZUNzc0NsYXNzKCdjdXJyZW50Jyk7XG4vLyAjZW5kZG9jcmVnaW9uXG5cbi8vICNkb2NyZWdpb24gdG9IYXZlQ3NzU3R5bGVcbmV4cGVjdChlbGVtZW50KS50b0hhdmVDc3NTdHlsZSh7d2lkdGg6ICcxMDBweCcsIGhlaWdodDogJ2F1dG8nfSk7XG4vLyAjZW5kZG9jcmVnaW9uXG5cbi8vICNkb2NyZWdpb24gdG9Db250YWluRXJyb3JcbmV4cGVjdChleGNlcHRpb24pLnRvQ29udGFpbkVycm9yKCdGYWlsZWQgdG8gbG9hZCcpO1xuLy8gI2VuZGRvY3JlZ2lvblxuXG4vLyAjZG9jcmVnaW9uIHRvVGhyb3dFcnJvcldpdGhcbmV4cGVjdCgoKSA9PiB7IHRocm93ICdGYWlsZWQgdG8gbG9hZCc7IH0pLnRvVGhyb3dFcnJvcldpdGgoJ0ZhaWxlZCB0byBsb2FkJyk7XG4vLyAjZW5kZG9jcmVnaW9uXG5cbi8vICNkb2NyZWdpb24gdG9JbXBsZW1lbnRcbmV4cGVjdChTb21lQ2xhc3MpLnRvSW1wbGVtZW50KE90aGVyQ2xhc3MpO1xuLy8gI2VuZGRvY3JlZ2lvblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
