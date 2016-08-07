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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvcm91dGVyL3RzL2Nhbl9kZWFjdGl2YXRlL2Nhbl9kZWFjdGl2YXRlX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQUdBLHdCQUF3QixRQUFnQjtRQUN0QyxJQUFJLEVBQUUsR0FBUyxVQUFXLENBQUMsa0JBQWtCLENBQUM7UUFDOUMsZ0VBQWdFO1FBQ2hFLGtCQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVEO1FBQ0UsSUFBSSxFQUFFLEdBQVMsVUFBVyxDQUFDLGtCQUFrQixDQUFDO1FBQzlDLGtCQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDOzs7Ozs7Ozs7O1lBRUQsUUFBUSxDQUFDLDRCQUE0QixFQUFFO2dCQUVyQyxTQUFTLENBQUMsZ0NBQXFCLENBQUMsQ0FBQztnQkFFakMsSUFBSSxHQUFHLEdBQUcsNkNBQTZDLENBQUM7Z0JBRXhELEVBQUUsQ0FBQyxtREFBbUQsRUFBRTtvQkFDdEQsa0JBQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2pCLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUVqQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUN4QyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBRTNCLGtCQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQzFCLFlBQVksRUFBRSxDQUFDO29CQUVmLGtCQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBRSxnQ0FBZ0M7b0JBRXZFLGdCQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbkUsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLCtDQUErQyxFQUFFO29CQUNsRCxrQkFBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDakIsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUM7b0JBRWpDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ3hDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFFM0Isa0JBQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDMUIsWUFBWSxFQUFFLENBQUM7b0JBRWYsa0JBQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFFcEMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUM7b0JBRWpDLGdCQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUM5RSxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvcm91dGVyL3RzL2Nhbl9kZWFjdGl2YXRlL2Nhbl9kZWFjdGl2YXRlX3NwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3ZlcmlmeU5vQnJvd3NlckVycm9ycywgYnJvd3Nlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL3Rlc3RpbmcvZTJlX3V0aWwnO1xuaW1wb3J0IHtleHBlY3R9IGZyb20gJ2FuZ3VsYXIyL3Rlc3RpbmcnO1xuXG5mdW5jdGlvbiB3YWl0Rm9yRWxlbWVudChzZWxlY3Rvcjogc3RyaW5nKSB7XG4gIHZhciBFQyA9ICg8YW55PnByb3RyYWN0b3IpLkV4cGVjdGVkQ29uZGl0aW9ucztcbiAgLy8gV2FpdHMgZm9yIHRoZSBlbGVtZW50IHdpdGggaWQgJ2FiYycgdG8gYmUgcHJlc2VudCBvbiB0aGUgZG9tLlxuICBicm93c2VyLndhaXQoRUMucHJlc2VuY2VPZigkKHNlbGVjdG9yKSksIDIwMDAwKTtcbn1cblxuZnVuY3Rpb24gd2FpdEZvckFsZXJ0KCkge1xuICB2YXIgRUMgPSAoPGFueT5wcm90cmFjdG9yKS5FeHBlY3RlZENvbmRpdGlvbnM7XG4gIGJyb3dzZXIud2FpdChFQy5hbGVydElzUHJlc2VudCgpLCAxMDAwKTtcbn1cblxuZGVzY3JpYmUoJ2NhbiBkZWFjdGl2YXRlIGV4YW1wbGUgYXBwJywgZnVuY3Rpb24oKSB7XG5cbiAgYWZ0ZXJFYWNoKHZlcmlmeU5vQnJvd3NlckVycm9ycyk7XG5cbiAgdmFyIFVSTCA9ICdhbmd1bGFyMi9leGFtcGxlcy9yb3V0ZXIvdHMvY2FuX2RlYWN0aXZhdGUvJztcblxuICBpdCgnc2hvdWxkIG5vdCBuYXZpZ2F0ZSBhd2F5IHdoZW4gcHJvbXB0IGlzIGNhbmNlbGxlZCcsIGZ1bmN0aW9uKCkge1xuICAgIGJyb3dzZXIuZ2V0KFVSTCk7XG4gICAgd2FpdEZvckVsZW1lbnQoJ25vdGUtaW5kZXgtY21wJyk7XG5cbiAgICBlbGVtZW50KGJ5LmNzcygnI25vdGUtMS1saW5rJykpLmNsaWNrKCk7XG4gICAgd2FpdEZvckVsZW1lbnQoJ25vdGUtY21wJyk7XG5cbiAgICBicm93c2VyLm5hdmlnYXRlKCkuYmFjaygpO1xuICAgIHdhaXRGb3JBbGVydCgpO1xuXG4gICAgYnJvd3Nlci5zd2l0Y2hUbygpLmFsZXJ0KCkuZGlzbWlzcygpOyAgLy8gVXNlIHRvIHNpbXVsYXRlIGNhbmNlbCBidXR0b25cblxuICAgIGV4cGVjdChlbGVtZW50KGJ5LmNzcygnbm90ZS1jbXAnKSkuZ2V0VGV4dCgpKS50b0NvbnRhaW4oJ2lkOiAxJyk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgbmF2aWdhdGUgYXdheSB3aGVuIHByb21wdCBpcyBjb25maXJtZWQnLCBmdW5jdGlvbigpIHtcbiAgICBicm93c2VyLmdldChVUkwpO1xuICAgIHdhaXRGb3JFbGVtZW50KCdub3RlLWluZGV4LWNtcCcpO1xuXG4gICAgZWxlbWVudChieS5jc3MoJyNub3RlLTEtbGluaycpKS5jbGljaygpO1xuICAgIHdhaXRGb3JFbGVtZW50KCdub3RlLWNtcCcpO1xuXG4gICAgYnJvd3Nlci5uYXZpZ2F0ZSgpLmJhY2soKTtcbiAgICB3YWl0Rm9yQWxlcnQoKTtcblxuICAgIGJyb3dzZXIuc3dpdGNoVG8oKS5hbGVydCgpLmFjY2VwdCgpO1xuXG4gICAgd2FpdEZvckVsZW1lbnQoJ25vdGUtaW5kZXgtY21wJyk7XG5cbiAgICBleHBlY3QoZWxlbWVudChieS5jc3MoJ25vdGUtaW5kZXgtY21wJykpLmdldFRleHQoKSkudG9Db250YWluKCdZb3VyIE5vdGVzJyk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
