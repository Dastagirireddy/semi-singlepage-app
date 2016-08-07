System.register(['angular2/src/core/angular_entrypoint', 'angular2/src/platform/browser_common', 'angular2/src/facade/lang', 'angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, browser_common_1, core_1;
    var BROWSER_APP_PROVIDERS;
    /**
     * See {@link bootstrap} for more information.
     */
    function bootstrapStatic(appComponentType, customProviders, initReflector) {
        if (lang_1.isPresent(initReflector)) {
            initReflector();
        }
        var appProviders = lang_1.isPresent(customProviders) ? [BROWSER_APP_PROVIDERS, customProviders] : BROWSER_APP_PROVIDERS;
        return core_1.platform(browser_common_1.BROWSER_PROVIDERS).application(appProviders).bootstrap(appComponentType);
    }
    exports_1("bootstrapStatic", bootstrapStatic);
    return {
        setters:[
            function (angular_entrypoint_1_1) {
                exports_1({
                    "AngularEntrypoint": angular_entrypoint_1_1["AngularEntrypoint"]
                });
            },
            function (browser_common_2_1) {
                exports_1({
                    "BROWSER_PROVIDERS": browser_common_2_1["BROWSER_PROVIDERS"],
                    "ELEMENT_PROBE_PROVIDERS": browser_common_2_1["ELEMENT_PROBE_PROVIDERS"],
                    "ELEMENT_PROBE_PROVIDERS_PROD_MODE": browser_common_2_1["ELEMENT_PROBE_PROVIDERS_PROD_MODE"],
                    "inspectNativeElement": browser_common_2_1["inspectNativeElement"],
                    "BrowserDomAdapter": browser_common_2_1["BrowserDomAdapter"],
                    "By": browser_common_2_1["By"],
                    "Title": browser_common_2_1["Title"],
                    "enableDebugTools": browser_common_2_1["enableDebugTools"],
                    "disableDebugTools": browser_common_2_1["disableDebugTools"]
                });
                browser_common_1 = browser_common_2_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            /**
             * An array of providers that should be passed into `application()` when bootstrapping a component
             * when all templates
             * have been precompiled offline.
             */
            exports_1("BROWSER_APP_PROVIDERS", BROWSER_APP_PROVIDERS = browser_common_1.BROWSER_APP_COMMON_PROVIDERS);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvcGxhdGZvcm0vYnJvd3Nlcl9zdGF0aWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQXlCYSxxQkFBcUI7SUFHbEM7O09BRUc7SUFDSCx5QkFBZ0MsZ0JBQXNCLEVBQ3RCLGVBQXdELEVBQ3hELGFBQXdCO1FBQ3RELEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLGFBQWEsRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFFRCxJQUFJLFlBQVksR0FDWixnQkFBUyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsZUFBZSxDQUFDLEdBQUcscUJBQXFCLENBQUM7UUFDbEcsTUFBTSxDQUFDLGVBQVEsQ0FBQyxrQ0FBaUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMzRixDQUFDO0lBVkQsNkNBVUMsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFyQkQ7Ozs7ZUFJRztZQUNVLG1DQUFBLHFCQUFxQixHQUM5Qiw2Q0FBNEIsQ0FBQSxDQUFDIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvcGxhdGZvcm0vYnJvd3Nlcl9zdGF0aWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQge0FuZ3VsYXJFbnRyeXBvaW50fSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9hbmd1bGFyX2VudHJ5cG9pbnQnO1xuZXhwb3J0IHtcbiAgQlJPV1NFUl9QUk9WSURFUlMsXG4gIEVMRU1FTlRfUFJPQkVfUFJPVklERVJTLFxuICBFTEVNRU5UX1BST0JFX1BST1ZJREVSU19QUk9EX01PREUsXG4gIGluc3BlY3ROYXRpdmVFbGVtZW50LFxuICBCcm93c2VyRG9tQWRhcHRlcixcbiAgQnksXG4gIFRpdGxlLFxuICBlbmFibGVEZWJ1Z1Rvb2xzLFxuICBkaXNhYmxlRGVidWdUb29sc1xufSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vYnJvd3Nlcl9jb21tb24nO1xuXG5pbXBvcnQge1R5cGUsIGlzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7XG4gIEJST1dTRVJfUFJPVklERVJTLFxuICBCUk9XU0VSX0FQUF9DT01NT05fUFJPVklERVJTXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9icm93c2VyX2NvbW1vbic7XG5pbXBvcnQge0NvbXBvbmVudFJlZiwgcGxhdGZvcm19IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuXG4vKipcbiAqIEFuIGFycmF5IG9mIHByb3ZpZGVycyB0aGF0IHNob3VsZCBiZSBwYXNzZWQgaW50byBgYXBwbGljYXRpb24oKWAgd2hlbiBib290c3RyYXBwaW5nIGEgY29tcG9uZW50XG4gKiB3aGVuIGFsbCB0ZW1wbGF0ZXNcbiAqIGhhdmUgYmVlbiBwcmVjb21waWxlZCBvZmZsaW5lLlxuICovXG5leHBvcnQgY29uc3QgQlJPV1NFUl9BUFBfUFJPVklERVJTOiBBcnJheTxhbnkgLypUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXSovPiA9XG4gICAgQlJPV1NFUl9BUFBfQ09NTU9OX1BST1ZJREVSUztcblxuLyoqXG4gKiBTZWUge0BsaW5rIGJvb3RzdHJhcH0gZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBib290c3RyYXBTdGF0aWMoYXBwQ29tcG9uZW50VHlwZTogVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tUHJvdmlkZXJzPzogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRSZWZsZWN0b3I/OiBGdW5jdGlvbik6IFByb21pc2U8Q29tcG9uZW50UmVmPiB7XG4gIGlmIChpc1ByZXNlbnQoaW5pdFJlZmxlY3RvcikpIHtcbiAgICBpbml0UmVmbGVjdG9yKCk7XG4gIH1cblxuICBsZXQgYXBwUHJvdmlkZXJzID1cbiAgICAgIGlzUHJlc2VudChjdXN0b21Qcm92aWRlcnMpID8gW0JST1dTRVJfQVBQX1BST1ZJREVSUywgY3VzdG9tUHJvdmlkZXJzXSA6IEJST1dTRVJfQVBQX1BST1ZJREVSUztcbiAgcmV0dXJuIHBsYXRmb3JtKEJST1dTRVJfUFJPVklERVJTKS5hcHBsaWNhdGlvbihhcHBQcm92aWRlcnMpLmJvb3RzdHJhcChhcHBDb21wb25lbnRUeXBlKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
