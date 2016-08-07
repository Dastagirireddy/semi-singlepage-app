System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var RenderComponentType, RenderDebugInfo, Renderer, RootRenderer;
    return {
        setters:[],
        execute: function() {
            RenderComponentType = (function () {
                function RenderComponentType(id, encapsulation, styles) {
                    this.id = id;
                    this.encapsulation = encapsulation;
                    this.styles = styles;
                }
                return RenderComponentType;
            }());
            exports_1("RenderComponentType", RenderComponentType);
            RenderDebugInfo = (function () {
                function RenderDebugInfo(injector, component, providerTokens, locals) {
                    this.injector = injector;
                    this.component = component;
                    this.providerTokens = providerTokens;
                    this.locals = locals;
                }
                return RenderDebugInfo;
            }());
            exports_1("RenderDebugInfo", RenderDebugInfo);
            Renderer = (function () {
                function Renderer() {
                }
                return Renderer;
            }());
            exports_1("Renderer", Renderer);
            /**
             * Injectable service that provides a low-level interface for modifying the UI.
             *
             * Use this service to bypass Angular's templating and make custom UI changes that can't be
             * expressed declaratively. For example if you need to set a property or an attribute whose name is
             * not statically known, use {@link #setElementProperty} or {@link #setElementAttribute}
             * respectively.
             *
             * If you are implementing a custom renderer, you must implement this interface.
             *
             * The default Renderer implementation is `DomRenderer`. Also available is `WebWorkerRenderer`.
             */
            RootRenderer = (function () {
                function RootRenderer() {
                }
                return RootRenderer;
            }());
            exports_1("RootRenderer", RootRenderer);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvcmVuZGVyL2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O1lBR0E7Z0JBQ0UsNkJBQW1CLEVBQVUsRUFBUyxhQUFnQyxFQUNuRCxNQUE2QjtvQkFEN0IsT0FBRSxHQUFGLEVBQUUsQ0FBUTtvQkFBUyxrQkFBYSxHQUFiLGFBQWEsQ0FBbUI7b0JBQ25ELFdBQU0sR0FBTixNQUFNLENBQXVCO2dCQUFHLENBQUM7Z0JBQ3RELDBCQUFDO1lBQUQsQ0FIQSxBQUdDLElBQUE7WUFIRCxxREFHQyxDQUFBO1lBRUQ7Z0JBQ0UseUJBQW1CLFFBQWtCLEVBQVMsU0FBYyxFQUFTLGNBQXFCLEVBQ3ZFLE1BQXdCO29CQUR4QixhQUFRLEdBQVIsUUFBUSxDQUFVO29CQUFTLGNBQVMsR0FBVCxTQUFTLENBQUs7b0JBQVMsbUJBQWMsR0FBZCxjQUFjLENBQU87b0JBQ3ZFLFdBQU0sR0FBTixNQUFNLENBQWtCO2dCQUFHLENBQUM7Z0JBQ2pELHNCQUFDO1lBQUQsQ0FIQSxBQUdDLElBQUE7WUFIRCw2Q0FHQyxDQUFBO1lBSUQ7Z0JBQUE7Z0JBNENBLENBQUM7Z0JBQUQsZUFBQztZQUFELENBNUNBLEFBNENDLElBQUE7WUE1Q0QsK0JBNENDLENBQUE7WUFFRDs7Ozs7Ozs7Ozs7ZUFXRztZQUVIO2dCQUFBO2dCQUVBLENBQUM7Z0JBQUQsbUJBQUM7WUFBRCxDQUZBLEFBRUMsSUFBQTtZQUZELHVDQUVDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29yZS9yZW5kZXIvYXBpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbWV0YWRhdGEvdmlldyc7XG5pbXBvcnQge0luamVjdG9yLCBJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5cbmV4cG9ydCBjbGFzcyBSZW5kZXJDb21wb25lbnRUeXBlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGlkOiBzdHJpbmcsIHB1YmxpYyBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICAgICAgICAgICAgcHVibGljIHN0eWxlczogQXJyYXk8c3RyaW5nIHwgYW55W10+KSB7fVxufVxuXG5leHBvcnQgY2xhc3MgUmVuZGVyRGVidWdJbmZvIHtcbiAgY29uc3RydWN0b3IocHVibGljIGluamVjdG9yOiBJbmplY3RvciwgcHVibGljIGNvbXBvbmVudDogYW55LCBwdWJsaWMgcHJvdmlkZXJUb2tlbnM6IGFueVtdLFxuICAgICAgICAgICAgICBwdWJsaWMgbG9jYWxzOiBNYXA8c3RyaW5nLCBhbnk+KSB7fVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBhcmVudFJlbmRlcmVyIHsgcmVuZGVyQ29tcG9uZW50KGNvbXBvbmVudFR5cGU6IFJlbmRlckNvbXBvbmVudFR5cGUpOiBSZW5kZXJlcjsgfVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVuZGVyZXIgaW1wbGVtZW50cyBQYXJlbnRSZW5kZXJlciB7XG4gIGFic3RyYWN0IHJlbmRlckNvbXBvbmVudChjb21wb25lbnRUeXBlOiBSZW5kZXJDb21wb25lbnRUeXBlKTogUmVuZGVyZXI7XG5cbiAgYWJzdHJhY3Qgc2VsZWN0Um9vdEVsZW1lbnQoc2VsZWN0b3I6IHN0cmluZyk6IGFueTtcblxuICBhYnN0cmFjdCBjcmVhdGVFbGVtZW50KHBhcmVudEVsZW1lbnQ6IGFueSwgbmFtZTogc3RyaW5nKTogYW55O1xuXG4gIGFic3RyYWN0IGNyZWF0ZVZpZXdSb290KGhvc3RFbGVtZW50OiBhbnkpOiBhbnk7XG5cbiAgYWJzdHJhY3QgY3JlYXRlVGVtcGxhdGVBbmNob3IocGFyZW50RWxlbWVudDogYW55KTogYW55O1xuXG4gIGFic3RyYWN0IGNyZWF0ZVRleHQocGFyZW50RWxlbWVudDogYW55LCB2YWx1ZTogc3RyaW5nKTogYW55O1xuXG4gIGFic3RyYWN0IHByb2plY3ROb2RlcyhwYXJlbnRFbGVtZW50OiBhbnksIG5vZGVzOiBhbnlbXSk7XG5cbiAgYWJzdHJhY3QgYXR0YWNoVmlld0FmdGVyKG5vZGU6IGFueSwgdmlld1Jvb3ROb2RlczogYW55W10pO1xuXG4gIGFic3RyYWN0IGRldGFjaFZpZXcodmlld1Jvb3ROb2RlczogYW55W10pO1xuXG4gIGFic3RyYWN0IGRlc3Ryb3lWaWV3KGhvc3RFbGVtZW50OiBhbnksIHZpZXdBbGxOb2RlczogYW55W10pO1xuXG4gIGFic3RyYWN0IGxpc3RlbihyZW5kZXJFbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogRnVuY3Rpb247XG5cbiAgYWJzdHJhY3QgbGlzdGVuR2xvYmFsKHRhcmdldDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IEZ1bmN0aW9uO1xuXG4gIGFic3RyYWN0IHNldEVsZW1lbnRQcm9wZXJ0eShyZW5kZXJFbGVtZW50OiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nLCBwcm9wZXJ0eVZhbHVlOiBhbnkpO1xuXG4gIGFic3RyYWN0IHNldEVsZW1lbnRBdHRyaWJ1dGUocmVuZGVyRWxlbWVudDogYW55LCBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcsIGF0dHJpYnV0ZVZhbHVlOiBzdHJpbmcpO1xuXG4gIC8qKlxuICAgKiBVc2VkIG9ubHkgaW4gZGVidWcgbW9kZSB0byBzZXJpYWxpemUgcHJvcGVydHkgY2hhbmdlcyB0byBjb21tZW50IG5vZGVzLFxuICAgKiBzdWNoIGFzIDx0ZW1wbGF0ZT4gcGxhY2Vob2xkZXJzLlxuICAgKi9cbiAgYWJzdHJhY3Qgc2V0QmluZGluZ0RlYnVnSW5mbyhyZW5kZXJFbGVtZW50OiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nLCBwcm9wZXJ0eVZhbHVlOiBzdHJpbmcpO1xuXG4gIGFic3RyYWN0IHNldEVsZW1lbnREZWJ1Z0luZm8ocmVuZGVyRWxlbWVudDogYW55LCBpbmZvOiBSZW5kZXJEZWJ1Z0luZm8pO1xuXG4gIGFic3RyYWN0IHNldEVsZW1lbnRDbGFzcyhyZW5kZXJFbGVtZW50OiBhbnksIGNsYXNzTmFtZTogc3RyaW5nLCBpc0FkZDogYm9vbGVhbik7XG5cbiAgYWJzdHJhY3Qgc2V0RWxlbWVudFN0eWxlKHJlbmRlckVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcsIHN0eWxlVmFsdWU6IHN0cmluZyk7XG5cbiAgYWJzdHJhY3QgaW52b2tlRWxlbWVudE1ldGhvZChyZW5kZXJFbGVtZW50OiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgYXJnczogYW55W10pO1xuXG4gIGFic3RyYWN0IHNldFRleHQocmVuZGVyTm9kZTogYW55LCB0ZXh0OiBzdHJpbmcpO1xufVxuXG4vKipcbiAqIEluamVjdGFibGUgc2VydmljZSB0aGF0IHByb3ZpZGVzIGEgbG93LWxldmVsIGludGVyZmFjZSBmb3IgbW9kaWZ5aW5nIHRoZSBVSS5cbiAqXG4gKiBVc2UgdGhpcyBzZXJ2aWNlIHRvIGJ5cGFzcyBBbmd1bGFyJ3MgdGVtcGxhdGluZyBhbmQgbWFrZSBjdXN0b20gVUkgY2hhbmdlcyB0aGF0IGNhbid0IGJlXG4gKiBleHByZXNzZWQgZGVjbGFyYXRpdmVseS4gRm9yIGV4YW1wbGUgaWYgeW91IG5lZWQgdG8gc2V0IGEgcHJvcGVydHkgb3IgYW4gYXR0cmlidXRlIHdob3NlIG5hbWUgaXNcbiAqIG5vdCBzdGF0aWNhbGx5IGtub3duLCB1c2Uge0BsaW5rICNzZXRFbGVtZW50UHJvcGVydHl9IG9yIHtAbGluayAjc2V0RWxlbWVudEF0dHJpYnV0ZX1cbiAqIHJlc3BlY3RpdmVseS5cbiAqXG4gKiBJZiB5b3UgYXJlIGltcGxlbWVudGluZyBhIGN1c3RvbSByZW5kZXJlciwgeW91IG11c3QgaW1wbGVtZW50IHRoaXMgaW50ZXJmYWNlLlxuICpcbiAqIFRoZSBkZWZhdWx0IFJlbmRlcmVyIGltcGxlbWVudGF0aW9uIGlzIGBEb21SZW5kZXJlcmAuIEFsc28gYXZhaWxhYmxlIGlzIGBXZWJXb3JrZXJSZW5kZXJlcmAuXG4gKi9cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJvb3RSZW5kZXJlciBpbXBsZW1lbnRzIFBhcmVudFJlbmRlcmVyIHtcbiAgYWJzdHJhY3QgcmVuZGVyQ29tcG9uZW50KGNvbXBvbmVudFR5cGU6IFJlbmRlckNvbXBvbmVudFR5cGUpOiBSZW5kZXJlcjtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
