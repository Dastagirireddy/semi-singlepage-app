System.register(['./compile_metadata', 'angular2/src/core/linker/view', 'angular2/src/core/linker/debug_context', 'angular2/src/core/linker/view_utils', 'angular2/src/core/change_detection/change_detection', 'angular2/src/core/linker/element', 'angular2/src/core/linker/element_ref', 'angular2/src/core/linker/view_container_ref', 'angular2/src/core/render/api', 'angular2/src/core/metadata/view', 'angular2/src/core/linker/view_type', 'angular2/src/core/linker', 'angular2/src/core/di/injector', 'angular2/src/core/linker/template_ref', './util'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var compile_metadata_1, view_1, debug_context_1, view_utils_1, change_detection_1, element_1, element_ref_1, view_container_ref_1, api_1, view_2, view_type_1, linker_1, injector_1, template_ref_1, util_1;
    var APP_VIEW_MODULE_URL, VIEW_UTILS_MODULE_URL, CD_MODULE_URL, impViewUtils, impAppView, impDebugContext, impAppElement, impElementRef, impViewContainerRef, impChangeDetectorRef, impRenderComponentType, impQueryList, impTemplateRef, impTemplateRef_, impValueUnwrapper, impInjector, impViewEncapsulation, impViewType, impChangeDetectionStrategy, impStaticNodeDebugInfo, impRenderer, impSimpleChange, impUninitialized, impChangeDetectorState, impFlattenNestedViewRenderNodes, impDevModeEqual, impInterpolate, impCheckBinding, impCastByValue, Identifiers;
    function identifierToken(identifier) {
        return new compile_metadata_1.CompileTokenMetadata({ identifier: identifier });
    }
    exports_1("identifierToken", identifierToken);
    return {
        setters:[
            function (compile_metadata_1_1) {
                compile_metadata_1 = compile_metadata_1_1;
            },
            function (view_1_1) {
                view_1 = view_1_1;
            },
            function (debug_context_1_1) {
                debug_context_1 = debug_context_1_1;
            },
            function (view_utils_1_1) {
                view_utils_1 = view_utils_1_1;
            },
            function (change_detection_1_1) {
                change_detection_1 = change_detection_1_1;
            },
            function (element_1_1) {
                element_1 = element_1_1;
            },
            function (element_ref_1_1) {
                element_ref_1 = element_ref_1_1;
            },
            function (view_container_ref_1_1) {
                view_container_ref_1 = view_container_ref_1_1;
            },
            function (api_1_1) {
                api_1 = api_1_1;
            },
            function (view_2_1) {
                view_2 = view_2_1;
            },
            function (view_type_1_1) {
                view_type_1 = view_type_1_1;
            },
            function (linker_1_1) {
                linker_1 = linker_1_1;
            },
            function (injector_1_1) {
                injector_1 = injector_1_1;
            },
            function (template_ref_1_1) {
                template_ref_1 = template_ref_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            }],
        execute: function() {
            APP_VIEW_MODULE_URL = 'asset:angular2/lib/src/core/linker/view' + util_1.MODULE_SUFFIX;
            VIEW_UTILS_MODULE_URL = 'asset:angular2/lib/src/core/linker/view_utils' + util_1.MODULE_SUFFIX;
            CD_MODULE_URL = 'asset:angular2/lib/src/core/change_detection/change_detection' + util_1.MODULE_SUFFIX;
            // Reassign the imports to different variables so we can
            // define static variables with the name of the import.
            // (only needed for Dart).
            impViewUtils = view_utils_1.ViewUtils;
            impAppView = view_1.AppView;
            impDebugContext = debug_context_1.DebugContext;
            impAppElement = element_1.AppElement;
            impElementRef = element_ref_1.ElementRef;
            impViewContainerRef = view_container_ref_1.ViewContainerRef;
            impChangeDetectorRef = change_detection_1.ChangeDetectorRef;
            impRenderComponentType = api_1.RenderComponentType;
            impQueryList = linker_1.QueryList;
            impTemplateRef = template_ref_1.TemplateRef;
            impTemplateRef_ = template_ref_1.TemplateRef_;
            impValueUnwrapper = change_detection_1.ValueUnwrapper;
            impInjector = injector_1.Injector;
            impViewEncapsulation = view_2.ViewEncapsulation;
            impViewType = view_type_1.ViewType;
            impChangeDetectionStrategy = change_detection_1.ChangeDetectionStrategy;
            impStaticNodeDebugInfo = debug_context_1.StaticNodeDebugInfo;
            impRenderer = api_1.Renderer;
            impSimpleChange = change_detection_1.SimpleChange;
            impUninitialized = change_detection_1.uninitialized;
            impChangeDetectorState = change_detection_1.ChangeDetectorState;
            impFlattenNestedViewRenderNodes = view_utils_1.flattenNestedViewRenderNodes;
            impDevModeEqual = change_detection_1.devModeEqual;
            impInterpolate = view_utils_1.interpolate;
            impCheckBinding = view_utils_1.checkBinding;
            impCastByValue = view_utils_1.castByValue;
            Identifiers = (function () {
                function Identifiers() {
                }
                Identifiers.ViewUtils = new compile_metadata_1.CompileIdentifierMetadata({
                    name: 'ViewUtils',
                    moduleUrl: 'asset:angular2/lib/src/core/linker/view_utils' + util_1.MODULE_SUFFIX,
                    runtime: impViewUtils
                });
                Identifiers.AppView = new compile_metadata_1.CompileIdentifierMetadata({ name: 'AppView', moduleUrl: APP_VIEW_MODULE_URL, runtime: impAppView });
                Identifiers.AppElement = new compile_metadata_1.CompileIdentifierMetadata({
                    name: 'AppElement',
                    moduleUrl: 'asset:angular2/lib/src/core/linker/element' + util_1.MODULE_SUFFIX,
                    runtime: impAppElement
                });
                Identifiers.ElementRef = new compile_metadata_1.CompileIdentifierMetadata({
                    name: 'ElementRef',
                    moduleUrl: 'asset:angular2/lib/src/core/linker/element_ref' + util_1.MODULE_SUFFIX,
                    runtime: impElementRef
                });
                Identifiers.ViewContainerRef = new compile_metadata_1.CompileIdentifierMetadata({
                    name: 'ViewContainerRef',
                    moduleUrl: 'asset:angular2/lib/src/core/linker/view_container_ref' + util_1.MODULE_SUFFIX,
                    runtime: impViewContainerRef
                });
                Identifiers.ChangeDetectorRef = new compile_metadata_1.CompileIdentifierMetadata({
                    name: 'ChangeDetectorRef',
                    moduleUrl: 'asset:angular2/lib/src/core/change_detection/change_detector_ref' + util_1.MODULE_SUFFIX,
                    runtime: impChangeDetectorRef
                });
                Identifiers.RenderComponentType = new compile_metadata_1.CompileIdentifierMetadata({
                    name: 'RenderComponentType',
                    moduleUrl: 'asset:angular2/lib/src/core/render/api' + util_1.MODULE_SUFFIX,
                    runtime: impRenderComponentType
                });
                Identifiers.QueryList = new compile_metadata_1.CompileIdentifierMetadata({
                    name: 'QueryList',
                    moduleUrl: 'asset:angular2/lib/src/core/linker/query_list' + util_1.MODULE_SUFFIX,
                    runtime: impQueryList
                });
                Identifiers.TemplateRef = new compile_metadata_1.CompileIdentifierMetadata({
                    name: 'TemplateRef',
                    moduleUrl: 'asset:angular2/lib/src/core/linker/template_ref' + util_1.MODULE_SUFFIX,
                    runtime: impTemplateRef
                });
                Identifiers.TemplateRef_ = new compile_metadata_1.CompileIdentifierMetadata({
                    name: 'TemplateRef_',
                    moduleUrl: 'asset:angular2/lib/src/core/linker/template_ref' + util_1.MODULE_SUFFIX,
                    runtime: impTemplateRef_
                });
                Identifiers.ValueUnwrapper = new compile_metadata_1.CompileIdentifierMetadata({ name: 'ValueUnwrapper', moduleUrl: CD_MODULE_URL, runtime: impValueUnwrapper });
                Identifiers.Injector = new compile_metadata_1.CompileIdentifierMetadata({
                    name: 'Injector',
                    moduleUrl: "asset:angular2/lib/src/core/di/injector" + util_1.MODULE_SUFFIX,
                    runtime: impInjector
                });
                Identifiers.ViewEncapsulation = new compile_metadata_1.CompileIdentifierMetadata({
                    name: 'ViewEncapsulation',
                    moduleUrl: 'asset:angular2/lib/src/core/metadata/view' + util_1.MODULE_SUFFIX,
                    runtime: impViewEncapsulation
                });
                Identifiers.ViewType = new compile_metadata_1.CompileIdentifierMetadata({
                    name: 'ViewType',
                    moduleUrl: "asset:angular2/lib/src/core/linker/view_type" + util_1.MODULE_SUFFIX,
                    runtime: impViewType
                });
                Identifiers.ChangeDetectionStrategy = new compile_metadata_1.CompileIdentifierMetadata({
                    name: 'ChangeDetectionStrategy',
                    moduleUrl: CD_MODULE_URL,
                    runtime: impChangeDetectionStrategy
                });
                Identifiers.StaticNodeDebugInfo = new compile_metadata_1.CompileIdentifierMetadata({
                    name: 'StaticNodeDebugInfo',
                    moduleUrl: "asset:angular2/lib/src/core/linker/debug_context" + util_1.MODULE_SUFFIX,
                    runtime: impStaticNodeDebugInfo
                });
                Identifiers.DebugContext = new compile_metadata_1.CompileIdentifierMetadata({
                    name: 'DebugContext',
                    moduleUrl: "asset:angular2/lib/src/core/linker/debug_context" + util_1.MODULE_SUFFIX,
                    runtime: impDebugContext
                });
                Identifiers.Renderer = new compile_metadata_1.CompileIdentifierMetadata({
                    name: 'Renderer',
                    moduleUrl: 'asset:angular2/lib/src/core/render/api' + util_1.MODULE_SUFFIX,
                    runtime: impRenderer
                });
                Identifiers.SimpleChange = new compile_metadata_1.CompileIdentifierMetadata({ name: 'SimpleChange', moduleUrl: CD_MODULE_URL, runtime: impSimpleChange });
                Identifiers.uninitialized = new compile_metadata_1.CompileIdentifierMetadata({ name: 'uninitialized', moduleUrl: CD_MODULE_URL, runtime: impUninitialized });
                Identifiers.ChangeDetectorState = new compile_metadata_1.CompileIdentifierMetadata({ name: 'ChangeDetectorState', moduleUrl: CD_MODULE_URL, runtime: impChangeDetectorState });
                Identifiers.checkBinding = new compile_metadata_1.CompileIdentifierMetadata({ name: 'checkBinding', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: impCheckBinding });
                Identifiers.flattenNestedViewRenderNodes = new compile_metadata_1.CompileIdentifierMetadata({
                    name: 'flattenNestedViewRenderNodes',
                    moduleUrl: VIEW_UTILS_MODULE_URL,
                    runtime: impFlattenNestedViewRenderNodes
                });
                Identifiers.devModeEqual = new compile_metadata_1.CompileIdentifierMetadata({ name: 'devModeEqual', moduleUrl: CD_MODULE_URL, runtime: impDevModeEqual });
                Identifiers.interpolate = new compile_metadata_1.CompileIdentifierMetadata({ name: 'interpolate', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: impInterpolate });
                Identifiers.castByValue = new compile_metadata_1.CompileIdentifierMetadata({ name: 'castByValue', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: impCastByValue });
                Identifiers.pureProxies = [
                    null,
                    new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy1', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: view_utils_1.pureProxy1 }),
                    new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy2', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: view_utils_1.pureProxy2 }),
                    new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy3', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: view_utils_1.pureProxy3 }),
                    new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy4', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: view_utils_1.pureProxy4 }),
                    new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy5', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: view_utils_1.pureProxy5 }),
                    new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy6', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: view_utils_1.pureProxy6 }),
                    new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy7', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: view_utils_1.pureProxy7 }),
                    new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy8', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: view_utils_1.pureProxy8 }),
                    new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy9', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: view_utils_1.pureProxy9 }),
                    new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy10', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: view_utils_1.pureProxy10 }),
                ];
                return Identifiers;
            }());
            exports_1("Identifiers", Identifiers);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9pZGVudGlmaWVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBd0NJLG1CQUFtQixFQUNuQixxQkFBcUIsRUFDckIsYUFBYSxFQUtiLFlBQVksRUFDWixVQUFVLEVBQ1YsZUFBZSxFQUNmLGFBQWEsRUFDYixhQUFhLEVBQ2IsbUJBQW1CLEVBQ25CLG9CQUFvQixFQUNwQixzQkFBc0IsRUFDdEIsWUFBWSxFQUNaLGNBQWMsRUFDZCxlQUFlLEVBQ2YsaUJBQWlCLEVBQ2pCLFdBQVcsRUFDWCxvQkFBb0IsRUFDcEIsV0FBVyxFQUNYLDBCQUEwQixFQUMxQixzQkFBc0IsRUFDdEIsV0FBVyxFQUNYLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsc0JBQXNCLEVBQ3RCLCtCQUErQixFQUMvQixlQUFlLEVBQ2YsY0FBYyxFQUNkLGVBQWUsRUFDZixjQUFjO0lBbUlsQix5QkFBZ0MsVUFBcUM7UUFDbkUsTUFBTSxDQUFDLElBQUksdUNBQW9CLENBQUMsRUFBQyxVQUFVLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRkQsNkNBRUMsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQXJLRyxtQkFBbUIsR0FBRyx5Q0FBeUMsR0FBRyxvQkFBYSxDQUFDO1lBQ2hGLHFCQUFxQixHQUFHLCtDQUErQyxHQUFHLG9CQUFhLENBQUM7WUFDeEYsYUFBYSxHQUFHLCtEQUErRCxHQUFHLG9CQUFhLENBQUM7WUFFcEcsd0RBQXdEO1lBQ3hELHVEQUF1RDtZQUN2RCwwQkFBMEI7WUFDdEIsWUFBWSxHQUFHLHNCQUFTLENBQUM7WUFDekIsVUFBVSxHQUFHLGNBQU8sQ0FBQztZQUNyQixlQUFlLEdBQUcsNEJBQVksQ0FBQztZQUMvQixhQUFhLEdBQUcsb0JBQVUsQ0FBQztZQUMzQixhQUFhLEdBQUcsd0JBQVUsQ0FBQztZQUMzQixt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UyxFQUFFLHFCQUFxQixFQUFFLE9BQU8sRUFBRSx1QkFBVSxFQUFDLENBQUM7b0JBQ2hGLElBQUksNENBQXlCLENBQ3pCLEVBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUscUJBQXFCLEVBQUUsT0FBTyxFQUFFLHVCQUFVLEVBQUMsQ0FBQztvQkFDaEYsSUFBSSw0Q0FBeUIsQ0FDekIsRUFBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxxQkFBcUIsRUFBRSxPQUFPLEVBQUUsdUJBQVUsRUFBQyxDQUFDO29CQUNoRixJQUFJLDRDQUF5QixDQUN6QixFQUFDLElBQUksRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLHFCQUFxQixFQUFFLE9BQU8sRUFBRSx3QkFBVyxFQUFDLENBQUM7aUJBQ25GLENBQUM7Z0JBQ0osa0JBQUM7WUFBRCxDQS9IQSxBQStIQyxJQUFBO1lBL0hELHFDQStIQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9pZGVudGlmaWVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSwgQ29tcGlsZVRva2VuTWV0YWRhdGF9IGZyb20gJy4vY29tcGlsZV9tZXRhZGF0YSc7XG5pbXBvcnQge0FwcFZpZXd9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci92aWV3JztcbmltcG9ydCB7U3RhdGljTm9kZURlYnVnSW5mbywgRGVidWdDb250ZXh0fSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvZGVidWdfY29udGV4dCc7XG5pbXBvcnQge1xuICBWaWV3VXRpbHMsXG4gIGZsYXR0ZW5OZXN0ZWRWaWV3UmVuZGVyTm9kZXMsXG4gIGludGVycG9sYXRlLFxuICBjaGVja0JpbmRpbmcsXG4gIGNhc3RCeVZhbHVlLFxuICBwdXJlUHJveHkxLFxuICBwdXJlUHJveHkyLFxuICBwdXJlUHJveHkzLFxuICBwdXJlUHJveHk0LFxuICBwdXJlUHJveHk1LFxuICBwdXJlUHJveHk2LFxuICBwdXJlUHJveHk3LFxuICBwdXJlUHJveHk4LFxuICBwdXJlUHJveHk5LFxuICBwdXJlUHJveHkxMFxufSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvdmlld191dGlscyc7XG5pbXBvcnQge1xuICB1bmluaXRpYWxpemVkLFxuICBkZXZNb2RlRXF1YWwsXG4gIFNpbXBsZUNoYW5nZSxcbiAgVmFsdWVVbndyYXBwZXIsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDaGFuZ2VEZXRlY3RvclN0YXRlLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxufSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2NoYW5nZV9kZXRlY3Rpb24nO1xuaW1wb3J0IHtBcHBFbGVtZW50fSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvZWxlbWVudCc7XG5pbXBvcnQge0VsZW1lbnRSZWZ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9lbGVtZW50X3JlZic7XG5pbXBvcnQge1ZpZXdDb250YWluZXJSZWZ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci92aWV3X2NvbnRhaW5lcl9yZWYnO1xuaW1wb3J0IHtSZW5kZXJlciwgUmVuZGVyQ29tcG9uZW50VHlwZSwgUmVuZGVyRGVidWdJbmZvfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9yZW5kZXIvYXBpJztcbmltcG9ydCB7Vmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL21ldGFkYXRhL3ZpZXcnO1xuaW1wb3J0IHtWaWV3VHlwZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL3ZpZXdfdHlwZSc7XG5pbXBvcnQge1F1ZXJ5TGlzdH0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyJztcbmltcG9ydCB7SW5qZWN0b3J9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpL2luamVjdG9yJztcbmltcG9ydCB7VGVtcGxhdGVSZWYsIFRlbXBsYXRlUmVmX30gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL3RlbXBsYXRlX3JlZic7XG5pbXBvcnQge01PRFVMRV9TVUZGSVh9IGZyb20gJy4vdXRpbCc7XG5cbnZhciBBUFBfVklFV19NT0RVTEVfVVJMID0gJ2Fzc2V0OmFuZ3VsYXIyL2xpYi9zcmMvY29yZS9saW5rZXIvdmlldycgKyBNT0RVTEVfU1VGRklYO1xudmFyIFZJRVdfVVRJTFNfTU9EVUxFX1VSTCA9ICdhc3NldDphbmd1bGFyMi9saWIvc3JjL2NvcmUvbGlua2VyL3ZpZXdfdXRpbHMnICsgTU9EVUxFX1NVRkZJWDtcbnZhciBDRF9NT0RVTEVfVVJMID0gJ2Fzc2V0OmFuZ3VsYXIyL2xpYi9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2NoYW5nZV9kZXRlY3Rpb24nICsgTU9EVUxFX1NVRkZJWDtcblxuLy8gUmVhc3NpZ24gdGhlIGltcG9ydHMgdG8gZGlmZmVyZW50IHZhcmlhYmxlcyBzbyB3ZSBjYW5cbi8vIGRlZmluZSBzdGF0aWMgdmFyaWFibGVzIHdpdGggdGhlIG5hbWUgb2YgdGhlIGltcG9ydC5cbi8vIChvbmx5IG5lZWRlZCBmb3IgRGFydCkuXG52YXIgaW1wVmlld1V0aWxzID0gVmlld1V0aWxzO1xudmFyIGltcEFwcFZpZXcgPSBBcHBWaWV3O1xudmFyIGltcERlYnVnQ29udGV4dCA9IERlYnVnQ29udGV4dDtcbnZhciBpbXBBcHBFbGVtZW50ID0gQXBwRWxlbWVudDtcbnZhciBpbXBFbGVtZW50UmVmID0gRWxlbWVudFJlZjtcbnZhciBpbXBWaWV3Q29udGFpbmVyUmVmID0gVmlld0NvbnRhaW5lclJlZjtcbnZhciBpbXBDaGFuZ2VEZXRlY3RvclJlZiA9IENoYW5nZURldGVjdG9yUmVmO1xudmFyIGltcFJlbmRlckNvbXBvbmVudFR5cGUgPSBSZW5kZXJDb21wb25lbnRUeXBlO1xudmFyIGltcFF1ZXJ5TGlzdCA9IFF1ZXJ5TGlzdDtcbnZhciBpbXBUZW1wbGF0ZVJlZiA9IFRlbXBsYXRlUmVmO1xudmFyIGltcFRlbXBsYXRlUmVmXyA9IFRlbXBsYXRlUmVmXztcbnZhciBpbXBWYWx1ZVVud3JhcHBlciA9IFZhbHVlVW53cmFwcGVyO1xudmFyIGltcEluamVjdG9yID0gSW5qZWN0b3I7XG52YXIgaW1wVmlld0VuY2Fwc3VsYXRpb24gPSBWaWV3RW5jYXBzdWxhdGlvbjtcbnZhciBpbXBWaWV3VHlwZSA9IFZpZXdUeXBlO1xudmFyIGltcENoYW5nZURldGVjdGlvblN0cmF0ZWd5ID0gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3k7XG52YXIgaW1wU3RhdGljTm9kZURlYnVnSW5mbyA9IFN0YXRpY05vZGVEZWJ1Z0luZm87XG52YXIgaW1wUmVuZGVyZXIgPSBSZW5kZXJlcjtcbnZhciBpbXBTaW1wbGVDaGFuZ2UgPSBTaW1wbGVDaGFuZ2U7XG52YXIgaW1wVW5pbml0aWFsaXplZCA9IHVuaW5pdGlhbGl6ZWQ7XG52YXIgaW1wQ2hhbmdlRGV0ZWN0b3JTdGF0ZSA9IENoYW5nZURldGVjdG9yU3RhdGU7XG52YXIgaW1wRmxhdHRlbk5lc3RlZFZpZXdSZW5kZXJOb2RlcyA9IGZsYXR0ZW5OZXN0ZWRWaWV3UmVuZGVyTm9kZXM7XG52YXIgaW1wRGV2TW9kZUVxdWFsID0gZGV2TW9kZUVxdWFsO1xudmFyIGltcEludGVycG9sYXRlID0gaW50ZXJwb2xhdGU7XG52YXIgaW1wQ2hlY2tCaW5kaW5nID0gY2hlY2tCaW5kaW5nO1xudmFyIGltcENhc3RCeVZhbHVlID0gY2FzdEJ5VmFsdWU7XG5cbmV4cG9ydCBjbGFzcyBJZGVudGlmaWVycyB7XG4gIHN0YXRpYyBWaWV3VXRpbHMgPSBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSh7XG4gICAgbmFtZTogJ1ZpZXdVdGlscycsXG4gICAgbW9kdWxlVXJsOiAnYXNzZXQ6YW5ndWxhcjIvbGliL3NyYy9jb3JlL2xpbmtlci92aWV3X3V0aWxzJyArIE1PRFVMRV9TVUZGSVgsXG4gICAgcnVudGltZTogaW1wVmlld1V0aWxzXG4gIH0pO1xuICBzdGF0aWMgQXBwVmlldyA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKFxuICAgICAge25hbWU6ICdBcHBWaWV3JywgbW9kdWxlVXJsOiBBUFBfVklFV19NT0RVTEVfVVJMLCBydW50aW1lOiBpbXBBcHBWaWV3fSk7XG4gIHN0YXRpYyBBcHBFbGVtZW50ID0gbmV3IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEoe1xuICAgIG5hbWU6ICdBcHBFbGVtZW50JyxcbiAgICBtb2R1bGVVcmw6ICdhc3NldDphbmd1bGFyMi9saWIvc3JjL2NvcmUvbGlua2VyL2VsZW1lbnQnICsgTU9EVUxFX1NVRkZJWCxcbiAgICBydW50aW1lOiBpbXBBcHBFbGVtZW50XG4gIH0pO1xuICBzdGF0aWMgRWxlbWVudFJlZiA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKHtcbiAgICBuYW1lOiAnRWxlbWVudFJlZicsXG4gICAgbW9kdWxlVXJsOiAnYXNzZXQ6YW5ndWxhcjIvbGliL3NyYy9jb3JlL2xpbmtlci9lbGVtZW50X3JlZicgKyBNT0RVTEVfU1VGRklYLFxuICAgIHJ1bnRpbWU6IGltcEVsZW1lbnRSZWZcbiAgfSk7XG4gIHN0YXRpYyBWaWV3Q29udGFpbmVyUmVmID0gbmV3IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEoe1xuICAgIG5hbWU6ICdWaWV3Q29udGFpbmVyUmVmJyxcbiAgICBtb2R1bGVVcmw6ICdhc3NldDphbmd1bGFyMi9saWIvc3JjL2NvcmUvbGlua2VyL3ZpZXdfY29udGFpbmVyX3JlZicgKyBNT0RVTEVfU1VGRklYLFxuICAgIHJ1bnRpbWU6IGltcFZpZXdDb250YWluZXJSZWZcbiAgfSk7XG4gIHN0YXRpYyBDaGFuZ2VEZXRlY3RvclJlZiA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKHtcbiAgICBuYW1lOiAnQ2hhbmdlRGV0ZWN0b3JSZWYnLFxuICAgIG1vZHVsZVVybDogJ2Fzc2V0OmFuZ3VsYXIyL2xpYi9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2NoYW5nZV9kZXRlY3Rvcl9yZWYnICsgTU9EVUxFX1NVRkZJWCxcbiAgICBydW50aW1lOiBpbXBDaGFuZ2VEZXRlY3RvclJlZlxuICB9KTtcbiAgc3RhdGljIFJlbmRlckNvbXBvbmVudFR5cGUgPSBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSh7XG4gICAgbmFtZTogJ1JlbmRlckNvbXBvbmVudFR5cGUnLFxuICAgIG1vZHVsZVVybDogJ2Fzc2V0OmFuZ3VsYXIyL2xpYi9zcmMvY29yZS9yZW5kZXIvYXBpJyArIE1PRFVMRV9TVUZGSVgsXG4gICAgcnVudGltZTogaW1wUmVuZGVyQ29tcG9uZW50VHlwZVxuICB9KTtcbiAgc3RhdGljIFF1ZXJ5TGlzdCA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKHtcbiAgICBuYW1lOiAnUXVlcnlMaXN0JyxcbiAgICBtb2R1bGVVcmw6ICdhc3NldDphbmd1bGFyMi9saWIvc3JjL2NvcmUvbGlua2VyL3F1ZXJ5X2xpc3QnICsgTU9EVUxFX1NVRkZJWCxcbiAgICBydW50aW1lOiBpbXBRdWVyeUxpc3RcbiAgfSk7XG4gIHN0YXRpYyBUZW1wbGF0ZVJlZiA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKHtcbiAgICBuYW1lOiAnVGVtcGxhdGVSZWYnLFxuICAgIG1vZHVsZVVybDogJ2Fzc2V0OmFuZ3VsYXIyL2xpYi9zcmMvY29yZS9saW5rZXIvdGVtcGxhdGVfcmVmJyArIE1PRFVMRV9TVUZGSVgsXG4gICAgcnVudGltZTogaW1wVGVtcGxhdGVSZWZcbiAgfSk7XG4gIHN0YXRpYyBUZW1wbGF0ZVJlZl8gPSBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSh7XG4gICAgbmFtZTogJ1RlbXBsYXRlUmVmXycsXG4gICAgbW9kdWxlVXJsOiAnYXNzZXQ6YW5ndWxhcjIvbGliL3NyYy9jb3JlL2xpbmtlci90ZW1wbGF0ZV9yZWYnICsgTU9EVUxFX1NVRkZJWCxcbiAgICBydW50aW1lOiBpbXBUZW1wbGF0ZVJlZl9cbiAgfSk7XG4gIHN0YXRpYyBWYWx1ZVVud3JhcHBlciA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKFxuICAgICAge25hbWU6ICdWYWx1ZVVud3JhcHBlcicsIG1vZHVsZVVybDogQ0RfTU9EVUxFX1VSTCwgcnVudGltZTogaW1wVmFsdWVVbndyYXBwZXJ9KTtcbiAgc3RhdGljIEluamVjdG9yID0gbmV3IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEoe1xuICAgIG5hbWU6ICdJbmplY3RvcicsXG4gICAgbW9kdWxlVXJsOiBgYXNzZXQ6YW5ndWxhcjIvbGliL3NyYy9jb3JlL2RpL2luamVjdG9yJHtNT0RVTEVfU1VGRklYfWAsXG4gICAgcnVudGltZTogaW1wSW5qZWN0b3JcbiAgfSk7XG4gIHN0YXRpYyBWaWV3RW5jYXBzdWxhdGlvbiA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKHtcbiAgICBuYW1lOiAnVmlld0VuY2Fwc3VsYXRpb24nLFxuICAgIG1vZHVsZVVybDogJ2Fzc2V0OmFuZ3VsYXIyL2xpYi9zcmMvY29yZS9tZXRhZGF0YS92aWV3JyArIE1PRFVMRV9TVUZGSVgsXG4gICAgcnVudGltZTogaW1wVmlld0VuY2Fwc3VsYXRpb25cbiAgfSk7XG4gIHN0YXRpYyBWaWV3VHlwZSA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKHtcbiAgICBuYW1lOiAnVmlld1R5cGUnLFxuICAgIG1vZHVsZVVybDogYGFzc2V0OmFuZ3VsYXIyL2xpYi9zcmMvY29yZS9saW5rZXIvdmlld190eXBlJHtNT0RVTEVfU1VGRklYfWAsXG4gICAgcnVudGltZTogaW1wVmlld1R5cGVcbiAgfSk7XG4gIHN0YXRpYyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKHtcbiAgICBuYW1lOiAnQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3knLFxuICAgIG1vZHVsZVVybDogQ0RfTU9EVUxFX1VSTCxcbiAgICBydW50aW1lOiBpbXBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxuICB9KTtcbiAgc3RhdGljIFN0YXRpY05vZGVEZWJ1Z0luZm8gPSBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSh7XG4gICAgbmFtZTogJ1N0YXRpY05vZGVEZWJ1Z0luZm8nLFxuICAgIG1vZHVsZVVybDogYGFzc2V0OmFuZ3VsYXIyL2xpYi9zcmMvY29yZS9saW5rZXIvZGVidWdfY29udGV4dCR7TU9EVUxFX1NVRkZJWH1gLFxuICAgIHJ1bnRpbWU6IGltcFN0YXRpY05vZGVEZWJ1Z0luZm9cbiAgfSk7XG4gIHN0YXRpYyBEZWJ1Z0NvbnRleHQgPSBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSh7XG4gICAgbmFtZTogJ0RlYnVnQ29udGV4dCcsXG4gICAgbW9kdWxlVXJsOiBgYXNzZXQ6YW5ndWxhcjIvbGliL3NyYy9jb3JlL2xpbmtlci9kZWJ1Z19jb250ZXh0JHtNT0RVTEVfU1VGRklYfWAsXG4gICAgcnVudGltZTogaW1wRGVidWdDb250ZXh0XG4gIH0pO1xuICBzdGF0aWMgUmVuZGVyZXIgPSBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSh7XG4gICAgbmFtZTogJ1JlbmRlcmVyJyxcbiAgICBtb2R1bGVVcmw6ICdhc3NldDphbmd1bGFyMi9saWIvc3JjL2NvcmUvcmVuZGVyL2FwaScgKyBNT0RVTEVfU1VGRklYLFxuICAgIHJ1bnRpbWU6IGltcFJlbmRlcmVyXG4gIH0pO1xuICBzdGF0aWMgU2ltcGxlQ2hhbmdlID0gbmV3IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEoXG4gICAgICB7bmFtZTogJ1NpbXBsZUNoYW5nZScsIG1vZHVsZVVybDogQ0RfTU9EVUxFX1VSTCwgcnVudGltZTogaW1wU2ltcGxlQ2hhbmdlfSk7XG4gIHN0YXRpYyB1bmluaXRpYWxpemVkID0gbmV3IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEoXG4gICAgICB7bmFtZTogJ3VuaW5pdGlhbGl6ZWQnLCBtb2R1bGVVcmw6IENEX01PRFVMRV9VUkwsIHJ1bnRpbWU6IGltcFVuaW5pdGlhbGl6ZWR9KTtcbiAgc3RhdGljIENoYW5nZURldGVjdG9yU3RhdGUgPSBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YShcbiAgICAgIHtuYW1lOiAnQ2hhbmdlRGV0ZWN0b3JTdGF0ZScsIG1vZHVsZVVybDogQ0RfTU9EVUxFX1VSTCwgcnVudGltZTogaW1wQ2hhbmdlRGV0ZWN0b3JTdGF0ZX0pO1xuICBzdGF0aWMgY2hlY2tCaW5kaW5nID0gbmV3IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEoXG4gICAgICB7bmFtZTogJ2NoZWNrQmluZGluZycsIG1vZHVsZVVybDogVklFV19VVElMU19NT0RVTEVfVVJMLCBydW50aW1lOiBpbXBDaGVja0JpbmRpbmd9KTtcbiAgc3RhdGljIGZsYXR0ZW5OZXN0ZWRWaWV3UmVuZGVyTm9kZXMgPSBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSh7XG4gICAgbmFtZTogJ2ZsYXR0ZW5OZXN0ZWRWaWV3UmVuZGVyTm9kZXMnLFxuICAgIG1vZHVsZVVybDogVklFV19VVElMU19NT0RVTEVfVVJMLFxuICAgIHJ1bnRpbWU6IGltcEZsYXR0ZW5OZXN0ZWRWaWV3UmVuZGVyTm9kZXNcbiAgfSk7XG4gIHN0YXRpYyBkZXZNb2RlRXF1YWwgPSBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YShcbiAgICAgIHtuYW1lOiAnZGV2TW9kZUVxdWFsJywgbW9kdWxlVXJsOiBDRF9NT0RVTEVfVVJMLCBydW50aW1lOiBpbXBEZXZNb2RlRXF1YWx9KTtcbiAgc3RhdGljIGludGVycG9sYXRlID0gbmV3IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEoXG4gICAgICB7bmFtZTogJ2ludGVycG9sYXRlJywgbW9kdWxlVXJsOiBWSUVXX1VUSUxTX01PRFVMRV9VUkwsIHJ1bnRpbWU6IGltcEludGVycG9sYXRlfSk7XG4gIHN0YXRpYyBjYXN0QnlWYWx1ZSA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKFxuICAgICAge25hbWU6ICdjYXN0QnlWYWx1ZScsIG1vZHVsZVVybDogVklFV19VVElMU19NT0RVTEVfVVJMLCBydW50aW1lOiBpbXBDYXN0QnlWYWx1ZX0pO1xuICBzdGF0aWMgcHVyZVByb3hpZXMgPSBbXG4gICAgbnVsbCxcbiAgICBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YShcbiAgICAgICAge25hbWU6ICdwdXJlUHJveHkxJywgbW9kdWxlVXJsOiBWSUVXX1VUSUxTX01PRFVMRV9VUkwsIHJ1bnRpbWU6IHB1cmVQcm94eTF9KSxcbiAgICBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YShcbiAgICAgICAge25hbWU6ICdwdXJlUHJveHkyJywgbW9kdWxlVXJsOiBWSUVXX1VUSUxTX01PRFVMRV9VUkwsIHJ1bnRpbWU6IHB1cmVQcm94eTJ9KSxcbiAgICBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YShcbiAgICAgICAge25hbWU6ICdwdXJlUHJveHkzJywgbW9kdWxlVXJsOiBWSUVXX1VUSUxTX01PRFVMRV9VUkwsIHJ1bnRpbWU6IHB1cmVQcm94eTN9KSxcbiAgICBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YShcbiAgICAgICAge25hbWU6ICdwdXJlUHJveHk0JywgbW9kdWxlVXJsOiBWSUVXX1VUSUxTX01PRFVMRV9VUkwsIHJ1bnRpbWU6IHB1cmVQcm94eTR9KSxcbiAgICBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YShcbiAgICAgICAge25hbWU6ICdwdXJlUHJveHk1JywgbW9kdWxlVXJsOiBWSUVXX1VUSUxTX01PRFVMRV9VUkwsIHJ1bnRpbWU6IHB1cmVQcm94eTV9KSxcbiAgICBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YShcbiAgICAgICAge25hbWU6ICdwdXJlUHJveHk2JywgbW9kdWxlVXJsOiBWSUVXX1VUSUxTX01PRFVMRV9VUkwsIHJ1bnRpbWU6IHB1cmVQcm94eTZ9KSxcbiAgICBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YShcbiAgICAgICAge25hbWU6ICdwdXJlUHJveHk3JywgbW9kdWxlVXJsOiBWSUVXX1VUSUxTX01PRFVMRV9VUkwsIHJ1bnRpbWU6IHB1cmVQcm94eTd9KSxcbiAgICBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YShcbiAgICAgICAge25hbWU6ICdwdXJlUHJveHk4JywgbW9kdWxlVXJsOiBWSUVXX1VUSUxTX01PRFVMRV9VUkwsIHJ1bnRpbWU6IHB1cmVQcm94eTh9KSxcbiAgICBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YShcbiAgICAgICAge25hbWU6ICdwdXJlUHJveHk5JywgbW9kdWxlVXJsOiBWSUVXX1VUSUxTX01PRFVMRV9VUkwsIHJ1bnRpbWU6IHB1cmVQcm94eTl9KSxcbiAgICBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YShcbiAgICAgICAge25hbWU6ICdwdXJlUHJveHkxMCcsIG1vZHVsZVVybDogVklFV19VVElMU19NT0RVTEVfVVJMLCBydW50aW1lOiBwdXJlUHJveHkxMH0pLFxuICBdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaWRlbnRpZmllclRva2VuKGlkZW50aWZpZXI6IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEpOiBDb21waWxlVG9rZW5NZXRhZGF0YSB7XG4gIHJldHVybiBuZXcgQ29tcGlsZVRva2VuTWV0YWRhdGEoe2lkZW50aWZpZXI6IGlkZW50aWZpZXJ9KTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
