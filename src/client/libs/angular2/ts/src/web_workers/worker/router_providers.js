System.register(['angular2/core', 'angular2/src/router/location/platform_location', './platform_location', 'angular2/src/router/router_providers_common'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, platform_location_1, platform_location_2, router_providers_common_1;
    var WORKER_APP_ROUTER;
    function initRouter(platformLocation, zone) {
        return zone.run(function () { return platformLocation.init(); });
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_location_1_1) {
                platform_location_1 = platform_location_1_1;
            },
            function (platform_location_2_1) {
                platform_location_2 = platform_location_2_1;
            },
            function (router_providers_common_1_1) {
                router_providers_common_1 = router_providers_common_1_1;
            }],
        execute: function() {
            exports_1("WORKER_APP_ROUTER", WORKER_APP_ROUTER = [
                router_providers_common_1.ROUTER_PROVIDERS_COMMON,
                new core_1.Provider(platform_location_1.PlatformLocation, { useClass: platform_location_2.WebWorkerPlatformLocation }),
                new core_1.Provider(core_1.APP_INITIALIZER, {
                    useFactory: function (platformLocation, zone) { return function () {
                        return initRouter(platformLocation, zone);
                    }; },
                    multi: true,
                    deps: [platform_location_1.PlatformLocation, core_1.NgZone]
                })
            ]);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3dlYl93b3JrZXJzL3dvcmtlci9yb3V0ZXJfcHJvdmlkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFLVyxpQkFBaUI7SUFZNUIsb0JBQW9CLGdCQUEyQyxFQUFFLElBQVk7UUFDM0UsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBUSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O1lBZFUsK0JBQUEsaUJBQWlCLEdBQUc7Z0JBQzdCLGlEQUF1QjtnQkFDdkIsSUFBSSxlQUFRLENBQUMsb0NBQWdCLEVBQUUsRUFBQyxRQUFRLEVBQUUsNkNBQXlCLEVBQUMsQ0FBQztnQkFDckUsSUFBSSxlQUFRLENBQUMsc0JBQWUsRUFDZjtvQkFDRSxVQUFVLEVBQUUsVUFBQyxnQkFBMkMsRUFBRSxJQUFZLElBQUssT0FBQTt3QkFDM0QsT0FBQSxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDO29CQUFsQyxDQUFrQyxFQUR5QixDQUN6QjtvQkFDbEQsS0FBSyxFQUFFLElBQUk7b0JBQ1gsSUFBSSxFQUFFLENBQUMsb0NBQWdCLEVBQUUsYUFBTSxDQUFDO2lCQUNqQyxDQUFDO2FBQ2hCLENBQUEsQ0FBQyIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy93ZWJfd29ya2Vycy93b3JrZXIvcm91dGVyX3Byb3ZpZGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXBwbGljYXRpb25SZWYsIFByb3ZpZGVyLCBOZ1pvbmUsIEFQUF9JTklUSUFMSVpFUn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1BsYXRmb3JtTG9jYXRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9yb3V0ZXIvbG9jYXRpb24vcGxhdGZvcm1fbG9jYXRpb24nO1xuaW1wb3J0IHtXZWJXb3JrZXJQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICcuL3BsYXRmb3JtX2xvY2F0aW9uJztcbmltcG9ydCB7Uk9VVEVSX1BST1ZJREVSU19DT01NT059IGZyb20gJ2FuZ3VsYXIyL3NyYy9yb3V0ZXIvcm91dGVyX3Byb3ZpZGVyc19jb21tb24nO1xuXG5leHBvcnQgdmFyIFdPUktFUl9BUFBfUk9VVEVSID0gW1xuICBST1VURVJfUFJPVklERVJTX0NPTU1PTixcbiAgbmV3IFByb3ZpZGVyKFBsYXRmb3JtTG9jYXRpb24sIHt1c2VDbGFzczogV2ViV29ya2VyUGxhdGZvcm1Mb2NhdGlvbn0pLFxuICBuZXcgUHJvdmlkZXIoQVBQX0lOSVRJQUxJWkVSLFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICB1c2VGYWN0b3J5OiAocGxhdGZvcm1Mb2NhdGlvbjogV2ViV29ya2VyUGxhdGZvcm1Mb2NhdGlvbiwgem9uZTogTmdab25lKSA9PiAoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdFJvdXRlcihwbGF0Zm9ybUxvY2F0aW9uLCB6b25lKSxcbiAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgICAgICAgICAgIGRlcHM6IFtQbGF0Zm9ybUxvY2F0aW9uLCBOZ1pvbmVdXG4gICAgICAgICAgICAgICB9KVxuXTtcblxuZnVuY3Rpb24gaW5pdFJvdXRlcihwbGF0Zm9ybUxvY2F0aW9uOiBXZWJXb3JrZXJQbGF0Zm9ybUxvY2F0aW9uLCB6b25lOiBOZ1pvbmUpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgcmV0dXJuIHpvbmUucnVuKCgpID0+IHsgcmV0dXJuIHBsYXRmb3JtTG9jYXRpb24uaW5pdCgpOyB9KTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
