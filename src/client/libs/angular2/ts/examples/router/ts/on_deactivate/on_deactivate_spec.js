System.register(['angular2/src/testing/e2e_util', 'angular2/testing'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var e2e_util_1, testing_1;
    function waitForElement(selector) {
        var EC = protractor.ExpectedConditions;
        // Waits for the element with id 'abc' to be present on the dom.
        e2e_util_1.browser.wait(EC.presenceOf($(selector)), 20000);
    }
    return {
        setters:[
            function (e2e_util_1_1) {
                e2e_util_1 = e2e_util_1_1;
            },
            function (testing_1_1) {
                testing_1 = testing_1_1;
            }],
        execute: function() {
            describe('on activate example app', function () {
                afterEach(e2e_util_1.verifyNoBrowserErrors);
                var URL = 'angular2/examples/router/ts/on_deactivate/';
                it('should update the text when navigating between routes', function () {
                    e2e_util_1.browser.get(URL);
                    waitForElement('my-cmp');
                    testing_1.expect(element(by.css('#log')).getText()).toEqual('Log:');
                    element(by.css('#param-link')).click();
                    waitForElement('my-cmp');
                    testing_1.expect(element(by.css('#log')).getText()).toEqual('Log:\nNavigating from "" to "1"');
                    e2e_util_1.browser.navigate().back();
                    waitForElement('my-cmp');
                    testing_1.expect(element(by.css('#log')).getText())
                        .toEqual('Log:\nNavigating from "" to "1"\nNavigating from "1" to ""');
                });
            });
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvcm91dGVyL3RzL29uX2RlYWN0aXZhdGUvb25fZGVhY3RpdmF0ZV9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7SUFHQSx3QkFBd0IsUUFBZ0I7UUFDdEMsSUFBSSxFQUFFLEdBQVMsVUFBVyxDQUFDLGtCQUFrQixDQUFDO1FBQzlDLGdFQUFnRTtRQUNoRSxrQkFBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2xELENBQUM7Ozs7Ozs7Ozs7WUFFRCxRQUFRLENBQUMseUJBQXlCLEVBQUU7Z0JBQ2xDLFNBQVMsQ0FBQyxnQ0FBcUIsQ0FBQyxDQUFDO2dCQUVqQyxJQUFJLEdBQUcsR0FBRyw0Q0FBNEMsQ0FBQztnQkFFdkQsRUFBRSxDQUFDLHVEQUF1RCxFQUFFO29CQUMxRCxrQkFBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDakIsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUV6QixnQkFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBRTFELE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ3ZDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFFekIsZ0JBQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7b0JBRXJGLGtCQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQzFCLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFFekIsZ0JBQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO3lCQUNwQyxPQUFPLENBQUMsNERBQTRELENBQUMsQ0FBQztnQkFDN0UsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL3JvdXRlci90cy9vbl9kZWFjdGl2YXRlL29uX2RlYWN0aXZhdGVfc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7dmVyaWZ5Tm9Ccm93c2VyRXJyb3JzLCBicm93c2VyfSBmcm9tICdhbmd1bGFyMi9zcmMvdGVzdGluZy9lMmVfdXRpbCc7XG5pbXBvcnQge2V4cGVjdH0gZnJvbSAnYW5ndWxhcjIvdGVzdGluZyc7XG5cbmZ1bmN0aW9uIHdhaXRGb3JFbGVtZW50KHNlbGVjdG9yOiBzdHJpbmcpIHtcbiAgdmFyIEVDID0gKDxhbnk+cHJvdHJhY3RvcikuRXhwZWN0ZWRDb25kaXRpb25zO1xuICAvLyBXYWl0cyBmb3IgdGhlIGVsZW1lbnQgd2l0aCBpZCAnYWJjJyB0byBiZSBwcmVzZW50IG9uIHRoZSBkb20uXG4gIGJyb3dzZXIud2FpdChFQy5wcmVzZW5jZU9mKCQoc2VsZWN0b3IpKSwgMjAwMDApO1xufVxuXG5kZXNjcmliZSgnb24gYWN0aXZhdGUgZXhhbXBsZSBhcHAnLCBmdW5jdGlvbigpIHtcbiAgYWZ0ZXJFYWNoKHZlcmlmeU5vQnJvd3NlckVycm9ycyk7XG5cbiAgdmFyIFVSTCA9ICdhbmd1bGFyMi9leGFtcGxlcy9yb3V0ZXIvdHMvb25fZGVhY3RpdmF0ZS8nO1xuXG4gIGl0KCdzaG91bGQgdXBkYXRlIHRoZSB0ZXh0IHdoZW4gbmF2aWdhdGluZyBiZXR3ZWVuIHJvdXRlcycsIGZ1bmN0aW9uKCkge1xuICAgIGJyb3dzZXIuZ2V0KFVSTCk7XG4gICAgd2FpdEZvckVsZW1lbnQoJ215LWNtcCcpO1xuXG4gICAgZXhwZWN0KGVsZW1lbnQoYnkuY3NzKCcjbG9nJykpLmdldFRleHQoKSkudG9FcXVhbCgnTG9nOicpO1xuXG4gICAgZWxlbWVudChieS5jc3MoJyNwYXJhbS1saW5rJykpLmNsaWNrKCk7XG4gICAgd2FpdEZvckVsZW1lbnQoJ215LWNtcCcpO1xuXG4gICAgZXhwZWN0KGVsZW1lbnQoYnkuY3NzKCcjbG9nJykpLmdldFRleHQoKSkudG9FcXVhbCgnTG9nOlxcbk5hdmlnYXRpbmcgZnJvbSBcIlwiIHRvIFwiMVwiJyk7XG5cbiAgICBicm93c2VyLm5hdmlnYXRlKCkuYmFjaygpO1xuICAgIHdhaXRGb3JFbGVtZW50KCdteS1jbXAnKTtcblxuICAgIGV4cGVjdChlbGVtZW50KGJ5LmNzcygnI2xvZycpKS5nZXRUZXh0KCkpXG4gICAgICAgIC50b0VxdWFsKCdMb2c6XFxuTmF2aWdhdGluZyBmcm9tIFwiXCIgdG8gXCIxXCJcXG5OYXZpZ2F0aW5nIGZyb20gXCIxXCIgdG8gXCJcIicpO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
