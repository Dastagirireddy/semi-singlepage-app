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
                var URL = 'angular2/examples/router/ts/reuse/';
                it('should build a link which points to the detail page', function () {
                    e2e_util_1.browser.get(URL);
                    waitForElement('my-cmp');
                    element(by.css('#naomi-link')).click();
                    waitForElement('my-cmp');
                    testing_1.expect(e2e_util_1.browser.getCurrentUrl()).toMatch(/\/naomi$/);
                    // type something into input
                    element(by.css('#message')).sendKeys('long time no see!');
                    // navigate to Brad
                    element(by.css('#brad-link')).click();
                    waitForElement('my-cmp');
                    testing_1.expect(e2e_util_1.browser.getCurrentUrl()).toMatch(/\/brad$/);
                    // check that typed input is the same
                    testing_1.expect(element(by.css('#message')).getAttribute('value')).toEqual('long time no see!');
                });
            });
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL3JvdXRlci90cy9yZXVzZS9yZXVzZV9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7SUFHQSx3QkFBd0IsUUFBZ0I7UUFDdEMsSUFBSSxFQUFFLEdBQVMsVUFBVyxDQUFDLGtCQUFrQixDQUFDO1FBQzlDLGdFQUFnRTtRQUNoRSxrQkFBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2xELENBQUM7Ozs7Ozs7Ozs7WUFFRCxRQUFRLENBQUMsbUJBQW1CLEVBQUU7Z0JBRTVCLFNBQVMsQ0FBQyxnQ0FBcUIsQ0FBQyxDQUFDO2dCQUVqQyxJQUFJLEdBQUcsR0FBRyxvQ0FBb0MsQ0FBQztnQkFFL0MsRUFBRSxDQUFDLHFEQUFxRCxFQUFFO29CQUN4RCxrQkFBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDakIsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUV6QixPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUN2QyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3pCLGdCQUFNLENBQUMsa0JBQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFFcEQsNEJBQTRCO29CQUM1QixPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO29CQUUxRCxtQkFBbUI7b0JBQ25CLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ3RDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDekIsZ0JBQU0sQ0FBQyxrQkFBTyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUVuRCxxQ0FBcUM7b0JBQ3JDLGdCQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztnQkFDekYsQ0FBQyxDQUFDLENBQUM7WUFFTCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9leGFtcGxlcy9yb3V0ZXIvdHMvcmV1c2UvcmV1c2Vfc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7dmVyaWZ5Tm9Ccm93c2VyRXJyb3JzLCBicm93c2VyfSBmcm9tICdhbmd1bGFyMi9zcmMvdGVzdGluZy9lMmVfdXRpbCc7XG5pbXBvcnQge2V4cGVjdH0gZnJvbSAnYW5ndWxhcjIvdGVzdGluZyc7XG5cbmZ1bmN0aW9uIHdhaXRGb3JFbGVtZW50KHNlbGVjdG9yOiBzdHJpbmcpIHtcbiAgdmFyIEVDID0gKDxhbnk+cHJvdHJhY3RvcikuRXhwZWN0ZWRDb25kaXRpb25zO1xuICAvLyBXYWl0cyBmb3IgdGhlIGVsZW1lbnQgd2l0aCBpZCAnYWJjJyB0byBiZSBwcmVzZW50IG9uIHRoZSBkb20uXG4gIGJyb3dzZXIud2FpdChFQy5wcmVzZW5jZU9mKCQoc2VsZWN0b3IpKSwgMjAwMDApO1xufVxuXG5kZXNjcmliZSgncmV1c2UgZXhhbXBsZSBhcHAnLCBmdW5jdGlvbigpIHtcblxuICBhZnRlckVhY2godmVyaWZ5Tm9Ccm93c2VyRXJyb3JzKTtcblxuICB2YXIgVVJMID0gJ2FuZ3VsYXIyL2V4YW1wbGVzL3JvdXRlci90cy9yZXVzZS8nO1xuXG4gIGl0KCdzaG91bGQgYnVpbGQgYSBsaW5rIHdoaWNoIHBvaW50cyB0byB0aGUgZGV0YWlsIHBhZ2UnLCBmdW5jdGlvbigpIHtcbiAgICBicm93c2VyLmdldChVUkwpO1xuICAgIHdhaXRGb3JFbGVtZW50KCdteS1jbXAnKTtcblxuICAgIGVsZW1lbnQoYnkuY3NzKCcjbmFvbWktbGluaycpKS5jbGljaygpO1xuICAgIHdhaXRGb3JFbGVtZW50KCdteS1jbXAnKTtcbiAgICBleHBlY3QoYnJvd3Nlci5nZXRDdXJyZW50VXJsKCkpLnRvTWF0Y2goL1xcL25hb21pJC8pO1xuXG4gICAgLy8gdHlwZSBzb21ldGhpbmcgaW50byBpbnB1dFxuICAgIGVsZW1lbnQoYnkuY3NzKCcjbWVzc2FnZScpKS5zZW5kS2V5cygnbG9uZyB0aW1lIG5vIHNlZSEnKTtcblxuICAgIC8vIG5hdmlnYXRlIHRvIEJyYWRcbiAgICBlbGVtZW50KGJ5LmNzcygnI2JyYWQtbGluaycpKS5jbGljaygpO1xuICAgIHdhaXRGb3JFbGVtZW50KCdteS1jbXAnKTtcbiAgICBleHBlY3QoYnJvd3Nlci5nZXRDdXJyZW50VXJsKCkpLnRvTWF0Y2goL1xcL2JyYWQkLyk7XG5cbiAgICAvLyBjaGVjayB0aGF0IHR5cGVkIGlucHV0IGlzIHRoZSBzYW1lXG4gICAgZXhwZWN0KGVsZW1lbnQoYnkuY3NzKCcjbWVzc2FnZScpKS5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykpLnRvRXF1YWwoJ2xvbmcgdGltZSBubyBzZWUhJyk7XG4gIH0pO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
