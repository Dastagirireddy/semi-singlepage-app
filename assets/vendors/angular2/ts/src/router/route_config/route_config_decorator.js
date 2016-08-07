System.register(['./route_config_impl', 'angular2/src/core/util/decorators'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var route_config_impl_1, decorators_1;
    var RouteConfig;
    return {
        setters:[
            function (route_config_impl_1_1) {
                route_config_impl_1 = route_config_impl_1_1;
                exports_1({
                    "Route": route_config_impl_1_1["Route"],
                    "Redirect": route_config_impl_1_1["Redirect"],
                    "AuxRoute": route_config_impl_1_1["AuxRoute"],
                    "AsyncRoute": route_config_impl_1_1["AsyncRoute"],
                    "RouteDefinition": route_config_impl_1_1["RouteDefinition"]
                });
            },
            function (decorators_1_1) {
                decorators_1 = decorators_1_1;
            }],
        execute: function() {
            // Copied from RouteConfig in route_config_impl.
            /**
             * The `RouteConfig` decorator defines routes for a given component.
             *
             * It takes an array of {@link RouteDefinition}s.
             */
            exports_1("RouteConfig", RouteConfig = decorators_1.makeDecorator(route_config_impl_1.RouteConfig));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvcm91dGVfY29uZmlnL3JvdXRlX2NvbmZpZ19kZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQVdXLFdBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBTnRCLGdEQUFnRDtZQUNoRDs7OztlQUlHO1lBQ1EseUJBQUEsV0FBVyxHQUNsQiwwQkFBYSxDQUFDLCtCQUFxQixDQUFDLENBQUEsQ0FBQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvcm91dGVyL3JvdXRlX2NvbmZpZy9yb3V0ZV9jb25maWdfZGVjb3JhdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSb3V0ZUNvbmZpZyBhcyBSb3V0ZUNvbmZpZ0Fubm90YXRpb24sIFJvdXRlRGVmaW5pdGlvbn0gZnJvbSAnLi9yb3V0ZV9jb25maWdfaW1wbCc7XG5pbXBvcnQge21ha2VEZWNvcmF0b3J9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3V0aWwvZGVjb3JhdG9ycyc7XG5cbmV4cG9ydCB7Um91dGUsIFJlZGlyZWN0LCBBdXhSb3V0ZSwgQXN5bmNSb3V0ZSwgUm91dGVEZWZpbml0aW9ufSBmcm9tICcuL3JvdXRlX2NvbmZpZ19pbXBsJztcblxuLy8gQ29waWVkIGZyb20gUm91dGVDb25maWcgaW4gcm91dGVfY29uZmlnX2ltcGwuXG4vKipcbiAqIFRoZSBgUm91dGVDb25maWdgIGRlY29yYXRvciBkZWZpbmVzIHJvdXRlcyBmb3IgYSBnaXZlbiBjb21wb25lbnQuXG4gKlxuICogSXQgdGFrZXMgYW4gYXJyYXkgb2Yge0BsaW5rIFJvdXRlRGVmaW5pdGlvbn1zLlxuICovXG5leHBvcnQgdmFyIFJvdXRlQ29uZmlnOiAoY29uZmlnczogUm91dGVEZWZpbml0aW9uW10pID0+IENsYXNzRGVjb3JhdG9yID1cbiAgICBtYWtlRGVjb3JhdG9yKFJvdXRlQ29uZmlnQW5ub3RhdGlvbik7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
