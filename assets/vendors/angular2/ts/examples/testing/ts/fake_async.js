System.register(['angular2/testing'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var testing_1;
    return {
        setters:[
            function (testing_1_1) {
                testing_1 = testing_1_1;
            }],
        execute: function() {
            // #docregion basic
            testing_1.describe('this test', function () {
                testing_1.it('looks async but is synchronous', testing_1.fakeAsync(function () {
                    var flag = false;
                    setTimeout(function () { flag = true; }, 100);
                    testing_1.expect(flag).toBe(false);
                    testing_1.tick(50);
                    testing_1.expect(flag).toBe(false);
                    testing_1.tick(50);
                    testing_1.expect(flag).toBe(true);
                }));
            });
            // #enddocregion
            // #docregion pending
            testing_1.describe('this test', function () {
                testing_1.it('aborts a timer', testing_1.fakeAsync(function () {
                    // This timer is scheduled but doesn't need to complete for the
                    // test to pass (maybe it's a timeout for some operation).
                    // Leaving it will cause the test to fail...
                    setTimeout(function () { }, 100);
                    // Unless we clean it up first.
                    testing_1.clearPendingTimers();
                }));
            });
        }
    }
});
// #enddocregion 

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL3Rlc3RpbmcvdHMvZmFrZV9hc3luYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O1lBRUEsbUJBQW1CO1lBQ25CLGtCQUFRLENBQUMsV0FBVyxFQUFFO2dCQUNwQixZQUFFLENBQUMsZ0NBQWdDLEVBQU8sbUJBQVMsQ0FBQztvQkFDL0MsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDO29CQUNqQixVQUFVLENBQUMsY0FBUSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN4QyxnQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDekIsY0FBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNULGdCQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN6QixjQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ1QsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzFCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDVCxDQUFDLENBQUMsQ0FBQztZQUNILGdCQUFnQjtZQUVoQixxQkFBcUI7WUFDckIsa0JBQVEsQ0FBQyxXQUFXLEVBQUU7Z0JBQ3BCLFlBQUUsQ0FBQyxnQkFBZ0IsRUFBTyxtQkFBUyxDQUFDO29CQUMvQiwrREFBK0Q7b0JBQy9ELDBEQUEwRDtvQkFDMUQsNENBQTRDO29CQUM1QyxVQUFVLENBQUMsY0FBTyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBRTFCLCtCQUErQjtvQkFDL0IsNEJBQWtCLEVBQUUsQ0FBQztnQkFDdkIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNULENBQUMsQ0FBQyxDQUFDOzs7O0FBQ0gsZ0JBQWdCIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL3Rlc3RpbmcvdHMvZmFrZV9hc3luYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7ZGVzY3JpYmUsIGl0LCBmYWtlQXN5bmMsIGV4cGVjdCwgdGljaywgY2xlYXJQZW5kaW5nVGltZXJzfSBmcm9tICdhbmd1bGFyMi90ZXN0aW5nJztcblxuLy8gI2RvY3JlZ2lvbiBiYXNpY1xuZGVzY3JpYmUoJ3RoaXMgdGVzdCcsICgpID0+IHtcbiAgaXQoJ2xvb2tzIGFzeW5jIGJ1dCBpcyBzeW5jaHJvbm91cycsIDxhbnk+ZmFrZUFzeW5jKCgpOiB2b2lkID0+IHtcbiAgICAgICB2YXIgZmxhZyA9IGZhbHNlO1xuICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBmbGFnID0gdHJ1ZTsgfSwgMTAwKTtcbiAgICAgICBleHBlY3QoZmxhZykudG9CZShmYWxzZSk7XG4gICAgICAgdGljayg1MCk7XG4gICAgICAgZXhwZWN0KGZsYWcpLnRvQmUoZmFsc2UpO1xuICAgICAgIHRpY2soNTApO1xuICAgICAgIGV4cGVjdChmbGFnKS50b0JlKHRydWUpO1xuICAgICB9KSk7XG59KTtcbi8vICNlbmRkb2NyZWdpb25cblxuLy8gI2RvY3JlZ2lvbiBwZW5kaW5nXG5kZXNjcmliZSgndGhpcyB0ZXN0JywgKCkgPT4ge1xuICBpdCgnYWJvcnRzIGEgdGltZXInLCA8YW55PmZha2VBc3luYygoKTogdm9pZCA9PiB7XG4gICAgICAgLy8gVGhpcyB0aW1lciBpcyBzY2hlZHVsZWQgYnV0IGRvZXNuJ3QgbmVlZCB0byBjb21wbGV0ZSBmb3IgdGhlXG4gICAgICAgLy8gdGVzdCB0byBwYXNzIChtYXliZSBpdCdzIGEgdGltZW91dCBmb3Igc29tZSBvcGVyYXRpb24pLlxuICAgICAgIC8vIExlYXZpbmcgaXQgd2lsbCBjYXVzZSB0aGUgdGVzdCB0byBmYWlsLi4uXG4gICAgICAgc2V0VGltZW91dCgoKSA9PiB7fSwgMTAwKTtcblxuICAgICAgIC8vIFVubGVzcyB3ZSBjbGVhbiBpdCB1cCBmaXJzdC5cbiAgICAgICBjbGVhclBlbmRpbmdUaW1lcnMoKTtcbiAgICAgfSkpO1xufSk7XG4vLyAjZW5kZG9jcmVnaW9uIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
