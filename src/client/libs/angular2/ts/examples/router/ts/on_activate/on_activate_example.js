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
    var ChildCmp, ParentCmp, AppCmp;
    function main() {
        return browser_1.bootstrap(AppCmp, [core_1.provide(router_1.APP_BASE_HREF, { useValue: '/angular2/examples/router/ts/on_activate' })]);
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
                        template: "\n    <h2>Parent</h2> (<router-outlet></router-outlet>) \n    <p>{{log}}</p>",
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
                        template: "\n    <h1>My app</h1>\n    \n    <nav>\n      <a [routerLink]=\"['Parent', 'Child']\">Child</a>\n    </nav>\n    <router-outlet></router-outlet>\n  ",
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvcm91dGVyL3RzL29uX2FjdGl2YXRlL29uX2FjdGl2YXRlX2V4YW1wbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFxREE7UUFDRSxNQUFNLENBQUMsbUJBQVMsQ0FDWixNQUFNLEVBQUUsQ0FBQyxjQUFPLENBQUMsc0JBQWEsRUFBRSxFQUFDLFFBQVEsRUFBRSwwQ0FBMEMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hHLENBQUM7SUFIRCx1QkFHQyxDQUFBOzs7Ozs7Ozs7Ozs7O1lBOUNELDhCQUE4QjtZQUU5QjtnQkFBQTtnQkFDQSxDQUFDO2dCQUZEO29CQUFDLGdCQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFDLENBQUM7OzRCQUFBO2dCQUUvQixlQUFDO1lBQUQsQ0FEQSxBQUNDLElBQUE7WUFTRDtnQkFBQTtvQkFDRSxRQUFHLEdBQVcsRUFBRSxDQUFDO2dCQVVuQixDQUFDO2dCQVJDLG9DQUFnQixHQUFoQixVQUFpQixJQUEwQixFQUFFLElBQTBCO29CQUNyRSxJQUFJLENBQUMsR0FBRyxHQUFHLGlDQUE2QixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLGlCQUFTLElBQUksQ0FBQyxPQUFPLE9BQUcsQ0FBQztvQkFFN0YsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQUEsT0FBTzt3QkFDeEIsbUVBQW1FO3dCQUNuRSxVQUFVLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBYixDQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ3hDLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUM7Z0JBakJIO29CQUFDLGdCQUFTLENBQUM7d0JBQ1QsUUFBUSxFQUFFLDhFQUVPO3dCQUNqQixVQUFVLEVBQUUsQ0FBQywwQkFBaUIsQ0FBQztxQkFDaEMsQ0FBQztvQkFDRCxvQkFBVyxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUM7OzZCQUFBO2dCQVlwRSxnQkFBQztZQUFELENBWEEsQUFXQyxJQUFBO1lBQ0QsZ0JBQWdCO1lBZ0JoQjtnQkFBQTtnQkFDQSxDQUFDO2dCQWREO29CQUFDLGdCQUFTLENBQUM7d0JBQ1QsUUFBUSxFQUFFLGFBQWE7d0JBQ3ZCLFFBQVEsRUFBRSxzSkFPVDt3QkFDRCxVQUFVLEVBQUUsQ0FBQywwQkFBaUIsQ0FBQztxQkFDaEMsQ0FBQztvQkFDRCxvQkFBVyxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUM7OzBCQUFBO2dCQUUzRSxhQUFDO1lBQUQsQ0FEQSxBQUNDLElBQUE7WUFERCwyQkFDQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvcm91dGVyL3RzL29uX2FjdGl2YXRlL29uX2FjdGl2YXRlX2V4YW1wbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgcHJvdmlkZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge2Jvb3RzdHJhcH0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vYnJvd3Nlcic7XG5pbXBvcnQge1xuICBPbkFjdGl2YXRlLFxuICBDb21wb25lbnRJbnN0cnVjdGlvbixcbiAgUm91dGVDb25maWcsXG4gIFJPVVRFUl9ESVJFQ1RJVkVTLFxuICBBUFBfQkFTRV9IUkVGXG59IGZyb20gJ2FuZ3VsYXIyL3JvdXRlcic7XG5cbi8vICNkb2NyZWdpb24gcm91dGVyT25BY3RpdmF0ZVxuQENvbXBvbmVudCh7dGVtcGxhdGU6IGBDaGlsZGB9KVxuY2xhc3MgQ2hpbGRDbXAge1xufVxuXG5AQ29tcG9uZW50KHtcbiAgdGVtcGxhdGU6IGBcbiAgICA8aDI+UGFyZW50PC9oMj4gKDxyb3V0ZXItb3V0bGV0Pjwvcm91dGVyLW91dGxldD4pIFxuICAgIDxwPnt7bG9nfX08L3A+YCxcbiAgZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTXVxufSlcbkBSb3V0ZUNvbmZpZyhbe3BhdGg6ICcvY2hpbGQnLCBuYW1lOiAnQ2hpbGQnLCBjb21wb25lbnQ6IENoaWxkQ21wfV0pXG5jbGFzcyBQYXJlbnRDbXAgaW1wbGVtZW50cyBPbkFjdGl2YXRlIHtcbiAgbG9nOiBzdHJpbmcgPSAnJztcblxuICByb3V0ZXJPbkFjdGl2YXRlKG5leHQ6IENvbXBvbmVudEluc3RydWN0aW9uLCBwcmV2OiBDb21wb25lbnRJbnN0cnVjdGlvbikge1xuICAgIHRoaXMubG9nID0gYEZpbmlzaGVkIG5hdmlnYXRpbmcgZnJvbSBcIiR7cHJldiA/IHByZXYudXJsUGF0aCA6ICdudWxsJ31cIiB0byBcIiR7bmV4dC51cmxQYXRofVwiYDtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIC8vIFRoZSBDaGlsZENtcCBnZXRzIGluc3RhbnRpYXRlZCBvbmx5IHdoZW4gdGhlIFByb21pc2UgaXMgcmVzb2x2ZWRcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gcmVzb2x2ZShudWxsKSwgMTAwMCk7XG4gICAgfSk7XG4gIH1cbn1cbi8vICNlbmRkb2NyZWdpb25cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdleGFtcGxlLWFwcCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGgxPk15IGFwcDwvaDE+XG4gICAgXG4gICAgPG5hdj5cbiAgICAgIDxhIFtyb3V0ZXJMaW5rXT1cIlsnUGFyZW50JywgJ0NoaWxkJ11cIj5DaGlsZDwvYT5cbiAgICA8L25hdj5cbiAgICA8cm91dGVyLW91dGxldD48L3JvdXRlci1vdXRsZXQ+XG4gIGAsXG4gIGRpcmVjdGl2ZXM6IFtST1VURVJfRElSRUNUSVZFU11cbn0pXG5AUm91dGVDb25maWcoW3twYXRoOiAnL3BhcmVudC8uLi4nLCBuYW1lOiAnUGFyZW50JywgY29tcG9uZW50OiBQYXJlbnRDbXB9XSlcbmV4cG9ydCBjbGFzcyBBcHBDbXAge1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgcmV0dXJuIGJvb3RzdHJhcChcbiAgICAgIEFwcENtcCwgW3Byb3ZpZGUoQVBQX0JBU0VfSFJFRiwge3VzZVZhbHVlOiAnL2FuZ3VsYXIyL2V4YW1wbGVzL3JvdXRlci90cy9vbl9hY3RpdmF0ZSd9KV0pO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
