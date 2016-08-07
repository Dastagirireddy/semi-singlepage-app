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
             * ###ngModel
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL25nX2Zvcm1fY29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUEyQk0sa0JBQWtCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBQWxCLGtCQUFrQixHQUNwQixpQkFBVSxDQUFDLElBQUksZUFBUSxDQUFDLHNCQUFTLEVBQUUsRUFBQyxXQUFXLEVBQUUsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsYUFBYSxFQUFiLENBQWEsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXhGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBOENHO1lBUUg7Z0JBQW1DLGlDQUFTO2dCQU0xQyx1QkFBK0QsV0FDVixFQUNnQixnQkFDaEIsRUFFekMsY0FBc0M7b0JBQ2hELGlCQUFPLENBQUM7b0JBTnFELGdCQUFXLEdBQVgsV0FBVyxDQUNyQjtvQkFDZ0IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUNoQztvQkFQckQsV0FBTSxHQUFHLElBQUksb0JBQVksRUFBRSxDQUFDO29CQVcxQixJQUFJLENBQUMsYUFBYSxHQUFHLDRCQUFtQixDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztnQkFDakUsQ0FBQztnQkFFRCxtQ0FBVyxHQUFYLFVBQVksT0FBc0M7b0JBQ2hELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BDLHFCQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO29CQUN2RCxDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLDBCQUFpQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFDOUIsQ0FBQztnQkFDSCxDQUFDO2dCQUVELHNCQUFJLCtCQUFJO3lCQUFSLGNBQXVCLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBRW5DLHNCQUFJLG9DQUFTO3lCQUFiLGNBQStCLE1BQU0sQ0FBQywwQkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBRTVFLHNCQUFJLHlDQUFjO3lCQUFsQixjQUF5QyxNQUFNLENBQUMsK0JBQXNCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBRWhHLHNCQUFJLGtDQUFPO3lCQUFYLGNBQXlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUU1Qyx5Q0FBaUIsR0FBakIsVUFBa0IsUUFBYTtvQkFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7b0JBQzFCLHlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNwRCxDQUFDO2dCQUVPLHlDQUFpQixHQUF6QixVQUEwQixPQUE2QjtvQkFDckQsTUFBTSxDQUFDLDZCQUFnQixDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ3BELENBQUM7Z0JBakRIO29CQUFDLGdCQUFTLENBQUM7d0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjt3QkFDM0IsUUFBUSxFQUFFLENBQUMsa0JBQWtCLENBQUM7d0JBQzlCLE1BQU0sRUFBRSxDQUFDLHFCQUFxQixFQUFFLGdCQUFnQixDQUFDO3dCQUNqRCxPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQzt3QkFDbEMsUUFBUSxFQUFFLFFBQVE7cUJBQ25CLENBQUM7K0JBT2EsZUFBUSxFQUFFOytCQUFFLFdBQUksRUFBRTsrQkFBRSxhQUFNLENBQUMsMEJBQWEsQ0FBQzsrQkFFekMsZUFBUSxFQUFFOytCQUFFLFdBQUksRUFBRTsrQkFBRSxhQUFNLENBQUMsZ0NBQW1CLENBQUM7K0JBRS9DLGVBQVEsRUFBRTsrQkFBRSxXQUFJLEVBQUU7K0JBQUUsYUFBTSxDQUFDLDBDQUFpQixDQUFDOztpQ0FYMUQ7Z0JBNENGLG9CQUFDO1lBQUQsQ0EzQ0EsQUEyQ0MsQ0EzQ2tDLHNCQUFTLEdBMkMzQztZQTNDRCx5Q0EyQ0MsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZm9ybXMvZGlyZWN0aXZlcy9uZ19mb3JtX2NvbnRyb2wuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NPTlNUX0VYUFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge1N0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge0V2ZW50RW1pdHRlciwgT2JzZXJ2YWJsZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYXN5bmMnO1xuaW1wb3J0IHtcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2UsXG4gIFF1ZXJ5LFxuICBEaXJlY3RpdmUsXG4gIGZvcndhcmRSZWYsXG4gIFByb3ZpZGVyLFxuICBJbmplY3QsXG4gIE9wdGlvbmFsLFxuICBTZWxmXG59IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtOZ0NvbnRyb2x9IGZyb20gJy4vbmdfY29udHJvbCc7XG5pbXBvcnQge0NvbnRyb2x9IGZyb20gJy4uL21vZGVsJztcbmltcG9ydCB7VmFsaWRhdG9ycywgTkdfVkFMSURBVE9SUywgTkdfQVNZTkNfVkFMSURBVE9SU30gZnJvbSAnLi4vdmFsaWRhdG9ycyc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnLi9jb250cm9sX3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7XG4gIHNldFVwQ29udHJvbCxcbiAgY29tcG9zZVZhbGlkYXRvcnMsXG4gIGNvbXBvc2VBc3luY1ZhbGlkYXRvcnMsXG4gIGlzUHJvcGVydHlVcGRhdGVkLFxuICBzZWxlY3RWYWx1ZUFjY2Vzc29yXG59IGZyb20gJy4vc2hhcmVkJztcbmltcG9ydCB7VmFsaWRhdG9yRm4sIEFzeW5jVmFsaWRhdG9yRm59IGZyb20gJy4vdmFsaWRhdG9ycyc7XG5cbmNvbnN0IGZvcm1Db250cm9sQmluZGluZyA9XG4gICAgQ09OU1RfRVhQUihuZXcgUHJvdmlkZXIoTmdDb250cm9sLCB7dXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdGb3JtQ29udHJvbCl9KSk7XG5cbi8qKlxuICogQmluZHMgYW4gZXhpc3Rpbmcge0BsaW5rIENvbnRyb2x9IHRvIGEgRE9NIGVsZW1lbnQuXG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L2pjUWxaMnRUaDIyQlpaMnVjTkFUP3A9cHJldmlldykpXG4gKlxuICogSW4gdGhpcyBleGFtcGxlLCB3ZSBiaW5kIHRoZSBjb250cm9sIHRvIGFuIGlucHV0IGVsZW1lbnQuIFdoZW4gdGhlIHZhbHVlIG9mIHRoZSBpbnB1dCBlbGVtZW50XG4gKiBjaGFuZ2VzLCB0aGUgdmFsdWUgb2YgdGhlIGNvbnRyb2wgd2lsbCByZWZsZWN0IHRoYXQgY2hhbmdlLiBMaWtld2lzZSwgaWYgdGhlIHZhbHVlIG9mIHRoZVxuICogY29udHJvbCBjaGFuZ2VzLCB0aGUgaW5wdXQgZWxlbWVudCByZWZsZWN0cyB0aGF0IGNoYW5nZS5cbiAqXG4gKiAgYGBgdHlwZXNjcmlwdFxuICogQENvbXBvbmVudCh7XG4gKiAgIHNlbGVjdG9yOiAnbXktYXBwJyxcbiAqICAgdGVtcGxhdGU6IGBcbiAqICAgICA8ZGl2PlxuICogICAgICAgPGgyPk5nRm9ybUNvbnRyb2wgRXhhbXBsZTwvaDI+XG4gKiAgICAgICA8Zm9ybT5cbiAqICAgICAgICAgPHA+RWxlbWVudCB3aXRoIGV4aXN0aW5nIGNvbnRyb2w6IDxpbnB1dCB0eXBlPVwidGV4dFwiXG4gKiBbbmdGb3JtQ29udHJvbF09XCJsb2dpbkNvbnRyb2xcIj48L3A+XG4gKiAgICAgICAgIDxwPlZhbHVlIG9mIGV4aXN0aW5nIGNvbnRyb2w6IHt7bG9naW5Db250cm9sLnZhbHVlfX08L3A+XG4gKiAgICAgICA8L2Zvcm0+XG4gKiAgICAgPC9kaXY+XG4gKiAgIGAsXG4gKiAgIGRpcmVjdGl2ZXM6IFtDT1JFX0RJUkVDVElWRVMsIEZPUk1fRElSRUNUSVZFU11cbiAqIH0pXG4gKiBleHBvcnQgY2xhc3MgQXBwIHtcbiAqICAgbG9naW5Db250cm9sOiBDb250cm9sID0gbmV3IENvbnRyb2woJycpO1xuICogfVxuICogIGBgYFxuICpcbiAqICMjI25nTW9kZWxcbiAqXG4gKiBXZSBjYW4gYWxzbyB1c2UgYG5nTW9kZWxgIHRvIGJpbmQgYSBkb21haW4gbW9kZWwgdG8gdGhlIGZvcm0uXG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L3lITUx1SE83RE5nVDhYdnRqVERIP3A9cHJldmlldykpXG4gKlxuICogIGBgYHR5cGVzY3JpcHRcbiAqIEBDb21wb25lbnQoe1xuICogICAgICBzZWxlY3RvcjogXCJsb2dpbi1jb21wXCIsXG4gKiAgICAgIGRpcmVjdGl2ZXM6IFtGT1JNX0RJUkVDVElWRVNdLFxuICogICAgICB0ZW1wbGF0ZTogXCI8aW5wdXQgdHlwZT0ndGV4dCcgW25nRm9ybUNvbnRyb2xdPSdsb2dpbkNvbnRyb2wnIFsobmdNb2RlbCldPSdsb2dpbic+XCJcbiAqICAgICAgfSlcbiAqIGNsYXNzIExvZ2luQ29tcCB7XG4gKiAgbG9naW5Db250cm9sOiBDb250cm9sID0gbmV3IENvbnRyb2woJycpO1xuICogIGxvZ2luOnN0cmluZztcbiAqIH1cbiAqICBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25nRm9ybUNvbnRyb2xdJyxcbiAgYmluZGluZ3M6IFtmb3JtQ29udHJvbEJpbmRpbmddLFxuICBpbnB1dHM6IFsnZm9ybTogbmdGb3JtQ29udHJvbCcsICdtb2RlbDogbmdNb2RlbCddLFxuICBvdXRwdXRzOiBbJ3VwZGF0ZTogbmdNb2RlbENoYW5nZSddLFxuICBleHBvcnRBczogJ25nRm9ybSdcbn0pXG5leHBvcnQgY2xhc3MgTmdGb3JtQ29udHJvbCBleHRlbmRzIE5nQ29udHJvbCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIGZvcm06IENvbnRyb2w7XG4gIHVwZGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgbW9kZWw6IGFueTtcbiAgdmlld01vZGVsOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNlbGYoKSBASW5qZWN0KE5HX1ZBTElEQVRPUlMpIHByaXZhdGUgX3ZhbGlkYXRvcnM6XG4gICAgICAgICAgICAgICAgICAvKiBBcnJheTxWYWxpZGF0b3J8RnVuY3Rpb24+ICovIGFueVtdLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIEBJbmplY3QoTkdfQVNZTkNfVkFMSURBVE9SUykgcHJpdmF0ZSBfYXN5bmNWYWxpZGF0b3JzOlxuICAgICAgICAgICAgICAgICAgLyogQXJyYXk8VmFsaWRhdG9yfEZ1bmN0aW9uPiAqLyBhbnlbXSxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBASW5qZWN0KE5HX1ZBTFVFX0FDQ0VTU09SKVxuICAgICAgICAgICAgICB2YWx1ZUFjY2Vzc29yczogQ29udHJvbFZhbHVlQWNjZXNzb3JbXSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy52YWx1ZUFjY2Vzc29yID0gc2VsZWN0VmFsdWVBY2Nlc3Nvcih0aGlzLCB2YWx1ZUFjY2Vzc29ycyk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7W2tleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlfSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9pc0NvbnRyb2xDaGFuZ2VkKGNoYW5nZXMpKSB7XG4gICAgICBzZXRVcENvbnRyb2wodGhpcy5mb3JtLCB0aGlzKTtcbiAgICAgIHRoaXMuZm9ybS51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHtlbWl0RXZlbnQ6IGZhbHNlfSk7XG4gICAgfVxuICAgIGlmIChpc1Byb3BlcnR5VXBkYXRlZChjaGFuZ2VzLCB0aGlzLnZpZXdNb2RlbCkpIHtcbiAgICAgIHRoaXMuZm9ybS51cGRhdGVWYWx1ZSh0aGlzLm1vZGVsKTtcbiAgICAgIHRoaXMudmlld01vZGVsID0gdGhpcy5tb2RlbDtcbiAgICB9XG4gIH1cblxuICBnZXQgcGF0aCgpOiBzdHJpbmdbXSB7IHJldHVybiBbXTsgfVxuXG4gIGdldCB2YWxpZGF0b3IoKTogVmFsaWRhdG9yRm4geyByZXR1cm4gY29tcG9zZVZhbGlkYXRvcnModGhpcy5fdmFsaWRhdG9ycyk7IH1cblxuICBnZXQgYXN5bmNWYWxpZGF0b3IoKTogQXN5bmNWYWxpZGF0b3JGbiB7IHJldHVybiBjb21wb3NlQXN5bmNWYWxpZGF0b3JzKHRoaXMuX2FzeW5jVmFsaWRhdG9ycyk7IH1cblxuICBnZXQgY29udHJvbCgpOiBDb250cm9sIHsgcmV0dXJuIHRoaXMuZm9ybTsgfVxuXG4gIHZpZXdUb01vZGVsVXBkYXRlKG5ld1ZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdNb2RlbCA9IG5ld1ZhbHVlO1xuICAgIE9ic2VydmFibGVXcmFwcGVyLmNhbGxFbWl0KHRoaXMudXBkYXRlLCBuZXdWYWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9pc0NvbnRyb2xDaGFuZ2VkKGNoYW5nZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIFN0cmluZ01hcFdyYXBwZXIuY29udGFpbnMoY2hhbmdlcywgXCJmb3JtXCIpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
