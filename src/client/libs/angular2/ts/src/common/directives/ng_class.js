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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9kaXJlY3RpdmVzL25nX2NsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBZ0JBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBMERHO1lBRUg7Z0JBTUUsaUJBQW9CLGdCQUFpQyxFQUFVLGdCQUFpQyxFQUM1RSxLQUFpQixFQUFVLFNBQW1CO29CQUQ5QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO29CQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7b0JBQzVFLFVBQUssR0FBTCxLQUFLLENBQVk7b0JBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVTtvQkFKMUQsb0JBQWUsR0FBYSxFQUFFLENBQUM7Z0JBSThCLENBQUM7Z0JBRXRFLHNCQUFJLG1DQUFjO3lCQUFsQixVQUFtQixDQUFTO3dCQUMxQixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2hDLElBQUksQ0FBQyxlQUFlLEdBQUcsZ0JBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxlQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7d0JBQ3ZFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDakMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUM1QyxDQUFDOzs7bUJBQUE7Z0JBRUQsc0JBQUksNkJBQVE7eUJBQVosVUFBYSxDQUF3RDt3QkFDbkUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBRXJDLEVBQUUsQ0FBQyxDQUFDLGVBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENB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Qzs0QkFDTixJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7d0JBQy9FLENBQUM7b0JBQ0gsQ0FBQztnQkFDSCxDQUFDO2dCQTdHSDtvQkFBQyxnQkFBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSx1QkFBdUIsQ0FBQyxFQUFDLENBQUM7OzJCQUFBO2dCQThHM0YsY0FBQztZQUFELENBN0dBLEFBNkdDLElBQUE7WUE3R0QsNkJBNkdDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29tbW9uL2RpcmVjdGl2ZXMvbmdfY2xhc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzUHJlc2VudCwgaXNTdHJpbmcsIGlzQXJyYXl9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge1xuICBEb0NoZWNrLFxuICBPbkRlc3Ryb3ksXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSXRlcmFibGVEaWZmZXJzLFxuICBLZXlWYWx1ZURpZmZlcnMsXG4gIFJlbmRlcmVyLFxuICBJdGVyYWJsZURpZmZlcixcbiAgS2V5VmFsdWVEaWZmZXIsXG4gIENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQsXG4gIEtleVZhbHVlQ2hhbmdlUmVjb3JkXG59IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtTdHJpbmdNYXBXcmFwcGVyLCBpc0xpc3RMaWtlSXRlcmFibGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5cbi8qKlxuICogVGhlIGBOZ0NsYXNzYCBkaXJlY3RpdmUgY29uZGl0aW9uYWxseSBhZGRzIGFuZCByZW1vdmVzIENTUyBjbGFzc2VzIG9uIGFuIEhUTUwgZWxlbWVudCBiYXNlZCBvblxuICogYW4gZXhwcmVzc2lvbidzIGV2YWx1YXRpb24gcmVzdWx0LlxuICpcbiAqIFRoZSByZXN1bHQgb2YgYW4gZXhwcmVzc2lvbiBldmFsdWF0aW9uIGlzIGludGVycHJldGVkIGRpZmZlcmVudGx5IGRlcGVuZGluZyBvbiB0eXBlIG9mXG4gKiB0aGUgZXhwcmVzc2lvbiBldmFsdWF0aW9uIHJlc3VsdDpcbiAqIC0gYHN0cmluZ2AgLSBhbGwgdGhlIENTUyBjbGFzc2VzIGxpc3RlZCBpbiBhIHN0cmluZyAoc3BhY2UgZGVsaW1pdGVkKSBhcmUgYWRkZWRcbiAqIC0gYEFycmF5YCAtIGFsbCB0aGUgQ1NTIGNsYXNzZXMgKEFycmF5IGVsZW1lbnRzKSBhcmUgYWRkZWRcbiAqIC0gYE9iamVjdGAgLSBlYWNoIGtleSBjb3JyZXNwb25kcyB0byBhIENTUyBjbGFzcyBuYW1lIHdoaWxlIHZhbHVlcyBhcmUgaW50ZXJwcmV0ZWQgYXMgZXhwcmVzc2lvbnNcbiAqIGV2YWx1YXRpbmcgdG8gYEJvb2xlYW5gLiBJZiBhIGdpdmVuIGV4cHJlc3Npb24gZXZhbHVhdGVzIHRvIGB0cnVlYCBhIGNvcnJlc3BvbmRpbmcgQ1NTIGNsYXNzXG4gKiBpcyBhZGRlZCAtIG90aGVyd2lzZSBpdCBpcyByZW1vdmVkLlxuICpcbiAqIFdoaWxlIHRoZSBgTmdDbGFzc2AgZGlyZWN0aXZlIGNhbiBpbnRlcnByZXQgZXhwcmVzc2lvbnMgZXZhbHVhdGluZyB0byBgc3RyaW5nYCwgYEFycmF5YFxuICogb3IgYE9iamVjdGAsIHRoZSBgT2JqZWN0YC1iYXNlZCB2ZXJzaW9uIGlzIHRoZSBtb3N0IG9mdGVuIHVzZWQgYW5kIGhhcyBhbiBhZHZhbnRhZ2Ugb2Yga2VlcGluZ1xuICogYWxsIHRoZSBDU1MgY2xhc3MgbmFtZXMgaW4gYSB0ZW1wbGF0ZS5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvYTRZZHRtV3l3aEozM3VxZnBQUG4/cD1wcmV2aWV3KSk6XG4gKlxuICogYGBgXG4gKiBpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG4gKiBpbXBvcnQge05nQ2xhc3N9IGZyb20gJ2FuZ3VsYXIyL2NvbW1vbic7XG4gKlxuICogQENvbXBvbmVudCh7XG4gKiAgIHNlbGVjdG9yOiAndG9nZ2xlLWJ1dHRvbicsXG4gKiAgIGlucHV0czogWydpc0Rpc2FibGVkJ10sXG4gKiAgIHRlbXBsYXRlOiBgXG4gKiAgICAgIDxkaXYgY2xhc3M9XCJidXR0b25cIiBbbmdDbGFzc109XCJ7YWN0aXZlOiBpc09uLCBkaXNhYmxlZDogaXNEaXNhYmxlZH1cIlxuICogICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZSghaXNPbilcIj5cbiAqICAgICAgICAgIENsaWNrIG1lIVxuICogICAgICA8L2Rpdj5gLFxuICogICBzdHlsZXM6IFtgXG4gKiAgICAgLmJ1dHRvbiB7XG4gKiAgICAgICB3aWR0aDogMTIwcHg7XG4gKiAgICAgICBib3JkZXI6IG1lZGl1bSBzb2xpZCBibGFjaztcbiAqICAgICB9XG4gKlxuICogICAgIC5hY3RpdmUge1xuICogICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xuICogICAgfVxuICpcbiAqICAgICAuZGlzYWJsZWQge1xuICogICAgICAgY29sb3I6IGdyYXk7XG4gKiAgICAgICBib3JkZXI6IG1lZGl1bSBzb2xpZCBncmF5O1xuICogICAgIH1cbiAqICAgYF1cbiAqICAgZGlyZWN0aXZlczogW05nQ2xhc3NdXG4gKiB9KVxuICogY2xhc3MgVG9nZ2xlQnV0dG9uIHtcbiAqICAgaXNPbiA9IGZhbHNlO1xuICogICBpc0Rpc2FibGVkID0gZmFsc2U7XG4gKlxuICogICB0b2dnbGUobmV3U3RhdGUpIHtcbiAqICAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZCkge1xuICogICAgICAgdGhpcy5pc09uID0gbmV3U3RhdGU7XG4gKiAgICAgfVxuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmdDbGFzc10nLCBpbnB1dHM6IFsncmF3Q2xhc3M6IG5nQ2xhc3MnLCAnaW5pdGlhbENsYXNzZXM6IGNsYXNzJ119KVxuZXhwb3J0IGNsYXNzIE5nQ2xhc3MgaW1wbGVtZW50cyBEb0NoZWNrLCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9pdGVyYWJsZURpZmZlcjogSXRlcmFibGVEaWZmZXI7XG4gIHByaXZhdGUgX2tleVZhbHVlRGlmZmVyOiBLZXlWYWx1ZURpZmZlcjtcbiAgcHJpdmF0ZSBfaW5pdGlhbENsYXNzZXM6IHN0cmluZ1tdID0gW107XG4gIHByaXZhdGUgX3Jhd0NsYXNzOiBzdHJpbmdbXSB8IFNldDxzdHJpbmc+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2l0ZXJhYmxlRGlmZmVyczogSXRlcmFibGVEaWZmZXJzLCBwcml2YXRlIF9rZXlWYWx1ZURpZmZlcnM6IEtleVZhbHVlRGlmZmVycyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfbmdFbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyKSB7fVxuXG4gIHNldCBpbml0aWFsQ2xhc3Nlcyh2OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9hcHBseUluaXRpYWxDbGFzc2VzKHRydWUpO1xuICAgIHRoaXMuX2luaXRpYWxDbGFzc2VzID0gaXNQcmVzZW50KHYpICYmIGlzU3RyaW5nKHYpID8gdi5zcGxpdCgnICcpIDogW107XG4gICAgdGhpcy5fYXBwbHlJbml0aWFsQ2xhc3NlcyhmYWxzZSk7XG4gICAgdGhpcy5fYXBwbHlDbGFzc2VzKHRoaXMuX3Jhd0NsYXNzLCBmYWxzZSk7XG4gIH1cblxuICBzZXQgcmF3Q2xhc3Modjogc3RyaW5nIHwgc3RyaW5nW10gfCBTZXQ8c3RyaW5nPnwge1trZXk6IHN0cmluZ106IGFueX0pIHtcbiAgICB0aGlzLl9jbGVhbnVwQ2xhc3Nlcyh0aGlzLl9yYXdDbGFzcyk7XG5cbiAgICBpZiAoaXNTdHJpbmcodikpIHtcbiAgICAgIHYgPSAoPHN0cmluZz52KS5zcGxpdCgnICcpO1xuICAgIH1cblxuICAgIHRoaXMuX3Jhd0NsYXNzID0gPHN0cmluZ1tdIHwgU2V0PHN0cmluZz4+djtcbiAgICB0aGlzLl9pdGVyYWJsZURpZmZlciA9IG51bGw7XG4gICAgdGhpcy5fa2V5VmFsdWVEaWZmZXIgPSBudWxsO1xuICAgIGlmIChpc1ByZXNlbnQodikpIHtcbiAgICAgIGlmIChpc0xpc3RMaWtlSXRlcmFibGUodikpIHtcbiAgICAgICAgdGhpcy5faXRlcmFibGVEaWZmZXIgPSB0aGlzLl9pdGVyYWJsZURpZmZlcnMuZmluZCh2KS5jcmVhdGUobnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9rZXlWYWx1ZURpZmZlciA9IHRoaXMuX2tleVZhbHVlRGlmZmVycy5maW5kKHYpLmNyZWF0ZShudWxsKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ0RvQ2hlY2soKTogdm9pZCB7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl9pdGVyYWJsZURpZmZlcikpIHtcbiAgICAgIHZhciBjaGFuZ2VzID0gdGhpcy5faXRlcmFibGVEaWZmZXIuZGlmZih0aGlzLl9yYXdDbGFzcyk7XG4gICAgICBpZiAoaXNQcmVzZW50KGNoYW5nZXMpKSB7XG4gICAgICAgIHRoaXMuX2FwcGx5SXRlcmFibGVDaGFuZ2VzKGNoYW5nZXMpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuX2tleVZhbHVlRGlmZmVyKSkge1xuICAgICAgdmFyIGNoYW5nZXMgPSB0aGlzLl9rZXlWYWx1ZURpZmZlci5kaWZmKHRoaXMuX3Jhd0NsYXNzKTtcbiAgICAgIGlmIChpc1ByZXNlbnQoY2hhbmdlcykpIHtcbiAgICAgICAgdGhpcy5fYXBwbHlLZXlWYWx1ZUNoYW5nZXMoY2hhbmdlcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7IHRoaXMuX2NsZWFudXBDbGFzc2VzKHRoaXMuX3Jhd0NsYXNzKTsgfVxuXG4gIHByaXZhdGUgX2NsZWFudXBDbGFzc2VzKHJhd0NsYXNzVmFsOiBzdHJpbmdbXSB8IFNldDxzdHJpbmc+fCB7W2tleTogc3RyaW5nXTogYW55fSk6IHZvaWQge1xuICAgIHRoaXMuX2FwcGx5Q2xhc3NlcyhyYXdDbGFzc1ZhbCwgdHJ1ZSk7XG4gICAgdGhpcy5fYXBwbHlJbml0aWFsQ2xhc3NlcyhmYWxzZSk7XG4gIH1cblxuICBwcml2YXRlIF9hcHBseUtleVZhbHVlQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpOiB2b2lkIHtcbiAgICBjaGFuZ2VzLmZvckVhY2hBZGRlZEl0ZW0oXG4gICAgICAgIChyZWNvcmQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkKSA9PiB7IHRoaXMuX3RvZ2dsZUNsYXNzKHJlY29yZC5rZXksIHJlY29yZC5jdXJyZW50VmFsdWUpOyB9KTtcbiAgICBjaGFuZ2VzLmZvckVhY2hDaGFuZ2VkSXRlbShcbiAgICAgICAgKHJlY29yZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQpID0+IHsgdGhpcy5fdG9nZ2xlQ2xhc3MocmVjb3JkLmtleSwgcmVjb3JkLmN1cnJlbnRWYWx1ZSk7IH0pO1xuICAgIGNoYW5nZXMuZm9yRWFjaFJlbW92ZWRJdGVtKChyZWNvcmQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkKSA9PiB7XG4gICAgICBpZiAocmVjb3JkLnByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgdGhpcy5fdG9nZ2xlQ2xhc3MocmVjb3JkLmtleSwgZmFsc2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXBwbHlJdGVyYWJsZUNoYW5nZXMoY2hhbmdlczogYW55KTogdm9pZCB7XG4gICAgY2hhbmdlcy5mb3JFYWNoQWRkZWRJdGVtKFxuICAgICAgICAocmVjb3JkOiBDb2xsZWN0aW9uQ2hhbmdlUmVjb3JkKSA9PiB7IHRoaXMuX3RvZ2dsZUNsYXNzKHJlY29yZC5pdGVtLCB0cnVlKTsgfSk7XG4gICAgY2hhbmdlcy5mb3JFYWNoUmVtb3ZlZEl0ZW0oXG4gICAgICAgIChyZWNvcmQ6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQpID0+IHsgdGhpcy5fdG9nZ2xlQ2xhc3MocmVjb3JkLml0ZW0sIGZhbHNlKTsgfSk7XG4gIH1cblxuICBwcml2YXRlIF9hcHBseUluaXRpYWxDbGFzc2VzKGlzQ2xlYW51cDogYm9vbGVhbikge1xuICAgIHRoaXMuX2luaXRpYWxDbGFzc2VzLmZvckVhY2goY2xhc3NOYW1lID0+IHRoaXMuX3RvZ2dsZUNsYXNzKGNsYXNzTmFtZSwgIWlzQ2xlYW51cCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXBwbHlDbGFzc2VzKHJhd0NsYXNzVmFsOiBzdHJpbmdbXSB8IFNldDxzdHJpbmc+fCB7W2tleTogc3RyaW5nXTogYW55fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQ2xlYW51cDogYm9vbGVhbikge1xuICAgIGlmIChpc1ByZXNlbnQocmF3Q2xhc3NWYWwpKSB7XG4gICAgICBpZiAoaXNBcnJheShyYXdDbGFzc1ZhbCkpIHtcbiAgICAgICAgKDxzdHJpbmdbXT5yYXdDbGFzc1ZhbCkuZm9yRWFjaChjbGFzc05hbWUgPT4gdGhpcy5fdG9nZ2xlQ2xhc3MoY2xhc3NOYW1lLCAhaXNDbGVhbnVwKSk7XG4gICAgICB9IGVsc2UgaWYgKHJhd0NsYXNzVmFsIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgICg8U2V0PHN0cmluZz4+cmF3Q2xhc3NWYWwpLmZvckVhY2goY2xhc3NOYW1lID0+IHRoaXMuX3RvZ2dsZUNsYXNzKGNsYXNzTmFtZSwgIWlzQ2xlYW51cCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgU3RyaW5nTWFwV3JhcHBlci5mb3JFYWNoKDx7W2s6IHN0cmluZ106IGFueX0+cmF3Q2xhc3NWYWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZXhwVmFsOiBhbnksIGNsYXNzTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc1ByZXNlbnQoZXhwVmFsKSkgdGhpcy5fdG9nZ2xlQ2xhc3MoY2xhc3NOYW1lLCAhaXNDbGVhbnVwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3RvZ2dsZUNsYXNzKGNsYXNzTmFtZTogc3RyaW5nLCBlbmFibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgY2xhc3NOYW1lID0gY2xhc3NOYW1lLnRyaW0oKTtcbiAgICBpZiAoY2xhc3NOYW1lLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmIChjbGFzc05hbWUuaW5kZXhPZignICcpID4gLTEpIHtcbiAgICAgICAgdmFyIGNsYXNzZXMgPSBjbGFzc05hbWUuc3BsaXQoL1xccysvZyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjbGFzc2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudENsYXNzKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgY2xhc3Nlc1tpXSwgZW5hYmxlZCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRDbGFzcyh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsIGNsYXNzTmFtZSwgZW5hYmxlZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
