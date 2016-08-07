System.register(['angular2/src/router/location/location_strategy', 'angular2/src/router/location/path_location_strategy', 'angular2/src/router/router', 'angular2/src/router/route_registry', 'angular2/src/router/location/location', 'angular2/src/facade/lang', 'angular2/core', 'angular2/src/facade/exceptions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var location_strategy_1, path_location_strategy_1, router_1, route_registry_1, location_1, lang_1, core_1, exceptions_1;
    var ROUTER_PROVIDERS_COMMON;
    function routerFactory(registry, location, primaryComponent, appRef) {
        var rootRouter = new router_1.RootRouter(registry, location, primaryComponent);
        appRef.registerDisposeListener(function () { return rootRouter.dispose(); });
        return rootRouter;
    }
    function routerPrimaryComponentFactory(app) {
        if (app.componentTypes.length == 0) {
            throw new exceptions_1.BaseException("Bootstrap at least one component before injecting Router.");
        }
        return app.componentTypes[0];
    }
    return {
        setters:[
            function (location_strategy_1_1) {
                location_strategy_1 = location_strategy_1_1;
            },
            function (path_location_strategy_1_1) {
                path_location_strategy_1 = path_location_strategy_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (route_registry_1_1) {
                route_registry_1 = route_registry_1_1;
            },
            function (location_1_1) {
                location_1 = location_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
            /**
             * The Platform agnostic ROUTER PROVIDERS
             */
            exports_1("ROUTER_PROVIDERS_COMMON", ROUTER_PROVIDERS_COMMON = lang_1.CONST_EXPR([
                route_registry_1.RouteRegistry,
                lang_1.CONST_EXPR(new core_1.Provider(location_strategy_1.LocationStrategy, { useClass: path_location_strategy_1.PathLocationStrategy })),
                location_1.Location,
                lang_1.CONST_EXPR(new core_1.Provider(router_1.Router, {
                    useFactory: routerFactory,
                    deps: lang_1.CONST_EXPR([route_registry_1.RouteRegistry, location_1.Location, route_registry_1.ROUTER_PRIMARY_COMPONENT, core_1.ApplicationRef])
                })),
                lang_1.CONST_EXPR(new core_1.Provider(route_registry_1.ROUTER_PRIMARY_COMPONENT, { useFactory: routerPrimaryComponentFactory, deps: lang_1.CONST_EXPR([core_1.ApplicationRef]) }))
            ]));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9yb3V0ZXJfcHJvdmlkZXJzX2NvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBWWEsdUJBQXVCO0lBZXBDLHVCQUF1QixRQUF1QixFQUFFLFFBQWtCLEVBQUUsZ0JBQXNCLEVBQ25FLE1BQXNCO1FBQzNDLElBQUksVUFBVSxHQUFHLElBQUksbUJBQVUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDdEUsTUFBTSxDQUFDLHVCQUF1QixDQUFDLGNBQU0sT0FBQSxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQXBCLENBQW9CLENBQUMsQ0FBQztRQUMzRCxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFFRCx1Q0FBdUMsR0FBbUI7UUFDeEQsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxNQUFNLElBQUksMEJBQWEsQ0FBQywyREFBMkQsQ0FBQyxDQUFDO1FBQ3ZGLENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBOUJEOztlQUVHO1lBQ1UscUNBQUEsdUJBQXVCLEdBQVUsaUJBQVUsQ0FBQztnQkFDdkQsOEJBQWE7Z0JBQ2IsaUJBQVUsQ0FBQyxJQUFJLGVBQVEsQ0FBQyxvQ0FBZ0IsRUFBRSxFQUFDLFFBQVEsRUFBRSw2Q0FBb0IsRUFBQyxDQUFDLENBQUM7Z0JBQzVFLG1CQUFRO2dCQUNSLGlCQUFVLENBQUMsSUFBSSxlQUFRLENBQ25CLGVBQU0sRUFDTjtvQkFDRSxVQUFVLEVBQUUsYUFBYTtvQkFDekIsSUFBSSxFQUFFLGlCQUFVLENBQUMsQ0FBQyw4QkFBYSxFQUFFLG1CQUFRLEVBQUUseUNBQXdCLEVBQUUscUJBQWMsQ0FBQyxDQUFDO2lCQUN0RixDQUFDLENBQUM7Z0JBQ1AsaUJBQVUsQ0FBQyxJQUFJLGVBQVEsQ0FDbkIseUNBQXdCLEVBQ3hCLEVBQUMsVUFBVSxFQUFFLDZCQUE2QixFQUFFLElBQUksRUFBRSxpQkFBVSxDQUFDLENBQUMscUJBQWMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO2FBQ3RGLENBQUMsQ0FBQSxDQUFDIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9yb3V0ZXJfcHJvdmlkZXJzX2NvbW1vbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TG9jYXRpb25TdHJhdGVneX0gZnJvbSAnYW5ndWxhcjIvc3JjL3JvdXRlci9sb2NhdGlvbi9sb2NhdGlvbl9zdHJhdGVneSc7XG5pbXBvcnQge1BhdGhMb2NhdGlvblN0cmF0ZWd5fSBmcm9tICdhbmd1bGFyMi9zcmMvcm91dGVyL2xvY2F0aW9uL3BhdGhfbG9jYXRpb25fc3RyYXRlZ3knO1xuaW1wb3J0IHtSb3V0ZXIsIFJvb3RSb3V0ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9yb3V0ZXIvcm91dGVyJztcbmltcG9ydCB7Um91dGVSZWdpc3RyeSwgUk9VVEVSX1BSSU1BUllfQ09NUE9ORU5UfSBmcm9tICdhbmd1bGFyMi9zcmMvcm91dGVyL3JvdXRlX3JlZ2lzdHJ5JztcbmltcG9ydCB7TG9jYXRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9yb3V0ZXIvbG9jYXRpb24vbG9jYXRpb24nO1xuaW1wb3J0IHtDT05TVF9FWFBSLCBUeXBlfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtBcHBsaWNhdGlvblJlZiwgT3BhcXVlVG9rZW4sIFByb3ZpZGVyfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcblxuLyoqXG4gKiBUaGUgUGxhdGZvcm0gYWdub3N0aWMgUk9VVEVSIFBST1ZJREVSU1xuICovXG5leHBvcnQgY29uc3QgUk9VVEVSX1BST1ZJREVSU19DT01NT046IGFueVtdID0gQ09OU1RfRVhQUihbXG4gIFJvdXRlUmVnaXN0cnksXG4gIENPTlNUX0VYUFIobmV3IFByb3ZpZGVyKExvY2F0aW9uU3RyYXRlZ3ksIHt1c2VDbGFzczogUGF0aExvY2F0aW9uU3RyYXRlZ3l9KSksXG4gIExvY2F0aW9uLFxuICBDT05TVF9FWFBSKG5ldyBQcm92aWRlcihcbiAgICAgIFJvdXRlcixcbiAgICAgIHtcbiAgICAgICAgdXNlRmFjdG9yeTogcm91dGVyRmFjdG9yeSxcbiAgICAgICAgZGVwczogQ09OU1RfRVhQUihbUm91dGVSZWdpc3RyeSwgTG9jYXRpb24sIFJPVVRFUl9QUklNQVJZX0NPTVBPTkVOVCwgQXBwbGljYXRpb25SZWZdKVxuICAgICAgfSkpLFxuICBDT05TVF9FWFBSKG5ldyBQcm92aWRlcihcbiAgICAgIFJPVVRFUl9QUklNQVJZX0NPTVBPTkVOVCxcbiAgICAgIHt1c2VGYWN0b3J5OiByb3V0ZXJQcmltYXJ5Q29tcG9uZW50RmFjdG9yeSwgZGVwczogQ09OU1RfRVhQUihbQXBwbGljYXRpb25SZWZdKX0pKVxuXSk7XG5cbmZ1bmN0aW9uIHJvdXRlckZhY3RvcnkocmVnaXN0cnk6IFJvdXRlUmVnaXN0cnksIGxvY2F0aW9uOiBMb2NhdGlvbiwgcHJpbWFyeUNvbXBvbmVudDogVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgYXBwUmVmOiBBcHBsaWNhdGlvblJlZik6IFJvb3RSb3V0ZXIge1xuICB2YXIgcm9vdFJvdXRlciA9IG5ldyBSb290Um91dGVyKHJlZ2lzdHJ5LCBsb2NhdGlvbiwgcHJpbWFyeUNvbXBvbmVudCk7XG4gIGFwcFJlZi5yZWdpc3RlckRpc3Bvc2VMaXN0ZW5lcigoKSA9PiByb290Um91dGVyLmRpc3Bvc2UoKSk7XG4gIHJldHVybiByb290Um91dGVyO1xufVxuXG5mdW5jdGlvbiByb3V0ZXJQcmltYXJ5Q29tcG9uZW50RmFjdG9yeShhcHA6IEFwcGxpY2F0aW9uUmVmKTogVHlwZSB7XG4gIGlmIChhcHAuY29tcG9uZW50VHlwZXMubGVuZ3RoID09IDApIHtcbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcIkJvb3RzdHJhcCBhdCBsZWFzdCBvbmUgY29tcG9uZW50IGJlZm9yZSBpbmplY3RpbmcgUm91dGVyLlwiKTtcbiAgfVxuICByZXR1cm4gYXBwLmNvbXBvbmVudFR5cGVzWzBdO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
