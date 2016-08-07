System.register(['angular2/src/facade/lang', 'angular2/src/core/di', './application_tokens', './application_ref', './change_detection/change_detection', "./linker/view_utils", './linker/component_resolver', './linker/dynamic_component_loader'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, di_1, application_tokens_1, application_ref_1, change_detection_1, view_utils_1, component_resolver_1, dynamic_component_loader_1;
    var __unused, APPLICATION_COMMON_PROVIDERS;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (application_tokens_1_1) {
                application_tokens_1 = application_tokens_1_1;
            },
            function (application_ref_1_1) {
                application_ref_1 = application_ref_1_1;
            },
            function (change_detection_1_1) {
                change_detection_1 = change_detection_1_1;
            },
            function (view_utils_1_1) {
                view_utils_1 = view_utils_1_1;
            },
            function (component_resolver_1_1) {
                component_resolver_1 = component_resolver_1_1;
            },
            function (dynamic_component_loader_1_1) {
                dynamic_component_loader_1 = dynamic_component_loader_1_1;
            }],
        execute: function() {
             // avoid unused import when Type union types are erased
            /**
             * A default set of providers which should be included in any Angular
             * application, regardless of the platform it runs onto.
             */
            exports_1("APPLICATION_COMMON_PROVIDERS", APPLICATION_COMMON_PROVIDERS = lang_1.CONST_EXPR([
                application_ref_1.APPLICATION_CORE_PROVIDERS,
                new di_1.Provider(component_resolver_1.ComponentResolver, { useClass: component_resolver_1.ReflectorComponentResolver }),
                application_tokens_1.APP_ID_RANDOM_PROVIDER,
                view_utils_1.ViewUtils,
                new di_1.Provider(change_detection_1.IterableDiffers, { useValue: change_detection_1.defaultIterableDiffers }),
                new di_1.Provider(change_detection_1.KeyValueDiffers, { useValue: change_detection_1.defaultKeyValueDiffers }),
                new di_1.Provider(dynamic_component_loader_1.DynamicComponentLoader, { useClass: dynamic_component_loader_1.DynamicComponentLoader_ })
            ]));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2FwcGxpY2F0aW9uX2NvbW1vbl9wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQWNJLFFBQVEsRUFNQyw0QkFBNEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFOdEIsQ0FBRSx1REFBdUQ7WUFFNUU7OztlQUdHO1lBQ1UsMENBQUEsNEJBQTRCLEdBQW1DLGlCQUFVLENBQUM7Z0JBQ3JGLDRDQUEwQjtnQkFDMUIsSUFBSSxhQUFRLENBQUMsc0NBQWlCLEVBQUUsRUFBQyxRQUFRLEVBQUUsK0NBQTBCLEVBQUMsQ0FBQztnQkFDdkUsMkNBQXNCO2dCQUN0QixzQkFBUztnQkFDVCxJQUFJLGFBQVEsQ0FBQyxrQ0FBZSxFQUFFLEVBQUMsUUFBUSxFQUFFLHlDQUFzQixFQUFDLENBQUM7Z0JBQ2pFLElBQUksYUFBUSxDQUFDLGtDQUFlLEVBQUUsRUFBQyxRQUFRLEVBQUUseUNBQXNCLEVBQUMsQ0FBQztnQkFDakUsSUFBSSxhQUFRLENBQUMsaURBQXNCLEVBQUUsRUFBQyxRQUFRLEVBQUUsa0RBQXVCLEVBQUMsQ0FBQzthQUMxRSxDQUFDLENBQUEsQ0FBQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29yZS9hcHBsaWNhdGlvbl9jb21tb25fcHJvdmlkZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUeXBlLCBDT05TVF9FWFBSfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtwcm92aWRlLCBQcm92aWRlciwgSW5qZWN0b3IsIE9wYXF1ZVRva2VufSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge0FQUF9JRF9SQU5ET01fUFJPVklERVJ9IGZyb20gJy4vYXBwbGljYXRpb25fdG9rZW5zJztcbmltcG9ydCB7QVBQTElDQVRJT05fQ09SRV9QUk9WSURFUlN9IGZyb20gJy4vYXBwbGljYXRpb25fcmVmJztcbmltcG9ydCB7XG4gIEl0ZXJhYmxlRGlmZmVycyxcbiAgZGVmYXVsdEl0ZXJhYmxlRGlmZmVycyxcbiAgS2V5VmFsdWVEaWZmZXJzLFxuICBkZWZhdWx0S2V5VmFsdWVEaWZmZXJzXG59IGZyb20gJy4vY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0aW9uJztcbmltcG9ydCB7Vmlld1V0aWxzfSBmcm9tIFwiLi9saW5rZXIvdmlld191dGlsc1wiO1xuaW1wb3J0IHtDb21wb25lbnRSZXNvbHZlciwgUmVmbGVjdG9yQ29tcG9uZW50UmVzb2x2ZXJ9IGZyb20gJy4vbGlua2VyL2NvbXBvbmVudF9yZXNvbHZlcic7XG5pbXBvcnQge0R5bmFtaWNDb21wb25lbnRMb2FkZXIsIER5bmFtaWNDb21wb25lbnRMb2FkZXJffSBmcm9tICcuL2xpbmtlci9keW5hbWljX2NvbXBvbmVudF9sb2FkZXInO1xuXG52YXIgX191bnVzZWQ6IFR5cGU7ICAvLyBhdm9pZCB1bnVzZWQgaW1wb3J0IHdoZW4gVHlwZSB1bmlvbiB0eXBlcyBhcmUgZXJhc2VkXG5cbi8qKlxuICogQSBkZWZhdWx0IHNldCBvZiBwcm92aWRlcnMgd2hpY2ggc2hvdWxkIGJlIGluY2x1ZGVkIGluIGFueSBBbmd1bGFyXG4gKiBhcHBsaWNhdGlvbiwgcmVnYXJkbGVzcyBvZiB0aGUgcGxhdGZvcm0gaXQgcnVucyBvbnRvLlxuICovXG5leHBvcnQgY29uc3QgQVBQTElDQVRJT05fQ09NTU9OX1BST1ZJREVSUzogQXJyYXk8VHlwZSB8IFByb3ZpZGVyIHwgYW55W10+ID0gQ09OU1RfRVhQUihbXG4gIEFQUExJQ0FUSU9OX0NPUkVfUFJPVklERVJTLFxuICBuZXcgUHJvdmlkZXIoQ29tcG9uZW50UmVzb2x2ZXIsIHt1c2VDbGFzczogUmVmbGVjdG9yQ29tcG9uZW50UmVzb2x2ZXJ9KSxcbiAgQVBQX0lEX1JBTkRPTV9QUk9WSURFUixcbiAgVmlld1V0aWxzLFxuICBuZXcgUHJvdmlkZXIoSXRlcmFibGVEaWZmZXJzLCB7dXNlVmFsdWU6IGRlZmF1bHRJdGVyYWJsZURpZmZlcnN9KSxcbiAgbmV3IFByb3ZpZGVyKEtleVZhbHVlRGlmZmVycywge3VzZVZhbHVlOiBkZWZhdWx0S2V5VmFsdWVEaWZmZXJzfSksXG4gIG5ldyBQcm92aWRlcihEeW5hbWljQ29tcG9uZW50TG9hZGVyLCB7dXNlQ2xhc3M6IER5bmFtaWNDb21wb25lbnRMb2FkZXJffSlcbl0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
