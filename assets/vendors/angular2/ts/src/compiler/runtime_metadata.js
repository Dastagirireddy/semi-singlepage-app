System.register(['angular2/src/core/di', 'angular2/src/facade/lang', 'angular2/src/facade/collection', 'angular2/src/facade/exceptions', 'angular2/src/core/di/reflective_exceptions', './compile_metadata', 'angular2/src/core/metadata/directives', 'angular2/src/core/metadata/di', './directive_resolver', './pipe_resolver', './view_resolver', './directive_lifecycle_reflector', 'angular2/src/core/metadata/lifecycle_hooks', 'angular2/src/core/reflection/reflection', 'angular2/src/core/platform_directives_and_pipes', './util', './assertions', 'angular2/src/compiler/url_resolver', 'angular2/src/core/di/provider', 'angular2/src/core/di/reflective_provider', 'angular2/src/core/di/metadata', 'angular2/src/core/reflection/reflector_reader'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var di_1, lang_1, collection_1, exceptions_1, reflective_exceptions_1, cpl, md, dimd, directive_resolver_1, pipe_resolver_1, view_resolver_1, directive_lifecycle_reflector_1, lifecycle_hooks_1, reflection_1, di_2, platform_directives_and_pipes_1, util_1, assertions_1, url_resolver_1, provider_1, reflective_provider_1, metadata_1, reflector_reader_1;
    var RuntimeMetadataResolver;
    function flattenDirectives(view, platformDirectives) {
        var directives = [];
        if (lang_1.isPresent(platformDirectives)) {
            flattenArray(platformDirectives, directives);
        }
        if (lang_1.isPresent(view.directives)) {
            flattenArray(view.directives, directives);
        }
        return directives;
    }
    function flattenPipes(view, platformPipes) {
        var pipes = [];
        if (lang_1.isPresent(platformPipes)) {
            flattenArray(platformPipes, pipes);
        }
        if (lang_1.isPresent(view.pipes)) {
            flattenArray(view.pipes, pipes);
        }
        return pipes;
    }
    function flattenArray(tree, out) {
        for (var i = 0; i < tree.length; i++) {
            var item = di_1.resolveForwardRef(tree[i]);
            if (lang_1.isArray(item)) {
                flattenArray(item, out);
            }
            else {
                out.push(item);
            }
        }
    }
    function isValidType(value) {
        return lang_1.isPresent(value) && (value instanceof lang_1.Type);
    }
    function calcModuleUrl(reflector, type, cmpMetadata) {
        var moduleId = cmpMetadata.moduleId;
        if (lang_1.isPresent(moduleId)) {
            var scheme = url_resolver_1.getUrlScheme(moduleId);
            return lang_1.isPresent(scheme) && scheme.length > 0 ? moduleId :
                "package:" + moduleId + util_1.MODULE_SUFFIX;
        }
        else {
            return reflector.importUri(type);
        }
    }
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
                di_2 = di_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (reflective_exceptions_1_1) {
                reflective_exceptions_1 = reflective_exceptions_1_1;
            },
            function (cpl_1) {
                cpl = cpl_1;
            },
            function (md_1) {
                md = md_1;
            },
            function (dimd_1) {
                dimd = dimd_1;
            },
            function (directive_resolver_1_1) {
                directive_resolver_1 = directive_resolver_1_1;
            },
            function (pipe_resolver_1_1) {
                pipe_resolver_1 = pipe_resolver_1_1;
            },
            function (view_resolver_1_1) {
                view_resolver_1 = view_resolver_1_1;
            },
            function (directive_lifecycle_reflector_1_1) {
                directive_lifecycle_reflector_1 = directive_lifecycle_reflector_1_1;
            },
            function (lifecycle_hooks_1_1) {
                lifecycle_hooks_1 = lifecycle_hooks_1_1;
            },
            function (reflection_1_1) {
                reflection_1 = reflection_1_1;
            },
            function (platform_directives_and_pipes_1_1) {
                platform_directives_and_pipes_1 = platform_directives_and_pipes_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (assertions_1_1) {
                assertions_1 = assertions_1_1;
            },
            function (url_resolver_1_1) {
                url_resolver_1 = url_resolver_1_1;
            },
            function (provider_1_1) {
                provider_1 = provider_1_1;
            },
            function (reflective_provider_1_1) {
                reflective_provider_1 = reflective_provider_1_1;
            },
            function (metadata_1_1) {
                metadata_1 = metadata_1_1;
            },
            function (reflector_reader_1_1) {
                reflector_reader_1 = reflector_reader_1_1;
            }],
        execute: function() {
            RuntimeMetadataResolver = (function () {
                function RuntimeMetadataResolver(_directiveResolver, _pipeResolver, _viewResolver, _platformDirectives, _platformPipes, _reflector) {
                    this._directiveResolver = _directiveResolver;
                    this._pipeResolver = _pipeResolver;
                    this._viewResolver = _viewResolver;
                    this._platformDirectives = _platformDirectives;
                    this._platformPipes = _platformPipes;
                    this._directiveCache = new Map();
                    this._pipeCache = new Map();
                    this._anonymousTypes = new Map();
                    this._anonymousTypeIndex = 0;
                    if (lang_1.isPresent(_reflector)) {
                        this._reflector = _reflector;
                    }
                    else {
                        this._reflector = reflection_1.reflector;
                    }
                }
                RuntimeMetadataResolver.prototype.sanitizeTokenName = function (token) {
                    var identifier = lang_1.stringify(token);
                    if (identifier.indexOf('(') >= 0) {
                        // case: anonymous functions!
                        var found = this._anonymousTypes.get(token);
                        if (lang_1.isBlank(found)) {
                            this._anonymousTypes.set(token, this._anonymousTypeIndex++);
                            found = this._anonymousTypes.get(token);
                        }
                        identifier = "anonymous_token_" + found + "_";
                    }
                    return util_1.sanitizeIdentifier(identifier);
                };
                RuntimeMetadataResolver.prototype.getDirectiveMetadata = function (directiveType) {
                    var meta = this._directiveCache.get(directiveType);
                    if (lang_1.isBlank(meta)) {
                        var dirMeta = this._directiveResolver.resolve(directiveType);
                        var moduleUrl = null;
                        var templateMeta = null;
                        var changeDetectionStrategy = null;
                        var viewProviders = [];
                        if (dirMeta instanceof md.ComponentMetadata) {
                            assertions_1.assertArrayOfStrings('styles', dirMeta.styles);
                            var cmpMeta = dirMeta;
                            moduleUrl = calcModuleUrl(this._reflector, directiveType, cmpMeta);
                            var viewMeta = this._viewResolver.resolve(directiveType);
                            assertions_1.assertArrayOfStrings('styles', viewMeta.styles);
                            templateMeta = new cpl.CompileTemplateMetadata({
                                encapsulation: viewMeta.encapsulation,
                                template: viewMeta.template,
                                templateUrl: viewMeta.templateUrl,
                                styles: viewMeta.styles,
                                styleUrls: viewMeta.styleUrls
                            });
                            changeDetectionStrategy = cmpMeta.changeDetection;
                            if (lang_1.isPresent(dirMeta.viewProviders)) {
                                viewProviders = this.getProvidersMetadata(dirMeta.viewProviders);
                            }
                        }
                        var providers = [];
                        if (lang_1.isPresent(dirMeta.providers)) {
                            providers = this.getProvidersMetadata(dirMeta.providers);
                        }
                        var queries = [];
                        var viewQueries = [];
                        if (lang_1.isPresent(dirMeta.queries)) {
                            queries = this.getQueriesMetadata(dirMeta.queries, false);
                            viewQueries = this.getQueriesMetadata(dirMeta.queries, true);
                        }
                        meta = cpl.CompileDirectiveMetadata.create({
                            selector: dirMeta.selector,
                            exportAs: dirMeta.exportAs,
                            isComponent: lang_1.isPresent(templateMeta),
                            type: this.getTypeMetadata(directiveType, moduleUrl),
                            template: templateMeta,
                            changeDetection: changeDetectionStrategy,
                            inputs: dirMeta.inputs,
                            outputs: dirMeta.outputs,
                            host: dirMeta.host,
                            lifecycleHooks: lifecycle_hooks_1.LIFECYCLE_HOOKS_VALUES.filter(function (hook) { return directive_lifecycle_reflector_1.hasLifecycleHook(hook, directiveType); }),
                            providers: providers,
                            viewProviders: viewProviders,
                            queries: queries,
                            viewQueries: viewQueries
                        });
                        this._directiveCache.set(directiveType, meta);
                    }
                    return meta;
                };
                RuntimeMetadataResolver.prototype.getTypeMetadata = function (type, moduleUrl) {
                    return new cpl.CompileTypeMetadata({
                        name: this.sanitizeTokenName(type),
                        moduleUrl: moduleUrl,
                        runtime: type,
                        diDeps: this.getDependenciesMetadata(type, null)
                    });
                };
                RuntimeMetadataResolver.prototype.getFactoryMetadata = function (factory, moduleUrl) {
                    return new cpl.CompileFactoryMetadata({
                        name: this.sanitizeTokenName(factory),
                        moduleUrl: moduleUrl,
                        runtime: factory,
                        diDeps: this.getDependenciesMetadata(factory, null)
                    });
                };
                RuntimeMetadataResolver.prototype.getPipeMetadata = function (pipeType) {
                    var meta = this._pipeCache.get(pipeType);
                    if (lang_1.isBlank(meta)) {
                        var pipeMeta = this._pipeResolver.resolve(pipeType);
                        var moduleUrl = this._reflector.importUri(pipeType);
                        meta = new cpl.CompilePipeMetadata({
                            type: this.getTypeMetadata(pipeType, moduleUrl),
                            name: pipeMeta.name,
                            pure: pipeMeta.pure,
                            lifecycleHooks: lifecycle_hooks_1.LIFECYCLE_HOOKS_VALUES.filter(function (hook) { return directive_lifecycle_reflector_1.hasLifecycleHook(hook, pipeType); }),
                        });
                        this._pipeCache.set(pipeType, meta);
                    }
                    return meta;
                };
                RuntimeMetadataResolver.prototype.getViewDirectivesMetadata = function (component) {
                    var _this = this;
                    var view = this._viewResolver.resolve(component);
                    var directives = flattenDirectives(view, this._platformDirectives);
                    for (var i = 0; i < directives.length; i++) {
                        if (!isValidType(directives[i])) {
                            throw new exceptions_1.BaseException("Unexpected directive value '" + lang_1.stringify(directives[i]) + "' on the View of component '" + lang_1.stringify(component) + "'");
                        }
                    }
                    return directives.map(function (type) { return _this.getDirectiveMetadata(type); });
                };
                RuntimeMetadataResolver.prototype.getViewPipesMetadata = function (component) {
                    var _this = this;
                    var view = this._viewResolver.resolve(component);
                    var pipes = flattenPipes(view, this._platformPipes);
                    for (var i = 0; i < pipes.length; i++) {
                        if (!isValidType(pipes[i])) {
                            throw new exceptions_1.BaseException("Unexpected piped value '" + lang_1.stringify(pipes[i]) + "' on the View of component '" + lang_1.stringify(component) + "'");
                        }
                    }
                    return pipes.map(function (type) { return _this.getPipeMetadata(type); });
                };
                RuntimeMetadataResolver.prototype.getDependenciesMetadata = function (typeOrFunc, dependencies) {
                    var _this = this;
                    var deps;
                    try {
                        deps = reflective_provider_1.constructDependencies(typeOrFunc, dependencies);
                    }
                    catch (e) {
                        if (e instanceof reflective_exceptions_1.NoAnnotationError) {
                            deps = [];
                        }
                        else {
                            throw e;
                        }
                    }
                    return deps.map(function (dep) {
                        var compileToken;
                        var p = dep.properties.find(function (p) { return p instanceof dimd.AttributeMetadata; });
                        var isAttribute = false;
                        if (lang_1.isPresent(p)) {
                            compileToken = _this.getTokenMetadata(p.attributeName);
                            isAttribute = true;
                        }
                        else {
                            compileToken = _this.getTokenMetadata(dep.key.token);
                        }
                        var compileQuery = null;
                        var q = dep.properties.find(function (p) { return p instanceof dimd.QueryMetadata; });
                        if (lang_1.isPresent(q)) {
                            compileQuery = _this.getQueryMetadata(q, null);
                        }
                        return new cpl.CompileDiDependencyMetadata({
                            isAttribute: isAttribute,
                            isHost: dep.upperBoundVisibility instanceof metadata_1.HostMetadata,
                            isSelf: dep.upperBoundVisibility instanceof metadata_1.SelfMetadata,
                            isSkipSelf: dep.lowerBoundVisibility instanceof metadata_1.SkipSelfMetadata,
                            isOptional: dep.optional,
                            query: lang_1.isPresent(q) && !q.isViewQuery ? compileQuery : null,
                            viewQuery: lang_1.isPresent(q) && q.isViewQuery ? compileQuery : null,
                            token: compileToken
                        });
                    });
                };
                RuntimeMetadataResolver.prototype.getTokenMetadata = function (token) {
                    token = di_1.resolveForwardRef(token);
                    var compileToken;
                    if (lang_1.isString(token)) {
                        compileToken = new cpl.CompileTokenMetadata({ value: token });
                    }
                    else {
                        compileToken = new cpl.CompileTokenMetadata({
                            identifier: new cpl.CompileIdentifierMetadata({ runtime: token, name: this.sanitizeTokenName(token) })
                        });
                    }
                    return compileToken;
                };
                RuntimeMetadataResolver.prototype.getProvidersMetadata = function (providers) {
                    var _this = this;
                    return providers.map(function (provider) {
                        provider = di_1.resolveForwardRef(provider);
                        if (lang_1.isArray(provider)) {
                            return _this.getProvidersMetadata(provider);
                        }
                        else if (provider instanceof provider_1.Provider) {
                            return _this.getProviderMetadata(provider);
                        }
                        else {
                            return _this.getTypeMetadata(provider, null);
                        }
                    });
                };
                RuntimeMetadataResolver.prototype.getProviderMetadata = function (provider) {
                    var compileDeps;
                    if (lang_1.isPresent(provider.useClass)) {
                        compileDeps = this.getDependenciesMetadata(provider.useClass, provider.dependencies);
                    }
                    else if (lang_1.isPresent(provider.useFactory)) {
                        compileDeps = this.getDependenciesMetadata(provider.useFactory, provider.dependencies);
                    }
                    return new cpl.CompileProviderMetadata({
                        token: this.getTokenMetadata(provider.token),
                        useClass: lang_1.isPresent(provider.useClass) ? this.getTypeMetadata(provider.useClass, null) : null,
                        useValue: lang_1.isPresent(provider.useValue) ?
                            new cpl.CompileIdentifierMetadata({ runtime: provider.useValue }) :
                            null,
                        useFactory: lang_1.isPresent(provider.useFactory) ?
                            this.getFactoryMetadata(provider.useFactory, null) :
                            null,
                        useExisting: lang_1.isPresent(provider.useExisting) ? this.getTokenMetadata(provider.useExisting) :
                            null,
                        deps: compileDeps,
                        multi: provider.multi
                    });
                };
                RuntimeMetadataResolver.prototype.getQueriesMetadata = function (queries, isViewQuery) {
                    var _this = this;
                    var compileQueries = [];
                    collection_1.StringMapWrapper.forEach(queries, function (query, propertyName) {
                        if (query.isViewQuery === isViewQuery) {
                            compileQueries.push(_this.getQueryMetadata(query, propertyName));
                        }
                    });
                    return compileQueries;
                };
                RuntimeMetadataResolver.prototype.getQueryMetadata = function (q, propertyName) {
                    var _this = this;
                    var selectors;
                    if (q.isVarBindingQuery) {
                        selectors = q.varBindings.map(function (varName) { return _this.getTokenMetadata(varName); });
                    }
                    else {
                        selectors = [this.getTokenMetadata(q.selector)];
                    }
                    return new cpl.CompileQueryMetadata({
                        selectors: selectors,
                        first: q.first,
                        descendants: q.descendants,
                        propertyName: propertyName,
                        read: lang_1.isPresent(q.read) ? this.getTokenMetadata(q.read) : null
                    });
                };
                RuntimeMetadataResolver = __decorate([
                    di_2.Injectable(),
                    __param(3, di_2.Optional()),
                    __param(3, di_2.Inject(platform_directives_and_pipes_1.PLATFORM_DIRECTIVES)),
                    __param(4, di_2.Optional()),
                    __param(4, di_2.Inject(platform_directives_and_pipes_1.PLATFORM_PIPES)), 
                    __metadata('design:paramtypes', [directive_resolver_1.DirectiveResolver, pipe_resolver_1.PipeResolver, view_resolver_1.ViewResolver, Array, Array, reflector_reader_1.ReflectorReader])
                ], RuntimeMetadataResolver);
                return RuntimeMetadataResolver;
            }());
            exports_1("RuntimeMetadataResolver", RuntimeMetadataResolver);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9ydW50aW1lX21ldGFkYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBMFRBLDJCQUEyQixJQUFrQixFQUFFLGtCQUF5QjtRQUN0RSxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDcEIsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBQ0QsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUNwQixDQUFDO0lBRUQsc0JBQXNCLElBQWtCLEVBQUUsYUFBb0I7UUFDNUQsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2YsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsWUFBWSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELHNCQUFzQixJQUFXLEVBQUUsR0FBd0I7UUFDekQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFF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QVMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsRUFBOUIsQ0FBOEIsQ0FBQyxDQUFDO29CQUMzRSxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDbEQsQ0FBQztvQkFDRCxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsb0JBQW9CLENBQUM7d0JBQ2xDLFNBQVMsRUFBRSxTQUFTO3dCQUNwQixLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUs7d0JBQ2QsV0FBVyxFQUFFLENBQUMsQ0FBQyxXQUFXO3dCQUMxQixZQUFZLEVBQUUsWUFBWTt3QkFDMUIsSUFBSSxFQUFFLGdCQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSTtxQkFDL0QsQ0FBQyxDQUFDO2dCQUNMLENBQUM7Z0JBN1FIO29CQUFDLGVBQVUsRUFBRTsrQkFVRSxhQUFRLEVBQUU7K0JBQUUsV0FBTSxDQUFDLG1EQUFtQixDQUFDOytCQUN2QyxhQUFRLEVBQUU7K0JBQUUsV0FBTSxDQUFDLDhDQUFjLENBQUM7OzJDQVhwQztnQkE4UWIsOEJBQUM7WUFBRCxDQTdRQSxBQTZRQyxJQUFBO1lBN1FELDZEQTZRQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9ydW50aW1lX21ldGFkYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtyZXNvbHZlRm9yd2FyZFJlZn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtcbiAgVHlwZSxcbiAgaXNCbGFuayxcbiAgaXNQcmVzZW50LFxuICBpc0FycmF5LFxuICBzdHJpbmdpZnksXG4gIGlzU3RyaW5nLFxuICBSZWdFeHBXcmFwcGVyLFxuICBTdHJpbmdXcmFwcGVyXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge1N0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge05vQW5ub3RhdGlvbkVycm9yfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaS9yZWZsZWN0aXZlX2V4Y2VwdGlvbnMnO1xuaW1wb3J0ICogYXMgY3BsIGZyb20gJy4vY29tcGlsZV9tZXRhZGF0YSc7XG5pbXBvcnQgKiBhcyBtZCBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9tZXRhZGF0YS9kaXJlY3RpdmVzJztcbmltcG9ydCAqIGFzIGRpbWQgZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbWV0YWRhdGEvZGknO1xuaW1wb3J0IHtEaXJlY3RpdmVSZXNvbHZlcn0gZnJvbSAnLi9kaXJlY3RpdmVfcmVzb2x2ZXInO1xuaW1wb3J0IHtQaXBlUmVzb2x2ZXJ9IGZyb20gJy4vcGlwZV9yZXNvbHZlcic7XG5pbXBvcnQge1ZpZXdSZXNvbHZlcn0gZnJvbSAnLi92aWV3X3Jlc29sdmVyJztcbmltcG9ydCB7Vmlld01ldGFkYXRhfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9tZXRhZGF0YS92aWV3JztcbmltcG9ydCB7aGFzTGlmZWN5Y2xlSG9va30gZnJvbSAnLi9kaXJlY3RpdmVfbGlmZWN5Y2xlX3JlZmxlY3Rvcic7XG5pbXBvcnQge0xpZmVjeWNsZUhvb2tzLCBMSUZFQ1lDTEVfSE9PS1NfVkFMVUVTfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9tZXRhZGF0YS9saWZlY3ljbGVfaG9va3MnO1xuaW1wb3J0IHtyZWZsZWN0b3J9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlZmxlY3Rpb24vcmVmbGVjdGlvbic7XG5pbXBvcnQge0luamVjdGFibGUsIEluamVjdCwgT3B0aW9uYWx9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7UExBVEZPUk1fRElSRUNUSVZFUywgUExBVEZPUk1fUElQRVN9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3BsYXRmb3JtX2RpcmVjdGl2ZXNfYW5kX3BpcGVzJztcbmltcG9ydCB7TU9EVUxFX1NVRkZJWCwgc2FuaXRpemVJZGVudGlmaWVyfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHthc3NlcnRBcnJheU9mU3RyaW5nc30gZnJvbSAnLi9hc3NlcnRpb25zJztcbmltcG9ydCB7Z2V0VXJsU2NoZW1lfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvdXJsX3Jlc29sdmVyJztcbmltcG9ydCB7UHJvdmlkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpL3Byb3ZpZGVyJztcbmltcG9ydCB7XG4gIGNvbnN0cnVjdERlcGVuZGVuY2llcyxcbiAgUmVmbGVjdGl2ZURlcGVuZGVuY3lcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGkvcmVmbGVjdGl2ZV9wcm92aWRlcic7XG5pbXBvcnQge1xuICBPcHRpb25hbE1ldGFkYXRhLFxuICBTZWxmTWV0YWRhdGEsXG4gIEhvc3RNZXRhZGF0YSxcbiAgU2tpcFNlbGZNZXRhZGF0YVxufSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaS9tZXRhZGF0YSc7XG5pbXBvcnQge1JlZmxlY3RvclJlYWRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVmbGVjdGlvbi9yZWZsZWN0b3JfcmVhZGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJ1bnRpbWVNZXRhZGF0YVJlc29sdmVyIHtcbiAgcHJpdmF0ZSBfZGlyZWN0aXZlQ2FjaGUgPSBuZXcgTWFwPFR5cGUsIGNwbC5Db21waWxlRGlyZWN0aXZlTWV0YWRhdGE+KCk7XG4gIHByaXZhdGUgX3BpcGVDYWNoZSA9IG5ldyBNYXA8VHlwZSwgY3BsLkNvbXBpbGVQaXBlTWV0YWRhdGE+KCk7XG4gIHByaXZhdGUgX2Fub255bW91c1R5cGVzID0gbmV3IE1hcDxPYmplY3QsIG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfYW5vbnltb3VzVHlwZUluZGV4ID0gMDtcbiAgcHJpdmF0ZSBfcmVmbGVjdG9yOiBSZWZsZWN0b3JSZWFkZXI7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGlyZWN0aXZlUmVzb2x2ZXI6IERpcmVjdGl2ZVJlc29sdmVyLCBwcml2YXRlIF9waXBlUmVzb2x2ZXI6IFBpcGVSZXNvbHZlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfdmlld1Jlc29sdmVyOiBWaWV3UmVzb2x2ZXIsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoUExBVEZPUk1fRElSRUNUSVZFUykgcHJpdmF0ZSBfcGxhdGZvcm1EaXJlY3RpdmVzOiBUeXBlW10sXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoUExBVEZPUk1fUElQRVMpIHByaXZhdGUgX3BsYXRmb3JtUGlwZXM6IFR5cGVbXSxcbiAgICAgICAgICAgICAgX3JlZmxlY3Rvcj86IFJlZmxlY3RvclJlYWRlcikge1xuICAgIGlmIChpc1ByZXNlbnQoX3JlZmxlY3RvcikpIHtcbiAgICAgIHRoaXMuX3JlZmxlY3RvciA9IF9yZWZsZWN0b3I7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3JlZmxlY3RvciA9IHJlZmxlY3RvcjtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNhbml0aXplVG9rZW5OYW1lKHRva2VuOiBhbnkpOiBzdHJpbmcge1xuICAgIGxldCBpZGVudGlmaWVyID0gc3RyaW5naWZ5KHRva2VuKTtcbiAgICBpZiAoaWRlbnRpZmllci5pbmRleE9mKCcoJykgPj0gMCkge1xuICAgICAgLy8gY2FzZTogYW5vbnltb3VzIGZ1bmN0aW9ucyFcbiAgICAgIGxldCBmb3VuZCA9IHRoaXMuX2Fub255bW91c1R5cGVzLmdldCh0b2tlbik7XG4gICAgICBpZiAoaXNCbGFuayhmb3VuZCkpIHtcbiAgICAgICAgdGhpcy5fYW5vbnltb3VzVHlwZXMuc2V0KHRva2VuLCB0aGlzLl9hbm9ueW1vdXNUeXBlSW5kZXgrKyk7XG4gICAgICAgIGZvdW5kID0gdGhpcy5fYW5vbnltb3VzVHlwZXMuZ2V0KHRva2VuKTtcbiAgICAgIH1cbiAgICAgIGlkZW50aWZpZXIgPSBgYW5vbnltb3VzX3Rva2VuXyR7Zm91bmR9X2A7XG4gICAgfVxuICAgIHJldHVybiBzYW5pdGl6ZUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gIH1cblxuICBnZXREaXJlY3RpdmVNZXRhZGF0YShkaXJlY3RpdmVUeXBlOiBUeXBlKTogY3BsLkNvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSB7XG4gICAgdmFyIG1ldGEgPSB0aGlzLl9kaXJlY3RpdmVDYWNoZS5nZXQoZGlyZWN0aXZlVHlwZSk7XG4gICAgaWYgKGlzQmxhbmsobWV0YSkpIHtcbiAgICAgIHZhciBkaXJNZXRhID0gdGhpcy5fZGlyZWN0aXZlUmVzb2x2ZXIucmVzb2x2ZShkaXJlY3RpdmVUeXBlKTtcbiAgICAgIHZhciBtb2R1bGVVcmwgPSBudWxsO1xuICAgICAgdmFyIHRlbXBsYXRlTWV0YSA9IG51bGw7XG4gICAgICB2YXIgY2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgPSBudWxsO1xuICAgICAgdmFyIHZpZXdQcm92aWRlcnMgPSBbXTtcblxuICAgICAgaWYgKGRpck1ldGEgaW5zdGFuY2VvZiBtZC5Db21wb25lbnRNZXRhZGF0YSkge1xuICAgICAgICBhc3NlcnRBcnJheU9mU3RyaW5ncygnc3R5bGVzJywgZGlyTWV0YS5zdHlsZXMpO1xuICAgICAgICB2YXIgY21wTWV0YSA9IDxtZC5Db21wb25lbnRNZXRhZGF0YT5kaXJNZXRhO1xuICAgICAgICBtb2R1bGVVcmwgPSBjYWxjTW9kdWxlVXJsKHRoaXMuX3JlZmxlY3RvciwgZGlyZWN0aXZlVHlwZSwgY21wTWV0YSk7XG4gICAgICAgIHZhciB2aWV3TWV0YSA9IHRoaXMuX3ZpZXdSZXNvbHZlci5yZXNvbHZlKGRpcmVjdGl2ZVR5cGUpO1xuICAgICAgICBhc3NlcnRBcnJheU9mU3RyaW5ncygnc3R5bGVzJywgdmlld01ldGEuc3R5bGVzKTtcbiAgICAgICAgdGVtcGxhdGVNZXRhID0gbmV3IGNwbC5Db21waWxlVGVtcGxhdGVNZXRhZGF0YSh7XG4gICAgICAgICAgZW5jYXBzdWxhdGlvbjogdmlld01ldGEuZW5jYXBzdWxhdGlvbixcbiAgICAgICAgICB0ZW1wbGF0ZTogdmlld01ldGEudGVtcGxhdGUsXG4gICAgICAgICAgdGVtcGxhdGVVcmw6IHZpZXdNZXRhLnRlbXBsYXRlVXJsLFxuICAgICAgICAgIHN0eWxlczogdmlld01ldGEuc3R5bGVzLFxuICAgICAgICAgIHN0eWxlVXJsczogdmlld01ldGEuc3R5bGVVcmxzXG4gICAgICAgIH0pO1xuICAgICAgICBjaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSA9IGNtcE1ldGEuY2hhbmdlRGV0ZWN0aW9uO1xuICAgICAgICBpZiAoaXNQcmVzZW50KGRpck1ldGEudmlld1Byb3ZpZGVycykpIHtcbiAgICAgICAgICB2aWV3UHJvdmlkZXJzID0gdGhpcy5nZXRQcm92aWRlcnNNZXRhZGF0YShkaXJNZXRhLnZpZXdQcm92aWRlcnMpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBwcm92aWRlcnMgPSBbXTtcbiAgICAgIGlmIChpc1ByZXNlbnQoZGlyTWV0YS5wcm92aWRlcnMpKSB7XG4gICAgICAgIHByb3ZpZGVycyA9IHRoaXMuZ2V0UHJvdmlkZXJzTWV0YWRhdGEoZGlyTWV0YS5wcm92aWRlcnMpO1xuICAgICAgfVxuICAgICAgdmFyIHF1ZXJpZXMgPSBbXTtcbiAgICAgIHZhciB2aWV3UXVlcmllcyA9IFtdO1xuICAgICAgaWYgKGlzUHJlc2VudChkaXJNZXRhLnF1ZXJpZXMpKSB7XG4gICAgICAgIHF1ZXJpZXMgPSB0aGlzLmdldFF1ZXJpZXNNZXRhZGF0YShkaXJNZXRhLnF1ZXJpZXMsIGZhbHNlKTtcbiAgICAgICAgdmlld1F1ZXJpZXMgPSB0aGlzLmdldFF1ZXJpZXNNZXRhZGF0YShkaXJNZXRhLnF1ZXJpZXMsIHRydWUpO1xuICAgICAgfVxuICAgICAgbWV0YSA9IGNwbC5Db21waWxlRGlyZWN0aXZlTWV0YWRhdGEuY3JlYXRlKHtcbiAgICAgICAgc2VsZWN0b3I6IGRpck1ldGEuc2VsZWN0b3IsXG4gICAgICAgIGV4cG9ydEFzOiBkaXJNZXRhLmV4cG9ydEFzLFxuICAgICAgICBpc0NvbXBvbmVudDogaXNQcmVzZW50KHRlbXBsYXRlTWV0YSksXG4gICAgICAgIHR5cGU6IHRoaXMuZ2V0VHlwZU1ldGFkYXRhKGRpcmVjdGl2ZVR5cGUsIG1vZHVsZVVybCksXG4gICAgICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZU1ldGEsXG4gICAgICAgIGNoYW5nZURldGVjdGlvbjogY2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgICAgIGlucHV0czogZGlyTWV0YS5pbnB1dHMsXG4gICAgICAgIG91dHB1dHM6IGRpck1ldGEub3V0cHV0cyxcbiAgICAgICAgaG9zdDogZGlyTWV0YS5ob3N0LFxuICAgICAgICBsaWZlY3ljbGVIb29rczpcbiAgICAgICAgICAgIExJRkVDWUNMRV9IT09LU19WQUxVRVMuZmlsdGVyKGhvb2sgPT4gaGFzTGlmZWN5Y2xlSG9vayhob29rLCBkaXJlY3RpdmVUeXBlKSksXG4gICAgICAgIHByb3ZpZGVyczogcHJvdmlkZXJzLFxuICAgICAgICB2aWV3UHJvdmlkZXJzOiB2aWV3UHJvdmlkZXJzLFxuICAgICAgICBxdWVyaWVzOiBxdWVyaWVzLFxuICAgICAgICB2aWV3UXVlcmllczogdmlld1F1ZXJpZXNcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fZGlyZWN0aXZlQ2FjaGUuc2V0KGRpcmVjdGl2ZVR5cGUsIG1ldGEpO1xuICAgIH1cbiAgICByZXR1cm4gbWV0YTtcbiAgfVxuXG4gIGdldFR5cGVNZXRhZGF0YSh0eXBlOiBUeXBlLCBtb2R1bGVVcmw6IHN0cmluZyk6IGNwbC5Db21waWxlVHlwZU1ldGFkYXRhIHtcbiAgICByZXR1cm4gbmV3IGNwbC5Db21waWxlVHlwZU1ldGFkYXRhKHtcbiAgICAgIG5hbWU6IHRoaXMuc2FuaXRpemVUb2tlbk5hbWUodHlwZSksXG4gICAgICBtb2R1bGVVcmw6IG1vZHVsZVVybCxcbiAgICAgIHJ1bnRpbWU6IHR5cGUsXG4gICAgICBkaURlcHM6IHRoaXMuZ2V0RGVwZW5kZW5jaWVzTWV0YWRhdGEodHlwZSwgbnVsbClcbiAgICB9KTtcbiAgfVxuXG4gIGdldEZhY3RvcnlNZXRhZGF0YShmYWN0b3J5OiBGdW5jdGlvbiwgbW9kdWxlVXJsOiBzdHJpbmcpOiBjcGwuQ29tcGlsZUZhY3RvcnlNZXRhZGF0YSB7XG4gICAgcmV0dXJuIG5ldyBjcGwuQ29tcGlsZUZhY3RvcnlNZXRhZGF0YSh7XG4gICAgICBuYW1lOiB0aGlzLnNhbml0aXplVG9rZW5OYW1lKGZhY3RvcnkpLFxuICAgICAgbW9kdWxlVXJsOiBtb2R1bGVVcmwsXG4gICAgICBydW50aW1lOiBmYWN0b3J5LFxuICAgICAgZGlEZXBzOiB0aGlzLmdldERlcGVuZGVuY2llc01ldGFkYXRhKGZhY3RvcnksIG51bGwpXG4gICAgfSk7XG4gIH1cblxuICBnZXRQaXBlTWV0YWRhdGEocGlwZVR5cGU6IFR5cGUpOiBjcGwuQ29tcGlsZVBpcGVNZXRhZGF0YSB7XG4gICAgdmFyIG1ldGEgPSB0aGlzLl9waXBlQ2FjaGUuZ2V0KHBpcGVUeXBlKTtcbiAgICBpZiAoaXNCbGFuayhtZXRhKSkge1xuICAgICAgdmFyIHBpcGVNZXRhID0gdGhpcy5fcGlwZVJlc29sdmVyLnJlc29sdmUocGlwZVR5cGUpO1xuICAgICAgdmFyIG1vZHVsZVVybCA9IHRoaXMuX3JlZmxlY3Rvci5pbXBvcnRVcmkocGlwZVR5cGUpO1xuICAgICAgbWV0YSA9IG5ldyBjcGwuQ29tcGlsZVBpcGVNZXRhZGF0YSh7XG4gICAgICAgIHR5cGU6IHRoaXMuZ2V0VHlwZU1ldGFkYXRhKHBpcGVUeXBlLCBtb2R1bGVVcmwpLFxuICAgICAgICBuYW1lOiBwaXBlTWV0YS5uYW1lLFxuICAgICAgICBwdXJlOiBwaXBlTWV0YS5wdXJlLFxuICAgICAgICBsaWZlY3ljbGVIb29rczogTElGRUNZQ0xFX0hPT0tTX1ZBTFVFUy5maWx0ZXIoaG9vayA9PiBoYXNMaWZlY3ljbGVIb29rKGhvb2ssIHBpcGVUeXBlKSksXG4gICAgICB9KTtcbiAgICAgIHRoaXMuX3BpcGVDYWNoZS5zZXQocGlwZVR5cGUsIG1ldGEpO1xuICAgIH1cbiAgICByZXR1cm4gbWV0YTtcbiAgfVxuXG4gIGdldFZpZXdEaXJlY3RpdmVzTWV0YWRhdGEoY29tcG9uZW50OiBUeXBlKTogY3BsLkNvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YVtdIHtcbiAgICB2YXIgdmlldyA9IHRoaXMuX3ZpZXdSZXNvbHZlci5yZXNvbHZlKGNvbXBvbmVudCk7XG4gICAgdmFyIGRpcmVjdGl2ZXMgPSBmbGF0dGVuRGlyZWN0aXZlcyh2aWV3LCB0aGlzLl9wbGF0Zm9ybURpcmVjdGl2ZXMpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGlyZWN0aXZlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCFpc1ZhbGlkVHlwZShkaXJlY3RpdmVzW2ldKSkge1xuICAgICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcbiAgICAgICAgICAgIGBVbmV4cGVjdGVkIGRpcmVjdGl2ZSB2YWx1ZSAnJHtzdHJpbmdpZnkoZGlyZWN0aXZlc1tpXSl9JyBvbiB0aGUgVmlldyBvZiBjb21wb25lbnQgJyR7c3RyaW5naWZ5KGNvbXBvbmVudCl9J2ApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkaXJlY3RpdmVzLm1hcCh0eXBlID0+IHRoaXMuZ2V0RGlyZWN0aXZlTWV0YWRhdGEodHlwZSkpO1xuICB9XG5cbiAgZ2V0Vmlld1BpcGVzTWV0YWRhdGEoY29tcG9uZW50OiBUeXBlKTogY3BsLkNvbXBpbGVQaXBlTWV0YWRhdGFbXSB7XG4gICAgdmFyIHZpZXcgPSB0aGlzLl92aWV3UmVzb2x2ZXIucmVzb2x2ZShjb21wb25lbnQpO1xuICAgIHZhciBwaXBlcyA9IGZsYXR0ZW5QaXBlcyh2aWV3LCB0aGlzLl9wbGF0Zm9ybVBpcGVzKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBpcGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoIWlzVmFsaWRUeXBlKHBpcGVzW2ldKSkge1xuICAgICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcbiAgICAgICAgICAgIGBVbmV4cGVjdGVkIHBpcGVkIHZhbHVlICcke3N0cmluZ2lmeShwaXBlc1tpXSl9JyBvbiB0aGUgVmlldyBvZiBjb21wb25lbnQgJyR7c3RyaW5naWZ5KGNvbXBvbmVudCl9J2ApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcGlwZXMubWFwKHR5cGUgPT4gdGhpcy5nZXRQaXBlTWV0YWRhdGEodHlwZSkpO1xuICB9XG5cbiAgZ2V0RGVwZW5kZW5jaWVzTWV0YWRhdGEodHlwZU9yRnVuYzogVHlwZSB8IEZ1bmN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBlbmRlbmNpZXM6IGFueVtdKTogY3BsLkNvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YVtdIHtcbiAgICB2YXIgZGVwczogUmVmbGVjdGl2ZURlcGVuZGVuY3lbXTtcbiAgICB0cnkge1xuICAgICAgZGVwcyA9IGNvbnN0cnVjdERlcGVuZGVuY2llcyh0eXBlT3JGdW5jLCBkZXBlbmRlbmNpZXMpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlIGluc3RhbmNlb2YgTm9Bbm5vdGF0aW9uRXJyb3IpIHtcbiAgICAgICAgZGVwcyA9IFtdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRlcHMubWFwKChkZXApID0+IHtcbiAgICAgIHZhciBjb21waWxlVG9rZW47XG4gICAgICB2YXIgcCA9IDxkaW1kLkF0dHJpYnV0ZU1ldGFkYXRhPmRlcC5wcm9wZXJ0aWVzLmZpbmQocCA9PiBwIGluc3RhbmNlb2YgZGltZC5BdHRyaWJ1dGVNZXRhZGF0YSk7XG4gICAgICB2YXIgaXNBdHRyaWJ1dGUgPSBmYWxzZTtcbiAgICAgIGlmIChpc1ByZXNlbnQocCkpIHtcbiAgICAgICAgY29tcGlsZVRva2VuID0gdGhpcy5nZXRUb2tlbk1ldGFkYXRhKHAuYXR0cmlidXRlTmFtZSk7XG4gICAgICAgIGlzQXR0cmlidXRlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbXBpbGVUb2tlbiA9IHRoaXMuZ2V0VG9rZW5NZXRhZGF0YShkZXAua2V5LnRva2VuKTtcbiAgICAgIH1cbiAgICAgIHZhciBjb21waWxlUXVlcnkgPSBudWxsO1xuICAgICAgdmFyIHEgPSA8ZGltZC5RdWVyeU1ldGFkYXRhPmRlcC5wcm9wZXJ0aWVzLmZpbmQocCA9PiBwIGluc3RhbmNlb2YgZGltZC5RdWVyeU1ldGFkYXRhKTtcbiAgICAgIGlmIChpc1ByZXNlbnQocSkpIHtcbiAgICAgICAgY29tcGlsZVF1ZXJ5ID0gdGhpcy5nZXRRdWVyeU1ldGFkYXRhKHEsIG51bGwpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBjcGwuQ29tcGlsZURpRGVwZW5kZW5jeU1ldGFkYXRhKHtcbiAgICAgICAgaXNBdHRyaWJ1dGU6IGlzQXR0cmlidXRlLFxuICAgICAgICBpc0hvc3Q6IGRlcC51cHBlckJvdW5kVmlzaWJpbGl0eSBpbnN0YW5jZW9mIEhvc3RNZXRhZGF0YSxcbiAgICAgICAgaXNTZWxmOiBkZXAudXBwZXJCb3VuZFZpc2liaWxpdHkgaW5zdGFuY2VvZiBTZWxmTWV0YWRhdGEsXG4gICAgICAgIGlzU2tpcFNlbGY6IGRlcC5sb3dlckJvdW5kVmlzaWJpbGl0eSBpbnN0YW5jZW9mIFNraXBTZWxmTWV0YWRhdGEsXG4gICAgICAgIGlzT3B0aW9uYWw6IGRlcC5vcHRpb25hbCxcbiAgICAgICAgcXVlcnk6IGlzUHJlc2VudChxKSAmJiAhcS5pc1ZpZXdRdWVyeSA/IGNvbXBpbGVRdWVyeSA6IG51bGwsXG4gICAgICAgIHZpZXdRdWVyeTogaXNQcmVzZW50KHEpICYmIHEuaXNWaWV3UXVlcnkgPyBjb21waWxlUXVlcnkgOiBudWxsLFxuICAgICAgICB0b2tlbjogY29tcGlsZVRva2VuXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFRva2VuTWV0YWRhdGEodG9rZW46IGFueSk6IGNwbC5Db21waWxlVG9rZW5NZXRhZGF0YSB7XG4gICAgdG9rZW4gPSByZXNvbHZlRm9yd2FyZFJlZih0b2tlbik7XG4gICAgdmFyIGNvbXBpbGVUb2tlbjtcbiAgICBpZiAoaXNTdHJpbmcodG9rZW4pKSB7XG4gICAgICBjb21waWxlVG9rZW4gPSBuZXcgY3BsLkNvbXBpbGVUb2tlbk1ldGFkYXRhKHt2YWx1ZTogdG9rZW59KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29tcGlsZVRva2VuID0gbmV3IGNwbC5Db21waWxlVG9rZW5NZXRhZGF0YSh7XG4gICAgICAgIGlkZW50aWZpZXI6IG5ldyBjcGwuQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YShcbiAgICAgICAgICAgIHtydW50aW1lOiB0b2tlbiwgbmFtZTogdGhpcy5zYW5pdGl6ZVRva2VuTmFtZSh0b2tlbil9KVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBjb21waWxlVG9rZW47XG4gIH1cblxuICBnZXRQcm92aWRlcnNNZXRhZGF0YShwcm92aWRlcnM6IGFueVtdKTpcbiAgICAgIEFycmF5PGNwbC5Db21waWxlUHJvdmlkZXJNZXRhZGF0YSB8IGNwbC5Db21waWxlVHlwZU1ldGFkYXRhIHwgYW55W10+IHtcbiAgICByZXR1cm4gcHJvdmlkZXJzLm1hcCgocHJvdmlkZXIpID0+IHtcbiAgICAgIHByb3ZpZGVyID0gcmVzb2x2ZUZvcndhcmRSZWYocHJvdmlkZXIpO1xuICAgICAgaWYgKGlzQXJyYXkocHJvdmlkZXIpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFByb3ZpZGVyc01ldGFkYXRhKHByb3ZpZGVyKTtcbiAgICAgIH0gZWxzZSBpZiAocHJvdmlkZXIgaW5zdGFuY2VvZiBQcm92aWRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm92aWRlck1ldGFkYXRhKHByb3ZpZGVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFR5cGVNZXRhZGF0YShwcm92aWRlciwgbnVsbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXRQcm92aWRlck1ldGFkYXRhKHByb3ZpZGVyOiBQcm92aWRlcik6IGNwbC5Db21waWxlUHJvdmlkZXJNZXRhZGF0YSB7XG4gICAgdmFyIGNvbXBpbGVEZXBzO1xuICAgIGlmIChpc1ByZXNlbnQocHJvdmlkZXIudXNlQ2xhc3MpKSB7XG4gICAgICBjb21waWxlRGVwcyA9IHRoaXMuZ2V0RGVwZW5kZW5jaWVzTWV0YWRhdGEocHJvdmlkZXIudXNlQ2xhc3MsIHByb3ZpZGVyLmRlcGVuZGVuY2llcyk7XG4gICAgfSBlbHNlIGlmIChpc1ByZXNlbnQocHJvdmlkZXIudXNlRmFjdG9yeSkpIHtcbiAgICAgIGNvbXBpbGVEZXBzID0gdGhpcy5nZXREZXBlbmRlbmNpZXNNZXRhZGF0YShwcm92aWRlci51c2VGYWN0b3J5LCBwcm92aWRlci5kZXBlbmRlbmNpZXMpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IGNwbC5Db21waWxlUHJvdmlkZXJNZXRhZGF0YSh7XG4gICAgICB0b2tlbjogdGhpcy5nZXRUb2tlbk1ldGFkYXRhKHByb3ZpZGVyLnRva2VuKSxcbiAgICAgIHVzZUNsYXNzOiBpc1ByZXNlbnQocHJvdmlkZXIudXNlQ2xhc3MpID8gdGhpcy5nZXRUeXBlTWV0YWRhdGEocHJvdmlkZXIudXNlQ2xhc3MsIG51bGwpIDogbnVsbCxcbiAgICAgIHVzZVZhbHVlOiBpc1ByZXNlbnQocHJvdmlkZXIudXNlVmFsdWUpID9cbiAgICAgICAgICAgICAgICAgICAgbmV3IGNwbC5Db21waWxlSWRlbnRpZmllck1ldGFkYXRhKHtydW50aW1lOiBwcm92aWRlci51c2VWYWx1ZX0pIDpcbiAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgIHVzZUZhY3Rvcnk6IGlzUHJlc2VudChwcm92aWRlci51c2VGYWN0b3J5KSA/XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRGYWN0b3J5TWV0YWRhdGEocHJvdmlkZXIudXNlRmFjdG9yeSwgbnVsbCkgOlxuICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICB1c2VFeGlzdGluZzogaXNQcmVzZW50KHByb3ZpZGVyLnVzZUV4aXN0aW5nKSA/IHRoaXMuZ2V0VG9rZW5NZXRhZGF0YShwcm92aWRlci51c2VFeGlzdGluZykgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgZGVwczogY29tcGlsZURlcHMsXG4gICAgICBtdWx0aTogcHJvdmlkZXIubXVsdGlcbiAgICB9KTtcbiAgfVxuXG4gIGdldFF1ZXJpZXNNZXRhZGF0YShxdWVyaWVzOiB7W2tleTogc3RyaW5nXTogZGltZC5RdWVyeU1ldGFkYXRhfSxcbiAgICAgICAgICAgICAgICAgICAgIGlzVmlld1F1ZXJ5OiBib29sZWFuKTogY3BsLkNvbXBpbGVRdWVyeU1ldGFkYXRhW10ge1xuICAgIHZhciBjb21waWxlUXVlcmllcyA9IFtdO1xuICAgIFN0cmluZ01hcFdyYXBwZXIuZm9yRWFjaChxdWVyaWVzLCAocXVlcnksIHByb3BlcnR5TmFtZSkgPT4ge1xuICAgICAgaWYgKHF1ZXJ5LmlzVmlld1F1ZXJ5ID09PSBpc1ZpZXdRdWVyeSkge1xuICAgICAgICBjb21waWxlUXVlcmllcy5wdXNoKHRoaXMuZ2V0UXVlcnlNZXRhZGF0YShxdWVyeSwgcHJvcGVydHlOYW1lKSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvbXBpbGVRdWVyaWVzO1xuICB9XG5cbiAgZ2V0UXVlcnlNZXRhZGF0YShxOiBkaW1kLlF1ZXJ5TWV0YWRhdGEsIHByb3BlcnR5TmFtZTogc3RyaW5nKTogY3BsLkNvbXBpbGVRdWVyeU1ldGFkYXRhIHtcbiAgICB2YXIgc2VsZWN0b3JzO1xuICAgIGlmIChxLmlzVmFyQmluZGluZ1F1ZXJ5KSB7XG4gICAgICBzZWxlY3RvcnMgPSBxLnZhckJpbmRpbmdzLm1hcCh2YXJOYW1lID0+IHRoaXMuZ2V0VG9rZW5NZXRhZGF0YSh2YXJOYW1lKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGVjdG9ycyA9IFt0aGlzLmdldFRva2VuTWV0YWRhdGEocS5zZWxlY3RvcildO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IGNwbC5Db21waWxlUXVlcnlNZXRhZGF0YSh7XG4gICAgICBzZWxlY3RvcnM6IHNlbGVjdG9ycyxcbiAgICAgIGZpcnN0OiBxLmZpcnN0LFxuICAgICAgZGVzY2VuZGFudHM6IHEuZGVzY2VuZGFudHMsXG4gICAgICBwcm9wZXJ0eU5hbWU6IHByb3BlcnR5TmFtZSxcbiAgICAgIHJlYWQ6IGlzUHJlc2VudChxLnJlYWQpID8gdGhpcy5nZXRUb2tlbk1ldGFkYXRhKHEucmVhZCkgOiBudWxsXG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZmxhdHRlbkRpcmVjdGl2ZXModmlldzogVmlld01ldGFkYXRhLCBwbGF0Zm9ybURpcmVjdGl2ZXM6IGFueVtdKTogVHlwZVtdIHtcbiAgbGV0IGRpcmVjdGl2ZXMgPSBbXTtcbiAgaWYgKGlzUHJlc2VudChwbGF0Zm9ybURpcmVjdGl2ZXMpKSB7XG4gICAgZmxhdHRlbkFycmF5KHBsYXRmb3JtRGlyZWN0aXZlcywgZGlyZWN0aXZlcyk7XG4gIH1cbiAgaWYgKGlzUHJlc2VudCh2aWV3LmRpcmVjdGl2ZXMpKSB7XG4gICAgZmxhdHRlbkFycmF5KHZpZXcuZGlyZWN0aXZlcywgZGlyZWN0aXZlcyk7XG4gIH1cbiAgcmV0dXJuIGRpcmVjdGl2ZXM7XG59XG5cbmZ1bmN0aW9uIGZsYXR0ZW5QaXBlcyh2aWV3OiBWaWV3TWV0YWRhdGEsIHBsYXRmb3JtUGlwZXM6IGFueVtdKTogVHlwZVtdIHtcbiAgbGV0IHBpcGVzID0gW107XG4gIGlmIChpc1ByZXNlbnQocGxhdGZvcm1QaXBlcykpIHtcbiAgICBmbGF0dGVuQXJyYXkocGxhdGZvcm1QaXBlcywgcGlwZXMpO1xuICB9XG4gIGlmIChpc1ByZXNlbnQodmlldy5waXBlcykpIHtcbiAgICBmbGF0dGVuQXJyYXkodmlldy5waXBlcywgcGlwZXMpO1xuICB9XG4gIHJldHVybiBwaXBlcztcbn1cblxuZnVuY3Rpb24gZmxhdHRlbkFycmF5KHRyZWU6IGFueVtdLCBvdXQ6IEFycmF5PFR5cGUgfCBhbnlbXT4pOiB2b2lkIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmVlLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSByZXNvbHZlRm9yd2FyZFJlZih0cmVlW2ldKTtcbiAgICBpZiAoaXNBcnJheShpdGVtKSkge1xuICAgICAgZmxhdHRlbkFycmF5KGl0ZW0sIG91dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpc1ZhbGlkVHlwZSh2YWx1ZTogVHlwZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gaXNQcmVzZW50KHZhbHVlKSAmJiAodmFsdWUgaW5zdGFuY2VvZiBUeXBlKTtcbn1cblxuZnVuY3Rpb24gY2FsY01vZHVsZVVybChyZWZsZWN0b3I6IFJlZmxlY3RvclJlYWRlciwgdHlwZTogVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgY21wTWV0YWRhdGE6IG1kLkNvbXBvbmVudE1ldGFkYXRhKTogc3RyaW5nIHtcbiAgdmFyIG1vZHVsZUlkID0gY21wTWV0YWRhdGEubW9kdWxlSWQ7XG4gIGlmIChpc1ByZXNlbnQobW9kdWxlSWQpKSB7XG4gICAgdmFyIHNjaGVtZSA9IGdldFVybFNjaGVtZShtb2R1bGVJZCk7XG4gICAgcmV0dXJuIGlzUHJlc2VudChzY2hlbWUpICYmIHNjaGVtZS5sZW5ndGggPiAwID8gbW9kdWxlSWQgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBwYWNrYWdlOiR7bW9kdWxlSWR9JHtNT0RVTEVfU1VGRklYfWA7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJlZmxlY3Rvci5pbXBvcnRVcmkodHlwZSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
