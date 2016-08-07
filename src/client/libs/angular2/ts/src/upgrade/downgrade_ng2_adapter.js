System.register(['angular2/core', './constants'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, constants_1;
    var INITIAL_VALUE, DowngradeNg2ComponentAdapter, Ng1Change;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            }],
        execute: function() {
            INITIAL_VALUE = {
                __UNINITIALIZED__: true
            };
            DowngradeNg2ComponentAdapter = (function () {
                function DowngradeNg2ComponentAdapter(id, info, element, attrs, scope, parentInjector, parse, viewManager, hostViewFactory) {
                    this.id = id;
                    this.info = info;
                    this.element = element;
                    this.attrs = attrs;
                    this.scope = scope;
                    this.parentInjector = parentInjector;
                    this.parse = parse;
                    this.viewManager = viewManager;
                    this.hostViewFactory = hostViewFactory;
                    this.component = null;
                    this.inputChangeCount = 0;
                    this.inputChanges = null;
                    this.hostViewRef = null;
                    this.changeDetector = null;
                    this.contentInsertionPoint = null;
                    this.element[0].id = id;
                    this.componentScope = scope.$new();
                    this.childNodes = element.contents();
                }
                DowngradeNg2ComponentAdapter.prototype.bootstrapNg2 = function () {
                    var childInjector = this.parentInjector.resolveAndCreateChild([core_1.provide(constants_1.NG1_SCOPE, { useValue: this.componentScope })]);
                    this.contentInsertionPoint = document.createComment('ng1 insertion point');
                    this.hostViewRef = this.viewManager.createRootHostView(this.hostViewFactory, '#' + this.id, childInjector, [[this.contentInsertionPoint]]);
                    var hostElement = this.viewManager.getHostElement(this.hostViewRef);
                    this.changeDetector = this.hostViewRef.changeDetectorRef;
                    this.component = this.viewManager.getComponent(hostElement);
                };
                DowngradeNg2ComponentAdapter.prototype.setupInputs = function () {
                    var _this = this;
                    var attrs = this.attrs;
                    var inputs = this.info.inputs;
                    for (var i = 0; i < inputs.length; i++) {
                        var input = inputs[i];
                        var expr = null;
                        if (attrs.hasOwnProperty(input.attr)) {
                            var observeFn = (function (prop) {
                                var prevValue = INITIAL_VALUE;
                                return function (value) {
                                    if (_this.inputChanges !== null) {
                                        _this.inputChangeCount++;
                                        _this.inputChanges[prop] =
                                            new Ng1Change(value, prevValue === INITIAL_VALUE ? value : prevValue);
                                        prevValue = value;
                                    }
                                    _this.component[prop] = value;
                                };
                            })(input.prop);
                            attrs.$observe(input.attr, observeFn);
                        }
                        else if (attrs.hasOwnProperty(input.bindAttr)) {
                            expr = attrs[input.bindAttr];
                        }
                        else if (attrs.hasOwnProperty(input.bracketAttr)) {
                            expr = attrs[input.bracketAttr];
                        }
                        else if (attrs.hasOwnProperty(input.bindonAttr)) {
                            expr = attrs[input.bindonAttr];
                        }
                        else if (attrs.hasOwnProperty(input.bracketParenAttr)) {
                            expr = attrs[input.bracketParenAttr];
                        }
                        if (expr != null) {
                            var watchFn = (function (prop) { return function (value, prevValue) {
                                if (_this.inputChanges != null) {
                                    _this.inputChangeCount++;
                                    _this.inputChanges[prop] = new Ng1Change(prevValue, value);
                                }
                                _this.component[prop] = value;
                            }; })(input.prop);
                            this.componentScope.$watch(expr, watchFn);
                        }
                    }
                    var prototype = this.info.type.prototype;
                    if (prototype && prototype.ngOnChanges) {
                        // Detect: OnChanges interface
                        this.inputChanges = {};
                        this.componentScope.$watch(function () { return _this.inputChangeCount; }, function () {
                            var inputChanges = _this.inputChanges;
                            _this.inputChanges = {};
                            _this.component.ngOnChanges(inputChanges);
                        });
                    }
                    this.componentScope.$watch(function () { return _this.changeDetector && _this.changeDetector.detectChanges(); });
                };
                DowngradeNg2ComponentAdapter.prototype.projectContent = function () {
                    var childNodes = this.childNodes;
                    var parent = this.contentInsertionPoint.parentNode;
                    if (parent) {
                        for (var i = 0, ii = childNodes.length; i < ii; i++) {
                            parent.insertBefore(childNodes[i], this.contentInsertionPoint);
                        }
                    }
                };
                DowngradeNg2ComponentAdapter.prototype.setupOutputs = function () {
                    var _this = this;
                    var attrs = this.attrs;
                    var outputs = this.info.outputs;
                    for (var j = 0; j < outputs.length; j++) {
                        var output = outputs[j];
                        var expr = null;
                        var assignExpr = false;
                        var bindonAttr = output.bindonAttr ? output.bindonAttr.substring(0, output.bindonAttr.length - 6) : null;
                        var bracketParenAttr = output.bracketParenAttr ?
                            "[(" + output.bracketParenAttr.substring(2, output.bracketParenAttr.length - 8) + ")]" :
                            null;
                        if (attrs.hasOwnProperty(output.onAttr)) {
                            expr = attrs[output.onAttr];
                        }
                        else if (attrs.hasOwnProperty(output.parenAttr)) {
                            expr = attrs[output.parenAttr];
                        }
                        else if (attrs.hasOwnProperty(bindonAttr)) {
                            expr = attrs[bindonAttr];
                            assignExpr = true;
                        }
                        else if (attrs.hasOwnProperty(bracketParenAttr)) {
                            expr = attrs[bracketParenAttr];
                            assignExpr = true;
                        }
                        if (expr != null && assignExpr != null) {
                            var getter = this.parse(expr);
                            var setter = getter.assign;
                            if (assignExpr && !setter) {
                                throw new Error("Expression '" + expr + "' is not assignable!");
                            }
                            var emitter = this.component[output.prop];
                            if (emitter) {
                                emitter.subscribe({
                                    next: assignExpr ? (function (setter) { return function (value) { return setter(_this.scope, value); }; })(setter) :
                                        (function (getter) { return function (value) { return getter(_this.scope, { $event: value }); }; })(getter)
                                });
                            }
                            else {
                                throw new Error("Missing emitter '" + output.prop + "' on component '" + this.info.selector + "'!");
                            }
                        }
                    }
                };
                DowngradeNg2ComponentAdapter.prototype.registerCleanup = function () {
                    var _this = this;
                    this.element.bind('$destroy', function () { return _this.viewManager.destroyRootHostView(_this.hostViewRef); });
                };
                return DowngradeNg2ComponentAdapter;
            }());
            exports_1("DowngradeNg2ComponentAdapter", DowngradeNg2ComponentAdapter);
            Ng1Change = (function () {
                function Ng1Change(previousValue, currentValue) {
                    this.previousValue = previousValue;
                    this.currentValue = currentValue;
                }
                Ng1Change.prototype.isFirstChange = function () { return this.previousValue === this.currentValue; };
                return Ng1Change;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3VwZ3JhZGUvZG93bmdyYWRlX25nMl9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFlTSxhQUFhOzs7Ozs7Ozs7O1lBQWIsYUFBYSxHQUFHO2dCQUNwQixpQkFBaUIsRUFBRSxJQUFJO2FBQ3hCLENBQUM7WUFFRjtnQkFVRSxzQ0FBb0IsRUFBVSxFQUFVLElBQW1CLEVBQ3ZDLE9BQWlDLEVBQVUsS0FBMEIsRUFDckUsS0FBcUIsRUFBVSxjQUF3QixFQUN2RCxLQUE0QixFQUFVLFdBQTJCLEVBQ2pFLGVBQW1DO29CQUpuQyxPQUFFLEdBQUYsRUFBRSxDQUFRO29CQUFVLFNBQUksR0FBSixJQUFJLENBQWU7b0JBQ3ZDLFlBQU8sR0FBUCxPQUFPLENBQTBCO29CQUFVLFVBQUssR0FBTCxLQUFLLENBQXFCO29CQUNyRSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtvQkFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBVTtvQkFDdkQsVUFBSyxHQUFMLEtBQUssQ0FBdUI7b0JBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO29CQUNqRSxvQkFBZSxHQUFmLGVBQWUsQ0FBb0I7b0JBYnZELGNBQVMsR0FBUSxJQUFJLENBQUM7b0JBQ3RCLHFCQUFnQixHQUFXLENBQUMsQ0FBQztvQkFDN0IsaUJBQVksR0FBa0MsSUFBSSxDQUFDO29CQUNuRCxnQkFBVyxHQUFnQixJQUFJLENBQUM7b0JBQ2hDLG1CQUFjLEdBQXNCLElBQUksQ0FBQztvQkFHekMsMEJBQXFCLEdBQVMsSUFBSSxDQUFDO29CQU8zQixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7b0JBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFnQixPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3BE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SUFBSyxPQUFBLFVBQUMsS0FBSyxJQUFLLE9BQUEsTUFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUMsRUFBbkMsQ0FBbUMsRUFBOUMsQ0FBOEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztpQ0FDeEYsQ0FBQyxDQUFDOzRCQUNMLENBQUM7NEJBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ04sTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBb0IsTUFBTSxDQUFDLElBQUksd0JBQW1CLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxPQUFJLENBQUMsQ0FBQzs0QkFDNUYsQ0FBQzt3QkFDSCxDQUFDO29CQUNILENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCxzREFBZSxHQUFmO29CQUFBLGlCQUVDO29CQURDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLEVBQXRELENBQXNELENBQUMsQ0FBQztnQkFDOUYsQ0FBQztnQkFDSCxtQ0FBQztZQUFELENBakpBLEFBaUpDLElBQUE7WUFqSkQsdUVBaUpDLENBQUE7WUFFRDtnQkFDRSxtQkFBbUIsYUFBa0IsRUFBUyxZQUFpQjtvQkFBNUMsa0JBQWEsR0FBYixhQUFhLENBQUs7b0JBQVMsaUJBQVksR0FBWixZQUFZLENBQUs7Z0JBQUcsQ0FBQztnQkFFbkUsaUNBQWEsR0FBYixjQUEyQixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDL0UsZ0JBQUM7WUFBRCxDQUpBLEFBSUMsSUFBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy91cGdyYWRlL2Rvd25ncmFkZV9uZzJfYWRhcHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIHByb3ZpZGUsXG4gIEFwcFZpZXdNYW5hZ2VyLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgSG9zdFZpZXdSZWYsXG4gIEluamVjdG9yLFxuICBPbkNoYW5nZXMsXG4gIEhvc3RWaWV3RmFjdG9yeVJlZixcbiAgU2ltcGxlQ2hhbmdlXG59IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtORzFfU0NPUEV9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7Q29tcG9uZW50SW5mb30gZnJvbSAnLi9tZXRhZGF0YSc7XG5pbXBvcnQgRWxlbWVudCA9IHByb3RyYWN0b3IuRWxlbWVudDtcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnLi9hbmd1bGFyX2pzJztcblxuY29uc3QgSU5JVElBTF9WQUxVRSA9IHtcbiAgX19VTklOSVRJQUxJWkVEX186IHRydWVcbn07XG5cbmV4cG9ydCBjbGFzcyBEb3duZ3JhZGVOZzJDb21wb25lbnRBZGFwdGVyIHtcbiAgY29tcG9uZW50OiBhbnkgPSBudWxsO1xuICBpbnB1dENoYW5nZUNvdW50OiBudW1iZXIgPSAwO1xuICBpbnB1dENoYW5nZXM6IHtba2V5OiBzdHJpbmddOiBTaW1wbGVDaGFuZ2V9ID0gbnVsbDtcbiAgaG9zdFZpZXdSZWY6IEhvc3RWaWV3UmVmID0gbnVsbDtcbiAgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmID0gbnVsbDtcbiAgY29tcG9uZW50U2NvcGU6IGFuZ3VsYXIuSVNjb3BlO1xuICBjaGlsZE5vZGVzOiBOb2RlW107XG4gIGNvbnRlbnRJbnNlcnRpb25Qb2ludDogTm9kZSA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpZDogc3RyaW5nLCBwcml2YXRlIGluZm86IENvbXBvbmVudEluZm8sXG4gICAgICAgICAgICAgIHByaXZhdGUgZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCBwcml2YXRlIGF0dHJzOiBhbmd1bGFyLklBdHRyaWJ1dGVzLFxuICAgICAgICAgICAgICBwcml2YXRlIHNjb3BlOiBhbmd1bGFyLklTY29wZSwgcHJpdmF0ZSBwYXJlbnRJbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgICAgICAgIHByaXZhdGUgcGFyc2U6IGFuZ3VsYXIuSVBhcnNlU2VydmljZSwgcHJpdmF0ZSB2aWV3TWFuYWdlcjogQXBwVmlld01hbmFnZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgaG9zdFZpZXdGYWN0b3J5OiBIb3N0Vmlld0ZhY3RvcnlSZWYpIHtcbiAgICAoPGFueT50aGlzLmVsZW1lbnRbMF0pLmlkID0gaWQ7XG4gICAgdGhpcy5jb21wb25lbnRTY29wZSA9IHNjb3BlLiRuZXcoKTtcbiAgICB0aGlzLmNoaWxkTm9kZXMgPSA8Tm9kZVtdPjxhbnk+ZWxlbWVudC5jb250ZW50cygpO1xuICB9XG5cbiAgYm9vdHN0cmFwTmcyKCkge1xuICAgIHZhciBjaGlsZEluamVjdG9yID0gdGhpcy5wYXJlbnRJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlQ2hpbGQoXG4gICAgICAgIFtwcm92aWRlKE5HMV9TQ09QRSwge3VzZVZhbHVlOiB0aGlzLmNvbXBvbmVudFNjb3BlfSldKTtcbiAgICB0aGlzLmNvbnRlbnRJbnNlcnRpb25Qb2ludCA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJ25nMSBpbnNlcnRpb24gcG9pbnQnKTtcblxuICAgIHRoaXMuaG9zdFZpZXdSZWYgPSB0aGlzLnZpZXdNYW5hZ2VyLmNyZWF0ZVJvb3RIb3N0VmlldyhcbiAgICAgICAgdGhpcy5ob3N0Vmlld0ZhY3RvcnksICcjJyArIHRoaXMuaWQsIGNoaWxkSW5qZWN0b3IsIFtbdGhpcy5jb250ZW50SW5zZXJ0aW9uUG9pbnRdXSk7XG4gICAgdmFyIGhvc3RFbGVtZW50ID0gdGhpcy52aWV3TWFuYWdlci5nZXRIb3N0RWxlbWVudCh0aGlzLmhvc3RWaWV3UmVmKTtcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yID0gdGhpcy5ob3N0Vmlld1JlZi5jaGFuZ2VEZXRlY3RvclJlZjtcbiAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMudmlld01hbmFnZXIuZ2V0Q29tcG9uZW50KGhvc3RFbGVtZW50KTtcbiAgfVxuXG4gIHNldHVwSW5wdXRzKCk6IHZvaWQge1xuICAgIHZhciBhdHRycyA9IHRoaXMuYXR0cnM7XG4gICAgdmFyIGlucHV0cyA9IHRoaXMuaW5mby5pbnB1dHM7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpbnB1dCA9IGlucHV0c1tpXTtcbiAgICAgIHZhciBleHByID0gbnVsbDtcbiAgICAgIGlmIChhdHRycy5oYXNPd25Qcm9wZXJ0eShpbnB1dC5hdHRyKSkge1xuICAgICAgICB2YXIgb2JzZXJ2ZUZuID0gKChwcm9wKSA9PiB7XG4gICAgICAgICAgdmFyIHByZXZWYWx1ZSA9IElOSVRJQUxfVkFMVUU7XG4gICAgICAgICAgcmV0dXJuICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXRDaGFuZ2VzICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHRoaXMuaW5wdXRDaGFuZ2VDb3VudCsrO1xuICAgICAgICAgICAgICB0aGlzLmlucHV0Q2hhbmdlc1twcm9wXSA9XG4gICAgICAgICAgICAgICAgICBuZXcgTmcxQ2hhbmdlKHZhbHVlLCBwcmV2VmFsdWUgPT09IElOSVRJQUxfVkFMVUUgPyB2YWx1ZSA6IHByZXZWYWx1ZSk7XG4gICAgICAgICAgICAgIHByZXZWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KShpbnB1dC5wcm9wKTtcbiAgICAgICAgYXR0cnMuJG9ic2VydmUoaW5wdXQuYXR0ciwgb2JzZXJ2ZUZuKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cnMuaGFzT3duUHJvcGVydHkoaW5wdXQuYmluZEF0dHIpKSB7XG4gICAgICAgIGV4cHIgPSBhdHRyc1tpbnB1dC5iaW5kQXR0cl07XG4gICAgICB9IGVsc2UgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KGlucHV0LmJyYWNrZXRBdHRyKSkge1xuICAgICAgICBleHByID0gYXR0cnNbaW5wdXQuYnJhY2tldEF0dHJdO1xuICAgICAgfSBlbHNlIGlmIChhdHRycy5oYXNPd25Qcm9wZXJ0eShpbnB1dC5iaW5kb25BdHRyKSkge1xuICAgICAgICBleHByID0gYXR0cnNbaW5wdXQuYmluZG9uQXR0cl07XG4gICAgICB9IGVsc2UgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KGlucHV0LmJyYWNrZXRQYXJlbkF0dHIpKSB7XG4gICAgICAgIGV4cHIgPSBhdHRyc1tpbnB1dC5icmFja2V0UGFyZW5BdHRyXTtcbiAgICAgIH1cbiAgICAgIGlmIChleHByICE9IG51bGwpIHtcbiAgICAgICAgdmFyIHdhdGNoRm4gPSAoKHByb3ApID0+ICh2YWx1ZSwgcHJldlZhbHVlKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaW5wdXRDaGFuZ2VzICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRDaGFuZ2VDb3VudCsrO1xuICAgICAgICAgICAgdGhpcy5pbnB1dENoYW5nZXNbcHJvcF0gPSBuZXcgTmcxQ2hhbmdlKHByZXZWYWx1ZSwgdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmNvbXBvbmVudFtwcm9wXSA9IHZhbHVlO1xuICAgICAgICB9KShpbnB1dC5wcm9wKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRTY29wZS4kd2F0Y2goZXhwciwgd2F0Y2hGbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByb3RvdHlwZSA9IHRoaXMuaW5mby50eXBlLnByb3RvdHlwZTtcbiAgICBpZiAocHJvdG90eXBlICYmICg8T25DaGFuZ2VzPnByb3RvdHlwZSkubmdPbkNoYW5nZXMpIHtcbiAgICAgIC8vIERldGVjdDogT25DaGFuZ2VzIGludGVyZmFjZVxuICAgICAgdGhpcy5pbnB1dENoYW5nZXMgPSB7fTtcbiAgICAgIHRoaXMuY29tcG9uZW50U2NvcGUuJHdhdGNoKCgpID0+IHRoaXMuaW5wdXRDaGFuZ2VDb3VudCwgKCkgPT4ge1xuICAgICAgICB2YXIgaW5wdXRDaGFuZ2VzID0gdGhpcy5pbnB1dENoYW5nZXM7XG4gICAgICAgIHRoaXMuaW5wdXRDaGFuZ2VzID0ge307XG4gICAgICAgICg8T25DaGFuZ2VzPnRoaXMuY29tcG9uZW50KS5uZ09uQ2hhbmdlcyhpbnB1dENoYW5nZXMpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuY29tcG9uZW50U2NvcGUuJHdhdGNoKCgpID0+IHRoaXMuY2hhbmdlRGV0ZWN0b3IgJiYgdGhpcy5jaGFuZ2VEZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCkpO1xuICB9XG5cbiAgcHJvamVjdENvbnRlbnQoKSB7XG4gICAgdmFyIGNoaWxkTm9kZXMgPSB0aGlzLmNoaWxkTm9kZXM7XG4gICAgdmFyIHBhcmVudCA9IHRoaXMuY29udGVudEluc2VydGlvblBvaW50LnBhcmVudE5vZGU7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGlpID0gY2hpbGROb2Rlcy5sZW5ndGg7IGkgPCBpaTsgaSsrKSB7XG4gICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoY2hpbGROb2Rlc1tpXSwgdGhpcy5jb250ZW50SW5zZXJ0aW9uUG9pbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldHVwT3V0cHV0cygpIHtcbiAgICB2YXIgYXR0cnMgPSB0aGlzLmF0dHJzO1xuICAgIHZhciBvdXRwdXRzID0gdGhpcy5pbmZvLm91dHB1dHM7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBvdXRwdXRzLmxlbmd0aDsgaisrKSB7XG4gICAgICB2YXIgb3V0cHV0ID0gb3V0cHV0c1tqXTtcbiAgICAgIHZhciBleHByID0gbnVsbDtcbiAgICAgIHZhciBhc3NpZ25FeHByID0gZmFsc2U7XG5cbiAgICAgIHZhciBiaW5kb25BdHRyID1cbiAgICAgICAgICBvdXRwdXQuYmluZG9uQXR0ciA/IG91dHB1dC5iaW5kb25BdHRyLnN1YnN0cmluZygwLCBvdXRwdXQuYmluZG9uQXR0ci5sZW5ndGggLSA2KSA6IG51bGw7XG4gICAgICB2YXIgYnJhY2tldFBhcmVuQXR0ciA9XG4gICAgICAgICAgb3V0cHV0LmJyYWNrZXRQYXJlbkF0dHIgP1xuICAgICAgICAgICAgICBgWygke291dHB1dC5icmFja2V0UGFyZW5BdHRyLnN1YnN0cmluZygyLCBvdXRwdXQuYnJhY2tldFBhcmVuQXR0ci5sZW5ndGggLSA4KX0pXWAgOlxuICAgICAgICAgICAgICBudWxsO1xuXG4gICAgICBpZiAoYXR0cnMuaGFzT3duUHJvcGVydHkob3V0cHV0Lm9uQXR0cikpIHtcbiAgICAgICAgZXhwciA9IGF0dHJzW291dHB1dC5vbkF0dHJdO1xuICAgICAgfSBlbHNlIGlmIChhdHRycy5oYXNPd25Qcm9wZXJ0eShvdXRwdXQucGFyZW5BdHRyKSkge1xuICAgICAgICBleHByID0gYXR0cnNbb3V0cHV0LnBhcmVuQXR0cl07XG4gICAgICB9IGVsc2UgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KGJpbmRvbkF0dHIpKSB7XG4gICAgICAgIGV4cHIgPSBhdHRyc1tiaW5kb25BdHRyXTtcbiAgICAgICAgYXNzaWduRXhwciA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KGJyYWNrZXRQYXJlbkF0dHIpKSB7XG4gICAgICAgIGV4cHIgPSBhdHRyc1ticmFja2V0UGFyZW5BdHRyXTtcbiAgICAgICAgYXNzaWduRXhwciA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChleHByICE9IG51bGwgJiYgYXNzaWduRXhwciAhPSBudWxsKSB7XG4gICAgICAgIHZhciBnZXR0ZXIgPSB0aGlzLnBhcnNlKGV4cHIpO1xuICAgICAgICB2YXIgc2V0dGVyID0gZ2V0dGVyLmFzc2lnbjtcbiAgICAgICAgaWYgKGFzc2lnbkV4cHIgJiYgIXNldHRlcikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXhwcmVzc2lvbiAnJHtleHByfScgaXMgbm90IGFzc2lnbmFibGUhYCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVtaXR0ZXIgPSB0aGlzLmNvbXBvbmVudFtvdXRwdXQucHJvcF07XG4gICAgICAgIGlmIChlbWl0dGVyKSB7XG4gICAgICAgICAgZW1pdHRlci5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgbmV4dDogYXNzaWduRXhwciA/ICgoc2V0dGVyKSA9PiAodmFsdWUpID0+IHNldHRlcih0aGlzLnNjb3BlLCB2YWx1ZSkpKHNldHRlcikgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoZ2V0dGVyKSA9PiAodmFsdWUpID0+IGdldHRlcih0aGlzLnNjb3BlLCB7JGV2ZW50OiB2YWx1ZX0pKShnZXR0ZXIpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNaXNzaW5nIGVtaXR0ZXIgJyR7b3V0cHV0LnByb3B9JyBvbiBjb21wb25lbnQgJyR7dGhpcy5pbmZvLnNlbGVjdG9yfSchYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZWdpc3RlckNsZWFudXAoKSB7XG4gICAgdGhpcy5lbGVtZW50LmJpbmQoJyRkZXN0cm95JywgKCkgPT4gdGhpcy52aWV3TWFuYWdlci5kZXN0cm95Um9vdEhvc3RWaWV3KHRoaXMuaG9zdFZpZXdSZWYpKTtcbiAgfVxufVxuXG5jbGFzcyBOZzFDaGFuZ2UgaW1wbGVtZW50cyBTaW1wbGVDaGFuZ2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJldmlvdXNWYWx1ZTogYW55LCBwdWJsaWMgY3VycmVudFZhbHVlOiBhbnkpIHt9XG5cbiAgaXNGaXJzdENoYW5nZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMucHJldmlvdXNWYWx1ZSA9PT0gdGhpcy5jdXJyZW50VmFsdWU7IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
