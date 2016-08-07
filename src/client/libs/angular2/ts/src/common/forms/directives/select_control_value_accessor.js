System.register(['angular2/core', './control_value_accessor', 'angular2/src/facade/lang', 'angular2/src/facade/collection'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, control_value_accessor_1, lang_1, collection_1;
    var SELECT_VALUE_ACCESSOR, SelectControlValueAccessor, NgSelectOption;
    function _buildValueString(id, value) {
        if (lang_1.isBlank(id))
            return "" + value;
        if (!lang_1.isPrimitive(value))
            value = "Object";
        return lang_1.StringWrapper.slice(id + ": " + value, 0, 50);
    }
    function _extractId(valueString) {
        return valueString.split(":")[0];
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (control_value_accessor_1_1) {
                control_value_accessor_1 = control_value_accessor_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            }],
        execute: function() {
            SELECT_VALUE_ACCESSOR = lang_1.CONST_EXPR(new core_1.Provider(control_value_accessor_1.NG_VALUE_ACCESSOR, { useExisting: core_1.forwardRef(function () { return SelectControlValueAccessor; }), multi: true }));
            /**
             * The accessor for writing a value and listening to changes on a select element.
             */
            SelectControlValueAccessor = (function () {
                function SelectControlValueAccessor(_renderer, _elementRef) {
                    this._renderer = _renderer;
                    this._elementRef = _elementRef;
                    this._optionMap = new Map();
                    this._idCounter = 0;
                    this.onChange = function (_) { };
                    this.onTouched = function () { };
                }
                SelectControlValueAccessor.prototype.writeValue = function (value) {
                    this.value = value;
                    var valueString = _buildValueString(this._getOptionId(value), value);
                    this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', valueString);
                };
                SelectControlValueAccessor.prototype.registerOnChange = function (fn) {
                    var _this = this;
                    this.onChange = function (valueString) { fn(_this._getOptionValue(valueString)); };
                };
                SelectControlValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
                SelectControlValueAccessor.prototype._registerOption = function () { return (this._idCounter++).toString(); };
                SelectControlValueAccessor.prototype._getOptionId = function (value) {
                    for (var _i = 0, _a = collection_1.MapWrapper.keys(this._optionMap); _i < _a.length; _i++) {
                        var id = _a[_i];
                        if (lang_1.looseIdentical(this._optionMap.get(id), value))
                            return id;
                    }
                    return null;
                };
                SelectControlValueAccessor.prototype._getOptionValue = function (valueString) {
                    var value = this._optionMap.get(_extractId(valueString));
                    return lang_1.isPresent(value) ? value : valueString;
                };
                SelectControlValueAccessor = __decorate([
                    core_1.Directive({
                        selector: 'select[ngControl],select[ngFormControl],select[ngModel]',
                        host: { '(input)': 'onChange($event.target.value)', '(blur)': 'onTouched()' },
                        providers: [SELECT_VALUE_ACCESSOR]
                    }), 
                    __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
                ], SelectControlValueAccessor);
                return SelectControlValueAccessor;
            }());
            exports_1("SelectControlValueAccessor", SelectControlValueAccessor);
            /**
             * Marks `<option>` as dynamic, so Angular can be notified when options change.
             *
             * ### Example
             *
             * ```
             * <select ngControl="city">
             *   <option *ngFor="#c of cities" [value]="c"></option>
             * </select>
             * ```
             */
            NgSelectOption = (function () {
                function NgSelectOption(_element, _renderer, _select) {
                    this._element = _element;
                    this._renderer = _renderer;
                    this._select = _select;
                    if (lang_1.isPresent(this._select))
                        this.id = this._select._registerOption();
                }
                Object.defineProperty(NgSelectOption.prototype, "ngValue", {
                    set: function (value) {
                        if (this._select == null)
                            return;
                        this._select._optionMap.set(this.id, value);
                        this._setElementValue(_buildValueString(this.id, value));
                        this._select.writeValue(this._select.value);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgSelectOption.prototype, "value", {
                    set: function (value) {
                        if (this._select == null)
                            return;
                        this._setElementValue(value);
                        this._select.writeValue(this._select.value);
                    },
                    enumerable: true,
                    configurable: true
                });
                NgSelectOption.prototype._setElementValue = function (value) {
                    this._renderer.setElementProperty(this._element.nativeElement, 'value', value);
                };
                NgSelectOption.prototype.ngOnDestroy = function () {
                    if (lang_1.isPresent(this._select)) {
                        this._select._optionMap.delete(this.id);
                        this._select.writeValue(this._select.value);
                    }
                };
                __decorate([
                    core_1.Input('ngValue'), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], NgSelectOption.prototype, "ngValue", null);
                __decorate([
                    core_1.Input('value'), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], NgSelectOption.prototype, "value", null);
                NgSelectOption = __decorate([
                    core_1.Directive({ selector: 'option' }),
                    __param(2, core_1.Optional()),
                    __param(2, core_1.Host()), 
                    __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer, SelectControlValueAccessor])
                ], NgSelectOption);
                return NgSelectOption;
            }());
            exports_1("NgSelectOption", NgSelectOption);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL3NlbGVjdF9jb250cm9sX3ZhbHVlX2FjY2Vzc29yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7UUF1Qk0scUJBQXFCO0lBRzNCLDJCQUEyQixFQUFVLEVBQUUsS0FBVTtRQUMvQyxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsS0FBRyxLQUFPLENBQUM7UUFDbkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxrQkFBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztRQUMxQyxNQUFNLENBQUMsb0JBQWEsQ0FBQyxLQUFLLENBQUksRUFBRSxVQUFLLEtBQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELG9CQUFvQixXQUFtQjtRQUNyQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O1lBWEsscUJBQXFCLEdBQUcsaUJBQVUsQ0FBQyxJQUFJLGVBQVEsQ0FDakQsMENBQWlCLEVBQUUsRUFBQyxXQUFXLEVBQUUsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsMEJBQTBCLEVBQTFCLENBQTBCLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBWWxHOztlQUVHO1lBTUg7Z0JBUUUsb0NBQW9CLFNBQW1CLEVBQVUsV0FBdUI7b0JBQXBELGNBQVMsR0FBVCxTQUFTLENBQVU7b0JBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7b0JBTnhFLGVBQVUsR0FBcUIsSUFBSSxHQUFHLEVBQWUsQ0FBQztvQkFDdEQsZUFBVSxHQUFXLENBQUMsQ0FBQztvQkFFdkIsYUFBUSxHQUFHLFVBQUMs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QUFPLENBQUM7OzsyREFBQTtnQkFqQmpCO29CQUFDLGdCQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFDLENBQUM7K0JBS2pCLGVBQVEsRUFBRTsrQkFBRSxXQUFJLEVBQUU7O2tDQUxEO2dCQWtDaEMscUJBQUM7WUFBRCxDQWpDQSxBQWlDQyxJQUFBO1lBakNELDJDQWlDQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL3NlbGVjdF9jb250cm9sX3ZhbHVlX2FjY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBSZW5kZXJlcixcbiAgZm9yd2FyZFJlZixcbiAgUHJvdmlkZXIsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBIb3N0LFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsXG59IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJy4vY29udHJvbF92YWx1ZV9hY2Nlc3Nvcic7XG5pbXBvcnQge1xuICBDT05TVF9FWFBSLFxuICBTdHJpbmdXcmFwcGVyLFxuICBpc1ByaW1pdGl2ZSxcbiAgaXNQcmVzZW50LFxuICBpc0JsYW5rLFxuICBsb29zZUlkZW50aWNhbFxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG5pbXBvcnQge01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5cbmNvbnN0IFNFTEVDVF9WQUxVRV9BQ0NFU1NPUiA9IENPTlNUX0VYUFIobmV3IFByb3ZpZGVyKFxuICAgIE5HX1ZBTFVFX0FDQ0VTU09SLCB7dXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2VsZWN0Q29udHJvbFZhbHVlQWNjZXNzb3IpLCBtdWx0aTogdHJ1ZX0pKTtcblxuZnVuY3Rpb24gX2J1aWxkVmFsdWVTdHJpbmcoaWQ6IHN0cmluZywgdmFsdWU6IGFueSk6IHN0cmluZyB7XG4gIGlmIChpc0JsYW5rKGlkKSkgcmV0dXJuIGAke3ZhbHVlfWA7XG4gIGlmICghaXNQcmltaXRpdmUodmFsdWUpKSB2YWx1ZSA9IFwiT2JqZWN0XCI7XG4gIHJldHVybiBTdHJpbmdXcmFwcGVyLnNsaWNlKGAke2lkfTogJHt2YWx1ZX1gLCAwLCA1MCk7XG59XG5cbmZ1bmN0aW9uIF9leHRyYWN0SWQodmFsdWVTdHJpbmc6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiB2YWx1ZVN0cmluZy5zcGxpdChcIjpcIilbMF07XG59XG5cbi8qKlxuICogVGhlIGFjY2Vzc29yIGZvciB3cml0aW5nIGEgdmFsdWUgYW5kIGxpc3RlbmluZyB0byBjaGFuZ2VzIG9uIGEgc2VsZWN0IGVsZW1lbnQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3NlbGVjdFtuZ0NvbnRyb2xdLHNlbGVjdFtuZ0Zvcm1Db250cm9sXSxzZWxlY3RbbmdNb2RlbF0nLFxuICBob3N0OiB7JyhpbnB1dCknOiAnb25DaGFuZ2UoJGV2ZW50LnRhcmdldC52YWx1ZSknLCAnKGJsdXIpJzogJ29uVG91Y2hlZCgpJ30sXG4gIHByb3ZpZGVyczogW1NFTEVDVF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0Q29udHJvbFZhbHVlQWNjZXNzb3IgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIHZhbHVlOiBhbnk7XG4gIF9vcHRpb25NYXA6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICBfaWRDb3VudGVyOiBudW1iZXIgPSAwO1xuXG4gIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG4gIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlciwgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdmFyIHZhbHVlU3RyaW5nID0gX2J1aWxkVmFsdWVTdHJpbmcodGhpcy5fZ2V0T3B0aW9uSWQodmFsdWUpLCB2YWx1ZSk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFByb3BlcnR5KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgdmFsdWVTdHJpbmcpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSAodmFsdWVTdHJpbmc6IHN0cmluZykgPT4geyBmbih0aGlzLl9nZXRPcHRpb25WYWx1ZSh2YWx1ZVN0cmluZykpOyB9O1xuICB9XG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5vblRvdWNoZWQgPSBmbjsgfVxuXG4gIF9yZWdpc3Rlck9wdGlvbigpOiBzdHJpbmcgeyByZXR1cm4gKHRoaXMuX2lkQ291bnRlcisrKS50b1N0cmluZygpOyB9XG5cbiAgX2dldE9wdGlvbklkKHZhbHVlOiBhbnkpOiBzdHJpbmcge1xuICAgIGZvciAobGV0IGlkIG9mIE1hcFdyYXBwZXIua2V5cyh0aGlzLl9vcHRpb25NYXApKSB7XG4gICAgICBpZiAobG9vc2VJZGVudGljYWwodGhpcy5fb3B0aW9uTWFwLmdldChpZCksIHZhbHVlKSkgcmV0dXJuIGlkO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIF9nZXRPcHRpb25WYWx1ZSh2YWx1ZVN0cmluZzogc3RyaW5nKTogYW55IHtcbiAgICBsZXQgdmFsdWUgPSB0aGlzLl9vcHRpb25NYXAuZ2V0KF9leHRyYWN0SWQodmFsdWVTdHJpbmcpKTtcbiAgICByZXR1cm4gaXNQcmVzZW50KHZhbHVlKSA/IHZhbHVlIDogdmFsdWVTdHJpbmc7XG4gIH1cbn1cblxuLyoqXG4gKiBNYXJrcyBgPG9wdGlvbj5gIGFzIGR5bmFtaWMsIHNvIEFuZ3VsYXIgY2FuIGJlIG5vdGlmaWVkIHdoZW4gb3B0aW9ucyBjaGFuZ2UuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGBcbiAqIDxzZWxlY3QgbmdDb250cm9sPVwiY2l0eVwiPlxuICogICA8b3B0aW9uICpuZ0Zvcj1cIiNjIG9mIGNpdGllc1wiIFt2YWx1ZV09XCJjXCI+PC9vcHRpb24+XG4gKiA8L3NlbGVjdD5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ29wdGlvbid9KVxuZXhwb3J0IGNsYXNzIE5nU2VsZWN0T3B0aW9uIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgaWQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBIb3N0KCkgcHJpdmF0ZSBfc2VsZWN0OiBTZWxlY3RDb250cm9sVmFsdWVBY2Nlc3Nvcikge1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fc2VsZWN0KSkgdGhpcy5pZCA9IHRoaXMuX3NlbGVjdC5fcmVnaXN0ZXJPcHRpb24oKTtcbiAgfVxuXG4gIEBJbnB1dCgnbmdWYWx1ZScpXG4gIHNldCBuZ1ZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5fc2VsZWN0ID09IG51bGwpIHJldHVybjtcbiAgICB0aGlzLl9zZWxlY3QuX29wdGlvbk1hcC5zZXQodGhpcy5pZCwgdmFsdWUpO1xuICAgIHRoaXMuX3NldEVsZW1lbnRWYWx1ZShfYnVpbGRWYWx1ZVN0cmluZyh0aGlzLmlkLCB2YWx1ZSkpO1xuICAgIHRoaXMuX3NlbGVjdC53cml0ZVZhbHVlKHRoaXMuX3NlbGVjdC52YWx1ZSk7XG4gIH1cblxuICBASW5wdXQoJ3ZhbHVlJylcbiAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5fc2VsZWN0ID09IG51bGwpIHJldHVybjtcbiAgICB0aGlzLl9zZXRFbGVtZW50VmFsdWUodmFsdWUpO1xuICAgIHRoaXMuX3NlbGVjdC53cml0ZVZhbHVlKHRoaXMuX3NlbGVjdC52YWx1ZSk7XG4gIH1cblxuICBfc2V0RWxlbWVudFZhbHVlKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50UHJvcGVydHkodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCB2YWx1ZSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuX3NlbGVjdCkpIHtcbiAgICAgIHRoaXMuX3NlbGVjdC5fb3B0aW9uTWFwLmRlbGV0ZSh0aGlzLmlkKTtcbiAgICAgIHRoaXMuX3NlbGVjdC53cml0ZVZhbHVlKHRoaXMuX3NlbGVjdC52YWx1ZSk7XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
