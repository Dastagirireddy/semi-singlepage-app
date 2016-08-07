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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvdGVzdGluZy90cy90ZXN0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFjSSxFQUFFOzs7Ozs7Ozs7O1lBQ047Z0JBQUE7Z0JBQWlCLENBQUM7Z0JBQUQsZ0JBQUM7WUFBRCxDQUFqQixBQUFrQixJQUFBO1lBQ2xCO2dCQUFBO2dCQUEwQyxDQUFDO2dCQUFELG9CQUFDO1lBQUQsQ0FBMUMsQUFBMkMsSUFBQTtZQUUzQyx3QkFBd0I7WUFDeEIsa0JBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDekIsWUFBRSxDQUFDLGdCQUFnQixFQUFFO29CQUNJLGtCQUFrQjtnQkFDdEIsQ0FBQyxDQUFDLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7WUFDSCxnQkFBZ0I7WUFFaEIsdUJBQXVCO1lBQ3ZCLG1CQUFTLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQzFCLFlBQUUsQ0FBQyxZQUFZLEVBQUU7b0JBQ0ksc0JBQXNCO2dCQUMxQixDQUFDLENBQUMsQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztZQUNILGtCQUFRLENBQUMsbUJBQW1CLEVBQ25CLGNBQVEsWUFBRSxDQUFDLGlCQUFpQixFQUFFLGNBQVEsTUFBTSx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkYsZ0JBQWdCO1lBRWhCLHVCQUF1QjtZQUN2QixtQkFBUyxDQUFDLGdCQUFnQixFQUFFLGNBQVEsWUFBRSxDQUFDLFlBQVksRUFBRSxjQUFPLE1BQU0seUJBQXlCLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xHLGtCQUFRLENBQUMsbUJBQW1CLEVBQUU7Z0JBQzVCLFlBQUUsQ0FBQyxpQkFBaUIsRUFBRTtvQkFDSSxzQkFBc0I7Z0JBQzFCLENBQUMsQ0FBQyxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsZ0JBQWdCO1lBRWhCLGlCQUFpQjtZQUNqQixrQkFBUSxDQUFDLGdCQUFnQixFQUFFO2dCQUN6QixhQUFHLENBQUMsWUFBWSxFQUFFO29CQUNJLHNCQUFzQjtnQkFDMUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLFlBQUUsQ0FBQyxrQkFBa0IsRUFBRSxjQUFRLE1BQU0seUJBQXlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRSxDQUFDLENBQUMsQ0FBQztZQUNILGdCQUFnQjtZQUVoQixpQkFBaUI7WUFDakIsa0JBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDekIsYUFBRyxDQUFDLFlBQVksRUFBRSxjQUFRLE1BQU0seUJBQXlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUQsWUFBRSxDQUFDLGtCQUFrQixFQUFFO29CQUNJLHNCQUFzQjtnQkFDMUIsQ0FBQyxDQUFDLENBQUM7WUFDNUIsQ0FBQyxDQUFDLENBQUM7WUFDSCxnQkFBZ0I7WUFFaEIsd0JBQXdCO1lBQ3hCLGtCQUFRLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3pCLG9CQUFVLENBQUMsY0FBUSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsWUFBRSxDQUFDLGFBQWEsRUFBRTtvQkFDSSx5QkFBeUI7Z0JBQzdCLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsZ0JBQWdCO1lBRWhCLGlDQUFpQztZQUNqQyxrQkFBUSxDQUFDLGdCQUFnQixFQUFFO2dCQUN6Qiw2QkFBbUIsQ0FBQyxjQUFNLE9BQUEsQ0FBQyxjQUFPLENBQUMsU0FBUyxFQUFFLEVBQUMsUUFBUSxFQUFFLGFBQWEsRUFBQyxDQUFDLENBQUMsRUFBL0MsQ0FBK0MsQ0FBQyxDQUFDO2dCQUMzRSxZQUFFLENBQUMsZ0JBQWdCLEVBQUUsZ0JBQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLFVBQUMsT0FBc0I7b0JBQ25CLDJDQUEyQztnQkFDL0MsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQyxDQUFDLENBQUMsQ0FBQztZQUNILGdCQUFnQjtZQUVoQix1QkFBdUI7WUFDdkIsa0JBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDekIsbUJBQVMsQ0FBQyxVQUFDLElBQWMsSUFBTyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBTSxJQUFLLE9BQUEsSUFBSSxFQUFFLEVBQU4sQ0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEUsWUFBRSxDQUFDLGFBQWEsRUFBRTtvQkFDSSxxREFBcUQ7b0JBQ3JELDJDQUEyQztnQkFDL0MsQ0FBQyxDQUFDLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUM7Ozs7QUFDSCxnQkFBZ0IiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9leGFtcGxlcy90ZXN0aW5nL3RzL3Rlc3RpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBkZXNjcmliZSxcbiAgZmRlc2NyaWJlLFxuICB4ZGVzY3JpYmUsXG4gIGl0LFxuICBmaXQsXG4gIHhpdCxcbiAgYmVmb3JlRWFjaCxcbiAgYWZ0ZXJFYWNoLFxuICBiZWZvcmVFYWNoUHJvdmlkZXJzLFxuICBpbmplY3Rcbn0gZnJvbSAnYW5ndWxhcjIvdGVzdGluZyc7XG5pbXBvcnQge3Byb3ZpZGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuXG52YXIgZGI6IGFueTtcbmNsYXNzIE15U2VydmljZSB7fVxuY2xhc3MgTXlNb2NrU2VydmljZSBpbXBsZW1lbnRzIE15U2VydmljZSB7fVxuXG4vLyAjZG9jcmVnaW9uIGRlc2NyaWJlSXRcbmRlc2NyaWJlKCdzb21lIGNvbXBvbmVudCcsICgpID0+IHtcbiAgaXQoJ2RvZXMgc29tZXRoaW5nJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBpcyBhIHRlc3QuXG4gICAgICAgICAgICAgICAgICAgICAgIH0pO1xufSk7XG4vLyAjZW5kZG9jcmVnaW9uXG5cbi8vICNkb2NyZWdpb24gZmRlc2NyaWJlXG5mZGVzY3JpYmUoJ3NvbWUgY29tcG9uZW50JywgKCkgPT4ge1xuICBpdCgnaGFzIGEgdGVzdCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyB0ZXN0IHdpbGwgcnVuLlxuICAgICAgICAgICAgICAgICAgIH0pO1xufSk7XG5kZXNjcmliZSgnYW5vdGhlciBjb21wb25lbnQnLFxuICAgICAgICAgKCkgPT4geyBpdCgnYWxzbyBoYXMgYSB0ZXN0JywgKCkgPT4geyB0aHJvdyAnVGhpcyB0ZXN0IHdpbGwgbm90IHJ1bi4nOyB9KTsgfSk7XG4vLyAjZW5kZG9jcmVnaW9uXG5cbi8vICNkb2NyZWdpb24geGRlc2NyaWJlXG54ZGVzY3JpYmUoJ3NvbWUgY29tcG9uZW50JywgKCkgPT4geyBpdCgnaGFzIGEgdGVzdCcsICgpID0+IHt0aHJvdyAnVGhpcyB0ZXN0IHdpbGwgbm90IHJ1bi4nfSk7IH0pO1xuZGVzY3JpYmUoJ2Fub3RoZXIgY29tcG9uZW50JywgKCkgPT4ge1xuICBpdCgnYWxzbyBoYXMgYSB0ZXN0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgdGVzdCB3aWxsIHJ1bi5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xufSk7XG4vLyAjZW5kZG9jcmVnaW9uXG5cbi8vICNkb2NyZWdpb24gZml0XG5kZXNjcmliZSgnc29tZSBjb21wb25lbnQnLCAoKSA9PiB7XG4gIGZpdCgnaGFzIGEgdGVzdCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgdGVzdCB3aWxsIHJ1bi5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gIGl0KCdoYXMgYW5vdGhlciB0ZXN0JywgKCkgPT4geyB0aHJvdyAnVGhpcyB0ZXN0IHdpbGwgbm90IHJ1bi4nOyB9KTtcbn0pO1xuLy8gI2VuZGRvY3JlZ2lvblxuXG4vLyAjZG9jcmVnaW9uIHhpdFxuZGVzY3JpYmUoJ3NvbWUgY29tcG9uZW50JywgKCkgPT4ge1xuICB4aXQoJ2hhcyBhIHRlc3QnLCAoKSA9PiB7IHRocm93ICdUaGlzIHRlc3Qgd2lsbCBub3QgcnVuLic7IH0pO1xuICBpdCgnaGFzIGFub3RoZXIgdGVzdCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyB0ZXN0IHdpbGwgcnVuLlxuICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xufSk7XG4vLyAjZW5kZG9jcmVnaW9uXG5cbi8vICNkb2NyZWdpb24gYmVmb3JlRWFjaFxuZGVzY3JpYmUoJ3NvbWUgY29tcG9uZW50JywgKCkgPT4ge1xuICBiZWZvcmVFYWNoKCgpID0+IHsgZGIuY29ubmVjdCgpOyB9KTtcbiAgaXQoJ3VzZXMgdGhlIGRiJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRGF0YWJhc2UgaXMgY29ubmVjdGVkLlxuICAgICAgICAgICAgICAgICAgICB9KTtcbn0pO1xuLy8gI2VuZGRvY3JlZ2lvblxuXG4vLyAjZG9jcmVnaW9uIGJlZm9yZUVhY2hQcm92aWRlcnNcbmRlc2NyaWJlKCdzb21lIGNvbXBvbmVudCcsICgpID0+IHtcbiAgYmVmb3JlRWFjaFByb3ZpZGVycygoKSA9PiBbcHJvdmlkZShNeVNlcnZpY2UsIHt1c2VDbGFzczogTXlNb2NrU2VydmljZX0pXSk7XG4gIGl0KCd1c2VzIE15U2VydmljZScsIGluamVjdChbTXlTZXJ2aWNlXSwgKHNlcnZpY2U6IE15TW9ja1NlcnZpY2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2VydmljZSBpcyBhbiBpbnN0YW5jZSBvZiBNeU1vY2tTZXJ2aWNlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbn0pO1xuLy8gI2VuZGRvY3JlZ2lvblxuXG4vLyAjZG9jcmVnaW9uIGFmdGVyRWFjaFxuZGVzY3JpYmUoJ3NvbWUgY29tcG9uZW50JywgKCkgPT4ge1xuICBhZnRlckVhY2goKGRvbmU6IEZ1bmN0aW9uKSA9PiB7IGRiLnJlc2V0KCkudGhlbigoXzogYW55KSA9PiBkb25lKCkpOyB9KTtcbiAgaXQoJ3VzZXMgdGhlIGRiJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyB0ZXN0IGNhbiBsZWF2ZSB0aGUgZGF0YWJhc2UgaW4gYSBkaXJ0eSBzdGF0ZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBhZnRlckVhY2ggd2lsbCBlbnN1cmUgaXQgZ2V0cyByZXNldC5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG59KTtcbi8vICNlbmRkb2NyZWdpb25cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
