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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvcm91dGVyL3RzL3JldXNlL3JldXNlX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQUdBLHdCQUF3QixRQUFnQjtRQUN0QyxJQUFJLEVBQUUsR0FBUyxVQUFXLENBQUMsa0JBQWtCLENBQUM7UUFDOUMsZ0VBQWdFO1FBQ2hFLGtCQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbEQsQ0FBQzs7Ozs7Ozs7OztZQUVELFFBQVEsQ0FBQyxtQkFBbUIsRUFBRTtnQkFFNUIsU0FBUyxDQUFDLGdDQUFxQixDQUFDLENBQUM7Z0JBRWpDLElBQUksR0FBRyxHQUFHLG9DQUFvQyxDQUFDO2dCQUUvQyxFQUFFLENBQUMscURBQXFELEVBQUU7b0JBQ3hELGtCQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNqQixjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRXpCLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ3ZDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDekIsZ0JBQU0sQ0FBQyxrQkFBTyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUVwRCw0QkFBNEI7b0JBQzVCLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUM7b0JBRTFELG1CQUFtQjtvQkFDbkIsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDdEMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUN6QixnQkFBTSxDQUFDLGtCQUFPLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBRW5ELHFDQUFxQztvQkFDckMsZ0JBQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUN6RixDQUFDLENBQUMsQ0FBQztZQUVMLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvcm91dGVyL3RzL3JldXNlL3JldXNlX3NwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3ZlcmlmeU5vQnJvd3NlckVycm9ycywgYnJvd3Nlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL3Rlc3RpbmcvZTJlX3V0aWwnO1xuaW1wb3J0IHtleHBlY3R9IGZyb20gJ2FuZ3VsYXIyL3Rlc3RpbmcnO1xuXG5mdW5jdGlvbiB3YWl0Rm9yRWxlbWVudChzZWxlY3Rvcjogc3RyaW5nKSB7XG4gIHZhciBFQyA9ICg8YW55PnByb3RyYWN0b3IpLkV4cGVjdGVkQ29uZGl0aW9ucztcbiAgLy8gV2FpdHMgZm9yIHRoZSBlbGVtZW50IHdpdGggaWQgJ2FiYycgdG8gYmUgcHJlc2VudCBvbiB0aGUgZG9tLlxuICBicm93c2VyLndhaXQoRUMucHJlc2VuY2VPZigkKHNlbGVjdG9yKSksIDIwMDAwKTtcbn1cblxuZGVzY3JpYmUoJ3JldXNlIGV4YW1wbGUgYXBwJywgZnVuY3Rpb24oKSB7XG5cbiAgYWZ0ZXJFYWNoKHZlcmlmeU5vQnJvd3NlckVycm9ycyk7XG5cbiAgdmFyIFVSTCA9ICdhbmd1bGFyMi9leGFtcGxlcy9yb3V0ZXIvdHMvcmV1c2UvJztcblxuICBpdCgnc2hvdWxkIGJ1aWxkIGEgbGluayB3aGljaCBwb2ludHMgdG8gdGhlIGRldGFpbCBwYWdlJywgZnVuY3Rpb24oKSB7XG4gICAgYnJvd3Nlci5nZXQoVVJMKTtcbiAgICB3YWl0Rm9yRWxlbWVudCgnbXktY21wJyk7XG5cbiAgICBlbGVtZW50KGJ5LmNzcygnI25hb21pLWxpbmsnKSkuY2xpY2soKTtcbiAgICB3YWl0Rm9yRWxlbWVudCgnbXktY21wJyk7XG4gICAgZXhwZWN0KGJyb3dzZXIuZ2V0Q3VycmVudFVybCgpKS50b01hdGNoKC9cXC9uYW9taSQvKTtcblxuICAgIC8vIHR5cGUgc29tZXRoaW5nIGludG8gaW5wdXRcbiAgICBlbGVtZW50KGJ5LmNzcygnI21lc3NhZ2UnKSkuc2VuZEtleXMoJ2xvbmcgdGltZSBubyBzZWUhJyk7XG5cbiAgICAvLyBuYXZpZ2F0ZSB0byBCcmFkXG4gICAgZWxlbWVudChieS5jc3MoJyNicmFkLWxpbmsnKSkuY2xpY2soKTtcbiAgICB3YWl0Rm9yRWxlbWVudCgnbXktY21wJyk7XG4gICAgZXhwZWN0KGJyb3dzZXIuZ2V0Q3VycmVudFVybCgpKS50b01hdGNoKC9cXC9icmFkJC8pO1xuXG4gICAgLy8gY2hlY2sgdGhhdCB0eXBlZCBpbnB1dCBpcyB0aGUgc2FtZVxuICAgIGV4cGVjdChlbGVtZW50KGJ5LmNzcygnI21lc3NhZ2UnKSkuZ2V0QXR0cmlidXRlKCd2YWx1ZScpKS50b0VxdWFsKCdsb25nIHRpbWUgbm8gc2VlIScpO1xuICB9KTtcblxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
