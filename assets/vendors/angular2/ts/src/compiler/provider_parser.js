System.register(['angular2/src/facade/lang', 'angular2/src/facade/collection', './template_ast', './compile_metadata', './identifiers', './parse_util'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lang_1, collection_1, template_ast_1, compile_metadata_1, identifiers_1, parse_util_1;
    var ProviderError, ProviderViewContext, ProviderElementContext;
    function _transformProvider(provider, _a) {
        var useExisting = _a.useExisting, useValue = _a.useValue, deps = _a.deps;
        return new compile_metadata_1.CompileProviderMetadata({
            token: provider.token,
            useClass: provider.useClass,
            useExisting: useExisting,
            useFactory: provider.useFactory,
            useValue: useValue,
            deps: deps,
            multi: provider.multi
        });
    }
    function _transformProviderAst(provider, _a) {
        var eager = _a.eager, providers = _a.providers;
        return new template_ast_1.ProviderAst(provider.token, provider.multiProvider, provider.eager || eager, providers, provider.providerType, provider.sourceSpan);
    }
    function _normalizeProviders(providers, sourceSpan, targetErrors, targetProviders) {
        if (targetProviders === void 0) { targetProviders = null; }
        if (lang_1.isBlank(targetProviders)) {
            targetProviders = [];
        }
        if (lang_1.isPresent(providers)) {
            providers.forEach(function (provider) {
                if (lang_1.isArray(provider)) {
                    _normalizeProviders(provider, sourceSpan, targetErrors, targetProviders);
                }
                else {
                    var normalizeProvider;
                    if (provider instanceof compile_metadata_1.CompileProviderMetadata) {
                        normalizeProvider = provider;
                    }
                    else if (provider instanceof compile_metadata_1.CompileTypeMetadata) {
                        normalizeProvider = new compile_metadata_1.CompileProviderMetadata({ token: new compile_metadata_1.CompileTokenMetadata({ identifier: provider }), useClass: provider });
                    }
                    else {
                        targetErrors.push(new ProviderError("Unknown provider type " + provider, sourceSpan));
                    }
                    if (lang_1.isPresent(normalizeProvider)) {
                        targetProviders.push(normalizeProvider);
                    }
                }
            });
        }
        return targetProviders;
    }
    function _resolveProvidersFromDirectives(directives, sourceSpan, targetErrors) {
        var providersByToken = new compile_metadata_1.CompileTokenMap();
        directives.forEach(function (directive) {
            var dirProvider = new compile_metadata_1.CompileProviderMetadata({ token: new compile_metadata_1.CompileTokenMetadata({ identifier: directive.type }), useClass: directive.type });
            _resolveProviders([dirProvider], directive.isComponent ? template_ast_1.ProviderAstType.Component : template_ast_1.ProviderAstType.Directive, true, sourceSpan, targetErrors, providersByToken);
        });
        // Note: directives need to be able to overwrite providers of a component!
        var directivesWithComponentFirst = directives.filter(function (dir) { return dir.isComponent; }).concat(directives.filter(function (dir) { return !dir.isComponent; }));
        directivesWithComponentFirst.forEach(function (directive) {
            _resolveProviders(_normalizeProviders(directive.providers, sourceSpan, targetErrors), template_ast_1.ProviderAstType.PublicService, false, sourceSpan, targetErrors, providersByToken);
            _resolveProviders(_normalizeProviders(directive.viewProviders, sourceSpan, targetErrors), template_ast_1.ProviderAstType.PrivateService, false, sourceSpan, targetErrors, providersByToken);
        });
        return providersByToken;
    }
    function _resolveProviders(providers, providerType, eager, sourceSpan, targetErrors, targetProvidersByToken) {
        providers.forEach(function (provider) {
            var resolvedProvider = targetProvidersByToken.get(provider.token);
            if (lang_1.isPresent(resolvedProvider) && resolvedProvider.multiProvider !== provider.multi) {
                targetErrors.push(new ProviderError("Mixing multi and non multi provider is not possible for token " + resolvedProvider.token.name, sourceSpan));
            }
            if (lang_1.isBlank(resolvedProvider)) {
                resolvedProvider = new template_ast_1.ProviderAst(provider.token, provider.multi, eager, [provider], providerType, sourceSpan);
                targetProvidersByToken.add(provider.token, resolvedProvider);
            }
            else {
                if (!provider.multi) {
                    collection_1.ListWrapper.clear(resolvedProvider.providers);
                }
                resolvedProvider.providers.push(provider);
            }
        });
    }
    function _getViewQueries(component) {
        var viewQueries = new compile_metadata_1.CompileTokenMap();
        if (lang_1.isPresent(component.viewQueries)) {
            component.viewQueries.forEach(function (query) { return _addQueryToTokenMap(viewQueries, query); });
        }
        component.type.diDeps.forEach(function (dep) {
            if (lang_1.isPresent(dep.viewQuery)) {
                _addQueryToTokenMap(viewQueries, dep.viewQuery);
            }
        });
        return viewQueries;
    }
    function _getContentQueries(directives) {
        var contentQueries = new compile_metadata_1.CompileTokenMap();
        directives.forEach(function (directive) {
            if (lang_1.isPresent(directive.queries)) {
                directive.queries.forEach(function (query) { return _addQueryToTokenMap(contentQueries, query); });
            }
            directive.type.diDeps.forEach(function (dep) {
                if (lang_1.isPresent(dep.query)) {
                    _addQueryToTokenMap(contentQueries, dep.query);
                }
            });
        });
        return contentQueries;
    }
    function _addQueryToTokenMap(map, query) {
        query.selectors.forEach(function (token) {
            var entry = map.get(token);
            if (lang_1.isBlank(entry)) {
                entry = [];
                map.add(token, entry);
            }
            entry.push(query);
        });
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
            function (compile_metadata_1_1) {
                compile_metadata_1 = compile_metadata_1_1;
            },
            function (identifiers_1_1) {
                identifiers_1 = identifiers_1_1;
            },
            function (parse_util_1_1) {
                parse_util_1 = parse_util_1_1;
            }],
        execute: function() {
            ProviderError = (function (_super) {
                __extends(ProviderError, _super);
                function ProviderError(message, span) {
                    _super.call(this, span, message);
                }
                return ProviderError;
            }(parse_util_1.ParseError));
            exports_1("ProviderError", ProviderError);
            ProviderViewContext = (function () {
                function ProviderViewContext(component, sourceSpan) {
                    var _this = this;
                    this.component = component;
                    this.sourceSpan = sourceSpan;
                    this.errors = [];
                    this.viewQueries = _getViewQueries(component);
                    this.viewProviders = new compile_metadata_1.CompileTokenMap();
                    _normalizeProviders(component.viewProviders, sourceSpan, this.errors)
                        .forEach(function (provider) {
                        if (lang_1.isBlank(_this.viewProviders.get(provider.token))) {
                            _this.viewProviders.add(provider.token, true);
                        }
                    });
                }
                return ProviderViewContext;
            }());
            exports_1("ProviderViewContext", ProviderViewContext);
            ProviderElementContext = (function () {
                function ProviderElementContext(_viewContext, _parent, _isViewRoot, _directiveAsts, attrs, refs, _sourceSpan) {
                    var _this = this;
                    this._viewContext = _viewContext;
                    this._parent = _parent;
                    this._isViewRoot = _isViewRoot;
                    this._directiveAsts = _directiveAsts;
                    this._sourceSpan = _sourceSpan;
                    this._transformedProviders = new compile_metadata_1.CompileTokenMap();
                    this._seenProviders = new compile_metadata_1.CompileTokenMap();
                    this._hasViewContainer = false;
                    this._attrs = {};
                    attrs.forEach(function (attrAst) { return _this._attrs[attrAst.name] = attrAst.value; });
                    var directivesMeta = _directiveAsts.map(function (directiveAst) { return directiveAst.directive; });
                    this._allProviders =
                        _resolveProvidersFromDirectives(directivesMeta, _sourceSpan, _viewContext.errors);
                    this._contentQueries = _getContentQueries(directivesMeta);
                    var queriedTokens = new compile_metadata_1.CompileTokenMap();
                    this._allProviders.values().forEach(function (provider) { _this._addQueryReadsTo(provider.token, queriedTokens); });
                    refs.forEach(function (refAst) {
                        _this._addQueryReadsTo(new compile_metadata_1.CompileTokenMetadata({ value: refAst.name }), queriedTokens);
                    });
                    if (lang_1.isPresent(queriedTokens.get(identifiers_1.identifierToken(identifiers_1.Identifiers.ViewContainerRef)))) {
                        this._hasViewContainer = true;
                    }
                    // create the providers that we know are eager first
                    this._allProviders.values().forEach(function (provider) {
                        var eager = provider.eager || lang_1.isPresent(queriedTokens.get(provider.token));
                        if (eager) {
                            _this._getOrCreateLocalProvider(provider.providerType, provider.token, true);
                        }
                    });
                }
                ProviderElementContext.prototype.afterElement = function () {
                    var _this = this;
                    // collect lazy providers
                    this._allProviders.values().forEach(function (provider) {
                        _this._getOrCreateLocalProvider(provider.providerType, provider.token, false);
                    });
                };
                Object.defineProperty(ProviderElementContext.prototype, "transformProviders", {
                    get: function () { return this._transformedProviders.values(); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ProviderElementContext.prototype, "transformedDirectiveAsts", {
                    get: function () {
                        var sortedProviderTypes = this._transformedProviders.values().map(function (provider) { return provider.token.identifier; });
                        var sortedDirectives = collection_1.ListWrapper.clone(this._directiveAsts);
                        collection_1.ListWrapper.sort(sortedDirectives, function (dir1, dir2) { return sortedProviderTypes.indexOf(dir1.directive.type) -
                            sortedProviderTypes.indexOf(dir2.directive.type); });
                        return sortedDirectives;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ProviderElementContext.prototype, "transformedHasViewContainer", {
                    get: function () { return this._hasViewContainer; },
                    enumerable: true,
                    configurable: true
                });
                ProviderElementContext.prototype._addQueryReadsTo = function (token, queryReadTokens) {
                    this._getQueriesFor(token).forEach(function (query) {
                        var queryReadToken = lang_1.isPresent(query.read) ? query.read : token;
                        if (lang_1.isBlank(queryReadTokens.get(queryReadToken))) {
                            queryReadTokens.add(queryReadToken, true);
                        }
                    });
                };
                ProviderElementContext.prototype._getQueriesFor = function (token) {
                    var result = [];
                    var currentEl = this;
                    var distance = 0;
                    var queries;
                    while (currentEl !== null) {
                        queries = currentEl._contentQueries.get(token);
                        if (lang_1.isPresent(queries)) {
                            collection_1.ListWrapper.addAll(result, queries.filter(function (query) { return query.descendants || distance <= 1; }));
                        }
                        if (currentEl._directiveAsts.length > 0) {
                            distance++;
                        }
                        currentEl = currentEl._parent;
                    }
                    queries = this._viewContext.viewQueries.get(token);
                    if (lang_1.isPresent(queries)) {
                        collection_1.ListWrapper.addAll(result, queries);
                    }
                    return result;
                };
                ProviderElementContext.prototype._getOrCreateLocalProvider = function (requestingProviderType, token, eager) {
                    var _this = this;
                    var resolvedProvider = this._allProviders.get(token);
                    if (lang_1.isBlank(resolvedProvider) ||
                        ((requestingProviderType === template_ast_1.ProviderAstType.Directive ||
                            requestingProviderType === template_ast_1.ProviderAstType.PublicService) &&
                            resolvedProvider.providerType === template_ast_1.ProviderAstType.PrivateService) ||
                        ((requestingProviderType === template_ast_1.ProviderAstType.PrivateService ||
                            requestingProviderType === template_ast_1.ProviderAstType.PublicService) &&
                            resolvedProvider.providerType === template_ast_1.ProviderAstType.Builtin)) {
                        return null;
                    }
                    var transformedProviderAst = this._transformedProviders.get(token);
                    if (lang_1.isPresent(transformedProviderAst)) {
                        return transformedProviderAst;
                    }
                    if (lang_1.isPresent(this._seenProviders.get(token))) {
                        this._viewContext.errors.push(new ProviderError("Cannot instantiate cyclic dependency! " + token.name, this._sourceSpan));
                        return null;
                    }
                    this._seenProviders.add(token, true);
                    var transformedProviders = resolvedProvider.providers.map(function (provider) {
                        var transformedUseValue = provider.useValue;
                        var transformedUseExisting = provider.useExisting;
                        var transformedDeps;
                        if (lang_1.isPresent(provider.useExisting)) {
                            var existingDiDep = _this._getDependency(resolvedProvider.providerType, new compile_metadata_1.CompileDiDependencyMetadata({ token: provider.useExisting }), eager);
                            if (lang_1.isPresent(existingDiDep.token)) {
                                transformedUseExisting = existingDiDep.token;
                            }
                            else {
                                transformedUseExisting = null;
                                transformedUseValue = existingDiDep.value;
                            }
                        }
                        else if (lang_1.isPresent(provider.useFactory)) {
                            var deps = lang_1.isPresent(provider.deps) ? provider.deps : provider.useFactory.diDeps;
                            transformedDeps =
                                deps.map(function (dep) { return _this._getDependency(resolvedProvider.providerType, dep, eager); });
                        }
                        else if (lang_1.isPresent(provider.useClass)) {
                            var deps = lang_1.isPresent(provider.deps) ? provider.deps : provider.useClass.diDeps;
                            transformedDeps =
                                deps.map(function (dep) { return _this._getDependency(resolvedProvider.providerType, dep, eager); });
                        }
                        return _transformProvider(provider, {
                            useExisting: transformedUseExisting,
                            useValue: transformedUseValue,
                            deps: transformedDeps
                        });
                    });
                    transformedProviderAst =
                        _transformProviderAst(resolvedProvider, { eager: eager, providers: transformedProviders });
                    this._transformedProviders.add(token, transformedProviderAst);
                    return transformedProviderAst;
                };
                ProviderElementContext.prototype._getLocalDependency = function (requestingProviderType, dep, eager) {
                    if (eager === void 0) { eager = null; }
                    if (dep.isAttribute) {
                        var attrValue = this._attrs[dep.token.value];
                        return new compile_metadata_1.CompileDiDependencyMetadata({ isValue: true, value: lang_1.normalizeBlank(attrValue) });
                    }
                    if (lang_1.isPresent(dep.query) || lang_1.isPresent(dep.viewQuery)) {
                        return dep;
                    }
                    if (lang_1.isPresent(dep.token)) {
                        // access builtints
                        if ((requestingProviderType === template_ast_1.ProviderAstType.Directive ||
                            requestingProviderType === template_ast_1.ProviderAstType.Component)) {
                            if (dep.token.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.Renderer)) ||
                                dep.token.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.ElementRef)) ||
                                dep.token.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.ChangeDetectorRef)) ||
                                dep.token.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.TemplateRef))) {
                                return dep;
                            }
                            if (dep.token.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.ViewContainerRef))) {
                                this._hasViewContainer = true;
                            }
                        }
                        // access the injector
                        if (dep.token.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.Injector))) {
                            return dep;
                        }
                        // access providers
                        if (lang_1.isPresent(this._getOrCreateLocalProvider(requestingProviderType, dep.token, eager))) {
                            return dep;
                        }
                    }
                    return null;
                };
                ProviderElementContext.prototype._getDependency = function (requestingProviderType, dep, eager) {
                    if (eager === void 0) { eager = null; }
                    var currElement = this;
                    var currEager = eager;
                    var result = null;
                    if (!dep.isSkipSelf) {
                        result = this._getLocalDependency(requestingProviderType, dep, eager);
                    }
                    if (dep.isSelf) {
                        if (lang_1.isBlank(result) && dep.isOptional) {
                            result = new compile_metadata_1.CompileDiDependencyMetadata({ isValue: true, value: null });
                        }
                    }
                    else {
                        // check parent elements
                        while (lang_1.isBlank(result) && lang_1.isPresent(currElement._parent)) {
                            var prevElement = currElement;
                            currElement = currElement._parent;
                            if (prevElement._isViewRoot) {
                                currEager = false;
                            }
                            result = currElement._getLocalDependency(template_ast_1.ProviderAstType.PublicService, dep, currEager);
                        }
                        // check @Host restriction
                        if (lang_1.isBlank(result)) {
                            if (!dep.isHost || this._viewContext.component.type.isHost ||
                                identifiers_1.identifierToken(this._viewContext.component.type).equalsTo(dep.token) ||
                                lang_1.isPresent(this._viewContext.viewProviders.get(dep.token))) {
                                result = dep;
                            }
                            else {
                                result = dep.isOptional ?
                                    result = new compile_metadata_1.CompileDiDependencyMetadata({ isValue: true, value: null }) :
                                    null;
                            }
                        }
                    }
                    if (lang_1.isBlank(result)) {
                        this._viewContext.errors.push(new ProviderError("No provider for " + dep.token.name, this._sourceSpan));
                    }
                    return result;
                };
                return ProviderElementContext;
            }());
            exports_1("ProviderElementContext", ProviderElementContext);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9wcm92aWRlcl9wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQStSQSw0QkFDSSxRQUFpQyxFQUNqQyxFQUMyRjtZQUQxRiw0QkFBVyxFQUFFLHNCQUFRLEVBQUUsY0FBSTtRQUU5QixNQUFNLENBQUMsSUFBSSwwQ0FBdUIsQ0FBQztZQUNqQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUs7WUFDckIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRO1lBQzNCLFdBQVcsRUFBRSxXQUFXO1lBQ3hCLFVBQVUsRUFBRSxRQUFRLENBQUMsVUFBVTtZQUMvQixRQUFRLEVBQUUsUUFBUTtZQUNsQixJQUFJLEVBQUUsSUFBSTtZQUNWLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSztTQUN0QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsK0JBQ0ksUUFBcUIsRUFDckIsRUFBMEU7WUFBekUsZ0JBQUssRUFBRSx3QkFBUztRQUNuQixNQUFNLENBQUMsSUFBSSwwQkFBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsS0FBSyxJQUFJLEtBQUssRUFBRSxTQUFTLEVBQzFFLFFBQVEsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCw2QkFDSSxTQUF1RSxFQUN2RSxVQUEyQixFQUFFLFlBQTBCLEVBQ3ZELGVBQWlEO1FBQWpELCtCQUFpRCxHQUFqRCxzQkFBaUQ7UUFDbkQsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixTQUFTLENBQUMsT0FBTyxDQUFD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LENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ3pCLElBQUksYUFBYSxDQUFDLHFCQUFtQixHQUFHLENBQUMsS0FBSyxDQUFDLElBQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDaEYsQ0FBQztvQkFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNoQixDQUFDO2dCQUNILDZCQUFDO1lBQUQsQ0FqT0EsQUFpT0MsSUFBQTtZQWpPRCwyREFpT0MsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tcGlsZXIvcHJvdmlkZXJfcGFyc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc1ByZXNlbnQsIGlzQmxhbmssIGlzQXJyYXksIG5vcm1hbGl6ZUJsYW5rfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7XG4gIFRlbXBsYXRlQXN0LFxuICBUZW1wbGF0ZUFzdFZpc2l0b3IsXG4gIE5nQ29udGVudEFzdCxcbiAgRW1iZWRkZWRUZW1wbGF0ZUFzdCxcbiAgRWxlbWVudEFzdCxcbiAgUmVmZXJlbmNlQXN0LFxuICBCb3VuZEV2ZW50QXN0LFxuICBCb3VuZEVsZW1lbnRQcm9wZXJ0eUFzdCxcbiAgQXR0ckFzdCxcbiAgQm91bmRUZXh0QXN0LFxuICBUZXh0QXN0LFxuICBEaXJlY3RpdmVBc3QsXG4gIEJvdW5kRGlyZWN0aXZlUHJvcGVydHlBc3QsXG4gIHRlbXBsYXRlVmlzaXRBbGwsXG4gIFByb3BlcnR5QmluZGluZ1R5cGUsXG4gIFByb3ZpZGVyQXN0LFxuICBQcm92aWRlckFzdFR5cGVcbn0gZnJvbSAnLi90ZW1wbGF0ZV9hc3QnO1xuaW1wb3J0IHtcbiAgQ29tcGlsZVR5cGVNZXRhZGF0YSxcbiAgQ29tcGlsZVRva2VuTWFwLFxuICBDb21waWxlUXVlcnlNZXRhZGF0YSxcbiAgQ29tcGlsZVRva2VuTWV0YWRhdGEsXG4gIENvbXBpbGVQcm92aWRlck1ldGFkYXRhLFxuICBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsXG4gIENvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YVxufSBmcm9tICcuL2NvbXBpbGVfbWV0YWRhdGEnO1xuaW1wb3J0IHtJZGVudGlmaWVycywgaWRlbnRpZmllclRva2VufSBmcm9tICcuL2lkZW50aWZpZXJzJztcbmltcG9ydCB7UGFyc2VTb3VyY2VTcGFuLCBQYXJzZUVycm9yLCBQYXJzZUxvY2F0aW9ufSBmcm9tICcuL3BhcnNlX3V0aWwnO1xuXG5leHBvcnQgY2xhc3MgUHJvdmlkZXJFcnJvciBleHRlbmRzIFBhcnNlRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcsIHNwYW46IFBhcnNlU291cmNlU3BhbikgeyBzdXBlcihzcGFuLCBtZXNzYWdlKTsgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJvdmlkZXJWaWV3Q29udGV4dCB7XG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHZpZXdRdWVyaWVzOiBDb21waWxlVG9rZW5NYXA8Q29tcGlsZVF1ZXJ5TWV0YWRhdGFbXT47XG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHZpZXdQcm92aWRlcnM6IENvbXBpbGVUb2tlbk1hcDxib29sZWFuPjtcbiAgZXJyb3JzOiBQcm92aWRlckVycm9yW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29tcG9uZW50OiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsIHB1YmxpYyBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pIHtcbiAgICB0aGlzLnZpZXdRdWVyaWVzID0gX2dldFZpZXdRdWVyaWVzKGNvbXBvbmVudCk7XG4gICAgdGhpcy52aWV3UHJvdmlkZXJzID0gbmV3IENvbXBpbGVUb2tlbk1hcDxib29sZWFuPigpO1xuICAgIF9ub3JtYWxpemVQcm92aWRlcnMoY29tcG9uZW50LnZpZXdQcm92aWRlcnMsIHNvdXJjZVNwYW4sIHRoaXMuZXJyb3JzKVxuICAgICAgICAuZm9yRWFjaCgocHJvdmlkZXIpID0+IHtcbiAgICAgICAgICBpZiAoaXNCbGFuayh0aGlzLnZpZXdQcm92aWRlcnMuZ2V0KHByb3ZpZGVyLnRva2VuKSkpIHtcbiAgICAgICAgICAgIHRoaXMudmlld1Byb3ZpZGVycy5hZGQocHJvdmlkZXIudG9rZW4sIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFByb3ZpZGVyRWxlbWVudENvbnRleHQge1xuICBwcml2YXRlIF9jb250ZW50UXVlcmllczogQ29tcGlsZVRva2VuTWFwPENvbXBpbGVRdWVyeU1ldGFkYXRhW10+O1xuXG4gIHByaXZhdGUgX3RyYW5zZm9ybWVkUHJvdmlkZXJzID0gbmV3IENvbXBpbGVUb2tlbk1hcDxQcm92aWRlckFzdD4oKTtcbiAgcHJpdmF0ZSBfc2VlblByb3ZpZGVycyA9IG5ldyBDb21waWxlVG9rZW5NYXA8Ym9vbGVhbj4oKTtcbiAgcHJpdmF0ZSBfYWxsUHJvdmlkZXJzOiBDb21waWxlVG9rZW5NYXA8UHJvdmlkZXJBc3Q+O1xuICBwcml2YXRlIF9hdHRyczoge1trZXk6IHN0cmluZ106IHN0cmluZ307XG4gIHByaXZhdGUgX2hhc1ZpZXdDb250YWluZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF92aWV3Q29udGV4dDogUHJvdmlkZXJWaWV3Q29udGV4dCwgcHJpdmF0ZSBfcGFyZW50OiBQcm92aWRlckVsZW1lbnRDb250ZXh0LFxuICAgICAgICAgICAgICBwcml2YXRlIF9pc1ZpZXdSb290OiBib29sZWFuLCBwcml2YXRlIF9kaXJlY3RpdmVBc3RzOiBEaXJlY3RpdmVBc3RbXSxcbiAgICAgICAgICAgICAgYXR0cnM6IEF0dHJBc3RbXSwgcmVmczogUmVmZXJlbmNlQXN0W10sIHByaXZhdGUgX3NvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbikge1xuICAgIHRoaXMuX2F0dHJzID0ge307XG4gICAgYXR0cnMuZm9yRWFjaCgoYXR0ckFzdCkgPT4gdGhpcy5fYXR0cnNbYXR0ckFzdC5uYW1lXSA9IGF0dHJBc3QudmFsdWUpO1xuICAgIHZhciBkaXJlY3RpdmVzTWV0YSA9IF9kaXJlY3RpdmVBc3RzLm1hcChkaXJlY3RpdmVBc3QgPT4gZGlyZWN0aXZlQXN0LmRpcmVjdGl2ZSk7XG4gICAgdGhpcy5fYWxsUHJvdmlkZXJzID1cbiAgICAgICAgX3Jlc29sdmVQcm92aWRlcnNGcm9tRGlyZWN0aXZlcyhkaXJlY3RpdmVzTWV0YSwgX3NvdXJjZVNwYW4sIF92aWV3Q29udGV4dC5lcnJvcnMpO1xuICAgIHRoaXMuX2NvbnRlbnRRdWVyaWVzID0gX2dldENvbnRlbnRRdWVyaWVzKGRpcmVjdGl2ZXNNZXRhKTtcbiAgICB2YXIgcXVlcmllZFRva2VucyA9IG5ldyBDb21waWxlVG9rZW5NYXA8Ym9vbGVhbj4oKTtcbiAgICB0aGlzLl9hbGxQcm92aWRlcnMudmFsdWVzKCkuZm9yRWFjaChcbiAgICAgICAgKHByb3ZpZGVyKSA9PiB7IHRoaXMuX2FkZFF1ZXJ5UmVhZHNUbyhwcm92aWRlci50b2tlbiwgcXVlcmllZFRva2Vucyk7IH0pO1xuICAgIHJlZnMuZm9yRWFjaCgocmVmQXN0KSA9PiB7XG4gICAgICB0aGlzLl9hZGRRdWVyeVJlYWRzVG8obmV3IENvbXBpbGVUb2tlbk1ldGFkYXRhKHt2YWx1ZTogcmVmQXN0Lm5hbWV9KSwgcXVlcmllZFRva2Vucyk7XG4gICAgfSk7XG4gICAgaWYgKGlzUHJlc2VudChxdWVyaWVkVG9rZW5zLmdldChpZGVudGlmaWVyVG9rZW4oSWRlbnRpZmllcnMuVmlld0NvbnRhaW5lclJlZikpKSkge1xuICAgICAgdGhpcy5faGFzVmlld0NvbnRhaW5lciA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIHRoZSBwcm92aWRlcnMgdGhhdCB3ZSBrbm93IGFyZSBlYWdlciBmaXJzdFxuICAgIHRoaXMuX2FsbFByb3ZpZGVycy52YWx1ZXMoKS5mb3JFYWNoKChwcm92aWRlcikgPT4ge1xuICAgICAgdmFyIGVhZ2VyID0gcHJvdmlkZXIuZWFnZXIgfHwgaXNQcmVzZW50KHF1ZXJpZWRUb2tlbnMuZ2V0KHByb3ZpZGVyLnRva2VuKSk7XG4gICAgICBpZiAoZWFnZXIpIHtcbiAgICAgICAgdGhpcy5fZ2V0T3JDcmVhdGVMb2NhbFByb3ZpZGVyKHByb3ZpZGVyLnByb3ZpZGVyVHlwZSwgcHJvdmlkZXIudG9rZW4sIHRydWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYWZ0ZXJFbGVtZW50KCkge1xuICAgIC8vIGNvbGxlY3QgbGF6eSBwcm92aWRlcnNcbiAgICB0aGlzLl9hbGxQcm92aWRlcnMudmFsdWVzKCkuZm9yRWFjaCgocHJvdmlkZXIpID0+IHtcbiAgICAgIHRoaXMuX2dldE9yQ3JlYXRlTG9jYWxQcm92aWRlcihwcm92aWRlci5wcm92aWRlclR5cGUsIHByb3ZpZGVyLnRva2VuLCBmYWxzZSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgdHJhbnNmb3JtUHJvdmlkZXJzKCk6IFByb3ZpZGVyQXN0W10geyByZXR1cm4gdGhpcy5fdHJhbnNmb3JtZWRQcm92aWRlcnMudmFsdWVzKCk7IH1cblxuICBnZXQgdHJhbnNmb3JtZWREaXJlY3RpdmVBc3RzKCk6IERpcmVjdGl2ZUFzdFtdIHtcbiAgICB2YXIgc29ydGVkUHJvdmlkZXJUeXBlcyA9XG4gICAgICAgIHRoaXMuX3RyYW5zZm9ybWVkUHJvdmlkZXJzLnZhbHVlcygpLm1hcChwcm92aWRlciA9PiBwcm92aWRlci50b2tlbi5pZGVudGlmaWVyKTtcbiAgICB2YXIgc29ydGVkRGlyZWN0aXZlcyA9IExpc3RXcmFwcGVyLmNsb25lKHRoaXMuX2RpcmVjdGl2ZUFzdHMpO1xuICAgIExpc3RXcmFwcGVyLnNvcnQoc29ydGVkRGlyZWN0aXZlcyxcbiAgICAgICAgICAgICAgICAgICAgIChkaXIxLCBkaXIyKSA9PiBzb3J0ZWRQcm92aWRlclR5cGVzLmluZGV4T2YoZGlyMS5kaXJlY3RpdmUudHlwZSkgLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRlZFByb3ZpZGVyVHlwZXMuaW5kZXhPZihkaXIyLmRpcmVjdGl2ZS50eXBlKSk7XG4gICAgcmV0dXJuIHNvcnRlZERpcmVjdGl2ZXM7XG4gIH1cblxuICBnZXQgdHJhbnNmb3JtZWRIYXNWaWV3Q29udGFpbmVyKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faGFzVmlld0NvbnRhaW5lcjsgfVxuXG4gIHByaXZhdGUgX2FkZFF1ZXJ5UmVhZHNUbyh0b2tlbjogQ29tcGlsZVRva2VuTWV0YWRhdGEsIHF1ZXJ5UmVhZFRva2VuczogQ29tcGlsZVRva2VuTWFwPGJvb2xlYW4+KSB7XG4gICAgdGhpcy5fZ2V0UXVlcmllc0Zvcih0b2tlbikuZm9yRWFjaCgocXVlcnkpID0+IHtcbiAgICAgIHZhciBxdWVyeVJlYWRUb2tlbiA9IGlzUHJlc2VudChxdWVyeS5yZWFkKSA/IHF1ZXJ5LnJlYWQgOiB0b2tlbjtcbiAgICAgIGlmIChpc0JsYW5rKHF1ZXJ5UmVhZFRva2Vucy5nZXQocXVlcnlSZWFkVG9rZW4pKSkge1xuICAgICAgICBxdWVyeVJlYWRUb2tlbnMuYWRkKHF1ZXJ5UmVhZFRva2VuLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFF1ZXJpZXNGb3IodG9rZW46IENvbXBpbGVUb2tlbk1ldGFkYXRhKTogQ29tcGlsZVF1ZXJ5TWV0YWRhdGFbXSB7XG4gICAgdmFyIHJlc3VsdDogQ29tcGlsZVF1ZXJ5TWV0YWRhdGFbXSA9IFtdO1xuICAgIHZhciBjdXJyZW50RWw6IFByb3ZpZGVyRWxlbWVudENvbnRleHQgPSB0aGlzO1xuICAgIHZhciBkaXN0YW5jZSA9IDA7XG4gICAgdmFyIHF1ZXJpZXM6IENvbXBpbGVRdWVyeU1ldGFkYXRhW107XG4gICAgd2hpbGUgKGN1cnJlbnRFbCAhPT0gbnVsbCkge1xuICAgICAgcXVlcmllcyA9IGN1cnJlbnRFbC5fY29udGVudFF1ZXJpZXMuZ2V0KHRva2VuKTtcbiAgICAgIGlmIChpc1ByZXNlbnQocXVlcmllcykpIHtcbiAgICAgICAgTGlzdFdyYXBwZXIuYWRkQWxsKHJlc3VsdCwgcXVlcmllcy5maWx0ZXIoKHF1ZXJ5KSA9PiBxdWVyeS5kZXNjZW5kYW50cyB8fCBkaXN0YW5jZSA8PSAxKSk7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudEVsLl9kaXJlY3RpdmVBc3RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZGlzdGFuY2UrKztcbiAgICAgIH1cbiAgICAgIGN1cnJlbnRFbCA9IGN1cnJlbnRFbC5fcGFyZW50O1xuICAgIH1cbiAgICBxdWVyaWVzID0gdGhpcy5fdmlld0NvbnRleHQudmlld1F1ZXJpZXMuZ2V0KHRva2VuKTtcbiAgICBpZiAoaXNQcmVzZW50KHF1ZXJpZXMpKSB7XG4gICAgICBMaXN0V3JhcHBlci5hZGRBbGwocmVzdWx0LCBxdWVyaWVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBfZ2V0T3JDcmVhdGVMb2NhbFByb3ZpZGVyKHJlcXVlc3RpbmdQcm92aWRlclR5cGU6IFByb3ZpZGVyQXN0VHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBDb21waWxlVG9rZW5NZXRhZGF0YSwgZWFnZXI6IGJvb2xlYW4pOiBQcm92aWRlckFzdCB7XG4gICAgdmFyIHJlc29sdmVkUHJvdmlkZXIgPSB0aGlzLl9hbGxQcm92aWRlcnMuZ2V0KHRva2VuKTtcbiAgICBpZiAoaXNCbGFuayhyZXNvbHZlZFByb3ZpZGVyKSB8fFxuICAgICAgICAoKHJlcXVlc3RpbmdQcm92aWRlclR5cGUgPT09IFByb3ZpZGVyQXN0VHlwZS5EaXJlY3RpdmUgfHxcbiAgICAgICAgICByZXF1ZXN0aW5nUHJvdmlkZXJUeXBlID09PSBQcm92aWRlckFzdFR5cGUuUHVibGljU2VydmljZSkgJiZcbiAgICAgICAgIHJlc29sdmVkUHJvdmlkZXIucHJvdmlkZXJUeXBlID09PSBQcm92aWRlckFzdFR5cGUuUHJpdmF0ZVNlcnZpY2UpIHx8XG4gICAgICAgICgocmVxdWVzdGluZ1Byb3ZpZGVyVHlwZSA9PT0gUHJvdmlkZXJBc3RUeXBlLlByaXZhdGVTZXJ2aWNlIHx8XG4gICAgICAgICAgcmVxdWVzdGluZ1Byb3ZpZGVyVHlwZSA9PT0gUHJvdmlkZXJBc3RUeXBlLlB1YmxpY1NlcnZpY2UpICYmXG4gICAgICAgICByZXNvbHZlZFByb3ZpZGVyLnByb3ZpZGVyVHlwZSA9PT0gUHJvdmlkZXJBc3RUeXBlLkJ1aWx0aW4pKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdmFyIHRyYW5zZm9ybWVkUHJvdmlkZXJBc3QgPSB0aGlzLl90cmFuc2Zvcm1lZFByb3ZpZGVycy5nZXQodG9rZW4pO1xuICAgIGlmIChpc1ByZXNlbnQodHJhbnNmb3JtZWRQcm92aWRlckFzdCkpIHtcbiAgICAgIHJldHVybiB0cmFuc2Zvcm1lZFByb3ZpZGVyQXN0O1xuICAgIH1cbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuX3NlZW5Qcm92aWRlcnMuZ2V0KHRva2VuKSkpIHtcbiAgICAgIHRoaXMuX3ZpZXdDb250ZXh0LmVycm9ycy5wdXNoKG5ldyBQcm92aWRlckVycm9yKFxuICAgICAgICAgIGBDYW5ub3QgaW5zdGFudGlhdGUgY3ljbGljIGRlcGVuZGVuY3khICR7dG9rZW4ubmFtZX1gLCB0aGlzLl9zb3VyY2VTcGFuKSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5fc2VlblByb3ZpZGVycy5hZGQodG9rZW4sIHRydWUpO1xuICAgIHZhciB0cmFuc2Zvcm1lZFByb3ZpZGVycyA9IHJlc29sdmVkUHJvdmlkZXIucHJvdmlkZXJzLm1hcCgocHJvdmlkZXIpID0+IHtcbiAgICAgIHZhciB0cmFuc2Zvcm1lZFVzZVZhbHVlID0gcHJvdmlkZXIudXNlVmFsdWU7XG4gICAgICB2YXIgdHJhbnNmb3JtZWRVc2VFeGlzdGluZyA9IHByb3ZpZGVyLnVzZUV4aXN0aW5nO1xuICAgICAgdmFyIHRyYW5zZm9ybWVkRGVwcztcbiAgICAgIGlmIChpc1ByZXNlbnQocHJvdmlkZXIudXNlRXhpc3RpbmcpKSB7XG4gICAgICAgIHZhciBleGlzdGluZ0RpRGVwID0gdGhpcy5fZ2V0RGVwZW5kZW5jeShcbiAgICAgICAgICAgIHJlc29sdmVkUHJvdmlkZXIucHJvdmlkZXJUeXBlLFxuICAgICAgICAgICAgbmV3IENvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YSh7dG9rZW46IHByb3ZpZGVyLnVzZUV4aXN0aW5nfSksIGVhZ2VyKTtcbiAgICAgICAgaWYgKGlzUHJlc2VudChleGlzdGluZ0RpRGVwLnRva2VuKSkge1xuICAgICAgICAgIHRyYW5zZm9ybWVkVXNlRXhpc3RpbmcgPSBleGlzdGluZ0RpRGVwLnRva2VuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRyYW5zZm9ybWVkVXNlRXhpc3RpbmcgPSBudWxsO1xuICAgICAgICAgIHRyYW5zZm9ybWVkVXNlVmFsdWUgPSBleGlzdGluZ0RpRGVwLnZhbHVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudChwcm92aWRlci51c2VGYWN0b3J5KSkge1xuICAgICAgICB2YXIgZGVwcyA9IGlzUHJlc2VudChwcm92aWRlci5kZXBzKSA/IHByb3ZpZGVyLmRlcHMgOiBwcm92aWRlci51c2VGYWN0b3J5LmRpRGVwcztcbiAgICAgICAgdHJhbnNmb3JtZWREZXBzID1cbiAgICAgICAgICAgIGRlcHMubWFwKChkZXApID0+IHRoaXMuX2dldERlcGVuZGVuY3kocmVzb2x2ZWRQcm92aWRlci5wcm92aWRlclR5cGUsIGRlcCwgZWFnZXIpKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KHByb3ZpZGVyLnVzZUNsYXNzKSkge1xuICAgICAgICB2YXIgZGVwcyA9IGlzUHJlc2VudChwcm92aWRlci5kZXBzKSA/IHByb3ZpZGVyLmRlcHMgOiBwcm92aWRlci51c2VDbGFzcy5kaURlcHM7XG4gICAgICAgIHRyYW5zZm9ybWVkRGVwcyA9XG4gICAgICAgICAgICBkZXBzLm1hcCgoZGVwKSA9PiB0aGlzLl9nZXREZXBlbmRlbmN5KHJlc29sdmVkUHJvdmlkZXIucHJvdmlkZXJUeXBlLCBkZXAsIGVhZ2VyKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gX3RyYW5zZm9ybVByb3ZpZGVyKHByb3ZpZGVyLCB7XG4gICAgICAgIHVzZUV4aXN0aW5nOiB0cmFuc2Zvcm1lZFVzZUV4aXN0aW5nLFxuICAgICAgICB1c2VWYWx1ZTogdHJhbnNmb3JtZWRVc2VWYWx1ZSxcbiAgICAgICAgZGVwczogdHJhbnNmb3JtZWREZXBzXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB0cmFuc2Zvcm1lZFByb3ZpZGVyQXN0ID1cbiAgICAgICAgX3RyYW5zZm9ybVByb3ZpZGVyQXN0KHJlc29sdmVkUHJvdmlkZXIsIHtlYWdlcjogZWFnZXIsIHByb3ZpZGVyczogdHJhbnNmb3JtZWRQcm92aWRlcnN9KTtcbiAgICB0aGlzLl90cmFuc2Zvcm1lZFByb3ZpZGVycy5hZGQodG9rZW4sIHRyYW5zZm9ybWVkUHJvdmlkZXJBc3QpO1xuICAgIHJldHVybiB0cmFuc2Zvcm1lZFByb3ZpZGVyQXN0O1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0TG9jYWxEZXBlbmRlbmN5KHJlcXVlc3RpbmdQcm92aWRlclR5cGU6IFByb3ZpZGVyQXN0VHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcDogQ29tcGlsZURpRGVwZW5kZW5jeU1ldGFkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWFnZXI6IGJvb2xlYW4gPSBudWxsKTogQ29tcGlsZURpRGVwZW5kZW5jeU1ldGFkYXRhIHtcbiAgICBpZiAoZGVwLmlzQXR0cmlidXRlKSB7XG4gICAgICB2YXIgYXR0clZhbHVlID0gdGhpcy5fYXR0cnNbZGVwLnRva2VuLnZhbHVlXTtcbiAgICAgIHJldHVybiBuZXcgQ29tcGlsZURpRGVwZW5kZW5jeU1ldGFkYXRhKHtpc1ZhbHVlOiB0cnVlLCB2YWx1ZTogbm9ybWFsaXplQmxhbmsoYXR0clZhbHVlKX0pO1xuICAgIH1cbiAgICBpZiAoaXNQcmVzZW50KGRlcC5xdWVyeSkgfHwgaXNQcmVzZW50KGRlcC52aWV3UXVlcnkpKSB7XG4gICAgICByZXR1cm4gZGVwO1xuICAgIH1cblxuICAgIGlmIChpc1ByZXNlbnQoZGVwLnRva2VuKSkge1xuICAgICAgLy8gYWNjZXNzIGJ1aWx0aW50c1xuICAgICAgaWYgKChyZXF1ZXN0aW5nUHJvdmlkZXJUeXBlID09PSBQcm92aWRlckFzdFR5cGUuRGlyZWN0aXZlIHx8XG4gICAgICAgICAgIHJlcXVlc3RpbmdQcm92aWRlclR5cGUgPT09IFByb3ZpZGVyQXN0VHlwZS5Db21wb25lbnQpKSB7XG4gICAgICAgIGlmIChkZXAudG9rZW4uZXF1YWxzVG8oaWRlbnRpZmllclRva2VuKElkZW50aWZpZXJzLlJlbmRlcmVyKSkgfHxcbiAgICAgICAgICAgIGRlcC50b2tlbi5lcXVhbHNUbyhpZGVudGlmaWVyVG9rZW4oSWRlbnRpZmllcnMuRWxlbWVudFJlZikpIHx8XG4gICAgICAgICAgICBkZXAudG9rZW4uZXF1YWxzVG8oaWRlbnRpZmllclRva2VuKElkZW50aWZpZXJzLkNoYW5nZURldGVjdG9yUmVmKSkgfHxcbiAgICAgICAgICAgIGRlcC50b2tlbi5lcXVhbHNUbyhpZGVudGlmaWVyVG9rZW4oSWRlbnRpZmllcnMuVGVtcGxhdGVSZWYpKSkge1xuICAgICAgICAgIHJldHVybiBkZXA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlcC50b2tlbi5lcXVhbHNUbyhpZGVudGlmaWVyVG9rZW4oSWRlbnRpZmllcnMuVmlld0NvbnRhaW5lclJlZikpKSB7XG4gICAgICAgICAgdGhpcy5faGFzVmlld0NvbnRhaW5lciA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIGFjY2VzcyB0aGUgaW5qZWN0b3JcbiAgICAgIGlmIChkZXAudG9rZW4uZXF1YWxzVG8oaWRlbnRpZmllclRva2VuKElkZW50aWZpZXJzLkluamVjdG9yKSkpIHtcbiAgICAgICAgcmV0dXJuIGRlcDtcbiAgICAgIH1cbiAgICAgIC8vIGFjY2VzcyBwcm92aWRlcnNcbiAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5fZ2V0T3JDcmVhdGVMb2NhbFByb3ZpZGVyKHJlcXVlc3RpbmdQcm92aWRlclR5cGUsIGRlcC50b2tlbiwgZWFnZXIpKSkge1xuICAgICAgICByZXR1cm4gZGVwO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgX2dldERlcGVuZGVuY3kocmVxdWVzdGluZ1Byb3ZpZGVyVHlwZTogUHJvdmlkZXJBc3RUeXBlLCBkZXA6IENvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBlYWdlcjogYm9vbGVhbiA9IG51bGwpOiBDb21waWxlRGlEZXBlbmRlbmN5TWV0YWRhdGEge1xuICAgIHZhciBjdXJyRWxlbWVudDogUHJvdmlkZXJFbGVtZW50Q29udGV4dCA9IHRoaXM7XG4gICAgdmFyIGN1cnJFYWdlcjogYm9vbGVhbiA9IGVhZ2VyO1xuICAgIHZhciByZXN1bHQ6IENvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YSA9IG51bGw7XG4gICAgaWYgKCFkZXAuaXNTa2lwU2VsZikge1xuICAgICAgcmVzdWx0ID0gdGhpcy5fZ2V0TG9jYWxEZXBlbmRlbmN5KHJlcXVlc3RpbmdQcm92aWRlclR5cGUsIGRlcCwgZWFnZXIpO1xuICAgIH1cbiAgICBpZiAoZGVwLmlzU2VsZikge1xuICAgICAgaWYgKGlzQmxhbmsocmVzdWx0KSAmJiBkZXAuaXNPcHRpb25hbCkge1xuICAgICAgICByZXN1bHQgPSBuZXcgQ29tcGlsZURpRGVwZW5kZW5jeU1ldGFkYXRhKHtpc1ZhbHVlOiB0cnVlLCB2YWx1ZTogbnVsbH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjaGVjayBwYXJlbnQgZWxlbWVudHNcbiAgICAgIHdoaWxlIChpc0JsYW5rKHJlc3VsdCkgJiYgaXNQcmVzZW50KGN1cnJFbGVtZW50Ll9wYXJlbnQpKSB7XG4gICAgICAgIHZhciBwcmV2RWxlbWVudCA9IGN1cnJFbGVtZW50O1xuICAgICAgICBjdXJyRWxlbWVudCA9IGN1cnJFbGVtZW50Ll9wYXJlbnQ7XG4gICAgICAgIGlmIChwcmV2RWxlbWVudC5faXNWaWV3Um9vdCkge1xuICAgICAgICAgIGN1cnJFYWdlciA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCA9IGN1cnJFbGVtZW50Ll9nZXRMb2NhbERlcGVuZGVuY3koUHJvdmlkZXJBc3RUeXBlLlB1YmxpY1NlcnZpY2UsIGRlcCwgY3VyckVhZ2VyKTtcbiAgICAgIH1cbiAgICAgIC8vIGNoZWNrIEBIb3N0IHJlc3RyaWN0aW9uXG4gICAgICBpZiAoaXNCbGFuayhyZXN1bHQpKSB7XG4gICAgICAgIGlmICghZGVwLmlzSG9zdCB8fCB0aGlzLl92aWV3Q29udGV4dC5jb21wb25lbnQudHlwZS5pc0hvc3QgfHxcbiAgICAgICAgICAgIGlkZW50aWZpZXJUb2tlbih0aGlzLl92aWV3Q29udGV4dC5jb21wb25lbnQudHlwZSkuZXF1YWxzVG8oZGVwLnRva2VuKSB8fFxuICAgICAgICAgICAgaXNQcmVzZW50KHRoaXMuX3ZpZXdDb250ZXh0LnZpZXdQcm92aWRlcnMuZ2V0KGRlcC50b2tlbikpKSB7XG4gICAgICAgICAgcmVzdWx0ID0gZGVwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdCA9IGRlcC5pc09wdGlvbmFsID9cbiAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gbmV3IENvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YSh7aXNWYWx1ZTogdHJ1ZSwgdmFsdWU6IG51bGx9KSA6XG4gICAgICAgICAgICAgICAgICAgICAgIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzQmxhbmsocmVzdWx0KSkge1xuICAgICAgdGhpcy5fdmlld0NvbnRleHQuZXJyb3JzLnB1c2goXG4gICAgICAgICAgbmV3IFByb3ZpZGVyRXJyb3IoYE5vIHByb3ZpZGVyIGZvciAke2RlcC50b2tlbi5uYW1lfWAsIHRoaXMuX3NvdXJjZVNwYW4pKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuXG5mdW5jdGlvbiBfdHJhbnNmb3JtUHJvdmlkZXIoXG4gICAgcHJvdmlkZXI6IENvbXBpbGVQcm92aWRlck1ldGFkYXRhLFxuICAgIHt1c2VFeGlzdGluZywgdXNlVmFsdWUsIGRlcHN9OlxuICAgICAgICB7dXNlRXhpc3Rpbmc6IENvbXBpbGVUb2tlbk1ldGFkYXRhLCB1c2VWYWx1ZTogYW55LCBkZXBzOiBDb21waWxlRGlEZXBlbmRlbmN5TWV0YWRhdGFbXX0pIHtcbiAgcmV0dXJuIG5ldyBDb21waWxlUHJvdmlkZXJNZXRhZGF0YSh7XG4gICAgdG9rZW46IHByb3ZpZGVyLnRva2VuLFxuICAgIHVzZUNsYXNzOiBwcm92aWRlci51c2VDbGFzcyxcbiAgICB1c2VFeGlzdGluZzogdXNlRXhpc3RpbmcsXG4gICAgdXNlRmFjdG9yeTogcHJvdmlkZXIudXNlRmFjdG9yeSxcbiAgICB1c2VWYWx1ZTogdXNlVmFsdWUsXG4gICAgZGVwczogZGVwcyxcbiAgICBtdWx0aTogcHJvdmlkZXIubXVsdGlcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIF90cmFuc2Zvcm1Qcm92aWRlckFzdChcbiAgICBwcm92aWRlcjogUHJvdmlkZXJBc3QsXG4gICAge2VhZ2VyLCBwcm92aWRlcnN9OiB7ZWFnZXI6IGJvb2xlYW4sIHByb3ZpZGVyczogQ29tcGlsZVByb3ZpZGVyTWV0YWRhdGFbXX0pOiBQcm92aWRlckFzdCB7XG4gIHJldHVybiBuZXcgUHJvdmlkZXJBc3QocHJvdmlkZXIudG9rZW4sIHByb3ZpZGVyLm11bHRpUHJvdmlkZXIsIHByb3ZpZGVyLmVhZ2VyIHx8IGVhZ2VyLCBwcm92aWRlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIucHJvdmlkZXJUeXBlLCBwcm92aWRlci5zb3VyY2VTcGFuKTtcbn1cblxuZnVuY3Rpb24gX25vcm1hbGl6ZVByb3ZpZGVycyhcbiAgICBwcm92aWRlcnM6IEFycmF5PENvbXBpbGVQcm92aWRlck1ldGFkYXRhIHwgQ29tcGlsZVR5cGVNZXRhZGF0YSB8IGFueVtdPixcbiAgICBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sIHRhcmdldEVycm9yczogUGFyc2VFcnJvcltdLFxuICAgIHRhcmdldFByb3ZpZGVyczogQ29tcGlsZVByb3ZpZGVyTWV0YWRhdGFbXSA9IG51bGwpOiBDb21waWxlUHJvdmlkZXJNZXRhZGF0YVtdIHtcbiAgaWYgKGlzQmxhbmsodGFyZ2V0UHJvdmlkZXJzKSkge1xuICAgIHRhcmdldFByb3ZpZGVycyA9IFtdO1xuICB9XG4gIGlmIChpc1ByZXNlbnQocHJvdmlkZXJzKSkge1xuICAgIHByb3ZpZGVycy5mb3JFYWNoKChwcm92aWRlcikgPT4ge1xuICAgICAgaWYgKGlzQXJyYXkocHJvdmlkZXIpKSB7XG4gICAgICAgIF9ub3JtYWxpemVQcm92aWRlcnMoPGFueVtdPnByb3ZpZGVyLCBzb3VyY2VTcGFuLCB0YXJnZXRFcnJvcnMsIHRhcmdldFByb3ZpZGVycyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbm9ybWFsaXplUHJvdmlkZXI6IENvbXBpbGVQcm92aWRlck1ldGFkYXRhO1xuICAgICAgICBpZiAocHJvdmlkZXIgaW5zdGFuY2VvZiBDb21waWxlUHJvdmlkZXJNZXRhZGF0YSkge1xuICAgICAgICAgIG5vcm1hbGl6ZVByb3ZpZGVyID0gcHJvdmlkZXI7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvdmlkZXIgaW5zdGFuY2VvZiBDb21waWxlVHlwZU1ldGFkYXRhKSB7XG4gICAgICAgICAgbm9ybWFsaXplUHJvdmlkZXIgPSBuZXcgQ29tcGlsZVByb3ZpZGVyTWV0YWRhdGEoXG4gICAgICAgICAgICAgIHt0b2tlbjogbmV3IENvbXBpbGVUb2tlbk1ldGFkYXRhKHtpZGVudGlmaWVyOiBwcm92aWRlcn0pLCB1c2VDbGFzczogcHJvdmlkZXJ9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXJnZXRFcnJvcnMucHVzaChuZXcgUHJvdmlkZXJFcnJvcihgVW5rbm93biBwcm92aWRlciB0eXBlICR7cHJvdmlkZXJ9YCwgc291cmNlU3BhbikpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1ByZXNlbnQobm9ybWFsaXplUHJvdmlkZXIpKSB7XG4gICAgICAgICAgdGFyZ2V0UHJvdmlkZXJzLnB1c2gobm9ybWFsaXplUHJvdmlkZXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHRhcmdldFByb3ZpZGVycztcbn1cblxuXG5mdW5jdGlvbiBfcmVzb2x2ZVByb3ZpZGVyc0Zyb21EaXJlY3RpdmVzKGRpcmVjdGl2ZXM6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEVycm9yczogUGFyc2VFcnJvcltdKTogQ29tcGlsZVRva2VuTWFwPFByb3ZpZGVyQXN0PiB7XG4gIHZhciBwcm92aWRlcnNCeVRva2VuID0gbmV3IENvbXBpbGVUb2tlbk1hcDxQcm92aWRlckFzdD4oKTtcbiAgZGlyZWN0aXZlcy5mb3JFYWNoKChkaXJlY3RpdmUpID0+IHtcbiAgICB2YXIgZGlyUHJvdmlkZXIgPSBuZXcgQ29tcGlsZVByb3ZpZGVyTWV0YWRhdGEoXG4gICAgICAgIHt0b2tlbjogbmV3IENvbXBpbGVUb2tlbk1ldGFkYXRhKHtpZGVudGlmaWVyOiBkaXJlY3RpdmUudHlwZX0pLCB1c2VDbGFzczogZGlyZWN0aXZlLnR5cGV9KTtcbiAgICBfcmVzb2x2ZVByb3ZpZGVycyhbZGlyUHJvdmlkZXJdLFxuICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZS5pc0NvbXBvbmVudCA/IFByb3ZpZGVyQXN0VHlwZS5Db21wb25lbnQgOiBQcm92aWRlckFzdFR5cGUuRGlyZWN0aXZlLFxuICAgICAgICAgICAgICAgICAgICAgIHRydWUsIHNvdXJjZVNwYW4sIHRhcmdldEVycm9ycywgcHJvdmlkZXJzQnlUb2tlbik7XG4gIH0pO1xuXG4gIC8vIE5vdGU6IGRpcmVjdGl2ZXMgbmVlZCB0byBiZSBhYmxlIHRvIG92ZXJ3cml0ZSBwcm92aWRlcnMgb2YgYSBjb21wb25lbnQhXG4gIHZhciBkaXJlY3RpdmVzV2l0aENvbXBvbmVudEZpcnN0ID1cbiAgICAgIGRpcmVjdGl2ZXMuZmlsdGVyKGRpciA9PiBkaXIuaXNDb21wb25lbnQpLmNvbmNhdChkaXJlY3RpdmVzLmZpbHRlcihkaXIgPT4gIWRpci5pc0NvbXBvbmVudCkpO1xuICBkaXJlY3RpdmVzV2l0aENvbXBvbmVudEZpcnN0LmZvckVhY2goKGRpcmVjdGl2ZSkgPT4ge1xuICAgIF9yZXNvbHZlUHJvdmlkZXJzKF9ub3JtYWxpemVQcm92aWRlcnMoZGlyZWN0aXZlLnByb3ZpZGVycywgc291cmNlU3BhbiwgdGFyZ2V0RXJyb3JzKSxcbiAgICAgICAgICAgICAgICAgICAgICBQcm92aWRlckFzdFR5cGUuUHVibGljU2VydmljZSwgZmFsc2UsIHNvdXJjZVNwYW4sIHRhcmdldEVycm9ycyxcbiAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlcnNCeVRva2VuKTtcbiAgICBfcmVzb2x2ZVByb3ZpZGVycyhfbm9ybWFsaXplUHJvdmlkZXJzKGRpcmVjdGl2ZS52aWV3UHJvdmlkZXJzLCBzb3VyY2VTcGFuLCB0YXJnZXRFcnJvcnMpLFxuICAgICAgICAgICAgICAgICAgICAgIFByb3ZpZGVyQXN0VHlwZS5Qcml2YXRlU2VydmljZSwgZmFsc2UsIHNvdXJjZVNwYW4sIHRhcmdldEVycm9ycyxcbiAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlcnNCeVRva2VuKTtcbiAgfSk7XG4gIHJldHVybiBwcm92aWRlcnNCeVRva2VuO1xufVxuXG5mdW5jdGlvbiBfcmVzb2x2ZVByb3ZpZGVycyhwcm92aWRlcnM6IENvbXBpbGVQcm92aWRlck1ldGFkYXRhW10sIHByb3ZpZGVyVHlwZTogUHJvdmlkZXJBc3RUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZWFnZXI6IGJvb2xlYW4sIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbiwgdGFyZ2V0RXJyb3JzOiBQYXJzZUVycm9yW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRQcm92aWRlcnNCeVRva2VuOiBDb21waWxlVG9rZW5NYXA8UHJvdmlkZXJBc3Q+KSB7XG4gIHByb3ZpZGVycy5mb3JFYWNoKChwcm92aWRlcikgPT4ge1xuICAgIHZhciByZXNvbHZlZFByb3ZpZGVyID0gdGFyZ2V0UHJvdmlkZXJzQnlUb2tlbi5nZXQocHJvdmlkZXIudG9rZW4pO1xuICAgIGlmIChpc1ByZXNlbnQocmVzb2x2ZWRQcm92aWRlcikgJiYgcmVzb2x2ZWRQcm92aWRlci5tdWx0aVByb3ZpZGVyICE9PSBwcm92aWRlci5tdWx0aSkge1xuICAgICAgdGFyZ2V0RXJyb3JzLnB1c2gobmV3IFByb3ZpZGVyRXJyb3IoXG4gICAgICAgICAgYE1peGluZyBtdWx0aSBhbmQgbm9uIG11bHRpIHByb3ZpZGVyIGlzIG5vdCBwb3NzaWJsZSBmb3IgdG9rZW4gJHtyZXNvbHZlZFByb3ZpZGVyLnRva2VuLm5hbWV9YCxcbiAgICAgICAgICBzb3VyY2VTcGFuKSk7XG4gICAgfVxuICAgIGlmIChpc0JsYW5rKHJlc29sdmVkUHJvdmlkZXIpKSB7XG4gICAgICByZXNvbHZlZFByb3ZpZGVyID0gbmV3IFByb3ZpZGVyQXN0KHByb3ZpZGVyLnRva2VuLCBwcm92aWRlci5tdWx0aSwgZWFnZXIsIFtwcm92aWRlcl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyVHlwZSwgc291cmNlU3Bhbik7XG4gICAgICB0YXJnZXRQcm92aWRlcnNCeVRva2VuLmFkZChwcm92aWRlci50b2tlbiwgcmVzb2x2ZWRQcm92aWRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghcHJvdmlkZXIubXVsdGkpIHtcbiAgICAgICAgTGlzdFdyYXBwZXIuY2xlYXIocmVzb2x2ZWRQcm92aWRlci5wcm92aWRlcnMpO1xuICAgICAgfVxuICAgICAgcmVzb2x2ZWRQcm92aWRlci5wcm92aWRlcnMucHVzaChwcm92aWRlcik7XG4gICAgfVxuICB9KTtcbn1cblxuXG5mdW5jdGlvbiBfZ2V0Vmlld1F1ZXJpZXMoXG4gICAgY29tcG9uZW50OiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEpOiBDb21waWxlVG9rZW5NYXA8Q29tcGlsZVF1ZXJ5TWV0YWRhdGFbXT4ge1xuICB2YXIgdmlld1F1ZXJpZXMgPSBuZXcgQ29tcGlsZVRva2VuTWFwPENvbXBpbGVRdWVyeU1ldGFkYXRhW10+KCk7XG4gIGlmIChpc1ByZXNlbnQoY29tcG9uZW50LnZpZXdRdWVyaWVzKSkge1xuICAgIGNvbXBvbmVudC52aWV3UXVlcmllcy5mb3JFYWNoKChxdWVyeSkgPT4gX2FkZFF1ZXJ5VG9Ub2tlbk1hcCh2aWV3UXVlcmllcywgcXVlcnkpKTtcbiAgfVxuICBjb21wb25lbnQudHlwZS5kaURlcHMuZm9yRWFjaCgoZGVwKSA9PiB7XG4gICAgaWYgKGlzUHJlc2VudChkZXAudmlld1F1ZXJ5KSkge1xuICAgICAgX2FkZFF1ZXJ5VG9Ub2tlbk1hcCh2aWV3UXVlcmllcywgZGVwLnZpZXdRdWVyeSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHZpZXdRdWVyaWVzO1xufVxuXG5mdW5jdGlvbiBfZ2V0Q29udGVudFF1ZXJpZXMoXG4gICAgZGlyZWN0aXZlczogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhW10pOiBDb21waWxlVG9rZW5NYXA8Q29tcGlsZVF1ZXJ5TWV0YWRhdGFbXT4ge1xuICB2YXIgY29udGVudFF1ZXJpZXMgPSBuZXcgQ29tcGlsZVRva2VuTWFwPENvbXBpbGVRdWVyeU1ldGFkYXRhW10+KCk7XG4gIGRpcmVjdGl2ZXMuZm9yRWFjaChkaXJlY3RpdmUgPT4ge1xuICAgIGlmIChpc1ByZXNlbnQoZGlyZWN0aXZlLnF1ZXJpZXMpKSB7XG4gICAgICBkaXJlY3RpdmUucXVlcmllcy5mb3JFYWNoKChxdWVyeSkgPT4gX2FkZFF1ZXJ5VG9Ub2tlbk1hcChjb250ZW50UXVlcmllcywgcXVlcnkpKTtcbiAgICB9XG4gICAgZGlyZWN0aXZlLnR5cGUuZGlEZXBzLmZvckVhY2goKGRlcCkgPT4ge1xuICAgICAgaWYgKGlzUHJlc2VudChkZXAucXVlcnkpKSB7XG4gICAgICAgIF9hZGRRdWVyeVRvVG9rZW5NYXAoY29udGVudFF1ZXJpZXMsIGRlcC5xdWVyeSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gY29udGVudFF1ZXJpZXM7XG59XG5cbmZ1bmN0aW9uIF9hZGRRdWVyeVRvVG9rZW5NYXAobWFwOiBDb21waWxlVG9rZW5NYXA8Q29tcGlsZVF1ZXJ5TWV0YWRhdGFbXT4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBDb21waWxlUXVlcnlNZXRhZGF0YSkge1xuICBxdWVyeS5zZWxlY3RvcnMuZm9yRWFjaCgodG9rZW46IENvbXBpbGVUb2tlbk1ldGFkYXRhKSA9PiB7XG4gICAgdmFyIGVudHJ5ID0gbWFwLmdldCh0b2tlbik7XG4gICAgaWYgKGlzQmxhbmsoZW50cnkpKSB7XG4gICAgICBlbnRyeSA9IFtdO1xuICAgICAgbWFwLmFkZCh0b2tlbiwgZW50cnkpO1xuICAgIH1cbiAgICBlbnRyeS5wdXNoKHF1ZXJ5KTtcbiAgfSk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
