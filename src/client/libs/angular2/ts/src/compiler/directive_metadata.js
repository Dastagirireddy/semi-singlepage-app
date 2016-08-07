System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/collection', 'angular2/src/core/change_detection/change_detection', 'angular2/src/core/metadata/view', 'angular2/src/compiler/selector', './util', 'angular2/src/core/linker/interfaces'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lang_1, exceptions_1, collection_1, change_detection_1, view_1, selector_1, util_1, interfaces_1;
    var HOST_REG_EXP, CompileMetadataWithIdentifier, CompileMetadataWithType, CompileIdentifierMetadata, CompileDiDependencyMetadata, CompileProviderMetadata, CompileFactoryMetadata, CompileTypeMetadata, CompileQueryMetadata, CompileTemplateMetadata, CompileDirectiveMetadata, CompilePipeMetadata, _COMPILE_METADATA_FROM_JSON;
    /**
     * Construct {@link CompileDirectiveMetadata} from {@link ComponentTypeMetadata} and a selector.
     */
    function createHostComponentMeta(componentType, componentSelector) {
        var template = selector_1.CssSelector.parse(componentSelector)[0].getMatchingElementTemplate();
        return CompileDirectiveMetadata.create({
            type: new CompileTypeMetadata({
                runtime: Object,
                name: "Host" + componentType.name,
                moduleUrl: componentType.moduleUrl,
                isHost: true
            }),
            template: new CompileTemplateMetadata({ template: template, templateUrl: '', styles: [], styleUrls: [], ngContentSelectors: [] }),
            changeDetection: change_detection_1.ChangeDetectionStrategy.Default,
            inputs: [],
            outputs: [],
            host: {},
            lifecycleHooks: [],
            isComponent: true,
            dynamicLoadable: false,
            selector: '*',
            providers: [],
            viewProviders: [],
            queries: [],
            viewQueries: []
        });
    }
    exports_1("createHostComponentMeta", createHostComponentMeta);
    function arrayFromJson(obj, fn) {
        return lang_1.isBlank(obj) ? null : obj.map(function (o) { return objFromJson(o, fn); });
    }
    function arrayToJson(obj) {
        return lang_1.isBlank(obj) ? null : obj.map(objToJson);
    }
    function objFromJson(obj, fn) {
        return (lang_1.isString(obj) || lang_1.isBlank(obj)) ? obj : fn(obj);
    }
    function objToJson(obj) {
        return (lang_1.isString(obj) || lang_1.isBlank(obj)) ? obj : obj.toJson();
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
            function (change_detection_1_1) {
                change_detection_1 = change_detection_1_1;
            },
            function (view_1_1) {
                view_1 = view_1_1;
            },
            function (selector_1_1) {
                selector_1 = selector_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (interfaces_1_1) {
                interfaces_1 = interfaces_1_1;
            }],
        execute: function() {
            // group 1: "property" from "[property]"
            // group 2: "event" from "(event)"
            HOST_REG_EXP = /^(?:(?:\[([^\]]+)\])|(?:\(([^\)]+)\)))$/g;
            CompileMetadataWithIdentifier = (function () {
                function CompileMetadataWithIdentifier() {
                }
                CompileMetadataWithIdentifier.fromJson = function (data) {
                    return _COMPILE_METADATA_FROM_JSON[data['class']](data);
                };
                Object.defineProperty(CompileMetadataWithIdentifier.prototype, "identifier", {
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                return CompileMetadataWithIdentifier;
            }());
            exports_1("CompileMetadataWithIdentifier", CompileMetadataWithIdentifier);
            CompileMetadataWithType = (function (_super) {
                __extends(CompileMetadataWithType, _super);
                function CompileMetadataWithType() {
                    _super.apply(this, arguments);
                }
                CompileMetadataWithType.fromJson = function (data) {
                    return _COMPILE_METADATA_FROM_JSON[data['class']](data);
                };
                Object.defineProperty(CompileMetadataWithType.prototype, "type", {
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompileMetadataWithType.prototype, "identifier", {
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                return CompileMetadataWithType;
            }(CompileMetadataWithIdentifier));
            exports_1("CompileMetadataWithType", CompileMetadataWithType);
            CompileIdentifierMetadata = (function () {
                function CompileIdentifierMetadata(_a) {
                    var _b = _a === void 0 ? {} : _a, runtime = _b.runtime, name = _b.name, moduleUrl = _b.moduleUrl, prefix = _b.prefix, constConstructor = _b.constConstructor;
                    this.runtime = runtime;
                    this.name = name;
                    this.prefix = prefix;
                    this.moduleUrl = moduleUrl;
                    this.constConstructor = constConstructor;
                }
                CompileIdentifierMetadata.fromJson = function (data) {
                    return new CompileIdentifierMetadata({
                        name: data['name'],
                        prefix: data['prefix'],
                        moduleUrl: data['moduleUrl'],
                        constConstructor: data['constConstructor']
                    });
                };
                CompileIdentifierMetadata.prototype.toJson = function () {
                    return {
                        // Note: Runtime type can't be serialized...
                        'class': 'Identifier',
                        'name': this.name,
                        'moduleUrl': this.moduleUrl,
                        'prefix': this.prefix,
                        'constConstructor': this.constConstructor
                    };
                };
                Object.defineProperty(CompileIdentifierMetadata.prototype, "identifier", {
                    get: function () { return this; },
                    enumerable: true,
                    configurable: true
                });
                return CompileIdentifierMetadata;
            }());
            exports_1("CompileIdentifierMetadata", CompileIdentifierMetadata);
            CompileDiDependencyMetadata = (function () {
                function CompileDiDependencyMetadata(_a) {
                    var _b = _a === void 0 ? {} : _a, isAttribute = _b.isAttribute, isSelf = _b.isSelf, isHost = _b.isHost, isSkipSelf = _b.isSkipSelf, isOptional = _b.isOptional, query = _b.query, viewQuery = _b.viewQuery, token = _b.token;
                    this.isAttribute = lang_1.normalizeBool(isAttribute);
                    this.isSelf = lang_1.normalizeBool(isSelf);
                    this.isHost = lang_1.normalizeBool(isHost);
                    this.isSkipSelf = lang_1.normalizeBool(isSkipSelf);
                    this.isOptional = lang_1.normalizeBool(isOptional);
                    this.query = query;
                    this.viewQuery = viewQuery;
                    this.token = token;
                }
                CompileDiDependencyMetadata.fromJson = function (data) {
                    return new CompileDiDependencyMetadata({
                        token: objFromJson(data['token'], CompileIdentifierMetadata.fromJson),
                        query: objFromJson(data['query'], CompileQueryMetadata.fromJson),
                        viewQuery: objFromJson(data['viewQuery'], CompileQueryMetadata.fromJson),
                        isAttribute: data['isAttribute'],
                        isSelf: data['isSelf'],
                        isHost: data['isHost'],
                        isSkipSelf: data['isSkipSelf'],
                        isOptional: data['isOptional']
                    });
                };
                CompileDiDependencyMetadata.prototype.toJson = function () {
                    return {
                        // Note: Runtime type can't be serialized...
                        'token': objToJson(this.token),
                        'query': objToJson(this.query),
                        'viewQuery': objToJson(this.viewQuery),
                        'isAttribute': this.isAttribute,
                        'isSelf': this.isSelf,
                        'isHost': this.isHost,
                        'isSkipSelf': this.isSkipSelf,
                        'isOptional': this.isOptional
                    };
                };
                return CompileDiDependencyMetadata;
            }());
            exports_1("CompileDiDependencyMetadata", CompileDiDependencyMetadata);
            CompileProviderMetadata = (function () {
                function CompileProviderMetadata(_a) {
                    var token = _a.token, useClass = _a.useClass, useValue = _a.useValue, useExisting = _a.useExisting, useFactory = _a.useFactory, deps = _a.deps, multi = _a.multi;
                    this.token = token;
                    this.useClass = useClass;
                    this.useValue = useValue;
                    this.useExisting = useExisting;
                    this.useFactory = useFactory;
                    this.deps = deps;
                    this.multi = multi;
                }
                CompileProviderMetadata.fromJson = function (data) {
                    return new CompileProviderMetadata({
                        token: objFromJson(data['token'], CompileIdentifierMetadata.fromJson),
                        useClass: objFromJson(data['useClass'], CompileTypeMetadata.fromJson)
                    });
                };
                CompileProviderMetadata.prototype.toJson = function () {
                    return {
                        // Note: Runtime type can't be serialized...
                        'token': objToJson(this.token),
                        'useClass': objToJson(this.useClass)
                    };
                };
                return CompileProviderMetadata;
            }());
            exports_1("CompileProviderMetadata", CompileProviderMetadata);
            CompileFactoryMetadata = (function () {
                function CompileFactoryMetadata(_a) {
                    var runtime = _a.runtime, name = _a.name, moduleUrl = _a.moduleUrl, constConstructor = _a.constConstructor, diDeps = _a.diDeps;
                    this.runtime = runtime;
                    this.name = name;
                    this.moduleUrl = moduleUrl;
                    this.diDeps = diDeps;
                    this.constConstructor = constConstructor;
                }
                Object.defineProperty(CompileFactoryMetadata.prototype, "identifier", {
                    get: function () { return this; },
                    enumerable: true,
                    configurable: true
                });
                CompileFactoryMetadata.prototype.toJson = function () { return null; };
                return CompileFactoryMetadata;
            }());
            exports_1("CompileFactoryMetadata", CompileFactoryMetadata);
            /**
             * Metadata regarding compilation of a type.
             */
            CompileTypeMetadata = (function () {
                function CompileTypeMetadata(_a) {
                    var _b = _a === void 0 ? {} : _a, runtime = _b.runtime, name = _b.name, moduleUrl = _b.moduleUrl, prefix = _b.prefix, isHost = _b.isHost, constConstructor = _b.constConstructor, diDeps = _b.diDeps;
                    this.runtime = runtime;
                    this.name = name;
                    this.moduleUrl = moduleUrl;
                    this.prefix = prefix;
                    this.isHost = lang_1.normalizeBool(isHost);
                    this.constConstructor = constConstructor;
                    this.diDeps = lang_1.normalizeBlank(diDeps);
                }
                CompileTypeMetadata.fromJson = function (data) {
                    return new CompileTypeMetadata({
                        name: data['name'],
                        moduleUrl: data['moduleUrl'],
                        prefix: data['prefix'],
                        isHost: data['isHost'],
                        constConstructor: data['constConstructor'],
                        diDeps: arrayFromJson(data['diDeps'], CompileDiDependencyMetadata.fromJson)
                    });
                };
                Object.defineProperty(CompileTypeMetadata.prototype, "identifier", {
                    get: function () { return this; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompileTypeMetadata.prototype, "type", {
                    get: function () { return this; },
                    enumerable: true,
                    configurable: true
                });
                CompileTypeMetadata.prototype.toJson = function () {
                    return {
                        // Note: Runtime type can't be serialized...
                        'class': 'Type',
                        'name': this.name,
                        'moduleUrl': this.moduleUrl,
                        'prefix': this.prefix,
                        'isHost': this.isHost,
                        'constConstructor': this.constConstructor,
                        'diDeps': arrayToJson(this.diDeps)
                    };
                };
                return CompileTypeMetadata;
            }());
            exports_1("CompileTypeMetadata", CompileTypeMetadata);
            CompileQueryMetadata = (function () {
                function CompileQueryMetadata(_a) {
                    var _b = _a === void 0 ? {} : _a, selectors = _b.selectors, descendants = _b.descendants, first = _b.first, propertyName = _b.propertyName;
                    this.selectors = selectors;
                    this.descendants = descendants;
                    this.first = lang_1.normalizeBool(first);
                    this.propertyName = propertyName;
                }
                CompileQueryMetadata.fromJson = function (data) {
                    return new CompileQueryMetadata({
                        selectors: arrayFromJson(data['selectors'], CompileIdentifierMetadata.fromJson),
                        descendants: data['descendants'],
                        first: data['first'],
                        propertyName: data['propertyName']
                    });
                };
                CompileQueryMetadata.prototype.toJson = function () {
                    return {
                        // Note: Runtime type can't be serialized...
                        'selectors': arrayToJson(this.selectors),
                        'descendants': this.descendants,
                        'first': this.first,
                        'propertyName': this.propertyName
                    };
                };
                return CompileQueryMetadata;
            }());
            exports_1("CompileQueryMetadata", CompileQueryMetadata);
            /**
             * Metadata regarding compilation of a template.
             */
            CompileTemplateMetadata = (function () {
                function CompileTemplateMetadata(_a) {
                    var _b = _a === void 0 ? {} : _a, encapsulation = _b.encapsulation, template = _b.template, templateUrl = _b.templateUrl, styles = _b.styles, styleUrls = _b.styleUrls, ngContentSelectors = _b.ngContentSelectors;
                    this.encapsulation = lang_1.isPresent(encapsulation) ? encapsulation : view_1.ViewEncapsulation.Emulated;
                    this.template = template;
                    this.templateUrl = templateUrl;
                    this.styles = lang_1.isPresent(styles) ? styles : [];
                    this.styleUrls = lang_1.isPresent(styleUrls) ? styleUrls : [];
                    this.ngContentSelectors = lang_1.isPresent(ngContentSelectors) ? ngContentSelectors : [];
                }
                CompileTemplateMetadata.fromJson = function (data) {
                    return new CompileTemplateMetadata({
                        encapsulation: lang_1.isPresent(data['encapsulation']) ?
                            view_1.VIEW_ENCAPSULATION_VALUES[data['encapsulation']] :
                            data['encapsulation'],
                        template: data['template'],
                        templateUrl: data['templateUrl'],
                        styles: data['styles'],
                        styleUrls: data['styleUrls'],
                        ngContentSelectors: data['ngContentSelectors']
                    });
                };
                CompileTemplateMetadata.prototype.toJson = function () {
                    return {
                        'encapsulation': lang_1.isPresent(this.encapsulation) ? lang_1.serializeEnum(this.encapsulation) : this.encapsulation,
                        'template': this.template,
                        'templateUrl': this.templateUrl,
                        'styles': this.styles,
                        'styleUrls': this.styleUrls,
                        'ngContentSelectors': this.ngContentSelectors
                    };
                };
                return CompileTemplateMetadata;
            }());
            exports_1("CompileTemplateMetadata", CompileTemplateMetadata);
            /**
             * Metadata regarding compilation of a directive.
             */
            CompileDirectiveMetadata = (function () {
                function CompileDirectiveMetadata(_a) {
                    var _b = _a === void 0 ? {} : _a, type = _b.type, isComponent = _b.isComponent, dynamicLoadable = _b.dynamicLoadable, selector = _b.selector, exportAs = _b.exportAs, changeDetection = _b.changeDetection, inputs = _b.inputs, outputs = _b.outputs, hostListeners = _b.hostListeners, hostProperties = _b.hostProperties, hostAttributes = _b.hostAttributes, lifecycleHooks = _b.lifecycleHooks, providers = _b.providers, viewProviders = _b.viewProviders, queries = _b.queries, viewQueries = _b.viewQueries, template = _b.template;
                    this.type = type;
                    this.isComponent = isComponent;
                    this.dynamicLoadable = dynamicLoadable;
                    this.selector = selector;
                    this.exportAs = exportAs;
                    this.changeDetection = changeDetection;
                    this.inputs = inputs;
                    this.outputs = outputs;
                    this.hostListeners = hostListeners;
                    this.hostProperties = hostProperties;
                    this.hostAttributes = hostAttributes;
                    this.lifecycleHooks = lifecycleHooks;
                    this.providers = lang_1.normalizeBlank(providers);
                    this.viewProviders = lang_1.normalizeBlank(viewProviders);
                    this.queries = queries;
                    this.viewQueries = viewQueries;
                    this.template = template;
                }
                CompileDirectiveMetadata.create = function (_a) {
                    var _b = _a === void 0 ? {} : _a, type = _b.type, isComponent = _b.isComponent, dynamicLoadable = _b.dynamicLoadable, selector = _b.selector, exportAs = _b.exportAs, changeDetection = _b.changeDetection, inputs = _b.inputs, outputs = _b.outputs, host = _b.host, lifecycleHooks = _b.lifecycleHooks, providers = _b.providers, viewProviders = _b.viewProviders, queries = _b.queries, viewQueries = _b.viewQueries, template = _b.template;
                    var hostListeners = {};
                    var hostProperties = {};
                    var hostAttributes = {};
                    if (lang_1.isPresent(host)) {
                        collection_1.StringMapWrapper.forEach(host, function (value, key) {
                            var matches = lang_1.RegExpWrapper.firstMatch(HOST_REG_EXP, key);
                            if (lang_1.isBlank(matches)) {
                                hostAttributes[key] = value;
                            }
                            else if (lang_1.isPresent(matches[1])) {
                                hostProperties[matches[1]] = value;
                            }
                            else if (lang_1.isPresent(matches[2])) {
                                hostListeners[matches[2]] = value;
                            }
                        });
                    }
                    var inputsMap = {};
                    if (lang_1.isPresent(inputs)) {
                        inputs.forEach(function (bindConfig) {
                            // canonical syntax: `dirProp: elProp`
                            // if there is no `:`, use dirProp = elProp
                            var parts = util_1.splitAtColon(bindConfig, [bindConfig, bindConfig]);
                            inputsMap[parts[0]] = parts[1];
                        });
                    }
                    var outputsMap = {};
                    if (lang_1.isPresent(outputs)) {
                        outputs.forEach(function (bindConfig) {
                            // canonical syntax: `dirProp: elProp`
                            // if there is no `:`, use dirProp = elProp
                            var parts = util_1.splitAtColon(bindConfig, [bindConfig, bindConfig]);
                            outputsMap[parts[0]] = parts[1];
                        });
                    }
                    return new CompileDirectiveMetadata({
                        type: type,
                        isComponent: lang_1.normalizeBool(isComponent),
                        dynamicLoadable: lang_1.normalizeBool(dynamicLoadable),
                        selector: selector,
                        exportAs: exportAs,
                        changeDetection: changeDetection,
                        inputs: inputsMap,
                        outputs: outputsMap,
                        hostListeners: hostListeners,
                        hostProperties: hostProperties,
                        hostAttributes: hostAttributes,
                        lifecycleHooks: lang_1.isPresent(lifecycleHooks) ? lifecycleHooks : [],
                        providers: providers,
                        viewProviders: viewProviders,
                        queries: queries,
                        viewQueries: viewQueries,
                        template: template
                    });
                };
                Object.defineProperty(CompileDirectiveMetadata.prototype, "identifier", {
                    get: function () { return this.type; },
                    enumerable: true,
                    configurable: true
                });
                CompileDirectiveMetadata.fromJson = function (data) {
                    return new CompileDirectiveMetadata({
                        isComponent: data['isComponent'],
                        dynamicLoadable: data['dynamicLoadable'],
                        selector: data['selector'],
                        exportAs: data['exportAs'],
                        type: lang_1.isPresent(data['type']) ? CompileTypeMetadata.fromJson(data['type']) : data['type'],
                        changeDetection: lang_1.isPresent(data['changeDetection']) ?
                            change_detection_1.CHANGE_DETECTION_STRATEGY_VALUES[data['changeDetection']] :
                            data['changeDetection'],
                        inputs: data['inputs'],
                        outputs: data['outputs'],
                        hostListeners: data['hostListeners'],
                        hostProperties: data['hostProperties'],
                        hostAttributes: data['hostAttributes'],
                        lifecycleHooks: data['lifecycleHooks'].map(function (hookValue) { return interfaces_1.LIFECYCLE_HOOKS_VALUES[hookValue]; }),
                        template: lang_1.isPresent(data['template']) ? CompileTemplateMetadata.fromJson(data['template']) :
                            data['template'],
                        providers: arrayFromJson(data['providers'], CompileProviderMetadata.fromJson)
                    });
                };
                CompileDirectiveMetadata.prototype.toJson = function () {
                    return {
                        'class': 'Directive',
                        'isComponent': this.isComponent,
                        'dynamicLoadable': this.dynamicLoadable,
                        'selector': this.selector,
                        'exportAs': this.exportAs,
                        'type': lang_1.isPresent(this.type) ? this.type.toJson() : this.type,
                        'changeDetection': lang_1.isPresent(this.changeDetection) ? lang_1.serializeEnum(this.changeDetection) :
                            this.changeDetection,
                        'inputs': this.inputs,
                        'outputs': this.outputs,
                        'hostListeners': this.hostListeners,
                        'hostProperties': this.hostProperties,
                        'hostAttributes': this.hostAttributes,
                        'lifecycleHooks': this.lifecycleHooks.map(function (hook) { return lang_1.serializeEnum(hook); }),
                        'template': lang_1.isPresent(this.template) ? this.template.toJson() : this.template,
                        'providers': arrayToJson(this.providers)
                    };
                };
                return CompileDirectiveMetadata;
            }());
            exports_1("CompileDirectiveMetadata", CompileDirectiveMetadata);
            CompilePipeMetadata = (function () {
                function CompilePipeMetadata(_a) {
                    var _b = _a === void 0 ? {} : _a, type = _b.type, name = _b.name, pure = _b.pure;
                    this.type = type;
                    this.name = name;
                    this.pure = lang_1.normalizeBool(pure);
                }
                Object.defineProperty(CompilePipeMetadata.prototype, "identifier", {
                    get: function () { return this.type; },
                    enumerable: true,
                    configurable: true
                });
                CompilePipeMetadata.fromJson = function (data) {
                    return new CompilePipeMetadata({
                        type: lang_1.isPresent(data['type']) ? CompileTypeMetadata.fromJson(data['type']) : data['type'],
                        name: data['name'],
                        pure: data['pure']
                    });
                };
                CompilePipeMetadata.prototype.toJson = function () {
                    return {
                        'class': 'Pipe',
                        'type': lang_1.isPresent(this.type) ? this.type.toJson() : null,
                        'name': this.name,
                        'pure': this.pure
                    };
                };
                return CompilePipeMetadata;
            }());
            exports_1("CompilePipeMetadata", CompilePipeMetadata);
            _COMPILE_METADATA_FROM_JSON = {
                'Directive': CompileDirectiveMetadata.fromJson,
                'Pipe': CompilePipeMetadata.fromJson,
                'Type': CompileTypeMetadata.fromJson,
                'Identifier': CompileIdentifierMetadata.fromJson
            };
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL2RpcmVjdGl2ZV9tZXRhZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7UUF3QkksWUFBWSxzUkF5a0JaLDJCQUEyQjtJQTdEL0I7O09BRUc7SUFDSCxpQ0FBd0MsYUFBa0MsRUFDbEMsaUJBQXlCO1FBQy9ELElBQUksUUFBUSxHQUFHLHNCQUFXLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztRQUNwRixNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxDQUFDO1lBQ3JDLElBQUksRUFBRSxJQUFJLG1CQUFtQixDQUFDO2dCQUM1QixPQUFPLEVBQUUsTUFBTTtnQkFDZixJQUFJLEVBQUUsU0FBTyxhQUFhLENBQUMsSUFBTTtnQkFDakMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxTQUFTO2dCQUNsQyxNQUFNLEVBQUUsSUFBSTthQUNiLENBQUM7WUFDRixRQUFRLEVBQUUsSUFBSSx1QkFBdUIsQ0FDakMsRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLGtCQUFrQixFQUFFLEVBQUUsRUFBQyxDQUFDO1lBQzdGLGVBQWUsRUFBRSwwQ0FBdUIsQ0FBQyxPQUFPO1lBQ2hELE1BQU0sRUFBRSxFQUFFO1lBQ1YsT0FBTyxFQUFFLEVBQUU7WUFDWCxJQUFJLEVBQUUsRUFBRTtZQUNSLGNBQWMsRUFBRSxFQUFFO1lBQ2xCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLGVBQWUsRUFBRSxLQUFLO1lBQ3RCLFFBQVEsRUFBRSxHQUFHO1lBQ2IsU0FBUyxFQUFFLEVBQUU7WUFDYixhQUFhLEVBQUUsRUFBRTtZQUNqQixPQUFPLEVBQUUsRUFBRTtZQUNYLFdBQVcsRUFBRSxFQUFFO1NBQ2hCLENBQUMsQ0FBQztJQUNMLENBQUM7SUF6QkQsNkRBeUJDLENBQUE7SUF3Q0QsdUJBQXVCLEdBQVUsRUFBRSxFQUFvQztRQUNyRSxNQUFNLENBQUMsY0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsV0FBVyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxxQkFBcUIsR0FBVTtRQUM3QixNQUFNLENBQUMsY0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxxQkFBcUIsR0FBUSxFQUFFLEVBQW9DO1FBQ2pFLE1BQU0sQ0FBQyxDQUFDLGVBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxjQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCxtQkFBbUIsR0FBUTtRQUN6QixNQUFNLENBQUMsQ0FBQyxlQUFRLENBQUMsR0FBRyxDQUFDLElBQUksY0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUM5RCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBaG1CRCx3Q0FBd0M7WUFDeEMsa0NBQWtDO1lBQzlCLFlBQVksR0FBRywwQ0FBMEMsQ0FBQztZQUU5RDtnQkFBQTtnQkFRQSxDQUFDO2dCQVBRLHNDQUFRLEdBQWYsVUFBZ0IsSUFBMEI7b0JBQ3hDLE1BQU0sQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUQsQ0FBQztnQkFJRCxzQkFBSSxxREFBVTt5QkFBZCxjQUE4QyxNQUFNLENBQTRCLDBCQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFDcEcsb0NBQUM7WUFBRCxDQVJBLEFBUUMsSUFBQTtZQVJELHlFQVFDLENBQUE7WUFFRDtnQkFBc0QsMkNBQTZCO2dCQUFuRjtvQkFBc0QsOEJBQTZCO2dCQVVuRixDQUFDO2dCQVRRLGdDQUFRLEdBQWYsVUFBZ0IsSUFBMEI7b0JBQ3hDLE1BQU0sQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUQsQ0FBQztnQkFJRCxzQkFBSSx5Q0FBSTt5QkFBUixjQUFrQyxNQUFNLENBQXNCLDBCQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFFaEYsc0JBQUksK0NBQVU7eUJBQWQsY0FBOEMsTUFBTSxDQUE0QiwwQkFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBQ3BHLDhCQUFDO1lBQUQsQ0FWQSxBQVVDLENBVnFELDZCQUE2QixHQVVsRjtZQVZELDZEQVVDLENBQUE7WUFFRDtnQkFNRSxtQ0FBWSxFQU1OO3dCQU5NLDRCQU1OLEVBTk8sb0JBQU8sRUFBRSxjQUFJLEVBQUUsd0JBQVMsRUFBRSxrQkFBTSxFQUFFLHNDQUFnQjtvQkFPN0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztvQkFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7b0JBQzNCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztnQkFDM0MsQ0FBQztnQkFFTSxrQ0FBUSxHQUFmLFVBQWdCLElBQTBCO29CQUN4QyxNQUFNLENBQUMsSUFBSSx5QkFBeUIsQ0FBQzt3QkFDbkMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUM7d0JBQ2xCLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDO3dCQUN0QixTQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQzt3QkFDNUIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDO3FCQUMzQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQztnQkFFRCwwQ0FBTSxHQUFOO29CQUNFLE1BQU0sQ0FBQzt3QkFDTCw0Q0FBNEM7d0JBQzVDLE9BQU8sRUFBRSxZQUFZO3dCQUNyQixNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUk7d0JBQ2pCLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUzt3QkFDM0IsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNO3dCQUNyQixrQkFBa0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO3FCQUMxQyxDQUFDO2dCQUNKLENBQUM7Z0JBRUQsc0JBQUksaURBQVU7eUJBQWQsY0FBOEMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFDOUQsZ0NBQUM7WUFBRCxDQXpDQSxBQXlDQyxJQUFBO1lBekNELGlFQXlDQyxDQUFBO1lBRUQ7Z0JBVUUscUNBQVksRUFTTjt3QkFUTSw0QkFTTixFQVRPLDRCQUFXLEVBQUUsa0JBQU0sRUFBRSxrQkFBTSxFQUFFLDBCQUFVLEVBQUUsMEJBQVUsRUFBRSxnQkFBSyxFQUFFLHdCQUFTLEVBQUUsZ0JBQUs7b0JBVXZGLElBQUksQ0FBQyxXQUFXLEdBQUcsb0JBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDOUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxvQkFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNwQyxJQUFJLENBQUMsTUFBTSxHQUFHLG9CQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsb0JBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDNUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxvQkFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUM1QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7b0JBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixDQUFDO2dCQUVNLG9DQUFRLEdBQWYsVUFBZ0IsSUFBMEI7b0JBQ3hDLE1BQU0sQ0FBQyxJQUFJLDJCQUEyQixDQUFDO3dCQUNyQyxLQUFLLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSx5QkFBeUIsQ0FBQyxRQUFRLENBQUM7d0JBQ3JFLEtBQUssRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLG9CQUFvQixDQUFDLFFBQVEsQ0FBQzt3QkFDaEUsU0FBUyxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsb0JBQW9CLENBQUMsUUFBUSxDQUFDO3dCQUN4RSxXQUFXLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQzt3QkFDaEMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUM7d0JBQ3RCLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDO3dCQUN0QixVQUFVLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQzt3QkFDOUIsVUFBVSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7cUJBQy9CLENBQUMsQ0FBQztnQkFDTCxDQUFDO2dCQUVELDRDQUFNLEdBQU47b0JBQ0UsTUFBTSxDQUFDO3dCQUNMLDRDQUE0Qzt3QkFDNUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO3dCQUM5QixPQUFPLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7d0JBQzlCLFdBQVcsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzt3QkFDdEMsYUFBYSxFQUFFLElBQUksQ0FBQyxXQUFXO3dCQUMvQixRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU07d0JBQ3JCLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTTt3QkFDckIsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVO3dCQUM3QixZQUFZLEVBQUUsSUFBSSxDQUFDLFVBQVU7cUJBQzlCLENBQUM7Z0JBQ0osQ0FBQztnQkFDSCxrQ0FBQztZQUFELENBeERBLEFBd0RDLElBQUE7WUF4REQscUVBd0RDLENBQUE7WUFFRDtnQkFTRSxpQ0FBWSxFQVFYO3dCQVJZLGdCQUFLLEVBQUUsc0JBQVEsRUFBRSxzQkFBUSxFQUFFLDRCQUFXLEVBQUUsMEJBQVUsRUFBRSxjQUFJLEVBQUUsZ0JBQUs7b0JBUzFFLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztvQkFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO29CQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztvQkFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixDQUFDO2dCQUVNLGdDQUFRLEdBQWYsVUFBZ0IsSUFBMEI7b0JBQ3hDLE1BQU0sQ0FBQyxJQUFJLHVCQUF1QixDQUFDO3dCQUNqQyxLQUFLLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSx5QkFBeUIsQ0FBQyxRQUFRLENBQUM7d0JBQ3JFLFFBQVEsRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLG1CQUFtQixDQUFDLFFBQVEsQ0FBQztxQkFDdEUsQ0FBQyxDQUFDO2dCQUNMLENBQUM7Z0JBRUQsd0NBQU0sR0FBTjtvQkFDRSxNQUFNLENBQUM7d0JBQ0wsNENBQTRDO3dCQUM1QyxPQUFPLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7d0JBQzlCLFVBQVUsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztxQkFDckMsQ0FBQztnQkFDSixDQUFDO2dCQUNILDhCQUFDO1lBQUQsQ0F6Q0EsQUF5Q0MsSUFBQTtZQXpDRCw2REF5Q0MsQ0FBQTtZQUVEO2dCQVFFLGdDQUFZLEVBTVg7d0JBTlksb0JBQU8sRUFBRSxjQUFJLEVBQUUsd0JBQVMsRUFBRSxzQ0FBZ0IsRUFBRSxrQkFBTTtvQkFPN0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztvQkFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztnQkFDM0MsQ0FBQztnQkFFRCxzQkFBSSw4Q0FBVTt5QkFBZCxjQUE4QyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUU1RCx1Q0FBTSxHQUFOLGNBQVcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLDZCQUFDO1lBQUQsQ0F6QkEsQUF5QkMsSUFBQTtZQXpCRCwyREF5QkMsQ0FBQTtZQUVEOztlQUVHO1lBQ0g7Z0JBU0UsNkJBQVksRUFRTjt3QkFSTSw0QkFRTixFQVJPLG9CQUFPLEVBQUUsY0FBSSxFQUFFLHdCQUFTLEVBQUUsa0JBQU0sRUFBRSxrQkFBTSxFQUFFLHNDQUFnQixFQUFFLGtCQUFNO29CQVM3RSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztvQkFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO29CQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztvQkFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxvQkFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNwQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7b0JBQ3pDLElBQUksQ0FBQyxNQUFNLEdBQUcscUJBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdkMsQ0FBQztnQkFFTSw0QkFBUSxHQUFmLFVBQWdCLElBQTBCO29CQUN4QyxNQUFNLENBQUMsSUFBSSxtQkFBbUIsQ0FBQzt3QkFDN0IsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUM7d0JBQ2xCLFNBQVMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDO3dCQUM1QixNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQzt3QkFDdEIsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUM7d0JBQ3RCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQzt3QkFDMUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsMkJBQTJCLENBQUMsUUFBUSxDQUFDO3FCQUM1RSxDQUFDLENBQUM7Z0JBQ0wsQ0FBQztnQkFFRCxzQkFBSSwyQ0FBVTt5QkFBZCxjQUE4QyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUM1RCxzQkFBSSxxQ0FBSTt5QkFBUixjQUFrQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUVoRCxvQ0FBTSxHQUFOO29CQUNFLE1BQU0sQ0FBQzt3QkFDTCw0Q0FBNEM7d0JBQzVDLE9BQU8sRUFBRSxNQUFNO3dCQUNmLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSTt3QkFDakIsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTO3dCQUMzQixRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU07d0JBQ3JCLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTTt3QkFDckIsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjt3QkFDekMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO3FCQUNuQyxDQUFDO2dCQUNKLENBQUM7Z0JBQ0gsMEJBQUM7WUFBRCxDQXJEQSxBQXFEQyxJQUFBO1lBckRELHFEQXFEQyxDQUFBO1lBRUQ7Z0JBTUUsOEJBQVksRUFLTjt3QkFMTSw0QkFLTixFQUxPLHdCQUFTLEVBQUUsNEJBQVcsRUFBRSxnQkFBSyxFQUFFLDhCQUFZO29CQU10RCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztvQkFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7b0JBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsb0JBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7Z0JBQ25DLENBQUM7Z0JBRU0sNkJBQVEsR0FBZixVQUFnQixJQUEwQjtvQkFDeEMsTUFBTSxDQUFDLElBQUksb0JBQW9CLENBQUM7d0JBQzlCLFNBQVMsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLHlCQUF5QixDQUFDLFFBQVEsQ0FBQzt3QkFDL0UsV0FBVyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUM7d0JBQ2hDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDO3dCQUNwQixZQUFZLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQztxQkFDbkMsQ0FBQyxDQUFDO2dCQUNMLENBQUM7Z0JBRUQscUNBQU0sR0FBTjtvQkFDRSxNQUFNLENBQUM7d0JBQ0wsNENBQTRDO3dCQUM1QyxXQUFXLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7d0JBQ3hDLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVzt3QkFDL0IsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLO3dCQUNuQixjQUFjLEVBQUUsSUFBSSxDQUFDLFlBQVk7cUJBQ2xDLENBQUM7Z0JBQ0osQ0FBQztnQkFDSCwyQkFBQztZQUFELENBcENBLEFBb0NDLElBQUE7WUFwQ0QsdURBb0NDLENBQUE7WUFFRDs7ZUFFRztZQUNIO2dCQU9FLGlDQUFZLEVBT047d0JBUE0sNEJBT04sRUFQTyxnQ0FBYSxFQUFFLHNCQUFRLEVBQUUsNEJBQVcsRUFBRSxrQkFBTSxFQUFFLHdCQUFTLEVBQUUsMENBQWtCO29CQVF0RixJQUFJLENBQUMsYUFBYSxHQUFHLGdCQUFTLENBQUMsYUFBYSxDQUFDLEdBQUcsYUFBYSxHQUFHLHdCQUFpQixDQUFDLFFBQVEsQ0FBQztvQkFDM0YsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO29CQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLGdCQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxHQUFHLEVBQUUsQ0FBQztvQkFDOUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxnQkFBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLFNBQVMsR0FBRyxFQUFFLENBQUM7b0JBQ3ZELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxnQkFBUyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsa0JBQWtCLEdBQUcsRUFBRSxDQUFDO2dCQUNwRixDQUFDO2dCQUVNLGdDQUFRLEdBQWYsVUFBZ0IsSUFBMEI7b0JBQ3hDLE1BQU0sQ0FBQyxJQUFJLHVCQUF1QixDQUFDO3dCQUNqQyxhQUFhLEVBQUUsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7NEJBQzVCLGdDQUF5QixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzs0QkFDaEQsSUFBSSxDQUFDLGVBQWUsQ0FBQzt3QkFDeEMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUM7d0JBQzFCLFdBQVcsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDO3dCQUNoQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQzt3QkFDdEIsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUM7d0JBQzVCLGtCQUFrQixFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztxQkFDL0MsQ0FBQyxDQUFDO2dCQUNMLENBQUM7Z0JBRUQsd0NBQU0sR0FBTjtvQkFDRSxNQUFNLENBQUM7d0JBQ0wsZUFBZSxFQUNYLGdCQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLG9CQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhO3dCQUMxRixVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVE7d0JBQ3pCLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVzt3QkFDL0IsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNO3dCQUNyQixXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVM7d0JBQzNCLG9CQUFvQixFQUFFLElBQUksQ0FBQyxrQkFBa0I7cUJBQzlDLENBQUM7Z0JBQ0osQ0FBQztnQkFDSCw4QkFBQztZQUFELENBL0NBLEFBK0NDLElBQUE7WUEvQ0QsNkRBK0NDLENBQUE7WUFFRDs7ZUFFRztZQUNIO2dCQTJGRSxrQ0FBWSxFQW9CTjt3QkFwQk0sNEJBb0JOLEVBcEJPLGNBQUksRUFBRSw0QkFBVyxFQUFFLG9DQUFlLEVBQUUsc0JBQVEsRUFBRSxzQkFBUSxFQUFFLG9DQUFlLEVBQUUsa0JBQU0sRUFDL0Usb0JBQU8sRUFBRSxnQ0FBYSxFQUFFLGtDQUFjLEVBQUUsa0NBQWMsRUFBRSxrQ0FBYyxFQUFFLHdCQUFTLEVBQ2pGLGdDQUFhLEVBQUUsb0JBQU8sRUFBRSw0QkFBVyxFQUFFLHNCQUFRO29CQW1CeEQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO29CQUMvQixJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztvQkFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO29CQUN6QixJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztvQkFDdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO29CQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztvQkFDbkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7b0JBQ3JDLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO29CQUNyQyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztvQkFDckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUMzQyxJQUFJLENBQUMsYUFBYSxHQUFHLHFCQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ25ELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO29CQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztvQkFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7Z0JBQzNCLENBQUM7Z0JBaElNLCtCQUFNLEdBQWIsVUFBYyxFQWtCUjt3QkFsQlEsNEJBa0JSLEVBbEJTLGNBQUksRUFBRSw0QkFBVyxFQUFFLG9DQUFlLEVBQUUsc0JBQVEsRUFBRSxzQkFBUSxFQUFFLG9DQUFlLEVBQUUsa0JBQU0sRUFDL0Usb0JBQU8sRUFBRSxjQUFJLEVBQUUsa0NBQWMsRUFBRSx3QkFBUyxFQUFFLGdDQUFhLEVBQUUsb0JBQU8sRUFBRSw0QkFBVyxFQUM3RSxzQkFBUTtvQkFpQnJCLElBQUksYUFBYSxHQUE0QixFQUFFLENBQUM7b0JBQ2hELElBQUksY0FBYyxHQUE0QixFQUFFLENBQUM7b0JBQ2pELElBQUksY0FBYyxHQUE0QixFQUFFLENBQUM7b0JBQ2pELEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNwQiw2QkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFVBQUMsS0FBYSxFQUFFLEdBQVc7NEJBQ3hELElBQUksT0FBTyxHQUFHLG9CQUFhLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsQ0FBQzs0QkFDMUQsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDckIsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQzs0QkFDOUIsQ0FBQzs0QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ2pDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7NEJBQ3JDLENBQUM7NEJBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUNqQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDOzRCQUNwQyxDQUFDO3dCQUNILENBQUMsQ0FBQyxDQUFDO29CQUNMLENBQUM7b0JBQ0QsSUFBSSxTQUFTLEdBQTRCLEVBQUUsQ0FBQztvQkFDNUMsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3RCLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxVQUFrQjs0QkFDaEMsc0NBQXNDOzRCQUN0QywyQ0FBMkM7NEJBQzNDLElBQUksS0FBSyxHQUFHLG1CQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7NEJBQy9ELFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2pDLENBQUMsQ0FBQyxDQUFDO29CQUNMLENBQUM7b0JBQ0QsSUFBSSxVQUFVLEdBQTRCLEVBQUUsQ0FBQztvQkFDN0MsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3ZCLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxVQUFrQjs0QkFDakMsc0NBQXNDOzRCQUN0QywyQ0FBMkM7NEJBQzNDLElBQUksS0FBSyxHQUFHLG1CQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7NEJBQy9ELFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2xDLENBQUMsQ0FBQyxDQUFDO29CQUNMLENBQUM7b0JBRUQsTUFBTSxDQUFDLElBQUksd0JBQXdCLENBQUM7d0JBQ2xDLElBQUksRUFBRSxJQUFJO3dCQUNWLFdBQVcsRUFBRSxvQkFBYSxDQUFDLFdBQVcsQ0FBQzt3QkFDdkMsZUFBZSxFQUFFLG9CQUFhLENBQUMsZUFBZSxDQUFDO3dCQUMvQyxRQUFRLEVBQUUsUUFBUTt3QkFDbEIsUUFBUSxFQUFFLFFBQVE7d0JBQ2xCLGVBQWUsRUFBRSxlQUFlO3dCQUNoQyxNQUFNLEVBQUUsU0FBUzt3QkFDakIsT0FBTyxFQUFFLFVBQVU7d0JBQ25CLGFBQWEsRUFBRSxhQUFhO3dCQUM1QixjQUFjLEVBQUUsY0FBYzt3QkFDOUIsY0FBYyxFQUFFLGNBQWM7d0JBQzlCLGNBQWMsRUFBRSxnQkFBUyxDQUFDLGNBQWMsQ0FBQyxHQUFHLGNBQWMsR0FBRyxFQUFFO3dCQUMvRCxTQUFTLEVBQUUsU0FBUzt3QkFDcEIsYUFBYSxFQUFFLGFBQWE7d0JBQzVCLE9BQU8sRUFBRSxPQUFPO3dCQUNoQixXQUFXLEVBQUUsV0FBVzt3QkFDeEIsUUFBUSxFQUFFLFFBQVE7cUJBQ25CLENBQUMsQ0FBQztnQkFDTCxDQUFDO2dCQTBERCxzQkFBSSxnREFBVTt5QkFBZCxjQUE4QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFFMUQsaUNBQVEsR0FBZixVQUFnQixJQUEwQjtvQkFDeEMsTUFBTSxDQUFDLElBQUksd0JBQXdCLENBQUM7d0JBQ2xDLFdBQVcsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDO3dCQUNoQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDO3dCQUN4QyxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQzt3QkFDMUIsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUM7d0JBQzFCLElBQUksRUFBRSxnQkFBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO3dCQUN6RixlQUFlLEVBQUUsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQzs0QkFDOUIsbURBQWdDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7NEJBQ3pELElBQUksQ0FBQyxpQkFBaUIsQ0FBQzt3QkFDNUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUM7d0JBQ3RCLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO3dCQUN4QixhQUFhLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQzt3QkFDcEMsY0FBYyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQzt3QkFDdEMsY0FBYyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQzt3QkFDdEMsY0FBYyxFQUNGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBRSxDQUFDLEdBQUcsQ0FBQyxVQUFBLFNBQVMsSUFBSSxPQUFBLG1DQUFzQixDQUFDLFNBQVMsQ0FBQyxFQUFqQyxDQUFpQyxDQUFDO3dCQUN2RixRQUFRLEVBQUUsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyx1QkFBdUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzRCQUNsRCxJQUFJLENBQUMsVUFBVSxDQUFDO3dCQUN4RCxTQUFTLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSx1QkFBdUIsQ0FBQyxRQUFRLENBQUM7cUJBQzlFLENBQUMsQ0FBQztnQkFDTCxDQUFDO2dCQUVELHlDQUFNLEdBQU47b0JBQ0UsTUFBTSxDQUFDO3dCQUNMLE9BQU8sRUFBRSxXQUFXO3dCQUNwQixhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVc7d0JBQy9CLGlCQUFpQixFQUFFLElBQUksQ0FBQyxlQUFlO3dCQUN2QyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVE7d0JBQ3pCLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUTt3QkFDekIsTUFBTSxFQUFFLGdCQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUk7d0JBQzdELGlCQUFpQixFQUFFLGdCQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLG9CQUFhLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQzs0QkFDbkMsSUFBSSxDQUFDLGVBQWU7d0JBQ3pFLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTTt3QkFDckIsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPO3dCQUN2QixlQUFlLEVBQUUsSUFBSSxDQUFDLGFBQWE7d0JBQ25DLGdCQUFnQixFQUFFLElBQUksQ0FBQyxjQUFjO3dCQUNyQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsY0FBYzt3QkFDckMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxvQkFBYSxDQUFDLElBQUksQ0FBQyxFQUFuQixDQUFtQixDQUFDO3dCQUN0RSxVQUFVLEVBQUUsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUTt3QkFDN0UsV0FBVyxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO3FCQUN6QyxDQUFDO2dCQUNKLENBQUM7Z0JBQ0gsK0JBQUM7WUFBRCxDQWhMQSxBQWdMQyxJQUFBO1lBaExELCtEQWdMQyxDQUFBO1lBaUNEO2dCQUlFLDZCQUFZLEVBQ3dFO3dCQUR4RSw0QkFDd0UsRUFEdkUsY0FBSSxFQUFFLGNBQUksRUFDVixjQUFJO29CQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxvQkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQyxDQUFDO2dCQUNELHNCQUFJLDJDQUFVO3lCQUFkLGNBQThDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUUxRCw0QkFBUSxHQUFmLFVBQWdCLElBQTBCO29CQUN4QyxNQUFNLENBQUMsSUFBSSxtQkFBbUIsQ0FBQzt3QkFDN0IsSUFBSSxFQUFFLGdCQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsbUJBQW1CLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7d0JBQ3pGLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO3dCQUNsQixJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQztxQkFDbkIsQ0FBQyxDQUFDO2dCQUNMLENBQUM7Z0JBRUQsb0NBQU0sR0FBTjtvQkFDRSxNQUFNLENBQUM7d0JBQ0wsT0FBTyxFQUFFLE1BQU07d0JBQ2YsTUFBTSxFQUFFLGdCQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSTt3QkFDeEQsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJO3dCQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUk7cUJBQ2xCLENBQUM7Z0JBQ0osQ0FBQztnQkFDSCwwQkFBQztZQUFELENBNUJBLEFBNEJDLElBQUE7WUE1QkQscURBNEJDLENBQUE7WUFFRywyQkFBMkIsR0FBRztnQkFDaEMsV0FBVyxFQUFFLHdCQUF3QixDQUFDLFFBQVE7Z0JBQzlDLE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxRQUFRO2dCQUNwQyxNQUFNLEVBQUUsbUJBQW1CLENBQUMsUUFBUTtnQkFDcEMsWUFBWSxFQUFFLHlCQUF5QixDQUFDLFFBQVE7YUFDakQsQ0FBQyIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9kaXJlY3RpdmVfbWV0YWRhdGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBpc1ByZXNlbnQsXG4gIGlzQmxhbmssXG4gIG5vcm1hbGl6ZUJvb2wsXG4gIG5vcm1hbGl6ZUJsYW5rLFxuICBzZXJpYWxpemVFbnVtLFxuICBUeXBlLFxuICBpc1N0cmluZyxcbiAgUmVnRXhwV3JhcHBlcixcbiAgU3RyaW5nV3JhcHBlclxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHt1bmltcGxlbWVudGVkfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtTdHJpbmdNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENIQU5HRV9ERVRFQ1RJT05fU1RSQVRFR1lfVkFMVUVTXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdGlvbic7XG5pbXBvcnQge1ZpZXdFbmNhcHN1bGF0aW9uLCBWSUVXX0VOQ0FQU1VMQVRJT05fVkFMVUVTfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9tZXRhZGF0YS92aWV3JztcbmltcG9ydCB7Q3NzU2VsZWN0b3J9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9zZWxlY3Rvcic7XG5pbXBvcnQge3NwbGl0QXRDb2xvbn0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7TGlmZWN5Y2xlSG9va3MsIExJRkVDWUNMRV9IT09LU19WQUxVRVN9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9pbnRlcmZhY2VzJztcblxuLy8gZ3JvdXAgMTogXCJwcm9wZXJ0eVwiIGZyb20gXCJbcHJvcGVydHldXCJcbi8vIGdyb3VwIDI6IFwiZXZlbnRcIiBmcm9tIFwiKGV2ZW50KVwiXG52YXIgSE9TVF9SRUdfRVhQID0gL14oPzooPzpcXFsoW15cXF1dKylcXF0pfCg/OlxcKChbXlxcKV0rKVxcKSkpJC9nO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29tcGlsZU1ldGFkYXRhV2l0aElkZW50aWZpZXIge1xuICBzdGF0aWMgZnJvbUpzb24oZGF0YToge1trZXk6IHN0cmluZ106IGFueX0pOiBDb21waWxlTWV0YWRhdGFXaXRoSWRlbnRpZmllciB7XG4gICAgcmV0dXJuIF9DT01QSUxFX01FVEFEQVRBX0ZST01fSlNPTltkYXRhWydjbGFzcyddXShkYXRhKTtcbiAgfVxuXG4gIGFic3RyYWN0IHRvSnNvbigpOiB7W2tleTogc3RyaW5nXTogYW55fTtcblxuICBnZXQgaWRlbnRpZmllcigpOiBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhIHsgcmV0dXJuIDxDb21waWxlSWRlbnRpZmllck1ldGFkYXRhPnVuaW1wbGVtZW50ZWQoKTsgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29tcGlsZU1ldGFkYXRhV2l0aFR5cGUgZXh0ZW5kcyBDb21waWxlTWV0YWRhdGFXaXRoSWRlbnRpZmllciB7XG4gIHN0YXRpYyBmcm9tSnNvbihkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSk6IENvbXBpbGVNZXRhZGF0YVdpdGhUeXBlIHtcbiAgICByZXR1cm4gX0NPTVBJTEVfTUVUQURBVEFfRlJPTV9KU09OW2RhdGFbJ2NsYXNzJ11dKGRhdGEpO1xuICB9XG5cbiAgYWJzdHJhY3QgdG9Kc29uKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9O1xuXG4gIGdldCB0eXBlKCk6IENvbXBpbGVUeXBlTWV0YWRhdGEgeyByZXR1cm4gPENvbXBpbGVUeXBlTWV0YWRhdGE+dW5pbXBsZW1lbnRlZCgpOyB9XG5cbiAgZ2V0IGlkZW50aWZpZXIoKTogQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSB7IHJldHVybiA8Q29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YT51bmltcGxlbWVudGVkKCk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEgaW1wbGVtZW50cyBDb21waWxlTWV0YWRhdGFXaXRoSWRlbnRpZmllciB7XG4gIHJ1bnRpbWU6IGFueTtcbiAgbmFtZTogc3RyaW5nO1xuICBwcmVmaXg6IHN0cmluZztcbiAgbW9kdWxlVXJsOiBzdHJpbmc7XG4gIGNvbnN0Q29uc3RydWN0b3I6IGJvb2xlYW47XG4gIGNvbnN0cnVjdG9yKHtydW50aW1lLCBuYW1lLCBtb2R1bGVVcmwsIHByZWZpeCwgY29uc3RDb25zdHJ1Y3Rvcn06IHtcbiAgICBydW50aW1lPzogYW55LFxuICAgIG5hbWU/OiBzdHJpbmcsXG4gICAgbW9kdWxlVXJsPzogc3RyaW5nLFxuICAgIHByZWZpeD86IHN0cmluZyxcbiAgICBjb25zdENvbnN0cnVjdG9yPzogYm9vbGVhblxuICB9ID0ge30pIHtcbiAgICB0aGlzLnJ1bnRpbWUgPSBydW50aW1lO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5wcmVmaXggPSBwcmVmaXg7XG4gICAgdGhpcy5tb2R1bGVVcmwgPSBtb2R1bGVVcmw7XG4gICAgdGhpcy5jb25zdENvbnN0cnVjdG9yID0gY29uc3RDb25zdHJ1Y3RvcjtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSnNvbihkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSk6IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEge1xuICAgIHJldHVybiBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSh7XG4gICAgICBuYW1lOiBkYXRhWyduYW1lJ10sXG4gICAgICBwcmVmaXg6IGRhdGFbJ3ByZWZpeCddLFxuICAgICAgbW9kdWxlVXJsOiBkYXRhWydtb2R1bGVVcmwnXSxcbiAgICAgIGNvbnN0Q29uc3RydWN0b3I6IGRhdGFbJ2NvbnN0Q29uc3RydWN0b3InXVxuICAgIH0pO1xuICB9XG5cbiAgdG9Kc29uKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gTm90ZTogUnVudGltZSB0eXBlIGNhbid0IGJlIHNlcmlhbGl6ZWQuLi5cbiAgICAgICdjbGFzcyc6ICdJZGVudGlmaWVyJyxcbiAgICAgICduYW1lJzogdGhpcy5uYW1lLFxuICAgICAgJ21vZHVsZVVybCc6IHRoaXMubW9kdWxlVXJsLFxuICAgICAgJ3ByZWZpeCc6IHRoaXMucHJlZml4LFxuICAgICAgJ2NvbnN0Q29uc3RydWN0b3InOiB0aGlzLmNvbnN0Q29uc3RydWN0b3JcbiAgICB9O1xuICB9XG5cbiAgZ2V0IGlkZW50aWZpZXIoKTogQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSB7IHJldHVybiB0aGlzOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21waWxlRGlEZXBlbmRlbmN5TWV0YWRhdGEge1xuICBpc0F0dHJpYnV0ZTogYm9vbGVhbjtcbiAgaXNTZWxmOiBib29sZWFuO1xuICBpc0hvc3Q6IGJvb2xlYW47XG4gIGlzU2tpcFNlbGY6IGJvb2xlYW47XG4gIGlzT3B0aW9uYWw6IGJvb2xlYW47XG4gIHF1ZXJ5OiBDb21waWxlUXVlcnlNZXRhZGF0YTtcbiAgdmlld1F1ZXJ5OiBDb21waWxlUXVlcnlNZXRhZGF0YTtcbiAgdG9rZW46IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEgfCBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3Ioe2lzQXR0cmlidXRlLCBpc1NlbGYsIGlzSG9zdCwgaXNTa2lwU2VsZiwgaXNPcHRpb25hbCwgcXVlcnksIHZpZXdRdWVyeSwgdG9rZW59OiB7XG4gICAgaXNBdHRyaWJ1dGU/OiBib29sZWFuLFxuICAgIGlzU2VsZj86IGJvb2xlYW4sXG4gICAgaXNIb3N0PzogYm9vbGVhbixcbiAgICBpc1NraXBTZWxmPzogYm9vbGVhbixcbiAgICBpc09wdGlvbmFsPzogYm9vbGVhbixcbiAgICBxdWVyeT86IENvbXBpbGVRdWVyeU1ldGFkYXRhLFxuICAgIHZpZXdRdWVyeT86IENvbXBpbGVRdWVyeU1ldGFkYXRhLFxuICAgIHRva2VuPzogQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSB8IHN0cmluZ1xuICB9ID0ge30pIHtcbiAgICB0aGlzLmlzQXR0cmlidXRlID0gbm9ybWFsaXplQm9vbChpc0F0dHJpYnV0ZSk7XG4gICAgdGhpcy5pc1NlbGYgPSBub3JtYWxpemVCb29sKGlzU2VsZik7XG4gICAgdGhpcy5pc0hvc3QgPSBub3JtYWxpemVCb29sKGlzSG9zdCk7XG4gICAgdGhpcy5pc1NraXBTZWxmID0gbm9ybWFsaXplQm9vbChpc1NraXBTZWxmKTtcbiAgICB0aGlzLmlzT3B0aW9uYWwgPSBub3JtYWxpemVCb29sKGlzT3B0aW9uYWwpO1xuICAgIHRoaXMucXVlcnkgPSBxdWVyeTtcbiAgICB0aGlzLnZpZXdRdWVyeSA9IHZpZXdRdWVyeTtcbiAgICB0aGlzLnRva2VuID0gdG9rZW47XG4gIH1cblxuICBzdGF0aWMgZnJvbUpzb24oZGF0YToge1trZXk6IHN0cmluZ106IGFueX0pOiBDb21waWxlRGlEZXBlbmRlbmN5TWV0YWRhdGEge1xuICAgIHJldHVybiBuZXcgQ29tcGlsZURpRGVwZW5kZW5jeU1ldGFkYXRhKHtcbiAgICAgIHRva2VuOiBvYmpGcm9tSnNvbihkYXRhWyd0b2tlbiddLCBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhLmZyb21Kc29uKSxcbiAgICAgIHF1ZXJ5OiBvYmpGcm9tSnNvbihkYXRhWydxdWVyeSddLCBDb21waWxlUXVlcnlNZXRhZGF0YS5mcm9tSnNvbiksXG4gICAgICB2aWV3UXVlcnk6IG9iakZyb21Kc29uKGRhdGFbJ3ZpZXdRdWVyeSddLCBDb21waWxlUXVlcnlNZXRhZGF0YS5mcm9tSnNvbiksXG4gICAgICBpc0F0dHJpYnV0ZTogZGF0YVsnaXNBdHRyaWJ1dGUnXSxcbiAgICAgIGlzU2VsZjogZGF0YVsnaXNTZWxmJ10sXG4gICAgICBpc0hvc3Q6IGRhdGFbJ2lzSG9zdCddLFxuICAgICAgaXNTa2lwU2VsZjogZGF0YVsnaXNTa2lwU2VsZiddLFxuICAgICAgaXNPcHRpb25hbDogZGF0YVsnaXNPcHRpb25hbCddXG4gICAgfSk7XG4gIH1cblxuICB0b0pzb24oKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBOb3RlOiBSdW50aW1lIHR5cGUgY2FuJ3QgYmUgc2VyaWFsaXplZC4uLlxuICAgICAgJ3Rva2VuJzogb2JqVG9Kc29uKHRoaXMudG9rZW4pLFxuICAgICAgJ3F1ZXJ5Jzogb2JqVG9Kc29uKHRoaXMucXVlcnkpLFxuICAgICAgJ3ZpZXdRdWVyeSc6IG9ialRvSnNvbih0aGlzLnZpZXdRdWVyeSksXG4gICAgICAnaXNBdHRyaWJ1dGUnOiB0aGlzLmlzQXR0cmlidXRlLFxuICAgICAgJ2lzU2VsZic6IHRoaXMuaXNTZWxmLFxuICAgICAgJ2lzSG9zdCc6IHRoaXMuaXNIb3N0LFxuICAgICAgJ2lzU2tpcFNlbGYnOiB0aGlzLmlzU2tpcFNlbGYsXG4gICAgICAnaXNPcHRpb25hbCc6IHRoaXMuaXNPcHRpb25hbFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbXBpbGVQcm92aWRlck1ldGFkYXRhIHtcbiAgdG9rZW46IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEgfCBzdHJpbmc7XG4gIHVzZUNsYXNzOiBDb21waWxlVHlwZU1ldGFkYXRhO1xuICB1c2VWYWx1ZTogYW55O1xuICB1c2VFeGlzdGluZzogQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSB8IHN0cmluZztcbiAgdXNlRmFjdG9yeTogQ29tcGlsZUZhY3RvcnlNZXRhZGF0YTtcbiAgZGVwczogQ29tcGlsZURpRGVwZW5kZW5jeU1ldGFkYXRhW107XG4gIG11bHRpOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHt0b2tlbiwgdXNlQ2xhc3MsIHVzZVZhbHVlLCB1c2VFeGlzdGluZywgdXNlRmFjdG9yeSwgZGVwcywgbXVsdGl9OiB7XG4gICAgdG9rZW4/OiBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhIHwgc3RyaW5nLFxuICAgIHVzZUNsYXNzPzogQ29tcGlsZVR5cGVNZXRhZGF0YSxcbiAgICB1c2VWYWx1ZT86IGFueSxcbiAgICB1c2VFeGlzdGluZz86IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEgfCBzdHJpbmcsXG4gICAgdXNlRmFjdG9yeT86IENvbXBpbGVGYWN0b3J5TWV0YWRhdGEsXG4gICAgZGVwcz86IENvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YVtdLFxuICAgIG11bHRpPzogYm9vbGVhblxuICB9KSB7XG4gICAgdGhpcy50b2tlbiA9IHRva2VuO1xuICAgIHRoaXMudXNlQ2xhc3MgPSB1c2VDbGFzcztcbiAgICB0aGlzLnVzZVZhbHVlID0gdXNlVmFsdWU7XG4gICAgdGhpcy51c2VFeGlzdGluZyA9IHVzZUV4aXN0aW5nO1xuICAgIHRoaXMudXNlRmFjdG9yeSA9IHVzZUZhY3Rvcnk7XG4gICAgdGhpcy5kZXBzID0gZGVwcztcbiAgICB0aGlzLm11bHRpID0gbXVsdGk7XG4gIH1cblxuICBzdGF0aWMgZnJvbUpzb24oZGF0YToge1trZXk6IHN0cmluZ106IGFueX0pOiBDb21waWxlUHJvdmlkZXJNZXRhZGF0YSB7XG4gICAgcmV0dXJuIG5ldyBDb21waWxlUHJvdmlkZXJNZXRhZGF0YSh7XG4gICAgICB0b2tlbjogb2JqRnJvbUpzb24oZGF0YVsndG9rZW4nXSwgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YS5mcm9tSnNvbiksXG4gICAgICB1c2VDbGFzczogb2JqRnJvbUpzb24oZGF0YVsndXNlQ2xhc3MnXSwgQ29tcGlsZVR5cGVNZXRhZGF0YS5mcm9tSnNvbilcbiAgICB9KTtcbiAgfVxuXG4gIHRvSnNvbigpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIE5vdGU6IFJ1bnRpbWUgdHlwZSBjYW4ndCBiZSBzZXJpYWxpemVkLi4uXG4gICAgICAndG9rZW4nOiBvYmpUb0pzb24odGhpcy50b2tlbiksXG4gICAgICAndXNlQ2xhc3MnOiBvYmpUb0pzb24odGhpcy51c2VDbGFzcylcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21waWxlRmFjdG9yeU1ldGFkYXRhIGltcGxlbWVudHMgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSB7XG4gIHJ1bnRpbWU6IEZ1bmN0aW9uO1xuICBuYW1lOiBzdHJpbmc7XG4gIHByZWZpeDogc3RyaW5nO1xuICBtb2R1bGVVcmw6IHN0cmluZztcbiAgY29uc3RDb25zdHJ1Y3RvcjogYm9vbGVhbjtcbiAgZGlEZXBzOiBDb21waWxlRGlEZXBlbmRlbmN5TWV0YWRhdGFbXTtcblxuICBjb25zdHJ1Y3Rvcih7cnVudGltZSwgbmFtZSwgbW9kdWxlVXJsLCBjb25zdENvbnN0cnVjdG9yLCBkaURlcHN9OiB7XG4gICAgcnVudGltZT86IEZ1bmN0aW9uLFxuICAgIG5hbWU/OiBzdHJpbmcsXG4gICAgbW9kdWxlVXJsPzogc3RyaW5nLFxuICAgIGNvbnN0Q29uc3RydWN0b3I/OiBib29sZWFuLFxuICAgIGRpRGVwcz86IENvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YVtdXG4gIH0pIHtcbiAgICB0aGlzLnJ1bnRpbWUgPSBydW50aW1lO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5tb2R1bGVVcmwgPSBtb2R1bGVVcmw7XG4gICAgdGhpcy5kaURlcHMgPSBkaURlcHM7XG4gICAgdGhpcy5jb25zdENvbnN0cnVjdG9yID0gY29uc3RDb25zdHJ1Y3RvcjtcbiAgfVxuXG4gIGdldCBpZGVudGlmaWVyKCk6IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEgeyByZXR1cm4gdGhpczsgfVxuXG4gIHRvSnNvbigpIHsgcmV0dXJuIG51bGw7IH1cbn1cblxuLyoqXG4gKiBNZXRhZGF0YSByZWdhcmRpbmcgY29tcGlsYXRpb24gb2YgYSB0eXBlLlxuICovXG5leHBvcnQgY2xhc3MgQ29tcGlsZVR5cGVNZXRhZGF0YSBpbXBsZW1lbnRzIENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEsIENvbXBpbGVNZXRhZGF0YVdpdGhUeXBlIHtcbiAgcnVudGltZTogVHlwZTtcbiAgbmFtZTogc3RyaW5nO1xuICBwcmVmaXg6IHN0cmluZztcbiAgbW9kdWxlVXJsOiBzdHJpbmc7XG4gIGlzSG9zdDogYm9vbGVhbjtcbiAgY29uc3RDb25zdHJ1Y3RvcjogYm9vbGVhbjtcbiAgZGlEZXBzOiBDb21waWxlRGlEZXBlbmRlbmN5TWV0YWRhdGFbXTtcblxuICBjb25zdHJ1Y3Rvcih7cnVudGltZSwgbmFtZSwgbW9kdWxlVXJsLCBwcmVmaXgsIGlzSG9zdCwgY29uc3RDb25zdHJ1Y3RvciwgZGlEZXBzfToge1xuICAgIHJ1bnRpbWU/OiBUeXBlLFxuICAgIG5hbWU/OiBzdHJpbmcsXG4gICAgbW9kdWxlVXJsPzogc3RyaW5nLFxuICAgIHByZWZpeD86IHN0cmluZyxcbiAgICBpc0hvc3Q/OiBib29sZWFuLFxuICAgIGNvbnN0Q29uc3RydWN0b3I/OiBib29sZWFuLFxuICAgIGRpRGVwcz86IENvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YVtdXG4gIH0gPSB7fSkge1xuICAgIHRoaXMucnVudGltZSA9IHJ1bnRpbWU7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLm1vZHVsZVVybCA9IG1vZHVsZVVybDtcbiAgICB0aGlzLnByZWZpeCA9IHByZWZpeDtcbiAgICB0aGlzLmlzSG9zdCA9IG5vcm1hbGl6ZUJvb2woaXNIb3N0KTtcbiAgICB0aGlzLmNvbnN0Q29uc3RydWN0b3IgPSBjb25zdENvbnN0cnVjdG9yO1xuICAgIHRoaXMuZGlEZXBzID0gbm9ybWFsaXplQmxhbmsoZGlEZXBzKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSnNvbihkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSk6IENvbXBpbGVUeXBlTWV0YWRhdGEge1xuICAgIHJldHVybiBuZXcgQ29tcGlsZVR5cGVNZXRhZGF0YSh7XG4gICAgICBuYW1lOiBkYXRhWyduYW1lJ10sXG4gICAgICBtb2R1bGVVcmw6IGRhdGFbJ21vZHVsZVVybCddLFxuICAgICAgcHJlZml4OiBkYXRhWydwcmVmaXgnXSxcbiAgICAgIGlzSG9zdDogZGF0YVsnaXNIb3N0J10sXG4gICAgICBjb25zdENvbnN0cnVjdG9yOiBkYXRhWydjb25zdENvbnN0cnVjdG9yJ10sXG4gICAgICBkaURlcHM6IGFycmF5RnJvbUpzb24oZGF0YVsnZGlEZXBzJ10sIENvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YS5mcm9tSnNvbilcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBpZGVudGlmaWVyKCk6IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEgeyByZXR1cm4gdGhpczsgfVxuICBnZXQgdHlwZSgpOiBDb21waWxlVHlwZU1ldGFkYXRhIHsgcmV0dXJuIHRoaXM7IH1cblxuICB0b0pzb24oKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBOb3RlOiBSdW50aW1lIHR5cGUgY2FuJ3QgYmUgc2VyaWFsaXplZC4uLlxuICAgICAgJ2NsYXNzJzogJ1R5cGUnLFxuICAgICAgJ25hbWUnOiB0aGlzLm5hbWUsXG4gICAgICAnbW9kdWxlVXJsJzogdGhpcy5tb2R1bGVVcmwsXG4gICAgICAncHJlZml4JzogdGhpcy5wcmVmaXgsXG4gICAgICAnaXNIb3N0JzogdGhpcy5pc0hvc3QsXG4gICAgICAnY29uc3RDb25zdHJ1Y3Rvcic6IHRoaXMuY29uc3RDb25zdHJ1Y3RvcixcbiAgICAgICdkaURlcHMnOiBhcnJheVRvSnNvbih0aGlzLmRpRGVwcylcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21waWxlUXVlcnlNZXRhZGF0YSB7XG4gIHNlbGVjdG9yczogQXJyYXk8Q29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSB8IHN0cmluZz47XG4gIGRlc2NlbmRhbnRzOiBib29sZWFuO1xuICBmaXJzdDogYm9vbGVhbjtcbiAgcHJvcGVydHlOYW1lOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3Ioe3NlbGVjdG9ycywgZGVzY2VuZGFudHMsIGZpcnN0LCBwcm9wZXJ0eU5hbWV9OiB7XG4gICAgc2VsZWN0b3JzPzogQXJyYXk8Q29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSB8IHN0cmluZz4sXG4gICAgZGVzY2VuZGFudHM/OiBib29sZWFuLFxuICAgIGZpcnN0PzogYm9vbGVhbixcbiAgICBwcm9wZXJ0eU5hbWU/OiBzdHJpbmdcbiAgfSA9IHt9KSB7XG4gICAgdGhpcy5zZWxlY3RvcnMgPSBzZWxlY3RvcnM7XG4gICAgdGhpcy5kZXNjZW5kYW50cyA9IGRlc2NlbmRhbnRzO1xuICAgIHRoaXMuZmlyc3QgPSBub3JtYWxpemVCb29sKGZpcnN0KTtcbiAgICB0aGlzLnByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSnNvbihkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSk6IENvbXBpbGVRdWVyeU1ldGFkYXRhIHtcbiAgICByZXR1cm4gbmV3IENvbXBpbGVRdWVyeU1ldGFkYXRhKHtcbiAgICAgIHNlbGVjdG9yczogYXJyYXlGcm9tSnNvbihkYXRhWydzZWxlY3RvcnMnXSwgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YS5mcm9tSnNvbiksXG4gICAgICBkZXNjZW5kYW50czogZGF0YVsnZGVzY2VuZGFudHMnXSxcbiAgICAgIGZpcnN0OiBkYXRhWydmaXJzdCddLFxuICAgICAgcHJvcGVydHlOYW1lOiBkYXRhWydwcm9wZXJ0eU5hbWUnXVxuICAgIH0pO1xuICB9XG5cbiAgdG9Kc29uKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gTm90ZTogUnVudGltZSB0eXBlIGNhbid0IGJlIHNlcmlhbGl6ZWQuLi5cbiAgICAgICdzZWxlY3RvcnMnOiBhcnJheVRvSnNvbih0aGlzLnNlbGVjdG9ycyksXG4gICAgICAnZGVzY2VuZGFudHMnOiB0aGlzLmRlc2NlbmRhbnRzLFxuICAgICAgJ2ZpcnN0JzogdGhpcy5maXJzdCxcbiAgICAgICdwcm9wZXJ0eU5hbWUnOiB0aGlzLnByb3BlcnR5TmFtZVxuICAgIH07XG4gIH1cbn1cblxuLyoqXG4gKiBNZXRhZGF0YSByZWdhcmRpbmcgY29tcGlsYXRpb24gb2YgYSB0ZW1wbGF0ZS5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbXBpbGVUZW1wbGF0ZU1ldGFkYXRhIHtcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb247XG4gIHRlbXBsYXRlOiBzdHJpbmc7XG4gIHRlbXBsYXRlVXJsOiBzdHJpbmc7XG4gIHN0eWxlczogc3RyaW5nW107XG4gIHN0eWxlVXJsczogc3RyaW5nW107XG4gIG5nQ29udGVudFNlbGVjdG9yczogc3RyaW5nW107XG4gIGNvbnN0cnVjdG9yKHtlbmNhcHN1bGF0aW9uLCB0ZW1wbGF0ZSwgdGVtcGxhdGVVcmwsIHN0eWxlcywgc3R5bGVVcmxzLCBuZ0NvbnRlbnRTZWxlY3RvcnN9OiB7XG4gICAgZW5jYXBzdWxhdGlvbj86IFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIHRlbXBsYXRlPzogc3RyaW5nLFxuICAgIHRlbXBsYXRlVXJsPzogc3RyaW5nLFxuICAgIHN0eWxlcz86IHN0cmluZ1tdLFxuICAgIHN0eWxlVXJscz86IHN0cmluZ1tdLFxuICAgIG5nQ29udGVudFNlbGVjdG9ycz86IHN0cmluZ1tdXG4gIH0gPSB7fSkge1xuICAgIHRoaXMuZW5jYXBzdWxhdGlvbiA9IGlzUHJlc2VudChlbmNhcHN1bGF0aW9uKSA/IGVuY2Fwc3VsYXRpb24gOiBWaWV3RW5jYXBzdWxhdGlvbi5FbXVsYXRlZDtcbiAgICB0aGlzLnRlbXBsYXRlID0gdGVtcGxhdGU7XG4gICAgdGhpcy50ZW1wbGF0ZVVybCA9IHRlbXBsYXRlVXJsO1xuICAgIHRoaXMuc3R5bGVzID0gaXNQcmVzZW50KHN0eWxlcykgPyBzdHlsZXMgOiBbXTtcbiAgICB0aGlzLnN0eWxlVXJscyA9IGlzUHJlc2VudChzdHlsZVVybHMpID8gc3R5bGVVcmxzIDogW107XG4gICAgdGhpcy5uZ0NvbnRlbnRTZWxlY3RvcnMgPSBpc1ByZXNlbnQobmdDb250ZW50U2VsZWN0b3JzKSA/IG5nQ29udGVudFNlbGVjdG9ycyA6IFtdO1xuICB9XG5cbiAgc3RhdGljIGZyb21Kc29uKGRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGEge1xuICAgIHJldHVybiBuZXcgQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGEoe1xuICAgICAgZW5jYXBzdWxhdGlvbjogaXNQcmVzZW50KGRhdGFbJ2VuY2Fwc3VsYXRpb24nXSkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgIFZJRVdfRU5DQVBTVUxBVElPTl9WQUxVRVNbZGF0YVsnZW5jYXBzdWxhdGlvbiddXSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVsnZW5jYXBzdWxhdGlvbiddLFxuICAgICAgdGVtcGxhdGU6IGRhdGFbJ3RlbXBsYXRlJ10sXG4gICAgICB0ZW1wbGF0ZVVybDogZGF0YVsndGVtcGxhdGVVcmwnXSxcbiAgICAgIHN0eWxlczogZGF0YVsnc3R5bGVzJ10sXG4gICAgICBzdHlsZVVybHM6IGRhdGFbJ3N0eWxlVXJscyddLFxuICAgICAgbmdDb250ZW50U2VsZWN0b3JzOiBkYXRhWyduZ0NvbnRlbnRTZWxlY3RvcnMnXVxuICAgIH0pO1xuICB9XG5cbiAgdG9Kc29uKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2VuY2Fwc3VsYXRpb24nOlxuICAgICAgICAgIGlzUHJlc2VudCh0aGlzLmVuY2Fwc3VsYXRpb24pID8gc2VyaWFsaXplRW51bSh0aGlzLmVuY2Fwc3VsYXRpb24pIDogdGhpcy5lbmNhcHN1bGF0aW9uLFxuICAgICAgJ3RlbXBsYXRlJzogdGhpcy50ZW1wbGF0ZSxcbiAgICAgICd0ZW1wbGF0ZVVybCc6IHRoaXMudGVtcGxhdGVVcmwsXG4gICAgICAnc3R5bGVzJzogdGhpcy5zdHlsZXMsXG4gICAgICAnc3R5bGVVcmxzJzogdGhpcy5zdHlsZVVybHMsXG4gICAgICAnbmdDb250ZW50U2VsZWN0b3JzJzogdGhpcy5uZ0NvbnRlbnRTZWxlY3RvcnNcbiAgICB9O1xuICB9XG59XG5cbi8qKlxuICogTWV0YWRhdGEgcmVnYXJkaW5nIGNvbXBpbGF0aW9uIG9mIGEgZGlyZWN0aXZlLlxuICovXG5leHBvcnQgY2xhc3MgQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhIGltcGxlbWVudHMgQ29tcGlsZU1ldGFkYXRhV2l0aFR5cGUge1xuICBzdGF0aWMgY3JlYXRlKHt0eXBlLCBpc0NvbXBvbmVudCwgZHluYW1pY0xvYWRhYmxlLCBzZWxlY3RvciwgZXhwb3J0QXMsIGNoYW5nZURldGVjdGlvbiwgaW5wdXRzLFxuICAgICAgICAgICAgICAgICBvdXRwdXRzLCBob3N0LCBsaWZlY3ljbGVIb29rcywgcHJvdmlkZXJzLCB2aWV3UHJvdmlkZXJzLCBxdWVyaWVzLCB2aWV3UXVlcmllcyxcbiAgICAgICAgICAgICAgICAgdGVtcGxhdGV9OiB7XG4gICAgdHlwZT86IENvbXBpbGVUeXBlTWV0YWRhdGEsXG4gICAgaXNDb21wb25lbnQ/OiBib29sZWFuLFxuICAgIGR5bmFtaWNMb2FkYWJsZT86IGJvb2xlYW4sXG4gICAgc2VsZWN0b3I/OiBzdHJpbmcsXG4gICAgZXhwb3J0QXM/OiBzdHJpbmcsXG4gICAgY2hhbmdlRGV0ZWN0aW9uPzogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgaW5wdXRzPzogc3RyaW5nW10sXG4gICAgb3V0cHV0cz86IHN0cmluZ1tdLFxuICAgIGhvc3Q/OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSxcbiAgICBsaWZlY3ljbGVIb29rcz86IExpZmVjeWNsZUhvb2tzW10sXG4gICAgcHJvdmlkZXJzPzogQXJyYXk8Q29tcGlsZVByb3ZpZGVyTWV0YWRhdGEgfCBDb21waWxlVHlwZU1ldGFkYXRhIHwgYW55W10+LFxuICAgIHZpZXdQcm92aWRlcnM/OiBBcnJheTxDb21waWxlUHJvdmlkZXJNZXRhZGF0YSB8IENvbXBpbGVUeXBlTWV0YWRhdGEgfCBhbnlbXT4sXG4gICAgcXVlcmllcz86IENvbXBpbGVRdWVyeU1ldGFkYXRhW10sXG4gICAgdmlld1F1ZXJpZXM/OiBDb21waWxlUXVlcnlNZXRhZGF0YVtdLFxuICAgIHRlbXBsYXRlPzogQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGFcbiAgfSA9IHt9KTogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhIHtcbiAgICB2YXIgaG9zdExpc3RlbmVyczoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgICB2YXIgaG9zdFByb3BlcnRpZXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gICAgdmFyIGhvc3RBdHRyaWJ1dGVzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICAgIGlmIChpc1ByZXNlbnQoaG9zdCkpIHtcbiAgICAgIFN0cmluZ01hcFdyYXBwZXIuZm9yRWFjaChob3N0LCAodmFsdWU6IHN0cmluZywga2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgdmFyIG1hdGNoZXMgPSBSZWdFeHBXcmFwcGVyLmZpcnN0TWF0Y2goSE9TVF9SRUdfRVhQLCBrZXkpO1xuICAgICAgICBpZiAoaXNCbGFuayhtYXRjaGVzKSkge1xuICAgICAgICAgIGhvc3RBdHRyaWJ1dGVzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQobWF0Y2hlc1sxXSkpIHtcbiAgICAgICAgICBob3N0UHJvcGVydGllc1ttYXRjaGVzWzFdXSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudChtYXRjaGVzWzJdKSkge1xuICAgICAgICAgIGhvc3RMaXN0ZW5lcnNbbWF0Y2hlc1syXV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHZhciBpbnB1dHNNYXA6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gICAgaWYgKGlzUHJlc2VudChpbnB1dHMpKSB7XG4gICAgICBpbnB1dHMuZm9yRWFjaCgoYmluZENvbmZpZzogc3RyaW5nKSA9PiB7XG4gICAgICAgIC8vIGNhbm9uaWNhbCBzeW50YXg6IGBkaXJQcm9wOiBlbFByb3BgXG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIGA6YCwgdXNlIGRpclByb3AgPSBlbFByb3BcbiAgICAgICAgdmFyIHBhcnRzID0gc3BsaXRBdENvbG9uKGJpbmRDb25maWcsIFtiaW5kQ29uZmlnLCBiaW5kQ29uZmlnXSk7XG4gICAgICAgIGlucHV0c01hcFtwYXJ0c1swXV0gPSBwYXJ0c1sxXTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB2YXIgb3V0cHV0c01hcDoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgICBpZiAoaXNQcmVzZW50KG91dHB1dHMpKSB7XG4gICAgICBvdXRwdXRzLmZvckVhY2goKGJpbmRDb25maWc6IHN0cmluZykgPT4ge1xuICAgICAgICAvLyBjYW5vbmljYWwgc3ludGF4OiBgZGlyUHJvcDogZWxQcm9wYFxuICAgICAgICAvLyBpZiB0aGVyZSBpcyBubyBgOmAsIHVzZSBkaXJQcm9wID0gZWxQcm9wXG4gICAgICAgIHZhciBwYXJ0cyA9IHNwbGl0QXRDb2xvbihiaW5kQ29uZmlnLCBbYmluZENvbmZpZywgYmluZENvbmZpZ10pO1xuICAgICAgICBvdXRwdXRzTWFwW3BhcnRzWzBdXSA9IHBhcnRzWzFdO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEoe1xuICAgICAgdHlwZTogdHlwZSxcbiAgICAgIGlzQ29tcG9uZW50OiBub3JtYWxpemVCb29sKGlzQ29tcG9uZW50KSxcbiAgICAgIGR5bmFtaWNMb2FkYWJsZTogbm9ybWFsaXplQm9vbChkeW5hbWljTG9hZGFibGUpLFxuICAgICAgc2VsZWN0b3I6IHNlbGVjdG9yLFxuICAgICAgZXhwb3J0QXM6IGV4cG9ydEFzLFxuICAgICAgY2hhbmdlRGV0ZWN0aW9uOiBjaGFuZ2VEZXRlY3Rpb24sXG4gICAgICBpbnB1dHM6IGlucHV0c01hcCxcbiAgICAgIG91dHB1dHM6IG91dHB1dHNNYXAsXG4gICAgICBob3N0TGlzdGVuZXJzOiBob3N0TGlzdGVuZXJzLFxuICAgICAgaG9zdFByb3BlcnRpZXM6IGhvc3RQcm9wZXJ0aWVzLFxuICAgICAgaG9zdEF0dHJpYnV0ZXM6IGhvc3RBdHRyaWJ1dGVzLFxuICAgICAgbGlmZWN5Y2xlSG9va3M6IGlzUHJlc2VudChsaWZlY3ljbGVIb29rcykgPyBsaWZlY3ljbGVIb29rcyA6IFtdLFxuICAgICAgcHJvdmlkZXJzOiBwcm92aWRlcnMsXG4gICAgICB2aWV3UHJvdmlkZXJzOiB2aWV3UHJvdmlkZXJzLFxuICAgICAgcXVlcmllczogcXVlcmllcyxcbiAgICAgIHZpZXdRdWVyaWVzOiB2aWV3UXVlcmllcyxcbiAgICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVxuICAgIH0pO1xuICB9XG4gIHR5cGU6IENvbXBpbGVUeXBlTWV0YWRhdGE7XG4gIGlzQ29tcG9uZW50OiBib29sZWFuO1xuICBkeW5hbWljTG9hZGFibGU6IGJvb2xlYW47XG4gIHNlbGVjdG9yOiBzdHJpbmc7XG4gIGV4cG9ydEFzOiBzdHJpbmc7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3k7XG4gIGlucHV0czoge1trZXk6IHN0cmluZ106IHN0cmluZ307XG4gIG91dHB1dHM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuICBob3N0TGlzdGVuZXJzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfTtcbiAgaG9zdFByb3BlcnRpZXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuICBob3N0QXR0cmlidXRlczoge1trZXk6IHN0cmluZ106IHN0cmluZ307XG4gIGxpZmVjeWNsZUhvb2tzOiBMaWZlY3ljbGVIb29rc1tdO1xuICBwcm92aWRlcnM6IEFycmF5PENvbXBpbGVQcm92aWRlck1ldGFkYXRhIHwgQ29tcGlsZVR5cGVNZXRhZGF0YSB8IGFueVtdPjtcbiAgdmlld1Byb3ZpZGVyczogQXJyYXk8Q29tcGlsZVByb3ZpZGVyTWV0YWRhdGEgfCBDb21waWxlVHlwZU1ldGFkYXRhIHwgYW55W10+O1xuICBxdWVyaWVzOiBDb21waWxlUXVlcnlNZXRhZGF0YVtdO1xuICB2aWV3UXVlcmllczogQ29tcGlsZVF1ZXJ5TWV0YWRhdGFbXTtcbiAgdGVtcGxhdGU6IENvbXBpbGVUZW1wbGF0ZU1ldGFkYXRhO1xuICBjb25zdHJ1Y3Rvcih7dHlwZSwgaXNDb21wb25lbnQsIGR5bmFtaWNMb2FkYWJsZSwgc2VsZWN0b3IsIGV4cG9ydEFzLCBjaGFuZ2VEZXRlY3Rpb24sIGlucHV0cyxcbiAgICAgICAgICAgICAgIG91dHB1dHMsIGhvc3RMaXN0ZW5lcnMsIGhvc3RQcm9wZXJ0aWVzLCBob3N0QXR0cmlidXRlcywgbGlmZWN5Y2xlSG9va3MsIHByb3ZpZGVycyxcbiAgICAgICAgICAgICAgIHZpZXdQcm92aWRlcnMsIHF1ZXJpZXMsIHZpZXdRdWVyaWVzLCB0ZW1wbGF0ZX06IHtcbiAgICB0eXBlPzogQ29tcGlsZVR5cGVNZXRhZGF0YSxcbiAgICBpc0NvbXBvbmVudD86IGJvb2xlYW4sXG4gICAgZHluYW1pY0xvYWRhYmxlPzogYm9vbGVhbixcbiAgICBzZWxlY3Rvcj86IHN0cmluZyxcbiAgICBleHBvcnRBcz86IHN0cmluZyxcbiAgICBjaGFuZ2VEZXRlY3Rpb24/OiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBpbnB1dHM/OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSxcbiAgICBvdXRwdXRzPzoge1trZXk6IHN0cmluZ106IHN0cmluZ30sXG4gICAgaG9zdExpc3RlbmVycz86IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9LFxuICAgIGhvc3RQcm9wZXJ0aWVzPzoge1trZXk6IHN0cmluZ106IHN0cmluZ30sXG4gICAgaG9zdEF0dHJpYnV0ZXM/OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSxcbiAgICBsaWZlY3ljbGVIb29rcz86IExpZmVjeWNsZUhvb2tzW10sXG4gICAgcHJvdmlkZXJzPzogQXJyYXk8Q29tcGlsZVByb3ZpZGVyTWV0YWRhdGEgfCBDb21waWxlVHlwZU1ldGFkYXRhIHwgYW55W10+LFxuICAgIHZpZXdQcm92aWRlcnM/OiBBcnJheTxDb21waWxlUHJvdmlkZXJNZXRhZGF0YSB8IENvbXBpbGVUeXBlTWV0YWRhdGEgfCBhbnlbXT4sXG4gICAgcXVlcmllcz86IENvbXBpbGVRdWVyeU1ldGFkYXRhW10sXG4gICAgdmlld1F1ZXJpZXM/OiBDb21waWxlUXVlcnlNZXRhZGF0YVtdLFxuICAgIHRlbXBsYXRlPzogQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGFcbiAgfSA9IHt9KSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmlzQ29tcG9uZW50ID0gaXNDb21wb25lbnQ7XG4gICAgdGhpcy5keW5hbWljTG9hZGFibGUgPSBkeW5hbWljTG9hZGFibGU7XG4gICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xuICAgIHRoaXMuZXhwb3J0QXMgPSBleHBvcnRBcztcbiAgICB0aGlzLmNoYW5nZURldGVjdGlvbiA9IGNoYW5nZURldGVjdGlvbjtcbiAgICB0aGlzLmlucHV0cyA9IGlucHV0cztcbiAgICB0aGlzLm91dHB1dHMgPSBvdXRwdXRzO1xuICAgIHRoaXMuaG9zdExpc3RlbmVycyA9IGhvc3RMaXN0ZW5lcnM7XG4gICAgdGhpcy5ob3N0UHJvcGVydGllcyA9IGhvc3RQcm9wZXJ0aWVzO1xuICAgIHRoaXMuaG9zdEF0dHJpYnV0ZXMgPSBob3N0QXR0cmlidXRlcztcbiAgICB0aGlzLmxpZmVjeWNsZUhvb2tzID0gbGlmZWN5Y2xlSG9va3M7XG4gICAgdGhpcy5wcm92aWRlcnMgPSBub3JtYWxpemVCbGFuayhwcm92aWRlcnMpO1xuICAgIHRoaXMudmlld1Byb3ZpZGVycyA9IG5vcm1hbGl6ZUJsYW5rKHZpZXdQcm92aWRlcnMpO1xuICAgIHRoaXMucXVlcmllcyA9IHF1ZXJpZXM7XG4gICAgdGhpcy52aWV3UXVlcmllcyA9IHZpZXdRdWVyaWVzO1xuICAgIHRoaXMudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgfVxuXG4gIGdldCBpZGVudGlmaWVyKCk6IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEgeyByZXR1cm4gdGhpcy50eXBlOyB9XG5cbiAgc3RhdGljIGZyb21Kc29uKGRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhIHtcbiAgICByZXR1cm4gbmV3IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSh7XG4gICAgICBpc0NvbXBvbmVudDogZGF0YVsnaXNDb21wb25lbnQnXSxcbiAgICAgIGR5bmFtaWNMb2FkYWJsZTogZGF0YVsnZHluYW1pY0xvYWRhYmxlJ10sXG4gICAgICBzZWxlY3RvcjogZGF0YVsnc2VsZWN0b3InXSxcbiAgICAgIGV4cG9ydEFzOiBkYXRhWydleHBvcnRBcyddLFxuICAgICAgdHlwZTogaXNQcmVzZW50KGRhdGFbJ3R5cGUnXSkgPyBDb21waWxlVHlwZU1ldGFkYXRhLmZyb21Kc29uKGRhdGFbJ3R5cGUnXSkgOiBkYXRhWyd0eXBlJ10sXG4gICAgICBjaGFuZ2VEZXRlY3Rpb246IGlzUHJlc2VudChkYXRhWydjaGFuZ2VEZXRlY3Rpb24nXSkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgQ0hBTkdFX0RFVEVDVElPTl9TVFJBVEVHWV9WQUxVRVNbZGF0YVsnY2hhbmdlRGV0ZWN0aW9uJ11dIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbJ2NoYW5nZURldGVjdGlvbiddLFxuICAgICAgaW5wdXRzOiBkYXRhWydpbnB1dHMnXSxcbiAgICAgIG91dHB1dHM6IGRhdGFbJ291dHB1dHMnXSxcbiAgICAgIGhvc3RMaXN0ZW5lcnM6IGRhdGFbJ2hvc3RMaXN0ZW5lcnMnXSxcbiAgICAgIGhvc3RQcm9wZXJ0aWVzOiBkYXRhWydob3N0UHJvcGVydGllcyddLFxuICAgICAgaG9zdEF0dHJpYnV0ZXM6IGRhdGFbJ2hvc3RBdHRyaWJ1dGVzJ10sXG4gICAgICBsaWZlY3ljbGVIb29rczpcbiAgICAgICAgICAoPGFueVtdPmRhdGFbJ2xpZmVjeWNsZUhvb2tzJ10pLm1hcChob29rVmFsdWUgPT4gTElGRUNZQ0xFX0hPT0tTX1ZBTFVFU1tob29rVmFsdWVdKSxcbiAgICAgIHRlbXBsYXRlOiBpc1ByZXNlbnQoZGF0YVsndGVtcGxhdGUnXSkgPyBDb21waWxlVGVtcGxhdGVNZXRhZGF0YS5mcm9tSnNvbihkYXRhWyd0ZW1wbGF0ZSddKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVsndGVtcGxhdGUnXSxcbiAgICAgIHByb3ZpZGVyczogYXJyYXlGcm9tSnNvbihkYXRhWydwcm92aWRlcnMnXSwgQ29tcGlsZVByb3ZpZGVyTWV0YWRhdGEuZnJvbUpzb24pXG4gICAgfSk7XG4gIH1cblxuICB0b0pzb24oKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgIHJldHVybiB7XG4gICAgICAnY2xhc3MnOiAnRGlyZWN0aXZlJyxcbiAgICAgICdpc0NvbXBvbmVudCc6IHRoaXMuaXNDb21wb25lbnQsXG4gICAgICAnZHluYW1pY0xvYWRhYmxlJzogdGhpcy5keW5hbWljTG9hZGFibGUsXG4gICAgICAnc2VsZWN0b3InOiB0aGlzLnNlbGVjdG9yLFxuICAgICAgJ2V4cG9ydEFzJzogdGhpcy5leHBvcnRBcyxcbiAgICAgICd0eXBlJzogaXNQcmVzZW50KHRoaXMudHlwZSkgPyB0aGlzLnR5cGUudG9Kc29uKCkgOiB0aGlzLnR5cGUsXG4gICAgICAnY2hhbmdlRGV0ZWN0aW9uJzogaXNQcmVzZW50KHRoaXMuY2hhbmdlRGV0ZWN0aW9uKSA/IHNlcmlhbGl6ZUVudW0odGhpcy5jaGFuZ2VEZXRlY3Rpb24pIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rpb24sXG4gICAgICAnaW5wdXRzJzogdGhpcy5pbnB1dHMsXG4gICAgICAnb3V0cHV0cyc6IHRoaXMub3V0cHV0cyxcbiAgICAgICdob3N0TGlzdGVuZXJzJzogdGhpcy5ob3N0TGlzdGVuZXJzLFxuICAgICAgJ2hvc3RQcm9wZXJ0aWVzJzogdGhpcy5ob3N0UHJvcGVydGllcyxcbiAgICAgICdob3N0QXR0cmlidXRlcyc6IHRoaXMuaG9zdEF0dHJpYnV0ZXMsXG4gICAgICAnbGlmZWN5Y2xlSG9va3MnOiB0aGlzLmxpZmVjeWNsZUhvb2tzLm1hcChob29rID0+IHNlcmlhbGl6ZUVudW0oaG9vaykpLFxuICAgICAgJ3RlbXBsYXRlJzogaXNQcmVzZW50KHRoaXMudGVtcGxhdGUpID8gdGhpcy50ZW1wbGF0ZS50b0pzb24oKSA6IHRoaXMudGVtcGxhdGUsXG4gICAgICAncHJvdmlkZXJzJzogYXJyYXlUb0pzb24odGhpcy5wcm92aWRlcnMpXG4gICAgfTtcbiAgfVxufVxuXG4vKipcbiAqIENvbnN0cnVjdCB7QGxpbmsgQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhfSBmcm9tIHtAbGluayBDb21wb25lbnRUeXBlTWV0YWRhdGF9IGFuZCBhIHNlbGVjdG9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSG9zdENvbXBvbmVudE1ldGEoY29tcG9uZW50VHlwZTogQ29tcGlsZVR5cGVNZXRhZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRTZWxlY3Rvcjogc3RyaW5nKTogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhIHtcbiAgdmFyIHRlbXBsYXRlID0gQ3NzU2VsZWN0b3IucGFyc2UoY29tcG9uZW50U2VsZWN0b3IpWzBdLmdldE1hdGNoaW5nRWxlbWVudFRlbXBsYXRlKCk7XG4gIHJldHVybiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEuY3JlYXRlKHtcbiAgICB0eXBlOiBuZXcgQ29tcGlsZVR5cGVNZXRhZGF0YSh7XG4gICAgICBydW50aW1lOiBPYmplY3QsXG4gICAgICBuYW1lOiBgSG9zdCR7Y29tcG9uZW50VHlwZS5uYW1lfWAsXG4gICAgICBtb2R1bGVVcmw6IGNvbXBvbmVudFR5cGUubW9kdWxlVXJsLFxuICAgICAgaXNIb3N0OiB0cnVlXG4gICAgfSksXG4gICAgdGVtcGxhdGU6IG5ldyBDb21waWxlVGVtcGxhdGVNZXRhZGF0YShcbiAgICAgICAge3RlbXBsYXRlOiB0ZW1wbGF0ZSwgdGVtcGxhdGVVcmw6ICcnLCBzdHlsZXM6IFtdLCBzdHlsZVVybHM6IFtdLCBuZ0NvbnRlbnRTZWxlY3RvcnM6IFtdfSksXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICAgIGlucHV0czogW10sXG4gICAgb3V0cHV0czogW10sXG4gICAgaG9zdDoge30sXG4gICAgbGlmZWN5Y2xlSG9va3M6IFtdLFxuICAgIGlzQ29tcG9uZW50OiB0cnVlLFxuICAgIGR5bmFtaWNMb2FkYWJsZTogZmFsc2UsXG4gICAgc2VsZWN0b3I6ICcqJyxcbiAgICBwcm92aWRlcnM6IFtdLFxuICAgIHZpZXdQcm92aWRlcnM6IFtdLFxuICAgIHF1ZXJpZXM6IFtdLFxuICAgIHZpZXdRdWVyaWVzOiBbXVxuICB9KTtcbn1cblxuXG5leHBvcnQgY2xhc3MgQ29tcGlsZVBpcGVNZXRhZGF0YSBpbXBsZW1lbnRzIENvbXBpbGVNZXRhZGF0YVdpdGhUeXBlIHtcbiAgdHlwZTogQ29tcGlsZVR5cGVNZXRhZGF0YTtcbiAgbmFtZTogc3RyaW5nO1xuICBwdXJlOiBib29sZWFuO1xuICBjb25zdHJ1Y3Rvcih7dHlwZSwgbmFtZSxcbiAgICAgICAgICAgICAgIHB1cmV9OiB7dHlwZT86IENvbXBpbGVUeXBlTWV0YWRhdGEsIG5hbWU/OiBzdHJpbmcsIHB1cmU/OiBib29sZWFufSA9IHt9KSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMucHVyZSA9IG5vcm1hbGl6ZUJvb2wocHVyZSk7XG4gIH1cbiAgZ2V0IGlkZW50aWZpZXIoKTogQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSB7IHJldHVybiB0aGlzLnR5cGU7IH1cblxuICBzdGF0aWMgZnJvbUpzb24oZGF0YToge1trZXk6IHN0cmluZ106IGFueX0pOiBDb21waWxlUGlwZU1ldGFkYXRhIHtcbiAgICByZXR1cm4gbmV3IENvbXBpbGVQaXBlTWV0YWRhdGEoe1xuICAgICAgdHlwZTogaXNQcmVzZW50KGRhdGFbJ3R5cGUnXSkgPyBDb21waWxlVHlwZU1ldGFkYXRhLmZyb21Kc29uKGRhdGFbJ3R5cGUnXSkgOiBkYXRhWyd0eXBlJ10sXG4gICAgICBuYW1lOiBkYXRhWyduYW1lJ10sXG4gICAgICBwdXJlOiBkYXRhWydwdXJlJ11cbiAgICB9KTtcbiAgfVxuXG4gIHRvSnNvbigpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdjbGFzcyc6ICdQaXBlJyxcbiAgICAgICd0eXBlJzogaXNQcmVzZW50KHRoaXMudHlwZSkgPyB0aGlzLnR5cGUudG9Kc29uKCkgOiBudWxsLFxuICAgICAgJ25hbWUnOiB0aGlzLm5hbWUsXG4gICAgICAncHVyZSc6IHRoaXMucHVyZVxuICAgIH07XG4gIH1cbn1cblxudmFyIF9DT01QSUxFX01FVEFEQVRBX0ZST01fSlNPTiA9IHtcbiAgJ0RpcmVjdGl2ZSc6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YS5mcm9tSnNvbixcbiAgJ1BpcGUnOiBDb21waWxlUGlwZU1ldGFkYXRhLmZyb21Kc29uLFxuICAnVHlwZSc6IENvbXBpbGVUeXBlTWV0YWRhdGEuZnJvbUpzb24sXG4gICdJZGVudGlmaWVyJzogQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YS5mcm9tSnNvblxufTtcblxuZnVuY3Rpb24gYXJyYXlGcm9tSnNvbihvYmo6IGFueVtdLCBmbjogKGE6IHtba2V5OiBzdHJpbmddOiBhbnl9KSA9PiBhbnkpOiBhbnkge1xuICByZXR1cm4gaXNCbGFuayhvYmopID8gbnVsbCA6IG9iai5tYXAobyA9PiBvYmpGcm9tSnNvbihvLCBmbikpO1xufVxuXG5mdW5jdGlvbiBhcnJheVRvSnNvbihvYmo6IGFueVtdKTogc3RyaW5nIHwge1trZXk6IHN0cmluZ106IGFueX0ge1xuICByZXR1cm4gaXNCbGFuayhvYmopID8gbnVsbCA6IG9iai5tYXAob2JqVG9Kc29uKTtcbn1cblxuZnVuY3Rpb24gb2JqRnJvbUpzb24ob2JqOiBhbnksIGZuOiAoYToge1trZXk6IHN0cmluZ106IGFueX0pID0+IGFueSk6IGFueSB7XG4gIHJldHVybiAoaXNTdHJpbmcob2JqKSB8fCBpc0JsYW5rKG9iaikpID8gb2JqIDogZm4ob2JqKTtcbn1cblxuZnVuY3Rpb24gb2JqVG9Kc29uKG9iajogYW55KTogc3RyaW5nIHwge1trZXk6IHN0cmluZ106IGFueX0ge1xuICByZXR1cm4gKGlzU3RyaW5nKG9iaikgfHwgaXNCbGFuayhvYmopKSA/IG9iaiA6IG9iai50b0pzb24oKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
