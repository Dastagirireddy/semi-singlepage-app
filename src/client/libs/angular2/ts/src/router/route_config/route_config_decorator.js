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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9yb3V0ZV9jb25maWcvcm91dGVfY29uZmlnX2RlY29yYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBV1csV0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFOdEIsZ0RBQWdEO1lBQ2hEOzs7O2VBSUc7WUFDUSx5QkFBQSxXQUFXLEdBQ2xCLDBCQUFhLENBQUMsK0JBQXFCLENBQUMsQ0FBQSxDQUFDIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9yb3V0ZV9jb25maWcvcm91dGVfY29uZmlnX2RlY29yYXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Um91dGVDb25maWcgYXMgUm91dGVDb25maWdBbm5vdGF0aW9uLCBSb3V0ZURlZmluaXRpb259IGZyb20gJy4vcm91dGVfY29uZmlnX2ltcGwnO1xuaW1wb3J0IHttYWtlRGVjb3JhdG9yfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS91dGlsL2RlY29yYXRvcnMnO1xuXG5leHBvcnQge1JvdXRlLCBSZWRpcmVjdCwgQXV4Um91dGUsIEFzeW5jUm91dGUsIFJvdXRlRGVmaW5pdGlvbn0gZnJvbSAnLi9yb3V0ZV9jb25maWdfaW1wbCc7XG5cbi8vIENvcGllZCBmcm9tIFJvdXRlQ29uZmlnIGluIHJvdXRlX2NvbmZpZ19pbXBsLlxuLyoqXG4gKiBUaGUgYFJvdXRlQ29uZmlnYCBkZWNvcmF0b3IgZGVmaW5lcyByb3V0ZXMgZm9yIGEgZ2l2ZW4gY29tcG9uZW50LlxuICpcbiAqIEl0IHRha2VzIGFuIGFycmF5IG9mIHtAbGluayBSb3V0ZURlZmluaXRpb259cy5cbiAqL1xuZXhwb3J0IHZhciBSb3V0ZUNvbmZpZzogKGNvbmZpZ3M6IFJvdXRlRGVmaW5pdGlvbltdKSA9PiBDbGFzc0RlY29yYXRvciA9XG4gICAgbWFrZURlY29yYXRvcihSb3V0ZUNvbmZpZ0Fubm90YXRpb24pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
