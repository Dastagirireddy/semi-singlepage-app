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
    var NoteCmp, NoteIndexCmp, AppCmp;
    function main() {
        return browser_1.bootstrap(AppCmp, [core_1.provide(router_1.APP_BASE_HREF, { useValue: '/angular2/examples/router/ts/can_deactivate' })]);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvcm91dGVyL3RzL2Nhbl9kZWFjdGl2YXRlL2Nhbl9kZWFjdGl2YXRlX2V4YW1wbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUErREE7UUFDRSxNQUFNLENBQUMsbUJBQVMsQ0FDWixNQUFNLEVBQUUsQ0FBQyxjQUFPLENBQUMsc0JBQWEsRUFBRSxFQUFDLFFBQVEsRUFBRSw2Q0FBNkMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25HLENBQUM7SUFIRCx1QkFHQyxDQUFBOzs7Ozs7Ozs7Ozs7O1lBdkRELGlDQUFpQztZQVNqQztnQkFHRSxpQkFBWSxNQUFtQjtvQkFBSSxJQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQUMsQ0FBQztnQkFFaEUscUNBQW1CLEdBQW5CLFVBQW9CLElBQTBCLEVBQUUsSUFBMEI7b0JBQ3hFLE1BQU0sQ0FBQyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQztnQkFDcEQsQ0FBQztnQkFmSDtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSxVQUFVO3dCQUNwQixRQUFRLEVBQUUseUdBSUQ7cUJBQ1YsQ0FBQzs7MkJBQUE7Z0JBU0YsY0FBQztZQUFELENBUkEsQUFRQyxJQUFBO1lBQ0QsZ0JBQWdCO1lBY2hCO2dCQUFBO2dCQUNBLENBQUM7Z0JBWkQ7b0JBQUMsZ0JBQVMsQ0FBQzt3QkFDVCxRQUFRLEVBQUUsZ0JBQWdCO3dCQUMxQixRQUFRLEVBQUUsZ09BTVQ7d0JBQ0QsVUFBVSxFQUFFLENBQUMsMEJBQWlCLENBQUM7cUJBQ2hDLENBQUM7O2dDQUFBO2dCQUVGLG1CQUFDO1lBQUQsQ0FEQSxBQUNDLElBQUE7WUFlRDtnQkFBQTtnQkFDQSxDQUFDO2dCQWJEO29CQUFDLGdCQUFTLENBQUM7d0JBQ1QsUUFBUSxFQUFFLGFBQWE7d0JBQ3ZCLFFBQVEsRUFBRSxnRUFHVDt3QkFDRCxVQUFVLEVBQUUsQ0FBQywwQkFBaUIsQ0FBQztxQkFDaEMsQ0FBQztvQkFDRCxvQkFBVyxDQUFDO3dCQUNYLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUM7d0JBQ3hELEVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUM7cUJBQzNELENBQUM7OzBCQUFBO2dCQUVGLGFBQUM7WUFBRCxDQURBLEFBQ0MsSUFBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL3JvdXRlci90cy9jYW5fZGVhY3RpdmF0ZS9jYW5fZGVhY3RpdmF0ZV9leGFtcGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtwcm92aWRlLCBDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtib290c3RyYXB9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXInO1xuaW1wb3J0IHtcbiAgQ2FuRGVhY3RpdmF0ZSxcbiAgUm91dGVDb25maWcsXG4gIFJvdXRlUGFyYW1zLFxuICBDb21wb25lbnRJbnN0cnVjdGlvbixcbiAgUk9VVEVSX0RJUkVDVElWRVMsXG4gIEFQUF9CQVNFX0hSRUZcbn0gZnJvbSAnYW5ndWxhcjIvcm91dGVyJztcblxuLy8gI2RvY3JlZ2lvbiByb3V0ZXJDYW5EZWFjdGl2YXRlXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3RlLWNtcCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdj5cbiAgICAgIDxoMj5pZDoge3tpZH19PC9oMj5cbiAgICAgIDx0ZXh0YXJlYSBjb2xzPVwiNDBcIiByb3dzPVwiMTBcIj48L3RleHRhcmVhPlxuICAgIDwvZGl2PmBcbn0pXG5jbGFzcyBOb3RlQ21wIGltcGxlbWVudHMgQ2FuRGVhY3RpdmF0ZSB7XG4gIGlkOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocGFyYW1zOiBSb3V0ZVBhcmFtcykgeyB0aGlzLmlkID0gcGFyYW1zLmdldCgnaWQnKTsgfVxuXG4gIHJvdXRlckNhbkRlYWN0aXZhdGUobmV4dDogQ29tcG9uZW50SW5zdHJ1Y3Rpb24sIHByZXY6IENvbXBvbmVudEluc3RydWN0aW9uKSB7XG4gICAgcmV0dXJuIGNvbmZpcm0oJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBsZWF2ZT8nKTtcbiAgfVxufVxuLy8gI2VuZGRvY3JlZ2lvblxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdGUtaW5kZXgtY21wJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aDE+WW91ciBOb3RlczwvaDE+XG4gICAgPGRpdj5cbiAgICAgIEVkaXQgPGEgW3JvdXRlckxpbmtdPVwiWycvTm90ZUNtcCcsIHtpZDogMX1dXCIgaWQ9XCJub3RlLTEtbGlua1wiPk5vdGUgMTwvYT4gfFxuICAgICAgRWRpdCA8YSBbcm91dGVyTGlua109XCJbJy9Ob3RlQ21wJywge2lkOiAyfV1cIiBpZD1cIm5vdGUtMi1saW5rXCI+Tm90ZSAyPC9hPlxuICAgIDwvZGl2PlxuICBgLFxuICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVNdXG59KVxuY2xhc3MgTm90ZUluZGV4Q21wIHtcbn1cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdleGFtcGxlLWFwcCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGgxPk15IEFwcDwvaDE+XG4gICAgPHJvdXRlci1vdXRsZXQ+PC9yb3V0ZXItb3V0bGV0PlxuICBgLFxuICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVNdXG59KVxuQFJvdXRlQ29uZmlnKFtcbiAge3BhdGg6ICcvbm90ZS86aWQnLCBjb21wb25lbnQ6IE5vdGVDbXAsIG5hbWU6ICdOb3RlQ21wJ30sXG4gIHtwYXRoOiAnLycsIGNvbXBvbmVudDogTm90ZUluZGV4Q21wLCBuYW1lOiAnTm90ZUluZGV4Q21wJ31cbl0pXG5jbGFzcyBBcHBDbXAge1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICByZXR1cm4gYm9vdHN0cmFwKFxuICAgICAgQXBwQ21wLCBbcHJvdmlkZShBUFBfQkFTRV9IUkVGLCB7dXNlVmFsdWU6ICcvYW5ndWxhcjIvZXhhbXBsZXMvcm91dGVyL3RzL2Nhbl9kZWFjdGl2YXRlJ30pXSk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
