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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZm9ybXMvZGlyZWN0aXZlcy9yYWRpb19jb250cm9sX3ZhbHVlX2FjY2Vzc29yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7UUFzQk0sb0JBQW9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBQXBCLG9CQUFvQixHQUFHLGlCQUFVLENBQUMsSUFBSSxlQUFRLENBQ2hELDBDQUFpQixFQUFFLEVBQUMsV0FBVyxFQUFFLGlCQUFVLENBQUMsY0FBTSxPQUFBLHlCQUF5QixFQUF6QixDQUF5QixDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQztZQUdqRzs7ZUFFRztZQUVIO2dCQUFBO29CQUNVLGVBQVUsR0FBVSxFQUFFLENBQUM7Z0JBdUJqQyxDQUFDO2dCQXJCQyxrQ0FBRyxHQUFILFVBQUksT0FBa0IsRUFBRSxRQUFtQztvQkFDekQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDNUMsQ0FBQztnQkFFRCxxQ0FBTSxHQUFOLFVBQU8sUUFBbUM7b0JBQ3hDLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUN2QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7d0JBQ2hELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQzs0QkFDdkMsYUFBYSxHQUFHLENBQUMsQ0FBQzt3QkFDcEIsQ0FBQztvQkFDSCxDQUFDO29CQUNELHdCQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUM7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QUUsQ0FBQyxDQUFDLENBQUM7Z0JBakM5RDtvQkFBQyxZQUFLLEVBQUU7O3VFQUFBO2dCQVpWO29CQUFDLGdCQUFTLENBQUM7d0JBQ1QsUUFBUSxFQUNKLDBGQUEwRjt3QkFDOUYsSUFBSSxFQUFFLEVBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFDO3dCQUN6RCxTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztxQkFDbEMsQ0FBQzs7NkNBQUE7Z0JBeUNGLGdDQUFDO1lBQUQsQ0F4Q0EsQUF3Q0MsSUFBQTtZQXhDRCxpRUF3Q0MsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tbW9uL2Zvcm1zL2RpcmVjdGl2ZXMvcmFkaW9fY29udHJvbF92YWx1ZV9hY2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgUmVuZGVyZXIsXG4gIFNlbGYsXG4gIGZvcndhcmRSZWYsXG4gIFByb3ZpZGVyLFxuICBBdHRyaWJ1dGUsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbiAgSW5qZWN0b3IsXG4gIEluamVjdGFibGVcbn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1xuICBOR19WQUxVRV9BQ0NFU1NPUixcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3Jcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL2NvbnRyb2xfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtOZ0NvbnRyb2x9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21tb24vZm9ybXMvZGlyZWN0aXZlcy9uZ19jb250cm9sJztcbmltcG9ydCB7Q09OU1RfRVhQUiwgbG9vc2VJZGVudGljYWwsIGlzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7TGlzdFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5cbmNvbnN0IFJBRElPX1ZBTFVFX0FDQ0VTU09SID0gQ09OU1RfRVhQUihuZXcgUHJvdmlkZXIoXG4gICAgTkdfVkFMVUVfQUNDRVNTT1IsIHt1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBSYWRpb0NvbnRyb2xWYWx1ZUFjY2Vzc29yKSwgbXVsdGk6IHRydWV9KSk7XG5cblxuLyoqXG4gKiBJbnRlcm5hbCBjbGFzcyB1c2VkIGJ5IEFuZ3VsYXIgdG8gdW5jaGVjayByYWRpbyBidXR0b25zIHdpdGggdGhlIG1hdGNoaW5nIG5hbWUuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSYWRpb0NvbnRyb2xSZWdpc3RyeSB7XG4gIHByaXZhdGUgX2FjY2Vzc29yczogYW55W10gPSBbXTtcblxuICBhZGQoY29udHJvbDogTmdDb250cm9sLCBhY2Nlc3NvcjogUmFkaW9Db250cm9sVmFsdWVBY2Nlc3Nvcikge1xuICAgIHRoaXMuX2FjY2Vzc29ycy5wdXNoKFtjb250cm9sLCBhY2Nlc3Nvcl0pO1xuICB9XG5cbiAgcmVtb3ZlKGFjY2Vzc29yOiBSYWRpb0NvbnRyb2xWYWx1ZUFjY2Vzc29yKSB7XG4gICAgdmFyIGluZGV4VG9SZW1vdmUgPSAtMTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2FjY2Vzc29ycy5sZW5ndGg7ICsraSkge1xuICAgICAgaWYgKHRoaXMuX2FjY2Vzc29yc1tpXVsxXSA9PT0gYWNjZXNzb3IpIHtcbiAgICAgICAgaW5kZXhUb1JlbW92ZSA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIExpc3RXcmFwcGVyLnJlbW92ZUF0KHRoaXMuX2FjY2Vzc29ycywgaW5kZXhUb1JlbW92ZSk7XG4gIH1cblxuICBzZWxlY3QoYWNjZXNzb3I6IFJhZGlvQ29udHJvbFZhbHVlQWNjZXNzb3IpIHtcbiAgICB0aGlzLl9hY2Nlc3NvcnMuZm9yRWFjaCgoYykgPT4ge1xuICAgICAgaWYgKGNbMF0uY29udHJvbC5yb290ID09PSBhY2Nlc3Nvci5fY29udHJvbC5jb250cm9sLnJvb3QgJiYgY1sxXSAhPT0gYWNjZXNzb3IpIHtcbiAgICAgICAgY1sxXS5maXJlVW5jaGVjaygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogVGhlIHZhbHVlIHByb3ZpZGVkIGJ5IHRoZSBmb3JtcyBBUEkgZm9yIHJhZGlvIGJ1dHRvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBSYWRpb0J1dHRvblN0YXRlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGNoZWNrZWQ6IGJvb2xlYW4sIHB1YmxpYyB2YWx1ZTogc3RyaW5nKSB7fVxufVxuXG5cbi8qKlxuICogVGhlIGFjY2Vzc29yIGZvciB3cml0aW5nIGEgcmFkaW8gY29udHJvbCB2YWx1ZSBhbmQgbGlzdGVuaW5nIHRvIGNoYW5nZXMgdGhhdCBpcyB1c2VkIGJ5IHRoZVxuICoge0BsaW5rIE5nTW9kZWx9LCB7QGxpbmsgTmdGb3JtQ29udHJvbH0sIGFuZCB7QGxpbmsgTmdDb250cm9sTmFtZX0gZGlyZWN0aXZlcy5cbiAqXG4gKiAgIyMjIEV4YW1wbGVcbiAqICBgYGBcbiAqICBAQ29tcG9uZW50KHtcbiAqICAgIHRlbXBsYXRlOiBgXG4gKiAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBuYW1lPVwiZm9vZFwiIFsobmdNb2RlbCldPVwiZm9vZENoaWNrZW5cIj5cbiAqICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJmb29kXCIgWyhuZ01vZGVsKV09XCJmb29kRmlzaFwiPlxuICogICAgYFxuICogIH0pXG4gKiAgY2xhc3MgRm9vZENtcCB7XG4gKiAgICBmb29kQ2hpY2tlbiA9IG5ldyBSYWRpb0J1dHRvblN0YXRlKHRydWUsIFwiY2hpY2tlblwiKTtcbiAqICAgIGZvb2RGaXNoID0gbmV3IFJhZGlvQnV0dG9uU3RhdGUoZmFsc2UsIFwiZmlzaFwiKTtcbiAqICB9XG4gKiAgYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjpcbiAgICAgICdpbnB1dFt0eXBlPXJhZGlvXVtuZ0NvbnRyb2xdLGlucHV0W3R5cGU9cmFkaW9dW25nRm9ybUNvbnRyb2xdLGlucHV0W3R5cGU9cmFkaW9dW25nTW9kZWxdJyxcbiAgaG9zdDogeycoY2hhbmdlKSc6ICdvbkNoYW5nZSgpJywgJyhibHVyKSc6ICdvblRvdWNoZWQoKSd9LFxuICBwcm92aWRlcnM6IFtSQURJT19WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgUmFkaW9Db250cm9sVmFsdWVBY2Nlc3NvciBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICAgIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc3RhdGU6IFJhZGlvQnV0dG9uU3RhdGU7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NvbnRyb2w6IE5nQ29udHJvbDtcbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuICAvKiogQGludGVybmFsICovXG4gIF9mbjogRnVuY3Rpb247XG4gIG9uQ2hhbmdlID0gKCkgPT4ge307XG4gIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlciwgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfcmVnaXN0cnk6IFJhZGlvQ29udHJvbFJlZ2lzdHJ5LCBwcml2YXRlIF9pbmplY3RvcjogSW5qZWN0b3IpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fY29udHJvbCA9IHRoaXMuX2luamVjdG9yLmdldChOZ0NvbnRyb2wpO1xuICAgIHRoaXMuX3JlZ2lzdHJ5LmFkZCh0aGlzLl9jb250cm9sLCB0aGlzKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQgeyB0aGlzLl9yZWdpc3RyeS5yZW1vdmUodGhpcyk7IH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9zdGF0ZSA9IHZhbHVlO1xuICAgIGlmIChpc1ByZXNlbnQodmFsdWUpICYmIHZhbHVlLmNoZWNrZWQpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRQcm9wZXJ0eSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdjaGVja2VkJywgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKF86IGFueSkgPT4ge30pOiB2b2lkIHtcbiAgICB0aGlzLl9mbiA9IGZuO1xuICAgIHRoaXMub25DaGFuZ2UgPSAoKSA9PiB7XG4gICAgICBmbihuZXcgUmFkaW9CdXR0b25TdGF0ZSh0cnVlLCB0aGlzLl9zdGF0ZS52YWx1ZSkpO1xuICAgICAgdGhpcy5fcmVnaXN0cnkuc2VsZWN0KHRoaXMpO1xuICAgIH07XG4gIH1cblxuICBmaXJlVW5jaGVjaygpOiB2b2lkIHsgdGhpcy5fZm4obmV3IFJhZGlvQnV0dG9uU3RhdGUoZmFsc2UsIHRoaXMuX3N0YXRlLnZhbHVlKSk7IH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4ge30pOiB2b2lkIHsgdGhpcy5vblRvdWNoZWQgPSBmbjsgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
