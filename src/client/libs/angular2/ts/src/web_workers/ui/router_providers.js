System.register(['./platform_location', 'angular2/src/facade/lang', 'angular2/src/router/location/browser_platform_location', 'angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var platform_location_1, lang_1, browser_platform_location_1, core_1;
    var WORKER_RENDER_ROUTER;
    function initRouterListeners(injector) {
        return function () {
            var zone = injector.get(core_1.NgZone);
            zone.run(function () { return injector.get(platform_location_1.MessageBasedPlatformLocation).start(); });
        };
    }
    return {
        setters:[
            function (platform_location_1_1) {
                platform_location_1 = platform_location_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (browser_platform_location_1_1) {
                browser_platform_location_1 = browser_platform_location_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            exports_1("WORKER_RENDER_ROUTER", WORKER_RENDER_ROUTER = lang_1.CONST_EXPR([
                platform_location_1.MessageBasedPlatformLocation,
                browser_platform_location_1.BrowserPlatformLocation,
                lang_1.CONST_EXPR(new core_1.Provider(core_1.APP_INITIALIZER, { useFactory: initRouterListeners, multi: true, deps: lang_1.CONST_EXPR([core_1.Injector]) }))
            ]));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3dlYl93b3JrZXJzL3VpL3JvdXRlcl9wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQUthLG9CQUFvQjtJQVFqQyw2QkFBNkIsUUFBa0I7UUFDN0MsTUFBTSxDQUFDO1lBQ0wsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFNLENBQUMsQ0FBQztZQUVoQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxRQUFRLENBQUMsR0FBRyxDQUFDLGdEQUE0QixDQUFDLENBQUMsS0FBSyxFQUFFLEVBQWxELENBQWtELENBQUMsQ0FBQztRQUNyRSxDQUFDLENBQUM7SUFDSixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O1lBZFksa0NBQUEsb0JBQW9CLEdBQUcsaUJBQVUsQ0FBQztnQkFDN0MsZ0RBQTRCO2dCQUM1QixtREFBdUI7Z0JBQ3ZCLGlCQUFVLENBQ04sSUFBSSxlQUFRLENBQUMsc0JBQWUsRUFDZixFQUFDLFVBQVUsRUFBRSxtQkFBbUIsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxpQkFBVSxDQUFDLENBQUMsZUFBUSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7YUFDaEcsQ0FBQyxDQUFBLENBQUMiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvd2ViX3dvcmtlcnMvdWkvcm91dGVyX3Byb3ZpZGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TWVzc2FnZUJhc2VkUGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnLi9wbGF0Zm9ybV9sb2NhdGlvbic7XG5pbXBvcnQge0NPTlNUX0VYUFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jyb3dzZXJQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvcm91dGVyL2xvY2F0aW9uL2Jyb3dzZXJfcGxhdGZvcm1fbG9jYXRpb24nO1xuaW1wb3J0IHtBUFBfSU5JVElBTElaRVIsIFByb3ZpZGVyLCBJbmplY3RvciwgTmdab25lfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcblxuZXhwb3J0IGNvbnN0IFdPUktFUl9SRU5ERVJfUk9VVEVSID0gQ09OU1RfRVhQUihbXG4gIE1lc3NhZ2VCYXNlZFBsYXRmb3JtTG9jYXRpb24sXG4gIEJyb3dzZXJQbGF0Zm9ybUxvY2F0aW9uLFxuICBDT05TVF9FWFBSKFxuICAgICAgbmV3IFByb3ZpZGVyKEFQUF9JTklUSUFMSVpFUixcbiAgICAgICAgICAgICAgICAgICB7dXNlRmFjdG9yeTogaW5pdFJvdXRlckxpc3RlbmVycywgbXVsdGk6IHRydWUsIGRlcHM6IENPTlNUX0VYUFIoW0luamVjdG9yXSl9KSlcbl0pO1xuXG5mdW5jdGlvbiBpbml0Um91dGVyTGlzdGVuZXJzKGluamVjdG9yOiBJbmplY3Rvcik6ICgpID0+IHZvaWQge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGxldCB6b25lID0gaW5qZWN0b3IuZ2V0KE5nWm9uZSk7XG5cbiAgICB6b25lLnJ1bigoKSA9PiBpbmplY3Rvci5nZXQoTWVzc2FnZUJhc2VkUGxhdGZvcm1Mb2NhdGlvbikuc3RhcnQoKSk7XG4gIH07XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
