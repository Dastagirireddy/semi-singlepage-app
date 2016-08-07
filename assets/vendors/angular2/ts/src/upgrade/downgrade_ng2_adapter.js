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
                function DowngradeNg2ComponentAdapter(id, info, element, attrs, scope, parentInjector, parse, componentFactory) {
                    this.id = id;
                    this.info = info;
                    this.element = element;
                    this.attrs = attrs;
                    this.scope = scope;
                    this.parentInjector = parentInjector;
                    this.parse = parse;
                    this.componentFactory = componentFactory;
                    this.component = null;
                    this.inputChangeCount = 0;
                    this.inputChanges = null;
                    this.componentRef = null;
                    this.changeDetector = null;
                    this.contentInsertionPoint = null;
                    this.element[0].id = id;
                    this.componentScope = scope.$new();
                    this.childNodes = element.contents();
                }
                DowngradeNg2ComponentAdapter.prototype.bootstrapNg2 = function () {
                    var childInjector = core_1.ReflectiveInjector.resolveAndCreate([core_1.provide(constants_1.NG1_SCOPE, { useValue: this.componentScope })], this.parentInjector);
                    this.contentInsertionPoint = document.createComment('ng1 insertion point');
                    this.componentRef =
                        this.componentFactory.create(childInjector, [[this.contentInsertionPoint]], '#' + this.id);
                    this.changeDetector = this.componentRef.changeDetectorRef;
                    this.component = this.componentRef.instance;
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
                    this.element.bind('$destroy', function () {
                        _this.componentScope.$destroy();
                        _this.componentRef.destroy();
                    });
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy91cGdyYWRlL2Rvd25ncmFkZV9uZzJfYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBZU0sYUFBYTs7Ozs7Ozs7OztZQUFiLGFBQWEsR0FBRztnQkFDcEIsaUJBQWlCLEVBQUUsSUFBSTthQUN4QixDQUFDO1lBRUY7Z0JBVUUsc0NBQW9CLEVBQVUsRUFBVSxJQUFtQixFQUN2QyxPQUFpQyxFQUFVLEtBQTBCLEVBQ3JFLEtBQXFCLEVBQVUsY0FBd0IsRUFDdkQsS0FBNEIsRUFBVSxnQkFBa0M7b0JBSHhFLE9BQUUsR0FBRixFQUFFLENBQVE7b0JBQVUsU0FBSSxHQUFKLElBQUksQ0FBZTtvQkFDdkMsWUFBTyxHQUFQLE9BQU8sQ0FBMEI7b0JBQVUsVUFBSyxHQUFMLEtBQUssQ0FBcUI7b0JBQ3JFLFVBQUssR0FBTCxLQUFLLENBQWdCO29CQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFVO29CQUN2RCxVQUFLLEdBQUwsS0FBSyxDQUF1QjtvQkFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO29CQVo1RixjQUFTLEdBQVEsSUFBSSxDQUFDO29CQUN0QixxQkFBZ0IsR0FBVyxDQUFDLENBQUM7b0JBQzdCLGlCQUFZLEdBQWtDLElBQUksQ0FBQztvQkFDbkQsaUJBQVksR0FBaUIsSUFBSSxDQUFDO29CQUNsQyxtQkFBYyxHQUFzQixJQUFJLENBQUM7b0JBR3pDLDBCQUFxQixHQUFTLElBQUksQ0FBQztvQkFNM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO29CQUMvQixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDbkMsSUFBSSxDQUFDLFVBQVUsR0FBZ0IsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNwRCxDQUFDO2dCQUVELG1EQUFZLEdBQVo7b0JBQ0UsSUFBSSxhQUFhLEdB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Q0FBQyxDQUFDOzRCQUNMLENBQUM7NEJBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ04sTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBb0IsTUFBTSxDQUFDLElBQUksd0JBQW1CLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxPQUFJLENBQUMsQ0FBQzs0QkFDNUYsQ0FBQzt3QkFDSCxDQUFDO29CQUNILENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCxzREFBZSxHQUFmO29CQUFBLGlCQUtDO29CQUpDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTt3QkFDNUIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDL0IsS0FBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDOUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQztnQkFDSCxtQ0FBQztZQUFELENBbEpBLEFBa0pDLElBQUE7WUFsSkQsdUVBa0pDLENBQUE7WUFFRDtnQkFDRSxtQkFBbUIsYUFBa0IsRUFBUyxZQUFpQjtvQkFBNUMsa0JBQWEsR0FBYixhQUFhLENBQUs7b0JBQVMsaUJBQVksR0FBWixZQUFZLENBQUs7Z0JBQUcsQ0FBQztnQkFFbkUsaUNBQWEsR0FBYixjQUEyQixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDL0UsZ0JBQUM7WUFBRCxDQUpBLEFBSUMsSUFBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvdXBncmFkZS9kb3duZ3JhZGVfbmcyX2FkYXB0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBwcm92aWRlLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgSW5qZWN0b3IsXG4gIE9uQ2hhbmdlcyxcbiAgQ29tcG9uZW50RmFjdG9yeSxcbiAgQ29tcG9uZW50UmVmLFxuICBTaW1wbGVDaGFuZ2UsXG4gIFJlZmxlY3RpdmVJbmplY3RvclxufSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7TkcxX1NDT1BFfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQge0NvbXBvbmVudEluZm99IGZyb20gJy4vbWV0YWRhdGEnO1xuaW1wb3J0IEVsZW1lbnQgPSBwcm90cmFjdG9yLkVsZW1lbnQ7XG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJy4vYW5ndWxhcl9qcyc7XG5cbmNvbnN0IElOSVRJQUxfVkFMVUUgPSB7XG4gIF9fVU5JTklUSUFMSVpFRF9fOiB0cnVlXG59O1xuXG5leHBvcnQgY2xhc3MgRG93bmdyYWRlTmcyQ29tcG9uZW50QWRhcHRlciB7XG4gIGNvbXBvbmVudDogYW55ID0gbnVsbDtcbiAgaW5wdXRDaGFuZ2VDb3VudDogbnVtYmVyID0gMDtcbiAgaW5wdXRDaGFuZ2VzOiB7W2tleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlfSA9IG51bGw7XG4gIGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmID0gbnVsbDtcbiAgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmID0gbnVsbDtcbiAgY29tcG9uZW50U2NvcGU6IGFuZ3VsYXIuSVNjb3BlO1xuICBjaGlsZE5vZGVzOiBOb2RlW107XG4gIGNvbnRlbnRJbnNlcnRpb25Qb2ludDogTm9kZSA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpZDogc3RyaW5nLCBwcml2YXRlIGluZm86IENvbXBvbmVudEluZm8sXG4gICAgICAgICAgICAgIHByaXZhdGUgZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCBwcml2YXRlIGF0dHJzOiBhbmd1bGFyLklBdHRyaWJ1dGVzLFxuICAgICAgICAgICAgICBwcml2YXRlIHNjb3BlOiBhbmd1bGFyLklTY29wZSwgcHJpdmF0ZSBwYXJlbnRJbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgICAgICAgIHByaXZhdGUgcGFyc2U6IGFuZ3VsYXIuSVBhcnNlU2VydmljZSwgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5KSB7XG4gICAgKDxhbnk+dGhpcy5lbGVtZW50WzBdKS5pZCA9IGlkO1xuICAgIHRoaXMuY29tcG9uZW50U2NvcGUgPSBzY29wZS4kbmV3KCk7XG4gICAgdGhpcy5jaGlsZE5vZGVzID0gPE5vZGVbXT48YW55PmVsZW1lbnQuY29udGVudHMoKTtcbiAgfVxuXG4gIGJvb3RzdHJhcE5nMigpIHtcbiAgICB2YXIgY2hpbGRJbmplY3RvciA9IFJlZmxlY3RpdmVJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKFxuICAgICAgICBbcHJvdmlkZShORzFfU0NPUEUsIHt1c2VWYWx1ZTogdGhpcy5jb21wb25lbnRTY29wZX0pXSwgdGhpcy5wYXJlbnRJbmplY3Rvcik7XG4gICAgdGhpcy5jb250ZW50SW5zZXJ0aW9uUG9pbnQgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KCduZzEgaW5zZXJ0aW9uIHBvaW50Jyk7XG5cbiAgICB0aGlzLmNvbXBvbmVudFJlZiA9XG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoY2hpbGRJbmplY3RvciwgW1t0aGlzLmNvbnRlbnRJbnNlcnRpb25Qb2ludF1dLCAnIycgKyB0aGlzLmlkKTtcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yID0gdGhpcy5jb21wb25lbnRSZWYuY2hhbmdlRGV0ZWN0b3JSZWY7XG4gICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZTtcbiAgfVxuXG4gIHNldHVwSW5wdXRzKCk6IHZvaWQge1xuICAgIHZhciBhdHRycyA9IHRoaXMuYXR0cnM7XG4gICAgdmFyIGlucHV0cyA9IHRoaXMuaW5mby5pbnB1dHM7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpbnB1dCA9IGlucHV0c1tpXTtcbiAgICAgIHZhciBleHByID0gbnVsbDtcbiAgICAgIGlmIChhdHRycy5oYXNPd25Qcm9wZXJ0eShpbnB1dC5hdHRyKSkge1xuICAgICAgICB2YXIgb2JzZXJ2ZUZuID0gKChwcm9wKSA9PiB7XG4gICAgICAgICAgdmFyIHByZXZWYWx1ZSA9IElOSVRJQUxfVkFMVUU7XG4gICAgICAgICAgcmV0dXJuICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXRDaGFuZ2VzICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHRoaXMuaW5wdXRDaGFuZ2VDb3VudCsrO1xuICAgICAgICAgICAgICB0aGlzLmlucHV0Q2hhbmdlc1twcm9wXSA9XG4gICAgICAgICAgICAgICAgICBuZXcgTmcxQ2hhbmdlKHZhbHVlLCBwcmV2VmFsdWUgPT09IElOSVRJQUxfVkFMVUUgPyB2YWx1ZSA6IHByZXZWYWx1ZSk7XG4gICAgICAgICAgICAgIHByZXZWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KShpbnB1dC5wcm9wKTtcbiAgICAgICAgYXR0cnMuJG9ic2VydmUoaW5wdXQuYXR0ciwgb2JzZXJ2ZUZuKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cnMuaGFzT3duUHJvcGVydHkoaW5wdXQuYmluZEF0dHIpKSB7XG4gICAgICAgIGV4cHIgPSBhdHRyc1tpbnB1dC5iaW5kQXR0cl07XG4gICAgICB9IGVsc2UgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KGlucHV0LmJyYWNrZXRBdHRyKSkge1xuICAgICAgICBleHByID0gYXR0cnNbaW5wdXQuYnJhY2tldEF0dHJdO1xuICAgICAgfSBlbHNlIGlmIChhdHRycy5oYXNPd25Qcm9wZXJ0eShpbnB1dC5iaW5kb25BdHRyKSkge1xuICAgICAgICBleHByID0gYXR0cnNbaW5wdXQuYmluZG9uQXR0cl07XG4gICAgICB9IGVsc2UgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KGlucHV0LmJyYWNrZXRQYXJlbkF0dHIpKSB7XG4gICAgICAgIGV4cHIgPSBhdHRyc1tpbnB1dC5icmFja2V0UGFyZW5BdHRyXTtcbiAgICAgIH1cbiAgICAgIGlmIChleHByICE9IG51bGwpIHtcbiAgICAgICAgdmFyIHdhdGNoRm4gPSAoKHByb3ApID0+ICh2YWx1ZSwgcHJldlZhbHVlKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaW5wdXRDaGFuZ2VzICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRDaGFuZ2VDb3VudCsrO1xuICAgICAgICAgICAgdGhpcy5pbnB1dENoYW5nZXNbcHJvcF0gPSBuZXcgTmcxQ2hhbmdlKHByZXZWYWx1ZSwgdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmNvbXBvbmVudFtwcm9wXSA9IHZhbHVlO1xuICAgICAgICB9KShpbnB1dC5wcm9wKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRTY29wZS4kd2F0Y2goZXhwciwgd2F0Y2hGbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByb3RvdHlwZSA9IHRoaXMuaW5mby50eXBlLnByb3RvdHlwZTtcbiAgICBpZiAocHJvdG90eXBlICYmICg8T25DaGFuZ2VzPnByb3RvdHlwZSkubmdPbkNoYW5nZXMpIHtcbiAgICAgIC8vIERldGVjdDogT25DaGFuZ2VzIGludGVyZmFjZVxuICAgICAgdGhpcy5pbnB1dENoYW5nZXMgPSB7fTtcbiAgICAgIHRoaXMuY29tcG9uZW50U2NvcGUuJHdhdGNoKCgpID0+IHRoaXMuaW5wdXRDaGFuZ2VDb3VudCwgKCkgPT4ge1xuICAgICAgICB2YXIgaW5wdXRDaGFuZ2VzID0gdGhpcy5pbnB1dENoYW5nZXM7XG4gICAgICAgIHRoaXMuaW5wdXRDaGFuZ2VzID0ge307XG4gICAgICAgICg8T25DaGFuZ2VzPnRoaXMuY29tcG9uZW50KS5uZ09uQ2hhbmdlcyhpbnB1dENoYW5nZXMpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuY29tcG9uZW50U2NvcGUuJHdhdGNoKCgpID0+IHRoaXMuY2hhbmdlRGV0ZWN0b3IgJiYgdGhpcy5jaGFuZ2VEZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCkpO1xuICB9XG5cbiAgcHJvamVjdENvbnRlbnQoKSB7XG4gICAgdmFyIGNoaWxkTm9kZXMgPSB0aGlzLmNoaWxkTm9kZXM7XG4gICAgdmFyIHBhcmVudCA9IHRoaXMuY29udGVudEluc2VydGlvblBvaW50LnBhcmVudE5vZGU7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGlpID0gY2hpbGROb2Rlcy5sZW5ndGg7IGkgPCBpaTsgaSsrKSB7XG4gICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoY2hpbGROb2Rlc1tpXSwgdGhpcy5jb250ZW50SW5zZXJ0aW9uUG9pbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldHVwT3V0cHV0cygpIHtcbiAgICB2YXIgYXR0cnMgPSB0aGlzLmF0dHJzO1xuICAgIHZhciBvdXRwdXRzID0gdGhpcy5pbmZvLm91dHB1dHM7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBvdXRwdXRzLmxlbmd0aDsgaisrKSB7XG4gICAgICB2YXIgb3V0cHV0ID0gb3V0cHV0c1tqXTtcbiAgICAgIHZhciBleHByID0gbnVsbDtcbiAgICAgIHZhciBhc3NpZ25FeHByID0gZmFsc2U7XG5cbiAgICAgIHZhciBiaW5kb25BdHRyID1cbiAgICAgICAgICBvdXRwdXQuYmluZG9uQXR0ciA/IG91dHB1dC5iaW5kb25BdHRyLnN1YnN0cmluZygwLCBvdXRwdXQuYmluZG9uQXR0ci5sZW5ndGggLSA2KSA6IG51bGw7XG4gICAgICB2YXIgYnJhY2tldFBhcmVuQXR0ciA9XG4gICAgICAgICAgb3V0cHV0LmJyYWNrZXRQYXJlbkF0dHIgP1xuICAgICAgICAgICAgICBgWygke291dHB1dC5icmFja2V0UGFyZW5BdHRyLnN1YnN0cmluZygyLCBvdXRwdXQuYnJhY2tldFBhcmVuQXR0ci5sZW5ndGggLSA4KX0pXWAgOlxuICAgICAgICAgICAgICBudWxsO1xuXG4gICAgICBpZiAoYXR0cnMuaGFzT3duUHJvcGVydHkob3V0cHV0Lm9uQXR0cikpIHtcbiAgICAgICAgZXhwciA9IGF0dHJzW291dHB1dC5vbkF0dHJdO1xuICAgICAgfSBlbHNlIGlmIChhdHRycy5oYXNPd25Qcm9wZXJ0eShvdXRwdXQucGFyZW5BdHRyKSkge1xuICAgICAgICBleHByID0gYXR0cnNbb3V0cHV0LnBhcmVuQXR0cl07XG4gICAgICB9IGVsc2UgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KGJpbmRvbkF0dHIpKSB7XG4gICAgICAgIGV4cHIgPSBhdHRyc1tiaW5kb25BdHRyXTtcbiAgICAgICAgYXNzaWduRXhwciA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KGJyYWNrZXRQYXJlbkF0dHIpKSB7XG4gICAgICAgIGV4cHIgPSBhdHRyc1ticmFja2V0UGFyZW5BdHRyXTtcbiAgICAgICAgYXNzaWduRXhwciA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChleHByICE9IG51bGwgJiYgYXNzaWduRXhwciAhPSBudWxsKSB7XG4gICAgICAgIHZhciBnZXR0ZXIgPSB0aGlzLnBhcnNlKGV4cHIpO1xuICAgICAgICB2YXIgc2V0dGVyID0gZ2V0dGVyLmFzc2lnbjtcbiAgICAgICAgaWYgKGFzc2lnbkV4cHIgJiYgIXNldHRlcikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXhwcmVzc2lvbiAnJHtleHByfScgaXMgbm90IGFzc2lnbmFibGUhYCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVtaXR0ZXIgPSB0aGlzLmNvbXBvbmVudFtvdXRwdXQucHJvcF07XG4gICAgICAgIGlmIChlbWl0dGVyKSB7XG4gICAgICAgICAgZW1pdHRlci5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgbmV4dDogYXNzaWduRXhwciA/ICgoc2V0dGVyKSA9PiAodmFsdWUpID0+IHNldHRlcih0aGlzLnNjb3BlLCB2YWx1ZSkpKHNldHRlcikgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoZ2V0dGVyKSA9PiAodmFsdWUpID0+IGdldHRlcih0aGlzLnNjb3BlLCB7JGV2ZW50OiB2YWx1ZX0pKShnZXR0ZXIpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNaXNzaW5nIGVtaXR0ZXIgJyR7b3V0cHV0LnByb3B9JyBvbiBjb21wb25lbnQgJyR7dGhpcy5pbmZvLnNlbGVjdG9yfSchYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZWdpc3RlckNsZWFudXAoKSB7XG4gICAgdGhpcy5lbGVtZW50LmJpbmQoJyRkZXN0cm95JywgKCkgPT4ge1xuICAgICAgdGhpcy5jb21wb25lbnRTY29wZS4kZGVzdHJveSgpO1xuICAgICAgdGhpcy5jb21wb25lbnRSZWYuZGVzdHJveSgpO1xuICAgIH0pO1xuICB9XG59XG5cbmNsYXNzIE5nMUNoYW5nZSBpbXBsZW1lbnRzIFNpbXBsZUNoYW5nZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwcmV2aW91c1ZhbHVlOiBhbnksIHB1YmxpYyBjdXJyZW50VmFsdWU6IGFueSkge31cblxuICBpc0ZpcnN0Q2hhbmdlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5wcmV2aW91c1ZhbHVlID09PSB0aGlzLmN1cnJlbnRWYWx1ZTsgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
