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
    var MyCmp, AppCmp;
    function main() {
        return browser_1.bootstrap(AppCmp, [core_1.provide(router_1.APP_BASE_HREF, { useValue: '/angular2/examples/router/ts/reuse' })]);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvcm91dGVyL3RzL3JldXNlL3JldXNlX2V4YW1wbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFzREE7UUFDRSxNQUFNLENBQUMsbUJBQVMsQ0FBQyxNQUFNLEVBQ04sQ0FBQyxjQUFPLENBQUMsc0JBQWEsRUFBRSxFQUFDLFFBQVEsRUFBRSxvQ0FBb0MsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9GLENBQUM7SUFIRCx1QkFHQyxDQUFBOzs7Ozs7Ozs7Ozs7O1lBM0NELHNCQUFzQjtZQVF0QjtnQkFHRSxlQUFZLE1BQW1CO29CQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxRQUFRLENBQUM7Z0JBQUMsQ0FBQztnQkFFaEYsOEJBQWMsR0FBZCxVQUFlLElBQTBCLEVBQUUsSUFBMEIsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFFdkYsNkJBQWEsR0FBYixVQUFjLElBQTBCLEVBQUUsSUFBMEI7b0JBQ2xFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbEMsQ0FBQztnQkFoQkg7b0JBQUMsZ0JBQVMsQ0FBQzt3QkFDVCxRQUFRLEVBQUUsUUFBUTt3QkFDbEIsUUFBUSxFQUFFLHNGQUdUO3FCQUNGLENBQUM7O3lCQUFBO2dCQVdGLFlBQUM7WUFBRCxDQVZBLEFBVUMsSUFBQTtZQUNELGdCQUFnQjtZQWlCaEI7Z0JBQUE7Z0JBQ0EsQ0FBQztnQkFmRDtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSxhQUFhO3dCQUN2QixRQUFRLEVBQUUsMk9BS1Q7d0JBQ0QsVUFBVSxFQUFFLENBQUMsMEJBQWlCLENBQUM7cUJBQ2hDLENBQUM7b0JBQ0Qsb0JBQVcsQ0FBQzt3QkFDWCxFQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDO3dCQUM5QyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDO3FCQUNwRCxDQUFDOzswQkFBQTtnQkFFRixhQUFDO1lBQUQsQ0FEQSxBQUNDLElBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9leGFtcGxlcy9yb3V0ZXIvdHMvcmV1c2UvcmV1c2VfZXhhbXBsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBwcm92aWRlfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Ym9vdHN0cmFwfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9icm93c2VyJztcbmltcG9ydCB7XG4gIENhbkFjdGl2YXRlLFxuICBSb3V0ZUNvbmZpZyxcbiAgQ29tcG9uZW50SW5zdHJ1Y3Rpb24sXG4gIFJPVVRFUl9ESVJFQ1RJVkVTLFxuICBBUFBfQkFTRV9IUkVGLFxuICBDYW5SZXVzZSxcbiAgUm91dGVQYXJhbXMsXG4gIE9uUmV1c2Vcbn0gZnJvbSAnYW5ndWxhcjIvcm91dGVyJztcblxuXG4vLyAjZG9jcmVnaW9uIHJldXNlQ21wXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdteS1jbXAnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXY+aGVsbG8ge3tuYW1lfX0hPC9kaXY+XG4gICAgPGRpdj5tZXNzYWdlOiA8aW5wdXQgaWQ9XCJtZXNzYWdlXCI+PC9kaXY+XG4gIGBcbn0pXG5jbGFzcyBNeUNtcCBpbXBsZW1lbnRzIENhblJldXNlLFxuICAgIE9uUmV1c2Uge1xuICBuYW1lOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKHBhcmFtczogUm91dGVQYXJhbXMpIHsgdGhpcy5uYW1lID0gcGFyYW1zLmdldCgnbmFtZScpIHx8ICdOT0JPRFknOyB9XG5cbiAgcm91dGVyQ2FuUmV1c2UobmV4dDogQ29tcG9uZW50SW5zdHJ1Y3Rpb24sIHByZXY6IENvbXBvbmVudEluc3RydWN0aW9uKSB7IHJldHVybiB0cnVlOyB9XG5cbiAgcm91dGVyT25SZXVzZShuZXh0OiBDb21wb25lbnRJbnN0cnVjdGlvbiwgcHJldjogQ29tcG9uZW50SW5zdHJ1Y3Rpb24pIHtcbiAgICB0aGlzLm5hbWUgPSBuZXh0LnBhcmFtc1snbmFtZSddO1xuICB9XG59XG4vLyAjZW5kZG9jcmVnaW9uXG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZXhhbXBsZS1hcHAnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxoMT5TYXkgaGkgdG8uLi48L2gxPlxuICAgIDxhIFtyb3V0ZXJMaW5rXT1cIlsnL0hvbWVDbXAnLCB7bmFtZTogJ25hb21pJ31dXCIgaWQ9XCJuYW9taS1saW5rXCI+TmFvbWk8L2E+IHxcbiAgICA8YSBbcm91dGVyTGlua109XCJbJy9Ib21lQ21wJywge25hbWU6ICdicmFkJ31dXCIgaWQ9XCJicmFkLWxpbmtcIj5CcmFkPC9hPlxuICAgIDxyb3V0ZXItb3V0bGV0Pjwvcm91dGVyLW91dGxldD5cbiAgYCxcbiAgZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTXVxufSlcbkBSb3V0ZUNvbmZpZyhbXG4gIHtwYXRoOiAnLycsIGNvbXBvbmVudDogTXlDbXAsIG5hbWU6ICdIb21lQ21wJ30sXG4gIHtwYXRoOiAnLzpuYW1lJywgY29tcG9uZW50OiBNeUNtcCwgbmFtZTogJ0hvbWVDbXAnfVxuXSlcbmNsYXNzIEFwcENtcCB7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIHJldHVybiBib290c3RyYXAoQXBwQ21wLFxuICAgICAgICAgICAgICAgICAgIFtwcm92aWRlKEFQUF9CQVNFX0hSRUYsIHt1c2VWYWx1ZTogJy9hbmd1bGFyMi9leGFtcGxlcy9yb3V0ZXIvdHMvcmV1c2UnfSldKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
