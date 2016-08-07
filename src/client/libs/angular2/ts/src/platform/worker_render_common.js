System.register(['angular2/src/facade/lang', 'angular2/src/web_workers/shared/message_bus', 'angular2/src/core/zone/ng_zone', 'angular2/core', 'angular2/platform/common_dom', 'angular2/src/core/di', 'angular2/src/platform/dom/dom_adapter', 'angular2/src/platform/dom/events/dom_events', 'angular2/src/platform/dom/events/key_events', 'angular2/src/platform/dom/events/hammer_gestures', 'angular2/src/platform/dom/dom_tokens', 'angular2/src/platform/dom/dom_renderer', 'angular2/src/platform/dom/shared_styles_host', 'angular2/src/animate/browser_details', 'angular2/src/animate/animation_builder', 'angular2/compiler', 'angular2/src/platform/browser/xhr_impl', 'angular2/src/core/testability/testability', 'angular2/src/platform/browser/testability', './browser/browser_adapter', 'angular2/src/core/profile/wtf_init', 'angular2/src/web_workers/ui/renderer', 'angular2/src/web_workers/ui/xhr_impl', 'angular2/src/router/location/browser_platform_location', 'angular2/src/web_workers/shared/service_message_broker', 'angular2/src/web_workers/shared/client_message_broker', 'angular2/src/web_workers/shared/serializer', 'angular2/src/web_workers/shared/api', 'angular2/src/web_workers/shared/render_store'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, message_bus_1, ng_zone_1, core_1, common_dom_1, di_1, dom_adapter_1, dom_events_1, key_events_1, hammer_gestures_1, dom_tokens_1, dom_renderer_1, shared_styles_host_1, shared_styles_host_2, browser_details_1, animation_builder_1, compiler_1, xhr_impl_1, testability_1, testability_2, browser_adapter_1, wtf_init_1, renderer_1, xhr_impl_2, browser_platform_location_1, service_message_broker_1, client_message_broker_1, serializer_1, api_1, render_store_1;
    var WORKER_SCRIPT, WORKER_RENDER_MESSAGING_PROVIDERS, WORKER_RENDER_PLATFORM, WORKER_RENDER_ROUTER, WORKER_RENDER_APPLICATION_COMMON;
    function initializeGenericWorkerRenderer(injector) {
        var bus = injector.get(message_bus_1.MessageBus);
        var zone = injector.get(ng_zone_1.NgZone);
        bus.attachToZone(zone);
        zone.run(function () {
            WORKER_RENDER_MESSAGING_PROVIDERS.forEach(function (token) { injector.get(token).start(); });
        });
    }
    exports_1("initializeGenericWorkerRenderer", initializeGenericWorkerRenderer);
    function initWebWorkerRenderPlatform() {
        browser_adapter_1.BrowserDomAdapter.makeCurrent();
        wtf_init_1.wtfInit();
        testability_2.BrowserGetTestability.init();
    }
    exports_1("initWebWorkerRenderPlatform", initWebWorkerRenderPlatform);
    function _exceptionHandler() {
        return new core_1.ExceptionHandler(dom_adapter_1.DOM, !lang_1.IS_DART);
    }
    function _document() {
        return dom_adapter_1.DOM.defaultDoc();
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (message_bus_1_1) {
                message_bus_1 = message_bus_1_1;
            },
            function (ng_zone_1_1) {
                ng_zone_1 = ng_zone_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_dom_1_1) {
                common_dom_1 = common_dom_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            },
            function (dom_events_1_1) {
                dom_events_1 = dom_events_1_1;
            },
            function (key_events_1_1) {
                key_events_1 = key_events_1_1;
            },
            function (hammer_gestures_1_1) {
                hammer_gestures_1 = hammer_gestures_1_1;
            },
            function (dom_tokens_1_1) {
                dom_tokens_1 = dom_tokens_1_1;
            },
            function (dom_renderer_1_1) {
                dom_renderer_1 = dom_renderer_1_1;
            },
            function (shared_styles_host_1_1) {
                shared_styles_host_1 = shared_styles_host_1_1;
                shared_styles_host_2 = shared_styles_host_1_1;
            },
            function (browser_details_1_1) {
                browser_details_1 = browser_details_1_1;
            },
            function (animation_builder_1_1) {
                animation_builder_1 = animation_builder_1_1;
            },
            function (compiler_1_1) {
                compiler_1 = compiler_1_1;
            },
            function (xhr_impl_1_1) {
                xhr_impl_1 = xhr_impl_1_1;
            },
            function (testability_1_1) {
                testability_1 = testability_1_1;
            },
            function (testability_2_1) {
                testability_2 = testability_2_1;
            },
            function (browser_adapter_1_1) {
                browser_adapter_1 = browser_adapter_1_1;
            },
            function (wtf_init_1_1) {
                wtf_init_1 = wtf_init_1_1;
            },
            function (renderer_1_1) {
                renderer_1 = renderer_1_1;
            },
            function (xhr_impl_2_1) {
                xhr_impl_2 = xhr_impl_2_1;
            },
            function (browser_platform_location_1_1) {
                browser_platform_location_1 = browser_platform_location_1_1;
            },
            function (service_message_broker_1_1) {
                service_message_broker_1 = service_message_broker_1_1;
            },
            function (client_message_broker_1_1) {
                client_message_broker_1 = client_message_broker_1_1;
            },
            function (serializer_1_1) {
                serializer_1 = serializer_1_1;
            },
            function (api_1_1) {
                api_1 = api_1_1;
            },
            function (render_store_1_1) {
                render_store_1 = render_store_1_1;
            }],
        execute: function() {
            exports_1("WORKER_SCRIPT", WORKER_SCRIPT = lang_1.CONST_EXPR(new di_1.OpaqueToken("WebWorkerScript")));
            // Message based Worker classes that listen on the MessageBus
            exports_1("WORKER_RENDER_MESSAGING_PROVIDERS", WORKER_RENDER_MESSAGING_PROVIDERS = lang_1.CONST_EXPR([renderer_1.MessageBasedRenderer, xhr_impl_2.MessageBasedXHRImpl]));
            exports_1("WORKER_RENDER_PLATFORM", WORKER_RENDER_PLATFORM = lang_1.CONST_EXPR([
                core_1.PLATFORM_COMMON_PROVIDERS,
                new di_1.Provider(core_1.PLATFORM_INITIALIZER, { useValue: initWebWorkerRenderPlatform, multi: true })
            ]));
            /**
             * A list of {@link Provider}s. To use the router in a Worker enabled application you must
             * include these providers when setting up the render thread.
             */
            exports_1("WORKER_RENDER_ROUTER", WORKER_RENDER_ROUTER = lang_1.CONST_EXPR([browser_platform_location_1.BrowserPlatformLocation]));
            exports_1("WORKER_RENDER_APPLICATION_COMMON", WORKER_RENDER_APPLICATION_COMMON = lang_1.CONST_EXPR([
                core_1.APPLICATION_COMMON_PROVIDERS,
                WORKER_RENDER_MESSAGING_PROVIDERS,
                new di_1.Provider(core_1.ExceptionHandler, { useFactory: _exceptionHandler, deps: [] }),
                new di_1.Provider(dom_tokens_1.DOCUMENT, { useFactory: _document, deps: [] }),
                // TODO(jteplitz602): Investigate if we definitely need EVENT_MANAGER on the render thread
                // #5298
                new di_1.Provider(common_dom_1.EVENT_MANAGER_PLUGINS, { useClass: dom_events_1.DomEventsPlugin, multi: true }),
                new di_1.Provider(common_dom_1.EVENT_MANAGER_PLUGINS, { useClass: key_events_1.KeyEventsPlugin, multi: true }),
                new di_1.Provider(common_dom_1.EVENT_MANAGER_PLUGINS, { useClass: hammer_gestures_1.HammerGesturesPlugin, multi: true }),
                new di_1.Provider(dom_renderer_1.DomRootRenderer, { useClass: dom_renderer_1.DomRootRenderer_ }),
                new di_1.Provider(core_1.RootRenderer, { useExisting: dom_renderer_1.DomRootRenderer }),
                new di_1.Provider(shared_styles_host_2.SharedStylesHost, { useExisting: shared_styles_host_1.DomSharedStylesHost }),
                new di_1.Provider(compiler_1.XHR, { useClass: xhr_impl_1.XHRImpl }),
                xhr_impl_2.MessageBasedXHRImpl,
                new di_1.Provider(service_message_broker_1.ServiceMessageBrokerFactory, { useClass: service_message_broker_1.ServiceMessageBrokerFactory_ }),
                new di_1.Provider(client_message_broker_1.ClientMessageBrokerFactory, { useClass: client_message_broker_1.ClientMessageBrokerFactory_ }),
                serializer_1.Serializer,
                new di_1.Provider(api_1.ON_WEB_WORKER, { useValue: false }),
                render_store_1.RenderStore,
                shared_styles_host_1.DomSharedStylesHost,
                testability_1.Testability,
                browser_details_1.BrowserDetails,
                animation_builder_1.AnimationBuilder,
                common_dom_1.EventManager
            ]));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL3dvcmtlcl9yZW5kZXJfY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFtRGEsYUFBYSxFQUdiLGlDQUFpQyxFQUdqQyxzQkFBc0IsRUFTdEIsb0JBQW9CLEVBR3BCLGdDQUFnQztJQTJCN0MseUNBQWdELFFBQWtCO1FBQ2hFLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsd0JBQVUsQ0FBQyxDQUFDO1FBQ25DLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsZ0JBQU0sQ0FBQyxDQUFDO1FBQ2hDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkIsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUNQLGlDQUFpQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUssSUFBTyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekYsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBUkQsNkVBUUMsQ0FBQTtJQUVEO1FBQ0UsbUNBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDaEMsa0JBQU8sRUFBRSxDQUFDO1FBQ1YsbUNBQXFCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUpELHFFQUlDLENBQUE7SUFFRDtRQUNFLE1BQU0sQ0FBQyxJQUFJLHVCQUFnQixDQUFDLGlCQUFHLEVBQUUsQ0FBQyxjQUFPLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7UUFDRSxNQUFNLENBQUMsaUJBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMxQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQW5FWSwyQkFBQSxhQUFhLEdBQWdCLGlCQUFVLENBQUMsSUFBSSxnQkFBVyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQSxDQUFDO1lBRXpGLDZEQUE2RDtZQUNoRCwrQ0FBQSxpQ0FBaUMsR0FDMUMsaUJBQVUsQ0FBQyxDQUFDLCtCQUFvQixFQUFFLDhCQUFtQixDQUFDLENBQUMsQ0FBQSxDQUFDO1lBRS9DLG9DQUFBLHNCQUFzQixHQUEyQyxpQkFBVSxDQUFDO2dCQUN2RixnQ0FBeUI7Z0JBQ3pCLElBQUksYUFBUSxDQUFDLDJCQUFvQixFQUFFLEVBQUMsUUFBUSxFQUFFLDJCQUEyQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQzthQUN6RixDQUFDLENBQUEsQ0FBQztZQUVIOzs7ZUFHRztZQUNVLGtDQUFBLG9CQUFvQixHQUM3QixpQkFBVSxDQUFDLENBQUMsbURBQXVCLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFFN0IsOENBQUEsZ0NBQWdDLEdBQTJDLGlCQUFVLENBQUM7Z0JBQ2pHLG1DQUE0QjtnQkFDNUIsaUNBQWlDO2dCQUNqQyxJQUFJLGFBQVEsQ0FBQyx1QkFBZ0IsRUFBRSxFQUFDLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDLENBQUM7Z0JBQ3pFLElBQUksYUFBUSxDQUFDLHFCQUFRLEVBQUUsRUFBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUMsQ0FBQztnQkFDekQsMEZBQTBGO2dCQUMxRixRQUFRO2dCQUNSLElBQUksYUFBUSxDQUFDLGtDQUFxQixFQUFFLEVBQUMsUUFBUSxFQUFFLDRCQUFlLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDO2dCQUM3RSxJQUFJLGFBQVEsQ0FBQyxrQ0FBcUIsRUFBRSxFQUFDLFFBQVEsRUFBRSw0QkFBZSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQztnQkFDN0UsSUFBSSxhQUFRLENBQUMsa0NBQXFCLEVBQUUsRUFBQyxRQUFRLEVBQUUsc0NBQW9CLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDO2dCQUNsRixJQUFJLGFBQVEsQ0FBQyw4QkFBZSxFQUFFLEVBQUMsUUFBUSxFQUFFLCtCQUFnQixFQUFDLENBQUM7Z0JBQzNELElBQUksYUFBUSxDQUFDLG1CQUFZLEVBQUUsRUFBQyxXQUFXLEVBQUUsOEJBQWUsRUFBQyxDQUFDO2dCQUMxRCxJQUFJLGFBQVEsQ0FBQyxxQ0FBZ0IsRUFBRSxFQUFDLFdBQVcsRUFBRSx3Q0FBbUIsRUFBQyxDQUFDO2dCQUNsRSxJQUFJLGFBQVEsQ0FBQyxjQUFHLEVBQUUsRUFBQyxRQUFRLEVBQUUsa0JBQU8sRUFBQyxDQUFDO2dCQUN0Qyw4QkFBbUI7Z0JBQ25CLElBQUksYUFBUSxDQUFDLG9EQUEyQixFQUFFLEVBQUMsUUFBUSxFQUFFLHFEQUE0QixFQUFDLENBQUM7Z0JBQ25GLElBQUksYUFBUSxDQUFDLGtEQUEwQixFQUFFLEVBQUMsUUFBUSxFQUFFLG1EQUEyQixFQUFDLENBQUM7Z0JBQ2pGLHVCQUFVO2dCQUNWLElBQUksYUFBUSxDQUFDLG1CQUFhLEVBQUUsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFDLENBQUM7Z0JBQzlDLDBCQUFXO2dCQUNYLHdDQUFtQjtnQkFDbkIseUJBQVc7Z0JBQ1gsZ0NBQWM7Z0JBQ2Qsb0NBQWdCO2dCQUNoQix5QkFBWTthQUNiLENBQUMsQ0FBQSxDQUFDIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL3dvcmtlcl9yZW5kZXJfY29tbW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDT05TVF9FWFBSLCBJU19EQVJUfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7Tmdab25lfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS96b25lL25nX3pvbmUnO1xuaW1wb3J0IHtcbiAgUExBVEZPUk1fRElSRUNUSVZFUyxcbiAgUExBVEZPUk1fUElQRVMsXG4gIENvbXBvbmVudFJlZixcbiAgcGxhdGZvcm0sXG4gIEV4Y2VwdGlvbkhhbmRsZXIsXG4gIFJlZmxlY3RvcixcbiAgcmVmbGVjdG9yLFxuICBBUFBMSUNBVElPTl9DT01NT05fUFJPVklERVJTLFxuICBQTEFURk9STV9DT01NT05fUFJPVklERVJTLFxuICBSb290UmVuZGVyZXIsXG4gIFBMQVRGT1JNX0lOSVRJQUxJWkVSLFxuICBBUFBfSU5JVElBTElaRVJcbn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0VWRU5UX01BTkFHRVJfUExVR0lOUywgRXZlbnRNYW5hZ2VyfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9jb21tb25fZG9tJztcbmltcG9ydCB7cHJvdmlkZSwgUHJvdmlkZXIsIEluamVjdG9yLCBPcGFxdWVUb2tlbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuLy8gVE9ETyBjaGFuZ2UgdGhlc2UgaW1wb3J0cyBvbmNlIGRvbV9hZGFwdGVyIGlzIG1vdmVkIG91dCBvZiBjb3JlXG5pbXBvcnQge0RPTX0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fYWRhcHRlcic7XG5pbXBvcnQge0RvbUV2ZW50c1BsdWdpbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9ldmVudHMvZG9tX2V2ZW50cyc7XG5pbXBvcnQge0tleUV2ZW50c1BsdWdpbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9ldmVudHMva2V5X2V2ZW50cyc7XG5pbXBvcnQge0hhbW1lckdlc3R1cmVzUGx1Z2lufSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2V2ZW50cy9oYW1tZXJfZ2VzdHVyZXMnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fdG9rZW5zJztcbmltcG9ydCB7RG9tUm9vdFJlbmRlcmVyLCBEb21Sb290UmVuZGVyZXJffSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9yZW5kZXJlcic7XG5pbXBvcnQge0RvbVNoYXJlZFN0eWxlc0hvc3R9IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vc2hhcmVkX3N0eWxlc19ob3N0JztcbmltcG9ydCB7U2hhcmVkU3R5bGVzSG9zdH0gZnJvbSBcImFuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vc2hhcmVkX3N0eWxlc19ob3N0XCI7XG5pbXBvcnQge0Jyb3dzZXJEZXRhaWxzfSBmcm9tICdhbmd1bGFyMi9zcmMvYW5pbWF0ZS9icm93c2VyX2RldGFpbHMnO1xuaW1wb3J0IHtBbmltYXRpb25CdWlsZGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvYW5pbWF0ZS9hbmltYXRpb25fYnVpbGRlcic7XG5pbXBvcnQge1hIUn0gZnJvbSAnYW5ndWxhcjIvY29tcGlsZXInO1xuaW1wb3J0IHtYSFJJbXBsfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vYnJvd3Nlci94aHJfaW1wbCc7XG5pbXBvcnQge1Rlc3RhYmlsaXR5fSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS90ZXN0YWJpbGl0eS90ZXN0YWJpbGl0eSc7XG5pbXBvcnQge0Jyb3dzZXJHZXRUZXN0YWJpbGl0eX0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2Jyb3dzZXIvdGVzdGFiaWxpdHknO1xuaW1wb3J0IHtCcm93c2VyRG9tQWRhcHRlcn0gZnJvbSAnLi9icm93c2VyL2Jyb3dzZXJfYWRhcHRlcic7XG5pbXBvcnQge3d0ZkluaXR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3Byb2ZpbGUvd3RmX2luaXQnO1xuaW1wb3J0IHtNZXNzYWdlQmFzZWRSZW5kZXJlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3VpL3JlbmRlcmVyJztcbmltcG9ydCB7TWVzc2FnZUJhc2VkWEhSSW1wbH0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3VpL3hocl9pbXBsJztcbmltcG9ydCB7QnJvd3NlclBsYXRmb3JtTG9jYXRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9yb3V0ZXIvbG9jYXRpb24vYnJvd3Nlcl9wbGF0Zm9ybV9sb2NhdGlvbic7XG5pbXBvcnQge1xuICBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnksXG4gIFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeV9cbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJ2aWNlX21lc3NhZ2VfYnJva2VyJztcbmltcG9ydCB7XG4gIENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5LFxuICBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeV9cbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9jbGllbnRfbWVzc2FnZV9icm9rZXInO1xuaW1wb3J0IHtTZXJpYWxpemVyfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtPTl9XRUJfV09SS0VSfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL2FwaSc7XG5pbXBvcnQge1JlbmRlclN0b3JlfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3JlbmRlcl9zdG9yZSc7XG5cbmV4cG9ydCBjb25zdCBXT1JLRVJfU0NSSVBUOiBPcGFxdWVUb2tlbiA9IENPTlNUX0VYUFIobmV3IE9wYXF1ZVRva2VuKFwiV2ViV29ya2VyU2NyaXB0XCIpKTtcblxuLy8gTWVzc2FnZSBiYXNlZCBXb3JrZXIgY2xhc3NlcyB0aGF0IGxpc3RlbiBvbiB0aGUgTWVzc2FnZUJ1c1xuZXhwb3J0IGNvbnN0IFdPUktFUl9SRU5ERVJfTUVTU0FHSU5HX1BST1ZJREVSUzogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPVxuICAgIENPTlNUX0VYUFIoW01lc3NhZ2VCYXNlZFJlbmRlcmVyLCBNZXNzYWdlQmFzZWRYSFJJbXBsXSk7XG5cbmV4cG9ydCBjb25zdCBXT1JLRVJfUkVOREVSX1BMQVRGT1JNOiBBcnJheTxhbnkgLypUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXSovPiA9IENPTlNUX0VYUFIoW1xuICBQTEFURk9STV9DT01NT05fUFJPVklERVJTLFxuICBuZXcgUHJvdmlkZXIoUExBVEZPUk1fSU5JVElBTElaRVIsIHt1c2VWYWx1ZTogaW5pdFdlYldvcmtlclJlbmRlclBsYXRmb3JtLCBtdWx0aTogdHJ1ZX0pXG5dKTtcblxuLyoqXG4gKiBBIGxpc3Qgb2Yge0BsaW5rIFByb3ZpZGVyfXMuIFRvIHVzZSB0aGUgcm91dGVyIGluIGEgV29ya2VyIGVuYWJsZWQgYXBwbGljYXRpb24geW91IG11c3RcbiAqIGluY2x1ZGUgdGhlc2UgcHJvdmlkZXJzIHdoZW4gc2V0dGluZyB1cCB0aGUgcmVuZGVyIHRocmVhZC5cbiAqL1xuZXhwb3J0IGNvbnN0IFdPUktFUl9SRU5ERVJfUk9VVEVSOiBBcnJheTxhbnkgLypUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXSovPiA9XG4gICAgQ09OU1RfRVhQUihbQnJvd3NlclBsYXRmb3JtTG9jYXRpb25dKTtcblxuZXhwb3J0IGNvbnN0IFdPUktFUl9SRU5ERVJfQVBQTElDQVRJT05fQ09NTU9OOiBBcnJheTxhbnkgLypUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXSovPiA9IENPTlNUX0VYUFIoW1xuICBBUFBMSUNBVElPTl9DT01NT05fUFJPVklERVJTLFxuICBXT1JLRVJfUkVOREVSX01FU1NBR0lOR19QUk9WSURFUlMsXG4gIG5ldyBQcm92aWRlcihFeGNlcHRpb25IYW5kbGVyLCB7dXNlRmFjdG9yeTogX2V4Y2VwdGlvbkhhbmRsZXIsIGRlcHM6IFtdfSksXG4gIG5ldyBQcm92aWRlcihET0NVTUVOVCwge3VzZUZhY3Rvcnk6IF9kb2N1bWVudCwgZGVwczogW119KSxcbiAgLy8gVE9ETyhqdGVwbGl0ejYwMik6IEludmVzdGlnYXRlIGlmIHdlIGRlZmluaXRlbHkgbmVlZCBFVkVOVF9NQU5BR0VSIG9uIHRoZSByZW5kZXIgdGhyZWFkXG4gIC8vICM1Mjk4XG4gIG5ldyBQcm92aWRlcihFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIHt1c2VDbGFzczogRG9tRXZlbnRzUGx1Z2luLCBtdWx0aTogdHJ1ZX0pLFxuICBuZXcgUHJvdmlkZXIoRVZFTlRfTUFOQUdFUl9QTFVHSU5TLCB7dXNlQ2xhc3M6IEtleUV2ZW50c1BsdWdpbiwgbXVsdGk6IHRydWV9KSxcbiAgbmV3IFByb3ZpZGVyKEVWRU5UX01BTkFHRVJfUExVR0lOUywge3VzZUNsYXNzOiBIYW1tZXJHZXN0dXJlc1BsdWdpbiwgbXVsdGk6IHRydWV9KSxcbiAgbmV3IFByb3ZpZGVyKERvbVJvb3RSZW5kZXJlciwge3VzZUNsYXNzOiBEb21Sb290UmVuZGVyZXJffSksXG4gIG5ldyBQcm92aWRlcihSb290UmVuZGVyZXIsIHt1c2VFeGlzdGluZzogRG9tUm9vdFJlbmRlcmVyfSksXG4gIG5ldyBQcm92aWRlcihTaGFyZWRTdHlsZXNIb3N0LCB7dXNlRXhpc3Rpbmc6IERvbVNoYXJlZFN0eWxlc0hvc3R9KSxcbiAgbmV3IFByb3ZpZGVyKFhIUiwge3VzZUNsYXNzOiBYSFJJbXBsfSksXG4gIE1lc3NhZ2VCYXNlZFhIUkltcGwsXG4gIG5ldyBQcm92aWRlcihTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnksIHt1c2VDbGFzczogU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5X30pLFxuICBuZXcgUHJvdmlkZXIoQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnksIHt1c2VDbGFzczogQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnlffSksXG4gIFNlcmlhbGl6ZXIsXG4gIG5ldyBQcm92aWRlcihPTl9XRUJfV09SS0VSLCB7dXNlVmFsdWU6IGZhbHNlfSksXG4gIFJlbmRlclN0b3JlLFxuICBEb21TaGFyZWRTdHlsZXNIb3N0LFxuICBUZXN0YWJpbGl0eSxcbiAgQnJvd3NlckRldGFpbHMsXG4gIEFuaW1hdGlvbkJ1aWxkZXIsXG4gIEV2ZW50TWFuYWdlclxuXSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplR2VuZXJpY1dvcmtlclJlbmRlcmVyKGluamVjdG9yOiBJbmplY3Rvcikge1xuICB2YXIgYnVzID0gaW5qZWN0b3IuZ2V0KE1lc3NhZ2VCdXMpO1xuICBsZXQgem9uZSA9IGluamVjdG9yLmdldChOZ1pvbmUpO1xuICBidXMuYXR0YWNoVG9ab25lKHpvbmUpO1xuXG4gIHpvbmUucnVuKCgpID0+IHtcbiAgICBXT1JLRVJfUkVOREVSX01FU1NBR0lOR19QUk9WSURFUlMuZm9yRWFjaCgodG9rZW4pID0+IHsgaW5qZWN0b3IuZ2V0KHRva2VuKS5zdGFydCgpOyB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0V2ViV29ya2VyUmVuZGVyUGxhdGZvcm0oKTogdm9pZCB7XG4gIEJyb3dzZXJEb21BZGFwdGVyLm1ha2VDdXJyZW50KCk7XG4gIHd0ZkluaXQoKTtcbiAgQnJvd3NlckdldFRlc3RhYmlsaXR5LmluaXQoKTtcbn1cblxuZnVuY3Rpb24gX2V4Y2VwdGlvbkhhbmRsZXIoKTogRXhjZXB0aW9uSGFuZGxlciB7XG4gIHJldHVybiBuZXcgRXhjZXB0aW9uSGFuZGxlcihET00sICFJU19EQVJUKTtcbn1cblxuZnVuY3Rpb24gX2RvY3VtZW50KCk6IGFueSB7XG4gIHJldHVybiBET00uZGVmYXVsdERvYygpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
