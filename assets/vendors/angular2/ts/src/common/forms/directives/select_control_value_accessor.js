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
             *
             * Note: We have to listen to the 'change' event because 'input' events aren't fired
             * for selects in Firefox and IE:
             * https://bugzilla.mozilla.org/show_bug.cgi?id=1024350
             * https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/4660045/
             *
             */
            SelectControlValueAccessor = (function () {
                function SelectControlValueAccessor(_renderer, _elementRef) {
                    this._renderer = _renderer;
                    this._elementRef = _elementRef;
                    /** @internal */
                    this._optionMap = new Map();
                    /** @internal */
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
                /** @internal */
                SelectControlValueAccessor.prototype._registerOption = function () { return (this._idCounter++).toString(); };
                /** @internal */
                SelectControlValueAccessor.prototype._getOptionId = function (value) {
                    for (var _i = 0, _a = collection_1.MapWrapper.keys(this._optionMap); _i < _a.length; _i++) {
                        var id = _a[_i];
                        if (lang_1.looseIdentical(this._optionMap.get(id), value))
                            return id;
                    }
                    return null;
                };
                /** @internal */
                SelectControlValueAccessor.prototype._getOptionValue = function (valueString) {
                    var value = this._optionMap.get(_extractId(valueString));
                    return lang_1.isPresent(value) ? value : valueString;
                };
                SelectControlValueAccessor = __decorate([
                    core_1.Directive({
                        selector: 'select[ngControl],select[ngFormControl],select[ngModel]',
                        host: { '(change)': 'onChange($event.target.value)', '(blur)': 'onTouched()' },
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
             *   <option *ngFor="let c of cities" [value]="c"></option>
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
                        this._setElementValue(value);
                        if (lang_1.isPresent(this._select))
                            this._select.writeValue(this._select.value);
                    },
                    enumerable: true,
                    configurable: true
                });
                /** @internal */
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZm9ybXMvZGlyZWN0aXZlcy9zZWxlY3RfY29udHJvbF92YWx1ZV9hY2Nlc3Nvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O1FBdUJNLHFCQUFxQjtJQUczQiwyQkFBMkIsRUFBVSxFQUFFLEtBQVU7UUFDL0MsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLEtBQUcsS0FBTyxDQUFDO1FBQ25DLEVBQUUsQ0FBQyxDQUFDLENBQUMsa0JBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7UUFDMUMsTUFBTSxDQUFDLG9CQUFhLENBQUMsS0FBSyxDQUFJLEVBQUUsVUFBSyxLQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxvQkFBb0IsV0FBbUI7UUFDckMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztZQVhLLHFCQUFxQixHQUFHLGlCQUFVLENBQUMsSUFBSSxlQUFRLENBQ2pELDBDQUFpQixFQUFFLEVBQUMsV0FBVyxFQUFFLGlCQUFVLENBQUMsY0FBTSxPQUFBLDBCQUEwQixFQUExQixDQUEwQixDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQztZQVlsRzs7Ozs7Ozs7ZUFRRztZQU1IO2dCQVVFLG9DQUFvQixTQUFtQixFQUFVLFdBQXVCO29CQUFwRCxjQUFTLEdBQVQsU0FBUyxDQUFVO29CQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFZO29CQVJ4RSxnQkFBZ0I7b0JBQ2hCLGVBQVUsR0FBcUIsSUFBSSxHQUFHLEVBQWUsQ0FBQztvQkFDdEQsZ0JBQWdCO29CQUNoQixlQUFVLEdBQVcsQ0FB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QUNILENBQUM7Z0JBeEJEO29CQUFDLFlBQUssQ0FBQyxTQUFTLENBQUM7Ozs2REFBQTtnQkFRakI7b0JBQUMsWUFBSyxDQUFDLE9BQU8sQ0FBQzs7OzJEQUFBO2dCQWpCakI7b0JBQUMsZ0JBQVMsQ0FBQyxFQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUMsQ0FBQzsrQkFLakIsZUFBUSxFQUFFOytCQUFFLFdBQUksRUFBRTs7a0NBTEQ7Z0JBa0NoQyxxQkFBQztZQUFELENBakNBLEFBaUNDLElBQUE7WUFqQ0QsMkNBaUNDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL3NlbGVjdF9jb250cm9sX3ZhbHVlX2FjY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBSZW5kZXJlcixcbiAgZm9yd2FyZFJlZixcbiAgUHJvdmlkZXIsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBIb3N0LFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsXG59IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJy4vY29udHJvbF92YWx1ZV9hY2Nlc3Nvcic7XG5pbXBvcnQge1xuICBDT05TVF9FWFBSLFxuICBTdHJpbmdXcmFwcGVyLFxuICBpc1ByaW1pdGl2ZSxcbiAgaXNQcmVzZW50LFxuICBpc0JsYW5rLFxuICBsb29zZUlkZW50aWNhbFxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG5pbXBvcnQge01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5cbmNvbnN0IFNFTEVDVF9WQUxVRV9BQ0NFU1NPUiA9IENPTlNUX0VYUFIobmV3IFByb3ZpZGVyKFxuICAgIE5HX1ZBTFVFX0FDQ0VTU09SLCB7dXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2VsZWN0Q29udHJvbFZhbHVlQWNjZXNzb3IpLCBtdWx0aTogdHJ1ZX0pKTtcblxuZnVuY3Rpb24gX2J1aWxkVmFsdWVTdHJpbmcoaWQ6IHN0cmluZywgdmFsdWU6IGFueSk6IHN0cmluZyB7XG4gIGlmIChpc0JsYW5rKGlkKSkgcmV0dXJuIGAke3ZhbHVlfWA7XG4gIGlmICghaXNQcmltaXRpdmUodmFsdWUpKSB2YWx1ZSA9IFwiT2JqZWN0XCI7XG4gIHJldHVybiBTdHJpbmdXcmFwcGVyLnNsaWNlKGAke2lkfTogJHt2YWx1ZX1gLCAwLCA1MCk7XG59XG5cbmZ1bmN0aW9uIF9leHRyYWN0SWQodmFsdWVTdHJpbmc6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiB2YWx1ZVN0cmluZy5zcGxpdChcIjpcIilbMF07XG59XG5cbi8qKlxuICogVGhlIGFjY2Vzc29yIGZvciB3cml0aW5nIGEgdmFsdWUgYW5kIGxpc3RlbmluZyB0byBjaGFuZ2VzIG9uIGEgc2VsZWN0IGVsZW1lbnQuXG4gKlxuICogTm90ZTogV2UgaGF2ZSB0byBsaXN0ZW4gdG8gdGhlICdjaGFuZ2UnIGV2ZW50IGJlY2F1c2UgJ2lucHV0JyBldmVudHMgYXJlbid0IGZpcmVkXG4gKiBmb3Igc2VsZWN0cyBpbiBGaXJlZm94IGFuZCBJRTpcbiAqIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTEwMjQzNTBcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vZW4tdXMvbWljcm9zb2Z0LWVkZ2UvcGxhdGZvcm0vaXNzdWVzLzQ2NjAwNDUvXG4gKlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdzZWxlY3RbbmdDb250cm9sXSxzZWxlY3RbbmdGb3JtQ29udHJvbF0sc2VsZWN0W25nTW9kZWxdJyxcbiAgaG9zdDogeycoY2hhbmdlKSc6ICdvbkNoYW5nZSgkZXZlbnQudGFyZ2V0LnZhbHVlKScsICcoYmx1ciknOiAnb25Ub3VjaGVkKCknfSxcbiAgcHJvdmlkZXJzOiBbU0VMRUNUX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RDb250cm9sVmFsdWVBY2Nlc3NvciBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgdmFsdWU6IGFueTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfb3B0aW9uTWFwOiBNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfaWRDb3VudGVyOiBudW1iZXIgPSAwO1xuXG4gIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG4gIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlciwgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdmFyIHZhbHVlU3RyaW5nID0gX2J1aWxkVmFsdWVTdHJpbmcodGhpcy5fZ2V0T3B0aW9uSWQodmFsdWUpLCB2YWx1ZSk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFByb3BlcnR5KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgdmFsdWVTdHJpbmcpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSAodmFsdWVTdHJpbmc6IHN0cmluZykgPT4geyBmbih0aGlzLl9nZXRPcHRpb25WYWx1ZSh2YWx1ZVN0cmluZykpOyB9O1xuICB9XG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5vblRvdWNoZWQgPSBmbjsgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3JlZ2lzdGVyT3B0aW9uKCk6IHN0cmluZyB7IHJldHVybiAodGhpcy5faWRDb3VudGVyKyspLnRvU3RyaW5nKCk7IH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9nZXRPcHRpb25JZCh2YWx1ZTogYW55KTogc3RyaW5nIHtcbiAgICBmb3IgKGxldCBpZCBvZiBNYXBXcmFwcGVyLmtleXModGhpcy5fb3B0aW9uTWFwKSkge1xuICAgICAgaWYgKGxvb3NlSWRlbnRpY2FsKHRoaXMuX29wdGlvbk1hcC5nZXQoaWQpLCB2YWx1ZSkpIHJldHVybiBpZDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9nZXRPcHRpb25WYWx1ZSh2YWx1ZVN0cmluZzogc3RyaW5nKTogYW55IHtcbiAgICBsZXQgdmFsdWUgPSB0aGlzLl9vcHRpb25NYXAuZ2V0KF9leHRyYWN0SWQodmFsdWVTdHJpbmcpKTtcbiAgICByZXR1cm4gaXNQcmVzZW50KHZhbHVlKSA/IHZhbHVlIDogdmFsdWVTdHJpbmc7XG4gIH1cbn1cblxuLyoqXG4gKiBNYXJrcyBgPG9wdGlvbj5gIGFzIGR5bmFtaWMsIHNvIEFuZ3VsYXIgY2FuIGJlIG5vdGlmaWVkIHdoZW4gb3B0aW9ucyBjaGFuZ2UuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGBcbiAqIDxzZWxlY3QgbmdDb250cm9sPVwiY2l0eVwiPlxuICogICA8b3B0aW9uICpuZ0Zvcj1cImxldCBjIG9mIGNpdGllc1wiIFt2YWx1ZV09XCJjXCI+PC9vcHRpb24+XG4gKiA8L3NlbGVjdD5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ29wdGlvbid9KVxuZXhwb3J0IGNsYXNzIE5nU2VsZWN0T3B0aW9uIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgaWQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBIb3N0KCkgcHJpdmF0ZSBfc2VsZWN0OiBTZWxlY3RDb250cm9sVmFsdWVBY2Nlc3Nvcikge1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fc2VsZWN0KSkgdGhpcy5pZCA9IHRoaXMuX3NlbGVjdC5fcmVnaXN0ZXJPcHRpb24oKTtcbiAgfVxuXG4gIEBJbnB1dCgnbmdWYWx1ZScpXG4gIHNldCBuZ1ZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5fc2VsZWN0ID09IG51bGwpIHJldHVybjtcbiAgICB0aGlzLl9zZWxlY3QuX29wdGlvbk1hcC5zZXQodGhpcy5pZCwgdmFsdWUpO1xuICAgIHRoaXMuX3NldEVsZW1lbnRWYWx1ZShfYnVpbGRWYWx1ZVN0cmluZyh0aGlzLmlkLCB2YWx1ZSkpO1xuICAgIHRoaXMuX3NlbGVjdC53cml0ZVZhbHVlKHRoaXMuX3NlbGVjdC52YWx1ZSk7XG4gIH1cblxuICBASW5wdXQoJ3ZhbHVlJylcbiAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9zZXRFbGVtZW50VmFsdWUodmFsdWUpO1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fc2VsZWN0KSkgdGhpcy5fc2VsZWN0LndyaXRlVmFsdWUodGhpcy5fc2VsZWN0LnZhbHVlKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3NldEVsZW1lbnRWYWx1ZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFByb3BlcnR5KHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgdmFsdWUpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl9zZWxlY3QpKSB7XG4gICAgICB0aGlzLl9zZWxlY3QuX29wdGlvbk1hcC5kZWxldGUodGhpcy5pZCk7XG4gICAgICB0aGlzLl9zZWxlY3Qud3JpdGVWYWx1ZSh0aGlzLl9zZWxlY3QudmFsdWUpO1xuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
