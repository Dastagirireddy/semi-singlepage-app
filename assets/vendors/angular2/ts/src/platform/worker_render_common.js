System.register(['angular2/src/facade/lang', 'angular2/src/web_workers/shared/message_bus', 'angular2/src/core/zone/ng_zone', 'angular2/core', 'angular2/platform/common_dom', 'angular2/src/core/di', 'angular2/src/platform/dom/dom_adapter', 'angular2/src/platform/dom/events/dom_events', 'angular2/src/platform/dom/events/key_events', 'angular2/src/platform/dom/dom_tokens', 'angular2/src/platform/dom/dom_renderer', 'angular2/src/platform/dom/shared_styles_host', 'angular2/src/animate/browser_details', 'angular2/src/animate/animation_builder', 'angular2/compiler', 'angular2/src/platform/browser/xhr_impl', 'angular2/src/core/testability/testability', 'angular2/src/platform/browser/testability', './browser/browser_adapter', 'angular2/src/core/profile/wtf_init', 'angular2/src/web_workers/ui/renderer', 'angular2/src/web_workers/ui/xhr_impl', 'angular2/src/web_workers/shared/service_message_broker', 'angular2/src/web_workers/shared/client_message_broker', 'angular2/src/platform/browser/location/browser_platform_location', 'angular2/src/web_workers/shared/serializer', 'angular2/src/web_workers/shared/api', 'angular2/src/web_workers/shared/render_store', 'angular2/src/platform/dom/events/hammer_gestures'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, message_bus_1, ng_zone_1, core_1, common_dom_1, di_1, dom_adapter_1, dom_events_1, key_events_1, dom_tokens_1, dom_renderer_1, shared_styles_host_1, browser_details_1, animation_builder_1, compiler_1, xhr_impl_1, testability_1, testability_2, browser_adapter_1, wtf_init_1, renderer_1, xhr_impl_2, service_message_broker_1, client_message_broker_1, browser_platform_location_1, serializer_1, api_1, render_store_1, hammer_gestures_1;
    var WORKER_SCRIPT, WORKER_RENDER_MESSAGING_PROVIDERS, WORKER_RENDER_PLATFORM_MARKER, WORKER_RENDER_PLATFORM, WORKER_RENDER_ROUTER, WORKER_RENDER_APPLICATION_COMMON;
    function initializeGenericWorkerRenderer(injector) {
        var bus = injector.get(message_bus_1.MessageBus);
        var zone = injector.get(ng_zone_1.NgZone);
        bus.attachToZone(zone);
        zone.runGuarded(function () {
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
            function (dom_tokens_1_1) {
                dom_tokens_1 = dom_tokens_1_1;
            },
            function (dom_renderer_1_1) {
                dom_renderer_1 = dom_renderer_1_1;
            },
            function (shared_styles_host_1_1) {
                shared_styles_host_1 = shared_styles_host_1_1;
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
            function (service_message_broker_1_1) {
                service_message_broker_1 = service_message_broker_1_1;
            },
            function (client_message_broker_1_1) {
                client_message_broker_1 = client_message_broker_1_1;
            },
            function (browser_platform_location_1_1) {
                browser_platform_location_1 = browser_platform_location_1_1;
            },
            function (serializer_1_1) {
                serializer_1 = serializer_1_1;
            },
            function (api_1_1) {
                api_1 = api_1_1;
            },
            function (render_store_1_1) {
                render_store_1 = render_store_1_1;
            },
            function (hammer_gestures_1_1) {
                hammer_gestures_1 = hammer_gestures_1_1;
            }],
        execute: function() {
            exports_1("WORKER_SCRIPT", WORKER_SCRIPT = lang_1.CONST_EXPR(new di_1.OpaqueToken("WebWorkerScript")));
            // Message based Worker classes that listen on the MessageBus
            exports_1("WORKER_RENDER_MESSAGING_PROVIDERS", WORKER_RENDER_MESSAGING_PROVIDERS = lang_1.CONST_EXPR([renderer_1.MessageBasedRenderer, xhr_impl_2.MessageBasedXHRImpl]));
            exports_1("WORKER_RENDER_PLATFORM_MARKER", WORKER_RENDER_PLATFORM_MARKER = lang_1.CONST_EXPR(new di_1.OpaqueToken('WorkerRenderPlatformMarker')));
            exports_1("WORKER_RENDER_PLATFORM", WORKER_RENDER_PLATFORM = lang_1.CONST_EXPR([
                core_1.PLATFORM_COMMON_PROVIDERS,
                lang_1.CONST_EXPR(new di_1.Provider(WORKER_RENDER_PLATFORM_MARKER, { useValue: true })),
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
                new di_1.Provider(hammer_gestures_1.HAMMER_GESTURE_CONFIG, { useClass: hammer_gestures_1.HammerGestureConfig }),
                new di_1.Provider(dom_renderer_1.DomRootRenderer, { useClass: dom_renderer_1.DomRootRenderer_ }),
                new di_1.Provider(core_1.RootRenderer, { useExisting: dom_renderer_1.DomRootRenderer }),
                new di_1.Provider(shared_styles_host_1.SharedStylesHost, { useExisting: shared_styles_host_1.DomSharedStylesHost }),
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS93b3JrZXJfcmVuZGVyX2NvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBdURhLGFBQWEsRUFHYixpQ0FBaUMsRUFHakMsNkJBQTZCLEVBRzdCLHNCQUFzQixFQVV0QixvQkFBb0IsRUFHcEIsZ0NBQWdDO0lBNEI3Qyx5Q0FBZ0QsUUFBa0I7UUFDaEUsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyx3QkFBVSxDQUFDLENBQUM7UUFDbkMsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBTSxDQUFDLENBQUM7UUFDaEMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV2QixJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ2QsaUNBQWlDLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSyxJQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFSRCw2RUFRQyxDQUFBO0lBRUQ7UUFDRSxtQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNoQyxrQkFBTyxFQUFFLENBQUM7UUFDVixtQ0FBcUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBSkQscUVBSUMsQ0FBQTtJQUVEO1FBQ0UsTUFBTSxDQUFDLElBQUksdUJBQWdCLENBQUMsaUJBQUcsRUFBRSxDQUFDLGNBQU8sQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRDtRQUNFLE1BQU0sQ0FBQyxpQkFBRyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzFCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUF4RVksMkJBQUEsYUFBYSxHQUFnQixpQkFBVSxDQUFDLElBQUksZ0JBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUEsQ0FBQztZQUV6Riw2REFBNkQ7WUFDaEQsK0NBQUEsaUNBQWlDLEdBQzFDLGlCQUFVLENBQUMsQ0FBQywrQkFBb0IsRUFBRSw4QkFBbUIsQ0FBQyxDQUFDLENBQUEsQ0FBQztZQUUvQywyQ0FBQSw2QkFBNkIsR0FDdEMsaUJBQVUsQ0FBQyxJQUFJLGdCQUFXLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFFakQsb0NBQUEsc0JBQXNCLEdBQTJDLGlCQUFVLENBQUM7Z0JBQ3ZGLGdDQUF5QjtnQkFDekIsaUJBQVUsQ0FBQyxJQUFJLGFBQVEsQ0FBQyw2QkFBNkIsRUFBRSxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO2dCQUN6RSxJQUFJLGFBQVEsQ0FBQywyQkFBb0IsRUFBRSxFQUFDLFFBQVEsRUFBRSwyQkFBMkIsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUM7YUFDekYsQ0FBQyxDQUFBLENBQUM7WUFFSDs7O2VBR0c7WUFDVSxrQ0FBQSxvQkFBb0IsR0FDN0IsaUJBQVUsQ0FBQyxDQUFDLG1EQUF1QixDQUFDLENBQUMsQ0FBQSxDQUFDO1lBRTdCLDhDQUFBLGdDQUFnQyxHQUEyQyxpQkFBVSxDQUFDO2dCQUNqRyxtQ0FBNEI7Z0JBQzVCLGlDQUFpQztnQkFDakMsSUFBSSxhQUFRLENBQUMsdUJBQWdCLEVBQUUsRUFBQyxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBQyxDQUFDO2dCQUN6RSxJQUFJLGFBQVEsQ0FBQyxxQkFBUSxFQUFFLEVBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDLENBQUM7Z0JBQ3pELDBGQUEwRjtnQkFDMUYsUUFBUTtnQkFDUixJQUFJLGFBQVEsQ0FBQyxrQ0FBcUIsRUFBRSxFQUFDLFFBQVEsRUFBRSw0QkFBZSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQztnQkFDN0UsSUFBSSxhQUFRLENBQUMsa0NBQXFCLEVBQUUsRUFBQyxRQUFRLEVBQUUsNEJBQWUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUM7Z0JBQzdFLElBQUksYUFBUSxDQUFDLGtDQUFxQixFQUFFLEVBQUMsUUFBUSxFQUFFLHNDQUFvQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQztnQkFDbEYsSUFBSSxhQUFRLENBQUMsdUNBQXFCLEVBQUUsRUFBQyxRQUFRLEVBQUUscUNBQW1CLEVBQUMsQ0FBQztnQkFDcEUsSUFBSSxhQUFRLENBQUMsOEJBQWUsRUFBRSxFQUFDLFFBQVEsRUFBRSwrQkFBZ0IsRUFBQyxDQUFDO2dCQUMzRCxJQUFJLGFBQVEsQ0FBQyxtQkFBWSxFQUFFLEVBQUMsV0FBVyxFQUFFLDhCQUFlLEVBQUMsQ0FBQztnQkFDMUQsSUFBSSxhQUFRLENBQUMscUNBQWdCLEVBQUUsRUFBQyxXQUFXLEVBQUUsd0NBQW1CLEVBQUMsQ0FBQztnQkFDbEUsSUFBSSxhQUFRLENBQUMsY0FBRyxFQUFFLEVBQUMsUUFBUSxFQUFFLGtCQUFPLEVBQUMsQ0FBQztnQkFDdEMsOEJBQW1CO2dCQUNuQixJQUFJLGFBQVEsQ0FBQyxvREFBMkIsRUFBRSxFQUFDLFFBQVEsRUFBRSxxREFBNEIsRUFBQyxDQUFDO2dCQUNuRixJQUFJLGFBQVEsQ0FBQyxrREFBMEIsRUFBRSxFQUFDLFFBQVEsRUFBRSxtREFBMkIsRUFBQyxDQUFDO2dCQUNqRix1QkFBVTtnQkFDVixJQUFJLGFBQVEsQ0FBQyxtQkFBYSxFQUFFLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBQyxDQUFDO2dCQUM5QywwQkFBVztnQkFDWCx3Q0FBbUI7Z0JBQ25CLHlCQUFXO2dCQUNYLGdDQUFjO2dCQUNkLG9DQUFnQjtnQkFDaEIseUJBQVk7YUFDYixDQUFDLENBQUEsQ0FBQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvcGxhdGZvcm0vd29ya2VyX3JlbmRlcl9jb21tb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NPTlNUX0VYUFIsIElTX0RBUlR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge01lc3NhZ2VCdXN9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtOZ1pvbmV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3pvbmUvbmdfem9uZSc7XG5pbXBvcnQge1xuICBQTEFURk9STV9ESVJFQ1RJVkVTLFxuICBQTEFURk9STV9QSVBFUyxcbiAgQ29tcG9uZW50UmVmLFxuICBFeGNlcHRpb25IYW5kbGVyLFxuICBSZWZsZWN0b3IsXG4gIHJlZmxlY3RvcixcbiAgQVBQTElDQVRJT05fQ09NTU9OX1BST1ZJREVSUyxcbiAgUExBVEZPUk1fQ09NTU9OX1BST1ZJREVSUyxcbiAgUm9vdFJlbmRlcmVyLFxuICBQTEFURk9STV9JTklUSUFMSVpFUixcbiAgQVBQX0lOSVRJQUxJWkVSXG59IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIEV2ZW50TWFuYWdlcn0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vY29tbW9uX2RvbSc7XG5pbXBvcnQge3Byb3ZpZGUsIFByb3ZpZGVyLCBJbmplY3RvciwgT3BhcXVlVG9rZW59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbi8vIFRPRE8gY2hhbmdlIHRoZXNlIGltcG9ydHMgb25jZSBkb21fYWRhcHRlciBpcyBtb3ZlZCBvdXQgb2YgY29yZVxuaW1wb3J0IHtET019IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZG9tX2FkYXB0ZXInO1xuaW1wb3J0IHtEb21FdmVudHNQbHVnaW59IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZXZlbnRzL2RvbV9ldmVudHMnO1xuaW1wb3J0IHtLZXlFdmVudHNQbHVnaW59IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZXZlbnRzL2tleV9ldmVudHMnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fdG9rZW5zJztcbmltcG9ydCB7RG9tUm9vdFJlbmRlcmVyLCBEb21Sb290UmVuZGVyZXJffSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9yZW5kZXJlcic7XG5pbXBvcnQge0RvbVNoYXJlZFN0eWxlc0hvc3QsIFNoYXJlZFN0eWxlc0hvc3R9IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vc2hhcmVkX3N0eWxlc19ob3N0JztcbmltcG9ydCB7QnJvd3NlckRldGFpbHN9IGZyb20gJ2FuZ3VsYXIyL3NyYy9hbmltYXRlL2Jyb3dzZXJfZGV0YWlscyc7XG5pbXBvcnQge0FuaW1hdGlvbkJ1aWxkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9hbmltYXRlL2FuaW1hdGlvbl9idWlsZGVyJztcbmltcG9ydCB7WEhSfSBmcm9tICdhbmd1bGFyMi9jb21waWxlcic7XG5pbXBvcnQge1hIUkltcGx9IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9icm93c2VyL3hocl9pbXBsJztcbmltcG9ydCB7VGVzdGFiaWxpdHl9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3Rlc3RhYmlsaXR5L3Rlc3RhYmlsaXR5JztcbmltcG9ydCB7QnJvd3NlckdldFRlc3RhYmlsaXR5fSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vYnJvd3Nlci90ZXN0YWJpbGl0eSc7XG5pbXBvcnQge0Jyb3dzZXJEb21BZGFwdGVyfSBmcm9tICcuL2Jyb3dzZXIvYnJvd3Nlcl9hZGFwdGVyJztcbmltcG9ydCB7d3RmSW5pdH0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcHJvZmlsZS93dGZfaW5pdCc7XG5pbXBvcnQge01lc3NhZ2VCYXNlZFJlbmRlcmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvdWkvcmVuZGVyZXInO1xuaW1wb3J0IHtNZXNzYWdlQmFzZWRYSFJJbXBsfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvdWkveGhyX2ltcGwnO1xuaW1wb3J0IHtcbiAgU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5LFxuICBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnlfXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvc2VydmljZV9tZXNzYWdlX2Jyb2tlcic7XG5pbXBvcnQge1xuICBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSxcbiAgQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnlfXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvY2xpZW50X21lc3NhZ2VfYnJva2VyJztcbmltcG9ydCB7XG4gIEJyb3dzZXJQbGF0Zm9ybUxvY2F0aW9uXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9icm93c2VyL2xvY2F0aW9uL2Jyb3dzZXJfcGxhdGZvcm1fbG9jYXRpb24nO1xuaW1wb3J0IHtTZXJpYWxpemVyfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtPTl9XRUJfV09SS0VSfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL2FwaSc7XG5pbXBvcnQge1JlbmRlclN0b3JlfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3JlbmRlcl9zdG9yZSc7XG5pbXBvcnQge1xuICBIQU1NRVJfR0VTVFVSRV9DT05GSUcsXG4gIEhhbW1lckdlc3R1cmVDb25maWcsXG4gIEhhbW1lckdlc3R1cmVzUGx1Z2luXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZXZlbnRzL2hhbW1lcl9nZXN0dXJlcyc7XG5cbmV4cG9ydCBjb25zdCBXT1JLRVJfU0NSSVBUOiBPcGFxdWVUb2tlbiA9IENPTlNUX0VYUFIobmV3IE9wYXF1ZVRva2VuKFwiV2ViV29ya2VyU2NyaXB0XCIpKTtcblxuLy8gTWVzc2FnZSBiYXNlZCBXb3JrZXIgY2xhc3NlcyB0aGF0IGxpc3RlbiBvbiB0aGUgTWVzc2FnZUJ1c1xuZXhwb3J0IGNvbnN0IFdPUktFUl9SRU5ERVJfTUVTU0FHSU5HX1BST1ZJREVSUzogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPVxuICAgIENPTlNUX0VYUFIoW01lc3NhZ2VCYXNlZFJlbmRlcmVyLCBNZXNzYWdlQmFzZWRYSFJJbXBsXSk7XG5cbmV4cG9ydCBjb25zdCBXT1JLRVJfUkVOREVSX1BMQVRGT1JNX01BUktFUiA9XG4gICAgQ09OU1RfRVhQUihuZXcgT3BhcXVlVG9rZW4oJ1dvcmtlclJlbmRlclBsYXRmb3JtTWFya2VyJykpO1xuXG5leHBvcnQgY29uc3QgV09SS0VSX1JFTkRFUl9QTEFURk9STTogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPSBDT05TVF9FWFBSKFtcbiAgUExBVEZPUk1fQ09NTU9OX1BST1ZJREVSUyxcbiAgQ09OU1RfRVhQUihuZXcgUHJvdmlkZXIoV09SS0VSX1JFTkRFUl9QTEFURk9STV9NQVJLRVIsIHt1c2VWYWx1ZTogdHJ1ZX0pKSxcbiAgbmV3IFByb3ZpZGVyKFBMQVRGT1JNX0lOSVRJQUxJWkVSLCB7dXNlVmFsdWU6IGluaXRXZWJXb3JrZXJSZW5kZXJQbGF0Zm9ybSwgbXVsdGk6IHRydWV9KVxuXSk7XG5cbi8qKlxuICogQSBsaXN0IG9mIHtAbGluayBQcm92aWRlcn1zLiBUbyB1c2UgdGhlIHJvdXRlciBpbiBhIFdvcmtlciBlbmFibGVkIGFwcGxpY2F0aW9uIHlvdSBtdXN0XG4gKiBpbmNsdWRlIHRoZXNlIHByb3ZpZGVycyB3aGVuIHNldHRpbmcgdXAgdGhlIHJlbmRlciB0aHJlYWQuXG4gKi9cbmV4cG9ydCBjb25zdCBXT1JLRVJfUkVOREVSX1JPVVRFUjogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPVxuICAgIENPTlNUX0VYUFIoW0Jyb3dzZXJQbGF0Zm9ybUxvY2F0aW9uXSk7XG5cbmV4cG9ydCBjb25zdCBXT1JLRVJfUkVOREVSX0FQUExJQ0FUSU9OX0NPTU1PTjogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPSBDT05TVF9FWFBSKFtcbiAgQVBQTElDQVRJT05fQ09NTU9OX1BST1ZJREVSUyxcbiAgV09SS0VSX1JFTkRFUl9NRVNTQUdJTkdfUFJPVklERVJTLFxuICBuZXcgUHJvdmlkZXIoRXhjZXB0aW9uSGFuZGxlciwge3VzZUZhY3Rvcnk6IF9leGNlcHRpb25IYW5kbGVyLCBkZXBzOiBbXX0pLFxuICBuZXcgUHJvdmlkZXIoRE9DVU1FTlQsIHt1c2VGYWN0b3J5OiBfZG9jdW1lbnQsIGRlcHM6IFtdfSksXG4gIC8vIFRPRE8oanRlcGxpdHo2MDIpOiBJbnZlc3RpZ2F0ZSBpZiB3ZSBkZWZpbml0ZWx5IG5lZWQgRVZFTlRfTUFOQUdFUiBvbiB0aGUgcmVuZGVyIHRocmVhZFxuICAvLyAjNTI5OFxuICBuZXcgUHJvdmlkZXIoRVZFTlRfTUFOQUdFUl9QTFVHSU5TLCB7dXNlQ2xhc3M6IERvbUV2ZW50c1BsdWdpbiwgbXVsdGk6IHRydWV9KSxcbiAgbmV3IFByb3ZpZGVyKEVWRU5UX01BTkFHRVJfUExVR0lOUywge3VzZUNsYXNzOiBLZXlFdmVudHNQbHVnaW4sIG11bHRpOiB0cnVlfSksXG4gIG5ldyBQcm92aWRlcihFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIHt1c2VDbGFzczogSGFtbWVyR2VzdHVyZXNQbHVnaW4sIG11bHRpOiB0cnVlfSksXG4gIG5ldyBQcm92aWRlcihIQU1NRVJfR0VTVFVSRV9DT05GSUcsIHt1c2VDbGFzczogSGFtbWVyR2VzdHVyZUNvbmZpZ30pLFxuICBuZXcgUHJvdmlkZXIoRG9tUm9vdFJlbmRlcmVyLCB7dXNlQ2xhc3M6IERvbVJvb3RSZW5kZXJlcl99KSxcbiAgbmV3IFByb3ZpZGVyKFJvb3RSZW5kZXJlciwge3VzZUV4aXN0aW5nOiBEb21Sb290UmVuZGVyZXJ9KSxcbiAgbmV3IFByb3ZpZGVyKFNoYXJlZFN0eWxlc0hvc3QsIHt1c2VFeGlzdGluZzogRG9tU2hhcmVkU3R5bGVzSG9zdH0pLFxuICBuZXcgUHJvdmlkZXIoWEhSLCB7dXNlQ2xhc3M6IFhIUkltcGx9KSxcbiAgTWVzc2FnZUJhc2VkWEhSSW1wbCxcbiAgbmV3IFByb3ZpZGVyKFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSwge3VzZUNsYXNzOiBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnlffSksXG4gIG5ldyBQcm92aWRlcihDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSwge3VzZUNsYXNzOiBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeV99KSxcbiAgU2VyaWFsaXplcixcbiAgbmV3IFByb3ZpZGVyKE9OX1dFQl9XT1JLRVIsIHt1c2VWYWx1ZTogZmFsc2V9KSxcbiAgUmVuZGVyU3RvcmUsXG4gIERvbVNoYXJlZFN0eWxlc0hvc3QsXG4gIFRlc3RhYmlsaXR5LFxuICBCcm93c2VyRGV0YWlscyxcbiAgQW5pbWF0aW9uQnVpbGRlcixcbiAgRXZlbnRNYW5hZ2VyXG5dKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemVHZW5lcmljV29ya2VyUmVuZGVyZXIoaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gIHZhciBidXMgPSBpbmplY3Rvci5nZXQoTWVzc2FnZUJ1cyk7XG4gIGxldCB6b25lID0gaW5qZWN0b3IuZ2V0KE5nWm9uZSk7XG4gIGJ1cy5hdHRhY2hUb1pvbmUoem9uZSk7XG5cbiAgem9uZS5ydW5HdWFyZGVkKCgpID0+IHtcbiAgICBXT1JLRVJfUkVOREVSX01FU1NBR0lOR19QUk9WSURFUlMuZm9yRWFjaCgodG9rZW4pID0+IHsgaW5qZWN0b3IuZ2V0KHRva2VuKS5zdGFydCgpOyB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0V2ViV29ya2VyUmVuZGVyUGxhdGZvcm0oKTogdm9pZCB7XG4gIEJyb3dzZXJEb21BZGFwdGVyLm1ha2VDdXJyZW50KCk7XG4gIHd0ZkluaXQoKTtcbiAgQnJvd3NlckdldFRlc3RhYmlsaXR5LmluaXQoKTtcbn1cblxuZnVuY3Rpb24gX2V4Y2VwdGlvbkhhbmRsZXIoKTogRXhjZXB0aW9uSGFuZGxlciB7XG4gIHJldHVybiBuZXcgRXhjZXB0aW9uSGFuZGxlcihET00sICFJU19EQVJUKTtcbn1cblxuZnVuY3Rpb24gX2RvY3VtZW50KCk6IGFueSB7XG4gIHJldHVybiBET00uZGVmYXVsdERvYygpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
