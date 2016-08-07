System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, exceptions_1;
    var ReflectionCapabilities;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
            ReflectionCapabilities = (function () {
                function ReflectionCapabilities(reflect) {
                    this._reflect = lang_1.isPresent(reflect) ? reflect : lang_1.global.Reflect;
                }
                ReflectionCapabilities.prototype.isReflectionEnabled = function () { return true; };
                ReflectionCapabilities.prototype.factory = function (t) {
                    switch (t.length) {
                        case 0:
                            return function () { return new t(); };
                        case 1:
                            return function (a1) { return new t(a1); };
                        case 2:
                            return function (a1, a2) { return new t(a1, a2); };
                        case 3:
                            return function (a1, a2, a3) { return new t(a1, a2, a3); };
                        case 4:
                            return function (a1, a2, a3, a4) { return new t(a1, a2, a3, a4); };
                        case 5:
                            return function (a1, a2, a3, a4, a5) { return new t(a1, a2, a3, a4, a5); };
                        case 6:
                            return function (a1, a2, a3, a4, a5, a6) {
                                return new t(a1, a2, a3, a4, a5, a6);
                            };
                        case 7:
                            return function (a1, a2, a3, a4, a5, a6, a7) {
                                return new t(a1, a2, a3, a4, a5, a6, a7);
                            };
                        case 8:
                            return function (a1, a2, a3, a4, a5, a6, a7, a8) {
                                return new t(a1, a2, a3, a4, a5, a6, a7, a8);
                            };
                        case 9:
                            return function (a1, a2, a3, a4, a5, a6, a7, a8, a9) {
                                return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9);
                            };
                        case 10:
                            return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
                                return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
                            };
                        case 11:
                            return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
                                return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
                            };
                        case 12:
                            return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
                                return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12);
                            };
                        case 13:
                            return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
                                return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13);
                            };
                        case 14:
                            return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14) {
                                return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14);
                            };
                        case 15:
                            return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
                                return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15);
                            };
                        case 16:
                            return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16) {
                                return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16);
                            };
                        case 17:
                            return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17) {
                                return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17);
                            };
                        case 18:
                            return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18) {
                                return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18);
                            };
                        case 19:
                            return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19) {
                                return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19);
                            };
                        case 20:
                            return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20) {
                                return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20);
                            };
                    }
                    ;
                    throw new Error("Cannot create a factory for '" + lang_1.stringify(t) + "' because its constructor has more than 20 arguments");
                };
                /** @internal */
                ReflectionCapabilities.prototype._zipTypesAndAnnotations = function (paramTypes, paramAnnotations) {
                    var result;
                    if (typeof paramTypes === 'undefined') {
                        result = new Array(paramAnnotations.length);
                    }
                    else {
                        result = new Array(paramTypes.length);
                    }
                    for (var i = 0; i < result.length; i++) {
                        // TS outputs Object for parameters without types, while Traceur omits
                        // the annotations. For now we preserve the Traceur behavior to aid
                        // migration, but this can be revisited.
                        if (typeof paramTypes === 'undefined') {
                            result[i] = [];
                        }
                        else if (paramTypes[i] != Object) {
                            result[i] = [paramTypes[i]];
                        }
                        else {
                            result[i] = [];
                        }
                        if (lang_1.isPresent(paramAnnotations) && lang_1.isPresent(paramAnnotations[i])) {
                            result[i] = result[i].concat(paramAnnotations[i]);
                        }
                    }
                    return result;
                };
                ReflectionCapabilities.prototype.parameters = function (typeOrFunc) {
                    // Prefer the direct API.
                    if (lang_1.isPresent(typeOrFunc.parameters)) {
                        return typeOrFunc.parameters;
                    }
                    if (lang_1.isPresent(this._reflect) && lang_1.isPresent(this._reflect.getMetadata)) {
                        var paramAnnotations = this._reflect.getMetadata('parameters', typeOrFunc);
                        var paramTypes = this._reflect.getMetadata('design:paramtypes', typeOrFunc);
                        if (lang_1.isPresent(paramTypes) || lang_1.isPresent(paramAnnotations)) {
                            return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
                        }
                    }
                    // The array has to be filled with `undefined` because holes would be skipped by `some`
                    var parameters = new Array(typeOrFunc.length);
                    parameters.fill(undefined);
                    return parameters;
                };
                ReflectionCapabilities.prototype.annotations = function (typeOrFunc) {
                    // Prefer the direct API.
                    if (lang_1.isPresent(typeOrFunc.annotations)) {
                        var annotations = typeOrFunc.annotations;
                        if (lang_1.isFunction(annotations) && annotations.annotations) {
                            annotations = annotations.annotations;
                        }
                        return annotations;
                    }
                    if (lang_1.isPresent(this._reflect) && lang_1.isPresent(this._reflect.getMetadata)) {
                        var annotations = this._reflect.getMetadata('annotations', typeOrFunc);
                        if (lang_1.isPresent(annotations))
                            return annotations;
                    }
                    return [];
                };
                ReflectionCapabilities.prototype.propMetadata = function (typeOrFunc) {
                    // Prefer the direct API.
                    if (lang_1.isPresent(typeOrFunc.propMetadata)) {
                        var propMetadata = typeOrFunc.propMetadata;
                        if (lang_1.isFunction(propMetadata) && propMetadata.propMetadata) {
                            propMetadata = propMetadata.propMetadata;
                        }
                        return propMetadata;
                    }
                    if (lang_1.isPresent(this._reflect) && lang_1.isPresent(this._reflect.getMetadata)) {
                        var propMetadata = this._reflect.getMetadata('propMetadata', typeOrFunc);
                        if (lang_1.isPresent(propMetadata))
                            return propMetadata;
                    }
                    return {};
                };
                ReflectionCapabilities.prototype.interfaces = function (type) {
                    throw new exceptions_1.BaseException("JavaScript does not support interfaces");
                };
                ReflectionCapabilities.prototype.getter = function (name) { return new Function('o', 'return o.' + name + ';'); };
                ReflectionCapabilities.prototype.setter = function (name) {
                    return new Function('o', 'v', 'return o.' + name + ' = v;');
                };
                ReflectionCapabilities.prototype.method = function (name) {
                    var functionBody = "if (!o." + name + ") throw new Error('\"" + name + "\" is undefined');\n        return o." + name + ".apply(o, args);";
                    return new Function('o', 'args', functionBody);
                };
                // There is not a concept of import uri in Js, but this is useful in developing Dart applications.
                ReflectionCapabilities.prototype.importUri = function (type) { return "./" + lang_1.stringify(type); };
                return ReflectionCapabilities;
            }());
            exports_1("ReflectionCapabilities", ReflectionCapabilities);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL3JlZmxlY3Rpb24vcmVmbGVjdGlvbl9jYXBhYmlsaXRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7WUFZQTtnQkFHRSxnQ0FBWSxPQUFhO29CQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsZ0JBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxPQUFPLEdBQUcsYUFBTSxDQUFDLE9BQU8sQ0FBQztnQkFBQyxDQUFDO2dCQUU3RixvREFBbUIsR0FBbkIsY0FBaUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBRS9DLHdDQUFPLEdBQVAsVUFBUSxDQUFlO29CQUNyQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFDakIsS0FBSyxDQUFDOzRCQUNKLE1BQU0sQ0FBQyxjQUFNLE9BQUEsSUFBSSxDQUFDLEVBQUUsRUFBUCxDQUFPLENBQUM7d0JBQ3ZCLEtBQUssQ0FBQzs0QkFDSixNQUFNLENBQUMsVUFBQyxFQUFPLElBQUssT0FBQSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBVCxDQUFTLENBQUM7d0JBQ2hDLEtBQUssQ0FBQzs0QkFDSixNQUFNLENBQUMsVUFBQyxFQUFPLEVBQUUsRUFBTyxJQUFLLE9BQUEsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFiLENBQWEsQ0FBQzt3QkFDN0MsS0FBSyxDQUFDOzRCQUNKLE1BQU0sQ0FBQyxVQUFDLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxJQUFLLE9BQUEsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBakIsQ0FBaUIsQ0FBQzt3QkFDMUQsS0FBSyxDQUFDOzRCQUNKLE1BQU0sQ0FBQyxVQUFDLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sSUFBSyxPQUFBLElBQUksQ0FBQyxDQUFD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QUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUMvRSxHQUFRLEVBQUUsR0FBUSxFQUFFLEdBQVE7Z0NBQ3pCLE9BQUEsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7NEJBQXhELENBQXdELENBQUM7d0JBQ3RFLEtBQUssRUFBRTs0QkFDTCxNQUFNLENBQUMsVUFBQyxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFDL0UsR0FBUSxFQUFFLEdBQVEsRUFBRSxHQUFRLEVBQUUsR0FBUTtnQ0FDbkMsT0FBQSxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7NEJBQTdELENBQTZELENBQUM7d0JBQzNFLEtBQUssRUFBRTs0QkFDTCxNQUFNLENBQUMsVUFBQyxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFDL0UsR0FBUSxFQUFFLEdBQVEsRUFBRSxHQUFRLEVBQUUsR0FBUSxFQUFFLEdBQVE7Z0NBQzdDLE9BQUEsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQzs0QkFBbEUsQ0FBa0UsQ0FBQzt3QkFDaEYsS0FBSyxFQUFFOzRCQUNMLE1BQU0sQ0FBQyxVQUFDLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUMvRSxHQUFRLEVBQUUsR0FBUSxFQUFFLEdBQVEsRUFBRSxHQUFRLEVBQUUsR0FBUSxFQUFFLEdBQVE7Z0NBQ3ZELE9BQUEsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7NEJBQXZFLENBQXVFLENBQUM7d0JBQ3JGLEtBQUssRUFBRTs0QkFDTCxNQUFNLENBQUMsVUFBQyxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFDL0UsR0FBUSxFQUFFLEdBQVEsRUFBRSxHQUFRLEVBQUUsR0FBUSxFQUFFLEdBQVEsRUFBRSxHQUFRLEVBQUUsR0FBUTtnQ0FDakUsT0FBQSxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7NEJBQTVFLENBQTRFLENBQUM7d0JBQzFGLEtBQUssRUFBRTs0QkFDTCxNQUFNLENBQUMsVUFBQyxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFDL0UsR0FBUSxFQUFFLEdBQVEsRUFBRSxHQUFRLEVBQUUsR0FBUSxFQUFFLEdBQVEsRUFBRSxHQUFRLEVBQUUsR0FBUSxFQUFFLEdBQVE7Z0NBQzNFLE9BQUEsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUNyRSxHQUFHLENBQUM7NEJBRFYsQ0FDVSxDQUFDO3dCQUN4QixLQUFLLEVBQUU7NEJBQ0wsTUFBTSxDQUFDLFVBQUMsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQy9FLEdBQVEsRUFBRSxHQUFRLEVBQUUsR0FBUSxFQUFFLEdBQVEsRUFBRSxHQUFRLEVBQUUsR0FBUSxFQUFFLEdBQVEsRUFBRSxHQUFRLEVBQzlFLEdBQVE7Z0NBQUssT0FBQSxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFDaEUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7NEJBRHBCLENBQ29CLENBQUM7d0JBQzVDLEtBQUssRUFBRTs0QkFDTCxNQUFNLENBQUMsVUFBQyxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFD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VCxVQUFVLElBQVUsSUFBWSxNQUFNLENBQUMsT0FBSyxnQkFBUyxDQUFDLElBQUksQ0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDbEUsNkJBQUM7WUFBRCxDQXJMQSxBQXFMQyxJQUFBO1lBckxELDJEQXFMQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL3JlZmxlY3Rpb24vcmVmbGVjdGlvbl9jYXBhYmlsaXRpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBUeXBlLFxuICBpc1ByZXNlbnQsXG4gIGlzRnVuY3Rpb24sXG4gIGdsb2JhbCxcbiAgc3RyaW5naWZ5LFxuICBDb25jcmV0ZVR5cGVcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7R2V0dGVyRm4sIFNldHRlckZuLCBNZXRob2RGbn0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQge1BsYXRmb3JtUmVmbGVjdGlvbkNhcGFiaWxpdGllc30gZnJvbSAnLi9wbGF0Zm9ybV9yZWZsZWN0aW9uX2NhcGFiaWxpdGllcyc7XG5cbmV4cG9ydCBjbGFzcyBSZWZsZWN0aW9uQ2FwYWJpbGl0aWVzIGltcGxlbWVudHMgUGxhdGZvcm1SZWZsZWN0aW9uQ2FwYWJpbGl0aWVzIHtcbiAgcHJpdmF0ZSBfcmVmbGVjdDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHJlZmxlY3Q/OiBhbnkpIHsgdGhpcy5fcmVmbGVjdCA9IGlzUHJlc2VudChyZWZsZWN0KSA/IHJlZmxlY3QgOiBnbG9iYWwuUmVmbGVjdDsgfVxuXG4gIGlzUmVmbGVjdGlvbkVuYWJsZWQoKTogYm9vbGVhbiB7IHJldHVybiB0cnVlOyB9XG5cbiAgZmFjdG9yeSh0OiBDb25jcmV0ZVR5cGUpOiBGdW5jdGlvbiB7XG4gICAgc3dpdGNoICh0Lmxlbmd0aCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICByZXR1cm4gKCkgPT4gbmV3IHQoKTtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIChhMTogYW55KSA9PiBuZXcgdChhMSk7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHJldHVybiAoYTE6IGFueSwgYTI6IGFueSkgPT4gbmV3IHQoYTEsIGEyKTtcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgcmV0dXJuIChhMTogYW55LCBhMjogYW55LCBhMzogYW55KSA9PiBuZXcgdChhMSwgYTIsIGEzKTtcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgcmV0dXJuIChhMTogYW55LCBhMjogYW55LCBhMzogYW55LCBhNDogYW55KSA9PiBuZXcgdChhMSwgYTIsIGEzLCBhNCk7XG4gICAgICBjYXNlIDU6XG4gICAgICAgIHJldHVybiAoYTE6IGFueSwgYTI6IGFueSwgYTM6IGFueSwgYTQ6IGFueSwgYTU6IGFueSkgPT4gbmV3IHQoYTEsIGEyLCBhMywgYTQsIGE1KTtcbiAgICAgIGNhc2UgNjpcbiAgICAgICAgcmV0dXJuIChhMTogYW55LCBhMjogYW55LCBhMzogYW55LCBhNDogYW55LCBhNTogYW55LCBhNjogYW55KSA9PlxuICAgICAgICAgICAgICAgICAgIG5ldyB0KGExLCBhMiwgYTMsIGE0LCBhNSwgYTYpO1xuICAgICAgY2FzZSA3OlxuICAgICAgICByZXR1cm4gKGExOiBhbnksIGEyOiBhbnksIGEzOiBhbnksIGE0OiBhbnksIGE1OiBhbnksIGE2OiBhbnksIGE3OiBhbnkpID0+XG4gICAgICAgICAgICAgICAgICAgbmV3IHQoYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcpO1xuICAgICAgY2FzZSA4OlxuICAgICAgICByZXR1cm4gKGExOiBhbnksIGEyOiBhbnksIGEzOiBhbnksIGE0OiBhbnksIGE1OiBhbnksIGE2OiBhbnksIGE3OiBhbnksIGE4OiBhbnkpID0+XG4gICAgICAgICAgICAgICAgICAgbmV3IHQoYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4KTtcbiAgICAgIGNhc2UgOTpcbiAgICAgICAgcmV0dXJuIChhMTogYW55LCBhMjogYW55LCBhMzogYW55LCBhNDogYW55LCBhNTogYW55LCBhNjogYW55LCBhNzogYW55LCBhODogYW55LCBhOTogYW55KSA9PlxuICAgICAgICAgICAgICAgICAgIG5ldyB0KGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOCwgYTkpO1xuICAgICAgY2FzZSAxMDpcbiAgICAgICAgcmV0dXJuIChhMTogYW55LCBhMjogYW55LCBhMzogYW55LCBhNDogYW55LCBhNTogYW55LCBhNjogYW55LCBhNzogYW55LCBhODogYW55LCBhOTogYW55LFxuICAgICAgICAgICAgICAgIGExMDogYW55KSA9PiBuZXcgdChhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgsIGE5LCBhMTApO1xuICAgICAgY2FzZSAxMTpcbiAgICAgICAgcmV0dXJuIChhMTogYW55LCBhMjogYW55LCBhMzogYW55LCBhNDogYW55LCBhNTogYW55LCBhNjogYW55LCBhNzogYW55LCBhODogYW55LCBhOTogYW55LFxuICAgICAgICAgICAgICAgIGExMDogYW55LCBhMTE6IGFueSkgPT4gbmV3IHQoYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4LCBhOSwgYTEwLCBhMTEpO1xuICAgICAgY2FzZSAxMjpcbiAgICAgICAgcmV0dXJuIChhMTogYW55LCBhMjogYW55LCBhMzogYW55LCBhNDogYW55LCBhNTogYW55LCBhNjogYW55LCBhNzogYW55LCBhODogYW55LCBhOTogYW55LFxuICAgICAgICAgICAgICAgIGExMDogYW55LCBhMTE6IGFueSwgYTEyOiBhbnkpID0+XG4gICAgICAgICAgICAgICAgICAgbmV3IHQoYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4LCBhOSwgYTEwLCBhMTEsIGExMik7XG4gICAgICBjYXNlIDEzOlxuICAgICAgICByZXR1cm4gKGExOiBhbnksIGEyOiBhbnksIGEzOiBhbnksIGE0OiBhbnksIGE1OiBhbnksIGE2OiBhbnksIGE3OiBhbnksIGE4OiBhbnksIGE5OiBhbnksXG4gICAgICAgICAgICAgICAgYTEwOiBhbnksIGExMTogYW55LCBhMTI6IGFueSwgYTEzOiBhbnkpID0+XG4gICAgICAgICAgICAgICAgICAgbmV3IHQoYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4LCBhOSwgYTEwLCBhMTEsIGExMiwgYTEzKTtcbiAgICAgIGNhc2UgMTQ6XG4gICAgICAgIHJldHVybiAoYTE6IGFueSwgYTI6IGFueSwgYTM6IGFueSwgYTQ6IGFueSwgYTU6IGFueSwgYTY6IGFueSwgYTc6IGFueSwgYTg6IGFueSwgYTk6IGFueSxcbiAgICAgICAgICAgICAgICBhMTA6IGFueSwgYTExOiBhbnksIGExMjogYW55LCBhMTM6IGFueSwgYTE0OiBhbnkpID0+XG4gICAgICAgICAgICAgICAgICAgbmV3IHQoYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4LCBhOSwgYTEwLCBhMTEsIGExMiwgYTEzLCBhMTQpO1xuICAgICAgY2FzZSAxNTpcbiAgICAgICAgcmV0dXJuIChhMTogYW55LCBhMjogYW55LCBhMzogYW55LCBhNDogYW55LCBhNTogYW55LCBhNjogYW55LCBhNzogYW55LCBhODogYW55LCBhOTogYW55LFxuICAgICAgICAgICAgICAgIGExMDogYW55LCBhMTE6IGFueSwgYTEyOiBhbnksIGExMzogYW55LCBhMTQ6IGFueSwgYTE1OiBhbnkpID0+XG4gICAgICAgICAgICAgICAgICAgbmV3IHQoYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4LCBhOSwgYTEwLCBhMTEsIGExMiwgYTEzLCBhMTQsIGExNSk7XG4gICAgICBjYXNlIDE2OlxuICAgICAgICByZXR1cm4gKGExOiBhbnksIGEyOiBhbnksIGEzOiBhbnksIGE0OiBhbnksIGE1OiBhbnksIGE2OiBhbnksIGE3OiBhbnksIGE4OiBhbnksIGE5OiBhbnksXG4gICAgICAgICAgICAgICAgYTEwOiBhbnksIGExMTogYW55LCBhMTI6IGFueSwgYTEzOiBhbnksIGExNDogYW55LCBhMTU6IGFueSwgYTE2OiBhbnkpID0+XG4gICAgICAgICAgICAgICAgICAgbmV3IHQoYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4LCBhOSwgYTEwLCBhMTEsIGExMiwgYTEzLCBhMTQsIGExNSwgYTE2KTtcbiAgICAgIGNhc2UgMTc6XG4gICAgICAgIHJldHVybiAoYTE6IGFueSwgYTI6IGFueSwgYTM6IGFueSwgYTQ6IGFueSwgYTU6IGFueSwgYTY6IGFueSwgYTc6IGFueSwgYTg6IGFueSwgYTk6IGFueSxcbiAgICAgICAgICAgICAgICBhMTA6IGFueSwgYTExOiBhbnksIGExMjogYW55LCBhMTM6IGFueSwgYTE0OiBhbnksIGExNTogYW55LCBhMTY6IGFueSwgYTE3OiBhbnkpID0+XG4gICAgICAgICAgICAgICAgICAgbmV3IHQoYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4LCBhOSwgYTEwLCBhMTEsIGExMiwgYTEzLCBhMTQsIGExNSwgYTE2LFxuICAgICAgICAgICAgICAgICAgICAgICAgIGExNyk7XG4gICAgICBjYXNlIDE4OlxuICAgICAgICByZXR1cm4gKGExOiBhbnksIGEyOiBhbnksIGEzOiBhbnksIGE0OiBhbnksIGE1OiBhbnksIGE2OiBhbnksIGE3OiBhbnksIGE4OiBhbnksIGE5OiBhbnksXG4gICAgICAgICAgICAgICAgYTEwOiBhbnksIGExMTogYW55LCBhMTI6IGFueSwgYTEzOiBhbnksIGExNDogYW55LCBhMTU6IGFueSwgYTE2OiBhbnksIGExNzogYW55LFxuICAgICAgICAgICAgICAgIGExODogYW55KSA9PiBuZXcgdChhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgsIGE5LCBhMTAsIGExMSwgYTEyLCBhMTMsIGExNCwgYTE1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhMTYsIGExNywgYTE4KTtcbiAgICAgIGNhc2UgMTk6XG4gICAgICAgIHJldHVybiAoYTE6IGFueSwgYTI6IGFueSwgYTM6IGFueSwgYTQ6IGFueSwgYTU6IGFueSwgYTY6IGFueSwgYTc6IGFueSwgYTg6IGFueSwgYTk6IGFueSxcbiAgICAgICAgICAgICAgICBhMTA6IGFueSwgYTExOiBhbnksIGExMjogYW55LCBhMTM6IGFueSwgYTE0OiBhbnksIGExNTogYW55LCBhMTY6IGFueSwgYTE3OiBhbnksXG4gICAgICAgICAgICAgICAgYTE4OiBhbnksIGExOTogYW55KSA9PiBuZXcgdChhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgsIGE5LCBhMTAsIGExMSwgYTEyLCBhMTMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhMTQsIGExNSwgYTE2LCBhMTcsIGExOCwgYTE5KTtcbiAgICAgIGNhc2UgMjA6XG4gICAgICAgIHJldHVybiAoYTE6IGFueSwgYTI6IGFueSwgYTM6IGFueSwgYTQ6IGFueSwgYTU6IGFueSwgYTY6IGFueSwgYTc6IGFueSwgYTg6IGFueSwgYTk6IGFueSxcbiAgICAgICAgICAgICAgICBhMTA6IGFueSwgYTExOiBhbnksIGExMjogYW55LCBhMTM6IGFueSwgYTE0OiBhbnksIGExNTogYW55LCBhMTY6IGFueSwgYTE3OiBhbnksXG4gICAgICAgICAgICAgICAgYTE4OiBhbnksIGExOTogYW55LCBhMjA6IGFueSkgPT4gbmV3IHQoYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4LCBhOSwgYTEwLCBhMTEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYTEyLCBhMTMsIGExNCwgYTE1LCBhMTYsIGExNywgYTE4LCBhMTksIGEyMCk7XG4gICAgfTtcblxuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYENhbm5vdCBjcmVhdGUgYSBmYWN0b3J5IGZvciAnJHtzdHJpbmdpZnkodCl9JyBiZWNhdXNlIGl0cyBjb25zdHJ1Y3RvciBoYXMgbW9yZSB0aGFuIDIwIGFyZ3VtZW50c2ApO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfemlwVHlwZXNBbmRBbm5vdGF0aW9ucyhwYXJhbVR5cGVzLCBwYXJhbUFubm90YXRpb25zKTogYW55W11bXSB7XG4gICAgdmFyIHJlc3VsdDtcblxuICAgIGlmICh0eXBlb2YgcGFyYW1UeXBlcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJlc3VsdCA9IG5ldyBBcnJheShwYXJhbUFubm90YXRpb25zLmxlbmd0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IG5ldyBBcnJheShwYXJhbVR5cGVzLmxlbmd0aCk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIFRTIG91dHB1dHMgT2JqZWN0IGZvciBwYXJhbWV0ZXJzIHdpdGhvdXQgdHlwZXMsIHdoaWxlIFRyYWNldXIgb21pdHNcbiAgICAgIC8vIHRoZSBhbm5vdGF0aW9ucy4gRm9yIG5vdyB3ZSBwcmVzZXJ2ZSB0aGUgVHJhY2V1ciBiZWhhdmlvciB0byBhaWRcbiAgICAgIC8vIG1pZ3JhdGlvbiwgYnV0IHRoaXMgY2FuIGJlIHJldmlzaXRlZC5cbiAgICAgIGlmICh0eXBlb2YgcGFyYW1UeXBlcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmVzdWx0W2ldID0gW107XG4gICAgICB9IGVsc2UgaWYgKHBhcmFtVHlwZXNbaV0gIT0gT2JqZWN0KSB7XG4gICAgICAgIHJlc3VsdFtpXSA9IFtwYXJhbVR5cGVzW2ldXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdFtpXSA9IFtdO1xuICAgICAgfVxuICAgICAgaWYgKGlzUHJlc2VudChwYXJhbUFubm90YXRpb25zKSAmJiBpc1ByZXNlbnQocGFyYW1Bbm5vdGF0aW9uc1tpXSkpIHtcbiAgICAgICAgcmVzdWx0W2ldID0gcmVzdWx0W2ldLmNvbmNhdChwYXJhbUFubm90YXRpb25zW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHBhcmFtZXRlcnModHlwZU9yRnVuYzogVHlwZSk6IGFueVtdW10ge1xuICAgIC8vIFByZWZlciB0aGUgZGlyZWN0IEFQSS5cbiAgICBpZiAoaXNQcmVzZW50KCg8YW55PnR5cGVPckZ1bmMpLnBhcmFtZXRlcnMpKSB7XG4gICAgICByZXR1cm4gKDxhbnk+dHlwZU9yRnVuYykucGFyYW1ldGVycztcbiAgICB9XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl9yZWZsZWN0KSAmJiBpc1ByZXNlbnQodGhpcy5fcmVmbGVjdC5nZXRNZXRhZGF0YSkpIHtcbiAgICAgIHZhciBwYXJhbUFubm90YXRpb25zID0gdGhpcy5fcmVmbGVjdC5nZXRNZXRhZGF0YSgncGFyYW1ldGVycycsIHR5cGVPckZ1bmMpO1xuICAgICAgdmFyIHBhcmFtVHlwZXMgPSB0aGlzLl9yZWZsZWN0LmdldE1ldGFkYXRhKCdkZXNpZ246cGFyYW10eXBlcycsIHR5cGVPckZ1bmMpO1xuICAgICAgaWYgKGlzUHJlc2VudChwYXJhbVR5cGVzKSB8fCBpc1ByZXNlbnQocGFyYW1Bbm5vdGF0aW9ucykpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ppcFR5cGVzQW5kQW5ub3RhdGlvbnMocGFyYW1UeXBlcywgcGFyYW1Bbm5vdGF0aW9ucyk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFRoZSBhcnJheSBoYXMgdG8gYmUgZmlsbGVkIHdpdGggYHVuZGVmaW5lZGAgYmVjYXVzZSBob2xlcyB3b3VsZCBiZSBza2lwcGVkIGJ5IGBzb21lYFxuICAgIGxldCBwYXJhbWV0ZXJzID0gbmV3IEFycmF5KCg8YW55PnR5cGVPckZ1bmMubGVuZ3RoKSk7XG4gICAgcGFyYW1ldGVycy5maWxsKHVuZGVmaW5lZCk7XG4gICAgcmV0dXJuIHBhcmFtZXRlcnM7XG4gIH1cblxuICBhbm5vdGF0aW9ucyh0eXBlT3JGdW5jOiBUeXBlKTogYW55W10ge1xuICAgIC8vIFByZWZlciB0aGUgZGlyZWN0IEFQSS5cbiAgICBpZiAoaXNQcmVzZW50KCg8YW55PnR5cGVPckZ1bmMpLmFubm90YXRpb25zKSkge1xuICAgICAgdmFyIGFubm90YXRpb25zID0gKDxhbnk+dHlwZU9yRnVuYykuYW5ub3RhdGlvbnM7XG4gICAgICBpZiAoaXNGdW5jdGlvbihhbm5vdGF0aW9ucykgJiYgYW5ub3RhdGlvbnMuYW5ub3RhdGlvbnMpIHtcbiAgICAgICAgYW5ub3RhdGlvbnMgPSBhbm5vdGF0aW9ucy5hbm5vdGF0aW9ucztcbiAgICAgIH1cbiAgICAgIHJldHVybiBhbm5vdGF0aW9ucztcbiAgICB9XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl9yZWZsZWN0KSAmJiBpc1ByZXNlbnQodGhpcy5fcmVmbGVjdC5nZXRNZXRhZGF0YSkpIHtcbiAgICAgIHZhciBhbm5vdGF0aW9ucyA9IHRoaXMuX3JlZmxlY3QuZ2V0TWV0YWRhdGEoJ2Fubm90YXRpb25zJywgdHlwZU9yRnVuYyk7XG4gICAgICBpZiAoaXNQcmVzZW50KGFubm90YXRpb25zKSkgcmV0dXJuIGFubm90YXRpb25zO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBwcm9wTWV0YWRhdGEodHlwZU9yRnVuYzogYW55KToge1trZXk6IHN0cmluZ106IGFueVtdfSB7XG4gICAgLy8gUHJlZmVyIHRoZSBkaXJlY3QgQVBJLlxuICAgIGlmIChpc1ByZXNlbnQoKDxhbnk+dHlwZU9yRnVuYykucHJvcE1ldGFkYXRhKSkge1xuICAgICAgdmFyIHByb3BNZXRhZGF0YSA9ICg8YW55PnR5cGVPckZ1bmMpLnByb3BNZXRhZGF0YTtcbiAgICAgIGlmIChpc0Z1bmN0aW9uKHByb3BNZXRhZGF0YSkgJiYgcHJvcE1ldGFkYXRhLnByb3BNZXRhZGF0YSkge1xuICAgICAgICBwcm9wTWV0YWRhdGEgPSBwcm9wTWV0YWRhdGEucHJvcE1ldGFkYXRhO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHByb3BNZXRhZGF0YTtcbiAgICB9XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl9yZWZsZWN0KSAmJiBpc1ByZXNlbnQodGhpcy5fcmVmbGVjdC5nZXRNZXRhZGF0YSkpIHtcbiAgICAgIHZhciBwcm9wTWV0YWRhdGEgPSB0aGlzLl9yZWZsZWN0LmdldE1ldGFkYXRhKCdwcm9wTWV0YWRhdGEnLCB0eXBlT3JGdW5jKTtcbiAgICAgIGlmIChpc1ByZXNlbnQocHJvcE1ldGFkYXRhKSkgcmV0dXJuIHByb3BNZXRhZGF0YTtcbiAgICB9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgaW50ZXJmYWNlcyh0eXBlOiBUeXBlKTogYW55W10ge1xuICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFwiSmF2YVNjcmlwdCBkb2VzIG5vdCBzdXBwb3J0IGludGVyZmFjZXNcIik7XG4gIH1cblxuICBnZXR0ZXIobmFtZTogc3RyaW5nKTogR2V0dGVyRm4geyByZXR1cm4gPEdldHRlckZuPm5ldyBGdW5jdGlvbignbycsICdyZXR1cm4gby4nICsgbmFtZSArICc7Jyk7IH1cblxuICBzZXR0ZXIobmFtZTogc3RyaW5nKTogU2V0dGVyRm4ge1xuICAgIHJldHVybiA8U2V0dGVyRm4+bmV3IEZ1bmN0aW9uKCdvJywgJ3YnLCAncmV0dXJuIG8uJyArIG5hbWUgKyAnID0gdjsnKTtcbiAgfVxuXG4gIG1ldGhvZChuYW1lOiBzdHJpbmcpOiBNZXRob2RGbiB7XG4gICAgbGV0IGZ1bmN0aW9uQm9keSA9IGBpZiAoIW8uJHtuYW1lfSkgdGhyb3cgbmV3IEVycm9yKCdcIiR7bmFtZX1cIiBpcyB1bmRlZmluZWQnKTtcbiAgICAgICAgcmV0dXJuIG8uJHtuYW1lfS5hcHBseShvLCBhcmdzKTtgO1xuICAgIHJldHVybiA8TWV0aG9kRm4+bmV3IEZ1bmN0aW9uKCdvJywgJ2FyZ3MnLCBmdW5jdGlvbkJvZHkpO1xuICB9XG5cbiAgLy8gVGhlcmUgaXMgbm90IGEgY29uY2VwdCBvZiBpbXBvcnQgdXJpIGluIEpzLCBidXQgdGhpcyBpcyB1c2VmdWwgaW4gZGV2ZWxvcGluZyBEYXJ0IGFwcGxpY2F0aW9ucy5cbiAgaW1wb3J0VXJpKHR5cGU6IFR5cGUpOiBzdHJpbmcgeyByZXR1cm4gYC4vJHtzdHJpbmdpZnkodHlwZSl9YDsgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9