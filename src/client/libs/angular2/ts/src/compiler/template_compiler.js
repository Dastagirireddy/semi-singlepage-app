System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/collection', 'angular2/src/facade/async', './directive_metadata', './template_ast', 'angular2/src/core/di', './source_module', './change_detector_compiler', './style_compiler', './view_compiler', './proto_view_compiler', './template_parser', './template_normalizer', './runtime_metadata', 'angular2/src/core/linker/view', 'angular2/src/core/change_detection/change_detection', 'angular2/src/core/linker/resolved_metadata_cache', './util'], function(exports_1, context_1) {
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
    var lang_1, exceptions_1, collection_1, async_1, directive_metadata_1, template_ast_1, di_1, source_module_1, change_detector_compiler_1, style_compiler_1, view_compiler_1, proto_view_compiler_1, template_parser_1, template_normalizer_1, runtime_metadata_1, view_1, change_detection_1, resolved_metadata_cache_1, util_1;
    var METADATA_CACHE_MODULE_REF, TemplateCompiler, NormalizedComponentWithViewDirectives, CompiledTemplate, DirectiveCollector, PipeVisitor;
    function assertComponent(meta) {
        if (!meta.isComponent) {
            throw new exceptions_1.BaseException("Could not compile '" + meta.type.name + "' because it is not a component.");
        }
    }
    function templateModuleUrl(moduleUrl) {
        var urlWithoutSuffix = moduleUrl.substring(0, moduleUrl.length - util_1.MODULE_SUFFIX.length);
        return urlWithoutSuffix + ".template" + util_1.MODULE_SUFFIX;
    }
    function codeGenHostViewFactoryName(type) {
        return "hostViewFactory_" + type.name;
    }
    function codeGenComponentViewFactoryName(nestedCompType) {
        return source_module_1.moduleRef(templateModuleUrl(nestedCompType.type.moduleUrl)) + "viewFactory_" + nestedCompType.type.name + "0";
    }
    function mergeStringMaps(maps) {
        var result = {};
        maps.forEach(function (map) { collection_1.StringMapWrapper.forEach(map, function (value, key) { result[key] = value; }); });
        return result;
    }
    function removeDuplicates(items) {
        var res = [];
        items.forEach(function (item) {
            var hasMatch = res.filter(function (r) { return r.type.name == item.type.name && r.type.moduleUrl == item.type.moduleUrl &&
                r.type.runtime == item.type.runtime; })
                .length > 0;
            if (!hasMatch) {
                res.push(item);
            }
        });
        return res;
    }
    function filterPipes(template, allPipes) {
        var visitor = new PipeVisitor();
        template_ast_1.templateVisitAll(visitor, template);
        return allPipes.filter(function (pipeMeta) { return collection_1.SetWrapper.has(visitor.collector.pipes, pipeMeta.name); });
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
            function (directive_metadata_1_1) {
                directive_metadata_1 = directive_metadata_1_1;
            },
            function (template_ast_1_1) {
                template_ast_1 = template_ast_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (source_module_1_1) {
                source_module_1 = source_module_1_1;
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
            function (template_parser_1_1) {
                template_parser_1 = template_parser_1_1;
            },
            function (template_normalizer_1_1) {
                template_normalizer_1 = template_normalizer_1_1;
            },
            function (runtime_metadata_1_1) {
                runtime_metadata_1 = runtime_metadata_1_1;
            },
            function (view_1_1) {
                view_1 = view_1_1;
            },
            function (change_detection_1_1) {
                change_detection_1 = change_detection_1_1;
            },
            function (resolved_metadata_cache_1_1) {
                resolved_metadata_cache_1 = resolved_metadata_cache_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            }],
        execute: function() {
            exports_1("METADATA_CACHE_MODULE_REF", METADATA_CACHE_MODULE_REF = source_module_1.moduleRef('package:angular2/src/core/linker/resolved_metadata_cache' + util_1.MODULE_SUFFIX));
            /**
             * An internal module of the Angular compiler that begins with component types,
             * extracts templates, and eventually produces a compiled version of the component
             * ready for linking into an application.
             */
            TemplateCompiler = (function () {
                function TemplateCompiler(_runtimeMetadataResolver, _templateNormalizer, _templateParser, _styleCompiler, _cdCompiler, _protoViewCompiler, _viewCompiler, _resolvedMetadataCache, _genConfig) {
                    this._runtimeMetadataResolver = _runtimeMetadataResolver;
                    this._templateNormalizer = _templateNormalizer;
                    this._templateParser = _templateParser;
                    this._styleCompiler = _styleCompiler;
                    this._cdCompiler = _cdCompiler;
                    this._protoViewCompiler = _protoViewCompiler;
                    this._viewCompiler = _viewCompiler;
                    this._resolvedMetadataCache = _resolvedMetadataCache;
                    this._genConfig = _genConfig;
                    this._hostCacheKeys = new Map();
                    this._compiledTemplateCache = new Map();
                    this._compiledTemplateDone = new Map();
                }
                TemplateCompiler.prototype.normalizeDirectiveMetadata = function (directive) {
                    if (!directive.isComponent) {
                        // For non components there is nothing to be normalized yet.
                        return async_1.PromiseWrapper.resolve(directive);
                    }
                    return this._templateNormalizer.normalizeTemplate(directive.type, directive.template)
                        .then(function (normalizedTemplate) { return new directive_metadata_1.CompileDirectiveMetadata({
                        type: directive.type,
                        isComponent: directive.isComponent,
                        dynamicLoadable: directive.dynamicLoadable,
                        selector: directive.selector,
                        exportAs: directive.exportAs,
                        changeDetection: directive.changeDetection,
                        inputs: directive.inputs,
                        outputs: directive.outputs,
                        hostListeners: directive.hostListeners,
                        hostProperties: directive.hostProperties,
                        hostAttributes: directive.hostAttributes,
                        lifecycleHooks: directive.lifecycleHooks,
                        providers: directive.providers,
                        template: normalizedTemplate
                    }); });
                };
                TemplateCompiler.prototype.compileHostComponentRuntime = function (type) {
                    var compMeta = this._runtimeMetadataResolver.getDirectiveMetadata(type);
                    var hostCacheKey = this._hostCacheKeys.get(type);
                    if (lang_1.isBlank(hostCacheKey)) {
                        hostCacheKey = new Object();
                        this._hostCacheKeys.set(type, hostCacheKey);
                        assertComponent(compMeta);
                        var hostMeta = directive_metadata_1.createHostComponentMeta(compMeta.type, compMeta.selector);
                        this._compileComponentRuntime(hostCacheKey, hostMeta, [compMeta], [], []);
                    }
                    return this._compiledTemplateDone.get(hostCacheKey)
                        .then(function (compiledTemplate) {
                        return new view_1.HostViewFactory(compMeta.selector, compiledTemplate.viewFactory);
                    });
                };
                TemplateCompiler.prototype.clearCache = function () {
                    this._styleCompiler.clearCache();
                    this._compiledTemplateCache.clear();
                    this._compiledTemplateDone.clear();
                    this._hostCacheKeys.clear();
                };
                TemplateCompiler.prototype.compileTemplatesCodeGen = function (components) {
                    var _this = this;
                    if (components.length === 0) {
                        throw new exceptions_1.BaseException('No components given');
                    }
                    var declarations = [];
                    components.forEach(function (componentWithDirs) {
                        var compMeta = componentWithDirs.component;
                        assertComponent(compMeta);
                        _this._compileComponentCodeGen(compMeta, componentWithDirs.directives, componentWithDirs.pipes, declarations);
                        if (compMeta.dynamicLoadable) {
                            var hostMeta = directive_metadata_1.createHostComponentMeta(compMeta.type, compMeta.selector);
                            var viewFactoryExpression = _this._compileComponentCodeGen(hostMeta, [compMeta], [], declarations);
                            var constructionKeyword = lang_1.IS_DART ? 'const' : 'new';
                            var compiledTemplateExpr = constructionKeyword + " " + proto_view_compiler_1.APP_VIEW_MODULE_REF + "HostViewFactory('" + compMeta.selector + "'," + viewFactoryExpression + ")";
                            var varName = codeGenHostViewFactoryName(compMeta.type);
                            declarations.push("" + util_1.codeGenExportVariable(varName) + compiledTemplateExpr + ";");
                        }
                    });
                    var moduleUrl = components[0].component.type.moduleUrl;
                    return new source_module_1.SourceModule("" + templateModuleUrl(moduleUrl), declarations.join('\n'));
                };
                TemplateCompiler.prototype.compileStylesheetCodeGen = function (stylesheetUrl, cssText) {
                    return this._styleCompiler.compileStylesheetCodeGen(stylesheetUrl, cssText);
                };
                TemplateCompiler.prototype._compileComponentRuntime = function (cacheKey, compMeta, viewDirectives, pipes, compilingComponentsPath) {
                    var _this = this;
                    var uniqViewDirectives = removeDuplicates(viewDirectives);
                    var uniqViewPipes = removeDuplicates(pipes);
                    var compiledTemplate = this._compiledTemplateCache.get(cacheKey);
                    var done = this._compiledTemplateDone.get(cacheKey);
                    if (lang_1.isBlank(compiledTemplate)) {
                        compiledTemplate = new CompiledTemplate();
                        this._compiledTemplateCache.set(cacheKey, compiledTemplate);
                        done = async_1.PromiseWrapper
                            .all([this._styleCompiler.compileComponentRuntime(compMeta.template)].concat(uniqViewDirectives.map(function (dirMeta) { return _this.normalizeDirectiveMetadata(dirMeta); })))
                            .then(function (stylesAndNormalizedViewDirMetas) {
                            var normalizedViewDirMetas = stylesAndNormalizedViewDirMetas.slice(1);
                            var styles = stylesAndNormalizedViewDirMetas[0];
                            var parsedTemplate = _this._templateParser.parse(compMeta.template.template, normalizedViewDirMetas, uniqViewPipes, compMeta.type.name);
                            var childPromises = [];
                            var usedDirectives = DirectiveCollector.findUsedDirectives(parsedTemplate);
                            usedDirectives.components.forEach(function (component) { return _this._compileNestedComponentRuntime(component, compilingComponentsPath, childPromises); });
                            return async_1.PromiseWrapper.all(childPromises)
                                .then(function (_) {
                                var filteredPipes = filterPipes(parsedTemplate, uniqViewPipes);
                                compiledTemplate.init(_this._createViewFactoryRuntime(compMeta, parsedTemplate, usedDirectives.directives, styles, filteredPipes));
                                return compiledTemplate;
                            });
                        });
                        this._compiledTemplateDone.set(cacheKey, done);
                    }
                    return compiledTemplate;
                };
                TemplateCompiler.prototype._compileNestedComponentRuntime = function (childComponentDir, parentCompilingComponentsPath, childPromises) {
                    var compilingComponentsPath = collection_1.ListWrapper.clone(parentCompilingComponentsPath);
                    var childCacheKey = childComponentDir.type.runtime;
                    var childViewDirectives = this._runtimeMetadataResolver.getViewDirectivesMetadata(childComponentDir.type.runtime);
                    var childViewPipes = this._runtimeMetadataResolver.getViewPipesMetadata(childComponentDir.type.runtime);
                    var childIsRecursive = collection_1.ListWrapper.contains(compilingComponentsPath, childCacheKey);
                    compilingComponentsPath.push(childCacheKey);
                    this._compileComponentRuntime(childCacheKey, childComponentDir, childViewDirectives, childViewPipes, compilingComponentsPath);
                    if (!childIsRecursive) {
                        // Only wait for a child if it is not a cycle
                        childPromises.push(this._compiledTemplateDone.get(childCacheKey));
                    }
                };
                TemplateCompiler.prototype._createViewFactoryRuntime = function (compMeta, parsedTemplate, directives, styles, pipes) {
                    var _this = this;
                    if (lang_1.IS_DART || !this._genConfig.useJit) {
                        var changeDetectorFactories = this._cdCompiler.compileComponentRuntime(compMeta.type, compMeta.changeDetection, parsedTemplate);
                        var protoViews = this._protoViewCompiler.compileProtoViewRuntime(this._resolvedMetadataCache, compMeta, parsedTemplate, pipes);
                        return this._viewCompiler.compileComponentRuntime(compMeta, parsedTemplate, styles, protoViews.protoViews, changeDetectorFactories, function (compMeta) { return _this._getNestedComponentViewFactory(compMeta); });
                    }
                    else {
                        var declarations = [];
                        var viewFactoryExpr = this._createViewFactoryCodeGen('resolvedMetadataCache', compMeta, new source_module_1.SourceExpression([], 'styles'), parsedTemplate, pipes, declarations);
                        var vars = { 'exports': {}, 'styles': styles, 'resolvedMetadataCache': this._resolvedMetadataCache };
                        directives.forEach(function (dirMeta) {
                            vars[dirMeta.type.name] = dirMeta.type.runtime;
                            if (dirMeta.isComponent && dirMeta.type.runtime !== compMeta.type.runtime) {
                                vars[("viewFactory_" + dirMeta.type.name + "0")] = _this._getNestedComponentViewFactory(dirMeta);
                            }
                        });
                        pipes.forEach(function (pipeMeta) { return vars[pipeMeta.type.name] = pipeMeta.type.runtime; });
                        var declarationsWithoutImports = source_module_1.SourceModule.getSourceWithoutImports(declarations.join('\n'));
                        return lang_1.evalExpression("viewFactory_" + compMeta.type.name, viewFactoryExpr, declarationsWithoutImports, mergeStringMaps([vars, change_detector_compiler_1.CHANGE_DETECTION_JIT_IMPORTS, proto_view_compiler_1.PROTO_VIEW_JIT_IMPORTS, view_compiler_1.VIEW_JIT_IMPORTS]));
                    }
                };
                TemplateCompiler.prototype._getNestedComponentViewFactory = function (compMeta) {
                    return this._compiledTemplateCache.get(compMeta.type.runtime).viewFactory;
                };
                TemplateCompiler.prototype._compileComponentCodeGen = function (compMeta, directives, pipes, targetDeclarations) {
                    var uniqueDirectives = removeDuplicates(directives);
                    var uniqPipes = removeDuplicates(pipes);
                    var styleExpr = this._styleCompiler.compileComponentCodeGen(compMeta.template);
                    var parsedTemplate = this._templateParser.parse(compMeta.template.template, uniqueDirectives, uniqPipes, compMeta.type.name);
                    var filteredPipes = filterPipes(parsedTemplate, uniqPipes);
                    return this._createViewFactoryCodeGen(METADATA_CACHE_MODULE_REF + "CODEGEN_RESOLVED_METADATA_CACHE", compMeta, styleExpr, parsedTemplate, filteredPipes, targetDeclarations);
                };
                TemplateCompiler.prototype._createViewFactoryCodeGen = function (resolvedMetadataCacheExpr, compMeta, styleExpr, parsedTemplate, pipes, targetDeclarations) {
                    var changeDetectorsExprs = this._cdCompiler.compileComponentCodeGen(compMeta.type, compMeta.changeDetection, parsedTemplate);
                    var protoViewExprs = this._protoViewCompiler.compileProtoViewCodeGen(new util_1.Expression(resolvedMetadataCacheExpr), compMeta, parsedTemplate, pipes);
                    var viewFactoryExpr = this._viewCompiler.compileComponentCodeGen(compMeta, parsedTemplate, styleExpr, protoViewExprs.protoViews, changeDetectorsExprs, codeGenComponentViewFactoryName);
                    util_1.addAll(changeDetectorsExprs.declarations, targetDeclarations);
                    util_1.addAll(protoViewExprs.declarations, targetDeclarations);
                    util_1.addAll(viewFactoryExpr.declarations, targetDeclarations);
                    return viewFactoryExpr.expression;
                };
                TemplateCompiler = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [runtime_metadata_1.RuntimeMetadataResolver, template_normalizer_1.TemplateNormalizer, template_parser_1.TemplateParser, style_compiler_1.StyleCompiler, change_detector_compiler_1.ChangeDetectionCompiler, proto_view_compiler_1.ProtoViewCompiler, view_compiler_1.ViewCompiler, resolved_metadata_cache_1.ResolvedMetadataCache, change_detection_1.ChangeDetectorGenConfig])
                ], TemplateCompiler);
                return TemplateCompiler;
            }());
            exports_1("TemplateCompiler", TemplateCompiler);
            NormalizedComponentWithViewDirectives = (function () {
                function NormalizedComponentWithViewDirectives(component, directives, pipes) {
                    this.component = component;
                    this.directives = directives;
                    this.pipes = pipes;
                }
                return NormalizedComponentWithViewDirectives;
            }());
            exports_1("NormalizedComponentWithViewDirectives", NormalizedComponentWithViewDirectives);
            CompiledTemplate = (function () {
                function CompiledTemplate() {
                    this.viewFactory = null;
                }
                CompiledTemplate.prototype.init = function (viewFactory) { this.viewFactory = viewFactory; };
                return CompiledTemplate;
            }());
            DirectiveCollector = (function () {
                function DirectiveCollector() {
                    this.directives = [];
                    this.components = [];
                }
                DirectiveCollector.findUsedDirectives = function (parsedTemplate) {
                    var collector = new DirectiveCollector();
                    template_ast_1.templateVisitAll(collector, parsedTemplate);
                    return collector;
                };
                DirectiveCollector.prototype.visitBoundText = function (ast, context) { return null; };
                DirectiveCollector.prototype.visitText = function (ast, context) { return null; };
                DirectiveCollector.prototype.visitNgContent = function (ast, context) { return null; };
                DirectiveCollector.prototype.visitElement = function (ast, context) {
                    template_ast_1.templateVisitAll(this, ast.directives);
                    template_ast_1.templateVisitAll(this, ast.children);
                    return null;
                };
                DirectiveCollector.prototype.visitEmbeddedTemplate = function (ast, context) {
                    template_ast_1.templateVisitAll(this, ast.directives);
                    template_ast_1.templateVisitAll(this, ast.children);
                    return null;
                };
                DirectiveCollector.prototype.visitVariable = function (ast, ctx) { return null; };
                DirectiveCollector.prototype.visitAttr = function (ast, attrNameAndValues) { return null; };
                DirectiveCollector.prototype.visitDirective = function (ast, ctx) {
                    if (ast.directive.isComponent) {
                        this.components.push(ast.directive);
                    }
                    this.directives.push(ast.directive);
                    return null;
                };
                DirectiveCollector.prototype.visitEvent = function (ast, eventTargetAndNames) {
                    return null;
                };
                DirectiveCollector.prototype.visitDirectiveProperty = function (ast, context) { return null; };
                DirectiveCollector.prototype.visitElementProperty = function (ast, context) { return null; };
                return DirectiveCollector;
            }());
            PipeVisitor = (function () {
                function PipeVisitor() {
                    this.collector = new template_parser_1.PipeCollector();
                }
                PipeVisitor.prototype.visitBoundText = function (ast, context) {
                    ast.value.visit(this.collector);
                    return null;
                };
                PipeVisitor.prototype.visitText = function (ast, context) { return null; };
                PipeVisitor.prototype.visitNgContent = function (ast, context) { return null; };
                PipeVisitor.prototype.visitElement = function (ast, context) {
                    template_ast_1.templateVisitAll(this, ast.inputs);
                    template_ast_1.templateVisitAll(this, ast.outputs);
                    template_ast_1.templateVisitAll(this, ast.directives);
                    template_ast_1.templateVisitAll(this, ast.children);
                    return null;
                };
                PipeVisitor.prototype.visitEmbeddedTemplate = function (ast, context) {
                    template_ast_1.templateVisitAll(this, ast.outputs);
                    template_ast_1.templateVisitAll(this, ast.directives);
                    template_ast_1.templateVisitAll(this, ast.children);
                    return null;
                };
                PipeVisitor.prototype.visitVariable = function (ast, ctx) { return null; };
                PipeVisitor.prototype.visitAttr = function (ast, attrNameAndValues) { return null; };
                PipeVisitor.prototype.visitDirective = function (ast, ctx) {
                    template_ast_1.templateVisitAll(this, ast.inputs);
                    template_ast_1.templateVisitAll(this, ast.hostEvents);
                    template_ast_1.templateVisitAll(this, ast.hostProperties);
                    return null;
                };
                PipeVisitor.prototype.visitEvent = function (ast, eventTargetAndNames) {
                    ast.handler.visit(this.collector);
                    return null;
                };
                PipeVisitor.prototype.visitDirectiveProperty = function (ast, context) {
                    ast.value.visit(this.collector);
                    return null;
                };
                PipeVisitor.prototype.visitElementProperty = function (ast, context) {
                    ast.value.visit(this.collector);
                    return null;
                };
                return PipeVisitor;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL3RlbXBsYXRlX2NvbXBpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7UUFvRVcseUJBQXlCO0lBd1BwQyx5QkFBeUIsSUFBOEI7UUFDckQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUN0QixNQUFNLElBQUksMEJBQWEsQ0FBQyx3QkFBc0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLHFDQUFrQyxDQUFDLENBQUM7UUFDbEcsQ0FBQztJQUNILENBQUM7SUFFRCwyQkFBMkIsU0FBaUI7UUFDMUMsSUFBSSxnQkFBZ0IsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsTUFBTSxHQUFHLG9CQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkYsTUFBTSxDQUFJLGdCQUFnQixpQkFBWSxvQkFBZSxDQUFDO0lBQ3hELENBQUM7SUFHRCxvQ0FBb0MsSUFBeUI7UUFDM0QsTUFBTSxDQUFDLHFCQUFtQixJQUFJLENBQUMsSUFBTSxDQUFDO0lBQ3hDLENBQUM7SUFFRCx5Q0FBeUMsY0FBd0M7UUFDL0UsTUFBTSxDQUFJLHlCQUFTLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxvQkFBZSxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksTUFBRyxDQUFDO0lBQ2xILENBQUM7SUFFRCx5QkFBeUIsSUFBaUM7UUFDeEQsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxPQUFPLENBQ1IsVUFBQyxHQUFHLElBQU8sNkJBQWdCLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxVQUFDLEtBQUssRUFBRSxHQUFHLElBQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFD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LEdBQXBCLFVBQXFCLEdBQTRCLEVBQUUsT0FBWTtvQkFDN0QsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNkLENBQUM7Z0JBQ0gsa0JBQUM7WUFBRCxDQTdDQSxBQTZDQyxJQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL3RlbXBsYXRlX2NvbXBpbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSVNfREFSVCxcbiAgVHlwZSxcbiAgSnNvbixcbiAgaXNCbGFuayxcbiAgaXNQcmVzZW50LFxuICBzdHJpbmdpZnksXG4gIGV2YWxFeHByZXNzaW9uXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge1xuICBMaXN0V3JhcHBlcixcbiAgU2V0V3JhcHBlcixcbiAgTWFwV3JhcHBlcixcbiAgU3RyaW5nTWFwV3JhcHBlclxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtQcm9taXNlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5pbXBvcnQge1xuICBjcmVhdGVIb3N0Q29tcG9uZW50TWV0YSxcbiAgQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLFxuICBDb21waWxlVHlwZU1ldGFkYXRhLFxuICBDb21waWxlVGVtcGxhdGVNZXRhZGF0YSxcbiAgQ29tcGlsZVBpcGVNZXRhZGF0YSxcbiAgQ29tcGlsZU1ldGFkYXRhV2l0aFR5cGVcbn0gZnJvbSAnLi9kaXJlY3RpdmVfbWV0YWRhdGEnO1xuaW1wb3J0IHtcbiAgVGVtcGxhdGVBc3QsXG4gIFRlbXBsYXRlQXN0VmlzaXRvcixcbiAgTmdDb250ZW50QXN0LFxuICBFbWJlZGRlZFRlbXBsYXRlQXN0LFxuICBFbGVtZW50QXN0LFxuICBWYXJpYWJsZUFzdCxcbiAgQm91bmRFdmVudEFzdCxcbiAgQm91bmRFbGVtZW50UHJvcGVydHlBc3QsXG4gIEF0dHJBc3QsXG4gIEJvdW5kVGV4dEFzdCxcbiAgVGV4dEFzdCxcbiAgRGlyZWN0aXZlQXN0LFxuICBCb3VuZERpcmVjdGl2ZVByb3BlcnR5QXN0LFxuICB0ZW1wbGF0ZVZpc2l0QWxsXG59IGZyb20gJy4vdGVtcGxhdGVfYXN0JztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtTb3VyY2VNb2R1bGUsIG1vZHVsZVJlZiwgU291cmNlRXhwcmVzc2lvbn0gZnJvbSAnLi9zb3VyY2VfbW9kdWxlJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uQ29tcGlsZXIsIENIQU5HRV9ERVRFQ1RJT05fSklUX0lNUE9SVFN9IGZyb20gJy4vY2hhbmdlX2RldGVjdG9yX2NvbXBpbGVyJztcbmltcG9ydCB7U3R5bGVDb21waWxlcn0gZnJvbSAnLi9zdHlsZV9jb21waWxlcic7XG5pbXBvcnQge1ZpZXdDb21waWxlciwgVklFV19KSVRfSU1QT1JUU30gZnJvbSAnLi92aWV3X2NvbXBpbGVyJztcbmltcG9ydCB7XG4gIFByb3RvVmlld0NvbXBpbGVyLFxuICBBUFBfVklFV19NT0RVTEVfUkVGLFxuICBDb21waWxlUHJvdG9WaWV3LFxuICBQUk9UT19WSUVXX0pJVF9JTVBPUlRTXG59IGZyb20gJy4vcHJvdG9fdmlld19jb21waWxlcic7XG5pbXBvcnQge1RlbXBsYXRlUGFyc2VyLCBQaXBlQ29sbGVjdG9yfSBmcm9tICcuL3RlbXBsYXRlX3BhcnNlcic7XG5pbXBvcnQge1RlbXBsYXRlTm9ybWFsaXplcn0gZnJvbSAnLi90ZW1wbGF0ZV9ub3JtYWxpemVyJztcbmltcG9ydCB7UnVudGltZU1ldGFkYXRhUmVzb2x2ZXJ9IGZyb20gJy4vcnVudGltZV9tZXRhZGF0YSc7XG5pbXBvcnQge0hvc3RWaWV3RmFjdG9yeX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL3ZpZXcnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvckdlbkNvbmZpZ30gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0aW9uJztcbmltcG9ydCB7UmVzb2x2ZWRNZXRhZGF0YUNhY2hlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvcmVzb2x2ZWRfbWV0YWRhdGFfY2FjaGUnO1xuXG5pbXBvcnQge1xuICBjb2RlR2VuRXhwb3J0VmFyaWFibGUsXG4gIGVzY2FwZVNpbmdsZVF1b3RlU3RyaW5nLFxuICBjb2RlR2VuVmFsdWVGbixcbiAgTU9EVUxFX1NVRkZJWCxcbiAgYWRkQWxsLFxuICBFeHByZXNzaW9uXG59IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCB2YXIgTUVUQURBVEFfQ0FDSEVfTU9EVUxFX1JFRiA9XG4gICAgbW9kdWxlUmVmKCdwYWNrYWdlOmFuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9yZXNvbHZlZF9tZXRhZGF0YV9jYWNoZScgKyBNT0RVTEVfU1VGRklYKTtcblxuLyoqXG4gKiBBbiBpbnRlcm5hbCBtb2R1bGUgb2YgdGhlIEFuZ3VsYXIgY29tcGlsZXIgdGhhdCBiZWdpbnMgd2l0aCBjb21wb25lbnQgdHlwZXMsXG4gKiBleHRyYWN0cyB0ZW1wbGF0ZXMsIGFuZCBldmVudHVhbGx5IHByb2R1Y2VzIGEgY29tcGlsZWQgdmVyc2lvbiBvZiB0aGUgY29tcG9uZW50XG4gKiByZWFkeSBmb3IgbGlua2luZyBpbnRvIGFuIGFwcGxpY2F0aW9uLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVDb21waWxlciB7XG4gIHByaXZhdGUgX2hvc3RDYWNoZUtleXMgPSBuZXcgTWFwPFR5cGUsIGFueT4oKTtcbiAgcHJpdmF0ZSBfY29tcGlsZWRUZW1wbGF0ZUNhY2hlID0gbmV3IE1hcDxhbnksIENvbXBpbGVkVGVtcGxhdGU+KCk7XG4gIHByaXZhdGUgX2NvbXBpbGVkVGVtcGxhdGVEb25lID0gbmV3IE1hcDxhbnksIFByb21pc2U8Q29tcGlsZWRUZW1wbGF0ZT4+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcnVudGltZU1ldGFkYXRhUmVzb2x2ZXI6IFJ1bnRpbWVNZXRhZGF0YVJlc29sdmVyLFxuICAgICAgICAgICAgICBwcml2YXRlIF90ZW1wbGF0ZU5vcm1hbGl6ZXI6IFRlbXBsYXRlTm9ybWFsaXplcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfdGVtcGxhdGVQYXJzZXI6IFRlbXBsYXRlUGFyc2VyLCBwcml2YXRlIF9zdHlsZUNvbXBpbGVyOiBTdHlsZUNvbXBpbGVyLFxuICAgICAgICAgICAgICBwcml2YXRlIF9jZENvbXBpbGVyOiBDaGFuZ2VEZXRlY3Rpb25Db21waWxlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfcHJvdG9WaWV3Q29tcGlsZXI6IFByb3RvVmlld0NvbXBpbGVyLCBwcml2YXRlIF92aWV3Q29tcGlsZXI6IFZpZXdDb21waWxlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfcmVzb2x2ZWRNZXRhZGF0YUNhY2hlOiBSZXNvbHZlZE1ldGFkYXRhQ2FjaGUsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2dlbkNvbmZpZzogQ2hhbmdlRGV0ZWN0b3JHZW5Db25maWcpIHt9XG5cbiAgbm9ybWFsaXplRGlyZWN0aXZlTWV0YWRhdGEoZGlyZWN0aXZlOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEpOlxuICAgICAgUHJvbWlzZTxDb21waWxlRGlyZWN0aXZlTWV0YWRhdGE+IHtcbiAgICBpZiAoIWRpcmVjdGl2ZS5pc0NvbXBvbmVudCkge1xuICAgICAgLy8gRm9yIG5vbiBjb21wb25lbnRzIHRoZXJlIGlzIG5vdGhpbmcgdG8gYmUgbm9ybWFsaXplZCB5ZXQuXG4gICAgICByZXR1cm4gUHJvbWlzZVdyYXBwZXIucmVzb2x2ZShkaXJlY3RpdmUpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl90ZW1wbGF0ZU5vcm1hbGl6ZXIubm9ybWFsaXplVGVtcGxhdGUoZGlyZWN0aXZlLnR5cGUsIGRpcmVjdGl2ZS50ZW1wbGF0ZSlcbiAgICAgICAgLnRoZW4oKG5vcm1hbGl6ZWRUZW1wbGF0ZTogQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGEpID0+IG5ldyBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEoe1xuICAgICAgICAgICAgICAgIHR5cGU6IGRpcmVjdGl2ZS50eXBlLFxuICAgICAgICAgICAgICAgIGlzQ29tcG9uZW50OiBkaXJlY3RpdmUuaXNDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgZHluYW1pY0xvYWRhYmxlOiBkaXJlY3RpdmUuZHluYW1pY0xvYWRhYmxlLFxuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBkaXJlY3RpdmUuc2VsZWN0b3IsXG4gICAgICAgICAgICAgICAgZXhwb3J0QXM6IGRpcmVjdGl2ZS5leHBvcnRBcyxcbiAgICAgICAgICAgICAgICBjaGFuZ2VEZXRlY3Rpb246IGRpcmVjdGl2ZS5jaGFuZ2VEZXRlY3Rpb24sXG4gICAgICAgICAgICAgICAgaW5wdXRzOiBkaXJlY3RpdmUuaW5wdXRzLFxuICAgICAgICAgICAgICAgIG91dHB1dHM6IGRpcmVjdGl2ZS5vdXRwdXRzLFxuICAgICAgICAgICAgICAgIGhvc3RMaXN0ZW5lcnM6IGRpcmVjdGl2ZS5ob3N0TGlzdGVuZXJzLFxuICAgICAgICAgICAgICAgIGhvc3RQcm9wZXJ0aWVzOiBkaXJlY3RpdmUuaG9zdFByb3BlcnRpZXMsXG4gICAgICAgICAgICAgICAgaG9zdEF0dHJpYnV0ZXM6IGRpcmVjdGl2ZS5ob3N0QXR0cmlidXRlcyxcbiAgICAgICAgICAgICAgICBsaWZlY3ljbGVIb29rczogZGlyZWN0aXZlLmxpZmVjeWNsZUhvb2tzLFxuICAgICAgICAgICAgICAgIHByb3ZpZGVyczogZGlyZWN0aXZlLnByb3ZpZGVycyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogbm9ybWFsaXplZFRlbXBsYXRlXG4gICAgICAgICAgICAgIH0pKTtcbiAgfVxuXG4gIGNvbXBpbGVIb3N0Q29tcG9uZW50UnVudGltZSh0eXBlOiBUeXBlKTogUHJvbWlzZTxIb3N0Vmlld0ZhY3Rvcnk+IHtcbiAgICB2YXIgY29tcE1ldGE6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSA9XG4gICAgICAgIHRoaXMuX3J1bnRpbWVNZXRhZGF0YVJlc29sdmVyLmdldERpcmVjdGl2ZU1ldGFkYXRhKHR5cGUpO1xuICAgIHZhciBob3N0Q2FjaGVLZXkgPSB0aGlzLl9ob3N0Q2FjaGVLZXlzLmdldCh0eXBlKTtcbiAgICBpZiAoaXNCbGFuayhob3N0Q2FjaGVLZXkpKSB7XG4gICAgICBob3N0Q2FjaGVLZXkgPSBuZXcgT2JqZWN0KCk7XG4gICAgICB0aGlzLl9ob3N0Q2FjaGVLZXlzLnNldCh0eXBlLCBob3N0Q2FjaGVLZXkpO1xuICAgICAgYXNzZXJ0Q29tcG9uZW50KGNvbXBNZXRhKTtcbiAgICAgIHZhciBob3N0TWV0YTogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhID1cbiAgICAgICAgICBjcmVhdGVIb3N0Q29tcG9uZW50TWV0YShjb21wTWV0YS50eXBlLCBjb21wTWV0YS5zZWxlY3Rvcik7XG5cbiAgICAgIHRoaXMuX2NvbXBpbGVDb21wb25lbnRSdW50aW1lKGhvc3RDYWNoZUtleSwgaG9zdE1ldGEsIFtjb21wTWV0YV0sIFtdLCBbXSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jb21waWxlZFRlbXBsYXRlRG9uZS5nZXQoaG9zdENhY2hlS2V5KVxuICAgICAgICAudGhlbigoY29tcGlsZWRUZW1wbGF0ZTogQ29tcGlsZWRUZW1wbGF0ZSkgPT5cbiAgICAgICAgICAgICAgICAgIG5ldyBIb3N0Vmlld0ZhY3RvcnkoY29tcE1ldGEuc2VsZWN0b3IsIGNvbXBpbGVkVGVtcGxhdGUudmlld0ZhY3RvcnkpKTtcbiAgfVxuXG4gIGNsZWFyQ2FjaGUoKSB7XG4gICAgdGhpcy5fc3R5bGVDb21waWxlci5jbGVhckNhY2hlKCk7XG4gICAgdGhpcy5fY29tcGlsZWRUZW1wbGF0ZUNhY2hlLmNsZWFyKCk7XG4gICAgdGhpcy5fY29tcGlsZWRUZW1wbGF0ZURvbmUuY2xlYXIoKTtcbiAgICB0aGlzLl9ob3N0Q2FjaGVLZXlzLmNsZWFyKCk7XG4gIH1cblxuICBjb21waWxlVGVtcGxhdGVzQ29kZUdlbihjb21wb25lbnRzOiBOb3JtYWxpemVkQ29tcG9uZW50V2l0aFZpZXdEaXJlY3RpdmVzW10pOiBTb3VyY2VNb2R1bGUge1xuICAgIGlmIChjb21wb25lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oJ05vIGNvbXBvbmVudHMgZ2l2ZW4nKTtcbiAgICB9XG4gICAgdmFyIGRlY2xhcmF0aW9ucyA9IFtdO1xuICAgIGNvbXBvbmVudHMuZm9yRWFjaChjb21wb25lbnRXaXRoRGlycyA9PiB7XG4gICAgICB2YXIgY29tcE1ldGEgPSA8Q29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhPmNvbXBvbmVudFdpdGhEaXJzLmNvbXBvbmVudDtcbiAgICAgIGFzc2VydENvbXBvbmVudChjb21wTWV0YSk7XG4gICAgICB0aGlzLl9jb21waWxlQ29tcG9uZW50Q29kZUdlbihjb21wTWV0YSwgY29tcG9uZW50V2l0aERpcnMuZGlyZWN0aXZlcywgY29tcG9uZW50V2l0aERpcnMucGlwZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWNsYXJhdGlvbnMpO1xuICAgICAgaWYgKGNvbXBNZXRhLmR5bmFtaWNMb2FkYWJsZSkge1xuICAgICAgICB2YXIgaG9zdE1ldGEgPSBjcmVhdGVIb3N0Q29tcG9uZW50TWV0YShjb21wTWV0YS50eXBlLCBjb21wTWV0YS5zZWxlY3Rvcik7XG4gICAgICAgIHZhciB2aWV3RmFjdG9yeUV4cHJlc3Npb24gPVxuICAgICAgICAgICAgdGhpcy5fY29tcGlsZUNvbXBvbmVudENvZGVHZW4oaG9zdE1ldGEsIFtjb21wTWV0YV0sIFtdLCBkZWNsYXJhdGlvbnMpO1xuICAgICAgICB2YXIgY29uc3RydWN0aW9uS2V5d29yZCA9IElTX0RBUlQgPyAnY29uc3QnIDogJ25ldyc7XG4gICAgICAgIHZhciBjb21waWxlZFRlbXBsYXRlRXhwciA9XG4gICAgICAgICAgICBgJHtjb25zdHJ1Y3Rpb25LZXl3b3JkfSAke0FQUF9WSUVXX01PRFVMRV9SRUZ9SG9zdFZpZXdGYWN0b3J5KCcke2NvbXBNZXRhLnNlbGVjdG9yfScsJHt2aWV3RmFjdG9yeUV4cHJlc3Npb259KWA7XG4gICAgICAgIHZhciB2YXJOYW1lID0gY29kZUdlbkhvc3RWaWV3RmFjdG9yeU5hbWUoY29tcE1ldGEudHlwZSk7XG4gICAgICAgIGRlY2xhcmF0aW9ucy5wdXNoKGAke2NvZGVHZW5FeHBvcnRWYXJpYWJsZSh2YXJOYW1lKX0ke2NvbXBpbGVkVGVtcGxhdGVFeHByfTtgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB2YXIgbW9kdWxlVXJsID0gY29tcG9uZW50c1swXS5jb21wb25lbnQudHlwZS5tb2R1bGVVcmw7XG4gICAgcmV0dXJuIG5ldyBTb3VyY2VNb2R1bGUoYCR7dGVtcGxhdGVNb2R1bGVVcmwobW9kdWxlVXJsKX1gLCBkZWNsYXJhdGlvbnMuam9pbignXFxuJykpO1xuICB9XG5cbiAgY29tcGlsZVN0eWxlc2hlZXRDb2RlR2VuKHN0eWxlc2hlZXRVcmw6IHN0cmluZywgY3NzVGV4dDogc3RyaW5nKTogU291cmNlTW9kdWxlW10ge1xuICAgIHJldHVybiB0aGlzLl9zdHlsZUNvbXBpbGVyLmNvbXBpbGVTdHlsZXNoZWV0Q29kZUdlbihzdHlsZXNoZWV0VXJsLCBjc3NUZXh0KTtcbiAgfVxuXG5cblxuICBwcml2YXRlIF9jb21waWxlQ29tcG9uZW50UnVudGltZShjYWNoZUtleTogYW55LCBjb21wTWV0YTogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3RGlyZWN0aXZlczogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpcGVzOiBDb21waWxlUGlwZU1ldGFkYXRhW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBpbGluZ0NvbXBvbmVudHNQYXRoOiBhbnlbXSk6IENvbXBpbGVkVGVtcGxhdGUge1xuICAgIGxldCB1bmlxVmlld0RpcmVjdGl2ZXMgPSA8Q29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhW10+cmVtb3ZlRHVwbGljYXRlcyh2aWV3RGlyZWN0aXZlcyk7XG4gICAgbGV0IHVuaXFWaWV3UGlwZXMgPSA8Q29tcGlsZVBpcGVNZXRhZGF0YVtdPnJlbW92ZUR1cGxpY2F0ZXMocGlwZXMpO1xuICAgIHZhciBjb21waWxlZFRlbXBsYXRlID0gdGhpcy5fY29tcGlsZWRUZW1wbGF0ZUNhY2hlLmdldChjYWNoZUtleSk7XG4gICAgdmFyIGRvbmUgPSB0aGlzLl9jb21waWxlZFRlbXBsYXRlRG9uZS5nZXQoY2FjaGVLZXkpO1xuICAgIGlmIChpc0JsYW5rKGNvbXBpbGVkVGVtcGxhdGUpKSB7XG4gICAgICBjb21waWxlZFRlbXBsYXRlID0gbmV3IENvbXBpbGVkVGVtcGxhdGUoKTtcbiAgICAgIHRoaXMuX2NvbXBpbGVkVGVtcGxhdGVDYWNoZS5zZXQoY2FjaGVLZXksIGNvbXBpbGVkVGVtcGxhdGUpO1xuICAgICAgZG9uZSA9IFByb21pc2VXcmFwcGVyXG4gICAgICAgICAgICAgICAgIC5hbGwoWzxhbnk+dGhpcy5fc3R5bGVDb21waWxlci5jb21waWxlQ29tcG9uZW50UnVudGltZShjb21wTWV0YS50ZW1wbGF0ZSldLmNvbmNhdChcbiAgICAgICAgICAgICAgICAgICAgIHVuaXFWaWV3RGlyZWN0aXZlcy5tYXAoZGlyTWV0YSA9PiB0aGlzLm5vcm1hbGl6ZURpcmVjdGl2ZU1ldGFkYXRhKGRpck1ldGEpKSkpXG4gICAgICAgICAgICAgICAgIC50aGVuKChzdHlsZXNBbmROb3JtYWxpemVkVmlld0Rpck1ldGFzOiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgIHZhciBub3JtYWxpemVkVmlld0Rpck1ldGFzID0gc3R5bGVzQW5kTm9ybWFsaXplZFZpZXdEaXJNZXRhcy5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICAgICB2YXIgc3R5bGVzID0gc3R5bGVzQW5kTm9ybWFsaXplZFZpZXdEaXJNZXRhc1swXTtcbiAgICAgICAgICAgICAgICAgICB2YXIgcGFyc2VkVGVtcGxhdGUgPSB0aGlzLl90ZW1wbGF0ZVBhcnNlci5wYXJzZShcbiAgICAgICAgICAgICAgICAgICAgICAgY29tcE1ldGEudGVtcGxhdGUudGVtcGxhdGUsIG5vcm1hbGl6ZWRWaWV3RGlyTWV0YXMsIHVuaXFWaWV3UGlwZXMsXG4gICAgICAgICAgICAgICAgICAgICAgIGNvbXBNZXRhLnR5cGUubmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICB2YXIgY2hpbGRQcm9taXNlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgIHZhciB1c2VkRGlyZWN0aXZlcyA9IERpcmVjdGl2ZUNvbGxlY3Rvci5maW5kVXNlZERpcmVjdGl2ZXMocGFyc2VkVGVtcGxhdGUpO1xuICAgICAgICAgICAgICAgICAgIHVzZWREaXJlY3RpdmVzLmNvbXBvbmVudHMuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50ID0+IHRoaXMuX2NvbXBpbGVOZXN0ZWRDb21wb25lbnRSdW50aW1lKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50LCBjb21waWxpbmdDb21wb25lbnRzUGF0aCwgY2hpbGRQcm9taXNlcykpO1xuICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlV3JhcHBlci5hbGwoY2hpbGRQcm9taXNlcylcbiAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKF8pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsdGVyZWRQaXBlcyA9IGZpbHRlclBpcGVzKHBhcnNlZFRlbXBsYXRlLCB1bmlxVmlld1BpcGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICBjb21waWxlZFRlbXBsYXRlLmluaXQodGhpcy5fY3JlYXRlVmlld0ZhY3RvcnlSdW50aW1lKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wTWV0YSwgcGFyc2VkVGVtcGxhdGUsIHVzZWREaXJlY3RpdmVzLmRpcmVjdGl2ZXMsIHN0eWxlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRQaXBlcykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb21waWxlZFRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgfSk7XG4gICAgICB0aGlzLl9jb21waWxlZFRlbXBsYXRlRG9uZS5zZXQoY2FjaGVLZXksIGRvbmUpO1xuICAgIH1cbiAgICByZXR1cm4gY29tcGlsZWRUZW1wbGF0ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbXBpbGVOZXN0ZWRDb21wb25lbnRSdW50aW1lKGNoaWxkQ29tcG9uZW50RGlyOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudENvbXBpbGluZ0NvbXBvbmVudHNQYXRoOiBhbnlbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRQcm9taXNlczogUHJvbWlzZTxhbnk+W10pIHtcbiAgICB2YXIgY29tcGlsaW5nQ29tcG9uZW50c1BhdGggPSBMaXN0V3JhcHBlci5jbG9uZShwYXJlbnRDb21waWxpbmdDb21wb25lbnRzUGF0aCk7XG5cbiAgICB2YXIgY2hpbGRDYWNoZUtleSA9IGNoaWxkQ29tcG9uZW50RGlyLnR5cGUucnVudGltZTtcbiAgICB2YXIgY2hpbGRWaWV3RGlyZWN0aXZlczogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhW10gPVxuICAgICAgICB0aGlzLl9ydW50aW1lTWV0YWRhdGFSZXNvbHZlci5nZXRWaWV3RGlyZWN0aXZlc01ldGFkYXRhKGNoaWxkQ29tcG9uZW50RGlyLnR5cGUucnVudGltZSk7XG4gICAgdmFyIGNoaWxkVmlld1BpcGVzOiBDb21waWxlUGlwZU1ldGFkYXRhW10gPVxuICAgICAgICB0aGlzLl9ydW50aW1lTWV0YWRhdGFSZXNvbHZlci5nZXRWaWV3UGlwZXNNZXRhZGF0YShjaGlsZENvbXBvbmVudERpci50eXBlLnJ1bnRpbWUpO1xuICAgIHZhciBjaGlsZElzUmVjdXJzaXZlID0gTGlzdFdyYXBwZXIuY29udGFpbnMoY29tcGlsaW5nQ29tcG9uZW50c1BhdGgsIGNoaWxkQ2FjaGVLZXkpO1xuICAgIGNvbXBpbGluZ0NvbXBvbmVudHNQYXRoLnB1c2goY2hpbGRDYWNoZUtleSk7XG4gICAgdGhpcy5fY29tcGlsZUNvbXBvbmVudFJ1bnRpbWUoY2hpbGRDYWNoZUtleSwgY2hpbGRDb21wb25lbnREaXIsIGNoaWxkVmlld0RpcmVjdGl2ZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRWaWV3UGlwZXMsIGNvbXBpbGluZ0NvbXBvbmVudHNQYXRoKTtcbiAgICBpZiAoIWNoaWxkSXNSZWN1cnNpdmUpIHtcbiAgICAgIC8vIE9ubHkgd2FpdCBmb3IgYSBjaGlsZCBpZiBpdCBpcyBub3QgYSBjeWNsZVxuICAgICAgY2hpbGRQcm9taXNlcy5wdXNoKHRoaXMuX2NvbXBpbGVkVGVtcGxhdGVEb25lLmdldChjaGlsZENhY2hlS2V5KSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlVmlld0ZhY3RvcnlSdW50aW1lKGNvbXBNZXRhOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWRUZW1wbGF0ZTogVGVtcGxhdGVBc3RbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YVtdLCBzdHlsZXM6IHN0cmluZ1tdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGlwZXM6IENvbXBpbGVQaXBlTWV0YWRhdGFbXSk6IEZ1bmN0aW9uIHtcbiAgICBpZiAoSVNfREFSVCB8fCAhdGhpcy5fZ2VuQ29uZmlnLnVzZUppdCkge1xuICAgICAgdmFyIGNoYW5nZURldGVjdG9yRmFjdG9yaWVzID0gdGhpcy5fY2RDb21waWxlci5jb21waWxlQ29tcG9uZW50UnVudGltZShcbiAgICAgICAgICBjb21wTWV0YS50eXBlLCBjb21wTWV0YS5jaGFuZ2VEZXRlY3Rpb24sIHBhcnNlZFRlbXBsYXRlKTtcbiAgICAgIHZhciBwcm90b1ZpZXdzID0gdGhpcy5fcHJvdG9WaWV3Q29tcGlsZXIuY29tcGlsZVByb3RvVmlld1J1bnRpbWUoXG4gICAgICAgICAgdGhpcy5fcmVzb2x2ZWRNZXRhZGF0YUNhY2hlLCBjb21wTWV0YSwgcGFyc2VkVGVtcGxhdGUsIHBpcGVzKTtcbiAgICAgIHJldHVybiB0aGlzLl92aWV3Q29tcGlsZXIuY29tcGlsZUNvbXBvbmVudFJ1bnRpbWUoXG4gICAgICAgICAgY29tcE1ldGEsIHBhcnNlZFRlbXBsYXRlLCBzdHlsZXMsIHByb3RvVmlld3MucHJvdG9WaWV3cywgY2hhbmdlRGV0ZWN0b3JGYWN0b3JpZXMsXG4gICAgICAgICAgKGNvbXBNZXRhKSA9PiB0aGlzLl9nZXROZXN0ZWRDb21wb25lbnRWaWV3RmFjdG9yeShjb21wTWV0YSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZGVjbGFyYXRpb25zID0gW107XG4gICAgICB2YXIgdmlld0ZhY3RvcnlFeHByID0gdGhpcy5fY3JlYXRlVmlld0ZhY3RvcnlDb2RlR2VuKCdyZXNvbHZlZE1ldGFkYXRhQ2FjaGUnLCBjb21wTWV0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFNvdXJjZUV4cHJlc3Npb24oW10sICdzdHlsZXMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkVGVtcGxhdGUsIHBpcGVzLCBkZWNsYXJhdGlvbnMpO1xuICAgICAgdmFyIHZhcnM6IHtba2V5OiBzdHJpbmddOiBhbnl9ID1cbiAgICAgICAgICB7J2V4cG9ydHMnOiB7fSwgJ3N0eWxlcyc6IHN0eWxlcywgJ3Jlc29sdmVkTWV0YWRhdGFDYWNoZSc6IHRoaXMuX3Jlc29sdmVkTWV0YWRhdGFDYWNoZX07XG4gICAgICBkaXJlY3RpdmVzLmZvckVhY2goZGlyTWV0YSA9PiB7XG4gICAgICAgIHZhcnNbZGlyTWV0YS50eXBlLm5hbWVdID0gZGlyTWV0YS50eXBlLnJ1bnRpbWU7XG4gICAgICAgIGlmIChkaXJNZXRhLmlzQ29tcG9uZW50ICYmIGRpck1ldGEudHlwZS5ydW50aW1lICE9PSBjb21wTWV0YS50eXBlLnJ1bnRpbWUpIHtcbiAgICAgICAgICB2YXJzW2B2aWV3RmFjdG9yeV8ke2Rpck1ldGEudHlwZS5uYW1lfTBgXSA9IHRoaXMuX2dldE5lc3RlZENvbXBvbmVudFZpZXdGYWN0b3J5KGRpck1ldGEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHBpcGVzLmZvckVhY2gocGlwZU1ldGEgPT4gdmFyc1twaXBlTWV0YS50eXBlLm5hbWVdID0gcGlwZU1ldGEudHlwZS5ydW50aW1lKTtcbiAgICAgIHZhciBkZWNsYXJhdGlvbnNXaXRob3V0SW1wb3J0cyA9XG4gICAgICAgICAgU291cmNlTW9kdWxlLmdldFNvdXJjZVdpdGhvdXRJbXBvcnRzKGRlY2xhcmF0aW9ucy5qb2luKCdcXG4nKSk7XG4gICAgICByZXR1cm4gZXZhbEV4cHJlc3Npb24oXG4gICAgICAgICAgYHZpZXdGYWN0b3J5XyR7Y29tcE1ldGEudHlwZS5uYW1lfWAsIHZpZXdGYWN0b3J5RXhwciwgZGVjbGFyYXRpb25zV2l0aG91dEltcG9ydHMsXG4gICAgICAgICAgbWVyZ2VTdHJpbmdNYXBzKFxuICAgICAgICAgICAgICBbdmFycywgQ0hBTkdFX0RFVEVDVElPTl9KSVRfSU1QT1JUUywgUFJPVE9fVklFV19KSVRfSU1QT1JUUywgVklFV19KSVRfSU1QT1JUU10pKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9nZXROZXN0ZWRDb21wb25lbnRWaWV3RmFjdG9yeShjb21wTWV0YTogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhKTogRnVuY3Rpb24ge1xuICAgIHJldHVybiB0aGlzLl9jb21waWxlZFRlbXBsYXRlQ2FjaGUuZ2V0KGNvbXBNZXRhLnR5cGUucnVudGltZSkudmlld0ZhY3Rvcnk7XG4gIH1cblxuICBwcml2YXRlIF9jb21waWxlQ29tcG9uZW50Q29kZUdlbihjb21wTWV0YTogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGFbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGlwZXM6IENvbXBpbGVQaXBlTWV0YWRhdGFbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RGVjbGFyYXRpb25zOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gICAgbGV0IHVuaXF1ZURpcmVjdGl2ZXMgPSA8Q29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhW10+cmVtb3ZlRHVwbGljYXRlcyhkaXJlY3RpdmVzKTtcbiAgICBsZXQgdW5pcVBpcGVzID0gPENvbXBpbGVQaXBlTWV0YWRhdGFbXT5yZW1vdmVEdXBsaWNhdGVzKHBpcGVzKTtcbiAgICB2YXIgc3R5bGVFeHByID0gdGhpcy5fc3R5bGVDb21waWxlci5jb21waWxlQ29tcG9uZW50Q29kZUdlbihjb21wTWV0YS50ZW1wbGF0ZSk7XG4gICAgdmFyIHBhcnNlZFRlbXBsYXRlID0gdGhpcy5fdGVtcGxhdGVQYXJzZXIucGFyc2UoY29tcE1ldGEudGVtcGxhdGUudGVtcGxhdGUsIHVuaXF1ZURpcmVjdGl2ZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pcVBpcGVzLCBjb21wTWV0YS50eXBlLm5hbWUpO1xuICAgIHZhciBmaWx0ZXJlZFBpcGVzID0gZmlsdGVyUGlwZXMocGFyc2VkVGVtcGxhdGUsIHVuaXFQaXBlcyk7XG4gICAgcmV0dXJuIHRoaXMuX2NyZWF0ZVZpZXdGYWN0b3J5Q29kZUdlbihcbiAgICAgICAgYCR7TUVUQURBVEFfQ0FDSEVfTU9EVUxFX1JFRn1DT0RFR0VOX1JFU09MVkVEX01FVEFEQVRBX0NBQ0hFYCwgY29tcE1ldGEsIHN0eWxlRXhwcixcbiAgICAgICAgcGFyc2VkVGVtcGxhdGUsIGZpbHRlcmVkUGlwZXMsIHRhcmdldERlY2xhcmF0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVWaWV3RmFjdG9yeUNvZGVHZW4ocmVzb2x2ZWRNZXRhZGF0YUNhY2hlRXhwcjogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcE1ldGE6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSwgc3R5bGVFeHByOiBTb3VyY2VFeHByZXNzaW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkVGVtcGxhdGU6IFRlbXBsYXRlQXN0W10sIHBpcGVzOiBDb21waWxlUGlwZU1ldGFkYXRhW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXREZWNsYXJhdGlvbnM6IHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgICB2YXIgY2hhbmdlRGV0ZWN0b3JzRXhwcnMgPSB0aGlzLl9jZENvbXBpbGVyLmNvbXBpbGVDb21wb25lbnRDb2RlR2VuKFxuICAgICAgICBjb21wTWV0YS50eXBlLCBjb21wTWV0YS5jaGFuZ2VEZXRlY3Rpb24sIHBhcnNlZFRlbXBsYXRlKTtcbiAgICB2YXIgcHJvdG9WaWV3RXhwcnMgPSB0aGlzLl9wcm90b1ZpZXdDb21waWxlci5jb21waWxlUHJvdG9WaWV3Q29kZUdlbihcbiAgICAgICAgbmV3IEV4cHJlc3Npb24ocmVzb2x2ZWRNZXRhZGF0YUNhY2hlRXhwciksIGNvbXBNZXRhLCBwYXJzZWRUZW1wbGF0ZSwgcGlwZXMpO1xuICAgIHZhciB2aWV3RmFjdG9yeUV4cHIgPSB0aGlzLl92aWV3Q29tcGlsZXIuY29tcGlsZUNvbXBvbmVudENvZGVHZW4oXG4gICAgICAgIGNvbXBNZXRhLCBwYXJzZWRUZW1wbGF0ZSwgc3R5bGVFeHByLCBwcm90b1ZpZXdFeHBycy5wcm90b1ZpZXdzLCBjaGFuZ2VEZXRlY3RvcnNFeHBycyxcbiAgICAgICAgY29kZUdlbkNvbXBvbmVudFZpZXdGYWN0b3J5TmFtZSk7XG5cbiAgICBhZGRBbGwoY2hhbmdlRGV0ZWN0b3JzRXhwcnMuZGVjbGFyYXRpb25zLCB0YXJnZXREZWNsYXJhdGlvbnMpO1xuICAgIGFkZEFsbChwcm90b1ZpZXdFeHBycy5kZWNsYXJhdGlvbnMsIHRhcmdldERlY2xhcmF0aW9ucyk7XG4gICAgYWRkQWxsKHZpZXdGYWN0b3J5RXhwci5kZWNsYXJhdGlvbnMsIHRhcmdldERlY2xhcmF0aW9ucyk7XG5cbiAgICByZXR1cm4gdmlld0ZhY3RvcnlFeHByLmV4cHJlc3Npb247XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIE5vcm1hbGl6ZWRDb21wb25lbnRXaXRoVmlld0RpcmVjdGl2ZXMge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29tcG9uZW50OiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsXG4gICAgICAgICAgICAgIHB1YmxpYyBkaXJlY3RpdmVzOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGFbXSwgcHVibGljIHBpcGVzOiBDb21waWxlUGlwZU1ldGFkYXRhW10pIHt9XG59XG5cbmNsYXNzIENvbXBpbGVkVGVtcGxhdGUge1xuICB2aWV3RmFjdG9yeTogRnVuY3Rpb24gPSBudWxsO1xuICBpbml0KHZpZXdGYWN0b3J5OiBGdW5jdGlvbikgeyB0aGlzLnZpZXdGYWN0b3J5ID0gdmlld0ZhY3Rvcnk7IH1cbn1cblxuZnVuY3Rpb24gYXNzZXJ0Q29tcG9uZW50KG1ldGE6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSkge1xuICBpZiAoIW1ldGEuaXNDb21wb25lbnQpIHtcbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgQ291bGQgbm90IGNvbXBpbGUgJyR7bWV0YS50eXBlLm5hbWV9JyBiZWNhdXNlIGl0IGlzIG5vdCBhIGNvbXBvbmVudC5gKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB0ZW1wbGF0ZU1vZHVsZVVybChtb2R1bGVVcmw6IHN0cmluZyk6IHN0cmluZyB7XG4gIHZhciB1cmxXaXRob3V0U3VmZml4ID0gbW9kdWxlVXJsLnN1YnN0cmluZygwLCBtb2R1bGVVcmwubGVuZ3RoIC0gTU9EVUxFX1NVRkZJWC5sZW5ndGgpO1xuICByZXR1cm4gYCR7dXJsV2l0aG91dFN1ZmZpeH0udGVtcGxhdGUke01PRFVMRV9TVUZGSVh9YDtcbn1cblxuXG5mdW5jdGlvbiBjb2RlR2VuSG9zdFZpZXdGYWN0b3J5TmFtZSh0eXBlOiBDb21waWxlVHlwZU1ldGFkYXRhKTogc3RyaW5nIHtcbiAgcmV0dXJuIGBob3N0Vmlld0ZhY3RvcnlfJHt0eXBlLm5hbWV9YDtcbn1cblxuZnVuY3Rpb24gY29kZUdlbkNvbXBvbmVudFZpZXdGYWN0b3J5TmFtZShuZXN0ZWRDb21wVHlwZTogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAke21vZHVsZVJlZih0ZW1wbGF0ZU1vZHVsZVVybChuZXN0ZWRDb21wVHlwZS50eXBlLm1vZHVsZVVybCkpfXZpZXdGYWN0b3J5XyR7bmVzdGVkQ29tcFR5cGUudHlwZS5uYW1lfTBgO1xufVxuXG5mdW5jdGlvbiBtZXJnZVN0cmluZ01hcHMobWFwczogQXJyYXk8e1trZXk6IHN0cmluZ106IGFueX0+KToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIG1hcHMuZm9yRWFjaChcbiAgICAgIChtYXApID0+IHsgU3RyaW5nTWFwV3JhcHBlci5mb3JFYWNoKG1hcCwgKHZhbHVlLCBrZXkpID0+IHsgcmVzdWx0W2tleV0gPSB2YWx1ZTsgfSk7IH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiByZW1vdmVEdXBsaWNhdGVzKGl0ZW1zOiBDb21waWxlTWV0YWRhdGFXaXRoVHlwZVtdKTogQ29tcGlsZU1ldGFkYXRhV2l0aFR5cGVbXSB7XG4gIGxldCByZXMgPSBbXTtcbiAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICBsZXQgaGFzTWF0Y2ggPVxuICAgICAgICByZXMuZmlsdGVyKHIgPT4gci50eXBlLm5hbWUgPT0gaXRlbS50eXBlLm5hbWUgJiYgci50eXBlLm1vZHVsZVVybCA9PSBpdGVtLnR5cGUubW9kdWxlVXJsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICByLnR5cGUucnVudGltZSA9PSBpdGVtLnR5cGUucnVudGltZSlcbiAgICAgICAgICAgIC5sZW5ndGggPiAwO1xuICAgIGlmICghaGFzTWF0Y2gpIHtcbiAgICAgIHJlcy5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXM7XG59XG5cbmNsYXNzIERpcmVjdGl2ZUNvbGxlY3RvciBpbXBsZW1lbnRzIFRlbXBsYXRlQXN0VmlzaXRvciB7XG4gIHN0YXRpYyBmaW5kVXNlZERpcmVjdGl2ZXMocGFyc2VkVGVtcGxhdGU6IFRlbXBsYXRlQXN0W10pOiBEaXJlY3RpdmVDb2xsZWN0b3Ige1xuICAgIHZhciBjb2xsZWN0b3IgPSBuZXcgRGlyZWN0aXZlQ29sbGVjdG9yKCk7XG4gICAgdGVtcGxhdGVWaXNpdEFsbChjb2xsZWN0b3IsIHBhcnNlZFRlbXBsYXRlKTtcbiAgICByZXR1cm4gY29sbGVjdG9yO1xuICB9XG5cbiAgZGlyZWN0aXZlczogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhW10gPSBbXTtcbiAgY29tcG9uZW50czogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhW10gPSBbXTtcblxuICB2aXNpdEJvdW5kVGV4dChhc3Q6IEJvdW5kVGV4dEFzdCwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIG51bGw7IH1cbiAgdmlzaXRUZXh0KGFzdDogVGV4dEFzdCwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIG51bGw7IH1cblxuICB2aXNpdE5nQ29udGVudChhc3Q6IE5nQ29udGVudEFzdCwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIG51bGw7IH1cblxuICB2aXNpdEVsZW1lbnQoYXN0OiBFbGVtZW50QXN0LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRlbXBsYXRlVmlzaXRBbGwodGhpcywgYXN0LmRpcmVjdGl2ZXMpO1xuICAgIHRlbXBsYXRlVmlzaXRBbGwodGhpcywgYXN0LmNoaWxkcmVuKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZpc2l0RW1iZWRkZWRUZW1wbGF0ZShhc3Q6IEVtYmVkZGVkVGVtcGxhdGVBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgdGVtcGxhdGVWaXNpdEFsbCh0aGlzLCBhc3QuZGlyZWN0aXZlcyk7XG4gICAgdGVtcGxhdGVWaXNpdEFsbCh0aGlzLCBhc3QuY2hpbGRyZW4pO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0VmFyaWFibGUoYXN0OiBWYXJpYWJsZUFzdCwgY3R4OiBhbnkpOiBhbnkgeyByZXR1cm4gbnVsbDsgfVxuICB2aXNpdEF0dHIoYXN0OiBBdHRyQXN0LCBhdHRyTmFtZUFuZFZhbHVlczoge1trZXk6IHN0cmluZ106IHN0cmluZ30pOiBhbnkgeyByZXR1cm4gbnVsbDsgfVxuICB2aXNpdERpcmVjdGl2ZShhc3Q6IERpcmVjdGl2ZUFzdCwgY3R4OiBhbnkpOiBhbnkge1xuICAgIGlmIChhc3QuZGlyZWN0aXZlLmlzQ29tcG9uZW50KSB7XG4gICAgICB0aGlzLmNvbXBvbmVudHMucHVzaChhc3QuZGlyZWN0aXZlKTtcbiAgICB9XG4gICAgdGhpcy5kaXJlY3RpdmVzLnB1c2goYXN0LmRpcmVjdGl2ZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXRFdmVudChhc3Q6IEJvdW5kRXZlbnRBc3QsIGV2ZW50VGFyZ2V0QW5kTmFtZXM6IE1hcDxzdHJpbmcsIEJvdW5kRXZlbnRBc3Q+KTogYW55IHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdERpcmVjdGl2ZVByb3BlcnR5KGFzdDogQm91bmREaXJlY3RpdmVQcm9wZXJ0eUFzdCwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIG51bGw7IH1cbiAgdmlzaXRFbGVtZW50UHJvcGVydHkoYXN0OiBCb3VuZEVsZW1lbnRQcm9wZXJ0eUFzdCwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIG51bGw7IH1cbn1cblxuXG5mdW5jdGlvbiBmaWx0ZXJQaXBlcyh0ZW1wbGF0ZTogVGVtcGxhdGVBc3RbXSxcbiAgICAgICAgICAgICAgICAgICAgIGFsbFBpcGVzOiBDb21waWxlUGlwZU1ldGFkYXRhW10pOiBDb21waWxlUGlwZU1ldGFkYXRhW10ge1xuICB2YXIgdmlzaXRvciA9IG5ldyBQaXBlVmlzaXRvcigpO1xuICB0ZW1wbGF0ZVZpc2l0QWxsKHZpc2l0b3IsIHRlbXBsYXRlKTtcbiAgcmV0dXJuIGFsbFBpcGVzLmZpbHRlcigocGlwZU1ldGEpID0+IFNldFdyYXBwZXIuaGFzKHZpc2l0b3IuY29sbGVjdG9yLnBpcGVzLCBwaXBlTWV0YS5uYW1lKSk7XG59XG5cbmNsYXNzIFBpcGVWaXNpdG9yIGltcGxlbWVudHMgVGVtcGxhdGVBc3RWaXNpdG9yIHtcbiAgY29sbGVjdG9yOiBQaXBlQ29sbGVjdG9yID0gbmV3IFBpcGVDb2xsZWN0b3IoKTtcblxuICB2aXNpdEJvdW5kVGV4dChhc3Q6IEJvdW5kVGV4dEFzdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICBhc3QudmFsdWUudmlzaXQodGhpcy5jb2xsZWN0b3IpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0VGV4dChhc3Q6IFRleHRBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBudWxsOyB9XG5cbiAgdmlzaXROZ0NvbnRlbnQoYXN0OiBOZ0NvbnRlbnRBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBudWxsOyB9XG5cbiAgdmlzaXRFbGVtZW50KGFzdDogRWxlbWVudEFzdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB0ZW1wbGF0ZVZpc2l0QWxsKHRoaXMsIGFzdC5pbnB1dHMpO1xuICAgIHRlbXBsYXRlVmlzaXRBbGwodGhpcywgYXN0Lm91dHB1dHMpO1xuICAgIHRlbXBsYXRlVmlzaXRBbGwodGhpcywgYXN0LmRpcmVjdGl2ZXMpO1xuICAgIHRlbXBsYXRlVmlzaXRBbGwodGhpcywgYXN0LmNoaWxkcmVuKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZpc2l0RW1iZWRkZWRUZW1wbGF0ZShhc3Q6IEVtYmVkZGVkVGVtcGxhdGVBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgdGVtcGxhdGVWaXNpdEFsbCh0aGlzLCBhc3Qub3V0cHV0cyk7XG4gICAgdGVtcGxhdGVWaXNpdEFsbCh0aGlzLCBhc3QuZGlyZWN0aXZlcyk7XG4gICAgdGVtcGxhdGVWaXNpdEFsbCh0aGlzLCBhc3QuY2hpbGRyZW4pO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0VmFyaWFibGUoYXN0OiBWYXJpYWJsZUFzdCwgY3R4OiBhbnkpOiBhbnkgeyByZXR1cm4gbnVsbDsgfVxuICB2aXNpdEF0dHIoYXN0OiBBdHRyQXN0LCBhdHRyTmFtZUFuZFZhbHVlczoge1trZXk6IHN0cmluZ106IHN0cmluZ30pOiBhbnkgeyByZXR1cm4gbnVsbDsgfVxuICB2aXNpdERpcmVjdGl2ZShhc3Q6IERpcmVjdGl2ZUFzdCwgY3R4OiBhbnkpOiBhbnkge1xuICAgIHRlbXBsYXRlVmlzaXRBbGwodGhpcywgYXN0LmlucHV0cyk7XG4gICAgdGVtcGxhdGVWaXNpdEFsbCh0aGlzLCBhc3QuaG9zdEV2ZW50cyk7XG4gICAgdGVtcGxhdGVWaXNpdEFsbCh0aGlzLCBhc3QuaG9zdFByb3BlcnRpZXMpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0RXZlbnQoYXN0OiBCb3VuZEV2ZW50QXN0LCBldmVudFRhcmdldEFuZE5hbWVzOiBNYXA8c3RyaW5nLCBCb3VuZEV2ZW50QXN0Pik6IGFueSB7XG4gICAgYXN0LmhhbmRsZXIudmlzaXQodGhpcy5jb2xsZWN0b3IpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0RGlyZWN0aXZlUHJvcGVydHkoYXN0OiBCb3VuZERpcmVjdGl2ZVByb3BlcnR5QXN0LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIGFzdC52YWx1ZS52aXNpdCh0aGlzLmNvbGxlY3Rvcik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXRFbGVtZW50UHJvcGVydHkoYXN0OiBCb3VuZEVsZW1lbnRQcm9wZXJ0eUFzdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICBhc3QudmFsdWUudmlzaXQodGhpcy5jb2xsZWN0b3IpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
