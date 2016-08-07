System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1;
    var _nextClassId, Reflect;
    function extractAnnotation(annotation) {
        if (lang_1.isFunction(annotation) && annotation.hasOwnProperty('annotation')) {
            // it is a decorator, extract annotation
            annotation = annotation.annotation;
        }
        return annotation;
    }
    function applyParams(fnOrArray, key) {
        if (fnOrArray === Object || fnOrArray === String || fnOrArray === Function ||
            fnOrArray === Number || fnOrArray === Array) {
            throw new Error("Can not use native " + lang_1.stringify(fnOrArray) + " as constructor");
        }
        if (lang_1.isFunction(fnOrArray)) {
            return fnOrArray;
        }
        else if (fnOrArray instanceof Array) {
            var annotations = fnOrArray;
            var fn = fnOrArray[fnOrArray.length - 1];
            if (!lang_1.isFunction(fn)) {
                throw new Error("Last position of Class method array must be Function in key " + key + " was '" + lang_1.stringify(fn) + "'");
            }
            var annoLength = annotations.length - 1;
            if (annoLength != fn.length) {
                throw new Error("Number of annotations (" + annoLength + ") does not match number of arguments (" + fn.length + ") in the function: " + lang_1.stringify(fn));
            }
            var paramsAnnotations = [];
            for (var i = 0, ii = annotations.length - 1; i < ii; i++) {
                var paramAnnotations = [];
                paramsAnnotations.push(paramAnnotations);
                var annotation = annotations[i];
                if (annotation instanceof Array) {
                    for (var j = 0; j < annotation.length; j++) {
                        paramAnnotations.push(extractAnnotation(annotation[j]));
                    }
                }
                else if (lang_1.isFunction(annotation)) {
                    paramAnnotations.push(extractAnnotation(annotation));
                }
                else {
                    paramAnnotations.push(annotation);
                }
            }
            Reflect.defineMetadata('parameters', paramsAnnotations, fn);
            return fn;
        }
        else {
            throw new Error("Only Function or Array is supported in Class definition for key '" + key + "' is '" + lang_1.stringify(fnOrArray) + "'");
        }
    }
    /**
     * Provides a way for expressing ES6 classes with parameter annotations in ES5.
     *
     * ## Basic Example
     *
     * ```
     * var Greeter = ng.Class({
     *   constructor: function(name) {
     *     this.name = name;
     *   },
     *
     *   greet: function() {
     *     alert('Hello ' + this.name + '!');
     *   }
     * });
     * ```
     *
     * is equivalent to ES6:
     *
     * ```
     * class Greeter {
     *   constructor(name) {
     *     this.name = name;
     *   }
     *
     *   greet() {
     *     alert('Hello ' + this.name + '!');
     *   }
     * }
     * ```
     *
     * or equivalent to ES5:
     *
     * ```
     * var Greeter = function (name) {
     *   this.name = name;
     * }
     *
     * Greeter.prototype.greet = function () {
     *   alert('Hello ' + this.name + '!');
     * }
     * ```
     *
     * ### Example with parameter annotations
     *
     * ```
     * var MyService = ng.Class({
     *   constructor: [String, [new Query(), QueryList], function(name, queryList) {
     *     ...
     *   }]
     * });
     * ```
     *
     * is equivalent to ES6:
     *
     * ```
     * class MyService {
     *   constructor(name: string, @Query() queryList: QueryList) {
     *     ...
     *   }
     * }
     * ```
     *
     * ### Example with inheritance
     *
     * ```
     * var Shape = ng.Class({
     *   constructor: (color) {
     *     this.color = color;
     *   }
     * });
     *
     * var Square = ng.Class({
     *   extends: Shape,
     *   constructor: function(color, size) {
     *     Shape.call(this, color);
     *     this.size = size;
     *   }
     * });
     * ```
     */
    function Class(clsDef) {
        var constructor = applyParams(clsDef.hasOwnProperty('constructor') ? clsDef.constructor : undefined, 'constructor');
        var proto = constructor.prototype;
        if (clsDef.hasOwnProperty('extends')) {
            if (lang_1.isFunction(clsDef.extends)) {
                constructor.prototype = proto =
                    Object.create(clsDef.extends.prototype);
            }
            else {
                throw new Error("Class definition 'extends' property must be a constructor function was: " + lang_1.stringify(clsDef.extends));
            }
        }
        for (var key in clsDef) {
            if (key != 'extends' && key != 'prototype' && clsDef.hasOwnProperty(key)) {
                proto[key] = applyParams(clsDef[key], key);
            }
        }
        if (this && this.annotations instanceof Array) {
            Reflect.defineMetadata('annotations', this.annotations, constructor);
        }
        if (!constructor['name']) {
            constructor['overriddenName'] = "class" + _nextClassId++;
        }
        return constructor;
    }
    exports_1("Class", Class);
    function makeDecorator(annotationCls, chainFn) {
        if (chainFn === void 0) { chainFn = null; }
        function DecoratorFactory(objOrType) {
            var annotationInstance = new annotationCls(objOrType);
            if (this instanceof annotationCls) {
                return annotationInstance;
            }
            else {
                var chainAnnotation = lang_1.isFunction(this) && this.annotations instanceof Array ? this.annotations : [];
                chainAnnotation.push(annotationInstance);
                var TypeDecorator = function TypeDecorator(cls) {
                    var annotations = Reflect.getOwnMetadata('annotations', cls);
                    annotations = annotations || [];
                    annotations.push(annotationInstance);
                    Reflect.defineMetadata('annotations', annotations, cls);
                    return cls;
                };
                TypeDecorator.annotations = chainAnnotation;
                TypeDecorator.Class = Class;
                if (chainFn)
                    chainFn(TypeDecorator);
                return TypeDecorator;
            }
        }
        DecoratorFactory.prototype = Object.create(annotationCls.prototype);
        return DecoratorFactory;
    }
    exports_1("makeDecorator", makeDecorator);
    function makeParamDecorator(annotationCls) {
        function ParamDecoratorFactory() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var annotationInstance = Object.create(annotationCls.prototype);
            annotationCls.apply(annotationInstance, args);
            if (this instanceof annotationCls) {
                return annotationInstance;
            }
            else {
                ParamDecorator.annotation = annotationInstance;
                return ParamDecorator;
            }
            function ParamDecorator(cls, unusedKey, index) {
                var parameters = Reflect.getMetadata('parameters', cls);
                parameters = parameters || [];
                // there might be gaps if some in between parameters do not have annotations.
                // we pad with nulls.
                while (parameters.length <= index) {
                    parameters.push(null);
                }
                parameters[index] = parameters[index] || [];
                var annotationsForParam = parameters[index];
                annotationsForParam.push(annotationInstance);
                Reflect.defineMetadata('parameters', parameters, cls);
                return cls;
            }
        }
        ParamDecoratorFactory.prototype = Object.create(annotationCls.prototype);
        return ParamDecoratorFactory;
    }
    exports_1("makeParamDecorator", makeParamDecorator);
    function makePropDecorator(decoratorCls) {
        function PropDecoratorFactory() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var decoratorInstance = Object.create(decoratorCls.prototype);
            decoratorCls.apply(decoratorInstance, args);
            if (this instanceof decoratorCls) {
                return decoratorInstance;
            }
            else {
                return function PropDecorator(target, name) {
                    var meta = Reflect.getOwnMetadata('propMetadata', target.constructor);
                    meta = meta || {};
                    meta[name] = meta[name] || [];
                    meta[name].unshift(decoratorInstance);
                    Reflect.defineMetadata('propMetadata', meta, target.constructor);
                };
            }
        }
        PropDecoratorFactory.prototype = Object.create(decoratorCls.prototype);
        return PropDecoratorFactory;
    }
    exports_1("makePropDecorator", makePropDecorator);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            _nextClassId = 0;
            Reflect = lang_1.global.Reflect;
            // Throw statement at top-level is disallowed by closure compiler in ES6 input.
            // Wrap in an IIFE as a work-around.
            (function checkReflect() {
                if (!(Reflect && Reflect.getMetadata)) {
                    throw 'reflect-metadata shim is required when using class decorators';
                }
            })();
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvdXRpbC9kZWNvcmF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFFSSxZQUFZLEVBNk9aLE9BQU87SUFqS1gsMkJBQTJCLFVBQWU7UUFDeEMsRUFBRSxDQUFDLENBQUMsaUJBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxVQUFVLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RSx3Q0FBd0M7WUFDeEMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUM7UUFDckMsQ0FBQztRQUNELE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUVELHFCQUFxQixTQUE2QixFQUFFLEdBQVc7UUFDN0QsRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLE1BQU0sSUFBSSxTQUFTLEtBQUssTUFBTSxJQUFJLFNBQVMsS0FBSyxRQUFRO1lBQ3RFLFNBQVMsS0FBSyxNQUFNLElBQUksU0FBUyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDaEQsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBc0IsZ0JBQVMsQ0FBQyxTQUFTLENBQUMsb0JBQWlCLENBQUMsQ0FBQztRQUMvRSxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsaUJBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsTUFBTSxDQUFXLFNBQVMsQ0FBQztRQUM3QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLElBQUksV0FBVyxHQUFVLFNBQVMsQ0FBQztZQUNuQyxJQUFJLEVBQUUsR0FBYSxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNuRCxFQUFFLENBQUMsQ0FBQyxDQUFDLGlCQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNw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QU8sR0FBRyxhQUFNLENBQUMsT0FBTyxDQUFDO1lBQzdCLCtFQUErRTtZQUMvRSxvQ0FBb0M7WUFDcEMsQ0FBQztnQkFDQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RDLE1BQU0sK0RBQStELENBQUM7Z0JBQ3hFLENBQUM7WUFDSCxDQUFDLENBQUMsRUFBRSxDQUFDIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvdXRpbC9kZWNvcmF0b3JzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb25jcmV0ZVR5cGUsIGdsb2JhbCwgVHlwZSwgaXNGdW5jdGlvbiwgc3RyaW5naWZ5fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG52YXIgX25leHRDbGFzc0lkID0gMDtcblxuLyoqXG4gKiBEZWNsYXJlcyB0aGUgaW50ZXJmYWNlIHRvIGJlIHVzZWQgd2l0aCB7QGxpbmsgQ2xhc3N9LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIENsYXNzRGVmaW5pdGlvbiB7XG4gIC8qKlxuICAgKiBPcHRpb25hbCBhcmd1bWVudCBmb3Igc3BlY2lmeWluZyB0aGUgc3VwZXJjbGFzcy5cbiAgICovXG4gIGV4dGVuZHM/OiBUeXBlO1xuXG4gIC8qKlxuICAgKiBSZXF1aXJlZCBjb25zdHJ1Y3RvciBmdW5jdGlvbiBmb3IgYSBjbGFzcy5cbiAgICpcbiAgICogVGhlIGZ1bmN0aW9uIG1heSBiZSBvcHRpb25hbGx5IHdyYXBwZWQgaW4gYW4gYEFycmF5YCwgaW4gd2hpY2ggY2FzZSBhZGRpdGlvbmFsIHBhcmFtZXRlclxuICAgKiBhbm5vdGF0aW9ucyBtYXkgYmUgc3BlY2lmaWVkLlxuICAgKiBUaGUgbnVtYmVyIG9mIGFyZ3VtZW50cyBhbmQgdGhlIG51bWJlciBvZiBwYXJhbWV0ZXIgYW5ub3RhdGlvbnMgbXVzdCBtYXRjaC5cbiAgICpcbiAgICogU2VlIHtAbGluayBDbGFzc30gZm9yIGV4YW1wbGUgb2YgdXNhZ2UuXG4gICAqL1xuICBjb25zdHJ1Y3RvcjogRnVuY3Rpb24gfCBhbnlbXTtcblxuICAvKipcbiAgICogT3RoZXIgbWV0aG9kcyBvbiB0aGUgY2xhc3MuIE5vdGUgdGhhdCB2YWx1ZXMgc2hvdWxkIGhhdmUgdHlwZSAnRnVuY3Rpb24nIGJ1dCBUUyByZXF1aXJlc1xuICAgKiBhbGwgcHJvcGVydGllcyB0byBoYXZlIGEgbmFycm93ZXIgdHlwZSB0aGFuIHRoZSBpbmRleCBzaWduYXR1cmUuXG4gICAqL1xuICBbeDogc3RyaW5nXTogVHlwZSB8IEZ1bmN0aW9uIHwgYW55W107XG59XG5cbi8qKlxuICogQW4gaW50ZXJmYWNlIGltcGxlbWVudGVkIGJ5IGFsbCBBbmd1bGFyIHR5cGUgZGVjb3JhdG9ycywgd2hpY2ggYWxsb3dzIHRoZW0gdG8gYmUgdXNlZCBhcyBFUzdcbiAqIGRlY29yYXRvcnMgYXMgd2VsbCBhc1xuICogQW5ndWxhciBEU0wgc3ludGF4LlxuICpcbiAqIERTTCBzeW50YXg6XG4gKlxuICogYGBgXG4gKiB2YXIgTXlDbGFzcyA9IG5nXG4gKiAgIC5Db21wb25lbnQoey4uLn0pXG4gKiAgIC5WaWV3KHsuLi59KVxuICogICAuQ2xhc3Moey4uLn0pO1xuICogYGBgXG4gKlxuICogRVM3IHN5bnRheDpcbiAqXG4gKiBgYGBcbiAqIEBuZy5Db21wb25lbnQoey4uLn0pXG4gKiBAbmcuVmlldyh7Li4ufSlcbiAqIGNsYXNzIE15Q2xhc3Mgey4uLn1cbiAqIGBgYFxuICovXG5leHBvcnQgaW50ZXJmYWNlIFR5cGVEZWNvcmF0b3Ige1xuICAvKipcbiAgICogSW52b2tlIGFzIEVTNyBkZWNvcmF0b3IuXG4gICAqL1xuICA8VCBleHRlbmRzIFR5cGU+KHR5cGU6IFQpOiBUO1xuXG4gIC8vIE1ha2UgVHlwZURlY29yYXRvciBhc3NpZ25hYmxlIHRvIGJ1aWx0LWluIFBhcmFtZXRlckRlY29yYXRvciB0eXBlLlxuICAvLyBQYXJhbWV0ZXJEZWNvcmF0b3IgaXMgZGVjbGFyZWQgaW4gbGliLmQudHMgYXMgYSBgZGVjbGFyZSB0eXBlYFxuICAvLyBzbyB3ZSBjYW5ub3QgZGVjbGFyZSB0aGlzIGludGVyZmFjZSBhcyBhIHN1YnR5cGUuXG4gIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8zMzc5I2lzc3VlY29tbWVudC0xMjYxNjk0MTdcbiAgKHRhcmdldDogT2JqZWN0LCBwcm9wZXJ0eUtleT86IHN0cmluZyB8IHN5bWJvbCwgcGFyYW1ldGVySW5kZXg/OiBudW1iZXIpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBTdG9yYWdlIGZvciB0aGUgYWNjdW11bGF0ZWQgYW5ub3RhdGlvbnMgc28gZmFyIHVzZWQgYnkgdGhlIERTTCBzeW50YXguXG4gICAqXG4gICAqIFVzZWQgYnkge0BsaW5rIENsYXNzfSB0byBhbm5vdGF0ZSB0aGUgZ2VuZXJhdGVkIGNsYXNzLlxuICAgKi9cbiAgYW5ub3RhdGlvbnM6IGFueVtdO1xuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBhIGNsYXNzIGZyb20gdGhlIGRlZmluaXRpb24gYW5kIGFubm90YXRlIGl0IHdpdGgge0BsaW5rIFR5cGVEZWNvcmF0b3IjYW5ub3RhdGlvbnN9LlxuICAgKi9cbiAgQ2xhc3Mob2JqOiBDbGFzc0RlZmluaXRpb24pOiBDb25jcmV0ZVR5cGU7XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RBbm5vdGF0aW9uKGFubm90YXRpb246IGFueSk6IGFueSB7XG4gIGlmIChpc0Z1bmN0aW9uKGFubm90YXRpb24pICYmIGFubm90YXRpb24uaGFzT3duUHJvcGVydHkoJ2Fubm90YXRpb24nKSkge1xuICAgIC8vIGl0IGlzIGEgZGVjb3JhdG9yLCBleHRyYWN0IGFubm90YXRpb25cbiAgICBhbm5vdGF0aW9uID0gYW5ub3RhdGlvbi5hbm5vdGF0aW9uO1xuICB9XG4gIHJldHVybiBhbm5vdGF0aW9uO1xufVxuXG5mdW5jdGlvbiBhcHBseVBhcmFtcyhmbk9yQXJyYXk6IChGdW5jdGlvbiB8IGFueVtdKSwga2V5OiBzdHJpbmcpOiBGdW5jdGlvbiB7XG4gIGlmIChmbk9yQXJyYXkgPT09IE9iamVjdCB8fCBmbk9yQXJyYXkgPT09IFN0cmluZyB8fCBmbk9yQXJyYXkgPT09IEZ1bmN0aW9uIHx8XG4gICAgICBmbk9yQXJyYXkgPT09IE51bWJlciB8fCBmbk9yQXJyYXkgPT09IEFycmF5KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBDYW4gbm90IHVzZSBuYXRpdmUgJHtzdHJpbmdpZnkoZm5PckFycmF5KX0gYXMgY29uc3RydWN0b3JgKTtcbiAgfVxuICBpZiAoaXNGdW5jdGlvbihmbk9yQXJyYXkpKSB7XG4gICAgcmV0dXJuIDxGdW5jdGlvbj5mbk9yQXJyYXk7XG4gIH0gZWxzZSBpZiAoZm5PckFycmF5IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICB2YXIgYW5ub3RhdGlvbnM6IGFueVtdID0gZm5PckFycmF5O1xuICAgIHZhciBmbjogRnVuY3Rpb24gPSBmbk9yQXJyYXlbZm5PckFycmF5Lmxlbmd0aCAtIDFdO1xuICAgIGlmICghaXNGdW5jdGlvbihmbikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgTGFzdCBwb3NpdGlvbiBvZiBDbGFzcyBtZXRob2QgYXJyYXkgbXVzdCBiZSBGdW5jdGlvbiBpbiBrZXkgJHtrZXl9IHdhcyAnJHtzdHJpbmdpZnkoZm4pfSdgKTtcbiAgICB9XG4gICAgdmFyIGFubm9MZW5ndGggPSBhbm5vdGF0aW9ucy5sZW5ndGggLSAxO1xuICAgIGlmIChhbm5vTGVuZ3RoICE9IGZuLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBOdW1iZXIgb2YgYW5ub3RhdGlvbnMgKCR7YW5ub0xlbmd0aH0pIGRvZXMgbm90IG1hdGNoIG51bWJlciBvZiBhcmd1bWVudHMgKCR7Zm4ubGVuZ3RofSkgaW4gdGhlIGZ1bmN0aW9uOiAke3N0cmluZ2lmeShmbil9YCk7XG4gICAgfVxuICAgIHZhciBwYXJhbXNBbm5vdGF0aW9uczogYW55W11bXSA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBpaSA9IGFubm90YXRpb25zLmxlbmd0aCAtIDE7IGkgPCBpaTsgaSsrKSB7XG4gICAgICB2YXIgcGFyYW1Bbm5vdGF0aW9uczogYW55W10gPSBbXTtcbiAgICAgIHBhcmFtc0Fubm90YXRpb25zLnB1c2gocGFyYW1Bbm5vdGF0aW9ucyk7XG4gICAgICB2YXIgYW5ub3RhdGlvbiA9IGFubm90YXRpb25zW2ldO1xuICAgICAgaWYgKGFubm90YXRpb24gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGFubm90YXRpb24ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBwYXJhbUFubm90YXRpb25zLnB1c2goZXh0cmFjdEFubm90YXRpb24oYW5ub3RhdGlvbltqXSkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24oYW5ub3RhdGlvbikpIHtcbiAgICAgICAgcGFyYW1Bbm5vdGF0aW9ucy5wdXNoKGV4dHJhY3RBbm5vdGF0aW9uKGFubm90YXRpb24pKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmFtQW5ub3RhdGlvbnMucHVzaChhbm5vdGF0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YSgncGFyYW1ldGVycycsIHBhcmFtc0Fubm90YXRpb25zLCBmbik7XG4gICAgcmV0dXJuIGZuO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYE9ubHkgRnVuY3Rpb24gb3IgQXJyYXkgaXMgc3VwcG9ydGVkIGluIENsYXNzIGRlZmluaXRpb24gZm9yIGtleSAnJHtrZXl9JyBpcyAnJHtzdHJpbmdpZnkoZm5PckFycmF5KX0nYCk7XG4gIH1cbn1cblxuLyoqXG4gKiBQcm92aWRlcyBhIHdheSBmb3IgZXhwcmVzc2luZyBFUzYgY2xhc3NlcyB3aXRoIHBhcmFtZXRlciBhbm5vdGF0aW9ucyBpbiBFUzUuXG4gKlxuICogIyMgQmFzaWMgRXhhbXBsZVxuICpcbiAqIGBgYFxuICogdmFyIEdyZWV0ZXIgPSBuZy5DbGFzcyh7XG4gKiAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbihuYW1lKSB7XG4gKiAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAqICAgfSxcbiAqXG4gKiAgIGdyZWV0OiBmdW5jdGlvbigpIHtcbiAqICAgICBhbGVydCgnSGVsbG8gJyArIHRoaXMubmFtZSArICchJyk7XG4gKiAgIH1cbiAqIH0pO1xuICogYGBgXG4gKlxuICogaXMgZXF1aXZhbGVudCB0byBFUzY6XG4gKlxuICogYGBgXG4gKiBjbGFzcyBHcmVldGVyIHtcbiAqICAgY29uc3RydWN0b3IobmFtZSkge1xuICogICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gKiAgIH1cbiAqXG4gKiAgIGdyZWV0KCkge1xuICogICAgIGFsZXJ0KCdIZWxsbyAnICsgdGhpcy5uYW1lICsgJyEnKTtcbiAqICAgfVxuICogfVxuICogYGBgXG4gKlxuICogb3IgZXF1aXZhbGVudCB0byBFUzU6XG4gKlxuICogYGBgXG4gKiB2YXIgR3JlZXRlciA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gKiAgIHRoaXMubmFtZSA9IG5hbWU7XG4gKiB9XG4gKlxuICogR3JlZXRlci5wcm90b3R5cGUuZ3JlZXQgPSBmdW5jdGlvbiAoKSB7XG4gKiAgIGFsZXJ0KCdIZWxsbyAnICsgdGhpcy5uYW1lICsgJyEnKTtcbiAqIH1cbiAqIGBgYFxuICpcbiAqICMjIyBFeGFtcGxlIHdpdGggcGFyYW1ldGVyIGFubm90YXRpb25zXG4gKlxuICogYGBgXG4gKiB2YXIgTXlTZXJ2aWNlID0gbmcuQ2xhc3Moe1xuICogICBjb25zdHJ1Y3RvcjogW1N0cmluZywgW25ldyBRdWVyeSgpLCBRdWVyeUxpc3RdLCBmdW5jdGlvbihuYW1lLCBxdWVyeUxpc3QpIHtcbiAqICAgICAuLi5cbiAqICAgfV1cbiAqIH0pO1xuICogYGBgXG4gKlxuICogaXMgZXF1aXZhbGVudCB0byBFUzY6XG4gKlxuICogYGBgXG4gKiBjbGFzcyBNeVNlcnZpY2Uge1xuICogICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIEBRdWVyeSgpIHF1ZXJ5TGlzdDogUXVlcnlMaXN0KSB7XG4gKiAgICAgLi4uXG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICpcbiAqICMjIyBFeGFtcGxlIHdpdGggaW5oZXJpdGFuY2VcbiAqXG4gKiBgYGBcbiAqIHZhciBTaGFwZSA9IG5nLkNsYXNzKHtcbiAqICAgY29uc3RydWN0b3I6IChjb2xvcikge1xuICogICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAqICAgfVxuICogfSk7XG4gKlxuICogdmFyIFNxdWFyZSA9IG5nLkNsYXNzKHtcbiAqICAgZXh0ZW5kczogU2hhcGUsXG4gKiAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbihjb2xvciwgc2l6ZSkge1xuICogICAgIFNoYXBlLmNhbGwodGhpcywgY29sb3IpO1xuICogICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gKiAgIH1cbiAqIH0pO1xuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDbGFzcyhjbHNEZWY6IENsYXNzRGVmaW5pdGlvbik6IENvbmNyZXRlVHlwZSB7XG4gIHZhciBjb25zdHJ1Y3RvciA9IGFwcGx5UGFyYW1zKFxuICAgICAgY2xzRGVmLmhhc093blByb3BlcnR5KCdjb25zdHJ1Y3RvcicpID8gY2xzRGVmLmNvbnN0cnVjdG9yIDogdW5kZWZpbmVkLCAnY29uc3RydWN0b3InKTtcbiAgdmFyIHByb3RvID0gY29uc3RydWN0b3IucHJvdG90eXBlO1xuICBpZiAoY2xzRGVmLmhhc093blByb3BlcnR5KCdleHRlbmRzJykpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihjbHNEZWYuZXh0ZW5kcykpIHtcbiAgICAgICg8RnVuY3Rpb24+Y29uc3RydWN0b3IpLnByb3RvdHlwZSA9IHByb3RvID1cbiAgICAgICAgICBPYmplY3QuY3JlYXRlKCg8RnVuY3Rpb24+Y2xzRGVmLmV4dGVuZHMpLnByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgQ2xhc3MgZGVmaW5pdGlvbiAnZXh0ZW5kcycgcHJvcGVydHkgbXVzdCBiZSBhIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHdhczogJHtzdHJpbmdpZnkoY2xzRGVmLmV4dGVuZHMpfWApO1xuICAgIH1cbiAgfVxuICBmb3IgKHZhciBrZXkgaW4gY2xzRGVmKSB7XG4gICAgaWYgKGtleSAhPSAnZXh0ZW5kcycgJiYga2V5ICE9ICdwcm90b3R5cGUnICYmIGNsc0RlZi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBwcm90b1trZXldID0gYXBwbHlQYXJhbXMoY2xzRGVmW2tleV0sIGtleSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHRoaXMgJiYgdGhpcy5hbm5vdGF0aW9ucyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YSgnYW5ub3RhdGlvbnMnLCB0aGlzLmFubm90YXRpb25zLCBjb25zdHJ1Y3Rvcik7XG4gIH1cblxuICBpZiAoIWNvbnN0cnVjdG9yWyduYW1lJ10pIHtcbiAgICBjb25zdHJ1Y3Rvclsnb3ZlcnJpZGRlbk5hbWUnXSA9IGBjbGFzcyR7X25leHRDbGFzc0lkKyt9YDtcbiAgfVxuXG4gIHJldHVybiA8Q29uY3JldGVUeXBlPmNvbnN0cnVjdG9yO1xufVxuXG52YXIgUmVmbGVjdCA9IGdsb2JhbC5SZWZsZWN0O1xuLy8gVGhyb3cgc3RhdGVtZW50IGF0IHRvcC1sZXZlbCBpcyBkaXNhbGxvd2VkIGJ5IGNsb3N1cmUgY29tcGlsZXIgaW4gRVM2IGlucHV0LlxuLy8gV3JhcCBpbiBhbiBJSUZFIGFzIGEgd29yay1hcm91bmQuXG4oZnVuY3Rpb24gY2hlY2tSZWZsZWN0KCkge1xuICBpZiAoIShSZWZsZWN0ICYmIFJlZmxlY3QuZ2V0TWV0YWRhdGEpKSB7XG4gICAgdGhyb3cgJ3JlZmxlY3QtbWV0YWRhdGEgc2hpbSBpcyByZXF1aXJlZCB3aGVuIHVzaW5nIGNsYXNzIGRlY29yYXRvcnMnO1xuICB9XG59KSgpO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFrZURlY29yYXRvcihcbiAgICBhbm5vdGF0aW9uQ2xzLCBjaGFpbkZuOiAoZm46IEZ1bmN0aW9uKSA9PiB2b2lkID0gbnVsbCk6ICguLi5hcmdzOiBhbnlbXSkgPT4gKGNsczogYW55KSA9PiBhbnkge1xuICBmdW5jdGlvbiBEZWNvcmF0b3JGYWN0b3J5KG9iak9yVHlwZSk6IChjbHM6IGFueSkgPT4gYW55IHtcbiAgICB2YXIgYW5ub3RhdGlvbkluc3RhbmNlID0gbmV3ICg8YW55PmFubm90YXRpb25DbHMpKG9iak9yVHlwZSk7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBhbm5vdGF0aW9uQ2xzKSB7XG4gICAgICByZXR1cm4gYW5ub3RhdGlvbkluc3RhbmNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgY2hhaW5Bbm5vdGF0aW9uID1cbiAgICAgICAgICBpc0Z1bmN0aW9uKHRoaXMpICYmIHRoaXMuYW5ub3RhdGlvbnMgaW5zdGFuY2VvZiBBcnJheSA/IHRoaXMuYW5ub3RhdGlvbnMgOiBbXTtcbiAgICAgIGNoYWluQW5ub3RhdGlvbi5wdXNoKGFubm90YXRpb25JbnN0YW5jZSk7XG4gICAgICB2YXIgVHlwZURlY29yYXRvcjogVHlwZURlY29yYXRvciA9IDxUeXBlRGVjb3JhdG9yPmZ1bmN0aW9uIFR5cGVEZWNvcmF0b3IoY2xzKSB7XG4gICAgICAgIHZhciBhbm5vdGF0aW9ucyA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGEoJ2Fubm90YXRpb25zJywgY2xzKTtcbiAgICAgICAgYW5ub3RhdGlvbnMgPSBhbm5vdGF0aW9ucyB8fCBbXTtcbiAgICAgICAgYW5ub3RhdGlvbnMucHVzaChhbm5vdGF0aW9uSW5zdGFuY2UpO1xuICAgICAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKCdhbm5vdGF0aW9ucycsIGFubm90YXRpb25zLCBjbHMpO1xuICAgICAgICByZXR1cm4gY2xzO1xuICAgICAgfTtcbiAgICAgIFR5cGVEZWNvcmF0b3IuYW5ub3RhdGlvbnMgPSBjaGFpbkFubm90YXRpb247XG4gICAgICBUeXBlRGVjb3JhdG9yLkNsYXNzID0gQ2xhc3M7XG4gICAgICBpZiAoY2hhaW5GbikgY2hhaW5GbihUeXBlRGVjb3JhdG9yKTtcbiAgICAgIHJldHVybiBUeXBlRGVjb3JhdG9yO1xuICAgIH1cbiAgfVxuICBEZWNvcmF0b3JGYWN0b3J5LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoYW5ub3RhdGlvbkNscy5wcm90b3R5cGUpO1xuICByZXR1cm4gRGVjb3JhdG9yRmFjdG9yeTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VQYXJhbURlY29yYXRvcihhbm5vdGF0aW9uQ2xzKTogYW55IHtcbiAgZnVuY3Rpb24gUGFyYW1EZWNvcmF0b3JGYWN0b3J5KC4uLmFyZ3MpOiBhbnkge1xuICAgIHZhciBhbm5vdGF0aW9uSW5zdGFuY2UgPSBPYmplY3QuY3JlYXRlKGFubm90YXRpb25DbHMucHJvdG90eXBlKTtcbiAgICBhbm5vdGF0aW9uQ2xzLmFwcGx5KGFubm90YXRpb25JbnN0YW5jZSwgYXJncyk7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBhbm5vdGF0aW9uQ2xzKSB7XG4gICAgICByZXR1cm4gYW5ub3RhdGlvbkluc3RhbmNlO1xuICAgIH0gZWxzZSB7XG4gICAgICAoPGFueT5QYXJhbURlY29yYXRvcikuYW5ub3RhdGlvbiA9IGFubm90YXRpb25JbnN0YW5jZTtcbiAgICAgIHJldHVybiBQYXJhbURlY29yYXRvcjtcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIFBhcmFtRGVjb3JhdG9yKGNscywgdW51c2VkS2V5LCBpbmRleCk6IGFueSB7XG4gICAgICB2YXIgcGFyYW1ldGVyczogYW55W11bXSA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ3BhcmFtZXRlcnMnLCBjbHMpO1xuICAgICAgcGFyYW1ldGVycyA9IHBhcmFtZXRlcnMgfHwgW107XG5cbiAgICAgIC8vIHRoZXJlIG1pZ2h0IGJlIGdhcHMgaWYgc29tZSBpbiBiZXR3ZWVuIHBhcmFtZXRlcnMgZG8gbm90IGhhdmUgYW5ub3RhdGlvbnMuXG4gICAgICAvLyB3ZSBwYWQgd2l0aCBudWxscy5cbiAgICAgIHdoaWxlIChwYXJhbWV0ZXJzLmxlbmd0aCA8PSBpbmRleCkge1xuICAgICAgICBwYXJhbWV0ZXJzLnB1c2gobnVsbCk7XG4gICAgICB9XG5cbiAgICAgIHBhcmFtZXRlcnNbaW5kZXhdID0gcGFyYW1ldGVyc1tpbmRleF0gfHwgW107XG4gICAgICB2YXIgYW5ub3RhdGlvbnNGb3JQYXJhbTogYW55W10gPSBwYXJhbWV0ZXJzW2luZGV4XTtcbiAgICAgIGFubm90YXRpb25zRm9yUGFyYW0ucHVzaChhbm5vdGF0aW9uSW5zdGFuY2UpO1xuXG4gICAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKCdwYXJhbWV0ZXJzJywgcGFyYW1ldGVycywgY2xzKTtcbiAgICAgIHJldHVybiBjbHM7XG4gICAgfVxuICB9XG4gIFBhcmFtRGVjb3JhdG9yRmFjdG9yeS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKGFubm90YXRpb25DbHMucHJvdG90eXBlKTtcbiAgcmV0dXJuIFBhcmFtRGVjb3JhdG9yRmFjdG9yeTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VQcm9wRGVjb3JhdG9yKGRlY29yYXRvckNscyk6IGFueSB7XG4gIGZ1bmN0aW9uIFByb3BEZWNvcmF0b3JGYWN0b3J5KC4uLmFyZ3MpOiBhbnkge1xuICAgIHZhciBkZWNvcmF0b3JJbnN0YW5jZSA9IE9iamVjdC5jcmVhdGUoZGVjb3JhdG9yQ2xzLnByb3RvdHlwZSk7XG4gICAgZGVjb3JhdG9yQ2xzLmFwcGx5KGRlY29yYXRvckluc3RhbmNlLCBhcmdzKTtcblxuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgZGVjb3JhdG9yQ2xzKSB7XG4gICAgICByZXR1cm4gZGVjb3JhdG9ySW5zdGFuY2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBQcm9wRGVjb3JhdG9yKHRhcmdldDogYW55LCBuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdmFyIG1ldGEgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhKCdwcm9wTWV0YWRhdGEnLCB0YXJnZXQuY29uc3RydWN0b3IpO1xuICAgICAgICBtZXRhID0gbWV0YSB8fCB7fTtcbiAgICAgICAgbWV0YVtuYW1lXSA9IG1ldGFbbmFtZV0gfHwgW107XG4gICAgICAgIG1ldGFbbmFtZV0udW5zaGlmdChkZWNvcmF0b3JJbnN0YW5jZSk7XG4gICAgICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoJ3Byb3BNZXRhZGF0YScsIG1ldGEsIHRhcmdldC5jb25zdHJ1Y3Rvcik7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuICBQcm9wRGVjb3JhdG9yRmFjdG9yeS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKGRlY29yYXRvckNscy5wcm90b3R5cGUpO1xuICByZXR1cm4gUHJvcERlY29yYXRvckZhY3Rvcnk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
