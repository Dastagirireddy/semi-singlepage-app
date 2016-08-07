System.register(['angular2/src/facade/lang', 'angular2/src/core/di', './application_tokens', './change_detection/change_detection', 'angular2/src/core/linker/resolved_metadata_cache', './linker/view_manager', './linker/view_resolver', './linker/directive_resolver', './linker/pipe_resolver', './linker/compiler', './linker/dynamic_component_loader'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, di_1, application_tokens_1, change_detection_1, resolved_metadata_cache_1, view_manager_1, view_manager_2, view_resolver_1, directive_resolver_1, pipe_resolver_1, compiler_1, compiler_2, dynamic_component_loader_1, dynamic_component_loader_2;
    var APPLICATION_COMMON_PROVIDERS;
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
            function (change_detection_1_1) {
                change_detection_1 = change_detection_1_1;
            },
            function (resolved_metadata_cache_1_1) {
                resolved_metadata_cache_1 = resolved_metadata_cache_1_1;
            },
            function (view_manager_1_1) {
                view_manager_1 = view_manager_1_1;
                view_manager_2 = view_manager_1_1;
            },
            function (view_resolver_1_1) {
                view_resolver_1 = view_resolver_1_1;
            },
            function (directive_resolver_1_1) {
                directive_resolver_1 = directive_resolver_1_1;
            },
            function (pipe_resolver_1_1) {
                pipe_resolver_1 = pipe_resolver_1_1;
            },
            function (compiler_1_1) {
                compiler_1 = compiler_1_1;
                compiler_2 = compiler_1_1;
            },
            function (dynamic_component_loader_1_1) {
                dynamic_component_loader_1 = dynamic_component_loader_1_1;
                dynamic_component_loader_2 = dynamic_component_loader_1_1;
            }],
        execute: function() {
            /**
             * A default set of providers which should be included in any Angular
             * application, regardless of the platform it runs onto.
             */
            exports_1("APPLICATION_COMMON_PROVIDERS", APPLICATION_COMMON_PROVIDERS = lang_1.CONST_EXPR([
                new di_1.Provider(compiler_1.Compiler, { useClass: compiler_2.Compiler_ }),
                application_tokens_1.APP_ID_RANDOM_PROVIDER,
                resolved_metadata_cache_1.ResolvedMetadataCache,
                new di_1.Provider(view_manager_1.AppViewManager, { useClass: view_manager_2.AppViewManager_ }),
                view_resolver_1.ViewResolver,
                new di_1.Provider(change_detection_1.IterableDiffers, { useValue: change_detection_1.defaultIterableDiffers }),
                new di_1.Provider(change_detection_1.KeyValueDiffers, { useValue: change_detection_1.defaultKeyValueDiffers }),
                directive_resolver_1.DirectiveResolver,
                pipe_resolver_1.PipeResolver,
                new di_1.Provider(dynamic_component_loader_1.DynamicComponentLoader, { useClass: dynamic_component_loader_2.DynamicComponentLoader_ })
            ]));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvYXBwbGljYXRpb25fY29tbW9uX3Byb3ZpZGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBNEJhLDRCQUE0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUp6Qzs7O2VBR0c7WUFDVSwwQ0FBQSw0QkFBNEIsR0FBbUMsaUJBQVUsQ0FBQztnQkFDckYsSUFBSSxhQUFRLENBQUMsbUJBQVEsRUFBRSxFQUFDLFFBQVEsRUFBRSxvQkFBUyxFQUFDLENBQUM7Z0JBQzdDLDJDQUFzQjtnQkFDdEIsK0NBQXFCO2dCQUNyQixJQUFJLGFBQVEsQ0FBQyw2QkFBYyxFQUFFLEVBQUMsUUFBUSxFQUFFLDhCQUFlLEVBQUMsQ0FBQztnQkFDekQsNEJBQVk7Z0JBQ1osSUFBSSxhQUFRLENBQUMsa0NBQWUsRUFBRSxFQUFDLFFBQVEsRUFBRSx5Q0FBc0IsRUFBQyxDQUFDO2dCQUNqRSxJQUFJLGFBQVEsQ0FBQyxrQ0FBZSxFQUFFLEVBQUMsUUFBUSxFQUFFLHlDQUFzQixFQUFDLENBQUM7Z0JBQ2pFLHNDQUFpQjtnQkFDakIsNEJBQVk7Z0JBQ1osSUFBSSxhQUFRLENBQUMsaURBQXNCLEVBQUUsRUFBQyxRQUFRLEVBQUUsa0RBQXVCLEVBQUMsQ0FBQzthQUMxRSxDQUFDLENBQUEsQ0FBQyIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2FwcGxpY2F0aW9uX2NvbW1vbl9wcm92aWRlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1R5cGUsIENPTlNUX0VYUFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge3Byb3ZpZGUsIFByb3ZpZGVyLCBJbmplY3RvciwgT3BhcXVlVG9rZW59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7XG4gIEFQUF9DT01QT05FTlRfUkVGX1BST01JU0UsXG4gIEFQUF9DT01QT05FTlQsXG4gIEFQUF9JRF9SQU5ET01fUFJPVklERVJcbn0gZnJvbSAnLi9hcHBsaWNhdGlvbl90b2tlbnMnO1xuaW1wb3J0IHtcbiAgSXRlcmFibGVEaWZmZXJzLFxuICBkZWZhdWx0SXRlcmFibGVEaWZmZXJzLFxuICBLZXlWYWx1ZURpZmZlcnMsXG4gIGRlZmF1bHRLZXlWYWx1ZURpZmZlcnNcbn0gZnJvbSAnLi9jaGFuZ2VfZGV0ZWN0aW9uL2NoYW5nZV9kZXRlY3Rpb24nO1xuaW1wb3J0IHtSZXNvbHZlZE1ldGFkYXRhQ2FjaGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9yZXNvbHZlZF9tZXRhZGF0YV9jYWNoZSc7XG5pbXBvcnQge0FwcFZpZXdNYW5hZ2VyfSBmcm9tICcuL2xpbmtlci92aWV3X21hbmFnZXInO1xuaW1wb3J0IHtBcHBWaWV3TWFuYWdlcl99IGZyb20gXCIuL2xpbmtlci92aWV3X21hbmFnZXJcIjtcbmltcG9ydCB7Vmlld1Jlc29sdmVyfSBmcm9tICcuL2xpbmtlci92aWV3X3Jlc29sdmVyJztcbmltcG9ydCB7RGlyZWN0aXZlUmVzb2x2ZXJ9IGZyb20gJy4vbGlua2VyL2RpcmVjdGl2ZV9yZXNvbHZlcic7XG5pbXBvcnQge1BpcGVSZXNvbHZlcn0gZnJvbSAnLi9saW5rZXIvcGlwZV9yZXNvbHZlcic7XG5pbXBvcnQge0NvbXBpbGVyfSBmcm9tICcuL2xpbmtlci9jb21waWxlcic7XG5pbXBvcnQge0NvbXBpbGVyX30gZnJvbSBcIi4vbGlua2VyL2NvbXBpbGVyXCI7XG5pbXBvcnQge0R5bmFtaWNDb21wb25lbnRMb2FkZXJ9IGZyb20gJy4vbGlua2VyL2R5bmFtaWNfY29tcG9uZW50X2xvYWRlcic7XG5pbXBvcnQge0R5bmFtaWNDb21wb25lbnRMb2FkZXJffSBmcm9tIFwiLi9saW5rZXIvZHluYW1pY19jb21wb25lbnRfbG9hZGVyXCI7XG5cbi8qKlxuICogQSBkZWZhdWx0IHNldCBvZiBwcm92aWRlcnMgd2hpY2ggc2hvdWxkIGJlIGluY2x1ZGVkIGluIGFueSBBbmd1bGFyXG4gKiBhcHBsaWNhdGlvbiwgcmVnYXJkbGVzcyBvZiB0aGUgcGxhdGZvcm0gaXQgcnVucyBvbnRvLlxuICovXG5leHBvcnQgY29uc3QgQVBQTElDQVRJT05fQ09NTU9OX1BST1ZJREVSUzogQXJyYXk8VHlwZSB8IFByb3ZpZGVyIHwgYW55W10+ID0gQ09OU1RfRVhQUihbXG4gIG5ldyBQcm92aWRlcihDb21waWxlciwge3VzZUNsYXNzOiBDb21waWxlcl99KSxcbiAgQVBQX0lEX1JBTkRPTV9QUk9WSURFUixcbiAgUmVzb2x2ZWRNZXRhZGF0YUNhY2hlLFxuICBuZXcgUHJvdmlkZXIoQXBwVmlld01hbmFnZXIsIHt1c2VDbGFzczogQXBwVmlld01hbmFnZXJffSksXG4gIFZpZXdSZXNvbHZlcixcbiAgbmV3IFByb3ZpZGVyKEl0ZXJhYmxlRGlmZmVycywge3VzZVZhbHVlOiBkZWZhdWx0SXRlcmFibGVEaWZmZXJzfSksXG4gIG5ldyBQcm92aWRlcihLZXlWYWx1ZURpZmZlcnMsIHt1c2VWYWx1ZTogZGVmYXVsdEtleVZhbHVlRGlmZmVyc30pLFxuICBEaXJlY3RpdmVSZXNvbHZlcixcbiAgUGlwZVJlc29sdmVyLFxuICBuZXcgUHJvdmlkZXIoRHluYW1pY0NvbXBvbmVudExvYWRlciwge3VzZUNsYXNzOiBEeW5hbWljQ29tcG9uZW50TG9hZGVyX30pXG5dKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
