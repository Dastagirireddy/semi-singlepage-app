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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvcm91dGVyL3RzL2Nhbl9hY3RpdmF0ZS9jYW5fYWN0aXZhdGVfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0lBR0Esd0JBQXdCLFFBQWdCO1FBQ3RDLElBQUksRUFBRSxHQUFTLFVBQVcsQ0FBQyxrQkFBa0IsQ0FBQztRQUM5QyxnRUFBZ0U7UUFDaEUsa0JBQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNsRCxDQUFDOzs7Ozs7Ozs7O1lBRUQsUUFBUSxDQUFDLG1CQUFtQixFQUFFO2dCQUU1QixTQUFTLENBQUMsZ0NBQXFCLENBQUMsQ0FBQztnQkFFakMsSUFBSSxHQUFHLEdBQUcsMkNBQTJDLENBQUM7Z0JBRXRELEVBQUUsQ0FBQywyQkFBMkIsRUFBRTtvQkFDOUIsa0JBQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2pCLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFFM0IsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDeEMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLENBQUM7b0JBQ3BDLGdCQUFNLENBQUMsa0JBQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO29CQUUvRCxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDL0UsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLCtCQUErQixFQUFFO29CQUNsQyxrQkFBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDakIsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUUzQixPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUN4QyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBRTNCLGdCQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDM0UsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL3JvdXRlci90cy9jYW5fYWN0aXZhdGUvY2FuX2FjdGl2YXRlX3NwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3ZlcmlmeU5vQnJvd3NlckVycm9ycywgYnJvd3Nlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL3Rlc3RpbmcvZTJlX3V0aWwnO1xuaW1wb3J0IHtleHBlY3R9IGZyb20gJ2FuZ3VsYXIyL3Rlc3RpbmcnO1xuXG5mdW5jdGlvbiB3YWl0Rm9yRWxlbWVudChzZWxlY3Rvcjogc3RyaW5nKSB7XG4gIHZhciBFQyA9ICg8YW55PnByb3RyYWN0b3IpLkV4cGVjdGVkQ29uZGl0aW9ucztcbiAgLy8gV2FpdHMgZm9yIHRoZSBlbGVtZW50IHdpdGggaWQgJ2FiYycgdG8gYmUgcHJlc2VudCBvbiB0aGUgZG9tLlxuICBicm93c2VyLndhaXQoRUMucHJlc2VuY2VPZigkKHNlbGVjdG9yKSksIDIwMDAwKTtcbn1cblxuZGVzY3JpYmUoJ3JldXNlIGV4YW1wbGUgYXBwJywgZnVuY3Rpb24oKSB7XG5cbiAgYWZ0ZXJFYWNoKHZlcmlmeU5vQnJvd3NlckVycm9ycyk7XG5cbiAgdmFyIFVSTCA9ICdhbmd1bGFyMi9leGFtcGxlcy9yb3V0ZXIvdHMvY2FuX2FjdGl2YXRlLyc7XG5cbiAgaXQoJ3Nob3VsZCBuYXZpZ2F0ZSB0byB1c2VyIDEnLCBmdW5jdGlvbigpIHtcbiAgICBicm93c2VyLmdldChVUkwpO1xuICAgIHdhaXRGb3JFbGVtZW50KCdob21lLWNtcCcpO1xuXG4gICAgZWxlbWVudChieS5jc3MoJyN1c2VyLTEtbGluaycpKS5jbGljaygpO1xuICAgIHdhaXRGb3JFbGVtZW50KCdjb250cm9sLXBhbmVsLWNtcCcpO1xuICAgIGV4cGVjdChicm93c2VyLmdldEN1cnJlbnRVcmwoKSkudG9NYXRjaCgvXFwvdXNlci1zZXR0aW5nc1xcLzEkLyk7XG5cbiAgICBleHBlY3QoZWxlbWVudChieS5jc3MoJ2NvbnRyb2wtcGFuZWwtY21wJykpLmdldFRleHQoKSkudG9Db250YWluKCdTZXR0aW5ncycpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIG5vdCBuYXZpZ2F0ZSB0byB1c2VyIDInLCBmdW5jdGlvbigpIHtcbiAgICBicm93c2VyLmdldChVUkwpO1xuICAgIHdhaXRGb3JFbGVtZW50KCdob21lLWNtcCcpO1xuXG4gICAgZWxlbWVudChieS5jc3MoJyN1c2VyLTItbGluaycpKS5jbGljaygpO1xuICAgIHdhaXRGb3JFbGVtZW50KCdob21lLWNtcCcpO1xuXG4gICAgZXhwZWN0KGVsZW1lbnQoYnkuY3NzKCdob21lLWNtcCcpKS5nZXRUZXh0KCkpLnRvQ29udGFpbignV2VsY29tZSBIb21lIScpO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
