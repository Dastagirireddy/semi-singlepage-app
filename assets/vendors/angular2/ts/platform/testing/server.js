System.register(['angular2/core', 'angular2/compiler', 'angular2/src/platform/server/parse5_adapter', 'angular2/src/animate/animation_builder', 'angular2/src/mock/animation_builder_mock', 'angular2/src/mock/directive_resolver_mock', 'angular2/src/mock/view_resolver_mock', 'angular2/src/mock/mock_location_strategy', 'angular2/src/mock/ng_zone_mock', 'angular2/src/testing/test_component_builder', 'angular2/src/compiler/xhr', 'angular2/src/testing/utils', 'angular2/src/compiler/compiler', 'angular2/src/platform/dom/dom_tokens', 'angular2/src/platform/dom/dom_adapter', 'angular2/src/core/render/api', 'angular2/src/platform/dom/dom_renderer', 'angular2/src/platform/dom/shared_styles_host', 'angular2/platform/common_dom', 'angular2/src/platform/dom/events/dom_events', 'angular2/platform/common', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, compiler_1, parse5_adapter_1, animation_builder_1, animation_builder_mock_1, directive_resolver_mock_1, view_resolver_mock_1, mock_location_strategy_1, ng_zone_mock_1, test_component_builder_1, xhr_1, utils_1, compiler_2, dom_tokens_1, dom_adapter_1, api_1, dom_renderer_1, shared_styles_host_1, common_dom_1, dom_events_1, common_1, lang_1, utils_2;
    var TEST_SERVER_PLATFORM_PROVIDERS, TEST_SERVER_APPLICATION_PROVIDERS;
    function initServerTests() {
        parse5_adapter_1.Parse5DomAdapter.makeCurrent();
        utils_1.BrowserDetection.setup();
    }
    function appDoc() {
        try {
            return dom_adapter_1.DOM.defaultDoc();
        }
        catch (e) {
            return null;
        }
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (compiler_1_1) {
                compiler_1 = compiler_1_1;
            },
            function (parse5_adapter_1_1) {
                parse5_adapter_1 = parse5_adapter_1_1;
            },
            function (animation_builder_1_1) {
                animation_builder_1 = animation_builder_1_1;
            },
            function (animation_builder_mock_1_1) {
                animation_builder_mock_1 = animation_builder_mock_1_1;
            },
            function (directive_resolver_mock_1_1) {
                directive_resolver_mock_1 = directive_resolver_mock_1_1;
            },
            function (view_resolver_mock_1_1) {
                view_resolver_mock_1 = view_resolver_mock_1_1;
            },
            function (mock_location_strategy_1_1) {
                mock_location_strategy_1 = mock_location_strategy_1_1;
            },
            function (ng_zone_mock_1_1) {
                ng_zone_mock_1 = ng_zone_mock_1_1;
            },
            function (test_component_builder_1_1) {
                test_component_builder_1 = test_component_builder_1_1;
            },
            function (xhr_1_1) {
                xhr_1 = xhr_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
                utils_2 = utils_1_1;
            },
            function (compiler_2_1) {
                compiler_2 = compiler_2_1;
            },
            function (dom_tokens_1_1) {
                dom_tokens_1 = dom_tokens_1_1;
            },
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            },
            function (api_1_1) {
                api_1 = api_1_1;
            },
            function (dom_renderer_1_1) {
                dom_renderer_1 = dom_renderer_1_1;
            },
            function (shared_styles_host_1_1) {
                shared_styles_host_1 = shared_styles_host_1_1;
            },
            function (common_dom_1_1) {
                common_dom_1 = common_dom_1_1;
            },
            function (dom_events_1_1) {
                dom_events_1 = dom_events_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * Default platform providers for testing.
             */
            exports_1("TEST_SERVER_PLATFORM_PROVIDERS", TEST_SERVER_PLATFORM_PROVIDERS = lang_1.CONST_EXPR([
                core_1.PLATFORM_COMMON_PROVIDERS,
                new core_1.Provider(core_1.PLATFORM_INITIALIZER, { useValue: initServerTests, multi: true })
            ]));
            /**
             * Default application providers for testing.
             */
            exports_1("TEST_SERVER_APPLICATION_PROVIDERS", TEST_SERVER_APPLICATION_PROVIDERS = lang_1.CONST_EXPR([
                // TODO(julie): when angular2/platform/server is available, use that instead of making our own
                // list here.
                core_1.APPLICATION_COMMON_PROVIDERS,
                compiler_2.COMPILER_PROVIDERS,
                new core_1.Provider(dom_tokens_1.DOCUMENT, { useFactory: appDoc }),
                new core_1.Provider(dom_renderer_1.DomRootRenderer, { useClass: dom_renderer_1.DomRootRenderer_ }),
                new core_1.Provider(api_1.RootRenderer, { useExisting: dom_renderer_1.DomRootRenderer }),
                common_dom_1.EventManager,
                new core_1.Provider(common_dom_1.EVENT_MANAGER_PLUGINS, { useClass: dom_events_1.DomEventsPlugin, multi: true }),
                new core_1.Provider(xhr_1.XHR, { useClass: xhr_1.XHR }),
                new core_1.Provider(core_1.APP_ID, { useValue: 'a' }),
                new core_1.Provider(shared_styles_host_1.SharedStylesHost, { useExisting: shared_styles_host_1.DomSharedStylesHost }),
                shared_styles_host_1.DomSharedStylesHost,
                common_dom_1.ELEMENT_PROBE_PROVIDERS,
                new core_1.Provider(compiler_1.DirectiveResolver, { useClass: directive_resolver_mock_1.MockDirectiveResolver }),
                new core_1.Provider(compiler_1.ViewResolver, { useClass: view_resolver_mock_1.MockViewResolver }),
                utils_2.Log,
                test_component_builder_1.TestComponentBuilder,
                new core_1.Provider(core_1.NgZone, { useClass: ng_zone_mock_1.MockNgZone }),
                new core_1.Provider(common_1.LocationStrategy, { useClass: mock_location_strategy_1.MockLocationStrategy }),
                new core_1.Provider(animation_builder_1.AnimationBuilder, { useClass: animation_builder_mock_1.MockAnimationBuilder }),
            ]));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3BsYXRmb3JtL3Rlc3Rpbmcvc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFtRGEsOEJBQThCLEVBZ0I5QixpQ0FBaUM7SUF4QjlDO1FBQ0UsaUNBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0Isd0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQVVEO1FBQ0UsSUFBSSxDQUFDO1lBQ0gsTUFBTSxDQUFDLGlCQUFHLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDMUIsQ0FBRTtRQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztJQUNILENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBZEQ7O2VBRUc7WUFDVSw0Q0FBQSw4QkFBOEIsR0FBMkMsaUJBQVUsQ0FBQztnQkFDL0YsZ0NBQXlCO2dCQUN6QixJQUFJLGVBQVEsQ0FBQywyQkFBb0IsRUFBRSxFQUFDLFFBQVEsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDO2FBQzdFLENBQUMsQ0FBQSxDQUFDO1lBVUg7O2VBRUc7WUFDVSwrQ0FBQSxpQ0FBaUMsR0FDMUMsaUJBQVUsQ0FBQztnQkFDVCw4RkFBOEY7Z0JBQzlGLGFBQWE7Z0JBQ2IsbUNBQTRCO2dCQUM1Qiw2QkFBa0I7Z0JBQ2xCLElBQUksZUFBUSxDQUFDLHFCQUFRLEVBQUUsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLENBQUM7Z0JBQzVDLElBQUksZUFBUSxDQUFDLDhCQUFlLEVBQUUsRUFBQyxRQUFRLEVBQUUsK0JBQWdCLEVBQUMsQ0FBQztnQkFDM0QsSUFBSSxlQUFRLENBQUMsa0JBQVksRUFBRSxFQUFDLFdBQVcsRUFBRSw4QkFBZSxFQUFDLENBQUM7Z0JBQzFELHlCQUFZO2dCQUNaLElBQUksZUFBUSxDQUFDLGtDQUFxQixFQUFFLEVBQUMsUUFBUSxFQUFFLDRCQUFlLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDO2dCQUM3RSxJQUFJLGVBQVEsQ0FBQyxTQUFHLEVBQUUsRUFBQyxRQUFRLEVBQUUsU0FBRyxFQUFDLENBQUM7Z0JBQ2xDLElBQUksZUFBUSxDQUFDLGFBQU0sRUFBRSxFQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUMsQ0FBQztnQkFDckMsSUFBSSxlQUFRLENBQUMscUNBQWdCLEVBQUUsRUFBQyxXQUFXLEVBQUUsd0NBQW1CLEVBQUMsQ0FBQztnQkFDbEUsd0NBQW1CO2dCQUNuQixvQ0FBdUI7Z0JBQ3ZCLElBQUksZUFBUSxDQUFDLDRCQUFpQixFQUFFLEVBQUMsUUFBUSxFQUFFLCtDQUFxQixFQUFDLENBQUM7Z0JBQ2xFLElBQUksZUFBUSxDQUFDLHVCQUFZLEVBQUUsRUFBQyxRQUFRLEVBQUUscUNBQWdCLEVBQUMsQ0FBQztnQkFDeEQsV0FBRztnQkFDSCw2Q0FBb0I7Z0JBQ3BCLElBQUksZUFBUSxDQUFDLGFBQU0sRUFBRSxFQUFDLFFBQVEsRUFBRSx5QkFBVSxFQUFDLENBQUM7Z0JBQzVDLElBQUksZUFBUSxDQUFDLHlCQUFnQixFQUFFLEVBQUMsUUFBUSxFQUFFLDZDQUFvQixFQUFDLENBQUM7Z0JBQ2hFLElBQUksZUFBUSxDQUFDLG9DQUFnQixFQUFFLEVBQUMsUUFBUSxFQUFFLDZDQUFvQixFQUFDLENBQUM7YUFDakUsQ0FBQyxDQUFBLENBQUMiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvcGxhdGZvcm0vdGVzdGluZy9zZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBUFBfSUQsXG4gIE5nWm9uZSxcbiAgUHJvdmlkZXIsXG4gIFBMQVRGT1JNX0NPTU1PTl9QUk9WSURFUlMsXG4gIFBMQVRGT1JNX0lOSVRJQUxJWkVSLFxuICBBUFBMSUNBVElPTl9DT01NT05fUFJPVklERVJTLFxuICBSZW5kZXJlclxufSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7RGlyZWN0aXZlUmVzb2x2ZXIsIFZpZXdSZXNvbHZlcn0gZnJvbSAnYW5ndWxhcjIvY29tcGlsZXInO1xuXG5pbXBvcnQge1BhcnNlNURvbUFkYXB0ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9zZXJ2ZXIvcGFyc2U1X2FkYXB0ZXInO1xuXG5pbXBvcnQge0FuaW1hdGlvbkJ1aWxkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9hbmltYXRlL2FuaW1hdGlvbl9idWlsZGVyJztcbmltcG9ydCB7TW9ja0FuaW1hdGlvbkJ1aWxkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9tb2NrL2FuaW1hdGlvbl9idWlsZGVyX21vY2snO1xuaW1wb3J0IHtNb2NrRGlyZWN0aXZlUmVzb2x2ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9tb2NrL2RpcmVjdGl2ZV9yZXNvbHZlcl9tb2NrJztcbmltcG9ydCB7TW9ja1ZpZXdSZXNvbHZlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL21vY2svdmlld19yZXNvbHZlcl9tb2NrJztcbmltcG9ydCB7TW9ja0xvY2F0aW9uU3RyYXRlZ3l9IGZyb20gJ2FuZ3VsYXIyL3NyYy9tb2NrL21vY2tfbG9jYXRpb25fc3RyYXRlZ3knO1xuaW1wb3J0IHtNb2NrTmdab25lfSBmcm9tICdhbmd1bGFyMi9zcmMvbW9jay9uZ196b25lX21vY2snO1xuXG5pbXBvcnQge1Rlc3RDb21wb25lbnRCdWlsZGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvdGVzdGluZy90ZXN0X2NvbXBvbmVudF9idWlsZGVyJztcbmltcG9ydCB7WEhSfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIveGhyJztcbmltcG9ydCB7QnJvd3NlckRldGVjdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3Rlc3RpbmcvdXRpbHMnO1xuXG5pbXBvcnQge0NPTVBJTEVSX1BST1ZJREVSU30gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL2NvbXBpbGVyJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZG9tX3Rva2Vucyc7XG5pbXBvcnQge0RPTX0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fYWRhcHRlcic7XG5pbXBvcnQge1Jvb3RSZW5kZXJlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVuZGVyL2FwaSc7XG5pbXBvcnQge0RvbVJvb3RSZW5kZXJlciwgRG9tUm9vdFJlbmRlcmVyX30gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fcmVuZGVyZXInO1xuaW1wb3J0IHtEb21TaGFyZWRTdHlsZXNIb3N0LCBTaGFyZWRTdHlsZXNIb3N0fSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL3NoYXJlZF9zdHlsZXNfaG9zdCc7XG5cbmltcG9ydCB7XG4gIEV2ZW50TWFuYWdlcixcbiAgRVZFTlRfTUFOQUdFUl9QTFVHSU5TLFxuICBFTEVNRU5UX1BST0JFX1BST1ZJREVSU1xufSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9jb21tb25fZG9tJztcbmltcG9ydCB7RG9tRXZlbnRzUGx1Z2lufSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2V2ZW50cy9kb21fZXZlbnRzJztcbmltcG9ydCB7TG9jYXRpb25TdHJhdGVneX0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vY29tbW9uJztcblxuaW1wb3J0IHtDT05TVF9FWFBSfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG5pbXBvcnQge0xvZ30gZnJvbSAnYW5ndWxhcjIvc3JjL3Rlc3RpbmcvdXRpbHMnO1xuXG5mdW5jdGlvbiBpbml0U2VydmVyVGVzdHMoKSB7XG4gIFBhcnNlNURvbUFkYXB0ZXIubWFrZUN1cnJlbnQoKTtcbiAgQnJvd3NlckRldGVjdGlvbi5zZXR1cCgpO1xufVxuXG4vKipcbiAqIERlZmF1bHQgcGxhdGZvcm0gcHJvdmlkZXJzIGZvciB0ZXN0aW5nLlxuICovXG5leHBvcnQgY29uc3QgVEVTVF9TRVJWRVJfUExBVEZPUk1fUFJPVklERVJTOiBBcnJheTxhbnkgLypUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXSovPiA9IENPTlNUX0VYUFIoW1xuICBQTEFURk9STV9DT01NT05fUFJPVklERVJTLFxuICBuZXcgUHJvdmlkZXIoUExBVEZPUk1fSU5JVElBTElaRVIsIHt1c2VWYWx1ZTogaW5pdFNlcnZlclRlc3RzLCBtdWx0aTogdHJ1ZX0pXG5dKTtcblxuZnVuY3Rpb24gYXBwRG9jKCkge1xuICB0cnkge1xuICAgIHJldHVybiBET00uZGVmYXVsdERvYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuLyoqXG4gKiBEZWZhdWx0IGFwcGxpY2F0aW9uIHByb3ZpZGVycyBmb3IgdGVzdGluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IFRFU1RfU0VSVkVSX0FQUExJQ0FUSU9OX1BST1ZJREVSUzogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPVxuICAgIENPTlNUX0VYUFIoW1xuICAgICAgLy8gVE9ETyhqdWxpZSk6IHdoZW4gYW5ndWxhcjIvcGxhdGZvcm0vc2VydmVyIGlzIGF2YWlsYWJsZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiBtYWtpbmcgb3VyIG93blxuICAgICAgLy8gbGlzdCBoZXJlLlxuICAgICAgQVBQTElDQVRJT05fQ09NTU9OX1BST1ZJREVSUyxcbiAgICAgIENPTVBJTEVSX1BST1ZJREVSUyxcbiAgICAgIG5ldyBQcm92aWRlcihET0NVTUVOVCwge3VzZUZhY3Rvcnk6IGFwcERvY30pLFxuICAgICAgbmV3IFByb3ZpZGVyKERvbVJvb3RSZW5kZXJlciwge3VzZUNsYXNzOiBEb21Sb290UmVuZGVyZXJffSksXG4gICAgICBuZXcgUHJvdmlkZXIoUm9vdFJlbmRlcmVyLCB7dXNlRXhpc3Rpbmc6IERvbVJvb3RSZW5kZXJlcn0pLFxuICAgICAgRXZlbnRNYW5hZ2VyLFxuICAgICAgbmV3IFByb3ZpZGVyKEVWRU5UX01BTkFHRVJfUExVR0lOUywge3VzZUNsYXNzOiBEb21FdmVudHNQbHVnaW4sIG11bHRpOiB0cnVlfSksXG4gICAgICBuZXcgUHJvdmlkZXIoWEhSLCB7dXNlQ2xhc3M6IFhIUn0pLFxuICAgICAgbmV3IFByb3ZpZGVyKEFQUF9JRCwge3VzZVZhbHVlOiAnYSd9KSxcbiAgICAgIG5ldyBQcm92aWRlcihTaGFyZWRTdHlsZXNIb3N0LCB7dXNlRXhpc3Rpbmc6IERvbVNoYXJlZFN0eWxlc0hvc3R9KSxcbiAgICAgIERvbVNoYXJlZFN0eWxlc0hvc3QsXG4gICAgICBFTEVNRU5UX1BST0JFX1BST1ZJREVSUyxcbiAgICAgIG5ldyBQcm92aWRlcihEaXJlY3RpdmVSZXNvbHZlciwge3VzZUNsYXNzOiBNb2NrRGlyZWN0aXZlUmVzb2x2ZXJ9KSxcbiAgICAgIG5ldyBQcm92aWRlcihWaWV3UmVzb2x2ZXIsIHt1c2VDbGFzczogTW9ja1ZpZXdSZXNvbHZlcn0pLFxuICAgICAgTG9nLFxuICAgICAgVGVzdENvbXBvbmVudEJ1aWxkZXIsXG4gICAgICBuZXcgUHJvdmlkZXIoTmdab25lLCB7dXNlQ2xhc3M6IE1vY2tOZ1pvbmV9KSxcbiAgICAgIG5ldyBQcm92aWRlcihMb2NhdGlvblN0cmF0ZWd5LCB7dXNlQ2xhc3M6IE1vY2tMb2NhdGlvblN0cmF0ZWd5fSksXG4gICAgICBuZXcgUHJvdmlkZXIoQW5pbWF0aW9uQnVpbGRlciwge3VzZUNsYXNzOiBNb2NrQW5pbWF0aW9uQnVpbGRlcn0pLFxuICAgIF0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
