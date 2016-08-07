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
            describe('reuse example app', function () {
                afterEach(e2e_util_1.verifyNoBrowserErrors);
                var URL = 'angular2/examples/router/ts/can_activate/';
                it('should navigate to user 1', function () {
                    e2e_util_1.browser.get(URL);
                    waitForElement('home-cmp');
                    element(by.css('#user-1-link')).click();
                    waitForElement('control-panel-cmp');
                    testing_1.expect(e2e_util_1.browser.getCurrentUrl()).toMatch(/\/user-settings\/1$/);
                    testing_1.expect(element(by.css('control-panel-cmp')).getText()).toContain('Settings');
                });
                it('should not navigate to user 2', function () {
                    e2e_util_1.browser.get(URL);
                    waitForElement('home-cmp');
                    element(by.css('#user-2-link')).click();
                    waitForElement('home-cmp');
                    testing_1.expect(element(by.css('home-cmp')).getText()).toContain('Welcome Home!');
                });
            });
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL3JvdXRlci90cy9jYW5fYWN0aXZhdGUvY2FuX2FjdGl2YXRlX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQUdBLHdCQUF3QixRQUFnQjtRQUN0QyxJQUFJLEVBQUUsR0FBUyxVQUFXLENBQUMsa0JBQWtCLENBQUM7UUFDOUMsZ0VBQWdFO1FBQ2hFLGtCQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbEQsQ0FBQzs7Ozs7Ozs7OztZQUVELFFBQVEsQ0FBQyxtQkFBbUIsRUFBRTtnQkFFNUIsU0FBUyxDQUFDLGdDQUFxQixDQUFDLENBQUM7Z0JBRWpDLElBQUksR0FBRyxHQUFHLDJDQUEyQyxDQUFDO2dCQUV0RCxFQUFFLENBQUMsMkJBQTJCLEVBQUU7b0JBQzlCLGtCQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNqQixjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBRTNCLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ3hDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO29CQUNwQyxnQkFBTSxDQUFDLGtCQUFPLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztvQkFFL0QsZ0JBQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQy9FLENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQywrQkFBK0IsRUFBRTtvQkFDbEMsa0JBQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2pCLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFFM0IsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDeEMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUUzQixnQkFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQzNFLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvcm91dGVyL3RzL2Nhbl9hY3RpdmF0ZS9jYW5fYWN0aXZhdGVfc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7dmVyaWZ5Tm9Ccm93c2VyRXJyb3JzLCBicm93c2VyfSBmcm9tICdhbmd1bGFyMi9zcmMvdGVzdGluZy9lMmVfdXRpbCc7XG5pbXBvcnQge2V4cGVjdH0gZnJvbSAnYW5ndWxhcjIvdGVzdGluZyc7XG5cbmZ1bmN0aW9uIHdhaXRGb3JFbGVtZW50KHNlbGVjdG9yOiBzdHJpbmcpIHtcbiAgdmFyIEVDID0gKDxhbnk+cHJvdHJhY3RvcikuRXhwZWN0ZWRDb25kaXRpb25zO1xuICAvLyBXYWl0cyBmb3IgdGhlIGVsZW1lbnQgd2l0aCBpZCAnYWJjJyB0byBiZSBwcmVzZW50IG9uIHRoZSBkb20uXG4gIGJyb3dzZXIud2FpdChFQy5wcmVzZW5jZU9mKCQoc2VsZWN0b3IpKSwgMjAwMDApO1xufVxuXG5kZXNjcmliZSgncmV1c2UgZXhhbXBsZSBhcHAnLCBmdW5jdGlvbigpIHtcblxuICBhZnRlckVhY2godmVyaWZ5Tm9Ccm93c2VyRXJyb3JzKTtcblxuICB2YXIgVVJMID0gJ2FuZ3VsYXIyL2V4YW1wbGVzL3JvdXRlci90cy9jYW5fYWN0aXZhdGUvJztcblxuICBpdCgnc2hvdWxkIG5hdmlnYXRlIHRvIHVzZXIgMScsIGZ1bmN0aW9uKCkge1xuICAgIGJyb3dzZXIuZ2V0KFVSTCk7XG4gICAgd2FpdEZvckVsZW1lbnQoJ2hvbWUtY21wJyk7XG5cbiAgICBlbGVtZW50KGJ5LmNzcygnI3VzZXItMS1saW5rJykpLmNsaWNrKCk7XG4gICAgd2FpdEZvckVsZW1lbnQoJ2NvbnRyb2wtcGFuZWwtY21wJyk7XG4gICAgZXhwZWN0KGJyb3dzZXIuZ2V0Q3VycmVudFVybCgpKS50b01hdGNoKC9cXC91c2VyLXNldHRpbmdzXFwvMSQvKTtcblxuICAgIGV4cGVjdChlbGVtZW50KGJ5LmNzcygnY29udHJvbC1wYW5lbC1jbXAnKSkuZ2V0VGV4dCgpKS50b0NvbnRhaW4oJ1NldHRpbmdzJyk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgbm90IG5hdmlnYXRlIHRvIHVzZXIgMicsIGZ1bmN0aW9uKCkge1xuICAgIGJyb3dzZXIuZ2V0KFVSTCk7XG4gICAgd2FpdEZvckVsZW1lbnQoJ2hvbWUtY21wJyk7XG5cbiAgICBlbGVtZW50KGJ5LmNzcygnI3VzZXItMi1saW5rJykpLmNsaWNrKCk7XG4gICAgd2FpdEZvckVsZW1lbnQoJ2hvbWUtY21wJyk7XG5cbiAgICBleHBlY3QoZWxlbWVudChieS5jc3MoJ2hvbWUtY21wJykpLmdldFRleHQoKSkudG9Db250YWluKCdXZWxjb21lIEhvbWUhJyk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
