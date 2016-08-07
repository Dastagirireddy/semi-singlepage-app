System.register(['angular2/src/core/platform_directives_and_pipes', 'angular2/src/compiler/template_ast', 'angular2/src/compiler/template_parser', './config', './compile_metadata', './offline_compiler', './runtime_compiler', 'angular2/src/compiler/url_resolver', 'angular2/src/compiler/xhr', './view_resolver', './directive_resolver', './pipe_resolver', 'angular2/src/facade/lang', 'angular2/src/core/di', 'angular2/src/compiler/html_parser', 'angular2/src/compiler/directive_normalizer', 'angular2/src/compiler/runtime_metadata', 'angular2/src/compiler/style_compiler', 'angular2/src/compiler/view_compiler/view_compiler', 'angular2/src/core/linker/component_resolver', 'angular2/src/compiler/runtime_compiler', 'angular2/src/compiler/schema/element_schema_registry', 'angular2/src/compiler/schema/dom_element_schema_registry', './expression_parser/parser', './expression_parser/lexer'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, di_1, template_parser_1, html_parser_1, directive_normalizer_1, runtime_metadata_1, style_compiler_1, view_compiler_1, config_1, component_resolver_1, runtime_compiler_1, element_schema_registry_1, dom_element_schema_registry_1, url_resolver_1, parser_1, lexer_1, view_resolver_1, directive_resolver_1, pipe_resolver_1;
    var COMPILER_PROVIDERS;
    function _createCompilerConfig() {
        return new config_1.CompilerConfig(lang_1.assertionsEnabled(), false, true);
    }
    var exportedNames_1 = {
        'COMPILER_PROVIDERS': true,
        'PLATFORM_DIRECTIVES': true,
        'PLATFORM_PIPES': true,
        'TEMPLATE_TRANSFORMS': true,
        'CompilerConfig': true,
        'RenderTypes': true,
        'RuntimeCompiler': true,
        'ViewResolver': true,
        'DirectiveResolver': true,
        'PipeResolver': true
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
            function (config_2_1) {
                exports_1({
                    "CompilerConfig": config_2_1["CompilerConfig"],
                    "RenderTypes": config_2_1["RenderTypes"]
                });
                config_1 = config_2_1;
            },
            function (compile_metadata_1_1) {
                exportStar_1(compile_metadata_1_1);
            },
            function (offline_compiler_1_1) {
                exportStar_1(offline_compiler_1_1);
            },
            function (runtime_compiler_2_1) {
                exports_1({
                    "RuntimeCompiler": runtime_compiler_2_1["RuntimeCompiler"]
                });
            },
            function (url_resolver_2_1) {
                exportStar_1(url_resolver_2_1);
                url_resolver_1 = url_resolver_2_1;
            },
            function (xhr_1_1) {
                exportStar_1(xhr_1_1);
            },
            function (view_resolver_2_1) {
                exports_1({
                    "ViewResolver": view_resolver_2_1["ViewResolver"]
                });
                view_resolver_1 = view_resolver_2_1;
            },
            function (directive_resolver_2_1) {
                exports_1({
                    "DirectiveResolver": directive_resolver_2_1["DirectiveResolver"]
                });
                directive_resolver_1 = directive_resolver_2_1;
            },
            function (pipe_resolver_2_1) {
                exports_1({
                    "PipeResolver": pipe_resolver_2_1["PipeResolver"]
                });
                pipe_resolver_1 = pipe_resolver_2_1;
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
            function (directive_normalizer_1_1) {
                directive_normalizer_1 = directive_normalizer_1_1;
            },
            function (runtime_metadata_1_1) {
                runtime_metadata_1 = runtime_metadata_1_1;
            },
            function (style_compiler_1_1) {
                style_compiler_1 = style_compiler_1_1;
            },
            function (view_compiler_1_1) {
                view_compiler_1 = view_compiler_1_1;
            },
            function (component_resolver_1_1) {
                component_resolver_1 = component_resolver_1_1;
            },
            function (runtime_compiler_1_1) {
                runtime_compiler_1 = runtime_compiler_1_1;
            },
            function (element_schema_registry_1_1) {
                element_schema_registry_1 = element_schema_registry_1_1;
            },
            function (dom_element_schema_registry_1_1) {
                dom_element_schema_registry_1 = dom_element_schema_registry_1_1;
            },
            function (parser_1_1) {
                parser_1 = parser_1_1;
            },
            function (lexer_1_1) {
                lexer_1 = lexer_1_1;
            }],
        execute: function() {
            /**
             * A set of providers that provide `RuntimeCompiler` and its dependencies to use for
             * template compilation.
             */
            exports_1("COMPILER_PROVIDERS", COMPILER_PROVIDERS = lang_1.CONST_EXPR([
                lexer_1.Lexer,
                parser_1.Parser,
                html_parser_1.HtmlParser,
                template_parser_1.TemplateParser,
                directive_normalizer_1.DirectiveNormalizer,
                runtime_metadata_1.RuntimeMetadataResolver,
                url_resolver_1.DEFAULT_PACKAGE_URL_PROVIDER,
                style_compiler_1.StyleCompiler,
                view_compiler_1.ViewCompiler,
                new di_1.Provider(config_1.CompilerConfig, { useFactory: _createCompilerConfig, deps: [] }),
                runtime_compiler_1.RuntimeCompiler,
                new di_1.Provider(component_resolver_1.ComponentResolver, { useExisting: runtime_compiler_1.RuntimeCompiler }),
                dom_element_schema_registry_1.DomElementSchemaRegistry,
                new di_1.Provider(element_schema_registry_1.ElementSchemaRegistry, { useExisting: dom_element_schema_registry_1.DomElementSchemaRegistry }),
                url_resolver_1.UrlResolver,
                view_resolver_1.ViewResolver,
                directive_resolver_1.DirectiveResolver,
                pipe_resolver_1.PipeResolver
            ]));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9jb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBMENhLGtCQUFrQjtJQVIvQjtRQUNFLE1BQU0sQ0FBQyxJQUFJLHVCQUFjLENBQUMsd0JBQWlCLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBRUQ7OztlQUdHO1lBQ1UsZ0NBQUEsa0JBQWtCLEdBQW1DLGlCQUFVLENBQUM7Z0JBQzNFLGFBQUs7Z0JBQ0wsZUFBTTtnQkFDTix3QkFBVTtnQkFDVixnQ0FBYztnQkFDZCwwQ0FBbUI7Z0JBQ25CLDBDQUF1QjtnQkFDdkIsMkNBQTRCO2dCQUM1Qiw4QkFBYTtnQkFDYiw0QkFBWTtnQkFDWixJQUFJLGFBQVEsQ0FBQyx1QkFBYyxFQUFFLEVBQUMsVUFBVSxFQUFFLHFCQUFxQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUMsQ0FBQztnQkFDM0Usa0NBQWU7Z0JBQ2YsSUFBSSxhQUFRLENBQUMsc0NBQWlCLEVBQUUsRUFBQyxXQUFXLEVBQUUsa0NBQWUsRUFBQyxDQUFDO2dCQUMvRCxzREFBd0I7Z0JBQ3hCLElBQUksYUFBUSxDQUFDLCtDQUFxQixFQUFFLEVBQUMsV0FBVyxFQUFFLHNEQUF3QixFQUFDLENBQUM7Z0JBQzVFLDBCQUFXO2dCQUNYLDRCQUFZO2dCQUNaLHNDQUFpQjtnQkFDakIsNEJBQVk7YUFDYixDQUFDLENBQUEsQ0FBQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tcGlsZXIvY29tcGlsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQge1BMQVRGT1JNX0RJUkVDVElWRVMsIFBMQVRGT1JNX1BJUEVTfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9wbGF0Zm9ybV9kaXJlY3RpdmVzX2FuZF9waXBlcyc7XG5leHBvcnQgKiBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvdGVtcGxhdGVfYXN0JztcbmV4cG9ydCB7VEVNUExBVEVfVFJBTlNGT1JNU30gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3RlbXBsYXRlX3BhcnNlcic7XG5leHBvcnQge0NvbXBpbGVyQ29uZmlnLCBSZW5kZXJUeXBlc30gZnJvbSAnLi9jb25maWcnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21waWxlX21ldGFkYXRhJztcbmV4cG9ydCAqIGZyb20gJy4vb2ZmbGluZV9jb21waWxlcic7XG5leHBvcnQge1J1bnRpbWVDb21waWxlcn0gZnJvbSAnLi9ydW50aW1lX2NvbXBpbGVyJztcbmV4cG9ydCAqIGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci91cmxfcmVzb2x2ZXInO1xuZXhwb3J0ICogZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3hocic7XG5cbmV4cG9ydCB7Vmlld1Jlc29sdmVyfSBmcm9tICcuL3ZpZXdfcmVzb2x2ZXInO1xuZXhwb3J0IHtEaXJlY3RpdmVSZXNvbHZlcn0gZnJvbSAnLi9kaXJlY3RpdmVfcmVzb2x2ZXInO1xuZXhwb3J0IHtQaXBlUmVzb2x2ZXJ9IGZyb20gJy4vcGlwZV9yZXNvbHZlcic7XG5cbmltcG9ydCB7YXNzZXJ0aW9uc0VuYWJsZWQsIFR5cGUsIENPTlNUX0VYUFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge3Byb3ZpZGUsIFByb3ZpZGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge1RlbXBsYXRlUGFyc2VyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvdGVtcGxhdGVfcGFyc2VyJztcbmltcG9ydCB7SHRtbFBhcnNlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL2h0bWxfcGFyc2VyJztcbmltcG9ydCB7RGlyZWN0aXZlTm9ybWFsaXplcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL2RpcmVjdGl2ZV9ub3JtYWxpemVyJztcbmltcG9ydCB7UnVudGltZU1ldGFkYXRhUmVzb2x2ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9ydW50aW1lX21ldGFkYXRhJztcbmltcG9ydCB7U3R5bGVDb21waWxlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3N0eWxlX2NvbXBpbGVyJztcbmltcG9ydCB7Vmlld0NvbXBpbGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvdmlld19jb21waWxlci92aWV3X2NvbXBpbGVyJztcbmltcG9ydCB7Q29tcGlsZXJDb25maWd9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7Q29tcG9uZW50UmVzb2x2ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9jb21wb25lbnRfcmVzb2x2ZXInO1xuaW1wb3J0IHtSdW50aW1lQ29tcGlsZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9ydW50aW1lX2NvbXBpbGVyJztcbmltcG9ydCB7RWxlbWVudFNjaGVtYVJlZ2lzdHJ5fSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvc2NoZW1hL2VsZW1lbnRfc2NoZW1hX3JlZ2lzdHJ5JztcbmltcG9ydCB7RG9tRWxlbWVudFNjaGVtYVJlZ2lzdHJ5fSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvc2NoZW1hL2RvbV9lbGVtZW50X3NjaGVtYV9yZWdpc3RyeSc7XG5pbXBvcnQge1VybFJlc29sdmVyLCBERUZBVUxUX1BBQ0tBR0VfVVJMX1BST1ZJREVSfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvdXJsX3Jlc29sdmVyJztcbmltcG9ydCB7UGFyc2VyfSBmcm9tICcuL2V4cHJlc3Npb25fcGFyc2VyL3BhcnNlcic7XG5pbXBvcnQge0xleGVyfSBmcm9tICcuL2V4cHJlc3Npb25fcGFyc2VyL2xleGVyJztcbmltcG9ydCB7Vmlld1Jlc29sdmVyfSBmcm9tICcuL3ZpZXdfcmVzb2x2ZXInO1xuaW1wb3J0IHtEaXJlY3RpdmVSZXNvbHZlcn0gZnJvbSAnLi9kaXJlY3RpdmVfcmVzb2x2ZXInO1xuaW1wb3J0IHtQaXBlUmVzb2x2ZXJ9IGZyb20gJy4vcGlwZV9yZXNvbHZlcic7XG5cbmZ1bmN0aW9uIF9jcmVhdGVDb21waWxlckNvbmZpZygpIHtcbiAgcmV0dXJuIG5ldyBDb21waWxlckNvbmZpZyhhc3NlcnRpb25zRW5hYmxlZCgpLCBmYWxzZSwgdHJ1ZSk7XG59XG5cbi8qKlxuICogQSBzZXQgb2YgcHJvdmlkZXJzIHRoYXQgcHJvdmlkZSBgUnVudGltZUNvbXBpbGVyYCBhbmQgaXRzIGRlcGVuZGVuY2llcyB0byB1c2UgZm9yXG4gKiB0ZW1wbGF0ZSBjb21waWxhdGlvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IENPTVBJTEVSX1BST1ZJREVSUzogQXJyYXk8VHlwZSB8IFByb3ZpZGVyIHwgYW55W10+ID0gQ09OU1RfRVhQUihbXG4gIExleGVyLFxuICBQYXJzZXIsXG4gIEh0bWxQYXJzZXIsXG4gIFRlbXBsYXRlUGFyc2VyLFxuICBEaXJlY3RpdmVOb3JtYWxpemVyLFxuICBSdW50aW1lTWV0YWRhdGFSZXNvbHZlcixcbiAgREVGQVVMVF9QQUNLQUdFX1VSTF9QUk9WSURFUixcbiAgU3R5bGVDb21waWxlcixcbiAgVmlld0NvbXBpbGVyLFxuICBuZXcgUHJvdmlkZXIoQ29tcGlsZXJDb25maWcsIHt1c2VGYWN0b3J5OiBfY3JlYXRlQ29tcGlsZXJDb25maWcsIGRlcHM6IFtdfSksXG4gIFJ1bnRpbWVDb21waWxlcixcbiAgbmV3IFByb3ZpZGVyKENvbXBvbmVudFJlc29sdmVyLCB7dXNlRXhpc3Rpbmc6IFJ1bnRpbWVDb21waWxlcn0pLFxuICBEb21FbGVtZW50U2NoZW1hUmVnaXN0cnksXG4gIG5ldyBQcm92aWRlcihFbGVtZW50U2NoZW1hUmVnaXN0cnksIHt1c2VFeGlzdGluZzogRG9tRWxlbWVudFNjaGVtYVJlZ2lzdHJ5fSksXG4gIFVybFJlc29sdmVyLFxuICBWaWV3UmVzb2x2ZXIsXG4gIERpcmVjdGl2ZVJlc29sdmVyLFxuICBQaXBlUmVzb2x2ZXJcbl0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
