System.register(['angular2/src/core/zone/ng_zone', 'angular2/src/core/di', 'angular2/src/platform/server/parse5_adapter', 'angular2/src/web_workers/shared/post_message_bus', './worker_app_common', 'angular2/core', 'angular2/src/web_workers/shared/message_bus', 'angular2/src/compiler/compiler'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ng_zone_1, di_1, parse5_adapter_1, post_message_bus_1, worker_app_common_1, core_1, message_bus_1, compiler_1;
    var _postMessage, WORKER_APP_APPLICATION;
    function createMessageBus(zone) {
        var sink = new post_message_bus_1.PostMessageBusSink(_postMessage);
        var source = new post_message_bus_1.PostMessageBusSource();
        var bus = new post_message_bus_1.PostMessageBus(sink, source);
        bus.attachToZone(zone);
        return bus;
    }
    function setupWebWorker() {
        parse5_adapter_1.Parse5DomAdapter.makeCurrent();
    }
    return {
        setters:[
            function (ng_zone_1_1) {
                ng_zone_1 = ng_zone_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (parse5_adapter_1_1) {
                parse5_adapter_1 = parse5_adapter_1_1;
            },
            function (post_message_bus_1_1) {
                post_message_bus_1 = post_message_bus_1_1;
            },
            function (worker_app_common_1_1) {
                worker_app_common_1 = worker_app_common_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (message_bus_1_1) {
                message_bus_1 = message_bus_1_1;
            },
            function (compiler_1_1) {
                compiler_1 = compiler_1_1;
            }],
        execute: function() {
            // TODO(jteplitz602) remove this and compile with lib.webworker.d.ts (#3492)
            _postMessage = {
                postMessage: function (message, transferrables) {
                    postMessage(message, transferrables);
                }
            };
            exports_1("WORKER_APP_APPLICATION", WORKER_APP_APPLICATION = [
                worker_app_common_1.WORKER_APP_APPLICATION_COMMON,
                compiler_1.COMPILER_PROVIDERS,
                new di_1.Provider(message_bus_1.MessageBus, { useFactory: createMessageBus, deps: [ng_zone_1.NgZone] }),
                new di_1.Provider(core_1.APP_INITIALIZER, { useValue: setupWebWorker, multi: true })
            ]);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL3dvcmtlcl9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQWVJLFlBQVksRUFNSCxzQkFBc0I7SUFPbkMsMEJBQTBCLElBQVk7UUFDcEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxxQ0FBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNoRCxJQUFJLE1BQU0sR0FBRyxJQUFJLHVDQUFvQixFQUFFLENBQUM7UUFDeEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxpQ0FBYyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMzQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRUQ7UUFDRSxpQ0FBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNqQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBeEJELDRFQUE0RTtZQUN4RSxZQUFZLEdBQUc7Z0JBQ2pCLFdBQVcsRUFBRSxVQUFDLE9BQVksRUFBRSxjQUE2QjtvQkFDakQsV0FBWSxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztnQkFDOUMsQ0FBQzthQUNGLENBQUM7WUFFVyxvQ0FBQSxzQkFBc0IsR0FBMkM7Z0JBQzVFLGlEQUE2QjtnQkFDN0IsNkJBQWtCO2dCQUNsQixJQUFJLGFBQVEsQ0FBQyx3QkFBVSxFQUFFLEVBQUMsVUFBVSxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxDQUFDLGdCQUFNLENBQUMsRUFBQyxDQUFDO2dCQUN4RSxJQUFJLGFBQVEsQ0FBQyxzQkFBZSxFQUFFLEVBQUMsUUFBUSxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUM7YUFDdkUsQ0FBQSxDQUFDIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL3dvcmtlcl9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nWm9uZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvem9uZS9uZ196b25lJztcbmltcG9ydCB7VHlwZSwgQ09OU1RfRVhQUiwgaXNQcmVzZW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtQcm92aWRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtQYXJzZTVEb21BZGFwdGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vc2VydmVyL3BhcnNlNV9hZGFwdGVyJztcbmltcG9ydCB7XG4gIFBvc3RNZXNzYWdlQnVzLFxuICBQb3N0TWVzc2FnZUJ1c1NpbmssXG4gIFBvc3RNZXNzYWdlQnVzU291cmNlXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvcG9zdF9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge1dPUktFUl9BUFBfQVBQTElDQVRJT05fQ09NTU9OfSBmcm9tICcuL3dvcmtlcl9hcHBfY29tbW9uJztcbmltcG9ydCB7QVBQX0lOSVRJQUxJWkVSfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7TWVzc2FnZUJ1c30gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge0NPTVBJTEVSX1BST1ZJREVSU30gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL2NvbXBpbGVyJztcblxuLy8gVE9ETyhqdGVwbGl0ejYwMikgcmVtb3ZlIHRoaXMgYW5kIGNvbXBpbGUgd2l0aCBsaWIud2Vid29ya2VyLmQudHMgKCMzNDkyKVxubGV0IF9wb3N0TWVzc2FnZSA9IHtcbiAgcG9zdE1lc3NhZ2U6IChtZXNzYWdlOiBhbnksIHRyYW5zZmVycmFibGVzPzpbQXJyYXlCdWZmZXJdKSA9PiB7XG4gICAgKDxhbnk+cG9zdE1lc3NhZ2UpKG1lc3NhZ2UsIHRyYW5zZmVycmFibGVzKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IFdPUktFUl9BUFBfQVBQTElDQVRJT046IEFycmF5PGFueSAvKlR5cGUgfCBQcm92aWRlciB8IGFueVtdKi8+ID0gW1xuICBXT1JLRVJfQVBQX0FQUExJQ0FUSU9OX0NPTU1PTixcbiAgQ09NUElMRVJfUFJPVklERVJTLFxuICBuZXcgUHJvdmlkZXIoTWVzc2FnZUJ1cywge3VzZUZhY3Rvcnk6IGNyZWF0ZU1lc3NhZ2VCdXMsIGRlcHM6IFtOZ1pvbmVdfSksXG4gIG5ldyBQcm92aWRlcihBUFBfSU5JVElBTElaRVIsIHt1c2VWYWx1ZTogc2V0dXBXZWJXb3JrZXIsIG11bHRpOiB0cnVlfSlcbl07XG5cbmZ1bmN0aW9uIGNyZWF0ZU1lc3NhZ2VCdXMoem9uZTogTmdab25lKTogTWVzc2FnZUJ1cyB7XG4gIGxldCBzaW5rID0gbmV3IFBvc3RNZXNzYWdlQnVzU2luayhfcG9zdE1lc3NhZ2UpO1xuICBsZXQgc291cmNlID0gbmV3IFBvc3RNZXNzYWdlQnVzU291cmNlKCk7XG4gIGxldCBidXMgPSBuZXcgUG9zdE1lc3NhZ2VCdXMoc2luaywgc291cmNlKTtcbiAgYnVzLmF0dGFjaFRvWm9uZSh6b25lKTtcbiAgcmV0dXJuIGJ1cztcbn1cblxuZnVuY3Rpb24gc2V0dXBXZWJXb3JrZXIoKTogdm9pZCB7XG4gIFBhcnNlNURvbUFkYXB0ZXIubWFrZUN1cnJlbnQoKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
