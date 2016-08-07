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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS93b3JrZXJfYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFlSSxZQUFZLEVBTUgsc0JBQXNCO0lBT25DLDBCQUEwQixJQUFZO1FBQ3BDLElBQUksSUFBSSxHQUFHLElBQUkscUNBQWtCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDaEQsSUFBSSxNQUFNLEdBQUcsSUFBSSx1Q0FBb0IsRUFBRSxDQUFDO1FBQ3hDLElBQUksR0FBRyxHQUFHLElBQUksaUNBQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDM0MsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVEO1FBQ0UsaUNBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDakMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQXhCRCw0RUFBNEU7WUFDeEUsWUFBWSxHQUFHO2dCQUNqQixXQUFXLEVBQUUsVUFBQyxPQUFZLEVBQUUsY0FBNkI7b0JBQ2pELFdBQVksQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQzlDLENBQUM7YUFDRixDQUFDO1lBRVcsb0NBQUEsc0JBQXNCLEdBQTJDO2dCQUM1RSxpREFBNkI7Z0JBQzdCLDZCQUFrQjtnQkFDbEIsSUFBSSxhQUFRLENBQUMsd0JBQVUsRUFBRSxFQUFDLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLEVBQUMsQ0FBQztnQkFDeEUsSUFBSSxhQUFRLENBQUMsc0JBQWUsRUFBRSxFQUFDLFFBQVEsRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDO2FBQ3ZFLENBQUEsQ0FBQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvcGxhdGZvcm0vd29ya2VyX2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Tmdab25lfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS96b25lL25nX3pvbmUnO1xuaW1wb3J0IHtUeXBlLCBDT05TVF9FWFBSLCBpc1ByZXNlbnR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge1Byb3ZpZGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge1BhcnNlNURvbUFkYXB0ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9zZXJ2ZXIvcGFyc2U1X2FkYXB0ZXInO1xuaW1wb3J0IHtcbiAgUG9zdE1lc3NhZ2VCdXMsXG4gIFBvc3RNZXNzYWdlQnVzU2luayxcbiAgUG9zdE1lc3NhZ2VCdXNTb3VyY2Vcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9wb3N0X21lc3NhZ2VfYnVzJztcbmltcG9ydCB7V09SS0VSX0FQUF9BUFBMSUNBVElPTl9DT01NT059IGZyb20gJy4vd29ya2VyX2FwcF9jb21tb24nO1xuaW1wb3J0IHtBUFBfSU5JVElBTElaRVJ9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7Q09NUElMRVJfUFJPVklERVJTfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvY29tcGlsZXInO1xuXG4vLyBUT0RPKGp0ZXBsaXR6NjAyKSByZW1vdmUgdGhpcyBhbmQgY29tcGlsZSB3aXRoIGxpYi53ZWJ3b3JrZXIuZC50cyAoIzM0OTIpXG5sZXQgX3Bvc3RNZXNzYWdlID0ge1xuICBwb3N0TWVzc2FnZTogKG1lc3NhZ2U6IGFueSwgdHJhbnNmZXJyYWJsZXM/OltBcnJheUJ1ZmZlcl0pID0+IHtcbiAgICAoPGFueT5wb3N0TWVzc2FnZSkobWVzc2FnZSwgdHJhbnNmZXJyYWJsZXMpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgV09SS0VSX0FQUF9BUFBMSUNBVElPTjogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPSBbXG4gIFdPUktFUl9BUFBfQVBQTElDQVRJT05fQ09NTU9OLFxuICBDT01QSUxFUl9QUk9WSURFUlMsXG4gIG5ldyBQcm92aWRlcihNZXNzYWdlQnVzLCB7dXNlRmFjdG9yeTogY3JlYXRlTWVzc2FnZUJ1cywgZGVwczogW05nWm9uZV19KSxcbiAgbmV3IFByb3ZpZGVyKEFQUF9JTklUSUFMSVpFUiwge3VzZVZhbHVlOiBzZXR1cFdlYldvcmtlciwgbXVsdGk6IHRydWV9KVxuXTtcblxuZnVuY3Rpb24gY3JlYXRlTWVzc2FnZUJ1cyh6b25lOiBOZ1pvbmUpOiBNZXNzYWdlQnVzIHtcbiAgbGV0IHNpbmsgPSBuZXcgUG9zdE1lc3NhZ2VCdXNTaW5rKF9wb3N0TWVzc2FnZSk7XG4gIGxldCBzb3VyY2UgPSBuZXcgUG9zdE1lc3NhZ2VCdXNTb3VyY2UoKTtcbiAgbGV0IGJ1cyA9IG5ldyBQb3N0TWVzc2FnZUJ1cyhzaW5rLCBzb3VyY2UpO1xuICBidXMuYXR0YWNoVG9ab25lKHpvbmUpO1xuICByZXR1cm4gYnVzO1xufVxuXG5mdW5jdGlvbiBzZXR1cFdlYldvcmtlcigpOiB2b2lkIHtcbiAgUGFyc2U1RG9tQWRhcHRlci5tYWtlQ3VycmVudCgpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
