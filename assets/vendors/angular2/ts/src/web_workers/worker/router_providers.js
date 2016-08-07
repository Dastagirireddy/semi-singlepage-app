System.register(['angular2/core', 'angular2/platform/common', './platform_location', 'angular2/src/router/router_providers_common'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, common_1, platform_location_1, router_providers_common_1;
    var WORKER_APP_ROUTER;
    function initRouter(platformLocation, zone) {
        return zone.runGuarded(function () { return platformLocation.init(); });
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (platform_location_1_1) {
                platform_location_1 = platform_location_1_1;
            },
            function (router_providers_common_1_1) {
                router_providers_common_1 = router_providers_common_1_1;
            }],
        execute: function() {
            exports_1("WORKER_APP_ROUTER", WORKER_APP_ROUTER = [
                router_providers_common_1.ROUTER_PROVIDERS_COMMON,
                new core_1.Provider(common_1.PlatformLocation, { useClass: platform_location_1.WebWorkerPlatformLocation }),
                new core_1.Provider(core_1.APP_INITIALIZER, {
                    useFactory: function (platformLocation, zone) { return function () {
                        return initRouter(platformLocation, zone);
                    }; },
                    multi: true,
                    deps: [common_1.PlatformLocation, core_1.NgZone]
                })
            ]);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy93ZWJfd29ya2Vycy93b3JrZXIvcm91dGVyX3Byb3ZpZGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBS1csaUJBQWlCO0lBWTVCLG9CQUFvQixnQkFBMkMsRUFBRSxJQUFZO1FBQzNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQVEsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztZQWRVLCtCQUFBLGlCQUFpQixHQUFHO2dCQUM3QixpREFBdUI7Z0JBQ3ZCLElBQUksZUFBUSxDQUFDLHlCQUFnQixFQUFFLEVBQUMsUUFBUSxFQUFFLDZDQUF5QixFQUFDLENBQUM7Z0JBQ3JFLElBQUksZUFBUSxDQUFDLHNCQUFlLEVBQ2Y7b0JBQ0UsVUFBVSxFQUFFLFVBQUMsZ0JBQTJDLEVBQUUsSUFBWSxJQUFLLE9BQUE7d0JBQzNELE9BQUEsVUFBVSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQztvQkFBbEMsQ0FBa0MsRUFEeUIsQ0FDekI7b0JBQ2xELEtBQUssRUFBRSxJQUFJO29CQUNYLElBQUksRUFBRSxDQUFDLHlCQUFnQixFQUFFLGFBQU0sQ0FBQztpQkFDakMsQ0FBQzthQUNoQixDQUFBLENBQUMiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL3dlYl93b3JrZXJzL3dvcmtlci9yb3V0ZXJfcHJvdmlkZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBcHBsaWNhdGlvblJlZiwgUHJvdmlkZXIsIE5nWm9uZSwgQVBQX0lOSVRJQUxJWkVSfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7UGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vY29tbW9uJztcbmltcG9ydCB7V2ViV29ya2VyUGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnLi9wbGF0Zm9ybV9sb2NhdGlvbic7XG5pbXBvcnQge1JPVVRFUl9QUk9WSURFUlNfQ09NTU9OfSBmcm9tICdhbmd1bGFyMi9zcmMvcm91dGVyL3JvdXRlcl9wcm92aWRlcnNfY29tbW9uJztcblxuZXhwb3J0IHZhciBXT1JLRVJfQVBQX1JPVVRFUiA9IFtcbiAgUk9VVEVSX1BST1ZJREVSU19DT01NT04sXG4gIG5ldyBQcm92aWRlcihQbGF0Zm9ybUxvY2F0aW9uLCB7dXNlQ2xhc3M6IFdlYldvcmtlclBsYXRmb3JtTG9jYXRpb259KSxcbiAgbmV3IFByb3ZpZGVyKEFQUF9JTklUSUFMSVpFUixcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgdXNlRmFjdG9yeTogKHBsYXRmb3JtTG9jYXRpb246IFdlYldvcmtlclBsYXRmb3JtTG9jYXRpb24sIHpvbmU6IE5nWm9uZSkgPT4gKCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRSb3V0ZXIocGxhdGZvcm1Mb2NhdGlvbiwgem9uZSksXG4gICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgICAgICAgICBkZXBzOiBbUGxhdGZvcm1Mb2NhdGlvbiwgTmdab25lXVxuICAgICAgICAgICAgICAgfSlcbl07XG5cbmZ1bmN0aW9uIGluaXRSb3V0ZXIocGxhdGZvcm1Mb2NhdGlvbjogV2ViV29ya2VyUGxhdGZvcm1Mb2NhdGlvbiwgem9uZTogTmdab25lKTogUHJvbWlzZTxib29sZWFuPiB7XG4gIHJldHVybiB6b25lLnJ1bkd1YXJkZWQoKCkgPT4geyByZXR1cm4gcGxhdGZvcm1Mb2NhdGlvbi5pbml0KCk7IH0pO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
