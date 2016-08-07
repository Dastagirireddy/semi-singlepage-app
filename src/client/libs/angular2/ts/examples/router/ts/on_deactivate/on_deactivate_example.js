System.register(['angular2/core', 'angular2/platform/browser', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, browser_1, router_1;
    var LogService, MyCmp, AppCmp;
    function main() {
        return browser_1.bootstrap(AppCmp, [
            core_1.provide(router_1.APP_BASE_HREF, { useValue: '/angular2/examples/router/ts/on_deactivate' }),
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
                        template: "\n    <h1>My App</h1>\n    <nav>\n      <a [routerLink]=\"['/HomeCmp']\" id=\"home-link\">Navigate Home</a> |\n      <a [routerLink]=\"['/ParamCmp', {param: 1}]\" id=\"param-link\">Navigate with a Param</a>\n    </nav>\n    <router-outlet></router-outlet>\n    <div id=\"log\">\n      <h2>Log:</h2>\n      <p *ngFor=\"#logItem of logService.logs\">{{ logItem }}</p>\n    </div>\n  ",
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvcm91dGVyL3RzL29uX2RlYWN0aXZhdGUvb25fZGVhY3RpdmF0ZV9leGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBeURBO1FBQ0UsTUFBTSxDQUFDLG1CQUFTLENBQUMsTUFBTSxFQUFFO1lBQ3ZCLGNBQU8sQ0FBQyxzQkFBYSxFQUFFLEVBQUMsUUFBUSxFQUFFLDRDQUE0QyxFQUFDLENBQUM7WUFDaEYsVUFBVTtTQUNYLENBQUMsQ0FBQztJQUNMLENBQUM7SUFMRCx1QkFLQyxDQUFBOzs7Ozs7Ozs7Ozs7O1lBbEREO2dCQUFBO29CQUNFLFNBQUksR0FBYSxFQUFFLENBQUM7Z0JBR3RCLENBQUM7Z0JBREMsMkJBQU0sR0FBTixVQUFPLE9BQWUsSUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBSjVEO29CQUFDLGlCQUFVLEVBQUU7OzhCQUFBO2dCQUtiLGlCQUFDO1lBQUQsQ0FKQSxBQUlDLElBQUE7WUFHRCxnQ0FBZ0M7WUFFaEM7Z0JBQ0UsZUFBb0IsVUFBc0I7b0JBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7Z0JBQUcsQ0FBQztnQkFFOUMsa0NBQWtCLEdBQWxCLFVBQW1CLElBQTBCLEVBQUUsSUFBMEI7b0JBQ3ZFLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUNsQix3QkFBb0IsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxpQkFBUyxJQUFJLENBQUMsT0FBTyxPQUFHLENBQUMsQ0FBQztnQkFDaEYsQ0FBQztnQkFQSDtvQkFBQyxnQkFBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQzs7eUJBQUE7Z0JBUTlELFlBQUM7WUFBRCxDQVBBLEFBT0MsSUFBQTtZQUNELGdCQUFnQjtZQXVCaEI7Z0JBQ0UsZ0JBQW1CLFVBQXNCO29CQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO2dCQUFHLENBQUM7Z0JBckIvQztvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSxhQUFhO3dCQUN2QixRQUFRLEVBQUUsK1hBV1Q7d0JBQ0QsVUFBVSxFQUFFLENBQUMsMEJBQWlCLENBQUM7cUJBQ2hDLENBQUM7b0JBQ0Qsb0JBQVcsQ0FBQzt3QkFDWCxFQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDO3dCQUM5QyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFDO3FCQUN0RCxDQUFDOzswQkFBQTtnQkFHRixhQUFDO1lBQUQsQ0FGQSxBQUVDLElBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9leGFtcGxlcy9yb3V0ZXIvdHMvb25fZGVhY3RpdmF0ZS9vbl9kZWFjdGl2YXRlX2V4YW1wbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5qZWN0YWJsZSwgcHJvdmlkZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge2Jvb3RzdHJhcH0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vYnJvd3Nlcic7XG5pbXBvcnQge1xuICBPbkRlYWN0aXZhdGUsXG4gIENvbXBvbmVudEluc3RydWN0aW9uLFxuICBSb3V0ZUNvbmZpZyxcbiAgUk9VVEVSX0RJUkVDVElWRVMsXG4gIEFQUF9CQVNFX0hSRUZcbn0gZnJvbSAnYW5ndWxhcjIvcm91dGVyJztcblxuXG5ASW5qZWN0YWJsZSgpXG5jbGFzcyBMb2dTZXJ2aWNlIHtcbiAgbG9nczogc3RyaW5nW10gPSBbXTtcblxuICBhZGRMb2cobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7IHRoaXMubG9ncy5wdXNoKG1lc3NhZ2UpOyB9XG59XG5cblxuLy8gI2RvY3JlZ2lvbiByb3V0ZXJPbkRlYWN0aXZhdGVcbkBDb21wb25lbnQoe3NlbGVjdG9yOiAnbXktY21wJywgdGVtcGxhdGU6IGA8ZGl2PmhlbGxvPC9kaXY+YH0pXG5jbGFzcyBNeUNtcCBpbXBsZW1lbnRzIE9uRGVhY3RpdmF0ZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbG9nU2VydmljZTogTG9nU2VydmljZSkge31cblxuICByb3V0ZXJPbkRlYWN0aXZhdGUobmV4dDogQ29tcG9uZW50SW5zdHJ1Y3Rpb24sIHByZXY6IENvbXBvbmVudEluc3RydWN0aW9uKSB7XG4gICAgdGhpcy5sb2dTZXJ2aWNlLmFkZExvZyhcbiAgICAgICAgYE5hdmlnYXRpbmcgZnJvbSBcIiR7cHJldiA/IHByZXYudXJsUGF0aCA6ICdudWxsJ31cIiB0byBcIiR7bmV4dC51cmxQYXRofVwiYCk7XG4gIH1cbn1cbi8vICNlbmRkb2NyZWdpb25cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdleGFtcGxlLWFwcCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGgxPk15IEFwcDwvaDE+XG4gICAgPG5hdj5cbiAgICAgIDxhIFtyb3V0ZXJMaW5rXT1cIlsnL0hvbWVDbXAnXVwiIGlkPVwiaG9tZS1saW5rXCI+TmF2aWdhdGUgSG9tZTwvYT4gfFxuICAgICAgPGEgW3JvdXRlckxpbmtdPVwiWycvUGFyYW1DbXAnLCB7cGFyYW06IDF9XVwiIGlkPVwicGFyYW0tbGlua1wiPk5hdmlnYXRlIHdpdGggYSBQYXJhbTwvYT5cbiAgICA8L25hdj5cbiAgICA8cm91dGVyLW91dGxldD48L3JvdXRlci1vdXRsZXQ+XG4gICAgPGRpdiBpZD1cImxvZ1wiPlxuICAgICAgPGgyPkxvZzo8L2gyPlxuICAgICAgPHAgKm5nRm9yPVwiI2xvZ0l0ZW0gb2YgbG9nU2VydmljZS5sb2dzXCI+e3sgbG9nSXRlbSB9fTwvcD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTXVxufSlcbkBSb3V0ZUNvbmZpZyhbXG4gIHtwYXRoOiAnLycsIGNvbXBvbmVudDogTXlDbXAsIG5hbWU6ICdIb21lQ21wJ30sXG4gIHtwYXRoOiAnLzpwYXJhbScsIGNvbXBvbmVudDogTXlDbXAsIG5hbWU6ICdQYXJhbUNtcCd9XG5dKVxuY2xhc3MgQXBwQ21wIHtcbiAgY29uc3RydWN0b3IocHVibGljIGxvZ1NlcnZpY2U6IExvZ1NlcnZpY2UpIHt9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIHJldHVybiBib290c3RyYXAoQXBwQ21wLCBbXG4gICAgcHJvdmlkZShBUFBfQkFTRV9IUkVGLCB7dXNlVmFsdWU6ICcvYW5ndWxhcjIvZXhhbXBsZXMvcm91dGVyL3RzL29uX2RlYWN0aXZhdGUnfSksXG4gICAgTG9nU2VydmljZVxuICBdKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
