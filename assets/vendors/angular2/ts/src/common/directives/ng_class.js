System.register(['angular2/src/facade/lang', 'angular2/core', 'angular2/src/facade/collection'], function(exports_1, context_1) {
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
    var lang_1, core_1, collection_1;
    var NgClass;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            }],
        execute: function() {
            /**
             * The `NgClass` directive conditionally adds and removes CSS classes on an HTML element based on
             * an expression's evaluation result.
             *
             * The result of an expression evaluation is interpreted differently depending on type of
             * the expression evaluation result:
             * - `string` - all the CSS classes listed in a string (space delimited) are added
             * - `Array` - all the CSS classes (Array elements) are added
             * - `Object` - each key corresponds to a CSS class name while values are interpreted as expressions
             * evaluating to `Boolean`. If a given expression evaluates to `true` a corresponding CSS class
             * is added - otherwise it is removed.
             *
             * While the `NgClass` directive can interpret expressions evaluating to `string`, `Array`
             * or `Object`, the `Object`-based version is the most often used and has an advantage of keeping
             * all the CSS class names in a template.
             *
             * ### Example ([live demo](http://plnkr.co/edit/a4YdtmWywhJ33uqfpPPn?p=preview)):
             *
             * ```
             * import {Component} from 'angular2/core';
             * import {NgClass} from 'angular2/common';
             *
             * @Component({
             *   selector: 'toggle-button',
             *   inputs: ['isDisabled'],
             *   template: `
             *      <div class="button" [ngClass]="{active: isOn, disabled: isDisabled}"
             *          (click)="toggle(!isOn)">
             *          Click me!
             *      </div>`,
             *   styles: [`
             *     .button {
             *       width: 120px;
             *       border: medium solid black;
             *     }
             *
             *     .active {
             *       background-color: red;
             *    }
             *
             *     .disabled {
             *       color: gray;
             *       border: medium solid gray;
             *     }
             *   `]
             *   directives: [NgClass]
             * })
             * class ToggleButton {
             *   isOn = false;
             *   isDisabled = false;
             *
             *   toggle(newState) {
             *     if (!this.isDisabled) {
             *       this.isOn = newState;
             *     }
             *   }
             * }
             * ```
             */
            NgClass = (function () {
                function NgClass(_iterableDiffers, _keyValueDiffers, _ngEl, _renderer) {
                    this._iterableDiffers = _iterableDiffers;
                    this._keyValueDiffers = _keyValueDiffers;
                    this._ngEl = _ngEl;
                    this._renderer = _renderer;
                    this._initialClasses = [];
                }
                Object.defineProperty(NgClass.prototype, "initialClasses", {
                    set: function (v) {
                        this._applyInitialClasses(true);
                        this._initialClasses = lang_1.isPresent(v) && lang_1.isString(v) ? v.split(' ') : [];
                        this._applyInitialClasses(false);
                        this._applyClasses(this._rawClass, false);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgClass.prototype, "rawClass", {
                    set: function (v) {
                        this._cleanupClasses(this._rawClass);
                        if (lang_1.isString(v)) {
                            v = v.split(' ');
                        }
                        this._rawClass = v;
                        this._iterableDiffer = null;
                        this._keyValueDiffer = null;
                        if (lang_1.isPresent(v)) {
                            if (collection_1.isListLikeIterable(v)) {
                                this._iterableDiffer = this._iterableDiffers.find(v).create(null);
                            }
                            else {
                                this._keyValueDiffer = this._keyValueDiffers.find(v).create(null);
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                NgClass.prototype.ngDoCheck = function () {
                    if (lang_1.isPresent(this._iterableDiffer)) {
                        var changes = this._iterableDiffer.diff(this._rawClass);
                        if (lang_1.isPresent(changes)) {
                            this._applyIterableChanges(changes);
                        }
                    }
                    if (lang_1.isPresent(this._keyValueDiffer)) {
                        var changes = this._keyValueDiffer.diff(this._rawClass);
                        if (lang_1.isPresent(changes)) {
                            this._applyKeyValueChanges(changes);
                        }
                    }
                };
                NgClass.prototype.ngOnDestroy = function () { this._cleanupClasses(this._rawClass); };
                NgClass.prototype._cleanupClasses = function (rawClassVal) {
                    this._applyClasses(rawClassVal, true);
                    this._applyInitialClasses(false);
                };
                NgClass.prototype._applyKeyValueChanges = function (changes) {
                    var _this = this;
                    changes.forEachAddedItem(function (record) { _this._toggleClass(record.key, record.currentValue); });
                    changes.forEachChangedItem(function (record) { _this._toggleClass(record.key, record.currentValue); });
                    changes.forEachRemovedItem(function (record) {
                        if (record.previousValue) {
                            _this._toggleClass(record.key, false);
                        }
                    });
                };
                NgClass.prototype._applyIterableChanges = function (changes) {
                    var _this = this;
                    changes.forEachAddedItem(function (record) { _this._toggleClass(record.item, true); });
                    changes.forEachRemovedItem(function (record) { _this._toggleClass(record.item, false); });
                };
                NgClass.prototype._applyInitialClasses = function (isCleanup) {
                    var _this = this;
                    this._initialClasses.forEach(function (className) { return _this._toggleClass(className, !isCleanup); });
                };
                NgClass.prototype._applyClasses = function (rawClassVal, isCleanup) {
                    var _this = this;
                    if (lang_1.isPresent(rawClassVal)) {
                        if (lang_1.isArray(rawClassVal)) {
                            rawClassVal.forEach(function (className) { return _this._toggleClass(className, !isCleanup); });
                        }
                        else if (rawClassVal instanceof Set) {
                            rawClassVal.forEach(function (className) { return _this._toggleClass(className, !isCleanup); });
                        }
                        else {
                            collection_1.StringMapWrapper.forEach(rawClassVal, function (expVal, className) {
                                if (lang_1.isPresent(expVal))
                                    _this._toggleClass(className, !isCleanup);
                            });
                        }
                    }
                };
                NgClass.prototype._toggleClass = function (className, enabled) {
                    className = className.trim();
                    if (className.length > 0) {
                        if (className.indexOf(' ') > -1) {
                            var classes = className.split(/\s+/g);
                            for (var i = 0, len = classes.length; i < len; i++) {
                                this._renderer.setElementClass(this._ngEl.nativeElement, classes[i], enabled);
                            }
                        }
                        else {
                            this._renderer.setElementClass(this._ngEl.nativeElement, className, enabled);
                        }
                    }
                };
                NgClass = __decorate([
                    core_1.Directive({ selector: '[ngClass]', inputs: ['rawClass: ngClass', 'initialClasses: class'] }), 
                    __metadata('design:paramtypes', [core_1.IterableDiffers, core_1.KeyValueDiffers, core_1.ElementRef, core_1.Renderer])
                ], NgClass);
                return NgClass;
            }());
            exports_1("NgClass", NgClass);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZGlyZWN0aXZlcy9uZ19jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQWdCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQTBERztZQUVIO2dCQU1FLGlCQUFvQixnQkFBaUMsRUFBVSxnQkFBaUMsRUFDNUUsS0FBaUIsRUFBVSxTQUFtQjtvQkFEOUMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtvQkFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO29CQUM1RSxVQUFLLEdBQUwsS0FBSyxDQUFZO29CQUFVLGNBQVMsR0FBVCxTQUFTLENBQVU7b0JBSjFELG9CQUFlLEdBQWEsRUFBRSxDQUFDO2dCQUk4QixDQUFDO2dCQUV0RSxzQkFBSSxtQ0FBYzt5QkFBbEIsVUFBbUIsQ0FBUzt3QkFDMUIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNoQyxJQUFJLENBQUMsZUFBZSxHQUFHLGdCQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksZUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO3dCQUN2RSxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDNUMsQ0FBQzs7O21CQUFBO2dCQUVELHNCQUFJLDZCQUFRO3lCQUFaLFVBQWEsQ0FBd0Q7d0JBQ25FLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUVyQyxFQUFFLENBQUMsQ0FBQyxlQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNoQixDQUFDLEdBQVksQ0FBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDN0IsQ0FBQzt3QkFFRCxJQUFJLENBQUMsU0FBUyxHQUEyQixDQUFDLENBQUM7d0JBQzNDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO3dCQUM1QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQzt3QkFDNUIsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ2pCLEVBQUUsQ0FBQyxDQUFDLCtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDcEUsQ0FBQzs0QkFBQyxJQUFJLENBQUMsQ0FBQztnQ0FDTixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNwRSxDQUFDO3dCQUNILENBQUM7b0JBQ0gsQ0FBQzs7O21CQUFBO2dCQUVELDJCQUFTLEdBQVQ7b0JBQ0UsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNwQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQ3hELEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN2QixJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3RDLENBQUM7b0JBQ0gsQ0FBQztvQkFDRCxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDeEQsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3ZCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDdEMsQ0FBQztvQkFDSCxDQUFDO2dCQUNILENBQUM7Z0JBRUQsNkJBQVcsR0FBWCxjQUFzQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXJELGlDQUFlLEdBQXZCLFVBQXdCLFdBQXlEO29CQUMvRSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDdEMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQyxDQUFDO2dCQUVPLHVDQUFxQixHQUE3QixVQUE4QixPQUFZO29CQUExQyxpQkFVQztvQkFUQyxPQUFPLENBQUMsZ0JBQWdCLENBQ3BCLFVBQUMsTUFBNEIsSUFBTyxLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQy9GLE9BQU8sQ0FBQyxrQkFBa0IsQ0FDdEIsVUFBQyxNQUE0QixJQUFPLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDL0YsT0FBTyxDQUFDLGtCQUFrQixDQUFDLFVBQUMsTUFBNEI7d0JBQ3RELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDOzRCQUN6QixLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7d0JBQ3ZDLENBQUM7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQztnQkFFTyx1Q0FBcUIsR0FBN0IsVUFBOEIsT0FBWTtvQkFBMUMsaUJBS0M7b0JBSkMsT0FBTyxDQUFDLGdCQUFnQixDQUNwQixVQUFDLE1BQThCLElBQU8sS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ25GLE9BQU8sQ0FBQyxrQkFBa0IsQ0FDdEIsVUFBQyxNQUE4QixJQUFPLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0RixDQUFDO2dCQUVPLHNDQUFvQixHQUE1QixVQUE2QixTQUFrQjtvQkFBL0MsaUJBRUM7b0JBREMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsVUFBQSxTQUFTLElBQUksT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUF4QyxDQUF3QyxDQUFDLENBQUM7Z0JBQ3RGLENBQUM7Z0JBRU8sK0JBQWEsR0FBckIsVUFBc0IsV0FBeUQsRUFDekQsU0FBa0I7b0JBRHhDLGlCQWNDO29CQVpDLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMzQixFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNkLFdBQVksQ0FBQyxPQUFPLENBQUMsVUFBQSxTQUFTLElBQUksT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUF4QyxDQUF3QyxDQUFDLENBQUM7d0JBQ3pGLENBQUM7d0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUN4QixXQUFZLENBQUMsT0FBTyxDQUFDLFVBQUEsU0FBUyxJQUFJLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBeEMsQ0FBd0MsQ0FBQyxDQUFDO3dCQUM1RixDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLDZCQUFnQixDQUFDLE9BQU8sQ0FBcUIsV0FBVyxFQUMvQixVQUFDLE1BQVcsRUFBRSxTQUFpQjtnQ0FDN0IsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRCQUNsRSxDQUFDLENBQUMsQ0FBQzt3QkFDOUIsQ0FBQztvQkFDSCxDQUFDO2dCQUNILENBQUM7Z0JBRU8sOEJBQVksR0FBcEIsVUFBcUIsU0FBaUIsRUFBRSxPQUFnQjtvQkFDdEQsU0FBUyxHQUFHLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDN0IsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN6QixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDaEMsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDdEMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQ0FDbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDOzRCQUNoRixDQUFDO3dCQUNILENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ04sSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO3dCQUMvRSxDQUFDO29CQUNILENBQUM7Z0JBQ0gsQ0FBQztnQkE3R0g7b0JBQUMsZ0JBQVMsQ0FBQyxFQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLENBQUMsbUJBQW1CLEVBQUUsdUJBQXVCLENBQUMsRUFBQyxDQUFDOzsyQkFBQTtnQkE4RzNGLGNBQUM7WUFBRCxDQTdHQSxBQTZHQyxJQUFBO1lBN0dELDZCQTZHQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZGlyZWN0aXZlcy9uZ19jbGFzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNQcmVzZW50LCBpc1N0cmluZywgaXNBcnJheX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7XG4gIERvQ2hlY2ssXG4gIE9uRGVzdHJveSxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJdGVyYWJsZURpZmZlcnMsXG4gIEtleVZhbHVlRGlmZmVycyxcbiAgUmVuZGVyZXIsXG4gIEl0ZXJhYmxlRGlmZmVyLFxuICBLZXlWYWx1ZURpZmZlcixcbiAgQ29sbGVjdGlvbkNoYW5nZVJlY29yZCxcbiAgS2V5VmFsdWVDaGFuZ2VSZWNvcmRcbn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1N0cmluZ01hcFdyYXBwZXIsIGlzTGlzdExpa2VJdGVyYWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcblxuLyoqXG4gKiBUaGUgYE5nQ2xhc3NgIGRpcmVjdGl2ZSBjb25kaXRpb25hbGx5IGFkZHMgYW5kIHJlbW92ZXMgQ1NTIGNsYXNzZXMgb24gYW4gSFRNTCBlbGVtZW50IGJhc2VkIG9uXG4gKiBhbiBleHByZXNzaW9uJ3MgZXZhbHVhdGlvbiByZXN1bHQuXG4gKlxuICogVGhlIHJlc3VsdCBvZiBhbiBleHByZXNzaW9uIGV2YWx1YXRpb24gaXMgaW50ZXJwcmV0ZWQgZGlmZmVyZW50bHkgZGVwZW5kaW5nIG9uIHR5cGUgb2ZcbiAqIHRoZSBleHByZXNzaW9uIGV2YWx1YXRpb24gcmVzdWx0OlxuICogLSBgc3RyaW5nYCAtIGFsbCB0aGUgQ1NTIGNsYXNzZXMgbGlzdGVkIGluIGEgc3RyaW5nIChzcGFjZSBkZWxpbWl0ZWQpIGFyZSBhZGRlZFxuICogLSBgQXJyYXlgIC0gYWxsIHRoZSBDU1MgY2xhc3NlcyAoQXJyYXkgZWxlbWVudHMpIGFyZSBhZGRlZFxuICogLSBgT2JqZWN0YCAtIGVhY2gga2V5IGNvcnJlc3BvbmRzIHRvIGEgQ1NTIGNsYXNzIG5hbWUgd2hpbGUgdmFsdWVzIGFyZSBpbnRlcnByZXRlZCBhcyBleHByZXNzaW9uc1xuICogZXZhbHVhdGluZyB0byBgQm9vbGVhbmAuIElmIGEgZ2l2ZW4gZXhwcmVzc2lvbiBldmFsdWF0ZXMgdG8gYHRydWVgIGEgY29ycmVzcG9uZGluZyBDU1MgY2xhc3NcbiAqIGlzIGFkZGVkIC0gb3RoZXJ3aXNlIGl0IGlzIHJlbW92ZWQuXG4gKlxuICogV2hpbGUgdGhlIGBOZ0NsYXNzYCBkaXJlY3RpdmUgY2FuIGludGVycHJldCBleHByZXNzaW9ucyBldmFsdWF0aW5nIHRvIGBzdHJpbmdgLCBgQXJyYXlgXG4gKiBvciBgT2JqZWN0YCwgdGhlIGBPYmplY3RgLWJhc2VkIHZlcnNpb24gaXMgdGhlIG1vc3Qgb2Z0ZW4gdXNlZCBhbmQgaGFzIGFuIGFkdmFudGFnZSBvZiBrZWVwaW5nXG4gKiBhbGwgdGhlIENTUyBjbGFzcyBuYW1lcyBpbiBhIHRlbXBsYXRlLlxuICpcbiAqICMjIyBFeGFtcGxlIChbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC9hNFlkdG1XeXdoSjMzdXFmcFBQbj9wPXByZXZpZXcpKTpcbiAqXG4gKiBgYGBcbiAqIGltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbiAqIGltcG9ydCB7TmdDbGFzc30gZnJvbSAnYW5ndWxhcjIvY29tbW9uJztcbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICAgc2VsZWN0b3I6ICd0b2dnbGUtYnV0dG9uJyxcbiAqICAgaW5wdXRzOiBbJ2lzRGlzYWJsZWQnXSxcbiAqICAgdGVtcGxhdGU6IGBcbiAqICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvblwiIFtuZ0NsYXNzXT1cInthY3RpdmU6IGlzT24sIGRpc2FibGVkOiBpc0Rpc2FibGVkfVwiXG4gKiAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlKCFpc09uKVwiPlxuICogICAgICAgICAgQ2xpY2sgbWUhXG4gKiAgICAgIDwvZGl2PmAsXG4gKiAgIHN0eWxlczogW2BcbiAqICAgICAuYnV0dG9uIHtcbiAqICAgICAgIHdpZHRoOiAxMjBweDtcbiAqICAgICAgIGJvcmRlcjogbWVkaXVtIHNvbGlkIGJsYWNrO1xuICogICAgIH1cbiAqXG4gKiAgICAgLmFjdGl2ZSB7XG4gKiAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG4gKiAgICB9XG4gKlxuICogICAgIC5kaXNhYmxlZCB7XG4gKiAgICAgICBjb2xvcjogZ3JheTtcbiAqICAgICAgIGJvcmRlcjogbWVkaXVtIHNvbGlkIGdyYXk7XG4gKiAgICAgfVxuICogICBgXVxuICogICBkaXJlY3RpdmVzOiBbTmdDbGFzc11cbiAqIH0pXG4gKiBjbGFzcyBUb2dnbGVCdXR0b24ge1xuICogICBpc09uID0gZmFsc2U7XG4gKiAgIGlzRGlzYWJsZWQgPSBmYWxzZTtcbiAqXG4gKiAgIHRvZ2dsZShuZXdTdGF0ZSkge1xuICogICAgIGlmICghdGhpcy5pc0Rpc2FibGVkKSB7XG4gKiAgICAgICB0aGlzLmlzT24gPSBuZXdTdGF0ZTtcbiAqICAgICB9XG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1tuZ0NsYXNzXScsIGlucHV0czogWydyYXdDbGFzczogbmdDbGFzcycsICdpbml0aWFsQ2xhc3NlczogY2xhc3MnXX0pXG5leHBvcnQgY2xhc3MgTmdDbGFzcyBpbXBsZW1lbnRzIERvQ2hlY2ssIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX2l0ZXJhYmxlRGlmZmVyOiBJdGVyYWJsZURpZmZlcjtcbiAgcHJpdmF0ZSBfa2V5VmFsdWVEaWZmZXI6IEtleVZhbHVlRGlmZmVyO1xuICBwcml2YXRlIF9pbml0aWFsQ2xhc3Nlczogc3RyaW5nW10gPSBbXTtcbiAgcHJpdmF0ZSBfcmF3Q2xhc3M6IHN0cmluZ1tdIHwgU2V0PHN0cmluZz47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaXRlcmFibGVEaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsIHByaXZhdGUgX2tleVZhbHVlRGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLFxuICAgICAgICAgICAgICBwcml2YXRlIF9uZ0VsOiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIpIHt9XG5cbiAgc2V0IGluaXRpYWxDbGFzc2VzKHY6IHN0cmluZykge1xuICAgIHRoaXMuX2FwcGx5SW5pdGlhbENsYXNzZXModHJ1ZSk7XG4gICAgdGhpcy5faW5pdGlhbENsYXNzZXMgPSBpc1ByZXNlbnQodikgJiYgaXNTdHJpbmcodikgPyB2LnNwbGl0KCcgJykgOiBbXTtcbiAgICB0aGlzLl9hcHBseUluaXRpYWxDbGFzc2VzKGZhbHNlKTtcbiAgICB0aGlzLl9hcHBseUNsYXNzZXModGhpcy5fcmF3Q2xhc3MsIGZhbHNlKTtcbiAgfVxuXG4gIHNldCByYXdDbGFzcyh2OiBzdHJpbmcgfCBzdHJpbmdbXSB8IFNldDxzdHJpbmc+fCB7W2tleTogc3RyaW5nXTogYW55fSkge1xuICAgIHRoaXMuX2NsZWFudXBDbGFzc2VzKHRoaXMuX3Jhd0NsYXNzKTtcblxuICAgIGlmIChpc1N0cmluZyh2KSkge1xuICAgICAgdiA9ICg8c3RyaW5nPnYpLnNwbGl0KCcgJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fcmF3Q2xhc3MgPSA8c3RyaW5nW10gfCBTZXQ8c3RyaW5nPj52O1xuICAgIHRoaXMuX2l0ZXJhYmxlRGlmZmVyID0gbnVsbDtcbiAgICB0aGlzLl9rZXlWYWx1ZURpZmZlciA9IG51bGw7XG4gICAgaWYgKGlzUHJlc2VudCh2KSkge1xuICAgICAgaWYgKGlzTGlzdExpa2VJdGVyYWJsZSh2KSkge1xuICAgICAgICB0aGlzLl9pdGVyYWJsZURpZmZlciA9IHRoaXMuX2l0ZXJhYmxlRGlmZmVycy5maW5kKHYpLmNyZWF0ZShudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2tleVZhbHVlRGlmZmVyID0gdGhpcy5fa2V5VmFsdWVEaWZmZXJzLmZpbmQodikuY3JlYXRlKG51bGwpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuX2l0ZXJhYmxlRGlmZmVyKSkge1xuICAgICAgdmFyIGNoYW5nZXMgPSB0aGlzLl9pdGVyYWJsZURpZmZlci5kaWZmKHRoaXMuX3Jhd0NsYXNzKTtcbiAgICAgIGlmIChpc1ByZXNlbnQoY2hhbmdlcykpIHtcbiAgICAgICAgdGhpcy5fYXBwbHlJdGVyYWJsZUNoYW5nZXMoY2hhbmdlcyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fa2V5VmFsdWVEaWZmZXIpKSB7XG4gICAgICB2YXIgY2hhbmdlcyA9IHRoaXMuX2tleVZhbHVlRGlmZmVyLmRpZmYodGhpcy5fcmF3Q2xhc3MpO1xuICAgICAgaWYgKGlzUHJlc2VudChjaGFuZ2VzKSkge1xuICAgICAgICB0aGlzLl9hcHBseUtleVZhbHVlQ2hhbmdlcyhjaGFuZ2VzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHsgdGhpcy5fY2xlYW51cENsYXNzZXModGhpcy5fcmF3Q2xhc3MpOyB9XG5cbiAgcHJpdmF0ZSBfY2xlYW51cENsYXNzZXMocmF3Q2xhc3NWYWw6IHN0cmluZ1tdIHwgU2V0PHN0cmluZz58IHtba2V5OiBzdHJpbmddOiBhbnl9KTogdm9pZCB7XG4gICAgdGhpcy5fYXBwbHlDbGFzc2VzKHJhd0NsYXNzVmFsLCB0cnVlKTtcbiAgICB0aGlzLl9hcHBseUluaXRpYWxDbGFzc2VzKGZhbHNlKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FwcGx5S2V5VmFsdWVDaGFuZ2VzKGNoYW5nZXM6IGFueSk6IHZvaWQge1xuICAgIGNoYW5nZXMuZm9yRWFjaEFkZGVkSXRlbShcbiAgICAgICAgKHJlY29yZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQpID0+IHsgdGhpcy5fdG9nZ2xlQ2xhc3MocmVjb3JkLmtleSwgcmVjb3JkLmN1cnJlbnRWYWx1ZSk7IH0pO1xuICAgIGNoYW5nZXMuZm9yRWFjaENoYW5nZWRJdGVtKFxuICAgICAgICAocmVjb3JkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZCkgPT4geyB0aGlzLl90b2dnbGVDbGFzcyhyZWNvcmQua2V5LCByZWNvcmQuY3VycmVudFZhbHVlKTsgfSk7XG4gICAgY2hhbmdlcy5mb3JFYWNoUmVtb3ZlZEl0ZW0oKHJlY29yZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQpID0+IHtcbiAgICAgIGlmIChyZWNvcmQucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICB0aGlzLl90b2dnbGVDbGFzcyhyZWNvcmQua2V5LCBmYWxzZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9hcHBseUl0ZXJhYmxlQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpOiB2b2lkIHtcbiAgICBjaGFuZ2VzLmZvckVhY2hBZGRlZEl0ZW0oXG4gICAgICAgIChyZWNvcmQ6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQpID0+IHsgdGhpcy5fdG9nZ2xlQ2xhc3MocmVjb3JkLml0ZW0sIHRydWUpOyB9KTtcbiAgICBjaGFuZ2VzLmZvckVhY2hSZW1vdmVkSXRlbShcbiAgICAgICAgKHJlY29yZDogQ29sbGVjdGlvbkNoYW5nZVJlY29yZCkgPT4geyB0aGlzLl90b2dnbGVDbGFzcyhyZWNvcmQuaXRlbSwgZmFsc2UpOyB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2FwcGx5SW5pdGlhbENsYXNzZXMoaXNDbGVhbnVwOiBib29sZWFuKSB7XG4gICAgdGhpcy5faW5pdGlhbENsYXNzZXMuZm9yRWFjaChjbGFzc05hbWUgPT4gdGhpcy5fdG9nZ2xlQ2xhc3MoY2xhc3NOYW1lLCAhaXNDbGVhbnVwKSk7XG4gIH1cblxuICBwcml2YXRlIF9hcHBseUNsYXNzZXMocmF3Q2xhc3NWYWw6IHN0cmluZ1tdIHwgU2V0PHN0cmluZz58IHtba2V5OiBzdHJpbmddOiBhbnl9LFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNDbGVhbnVwOiBib29sZWFuKSB7XG4gICAgaWYgKGlzUHJlc2VudChyYXdDbGFzc1ZhbCkpIHtcbiAgICAgIGlmIChpc0FycmF5KHJhd0NsYXNzVmFsKSkge1xuICAgICAgICAoPHN0cmluZ1tdPnJhd0NsYXNzVmFsKS5mb3JFYWNoKGNsYXNzTmFtZSA9PiB0aGlzLl90b2dnbGVDbGFzcyhjbGFzc05hbWUsICFpc0NsZWFudXApKTtcbiAgICAgIH0gZWxzZSBpZiAocmF3Q2xhc3NWYWwgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgICAgKDxTZXQ8c3RyaW5nPj5yYXdDbGFzc1ZhbCkuZm9yRWFjaChjbGFzc05hbWUgPT4gdGhpcy5fdG9nZ2xlQ2xhc3MoY2xhc3NOYW1lLCAhaXNDbGVhbnVwKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2goPHtbazogc3RyaW5nXTogYW55fT5yYXdDbGFzc1ZhbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChleHBWYWw6IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzUHJlc2VudChleHBWYWwpKSB0aGlzLl90b2dnbGVDbGFzcyhjbGFzc05hbWUsICFpc0NsZWFudXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdG9nZ2xlQ2xhc3MoY2xhc3NOYW1lOiBzdHJpbmcsIGVuYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBjbGFzc05hbWUgPSBjbGFzc05hbWUudHJpbSgpO1xuICAgIGlmIChjbGFzc05hbWUubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKGNsYXNzTmFtZS5pbmRleE9mKCcgJykgPiAtMSkge1xuICAgICAgICB2YXIgY2xhc3NlcyA9IGNsYXNzTmFtZS5zcGxpdCgvXFxzKy9nKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNsYXNzZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50Q2xhc3ModGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCBjbGFzc2VzW2ldLCBlbmFibGVkKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudENsYXNzKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgY2xhc3NOYW1lLCBlbmFibGVkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
