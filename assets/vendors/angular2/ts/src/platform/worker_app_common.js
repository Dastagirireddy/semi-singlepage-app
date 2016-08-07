System.register(['angular2/src/compiler/xhr', 'angular2/src/web_workers/worker/xhr_impl', 'angular2/src/web_workers/worker/renderer', 'angular2/src/facade/lang', 'angular2/src/core/render/api', 'angular2/core', "angular2/common", 'angular2/src/web_workers/shared/client_message_broker', 'angular2/src/web_workers/shared/service_message_broker', "angular2/src/web_workers/shared/serializer", "angular2/src/web_workers/shared/api", 'angular2/src/core/di', 'angular2/src/web_workers/shared/render_store'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var xhr_1, xhr_impl_1, renderer_1, lang_1, api_1, core_1, common_1, client_message_broker_1, service_message_broker_1, serializer_1, api_2, di_1, render_store_1;
    var PrintLogger, WORKER_APP_PLATFORM_MARKER, WORKER_APP_PLATFORM, WORKER_APP_APPLICATION_COMMON;
    function _exceptionHandler() {
        return new core_1.ExceptionHandler(new PrintLogger());
    }
    return {
        setters:[
            function (xhr_1_1) {
                xhr_1 = xhr_1_1;
            },
            function (xhr_impl_1_1) {
                xhr_impl_1 = xhr_impl_1_1;
            },
            function (renderer_1_1) {
                renderer_1 = renderer_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (api_1_1) {
                api_1 = api_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (client_message_broker_1_1) {
                client_message_broker_1 = client_message_broker_1_1;
            },
            function (service_message_broker_1_1) {
                service_message_broker_1 = service_message_broker_1_1;
            },
            function (serializer_1_1) {
                serializer_1 = serializer_1_1;
            },
            function (api_2_1) {
                api_2 = api_2_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (render_store_1_1) {
                render_store_1 = render_store_1_1;
            }],
        execute: function() {
            PrintLogger = (function () {
                function PrintLogger() {
                    this.log = lang_1.print;
                    this.logError = lang_1.print;
                    this.logGroup = lang_1.print;
                }
                PrintLogger.prototype.logGroupEnd = function () { };
                return PrintLogger;
            }());
            exports_1("WORKER_APP_PLATFORM_MARKER", WORKER_APP_PLATFORM_MARKER = lang_1.CONST_EXPR(new core_1.OpaqueToken('WorkerAppPlatformMarker')));
            exports_1("WORKER_APP_PLATFORM", WORKER_APP_PLATFORM = lang_1.CONST_EXPR([
                core_1.PLATFORM_COMMON_PROVIDERS,
                lang_1.CONST_EXPR(new di_1.Provider(WORKER_APP_PLATFORM_MARKER, { useValue: true }))
            ]));
            exports_1("WORKER_APP_APPLICATION_COMMON", WORKER_APP_APPLICATION_COMMON = lang_1.CONST_EXPR([
                core_1.APPLICATION_COMMON_PROVIDERS,
                common_1.FORM_PROVIDERS,
                serializer_1.Serializer,
                new di_1.Provider(core_1.PLATFORM_PIPES, { useValue: common_1.COMMON_PIPES, multi: true }),
                new di_1.Provider(core_1.PLATFORM_DIRECTIVES, { useValue: common_1.COMMON_DIRECTIVES, multi: true }),
                new di_1.Provider(client_message_broker_1.ClientMessageBrokerFactory, { useClass: client_message_broker_1.ClientMessageBrokerFactory_ }),
                new di_1.Provider(service_message_broker_1.ServiceMessageBrokerFactory, { useClass: service_message_broker_1.ServiceMessageBrokerFactory_ }),
                renderer_1.WebWorkerRootRenderer,
                new di_1.Provider(api_1.RootRenderer, { useExisting: renderer_1.WebWorkerRootRenderer }),
                new di_1.Provider(api_2.ON_WEB_WORKER, { useValue: true }),
                render_store_1.RenderStore,
                new di_1.Provider(core_1.ExceptionHandler, { useFactory: _exceptionHandler, deps: [] }),
                xhr_impl_1.WebWorkerXHRImpl,
                new di_1.Provider(xhr_1.XHR, { useExisting: xhr_impl_1.WebWorkerXHRImpl })
            ]));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS93b3JrZXJfYXBwX2NvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O3FCQWtDYSwwQkFBMEIsRUFFMUIsbUJBQW1CLEVBS25CLDZCQUE2QjtJQWlCMUM7UUFDRSxNQUFNLENBQUMsSUFBSSx1QkFBZ0IsQ0FBQyxJQUFJLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDakQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQWpDRDtnQkFBQTtvQkFDRSxRQUFHLEdBQUcsWUFBSyxDQUFDO29CQUNaLGFBQVEsR0FBRyxZQUFLLENBQUM7b0JBQ2pCLGFBQVEsR0FBRyxZQUFLLENBQUM7Z0JBRW5CLENBQUM7Z0JBREMsaUNBQVcsR0FBWCxjQUFlLENBQUM7Z0JBQ2xCLGtCQUFDO1lBQUQsQ0FMQSxBQUtDLElBQUE7WUFFWSx3Q0FBQSwwQkFBMEIsR0FBRyxpQkFBVSxDQUFDLElBQUksa0JBQVcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUEsQ0FBQztZQUVwRixpQ0FBQSxtQkFBbUIsR0FBMkMsaUJBQVUsQ0FBQztnQkFDcEYsZ0NBQXlCO2dCQUN6QixpQkFBVSxDQUFDLElBQUksYUFBUSxDQUFDLDBCQUEwQixFQUFFLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7YUFDdkUsQ0FBQyxDQUFBLENBQUM7WUFFVSwyQ0FBQSw2QkFBNkIsR0FBMkMsaUJBQVUsQ0FBQztnQkFDOUYsbUNBQTRCO2dCQUM1Qix1QkFBYztnQkFDZCx1QkFBVTtnQkFDVixJQUFJLGFBQVEsQ0FBQyxxQkFBYyxFQUFFLEVBQUMsUUFBUSxFQUFFLHFCQUFZLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDO2dCQUNuRSxJQUFJLGFBQVEsQ0FBQywwQkFBbUIsRUFBRSxFQUFDLFFBQVEsRUFBRSwwQkFBaUIsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUM7Z0JBQzdFLElBQUksYUFBUSxDQUFDLGtEQUEwQixFQUFFLEVBQUMsUUFBUSxFQUFFLG1EQUEyQixFQUFDLENBQUM7Z0JBQ2pGLElBQUksYUFBUSxDQUFDLG9EQUEyQixFQUFFLEVBQUMsUUFBUSxFQUFFLHFEQUE0QixFQUFDLENBQUM7Z0JBQ25GLGdDQUFxQjtnQkFDckIsSUFBSSxhQUFRLENBQUMsa0JBQVksRUFBRSxFQUFDLFdBQVcsRUFBRSxnQ0FBcUIsRUFBQyxDQUFDO2dCQUNoRSxJQUFJLGFBQVEsQ0FBQyxtQkFBYSxFQUFFLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDO2dCQUM3QywwQkFBVztnQkFDWCxJQUFJLGFBQVEsQ0FBQyx1QkFBZ0IsRUFBRSxFQUFDLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDLENBQUM7Z0JBQ3pFLDJCQUFnQjtnQkFDaEIsSUFBSSxhQUFRLENBQUMsU0FBRyxFQUFFLEVBQUMsV0FBVyxFQUFFLDJCQUFnQixFQUFDLENBQUM7YUFDbkQsQ0FBQyxDQUFBLENBQUMiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL3dvcmtlcl9hcHBfY29tbW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtYSFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci94aHInO1xuaW1wb3J0IHtXZWJXb3JrZXJYSFJJbXBsfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvd29ya2VyL3hocl9pbXBsJztcbmltcG9ydCB7V2ViV29ya2VyUm9vdFJlbmRlcmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvd29ya2VyL3JlbmRlcmVyJztcbmltcG9ydCB7cHJpbnQsIFR5cGUsIENPTlNUX0VYUFIsIGlzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7Um9vdFJlbmRlcmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9yZW5kZXIvYXBpJztcbmltcG9ydCB7XG4gIFBMQVRGT1JNX0RJUkVDVElWRVMsXG4gIFBMQVRGT1JNX1BJUEVTLFxuICBFeGNlcHRpb25IYW5kbGVyLFxuICBBUFBMSUNBVElPTl9DT01NT05fUFJPVklERVJTLFxuICBQTEFURk9STV9DT01NT05fUFJPVklERVJTLFxuICBPcGFxdWVUb2tlblxufSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Q09NTU9OX0RJUkVDVElWRVMsIENPTU1PTl9QSVBFUywgRk9STV9QUk9WSURFUlN9IGZyb20gXCJhbmd1bGFyMi9jb21tb25cIjtcbmltcG9ydCB7XG4gIENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5LFxuICBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeV9cbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9jbGllbnRfbWVzc2FnZV9icm9rZXInO1xuaW1wb3J0IHtcbiAgU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5LFxuICBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnlfXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvc2VydmljZV9tZXNzYWdlX2Jyb2tlcic7XG5pbXBvcnQge1NlcmlhbGl6ZXJ9IGZyb20gXCJhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXJcIjtcbmltcG9ydCB7T05fV0VCX1dPUktFUn0gZnJvbSBcImFuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvYXBpXCI7XG5pbXBvcnQge1Byb3ZpZGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge1JlbmRlclN0b3JlfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3JlbmRlcl9zdG9yZSc7XG5cbmNsYXNzIFByaW50TG9nZ2VyIHtcbiAgbG9nID0gcHJpbnQ7XG4gIGxvZ0Vycm9yID0gcHJpbnQ7XG4gIGxvZ0dyb3VwID0gcHJpbnQ7XG4gIGxvZ0dyb3VwRW5kKCkge31cbn1cblxuZXhwb3J0IGNvbnN0IFdPUktFUl9BUFBfUExBVEZPUk1fTUFSS0VSID0gQ09OU1RfRVhQUihuZXcgT3BhcXVlVG9rZW4oJ1dvcmtlckFwcFBsYXRmb3JtTWFya2VyJykpO1xuXG5leHBvcnQgY29uc3QgV09SS0VSX0FQUF9QTEFURk9STTogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPSBDT05TVF9FWFBSKFtcbiAgUExBVEZPUk1fQ09NTU9OX1BST1ZJREVSUyxcbiAgQ09OU1RfRVhQUihuZXcgUHJvdmlkZXIoV09SS0VSX0FQUF9QTEFURk9STV9NQVJLRVIsIHt1c2VWYWx1ZTogdHJ1ZX0pKVxuXSk7XG5cbmV4cG9ydCBjb25zdCBXT1JLRVJfQVBQX0FQUExJQ0FUSU9OX0NPTU1PTjogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPSBDT05TVF9FWFBSKFtcbiAgQVBQTElDQVRJT05fQ09NTU9OX1BST1ZJREVSUyxcbiAgRk9STV9QUk9WSURFUlMsXG4gIFNlcmlhbGl6ZXIsXG4gIG5ldyBQcm92aWRlcihQTEFURk9STV9QSVBFUywge3VzZVZhbHVlOiBDT01NT05fUElQRVMsIG11bHRpOiB0cnVlfSksXG4gIG5ldyBQcm92aWRlcihQTEFURk9STV9ESVJFQ1RJVkVTLCB7dXNlVmFsdWU6IENPTU1PTl9ESVJFQ1RJVkVTLCBtdWx0aTogdHJ1ZX0pLFxuICBuZXcgUHJvdmlkZXIoQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnksIHt1c2VDbGFzczogQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnlffSksXG4gIG5ldyBQcm92aWRlcihTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnksIHt1c2VDbGFzczogU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5X30pLFxuICBXZWJXb3JrZXJSb290UmVuZGVyZXIsXG4gIG5ldyBQcm92aWRlcihSb290UmVuZGVyZXIsIHt1c2VFeGlzdGluZzogV2ViV29ya2VyUm9vdFJlbmRlcmVyfSksXG4gIG5ldyBQcm92aWRlcihPTl9XRUJfV09SS0VSLCB7dXNlVmFsdWU6IHRydWV9KSxcbiAgUmVuZGVyU3RvcmUsXG4gIG5ldyBQcm92aWRlcihFeGNlcHRpb25IYW5kbGVyLCB7dXNlRmFjdG9yeTogX2V4Y2VwdGlvbkhhbmRsZXIsIGRlcHM6IFtdfSksXG4gIFdlYldvcmtlclhIUkltcGwsXG4gIG5ldyBQcm92aWRlcihYSFIsIHt1c2VFeGlzdGluZzogV2ViV29ya2VyWEhSSW1wbH0pXG5dKTtcblxuZnVuY3Rpb24gX2V4Y2VwdGlvbkhhbmRsZXIoKTogRXhjZXB0aW9uSGFuZGxlciB7XG4gIHJldHVybiBuZXcgRXhjZXB0aW9uSGFuZGxlcihuZXcgUHJpbnRMb2dnZXIoKSk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
