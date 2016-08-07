System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/collection', 'angular2/src/facade/async', './compile_metadata', 'angular2/src/core/di', './style_compiler', './view_compiler/view_compiler', './template_parser', './directive_normalizer', './runtime_metadata', 'angular2/src/core/linker/component_factory', './config', './output/output_ast', './output/output_jit', './output/output_interpreter', './output/interpretive_view', 'angular2/src/compiler/xhr'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var lang_1, exceptions_1, collection_1, async_1, compile_metadata_1, di_1, style_compiler_1, view_compiler_1, template_parser_1, directive_normalizer_1, runtime_metadata_1, component_factory_1, config_1, ir, output_jit_1, output_interpreter_1, interpretive_view_1, xhr_1;
    var RuntimeCompiler, CompiledTemplate;
    function assertComponent(meta) {
        if (!meta.isComponent) {
            throw new exceptions_1.BaseException("Could not compile '" + meta.type.name + "' because it is not a component.");
        }
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (compile_metadata_1_1) {
                compile_metadata_1 = compile_metadata_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (style_compiler_1_1) {
                style_compiler_1 = style_compiler_1_1;
            },
            function (view_compiler_1_1) {
                view_compiler_1 = view_compiler_1_1;
            },
            function (template_parser_1_1) {
                template_parser_1 = template_parser_1_1;
            },
            function (directive_normalizer_1_1) {
                directive_normalizer_1 = directive_normalizer_1_1;
            },
            function (runtime_metadata_1_1) {
                runtime_metadata_1 = runtime_metadata_1_1;
            },
            function (component_factory_1_1) {
                component_factory_1 = component_factory_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (ir_1) {
                ir = ir_1;
            },
            function (output_jit_1_1) {
                output_jit_1 = output_jit_1_1;
            },
            function (output_interpreter_1_1) {
                output_interpreter_1 = output_interpreter_1_1;
            },
            function (interpretive_view_1_1) {
                interpretive_view_1 = interpretive_view_1_1;
            },
            function (xhr_1_1) {
                xhr_1 = xhr_1_1;
            }],
        execute: function() {
            /**
             * An internal module of the Angular compiler that begins with component types,
             * extracts templates, and eventually produces a compiled version of the component
             * ready for linking into an application.
             */
            RuntimeCompiler = (function () {
                function RuntimeCompiler(_runtimeMetadataResolver, _templateNormalizer, _templateParser, _styleCompiler, _viewCompiler, _xhr, _genConfig) {
                    this._runtimeMetadataResolver = _runtimeMetadataResolver;
                    this._templateNormalizer = _templateNormalizer;
                    this._templateParser = _templateParser;
                    this._styleCompiler = _styleCompiler;
                    this._viewCompiler = _viewCompiler;
                    this._xhr = _xhr;
                    this._genConfig = _genConfig;
                    this._styleCache = new Map();
                    this._hostCacheKeys = new Map();
                    this._compiledTemplateCache = new Map();
                    this._compiledTemplateDone = new Map();
                }
                RuntimeCompiler.prototype.resolveComponent = function (componentType) {
                    var compMeta = this._runtimeMetadataResolver.getDirectiveMetadata(componentType);
                    var hostCacheKey = this._hostCacheKeys.get(componentType);
                    if (lang_1.isBlank(hostCacheKey)) {
                        hostCacheKey = new Object();
                        this._hostCacheKeys.set(componentType, hostCacheKey);
                        assertComponent(compMeta);
                        var hostMeta = compile_metadata_1.createHostComponentMeta(compMeta.type, compMeta.selector);
                        this._loadAndCompileComponent(hostCacheKey, hostMeta, [compMeta], [], []);
                    }
                    return this._compiledTemplateDone.get(hostCacheKey)
                        .then(function (compiledTemplate) { return new component_factory_1.ComponentFactory(compMeta.selector, compiledTemplate.viewFactory, componentType); });
                };
                RuntimeCompiler.prototype.clearCache = function () {
                    this._styleCache.clear();
                    this._compiledTemplateCache.clear();
                    this._compiledTemplateDone.clear();
                    this._hostCacheKeys.clear();
                };
                RuntimeCompiler.prototype._loadAndCompileComponent = function (cacheKey, compMeta, viewDirectives, pipes, compilingComponentsPath) {
                    var _this = this;
                    var compiledTemplate = this._compiledTemplateCache.get(cacheKey);
                    var done = this._compiledTemplateDone.get(cacheKey);
                    if (lang_1.isBlank(compiledTemplate)) {
                        compiledTemplate = new CompiledTemplate();
                        this._compiledTemplateCache.set(cacheKey, compiledTemplate);
                        done =
                            async_1.PromiseWrapper.all([this._compileComponentStyles(compMeta)].concat(viewDirectives.map(function (dirMeta) { return _this._templateNormalizer.normalizeDirective(dirMeta); })))
                                .then(function (stylesAndNormalizedViewDirMetas) {
                                var normalizedViewDirMetas = stylesAndNormalizedViewDirMetas.slice(1);
                                var styles = stylesAndNormalizedViewDirMetas[0];
                                var parsedTemplate = _this._templateParser.parse(compMeta, compMeta.template.template, normalizedViewDirMetas, pipes, compMeta.type.name);
                                var childPromises = [];
                                compiledTemplate.init(_this._compileComponent(compMeta, parsedTemplate, styles, pipes, compilingComponentsPath, childPromises));
                                return async_1.PromiseWrapper.all(childPromises).then(function (_) { return compiledTemplate; });
                            });
                        this._compiledTemplateDone.set(cacheKey, done);
                    }
                    return compiledTemplate;
                };
                RuntimeCompiler.prototype._compileComponent = function (compMeta, parsedTemplate, styles, pipes, compilingComponentsPath, childPromises) {
                    var _this = this;
                    var compileResult = this._viewCompiler.compileComponent(compMeta, parsedTemplate, new ir.ExternalExpr(new compile_metadata_1.CompileIdentifierMetadata({ runtime: styles })), pipes);
                    compileResult.dependencies.forEach(function (dep) {
                        var childCompilingComponentsPath = collection_1.ListWrapper.clone(compilingComponentsPath);
                        var childCacheKey = dep.comp.type.runtime;
                        var childViewDirectives = _this._runtimeMetadataResolver.getViewDirectivesMetadata(dep.comp.type.runtime);
                        var childViewPipes = _this._runtimeMetadataResolver.getViewPipesMetadata(dep.comp.type.runtime);
                        var childIsRecursive = collection_1.ListWrapper.contains(childCompilingComponentsPath, childCacheKey);
                        childCompilingComponentsPath.push(childCacheKey);
                        var childComp = _this._loadAndCompileComponent(dep.comp.type.runtime, dep.comp, childViewDirectives, childViewPipes, childCompilingComponentsPath);
                        dep.factoryPlaceholder.runtime = childComp.proxyViewFactory;
                        dep.factoryPlaceholder.name = "viewFactory_" + dep.comp.type.name;
                        if (!childIsRecursive) {
                            // Only wait for a child if it is not a cycle
                            childPromises.push(_this._compiledTemplateDone.get(childCacheKey));
                        }
                    });
                    var factory;
                    if (lang_1.IS_DART || !this._genConfig.useJit) {
                        factory = output_interpreter_1.interpretStatements(compileResult.statements, compileResult.viewFactoryVar, new interpretive_view_1.InterpretiveAppViewInstanceFactory());
                    }
                    else {
                        factory = output_jit_1.jitStatements(compMeta.type.name + ".template.js", compileResult.statements, compileResult.viewFactoryVar);
                    }
                    return factory;
                };
                RuntimeCompiler.prototype._compileComponentStyles = function (compMeta) {
                    var compileResult = this._styleCompiler.compileComponent(compMeta);
                    return this._resolveStylesCompileResult(compMeta.type.name, compileResult);
                };
                RuntimeCompiler.prototype._resolveStylesCompileResult = function (sourceUrl, result) {
                    var _this = this;
                    var promises = result.dependencies.map(function (dep) { return _this._loadStylesheetDep(dep); });
                    return async_1.PromiseWrapper.all(promises)
                        .then(function (cssTexts) {
                        var nestedCompileResultPromises = [];
                        for (var i = 0; i < result.dependencies.length; i++) {
                            var dep = result.dependencies[i];
                            var cssText = cssTexts[i];
                            var nestedCompileResult = _this._styleCompiler.compileStylesheet(dep.sourceUrl, cssText, dep.isShimmed);
                            nestedCompileResultPromises.push(_this._resolveStylesCompileResult(dep.sourceUrl, nestedCompileResult));
                        }
                        return async_1.PromiseWrapper.all(nestedCompileResultPromises);
                    })
                        .then(function (nestedStylesArr) {
                        for (var i = 0; i < result.dependencies.length; i++) {
                            var dep = result.dependencies[i];
                            dep.valuePlaceholder.runtime = nestedStylesArr[i];
                            dep.valuePlaceholder.name = "importedStyles" + i;
                        }
                        if (lang_1.IS_DART || !_this._genConfig.useJit) {
                            return output_interpreter_1.interpretStatements(result.statements, result.stylesVar, new interpretive_view_1.InterpretiveAppViewInstanceFactory());
                        }
                        else {
                            return output_jit_1.jitStatements(sourceUrl + ".css.js", result.statements, result.stylesVar);
                        }
                    });
                };
                RuntimeCompiler.prototype._loadStylesheetDep = function (dep) {
                    var cacheKey = "" + dep.sourceUrl + (dep.isShimmed ? '.shim' : '');
                    var cssTextPromise = this._styleCache.get(cacheKey);
                    if (lang_1.isBlank(cssTextPromise)) {
                        cssTextPromise = this._xhr.get(dep.sourceUrl);
                        this._styleCache.set(cacheKey, cssTextPromise);
                    }
                    return cssTextPromise;
                };
                RuntimeCompiler = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [runtime_metadata_1.RuntimeMetadataResolver, directive_normalizer_1.DirectiveNormalizer, template_parser_1.TemplateParser, style_compiler_1.StyleCompiler, view_compiler_1.ViewCompiler, xhr_1.XHR, config_1.CompilerConfig])
                ], RuntimeCompiler);
                return RuntimeCompiler;
            }());
            exports_1("RuntimeCompiler", RuntimeCompiler);
            CompiledTemplate = (function () {
                function CompiledTemplate() {
                    var _this = this;
                    this.viewFactory = null;
                    this.proxyViewFactory = function (viewUtils, childInjector, contextEl) {
                        return _this.viewFactory(viewUtils, childInjector, contextEl);
                    };
                }
                CompiledTemplate.prototype.init = function (viewFactory) { this.viewFactory = viewFactory; };
                return CompiledTemplate;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9ydW50aW1lX2NvbXBpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBeU9BLHlCQUF5QixJQUE4QjtRQUNyRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLE1BQU0sSUFBSSwwQkFBYSxDQUFDLHdCQUFzQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUkscUNBQWtDLENBQUMsQ0FBQztRQUNsRyxDQUFDO0lBQ0gsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQWhMRDs7OztlQUlHO1lBRUg7Z0JBTUUseUJBQW9CLHdCQUFpRCxFQUNqRCxtQkFBd0MsRUFDeEMsZUFBK0IsRUFBVSxjQUE2QixFQUN0RSxhQUEyQixFQUFVLElBQVMsRUFDOUMsVUFBMEI7b0JBSjFCLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBeUI7b0JBQ2pELHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7b0JBQ3hDLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtvQkFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtvQkFDdEUsa0JBQWEsR0FBYixhQUFhLENBQWM7b0JBQVUsU0FBSSxHQUFKLElBQUksQ0FBSztvQkFDOUMsZUFBVSxHQUFWLFVBQVUsQ0FBZ0I7b0JBVHRDLGdCQUFXLEdBQWlDLElBQUksR0FBRyxFQUEyQixDQUFDO29CQUMvRSxtQkFBYyxHQUFHLElBQUksR0FBRyxFQUFhLENBQUM7b0JBQ3RDLDJCQUFzQixHQUFHLElBQUksR0FBRyxFQUF5QixDQUFDO29CQUMxRCwwQkFBcUIsR0FBRyxJQUFJLEdBQUcsRUFBa0MsQ0FBQztnQkFNekIsQ0FBQztnQkFFbEQsMENBQWdCLEdBQWhCLFVBQWlCLGFBQW1CO29CQUNsQyxJQUFJLFFBQVEsR0FDUixJQUFJLENBQUMs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YW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL3J1bnRpbWVfY29tcGlsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBJU19EQVJULFxuICBUeXBlLFxuICBKc29uLFxuICBpc0JsYW5rLFxuICBpc1ByZXNlbnQsXG4gIHN0cmluZ2lmeSxcbiAgZXZhbEV4cHJlc3Npb25cbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7XG4gIExpc3RXcmFwcGVyLFxuICBTZXRXcmFwcGVyLFxuICBNYXBXcmFwcGVyLFxuICBTdHJpbmdNYXBXcmFwcGVyXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge1Byb21pc2VXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jJztcbmltcG9ydCB7XG4gIGNyZWF0ZUhvc3RDb21wb25lbnRNZXRhLFxuICBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsXG4gIENvbXBpbGVUeXBlTWV0YWRhdGEsXG4gIENvbXBpbGVUZW1wbGF0ZU1ldGFkYXRhLFxuICBDb21waWxlUGlwZU1ldGFkYXRhLFxuICBDb21waWxlTWV0YWRhdGFXaXRoVHlwZSxcbiAgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YVxufSBmcm9tICcuL2NvbXBpbGVfbWV0YWRhdGEnO1xuaW1wb3J0IHtcbiAgVGVtcGxhdGVBc3QsXG4gIFRlbXBsYXRlQXN0VmlzaXRvcixcbiAgTmdDb250ZW50QXN0LFxuICBFbWJlZGRlZFRlbXBsYXRlQXN0LFxuICBFbGVtZW50QXN0LFxuICBCb3VuZEV2ZW50QXN0LFxuICBCb3VuZEVsZW1lbnRQcm9wZXJ0eUFzdCxcbiAgQXR0ckFzdCxcbiAgQm91bmRUZXh0QXN0LFxuICBUZXh0QXN0LFxuICBEaXJlY3RpdmVBc3QsXG4gIEJvdW5kRGlyZWN0aXZlUHJvcGVydHlBc3QsXG4gIHRlbXBsYXRlVmlzaXRBbGxcbn0gZnJvbSAnLi90ZW1wbGF0ZV9hc3QnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge1N0eWxlQ29tcGlsZXIsIFN0eWxlc0NvbXBpbGVEZXBlbmRlbmN5LCBTdHlsZXNDb21waWxlUmVzdWx0fSBmcm9tICcuL3N0eWxlX2NvbXBpbGVyJztcbmltcG9ydCB7Vmlld0NvbXBpbGVyfSBmcm9tICcuL3ZpZXdfY29tcGlsZXIvdmlld19jb21waWxlcic7XG5pbXBvcnQge1RlbXBsYXRlUGFyc2VyfSBmcm9tICcuL3RlbXBsYXRlX3BhcnNlcic7XG5pbXBvcnQge0RpcmVjdGl2ZU5vcm1hbGl6ZXJ9IGZyb20gJy4vZGlyZWN0aXZlX25vcm1hbGl6ZXInO1xuaW1wb3J0IHtSdW50aW1lTWV0YWRhdGFSZXNvbHZlcn0gZnJvbSAnLi9ydW50aW1lX21ldGFkYXRhJztcbmltcG9ydCB7Q29tcG9uZW50RmFjdG9yeX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL2NvbXBvbmVudF9mYWN0b3J5JztcbmltcG9ydCB7XG4gIENvbXBvbmVudFJlc29sdmVyLFxuICBSZWZsZWN0b3JDb21wb25lbnRSZXNvbHZlclxufSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvY29tcG9uZW50X3Jlc29sdmVyJztcblxuaW1wb3J0IHtDb21waWxlckNvbmZpZ30gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0ICogYXMgaXIgZnJvbSAnLi9vdXRwdXQvb3V0cHV0X2FzdCc7XG5pbXBvcnQge2ppdFN0YXRlbWVudHN9IGZyb20gJy4vb3V0cHV0L291dHB1dF9qaXQnO1xuaW1wb3J0IHtpbnRlcnByZXRTdGF0ZW1lbnRzfSBmcm9tICcuL291dHB1dC9vdXRwdXRfaW50ZXJwcmV0ZXInO1xuaW1wb3J0IHtJbnRlcnByZXRpdmVBcHBWaWV3SW5zdGFuY2VGYWN0b3J5fSBmcm9tICcuL291dHB1dC9pbnRlcnByZXRpdmVfdmlldyc7XG5cbmltcG9ydCB7WEhSfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIveGhyJztcblxuLyoqXG4gKiBBbiBpbnRlcm5hbCBtb2R1bGUgb2YgdGhlIEFuZ3VsYXIgY29tcGlsZXIgdGhhdCBiZWdpbnMgd2l0aCBjb21wb25lbnQgdHlwZXMsXG4gKiBleHRyYWN0cyB0ZW1wbGF0ZXMsIGFuZCBldmVudHVhbGx5IHByb2R1Y2VzIGEgY29tcGlsZWQgdmVyc2lvbiBvZiB0aGUgY29tcG9uZW50XG4gKiByZWFkeSBmb3IgbGlua2luZyBpbnRvIGFuIGFwcGxpY2F0aW9uLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUnVudGltZUNvbXBpbGVyIGltcGxlbWVudHMgQ29tcG9uZW50UmVzb2x2ZXIge1xuICBwcml2YXRlIF9zdHlsZUNhY2hlOiBNYXA8c3RyaW5nLCBQcm9taXNlPHN0cmluZz4+ID0gbmV3IE1hcDxzdHJpbmcsIFByb21pc2U8c3RyaW5nPj4oKTtcbiAgcHJpdmF0ZSBfaG9zdENhY2hlS2V5cyA9IG5ldyBNYXA8VHlwZSwgYW55PigpO1xuICBwcml2YXRlIF9jb21waWxlZFRlbXBsYXRlQ2FjaGUgPSBuZXcgTWFwPGFueSwgQ29tcGlsZWRUZW1wbGF0ZT4oKTtcbiAgcHJpdmF0ZSBfY29tcGlsZWRUZW1wbGF0ZURvbmUgPSBuZXcgTWFwPGFueSwgUHJvbWlzZTxDb21waWxlZFRlbXBsYXRlPj4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9ydW50aW1lTWV0YWRhdGFSZXNvbHZlcjogUnVudGltZU1ldGFkYXRhUmVzb2x2ZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3RlbXBsYXRlTm9ybWFsaXplcjogRGlyZWN0aXZlTm9ybWFsaXplcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfdGVtcGxhdGVQYXJzZXI6IFRlbXBsYXRlUGFyc2VyLCBwcml2YXRlIF9zdHlsZUNvbXBpbGVyOiBTdHlsZUNvbXBpbGVyLFxuICAgICAgICAgICAgICBwcml2YXRlIF92aWV3Q29tcGlsZXI6IFZpZXdDb21waWxlciwgcHJpdmF0ZSBfeGhyOiBYSFIsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2dlbkNvbmZpZzogQ29tcGlsZXJDb25maWcpIHt9XG5cbiAgcmVzb2x2ZUNvbXBvbmVudChjb21wb25lbnRUeXBlOiBUeXBlKTogUHJvbWlzZTxDb21wb25lbnRGYWN0b3J5PiB7XG4gICAgdmFyIGNvbXBNZXRhOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEgPVxuICAgICAgICB0aGlzLl9ydW50aW1lTWV0YWRhdGFSZXNvbHZlci5nZXREaXJlY3RpdmVNZXRhZGF0YShjb21wb25lbnRUeXBlKTtcbiAgICB2YXIgaG9zdENhY2hlS2V5ID0gdGhpcy5faG9zdENhY2hlS2V5cy5nZXQoY29tcG9uZW50VHlwZSk7XG4gICAgaWYgKGlzQmxhbmsoaG9zdENhY2hlS2V5KSkge1xuICAgICAgaG9zdENhY2hlS2V5ID0gbmV3IE9iamVjdCgpO1xuICAgICAgdGhpcy5faG9zdENhY2hlS2V5cy5zZXQoY29tcG9uZW50VHlwZSwgaG9zdENhY2hlS2V5KTtcbiAgICAgIGFzc2VydENvbXBvbmVudChjb21wTWV0YSk7XG4gICAgICB2YXIgaG9zdE1ldGE6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSA9XG4gICAgICAgICAgY3JlYXRlSG9zdENvbXBvbmVudE1ldGEoY29tcE1ldGEudHlwZSwgY29tcE1ldGEuc2VsZWN0b3IpO1xuXG4gICAgICB0aGlzLl9sb2FkQW5kQ29tcGlsZUNvbXBvbmVudChob3N0Q2FjaGVLZXksIGhvc3RNZXRhLCBbY29tcE1ldGFdLCBbXSwgW10pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fY29tcGlsZWRUZW1wbGF0ZURvbmUuZ2V0KGhvc3RDYWNoZUtleSlcbiAgICAgICAgLnRoZW4oKGNvbXBpbGVkVGVtcGxhdGU6IENvbXBpbGVkVGVtcGxhdGUpID0+IG5ldyBDb21wb25lbnRGYWN0b3J5KFxuICAgICAgICAgICAgICAgICAgY29tcE1ldGEuc2VsZWN0b3IsIGNvbXBpbGVkVGVtcGxhdGUudmlld0ZhY3RvcnksIGNvbXBvbmVudFR5cGUpKTtcbiAgfVxuXG4gIGNsZWFyQ2FjaGUoKSB7XG4gICAgdGhpcy5fc3R5bGVDYWNoZS5jbGVhcigpO1xuICAgIHRoaXMuX2NvbXBpbGVkVGVtcGxhdGVDYWNoZS5jbGVhcigpO1xuICAgIHRoaXMuX2NvbXBpbGVkVGVtcGxhdGVEb25lLmNsZWFyKCk7XG4gICAgdGhpcy5faG9zdENhY2hlS2V5cy5jbGVhcigpO1xuICB9XG5cblxuICBwcml2YXRlIF9sb2FkQW5kQ29tcGlsZUNvbXBvbmVudChjYWNoZUtleTogYW55LCBjb21wTWV0YTogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3RGlyZWN0aXZlczogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpcGVzOiBDb21waWxlUGlwZU1ldGFkYXRhW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBpbGluZ0NvbXBvbmVudHNQYXRoOiBhbnlbXSk6IENvbXBpbGVkVGVtcGxhdGUge1xuICAgIHZhciBjb21waWxlZFRlbXBsYXRlID0gdGhpcy5fY29tcGlsZWRUZW1wbGF0ZUNhY2hlLmdldChjYWNoZUtleSk7XG4gICAgdmFyIGRvbmUgPSB0aGlzLl9jb21waWxlZFRlbXBsYXRlRG9uZS5nZXQoY2FjaGVLZXkpO1xuICAgIGlmIChpc0JsYW5rKGNvbXBpbGVkVGVtcGxhdGUpKSB7XG4gICAgICBjb21waWxlZFRlbXBsYXRlID0gbmV3IENvbXBpbGVkVGVtcGxhdGUoKTtcbiAgICAgIHRoaXMuX2NvbXBpbGVkVGVtcGxhdGVDYWNoZS5zZXQoY2FjaGVLZXksIGNvbXBpbGVkVGVtcGxhdGUpO1xuICAgICAgZG9uZSA9XG4gICAgICAgICAgUHJvbWlzZVdyYXBwZXIuYWxsKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFs8YW55PnRoaXMuX2NvbXBpbGVDb21wb25lbnRTdHlsZXMoY29tcE1ldGEpXS5jb25jYXQodmlld0RpcmVjdGl2ZXMubWFwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJNZXRhID0+IHRoaXMuX3RlbXBsYXRlTm9ybWFsaXplci5ub3JtYWxpemVEaXJlY3RpdmUoZGlyTWV0YSkpKSlcbiAgICAgICAgICAgICAgLnRoZW4oKHN0eWxlc0FuZE5vcm1hbGl6ZWRWaWV3RGlyTWV0YXM6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIG5vcm1hbGl6ZWRWaWV3RGlyTWV0YXMgPSBzdHlsZXNBbmROb3JtYWxpemVkVmlld0Rpck1ldGFzLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgIHZhciBzdHlsZXMgPSBzdHlsZXNBbmROb3JtYWxpemVkVmlld0Rpck1ldGFzWzBdO1xuICAgICAgICAgICAgICAgIHZhciBwYXJzZWRUZW1wbGF0ZSA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RlbXBsYXRlUGFyc2VyLnBhcnNlKGNvbXBNZXRhLCBjb21wTWV0YS50ZW1wbGF0ZS50ZW1wbGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9ybWFsaXplZFZpZXdEaXJNZXRhcywgcGlwZXMsIGNvbXBNZXRhLnR5cGUubmFtZSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRQcm9taXNlcyA9IFtdO1xuICAgICAgICAgICAgICAgIGNvbXBpbGVkVGVtcGxhdGUuaW5pdCh0aGlzLl9jb21waWxlQ29tcG9uZW50KGNvbXBNZXRhLCBwYXJzZWRUZW1wbGF0ZSwgc3R5bGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpcGVzLCBjb21waWxpbmdDb21wb25lbnRzUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZFByb21pc2VzKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2VXcmFwcGVyLmFsbChjaGlsZFByb21pc2VzKS50aGVuKChfKSA9PiB7IHJldHVybiBjb21waWxlZFRlbXBsYXRlOyB9KTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICB0aGlzLl9jb21waWxlZFRlbXBsYXRlRG9uZS5zZXQoY2FjaGVLZXksIGRvbmUpO1xuICAgIH1cbiAgICByZXR1cm4gY29tcGlsZWRUZW1wbGF0ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbXBpbGVDb21wb25lbnQoY29tcE1ldGE6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSwgcGFyc2VkVGVtcGxhdGU6IFRlbXBsYXRlQXN0W10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVzOiBzdHJpbmdbXSwgcGlwZXM6IENvbXBpbGVQaXBlTWV0YWRhdGFbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21waWxpbmdDb21wb25lbnRzUGF0aDogYW55W10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRQcm9taXNlczogUHJvbWlzZTxhbnk+W10pOiBGdW5jdGlvbiB7XG4gICAgdmFyIGNvbXBpbGVSZXN1bHQgPSB0aGlzLl92aWV3Q29tcGlsZXIuY29tcGlsZUNvbXBvbmVudChcbiAgICAgICAgY29tcE1ldGEsIHBhcnNlZFRlbXBsYXRlLFxuICAgICAgICBuZXcgaXIuRXh0ZXJuYWxFeHByKG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKHtydW50aW1lOiBzdHlsZXN9KSksIHBpcGVzKTtcbiAgICBjb21waWxlUmVzdWx0LmRlcGVuZGVuY2llcy5mb3JFYWNoKChkZXApID0+IHtcbiAgICAgIHZhciBjaGlsZENvbXBpbGluZ0NvbXBvbmVudHNQYXRoID0gTGlzdFdyYXBwZXIuY2xvbmUoY29tcGlsaW5nQ29tcG9uZW50c1BhdGgpO1xuXG4gICAgICB2YXIgY2hpbGRDYWNoZUtleSA9IGRlcC5jb21wLnR5cGUucnVudGltZTtcbiAgICAgIHZhciBjaGlsZFZpZXdEaXJlY3RpdmVzOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGFbXSA9XG4gICAgICAgICAgdGhpcy5fcnVudGltZU1ldGFkYXRhUmVzb2x2ZXIuZ2V0Vmlld0RpcmVjdGl2ZXNNZXRhZGF0YShkZXAuY29tcC50eXBlLnJ1bnRpbWUpO1xuICAgICAgdmFyIGNoaWxkVmlld1BpcGVzOiBDb21waWxlUGlwZU1ldGFkYXRhW10gPVxuICAgICAgICAgIHRoaXMuX3J1bnRpbWVNZXRhZGF0YVJlc29sdmVyLmdldFZpZXdQaXBlc01ldGFkYXRhKGRlcC5jb21wLnR5cGUucnVudGltZSk7XG4gICAgICB2YXIgY2hpbGRJc1JlY3Vyc2l2ZSA9IExpc3RXcmFwcGVyLmNvbnRhaW5zKGNoaWxkQ29tcGlsaW5nQ29tcG9uZW50c1BhdGgsIGNoaWxkQ2FjaGVLZXkpO1xuICAgICAgY2hpbGRDb21waWxpbmdDb21wb25lbnRzUGF0aC5wdXNoKGNoaWxkQ2FjaGVLZXkpO1xuXG4gICAgICB2YXIgY2hpbGRDb21wID1cbiAgICAgICAgICB0aGlzLl9sb2FkQW5kQ29tcGlsZUNvbXBvbmVudChkZXAuY29tcC50eXBlLnJ1bnRpbWUsIGRlcC5jb21wLCBjaGlsZFZpZXdEaXJlY3RpdmVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkVmlld1BpcGVzLCBjaGlsZENvbXBpbGluZ0NvbXBvbmVudHNQYXRoKTtcbiAgICAgIGRlcC5mYWN0b3J5UGxhY2Vob2xkZXIucnVudGltZSA9IGNoaWxkQ29tcC5wcm94eVZpZXdGYWN0b3J5O1xuICAgICAgZGVwLmZhY3RvcnlQbGFjZWhvbGRlci5uYW1lID0gYHZpZXdGYWN0b3J5XyR7ZGVwLmNvbXAudHlwZS5uYW1lfWA7XG4gICAgICBpZiAoIWNoaWxkSXNSZWN1cnNpdmUpIHtcbiAgICAgICAgLy8gT25seSB3YWl0IGZvciBhIGNoaWxkIGlmIGl0IGlzIG5vdCBhIGN5Y2xlXG4gICAgICAgIGNoaWxkUHJvbWlzZXMucHVzaCh0aGlzLl9jb21waWxlZFRlbXBsYXRlRG9uZS5nZXQoY2hpbGRDYWNoZUtleSkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHZhciBmYWN0b3J5O1xuICAgIGlmIChJU19EQVJUIHx8ICF0aGlzLl9nZW5Db25maWcudXNlSml0KSB7XG4gICAgICBmYWN0b3J5ID0gaW50ZXJwcmV0U3RhdGVtZW50cyhjb21waWxlUmVzdWx0LnN0YXRlbWVudHMsIGNvbXBpbGVSZXN1bHQudmlld0ZhY3RvcnlWYXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgSW50ZXJwcmV0aXZlQXBwVmlld0luc3RhbmNlRmFjdG9yeSgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmFjdG9yeSA9IGppdFN0YXRlbWVudHMoYCR7Y29tcE1ldGEudHlwZS5uYW1lfS50ZW1wbGF0ZS5qc2AsIGNvbXBpbGVSZXN1bHQuc3RhdGVtZW50cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBpbGVSZXN1bHQudmlld0ZhY3RvcnlWYXIpO1xuICAgIH1cbiAgICByZXR1cm4gZmFjdG9yeTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbXBpbGVDb21wb25lbnRTdHlsZXMoY29tcE1ldGE6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICB2YXIgY29tcGlsZVJlc3VsdCA9IHRoaXMuX3N0eWxlQ29tcGlsZXIuY29tcGlsZUNvbXBvbmVudChjb21wTWV0YSk7XG4gICAgcmV0dXJuIHRoaXMuX3Jlc29sdmVTdHlsZXNDb21waWxlUmVzdWx0KGNvbXBNZXRhLnR5cGUubmFtZSwgY29tcGlsZVJlc3VsdCk7XG4gIH1cblxuICBwcml2YXRlIF9yZXNvbHZlU3R5bGVzQ29tcGlsZVJlc3VsdChzb3VyY2VVcmw6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBTdHlsZXNDb21waWxlUmVzdWx0KTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgIHZhciBwcm9taXNlcyA9IHJlc3VsdC5kZXBlbmRlbmNpZXMubWFwKChkZXApID0+IHRoaXMuX2xvYWRTdHlsZXNoZWV0RGVwKGRlcCkpO1xuICAgIHJldHVybiBQcm9taXNlV3JhcHBlci5hbGwocHJvbWlzZXMpXG4gICAgICAgIC50aGVuKChjc3NUZXh0cykgPT4ge1xuICAgICAgICAgIHZhciBuZXN0ZWRDb21waWxlUmVzdWx0UHJvbWlzZXMgPSBbXTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdC5kZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBkZXAgPSByZXN1bHQuZGVwZW5kZW5jaWVzW2ldO1xuICAgICAgICAgICAgdmFyIGNzc1RleHQgPSBjc3NUZXh0c1tpXTtcbiAgICAgICAgICAgIHZhciBuZXN0ZWRDb21waWxlUmVzdWx0ID1cbiAgICAgICAgICAgICAgICB0aGlzLl9zdHlsZUNvbXBpbGVyLmNvbXBpbGVTdHlsZXNoZWV0KGRlcC5zb3VyY2VVcmwsIGNzc1RleHQsIGRlcC5pc1NoaW1tZWQpO1xuICAgICAgICAgICAgbmVzdGVkQ29tcGlsZVJlc3VsdFByb21pc2VzLnB1c2goXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzb2x2ZVN0eWxlc0NvbXBpbGVSZXN1bHQoZGVwLnNvdXJjZVVybCwgbmVzdGVkQ29tcGlsZVJlc3VsdCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gUHJvbWlzZVdyYXBwZXIuYWxsKG5lc3RlZENvbXBpbGVSZXN1bHRQcm9taXNlcyk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChuZXN0ZWRTdHlsZXNBcnIpID0+IHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdC5kZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBkZXAgPSByZXN1bHQuZGVwZW5kZW5jaWVzW2ldO1xuICAgICAgICAgICAgZGVwLnZhbHVlUGxhY2Vob2xkZXIucnVudGltZSA9IG5lc3RlZFN0eWxlc0FycltpXTtcbiAgICAgICAgICAgIGRlcC52YWx1ZVBsYWNlaG9sZGVyLm5hbWUgPSBgaW1wb3J0ZWRTdHlsZXMke2l9YDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKElTX0RBUlQgfHwgIXRoaXMuX2dlbkNvbmZpZy51c2VKaXQpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnRlcnByZXRTdGF0ZW1lbnRzKHJlc3VsdC5zdGF0ZW1lbnRzLCByZXN1bHQuc3R5bGVzVmFyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEludGVycHJldGl2ZUFwcFZpZXdJbnN0YW5jZUZhY3RvcnkoKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBqaXRTdGF0ZW1lbnRzKGAke3NvdXJjZVVybH0uY3NzLmpzYCwgcmVzdWx0LnN0YXRlbWVudHMsIHJlc3VsdC5zdHlsZXNWYXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9sb2FkU3R5bGVzaGVldERlcChkZXA6IFN0eWxlc0NvbXBpbGVEZXBlbmRlbmN5KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICB2YXIgY2FjaGVLZXkgPSBgJHtkZXAuc291cmNlVXJsfSR7ZGVwLmlzU2hpbW1lZCA/ICcuc2hpbScgOiAnJ31gO1xuICAgIHZhciBjc3NUZXh0UHJvbWlzZSA9IHRoaXMuX3N0eWxlQ2FjaGUuZ2V0KGNhY2hlS2V5KTtcbiAgICBpZiAoaXNCbGFuayhjc3NUZXh0UHJvbWlzZSkpIHtcbiAgICAgIGNzc1RleHRQcm9taXNlID0gdGhpcy5feGhyLmdldChkZXAuc291cmNlVXJsKTtcbiAgICAgIHRoaXMuX3N0eWxlQ2FjaGUuc2V0KGNhY2hlS2V5LCBjc3NUZXh0UHJvbWlzZSk7XG4gICAgfVxuICAgIHJldHVybiBjc3NUZXh0UHJvbWlzZTtcbiAgfVxufVxuXG5jbGFzcyBDb21waWxlZFRlbXBsYXRlIHtcbiAgdmlld0ZhY3Rvcnk6IEZ1bmN0aW9uID0gbnVsbDtcbiAgcHJveHlWaWV3RmFjdG9yeTogRnVuY3Rpb247XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucHJveHlWaWV3RmFjdG9yeSA9ICh2aWV3VXRpbHMsIGNoaWxkSW5qZWN0b3IsIGNvbnRleHRFbCkgPT5cbiAgICAgICAgdGhpcy52aWV3RmFjdG9yeSh2aWV3VXRpbHMsIGNoaWxkSW5qZWN0b3IsIGNvbnRleHRFbCk7XG4gIH1cblxuICBpbml0KHZpZXdGYWN0b3J5OiBGdW5jdGlvbikgeyB0aGlzLnZpZXdGYWN0b3J5ID0gdmlld0ZhY3Rvcnk7IH1cbn1cblxuZnVuY3Rpb24gYXNzZXJ0Q29tcG9uZW50KG1ldGE6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSkge1xuICBpZiAoIW1ldGEuaXNDb21wb25lbnQpIHtcbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgQ291bGQgbm90IGNvbXBpbGUgJyR7bWV0YS50eXBlLm5hbWV9JyBiZWNhdXNlIGl0IGlzIG5vdCBhIGNvbXBvbmVudC5gKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
