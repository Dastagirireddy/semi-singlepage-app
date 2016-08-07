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
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * Default patform providers for testing.
             */
            exports_1("TEST_BROWSER_PLATFORM_PROVIDERS", TEST_BROWSER_PLATFORM_PROVIDERS = lang_1.CONST_EXPR([browser_static_1.TEST_BROWSER_STATIC_PLATFORM_PROVIDERS]));
            /**
             * Default application providers for testing.
             */
            exports_1("TEST_BROWSER_APPLICATION_PROVIDERS", TEST_BROWSER_APPLICATION_PROVIDERS = lang_1.CONST_EXPR([browser_1.BROWSER_APP_PROVIDERS, browser_static_1.ADDITIONAL_TEST_BROWSER_PROVIDERS]));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvcGxhdGZvcm0vdGVzdGluZy9icm93c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFhYSwrQkFBK0IsRUFNL0Isa0NBQWtDOzs7Ozs7Ozs7Ozs7O1lBVC9DOztlQUVHO1lBQ1UsNkNBQUEsK0JBQStCLEdBQ3hDLGlCQUFVLENBQUMsQ0FBQyx1REFBc0MsQ0FBQyxDQUFDLENBQUEsQ0FBQztZQUV6RDs7ZUFFRztZQUNVLGdEQUFBLGtDQUFrQyxHQUMzQyxpQkFBVSxDQUFDLENBQUMsK0JBQXFCLEVBQUUsa0RBQWlDLENBQUMsQ0FBQyxDQUFBLENBQUMiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9wbGF0Zm9ybS90ZXN0aW5nL2Jyb3dzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBURVNUX0JST1dTRVJfU1RBVElDX1BMQVRGT1JNX1BST1ZJREVSUyxcbiAgQURESVRJT05BTF9URVNUX0JST1dTRVJfUFJPVklERVJTXG59IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL3Rlc3RpbmcvYnJvd3Nlcl9zdGF0aWMnO1xuXG5pbXBvcnQge0JST1dTRVJfQVBQX1BST1ZJREVSU30gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vYnJvd3Nlcic7XG5cblxuaW1wb3J0IHtDT05TVF9FWFBSfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG4vKipcbiAqIERlZmF1bHQgcGF0Zm9ybSBwcm92aWRlcnMgZm9yIHRlc3RpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBURVNUX0JST1dTRVJfUExBVEZPUk1fUFJPVklERVJTOiBBcnJheTxhbnkgLypUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXSovPiA9XG4gICAgQ09OU1RfRVhQUihbVEVTVF9CUk9XU0VSX1NUQVRJQ19QTEFURk9STV9QUk9WSURFUlNdKTtcblxuLyoqXG4gKiBEZWZhdWx0IGFwcGxpY2F0aW9uIHByb3ZpZGVycyBmb3IgdGVzdGluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IFRFU1RfQlJPV1NFUl9BUFBMSUNBVElPTl9QUk9WSURFUlM6IEFycmF5PGFueSAvKlR5cGUgfCBQcm92aWRlciB8IGFueVtdKi8+ID1cbiAgICBDT05TVF9FWFBSKFtCUk9XU0VSX0FQUF9QUk9WSURFUlMsIEFERElUSU9OQUxfVEVTVF9CUk9XU0VSX1BST1ZJREVSU10pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
