System.register(['angular2/core', './constants', './util', './angular_js'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, constants_1, util_1, angular;
    var CAMEL_CASE, INITIAL_VALUE, NOT_SUPPORTED, UpgradeNg1ComponentAdapterBuilder, UpgradeNg1ComponentAdapter;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (angular_1) {
                angular = angular_1;
            }],
        execute: function() {
            CAMEL_CASE = /([A-Z])/g;
            INITIAL_VALUE = {
                __UNINITIALIZED__: true
            };
            NOT_SUPPORTED = 'NOT_SUPPORTED';
            UpgradeNg1ComponentAdapterBuilder = (function () {
                function UpgradeNg1ComponentAdapterBuilder(name) {
                    this.name = name;
                    this.inputs = [];
                    this.inputsRename = [];
                    this.outputs = [];
                    this.outputsRename = [];
                    this.propertyOutputs = [];
                    this.checkProperties = [];
                    this.propertyMap = {};
                    this.linkFn = null;
                    this.directive = null;
                    this.$controller = null;
                    var selector = name.replace(CAMEL_CASE, function (all, next) { return '-' + next.toLowerCase(); });
                    var self = this;
                    this.type =
                        core_1.Directive({ selector: selector, inputs: this.inputsRename, outputs: this.outputsRename })
                            .Class({
                            constructor: [
                                new core_1.Inject(constants_1.NG1_SCOPE),
                                core_1.ElementRef,
                                function (scope, elementRef) {
                                    return new UpgradeNg1ComponentAdapter(self.linkFn, scope, self.directive, elementRef, self.$controller, self.inputs, self.outputs, self.propertyOutputs, self.checkProperties, self.propertyMap);
                                }
                            ],
                            ngOnChanges: function () { },
                            ngDoCheck: function () { }
                        });
                }
                UpgradeNg1ComponentAdapterBuilder.prototype.extractDirective = function (injector) {
                    var directives = injector.get(this.name + 'Directive');
                    if (directives.length > 1) {
                        throw new Error('Only support single directive definition for: ' + this.name);
                    }
                    var directive = directives[0];
                    if (directive.replace)
                        this.notSupported('replace');
                    if (directive.terminal)
                        this.notSupported('terminal');
                    var link = directive.link;
                    if (typeof link == 'object') {
                        if (link.post)
                            this.notSupported('link.post');
                    }
                    return directive;
                };
                UpgradeNg1ComponentAdapterBuilder.prototype.notSupported = function (feature) {
                    throw new Error("Upgraded directive '" + this.name + "' does not support '" + feature + "'.");
                };
                UpgradeNg1ComponentAdapterBuilder.prototype.extractBindings = function () {
                    var btcIsObject = typeof this.directive.bindToController === 'object';
                    if (btcIsObject && Object.keys(this.directive.scope).length) {
                        throw new Error("Binding definitions on scope and controller at the same time are not supported.");
                    }
                    var context = (btcIsObject) ? this.directive.bindToController : this.directive.scope;
                    if (typeof context == 'object') {
                        for (var name in context) {
                            if (context.hasOwnProperty(name)) {
                                var localName = context[name];
                                var type = localName.charAt(0);
                                localName = localName.substr(1) || name;
                                var outputName = 'output_' + name;
                                var outputNameRename = outputName + ': ' + name;
                                var outputNameRenameChange = outputName + ': ' + name + 'Change';
                                var inputName = 'input_' + name;
                                var inputNameRename = inputName + ': ' + name;
                                switch (type) {
                                    case '=':
                                        this.propertyOutputs.push(outputName);
                                        this.checkProperties.push(localName);
                                        this.outputs.push(outputName);
                                        this.outputsRename.push(outputNameRenameChange);
                                        this.propertyMap[outputName] = localName;
                                    // don't break; let it fall through to '@'
                                    case '@':
                                        this.inputs.push(inputName);
                                        this.inputsRename.push(inputNameRename);
                                        this.propertyMap[inputName] = localName;
                                        break;
                                    case '&':
                                        this.outputs.push(outputName);
                                        this.outputsRename.push(outputNameRename);
                                        this.propertyMap[outputName] = localName;
                                        break;
                                    default:
                                        var json = JSON.stringify(context);
                                        throw new Error("Unexpected mapping '" + type + "' in '" + json + "' in '" + this.name + "' directive.");
                                }
                            }
                        }
                    }
                };
                UpgradeNg1ComponentAdapterBuilder.prototype.compileTemplate = function (compile, templateCache, httpBackend) {
                    var _this = this;
                    if (this.directive.template !== undefined) {
                        this.linkFn = compileHtml(this.directive.template);
                    }
                    else if (this.directive.templateUrl) {
                        var url = this.directive.templateUrl;
                        var html = templateCache.get(url);
                        if (html !== undefined) {
                            this.linkFn = compileHtml(html);
                        }
                        else {
                            return new Promise(function (resolve, err) {
                                httpBackend('GET', url, null, function (status, response) {
                                    if (status == 200) {
                                        resolve(_this.linkFn = compileHtml(templateCache.put(url, response)));
                                    }
                                    else {
                                        err("GET " + url + " returned " + status + ": " + response);
                                    }
                                });
                            });
                        }
                    }
                    else {
                        throw new Error("Directive '" + this.name + "' is not a component, it is missing template.");
                    }
                    return null;
                    function compileHtml(html) {
                        var div = document.createElement('div');
                        div.innerHTML = html;
                        return compile(div.childNodes);
                    }
                };
                UpgradeNg1ComponentAdapterBuilder.resolve = function (exportedComponents, injector) {
                    var promises = [];
                    var compile = injector.get(constants_1.NG1_COMPILE);
                    var templateCache = injector.get(constants_1.NG1_TEMPLATE_CACHE);
                    var httpBackend = injector.get(constants_1.NG1_HTTP_BACKEND);
                    var $controller = injector.get(constants_1.NG1_CONTROLLER);
                    for (var name in exportedComponents) {
                        if (exportedComponents.hasOwnProperty(name)) {
                            var exportedComponent = exportedComponents[name];
                            exportedComponent.directive = exportedComponent.extractDirective(injector);
                            exportedComponent.$controller = $controller;
                            exportedComponent.extractBindings();
                            var promise = exportedComponent.compileTemplate(compile, templateCache, httpBackend);
                            if (promise)
                                promises.push(promise);
                        }
                    }
                    return Promise.all(promises);
                };
                return UpgradeNg1ComponentAdapterBuilder;
            }());
            exports_1("UpgradeNg1ComponentAdapterBuilder", UpgradeNg1ComponentAdapterBuilder);
            UpgradeNg1ComponentAdapter = (function () {
                function UpgradeNg1ComponentAdapter(linkFn, scope, directive, elementRef, $controller, inputs, outputs, propOuts, checkProperties, propertyMap) {
                    this.directive = directive;
                    this.inputs = inputs;
                    this.outputs = outputs;
                    this.propOuts = propOuts;
                    this.checkProperties = checkProperties;
                    this.propertyMap = propertyMap;
                    this.destinationObj = null;
                    this.checkLastValues = [];
                    var element = elementRef.nativeElement;
                    var childNodes = [];
                    var childNode;
                    while (childNode = element.firstChild) {
                        element.removeChild(childNode);
                        childNodes.push(childNode);
                    }
                    var componentScope = scope.$new(!!directive.scope);
                    var $element = angular.element(element);
                    var controllerType = directive.controller;
                    var controller = null;
                    if (controllerType) {
                        var locals = { $scope: componentScope, $element: $element };
                        controller = $controller(controllerType, locals, null, directive.controllerAs);
                        $element.data(util_1.controllerKey(directive.name), controller);
                    }
                    var link = directive.link;
                    if (typeof link == 'object')
                        link = link.pre;
                    if (link) {
                        var attrs = NOT_SUPPORTED;
                        var transcludeFn = NOT_SUPPORTED;
                        var linkController = this.resolveRequired($element, directive.require);
                        directive.link(componentScope, $element, attrs, linkController, transcludeFn);
                    }
                    this.destinationObj = directive.bindToController && controller ? controller : componentScope;
                    linkFn(componentScope, function (clonedElement, scope) {
                        for (var i = 0, ii = clonedElement.length; i < ii; i++) {
                            element.appendChild(clonedElement[i]);
                        }
                    }, { parentBoundTranscludeFn: function (scope, cloneAttach) { cloneAttach(childNodes); } });
                    for (var i = 0; i < inputs.length; i++) {
                        this[inputs[i]] = null;
                    }
                    for (var j = 0; j < outputs.length; j++) {
                        var emitter = this[outputs[j]] = new core_1.EventEmitter();
                        this.setComponentProperty(outputs[j], (function (emitter) { return function (value) { return emitter.emit(value); }; })(emitter));
                    }
                    for (var k = 0; k < propOuts.length; k++) {
                        this[propOuts[k]] = new core_1.EventEmitter();
                        this.checkLastValues.push(INITIAL_VALUE);
                    }
                }
                UpgradeNg1ComponentAdapter.prototype.ngOnChanges = function (changes) {
                    for (var name in changes) {
                        if (changes.hasOwnProperty(name)) {
                            var change = changes[name];
                            this.setComponentProperty(name, change.currentValue);
                        }
                    }
                };
                UpgradeNg1ComponentAdapter.prototype.ngDoCheck = function () {
                    var count = 0;
                    var destinationObj = this.destinationObj;
                    var lastValues = this.checkLastValues;
                    var checkProperties = this.checkProperties;
                    for (var i = 0; i < checkProperties.length; i++) {
                        var value = destinationObj[checkProperties[i]];
                        var last = lastValues[i];
                        if (value !== last) {
                            if (typeof value == 'number' && isNaN(value) && typeof last == 'number' && isNaN(last)) {
                            }
                            else {
                                var eventEmitter = this[this.propOuts[i]];
                                eventEmitter.emit(lastValues[i] = value);
                            }
                        }
                    }
                    return count;
                };
                UpgradeNg1ComponentAdapter.prototype.setComponentProperty = function (name, value) {
                    this.destinationObj[this.propertyMap[name]] = value;
                };
                UpgradeNg1ComponentAdapter.prototype.resolveRequired = function ($element, require) {
                    if (!require) {
                        return undefined;
                    }
                    else if (typeof require == 'string') {
                        var name = require;
                        var isOptional = false;
                        var startParent = false;
                        var searchParents = false;
                        var ch;
                        if (name.charAt(0) == '?') {
                            isOptional = true;
                            name = name.substr(1);
                        }
                        if (name.charAt(0) == '^') {
                            searchParents = true;
                            name = name.substr(1);
                        }
                        if (name.charAt(0) == '^') {
                            startParent = true;
                            name = name.substr(1);
                        }
                        var key = util_1.controllerKey(name);
                        if (startParent)
                            $element = $element.parent();
                        var dep = searchParents ? $element.inheritedData(key) : $element.data(key);
                        if (!dep && !isOptional) {
                            throw new Error("Can not locate '" + require + "' in '" + this.directive.name + "'.");
                        }
                        return dep;
                    }
                    else if (require instanceof Array) {
                        var deps = [];
                        for (var i = 0; i < require.length; i++) {
                            deps.push(this.resolveRequired($element, require[i]));
                        }
                        return deps;
                    }
                    throw new Error("Directive '" + this.directive.name + "' require syntax unrecognized: " + this.directive.require);
                };
                return UpgradeNg1ComponentAdapter;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3VwZ3JhZGUvdXBncmFkZV9uZzFfYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBb0JNLFVBQVUsRUFDVixhQUFhLEVBR2IsYUFBYTs7Ozs7Ozs7Ozs7Ozs7OztZQUpiLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDeEIsYUFBYSxHQUFHO2dCQUNwQixpQkFBaUIsRUFBRSxJQUFJO2FBQ3hCLENBQUM7WUFDSSxhQUFhLEdBQVEsZUFBZSxDQUFDO1lBRzNDO2dCQWFFLDJDQUFtQixJQUFZO29CQUFaLFNBQUksR0FBSixJQUFJLENBQVE7b0JBWC9CLFdBQU0sR0FBYSxFQUFFLENBQUM7b0JBQ3RCLGlCQUFZLEdBQWEsRUFBRSxDQUFDO29CQUM1QixZQUFPLEdBQWEsRUFBRSxDQUFDO29CQUN2QixrQkFBYSxHQUFhLEVBQUUsQ0FBQztvQkFDN0Isb0JBQWUsR0FBYSxFQUFFLENBQUM7b0JBQy9CLG9CQUFlLEdBQWEsRUFBRSxDQUFDO29CQUMvQixnQkFBVyxHQUE2QixFQUFFLENBQUM7b0JBQzNDLFdBQU0sR0FBb0IsSUFBSSxDQUFDO29CQUMvQixjQUFTLEdBQXVCLElBQUksQ0FBQztvQkFDckMsZ0JBQVcsR0FBK0IsSUFBSSxDQUFDO29CQUc3QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxVQUFDLEdBQUcsRUFBRSxJQUFZLElBQUssT0FBQSxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUF4QixDQUF3QixDQUFDLENBQUM7b0JBQ3pGLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLElBQUk7d0JBQ0wsZ0JBQVMsQ0FBQyxFQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUMsQ0FBQzs2QkFDbEYs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Q2QsQ0FBQztvQkFDRCxNQUFNLElBQUksS0FBSyxDQUNYLGdCQUFjLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSx1Q0FBa0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFTLENBQUMsQ0FBQztnQkFDbkcsQ0FBQztnQkFDSCxpQ0FBQztZQUFELENBOUhBLEFBOEhDLElBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvdXBncmFkZS91cGdyYWRlX25nMV9hZGFwdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBEb0NoZWNrLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2UsXG4gIFR5cGVcbn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1xuICBORzFfQ09NUElMRSxcbiAgTkcxX1NDT1BFLFxuICBORzFfSFRUUF9CQUNLRU5ELFxuICBORzFfVEVNUExBVEVfQ0FDSEUsXG4gIE5HMV9DT05UUk9MTEVSXG59IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7Y29udHJvbGxlcktleX0gZnJvbSAnLi91dGlsJztcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnLi9hbmd1bGFyX2pzJztcblxuY29uc3QgQ0FNRUxfQ0FTRSA9IC8oW0EtWl0pL2c7XG5jb25zdCBJTklUSUFMX1ZBTFVFID0ge1xuICBfX1VOSU5JVElBTElaRURfXzogdHJ1ZVxufTtcbmNvbnN0IE5PVF9TVVBQT1JURUQ6IGFueSA9ICdOT1RfU1VQUE9SVEVEJztcblxuXG5leHBvcnQgY2xhc3MgVXBncmFkZU5nMUNvbXBvbmVudEFkYXB0ZXJCdWlsZGVyIHtcbiAgdHlwZTogVHlwZTtcbiAgaW5wdXRzOiBzdHJpbmdbXSA9IFtdO1xuICBpbnB1dHNSZW5hbWU6IHN0cmluZ1tdID0gW107XG4gIG91dHB1dHM6IHN0cmluZ1tdID0gW107XG4gIG91dHB1dHNSZW5hbWU6IHN0cmluZ1tdID0gW107XG4gIHByb3BlcnR5T3V0cHV0czogc3RyaW5nW10gPSBbXTtcbiAgY2hlY2tQcm9wZXJ0aWVzOiBzdHJpbmdbXSA9IFtdO1xuICBwcm9wZXJ0eU1hcDoge1tuYW1lOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gIGxpbmtGbjogYW5ndWxhci5JTGlua0ZuID0gbnVsbDtcbiAgZGlyZWN0aXZlOiBhbmd1bGFyLklEaXJlY3RpdmUgPSBudWxsO1xuICAkY29udHJvbGxlcjogYW5ndWxhci5JQ29udHJvbGxlclNlcnZpY2UgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcbiAgICB2YXIgc2VsZWN0b3IgPSBuYW1lLnJlcGxhY2UoQ0FNRUxfQ0FTRSwgKGFsbCwgbmV4dDogc3RyaW5nKSA9PiAnLScgKyBuZXh0LnRvTG93ZXJDYXNlKCkpO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLnR5cGUgPVxuICAgICAgICBEaXJlY3RpdmUoe3NlbGVjdG9yOiBzZWxlY3RvciwgaW5wdXRzOiB0aGlzLmlucHV0c1JlbmFtZSwgb3V0cHV0czogdGhpcy5vdXRwdXRzUmVuYW1lfSlcbiAgICAgICAgICAgIC5DbGFzcyh7XG4gICAgICAgICAgICAgIGNvbnN0cnVjdG9yOiBbXG4gICAgICAgICAgICAgICAgbmV3IEluamVjdChORzFfU0NPUEUpLFxuICAgICAgICAgICAgICAgIEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLCBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFVwZ3JhZGVOZzFDb21wb25lbnRBZGFwdGVyKFxuICAgICAgICAgICAgICAgICAgICAgIHNlbGYubGlua0ZuLCBzY29wZSwgc2VsZi5kaXJlY3RpdmUsIGVsZW1lbnRSZWYsIHNlbGYuJGNvbnRyb2xsZXIsIHNlbGYuaW5wdXRzLFxuICAgICAgICAgICAgICAgICAgICAgIHNlbGYub3V0cHV0cywgc2VsZi5wcm9wZXJ0eU91dHB1dHMsIHNlbGYuY2hlY2tQcm9wZXJ0aWVzLCBzZWxmLnByb3BlcnR5TWFwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIG5nT25DaGFuZ2VzOiBmdW5jdGlvbigpIHsgLyogbmVlZHMgdG8gYmUgaGVyZSBmb3IgbmcyIHRvIHByb3Blcmx5IGRldGVjdCBpdCAqLyB9LFxuICAgICAgICAgICAgICBuZ0RvQ2hlY2s6IGZ1bmN0aW9uKCkgeyAvKiBuZWVkcyB0byBiZSBoZXJlIGZvciBuZzIgdG8gcHJvcGVybHkgZGV0ZWN0IGl0ICovIH1cbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgZXh0cmFjdERpcmVjdGl2ZShpbmplY3RvcjogYW5ndWxhci5JSW5qZWN0b3JTZXJ2aWNlKTogYW5ndWxhci5JRGlyZWN0aXZlIHtcbiAgICB2YXIgZGlyZWN0aXZlczogYW5ndWxhci5JRGlyZWN0aXZlW10gPSBpbmplY3Rvci5nZXQodGhpcy5uYW1lICsgJ0RpcmVjdGl2ZScpO1xuICAgIGlmIChkaXJlY3RpdmVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignT25seSBzdXBwb3J0IHNpbmdsZSBkaXJlY3RpdmUgZGVmaW5pdGlvbiBmb3I6ICcgKyB0aGlzLm5hbWUpO1xuICAgIH1cbiAgICB2YXIgZGlyZWN0aXZlID0gZGlyZWN0aXZlc1swXTtcbiAgICBpZiAoZGlyZWN0aXZlLnJlcGxhY2UpIHRoaXMubm90U3VwcG9ydGVkKCdyZXBsYWNlJyk7XG4gICAgaWYgKGRpcmVjdGl2ZS50ZXJtaW5hbCkgdGhpcy5ub3RTdXBwb3J0ZWQoJ3Rlcm1pbmFsJyk7XG4gICAgdmFyIGxpbmsgPSBkaXJlY3RpdmUubGluaztcbiAgICBpZiAodHlwZW9mIGxpbmsgPT0gJ29iamVjdCcpIHtcbiAgICAgIGlmICgoPGFuZ3VsYXIuSURpcmVjdGl2ZVByZVBvc3Q+bGluaykucG9zdCkgdGhpcy5ub3RTdXBwb3J0ZWQoJ2xpbmsucG9zdCcpO1xuICAgIH1cbiAgICByZXR1cm4gZGlyZWN0aXZlO1xuICB9XG5cbiAgcHJpdmF0ZSBub3RTdXBwb3J0ZWQoZmVhdHVyZTogc3RyaW5nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVcGdyYWRlZCBkaXJlY3RpdmUgJyR7dGhpcy5uYW1lfScgZG9lcyBub3Qgc3VwcG9ydCAnJHtmZWF0dXJlfScuYCk7XG4gIH1cblxuICBleHRyYWN0QmluZGluZ3MoKSB7XG4gICAgdmFyIGJ0Y0lzT2JqZWN0ID0gdHlwZW9mIHRoaXMuZGlyZWN0aXZlLmJpbmRUb0NvbnRyb2xsZXIgPT09ICdvYmplY3QnO1xuICAgIGlmIChidGNJc09iamVjdCAmJiBPYmplY3Qua2V5cyh0aGlzLmRpcmVjdGl2ZS5zY29wZSkubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYEJpbmRpbmcgZGVmaW5pdGlvbnMgb24gc2NvcGUgYW5kIGNvbnRyb2xsZXIgYXQgdGhlIHNhbWUgdGltZSBhcmUgbm90IHN1cHBvcnRlZC5gKTtcbiAgICB9XG5cbiAgICB2YXIgY29udGV4dCA9IChidGNJc09iamVjdCkgPyB0aGlzLmRpcmVjdGl2ZS5iaW5kVG9Db250cm9sbGVyIDogdGhpcy5kaXJlY3RpdmUuc2NvcGU7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRleHQgPT0gJ29iamVjdCcpIHtcbiAgICAgIGZvciAodmFyIG5hbWUgaW4gY29udGV4dCkge1xuICAgICAgICBpZiAoKDxhbnk+Y29udGV4dCkuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICB2YXIgbG9jYWxOYW1lID0gY29udGV4dFtuYW1lXTtcbiAgICAgICAgICB2YXIgdHlwZSA9IGxvY2FsTmFtZS5jaGFyQXQoMCk7XG4gICAgICAgICAgbG9jYWxOYW1lID0gbG9jYWxOYW1lLnN1YnN0cigxKSB8fCBuYW1lO1xuICAgICAgICAgIHZhciBvdXRwdXROYW1lID0gJ291dHB1dF8nICsgbmFtZTtcbiAgICAgICAgICB2YXIgb3V0cHV0TmFtZVJlbmFtZSA9IG91dHB1dE5hbWUgKyAnOiAnICsgbmFtZTtcbiAgICAgICAgICB2YXIgb3V0cHV0TmFtZVJlbmFtZUNoYW5nZSA9IG91dHB1dE5hbWUgKyAnOiAnICsgbmFtZSArICdDaGFuZ2UnO1xuICAgICAgICAgIHZhciBpbnB1dE5hbWUgPSAnaW5wdXRfJyArIG5hbWU7XG4gICAgICAgICAgdmFyIGlucHV0TmFtZVJlbmFtZSA9IGlucHV0TmFtZSArICc6ICcgKyBuYW1lO1xuICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnPSc6XG4gICAgICAgICAgICAgIHRoaXMucHJvcGVydHlPdXRwdXRzLnB1c2gob3V0cHV0TmFtZSk7XG4gICAgICAgICAgICAgIHRoaXMuY2hlY2tQcm9wZXJ0aWVzLnB1c2gobG9jYWxOYW1lKTtcbiAgICAgICAgICAgICAgdGhpcy5vdXRwdXRzLnB1c2gob3V0cHV0TmFtZSk7XG4gICAgICAgICAgICAgIHRoaXMub3V0cHV0c1JlbmFtZS5wdXNoKG91dHB1dE5hbWVSZW5hbWVDaGFuZ2UpO1xuICAgICAgICAgICAgICB0aGlzLnByb3BlcnR5TWFwW291dHB1dE5hbWVdID0gbG9jYWxOYW1lO1xuICAgICAgICAgICAgLy8gZG9uJ3QgYnJlYWs7IGxldCBpdCBmYWxsIHRocm91Z2ggdG8gJ0AnXG4gICAgICAgICAgICBjYXNlICdAJzpcbiAgICAgICAgICAgICAgdGhpcy5pbnB1dHMucHVzaChpbnB1dE5hbWUpO1xuICAgICAgICAgICAgICB0aGlzLmlucHV0c1JlbmFtZS5wdXNoKGlucHV0TmFtZVJlbmFtZSk7XG4gICAgICAgICAgICAgIHRoaXMucHJvcGVydHlNYXBbaW5wdXROYW1lXSA9IGxvY2FsTmFtZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICcmJzpcbiAgICAgICAgICAgICAgdGhpcy5vdXRwdXRzLnB1c2gob3V0cHV0TmFtZSk7XG4gICAgICAgICAgICAgIHRoaXMub3V0cHV0c1JlbmFtZS5wdXNoKG91dHB1dE5hbWVSZW5hbWUpO1xuICAgICAgICAgICAgICB0aGlzLnByb3BlcnR5TWFwW291dHB1dE5hbWVdID0gbG9jYWxOYW1lO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHZhciBqc29uID0gSlNPTi5zdHJpbmdpZnkoY29udGV4dCk7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICAgIGBVbmV4cGVjdGVkIG1hcHBpbmcgJyR7dHlwZX0nIGluICcke2pzb259JyBpbiAnJHt0aGlzLm5hbWV9JyBkaXJlY3RpdmUuYCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29tcGlsZVRlbXBsYXRlKGNvbXBpbGU6IGFuZ3VsYXIuSUNvbXBpbGVTZXJ2aWNlLCB0ZW1wbGF0ZUNhY2hlOiBhbmd1bGFyLklUZW1wbGF0ZUNhY2hlU2VydmljZSxcbiAgICAgICAgICAgICAgICAgIGh0dHBCYWNrZW5kOiBhbmd1bGFyLklIdHRwQmFja2VuZFNlcnZpY2UpOiBQcm9taXNlPGFueT4ge1xuICAgIGlmICh0aGlzLmRpcmVjdGl2ZS50ZW1wbGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmxpbmtGbiA9IGNvbXBpbGVIdG1sKHRoaXMuZGlyZWN0aXZlLnRlbXBsYXRlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGlyZWN0aXZlLnRlbXBsYXRlVXJsKSB7XG4gICAgICB2YXIgdXJsID0gdGhpcy5kaXJlY3RpdmUudGVtcGxhdGVVcmw7XG4gICAgICB2YXIgaHRtbCA9IHRlbXBsYXRlQ2FjaGUuZ2V0KHVybCk7XG4gICAgICBpZiAoaHRtbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMubGlua0ZuID0gY29tcGlsZUh0bWwoaHRtbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIGVycikgPT4ge1xuICAgICAgICAgIGh0dHBCYWNrZW5kKCdHRVQnLCB1cmwsIG51bGwsIChzdGF0dXMsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgICByZXNvbHZlKHRoaXMubGlua0ZuID0gY29tcGlsZUh0bWwodGVtcGxhdGVDYWNoZS5wdXQodXJsLCByZXNwb25zZSkpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGVycihgR0VUICR7dXJsfSByZXR1cm5lZCAke3N0YXR1c306ICR7cmVzcG9uc2V9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYERpcmVjdGl2ZSAnJHt0aGlzLm5hbWV9JyBpcyBub3QgYSBjb21wb25lbnQsIGl0IGlzIG1pc3NpbmcgdGVtcGxhdGUuYCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICAgIGZ1bmN0aW9uIGNvbXBpbGVIdG1sKGh0bWwpOiBhbmd1bGFyLklMaW5rRm4ge1xuICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZGl2LmlubmVySFRNTCA9IGh0bWw7XG4gICAgICByZXR1cm4gY29tcGlsZShkaXYuY2hpbGROb2Rlcyk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHJlc29sdmUoZXhwb3J0ZWRDb21wb25lbnRzOiB7W25hbWU6IHN0cmluZ106IFVwZ3JhZGVOZzFDb21wb25lbnRBZGFwdGVyQnVpbGRlcn0sXG4gICAgICAgICAgICAgICAgIGluamVjdG9yOiBhbmd1bGFyLklJbmplY3RvclNlcnZpY2UpOiBQcm9taXNlPGFueT4ge1xuICAgIHZhciBwcm9taXNlcyA9IFtdO1xuICAgIHZhciBjb21waWxlOiBhbmd1bGFyLklDb21waWxlU2VydmljZSA9IGluamVjdG9yLmdldChORzFfQ09NUElMRSk7XG4gICAgdmFyIHRlbXBsYXRlQ2FjaGU6IGFuZ3VsYXIuSVRlbXBsYXRlQ2FjaGVTZXJ2aWNlID0gaW5qZWN0b3IuZ2V0KE5HMV9URU1QTEFURV9DQUNIRSk7XG4gICAgdmFyIGh0dHBCYWNrZW5kOiBhbmd1bGFyLklIdHRwQmFja2VuZFNlcnZpY2UgPSBpbmplY3Rvci5nZXQoTkcxX0hUVFBfQkFDS0VORCk7XG4gICAgdmFyICRjb250cm9sbGVyOiBhbmd1bGFyLklDb250cm9sbGVyU2VydmljZSA9IGluamVjdG9yLmdldChORzFfQ09OVFJPTExFUik7XG4gICAgZm9yICh2YXIgbmFtZSBpbiBleHBvcnRlZENvbXBvbmVudHMpIHtcbiAgICAgIGlmICgoPGFueT5leHBvcnRlZENvbXBvbmVudHMpLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIHZhciBleHBvcnRlZENvbXBvbmVudCA9IGV4cG9ydGVkQ29tcG9uZW50c1tuYW1lXTtcbiAgICAgICAgZXhwb3J0ZWRDb21wb25lbnQuZGlyZWN0aXZlID0gZXhwb3J0ZWRDb21wb25lbnQuZXh0cmFjdERpcmVjdGl2ZShpbmplY3Rvcik7XG4gICAgICAgIGV4cG9ydGVkQ29tcG9uZW50LiRjb250cm9sbGVyID0gJGNvbnRyb2xsZXI7XG4gICAgICAgIGV4cG9ydGVkQ29tcG9uZW50LmV4dHJhY3RCaW5kaW5ncygpO1xuICAgICAgICB2YXIgcHJvbWlzZSA9IGV4cG9ydGVkQ29tcG9uZW50LmNvbXBpbGVUZW1wbGF0ZShjb21waWxlLCB0ZW1wbGF0ZUNhY2hlLCBodHRwQmFja2VuZCk7XG4gICAgICAgIGlmIChwcm9taXNlKSBwcm9taXNlcy5wdXNoKHByb21pc2UpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICB9XG59XG5cbmNsYXNzIFVwZ3JhZGVOZzFDb21wb25lbnRBZGFwdGVyIGltcGxlbWVudHMgT25DaGFuZ2VzLCBEb0NoZWNrIHtcbiAgZGVzdGluYXRpb25PYmo6IGFueSA9IG51bGw7XG4gIGNoZWNrTGFzdFZhbHVlczogYW55W10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihsaW5rRm46IGFuZ3VsYXIuSUxpbmtGbiwgc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLCBwcml2YXRlIGRpcmVjdGl2ZTogYW5ndWxhci5JRGlyZWN0aXZlLFxuICAgICAgICAgICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCAkY29udHJvbGxlcjogYW5ndWxhci5JQ29udHJvbGxlclNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgaW5wdXRzOiBzdHJpbmdbXSwgcHJpdmF0ZSBvdXRwdXRzOiBzdHJpbmdbXSwgcHJpdmF0ZSBwcm9wT3V0czogc3RyaW5nW10sXG4gICAgICAgICAgICAgIHByaXZhdGUgY2hlY2tQcm9wZXJ0aWVzOiBzdHJpbmdbXSwgcHJpdmF0ZSBwcm9wZXJ0eU1hcDoge1trZXk6IHN0cmluZ106IHN0cmluZ30pIHtcbiAgICB2YXIgZWxlbWVudDogRWxlbWVudCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB2YXIgY2hpbGROb2RlczogTm9kZVtdID0gW107XG4gICAgdmFyIGNoaWxkTm9kZTtcbiAgICB3aGlsZSAoY2hpbGROb2RlID0gZWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZSk7XG4gICAgICBjaGlsZE5vZGVzLnB1c2goY2hpbGROb2RlKTtcbiAgICB9XG4gICAgdmFyIGNvbXBvbmVudFNjb3BlID0gc2NvcGUuJG5ldyghIWRpcmVjdGl2ZS5zY29wZSk7XG4gICAgdmFyICRlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpO1xuICAgIHZhciBjb250cm9sbGVyVHlwZSA9IGRpcmVjdGl2ZS5jb250cm9sbGVyO1xuICAgIHZhciBjb250cm9sbGVyOiBhbnkgPSBudWxsO1xuICAgIGlmIChjb250cm9sbGVyVHlwZSkge1xuICAgICAgdmFyIGxvY2FscyA9IHskc2NvcGU6IGNvbXBvbmVudFNjb3BlLCAkZWxlbWVudDogJGVsZW1lbnR9O1xuICAgICAgY29udHJvbGxlciA9ICRjb250cm9sbGVyKGNvbnRyb2xsZXJUeXBlLCBsb2NhbHMsIG51bGwsIGRpcmVjdGl2ZS5jb250cm9sbGVyQXMpO1xuICAgICAgJGVsZW1lbnQuZGF0YShjb250cm9sbGVyS2V5KGRpcmVjdGl2ZS5uYW1lKSwgY29udHJvbGxlcik7XG4gICAgfVxuICAgIHZhciBsaW5rID0gZGlyZWN0aXZlLmxpbms7XG4gICAgaWYgKHR5cGVvZiBsaW5rID09ICdvYmplY3QnKSBsaW5rID0gKDxhbmd1bGFyLklEaXJlY3RpdmVQcmVQb3N0PmxpbmspLnByZTtcbiAgICBpZiAobGluaykge1xuICAgICAgdmFyIGF0dHJzOiBhbmd1bGFyLklBdHRyaWJ1dGVzID0gTk9UX1NVUFBPUlRFRDtcbiAgICAgIHZhciB0cmFuc2NsdWRlRm46IGFuZ3VsYXIuSVRyYW5zY2x1ZGVGdW5jdGlvbiA9IE5PVF9TVVBQT1JURUQ7XG4gICAgICB2YXIgbGlua0NvbnRyb2xsZXIgPSB0aGlzLnJlc29sdmVSZXF1aXJlZCgkZWxlbWVudCwgZGlyZWN0aXZlLnJlcXVpcmUpO1xuICAgICAgKDxhbmd1bGFyLklEaXJlY3RpdmVMaW5rRm4+ZGlyZWN0aXZlLmxpbmspKGNvbXBvbmVudFNjb3BlLCAkZWxlbWVudCwgYXR0cnMsIGxpbmtDb250cm9sbGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zY2x1ZGVGbik7XG4gICAgfVxuICAgIHRoaXMuZGVzdGluYXRpb25PYmogPSBkaXJlY3RpdmUuYmluZFRvQ29udHJvbGxlciAmJiBjb250cm9sbGVyID8gY29udHJvbGxlciA6IGNvbXBvbmVudFNjb3BlO1xuXG4gICAgbGlua0ZuKGNvbXBvbmVudFNjb3BlLCAoY2xvbmVkRWxlbWVudDogTm9kZVtdLCBzY29wZTogYW5ndWxhci5JU2NvcGUpID0+IHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBpaSA9IGNsb25lZEVsZW1lbnQubGVuZ3RoOyBpIDwgaWk7IGkrKykge1xuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNsb25lZEVsZW1lbnRbaV0pO1xuICAgICAgfVxuICAgIH0sIHtwYXJlbnRCb3VuZFRyYW5zY2x1ZGVGbjogKHNjb3BlLCBjbG9uZUF0dGFjaCkgPT4geyBjbG9uZUF0dGFjaChjaGlsZE5vZGVzKTsgfX0pO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXNbaW5wdXRzW2ldXSA9IG51bGw7XG4gICAgfVxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgb3V0cHV0cy5sZW5ndGg7IGorKykge1xuICAgICAgdmFyIGVtaXR0ZXIgPSB0aGlzW291dHB1dHNbal1dID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgdGhpcy5zZXRDb21wb25lbnRQcm9wZXJ0eShvdXRwdXRzW2pdLCAoKGVtaXR0ZXIpID0+ICh2YWx1ZSkgPT4gZW1pdHRlci5lbWl0KHZhbHVlKSkoZW1pdHRlcikpO1xuICAgIH1cbiAgICBmb3IgKHZhciBrID0gMDsgayA8IHByb3BPdXRzLmxlbmd0aDsgaysrKSB7XG4gICAgICB0aGlzW3Byb3BPdXRzW2tdXSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgIHRoaXMuY2hlY2tMYXN0VmFsdWVzLnB1c2goSU5JVElBTF9WQUxVRSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczoge1tuYW1lOiBzdHJpbmddOiBTaW1wbGVDaGFuZ2V9KSB7XG4gICAgZm9yICh2YXIgbmFtZSBpbiBjaGFuZ2VzKSB7XG4gICAgICBpZiAoKDxPYmplY3Q+Y2hhbmdlcykuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgdmFyIGNoYW5nZTogU2ltcGxlQ2hhbmdlID0gY2hhbmdlc1tuYW1lXTtcbiAgICAgICAgdGhpcy5zZXRDb21wb25lbnRQcm9wZXJ0eShuYW1lLCBjaGFuZ2UuY3VycmVudFZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ0RvQ2hlY2soKTogbnVtYmVyIHtcbiAgICB2YXIgY291bnQgPSAwO1xuICAgIHZhciBkZXN0aW5hdGlvbk9iaiA9IHRoaXMuZGVzdGluYXRpb25PYmo7XG4gICAgdmFyIGxhc3RWYWx1ZXMgPSB0aGlzLmNoZWNrTGFzdFZhbHVlcztcbiAgICB2YXIgY2hlY2tQcm9wZXJ0aWVzID0gdGhpcy5jaGVja1Byb3BlcnRpZXM7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGVja1Byb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB2YWx1ZSA9IGRlc3RpbmF0aW9uT2JqW2NoZWNrUHJvcGVydGllc1tpXV07XG4gICAgICB2YXIgbGFzdCA9IGxhc3RWYWx1ZXNbaV07XG4gICAgICBpZiAodmFsdWUgIT09IGxhc3QpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiBpc05hTih2YWx1ZSkgJiYgdHlwZW9mIGxhc3QgPT0gJ251bWJlcicgJiYgaXNOYU4obGFzdCkpIHtcbiAgICAgICAgICAvLyBpZ25vcmUgYmVjYXVzZSBOYU4gIT0gTmFOXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGV2ZW50RW1pdHRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSB0aGlzW3RoaXMucHJvcE91dHNbaV1dO1xuICAgICAgICAgIGV2ZW50RW1pdHRlci5lbWl0KGxhc3RWYWx1ZXNbaV0gPSB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvdW50O1xuICB9XG5cbiAgc2V0Q29tcG9uZW50UHJvcGVydHkobmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5kZXN0aW5hdGlvbk9ialt0aGlzLnByb3BlcnR5TWFwW25hbWVdXSA9IHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNvbHZlUmVxdWlyZWQoJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgcmVxdWlyZTogc3RyaW5nIHwgc3RyaW5nW10pOiBhbnkge1xuICAgIGlmICghcmVxdWlyZSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXF1aXJlID09ICdzdHJpbmcnKSB7XG4gICAgICB2YXIgbmFtZTogc3RyaW5nID0gPHN0cmluZz5yZXF1aXJlO1xuICAgICAgdmFyIGlzT3B0aW9uYWwgPSBmYWxzZTtcbiAgICAgIHZhciBzdGFydFBhcmVudCA9IGZhbHNlO1xuICAgICAgdmFyIHNlYXJjaFBhcmVudHMgPSBmYWxzZTtcbiAgICAgIHZhciBjaDogc3RyaW5nO1xuICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09ICc/Jykge1xuICAgICAgICBpc09wdGlvbmFsID0gdHJ1ZTtcbiAgICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyKDEpO1xuICAgICAgfVxuICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09ICdeJykge1xuICAgICAgICBzZWFyY2hQYXJlbnRzID0gdHJ1ZTtcbiAgICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyKDEpO1xuICAgICAgfVxuICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09ICdeJykge1xuICAgICAgICBzdGFydFBhcmVudCA9IHRydWU7XG4gICAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cigxKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGtleSA9IGNvbnRyb2xsZXJLZXkobmFtZSk7XG4gICAgICBpZiAoc3RhcnRQYXJlbnQpICRlbGVtZW50ID0gJGVsZW1lbnQucGFyZW50KCk7XG4gICAgICB2YXIgZGVwID0gc2VhcmNoUGFyZW50cyA/ICRlbGVtZW50LmluaGVyaXRlZERhdGEoa2V5KSA6ICRlbGVtZW50LmRhdGEoa2V5KTtcbiAgICAgIGlmICghZGVwICYmICFpc09wdGlvbmFsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FuIG5vdCBsb2NhdGUgJyR7cmVxdWlyZX0nIGluICcke3RoaXMuZGlyZWN0aXZlLm5hbWV9Jy5gKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkZXA7XG4gICAgfSBlbHNlIGlmIChyZXF1aXJlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHZhciBkZXBzID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcXVpcmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZGVwcy5wdXNoKHRoaXMucmVzb2x2ZVJlcXVpcmVkKCRlbGVtZW50LCByZXF1aXJlW2ldKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGVwcztcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgRGlyZWN0aXZlICcke3RoaXMuZGlyZWN0aXZlLm5hbWV9JyByZXF1aXJlIHN5bnRheCB1bnJlY29nbml6ZWQ6ICR7dGhpcy5kaXJlY3RpdmUucmVxdWlyZX1gKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
