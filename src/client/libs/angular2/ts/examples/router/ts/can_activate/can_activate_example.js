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
    var ControlPanelCmp, HomeCmp, AppCmp;
    function checkIfWeHavePermission(instruction) {
        return instruction.params['id'] == '1';
    }
    function main() {
        return browser_1.bootstrap(AppCmp, [core_1.provide(router_1.APP_BASE_HREF, { useValue: '/angular2/examples/router/ts/can_activate' })]);
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
            // #docregion canActivate
            ControlPanelCmp = (function () {
                function ControlPanelCmp() {
                }
                ControlPanelCmp = __decorate([
                    core_1.Component({ selector: 'control-panel-cmp', template: "<div>Settings: ...</div>" }),
                    router_1.CanActivate(checkIfWeHavePermission), 
                    __metadata('design:paramtypes', [])
                ], ControlPanelCmp);
                return ControlPanelCmp;
            }());
            // #enddocregion
            HomeCmp = (function () {
                function HomeCmp() {
                }
                HomeCmp = __decorate([
                    core_1.Component({
                        selector: 'home-cmp',
                        template: "\n    <h1>Welcome Home!</h1>\n    <div>\n      Edit <a [routerLink]=\"['/ControlPanelCmp', {id: 1}]\" id=\"user-1-link\">User 1</a> |\n      Edit <a [routerLink]=\"['/ControlPanelCmp', {id: 2}]\" id=\"user-2-link\">User 2</a>\n    </div>\n  ",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [])
                ], HomeCmp);
                return HomeCmp;
            }());
            AppCmp = (function () {
                function AppCmp() {
                }
                AppCmp = __decorate([
                    core_1.Component({
                        selector: 'example-app',
                        template: "\n    <h1>My App</h1>\n    <router-outlet></router-outlet>\n  ",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: '/user-settings/:id', component: ControlPanelCmp, name: 'ControlPanelCmp' },
                        { path: '/', component: HomeCmp, name: 'HomeCmp' }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppCmp);
                return AppCmp;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvcm91dGVyL3RzL2Nhbl9hY3RpdmF0ZS9jYW5fYWN0aXZhdGVfZXhhbXBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQVVBLGlDQUFpQyxXQUFpQztRQUNoRSxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUM7SUFDekMsQ0FBQztJQXlDRDtRQUNFLE1BQU0sQ0FBQyxtQkFBUyxDQUNaLE1BQU0sRUFBRSxDQUFDLGNBQU8sQ0FBQyxzQkFBYSxFQUFFLEVBQUMsUUFBUSxFQUFFLDJDQUEyQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakcsQ0FBQztJQUhELHVCQUdDLENBQUE7Ozs7Ozs7Ozs7Ozs7WUExQ0QseUJBQXlCO1lBR3pCO2dCQUFBO2dCQUNBLENBQUM7Z0JBSEQ7b0JBQUMsZ0JBQVMsQ0FBQyxFQUFDLFFBQVEsRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsMEJBQTBCLEVBQUMsQ0FBQztvQkFDaEYsb0JBQVcsQ0FBQyx1QkFBdUIsQ0FBQzs7bUNBQUE7Z0JBRXJDLHNCQUFDO1lBQUQsQ0FEQSxBQUNDLElBQUE7WUFDRCxnQkFBZ0I7WUFjaEI7Z0JBQUE7Z0JBQ0EsQ0FBQztnQkFaRDtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSxVQUFVO3dCQUNwQixRQUFRLEVBQUUsbVBBTVQ7d0JBQ0QsVUFBVSxFQUFFLENBQUMsMEJBQWlCLENBQUM7cUJBQ2hDLENBQUM7OzJCQUFBO2dCQUVGLGNBQUM7WUFBRCxDQURBLEFBQ0MsSUFBQTtZQWVEO2dCQUFBO2dCQUNBLENBQUM7Z0JBYkQ7b0JBQUMsZ0JBQVMsQ0FBQzt3QkFDVCxRQUFRLEVBQUUsYUFBYTt3QkFDdkIsUUFBUSxFQUFFLGdFQUdUO3dCQUNELFVBQVUsRUFBRSxDQUFDLDBCQUFpQixDQUFDO3FCQUNoQyxDQUFDO29CQUNELG9CQUFXLENBQUM7d0JBQ1gsRUFBQyxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUM7d0JBQ2pGLEVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUM7cUJBQ2pELENBQUM7OzBCQUFBO2dCQUVGLGFBQUM7WUFBRCxDQURBLEFBQ0MsSUFBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL3JvdXRlci90cy9jYW5fYWN0aXZhdGUvY2FuX2FjdGl2YXRlX2V4YW1wbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3Byb3ZpZGUsIENvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge2Jvb3RzdHJhcH0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vYnJvd3Nlcic7XG5pbXBvcnQge1xuICBDYW5BY3RpdmF0ZSxcbiAgUm91dGVDb25maWcsXG4gIENvbXBvbmVudEluc3RydWN0aW9uLFxuICBBUFBfQkFTRV9IUkVGLFxuICBST1VURVJfRElSRUNUSVZFU1xufSBmcm9tICdhbmd1bGFyMi9yb3V0ZXInO1xuXG5mdW5jdGlvbiBjaGVja0lmV2VIYXZlUGVybWlzc2lvbihpbnN0cnVjdGlvbjogQ29tcG9uZW50SW5zdHJ1Y3Rpb24pIHtcbiAgcmV0dXJuIGluc3RydWN0aW9uLnBhcmFtc1snaWQnXSA9PSAnMSc7XG59XG5cbi8vICNkb2NyZWdpb24gY2FuQWN0aXZhdGVcbkBDb21wb25lbnQoe3NlbGVjdG9yOiAnY29udHJvbC1wYW5lbC1jbXAnLCB0ZW1wbGF0ZTogYDxkaXY+U2V0dGluZ3M6IC4uLjwvZGl2PmB9KVxuQENhbkFjdGl2YXRlKGNoZWNrSWZXZUhhdmVQZXJtaXNzaW9uKVxuY2xhc3MgQ29udHJvbFBhbmVsQ21wIHtcbn1cbi8vICNlbmRkb2NyZWdpb25cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdob21lLWNtcCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGgxPldlbGNvbWUgSG9tZSE8L2gxPlxuICAgIDxkaXY+XG4gICAgICBFZGl0IDxhIFtyb3V0ZXJMaW5rXT1cIlsnL0NvbnRyb2xQYW5lbENtcCcsIHtpZDogMX1dXCIgaWQ9XCJ1c2VyLTEtbGlua1wiPlVzZXIgMTwvYT4gfFxuICAgICAgRWRpdCA8YSBbcm91dGVyTGlua109XCJbJy9Db250cm9sUGFuZWxDbXAnLCB7aWQ6IDJ9XVwiIGlkPVwidXNlci0yLWxpbmtcIj5Vc2VyIDI8L2E+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGRpcmVjdGl2ZXM6IFtST1VURVJfRElSRUNUSVZFU11cbn0pXG5jbGFzcyBIb21lQ21wIHtcbn1cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdleGFtcGxlLWFwcCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGgxPk15IEFwcDwvaDE+XG4gICAgPHJvdXRlci1vdXRsZXQ+PC9yb3V0ZXItb3V0bGV0PlxuICBgLFxuICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVNdXG59KVxuQFJvdXRlQ29uZmlnKFtcbiAge3BhdGg6ICcvdXNlci1zZXR0aW5ncy86aWQnLCBjb21wb25lbnQ6IENvbnRyb2xQYW5lbENtcCwgbmFtZTogJ0NvbnRyb2xQYW5lbENtcCd9LFxuICB7cGF0aDogJy8nLCBjb21wb25lbnQ6IEhvbWVDbXAsIG5hbWU6ICdIb21lQ21wJ31cbl0pXG5jbGFzcyBBcHBDbXAge1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICByZXR1cm4gYm9vdHN0cmFwKFxuICAgICAgQXBwQ21wLCBbcHJvdmlkZShBUFBfQkFTRV9IUkVGLCB7dXNlVmFsdWU6ICcvYW5ndWxhcjIvZXhhbXBsZXMvcm91dGVyL3RzL2Nhbl9hY3RpdmF0ZSd9KV0pO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
