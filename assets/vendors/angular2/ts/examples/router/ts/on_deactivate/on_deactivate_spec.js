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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL3JvdXRlci90cy9vbl9kZWFjdGl2YXRlL29uX2RlYWN0aXZhdGVfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0lBR0Esd0JBQXdCLFFBQWdCO1FBQ3RDLElBQUksRUFBRSxHQUFTLFVBQVcsQ0FBQyxrQkFBa0IsQ0FBQztRQUM5QyxnRUFBZ0U7UUFDaEUsa0JBQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNsRCxDQUFDOzs7Ozs7Ozs7O1lBRUQsUUFBUSxDQUFDLHlCQUF5QixFQUFFO2dCQUNsQyxTQUFTLENBQUMsZ0NBQXFCLENBQUMsQ0FBQztnQkFFakMsSUFBSSxHQUFHLEdBQUcsNENBQTRDLENBQUM7Z0JBRXZELEVBQUUsQ0FBQyx1REFBdUQsRUFBRTtvQkFDMUQsa0JBQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2pCLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFFekIsZ0JBQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUUxRCxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUN2QyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRXpCLGdCQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO29CQUVyRixrQkFBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUMxQixjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRXpCLGdCQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQzt5QkFDcEMsT0FBTyxDQUFDLDREQUE0RCxDQUFDLENBQUM7Z0JBQzdFLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvcm91dGVyL3RzL29uX2RlYWN0aXZhdGUvb25fZGVhY3RpdmF0ZV9zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHt2ZXJpZnlOb0Jyb3dzZXJFcnJvcnMsIGJyb3dzZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy90ZXN0aW5nL2UyZV91dGlsJztcbmltcG9ydCB7ZXhwZWN0fSBmcm9tICdhbmd1bGFyMi90ZXN0aW5nJztcblxuZnVuY3Rpb24gd2FpdEZvckVsZW1lbnQoc2VsZWN0b3I6IHN0cmluZykge1xuICB2YXIgRUMgPSAoPGFueT5wcm90cmFjdG9yKS5FeHBlY3RlZENvbmRpdGlvbnM7XG4gIC8vIFdhaXRzIGZvciB0aGUgZWxlbWVudCB3aXRoIGlkICdhYmMnIHRvIGJlIHByZXNlbnQgb24gdGhlIGRvbS5cbiAgYnJvd3Nlci53YWl0KEVDLnByZXNlbmNlT2YoJChzZWxlY3RvcikpLCAyMDAwMCk7XG59XG5cbmRlc2NyaWJlKCdvbiBhY3RpdmF0ZSBleGFtcGxlIGFwcCcsIGZ1bmN0aW9uKCkge1xuICBhZnRlckVhY2godmVyaWZ5Tm9Ccm93c2VyRXJyb3JzKTtcblxuICB2YXIgVVJMID0gJ2FuZ3VsYXIyL2V4YW1wbGVzL3JvdXRlci90cy9vbl9kZWFjdGl2YXRlLyc7XG5cbiAgaXQoJ3Nob3VsZCB1cGRhdGUgdGhlIHRleHQgd2hlbiBuYXZpZ2F0aW5nIGJldHdlZW4gcm91dGVzJywgZnVuY3Rpb24oKSB7XG4gICAgYnJvd3Nlci5nZXQoVVJMKTtcbiAgICB3YWl0Rm9yRWxlbWVudCgnbXktY21wJyk7XG5cbiAgICBleHBlY3QoZWxlbWVudChieS5jc3MoJyNsb2cnKSkuZ2V0VGV4dCgpKS50b0VxdWFsKCdMb2c6Jyk7XG5cbiAgICBlbGVtZW50KGJ5LmNzcygnI3BhcmFtLWxpbmsnKSkuY2xpY2soKTtcbiAgICB3YWl0Rm9yRWxlbWVudCgnbXktY21wJyk7XG5cbiAgICBleHBlY3QoZWxlbWVudChieS5jc3MoJyNsb2cnKSkuZ2V0VGV4dCgpKS50b0VxdWFsKCdMb2c6XFxuTmF2aWdhdGluZyBmcm9tIFwiXCIgdG8gXCIxXCInKTtcblxuICAgIGJyb3dzZXIubmF2aWdhdGUoKS5iYWNrKCk7XG4gICAgd2FpdEZvckVsZW1lbnQoJ215LWNtcCcpO1xuXG4gICAgZXhwZWN0KGVsZW1lbnQoYnkuY3NzKCcjbG9nJykpLmdldFRleHQoKSlcbiAgICAgICAgLnRvRXF1YWwoJ0xvZzpcXG5OYXZpZ2F0aW5nIGZyb20gXCJcIiB0byBcIjFcIlxcbk5hdmlnYXRpbmcgZnJvbSBcIjFcIiB0byBcIlwiJyk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
