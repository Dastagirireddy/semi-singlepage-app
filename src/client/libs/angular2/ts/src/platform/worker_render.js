System.register(['angular2/src/web_workers/shared/post_message_bus', 'angular2/src/web_workers/shared/message_bus', 'angular2/core', 'angular2/src/core/di', 'angular2/src/platform/worker_render_common', 'angular2/src/facade/exceptions', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var post_message_bus_1, message_bus_1, core_1, di_1, worker_render_common_1, exceptions_1, lang_1;
    var WebWorkerInstance, WORKER_RENDER_APPLICATION;
    function initWebWorkerApplication(injector) {
        var scriptUri;
        try {
            scriptUri = injector.get(worker_render_common_1.WORKER_SCRIPT);
        }
        catch (e) {
            throw new exceptions_1.BaseException("You must provide your WebWorker's initialization script with the WORKER_SCRIPT token");
        }
        var instance = injector.get(WebWorkerInstance);
        spawnWebWorker(scriptUri, instance);
        worker_render_common_1.initializeGenericWorkerRenderer(injector);
    }
    /**
     * Spawns a new class and initializes the WebWorkerInstance
     */
    function spawnWebWorker(uri, instance) {
        var webWorker = new Worker(uri);
        var sink = new post_message_bus_1.PostMessageBusSink(webWorker);
        var source = new post_message_bus_1.PostMessageBusSource(webWorker);
        var bus = new post_message_bus_1.PostMessageBus(sink, source);
        instance.init(webWorker, bus);
    }
    return {
        setters:[
            function (post_message_bus_1_1) {
                post_message_bus_1 = post_message_bus_1_1;
            },
            function (message_bus_1_1) {
                message_bus_1 = message_bus_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (worker_render_common_1_1) {
                worker_render_common_1 = worker_render_common_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * Wrapper class that exposes the Worker
             * and underlying {@link MessageBus} for lower level message passing.
             */
            WebWorkerInstance = (function () {
                function WebWorkerInstance() {
                }
                /** @internal */
                WebWorkerInstance.prototype.init = function (worker, bus) {
                    this.worker = worker;
                    this.bus = bus;
                };
                WebWorkerInstance = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], WebWorkerInstance);
                return WebWorkerInstance;
            }());
            exports_1("WebWorkerInstance", WebWorkerInstance);
            /**
             * An array of providers that should be passed into `application()` when initializing a new Worker.
             */
            exports_1("WORKER_RENDER_APPLICATION", WORKER_RENDER_APPLICATION = lang_1.CONST_EXPR([
                worker_render_common_1.WORKER_RENDER_APPLICATION_COMMON,
                WebWorkerInstance,
                new di_1.Provider(core_1.APP_INITIALIZER, {
                    useFactory: function (injector) { return function () { return initWebWorkerApplication(injector); }; },
                    multi: true,
                    deps: [di_1.Injector]
                }),
                new di_1.Provider(message_bus_1.MessageBus, { useFactory: function (instance) { return instance.bus; }, deps: [WebWorkerInstance] })
            ]));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL3dvcmtlcl9yZW5kZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OzsyQkFzQ2EseUJBQXlCO0lBWXRDLGtDQUFrQyxRQUFrQjtRQUNsRCxJQUFJLFNBQWlCLENBQUM7UUFDdEIsSUFBSSxDQUFDO1lBQ0gsU0FBUyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsb0NBQWEsQ0FBQyxDQUFDO1FBQzFDLENBQUU7UUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxJQUFJLDBCQUFhLENBQ25CLHNGQUFzRixDQUFDLENBQUM7UUFDOUYsQ0FBQztRQUVELElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMvQyxjQUFjLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRXBDLHNEQUErQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRDs7T0FFRztJQUNILHdCQUF3QixHQUFXLEVBQUUsUUFBMkI7UUFDOUQsSUFBSSxTQUFTLEdBQVcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxxQ0FBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3QyxJQUFJLE1BQU0sR0FBRyxJQUFJLHVDQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pELElBQUksR0FBRyxHQUFHLElBQUksaUNBQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFM0MsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQXhERDs7O2VBR0c7WUFFSDtnQkFBQTtnQkFTQSxDQUFDO2dCQUxDLGdCQUFnQjtnQkFDVCxnQ0FBSSxHQUFYLFVBQVksTUFBYyxFQUFFLEdBQWU7b0JBQ3pDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO29CQUNyQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztnQkFDakIsQ0FBQztnQkFUSDtvQkFBQyxlQUFVLEVBQUU7O3FDQUFBO2dCQVViLHdCQUFDO1lBQUQsQ0FUQSxBQVNDLElBQUE7WUFURCxpREFTQyxDQUFBO1lBRUQ7O2VBRUc7WUFDVSx1Q0FBQSx5QkFBeUIsR0FBMkMsaUJBQVUsQ0FBQztnQkFDMUYsdURBQWdDO2dCQUNoQyxpQkFBaUI7Z0JBQ2pCLElBQUksYUFBUSxDQUFDLHNCQUFlLEVBQ2Y7b0JBQ0UsVUFBVSxFQUFFLFVBQUMsUUFBUSxJQUFLLE9BQUEsY0FBTSxPQUFBLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxFQUFsQyxDQUFrQyxFQUF4QyxDQUF3QztvQkFDbEUsS0FBSyxFQUFFLElBQUk7b0JBQ1gsSUFBSSxFQUFFLENBQUMsYUFBUSxDQUFDO2lCQUNqQixDQUFDO2dCQUNmLElBQUksYUFBUSxDQUFDLHdCQUFVLEVBQUUsRUFBQyxVQUFVLEVBQUUsVUFBQyxRQUFRLElBQUssT0FBQSxRQUFRLENBQUMsR0FBRyxFQUFaLENBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFDLENBQUM7YUFDOUYsQ0FBQyxDQUFBLENBQUMiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvcGxhdGZvcm0vd29ya2VyX3JlbmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFBvc3RNZXNzYWdlQnVzLFxuICBQb3N0TWVzc2FnZUJ1c1NpbmssXG4gIFBvc3RNZXNzYWdlQnVzU291cmNlXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvcG9zdF9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge01lc3NhZ2VCdXN9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtBUFBfSU5JVElBTElaRVJ9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtJbmplY3RvciwgSW5qZWN0YWJsZSwgUHJvdmlkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7TWVzc2FnZUJhc2VkUmVuZGVyZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy91aS9yZW5kZXJlcic7XG5pbXBvcnQge01lc3NhZ2VCYXNlZFhIUkltcGx9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy91aS94aHJfaW1wbCc7XG5pbXBvcnQge1xuICBXT1JLRVJfUkVOREVSX0FQUExJQ0FUSU9OX0NPTU1PTixcbiAgV09SS0VSX1JFTkRFUl9NRVNTQUdJTkdfUFJPVklERVJTLFxuICBXT1JLRVJfU0NSSVBULFxuICBpbml0aWFsaXplR2VuZXJpY1dvcmtlclJlbmRlcmVyXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS93b3JrZXJfcmVuZGVyX2NvbW1vbic7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge0NPTlNUX0VYUFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbi8qKlxuICogV3JhcHBlciBjbGFzcyB0aGF0IGV4cG9zZXMgdGhlIFdvcmtlclxuICogYW5kIHVuZGVybHlpbmcge0BsaW5rIE1lc3NhZ2VCdXN9IGZvciBsb3dlciBsZXZlbCBtZXNzYWdlIHBhc3NpbmcuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBXZWJXb3JrZXJJbnN0YW5jZSB7XG4gIHB1YmxpYyB3b3JrZXI6IFdvcmtlcjtcbiAgcHVibGljIGJ1czogTWVzc2FnZUJ1cztcblxuICAvKiogQGludGVybmFsICovXG4gIHB1YmxpYyBpbml0KHdvcmtlcjogV29ya2VyLCBidXM6IE1lc3NhZ2VCdXMpIHtcbiAgICB0aGlzLndvcmtlciA9IHdvcmtlcjtcbiAgICB0aGlzLmJ1cyA9IGJ1cztcbiAgfVxufVxuXG4vKipcbiAqIEFuIGFycmF5IG9mIHByb3ZpZGVycyB0aGF0IHNob3VsZCBiZSBwYXNzZWQgaW50byBgYXBwbGljYXRpb24oKWAgd2hlbiBpbml0aWFsaXppbmcgYSBuZXcgV29ya2VyLlxuICovXG5leHBvcnQgY29uc3QgV09SS0VSX1JFTkRFUl9BUFBMSUNBVElPTjogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPSBDT05TVF9FWFBSKFtcbiAgV09SS0VSX1JFTkRFUl9BUFBMSUNBVElPTl9DT01NT04sXG4gIFdlYldvcmtlckluc3RhbmNlLFxuICBuZXcgUHJvdmlkZXIoQVBQX0lOSVRJQUxJWkVSLFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICB1c2VGYWN0b3J5OiAoaW5qZWN0b3IpID0+ICgpID0+IGluaXRXZWJXb3JrZXJBcHBsaWNhdGlvbihpbmplY3RvciksXG4gICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgICAgICAgICBkZXBzOiBbSW5qZWN0b3JdXG4gICAgICAgICAgICAgICB9KSxcbiAgbmV3IFByb3ZpZGVyKE1lc3NhZ2VCdXMsIHt1c2VGYWN0b3J5OiAoaW5zdGFuY2UpID0+IGluc3RhbmNlLmJ1cywgZGVwczogW1dlYldvcmtlckluc3RhbmNlXX0pXG5dKTtcblxuZnVuY3Rpb24gaW5pdFdlYldvcmtlckFwcGxpY2F0aW9uKGluamVjdG9yOiBJbmplY3Rvcik6IHZvaWQge1xuICB2YXIgc2NyaXB0VXJpOiBzdHJpbmc7XG4gIHRyeSB7XG4gICAgc2NyaXB0VXJpID0gaW5qZWN0b3IuZ2V0KFdPUktFUl9TQ1JJUFQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgIFwiWW91IG11c3QgcHJvdmlkZSB5b3VyIFdlYldvcmtlcidzIGluaXRpYWxpemF0aW9uIHNjcmlwdCB3aXRoIHRoZSBXT1JLRVJfU0NSSVBUIHRva2VuXCIpO1xuICB9XG5cbiAgbGV0IGluc3RhbmNlID0gaW5qZWN0b3IuZ2V0KFdlYldvcmtlckluc3RhbmNlKTtcbiAgc3Bhd25XZWJXb3JrZXIoc2NyaXB0VXJpLCBpbnN0YW5jZSk7XG5cbiAgaW5pdGlhbGl6ZUdlbmVyaWNXb3JrZXJSZW5kZXJlcihpbmplY3Rvcik7XG59XG5cbi8qKlxuICogU3Bhd25zIGEgbmV3IGNsYXNzIGFuZCBpbml0aWFsaXplcyB0aGUgV2ViV29ya2VySW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gc3Bhd25XZWJXb3JrZXIodXJpOiBzdHJpbmcsIGluc3RhbmNlOiBXZWJXb3JrZXJJbnN0YW5jZSk6IHZvaWQge1xuICB2YXIgd2ViV29ya2VyOiBXb3JrZXIgPSBuZXcgV29ya2VyKHVyaSk7XG4gIHZhciBzaW5rID0gbmV3IFBvc3RNZXNzYWdlQnVzU2luayh3ZWJXb3JrZXIpO1xuICB2YXIgc291cmNlID0gbmV3IFBvc3RNZXNzYWdlQnVzU291cmNlKHdlYldvcmtlcik7XG4gIHZhciBidXMgPSBuZXcgUG9zdE1lc3NhZ2VCdXMoc2luaywgc291cmNlKTtcblxuICBpbnN0YW5jZS5pbml0KHdlYldvcmtlciwgYnVzKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
