System.register(['angular2/core', './control_value_accessor', 'angular2/src/facade/lang'], function(exports_1, context_1) {
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
    var core_1, control_value_accessor_1, lang_1;
    var CHECKBOX_VALUE_ACCESSOR, CheckboxControlValueAccessor;
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
            }],
        execute: function() {
            CHECKBOX_VALUE_ACCESSOR = lang_1.CONST_EXPR(new core_1.Provider(control_value_accessor_1.NG_VALUE_ACCESSOR, { useExisting: core_1.forwardRef(function () { return CheckboxControlValueAccessor; }), multi: true }));
            /**
             * The accessor for writing a value and listening to changes on a checkbox input element.
             *
             *  ### Example
             *  ```
             *  <input type="checkbox" ngControl="rememberLogin">
             *  ```
             */
            CheckboxControlValueAccessor = (function () {
                function CheckboxControlValueAccessor(_renderer, _elementRef) {
                    this._renderer = _renderer;
                    this._elementRef = _elementRef;
                    this.onChange = function (_) { };
                    this.onTouched = function () { };
                }
                CheckboxControlValueAccessor.prototype.writeValue = function (value) {
                    this._renderer.setElementProperty(this._elementRef.nativeElement, 'checked', value);
                };
                CheckboxControlValueAccessor.prototype.registerOnChange = function (fn) { this.onChange = fn; };
                CheckboxControlValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
                CheckboxControlValueAccessor = __decorate([
                    core_1.Directive({
                        selector: 'input[type=checkbox][ngControl],input[type=checkbox][ngFormControl],input[type=checkbox][ngModel]',
                        host: { '(change)': 'onChange($event.target.checked)', '(blur)': 'onTouched()' },
                        providers: [CHECKBOX_VALUE_ACCESSOR]
                    }), 
                    __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
                ], CheckboxControlValueAccessor);
                return CheckboxControlValueAccessor;
            }());
            exports_1("CheckboxControlValueAccessor", CheckboxControlValueAccessor);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZm9ybXMvZGlyZWN0aXZlcy9jaGVja2JveF92YWx1ZV9hY2Nlc3Nvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBS00sdUJBQXVCOzs7Ozs7Ozs7Ozs7O1lBQXZCLHVCQUF1QixHQUFHLGlCQUFVLENBQUMsSUFBSSxlQUFRLENBQ25ELDBDQUFpQixFQUFFLEVBQUMsV0FBVyxFQUFFLGlCQUFVLENBQUMsY0FBTSxPQUFBLDRCQUE0QixFQUE1QixDQUE0QixDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQztZQUVwRzs7Ozs7OztlQU9HO1lBT0g7Z0JBSUUsc0NBQW9CLFNBQW1CLEVBQVUsV0FBdUI7b0JBQXBELGNBQVMsR0FBVCxTQUFTLENBQVU7b0JBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7b0JBSHhFLGFBQVEsR0FBRyxVQUFDLENBQU0sSUFBTSxDQUFDLENBQUM7b0JBQzFCLGNBQVMsR0FBRyxjQUFPLENBQUMsQ0FBQztnQkFFc0QsQ0FBQztnQkFFNUUsaURBQVUsR0FBVixVQUFXLEtBQVU7b0JBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN0RixDQUFDO2dCQUNELHVEQUFnQixHQUFoQixVQUFpQixFQUFrQixJQUFVLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDbEUsd0RBQWlCLEdBQWpCLFVBQWtCLEVBQVksSUFBVSxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBaEJoRTtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFDSixtR0FBbUc7d0JBQ3ZHLElBQUksRUFBRSxFQUFDLFVBQVUsRUFBRSxpQ0FBaUMsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFDO3dCQUM5RSxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztxQkFDckMsQ0FBQzs7Z0RBQUE7Z0JBWUYsbUNBQUM7WUFBRCxDQVhBLEFBV0MsSUFBQTtZQVhELHVFQVdDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL2NoZWNrYm94X3ZhbHVlX2FjY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIFJlbmRlcmVyLCBFbGVtZW50UmVmLCBTZWxmLCBmb3J3YXJkUmVmLCBQcm92aWRlcn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5cbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL2NvbnRyb2xfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtDT05TVF9FWFBSfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG5jb25zdCBDSEVDS0JPWF9WQUxVRV9BQ0NFU1NPUiA9IENPTlNUX0VYUFIobmV3IFByb3ZpZGVyKFxuICAgIE5HX1ZBTFVFX0FDQ0VTU09SLCB7dXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ2hlY2tib3hDb250cm9sVmFsdWVBY2Nlc3NvciksIG11bHRpOiB0cnVlfSkpO1xuXG4vKipcbiAqIFRoZSBhY2Nlc3NvciBmb3Igd3JpdGluZyBhIHZhbHVlIGFuZCBsaXN0ZW5pbmcgdG8gY2hhbmdlcyBvbiBhIGNoZWNrYm94IGlucHV0IGVsZW1lbnQuXG4gKlxuICogICMjIyBFeGFtcGxlXG4gKiAgYGBgXG4gKiAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5nQ29udHJvbD1cInJlbWVtYmVyTG9naW5cIj5cbiAqICBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOlxuICAgICAgJ2lucHV0W3R5cGU9Y2hlY2tib3hdW25nQ29udHJvbF0saW5wdXRbdHlwZT1jaGVja2JveF1bbmdGb3JtQ29udHJvbF0saW5wdXRbdHlwZT1jaGVja2JveF1bbmdNb2RlbF0nLFxuICBob3N0OiB7JyhjaGFuZ2UpJzogJ29uQ2hhbmdlKCRldmVudC50YXJnZXQuY2hlY2tlZCknLCAnKGJsdXIpJzogJ29uVG91Y2hlZCgpJ30sXG4gIHByb3ZpZGVyczogW0NIRUNLQk9YX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBDaGVja2JveENvbnRyb2xWYWx1ZUFjY2Vzc29yIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuICBvblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIsIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFByb3BlcnR5KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2NoZWNrZWQnLCB2YWx1ZSk7XG4gIH1cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKF86IGFueSkgPT4ge30pOiB2b2lkIHsgdGhpcy5vbkNoYW5nZSA9IGZuOyB9XG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB7fSk6IHZvaWQgeyB0aGlzLm9uVG91Y2hlZCA9IGZuOyB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
