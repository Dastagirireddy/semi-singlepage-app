System.register(['angular2/core', 'angular2/src/common/forms/directives/control_value_accessor', 'angular2/src/common/forms/directives/ng_control', 'angular2/src/facade/lang', 'angular2/src/facade/collection'], function(exports_1, context_1) {
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
    var core_1, control_value_accessor_1, ng_control_1, lang_1, collection_1;
    var RADIO_VALUE_ACCESSOR, RadioControlRegistry, RadioButtonState, RadioControlValueAccessor;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (control_value_accessor_1_1) {
                control_value_accessor_1 = control_value_accessor_1_1;
            },
            function (ng_control_1_1) {
                ng_control_1 = ng_control_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            }],
        execute: function() {
            RADIO_VALUE_ACCESSOR = lang_1.CONST_EXPR(new core_1.Provider(control_value_accessor_1.NG_VALUE_ACCESSOR, { useExisting: core_1.forwardRef(function () { return RadioControlValueAccessor; }), multi: true }));
            /**
             * Internal class used by Angular to uncheck radio buttons with the matching name.
             */
            RadioControlRegistry = (function () {
                function RadioControlRegistry() {
                    this._accessors = [];
                }
                RadioControlRegistry.prototype.add = function (control, accessor) {
                    this._accessors.push([control, accessor]);
                };
                RadioControlRegistry.prototype.remove = function (accessor) {
                    var indexToRemove = -1;
                    for (var i = 0; i < this._accessors.length; ++i) {
                        if (this._accessors[i][1] === accessor) {
                            indexToRemove = i;
                        }
                    }
                    collection_1.ListWrapper.removeAt(this._accessors, indexToRemove);
                };
                RadioControlRegistry.prototype.select = function (accessor) {
                    this._accessors.forEach(function (c) {
                        if (c[0].control.root === accessor._control.control.root && c[1] !== accessor) {
                            c[1].fireUncheck();
                        }
                    });
                };
                RadioControlRegistry = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], RadioControlRegistry);
                return RadioControlRegistry;
            }());
            exports_1("RadioControlRegistry", RadioControlRegistry);
            /**
             * The value provided by the forms API for radio buttons.
             */
            RadioButtonState = (function () {
                function RadioButtonState(checked, value) {
                    this.checked = checked;
                    this.value = value;
                }
                return RadioButtonState;
            }());
            exports_1("RadioButtonState", RadioButtonState);
            /**
             * The accessor for writing a radio control value and listening to changes that is used by the
             * {@link NgModel}, {@link NgFormControl}, and {@link NgControlName} directives.
             *
             *  ### Example
             *  ```
             *  @Component({
             *    template: `
             *      <input type="radio" name="food" [(ngModel)]="foodChicken">
             *      <input type="radio" name="food" [(ngModel)]="foodFish">
             *    `
             *  })
             *  class FoodCmp {
             *    foodChicken = new RadioButtonState(true, "chicken");
             *    foodFish = new RadioButtonState(false, "fish");
             *  }
             *  ```
             */
            RadioControlValueAccessor = (function () {
                function RadioControlValueAccessor(_renderer, _elementRef, _registry, _injector) {
                    this._renderer = _renderer;
                    this._elementRef = _elementRef;
                    this._registry = _registry;
                    this._injector = _injector;
                    this.onChange = function () { };
                    this.onTouched = function () { };
                }
                RadioControlValueAccessor.prototype.ngOnInit = function () {
                    this._control = this._injector.get(ng_control_1.NgControl);
                    this._registry.add(this._control, this);
                };
                RadioControlValueAccessor.prototype.ngOnDestroy = function () { this._registry.remove(this); };
                RadioControlValueAccessor.prototype.writeValue = function (value) {
                    this._state = value;
                    if (lang_1.isPresent(value) && value.checked) {
                        this._renderer.setElementProperty(this._elementRef.nativeElement, 'checked', true);
                    }
                };
                RadioControlValueAccessor.prototype.registerOnChange = function (fn) {
                    var _this = this;
                    this._fn = fn;
                    this.onChange = function () {
                        fn(new RadioButtonState(true, _this._state.value));
                        _this._registry.select(_this);
                    };
                };
                RadioControlValueAccessor.prototype.fireUncheck = function () { this._fn(new RadioButtonState(false, this._state.value)); };
                RadioControlValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], RadioControlValueAccessor.prototype, "name", void 0);
                RadioControlValueAccessor = __decorate([
                    core_1.Directive({
                        selector: 'input[type=radio][ngControl],input[type=radio][ngFormControl],input[type=radio][ngModel]',
                        host: { '(change)': 'onChange()', '(blur)': 'onTouched()' },
                        providers: [RADIO_VALUE_ACCESSOR]
                    }), 
                    __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef, RadioControlRegistry, core_1.Injector])
                ], RadioControlValueAccessor);
                return RadioControlValueAccessor;
            }());
            exports_1("RadioControlValueAccessor", RadioControlValueAccessor);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL3JhZGlvX2NvbnRyb2xfdmFsdWVfYWNjZXNzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztRQXNCTSxvQkFBb0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFBcEIsb0JBQW9CLEdBQUcsaUJBQVUsQ0FBQyxJQUFJLGVBQVEsQ0FDaEQsMENBQWlCLEVBQUUsRUFBQyxXQUFXLEVBQUUsaUJBQVUsQ0FBQyxjQUFNLE9BQUEseUJBQXlCLEVBQXpCLENBQXlCLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBR2pHOztlQUVHO1lBRUg7Z0JBQUE7b0JBQ1UsZUFBVSxHQUFVLEVBQUUsQ0FBQztnQkF1QmpDLENBQUM7Z0JBckJDLGtDQUFHLEdBQUgsVUFBSSxPQUFrQixFQUFFLFFBQW1DO29CQUN6RCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxDQUFDO2dCQUVELHFDQUFNLEdBQU4sVUFBTyxRQUFtQztvQkFDeEMsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQzt3QkFDaEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDOzRCQUN2QyxhQUFhLEdBQUcsQ0FBQyxDQUFDO3dCQUNwQixDQUFDO29CQUNILENBQUM7b0JBQ0Qsd0JBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMs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QUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFoQzlEO29CQUFDLFlBQUssRUFBRTs7dUVBQUE7Z0JBVlY7b0JBQUMsZ0JBQVMsQ0FBQzt3QkFDVCxRQUFRLEVBQ0osMEZBQTBGO3dCQUM5RixJQUFJLEVBQUUsRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUM7d0JBQ3pELFNBQVMsRUFBRSxDQUFDLG9CQUFvQixDQUFDO3FCQUNsQyxDQUFDOzs2Q0FBQTtnQkFzQ0YsZ0NBQUM7WUFBRCxDQXJDQSxBQXFDQyxJQUFBO1lBckNELGlFQXFDQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL3JhZGlvX2NvbnRyb2xfdmFsdWVfYWNjZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIFJlbmRlcmVyLFxuICBTZWxmLFxuICBmb3J3YXJkUmVmLFxuICBQcm92aWRlcixcbiAgQXR0cmlidXRlLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG4gIEluamVjdG9yLFxuICBJbmplY3RhYmxlXG59IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTkdfVkFMVUVfQUNDRVNTT1IsXG4gIENvbnRyb2xWYWx1ZUFjY2Vzc29yXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21tb24vZm9ybXMvZGlyZWN0aXZlcy9jb250cm9sX3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7TmdDb250cm9sfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tbW9uL2Zvcm1zL2RpcmVjdGl2ZXMvbmdfY29udHJvbCc7XG5pbXBvcnQge0NPTlNUX0VYUFIsIGxvb3NlSWRlbnRpY2FsLCBpc1ByZXNlbnR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0xpc3RXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuXG5jb25zdCBSQURJT19WQUxVRV9BQ0NFU1NPUiA9IENPTlNUX0VYUFIobmV3IFByb3ZpZGVyKFxuICAgIE5HX1ZBTFVFX0FDQ0VTU09SLCB7dXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUmFkaW9Db250cm9sVmFsdWVBY2Nlc3NvciksIG11bHRpOiB0cnVlfSkpO1xuXG5cbi8qKlxuICogSW50ZXJuYWwgY2xhc3MgdXNlZCBieSBBbmd1bGFyIHRvIHVuY2hlY2sgcmFkaW8gYnV0dG9ucyB3aXRoIHRoZSBtYXRjaGluZyBuYW1lLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmFkaW9Db250cm9sUmVnaXN0cnkge1xuICBwcml2YXRlIF9hY2Nlc3NvcnM6IGFueVtdID0gW107XG5cbiAgYWRkKGNvbnRyb2w6IE5nQ29udHJvbCwgYWNjZXNzb3I6IFJhZGlvQ29udHJvbFZhbHVlQWNjZXNzb3IpIHtcbiAgICB0aGlzLl9hY2Nlc3NvcnMucHVzaChbY29udHJvbCwgYWNjZXNzb3JdKTtcbiAgfVxuXG4gIHJlbW92ZShhY2Nlc3NvcjogUmFkaW9Db250cm9sVmFsdWVBY2Nlc3Nvcikge1xuICAgIHZhciBpbmRleFRvUmVtb3ZlID0gLTE7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9hY2Nlc3NvcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGlmICh0aGlzLl9hY2Nlc3NvcnNbaV1bMV0gPT09IGFjY2Vzc29yKSB7XG4gICAgICAgIGluZGV4VG9SZW1vdmUgPSBpO1xuICAgICAgfVxuICAgIH1cbiAgICBMaXN0V3JhcHBlci5yZW1vdmVBdCh0aGlzLl9hY2Nlc3NvcnMsIGluZGV4VG9SZW1vdmUpO1xuICB9XG5cbiAgc2VsZWN0KGFjY2Vzc29yOiBSYWRpb0NvbnRyb2xWYWx1ZUFjY2Vzc29yKSB7XG4gICAgdGhpcy5fYWNjZXNzb3JzLmZvckVhY2goKGMpID0+IHtcbiAgICAgIGlmIChjWzBdLmNvbnRyb2wucm9vdCA9PT0gYWNjZXNzb3IuX2NvbnRyb2wuY29udHJvbC5yb290ICYmIGNbMV0gIT09IGFjY2Vzc29yKSB7XG4gICAgICAgIGNbMV0uZmlyZVVuY2hlY2soKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIFRoZSB2YWx1ZSBwcm92aWRlZCBieSB0aGUgZm9ybXMgQVBJIGZvciByYWRpbyBidXR0b25zLlxuICovXG5leHBvcnQgY2xhc3MgUmFkaW9CdXR0b25TdGF0ZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjaGVja2VkOiBib29sZWFuLCBwdWJsaWMgdmFsdWU6IHN0cmluZykge31cbn1cblxuXG4vKipcbiAqIFRoZSBhY2Nlc3NvciBmb3Igd3JpdGluZyBhIHJhZGlvIGNvbnRyb2wgdmFsdWUgYW5kIGxpc3RlbmluZyB0byBjaGFuZ2VzIHRoYXQgaXMgdXNlZCBieSB0aGVcbiAqIHtAbGluayBOZ01vZGVsfSwge0BsaW5rIE5nRm9ybUNvbnRyb2x9LCBhbmQge0BsaW5rIE5nQ29udHJvbE5hbWV9IGRpcmVjdGl2ZXMuXG4gKlxuICogICMjIyBFeGFtcGxlXG4gKiAgYGBgXG4gKiAgQENvbXBvbmVudCh7XG4gKiAgICB0ZW1wbGF0ZTogYFxuICogICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgbmFtZT1cImZvb2RcIiBbKG5nTW9kZWwpXT1cImZvb2RDaGlja2VuXCI+XG4gKiAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBuYW1lPVwiZm9vZFwiIFsobmdNb2RlbCldPVwiZm9vZEZpc2hcIj5cbiAqICAgIGBcbiAqICB9KVxuICogIGNsYXNzIEZvb2RDbXAge1xuICogICAgZm9vZENoaWNrZW4gPSBuZXcgUmFkaW9CdXR0b25TdGF0ZSh0cnVlLCBcImNoaWNrZW5cIik7XG4gKiAgICBmb29kRmlzaCA9IG5ldyBSYWRpb0J1dHRvblN0YXRlKGZhbHNlLCBcImZpc2hcIik7XG4gKiAgfVxuICogIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6XG4gICAgICAnaW5wdXRbdHlwZT1yYWRpb11bbmdDb250cm9sXSxpbnB1dFt0eXBlPXJhZGlvXVtuZ0Zvcm1Db250cm9sXSxpbnB1dFt0eXBlPXJhZGlvXVtuZ01vZGVsXScsXG4gIGhvc3Q6IHsnKGNoYW5nZSknOiAnb25DaGFuZ2UoKScsICcoYmx1ciknOiAnb25Ub3VjaGVkKCknfSxcbiAgcHJvdmlkZXJzOiBbUkFESU9fVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIFJhZGlvQ29udHJvbFZhbHVlQWNjZXNzb3IgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgICBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIF9zdGF0ZTogUmFkaW9CdXR0b25TdGF0ZTtcbiAgX2NvbnRyb2w6IE5nQ29udHJvbDtcbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuICBfZm46IEZ1bmN0aW9uO1xuICBvbkNoYW5nZSA9ICgpID0+IHt9O1xuICBvblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIsIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3JlZ2lzdHJ5OiBSYWRpb0NvbnRyb2xSZWdpc3RyeSwgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnRyb2wgPSB0aGlzLl9pbmplY3Rvci5nZXQoTmdDb250cm9sKTtcbiAgICB0aGlzLl9yZWdpc3RyeS5hZGQodGhpcy5fY29udHJvbCwgdGhpcyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHsgdGhpcy5fcmVnaXN0cnkucmVtb3ZlKHRoaXMpOyB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fc3RhdGUgPSB2YWx1ZTtcbiAgICBpZiAoaXNQcmVzZW50KHZhbHVlKSAmJiB2YWx1ZS5jaGVja2VkKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50UHJvcGVydHkodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnY2hlY2tlZCcsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBhbnkpID0+IHt9KTogdm9pZCB7XG4gICAgdGhpcy5fZm4gPSBmbjtcbiAgICB0aGlzLm9uQ2hhbmdlID0gKCkgPT4ge1xuICAgICAgZm4obmV3IFJhZGlvQnV0dG9uU3RhdGUodHJ1ZSwgdGhpcy5fc3RhdGUudmFsdWUpKTtcbiAgICAgIHRoaXMuX3JlZ2lzdHJ5LnNlbGVjdCh0aGlzKTtcbiAgICB9O1xuICB9XG5cbiAgZmlyZVVuY2hlY2soKTogdm9pZCB7IHRoaXMuX2ZuKG5ldyBSYWRpb0J1dHRvblN0YXRlKGZhbHNlLCB0aGlzLl9zdGF0ZS52YWx1ZSkpOyB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHt9KTogdm9pZCB7IHRoaXMub25Ub3VjaGVkID0gZm47IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
