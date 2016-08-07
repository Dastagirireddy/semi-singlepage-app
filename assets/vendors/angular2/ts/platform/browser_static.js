System.register(['angular2/src/platform/browser_common', 'angular2/src/facade/lang', 'angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, browser_common_1, core_1;
    var BROWSER_APP_PROVIDERS;
    function browserStaticPlatform() {
        if (lang_1.isBlank(core_1.getPlatform())) {
            core_1.createPlatform(core_1.ReflectiveInjector.resolveAndCreate(browser_common_1.BROWSER_PROVIDERS));
        }
        return core_1.assertPlatform(browser_common_1.BROWSER_PLATFORM_MARKER);
    }
    exports_1("browserStaticPlatform", browserStaticPlatform);
    /**
     * See {@link bootstrap} for more information.
     */
    function bootstrapStatic(appComponentType, customProviders, initReflector) {
        if (lang_1.isPresent(initReflector)) {
            initReflector();
        }
        var appProviders = lang_1.isPresent(customProviders) ? [BROWSER_APP_PROVIDERS, customProviders] : BROWSER_APP_PROVIDERS;
        var appInjector = core_1.ReflectiveInjector.resolveAndCreate(appProviders, browserStaticPlatform().injector);
        return core_1.coreLoadAndBootstrap(appInjector, appComponentType);
    }
    exports_1("bootstrapStatic", bootstrapStatic);
    return {
        setters:[
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3BsYXRmb3JtL2Jyb3dzZXJfc3RhdGljLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFrQ2EscUJBQXFCO0lBR2xDO1FBQ0UsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLGtCQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixxQkFBYyxDQUFDLHlCQUFrQixDQUFDLGdCQUFnQixDQUFDLGtDQUFpQixDQUFDLENBQUMsQ0FBQztRQUN6RSxDQUFDO1FBQ0QsTUFBTSxDQUFDLHFCQUFjLENBQUMsd0NBQXVCLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBTEQseURBS0MsQ0FBQTtJQUVEOztPQUVHO0lBQ0gseUJBQWdDLGdCQUFzQixFQUN0QixlQUF3RCxFQUN4RCxhQUF3QjtRQUN0RCxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixhQUFhLEVBQUUsQ0FBQztRQUNsQixDQUFDO1FBRUQsSUFBSSxZQUFZLEdBQ1osZ0JBQVMsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLGVBQWUsQ0FBQyxHQUFHLHFCQUFxQixDQUFDO1FBQ2xHLElBQUksV0FBVyxHQUNYLHlCQUFrQixDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxxQkFBcUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hGLE1BQU0sQ0FBQywyQkFBb0IsQ0FBQyxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBWkQsNkNBWUMsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBOUJEOzs7O2VBSUc7WUFDVSxtQ0FBQSxxQkFBcUIsR0FDOUIsNkNBQTRCLENBQUEsQ0FBQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9wbGF0Zm9ybS9icm93c2VyX3N0YXRpYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCAqIGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2FuZ3VsYXJfZW50cnlwb2ludCc7XG5leHBvcnQge1xuICBCUk9XU0VSX1BST1ZJREVSUyxcbiAgRUxFTUVOVF9QUk9CRV9QUk9WSURFUlMsXG4gIEVMRU1FTlRfUFJPQkVfUFJPVklERVJTX1BST0RfTU9ERSxcbiAgaW5zcGVjdE5hdGl2ZUVsZW1lbnQsXG4gIEJyb3dzZXJEb21BZGFwdGVyLFxuICBCeSxcbiAgVGl0bGUsXG4gIGVuYWJsZURlYnVnVG9vbHMsXG4gIGRpc2FibGVEZWJ1Z1Rvb2xzXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9icm93c2VyX2NvbW1vbic7XG5cbmltcG9ydCB7VHlwZSwgaXNQcmVzZW50LCBpc0JsYW5rfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtcbiAgQlJPV1NFUl9QUk9WSURFUlMsXG4gIEJST1dTRVJfQVBQX0NPTU1PTl9QUk9WSURFUlMsXG4gIEJST1dTRVJfUExBVEZPUk1fTUFSS0VSXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9icm93c2VyX2NvbW1vbic7XG5pbXBvcnQge1xuICBDb21wb25lbnRSZWYsXG4gIGNvcmVMb2FkQW5kQm9vdHN0cmFwLFxuICBSZWZsZWN0aXZlSW5qZWN0b3IsXG4gIFBsYXRmb3JtUmVmLFxuICBnZXRQbGF0Zm9ybSxcbiAgY3JlYXRlUGxhdGZvcm0sXG4gIGFzc2VydFBsYXRmb3JtXG59IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuXG4vKipcbiAqIEFuIGFycmF5IG9mIHByb3ZpZGVycyB0aGF0IHNob3VsZCBiZSBwYXNzZWQgaW50byBgYXBwbGljYXRpb24oKWAgd2hlbiBib290c3RyYXBwaW5nIGEgY29tcG9uZW50XG4gKiB3aGVuIGFsbCB0ZW1wbGF0ZXNcbiAqIGhhdmUgYmVlbiBwcmVjb21waWxlZCBvZmZsaW5lLlxuICovXG5leHBvcnQgY29uc3QgQlJPV1NFUl9BUFBfUFJPVklERVJTOiBBcnJheTxhbnkgLypUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXSovPiA9XG4gICAgQlJPV1NFUl9BUFBfQ09NTU9OX1BST1ZJREVSUztcblxuZXhwb3J0IGZ1bmN0aW9uIGJyb3dzZXJTdGF0aWNQbGF0Zm9ybSgpOiBQbGF0Zm9ybVJlZiB7XG4gIGlmIChpc0JsYW5rKGdldFBsYXRmb3JtKCkpKSB7XG4gICAgY3JlYXRlUGxhdGZvcm0oUmVmbGVjdGl2ZUluamVjdG9yLnJlc29sdmVBbmRDcmVhdGUoQlJPV1NFUl9QUk9WSURFUlMpKTtcbiAgfVxuICByZXR1cm4gYXNzZXJ0UGxhdGZvcm0oQlJPV1NFUl9QTEFURk9STV9NQVJLRVIpO1xufVxuXG4vKipcbiAqIFNlZSB7QGxpbmsgYm9vdHN0cmFwfSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJvb3RzdHJhcFN0YXRpYyhhcHBDb21wb25lbnRUeXBlOiBUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21Qcm92aWRlcnM/OiBBcnJheTxhbnkgLypUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXSovPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdFJlZmxlY3Rvcj86IEZ1bmN0aW9uKTogUHJvbWlzZTxDb21wb25lbnRSZWY+IHtcbiAgaWYgKGlzUHJlc2VudChpbml0UmVmbGVjdG9yKSkge1xuICAgIGluaXRSZWZsZWN0b3IoKTtcbiAgfVxuXG4gIGxldCBhcHBQcm92aWRlcnMgPVxuICAgICAgaXNQcmVzZW50KGN1c3RvbVByb3ZpZGVycykgPyBbQlJPV1NFUl9BUFBfUFJPVklERVJTLCBjdXN0b21Qcm92aWRlcnNdIDogQlJPV1NFUl9BUFBfUFJPVklERVJTO1xuICB2YXIgYXBwSW5qZWN0b3IgPVxuICAgICAgUmVmbGVjdGl2ZUluamVjdG9yLnJlc29sdmVBbmRDcmVhdGUoYXBwUHJvdmlkZXJzLCBicm93c2VyU3RhdGljUGxhdGZvcm0oKS5pbmplY3Rvcik7XG4gIHJldHVybiBjb3JlTG9hZEFuZEJvb3RzdHJhcChhcHBJbmplY3RvciwgYXBwQ29tcG9uZW50VHlwZSk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
