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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvdGVzdGluZy90cy9mYWtlX2FzeW5jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7WUFFQSxtQkFBbUI7WUFDbkIsa0JBQVEsQ0FBQyxXQUFXLEVBQUU7Z0JBQ3BCLFlBQUUsQ0FBQyxnQ0FBZ0MsRUFBTyxtQkFBUyxDQUFDO29CQUMvQyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUM7b0JBQ2pCLFVBQVUsQ0FBQyxjQUFRLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ3hDLGdCQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN6QixjQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ1QsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3pCLGNBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDVCxnQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNULENBQUMsQ0FBQyxDQUFDO1lBQ0gsZ0JBQWdCO1lBRWhCLHFCQUFxQjtZQUNyQixrQkFBUSxDQUFDLFdBQVcsRUFBRTtnQkFDcEIsWUFBRSxDQUFDLGdCQUFnQixFQUFPLG1CQUFTLENBQUM7b0JBQy9CLCtEQUErRDtvQkFDL0QsMERBQTBEO29CQUMxRCw0Q0FBNEM7b0JBQzVDLFVBQVUsQ0FBQyxjQUFPLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFFMUIsK0JBQStCO29CQUMvQiw0QkFBa0IsRUFBRSxDQUFDO2dCQUN2QixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1QsQ0FBQyxDQUFDLENBQUM7Ozs7QUFDSCxnQkFBZ0IiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9leGFtcGxlcy90ZXN0aW5nL3RzL2Zha2VfYXN5bmMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2Rlc2NyaWJlLCBpdCwgZmFrZUFzeW5jLCBleHBlY3QsIHRpY2ssIGNsZWFyUGVuZGluZ1RpbWVyc30gZnJvbSAnYW5ndWxhcjIvdGVzdGluZyc7XG5cbi8vICNkb2NyZWdpb24gYmFzaWNcbmRlc2NyaWJlKCd0aGlzIHRlc3QnLCAoKSA9PiB7XG4gIGl0KCdsb29rcyBhc3luYyBidXQgaXMgc3luY2hyb25vdXMnLCA8YW55PmZha2VBc3luYygoKTogdm9pZCA9PiB7XG4gICAgICAgdmFyIGZsYWcgPSBmYWxzZTtcbiAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgZmxhZyA9IHRydWU7IH0sIDEwMCk7XG4gICAgICAgZXhwZWN0KGZsYWcpLnRvQmUoZmFsc2UpO1xuICAgICAgIHRpY2soNTApO1xuICAgICAgIGV4cGVjdChmbGFnKS50b0JlKGZhbHNlKTtcbiAgICAgICB0aWNrKDUwKTtcbiAgICAgICBleHBlY3QoZmxhZykudG9CZSh0cnVlKTtcbiAgICAgfSkpO1xufSk7XG4vLyAjZW5kZG9jcmVnaW9uXG5cbi8vICNkb2NyZWdpb24gcGVuZGluZ1xuZGVzY3JpYmUoJ3RoaXMgdGVzdCcsICgpID0+IHtcbiAgaXQoJ2Fib3J0cyBhIHRpbWVyJywgPGFueT5mYWtlQXN5bmMoKCk6IHZvaWQgPT4ge1xuICAgICAgIC8vIFRoaXMgdGltZXIgaXMgc2NoZWR1bGVkIGJ1dCBkb2Vzbid0IG5lZWQgdG8gY29tcGxldGUgZm9yIHRoZVxuICAgICAgIC8vIHRlc3QgdG8gcGFzcyAobWF5YmUgaXQncyBhIHRpbWVvdXQgZm9yIHNvbWUgb3BlcmF0aW9uKS5cbiAgICAgICAvLyBMZWF2aW5nIGl0IHdpbGwgY2F1c2UgdGhlIHRlc3QgdG8gZmFpbC4uLlxuICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge30sIDEwMCk7XG5cbiAgICAgICAvLyBVbmxlc3Mgd2UgY2xlYW4gaXQgdXAgZmlyc3QuXG4gICAgICAgY2xlYXJQZW5kaW5nVGltZXJzKCk7XG4gICAgIH0pKTtcbn0pO1xuLy8gI2VuZGRvY3JlZ2lvbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
