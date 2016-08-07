/**
 * @module
 * @description
 * Maps application URLs into application states, to support deep-linking and navigation.
 */
System.register(['./src/router/router', './src/router/directives/router_outlet', './src/router/directives/router_link', './src/router/instruction', './src/router/location/platform_location', './src/router/route_registry', './src/router/location/location_strategy', './src/router/location/hash_location_strategy', './src/router/location/path_location_strategy', './src/router/location/location', './src/router/route_config/route_config_decorator', './src/router/lifecycle/lifecycle_annotations', 'angular2/core', 'angular2/src/router/router_providers_common', 'angular2/src/router/router_providers', './src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_outlet_1, router_link_1, lang_1;
    var ROUTER_DIRECTIVES;
    var exportedNames_1 = {
        'ROUTER_DIRECTIVES': true,
        'Router': true,
        'RouterOutlet': true,
        'RouterLink': true,
        'RouteParams': true,
        'RouteData': true,
        'PlatformLocation': true,
        'RouteRegistry': true,
        'ROUTER_PRIMARY_COMPONENT': true,
        'LocationStrategy': true,
        'APP_BASE_HREF': true,
        'HashLocationStrategy': true,
        'PathLocationStrategy': true,
        'Location': true,
        'CanActivate': true,
        'Instruction': true,
        'ComponentInstruction': true,
        'OpaqueToken': true,
        'ROUTER_PROVIDERS_COMMON': true,
        'ROUTER_PROVIDERS': true,
        'ROUTER_BINDINGS': true
    };
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (router_1_1) {
                exports_1({
                    "Router": router_1_1["Router"]
                });
            },
            function (router_outlet_2_1) {
                exports_1({
                    "RouterOutlet": router_outlet_2_1["RouterOutlet"]
                });
                router_outlet_1 = router_outlet_2_1;
            },
            function (router_link_2_1) {
                exports_1({
                    "RouterLink": router_link_2_1["RouterLink"]
                });
                router_link_1 = router_link_2_1;
            },
            function (instruction_1_1) {
                exports_1({
                    "RouteParams": instruction_1_1["RouteParams"],
                    "RouteData": instruction_1_1["RouteData"]
                });
                exports_1({
                    "Instruction": instruction_1_1["Instruction"],
                    "ComponentInstruction": instruction_1_1["ComponentInstruction"]
                });
            },
            function (platform_location_1_1) {
                exports_1({
                    "PlatformLocation": platform_location_1_1["PlatformLocation"]
                });
            },
            function (route_registry_1_1) {
                exports_1({
                    "RouteRegistry": route_registry_1_1["RouteRegistry"],
                    "ROUTER_PRIMARY_COMPONENT": route_registry_1_1["ROUTER_PRIMARY_COMPONENT"]
                });
            },
            function (location_strategy_1_1) {
                exports_1({
                    "LocationStrategy": location_strategy_1_1["LocationStrategy"],
                    "APP_BASE_HREF": location_strategy_1_1["APP_BASE_HREF"]
                });
            },
            function (hash_location_strategy_1_1) {
                exports_1({
                    "HashLocationStrategy": hash_location_strategy_1_1["HashLocationStrategy"]
                });
            },
            function (path_location_strategy_1_1) {
                exports_1({
                    "PathLocationStrategy": path_location_strategy_1_1["PathLocationStrategy"]
                });
            },
            function (location_1_1) {
                exports_1({
                    "Location": location_1_1["Location"]
                });
            },
            function (route_config_decorator_1_1) {
                exportStar_1(route_config_decorator_1_1);
            },
            function (lifecycle_annotations_1_1) {
                exports_1({
                    "CanActivate": lifecycle_annotations_1_1["CanActivate"]
                });
            },
            function (core_1_1) {
                exports_1({
                    "OpaqueToken": core_1_1["OpaqueToken"]
                });
            },
            function (router_providers_common_1_1) {
                exports_1({
                    "ROUTER_PROVIDERS_COMMON": router_providers_common_1_1["ROUTER_PROVIDERS_COMMON"]
                });
            },
            function (router_providers_1_1) {
                exports_1({
                    "ROUTER_PROVIDERS": router_providers_1_1["ROUTER_PROVIDERS"],
                    "ROUTER_BINDINGS": router_providers_1_1["ROUTER_BINDINGS"]
                });
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * A list of directives. To use the router directives like {@link RouterOutlet} and
             * {@link RouterLink}, add this to your `directives` array in the {@link View} decorator of your
             * component.
             *
             * ### Example ([live demo](http://plnkr.co/edit/iRUP8B5OUbxCWQ3AcIDm))
             *
             * ```
             * import {Component} from 'angular2/core';
             * import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig} from 'angular2/router';
             *
             * @Component({directives: [ROUTER_DIRECTIVES]})
             * @RouteConfig([
             *  {...},
             * ])
             * class AppCmp {
             *    // ...
             * }
             *
             * bootstrap(AppCmp, [ROUTER_PROVIDERS]);
             * ```
             */
            exports_1("ROUTER_DIRECTIVES", ROUTER_DIRECTIVES = lang_1.CONST_EXPR([router_outlet_1.RouterOutlet, router_link_1.RouterLink]));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvcm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7Ozs7O1FBK0NVLGlCQUFpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBdEI5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBcUJHO1lBQ1UsK0JBQUEsaUJBQWlCLEdBQVUsaUJBQVUsQ0FBQyxDQUFDLDRCQUFZLEVBQUUsd0JBQVUsQ0FBQyxDQUFDLENBQUEsQ0FBQyIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3JvdXRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQG1vZHVsZVxuICogQGRlc2NyaXB0aW9uXG4gKiBNYXBzIGFwcGxpY2F0aW9uIFVSTHMgaW50byBhcHBsaWNhdGlvbiBzdGF0ZXMsIHRvIHN1cHBvcnQgZGVlcC1saW5raW5nIGFuZCBuYXZpZ2F0aW9uLlxuICovXG5cbmV4cG9ydCB7Um91dGVyfSBmcm9tICcuL3NyYy9yb3V0ZXIvcm91dGVyJztcbmV4cG9ydCB7Um91dGVyT3V0bGV0fSBmcm9tICcuL3NyYy9yb3V0ZXIvZGlyZWN0aXZlcy9yb3V0ZXJfb3V0bGV0JztcbmV4cG9ydCB7Um91dGVyTGlua30gZnJvbSAnLi9zcmMvcm91dGVyL2RpcmVjdGl2ZXMvcm91dGVyX2xpbmsnO1xuZXhwb3J0IHtSb3V0ZVBhcmFtcywgUm91dGVEYXRhfSBmcm9tICcuL3NyYy9yb3V0ZXIvaW5zdHJ1Y3Rpb24nO1xuZXhwb3J0IHtQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICcuL3NyYy9yb3V0ZXIvbG9jYXRpb24vcGxhdGZvcm1fbG9jYXRpb24nO1xuZXhwb3J0IHtSb3V0ZVJlZ2lzdHJ5LCBST1VURVJfUFJJTUFSWV9DT01QT05FTlR9IGZyb20gJy4vc3JjL3JvdXRlci9yb3V0ZV9yZWdpc3RyeSc7XG5leHBvcnQge0xvY2F0aW9uU3RyYXRlZ3ksIEFQUF9CQVNFX0hSRUZ9IGZyb20gJy4vc3JjL3JvdXRlci9sb2NhdGlvbi9sb2NhdGlvbl9zdHJhdGVneSc7XG5leHBvcnQge0hhc2hMb2NhdGlvblN0cmF0ZWd5fSBmcm9tICcuL3NyYy9yb3V0ZXIvbG9jYXRpb24vaGFzaF9sb2NhdGlvbl9zdHJhdGVneSc7XG5leHBvcnQge1BhdGhMb2NhdGlvblN0cmF0ZWd5fSBmcm9tICcuL3NyYy9yb3V0ZXIvbG9jYXRpb24vcGF0aF9sb2NhdGlvbl9zdHJhdGVneSc7XG5leHBvcnQge0xvY2F0aW9ufSBmcm9tICcuL3NyYy9yb3V0ZXIvbG9jYXRpb24vbG9jYXRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvcm91dGVyL3JvdXRlX2NvbmZpZy9yb3V0ZV9jb25maWdfZGVjb3JhdG9yJztcbmV4cG9ydCAqIGZyb20gJy4vc3JjL3JvdXRlci9yb3V0ZV9kZWZpbml0aW9uJztcbmV4cG9ydCB7T25BY3RpdmF0ZSwgT25EZWFjdGl2YXRlLCBPblJldXNlLCBDYW5EZWFjdGl2YXRlLCBDYW5SZXVzZX0gZnJvbSAnLi9zcmMvcm91dGVyL2ludGVyZmFjZXMnO1xuZXhwb3J0IHtDYW5BY3RpdmF0ZX0gZnJvbSAnLi9zcmMvcm91dGVyL2xpZmVjeWNsZS9saWZlY3ljbGVfYW5ub3RhdGlvbnMnO1xuZXhwb3J0IHtJbnN0cnVjdGlvbiwgQ29tcG9uZW50SW5zdHJ1Y3Rpb259IGZyb20gJy4vc3JjL3JvdXRlci9pbnN0cnVjdGlvbic7XG5leHBvcnQge09wYXF1ZVRva2VufSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmV4cG9ydCB7Uk9VVEVSX1BST1ZJREVSU19DT01NT059IGZyb20gJ2FuZ3VsYXIyL3NyYy9yb3V0ZXIvcm91dGVyX3Byb3ZpZGVyc19jb21tb24nO1xuZXhwb3J0IHtST1VURVJfUFJPVklERVJTLCBST1VURVJfQklORElOR1N9IGZyb20gJ2FuZ3VsYXIyL3NyYy9yb3V0ZXIvcm91dGVyX3Byb3ZpZGVycyc7XG5cbmltcG9ydCB7Um91dGVyT3V0bGV0fSBmcm9tICcuL3NyYy9yb3V0ZXIvZGlyZWN0aXZlcy9yb3V0ZXJfb3V0bGV0JztcbmltcG9ydCB7Um91dGVyTGlua30gZnJvbSAnLi9zcmMvcm91dGVyL2RpcmVjdGl2ZXMvcm91dGVyX2xpbmsnO1xuaW1wb3J0IHtDT05TVF9FWFBSfSBmcm9tICcuL3NyYy9mYWNhZGUvbGFuZyc7XG5cbi8qKlxuICogQSBsaXN0IG9mIGRpcmVjdGl2ZXMuIFRvIHVzZSB0aGUgcm91dGVyIGRpcmVjdGl2ZXMgbGlrZSB7QGxpbmsgUm91dGVyT3V0bGV0fSBhbmRcbiAqIHtAbGluayBSb3V0ZXJMaW5rfSwgYWRkIHRoaXMgdG8geW91ciBgZGlyZWN0aXZlc2AgYXJyYXkgaW4gdGhlIHtAbGluayBWaWV3fSBkZWNvcmF0b3Igb2YgeW91clxuICogY29tcG9uZW50LlxuICpcbiAqICMjIyBFeGFtcGxlIChbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC9pUlVQOEI1T1VieENXUTNBY0lEbSkpXG4gKlxuICogYGBgXG4gKiBpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG4gKiBpbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTLCBST1VURVJfUFJPVklERVJTLCBSb3V0ZUNvbmZpZ30gZnJvbSAnYW5ndWxhcjIvcm91dGVyJztcbiAqXG4gKiBAQ29tcG9uZW50KHtkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVNdfSlcbiAqIEBSb3V0ZUNvbmZpZyhbXG4gKiAgey4uLn0sXG4gKiBdKVxuICogY2xhc3MgQXBwQ21wIHtcbiAqICAgIC8vIC4uLlxuICogfVxuICpcbiAqIGJvb3RzdHJhcChBcHBDbXAsIFtST1VURVJfUFJPVklERVJTXSk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNvbnN0IFJPVVRFUl9ESVJFQ1RJVkVTOiBhbnlbXSA9IENPTlNUX0VYUFIoW1JvdXRlck91dGxldCwgUm91dGVyTGlua10pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
