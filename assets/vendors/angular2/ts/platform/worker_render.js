System.register(['angular2/src/facade/lang', 'angular2/src/facade/async', 'angular2/core', 'angular2/src/platform/worker_render', 'angular2/src/platform/worker_render_common', '../src/web_workers/shared/client_message_broker', '../src/web_workers/shared/service_message_broker', '../src/web_workers/shared/serializer', '../src/web_workers/shared/message_bus', 'angular2/src/web_workers/ui/router_providers'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, async_1, core_1, worker_render_1, worker_render_common_1;
    var WORKER_RENDER_APP;
    function workerRenderPlatform() {
        if (lang_1.isBlank(core_1.getPlatform())) {
            core_1.createPlatform(core_1.ReflectiveInjector.resolveAndCreate(worker_render_common_1.WORKER_RENDER_PLATFORM));
        }
        return core_1.assertPlatform(worker_render_common_1.WORKER_RENDER_PLATFORM_MARKER);
    }
    exports_1("workerRenderPlatform", workerRenderPlatform);
    function bootstrapRender(workerScriptUri, customProviders) {
        var pf = core_1.ReflectiveInjector.resolveAndCreate(worker_render_common_1.WORKER_RENDER_PLATFORM);
        var app = core_1.ReflectiveInjector.resolveAndCreate([
            worker_render_1.WORKER_RENDER_APPLICATION,
            new core_1.Provider(worker_render_common_1.WORKER_SCRIPT, { useValue: workerScriptUri }),
            lang_1.isPresent(customProviders) ? customProviders : []
        ], workerRenderPlatform().injector);
        // Return a promise so that we keep the same semantics as Dart,
        // and we might want to wait for the app side to come up
        // in the future...
        return async_1.PromiseWrapper.resolve(app.get(core_1.ApplicationRef));
    }
    exports_1("bootstrapRender", bootstrapRender);
    var exportedNames_1 = {
        'WORKER_RENDER_APP': true,
        'workerRenderPlatform': true,
        'bootstrapRender': true,
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
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (worker_render_1_1) {
                worker_render_1 = worker_render_1_1;
                exports_1({
                    "WORKER_RENDER_APPLICATION": worker_render_1_1["WORKER_RENDER_APPLICATION"],
                    "WebWorkerInstance": worker_render_1_1["WebWorkerInstance"]
                });
            },
            function (worker_render_common_1_1) {
                worker_render_common_1 = worker_render_common_1_1;
                exports_1({
                    "WORKER_SCRIPT": worker_render_common_1_1["WORKER_SCRIPT"],
                    "WORKER_RENDER_PLATFORM": worker_render_common_1_1["WORKER_RENDER_PLATFORM"],
                    "initializeGenericWorkerRenderer": worker_render_common_1_1["initializeGenericWorkerRenderer"],
                    "WORKER_RENDER_APPLICATION_COMMON": worker_render_common_1_1["WORKER_RENDER_APPLICATION_COMMON"]
                });
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3BsYXRmb3JtL3dvcmtlcl9yZW5kZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQTBDYSxpQkFBaUI7SUFHOUI7UUFDRSxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsa0JBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLHFCQUFjLENBQUMseUJBQWtCLENBQUMsZ0JBQWdCLENBQUMsNkNBQXNCLENBQUMsQ0FBQyxDQUFDO1FBQzlFLENBQUM7UUFDRCxNQUFNLENBQUMscUJBQWMsQ0FBQyxvREFBNkIsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFMRCx1REFLQyxDQUFBO0lBRUQseUJBQ0ksZUFBdUIsRUFDdkIsZUFBd0Q7UUFDMUQsSUFBSSxFQUFFLEdBQUcseUJBQWtCLENBQUMsZ0JBQWdCLENBQUMsNkNBQXNCLENBQUMsQ0FBQztRQUNyRSxJQUFJLEdBQUcsR0FBRyx5QkFBa0IsQ0FBQyxnQkFBZ0IsQ0FDekM7WUFDRSx5Q0FBeUI7WUFDekIsSUFBSSxlQUFRLENBQUMsb0NBQWEsRUFBRSxFQUFDLFFBQVEsRUFBRSxlQUFlLEVBQUMsQ0FBQztZQUN4RCxnQkFBUyxDQUFDLGVBQWUsQ0FBQyxHQUFHLGVBQWUsR0FBRyxFQUFFO1NBQ2xELEVBQ0Qsb0JBQW9CLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQywrREFBK0Q7UUFDL0Qsd0RBQXdEO1FBQ3hELG1CQUFtQjtRQUNuQixNQUFNLENBQUMsc0JBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBYyxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBZkQsNkNBZUMsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBNUJEOztlQUVHO1lBQ1UsK0JBQUEsaUJBQWlCLEdBQUcseUNBQXlCLENBQUEsQ0FBQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9wbGF0Zm9ybS93b3JrZXJfcmVuZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc1ByZXNlbnQsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge1Byb21pc2VXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jJztcbmltcG9ydCB7XG4gIEFwcGxpY2F0aW9uUmVmLFxuICBQbGF0Zm9ybVJlZixcbiAgUmVmbGVjdGl2ZUluamVjdG9yLFxuICBQcm92aWRlcixcbiAgZ2V0UGxhdGZvcm0sXG4gIGNyZWF0ZVBsYXRmb3JtLFxuICBhc3NlcnRQbGF0Zm9ybVxufSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7V09SS0VSX1JFTkRFUl9BUFBMSUNBVElPTn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL3dvcmtlcl9yZW5kZXInO1xuaW1wb3J0IHtcbiAgV09SS0VSX1NDUklQVCxcbiAgV09SS0VSX1JFTkRFUl9QTEFURk9STSxcbiAgV09SS0VSX1JFTkRFUl9QTEFURk9STV9NQVJLRVJcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL3dvcmtlcl9yZW5kZXJfY29tbW9uJztcblxuZXhwb3J0IHtcbiAgV09SS0VSX1NDUklQVCxcbiAgV09SS0VSX1JFTkRFUl9QTEFURk9STSxcbiAgaW5pdGlhbGl6ZUdlbmVyaWNXb3JrZXJSZW5kZXJlcixcbiAgV09SS0VSX1JFTkRFUl9BUFBMSUNBVElPTl9DT01NT05cbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL3dvcmtlcl9yZW5kZXJfY29tbW9uJztcbmV4cG9ydCB7V09SS0VSX1JFTkRFUl9BUFBMSUNBVElPTiwgV2ViV29ya2VySW5zdGFuY2V9IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS93b3JrZXJfcmVuZGVyJztcbmV4cG9ydCB7XG4gIENsaWVudE1lc3NhZ2VCcm9rZXIsXG4gIENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5LFxuICBGbkFyZyxcbiAgVWlBcmd1bWVudHNcbn0gZnJvbSAnLi4vc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9jbGllbnRfbWVzc2FnZV9icm9rZXInO1xuZXhwb3J0IHtcbiAgUmVjZWl2ZWRNZXNzYWdlLFxuICBTZXJ2aWNlTWVzc2FnZUJyb2tlcixcbiAgU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5XG59IGZyb20gJy4uL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvc2VydmljZV9tZXNzYWdlX2Jyb2tlcic7XG5leHBvcnQge1BSSU1JVElWRX0gZnJvbSAnLi4vc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJpYWxpemVyJztcbmV4cG9ydCAqIGZyb20gJy4uL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvbWVzc2FnZV9idXMnO1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSBXT1JLRVJfUkVOREVSX0FQUExJQ0FUSU9OXG4gKi9cbmV4cG9ydCBjb25zdCBXT1JLRVJfUkVOREVSX0FQUCA9IFdPUktFUl9SRU5ERVJfQVBQTElDQVRJT047XG5leHBvcnQge1dPUktFUl9SRU5ERVJfUk9VVEVSfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvdWkvcm91dGVyX3Byb3ZpZGVycyc7XG5cbmV4cG9ydCBmdW5jdGlvbiB3b3JrZXJSZW5kZXJQbGF0Zm9ybSgpOiBQbGF0Zm9ybVJlZiB7XG4gIGlmIChpc0JsYW5rKGdldFBsYXRmb3JtKCkpKSB7XG4gICAgY3JlYXRlUGxhdGZvcm0oUmVmbGVjdGl2ZUluamVjdG9yLnJlc29sdmVBbmRDcmVhdGUoV09SS0VSX1JFTkRFUl9QTEFURk9STSkpO1xuICB9XG4gIHJldHVybiBhc3NlcnRQbGF0Zm9ybShXT1JLRVJfUkVOREVSX1BMQVRGT1JNX01BUktFUik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBib290c3RyYXBSZW5kZXIoXG4gICAgd29ya2VyU2NyaXB0VXJpOiBzdHJpbmcsXG4gICAgY3VzdG9tUHJvdmlkZXJzPzogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4pOiBQcm9taXNlPEFwcGxpY2F0aW9uUmVmPiB7XG4gIHZhciBwZiA9IFJlZmxlY3RpdmVJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKFdPUktFUl9SRU5ERVJfUExBVEZPUk0pO1xuICB2YXIgYXBwID0gUmVmbGVjdGl2ZUluamVjdG9yLnJlc29sdmVBbmRDcmVhdGUoXG4gICAgICBbXG4gICAgICAgIFdPUktFUl9SRU5ERVJfQVBQTElDQVRJT04sXG4gICAgICAgIG5ldyBQcm92aWRlcihXT1JLRVJfU0NSSVBULCB7dXNlVmFsdWU6IHdvcmtlclNjcmlwdFVyaX0pLFxuICAgICAgICBpc1ByZXNlbnQoY3VzdG9tUHJvdmlkZXJzKSA/IGN1c3RvbVByb3ZpZGVycyA6IFtdXG4gICAgICBdLFxuICAgICAgd29ya2VyUmVuZGVyUGxhdGZvcm0oKS5pbmplY3Rvcik7XG4gIC8vIFJldHVybiBhIHByb21pc2Ugc28gdGhhdCB3ZSBrZWVwIHRoZSBzYW1lIHNlbWFudGljcyBhcyBEYXJ0LFxuICAvLyBhbmQgd2UgbWlnaHQgd2FudCB0byB3YWl0IGZvciB0aGUgYXBwIHNpZGUgdG8gY29tZSB1cFxuICAvLyBpbiB0aGUgZnV0dXJlLi4uXG4gIHJldHVybiBQcm9taXNlV3JhcHBlci5yZXNvbHZlKGFwcC5nZXQoQXBwbGljYXRpb25SZWYpKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
