System.register(['angular2/src/facade/lang', 'angular2/src/facade/async', 'angular2/core', './control_value_accessor', './ng_control', '../model', '../validators', './shared'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
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
    var lang_1, async_1, core_1, control_value_accessor_1, ng_control_1, model_1, validators_1, shared_1;
    var formControlBinding, NgModel;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (control_value_accessor_1_1) {
                control_value_accessor_1 = control_value_accessor_1_1;
            },
            function (ng_control_1_1) {
                ng_control_1 = ng_control_1_1;
            },
            function (model_1_1) {
                model_1 = model_1_1;
            },
            function (validators_1_1) {
                validators_1 = validators_1_1;
            },
            function (shared_1_1) {
                shared_1 = shared_1_1;
            }],
        execute: function() {
            formControlBinding = lang_1.CONST_EXPR(new core_1.Provider(ng_control_1.NgControl, { useExisting: core_1.forwardRef(function () { return NgModel; }) }));
            /**
             * Binds a domain model to a form control.
             *
             * ### Usage
             *
             * `ngModel` binds an existing domain model to a form control. For a
             * two-way binding, use `[(ngModel)]` to ensure the model updates in
             * both directions.
             *
             * ### Example ([live demo](http://plnkr.co/edit/R3UX5qDaUqFO2VYR0UzH?p=preview))
             *  ```typescript
             * @Component({
             *      selector: "search-comp",
             *      directives: [FORM_DIRECTIVES],
             *      template: `<input type='text' [(ngModel)]="searchQuery">`
             *      })
             * class SearchComp {
             *  searchQuery: string;
             * }
             *  ```
             */
            NgModel = (function (_super) {
                __extends(NgModel, _super);
                function NgModel(_validators, _asyncValidators, valueAccessors) {
                    _super.call(this);
                    this._validators = _validators;
                    this._asyncValidators = _asyncValidators;
                    /** @internal */
                    this._control = new model_1.Control();
                    /** @internal */
                    this._added = false;
                    this.update = new async_1.EventEmitter();
                    this.valueAccessor = shared_1.selectValueAccessor(this, valueAccessors);
                }
                NgModel.prototype.ngOnChanges = function (changes) {
                    if (!this._added) {
                        shared_1.setUpControl(this._control, this);
                        this._control.updateValueAndValidity({ emitEvent: false });
                        this._added = true;
                    }
                    if (shared_1.isPropertyUpdated(changes, this.viewModel)) {
                        this._control.updateValue(this.model);
                        this.viewModel = this.model;
                    }
                };
                Object.defineProperty(NgModel.prototype, "control", {
                    get: function () { return this._control; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgModel.prototype, "path", {
                    get: function () { return []; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgModel.prototype, "validator", {
                    get: function () { return shared_1.composeValidators(this._validators); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgModel.prototype, "asyncValidator", {
                    get: function () { return shared_1.composeAsyncValidators(this._asyncValidators); },
                    enumerable: true,
                    configurable: true
                });
                NgModel.prototype.viewToModelUpdate = function (newValue) {
                    this.viewModel = newValue;
                    async_1.ObservableWrapper.callEmit(this.update, newValue);
                };
                NgModel = __decorate([
                    core_1.Directive({
                        selector: '[ngModel]:not([ngControl]):not([ngFormControl])',
                        bindings: [formControlBinding],
                        inputs: ['model: ngModel'],
                        outputs: ['update: ngModelChange'],
                        exportAs: 'ngForm'
                    }),
                    __param(0, core_1.Optional()),
                    __param(0, core_1.Self()),
                    __param(0, core_1.Inject(validators_1.NG_VALIDATORS)),
                    __param(1, core_1.Optional()),
                    __param(1, core_1.Self()),
                    __param(1, core_1.Inject(validators_1.NG_ASYNC_VALIDATORS)),
                    __param(2, core_1.Optional()),
                    __param(2, core_1.Self()),
                    __param(2, core_1.Inject(control_value_accessor_1.NG_VALUE_ACCESSOR)), 
                    __metadata('design:paramtypes', [Array, Array, Array])
                ], NgModel);
                return NgModel;
            }(ng_control_1.NgControl));
            exports_1("NgModel", NgModel);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZm9ybXMvZGlyZWN0aXZlcy9uZ19tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUF5Qk0sa0JBQWtCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBQWxCLGtCQUFrQixHQUNwQixpQkFBVSxDQUFDLElBQUksZUFBUSxDQUFDLHNCQUFTLEVBQUUsRUFBQyxXQUFXLEVBQUUsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsT0FBTyxFQUFQLENBQU8sQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBRWxGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQW9CRztZQVFIO2dCQUE2QiwyQkFBUztnQkFTcEMsaUJBQStELFdBQWtCLEVBQ1osZ0JBQXVCLEVBRWhGLGNBQXNDO29CQUNoRCxpQkFBTyxDQUFDO29CQUpxRCxnQkFBVyxHQUFYLFdBQVcsQ0FBTztvQkFDWixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQU87b0JBVDVGLGdCQUFnQjtvQkFDaEIsYUFBUSxHQUFHLElBQUksZUFBTyxFQUFFLENBQUM7b0JBQ3pCLGdCQUFnQjtvQkFDaEIsV0FBTSxHQUFHLEtBQUssQ0FBQztvQkFDZixXQUFNLEdBQUcsSUFBSSxvQkFBWSxFQUFFLENBQUM7b0JBUzFCLElBQUksQ0FBQyxhQUFhLEdBQUcsNEJBQW1CLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUNqRSxDQUFDO2dCQUVELDZCQUFXLEdBQVgsVUFBWSxPQUFzQztvQkFDaEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFDakIscUJBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7d0JBQ3pELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO29CQUNyQixDQUFDO29CQUVELEVBQUUsQ0FBQyxDQUFDLDBCQUFpQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMvQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3RDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFDOUIsQ0FBQztnQkFDSCxDQUFDO2dCQUVELHNCQUFJLDRCQUFPO3lCQUFYLGNBQXlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUVoRCxzQkFBSSx5QkFBSTt5QkFBUixjQUF1QixNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUVuQyxzQkFBSSw4QkFBUzt5QkFBYixjQUErQixNQUFNLENBQUMsMEJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUU1RSxzQkFBSSxtQ0FBYzt5QkFBbEIsY0FBeUMsTUFBTSxDQUFDLCtCQUFzQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUVoRyxtQ0FBaUIsR0FBakIsVUFBa0IsUUFBYTtvQkFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7b0JBQzFCLHlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNwRCxDQUFDO2dCQWhESDtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSxpREFBaUQ7d0JBQzNELFFBQVEsRUFBRSxDQUFDLGtCQUFrQixDQUFDO3dCQUM5QixNQUFNLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQzt3QkFDMUIsT0FBTyxFQUFFLENBQUMsdUJBQXVCLENBQUM7d0JBQ2xDLFFBQVEsRUFBRSxRQUFRO3FCQUNuQixDQUFDOytCQVVhLGVBQVEsRUFBRTsrQkFBRSxXQUFJLEVBQUU7K0JBQUUsYUFBTSxDQUFDLDBCQUFhLENBQUM7K0JBQ3pDLGVBQVEsRUFBRTsrQkFBRSxXQUFJLEVBQUU7K0JBQUUsYUFBTSxDQUFDLGdDQUFtQixDQUFDOytCQUMvQyxlQUFRLEVBQUU7K0JBQUUsV0FBSSxFQUFFOytCQUFFLGFBQU0sQ0FBQywwQ0FBaUIsQ0FBQzs7MkJBWjFEO2dCQTJDRixjQUFDO1lBQUQsQ0ExQ0EsQUEwQ0MsQ0ExQzRCLHNCQUFTLEdBMENyQztZQTFDRCw2QkEwQ0MsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tbW9uL2Zvcm1zL2RpcmVjdGl2ZXMvbmdfbW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NPTlNUX0VYUFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0V2ZW50RW1pdHRlciwgT2JzZXJ2YWJsZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYXN5bmMnO1xuaW1wb3J0IHtcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2UsXG4gIERpcmVjdGl2ZSxcbiAgZm9yd2FyZFJlZixcbiAgUHJvdmlkZXIsXG4gIEluamVjdCxcbiAgT3B0aW9uYWwsXG4gIFNlbGZcbn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnLi9jb250cm9sX3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7TmdDb250cm9sfSBmcm9tICcuL25nX2NvbnRyb2wnO1xuaW1wb3J0IHtDb250cm9sfSBmcm9tICcuLi9tb2RlbCc7XG5pbXBvcnQge05HX1ZBTElEQVRPUlMsIE5HX0FTWU5DX1ZBTElEQVRPUlN9IGZyb20gJy4uL3ZhbGlkYXRvcnMnO1xuaW1wb3J0IHtcbiAgc2V0VXBDb250cm9sLFxuICBpc1Byb3BlcnR5VXBkYXRlZCxcbiAgc2VsZWN0VmFsdWVBY2Nlc3NvcixcbiAgY29tcG9zZVZhbGlkYXRvcnMsXG4gIGNvbXBvc2VBc3luY1ZhbGlkYXRvcnNcbn0gZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IHtWYWxpZGF0b3JGbiwgQXN5bmNWYWxpZGF0b3JGbn0gZnJvbSAnLi92YWxpZGF0b3JzJztcblxuY29uc3QgZm9ybUNvbnRyb2xCaW5kaW5nID1cbiAgICBDT05TVF9FWFBSKG5ldyBQcm92aWRlcihOZ0NvbnRyb2wsIHt1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ01vZGVsKX0pKTtcblxuLyoqXG4gKiBCaW5kcyBhIGRvbWFpbiBtb2RlbCB0byBhIGZvcm0gY29udHJvbC5cbiAqXG4gKiAjIyMgVXNhZ2VcbiAqXG4gKiBgbmdNb2RlbGAgYmluZHMgYW4gZXhpc3RpbmcgZG9tYWluIG1vZGVsIHRvIGEgZm9ybSBjb250cm9sLiBGb3IgYVxuICogdHdvLXdheSBiaW5kaW5nLCB1c2UgYFsobmdNb2RlbCldYCB0byBlbnN1cmUgdGhlIG1vZGVsIHVwZGF0ZXMgaW5cbiAqIGJvdGggZGlyZWN0aW9ucy5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvUjNVWDVxRGFVcUZPMlZZUjBVekg/cD1wcmV2aWV3KSlcbiAqICBgYGB0eXBlc2NyaXB0XG4gKiBAQ29tcG9uZW50KHtcbiAqICAgICAgc2VsZWN0b3I6IFwic2VhcmNoLWNvbXBcIixcbiAqICAgICAgZGlyZWN0aXZlczogW0ZPUk1fRElSRUNUSVZFU10sXG4gKiAgICAgIHRlbXBsYXRlOiBgPGlucHV0IHR5cGU9J3RleHQnIFsobmdNb2RlbCldPVwic2VhcmNoUXVlcnlcIj5gXG4gKiAgICAgIH0pXG4gKiBjbGFzcyBTZWFyY2hDb21wIHtcbiAqICBzZWFyY2hRdWVyeTogc3RyaW5nO1xuICogfVxuICogIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdNb2RlbF06bm90KFtuZ0NvbnRyb2xdKTpub3QoW25nRm9ybUNvbnRyb2xdKScsXG4gIGJpbmRpbmdzOiBbZm9ybUNvbnRyb2xCaW5kaW5nXSxcbiAgaW5wdXRzOiBbJ21vZGVsOiBuZ01vZGVsJ10sXG4gIG91dHB1dHM6IFsndXBkYXRlOiBuZ01vZGVsQ2hhbmdlJ10sXG4gIGV4cG9ydEFzOiAnbmdGb3JtJ1xufSlcbmV4cG9ydCBjbGFzcyBOZ01vZGVsIGV4dGVuZHMgTmdDb250cm9sIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY29udHJvbCA9IG5ldyBDb250cm9sKCk7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2FkZGVkID0gZmFsc2U7XG4gIHVwZGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgbW9kZWw6IGFueTtcbiAgdmlld01vZGVsOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNlbGYoKSBASW5qZWN0KE5HX1ZBTElEQVRPUlMpIHByaXZhdGUgX3ZhbGlkYXRvcnM6IGFueVtdLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIEBJbmplY3QoTkdfQVNZTkNfVkFMSURBVE9SUykgcHJpdmF0ZSBfYXN5bmNWYWxpZGF0b3JzOiBhbnlbXSxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBASW5qZWN0KE5HX1ZBTFVFX0FDQ0VTU09SKVxuICAgICAgICAgICAgICB2YWx1ZUFjY2Vzc29yczogQ29udHJvbFZhbHVlQWNjZXNzb3JbXSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy52YWx1ZUFjY2Vzc29yID0gc2VsZWN0VmFsdWVBY2Nlc3Nvcih0aGlzLCB2YWx1ZUFjY2Vzc29ycyk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7W2tleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlfSkge1xuICAgIGlmICghdGhpcy5fYWRkZWQpIHtcbiAgICAgIHNldFVwQ29udHJvbCh0aGlzLl9jb250cm9sLCB0aGlzKTtcbiAgICAgIHRoaXMuX2NvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSh7ZW1pdEV2ZW50OiBmYWxzZX0pO1xuICAgICAgdGhpcy5fYWRkZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChpc1Byb3BlcnR5VXBkYXRlZChjaGFuZ2VzLCB0aGlzLnZpZXdNb2RlbCkpIHtcbiAgICAgIHRoaXMuX2NvbnRyb2wudXBkYXRlVmFsdWUodGhpcy5tb2RlbCk7XG4gICAgICB0aGlzLnZpZXdNb2RlbCA9IHRoaXMubW9kZWw7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGNvbnRyb2woKTogQ29udHJvbCB7IHJldHVybiB0aGlzLl9jb250cm9sOyB9XG5cbiAgZ2V0IHBhdGgoKTogc3RyaW5nW10geyByZXR1cm4gW107IH1cblxuICBnZXQgdmFsaWRhdG9yKCk6IFZhbGlkYXRvckZuIHsgcmV0dXJuIGNvbXBvc2VWYWxpZGF0b3JzKHRoaXMuX3ZhbGlkYXRvcnMpOyB9XG5cbiAgZ2V0IGFzeW5jVmFsaWRhdG9yKCk6IEFzeW5jVmFsaWRhdG9yRm4geyByZXR1cm4gY29tcG9zZUFzeW5jVmFsaWRhdG9ycyh0aGlzLl9hc3luY1ZhbGlkYXRvcnMpOyB9XG5cbiAgdmlld1RvTW9kZWxVcGRhdGUobmV3VmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMudmlld01vZGVsID0gbmV3VmFsdWU7XG4gICAgT2JzZXJ2YWJsZVdyYXBwZXIuY2FsbEVtaXQodGhpcy51cGRhdGUsIG5ld1ZhbHVlKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
