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
    var NUMBER_VALUE_ACCESSOR, NumberValueAccessor;
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
            NUMBER_VALUE_ACCESSOR = lang_1.CONST_EXPR(new core_1.Provider(control_value_accessor_1.NG_VALUE_ACCESSOR, { useExisting: core_1.forwardRef(function () { return NumberValueAccessor; }), multi: true }));
            /**
             * The accessor for writing a number value and listening to changes that is used by the
             * {@link NgModel}, {@link NgFormControl}, and {@link NgControlName} directives.
             *
             *  ### Example
             *  ```
             *  <input type="number" [(ngModel)]="age">
             *  ```
             */
            NumberValueAccessor = (function () {
                function NumberValueAccessor(_renderer, _elementRef) {
                    this._renderer = _renderer;
                    this._elementRef = _elementRef;
                    this.onChange = function (_) { };
                    this.onTouched = function () { };
                }
                NumberValueAccessor.prototype.writeValue = function (value) {
                    this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', value);
                };
                NumberValueAccessor.prototype.registerOnChange = function (fn) {
                    this.onChange = function (value) { fn(value == '' ? null : lang_1.NumberWrapper.parseFloat(value)); };
                };
                NumberValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
                NumberValueAccessor = __decorate([
                    core_1.Directive({
                        selector: 'input[type=number][ngControl],input[type=number][ngFormControl],input[type=number][ngModel]',
                        host: {
                            '(change)': 'onChange($event.target.value)',
                            '(input)': 'onChange($event.target.value)',
                            '(blur)': 'onTouched()'
                        },
                        bindings: [NUMBER_VALUE_ACCESSOR]
                    }), 
                    __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
                ], NumberValueAccessor);
                return NumberValueAccessor;
            }());
            exports_1("NumberValueAccessor", NumberValueAccessor);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZm9ybXMvZGlyZWN0aXZlcy9udW1iZXJfdmFsdWVfYWNjZXNzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztRQUlNLHFCQUFxQjs7Ozs7Ozs7Ozs7OztZQUFyQixxQkFBcUIsR0FBRyxpQkFBVSxDQUFDLElBQUksZUFBUSxDQUNqRCwwQ0FBaUIsRUFBRSxFQUFDLFdBQVcsRUFBRSxpQkFBVSxDQUFDLGNBQU0sT0FBQSxtQkFBbUIsRUFBbkIsQ0FBbUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFFM0Y7Ozs7Ozs7O2VBUUc7WUFXSDtnQkFJRSw2QkFBb0IsU0FBbUIsRUFBVSxXQUF1QjtvQkFBcEQsY0FBUyxHQUFULFNBQVMsQ0FBVTtvQkFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtvQkFIeEUsYUFBUSxHQUFHLFVBQUMsQ0FBTSxJQUFNLENBQUMsQ0FBQztvQkFDMUIsY0FBUyxHQUFHLGNBQU8sQ0FBQyxDQUFDO2dCQUVzRCxDQUFDO2dCQUU1RSx3Q0FBVSxHQUFWLFVBQVcsS0FBYTtvQkFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3BGLENBQUM7Z0JBRUQsOENBQWdCLEdBQWhCLFVBQWlCLEVBQXVCO29CQUN0QyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQUMsS0FBSyxJQUFPLEVBQUUsQ0FBQyxLQUFLLElBQUksRUFBRSxHQUFHLElBQUksR0FBRyxvQkFBYSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzRixDQUFDO2dCQUNELCtDQUFpQixHQUFqQixVQUFrQixFQUFjLElBQVUsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQXZCbEU7b0JBQUMsZ0JBQVMsQ0FBQzt3QkFDVCxRQUFRLEVBQ0osNkZBQTZGO3dCQUNqRyxJQUFJLEVBQUU7NEJBQ0osVUFBVSxFQUFFLCtCQUErQjs0QkFDM0MsU0FBUyxFQUFFLCtCQUErQjs0QkFDMUMsUUFBUSxFQUFFLGFBQWE7eUJBQ3hCO3dCQUNELFFBQVEsRUFBRSxDQUFDLHFCQUFxQixDQUFDO3FCQUNsQyxDQUFDOzt1Q0FBQTtnQkFlRiwwQkFBQztZQUFELENBZEEsQUFjQyxJQUFBO1lBZEQscURBY0MsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tbW9uL2Zvcm1zL2RpcmVjdGl2ZXMvbnVtYmVyX3ZhbHVlX2FjY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIFJlbmRlcmVyLCBTZWxmLCBmb3J3YXJkUmVmLCBQcm92aWRlcn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9jb250cm9sX3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7aXNCbGFuaywgQ09OU1RfRVhQUiwgTnVtYmVyV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuY29uc3QgTlVNQkVSX1ZBTFVFX0FDQ0VTU09SID0gQ09OU1RfRVhQUihuZXcgUHJvdmlkZXIoXG4gICAgTkdfVkFMVUVfQUNDRVNTT1IsIHt1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOdW1iZXJWYWx1ZUFjY2Vzc29yKSwgbXVsdGk6IHRydWV9KSk7XG5cbi8qKlxuICogVGhlIGFjY2Vzc29yIGZvciB3cml0aW5nIGEgbnVtYmVyIHZhbHVlIGFuZCBsaXN0ZW5pbmcgdG8gY2hhbmdlcyB0aGF0IGlzIHVzZWQgYnkgdGhlXG4gKiB7QGxpbmsgTmdNb2RlbH0sIHtAbGluayBOZ0Zvcm1Db250cm9sfSwgYW5kIHtAbGluayBOZ0NvbnRyb2xOYW1lfSBkaXJlY3RpdmVzLlxuICpcbiAqICAjIyMgRXhhbXBsZVxuICogIGBgYFxuICogIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgWyhuZ01vZGVsKV09XCJhZ2VcIj5cbiAqICBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOlxuICAgICAgJ2lucHV0W3R5cGU9bnVtYmVyXVtuZ0NvbnRyb2xdLGlucHV0W3R5cGU9bnVtYmVyXVtuZ0Zvcm1Db250cm9sXSxpbnB1dFt0eXBlPW51bWJlcl1bbmdNb2RlbF0nLFxuICBob3N0OiB7XG4gICAgJyhjaGFuZ2UpJzogJ29uQ2hhbmdlKCRldmVudC50YXJnZXQudmFsdWUpJyxcbiAgICAnKGlucHV0KSc6ICdvbkNoYW5nZSgkZXZlbnQudGFyZ2V0LnZhbHVlKScsXG4gICAgJyhibHVyKSc6ICdvblRvdWNoZWQoKSdcbiAgfSxcbiAgYmluZGluZ3M6IFtOVU1CRVJfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIE51bWJlclZhbHVlQWNjZXNzb3IgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG4gIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlciwgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50UHJvcGVydHkodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCB2YWx1ZSk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogbnVtYmVyKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9ICh2YWx1ZSkgPT4geyBmbih2YWx1ZSA9PSAnJyA/IG51bGwgOiBOdW1iZXJXcmFwcGVyLnBhcnNlRmxvYXQodmFsdWUpKTsgfTtcbiAgfVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQgeyB0aGlzLm9uVG91Y2hlZCA9IGZuOyB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
