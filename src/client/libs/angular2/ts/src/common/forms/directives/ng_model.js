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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL25nX21vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQXlCTSxrQkFBa0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFBbEIsa0JBQWtCLEdBQ3BCLGlCQUFVLENBQUMsSUFBSSxlQUFRLENBQUMsc0JBQVMsRUFBRSxFQUFDLFdBQVcsRUFBRSxpQkFBVSxDQUFDLGNBQU0sT0FBQSxPQUFPLEVBQVAsQ0FBTyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBb0JHO1lBUUg7Z0JBQTZCLDJCQUFTO2dCQVNwQyxpQkFBK0QsV0FBa0IsRUFDWixnQkFBdUIsRUFFaEYsY0FBc0M7b0JBQ2hELGlCQUFPLENBQUM7b0JBSnFELGdCQUFXLEdBQVgsV0FBVyxDQUFPO29CQUNaLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBTztvQkFUNUYsZ0JBQWdCO29CQUNoQixhQUFRLEdBQUcsSUFBSSxlQUFPLEVBQUUsQ0FBQztvQkFDekIsZ0JBQWdCO29CQUNoQixXQUFNLEdBQUcsS0FBSyxDQUFDO29CQUNmLFdBQU0sR0FBRyxJQUFJLG9CQUFZLEVBQUUsQ0FBQztvQkFTMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyw0QkFBbUIsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQ2pFLENBQUM7Z0JBRUQsNkJBQVcsR0FBWCxVQUFZLE9BQXNDO29CQUNoRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUNqQixxQkFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQzt3QkFDekQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQ3JCLENBQUM7b0JBRUQsRUFBRSxDQUFDLENBQUMsMEJBQWlCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQy9DLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUM5QixDQUFDO2dCQUNILENBQUM7Z0JBRUQsc0JBQUksNEJBQU87eUJBQVgsY0FBeUIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBRWhELHNCQUFJLHlCQUFJO3lCQUFSLGNBQXVCLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBRW5DLHNCQUFJLDhCQUFTO3lCQUFiLGNBQStCLE1BQU0sQ0FBQywwQkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBRTVFLHNCQUFJLG1DQUFjO3lCQUFsQixjQUF5QyxNQUFNLENBQUMsK0JBQXNCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBRWhHLG1DQUFpQixHQUFqQixVQUFrQixRQUFhO29CQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztvQkFDMUIseUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ3BELENBQUM7Z0JBaERIO29CQUFDLGdCQUFTLENBQUM7d0JBQ1QsUUFBUSxFQUFFLGlEQUFpRDt3QkFDM0QsUUFBUSxFQUFFLENBQUMsa0JBQWtCLENBQUM7d0JBQzlCLE1BQU0sRUFBRSxDQUFDLGdCQUFnQixDQUFDO3dCQUMxQixPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQzt3QkFDbEMsUUFBUSxFQUFFLFFBQVE7cUJBQ25CLENBQUM7K0JBVWEsZUFBUSxFQUFFOytCQUFFLFdBQUksRUFBRTsrQkFBRSxhQUFNLENBQUMsMEJBQWEsQ0FBQzsrQkFDekMsZUFBUSxFQUFFOytCQUFFLFdBQUksRUFBRTsrQkFBRSxhQUFNLENBQUMsZ0NBQW1CLENBQUM7K0JBQy9DLGVBQVEsRUFBRTsrQkFBRSxXQUFJLEVBQUU7K0JBQUUsYUFBTSxDQUFDLDBDQUFpQixDQUFDOzsyQkFaMUQ7Z0JBMkNGLGNBQUM7WUFBRCxDQTFDQSxBQTBDQyxDQTFDNEIsc0JBQVMsR0EwQ3JDO1lBMUNELDZCQTBDQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL25nX21vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDT05TVF9FWFBSfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIE9ic2VydmFibGVXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jJztcbmltcG9ydCB7XG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlLFxuICBEaXJlY3RpdmUsXG4gIGZvcndhcmRSZWYsXG4gIFByb3ZpZGVyLFxuICBJbmplY3QsXG4gIE9wdGlvbmFsLFxuICBTZWxmXG59IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJy4vY29udHJvbF92YWx1ZV9hY2Nlc3Nvcic7XG5pbXBvcnQge05nQ29udHJvbH0gZnJvbSAnLi9uZ19jb250cm9sJztcbmltcG9ydCB7Q29udHJvbH0gZnJvbSAnLi4vbW9kZWwnO1xuaW1wb3J0IHtOR19WQUxJREFUT1JTLCBOR19BU1lOQ19WQUxJREFUT1JTfSBmcm9tICcuLi92YWxpZGF0b3JzJztcbmltcG9ydCB7XG4gIHNldFVwQ29udHJvbCxcbiAgaXNQcm9wZXJ0eVVwZGF0ZWQsXG4gIHNlbGVjdFZhbHVlQWNjZXNzb3IsXG4gIGNvbXBvc2VWYWxpZGF0b3JzLFxuICBjb21wb3NlQXN5bmNWYWxpZGF0b3JzXG59IGZyb20gJy4vc2hhcmVkJztcbmltcG9ydCB7VmFsaWRhdG9yRm4sIEFzeW5jVmFsaWRhdG9yRm59IGZyb20gJy4vdmFsaWRhdG9ycyc7XG5cbmNvbnN0IGZvcm1Db250cm9sQmluZGluZyA9XG4gICAgQ09OU1RfRVhQUihuZXcgUHJvdmlkZXIoTmdDb250cm9sLCB7dXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdNb2RlbCl9KSk7XG5cbi8qKlxuICogQmluZHMgYSBkb21haW4gbW9kZWwgdG8gYSBmb3JtIGNvbnRyb2wuXG4gKlxuICogIyMjIFVzYWdlXG4gKlxuICogYG5nTW9kZWxgIGJpbmRzIGFuIGV4aXN0aW5nIGRvbWFpbiBtb2RlbCB0byBhIGZvcm0gY29udHJvbC4gRm9yIGFcbiAqIHR3by13YXkgYmluZGluZywgdXNlIGBbKG5nTW9kZWwpXWAgdG8gZW5zdXJlIHRoZSBtb2RlbCB1cGRhdGVzIGluXG4gKiBib3RoIGRpcmVjdGlvbnMuXG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L1IzVVg1cURhVXFGTzJWWVIwVXpIP3A9cHJldmlldykpXG4gKiAgYGBgdHlwZXNjcmlwdFxuICogQENvbXBvbmVudCh7XG4gKiAgICAgIHNlbGVjdG9yOiBcInNlYXJjaC1jb21wXCIsXG4gKiAgICAgIGRpcmVjdGl2ZXM6IFtGT1JNX0RJUkVDVElWRVNdLFxuICogICAgICB0ZW1wbGF0ZTogYDxpbnB1dCB0eXBlPSd0ZXh0JyBbKG5nTW9kZWwpXT1cInNlYXJjaFF1ZXJ5XCI+YFxuICogICAgICB9KVxuICogY2xhc3MgU2VhcmNoQ29tcCB7XG4gKiAgc2VhcmNoUXVlcnk6IHN0cmluZztcbiAqIH1cbiAqICBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25nTW9kZWxdOm5vdChbbmdDb250cm9sXSk6bm90KFtuZ0Zvcm1Db250cm9sXSknLFxuICBiaW5kaW5nczogW2Zvcm1Db250cm9sQmluZGluZ10sXG4gIGlucHV0czogWydtb2RlbDogbmdNb2RlbCddLFxuICBvdXRwdXRzOiBbJ3VwZGF0ZTogbmdNb2RlbENoYW5nZSddLFxuICBleHBvcnRBczogJ25nRm9ybSdcbn0pXG5leHBvcnQgY2xhc3MgTmdNb2RlbCBleHRlbmRzIE5nQ29udHJvbCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NvbnRyb2wgPSBuZXcgQ29udHJvbCgpO1xuICAvKiogQGludGVybmFsICovXG4gIF9hZGRlZCA9IGZhbHNlO1xuICB1cGRhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIG1vZGVsOiBhbnk7XG4gIHZpZXdNb2RlbDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTZWxmKCkgQEluamVjdChOR19WQUxJREFUT1JTKSBwcml2YXRlIF92YWxpZGF0b3JzOiBhbnlbXSxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBASW5qZWN0KE5HX0FTWU5DX1ZBTElEQVRPUlMpIHByaXZhdGUgX2FzeW5jVmFsaWRhdG9yczogYW55W10sXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgQEluamVjdChOR19WQUxVRV9BQ0NFU1NPUilcbiAgICAgICAgICAgICAgdmFsdWVBY2Nlc3NvcnM6IENvbnRyb2xWYWx1ZUFjY2Vzc29yW10pIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudmFsdWVBY2Nlc3NvciA9IHNlbGVjdFZhbHVlQWNjZXNzb3IodGhpcywgdmFsdWVBY2Nlc3NvcnMpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczoge1trZXk6IHN0cmluZ106IFNpbXBsZUNoYW5nZX0pIHtcbiAgICBpZiAoIXRoaXMuX2FkZGVkKSB7XG4gICAgICBzZXRVcENvbnRyb2wodGhpcy5fY29udHJvbCwgdGhpcyk7XG4gICAgICB0aGlzLl9jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoe2VtaXRFdmVudDogZmFsc2V9KTtcbiAgICAgIHRoaXMuX2FkZGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoaXNQcm9wZXJ0eVVwZGF0ZWQoY2hhbmdlcywgdGhpcy52aWV3TW9kZWwpKSB7XG4gICAgICB0aGlzLl9jb250cm9sLnVwZGF0ZVZhbHVlKHRoaXMubW9kZWwpO1xuICAgICAgdGhpcy52aWV3TW9kZWwgPSB0aGlzLm1vZGVsO1xuICAgIH1cbiAgfVxuXG4gIGdldCBjb250cm9sKCk6IENvbnRyb2wgeyByZXR1cm4gdGhpcy5fY29udHJvbDsgfVxuXG4gIGdldCBwYXRoKCk6IHN0cmluZ1tdIHsgcmV0dXJuIFtdOyB9XG5cbiAgZ2V0IHZhbGlkYXRvcigpOiBWYWxpZGF0b3JGbiB7IHJldHVybiBjb21wb3NlVmFsaWRhdG9ycyh0aGlzLl92YWxpZGF0b3JzKTsgfVxuXG4gIGdldCBhc3luY1ZhbGlkYXRvcigpOiBBc3luY1ZhbGlkYXRvckZuIHsgcmV0dXJuIGNvbXBvc2VBc3luY1ZhbGlkYXRvcnModGhpcy5fYXN5bmNWYWxpZGF0b3JzKTsgfVxuXG4gIHZpZXdUb01vZGVsVXBkYXRlKG5ld1ZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdNb2RlbCA9IG5ld1ZhbHVlO1xuICAgIE9ic2VydmFibGVXcmFwcGVyLmNhbGxFbWl0KHRoaXMudXBkYXRlLCBuZXdWYWx1ZSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
