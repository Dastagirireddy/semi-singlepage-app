System.register(['../output/output_ast', '../identifiers', './constants', 'angular2/src/facade/lang', 'angular2/src/facade/collection', '../template_ast', '../compile_metadata', './util', './compile_query', './compile_method'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var o, identifiers_1, constants_1, lang_1, collection_1, template_ast_1, compile_metadata_1, util_1, compile_query_1, compile_method_1;
    var CompileNode, CompileElement, _QueryWithRead;
    function createInjectInternalCondition(nodeIndex, childNodeCount, provider, providerExpr) {
        var indexCondition;
        if (childNodeCount > 0) {
            indexCondition = o.literal(nodeIndex)
                .lowerEquals(constants_1.InjectMethodVars.requestNodeIndex)
                .and(constants_1.InjectMethodVars.requestNodeIndex.lowerEquals(o.literal(nodeIndex + childNodeCount)));
        }
        else {
            indexCondition = o.literal(nodeIndex).identical(constants_1.InjectMethodVars.requestNodeIndex);
        }
        return new o.IfStmt(constants_1.InjectMethodVars.token.identical(util_1.createDiTokenExpression(provider.token)).and(indexCondition), [new o.ReturnStatement(providerExpr)]);
    }
    function createProviderProperty(propName, provider, providerValueExpressions, isMulti, isEager, compileElement) {
        var view = compileElement.view;
        var resolvedProviderValueExpr;
        var type;
        if (isMulti) {
            resolvedProviderValueExpr = o.literalArr(providerValueExpressions);
            type = new o.ArrayType(o.DYNAMIC_TYPE);
        }
        else {
            resolvedProviderValueExpr = providerValueExpressions[0];
            type = providerValueExpressions[0].type;
        }
        if (lang_1.isBlank(type)) {
            type = o.DYNAMIC_TYPE;
        }
        if (isEager) {
            view.fields.push(new o.ClassField(propName, type, [o.StmtModifier.Private]));
            view.createMethod.addStmt(o.THIS_EXPR.prop(propName).set(resolvedProviderValueExpr).toStmt());
        }
        else {
            var internalField = "_" + propName;
            view.fields.push(new o.ClassField(internalField, type, [o.StmtModifier.Private]));
            var getter = new compile_method_1.CompileMethod(view);
            getter.resetDebugInfo(compileElement.nodeIndex, compileElement.sourceAst);
            // Note: Equals is important for JS so that it also checks the undefined case!
            getter.addStmt(new o.IfStmt(o.THIS_EXPR.prop(internalField).isBlank(), [o.THIS_EXPR.prop(internalField).set(resolvedProviderValueExpr).toStmt()]));
            getter.addStmt(new o.ReturnStatement(o.THIS_EXPR.prop(internalField)));
            view.getters.push(new o.ClassGetter(propName, getter.finish(), type));
        }
        return o.THIS_EXPR.prop(propName);
    }
    return {
        setters:[
            function (o_1) {
                o = o_1;
            },
            function (identifiers_1_1) {
                identifiers_1 = identifiers_1_1;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (template_ast_1_1) {
                template_ast_1 = template_ast_1_1;
            },
            function (compile_metadata_1_1) {
                compile_metadata_1 = compile_metadata_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (compile_query_1_1) {
                compile_query_1 = compile_query_1_1;
            },
            function (compile_method_1_1) {
                compile_method_1 = compile_method_1_1;
            }],
        execute: function() {
            CompileNode = (function () {
                function CompileNode(parent, view, nodeIndex, renderNode, sourceAst) {
                    this.parent = parent;
                    this.view = view;
                    this.nodeIndex = nodeIndex;
                    this.renderNode = renderNode;
                    this.sourceAst = sourceAst;
                }
                CompileNode.prototype.isNull = function () { return lang_1.isBlank(this.renderNode); };
                CompileNode.prototype.isRootElement = function () { return this.view != this.parent.view; };
                return CompileNode;
            }());
            exports_1("CompileNode", CompileNode);
            CompileElement = (function (_super) {
                __extends(CompileElement, _super);
                function CompileElement(parent, view, nodeIndex, renderNode, sourceAst, component, _directives, _resolvedProvidersArray, hasViewContainer, hasEmbeddedView, references) {
                    var _this = this;
                    _super.call(this, parent, view, nodeIndex, renderNode, sourceAst);
                    this.component = component;
                    this._directives = _directives;
                    this._resolvedProvidersArray = _resolvedProvidersArray;
                    this.hasViewContainer = hasViewContainer;
                    this.hasEmbeddedView = hasEmbeddedView;
                    this._compViewExpr = null;
                    this._instances = new compile_metadata_1.CompileTokenMap();
                    this._queryCount = 0;
                    this._queries = new compile_metadata_1.CompileTokenMap();
                    this._componentConstructorViewQueryLists = [];
                    this.contentNodesByNgContentIndex = null;
                    this.referenceTokens = {};
                    references.forEach(function (ref) { return _this.referenceTokens[ref.name] = ref.value; });
                    this.elementRef = o.importExpr(identifiers_1.Identifiers.ElementRef).instantiate([this.renderNode]);
                    this._instances.add(identifiers_1.identifierToken(identifiers_1.Identifiers.ElementRef), this.elementRef);
                    this.injector = o.THIS_EXPR.callMethod('injector', [o.literal(this.nodeIndex)]);
                    this._instances.add(identifiers_1.identifierToken(identifiers_1.Identifiers.Injector), this.injector);
                    this._instances.add(identifiers_1.identifierToken(identifiers_1.Identifiers.Renderer), o.THIS_EXPR.prop('renderer'));
                    if (this.hasViewContainer || this.hasEmbeddedView || lang_1.isPresent(this.component)) {
                        this._createAppElement();
                    }
                }
                CompileElement.createNull = function () {
                    return new CompileElement(null, null, null, null, null, null, [], [], false, false, []);
                };
                CompileElement.prototype._createAppElement = function () {
                    var fieldName = "_appEl_" + this.nodeIndex;
                    var parentNodeIndex = this.isRootElement() ? null : this.parent.nodeIndex;
                    this.view.fields.push(new o.ClassField(fieldName, o.importType(identifiers_1.Identifiers.AppElement), [o.StmtModifier.Private]));
                    var statement = o.THIS_EXPR.prop(fieldName)
                        .set(o.importExpr(identifiers_1.Identifiers.AppElement)
                        .instantiate([
                        o.literal(this.nodeIndex),
                        o.literal(parentNodeIndex),
                        o.THIS_EXPR,
                        this.renderNode
                    ]))
                        .toStmt();
                    this.view.createMethod.addStmt(statement);
                    this.appElement = o.THIS_EXPR.prop(fieldName);
                    this._instances.add(identifiers_1.identifierToken(identifiers_1.Identifiers.AppElement), this.appElement);
                };
                CompileElement.prototype.setComponentView = function (compViewExpr) {
                    this._compViewExpr = compViewExpr;
                    this.contentNodesByNgContentIndex =
                        collection_1.ListWrapper.createFixedSize(this.component.template.ngContentSelectors.length);
                    for (var i = 0; i < this.contentNodesByNgContentIndex.length; i++) {
                        this.contentNodesByNgContentIndex[i] = [];
                    }
                };
                CompileElement.prototype.setEmbeddedView = function (embeddedView) {
                    this.embeddedView = embeddedView;
                    if (lang_1.isPresent(embeddedView)) {
                        var createTemplateRefExpr = o.importExpr(identifiers_1.Identifiers.TemplateRef_)
                            .instantiate([this.appElement, this.embeddedView.viewFactory]);
                        var provider = new compile_metadata_1.CompileProviderMetadata({ token: identifiers_1.identifierToken(identifiers_1.Identifiers.TemplateRef), useValue: createTemplateRefExpr });
                        // Add TemplateRef as first provider as it does not have deps on other providers
                        this._resolvedProvidersArray.unshift(new template_ast_1.ProviderAst(provider.token, false, true, [provider], template_ast_1.ProviderAstType.Builtin, this.sourceAst.sourceSpan));
                    }
                };
                CompileElement.prototype.beforeChildren = function () {
                    var _this = this;
                    if (this.hasViewContainer) {
                        this._instances.add(identifiers_1.identifierToken(identifiers_1.Identifiers.ViewContainerRef), this.appElement.prop('vcRef'));
                    }
                    this._resolvedProviders = new compile_metadata_1.CompileTokenMap();
                    this._resolvedProvidersArray.forEach(function (provider) {
                        return _this._resolvedProviders.add(provider.token, provider);
                    });
                    // create all the provider instances, some in the view constructor,
                    // some as getters. We rely on the fact that they are already sorted topologically.
                    this._resolvedProviders.values().forEach(function (resolvedProvider) {
                        var providerValueExpressions = resolvedProvider.providers.map(function (provider) {
                            if (lang_1.isPresent(provider.useExisting)) {
                                return _this._getDependency(resolvedProvider.providerType, new compile_metadata_1.CompileDiDependencyMetadata({ token: provider.useExisting }));
                            }
                            else if (lang_1.isPresent(provider.useFactory)) {
                                var deps = lang_1.isPresent(provider.deps) ? provider.deps : provider.useFactory.diDeps;
                                var depsExpr = deps.map(function (dep) { return _this._getDependency(resolvedProvider.providerType, dep); });
                                return o.importExpr(provider.useFactory).callFn(depsExpr);
                            }
                            else if (lang_1.isPresent(provider.useClass)) {
                                var deps = lang_1.isPresent(provider.deps) ? provider.deps : provider.useClass.diDeps;
                                var depsExpr = deps.map(function (dep) { return _this._getDependency(resolvedProvider.providerType, dep); });
                                return o.importExpr(provider.useClass)
                                    .instantiate(depsExpr, o.importType(provider.useClass));
                            }
                            else {
                                if (provider.useValue instanceof compile_metadata_1.CompileIdentifierMetadata) {
                                    return o.importExpr(provider.useValue);
                                }
                                else if (provider.useValue instanceof o.Expression) {
                                    return provider.useValue;
                                }
                                else {
                                    return o.literal(provider.useValue);
                                }
                            }
                        });
                        var propName = "_" + resolvedProvider.token.name + "_" + _this.nodeIndex + "_" + _this._instances.size;
                        var instance = createProviderProperty(propName, resolvedProvider, providerValueExpressions, resolvedProvider.multiProvider, resolvedProvider.eager, _this);
                        _this._instances.add(resolvedProvider.token, instance);
                    });
                    this.directiveInstances =
                        this._directives.map(function (directive) { return _this._instances.get(identifiers_1.identifierToken(directive.type)); });
                    for (var i = 0; i < this.directiveInstances.length; i++) {
                        var directiveInstance = this.directiveInstances[i];
                        var directive = this._directives[i];
                        directive.queries.forEach(function (queryMeta) { _this._addQuery(queryMeta, directiveInstance); });
                    }
                    var queriesWithReads = [];
                    this._resolvedProviders.values().forEach(function (resolvedProvider) {
                        var queriesForProvider = _this._getQueriesFor(resolvedProvider.token);
                        collection_1.ListWrapper.addAll(queriesWithReads, queriesForProvider.map(function (query) { return new _QueryWithRead(query, resolvedProvider.token); }));
                    });
                    collection_1.StringMapWrapper.forEach(this.referenceTokens, function (_, varName) {
                        var token = _this.referenceTokens[varName];
                        var varValue;
                        if (lang_1.isPresent(token)) {
                            varValue = _this._instances.get(token);
                        }
                        else {
                            varValue = _this.renderNode;
                        }
                        _this.view.locals.set(varName, varValue);
                        var varToken = new compile_metadata_1.CompileTokenMetadata({ value: varName });
                        collection_1.ListWrapper.addAll(queriesWithReads, _this._getQueriesFor(varToken)
                            .map(function (query) { return new _QueryWithRead(query, varToken); }));
                    });
                    queriesWithReads.forEach(function (queryWithRead) {
                        var value;
                        if (lang_1.isPresent(queryWithRead.read.identifier)) {
                            // query for an identifier
                            value = _this._instances.get(queryWithRead.read);
                        }
                        else {
                            // query for a reference
                            var token = _this.referenceTokens[queryWithRead.read.value];
                            if (lang_1.isPresent(token)) {
                                value = _this._instances.get(token);
                            }
                            else {
                                value = _this.elementRef;
                            }
                        }
                        if (lang_1.isPresent(value)) {
                            queryWithRead.query.addValue(value, _this.view);
                        }
                    });
                    if (lang_1.isPresent(this.component)) {
                        var componentConstructorViewQueryList = lang_1.isPresent(this.component) ? o.literalArr(this._componentConstructorViewQueryLists) :
                            o.NULL_EXPR;
                        var compExpr = lang_1.isPresent(this.getComponent()) ? this.getComponent() : o.NULL_EXPR;
                        this.view.createMethod.addStmt(this.appElement.callMethod('initComponent', [compExpr, componentConstructorViewQueryList, this._compViewExpr])
                            .toStmt());
                    }
                };
                CompileElement.prototype.afterChildren = function (childNodeCount) {
                    var _this = this;
                    this._resolvedProviders.values().forEach(function (resolvedProvider) {
                        // Note: afterChildren is called after recursing into children.
                        // This is good so that an injector match in an element that is closer to a requesting element
                        // matches first.
                        var providerExpr = _this._instances.get(resolvedProvider.token);
                        // Note: view providers are only visible on the injector of that element.
                        // This is not fully correct as the rules during codegen don't allow a directive
                        // to get hold of a view provdier on the same element. We still do this semantic
                        // as it simplifies our model to having only one runtime injector per element.
                        var providerChildNodeCount = resolvedProvider.providerType === template_ast_1.ProviderAstType.PrivateService ? 0 : childNodeCount;
                        _this.view.injectorGetMethod.addStmt(createInjectInternalCondition(_this.nodeIndex, providerChildNodeCount, resolvedProvider, providerExpr));
                    });
                    this._queries.values().forEach(function (queries) {
                        return queries.forEach(function (query) { return query.afterChildren(_this.view.updateContentQueriesMethod); });
                    });
                };
                CompileElement.prototype.addContentNode = function (ngContentIndex, nodeExpr) {
                    this.contentNodesByNgContentIndex[ngContentIndex].push(nodeExpr);
                };
                CompileElement.prototype.getComponent = function () {
                    return lang_1.isPresent(this.component) ? this._instances.get(identifiers_1.identifierToken(this.component.type)) :
                        null;
                };
                CompileElement.prototype.getProviderTokens = function () {
                    return this._resolvedProviders.values().map(function (resolvedProvider) { return util_1.createDiTokenExpression(resolvedProvider.token); });
                };
                CompileElement.prototype._getQueriesFor = function (token) {
                    var result = [];
                    var currentEl = this;
                    var distance = 0;
                    var queries;
                    while (!currentEl.isNull()) {
                        queries = currentEl._queries.get(token);
                        if (lang_1.isPresent(queries)) {
                            collection_1.ListWrapper.addAll(result, queries.filter(function (query) { return query.meta.descendants || distance <= 1; }));
                        }
                        if (currentEl._directives.length > 0) {
                            distance++;
                        }
                        currentEl = currentEl.parent;
                    }
                    queries = this.view.componentView.viewQueries.get(token);
                    if (lang_1.isPresent(queries)) {
                        collection_1.ListWrapper.addAll(result, queries);
                    }
                    return result;
                };
                CompileElement.prototype._addQuery = function (queryMeta, directiveInstance) {
                    var propName = "_query_" + queryMeta.selectors[0].name + "_" + this.nodeIndex + "_" + this._queryCount++;
                    var queryList = compile_query_1.createQueryList(queryMeta, directiveInstance, propName, this.view);
                    var query = new compile_query_1.CompileQuery(queryMeta, queryList, directiveInstance, this.view);
                    compile_query_1.addQueryToTokenMap(this._queries, query);
                    return query;
                };
                CompileElement.prototype._getLocalDependency = function (requestingProviderType, dep) {
                    var result = null;
                    // constructor content query
                    if (lang_1.isBlank(result) && lang_1.isPresent(dep.query)) {
                        result = this._addQuery(dep.query, null).queryList;
                    }
                    // constructor view query
                    if (lang_1.isBlank(result) && lang_1.isPresent(dep.viewQuery)) {
                        result = compile_query_1.createQueryList(dep.viewQuery, null, "_viewQuery_" + dep.viewQuery.selectors[0].name + "_" + this.nodeIndex + "_" + this._componentConstructorViewQueryLists.length, this.view);
                        this._componentConstructorViewQueryLists.push(result);
                    }
                    if (lang_1.isPresent(dep.token)) {
                        // access builtins with special visibility
                        if (lang_1.isBlank(result)) {
                            if (dep.token.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.ChangeDetectorRef))) {
                                if (requestingProviderType === template_ast_1.ProviderAstType.Component) {
                                    return this._compViewExpr.prop('ref');
                                }
                                else {
                                    return o.THIS_EXPR.prop('ref');
                                }
                            }
                        }
                        // access regular providers on the element
                        if (lang_1.isBlank(result)) {
                            result = this._instances.get(dep.token);
                        }
                    }
                    return result;
                };
                CompileElement.prototype._getDependency = function (requestingProviderType, dep) {
                    var currElement = this;
                    var result = null;
                    if (dep.isValue) {
                        result = o.literal(dep.value);
                    }
                    if (lang_1.isBlank(result) && !dep.isSkipSelf) {
                        result = this._getLocalDependency(requestingProviderType, dep);
                    }
                    // check parent elements
                    while (lang_1.isBlank(result) && !currElement.parent.isNull()) {
                        currElement = currElement.parent;
                        result = currElement._getLocalDependency(template_ast_1.ProviderAstType.PublicService, new compile_metadata_1.CompileDiDependencyMetadata({ token: dep.token }));
                    }
                    if (lang_1.isBlank(result)) {
                        result = util_1.injectFromViewParentInjector(dep.token, dep.isOptional);
                    }
                    if (lang_1.isBlank(result)) {
                        result = o.NULL_EXPR;
                    }
                    return util_1.getPropertyInView(result, this.view, currElement.view);
                };
                return CompileElement;
            }(CompileNode));
            exports_1("CompileElement", CompileElement);
            _QueryWithRead = (function () {
                function _QueryWithRead(query, match) {
                    this.query = query;
                    this.read = lang_1.isPresent(query.meta.read) ? query.meta.read : match;
                }
                return _QueryWithRead;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci92aWV3X2NvbXBpbGVyL2NvbXBpbGVfZWxlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBMlZBLHVDQUF1QyxTQUFpQixFQUFFLGNBQXNCLEVBQ3pDLFFBQXFCLEVBQ3JCLFlBQTBCO1FBQy9ELElBQUksY0FBYyxDQUFDO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLGNBQWMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztpQkFDZixXQUFXLENBQUMsNEJBQWdCLENBQUMsZ0JBQWdCLENBQUM7aUJBQzlDLEdBQUcsQ0FBQyw0QkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQzlDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRSxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixjQUFjLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsNEJBQWdCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNyRixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FDZiw0QkFBZ0IsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLDhCQUF1QixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFDN0YsQ0FBQyxJQUFJLENBQUMsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxnQ0FBZ0MsUUFBZ0IsRUFBRSxRQUFxQixFQUN2Qyx3QkFBd0MsRUFBRSxPQUFnQixFQUMxRCxPQUFnQixFQUFFLGNBQThCO1FBQzlFLElBQUksSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJ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Q2hHLENBQUM7b0JBRUQsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDcEIsTUFBTSxHQUFHLG1DQUE0QixDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUNuRSxDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BCLE1BQU0sR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDO29CQUN2QixDQUFDO29CQUNELE1BQU0sQ0FBQyx3QkFBaUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hFLENBQUM7Z0JBQ0gscUJBQUM7WUFBRCxDQTNUQSxBQTJUQyxDQTNUbUMsV0FBVyxHQTJUOUM7WUEzVEQsMkNBMlRDLENBQUE7WUFxREQ7Z0JBRUUsd0JBQW1CLEtBQW1CLEVBQUUsS0FBMkI7b0JBQWhELFVBQUssR0FBTCxLQUFLLENBQWM7b0JBQ3BDLElBQUksQ0FBQyxJQUFJLEdBQUcsZ0JBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztnQkFDbkUsQ0FBQztnQkFDSCxxQkFBQztZQUFELENBTEEsQUFLQyxJQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci92aWV3X2NvbXBpbGVyL2NvbXBpbGVfZWxlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG8gZnJvbSAnLi4vb3V0cHV0L291dHB1dF9hc3QnO1xuaW1wb3J0IHtJZGVudGlmaWVycywgaWRlbnRpZmllclRva2VufSBmcm9tICcuLi9pZGVudGlmaWVycyc7XG5pbXBvcnQge0luamVjdE1ldGhvZFZhcnN9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7Q29tcGlsZVZpZXd9IGZyb20gJy4vY29tcGlsZV92aWV3JztcbmltcG9ydCB7aXNQcmVzZW50LCBpc0JsYW5rfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtMaXN0V3JhcHBlciwgU3RyaW5nTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7VGVtcGxhdGVBc3QsIFByb3ZpZGVyQXN0LCBQcm92aWRlckFzdFR5cGUsIFJlZmVyZW5jZUFzdH0gZnJvbSAnLi4vdGVtcGxhdGVfYXN0JztcbmltcG9ydCB7XG4gIENvbXBpbGVUb2tlbk1hcCxcbiAgQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLFxuICBDb21waWxlVG9rZW5NZXRhZGF0YSxcbiAgQ29tcGlsZVF1ZXJ5TWV0YWRhdGEsXG4gIENvbXBpbGVQcm92aWRlck1ldGFkYXRhLFxuICBDb21waWxlRGlEZXBlbmRlbmN5TWV0YWRhdGEsXG4gIENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEsXG4gIENvbXBpbGVUeXBlTWV0YWRhdGEsXG59IGZyb20gJy4uL2NvbXBpbGVfbWV0YWRhdGEnO1xuaW1wb3J0IHtnZXRQcm9wZXJ0eUluVmlldywgY3JlYXRlRGlUb2tlbkV4cHJlc3Npb24sIGluamVjdEZyb21WaWV3UGFyZW50SW5qZWN0b3J9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQge0NvbXBpbGVRdWVyeSwgY3JlYXRlUXVlcnlMaXN0LCBhZGRRdWVyeVRvVG9rZW5NYXB9IGZyb20gJy4vY29tcGlsZV9xdWVyeSc7XG5pbXBvcnQge0NvbXBpbGVNZXRob2R9IGZyb20gJy4vY29tcGlsZV9tZXRob2QnO1xuXG5leHBvcnQgY2xhc3MgQ29tcGlsZU5vZGUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGFyZW50OiBDb21waWxlRWxlbWVudCwgcHVibGljIHZpZXc6IENvbXBpbGVWaWV3LCBwdWJsaWMgbm9kZUluZGV4OiBudW1iZXIsXG4gICAgICAgICAgICAgIHB1YmxpYyByZW5kZXJOb2RlOiBvLkV4cHJlc3Npb24sIHB1YmxpYyBzb3VyY2VBc3Q6IFRlbXBsYXRlQXN0KSB7fVxuXG4gIGlzTnVsbCgpOiBib29sZWFuIHsgcmV0dXJuIGlzQmxhbmsodGhpcy5yZW5kZXJOb2RlKTsgfVxuXG4gIGlzUm9vdEVsZW1lbnQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnZpZXcgIT0gdGhpcy5wYXJlbnQudmlldzsgfVxufVxuXG5leHBvcnQgY2xhc3MgQ29tcGlsZUVsZW1lbnQgZXh0ZW5kcyBDb21waWxlTm9kZSB7XG4gIHN0YXRpYyBjcmVhdGVOdWxsKCk6IENvbXBpbGVFbGVtZW50IHtcbiAgICByZXR1cm4gbmV3IENvbXBpbGVFbGVtZW50KG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIFtdLCBbXSwgZmFsc2UsIGZhbHNlLCBbXSk7XG4gIH1cblxuICBwcml2YXRlIF9jb21wVmlld0V4cHI6IG8uRXhwcmVzc2lvbiA9IG51bGw7XG4gIHB1YmxpYyBhcHBFbGVtZW50OiBvLlJlYWRQcm9wRXhwcjtcbiAgcHVibGljIGVsZW1lbnRSZWY6IG8uRXhwcmVzc2lvbjtcbiAgcHVibGljIGluamVjdG9yOiBvLkV4cHJlc3Npb247XG4gIHByaXZhdGUgX2luc3RhbmNlcyA9IG5ldyBDb21waWxlVG9rZW5NYXA8by5FeHByZXNzaW9uPigpO1xuICBwcml2YXRlIF9yZXNvbHZlZFByb3ZpZGVyczogQ29tcGlsZVRva2VuTWFwPFByb3ZpZGVyQXN0PjtcblxuICBwcml2YXRlIF9xdWVyeUNvdW50ID0gMDtcbiAgcHJpdmF0ZSBfcXVlcmllcyA9IG5ldyBDb21waWxlVG9rZW5NYXA8Q29tcGlsZVF1ZXJ5W10+KCk7XG4gIHByaXZhdGUgX2NvbXBvbmVudENvbnN0cnVjdG9yVmlld1F1ZXJ5TGlzdHM6IG8uRXhwcmVzc2lvbltdID0gW107XG5cbiAgcHVibGljIGNvbnRlbnROb2Rlc0J5TmdDb250ZW50SW5kZXg6IEFycmF5PG8uRXhwcmVzc2lvbj5bXSA9IG51bGw7XG4gIHB1YmxpYyBlbWJlZGRlZFZpZXc6IENvbXBpbGVWaWV3O1xuICBwdWJsaWMgZGlyZWN0aXZlSW5zdGFuY2VzOiBvLkV4cHJlc3Npb25bXTtcbiAgcHVibGljIHJlZmVyZW5jZVRva2Vuczoge1trZXk6IHN0cmluZ106IENvbXBpbGVUb2tlbk1ldGFkYXRhfTtcblxuICBjb25zdHJ1Y3RvcihwYXJlbnQ6IENvbXBpbGVFbGVtZW50LCB2aWV3OiBDb21waWxlVmlldywgbm9kZUluZGV4OiBudW1iZXIsXG4gICAgICAgICAgICAgIHJlbmRlck5vZGU6IG8uRXhwcmVzc2lvbiwgc291cmNlQXN0OiBUZW1wbGF0ZUFzdCxcbiAgICAgICAgICAgICAgcHVibGljIGNvbXBvbmVudDogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLFxuICAgICAgICAgICAgICBwcml2YXRlIF9kaXJlY3RpdmVzOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGFbXSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfcmVzb2x2ZWRQcm92aWRlcnNBcnJheTogUHJvdmlkZXJBc3RbXSwgcHVibGljIGhhc1ZpZXdDb250YWluZXI6IGJvb2xlYW4sXG4gICAgICAgICAgICAgIHB1YmxpYyBoYXNFbWJlZGRlZFZpZXc6IGJvb2xlYW4sIHJlZmVyZW5jZXM6IFJlZmVyZW5jZUFzdFtdKSB7XG4gICAgc3VwZXIocGFyZW50LCB2aWV3LCBub2RlSW5kZXgsIHJlbmRlck5vZGUsIHNvdXJjZUFzdCk7XG4gICAgdGhpcy5yZWZlcmVuY2VUb2tlbnMgPSB7fTtcbiAgICByZWZlcmVuY2VzLmZvckVhY2gocmVmID0+IHRoaXMucmVmZXJlbmNlVG9rZW5zW3JlZi5uYW1lXSA9IHJlZi52YWx1ZSk7XG5cbiAgICB0aGlzLmVsZW1lbnRSZWYgPSBvLmltcG9ydEV4cHIoSWRlbnRpZmllcnMuRWxlbWVudFJlZikuaW5zdGFudGlhdGUoW3RoaXMucmVuZGVyTm9kZV0pO1xuICAgIHRoaXMuX2luc3RhbmNlcy5hZGQoaWRlbnRpZmllclRva2VuKElkZW50aWZpZXJzLkVsZW1lbnRSZWYpLCB0aGlzLmVsZW1lbnRSZWYpO1xuICAgIHRoaXMuaW5qZWN0b3IgPSBvLlRISVNfRVhQUi5jYWxsTWV0aG9kKCdpbmplY3RvcicsIFtvLmxpdGVyYWwodGhpcy5ub2RlSW5kZXgpXSk7XG4gICAgdGhpcy5faW5zdGFuY2VzLmFkZChpZGVudGlmaWVyVG9rZW4oSWRlbnRpZmllcnMuSW5qZWN0b3IpLCB0aGlzLmluamVjdG9yKTtcbiAgICB0aGlzLl9pbnN0YW5jZXMuYWRkKGlkZW50aWZpZXJUb2tlbihJZGVudGlmaWVycy5SZW5kZXJlciksIG8uVEhJU19FWFBSLnByb3AoJ3JlbmRlcmVyJykpO1xuICAgIGlmICh0aGlzLmhhc1ZpZXdDb250YWluZXIgfHwgdGhpcy5oYXNFbWJlZGRlZFZpZXcgfHwgaXNQcmVzZW50KHRoaXMuY29tcG9uZW50KSkge1xuICAgICAgdGhpcy5fY3JlYXRlQXBwRWxlbWVudCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUFwcEVsZW1lbnQoKSB7XG4gICAgdmFyIGZpZWxkTmFtZSA9IGBfYXBwRWxfJHt0aGlzLm5vZGVJbmRleH1gO1xuICAgIHZhciBwYXJlbnROb2RlSW5kZXggPSB0aGlzLmlzUm9vdEVsZW1lbnQoKSA/IG51bGwgOiB0aGlzLnBhcmVudC5ub2RlSW5kZXg7XG4gICAgdGhpcy52aWV3LmZpZWxkcy5wdXNoKG5ldyBvLkNsYXNzRmllbGQoZmllbGROYW1lLCBvLmltcG9ydFR5cGUoSWRlbnRpZmllcnMuQXBwRWxlbWVudCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW28uU3RtdE1vZGlmaWVyLlByaXZhdGVdKSk7XG4gICAgdmFyIHN0YXRlbWVudCA9IG8uVEhJU19FWFBSLnByb3AoZmllbGROYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNldChvLmltcG9ydEV4cHIoSWRlbnRpZmllcnMuQXBwRWxlbWVudClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbnN0YW50aWF0ZShbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8ubGl0ZXJhbCh0aGlzLm5vZGVJbmRleCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8ubGl0ZXJhbChwYXJlbnROb2RlSW5kZXgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLlRISVNfRVhQUixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJOb2RlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50b1N0bXQoKTtcbiAgICB0aGlzLnZpZXcuY3JlYXRlTWV0aG9kLmFkZFN0bXQoc3RhdGVtZW50KTtcbiAgICB0aGlzLmFwcEVsZW1lbnQgPSBvLlRISVNfRVhQUi5wcm9wKGZpZWxkTmFtZSk7XG4gICAgdGhpcy5faW5zdGFuY2VzLmFkZChpZGVudGlmaWVyVG9rZW4oSWRlbnRpZmllcnMuQXBwRWxlbWVudCksIHRoaXMuYXBwRWxlbWVudCk7XG4gIH1cblxuICBzZXRDb21wb25lbnRWaWV3KGNvbXBWaWV3RXhwcjogby5FeHByZXNzaW9uKSB7XG4gICAgdGhpcy5fY29tcFZpZXdFeHByID0gY29tcFZpZXdFeHByO1xuICAgIHRoaXMuY29udGVudE5vZGVzQnlOZ0NvbnRlbnRJbmRleCA9XG4gICAgICAgIExpc3RXcmFwcGVyLmNyZWF0ZUZpeGVkU2l6ZSh0aGlzLmNvbXBvbmVudC50ZW1wbGF0ZS5uZ0NvbnRlbnRTZWxlY3RvcnMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY29udGVudE5vZGVzQnlOZ0NvbnRlbnRJbmRleC5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5jb250ZW50Tm9kZXNCeU5nQ29udGVudEluZGV4W2ldID0gW107XG4gICAgfVxuICB9XG5cbiAgc2V0RW1iZWRkZWRWaWV3KGVtYmVkZGVkVmlldzogQ29tcGlsZVZpZXcpIHtcbiAgICB0aGlzLmVtYmVkZGVkVmlldyA9IGVtYmVkZGVkVmlldztcbiAgICBpZiAoaXNQcmVzZW50KGVtYmVkZGVkVmlldykpIHtcbiAgICAgIHZhciBjcmVhdGVUZW1wbGF0ZVJlZkV4cHIgPVxuICAgICAgICAgIG8uaW1wb3J0RXhwcihJZGVudGlmaWVycy5UZW1wbGF0ZVJlZl8pXG4gICAgICAgICAgICAgIC5pbnN0YW50aWF0ZShbdGhpcy5hcHBFbGVtZW50LCB0aGlzLmVtYmVkZGVkVmlldy52aWV3RmFjdG9yeV0pO1xuICAgICAgdmFyIHByb3ZpZGVyID0gbmV3IENvbXBpbGVQcm92aWRlck1ldGFkYXRhKFxuICAgICAgICAgIHt0b2tlbjogaWRlbnRpZmllclRva2VuKElkZW50aWZpZXJzLlRlbXBsYXRlUmVmKSwgdXNlVmFsdWU6IGNyZWF0ZVRlbXBsYXRlUmVmRXhwcn0pO1xuICAgICAgLy8gQWRkIFRlbXBsYXRlUmVmIGFzIGZpcnN0IHByb3ZpZGVyIGFzIGl0IGRvZXMgbm90IGhhdmUgZGVwcyBvbiBvdGhlciBwcm92aWRlcnNcbiAgICAgIHRoaXMuX3Jlc29sdmVkUHJvdmlkZXJzQXJyYXkudW5zaGlmdChuZXcgUHJvdmlkZXJBc3QocHJvdmlkZXIudG9rZW4sIGZhbHNlLCB0cnVlLCBbcHJvdmlkZXJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcm92aWRlckFzdFR5cGUuQnVpbHRpbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VyY2VBc3Quc291cmNlU3BhbikpO1xuICAgIH1cbiAgfVxuXG4gIGJlZm9yZUNoaWxkcmVuKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmhhc1ZpZXdDb250YWluZXIpIHtcbiAgICAgIHRoaXMuX2luc3RhbmNlcy5hZGQoaWRlbnRpZmllclRva2VuKElkZW50aWZpZXJzLlZpZXdDb250YWluZXJSZWYpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcEVsZW1lbnQucHJvcCgndmNSZWYnKSk7XG4gICAgfVxuXG4gICAgdGhpcy5fcmVzb2x2ZWRQcm92aWRlcnMgPSBuZXcgQ29tcGlsZVRva2VuTWFwPFByb3ZpZGVyQXN0PigpO1xuICAgIHRoaXMuX3Jlc29sdmVkUHJvdmlkZXJzQXJyYXkuZm9yRWFjaChwcm92aWRlciA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVzb2x2ZWRQcm92aWRlcnMuYWRkKHByb3ZpZGVyLnRva2VuLCBwcm92aWRlcikpO1xuXG4gICAgLy8gY3JlYXRlIGFsbCB0aGUgcHJvdmlkZXIgaW5zdGFuY2VzLCBzb21lIGluIHRoZSB2aWV3IGNvbnN0cnVjdG9yLFxuICAgIC8vIHNvbWUgYXMgZ2V0dGVycy4gV2UgcmVseSBvbiB0aGUgZmFjdCB0aGF0IHRoZXkgYXJlIGFscmVhZHkgc29ydGVkIHRvcG9sb2dpY2FsbHkuXG4gICAgdGhpcy5fcmVzb2x2ZWRQcm92aWRlcnMudmFsdWVzKCkuZm9yRWFjaCgocmVzb2x2ZWRQcm92aWRlcikgPT4ge1xuICAgICAgdmFyIHByb3ZpZGVyVmFsdWVFeHByZXNzaW9ucyA9IHJlc29sdmVkUHJvdmlkZXIucHJvdmlkZXJzLm1hcCgocHJvdmlkZXIpID0+IHtcbiAgICAgICAgaWYgKGlzUHJlc2VudChwcm92aWRlci51c2VFeGlzdGluZykpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0RGVwZW5kZW5jeShcbiAgICAgICAgICAgICAgcmVzb2x2ZWRQcm92aWRlci5wcm92aWRlclR5cGUsXG4gICAgICAgICAgICAgIG5ldyBDb21waWxlRGlEZXBlbmRlbmN5TWV0YWRhdGEoe3Rva2VuOiBwcm92aWRlci51c2VFeGlzdGluZ30pKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQocHJvdmlkZXIudXNlRmFjdG9yeSkpIHtcbiAgICAgICAgICB2YXIgZGVwcyA9IGlzUHJlc2VudChwcm92aWRlci5kZXBzKSA/IHByb3ZpZGVyLmRlcHMgOiBwcm92aWRlci51c2VGYWN0b3J5LmRpRGVwcztcbiAgICAgICAgICB2YXIgZGVwc0V4cHIgPSBkZXBzLm1hcCgoZGVwKSA9PiB0aGlzLl9nZXREZXBlbmRlbmN5KHJlc29sdmVkUHJvdmlkZXIucHJvdmlkZXJUeXBlLCBkZXApKTtcbiAgICAgICAgICByZXR1cm4gby5pbXBvcnRFeHByKHByb3ZpZGVyLnVzZUZhY3RvcnkpLmNhbGxGbihkZXBzRXhwcik7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KHByb3ZpZGVyLnVzZUNsYXNzKSkge1xuICAgICAgICAgIHZhciBkZXBzID0gaXNQcmVzZW50KHByb3ZpZGVyLmRlcHMpID8gcHJvdmlkZXIuZGVwcyA6IHByb3ZpZGVyLnVzZUNsYXNzLmRpRGVwcztcbiAgICAgICAgICB2YXIgZGVwc0V4cHIgPSBkZXBzLm1hcCgoZGVwKSA9PiB0aGlzLl9nZXREZXBlbmRlbmN5KHJlc29sdmVkUHJvdmlkZXIucHJvdmlkZXJUeXBlLCBkZXApKTtcbiAgICAgICAgICByZXR1cm4gby5pbXBvcnRFeHByKHByb3ZpZGVyLnVzZUNsYXNzKVxuICAgICAgICAgICAgICAuaW5zdGFudGlhdGUoZGVwc0V4cHIsIG8uaW1wb3J0VHlwZShwcm92aWRlci51c2VDbGFzcykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChwcm92aWRlci51c2VWYWx1ZSBpbnN0YW5jZW9mIENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiBvLmltcG9ydEV4cHIocHJvdmlkZXIudXNlVmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSBpZiAocHJvdmlkZXIudXNlVmFsdWUgaW5zdGFuY2VvZiBvLkV4cHJlc3Npb24pIHtcbiAgICAgICAgICAgIHJldHVybiBwcm92aWRlci51c2VWYWx1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG8ubGl0ZXJhbChwcm92aWRlci51c2VWYWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHZhciBwcm9wTmFtZSA9IGBfJHtyZXNvbHZlZFByb3ZpZGVyLnRva2VuLm5hbWV9XyR7dGhpcy5ub2RlSW5kZXh9XyR7dGhpcy5faW5zdGFuY2VzLnNpemV9YDtcbiAgICAgIHZhciBpbnN0YW5jZSA9XG4gICAgICAgICAgY3JlYXRlUHJvdmlkZXJQcm9wZXJ0eShwcm9wTmFtZSwgcmVzb2x2ZWRQcm92aWRlciwgcHJvdmlkZXJWYWx1ZUV4cHJlc3Npb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZWRQcm92aWRlci5tdWx0aVByb3ZpZGVyLCByZXNvbHZlZFByb3ZpZGVyLmVhZ2VyLCB0aGlzKTtcbiAgICAgIHRoaXMuX2luc3RhbmNlcy5hZGQocmVzb2x2ZWRQcm92aWRlci50b2tlbiwgaW5zdGFuY2UpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kaXJlY3RpdmVJbnN0YW5jZXMgPVxuICAgICAgICB0aGlzLl9kaXJlY3RpdmVzLm1hcCgoZGlyZWN0aXZlKSA9PiB0aGlzLl9pbnN0YW5jZXMuZ2V0KGlkZW50aWZpZXJUb2tlbihkaXJlY3RpdmUudHlwZSkpKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZGlyZWN0aXZlSW5zdGFuY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGlyZWN0aXZlSW5zdGFuY2UgPSB0aGlzLmRpcmVjdGl2ZUluc3RhbmNlc1tpXTtcbiAgICAgIHZhciBkaXJlY3RpdmUgPSB0aGlzLl9kaXJlY3RpdmVzW2ldO1xuICAgICAgZGlyZWN0aXZlLnF1ZXJpZXMuZm9yRWFjaCgocXVlcnlNZXRhKSA9PiB7IHRoaXMuX2FkZFF1ZXJ5KHF1ZXJ5TWV0YSwgZGlyZWN0aXZlSW5zdGFuY2UpOyB9KTtcbiAgICB9XG4gICAgdmFyIHF1ZXJpZXNXaXRoUmVhZHM6IF9RdWVyeVdpdGhSZWFkW10gPSBbXTtcbiAgICB0aGlzLl9yZXNvbHZlZFByb3ZpZGVycy52YWx1ZXMoKS5mb3JFYWNoKChyZXNvbHZlZFByb3ZpZGVyKSA9PiB7XG4gICAgICB2YXIgcXVlcmllc0ZvclByb3ZpZGVyID0gdGhpcy5fZ2V0UXVlcmllc0ZvcihyZXNvbHZlZFByb3ZpZGVyLnRva2VuKTtcbiAgICAgIExpc3RXcmFwcGVyLmFkZEFsbChcbiAgICAgICAgICBxdWVyaWVzV2l0aFJlYWRzLFxuICAgICAgICAgIHF1ZXJpZXNGb3JQcm92aWRlci5tYXAocXVlcnkgPT4gbmV3IF9RdWVyeVdpdGhSZWFkKHF1ZXJ5LCByZXNvbHZlZFByb3ZpZGVyLnRva2VuKSkpO1xuICAgIH0pO1xuICAgIFN0cmluZ01hcFdyYXBwZXIuZm9yRWFjaCh0aGlzLnJlZmVyZW5jZVRva2VucywgKF8sIHZhck5hbWUpID0+IHtcbiAgICAgIHZhciB0b2tlbiA9IHRoaXMucmVmZXJlbmNlVG9rZW5zW3Zhck5hbWVdO1xuICAgICAgdmFyIHZhclZhbHVlO1xuICAgICAgaWYgKGlzUHJlc2VudCh0b2tlbikpIHtcbiAgICAgICAgdmFyVmFsdWUgPSB0aGlzLl9pbnN0YW5jZXMuZ2V0KHRva2VuKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhclZhbHVlID0gdGhpcy5yZW5kZXJOb2RlO1xuICAgICAgfVxuICAgICAgdGhpcy52aWV3LmxvY2Fscy5zZXQodmFyTmFtZSwgdmFyVmFsdWUpO1xuICAgICAgdmFyIHZhclRva2VuID0gbmV3IENvbXBpbGVUb2tlbk1ldGFkYXRhKHt2YWx1ZTogdmFyTmFtZX0pO1xuICAgICAgTGlzdFdyYXBwZXIuYWRkQWxsKHF1ZXJpZXNXaXRoUmVhZHMsIHRoaXMuX2dldFF1ZXJpZXNGb3IodmFyVG9rZW4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAocXVlcnkgPT4gbmV3IF9RdWVyeVdpdGhSZWFkKHF1ZXJ5LCB2YXJUb2tlbikpKTtcbiAgICB9KTtcbiAgICBxdWVyaWVzV2l0aFJlYWRzLmZvckVhY2goKHF1ZXJ5V2l0aFJlYWQpID0+IHtcbiAgICAgIHZhciB2YWx1ZTogby5FeHByZXNzaW9uO1xuICAgICAgaWYgKGlzUHJlc2VudChxdWVyeVdpdGhSZWFkLnJlYWQuaWRlbnRpZmllcikpIHtcbiAgICAgICAgLy8gcXVlcnkgZm9yIGFuIGlkZW50aWZpZXJcbiAgICAgICAgdmFsdWUgPSB0aGlzLl9pbnN0YW5jZXMuZ2V0KHF1ZXJ5V2l0aFJlYWQucmVhZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBxdWVyeSBmb3IgYSByZWZlcmVuY2VcbiAgICAgICAgdmFyIHRva2VuID0gdGhpcy5yZWZlcmVuY2VUb2tlbnNbcXVlcnlXaXRoUmVhZC5yZWFkLnZhbHVlXTtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0b2tlbikpIHtcbiAgICAgICAgICB2YWx1ZSA9IHRoaXMuX2luc3RhbmNlcy5nZXQodG9rZW4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbHVlID0gdGhpcy5lbGVtZW50UmVmO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaXNQcmVzZW50KHZhbHVlKSkge1xuICAgICAgICBxdWVyeVdpdGhSZWFkLnF1ZXJ5LmFkZFZhbHVlKHZhbHVlLCB0aGlzLnZpZXcpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLmNvbXBvbmVudCkpIHtcbiAgICAgIHZhciBjb21wb25lbnRDb25zdHJ1Y3RvclZpZXdRdWVyeUxpc3QgPVxuICAgICAgICAgIGlzUHJlc2VudCh0aGlzLmNvbXBvbmVudCkgPyBvLmxpdGVyYWxBcnIodGhpcy5fY29tcG9uZW50Q29uc3RydWN0b3JWaWV3UXVlcnlMaXN0cykgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLk5VTExfRVhQUjtcbiAgICAgIHZhciBjb21wRXhwciA9IGlzUHJlc2VudCh0aGlzLmdldENvbXBvbmVudCgpKSA/IHRoaXMuZ2V0Q29tcG9uZW50KCkgOiBvLk5VTExfRVhQUjtcbiAgICAgIHRoaXMudmlldy5jcmVhdGVNZXRob2QuYWRkU3RtdChcbiAgICAgICAgICB0aGlzLmFwcEVsZW1lbnQuY2FsbE1ldGhvZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2luaXRDb21wb25lbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbY29tcEV4cHIsIGNvbXBvbmVudENvbnN0cnVjdG9yVmlld1F1ZXJ5TGlzdCwgdGhpcy5fY29tcFZpZXdFeHByXSlcbiAgICAgICAgICAgICAgLnRvU3RtdCgpKTtcbiAgICB9XG4gIH1cblxuICBhZnRlckNoaWxkcmVuKGNoaWxkTm9kZUNvdW50OiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZXNvbHZlZFByb3ZpZGVycy52YWx1ZXMoKS5mb3JFYWNoKChyZXNvbHZlZFByb3ZpZGVyKSA9PiB7XG4gICAgICAvLyBOb3RlOiBhZnRlckNoaWxkcmVuIGlzIGNhbGxlZCBhZnRlciByZWN1cnNpbmcgaW50byBjaGlsZHJlbi5cbiAgICAgIC8vIFRoaXMgaXMgZ29vZCBzbyB0aGF0IGFuIGluamVjdG9yIG1hdGNoIGluIGFuIGVsZW1lbnQgdGhhdCBpcyBjbG9zZXIgdG8gYSByZXF1ZXN0aW5nIGVsZW1lbnRcbiAgICAgIC8vIG1hdGNoZXMgZmlyc3QuXG4gICAgICB2YXIgcHJvdmlkZXJFeHByID0gdGhpcy5faW5zdGFuY2VzLmdldChyZXNvbHZlZFByb3ZpZGVyLnRva2VuKTtcbiAgICAgIC8vIE5vdGU6IHZpZXcgcHJvdmlkZXJzIGFyZSBvbmx5IHZpc2libGUgb24gdGhlIGluamVjdG9yIG9mIHRoYXQgZWxlbWVudC5cbiAgICAgIC8vIFRoaXMgaXMgbm90IGZ1bGx5IGNvcnJlY3QgYXMgdGhlIHJ1bGVzIGR1cmluZyBjb2RlZ2VuIGRvbid0IGFsbG93IGEgZGlyZWN0aXZlXG4gICAgICAvLyB0byBnZXQgaG9sZCBvZiBhIHZpZXcgcHJvdmRpZXIgb24gdGhlIHNhbWUgZWxlbWVudC4gV2Ugc3RpbGwgZG8gdGhpcyBzZW1hbnRpY1xuICAgICAgLy8gYXMgaXQgc2ltcGxpZmllcyBvdXIgbW9kZWwgdG8gaGF2aW5nIG9ubHkgb25lIHJ1bnRpbWUgaW5qZWN0b3IgcGVyIGVsZW1lbnQuXG4gICAgICB2YXIgcHJvdmlkZXJDaGlsZE5vZGVDb3VudCA9XG4gICAgICAgICAgcmVzb2x2ZWRQcm92aWRlci5wcm92aWRlclR5cGUgPT09IFByb3ZpZGVyQXN0VHlwZS5Qcml2YXRlU2VydmljZSA/IDAgOiBjaGlsZE5vZGVDb3VudDtcbiAgICAgIHRoaXMudmlldy5pbmplY3RvckdldE1ldGhvZC5hZGRTdG10KGNyZWF0ZUluamVjdEludGVybmFsQ29uZGl0aW9uKFxuICAgICAgICAgIHRoaXMubm9kZUluZGV4LCBwcm92aWRlckNoaWxkTm9kZUNvdW50LCByZXNvbHZlZFByb3ZpZGVyLCBwcm92aWRlckV4cHIpKTtcbiAgICB9KTtcblxuICAgIHRoaXMuX3F1ZXJpZXMudmFsdWVzKCkuZm9yRWFjaChcbiAgICAgICAgKHF1ZXJpZXMpID0+XG4gICAgICAgICAgICBxdWVyaWVzLmZvckVhY2goKHF1ZXJ5KSA9PiBxdWVyeS5hZnRlckNoaWxkcmVuKHRoaXMudmlldy51cGRhdGVDb250ZW50UXVlcmllc01ldGhvZCkpKTtcbiAgfVxuXG4gIGFkZENvbnRlbnROb2RlKG5nQ29udGVudEluZGV4OiBudW1iZXIsIG5vZGVFeHByOiBvLkV4cHJlc3Npb24pIHtcbiAgICB0aGlzLmNvbnRlbnROb2Rlc0J5TmdDb250ZW50SW5kZXhbbmdDb250ZW50SW5kZXhdLnB1c2gobm9kZUV4cHIpO1xuICB9XG5cbiAgZ2V0Q29tcG9uZW50KCk6IG8uRXhwcmVzc2lvbiB7XG4gICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmNvbXBvbmVudCkgPyB0aGlzLl9pbnN0YW5jZXMuZ2V0KGlkZW50aWZpZXJUb2tlbih0aGlzLmNvbXBvbmVudC50eXBlKSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbDtcbiAgfVxuXG4gIGdldFByb3ZpZGVyVG9rZW5zKCk6IG8uRXhwcmVzc2lvbltdIHtcbiAgICByZXR1cm4gdGhpcy5fcmVzb2x2ZWRQcm92aWRlcnMudmFsdWVzKCkubWFwKFxuICAgICAgICAocmVzb2x2ZWRQcm92aWRlcikgPT4gY3JlYXRlRGlUb2tlbkV4cHJlc3Npb24ocmVzb2x2ZWRQcm92aWRlci50b2tlbikpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0UXVlcmllc0Zvcih0b2tlbjogQ29tcGlsZVRva2VuTWV0YWRhdGEpOiBDb21waWxlUXVlcnlbXSB7XG4gICAgdmFyIHJlc3VsdDogQ29tcGlsZVF1ZXJ5W10gPSBbXTtcbiAgICB2YXIgY3VycmVudEVsOiBDb21waWxlRWxlbWVudCA9IHRoaXM7XG4gICAgdmFyIGRpc3RhbmNlID0gMDtcbiAgICB2YXIgcXVlcmllczogQ29tcGlsZVF1ZXJ5W107XG4gICAgd2hpbGUgKCFjdXJyZW50RWwuaXNOdWxsKCkpIHtcbiAgICAgIHF1ZXJpZXMgPSBjdXJyZW50RWwuX3F1ZXJpZXMuZ2V0KHRva2VuKTtcbiAgICAgIGlmIChpc1ByZXNlbnQocXVlcmllcykpIHtcbiAgICAgICAgTGlzdFdyYXBwZXIuYWRkQWxsKHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJpZXMuZmlsdGVyKChxdWVyeSkgPT4gcXVlcnkubWV0YS5kZXNjZW5kYW50cyB8fCBkaXN0YW5jZSA8PSAxKSk7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudEVsLl9kaXJlY3RpdmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZGlzdGFuY2UrKztcbiAgICAgIH1cbiAgICAgIGN1cnJlbnRFbCA9IGN1cnJlbnRFbC5wYXJlbnQ7XG4gICAgfVxuICAgIHF1ZXJpZXMgPSB0aGlzLnZpZXcuY29tcG9uZW50Vmlldy52aWV3UXVlcmllcy5nZXQodG9rZW4pO1xuICAgIGlmIChpc1ByZXNlbnQocXVlcmllcykpIHtcbiAgICAgIExpc3RXcmFwcGVyLmFkZEFsbChyZXN1bHQsIHF1ZXJpZXMpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkUXVlcnkocXVlcnlNZXRhOiBDb21waWxlUXVlcnlNZXRhZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlSW5zdGFuY2U6IG8uRXhwcmVzc2lvbik6IENvbXBpbGVRdWVyeSB7XG4gICAgdmFyIHByb3BOYW1lID0gYF9xdWVyeV8ke3F1ZXJ5TWV0YS5zZWxlY3RvcnNbMF0ubmFtZX1fJHt0aGlzLm5vZGVJbmRleH1fJHt0aGlzLl9xdWVyeUNvdW50Kyt9YDtcbiAgICB2YXIgcXVlcnlMaXN0ID0gY3JlYXRlUXVlcnlMaXN0KHF1ZXJ5TWV0YSwgZGlyZWN0aXZlSW5zdGFuY2UsIHByb3BOYW1lLCB0aGlzLnZpZXcpO1xuICAgIHZhciBxdWVyeSA9IG5ldyBDb21waWxlUXVlcnkocXVlcnlNZXRhLCBxdWVyeUxpc3QsIGRpcmVjdGl2ZUluc3RhbmNlLCB0aGlzLnZpZXcpO1xuICAgIGFkZFF1ZXJ5VG9Ub2tlbk1hcCh0aGlzLl9xdWVyaWVzLCBxdWVyeSk7XG4gICAgcmV0dXJuIHF1ZXJ5O1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0TG9jYWxEZXBlbmRlbmN5KHJlcXVlc3RpbmdQcm92aWRlclR5cGU6IFByb3ZpZGVyQXN0VHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcDogQ29tcGlsZURpRGVwZW5kZW5jeU1ldGFkYXRhKTogby5FeHByZXNzaW9uIHtcbiAgICB2YXIgcmVzdWx0ID0gbnVsbDtcbiAgICAvLyBjb25zdHJ1Y3RvciBjb250ZW50IHF1ZXJ5XG4gICAgaWYgKGlzQmxhbmsocmVzdWx0KSAmJiBpc1ByZXNlbnQoZGVwLnF1ZXJ5KSkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5fYWRkUXVlcnkoZGVwLnF1ZXJ5LCBudWxsKS5xdWVyeUxpc3Q7XG4gICAgfVxuXG4gICAgLy8gY29uc3RydWN0b3IgdmlldyBxdWVyeVxuICAgIGlmIChpc0JsYW5rKHJlc3VsdCkgJiYgaXNQcmVzZW50KGRlcC52aWV3UXVlcnkpKSB7XG4gICAgICByZXN1bHQgPSBjcmVhdGVRdWVyeUxpc3QoXG4gICAgICAgICAgZGVwLnZpZXdRdWVyeSwgbnVsbCxcbiAgICAgICAgICBgX3ZpZXdRdWVyeV8ke2RlcC52aWV3UXVlcnkuc2VsZWN0b3JzWzBdLm5hbWV9XyR7dGhpcy5ub2RlSW5kZXh9XyR7dGhpcy5fY29tcG9uZW50Q29uc3RydWN0b3JWaWV3UXVlcnlMaXN0cy5sZW5ndGh9YCxcbiAgICAgICAgICB0aGlzLnZpZXcpO1xuICAgICAgdGhpcy5fY29tcG9uZW50Q29uc3RydWN0b3JWaWV3UXVlcnlMaXN0cy5wdXNoKHJlc3VsdCk7XG4gICAgfVxuXG4gICAgaWYgKGlzUHJlc2VudChkZXAudG9rZW4pKSB7XG4gICAgICAvLyBhY2Nlc3MgYnVpbHRpbnMgd2l0aCBzcGVjaWFsIHZpc2liaWxpdHlcbiAgICAgIGlmIChpc0JsYW5rKHJlc3VsdCkpIHtcbiAgICAgICAgaWYgKGRlcC50b2tlbi5lcXVhbHNUbyhpZGVudGlmaWVyVG9rZW4oSWRlbnRpZmllcnMuQ2hhbmdlRGV0ZWN0b3JSZWYpKSkge1xuICAgICAgICAgIGlmIChyZXF1ZXN0aW5nUHJvdmlkZXJUeXBlID09PSBQcm92aWRlckFzdFR5cGUuQ29tcG9uZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29tcFZpZXdFeHByLnByb3AoJ3JlZicpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gby5USElTX0VYUFIucHJvcCgncmVmJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBhY2Nlc3MgcmVndWxhciBwcm92aWRlcnMgb24gdGhlIGVsZW1lbnRcbiAgICAgIGlmIChpc0JsYW5rKHJlc3VsdCkpIHtcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5faW5zdGFuY2VzLmdldChkZXAudG9rZW4pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0RGVwZW5kZW5jeShyZXF1ZXN0aW5nUHJvdmlkZXJUeXBlOiBQcm92aWRlckFzdFR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgZGVwOiBDb21waWxlRGlEZXBlbmRlbmN5TWV0YWRhdGEpOiBvLkV4cHJlc3Npb24ge1xuICAgIHZhciBjdXJyRWxlbWVudDogQ29tcGlsZUVsZW1lbnQgPSB0aGlzO1xuICAgIHZhciByZXN1bHQgPSBudWxsO1xuICAgIGlmIChkZXAuaXNWYWx1ZSkge1xuICAgICAgcmVzdWx0ID0gby5saXRlcmFsKGRlcC52YWx1ZSk7XG4gICAgfVxuICAgIGlmIChpc0JsYW5rKHJlc3VsdCkgJiYgIWRlcC5pc1NraXBTZWxmKSB7XG4gICAgICByZXN1bHQgPSB0aGlzLl9nZXRMb2NhbERlcGVuZGVuY3kocmVxdWVzdGluZ1Byb3ZpZGVyVHlwZSwgZGVwKTtcbiAgICB9XG4gICAgLy8gY2hlY2sgcGFyZW50IGVsZW1lbnRzXG4gICAgd2hpbGUgKGlzQmxhbmsocmVzdWx0KSAmJiAhY3VyckVsZW1lbnQucGFyZW50LmlzTnVsbCgpKSB7XG4gICAgICBjdXJyRWxlbWVudCA9IGN1cnJFbGVtZW50LnBhcmVudDtcbiAgICAgIHJlc3VsdCA9IGN1cnJFbGVtZW50Ll9nZXRMb2NhbERlcGVuZGVuY3koUHJvdmlkZXJBc3RUeXBlLlB1YmxpY1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBDb21waWxlRGlEZXBlbmRlbmN5TWV0YWRhdGEoe3Rva2VuOiBkZXAudG9rZW59KSk7XG4gICAgfVxuXG4gICAgaWYgKGlzQmxhbmsocmVzdWx0KSkge1xuICAgICAgcmVzdWx0ID0gaW5qZWN0RnJvbVZpZXdQYXJlbnRJbmplY3RvcihkZXAudG9rZW4sIGRlcC5pc09wdGlvbmFsKTtcbiAgICB9XG4gICAgaWYgKGlzQmxhbmsocmVzdWx0KSkge1xuICAgICAgcmVzdWx0ID0gby5OVUxMX0VYUFI7XG4gICAgfVxuICAgIHJldHVybiBnZXRQcm9wZXJ0eUluVmlldyhyZXN1bHQsIHRoaXMudmlldywgY3VyckVsZW1lbnQudmlldyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlSW5qZWN0SW50ZXJuYWxDb25kaXRpb24obm9kZUluZGV4OiBudW1iZXIsIGNoaWxkTm9kZUNvdW50OiBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlcjogUHJvdmlkZXJBc3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlckV4cHI6IG8uRXhwcmVzc2lvbik6IG8uU3RhdGVtZW50IHtcbiAgdmFyIGluZGV4Q29uZGl0aW9uO1xuICBpZiAoY2hpbGROb2RlQ291bnQgPiAwKSB7XG4gICAgaW5kZXhDb25kaXRpb24gPSBvLmxpdGVyYWwobm9kZUluZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgIC5sb3dlckVxdWFscyhJbmplY3RNZXRob2RWYXJzLnJlcXVlc3ROb2RlSW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgLmFuZChJbmplY3RNZXRob2RWYXJzLnJlcXVlc3ROb2RlSW5kZXgubG93ZXJFcXVhbHMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8ubGl0ZXJhbChub2RlSW5kZXggKyBjaGlsZE5vZGVDb3VudCkpKTtcbiAgfSBlbHNlIHtcbiAgICBpbmRleENvbmRpdGlvbiA9IG8ubGl0ZXJhbChub2RlSW5kZXgpLmlkZW50aWNhbChJbmplY3RNZXRob2RWYXJzLnJlcXVlc3ROb2RlSW5kZXgpO1xuICB9XG4gIHJldHVybiBuZXcgby5JZlN0bXQoXG4gICAgICBJbmplY3RNZXRob2RWYXJzLnRva2VuLmlkZW50aWNhbChjcmVhdGVEaVRva2VuRXhwcmVzc2lvbihwcm92aWRlci50b2tlbikpLmFuZChpbmRleENvbmRpdGlvbiksXG4gICAgICBbbmV3IG8uUmV0dXJuU3RhdGVtZW50KHByb3ZpZGVyRXhwcildKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJvdmlkZXJQcm9wZXJ0eShwcm9wTmFtZTogc3RyaW5nLCBwcm92aWRlcjogUHJvdmlkZXJBc3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyVmFsdWVFeHByZXNzaW9uczogby5FeHByZXNzaW9uW10sIGlzTXVsdGk6IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRWFnZXI6IGJvb2xlYW4sIGNvbXBpbGVFbGVtZW50OiBDb21waWxlRWxlbWVudCk6IG8uRXhwcmVzc2lvbiB7XG4gIHZhciB2aWV3ID0gY29tcGlsZUVsZW1lbnQudmlldztcbiAgdmFyIHJlc29sdmVkUHJvdmlkZXJWYWx1ZUV4cHI7XG4gIHZhciB0eXBlO1xuICBpZiAoaXNNdWx0aSkge1xuICAgIHJlc29sdmVkUHJvdmlkZXJWYWx1ZUV4cHIgPSBvLmxpdGVyYWxBcnIocHJvdmlkZXJWYWx1ZUV4cHJlc3Npb25zKTtcbiAgICB0eXBlID0gbmV3IG8uQXJyYXlUeXBlKG8uRFlOQU1JQ19UWVBFKTtcbiAgfSBlbHNlIHtcbiAgICByZXNvbHZlZFByb3ZpZGVyVmFsdWVFeHByID0gcHJvdmlkZXJWYWx1ZUV4cHJlc3Npb25zWzBdO1xuICAgIHR5cGUgPSBwcm92aWRlclZhbHVlRXhwcmVzc2lvbnNbMF0udHlwZTtcbiAgfVxuICBpZiAoaXNCbGFuayh0eXBlKSkge1xuICAgIHR5cGUgPSBvLkRZTkFNSUNfVFlQRTtcbiAgfVxuICBpZiAoaXNFYWdlcikge1xuICAgIHZpZXcuZmllbGRzLnB1c2gobmV3IG8uQ2xhc3NGaWVsZChwcm9wTmFtZSwgdHlwZSwgW28uU3RtdE1vZGlmaWVyLlByaXZhdGVdKSk7XG4gICAgdmlldy5jcmVhdGVNZXRob2QuYWRkU3RtdChvLlRISVNfRVhQUi5wcm9wKHByb3BOYW1lKS5zZXQocmVzb2x2ZWRQcm92aWRlclZhbHVlRXhwcikudG9TdG10KCkpO1xuICB9IGVsc2Uge1xuICAgIHZhciBpbnRlcm5hbEZpZWxkID0gYF8ke3Byb3BOYW1lfWA7XG4gICAgdmlldy5maWVsZHMucHVzaChuZXcgby5DbGFzc0ZpZWxkKGludGVybmFsRmllbGQsIHR5cGUsIFtvLlN0bXRNb2RpZmllci5Qcml2YXRlXSkpO1xuICAgIHZhciBnZXR0ZXIgPSBuZXcgQ29tcGlsZU1ldGhvZCh2aWV3KTtcbiAgICBnZXR0ZXIucmVzZXREZWJ1Z0luZm8oY29tcGlsZUVsZW1lbnQubm9kZUluZGV4LCBjb21waWxlRWxlbWVudC5zb3VyY2VBc3QpO1xuICAgIC8vIE5vdGU6IEVxdWFscyBpcyBpbXBvcnRhbnQgZm9yIEpTIHNvIHRoYXQgaXQgYWxzbyBjaGVja3MgdGhlIHVuZGVmaW5lZCBjYXNlIVxuICAgIGdldHRlci5hZGRTdG10KFxuICAgICAgICBuZXcgby5JZlN0bXQoby5USElTX0VYUFIucHJvcChpbnRlcm5hbEZpZWxkKS5pc0JsYW5rKCksXG4gICAgICAgICAgICAgICAgICAgICBbby5USElTX0VYUFIucHJvcChpbnRlcm5hbEZpZWxkKS5zZXQocmVzb2x2ZWRQcm92aWRlclZhbHVlRXhwcikudG9TdG10KCldKSk7XG4gICAgZ2V0dGVyLmFkZFN0bXQobmV3IG8uUmV0dXJuU3RhdGVtZW50KG8uVEhJU19FWFBSLnByb3AoaW50ZXJuYWxGaWVsZCkpKTtcbiAgICB2aWV3LmdldHRlcnMucHVzaChuZXcgby5DbGFzc0dldHRlcihwcm9wTmFtZSwgZ2V0dGVyLmZpbmlzaCgpLCB0eXBlKSk7XG4gIH1cbiAgcmV0dXJuIG8uVEhJU19FWFBSLnByb3AocHJvcE5hbWUpO1xufVxuXG5jbGFzcyBfUXVlcnlXaXRoUmVhZCB7XG4gIHB1YmxpYyByZWFkOiBDb21waWxlVG9rZW5NZXRhZGF0YTtcbiAgY29uc3RydWN0b3IocHVibGljIHF1ZXJ5OiBDb21waWxlUXVlcnksIG1hdGNoOiBDb21waWxlVG9rZW5NZXRhZGF0YSkge1xuICAgIHRoaXMucmVhZCA9IGlzUHJlc2VudChxdWVyeS5tZXRhLnJlYWQpID8gcXVlcnkubWV0YS5yZWFkIDogbWF0Y2g7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
