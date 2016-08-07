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
    function splitPath(path) {
        return path.split(/\/|\\/g);
    }
    function resolvePath(pathParts) {
        var result = [];
        collection_1.ListWrapper.forEachWithIndex(pathParts, function (part, index) {
            switch (part) {
                case '':
                case '.':
                    if (index > 0)
                        return;
                    break;
                case '..':
                    if (index > 0 && result.length != 0)
                        result.pop();
                    return;
            }
            result.push(part);
        });
        return result.join('/');
    }
    function pathTo(from, to) {
        var result = to;
        if (to.startsWith('.')) {
            var fromParts = splitPath(from);
            fromParts.pop(); // remove the file name.
            var toParts = splitPath(to);
            result = resolvePath(fromParts.concat(toParts));
        }
        return result;
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
                /**
                 * getStatictype produces a Type whose metadata is known but whose implementation is not loaded.
                 * All types passed to the StaticResolver should be pseudo-types returned by this method.
                 *
                 * @param moduleId the module identifier as would be passed to an import statement.
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
                        this.annotationCache.set(type, annotations);
                    }
                    return annotations;
                };
                StaticReflector.prototype.propMetadata = function (type) {
                    var propMetadata = this.propertyCache.get(type);
                    if (!lang_1.isPresent(propMetadata)) {
                        var classMetadata = this.getTypeMetadata(type);
                        propMetadata = this.getPropertyMetadata(type.moduleId, classMetadata['members']);
                        this.propertyCache.set(type, propMetadata);
                    }
                    return propMetadata;
                };
                StaticReflector.prototype.parameters = function (type) {
                    var parameters = this.parameterCache.get(type);
                    if (!lang_1.isPresent(parameters)) {
                        var classMetadata = this.getTypeMetadata(type);
                        var ctorData = classMetadata['members']['__ctor__'];
                        if (lang_1.isPresent(ctorData)) {
                            var ctor = ctorData.find(function (a) { return a['__symbolic'] === 'constructor'; });
                            parameters = this.simplify(type.moduleId, ctor['parameters']);
                            this.parameterCache.set(type, parameters);
                        }
                    }
                    return parameters;
                };
                StaticReflector.prototype.initializeConversionMap = function () {
                    var _this = this;
                    var core_metadata = 'angular2/src/core/metadata';
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
                            var moduleId = this.normalizeModuleName(moduleContext, target['module']);
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
                    return null;
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
                                        var referenceModuleName = _this.normalizeModuleName(moduleContext, expression['module']);
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
                StaticReflector.prototype.normalizeModuleName = function (from, to) {
                    if (to.startsWith('.')) {
                        return pathTo(from, to);
                    }
                    return to;
                };
                return StaticReflector;
            }());
            exports_1("StaticReflector", StaticReflector);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL3N0YXRpY19yZWZsZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7SUF1Y0EsMENBQTBDLFVBQWU7UUFDdkQsTUFBTSxDQUFDLENBQUMsa0JBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksTUFBTSxDQUFDO0lBQ2hHLENBQUM7SUFFRCwrQ0FBK0MsVUFBZTtRQUM1RCxNQUFNLENBQUMsQ0FBQyxrQkFBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBTyxDQUFDLFVBQVUsQ0FBQztZQUNoRCxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksV0FBVyxDQUFDO0lBQ2pELENBQUM7SUFFRCx5QkFBeUIsVUFBZTtRQUN0QyxNQUFNLENBQUMsQ0FBQyxrQkFBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxPQUFPLENBQUM7SUFDakcsQ0FBQztJQUVELG1CQUFtQixJQUFZO1FBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxxQkFBcUIsU0FBbUI7UUFDdEMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLHdCQUFXLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQUMsSUFBSSxFQUFFLEtBQUs7WUFDbEQsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDYixLQUFLLEVBQUUsQ0FBQztnQkFDUixLQUFLLEdBQUc7b0JBQ04sRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQzt3QkFBQyxNQUFNLENBQUM7b0JBQ3RCLEtBQUssQ0FBQztnQkFDUixLQUFLLElBQUk7b0JB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TSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7NENBQ3RCLEtBQUssR0FBRztnREFDTixNQUFNLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQzs0Q0FDdEIsS0FBSyxHQUFHO2dEQUNOLE1BQU0sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDOzRDQUN0QixLQUFLLElBQUk7Z0RBQ1AsTUFBTSxDQUFDLElBQUksSUFBSSxLQUFLLENBQUM7NENBQ3ZCLEtBQUssSUFBSTtnREFDUCxNQUFNLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQzs0Q0FDdkIsS0FBSyxLQUFLO2dEQUNSLE1BQU0sQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDOzRDQUN4QixLQUFLLEtBQUs7Z0RBQ1IsTUFBTSxDQUFDLElBQUksS0FBSyxLQUFLLENBQUM7NENBQ3hCLEtBQUssR0FBRztnREFDTixNQUFNLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQzs0Q0FDdEIsS0FBSyxHQUFHO2dEQUNOLE1BQU0sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDOzRDQUN0QixLQUFLLElBQUk7Z0RBQ1AsTUFBTSxDQUFDLElBQUksSUFBSSxLQUFLLENBQUM7NENBQ3ZCLEtBQUssSUFBSTtnREFDUCxNQUFNLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQzs0Q0FDdkIsS0FBSyxJQUFJO2dEQUNQLE1BQU0sQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDOzRDQUN2QixLQUFLLElBQUk7Z0RBQ1AsTUFBTSxDQUFDLElBQUksSUFBSSxLQUFLLENBQUM7NENBQ3ZCLEtBQUssR0FBRztnREFDTixNQUFNLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQzs0Q0FDdEIsS0FBSyxHQUFHO2dEQUNOLE1BQU0sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDOzRDQUN0QixLQUFLLEdBQUc7Z0RBQ04sTUFBTSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7NENBQ3RCLEtBQUssR0FBRztnREFDTixNQUFNLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQzs0Q0FDdEIsS0FBSyxHQUFHO2dEQUNOLE1B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QUFVO29CQUNsRCxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdkIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQzFCLENBQUM7b0JBQ0QsTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDWixDQUFDO2dCQUNILHNCQUFDO1lBQUQsQ0EzWUEsQUEyWUMsSUFBQTtZQTNZRCw2Q0EyWUMsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9zdGF0aWNfcmVmbGVjdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtMaXN0V3JhcHBlciwgU3RyaW5nTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7XG4gIGlzQXJyYXksXG4gIGlzQmxhbmssXG4gIGlzTnVtYmVyLFxuICBpc1ByZXNlbnQsXG4gIGlzUHJpbWl0aXZlLFxuICBpc1N0cmluZyxcbiAgVHlwZVxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtcbiAgQXR0cmlidXRlTWV0YWRhdGEsXG4gIERpcmVjdGl2ZU1ldGFkYXRhLFxuICBDb21wb25lbnRNZXRhZGF0YSxcbiAgQ29udGVudENoaWxkcmVuTWV0YWRhdGEsXG4gIENvbnRlbnRDaGlsZE1ldGFkYXRhLFxuICBJbnB1dE1ldGFkYXRhLFxuICBIb3N0QmluZGluZ01ldGFkYXRhLFxuICBIb3N0TGlzdGVuZXJNZXRhZGF0YSxcbiAgT3V0cHV0TWV0YWRhdGEsXG4gIFBpcGVNZXRhZGF0YSxcbiAgVmlld01ldGFkYXRhLFxuICBWaWV3Q2hpbGRNZXRhZGF0YSxcbiAgVmlld0NoaWxkcmVuTWV0YWRhdGEsXG4gIFZpZXdRdWVyeU1ldGFkYXRhLFxuICBRdWVyeU1ldGFkYXRhLFxufSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9tZXRhZGF0YSc7XG5cbi8qKlxuICogVGhlIGhvc3Qgb2YgdGhlIHN0YXRpYyByZXNvbHZlciBpcyBleHBlY3RlZCB0byBiZSBhYmxlIHRvIHByb3ZpZGUgbW9kdWxlIG1ldGFkYXRhIGluIHRoZSBmb3JtIG9mXG4gKiBNb2R1bGVNZXRhZGF0YS4gQW5ndWxhciAyIENMSSB3aWxsIHByb2R1Y2UgdGhpcyBtZXRhZGF0YSBmb3IgYSBtb2R1bGUgd2hlbmV2ZXIgYSAuZC50cyBmaWxlcyBpc1xuICogcHJvZHVjZWQgYW5kIHRoZSBtb2R1bGUgaGFzIGV4cG9ydGVkIHZhcmlhYmxlcyBvciBjbGFzc2VzIHdpdGggZGVjb3JhdG9ycy4gTW9kdWxlIG1ldGFkYXRhIGNhblxuICogYWxzbyBiZSBwcm9kdWNlZCBkaXJlY3RseSBmcm9tIFR5cGVTY3JpcHQgc291cmNlcyBieSB1c2luZyBNZXRhZGF0YUNvbGxlY3RvciBpbiB0b29scy9tZXRhZGF0YS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTdGF0aWNSZWZsZWN0b3JIb3N0IHtcbiAgLyoqXG4gICAqICBSZXR1cm4gYSBNb2R1bGVNZXRhZGF0YSBmb3IgdGhlIGdpdmUgbW9kdWxlLlxuICAgKlxuICAgKiBAcGFyYW0gbW9kdWxlSWQgaXMgYSBzdHJpbmcgaWRlbnRpZmllciBmb3IgYSBtb2R1bGUgaW4gdGhlIGZvcm0gdGhhdCB3b3VsZCBleHBlY3RlZCBpbiBhXG4gICAqICAgICAgICAgICAgICAgICBtb2R1bGUgaW1wb3J0IG9mIGFuIGltcG9ydCBzdGF0ZW1lbnQuXG4gICAqIEByZXR1cm5zIHRoZSBtZXRhZGF0YSBmb3IgdGhlIGdpdmVuIG1vZHVsZS5cbiAgICovXG4gIGdldE1ldGFkYXRhRm9yKG1vZHVsZUlkOiBzdHJpbmcpOiB7W2tleTogc3RyaW5nXTogYW55fTtcbn1cblxuLyoqXG4gKiBBIHRva2VuIHJlcHJlc2VudGluZyB0aGUgYSByZWZlcmVuY2UgdG8gYSBzdGF0aWMgdHlwZS5cbiAqXG4gKiBUaGlzIHRva2VuIGlzIHVuaXF1ZSBmb3IgYSBtb2R1bGVJZCBhbmQgbmFtZSBhbmQgY2FuIGJlIHVzZWQgYXMgYSBoYXNoIHRhYmxlIGtleS5cbiAqL1xuZXhwb3J0IGNsYXNzIFN0YXRpY1R5cGUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbW9kdWxlSWQ6IHN0cmluZywgcHVibGljIG5hbWU6IHN0cmluZykge31cbn1cblxuLyoqXG4gKiBBIHN0YXRpYyByZWZsZWN0b3IgaW1wbGVtZW50cyBlbm91Z2ggb2YgdGhlIFJlZmxlY3RvciBBUEkgdGhhdCBpcyBuZWNlc3NhcnkgdG8gY29tcGlsZVxuICogdGVtcGxhdGVzIHN0YXRpY2FsbHkuXG4gKi9cbmV4cG9ydCBjbGFzcyBTdGF0aWNSZWZsZWN0b3Ige1xuICBwcml2YXRlIHR5cGVDYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBTdGF0aWNUeXBlPigpO1xuICBwcml2YXRlIGFubm90YXRpb25DYWNoZSA9IG5ldyBNYXA8U3RhdGljVHlwZSwgYW55W10+KCk7XG4gIHByaXZhdGUgcHJvcGVydHlDYWNoZSA9IG5ldyBNYXA8U3RhdGljVHlwZSwge1trZXk6IHN0cmluZ106IGFueX0+KCk7XG4gIHByaXZhdGUgcGFyYW1ldGVyQ2FjaGUgPSBuZXcgTWFwPFN0YXRpY1R5cGUsIGFueVtdPigpO1xuICBwcml2YXRlIG1ldGFkYXRhQ2FjaGUgPSBuZXcgTWFwPHN0cmluZywge1trZXk6IHN0cmluZ106IGFueX0+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBob3N0OiBTdGF0aWNSZWZsZWN0b3JIb3N0KSB7IHRoaXMuaW5pdGlhbGl6ZUNvbnZlcnNpb25NYXAoKTsgfVxuXG4gIC8qKlxuICAgKiBnZXRTdGF0aWN0eXBlIHByb2R1Y2VzIGEgVHlwZSB3aG9zZSBtZXRhZGF0YSBpcyBrbm93biBidXQgd2hvc2UgaW1wbGVtZW50YXRpb24gaXMgbm90IGxvYWRlZC5cbiAgICogQWxsIHR5cGVzIHBhc3NlZCB0byB0aGUgU3RhdGljUmVzb2x2ZXIgc2hvdWxkIGJlIHBzZXVkby10eXBlcyByZXR1cm5lZCBieSB0aGlzIG1ldGhvZC5cbiAgICpcbiAgICogQHBhcmFtIG1vZHVsZUlkIHRoZSBtb2R1bGUgaWRlbnRpZmllciBhcyB3b3VsZCBiZSBwYXNzZWQgdG8gYW4gaW1wb3J0IHN0YXRlbWVudC5cbiAgICogQHBhcmFtIG5hbWUgdGhlIG5hbWUgb2YgdGhlIHR5cGUuXG4gICAqL1xuICBwdWJsaWMgZ2V0U3RhdGljVHlwZShtb2R1bGVJZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcpOiBTdGF0aWNUeXBlIHtcbiAgICBsZXQga2V5ID0gYFwiJHttb2R1bGVJZH1cIi4ke25hbWV9YDtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy50eXBlQ2FjaGUuZ2V0KGtleSk7XG4gICAgaWYgKCFpc1ByZXNlbnQocmVzdWx0KSkge1xuICAgICAgcmVzdWx0ID0gbmV3IFN0YXRpY1R5cGUobW9kdWxlSWQsIG5hbWUpO1xuICAgICAgdGhpcy50eXBlQ2FjaGUuc2V0KGtleSwgcmVzdWx0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHB1YmxpYyBhbm5vdGF0aW9ucyh0eXBlOiBTdGF0aWNUeXBlKTogYW55W10ge1xuICAgIGxldCBhbm5vdGF0aW9ucyA9IHRoaXMuYW5ub3RhdGlvbkNhY2hlLmdldCh0eXBlKTtcbiAgICBpZiAoIWlzUHJlc2VudChhbm5vdGF0aW9ucykpIHtcbiAgICAgIGxldCBjbGFzc01ldGFkYXRhID0gdGhpcy5nZXRUeXBlTWV0YWRhdGEodHlwZSk7XG4gICAgICBpZiAoaXNQcmVzZW50KGNsYXNzTWV0YWRhdGFbJ2RlY29yYXRvcnMnXSkpIHtcbiAgICAgICAgYW5ub3RhdGlvbnMgPSAoPGFueVtdPmNsYXNzTWV0YWRhdGFbJ2RlY29yYXRvcnMnXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChkZWNvcmF0b3IgPT4gdGhpcy5jb252ZXJ0S25vd25EZWNvcmF0b3IodHlwZS5tb2R1bGVJZCwgZGVjb3JhdG9yKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihkZWNvcmF0b3IgPT4gaXNQcmVzZW50KGRlY29yYXRvcikpO1xuICAgICAgfVxuICAgICAgdGhpcy5hbm5vdGF0aW9uQ2FjaGUuc2V0KHR5cGUsIGFubm90YXRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIGFubm90YXRpb25zO1xuICB9XG5cbiAgcHVibGljIHByb3BNZXRhZGF0YSh0eXBlOiBTdGF0aWNUeXBlKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgIGxldCBwcm9wTWV0YWRhdGEgPSB0aGlzLnByb3BlcnR5Q2FjaGUuZ2V0KHR5cGUpO1xuICAgIGlmICghaXNQcmVzZW50KHByb3BNZXRhZGF0YSkpIHtcbiAgICAgIGxldCBjbGFzc01ldGFkYXRhID0gdGhpcy5nZXRUeXBlTWV0YWRhdGEodHlwZSk7XG4gICAgICBwcm9wTWV0YWRhdGEgPSB0aGlzLmdldFByb3BlcnR5TWV0YWRhdGEodHlwZS5tb2R1bGVJZCwgY2xhc3NNZXRhZGF0YVsnbWVtYmVycyddKTtcbiAgICAgIHRoaXMucHJvcGVydHlDYWNoZS5zZXQodHlwZSwgcHJvcE1ldGFkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIHByb3BNZXRhZGF0YTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJhbWV0ZXJzKHR5cGU6IFN0YXRpY1R5cGUpOiBhbnlbXSB7XG4gICAgbGV0IHBhcmFtZXRlcnMgPSB0aGlzLnBhcmFtZXRlckNhY2hlLmdldCh0eXBlKTtcbiAgICBpZiAoIWlzUHJlc2VudChwYXJhbWV0ZXJzKSkge1xuICAgICAgbGV0IGNsYXNzTWV0YWRhdGEgPSB0aGlzLmdldFR5cGVNZXRhZGF0YSh0eXBlKTtcbiAgICAgIGxldCBjdG9yRGF0YSA9IGNsYXNzTWV0YWRhdGFbJ21lbWJlcnMnXVsnX19jdG9yX18nXTtcbiAgICAgIGlmIChpc1ByZXNlbnQoY3RvckRhdGEpKSB7XG4gICAgICAgIGxldCBjdG9yID0gKDxhbnlbXT5jdG9yRGF0YSkuZmluZChhID0+IGFbJ19fc3ltYm9saWMnXSA9PT0gJ2NvbnN0cnVjdG9yJyk7XG4gICAgICAgIHBhcmFtZXRlcnMgPSB0aGlzLnNpbXBsaWZ5KHR5cGUubW9kdWxlSWQsIGN0b3JbJ3BhcmFtZXRlcnMnXSk7XG4gICAgICAgIHRoaXMucGFyYW1ldGVyQ2FjaGUuc2V0KHR5cGUsIHBhcmFtZXRlcnMpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcGFyYW1ldGVycztcbiAgfVxuXG4gIHByaXZhdGUgY29udmVyc2lvbk1hcCA9IG5ldyBNYXA8U3RhdGljVHlwZSwgKG1vZHVsZUNvbnRleHQ6IHN0cmluZywgZXhwcmVzc2lvbjogYW55KSA9PiBhbnk+KCk7XG4gIHByaXZhdGUgaW5pdGlhbGl6ZUNvbnZlcnNpb25NYXAoKSB7XG4gICAgbGV0IGNvcmVfbWV0YWRhdGEgPSAnYW5ndWxhcjIvc3JjL2NvcmUvbWV0YWRhdGEnO1xuICAgIGxldCBjb252ZXJzaW9uTWFwID0gdGhpcy5jb252ZXJzaW9uTWFwO1xuICAgIGNvbnZlcnNpb25NYXAuc2V0KHRoaXMuZ2V0U3RhdGljVHlwZShjb3JlX21ldGFkYXRhLCAnRGlyZWN0aXZlJyksXG4gICAgICAgICAgICAgICAgICAgICAgKG1vZHVsZUNvbnRleHQsIGV4cHJlc3Npb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwMCA9IHRoaXMuZ2V0RGVjb3JhdG9yUGFyYW1ldGVyKG1vZHVsZUNvbnRleHQsIGV4cHJlc3Npb24sIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1ByZXNlbnQocDApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHAwID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERpcmVjdGl2ZU1ldGFkYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6IHAwWydzZWxlY3RvciddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dHM6IHAwWydpbnB1dHMnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0czogcDBbJ291dHB1dHMnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzOiBwMFsnZXZlbnRzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGhvc3Q6IHAwWydob3N0J10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmRpbmdzOiBwMFsnYmluZGluZ3MnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXJzOiBwMFsncHJvdmlkZXJzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4cG9ydEFzOiBwMFsnZXhwb3J0QXMnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcmllczogcDBbJ3F1ZXJpZXMnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgIGNvbnZlcnNpb25NYXAuc2V0KHRoaXMuZ2V0U3RhdGljVHlwZShjb3JlX21ldGFkYXRhLCAnQ29tcG9uZW50JyksXG4gICAgICAgICAgICAgICAgICAgICAgKG1vZHVsZUNvbnRleHQsIGV4cHJlc3Npb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwMCA9IHRoaXMuZ2V0RGVjb3JhdG9yUGFyYW1ldGVyKG1vZHVsZUNvbnRleHQsIGV4cHJlc3Npb24sIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1ByZXNlbnQocDApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHAwID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbXBvbmVudE1ldGFkYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6IHAwWydzZWxlY3RvciddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dHM6IHAwWydpbnB1dHMnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0czogcDBbJ291dHB1dHMnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczogcDBbJ3Byb3BlcnRpZXMnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzOiBwMFsnZXZlbnRzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGhvc3Q6IHAwWydob3N0J10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4cG9ydEFzOiBwMFsnZXhwb3J0QXMnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlSWQ6IHAwWydtb2R1bGVJZCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kaW5nczogcDBbJ2JpbmRpbmdzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyczogcDBbJ3Byb3ZpZGVycyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3QmluZGluZ3M6IHAwWyd2aWV3QmluZGluZ3MnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmlld1Byb3ZpZGVyczogcDBbJ3ZpZXdQcm92aWRlcnMnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlRGV0ZWN0aW9uOiBwMFsnY2hhbmdlRGV0ZWN0aW9uJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJpZXM6IHAwWydxdWVyaWVzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBwMFsndGVtcGxhdGVVcmwnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IHAwWyd0ZW1wbGF0ZSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZVVybHM6IHAwWydzdHlsZVVybHMnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVzOiBwMFsnc3R5bGVzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IHAwWydkaXJlY3RpdmVzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBpcGVzOiBwMFsncGlwZXMnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZW5jYXBzdWxhdGlvbjogcDBbJ2VuY2Fwc3VsYXRpb24nXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgY29udmVyc2lvbk1hcC5zZXQodGhpcy5nZXRTdGF0aWNUeXBlKGNvcmVfbWV0YWRhdGEsICdJbnB1dCcpLFxuICAgICAgICAgICAgICAgICAgICAgIChtb2R1bGVDb250ZXh0LCBleHByZXNzaW9uKSA9PiBuZXcgSW5wdXRNZXRhZGF0YShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXREZWNvcmF0b3JQYXJhbWV0ZXIobW9kdWxlQ29udGV4dCwgZXhwcmVzc2lvbiwgMCkpKTtcbiAgICBjb252ZXJzaW9uTWFwLnNldCh0aGlzLmdldFN0YXRpY1R5cGUoY29yZV9tZXRhZGF0YSwgJ091dHB1dCcpLFxuICAgICAgICAgICAgICAgICAgICAgIChtb2R1bGVDb250ZXh0LCBleHByZXNzaW9uKSA9PiBuZXcgT3V0cHV0TWV0YWRhdGEoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGVjb3JhdG9yUGFyYW1ldGVyKG1vZHVsZUNvbnRleHQsIGV4cHJlc3Npb24sIDApKSk7XG4gICAgY29udmVyc2lvbk1hcC5zZXQodGhpcy5nZXRTdGF0aWNUeXBlKGNvcmVfbWV0YWRhdGEsICdWaWV3JyksIChtb2R1bGVDb250ZXh0LCBleHByZXNzaW9uKSA9PiB7XG4gICAgICBsZXQgcDAgPSB0aGlzLmdldERlY29yYXRvclBhcmFtZXRlcihtb2R1bGVDb250ZXh0LCBleHByZXNzaW9uLCAwKTtcbiAgICAgIGlmICghaXNQcmVzZW50KHAwKSkge1xuICAgICAgICBwMCA9IHt9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBWaWV3TWV0YWRhdGEoe1xuICAgICAgICB0ZW1wbGF0ZVVybDogcDBbJ3RlbXBsYXRlVXJsJ10sXG4gICAgICAgIHRlbXBsYXRlOiBwMFsndGVtcGxhdGUnXSxcbiAgICAgICAgZGlyZWN0aXZlczogcDBbJ2RpcmVjdGl2ZXMnXSxcbiAgICAgICAgcGlwZXM6IHAwWydwaXBlcyddLFxuICAgICAgICBlbmNhcHN1bGF0aW9uOiBwMFsnZW5jYXBzdWxhdGlvbiddLFxuICAgICAgICBzdHlsZXM6IHAwWydzdHlsZXMnXSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGNvbnZlcnNpb25NYXAuc2V0KHRoaXMuZ2V0U3RhdGljVHlwZShjb3JlX21ldGFkYXRhLCAnQXR0cmlidXRlJyksXG4gICAgICAgICAgICAgICAgICAgICAgKG1vZHVsZUNvbnRleHQsIGV4cHJlc3Npb24pID0+IG5ldyBBdHRyaWJ1dGVNZXRhZGF0YShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXREZWNvcmF0b3JQYXJhbWV0ZXIobW9kdWxlQ29udGV4dCwgZXhwcmVzc2lvbiwgMCkpKTtcbiAgICBjb252ZXJzaW9uTWFwLnNldCh0aGlzLmdldFN0YXRpY1R5cGUoY29yZV9tZXRhZGF0YSwgJ1F1ZXJ5JyksIChtb2R1bGVDb250ZXh0LCBleHByZXNzaW9uKSA9PiB7XG4gICAgICBsZXQgcDAgPSB0aGlzLmdldERlY29yYXRvclBhcmFtZXRlcihtb2R1bGVDb250ZXh0LCBleHByZXNzaW9uLCAwKTtcbiAgICAgIGxldCBwMSA9IHRoaXMuZ2V0RGVjb3JhdG9yUGFyYW1ldGVyKG1vZHVsZUNvbnRleHQsIGV4cHJlc3Npb24sIDEpO1xuICAgICAgaWYgKCFpc1ByZXNlbnQocDEpKSB7XG4gICAgICAgIHAxID0ge307XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IFF1ZXJ5TWV0YWRhdGEocDAsIHtkZXNjZW5kYW50czogcDEuZGVzY2VuZGFudHMsIGZpcnN0OiBwMS5maXJzdH0pO1xuICAgIH0pO1xuICAgIGNvbnZlcnNpb25NYXAuc2V0KHRoaXMuZ2V0U3RhdGljVHlwZShjb3JlX21ldGFkYXRhLCAnQ29udGVudENoaWxkcmVuJyksXG4gICAgICAgICAgICAgICAgICAgICAgKG1vZHVsZUNvbnRleHQsIGV4cHJlc3Npb24pID0+IG5ldyBDb250ZW50Q2hpbGRyZW5NZXRhZGF0YShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXREZWNvcmF0b3JQYXJhbWV0ZXIobW9kdWxlQ29udGV4dCwgZXhwcmVzc2lvbiwgMCkpKTtcbiAgICBjb252ZXJzaW9uTWFwLnNldCh0aGlzLmdldFN0YXRpY1R5cGUoY29yZV9tZXRhZGF0YSwgJ0NvbnRlbnRDaGlsZCcpLFxuICAgICAgICAgICAgICAgICAgICAgIChtb2R1bGVDb250ZXh0LCBleHByZXNzaW9uKSA9PiBuZXcgQ29udGVudENoaWxkTWV0YWRhdGEoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGVjb3JhdG9yUGFyYW1ldGVyKG1vZHVsZUNvbnRleHQsIGV4cHJlc3Npb24sIDApKSk7XG4gICAgY29udmVyc2lvbk1hcC5zZXQodGhpcy5nZXRTdGF0aWNUeXBlKGNvcmVfbWV0YWRhdGEsICdWaWV3Q2hpbGRyZW4nKSxcbiAgICAgICAgICAgICAgICAgICAgICAobW9kdWxlQ29udGV4dCwgZXhwcmVzc2lvbikgPT4gbmV3IFZpZXdDaGlsZHJlbk1ldGFkYXRhKFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldERlY29yYXRvclBhcmFtZXRlcihtb2R1bGVDb250ZXh0LCBleHByZXNzaW9uLCAwKSkpO1xuICAgIGNvbnZlcnNpb25NYXAuc2V0KHRoaXMuZ2V0U3RhdGljVHlwZShjb3JlX21ldGFkYXRhLCAnVmlld0NoaWxkJyksXG4gICAgICAgICAgICAgICAgICAgICAgKG1vZHVsZUNvbnRleHQsIGV4cHJlc3Npb24pID0+IG5ldyBWaWV3Q2hpbGRNZXRhZGF0YShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXREZWNvcmF0b3JQYXJhbWV0ZXIobW9kdWxlQ29udGV4dCwgZXhwcmVzc2lvbiwgMCkpKTtcbiAgICBjb252ZXJzaW9uTWFwLnNldCh0aGlzLmdldFN0YXRpY1R5cGUoY29yZV9tZXRhZGF0YSwgJ1ZpZXdRdWVyeScpLFxuICAgICAgICAgICAgICAgICAgICAgIChtb2R1bGVDb250ZXh0LCBleHByZXNzaW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcDAgPSB0aGlzLmdldERlY29yYXRvclBhcmFtZXRlcihtb2R1bGVDb250ZXh0LCBleHByZXNzaW9uLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwMSA9IHRoaXMuZ2V0RGVjb3JhdG9yUGFyYW1ldGVyKG1vZHVsZUNvbnRleHQsIGV4cHJlc3Npb24sIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1ByZXNlbnQocDEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHAxID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFZpZXdRdWVyeU1ldGFkYXRhKHAwLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NlbmRhbnRzOiBwMVsnZGVzY2VuZGFudHMnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3Q6IHAxWydmaXJzdCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgY29udmVyc2lvbk1hcC5zZXQodGhpcy5nZXRTdGF0aWNUeXBlKGNvcmVfbWV0YWRhdGEsICdQaXBlJyksIChtb2R1bGVDb250ZXh0LCBleHByZXNzaW9uKSA9PiB7XG4gICAgICBsZXQgcDAgPSB0aGlzLmdldERlY29yYXRvclBhcmFtZXRlcihtb2R1bGVDb250ZXh0LCBleHByZXNzaW9uLCAwKTtcbiAgICAgIGlmICghaXNQcmVzZW50KHAwKSkge1xuICAgICAgICBwMCA9IHt9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBQaXBlTWV0YWRhdGEoe1xuICAgICAgICBuYW1lOiBwMFsnbmFtZSddLFxuICAgICAgICBwdXJlOiBwMFsncHVyZSddLFxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgY29udmVyc2lvbk1hcC5zZXQodGhpcy5nZXRTdGF0aWNUeXBlKGNvcmVfbWV0YWRhdGEsICdIb3N0QmluZGluZycpLFxuICAgICAgICAgICAgICAgICAgICAgIChtb2R1bGVDb250ZXh0LCBleHByZXNzaW9uKSA9PiBuZXcgSG9zdEJpbmRpbmdNZXRhZGF0YShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXREZWNvcmF0b3JQYXJhbWV0ZXIobW9kdWxlQ29udGV4dCwgZXhwcmVzc2lvbiwgMCkpKTtcbiAgICBjb252ZXJzaW9uTWFwLnNldCh0aGlzLmdldFN0YXRpY1R5cGUoY29yZV9tZXRhZGF0YSwgJ0hvc3RMaXN0ZW5lcicpLFxuICAgICAgICAgICAgICAgICAgICAgIChtb2R1bGVDb250ZXh0LCBleHByZXNzaW9uKSA9PiBuZXcgSG9zdExpc3RlbmVyTWV0YWRhdGEoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGVjb3JhdG9yUGFyYW1ldGVyKG1vZHVsZUNvbnRleHQsIGV4cHJlc3Npb24sIDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldERlY29yYXRvclBhcmFtZXRlcihtb2R1bGVDb250ZXh0LCBleHByZXNzaW9uLCAxKSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0S25vd25EZWNvcmF0b3IobW9kdWxlQ29udGV4dDogc3RyaW5nLCBleHByZXNzaW9uOiB7W2tleTogc3RyaW5nXTogYW55fSk6IGFueSB7XG4gICAgbGV0IGNvbnZlcnRlciA9IHRoaXMuY29udmVyc2lvbk1hcC5nZXQodGhpcy5nZXREZWNvcmF0b3JUeXBlKG1vZHVsZUNvbnRleHQsIGV4cHJlc3Npb24pKTtcbiAgICBpZiAoaXNQcmVzZW50KGNvbnZlcnRlcikpIHJldHVybiBjb252ZXJ0ZXIobW9kdWxlQ29udGV4dCwgZXhwcmVzc2lvbik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGdldERlY29yYXRvclR5cGUobW9kdWxlQ29udGV4dDogc3RyaW5nLCBleHByZXNzaW9uOiB7W2tleTogc3RyaW5nXTogYW55fSk6IFN0YXRpY1R5cGUge1xuICAgIGlmIChpc01ldGFkYXRhU3ltYm9saWNDYWxsRXhwcmVzc2lvbihleHByZXNzaW9uKSkge1xuICAgICAgbGV0IHRhcmdldCA9IGV4cHJlc3Npb25bJ2V4cHJlc3Npb24nXTtcbiAgICAgIGlmIChpc01ldGFkYXRhU3ltYm9saWNSZWZlcmVuY2VFeHByZXNzaW9uKHRhcmdldCkpIHtcbiAgICAgICAgbGV0IG1vZHVsZUlkID0gdGhpcy5ub3JtYWxpemVNb2R1bGVOYW1lKG1vZHVsZUNvbnRleHQsIHRhcmdldFsnbW9kdWxlJ10pO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTdGF0aWNUeXBlKG1vZHVsZUlkLCB0YXJnZXRbJ25hbWUnXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXREZWNvcmF0b3JQYXJhbWV0ZXIobW9kdWxlQ29udGV4dDogc3RyaW5nLCBleHByZXNzaW9uOiB7W2tleTogc3RyaW5nXTogYW55fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IG51bWJlcik6IGFueSB7XG4gICAgaWYgKGlzTWV0YWRhdGFTeW1ib2xpY0NhbGxFeHByZXNzaW9uKGV4cHJlc3Npb24pICYmIGlzUHJlc2VudChleHByZXNzaW9uWydhcmd1bWVudHMnXSkgJiZcbiAgICAgICAgKDxhbnlbXT5leHByZXNzaW9uWydhcmd1bWVudHMnXSkubGVuZ3RoIDw9IGluZGV4ICsgMSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2ltcGxpZnkobW9kdWxlQ29udGV4dCwgKDxhbnlbXT5leHByZXNzaW9uWydhcmd1bWVudHMnXSlbaW5kZXhdKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGdldFByb3BlcnR5TWV0YWRhdGEobW9kdWxlQ29udGV4dDogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHtba2V5OiBzdHJpbmddOiBhbnl9KToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgIGlmIChpc1ByZXNlbnQodmFsdWUpKSB7XG4gICAgICBsZXQgcmVzdWx0ID0ge307XG4gICAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2godmFsdWUsICh2YWx1ZSwgbmFtZSkgPT4ge1xuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZ2V0TWVtYmVyRGF0YShtb2R1bGVDb250ZXh0LCB2YWx1ZSk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoZGF0YSkpIHtcbiAgICAgICAgICBsZXQgcHJvcGVydHlEYXRhID0gZGF0YS5maWx0ZXIoZCA9PiBkWydraW5kJ10gPT0gXCJwcm9wZXJ0eVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChkID0+IGRbJ2RpcmVjdGl2ZXMnXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZWR1Y2UoKHAsIGMpID0+ICg8YW55W10+cCkuY29uY2F0KDxhbnlbXT5jKSwgW10pO1xuICAgICAgICAgIGlmIChwcm9wZXJ0eURhdGEubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICAgIFN0cmluZ01hcFdyYXBwZXIuc2V0KHJlc3VsdCwgbmFtZSwgcHJvcGVydHlEYXRhKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBjbGFuZy1mb3JtYXQgb2ZmXG4gIHByaXZhdGUgZ2V0TWVtYmVyRGF0YShtb2R1bGVDb250ZXh0OiBzdHJpbmcsIG1lbWJlcjogeyBba2V5OiBzdHJpbmddOiBhbnkgfVtdKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfVtdIHtcbiAgICAvLyBjbGFuZy1mb3JtYXQgb25cbiAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgaWYgKGlzUHJlc2VudChtZW1iZXIpKSB7XG4gICAgICBmb3IgKGxldCBpdGVtIG9mIG1lbWJlcikge1xuICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAga2luZDogaXRlbVsnX19zeW1ib2xpYyddLFxuICAgICAgICAgIGRpcmVjdGl2ZXM6XG4gICAgICAgICAgICAgIGlzUHJlc2VudChpdGVtWydkZWNvcmF0b3JzJ10pID9cbiAgICAgICAgICAgICAgICAgICg8YW55W10+aXRlbVsnZGVjb3JhdG9ycyddKVxuICAgICAgICAgICAgICAgICAgICAgIC5tYXAoZGVjb3JhdG9yID0+IHRoaXMuY29udmVydEtub3duRGVjb3JhdG9yKG1vZHVsZUNvbnRleHQsIGRlY29yYXRvcikpXG4gICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihkID0+IGlzUHJlc2VudChkKSkgOlxuICAgICAgICAgICAgICAgICAgbnVsbFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHVibGljIHNpbXBsaWZ5KG1vZHVsZUNvbnRleHQ6IHN0cmluZywgdmFsdWU6IGFueSk6IGFueSB7XG4gICAgbGV0IF90aGlzID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIHNpbXBsaWZ5KGV4cHJlc3Npb246IGFueSk6IGFueSB7XG4gICAgICBpZiAoaXNQcmltaXRpdmUoZXhwcmVzc2lvbikpIHtcbiAgICAgICAgcmV0dXJuIGV4cHJlc3Npb247XG4gICAgICB9XG4gICAgICBpZiAoaXNBcnJheShleHByZXNzaW9uKSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YoPGFueT5leHByZXNzaW9uKSkge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKHNpbXBsaWZ5KGl0ZW0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgICAgaWYgKGlzUHJlc2VudChleHByZXNzaW9uKSkge1xuICAgICAgICBpZiAoaXNQcmVzZW50KGV4cHJlc3Npb25bJ19fc3ltYm9saWMnXSkpIHtcbiAgICAgICAgICBzd2l0Y2ggKGV4cHJlc3Npb25bJ19fc3ltYm9saWMnXSkge1xuICAgICAgICAgICAgY2FzZSBcImJpbm9wXCI6XG4gICAgICAgICAgICAgIGxldCBsZWZ0ID0gc2ltcGxpZnkoZXhwcmVzc2lvblsnbGVmdCddKTtcbiAgICAgICAgICAgICAgbGV0IHJpZ2h0ID0gc2ltcGxpZnkoZXhwcmVzc2lvblsncmlnaHQnXSk7XG4gICAgICAgICAgICAgIHN3aXRjaCAoZXhwcmVzc2lvblsnb3BlcmF0b3InXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJyYmJzpcbiAgICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0ICYmIHJpZ2h0O1xuICAgICAgICAgICAgICAgIGNhc2UgJ3x8JzpcbiAgICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0IHx8IHJpZ2h0O1xuICAgICAgICAgICAgICAgIGNhc2UgJ3wnOlxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGxlZnQgfCByaWdodDtcbiAgICAgICAgICAgICAgICBjYXNlICdeJzpcbiAgICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0IF4gcmlnaHQ7XG4gICAgICAgICAgICAgICAgY2FzZSAnJic6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbGVmdCAmIHJpZ2h0O1xuICAgICAgICAgICAgICAgIGNhc2UgJz09JzpcbiAgICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0ID09IHJpZ2h0O1xuICAgICAgICAgICAgICAgIGNhc2UgJyE9JzpcbiAgICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0ICE9IHJpZ2h0O1xuICAgICAgICAgICAgICAgIGNhc2UgJz09PSc6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbGVmdCA9PT0gcmlnaHQ7XG4gICAgICAgICAgICAgICAgY2FzZSAnIT09JzpcbiAgICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0ICE9PSByaWdodDtcbiAgICAgICAgICAgICAgICBjYXNlICc8JzpcbiAgICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0IDwgcmlnaHQ7XG4gICAgICAgICAgICAgICAgY2FzZSAnPic6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbGVmdCA+IHJpZ2h0O1xuICAgICAgICAgICAgICAgIGNhc2UgJzw9JzpcbiAgICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0IDw9IHJpZ2h0O1xuICAgICAgICAgICAgICAgIGNhc2UgJz49JzpcbiAgICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0ID49IHJpZ2h0O1xuICAgICAgICAgICAgICAgIGNhc2UgJzw8JzpcbiAgICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0IDw8IHJpZ2h0O1xuICAgICAgICAgICAgICAgIGNhc2UgJz4+JzpcbiAgICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0ID4+IHJpZ2h0O1xuICAgICAgICAgICAgICAgIGNhc2UgJysnOlxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGxlZnQgKyByaWdodDtcbiAgICAgICAgICAgICAgICBjYXNlICctJzpcbiAgICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0IC0gcmlnaHQ7XG4gICAgICAgICAgICAgICAgY2FzZSAnKic6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbGVmdCAqIHJpZ2h0O1xuICAgICAgICAgICAgICAgIGNhc2UgJy8nOlxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGxlZnQgLyByaWdodDtcbiAgICAgICAgICAgICAgICBjYXNlICclJzpcbiAgICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0ICUgcmlnaHQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBjYXNlIFwicHJlXCI6XG4gICAgICAgICAgICAgIGxldCBvcGVyYW5kID0gc2ltcGxpZnkoZXhwcmVzc2lvblsnb3BlcmFuZCddKTtcbiAgICAgICAgICAgICAgc3dpdGNoIChleHByZXNzaW9uWydvcGVyYXRvciddKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnKyc6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gb3BlcmFuZDtcbiAgICAgICAgICAgICAgICBjYXNlICctJzpcbiAgICAgICAgICAgICAgICAgIHJldHVybiAtb3BlcmFuZDtcbiAgICAgICAgICAgICAgICBjYXNlICchJzpcbiAgICAgICAgICAgICAgICAgIHJldHVybiAhb3BlcmFuZDtcbiAgICAgICAgICAgICAgICBjYXNlICd+JzpcbiAgICAgICAgICAgICAgICAgIHJldHVybiB+b3BlcmFuZDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIGNhc2UgXCJpbmRleFwiOlxuICAgICAgICAgICAgICBsZXQgaW5kZXhUYXJnZXQgPSBzaW1wbGlmeShleHByZXNzaW9uWydleHByZXNzaW9uJ10pO1xuICAgICAgICAgICAgICBsZXQgaW5kZXggPSBzaW1wbGlmeShleHByZXNzaW9uWydpbmRleCddKTtcbiAgICAgICAgICAgICAgaWYgKGlzUHJlc2VudChpbmRleFRhcmdldCkgJiYgaXNQcmltaXRpdmUoaW5kZXgpKSByZXR1cm4gaW5kZXhUYXJnZXRbaW5kZXhdO1xuICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIGNhc2UgXCJzZWxlY3RcIjpcbiAgICAgICAgICAgICAgbGV0IHNlbGVjdFRhcmdldCA9IHNpbXBsaWZ5KGV4cHJlc3Npb25bJ2V4cHJlc3Npb24nXSk7XG4gICAgICAgICAgICAgIGxldCBtZW1iZXIgPSBzaW1wbGlmeShleHByZXNzaW9uWydtZW1iZXInXSk7XG4gICAgICAgICAgICAgIGlmIChpc1ByZXNlbnQoc2VsZWN0VGFyZ2V0KSAmJiBpc1ByaW1pdGl2ZShtZW1iZXIpKSByZXR1cm4gc2VsZWN0VGFyZ2V0W21lbWJlcl07XG4gICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgY2FzZSBcInJlZmVyZW5jZVwiOlxuICAgICAgICAgICAgICBsZXQgcmVmZXJlbmNlTW9kdWxlTmFtZSA9XG4gICAgICAgICAgICAgICAgICBfdGhpcy5ub3JtYWxpemVNb2R1bGVOYW1lKG1vZHVsZUNvbnRleHQsIGV4cHJlc3Npb25bJ21vZHVsZSddKTtcbiAgICAgICAgICAgICAgbGV0IHJlZmVyZW5jZU1vZHVsZSA9IF90aGlzLmdldE1vZHVsZU1ldGFkYXRhKHJlZmVyZW5jZU1vZHVsZU5hbWUpO1xuICAgICAgICAgICAgICBsZXQgcmVmZXJlbmNlVmFsdWUgPSByZWZlcmVuY2VNb2R1bGVbJ21ldGFkYXRhJ11bZXhwcmVzc2lvblsnbmFtZSddXTtcbiAgICAgICAgICAgICAgaWYgKGlzQ2xhc3NNZXRhZGF0YShyZWZlcmVuY2VWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAvLyBDb252ZXJ0IHRvIGEgcHNldWRvIHR5cGVcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuZ2V0U3RhdGljVHlwZShyZWZlcmVuY2VNb2R1bGVOYW1lLCBleHByZXNzaW9uWyduYW1lJ10pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBfdGhpcy5zaW1wbGlmeShyZWZlcmVuY2VNb2R1bGVOYW1lLCByZWZlcmVuY2VWYWx1ZSk7XG4gICAgICAgICAgICBjYXNlIFwiY2FsbFwiOlxuICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc3VsdCA9IHt9O1xuICAgICAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2goZXhwcmVzc2lvbiwgKHZhbHVlLCBuYW1lKSA9PiB7IHJlc3VsdFtuYW1lXSA9IHNpbXBsaWZ5KHZhbHVlKTsgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gc2ltcGxpZnkodmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRNb2R1bGVNZXRhZGF0YShtb2R1bGU6IHN0cmluZyk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICBsZXQgbW9kdWxlTWV0YWRhdGEgPSB0aGlzLm1ldGFkYXRhQ2FjaGUuZ2V0KG1vZHVsZSk7XG4gICAgaWYgKCFpc1ByZXNlbnQobW9kdWxlTWV0YWRhdGEpKSB7XG4gICAgICBtb2R1bGVNZXRhZGF0YSA9IHRoaXMuaG9zdC5nZXRNZXRhZGF0YUZvcihtb2R1bGUpO1xuICAgICAgaWYgKCFpc1ByZXNlbnQobW9kdWxlTWV0YWRhdGEpKSB7XG4gICAgICAgIG1vZHVsZU1ldGFkYXRhID0ge19fc3ltYm9saWM6IFwibW9kdWxlXCIsIG1vZHVsZTogbW9kdWxlLCBtZXRhZGF0YToge319O1xuICAgICAgfVxuICAgICAgdGhpcy5tZXRhZGF0YUNhY2hlLnNldChtb2R1bGUsIG1vZHVsZU1ldGFkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIG1vZHVsZU1ldGFkYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRUeXBlTWV0YWRhdGEodHlwZTogU3RhdGljVHlwZSk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICBsZXQgbW9kdWxlTWV0YWRhdGEgPSB0aGlzLmdldE1vZHVsZU1ldGFkYXRhKHR5cGUubW9kdWxlSWQpO1xuICAgIGxldCByZXN1bHQgPSBtb2R1bGVNZXRhZGF0YVsnbWV0YWRhdGEnXVt0eXBlLm5hbWVdO1xuICAgIGlmICghaXNQcmVzZW50KHJlc3VsdCkpIHtcbiAgICAgIHJlc3VsdCA9IHtfX3N5bWJvbGljOiBcImNsYXNzXCJ9O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBub3JtYWxpemVNb2R1bGVOYW1lKGZyb206IHN0cmluZywgdG86IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKHRvLnN0YXJ0c1dpdGgoJy4nKSkge1xuICAgICAgcmV0dXJuIHBhdGhUbyhmcm9tLCB0byk7XG4gICAgfVxuICAgIHJldHVybiB0bztcbiAgfVxufVxuXG5mdW5jdGlvbiBpc01ldGFkYXRhU3ltYm9saWNDYWxsRXhwcmVzc2lvbihleHByZXNzaW9uOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuICFpc1ByaW1pdGl2ZShleHByZXNzaW9uKSAmJiAhaXNBcnJheShleHByZXNzaW9uKSAmJiBleHByZXNzaW9uWydfX3N5bWJvbGljJ10gPT0gJ2NhbGwnO1xufVxuXG5mdW5jdGlvbiBpc01ldGFkYXRhU3ltYm9saWNSZWZlcmVuY2VFeHByZXNzaW9uKGV4cHJlc3Npb246IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gIWlzUHJpbWl0aXZlKGV4cHJlc3Npb24pICYmICFpc0FycmF5KGV4cHJlc3Npb24pICYmXG4gICAgICAgICBleHByZXNzaW9uWydfX3N5bWJvbGljJ10gPT0gJ3JlZmVyZW5jZSc7XG59XG5cbmZ1bmN0aW9uIGlzQ2xhc3NNZXRhZGF0YShleHByZXNzaW9uOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuICFpc1ByaW1pdGl2ZShleHByZXNzaW9uKSAmJiAhaXNBcnJheShleHByZXNzaW9uKSAmJiBleHByZXNzaW9uWydfX3N5bWJvbGljJ10gPT0gJ2NsYXNzJztcbn1cblxuZnVuY3Rpb24gc3BsaXRQYXRoKHBhdGg6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgcmV0dXJuIHBhdGguc3BsaXQoL1xcL3xcXFxcL2cpO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlUGF0aChwYXRoUGFydHM6IHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgbGV0IHJlc3VsdCA9IFtdO1xuICBMaXN0V3JhcHBlci5mb3JFYWNoV2l0aEluZGV4KHBhdGhQYXJ0cywgKHBhcnQsIGluZGV4KSA9PiB7XG4gICAgc3dpdGNoIChwYXJ0KSB7XG4gICAgICBjYXNlICcnOlxuICAgICAgY2FzZSAnLic6XG4gICAgICAgIGlmIChpbmRleCA+IDApIHJldHVybjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICcuLic6XG4gICAgICAgIGlmIChpbmRleCA+IDAgJiYgcmVzdWx0Lmxlbmd0aCAhPSAwKSByZXN1bHQucG9wKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmVzdWx0LnB1c2gocGFydCk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0LmpvaW4oJy8nKTtcbn1cblxuZnVuY3Rpb24gcGF0aFRvKGZyb206IHN0cmluZywgdG86IHN0cmluZyk6IHN0cmluZyB7XG4gIGxldCByZXN1bHQgPSB0bztcbiAgaWYgKHRvLnN0YXJ0c1dpdGgoJy4nKSkge1xuICAgIGxldCBmcm9tUGFydHMgPSBzcGxpdFBhdGgoZnJvbSk7XG4gICAgZnJvbVBhcnRzLnBvcCgpOyAgLy8gcmVtb3ZlIHRoZSBmaWxlIG5hbWUuXG4gICAgbGV0IHRvUGFydHMgPSBzcGxpdFBhdGgodG8pO1xuICAgIHJlc3VsdCA9IHJlc29sdmVQYXRoKGZyb21QYXJ0cy5jb25jYXQodG9QYXJ0cykpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
