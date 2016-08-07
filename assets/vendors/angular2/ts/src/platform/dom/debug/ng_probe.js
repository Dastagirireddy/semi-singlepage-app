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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9kb20vZGVidWcvbmdfcHJvYmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQVFNLFdBQVcsRUFFWCxtQkFBbUIsRUFDbkIsdUJBQXVCLEVBMkJoQix1QkFBdUIsRUFLdkIsaUNBQWlDO0lBOUI5Qzs7OztPQUlHO0lBQ0gsOEJBQXFDLE9BQU87UUFDMUMsTUFBTSxDQUFDLHlCQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUZELHVEQUVDLENBQUE7SUFFRCx3Q0FBd0MsWUFBWTtRQUNsRCxFQUFFLENBQUMsQ0FBQyx3QkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4QixNQUFNLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUNELE1BQU0sQ0FBQyxZQUFZLENBQUM7SUFDdEIsQ0FBQztJQUVELDZCQUE2QixZQUFZO1FBQ3ZDLGlCQUFHLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDNUQsaUJBQUcsQ0FBQyxZQUFZLENBQUMsdUJBQXVCLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDdkQsTUFBTSxDQUFDLElBQUkscUNBQW9CLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQXpCSyxXQUFXLEdBQUcsaUJBQVUsQ0FBQyxFQUFDLGdCQUFnQixFQUFFLHFCQUFjLEVBQUUsUUFBUSxFQUFFLGFBQU0sRUFBQyxDQUFDLENBQUM7WUFFL0UsbUJBQW1CLEdBQUcsVUFBVSxDQUFDO1lBQ2pDLHVCQUF1QixHQUFHLGVBQWUsQ0FBQztZQXdCaEQ7O2VBRUc7WUFDVSxxQ0FBQSx1QkFBdUIsR0FBVSxpQkFBVSxDQUFDO2dCQUN2RCxJQUFJLGFBQVEsQ0FBQyxtQkFBWSxFQUNaLEVBQUMsVUFBVSxFQUFFLDhCQUE4QixFQUFFLElBQUksRUFBRSxDQUFDLDhCQUFlLENBQUMsRUFBQyxDQUFDO2FBQ3BGLENBQUMsQ0FBQSxDQUFDO1lBRVUsK0NBQUEsaUNBQWlDLEdBQVUsaUJBQVUsQ0FDOUQsQ0FBQyxJQUFJLGFBQVEsQ0FBQyxtQkFBWSxFQUFFLEVBQUMsVUFBVSxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxDQUFDLDhCQUFlLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL2RvbS9kZWJ1Zy9uZ19wcm9iZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q09OU1RfRVhQUiwgYXNzZXJ0aW9uc0VuYWJsZWQsIGlzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7SW5qZWN0YWJsZSwgcHJvdmlkZSwgUHJvdmlkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7RE9NfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9hZGFwdGVyJztcbmltcG9ydCB7RGVidWdOb2RlLCBnZXREZWJ1Z05vZGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RlYnVnL2RlYnVnX25vZGUnO1xuaW1wb3J0IHtEb21Sb290UmVuZGVyZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZG9tX3JlbmRlcmVyJztcbmltcG9ydCB7Um9vdFJlbmRlcmVyLCBOZ1pvbmUsIEFwcGxpY2F0aW9uUmVmfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7RGVidWdEb21Sb290UmVuZGVyZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RlYnVnL2RlYnVnX3JlbmRlcmVyJztcblxuY29uc3QgQ09SRV9UT0tFTlMgPSBDT05TVF9FWFBSKHsnQXBwbGljYXRpb25SZWYnOiBBcHBsaWNhdGlvblJlZiwgJ05nWm9uZSc6IE5nWm9uZX0pO1xuXG5jb25zdCBJTlNQRUNUX0dMT0JBTF9OQU1FID0gJ25nLnByb2JlJztcbmNvbnN0IENPUkVfVE9LRU5TX0dMT0JBTF9OQU1FID0gJ25nLmNvcmVUb2tlbnMnO1xuXG4vKipcbiAqIFJldHVybnMgYSB7QGxpbmsgRGVidWdFbGVtZW50fSBmb3IgdGhlIGdpdmVuIG5hdGl2ZSBET00gZWxlbWVudCwgb3JcbiAqIG51bGwgaWYgdGhlIGdpdmVuIG5hdGl2ZSBlbGVtZW50IGRvZXMgbm90IGhhdmUgYW4gQW5ndWxhciB2aWV3IGFzc29jaWF0ZWRcbiAqIHdpdGggaXQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnNwZWN0TmF0aXZlRWxlbWVudChlbGVtZW50KTogRGVidWdOb2RlIHtcbiAgcmV0dXJuIGdldERlYnVnTm9kZShlbGVtZW50KTtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNvbmRpdGlvbmFsUm9vdFJlbmRlcmVyKHJvb3RSZW5kZXJlcikge1xuICBpZiAoYXNzZXJ0aW9uc0VuYWJsZWQoKSkge1xuICAgIHJldHVybiBfY3JlYXRlUm9vdFJlbmRlcmVyKHJvb3RSZW5kZXJlcik7XG4gIH1cbiAgcmV0dXJuIHJvb3RSZW5kZXJlcjtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZVJvb3RSZW5kZXJlcihyb290UmVuZGVyZXIpIHtcbiAgRE9NLnNldEdsb2JhbFZhcihJTlNQRUNUX0dMT0JBTF9OQU1FLCBpbnNwZWN0TmF0aXZlRWxlbWVudCk7XG4gIERPTS5zZXRHbG9iYWxWYXIoQ09SRV9UT0tFTlNfR0xPQkFMX05BTUUsIENPUkVfVE9LRU5TKTtcbiAgcmV0dXJuIG5ldyBEZWJ1Z0RvbVJvb3RSZW5kZXJlcihyb290UmVuZGVyZXIpO1xufVxuXG4vKipcbiAqIFByb3ZpZGVycyB3aGljaCBzdXBwb3J0IGRlYnVnZ2luZyBBbmd1bGFyIGFwcGxpY2F0aW9ucyAoZS5nLiB2aWEgYG5nLnByb2JlYCkuXG4gKi9cbmV4cG9ydCBjb25zdCBFTEVNRU5UX1BST0JFX1BST1ZJREVSUzogYW55W10gPSBDT05TVF9FWFBSKFtcbiAgbmV3IFByb3ZpZGVyKFJvb3RSZW5kZXJlcixcbiAgICAgICAgICAgICAgIHt1c2VGYWN0b3J5OiBfY3JlYXRlQ29uZGl0aW9uYWxSb290UmVuZGVyZXIsIGRlcHM6IFtEb21Sb290UmVuZGVyZXJdfSlcbl0pO1xuXG5leHBvcnQgY29uc3QgRUxFTUVOVF9QUk9CRV9QUk9WSURFUlNfUFJPRF9NT0RFOiBhbnlbXSA9IENPTlNUX0VYUFIoXG4gICAgW25ldyBQcm92aWRlcihSb290UmVuZGVyZXIsIHt1c2VGYWN0b3J5OiBfY3JlYXRlUm9vdFJlbmRlcmVyLCBkZXBzOiBbRG9tUm9vdFJlbmRlcmVyXX0pXSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
