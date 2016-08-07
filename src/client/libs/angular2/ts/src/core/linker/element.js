System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/collection', 'angular2/src/core/di', 'angular2/src/core/di/provider', 'angular2/src/core/di/injector', '../metadata/di', './view_type', './element_ref', './view_container_ref', 'angular2/src/core/render/api', './template_ref', '../metadata/directives', 'angular2/src/core/change_detection/change_detection', './query_list', 'angular2/src/core/reflection/reflection', 'angular2/src/core/pipes/pipe_provider'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lang_1, exceptions_1, collection_1, di_1, provider_1, injector_1, provider_2, di_2, view_type_1, element_ref_1, view_container_ref_1, element_ref_2, api_1, template_ref_1, directives_1, change_detection_1, query_list_1, reflection_1, pipe_provider_1, view_container_ref_2;
    var _staticKeys, StaticKeys, DirectiveDependency, DirectiveProvider, QueryMetadataWithSetter, AppProtoElement, _Context, InjectorWithHostBoundary, AppElement, _EmptyQueryStrategy, _emptyQueryStrategy, InlineQueryStrategy, DynamicQueryStrategy, ElementDirectiveInlineStrategy, ElementDirectiveDynamicStrategy, ProtoQueryRef, QueryRef, _ComponentViewChangeDetectorRef;
    function setProvidersVisibility(providers, visibility, result) {
        for (var i = 0; i < providers.length; i++) {
            result.set(providers[i].key.id, visibility);
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
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (provider_1_1) {
                provider_1 = provider_1_1;
                provider_2 = provider_1_1;
            },
            function (injector_1_1) {
                injector_1 = injector_1_1;
            },
            function (di_2_1) {
                di_2 = di_2_1;
            },
            function (view_type_1_1) {
                view_type_1 = view_type_1_1;
            },
            function (element_ref_1_1) {
                element_ref_1 = element_ref_1_1;
                element_ref_2 = element_ref_1_1;
            },
            function (view_container_ref_1_1) {
                view_container_ref_1 = view_container_ref_1_1;
                view_container_ref_2 = view_container_ref_1_1;
            },
            function (api_1_1) {
                api_1 = api_1_1;
            },
            function (template_ref_1_1) {
                template_ref_1 = template_ref_1_1;
            },
            function (directives_1_1) {
                directives_1 = directives_1_1;
            },
            function (change_detection_1_1) {
                change_detection_1 = change_detection_1_1;
            },
            function (query_list_1_1) {
                query_list_1 = query_list_1_1;
            },
            function (reflection_1_1) {
                reflection_1 = reflection_1_1;
            },
            function (pipe_provider_1_1) {
                pipe_provider_1 = pipe_provider_1_1;
            }],
        execute: function() {
            StaticKeys = (function () {
                function StaticKeys() {
                    this.templateRefId = di_1.Key.get(template_ref_1.TemplateRef).id;
                    this.viewContainerId = di_1.Key.get(view_container_ref_1.ViewContainerRef).id;
                    this.changeDetectorRefId = di_1.Key.get(change_detection_1.ChangeDetectorRef).id;
                    this.elementRefId = di_1.Key.get(element_ref_2.ElementRef).id;
                    this.rendererId = di_1.Key.get(api_1.Renderer).id;
                }
                StaticKeys.instance = function () {
                    if (lang_1.isBlank(_staticKeys))
                        _staticKeys = new StaticKeys();
                    return _staticKeys;
                };
                return StaticKeys;
            }());
            exports_1("StaticKeys", StaticKeys);
            DirectiveDependency = (function (_super) {
                __extends(DirectiveDependency, _super);
                function DirectiveDependency(key, optional, lowerBoundVisibility, upperBoundVisibility, properties, attributeName, queryDecorator) {
                    _super.call(this, key, optional, lowerBoundVisibility, upperBoundVisibility, properties);
                    this.attributeName = attributeName;
                    this.queryDecorator = queryDecorator;
                    this._verify();
                }
                /** @internal */
                DirectiveDependency.prototype._verify = function () {
                    var count = 0;
                    if (lang_1.isPresent(this.queryDecorator))
                        count++;
                    if (lang_1.isPresent(this.attributeName))
                        count++;
                    if (count > 1)
                        throw new exceptions_1.BaseException('A directive injectable can contain only one of the following @Attribute or @Query.');
                };
                DirectiveDependency.createFrom = function (d) {
                    return new DirectiveDependency(d.key, d.optional, d.lowerBoundVisibility, d.upperBoundVisibility, d.properties, DirectiveDependency._attributeName(d.properties), DirectiveDependency._query(d.properties));
                };
                /** @internal */
                DirectiveDependency._attributeName = function (properties) {
                    var p = properties.find(function (p) { return p instanceof di_2.AttributeMetadata; });
                    return lang_1.isPresent(p) ? p.attributeName : null;
                };
                /** @internal */
                DirectiveDependency._query = function (properties) {
                    return properties.find(function (p) { return p instanceof di_2.QueryMetadata; });
                };
                return DirectiveDependency;
            }(di_1.Dependency));
            exports_1("DirectiveDependency", DirectiveDependency);
            DirectiveProvider = (function (_super) {
                __extends(DirectiveProvider, _super);
                function DirectiveProvider(key, factory, deps, isComponent, providers, viewProviders, queries) {
                    _super.call(this, key, [new provider_2.ResolvedFactory(factory, deps)], false);
                    this.isComponent = isComponent;
                    this.providers = providers;
                    this.viewProviders = viewProviders;
                    this.queries = queries;
                }
                Object.defineProperty(DirectiveProvider.prototype, "displayName", {
                    get: function () { return this.key.displayName; },
                    enumerable: true,
                    configurable: true
                });
                DirectiveProvider.createFromType = function (type, meta) {
                    var provider = new di_1.Provider(type, { useClass: type });
                    if (lang_1.isBlank(meta)) {
                        meta = new directives_1.DirectiveMetadata();
                    }
                    var rb = provider_2.resolveProvider(provider);
                    var rf = rb.resolvedFactories[0];
                    var deps = rf.dependencies.map(DirectiveDependency.createFrom);
                    var isComponent = meta instanceof directives_1.ComponentMetadata;
                    var resolvedProviders = lang_1.isPresent(meta.providers) ? di_1.Injector.resolve(meta.providers) : null;
                    var resolvedViewProviders = meta instanceof directives_1.ComponentMetadata && lang_1.isPresent(meta.viewProviders) ?
                        di_1.Injector.resolve(meta.viewProviders) :
                        null;
                    var queries = [];
                    if (lang_1.isPresent(meta.queries)) {
                        collection_1.StringMapWrapper.forEach(meta.queries, function (meta, fieldName) {
                            var setter = reflection_1.reflector.setter(fieldName);
                            queries.push(new QueryMetadataWithSetter(setter, meta));
                        });
                    }
                    // queries passed into the constructor.
                    // TODO: remove this after constructor queries are no longer supported
                    deps.forEach(function (d) {
                        if (lang_1.isPresent(d.queryDecorator)) {
                            queries.push(new QueryMetadataWithSetter(null, d.queryDecorator));
                        }
                    });
                    return new DirectiveProvider(rb.key, rf.factory, deps, isComponent, resolvedProviders, resolvedViewProviders, queries);
                };
                return DirectiveProvider;
            }(provider_2.ResolvedProvider_));
            exports_1("DirectiveProvider", DirectiveProvider);
            QueryMetadataWithSetter = (function () {
                function QueryMetadataWithSetter(setter, metadata) {
                    this.setter = setter;
                    this.metadata = metadata;
                }
                return QueryMetadataWithSetter;
            }());
            exports_1("QueryMetadataWithSetter", QueryMetadataWithSetter);
            AppProtoElement = (function () {
                function AppProtoElement(firstProviderIsComponent, index, attributes, pwvs, protoQueryRefs, directiveVariableBindings) {
                    this.firstProviderIsComponent = firstProviderIsComponent;
                    this.index = index;
                    this.attributes = attributes;
                    this.protoQueryRefs = protoQueryRefs;
                    this.directiveVariableBindings = directiveVariableBindings;
                    var length = pwvs.length;
                    if (length > 0) {
                        this.protoInjector = new injector_1.ProtoInjector(pwvs);
                    }
                    else {
                        this.protoInjector = null;
                        this.protoQueryRefs = [];
                    }
                }
                AppProtoElement.create = function (metadataCache, index, attributes, directiveTypes, directiveVariableBindings) {
                    var componentDirProvider = null;
                    var mergedProvidersMap = new Map();
                    var providerVisibilityMap = new Map();
                    var providers = collection_1.ListWrapper.createGrowableSize(directiveTypes.length);
                    var protoQueryRefs = [];
                    for (var i = 0; i < directiveTypes.length; i++) {
                        var dirProvider = metadataCache.getResolvedDirectiveMetadata(directiveTypes[i]);
                        providers[i] = new injector_1.ProviderWithVisibility(dirProvider, dirProvider.isComponent ? injector_1.Visibility.PublicAndPrivate : injector_1.Visibility.Public);
                        if (dirProvider.isComponent) {
                            componentDirProvider = dirProvider;
                        }
                        else {
                            if (lang_1.isPresent(dirProvider.providers)) {
                                provider_1.mergeResolvedProviders(dirProvider.providers, mergedProvidersMap);
                                setProvidersVisibility(dirProvider.providers, injector_1.Visibility.Public, providerVisibilityMap);
                            }
                        }
                        if (lang_1.isPresent(dirProvider.viewProviders)) {
                            provider_1.mergeResolvedProviders(dirProvider.viewProviders, mergedProvidersMap);
                            setProvidersVisibility(dirProvider.viewProviders, injector_1.Visibility.Private, providerVisibilityMap);
                        }
                        for (var queryIdx = 0; queryIdx < dirProvider.queries.length; queryIdx++) {
                            var q = dirProvider.queries[queryIdx];
                            protoQueryRefs.push(new ProtoQueryRef(i, q.setter, q.metadata));
                        }
                    }
                    if (lang_1.isPresent(componentDirProvider) && lang_1.isPresent(componentDirProvider.providers)) {
                        // directive providers need to be prioritized over component providers
                        provider_1.mergeResolvedProviders(componentDirProvider.providers, mergedProvidersMap);
                        setProvidersVisibility(componentDirProvider.providers, injector_1.Visibility.Public, providerVisibilityMap);
                    }
                    mergedProvidersMap.forEach(function (provider, _) {
                        providers.push(new injector_1.ProviderWithVisibility(provider, providerVisibilityMap.get(provider.key.id)));
                    });
                    return new AppProtoElement(lang_1.isPresent(componentDirProvider), index, attributes, providers, protoQueryRefs, directiveVariableBindings);
                };
                AppProtoElement.prototype.getProviderAtIndex = function (index) { return this.protoInjector.getProviderAtIndex(index); };
                return AppProtoElement;
            }());
            exports_1("AppProtoElement", AppProtoElement);
            _Context = (function () {
                function _Context(element, componentElement, injector) {
                    this.element = element;
                    this.componentElement = componentElement;
                    this.injector = injector;
                }
                return _Context;
            }());
            InjectorWithHostBoundary = (function () {
                function InjectorWithHostBoundary(injector, hostInjectorBoundary) {
                    this.injector = injector;
                    this.hostInjectorBoundary = hostInjectorBoundary;
                }
                return InjectorWithHostBoundary;
            }());
            exports_1("InjectorWithHostBoundary", InjectorWithHostBoundary);
            AppElement = (function () {
                function AppElement(proto, parentView, parent, nativeElement, embeddedViewFactory) {
                    var _this = this;
                    this.proto = proto;
                    this.parentView = parentView;
                    this.parent = parent;
                    this.nativeElement = nativeElement;
                    this.embeddedViewFactory = embeddedViewFactory;
                    this.nestedViews = null;
                    this.componentView = null;
                    this.ref = new element_ref_1.ElementRef_(this);
                    var parentInjector = lang_1.isPresent(parent) ? parent._injector : parentView.parentInjector;
                    if (lang_1.isPresent(this.proto.protoInjector)) {
                        var isBoundary;
                        if (lang_1.isPresent(parent) && lang_1.isPresent(parent.proto.protoInjector)) {
                            isBoundary = false;
                        }
                        else {
                            isBoundary = parentView.hostInjectorBoundary;
                        }
                        this._queryStrategy = this._buildQueryStrategy();
                        this._injector = new di_1.Injector(this.proto.protoInjector, parentInjector, isBoundary, this, function () { return _this._debugContext(); });
                        // we couple ourselves to the injector strategy to avoid polymorphic calls
                        var injectorStrategy = this._injector.internalStrategy;
                        this._strategy = injectorStrategy instanceof injector_1.InjectorInlineStrategy ?
                            new ElementDirectiveInlineStrategy(injectorStrategy, this) :
                            new ElementDirectiveDynamicStrategy(injectorStrategy, this);
                        this._strategy.init();
                    }
                    else {
                        this._queryStrategy = null;
                        this._injector = parentInjector;
                        this._strategy = null;
                    }
                }
                AppElement.getViewParentInjector = function (parentViewType, containerAppElement, imperativelyCreatedProviders, rootInjector) {
                    var parentInjector;
                    var hostInjectorBoundary;
                    switch (parentViewType) {
                        case view_type_1.ViewType.COMPONENT:
                            parentInjector = containerAppElement._injector;
                            hostInjectorBoundary = true;
                            break;
                        case view_type_1.ViewType.EMBEDDED:
                            parentInjector = lang_1.isPresent(containerAppElement.proto.protoInjector) ?
                                containerAppElement._injector.parent :
                                containerAppElement._injector;
                            hostInjectorBoundary = containerAppElement._injector.hostBoundary;
                            break;
                        case view_type_1.ViewType.HOST:
                            if (lang_1.isPresent(containerAppElement)) {
                                // host view is attached to a container
                                parentInjector = lang_1.isPresent(containerAppElement.proto.protoInjector) ?
                                    containerAppElement._injector.parent :
                                    containerAppElement._injector;
                                if (lang_1.isPresent(imperativelyCreatedProviders)) {
                                    var imperativeProvidersWithVisibility = imperativelyCreatedProviders.map(function (p) { return new injector_1.ProviderWithVisibility(p, injector_1.Visibility.Public); });
                                    // The imperative injector is similar to having an element between
                                    // the dynamic-loaded component and its parent => no boundary between
                                    // the component and imperativelyCreatedInjector.
                                    parentInjector = new di_1.Injector(new injector_1.ProtoInjector(imperativeProvidersWithVisibility), parentInjector, true, null, null);
                                    hostInjectorBoundary = false;
                                }
                                else {
                                    hostInjectorBoundary = containerAppElement._injector.hostBoundary;
                                }
                            }
                            else {
                                // bootstrap
                                parentInjector = rootInjector;
                                hostInjectorBoundary = true;
                            }
                            break;
                    }
                    return new InjectorWithHostBoundary(parentInjector, hostInjectorBoundary);
                };
                AppElement.prototype.attachComponentView = function (componentView) { this.componentView = componentView; };
                AppElement.prototype._debugContext = function () {
                    var c = this.parentView.getDebugContext(this, null, null);
                    return lang_1.isPresent(c) ? new _Context(c.element, c.componentElement, c.injector) : null;
                };
                AppElement.prototype.hasVariableBinding = function (name) {
                    var vb = this.proto.directiveVariableBindings;
                    return lang_1.isPresent(vb) && collection_1.StringMapWrapper.contains(vb, name);
                };
                AppElement.prototype.getVariableBinding = function (name) {
                    var index = this.proto.directiveVariableBindings[name];
                    return lang_1.isPresent(index) ? this.getDirectiveAtIndex(index) : this.getElementRef();
                };
                AppElement.prototype.get = function (token) { return this._injector.get(token); };
                AppElement.prototype.hasDirective = function (type) { return lang_1.isPresent(this._injector.getOptional(type)); };
                AppElement.prototype.getComponent = function () { return lang_1.isPresent(this._strategy) ? this._strategy.getComponent() : null; };
                AppElement.prototype.getInjector = function () { return this._injector; };
                AppElement.prototype.getElementRef = function () { return this.ref; };
                AppElement.prototype.getViewContainerRef = function () { return new view_container_ref_2.ViewContainerRef_(this); };
                AppElement.prototype.getTemplateRef = function () {
                    if (lang_1.isPresent(this.embeddedViewFactory)) {
                        return new template_ref_1.TemplateRef_(this.ref);
                    }
                    return null;
                };
                AppElement.prototype.getDependency = function (injector, provider, dep) {
                    if (provider instanceof DirectiveProvider) {
                        var dirDep = dep;
                        if (lang_1.isPresent(dirDep.attributeName))
                            return this._buildAttribute(dirDep);
                        if (lang_1.isPresent(dirDep.queryDecorator))
                            return this._queryStrategy.findQuery(dirDep.queryDecorator).list;
                        if (dirDep.key.id === StaticKeys.instance().changeDetectorRefId) {
                            // We provide the component's view change detector to components and
                            // the surrounding component's change detector to directives.
                            if (this.proto.firstProviderIsComponent) {
                                // Note: The component view is not yet created when
                                // this method is called!
                                return new _ComponentViewChangeDetectorRef(this);
                            }
                            else {
                                return this.parentView.changeDetector.ref;
                            }
                        }
                        if (dirDep.key.id === StaticKeys.instance().elementRefId) {
                            return this.getElementRef();
                        }
                        if (dirDep.key.id === StaticKeys.instance().viewContainerId) {
                            return this.getViewContainerRef();
                        }
                        if (dirDep.key.id === StaticKeys.instance().templateRefId) {
                            var tr = this.getTemplateRef();
                            if (lang_1.isBlank(tr) && !dirDep.optional) {
                                throw new di_1.NoProviderError(null, dirDep.key);
                            }
                            return tr;
                        }
                        if (dirDep.key.id === StaticKeys.instance().rendererId) {
                            return this.parentView.renderer;
                        }
                    }
                    else if (provider instanceof pipe_provider_1.PipeProvider) {
                        if (dep.key.id === StaticKeys.instance().changeDetectorRefId) {
                            // We provide the component's view change detector to components and
                            // the surrounding component's change detector to directives.
                            if (this.proto.firstProviderIsComponent) {
                                // Note: The component view is not yet created when
                                // this method is called!
                                return new _ComponentViewChangeDetectorRef(this);
                            }
                            else {
                                return this.parentView.changeDetector;
                            }
                        }
                    }
                    return injector_1.UNDEFINED;
                };
                AppElement.prototype._buildAttribute = function (dep) {
                    var attributes = this.proto.attributes;
                    if (lang_1.isPresent(attributes) && collection_1.StringMapWrapper.contains(attributes, dep.attributeName)) {
                        return attributes[dep.attributeName];
                    }
                    else {
                        return null;
                    }
                };
                AppElement.prototype.addDirectivesMatchingQuery = function (query, list) {
                    var templateRef = this.getTemplateRef();
                    if (query.selector === template_ref_1.TemplateRef && lang_1.isPresent(templateRef)) {
                        list.push(templateRef);
                    }
                    if (this._strategy != null) {
                        this._strategy.addDirectivesMatchingQuery(query, list);
                    }
                };
                AppElement.prototype._buildQueryStrategy = function () {
                    if (this.proto.protoQueryRefs.length === 0) {
                        return _emptyQueryStrategy;
                    }
                    else if (this.proto.protoQueryRefs.length <=
                        InlineQueryStrategy.NUMBER_OF_SUPPORTED_QUERIES) {
                        return new InlineQueryStrategy(this);
                    }
                    else {
                        return new DynamicQueryStrategy(this);
                    }
                };
                AppElement.prototype.getDirectiveAtIndex = function (index) { return this._injector.getAt(index); };
                AppElement.prototype.ngAfterViewChecked = function () {
                    if (lang_1.isPresent(this._queryStrategy))
                        this._queryStrategy.updateViewQueries();
                };
                AppElement.prototype.ngAfterContentChecked = function () {
                    if (lang_1.isPresent(this._queryStrategy))
                        this._queryStrategy.updateContentQueries();
                };
                AppElement.prototype.traverseAndSetQueriesAsDirty = function () {
                    var inj = this;
                    while (lang_1.isPresent(inj)) {
                        inj._setQueriesAsDirty();
                        if (lang_1.isBlank(inj.parent) && inj.parentView.proto.type === view_type_1.ViewType.EMBEDDED) {
                            inj = inj.parentView.containerAppElement;
                        }
                        else {
                            inj = inj.parent;
                        }
                    }
                };
                AppElement.prototype._setQueriesAsDirty = function () {
                    if (lang_1.isPresent(this._queryStrategy)) {
                        this._queryStrategy.setContentQueriesAsDirty();
                    }
                    if (this.parentView.proto.type === view_type_1.ViewType.COMPONENT) {
                        this.parentView.containerAppElement._queryStrategy.setViewQueriesAsDirty();
                    }
                };
                return AppElement;
            }());
            exports_1("AppElement", AppElement);
            _EmptyQueryStrategy = (function () {
                function _EmptyQueryStrategy() {
                }
                _EmptyQueryStrategy.prototype.setContentQueriesAsDirty = function () { };
                _EmptyQueryStrategy.prototype.setViewQueriesAsDirty = function () { };
                _EmptyQueryStrategy.prototype.updateContentQueries = function () { };
                _EmptyQueryStrategy.prototype.updateViewQueries = function () { };
                _EmptyQueryStrategy.prototype.findQuery = function (query) {
                    throw new exceptions_1.BaseException("Cannot find query for directive " + query + ".");
                };
                return _EmptyQueryStrategy;
            }());
            _emptyQueryStrategy = new _EmptyQueryStrategy();
            InlineQueryStrategy = (function () {
                function InlineQueryStrategy(ei) {
                    var protoRefs = ei.proto.protoQueryRefs;
                    if (protoRefs.length > 0)
                        this.query0 = new QueryRef(protoRefs[0], ei);
                    if (protoRefs.length > 1)
                        this.query1 = new QueryRef(protoRefs[1], ei);
                    if (protoRefs.length > 2)
                        this.query2 = new QueryRef(protoRefs[2], ei);
                }
                InlineQueryStrategy.prototype.setContentQueriesAsDirty = function () {
                    if (lang_1.isPresent(this.query0) && !this.query0.isViewQuery)
                        this.query0.dirty = true;
                    if (lang_1.isPresent(this.query1) && !this.query1.isViewQuery)
                        this.query1.dirty = true;
                    if (lang_1.isPresent(this.query2) && !this.query2.isViewQuery)
                        this.query2.dirty = true;
                };
                InlineQueryStrategy.prototype.setViewQueriesAsDirty = function () {
                    if (lang_1.isPresent(this.query0) && this.query0.isViewQuery)
                        this.query0.dirty = true;
                    if (lang_1.isPresent(this.query1) && this.query1.isViewQuery)
                        this.query1.dirty = true;
                    if (lang_1.isPresent(this.query2) && this.query2.isViewQuery)
                        this.query2.dirty = true;
                };
                InlineQueryStrategy.prototype.updateContentQueries = function () {
                    if (lang_1.isPresent(this.query0) && !this.query0.isViewQuery) {
                        this.query0.update();
                    }
                    if (lang_1.isPresent(this.query1) && !this.query1.isViewQuery) {
                        this.query1.update();
                    }
                    if (lang_1.isPresent(this.query2) && !this.query2.isViewQuery) {
                        this.query2.update();
                    }
                };
                InlineQueryStrategy.prototype.updateViewQueries = function () {
                    if (lang_1.isPresent(this.query0) && this.query0.isViewQuery) {
                        this.query0.update();
                    }
                    if (lang_1.isPresent(this.query1) && this.query1.isViewQuery) {
                        this.query1.update();
                    }
                    if (lang_1.isPresent(this.query2) && this.query2.isViewQuery) {
                        this.query2.update();
                    }
                };
                InlineQueryStrategy.prototype.findQuery = function (query) {
                    if (lang_1.isPresent(this.query0) && this.query0.protoQueryRef.query === query) {
                        return this.query0;
                    }
                    if (lang_1.isPresent(this.query1) && this.query1.protoQueryRef.query === query) {
                        return this.query1;
                    }
                    if (lang_1.isPresent(this.query2) && this.query2.protoQueryRef.query === query) {
                        return this.query2;
                    }
                    throw new exceptions_1.BaseException("Cannot find query for directive " + query + ".");
                };
                InlineQueryStrategy.NUMBER_OF_SUPPORTED_QUERIES = 3;
                return InlineQueryStrategy;
            }());
            DynamicQueryStrategy = (function () {
                function DynamicQueryStrategy(ei) {
                    this.queries = ei.proto.protoQueryRefs.map(function (p) { return new QueryRef(p, ei); });
                }
                DynamicQueryStrategy.prototype.setContentQueriesAsDirty = function () {
                    for (var i = 0; i < this.queries.length; ++i) {
                        var q = this.queries[i];
                        if (!q.isViewQuery)
                            q.dirty = true;
                    }
                };
                DynamicQueryStrategy.prototype.setViewQueriesAsDirty = function () {
                    for (var i = 0; i < this.queries.length; ++i) {
                        var q = this.queries[i];
                        if (q.isViewQuery)
                            q.dirty = true;
                    }
                };
                DynamicQueryStrategy.prototype.updateContentQueries = function () {
                    for (var i = 0; i < this.queries.length; ++i) {
                        var q = this.queries[i];
                        if (!q.isViewQuery) {
                            q.update();
                        }
                    }
                };
                DynamicQueryStrategy.prototype.updateViewQueries = function () {
                    for (var i = 0; i < this.queries.length; ++i) {
                        var q = this.queries[i];
                        if (q.isViewQuery) {
                            q.update();
                        }
                    }
                };
                DynamicQueryStrategy.prototype.findQuery = function (query) {
                    for (var i = 0; i < this.queries.length; ++i) {
                        var q = this.queries[i];
                        if (q.protoQueryRef.query === query) {
                            return q;
                        }
                    }
                    throw new exceptions_1.BaseException("Cannot find query for directive " + query + ".");
                };
                return DynamicQueryStrategy;
            }());
            /**
             * Strategy used by the `ElementInjector` when the number of providers is 10 or less.
             * In such a case, inlining fields is beneficial for performances.
             */
            ElementDirectiveInlineStrategy = (function () {
                function ElementDirectiveInlineStrategy(injectorStrategy, _ei) {
                    this.injectorStrategy = injectorStrategy;
                    this._ei = _ei;
                }
                ElementDirectiveInlineStrategy.prototype.init = function () {
                    var i = this.injectorStrategy;
                    var p = i.protoStrategy;
                    i.resetConstructionCounter();
                    if (p.provider0 instanceof DirectiveProvider && lang_1.isPresent(p.keyId0) && i.obj0 === injector_1.UNDEFINED)
                        i.obj0 = i.instantiateProvider(p.provider0, p.visibility0);
                    if (p.provider1 instanceof DirectiveProvider && lang_1.isPresent(p.keyId1) && i.obj1 === injector_1.UNDEFINED)
                        i.obj1 = i.instantiateProvider(p.provider1, p.visibility1);
                    if (p.provider2 instanceof DirectiveProvider && lang_1.isPresent(p.keyId2) && i.obj2 === injector_1.UNDEFINED)
                        i.obj2 = i.instantiateProvider(p.provider2, p.visibility2);
                    if (p.provider3 instanceof DirectiveProvider && lang_1.isPresent(p.keyId3) && i.obj3 === injector_1.UNDEFINED)
                        i.obj3 = i.instantiateProvider(p.provider3, p.visibility3);
                    if (p.provider4 instanceof DirectiveProvider && lang_1.isPresent(p.keyId4) && i.obj4 === injector_1.UNDEFINED)
                        i.obj4 = i.instantiateProvider(p.provider4, p.visibility4);
                    if (p.provider5 instanceof DirectiveProvider && lang_1.isPresent(p.keyId5) && i.obj5 === injector_1.UNDEFINED)
                        i.obj5 = i.instantiateProvider(p.provider5, p.visibility5);
                    if (p.provider6 instanceof DirectiveProvider && lang_1.isPresent(p.keyId6) && i.obj6 === injector_1.UNDEFINED)
                        i.obj6 = i.instantiateProvider(p.provider6, p.visibility6);
                    if (p.provider7 instanceof DirectiveProvider && lang_1.isPresent(p.keyId7) && i.obj7 === injector_1.UNDEFINED)
                        i.obj7 = i.instantiateProvider(p.provider7, p.visibility7);
                    if (p.provider8 instanceof DirectiveProvider && lang_1.isPresent(p.keyId8) && i.obj8 === injector_1.UNDEFINED)
                        i.obj8 = i.instantiateProvider(p.provider8, p.visibility8);
                    if (p.provider9 instanceof DirectiveProvider && lang_1.isPresent(p.keyId9) && i.obj9 === injector_1.UNDEFINED)
                        i.obj9 = i.instantiateProvider(p.provider9, p.visibility9);
                };
                ElementDirectiveInlineStrategy.prototype.getComponent = function () { return this.injectorStrategy.obj0; };
                ElementDirectiveInlineStrategy.prototype.isComponentKey = function (key) {
                    return this._ei.proto.firstProviderIsComponent && lang_1.isPresent(key) &&
                        key.id === this.injectorStrategy.protoStrategy.keyId0;
                };
                ElementDirectiveInlineStrategy.prototype.addDirectivesMatchingQuery = function (query, list) {
                    var i = this.injectorStrategy;
                    var p = i.protoStrategy;
                    if (lang_1.isPresent(p.provider0) && p.provider0.key.token === query.selector) {
                        if (i.obj0 === injector_1.UNDEFINED)
                            i.obj0 = i.instantiateProvider(p.provider0, p.visibility0);
                        list.push(i.obj0);
                    }
                    if (lang_1.isPresent(p.provider1) && p.provider1.key.token === query.selector) {
                        if (i.obj1 === injector_1.UNDEFINED)
                            i.obj1 = i.instantiateProvider(p.provider1, p.visibility1);
                        list.push(i.obj1);
                    }
                    if (lang_1.isPresent(p.provider2) && p.provider2.key.token === query.selector) {
                        if (i.obj2 === injector_1.UNDEFINED)
                            i.obj2 = i.instantiateProvider(p.provider2, p.visibility2);
                        list.push(i.obj2);
                    }
                    if (lang_1.isPresent(p.provider3) && p.provider3.key.token === query.selector) {
                        if (i.obj3 === injector_1.UNDEFINED)
                            i.obj3 = i.instantiateProvider(p.provider3, p.visibility3);
                        list.push(i.obj3);
                    }
                    if (lang_1.isPresent(p.provider4) && p.provider4.key.token === query.selector) {
                        if (i.obj4 === injector_1.UNDEFINED)
                            i.obj4 = i.instantiateProvider(p.provider4, p.visibility4);
                        list.push(i.obj4);
                    }
                    if (lang_1.isPresent(p.provider5) && p.provider5.key.token === query.selector) {
                        if (i.obj5 === injector_1.UNDEFINED)
                            i.obj5 = i.instantiateProvider(p.provider5, p.visibility5);
                        list.push(i.obj5);
                    }
                    if (lang_1.isPresent(p.provider6) && p.provider6.key.token === query.selector) {
                        if (i.obj6 === injector_1.UNDEFINED)
                            i.obj6 = i.instantiateProvider(p.provider6, p.visibility6);
                        list.push(i.obj6);
                    }
                    if (lang_1.isPresent(p.provider7) && p.provider7.key.token === query.selector) {
                        if (i.obj7 === injector_1.UNDEFINED)
                            i.obj7 = i.instantiateProvider(p.provider7, p.visibility7);
                        list.push(i.obj7);
                    }
                    if (lang_1.isPresent(p.provider8) && p.provider8.key.token === query.selector) {
                        if (i.obj8 === injector_1.UNDEFINED)
                            i.obj8 = i.instantiateProvider(p.provider8, p.visibility8);
                        list.push(i.obj8);
                    }
                    if (lang_1.isPresent(p.provider9) && p.provider9.key.token === query.selector) {
                        if (i.obj9 === injector_1.UNDEFINED)
                            i.obj9 = i.instantiateProvider(p.provider9, p.visibility9);
                        list.push(i.obj9);
                    }
                };
                return ElementDirectiveInlineStrategy;
            }());
            /**
             * Strategy used by the `ElementInjector` when the number of bindings is 11 or more.
             * In such a case, there are too many fields to inline (see ElementInjectorInlineStrategy).
             */
            ElementDirectiveDynamicStrategy = (function () {
                function ElementDirectiveDynamicStrategy(injectorStrategy, _ei) {
                    this.injectorStrategy = injectorStrategy;
                    this._ei = _ei;
                }
                ElementDirectiveDynamicStrategy.prototype.init = function () {
                    var inj = this.injectorStrategy;
                    var p = inj.protoStrategy;
                    inj.resetConstructionCounter();
                    for (var i = 0; i < p.keyIds.length; i++) {
                        if (p.providers[i] instanceof DirectiveProvider && lang_1.isPresent(p.keyIds[i]) &&
                            inj.objs[i] === injector_1.UNDEFINED) {
                            inj.objs[i] = inj.instantiateProvider(p.providers[i], p.visibilities[i]);
                        }
                    }
                };
                ElementDirectiveDynamicStrategy.prototype.getComponent = function () { return this.injectorStrategy.objs[0]; };
                ElementDirectiveDynamicStrategy.prototype.isComponentKey = function (key) {
                    var p = this.injectorStrategy.protoStrategy;
                    return this._ei.proto.firstProviderIsComponent && lang_1.isPresent(key) && key.id === p.keyIds[0];
                };
                ElementDirectiveDynamicStrategy.prototype.addDirectivesMatchingQuery = function (query, list) {
                    var ist = this.injectorStrategy;
                    var p = ist.protoStrategy;
                    for (var i = 0; i < p.providers.length; i++) {
                        if (p.providers[i].key.token === query.selector) {
                            if (ist.objs[i] === injector_1.UNDEFINED) {
                                ist.objs[i] = ist.instantiateProvider(p.providers[i], p.visibilities[i]);
                            }
                            list.push(ist.objs[i]);
                        }
                    }
                };
                return ElementDirectiveDynamicStrategy;
            }());
            ProtoQueryRef = (function () {
                function ProtoQueryRef(dirIndex, setter, query) {
                    this.dirIndex = dirIndex;
                    this.setter = setter;
                    this.query = query;
                }
                Object.defineProperty(ProtoQueryRef.prototype, "usesPropertySyntax", {
                    get: function () { return lang_1.isPresent(this.setter); },
                    enumerable: true,
                    configurable: true
                });
                return ProtoQueryRef;
            }());
            exports_1("ProtoQueryRef", ProtoQueryRef);
            QueryRef = (function () {
                function QueryRef(protoQueryRef, originator) {
                    this.protoQueryRef = protoQueryRef;
                    this.originator = originator;
                    this.list = new query_list_1.QueryList();
                    this.dirty = true;
                }
                Object.defineProperty(QueryRef.prototype, "isViewQuery", {
                    get: function () { return this.protoQueryRef.query.isViewQuery; },
                    enumerable: true,
                    configurable: true
                });
                QueryRef.prototype.update = function () {
                    if (!this.dirty)
                        return;
                    this._update();
                    this.dirty = false;
                    // TODO delete the check once only field queries are supported
                    if (this.protoQueryRef.usesPropertySyntax) {
                        var dir = this.originator.getDirectiveAtIndex(this.protoQueryRef.dirIndex);
                        if (this.protoQueryRef.query.first) {
                            this.protoQueryRef.setter(dir, this.list.length > 0 ? this.list.first : null);
                        }
                        else {
                            this.protoQueryRef.setter(dir, this.list);
                        }
                    }
                    this.list.notifyOnChanges();
                };
                QueryRef.prototype._update = function () {
                    var aggregator = [];
                    if (this.protoQueryRef.query.isViewQuery) {
                        // intentionally skipping originator for view queries.
                        var nestedView = this.originator.componentView;
                        if (lang_1.isPresent(nestedView))
                            this._visitView(nestedView, aggregator);
                    }
                    else {
                        this._visit(this.originator, aggregator);
                    }
                    this.list.reset(aggregator);
                };
                ;
                QueryRef.prototype._visit = function (inj, aggregator) {
                    var view = inj.parentView;
                    var startIdx = inj.proto.index;
                    for (var i = startIdx; i < view.appElements.length; i++) {
                        var curInj = view.appElements[i];
                        // The first injector after inj, that is outside the subtree rooted at
                        // inj has to have a null parent or a parent that is an ancestor of inj.
                        if (i > startIdx && (lang_1.isBlank(curInj.parent) || curInj.parent.proto.index < startIdx)) {
                            break;
                        }
                        if (!this.protoQueryRef.query.descendants &&
                            !(curInj.parent == this.originator || curInj == this.originator))
                            continue;
                        // We visit the view container(VC) views right after the injector that contains
                        // the VC. Theoretically, that might not be the right order if there are
                        // child injectors of said injector. Not clear whether if such case can
                        // even be constructed with the current apis.
                        this._visitInjector(curInj, aggregator);
                        this._visitViewContainerViews(curInj.nestedViews, aggregator);
                    }
                };
                QueryRef.prototype._visitInjector = function (inj, aggregator) {
                    if (this.protoQueryRef.query.isVarBindingQuery) {
                        this._aggregateVariableBinding(inj, aggregator);
                    }
                    else {
                        this._aggregateDirective(inj, aggregator);
                    }
                };
                QueryRef.prototype._visitViewContainerViews = function (views, aggregator) {
                    if (lang_1.isPresent(views)) {
                        for (var j = 0; j < views.length; j++) {
                            this._visitView(views[j], aggregator);
                        }
                    }
                };
                QueryRef.prototype._visitView = function (view, aggregator) {
                    for (var i = 0; i < view.appElements.length; i++) {
                        var inj = view.appElements[i];
                        this._visitInjector(inj, aggregator);
                        this._visitViewContainerViews(inj.nestedViews, aggregator);
                    }
                };
                QueryRef.prototype._aggregateVariableBinding = function (inj, aggregator) {
                    var vb = this.protoQueryRef.query.varBindings;
                    for (var i = 0; i < vb.length; ++i) {
                        if (inj.hasVariableBinding(vb[i])) {
                            aggregator.push(inj.getVariableBinding(vb[i]));
                        }
                    }
                };
                QueryRef.prototype._aggregateDirective = function (inj, aggregator) {
                    inj.addDirectivesMatchingQuery(this.protoQueryRef.query, aggregator);
                };
                return QueryRef;
            }());
            exports_1("QueryRef", QueryRef);
            _ComponentViewChangeDetectorRef = (function (_super) {
                __extends(_ComponentViewChangeDetectorRef, _super);
                function _ComponentViewChangeDetectorRef(_appElement) {
                    _super.call(this);
                    this._appElement = _appElement;
                }
                _ComponentViewChangeDetectorRef.prototype.markForCheck = function () { this._appElement.componentView.changeDetector.ref.markForCheck(); };
                _ComponentViewChangeDetectorRef.prototype.detach = function () { this._appElement.componentView.changeDetector.ref.detach(); };
                _ComponentViewChangeDetectorRef.prototype.detectChanges = function () { this._appElement.componentView.changeDetector.ref.detectChanges(); };
                _ComponentViewChangeDetectorRef.prototype.checkNoChanges = function () { this._appElement.componentView.changeDetector.ref.checkNoChanges(); };
                _ComponentViewChangeDetectorRef.prototype.reattach = function () { this._appElement.componentView.changeDetector.ref.reattach(); };
                return _ComponentViewChangeDetectorRef;
            }(change_detection_1.ChangeDetectorRef));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvbGlua2VyL2VsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O1FBMkRJLFdBQVcscUtBMGJYLG1CQUFtQjtJQWpWdkIsZ0NBQWdDLFNBQTZCLEVBQUUsVUFBc0IsRUFDckQsTUFBK0I7UUFDN0QsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDMUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUM5QyxDQUFDO0lBQ0gsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQTVHRDtnQkFPRTtvQkFDRSxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQUcsQ0FBQyxHQUFHLENBQUMsMEJBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQkFDN0MsSUFBSSxDQUFDLGVBQWUsR0FBRyxRQUFHLENBQUMsR0FBRyxDQUFDLHFDQUFnQixDQUFDLENBQUMsRUFBRSxDQUFDO29CQUNwRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsUUFBRyxDQUFDLEdBQUcsQ0FBQyxvQ0FBaUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQkFDekQsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFHLENBQUMsR0FBRyxDQUFDLHdCQUFVLENBQUMsQ0FBQyxFQUFFLENBQUM7b0JBQzNDLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBRyxDQUFDLEdBQUcsQ0FBQyxjQUFRLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ3pDLENBQUM7Z0JBRU0sbUJBQVEsR0FBZjtvQkFDRSxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7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QU4sY0FBaUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzlFLHVEQUFhLEdBQWIsY0FBd0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzVGLHdEQUFjLEdBQWQsY0FBeUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzlGLGtEQUFRLEdBQVIsY0FBbUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BGLHNDQUFDO1lBQUQsQ0FSQSxBQVFDLENBUjZDLG9DQUFpQixHQVE5RCIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2xpbmtlci9lbGVtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgaXNQcmVzZW50LFxuICBpc0JsYW5rLFxuICBUeXBlLFxuICBzdHJpbmdpZnksXG4gIENPTlNUX0VYUFIsXG4gIFN0cmluZ1dyYXBwZXJcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7TGlzdFdyYXBwZXIsIE1hcFdyYXBwZXIsIFN0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge1xuICBJbmplY3RvcixcbiAgS2V5LFxuICBEZXBlbmRlbmN5LFxuICBwcm92aWRlLFxuICBQcm92aWRlcixcbiAgUmVzb2x2ZWRQcm92aWRlcixcbiAgTm9Qcm92aWRlckVycm9yLFxuICBBYnN0cmFjdFByb3ZpZGVyRXJyb3IsXG4gIEN5Y2xpY0RlcGVuZGVuY3lFcnJvcixcbiAgcmVzb2x2ZUZvcndhcmRSZWYsXG4gIEluamVjdGFibGVcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHttZXJnZVJlc29sdmVkUHJvdmlkZXJzfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaS9wcm92aWRlcic7XG5pbXBvcnQge1xuICBVTkRFRklORUQsXG4gIFByb3RvSW5qZWN0b3IsXG4gIFZpc2liaWxpdHksXG4gIEluamVjdG9ySW5saW5lU3RyYXRlZ3ksXG4gIEluamVjdG9yRHluYW1pY1N0cmF0ZWd5LFxuICBQcm92aWRlcldpdGhWaXNpYmlsaXR5LFxuICBEZXBlbmRlbmN5UHJvdmlkZXJcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGkvaW5qZWN0b3InO1xuaW1wb3J0IHtyZXNvbHZlUHJvdmlkZXIsIFJlc29sdmVkRmFjdG9yeSwgUmVzb2x2ZWRQcm92aWRlcl99IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpL3Byb3ZpZGVyJztcblxuaW1wb3J0IHtBdHRyaWJ1dGVNZXRhZGF0YSwgUXVlcnlNZXRhZGF0YX0gZnJvbSAnLi4vbWV0YWRhdGEvZGknO1xuXG5pbXBvcnQge0FwcFZpZXd9IGZyb20gJy4vdmlldyc7XG5pbXBvcnQge1ZpZXdUeXBlfSBmcm9tICcuL3ZpZXdfdHlwZSc7XG5pbXBvcnQge0VsZW1lbnRSZWZffSBmcm9tICcuL2VsZW1lbnRfcmVmJztcblxuaW1wb3J0IHtWaWV3Q29udGFpbmVyUmVmfSBmcm9tICcuL3ZpZXdfY29udGFpbmVyX3JlZic7XG5pbXBvcnQge0VsZW1lbnRSZWZ9IGZyb20gJy4vZWxlbWVudF9yZWYnO1xuaW1wb3J0IHtSZW5kZXJlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVuZGVyL2FwaSc7XG5pbXBvcnQge1RlbXBsYXRlUmVmLCBUZW1wbGF0ZVJlZl99IGZyb20gJy4vdGVtcGxhdGVfcmVmJztcbmltcG9ydCB7RGlyZWN0aXZlTWV0YWRhdGEsIENvbXBvbmVudE1ldGFkYXRhfSBmcm9tICcuLi9tZXRhZGF0YS9kaXJlY3RpdmVzJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yLFxuICBDaGFuZ2VEZXRlY3RvclJlZlxufSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2NoYW5nZV9kZXRlY3Rpb24nO1xuaW1wb3J0IHtRdWVyeUxpc3R9IGZyb20gJy4vcXVlcnlfbGlzdCc7XG5pbXBvcnQge3JlZmxlY3Rvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVmbGVjdGlvbi9yZWZsZWN0aW9uJztcbmltcG9ydCB7U2V0dGVyRm59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlZmxlY3Rpb24vdHlwZXMnO1xuaW1wb3J0IHtBZnRlclZpZXdDaGVja2VkfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvaW50ZXJmYWNlcyc7XG5pbXBvcnQge1BpcGVQcm92aWRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcGlwZXMvcGlwZV9wcm92aWRlcic7XG5cbmltcG9ydCB7Vmlld0NvbnRhaW5lclJlZl99IGZyb20gXCIuL3ZpZXdfY29udGFpbmVyX3JlZlwiO1xuaW1wb3J0IHtSZXNvbHZlZE1ldGFkYXRhQ2FjaGV9IGZyb20gJy4vcmVzb2x2ZWRfbWV0YWRhdGFfY2FjaGUnO1xuXG52YXIgX3N0YXRpY0tleXM7XG5cbmV4cG9ydCBjbGFzcyBTdGF0aWNLZXlzIHtcbiAgdGVtcGxhdGVSZWZJZDogbnVtYmVyO1xuICB2aWV3Q29udGFpbmVySWQ6IG51bWJlcjtcbiAgY2hhbmdlRGV0ZWN0b3JSZWZJZDogbnVtYmVyO1xuICBlbGVtZW50UmVmSWQ6IG51bWJlcjtcbiAgcmVuZGVyZXJJZDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudGVtcGxhdGVSZWZJZCA9IEtleS5nZXQoVGVtcGxhdGVSZWYpLmlkO1xuICAgIHRoaXMudmlld0NvbnRhaW5lcklkID0gS2V5LmdldChWaWV3Q29udGFpbmVyUmVmKS5pZDtcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmSWQgPSBLZXkuZ2V0KENoYW5nZURldGVjdG9yUmVmKS5pZDtcbiAgICB0aGlzLmVsZW1lbnRSZWZJZCA9IEtleS5nZXQoRWxlbWVudFJlZikuaWQ7XG4gICAgdGhpcy5yZW5kZXJlcklkID0gS2V5LmdldChSZW5kZXJlcikuaWQ7XG4gIH1cblxuICBzdGF0aWMgaW5zdGFuY2UoKTogU3RhdGljS2V5cyB7XG4gICAgaWYgKGlzQmxhbmsoX3N0YXRpY0tleXMpKSBfc3RhdGljS2V5cyA9IG5ldyBTdGF0aWNLZXlzKCk7XG4gICAgcmV0dXJuIF9zdGF0aWNLZXlzO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEaXJlY3RpdmVEZXBlbmRlbmN5IGV4dGVuZHMgRGVwZW5kZW5jeSB7XG4gIGNvbnN0cnVjdG9yKGtleTogS2V5LCBvcHRpb25hbDogYm9vbGVhbiwgbG93ZXJCb3VuZFZpc2liaWxpdHk6IE9iamVjdCxcbiAgICAgICAgICAgICAgdXBwZXJCb3VuZFZpc2liaWxpdHk6IE9iamVjdCwgcHJvcGVydGllczogYW55W10sIHB1YmxpYyBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgIHB1YmxpYyBxdWVyeURlY29yYXRvcjogUXVlcnlNZXRhZGF0YSkge1xuICAgIHN1cGVyKGtleSwgb3B0aW9uYWwsIGxvd2VyQm91bmRWaXNpYmlsaXR5LCB1cHBlckJvdW5kVmlzaWJpbGl0eSwgcHJvcGVydGllcyk7XG4gICAgdGhpcy5fdmVyaWZ5KCk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF92ZXJpZnkoKTogdm9pZCB7XG4gICAgdmFyIGNvdW50ID0gMDtcbiAgICBpZiAoaXNQcmVzZW50KHRoaXMucXVlcnlEZWNvcmF0b3IpKSBjb3VudCsrO1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5hdHRyaWJ1dGVOYW1lKSkgY291bnQrKztcbiAgICBpZiAoY291bnQgPiAxKVxuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgICAgJ0EgZGlyZWN0aXZlIGluamVjdGFibGUgY2FuIGNvbnRhaW4gb25seSBvbmUgb2YgdGhlIGZvbGxvd2luZyBAQXR0cmlidXRlIG9yIEBRdWVyeS4nKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVGcm9tKGQ6IERlcGVuZGVuY3kpOiBEaXJlY3RpdmVEZXBlbmRlbmN5IHtcbiAgICByZXR1cm4gbmV3IERpcmVjdGl2ZURlcGVuZGVuY3koXG4gICAgICAgIGQua2V5LCBkLm9wdGlvbmFsLCBkLmxvd2VyQm91bmRWaXNpYmlsaXR5LCBkLnVwcGVyQm91bmRWaXNpYmlsaXR5LCBkLnByb3BlcnRpZXMsXG4gICAgICAgIERpcmVjdGl2ZURlcGVuZGVuY3kuX2F0dHJpYnV0ZU5hbWUoZC5wcm9wZXJ0aWVzKSwgRGlyZWN0aXZlRGVwZW5kZW5jeS5fcXVlcnkoZC5wcm9wZXJ0aWVzKSk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIHN0YXRpYyBfYXR0cmlidXRlTmFtZShwcm9wZXJ0aWVzOiBhbnlbXSk6IHN0cmluZyB7XG4gICAgdmFyIHAgPSA8QXR0cmlidXRlTWV0YWRhdGE+cHJvcGVydGllcy5maW5kKHAgPT4gcCBpbnN0YW5jZW9mIEF0dHJpYnV0ZU1ldGFkYXRhKTtcbiAgICByZXR1cm4gaXNQcmVzZW50KHApID8gcC5hdHRyaWJ1dGVOYW1lIDogbnVsbDtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgc3RhdGljIF9xdWVyeShwcm9wZXJ0aWVzOiBhbnlbXSk6IFF1ZXJ5TWV0YWRhdGEge1xuICAgIHJldHVybiA8UXVlcnlNZXRhZGF0YT5wcm9wZXJ0aWVzLmZpbmQocCA9PiBwIGluc3RhbmNlb2YgUXVlcnlNZXRhZGF0YSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIERpcmVjdGl2ZVByb3ZpZGVyIGV4dGVuZHMgUmVzb2x2ZWRQcm92aWRlcl8ge1xuICBjb25zdHJ1Y3RvcihrZXk6IEtleSwgZmFjdG9yeTogRnVuY3Rpb24sIGRlcHM6IERlcGVuZGVuY3lbXSwgcHVibGljIGlzQ29tcG9uZW50OiBib29sZWFuLFxuICAgICAgICAgICAgICBwdWJsaWMgcHJvdmlkZXJzOiBSZXNvbHZlZFByb3ZpZGVyW10sIHB1YmxpYyB2aWV3UHJvdmlkZXJzOiBSZXNvbHZlZFByb3ZpZGVyW10sXG4gICAgICAgICAgICAgIHB1YmxpYyBxdWVyaWVzOiBRdWVyeU1ldGFkYXRhV2l0aFNldHRlcltdKSB7XG4gICAgc3VwZXIoa2V5LCBbbmV3IFJlc29sdmVkRmFjdG9yeShmYWN0b3J5LCBkZXBzKV0sIGZhbHNlKTtcbiAgfVxuXG4gIGdldCBkaXNwbGF5TmFtZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5rZXkuZGlzcGxheU5hbWU7IH1cblxuICBzdGF0aWMgY3JlYXRlRnJvbVR5cGUodHlwZTogVHlwZSwgbWV0YTogRGlyZWN0aXZlTWV0YWRhdGEpOiBEaXJlY3RpdmVQcm92aWRlciB7XG4gICAgdmFyIHByb3ZpZGVyID0gbmV3IFByb3ZpZGVyKHR5cGUsIHt1c2VDbGFzczogdHlwZX0pO1xuICAgIGlmIChpc0JsYW5rKG1ldGEpKSB7XG4gICAgICBtZXRhID0gbmV3IERpcmVjdGl2ZU1ldGFkYXRhKCk7XG4gICAgfVxuICAgIHZhciByYiA9IHJlc29sdmVQcm92aWRlcihwcm92aWRlcik7XG4gICAgdmFyIHJmID0gcmIucmVzb2x2ZWRGYWN0b3JpZXNbMF07XG4gICAgdmFyIGRlcHM6IERpcmVjdGl2ZURlcGVuZGVuY3lbXSA9IHJmLmRlcGVuZGVuY2llcy5tYXAoRGlyZWN0aXZlRGVwZW5kZW5jeS5jcmVhdGVGcm9tKTtcbiAgICB2YXIgaXNDb21wb25lbnQgPSBtZXRhIGluc3RhbmNlb2YgQ29tcG9uZW50TWV0YWRhdGE7XG4gICAgdmFyIHJlc29sdmVkUHJvdmlkZXJzID0gaXNQcmVzZW50KG1ldGEucHJvdmlkZXJzKSA/IEluamVjdG9yLnJlc29sdmUobWV0YS5wcm92aWRlcnMpIDogbnVsbDtcbiAgICB2YXIgcmVzb2x2ZWRWaWV3UHJvdmlkZXJzID0gbWV0YSBpbnN0YW5jZW9mIENvbXBvbmVudE1ldGFkYXRhICYmIGlzUHJlc2VudChtZXRhLnZpZXdQcm92aWRlcnMpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEluamVjdG9yLnJlc29sdmUobWV0YS52aWV3UHJvdmlkZXJzKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsO1xuICAgIHZhciBxdWVyaWVzID0gW107XG4gICAgaWYgKGlzUHJlc2VudChtZXRhLnF1ZXJpZXMpKSB7XG4gICAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2gobWV0YS5xdWVyaWVzLCAobWV0YSwgZmllbGROYW1lKSA9PiB7XG4gICAgICAgIHZhciBzZXR0ZXIgPSByZWZsZWN0b3Iuc2V0dGVyKGZpZWxkTmFtZSk7XG4gICAgICAgIHF1ZXJpZXMucHVzaChuZXcgUXVlcnlNZXRhZGF0YVdpdGhTZXR0ZXIoc2V0dGVyLCBtZXRhKSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLy8gcXVlcmllcyBwYXNzZWQgaW50byB0aGUgY29uc3RydWN0b3IuXG4gICAgLy8gVE9ETzogcmVtb3ZlIHRoaXMgYWZ0ZXIgY29uc3RydWN0b3IgcXVlcmllcyBhcmUgbm8gbG9uZ2VyIHN1cHBvcnRlZFxuICAgIGRlcHMuZm9yRWFjaChkID0+IHtcbiAgICAgIGlmIChpc1ByZXNlbnQoZC5xdWVyeURlY29yYXRvcikpIHtcbiAgICAgICAgcXVlcmllcy5wdXNoKG5ldyBRdWVyeU1ldGFkYXRhV2l0aFNldHRlcihudWxsLCBkLnF1ZXJ5RGVjb3JhdG9yKSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ldyBEaXJlY3RpdmVQcm92aWRlcihyYi5rZXksIHJmLmZhY3RvcnksIGRlcHMsIGlzQ29tcG9uZW50LCByZXNvbHZlZFByb3ZpZGVycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVkVmlld1Byb3ZpZGVycywgcXVlcmllcyk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFF1ZXJ5TWV0YWRhdGFXaXRoU2V0dGVyIHtcbiAgY29uc3RydWN0b3IocHVibGljIHNldHRlcjogU2V0dGVyRm4sIHB1YmxpYyBtZXRhZGF0YTogUXVlcnlNZXRhZGF0YSkge31cbn1cblxuXG5mdW5jdGlvbiBzZXRQcm92aWRlcnNWaXNpYmlsaXR5KHByb3ZpZGVyczogUmVzb2x2ZWRQcm92aWRlcltdLCB2aXNpYmlsaXR5OiBWaXNpYmlsaXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IE1hcDxudW1iZXIsIFZpc2liaWxpdHk+KSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvdmlkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgcmVzdWx0LnNldChwcm92aWRlcnNbaV0ua2V5LmlkLCB2aXNpYmlsaXR5KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQXBwUHJvdG9FbGVtZW50IHtcbiAgcHJvdG9JbmplY3RvcjogUHJvdG9JbmplY3RvcjtcblxuICBzdGF0aWMgY3JlYXRlKG1ldGFkYXRhQ2FjaGU6IFJlc29sdmVkTWV0YWRhdGFDYWNoZSwgaW5kZXg6IG51bWJlcixcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSwgZGlyZWN0aXZlVHlwZXM6IFR5cGVbXSxcbiAgICAgICAgICAgICAgICBkaXJlY3RpdmVWYXJpYWJsZUJpbmRpbmdzOiB7W2tleTogc3RyaW5nXTogbnVtYmVyfSk6IEFwcFByb3RvRWxlbWVudCB7XG4gICAgdmFyIGNvbXBvbmVudERpclByb3ZpZGVyID0gbnVsbDtcbiAgICB2YXIgbWVyZ2VkUHJvdmlkZXJzTWFwOiBNYXA8bnVtYmVyLCBSZXNvbHZlZFByb3ZpZGVyPiA9IG5ldyBNYXA8bnVtYmVyLCBSZXNvbHZlZFByb3ZpZGVyPigpO1xuICAgIHZhciBwcm92aWRlclZpc2liaWxpdHlNYXA6IE1hcDxudW1iZXIsIFZpc2liaWxpdHk+ID0gbmV3IE1hcDxudW1iZXIsIFZpc2liaWxpdHk+KCk7XG4gICAgdmFyIHByb3ZpZGVycyA9IExpc3RXcmFwcGVyLmNyZWF0ZUdyb3dhYmxlU2l6ZShkaXJlY3RpdmVUeXBlcy5sZW5ndGgpO1xuXG4gICAgdmFyIHByb3RvUXVlcnlSZWZzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaXJlY3RpdmVUeXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRpclByb3ZpZGVyID0gbWV0YWRhdGFDYWNoZS5nZXRSZXNvbHZlZERpcmVjdGl2ZU1ldGFkYXRhKGRpcmVjdGl2ZVR5cGVzW2ldKTtcbiAgICAgIHByb3ZpZGVyc1tpXSA9IG5ldyBQcm92aWRlcldpdGhWaXNpYmlsaXR5KFxuICAgICAgICAgIGRpclByb3ZpZGVyLCBkaXJQcm92aWRlci5pc0NvbXBvbmVudCA/IFZpc2liaWxpdHkuUHVibGljQW5kUHJpdmF0ZSA6IFZpc2liaWxpdHkuUHVibGljKTtcblxuICAgICAgaWYgKGRpclByb3ZpZGVyLmlzQ29tcG9uZW50KSB7XG4gICAgICAgIGNvbXBvbmVudERpclByb3ZpZGVyID0gZGlyUHJvdmlkZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaXNQcmVzZW50KGRpclByb3ZpZGVyLnByb3ZpZGVycykpIHtcbiAgICAgICAgICBtZXJnZVJlc29sdmVkUHJvdmlkZXJzKGRpclByb3ZpZGVyLnByb3ZpZGVycywgbWVyZ2VkUHJvdmlkZXJzTWFwKTtcbiAgICAgICAgICBzZXRQcm92aWRlcnNWaXNpYmlsaXR5KGRpclByb3ZpZGVyLnByb3ZpZGVycywgVmlzaWJpbGl0eS5QdWJsaWMsIHByb3ZpZGVyVmlzaWJpbGl0eU1hcCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpc1ByZXNlbnQoZGlyUHJvdmlkZXIudmlld1Byb3ZpZGVycykpIHtcbiAgICAgICAgbWVyZ2VSZXNvbHZlZFByb3ZpZGVycyhkaXJQcm92aWRlci52aWV3UHJvdmlkZXJzLCBtZXJnZWRQcm92aWRlcnNNYXApO1xuICAgICAgICBzZXRQcm92aWRlcnNWaXNpYmlsaXR5KGRpclByb3ZpZGVyLnZpZXdQcm92aWRlcnMsIFZpc2liaWxpdHkuUHJpdmF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlclZpc2liaWxpdHlNYXApO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgcXVlcnlJZHggPSAwOyBxdWVyeUlkeCA8IGRpclByb3ZpZGVyLnF1ZXJpZXMubGVuZ3RoOyBxdWVyeUlkeCsrKSB7XG4gICAgICAgIHZhciBxID0gZGlyUHJvdmlkZXIucXVlcmllc1txdWVyeUlkeF07XG4gICAgICAgIHByb3RvUXVlcnlSZWZzLnB1c2gobmV3IFByb3RvUXVlcnlSZWYoaSwgcS5zZXR0ZXIsIHEubWV0YWRhdGEpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzUHJlc2VudChjb21wb25lbnREaXJQcm92aWRlcikgJiYgaXNQcmVzZW50KGNvbXBvbmVudERpclByb3ZpZGVyLnByb3ZpZGVycykpIHtcbiAgICAgIC8vIGRpcmVjdGl2ZSBwcm92aWRlcnMgbmVlZCB0byBiZSBwcmlvcml0aXplZCBvdmVyIGNvbXBvbmVudCBwcm92aWRlcnNcbiAgICAgIG1lcmdlUmVzb2x2ZWRQcm92aWRlcnMoY29tcG9uZW50RGlyUHJvdmlkZXIucHJvdmlkZXJzLCBtZXJnZWRQcm92aWRlcnNNYXApO1xuICAgICAgc2V0UHJvdmlkZXJzVmlzaWJpbGl0eShjb21wb25lbnREaXJQcm92aWRlci5wcm92aWRlcnMsIFZpc2liaWxpdHkuUHVibGljLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlclZpc2liaWxpdHlNYXApO1xuICAgIH1cbiAgICBtZXJnZWRQcm92aWRlcnNNYXAuZm9yRWFjaCgocHJvdmlkZXIsIF8pID0+IHtcbiAgICAgIHByb3ZpZGVycy5wdXNoKFxuICAgICAgICAgIG5ldyBQcm92aWRlcldpdGhWaXNpYmlsaXR5KHByb3ZpZGVyLCBwcm92aWRlclZpc2liaWxpdHlNYXAuZ2V0KHByb3ZpZGVyLmtleS5pZCkpKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBuZXcgQXBwUHJvdG9FbGVtZW50KGlzUHJlc2VudChjb21wb25lbnREaXJQcm92aWRlciksIGluZGV4LCBhdHRyaWJ1dGVzLCBwcm92aWRlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdG9RdWVyeVJlZnMsIGRpcmVjdGl2ZVZhcmlhYmxlQmluZGluZ3MpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIGZpcnN0UHJvdmlkZXJJc0NvbXBvbmVudDogYm9vbGVhbiwgcHVibGljIGluZGV4OiBudW1iZXIsXG4gICAgICAgICAgICAgIHB1YmxpYyBhdHRyaWJ1dGVzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSwgcHd2czogUHJvdmlkZXJXaXRoVmlzaWJpbGl0eVtdLFxuICAgICAgICAgICAgICBwdWJsaWMgcHJvdG9RdWVyeVJlZnM6IFByb3RvUXVlcnlSZWZbXSxcbiAgICAgICAgICAgICAgcHVibGljIGRpcmVjdGl2ZVZhcmlhYmxlQmluZGluZ3M6IHtba2V5OiBzdHJpbmddOiBudW1iZXJ9KSB7XG4gICAgdmFyIGxlbmd0aCA9IHB3dnMubGVuZ3RoO1xuICAgIGlmIChsZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnByb3RvSW5qZWN0b3IgPSBuZXcgUHJvdG9JbmplY3Rvcihwd3ZzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm90b0luamVjdG9yID0gbnVsbDtcbiAgICAgIHRoaXMucHJvdG9RdWVyeVJlZnMgPSBbXTtcbiAgICB9XG4gIH1cblxuICBnZXRQcm92aWRlckF0SW5kZXgoaW5kZXg6IG51bWJlcik6IGFueSB7IHJldHVybiB0aGlzLnByb3RvSW5qZWN0b3IuZ2V0UHJvdmlkZXJBdEluZGV4KGluZGV4KTsgfVxufVxuXG5jbGFzcyBfQ29udGV4dCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBhbnksIHB1YmxpYyBjb21wb25lbnRFbGVtZW50OiBhbnksIHB1YmxpYyBpbmplY3RvcjogYW55KSB7fVxufVxuXG5leHBvcnQgY2xhc3MgSW5qZWN0b3JXaXRoSG9zdEJvdW5kYXJ5IHtcbiAgY29uc3RydWN0b3IocHVibGljIGluamVjdG9yOiBJbmplY3RvciwgcHVibGljIGhvc3RJbmplY3RvckJvdW5kYXJ5OiBib29sZWFuKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgQXBwRWxlbWVudCBpbXBsZW1lbnRzIERlcGVuZGVuY3lQcm92aWRlciwgRWxlbWVudFJlZiwgQWZ0ZXJWaWV3Q2hlY2tlZCB7XG4gIHN0YXRpYyBnZXRWaWV3UGFyZW50SW5qZWN0b3IocGFyZW50Vmlld1R5cGU6IFZpZXdUeXBlLCBjb250YWluZXJBcHBFbGVtZW50OiBBcHBFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltcGVyYXRpdmVseUNyZWF0ZWRQcm92aWRlcnM6IFJlc29sdmVkUHJvdmlkZXJbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb290SW5qZWN0b3I6IEluamVjdG9yKTogSW5qZWN0b3JXaXRoSG9zdEJvdW5kYXJ5IHtcbiAgICB2YXIgcGFyZW50SW5qZWN0b3I7XG4gICAgdmFyIGhvc3RJbmplY3RvckJvdW5kYXJ5O1xuICAgIHN3aXRjaCAocGFyZW50Vmlld1R5cGUpIHtcbiAgICAgIGNhc2UgVmlld1R5cGUuQ09NUE9ORU5UOlxuICAgICAgICBwYXJlbnRJbmplY3RvciA9IGNvbnRhaW5lckFwcEVsZW1lbnQuX2luamVjdG9yO1xuICAgICAgICBob3N0SW5qZWN0b3JCb3VuZGFyeSA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBWaWV3VHlwZS5FTUJFRERFRDpcbiAgICAgICAgcGFyZW50SW5qZWN0b3IgPSBpc1ByZXNlbnQoY29udGFpbmVyQXBwRWxlbWVudC5wcm90by5wcm90b0luamVjdG9yKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lckFwcEVsZW1lbnQuX2luamVjdG9yLnBhcmVudCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lckFwcEVsZW1lbnQuX2luamVjdG9yO1xuICAgICAgICBob3N0SW5qZWN0b3JCb3VuZGFyeSA9IGNvbnRhaW5lckFwcEVsZW1lbnQuX2luamVjdG9yLmhvc3RCb3VuZGFyeTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFZpZXdUeXBlLkhPU1Q6XG4gICAgICAgIGlmIChpc1ByZXNlbnQoY29udGFpbmVyQXBwRWxlbWVudCkpIHtcbiAgICAgICAgICAvLyBob3N0IHZpZXcgaXMgYXR0YWNoZWQgdG8gYSBjb250YWluZXJcbiAgICAgICAgICBwYXJlbnRJbmplY3RvciA9IGlzUHJlc2VudChjb250YWluZXJBcHBFbGVtZW50LnByb3RvLnByb3RvSW5qZWN0b3IpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXJBcHBFbGVtZW50Ll9pbmplY3Rvci5wYXJlbnQgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lckFwcEVsZW1lbnQuX2luamVjdG9yO1xuICAgICAgICAgIGlmIChpc1ByZXNlbnQoaW1wZXJhdGl2ZWx5Q3JlYXRlZFByb3ZpZGVycykpIHtcbiAgICAgICAgICAgIHZhciBpbXBlcmF0aXZlUHJvdmlkZXJzV2l0aFZpc2liaWxpdHkgPSBpbXBlcmF0aXZlbHlDcmVhdGVkUHJvdmlkZXJzLm1hcChcbiAgICAgICAgICAgICAgICBwID0+IG5ldyBQcm92aWRlcldpdGhWaXNpYmlsaXR5KHAsIFZpc2liaWxpdHkuUHVibGljKSk7XG4gICAgICAgICAgICAvLyBUaGUgaW1wZXJhdGl2ZSBpbmplY3RvciBpcyBzaW1pbGFyIHRvIGhhdmluZyBhbiBlbGVtZW50IGJldHdlZW5cbiAgICAgICAgICAgIC8vIHRoZSBkeW5hbWljLWxvYWRlZCBjb21wb25lbnQgYW5kIGl0cyBwYXJlbnQgPT4gbm8gYm91bmRhcnkgYmV0d2VlblxuICAgICAgICAgICAgLy8gdGhlIGNvbXBvbmVudCBhbmQgaW1wZXJhdGl2ZWx5Q3JlYXRlZEluamVjdG9yLlxuICAgICAgICAgICAgcGFyZW50SW5qZWN0b3IgPSBuZXcgSW5qZWN0b3IobmV3IFByb3RvSW5qZWN0b3IoaW1wZXJhdGl2ZVByb3ZpZGVyc1dpdGhWaXNpYmlsaXR5KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudEluamVjdG9yLCB0cnVlLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIGhvc3RJbmplY3RvckJvdW5kYXJ5ID0gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhvc3RJbmplY3RvckJvdW5kYXJ5ID0gY29udGFpbmVyQXBwRWxlbWVudC5faW5qZWN0b3IuaG9zdEJvdW5kYXJ5O1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBib290c3RyYXBcbiAgICAgICAgICBwYXJlbnRJbmplY3RvciA9IHJvb3RJbmplY3RvcjtcbiAgICAgICAgICBob3N0SW5qZWN0b3JCb3VuZGFyeSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBuZXcgSW5qZWN0b3JXaXRoSG9zdEJvdW5kYXJ5KHBhcmVudEluamVjdG9yLCBob3N0SW5qZWN0b3JCb3VuZGFyeSk7XG4gIH1cblxuICBwdWJsaWMgbmVzdGVkVmlld3M6IEFwcFZpZXdbXSA9IG51bGw7XG4gIHB1YmxpYyBjb21wb25lbnRWaWV3OiBBcHBWaWV3ID0gbnVsbDtcblxuICBwcml2YXRlIF9xdWVyeVN0cmF0ZWd5OiBfUXVlcnlTdHJhdGVneTtcbiAgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yO1xuICBwcml2YXRlIF9zdHJhdGVneTogX0VsZW1lbnREaXJlY3RpdmVTdHJhdGVneTtcbiAgcHVibGljIHJlZjogRWxlbWVudFJlZl87XG5cbiAgY29uc3RydWN0b3IocHVibGljIHByb3RvOiBBcHBQcm90b0VsZW1lbnQsIHB1YmxpYyBwYXJlbnRWaWV3OiBBcHBWaWV3LCBwdWJsaWMgcGFyZW50OiBBcHBFbGVtZW50LFxuICAgICAgICAgICAgICBwdWJsaWMgbmF0aXZlRWxlbWVudDogYW55LCBwdWJsaWMgZW1iZWRkZWRWaWV3RmFjdG9yeTogRnVuY3Rpb24pIHtcbiAgICB0aGlzLnJlZiA9IG5ldyBFbGVtZW50UmVmXyh0aGlzKTtcbiAgICB2YXIgcGFyZW50SW5qZWN0b3IgPSBpc1ByZXNlbnQocGFyZW50KSA/IHBhcmVudC5faW5qZWN0b3IgOiBwYXJlbnRWaWV3LnBhcmVudEluamVjdG9yO1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5wcm90by5wcm90b0luamVjdG9yKSkge1xuICAgICAgdmFyIGlzQm91bmRhcnk7XG4gICAgICBpZiAoaXNQcmVzZW50KHBhcmVudCkgJiYgaXNQcmVzZW50KHBhcmVudC5wcm90by5wcm90b0luamVjdG9yKSkge1xuICAgICAgICBpc0JvdW5kYXJ5ID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpc0JvdW5kYXJ5ID0gcGFyZW50Vmlldy5ob3N0SW5qZWN0b3JCb3VuZGFyeTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3F1ZXJ5U3RyYXRlZ3kgPSB0aGlzLl9idWlsZFF1ZXJ5U3RyYXRlZ3koKTtcbiAgICAgIHRoaXMuX2luamVjdG9yID0gbmV3IEluamVjdG9yKHRoaXMucHJvdG8ucHJvdG9JbmplY3RvciwgcGFyZW50SW5qZWN0b3IsIGlzQm91bmRhcnksIHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB0aGlzLl9kZWJ1Z0NvbnRleHQoKSk7XG5cbiAgICAgIC8vIHdlIGNvdXBsZSBvdXJzZWx2ZXMgdG8gdGhlIGluamVjdG9yIHN0cmF0ZWd5IHRvIGF2b2lkIHBvbHltb3JwaGljIGNhbGxzXG4gICAgICB2YXIgaW5qZWN0b3JTdHJhdGVneSA9IDxhbnk+dGhpcy5faW5qZWN0b3IuaW50ZXJuYWxTdHJhdGVneTtcbiAgICAgIHRoaXMuX3N0cmF0ZWd5ID0gaW5qZWN0b3JTdHJhdGVneSBpbnN0YW5jZW9mIEluamVjdG9ySW5saW5lU3RyYXRlZ3kgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEVsZW1lbnREaXJlY3RpdmVJbmxpbmVTdHJhdGVneShpbmplY3RvclN0cmF0ZWd5LCB0aGlzKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgRWxlbWVudERpcmVjdGl2ZUR5bmFtaWNTdHJhdGVneShpbmplY3RvclN0cmF0ZWd5LCB0aGlzKTtcbiAgICAgIHRoaXMuX3N0cmF0ZWd5LmluaXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcXVlcnlTdHJhdGVneSA9IG51bGw7XG4gICAgICB0aGlzLl9pbmplY3RvciA9IHBhcmVudEluamVjdG9yO1xuICAgICAgdGhpcy5fc3RyYXRlZ3kgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGF0dGFjaENvbXBvbmVudFZpZXcoY29tcG9uZW50VmlldzogQXBwVmlldykgeyB0aGlzLmNvbXBvbmVudFZpZXcgPSBjb21wb25lbnRWaWV3OyB9XG5cbiAgcHJpdmF0ZSBfZGVidWdDb250ZXh0KCk6IGFueSB7XG4gICAgdmFyIGMgPSB0aGlzLnBhcmVudFZpZXcuZ2V0RGVidWdDb250ZXh0KHRoaXMsIG51bGwsIG51bGwpO1xuICAgIHJldHVybiBpc1ByZXNlbnQoYykgPyBuZXcgX0NvbnRleHQoYy5lbGVtZW50LCBjLmNvbXBvbmVudEVsZW1lbnQsIGMuaW5qZWN0b3IpIDogbnVsbDtcbiAgfVxuXG4gIGhhc1ZhcmlhYmxlQmluZGluZyhuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICB2YXIgdmIgPSB0aGlzLnByb3RvLmRpcmVjdGl2ZVZhcmlhYmxlQmluZGluZ3M7XG4gICAgcmV0dXJuIGlzUHJlc2VudCh2YikgJiYgU3RyaW5nTWFwV3JhcHBlci5jb250YWlucyh2YiwgbmFtZSk7XG4gIH1cblxuICBnZXRWYXJpYWJsZUJpbmRpbmcobmFtZTogc3RyaW5nKTogYW55IHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLnByb3RvLmRpcmVjdGl2ZVZhcmlhYmxlQmluZGluZ3NbbmFtZV07XG4gICAgcmV0dXJuIGlzUHJlc2VudChpbmRleCkgPyB0aGlzLmdldERpcmVjdGl2ZUF0SW5kZXgoPG51bWJlcj5pbmRleCkgOiB0aGlzLmdldEVsZW1lbnRSZWYoKTtcbiAgfVxuXG4gIGdldCh0b2tlbjogYW55KTogYW55IHsgcmV0dXJuIHRoaXMuX2luamVjdG9yLmdldCh0b2tlbik7IH1cblxuICBoYXNEaXJlY3RpdmUodHlwZTogVHlwZSk6IGJvb2xlYW4geyByZXR1cm4gaXNQcmVzZW50KHRoaXMuX2luamVjdG9yLmdldE9wdGlvbmFsKHR5cGUpKTsgfVxuXG4gIGdldENvbXBvbmVudCgpOiBhbnkgeyByZXR1cm4gaXNQcmVzZW50KHRoaXMuX3N0cmF0ZWd5KSA/IHRoaXMuX3N0cmF0ZWd5LmdldENvbXBvbmVudCgpIDogbnVsbDsgfVxuXG4gIGdldEluamVjdG9yKCk6IEluamVjdG9yIHsgcmV0dXJuIHRoaXMuX2luamVjdG9yOyB9XG5cbiAgZ2V0RWxlbWVudFJlZigpOiBFbGVtZW50UmVmIHsgcmV0dXJuIHRoaXMucmVmOyB9XG5cbiAgZ2V0Vmlld0NvbnRhaW5lclJlZigpOiBWaWV3Q29udGFpbmVyUmVmIHsgcmV0dXJuIG5ldyBWaWV3Q29udGFpbmVyUmVmXyh0aGlzKTsgfVxuXG4gIGdldFRlbXBsYXRlUmVmKCk6IFRlbXBsYXRlUmVmIHtcbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuZW1iZWRkZWRWaWV3RmFjdG9yeSkpIHtcbiAgICAgIHJldHVybiBuZXcgVGVtcGxhdGVSZWZfKHRoaXMucmVmKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXREZXBlbmRlbmN5KGluamVjdG9yOiBJbmplY3RvciwgcHJvdmlkZXI6IFJlc29sdmVkUHJvdmlkZXIsIGRlcDogRGVwZW5kZW5jeSk6IGFueSB7XG4gICAgaWYgKHByb3ZpZGVyIGluc3RhbmNlb2YgRGlyZWN0aXZlUHJvdmlkZXIpIHtcbiAgICAgIHZhciBkaXJEZXAgPSA8RGlyZWN0aXZlRGVwZW5kZW5jeT5kZXA7XG5cbiAgICAgIGlmIChpc1ByZXNlbnQoZGlyRGVwLmF0dHJpYnV0ZU5hbWUpKSByZXR1cm4gdGhpcy5fYnVpbGRBdHRyaWJ1dGUoZGlyRGVwKTtcblxuICAgICAgaWYgKGlzUHJlc2VudChkaXJEZXAucXVlcnlEZWNvcmF0b3IpKVxuICAgICAgICByZXR1cm4gdGhpcy5fcXVlcnlTdHJhdGVneS5maW5kUXVlcnkoZGlyRGVwLnF1ZXJ5RGVjb3JhdG9yKS5saXN0O1xuXG4gICAgICBpZiAoZGlyRGVwLmtleS5pZCA9PT0gU3RhdGljS2V5cy5pbnN0YW5jZSgpLmNoYW5nZURldGVjdG9yUmVmSWQpIHtcbiAgICAgICAgLy8gV2UgcHJvdmlkZSB0aGUgY29tcG9uZW50J3MgdmlldyBjaGFuZ2UgZGV0ZWN0b3IgdG8gY29tcG9uZW50cyBhbmRcbiAgICAgICAgLy8gdGhlIHN1cnJvdW5kaW5nIGNvbXBvbmVudCdzIGNoYW5nZSBkZXRlY3RvciB0byBkaXJlY3RpdmVzLlxuICAgICAgICBpZiAodGhpcy5wcm90by5maXJzdFByb3ZpZGVySXNDb21wb25lbnQpIHtcbiAgICAgICAgICAvLyBOb3RlOiBUaGUgY29tcG9uZW50IHZpZXcgaXMgbm90IHlldCBjcmVhdGVkIHdoZW5cbiAgICAgICAgICAvLyB0aGlzIG1ldGhvZCBpcyBjYWxsZWQhXG4gICAgICAgICAgcmV0dXJuIG5ldyBfQ29tcG9uZW50Vmlld0NoYW5nZURldGVjdG9yUmVmKHRoaXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudFZpZXcuY2hhbmdlRGV0ZWN0b3IucmVmO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChkaXJEZXAua2V5LmlkID09PSBTdGF0aWNLZXlzLmluc3RhbmNlKCkuZWxlbWVudFJlZklkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEVsZW1lbnRSZWYoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGRpckRlcC5rZXkuaWQgPT09IFN0YXRpY0tleXMuaW5zdGFuY2UoKS52aWV3Q29udGFpbmVySWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Vmlld0NvbnRhaW5lclJlZigpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGlyRGVwLmtleS5pZCA9PT0gU3RhdGljS2V5cy5pbnN0YW5jZSgpLnRlbXBsYXRlUmVmSWQpIHtcbiAgICAgICAgdmFyIHRyID0gdGhpcy5nZXRUZW1wbGF0ZVJlZigpO1xuICAgICAgICBpZiAoaXNCbGFuayh0cikgJiYgIWRpckRlcC5vcHRpb25hbCkge1xuICAgICAgICAgIHRocm93IG5ldyBOb1Byb3ZpZGVyRXJyb3IobnVsbCwgZGlyRGVwLmtleSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRyO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGlyRGVwLmtleS5pZCA9PT0gU3RhdGljS2V5cy5pbnN0YW5jZSgpLnJlbmRlcmVySWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50Vmlldy5yZW5kZXJlcjtcbiAgICAgIH1cblxuICAgIH0gZWxzZSBpZiAocHJvdmlkZXIgaW5zdGFuY2VvZiBQaXBlUHJvdmlkZXIpIHtcbiAgICAgIGlmIChkZXAua2V5LmlkID09PSBTdGF0aWNLZXlzLmluc3RhbmNlKCkuY2hhbmdlRGV0ZWN0b3JSZWZJZCkge1xuICAgICAgICAvLyBXZSBwcm92aWRlIHRoZSBjb21wb25lbnQncyB2aWV3IGNoYW5nZSBkZXRlY3RvciB0byBjb21wb25lbnRzIGFuZFxuICAgICAgICAvLyB0aGUgc3Vycm91bmRpbmcgY29tcG9uZW50J3MgY2hhbmdlIGRldGVjdG9yIHRvIGRpcmVjdGl2ZXMuXG4gICAgICAgIGlmICh0aGlzLnByb3RvLmZpcnN0UHJvdmlkZXJJc0NvbXBvbmVudCkge1xuICAgICAgICAgIC8vIE5vdGU6IFRoZSBjb21wb25lbnQgdmlldyBpcyBub3QgeWV0IGNyZWF0ZWQgd2hlblxuICAgICAgICAgIC8vIHRoaXMgbWV0aG9kIGlzIGNhbGxlZCFcbiAgICAgICAgICByZXR1cm4gbmV3IF9Db21wb25lbnRWaWV3Q2hhbmdlRGV0ZWN0b3JSZWYodGhpcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50Vmlldy5jaGFuZ2VEZXRlY3RvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBVTkRFRklORUQ7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZEF0dHJpYnV0ZShkZXA6IERpcmVjdGl2ZURlcGVuZGVuY3kpOiBzdHJpbmcge1xuICAgIHZhciBhdHRyaWJ1dGVzID0gdGhpcy5wcm90by5hdHRyaWJ1dGVzO1xuICAgIGlmIChpc1ByZXNlbnQoYXR0cmlidXRlcykgJiYgU3RyaW5nTWFwV3JhcHBlci5jb250YWlucyhhdHRyaWJ1dGVzLCBkZXAuYXR0cmlidXRlTmFtZSkpIHtcbiAgICAgIHJldHVybiBhdHRyaWJ1dGVzW2RlcC5hdHRyaWJ1dGVOYW1lXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgYWRkRGlyZWN0aXZlc01hdGNoaW5nUXVlcnkocXVlcnk6IFF1ZXJ5TWV0YWRhdGEsIGxpc3Q6IGFueVtdKTogdm9pZCB7XG4gICAgdmFyIHRlbXBsYXRlUmVmID0gdGhpcy5nZXRUZW1wbGF0ZVJlZigpO1xuICAgIGlmIChxdWVyeS5zZWxlY3RvciA9PT0gVGVtcGxhdGVSZWYgJiYgaXNQcmVzZW50KHRlbXBsYXRlUmVmKSkge1xuICAgICAgbGlzdC5wdXNoKHRlbXBsYXRlUmVmKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3N0cmF0ZWd5ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3N0cmF0ZWd5LmFkZERpcmVjdGl2ZXNNYXRjaGluZ1F1ZXJ5KHF1ZXJ5LCBsaXN0KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9idWlsZFF1ZXJ5U3RyYXRlZ3koKTogX1F1ZXJ5U3RyYXRlZ3kge1xuICAgIGlmICh0aGlzLnByb3RvLnByb3RvUXVlcnlSZWZzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIF9lbXB0eVF1ZXJ5U3RyYXRlZ3k7XG4gICAgfSBlbHNlIGlmICh0aGlzLnByb3RvLnByb3RvUXVlcnlSZWZzLmxlbmd0aCA8PVxuICAgICAgICAgICAgICAgSW5saW5lUXVlcnlTdHJhdGVneS5OVU1CRVJfT0ZfU1VQUE9SVEVEX1FVRVJJRVMpIHtcbiAgICAgIHJldHVybiBuZXcgSW5saW5lUXVlcnlTdHJhdGVneSh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBEeW5hbWljUXVlcnlTdHJhdGVneSh0aGlzKTtcbiAgICB9XG4gIH1cblxuXG4gIGdldERpcmVjdGl2ZUF0SW5kZXgoaW5kZXg6IG51bWJlcik6IGFueSB7IHJldHVybiB0aGlzLl9pbmplY3Rvci5nZXRBdChpbmRleCk7IH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKTogdm9pZCB7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl9xdWVyeVN0cmF0ZWd5KSkgdGhpcy5fcXVlcnlTdHJhdGVneS51cGRhdGVWaWV3UXVlcmllcygpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fcXVlcnlTdHJhdGVneSkpIHRoaXMuX3F1ZXJ5U3RyYXRlZ3kudXBkYXRlQ29udGVudFF1ZXJpZXMoKTtcbiAgfVxuXG4gIHRyYXZlcnNlQW5kU2V0UXVlcmllc0FzRGlydHkoKTogdm9pZCB7XG4gICAgdmFyIGluajogQXBwRWxlbWVudCA9IHRoaXM7XG4gICAgd2hpbGUgKGlzUHJlc2VudChpbmopKSB7XG4gICAgICBpbmouX3NldFF1ZXJpZXNBc0RpcnR5KCk7XG4gICAgICBpZiAoaXNCbGFuayhpbmoucGFyZW50KSAmJiBpbmoucGFyZW50Vmlldy5wcm90by50eXBlID09PSBWaWV3VHlwZS5FTUJFRERFRCkge1xuICAgICAgICBpbmogPSBpbmoucGFyZW50Vmlldy5jb250YWluZXJBcHBFbGVtZW50O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5qID0gaW5qLnBhcmVudDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zZXRRdWVyaWVzQXNEaXJ0eSgpOiB2b2lkIHtcbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuX3F1ZXJ5U3RyYXRlZ3kpKSB7XG4gICAgICB0aGlzLl9xdWVyeVN0cmF0ZWd5LnNldENvbnRlbnRRdWVyaWVzQXNEaXJ0eSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wYXJlbnRWaWV3LnByb3RvLnR5cGUgPT09IFZpZXdUeXBlLkNPTVBPTkVOVCkge1xuICAgICAgdGhpcy5wYXJlbnRWaWV3LmNvbnRhaW5lckFwcEVsZW1lbnQuX3F1ZXJ5U3RyYXRlZ3kuc2V0Vmlld1F1ZXJpZXNBc0RpcnR5KCk7XG4gICAgfVxuICB9XG59XG5cbmludGVyZmFjZSBfUXVlcnlTdHJhdGVneSB7XG4gIHNldENvbnRlbnRRdWVyaWVzQXNEaXJ0eSgpOiB2b2lkO1xuICBzZXRWaWV3UXVlcmllc0FzRGlydHkoKTogdm9pZDtcbiAgdXBkYXRlQ29udGVudFF1ZXJpZXMoKTogdm9pZDtcbiAgdXBkYXRlVmlld1F1ZXJpZXMoKTogdm9pZDtcbiAgZmluZFF1ZXJ5KHF1ZXJ5OiBRdWVyeU1ldGFkYXRhKTogUXVlcnlSZWY7XG59XG5cbmNsYXNzIF9FbXB0eVF1ZXJ5U3RyYXRlZ3kgaW1wbGVtZW50cyBfUXVlcnlTdHJhdGVneSB7XG4gIHNldENvbnRlbnRRdWVyaWVzQXNEaXJ0eSgpOiB2b2lkIHt9XG4gIHNldFZpZXdRdWVyaWVzQXNEaXJ0eSgpOiB2b2lkIHt9XG4gIHVwZGF0ZUNvbnRlbnRRdWVyaWVzKCk6IHZvaWQge31cbiAgdXBkYXRlVmlld1F1ZXJpZXMoKTogdm9pZCB7fVxuICBmaW5kUXVlcnkocXVlcnk6IFF1ZXJ5TWV0YWRhdGEpOiBRdWVyeVJlZiB7XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYENhbm5vdCBmaW5kIHF1ZXJ5IGZvciBkaXJlY3RpdmUgJHtxdWVyeX0uYCk7XG4gIH1cbn1cblxudmFyIF9lbXB0eVF1ZXJ5U3RyYXRlZ3kgPSBuZXcgX0VtcHR5UXVlcnlTdHJhdGVneSgpO1xuXG5jbGFzcyBJbmxpbmVRdWVyeVN0cmF0ZWd5IGltcGxlbWVudHMgX1F1ZXJ5U3RyYXRlZ3kge1xuICBzdGF0aWMgTlVNQkVSX09GX1NVUFBPUlRFRF9RVUVSSUVTID0gMztcblxuICBxdWVyeTA6IFF1ZXJ5UmVmO1xuICBxdWVyeTE6IFF1ZXJ5UmVmO1xuICBxdWVyeTI6IFF1ZXJ5UmVmO1xuXG4gIGNvbnN0cnVjdG9yKGVpOiBBcHBFbGVtZW50KSB7XG4gICAgdmFyIHByb3RvUmVmcyA9IGVpLnByb3RvLnByb3RvUXVlcnlSZWZzO1xuICAgIGlmIChwcm90b1JlZnMubGVuZ3RoID4gMCkgdGhpcy5xdWVyeTAgPSBuZXcgUXVlcnlSZWYocHJvdG9SZWZzWzBdLCBlaSk7XG4gICAgaWYgKHByb3RvUmVmcy5sZW5ndGggPiAxKSB0aGlzLnF1ZXJ5MSA9IG5ldyBRdWVyeVJlZihwcm90b1JlZnNbMV0sIGVpKTtcbiAgICBpZiAocHJvdG9SZWZzLmxlbmd0aCA+IDIpIHRoaXMucXVlcnkyID0gbmV3IFF1ZXJ5UmVmKHByb3RvUmVmc1syXSwgZWkpO1xuICB9XG5cbiAgc2V0Q29udGVudFF1ZXJpZXNBc0RpcnR5KCk6IHZvaWQge1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5xdWVyeTApICYmICF0aGlzLnF1ZXJ5MC5pc1ZpZXdRdWVyeSkgdGhpcy5xdWVyeTAuZGlydHkgPSB0cnVlO1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5xdWVyeTEpICYmICF0aGlzLnF1ZXJ5MS5pc1ZpZXdRdWVyeSkgdGhpcy5xdWVyeTEuZGlydHkgPSB0cnVlO1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5xdWVyeTIpICYmICF0aGlzLnF1ZXJ5Mi5pc1ZpZXdRdWVyeSkgdGhpcy5xdWVyeTIuZGlydHkgPSB0cnVlO1xuICB9XG5cbiAgc2V0Vmlld1F1ZXJpZXNBc0RpcnR5KCk6IHZvaWQge1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5xdWVyeTApICYmIHRoaXMucXVlcnkwLmlzVmlld1F1ZXJ5KSB0aGlzLnF1ZXJ5MC5kaXJ0eSA9IHRydWU7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLnF1ZXJ5MSkgJiYgdGhpcy5xdWVyeTEuaXNWaWV3UXVlcnkpIHRoaXMucXVlcnkxLmRpcnR5ID0gdHJ1ZTtcbiAgICBpZiAoaXNQcmVzZW50KHRoaXMucXVlcnkyKSAmJiB0aGlzLnF1ZXJ5Mi5pc1ZpZXdRdWVyeSkgdGhpcy5xdWVyeTIuZGlydHkgPSB0cnVlO1xuICB9XG5cbiAgdXBkYXRlQ29udGVudFF1ZXJpZXMoKSB7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLnF1ZXJ5MCkgJiYgIXRoaXMucXVlcnkwLmlzVmlld1F1ZXJ5KSB7XG4gICAgICB0aGlzLnF1ZXJ5MC51cGRhdGUoKTtcbiAgICB9XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLnF1ZXJ5MSkgJiYgIXRoaXMucXVlcnkxLmlzVmlld1F1ZXJ5KSB7XG4gICAgICB0aGlzLnF1ZXJ5MS51cGRhdGUoKTtcbiAgICB9XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLnF1ZXJ5MikgJiYgIXRoaXMucXVlcnkyLmlzVmlld1F1ZXJ5KSB7XG4gICAgICB0aGlzLnF1ZXJ5Mi51cGRhdGUoKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVWaWV3UXVlcmllcygpIHtcbiAgICBpZiAoaXNQcmVzZW50KHRoaXMucXVlcnkwKSAmJiB0aGlzLnF1ZXJ5MC5pc1ZpZXdRdWVyeSkge1xuICAgICAgdGhpcy5xdWVyeTAudXBkYXRlKCk7XG4gICAgfVxuICAgIGlmIChpc1ByZXNlbnQodGhpcy5xdWVyeTEpICYmIHRoaXMucXVlcnkxLmlzVmlld1F1ZXJ5KSB7XG4gICAgICB0aGlzLnF1ZXJ5MS51cGRhdGUoKTtcbiAgICB9XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLnF1ZXJ5MikgJiYgdGhpcy5xdWVyeTIuaXNWaWV3UXVlcnkpIHtcbiAgICAgIHRoaXMucXVlcnkyLnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGZpbmRRdWVyeShxdWVyeTogUXVlcnlNZXRhZGF0YSk6IFF1ZXJ5UmVmIHtcbiAgICBpZiAoaXNQcmVzZW50KHRoaXMucXVlcnkwKSAmJiB0aGlzLnF1ZXJ5MC5wcm90b1F1ZXJ5UmVmLnF1ZXJ5ID09PSBxdWVyeSkge1xuICAgICAgcmV0dXJuIHRoaXMucXVlcnkwO1xuICAgIH1cbiAgICBpZiAoaXNQcmVzZW50KHRoaXMucXVlcnkxKSAmJiB0aGlzLnF1ZXJ5MS5wcm90b1F1ZXJ5UmVmLnF1ZXJ5ID09PSBxdWVyeSkge1xuICAgICAgcmV0dXJuIHRoaXMucXVlcnkxO1xuICAgIH1cbiAgICBpZiAoaXNQcmVzZW50KHRoaXMucXVlcnkyKSAmJiB0aGlzLnF1ZXJ5Mi5wcm90b1F1ZXJ5UmVmLnF1ZXJ5ID09PSBxdWVyeSkge1xuICAgICAgcmV0dXJuIHRoaXMucXVlcnkyO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgQ2Fubm90IGZpbmQgcXVlcnkgZm9yIGRpcmVjdGl2ZSAke3F1ZXJ5fS5gKTtcbiAgfVxufVxuXG5jbGFzcyBEeW5hbWljUXVlcnlTdHJhdGVneSBpbXBsZW1lbnRzIF9RdWVyeVN0cmF0ZWd5IHtcbiAgcXVlcmllczogUXVlcnlSZWZbXTtcblxuICBjb25zdHJ1Y3RvcihlaTogQXBwRWxlbWVudCkge1xuICAgIHRoaXMucXVlcmllcyA9IGVpLnByb3RvLnByb3RvUXVlcnlSZWZzLm1hcChwID0+IG5ldyBRdWVyeVJlZihwLCBlaSkpO1xuICB9XG5cbiAgc2V0Q29udGVudFF1ZXJpZXNBc0RpcnR5KCk6IHZvaWQge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5xdWVyaWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIgcSA9IHRoaXMucXVlcmllc1tpXTtcbiAgICAgIGlmICghcS5pc1ZpZXdRdWVyeSkgcS5kaXJ0eSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgc2V0Vmlld1F1ZXJpZXNBc0RpcnR5KCk6IHZvaWQge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5xdWVyaWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIgcSA9IHRoaXMucXVlcmllc1tpXTtcbiAgICAgIGlmIChxLmlzVmlld1F1ZXJ5KSBxLmRpcnR5ID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVDb250ZW50UXVlcmllcygpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucXVlcmllcy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIHEgPSB0aGlzLnF1ZXJpZXNbaV07XG4gICAgICBpZiAoIXEuaXNWaWV3UXVlcnkpIHtcbiAgICAgICAgcS51cGRhdGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB1cGRhdGVWaWV3UXVlcmllcygpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucXVlcmllcy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIHEgPSB0aGlzLnF1ZXJpZXNbaV07XG4gICAgICBpZiAocS5pc1ZpZXdRdWVyeSkge1xuICAgICAgICBxLnVwZGF0ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZpbmRRdWVyeShxdWVyeTogUXVlcnlNZXRhZGF0YSk6IFF1ZXJ5UmVmIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucXVlcmllcy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIHEgPSB0aGlzLnF1ZXJpZXNbaV07XG4gICAgICBpZiAocS5wcm90b1F1ZXJ5UmVmLnF1ZXJ5ID09PSBxdWVyeSkge1xuICAgICAgICByZXR1cm4gcTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYENhbm5vdCBmaW5kIHF1ZXJ5IGZvciBkaXJlY3RpdmUgJHtxdWVyeX0uYCk7XG4gIH1cbn1cblxuaW50ZXJmYWNlIF9FbGVtZW50RGlyZWN0aXZlU3RyYXRlZ3kge1xuICBnZXRDb21wb25lbnQoKTogYW55O1xuICBpc0NvbXBvbmVudEtleShrZXk6IEtleSk6IGJvb2xlYW47XG4gIGFkZERpcmVjdGl2ZXNNYXRjaGluZ1F1ZXJ5KHE6IFF1ZXJ5TWV0YWRhdGEsIHJlczogYW55W10pOiB2b2lkO1xuICBpbml0KCk6IHZvaWQ7XG59XG5cbi8qKlxuICogU3RyYXRlZ3kgdXNlZCBieSB0aGUgYEVsZW1lbnRJbmplY3RvcmAgd2hlbiB0aGUgbnVtYmVyIG9mIHByb3ZpZGVycyBpcyAxMCBvciBsZXNzLlxuICogSW4gc3VjaCBhIGNhc2UsIGlubGluaW5nIGZpZWxkcyBpcyBiZW5lZmljaWFsIGZvciBwZXJmb3JtYW5jZXMuXG4gKi9cbmNsYXNzIEVsZW1lbnREaXJlY3RpdmVJbmxpbmVTdHJhdGVneSBpbXBsZW1lbnRzIF9FbGVtZW50RGlyZWN0aXZlU3RyYXRlZ3kge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgaW5qZWN0b3JTdHJhdGVneTogSW5qZWN0b3JJbmxpbmVTdHJhdGVneSwgcHVibGljIF9laTogQXBwRWxlbWVudCkge31cblxuICBpbml0KCk6IHZvaWQge1xuICAgIHZhciBpID0gdGhpcy5pbmplY3RvclN0cmF0ZWd5O1xuICAgIHZhciBwID0gaS5wcm90b1N0cmF0ZWd5O1xuICAgIGkucmVzZXRDb25zdHJ1Y3Rpb25Db3VudGVyKCk7XG5cbiAgICBpZiAocC5wcm92aWRlcjAgaW5zdGFuY2VvZiBEaXJlY3RpdmVQcm92aWRlciAmJiBpc1ByZXNlbnQocC5rZXlJZDApICYmIGkub2JqMCA9PT0gVU5ERUZJTkVEKVxuICAgICAgaS5vYmowID0gaS5pbnN0YW50aWF0ZVByb3ZpZGVyKHAucHJvdmlkZXIwLCBwLnZpc2liaWxpdHkwKTtcbiAgICBpZiAocC5wcm92aWRlcjEgaW5zdGFuY2VvZiBEaXJlY3RpdmVQcm92aWRlciAmJiBpc1ByZXNlbnQocC5rZXlJZDEpICYmIGkub2JqMSA9PT0gVU5ERUZJTkVEKVxuICAgICAgaS5vYmoxID0gaS5pbnN0YW50aWF0ZVByb3ZpZGVyKHAucHJvdmlkZXIxLCBwLnZpc2liaWxpdHkxKTtcbiAgICBpZiAocC5wcm92aWRlcjIgaW5zdGFuY2VvZiBEaXJlY3RpdmVQcm92aWRlciAmJiBpc1ByZXNlbnQocC5rZXlJZDIpICYmIGkub2JqMiA9PT0gVU5ERUZJTkVEKVxuICAgICAgaS5vYmoyID0gaS5pbnN0YW50aWF0ZVByb3ZpZGVyKHAucHJvdmlkZXIyLCBwLnZpc2liaWxpdHkyKTtcbiAgICBpZiAocC5wcm92aWRlcjMgaW5zdGFuY2VvZiBEaXJlY3RpdmVQcm92aWRlciAmJiBpc1ByZXNlbnQocC5rZXlJZDMpICYmIGkub2JqMyA9PT0gVU5ERUZJTkVEKVxuICAgICAgaS5vYmozID0gaS5pbnN0YW50aWF0ZVByb3ZpZGVyKHAucHJvdmlkZXIzLCBwLnZpc2liaWxpdHkzKTtcbiAgICBpZiAocC5wcm92aWRlcjQgaW5zdGFuY2VvZiBEaXJlY3RpdmVQcm92aWRlciAmJiBpc1ByZXNlbnQocC5rZXlJZDQpICYmIGkub2JqNCA9PT0gVU5ERUZJTkVEKVxuICAgICAgaS5vYmo0ID0gaS5pbnN0YW50aWF0ZVByb3ZpZGVyKHAucHJvdmlkZXI0LCBwLnZpc2liaWxpdHk0KTtcbiAgICBpZiAocC5wcm92aWRlcjUgaW5zdGFuY2VvZiBEaXJlY3RpdmVQcm92aWRlciAmJiBpc1ByZXNlbnQocC5rZXlJZDUpICYmIGkub2JqNSA9PT0gVU5ERUZJTkVEKVxuICAgICAgaS5vYmo1ID0gaS5pbnN0YW50aWF0ZVByb3ZpZGVyKHAucHJvdmlkZXI1LCBwLnZpc2liaWxpdHk1KTtcbiAgICBpZiAocC5wcm92aWRlcjYgaW5zdGFuY2VvZiBEaXJlY3RpdmVQcm92aWRlciAmJiBpc1ByZXNlbnQocC5rZXlJZDYpICYmIGkub2JqNiA9PT0gVU5ERUZJTkVEKVxuICAgICAgaS5vYmo2ID0gaS5pbnN0YW50aWF0ZVByb3ZpZGVyKHAucHJvdmlkZXI2LCBwLnZpc2liaWxpdHk2KTtcbiAgICBpZiAocC5wcm92aWRlcjcgaW5zdGFuY2VvZiBEaXJlY3RpdmVQcm92aWRlciAmJiBpc1ByZXNlbnQocC5rZXlJZDcpICYmIGkub2JqNyA9PT0gVU5ERUZJTkVEKVxuICAgICAgaS5vYmo3ID0gaS5pbnN0YW50aWF0ZVByb3ZpZGVyKHAucHJvdmlkZXI3LCBwLnZpc2liaWxpdHk3KTtcbiAgICBpZiAocC5wcm92aWRlcjggaW5zdGFuY2VvZiBEaXJlY3RpdmVQcm92aWRlciAmJiBpc1ByZXNlbnQocC5rZXlJZDgpICYmIGkub2JqOCA9PT0gVU5ERUZJTkVEKVxuICAgICAgaS5vYmo4ID0gaS5pbnN0YW50aWF0ZVByb3ZpZGVyKHAucHJvdmlkZXI4LCBwLnZpc2liaWxpdHk4KTtcbiAgICBpZiAocC5wcm92aWRlcjkgaW5zdGFuY2VvZiBEaXJlY3RpdmVQcm92aWRlciAmJiBpc1ByZXNlbnQocC5rZXlJZDkpICYmIGkub2JqOSA9PT0gVU5ERUZJTkVEKVxuICAgICAgaS5vYmo5ID0gaS5pbnN0YW50aWF0ZVByb3ZpZGVyKHAucHJvdmlkZXI5LCBwLnZpc2liaWxpdHk5KTtcbiAgfVxuXG4gIGdldENvbXBvbmVudCgpOiBhbnkgeyByZXR1cm4gdGhpcy5pbmplY3RvclN0cmF0ZWd5Lm9iajA7IH1cblxuICBpc0NvbXBvbmVudEtleShrZXk6IEtleSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9laS5wcm90by5maXJzdFByb3ZpZGVySXNDb21wb25lbnQgJiYgaXNQcmVzZW50KGtleSkgJiZcbiAgICAgICAgICAga2V5LmlkID09PSB0aGlzLmluamVjdG9yU3RyYXRlZ3kucHJvdG9TdHJhdGVneS5rZXlJZDA7XG4gIH1cblxuICBhZGREaXJlY3RpdmVzTWF0Y2hpbmdRdWVyeShxdWVyeTogUXVlcnlNZXRhZGF0YSwgbGlzdDogYW55W10pOiB2b2lkIHtcbiAgICB2YXIgaSA9IHRoaXMuaW5qZWN0b3JTdHJhdGVneTtcbiAgICB2YXIgcCA9IGkucHJvdG9TdHJhdGVneTtcbiAgICBpZiAoaXNQcmVzZW50KHAucHJvdmlkZXIwKSAmJiBwLnByb3ZpZGVyMC5rZXkudG9rZW4gPT09IHF1ZXJ5LnNlbGVjdG9yKSB7XG4gICAgICBpZiAoaS5vYmowID09PSBVTkRFRklORUQpIGkub2JqMCA9IGkuaW5zdGFudGlhdGVQcm92aWRlcihwLnByb3ZpZGVyMCwgcC52aXNpYmlsaXR5MCk7XG4gICAgICBsaXN0LnB1c2goaS5vYmowKTtcbiAgICB9XG4gICAgaWYgKGlzUHJlc2VudChwLnByb3ZpZGVyMSkgJiYgcC5wcm92aWRlcjEua2V5LnRva2VuID09PSBxdWVyeS5zZWxlY3Rvcikge1xuICAgICAgaWYgKGkub2JqMSA9PT0gVU5ERUZJTkVEKSBpLm9iajEgPSBpLmluc3RhbnRpYXRlUHJvdmlkZXIocC5wcm92aWRlcjEsIHAudmlzaWJpbGl0eTEpO1xuICAgICAgbGlzdC5wdXNoKGkub2JqMSk7XG4gICAgfVxuICAgIGlmIChpc1ByZXNlbnQocC5wcm92aWRlcjIpICYmIHAucHJvdmlkZXIyLmtleS50b2tlbiA9PT0gcXVlcnkuc2VsZWN0b3IpIHtcbiAgICAgIGlmIChpLm9iajIgPT09IFVOREVGSU5FRCkgaS5vYmoyID0gaS5pbnN0YW50aWF0ZVByb3ZpZGVyKHAucHJvdmlkZXIyLCBwLnZpc2liaWxpdHkyKTtcbiAgICAgIGxpc3QucHVzaChpLm9iajIpO1xuICAgIH1cbiAgICBpZiAoaXNQcmVzZW50KHAucHJvdmlkZXIzKSAmJiBwLnByb3ZpZGVyMy5rZXkudG9rZW4gPT09IHF1ZXJ5LnNlbGVjdG9yKSB7XG4gICAgICBpZiAoaS5vYmozID09PSBVTkRFRklORUQpIGkub2JqMyA9IGkuaW5zdGFudGlhdGVQcm92aWRlcihwLnByb3ZpZGVyMywgcC52aXNpYmlsaXR5Myk7XG4gICAgICBsaXN0LnB1c2goaS5vYmozKTtcbiAgICB9XG4gICAgaWYgKGlzUHJlc2VudChwLnByb3ZpZGVyNCkgJiYgcC5wcm92aWRlcjQua2V5LnRva2VuID09PSBxdWVyeS5zZWxlY3Rvcikge1xuICAgICAgaWYgKGkub2JqNCA9PT0gVU5ERUZJTkVEKSBpLm9iajQgPSBpLmluc3RhbnRpYXRlUHJvdmlkZXIocC5wcm92aWRlcjQsIHAudmlzaWJpbGl0eTQpO1xuICAgICAgbGlzdC5wdXNoKGkub2JqNCk7XG4gICAgfVxuICAgIGlmIChpc1ByZXNlbnQocC5wcm92aWRlcjUpICYmIHAucHJvdmlkZXI1LmtleS50b2tlbiA9PT0gcXVlcnkuc2VsZWN0b3IpIHtcbiAgICAgIGlmIChpLm9iajUgPT09IFVOREVGSU5FRCkgaS5vYmo1ID0gaS5pbnN0YW50aWF0ZVByb3ZpZGVyKHAucHJvdmlkZXI1LCBwLnZpc2liaWxpdHk1KTtcbiAgICAgIGxpc3QucHVzaChpLm9iajUpO1xuICAgIH1cbiAgICBpZiAoaXNQcmVzZW50KHAucHJvdmlkZXI2KSAmJiBwLnByb3ZpZGVyNi5rZXkudG9rZW4gPT09IHF1ZXJ5LnNlbGVjdG9yKSB7XG4gICAgICBpZiAoaS5vYmo2ID09PSBVTkRFRklORUQpIGkub2JqNiA9IGkuaW5zdGFudGlhdGVQcm92aWRlcihwLnByb3ZpZGVyNiwgcC52aXNpYmlsaXR5Nik7XG4gICAgICBsaXN0LnB1c2goaS5vYmo2KTtcbiAgICB9XG4gICAgaWYgKGlzUHJlc2VudChwLnByb3ZpZGVyNykgJiYgcC5wcm92aWRlcjcua2V5LnRva2VuID09PSBxdWVyeS5zZWxlY3Rvcikge1xuICAgICAgaWYgKGkub2JqNyA9PT0gVU5ERUZJTkVEKSBpLm9iajcgPSBpLmluc3RhbnRpYXRlUHJvdmlkZXIocC5wcm92aWRlcjcsIHAudmlzaWJpbGl0eTcpO1xuICAgICAgbGlzdC5wdXNoKGkub2JqNyk7XG4gICAgfVxuICAgIGlmIChpc1ByZXNlbnQocC5wcm92aWRlcjgpICYmIHAucHJvdmlkZXI4LmtleS50b2tlbiA9PT0gcXVlcnkuc2VsZWN0b3IpIHtcbiAgICAgIGlmIChpLm9iajggPT09IFVOREVGSU5FRCkgaS5vYmo4ID0gaS5pbnN0YW50aWF0ZVByb3ZpZGVyKHAucHJvdmlkZXI4LCBwLnZpc2liaWxpdHk4KTtcbiAgICAgIGxpc3QucHVzaChpLm9iajgpO1xuICAgIH1cbiAgICBpZiAoaXNQcmVzZW50KHAucHJvdmlkZXI5KSAmJiBwLnByb3ZpZGVyOS5rZXkudG9rZW4gPT09IHF1ZXJ5LnNlbGVjdG9yKSB7XG4gICAgICBpZiAoaS5vYmo5ID09PSBVTkRFRklORUQpIGkub2JqOSA9IGkuaW5zdGFudGlhdGVQcm92aWRlcihwLnByb3ZpZGVyOSwgcC52aXNpYmlsaXR5OSk7XG4gICAgICBsaXN0LnB1c2goaS5vYmo5KTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBTdHJhdGVneSB1c2VkIGJ5IHRoZSBgRWxlbWVudEluamVjdG9yYCB3aGVuIHRoZSBudW1iZXIgb2YgYmluZGluZ3MgaXMgMTEgb3IgbW9yZS5cbiAqIEluIHN1Y2ggYSBjYXNlLCB0aGVyZSBhcmUgdG9vIG1hbnkgZmllbGRzIHRvIGlubGluZSAoc2VlIEVsZW1lbnRJbmplY3RvcklubGluZVN0cmF0ZWd5KS5cbiAqL1xuY2xhc3MgRWxlbWVudERpcmVjdGl2ZUR5bmFtaWNTdHJhdGVneSBpbXBsZW1lbnRzIF9FbGVtZW50RGlyZWN0aXZlU3RyYXRlZ3kge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgaW5qZWN0b3JTdHJhdGVneTogSW5qZWN0b3JEeW5hbWljU3RyYXRlZ3ksIHB1YmxpYyBfZWk6IEFwcEVsZW1lbnQpIHt9XG5cbiAgaW5pdCgpOiB2b2lkIHtcbiAgICB2YXIgaW5qID0gdGhpcy5pbmplY3RvclN0cmF0ZWd5O1xuICAgIHZhciBwID0gaW5qLnByb3RvU3RyYXRlZ3k7XG4gICAgaW5qLnJlc2V0Q29uc3RydWN0aW9uQ291bnRlcigpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwLmtleUlkcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHAucHJvdmlkZXJzW2ldIGluc3RhbmNlb2YgRGlyZWN0aXZlUHJvdmlkZXIgJiYgaXNQcmVzZW50KHAua2V5SWRzW2ldKSAmJlxuICAgICAgICAgIGluai5vYmpzW2ldID09PSBVTkRFRklORUQpIHtcbiAgICAgICAgaW5qLm9ianNbaV0gPSBpbmouaW5zdGFudGlhdGVQcm92aWRlcihwLnByb3ZpZGVyc1tpXSwgcC52aXNpYmlsaXRpZXNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldENvbXBvbmVudCgpOiBhbnkgeyByZXR1cm4gdGhpcy5pbmplY3RvclN0cmF0ZWd5Lm9ianNbMF07IH1cblxuICBpc0NvbXBvbmVudEtleShrZXk6IEtleSk6IGJvb2xlYW4ge1xuICAgIHZhciBwID0gdGhpcy5pbmplY3RvclN0cmF0ZWd5LnByb3RvU3RyYXRlZ3k7XG4gICAgcmV0dXJuIHRoaXMuX2VpLnByb3RvLmZpcnN0UHJvdmlkZXJJc0NvbXBvbmVudCAmJiBpc1ByZXNlbnQoa2V5KSAmJiBrZXkuaWQgPT09IHAua2V5SWRzWzBdO1xuICB9XG5cbiAgYWRkRGlyZWN0aXZlc01hdGNoaW5nUXVlcnkocXVlcnk6IFF1ZXJ5TWV0YWRhdGEsIGxpc3Q6IGFueVtdKTogdm9pZCB7XG4gICAgdmFyIGlzdCA9IHRoaXMuaW5qZWN0b3JTdHJhdGVneTtcbiAgICB2YXIgcCA9IGlzdC5wcm90b1N0cmF0ZWd5O1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwLnByb3ZpZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHAucHJvdmlkZXJzW2ldLmtleS50b2tlbiA9PT0gcXVlcnkuc2VsZWN0b3IpIHtcbiAgICAgICAgaWYgKGlzdC5vYmpzW2ldID09PSBVTkRFRklORUQpIHtcbiAgICAgICAgICBpc3Qub2Jqc1tpXSA9IGlzdC5pbnN0YW50aWF0ZVByb3ZpZGVyKHAucHJvdmlkZXJzW2ldLCBwLnZpc2liaWxpdGllc1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgbGlzdC5wdXNoKGlzdC5vYmpzW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFByb3RvUXVlcnlSZWYge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGlySW5kZXg6IG51bWJlciwgcHVibGljIHNldHRlcjogU2V0dGVyRm4sIHB1YmxpYyBxdWVyeTogUXVlcnlNZXRhZGF0YSkge31cblxuICBnZXQgdXNlc1Byb3BlcnR5U3ludGF4KCk6IGJvb2xlYW4geyByZXR1cm4gaXNQcmVzZW50KHRoaXMuc2V0dGVyKTsgfVxufVxuXG5leHBvcnQgY2xhc3MgUXVlcnlSZWYge1xuICBwdWJsaWMgbGlzdDogUXVlcnlMaXN0PGFueT47XG4gIHB1YmxpYyBkaXJ0eTogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJvdG9RdWVyeVJlZjogUHJvdG9RdWVyeVJlZiwgcHJpdmF0ZSBvcmlnaW5hdG9yOiBBcHBFbGVtZW50KSB7XG4gICAgdGhpcy5saXN0ID0gbmV3IFF1ZXJ5TGlzdDxhbnk+KCk7XG4gICAgdGhpcy5kaXJ0eSA9IHRydWU7XG4gIH1cblxuICBnZXQgaXNWaWV3UXVlcnkoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnByb3RvUXVlcnlSZWYucXVlcnkuaXNWaWV3UXVlcnk7IH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRpcnR5KSByZXR1cm47XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xuXG4gICAgLy8gVE9ETyBkZWxldGUgdGhlIGNoZWNrIG9uY2Ugb25seSBmaWVsZCBxdWVyaWVzIGFyZSBzdXBwb3J0ZWRcbiAgICBpZiAodGhpcy5wcm90b1F1ZXJ5UmVmLnVzZXNQcm9wZXJ0eVN5bnRheCkge1xuICAgICAgdmFyIGRpciA9IHRoaXMub3JpZ2luYXRvci5nZXREaXJlY3RpdmVBdEluZGV4KHRoaXMucHJvdG9RdWVyeVJlZi5kaXJJbmRleCk7XG4gICAgICBpZiAodGhpcy5wcm90b1F1ZXJ5UmVmLnF1ZXJ5LmZpcnN0KSB7XG4gICAgICAgIHRoaXMucHJvdG9RdWVyeVJlZi5zZXR0ZXIoZGlyLCB0aGlzLmxpc3QubGVuZ3RoID4gMCA/IHRoaXMubGlzdC5maXJzdCA6IG51bGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wcm90b1F1ZXJ5UmVmLnNldHRlcihkaXIsIHRoaXMubGlzdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5saXN0Lm5vdGlmeU9uQ2hhbmdlcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlKCk6IHZvaWQge1xuICAgIHZhciBhZ2dyZWdhdG9yID0gW107XG4gICAgaWYgKHRoaXMucHJvdG9RdWVyeVJlZi5xdWVyeS5pc1ZpZXdRdWVyeSkge1xuICAgICAgLy8gaW50ZW50aW9uYWxseSBza2lwcGluZyBvcmlnaW5hdG9yIGZvciB2aWV3IHF1ZXJpZXMuXG4gICAgICB2YXIgbmVzdGVkVmlldyA9IHRoaXMub3JpZ2luYXRvci5jb21wb25lbnRWaWV3O1xuICAgICAgaWYgKGlzUHJlc2VudChuZXN0ZWRWaWV3KSkgdGhpcy5fdmlzaXRWaWV3KG5lc3RlZFZpZXcsIGFnZ3JlZ2F0b3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl92aXNpdCh0aGlzLm9yaWdpbmF0b3IsIGFnZ3JlZ2F0b3IpO1xuICAgIH1cbiAgICB0aGlzLmxpc3QucmVzZXQoYWdncmVnYXRvcik7XG4gIH07XG5cbiAgcHJpdmF0ZSBfdmlzaXQoaW5qOiBBcHBFbGVtZW50LCBhZ2dyZWdhdG9yOiBhbnlbXSk6IHZvaWQge1xuICAgIHZhciB2aWV3ID0gaW5qLnBhcmVudFZpZXc7XG4gICAgdmFyIHN0YXJ0SWR4ID0gaW5qLnByb3RvLmluZGV4O1xuICAgIGZvciAodmFyIGkgPSBzdGFydElkeDsgaSA8IHZpZXcuYXBwRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjdXJJbmogPSB2aWV3LmFwcEVsZW1lbnRzW2ldO1xuICAgICAgLy8gVGhlIGZpcnN0IGluamVjdG9yIGFmdGVyIGluaiwgdGhhdCBpcyBvdXRzaWRlIHRoZSBzdWJ0cmVlIHJvb3RlZCBhdFxuICAgICAgLy8gaW5qIGhhcyB0byBoYXZlIGEgbnVsbCBwYXJlbnQgb3IgYSBwYXJlbnQgdGhhdCBpcyBhbiBhbmNlc3RvciBvZiBpbmouXG4gICAgICBpZiAoaSA+IHN0YXJ0SWR4ICYmIChpc0JsYW5rKGN1ckluai5wYXJlbnQpIHx8IGN1ckluai5wYXJlbnQucHJvdG8uaW5kZXggPCBzdGFydElkeCkpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5wcm90b1F1ZXJ5UmVmLnF1ZXJ5LmRlc2NlbmRhbnRzICYmXG4gICAgICAgICAgIShjdXJJbmoucGFyZW50ID09IHRoaXMub3JpZ2luYXRvciB8fCBjdXJJbmogPT0gdGhpcy5vcmlnaW5hdG9yKSlcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIC8vIFdlIHZpc2l0IHRoZSB2aWV3IGNvbnRhaW5lcihWQykgdmlld3MgcmlnaHQgYWZ0ZXIgdGhlIGluamVjdG9yIHRoYXQgY29udGFpbnNcbiAgICAgIC8vIHRoZSBWQy4gVGhlb3JldGljYWxseSwgdGhhdCBtaWdodCBub3QgYmUgdGhlIHJpZ2h0IG9yZGVyIGlmIHRoZXJlIGFyZVxuICAgICAgLy8gY2hpbGQgaW5qZWN0b3JzIG9mIHNhaWQgaW5qZWN0b3IuIE5vdCBjbGVhciB3aGV0aGVyIGlmIHN1Y2ggY2FzZSBjYW5cbiAgICAgIC8vIGV2ZW4gYmUgY29uc3RydWN0ZWQgd2l0aCB0aGUgY3VycmVudCBhcGlzLlxuICAgICAgdGhpcy5fdmlzaXRJbmplY3RvcihjdXJJbmosIGFnZ3JlZ2F0b3IpO1xuICAgICAgdGhpcy5fdmlzaXRWaWV3Q29udGFpbmVyVmlld3MoY3VySW5qLm5lc3RlZFZpZXdzLCBhZ2dyZWdhdG9yKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF92aXNpdEluamVjdG9yKGluajogQXBwRWxlbWVudCwgYWdncmVnYXRvcjogYW55W10pIHtcbiAgICBpZiAodGhpcy5wcm90b1F1ZXJ5UmVmLnF1ZXJ5LmlzVmFyQmluZGluZ1F1ZXJ5KSB7XG4gICAgICB0aGlzLl9hZ2dyZWdhdGVWYXJpYWJsZUJpbmRpbmcoaW5qLCBhZ2dyZWdhdG9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYWdncmVnYXRlRGlyZWN0aXZlKGluaiwgYWdncmVnYXRvcik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdmlzaXRWaWV3Q29udGFpbmVyVmlld3Modmlld3M6IEFwcFZpZXdbXSwgYWdncmVnYXRvcjogYW55W10pIHtcbiAgICBpZiAoaXNQcmVzZW50KHZpZXdzKSkge1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB2aWV3cy5sZW5ndGg7IGorKykge1xuICAgICAgICB0aGlzLl92aXNpdFZpZXcodmlld3Nbal0sIGFnZ3JlZ2F0b3IpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3Zpc2l0Vmlldyh2aWV3OiBBcHBWaWV3LCBhZ2dyZWdhdG9yOiBhbnlbXSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmlldy5hcHBFbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGluaiA9IHZpZXcuYXBwRWxlbWVudHNbaV07XG4gICAgICB0aGlzLl92aXNpdEluamVjdG9yKGluaiwgYWdncmVnYXRvcik7XG4gICAgICB0aGlzLl92aXNpdFZpZXdDb250YWluZXJWaWV3cyhpbmoubmVzdGVkVmlld3MsIGFnZ3JlZ2F0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2FnZ3JlZ2F0ZVZhcmlhYmxlQmluZGluZyhpbmo6IEFwcEVsZW1lbnQsIGFnZ3JlZ2F0b3I6IGFueVtdKTogdm9pZCB7XG4gICAgdmFyIHZiID0gdGhpcy5wcm90b1F1ZXJ5UmVmLnF1ZXJ5LnZhckJpbmRpbmdzO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmIubGVuZ3RoOyArK2kpIHtcbiAgICAgIGlmIChpbmouaGFzVmFyaWFibGVCaW5kaW5nKHZiW2ldKSkge1xuICAgICAgICBhZ2dyZWdhdG9yLnB1c2goaW5qLmdldFZhcmlhYmxlQmluZGluZyh2YltpXSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2FnZ3JlZ2F0ZURpcmVjdGl2ZShpbmo6IEFwcEVsZW1lbnQsIGFnZ3JlZ2F0b3I6IGFueVtdKTogdm9pZCB7XG4gICAgaW5qLmFkZERpcmVjdGl2ZXNNYXRjaGluZ1F1ZXJ5KHRoaXMucHJvdG9RdWVyeVJlZi5xdWVyeSwgYWdncmVnYXRvcik7XG4gIH1cbn1cblxuY2xhc3MgX0NvbXBvbmVudFZpZXdDaGFuZ2VEZXRlY3RvclJlZiBleHRlbmRzIENoYW5nZURldGVjdG9yUmVmIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfYXBwRWxlbWVudDogQXBwRWxlbWVudCkgeyBzdXBlcigpOyB9XG5cbiAgbWFya0ZvckNoZWNrKCk6IHZvaWQgeyB0aGlzLl9hcHBFbGVtZW50LmNvbXBvbmVudFZpZXcuY2hhbmdlRGV0ZWN0b3IucmVmLm1hcmtGb3JDaGVjaygpOyB9XG4gIGRldGFjaCgpOiB2b2lkIHsgdGhpcy5fYXBwRWxlbWVudC5jb21wb25lbnRWaWV3LmNoYW5nZURldGVjdG9yLnJlZi5kZXRhY2goKTsgfVxuICBkZXRlY3RDaGFuZ2VzKCk6IHZvaWQgeyB0aGlzLl9hcHBFbGVtZW50LmNvbXBvbmVudFZpZXcuY2hhbmdlRGV0ZWN0b3IucmVmLmRldGVjdENoYW5nZXMoKTsgfVxuICBjaGVja05vQ2hhbmdlcygpOiB2b2lkIHsgdGhpcy5fYXBwRWxlbWVudC5jb21wb25lbnRWaWV3LmNoYW5nZURldGVjdG9yLnJlZi5jaGVja05vQ2hhbmdlcygpOyB9XG4gIHJlYXR0YWNoKCk6IHZvaWQgeyB0aGlzLl9hcHBFbGVtZW50LmNvbXBvbmVudFZpZXcuY2hhbmdlRGV0ZWN0b3IucmVmLnJlYXR0YWNoKCk7IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
