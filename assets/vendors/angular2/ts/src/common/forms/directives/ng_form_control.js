System.register(['angular2/src/facade/lang', 'angular2/src/facade/collection', 'angular2/src/facade/async', 'angular2/core', './ng_control', '../validators', './control_value_accessor', './shared'], function(exports_1, context_1) {
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
    var lang_1, collection_1, async_1, core_1, ng_control_1, validators_1, control_value_accessor_1, shared_1;
    var formControlBinding, NgFormControl;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng_control_1_1) {
                ng_control_1 = ng_control_1_1;
            },
            function (validators_1_1) {
                validators_1 = validators_1_1;
            },
            function (control_value_accessor_1_1) {
                control_value_accessor_1 = control_value_accessor_1_1;
            },
            function (shared_1_1) {
                shared_1 = shared_1_1;
            }],
        execute: function() {
            formControlBinding = lang_1.CONST_EXPR(new core_1.Provider(ng_control_1.NgControl, { useExisting: core_1.forwardRef(function () { return NgFormControl; }) }));
            /**
             * Binds an existing {@link Control} to a DOM element.
             *
             * ### Example ([live demo](http://plnkr.co/edit/jcQlZ2tTh22BZZ2ucNAT?p=preview))
             *
             * In this example, we bind the control to an input element. When the value of the input element
             * changes, the value of the control will reflect that change. Likewise, if the value of the
             * control changes, the input element reflects that change.
             *
             *  ```typescript
             * @Component({
             *   selector: 'my-app',
             *   template: `
             *     <div>
             *       <h2>NgFormControl Example</h2>
             *       <form>
             *         <p>Element with existing control: <input type="text"
             * [ngFormControl]="loginControl"></p>
             *         <p>Value of existing control: {{loginControl.value}}</p>
             *       </form>
             *     </div>
             *   `,
             *   directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
             * })
             * export class App {
             *   loginControl: Control = new Control('');
             * }
             *  ```
             *
             * ### ngModel
             *
             * We can also use `ngModel` to bind a domain model to the form.
             *
             * ### Example ([live demo](http://plnkr.co/edit/yHMLuHO7DNgT8XvtjTDH?p=preview))
             *
             *  ```typescript
             * @Component({
             *      selector: "login-comp",
             *      directives: [FORM_DIRECTIVES],
             *      template: "<input type='text' [ngFormControl]='loginControl' [(ngModel)]='login'>"
             *      })
             * class LoginComp {
             *  loginControl: Control = new Control('');
             *  login:string;
             * }
             *  ```
             */
            NgFormControl = (function (_super) {
                __extends(NgFormControl, _super);
                function NgFormControl(_validators, _asyncValidators, valueAccessors) {
                    _super.call(this);
                    this._validators = _validators;
                    this._asyncValidators = _asyncValidators;
                    this.update = new async_1.EventEmitter();
                    this.valueAccessor = shared_1.selectValueAccessor(this, valueAccessors);
                }
                NgFormControl.prototype.ngOnChanges = function (changes) {
                    if (this._isControlChanged(changes)) {
                        shared_1.setUpControl(this.form, this);
                        this.form.updateValueAndValidity({ emitEvent: false });
                    }
                    if (shared_1.isPropertyUpdated(changes, this.viewModel)) {
                        this.form.updateValue(this.model);
                        this.viewModel = this.model;
                    }
                };
                Object.defineProperty(NgFormControl.prototype, "path", {
                    get: function () { return []; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgFormControl.prototype, "validator", {
                    get: function () { return shared_1.composeValidators(this._validators); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgFormControl.prototype, "asyncValidator", {
                    get: function () { return shared_1.composeAsyncValidators(this._asyncValidators); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgFormControl.prototype, "control", {
                    get: function () { return this.form; },
                    enumerable: true,
                    configurable: true
                });
                NgFormControl.prototype.viewToModelUpdate = function (newValue) {
                    this.viewModel = newValue;
                    async_1.ObservableWrapper.callEmit(this.update, newValue);
                };
                NgFormControl.prototype._isControlChanged = function (changes) {
                    return collection_1.StringMapWrapper.contains(changes, "form");
                };
                NgFormControl = __decorate([
                    core_1.Directive({
                        selector: '[ngFormControl]',
                        bindings: [formControlBinding],
                        inputs: ['form: ngFormControl', 'model: ngModel'],
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
                ], NgFormControl);
                return NgFormControl;
            }(ng_control_1.NgControl));
            exports_1("NgFormControl", NgFormControl);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZm9ybXMvZGlyZWN0aXZlcy9uZ19mb3JtX2NvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBMkJNLGtCQUFrQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUFsQixrQkFBa0IsR0FDcEIsaUJBQVUsQ0FBQyxJQUFJLGVBQVEsQ0FBQyxzQkFBUyxFQUFFLEVBQUMsV0FBVyxFQUFFLGlCQUFVLENBQUMsY0FBTSxPQUFBLGFBQWEsRUFBYixDQUFhLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztZQUV4Rjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQThDRztZQVFIO2dCQUFtQyxpQ0FBUztnQkFNMUMsdUJBQStELFdBQ1YsRUFDZ0IsZ0JBQ2hCLEVBRXpDLGNBQXNDO29CQUNoRCxpQkFBTyxDQUFDO29CQU5xRCxnQkFBVyxHQUFYLFdBQVcsQ0FDckI7b0JBQ2dCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FDaEM7b0JBUHJELFdBQU0sR0FBRyxJQUFJLG9CQUFZLEVBQUUsQ0FBQztvQkFXMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyw0QkFBbUIsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQ2pFLENBQUM7Z0JBRUQsbUNBQVcsR0FBWCxVQUFZLE9BQXNDO29CQUNoRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNwQyxxQkFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztvQkFDdkQsQ0FBQztvQkFDRCxFQUFFLENBQUMsQ0FBQywwQkFBaUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNsQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7b0JBQzlCLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCxzQkFBSSwrQkFBSTt5QkFBUixjQUF1QixNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUVuQyxzQkFBSSxvQ0FBUzt5QkFBYixjQUErQixNQUFNLENBQUMsMEJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUU1RSxzQkFBSSx5Q0FBYzt5QkFBbEIsY0FBeUMsTUFBTSxDQUFDLCtCQUFzQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUVoRyxzQkFBSSxrQ0FBTzt5QkFBWCxjQUF5QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFFNUMseUNBQWlCLEdBQWpCLFVBQWtCLFFBQWE7b0JBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO29CQUMxQix5QkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDcEQsQ0FBQztnQkFFTyx5Q0FBaUIsR0FBekIsVUFBMEIsT0FBNkI7b0JBQ3JELE1BQU0sQ0FBQyw2QkFBZ0IsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNwRCxDQUFDO2dCQWpESDtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSxpQkFBaUI7d0JBQzNCLFFBQVEsRUFBRSxDQUFDLGtCQUFrQixDQUFDO3dCQUM5QixNQUFNLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxnQkFBZ0IsQ0FBQzt3QkFDakQsT0FBTyxFQUFFLENBQUMsdUJBQXVCLENBQUM7d0JBQ2xDLFFBQVEsRUFBRSxRQUFRO3FCQUNuQixDQUFDOytCQU9hLGVBQVEsRUFBRTsrQkFBRSxXQUFJLEVBQUU7K0JBQUUsYUFBTSxDQUFDLDBCQUFhLENBQUM7K0JBRXpDLGVBQVEsRUFBRTsrQkFBRSxXQUFJLEVBQUU7K0JBQUUsYUFBTSxDQUFDLGdDQUFtQixDQUFDOytCQUUvQyxlQUFRLEVBQUU7K0JBQUUsV0FBSSxFQUFFOytCQUFFLGFBQU0sQ0FBQywwQ0FBaUIsQ0FBQzs7aUNBWDFEO2dCQTRDRixvQkFBQztZQUFELENBM0NBLEFBMkNDLENBM0NrQyxzQkFBUyxHQTJDM0M7WUEzQ0QseUNBMkNDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL25nX2Zvcm1fY29udHJvbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7U3RyaW5nTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBPYnNlcnZhYmxlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5pbXBvcnQge1xuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZSxcbiAgUXVlcnksXG4gIERpcmVjdGl2ZSxcbiAgZm9yd2FyZFJlZixcbiAgUHJvdmlkZXIsXG4gIEluamVjdCxcbiAgT3B0aW9uYWwsXG4gIFNlbGZcbn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge05nQ29udHJvbH0gZnJvbSAnLi9uZ19jb250cm9sJztcbmltcG9ydCB7Q29udHJvbH0gZnJvbSAnLi4vbW9kZWwnO1xuaW1wb3J0IHtWYWxpZGF0b3JzLCBOR19WQUxJREFUT1JTLCBOR19BU1lOQ19WQUxJREFUT1JTfSBmcm9tICcuLi92YWxpZGF0b3JzJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICcuL2NvbnRyb2xfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtcbiAgc2V0VXBDb250cm9sLFxuICBjb21wb3NlVmFsaWRhdG9ycyxcbiAgY29tcG9zZUFzeW5jVmFsaWRhdG9ycyxcbiAgaXNQcm9wZXJ0eVVwZGF0ZWQsXG4gIHNlbGVjdFZhbHVlQWNjZXNzb3Jcbn0gZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IHtWYWxpZGF0b3JGbiwgQXN5bmNWYWxpZGF0b3JGbn0gZnJvbSAnLi92YWxpZGF0b3JzJztcblxuY29uc3QgZm9ybUNvbnRyb2xCaW5kaW5nID1cbiAgICBDT05TVF9FWFBSKG5ldyBQcm92aWRlcihOZ0NvbnRyb2wsIHt1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ0Zvcm1Db250cm9sKX0pKTtcblxuLyoqXG4gKiBCaW5kcyBhbiBleGlzdGluZyB7QGxpbmsgQ29udHJvbH0gdG8gYSBET00gZWxlbWVudC5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvamNRbFoydFRoMjJCWloydWNOQVQ/cD1wcmV2aWV3KSlcbiAqXG4gKiBJbiB0aGlzIGV4YW1wbGUsIHdlIGJpbmQgdGhlIGNvbnRyb2wgdG8gYW4gaW5wdXQgZWxlbWVudC4gV2hlbiB0aGUgdmFsdWUgb2YgdGhlIGlucHV0IGVsZW1lbnRcbiAqIGNoYW5nZXMsIHRoZSB2YWx1ZSBvZiB0aGUgY29udHJvbCB3aWxsIHJlZmxlY3QgdGhhdCBjaGFuZ2UuIExpa2V3aXNlLCBpZiB0aGUgdmFsdWUgb2YgdGhlXG4gKiBjb250cm9sIGNoYW5nZXMsIHRoZSBpbnB1dCBlbGVtZW50IHJlZmxlY3RzIHRoYXQgY2hhbmdlLlxuICpcbiAqICBgYGB0eXBlc2NyaXB0XG4gKiBAQ29tcG9uZW50KHtcbiAqICAgc2VsZWN0b3I6ICdteS1hcHAnLFxuICogICB0ZW1wbGF0ZTogYFxuICogICAgIDxkaXY+XG4gKiAgICAgICA8aDI+TmdGb3JtQ29udHJvbCBFeGFtcGxlPC9oMj5cbiAqICAgICAgIDxmb3JtPlxuICogICAgICAgICA8cD5FbGVtZW50IHdpdGggZXhpc3RpbmcgY29udHJvbDogPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAqIFtuZ0Zvcm1Db250cm9sXT1cImxvZ2luQ29udHJvbFwiPjwvcD5cbiAqICAgICAgICAgPHA+VmFsdWUgb2YgZXhpc3RpbmcgY29udHJvbDoge3tsb2dpbkNvbnRyb2wudmFsdWV9fTwvcD5cbiAqICAgICAgIDwvZm9ybT5cbiAqICAgICA8L2Rpdj5cbiAqICAgYCxcbiAqICAgZGlyZWN0aXZlczogW0NPUkVfRElSRUNUSVZFUywgRk9STV9ESVJFQ1RJVkVTXVxuICogfSlcbiAqIGV4cG9ydCBjbGFzcyBBcHAge1xuICogICBsb2dpbkNvbnRyb2w6IENvbnRyb2wgPSBuZXcgQ29udHJvbCgnJyk7XG4gKiB9XG4gKiAgYGBgXG4gKlxuICogIyMjIG5nTW9kZWxcbiAqXG4gKiBXZSBjYW4gYWxzbyB1c2UgYG5nTW9kZWxgIHRvIGJpbmQgYSBkb21haW4gbW9kZWwgdG8gdGhlIGZvcm0uXG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L3lITUx1SE83RE5nVDhYdnRqVERIP3A9cHJldmlldykpXG4gKlxuICogIGBgYHR5cGVzY3JpcHRcbiAqIEBDb21wb25lbnQoe1xuICogICAgICBzZWxlY3RvcjogXCJsb2dpbi1jb21wXCIsXG4gKiAgICAgIGRpcmVjdGl2ZXM6IFtGT1JNX0RJUkVDVElWRVNdLFxuICogICAgICB0ZW1wbGF0ZTogXCI8aW5wdXQgdHlwZT0ndGV4dCcgW25nRm9ybUNvbnRyb2xdPSdsb2dpbkNvbnRyb2wnIFsobmdNb2RlbCldPSdsb2dpbic+XCJcbiAqICAgICAgfSlcbiAqIGNsYXNzIExvZ2luQ29tcCB7XG4gKiAgbG9naW5Db250cm9sOiBDb250cm9sID0gbmV3IENvbnRyb2woJycpO1xuICogIGxvZ2luOnN0cmluZztcbiAqIH1cbiAqICBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25nRm9ybUNvbnRyb2xdJyxcbiAgYmluZGluZ3M6IFtmb3JtQ29udHJvbEJpbmRpbmddLFxuICBpbnB1dHM6IFsnZm9ybTogbmdGb3JtQ29udHJvbCcsICdtb2RlbDogbmdNb2RlbCddLFxuICBvdXRwdXRzOiBbJ3VwZGF0ZTogbmdNb2RlbENoYW5nZSddLFxuICBleHBvcnRBczogJ25nRm9ybSdcbn0pXG5leHBvcnQgY2xhc3MgTmdGb3JtQ29udHJvbCBleHRlbmRzIE5nQ29udHJvbCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIGZvcm06IENvbnRyb2w7XG4gIHVwZGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgbW9kZWw6IGFueTtcbiAgdmlld01vZGVsOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNlbGYoKSBASW5qZWN0KE5HX1ZBTElEQVRPUlMpIHByaXZhdGUgX3ZhbGlkYXRvcnM6XG4gICAgICAgICAgICAgICAgICAvKiBBcnJheTxWYWxpZGF0b3J8RnVuY3Rpb24+ICovIGFueVtdLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIEBJbmplY3QoTkdfQVNZTkNfVkFMSURBVE9SUykgcHJpdmF0ZSBfYXN5bmNWYWxpZGF0b3JzOlxuICAgICAgICAgICAgICAgICAgLyogQXJyYXk8VmFsaWRhdG9yfEZ1bmN0aW9uPiAqLyBhbnlbXSxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBASW5qZWN0KE5HX1ZBTFVFX0FDQ0VTU09SKVxuICAgICAgICAgICAgICB2YWx1ZUFjY2Vzc29yczogQ29udHJvbFZhbHVlQWNjZXNzb3JbXSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy52YWx1ZUFjY2Vzc29yID0gc2VsZWN0VmFsdWVBY2Nlc3Nvcih0aGlzLCB2YWx1ZUFjY2Vzc29ycyk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7W2tleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlfSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9pc0NvbnRyb2xDaGFuZ2VkKGNoYW5nZXMpKSB7XG4gICAgICBzZXRVcENvbnRyb2wodGhpcy5mb3JtLCB0aGlzKTtcbiAgICAgIHRoaXMuZm9ybS51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHtlbWl0RXZlbnQ6IGZhbHNlfSk7XG4gICAgfVxuICAgIGlmIChpc1Byb3BlcnR5VXBkYXRlZChjaGFuZ2VzLCB0aGlzLnZpZXdNb2RlbCkpIHtcbiAgICAgIHRoaXMuZm9ybS51cGRhdGVWYWx1ZSh0aGlzLm1vZGVsKTtcbiAgICAgIHRoaXMudmlld01vZGVsID0gdGhpcy5tb2RlbDtcbiAgICB9XG4gIH1cblxuICBnZXQgcGF0aCgpOiBzdHJpbmdbXSB7IHJldHVybiBbXTsgfVxuXG4gIGdldCB2YWxpZGF0b3IoKTogVmFsaWRhdG9yRm4geyByZXR1cm4gY29tcG9zZVZhbGlkYXRvcnModGhpcy5fdmFsaWRhdG9ycyk7IH1cblxuICBnZXQgYXN5bmNWYWxpZGF0b3IoKTogQXN5bmNWYWxpZGF0b3JGbiB7IHJldHVybiBjb21wb3NlQXN5bmNWYWxpZGF0b3JzKHRoaXMuX2FzeW5jVmFsaWRhdG9ycyk7IH1cblxuICBnZXQgY29udHJvbCgpOiBDb250cm9sIHsgcmV0dXJuIHRoaXMuZm9ybTsgfVxuXG4gIHZpZXdUb01vZGVsVXBkYXRlKG5ld1ZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdNb2RlbCA9IG5ld1ZhbHVlO1xuICAgIE9ic2VydmFibGVXcmFwcGVyLmNhbGxFbWl0KHRoaXMudXBkYXRlLCBuZXdWYWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9pc0NvbnRyb2xDaGFuZ2VkKGNoYW5nZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIFN0cmluZ01hcFdyYXBwZXIuY29udGFpbnMoY2hhbmdlcywgXCJmb3JtXCIpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
