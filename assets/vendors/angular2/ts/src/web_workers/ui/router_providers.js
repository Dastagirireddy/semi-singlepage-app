System.register(['./platform_location', 'angular2/src/facade/lang', 'angular2/src/platform/browser/location/browser_platform_location', 'angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var platform_location_1, lang_1, browser_platform_location_1, core_1;
    var WORKER_RENDER_ROUTER;
    function initRouterListeners(injector) {
        return function () {
            var zone = injector.get(core_1.NgZone);
            zone.runGuarded(function () { return injector.get(platform_location_1.MessageBasedPlatformLocation).start(); });
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy93ZWJfd29ya2Vycy91aS9yb3V0ZXJfcHJvdmlkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFPYSxvQkFBb0I7SUFRakMsNkJBQTZCLFFBQWtCO1FBQzdDLE1BQU0sQ0FBQztZQUNMLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsYUFBTSxDQUFDLENBQUM7WUFFaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnREFBNEIsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFsRCxDQUFrRCxDQUFDLENBQUM7UUFDNUUsQ0FBQyxDQUFDO0lBQ0osQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztZQWRZLGtDQUFBLG9CQUFvQixHQUFHLGlCQUFVLENBQUM7Z0JBQzdDLGdEQUE0QjtnQkFDNUIsbURBQXVCO2dCQUN2QixpQkFBVSxDQUNOLElBQUksZUFBUSxDQUFDLHNCQUFlLEVBQ2YsRUFBQyxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsaUJBQVUsQ0FBQyxDQUFDLGVBQVEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO2FBQ2hHLENBQUMsQ0FBQSxDQUFDIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy93ZWJfd29ya2Vycy91aS9yb3V0ZXJfcHJvdmlkZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNZXNzYWdlQmFzZWRQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICcuL3BsYXRmb3JtX2xvY2F0aW9uJztcbmltcG9ydCB7Q09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7XG4gIEJyb3dzZXJQbGF0Zm9ybUxvY2F0aW9uXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9icm93c2VyL2xvY2F0aW9uL2Jyb3dzZXJfcGxhdGZvcm1fbG9jYXRpb24nO1xuaW1wb3J0IHtBUFBfSU5JVElBTElaRVIsIFByb3ZpZGVyLCBJbmplY3RvciwgTmdab25lfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcblxuZXhwb3J0IGNvbnN0IFdPUktFUl9SRU5ERVJfUk9VVEVSID0gQ09OU1RfRVhQUihbXG4gIE1lc3NhZ2VCYXNlZFBsYXRmb3JtTG9jYXRpb24sXG4gIEJyb3dzZXJQbGF0Zm9ybUxvY2F0aW9uLFxuICBDT05TVF9FWFBSKFxuICAgICAgbmV3IFByb3ZpZGVyKEFQUF9JTklUSUFMSVpFUixcbiAgICAgICAgICAgICAgICAgICB7dXNlRmFjdG9yeTogaW5pdFJvdXRlckxpc3RlbmVycywgbXVsdGk6IHRydWUsIGRlcHM6IENPTlNUX0VYUFIoW0luamVjdG9yXSl9KSlcbl0pO1xuXG5mdW5jdGlvbiBpbml0Um91dGVyTGlzdGVuZXJzKGluamVjdG9yOiBJbmplY3Rvcik6ICgpID0+IHZvaWQge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGxldCB6b25lID0gaW5qZWN0b3IuZ2V0KE5nWm9uZSk7XG5cbiAgICB6b25lLnJ1bkd1YXJkZWQoKCkgPT4gaW5qZWN0b3IuZ2V0KE1lc3NhZ2VCYXNlZFBsYXRmb3JtTG9jYXRpb24pLnN0YXJ0KCkpO1xuICB9O1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
