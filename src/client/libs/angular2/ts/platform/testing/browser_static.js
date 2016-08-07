System.register(['angular2/core', 'angular2/src/platform/browser_common', 'angular2/src/platform/browser/browser_adapter', 'angular2/src/animate/animation_builder', 'angular2/src/mock/animation_builder_mock', 'angular2/src/mock/directive_resolver_mock', 'angular2/src/mock/view_resolver_mock', 'angular2/src/mock/mock_location_strategy', 'angular2/src/router/location/location_strategy', 'angular2/src/mock/ng_zone_mock', "angular2/src/platform/browser/xhr_impl", 'angular2/compiler', 'angular2/src/testing/test_component_builder', 'angular2/src/testing/utils', 'angular2/platform/common_dom', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, browser_common_1, browser_adapter_1, animation_builder_1, animation_builder_mock_1, directive_resolver_mock_1, view_resolver_mock_1, mock_location_strategy_1, location_strategy_1, ng_zone_mock_1, xhr_impl_1, compiler_1, test_component_builder_1, utils_1, common_dom_1, lang_1, utils_2;
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
            function (location_strategy_1_1) {
                location_strategy_1 = location_strategy_1_1;
            },
            function (ng_zone_mock_1_1) {
                ng_zone_mock_1 = ng_zone_mock_1_1;
            },
            function (xhr_impl_1_1) {
                xhr_impl_1 = xhr_impl_1_1;
            },
            function (compiler_1_1) {
                compiler_1 = compiler_1_1;
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
             * Default patform providers for testing without a compiler.
             */
            exports_1("TEST_BROWSER_STATIC_PLATFORM_PROVIDERS", TEST_BROWSER_STATIC_PLATFORM_PROVIDERS = lang_1.CONST_EXPR([
                core_1.PLATFORM_COMMON_PROVIDERS,
                new core_1.Provider(core_1.PLATFORM_INITIALIZER, { useValue: initBrowserTests, multi: true })
            ]));
            exports_1("ADDITIONAL_TEST_BROWSER_PROVIDERS", ADDITIONAL_TEST_BROWSER_PROVIDERS = lang_1.CONST_EXPR([
                new core_1.Provider(core_1.APP_ID, { useValue: 'a' }),
                common_dom_1.ELEMENT_PROBE_PROVIDERS,
                new core_1.Provider(core_1.DirectiveResolver, { useClass: directive_resolver_mock_1.MockDirectiveResolver }),
                new core_1.Provider(core_1.ViewResolver, { useClass: view_resolver_mock_1.MockViewResolver }),
                utils_2.Log,
                test_component_builder_1.TestComponentBuilder,
                new core_1.Provider(core_1.NgZone, { useClass: ng_zone_mock_1.MockNgZone }),
                new core_1.Provider(location_strategy_1.LocationStrategy, { useClass: mock_location_strategy_1.MockLocationStrategy }),
                new core_1.Provider(animation_builder_1.AnimationBuilder, { useClass: animation_builder_mock_1.MockAnimationBuilder }),
            ]));
            /**
             * Default application providers for testing without a compiler.
             */
            exports_1("TEST_BROWSER_STATIC_APPLICATION_PROVIDERS", TEST_BROWSER_STATIC_APPLICATION_PROVIDERS = lang_1.CONST_EXPR([
                browser_common_1.BROWSER_APP_COMMON_PROVIDERS,
                new core_1.Provider(compiler_1.XHR, { useClass: xhr_impl_1.XHRImpl }),
                ADDITIONAL_TEST_BROWSER_PROVIDERS
            ]));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvcGxhdGZvcm0vdGVzdGluZy9icm93c2VyX3N0YXRpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBeUNhLHNDQUFzQyxFQU10QyxpQ0FBaUMsRUFnQmpDLHlDQUF5QztJQTlCdEQ7UUFDRSxtQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNoQyx3QkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMzQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUVEOztlQUVHO1lBQ1Usb0RBQUEsc0NBQXNDLEdBQy9DLGlCQUFVLENBQUM7Z0JBQ1QsZ0NBQXlCO2dCQUN6QixJQUFJLGVBQVEsQ0FBQywyQkFBb0IsRUFBRSxFQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUM7YUFDOUUsQ0FBQyxDQUFBLENBQUM7WUFFTSwrQ0FBQSxpQ0FBaUMsR0FDMUMsaUJBQVUsQ0FBQztnQkFDVCxJQUFJLGVBQVEsQ0FBQyxhQUFNLEVBQUUsRUFBQyxRQUFRLEVBQUUsR0FBRyxFQUFDLENBQUM7Z0JBQ3JDLG9DQUF1QjtnQkFDdkIsSUFBSSxlQUFRLENBQUMsd0JBQWlCLEVBQUUsRUFBQyxRQUFRLEVBQUUsK0NBQXFCLEVBQUMsQ0FBQztnQkFDbEUsSUFBSSxlQUFRLENBQUMsbUJBQVksRUFBRSxFQUFDLFFBQVEsRUFBRSxxQ0FBZ0IsRUFBQyxDQUFDO2dCQUN4RCxXQUFHO2dCQUNILDZDQUFvQjtnQkFDcEIsSUFBSSxlQUFRLENBQUMsYUFBTSxFQUFFLEVBQUMsUUFBUSxFQUFFLHlCQUFVLEVBQUMsQ0FBQztnQkFDNUMsSUFBSSxlQUFRLENBQUMsb0NBQWdCLEVBQUUsRUFBQyxRQUFRLEVBQUUsNkNBQW9CLEVBQUMsQ0FBQztnQkFDaEUsSUFBSSxlQUFRLENBQUMsb0NBQWdCLEVBQUUsRUFBQyxRQUFRLEVBQUUsNkNBQW9CLEVBQUMsQ0FBQzthQUNqRSxDQUFDLENBQUEsQ0FBQztZQUVQOztlQUVHO1lBQ1UsdURBQUEseUNBQXlDLEdBQ2xELGlCQUFVLENBQUM7Z0JBQ1QsNkNBQTRCO2dCQUM1QixJQUFJLGVBQVEsQ0FBQyxjQUFHLEVBQUUsRUFBQyxRQUFRLEVBQUUsa0JBQU8sRUFBQyxDQUFDO2dCQUN0QyxpQ0FBaUM7YUFDbEMsQ0FBQyxDQUFBLENBQUMiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9wbGF0Zm9ybS90ZXN0aW5nL2Jyb3dzZXJfc3RhdGljLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQVBQX0lELFxuICBEaXJlY3RpdmVSZXNvbHZlcixcbiAgTmdab25lLFxuICBQcm92aWRlcixcbiAgVmlld1Jlc29sdmVyLFxuICBQTEFURk9STV9DT01NT05fUFJPVklERVJTLFxuICBQTEFURk9STV9JTklUSUFMSVpFUlxufSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7QlJPV1NFUl9BUFBfQ09NTU9OX1BST1ZJREVSU30gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2Jyb3dzZXJfY29tbW9uJztcbmltcG9ydCB7QnJvd3NlckRvbUFkYXB0ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9icm93c2VyL2Jyb3dzZXJfYWRhcHRlcic7XG5cbmltcG9ydCB7QW5pbWF0aW9uQnVpbGRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2FuaW1hdGUvYW5pbWF0aW9uX2J1aWxkZXInO1xuaW1wb3J0IHtNb2NrQW5pbWF0aW9uQnVpbGRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL21vY2svYW5pbWF0aW9uX2J1aWxkZXJfbW9jayc7XG5pbXBvcnQge01vY2tEaXJlY3RpdmVSZXNvbHZlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL21vY2svZGlyZWN0aXZlX3Jlc29sdmVyX21vY2snO1xuaW1wb3J0IHtNb2NrVmlld1Jlc29sdmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvbW9jay92aWV3X3Jlc29sdmVyX21vY2snO1xuaW1wb3J0IHtNb2NrTG9jYXRpb25TdHJhdGVneX0gZnJvbSAnYW5ndWxhcjIvc3JjL21vY2svbW9ja19sb2NhdGlvbl9zdHJhdGVneSc7XG5pbXBvcnQge0xvY2F0aW9uU3RyYXRlZ3l9IGZyb20gJ2FuZ3VsYXIyL3NyYy9yb3V0ZXIvbG9jYXRpb24vbG9jYXRpb25fc3RyYXRlZ3knO1xuaW1wb3J0IHtNb2NrTmdab25lfSBmcm9tICdhbmd1bGFyMi9zcmMvbW9jay9uZ196b25lX21vY2snO1xuXG5pbXBvcnQge1hIUkltcGx9IGZyb20gXCJhbmd1bGFyMi9zcmMvcGxhdGZvcm0vYnJvd3Nlci94aHJfaW1wbFwiO1xuaW1wb3J0IHtYSFJ9IGZyb20gJ2FuZ3VsYXIyL2NvbXBpbGVyJztcblxuaW1wb3J0IHtUZXN0Q29tcG9uZW50QnVpbGRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL3Rlc3RpbmcvdGVzdF9jb21wb25lbnRfYnVpbGRlcic7XG5cbmltcG9ydCB7QnJvd3NlckRldGVjdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3Rlc3RpbmcvdXRpbHMnO1xuXG5pbXBvcnQge0VMRU1FTlRfUFJPQkVfUFJPVklERVJTfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9jb21tb25fZG9tJztcblxuaW1wb3J0IHtDT05TVF9FWFBSfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG5pbXBvcnQge0xvZ30gZnJvbSAnYW5ndWxhcjIvc3JjL3Rlc3RpbmcvdXRpbHMnO1xuXG5mdW5jdGlvbiBpbml0QnJvd3NlclRlc3RzKCkge1xuICBCcm93c2VyRG9tQWRhcHRlci5tYWtlQ3VycmVudCgpO1xuICBCcm93c2VyRGV0ZWN0aW9uLnNldHVwKCk7XG59XG5cbi8qKlxuICogRGVmYXVsdCBwYXRmb3JtIHByb3ZpZGVycyBmb3IgdGVzdGluZyB3aXRob3V0IGEgY29tcGlsZXIuXG4gKi9cbmV4cG9ydCBjb25zdCBURVNUX0JST1dTRVJfU1RBVElDX1BMQVRGT1JNX1BST1ZJREVSUzogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPVxuICAgIENPTlNUX0VYUFIoW1xuICAgICAgUExBVEZPUk1fQ09NTU9OX1BST1ZJREVSUyxcbiAgICAgIG5ldyBQcm92aWRlcihQTEFURk9STV9JTklUSUFMSVpFUiwge3VzZVZhbHVlOiBpbml0QnJvd3NlclRlc3RzLCBtdWx0aTogdHJ1ZX0pXG4gICAgXSk7XG5cbmV4cG9ydCBjb25zdCBBRERJVElPTkFMX1RFU1RfQlJPV1NFUl9QUk9WSURFUlM6IEFycmF5PGFueSAvKlR5cGUgfCBQcm92aWRlciB8IGFueVtdKi8+ID1cbiAgICBDT05TVF9FWFBSKFtcbiAgICAgIG5ldyBQcm92aWRlcihBUFBfSUQsIHt1c2VWYWx1ZTogJ2EnfSksXG4gICAgICBFTEVNRU5UX1BST0JFX1BST1ZJREVSUyxcbiAgICAgIG5ldyBQcm92aWRlcihEaXJlY3RpdmVSZXNvbHZlciwge3VzZUNsYXNzOiBNb2NrRGlyZWN0aXZlUmVzb2x2ZXJ9KSxcbiAgICAgIG5ldyBQcm92aWRlcihWaWV3UmVzb2x2ZXIsIHt1c2VDbGFzczogTW9ja1ZpZXdSZXNvbHZlcn0pLFxuICAgICAgTG9nLFxuICAgICAgVGVzdENvbXBvbmVudEJ1aWxkZXIsXG4gICAgICBuZXcgUHJvdmlkZXIoTmdab25lLCB7dXNlQ2xhc3M6IE1vY2tOZ1pvbmV9KSxcbiAgICAgIG5ldyBQcm92aWRlcihMb2NhdGlvblN0cmF0ZWd5LCB7dXNlQ2xhc3M6IE1vY2tMb2NhdGlvblN0cmF0ZWd5fSksXG4gICAgICBuZXcgUHJvdmlkZXIoQW5pbWF0aW9uQnVpbGRlciwge3VzZUNsYXNzOiBNb2NrQW5pbWF0aW9uQnVpbGRlcn0pLFxuICAgIF0pO1xuXG4vKipcbiAqIERlZmF1bHQgYXBwbGljYXRpb24gcHJvdmlkZXJzIGZvciB0ZXN0aW5nIHdpdGhvdXQgYSBjb21waWxlci5cbiAqL1xuZXhwb3J0IGNvbnN0IFRFU1RfQlJPV1NFUl9TVEFUSUNfQVBQTElDQVRJT05fUFJPVklERVJTOiBBcnJheTxhbnkgLypUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXSovPiA9XG4gICAgQ09OU1RfRVhQUihbXG4gICAgICBCUk9XU0VSX0FQUF9DT01NT05fUFJPVklERVJTLFxuICAgICAgbmV3IFByb3ZpZGVyKFhIUiwge3VzZUNsYXNzOiBYSFJJbXBsfSksXG4gICAgICBBRERJVElPTkFMX1RFU1RfQlJPV1NFUl9QUk9WSURFUlNcbiAgICBdKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
