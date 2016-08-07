System.register(['./router_providers_common', 'angular2/core', 'angular2/src/facade/lang', './location/browser_platform_location', './location/platform_location'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_providers_common_1, core_1, lang_1, browser_platform_location_1, platform_location_1;
    var ROUTER_PROVIDERS, ROUTER_BINDINGS;
    return {
        setters:[
            function (router_providers_common_1_1) {
                router_providers_common_1 = router_providers_common_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (browser_platform_location_1_1) {
                browser_platform_location_1 = browser_platform_location_1_1;
            },
            function (platform_location_1_1) {
                platform_location_1 = platform_location_1_1;
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
                lang_1.CONST_EXPR(new core_1.Provider(platform_location_1.PlatformLocation, { useClass: browser_platform_location_1.BrowserPlatformLocation })),
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9yb3V0ZXJfcHJvdmlkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUE4QmEsZ0JBQWdCLEVBVWhCLGVBQWU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFsQzVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQXVCRztZQUNVLDhCQUFBLGdCQUFnQixHQUFVLGlCQUFVLENBQUM7Z0JBQ2hELGlEQUF1QjtnQkFDdkIsaUJBQVUsQ0FBQyxJQUFJLGVBQVEsQ0FBQyxvQ0FBZ0IsRUFBRSxFQUFDLFFBQVEsRUFBRSxtREFBdUIsRUFBQyxDQUFDLENBQUM7YUFDaEYsQ0FBQyxDQUFBLENBQUM7WUFFSDs7OztlQUlHO1lBQ1UsNkJBQUEsZUFBZSxHQUFHLGdCQUFnQixDQUFBLENBQUMiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvcm91dGVyL3JvdXRlcl9wcm92aWRlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JPVVRFUl9QUk9WSURFUlNfQ09NTU9OfSBmcm9tICcuL3JvdXRlcl9wcm92aWRlcnNfY29tbW9uJztcbmltcG9ydCB7UHJvdmlkZXJ9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtDT05TVF9FWFBSfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCcm93c2VyUGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnLi9sb2NhdGlvbi9icm93c2VyX3BsYXRmb3JtX2xvY2F0aW9uJztcbmltcG9ydCB7UGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnLi9sb2NhdGlvbi9wbGF0Zm9ybV9sb2NhdGlvbic7XG5cbi8qKlxuICogQSBsaXN0IG9mIHtAbGluayBQcm92aWRlcn1zLiBUbyB1c2UgdGhlIHJvdXRlciwgeW91IG11c3QgYWRkIHRoaXMgdG8geW91ciBhcHBsaWNhdGlvbi5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvaVJVUDhCNU9VYnhDV1EzQWNJRG0pKVxuICpcbiAqIGBgYFxuICogaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuICogaW1wb3J0IHtcbiAqICAgUk9VVEVSX0RJUkVDVElWRVMsXG4gKiAgIFJPVVRFUl9QUk9WSURFUlMsXG4gKiAgIFJvdXRlQ29uZmlnXG4gKiB9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlcic7XG4gKlxuICogQENvbXBvbmVudCh7ZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTXX0pXG4gKiBAUm91dGVDb25maWcoW1xuICogIHsuLi59LFxuICogXSlcbiAqIGNsYXNzIEFwcENtcCB7XG4gKiAgIC8vIC4uLlxuICogfVxuICpcbiAqIGJvb3RzdHJhcChBcHBDbXAsIFtST1VURVJfUFJPVklERVJTXSk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNvbnN0IFJPVVRFUl9QUk9WSURFUlM6IGFueVtdID0gQ09OU1RfRVhQUihbXG4gIFJPVVRFUl9QUk9WSURFUlNfQ09NTU9OLFxuICBDT05TVF9FWFBSKG5ldyBQcm92aWRlcihQbGF0Zm9ybUxvY2F0aW9uLCB7dXNlQ2xhc3M6IEJyb3dzZXJQbGF0Zm9ybUxvY2F0aW9ufSkpLFxuXSk7XG5cbi8qKlxuICogVXNlIHtAbGluayBST1VURVJfUFJPVklERVJTfSBpbnN0ZWFkLlxuICpcbiAqIEBkZXByZWNhdGVkXG4gKi9cbmV4cG9ydCBjb25zdCBST1VURVJfQklORElOR1MgPSBST1VURVJfUFJPVklERVJTO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
