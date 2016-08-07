System.register(['angular2/core', 'angular2/compiler', 'angular2/src/platform/browser_common', 'angular2/src/platform/browser/browser_adapter', 'angular2/src/animate/animation_builder', 'angular2/src/mock/animation_builder_mock', 'angular2/src/mock/directive_resolver_mock', 'angular2/src/mock/view_resolver_mock', 'angular2/src/mock/mock_location_strategy', 'angular2/platform/common', 'angular2/src/mock/ng_zone_mock', "angular2/src/platform/browser/xhr_impl", 'angular2/src/testing/test_component_builder', 'angular2/src/testing/utils', 'angular2/platform/common_dom', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, compiler_1, browser_common_1, browser_adapter_1, animation_builder_1, animation_builder_mock_1, directive_resolver_mock_1, view_resolver_mock_1, mock_location_strategy_1, common_1, ng_zone_mock_1, xhr_impl_1, compiler_2, test_component_builder_1, utils_1, common_dom_1, lang_1, utils_2;
    var TEST_BROWSER_STATIC_PLATFORM_PROVIDERS, ADDITIONAL_TEST_BROWSER_PROVIDERS, TEST_BROWSER_STATIC_APPLICATION_PROVIDERS;
    function initBrowserTests() {
        browser_adapter_1.BrowserDomAdapter.makeCurrent();
        utils_1.BrowserDetection.setup();
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (compiler_1_1) {
                compiler_1 = compiler_1_1;
                compiler_2 = compiler_1_1;
            },
            function (browser_common_1_1) {
                browser_common_1 = browser_common_1_1;
            },
            function (browser_adapter_1_1) {
                browser_adapter_1 = browser_adapter_1_1;
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
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (ng_zone_mock_1_1) {
                ng_zone_mock_1 = ng_zone_mock_1_1;
            },
            function (xhr_impl_1_1) {
                xhr_impl_1 = xhr_impl_1_1;
            },
            function (test_component_builder_1_1) {
                test_component_builder_1 = test_component_builder_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
                utils_2 = utils_1_1;
            },
            function (common_dom_1_1) {
                common_dom_1 = common_dom_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * Default platform providers for testing without a compiler.
             */
            exports_1("TEST_BROWSER_STATIC_PLATFORM_PROVIDERS", TEST_BROWSER_STATIC_PLATFORM_PROVIDERS = lang_1.CONST_EXPR([
                core_1.PLATFORM_COMMON_PROVIDERS,
                new core_1.Provider(core_1.PLATFORM_INITIALIZER, { useValue: initBrowserTests, multi: true })
            ]));
            exports_1("ADDITIONAL_TEST_BROWSER_PROVIDERS", ADDITIONAL_TEST_BROWSER_PROVIDERS = lang_1.CONST_EXPR([
                new core_1.Provider(core_1.APP_ID, { useValue: 'a' }),
                common_dom_1.ELEMENT_PROBE_PROVIDERS,
                new core_1.Provider(compiler_1.DirectiveResolver, { useClass: directive_resolver_mock_1.MockDirectiveResolver }),
                new core_1.Provider(compiler_1.ViewResolver, { useClass: view_resolver_mock_1.MockViewResolver }),
                utils_2.Log,
                test_component_builder_1.TestComponentBuilder,
                new core_1.Provider(core_1.NgZone, { useClass: ng_zone_mock_1.MockNgZone }),
                new core_1.Provider(common_1.LocationStrategy, { useClass: mock_location_strategy_1.MockLocationStrategy }),
                new core_1.Provider(animation_builder_1.AnimationBuilder, { useClass: animation_builder_mock_1.MockAnimationBuilder }),
            ]));
            /**
             * Default application providers for testing without a compiler.
             */
            exports_1("TEST_BROWSER_STATIC_APPLICATION_PROVIDERS", TEST_BROWSER_STATIC_APPLICATION_PROVIDERS = lang_1.CONST_EXPR([
                browser_common_1.BROWSER_APP_COMMON_PROVIDERS,
                new core_1.Provider(compiler_2.XHR, { useClass: xhr_impl_1.XHRImpl }),
                ADDITIONAL_TEST_BROWSER_PROVIDERS
            ]));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3BsYXRmb3JtL3Rlc3RpbmcvYnJvd3Nlcl9zdGF0aWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQXdDYSxzQ0FBc0MsRUFNdEMsaUNBQWlDLEVBZ0JqQyx5Q0FBeUM7SUE5QnREO1FBQ0UsbUNBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDaEMsd0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBRUQ7O2VBRUc7WUFDVSxvREFBQSxzQ0FBc0MsR0FDL0MsaUJBQVUsQ0FBQztnQkFDVCxnQ0FBeUI7Z0JBQ3pCLElBQUksZUFBUSxDQUFDLDJCQUFvQixFQUFFLEVBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQzthQUM5RSxDQUFDLENBQUEsQ0FBQztZQUVNLCtDQUFBLGlDQUFpQyxHQUMxQyxpQkFBVSxDQUFDO2dCQUNULElBQUksZUFBUSxDQUFDLGFBQU0sRUFBRSxFQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUMsQ0FBQztnQkFDckMsb0NBQXVCO2dCQUN2QixJQUFJLGVBQVEsQ0FBQyw0QkFBaUIsRUFBRSxFQUFDLFFBQVEsRUFBRSwrQ0FBcUIsRUFBQyxDQUFDO2dCQUNsRSxJQUFJLGVBQVEsQ0FBQyx1QkFBWSxFQUFFLEVBQUMsUUFBUSxFQUFFLHFDQUFnQixFQUFDLENBQUM7Z0JBQ3hELFdBQUc7Z0JBQ0gsNkNBQW9CO2dCQUNwQixJQUFJLGVBQVEsQ0FBQyxhQUFNLEVBQUUsRUFBQyxRQUFRLEVBQUUseUJBQVUsRUFBQyxDQUFDO2dCQUM1QyxJQUFJLGVBQVEsQ0FBQyx5QkFBZ0IsRUFBRSxFQUFDLFFBQVEsRUFBRSw2Q0FBb0IsRUFBQyxDQUFDO2dCQUNoRSxJQUFJLGVBQVEsQ0FBQyxvQ0FBZ0IsRUFBRSxFQUFDLFFBQVEsRUFBRSw2Q0FBb0IsRUFBQyxDQUFDO2FBQ2pFLENBQUMsQ0FBQSxDQUFDO1lBRVA7O2VBRUc7WUFDVSx1REFBQSx5Q0FBeUMsR0FDbEQsaUJBQVUsQ0FBQztnQkFDVCw2Q0FBNEI7Z0JBQzVCLElBQUksZUFBUSxDQUFDLGNBQUcsRUFBRSxFQUFDLFFBQVEsRUFBRSxrQkFBTyxFQUFDLENBQUM7Z0JBQ3RDLGlDQUFpQzthQUNsQyxDQUFDLENBQUEsQ0FBQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9wbGF0Zm9ybS90ZXN0aW5nL2Jyb3dzZXJfc3RhdGljLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQVBQX0lELFxuICBOZ1pvbmUsXG4gIFByb3ZpZGVyLFxuICBQTEFURk9STV9DT01NT05fUFJPVklERVJTLFxuICBQTEFURk9STV9JTklUSUFMSVpFUlxufSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7RGlyZWN0aXZlUmVzb2x2ZXIsIFZpZXdSZXNvbHZlcn0gZnJvbSAnYW5ndWxhcjIvY29tcGlsZXInO1xuaW1wb3J0IHtCUk9XU0VSX0FQUF9DT01NT05fUFJPVklERVJTfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vYnJvd3Nlcl9jb21tb24nO1xuaW1wb3J0IHtCcm93c2VyRG9tQWRhcHRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2Jyb3dzZXIvYnJvd3Nlcl9hZGFwdGVyJztcblxuaW1wb3J0IHtBbmltYXRpb25CdWlsZGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvYW5pbWF0ZS9hbmltYXRpb25fYnVpbGRlcic7XG5pbXBvcnQge01vY2tBbmltYXRpb25CdWlsZGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvbW9jay9hbmltYXRpb25fYnVpbGRlcl9tb2NrJztcbmltcG9ydCB7TW9ja0RpcmVjdGl2ZVJlc29sdmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvbW9jay9kaXJlY3RpdmVfcmVzb2x2ZXJfbW9jayc7XG5pbXBvcnQge01vY2tWaWV3UmVzb2x2ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9tb2NrL3ZpZXdfcmVzb2x2ZXJfbW9jayc7XG5pbXBvcnQge01vY2tMb2NhdGlvblN0cmF0ZWd5fSBmcm9tICdhbmd1bGFyMi9zcmMvbW9jay9tb2NrX2xvY2F0aW9uX3N0cmF0ZWd5JztcbmltcG9ydCB7TG9jYXRpb25TdHJhdGVneX0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vY29tbW9uJztcbmltcG9ydCB7TW9ja05nWm9uZX0gZnJvbSAnYW5ndWxhcjIvc3JjL21vY2svbmdfem9uZV9tb2NrJztcblxuaW1wb3J0IHtYSFJJbXBsfSBmcm9tIFwiYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2Jyb3dzZXIveGhyX2ltcGxcIjtcbmltcG9ydCB7WEhSfSBmcm9tICdhbmd1bGFyMi9jb21waWxlcic7XG5cbmltcG9ydCB7VGVzdENvbXBvbmVudEJ1aWxkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy90ZXN0aW5nL3Rlc3RfY29tcG9uZW50X2J1aWxkZXInO1xuXG5pbXBvcnQge0Jyb3dzZXJEZXRlY3Rpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy90ZXN0aW5nL3V0aWxzJztcblxuaW1wb3J0IHtFTEVNRU5UX1BST0JFX1BST1ZJREVSU30gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vY29tbW9uX2RvbSc7XG5cbmltcG9ydCB7Q09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuaW1wb3J0IHtMb2d9IGZyb20gJ2FuZ3VsYXIyL3NyYy90ZXN0aW5nL3V0aWxzJztcblxuZnVuY3Rpb24gaW5pdEJyb3dzZXJUZXN0cygpIHtcbiAgQnJvd3NlckRvbUFkYXB0ZXIubWFrZUN1cnJlbnQoKTtcbiAgQnJvd3NlckRldGVjdGlvbi5zZXR1cCgpO1xufVxuXG4vKipcbiAqIERlZmF1bHQgcGxhdGZvcm0gcHJvdmlkZXJzIGZvciB0ZXN0aW5nIHdpdGhvdXQgYSBjb21waWxlci5cbiAqL1xuZXhwb3J0IGNvbnN0IFRFU1RfQlJPV1NFUl9TVEFUSUNfUExBVEZPUk1fUFJPVklERVJTOiBBcnJheTxhbnkgLypUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXSovPiA9XG4gICAgQ09OU1RfRVhQUihbXG4gICAgICBQTEFURk9STV9DT01NT05fUFJPVklERVJTLFxuICAgICAgbmV3IFByb3ZpZGVyKFBMQVRGT1JNX0lOSVRJQUxJWkVSLCB7dXNlVmFsdWU6IGluaXRCcm93c2VyVGVzdHMsIG11bHRpOiB0cnVlfSlcbiAgICBdKTtcblxuZXhwb3J0IGNvbnN0IEFERElUSU9OQUxfVEVTVF9CUk9XU0VSX1BST1ZJREVSUzogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPVxuICAgIENPTlNUX0VYUFIoW1xuICAgICAgbmV3IFByb3ZpZGVyKEFQUF9JRCwge3VzZVZhbHVlOiAnYSd9KSxcbiAgICAgIEVMRU1FTlRfUFJPQkVfUFJPVklERVJTLFxuICAgICAgbmV3IFByb3ZpZGVyKERpcmVjdGl2ZVJlc29sdmVyLCB7dXNlQ2xhc3M6IE1vY2tEaXJlY3RpdmVSZXNvbHZlcn0pLFxuICAgICAgbmV3IFByb3ZpZGVyKFZpZXdSZXNvbHZlciwge3VzZUNsYXNzOiBNb2NrVmlld1Jlc29sdmVyfSksXG4gICAgICBMb2csXG4gICAgICBUZXN0Q29tcG9uZW50QnVpbGRlcixcbiAgICAgIG5ldyBQcm92aWRlcihOZ1pvbmUsIHt1c2VDbGFzczogTW9ja05nWm9uZX0pLFxuICAgICAgbmV3IFByb3ZpZGVyKExvY2F0aW9uU3RyYXRlZ3ksIHt1c2VDbGFzczogTW9ja0xvY2F0aW9uU3RyYXRlZ3l9KSxcbiAgICAgIG5ldyBQcm92aWRlcihBbmltYXRpb25CdWlsZGVyLCB7dXNlQ2xhc3M6IE1vY2tBbmltYXRpb25CdWlsZGVyfSksXG4gICAgXSk7XG5cbi8qKlxuICogRGVmYXVsdCBhcHBsaWNhdGlvbiBwcm92aWRlcnMgZm9yIHRlc3Rpbmcgd2l0aG91dCBhIGNvbXBpbGVyLlxuICovXG5leHBvcnQgY29uc3QgVEVTVF9CUk9XU0VSX1NUQVRJQ19BUFBMSUNBVElPTl9QUk9WSURFUlM6IEFycmF5PGFueSAvKlR5cGUgfCBQcm92aWRlciB8IGFueVtdKi8+ID1cbiAgICBDT05TVF9FWFBSKFtcbiAgICAgIEJST1dTRVJfQVBQX0NPTU1PTl9QUk9WSURFUlMsXG4gICAgICBuZXcgUHJvdmlkZXIoWEhSLCB7dXNlQ2xhc3M6IFhIUkltcGx9KSxcbiAgICAgIEFERElUSU9OQUxfVEVTVF9CUk9XU0VSX1BST1ZJREVSU1xuICAgIF0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
