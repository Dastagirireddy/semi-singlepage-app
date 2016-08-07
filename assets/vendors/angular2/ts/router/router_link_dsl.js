System.register(['angular2/compiler', 'angular2/core', 'angular2/src/router/directives/router_link_transform', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var compiler_1, core_1, router_link_transform_1, lang_1;
    var ROUTER_LINK_DSL_PROVIDER;
    return {
        setters:[
            function (compiler_1_1) {
                compiler_1 = compiler_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_link_transform_1_1) {
                router_link_transform_1 = router_link_transform_1_1;
                exports_1({
                    "RouterLinkTransform": router_link_transform_1_1["RouterLinkTransform"]
                });
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * Enables the router link DSL.
             *
             * Warning. This feature is experimental and can change.
             *
             * To enable the transformer pass the router link DSL provider to `bootstrap`.
             *
             * ## Example:
             * ```
             * import {bootstrap} from 'angular2/platform/browser';
             * import {ROUTER_LINK_DSL_PROVIDER} from 'angular2/router/router_link_dsl';
             *
             * bootstrap(CustomApp, [ROUTER_LINK_DSL_PROVIDER]);
             * ```
             *
             * The DSL allows you to express router links as follows:
             * ```
             * <a [routerLink]="route:User"> <!-- Same as <a [routerLink]="['User']"> -->
             * <a [routerLink]="route:/User"> <!-- Same as <a [routerLink]="['User']"> -->
             * <a [routerLink]="route:./User"> <!-- Same as <a [routerLink]="['./User']"> -->
             * <a [routerLink]="./User(id: value, name: 'Bob')"> <!-- Same as <a [routerLink]="['./User', {id:
             * value, name: 'Bob'}]"> -->
             * <a [routerLink]="/User/Modal"> <!-- Same as <a [routerLink]="['/User', 'Modal']"> -->
             * <a [routerLink]="User[Modal]"> <!-- Same as <a [routerLink]="['User', ['Modal']]"> -->
             * ```
             */
            exports_1("ROUTER_LINK_DSL_PROVIDER", ROUTER_LINK_DSL_PROVIDER = lang_1.CONST_EXPR(new core_1.Provider(compiler_1.TEMPLATE_TRANSFORMS, { useClass: router_link_transform_1.RouterLinkTransform, multi: true })));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3JvdXRlci9yb3V0ZXJfbGlua19kc2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQWlDYSx3QkFBd0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUExQnJDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBeUJHO1lBQ1Usc0NBQUEsd0JBQXdCLEdBQ2pDLGlCQUFVLENBQUMsSUFBSSxlQUFRLENBQUMsOEJBQW1CLEVBQUUsRUFBQyxRQUFRLEVBQUUsMkNBQW1CLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQSxDQUFDIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3JvdXRlci9yb3V0ZXJfbGlua19kc2wuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1RFTVBMQVRFX1RSQU5TRk9STVN9IGZyb20gJ2FuZ3VsYXIyL2NvbXBpbGVyJztcbmltcG9ydCB7UHJvdmlkZXJ9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtSb3V0ZXJMaW5rVHJhbnNmb3JtfSBmcm9tICdhbmd1bGFyMi9zcmMvcm91dGVyL2RpcmVjdGl2ZXMvcm91dGVyX2xpbmtfdHJhbnNmb3JtJztcbmltcG9ydCB7Q09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuZXhwb3J0IHtSb3V0ZXJMaW5rVHJhbnNmb3JtfSBmcm9tICdhbmd1bGFyMi9zcmMvcm91dGVyL2RpcmVjdGl2ZXMvcm91dGVyX2xpbmtfdHJhbnNmb3JtJztcblxuLyoqXG4gKiBFbmFibGVzIHRoZSByb3V0ZXIgbGluayBEU0wuXG4gKlxuICogV2FybmluZy4gVGhpcyBmZWF0dXJlIGlzIGV4cGVyaW1lbnRhbCBhbmQgY2FuIGNoYW5nZS5cbiAqXG4gKiBUbyBlbmFibGUgdGhlIHRyYW5zZm9ybWVyIHBhc3MgdGhlIHJvdXRlciBsaW5rIERTTCBwcm92aWRlciB0byBgYm9vdHN0cmFwYC5cbiAqXG4gKiAjIyBFeGFtcGxlOlxuICogYGBgXG4gKiBpbXBvcnQge2Jvb3RzdHJhcH0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vYnJvd3Nlcic7XG4gKiBpbXBvcnQge1JPVVRFUl9MSU5LX0RTTF9QUk9WSURFUn0gZnJvbSAnYW5ndWxhcjIvcm91dGVyL3JvdXRlcl9saW5rX2RzbCc7XG4gKlxuICogYm9vdHN0cmFwKEN1c3RvbUFwcCwgW1JPVVRFUl9MSU5LX0RTTF9QUk9WSURFUl0pO1xuICogYGBgXG4gKlxuICogVGhlIERTTCBhbGxvd3MgeW91IHRvIGV4cHJlc3Mgcm91dGVyIGxpbmtzIGFzIGZvbGxvd3M6XG4gKiBgYGBcbiAqIDxhIFtyb3V0ZXJMaW5rXT1cInJvdXRlOlVzZXJcIj4gPCEtLSBTYW1lIGFzIDxhIFtyb3V0ZXJMaW5rXT1cIlsnVXNlciddXCI+IC0tPlxuICogPGEgW3JvdXRlckxpbmtdPVwicm91dGU6L1VzZXJcIj4gPCEtLSBTYW1lIGFzIDxhIFtyb3V0ZXJMaW5rXT1cIlsnVXNlciddXCI+IC0tPlxuICogPGEgW3JvdXRlckxpbmtdPVwicm91dGU6Li9Vc2VyXCI+IDwhLS0gU2FtZSBhcyA8YSBbcm91dGVyTGlua109XCJbJy4vVXNlciddXCI+IC0tPlxuICogPGEgW3JvdXRlckxpbmtdPVwiLi9Vc2VyKGlkOiB2YWx1ZSwgbmFtZTogJ0JvYicpXCI+IDwhLS0gU2FtZSBhcyA8YSBbcm91dGVyTGlua109XCJbJy4vVXNlcicsIHtpZDpcbiAqIHZhbHVlLCBuYW1lOiAnQm9iJ31dXCI+IC0tPlxuICogPGEgW3JvdXRlckxpbmtdPVwiL1VzZXIvTW9kYWxcIj4gPCEtLSBTYW1lIGFzIDxhIFtyb3V0ZXJMaW5rXT1cIlsnL1VzZXInLCAnTW9kYWwnXVwiPiAtLT5cbiAqIDxhIFtyb3V0ZXJMaW5rXT1cIlVzZXJbTW9kYWxdXCI+IDwhLS0gU2FtZSBhcyA8YSBbcm91dGVyTGlua109XCJbJ1VzZXInLCBbJ01vZGFsJ11dXCI+IC0tPlxuICogYGBgXG4gKi9cbmV4cG9ydCBjb25zdCBST1VURVJfTElOS19EU0xfUFJPVklERVIgPVxuICAgIENPTlNUX0VYUFIobmV3IFByb3ZpZGVyKFRFTVBMQVRFX1RSQU5TRk9STVMsIHt1c2VDbGFzczogUm91dGVyTGlua1RyYW5zZm9ybSwgbXVsdGk6IHRydWV9KSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
