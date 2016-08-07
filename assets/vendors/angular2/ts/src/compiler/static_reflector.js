System.register(['angular2/src/facade/collection', 'angular2/src/facade/lang', 'angular2/src/core/metadata'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var collection_1, lang_1, metadata_1;
    var StaticType, StaticReflector;
    function isMetadataSymbolicCallExpression(expression) {
        return !lang_1.isPrimitive(expression) && !lang_1.isArray(expression) && expression['__symbolic'] == 'call';
    }
    function isMetadataSymbolicReferenceExpression(expression) {
        return !lang_1.isPrimitive(expression) && !lang_1.isArray(expression) &&
            expression['__symbolic'] == 'reference';
    }
    function isClassMetadata(expression) {
        return !lang_1.isPrimitive(expression) && !lang_1.isArray(expression) && expression['__symbolic'] == 'class';
    }
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (metadata_1_1) {
                metadata_1 = metadata_1_1;
            }],
        execute: function() {
            /**
             * A token representing the a reference to a static type.
             *
             * This token is unique for a moduleId and name and can be used as a hash table key.
             */
            StaticType = (function () {
                function StaticType(moduleId, name) {
                    this.moduleId = moduleId;
                    this.name = name;
                }
                return StaticType;
            }());
            exports_1("StaticType", StaticType);
            /**
             * A static reflector implements enough of the Reflector API that is necessary to compile
             * templates statically.
             */
            StaticReflector = (function () {
                function StaticReflector(host) {
                    this.host = host;
                    this.typeCache = new Map();
                    this.annotationCache = new Map();
                    this.propertyCache = new Map();
                    this.parameterCache = new Map();
                    this.metadataCache = new Map();
                    this.conversionMap = new Map();
                    this.initializeConversionMap();
                }
                StaticReflector.prototype.importUri = function (typeOrFunc) { return typeOrFunc.moduleId; };
                /**
                 * getStaticType produces a Type whose metadata is known but whose implementation is not loaded.
                 * All types passed to the StaticResolver should be pseudo-types returned by this method.
                 *
                 * @param moduleId the module identifier as an absolute path.
                 * @param name the name of the type.
                 */
                StaticReflector.prototype.getStaticType = function (moduleId, name) {
                    var key = "\"" + moduleId + "\"." + name;
                    var result = this.typeCache.get(key);
                    if (!lang_1.isPresent(result)) {
                        result = new StaticType(moduleId, name);
                        this.typeCache.set(key, result);
                    }
                    return result;
                };
                StaticReflector.prototype.annotations = function (type) {
                    var _this = this;
                    var annotations = this.annotationCache.get(type);
                    if (!lang_1.isPresent(annotations)) {
                        var classMetadata = this.getTypeMetadata(type);
                        if (lang_1.isPresent(classMetadata['decorators'])) {
                            annotations = classMetadata['decorators']
                                .map(function (decorator) { return _this.convertKnownDecorator(type.moduleId, decorator); })
                                .filter(function (decorator) { return lang_1.isPresent(decorator); });
                        }
                        else {
                            annotations = [];
                        }
                        this.annotationCache.set(type, annotations);
                    }
                    return annotations;
                };
                StaticReflector.prototype.propMetadata = function (type) {
                    var propMetadata = this.propertyCache.get(type);
                    if (!lang_1.isPresent(propMetadata)) {
                        var classMetadata = this.getTypeMetadata(type);
                        propMetadata = this.getPropertyMetadata(type.moduleId, classMetadata['members']);
                        if (!lang_1.isPresent(propMetadata)) {
                            propMetadata = {};
                        }
                        this.propertyCache.set(type, propMetadata);
                    }
                    return propMetadata;
                };
                StaticReflector.prototype.parameters = function (type) {
                    var parameters = this.parameterCache.get(type);
                    if (!lang_1.isPresent(parameters)) {
                        var classMetadata = this.getTypeMetadata(type);
                        if (lang_1.isPresent(classMetadata)) {
                            var members = classMetadata['members'];
                            if (lang_1.isPresent(members)) {
                                var ctorData = members['__ctor__'];
                                if (lang_1.isPresent(ctorData)) {
                                    var ctor = ctorData.find(function (a) { return a['__symbolic'] === 'constructor'; });
                                    parameters = this.simplify(type.moduleId, ctor['parameters']);
                                }
                            }
                        }
                        if (!lang_1.isPresent(parameters)) {
                            parameters = [];
                        }
                        this.parameterCache.set(type, parameters);
                    }
                    return parameters;
                };
                StaticReflector.prototype.initializeConversionMap = function () {
                    var _this = this;
                    var core_metadata = this.host.resolveModule('angular2/src/core/metadata');
                    var conversionMap = this.conversionMap;
                    conversionMap.set(this.getStaticType(core_metadata, 'Directive'), function (moduleContext, expression) {
                        var p0 = _this.getDecoratorParameter(moduleContext, expression, 0);
                        if (!lang_1.isPresent(p0)) {
                            p0 = {};
                        }
                        return new metadata_1.DirectiveMetadata({
                            selector: p0['selector'],
                            inputs: p0['inputs'],
                            outputs: p0['outputs'],
                            events: p0['events'],
                            host: p0['host'],
                            bindings: p0['bindings'],
                            providers: p0['providers'],
                            exportAs: p0['exportAs'],
                            queries: p0['queries'],
                        });
                    });
                    conversionMap.set(this.getStaticType(core_metadata, 'Component'), function (moduleContext, expression) {
                        var p0 = _this.getDecoratorParameter(moduleContext, expression, 0);
                        if (!lang_1.isPresent(p0)) {
                            p0 = {};
                        }
                        return new metadata_1.ComponentMetadata({
                            selector: p0['selector'],
                            inputs: p0['inputs'],
                            outputs: p0['outputs'],
                            properties: p0['properties'],
                            events: p0['events'],
                            host: p0['host'],
                            exportAs: p0['exportAs'],
                            moduleId: p0['moduleId'],
                            bindings: p0['bindings'],
                            providers: p0['providers'],
                            viewBindings: p0['viewBindings'],
                            viewProviders: p0['viewProviders'],
                            changeDetection: p0['changeDetection'],
                            queries: p0['queries'],
                            templateUrl: p0['templateUrl'],
                            template: p0['template'],
                            styleUrls: p0['styleUrls'],
                            styles: p0['styles'],
                            directives: p0['directives'],
                            pipes: p0['pipes'],
                            encapsulation: p0['encapsulation']
                        });
                    });
                    conversionMap.set(this.getStaticType(core_metadata, 'Input'), function (moduleContext, expression) { return new metadata_1.InputMetadata(_this.getDecoratorParameter(moduleContext, expression, 0)); });
                    conversionMap.set(this.getStaticType(core_metadata, 'Output'), function (moduleContext, expression) { return new metadata_1.OutputMetadata(_this.getDecoratorParameter(moduleContext, expression, 0)); });
                    conversionMap.set(this.getStaticType(core_metadata, 'View'), function (moduleContext, expression) {
                        var p0 = _this.getDecoratorParameter(moduleContext, expression, 0);
                        if (!lang_1.isPresent(p0)) {
                            p0 = {};
                        }
                        return new metadata_1.ViewMetadata({
                            templateUrl: p0['templateUrl'],
                            template: p0['template'],
                            directives: p0['directives'],
                            pipes: p0['pipes'],
                            encapsulation: p0['encapsulation'],
                            styles: p0['styles'],
                        });
                    });
                    conversionMap.set(this.getStaticType(core_metadata, 'Attribute'), function (moduleContext, expression) { return new metadata_1.AttributeMetadata(_this.getDecoratorParameter(moduleContext, expression, 0)); });
                    conversionMap.set(this.getStaticType(core_metadata, 'Query'), function (moduleContext, expression) {
                        var p0 = _this.getDecoratorParameter(moduleContext, expression, 0);
                        var p1 = _this.getDecoratorParameter(moduleContext, expression, 1);
                        if (!lang_1.isPresent(p1)) {
                            p1 = {};
                        }
                        return new metadata_1.QueryMetadata(p0, { descendants: p1.descendants, first: p1.first });
                    });
                    conversionMap.set(this.getStaticType(core_metadata, 'ContentChildren'), function (moduleContext, expression) { return new metadata_1.ContentChildrenMetadata(_this.getDecoratorParameter(moduleContext, expression, 0)); });
                    conversionMap.set(this.getStaticType(core_metadata, 'ContentChild'), function (moduleContext, expression) { return new metadata_1.ContentChildMetadata(_this.getDecoratorParameter(moduleContext, expression, 0)); });
                    conversionMap.set(this.getStaticType(core_metadata, 'ViewChildren'), function (moduleContext, expression) { return new metadata_1.ViewChildrenMetadata(_this.getDecoratorParameter(moduleContext, expression, 0)); });
                    conversionMap.set(this.getStaticType(core_metadata, 'ViewChild'), function (moduleContext, expression) { return new metadata_1.ViewChildMetadata(_this.getDecoratorParameter(moduleContext, expression, 0)); });
                    conversionMap.set(this.getStaticType(core_metadata, 'ViewQuery'), function (moduleContext, expression) {
                        var p0 = _this.getDecoratorParameter(moduleContext, expression, 0);
                        var p1 = _this.getDecoratorParameter(moduleContext, expression, 1);
                        if (!lang_1.isPresent(p1)) {
                            p1 = {};
                        }
                        return new metadata_1.ViewQueryMetadata(p0, {
                            descendants: p1['descendants'],
                            first: p1['first'],
                        });
                    });
                    conversionMap.set(this.getStaticType(core_metadata, 'Pipe'), function (moduleContext, expression) {
                        var p0 = _this.getDecoratorParameter(moduleContext, expression, 0);
                        if (!lang_1.isPresent(p0)) {
                            p0 = {};
                        }
                        return new metadata_1.PipeMetadata({
                            name: p0['name'],
                            pure: p0['pure'],
                        });
                    });
                    conversionMap.set(this.getStaticType(core_metadata, 'HostBinding'), function (moduleContext, expression) { return new metadata_1.HostBindingMetadata(_this.getDecoratorParameter(moduleContext, expression, 0)); });
                    conversionMap.set(this.getStaticType(core_metadata, 'HostListener'), function (moduleContext, expression) { return new metadata_1.HostListenerMetadata(_this.getDecoratorParameter(moduleContext, expression, 0), _this.getDecoratorParameter(moduleContext, expression, 1)); });
                    return null;
                };
                StaticReflector.prototype.convertKnownDecorator = function (moduleContext, expression) {
                    var converter = this.conversionMap.get(this.getDecoratorType(moduleContext, expression));
                    if (lang_1.isPresent(converter))
                        return converter(moduleContext, expression);
                    return null;
                };
                StaticReflector.prototype.getDecoratorType = function (moduleContext, expression) {
                    if (isMetadataSymbolicCallExpression(expression)) {
                        var target = expression['expression'];
                        if (isMetadataSymbolicReferenceExpression(target)) {
                            var moduleId = this.host.resolveModule(target['module'], moduleContext);
                            return this.getStaticType(moduleId, target['name']);
                        }
                    }
                    return null;
                };
                StaticReflector.prototype.getDecoratorParameter = function (moduleContext, expression, index) {
                    if (isMetadataSymbolicCallExpression(expression) && lang_1.isPresent(expression['arguments']) &&
                        expression['arguments'].length <= index + 1) {
                        return this.simplify(moduleContext, expression['arguments'][index]);
                    }
                    return null;
                };
                StaticReflector.prototype.getPropertyMetadata = function (moduleContext, value) {
                    var _this = this;
                    if (lang_1.isPresent(value)) {
                        var result_1 = {};
                        collection_1.StringMapWrapper.forEach(value, function (value, name) {
                            var data = _this.getMemberData(moduleContext, value);
                            if (lang_1.isPresent(data)) {
                                var propertyData = data.filter(function (d) { return d['kind'] == "property"; })
                                    .map(function (d) { return d['directives']; })
                                    .reduce(function (p, c) { return p.concat(c); }, []);
                                if (propertyData.length != 0) {
                                    collection_1.StringMapWrapper.set(result_1, name, propertyData);
                                }
                            }
                        });
                        return result_1;
                    }
                    return {};
                };
                // clang-format off
                StaticReflector.prototype.getMemberData = function (moduleContext, member) {
                    var _this = this;
                    // clang-format on
                    var result = [];
                    if (lang_1.isPresent(member)) {
                        for (var _i = 0, member_1 = member; _i < member_1.length; _i++) {
                            var item = member_1[_i];
                            result.push({
                                kind: item['__symbolic'],
                                directives: lang_1.isPresent(item['decorators']) ?
                                    item['decorators']
                                        .map(function (decorator) { return _this.convertKnownDecorator(moduleContext, decorator); })
                                        .filter(function (d) { return lang_1.isPresent(d); }) :
                                    null
                            });
                        }
                    }
                    return result;
                };
                /** @internal */
                StaticReflector.prototype.simplify = function (moduleContext, value) {
                    var _this = this;
                    function simplify(expression) {
                        if (lang_1.isPrimitive(expression)) {
                            return expression;
                        }
                        if (lang_1.isArray(expression)) {
                            var result = [];
                            for (var _i = 0, _a = expression; _i < _a.length; _i++) {
                                var item = _a[_i];
                                result.push(simplify(item));
                            }
                            return result;
                        }
                        if (lang_1.isPresent(expression)) {
                            if (lang_1.isPresent(expression['__symbolic'])) {
                                switch (expression['__symbolic']) {
                                    case "binop":
                                        var left = simplify(expression['left']);
                                        var right = simplify(expression['right']);
                                        switch (expression['operator']) {
                                            case '&&':
                                                return left && right;
                                            case '||':
                                                return left || right;
                                            case '|':
                                                return left | right;
                                            case '^':
                                                return left ^ right;
                                            case '&':
                                                return left & right;
                                            case '==':
                                                return left == right;
                                            case '!=':
                                                return left != right;
                                            case '===':
                                                return left === right;
                                            case '!==':
                                                return left !== right;
                                            case '<':
                                                return left < right;
                                            case '>':
                                                return left > right;
                                            case '<=':
                                                return left <= right;
                                            case '>=':
                                                return left >= right;
                                            case '<<':
                                                return left << right;
                                            case '>>':
                                                return left >> right;
                                            case '+':
                                                return left + right;
                                            case '-':
                                                return left - right;
                                            case '*':
                                                return left * right;
                                            case '/':
                                                return left / right;
                                            case '%':
                                                return left % right;
                                        }
                                        return null;
                                    case "pre":
                                        var operand = simplify(expression['operand']);
                                        switch (expression['operator']) {
                                            case '+':
                                                return operand;
                                            case '-':
                                                return -operand;
                                            case '!':
                                                return !operand;
                                            case '~':
                                                return ~operand;
                                        }
                                        return null;
                                    case "index":
                                        var indexTarget = simplify(expression['expression']);
                                        var index = simplify(expression['index']);
                                        if (lang_1.isPresent(indexTarget) && lang_1.isPrimitive(index))
                                            return indexTarget[index];
                                        return null;
                                    case "select":
                                        var selectTarget = simplify(expression['expression']);
                                        var member = simplify(expression['member']);
                                        if (lang_1.isPresent(selectTarget) && lang_1.isPrimitive(member))
                                            return selectTarget[member];
                                        return null;
                                    case "reference":
                                        var referenceModuleName = _this.host.resolveModule(expression['module'], moduleContext);
                                        var referenceModule = _this.getModuleMetadata(referenceModuleName);
                                        var referenceValue = referenceModule['metadata'][expression['name']];
                                        if (isClassMetadata(referenceValue)) {
                                            // Convert to a pseudo type
                                            return _this.getStaticType(referenceModuleName, expression['name']);
                                        }
                                        return _this.simplify(referenceModuleName, referenceValue);
                                    case "call":
                                        return null;
                                }
                                return null;
                            }
                            var result_2 = {};
                            collection_1.StringMapWrapper.forEach(expression, function (value, name) { result_2[name] = simplify(value); });
                            return result_2;
                        }
                        return null;
                    }
                    return simplify(value);
                };
                /**
                 * @param module an absolute path to a module file.
                 */
                StaticReflector.prototype.getModuleMetadata = function (module) {
                    var moduleMetadata = this.metadataCache.get(module);
                    if (!lang_1.isPresent(moduleMetadata)) {
                        moduleMetadata = this.host.getMetadataFor(module);
                        if (!lang_1.isPresent(moduleMetadata)) {
                            moduleMetadata = { __symbolic: "module", module: module, metadata: {} };
                        }
                        this.metadataCache.set(module, moduleMetadata);
                    }
                    return moduleMetadata;
                };
                StaticReflector.prototype.getTypeMetadata = function (type) {
                    var moduleMetadata = this.getModuleMetadata(type.moduleId);
                    var result = moduleMetadata['metadata'][type.name];
                    if (!lang_1.isPresent(result)) {
                        result = { __symbolic: "class" };
                    }
                    return result;
                };
                return StaticReflector;
            }());
            exports_1("StaticReflector", StaticReflector);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9zdGF0aWNfcmVmbGVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0lBcWRBLDBDQUEwQyxVQUFlO1FBQ3ZELE1BQU0sQ0FBQyxDQUFDLGtCQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxjQUFPLENBQUMsVUFBVSxDQUFDLElBQUksVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLE1BQU0sQ0FBQztJQUNoRyxDQUFDO0lBRUQsK0NBQStDLFVBQWU7UUFDNUQsTUFBTSxDQUFDLENBQUMsa0JBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQU8sQ0FBQyxVQUFVLENBQUM7WUFDaEQsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLFdBQVcsQ0FBQztJQUNqRCxDQUFDO0lBRUQseUJBQXlCLFVBQWU7UUFDdEMsTUFBTSxDQUFDLENBQUMsa0JBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksT0FBTyxDQUFDO0lBQ2pHLENBQUM7Ozs7Ozs7Ozs7Ozs7WUFoYkQ7Ozs7ZUFJRztZQUNIO2dCQUNFLG9CQUFtQixRQUFnQixFQUFTLElBQVk7b0JBQXJDLGFBQVEsR0FBUixRQUFRLENBQVE7b0JBQVMsU0FBSSxHQUFKLElBQUksQ0FBUTtnQkFBRyxDQUFDO2dCQUM5RCxpQkFBQztZQUFELENBRkEsQUFFQyxJQUFBO1lBRkQsbUNBRUMsQ0FBQTtZQUVEOzs7ZUFHRztZQUNIO2dCQU1FLHlCQUFvQixJQUF5QjtvQkFBekIsU0FBSSxHQUFKLElBQUksQ0FBcUI7b0JBTHJDLGNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBc0IsQ0FBQztvQkFDMUMsb0JBQWUsR0FBRyxJQUFJLEdBQUcsRUFBcUIsQ0FBQztvQkFDL0Msa0JBQWEsR0FBRyxJQUFJLEdBQUcsRUFBb0MsQ0FBQztvQkFDNUQsbUJB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LEVBQUUsRUFBRSxFQUFDLENBQUM7d0JBQ3hFLENBQUM7d0JBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxDQUFDO29CQUNqRCxDQUFDO29CQUNELE1BQU0sQ0FBQyxjQUFjLENBQUM7Z0JBQ3hCLENBQUM7Z0JBRU8seUNBQWUsR0FBdkIsVUFBd0IsSUFBZ0I7b0JBQ3RDLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQzNELElBQUksTUFBTSxHQUFHLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ25ELEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3ZCLE1BQU0sR0FBRyxFQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUMsQ0FBQztvQkFDakMsQ0FBQztvQkFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNoQixDQUFDO2dCQUNILHNCQUFDO1lBQUQsQ0F0WkEsQUFzWkMsSUFBQTtZQXRaRCw2Q0FzWkMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tcGlsZXIvc3RhdGljX3JlZmxlY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3RyaW5nTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7XG4gIGlzQXJyYXksXG4gIGlzUHJlc2VudCxcbiAgaXNQcmltaXRpdmUsXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge1xuICBBdHRyaWJ1dGVNZXRhZGF0YSxcbiAgRGlyZWN0aXZlTWV0YWRhdGEsXG4gIENvbXBvbmVudE1ldGFkYXRhLFxuICBDb250ZW50Q2hpbGRyZW5NZXRhZGF0YSxcbiAgQ29udGVudENoaWxkTWV0YWRhdGEsXG4gIElucHV0TWV0YWRhdGEsXG4gIEhvc3RCaW5kaW5nTWV0YWRhdGEsXG4gIEhvc3RMaXN0ZW5lck1ldGFkYXRhLFxuICBPdXRwdXRNZXRhZGF0YSxcbiAgUGlwZU1ldGFkYXRhLFxuICBWaWV3TWV0YWRhdGEsXG4gIFZpZXdDaGlsZE1ldGFkYXRhLFxuICBWaWV3Q2hpbGRyZW5NZXRhZGF0YSxcbiAgVmlld1F1ZXJ5TWV0YWRhdGEsXG4gIFF1ZXJ5TWV0YWRhdGEsXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL21ldGFkYXRhJztcbmltcG9ydCB7UmVmbGVjdG9yUmVhZGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9yZWZsZWN0aW9uL3JlZmxlY3Rvcl9yZWFkZXInO1xuXG4vKipcbiAqIFRoZSBob3N0IG9mIHRoZSBzdGF0aWMgcmVzb2x2ZXIgaXMgZXhwZWN0ZWQgdG8gYmUgYWJsZSB0byBwcm92aWRlIG1vZHVsZSBtZXRhZGF0YSBpbiB0aGUgZm9ybSBvZlxuICogTW9kdWxlTWV0YWRhdGEuIEFuZ3VsYXIgMiBDTEkgd2lsbCBwcm9kdWNlIHRoaXMgbWV0YWRhdGEgZm9yIGEgbW9kdWxlIHdoZW5ldmVyIGEgLmQudHMgZmlsZXMgaXNcbiAqIHByb2R1Y2VkIGFuZCB0aGUgbW9kdWxlIGhhcyBleHBvcnRlZCB2YXJpYWJsZXMgb3IgY2xhc3NlcyB3aXRoIGRlY29yYXRvcnMuIE1vZHVsZSBtZXRhZGF0YSBjYW5cbiAqIGFsc28gYmUgcHJvZHVjZWQgZGlyZWN0bHkgZnJvbSBUeXBlU2NyaXB0IHNvdXJjZXMgYnkgdXNpbmcgTWV0YWRhdGFDb2xsZWN0b3IgaW4gdG9vbHMvbWV0YWRhdGEuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGljUmVmbGVjdG9ySG9zdCB7XG4gIC8qKlxuICAgKiAgUmV0dXJuIGEgTW9kdWxlTWV0YWRhdGEgZm9yIHRoZSBnaXZlbiBtb2R1bGUuXG4gICAqXG4gICAqIEBwYXJhbSBtb2R1bGVJZCBpcyBhIHN0cmluZyBpZGVudGlmaWVyIGZvciBhIG1vZHVsZSBhcyBhbiBhYnNvbHV0ZSBwYXRoLlxuICAgKiBAcmV0dXJucyB0aGUgbWV0YWRhdGEgZm9yIHRoZSBnaXZlbiBtb2R1bGUuXG4gICAqL1xuICBnZXRNZXRhZGF0YUZvcihtb2R1bGVJZDogc3RyaW5nKToge1trZXk6IHN0cmluZ106IGFueX07XG5cbiAgLyoqXG4gICAqIFJlc29sdmUgYSBtb2R1bGUgZnJvbSBhbiBpbXBvcnQgc3RhdGVtZW50IGZvcm0gdG8gYW4gYWJzb2x1dGUgcGF0aC5cbiAgICogQHBhcmFtIG1vZHVsZU5hbWUgdGhlIGxvY2F0aW9uIGltcG9ydGVkIGZyb21cbiAgICogQHBhcmFtIGNvbnRhaW5pbmdGaWxlIGZvciByZWxhdGl2ZSBpbXBvcnRzLCB0aGUgcGF0aCBvZiB0aGUgZmlsZSBjb250YWluaW5nIHRoZSBpbXBvcnRcbiAgICovXG4gIHJlc29sdmVNb2R1bGUobW9kdWxlTmFtZTogc3RyaW5nLCBjb250YWluaW5nRmlsZT86IHN0cmluZyk6IHN0cmluZztcbn1cblxuLyoqXG4gKiBBIHRva2VuIHJlcHJlc2VudGluZyB0aGUgYSByZWZlcmVuY2UgdG8gYSBzdGF0aWMgdHlwZS5cbiAqXG4gKiBUaGlzIHRva2VuIGlzIHVuaXF1ZSBmb3IgYSBtb2R1bGVJZCBhbmQgbmFtZSBhbmQgY2FuIGJlIHVzZWQgYXMgYSBoYXNoIHRhYmxlIGtleS5cbiAqL1xuZXhwb3J0IGNsYXNzIFN0YXRpY1R5cGUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbW9kdWxlSWQ6IHN0cmluZywgcHVibGljIG5hbWU6IHN0cmluZykge31cbn1cblxuLyoqXG4gKiBBIHN0YXRpYyByZWZsZWN0b3IgaW1wbGVtZW50cyBlbm91Z2ggb2YgdGhlIFJlZmxlY3RvciBBUEkgdGhhdCBpcyBuZWNlc3NhcnkgdG8gY29tcGlsZVxuICogdGVtcGxhdGVzIHN0YXRpY2FsbHkuXG4gKi9cbmV4cG9ydCBjbGFzcyBTdGF0aWNSZWZsZWN0b3IgaW1wbGVtZW50cyBSZWZsZWN0b3JSZWFkZXIge1xuICBwcml2YXRlIHR5cGVDYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBTdGF0aWNUeXBlPigpO1xuICBwcml2YXRlIGFubm90YXRpb25DYWNoZSA9IG5ldyBNYXA8U3RhdGljVHlwZSwgYW55W10+KCk7XG4gIHByaXZhdGUgcHJvcGVydHlDYWNoZSA9IG5ldyBNYXA8U3RhdGljVHlwZSwge1trZXk6IHN0cmluZ106IGFueX0+KCk7XG4gIHByaXZhdGUgcGFyYW1ldGVyQ2FjaGUgPSBuZXcgTWFwPFN0YXRpY1R5cGUsIGFueVtdPigpO1xuICBwcml2YXRlIG1ldGFkYXRhQ2FjaGUgPSBuZXcgTWFwPHN0cmluZywge1trZXk6IHN0cmluZ106IGFueX0+KCk7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaG9zdDogU3RhdGljUmVmbGVjdG9ySG9zdCkgeyB0aGlzLmluaXRpYWxpemVDb252ZXJzaW9uTWFwKCk7IH1cblxuICBpbXBvcnRVcmkodHlwZU9yRnVuYzogYW55KTogc3RyaW5nIHsgcmV0dXJuICg8U3RhdGljVHlwZT50eXBlT3JGdW5jKS5tb2R1bGVJZDsgfVxuXG4gIC8qKlxuICAgKiBnZXRTdGF0aWNUeXBlIHByb2R1Y2VzIGEgVHlwZSB3aG9zZSBtZXRhZGF0YSBpcyBrbm93biBidXQgd2hvc2UgaW1wbGVtZW50YXRpb24gaXMgbm90IGxvYWRlZC5cbiAgICogQWxsIHR5cGVzIHBhc3NlZCB0byB0aGUgU3RhdGljUmVzb2x2ZXIgc2hvdWxkIGJlIHBzZXVkby10eXBlcyByZXR1cm5lZCBieSB0aGlzIG1ldGhvZC5cbiAgICpcbiAgICogQHBhcmFtIG1vZHVsZUlkIHRoZSBtb2R1bGUgaWRlbnRpZmllciBhcyBhbiBhYnNvbHV0ZSBwYXRoLlxuICAgKiBAcGFyYW0gbmFtZSB0aGUgbmFtZSBvZiB0aGUgdHlwZS5cbiAgICovXG4gIHB1YmxpYyBnZXRTdGF0aWNUeXBlKG1vZHVsZUlkOiBzdHJpbmcsIG5hbWU6IHN0cmluZyk6IFN0YXRpY1R5cGUge1xuICAgIGxldCBrZXkgPSBgXCIke21vZHVsZUlkfVwiLiR7bmFtZX1gO1xuICAgIGxldCByZXN1bHQgPSB0aGlzLnR5cGVDYWNoZS5nZXQoa2V5KTtcbiAgICBpZiAoIWlzUHJlc2VudChyZXN1bHQpKSB7XG4gICAgICByZXN1bHQgPSBuZXcgU3RhdGljVHlwZShtb2R1bGVJZCwgbmFtZSk7XG4gICAgICB0aGlzLnR5cGVDYWNoZS5zZXQoa2V5LCByZXN1bHQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHVibGljIGFubm90YXRpb25zKHR5cGU6IFN0YXRpY1R5cGUpOiBhbnlbXSB7XG4gICAgbGV0IGFubm90YXRpb25zID0gdGhpcy5hbm5vdGF0aW9uQ2FjaGUuZ2V0KHR5cGUpO1xuICAgIGlmICghaXNQcmVzZW50KGFubm90YXRpb25zKSkge1xuICAgICAgbGV0IGNsYXNzTWV0YWRhdGEgPSB0aGlzLmdldFR5cGVNZXRhZGF0YSh0eXBlKTtcbiAgICAgIGlmIChpc1ByZXNlbnQoY2xhc3NNZXRhZGF0YVsnZGVjb3JhdG9ycyddKSkge1xuICAgICAgICBhbm5vdGF0aW9ucyA9ICg8YW55W10+Y2xhc3NNZXRhZGF0YVsnZGVjb3JhdG9ycyddKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKGRlY29yYXRvciA9PiB0aGlzLmNvbnZlcnRLbm93bkRlY29yYXRvcih0eXBlLm1vZHVsZUlkLCBkZWNvcmF0b3IpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGRlY29yYXRvciA9PiBpc1ByZXNlbnQoZGVjb3JhdG9yKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbm5vdGF0aW9ucyA9IFtdO1xuICAgICAgfVxuICAgICAgdGhpcy5hbm5vdGF0aW9uQ2FjaGUuc2V0KHR5cGUsIGFubm90YXRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIGFubm90YXRpb25zO1xuICB9XG5cbiAgcHVibGljIHByb3BNZXRhZGF0YSh0eXBlOiBTdGF0aWNUeXBlKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgIGxldCBwcm9wTWV0YWRhdGEgPSB0aGlzLnByb3BlcnR5Q2FjaGUuZ2V0KHR5cGUpO1xuICAgIGlmICghaXNQcmVzZW50KHByb3BNZXRhZGF0YSkpIHtcbiAgICAgIGxldCBjbGFzc01ldGFkYXRhID0gdGhpcy5nZXRUeXBlTWV0YWRhdGEodHlwZSk7XG4gICAgICBwcm9wTWV0YWRhdGEgPSB0aGlzLmdldFByb3BlcnR5TWV0YWRhdGEodHlwZS5tb2R1bGVJZCwgY2xhc3NNZXRhZGF0YVsnbWVtYmVycyddKTtcbiAgICAgIGlmICghaXNQcmVzZW50KHByb3BNZXRhZGF0YSkpIHtcbiAgICAgICAgcHJvcE1ldGFkYXRhID0ge307XG4gICAgICB9XG4gICAgICB0aGlzLnByb3BlcnR5Q2FjaGUuc2V0KHR5cGUsIHByb3BNZXRhZGF0YSk7XG4gICAgfVxuICAgIHJldHVybiBwcm9wTWV0YWRhdGE7XG4gIH1cblxuICBwdWJsaWMgcGFyYW1ldGVycyh0eXBlOiBTdGF0aWNUeXBlKTogYW55W10ge1xuICAgIGxldCBwYXJhbWV0ZXJzID0gdGhpcy5wYXJhbWV0ZXJDYWNoZS5nZXQodHlwZSk7XG4gICAgaWYgKCFpc1ByZXNlbnQocGFyYW1ldGVycykpIHtcbiAgICAgIGxldCBjbGFzc01ldGFkYXRhID0gdGhpcy5nZXRUeXBlTWV0YWRhdGEodHlwZSk7XG4gICAgICBpZiAoaXNQcmVzZW50KGNsYXNzTWV0YWRhdGEpKSB7XG4gICAgICAgIGxldCBtZW1iZXJzID0gY2xhc3NNZXRhZGF0YVsnbWVtYmVycyddO1xuICAgICAgICBpZiAoaXNQcmVzZW50KG1lbWJlcnMpKSB7XG4gICAgICAgICAgbGV0IGN0b3JEYXRhID0gbWVtYmVyc1snX19jdG9yX18nXTtcbiAgICAgICAgICBpZiAoaXNQcmVzZW50KGN0b3JEYXRhKSkge1xuICAgICAgICAgICAgbGV0IGN0b3IgPSAoPGFueVtdPmN0b3JEYXRhKS5maW5kKGEgPT4gYVsnX19zeW1ib2xpYyddID09PSAnY29uc3RydWN0b3InKTtcbiAgICAgICAgICAgIHBhcmFtZXRlcnMgPSB0aGlzLnNpbXBsaWZ5KHR5cGUubW9kdWxlSWQsIGN0b3JbJ3BhcmFtZXRlcnMnXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIWlzUHJlc2VudChwYXJhbWV0ZXJzKSkge1xuICAgICAgICBwYXJhbWV0ZXJzID0gW107XG4gICAgICB9XG4gICAgICB0aGlzLnBhcmFtZXRlckNhY2hlLnNldCh0eXBlLCBwYXJhbWV0ZXJzKTtcbiAgICB9XG4gICAgcmV0dXJuIHBhcmFtZXRlcnM7XG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnNpb25NYXAgPSBuZXcgTWFwPFN0YXRpY1R5cGUsIChtb2R1bGVDb250ZXh0OiBzdHJpbmcsIGV4cHJlc3Npb246IGFueSkgPT4gYW55PigpO1xuICBwcml2YXRlIGluaXRpYWxpemVDb252ZXJzaW9uTWFwKCk6IGFueSB7XG4gICAgbGV0IGNvcmVfbWV0YWRhdGEgPSB0aGlzLmhvc3QucmVzb2x2ZU1vZHVsZSgnYW5ndWxhcjIvc3JjL2NvcmUvbWV0YWRhdGEnKTtcbiAgICBsZXQgY29udmVyc2lvbk1hcCA9IHRoaXMuY29udmVyc2lvbk1hcDtcbiAgICBjb252ZXJzaW9uTWFwLnNldCh0aGlzLmdldFN0YXRpY1R5cGUoY29yZV9tZXRhZGF0YSwgJ0RpcmVjdGl2ZScpLFxuICAgICAgICAgICAgICAgICAgICAgIChtb2R1bGVDb250ZXh0LCBleHByZXNzaW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcDAgPSB0aGlzLmdldERlY29yYXRvclBhcmFtZXRlcihtb2R1bGVDb250ZXh0LCBleHByZXNzaW9uLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNQcmVzZW50KHAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBwMCA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEaXJlY3RpdmVNZXRhZGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBwMFsnc2VsZWN0b3InXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRzOiBwMFsnaW5wdXRzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dHM6IHAwWydvdXRwdXRzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50czogcDBbJ2V2ZW50cyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBob3N0OiBwMFsnaG9zdCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kaW5nczogcDBbJ2JpbmRpbmdzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyczogcDBbJ3Byb3ZpZGVycyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBleHBvcnRBczogcDBbJ2V4cG9ydEFzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJpZXM6IHAwWydxdWVyaWVzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICBjb252ZXJzaW9uTWFwLnNldCh0aGlzLmdldFN0YXRpY1R5cGUoY29yZV9tZXRhZGF0YSwgJ0NvbXBvbmVudCcpLFxuICAgICAgICAgICAgICAgICAgICAgIChtb2R1bGVDb250ZXh0LCBleHByZXNzaW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcDAgPSB0aGlzLmdldERlY29yYXRvclBhcmFtZXRlcihtb2R1bGVDb250ZXh0LCBleHByZXNzaW9uLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNQcmVzZW50KHAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBwMCA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb21wb25lbnRNZXRhZGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBwMFsnc2VsZWN0b3InXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRzOiBwMFsnaW5wdXRzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dHM6IHAwWydvdXRwdXRzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHAwWydwcm9wZXJ0aWVzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50czogcDBbJ2V2ZW50cyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBob3N0OiBwMFsnaG9zdCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBleHBvcnRBczogcDBbJ2V4cG9ydEFzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZUlkOiBwMFsnbW9kdWxlSWQnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZGluZ3M6IHAwWydiaW5kaW5ncyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlcnM6IHAwWydwcm92aWRlcnMnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmlld0JpbmRpbmdzOiBwMFsndmlld0JpbmRpbmdzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdQcm92aWRlcnM6IHAwWyd2aWV3UHJvdmlkZXJzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZURldGVjdGlvbjogcDBbJ2NoYW5nZURldGVjdGlvbiddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVyaWVzOiBwMFsncXVlcmllcyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogcDBbJ3RlbXBsYXRlVXJsJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBwMFsndGVtcGxhdGUnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVVcmxzOiBwMFsnc3R5bGVVcmxzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlczogcDBbJ3N0eWxlcyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBwMFsnZGlyZWN0aXZlcyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwaXBlczogcDBbJ3BpcGVzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGVuY2Fwc3VsYXRpb246IHAwWydlbmNhcHN1bGF0aW9uJ11cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgIGNvbnZlcnNpb25NYXAuc2V0KHRoaXMuZ2V0U3RhdGljVHlwZShjb3JlX21ldGFkYXRhLCAnSW5wdXQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAobW9kdWxlQ29udGV4dCwgZXhwcmVzc2lvbikgPT4gbmV3IElucHV0TWV0YWRhdGEoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGVjb3JhdG9yUGFyYW1ldGVyKG1vZHVsZUNvbnRleHQsIGV4cHJlc3Npb24sIDApKSk7XG4gICAgY29udmVyc2lvbk1hcC5zZXQodGhpcy5nZXRTdGF0aWNUeXBlKGNvcmVfbWV0YWRhdGEsICdPdXRwdXQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAobW9kdWxlQ29udGV4dCwgZXhwcmVzc2lvbikgPT4gbmV3IE91dHB1dE1ldGFkYXRhKFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldERlY29yYXRvclBhcmFtZXRlcihtb2R1bGVDb250ZXh0LCBleHByZXNzaW9uLCAwKSkpO1xuICAgIGNvbnZlcnNpb25NYXAuc2V0KHRoaXMuZ2V0U3RhdGljVHlwZShjb3JlX21ldGFkYXRhLCAnVmlldycpLCAobW9kdWxlQ29udGV4dCwgZXhwcmVzc2lvbikgPT4ge1xuICAgICAgbGV0IHAwID0gdGhpcy5nZXREZWNvcmF0b3JQYXJhbWV0ZXIobW9kdWxlQ29udGV4dCwgZXhwcmVzc2lvbiwgMCk7XG4gICAgICBpZiAoIWlzUHJlc2VudChwMCkpIHtcbiAgICAgICAgcDAgPSB7fTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgVmlld01ldGFkYXRhKHtcbiAgICAgICAgdGVtcGxhdGVVcmw6IHAwWyd0ZW1wbGF0ZVVybCddLFxuICAgICAgICB0ZW1wbGF0ZTogcDBbJ3RlbXBsYXRlJ10sXG4gICAgICAgIGRpcmVjdGl2ZXM6IHAwWydkaXJlY3RpdmVzJ10sXG4gICAgICAgIHBpcGVzOiBwMFsncGlwZXMnXSxcbiAgICAgICAgZW5jYXBzdWxhdGlvbjogcDBbJ2VuY2Fwc3VsYXRpb24nXSxcbiAgICAgICAgc3R5bGVzOiBwMFsnc3R5bGVzJ10sXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBjb252ZXJzaW9uTWFwLnNldCh0aGlzLmdldFN0YXRpY1R5cGUoY29yZV9tZXRhZGF0YSwgJ0F0dHJpYnV0ZScpLFxuICAgICAgICAgICAgICAgICAgICAgIChtb2R1bGVDb250ZXh0LCBleHByZXNzaW9uKSA9PiBuZXcgQXR0cmlidXRlTWV0YWRhdGEoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGVjb3JhdG9yUGFyYW1ldGVyKG1vZHVsZUNvbnRleHQsIGV4cHJlc3Npb24sIDApKSk7XG4gICAgY29udmVyc2lvbk1hcC5zZXQodGhpcy5nZXRTdGF0aWNUeXBlKGNvcmVfbWV0YWRhdGEsICdRdWVyeScpLCAobW9kdWxlQ29udGV4dCwgZXhwcmVzc2lvbikgPT4ge1xuICAgICAgbGV0IHAwID0gdGhpcy5nZXREZWNvcmF0b3JQYXJhbWV0ZXIobW9kdWxlQ29udGV4dCwgZXhwcmVzc2lvbiwgMCk7XG4gICAgICBsZXQgcDEgPSB0aGlzLmdldERlY29yYXRvclBhcmFtZXRlcihtb2R1bGVDb250ZXh0LCBleHByZXNzaW9uLCAxKTtcbiAgICAgIGlmICghaXNQcmVzZW50KHAxKSkge1xuICAgICAgICBwMSA9IHt9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBRdWVyeU1ldGFkYXRhKHAwLCB7ZGVzY2VuZGFudHM6IHAxLmRlc2NlbmRhbnRzLCBmaXJzdDogcDEuZmlyc3R9KTtcbiAgICB9KTtcbiAgICBjb252ZXJzaW9uTWFwLnNldCh0aGlzLmdldFN0YXRpY1R5cGUoY29yZV9tZXRhZGF0YSwgJ0NvbnRlbnRDaGlsZHJlbicpLFxuICAgICAgICAgICAgICAgICAgICAgIChtb2R1bGVDb250ZXh0LCBleHByZXNzaW9uKSA9PiBuZXcgQ29udGVudENoaWxkcmVuTWV0YWRhdGEoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGVjb3JhdG9yUGFyYW1ldGVyKG1vZHVsZUNvbnRleHQsIGV4cHJlc3Npb24sIDApKSk7XG4gICAgY29udmVyc2lvbk1hcC5zZXQodGhpcy5nZXRTdGF0aWNUeXBlKGNvcmVfbWV0YWRhdGEsICdDb250ZW50Q2hpbGQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAobW9kdWxlQ29udGV4dCwgZXhwcmVzc2lvbikgPT4gbmV3IENvbnRlbnRDaGlsZE1ldGFkYXRhKFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldERlY29yYXRvclBhcmFtZXRlcihtb2R1bGVDb250ZXh0LCBleHByZXNzaW9uLCAwKSkpO1xuICAgIGNvbnZlcnNpb25NYXAuc2V0KHRoaXMuZ2V0U3RhdGljVHlwZShjb3JlX21ldGFkYXRhLCAnVmlld0NoaWxkcmVuJyksXG4gICAgICAgICAgICAgICAgICAgICAgKG1vZHVsZUNvbnRleHQsIGV4cHJlc3Npb24pID0+IG5ldyBWaWV3Q2hpbGRyZW5NZXRhZGF0YShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXREZWNvcmF0b3JQYXJhbWV0ZXIobW9kdWxlQ29udGV4dCwgZXhwcmVzc2lvbiwgMCkpKTtcbiAgICBjb252ZXJzaW9uTWFwLnNldCh0aGlzLmdldFN0YXRpY1R5cGUoY29yZV9tZXRhZGF0YSwgJ1ZpZXdDaGlsZCcpLFxuICAgICAgICAgICAgICAgICAgICAgIChtb2R1bGVDb250ZXh0LCBleHByZXNzaW9uKSA9PiBuZXcgVmlld0NoaWxkTWV0YWRhdGEoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGVjb3JhdG9yUGFyYW1ldGVyKG1vZHVsZUNvbnRleHQsIGV4cHJlc3Npb24sIDApKSk7XG4gICAgY29udmVyc2lvbk1hcC5zZXQodGhpcy5nZXRTdGF0aWNUeXBlKGNvcmVfbWV0YWRhdGEsICdWaWV3UXVlcnknKSxcbiAgICAgICAgICAgICAgICAgICAgICAobW9kdWxlQ29udGV4dCwgZXhwcmVzc2lvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHAwID0gdGhpcy5nZXREZWNvcmF0b3JQYXJhbWV0ZXIobW9kdWxlQ29udGV4dCwgZXhwcmVzc2lvbiwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcDEgPSB0aGlzLmdldERlY29yYXRvclBhcmFtZXRlcihtb2R1bGVDb250ZXh0LCBleHByZXNzaW9uLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNQcmVzZW50KHAxKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBwMSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBWaWV3UXVlcnlNZXRhZGF0YShwMCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjZW5kYW50czogcDFbJ2Rlc2NlbmRhbnRzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0OiBwMVsnZmlyc3QnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgIGNvbnZlcnNpb25NYXAuc2V0KHRoaXMuZ2V0U3RhdGljVHlwZShjb3JlX21ldGFkYXRhLCAnUGlwZScpLCAobW9kdWxlQ29udGV4dCwgZXhwcmVzc2lvbikgPT4ge1xuICAgICAgbGV0IHAwID0gdGhpcy5nZXREZWNvcmF0b3JQYXJhbWV0ZXIobW9kdWxlQ29udGV4dCwgZXhwcmVzc2lvbiwgMCk7XG4gICAgICBpZiAoIWlzUHJlc2VudChwMCkpIHtcbiAgICAgICAgcDAgPSB7fTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgUGlwZU1ldGFkYXRhKHtcbiAgICAgICAgbmFtZTogcDBbJ25hbWUnXSxcbiAgICAgICAgcHVyZTogcDBbJ3B1cmUnXSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGNvbnZlcnNpb25NYXAuc2V0KHRoaXMuZ2V0U3RhdGljVHlwZShjb3JlX21ldGFkYXRhLCAnSG9zdEJpbmRpbmcnKSxcbiAgICAgICAgICAgICAgICAgICAgICAobW9kdWxlQ29udGV4dCwgZXhwcmVzc2lvbikgPT4gbmV3IEhvc3RCaW5kaW5nTWV0YWRhdGEoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGVjb3JhdG9yUGFyYW1ldGVyKG1vZHVsZUNvbnRleHQsIGV4cHJlc3Npb24sIDApKSk7XG4gICAgY29udmVyc2lvbk1hcC5zZXQodGhpcy5nZXRTdGF0aWNUeXBlKGNvcmVfbWV0YWRhdGEsICdIb3N0TGlzdGVuZXInKSxcbiAgICAgICAgICAgICAgICAgICAgICAobW9kdWxlQ29udGV4dCwgZXhwcmVzc2lvbikgPT4gbmV3IEhvc3RMaXN0ZW5lck1ldGFkYXRhKFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldERlY29yYXRvclBhcmFtZXRlcihtb2R1bGVDb250ZXh0LCBleHByZXNzaW9uLCAwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXREZWNvcmF0b3JQYXJhbWV0ZXIobW9kdWxlQ29udGV4dCwgZXhwcmVzc2lvbiwgMSkpKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgY29udmVydEtub3duRGVjb3JhdG9yKG1vZHVsZUNvbnRleHQ6IHN0cmluZywgZXhwcmVzc2lvbjoge1trZXk6IHN0cmluZ106IGFueX0pOiBhbnkge1xuICAgIGxldCBjb252ZXJ0ZXIgPSB0aGlzLmNvbnZlcnNpb25NYXAuZ2V0KHRoaXMuZ2V0RGVjb3JhdG9yVHlwZShtb2R1bGVDb250ZXh0LCBleHByZXNzaW9uKSk7XG4gICAgaWYgKGlzUHJlc2VudChjb252ZXJ0ZXIpKSByZXR1cm4gY29udmVydGVyKG1vZHVsZUNvbnRleHQsIGV4cHJlc3Npb24pO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXREZWNvcmF0b3JUeXBlKG1vZHVsZUNvbnRleHQ6IHN0cmluZywgZXhwcmVzc2lvbjoge1trZXk6IHN0cmluZ106IGFueX0pOiBTdGF0aWNUeXBlIHtcbiAgICBpZiAoaXNNZXRhZGF0YVN5bWJvbGljQ2FsbEV4cHJlc3Npb24oZXhwcmVzc2lvbikpIHtcbiAgICAgIGxldCB0YXJnZXQgPSBleHByZXNzaW9uWydleHByZXNzaW9uJ107XG4gICAgICBpZiAoaXNNZXRhZGF0YVN5bWJvbGljUmVmZXJlbmNlRXhwcmVzc2lvbih0YXJnZXQpKSB7XG4gICAgICAgIGxldCBtb2R1bGVJZCA9IHRoaXMuaG9zdC5yZXNvbHZlTW9kdWxlKHRhcmdldFsnbW9kdWxlJ10sIG1vZHVsZUNvbnRleHQpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTdGF0aWNUeXBlKG1vZHVsZUlkLCB0YXJnZXRbJ25hbWUnXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXREZWNvcmF0b3JQYXJhbWV0ZXIobW9kdWxlQ29udGV4dDogc3RyaW5nLCBleHByZXNzaW9uOiB7W2tleTogc3RyaW5nXTogYW55fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IG51bWJlcik6IGFueSB7XG4gICAgaWYgKGlzTWV0YWRhdGFTeW1ib2xpY0NhbGxFeHByZXNzaW9uKGV4cHJlc3Npb24pICYmIGlzUHJlc2VudChleHByZXNzaW9uWydhcmd1bWVudHMnXSkgJiZcbiAgICAgICAgKDxhbnlbXT5leHByZXNzaW9uWydhcmd1bWVudHMnXSkubGVuZ3RoIDw9IGluZGV4ICsgMSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2ltcGxpZnkobW9kdWxlQ29udGV4dCwgKDxhbnlbXT5leHByZXNzaW9uWydhcmd1bWVudHMnXSlbaW5kZXhdKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGdldFByb3BlcnR5TWV0YWRhdGEobW9kdWxlQ29udGV4dDogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHtba2V5OiBzdHJpbmddOiBhbnl9KToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgIGlmIChpc1ByZXNlbnQodmFsdWUpKSB7XG4gICAgICBsZXQgcmVzdWx0ID0ge307XG4gICAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2godmFsdWUsICh2YWx1ZSwgbmFtZSkgPT4ge1xuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZ2V0TWVtYmVyRGF0YShtb2R1bGVDb250ZXh0LCB2YWx1ZSk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoZGF0YSkpIHtcbiAgICAgICAgICBsZXQgcHJvcGVydHlEYXRhID0gZGF0YS5maWx0ZXIoZCA9PiBkWydraW5kJ10gPT0gXCJwcm9wZXJ0eVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChkID0+IGRbJ2RpcmVjdGl2ZXMnXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZWR1Y2UoKHAsIGMpID0+ICg8YW55W10+cCkuY29uY2F0KDxhbnlbXT5jKSwgW10pO1xuICAgICAgICAgIGlmIChwcm9wZXJ0eURhdGEubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICAgIFN0cmluZ01hcFdyYXBwZXIuc2V0KHJlc3VsdCwgbmFtZSwgcHJvcGVydHlEYXRhKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLy8gY2xhbmctZm9ybWF0IG9mZlxuICBwcml2YXRlIGdldE1lbWJlckRhdGEobW9kdWxlQ29udGV4dDogc3RyaW5nLCBtZW1iZXI6IHsgW2tleTogc3RyaW5nXTogYW55IH1bXSk6IHsgW2tleTogc3RyaW5nXTogYW55IH1bXSB7XG4gICAgLy8gY2xhbmctZm9ybWF0IG9uXG4gICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgIGlmIChpc1ByZXNlbnQobWVtYmVyKSkge1xuICAgICAgZm9yIChsZXQgaXRlbSBvZiBtZW1iZXIpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgIGtpbmQ6IGl0ZW1bJ19fc3ltYm9saWMnXSxcbiAgICAgICAgICBkaXJlY3RpdmVzOlxuICAgICAgICAgICAgICBpc1ByZXNlbnQoaXRlbVsnZGVjb3JhdG9ycyddKSA/XG4gICAgICAgICAgICAgICAgICAoPGFueVtdPml0ZW1bJ2RlY29yYXRvcnMnXSlcbiAgICAgICAgICAgICAgICAgICAgICAubWFwKGRlY29yYXRvciA9PiB0aGlzLmNvbnZlcnRLbm93bkRlY29yYXRvcihtb2R1bGVDb250ZXh0LCBkZWNvcmF0b3IpKVxuICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoZCA9PiBpc1ByZXNlbnQoZCkpIDpcbiAgICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIHB1YmxpYyBzaW1wbGlmeShtb2R1bGVDb250ZXh0OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBhbnkge1xuICAgIGxldCBfdGhpcyA9IHRoaXM7XG5cbiAgICBmdW5jdGlvbiBzaW1wbGlmeShleHByZXNzaW9uOiBhbnkpOiBhbnkge1xuICAgICAgaWYgKGlzUHJpbWl0aXZlKGV4cHJlc3Npb24pKSB7XG4gICAgICAgIHJldHVybiBleHByZXNzaW9uO1xuICAgICAgfVxuICAgICAgaWYgKGlzQXJyYXkoZXhwcmVzc2lvbikpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpdGVtIG9mKDxhbnk+ZXhwcmVzc2lvbikpIHtcbiAgICAgICAgICByZXN1bHQucHVzaChzaW1wbGlmeShpdGVtKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIGlmIChpc1ByZXNlbnQoZXhwcmVzc2lvbikpIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudChleHByZXNzaW9uWydfX3N5bWJvbGljJ10pKSB7XG4gICAgICAgICAgc3dpdGNoIChleHByZXNzaW9uWydfX3N5bWJvbGljJ10pIHtcbiAgICAgICAgICAgIGNhc2UgXCJiaW5vcFwiOlxuICAgICAgICAgICAgICBsZXQgbGVmdCA9IHNpbXBsaWZ5KGV4cHJlc3Npb25bJ2xlZnQnXSk7XG4gICAgICAgICAgICAgIGxldCByaWdodCA9IHNpbXBsaWZ5KGV4cHJlc3Npb25bJ3JpZ2h0J10pO1xuICAgICAgICAgICAgICBzd2l0Y2ggKGV4cHJlc3Npb25bJ29wZXJhdG9yJ10pIHtcbiAgICAgICAgICAgICAgICBjYXNlICcmJic6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbGVmdCAmJiByaWdodDtcbiAgICAgICAgICAgICAgICBjYXNlICd8fCc6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbGVmdCB8fCByaWdodDtcbiAgICAgICAgICAgICAgICBjYXNlICd8JzpcbiAgICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0IHwgcmlnaHQ7XG4gICAgICAgICAgICAgICAgY2FzZSAnXic6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbGVmdCBeIHJpZ2h0O1xuICAgICAgICAgICAgICAgIGNhc2UgJyYnOlxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGxlZnQgJiByaWdodDtcbiAgICAgICAgICAgICAgICBjYXNlICc9PSc6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbGVmdCA9PSByaWdodDtcbiAgICAgICAgICAgICAgICBjYXNlICchPSc6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbGVmdCAhPSByaWdodDtcbiAgICAgICAgICAgICAgICBjYXNlICc9PT0nOlxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGxlZnQgPT09IHJpZ2h0O1xuICAgICAgICAgICAgICAgIGNhc2UgJyE9PSc6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbGVmdCAhPT0gcmlnaHQ7XG4gICAgICAgICAgICAgICAgY2FzZSAnPCc6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbGVmdCA8IHJpZ2h0O1xuICAgICAgICAgICAgICAgIGNhc2UgJz4nOlxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGxlZnQgPiByaWdodDtcbiAgICAgICAgICAgICAgICBjYXNlICc8PSc6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbGVmdCA8PSByaWdodDtcbiAgICAgICAgICAgICAgICBjYXNlICc+PSc6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbGVmdCA+PSByaWdodDtcbiAgICAgICAgICAgICAgICBjYXNlICc8PCc6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbGVmdCA8PCByaWdodDtcbiAgICAgICAgICAgICAgICBjYXNlICc+Pic6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbGVmdCA+PiByaWdodDtcbiAgICAgICAgICAgICAgICBjYXNlICcrJzpcbiAgICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0ICsgcmlnaHQ7XG4gICAgICAgICAgICAgICAgY2FzZSAnLSc6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbGVmdCAtIHJpZ2h0O1xuICAgICAgICAgICAgICAgIGNhc2UgJyonOlxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGxlZnQgKiByaWdodDtcbiAgICAgICAgICAgICAgICBjYXNlICcvJzpcbiAgICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0IC8gcmlnaHQ7XG4gICAgICAgICAgICAgICAgY2FzZSAnJSc6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbGVmdCAlIHJpZ2h0O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgY2FzZSBcInByZVwiOlxuICAgICAgICAgICAgICBsZXQgb3BlcmFuZCA9IHNpbXBsaWZ5KGV4cHJlc3Npb25bJ29wZXJhbmQnXSk7XG4gICAgICAgICAgICAgIHN3aXRjaCAoZXhwcmVzc2lvblsnb3BlcmF0b3InXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJysnOlxuICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wZXJhbmQ7XG4gICAgICAgICAgICAgICAgY2FzZSAnLSc6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gLW9wZXJhbmQ7XG4gICAgICAgICAgICAgICAgY2FzZSAnISc6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gIW9wZXJhbmQ7XG4gICAgICAgICAgICAgICAgY2FzZSAnfic6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gfm9wZXJhbmQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBjYXNlIFwiaW5kZXhcIjpcbiAgICAgICAgICAgICAgbGV0IGluZGV4VGFyZ2V0ID0gc2ltcGxpZnkoZXhwcmVzc2lvblsnZXhwcmVzc2lvbiddKTtcbiAgICAgICAgICAgICAgbGV0IGluZGV4ID0gc2ltcGxpZnkoZXhwcmVzc2lvblsnaW5kZXgnXSk7XG4gICAgICAgICAgICAgIGlmIChpc1ByZXNlbnQoaW5kZXhUYXJnZXQpICYmIGlzUHJpbWl0aXZlKGluZGV4KSkgcmV0dXJuIGluZGV4VGFyZ2V0W2luZGV4XTtcbiAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBjYXNlIFwic2VsZWN0XCI6XG4gICAgICAgICAgICAgIGxldCBzZWxlY3RUYXJnZXQgPSBzaW1wbGlmeShleHByZXNzaW9uWydleHByZXNzaW9uJ10pO1xuICAgICAgICAgICAgICBsZXQgbWVtYmVyID0gc2ltcGxpZnkoZXhwcmVzc2lvblsnbWVtYmVyJ10pO1xuICAgICAgICAgICAgICBpZiAoaXNQcmVzZW50KHNlbGVjdFRhcmdldCkgJiYgaXNQcmltaXRpdmUobWVtYmVyKSkgcmV0dXJuIHNlbGVjdFRhcmdldFttZW1iZXJdO1xuICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIGNhc2UgXCJyZWZlcmVuY2VcIjpcbiAgICAgICAgICAgICAgbGV0IHJlZmVyZW5jZU1vZHVsZU5hbWUgPVxuICAgICAgICAgICAgICAgICAgX3RoaXMuaG9zdC5yZXNvbHZlTW9kdWxlKGV4cHJlc3Npb25bJ21vZHVsZSddLCBtb2R1bGVDb250ZXh0KTtcbiAgICAgICAgICAgICAgbGV0IHJlZmVyZW5jZU1vZHVsZSA9IF90aGlzLmdldE1vZHVsZU1ldGFkYXRhKHJlZmVyZW5jZU1vZHVsZU5hbWUpO1xuICAgICAgICAgICAgICBsZXQgcmVmZXJlbmNlVmFsdWUgPSByZWZlcmVuY2VNb2R1bGVbJ21ldGFkYXRhJ11bZXhwcmVzc2lvblsnbmFtZSddXTtcbiAgICAgICAgICAgICAgaWYgKGlzQ2xhc3NNZXRhZGF0YShyZWZlcmVuY2VWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAvLyBDb252ZXJ0IHRvIGEgcHNldWRvIHR5cGVcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuZ2V0U3RhdGljVHlwZShyZWZlcmVuY2VNb2R1bGVOYW1lLCBleHByZXNzaW9uWyduYW1lJ10pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBfdGhpcy5zaW1wbGlmeShyZWZlcmVuY2VNb2R1bGVOYW1lLCByZWZlcmVuY2VWYWx1ZSk7XG4gICAgICAgICAgICBjYXNlIFwiY2FsbFwiOlxuICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc3VsdCA9IHt9O1xuICAgICAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2goZXhwcmVzc2lvbiwgKHZhbHVlLCBuYW1lKSA9PiB7IHJlc3VsdFtuYW1lXSA9IHNpbXBsaWZ5KHZhbHVlKTsgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gc2ltcGxpZnkodmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBtb2R1bGUgYW4gYWJzb2x1dGUgcGF0aCB0byBhIG1vZHVsZSBmaWxlLlxuICAgKi9cbiAgcHVibGljIGdldE1vZHVsZU1ldGFkYXRhKG1vZHVsZTogc3RyaW5nKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgIGxldCBtb2R1bGVNZXRhZGF0YSA9IHRoaXMubWV0YWRhdGFDYWNoZS5nZXQobW9kdWxlKTtcbiAgICBpZiAoIWlzUHJlc2VudChtb2R1bGVNZXRhZGF0YSkpIHtcbiAgICAgIG1vZHVsZU1ldGFkYXRhID0gdGhpcy5ob3N0LmdldE1ldGFkYXRhRm9yKG1vZHVsZSk7XG4gICAgICBpZiAoIWlzUHJlc2VudChtb2R1bGVNZXRhZGF0YSkpIHtcbiAgICAgICAgbW9kdWxlTWV0YWRhdGEgPSB7X19zeW1ib2xpYzogXCJtb2R1bGVcIiwgbW9kdWxlOiBtb2R1bGUsIG1ldGFkYXRhOiB7fX07XG4gICAgICB9XG4gICAgICB0aGlzLm1ldGFkYXRhQ2FjaGUuc2V0KG1vZHVsZSwgbW9kdWxlTWV0YWRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gbW9kdWxlTWV0YWRhdGE7XG4gIH1cblxuICBwcml2YXRlIGdldFR5cGVNZXRhZGF0YSh0eXBlOiBTdGF0aWNUeXBlKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgIGxldCBtb2R1bGVNZXRhZGF0YSA9IHRoaXMuZ2V0TW9kdWxlTWV0YWRhdGEodHlwZS5tb2R1bGVJZCk7XG4gICAgbGV0IHJlc3VsdCA9IG1vZHVsZU1ldGFkYXRhWydtZXRhZGF0YSddW3R5cGUubmFtZV07XG4gICAgaWYgKCFpc1ByZXNlbnQocmVzdWx0KSkge1xuICAgICAgcmVzdWx0ID0ge19fc3ltYm9saWM6IFwiY2xhc3NcIn07XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNNZXRhZGF0YVN5bWJvbGljQ2FsbEV4cHJlc3Npb24oZXhwcmVzc2lvbjogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiAhaXNQcmltaXRpdmUoZXhwcmVzc2lvbikgJiYgIWlzQXJyYXkoZXhwcmVzc2lvbikgJiYgZXhwcmVzc2lvblsnX19zeW1ib2xpYyddID09ICdjYWxsJztcbn1cblxuZnVuY3Rpb24gaXNNZXRhZGF0YVN5bWJvbGljUmVmZXJlbmNlRXhwcmVzc2lvbihleHByZXNzaW9uOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuICFpc1ByaW1pdGl2ZShleHByZXNzaW9uKSAmJiAhaXNBcnJheShleHByZXNzaW9uKSAmJlxuICAgICAgICAgZXhwcmVzc2lvblsnX19zeW1ib2xpYyddID09ICdyZWZlcmVuY2UnO1xufVxuXG5mdW5jdGlvbiBpc0NsYXNzTWV0YWRhdGEoZXhwcmVzc2lvbjogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiAhaXNQcmltaXRpdmUoZXhwcmVzc2lvbikgJiYgIWlzQXJyYXkoZXhwcmVzc2lvbikgJiYgZXhwcmVzc2lvblsnX19zeW1ib2xpYyddID09ICdjbGFzcyc7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
