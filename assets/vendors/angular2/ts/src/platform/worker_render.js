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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS93b3JrZXJfcmVuZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7MkJBc0NhLHlCQUF5QjtJQVl0QyxrQ0FBa0MsUUFBa0I7UUFDbEQsSUFBSSxTQUFpQixDQUFDO1FBQ3RCLElBQUksQ0FBQztZQUNILFNBQVMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLG9DQUFhLENBQUMsQ0FBQztRQUMxQyxDQUFFO1FBQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNYLE1BQU0sSUFBSSwwQkFBYSxDQUNuQixzRkFBc0YsQ0FBQyxDQUFDO1FBQzlGLENBQUM7UUFFRCxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDL0MsY0FBYyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUVwQyxzREFBK0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCx3QkFBd0IsR0FBVyxFQUFFLFFBQTJCO1FBQzlELElBQUksU0FBUyxHQUFXLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLElBQUksSUFBSSxHQUFHLElBQUkscUNBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0MsSUFBSSxNQUFNLEdBQUcsSUFBSSx1Q0FBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqRCxJQUFJLEdBQUcsR0FBRyxJQUFJLGlDQUFjLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTNDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUF4REQ7OztlQUdHO1lBRUg7Z0JBQUE7Z0JBU0EsQ0FBQztnQkFMQyxnQkFBZ0I7Z0JBQ1QsZ0NBQUksR0FBWCxVQUFZLE1BQWMsRUFBRSxHQUFlO29CQUN6QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztvQkFDckIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7Z0JBQ2pCLENBQUM7Z0JBVEg7b0JBQUMsZUFBVSxFQUFFOztxQ0FBQTtnQkFVYix3QkFBQztZQUFELENBVEEsQUFTQyxJQUFBO1lBVEQsaURBU0MsQ0FBQTtZQUVEOztlQUVHO1lBQ1UsdUNBQUEseUJBQXlCLEdBQTJDLGlCQUFVLENBQUM7Z0JBQzFGLHVEQUFnQztnQkFDaEMsaUJBQWlCO2dCQUNqQixJQUFJLGFBQVEsQ0FBQyxzQkFBZSxFQUNmO29CQUNFLFVBQVUsRUFBRSxVQUFDLFFBQVEsSUFBSyxPQUFBLGNBQU0sT0FBQSx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsRUFBbEMsQ0FBa0MsRUFBeEMsQ0FBd0M7b0JBQ2xFLEtBQUssRUFBRSxJQUFJO29CQUNYLElBQUksRUFBRSxDQUFDLGFBQVEsQ0FBQztpQkFDakIsQ0FBQztnQkFDZixJQUFJLGFBQVEsQ0FBQyx3QkFBVSxFQUFFLEVBQUMsVUFBVSxFQUFFLFVBQUMsUUFBUSxJQUFLLE9BQUEsUUFBUSxDQUFDLEdBQUcsRUFBWixDQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsaUJBQWlCLENBQUMsRUFBQyxDQUFDO2FBQzlGLENBQUMsQ0FBQSxDQUFDIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS93b3JrZXJfcmVuZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUG9zdE1lc3NhZ2VCdXMsXG4gIFBvc3RNZXNzYWdlQnVzU2luayxcbiAgUG9zdE1lc3NhZ2VCdXNTb3VyY2Vcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9wb3N0X21lc3NhZ2VfYnVzJztcbmltcG9ydCB7TWVzc2FnZUJ1c30gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge0FQUF9JTklUSUFMSVpFUn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0luamVjdG9yLCBJbmplY3RhYmxlLCBQcm92aWRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtNZXNzYWdlQmFzZWRSZW5kZXJlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3VpL3JlbmRlcmVyJztcbmltcG9ydCB7TWVzc2FnZUJhc2VkWEhSSW1wbH0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3VpL3hocl9pbXBsJztcbmltcG9ydCB7XG4gIFdPUktFUl9SRU5ERVJfQVBQTElDQVRJT05fQ09NTU9OLFxuICBXT1JLRVJfUkVOREVSX01FU1NBR0lOR19QUk9WSURFUlMsXG4gIFdPUktFUl9TQ1JJUFQsXG4gIGluaXRpYWxpemVHZW5lcmljV29ya2VyUmVuZGVyZXJcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL3dvcmtlcl9yZW5kZXJfY29tbW9uJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7Q09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuLyoqXG4gKiBXcmFwcGVyIGNsYXNzIHRoYXQgZXhwb3NlcyB0aGUgV29ya2VyXG4gKiBhbmQgdW5kZXJseWluZyB7QGxpbmsgTWVzc2FnZUJ1c30gZm9yIGxvd2VyIGxldmVsIG1lc3NhZ2UgcGFzc2luZy5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFdlYldvcmtlckluc3RhbmNlIHtcbiAgcHVibGljIHdvcmtlcjogV29ya2VyO1xuICBwdWJsaWMgYnVzOiBNZXNzYWdlQnVzO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHVibGljIGluaXQod29ya2VyOiBXb3JrZXIsIGJ1czogTWVzc2FnZUJ1cykge1xuICAgIHRoaXMud29ya2VyID0gd29ya2VyO1xuICAgIHRoaXMuYnVzID0gYnVzO1xuICB9XG59XG5cbi8qKlxuICogQW4gYXJyYXkgb2YgcHJvdmlkZXJzIHRoYXQgc2hvdWxkIGJlIHBhc3NlZCBpbnRvIGBhcHBsaWNhdGlvbigpYCB3aGVuIGluaXRpYWxpemluZyBhIG5ldyBXb3JrZXIuXG4gKi9cbmV4cG9ydCBjb25zdCBXT1JLRVJfUkVOREVSX0FQUExJQ0FUSU9OOiBBcnJheTxhbnkgLypUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXSovPiA9IENPTlNUX0VYUFIoW1xuICBXT1JLRVJfUkVOREVSX0FQUExJQ0FUSU9OX0NPTU1PTixcbiAgV2ViV29ya2VySW5zdGFuY2UsXG4gIG5ldyBQcm92aWRlcihBUFBfSU5JVElBTElaRVIsXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIHVzZUZhY3Rvcnk6IChpbmplY3RvcikgPT4gKCkgPT4gaW5pdFdlYldvcmtlckFwcGxpY2F0aW9uKGluamVjdG9yKSxcbiAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgICAgICAgICAgIGRlcHM6IFtJbmplY3Rvcl1cbiAgICAgICAgICAgICAgIH0pLFxuICBuZXcgUHJvdmlkZXIoTWVzc2FnZUJ1cywge3VzZUZhY3Rvcnk6IChpbnN0YW5jZSkgPT4gaW5zdGFuY2UuYnVzLCBkZXBzOiBbV2ViV29ya2VySW5zdGFuY2VdfSlcbl0pO1xuXG5mdW5jdGlvbiBpbml0V2ViV29ya2VyQXBwbGljYXRpb24oaW5qZWN0b3I6IEluamVjdG9yKTogdm9pZCB7XG4gIHZhciBzY3JpcHRVcmk6IHN0cmluZztcbiAgdHJ5IHtcbiAgICBzY3JpcHRVcmkgPSBpbmplY3Rvci5nZXQoV09SS0VSX1NDUklQVCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcbiAgICAgICAgXCJZb3UgbXVzdCBwcm92aWRlIHlvdXIgV2ViV29ya2VyJ3MgaW5pdGlhbGl6YXRpb24gc2NyaXB0IHdpdGggdGhlIFdPUktFUl9TQ1JJUFQgdG9rZW5cIik7XG4gIH1cblxuICBsZXQgaW5zdGFuY2UgPSBpbmplY3Rvci5nZXQoV2ViV29ya2VySW5zdGFuY2UpO1xuICBzcGF3bldlYldvcmtlcihzY3JpcHRVcmksIGluc3RhbmNlKTtcblxuICBpbml0aWFsaXplR2VuZXJpY1dvcmtlclJlbmRlcmVyKGluamVjdG9yKTtcbn1cblxuLyoqXG4gKiBTcGF3bnMgYSBuZXcgY2xhc3MgYW5kIGluaXRpYWxpemVzIHRoZSBXZWJXb3JrZXJJbnN0YW5jZVxuICovXG5mdW5jdGlvbiBzcGF3bldlYldvcmtlcih1cmk6IHN0cmluZywgaW5zdGFuY2U6IFdlYldvcmtlckluc3RhbmNlKTogdm9pZCB7XG4gIHZhciB3ZWJXb3JrZXI6IFdvcmtlciA9IG5ldyBXb3JrZXIodXJpKTtcbiAgdmFyIHNpbmsgPSBuZXcgUG9zdE1lc3NhZ2VCdXNTaW5rKHdlYldvcmtlcik7XG4gIHZhciBzb3VyY2UgPSBuZXcgUG9zdE1lc3NhZ2VCdXNTb3VyY2Uod2ViV29ya2VyKTtcbiAgdmFyIGJ1cyA9IG5ldyBQb3N0TWVzc2FnZUJ1cyhzaW5rLCBzb3VyY2UpO1xuXG4gIGluc3RhbmNlLmluaXQod2ViV29ya2VyLCBidXMpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
