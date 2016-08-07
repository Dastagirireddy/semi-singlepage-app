System.register(['angular2/testing', 'angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var testing_1, core_1;
    var db, MyService, MyMockService;
    return {
        setters:[
            function (testing_1_1) {
                testing_1 = testing_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            MyService = (function () {
                function MyService() {
                }
                return MyService;
            }());
            MyMockService = (function () {
                function MyMockService() {
                }
                return MyMockService;
            }());
            // #docregion describeIt
            testing_1.describe('some component', function () {
                testing_1.it('does something', function () {
                    // This is a test.
                });
            });
            // #enddocregion
            // #docregion fdescribe
            testing_1.fdescribe('some component', function () {
                testing_1.it('has a test', function () {
                    // This test will run.
                });
            });
            testing_1.describe('another component', function () { testing_1.it('also has a test', function () { throw 'This test will not run.'; }); });
            // #enddocregion
            // #docregion xdescribe
            testing_1.xdescribe('some component', function () { testing_1.it('has a test', function () { throw 'This test will not run.'; }); });
            testing_1.describe('another component', function () {
                testing_1.it('also has a test', function () {
                    // This test will run.
                });
            });
            // #enddocregion
            // #docregion fit
            testing_1.describe('some component', function () {
                testing_1.fit('has a test', function () {
                    // This test will run.
                });
                testing_1.it('has another test', function () { throw 'This test will not run.'; });
            });
            // #enddocregion
            // #docregion xit
            testing_1.describe('some component', function () {
                testing_1.xit('has a test', function () { throw 'This test will not run.'; });
                testing_1.it('has another test', function () {
                    // This test will run.
                });
            });
            // #enddocregion
            // #docregion beforeEach
            testing_1.describe('some component', function () {
                testing_1.beforeEach(function () { db.connect(); });
                testing_1.it('uses the db', function () {
                    // Database is connected.
                });
            });
            // #enddocregion
            // #docregion beforeEachProviders
            testing_1.describe('some component', function () {
                testing_1.beforeEachProviders(function () { return [core_1.provide(MyService, { useClass: MyMockService })]; });
                testing_1.it('uses MyService', testing_1.inject([MyService], function (service) {
                    // service is an instance of MyMockService.
                }));
            });
            // #enddocregion
            // #docregion afterEach
            testing_1.describe('some component', function () {
                testing_1.afterEach(function (done) { db.reset().then(function (_) { return done(); }); });
                testing_1.it('uses the db', function () {
                    // This test can leave the database in a dirty state.
                    // The afterEach will ensure it gets reset.
                });
            });
        }
    }
});
// #enddocregion

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL3Rlc3RpbmcvdHMvdGVzdGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBY0ksRUFBRTs7Ozs7Ozs7OztZQUNOO2dCQUFBO2dCQUFpQixDQUFDO2dCQUFELGdCQUFDO1lBQUQsQ0FBakIsQUFBa0IsSUFBQTtZQUNsQjtnQkFBQTtnQkFBMEMsQ0FBQztnQkFBRCxvQkFBQztZQUFELENBQTFDLEFBQTJDLElBQUE7WUFFM0Msd0JBQXdCO1lBQ3hCLGtCQUFRLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3pCLFlBQUUsQ0FBQyxnQkFBZ0IsRUFBRTtvQkFDSSxrQkFBa0I7Z0JBQ3RCLENBQUMsQ0FBQyxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsZ0JBQWdCO1lBRWhCLHVCQUF1QjtZQUN2QixtQkFBUyxDQUFDLGdCQUFnQixFQUFFO2dCQUMxQixZQUFFLENBQUMsWUFBWSxFQUFFO29CQUNJLHNCQUFzQjtnQkFDMUIsQ0FBQyxDQUFDLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7WUFDSCxrQkFBUSxDQUFDLG1CQUFtQixFQUNuQixjQUFRLFlBQUUsQ0FBQyxpQkFBaUIsRUFBRSxjQUFRLE1BQU0seUJBQXlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZGLGdCQUFnQjtZQUVoQix1QkFBdUI7WUFDdkIsbUJBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxjQUFRLFlBQUUsQ0FBQyxZQUFZLEVBQUUsY0FBTyxNQUFNLHlCQUF5QixDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRyxrQkFBUSxDQUFDLG1CQUFtQixFQUFFO2dCQUM1QixZQUFFLENBQUMsaUJBQWlCLEVBQUU7b0JBQ0ksc0JBQXNCO2dCQUMxQixDQUFDLENBQUMsQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztZQUNILGdCQUFnQjtZQUVoQixpQkFBaUI7WUFDakIsa0JBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDekIsYUFBRyxDQUFDLFlBQVksRUFBRTtvQkFDSSxzQkFBc0I7Z0JBQzFCLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixZQUFFLENBQUMsa0JBQWtCLEVBQUUsY0FBUSxNQUFNLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckUsQ0FBQyxDQUFDLENBQUM7WUFDSCxnQkFBZ0I7WUFFaEIsaUJBQWlCO1lBQ2pCLGtCQUFRLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3pCLGFBQUcsQ0FBQyxZQUFZLEVBQUUsY0FBUSxNQUFNLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlELFlBQUUsQ0FBQyxrQkFBa0IsRUFBRTtvQkFDSSxzQkFBc0I7Z0JBQzFCLENBQUMsQ0FBQyxDQUFDO1lBQzVCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsZ0JBQWdCO1lBRWhCLHdCQUF3QjtZQUN4QixrQkFBUSxDQUFDLGdCQUFnQixFQUFFO2dCQUN6QixvQkFBVSxDQUFDLGNBQVEsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLFlBQUUsQ0FBQyxhQUFhLEVBQUU7b0JBQ0kseUJBQXlCO2dCQUM3QixDQUFDLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztZQUNILGdCQUFnQjtZQUVoQixpQ0FBaUM7WUFDakMsa0JBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDekIsNkJBQW1CLENBQUMsY0FBTSxPQUFBLENBQUMsY0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUMsQ0FBQyxDQUFDLEVBQS9DLENBQStDLENBQUMsQ0FBQztnQkFDM0UsWUFBRSxDQUFDLGdCQUFnQixFQUFFLGdCQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxVQUFDLE9BQXNCO29CQUNuQiwyQ0FBMkM7Z0JBQy9DLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0MsQ0FBQyxDQUFDLENBQUM7WUFDSCxnQkFBZ0I7WUFFaEIsdUJBQXVCO1lBQ3ZCLGtCQUFRLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3pCLG1CQUFTLENBQUMsVUFBQyxJQUFjLElBQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLENBQU0sSUFBSyxPQUFBLElBQUksRUFBRSxFQUFOLENBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hFLFlBQUUsQ0FBQyxhQUFhLEVBQUU7b0JBQ0kscURBQXFEO29CQUNyRCwyQ0FBMkM7Z0JBQy9DLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDOzs7O0FBQ0gsZ0JBQWdCIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL3Rlc3RpbmcvdHMvdGVzdGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGRlc2NyaWJlLFxuICBmZGVzY3JpYmUsXG4gIHhkZXNjcmliZSxcbiAgaXQsXG4gIGZpdCxcbiAgeGl0LFxuICBiZWZvcmVFYWNoLFxuICBhZnRlckVhY2gsXG4gIGJlZm9yZUVhY2hQcm92aWRlcnMsXG4gIGluamVjdFxufSBmcm9tICdhbmd1bGFyMi90ZXN0aW5nJztcbmltcG9ydCB7cHJvdmlkZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5cbnZhciBkYjogYW55O1xuY2xhc3MgTXlTZXJ2aWNlIHt9XG5jbGFzcyBNeU1vY2tTZXJ2aWNlIGltcGxlbWVudHMgTXlTZXJ2aWNlIHt9XG5cbi8vICNkb2NyZWdpb24gZGVzY3JpYmVJdFxuZGVzY3JpYmUoJ3NvbWUgY29tcG9uZW50JywgKCkgPT4ge1xuICBpdCgnZG9lcyBzb21ldGhpbmcnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGEgdGVzdC5cbiAgICAgICAgICAgICAgICAgICAgICAgfSk7XG59KTtcbi8vICNlbmRkb2NyZWdpb25cblxuLy8gI2RvY3JlZ2lvbiBmZGVzY3JpYmVcbmZkZXNjcmliZSgnc29tZSBjb21wb25lbnQnLCAoKSA9PiB7XG4gIGl0KCdoYXMgYSB0ZXN0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIHRlc3Qgd2lsbCBydW4uXG4gICAgICAgICAgICAgICAgICAgfSk7XG59KTtcbmRlc2NyaWJlKCdhbm90aGVyIGNvbXBvbmVudCcsXG4gICAgICAgICAoKSA9PiB7IGl0KCdhbHNvIGhhcyBhIHRlc3QnLCAoKSA9PiB7IHRocm93ICdUaGlzIHRlc3Qgd2lsbCBub3QgcnVuLic7IH0pOyB9KTtcbi8vICNlbmRkb2NyZWdpb25cblxuLy8gI2RvY3JlZ2lvbiB4ZGVzY3JpYmVcbnhkZXNjcmliZSgnc29tZSBjb21wb25lbnQnLCAoKSA9PiB7IGl0KCdoYXMgYSB0ZXN0JywgKCkgPT4ge3Rocm93ICdUaGlzIHRlc3Qgd2lsbCBub3QgcnVuLid9KTsgfSk7XG5kZXNjcmliZSgnYW5vdGhlciBjb21wb25lbnQnLCAoKSA9PiB7XG4gIGl0KCdhbHNvIGhhcyBhIHRlc3QnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyB0ZXN0IHdpbGwgcnVuLlxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG59KTtcbi8vICNlbmRkb2NyZWdpb25cblxuLy8gI2RvY3JlZ2lvbiBmaXRcbmRlc2NyaWJlKCdzb21lIGNvbXBvbmVudCcsICgpID0+IHtcbiAgZml0KCdoYXMgYSB0ZXN0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyB0ZXN0IHdpbGwgcnVuLlxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgaXQoJ2hhcyBhbm90aGVyIHRlc3QnLCAoKSA9PiB7IHRocm93ICdUaGlzIHRlc3Qgd2lsbCBub3QgcnVuLic7IH0pO1xufSk7XG4vLyAjZW5kZG9jcmVnaW9uXG5cbi8vICNkb2NyZWdpb24geGl0XG5kZXNjcmliZSgnc29tZSBjb21wb25lbnQnLCAoKSA9PiB7XG4gIHhpdCgnaGFzIGEgdGVzdCcsICgpID0+IHsgdGhyb3cgJ1RoaXMgdGVzdCB3aWxsIG5vdCBydW4uJzsgfSk7XG4gIGl0KCdoYXMgYW5vdGhlciB0ZXN0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIHRlc3Qgd2lsbCBydW4uXG4gICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG59KTtcbi8vICNlbmRkb2NyZWdpb25cblxuLy8gI2RvY3JlZ2lvbiBiZWZvcmVFYWNoXG5kZXNjcmliZSgnc29tZSBjb21wb25lbnQnLCAoKSA9PiB7XG4gIGJlZm9yZUVhY2goKCkgPT4geyBkYi5jb25uZWN0KCk7IH0pO1xuICBpdCgndXNlcyB0aGUgZGInLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEYXRhYmFzZSBpcyBjb25uZWN0ZWQuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xufSk7XG4vLyAjZW5kZG9jcmVnaW9uXG5cbi8vICNkb2NyZWdpb24gYmVmb3JlRWFjaFByb3ZpZGVyc1xuZGVzY3JpYmUoJ3NvbWUgY29tcG9uZW50JywgKCkgPT4ge1xuICBiZWZvcmVFYWNoUHJvdmlkZXJzKCgpID0+IFtwcm92aWRlKE15U2VydmljZSwge3VzZUNsYXNzOiBNeU1vY2tTZXJ2aWNlfSldKTtcbiAgaXQoJ3VzZXMgTXlTZXJ2aWNlJywgaW5qZWN0KFtNeVNlcnZpY2VdLCAoc2VydmljZTogTXlNb2NrU2VydmljZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXJ2aWNlIGlzIGFuIGluc3RhbmNlIG9mIE15TW9ja1NlcnZpY2UuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xufSk7XG4vLyAjZW5kZG9jcmVnaW9uXG5cbi8vICNkb2NyZWdpb24gYWZ0ZXJFYWNoXG5kZXNjcmliZSgnc29tZSBjb21wb25lbnQnLCAoKSA9PiB7XG4gIGFmdGVyRWFjaCgoZG9uZTogRnVuY3Rpb24pID0+IHsgZGIucmVzZXQoKS50aGVuKChfOiBhbnkpID0+IGRvbmUoKSk7IH0pO1xuICBpdCgndXNlcyB0aGUgZGInLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIHRlc3QgY2FuIGxlYXZlIHRoZSBkYXRhYmFzZSBpbiBhIGRpcnR5IHN0YXRlLlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGFmdGVyRWFjaCB3aWxsIGVuc3VyZSBpdCBnZXRzIHJlc2V0LlxuICAgICAgICAgICAgICAgICAgICB9KTtcbn0pO1xuLy8gI2VuZGRvY3JlZ2lvblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
