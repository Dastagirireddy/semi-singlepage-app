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
    var ControlPanelCmp, HomeCmp, AppCmp;
    function checkIfWeHavePermission(instruction) {
        return instruction.params['id'] == '1';
    }
    function main() {
        return browser_1.bootstrap(AppCmp, [core_1.provide(common_1.APP_BASE_HREF, { useValue: '/angular2/examples/router/ts/can_activate' })]);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL3JvdXRlci90cy9jYW5fYWN0aXZhdGUvY2FuX2FjdGl2YXRlX2V4YW1wbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFLQSxpQ0FBaUMsV0FBaUM7UUFDaEUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDO0lBQ3pDLENBQUM7SUF5Q0Q7UUFDRSxNQUFNLENBQUMsbUJBQVMsQ0FDWixNQUFNLEVBQUUsQ0FBQyxjQUFPLENBQUMsc0JBQWEsRUFBRSxFQUFDLFFBQVEsRUFBRSwyQ0FBMkMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pHLENBQUM7SUFIRCx1QkFHQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7O1lBMUNELHlCQUF5QjtZQUd6QjtnQkFBQTtnQkFDQSxDQUFDO2dCQUhEO29CQUFDLGdCQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLDBCQUEwQixFQUFDLENBQUM7b0JBQ2hGLG9CQUFXLENBQUMsdUJBQXVCLENBQUM7O21DQUFBO2dCQUVyQyxzQkFBQztZQUFELENBREEsQUFDQyxJQUFBO1lBQ0QsZ0JBQWdCO1lBY2hCO2dCQUFBO2dCQUNBLENBQUM7Z0JBWkQ7b0JBQUMsZ0JBQVMsQ0FBQzt3QkFDVCxRQUFRLEVBQUUsVUFBVTt3QkFDcEIsUUFBUSxFQUFFLG1QQU1UO3dCQUNELFVBQVUsRUFBRSxDQUFDLDBCQUFpQixDQUFDO3FCQUNoQyxDQUFDOzsyQkFBQTtnQkFFRixjQUFDO1lBQUQsQ0FEQSxBQUNDLElBQUE7WUFlRDtnQkFBQTtnQkFDQSxDQUFDO2dCQWJEO29CQUFDLGdCQUFTLENBQUM7d0JBQ1QsUUFBUSxFQUFFLGFBQWE7d0JBQ3ZCLFFBQVEsRUFBRSxnRUFHVDt3QkFDRCxVQUFVLEVBQUUsQ0FBQywwQkFBaUIsQ0FBQztxQkFDaEMsQ0FBQztvQkFDRCxvQkFBVyxDQUFDO3dCQUNYLEVBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFDO3dCQUNqRixFQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDO3FCQUNqRCxDQUFDOzswQkFBQTtnQkFFRixhQUFDO1lBQUQsQ0FEQSxBQUNDLElBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvcm91dGVyL3RzL2Nhbl9hY3RpdmF0ZS9jYW5fYWN0aXZhdGVfZXhhbXBsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7cHJvdmlkZSwgQ29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Ym9vdHN0cmFwfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9icm93c2VyJztcbmltcG9ydCB7Q2FuQWN0aXZhdGUsIFJvdXRlQ29uZmlnLCBDb21wb25lbnRJbnN0cnVjdGlvbiwgUk9VVEVSX0RJUkVDVElWRVN9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlcic7XG5pbXBvcnQge0FQUF9CQVNFX0hSRUZ9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2NvbW1vbic7XG5cbmZ1bmN0aW9uIGNoZWNrSWZXZUhhdmVQZXJtaXNzaW9uKGluc3RydWN0aW9uOiBDb21wb25lbnRJbnN0cnVjdGlvbikge1xuICByZXR1cm4gaW5zdHJ1Y3Rpb24ucGFyYW1zWydpZCddID09ICcxJztcbn1cblxuLy8gI2RvY3JlZ2lvbiBjYW5BY3RpdmF0ZVxuQENvbXBvbmVudCh7c2VsZWN0b3I6ICdjb250cm9sLXBhbmVsLWNtcCcsIHRlbXBsYXRlOiBgPGRpdj5TZXR0aW5nczogLi4uPC9kaXY+YH0pXG5AQ2FuQWN0aXZhdGUoY2hlY2tJZldlSGF2ZVBlcm1pc3Npb24pXG5jbGFzcyBDb250cm9sUGFuZWxDbXAge1xufVxuLy8gI2VuZGRvY3JlZ2lvblxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2hvbWUtY21wJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aDE+V2VsY29tZSBIb21lITwvaDE+XG4gICAgPGRpdj5cbiAgICAgIEVkaXQgPGEgW3JvdXRlckxpbmtdPVwiWycvQ29udHJvbFBhbmVsQ21wJywge2lkOiAxfV1cIiBpZD1cInVzZXItMS1saW5rXCI+VXNlciAxPC9hPiB8XG4gICAgICBFZGl0IDxhIFtyb3V0ZXJMaW5rXT1cIlsnL0NvbnRyb2xQYW5lbENtcCcsIHtpZDogMn1dXCIgaWQ9XCJ1c2VyLTItbGlua1wiPlVzZXIgMjwvYT5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTXVxufSlcbmNsYXNzIEhvbWVDbXAge1xufVxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2V4YW1wbGUtYXBwJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aDE+TXkgQXBwPC9oMT5cbiAgICA8cm91dGVyLW91dGxldD48L3JvdXRlci1vdXRsZXQ+XG4gIGAsXG4gIGRpcmVjdGl2ZXM6IFtST1VURVJfRElSRUNUSVZFU11cbn0pXG5AUm91dGVDb25maWcoW1xuICB7cGF0aDogJy91c2VyLXNldHRpbmdzLzppZCcsIGNvbXBvbmVudDogQ29udHJvbFBhbmVsQ21wLCBuYW1lOiAnQ29udHJvbFBhbmVsQ21wJ30sXG4gIHtwYXRoOiAnLycsIGNvbXBvbmVudDogSG9tZUNtcCwgbmFtZTogJ0hvbWVDbXAnfVxuXSlcbmNsYXNzIEFwcENtcCB7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIHJldHVybiBib290c3RyYXAoXG4gICAgICBBcHBDbXAsIFtwcm92aWRlKEFQUF9CQVNFX0hSRUYsIHt1c2VWYWx1ZTogJy9hbmd1bGFyMi9leGFtcGxlcy9yb3V0ZXIvdHMvY2FuX2FjdGl2YXRlJ30pXSk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
