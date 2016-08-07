System.register(["./runtime_compiler", './template_compiler', './directive_metadata', './source_module', 'angular2/src/core/platform_directives_and_pipes', 'angular2/src/compiler/template_ast', 'angular2/src/compiler/template_parser', 'angular2/src/facade/lang', 'angular2/src/core/di', 'angular2/src/compiler/html_parser', 'angular2/src/compiler/template_normalizer', 'angular2/src/compiler/runtime_metadata', 'angular2/src/compiler/change_detector_compiler', 'angular2/src/compiler/style_compiler', 'angular2/src/compiler/view_compiler', 'angular2/src/compiler/proto_view_compiler', 'angular2/src/compiler/template_compiler', 'angular2/src/core/change_detection/change_detection', 'angular2/src/core/linker/compiler', 'angular2/src/compiler/runtime_compiler', 'angular2/src/compiler/schema/element_schema_registry', 'angular2/src/compiler/schema/dom_element_schema_registry', 'angular2/src/compiler/url_resolver'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var runtime_compiler_1, lang_1, di_1, template_parser_1, html_parser_1, template_normalizer_1, runtime_metadata_1, change_detector_compiler_1, style_compiler_1, view_compiler_1, proto_view_compiler_1, template_compiler_1, change_detection_1, compiler_1, runtime_compiler_2, element_schema_registry_1, dom_element_schema_registry_1, url_resolver_1, change_detection_2;
    var COMPILER_PROVIDERS;
    function _createChangeDetectorGenConfig() {
        return new change_detection_1.ChangeDetectorGenConfig(lang_1.assertionsEnabled(), false, true);
    }
    var exportedNames_1 = {
        'COMPILER_PROVIDERS': true,
        'TemplateCompiler': true,
        'CompileDirectiveMetadata': true,
        'CompileTypeMetadata': true,
        'CompileTemplateMetadata': true,
        'SourceModule': true,
        'SourceWithImports': true,
        'PLATFORM_DIRECTIVES': true,
        'PLATFORM_PIPES': true,
        'TEMPLATE_TRANSFORMS': true
    };
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (runtime_compiler_1_1) {
                runtime_compiler_1 = runtime_compiler_1_1;
            },
            function (template_compiler_2_1) {
                exports_1({
                    "TemplateCompiler": template_compiler_2_1["TemplateCompiler"]
                });
            },
            function (directive_metadata_1_1) {
                exports_1({
                    "CompileDirectiveMetadata": directive_metadata_1_1["CompileDirectiveMetadata"],
                    "CompileTypeMetadata": directive_metadata_1_1["CompileTypeMetadata"],
                    "CompileTemplateMetadata": directive_metadata_1_1["CompileTemplateMetadata"]
                });
            },
            function (source_module_1_1) {
                exports_1({
                    "SourceModule": source_module_1_1["SourceModule"],
                    "SourceWithImports": source_module_1_1["SourceWithImports"]
                });
            },
            function (platform_directives_and_pipes_1_1) {
                exports_1({
                    "PLATFORM_DIRECTIVES": platform_directives_and_pipes_1_1["PLATFORM_DIRECTIVES"],
                    "PLATFORM_PIPES": platform_directives_and_pipes_1_1["PLATFORM_PIPES"]
                });
            },
            function (template_ast_1_1) {
                exportStar_1(template_ast_1_1);
            },
            function (template_parser_2_1) {
                exports_1({
                    "TEMPLATE_TRANSFORMS": template_parser_2_1["TEMPLATE_TRANSFORMS"]
                });
                template_parser_1 = template_parser_2_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (html_parser_1_1) {
                html_parser_1 = html_parser_1_1;
            },
            function (template_normalizer_1_1) {
                template_normalizer_1 = template_normalizer_1_1;
            },
            function (runtime_metadata_1_1) {
                runtime_metadata_1 = runtime_metadata_1_1;
            },
            function (change_detector_compiler_1_1) {
                change_detector_compiler_1 = change_detector_compiler_1_1;
            },
            function (style_compiler_1_1) {
                style_compiler_1 = style_compiler_1_1;
            },
            function (view_compiler_1_1) {
                view_compiler_1 = view_compiler_1_1;
            },
            function (proto_view_compiler_1_1) {
                proto_view_compiler_1 = proto_view_compiler_1_1;
            },
            function (template_compiler_1_1) {
                template_compiler_1 = template_compiler_1_1;
            },
            function (change_detection_1_1) {
                change_detection_1 = change_detection_1_1;
                change_detection_2 = change_detection_1_1;
            },
            function (compiler_1_1) {
                compiler_1 = compiler_1_1;
            },
            function (runtime_compiler_2_1) {
                runtime_compiler_2 = runtime_compiler_2_1;
            },
            function (element_schema_registry_1_1) {
                element_schema_registry_1 = element_schema_registry_1_1;
            },
            function (dom_element_schema_registry_1_1) {
                dom_element_schema_registry_1 = dom_element_schema_registry_1_1;
            },
            function (url_resolver_1_1) {
                url_resolver_1 = url_resolver_1_1;
            }],
        execute: function() {
            /**
             * A set of providers that provide `RuntimeCompiler` and its dependencies to use for
             * template compilation.
             */
            exports_1("COMPILER_PROVIDERS", COMPILER_PROVIDERS = lang_1.CONST_EXPR([
                change_detection_2.Lexer,
                change_detection_2.Parser,
                html_parser_1.HtmlParser,
                template_parser_1.TemplateParser,
                template_normalizer_1.TemplateNormalizer,
                runtime_metadata_1.RuntimeMetadataResolver,
                url_resolver_1.DEFAULT_PACKAGE_URL_PROVIDER,
                style_compiler_1.StyleCompiler,
                proto_view_compiler_1.ProtoViewCompiler,
                view_compiler_1.ViewCompiler,
                change_detector_compiler_1.ChangeDetectionCompiler,
                new di_1.Provider(change_detection_1.ChangeDetectorGenConfig, { useFactory: _createChangeDetectorGenConfig, deps: [] }),
                template_compiler_1.TemplateCompiler,
                new di_1.Provider(runtime_compiler_2.RuntimeCompiler, { useClass: runtime_compiler_1.RuntimeCompiler_ }),
                new di_1.Provider(compiler_1.Compiler, { useExisting: runtime_compiler_2.RuntimeCompiler }),
                dom_element_schema_registry_1.DomElementSchemaRegistry,
                new di_1.Provider(element_schema_registry_1.ElementSchemaRegistry, { useExisting: dom_element_schema_registry_1.DomElementSchemaRegistry }),
                url_resolver_1.UrlResolver
            ]));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL2NvbXBpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFzQ2Esa0JBQWtCO0lBUi9CO1FBQ0UsTUFBTSxDQUFDLElBQUksMENBQXVCLENBQUMsd0JBQWlCLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdkUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBRUQ7OztlQUdHO1lBQ1UsZ0NBQUEsa0JBQWtCLEdBQW1DLGlCQUFVLENBQUM7Z0JBQzNFLHdCQUFLO2dCQUNMLHlCQUFNO2dCQUNOLHdCQUFVO2dCQUNWLGdDQUFjO2dCQUNkLHdDQUFrQjtnQkFDbEIsMENBQXVCO2dCQUN2QiwyQ0FBNEI7Z0JBQzVCLDhCQUFhO2dCQUNiLHVDQUFpQjtnQkFDakIsNEJBQVk7Z0JBQ1osa0RBQXVCO2dCQUN2QixJQUFJLGFBQVEsQ0FBQywwQ0FBdUIsRUFBRSxFQUFDLFVBQVUsRUFBRSw4QkFBOEIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDLENBQUM7Z0JBQzdGLG9DQUFnQjtnQkFDaEIsSUFBSSxhQUFRLENBQUMsa0NBQWUsRUFBRSxFQUFDLFFBQVEsRUFBRSxtQ0FBZ0IsRUFBQyxDQUFDO2dCQUMzRCxJQUFJLGFBQVEsQ0FBQyxtQkFBUSxFQUFFLEVBQUMsV0FBVyxFQUFFLGtDQUFlLEVBQUMsQ0FBQztnQkFDdEQsc0RBQXdCO2dCQUN4QixJQUFJLGFBQVEsQ0FBQywrQ0FBcUIsRUFBRSxFQUFDLFdBQVcsRUFBRSxzREFBd0IsRUFBQyxDQUFDO2dCQUM1RSwwQkFBVzthQUNaLENBQUMsQ0FBQSxDQUFDIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL2NvbXBpbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSdW50aW1lQ29tcGlsZXJffSBmcm9tIFwiLi9ydW50aW1lX2NvbXBpbGVyXCI7XG5leHBvcnQge1RlbXBsYXRlQ29tcGlsZXJ9IGZyb20gJy4vdGVtcGxhdGVfY29tcGlsZXInO1xuZXhwb3J0IHtcbiAgQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLFxuICBDb21waWxlVHlwZU1ldGFkYXRhLFxuICBDb21waWxlVGVtcGxhdGVNZXRhZGF0YVxufSBmcm9tICcuL2RpcmVjdGl2ZV9tZXRhZGF0YSc7XG5leHBvcnQge1NvdXJjZU1vZHVsZSwgU291cmNlV2l0aEltcG9ydHN9IGZyb20gJy4vc291cmNlX21vZHVsZSc7XG5leHBvcnQge1BMQVRGT1JNX0RJUkVDVElWRVMsIFBMQVRGT1JNX1BJUEVTfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9wbGF0Zm9ybV9kaXJlY3RpdmVzX2FuZF9waXBlcyc7XG5leHBvcnQgKiBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvdGVtcGxhdGVfYXN0JztcbmV4cG9ydCB7VEVNUExBVEVfVFJBTlNGT1JNU30gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3RlbXBsYXRlX3BhcnNlcic7XG5pbXBvcnQge2Fzc2VydGlvbnNFbmFibGVkLCBUeXBlLCBDT05TVF9FWFBSfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtwcm92aWRlLCBQcm92aWRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtUZW1wbGF0ZVBhcnNlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3RlbXBsYXRlX3BhcnNlcic7XG5pbXBvcnQge0h0bWxQYXJzZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9odG1sX3BhcnNlcic7XG5pbXBvcnQge1RlbXBsYXRlTm9ybWFsaXplcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3RlbXBsYXRlX25vcm1hbGl6ZXInO1xuaW1wb3J0IHtSdW50aW1lTWV0YWRhdGFSZXNvbHZlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3J1bnRpbWVfbWV0YWRhdGEnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25Db21waWxlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL2NoYW5nZV9kZXRlY3Rvcl9jb21waWxlcic7XG5pbXBvcnQge1N0eWxlQ29tcGlsZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9zdHlsZV9jb21waWxlcic7XG5pbXBvcnQge1ZpZXdDb21waWxlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3ZpZXdfY29tcGlsZXInO1xuaW1wb3J0IHtQcm90b1ZpZXdDb21waWxlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3Byb3RvX3ZpZXdfY29tcGlsZXInO1xuaW1wb3J0IHtUZW1wbGF0ZUNvbXBpbGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvdGVtcGxhdGVfY29tcGlsZXInO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvckdlbkNvbmZpZ30gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0aW9uJztcbmltcG9ydCB7Q29tcGlsZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9jb21waWxlcic7XG5pbXBvcnQge1J1bnRpbWVDb21waWxlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3J1bnRpbWVfY29tcGlsZXInO1xuaW1wb3J0IHtFbGVtZW50U2NoZW1hUmVnaXN0cnl9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9zY2hlbWEvZWxlbWVudF9zY2hlbWFfcmVnaXN0cnknO1xuaW1wb3J0IHtEb21FbGVtZW50U2NoZW1hUmVnaXN0cnl9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9zY2hlbWEvZG9tX2VsZW1lbnRfc2NoZW1hX3JlZ2lzdHJ5JztcbmltcG9ydCB7VXJsUmVzb2x2ZXIsIERFRkFVTFRfUEFDS0FHRV9VUkxfUFJPVklERVJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci91cmxfcmVzb2x2ZXInO1xuaW1wb3J0IHtQYXJzZXIsIExleGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2NoYW5nZV9kZXRlY3Rpb24nO1xuXG5mdW5jdGlvbiBfY3JlYXRlQ2hhbmdlRGV0ZWN0b3JHZW5Db25maWcoKSB7XG4gIHJldHVybiBuZXcgQ2hhbmdlRGV0ZWN0b3JHZW5Db25maWcoYXNzZXJ0aW9uc0VuYWJsZWQoKSwgZmFsc2UsIHRydWUpO1xufVxuXG4vKipcbiAqIEEgc2V0IG9mIHByb3ZpZGVycyB0aGF0IHByb3ZpZGUgYFJ1bnRpbWVDb21waWxlcmAgYW5kIGl0cyBkZXBlbmRlbmNpZXMgdG8gdXNlIGZvclxuICogdGVtcGxhdGUgY29tcGlsYXRpb24uXG4gKi9cbmV4cG9ydCBjb25zdCBDT01QSUxFUl9QUk9WSURFUlM6IEFycmF5PFR5cGUgfCBQcm92aWRlciB8IGFueVtdPiA9IENPTlNUX0VYUFIoW1xuICBMZXhlcixcbiAgUGFyc2VyLFxuICBIdG1sUGFyc2VyLFxuICBUZW1wbGF0ZVBhcnNlcixcbiAgVGVtcGxhdGVOb3JtYWxpemVyLFxuICBSdW50aW1lTWV0YWRhdGFSZXNvbHZlcixcbiAgREVGQVVMVF9QQUNLQUdFX1VSTF9QUk9WSURFUixcbiAgU3R5bGVDb21waWxlcixcbiAgUHJvdG9WaWV3Q29tcGlsZXIsXG4gIFZpZXdDb21waWxlcixcbiAgQ2hhbmdlRGV0ZWN0aW9uQ29tcGlsZXIsXG4gIG5ldyBQcm92aWRlcihDaGFuZ2VEZXRlY3RvckdlbkNvbmZpZywge3VzZUZhY3Rvcnk6IF9jcmVhdGVDaGFuZ2VEZXRlY3RvckdlbkNvbmZpZywgZGVwczogW119KSxcbiAgVGVtcGxhdGVDb21waWxlcixcbiAgbmV3IFByb3ZpZGVyKFJ1bnRpbWVDb21waWxlciwge3VzZUNsYXNzOiBSdW50aW1lQ29tcGlsZXJffSksXG4gIG5ldyBQcm92aWRlcihDb21waWxlciwge3VzZUV4aXN0aW5nOiBSdW50aW1lQ29tcGlsZXJ9KSxcbiAgRG9tRWxlbWVudFNjaGVtYVJlZ2lzdHJ5LFxuICBuZXcgUHJvdmlkZXIoRWxlbWVudFNjaGVtYVJlZ2lzdHJ5LCB7dXNlRXhpc3Rpbmc6IERvbUVsZW1lbnRTY2hlbWFSZWdpc3RyeX0pLFxuICBVcmxSZXNvbHZlclxuXSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
