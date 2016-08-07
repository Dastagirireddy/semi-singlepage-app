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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9yb3V0ZV9jb25maWcvcm91dGVfY29uZmlnX25vcm1hbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQU9BOzs7Ozs7T0FNRztJQUNILDhCQUFxQyxNQUF1QixFQUN2QixRQUF1QjtRQUMxRCxFQUFFLENBQUMsQ0FBQyxNQUFNLFlBQVksbUNBQVUsQ0FBQyxDQUFDLENBQUM7WUFDakMsSUFBSSxhQUFhLEdBQUcsK0JBQStCLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM3RSxNQUFNLENBQUMsSUFBSSxtQ0FBVSxDQUFDO2dCQUNwQixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7Z0JBQ2pCLE1BQU0sRUFBRSxhQUFhO2dCQUNyQixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7Z0JBQ2pCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtnQkFDakIsWUFBWSxFQUFFLE1BQU0sQ0FBQyxZQUFZO2FBQ2xDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxNQUFNLFlBQVksOEJBQUssSUFBSSxNQUFNLFlBQVksaUNBQVEsSUFBSSxNQUFNLFlBQVksaUNBQVEsQ0FBQyxDQUFDLENBQUM7WUFDeEYsTUFBTSxDQUFrQixNQUFNLENBQUM7UUFDakMsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0UsTUFBTSxJQUFJLDBCQUFhLENBQ25CLGdHQUEwRixDQUFDLENBQUM7UUFDbEcsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FB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Q0FBQztRQUVELE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQTdFRCx1REE2RUMsQ0FBQTtJQUdELHlDQUF5QyxNQUFnQixFQUFFLFFBQXVCO1FBRWhGLE1BQU0sQ0FBQztZQUNMLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxhQUFhO2dCQUNqQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzVDLE1BQU0sQ0FBQyxhQUFhLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsK0JBQXNDLFNBQWUsRUFBRSxJQUFZO1FBQ2pFLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixNQUFNLElBQUksMEJBQWEsQ0FBQywyQkFBd0IsSUFBSSwwQ0FBc0MsQ0FBQyxDQUFDO1FBQzlGLENBQUM7SUFDSCxDQUFDO0lBSkQseURBSUMsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvcm91dGVfY29uZmlnL3JvdXRlX2NvbmZpZ19ub3JtYWxpemVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBc3luY1JvdXRlLCBBdXhSb3V0ZSwgUm91dGUsIFJlZGlyZWN0LCBSb3V0ZURlZmluaXRpb259IGZyb20gJy4vcm91dGVfY29uZmlnX2RlY29yYXRvcic7XG5pbXBvcnQge0NvbXBvbmVudERlZmluaXRpb259IGZyb20gJy4uL3JvdXRlX2RlZmluaXRpb24nO1xuaW1wb3J0IHtpc1R5cGUsIFR5cGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb24sIFdyYXBwZWRFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge1JvdXRlUmVnaXN0cnl9IGZyb20gJy4uL3JvdXRlX3JlZ2lzdHJ5JztcblxuXG4vKipcbiAqIEdpdmVuIGEgSlMgT2JqZWN0IHRoYXQgcmVwcmVzZW50cyBhIHJvdXRlIGNvbmZpZywgcmV0dXJucyBhIGNvcnJlc3BvbmRpbmcgUm91dGUsIEFzeW5jUm91dGUsXG4gKiBBdXhSb3V0ZSBvciBSZWRpcmVjdCBvYmplY3QuXG4gKlxuICogQWxzbyB3cmFwcyBhbiBBc3luY1JvdXRlJ3MgbG9hZGVyIGZ1bmN0aW9uIHRvIGFkZCB0aGUgbG9hZGVkIGNvbXBvbmVudCdzIHJvdXRlIGNvbmZpZyB0byB0aGVcbiAqIGBSb3V0ZVJlZ2lzdHJ5YC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZVJvdXRlQ29uZmlnKGNvbmZpZzogUm91dGVEZWZpbml0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2lzdHJ5OiBSb3V0ZVJlZ2lzdHJ5KTogUm91dGVEZWZpbml0aW9uIHtcbiAgaWYgKGNvbmZpZyBpbnN0YW5jZW9mIEFzeW5jUm91dGUpIHtcbiAgICB2YXIgd3JhcHBlZExvYWRlciA9IHdyYXBMb2FkZXJUb1JlY29uZmlndXJlUmVnaXN0cnkoY29uZmlnLmxvYWRlciwgcmVnaXN0cnkpO1xuICAgIHJldHVybiBuZXcgQXN5bmNSb3V0ZSh7XG4gICAgICBwYXRoOiBjb25maWcucGF0aCxcbiAgICAgIGxvYWRlcjogd3JhcHBlZExvYWRlcixcbiAgICAgIG5hbWU6IGNvbmZpZy5uYW1lLFxuICAgICAgZGF0YTogY29uZmlnLmRhdGEsXG4gICAgICB1c2VBc0RlZmF1bHQ6IGNvbmZpZy51c2VBc0RlZmF1bHRcbiAgICB9KTtcbiAgfVxuICBpZiAoY29uZmlnIGluc3RhbmNlb2YgUm91dGUgfHwgY29uZmlnIGluc3RhbmNlb2YgUmVkaXJlY3QgfHwgY29uZmlnIGluc3RhbmNlb2YgQXV4Um91dGUpIHtcbiAgICByZXR1cm4gPFJvdXRlRGVmaW5pdGlvbj5jb25maWc7XG4gIH1cblxuICBpZiAoKCshIWNvbmZpZy5jb21wb25lbnQpICsgKCshIWNvbmZpZy5yZWRpcmVjdFRvKSArICgrISFjb25maWcubG9hZGVyKSAhPSAxKSB7XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgIGBSb3V0ZSBjb25maWcgc2hvdWxkIGNvbnRhaW4gZXhhY3RseSBvbmUgXCJjb21wb25lbnRcIiwgXCJsb2FkZXJcIiwgb3IgXCJyZWRpcmVjdFRvXCIgcHJvcGVydHkuYCk7XG4gIH1cbiAgaWYgKGNvbmZpZy5hcyAmJiBjb25maWcubmFtZSkge1xuICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBSb3V0ZSBjb25maWcgc2hvdWxkIGNvbnRhaW4gZXhhY3RseSBvbmUgXCJhc1wiIG9yIFwibmFtZVwiIHByb3BlcnR5LmApO1xuICB9XG4gIGlmIChjb25maWcuYXMpIHtcbiAgICBjb25maWcubmFtZSA9IGNvbmZpZy5hcztcbiAgfVxuICBpZiAoY29uZmlnLmxvYWRlcikge1xuICAgIHZhciB3cmFwcGVkTG9hZGVyID0gd3JhcExvYWRlclRvUmVjb25maWd1cmVSZWdpc3RyeShjb25maWcubG9hZGVyLCByZWdpc3RyeSk7XG4gICAgcmV0dXJuIG5ldyBBc3luY1JvdXRlKHtcbiAgICAgIHBhdGg6IGNvbmZpZy5wYXRoLFxuICAgICAgbG9hZGVyOiB3cmFwcGVkTG9hZGVyLFxuICAgICAgbmFtZTogY29uZmlnLm5hbWUsXG4gICAgICBkYXRhOiBjb25maWcuZGF0YSxcbiAgICAgIHVzZUFzRGVmYXVsdDogY29uZmlnLnVzZUFzRGVmYXVsdFxuICAgIH0pO1xuICB9XG4gIGlmIChjb25maWcuYXV4KSB7XG4gICAgcmV0dXJuIG5ldyBBdXhSb3V0ZSh7cGF0aDogY29uZmlnLmF1eCwgY29tcG9uZW50OjxUeXBlPmNvbmZpZy5jb21wb25lbnQsIG5hbWU6IGNvbmZpZy5uYW1lfSk7XG4gIH1cbiAgaWYgKGNvbmZpZy5jb21wb25lbnQpIHtcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5jb21wb25lbnQgPT0gJ29iamVjdCcpIHtcbiAgICAgIGxldCBjb21wb25lbnREZWZpbml0aW9uT2JqZWN0ID0gPENvbXBvbmVudERlZmluaXRpb24+Y29uZmlnLmNvbXBvbmVudDtcbiAgICAgIGlmIChjb21wb25lbnREZWZpbml0aW9uT2JqZWN0LnR5cGUgPT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgICByZXR1cm4gbmV3IFJvdXRlKHtcbiAgICAgICAgICBwYXRoOiBjb25maWcucGF0aCxcbiAgICAgICAgICBjb21wb25lbnQ6PFR5cGU+Y29tcG9uZW50RGVmaW5pdGlvbk9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgICAgICBuYW1lOiBjb25maWcubmFtZSxcbiAgICAgICAgICBkYXRhOiBjb25maWcuZGF0YSxcbiAgICAgICAgICB1c2VBc0RlZmF1bHQ6IGNvbmZpZy51c2VBc0RlZmF1bHRcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKGNvbXBvbmVudERlZmluaXRpb25PYmplY3QudHlwZSA9PSAnbG9hZGVyJykge1xuICAgICAgICByZXR1cm4gbmV3IEFzeW5jUm91dGUoe1xuICAgICAgICAgIHBhdGg6IGNvbmZpZy5wYXRoLFxuICAgICAgICAgIGxvYWRlcjogY29tcG9uZW50RGVmaW5pdGlvbk9iamVjdC5sb2FkZXIsXG4gICAgICAgICAgbmFtZTogY29uZmlnLm5hbWUsXG4gICAgICAgICAgZGF0YTogY29uZmlnLmRhdGEsXG4gICAgICAgICAgdXNlQXNEZWZhdWx0OiBjb25maWcudXNlQXNEZWZhdWx0XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgICAgICBgSW52YWxpZCBjb21wb25lbnQgdHlwZSBcIiR7Y29tcG9uZW50RGVmaW5pdGlvbk9iamVjdC50eXBlfVwiLiBWYWxpZCB0eXBlcyBhcmUgXCJjb25zdHJ1Y3RvclwiIGFuZCBcImxvYWRlclwiLmApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3IFJvdXRlKDx7XG4gICAgICBwYXRoOiBzdHJpbmc7XG4gICAgICBjb21wb25lbnQ6IFR5cGU7XG4gICAgICBuYW1lPzogc3RyaW5nO1xuICAgICAgZGF0YT86IHtba2V5OiBzdHJpbmddOiBhbnl9O1xuICAgICAgdXNlQXNEZWZhdWx0PzogYm9vbGVhbjtcbiAgICB9PmNvbmZpZyk7XG4gIH1cblxuICBpZiAoY29uZmlnLnJlZGlyZWN0VG8pIHtcbiAgICByZXR1cm4gbmV3IFJlZGlyZWN0KHtwYXRoOiBjb25maWcucGF0aCwgcmVkaXJlY3RUbzogY29uZmlnLnJlZGlyZWN0VG99KTtcbiAgfVxuXG4gIHJldHVybiBjb25maWc7XG59XG5cblxuZnVuY3Rpb24gd3JhcExvYWRlclRvUmVjb25maWd1cmVSZWdpc3RyeShsb2FkZXI6IEZ1bmN0aW9uLCByZWdpc3RyeTogUm91dGVSZWdpc3RyeSk6ICgpID0+XG4gICAgUHJvbWlzZTxUeXBlPiB7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgcmV0dXJuIGxvYWRlcigpLnRoZW4oKGNvbXBvbmVudFR5cGUpID0+IHtcbiAgICAgIHJlZ2lzdHJ5LmNvbmZpZ0Zyb21Db21wb25lbnQoY29tcG9uZW50VHlwZSk7XG4gICAgICByZXR1cm4gY29tcG9uZW50VHlwZTtcbiAgICB9KTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydENvbXBvbmVudEV4aXN0cyhjb21wb25lbnQ6IFR5cGUsIHBhdGg6IHN0cmluZyk6IHZvaWQge1xuICBpZiAoIWlzVHlwZShjb21wb25lbnQpKSB7XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYENvbXBvbmVudCBmb3Igcm91dGUgXCIke3BhdGh9XCIgaXMgbm90IGRlZmluZWQsIG9yIGlzIG5vdCBhIGNsYXNzLmApO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
