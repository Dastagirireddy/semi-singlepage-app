System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var NG2_APP_VIEW_MANAGER, NG2_COMPILER, NG2_INJECTOR, NG2_HOST_VIEW_FACTORY_REF_MAP, NG2_ZONE, NG1_CONTROLLER, NG1_SCOPE, NG1_ROOT_SCOPE, NG1_COMPILE, NG1_HTTP_BACKEND, NG1_INJECTOR, NG1_PARSE, NG1_TEMPLATE_CACHE, NG1_TESTABILITY, REQUIRE_INJECTOR;
    return {
        setters:[],
        execute: function() {
            exports_1("NG2_APP_VIEW_MANAGER", NG2_APP_VIEW_MANAGER = 'ng2.AppViewManager');
            exports_1("NG2_COMPILER", NG2_COMPILER = 'ng2.Compiler');
            exports_1("NG2_INJECTOR", NG2_INJECTOR = 'ng2.Injector');
            exports_1("NG2_HOST_VIEW_FACTORY_REF_MAP", NG2_HOST_VIEW_FACTORY_REF_MAP = 'ng2.HostViewFactoryRefMap');
            exports_1("NG2_ZONE", NG2_ZONE = 'ng2.NgZone');
            exports_1("NG1_CONTROLLER", NG1_CONTROLLER = '$controller');
            exports_1("NG1_SCOPE", NG1_SCOPE = '$scope');
            exports_1("NG1_ROOT_SCOPE", NG1_ROOT_SCOPE = '$rootScope');
            exports_1("NG1_COMPILE", NG1_COMPILE = '$compile');
            exports_1("NG1_HTTP_BACKEND", NG1_HTTP_BACKEND = '$httpBackend');
            exports_1("NG1_INJECTOR", NG1_INJECTOR = '$injector');
            exports_1("NG1_PARSE", NG1_PARSE = '$parse');
            exports_1("NG1_TEMPLATE_CACHE", NG1_TEMPLATE_CACHE = '$templateCache');
            exports_1("NG1_TESTABILITY", NG1_TESTABILITY = '$$testability');
            exports_1("REQUIRE_INJECTOR", REQUIRE_INJECTOR = '^' + NG2_INJECTOR);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3VwZ3JhZGUvY29uc3RhbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztRQUFhLG9CQUFvQixFQUNwQixZQUFZLEVBQ1osWUFBWSxFQUNaLDZCQUE2QixFQUM3QixRQUFRLEVBRVIsY0FBYyxFQUNkLFNBQVMsRUFDVCxjQUFjLEVBQ2QsV0FBVyxFQUNYLGdCQUFnQixFQUNoQixZQUFZLEVBQ1osU0FBUyxFQUNULGtCQUFrQixFQUNsQixlQUFlLEVBQ2YsZ0JBQWdCOzs7O1lBZmhCLGtDQUFBLG9CQUFvQixHQUFHLG9CQUFvQixDQUFBLENBQUM7WUFDNUMsMEJBQUEsWUFBWSxHQUFHLGNBQWMsQ0FBQSxDQUFDO1lBQzlCLDBCQUFBLFlBQVksR0FBRyxjQUFjLENBQUEsQ0FBQztZQUM5QiwyQ0FBQSw2QkFBNkIsR0FBRywyQkFBMkIsQ0FBQSxDQUFDO1lBQzVELHNCQUFBLFFBQVEsR0FBRyxZQUFZLENBQUEsQ0FBQztZQUV4Qiw0QkFBQSxjQUFjLEdBQUcsYUFBYSxDQUFBLENBQUM7WUFDL0IsdUJBQUEsU0FBUyxHQUFHLFFBQVEsQ0FBQSxDQUFDO1lBQ3JCLDRCQUFBLGNBQWMsR0FBRyxZQUFZLENBQUEsQ0FBQztZQUM5Qix5QkFBQSxXQUFXLEdBQUcsVUFBVSxDQUFBLENBQUM7WUFDekIsOEJBQUEsZ0JBQWdCLEdBQUcsY0FBYyxDQUFBLENBQUM7WUFDbEMsMEJBQUEsWUFBWSxHQUFHLFdBQVcsQ0FBQSxDQUFDO1lBQzNCLHVCQUFBLFNBQVMsR0FBRyxRQUFRLENBQUEsQ0FBQztZQUNyQixnQ0FBQSxrQkFBa0IsR0FBRyxnQkFBZ0IsQ0FBQSxDQUFDO1lBQ3RDLDZCQUFBLGVBQWUsR0FBRyxlQUFlLENBQUEsQ0FBQztZQUNsQyw4QkFBQSxnQkFBZ0IsR0FBRyxHQUFHLEdBQUcsWUFBWSxDQUFBLENBQUMiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvdXBncmFkZS9jb25zdGFudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgTkcyX0FQUF9WSUVXX01BTkFHRVIgPSAnbmcyLkFwcFZpZXdNYW5hZ2VyJztcbmV4cG9ydCBjb25zdCBORzJfQ09NUElMRVIgPSAnbmcyLkNvbXBpbGVyJztcbmV4cG9ydCBjb25zdCBORzJfSU5KRUNUT1IgPSAnbmcyLkluamVjdG9yJztcbmV4cG9ydCBjb25zdCBORzJfSE9TVF9WSUVXX0ZBQ1RPUllfUkVGX01BUCA9ICduZzIuSG9zdFZpZXdGYWN0b3J5UmVmTWFwJztcbmV4cG9ydCBjb25zdCBORzJfWk9ORSA9ICduZzIuTmdab25lJztcblxuZXhwb3J0IGNvbnN0IE5HMV9DT05UUk9MTEVSID0gJyRjb250cm9sbGVyJztcbmV4cG9ydCBjb25zdCBORzFfU0NPUEUgPSAnJHNjb3BlJztcbmV4cG9ydCBjb25zdCBORzFfUk9PVF9TQ09QRSA9ICckcm9vdFNjb3BlJztcbmV4cG9ydCBjb25zdCBORzFfQ09NUElMRSA9ICckY29tcGlsZSc7XG5leHBvcnQgY29uc3QgTkcxX0hUVFBfQkFDS0VORCA9ICckaHR0cEJhY2tlbmQnO1xuZXhwb3J0IGNvbnN0IE5HMV9JTkpFQ1RPUiA9ICckaW5qZWN0b3InO1xuZXhwb3J0IGNvbnN0IE5HMV9QQVJTRSA9ICckcGFyc2UnO1xuZXhwb3J0IGNvbnN0IE5HMV9URU1QTEFURV9DQUNIRSA9ICckdGVtcGxhdGVDYWNoZSc7XG5leHBvcnQgY29uc3QgTkcxX1RFU1RBQklMSVRZID0gJyQkdGVzdGFiaWxpdHknO1xuZXhwb3J0IGNvbnN0IFJFUVVJUkVfSU5KRUNUT1IgPSAnXicgKyBORzJfSU5KRUNUT1I7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
