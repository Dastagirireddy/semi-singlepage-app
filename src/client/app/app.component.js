System.register(['angular2/core', 'angular2/router', './app.router'], function(exports_1, context_1) {
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
    var core_1, router_1, app_router_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_router_1_1) {
                app_router_1 = app_router_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    router_1.RouteConfig(app_router_1.routes),
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n        <div class=\"container\">\n            <h1 class=\"text-center page-header\">Angular 2 Routing demo</h1>\n            <div class=\"row\">\n                <div class=\"col-md-3\">\n                    <div class=\"list-group\">\n                        <a class=\"list-group-item\" [routerLink]=\"['Home']\">Home</a>\n                        <a class=\"list-group-item\" [routerLink]=\"['About']\">About</a>\n                        <a class=\"list-group-item\" [routerLink]=\"['Contact']\">Contact</a>\n                    </div>\n                </div>\n                <div class=\"col-md-9\">\n                    <router-outlet></router-outlet>\n                </div>\n            </div>\n        </div>\n    ",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        styles: ["\n        .router-link-active{\n            z-index: 2 !important;\n            color: #fff !important;\n            background-color: #337ab7 !important;\n            border-color: #337ab7 !important;\n        }\n    "]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFrQ0E7Z0JBQUE7Z0JBRUEsQ0FBQztnQkFoQ0Q7b0JBQUMsb0JBQVcsQ0FBQyxtQkFBTSxDQUFDO29CQUNuQixnQkFBUyxDQUFDO3dCQUNQLFFBQVEsRUFBRSxRQUFRO3dCQUNsQixRQUFRLEVBQUUsdXRCQWdCVDt3QkFDRCxVQUFVLEVBQUUsQ0FBQywwQkFBaUIsQ0FBQzt3QkFDL0IsTUFBTSxFQUFFLENBQUMsNE5BT1IsQ0FBQztxQkFDTCxDQUFDOztnQ0FBQTtnQkFHRixtQkFBQztZQUFELENBRkEsQUFFQyxJQUFBO1lBRkQsdUNBRUMsQ0FBQSIsImZpbGUiOiJhcHAuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFUywgUm91dGVDb25maWd9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlcic7XG5pbXBvcnQge3JvdXRlc30gZnJvbSAnLi9hcHAucm91dGVyJztcblxuQFJvdXRlQ29uZmlnKHJvdXRlcylcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbXktYXBwJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8aDEgY2xhc3M9XCJ0ZXh0LWNlbnRlciBwYWdlLWhlYWRlclwiPkFuZ3VsYXIgMiBSb3V0aW5nIGRlbW88L2gxPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtM1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIiBbcm91dGVyTGlua109XCJbJ0hvbWUnXVwiPkhvbWU8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbVwiIFtyb3V0ZXJMaW5rXT1cIlsnQWJvdXQnXVwiPkFib3V0PC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIiBbcm91dGVyTGlua109XCJbJ0NvbnRhY3QnXVwiPkNvbnRhY3Q8L2E+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtOVwiPlxuICAgICAgICAgICAgICAgICAgICA8cm91dGVyLW91dGxldD48L3JvdXRlci1vdXRsZXQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVNdLFxuICAgIHN0eWxlczogW2BcbiAgICAgICAgLnJvdXRlci1saW5rLWFjdGl2ZXtcbiAgICAgICAgICAgIHotaW5kZXg6IDIgIWltcG9ydGFudDtcbiAgICAgICAgICAgIGNvbG9yOiAjZmZmICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzM3YWI3ICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICBib3JkZXItY29sb3I6ICMzMzdhYjcgIWltcG9ydGFudDtcbiAgICAgICAgfVxuICAgIGBdXG59KVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG5cdFxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
