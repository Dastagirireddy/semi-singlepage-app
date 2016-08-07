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
    var LogService, MyCmp, AppCmp;
    function main() {
        return browser_1.bootstrap(AppCmp, [
            core_1.provide(common_1.APP_BASE_HREF, { useValue: '/angular2/examples/router/ts/on_deactivate' }),
            LogService
        ]);
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
            LogService = (function () {
                function LogService() {
                    this.logs = [];
                }
                LogService.prototype.addLog = function (message) { this.logs.push(message); };
                LogService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], LogService);
                return LogService;
            }());
            // #docregion routerOnDeactivate
            MyCmp = (function () {
                function MyCmp(logService) {
                    this.logService = logService;
                }
                MyCmp.prototype.routerOnDeactivate = function (next, prev) {
                    this.logService.addLog("Navigating from \"" + (prev ? prev.urlPath : 'null') + "\" to \"" + next.urlPath + "\"");
                };
                MyCmp = __decorate([
                    core_1.Component({ selector: 'my-cmp', template: "<div>hello</div>" }), 
                    __metadata('design:paramtypes', [LogService])
                ], MyCmp);
                return MyCmp;
            }());
            // #enddocregion
            AppCmp = (function () {
                function AppCmp(logService) {
                    this.logService = logService;
                }
                AppCmp = __decorate([
                    core_1.Component({
                        selector: 'example-app',
                        template: "\n    <h1>My App</h1>\n    <nav>\n      <a [routerLink]=\"['/HomeCmp']\" id=\"home-link\">Navigate Home</a> |\n      <a [routerLink]=\"['/ParamCmp', {param: 1}]\" id=\"param-link\">Navigate with a Param</a>\n    </nav>\n    <router-outlet></router-outlet>\n    <div id=\"log\">\n      <h2>Log:</h2>\n      <p *ngFor=\"let logItem of logService.logs\">{{ logItem }}</p>\n    </div>\n  ",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: '/', component: MyCmp, name: 'HomeCmp' },
                        { path: '/:param', component: MyCmp, name: 'ParamCmp' }
                    ]), 
                    __metadata('design:paramtypes', [LogService])
                ], AppCmp);
                return AppCmp;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL3JvdXRlci90cy9vbl9kZWFjdGl2YXRlL29uX2RlYWN0aXZhdGVfZXhhbXBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQW9EQTtRQUNFLE1BQU0sQ0FBQyxtQkFBUyxDQUFDLE1BQU0sRUFBRTtZQUN2QixjQUFPLENBQUMsc0JBQWEsRUFBRSxFQUFDLFFBQVEsRUFBRSw0Q0FBNEMsRUFBQyxDQUFDO1lBQ2hGLFVBQVU7U0FDWCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBTEQsdUJBS0MsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7OztZQWxERDtnQkFBQTtvQkFDRSxTQUFJLEdBQWEsRUFBRSxDQUFDO2dCQUd0QixDQUFDO2dCQURDLDJCQUFNLEdBQU4sVUFBTyxPQUFlLElBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUo1RDtvQkFBQyxpQkFBVSxFQUFFOzs4QkFBQTtnQkFLYixpQkFBQztZQUFELENBSkEsQUFJQyxJQUFBO1lBR0QsZ0NBQWdDO1lBRWhDO2dCQUNFLGVBQW9CLFVBQXNCO29CQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO2dCQUFHLENBQUM7Z0JBRTlDLGtDQUFrQixHQUFsQixVQUFtQixJQUEwQixFQUFFLElBQTBCO29CQUN2RSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FDbEIsd0JBQW9CLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0saUJBQVMsSUFBSSxDQUFDLE9BQU8sT0FBRyxDQUFDLENBQUM7Z0JBQ2hGLENBQUM7Z0JBUEg7b0JBQUMsZ0JBQVMsQ0FBQyxFQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixFQUFDLENBQUM7O3lCQUFBO2dCQVE5RCxZQUFDO1lBQUQsQ0FQQSxBQU9DLElBQUE7WUFDRCxnQkFBZ0I7WUF1QmhCO2dCQUNFLGdCQUFtQixVQUFzQjtvQkFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtnQkFBRyxDQUFDO2dCQXJCL0M7b0JBQUMsZ0JBQVMsQ0FBQzt3QkFDVCxRQUFRLEVBQUUsYUFBYTt3QkFDdkIsUUFBUSxFQUFFLGtZQVdUO3dCQUNELFVBQVUsRUFBRSxDQUFDLDBCQUFpQixDQUFDO3FCQUNoQyxDQUFDO29CQUNELG9CQUFXLENBQUM7d0JBQ1gsRUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQzt3QkFDOUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBQztxQkFDdEQsQ0FBQzs7MEJBQUE7Z0JBR0YsYUFBQztZQUFELENBRkEsQUFFQyxJQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL3JvdXRlci90cy9vbl9kZWFjdGl2YXRlL29uX2RlYWN0aXZhdGVfZXhhbXBsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbmplY3RhYmxlLCBwcm92aWRlfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Ym9vdHN0cmFwfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9icm93c2VyJztcbmltcG9ydCB7T25EZWFjdGl2YXRlLCBDb21wb25lbnRJbnN0cnVjdGlvbiwgUm91dGVDb25maWcsIFJPVVRFUl9ESVJFQ1RJVkVTfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXInO1xuaW1wb3J0IHtBUFBfQkFTRV9IUkVGfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9jb21tb24nO1xuXG5cbkBJbmplY3RhYmxlKClcbmNsYXNzIExvZ1NlcnZpY2Uge1xuICBsb2dzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGFkZExvZyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHsgdGhpcy5sb2dzLnB1c2gobWVzc2FnZSk7IH1cbn1cblxuXG4vLyAjZG9jcmVnaW9uIHJvdXRlck9uRGVhY3RpdmF0ZVxuQENvbXBvbmVudCh7c2VsZWN0b3I6ICdteS1jbXAnLCB0ZW1wbGF0ZTogYDxkaXY+aGVsbG88L2Rpdj5gfSlcbmNsYXNzIE15Q21wIGltcGxlbWVudHMgT25EZWFjdGl2YXRlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsb2dTZXJ2aWNlOiBMb2dTZXJ2aWNlKSB7fVxuXG4gIHJvdXRlck9uRGVhY3RpdmF0ZShuZXh0OiBDb21wb25lbnRJbnN0cnVjdGlvbiwgcHJldjogQ29tcG9uZW50SW5zdHJ1Y3Rpb24pIHtcbiAgICB0aGlzLmxvZ1NlcnZpY2UuYWRkTG9nKFxuICAgICAgICBgTmF2aWdhdGluZyBmcm9tIFwiJHtwcmV2ID8gcHJldi51cmxQYXRoIDogJ251bGwnfVwiIHRvIFwiJHtuZXh0LnVybFBhdGh9XCJgKTtcbiAgfVxufVxuLy8gI2VuZGRvY3JlZ2lvblxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2V4YW1wbGUtYXBwJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aDE+TXkgQXBwPC9oMT5cbiAgICA8bmF2PlxuICAgICAgPGEgW3JvdXRlckxpbmtdPVwiWycvSG9tZUNtcCddXCIgaWQ9XCJob21lLWxpbmtcIj5OYXZpZ2F0ZSBIb21lPC9hPiB8XG4gICAgICA8YSBbcm91dGVyTGlua109XCJbJy9QYXJhbUNtcCcsIHtwYXJhbTogMX1dXCIgaWQ9XCJwYXJhbS1saW5rXCI+TmF2aWdhdGUgd2l0aCBhIFBhcmFtPC9hPlxuICAgIDwvbmF2PlxuICAgIDxyb3V0ZXItb3V0bGV0Pjwvcm91dGVyLW91dGxldD5cbiAgICA8ZGl2IGlkPVwibG9nXCI+XG4gICAgICA8aDI+TG9nOjwvaDI+XG4gICAgICA8cCAqbmdGb3I9XCJsZXQgbG9nSXRlbSBvZiBsb2dTZXJ2aWNlLmxvZ3NcIj57eyBsb2dJdGVtIH19PC9wPlxuICAgIDwvZGl2PlxuICBgLFxuICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVNdXG59KVxuQFJvdXRlQ29uZmlnKFtcbiAge3BhdGg6ICcvJywgY29tcG9uZW50OiBNeUNtcCwgbmFtZTogJ0hvbWVDbXAnfSxcbiAge3BhdGg6ICcvOnBhcmFtJywgY29tcG9uZW50OiBNeUNtcCwgbmFtZTogJ1BhcmFtQ21wJ31cbl0pXG5jbGFzcyBBcHBDbXAge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbG9nU2VydmljZTogTG9nU2VydmljZSkge31cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgcmV0dXJuIGJvb3RzdHJhcChBcHBDbXAsIFtcbiAgICBwcm92aWRlKEFQUF9CQVNFX0hSRUYsIHt1c2VWYWx1ZTogJy9hbmd1bGFyMi9leGFtcGxlcy9yb3V0ZXIvdHMvb25fZGVhY3RpdmF0ZSd9KSxcbiAgICBMb2dTZXJ2aWNlXG4gIF0pO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
