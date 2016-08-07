/**
 * @module
 * @description
 * Alternative implementation of the router. Experimental.
 */
System.register(['./src/alt_router/router', './src/alt_router/segments', './src/alt_router/metadata/decorators', './src/alt_router/metadata/metadata', './src/alt_router/router_url_parser', './src/alt_router/directives/router_outlet', './src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_outlet_1, lang_1;
    var ROUTER_DIRECTIVES;
    return {
        setters:[
            function (router_1_1) {
                exports_1({
                    "Router": router_1_1["Router"],
                    "RouterOutletMap": router_1_1["RouterOutletMap"]
                });
            },
            function (segments_1_1) {
                exports_1({
                    "RouteSegment": segments_1_1["RouteSegment"]
                });
            },
            function (decorators_1_1) {
                exports_1({
                    "Routes": decorators_1_1["Routes"]
                });
            },
            function (metadata_1_1) {
                exports_1({
                    "Route": metadata_1_1["Route"]
                });
            },
            function (router_url_parser_1_1) {
                exports_1({
                    "RouterUrlParser": router_url_parser_1_1["RouterUrlParser"],
                    "DefaultRouterUrlParser": router_url_parser_1_1["DefaultRouterUrlParser"]
                });
            },
            function (router_outlet_1_1) {
                router_outlet_1 = router_outlet_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            exports_1("ROUTER_DIRECTIVES", ROUTER_DIRECTIVES = lang_1.CONST_EXPR([router_outlet_1.RouterOutlet]));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2FsdF9yb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7Ozs7UUFZVSxpQkFBaUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFBakIsK0JBQUEsaUJBQWlCLEdBQVUsaUJBQVUsQ0FBQyxDQUFDLDRCQUFZLENBQUMsQ0FBQyxDQUFBLENBQUMiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvYWx0X3JvdXRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQG1vZHVsZVxuICogQGRlc2NyaXB0aW9uXG4gKiBBbHRlcm5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgcm91dGVyLiBFeHBlcmltZW50YWwuXG4gKi9cblxuZXhwb3J0IHtSb3V0ZXIsIFJvdXRlck91dGxldE1hcH0gZnJvbSAnLi9zcmMvYWx0X3JvdXRlci9yb3V0ZXInO1xuZXhwb3J0IHtSb3V0ZVNlZ21lbnR9IGZyb20gJy4vc3JjL2FsdF9yb3V0ZXIvc2VnbWVudHMnO1xuZXhwb3J0IHtSb3V0ZXN9IGZyb20gJy4vc3JjL2FsdF9yb3V0ZXIvbWV0YWRhdGEvZGVjb3JhdG9ycyc7XG5leHBvcnQge1JvdXRlfSBmcm9tICcuL3NyYy9hbHRfcm91dGVyL21ldGFkYXRhL21ldGFkYXRhJztcbmV4cG9ydCB7Um91dGVyVXJsUGFyc2VyLCBEZWZhdWx0Um91dGVyVXJsUGFyc2VyfSBmcm9tICcuL3NyYy9hbHRfcm91dGVyL3JvdXRlcl91cmxfcGFyc2VyJztcbmV4cG9ydCB7T25BY3RpdmF0ZX0gZnJvbSAnLi9zcmMvYWx0X3JvdXRlci9pbnRlcmZhY2VzJztcblxuaW1wb3J0IHtSb3V0ZXJPdXRsZXR9IGZyb20gJy4vc3JjL2FsdF9yb3V0ZXIvZGlyZWN0aXZlcy9yb3V0ZXJfb3V0bGV0JztcbmltcG9ydCB7Q09OU1RfRVhQUn0gZnJvbSAnLi9zcmMvZmFjYWRlL2xhbmcnO1xuXG5leHBvcnQgY29uc3QgUk9VVEVSX0RJUkVDVElWRVM6IGFueVtdID0gQ09OU1RfRVhQUihbUm91dGVyT3V0bGV0XSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
