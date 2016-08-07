System.register(['angular2/core', 'angular2/src/facade/lang', '../router', '../location/location'], function(exports_1, context_1) {
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
    var core_1, lang_1, router_1, location_1;
    var RouterLink;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (location_1_1) {
                location_1 = location_1_1;
            }],
        execute: function() {
            /**
             * The RouterLink directive lets you link to specific parts of your app.
             *
             * Consider the following route configuration:
            
             * ```
             * @RouteConfig([
             *   { path: '/user', component: UserCmp, as: 'User' }
             * ]);
             * class MyComp {}
             * ```
             *
             * When linking to this `User` route, you can write:
             *
             * ```
             * <a [routerLink]="['./User']">link to user component</a>
             * ```
             *
             * RouterLink expects the value to be an array of route names, followed by the params
             * for that level of routing. For instance `['/Team', {teamId: 1}, 'User', {userId: 2}]`
             * means that we want to generate a link for the `Team` route with params `{teamId: 1}`,
             * and with a child route `User` with params `{userId: 2}`.
             *
             * The first route name should be prepended with `/`, `./`, or `../`.
             * If the route begins with `/`, the router will look up the route from the root of the app.
             * If the route begins with `./`, the router will instead look in the current component's
             * children for the route. And if the route begins with `../`, the router will look at the
             * current component's parent.
             */
            RouterLink = (function () {
                function RouterLink(_router, _location) {
                    var _this = this;
                    this._router = _router;
                    this._location = _location;
                    // we need to update the link whenever a route changes to account for aux routes
                    this._router.subscribe(function (_) { return _this._updateLink(); });
                }
                // because auxiliary links take existing primary and auxiliary routes into account,
                // we need to update the link whenever params or other routes change.
                RouterLink.prototype._updateLink = function () {
                    this._navigationInstruction = this._router.generate(this._routeParams);
                    var navigationHref = this._navigationInstruction.toLinkUrl();
                    this.visibleHref = this._location.prepareExternalUrl(navigationHref);
                };
                Object.defineProperty(RouterLink.prototype, "isRouteActive", {
                    get: function () { return this._router.isRouteActive(this._navigationInstruction); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RouterLink.prototype, "routeParams", {
                    set: function (changes) {
                        this._routeParams = changes;
                        this._updateLink();
                    },
                    enumerable: true,
                    configurable: true
                });
                RouterLink.prototype.onClick = function () {
                    // If no target, or if target is _self, prevent default browser behavior
                    if (!lang_1.isString(this.target) || this.target == '_self') {
                        this._router.navigateByInstruction(this._navigationInstruction);
                        return false;
                    }
                    return true;
                };
                RouterLink = __decorate([
                    core_1.Directive({
                        selector: '[routerLink]',
                        inputs: ['routeParams: routerLink', 'target: target'],
                        host: {
                            '(click)': 'onClick()',
                            '[attr.href]': 'visibleHref',
                            '[class.router-link-active]': 'isRouteActive'
                        }
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, location_1.Location])
                ], RouterLink);
                return RouterLink;
            }());
            exports_1("RouterLink", RouterLink);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9kaXJlY3RpdmVzL3JvdXRlcl9saW5rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUE0Qkc7WUFVSDtnQkFVRSxvQkFBb0IsT0FBZSxFQUFVLFNBQW1CO29CQVZsRSxpQkFzQ0M7b0JBNUJxQixZQUFPLEdBQVAsT0FBTyxDQUFRO29CQUFVLGNBQVMsR0FBVCxTQUFTLENBQVU7b0JBQzlELGdGQUFnRjtvQkFDaEYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxLQUFJLENBQUMsV0FBVyxFQUFFLEVBQWxCLENBQWtCLENBQUMsQ0FBQztnQkFDcEQsQ0FBQztnQkFFRCxtRkFBbUY7Z0JBQ25GLHFFQUFxRTtnQkFDN0QsZ0NBQVcsR0FBbkI7b0JBQ0UsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDdkUsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUM3RCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ3ZFLENBQUM7Z0JBRUQsc0JBQUkscUNBQWE7eUJBQWpCLGNBQStCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFFaEcsc0JBQUksbUNBQVc7eUJBQWYsVUFBZ0IsT0FBYzt3QkFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7d0JBQzVCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDckIsQ0FBQzs7O21CQUFBO2dCQUVELDRCQUFPLEdBQVA7b0JBQ0Usd0VBQXdFO29CQUN4RSxFQUFFLENBQUMsQ0FBQyxDQUFDLGVBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO3dCQUNyRCxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO3dCQUNoRSxNQUFNLENBQUMsS0FBSyxDQUFDO29CQUNmLENBQUM7b0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDZCxDQUFDO2dCQTlDSDtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSxjQUFjO3dCQUN4QixNQUFNLEVBQUUsQ0FBQyx5QkFBeUIsRUFBRSxnQkFBZ0IsQ0FBQzt3QkFDckQsSUFBSSxFQUFFOzRCQUNKLFNBQVMsRUFBRSxXQUFXOzRCQUN0QixhQUFhLEVBQUUsYUFBYTs0QkFDNUIsNEJBQTRCLEVBQUUsZUFBZTt5QkFDOUM7cUJBQ0YsQ0FBQzs7OEJBQUE7Z0JBdUNGLGlCQUFDO1lBQUQsQ0F0Q0EsQUFzQ0MsSUFBQTtZQXRDRCxtQ0FzQ0MsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvZGlyZWN0aXZlcy9yb3V0ZXJfbGluay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7aXNTdHJpbmd9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbmltcG9ydCB7Um91dGVyfSBmcm9tICcuLi9yb3V0ZXInO1xuaW1wb3J0IHtMb2NhdGlvbn0gZnJvbSAnLi4vbG9jYXRpb24vbG9jYXRpb24nO1xuaW1wb3J0IHtJbnN0cnVjdGlvbn0gZnJvbSAnLi4vaW5zdHJ1Y3Rpb24nO1xuXG4vKipcbiAqIFRoZSBSb3V0ZXJMaW5rIGRpcmVjdGl2ZSBsZXRzIHlvdSBsaW5rIHRvIHNwZWNpZmljIHBhcnRzIG9mIHlvdXIgYXBwLlxuICpcbiAqIENvbnNpZGVyIHRoZSBmb2xsb3dpbmcgcm91dGUgY29uZmlndXJhdGlvbjpcblxuICogYGBgXG4gKiBAUm91dGVDb25maWcoW1xuICogICB7IHBhdGg6ICcvdXNlcicsIGNvbXBvbmVudDogVXNlckNtcCwgYXM6ICdVc2VyJyB9XG4gKiBdKTtcbiAqIGNsYXNzIE15Q29tcCB7fVxuICogYGBgXG4gKlxuICogV2hlbiBsaW5raW5nIHRvIHRoaXMgYFVzZXJgIHJvdXRlLCB5b3UgY2FuIHdyaXRlOlxuICpcbiAqIGBgYFxuICogPGEgW3JvdXRlckxpbmtdPVwiWycuL1VzZXInXVwiPmxpbmsgdG8gdXNlciBjb21wb25lbnQ8L2E+XG4gKiBgYGBcbiAqXG4gKiBSb3V0ZXJMaW5rIGV4cGVjdHMgdGhlIHZhbHVlIHRvIGJlIGFuIGFycmF5IG9mIHJvdXRlIG5hbWVzLCBmb2xsb3dlZCBieSB0aGUgcGFyYW1zXG4gKiBmb3IgdGhhdCBsZXZlbCBvZiByb3V0aW5nLiBGb3IgaW5zdGFuY2UgYFsnL1RlYW0nLCB7dGVhbUlkOiAxfSwgJ1VzZXInLCB7dXNlcklkOiAyfV1gXG4gKiBtZWFucyB0aGF0IHdlIHdhbnQgdG8gZ2VuZXJhdGUgYSBsaW5rIGZvciB0aGUgYFRlYW1gIHJvdXRlIHdpdGggcGFyYW1zIGB7dGVhbUlkOiAxfWAsXG4gKiBhbmQgd2l0aCBhIGNoaWxkIHJvdXRlIGBVc2VyYCB3aXRoIHBhcmFtcyBge3VzZXJJZDogMn1gLlxuICpcbiAqIFRoZSBmaXJzdCByb3V0ZSBuYW1lIHNob3VsZCBiZSBwcmVwZW5kZWQgd2l0aCBgL2AsIGAuL2AsIG9yIGAuLi9gLlxuICogSWYgdGhlIHJvdXRlIGJlZ2lucyB3aXRoIGAvYCwgdGhlIHJvdXRlciB3aWxsIGxvb2sgdXAgdGhlIHJvdXRlIGZyb20gdGhlIHJvb3Qgb2YgdGhlIGFwcC5cbiAqIElmIHRoZSByb3V0ZSBiZWdpbnMgd2l0aCBgLi9gLCB0aGUgcm91dGVyIHdpbGwgaW5zdGVhZCBsb29rIGluIHRoZSBjdXJyZW50IGNvbXBvbmVudCdzXG4gKiBjaGlsZHJlbiBmb3IgdGhlIHJvdXRlLiBBbmQgaWYgdGhlIHJvdXRlIGJlZ2lucyB3aXRoIGAuLi9gLCB0aGUgcm91dGVyIHdpbGwgbG9vayBhdCB0aGVcbiAqIGN1cnJlbnQgY29tcG9uZW50J3MgcGFyZW50LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcm91dGVyTGlua10nLFxuICBpbnB1dHM6IFsncm91dGVQYXJhbXM6IHJvdXRlckxpbmsnLCAndGFyZ2V0OiB0YXJnZXQnXSxcbiAgaG9zdDoge1xuICAgICcoY2xpY2spJzogJ29uQ2xpY2soKScsXG4gICAgJ1thdHRyLmhyZWZdJzogJ3Zpc2libGVIcmVmJyxcbiAgICAnW2NsYXNzLnJvdXRlci1saW5rLWFjdGl2ZV0nOiAnaXNSb3V0ZUFjdGl2ZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBSb3V0ZXJMaW5rIHtcbiAgcHJpdmF0ZSBfcm91dGVQYXJhbXM6IGFueVtdO1xuXG4gIC8vIHRoZSB1cmwgZGlzcGxheWVkIG9uIHRoZSBhbmNob3IgZWxlbWVudC5cbiAgdmlzaWJsZUhyZWY6IHN0cmluZztcbiAgdGFyZ2V0OiBzdHJpbmc7XG5cbiAgLy8gdGhlIGluc3RydWN0aW9uIHBhc3NlZCB0byB0aGUgcm91dGVyIHRvIG5hdmlnYXRlXG4gIHByaXZhdGUgX25hdmlnYXRpb25JbnN0cnVjdGlvbjogSW5zdHJ1Y3Rpb247XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgX2xvY2F0aW9uOiBMb2NhdGlvbikge1xuICAgIC8vIHdlIG5lZWQgdG8gdXBkYXRlIHRoZSBsaW5rIHdoZW5ldmVyIGEgcm91dGUgY2hhbmdlcyB0byBhY2NvdW50IGZvciBhdXggcm91dGVzXG4gICAgdGhpcy5fcm91dGVyLnN1YnNjcmliZSgoXykgPT4gdGhpcy5fdXBkYXRlTGluaygpKTtcbiAgfVxuXG4gIC8vIGJlY2F1c2UgYXV4aWxpYXJ5IGxpbmtzIHRha2UgZXhpc3RpbmcgcHJpbWFyeSBhbmQgYXV4aWxpYXJ5IHJvdXRlcyBpbnRvIGFjY291bnQsXG4gIC8vIHdlIG5lZWQgdG8gdXBkYXRlIHRoZSBsaW5rIHdoZW5ldmVyIHBhcmFtcyBvciBvdGhlciByb3V0ZXMgY2hhbmdlLlxuICBwcml2YXRlIF91cGRhdGVMaW5rKCk6IHZvaWQge1xuICAgIHRoaXMuX25hdmlnYXRpb25JbnN0cnVjdGlvbiA9IHRoaXMuX3JvdXRlci5nZW5lcmF0ZSh0aGlzLl9yb3V0ZVBhcmFtcyk7XG4gICAgdmFyIG5hdmlnYXRpb25IcmVmID0gdGhpcy5fbmF2aWdhdGlvbkluc3RydWN0aW9uLnRvTGlua1VybCgpO1xuICAgIHRoaXMudmlzaWJsZUhyZWYgPSB0aGlzLl9sb2NhdGlvbi5wcmVwYXJlRXh0ZXJuYWxVcmwobmF2aWdhdGlvbkhyZWYpO1xuICB9XG5cbiAgZ2V0IGlzUm91dGVBY3RpdmUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9yb3V0ZXIuaXNSb3V0ZUFjdGl2ZSh0aGlzLl9uYXZpZ2F0aW9uSW5zdHJ1Y3Rpb24pOyB9XG5cbiAgc2V0IHJvdXRlUGFyYW1zKGNoYW5nZXM6IGFueVtdKSB7XG4gICAgdGhpcy5fcm91dGVQYXJhbXMgPSBjaGFuZ2VzO1xuICAgIHRoaXMuX3VwZGF0ZUxpbmsoKTtcbiAgfVxuXG4gIG9uQ2xpY2soKTogYm9vbGVhbiB7XG4gICAgLy8gSWYgbm8gdGFyZ2V0LCBvciBpZiB0YXJnZXQgaXMgX3NlbGYsIHByZXZlbnQgZGVmYXVsdCBicm93c2VyIGJlaGF2aW9yXG4gICAgaWYgKCFpc1N0cmluZyh0aGlzLnRhcmdldCkgfHwgdGhpcy50YXJnZXQgPT0gJ19zZWxmJykge1xuICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlQnlJbnN0cnVjdGlvbih0aGlzLl9uYXZpZ2F0aW9uSW5zdHJ1Y3Rpb24pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
