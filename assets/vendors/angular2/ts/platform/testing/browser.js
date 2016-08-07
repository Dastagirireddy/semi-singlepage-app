System.register(['angular2/platform/testing/browser_static', 'angular2/platform/browser', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_static_1, browser_1, lang_1;
    var TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS;
    return {
        setters:[
            function (browser_static_1_1) {
                browser_static_1 = browser_static_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
                exports_1({
                    "CACHED_TEMPLATE_PROVIDER": browser_1_1["CACHED_TEMPLATE_PROVIDER"]
                });
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * Default platform providers for testing.
             */
            exports_1("TEST_BROWSER_PLATFORM_PROVIDERS", TEST_BROWSER_PLATFORM_PROVIDERS = lang_1.CONST_EXPR([browser_static_1.TEST_BROWSER_STATIC_PLATFORM_PROVIDERS]));
            /**
             * Default application providers for testing.
             */
            exports_1("TEST_BROWSER_APPLICATION_PROVIDERS", TEST_BROWSER_APPLICATION_PROVIDERS = lang_1.CONST_EXPR([browser_1.BROWSER_APP_PROVIDERS, browser_static_1.ADDITIONAL_TEST_BROWSER_PROVIDERS]));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3BsYXRmb3JtL3Rlc3RpbmcvYnJvd3Nlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBZ0JhLCtCQUErQixFQU0vQixrQ0FBa0M7Ozs7Ozs7Ozs7Ozs7Ozs7WUFUL0M7O2VBRUc7WUFDVSw2Q0FBQSwrQkFBK0IsR0FDeEMsaUJBQVUsQ0FBQyxDQUFDLHVEQUFzQyxDQUFDLENBQUMsQ0FBQSxDQUFDO1lBRXpEOztlQUVHO1lBQ1UsZ0RBQUEsa0NBQWtDLEdBQzNDLGlCQUFVLENBQUMsQ0FBQywrQkFBcUIsRUFBRSxrREFBaUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9wbGF0Zm9ybS90ZXN0aW5nL2Jyb3dzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBURVNUX0JST1dTRVJfU1RBVElDX1BMQVRGT1JNX1BST1ZJREVSUyxcbiAgQURESVRJT05BTF9URVNUX0JST1dTRVJfUFJPVklERVJTXG59IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL3Rlc3RpbmcvYnJvd3Nlcl9zdGF0aWMnO1xuaW1wb3J0IHtCUk9XU0VSX0FQUF9QUk9WSURFUlN9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXInO1xuaW1wb3J0IHtDT05TVF9FWFBSfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG4vKipcbiAqIFByb3ZpZGVycyBmb3IgdXNpbmcgdGVtcGxhdGUgY2FjaGUgdG8gYXZvaWQgYWN0dWFsIFhIUi5cbiAqIFJlLWV4cG9ydGVkIGhlcmUgc28gdGhhdCB0ZXN0cyBpbXBvcnQgZnJvbSBhIHNpbmdsZSBwbGFjZS5cbiAqL1xuZXhwb3J0IHtDQUNIRURfVEVNUExBVEVfUFJPVklERVJ9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXInO1xuXG4vKipcbiAqIERlZmF1bHQgcGxhdGZvcm0gcHJvdmlkZXJzIGZvciB0ZXN0aW5nLlxuICovXG5leHBvcnQgY29uc3QgVEVTVF9CUk9XU0VSX1BMQVRGT1JNX1BST1ZJREVSUzogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPVxuICAgIENPTlNUX0VYUFIoW1RFU1RfQlJPV1NFUl9TVEFUSUNfUExBVEZPUk1fUFJPVklERVJTXSk7XG5cbi8qKlxuICogRGVmYXVsdCBhcHBsaWNhdGlvbiBwcm92aWRlcnMgZm9yIHRlc3RpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBURVNUX0JST1dTRVJfQVBQTElDQVRJT05fUFJPVklERVJTOiBBcnJheTxhbnkgLypUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXSovPiA9XG4gICAgQ09OU1RfRVhQUihbQlJPV1NFUl9BUFBfUFJPVklERVJTLCBBRERJVElPTkFMX1RFU1RfQlJPV1NFUl9QUk9WSURFUlNdKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
