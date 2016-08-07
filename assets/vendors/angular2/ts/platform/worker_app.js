System.register(['angular2/src/facade/lang', 'angular2/src/platform/worker_app_common', 'angular2/src/platform/worker_app', 'angular2/core', 'angular2/src/web_workers/shared/client_message_broker', 'angular2/src/web_workers/shared/service_message_broker', 'angular2/src/web_workers/shared/serializer', 'angular2/src/web_workers/shared/message_bus', 'angular2/src/web_workers/worker/router_providers'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, worker_app_common_1, worker_app_1, core_1;
    function workerAppPlatform() {
        if (lang_1.isBlank(core_1.getPlatform())) {
            core_1.createPlatform(core_1.ReflectiveInjector.resolveAndCreate(worker_app_common_1.WORKER_APP_PLATFORM));
        }
        return core_1.assertPlatform(worker_app_common_1.WORKER_APP_PLATFORM_MARKER);
    }
    exports_1("workerAppPlatform", workerAppPlatform);
    function bootstrapApp(appComponentType, customProviders) {
        var appInjector = core_1.ReflectiveInjector.resolveAndCreate([worker_app_1.WORKER_APP_APPLICATION, lang_1.isPresent(customProviders) ? customProviders : []], workerAppPlatform().injector);
        return core_1.coreLoadAndBootstrap(appInjector, appComponentType);
    }
    exports_1("bootstrapApp", bootstrapApp);
    var exportedNames_1 = {
        'workerAppPlatform': true,
        'bootstrapApp': true,
        'WORKER_APP_PLATFORM': true,
        'WORKER_APP_APPLICATION_COMMON': true,
        'WORKER_APP_APPLICATION': true,
        'ClientMessageBroker': true,
        'ClientMessageBrokerFactory': true,
        'FnArg': true,
        'UiArguments': true,
        'ReceivedMessage': true,
        'ServiceMessageBroker': true,
        'ServiceMessageBrokerFactory': true,
        'PRIMITIVE': true,
        'WORKER_APP_ROUTER': true
    };
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (worker_app_common_1_1) {
                worker_app_common_1 = worker_app_common_1_1;
                exports_1({
                    "WORKER_APP_PLATFORM": worker_app_common_1_1["WORKER_APP_PLATFORM"],
                    "WORKER_APP_APPLICATION_COMMON": worker_app_common_1_1["WORKER_APP_APPLICATION_COMMON"]
                });
            },
            function (worker_app_1_1) {
                worker_app_1 = worker_app_1_1;
                exports_1({
                    "WORKER_APP_APPLICATION": worker_app_1_1["WORKER_APP_APPLICATION"]
                });
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (client_message_broker_1_1) {
                exports_1({
                    "ClientMessageBroker": client_message_broker_1_1["ClientMessageBroker"],
                    "ClientMessageBrokerFactory": client_message_broker_1_1["ClientMessageBrokerFactory"],
                    "FnArg": client_message_broker_1_1["FnArg"],
                    "UiArguments": client_message_broker_1_1["UiArguments"]
                });
            },
            function (service_message_broker_1_1) {
                exports_1({
                    "ReceivedMessage": service_message_broker_1_1["ReceivedMessage"],
                    "ServiceMessageBroker": service_message_broker_1_1["ServiceMessageBroker"],
                    "ServiceMessageBrokerFactory": service_message_broker_1_1["ServiceMessageBrokerFactory"]
                });
            },
            function (serializer_1_1) {
                exports_1({
                    "PRIMITIVE": serializer_1_1["PRIMITIVE"]
                });
            },
            function (message_bus_1_1) {
                exportStar_1(message_bus_1_1);
            },
            function (router_providers_1_1) {
                exports_1({
                    "WORKER_APP_ROUTER": router_providers_1_1["WORKER_APP_ROUTER"]
                });
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3BsYXRmb3JtL3dvcmtlcl9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQXFDQTtRQUNFLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxrQkFBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IscUJBQWMsQ0FBQyx5QkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyx1Q0FBbUIsQ0FBQyxDQUFDLENBQUM7UUFDM0UsQ0FBQztRQUNELE1BQU0sQ0FBQyxxQkFBYyxDQUFDLDhDQUEwQixDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUxELGlEQUtDLENBQUE7SUFFRCxzQkFDSSxnQkFBc0IsRUFDdEIsZUFBd0Q7UUFDMUQsSUFBSSxXQUFXLEdBQUcseUJBQWtCLENBQUMsZ0JBQWdCLENBQ2pELENBQUMsbUNBQXNCLEVBQUUsZ0JBQVMsQ0FBQyxlQUFlLENBQUMsR0FBRyxlQUFlLEdBQUcsRUFBRSxDQUFDLEVBQzNFLGlCQUFpQixFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEMsTUFBTSxDQUFDLDJCQUFvQixDQUFDLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFQRCx1Q0FPQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3BsYXRmb3JtL3dvcmtlcl9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzUHJlc2VudCwgaXNCbGFua30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7XG4gIFdPUktFUl9BUFBfUExBVEZPUk0sXG4gIFdPUktFUl9BUFBfUExBVEZPUk1fTUFSS0VSXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS93b3JrZXJfYXBwX2NvbW1vbic7XG5pbXBvcnQge1dPUktFUl9BUFBfQVBQTElDQVRJT059IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS93b3JrZXJfYXBwJztcbmltcG9ydCB7XG4gIFBsYXRmb3JtUmVmLFxuICBUeXBlLFxuICBDb21wb25lbnRSZWYsXG4gIFJlZmxlY3RpdmVJbmplY3RvcixcbiAgY29yZUxvYWRBbmRCb290c3RyYXAsXG4gIGdldFBsYXRmb3JtLFxuICBjcmVhdGVQbGF0Zm9ybSxcbiAgYXNzZXJ0UGxhdGZvcm1cbn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5cbmV4cG9ydCB7XG4gIFdPUktFUl9BUFBfUExBVEZPUk0sXG4gIFdPUktFUl9BUFBfQVBQTElDQVRJT05fQ09NTU9OXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS93b3JrZXJfYXBwX2NvbW1vbic7XG5leHBvcnQge1dPUktFUl9BUFBfQVBQTElDQVRJT059IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS93b3JrZXJfYXBwJztcbmV4cG9ydCB7XG4gIENsaWVudE1lc3NhZ2VCcm9rZXIsXG4gIENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5LFxuICBGbkFyZyxcbiAgVWlBcmd1bWVudHNcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9jbGllbnRfbWVzc2FnZV9icm9rZXInO1xuZXhwb3J0IHtcbiAgUmVjZWl2ZWRNZXNzYWdlLFxuICBTZXJ2aWNlTWVzc2FnZUJyb2tlcixcbiAgU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5XG59IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvc2VydmljZV9tZXNzYWdlX2Jyb2tlcic7XG5leHBvcnQge1BSSU1JVElWRX0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJpYWxpemVyJztcbmV4cG9ydCAqIGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvbWVzc2FnZV9idXMnO1xuZXhwb3J0IHtXT1JLRVJfQVBQX1JPVVRFUn0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci9yb3V0ZXJfcHJvdmlkZXJzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHdvcmtlckFwcFBsYXRmb3JtKCk6IFBsYXRmb3JtUmVmIHtcbiAgaWYgKGlzQmxhbmsoZ2V0UGxhdGZvcm0oKSkpIHtcbiAgICBjcmVhdGVQbGF0Zm9ybShSZWZsZWN0aXZlSW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZShXT1JLRVJfQVBQX1BMQVRGT1JNKSk7XG4gIH1cbiAgcmV0dXJuIGFzc2VydFBsYXRmb3JtKFdPUktFUl9BUFBfUExBVEZPUk1fTUFSS0VSKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJvb3RzdHJhcEFwcChcbiAgICBhcHBDb21wb25lbnRUeXBlOiBUeXBlLFxuICAgIGN1c3RvbVByb3ZpZGVycz86IEFycmF5PGFueSAvKlR5cGUgfCBQcm92aWRlciB8IGFueVtdKi8+KTogUHJvbWlzZTxDb21wb25lbnRSZWY+IHtcbiAgdmFyIGFwcEluamVjdG9yID0gUmVmbGVjdGl2ZUluamVjdG9yLnJlc29sdmVBbmRDcmVhdGUoXG4gICAgICBbV09SS0VSX0FQUF9BUFBMSUNBVElPTiwgaXNQcmVzZW50KGN1c3RvbVByb3ZpZGVycykgPyBjdXN0b21Qcm92aWRlcnMgOiBbXV0sXG4gICAgICB3b3JrZXJBcHBQbGF0Zm9ybSgpLmluamVjdG9yKTtcbiAgcmV0dXJuIGNvcmVMb2FkQW5kQm9vdHN0cmFwKGFwcEluamVjdG9yLCBhcHBDb21wb25lbnRUeXBlKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
