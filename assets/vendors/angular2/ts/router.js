/**
 * @module
 * @description
 * Maps application URLs into application states, to support deep-linking and navigation.
 */
System.register(['./src/router/router', './src/router/directives/router_outlet', './src/router/directives/router_link', './src/router/instruction', './src/router/route_registry', './src/router/route_config/route_config_decorator', './src/router/lifecycle/lifecycle_annotations', 'angular2/core', 'angular2/src/router/router_providers_common', 'angular2/src/router/router_providers', './src/facade/lang'], function(exports_1, context_1) {
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
        'RouteRegistry': true,
        'ROUTER_PRIMARY_COMPONENT': true,
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
            function (route_registry_1_1) {
                exports_1({
                    "RouteRegistry": route_registry_1_1["RouteRegistry"],
                    "ROUTER_PRIMARY_COMPONENT": route_registry_1_1["ROUTER_PRIMARY_COMPONENT"]
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOzs7OztRQTBDVSxpQkFBaUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUF0QjlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFxQkc7WUFDVSwrQkFBQSxpQkFBaUIsR0FBVSxpQkFBVSxDQUFDLENBQUMsNEJBQVksRUFBRSx3QkFBVSxDQUFDLENBQUMsQ0FBQSxDQUFDIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3JvdXRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQG1vZHVsZVxuICogQGRlc2NyaXB0aW9uXG4gKiBNYXBzIGFwcGxpY2F0aW9uIFVSTHMgaW50byBhcHBsaWNhdGlvbiBzdGF0ZXMsIHRvIHN1cHBvcnQgZGVlcC1saW5raW5nIGFuZCBuYXZpZ2F0aW9uLlxuICovXG5cbmV4cG9ydCB7Um91dGVyfSBmcm9tICcuL3NyYy9yb3V0ZXIvcm91dGVyJztcbmV4cG9ydCB7Um91dGVyT3V0bGV0fSBmcm9tICcuL3NyYy9yb3V0ZXIvZGlyZWN0aXZlcy9yb3V0ZXJfb3V0bGV0JztcbmV4cG9ydCB7Um91dGVyTGlua30gZnJvbSAnLi9zcmMvcm91dGVyL2RpcmVjdGl2ZXMvcm91dGVyX2xpbmsnO1xuZXhwb3J0IHtSb3V0ZVBhcmFtcywgUm91dGVEYXRhfSBmcm9tICcuL3NyYy9yb3V0ZXIvaW5zdHJ1Y3Rpb24nO1xuZXhwb3J0IHtSb3V0ZVJlZ2lzdHJ5LCBST1VURVJfUFJJTUFSWV9DT01QT05FTlR9IGZyb20gJy4vc3JjL3JvdXRlci9yb3V0ZV9yZWdpc3RyeSc7XG5leHBvcnQgKiBmcm9tICcuL3NyYy9yb3V0ZXIvcm91dGVfY29uZmlnL3JvdXRlX2NvbmZpZ19kZWNvcmF0b3InO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvcm91dGVyL3JvdXRlX2RlZmluaXRpb24nO1xuZXhwb3J0IHtPbkFjdGl2YXRlLCBPbkRlYWN0aXZhdGUsIE9uUmV1c2UsIENhbkRlYWN0aXZhdGUsIENhblJldXNlfSBmcm9tICcuL3NyYy9yb3V0ZXIvaW50ZXJmYWNlcyc7XG5leHBvcnQge0NhbkFjdGl2YXRlfSBmcm9tICcuL3NyYy9yb3V0ZXIvbGlmZWN5Y2xlL2xpZmVjeWNsZV9hbm5vdGF0aW9ucyc7XG5leHBvcnQge0luc3RydWN0aW9uLCBDb21wb25lbnRJbnN0cnVjdGlvbn0gZnJvbSAnLi9zcmMvcm91dGVyL2luc3RydWN0aW9uJztcbmV4cG9ydCB7T3BhcXVlVG9rZW59IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuZXhwb3J0IHtST1VURVJfUFJPVklERVJTX0NPTU1PTn0gZnJvbSAnYW5ndWxhcjIvc3JjL3JvdXRlci9yb3V0ZXJfcHJvdmlkZXJzX2NvbW1vbic7XG5leHBvcnQge1JPVVRFUl9QUk9WSURFUlMsIFJPVVRFUl9CSU5ESU5HU30gZnJvbSAnYW5ndWxhcjIvc3JjL3JvdXRlci9yb3V0ZXJfcHJvdmlkZXJzJztcblxuaW1wb3J0IHtSb3V0ZXJPdXRsZXR9IGZyb20gJy4vc3JjL3JvdXRlci9kaXJlY3RpdmVzL3JvdXRlcl9vdXRsZXQnO1xuaW1wb3J0IHtSb3V0ZXJMaW5rfSBmcm9tICcuL3NyYy9yb3V0ZXIvZGlyZWN0aXZlcy9yb3V0ZXJfbGluayc7XG5pbXBvcnQge0NPTlNUX0VYUFJ9IGZyb20gJy4vc3JjL2ZhY2FkZS9sYW5nJztcblxuLyoqXG4gKiBBIGxpc3Qgb2YgZGlyZWN0aXZlcy4gVG8gdXNlIHRoZSByb3V0ZXIgZGlyZWN0aXZlcyBsaWtlIHtAbGluayBSb3V0ZXJPdXRsZXR9IGFuZFxuICoge0BsaW5rIFJvdXRlckxpbmt9LCBhZGQgdGhpcyB0byB5b3VyIGBkaXJlY3RpdmVzYCBhcnJheSBpbiB0aGUge0BsaW5rIFZpZXd9IGRlY29yYXRvciBvZiB5b3VyXG4gKiBjb21wb25lbnQuXG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L2lSVVA4QjVPVWJ4Q1dRM0FjSURtKSlcbiAqXG4gKiBgYGBcbiAqIGltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbiAqIGltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVMsIFJPVVRFUl9QUk9WSURFUlMsIFJvdXRlQ29uZmlnfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXInO1xuICpcbiAqIEBDb21wb25lbnQoe2RpcmVjdGl2ZXM6IFtST1VURVJfRElSRUNUSVZFU119KVxuICogQFJvdXRlQ29uZmlnKFtcbiAqICB7Li4ufSxcbiAqIF0pXG4gKiBjbGFzcyBBcHBDbXAge1xuICogICAgLy8gLi4uXG4gKiB9XG4gKlxuICogYm9vdHN0cmFwKEFwcENtcCwgW1JPVVRFUl9QUk9WSURFUlNdKTtcbiAqIGBgYFxuICovXG5leHBvcnQgY29uc3QgUk9VVEVSX0RJUkVDVElWRVM6IGFueVtdID0gQ09OU1RfRVhQUihbUm91dGVyT3V0bGV0LCBSb3V0ZXJMaW5rXSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
