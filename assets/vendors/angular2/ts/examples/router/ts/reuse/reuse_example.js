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
    var MyCmp, AppCmp;
    function main() {
        return browser_1.bootstrap(AppCmp, [core_1.provide(common_1.APP_BASE_HREF, { useValue: '/angular2/examples/router/ts/reuse' })]);
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
            // #docregion reuseCmp
            MyCmp = (function () {
                function MyCmp(params) {
                    this.name = params.get('name') || 'NOBODY';
                }
                MyCmp.prototype.routerCanReuse = function (next, prev) { return true; };
                MyCmp.prototype.routerOnReuse = function (next, prev) {
                    this.name = next.params['name'];
                };
                MyCmp = __decorate([
                    core_1.Component({
                        selector: 'my-cmp',
                        template: "\n    <div>hello {{name}}!</div>\n    <div>message: <input id=\"message\"></div>\n  "
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams])
                ], MyCmp);
                return MyCmp;
            }());
            // #enddocregion
            AppCmp = (function () {
                function AppCmp() {
                }
                AppCmp = __decorate([
                    core_1.Component({
                        selector: 'example-app',
                        template: "\n    <h1>Say hi to...</h1>\n    <a [routerLink]=\"['/HomeCmp', {name: 'naomi'}]\" id=\"naomi-link\">Naomi</a> |\n    <a [routerLink]=\"['/HomeCmp', {name: 'brad'}]\" id=\"brad-link\">Brad</a>\n    <router-outlet></router-outlet>\n  ",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: '/', component: MyCmp, name: 'HomeCmp' },
                        { path: '/:name', component: MyCmp, name: 'HomeCmp' }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppCmp);
                return AppCmp;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL3JvdXRlci90cy9yZXVzZS9yZXVzZV9leGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBc0RBO1FBQ0UsTUFBTSxDQUFDLG1CQUFTLENBQUMsTUFBTSxFQUNOLENBQUMsY0FBTyxDQUFDLHNCQUFhLEVBQUUsRUFBQyxRQUFRLEVBQUUsb0NBQW9DLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRixDQUFDO0lBSEQsdUJBR0MsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7OztZQTNDRCxzQkFBc0I7WUFRdEI7Z0JBR0UsZUFBWSxNQUFtQjtvQkFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksUUFBUSxDQUFDO2dCQUFDLENBQUM7Z0JBRWhGLDhCQUFjLEdBQWQsVUFBZSxJQUEwQixFQUFFLElBQTBCLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBRXZGLDZCQUFhLEdBQWIsVUFBYyxJQUEwQixFQUFFLElBQTBCO29CQUNsRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2xDLENBQUM7Z0JBaEJIO29CQUFDLGdCQUFTLENBQUM7d0JBQ1QsUUFBUSxFQUFFLFFBQVE7d0JBQ2xCLFFBQVEsRUFBRSxzRkFHVDtxQkFDRixDQUFDOzt5QkFBQTtnQkFXRixZQUFDO1lBQUQsQ0FWQSxBQVVDLElBQUE7WUFDRCxnQkFBZ0I7WUFpQmhCO2dCQUFBO2dCQUNBLENBQUM7Z0JBZkQ7b0JBQUMsZ0JBQVMsQ0FBQzt3QkFDVCxRQUFRLEVBQUUsYUFBYTt3QkFDdkIsUUFBUSxFQUFFLDJPQUtUO3dCQUNELFVBQVUsRUFBRSxDQUFDLDBCQUFpQixDQUFDO3FCQUNoQyxDQUFDO29CQUNELG9CQUFXLENBQUM7d0JBQ1gsRUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQzt3QkFDOUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQztxQkFDcEQsQ0FBQzs7MEJBQUE7Z0JBRUYsYUFBQztZQUFELENBREEsQUFDQyxJQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL3JvdXRlci90cy9yZXVzZS9yZXVzZV9leGFtcGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIHByb3ZpZGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtib290c3RyYXB9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXInO1xuaW1wb3J0IHtcbiAgQ2FuQWN0aXZhdGUsXG4gIFJvdXRlQ29uZmlnLFxuICBDb21wb25lbnRJbnN0cnVjdGlvbixcbiAgUk9VVEVSX0RJUkVDVElWRVMsXG4gIENhblJldXNlLFxuICBSb3V0ZVBhcmFtcyxcbiAgT25SZXVzZVxufSBmcm9tICdhbmd1bGFyMi9yb3V0ZXInO1xuaW1wb3J0IHtBUFBfQkFTRV9IUkVGfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9jb21tb24nO1xuXG5cbi8vICNkb2NyZWdpb24gcmV1c2VDbXBcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ215LWNtcCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdj5oZWxsbyB7e25hbWV9fSE8L2Rpdj5cbiAgICA8ZGl2Pm1lc3NhZ2U6IDxpbnB1dCBpZD1cIm1lc3NhZ2VcIj48L2Rpdj5cbiAgYFxufSlcbmNsYXNzIE15Q21wIGltcGxlbWVudHMgQ2FuUmV1c2UsXG4gICAgT25SZXVzZSB7XG4gIG5hbWU6IHN0cmluZztcbiAgY29uc3RydWN0b3IocGFyYW1zOiBSb3V0ZVBhcmFtcykgeyB0aGlzLm5hbWUgPSBwYXJhbXMuZ2V0KCduYW1lJykgfHwgJ05PQk9EWSc7IH1cblxuICByb3V0ZXJDYW5SZXVzZShuZXh0OiBDb21wb25lbnRJbnN0cnVjdGlvbiwgcHJldjogQ29tcG9uZW50SW5zdHJ1Y3Rpb24pIHsgcmV0dXJuIHRydWU7IH1cblxuICByb3V0ZXJPblJldXNlKG5leHQ6IENvbXBvbmVudEluc3RydWN0aW9uLCBwcmV2OiBDb21wb25lbnRJbnN0cnVjdGlvbikge1xuICAgIHRoaXMubmFtZSA9IG5leHQucGFyYW1zWyduYW1lJ107XG4gIH1cbn1cbi8vICNlbmRkb2NyZWdpb25cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdleGFtcGxlLWFwcCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGgxPlNheSBoaSB0by4uLjwvaDE+XG4gICAgPGEgW3JvdXRlckxpbmtdPVwiWycvSG9tZUNtcCcsIHtuYW1lOiAnbmFvbWknfV1cIiBpZD1cIm5hb21pLWxpbmtcIj5OYW9taTwvYT4gfFxuICAgIDxhIFtyb3V0ZXJMaW5rXT1cIlsnL0hvbWVDbXAnLCB7bmFtZTogJ2JyYWQnfV1cIiBpZD1cImJyYWQtbGlua1wiPkJyYWQ8L2E+XG4gICAgPHJvdXRlci1vdXRsZXQ+PC9yb3V0ZXItb3V0bGV0PlxuICBgLFxuICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVNdXG59KVxuQFJvdXRlQ29uZmlnKFtcbiAge3BhdGg6ICcvJywgY29tcG9uZW50OiBNeUNtcCwgbmFtZTogJ0hvbWVDbXAnfSxcbiAge3BhdGg6ICcvOm5hbWUnLCBjb21wb25lbnQ6IE15Q21wLCBuYW1lOiAnSG9tZUNtcCd9XG5dKVxuY2xhc3MgQXBwQ21wIHtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgcmV0dXJuIGJvb3RzdHJhcChBcHBDbXAsXG4gICAgICAgICAgICAgICAgICAgW3Byb3ZpZGUoQVBQX0JBU0VfSFJFRiwge3VzZVZhbHVlOiAnL2FuZ3VsYXIyL2V4YW1wbGVzL3JvdXRlci90cy9yZXVzZSd9KV0pO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
