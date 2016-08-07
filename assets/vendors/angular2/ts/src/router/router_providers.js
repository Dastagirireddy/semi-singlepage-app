System.register(['./router_providers_common', 'angular2/core', 'angular2/src/platform/browser/location/browser_platform_location', 'angular2/platform/common', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_providers_common_1, core_1, browser_platform_location_1, common_1, lang_1;
    var ROUTER_PROVIDERS, ROUTER_BINDINGS;
    return {
        setters:[
            function (router_providers_common_1_1) {
                router_providers_common_1 = router_providers_common_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_platform_location_1_1) {
                browser_platform_location_1 = browser_platform_location_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * A list of {@link Provider}s. To use the router, you must add this to your application.
             *
             * ### Example ([live demo](http://plnkr.co/edit/iRUP8B5OUbxCWQ3AcIDm))
             *
             * ```
             * import {Component} from 'angular2/core';
             * import {
             *   ROUTER_DIRECTIVES,
             *   ROUTER_PROVIDERS,
             *   RouteConfig
             * } from 'angular2/router';
             *
             * @Component({directives: [ROUTER_DIRECTIVES]})
             * @RouteConfig([
             *  {...},
             * ])
             * class AppCmp {
             *   // ...
             * }
             *
             * bootstrap(AppCmp, [ROUTER_PROVIDERS]);
             * ```
             */
            exports_1("ROUTER_PROVIDERS", ROUTER_PROVIDERS = lang_1.CONST_EXPR([
                router_providers_common_1.ROUTER_PROVIDERS_COMMON,
                lang_1.CONST_EXPR(new core_1.Provider(common_1.PlatformLocation, { useClass: browser_platform_location_1.BrowserPlatformLocation })),
            ]));
            /**
             * Use {@link ROUTER_PROVIDERS} instead.
             *
             * @deprecated
             */
            exports_1("ROUTER_BINDINGS", ROUTER_BINDINGS = ROUTER_PROVIDERS);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvcm91dGVyX3Byb3ZpZGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBZ0NhLGdCQUFnQixFQVVoQixlQUFlOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBbEM1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUF1Qkc7WUFDVSw4QkFBQSxnQkFBZ0IsR0FBVSxpQkFBVSxDQUFDO2dCQUNoRCxpREFBdUI7Z0JBQ3ZCLGlCQUFVLENBQUMsSUFBSSxlQUFRLENBQUMseUJBQWdCLEVBQUUsRUFBQyxRQUFRLEVBQUUsbURBQXVCLEVBQUMsQ0FBQyxDQUFDO2FBQ2hGLENBQUMsQ0FBQSxDQUFDO1lBRUg7Ozs7ZUFJRztZQUNVLDZCQUFBLGVBQWUsR0FBRyxnQkFBZ0IsQ0FBQSxDQUFDIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvcm91dGVyX3Byb3ZpZGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Uk9VVEVSX1BST1ZJREVSU19DT01NT059IGZyb20gJy4vcm91dGVyX3Byb3ZpZGVyc19jb21tb24nO1xuaW1wb3J0IHtQcm92aWRlcn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1xuICBCcm93c2VyUGxhdGZvcm1Mb2NhdGlvblxufSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vYnJvd3Nlci9sb2NhdGlvbi9icm93c2VyX3BsYXRmb3JtX2xvY2F0aW9uJztcbmltcG9ydCB7UGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vY29tbW9uJztcbmltcG9ydCB7Q09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuLyoqXG4gKiBBIGxpc3Qgb2Yge0BsaW5rIFByb3ZpZGVyfXMuIFRvIHVzZSB0aGUgcm91dGVyLCB5b3UgbXVzdCBhZGQgdGhpcyB0byB5b3VyIGFwcGxpY2F0aW9uLlxuICpcbiAqICMjIyBFeGFtcGxlIChbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC9pUlVQOEI1T1VieENXUTNBY0lEbSkpXG4gKlxuICogYGBgXG4gKiBpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG4gKiBpbXBvcnQge1xuICogICBST1VURVJfRElSRUNUSVZFUyxcbiAqICAgUk9VVEVSX1BST1ZJREVSUyxcbiAqICAgUm91dGVDb25maWdcbiAqIH0gZnJvbSAnYW5ndWxhcjIvcm91dGVyJztcbiAqXG4gKiBAQ29tcG9uZW50KHtkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVNdfSlcbiAqIEBSb3V0ZUNvbmZpZyhbXG4gKiAgey4uLn0sXG4gKiBdKVxuICogY2xhc3MgQXBwQ21wIHtcbiAqICAgLy8gLi4uXG4gKiB9XG4gKlxuICogYm9vdHN0cmFwKEFwcENtcCwgW1JPVVRFUl9QUk9WSURFUlNdKTtcbiAqIGBgYFxuICovXG5leHBvcnQgY29uc3QgUk9VVEVSX1BST1ZJREVSUzogYW55W10gPSBDT05TVF9FWFBSKFtcbiAgUk9VVEVSX1BST1ZJREVSU19DT01NT04sXG4gIENPTlNUX0VYUFIobmV3IFByb3ZpZGVyKFBsYXRmb3JtTG9jYXRpb24sIHt1c2VDbGFzczogQnJvd3NlclBsYXRmb3JtTG9jYXRpb259KSksXG5dKTtcblxuLyoqXG4gKiBVc2Uge0BsaW5rIFJPVVRFUl9QUk9WSURFUlN9IGluc3RlYWQuXG4gKlxuICogQGRlcHJlY2F0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IFJPVVRFUl9CSU5ESU5HUyA9IFJPVVRFUl9QUk9WSURFUlM7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
