System.register(['angular2/platform/common', 'angular2/src/router/router', 'angular2/src/router/route_registry', 'angular2/src/facade/lang', 'angular2/core', 'angular2/src/facade/exceptions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var common_1, router_1, route_registry_1, lang_1, core_1, exceptions_1;
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
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (route_registry_1_1) {
                route_registry_1 = route_registry_1_1;
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
                lang_1.CONST_EXPR(new core_1.Provider(common_1.LocationStrategy, { useClass: common_1.PathLocationStrategy })),
                common_1.Location,
                lang_1.CONST_EXPR(new core_1.Provider(router_1.Router, {
                    useFactory: routerFactory,
                    deps: lang_1.CONST_EXPR([route_registry_1.RouteRegistry, common_1.Location, route_registry_1.ROUTER_PRIMARY_COMPONENT, core_1.ApplicationRef])
                })),
                lang_1.CONST_EXPR(new core_1.Provider(route_registry_1.ROUTER_PRIMARY_COMPONENT, { useFactory: routerPrimaryComponentFactory, deps: lang_1.CONST_EXPR([core_1.ApplicationRef]) }))
            ]));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvcm91dGVyX3Byb3ZpZGVyc19jb21tb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQVVhLHVCQUF1QjtJQWVwQyx1QkFBdUIsUUFBdUIsRUFBRSxRQUFrQixFQUFFLGdCQUFzQixFQUNuRSxNQUFzQjtRQUMzQyxJQUFJLFVBQVUsR0FBRyxJQUFJLG1CQUFVLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3RFLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxjQUFNLE9BQUEsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFwQixDQUFvQixDQUFDLENBQUM7UUFDM0QsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUNwQixDQUFDO0lBRUQsdUNBQXVDLEdBQW1CO1FBQ3hELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsTUFBTSxJQUFJLDBCQUFhLENBQUMsMkRBQTJELENBQUMsQ0FBQztRQUN2RixDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQTlCRDs7ZUFFRztZQUNVLHFDQUFBLHVCQUF1QixHQUFVLGlCQUFVLENBQUM7Z0JBQ3ZELDhCQUFhO2dCQUNiLGlCQUFVLENBQUMsSUFBSSxlQUFRLENBQUMseUJBQWdCLEVBQUUsRUFBQyxRQUFRLEVBQUUsNkJBQW9CLEVBQUMsQ0FBQyxDQUFDO2dCQUM1RSxpQkFBUTtnQkFDUixpQkFBVSxDQUFDLElBQUksZUFBUSxDQUNuQixlQUFNLEVBQ047b0JBQ0UsVUFBVSxFQUFFLGFBQWE7b0JBQ3pCLElBQUksRUFBRSxpQkFBVSxDQUFDLENBQUMsOEJBQWEsRUFBRSxpQkFBUSxFQUFFLHlDQUF3QixFQUFFLHFCQUFjLENBQUMsQ0FBQztpQkFDdEYsQ0FBQyxDQUFDO2dCQUNQLGlCQUFVLENBQUMsSUFBSSxlQUFRLENBQ25CLHlDQUF3QixFQUN4QixFQUFDLFVBQVUsRUFBRSw2QkFBNkIsRUFBRSxJQUFJLEVBQUUsaUJBQVUsQ0FBQyxDQUFDLHFCQUFjLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQzthQUN0RixDQUFDLENBQUEsQ0FBQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvcm91dGVyL3JvdXRlcl9wcm92aWRlcnNfY29tbW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtMb2NhdGlvblN0cmF0ZWd5LCBQYXRoTG9jYXRpb25TdHJhdGVneSwgTG9jYXRpb259IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2NvbW1vbic7XG5pbXBvcnQge1JvdXRlciwgUm9vdFJvdXRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL3JvdXRlci9yb3V0ZXInO1xuaW1wb3J0IHtSb3V0ZVJlZ2lzdHJ5LCBST1VURVJfUFJJTUFSWV9DT01QT05FTlR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9yb3V0ZXIvcm91dGVfcmVnaXN0cnknO1xuaW1wb3J0IHtDT05TVF9FWFBSLCBUeXBlfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtBcHBsaWNhdGlvblJlZiwgT3BhcXVlVG9rZW4sIFByb3ZpZGVyfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcblxuLyoqXG4gKiBUaGUgUGxhdGZvcm0gYWdub3N0aWMgUk9VVEVSIFBST1ZJREVSU1xuICovXG5leHBvcnQgY29uc3QgUk9VVEVSX1BST1ZJREVSU19DT01NT046IGFueVtdID0gQ09OU1RfRVhQUihbXG4gIFJvdXRlUmVnaXN0cnksXG4gIENPTlNUX0VYUFIobmV3IFByb3ZpZGVyKExvY2F0aW9uU3RyYXRlZ3ksIHt1c2VDbGFzczogUGF0aExvY2F0aW9uU3RyYXRlZ3l9KSksXG4gIExvY2F0aW9uLFxuICBDT05TVF9FWFBSKG5ldyBQcm92aWRlcihcbiAgICAgIFJvdXRlcixcbiAgICAgIHtcbiAgICAgICAgdXNlRmFjdG9yeTogcm91dGVyRmFjdG9yeSxcbiAgICAgICAgZGVwczogQ09OU1RfRVhQUihbUm91dGVSZWdpc3RyeSwgTG9jYXRpb24sIFJPVVRFUl9QUklNQVJZX0NPTVBPTkVOVCwgQXBwbGljYXRpb25SZWZdKVxuICAgICAgfSkpLFxuICBDT05TVF9FWFBSKG5ldyBQcm92aWRlcihcbiAgICAgIFJPVVRFUl9QUklNQVJZX0NPTVBPTkVOVCxcbiAgICAgIHt1c2VGYWN0b3J5OiByb3V0ZXJQcmltYXJ5Q29tcG9uZW50RmFjdG9yeSwgZGVwczogQ09OU1RfRVhQUihbQXBwbGljYXRpb25SZWZdKX0pKVxuXSk7XG5cbmZ1bmN0aW9uIHJvdXRlckZhY3RvcnkocmVnaXN0cnk6IFJvdXRlUmVnaXN0cnksIGxvY2F0aW9uOiBMb2NhdGlvbiwgcHJpbWFyeUNvbXBvbmVudDogVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgYXBwUmVmOiBBcHBsaWNhdGlvblJlZik6IFJvb3RSb3V0ZXIge1xuICB2YXIgcm9vdFJvdXRlciA9IG5ldyBSb290Um91dGVyKHJlZ2lzdHJ5LCBsb2NhdGlvbiwgcHJpbWFyeUNvbXBvbmVudCk7XG4gIGFwcFJlZi5yZWdpc3RlckRpc3Bvc2VMaXN0ZW5lcigoKSA9PiByb290Um91dGVyLmRpc3Bvc2UoKSk7XG4gIHJldHVybiByb290Um91dGVyO1xufVxuXG5mdW5jdGlvbiByb3V0ZXJQcmltYXJ5Q29tcG9uZW50RmFjdG9yeShhcHA6IEFwcGxpY2F0aW9uUmVmKTogVHlwZSB7XG4gIGlmIChhcHAuY29tcG9uZW50VHlwZXMubGVuZ3RoID09IDApIHtcbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcIkJvb3RzdHJhcCBhdCBsZWFzdCBvbmUgY29tcG9uZW50IGJlZm9yZSBpbmplY3RpbmcgUm91dGVyLlwiKTtcbiAgfVxuICByZXR1cm4gYXBwLmNvbXBvbmVudFR5cGVzWzBdO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
