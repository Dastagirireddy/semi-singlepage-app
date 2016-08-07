System.register(['angular2/src/testing/e2e_util', 'angular2/testing'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var e2e_util_1, testing_1;
    function waitForElement(selector) {
        var EC = protractor.ExpectedConditions;
        // Waits for the element with id 'abc' to be present on the dom.
        e2e_util_1.browser.wait(EC.presenceOf($(selector)), 20000);
    }
    function waitForAlert() {
        var EC = protractor.ExpectedConditions;
        e2e_util_1.browser.wait(EC.alertIsPresent(), 1000);
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
            describe('can deactivate example app', function () {
                afterEach(e2e_util_1.verifyNoBrowserErrors);
                var URL = 'angular2/examples/router/ts/can_deactivate/';
                it('should not navigate away when prompt is cancelled', function () {
                    e2e_util_1.browser.get(URL);
                    waitForElement('note-index-cmp');
                    element(by.css('#note-1-link')).click();
                    waitForElement('note-cmp');
                    e2e_util_1.browser.navigate().back();
                    waitForAlert();
                    e2e_util_1.browser.switchTo().alert().dismiss(); // Use to simulate cancel button
                    testing_1.expect(element(by.css('note-cmp')).getText()).toContain('id: 1');
                });
                it('should navigate away when prompt is confirmed', function () {
                    e2e_util_1.browser.get(URL);
                    waitForElement('note-index-cmp');
                    element(by.css('#note-1-link')).click();
                    waitForElement('note-cmp');
                    e2e_util_1.browser.navigate().back();
                    waitForAlert();
                    e2e_util_1.browser.switchTo().alert().accept();
                    waitForElement('note-index-cmp');
                    testing_1.expect(element(by.css('note-index-cmp')).getText()).toContain('Your Notes');
                });
            });
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL3JvdXRlci90cy9jYW5fZGVhY3RpdmF0ZS9jYW5fZGVhY3RpdmF0ZV9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7SUFHQSx3QkFBd0IsUUFBZ0I7UUFDdEMsSUFBSSxFQUFFLEdBQVMsVUFBVyxDQUFDLGtCQUFrQixDQUFDO1FBQzlDLGdFQUFnRTtRQUNoRSxrQkFBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRDtRQUNFLElBQUksRUFBRSxHQUFTLFVBQVcsQ0FBQyxrQkFBa0IsQ0FBQztRQUM5QyxrQkFBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7Ozs7Ozs7OztZQUVELFFBQVEsQ0FBQyw0QkFBNEIsRUFBRTtnQkFFckMsU0FBUyxDQUFDLGdDQUFxQixDQUFDLENBQUM7Z0JBRWpDLElBQUksR0FBRyxHQUFHLDZDQUE2QyxDQUFDO2dCQUV4RCxFQUFFLENBQUMsbURBQW1ELEVBQUU7b0JBQ3RELGtCQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNqQixjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFFakMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDeEMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUUzQixrQkFBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUMxQixZQUFZLEVBQUUsQ0FBQztvQkFFZixrQkFBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUUsZ0NBQWdDO29CQUV2RSxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ25FLENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQywrQ0FBK0MsRUFBRTtvQkFDbEQsa0JBQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2pCLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUVqQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUN4QyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBRTNCLGtCQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQzFCLFlBQVksRUFBRSxDQUFDO29CQUVmLGtCQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBRXBDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUVqQyxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDOUUsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9leGFtcGxlcy9yb3V0ZXIvdHMvY2FuX2RlYWN0aXZhdGUvY2FuX2RlYWN0aXZhdGVfc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7dmVyaWZ5Tm9Ccm93c2VyRXJyb3JzLCBicm93c2VyfSBmcm9tICdhbmd1bGFyMi9zcmMvdGVzdGluZy9lMmVfdXRpbCc7XG5pbXBvcnQge2V4cGVjdH0gZnJvbSAnYW5ndWxhcjIvdGVzdGluZyc7XG5cbmZ1bmN0aW9uIHdhaXRGb3JFbGVtZW50KHNlbGVjdG9yOiBzdHJpbmcpIHtcbiAgdmFyIEVDID0gKDxhbnk+cHJvdHJhY3RvcikuRXhwZWN0ZWRDb25kaXRpb25zO1xuICAvLyBXYWl0cyBmb3IgdGhlIGVsZW1lbnQgd2l0aCBpZCAnYWJjJyB0byBiZSBwcmVzZW50IG9uIHRoZSBkb20uXG4gIGJyb3dzZXIud2FpdChFQy5wcmVzZW5jZU9mKCQoc2VsZWN0b3IpKSwgMjAwMDApO1xufVxuXG5mdW5jdGlvbiB3YWl0Rm9yQWxlcnQoKSB7XG4gIHZhciBFQyA9ICg8YW55PnByb3RyYWN0b3IpLkV4cGVjdGVkQ29uZGl0aW9ucztcbiAgYnJvd3Nlci53YWl0KEVDLmFsZXJ0SXNQcmVzZW50KCksIDEwMDApO1xufVxuXG5kZXNjcmliZSgnY2FuIGRlYWN0aXZhdGUgZXhhbXBsZSBhcHAnLCBmdW5jdGlvbigpIHtcblxuICBhZnRlckVhY2godmVyaWZ5Tm9Ccm93c2VyRXJyb3JzKTtcblxuICB2YXIgVVJMID0gJ2FuZ3VsYXIyL2V4YW1wbGVzL3JvdXRlci90cy9jYW5fZGVhY3RpdmF0ZS8nO1xuXG4gIGl0KCdzaG91bGQgbm90IG5hdmlnYXRlIGF3YXkgd2hlbiBwcm9tcHQgaXMgY2FuY2VsbGVkJywgZnVuY3Rpb24oKSB7XG4gICAgYnJvd3Nlci5nZXQoVVJMKTtcbiAgICB3YWl0Rm9yRWxlbWVudCgnbm90ZS1pbmRleC1jbXAnKTtcblxuICAgIGVsZW1lbnQoYnkuY3NzKCcjbm90ZS0xLWxpbmsnKSkuY2xpY2soKTtcbiAgICB3YWl0Rm9yRWxlbWVudCgnbm90ZS1jbXAnKTtcblxuICAgIGJyb3dzZXIubmF2aWdhdGUoKS5iYWNrKCk7XG4gICAgd2FpdEZvckFsZXJ0KCk7XG5cbiAgICBicm93c2VyLnN3aXRjaFRvKCkuYWxlcnQoKS5kaXNtaXNzKCk7ICAvLyBVc2UgdG8gc2ltdWxhdGUgY2FuY2VsIGJ1dHRvblxuXG4gICAgZXhwZWN0KGVsZW1lbnQoYnkuY3NzKCdub3RlLWNtcCcpKS5nZXRUZXh0KCkpLnRvQ29udGFpbignaWQ6IDEnKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBuYXZpZ2F0ZSBhd2F5IHdoZW4gcHJvbXB0IGlzIGNvbmZpcm1lZCcsIGZ1bmN0aW9uKCkge1xuICAgIGJyb3dzZXIuZ2V0KFVSTCk7XG4gICAgd2FpdEZvckVsZW1lbnQoJ25vdGUtaW5kZXgtY21wJyk7XG5cbiAgICBlbGVtZW50KGJ5LmNzcygnI25vdGUtMS1saW5rJykpLmNsaWNrKCk7XG4gICAgd2FpdEZvckVsZW1lbnQoJ25vdGUtY21wJyk7XG5cbiAgICBicm93c2VyLm5hdmlnYXRlKCkuYmFjaygpO1xuICAgIHdhaXRGb3JBbGVydCgpO1xuXG4gICAgYnJvd3Nlci5zd2l0Y2hUbygpLmFsZXJ0KCkuYWNjZXB0KCk7XG5cbiAgICB3YWl0Rm9yRWxlbWVudCgnbm90ZS1pbmRleC1jbXAnKTtcblxuICAgIGV4cGVjdChlbGVtZW50KGJ5LmNzcygnbm90ZS1pbmRleC1jbXAnKSkuZ2V0VGV4dCgpKS50b0NvbnRhaW4oJ1lvdXIgTm90ZXMnKTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
