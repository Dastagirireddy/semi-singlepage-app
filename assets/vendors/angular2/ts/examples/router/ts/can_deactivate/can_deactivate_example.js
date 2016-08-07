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
    var NoteCmp, NoteIndexCmp, AppCmp;
    function main() {
        return browser_1.bootstrap(AppCmp, [core_1.provide(common_1.APP_BASE_HREF, { useValue: '/angular2/examples/router/ts/can_deactivate' })]);
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
            // #docregion routerCanDeactivate
            NoteCmp = (function () {
                function NoteCmp(params) {
                    this.id = params.get('id');
                }
                NoteCmp.prototype.routerCanDeactivate = function (next, prev) {
                    return confirm('Are you sure you want to leave?');
                };
                NoteCmp = __decorate([
                    core_1.Component({
                        selector: 'note-cmp',
                        template: "\n    <div>\n      <h2>id: {{id}}</h2>\n      <textarea cols=\"40\" rows=\"10\"></textarea>\n    </div>"
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams])
                ], NoteCmp);
                return NoteCmp;
            }());
            // #enddocregion
            NoteIndexCmp = (function () {
                function NoteIndexCmp() {
                }
                NoteIndexCmp = __decorate([
                    core_1.Component({
                        selector: 'note-index-cmp',
                        template: "\n    <h1>Your Notes</h1>\n    <div>\n      Edit <a [routerLink]=\"['/NoteCmp', {id: 1}]\" id=\"note-1-link\">Note 1</a> |\n      Edit <a [routerLink]=\"['/NoteCmp', {id: 2}]\" id=\"note-2-link\">Note 2</a>\n    </div>\n  ",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [])
                ], NoteIndexCmp);
                return NoteIndexCmp;
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
                        { path: '/note/:id', component: NoteCmp, name: 'NoteCmp' },
                        { path: '/', component: NoteIndexCmp, name: 'NoteIndexCmp' }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppCmp);
                return AppCmp;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL3JvdXRlci90cy9jYW5fZGVhY3RpdmF0ZS9jYW5fZGVhY3RpdmF0ZV9leGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBK0RBO1FBQ0UsTUFBTSxDQUFDLG1CQUFTLENBQ1osTUFBTSxFQUFFLENBQUMsY0FBTyxDQUFDLHNCQUFhLEVBQUUsRUFBQyxRQUFRLEVBQUUsNkNBQTZDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRyxDQUFDO0lBSEQsdUJBR0MsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7OztZQXZERCxpQ0FBaUM7WUFTakM7Z0JBR0UsaUJBQVksTUFBbUI7b0JBQUksSUFBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUFDLENBQUM7Z0JBRWhFLHFDQUFtQixHQUFuQixVQUFvQixJQUEwQixFQUFFLElBQTBCO29CQUN4RSxNQUFNLENBQUMsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7Z0JBQ3BELENBQUM7Z0JBZkg7b0JBQUMsZ0JBQVMsQ0FBQzt3QkFDVCxRQUFRLEVBQUUsVUFBVTt3QkFDcEIsUUFBUSxFQUFFLHlHQUlEO3FCQUNWLENBQUM7OzJCQUFBO2dCQVNGLGNBQUM7WUFBRCxDQVJBLEFBUUMsSUFBQTtZQUNELGdCQUFnQjtZQWNoQjtnQkFBQTtnQkFDQSxDQUFDO2dCQVpEO29CQUFDLGdCQUFTLENBQUM7d0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjt3QkFDMUIsUUFBUSxFQUFFLGdPQU1UO3dCQUNELFVBQVUsRUFBRSxDQUFDLDBCQUFpQixDQUFDO3FCQUNoQyxDQUFDOztnQ0FBQTtnQkFFRixtQkFBQztZQUFELENBREEsQUFDQyxJQUFBO1lBZUQ7Z0JBQUE7Z0JBQ0EsQ0FBQztnQkFiRDtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSxhQUFhO3dCQUN2QixRQUFRLEVBQUUsZ0VBR1Q7d0JBQ0QsVUFBVSxFQUFFLENBQUMsMEJBQWlCLENBQUM7cUJBQ2hDLENBQUM7b0JBQ0Qsb0JBQVcsQ0FBQzt3QkFDWCxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDO3dCQUN4RCxFQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFDO3FCQUMzRCxDQUFDOzswQkFBQTtnQkFFRixhQUFDO1lBQUQsQ0FEQSxBQUNDLElBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvcm91dGVyL3RzL2Nhbl9kZWFjdGl2YXRlL2Nhbl9kZWFjdGl2YXRlX2V4YW1wbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3Byb3ZpZGUsIENvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge2Jvb3RzdHJhcH0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vYnJvd3Nlcic7XG5pbXBvcnQge1xuICBDYW5EZWFjdGl2YXRlLFxuICBSb3V0ZUNvbmZpZyxcbiAgUm91dGVQYXJhbXMsXG4gIENvbXBvbmVudEluc3RydWN0aW9uLFxuICBST1VURVJfRElSRUNUSVZFU1xufSBmcm9tICdhbmd1bGFyMi9yb3V0ZXInO1xuaW1wb3J0IHtBUFBfQkFTRV9IUkVGfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9jb21tb24nO1xuXG4vLyAjZG9jcmVnaW9uIHJvdXRlckNhbkRlYWN0aXZhdGVcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdGUtY21wJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2PlxuICAgICAgPGgyPmlkOiB7e2lkfX08L2gyPlxuICAgICAgPHRleHRhcmVhIGNvbHM9XCI0MFwiIHJvd3M9XCIxMFwiPjwvdGV4dGFyZWE+XG4gICAgPC9kaXY+YFxufSlcbmNsYXNzIE5vdGVDbXAgaW1wbGVtZW50cyBDYW5EZWFjdGl2YXRlIHtcbiAgaWQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IFJvdXRlUGFyYW1zKSB7IHRoaXMuaWQgPSBwYXJhbXMuZ2V0KCdpZCcpOyB9XG5cbiAgcm91dGVyQ2FuRGVhY3RpdmF0ZShuZXh0OiBDb21wb25lbnRJbnN0cnVjdGlvbiwgcHJldjogQ29tcG9uZW50SW5zdHJ1Y3Rpb24pIHtcbiAgICByZXR1cm4gY29uZmlybSgnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGxlYXZlPycpO1xuICB9XG59XG4vLyAjZW5kZG9jcmVnaW9uXG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm90ZS1pbmRleC1jbXAnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxoMT5Zb3VyIE5vdGVzPC9oMT5cbiAgICA8ZGl2PlxuICAgICAgRWRpdCA8YSBbcm91dGVyTGlua109XCJbJy9Ob3RlQ21wJywge2lkOiAxfV1cIiBpZD1cIm5vdGUtMS1saW5rXCI+Tm90ZSAxPC9hPiB8XG4gICAgICBFZGl0IDxhIFtyb3V0ZXJMaW5rXT1cIlsnL05vdGVDbXAnLCB7aWQ6IDJ9XVwiIGlkPVwibm90ZS0yLWxpbmtcIj5Ob3RlIDI8L2E+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGRpcmVjdGl2ZXM6IFtST1VURVJfRElSRUNUSVZFU11cbn0pXG5jbGFzcyBOb3RlSW5kZXhDbXAge1xufVxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2V4YW1wbGUtYXBwJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aDE+TXkgQXBwPC9oMT5cbiAgICA8cm91dGVyLW91dGxldD48L3JvdXRlci1vdXRsZXQ+XG4gIGAsXG4gIGRpcmVjdGl2ZXM6IFtST1VURVJfRElSRUNUSVZFU11cbn0pXG5AUm91dGVDb25maWcoW1xuICB7cGF0aDogJy9ub3RlLzppZCcsIGNvbXBvbmVudDogTm90ZUNtcCwgbmFtZTogJ05vdGVDbXAnfSxcbiAge3BhdGg6ICcvJywgY29tcG9uZW50OiBOb3RlSW5kZXhDbXAsIG5hbWU6ICdOb3RlSW5kZXhDbXAnfVxuXSlcbmNsYXNzIEFwcENtcCB7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIHJldHVybiBib290c3RyYXAoXG4gICAgICBBcHBDbXAsIFtwcm92aWRlKEFQUF9CQVNFX0hSRUYsIHt1c2VWYWx1ZTogJy9hbmd1bGFyMi9leGFtcGxlcy9yb3V0ZXIvdHMvY2FuX2RlYWN0aXZhdGUnfSldKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
