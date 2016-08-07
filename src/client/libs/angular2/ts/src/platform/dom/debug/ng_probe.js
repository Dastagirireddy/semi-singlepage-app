System.register(['angular2/src/facade/lang', 'angular2/src/core/di', 'angular2/src/platform/dom/dom_adapter', 'angular2/src/core/debug/debug_node', 'angular2/src/platform/dom/dom_renderer', 'angular2/core', 'angular2/src/core/debug/debug_renderer'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, di_1, dom_adapter_1, debug_node_1, dom_renderer_1, core_1, debug_renderer_1;
    var CORE_TOKENS, INSPECT_GLOBAL_NAME, CORE_TOKENS_GLOBAL_NAME, ELEMENT_PROBE_PROVIDERS, ELEMENT_PROBE_PROVIDERS_PROD_MODE;
    /**
     * Returns a {@link DebugElement} for the given native DOM element, or
     * null if the given native element does not have an Angular view associated
     * with it.
     */
    function inspectNativeElement(element) {
        return debug_node_1.getDebugNode(element);
    }
    exports_1("inspectNativeElement", inspectNativeElement);
    function _createConditionalRootRenderer(rootRenderer) {
        if (lang_1.assertionsEnabled()) {
            return _createRootRenderer(rootRenderer);
        }
        return rootRenderer;
    }
    function _createRootRenderer(rootRenderer) {
        dom_adapter_1.DOM.setGlobalVar(INSPECT_GLOBAL_NAME, inspectNativeElement);
        dom_adapter_1.DOM.setGlobalVar(CORE_TOKENS_GLOBAL_NAME, CORE_TOKENS);
        return new debug_renderer_1.DebugDomRootRenderer(rootRenderer);
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            },
            function (debug_node_1_1) {
                debug_node_1 = debug_node_1_1;
            },
            function (dom_renderer_1_1) {
                dom_renderer_1 = dom_renderer_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (debug_renderer_1_1) {
                debug_renderer_1 = debug_renderer_1_1;
            }],
        execute: function() {
            CORE_TOKENS = lang_1.CONST_EXPR({ 'ApplicationRef': core_1.ApplicationRef, 'NgZone': core_1.NgZone });
            INSPECT_GLOBAL_NAME = 'ng.probe';
            CORE_TOKENS_GLOBAL_NAME = 'ng.coreTokens';
            /**
             * Providers which support debugging Angular applications (e.g. via `ng.probe`).
             */
            exports_1("ELEMENT_PROBE_PROVIDERS", ELEMENT_PROBE_PROVIDERS = lang_1.CONST_EXPR([
                new di_1.Provider(core_1.RootRenderer, { useFactory: _createConditionalRootRenderer, deps: [dom_renderer_1.DomRootRenderer] })
            ]));
            exports_1("ELEMENT_PROBE_PROVIDERS_PROD_MODE", ELEMENT_PROBE_PROVIDERS_PROD_MODE = lang_1.CONST_EXPR([new di_1.Provider(core_1.RootRenderer, { useFactory: _createRootRenderer, deps: [dom_renderer_1.DomRootRenderer] })]));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL2RvbS9kZWJ1Zy9uZ19wcm9iZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBUU0sV0FBVyxFQUVYLG1CQUFtQixFQUNuQix1QkFBdUIsRUEyQmhCLHVCQUF1QixFQUt2QixpQ0FBaUM7SUE5QjlDOzs7O09BSUc7SUFDSCw4QkFBcUMsT0FBTztRQUMxQyxNQUFNLENBQUMseUJBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRkQsdURBRUMsQ0FBQTtJQUVELHdDQUF3QyxZQUFZO1FBQ2xELEVBQUUsQ0FBQyxDQUFDLHdCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLFlBQVksQ0FBQztJQUN0QixDQUFDO0lBRUQsNkJBQTZCLFlBQVk7UUFDdkMsaUJBQUcsQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUM1RCxpQkFBRyxDQUFDLFlBQVksQ0FBQyx1QkFBdUIsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUN2RCxNQUFNLENBQUMsSUFBSSxxQ0FBb0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNoRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBekJLLFdBQVcsR0FBRyxpQkFBVSxDQUFDLEVBQUMsZ0JBQWdCLEVBQUUscUJBQWMsRUFBRSxRQUFRLEVBQUUsYUFBTSxFQUFDLENBQUMsQ0FBQztZQUUvRSxtQkFBbUIsR0FBRyxVQUFVLENBQUM7WUFDakMsdUJBQXVCLEdBQUcsZUFBZSxDQUFDO1lBd0JoRDs7ZUFFRztZQUNVLHFDQUFBLHVCQUF1QixHQUFVLGlCQUFVLENBQUM7Z0JBQ3ZELElBQUksYUFBUSxDQUFDLG1CQUFZLEVBQ1osRUFBQyxVQUFVLEVBQUUsOEJBQThCLEVBQUUsSUFBSSxFQUFFLENBQUMsOEJBQWUsQ0FBQyxFQUFDLENBQUM7YUFDcEYsQ0FBQyxDQUFBLENBQUM7WUFFVSwrQ0FBQSxpQ0FBaUMsR0FBVSxpQkFBVSxDQUM5RCxDQUFDLElBQUksYUFBUSxDQUFDLG1CQUFZLEVBQUUsRUFBQyxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLENBQUMsOEJBQWUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9kb20vZGVidWcvbmdfcHJvYmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NPTlNUX0VYUFIsIGFzc2VydGlvbnNFbmFibGVkLCBpc1ByZXNlbnR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0luamVjdGFibGUsIHByb3ZpZGUsIFByb3ZpZGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge0RPTX0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fYWRhcHRlcic7XG5pbXBvcnQge0RlYnVnTm9kZSwgZ2V0RGVidWdOb2RlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kZWJ1Zy9kZWJ1Z19ub2RlJztcbmltcG9ydCB7RG9tUm9vdFJlbmRlcmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9yZW5kZXJlcic7XG5pbXBvcnQge1Jvb3RSZW5kZXJlciwgTmdab25lLCBBcHBsaWNhdGlvblJlZn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0RlYnVnRG9tUm9vdFJlbmRlcmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kZWJ1Zy9kZWJ1Z19yZW5kZXJlcic7XG5cbmNvbnN0IENPUkVfVE9LRU5TID0gQ09OU1RfRVhQUih7J0FwcGxpY2F0aW9uUmVmJzogQXBwbGljYXRpb25SZWYsICdOZ1pvbmUnOiBOZ1pvbmV9KTtcblxuY29uc3QgSU5TUEVDVF9HTE9CQUxfTkFNRSA9ICduZy5wcm9iZSc7XG5jb25zdCBDT1JFX1RPS0VOU19HTE9CQUxfTkFNRSA9ICduZy5jb3JlVG9rZW5zJztcblxuLyoqXG4gKiBSZXR1cm5zIGEge0BsaW5rIERlYnVnRWxlbWVudH0gZm9yIHRoZSBnaXZlbiBuYXRpdmUgRE9NIGVsZW1lbnQsIG9yXG4gKiBudWxsIGlmIHRoZSBnaXZlbiBuYXRpdmUgZWxlbWVudCBkb2VzIG5vdCBoYXZlIGFuIEFuZ3VsYXIgdmlldyBhc3NvY2lhdGVkXG4gKiB3aXRoIGl0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5zcGVjdE5hdGl2ZUVsZW1lbnQoZWxlbWVudCk6IERlYnVnTm9kZSB7XG4gIHJldHVybiBnZXREZWJ1Z05vZGUoZWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDb25kaXRpb25hbFJvb3RSZW5kZXJlcihyb290UmVuZGVyZXIpIHtcbiAgaWYgKGFzc2VydGlvbnNFbmFibGVkKCkpIHtcbiAgICByZXR1cm4gX2NyZWF0ZVJvb3RSZW5kZXJlcihyb290UmVuZGVyZXIpO1xuICB9XG4gIHJldHVybiByb290UmVuZGVyZXI7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVSb290UmVuZGVyZXIocm9vdFJlbmRlcmVyKSB7XG4gIERPTS5zZXRHbG9iYWxWYXIoSU5TUEVDVF9HTE9CQUxfTkFNRSwgaW5zcGVjdE5hdGl2ZUVsZW1lbnQpO1xuICBET00uc2V0R2xvYmFsVmFyKENPUkVfVE9LRU5TX0dMT0JBTF9OQU1FLCBDT1JFX1RPS0VOUyk7XG4gIHJldHVybiBuZXcgRGVidWdEb21Sb290UmVuZGVyZXIocm9vdFJlbmRlcmVyKTtcbn1cblxuLyoqXG4gKiBQcm92aWRlcnMgd2hpY2ggc3VwcG9ydCBkZWJ1Z2dpbmcgQW5ndWxhciBhcHBsaWNhdGlvbnMgKGUuZy4gdmlhIGBuZy5wcm9iZWApLlxuICovXG5leHBvcnQgY29uc3QgRUxFTUVOVF9QUk9CRV9QUk9WSURFUlM6IGFueVtdID0gQ09OU1RfRVhQUihbXG4gIG5ldyBQcm92aWRlcihSb290UmVuZGVyZXIsXG4gICAgICAgICAgICAgICB7dXNlRmFjdG9yeTogX2NyZWF0ZUNvbmRpdGlvbmFsUm9vdFJlbmRlcmVyLCBkZXBzOiBbRG9tUm9vdFJlbmRlcmVyXX0pXG5dKTtcblxuZXhwb3J0IGNvbnN0IEVMRU1FTlRfUFJPQkVfUFJPVklERVJTX1BST0RfTU9ERTogYW55W10gPSBDT05TVF9FWFBSKFxuICAgIFtuZXcgUHJvdmlkZXIoUm9vdFJlbmRlcmVyLCB7dXNlRmFjdG9yeTogX2NyZWF0ZVJvb3RSZW5kZXJlciwgZGVwczogW0RvbVJvb3RSZW5kZXJlcl19KV0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
