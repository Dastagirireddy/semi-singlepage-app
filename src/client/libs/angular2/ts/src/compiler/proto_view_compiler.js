System.register(['angular2/src/facade/lang', 'angular2/src/facade/collection', './template_ast', './source_module', 'angular2/src/core/linker/view', 'angular2/src/core/linker/view_type', 'angular2/src/core/linker/element', './util', 'angular2/src/core/di'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var lang_1, collection_1, template_ast_1, source_module_1, view_1, view_type_1, element_1, util_1, di_1;
    var PROTO_VIEW_JIT_IMPORTS, APP_VIEW_MODULE_REF, VIEW_TYPE_MODULE_REF, APP_EL_MODULE_REF, METADATA_MODULE_REF, IMPLICIT_TEMPLATE_VAR, CLASS_ATTR, STYLE_ATTR, ProtoViewCompiler, CompileProtoViews, CompileProtoView, CompileProtoElement, ProtoViewFactory, CodeGenProtoViewFactory, RuntimeProtoViewFactory, ProtoViewBuilderVisitor, DirectiveContext;
    function visitAndReturnContext(visitor, asts, context) {
        template_ast_1.templateVisitAll(visitor, asts, context);
        return context;
    }
    function mapToKeyValueArray(data) {
        var entryArray = [];
        collection_1.StringMapWrapper.forEach(data, function (value, name) { entryArray.push([name, value]); });
        // We need to sort to get a defined output order
        // for tests and for caching generated artifacts...
        collection_1.ListWrapper.sort(entryArray, function (entry1, entry2) {
            return lang_1.StringWrapper.compare(entry1[0], entry2[0]);
        });
        var keyValueArray = [];
        entryArray.forEach(function (entry) { keyValueArray.push([entry[0], entry[1]]); });
        return keyValueArray;
    }
    function mergeAttributeValue(attrName, attrValue1, attrValue2) {
        if (attrName == CLASS_ATTR || attrName == STYLE_ATTR) {
            return attrValue1 + " " + attrValue2;
        }
        else {
            return attrValue2;
        }
    }
    function keyValueArrayToStringMap(keyValueArray) {
        var stringMap = {};
        for (var i = 0; i < keyValueArray.length; i++) {
            var entry = keyValueArray[i];
            stringMap[entry[0]] = entry[1];
        }
        return stringMap;
    }
    function codeGenDirectivesArray(directives) {
        var expressions = directives.map(function (directiveType) { return typeRef(directiveType.type); });
        return "[" + expressions.join(',') + "]";
    }
    function codeGenTypesArray(types) {
        var expressions = types.map(typeRef);
        return "[" + expressions.join(',') + "]";
    }
    function codeGenViewType(value) {
        if (lang_1.IS_DART) {
            return "" + VIEW_TYPE_MODULE_REF + value;
        }
        else {
            return "" + value;
        }
    }
    function typeRef(type) {
        return "" + source_module_1.moduleRef(type.moduleUrl) + type.name;
    }
    function getViewType(component, embeddedTemplateIndex) {
        if (embeddedTemplateIndex > 0) {
            return view_type_1.ViewType.EMBEDDED;
        }
        else if (component.type.isHost) {
            return view_type_1.ViewType.HOST;
        }
        else {
            return view_type_1.ViewType.COMPONENT;
        }
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (template_ast_1_1) {
                template_ast_1 = template_ast_1_1;
            },
            function (source_module_1_1) {
                source_module_1 = source_module_1_1;
            },
            function (view_1_1) {
                view_1 = view_1_1;
            },
            function (view_type_1_1) {
                view_type_1 = view_type_1_1;
            },
            function (element_1_1) {
                element_1 = element_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            }],
        execute: function() {
            exports_1("PROTO_VIEW_JIT_IMPORTS", PROTO_VIEW_JIT_IMPORTS = lang_1.CONST_EXPR({ 'AppProtoView': view_1.AppProtoView, 'AppProtoElement': element_1.AppProtoElement, 'ViewType': view_type_1.ViewType }));
            // TODO: have a single file that reexports everything needed for
            // codegen explicitly
            // - helps understanding what codegen works against
            // - less imports in codegen code
            exports_1("APP_VIEW_MODULE_REF", APP_VIEW_MODULE_REF = source_module_1.moduleRef('package:angular2/src/core/linker/view' + util_1.MODULE_SUFFIX));
            exports_1("VIEW_TYPE_MODULE_REF", VIEW_TYPE_MODULE_REF = source_module_1.moduleRef('package:angular2/src/core/linker/view_type' + util_1.MODULE_SUFFIX));
            exports_1("APP_EL_MODULE_REF", APP_EL_MODULE_REF = source_module_1.moduleRef('package:angular2/src/core/linker/element' + util_1.MODULE_SUFFIX));
            exports_1("METADATA_MODULE_REF", METADATA_MODULE_REF = source_module_1.moduleRef('package:angular2/src/core/metadata/view' + util_1.MODULE_SUFFIX));
            IMPLICIT_TEMPLATE_VAR = '\$implicit';
            CLASS_ATTR = 'class';
            STYLE_ATTR = 'style';
            ProtoViewCompiler = (function () {
                function ProtoViewCompiler() {
                }
                ProtoViewCompiler.prototype.compileProtoViewRuntime = function (metadataCache, component, template, pipes) {
                    var protoViewFactory = new RuntimeProtoViewFactory(metadataCache, component, pipes);
                    var allProtoViews = [];
                    protoViewFactory.createCompileProtoView(template, [], [], allProtoViews);
                    return new CompileProtoViews([], allProtoViews);
                };
                ProtoViewCompiler.prototype.compileProtoViewCodeGen = function (resolvedMetadataCacheExpr, component, template, pipes) {
                    var protoViewFactory = new CodeGenProtoViewFactory(resolvedMetadataCacheExpr, component, pipes);
                    var allProtoViews = [];
                    var allStatements = [];
                    protoViewFactory.createCompileProtoView(template, [], allStatements, allProtoViews);
                    return new CompileProtoViews(allStatements.map(function (stmt) { return stmt.statement; }), allProtoViews);
                };
                ProtoViewCompiler = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], ProtoViewCompiler);
                return ProtoViewCompiler;
            }());
            exports_1("ProtoViewCompiler", ProtoViewCompiler);
            CompileProtoViews = (function () {
                function CompileProtoViews(declarations, protoViews) {
                    this.declarations = declarations;
                    this.protoViews = protoViews;
                }
                return CompileProtoViews;
            }());
            exports_1("CompileProtoViews", CompileProtoViews);
            CompileProtoView = (function () {
                function CompileProtoView(embeddedTemplateIndex, protoElements, protoView) {
                    this.embeddedTemplateIndex = embeddedTemplateIndex;
                    this.protoElements = protoElements;
                    this.protoView = protoView;
                }
                return CompileProtoView;
            }());
            exports_1("CompileProtoView", CompileProtoView);
            CompileProtoElement = (function () {
                function CompileProtoElement(boundElementIndex, attrNameAndValues, variableNameAndValues, renderEvents, directives, embeddedTemplateIndex, appProtoEl) {
                    this.boundElementIndex = boundElementIndex;
                    this.attrNameAndValues = attrNameAndValues;
                    this.variableNameAndValues = variableNameAndValues;
                    this.renderEvents = renderEvents;
                    this.directives = directives;
                    this.embeddedTemplateIndex = embeddedTemplateIndex;
                    this.appProtoEl = appProtoEl;
                }
                return CompileProtoElement;
            }());
            exports_1("CompileProtoElement", CompileProtoElement);
            ProtoViewFactory = (function () {
                function ProtoViewFactory(component) {
                    this.component = component;
                }
                ProtoViewFactory.prototype.createCompileProtoView = function (template, templateVariableBindings, targetStatements, targetProtoViews) {
                    var embeddedTemplateIndex = targetProtoViews.length;
                    // Note: targetProtoViews needs to be in depth first order.
                    // So we "reserve" a space here that we fill after the recursion is done
                    targetProtoViews.push(null);
                    var builder = new ProtoViewBuilderVisitor(this, targetStatements, targetProtoViews);
                    template_ast_1.templateVisitAll(builder, template);
                    var viewType = getViewType(this.component, embeddedTemplateIndex);
                    var appProtoView = this.createAppProtoView(embeddedTemplateIndex, viewType, templateVariableBindings, targetStatements);
                    var cpv = new CompileProtoView(embeddedTemplateIndex, builder.protoElements, appProtoView);
                    targetProtoViews[embeddedTemplateIndex] = cpv;
                    return cpv;
                };
                return ProtoViewFactory;
            }());
            CodeGenProtoViewFactory = (function (_super) {
                __extends(CodeGenProtoViewFactory, _super);
                function CodeGenProtoViewFactory(resolvedMetadataCacheExpr, component, pipes) {
                    _super.call(this, component);
                    this.resolvedMetadataCacheExpr = resolvedMetadataCacheExpr;
                    this.pipes = pipes;
                    this._nextVarId = 0;
                }
                CodeGenProtoViewFactory.prototype._nextProtoViewVar = function (embeddedTemplateIndex) {
                    return "appProtoView" + this._nextVarId++ + "_" + this.component.type.name + embeddedTemplateIndex;
                };
                CodeGenProtoViewFactory.prototype.createAppProtoView = function (embeddedTemplateIndex, viewType, templateVariableBindings, targetStatements) {
                    var protoViewVarName = this._nextProtoViewVar(embeddedTemplateIndex);
                    var viewTypeExpr = codeGenViewType(viewType);
                    var pipesExpr = embeddedTemplateIndex === 0 ?
                        codeGenTypesArray(this.pipes.map(function (pipeMeta) { return pipeMeta.type; })) :
                        null;
                    var statement = "var " + protoViewVarName + " = " + APP_VIEW_MODULE_REF + "AppProtoView.create(" + this.resolvedMetadataCacheExpr.expression + ", " + viewTypeExpr + ", " + pipesExpr + ", " + util_1.codeGenStringMap(templateVariableBindings) + ");";
                    targetStatements.push(new util_1.Statement(statement));
                    return new util_1.Expression(protoViewVarName);
                };
                CodeGenProtoViewFactory.prototype.createAppProtoElement = function (boundElementIndex, attrNameAndValues, variableNameAndValues, directives, targetStatements) {
                    var varName = "appProtoEl" + this._nextVarId++ + "_" + this.component.type.name;
                    var value = APP_EL_MODULE_REF + "AppProtoElement.create(\n        " + this.resolvedMetadataCacheExpr.expression + ",\n        " + boundElementIndex + ",\n        " + util_1.codeGenStringMap(attrNameAndValues) + ",\n        " + codeGenDirectivesArray(directives) + ",\n        " + util_1.codeGenStringMap(variableNameAndValues) + "\n      )";
                    var statement = "var " + varName + " = " + value + ";";
                    targetStatements.push(new util_1.Statement(statement));
                    return new util_1.Expression(varName);
                };
                return CodeGenProtoViewFactory;
            }(ProtoViewFactory));
            RuntimeProtoViewFactory = (function (_super) {
                __extends(RuntimeProtoViewFactory, _super);
                function RuntimeProtoViewFactory(metadataCache, component, pipes) {
                    _super.call(this, component);
                    this.metadataCache = metadataCache;
                    this.pipes = pipes;
                }
                RuntimeProtoViewFactory.prototype.createAppProtoView = function (embeddedTemplateIndex, viewType, templateVariableBindings, targetStatements) {
                    var pipes = embeddedTemplateIndex === 0 ? this.pipes.map(function (pipeMeta) { return pipeMeta.type.runtime; }) : [];
                    var templateVars = keyValueArrayToStringMap(templateVariableBindings);
                    return view_1.AppProtoView.create(this.metadataCache, viewType, pipes, templateVars);
                };
                RuntimeProtoViewFactory.prototype.createAppProtoElement = function (boundElementIndex, attrNameAndValues, variableNameAndValues, directives, targetStatements) {
                    var attrs = keyValueArrayToStringMap(attrNameAndValues);
                    return element_1.AppProtoElement.create(this.metadataCache, boundElementIndex, attrs, directives.map(function (dirMeta) { return dirMeta.type.runtime; }), keyValueArrayToStringMap(variableNameAndValues));
                };
                return RuntimeProtoViewFactory;
            }(ProtoViewFactory));
            ProtoViewBuilderVisitor = (function () {
                function ProtoViewBuilderVisitor(factory, allStatements, allProtoViews) {
                    this.factory = factory;
                    this.allStatements = allStatements;
                    this.allProtoViews = allProtoViews;
                    this.protoElements = [];
                    this.boundElementCount = 0;
                }
                ProtoViewBuilderVisitor.prototype._readAttrNameAndValues = function (directives, attrAsts) {
                    var attrs = visitAndReturnContext(this, attrAsts, {});
                    directives.forEach(function (directiveMeta) {
                        collection_1.StringMapWrapper.forEach(directiveMeta.hostAttributes, function (value, name) {
                            var prevValue = attrs[name];
                            attrs[name] = lang_1.isPresent(prevValue) ? mergeAttributeValue(name, prevValue, value) : value;
                        });
                    });
                    return mapToKeyValueArray(attrs);
                };
                ProtoViewBuilderVisitor.prototype.visitBoundText = function (ast, context) { return null; };
                ProtoViewBuilderVisitor.prototype.visitText = function (ast, context) { return null; };
                ProtoViewBuilderVisitor.prototype.visitNgContent = function (ast, context) { return null; };
                ProtoViewBuilderVisitor.prototype.visitElement = function (ast, context) {
                    var _this = this;
                    var boundElementIndex = null;
                    if (ast.isBound()) {
                        boundElementIndex = this.boundElementCount++;
                    }
                    var component = ast.getComponent();
                    var variableNameAndValues = [];
                    if (lang_1.isBlank(component)) {
                        ast.exportAsVars.forEach(function (varAst) { variableNameAndValues.push([varAst.name, null]); });
                    }
                    var directives = [];
                    var renderEvents = visitAndReturnContext(this, ast.outputs, new Map());
                    collection_1.ListWrapper.forEachWithIndex(ast.directives, function (directiveAst, index) {
                        directiveAst.visit(_this, new DirectiveContext(index, boundElementIndex, renderEvents, variableNameAndValues, directives));
                    });
                    var renderEventArray = [];
                    renderEvents.forEach(function (eventAst, _) { return renderEventArray.push(eventAst); });
                    var attrNameAndValues = this._readAttrNameAndValues(directives, ast.attrs);
                    this._addProtoElement(ast.isBound(), boundElementIndex, attrNameAndValues, variableNameAndValues, renderEventArray, directives, null);
                    template_ast_1.templateVisitAll(this, ast.children);
                    return null;
                };
                ProtoViewBuilderVisitor.prototype.visitEmbeddedTemplate = function (ast, context) {
                    var _this = this;
                    var boundElementIndex = this.boundElementCount++;
                    var directives = [];
                    collection_1.ListWrapper.forEachWithIndex(ast.directives, function (directiveAst, index) {
                        directiveAst.visit(_this, new DirectiveContext(index, boundElementIndex, new Map(), [], directives));
                    });
                    var attrNameAndValues = this._readAttrNameAndValues(directives, ast.attrs);
                    var templateVariableBindings = ast.vars.map(function (varAst) { return [varAst.value.length > 0 ? varAst.value : IMPLICIT_TEMPLATE_VAR, varAst.name]; });
                    var nestedProtoView = this.factory.createCompileProtoView(ast.children, templateVariableBindings, this.allStatements, this.allProtoViews);
                    this._addProtoElement(true, boundElementIndex, attrNameAndValues, [], [], directives, nestedProtoView.embeddedTemplateIndex);
                    return null;
                };
                ProtoViewBuilderVisitor.prototype._addProtoElement = function (isBound, boundElementIndex, attrNameAndValues, variableNameAndValues, renderEvents, directives, embeddedTemplateIndex) {
                    var appProtoEl = null;
                    if (isBound) {
                        appProtoEl =
                            this.factory.createAppProtoElement(boundElementIndex, attrNameAndValues, variableNameAndValues, directives, this.allStatements);
                    }
                    var compileProtoEl = new CompileProtoElement(boundElementIndex, attrNameAndValues, variableNameAndValues, renderEvents, directives, embeddedTemplateIndex, appProtoEl);
                    this.protoElements.push(compileProtoEl);
                };
                ProtoViewBuilderVisitor.prototype.visitVariable = function (ast, ctx) { return null; };
                ProtoViewBuilderVisitor.prototype.visitAttr = function (ast, attrNameAndValues) {
                    attrNameAndValues[ast.name] = ast.value;
                    return null;
                };
                ProtoViewBuilderVisitor.prototype.visitDirective = function (ast, ctx) {
                    ctx.targetDirectives.push(ast.directive);
                    template_ast_1.templateVisitAll(this, ast.hostEvents, ctx.hostEventTargetAndNames);
                    ast.exportAsVars.forEach(function (varAst) { ctx.targetVariableNameAndValues.push([varAst.name, ctx.index]); });
                    return null;
                };
                ProtoViewBuilderVisitor.prototype.visitEvent = function (ast, eventTargetAndNames) {
                    eventTargetAndNames.set(ast.fullName, ast);
                    return null;
                };
                ProtoViewBuilderVisitor.prototype.visitDirectiveProperty = function (ast, context) { return null; };
                ProtoViewBuilderVisitor.prototype.visitElementProperty = function (ast, context) { return null; };
                return ProtoViewBuilderVisitor;
            }());
            DirectiveContext = (function () {
                function DirectiveContext(index, boundElementIndex, hostEventTargetAndNames, targetVariableNameAndValues, targetDirectives) {
                    this.index = index;
                    this.boundElementIndex = boundElementIndex;
                    this.hostEventTargetAndNames = hostEventTargetAndNames;
                    this.targetVariableNameAndValues = targetVariableNameAndValues;
                    this.targetDirectives = targetDirectives;
                }
                return DirectiveContext;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL3Byb3RvX3ZpZXdfY29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBcURhLHNCQUFzQixFQU94QixtQkFBbUIsRUFDbkIsb0JBQW9CLEVBRXBCLGlCQUFpQixFQUVqQixtQkFBbUIsRUFHeEIscUJBQXFCLEVBQ3JCLFVBQVUsRUFDVixVQUFVO0lBK0NoQiwrQkFBK0IsT0FBMkIsRUFBRSxJQUFtQixFQUNoRCxPQUFZO1FBQ3pDLCtCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDekMsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBa05ELDRCQUE0QixJQUE2QjtRQUN2RCxJQUFJLFVBQVUsR0FBZSxFQUFFLENBQUM7UUFDaEMsNkJBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksRUFDSixVQUFDLEtBQWEsRUFBRSxJQUFZLElBQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0YsZ0RBQWdEO1FBQ2hELG1EQUFtRDtRQUNuRCx3QkFBVyxDQUFDLElBQUksQ0FBVyxVQUFVLEVBQUUsVUFBQyxNQUFnQixFQUFFLE1BQWdCO1lBQy9CLE9BQUEsb0JBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUEzQyxDQUEyQyxDQUFDLENBQUM7UUFDeEYsSUFBSSxhQUFhLEdBQWUsRUFBRSxDQUFDO1FBQ25DLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLLElBQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0UsTUFBTSxDQUFDLGFBQWEsQ0FBQztJQUN2QixDQUFDO0lBRUQsNkJBQTZCLFFBQWdCLEVBQUUsVUFBa0IsRUFBRSxVQUFrQjtRQUNuRixFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksVUFBVSxJQUFJLFFBQVEsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3JELE1BQU0sQ0FBSSxVQUFVLFNBQUksVUFBWSxDQUFDO1FBQ3ZDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDcEIsQ0FBQztJQUNILENBQUM7SUFTRCxrQ0FBa0MsYUFBc0I7UUFDdEQsSUFBSSxTQUFTLEdBQTRCLEVBQUUsQ0FBQztRQUM1QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUM5QyxJQUFJLEtBQUssR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRUQsZ0NBQWdDLFVBQXNDO1FBQ3BFLElBQUksV0FBVyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBQSxhQUFhLElBQUksT0FBQSxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUEzQixDQUEyQixDQUFDLENBQUM7UUFDL0UsTUFBTSxDQUFDLE1BQUksV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBRyxDQUFDO0lBQ3RDLENBQUM7SUFFRCwyQkFBMkIsS0FBNEI7UUFDckQsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQyxNQUFNLENBQUMsTUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFHLENBQUM7SUFDdEMsQ0FBQztJQUVELHlCQUF5QixLQUFlO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxDQUFDLENBQUM7WUFDWixNQUFNLENBQUMsS0FBRyxvQkFBb0IsR0FBRyxLQUFPLENBQUM7UUFDM0MsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLEtBQUcsS0FBTyxDQUFDO1FBQ3BCLENBQUM7SUFDSCxDQUFDO0lBRUQsaUJBQWlCLElBQXlCO1FBQ3hDLE1BQU0sQ0FBQyxLQUFHLHlCQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFNLENBQUM7SUFDcEQsQ0FBQztJQUVELHFCQUFxQixTQUFtQyxFQUFFLHFCQUE2QjtRQUNyRixFQUFFLENBQUMsQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxvQkFBUSxDQUFDLFFBQVEsQ0FBQztRQUMzQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUMsb0JBQVEsQ0FBQyxJQUFJLENBQUM7UUFDdkIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLG9CQUFRLENBQUMsU0FBUyxDQUFDO1FBQzVCLENBQUM7SUFDSCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBelZZLG9DQUFBLHNCQUFzQixHQUFHLGlCQUFVLENBQzVDLEVBQUMsY0FBYyxFQUFFLG1CQUFZLEVBQUUsaUJBQWlCLEVBQUUseUJBQWUsRUFBRSxVQUFVLEVBQUUsb0JBQVEsRUFBQyxDQUFDLENBQUEsQ0FBQztZQUU5RixnRUFBZ0U7WUFDaEUscUJBQXFCO1lBQ3JCLG1EQUFtRDtZQUNuRCxpQ0FBaUM7WUFDdEIsaUNBQUEsbUJBQW1CLEdBQUcseUJBQVMsQ0FBQyx1Q0FBdUMsR0FBRyxvQkFBYSxDQUFDLENBQUEsQ0FBQztZQUN6RixrQ0FBQSxvQkFBb0IsR0FDM0IseUJBQVMsQ0FBQyw0Q0FBNEMsR0FBRyxvQkFBYSxDQUFDLENBQUEsQ0FBQztZQUNqRSwrQkFBQSxpQkFBaUIsR0FDeEIseUJBQVMsQ0FBQywwQ0FBMEMsR0FBRyxvQkFBYSxDQUFDLENBQUEsQ0FBQztZQUMvRCxpQ0FBQSxtQkFBbUIsR0FDMUIseUJBQVMsQ0FBQyx5Q0FBeUMsR0FBRyxvQkFBYSxDQUFDLENBQUEsQ0FBQztZQUVuRSxxQkFBcUIsR0FBRyxZQUFZLENBQUM7WUFDckMsVUFBVSxHQUFHLE9BQU8sQ0FBQztZQUNyQixVQUFVLEdBQUcsT0FBTyxDQUFDO1lBRzNCO2dCQUNFO2dCQUFlLENBQUM7Z0JBRWhCLG1EQUF1QixHQUF2QixVQUF3QixhQUFvQyxFQUFFLFNBQW1DLEVBQ3pFLFFBQXVCLEVBQUUsS0FBNEI7b0JBRTNFLElBQUksZ0JBQWdCLEdBQUcsSUFBSSx1QkFBdUIsQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUNwRixJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUM7b0JBQ3ZCLGdCQUFnQixDQUFDLHNCQUFzQixDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO29CQUN6RSxNQUFNLENBQUMsSUFBSSxpQkFBaUIsQ0FBcUMsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUN0RixDQUFDO2dCQUVELG1EQUF1QixHQUF2QixVQUF3Qix5QkFBcUMsRUFDckMsU0FBbUMsRUFBRSxRQUF1QixFQUM1RCxLQUE0QjtvQkFFbEQsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLHVCQUF1QixDQUFDLHlCQUF5QixFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDaEcsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDO29CQUN2QixJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUM7b0JBQ3ZCLGdCQUFnQixDQUFDLHNCQUFzQixDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLGFBQWEsQ0FBQyxDQUFDO29CQUNwRixNQUFNLENBQUMsSUFBSSxpQkFBaUIsQ0FDeEIsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxTQUFTLEVBQWQsQ0FBYyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQ2hFLENBQUM7Z0JBdkJIO29CQUFDLGVBQVUsRUFBRTs7cUNBQUE7Z0JBd0JiLHdCQUFDO1lBQUQsQ0F2QkEsQUF1QkMsSUFBQTtZQXZCRCxpREF1QkMsQ0FBQTtZQUVEO2dCQUNFLDJCQUFtQixZQUF5QixFQUN6QixVQUE0RDtvQkFENUQsaUJBQVksR0FBWixZQUFZLENBQWE7b0JBQ3pCLGVBQVUsR0FBVixVQUFVLENBQWtEO2dCQUFHLENBQUM7Z0JBQ3JGLHdCQUFDO1lBQUQsQ0FIQSxBQUdDLElBQUE7WUFIRCxpREFHQyxDQUFBO1lBR0Q7Z0JBQ0UsMEJBQW1CLHFCQUE2QixFQUM3QixhQUFrRCxFQUNsRCxTQUF5QjtvQkFGekIsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFRO29CQUM3QixrQkFBYSxHQUFiLGFBQWEsQ0FBcUM7b0JBQ2xELGNBQVMsR0FBVCxTQUFTLENBQWdCO2dCQUFHLENBQUM7Z0JBQ2xELHVCQUFDO1lBQUQsQ0FKQSxBQUlDLElBQUE7WUFKRCwrQ0FJQyxDQUFBO1lBRUQ7Z0JBQ0UsNkJBQW1CLGlCQUFpQixFQUFTLGlCQUE2QixFQUN2RCxxQkFBaUMsRUFBUyxZQUE2QixFQUN2RSxVQUFzQyxFQUFTLHFCQUE2QixFQUM1RSxVQUF3QjtvQkFIeEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFBO29CQUFTLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBWTtvQkFDdkQsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFZO29CQUFTLGlCQUFZLEdBQVosWUFBWSxDQUFpQjtvQkFDdkUsZUFBVSxHQUFWLFVBQVUsQ0FBNEI7b0JBQVMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFRO29CQUM1RSxlQUFVLEdBQVYsVUFBVSxDQUFjO2dCQUFHLENBQUM7Z0JBQ2pELDBCQUFDO1lBQUQsQ0FMQSxBQUtDLElBQUE7WUFMRCxxREFLQyxDQUFBO1lBUUQ7Z0JBQ0UsMEJBQW1CLFNBQW1DO29CQUFuQyxjQUFTLEdBQVQsU0FBUyxDQUEwQjtnQkFBRyxDQUFDO2dCQVcxRCxpREFBc0IsR0FBdEIsVUFBdUIsUUFBdUIsRUFBRSx3QkFBb0MsRUFDN0QsZ0JBQTZCLEVBQzdCLGdCQUFrRTtvQkFFdkYsSUFBSSxxQkFBcUIsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7b0JBQ3BELDJEQUEyRDtvQkFDM0Qsd0VBQXdFO29CQUN4RSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzVCLElBQUksT0FBTyxHQUFHLElBQUksdUJBQXVCLENBQ3JDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO29CQUM5QywrQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ3BDLElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLHFCQUFxQixDQUFDLENBQUM7b0JBQ2xFLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxxQkFBcUIsRUFBRSxRQUFRLEVBQy9CLHdCQUF3QixFQUFFLGdCQUFnQixDQUFDLENBQUM7b0JBQ3ZGLElBQUksR0FBRyxHQUFHLElBQUksZ0JBQWdCLENBQzFCLHFCQUFxQixFQUFFLE9BQU8sQ0FBQyxhQUFhLEVBQUUsWUFBWSxDQUFDLENBQUM7b0JBQ2hFLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLEdBQUcsR0FBRyxDQUFDO29CQUM5QyxNQUFNLENBQUMsR0FBRyxDQUFDO2dCQUNiLENBQUM7Z0JBQ0gsdUJBQUM7WUFBRCxDQS9CQSxBQStCQyxJQUFBO1lBRUQ7Z0JBQXNDLDJDQUFtRDtnQkFHdkYsaUNBQW1CLHlCQUFxQyxFQUFFLFNBQW1DLEVBQzFFLEtBQTRCO29CQUM3QyxrQkFBTSxTQUFTLENBQUMsQ0FBQztvQkFGQSw4QkFBeUIsR0FBekIseUJBQXlCLENBQVk7b0JBQ3JDLFVBQUssR0FBTCxLQUFLLENBQXVCO29CQUh2QyxlQUFVLEdBQVcsQ0FBQyxDQUFDO2dCQUsvQixDQUFDO2dCQUVPLG1EQUFpQixHQUF6QixVQUEwQixxQkFBNkI7b0JBQ3JELE1BQU0sQ0FBQyxpQkFBZSxJQUFJLENBQUMsVUFBVSxFQUFFLFNBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLHFCQUF1QixDQUFDO2dCQUNoRyxDQUFDO2dCQUVELG9EQUFrQixHQUFsQixVQUFtQixxQkFBNkIsRUFBRSxRQUFrQixFQUNqRCx3QkFBb0MsRUFDcEMsZ0JBQTZCO29CQUM5QyxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO29CQUNyRSxJQUFJLFlBQVksR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQzdDLElBQUksU0FBUyxHQUFHLHFCQUFxQixLQUFLLENBQUM7d0JBQ3ZCLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBYixDQUFhLENBQUMsQ0FBQzt3QkFDNUQsSUFBSSxDQUFDO29CQUN6QixJQUFJLFNBQVMsR0FDVCxTQUFPLGdCQUFnQixXQUFNLG1CQUFtQiw0QkFBdUIsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFVBQVUsVUFBSyxZQUFZLFVBQUssU0FBUyxVQUFLLHVCQUFnQixDQUFDLHdCQUF3QixDQUFDLE9BQUksQ0FBQztvQkFDdk0sZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksZ0JBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUNoRCxNQUFNLENBQUMsSUFBSSxpQkFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQzFDLENBQUM7Z0JBRUQsdURBQXFCLEdBQXJCLFVBQXNCLGlCQUF5QixFQUFFLGlCQUE2QixFQUN4RCxxQkFBaUMsRUFBRSxVQUFzQyxFQUN6RSxnQkFBNkI7b0JBQ2pELElBQUksT0FBTyxHQUFHLGVBQWEsSUFBSSxDQUFDLFVBQVUsRUFBRSxTQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQU0sQ0FBQztvQkFDM0UsSUFBSSxLQUFLLEdBQU0saUJBQWlCLHlDQUMxQixJQUFJLENBQUMseUJBQXlCLENBQUMsVUFBVSxtQkFDekMsaUJBQWlCLG1CQUNqQix1QkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxtQkFDbkMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLG1CQUNsQyx1QkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxjQUN6QyxDQUFDO29CQUNMLElBQUksU0FBUyxHQUFHLFNBQU8sT0FBTyxXQUFNLEtBQUssTUFBRyxDQUFDO29CQUM3QyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxnQkFBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ2hELE1BQU0sQ0FBQyxJQUFJLGlCQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2pDLENBQUM7Z0JBQ0gsOEJBQUM7WUFBRCxDQXpDQSxBQXlDQyxDQXpDcUMsZ0JBQWdCLEdBeUNyRDtZQUVEO2dCQUFzQywyQ0FBb0Q7Z0JBQ3hGLGlDQUFtQixhQUFvQyxFQUFFLFNBQW1DLEVBQ3pFLEtBQTRCO29CQUM3QyxrQkFBTSxTQUFTLENBQUMsQ0FBQztvQkFGQSxrQkFBYSxHQUFiLGFBQWEsQ0FBdUI7b0JBQ3BDLFVBQUssR0FBTCxLQUFLLENBQXVCO2dCQUUvQyxDQUFDO2dCQUVELG9EQUFrQixHQUFsQixVQUFtQixxQkFBNkIsRUFBRSxRQUFrQixFQUNqRCx3QkFBb0MsRUFBRSxnQkFBdUI7b0JBQzlFLElBQUksS0FBSyxHQUNMLHFCQUFxQixLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFyQixDQUFxQixDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUN6RixJQUFJLFlBQVksR0FBRyx3QkFBd0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO29CQUN0RSxNQUFNLENBQUMsbUJBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUNoRixDQUFDO2dCQUVELHVEQUFxQixHQUFyQixVQUFzQixpQkFBeUIsRUFBRSxpQkFBNkIsRUFDeEQscUJBQWlDLEVBQUUsVUFBc0MsRUFDekUsZ0JBQXVCO29CQUMzQyxJQUFJLEtBQUssR0FBRyx3QkFBd0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO29CQUN4RCxNQUFNLENBQUMseUJBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQzVDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBcEIsQ0FBb0IsQ0FBQyxFQUMvQyx3QkFBd0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pGLENBQUM7Z0JBQ0gsOEJBQUM7WUFBRCxDQXRCQSxBQXNCQyxDQXRCcUMsZ0JBQWdCLEdBc0JyRDtZQUVEO2dCQUtFLGlDQUFtQixPQUFrRSxFQUNsRSxhQUEwQixFQUMxQixhQUErRDtvQkFGL0QsWUFBTyxHQUFQLE9BQU8sQ0FBMkQ7b0JBQ2xFLGtCQUFhLEdBQWIsYUFBYSxDQUFhO29CQUMxQixrQkFBYSxHQUFiLGFBQWEsQ0FBa0Q7b0JBTGxGLGtCQUFhLEdBQXdDLEVBQUUsQ0FBQztvQkFDeEQsc0JBQWlCLEdBQVcsQ0FBQyxDQUFDO2dCQUl1RCxDQUFDO2dCQUU5RSx3REFBc0IsR0FBOUIsVUFBK0IsVUFBc0MsRUFDdEMsUUFBdUI7b0JBQ3BELElBQUksS0FBSyxHQUFHLHFCQUFxQixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQ3RELFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxhQUFhO3dCQUM5Qiw2QkFBZ0IsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxVQUFDLEtBQWEsRUFBRSxJQUFZOzRCQUNqRixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQzVCLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxnQkFBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLG1CQUFtQixDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO3dCQUMzRixDQUFDLENBQUMsQ0FBQztvQkFDTCxDQUFDLENBQUMsQ0FBQztvQkFDSCxNQUFNLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25DLENBQUM7Z0JBRUQsZ0RBQWMsR0FBZCxVQUFlLEdBQWlCLEVBQUUsT0FBWSxJQUFTLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNyRSwyQ0FBUyxHQUFULFVBQVUsR0FBWSxFQUFFLE9BQVksSUFBUyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFFM0QsZ0RBQWMsR0FBZCxVQUFlLEdBQWlCLEVBQUUsT0FBWSxJQUFTLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUVyRSw4Q0FBWSxHQUFaLFVBQWEsR0FBZSxFQUFFLE9BQVk7b0JBQTFDLGlCQTBCQztvQkF6QkMsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUM7b0JBQzdCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ2xCLGlCQUFpQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO29CQUMvQyxDQUFDO29CQUNELElBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFFbkMsSUFBSSxxQkFBcUIsR0FBZSxFQUFFLENBQUM7b0JBQzNDLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3ZCLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBTSxJQUFPLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3RixDQUFDO29CQUNELElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztvQkFDcEIsSUFBSSxZQUFZLEdBQ1oscUJBQXFCLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxHQUFHLEVBQXlCLENBQUMsQ0FBQztvQkFDL0Usd0JBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFVBQUMsWUFBMEIsRUFBRSxLQUFhO3dCQUNyRixZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUksRUFBRSxJQUFJLGdCQUFnQixDQUFDLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQ3RDLHFCQUFxQixFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQ3BGLENBQUMsQ0FBQyxDQUFDO29CQUNILElBQUksZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO29CQUMxQixZQUFZLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBUSxFQUFFLENBQUMsSUFBSyxPQUFBLGdCQUFnQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDO29CQUV2RSxJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMzRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUNuRCxxQkFBcUIsRUFBRSxnQkFBZ0IsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ2pGLCtCQUFnQixDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQztnQkFFRCx1REFBcUIsR0FBckIsVUFBc0IsR0FBd0IsRUFBRSxPQUFZO29CQUE1RCxpQkFpQkM7b0JBaEJDLElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7b0JBQ2pELElBQUksVUFBVSxHQUErQixFQUFFLENBQUM7b0JBQ2hELHdCQUFXLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxVQUFDLFlBQTBCLEVBQUUsS0FBYTt3QkFDckYsWUFBWSxDQUFDLEtBQUssQ0FDZCxLQUFJLEVBQUUsSUFBSSxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxHQUFHLEVBQXlCLEVBQUUsRUFBRSxFQUM5RCxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUM5QyxDQUFDLENBQUMsQ0FBQztvQkFFSCxJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMzRSxJQUFJLHdCQUF3QixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUN2QyxVQUFBLE1BQU0sSUFBSSxPQUFBLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEdBQUcscUJBQXFCLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUE3RSxDQUE2RSxDQUFDLENBQUM7b0JBQzdGLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQ3JELEdBQUcsQ0FBQyxRQUFRLEVBQUUsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ3BGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQzlELGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO29CQUM3RCxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNkLENBQUM7Z0JBRU8sa0RBQWdCLEdBQXhCLFVBQXlCLE9BQWdCLEVBQUUsaUJBQWlCLEVBQUUsaUJBQTZCLEVBQ2xFLHFCQUFpQyxFQUFFLFlBQTZCLEVBQ2hFLFVBQXNDLEVBQUUscUJBQTZCO29CQUM1RixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQ3RCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQ1osVUFBVTs0QkFDTixJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLGlCQUFpQixFQUFFLGlCQUFpQixFQUNwQyxxQkFBcUIsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUNoRyxDQUFDO29CQUNELElBQUksY0FBYyxHQUFHLElBQUksbUJBQW1CLENBQ3hDLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLHFCQUFxQixFQUFFLFlBQVksRUFBRSxVQUFVLEVBQ3JGLHFCQUFxQixFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUN2QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDMUMsQ0FBQztnQkFFRCwrQ0FBYSxHQUFiLFVBQWMsR0FBZ0IsRUFBRSxHQUFRLElBQVMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQy9ELDJDQUFTLEdBQVQsVUFBVSxHQUFZLEVBQUUsaUJBQTBDO29CQUNoRSxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztvQkFDeEMsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDZCxDQUFDO2dCQUNELGdEQUFjLEdBQWQsVUFBZSxHQUFpQixFQUFFLEdBQXFCO29CQUNyRCxHQUFHLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDekMsK0JBQWdCLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7b0JBQ3BFLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUNwQixVQUFBLE1BQU0sSUFBTSxHQUFHLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNuRixNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNkLENBQUM7Z0JBQ0QsNENBQVUsR0FBVixVQUFXLEdBQWtCLEVBQUUsbUJBQStDO29CQUM1RSxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDZCxDQUFDO2dCQUNELHdEQUFzQixHQUF0QixVQUF1QixHQUE4QixFQUFFLE9BQVksSUFBUyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDMUYsc0RBQW9CLEdBQXBCLFVBQXFCLEdBQTRCLEVBQUUsT0FBWSxJQUFTLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN4Riw4QkFBQztZQUFELENBMUdBLEFBMEdDLElBQUE7WUF1QkQ7Z0JBQ0UsMEJBQW1CLEtBQWEsRUFBUyxpQkFBeUIsRUFDL0MsdUJBQW1ELEVBQ25ELDJCQUFvQyxFQUNwQyxnQkFBNEM7b0JBSDVDLFVBQUssR0FBTCxLQUFLLENBQVE7b0JBQVMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFRO29CQUMvQyw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQTRCO29CQUNuRCxnQ0FBMkIsR0FBM0IsMkJBQTJCLENBQVM7b0JBQ3BDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBNEI7Z0JBQUcsQ0FBQztnQkFDckUsdUJBQUM7WUFBRCxDQUxBLEFBS0MsSUFBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9wcm90b192aWV3X2NvbXBpbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgaXNQcmVzZW50LFxuICBpc0JsYW5rLFxuICBUeXBlLFxuICBpc1N0cmluZyxcbiAgU3RyaW5nV3JhcHBlcixcbiAgSVNfREFSVCxcbiAgQ09OU1RfRVhQUlxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtcbiAgU2V0V3JhcHBlcixcbiAgU3RyaW5nTWFwV3JhcHBlcixcbiAgTGlzdFdyYXBwZXIsXG4gIE1hcFdyYXBwZXJcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7XG4gIFRlbXBsYXRlQXN0LFxuICBUZW1wbGF0ZUFzdFZpc2l0b3IsXG4gIE5nQ29udGVudEFzdCxcbiAgRW1iZWRkZWRUZW1wbGF0ZUFzdCxcbiAgRWxlbWVudEFzdCxcbiAgVmFyaWFibGVBc3QsXG4gIEJvdW5kRXZlbnRBc3QsXG4gIEJvdW5kRWxlbWVudFByb3BlcnR5QXN0LFxuICBBdHRyQXN0LFxuICBCb3VuZFRleHRBc3QsXG4gIFRleHRBc3QsXG4gIERpcmVjdGl2ZUFzdCxcbiAgQm91bmREaXJlY3RpdmVQcm9wZXJ0eUFzdCxcbiAgdGVtcGxhdGVWaXNpdEFsbFxufSBmcm9tICcuL3RlbXBsYXRlX2FzdCc7XG5pbXBvcnQge1xuICBDb21waWxlVHlwZU1ldGFkYXRhLFxuICBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsXG4gIENvbXBpbGVQaXBlTWV0YWRhdGFcbn0gZnJvbSAnLi9kaXJlY3RpdmVfbWV0YWRhdGEnO1xuaW1wb3J0IHtTb3VyY2VFeHByZXNzaW9ucywgU291cmNlRXhwcmVzc2lvbiwgbW9kdWxlUmVmfSBmcm9tICcuL3NvdXJjZV9tb2R1bGUnO1xuaW1wb3J0IHtBcHBQcm90b1ZpZXcsIEFwcFZpZXd9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci92aWV3JztcbmltcG9ydCB7Vmlld1R5cGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci92aWV3X3R5cGUnO1xuaW1wb3J0IHtBcHBQcm90b0VsZW1lbnQsIEFwcEVsZW1lbnR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9lbGVtZW50JztcbmltcG9ydCB7UmVzb2x2ZWRNZXRhZGF0YUNhY2hlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvcmVzb2x2ZWRfbWV0YWRhdGFfY2FjaGUnO1xuaW1wb3J0IHtcbiAgZXNjYXBlU2luZ2xlUXVvdGVTdHJpbmcsXG4gIGNvZGVHZW5Db25zdENvbnN0cnVjdG9yQ2FsbCxcbiAgY29kZUdlblZhbHVlRm4sXG4gIGNvZGVHZW5GbkhlYWRlcixcbiAgTU9EVUxFX1NVRkZJWCxcbiAgY29kZUdlblN0cmluZ01hcCxcbiAgRXhwcmVzc2lvbixcbiAgU3RhdGVtZW50XG59IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcblxuZXhwb3J0IGNvbnN0IFBST1RPX1ZJRVdfSklUX0lNUE9SVFMgPSBDT05TVF9FWFBSKFxuICAgIHsnQXBwUHJvdG9WaWV3JzogQXBwUHJvdG9WaWV3LCAnQXBwUHJvdG9FbGVtZW50JzogQXBwUHJvdG9FbGVtZW50LCAnVmlld1R5cGUnOiBWaWV3VHlwZX0pO1xuXG4vLyBUT0RPOiBoYXZlIGEgc2luZ2xlIGZpbGUgdGhhdCByZWV4cG9ydHMgZXZlcnl0aGluZyBuZWVkZWQgZm9yXG4vLyBjb2RlZ2VuIGV4cGxpY2l0bHlcbi8vIC0gaGVscHMgdW5kZXJzdGFuZGluZyB3aGF0IGNvZGVnZW4gd29ya3MgYWdhaW5zdFxuLy8gLSBsZXNzIGltcG9ydHMgaW4gY29kZWdlbiBjb2RlXG5leHBvcnQgdmFyIEFQUF9WSUVXX01PRFVMRV9SRUYgPSBtb2R1bGVSZWYoJ3BhY2thZ2U6YW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL3ZpZXcnICsgTU9EVUxFX1NVRkZJWCk7XG5leHBvcnQgdmFyIFZJRVdfVFlQRV9NT0RVTEVfUkVGID1cbiAgICBtb2R1bGVSZWYoJ3BhY2thZ2U6YW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL3ZpZXdfdHlwZScgKyBNT0RVTEVfU1VGRklYKTtcbmV4cG9ydCB2YXIgQVBQX0VMX01PRFVMRV9SRUYgPVxuICAgIG1vZHVsZVJlZigncGFja2FnZTphbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvZWxlbWVudCcgKyBNT0RVTEVfU1VGRklYKTtcbmV4cG9ydCB2YXIgTUVUQURBVEFfTU9EVUxFX1JFRiA9XG4gICAgbW9kdWxlUmVmKCdwYWNrYWdlOmFuZ3VsYXIyL3NyYy9jb3JlL21ldGFkYXRhL3ZpZXcnICsgTU9EVUxFX1NVRkZJWCk7XG5cbmNvbnN0IElNUExJQ0lUX1RFTVBMQVRFX1ZBUiA9ICdcXCRpbXBsaWNpdCc7XG5jb25zdCBDTEFTU19BVFRSID0gJ2NsYXNzJztcbmNvbnN0IFNUWUxFX0FUVFIgPSAnc3R5bGUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUHJvdG9WaWV3Q29tcGlsZXIge1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgY29tcGlsZVByb3RvVmlld1J1bnRpbWUobWV0YWRhdGFDYWNoZTogUmVzb2x2ZWRNZXRhZGF0YUNhY2hlLCBjb21wb25lbnQ6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IFRlbXBsYXRlQXN0W10sIHBpcGVzOiBDb21waWxlUGlwZU1ldGFkYXRhW10pOlxuICAgICAgQ29tcGlsZVByb3RvVmlld3M8QXBwUHJvdG9WaWV3LCBBcHBQcm90b0VsZW1lbnQsIGFueT4ge1xuICAgIHZhciBwcm90b1ZpZXdGYWN0b3J5ID0gbmV3IFJ1bnRpbWVQcm90b1ZpZXdGYWN0b3J5KG1ldGFkYXRhQ2FjaGUsIGNvbXBvbmVudCwgcGlwZXMpO1xuICAgIHZhciBhbGxQcm90b1ZpZXdzID0gW107XG4gICAgcHJvdG9WaWV3RmFjdG9yeS5jcmVhdGVDb21waWxlUHJvdG9WaWV3KHRlbXBsYXRlLCBbXSwgW10sIGFsbFByb3RvVmlld3MpO1xuICAgIHJldHVybiBuZXcgQ29tcGlsZVByb3RvVmlld3M8QXBwUHJvdG9WaWV3LCBBcHBQcm90b0VsZW1lbnQsIGFueT4oW10sIGFsbFByb3RvVmlld3MpO1xuICB9XG5cbiAgY29tcGlsZVByb3RvVmlld0NvZGVHZW4ocmVzb2x2ZWRNZXRhZGF0YUNhY2hlRXhwcjogRXhwcmVzc2lvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsIHRlbXBsYXRlOiBUZW1wbGF0ZUFzdFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwaXBlczogQ29tcGlsZVBpcGVNZXRhZGF0YVtdKTpcbiAgICAgIENvbXBpbGVQcm90b1ZpZXdzPEV4cHJlc3Npb24sIEV4cHJlc3Npb24sIHN0cmluZz4ge1xuICAgIHZhciBwcm90b1ZpZXdGYWN0b3J5ID0gbmV3IENvZGVHZW5Qcm90b1ZpZXdGYWN0b3J5KHJlc29sdmVkTWV0YWRhdGFDYWNoZUV4cHIsIGNvbXBvbmVudCwgcGlwZXMpO1xuICAgIHZhciBhbGxQcm90b1ZpZXdzID0gW107XG4gICAgdmFyIGFsbFN0YXRlbWVudHMgPSBbXTtcbiAgICBwcm90b1ZpZXdGYWN0b3J5LmNyZWF0ZUNvbXBpbGVQcm90b1ZpZXcodGVtcGxhdGUsIFtdLCBhbGxTdGF0ZW1lbnRzLCBhbGxQcm90b1ZpZXdzKTtcbiAgICByZXR1cm4gbmV3IENvbXBpbGVQcm90b1ZpZXdzPEV4cHJlc3Npb24sIEV4cHJlc3Npb24sIHN0cmluZz4oXG4gICAgICAgIGFsbFN0YXRlbWVudHMubWFwKHN0bXQgPT4gc3RtdC5zdGF0ZW1lbnQpLCBhbGxQcm90b1ZpZXdzKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ29tcGlsZVByb3RvVmlld3M8QVBQX1BST1RPX1ZJRVcsIEFQUF9QUk9UT19FTCwgU1RBVEVNRU5UPiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkZWNsYXJhdGlvbnM6IFNUQVRFTUVOVFtdLFxuICAgICAgICAgICAgICBwdWJsaWMgcHJvdG9WaWV3czogQ29tcGlsZVByb3RvVmlldzxBUFBfUFJPVE9fVklFVywgQVBQX1BST1RPX0VMPltdKSB7fVxufVxuXG5cbmV4cG9ydCBjbGFzcyBDb21waWxlUHJvdG9WaWV3PEFQUF9QUk9UT19WSUVXLCBBUFBfUFJPVE9fRUw+IHtcbiAgY29uc3RydWN0b3IocHVibGljIGVtYmVkZGVkVGVtcGxhdGVJbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgICBwdWJsaWMgcHJvdG9FbGVtZW50czogQ29tcGlsZVByb3RvRWxlbWVudDxBUFBfUFJPVE9fRUw+W10sXG4gICAgICAgICAgICAgIHB1YmxpYyBwcm90b1ZpZXc6IEFQUF9QUk9UT19WSUVXKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgQ29tcGlsZVByb3RvRWxlbWVudDxBUFBfUFJPVE9fRUw+IHtcbiAgY29uc3RydWN0b3IocHVibGljIGJvdW5kRWxlbWVudEluZGV4LCBwdWJsaWMgYXR0ck5hbWVBbmRWYWx1ZXM6IHN0cmluZ1tdW10sXG4gICAgICAgICAgICAgIHB1YmxpYyB2YXJpYWJsZU5hbWVBbmRWYWx1ZXM6IHN0cmluZ1tdW10sIHB1YmxpYyByZW5kZXJFdmVudHM6IEJvdW5kRXZlbnRBc3RbXSxcbiAgICAgICAgICAgICAgcHVibGljIGRpcmVjdGl2ZXM6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YVtdLCBwdWJsaWMgZW1iZWRkZWRUZW1wbGF0ZUluZGV4OiBudW1iZXIsXG4gICAgICAgICAgICAgIHB1YmxpYyBhcHBQcm90b0VsOiBBUFBfUFJPVE9fRUwpIHt9XG59XG5cbmZ1bmN0aW9uIHZpc2l0QW5kUmV0dXJuQ29udGV4dCh2aXNpdG9yOiBUZW1wbGF0ZUFzdFZpc2l0b3IsIGFzdHM6IFRlbXBsYXRlQXN0W10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogYW55KTogYW55IHtcbiAgdGVtcGxhdGVWaXNpdEFsbCh2aXNpdG9yLCBhc3RzLCBjb250ZXh0KTtcbiAgcmV0dXJuIGNvbnRleHQ7XG59XG5cbmFic3RyYWN0IGNsYXNzIFByb3RvVmlld0ZhY3Rvcnk8QVBQX1BST1RPX1ZJRVcsIEFQUF9QUk9UT19FTCwgU1RBVEVNRU5UPiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb21wb25lbnQ6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSkge31cblxuICBhYnN0cmFjdCBjcmVhdGVBcHBQcm90b1ZpZXcoZW1iZWRkZWRUZW1wbGF0ZUluZGV4OiBudW1iZXIsIHZpZXdUeXBlOiBWaWV3VHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVmFyaWFibGVCaW5kaW5nczogc3RyaW5nW11bXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFN0YXRlbWVudHM6IFNUQVRFTUVOVFtdKTogQVBQX1BST1RPX1ZJRVc7XG5cbiAgYWJzdHJhY3QgY3JlYXRlQXBwUHJvdG9FbGVtZW50KGJvdW5kRWxlbWVudEluZGV4OiBudW1iZXIsIGF0dHJOYW1lQW5kVmFsdWVzOiBzdHJpbmdbXVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVOYW1lQW5kVmFsdWVzOiBzdHJpbmdbXVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRTdGF0ZW1lbnRzOiBTVEFURU1FTlRbXSk6IEFQUF9QUk9UT19FTDtcblxuICBjcmVhdGVDb21waWxlUHJvdG9WaWV3KHRlbXBsYXRlOiBUZW1wbGF0ZUFzdFtdLCB0ZW1wbGF0ZVZhcmlhYmxlQmluZGluZ3M6IHN0cmluZ1tdW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0U3RhdGVtZW50czogU1RBVEVNRU5UW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UHJvdG9WaWV3czogQ29tcGlsZVByb3RvVmlldzxBUFBfUFJPVE9fVklFVywgQVBQX1BST1RPX0VMPltdKTpcbiAgICAgIENvbXBpbGVQcm90b1ZpZXc8QVBQX1BST1RPX1ZJRVcsIEFQUF9QUk9UT19FTD4ge1xuICAgIHZhciBlbWJlZGRlZFRlbXBsYXRlSW5kZXggPSB0YXJnZXRQcm90b1ZpZXdzLmxlbmd0aDtcbiAgICAvLyBOb3RlOiB0YXJnZXRQcm90b1ZpZXdzIG5lZWRzIHRvIGJlIGluIGRlcHRoIGZpcnN0IG9yZGVyLlxuICAgIC8vIFNvIHdlIFwicmVzZXJ2ZVwiIGEgc3BhY2UgaGVyZSB0aGF0IHdlIGZpbGwgYWZ0ZXIgdGhlIHJlY3Vyc2lvbiBpcyBkb25lXG4gICAgdGFyZ2V0UHJvdG9WaWV3cy5wdXNoKG51bGwpO1xuICAgIHZhciBidWlsZGVyID0gbmV3IFByb3RvVmlld0J1aWxkZXJWaXNpdG9yPEFQUF9QUk9UT19WSUVXLCBBUFBfUFJPVE9fRUwsIGFueT4oXG4gICAgICAgIHRoaXMsIHRhcmdldFN0YXRlbWVudHMsIHRhcmdldFByb3RvVmlld3MpO1xuICAgIHRlbXBsYXRlVmlzaXRBbGwoYnVpbGRlciwgdGVtcGxhdGUpO1xuICAgIHZhciB2aWV3VHlwZSA9IGdldFZpZXdUeXBlKHRoaXMuY29tcG9uZW50LCBlbWJlZGRlZFRlbXBsYXRlSW5kZXgpO1xuICAgIHZhciBhcHBQcm90b1ZpZXcgPSB0aGlzLmNyZWF0ZUFwcFByb3RvVmlldyhlbWJlZGRlZFRlbXBsYXRlSW5kZXgsIHZpZXdUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVZhcmlhYmxlQmluZGluZ3MsIHRhcmdldFN0YXRlbWVudHMpO1xuICAgIHZhciBjcHYgPSBuZXcgQ29tcGlsZVByb3RvVmlldzxBUFBfUFJPVE9fVklFVywgQVBQX1BST1RPX0VMPihcbiAgICAgICAgZW1iZWRkZWRUZW1wbGF0ZUluZGV4LCBidWlsZGVyLnByb3RvRWxlbWVudHMsIGFwcFByb3RvVmlldyk7XG4gICAgdGFyZ2V0UHJvdG9WaWV3c1tlbWJlZGRlZFRlbXBsYXRlSW5kZXhdID0gY3B2O1xuICAgIHJldHVybiBjcHY7XG4gIH1cbn1cblxuY2xhc3MgQ29kZUdlblByb3RvVmlld0ZhY3RvcnkgZXh0ZW5kcyBQcm90b1ZpZXdGYWN0b3J5PEV4cHJlc3Npb24sIEV4cHJlc3Npb24sIFN0YXRlbWVudD4ge1xuICBwcml2YXRlIF9uZXh0VmFySWQ6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHJlc29sdmVkTWV0YWRhdGFDYWNoZUV4cHI6IEV4cHJlc3Npb24sIGNvbXBvbmVudDogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLFxuICAgICAgICAgICAgICBwdWJsaWMgcGlwZXM6IENvbXBpbGVQaXBlTWV0YWRhdGFbXSkge1xuICAgIHN1cGVyKGNvbXBvbmVudCk7XG4gIH1cblxuICBwcml2YXRlIF9uZXh0UHJvdG9WaWV3VmFyKGVtYmVkZGVkVGVtcGxhdGVJbmRleDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYGFwcFByb3RvVmlldyR7dGhpcy5fbmV4dFZhcklkKyt9XyR7dGhpcy5jb21wb25lbnQudHlwZS5uYW1lfSR7ZW1iZWRkZWRUZW1wbGF0ZUluZGV4fWA7XG4gIH1cblxuICBjcmVhdGVBcHBQcm90b1ZpZXcoZW1iZWRkZWRUZW1wbGF0ZUluZGV4OiBudW1iZXIsIHZpZXdUeXBlOiBWaWV3VHlwZSxcbiAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVmFyaWFibGVCaW5kaW5nczogc3RyaW5nW11bXSxcbiAgICAgICAgICAgICAgICAgICAgIHRhcmdldFN0YXRlbWVudHM6IFN0YXRlbWVudFtdKTogRXhwcmVzc2lvbiB7XG4gICAgdmFyIHByb3RvVmlld1Zhck5hbWUgPSB0aGlzLl9uZXh0UHJvdG9WaWV3VmFyKGVtYmVkZGVkVGVtcGxhdGVJbmRleCk7XG4gICAgdmFyIHZpZXdUeXBlRXhwciA9IGNvZGVHZW5WaWV3VHlwZSh2aWV3VHlwZSk7XG4gICAgdmFyIHBpcGVzRXhwciA9IGVtYmVkZGVkVGVtcGxhdGVJbmRleCA9PT0gMCA/XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlR2VuVHlwZXNBcnJheSh0aGlzLnBpcGVzLm1hcChwaXBlTWV0YSA9PiBwaXBlTWV0YS50eXBlKSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgbnVsbDtcbiAgICB2YXIgc3RhdGVtZW50ID1cbiAgICAgICAgYHZhciAke3Byb3RvVmlld1Zhck5hbWV9ID0gJHtBUFBfVklFV19NT0RVTEVfUkVGfUFwcFByb3RvVmlldy5jcmVhdGUoJHt0aGlzLnJlc29sdmVkTWV0YWRhdGFDYWNoZUV4cHIuZXhwcmVzc2lvbn0sICR7dmlld1R5cGVFeHByfSwgJHtwaXBlc0V4cHJ9LCAke2NvZGVHZW5TdHJpbmdNYXAodGVtcGxhdGVWYXJpYWJsZUJpbmRpbmdzKX0pO2A7XG4gICAgdGFyZ2V0U3RhdGVtZW50cy5wdXNoKG5ldyBTdGF0ZW1lbnQoc3RhdGVtZW50KSk7XG4gICAgcmV0dXJuIG5ldyBFeHByZXNzaW9uKHByb3RvVmlld1Zhck5hbWUpO1xuICB9XG5cbiAgY3JlYXRlQXBwUHJvdG9FbGVtZW50KGJvdW5kRWxlbWVudEluZGV4OiBudW1iZXIsIGF0dHJOYW1lQW5kVmFsdWVzOiBzdHJpbmdbXVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVOYW1lQW5kVmFsdWVzOiBzdHJpbmdbXVtdLCBkaXJlY3RpdmVzOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGFbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFN0YXRlbWVudHM6IFN0YXRlbWVudFtdKTogRXhwcmVzc2lvbiB7XG4gICAgdmFyIHZhck5hbWUgPSBgYXBwUHJvdG9FbCR7dGhpcy5fbmV4dFZhcklkKyt9XyR7dGhpcy5jb21wb25lbnQudHlwZS5uYW1lfWA7XG4gICAgdmFyIHZhbHVlID0gYCR7QVBQX0VMX01PRFVMRV9SRUZ9QXBwUHJvdG9FbGVtZW50LmNyZWF0ZShcbiAgICAgICAgJHt0aGlzLnJlc29sdmVkTWV0YWRhdGFDYWNoZUV4cHIuZXhwcmVzc2lvbn0sXG4gICAgICAgICR7Ym91bmRFbGVtZW50SW5kZXh9LFxuICAgICAgICAke2NvZGVHZW5TdHJpbmdNYXAoYXR0ck5hbWVBbmRWYWx1ZXMpfSxcbiAgICAgICAgJHtjb2RlR2VuRGlyZWN0aXZlc0FycmF5KGRpcmVjdGl2ZXMpfSxcbiAgICAgICAgJHtjb2RlR2VuU3RyaW5nTWFwKHZhcmlhYmxlTmFtZUFuZFZhbHVlcyl9XG4gICAgICApYDtcbiAgICB2YXIgc3RhdGVtZW50ID0gYHZhciAke3Zhck5hbWV9ID0gJHt2YWx1ZX07YDtcbiAgICB0YXJnZXRTdGF0ZW1lbnRzLnB1c2gobmV3IFN0YXRlbWVudChzdGF0ZW1lbnQpKTtcbiAgICByZXR1cm4gbmV3IEV4cHJlc3Npb24odmFyTmFtZSk7XG4gIH1cbn1cblxuY2xhc3MgUnVudGltZVByb3RvVmlld0ZhY3RvcnkgZXh0ZW5kcyBQcm90b1ZpZXdGYWN0b3J5PEFwcFByb3RvVmlldywgQXBwUHJvdG9FbGVtZW50LCBhbnk+IHtcbiAgY29uc3RydWN0b3IocHVibGljIG1ldGFkYXRhQ2FjaGU6IFJlc29sdmVkTWV0YWRhdGFDYWNoZSwgY29tcG9uZW50OiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsXG4gICAgICAgICAgICAgIHB1YmxpYyBwaXBlczogQ29tcGlsZVBpcGVNZXRhZGF0YVtdKSB7XG4gICAgc3VwZXIoY29tcG9uZW50KTtcbiAgfVxuXG4gIGNyZWF0ZUFwcFByb3RvVmlldyhlbWJlZGRlZFRlbXBsYXRlSW5kZXg6IG51bWJlciwgdmlld1R5cGU6IFZpZXdUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVWYXJpYWJsZUJpbmRpbmdzOiBzdHJpbmdbXVtdLCB0YXJnZXRTdGF0ZW1lbnRzOiBhbnlbXSk6IEFwcFByb3RvVmlldyB7XG4gICAgdmFyIHBpcGVzID1cbiAgICAgICAgZW1iZWRkZWRUZW1wbGF0ZUluZGV4ID09PSAwID8gdGhpcy5waXBlcy5tYXAocGlwZU1ldGEgPT4gcGlwZU1ldGEudHlwZS5ydW50aW1lKSA6IFtdO1xuICAgIHZhciB0ZW1wbGF0ZVZhcnMgPSBrZXlWYWx1ZUFycmF5VG9TdHJpbmdNYXAodGVtcGxhdGVWYXJpYWJsZUJpbmRpbmdzKTtcbiAgICByZXR1cm4gQXBwUHJvdG9WaWV3LmNyZWF0ZSh0aGlzLm1ldGFkYXRhQ2FjaGUsIHZpZXdUeXBlLCBwaXBlcywgdGVtcGxhdGVWYXJzKTtcbiAgfVxuXG4gIGNyZWF0ZUFwcFByb3RvRWxlbWVudChib3VuZEVsZW1lbnRJbmRleDogbnVtYmVyLCBhdHRyTmFtZUFuZFZhbHVlczogc3RyaW5nW11bXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlTmFtZUFuZFZhbHVlczogc3RyaW5nW11bXSwgZGlyZWN0aXZlczogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhW10sXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRTdGF0ZW1lbnRzOiBhbnlbXSk6IEFwcFByb3RvRWxlbWVudCB7XG4gICAgdmFyIGF0dHJzID0ga2V5VmFsdWVBcnJheVRvU3RyaW5nTWFwKGF0dHJOYW1lQW5kVmFsdWVzKTtcbiAgICByZXR1cm4gQXBwUHJvdG9FbGVtZW50LmNyZWF0ZSh0aGlzLm1ldGFkYXRhQ2FjaGUsIGJvdW5kRWxlbWVudEluZGV4LCBhdHRycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzLm1hcChkaXJNZXRhID0+IGRpck1ldGEudHlwZS5ydW50aW1lKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlWYWx1ZUFycmF5VG9TdHJpbmdNYXAodmFyaWFibGVOYW1lQW5kVmFsdWVzKSk7XG4gIH1cbn1cblxuY2xhc3MgUHJvdG9WaWV3QnVpbGRlclZpc2l0b3I8QVBQX1BST1RPX1ZJRVcsIEFQUF9QUk9UT19FTCwgU1RBVEVNRU5UPiBpbXBsZW1lbnRzXG4gICAgVGVtcGxhdGVBc3RWaXNpdG9yIHtcbiAgcHJvdG9FbGVtZW50czogQ29tcGlsZVByb3RvRWxlbWVudDxBUFBfUFJPVE9fRUw+W10gPSBbXTtcbiAgYm91bmRFbGVtZW50Q291bnQ6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGZhY3Rvcnk6IFByb3RvVmlld0ZhY3Rvcnk8QVBQX1BST1RPX1ZJRVcsIEFQUF9QUk9UT19FTCwgU1RBVEVNRU5UPixcbiAgICAgICAgICAgICAgcHVibGljIGFsbFN0YXRlbWVudHM6IFNUQVRFTUVOVFtdLFxuICAgICAgICAgICAgICBwdWJsaWMgYWxsUHJvdG9WaWV3czogQ29tcGlsZVByb3RvVmlldzxBUFBfUFJPVE9fVklFVywgQVBQX1BST1RPX0VMPltdKSB7fVxuXG4gIHByaXZhdGUgX3JlYWRBdHRyTmFtZUFuZFZhbHVlcyhkaXJlY3RpdmVzOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGFbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJBc3RzOiBUZW1wbGF0ZUFzdFtdKTogc3RyaW5nW11bXSB7XG4gICAgdmFyIGF0dHJzID0gdmlzaXRBbmRSZXR1cm5Db250ZXh0KHRoaXMsIGF0dHJBc3RzLCB7fSk7XG4gICAgZGlyZWN0aXZlcy5mb3JFYWNoKGRpcmVjdGl2ZU1ldGEgPT4ge1xuICAgICAgU3RyaW5nTWFwV3JhcHBlci5mb3JFYWNoKGRpcmVjdGl2ZU1ldGEuaG9zdEF0dHJpYnV0ZXMsICh2YWx1ZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgdmFyIHByZXZWYWx1ZSA9IGF0dHJzW25hbWVdO1xuICAgICAgICBhdHRyc1tuYW1lXSA9IGlzUHJlc2VudChwcmV2VmFsdWUpID8gbWVyZ2VBdHRyaWJ1dGVWYWx1ZShuYW1lLCBwcmV2VmFsdWUsIHZhbHVlKSA6IHZhbHVlO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG1hcFRvS2V5VmFsdWVBcnJheShhdHRycyk7XG4gIH1cblxuICB2aXNpdEJvdW5kVGV4dChhc3Q6IEJvdW5kVGV4dEFzdCwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIG51bGw7IH1cbiAgdmlzaXRUZXh0KGFzdDogVGV4dEFzdCwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIG51bGw7IH1cblxuICB2aXNpdE5nQ29udGVudChhc3Q6IE5nQ29udGVudEFzdCwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIG51bGw7IH1cblxuICB2aXNpdEVsZW1lbnQoYXN0OiBFbGVtZW50QXN0LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHZhciBib3VuZEVsZW1lbnRJbmRleCA9IG51bGw7XG4gICAgaWYgKGFzdC5pc0JvdW5kKCkpIHtcbiAgICAgIGJvdW5kRWxlbWVudEluZGV4ID0gdGhpcy5ib3VuZEVsZW1lbnRDb3VudCsrO1xuICAgIH1cbiAgICB2YXIgY29tcG9uZW50ID0gYXN0LmdldENvbXBvbmVudCgpO1xuXG4gICAgdmFyIHZhcmlhYmxlTmFtZUFuZFZhbHVlczogc3RyaW5nW11bXSA9IFtdO1xuICAgIGlmIChpc0JsYW5rKGNvbXBvbmVudCkpIHtcbiAgICAgIGFzdC5leHBvcnRBc1ZhcnMuZm9yRWFjaCgodmFyQXN0KSA9PiB7IHZhcmlhYmxlTmFtZUFuZFZhbHVlcy5wdXNoKFt2YXJBc3QubmFtZSwgbnVsbF0pOyB9KTtcbiAgICB9XG4gICAgdmFyIGRpcmVjdGl2ZXMgPSBbXTtcbiAgICB2YXIgcmVuZGVyRXZlbnRzOiBNYXA8c3RyaW5nLCBCb3VuZEV2ZW50QXN0PiA9XG4gICAgICAgIHZpc2l0QW5kUmV0dXJuQ29udGV4dCh0aGlzLCBhc3Qub3V0cHV0cywgbmV3IE1hcDxzdHJpbmcsIEJvdW5kRXZlbnRBc3Q+KCkpO1xuICAgIExpc3RXcmFwcGVyLmZvckVhY2hXaXRoSW5kZXgoYXN0LmRpcmVjdGl2ZXMsIChkaXJlY3RpdmVBc3Q6IERpcmVjdGl2ZUFzdCwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgZGlyZWN0aXZlQXN0LnZpc2l0KHRoaXMsIG5ldyBEaXJlY3RpdmVDb250ZXh0KGluZGV4LCBib3VuZEVsZW1lbnRJbmRleCwgcmVuZGVyRXZlbnRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlTmFtZUFuZFZhbHVlcywgZGlyZWN0aXZlcykpO1xuICAgIH0pO1xuICAgIHZhciByZW5kZXJFdmVudEFycmF5ID0gW107XG4gICAgcmVuZGVyRXZlbnRzLmZvckVhY2goKGV2ZW50QXN0LCBfKSA9PiByZW5kZXJFdmVudEFycmF5LnB1c2goZXZlbnRBc3QpKTtcblxuICAgIHZhciBhdHRyTmFtZUFuZFZhbHVlcyA9IHRoaXMuX3JlYWRBdHRyTmFtZUFuZFZhbHVlcyhkaXJlY3RpdmVzLCBhc3QuYXR0cnMpO1xuICAgIHRoaXMuX2FkZFByb3RvRWxlbWVudChhc3QuaXNCb3VuZCgpLCBib3VuZEVsZW1lbnRJbmRleCwgYXR0ck5hbWVBbmRWYWx1ZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlTmFtZUFuZFZhbHVlcywgcmVuZGVyRXZlbnRBcnJheSwgZGlyZWN0aXZlcywgbnVsbCk7XG4gICAgdGVtcGxhdGVWaXNpdEFsbCh0aGlzLCBhc3QuY2hpbGRyZW4pO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmlzaXRFbWJlZGRlZFRlbXBsYXRlKGFzdDogRW1iZWRkZWRUZW1wbGF0ZUFzdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB2YXIgYm91bmRFbGVtZW50SW5kZXggPSB0aGlzLmJvdW5kRWxlbWVudENvdW50Kys7XG4gICAgdmFyIGRpcmVjdGl2ZXM6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YVtdID0gW107XG4gICAgTGlzdFdyYXBwZXIuZm9yRWFjaFdpdGhJbmRleChhc3QuZGlyZWN0aXZlcywgKGRpcmVjdGl2ZUFzdDogRGlyZWN0aXZlQXN0LCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICBkaXJlY3RpdmVBc3QudmlzaXQoXG4gICAgICAgICAgdGhpcywgbmV3IERpcmVjdGl2ZUNvbnRleHQoaW5kZXgsIGJvdW5kRWxlbWVudEluZGV4LCBuZXcgTWFwPHN0cmluZywgQm91bmRFdmVudEFzdD4oKSwgW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlcykpO1xuICAgIH0pO1xuXG4gICAgdmFyIGF0dHJOYW1lQW5kVmFsdWVzID0gdGhpcy5fcmVhZEF0dHJOYW1lQW5kVmFsdWVzKGRpcmVjdGl2ZXMsIGFzdC5hdHRycyk7XG4gICAgdmFyIHRlbXBsYXRlVmFyaWFibGVCaW5kaW5ncyA9IGFzdC52YXJzLm1hcChcbiAgICAgICAgdmFyQXN0ID0+IFt2YXJBc3QudmFsdWUubGVuZ3RoID4gMCA/IHZhckFzdC52YWx1ZSA6IElNUExJQ0lUX1RFTVBMQVRFX1ZBUiwgdmFyQXN0Lm5hbWVdKTtcbiAgICB2YXIgbmVzdGVkUHJvdG9WaWV3ID0gdGhpcy5mYWN0b3J5LmNyZWF0ZUNvbXBpbGVQcm90b1ZpZXcoXG4gICAgICAgIGFzdC5jaGlsZHJlbiwgdGVtcGxhdGVWYXJpYWJsZUJpbmRpbmdzLCB0aGlzLmFsbFN0YXRlbWVudHMsIHRoaXMuYWxsUHJvdG9WaWV3cyk7XG4gICAgdGhpcy5fYWRkUHJvdG9FbGVtZW50KHRydWUsIGJvdW5kRWxlbWVudEluZGV4LCBhdHRyTmFtZUFuZFZhbHVlcywgW10sIFtdLCBkaXJlY3RpdmVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXN0ZWRQcm90b1ZpZXcuZW1iZWRkZWRUZW1wbGF0ZUluZGV4KTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFByb3RvRWxlbWVudChpc0JvdW5kOiBib29sZWFuLCBib3VuZEVsZW1lbnRJbmRleCwgYXR0ck5hbWVBbmRWYWx1ZXM6IHN0cmluZ1tdW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZU5hbWVBbmRWYWx1ZXM6IHN0cmluZ1tdW10sIHJlbmRlckV2ZW50czogQm91bmRFdmVudEFzdFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhW10sIGVtYmVkZGVkVGVtcGxhdGVJbmRleDogbnVtYmVyKSB7XG4gICAgdmFyIGFwcFByb3RvRWwgPSBudWxsO1xuICAgIGlmIChpc0JvdW5kKSB7XG4gICAgICBhcHBQcm90b0VsID1cbiAgICAgICAgICB0aGlzLmZhY3RvcnkuY3JlYXRlQXBwUHJvdG9FbGVtZW50KGJvdW5kRWxlbWVudEluZGV4LCBhdHRyTmFtZUFuZFZhbHVlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlTmFtZUFuZFZhbHVlcywgZGlyZWN0aXZlcywgdGhpcy5hbGxTdGF0ZW1lbnRzKTtcbiAgICB9XG4gICAgdmFyIGNvbXBpbGVQcm90b0VsID0gbmV3IENvbXBpbGVQcm90b0VsZW1lbnQ8QVBQX1BST1RPX0VMPihcbiAgICAgICAgYm91bmRFbGVtZW50SW5kZXgsIGF0dHJOYW1lQW5kVmFsdWVzLCB2YXJpYWJsZU5hbWVBbmRWYWx1ZXMsIHJlbmRlckV2ZW50cywgZGlyZWN0aXZlcyxcbiAgICAgICAgZW1iZWRkZWRUZW1wbGF0ZUluZGV4LCBhcHBQcm90b0VsKTtcbiAgICB0aGlzLnByb3RvRWxlbWVudHMucHVzaChjb21waWxlUHJvdG9FbCk7XG4gIH1cblxuICB2aXNpdFZhcmlhYmxlKGFzdDogVmFyaWFibGVBc3QsIGN0eDogYW55KTogYW55IHsgcmV0dXJuIG51bGw7IH1cbiAgdmlzaXRBdHRyKGFzdDogQXR0ckFzdCwgYXR0ck5hbWVBbmRWYWx1ZXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9KTogYW55IHtcbiAgICBhdHRyTmFtZUFuZFZhbHVlc1thc3QubmFtZV0gPSBhc3QudmFsdWU7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXREaXJlY3RpdmUoYXN0OiBEaXJlY3RpdmVBc3QsIGN0eDogRGlyZWN0aXZlQ29udGV4dCk6IGFueSB7XG4gICAgY3R4LnRhcmdldERpcmVjdGl2ZXMucHVzaChhc3QuZGlyZWN0aXZlKTtcbiAgICB0ZW1wbGF0ZVZpc2l0QWxsKHRoaXMsIGFzdC5ob3N0RXZlbnRzLCBjdHguaG9zdEV2ZW50VGFyZ2V0QW5kTmFtZXMpO1xuICAgIGFzdC5leHBvcnRBc1ZhcnMuZm9yRWFjaChcbiAgICAgICAgdmFyQXN0ID0+IHsgY3R4LnRhcmdldFZhcmlhYmxlTmFtZUFuZFZhbHVlcy5wdXNoKFt2YXJBc3QubmFtZSwgY3R4LmluZGV4XSk7IH0pO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0RXZlbnQoYXN0OiBCb3VuZEV2ZW50QXN0LCBldmVudFRhcmdldEFuZE5hbWVzOiBNYXA8c3RyaW5nLCBCb3VuZEV2ZW50QXN0Pik6IGFueSB7XG4gICAgZXZlbnRUYXJnZXRBbmROYW1lcy5zZXQoYXN0LmZ1bGxOYW1lLCBhc3QpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0RGlyZWN0aXZlUHJvcGVydHkoYXN0OiBCb3VuZERpcmVjdGl2ZVByb3BlcnR5QXN0LCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gbnVsbDsgfVxuICB2aXNpdEVsZW1lbnRQcm9wZXJ0eShhc3Q6IEJvdW5kRWxlbWVudFByb3BlcnR5QXN0LCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gbnVsbDsgfVxufVxuXG5mdW5jdGlvbiBtYXBUb0tleVZhbHVlQXJyYXkoZGF0YToge1trZXk6IHN0cmluZ106IHN0cmluZ30pOiBzdHJpbmdbXVtdIHtcbiAgdmFyIGVudHJ5QXJyYXk6IHN0cmluZ1tdW10gPSBbXTtcbiAgU3RyaW5nTWFwV3JhcHBlci5mb3JFYWNoKGRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAodmFsdWU6IHN0cmluZywgbmFtZTogc3RyaW5nKSA9PiB7IGVudHJ5QXJyYXkucHVzaChbbmFtZSwgdmFsdWVdKTsgfSk7XG4gIC8vIFdlIG5lZWQgdG8gc29ydCB0byBnZXQgYSBkZWZpbmVkIG91dHB1dCBvcmRlclxuICAvLyBmb3IgdGVzdHMgYW5kIGZvciBjYWNoaW5nIGdlbmVyYXRlZCBhcnRpZmFjdHMuLi5cbiAgTGlzdFdyYXBwZXIuc29ydDxzdHJpbmdbXT4oZW50cnlBcnJheSwgKGVudHJ5MTogc3RyaW5nW10sIGVudHJ5Mjogc3RyaW5nW10pID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTdHJpbmdXcmFwcGVyLmNvbXBhcmUoZW50cnkxWzBdLCBlbnRyeTJbMF0pKTtcbiAgdmFyIGtleVZhbHVlQXJyYXk6IHN0cmluZ1tdW10gPSBbXTtcbiAgZW50cnlBcnJheS5mb3JFYWNoKChlbnRyeSkgPT4geyBrZXlWYWx1ZUFycmF5LnB1c2goW2VudHJ5WzBdLCBlbnRyeVsxXV0pOyB9KTtcbiAgcmV0dXJuIGtleVZhbHVlQXJyYXk7XG59XG5cbmZ1bmN0aW9uIG1lcmdlQXR0cmlidXRlVmFsdWUoYXR0ck5hbWU6IHN0cmluZywgYXR0clZhbHVlMTogc3RyaW5nLCBhdHRyVmFsdWUyOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAoYXR0ck5hbWUgPT0gQ0xBU1NfQVRUUiB8fCBhdHRyTmFtZSA9PSBTVFlMRV9BVFRSKSB7XG4gICAgcmV0dXJuIGAke2F0dHJWYWx1ZTF9ICR7YXR0clZhbHVlMn1gO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBhdHRyVmFsdWUyO1xuICB9XG59XG5cbmNsYXNzIERpcmVjdGl2ZUNvbnRleHQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgaW5kZXg6IG51bWJlciwgcHVibGljIGJvdW5kRWxlbWVudEluZGV4OiBudW1iZXIsXG4gICAgICAgICAgICAgIHB1YmxpYyBob3N0RXZlbnRUYXJnZXRBbmROYW1lczogTWFwPHN0cmluZywgQm91bmRFdmVudEFzdD4sXG4gICAgICAgICAgICAgIHB1YmxpYyB0YXJnZXRWYXJpYWJsZU5hbWVBbmRWYWx1ZXM6IGFueVtdW10sXG4gICAgICAgICAgICAgIHB1YmxpYyB0YXJnZXREaXJlY3RpdmVzOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGFbXSkge31cbn1cblxuZnVuY3Rpb24ga2V5VmFsdWVBcnJheVRvU3RyaW5nTWFwKGtleVZhbHVlQXJyYXk6IGFueVtdW10pOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gIHZhciBzdHJpbmdNYXA6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5VmFsdWVBcnJheS5sZW5ndGg7IGkrKykge1xuICAgIHZhciBlbnRyeSA9IGtleVZhbHVlQXJyYXlbaV07XG4gICAgc3RyaW5nTWFwW2VudHJ5WzBdXSA9IGVudHJ5WzFdO1xuICB9XG4gIHJldHVybiBzdHJpbmdNYXA7XG59XG5cbmZ1bmN0aW9uIGNvZGVHZW5EaXJlY3RpdmVzQXJyYXkoZGlyZWN0aXZlczogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhW10pOiBzdHJpbmcge1xuICB2YXIgZXhwcmVzc2lvbnMgPSBkaXJlY3RpdmVzLm1hcChkaXJlY3RpdmVUeXBlID0+IHR5cGVSZWYoZGlyZWN0aXZlVHlwZS50eXBlKSk7XG4gIHJldHVybiBgWyR7ZXhwcmVzc2lvbnMuam9pbignLCcpfV1gO1xufVxuXG5mdW5jdGlvbiBjb2RlR2VuVHlwZXNBcnJheSh0eXBlczogQ29tcGlsZVR5cGVNZXRhZGF0YVtdKTogc3RyaW5nIHtcbiAgdmFyIGV4cHJlc3Npb25zID0gdHlwZXMubWFwKHR5cGVSZWYpO1xuICByZXR1cm4gYFske2V4cHJlc3Npb25zLmpvaW4oJywnKX1dYDtcbn1cblxuZnVuY3Rpb24gY29kZUdlblZpZXdUeXBlKHZhbHVlOiBWaWV3VHlwZSk6IHN0cmluZyB7XG4gIGlmIChJU19EQVJUKSB7XG4gICAgcmV0dXJuIGAke1ZJRVdfVFlQRV9NT0RVTEVfUkVGfSR7dmFsdWV9YDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYCR7dmFsdWV9YDtcbiAgfVxufVxuXG5mdW5jdGlvbiB0eXBlUmVmKHR5cGU6IENvbXBpbGVUeXBlTWV0YWRhdGEpOiBzdHJpbmcge1xuICByZXR1cm4gYCR7bW9kdWxlUmVmKHR5cGUubW9kdWxlVXJsKX0ke3R5cGUubmFtZX1gO1xufVxuXG5mdW5jdGlvbiBnZXRWaWV3VHlwZShjb21wb25lbnQ6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSwgZW1iZWRkZWRUZW1wbGF0ZUluZGV4OiBudW1iZXIpOiBWaWV3VHlwZSB7XG4gIGlmIChlbWJlZGRlZFRlbXBsYXRlSW5kZXggPiAwKSB7XG4gICAgcmV0dXJuIFZpZXdUeXBlLkVNQkVEREVEO1xuICB9IGVsc2UgaWYgKGNvbXBvbmVudC50eXBlLmlzSG9zdCkge1xuICAgIHJldHVybiBWaWV3VHlwZS5IT1NUO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBWaWV3VHlwZS5DT01QT05FTlQ7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
