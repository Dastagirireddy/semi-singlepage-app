System.register(['angular2/src/facade/lang', 'angular2/src/facade/collection', '../output/output_ast', '../identifiers', './constants', 'angular2/src/core/change_detection/change_detection', './compile_view', './compile_element', '../template_ast', './util', 'angular2/src/core/linker/view_type', 'angular2/src/core/metadata/view', '../compile_metadata'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, collection_1, o, identifiers_1, constants_1, change_detection_1, compile_view_1, compile_element_1, template_ast_1, util_1, view_type_1, view_1, compile_metadata_1;
    var IMPLICIT_TEMPLATE_VAR, CLASS_ATTR, STYLE_ATTR, parentRenderNodeVar, rootSelectorVar, ViewCompileDependency, ViewBuilderVisitor;
    function buildView(view, template, targetDependencies) {
        var builderVisitor = new ViewBuilderVisitor(view, targetDependencies);
        template_ast_1.templateVisitAll(builderVisitor, template, view.declarationElement.isNull() ?
            view.declarationElement :
            view.declarationElement.parent);
        return builderVisitor.nestedViewCount;
    }
    exports_1("buildView", buildView);
    function finishView(view, targetStatements) {
        view.afterNodes();
        createViewTopLevelStmts(view, targetStatements);
        view.nodes.forEach(function (node) {
            if (node instanceof compile_element_1.CompileElement && node.hasEmbeddedView) {
                finishView(node.embeddedView, targetStatements);
            }
        });
    }
    exports_1("finishView", finishView);
    function _mergeHtmlAndDirectiveAttrs(declaredHtmlAttrs, directives) {
        var result = {};
        collection_1.StringMapWrapper.forEach(declaredHtmlAttrs, function (value, key) { result[key] = value; });
        directives.forEach(function (directiveMeta) {
            collection_1.StringMapWrapper.forEach(directiveMeta.hostAttributes, function (value, name) {
                var prevValue = result[name];
                result[name] = lang_1.isPresent(prevValue) ? mergeAttributeValue(name, prevValue, value) : value;
            });
        });
        return mapToKeyValueArray(result);
    }
    function _readHtmlAttrs(attrs) {
        var htmlAttrs = {};
        attrs.forEach(function (ast) { htmlAttrs[ast.name] = ast.value; });
        return htmlAttrs;
    }
    function mergeAttributeValue(attrName, attrValue1, attrValue2) {
        if (attrName == CLASS_ATTR || attrName == STYLE_ATTR) {
            return attrValue1 + " " + attrValue2;
        }
        else {
            return attrValue2;
        }
    }
    function mapToKeyValueArray(data) {
        var entryArray = [];
        collection_1.StringMapWrapper.forEach(data, function (value, name) { entryArray.push([name, value]); });
        // We need to sort to get a defined output order
        // for tests and for caching generated artifacts...
        collection_1.ListWrapper.sort(entryArray, function (entry1, entry2) { return lang_1.StringWrapper.compare(entry1[0], entry2[0]); });
        var keyValueArray = [];
        entryArray.forEach(function (entry) { keyValueArray.push([entry[0], entry[1]]); });
        return keyValueArray;
    }
    function createViewTopLevelStmts(view, targetStatements) {
        var nodeDebugInfosVar = o.NULL_EXPR;
        if (view.genConfig.genDebugInfo) {
            nodeDebugInfosVar = o.variable("nodeDebugInfos_" + view.component.type.name + view.viewIndex);
            targetStatements.push(nodeDebugInfosVar
                .set(o.literalArr(view.nodes.map(createStaticNodeDebugInfo), new o.ArrayType(new o.ExternalType(identifiers_1.Identifiers.StaticNodeDebugInfo), [o.TypeModifier.Const])))
                .toDeclStmt(null, [o.StmtModifier.Final]));
        }
        var renderCompTypeVar = o.variable("renderType_" + view.component.type.name);
        if (view.viewIndex === 0) {
            targetStatements.push(renderCompTypeVar.set(o.NULL_EXPR)
                .toDeclStmt(o.importType(identifiers_1.Identifiers.RenderComponentType)));
        }
        var viewClass = createViewClass(view, renderCompTypeVar, nodeDebugInfosVar);
        targetStatements.push(viewClass);
        targetStatements.push(createViewFactory(view, viewClass, renderCompTypeVar));
    }
    function createStaticNodeDebugInfo(node) {
        var compileElement = node instanceof compile_element_1.CompileElement ? node : null;
        var providerTokens = [];
        var componentToken = o.NULL_EXPR;
        var varTokenEntries = [];
        if (lang_1.isPresent(compileElement)) {
            providerTokens = compileElement.getProviderTokens();
            if (lang_1.isPresent(compileElement.component)) {
                componentToken = util_1.createDiTokenExpression(identifiers_1.identifierToken(compileElement.component.type));
            }
            collection_1.StringMapWrapper.forEach(compileElement.referenceTokens, function (token, varName) {
                varTokenEntries.push([varName, lang_1.isPresent(token) ? util_1.createDiTokenExpression(token) : o.NULL_EXPR]);
            });
        }
        return o.importExpr(identifiers_1.Identifiers.StaticNodeDebugInfo)
            .instantiate([
            o.literalArr(providerTokens, new o.ArrayType(o.DYNAMIC_TYPE, [o.TypeModifier.Const])),
            componentToken,
            o.literalMap(varTokenEntries, new o.MapType(o.DYNAMIC_TYPE, [o.TypeModifier.Const]))
        ], o.importType(identifiers_1.Identifiers.StaticNodeDebugInfo, null, [o.TypeModifier.Const]));
    }
    function createViewClass(view, renderCompTypeVar, nodeDebugInfosVar) {
        var emptyTemplateVariableBindings = view.templateVariableBindings.map(function (entry) { return [entry[0], o.NULL_EXPR]; });
        var viewConstructorArgs = [
            new o.FnParam(constants_1.ViewConstructorVars.viewUtils.name, o.importType(identifiers_1.Identifiers.ViewUtils)),
            new o.FnParam(constants_1.ViewConstructorVars.parentInjector.name, o.importType(identifiers_1.Identifiers.Injector)),
            new o.FnParam(constants_1.ViewConstructorVars.declarationEl.name, o.importType(identifiers_1.Identifiers.AppElement))
        ];
        var viewConstructor = new o.ClassMethod(null, viewConstructorArgs, [
            o.SUPER_EXPR.callFn([
                o.variable(view.className),
                renderCompTypeVar,
                constants_1.ViewTypeEnum.fromValue(view.viewType),
                o.literalMap(emptyTemplateVariableBindings),
                constants_1.ViewConstructorVars.viewUtils,
                constants_1.ViewConstructorVars.parentInjector,
                constants_1.ViewConstructorVars.declarationEl,
                constants_1.ChangeDetectionStrategyEnum.fromValue(getChangeDetectionMode(view)),
                nodeDebugInfosVar
            ])
                .toStmt()
        ]);
        var viewMethods = [
            new o.ClassMethod('createInternal', [new o.FnParam(rootSelectorVar.name, o.STRING_TYPE)], generateCreateMethod(view), o.importType(identifiers_1.Identifiers.AppElement)),
            new o.ClassMethod('injectorGetInternal', [
                new o.FnParam(constants_1.InjectMethodVars.token.name, o.DYNAMIC_TYPE),
                // Note: Can't use o.INT_TYPE here as the method in AppView uses number
                new o.FnParam(constants_1.InjectMethodVars.requestNodeIndex.name, o.NUMBER_TYPE),
                new o.FnParam(constants_1.InjectMethodVars.notFoundResult.name, o.DYNAMIC_TYPE)
            ], addReturnValuefNotEmpty(view.injectorGetMethod.finish(), constants_1.InjectMethodVars.notFoundResult), o.DYNAMIC_TYPE),
            new o.ClassMethod('detectChangesInternal', [new o.FnParam(constants_1.DetectChangesVars.throwOnChange.name, o.BOOL_TYPE)], generateDetectChangesMethod(view)),
            new o.ClassMethod('dirtyParentQueriesInternal', [], view.dirtyParentQueriesMethod.finish()),
            new o.ClassMethod('destroyInternal', [], view.destroyMethod.finish())
        ].concat(view.eventHandlerMethods);
        var viewClass = new o.ClassStmt(view.className, o.importExpr(identifiers_1.Identifiers.AppView, [getContextType(view)]), view.fields, view.getters, viewConstructor, viewMethods.filter(function (method) { return method.body.length > 0; }));
        return viewClass;
    }
    function createViewFactory(view, viewClass, renderCompTypeVar) {
        var viewFactoryArgs = [
            new o.FnParam(constants_1.ViewConstructorVars.viewUtils.name, o.importType(identifiers_1.Identifiers.ViewUtils)),
            new o.FnParam(constants_1.ViewConstructorVars.parentInjector.name, o.importType(identifiers_1.Identifiers.Injector)),
            new o.FnParam(constants_1.ViewConstructorVars.declarationEl.name, o.importType(identifiers_1.Identifiers.AppElement))
        ];
        var initRenderCompTypeStmts = [];
        var templateUrlInfo;
        if (view.component.template.templateUrl == view.component.type.moduleUrl) {
            templateUrlInfo =
                view.component.type.moduleUrl + " class " + view.component.type.name + " - inline template";
        }
        else {
            templateUrlInfo = view.component.template.templateUrl;
        }
        if (view.viewIndex === 0) {
            initRenderCompTypeStmts = [
                new o.IfStmt(renderCompTypeVar.identical(o.NULL_EXPR), [
                    renderCompTypeVar.set(constants_1.ViewConstructorVars
                        .viewUtils.callMethod('createRenderComponentType', [
                        o.literal(templateUrlInfo),
                        o.literal(view.component
                            .template.ngContentSelectors.length),
                        constants_1.ViewEncapsulationEnum
                            .fromValue(view.component.template.encapsulation),
                        view.styles
                    ]))
                        .toStmt()
                ])
            ];
        }
        return o.fn(viewFactoryArgs, initRenderCompTypeStmts.concat([
            new o.ReturnStatement(o.variable(viewClass.name)
                .instantiate(viewClass.constructorMethod.params.map(function (param) { return o.variable(param.name); })))
        ]), o.importType(identifiers_1.Identifiers.AppView, [getContextType(view)]))
            .toDeclStmt(view.viewFactory.name, [o.StmtModifier.Final]);
    }
    function generateCreateMethod(view) {
        var parentRenderNodeExpr = o.NULL_EXPR;
        var parentRenderNodeStmts = [];
        if (view.viewType === view_type_1.ViewType.COMPONENT) {
            parentRenderNodeExpr = constants_1.ViewProperties.renderer.callMethod('createViewRoot', [o.THIS_EXPR.prop('declarationAppElement').prop('nativeElement')]);
            parentRenderNodeStmts = [
                parentRenderNodeVar.set(parentRenderNodeExpr)
                    .toDeclStmt(o.importType(view.genConfig.renderTypes.renderNode), [o.StmtModifier.Final])
            ];
        }
        var resultExpr;
        if (view.viewType === view_type_1.ViewType.HOST) {
            resultExpr = view.nodes[0].appElement;
        }
        else {
            resultExpr = o.NULL_EXPR;
        }
        return parentRenderNodeStmts.concat(view.createMethod.finish())
            .concat([
            o.THIS_EXPR.callMethod('init', [
                util_1.createFlatArray(view.rootNodesOrAppElements),
                o.literalArr(view.nodes.map(function (node) { return node.renderNode; })),
                o.literalArr(view.disposables),
                o.literalArr(view.subscriptions)
            ])
                .toStmt(),
            new o.ReturnStatement(resultExpr)
        ]);
    }
    function generateDetectChangesMethod(view) {
        var stmts = [];
        if (view.detectChangesInInputsMethod.isEmpty() && view.updateContentQueriesMethod.isEmpty() &&
            view.afterContentLifecycleCallbacksMethod.isEmpty() &&
            view.detectChangesRenderPropertiesMethod.isEmpty() &&
            view.updateViewQueriesMethod.isEmpty() && view.afterViewLifecycleCallbacksMethod.isEmpty()) {
            return stmts;
        }
        collection_1.ListWrapper.addAll(stmts, view.detectChangesInInputsMethod.finish());
        stmts.push(o.THIS_EXPR.callMethod('detectContentChildrenChanges', [constants_1.DetectChangesVars.throwOnChange])
            .toStmt());
        var afterContentStmts = view.updateContentQueriesMethod.finish().concat(view.afterContentLifecycleCallbacksMethod.finish());
        if (afterContentStmts.length > 0) {
            stmts.push(new o.IfStmt(o.not(constants_1.DetectChangesVars.throwOnChange), afterContentStmts));
        }
        collection_1.ListWrapper.addAll(stmts, view.detectChangesRenderPropertiesMethod.finish());
        stmts.push(o.THIS_EXPR.callMethod('detectViewChildrenChanges', [constants_1.DetectChangesVars.throwOnChange])
            .toStmt());
        var afterViewStmts = view.updateViewQueriesMethod.finish().concat(view.afterViewLifecycleCallbacksMethod.finish());
        if (afterViewStmts.length > 0) {
            stmts.push(new o.IfStmt(o.not(constants_1.DetectChangesVars.throwOnChange), afterViewStmts));
        }
        var varStmts = [];
        var readVars = o.findReadVarNames(stmts);
        if (collection_1.SetWrapper.has(readVars, constants_1.DetectChangesVars.changed.name)) {
            varStmts.push(constants_1.DetectChangesVars.changed.set(o.literal(true)).toDeclStmt(o.BOOL_TYPE));
        }
        if (collection_1.SetWrapper.has(readVars, constants_1.DetectChangesVars.changes.name)) {
            varStmts.push(constants_1.DetectChangesVars.changes.set(o.NULL_EXPR)
                .toDeclStmt(new o.MapType(o.importType(identifiers_1.Identifiers.SimpleChange))));
        }
        if (collection_1.SetWrapper.has(readVars, constants_1.DetectChangesVars.valUnwrapper.name)) {
            varStmts.push(constants_1.DetectChangesVars.valUnwrapper.set(o.importExpr(identifiers_1.Identifiers.ValueUnwrapper).instantiate([]))
                .toDeclStmt(null, [o.StmtModifier.Final]));
        }
        return varStmts.concat(stmts);
    }
    function addReturnValuefNotEmpty(statements, value) {
        if (statements.length > 0) {
            return statements.concat([new o.ReturnStatement(value)]);
        }
        else {
            return statements;
        }
    }
    function getContextType(view) {
        var typeMeta = view.component.type;
        return typeMeta.isHost ? o.DYNAMIC_TYPE : o.importType(typeMeta);
    }
    function getChangeDetectionMode(view) {
        var mode;
        if (view.viewType === view_type_1.ViewType.COMPONENT) {
            mode = change_detection_1.isDefaultChangeDetectionStrategy(view.component.changeDetection) ?
                change_detection_1.ChangeDetectionStrategy.CheckAlways :
                change_detection_1.ChangeDetectionStrategy.CheckOnce;
        }
        else {
            mode = change_detection_1.ChangeDetectionStrategy.CheckAlways;
        }
        return mode;
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (o_1) {
                o = o_1;
            },
            function (identifiers_1_1) {
                identifiers_1 = identifiers_1_1;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            },
            function (change_detection_1_1) {
                change_detection_1 = change_detection_1_1;
            },
            function (compile_view_1_1) {
                compile_view_1 = compile_view_1_1;
            },
            function (compile_element_1_1) {
                compile_element_1 = compile_element_1_1;
            },
            function (template_ast_1_1) {
                template_ast_1 = template_ast_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (view_type_1_1) {
                view_type_1 = view_type_1_1;
            },
            function (view_1_1) {
                view_1 = view_1_1;
            },
            function (compile_metadata_1_1) {
                compile_metadata_1 = compile_metadata_1_1;
            }],
        execute: function() {
            IMPLICIT_TEMPLATE_VAR = '\$implicit';
            CLASS_ATTR = 'class';
            STYLE_ATTR = 'style';
            parentRenderNodeVar = o.variable('parentRenderNode');
            rootSelectorVar = o.variable('rootSelector');
            ViewCompileDependency = (function () {
                function ViewCompileDependency(comp, factoryPlaceholder) {
                    this.comp = comp;
                    this.factoryPlaceholder = factoryPlaceholder;
                }
                return ViewCompileDependency;
            }());
            exports_1("ViewCompileDependency", ViewCompileDependency);
            ViewBuilderVisitor = (function () {
                function ViewBuilderVisitor(view, targetDependencies) {
                    this.view = view;
                    this.targetDependencies = targetDependencies;
                    this.nestedViewCount = 0;
                }
                ViewBuilderVisitor.prototype._isRootNode = function (parent) { return parent.view !== this.view; };
                ViewBuilderVisitor.prototype._addRootNodeAndProject = function (node, ngContentIndex, parent) {
                    var vcAppEl = (node instanceof compile_element_1.CompileElement && node.hasViewContainer) ? node.appElement : null;
                    if (this._isRootNode(parent)) {
                        // store appElement as root node only for ViewContainers
                        if (this.view.viewType !== view_type_1.ViewType.COMPONENT) {
                            this.view.rootNodesOrAppElements.push(lang_1.isPresent(vcAppEl) ? vcAppEl : node.renderNode);
                        }
                    }
                    else if (lang_1.isPresent(parent.component) && lang_1.isPresent(ngContentIndex)) {
                        parent.addContentNode(ngContentIndex, lang_1.isPresent(vcAppEl) ? vcAppEl : node.renderNode);
                    }
                };
                ViewBuilderVisitor.prototype._getParentRenderNode = function (parent) {
                    if (this._isRootNode(parent)) {
                        if (this.view.viewType === view_type_1.ViewType.COMPONENT) {
                            return parentRenderNodeVar;
                        }
                        else {
                            // root node of an embedded/host view
                            return o.NULL_EXPR;
                        }
                    }
                    else {
                        return lang_1.isPresent(parent.component) &&
                            parent.component.template.encapsulation !== view_1.ViewEncapsulation.Native ?
                            o.NULL_EXPR :
                            parent.renderNode;
                    }
                };
                ViewBuilderVisitor.prototype.visitBoundText = function (ast, parent) {
                    return this._visitText(ast, '', ast.ngContentIndex, parent);
                };
                ViewBuilderVisitor.prototype.visitText = function (ast, parent) {
                    return this._visitText(ast, ast.value, ast.ngContentIndex, parent);
                };
                ViewBuilderVisitor.prototype._visitText = function (ast, value, ngContentIndex, parent) {
                    var fieldName = "_text_" + this.view.nodes.length;
                    this.view.fields.push(new o.ClassField(fieldName, o.importType(this.view.genConfig.renderTypes.renderText), [o.StmtModifier.Private]));
                    var renderNode = o.THIS_EXPR.prop(fieldName);
                    var compileNode = new compile_element_1.CompileNode(parent, this.view, this.view.nodes.length, renderNode, ast);
                    var createRenderNode = o.THIS_EXPR.prop(fieldName)
                        .set(constants_1.ViewProperties.renderer.callMethod('createText', [
                        this._getParentRenderNode(parent),
                        o.literal(value),
                        this.view.createMethod.resetDebugInfoExpr(this.view.nodes.length, ast)
                    ]))
                        .toStmt();
                    this.view.nodes.push(compileNode);
                    this.view.createMethod.addStmt(createRenderNode);
                    this._addRootNodeAndProject(compileNode, ngContentIndex, parent);
                    return renderNode;
                };
                ViewBuilderVisitor.prototype.visitNgContent = function (ast, parent) {
                    // the projected nodes originate from a different view, so we don't
                    // have debug information for them...
                    this.view.createMethod.resetDebugInfo(null, ast);
                    var parentRenderNode = this._getParentRenderNode(parent);
                    var nodesExpression = constants_1.ViewProperties.projectableNodes.key(o.literal(ast.index), new o.ArrayType(o.importType(this.view.genConfig.renderTypes.renderNode)));
                    if (parentRenderNode !== o.NULL_EXPR) {
                        this.view.createMethod.addStmt(constants_1.ViewProperties.renderer.callMethod('projectNodes', [
                            parentRenderNode,
                            o.importExpr(identifiers_1.Identifiers.flattenNestedViewRenderNodes)
                                .callFn([nodesExpression])
                        ])
                            .toStmt());
                    }
                    else if (this._isRootNode(parent)) {
                        if (this.view.viewType !== view_type_1.ViewType.COMPONENT) {
                            // store root nodes only for embedded/host views
                            this.view.rootNodesOrAppElements.push(nodesExpression);
                        }
                    }
                    else {
                        if (lang_1.isPresent(parent.component) && lang_1.isPresent(ast.ngContentIndex)) {
                            parent.addContentNode(ast.ngContentIndex, nodesExpression);
                        }
                    }
                    return null;
                };
                ViewBuilderVisitor.prototype.visitElement = function (ast, parent) {
                    var nodeIndex = this.view.nodes.length;
                    var createRenderNodeExpr;
                    var debugContextExpr = this.view.createMethod.resetDebugInfoExpr(nodeIndex, ast);
                    if (nodeIndex === 0 && this.view.viewType === view_type_1.ViewType.HOST) {
                        createRenderNodeExpr = o.THIS_EXPR.callMethod('selectOrCreateHostElement', [o.literal(ast.name), rootSelectorVar, debugContextExpr]);
                    }
                    else {
                        createRenderNodeExpr = constants_1.ViewProperties.renderer.callMethod('createElement', [this._getParentRenderNode(parent), o.literal(ast.name), debugContextExpr]);
                    }
                    var fieldName = "_el_" + nodeIndex;
                    this.view.fields.push(new o.ClassField(fieldName, o.importType(this.view.genConfig.renderTypes.renderElement), [o.StmtModifier.Private]));
                    this.view.createMethod.addStmt(o.THIS_EXPR.prop(fieldName).set(createRenderNodeExpr).toStmt());
                    var renderNode = o.THIS_EXPR.prop(fieldName);
                    var component = ast.getComponent();
                    var directives = ast.directives.map(function (directiveAst) { return directiveAst.directive; });
                    var htmlAttrs = _readHtmlAttrs(ast.attrs);
                    var attrNameAndValues = _mergeHtmlAndDirectiveAttrs(htmlAttrs, directives);
                    for (var i = 0; i < attrNameAndValues.length; i++) {
                        var attrName = attrNameAndValues[i][0];
                        var attrValue = attrNameAndValues[i][1];
                        this.view.createMethod.addStmt(constants_1.ViewProperties.renderer.callMethod('setElementAttribute', [renderNode, o.literal(attrName), o.literal(attrValue)])
                            .toStmt());
                    }
                    var compileElement = new compile_element_1.CompileElement(parent, this.view, nodeIndex, renderNode, ast, component, directives, ast.providers, ast.hasViewContainer, false, ast.references);
                    this.view.nodes.push(compileElement);
                    var compViewExpr = null;
                    if (lang_1.isPresent(component)) {
                        var nestedComponentIdentifier = new compile_metadata_1.CompileIdentifierMetadata({ name: util_1.getViewFactoryName(component, 0) });
                        this.targetDependencies.push(new ViewCompileDependency(component, nestedComponentIdentifier));
                        compViewExpr = o.variable("compView_" + nodeIndex);
                        compileElement.setComponentView(compViewExpr);
                        this.view.createMethod.addStmt(compViewExpr.set(o.importExpr(nestedComponentIdentifier)
                            .callFn([
                            constants_1.ViewProperties.viewUtils,
                            compileElement.injector,
                            compileElement.appElement
                        ]))
                            .toDeclStmt());
                    }
                    compileElement.beforeChildren();
                    this._addRootNodeAndProject(compileElement, ast.ngContentIndex, parent);
                    template_ast_1.templateVisitAll(this, ast.children, compileElement);
                    compileElement.afterChildren(this.view.nodes.length - nodeIndex - 1);
                    if (lang_1.isPresent(compViewExpr)) {
                        var codeGenContentNodes;
                        if (this.view.component.type.isHost) {
                            codeGenContentNodes = constants_1.ViewProperties.projectableNodes;
                        }
                        else {
                            codeGenContentNodes = o.literalArr(compileElement.contentNodesByNgContentIndex.map(function (nodes) { return util_1.createFlatArray(nodes); }));
                        }
                        this.view.createMethod.addStmt(compViewExpr.callMethod('create', [codeGenContentNodes, o.NULL_EXPR]).toStmt());
                    }
                    return null;
                };
                ViewBuilderVisitor.prototype.visitEmbeddedTemplate = function (ast, parent) {
                    var nodeIndex = this.view.nodes.length;
                    var fieldName = "_anchor_" + nodeIndex;
                    this.view.fields.push(new o.ClassField(fieldName, o.importType(this.view.genConfig.renderTypes.renderComment), [o.StmtModifier.Private]));
                    this.view.createMethod.addStmt(o.THIS_EXPR.prop(fieldName)
                        .set(constants_1.ViewProperties.renderer.callMethod('createTemplateAnchor', [
                        this._getParentRenderNode(parent),
                        this.view.createMethod.resetDebugInfoExpr(nodeIndex, ast)
                    ]))
                        .toStmt());
                    var renderNode = o.THIS_EXPR.prop(fieldName);
                    var templateVariableBindings = ast.variables.map(function (varAst) { return [varAst.value.length > 0 ? varAst.value : IMPLICIT_TEMPLATE_VAR, varAst.name]; });
                    var directives = ast.directives.map(function (directiveAst) { return directiveAst.directive; });
                    var compileElement = new compile_element_1.CompileElement(parent, this.view, nodeIndex, renderNode, ast, null, directives, ast.providers, ast.hasViewContainer, true, ast.references);
                    this.view.nodes.push(compileElement);
                    this.nestedViewCount++;
                    var embeddedView = new compile_view_1.CompileView(this.view.component, this.view.genConfig, this.view.pipeMetas, o.NULL_EXPR, this.view.viewIndex + this.nestedViewCount, compileElement, templateVariableBindings);
                    this.nestedViewCount += buildView(embeddedView, ast.children, this.targetDependencies);
                    compileElement.beforeChildren();
                    this._addRootNodeAndProject(compileElement, ast.ngContentIndex, parent);
                    compileElement.afterChildren(0);
                    return null;
                };
                ViewBuilderVisitor.prototype.visitAttr = function (ast, ctx) { return null; };
                ViewBuilderVisitor.prototype.visitDirective = function (ast, ctx) { return null; };
                ViewBuilderVisitor.prototype.visitEvent = function (ast, eventTargetAndNames) {
                    return null;
                };
                ViewBuilderVisitor.prototype.visitReference = function (ast, ctx) { return null; };
                ViewBuilderVisitor.prototype.visitVariable = function (ast, ctx) { return null; };
                ViewBuilderVisitor.prototype.visitDirectiveProperty = function (ast, context) { return null; };
                ViewBuilderVisitor.prototype.visitElementProperty = function (ast, context) { return null; };
                return ViewBuilderVisitor;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci92aWV3X2NvbXBpbGVyL3ZpZXdfYnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBcURNLHFCQUFxQixFQUNyQixVQUFVLEVBQ1YsVUFBVSxFQUVaLG1CQUFtQixFQUNuQixlQUFlO0lBT25CLG1CQUEwQixJQUFpQixFQUFFLFFBQXVCLEVBQzFDLGtCQUEyQztRQUNuRSxJQUFJLGNBQWMsR0FBRyxJQUFJLGtCQUFrQixDQUFDLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3RFLCtCQUFnQixDQUFDLGNBQWMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRTtZQUM1QixJQUFJLENBQUMsa0JBQWtCO1lBQ3ZCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvRSxNQUFNLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQztJQUN4QyxDQUFDO0lBUEQsaUNBT0MsQ0FBQTtJQUVELG9CQUEyQixJQUFpQixFQUFFLGdCQUErQjtRQUMzRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsdUJBQXVCLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLElBQUksWUFBWSxnQ0FBYyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2xELENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFSRCxtQ0FRQyxDQUFBO0lBOE5ELHFDQUFxQyxpQkFBMEMsRUFDMUMsVUFBc0M7UUFDekUsSUFBSSxNQUFNLEdBQTRCLEVBQUUsQ0FBQztRQUN6Qyw2QkFBZ0Is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QyxDQUFDLENBQUM7Z0JBQ3hGLHlCQUFDO1lBQUQsQ0ExTkEsQUEwTkMsSUFBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tcGlsZXIvdmlld19jb21waWxlci92aWV3X2J1aWxkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzUHJlc2VudCwgaXNCbGFuaywgU3RyaW5nV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7TGlzdFdyYXBwZXIsIFN0cmluZ01hcFdyYXBwZXIsIFNldFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5cbmltcG9ydCAqIGFzIG8gZnJvbSAnLi4vb3V0cHV0L291dHB1dF9hc3QnO1xuaW1wb3J0IHtJZGVudGlmaWVycywgaWRlbnRpZmllclRva2VufSBmcm9tICcuLi9pZGVudGlmaWVycyc7XG5pbXBvcnQge1xuICBWaWV3Q29uc3RydWN0b3JWYXJzLFxuICBJbmplY3RNZXRob2RWYXJzLFxuICBEZXRlY3RDaGFuZ2VzVmFycyxcbiAgVmlld1R5cGVFbnVtLFxuICBWaWV3RW5jYXBzdWxhdGlvbkVudW0sXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5RW51bSxcbiAgVmlld1Byb3BlcnRpZXNcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIGlzRGVmYXVsdENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdGlvbic7XG5cbmltcG9ydCB7Q29tcGlsZVZpZXd9IGZyb20gJy4vY29tcGlsZV92aWV3JztcbmltcG9ydCB7Q29tcGlsZUVsZW1lbnQsIENvbXBpbGVOb2RlfSBmcm9tICcuL2NvbXBpbGVfZWxlbWVudCc7XG5cbmltcG9ydCB7XG4gIFRlbXBsYXRlQXN0LFxuICBUZW1wbGF0ZUFzdFZpc2l0b3IsXG4gIE5nQ29udGVudEFzdCxcbiAgRW1iZWRkZWRUZW1wbGF0ZUFzdCxcbiAgRWxlbWVudEFzdCxcbiAgUmVmZXJlbmNlQXN0LFxuICBWYXJpYWJsZUFzdCxcbiAgQm91bmRFdmVudEFzdCxcbiAgQm91bmRFbGVtZW50UHJvcGVydHlBc3QsXG4gIEF0dHJBc3QsXG4gIEJvdW5kVGV4dEFzdCxcbiAgVGV4dEFzdCxcbiAgRGlyZWN0aXZlQXN0LFxuICBCb3VuZERpcmVjdGl2ZVByb3BlcnR5QXN0LFxuICB0ZW1wbGF0ZVZpc2l0QWxsLFxuICBQcm9wZXJ0eUJpbmRpbmdUeXBlLFxuICBQcm92aWRlckFzdFxufSBmcm9tICcuLi90ZW1wbGF0ZV9hc3QnO1xuXG5pbXBvcnQge2dldFZpZXdGYWN0b3J5TmFtZSwgY3JlYXRlRmxhdEFycmF5LCBjcmVhdGVEaVRva2VuRXhwcmVzc2lvbn0gZnJvbSAnLi91dGlsJztcblxuaW1wb3J0IHtWaWV3VHlwZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL3ZpZXdfdHlwZSc7XG5pbXBvcnQge1ZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9tZXRhZGF0YS92aWV3JztcblxuaW1wb3J0IHtcbiAgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSxcbiAgQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLFxuICBDb21waWxlVG9rZW5NZXRhZGF0YVxufSBmcm9tICcuLi9jb21waWxlX21ldGFkYXRhJztcblxuY29uc3QgSU1QTElDSVRfVEVNUExBVEVfVkFSID0gJ1xcJGltcGxpY2l0JztcbmNvbnN0IENMQVNTX0FUVFIgPSAnY2xhc3MnO1xuY29uc3QgU1RZTEVfQVRUUiA9ICdzdHlsZSc7XG5cbnZhciBwYXJlbnRSZW5kZXJOb2RlVmFyID0gby52YXJpYWJsZSgncGFyZW50UmVuZGVyTm9kZScpO1xudmFyIHJvb3RTZWxlY3RvclZhciA9IG8udmFyaWFibGUoJ3Jvb3RTZWxlY3RvcicpO1xuXG5leHBvcnQgY2xhc3MgVmlld0NvbXBpbGVEZXBlbmRlbmN5IHtcbiAgY29uc3RydWN0b3IocHVibGljIGNvbXA6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSxcbiAgICAgICAgICAgICAgcHVibGljIGZhY3RvcnlQbGFjZWhvbGRlcjogQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSkge31cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkVmlldyh2aWV3OiBDb21waWxlVmlldywgdGVtcGxhdGU6IFRlbXBsYXRlQXN0W10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldERlcGVuZGVuY2llczogVmlld0NvbXBpbGVEZXBlbmRlbmN5W10pOiBudW1iZXIge1xuICB2YXIgYnVpbGRlclZpc2l0b3IgPSBuZXcgVmlld0J1aWxkZXJWaXNpdG9yKHZpZXcsIHRhcmdldERlcGVuZGVuY2llcyk7XG4gIHRlbXBsYXRlVmlzaXRBbGwoYnVpbGRlclZpc2l0b3IsIHRlbXBsYXRlLCB2aWV3LmRlY2xhcmF0aW9uRWxlbWVudC5pc051bGwoKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5kZWNsYXJhdGlvbkVsZW1lbnQgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcuZGVjbGFyYXRpb25FbGVtZW50LnBhcmVudCk7XG4gIHJldHVybiBidWlsZGVyVmlzaXRvci5uZXN0ZWRWaWV3Q291bnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5pc2hWaWV3KHZpZXc6IENvbXBpbGVWaWV3LCB0YXJnZXRTdGF0ZW1lbnRzOiBvLlN0YXRlbWVudFtdKSB7XG4gIHZpZXcuYWZ0ZXJOb2RlcygpO1xuICBjcmVhdGVWaWV3VG9wTGV2ZWxTdG10cyh2aWV3LCB0YXJnZXRTdGF0ZW1lbnRzKTtcbiAgdmlldy5ub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBDb21waWxlRWxlbWVudCAmJiBub2RlLmhhc0VtYmVkZGVkVmlldykge1xuICAgICAgZmluaXNoVmlldyhub2RlLmVtYmVkZGVkVmlldywgdGFyZ2V0U3RhdGVtZW50cyk7XG4gICAgfVxuICB9KTtcbn1cblxuY2xhc3MgVmlld0J1aWxkZXJWaXNpdG9yIGltcGxlbWVudHMgVGVtcGxhdGVBc3RWaXNpdG9yIHtcbiAgbmVzdGVkVmlld0NvdW50OiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2aWV3OiBDb21waWxlVmlldywgcHVibGljIHRhcmdldERlcGVuZGVuY2llczogVmlld0NvbXBpbGVEZXBlbmRlbmN5W10pIHt9XG5cbiAgcHJpdmF0ZSBfaXNSb290Tm9kZShwYXJlbnQ6IENvbXBpbGVFbGVtZW50KTogYm9vbGVhbiB7IHJldHVybiBwYXJlbnQudmlldyAhPT0gdGhpcy52aWV3OyB9XG5cbiAgcHJpdmF0ZSBfYWRkUm9vdE5vZGVBbmRQcm9qZWN0KG5vZGU6IENvbXBpbGVOb2RlLCBuZ0NvbnRlbnRJbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBDb21waWxlRWxlbWVudCkge1xuICAgIHZhciB2Y0FwcEVsID1cbiAgICAgICAgKG5vZGUgaW5zdGFuY2VvZiBDb21waWxlRWxlbWVudCAmJiBub2RlLmhhc1ZpZXdDb250YWluZXIpID8gbm9kZS5hcHBFbGVtZW50IDogbnVsbDtcbiAgICBpZiAodGhpcy5faXNSb290Tm9kZShwYXJlbnQpKSB7XG4gICAgICAvLyBzdG9yZSBhcHBFbGVtZW50IGFzIHJvb3Qgbm9kZSBvbmx5IGZvciBWaWV3Q29udGFpbmVyc1xuICAgICAgaWYgKHRoaXMudmlldy52aWV3VHlwZSAhPT0gVmlld1R5cGUuQ09NUE9ORU5UKSB7XG4gICAgICAgIHRoaXMudmlldy5yb290Tm9kZXNPckFwcEVsZW1lbnRzLnB1c2goaXNQcmVzZW50KHZjQXBwRWwpID8gdmNBcHBFbCA6IG5vZGUucmVuZGVyTm9kZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc1ByZXNlbnQocGFyZW50LmNvbXBvbmVudCkgJiYgaXNQcmVzZW50KG5nQ29udGVudEluZGV4KSkge1xuICAgICAgcGFyZW50LmFkZENvbnRlbnROb2RlKG5nQ29udGVudEluZGV4LCBpc1ByZXNlbnQodmNBcHBFbCkgPyB2Y0FwcEVsIDogbm9kZS5yZW5kZXJOb2RlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9nZXRQYXJlbnRSZW5kZXJOb2RlKHBhcmVudDogQ29tcGlsZUVsZW1lbnQpOiBvLkV4cHJlc3Npb24ge1xuICAgIGlmICh0aGlzLl9pc1Jvb3ROb2RlKHBhcmVudCkpIHtcbiAgICAgIGlmICh0aGlzLnZpZXcudmlld1R5cGUgPT09IFZpZXdUeXBlLkNPTVBPTkVOVCkge1xuICAgICAgICByZXR1cm4gcGFyZW50UmVuZGVyTm9kZVZhcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHJvb3Qgbm9kZSBvZiBhbiBlbWJlZGRlZC9ob3N0IHZpZXdcbiAgICAgICAgcmV0dXJuIG8uTlVMTF9FWFBSO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaXNQcmVzZW50KHBhcmVudC5jb21wb25lbnQpICYmXG4gICAgICAgICAgICAgICAgICAgICBwYXJlbnQuY29tcG9uZW50LnRlbXBsYXRlLmVuY2Fwc3VsYXRpb24gIT09IFZpZXdFbmNhcHN1bGF0aW9uLk5hdGl2ZSA/XG4gICAgICAgICAgICAgICAgIG8uTlVMTF9FWFBSIDpcbiAgICAgICAgICAgICAgICAgcGFyZW50LnJlbmRlck5vZGU7XG4gICAgfVxuICB9XG5cbiAgdmlzaXRCb3VuZFRleHQoYXN0OiBCb3VuZFRleHRBc3QsIHBhcmVudDogQ29tcGlsZUVsZW1lbnQpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl92aXNpdFRleHQoYXN0LCAnJywgYXN0Lm5nQ29udGVudEluZGV4LCBwYXJlbnQpO1xuICB9XG4gIHZpc2l0VGV4dChhc3Q6IFRleHRBc3QsIHBhcmVudDogQ29tcGlsZUVsZW1lbnQpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl92aXNpdFRleHQoYXN0LCBhc3QudmFsdWUsIGFzdC5uZ0NvbnRlbnRJbmRleCwgcGFyZW50KTtcbiAgfVxuICBwcml2YXRlIF92aXNpdFRleHQoYXN0OiBUZW1wbGF0ZUFzdCwgdmFsdWU6IHN0cmluZywgbmdDb250ZW50SW5kZXg6IG51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgIHBhcmVudDogQ29tcGlsZUVsZW1lbnQpOiBvLkV4cHJlc3Npb24ge1xuICAgIHZhciBmaWVsZE5hbWUgPSBgX3RleHRfJHt0aGlzLnZpZXcubm9kZXMubGVuZ3RofWA7XG4gICAgdGhpcy52aWV3LmZpZWxkcy5wdXNoKG5ldyBvLkNsYXNzRmllbGQoZmllbGROYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8uaW1wb3J0VHlwZSh0aGlzLnZpZXcuZ2VuQ29uZmlnLnJlbmRlclR5cGVzLnJlbmRlclRleHQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtvLlN0bXRNb2RpZmllci5Qcml2YXRlXSkpO1xuICAgIHZhciByZW5kZXJOb2RlID0gby5USElTX0VYUFIucHJvcChmaWVsZE5hbWUpO1xuICAgIHZhciBjb21waWxlTm9kZSA9IG5ldyBDb21waWxlTm9kZShwYXJlbnQsIHRoaXMudmlldywgdGhpcy52aWV3Lm5vZGVzLmxlbmd0aCwgcmVuZGVyTm9kZSwgYXN0KTtcbiAgICB2YXIgY3JlYXRlUmVuZGVyTm9kZSA9XG4gICAgICAgIG8uVEhJU19FWFBSLnByb3AoZmllbGROYW1lKVxuICAgICAgICAgICAgLnNldChWaWV3UHJvcGVydGllcy5yZW5kZXJlci5jYWxsTWV0aG9kKFxuICAgICAgICAgICAgICAgICdjcmVhdGVUZXh0JyxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICB0aGlzLl9nZXRQYXJlbnRSZW5kZXJOb2RlKHBhcmVudCksXG4gICAgICAgICAgICAgICAgICBvLmxpdGVyYWwodmFsdWUpLFxuICAgICAgICAgICAgICAgICAgdGhpcy52aWV3LmNyZWF0ZU1ldGhvZC5yZXNldERlYnVnSW5mb0V4cHIodGhpcy52aWV3Lm5vZGVzLmxlbmd0aCwgYXN0KVxuICAgICAgICAgICAgICAgIF0pKVxuICAgICAgICAgICAgLnRvU3RtdCgpO1xuICAgIHRoaXMudmlldy5ub2Rlcy5wdXNoKGNvbXBpbGVOb2RlKTtcbiAgICB0aGlzLnZpZXcuY3JlYXRlTWV0aG9kLmFkZFN0bXQoY3JlYXRlUmVuZGVyTm9kZSk7XG4gICAgdGhpcy5fYWRkUm9vdE5vZGVBbmRQcm9qZWN0KGNvbXBpbGVOb2RlLCBuZ0NvbnRlbnRJbmRleCwgcGFyZW50KTtcbiAgICByZXR1cm4gcmVuZGVyTm9kZTtcbiAgfVxuXG4gIHZpc2l0TmdDb250ZW50KGFzdDogTmdDb250ZW50QXN0LCBwYXJlbnQ6IENvbXBpbGVFbGVtZW50KTogYW55IHtcbiAgICAvLyB0aGUgcHJvamVjdGVkIG5vZGVzIG9yaWdpbmF0ZSBmcm9tIGEgZGlmZmVyZW50IHZpZXcsIHNvIHdlIGRvbid0XG4gICAgLy8gaGF2ZSBkZWJ1ZyBpbmZvcm1hdGlvbiBmb3IgdGhlbS4uLlxuICAgIHRoaXMudmlldy5jcmVhdGVNZXRob2QucmVzZXREZWJ1Z0luZm8obnVsbCwgYXN0KTtcbiAgICB2YXIgcGFyZW50UmVuZGVyTm9kZSA9IHRoaXMuX2dldFBhcmVudFJlbmRlck5vZGUocGFyZW50KTtcbiAgICB2YXIgbm9kZXNFeHByZXNzaW9uID0gVmlld1Byb3BlcnRpZXMucHJvamVjdGFibGVOb2Rlcy5rZXkoXG4gICAgICAgIG8ubGl0ZXJhbChhc3QuaW5kZXgpLFxuICAgICAgICBuZXcgby5BcnJheVR5cGUoby5pbXBvcnRUeXBlKHRoaXMudmlldy5nZW5Db25maWcucmVuZGVyVHlwZXMucmVuZGVyTm9kZSkpKTtcbiAgICBpZiAocGFyZW50UmVuZGVyTm9kZSAhPT0gby5OVUxMX0VYUFIpIHtcbiAgICAgIHRoaXMudmlldy5jcmVhdGVNZXRob2QuYWRkU3RtdChcbiAgICAgICAgICBWaWV3UHJvcGVydGllcy5yZW5kZXJlci5jYWxsTWV0aG9kKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwcm9qZWN0Tm9kZXMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudFJlbmRlck5vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLmltcG9ydEV4cHIoSWRlbnRpZmllcnMuZmxhdHRlbk5lc3RlZFZpZXdSZW5kZXJOb2RlcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2FsbEZuKFtub2Rlc0V4cHJlc3Npb25dKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIC50b1N0bXQoKSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9pc1Jvb3ROb2RlKHBhcmVudCkpIHtcbiAgICAgIGlmICh0aGlzLnZpZXcudmlld1R5cGUgIT09IFZpZXdUeXBlLkNPTVBPTkVOVCkge1xuICAgICAgICAvLyBzdG9yZSByb290IG5vZGVzIG9ubHkgZm9yIGVtYmVkZGVkL2hvc3Qgdmlld3NcbiAgICAgICAgdGhpcy52aWV3LnJvb3ROb2Rlc09yQXBwRWxlbWVudHMucHVzaChub2Rlc0V4cHJlc3Npb24pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaXNQcmVzZW50KHBhcmVudC5jb21wb25lbnQpICYmIGlzUHJlc2VudChhc3QubmdDb250ZW50SW5kZXgpKSB7XG4gICAgICAgIHBhcmVudC5hZGRDb250ZW50Tm9kZShhc3QubmdDb250ZW50SW5kZXgsIG5vZGVzRXhwcmVzc2lvbik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmlzaXRFbGVtZW50KGFzdDogRWxlbWVudEFzdCwgcGFyZW50OiBDb21waWxlRWxlbWVudCk6IGFueSB7XG4gICAgdmFyIG5vZGVJbmRleCA9IHRoaXMudmlldy5ub2Rlcy5sZW5ndGg7XG4gICAgdmFyIGNyZWF0ZVJlbmRlck5vZGVFeHByO1xuICAgIHZhciBkZWJ1Z0NvbnRleHRFeHByID0gdGhpcy52aWV3LmNyZWF0ZU1ldGhvZC5yZXNldERlYnVnSW5mb0V4cHIobm9kZUluZGV4LCBhc3QpO1xuICAgIGlmIChub2RlSW5kZXggPT09IDAgJiYgdGhpcy52aWV3LnZpZXdUeXBlID09PSBWaWV3VHlwZS5IT1NUKSB7XG4gICAgICBjcmVhdGVSZW5kZXJOb2RlRXhwciA9IG8uVEhJU19FWFBSLmNhbGxNZXRob2QoXG4gICAgICAgICAgJ3NlbGVjdE9yQ3JlYXRlSG9zdEVsZW1lbnQnLCBbby5saXRlcmFsKGFzdC5uYW1lKSwgcm9vdFNlbGVjdG9yVmFyLCBkZWJ1Z0NvbnRleHRFeHByXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNyZWF0ZVJlbmRlck5vZGVFeHByID0gVmlld1Byb3BlcnRpZXMucmVuZGVyZXIuY2FsbE1ldGhvZChcbiAgICAgICAgICAnY3JlYXRlRWxlbWVudCcsXG4gICAgICAgICAgW3RoaXMuX2dldFBhcmVudFJlbmRlck5vZGUocGFyZW50KSwgby5saXRlcmFsKGFzdC5uYW1lKSwgZGVidWdDb250ZXh0RXhwcl0pO1xuICAgIH1cbiAgICB2YXIgZmllbGROYW1lID0gYF9lbF8ke25vZGVJbmRleH1gO1xuICAgIHRoaXMudmlldy5maWVsZHMucHVzaChcbiAgICAgICAgbmV3IG8uQ2xhc3NGaWVsZChmaWVsZE5hbWUsIG8uaW1wb3J0VHlwZSh0aGlzLnZpZXcuZ2VuQ29uZmlnLnJlbmRlclR5cGVzLnJlbmRlckVsZW1lbnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFtvLlN0bXRNb2RpZmllci5Qcml2YXRlXSkpO1xuICAgIHRoaXMudmlldy5jcmVhdGVNZXRob2QuYWRkU3RtdChvLlRISVNfRVhQUi5wcm9wKGZpZWxkTmFtZSkuc2V0KGNyZWF0ZVJlbmRlck5vZGVFeHByKS50b1N0bXQoKSk7XG5cbiAgICB2YXIgcmVuZGVyTm9kZSA9IG8uVEhJU19FWFBSLnByb3AoZmllbGROYW1lKTtcblxuICAgIHZhciBjb21wb25lbnQgPSBhc3QuZ2V0Q29tcG9uZW50KCk7XG4gICAgdmFyIGRpcmVjdGl2ZXMgPSBhc3QuZGlyZWN0aXZlcy5tYXAoZGlyZWN0aXZlQXN0ID0+IGRpcmVjdGl2ZUFzdC5kaXJlY3RpdmUpO1xuICAgIHZhciBodG1sQXR0cnMgPSBfcmVhZEh0bWxBdHRycyhhc3QuYXR0cnMpO1xuICAgIHZhciBhdHRyTmFtZUFuZFZhbHVlcyA9IF9tZXJnZUh0bWxBbmREaXJlY3RpdmVBdHRycyhodG1sQXR0cnMsIGRpcmVjdGl2ZXMpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXR0ck5hbWVBbmRWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBhdHRyTmFtZSA9IGF0dHJOYW1lQW5kVmFsdWVzW2ldWzBdO1xuICAgICAgdmFyIGF0dHJWYWx1ZSA9IGF0dHJOYW1lQW5kVmFsdWVzW2ldWzFdO1xuICAgICAgdGhpcy52aWV3LmNyZWF0ZU1ldGhvZC5hZGRTdG10KFxuICAgICAgICAgIFZpZXdQcm9wZXJ0aWVzLnJlbmRlcmVyLmNhbGxNZXRob2QoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3NldEVsZW1lbnRBdHRyaWJ1dGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyZW5kZXJOb2RlLCBvLmxpdGVyYWwoYXR0ck5hbWUpLCBvLmxpdGVyYWwoYXR0clZhbHVlKV0pXG4gICAgICAgICAgICAgIC50b1N0bXQoKSk7XG4gICAgfVxuICAgIHZhciBjb21waWxlRWxlbWVudCA9XG4gICAgICAgIG5ldyBDb21waWxlRWxlbWVudChwYXJlbnQsIHRoaXMudmlldywgbm9kZUluZGV4LCByZW5kZXJOb2RlLCBhc3QsIGNvbXBvbmVudCwgZGlyZWN0aXZlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzdC5wcm92aWRlcnMsIGFzdC5oYXNWaWV3Q29udGFpbmVyLCBmYWxzZSwgYXN0LnJlZmVyZW5jZXMpO1xuICAgIHRoaXMudmlldy5ub2Rlcy5wdXNoKGNvbXBpbGVFbGVtZW50KTtcbiAgICB2YXIgY29tcFZpZXdFeHByOiBvLlJlYWRWYXJFeHByID0gbnVsbDtcbiAgICBpZiAoaXNQcmVzZW50KGNvbXBvbmVudCkpIHtcbiAgICAgIHZhciBuZXN0ZWRDb21wb25lbnRJZGVudGlmaWVyID1cbiAgICAgICAgICBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSh7bmFtZTogZ2V0Vmlld0ZhY3RvcnlOYW1lKGNvbXBvbmVudCwgMCl9KTtcbiAgICAgIHRoaXMudGFyZ2V0RGVwZW5kZW5jaWVzLnB1c2gobmV3IFZpZXdDb21waWxlRGVwZW5kZW5jeShjb21wb25lbnQsIG5lc3RlZENvbXBvbmVudElkZW50aWZpZXIpKTtcbiAgICAgIGNvbXBWaWV3RXhwciA9IG8udmFyaWFibGUoYGNvbXBWaWV3XyR7bm9kZUluZGV4fWApO1xuICAgICAgY29tcGlsZUVsZW1lbnQuc2V0Q29tcG9uZW50Vmlldyhjb21wVmlld0V4cHIpO1xuICAgICAgdGhpcy52aWV3LmNyZWF0ZU1ldGhvZC5hZGRTdG10KGNvbXBWaWV3RXhwci5zZXQoby5pbXBvcnRFeHByKG5lc3RlZENvbXBvbmVudElkZW50aWZpZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGxGbihbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBWaWV3UHJvcGVydGllcy52aWV3VXRpbHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21waWxlRWxlbWVudC5pbmplY3RvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBpbGVFbGVtZW50LmFwcEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvRGVjbFN0bXQoKSk7XG4gICAgfVxuICAgIGNvbXBpbGVFbGVtZW50LmJlZm9yZUNoaWxkcmVuKCk7XG4gICAgdGhpcy5fYWRkUm9vdE5vZGVBbmRQcm9qZWN0KGNvbXBpbGVFbGVtZW50LCBhc3QubmdDb250ZW50SW5kZXgsIHBhcmVudCk7XG4gICAgdGVtcGxhdGVWaXNpdEFsbCh0aGlzLCBhc3QuY2hpbGRyZW4sIGNvbXBpbGVFbGVtZW50KTtcbiAgICBjb21waWxlRWxlbWVudC5hZnRlckNoaWxkcmVuKHRoaXMudmlldy5ub2Rlcy5sZW5ndGggLSBub2RlSW5kZXggLSAxKTtcblxuICAgIGlmIChpc1ByZXNlbnQoY29tcFZpZXdFeHByKSkge1xuICAgICAgdmFyIGNvZGVHZW5Db250ZW50Tm9kZXM7XG4gICAgICBpZiAodGhpcy52aWV3LmNvbXBvbmVudC50eXBlLmlzSG9zdCkge1xuICAgICAgICBjb2RlR2VuQ29udGVudE5vZGVzID0gVmlld1Byb3BlcnRpZXMucHJvamVjdGFibGVOb2RlcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvZGVHZW5Db250ZW50Tm9kZXMgPSBvLmxpdGVyYWxBcnIoXG4gICAgICAgICAgICBjb21waWxlRWxlbWVudC5jb250ZW50Tm9kZXNCeU5nQ29udGVudEluZGV4Lm1hcChub2RlcyA9PiBjcmVhdGVGbGF0QXJyYXkobm9kZXMpKSk7XG4gICAgICB9XG4gICAgICB0aGlzLnZpZXcuY3JlYXRlTWV0aG9kLmFkZFN0bXQoXG4gICAgICAgICAgY29tcFZpZXdFeHByLmNhbGxNZXRob2QoJ2NyZWF0ZScsIFtjb2RlR2VuQ29udGVudE5vZGVzLCBvLk5VTExfRVhQUl0pLnRvU3RtdCgpKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2aXNpdEVtYmVkZGVkVGVtcGxhdGUoYXN0OiBFbWJlZGRlZFRlbXBsYXRlQXN0LCBwYXJlbnQ6IENvbXBpbGVFbGVtZW50KTogYW55IHtcbiAgICB2YXIgbm9kZUluZGV4ID0gdGhpcy52aWV3Lm5vZGVzLmxlbmd0aDtcbiAgICB2YXIgZmllbGROYW1lID0gYF9hbmNob3JfJHtub2RlSW5kZXh9YDtcbiAgICB0aGlzLnZpZXcuZmllbGRzLnB1c2goXG4gICAgICAgIG5ldyBvLkNsYXNzRmllbGQoZmllbGROYW1lLCBvLmltcG9ydFR5cGUodGhpcy52aWV3LmdlbkNvbmZpZy5yZW5kZXJUeXBlcy5yZW5kZXJDb21tZW50KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBbby5TdG10TW9kaWZpZXIuUHJpdmF0ZV0pKTtcbiAgICB0aGlzLnZpZXcuY3JlYXRlTWV0aG9kLmFkZFN0bXQoXG4gICAgICAgIG8uVEhJU19FWFBSLnByb3AoZmllbGROYW1lKVxuICAgICAgICAgICAgLnNldChWaWV3UHJvcGVydGllcy5yZW5kZXJlci5jYWxsTWV0aG9kKFxuICAgICAgICAgICAgICAgICdjcmVhdGVUZW1wbGF0ZUFuY2hvcicsXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgdGhpcy5fZ2V0UGFyZW50UmVuZGVyTm9kZShwYXJlbnQpLFxuICAgICAgICAgICAgICAgICAgdGhpcy52aWV3LmNyZWF0ZU1ldGhvZC5yZXNldERlYnVnSW5mb0V4cHIobm9kZUluZGV4LCBhc3QpXG4gICAgICAgICAgICAgICAgXSkpXG4gICAgICAgICAgICAudG9TdG10KCkpO1xuICAgIHZhciByZW5kZXJOb2RlID0gby5USElTX0VYUFIucHJvcChmaWVsZE5hbWUpO1xuXG4gICAgdmFyIHRlbXBsYXRlVmFyaWFibGVCaW5kaW5ncyA9IGFzdC52YXJpYWJsZXMubWFwKFxuICAgICAgICB2YXJBc3QgPT4gW3ZhckFzdC52YWx1ZS5sZW5ndGggPiAwID8gdmFyQXN0LnZhbHVlIDogSU1QTElDSVRfVEVNUExBVEVfVkFSLCB2YXJBc3QubmFtZV0pO1xuXG4gICAgdmFyIGRpcmVjdGl2ZXMgPSBhc3QuZGlyZWN0aXZlcy5tYXAoZGlyZWN0aXZlQXN0ID0+IGRpcmVjdGl2ZUFzdC5kaXJlY3RpdmUpO1xuICAgIHZhciBjb21waWxlRWxlbWVudCA9XG4gICAgICAgIG5ldyBDb21waWxlRWxlbWVudChwYXJlbnQsIHRoaXMudmlldywgbm9kZUluZGV4LCByZW5kZXJOb2RlLCBhc3QsIG51bGwsIGRpcmVjdGl2ZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBhc3QucHJvdmlkZXJzLCBhc3QuaGFzVmlld0NvbnRhaW5lciwgdHJ1ZSwgYXN0LnJlZmVyZW5jZXMpO1xuICAgIHRoaXMudmlldy5ub2Rlcy5wdXNoKGNvbXBpbGVFbGVtZW50KTtcblxuICAgIHRoaXMubmVzdGVkVmlld0NvdW50Kys7XG4gICAgdmFyIGVtYmVkZGVkVmlldyA9IG5ldyBDb21waWxlVmlldyhcbiAgICAgICAgdGhpcy52aWV3LmNvbXBvbmVudCwgdGhpcy52aWV3LmdlbkNvbmZpZywgdGhpcy52aWV3LnBpcGVNZXRhcywgby5OVUxMX0VYUFIsXG4gICAgICAgIHRoaXMudmlldy52aWV3SW5kZXggKyB0aGlzLm5lc3RlZFZpZXdDb3VudCwgY29tcGlsZUVsZW1lbnQsIHRlbXBsYXRlVmFyaWFibGVCaW5kaW5ncyk7XG4gICAgdGhpcy5uZXN0ZWRWaWV3Q291bnQgKz0gYnVpbGRWaWV3KGVtYmVkZGVkVmlldywgYXN0LmNoaWxkcmVuLCB0aGlzLnRhcmdldERlcGVuZGVuY2llcyk7XG5cbiAgICBjb21waWxlRWxlbWVudC5iZWZvcmVDaGlsZHJlbigpO1xuICAgIHRoaXMuX2FkZFJvb3ROb2RlQW5kUHJvamVjdChjb21waWxlRWxlbWVudCwgYXN0Lm5nQ29udGVudEluZGV4LCBwYXJlbnQpO1xuICAgIGNvbXBpbGVFbGVtZW50LmFmdGVyQ2hpbGRyZW4oMCk7XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZpc2l0QXR0cihhc3Q6IEF0dHJBc3QsIGN0eDogYW55KTogYW55IHsgcmV0dXJuIG51bGw7IH1cbiAgdmlzaXREaXJlY3RpdmUoYXN0OiBEaXJlY3RpdmVBc3QsIGN0eDogYW55KTogYW55IHsgcmV0dXJuIG51bGw7IH1cbiAgdmlzaXRFdmVudChhc3Q6IEJvdW5kRXZlbnRBc3QsIGV2ZW50VGFyZ2V0QW5kTmFtZXM6IE1hcDxzdHJpbmcsIEJvdW5kRXZlbnRBc3Q+KTogYW55IHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZpc2l0UmVmZXJlbmNlKGFzdDogUmVmZXJlbmNlQXN0LCBjdHg6IGFueSk6IGFueSB7IHJldHVybiBudWxsOyB9XG4gIHZpc2l0VmFyaWFibGUoYXN0OiBWYXJpYWJsZUFzdCwgY3R4OiBhbnkpOiBhbnkgeyByZXR1cm4gbnVsbDsgfVxuICB2aXNpdERpcmVjdGl2ZVByb3BlcnR5KGFzdDogQm91bmREaXJlY3RpdmVQcm9wZXJ0eUFzdCwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIG51bGw7IH1cbiAgdmlzaXRFbGVtZW50UHJvcGVydHkoYXN0OiBCb3VuZEVsZW1lbnRQcm9wZXJ0eUFzdCwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIG51bGw7IH1cbn1cblxuZnVuY3Rpb24gX21lcmdlSHRtbEFuZERpcmVjdGl2ZUF0dHJzKGRlY2xhcmVkSHRtbEF0dHJzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGFbXSk6IHN0cmluZ1tdW10ge1xuICB2YXIgcmVzdWx0OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2goZGVjbGFyZWRIdG1sQXR0cnMsICh2YWx1ZSwga2V5KSA9PiB7IHJlc3VsdFtrZXldID0gdmFsdWU7IH0pO1xuICBkaXJlY3RpdmVzLmZvckVhY2goZGlyZWN0aXZlTWV0YSA9PiB7XG4gICAgU3RyaW5nTWFwV3JhcHBlci5mb3JFYWNoKGRpcmVjdGl2ZU1ldGEuaG9zdEF0dHJpYnV0ZXMsICh2YWx1ZSwgbmFtZSkgPT4ge1xuICAgICAgdmFyIHByZXZWYWx1ZSA9IHJlc3VsdFtuYW1lXTtcbiAgICAgIHJlc3VsdFtuYW1lXSA9IGlzUHJlc2VudChwcmV2VmFsdWUpID8gbWVyZ2VBdHRyaWJ1dGVWYWx1ZShuYW1lLCBwcmV2VmFsdWUsIHZhbHVlKSA6IHZhbHVlO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIG1hcFRvS2V5VmFsdWVBcnJheShyZXN1bHQpO1xufVxuXG5mdW5jdGlvbiBfcmVhZEh0bWxBdHRycyhhdHRyczogQXR0ckFzdFtdKToge1trZXk6IHN0cmluZ106IHN0cmluZ30ge1xuICB2YXIgaHRtbEF0dHJzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICBhdHRycy5mb3JFYWNoKChhc3QpID0+IHsgaHRtbEF0dHJzW2FzdC5uYW1lXSA9IGFzdC52YWx1ZTsgfSk7XG4gIHJldHVybiBodG1sQXR0cnM7XG59XG5cbmZ1bmN0aW9uIG1lcmdlQXR0cmlidXRlVmFsdWUoYXR0ck5hbWU6IHN0cmluZywgYXR0clZhbHVlMTogc3RyaW5nLCBhdHRyVmFsdWUyOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAoYXR0ck5hbWUgPT0gQ0xBU1NfQVRUUiB8fCBhdHRyTmFtZSA9PSBTVFlMRV9BVFRSKSB7XG4gICAgcmV0dXJuIGAke2F0dHJWYWx1ZTF9ICR7YXR0clZhbHVlMn1gO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBhdHRyVmFsdWUyO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1hcFRvS2V5VmFsdWVBcnJheShkYXRhOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSk6IHN0cmluZ1tdW10ge1xuICB2YXIgZW50cnlBcnJheSA9IFtdO1xuICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2goZGF0YSwgKHZhbHVlLCBuYW1lKSA9PiB7IGVudHJ5QXJyYXkucHVzaChbbmFtZSwgdmFsdWVdKTsgfSk7XG4gIC8vIFdlIG5lZWQgdG8gc29ydCB0byBnZXQgYSBkZWZpbmVkIG91dHB1dCBvcmRlclxuICAvLyBmb3IgdGVzdHMgYW5kIGZvciBjYWNoaW5nIGdlbmVyYXRlZCBhcnRpZmFjdHMuLi5cbiAgTGlzdFdyYXBwZXIuc29ydChlbnRyeUFycmF5LCAoZW50cnkxLCBlbnRyeTIpID0+IFN0cmluZ1dyYXBwZXIuY29tcGFyZShlbnRyeTFbMF0sIGVudHJ5MlswXSkpO1xuICB2YXIga2V5VmFsdWVBcnJheSA9IFtdO1xuICBlbnRyeUFycmF5LmZvckVhY2goKGVudHJ5KSA9PiB7IGtleVZhbHVlQXJyYXkucHVzaChbZW50cnlbMF0sIGVudHJ5WzFdXSk7IH0pO1xuICByZXR1cm4ga2V5VmFsdWVBcnJheTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVmlld1RvcExldmVsU3RtdHModmlldzogQ29tcGlsZVZpZXcsIHRhcmdldFN0YXRlbWVudHM6IG8uU3RhdGVtZW50W10pIHtcbiAgdmFyIG5vZGVEZWJ1Z0luZm9zVmFyOiBvLkV4cHJlc3Npb24gPSBvLk5VTExfRVhQUjtcbiAgaWYgKHZpZXcuZ2VuQ29uZmlnLmdlbkRlYnVnSW5mbykge1xuICAgIG5vZGVEZWJ1Z0luZm9zVmFyID0gby52YXJpYWJsZShgbm9kZURlYnVnSW5mb3NfJHt2aWV3LmNvbXBvbmVudC50eXBlLm5hbWV9JHt2aWV3LnZpZXdJbmRleH1gKTtcbiAgICB0YXJnZXRTdGF0ZW1lbnRzLnB1c2goXG4gICAgICAgICg8by5SZWFkVmFyRXhwcj5ub2RlRGVidWdJbmZvc1ZhcilcbiAgICAgICAgICAgIC5zZXQoby5saXRlcmFsQXJyKHZpZXcubm9kZXMubWFwKGNyZWF0ZVN0YXRpY05vZGVEZWJ1Z0luZm8pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IG8uQXJyYXlUeXBlKG5ldyBvLkV4dGVybmFsVHlwZShJZGVudGlmaWVycy5TdGF0aWNOb2RlRGVidWdJbmZvKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbby5UeXBlTW9kaWZpZXIuQ29uc3RdKSkpXG4gICAgICAgICAgICAudG9EZWNsU3RtdChudWxsLCBbby5TdG10TW9kaWZpZXIuRmluYWxdKSk7XG4gIH1cblxuXG4gIHZhciByZW5kZXJDb21wVHlwZVZhcjogby5SZWFkVmFyRXhwciA9IG8udmFyaWFibGUoYHJlbmRlclR5cGVfJHt2aWV3LmNvbXBvbmVudC50eXBlLm5hbWV9YCk7XG4gIGlmICh2aWV3LnZpZXdJbmRleCA9PT0gMCkge1xuICAgIHRhcmdldFN0YXRlbWVudHMucHVzaChyZW5kZXJDb21wVHlwZVZhci5zZXQoby5OVUxMX0VYUFIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG9EZWNsU3RtdChvLmltcG9ydFR5cGUoSWRlbnRpZmllcnMuUmVuZGVyQ29tcG9uZW50VHlwZSkpKTtcbiAgfVxuXG4gIHZhciB2aWV3Q2xhc3MgPSBjcmVhdGVWaWV3Q2xhc3ModmlldywgcmVuZGVyQ29tcFR5cGVWYXIsIG5vZGVEZWJ1Z0luZm9zVmFyKTtcbiAgdGFyZ2V0U3RhdGVtZW50cy5wdXNoKHZpZXdDbGFzcyk7XG4gIHRhcmdldFN0YXRlbWVudHMucHVzaChjcmVhdGVWaWV3RmFjdG9yeSh2aWV3LCB2aWV3Q2xhc3MsIHJlbmRlckNvbXBUeXBlVmFyKSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0YXRpY05vZGVEZWJ1Z0luZm8obm9kZTogQ29tcGlsZU5vZGUpOiBvLkV4cHJlc3Npb24ge1xuICB2YXIgY29tcGlsZUVsZW1lbnQgPSBub2RlIGluc3RhbmNlb2YgQ29tcGlsZUVsZW1lbnQgPyBub2RlIDogbnVsbDtcbiAgdmFyIHByb3ZpZGVyVG9rZW5zOiBvLkV4cHJlc3Npb25bXSA9IFtdO1xuICB2YXIgY29tcG9uZW50VG9rZW46IG8uRXhwcmVzc2lvbiA9IG8uTlVMTF9FWFBSO1xuICB2YXIgdmFyVG9rZW5FbnRyaWVzID0gW107XG4gIGlmIChpc1ByZXNlbnQoY29tcGlsZUVsZW1lbnQpKSB7XG4gICAgcHJvdmlkZXJUb2tlbnMgPSBjb21waWxlRWxlbWVudC5nZXRQcm92aWRlclRva2VucygpO1xuICAgIGlmIChpc1ByZXNlbnQoY29tcGlsZUVsZW1lbnQuY29tcG9uZW50KSkge1xuICAgICAgY29tcG9uZW50VG9rZW4gPSBjcmVhdGVEaVRva2VuRXhwcmVzc2lvbihpZGVudGlmaWVyVG9rZW4oY29tcGlsZUVsZW1lbnQuY29tcG9uZW50LnR5cGUpKTtcbiAgICB9XG4gICAgU3RyaW5nTWFwV3JhcHBlci5mb3JFYWNoKGNvbXBpbGVFbGVtZW50LnJlZmVyZW5jZVRva2VucywgKHRva2VuLCB2YXJOYW1lKSA9PiB7XG4gICAgICB2YXJUb2tlbkVudHJpZXMucHVzaChcbiAgICAgICAgICBbdmFyTmFtZSwgaXNQcmVzZW50KHRva2VuKSA/IGNyZWF0ZURpVG9rZW5FeHByZXNzaW9uKHRva2VuKSA6IG8uTlVMTF9FWFBSXSk7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIG8uaW1wb3J0RXhwcihJZGVudGlmaWVycy5TdGF0aWNOb2RlRGVidWdJbmZvKVxuICAgICAgLmluc3RhbnRpYXRlKFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIG8ubGl0ZXJhbEFycihwcm92aWRlclRva2VucywgbmV3IG8uQXJyYXlUeXBlKG8uRFlOQU1JQ19UWVBFLCBbby5UeXBlTW9kaWZpZXIuQ29uc3RdKSksXG4gICAgICAgICAgICBjb21wb25lbnRUb2tlbixcbiAgICAgICAgICAgIG8ubGl0ZXJhbE1hcCh2YXJUb2tlbkVudHJpZXMsIG5ldyBvLk1hcFR5cGUoby5EWU5BTUlDX1RZUEUsIFtvLlR5cGVNb2RpZmllci5Db25zdF0pKVxuICAgICAgICAgIF0sXG4gICAgICAgICAgby5pbXBvcnRUeXBlKElkZW50aWZpZXJzLlN0YXRpY05vZGVEZWJ1Z0luZm8sIG51bGwsIFtvLlR5cGVNb2RpZmllci5Db25zdF0pKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVmlld0NsYXNzKHZpZXc6IENvbXBpbGVWaWV3LCByZW5kZXJDb21wVHlwZVZhcjogby5SZWFkVmFyRXhwcixcbiAgICAgICAgICAgICAgICAgICAgICAgICBub2RlRGVidWdJbmZvc1Zhcjogby5FeHByZXNzaW9uKTogby5DbGFzc1N0bXQge1xuICB2YXIgZW1wdHlUZW1wbGF0ZVZhcmlhYmxlQmluZGluZ3MgPVxuICAgICAgdmlldy50ZW1wbGF0ZVZhcmlhYmxlQmluZGluZ3MubWFwKChlbnRyeSkgPT4gW2VudHJ5WzBdLCBvLk5VTExfRVhQUl0pO1xuICB2YXIgdmlld0NvbnN0cnVjdG9yQXJncyA9IFtcbiAgICBuZXcgby5GblBhcmFtKFZpZXdDb25zdHJ1Y3RvclZhcnMudmlld1V0aWxzLm5hbWUsIG8uaW1wb3J0VHlwZShJZGVudGlmaWVycy5WaWV3VXRpbHMpKSxcbiAgICBuZXcgby5GblBhcmFtKFZpZXdDb25zdHJ1Y3RvclZhcnMucGFyZW50SW5qZWN0b3IubmFtZSwgby5pbXBvcnRUeXBlKElkZW50aWZpZXJzLkluamVjdG9yKSksXG4gICAgbmV3IG8uRm5QYXJhbShWaWV3Q29uc3RydWN0b3JWYXJzLmRlY2xhcmF0aW9uRWwubmFtZSwgby5pbXBvcnRUeXBlKElkZW50aWZpZXJzLkFwcEVsZW1lbnQpKVxuICBdO1xuICB2YXIgdmlld0NvbnN0cnVjdG9yID0gbmV3IG8uQ2xhc3NNZXRob2QobnVsbCwgdmlld0NvbnN0cnVjdG9yQXJncywgW1xuICAgIG8uU1VQRVJfRVhQUi5jYWxsRm4oW1xuICAgICAgICAgICAgICAgICAgby52YXJpYWJsZSh2aWV3LmNsYXNzTmFtZSksXG4gICAgICAgICAgICAgICAgICByZW5kZXJDb21wVHlwZVZhcixcbiAgICAgICAgICAgICAgICAgIFZpZXdUeXBlRW51bS5mcm9tVmFsdWUodmlldy52aWV3VHlwZSksXG4gICAgICAgICAgICAgICAgICBvLmxpdGVyYWxNYXAoZW1wdHlUZW1wbGF0ZVZhcmlhYmxlQmluZGluZ3MpLFxuICAgICAgICAgICAgICAgICAgVmlld0NvbnN0cnVjdG9yVmFycy52aWV3VXRpbHMsXG4gICAgICAgICAgICAgICAgICBWaWV3Q29uc3RydWN0b3JWYXJzLnBhcmVudEluamVjdG9yLFxuICAgICAgICAgICAgICAgICAgVmlld0NvbnN0cnVjdG9yVmFycy5kZWNsYXJhdGlvbkVsLFxuICAgICAgICAgICAgICAgICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lFbnVtLmZyb21WYWx1ZShnZXRDaGFuZ2VEZXRlY3Rpb25Nb2RlKHZpZXcpKSxcbiAgICAgICAgICAgICAgICAgIG5vZGVEZWJ1Z0luZm9zVmFyXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgLnRvU3RtdCgpXG4gIF0pO1xuXG4gIHZhciB2aWV3TWV0aG9kcyA9IFtcbiAgICBuZXcgby5DbGFzc01ldGhvZCgnY3JlYXRlSW50ZXJuYWwnLCBbbmV3IG8uRm5QYXJhbShyb290U2VsZWN0b3JWYXIubmFtZSwgby5TVFJJTkdfVFlQRSldLFxuICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlQ3JlYXRlTWV0aG9kKHZpZXcpLCBvLmltcG9ydFR5cGUoSWRlbnRpZmllcnMuQXBwRWxlbWVudCkpLFxuICAgIG5ldyBvLkNsYXNzTWV0aG9kKFxuICAgICAgICAnaW5qZWN0b3JHZXRJbnRlcm5hbCcsXG4gICAgICAgIFtcbiAgICAgICAgICBuZXcgby5GblBhcmFtKEluamVjdE1ldGhvZFZhcnMudG9rZW4ubmFtZSwgby5EWU5BTUlDX1RZUEUpLFxuICAgICAgICAgIC8vIE5vdGU6IENhbid0IHVzZSBvLklOVF9UWVBFIGhlcmUgYXMgdGhlIG1ldGhvZCBpbiBBcHBWaWV3IHVzZXMgbnVtYmVyXG4gICAgICAgICAgbmV3IG8uRm5QYXJhbShJbmplY3RNZXRob2RWYXJzLnJlcXVlc3ROb2RlSW5kZXgubmFtZSwgby5OVU1CRVJfVFlQRSksXG4gICAgICAgICAgbmV3IG8uRm5QYXJhbShJbmplY3RNZXRob2RWYXJzLm5vdEZvdW5kUmVzdWx0Lm5hbWUsIG8uRFlOQU1JQ19UWVBFKVxuICAgICAgICBdLFxuICAgICAgICBhZGRSZXR1cm5WYWx1ZWZOb3RFbXB0eSh2aWV3LmluamVjdG9yR2V0TWV0aG9kLmZpbmlzaCgpLCBJbmplY3RNZXRob2RWYXJzLm5vdEZvdW5kUmVzdWx0KSxcbiAgICAgICAgby5EWU5BTUlDX1RZUEUpLFxuICAgIG5ldyBvLkNsYXNzTWV0aG9kKCdkZXRlY3RDaGFuZ2VzSW50ZXJuYWwnLFxuICAgICAgICAgICAgICAgICAgICAgIFtuZXcgby5GblBhcmFtKERldGVjdENoYW5nZXNWYXJzLnRocm93T25DaGFuZ2UubmFtZSwgby5CT09MX1RZUEUpXSxcbiAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZURldGVjdENoYW5nZXNNZXRob2QodmlldykpLFxuICAgIG5ldyBvLkNsYXNzTWV0aG9kKCdkaXJ0eVBhcmVudFF1ZXJpZXNJbnRlcm5hbCcsIFtdLCB2aWV3LmRpcnR5UGFyZW50UXVlcmllc01ldGhvZC5maW5pc2goKSksXG4gICAgbmV3IG8uQ2xhc3NNZXRob2QoJ2Rlc3Ryb3lJbnRlcm5hbCcsIFtdLCB2aWV3LmRlc3Ryb3lNZXRob2QuZmluaXNoKCkpXG4gIF0uY29uY2F0KHZpZXcuZXZlbnRIYW5kbGVyTWV0aG9kcyk7XG4gIHZhciB2aWV3Q2xhc3MgPSBuZXcgby5DbGFzc1N0bXQoXG4gICAgICB2aWV3LmNsYXNzTmFtZSwgby5pbXBvcnRFeHByKElkZW50aWZpZXJzLkFwcFZpZXcsIFtnZXRDb250ZXh0VHlwZSh2aWV3KV0pLCB2aWV3LmZpZWxkcyxcbiAgICAgIHZpZXcuZ2V0dGVycywgdmlld0NvbnN0cnVjdG9yLCB2aWV3TWV0aG9kcy5maWx0ZXIoKG1ldGhvZCkgPT4gbWV0aG9kLmJvZHkubGVuZ3RoID4gMCkpO1xuICByZXR1cm4gdmlld0NsYXNzO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVWaWV3RmFjdG9yeSh2aWV3OiBDb21waWxlVmlldywgdmlld0NsYXNzOiBvLkNsYXNzU3RtdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlckNvbXBUeXBlVmFyOiBvLlJlYWRWYXJFeHByKTogby5TdGF0ZW1lbnQge1xuICB2YXIgdmlld0ZhY3RvcnlBcmdzID0gW1xuICAgIG5ldyBvLkZuUGFyYW0oVmlld0NvbnN0cnVjdG9yVmFycy52aWV3VXRpbHMubmFtZSwgby5pbXBvcnRUeXBlKElkZW50aWZpZXJzLlZpZXdVdGlscykpLFxuICAgIG5ldyBvLkZuUGFyYW0oVmlld0NvbnN0cnVjdG9yVmFycy5wYXJlbnRJbmplY3Rvci5uYW1lLCBvLmltcG9ydFR5cGUoSWRlbnRpZmllcnMuSW5qZWN0b3IpKSxcbiAgICBuZXcgby5GblBhcmFtKFZpZXdDb25zdHJ1Y3RvclZhcnMuZGVjbGFyYXRpb25FbC5uYW1lLCBvLmltcG9ydFR5cGUoSWRlbnRpZmllcnMuQXBwRWxlbWVudCkpXG4gIF07XG4gIHZhciBpbml0UmVuZGVyQ29tcFR5cGVTdG10cyA9IFtdO1xuICB2YXIgdGVtcGxhdGVVcmxJbmZvO1xuICBpZiAodmlldy5jb21wb25lbnQudGVtcGxhdGUudGVtcGxhdGVVcmwgPT0gdmlldy5jb21wb25lbnQudHlwZS5tb2R1bGVVcmwpIHtcbiAgICB0ZW1wbGF0ZVVybEluZm8gPVxuICAgICAgICBgJHt2aWV3LmNvbXBvbmVudC50eXBlLm1vZHVsZVVybH0gY2xhc3MgJHt2aWV3LmNvbXBvbmVudC50eXBlLm5hbWV9IC0gaW5saW5lIHRlbXBsYXRlYDtcbiAgfSBlbHNlIHtcbiAgICB0ZW1wbGF0ZVVybEluZm8gPSB2aWV3LmNvbXBvbmVudC50ZW1wbGF0ZS50ZW1wbGF0ZVVybDtcbiAgfVxuICBpZiAodmlldy52aWV3SW5kZXggPT09IDApIHtcbiAgICBpbml0UmVuZGVyQ29tcFR5cGVTdG10cyA9IFtcbiAgICAgIG5ldyBvLklmU3RtdChyZW5kZXJDb21wVHlwZVZhci5pZGVudGljYWwoby5OVUxMX0VYUFIpLFxuICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgIHJlbmRlckNvbXBUeXBlVmFyLnNldChWaWV3Q29uc3RydWN0b3JWYXJzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC52aWV3VXRpbHMuY2FsbE1ldGhvZCgnY3JlYXRlUmVuZGVyQ29tcG9uZW50VHlwZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8ubGl0ZXJhbCh0ZW1wbGF0ZVVybEluZm8pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLmxpdGVyYWwodmlldy5jb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGVtcGxhdGUubmdDb250ZW50U2VsZWN0b3JzLmxlbmd0aCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZpZXdFbmNhcHN1bGF0aW9uRW51bVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZyb21WYWx1ZSh2aWV3LmNvbXBvbmVudC50ZW1wbGF0ZS5lbmNhcHN1bGF0aW9uKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5zdHlsZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgIC50b1N0bXQoKVxuICAgICAgICAgICAgICAgICAgIF0pXG4gICAgXTtcbiAgfVxuICByZXR1cm4gby5mbih2aWV3RmFjdG9yeUFyZ3MsIGluaXRSZW5kZXJDb21wVHlwZVN0bXRzLmNvbmNhdChbXG4gICAgICAgICAgICBuZXcgby5SZXR1cm5TdGF0ZW1lbnQoby52YXJpYWJsZSh2aWV3Q2xhc3MubmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmluc3RhbnRpYXRlKHZpZXdDbGFzcy5jb25zdHJ1Y3Rvck1ldGhvZC5wYXJhbXMubWFwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHBhcmFtKSA9PiBvLnZhcmlhYmxlKHBhcmFtLm5hbWUpKSkpXG4gICAgICAgICAgXSksXG4gICAgICAgICAgICAgIG8uaW1wb3J0VHlwZShJZGVudGlmaWVycy5BcHBWaWV3LCBbZ2V0Q29udGV4dFR5cGUodmlldyldKSlcbiAgICAgIC50b0RlY2xTdG10KHZpZXcudmlld0ZhY3RvcnkubmFtZSwgW28uU3RtdE1vZGlmaWVyLkZpbmFsXSk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlQ3JlYXRlTWV0aG9kKHZpZXc6IENvbXBpbGVWaWV3KTogby5TdGF0ZW1lbnRbXSB7XG4gIHZhciBwYXJlbnRSZW5kZXJOb2RlRXhwcjogby5FeHByZXNzaW9uID0gby5OVUxMX0VYUFI7XG4gIHZhciBwYXJlbnRSZW5kZXJOb2RlU3RtdHMgPSBbXTtcbiAgaWYgKHZpZXcudmlld1R5cGUgPT09IFZpZXdUeXBlLkNPTVBPTkVOVCkge1xuICAgIHBhcmVudFJlbmRlck5vZGVFeHByID0gVmlld1Byb3BlcnRpZXMucmVuZGVyZXIuY2FsbE1ldGhvZChcbiAgICAgICAgJ2NyZWF0ZVZpZXdSb290JywgW28uVEhJU19FWFBSLnByb3AoJ2RlY2xhcmF0aW9uQXBwRWxlbWVudCcpLnByb3AoJ25hdGl2ZUVsZW1lbnQnKV0pO1xuICAgIHBhcmVudFJlbmRlck5vZGVTdG10cyA9IFtcbiAgICAgIHBhcmVudFJlbmRlck5vZGVWYXIuc2V0KHBhcmVudFJlbmRlck5vZGVFeHByKVxuICAgICAgICAgIC50b0RlY2xTdG10KG8uaW1wb3J0VHlwZSh2aWV3LmdlbkNvbmZpZy5yZW5kZXJUeXBlcy5yZW5kZXJOb2RlKSwgW28uU3RtdE1vZGlmaWVyLkZpbmFsXSlcbiAgICBdO1xuICB9XG4gIHZhciByZXN1bHRFeHByOiBvLkV4cHJlc3Npb247XG4gIGlmICh2aWV3LnZpZXdUeXBlID09PSBWaWV3VHlwZS5IT1NUKSB7XG4gICAgcmVzdWx0RXhwciA9ICg8Q29tcGlsZUVsZW1lbnQ+dmlldy5ub2Rlc1swXSkuYXBwRWxlbWVudDtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHRFeHByID0gby5OVUxMX0VYUFI7XG4gIH1cbiAgcmV0dXJuIHBhcmVudFJlbmRlck5vZGVTdG10cy5jb25jYXQodmlldy5jcmVhdGVNZXRob2QuZmluaXNoKCkpXG4gICAgICAuY29uY2F0KFtcbiAgICAgICAgby5USElTX0VYUFIuY2FsbE1ldGhvZCgnaW5pdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlRmxhdEFycmF5KHZpZXcucm9vdE5vZGVzT3JBcHBFbGVtZW50cyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLmxpdGVyYWxBcnIodmlldy5ub2Rlcy5tYXAobm9kZSA9PiBub2RlLnJlbmRlck5vZGUpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8ubGl0ZXJhbEFycih2aWV3LmRpc3Bvc2FibGVzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8ubGl0ZXJhbEFycih2aWV3LnN1YnNjcmlwdGlvbnMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIC50b1N0bXQoKSxcbiAgICAgICAgbmV3IG8uUmV0dXJuU3RhdGVtZW50KHJlc3VsdEV4cHIpXG4gICAgICBdKTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVEZXRlY3RDaGFuZ2VzTWV0aG9kKHZpZXc6IENvbXBpbGVWaWV3KTogby5TdGF0ZW1lbnRbXSB7XG4gIHZhciBzdG10cyA9IFtdO1xuICBpZiAodmlldy5kZXRlY3RDaGFuZ2VzSW5JbnB1dHNNZXRob2QuaXNFbXB0eSgpICYmIHZpZXcudXBkYXRlQ29udGVudFF1ZXJpZXNNZXRob2QuaXNFbXB0eSgpICYmXG4gICAgICB2aWV3LmFmdGVyQ29udGVudExpZmVjeWNsZUNhbGxiYWNrc01ldGhvZC5pc0VtcHR5KCkgJiZcbiAgICAgIHZpZXcuZGV0ZWN0Q2hhbmdlc1JlbmRlclByb3BlcnRpZXNNZXRob2QuaXNFbXB0eSgpICYmXG4gICAgICB2aWV3LnVwZGF0ZVZpZXdRdWVyaWVzTWV0aG9kLmlzRW1wdHkoKSAmJiB2aWV3LmFmdGVyVmlld0xpZmVjeWNsZUNhbGxiYWNrc01ldGhvZC5pc0VtcHR5KCkpIHtcbiAgICByZXR1cm4gc3RtdHM7XG4gIH1cbiAgTGlzdFdyYXBwZXIuYWRkQWxsKHN0bXRzLCB2aWV3LmRldGVjdENoYW5nZXNJbklucHV0c01ldGhvZC5maW5pc2goKSk7XG4gIHN0bXRzLnB1c2goXG4gICAgICBvLlRISVNfRVhQUi5jYWxsTWV0aG9kKCdkZXRlY3RDb250ZW50Q2hpbGRyZW5DaGFuZ2VzJywgW0RldGVjdENoYW5nZXNWYXJzLnRocm93T25DaGFuZ2VdKVxuICAgICAgICAgIC50b1N0bXQoKSk7XG4gIHZhciBhZnRlckNvbnRlbnRTdG10cyA9IHZpZXcudXBkYXRlQ29udGVudFF1ZXJpZXNNZXRob2QuZmluaXNoKCkuY29uY2F0KFxuICAgICAgdmlldy5hZnRlckNvbnRlbnRMaWZlY3ljbGVDYWxsYmFja3NNZXRob2QuZmluaXNoKCkpO1xuICBpZiAoYWZ0ZXJDb250ZW50U3RtdHMubGVuZ3RoID4gMCkge1xuICAgIHN0bXRzLnB1c2gobmV3IG8uSWZTdG10KG8ubm90KERldGVjdENoYW5nZXNWYXJzLnRocm93T25DaGFuZ2UpLCBhZnRlckNvbnRlbnRTdG10cykpO1xuICB9XG4gIExpc3RXcmFwcGVyLmFkZEFsbChzdG10cywgdmlldy5kZXRlY3RDaGFuZ2VzUmVuZGVyUHJvcGVydGllc01ldGhvZC5maW5pc2goKSk7XG4gIHN0bXRzLnB1c2goby5USElTX0VYUFIuY2FsbE1ldGhvZCgnZGV0ZWN0Vmlld0NoaWxkcmVuQ2hhbmdlcycsIFtEZXRlY3RDaGFuZ2VzVmFycy50aHJvd09uQ2hhbmdlXSlcbiAgICAgICAgICAgICAgICAgLnRvU3RtdCgpKTtcbiAgdmFyIGFmdGVyVmlld1N0bXRzID1cbiAgICAgIHZpZXcudXBkYXRlVmlld1F1ZXJpZXNNZXRob2QuZmluaXNoKCkuY29uY2F0KHZpZXcuYWZ0ZXJWaWV3TGlmZWN5Y2xlQ2FsbGJhY2tzTWV0aG9kLmZpbmlzaCgpKTtcbiAgaWYgKGFmdGVyVmlld1N0bXRzLmxlbmd0aCA+IDApIHtcbiAgICBzdG10cy5wdXNoKG5ldyBvLklmU3RtdChvLm5vdChEZXRlY3RDaGFuZ2VzVmFycy50aHJvd09uQ2hhbmdlKSwgYWZ0ZXJWaWV3U3RtdHMpKTtcbiAgfVxuXG4gIHZhciB2YXJTdG10cyA9IFtdO1xuICB2YXIgcmVhZFZhcnMgPSBvLmZpbmRSZWFkVmFyTmFtZXMoc3RtdHMpO1xuICBpZiAoU2V0V3JhcHBlci5oYXMocmVhZFZhcnMsIERldGVjdENoYW5nZXNWYXJzLmNoYW5nZWQubmFtZSkpIHtcbiAgICB2YXJTdG10cy5wdXNoKERldGVjdENoYW5nZXNWYXJzLmNoYW5nZWQuc2V0KG8ubGl0ZXJhbCh0cnVlKSkudG9EZWNsU3RtdChvLkJPT0xfVFlQRSkpO1xuICB9XG4gIGlmIChTZXRXcmFwcGVyLmhhcyhyZWFkVmFycywgRGV0ZWN0Q2hhbmdlc1ZhcnMuY2hhbmdlcy5uYW1lKSkge1xuICAgIHZhclN0bXRzLnB1c2goRGV0ZWN0Q2hhbmdlc1ZhcnMuY2hhbmdlcy5zZXQoby5OVUxMX0VYUFIpXG4gICAgICAgICAgICAgICAgICAgICAgLnRvRGVjbFN0bXQobmV3IG8uTWFwVHlwZShvLmltcG9ydFR5cGUoSWRlbnRpZmllcnMuU2ltcGxlQ2hhbmdlKSkpKTtcbiAgfVxuICBpZiAoU2V0V3JhcHBlci5oYXMocmVhZFZhcnMsIERldGVjdENoYW5nZXNWYXJzLnZhbFVud3JhcHBlci5uYW1lKSkge1xuICAgIHZhclN0bXRzLnB1c2goXG4gICAgICAgIERldGVjdENoYW5nZXNWYXJzLnZhbFVud3JhcHBlci5zZXQoby5pbXBvcnRFeHByKElkZW50aWZpZXJzLlZhbHVlVW53cmFwcGVyKS5pbnN0YW50aWF0ZShbXSkpXG4gICAgICAgICAgICAudG9EZWNsU3RtdChudWxsLCBbby5TdG10TW9kaWZpZXIuRmluYWxdKSk7XG4gIH1cbiAgcmV0dXJuIHZhclN0bXRzLmNvbmNhdChzdG10cyk7XG59XG5cbmZ1bmN0aW9uIGFkZFJldHVyblZhbHVlZk5vdEVtcHR5KHN0YXRlbWVudHM6IG8uU3RhdGVtZW50W10sIHZhbHVlOiBvLkV4cHJlc3Npb24pOiBvLlN0YXRlbWVudFtdIHtcbiAgaWYgKHN0YXRlbWVudHMubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBzdGF0ZW1lbnRzLmNvbmNhdChbbmV3IG8uUmV0dXJuU3RhdGVtZW50KHZhbHVlKV0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzdGF0ZW1lbnRzO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldENvbnRleHRUeXBlKHZpZXc6IENvbXBpbGVWaWV3KTogby5UeXBlIHtcbiAgdmFyIHR5cGVNZXRhID0gdmlldy5jb21wb25lbnQudHlwZTtcbiAgcmV0dXJuIHR5cGVNZXRhLmlzSG9zdCA/IG8uRFlOQU1JQ19UWVBFIDogby5pbXBvcnRUeXBlKHR5cGVNZXRhKTtcbn1cblxuZnVuY3Rpb24gZ2V0Q2hhbmdlRGV0ZWN0aW9uTW9kZSh2aWV3OiBDb21waWxlVmlldyk6IENoYW5nZURldGVjdGlvblN0cmF0ZWd5IHtcbiAgdmFyIG1vZGU6IENoYW5nZURldGVjdGlvblN0cmF0ZWd5O1xuICBpZiAodmlldy52aWV3VHlwZSA9PT0gVmlld1R5cGUuQ09NUE9ORU5UKSB7XG4gICAgbW9kZSA9IGlzRGVmYXVsdENoYW5nZURldGVjdGlvblN0cmF0ZWd5KHZpZXcuY29tcG9uZW50LmNoYW5nZURldGVjdGlvbikgP1xuICAgICAgICAgICAgICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuQ2hlY2tBbHdheXMgOlxuICAgICAgICAgICAgICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuQ2hlY2tPbmNlO1xuICB9IGVsc2Uge1xuICAgIG1vZGUgPSBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5DaGVja0Fsd2F5cztcbiAgfVxuICByZXR1cm4gbW9kZTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
