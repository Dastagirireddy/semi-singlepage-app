System.register(['angular2/src/platform/worker_render_common', 'angular2/src/platform/worker_render', '../src/web_workers/shared/client_message_broker', '../src/web_workers/shared/service_message_broker', '../src/web_workers/shared/serializer', '../src/web_workers/shared/message_bus', 'angular2/src/web_workers/ui/router_providers'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var worker_render_1;
    var WORKER_RENDER_APP;
    var exportedNames_1 = {
        'WORKER_RENDER_APP': true,
        'WORKER_SCRIPT': true,
        'WORKER_RENDER_PLATFORM': true,
        'initializeGenericWorkerRenderer': true,
        'WORKER_RENDER_APPLICATION_COMMON': true,
        'WORKER_RENDER_APPLICATION': true,
        'WebWorkerInstance': true,
        'ClientMessageBroker': true,
        'ClientMessageBrokerFactory': true,
        'FnArg': true,
        'UiArguments': true,
        'ReceivedMessage': true,
        'ServiceMessageBroker': true,
        'ServiceMessageBrokerFactory': true,
        'PRIMITIVE': true,
        'WORKER_RENDER_ROUTER': true
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
            function (worker_render_common_1_1) {
                exports_1({
                    "WORKER_SCRIPT": worker_render_common_1_1["WORKER_SCRIPT"],
                    "WORKER_RENDER_PLATFORM": worker_render_common_1_1["WORKER_RENDER_PLATFORM"],
                    "initializeGenericWorkerRenderer": worker_render_common_1_1["initializeGenericWorkerRenderer"],
                    "WORKER_RENDER_APPLICATION_COMMON": worker_render_common_1_1["WORKER_RENDER_APPLICATION_COMMON"]
                });
            },
            function (worker_render_2_1) {
                exports_1({
                    "WORKER_RENDER_APPLICATION": worker_render_2_1["WORKER_RENDER_APPLICATION"],
                    "WebWorkerInstance": worker_render_2_1["WebWorkerInstance"]
                });
                worker_render_1 = worker_render_2_1;
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
                    "WORKER_RENDER_ROUTER": router_providers_1_1["WORKER_RENDER_ROUTER"]
                });
            }],
        execute: function() {
            /**
             * @deprecated Use WORKER_RENDER_APPLICATION
             */
            exports_1("WORKER_RENDER_APP", WORKER_RENDER_APP = worker_render_1.WORKER_RENDER_APPLICATION);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvcGxhdGZvcm0vd29ya2VyX3JlbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBeUJhLGlCQUFpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBSDlCOztlQUVHO1lBQ1UsK0JBQUEsaUJBQWlCLEdBQUcseUNBQXlCLENBQUEsQ0FBQyIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3BsYXRmb3JtL3dvcmtlcl9yZW5kZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQge1xuICBXT1JLRVJfU0NSSVBULFxuICBXT1JLRVJfUkVOREVSX1BMQVRGT1JNLFxuICBpbml0aWFsaXplR2VuZXJpY1dvcmtlclJlbmRlcmVyLFxuICBXT1JLRVJfUkVOREVSX0FQUExJQ0FUSU9OX0NPTU1PTlxufSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vd29ya2VyX3JlbmRlcl9jb21tb24nO1xuZXhwb3J0IHtXT1JLRVJfUkVOREVSX0FQUExJQ0FUSU9OLCBXZWJXb3JrZXJJbnN0YW5jZX0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL3dvcmtlcl9yZW5kZXInO1xuZXhwb3J0IHtcbiAgQ2xpZW50TWVzc2FnZUJyb2tlcixcbiAgQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnksXG4gIEZuQXJnLFxuICBVaUFyZ3VtZW50c1xufSBmcm9tICcuLi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL2NsaWVudF9tZXNzYWdlX2Jyb2tlcic7XG5leHBvcnQge1xuICBSZWNlaXZlZE1lc3NhZ2UsXG4gIFNlcnZpY2VNZXNzYWdlQnJva2VyLFxuICBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3Rvcnlcbn0gZnJvbSAnLi4vc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJ2aWNlX21lc3NhZ2VfYnJva2VyJztcbmV4cG9ydCB7UFJJTUlUSVZFfSBmcm9tICcuLi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXInO1xuZXhwb3J0ICogZnJvbSAnLi4vc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge1dPUktFUl9SRU5ERVJfQVBQTElDQVRJT059IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS93b3JrZXJfcmVuZGVyJztcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgV09SS0VSX1JFTkRFUl9BUFBMSUNBVElPTlxuICovXG5leHBvcnQgY29uc3QgV09SS0VSX1JFTkRFUl9BUFAgPSBXT1JLRVJfUkVOREVSX0FQUExJQ0FUSU9OO1xuZXhwb3J0IHtXT1JLRVJfUkVOREVSX1JPVVRFUn0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3VpL3JvdXRlcl9wcm92aWRlcnMnO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
