System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/collection', 'angular2/src/core/change_detection/change_detection', 'angular2/src/core/metadata/view', 'angular2/src/compiler/selector', './util', 'angular2/src/core/metadata/lifecycle_hooks', './url_resolver'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lang_1, exceptions_1, collection_1, change_detection_1, view_1, selector_1, util_1, lifecycle_hooks_1, url_resolver_1;
    var HOST_REG_EXP, CompileMetadataWithIdentifier, CompileMetadataWithType, CompileIdentifierMetadata, CompileDiDependencyMetadata, CompileProviderMetadata, CompileFactoryMetadata, CompileTokenMetadata, CompileTokenMap, CompileTypeMetadata, CompileQueryMetadata, CompileTemplateMetadata, CompileDirectiveMetadata, CompilePipeMetadata, _COMPILE_METADATA_FROM_JSON;
    function metadataFromJson(data) {
        return _COMPILE_METADATA_FROM_JSON[data['class']](data);
    }
    exports_1("metadataFromJson", metadataFromJson);
    /**
     * Construct {@link CompileDirectiveMetadata} from {@link ComponentTypeMetadata} and a selector.
     */
    function createHostComponentMeta(componentType, componentSelector) {
        var template = selector_1.CssSelector.parse(componentSelector)[0].getMatchingElementTemplate();
        return CompileDirectiveMetadata.create({
            type: new CompileTypeMetadata({
                runtime: Object,
                name: componentType.name + "_Host",
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
            selector: '*',
            providers: [],
            viewProviders: [],
            queries: [],
            viewQueries: []
        });
    }
    exports_1("createHostComponentMeta", createHostComponentMeta);
    function _arrayFromJson(obj, fn) {
        return lang_1.isBlank(obj) ? null : obj.map(function (o) { return _objFromJson(o, fn); });
    }
    function _arrayToJson(obj) {
        return lang_1.isBlank(obj) ? null : obj.map(_objToJson);
    }
    function _objFromJson(obj, fn) {
        if (lang_1.isArray(obj))
            return _arrayFromJson(obj, fn);
        if (lang_1.isString(obj) || lang_1.isBlank(obj) || lang_1.isBoolean(obj) || lang_1.isNumber(obj))
            return obj;
        return fn(obj);
    }
    function _objToJson(obj) {
        if (lang_1.isArray(obj))
            return _arrayToJson(obj);
        if (lang_1.isString(obj) || lang_1.isBlank(obj) || lang_1.isBoolean(obj) || lang_1.isNumber(obj))
            return obj;
        return obj.toJson();
    }
    function _normalizeArray(obj) {
        return lang_1.isPresent(obj) ? obj : [];
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
            function (lifecycle_hooks_1_1) {
                lifecycle_hooks_1 = lifecycle_hooks_1_1;
            },
            function (url_resolver_1_1) {
                url_resolver_1 = url_resolver_1_1;
            }],
        execute: function() {
            // group 1: "property" from "[property]"
            // group 2: "event" from "(event)"
            HOST_REG_EXP = /^(?:(?:\[([^\]]+)\])|(?:\(([^\)]+)\)))$/g;
            CompileMetadataWithIdentifier = (function () {
                function CompileMetadataWithIdentifier() {
                }
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
                    var _b = _a === void 0 ? {} : _a, runtime = _b.runtime, name = _b.name, moduleUrl = _b.moduleUrl, prefix = _b.prefix, value = _b.value;
                    this.runtime = runtime;
                    this.name = name;
                    this.prefix = prefix;
                    this.moduleUrl = moduleUrl;
                    this.value = value;
                }
                CompileIdentifierMetadata.fromJson = function (data) {
                    var value = lang_1.isArray(data['value']) ? _arrayFromJson(data['value'], metadataFromJson) :
                        _objFromJson(data['value'], metadataFromJson);
                    return new CompileIdentifierMetadata({ name: data['name'], prefix: data['prefix'], moduleUrl: data['moduleUrl'], value: value });
                };
                CompileIdentifierMetadata.prototype.toJson = function () {
                    var value = lang_1.isArray(this.value) ? _arrayToJson(this.value) : _objToJson(this.value);
                    return {
                        // Note: Runtime type can't be serialized...
                        'class': 'Identifier',
                        'name': this.name,
                        'moduleUrl': this.moduleUrl,
                        'prefix': this.prefix,
                        'value': value
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
                    var _b = _a === void 0 ? {} : _a, isAttribute = _b.isAttribute, isSelf = _b.isSelf, isHost = _b.isHost, isSkipSelf = _b.isSkipSelf, isOptional = _b.isOptional, isValue = _b.isValue, query = _b.query, viewQuery = _b.viewQuery, token = _b.token, value = _b.value;
                    this.isAttribute = lang_1.normalizeBool(isAttribute);
                    this.isSelf = lang_1.normalizeBool(isSelf);
                    this.isHost = lang_1.normalizeBool(isHost);
                    this.isSkipSelf = lang_1.normalizeBool(isSkipSelf);
                    this.isOptional = lang_1.normalizeBool(isOptional);
                    this.isValue = lang_1.normalizeBool(isValue);
                    this.query = query;
                    this.viewQuery = viewQuery;
                    this.token = token;
                    this.value = value;
                }
                CompileDiDependencyMetadata.fromJson = function (data) {
                    return new CompileDiDependencyMetadata({
                        token: _objFromJson(data['token'], CompileTokenMetadata.fromJson),
                        query: _objFromJson(data['query'], CompileQueryMetadata.fromJson),
                        viewQuery: _objFromJson(data['viewQuery'], CompileQueryMetadata.fromJson),
                        value: data['value'],
                        isAttribute: data['isAttribute'],
                        isSelf: data['isSelf'],
                        isHost: data['isHost'],
                        isSkipSelf: data['isSkipSelf'],
                        isOptional: data['isOptional'],
                        isValue: data['isValue']
                    });
                };
                CompileDiDependencyMetadata.prototype.toJson = function () {
                    return {
                        'token': _objToJson(this.token),
                        'query': _objToJson(this.query),
                        'viewQuery': _objToJson(this.viewQuery),
                        'value': this.value,
                        'isAttribute': this.isAttribute,
                        'isSelf': this.isSelf,
                        'isHost': this.isHost,
                        'isSkipSelf': this.isSkipSelf,
                        'isOptional': this.isOptional,
                        'isValue': this.isValue
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
                    this.deps = lang_1.normalizeBlank(deps);
                    this.multi = lang_1.normalizeBool(multi);
                }
                CompileProviderMetadata.fromJson = function (data) {
                    return new CompileProviderMetadata({
                        token: _objFromJson(data['token'], CompileTokenMetadata.fromJson),
                        useClass: _objFromJson(data['useClass'], CompileTypeMetadata.fromJson),
                        useExisting: _objFromJson(data['useExisting'], CompileTokenMetadata.fromJson),
                        useValue: _objFromJson(data['useValue'], CompileIdentifierMetadata.fromJson),
                        useFactory: _objFromJson(data['useFactory'], CompileFactoryMetadata.fromJson),
                        multi: data['multi'],
                        deps: _arrayFromJson(data['deps'], CompileDiDependencyMetadata.fromJson)
                    });
                };
                CompileProviderMetadata.prototype.toJson = function () {
                    return {
                        // Note: Runtime type can't be serialized...
                        'class': 'Provider',
                        'token': _objToJson(this.token),
                        'useClass': _objToJson(this.useClass),
                        'useExisting': _objToJson(this.useExisting),
                        'useValue': _objToJson(this.useValue),
                        'useFactory': _objToJson(this.useFactory),
                        'multi': this.multi,
                        'deps': _arrayToJson(this.deps)
                    };
                };
                return CompileProviderMetadata;
            }());
            exports_1("CompileProviderMetadata", CompileProviderMetadata);
            CompileFactoryMetadata = (function () {
                function CompileFactoryMetadata(_a) {
                    var runtime = _a.runtime, name = _a.name, moduleUrl = _a.moduleUrl, prefix = _a.prefix, diDeps = _a.diDeps, value = _a.value;
                    this.runtime = runtime;
                    this.name = name;
                    this.prefix = prefix;
                    this.moduleUrl = moduleUrl;
                    this.diDeps = _normalizeArray(diDeps);
                    this.value = value;
                }
                Object.defineProperty(CompileFactoryMetadata.prototype, "identifier", {
                    get: function () { return this; },
                    enumerable: true,
                    configurable: true
                });
                CompileFactoryMetadata.fromJson = function (data) {
                    return new CompileFactoryMetadata({
                        name: data['name'],
                        prefix: data['prefix'],
                        moduleUrl: data['moduleUrl'],
                        value: data['value'],
                        diDeps: _arrayFromJson(data['diDeps'], CompileDiDependencyMetadata.fromJson)
                    });
                };
                CompileFactoryMetadata.prototype.toJson = function () {
                    return {
                        'class': 'Factory',
                        'name': this.name,
                        'prefix': this.prefix,
                        'moduleUrl': this.moduleUrl,
                        'value': this.value,
                        'diDeps': _arrayToJson(this.diDeps)
                    };
                };
                return CompileFactoryMetadata;
            }());
            exports_1("CompileFactoryMetadata", CompileFactoryMetadata);
            CompileTokenMetadata = (function () {
                function CompileTokenMetadata(_a) {
                    var value = _a.value, identifier = _a.identifier, identifierIsInstance = _a.identifierIsInstance;
                    this.value = value;
                    this.identifier = identifier;
                    this.identifierIsInstance = lang_1.normalizeBool(identifierIsInstance);
                }
                CompileTokenMetadata.fromJson = function (data) {
                    return new CompileTokenMetadata({
                        value: data['value'],
                        identifier: _objFromJson(data['identifier'], CompileIdentifierMetadata.fromJson),
                        identifierIsInstance: data['identifierIsInstance']
                    });
                };
                CompileTokenMetadata.prototype.toJson = function () {
                    return {
                        'value': this.value,
                        'identifier': _objToJson(this.identifier),
                        'identifierIsInstance': this.identifierIsInstance
                    };
                };
                Object.defineProperty(CompileTokenMetadata.prototype, "runtimeCacheKey", {
                    get: function () {
                        if (lang_1.isPresent(this.identifier)) {
                            return this.identifier.runtime;
                        }
                        else {
                            return this.value;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompileTokenMetadata.prototype, "assetCacheKey", {
                    get: function () {
                        if (lang_1.isPresent(this.identifier)) {
                            return lang_1.isPresent(this.identifier.moduleUrl) &&
                                lang_1.isPresent(url_resolver_1.getUrlScheme(this.identifier.moduleUrl)) ?
                                this.identifier.name + "|" + this.identifier.moduleUrl + "|" + this.identifierIsInstance :
                                null;
                        }
                        else {
                            return this.value;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                CompileTokenMetadata.prototype.equalsTo = function (token2) {
                    var rk = this.runtimeCacheKey;
                    var ak = this.assetCacheKey;
                    return (lang_1.isPresent(rk) && rk == token2.runtimeCacheKey) ||
                        (lang_1.isPresent(ak) && ak == token2.assetCacheKey);
                };
                Object.defineProperty(CompileTokenMetadata.prototype, "name", {
                    get: function () {
                        return lang_1.isPresent(this.value) ? util_1.sanitizeIdentifier(this.value) : this.identifier.name;
                    },
                    enumerable: true,
                    configurable: true
                });
                return CompileTokenMetadata;
            }());
            exports_1("CompileTokenMetadata", CompileTokenMetadata);
            CompileTokenMap = (function () {
                function CompileTokenMap() {
                    this._valueMap = new Map();
                    this._values = [];
                }
                CompileTokenMap.prototype.add = function (token, value) {
                    var existing = this.get(token);
                    if (lang_1.isPresent(existing)) {
                        throw new exceptions_1.BaseException("Can only add to a TokenMap! Token: " + token.name);
                    }
                    this._values.push(value);
                    var rk = token.runtimeCacheKey;
                    if (lang_1.isPresent(rk)) {
                        this._valueMap.set(rk, value);
                    }
                    var ak = token.assetCacheKey;
                    if (lang_1.isPresent(ak)) {
                        this._valueMap.set(ak, value);
                    }
                };
                CompileTokenMap.prototype.get = function (token) {
                    var rk = token.runtimeCacheKey;
                    var ak = token.assetCacheKey;
                    var result;
                    if (lang_1.isPresent(rk)) {
                        result = this._valueMap.get(rk);
                    }
                    if (lang_1.isBlank(result) && lang_1.isPresent(ak)) {
                        result = this._valueMap.get(ak);
                    }
                    return result;
                };
                CompileTokenMap.prototype.values = function () { return this._values; };
                Object.defineProperty(CompileTokenMap.prototype, "size", {
                    get: function () { return this._values.length; },
                    enumerable: true,
                    configurable: true
                });
                return CompileTokenMap;
            }());
            exports_1("CompileTokenMap", CompileTokenMap);
            /**
             * Metadata regarding compilation of a type.
             */
            CompileTypeMetadata = (function () {
                function CompileTypeMetadata(_a) {
                    var _b = _a === void 0 ? {} : _a, runtime = _b.runtime, name = _b.name, moduleUrl = _b.moduleUrl, prefix = _b.prefix, isHost = _b.isHost, value = _b.value, diDeps = _b.diDeps;
                    this.runtime = runtime;
                    this.name = name;
                    this.moduleUrl = moduleUrl;
                    this.prefix = prefix;
                    this.isHost = lang_1.normalizeBool(isHost);
                    this.value = value;
                    this.diDeps = _normalizeArray(diDeps);
                }
                CompileTypeMetadata.fromJson = function (data) {
                    return new CompileTypeMetadata({
                        name: data['name'],
                        moduleUrl: data['moduleUrl'],
                        prefix: data['prefix'],
                        isHost: data['isHost'],
                        value: data['value'],
                        diDeps: _arrayFromJson(data['diDeps'], CompileDiDependencyMetadata.fromJson)
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
                        'value': this.value,
                        'diDeps': _arrayToJson(this.diDeps)
                    };
                };
                return CompileTypeMetadata;
            }());
            exports_1("CompileTypeMetadata", CompileTypeMetadata);
            CompileQueryMetadata = (function () {
                function CompileQueryMetadata(_a) {
                    var _b = _a === void 0 ? {} : _a, selectors = _b.selectors, descendants = _b.descendants, first = _b.first, propertyName = _b.propertyName, read = _b.read;
                    this.selectors = selectors;
                    this.descendants = lang_1.normalizeBool(descendants);
                    this.first = lang_1.normalizeBool(first);
                    this.propertyName = propertyName;
                    this.read = read;
                }
                CompileQueryMetadata.fromJson = function (data) {
                    return new CompileQueryMetadata({
                        selectors: _arrayFromJson(data['selectors'], CompileTokenMetadata.fromJson),
                        descendants: data['descendants'],
                        first: data['first'],
                        propertyName: data['propertyName'],
                        read: _objFromJson(data['read'], CompileTokenMetadata.fromJson)
                    });
                };
                CompileQueryMetadata.prototype.toJson = function () {
                    return {
                        'selectors': _arrayToJson(this.selectors),
                        'descendants': this.descendants,
                        'first': this.first,
                        'propertyName': this.propertyName,
                        'read': _objToJson(this.read)
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
                    var _b = _a === void 0 ? {} : _a, type = _b.type, isComponent = _b.isComponent, selector = _b.selector, exportAs = _b.exportAs, changeDetection = _b.changeDetection, inputs = _b.inputs, outputs = _b.outputs, hostListeners = _b.hostListeners, hostProperties = _b.hostProperties, hostAttributes = _b.hostAttributes, lifecycleHooks = _b.lifecycleHooks, providers = _b.providers, viewProviders = _b.viewProviders, queries = _b.queries, viewQueries = _b.viewQueries, template = _b.template;
                    this.type = type;
                    this.isComponent = isComponent;
                    this.selector = selector;
                    this.exportAs = exportAs;
                    this.changeDetection = changeDetection;
                    this.inputs = inputs;
                    this.outputs = outputs;
                    this.hostListeners = hostListeners;
                    this.hostProperties = hostProperties;
                    this.hostAttributes = hostAttributes;
                    this.lifecycleHooks = _normalizeArray(lifecycleHooks);
                    this.providers = _normalizeArray(providers);
                    this.viewProviders = _normalizeArray(viewProviders);
                    this.queries = _normalizeArray(queries);
                    this.viewQueries = _normalizeArray(viewQueries);
                    this.template = template;
                }
                CompileDirectiveMetadata.create = function (_a) {
                    var _b = _a === void 0 ? {} : _a, type = _b.type, isComponent = _b.isComponent, selector = _b.selector, exportAs = _b.exportAs, changeDetection = _b.changeDetection, inputs = _b.inputs, outputs = _b.outputs, host = _b.host, lifecycleHooks = _b.lifecycleHooks, providers = _b.providers, viewProviders = _b.viewProviders, queries = _b.queries, viewQueries = _b.viewQueries, template = _b.template;
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
                        lifecycleHooks: data['lifecycleHooks'].map(function (hookValue) { return lifecycle_hooks_1.LIFECYCLE_HOOKS_VALUES[hookValue]; }),
                        template: lang_1.isPresent(data['template']) ? CompileTemplateMetadata.fromJson(data['template']) :
                            data['template'],
                        providers: _arrayFromJson(data['providers'], metadataFromJson),
                        viewProviders: _arrayFromJson(data['viewProviders'], metadataFromJson),
                        queries: _arrayFromJson(data['queries'], CompileQueryMetadata.fromJson),
                        viewQueries: _arrayFromJson(data['viewQueries'], CompileQueryMetadata.fromJson)
                    });
                };
                CompileDirectiveMetadata.prototype.toJson = function () {
                    return {
                        'class': 'Directive',
                        'isComponent': this.isComponent,
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
                        'providers': _arrayToJson(this.providers),
                        'viewProviders': _arrayToJson(this.viewProviders),
                        'queries': _arrayToJson(this.queries),
                        'viewQueries': _arrayToJson(this.viewQueries)
                    };
                };
                return CompileDirectiveMetadata;
            }());
            exports_1("CompileDirectiveMetadata", CompileDirectiveMetadata);
            CompilePipeMetadata = (function () {
                function CompilePipeMetadata(_a) {
                    var _b = _a === void 0 ? {} : _a, type = _b.type, name = _b.name, pure = _b.pure, lifecycleHooks = _b.lifecycleHooks;
                    this.type = type;
                    this.name = name;
                    this.pure = lang_1.normalizeBool(pure);
                    this.lifecycleHooks = _normalizeArray(lifecycleHooks);
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
                'Provider': CompileProviderMetadata.fromJson,
                'Identifier': CompileIdentifierMetadata.fromJson,
                'Factory': CompileFactoryMetadata.fromJson
            };
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9jb21waWxlX21ldGFkYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztRQWlDSSxZQUFZLDZUQTB0QlosMkJBQTJCO0lBMXNCL0IsMEJBQWlDLElBQTBCO1FBQ3pELE1BQU0sQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRkQsK0NBRUMsQ0FBQTtJQXFvQkQ7O09BRUc7SUFDSCxpQ0FBd0MsYUFBa0MsRUFDbEMsaUJBQXlCO1FBQy9ELElBQUksUUFBUSxHQUFHLHNCQUFXLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztRQUNwRixNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxDQUFDO1lBQ3JDLElBQUksRUFBRSxJQUFJLG1CQUFtQixDQUFDO2dCQUM1QixPQUFPLEVBQUUsTUFBTTtnQkFDZixJQUFJLEVBQUssYUFBYSxDQUFDLElBQUksVUFBTztnQkFDbEMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxTQUFTO2dCQUNsQyxNQUFNLEVBQUUsSUFBSTthQUNiLENBQUM7WUFDRixRQUFRLEVBQUUsSUFBSSx1QkFBdUIsQ0FDakMsRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLGtCQUFrQixFQUFFLEVBQUUsRUFBQyxDQUFDO1lBQzdGLGVBQWUsRUFBRSwwQ0FBdUIsQ0FBQyxPQUFPO1lBQ2hELE1BQU0sRUFBRSxFQUFFO1lBQ1YsT0FBTyxFQUFFLEVBQUU7WUFDWCxJQUFJLEVBQUUsRUFBRTtZQUNSLGNBQWMsRUFBRSxFQUFFO1lBQ2xCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFFBQVEsRUFBRSxHQUFHO1lBQ2Is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UUFBUTtnQkFDcEMsVUFBVSxFQUFFLHVCQUF1QixDQUFDLFFBQVE7Z0JBQzVDLFlBQVksRUFBRSx5QkFBeUIsQ0FBQyxRQUFRO2dCQUNoRCxTQUFTLEVBQUUsc0JBQXNCLENBQUMsUUFBUTthQUMzQyxDQUFDIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9jb21waWxlX21ldGFkYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgaXNQcmVzZW50LFxuICBpc0JsYW5rLFxuICBpc051bWJlcixcbiAgaXNCb29sZWFuLFxuICBub3JtYWxpemVCb29sLFxuICBub3JtYWxpemVCbGFuayxcbiAgc2VyaWFsaXplRW51bSxcbiAgVHlwZSxcbiAgaXNTdHJpbmcsXG4gIFJlZ0V4cFdyYXBwZXIsXG4gIFN0cmluZ1dyYXBwZXIsXG4gIGlzQXJyYXlcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7dW5pbXBsZW1lbnRlZCwgQmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7XG4gIFN0cmluZ01hcFdyYXBwZXIsXG4gIE1hcFdyYXBwZXIsXG4gIFNldFdyYXBwZXIsXG4gIExpc3RXcmFwcGVyXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ0hBTkdFX0RFVEVDVElPTl9TVFJBVEVHWV9WQUxVRVNcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0aW9uJztcbmltcG9ydCB7Vmlld0VuY2Fwc3VsYXRpb24sIFZJRVdfRU5DQVBTVUxBVElPTl9WQUxVRVN9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL21ldGFkYXRhL3ZpZXcnO1xuaW1wb3J0IHtDc3NTZWxlY3Rvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3NlbGVjdG9yJztcbmltcG9ydCB7c3BsaXRBdENvbG9uLCBzYW5pdGl6ZUlkZW50aWZpZXJ9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQge0xpZmVjeWNsZUhvb2tzLCBMSUZFQ1lDTEVfSE9PS1NfVkFMVUVTfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9tZXRhZGF0YS9saWZlY3ljbGVfaG9va3MnO1xuaW1wb3J0IHtnZXRVcmxTY2hlbWV9IGZyb20gJy4vdXJsX3Jlc29sdmVyJztcblxuLy8gZ3JvdXAgMTogXCJwcm9wZXJ0eVwiIGZyb20gXCJbcHJvcGVydHldXCJcbi8vIGdyb3VwIDI6IFwiZXZlbnRcIiBmcm9tIFwiKGV2ZW50KVwiXG52YXIgSE9TVF9SRUdfRVhQID0gL14oPzooPzpcXFsoW15cXF1dKylcXF0pfCg/OlxcKChbXlxcKV0rKVxcKSkpJC9nO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29tcGlsZU1ldGFkYXRhV2l0aElkZW50aWZpZXIge1xuICBhYnN0cmFjdCB0b0pzb24oKToge1trZXk6IHN0cmluZ106IGFueX07XG5cbiAgZ2V0IGlkZW50aWZpZXIoKTogQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSB7IHJldHVybiA8Q29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YT51bmltcGxlbWVudGVkKCk7IH1cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbXBpbGVNZXRhZGF0YVdpdGhUeXBlIGV4dGVuZHMgQ29tcGlsZU1ldGFkYXRhV2l0aElkZW50aWZpZXIge1xuICBhYnN0cmFjdCB0b0pzb24oKToge1trZXk6IHN0cmluZ106IGFueX07XG5cbiAgZ2V0IHR5cGUoKTogQ29tcGlsZVR5cGVNZXRhZGF0YSB7IHJldHVybiA8Q29tcGlsZVR5cGVNZXRhZGF0YT51bmltcGxlbWVudGVkKCk7IH1cblxuICBnZXQgaWRlbnRpZmllcigpOiBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhIHsgcmV0dXJuIDxDb21waWxlSWRlbnRpZmllck1ldGFkYXRhPnVuaW1wbGVtZW50ZWQoKTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWV0YWRhdGFGcm9tSnNvbihkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSk6IGFueSB7XG4gIHJldHVybiBfQ09NUElMRV9NRVRBREFUQV9GUk9NX0pTT05bZGF0YVsnY2xhc3MnXV0oZGF0YSk7XG59XG5cbmV4cG9ydCBjbGFzcyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhIGltcGxlbWVudHMgQ29tcGlsZU1ldGFkYXRhV2l0aElkZW50aWZpZXIge1xuICBydW50aW1lOiBhbnk7XG4gIG5hbWU6IHN0cmluZztcbiAgcHJlZml4OiBzdHJpbmc7XG4gIG1vZHVsZVVybDogc3RyaW5nO1xuICB2YWx1ZTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAge3J1bnRpbWUsIG5hbWUsIG1vZHVsZVVybCwgcHJlZml4LCB2YWx1ZX06XG4gICAgICAgICAge3J1bnRpbWU/OiBhbnksIG5hbWU/OiBzdHJpbmcsIG1vZHVsZVVybD86IHN0cmluZywgcHJlZml4Pzogc3RyaW5nLCB2YWx1ZT86IGFueX0gPSB7fSkge1xuICAgIHRoaXMucnVudGltZSA9IHJ1bnRpbWU7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnByZWZpeCA9IHByZWZpeDtcbiAgICB0aGlzLm1vZHVsZVVybCA9IG1vZHVsZVVybDtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBzdGF0aWMgZnJvbUpzb24oZGF0YToge1trZXk6IHN0cmluZ106IGFueX0pOiBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhIHtcbiAgICBsZXQgdmFsdWUgPSBpc0FycmF5KGRhdGFbJ3ZhbHVlJ10pID8gX2FycmF5RnJvbUpzb24oZGF0YVsndmFsdWUnXSwgbWV0YWRhdGFGcm9tSnNvbikgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfb2JqRnJvbUpzb24oZGF0YVsndmFsdWUnXSwgbWV0YWRhdGFGcm9tSnNvbik7XG4gICAgcmV0dXJuIG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKFxuICAgICAgICB7bmFtZTogZGF0YVsnbmFtZSddLCBwcmVmaXg6IGRhdGFbJ3ByZWZpeCddLCBtb2R1bGVVcmw6IGRhdGFbJ21vZHVsZVVybCddLCB2YWx1ZTogdmFsdWV9KTtcbiAgfVxuXG4gIHRvSnNvbigpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgbGV0IHZhbHVlID0gaXNBcnJheSh0aGlzLnZhbHVlKSA/IF9hcnJheVRvSnNvbih0aGlzLnZhbHVlKSA6IF9vYmpUb0pzb24odGhpcy52YWx1ZSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIE5vdGU6IFJ1bnRpbWUgdHlwZSBjYW4ndCBiZSBzZXJpYWxpemVkLi4uXG4gICAgICAnY2xhc3MnOiAnSWRlbnRpZmllcicsXG4gICAgICAnbmFtZSc6IHRoaXMubmFtZSxcbiAgICAgICdtb2R1bGVVcmwnOiB0aGlzLm1vZHVsZVVybCxcbiAgICAgICdwcmVmaXgnOiB0aGlzLnByZWZpeCxcbiAgICAgICd2YWx1ZSc6IHZhbHVlXG4gICAgfTtcbiAgfVxuXG4gIGdldCBpZGVudGlmaWVyKCk6IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEgeyByZXR1cm4gdGhpczsgfVxufVxuXG5leHBvcnQgY2xhc3MgQ29tcGlsZURpRGVwZW5kZW5jeU1ldGFkYXRhIHtcbiAgaXNBdHRyaWJ1dGU6IGJvb2xlYW47XG4gIGlzU2VsZjogYm9vbGVhbjtcbiAgaXNIb3N0OiBib29sZWFuO1xuICBpc1NraXBTZWxmOiBib29sZWFuO1xuICBpc09wdGlvbmFsOiBib29sZWFuO1xuICBpc1ZhbHVlOiBib29sZWFuO1xuICBxdWVyeTogQ29tcGlsZVF1ZXJ5TWV0YWRhdGE7XG4gIHZpZXdRdWVyeTogQ29tcGlsZVF1ZXJ5TWV0YWRhdGE7XG4gIHRva2VuOiBDb21waWxlVG9rZW5NZXRhZGF0YTtcbiAgdmFsdWU6IGFueTtcblxuICBjb25zdHJ1Y3Rvcih7aXNBdHRyaWJ1dGUsIGlzU2VsZiwgaXNIb3N0LCBpc1NraXBTZWxmLCBpc09wdGlvbmFsLCBpc1ZhbHVlLCBxdWVyeSwgdmlld1F1ZXJ5LFxuICAgICAgICAgICAgICAgdG9rZW4sIHZhbHVlfToge1xuICAgIGlzQXR0cmlidXRlPzogYm9vbGVhbixcbiAgICBpc1NlbGY/OiBib29sZWFuLFxuICAgIGlzSG9zdD86IGJvb2xlYW4sXG4gICAgaXNTa2lwU2VsZj86IGJvb2xlYW4sXG4gICAgaXNPcHRpb25hbD86IGJvb2xlYW4sXG4gICAgaXNWYWx1ZT86IGJvb2xlYW4sXG4gICAgcXVlcnk/OiBDb21waWxlUXVlcnlNZXRhZGF0YSxcbiAgICB2aWV3UXVlcnk/OiBDb21waWxlUXVlcnlNZXRhZGF0YSxcbiAgICB0b2tlbj86IENvbXBpbGVUb2tlbk1ldGFkYXRhLFxuICAgIHZhbHVlPzogYW55XG4gIH0gPSB7fSkge1xuICAgIHRoaXMuaXNBdHRyaWJ1dGUgPSBub3JtYWxpemVCb29sKGlzQXR0cmlidXRlKTtcbiAgICB0aGlzLmlzU2VsZiA9IG5vcm1hbGl6ZUJvb2woaXNTZWxmKTtcbiAgICB0aGlzLmlzSG9zdCA9IG5vcm1hbGl6ZUJvb2woaXNIb3N0KTtcbiAgICB0aGlzLmlzU2tpcFNlbGYgPSBub3JtYWxpemVCb29sKGlzU2tpcFNlbGYpO1xuICAgIHRoaXMuaXNPcHRpb25hbCA9IG5vcm1hbGl6ZUJvb2woaXNPcHRpb25hbCk7XG4gICAgdGhpcy5pc1ZhbHVlID0gbm9ybWFsaXplQm9vbChpc1ZhbHVlKTtcbiAgICB0aGlzLnF1ZXJ5ID0gcXVlcnk7XG4gICAgdGhpcy52aWV3UXVlcnkgPSB2aWV3UXVlcnk7XG4gICAgdGhpcy50b2tlbiA9IHRva2VuO1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSnNvbihkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSk6IENvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YSB7XG4gICAgcmV0dXJuIG5ldyBDb21waWxlRGlEZXBlbmRlbmN5TWV0YWRhdGEoe1xuICAgICAgdG9rZW46IF9vYmpGcm9tSnNvbihkYXRhWyd0b2tlbiddLCBDb21waWxlVG9rZW5NZXRhZGF0YS5mcm9tSnNvbiksXG4gICAgICBxdWVyeTogX29iakZyb21Kc29uKGRhdGFbJ3F1ZXJ5J10sIENvbXBpbGVRdWVyeU1ldGFkYXRhLmZyb21Kc29uKSxcbiAgICAgIHZpZXdRdWVyeTogX29iakZyb21Kc29uKGRhdGFbJ3ZpZXdRdWVyeSddLCBDb21waWxlUXVlcnlNZXRhZGF0YS5mcm9tSnNvbiksXG4gICAgICB2YWx1ZTogZGF0YVsndmFsdWUnXSxcbiAgICAgIGlzQXR0cmlidXRlOiBkYXRhWydpc0F0dHJpYnV0ZSddLFxuICAgICAgaXNTZWxmOiBkYXRhWydpc1NlbGYnXSxcbiAgICAgIGlzSG9zdDogZGF0YVsnaXNIb3N0J10sXG4gICAgICBpc1NraXBTZWxmOiBkYXRhWydpc1NraXBTZWxmJ10sXG4gICAgICBpc09wdGlvbmFsOiBkYXRhWydpc09wdGlvbmFsJ10sXG4gICAgICBpc1ZhbHVlOiBkYXRhWydpc1ZhbHVlJ11cbiAgICB9KTtcbiAgfVxuXG4gIHRvSnNvbigpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICd0b2tlbic6IF9vYmpUb0pzb24odGhpcy50b2tlbiksXG4gICAgICAncXVlcnknOiBfb2JqVG9Kc29uKHRoaXMucXVlcnkpLFxuICAgICAgJ3ZpZXdRdWVyeSc6IF9vYmpUb0pzb24odGhpcy52aWV3UXVlcnkpLFxuICAgICAgJ3ZhbHVlJzogdGhpcy52YWx1ZSxcbiAgICAgICdpc0F0dHJpYnV0ZSc6IHRoaXMuaXNBdHRyaWJ1dGUsXG4gICAgICAnaXNTZWxmJzogdGhpcy5pc1NlbGYsXG4gICAgICAnaXNIb3N0JzogdGhpcy5pc0hvc3QsXG4gICAgICAnaXNTa2lwU2VsZic6IHRoaXMuaXNTa2lwU2VsZixcbiAgICAgICdpc09wdGlvbmFsJzogdGhpcy5pc09wdGlvbmFsLFxuICAgICAgJ2lzVmFsdWUnOiB0aGlzLmlzVmFsdWVcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21waWxlUHJvdmlkZXJNZXRhZGF0YSB7XG4gIHRva2VuOiBDb21waWxlVG9rZW5NZXRhZGF0YTtcbiAgdXNlQ2xhc3M6IENvbXBpbGVUeXBlTWV0YWRhdGE7XG4gIHVzZVZhbHVlOiBhbnk7XG4gIHVzZUV4aXN0aW5nOiBDb21waWxlVG9rZW5NZXRhZGF0YTtcbiAgdXNlRmFjdG9yeTogQ29tcGlsZUZhY3RvcnlNZXRhZGF0YTtcbiAgZGVwczogQ29tcGlsZURpRGVwZW5kZW5jeU1ldGFkYXRhW107XG4gIG11bHRpOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHt0b2tlbiwgdXNlQ2xhc3MsIHVzZVZhbHVlLCB1c2VFeGlzdGluZywgdXNlRmFjdG9yeSwgZGVwcywgbXVsdGl9OiB7XG4gICAgdG9rZW4/OiBDb21waWxlVG9rZW5NZXRhZGF0YSxcbiAgICB1c2VDbGFzcz86IENvbXBpbGVUeXBlTWV0YWRhdGEsXG4gICAgdXNlVmFsdWU/OiBhbnksXG4gICAgdXNlRXhpc3Rpbmc/OiBDb21waWxlVG9rZW5NZXRhZGF0YSxcbiAgICB1c2VGYWN0b3J5PzogQ29tcGlsZUZhY3RvcnlNZXRhZGF0YSxcbiAgICBkZXBzPzogQ29tcGlsZURpRGVwZW5kZW5jeU1ldGFkYXRhW10sXG4gICAgbXVsdGk/OiBib29sZWFuXG4gIH0pIHtcbiAgICB0aGlzLnRva2VuID0gdG9rZW47XG4gICAgdGhpcy51c2VDbGFzcyA9IHVzZUNsYXNzO1xuICAgIHRoaXMudXNlVmFsdWUgPSB1c2VWYWx1ZTtcbiAgICB0aGlzLnVzZUV4aXN0aW5nID0gdXNlRXhpc3Rpbmc7XG4gICAgdGhpcy51c2VGYWN0b3J5ID0gdXNlRmFjdG9yeTtcbiAgICB0aGlzLmRlcHMgPSBub3JtYWxpemVCbGFuayhkZXBzKTtcbiAgICB0aGlzLm11bHRpID0gbm9ybWFsaXplQm9vbChtdWx0aSk7XG4gIH1cblxuICBzdGF0aWMgZnJvbUpzb24oZGF0YToge1trZXk6IHN0cmluZ106IGFueX0pOiBDb21waWxlUHJvdmlkZXJNZXRhZGF0YSB7XG4gICAgcmV0dXJuIG5ldyBDb21waWxlUHJvdmlkZXJNZXRhZGF0YSh7XG4gICAgICB0b2tlbjogX29iakZyb21Kc29uKGRhdGFbJ3Rva2VuJ10sIENvbXBpbGVUb2tlbk1ldGFkYXRhLmZyb21Kc29uKSxcbiAgICAgIHVzZUNsYXNzOiBfb2JqRnJvbUpzb24oZGF0YVsndXNlQ2xhc3MnXSwgQ29tcGlsZVR5cGVNZXRhZGF0YS5mcm9tSnNvbiksXG4gICAgICB1c2VFeGlzdGluZzogX29iakZyb21Kc29uKGRhdGFbJ3VzZUV4aXN0aW5nJ10sIENvbXBpbGVUb2tlbk1ldGFkYXRhLmZyb21Kc29uKSxcbiAgICAgIHVzZVZhbHVlOiBfb2JqRnJvbUpzb24oZGF0YVsndXNlVmFsdWUnXSwgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YS5mcm9tSnNvbiksXG4gICAgICB1c2VGYWN0b3J5OiBfb2JqRnJvbUpzb24oZGF0YVsndXNlRmFjdG9yeSddLCBDb21waWxlRmFjdG9yeU1ldGFkYXRhLmZyb21Kc29uKSxcbiAgICAgIG11bHRpOiBkYXRhWydtdWx0aSddLFxuICAgICAgZGVwczogX2FycmF5RnJvbUpzb24oZGF0YVsnZGVwcyddLCBDb21waWxlRGlEZXBlbmRlbmN5TWV0YWRhdGEuZnJvbUpzb24pXG4gICAgfSk7XG4gIH1cblxuICB0b0pzb24oKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBOb3RlOiBSdW50aW1lIHR5cGUgY2FuJ3QgYmUgc2VyaWFsaXplZC4uLlxuICAgICAgJ2NsYXNzJzogJ1Byb3ZpZGVyJyxcbiAgICAgICd0b2tlbic6IF9vYmpUb0pzb24odGhpcy50b2tlbiksXG4gICAgICAndXNlQ2xhc3MnOiBfb2JqVG9Kc29uKHRoaXMudXNlQ2xhc3MpLFxuICAgICAgJ3VzZUV4aXN0aW5nJzogX29ialRvSnNvbih0aGlzLnVzZUV4aXN0aW5nKSxcbiAgICAgICd1c2VWYWx1ZSc6IF9vYmpUb0pzb24odGhpcy51c2VWYWx1ZSksXG4gICAgICAndXNlRmFjdG9yeSc6IF9vYmpUb0pzb24odGhpcy51c2VGYWN0b3J5KSxcbiAgICAgICdtdWx0aSc6IHRoaXMubXVsdGksXG4gICAgICAnZGVwcyc6IF9hcnJheVRvSnNvbih0aGlzLmRlcHMpXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ29tcGlsZUZhY3RvcnlNZXRhZGF0YSBpbXBsZW1lbnRzIENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEsXG4gICAgQ29tcGlsZU1ldGFkYXRhV2l0aElkZW50aWZpZXIge1xuICBydW50aW1lOiBGdW5jdGlvbjtcbiAgbmFtZTogc3RyaW5nO1xuICBwcmVmaXg6IHN0cmluZztcbiAgbW9kdWxlVXJsOiBzdHJpbmc7XG4gIHZhbHVlOiBhbnk7XG4gIGRpRGVwczogQ29tcGlsZURpRGVwZW5kZW5jeU1ldGFkYXRhW107XG5cbiAgY29uc3RydWN0b3Ioe3J1bnRpbWUsIG5hbWUsIG1vZHVsZVVybCwgcHJlZml4LCBkaURlcHMsIHZhbHVlfToge1xuICAgIHJ1bnRpbWU/OiBGdW5jdGlvbixcbiAgICBuYW1lPzogc3RyaW5nLFxuICAgIHByZWZpeD86IHN0cmluZyxcbiAgICBtb2R1bGVVcmw/OiBzdHJpbmcsXG4gICAgdmFsdWU/OiBib29sZWFuLFxuICAgIGRpRGVwcz86IENvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YVtdXG4gIH0pIHtcbiAgICB0aGlzLnJ1bnRpbWUgPSBydW50aW1lO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5wcmVmaXggPSBwcmVmaXg7XG4gICAgdGhpcy5tb2R1bGVVcmwgPSBtb2R1bGVVcmw7XG4gICAgdGhpcy5kaURlcHMgPSBfbm9ybWFsaXplQXJyYXkoZGlEZXBzKTtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBnZXQgaWRlbnRpZmllcigpOiBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhIHsgcmV0dXJuIHRoaXM7IH1cblxuICBzdGF0aWMgZnJvbUpzb24oZGF0YToge1trZXk6IHN0cmluZ106IGFueX0pOiBDb21waWxlRmFjdG9yeU1ldGFkYXRhIHtcbiAgICByZXR1cm4gbmV3IENvbXBpbGVGYWN0b3J5TWV0YWRhdGEoe1xuICAgICAgbmFtZTogZGF0YVsnbmFtZSddLFxuICAgICAgcHJlZml4OiBkYXRhWydwcmVmaXgnXSxcbiAgICAgIG1vZHVsZVVybDogZGF0YVsnbW9kdWxlVXJsJ10sXG4gICAgICB2YWx1ZTogZGF0YVsndmFsdWUnXSxcbiAgICAgIGRpRGVwczogX2FycmF5RnJvbUpzb24oZGF0YVsnZGlEZXBzJ10sIENvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YS5mcm9tSnNvbilcbiAgICB9KTtcbiAgfVxuXG4gIHRvSnNvbigpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdjbGFzcyc6ICdGYWN0b3J5JyxcbiAgICAgICduYW1lJzogdGhpcy5uYW1lLFxuICAgICAgJ3ByZWZpeCc6IHRoaXMucHJlZml4LFxuICAgICAgJ21vZHVsZVVybCc6IHRoaXMubW9kdWxlVXJsLFxuICAgICAgJ3ZhbHVlJzogdGhpcy52YWx1ZSxcbiAgICAgICdkaURlcHMnOiBfYXJyYXlUb0pzb24odGhpcy5kaURlcHMpXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ29tcGlsZVRva2VuTWV0YWRhdGEgaW1wbGVtZW50cyBDb21waWxlTWV0YWRhdGFXaXRoSWRlbnRpZmllciB7XG4gIHZhbHVlOiBhbnk7XG4gIGlkZW50aWZpZXI6IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGE7XG4gIGlkZW50aWZpZXJJc0luc3RhbmNlOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHt2YWx1ZSwgaWRlbnRpZmllciwgaWRlbnRpZmllcklzSW5zdGFuY2V9OiB7XG4gICAgdmFsdWU/OiBhbnksXG4gICAgaWRlbnRpZmllcj86IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEsXG4gICAgaWRlbnRpZmllcklzSW5zdGFuY2U/OiBib29sZWFuXG4gIH0pIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5pZGVudGlmaWVyID0gaWRlbnRpZmllcjtcbiAgICB0aGlzLmlkZW50aWZpZXJJc0luc3RhbmNlID0gbm9ybWFsaXplQm9vbChpZGVudGlmaWVySXNJbnN0YW5jZSk7XG4gIH1cblxuICBzdGF0aWMgZnJvbUpzb24oZGF0YToge1trZXk6IHN0cmluZ106IGFueX0pOiBDb21waWxlVG9rZW5NZXRhZGF0YSB7XG4gICAgcmV0dXJuIG5ldyBDb21waWxlVG9rZW5NZXRhZGF0YSh7XG4gICAgICB2YWx1ZTogZGF0YVsndmFsdWUnXSxcbiAgICAgIGlkZW50aWZpZXI6IF9vYmpGcm9tSnNvbihkYXRhWydpZGVudGlmaWVyJ10sIENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEuZnJvbUpzb24pLFxuICAgICAgaWRlbnRpZmllcklzSW5zdGFuY2U6IGRhdGFbJ2lkZW50aWZpZXJJc0luc3RhbmNlJ11cbiAgICB9KTtcbiAgfVxuXG4gIHRvSnNvbigpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICd2YWx1ZSc6IHRoaXMudmFsdWUsXG4gICAgICAnaWRlbnRpZmllcic6IF9vYmpUb0pzb24odGhpcy5pZGVudGlmaWVyKSxcbiAgICAgICdpZGVudGlmaWVySXNJbnN0YW5jZSc6IHRoaXMuaWRlbnRpZmllcklzSW5zdGFuY2VcbiAgICB9O1xuICB9XG5cbiAgZ2V0IHJ1bnRpbWVDYWNoZUtleSgpOiBhbnkge1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5pZGVudGlmaWVyKSkge1xuICAgICAgcmV0dXJuIHRoaXMuaWRlbnRpZmllci5ydW50aW1lO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9XG4gIH1cblxuICBnZXQgYXNzZXRDYWNoZUtleSgpOiBhbnkge1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5pZGVudGlmaWVyKSkge1xuICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmlkZW50aWZpZXIubW9kdWxlVXJsKSAmJlxuICAgICAgICAgICAgICAgICAgICAgaXNQcmVzZW50KGdldFVybFNjaGVtZSh0aGlzLmlkZW50aWZpZXIubW9kdWxlVXJsKSkgP1xuICAgICAgICAgICAgICAgICBgJHt0aGlzLmlkZW50aWZpZXIubmFtZX18JHt0aGlzLmlkZW50aWZpZXIubW9kdWxlVXJsfXwke3RoaXMuaWRlbnRpZmllcklzSW5zdGFuY2V9YCA6XG4gICAgICAgICAgICAgICAgIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGVxdWFsc1RvKHRva2VuMjogQ29tcGlsZVRva2VuTWV0YWRhdGEpOiBib29sZWFuIHtcbiAgICB2YXIgcmsgPSB0aGlzLnJ1bnRpbWVDYWNoZUtleTtcbiAgICB2YXIgYWsgPSB0aGlzLmFzc2V0Q2FjaGVLZXk7XG4gICAgcmV0dXJuIChpc1ByZXNlbnQocmspICYmIHJrID09IHRva2VuMi5ydW50aW1lQ2FjaGVLZXkpIHx8XG4gICAgICAgICAgIChpc1ByZXNlbnQoYWspICYmIGFrID09IHRva2VuMi5hc3NldENhY2hlS2V5KTtcbiAgfVxuXG4gIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLnZhbHVlKSA/IHNhbml0aXplSWRlbnRpZmllcih0aGlzLnZhbHVlKSA6IHRoaXMuaWRlbnRpZmllci5uYW1lO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21waWxlVG9rZW5NYXA8VkFMVUU+IHtcbiAgcHJpdmF0ZSBfdmFsdWVNYXAgPSBuZXcgTWFwPGFueSwgVkFMVUU+KCk7XG4gIHByaXZhdGUgX3ZhbHVlczogVkFMVUVbXSA9IFtdO1xuXG4gIGFkZCh0b2tlbjogQ29tcGlsZVRva2VuTWV0YWRhdGEsIHZhbHVlOiBWQUxVRSkge1xuICAgIHZhciBleGlzdGluZyA9IHRoaXMuZ2V0KHRva2VuKTtcbiAgICBpZiAoaXNQcmVzZW50KGV4aXN0aW5nKSkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYENhbiBvbmx5IGFkZCB0byBhIFRva2VuTWFwISBUb2tlbjogJHt0b2tlbi5uYW1lfWApO1xuICAgIH1cbiAgICB0aGlzLl92YWx1ZXMucHVzaCh2YWx1ZSk7XG4gICAgdmFyIHJrID0gdG9rZW4ucnVudGltZUNhY2hlS2V5O1xuICAgIGlmIChpc1ByZXNlbnQocmspKSB7XG4gICAgICB0aGlzLl92YWx1ZU1hcC5zZXQocmssIHZhbHVlKTtcbiAgICB9XG4gICAgdmFyIGFrID0gdG9rZW4uYXNzZXRDYWNoZUtleTtcbiAgICBpZiAoaXNQcmVzZW50KGFrKSkge1xuICAgICAgdGhpcy5fdmFsdWVNYXAuc2V0KGFrLCB2YWx1ZSk7XG4gICAgfVxuICB9XG4gIGdldCh0b2tlbjogQ29tcGlsZVRva2VuTWV0YWRhdGEpOiBWQUxVRSB7XG4gICAgdmFyIHJrID0gdG9rZW4ucnVudGltZUNhY2hlS2V5O1xuICAgIHZhciBhayA9IHRva2VuLmFzc2V0Q2FjaGVLZXk7XG4gICAgdmFyIHJlc3VsdDtcbiAgICBpZiAoaXNQcmVzZW50KHJrKSkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5fdmFsdWVNYXAuZ2V0KHJrKTtcbiAgICB9XG4gICAgaWYgKGlzQmxhbmsocmVzdWx0KSAmJiBpc1ByZXNlbnQoYWspKSB7XG4gICAgICByZXN1bHQgPSB0aGlzLl92YWx1ZU1hcC5nZXQoYWspO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIHZhbHVlcygpOiBWQUxVRVtdIHsgcmV0dXJuIHRoaXMuX3ZhbHVlczsgfVxuICBnZXQgc2l6ZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fdmFsdWVzLmxlbmd0aDsgfVxufVxuXG4vKipcbiAqIE1ldGFkYXRhIHJlZ2FyZGluZyBjb21waWxhdGlvbiBvZiBhIHR5cGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb21waWxlVHlwZU1ldGFkYXRhIGltcGxlbWVudHMgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSwgQ29tcGlsZU1ldGFkYXRhV2l0aFR5cGUge1xuICBydW50aW1lOiBUeXBlO1xuICBuYW1lOiBzdHJpbmc7XG4gIHByZWZpeDogc3RyaW5nO1xuICBtb2R1bGVVcmw6IHN0cmluZztcbiAgaXNIb3N0OiBib29sZWFuO1xuICB2YWx1ZTogYW55O1xuICBkaURlcHM6IENvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YVtdO1xuXG4gIGNvbnN0cnVjdG9yKHtydW50aW1lLCBuYW1lLCBtb2R1bGVVcmwsIHByZWZpeCwgaXNIb3N0LCB2YWx1ZSwgZGlEZXBzfToge1xuICAgIHJ1bnRpbWU/OiBUeXBlLFxuICAgIG5hbWU/OiBzdHJpbmcsXG4gICAgbW9kdWxlVXJsPzogc3RyaW5nLFxuICAgIHByZWZpeD86IHN0cmluZyxcbiAgICBpc0hvc3Q/OiBib29sZWFuLFxuICAgIHZhbHVlPzogYW55LFxuICAgIGRpRGVwcz86IENvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YVtdXG4gIH0gPSB7fSkge1xuICAgIHRoaXMucnVudGltZSA9IHJ1bnRpbWU7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLm1vZHVsZVVybCA9IG1vZHVsZVVybDtcbiAgICB0aGlzLnByZWZpeCA9IHByZWZpeDtcbiAgICB0aGlzLmlzSG9zdCA9IG5vcm1hbGl6ZUJvb2woaXNIb3N0KTtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5kaURlcHMgPSBfbm9ybWFsaXplQXJyYXkoZGlEZXBzKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSnNvbihkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSk6IENvbXBpbGVUeXBlTWV0YWRhdGEge1xuICAgIHJldHVybiBuZXcgQ29tcGlsZVR5cGVNZXRhZGF0YSh7XG4gICAgICBuYW1lOiBkYXRhWyduYW1lJ10sXG4gICAgICBtb2R1bGVVcmw6IGRhdGFbJ21vZHVsZVVybCddLFxuICAgICAgcHJlZml4OiBkYXRhWydwcmVmaXgnXSxcbiAgICAgIGlzSG9zdDogZGF0YVsnaXNIb3N0J10sXG4gICAgICB2YWx1ZTogZGF0YVsndmFsdWUnXSxcbiAgICAgIGRpRGVwczogX2FycmF5RnJvbUpzb24oZGF0YVsnZGlEZXBzJ10sIENvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YS5mcm9tSnNvbilcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBpZGVudGlmaWVyKCk6IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEgeyByZXR1cm4gdGhpczsgfVxuICBnZXQgdHlwZSgpOiBDb21waWxlVHlwZU1ldGFkYXRhIHsgcmV0dXJuIHRoaXM7IH1cblxuICB0b0pzb24oKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBOb3RlOiBSdW50aW1lIHR5cGUgY2FuJ3QgYmUgc2VyaWFsaXplZC4uLlxuICAgICAgJ2NsYXNzJzogJ1R5cGUnLFxuICAgICAgJ25hbWUnOiB0aGlzLm5hbWUsXG4gICAgICAnbW9kdWxlVXJsJzogdGhpcy5tb2R1bGVVcmwsXG4gICAgICAncHJlZml4JzogdGhpcy5wcmVmaXgsXG4gICAgICAnaXNIb3N0JzogdGhpcy5pc0hvc3QsXG4gICAgICAndmFsdWUnOiB0aGlzLnZhbHVlLFxuICAgICAgJ2RpRGVwcyc6IF9hcnJheVRvSnNvbih0aGlzLmRpRGVwcylcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21waWxlUXVlcnlNZXRhZGF0YSB7XG4gIHNlbGVjdG9yczogQXJyYXk8Q29tcGlsZVRva2VuTWV0YWRhdGE+O1xuICBkZXNjZW5kYW50czogYm9vbGVhbjtcbiAgZmlyc3Q6IGJvb2xlYW47XG4gIHByb3BlcnR5TmFtZTogc3RyaW5nO1xuICByZWFkOiBDb21waWxlVG9rZW5NZXRhZGF0YTtcblxuICBjb25zdHJ1Y3Rvcih7c2VsZWN0b3JzLCBkZXNjZW5kYW50cywgZmlyc3QsIHByb3BlcnR5TmFtZSwgcmVhZH06IHtcbiAgICBzZWxlY3RvcnM/OiBBcnJheTxDb21waWxlVG9rZW5NZXRhZGF0YT4sXG4gICAgZGVzY2VuZGFudHM/OiBib29sZWFuLFxuICAgIGZpcnN0PzogYm9vbGVhbixcbiAgICBwcm9wZXJ0eU5hbWU/OiBzdHJpbmcsXG4gICAgcmVhZD86IENvbXBpbGVUb2tlbk1ldGFkYXRhXG4gIH0gPSB7fSkge1xuICAgIHRoaXMuc2VsZWN0b3JzID0gc2VsZWN0b3JzO1xuICAgIHRoaXMuZGVzY2VuZGFudHMgPSBub3JtYWxpemVCb29sKGRlc2NlbmRhbnRzKTtcbiAgICB0aGlzLmZpcnN0ID0gbm9ybWFsaXplQm9vbChmaXJzdCk7XG4gICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWU7XG4gICAgdGhpcy5yZWFkID0gcmVhZDtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSnNvbihkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSk6IENvbXBpbGVRdWVyeU1ldGFkYXRhIHtcbiAgICByZXR1cm4gbmV3IENvbXBpbGVRdWVyeU1ldGFkYXRhKHtcbiAgICAgIHNlbGVjdG9yczogX2FycmF5RnJvbUpzb24oZGF0YVsnc2VsZWN0b3JzJ10sIENvbXBpbGVUb2tlbk1ldGFkYXRhLmZyb21Kc29uKSxcbiAgICAgIGRlc2NlbmRhbnRzOiBkYXRhWydkZXNjZW5kYW50cyddLFxuICAgICAgZmlyc3Q6IGRhdGFbJ2ZpcnN0J10sXG4gICAgICBwcm9wZXJ0eU5hbWU6IGRhdGFbJ3Byb3BlcnR5TmFtZSddLFxuICAgICAgcmVhZDogX29iakZyb21Kc29uKGRhdGFbJ3JlYWQnXSwgQ29tcGlsZVRva2VuTWV0YWRhdGEuZnJvbUpzb24pXG4gICAgfSk7XG4gIH1cblxuICB0b0pzb24oKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgIHJldHVybiB7XG4gICAgICAnc2VsZWN0b3JzJzogX2FycmF5VG9Kc29uKHRoaXMuc2VsZWN0b3JzKSxcbiAgICAgICdkZXNjZW5kYW50cyc6IHRoaXMuZGVzY2VuZGFudHMsXG4gICAgICAnZmlyc3QnOiB0aGlzLmZpcnN0LFxuICAgICAgJ3Byb3BlcnR5TmFtZSc6IHRoaXMucHJvcGVydHlOYW1lLFxuICAgICAgJ3JlYWQnOiBfb2JqVG9Kc29uKHRoaXMucmVhZClcbiAgICB9O1xuICB9XG59XG5cbi8qKlxuICogTWV0YWRhdGEgcmVnYXJkaW5nIGNvbXBpbGF0aW9uIG9mIGEgdGVtcGxhdGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb21waWxlVGVtcGxhdGVNZXRhZGF0YSB7XG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uO1xuICB0ZW1wbGF0ZTogc3RyaW5nO1xuICB0ZW1wbGF0ZVVybDogc3RyaW5nO1xuICBzdHlsZXM6IHN0cmluZ1tdO1xuICBzdHlsZVVybHM6IHN0cmluZ1tdO1xuICBuZ0NvbnRlbnRTZWxlY3RvcnM6IHN0cmluZ1tdO1xuICBjb25zdHJ1Y3Rvcih7ZW5jYXBzdWxhdGlvbiwgdGVtcGxhdGUsIHRlbXBsYXRlVXJsLCBzdHlsZXMsIHN0eWxlVXJscywgbmdDb250ZW50U2VsZWN0b3JzfToge1xuICAgIGVuY2Fwc3VsYXRpb24/OiBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICB0ZW1wbGF0ZT86IHN0cmluZyxcbiAgICB0ZW1wbGF0ZVVybD86IHN0cmluZyxcbiAgICBzdHlsZXM/OiBzdHJpbmdbXSxcbiAgICBzdHlsZVVybHM/OiBzdHJpbmdbXSxcbiAgICBuZ0NvbnRlbnRTZWxlY3RvcnM/OiBzdHJpbmdbXVxuICB9ID0ge30pIHtcbiAgICB0aGlzLmVuY2Fwc3VsYXRpb24gPSBpc1ByZXNlbnQoZW5jYXBzdWxhdGlvbikgPyBlbmNhcHN1bGF0aW9uIDogVmlld0VuY2Fwc3VsYXRpb24uRW11bGF0ZWQ7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuICAgIHRoaXMudGVtcGxhdGVVcmwgPSB0ZW1wbGF0ZVVybDtcbiAgICB0aGlzLnN0eWxlcyA9IGlzUHJlc2VudChzdHlsZXMpID8gc3R5bGVzIDogW107XG4gICAgdGhpcy5zdHlsZVVybHMgPSBpc1ByZXNlbnQoc3R5bGVVcmxzKSA/IHN0eWxlVXJscyA6IFtdO1xuICAgIHRoaXMubmdDb250ZW50U2VsZWN0b3JzID0gaXNQcmVzZW50KG5nQ29udGVudFNlbGVjdG9ycykgPyBuZ0NvbnRlbnRTZWxlY3RvcnMgOiBbXTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSnNvbihkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSk6IENvbXBpbGVUZW1wbGF0ZU1ldGFkYXRhIHtcbiAgICByZXR1cm4gbmV3IENvbXBpbGVUZW1wbGF0ZU1ldGFkYXRhKHtcbiAgICAgIGVuY2Fwc3VsYXRpb246IGlzUHJlc2VudChkYXRhWydlbmNhcHN1bGF0aW9uJ10pID9cbiAgICAgICAgICAgICAgICAgICAgICAgICBWSUVXX0VOQ0FQU1VMQVRJT05fVkFMVUVTW2RhdGFbJ2VuY2Fwc3VsYXRpb24nXV0gOlxuICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbJ2VuY2Fwc3VsYXRpb24nXSxcbiAgICAgIHRlbXBsYXRlOiBkYXRhWyd0ZW1wbGF0ZSddLFxuICAgICAgdGVtcGxhdGVVcmw6IGRhdGFbJ3RlbXBsYXRlVXJsJ10sXG4gICAgICBzdHlsZXM6IGRhdGFbJ3N0eWxlcyddLFxuICAgICAgc3R5bGVVcmxzOiBkYXRhWydzdHlsZVVybHMnXSxcbiAgICAgIG5nQ29udGVudFNlbGVjdG9yczogZGF0YVsnbmdDb250ZW50U2VsZWN0b3JzJ11cbiAgICB9KTtcbiAgfVxuXG4gIHRvSnNvbigpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdlbmNhcHN1bGF0aW9uJzpcbiAgICAgICAgICBpc1ByZXNlbnQodGhpcy5lbmNhcHN1bGF0aW9uKSA/IHNlcmlhbGl6ZUVudW0odGhpcy5lbmNhcHN1bGF0aW9uKSA6IHRoaXMuZW5jYXBzdWxhdGlvbixcbiAgICAgICd0ZW1wbGF0ZSc6IHRoaXMudGVtcGxhdGUsXG4gICAgICAndGVtcGxhdGVVcmwnOiB0aGlzLnRlbXBsYXRlVXJsLFxuICAgICAgJ3N0eWxlcyc6IHRoaXMuc3R5bGVzLFxuICAgICAgJ3N0eWxlVXJscyc6IHRoaXMuc3R5bGVVcmxzLFxuICAgICAgJ25nQ29udGVudFNlbGVjdG9ycyc6IHRoaXMubmdDb250ZW50U2VsZWN0b3JzXG4gICAgfTtcbiAgfVxufVxuXG4vKipcbiAqIE1ldGFkYXRhIHJlZ2FyZGluZyBjb21waWxhdGlvbiBvZiBhIGRpcmVjdGl2ZS5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSBpbXBsZW1lbnRzIENvbXBpbGVNZXRhZGF0YVdpdGhUeXBlIHtcbiAgc3RhdGljIGNyZWF0ZSh7dHlwZSwgaXNDb21wb25lbnQsIHNlbGVjdG9yLCBleHBvcnRBcywgY2hhbmdlRGV0ZWN0aW9uLCBpbnB1dHMsIG91dHB1dHMsIGhvc3QsXG4gICAgICAgICAgICAgICAgIGxpZmVjeWNsZUhvb2tzLCBwcm92aWRlcnMsIHZpZXdQcm92aWRlcnMsIHF1ZXJpZXMsIHZpZXdRdWVyaWVzLCB0ZW1wbGF0ZX06IHtcbiAgICB0eXBlPzogQ29tcGlsZVR5cGVNZXRhZGF0YSxcbiAgICBpc0NvbXBvbmVudD86IGJvb2xlYW4sXG4gICAgc2VsZWN0b3I/OiBzdHJpbmcsXG4gICAgZXhwb3J0QXM/OiBzdHJpbmcsXG4gICAgY2hhbmdlRGV0ZWN0aW9uPzogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgaW5wdXRzPzogc3RyaW5nW10sXG4gICAgb3V0cHV0cz86IHN0cmluZ1tdLFxuICAgIGhvc3Q/OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSxcbiAgICBsaWZlY3ljbGVIb29rcz86IExpZmVjeWNsZUhvb2tzW10sXG4gICAgcHJvdmlkZXJzPzpcbiAgICAgICAgQXJyYXk8Q29tcGlsZVByb3ZpZGVyTWV0YWRhdGEgfCBDb21waWxlVHlwZU1ldGFkYXRhIHwgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSB8IGFueVtdPixcbiAgICB2aWV3UHJvdmlkZXJzPzpcbiAgICAgICAgQXJyYXk8Q29tcGlsZVByb3ZpZGVyTWV0YWRhdGEgfCBDb21waWxlVHlwZU1ldGFkYXRhIHwgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSB8IGFueVtdPixcbiAgICBxdWVyaWVzPzogQ29tcGlsZVF1ZXJ5TWV0YWRhdGFbXSxcbiAgICB2aWV3UXVlcmllcz86IENvbXBpbGVRdWVyeU1ldGFkYXRhW10sXG4gICAgdGVtcGxhdGU/OiBDb21waWxlVGVtcGxhdGVNZXRhZGF0YVxuICB9ID0ge30pOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEge1xuICAgIHZhciBob3N0TGlzdGVuZXJzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICAgIHZhciBob3N0UHJvcGVydGllczoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgICB2YXIgaG9zdEF0dHJpYnV0ZXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gICAgaWYgKGlzUHJlc2VudChob3N0KSkge1xuICAgICAgU3RyaW5nTWFwV3JhcHBlci5mb3JFYWNoKGhvc3QsICh2YWx1ZTogc3RyaW5nLCBrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICB2YXIgbWF0Y2hlcyA9IFJlZ0V4cFdyYXBwZXIuZmlyc3RNYXRjaChIT1NUX1JFR19FWFAsIGtleSk7XG4gICAgICAgIGlmIChpc0JsYW5rKG1hdGNoZXMpKSB7XG4gICAgICAgICAgaG9zdEF0dHJpYnV0ZXNba2V5XSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudChtYXRjaGVzWzFdKSkge1xuICAgICAgICAgIGhvc3RQcm9wZXJ0aWVzW21hdGNoZXNbMV1dID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KG1hdGNoZXNbMl0pKSB7XG4gICAgICAgICAgaG9zdExpc3RlbmVyc1ttYXRjaGVzWzJdXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgdmFyIGlucHV0c01hcDoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgICBpZiAoaXNQcmVzZW50KGlucHV0cykpIHtcbiAgICAgIGlucHV0cy5mb3JFYWNoKChiaW5kQ29uZmlnOiBzdHJpbmcpID0+IHtcbiAgICAgICAgLy8gY2Fub25pY2FsIHN5bnRheDogYGRpclByb3A6IGVsUHJvcGBcbiAgICAgICAgLy8gaWYgdGhlcmUgaXMgbm8gYDpgLCB1c2UgZGlyUHJvcCA9IGVsUHJvcFxuICAgICAgICB2YXIgcGFydHMgPSBzcGxpdEF0Q29sb24oYmluZENvbmZpZywgW2JpbmRDb25maWcsIGJpbmRDb25maWddKTtcbiAgICAgICAgaW5wdXRzTWFwW3BhcnRzWzBdXSA9IHBhcnRzWzFdO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHZhciBvdXRwdXRzTWFwOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICAgIGlmIChpc1ByZXNlbnQob3V0cHV0cykpIHtcbiAgICAgIG91dHB1dHMuZm9yRWFjaCgoYmluZENvbmZpZzogc3RyaW5nKSA9PiB7XG4gICAgICAgIC8vIGNhbm9uaWNhbCBzeW50YXg6IGBkaXJQcm9wOiBlbFByb3BgXG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIGA6YCwgdXNlIGRpclByb3AgPSBlbFByb3BcbiAgICAgICAgdmFyIHBhcnRzID0gc3BsaXRBdENvbG9uKGJpbmRDb25maWcsIFtiaW5kQ29uZmlnLCBiaW5kQ29uZmlnXSk7XG4gICAgICAgIG91dHB1dHNNYXBbcGFydHNbMF1dID0gcGFydHNbMV07XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSh7XG4gICAgICB0eXBlOiB0eXBlLFxuICAgICAgaXNDb21wb25lbnQ6IG5vcm1hbGl6ZUJvb2woaXNDb21wb25lbnQpLFxuICAgICAgc2VsZWN0b3I6IHNlbGVjdG9yLFxuICAgICAgZXhwb3J0QXM6IGV4cG9ydEFzLFxuICAgICAgY2hhbmdlRGV0ZWN0aW9uOiBjaGFuZ2VEZXRlY3Rpb24sXG4gICAgICBpbnB1dHM6IGlucHV0c01hcCxcbiAgICAgIG91dHB1dHM6IG91dHB1dHNNYXAsXG4gICAgICBob3N0TGlzdGVuZXJzOiBob3N0TGlzdGVuZXJzLFxuICAgICAgaG9zdFByb3BlcnRpZXM6IGhvc3RQcm9wZXJ0aWVzLFxuICAgICAgaG9zdEF0dHJpYnV0ZXM6IGhvc3RBdHRyaWJ1dGVzLFxuICAgICAgbGlmZWN5Y2xlSG9va3M6IGlzUHJlc2VudChsaWZlY3ljbGVIb29rcykgPyBsaWZlY3ljbGVIb29rcyA6IFtdLFxuICAgICAgcHJvdmlkZXJzOiBwcm92aWRlcnMsXG4gICAgICB2aWV3UHJvdmlkZXJzOiB2aWV3UHJvdmlkZXJzLFxuICAgICAgcXVlcmllczogcXVlcmllcyxcbiAgICAgIHZpZXdRdWVyaWVzOiB2aWV3UXVlcmllcyxcbiAgICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVxuICAgIH0pO1xuICB9XG4gIHR5cGU6IENvbXBpbGVUeXBlTWV0YWRhdGE7XG4gIGlzQ29tcG9uZW50OiBib29sZWFuO1xuICBzZWxlY3Rvcjogc3RyaW5nO1xuICBleHBvcnRBczogc3RyaW5nO1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5O1xuICBpbnB1dHM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuICBvdXRwdXRzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfTtcbiAgaG9zdExpc3RlbmVyczoge1trZXk6IHN0cmluZ106IHN0cmluZ307XG4gIGhvc3RQcm9wZXJ0aWVzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfTtcbiAgaG9zdEF0dHJpYnV0ZXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuICBsaWZlY3ljbGVIb29rczogTGlmZWN5Y2xlSG9va3NbXTtcbiAgcHJvdmlkZXJzOiBDb21waWxlUHJvdmlkZXJNZXRhZGF0YVtdO1xuICB2aWV3UHJvdmlkZXJzOiBDb21waWxlUHJvdmlkZXJNZXRhZGF0YVtdO1xuICBxdWVyaWVzOiBDb21waWxlUXVlcnlNZXRhZGF0YVtdO1xuICB2aWV3UXVlcmllczogQ29tcGlsZVF1ZXJ5TWV0YWRhdGFbXTtcblxuICB0ZW1wbGF0ZTogQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGE7XG4gIGNvbnN0cnVjdG9yKHt0eXBlLCBpc0NvbXBvbmVudCwgc2VsZWN0b3IsIGV4cG9ydEFzLCBjaGFuZ2VEZXRlY3Rpb24sIGlucHV0cywgb3V0cHV0cyxcbiAgICAgICAgICAgICAgIGhvc3RMaXN0ZW5lcnMsIGhvc3RQcm9wZXJ0aWVzLCBob3N0QXR0cmlidXRlcywgbGlmZWN5Y2xlSG9va3MsIHByb3ZpZGVycyxcbiAgICAgICAgICAgICAgIHZpZXdQcm92aWRlcnMsIHF1ZXJpZXMsIHZpZXdRdWVyaWVzLCB0ZW1wbGF0ZX06IHtcbiAgICB0eXBlPzogQ29tcGlsZVR5cGVNZXRhZGF0YSxcbiAgICBpc0NvbXBvbmVudD86IGJvb2xlYW4sXG4gICAgc2VsZWN0b3I/OiBzdHJpbmcsXG4gICAgZXhwb3J0QXM/OiBzdHJpbmcsXG4gICAgY2hhbmdlRGV0ZWN0aW9uPzogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgaW5wdXRzPzoge1trZXk6IHN0cmluZ106IHN0cmluZ30sXG4gICAgb3V0cHV0cz86IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9LFxuICAgIGhvc3RMaXN0ZW5lcnM/OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSxcbiAgICBob3N0UHJvcGVydGllcz86IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9LFxuICAgIGhvc3RBdHRyaWJ1dGVzPzoge1trZXk6IHN0cmluZ106IHN0cmluZ30sXG4gICAgbGlmZWN5Y2xlSG9va3M/OiBMaWZlY3ljbGVIb29rc1tdLFxuICAgIHByb3ZpZGVycz86XG4gICAgICAgIEFycmF5PENvbXBpbGVQcm92aWRlck1ldGFkYXRhIHwgQ29tcGlsZVR5cGVNZXRhZGF0YSB8IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEgfCBhbnlbXT4sXG4gICAgdmlld1Byb3ZpZGVycz86XG4gICAgICAgIEFycmF5PENvbXBpbGVQcm92aWRlck1ldGFkYXRhIHwgQ29tcGlsZVR5cGVNZXRhZGF0YSB8IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEgfCBhbnlbXT4sXG4gICAgcXVlcmllcz86IENvbXBpbGVRdWVyeU1ldGFkYXRhW10sXG4gICAgdmlld1F1ZXJpZXM/OiBDb21waWxlUXVlcnlNZXRhZGF0YVtdLFxuICAgIHRlbXBsYXRlPzogQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGFcbiAgfSA9IHt9KSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmlzQ29tcG9uZW50ID0gaXNDb21wb25lbnQ7XG4gICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xuICAgIHRoaXMuZXhwb3J0QXMgPSBleHBvcnRBcztcbiAgICB0aGlzLmNoYW5nZURldGVjdGlvbiA9IGNoYW5nZURldGVjdGlvbjtcbiAgICB0aGlzLmlucHV0cyA9IGlucHV0cztcbiAgICB0aGlzLm91dHB1dHMgPSBvdXRwdXRzO1xuICAgIHRoaXMuaG9zdExpc3RlbmVycyA9IGhvc3RMaXN0ZW5lcnM7XG4gICAgdGhpcy5ob3N0UHJvcGVydGllcyA9IGhvc3RQcm9wZXJ0aWVzO1xuICAgIHRoaXMuaG9zdEF0dHJpYnV0ZXMgPSBob3N0QXR0cmlidXRlcztcbiAgICB0aGlzLmxpZmVjeWNsZUhvb2tzID0gX25vcm1hbGl6ZUFycmF5KGxpZmVjeWNsZUhvb2tzKTtcbiAgICB0aGlzLnByb3ZpZGVycyA9IF9ub3JtYWxpemVBcnJheShwcm92aWRlcnMpO1xuICAgIHRoaXMudmlld1Byb3ZpZGVycyA9IF9ub3JtYWxpemVBcnJheSh2aWV3UHJvdmlkZXJzKTtcbiAgICB0aGlzLnF1ZXJpZXMgPSBfbm9ybWFsaXplQXJyYXkocXVlcmllcyk7XG4gICAgdGhpcy52aWV3UXVlcmllcyA9IF9ub3JtYWxpemVBcnJheSh2aWV3UXVlcmllcyk7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuICB9XG5cbiAgZ2V0IGlkZW50aWZpZXIoKTogQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSB7IHJldHVybiB0aGlzLnR5cGU7IH1cblxuICBzdGF0aWMgZnJvbUpzb24oZGF0YToge1trZXk6IHN0cmluZ106IGFueX0pOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEge1xuICAgIHJldHVybiBuZXcgQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhKHtcbiAgICAgIGlzQ29tcG9uZW50OiBkYXRhWydpc0NvbXBvbmVudCddLFxuICAgICAgc2VsZWN0b3I6IGRhdGFbJ3NlbGVjdG9yJ10sXG4gICAgICBleHBvcnRBczogZGF0YVsnZXhwb3J0QXMnXSxcbiAgICAgIHR5cGU6IGlzUHJlc2VudChkYXRhWyd0eXBlJ10pID8gQ29tcGlsZVR5cGVNZXRhZGF0YS5mcm9tSnNvbihkYXRhWyd0eXBlJ10pIDogZGF0YVsndHlwZSddLFxuICAgICAgY2hhbmdlRGV0ZWN0aW9uOiBpc1ByZXNlbnQoZGF0YVsnY2hhbmdlRGV0ZWN0aW9uJ10pID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIENIQU5HRV9ERVRFQ1RJT05fU1RSQVRFR1lfVkFMVUVTW2RhdGFbJ2NoYW5nZURldGVjdGlvbiddXSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhWydjaGFuZ2VEZXRlY3Rpb24nXSxcbiAgICAgIGlucHV0czogZGF0YVsnaW5wdXRzJ10sXG4gICAgICBvdXRwdXRzOiBkYXRhWydvdXRwdXRzJ10sXG4gICAgICBob3N0TGlzdGVuZXJzOiBkYXRhWydob3N0TGlzdGVuZXJzJ10sXG4gICAgICBob3N0UHJvcGVydGllczogZGF0YVsnaG9zdFByb3BlcnRpZXMnXSxcbiAgICAgIGhvc3RBdHRyaWJ1dGVzOiBkYXRhWydob3N0QXR0cmlidXRlcyddLFxuICAgICAgbGlmZWN5Y2xlSG9va3M6XG4gICAgICAgICAgKDxhbnlbXT5kYXRhWydsaWZlY3ljbGVIb29rcyddKS5tYXAoaG9va1ZhbHVlID0+IExJRkVDWUNMRV9IT09LU19WQUxVRVNbaG9va1ZhbHVlXSksXG4gICAgICB0ZW1wbGF0ZTogaXNQcmVzZW50KGRhdGFbJ3RlbXBsYXRlJ10pID8gQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGEuZnJvbUpzb24oZGF0YVsndGVtcGxhdGUnXSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbJ3RlbXBsYXRlJ10sXG4gICAgICBwcm92aWRlcnM6IF9hcnJheUZyb21Kc29uKGRhdGFbJ3Byb3ZpZGVycyddLCBtZXRhZGF0YUZyb21Kc29uKSxcbiAgICAgIHZpZXdQcm92aWRlcnM6IF9hcnJheUZyb21Kc29uKGRhdGFbJ3ZpZXdQcm92aWRlcnMnXSwgbWV0YWRhdGFGcm9tSnNvbiksXG4gICAgICBxdWVyaWVzOiBfYXJyYXlGcm9tSnNvbihkYXRhWydxdWVyaWVzJ10sIENvbXBpbGVRdWVyeU1ldGFkYXRhLmZyb21Kc29uKSxcbiAgICAgIHZpZXdRdWVyaWVzOiBfYXJyYXlGcm9tSnNvbihkYXRhWyd2aWV3UXVlcmllcyddLCBDb21waWxlUXVlcnlNZXRhZGF0YS5mcm9tSnNvbilcbiAgICB9KTtcbiAgfVxuXG4gIHRvSnNvbigpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdjbGFzcyc6ICdEaXJlY3RpdmUnLFxuICAgICAgJ2lzQ29tcG9uZW50JzogdGhpcy5pc0NvbXBvbmVudCxcbiAgICAgICdzZWxlY3Rvcic6IHRoaXMuc2VsZWN0b3IsXG4gICAgICAnZXhwb3J0QXMnOiB0aGlzLmV4cG9ydEFzLFxuICAgICAgJ3R5cGUnOiBpc1ByZXNlbnQodGhpcy50eXBlKSA/IHRoaXMudHlwZS50b0pzb24oKSA6IHRoaXMudHlwZSxcbiAgICAgICdjaGFuZ2VEZXRlY3Rpb24nOiBpc1ByZXNlbnQodGhpcy5jaGFuZ2VEZXRlY3Rpb24pID8gc2VyaWFsaXplRW51bSh0aGlzLmNoYW5nZURldGVjdGlvbikgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdGlvbixcbiAgICAgICdpbnB1dHMnOiB0aGlzLmlucHV0cyxcbiAgICAgICdvdXRwdXRzJzogdGhpcy5vdXRwdXRzLFxuICAgICAgJ2hvc3RMaXN0ZW5lcnMnOiB0aGlzLmhvc3RMaXN0ZW5lcnMsXG4gICAgICAnaG9zdFByb3BlcnRpZXMnOiB0aGlzLmhvc3RQcm9wZXJ0aWVzLFxuICAgICAgJ2hvc3RBdHRyaWJ1dGVzJzogdGhpcy5ob3N0QXR0cmlidXRlcyxcbiAgICAgICdsaWZlY3ljbGVIb29rcyc6IHRoaXMubGlmZWN5Y2xlSG9va3MubWFwKGhvb2sgPT4gc2VyaWFsaXplRW51bShob29rKSksXG4gICAgICAndGVtcGxhdGUnOiBpc1ByZXNlbnQodGhpcy50ZW1wbGF0ZSkgPyB0aGlzLnRlbXBsYXRlLnRvSnNvbigpIDogdGhpcy50ZW1wbGF0ZSxcbiAgICAgICdwcm92aWRlcnMnOiBfYXJyYXlUb0pzb24odGhpcy5wcm92aWRlcnMpLFxuICAgICAgJ3ZpZXdQcm92aWRlcnMnOiBfYXJyYXlUb0pzb24odGhpcy52aWV3UHJvdmlkZXJzKSxcbiAgICAgICdxdWVyaWVzJzogX2FycmF5VG9Kc29uKHRoaXMucXVlcmllcyksXG4gICAgICAndmlld1F1ZXJpZXMnOiBfYXJyYXlUb0pzb24odGhpcy52aWV3UXVlcmllcylcbiAgICB9O1xuICB9XG59XG5cbi8qKlxuICogQ29uc3RydWN0IHtAbGluayBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGF9IGZyb20ge0BsaW5rIENvbXBvbmVudFR5cGVNZXRhZGF0YX0gYW5kIGEgc2VsZWN0b3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVIb3N0Q29tcG9uZW50TWV0YShjb21wb25lbnRUeXBlOiBDb21waWxlVHlwZU1ldGFkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudFNlbGVjdG9yOiBzdHJpbmcpOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEge1xuICB2YXIgdGVtcGxhdGUgPSBDc3NTZWxlY3Rvci5wYXJzZShjb21wb25lbnRTZWxlY3RvcilbMF0uZ2V0TWF0Y2hpbmdFbGVtZW50VGVtcGxhdGUoKTtcbiAgcmV0dXJuIENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YS5jcmVhdGUoe1xuICAgIHR5cGU6IG5ldyBDb21waWxlVHlwZU1ldGFkYXRhKHtcbiAgICAgIHJ1bnRpbWU6IE9iamVjdCxcbiAgICAgIG5hbWU6IGAke2NvbXBvbmVudFR5cGUubmFtZX1fSG9zdGAsXG4gICAgICBtb2R1bGVVcmw6IGNvbXBvbmVudFR5cGUubW9kdWxlVXJsLFxuICAgICAgaXNIb3N0OiB0cnVlXG4gICAgfSksXG4gICAgdGVtcGxhdGU6IG5ldyBDb21waWxlVGVtcGxhdGVNZXRhZGF0YShcbiAgICAgICAge3RlbXBsYXRlOiB0ZW1wbGF0ZSwgdGVtcGxhdGVVcmw6ICcnLCBzdHlsZXM6IFtdLCBzdHlsZVVybHM6IFtdLCBuZ0NvbnRlbnRTZWxlY3RvcnM6IFtdfSksXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICAgIGlucHV0czogW10sXG4gICAgb3V0cHV0czogW10sXG4gICAgaG9zdDoge30sXG4gICAgbGlmZWN5Y2xlSG9va3M6IFtdLFxuICAgIGlzQ29tcG9uZW50OiB0cnVlLFxuICAgIHNlbGVjdG9yOiAnKicsXG4gICAgcHJvdmlkZXJzOiBbXSxcbiAgICB2aWV3UHJvdmlkZXJzOiBbXSxcbiAgICBxdWVyaWVzOiBbXSxcbiAgICB2aWV3UXVlcmllczogW11cbiAgfSk7XG59XG5cblxuZXhwb3J0IGNsYXNzIENvbXBpbGVQaXBlTWV0YWRhdGEgaW1wbGVtZW50cyBDb21waWxlTWV0YWRhdGFXaXRoVHlwZSB7XG4gIHR5cGU6IENvbXBpbGVUeXBlTWV0YWRhdGE7XG4gIG5hbWU6IHN0cmluZztcbiAgcHVyZTogYm9vbGVhbjtcbiAgbGlmZWN5Y2xlSG9va3M6IExpZmVjeWNsZUhvb2tzW107XG5cbiAgY29uc3RydWN0b3Ioe3R5cGUsIG5hbWUsIHB1cmUsIGxpZmVjeWNsZUhvb2tzfToge1xuICAgIHR5cGU/OiBDb21waWxlVHlwZU1ldGFkYXRhLFxuICAgIG5hbWU/OiBzdHJpbmcsXG4gICAgcHVyZT86IGJvb2xlYW4sXG4gICAgbGlmZWN5Y2xlSG9va3M/OiBMaWZlY3ljbGVIb29rc1tdXG4gIH0gPSB7fSkge1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnB1cmUgPSBub3JtYWxpemVCb29sKHB1cmUpO1xuICAgIHRoaXMubGlmZWN5Y2xlSG9va3MgPSBfbm9ybWFsaXplQXJyYXkobGlmZWN5Y2xlSG9va3MpO1xuICB9XG4gIGdldCBpZGVudGlmaWVyKCk6IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEgeyByZXR1cm4gdGhpcy50eXBlOyB9XG5cbiAgc3RhdGljIGZyb21Kc29uKGRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogQ29tcGlsZVBpcGVNZXRhZGF0YSB7XG4gICAgcmV0dXJuIG5ldyBDb21waWxlUGlwZU1ldGFkYXRhKHtcbiAgICAgIHR5cGU6IGlzUHJlc2VudChkYXRhWyd0eXBlJ10pID8gQ29tcGlsZVR5cGVNZXRhZGF0YS5mcm9tSnNvbihkYXRhWyd0eXBlJ10pIDogZGF0YVsndHlwZSddLFxuICAgICAgbmFtZTogZGF0YVsnbmFtZSddLFxuICAgICAgcHVyZTogZGF0YVsncHVyZSddXG4gICAgfSk7XG4gIH1cblxuICB0b0pzb24oKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgIHJldHVybiB7XG4gICAgICAnY2xhc3MnOiAnUGlwZScsXG4gICAgICAndHlwZSc6IGlzUHJlc2VudCh0aGlzLnR5cGUpID8gdGhpcy50eXBlLnRvSnNvbigpIDogbnVsbCxcbiAgICAgICduYW1lJzogdGhpcy5uYW1lLFxuICAgICAgJ3B1cmUnOiB0aGlzLnB1cmVcbiAgICB9O1xuICB9XG59XG5cbnZhciBfQ09NUElMRV9NRVRBREFUQV9GUk9NX0pTT04gPSB7XG4gICdEaXJlY3RpdmUnOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEuZnJvbUpzb24sXG4gICdQaXBlJzogQ29tcGlsZVBpcGVNZXRhZGF0YS5mcm9tSnNvbixcbiAgJ1R5cGUnOiBDb21waWxlVHlwZU1ldGFkYXRhLmZyb21Kc29uLFxuICAnUHJvdmlkZXInOiBDb21waWxlUHJvdmlkZXJNZXRhZGF0YS5mcm9tSnNvbixcbiAgJ0lkZW50aWZpZXInOiBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhLmZyb21Kc29uLFxuICAnRmFjdG9yeSc6IENvbXBpbGVGYWN0b3J5TWV0YWRhdGEuZnJvbUpzb25cbn07XG5cbmZ1bmN0aW9uIF9hcnJheUZyb21Kc29uKG9iajogYW55W10sIGZuOiAoYToge1trZXk6IHN0cmluZ106IGFueX0pID0+IGFueSk6IGFueSB7XG4gIHJldHVybiBpc0JsYW5rKG9iaikgPyBudWxsIDogb2JqLm1hcChvID0+IF9vYmpGcm9tSnNvbihvLCBmbikpO1xufVxuXG5mdW5jdGlvbiBfYXJyYXlUb0pzb24ob2JqOiBhbnlbXSk6IHN0cmluZyB8IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgcmV0dXJuIGlzQmxhbmsob2JqKSA/IG51bGwgOiBvYmoubWFwKF9vYmpUb0pzb24pO1xufVxuXG5mdW5jdGlvbiBfb2JqRnJvbUpzb24ob2JqOiBhbnksIGZuOiAoYToge1trZXk6IHN0cmluZ106IGFueX0pID0+IGFueSk6IGFueSB7XG4gIGlmIChpc0FycmF5KG9iaikpIHJldHVybiBfYXJyYXlGcm9tSnNvbihvYmosIGZuKTtcbiAgaWYgKGlzU3RyaW5nKG9iaikgfHwgaXNCbGFuayhvYmopIHx8IGlzQm9vbGVhbihvYmopIHx8IGlzTnVtYmVyKG9iaikpIHJldHVybiBvYmo7XG4gIHJldHVybiBmbihvYmopO1xufVxuXG5mdW5jdGlvbiBfb2JqVG9Kc29uKG9iajogYW55KTogc3RyaW5nIHwge1trZXk6IHN0cmluZ106IGFueX0ge1xuICBpZiAoaXNBcnJheShvYmopKSByZXR1cm4gX2FycmF5VG9Kc29uKG9iaik7XG4gIGlmIChpc1N0cmluZyhvYmopIHx8IGlzQmxhbmsob2JqKSB8fCBpc0Jvb2xlYW4ob2JqKSB8fCBpc051bWJlcihvYmopKSByZXR1cm4gb2JqO1xuICByZXR1cm4gb2JqLnRvSnNvbigpO1xufVxuXG5mdW5jdGlvbiBfbm9ybWFsaXplQXJyYXkob2JqOiBhbnlbXSk6IGFueVtdIHtcbiAgcmV0dXJuIGlzUHJlc2VudChvYmopID8gb2JqIDogW107XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
