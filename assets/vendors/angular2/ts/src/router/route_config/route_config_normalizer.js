System.register(['./route_config_decorator', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var route_config_decorator_1, lang_1, exceptions_1;
    /**
     * Given a JS Object that represents a route config, returns a corresponding Route, AsyncRoute,
     * AuxRoute or Redirect object.
     *
     * Also wraps an AsyncRoute's loader function to add the loaded component's route config to the
     * `RouteRegistry`.
     */
    function normalizeRouteConfig(config, registry) {
        if (config instanceof route_config_decorator_1.AsyncRoute) {
            var wrappedLoader = wrapLoaderToReconfigureRegistry(config.loader, registry);
            return new route_config_decorator_1.AsyncRoute({
                path: config.path,
                loader: wrappedLoader,
                name: config.name,
                data: config.data,
                useAsDefault: config.useAsDefault
            });
        }
        if (config instanceof route_config_decorator_1.Route || config instanceof route_config_decorator_1.Redirect || config instanceof route_config_decorator_1.AuxRoute) {
            return config;
        }
        if ((+!!config.component) + (+!!config.redirectTo) + (+!!config.loader) != 1) {
            throw new exceptions_1.BaseException("Route config should contain exactly one \"component\", \"loader\", or \"redirectTo\" property.");
        }
        if (config.as && config.name) {
            throw new exceptions_1.BaseException("Route config should contain exactly one \"as\" or \"name\" property.");
        }
        if (config.as) {
            config.name = config.as;
        }
        if (config.loader) {
            var wrappedLoader = wrapLoaderToReconfigureRegistry(config.loader, registry);
            return new route_config_decorator_1.AsyncRoute({
                path: config.path,
                loader: wrappedLoader,
                name: config.name,
                data: config.data,
                useAsDefault: config.useAsDefault
            });
        }
        if (config.aux) {
            return new route_config_decorator_1.AuxRoute({ path: config.aux, component: config.component, name: config.name });
        }
        if (config.component) {
            if (typeof config.component == 'object') {
                var componentDefinitionObject = config.component;
                if (componentDefinitionObject.type == 'constructor') {
                    return new route_config_decorator_1.Route({
                        path: config.path,
                        component: componentDefinitionObject.constructor,
                        name: config.name,
                        data: config.data,
                        useAsDefault: config.useAsDefault
                    });
                }
                else if (componentDefinitionObject.type == 'loader') {
                    return new route_config_decorator_1.AsyncRoute({
                        path: config.path,
                        loader: componentDefinitionObject.loader,
                        name: config.name,
                        data: config.data,
                        useAsDefault: config.useAsDefault
                    });
                }
                else {
                    throw new exceptions_1.BaseException("Invalid component type \"" + componentDefinitionObject.type + "\". Valid types are \"constructor\" and \"loader\".");
                }
            }
            return new route_config_decorator_1.Route(config);
        }
        if (config.redirectTo) {
            return new route_config_decorator_1.Redirect({ path: config.path, redirectTo: config.redirectTo });
        }
        return config;
    }
    exports_1("normalizeRouteConfig", normalizeRouteConfig);
    function wrapLoaderToReconfigureRegistry(loader, registry) {
        return function () {
            return loader().then(function (componentType) {
                registry.configFromComponent(componentType);
                return componentType;
            });
        };
    }
    function assertComponentExists(component, path) {
        if (!lang_1.isType(component)) {
            throw new exceptions_1.BaseException("Component for route \"" + path + "\" is not defined, or is not a class.");
        }
    }
    exports_1("assertComponentExists", assertComponentExists);
    return {
        setters:[
            function (route_config_decorator_1_1) {
                route_config_decorator_1 = route_config_decorator_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvcm91dGVfY29uZmlnL3JvdXRlX2NvbmZpZ19ub3JtYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7SUFPQTs7Ozs7O09BTUc7SUFDSCw4QkFBcUMsTUFBdUIsRUFDdkIsUUFBdUI7UUFDMUQsRUFBRSxDQUFDLENBQUMsTUFBTSxZQUFZLG1DQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksYUFBYSxHQUFHLCtCQUErQixDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDN0UsTUFBTSxDQUFDLElBQUksbUNBQVUsQ0FBQztnQkFDcEIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO2dCQUNqQixNQUFNLEVBQUUsYUFBYTtnQkFDckIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO2dCQUNqQixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7Z0JBQ2pCLFlBQVksRUFBRSxNQUFNLENBQUMsWUFBWTthQUNsQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxZQUFZLDhCQUFLLElBQUksTUFBTSxZQUFZLGlDQUFRLElBQUksTUFBTSxZQUFZLGlDQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3hGLE1BQU0sQ0FBa0IsTUFBTSxDQUFDO1FBQ2pDLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdFLE1BQU0sSUFBSSwwQkFBYSxDQUNuQixnR0FBMEYsQ0FBQyxDQUFDO1FBQ2xHLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFB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UUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUE3RUQsdURBNkVDLENBQUE7SUFHRCx5Q0FBeUMsTUFBZ0IsRUFBRSxRQUF1QjtRQUVoRixNQUFNLENBQUM7WUFDTCxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsYUFBYTtnQkFDakMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUM1QyxNQUFNLENBQUMsYUFBYSxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELCtCQUFzQyxTQUFlLEVBQUUsSUFBWTtRQUNqRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsTUFBTSxJQUFJLDBCQUFhLENBQUMsMkJBQXdCLElBQUksMENBQXNDLENBQUMsQ0FBQztRQUM5RixDQUFDO0lBQ0gsQ0FBQztJQUpELHlEQUlDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9yb3V0ZV9jb25maWcvcm91dGVfY29uZmlnX25vcm1hbGl6ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FzeW5jUm91dGUsIEF1eFJvdXRlLCBSb3V0ZSwgUmVkaXJlY3QsIFJvdXRlRGVmaW5pdGlvbn0gZnJvbSAnLi9yb3V0ZV9jb25maWdfZGVjb3JhdG9yJztcbmltcG9ydCB7Q29tcG9uZW50RGVmaW5pdGlvbn0gZnJvbSAnLi4vcm91dGVfZGVmaW5pdGlvbic7XG5pbXBvcnQge2lzVHlwZSwgVHlwZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbiwgV3JhcHBlZEV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7Um91dGVSZWdpc3RyeX0gZnJvbSAnLi4vcm91dGVfcmVnaXN0cnknO1xuXG5cbi8qKlxuICogR2l2ZW4gYSBKUyBPYmplY3QgdGhhdCByZXByZXNlbnRzIGEgcm91dGUgY29uZmlnLCByZXR1cm5zIGEgY29ycmVzcG9uZGluZyBSb3V0ZSwgQXN5bmNSb3V0ZSxcbiAqIEF1eFJvdXRlIG9yIFJlZGlyZWN0IG9iamVjdC5cbiAqXG4gKiBBbHNvIHdyYXBzIGFuIEFzeW5jUm91dGUncyBsb2FkZXIgZnVuY3Rpb24gdG8gYWRkIHRoZSBsb2FkZWQgY29tcG9uZW50J3Mgcm91dGUgY29uZmlnIHRvIHRoZVxuICogYFJvdXRlUmVnaXN0cnlgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplUm91dGVDb25maWcoY29uZmlnOiBSb3V0ZURlZmluaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnaXN0cnk6IFJvdXRlUmVnaXN0cnkpOiBSb3V0ZURlZmluaXRpb24ge1xuICBpZiAoY29uZmlnIGluc3RhbmNlb2YgQXN5bmNSb3V0ZSkge1xuICAgIHZhciB3cmFwcGVkTG9hZGVyID0gd3JhcExvYWRlclRvUmVjb25maWd1cmVSZWdpc3RyeShjb25maWcubG9hZGVyLCByZWdpc3RyeSk7XG4gICAgcmV0dXJuIG5ldyBBc3luY1JvdXRlKHtcbiAgICAgIHBhdGg6IGNvbmZpZy5wYXRoLFxuICAgICAgbG9hZGVyOiB3cmFwcGVkTG9hZGVyLFxuICAgICAgbmFtZTogY29uZmlnLm5hbWUsXG4gICAgICBkYXRhOiBjb25maWcuZGF0YSxcbiAgICAgIHVzZUFzRGVmYXVsdDogY29uZmlnLnVzZUFzRGVmYXVsdFxuICAgIH0pO1xuICB9XG4gIGlmIChjb25maWcgaW5zdGFuY2VvZiBSb3V0ZSB8fCBjb25maWcgaW5zdGFuY2VvZiBSZWRpcmVjdCB8fCBjb25maWcgaW5zdGFuY2VvZiBBdXhSb3V0ZSkge1xuICAgIHJldHVybiA8Um91dGVEZWZpbml0aW9uPmNvbmZpZztcbiAgfVxuXG4gIGlmICgoKyEhY29uZmlnLmNvbXBvbmVudCkgKyAoKyEhY29uZmlnLnJlZGlyZWN0VG8pICsgKCshIWNvbmZpZy5sb2FkZXIpICE9IDEpIHtcbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcbiAgICAgICAgYFJvdXRlIGNvbmZpZyBzaG91bGQgY29udGFpbiBleGFjdGx5IG9uZSBcImNvbXBvbmVudFwiLCBcImxvYWRlclwiLCBvciBcInJlZGlyZWN0VG9cIiBwcm9wZXJ0eS5gKTtcbiAgfVxuICBpZiAoY29uZmlnLmFzICYmIGNvbmZpZy5uYW1lKSB7XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYFJvdXRlIGNvbmZpZyBzaG91bGQgY29udGFpbiBleGFjdGx5IG9uZSBcImFzXCIgb3IgXCJuYW1lXCIgcHJvcGVydHkuYCk7XG4gIH1cbiAgaWYgKGNvbmZpZy5hcykge1xuICAgIGNvbmZpZy5uYW1lID0gY29uZmlnLmFzO1xuICB9XG4gIGlmIChjb25maWcubG9hZGVyKSB7XG4gICAgdmFyIHdyYXBwZWRMb2FkZXIgPSB3cmFwTG9hZGVyVG9SZWNvbmZpZ3VyZVJlZ2lzdHJ5KGNvbmZpZy5sb2FkZXIsIHJlZ2lzdHJ5KTtcbiAgICByZXR1cm4gbmV3IEFzeW5jUm91dGUoe1xuICAgICAgcGF0aDogY29uZmlnLnBhdGgsXG4gICAgICBsb2FkZXI6IHdyYXBwZWRMb2FkZXIsXG4gICAgICBuYW1lOiBjb25maWcubmFtZSxcbiAgICAgIGRhdGE6IGNvbmZpZy5kYXRhLFxuICAgICAgdXNlQXNEZWZhdWx0OiBjb25maWcudXNlQXNEZWZhdWx0XG4gICAgfSk7XG4gIH1cbiAgaWYgKGNvbmZpZy5hdXgpIHtcbiAgICByZXR1cm4gbmV3IEF1eFJvdXRlKHtwYXRoOiBjb25maWcuYXV4LCBjb21wb25lbnQ6PFR5cGU+Y29uZmlnLmNvbXBvbmVudCwgbmFtZTogY29uZmlnLm5hbWV9KTtcbiAgfVxuICBpZiAoY29uZmlnLmNvbXBvbmVudCkge1xuICAgIGlmICh0eXBlb2YgY29uZmlnLmNvbXBvbmVudCA9PSAnb2JqZWN0Jykge1xuICAgICAgbGV0IGNvbXBvbmVudERlZmluaXRpb25PYmplY3QgPSA8Q29tcG9uZW50RGVmaW5pdGlvbj5jb25maWcuY29tcG9uZW50O1xuICAgICAgaWYgKGNvbXBvbmVudERlZmluaXRpb25PYmplY3QudHlwZSA9PSAnY29uc3RydWN0b3InKSB7XG4gICAgICAgIHJldHVybiBuZXcgUm91dGUoe1xuICAgICAgICAgIHBhdGg6IGNvbmZpZy5wYXRoLFxuICAgICAgICAgIGNvbXBvbmVudDo8VHlwZT5jb21wb25lbnREZWZpbml0aW9uT2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgICAgIG5hbWU6IGNvbmZpZy5uYW1lLFxuICAgICAgICAgIGRhdGE6IGNvbmZpZy5kYXRhLFxuICAgICAgICAgIHVzZUFzRGVmYXVsdDogY29uZmlnLnVzZUFzRGVmYXVsdFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoY29tcG9uZW50RGVmaW5pdGlvbk9iamVjdC50eXBlID09ICdsb2FkZXInKSB7XG4gICAgICAgIHJldHVybiBuZXcgQXN5bmNSb3V0ZSh7XG4gICAgICAgICAgcGF0aDogY29uZmlnLnBhdGgsXG4gICAgICAgICAgbG9hZGVyOiBjb21wb25lbnREZWZpbml0aW9uT2JqZWN0LmxvYWRlcixcbiAgICAgICAgICBuYW1lOiBjb25maWcubmFtZSxcbiAgICAgICAgICBkYXRhOiBjb25maWcuZGF0YSxcbiAgICAgICAgICB1c2VBc0RlZmF1bHQ6IGNvbmZpZy51c2VBc0RlZmF1bHRcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcbiAgICAgICAgICAgIGBJbnZhbGlkIGNvbXBvbmVudCB0eXBlIFwiJHtjb21wb25lbnREZWZpbml0aW9uT2JqZWN0LnR5cGV9XCIuIFZhbGlkIHR5cGVzIGFyZSBcImNvbnN0cnVjdG9yXCIgYW5kIFwibG9hZGVyXCIuYCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXcgUm91dGUoPHtcbiAgICAgIHBhdGg6IHN0cmluZztcbiAgICAgIGNvbXBvbmVudDogVHlwZTtcbiAgICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgICBkYXRhPzoge1trZXk6IHN0cmluZ106IGFueX07XG4gICAgICB1c2VBc0RlZmF1bHQ/OiBib29sZWFuO1xuICAgIH0+Y29uZmlnKTtcbiAgfVxuXG4gIGlmIChjb25maWcucmVkaXJlY3RUbykge1xuICAgIHJldHVybiBuZXcgUmVkaXJlY3Qoe3BhdGg6IGNvbmZpZy5wYXRoLCByZWRpcmVjdFRvOiBjb25maWcucmVkaXJlY3RUb30pO1xuICB9XG5cbiAgcmV0dXJuIGNvbmZpZztcbn1cblxuXG5mdW5jdGlvbiB3cmFwTG9hZGVyVG9SZWNvbmZpZ3VyZVJlZ2lzdHJ5KGxvYWRlcjogRnVuY3Rpb24sIHJlZ2lzdHJ5OiBSb3V0ZVJlZ2lzdHJ5KTogKCkgPT5cbiAgICBQcm9taXNlPFR5cGU+IHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICByZXR1cm4gbG9hZGVyKCkudGhlbigoY29tcG9uZW50VHlwZSkgPT4ge1xuICAgICAgcmVnaXN0cnkuY29uZmlnRnJvbUNvbXBvbmVudChjb21wb25lbnRUeXBlKTtcbiAgICAgIHJldHVybiBjb21wb25lbnRUeXBlO1xuICAgIH0pO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0Q29tcG9uZW50RXhpc3RzKGNvbXBvbmVudDogVHlwZSwgcGF0aDogc3RyaW5nKTogdm9pZCB7XG4gIGlmICghaXNUeXBlKGNvbXBvbmVudCkpIHtcbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgQ29tcG9uZW50IGZvciByb3V0ZSBcIiR7cGF0aH1cIiBpcyBub3QgZGVmaW5lZCwgb3IgaXMgbm90IGEgY2xhc3MuYCk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
