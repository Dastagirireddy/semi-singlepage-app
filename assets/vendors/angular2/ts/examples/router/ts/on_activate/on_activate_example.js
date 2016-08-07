System.register(['angular2/core', 'angular2/platform/browser', 'angular2/router', 'angular2/platform/common'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, browser_1, router_1, common_1;
    var ChildCmp, ParentCmp, AppCmp;
    function main() {
        return browser_1.bootstrap(AppCmp, [core_1.provide(common_1.APP_BASE_HREF, { useValue: '/angular2/examples/router/ts/on_activate' })]);
    }
    exports_1("main", main);
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            // #docregion routerOnActivate
            ChildCmp = (function () {
                function ChildCmp() {
                }
                ChildCmp = __decorate([
                    core_1.Component({ template: "Child" }), 
                    __metadata('design:paramtypes', [])
                ], ChildCmp);
                return ChildCmp;
            }());
            ParentCmp = (function () {
                function ParentCmp() {
                    this.log = '';
                }
                ParentCmp.prototype.routerOnActivate = function (next, prev) {
                    this.log = "Finished navigating from \"" + (prev ? prev.urlPath : 'null') + "\" to \"" + next.urlPath + "\"";
                    return new Promise(function (resolve) {
                        // The ChildCmp gets instantiated only when the Promise is resolved
                        setTimeout(function () { return resolve(null); }, 1000);
                    });
                };
                ParentCmp = __decorate([
                    core_1.Component({
                        template: "\n    <h2>Parent</h2> (<router-outlet></router-outlet>)\n    <p>{{log}}</p>",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([{ path: '/child', name: 'Child', component: ChildCmp }]), 
                    __metadata('design:paramtypes', [])
                ], ParentCmp);
                return ParentCmp;
            }());
            // #enddocregion
            AppCmp = (function () {
                function AppCmp() {
                }
                AppCmp = __decorate([
                    core_1.Component({
                        selector: 'example-app',
                        template: "\n    <h1>My app</h1>\n\n    <nav>\n      <a [routerLink]=\"['Parent', 'Child']\">Child</a>\n    </nav>\n    <router-outlet></router-outlet>\n  ",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([{ path: '/parent/...', name: 'Parent', component: ParentCmp }]), 
                    __metadata('design:paramtypes', [])
                ], AppCmp);
                return AppCmp;
            }());
            exports_1("AppCmp", AppCmp);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL3JvdXRlci90cy9vbl9hY3RpdmF0ZS9vbl9hY3RpdmF0ZV9leGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBZ0RBO1FBQ0UsTUFBTSxDQUFDLG1CQUFTLENBQ1osTUFBTSxFQUFFLENBQUMsY0FBTyxDQUFDLHNCQUFhLEVBQUUsRUFBQyxRQUFRLEVBQUUsMENBQTBDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRyxDQUFDO0lBSEQsdUJBR0MsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7OztZQTlDRCw4QkFBOEI7WUFFOUI7Z0JBQUE7Z0JBQ0EsQ0FBQztnQkFGRDtvQkFBQyxnQkFBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLE9BQU8sRUFBQyxDQUFDOzs0QkFBQTtnQkFFL0IsZUFBQztZQUFELENBREEsQUFDQyxJQUFBO1lBU0Q7Z0JBQUE7b0JBQ0UsUUFBRyxHQUFXLEVBQUUsQ0FBQztnQkFVbkIsQ0FBQztnQkFSQyxvQ0FBZ0IsR0FBaEIsVUFBaUIsSUFBMEIsRUFBRSxJQUEwQjtvQkFDckUsSUFBSSxDQUFDLEdBQUcsR0FBRyxpQ0FBNkIsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxpQkFBUyxJQUFJLENBQUMsT0FBTyxPQUFHLENBQUM7b0JBRTdGLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFBLE9BQU87d0JBQ3hCLG1FQUFtRTt3QkFDbkUsVUFBVSxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQWIsQ0FBYSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUN4QyxDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDO2dCQWpCSDtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSw2RUFFTzt3QkFDakIsVUFBVSxFQUFFLENBQUMsMEJBQWlCLENBQUM7cUJBQ2hDLENBQUM7b0JBQ0Qsb0JBQVcsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDOzs2QkFBQTtnQkFZcEUsZ0JBQUM7WUFBRCxDQVhBLEFBV0MsSUFBQTtZQUNELGdCQUFnQjtZQWdCaEI7Z0JBQUE7Z0JBQ0EsQ0FBQztnQkFkRDtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSxhQUFhO3dCQUN2QixRQUFRLEVBQUUsa0pBT1Q7d0JBQ0QsVUFBVSxFQUFFLENBQUMsMEJBQWlCLENBQUM7cUJBQ2hDLENBQUM7b0JBQ0Qsb0JBQVcsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDOzswQkFBQTtnQkFFM0UsYUFBQztZQUFELENBREEsQUFDQyxJQUFBO1lBREQsMkJBQ0MsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9leGFtcGxlcy9yb3V0ZXIvdHMvb25fYWN0aXZhdGUvb25fYWN0aXZhdGVfZXhhbXBsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBwcm92aWRlfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Ym9vdHN0cmFwfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9icm93c2VyJztcbmltcG9ydCB7T25BY3RpdmF0ZSwgQ29tcG9uZW50SW5zdHJ1Y3Rpb24sIFJvdXRlQ29uZmlnLCBST1VURVJfRElSRUNUSVZFU30gZnJvbSAnYW5ndWxhcjIvcm91dGVyJztcbmltcG9ydCB7QVBQX0JBU0VfSFJFRn0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vY29tbW9uJztcblxuLy8gI2RvY3JlZ2lvbiByb3V0ZXJPbkFjdGl2YXRlXG5AQ29tcG9uZW50KHt0ZW1wbGF0ZTogYENoaWxkYH0pXG5jbGFzcyBDaGlsZENtcCB7XG59XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZTogYFxuICAgIDxoMj5QYXJlbnQ8L2gyPiAoPHJvdXRlci1vdXRsZXQ+PC9yb3V0ZXItb3V0bGV0PilcbiAgICA8cD57e2xvZ319PC9wPmAsXG4gIGRpcmVjdGl2ZXM6IFtST1VURVJfRElSRUNUSVZFU11cbn0pXG5AUm91dGVDb25maWcoW3twYXRoOiAnL2NoaWxkJywgbmFtZTogJ0NoaWxkJywgY29tcG9uZW50OiBDaGlsZENtcH1dKVxuY2xhc3MgUGFyZW50Q21wIGltcGxlbWVudHMgT25BY3RpdmF0ZSB7XG4gIGxvZzogc3RyaW5nID0gJyc7XG5cbiAgcm91dGVyT25BY3RpdmF0ZShuZXh0OiBDb21wb25lbnRJbnN0cnVjdGlvbiwgcHJldjogQ29tcG9uZW50SW5zdHJ1Y3Rpb24pIHtcbiAgICB0aGlzLmxvZyA9IGBGaW5pc2hlZCBuYXZpZ2F0aW5nIGZyb20gXCIke3ByZXYgPyBwcmV2LnVybFBhdGggOiAnbnVsbCd9XCIgdG8gXCIke25leHQudXJsUGF0aH1cImA7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAvLyBUaGUgQ2hpbGRDbXAgZ2V0cyBpbnN0YW50aWF0ZWQgb25seSB3aGVuIHRoZSBQcm9taXNlIGlzIHJlc29sdmVkXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHJlc29sdmUobnVsbCksIDEwMDApO1xuICAgIH0pO1xuICB9XG59XG4vLyAjZW5kZG9jcmVnaW9uXG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZXhhbXBsZS1hcHAnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxoMT5NeSBhcHA8L2gxPlxuXG4gICAgPG5hdj5cbiAgICAgIDxhIFtyb3V0ZXJMaW5rXT1cIlsnUGFyZW50JywgJ0NoaWxkJ11cIj5DaGlsZDwvYT5cbiAgICA8L25hdj5cbiAgICA8cm91dGVyLW91dGxldD48L3JvdXRlci1vdXRsZXQ+XG4gIGAsXG4gIGRpcmVjdGl2ZXM6IFtST1VURVJfRElSRUNUSVZFU11cbn0pXG5AUm91dGVDb25maWcoW3twYXRoOiAnL3BhcmVudC8uLi4nLCBuYW1lOiAnUGFyZW50JywgY29tcG9uZW50OiBQYXJlbnRDbXB9XSlcbmV4cG9ydCBjbGFzcyBBcHBDbXAge1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgcmV0dXJuIGJvb3RzdHJhcChcbiAgICAgIEFwcENtcCwgW3Byb3ZpZGUoQVBQX0JBU0VfSFJFRiwge3VzZVZhbHVlOiAnL2FuZ3VsYXIyL2V4YW1wbGVzL3JvdXRlci90cy9vbl9hY3RpdmF0ZSd9KV0pO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
