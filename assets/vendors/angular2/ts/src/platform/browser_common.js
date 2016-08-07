System.register(['angular2/src/facade/lang', 'angular2/src/core/di', 'angular2/src/compiler/xhr', "angular2/core", "angular2/common", 'angular2/src/core/testability/testability', 'angular2/src/platform/dom/dom_adapter', 'angular2/src/platform/dom/events/dom_events', 'angular2/src/platform/dom/events/key_events', 'angular2/src/platform/dom/dom_tokens', 'angular2/src/platform/dom/dom_renderer', 'angular2/src/platform/dom/shared_styles_host', "angular2/src/animate/browser_details", "angular2/src/animate/animation_builder", './browser/browser_adapter', 'angular2/src/platform/browser/testability', 'angular2/src/platform/browser/xhr_cache', 'angular2/src/core/profile/wtf_init', "angular2/src/platform/dom/events/event_manager", 'angular2/src/platform/dom/events/hammer_gestures', 'angular2/platform/common_dom', 'angular2/src/platform/browser/title', 'angular2/src/platform/browser/tools/tools', './dom/events/hammer_gestures'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, di_1, xhr_1, core_1, common_1, testability_1, dom_adapter_1, dom_events_1, key_events_1, dom_tokens_1, dom_renderer_1, shared_styles_host_1, browser_details_1, animation_builder_1, browser_adapter_1, testability_2, xhr_cache_1, wtf_init_1, event_manager_1, hammer_gestures_1, common_dom_1;
    var BROWSER_PLATFORM_MARKER, BROWSER_PROVIDERS, BROWSER_APP_COMMON_PROVIDERS, CACHED_TEMPLATE_PROVIDER;
    function _exceptionHandler() {
        // !IS_DART is required because we must rethrow exceptions in JS,
        // but must not rethrow exceptions in Dart
        return new core_1.ExceptionHandler(dom_adapter_1.DOM, !lang_1.IS_DART);
    }
    function _document() {
        return dom_adapter_1.DOM.defaultDoc();
    }
    function initDomAdapter() {
        browser_adapter_1.BrowserDomAdapter.makeCurrent();
        wtf_init_1.wtfInit();
        testability_2.BrowserGetTestability.init();
    }
    exports_1("initDomAdapter", initDomAdapter);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (xhr_1_1) {
                xhr_1 = xhr_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (testability_1_1) {
                testability_1 = testability_1_1;
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
                exports_1({
                    "DOCUMENT": dom_tokens_1_1["DOCUMENT"]
                });
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
            function (browser_adapter_1_1) {
                browser_adapter_1 = browser_adapter_1_1;
                exports_1({
                    "BrowserDomAdapter": browser_adapter_1_1["BrowserDomAdapter"]
                });
            },
            function (testability_2_1) {
                testability_2 = testability_2_1;
            },
            function (xhr_cache_1_1) {
                xhr_cache_1 = xhr_cache_1_1;
            },
            function (wtf_init_1_1) {
                wtf_init_1 = wtf_init_1_1;
            },
            function (event_manager_1_1) {
                event_manager_1 = event_manager_1_1;
            },
            function (hammer_gestures_1_1) {
                hammer_gestures_1 = hammer_gestures_1_1;
            },
            function (common_dom_1_1) {
                common_dom_1 = common_dom_1_1;
                exports_1({
                    "ELEMENT_PROBE_PROVIDERS": common_dom_1_1["ELEMENT_PROBE_PROVIDERS"],
                    "ELEMENT_PROBE_PROVIDERS_PROD_MODE": common_dom_1_1["ELEMENT_PROBE_PROVIDERS_PROD_MODE"],
                    "inspectNativeElement": common_dom_1_1["inspectNativeElement"],
                    "By": common_dom_1_1["By"]
                });
            },
            function (title_1_1) {
                exports_1({
                    "Title": title_1_1["Title"]
                });
            },
            function (tools_1_1) {
                exports_1({
                    "enableDebugTools": tools_1_1["enableDebugTools"],
                    "disableDebugTools": tools_1_1["disableDebugTools"]
                });
            },
            function (hammer_gestures_2_1) {
                exports_1({
                    "HAMMER_GESTURE_CONFIG": hammer_gestures_2_1["HAMMER_GESTURE_CONFIG"],
                    "HammerGestureConfig": hammer_gestures_2_1["HammerGestureConfig"]
                });
            }],
        execute: function() {
            exports_1("BROWSER_PLATFORM_MARKER", BROWSER_PLATFORM_MARKER = lang_1.CONST_EXPR(new di_1.OpaqueToken('BrowserPlatformMarker')));
            /**
             * A set of providers to initialize the Angular platform in a web browser.
             *
             * Used automatically by `bootstrap`, or can be passed to {@link platform}.
             */
            exports_1("BROWSER_PROVIDERS", BROWSER_PROVIDERS = lang_1.CONST_EXPR([
                new di_1.Provider(BROWSER_PLATFORM_MARKER, { useValue: true }),
                core_1.PLATFORM_COMMON_PROVIDERS,
                new di_1.Provider(core_1.PLATFORM_INITIALIZER, { useValue: initDomAdapter, multi: true }),
            ]));
            /**
             * A set of providers to initialize an Angular application in a web browser.
             *
             * Used automatically by `bootstrap`, or can be passed to {@link PlatformRef.application}.
             */
            exports_1("BROWSER_APP_COMMON_PROVIDERS", BROWSER_APP_COMMON_PROVIDERS = lang_1.CONST_EXPR([
                core_1.APPLICATION_COMMON_PROVIDERS,
                common_1.FORM_PROVIDERS,
                new di_1.Provider(core_1.PLATFORM_PIPES, { useValue: common_1.COMMON_PIPES, multi: true }),
                new di_1.Provider(core_1.PLATFORM_DIRECTIVES, { useValue: common_1.COMMON_DIRECTIVES, multi: true }),
                new di_1.Provider(core_1.ExceptionHandler, { useFactory: _exceptionHandler, deps: [] }),
                new di_1.Provider(dom_tokens_1.DOCUMENT, { useFactory: _document, deps: [] }),
                new di_1.Provider(event_manager_1.EVENT_MANAGER_PLUGINS, { useClass: dom_events_1.DomEventsPlugin, multi: true }),
                new di_1.Provider(event_manager_1.EVENT_MANAGER_PLUGINS, { useClass: key_events_1.KeyEventsPlugin, multi: true }),
                new di_1.Provider(event_manager_1.EVENT_MANAGER_PLUGINS, { useClass: hammer_gestures_1.HammerGesturesPlugin, multi: true }),
                new di_1.Provider(hammer_gestures_1.HAMMER_GESTURE_CONFIG, { useClass: hammer_gestures_1.HammerGestureConfig }),
                new di_1.Provider(dom_renderer_1.DomRootRenderer, { useClass: dom_renderer_1.DomRootRenderer_ }),
                new di_1.Provider(core_1.RootRenderer, { useExisting: dom_renderer_1.DomRootRenderer }),
                new di_1.Provider(shared_styles_host_1.SharedStylesHost, { useExisting: shared_styles_host_1.DomSharedStylesHost }),
                shared_styles_host_1.DomSharedStylesHost,
                testability_1.Testability,
                browser_details_1.BrowserDetails,
                animation_builder_1.AnimationBuilder,
                event_manager_1.EventManager,
                common_dom_1.ELEMENT_PROBE_PROVIDERS
            ]));
            exports_1("CACHED_TEMPLATE_PROVIDER", CACHED_TEMPLATE_PROVIDER = lang_1.CONST_EXPR([new di_1.Provider(xhr_1.XHR, { useClass: xhr_cache_1.CachedXHR })]));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9icm93c2VyX2NvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBZ0RhLHVCQUF1QixFQU92QixpQkFBaUIsRUFxQmpCLDRCQUE0QixFQXNCNUIsd0JBQXdCO0lBckNyQztRQUNFLGlFQUFpRTtRQUNqRSwwQ0FBMEM7UUFDMUMsTUFBTSxDQUFDLElBQUksdUJBQWdCLENBQUMsaUJBQUcsRUFBRSxDQUFDLGNBQU8sQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRDtRQUNFLE1BQU0sQ0FBQyxpQkFBRyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFnQ0Q7UUFDRSxtQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNoQyxrQkFBTyxFQUFFLENBQUM7UUFDVixtQ0FBcUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBSkQsMkNBSUMsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBekRZLHFDQUFBLHVCQUF1QixHQUFHLGlCQUFVLENBQUMsSUFBSSxnQkFBVyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQSxDQUFDO1lBRTVGOzs7O2VBSUc7WUFDVSwrQkFBQSxpQkFBaUIsR0FBMkMsaUJBQVUsQ0FBQztnQkFDbEYsSUFBSSxhQUFRLENBQUMsdUJBQXVCLEVBQUUsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUM7Z0JBQ3ZELGdDQUF5QjtnQkFDekIsSUFBSSxhQUFRLENBQUMsMkJBQW9CLEVBQUUsRUFBQyxRQUFRLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQzthQUM1RSxDQUFDLENBQUEsQ0FBQztZQVlIOzs7O2VBSUc7WUFDVSwwQ0FBQSw0QkFBNEIsR0FBMkMsaUJBQVUsQ0FBQztnQkFDN0YsbUNBQTRCO2dCQUM1Qix1QkFBYztnQkFDZCxJQUFJLGFBQVEsQ0FBQyxxQkFBYyxFQUFFLEVBQUMsUUFBUSxFQUFFLHFCQUFZLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDO2dCQUNuRSxJQUFJLGFBQVEsQ0FBQywwQkFBbUIsRUFBRSxFQUFDLFFBQVEsRUFBRSwwQkFBaUIsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUM7Z0JBQzdFLElBQUksYUFBUSxDQUFDLHVCQUFnQixFQUFFLEVBQUMsVUFBVSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUMsQ0FBQztnQkFDekUsSUFBSSxhQUFRLENBQUMscUJBQVEsRUFBRSxFQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBQyxDQUFDO2dCQUN6RCxJQUFJLGFBQVEsQ0FBQyxxQ0FBcUIsRUFBRSxFQUFDLFFBQVEsRUFBRSw0QkFBZSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQztnQkFDN0UsSUFBSSxhQUFRLENBQUMscUNBQXFCLEVBQUUsRUFBQyxRQUFRLEVBQUUsNEJBQWUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUM7Z0JBQzdFLElBQUksYUFBUSxDQUFDLHFDQUFxQixFQUFFLEVBQUMsUUFBUSxFQUFFLHNDQUFvQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQztnQkFDbEYsSUFBSSxhQUFRLENBQUMsdUNBQXFCLEVBQUUsRUFBQyxRQUFRLEVBQUUscUNBQW1CLEVBQUMsQ0FBQztnQkFDcEUsSUFBSSxhQUFRLENBQUMsOEJBQWUsRUFBRSxFQUFDLFFBQVEsRUFBRSwrQkFBZ0IsRUFBQyxDQUFDO2dCQUMzRCxJQUFJLGFBQVEsQ0FBQyxtQkFBWSxFQUFFLEVBQUMsV0FBVyxFQUFFLDhCQUFlLEVBQUMsQ0FBQztnQkFDMUQsSUFBSSxhQUFRLENBQUMscUNBQWdCLEVBQUUsRUFBQyxXQUFXLEVBQUUsd0NBQW1CLEVBQUMsQ0FBQztnQkFDbEUsd0NBQW1CO2dCQUNuQix5QkFBVztnQkFDWCxnQ0FBYztnQkFDZCxvQ0FBZ0I7Z0JBQ2hCLDRCQUFZO2dCQUNaLG9DQUF1QjthQUN4QixDQUFDLENBQUEsQ0FBQztZQUVVLHNDQUFBLHdCQUF3QixHQUNqQyxpQkFBVSxDQUFDLENBQUMsSUFBSSxhQUFRLENBQUMsU0FBRyxFQUFFLEVBQUMsUUFBUSxFQUFFLHFCQUFTLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9icm93c2VyX2NvbW1vbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q09OU1RfRVhQUiwgSVNfREFSVH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7cHJvdmlkZSwgUHJvdmlkZXIsIEluamVjdG9yLCBPcGFxdWVUb2tlbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtYSFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci94aHInO1xuaW1wb3J0IHtcbiAgUExBVEZPUk1fSU5JVElBTElaRVIsXG4gIFBMQVRGT1JNX0RJUkVDVElWRVMsXG4gIFBMQVRGT1JNX1BJUEVTLFxuICBDb21wb25lbnRSZWYsXG4gIEV4Y2VwdGlvbkhhbmRsZXIsXG4gIFJlZmxlY3RvcixcbiAgUm9vdFJlbmRlcmVyLFxuICByZWZsZWN0b3IsXG4gIEFQUExJQ0FUSU9OX0NPTU1PTl9QUk9WSURFUlMsXG4gIFBMQVRGT1JNX0NPTU1PTl9QUk9WSURFUlNcbn0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7Q09NTU9OX0RJUkVDVElWRVMsIENPTU1PTl9QSVBFUywgRk9STV9QUk9WSURFUlN9IGZyb20gXCJhbmd1bGFyMi9jb21tb25cIjtcbmltcG9ydCB7VGVzdGFiaWxpdHl9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3Rlc3RhYmlsaXR5L3Rlc3RhYmlsaXR5JztcbmltcG9ydCB7RE9NfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9hZGFwdGVyJztcbmltcG9ydCB7RG9tRXZlbnRzUGx1Z2lufSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2V2ZW50cy9kb21fZXZlbnRzJztcbmltcG9ydCB7S2V5RXZlbnRzUGx1Z2lufSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2V2ZW50cy9rZXlfZXZlbnRzJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZG9tX3Rva2Vucyc7XG5pbXBvcnQge0RvbVJvb3RSZW5kZXJlciwgRG9tUm9vdFJlbmRlcmVyX30gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fcmVuZGVyZXInO1xuaW1wb3J0IHtEb21TaGFyZWRTdHlsZXNIb3N0LCBTaGFyZWRTdHlsZXNIb3N0fSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL3NoYXJlZF9zdHlsZXNfaG9zdCc7XG5pbXBvcnQge0Jyb3dzZXJEZXRhaWxzfSBmcm9tIFwiYW5ndWxhcjIvc3JjL2FuaW1hdGUvYnJvd3Nlcl9kZXRhaWxzXCI7XG5pbXBvcnQge0FuaW1hdGlvbkJ1aWxkZXJ9IGZyb20gXCJhbmd1bGFyMi9zcmMvYW5pbWF0ZS9hbmltYXRpb25fYnVpbGRlclwiO1xuaW1wb3J0IHtCcm93c2VyRG9tQWRhcHRlcn0gZnJvbSAnLi9icm93c2VyL2Jyb3dzZXJfYWRhcHRlcic7XG5pbXBvcnQge0Jyb3dzZXJHZXRUZXN0YWJpbGl0eX0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2Jyb3dzZXIvdGVzdGFiaWxpdHknO1xuaW1wb3J0IHtDYWNoZWRYSFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9icm93c2VyL3hocl9jYWNoZSc7XG5pbXBvcnQge3d0ZkluaXR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3Byb2ZpbGUvd3RmX2luaXQnO1xuaW1wb3J0IHtFdmVudE1hbmFnZXIsIEVWRU5UX01BTkFHRVJfUExVR0lOU30gZnJvbSBcImFuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZXZlbnRzL2V2ZW50X21hbmFnZXJcIjtcbmltcG9ydCB7XG4gIEhBTU1FUl9HRVNUVVJFX0NPTkZJRyxcbiAgSGFtbWVyR2VzdHVyZUNvbmZpZyxcbiAgSGFtbWVyR2VzdHVyZXNQbHVnaW5cbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9ldmVudHMvaGFtbWVyX2dlc3R1cmVzJztcbmltcG9ydCB7RUxFTUVOVF9QUk9CRV9QUk9WSURFUlN9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2NvbW1vbl9kb20nO1xuZXhwb3J0IHtET0NVTUVOVH0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fdG9rZW5zJztcbmV4cG9ydCB7VGl0bGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9icm93c2VyL3RpdGxlJztcbmV4cG9ydCB7XG4gIEVMRU1FTlRfUFJPQkVfUFJPVklERVJTLFxuICBFTEVNRU5UX1BST0JFX1BST1ZJREVSU19QUk9EX01PREUsXG4gIGluc3BlY3ROYXRpdmVFbGVtZW50LFxuICBCeVxufSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9jb21tb25fZG9tJztcbmV4cG9ydCB7QnJvd3NlckRvbUFkYXB0ZXJ9IGZyb20gJy4vYnJvd3Nlci9icm93c2VyX2FkYXB0ZXInO1xuZXhwb3J0IHtlbmFibGVEZWJ1Z1Rvb2xzLCBkaXNhYmxlRGVidWdUb29sc30gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2Jyb3dzZXIvdG9vbHMvdG9vbHMnO1xuZXhwb3J0IHtIQU1NRVJfR0VTVFVSRV9DT05GSUcsIEhhbW1lckdlc3R1cmVDb25maWd9IGZyb20gJy4vZG9tL2V2ZW50cy9oYW1tZXJfZ2VzdHVyZXMnO1xuXG5leHBvcnQgY29uc3QgQlJPV1NFUl9QTEFURk9STV9NQVJLRVIgPSBDT05TVF9FWFBSKG5ldyBPcGFxdWVUb2tlbignQnJvd3NlclBsYXRmb3JtTWFya2VyJykpO1xuXG4vKipcbiAqIEEgc2V0IG9mIHByb3ZpZGVycyB0byBpbml0aWFsaXplIHRoZSBBbmd1bGFyIHBsYXRmb3JtIGluIGEgd2ViIGJyb3dzZXIuXG4gKlxuICogVXNlZCBhdXRvbWF0aWNhbGx5IGJ5IGBib290c3RyYXBgLCBvciBjYW4gYmUgcGFzc2VkIHRvIHtAbGluayBwbGF0Zm9ybX0uXG4gKi9cbmV4cG9ydCBjb25zdCBCUk9XU0VSX1BST1ZJREVSUzogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPSBDT05TVF9FWFBSKFtcbiAgbmV3IFByb3ZpZGVyKEJST1dTRVJfUExBVEZPUk1fTUFSS0VSLCB7dXNlVmFsdWU6IHRydWV9KSxcbiAgUExBVEZPUk1fQ09NTU9OX1BST1ZJREVSUyxcbiAgbmV3IFByb3ZpZGVyKFBMQVRGT1JNX0lOSVRJQUxJWkVSLCB7dXNlVmFsdWU6IGluaXREb21BZGFwdGVyLCBtdWx0aTogdHJ1ZX0pLFxuXSk7XG5cbmZ1bmN0aW9uIF9leGNlcHRpb25IYW5kbGVyKCk6IEV4Y2VwdGlvbkhhbmRsZXIge1xuICAvLyAhSVNfREFSVCBpcyByZXF1aXJlZCBiZWNhdXNlIHdlIG11c3QgcmV0aHJvdyBleGNlcHRpb25zIGluIEpTLFxuICAvLyBidXQgbXVzdCBub3QgcmV0aHJvdyBleGNlcHRpb25zIGluIERhcnRcbiAgcmV0dXJuIG5ldyBFeGNlcHRpb25IYW5kbGVyKERPTSwgIUlTX0RBUlQpO1xufVxuXG5mdW5jdGlvbiBfZG9jdW1lbnQoKTogYW55IHtcbiAgcmV0dXJuIERPTS5kZWZhdWx0RG9jKCk7XG59XG5cbi8qKlxuICogQSBzZXQgb2YgcHJvdmlkZXJzIHRvIGluaXRpYWxpemUgYW4gQW5ndWxhciBhcHBsaWNhdGlvbiBpbiBhIHdlYiBicm93c2VyLlxuICpcbiAqIFVzZWQgYXV0b21hdGljYWxseSBieSBgYm9vdHN0cmFwYCwgb3IgY2FuIGJlIHBhc3NlZCB0byB7QGxpbmsgUGxhdGZvcm1SZWYuYXBwbGljYXRpb259LlxuICovXG5leHBvcnQgY29uc3QgQlJPV1NFUl9BUFBfQ09NTU9OX1BST1ZJREVSUzogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPSBDT05TVF9FWFBSKFtcbiAgQVBQTElDQVRJT05fQ09NTU9OX1BST1ZJREVSUyxcbiAgRk9STV9QUk9WSURFUlMsXG4gIG5ldyBQcm92aWRlcihQTEFURk9STV9QSVBFUywge3VzZVZhbHVlOiBDT01NT05fUElQRVMsIG11bHRpOiB0cnVlfSksXG4gIG5ldyBQcm92aWRlcihQTEFURk9STV9ESVJFQ1RJVkVTLCB7dXNlVmFsdWU6IENPTU1PTl9ESVJFQ1RJVkVTLCBtdWx0aTogdHJ1ZX0pLFxuICBuZXcgUHJvdmlkZXIoRXhjZXB0aW9uSGFuZGxlciwge3VzZUZhY3Rvcnk6IF9leGNlcHRpb25IYW5kbGVyLCBkZXBzOiBbXX0pLFxuICBuZXcgUHJvdmlkZXIoRE9DVU1FTlQsIHt1c2VGYWN0b3J5OiBfZG9jdW1lbnQsIGRlcHM6IFtdfSksXG4gIG5ldyBQcm92aWRlcihFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIHt1c2VDbGFzczogRG9tRXZlbnRzUGx1Z2luLCBtdWx0aTogdHJ1ZX0pLFxuICBuZXcgUHJvdmlkZXIoRVZFTlRfTUFOQUdFUl9QTFVHSU5TLCB7dXNlQ2xhc3M6IEtleUV2ZW50c1BsdWdpbiwgbXVsdGk6IHRydWV9KSxcbiAgbmV3IFByb3ZpZGVyKEVWRU5UX01BTkFHRVJfUExVR0lOUywge3VzZUNsYXNzOiBIYW1tZXJHZXN0dXJlc1BsdWdpbiwgbXVsdGk6IHRydWV9KSxcbiAgbmV3IFByb3ZpZGVyKEhBTU1FUl9HRVNUVVJFX0NPTkZJRywge3VzZUNsYXNzOiBIYW1tZXJHZXN0dXJlQ29uZmlnfSksXG4gIG5ldyBQcm92aWRlcihEb21Sb290UmVuZGVyZXIsIHt1c2VDbGFzczogRG9tUm9vdFJlbmRlcmVyX30pLFxuICBuZXcgUHJvdmlkZXIoUm9vdFJlbmRlcmVyLCB7dXNlRXhpc3Rpbmc6IERvbVJvb3RSZW5kZXJlcn0pLFxuICBuZXcgUHJvdmlkZXIoU2hhcmVkU3R5bGVzSG9zdCwge3VzZUV4aXN0aW5nOiBEb21TaGFyZWRTdHlsZXNIb3N0fSksXG4gIERvbVNoYXJlZFN0eWxlc0hvc3QsXG4gIFRlc3RhYmlsaXR5LFxuICBCcm93c2VyRGV0YWlscyxcbiAgQW5pbWF0aW9uQnVpbGRlcixcbiAgRXZlbnRNYW5hZ2VyLFxuICBFTEVNRU5UX1BST0JFX1BST1ZJREVSU1xuXSk7XG5cbmV4cG9ydCBjb25zdCBDQUNIRURfVEVNUExBVEVfUFJPVklERVI6IEFycmF5PGFueSAvKlR5cGUgfCBQcm92aWRlciB8IGFueVtdKi8+ID1cbiAgICBDT05TVF9FWFBSKFtuZXcgUHJvdmlkZXIoWEhSLCB7dXNlQ2xhc3M6IENhY2hlZFhIUn0pXSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0RG9tQWRhcHRlcigpIHtcbiAgQnJvd3NlckRvbUFkYXB0ZXIubWFrZUN1cnJlbnQoKTtcbiAgd3RmSW5pdCgpO1xuICBCcm93c2VyR2V0VGVzdGFiaWxpdHkuaW5pdCgpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
