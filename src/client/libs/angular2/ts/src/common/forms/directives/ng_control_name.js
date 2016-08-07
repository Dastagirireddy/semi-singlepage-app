System.register(['angular2/src/facade/lang', 'angular2/src/facade/async', 'angular2/core', './control_container', './ng_control', './control_value_accessor', './shared', '../validators'], function(exports_1, context_1) {
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
    var lang_1, async_1, core_1, control_container_1, ng_control_1, control_value_accessor_1, shared_1, validators_1;
    var controlNameBinding, NgControlName;
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
            function (control_container_1_1) {
                control_container_1 = control_container_1_1;
            },
            function (ng_control_1_1) {
                ng_control_1 = ng_control_1_1;
            },
            function (control_value_accessor_1_1) {
                control_value_accessor_1 = control_value_accessor_1_1;
            },
            function (shared_1_1) {
                shared_1 = shared_1_1;
            },
            function (validators_1_1) {
                validators_1 = validators_1_1;
            }],
        execute: function() {
            controlNameBinding = lang_1.CONST_EXPR(new core_1.Provider(ng_control_1.NgControl, { useExisting: core_1.forwardRef(function () { return NgControlName; }) }));
            /**
             * Creates and binds a control with a specified name to a DOM element.
             *
             * This directive can only be used as a child of {@link NgForm} or {@link NgFormModel}.
            
             * ### Example
             *
             * In this example, we create the login and password controls.
             * We can work with each control separately: check its validity, get its value, listen to its
             * changes.
             *
             *  ```
             * @Component({
             *      selector: "login-comp",
             *      directives: [FORM_DIRECTIVES],
             *      template: `
             *        <form #f="ngForm" (submit)='onLogIn(f.value)'>
             *          Login <input type='text' ngControl='login' #l="form">
             *          <div *ngIf="!l.valid">Login is invalid</div>
             *
             *          Password <input type='password' ngControl='password'>
             *          <button type='submit'>Log in!</button>
             *        </form>
             *      `})
             * class LoginComp {
             *  onLogIn(value): void {
             *    // value === {login: 'some login', password: 'some password'}
             *  }
             * }
             *  ```
             *
             * We can also use ngModel to bind a domain model to the form.
             *
             *  ```
             * @Component({
             *      selector: "login-comp",
             *      directives: [FORM_DIRECTIVES],
             *      template: `
             *        <form (submit)='onLogIn()'>
             *          Login <input type='text' ngControl='login' [(ngModel)]="credentials.login">
             *          Password <input type='password' ngControl='password'
             *                          [(ngModel)]="credentials.password">
             *          <button type='submit'>Log in!</button>
             *        </form>
             *      `})
             * class LoginComp {
             *  credentials: {login:string, password:string};
             *
             *  onLogIn(): void {
             *    // this.credentials.login === "some login"
             *    // this.credentials.password === "some password"
             *  }
             * }
             *  ```
             */
            NgControlName = (function (_super) {
                __extends(NgControlName, _super);
                function NgControlName(_parent, _validators, _asyncValidators, valueAccessors) {
                    _super.call(this);
                    this._parent = _parent;
                    this._validators = _validators;
                    this._asyncValidators = _asyncValidators;
                    /** @internal */
                    this.update = new async_1.EventEmitter();
                    this._added = false;
                    this.valueAccessor = shared_1.selectValueAccessor(this, valueAccessors);
                }
                NgControlName.prototype.ngOnChanges = function (changes) {
                    if (!this._added) {
                        this.formDirective.addControl(this);
                        this._added = true;
                    }
                    if (shared_1.isPropertyUpdated(changes, this.viewModel)) {
                        this.viewModel = this.model;
                        this.formDirective.updateModel(this, this.model);
                    }
                };
                NgControlName.prototype.ngOnDestroy = function () { this.formDirective.removeControl(this); };
                NgControlName.prototype.viewToModelUpdate = function (newValue) {
                    this.viewModel = newValue;
                    async_1.ObservableWrapper.callEmit(this.update, newValue);
                };
                Object.defineProperty(NgControlName.prototype, "path", {
                    get: function () { return shared_1.controlPath(this.name, this._parent); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgControlName.prototype, "formDirective", {
                    get: function () { return this._parent.formDirective; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgControlName.prototype, "validator", {
                    get: function () { return shared_1.composeValidators(this._validators); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgControlName.prototype, "asyncValidator", {
                    get: function () { return shared_1.composeAsyncValidators(this._asyncValidators); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgControlName.prototype, "control", {
                    get: function () { return this.formDirective.getControl(this); },
                    enumerable: true,
                    configurable: true
                });
                NgControlName = __decorate([
                    core_1.Directive({
                        selector: '[ngControl]',
                        bindings: [controlNameBinding],
                        inputs: ['name: ngControl', 'model: ngModel'],
                        outputs: ['update: ngModelChange'],
                        exportAs: 'ngForm'
                    }),
                    __param(0, core_1.Host()),
                    __param(0, core_1.SkipSelf()),
                    __param(1, core_1.Optional()),
                    __param(1, core_1.Self()),
                    __param(1, core_1.Inject(validators_1.NG_VALIDATORS)),
                    __param(2, core_1.Optional()),
                    __param(2, core_1.Self()),
                    __param(2, core_1.Inject(validators_1.NG_ASYNC_VALIDATORS)),
                    __param(3, core_1.Optional()),
                    __param(3, core_1.Self()),
                    __param(3, core_1.Inject(control_value_accessor_1.NG_VALUE_ACCESSOR)), 
                    __metadata('design:paramtypes', [control_container_1.ControlContainer, Array, Array, Array])
                ], NgControlName);
                return NgControlName;
            }(ng_control_1.NgControl));
            exports_1("NgControlName", NgControlName);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL25nX2NvbnRyb2xfbmFtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFpQ00sa0JBQWtCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBQWxCLGtCQUFrQixHQUNwQixpQkFBVSxDQUFDLElBQUksZUFBUSxDQUFDLHNCQUFTLEVBQUUsRUFBQyxXQUFXLEVBQUUsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsYUFBYSxFQUFiLENBQWEsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXhGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFzREc7WUFRSDtnQkFBbUMsaUNBQVM7Z0JBUTFDLHVCQUF3QyxPQUF5QixFQUNGLFdBQ1YsRUFDZ0IsZ0JBQ2hCLEVBRXpDLGNBQXNDO29CQUNoRCxpQkFBTyxDQUFDO29CQVA4QixZQUFPLEdBQVAsT0FBTyxDQUFrQjtvQkFDRixnQkFBVyxHQUFYLFdBQVcsQ0FDckI7b0JBQ2dCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FDaEM7b0JBVnJELGdCQUFnQjtvQkFDaEIsV0FBTSxHQUFHLElBQUksb0JBQVksRUFBRSxDQUFDO29CQUdwQixXQUFNLEdBQUcsS0FBSyxDQUFDO29CQVVyQixJQUFJLENBQUMsYUFBYSxHQUFHLDRCQUFtQixDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztnQkFDakUsQ0FBQztnQkFFRCxtQ0FBVyxHQUFYLFVBQVksT0FBc0M7b0JBQ2hELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7d0JBQ2pCLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNwQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztvQkFDckIsQ0FBQztvQkFDRCxFQUFFLENBQUMsQ0FBQywwQkFBaUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDL0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO3dCQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNuRCxDQUFDO2dCQUNILENBQUM7Z0JBRUQsbUNBQVcsR0FBWCxjQUFzQixJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRS9ELHlDQUFpQixHQUFqQixVQUFrQixRQUFhO29CQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztvQkFDMUIseUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ3BELENBQUM7Z0JBRUQsc0JBQUksK0JBQUk7eUJBQVIsY0FBdUIsTUFBTSxDQUFDLG9CQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBRXJFLHNCQUFJLHdDQUFhO3lCQUFqQixjQUEyQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBRS9ELHNCQUFJLG9DQUFTO3lCQUFiLGNBQStCLE1BQU0sQ0FBQywwQkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBRTVFLHNCQUFJLHlDQUFjO3lCQUFsQixjQUF5QyxNQUFNLENBQUMsK0JBQXNCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBRWhHLHNCQUFJLGtDQUFPO3lCQUFYLGNBQXlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFwRHhFO29CQUFDLGdCQUFTLENBQUM7d0JBQ1QsUUFBUSxFQUFFLGFBQWE7d0JBQ3ZCLFFBQVEsRUFBRSxDQUFDLGtCQUFrQixDQUFDO3dCQUM5QixNQUFNLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQzt3QkFDN0MsT0FBTyxFQUFFLENBQUMsdUJBQXVCLENBQUM7d0JBQ2xDLFFBQVEsRUFBRSxRQUFRO3FCQUNuQixDQUFDOytCQVNhLFdBQUksRUFBRTsrQkFBRSxlQUFRLEVBQUU7K0JBQ2xCLGVBQVEsRUFBRTsrQkFBRSxXQUFJLEVBQUU7K0JBQUUsYUFBTSxDQUFDLDBCQUFhLENBQUM7K0JBRXpDLGVBQVEsRUFBRTsrQkFBRSxXQUFJLEVBQUU7K0JBQUUsYUFBTSxDQUFDLGdDQUFtQixDQUFDOytCQUUvQyxlQUFRLEVBQUU7K0JBQUUsV0FBSSxFQUFFOytCQUFFLGFBQU0sQ0FBQywwQ0FBaUIsQ0FBQzs7aUNBZDFEO2dCQStDRixvQkFBQztZQUFELENBOUNBLEFBOENDLENBOUNrQyxzQkFBUyxHQThDM0M7WUE5Q0QseUNBOENDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29tbW9uL2Zvcm1zL2RpcmVjdGl2ZXMvbmdfY29udHJvbF9uYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDT05TVF9FWFBSfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIE9ic2VydmFibGVXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jJztcblxuaW1wb3J0IHtcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIFNpbXBsZUNoYW5nZSxcbiAgUXVlcnksXG4gIERpcmVjdGl2ZSxcbiAgZm9yd2FyZFJlZixcbiAgSG9zdCxcbiAgU2tpcFNlbGYsXG4gIFByb3ZpZGVyLFxuICBJbmplY3QsXG4gIE9wdGlvbmFsLFxuICBTZWxmXG59IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuXG5pbXBvcnQge0NvbnRyb2xDb250YWluZXJ9IGZyb20gJy4vY29udHJvbF9jb250YWluZXInO1xuaW1wb3J0IHtOZ0NvbnRyb2x9IGZyb20gJy4vbmdfY29udHJvbCc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnLi9jb250cm9sX3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7XG4gIGNvbnRyb2xQYXRoLFxuICBjb21wb3NlVmFsaWRhdG9ycyxcbiAgY29tcG9zZUFzeW5jVmFsaWRhdG9ycyxcbiAgaXNQcm9wZXJ0eVVwZGF0ZWQsXG4gIHNlbGVjdFZhbHVlQWNjZXNzb3Jcbn0gZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IHtDb250cm9sfSBmcm9tICcuLi9tb2RlbCc7XG5pbXBvcnQge05HX1ZBTElEQVRPUlMsIE5HX0FTWU5DX1ZBTElEQVRPUlN9IGZyb20gJy4uL3ZhbGlkYXRvcnMnO1xuaW1wb3J0IHtWYWxpZGF0b3JGbiwgQXN5bmNWYWxpZGF0b3JGbn0gZnJvbSAnLi92YWxpZGF0b3JzJztcblxuXG5jb25zdCBjb250cm9sTmFtZUJpbmRpbmcgPVxuICAgIENPTlNUX0VYUFIobmV3IFByb3ZpZGVyKE5nQ29udHJvbCwge3VzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nQ29udHJvbE5hbWUpfSkpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW5kIGJpbmRzIGEgY29udHJvbCB3aXRoIGEgc3BlY2lmaWVkIG5hbWUgdG8gYSBET00gZWxlbWVudC5cbiAqXG4gKiBUaGlzIGRpcmVjdGl2ZSBjYW4gb25seSBiZSB1c2VkIGFzIGEgY2hpbGQgb2Yge0BsaW5rIE5nRm9ybX0gb3Ige0BsaW5rIE5nRm9ybU1vZGVsfS5cblxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBJbiB0aGlzIGV4YW1wbGUsIHdlIGNyZWF0ZSB0aGUgbG9naW4gYW5kIHBhc3N3b3JkIGNvbnRyb2xzLlxuICogV2UgY2FuIHdvcmsgd2l0aCBlYWNoIGNvbnRyb2wgc2VwYXJhdGVseTogY2hlY2sgaXRzIHZhbGlkaXR5LCBnZXQgaXRzIHZhbHVlLCBsaXN0ZW4gdG8gaXRzXG4gKiBjaGFuZ2VzLlxuICpcbiAqICBgYGBcbiAqIEBDb21wb25lbnQoe1xuICogICAgICBzZWxlY3RvcjogXCJsb2dpbi1jb21wXCIsXG4gKiAgICAgIGRpcmVjdGl2ZXM6IFtGT1JNX0RJUkVDVElWRVNdLFxuICogICAgICB0ZW1wbGF0ZTogYFxuICogICAgICAgIDxmb3JtICNmPVwibmdGb3JtXCIgKHN1Ym1pdCk9J29uTG9nSW4oZi52YWx1ZSknPlxuICogICAgICAgICAgTG9naW4gPGlucHV0IHR5cGU9J3RleHQnIG5nQ29udHJvbD0nbG9naW4nICNsPVwiZm9ybVwiPlxuICogICAgICAgICAgPGRpdiAqbmdJZj1cIiFsLnZhbGlkXCI+TG9naW4gaXMgaW52YWxpZDwvZGl2PlxuICpcbiAqICAgICAgICAgIFBhc3N3b3JkIDxpbnB1dCB0eXBlPSdwYXNzd29yZCcgbmdDb250cm9sPSdwYXNzd29yZCc+XG4gKiAgICAgICAgICA8YnV0dG9uIHR5cGU9J3N1Ym1pdCc+TG9nIGluITwvYnV0dG9uPlxuICogICAgICAgIDwvZm9ybT5cbiAqICAgICAgYH0pXG4gKiBjbGFzcyBMb2dpbkNvbXAge1xuICogIG9uTG9nSW4odmFsdWUpOiB2b2lkIHtcbiAqICAgIC8vIHZhbHVlID09PSB7bG9naW46ICdzb21lIGxvZ2luJywgcGFzc3dvcmQ6ICdzb21lIHBhc3N3b3JkJ31cbiAqICB9XG4gKiB9XG4gKiAgYGBgXG4gKlxuICogV2UgY2FuIGFsc28gdXNlIG5nTW9kZWwgdG8gYmluZCBhIGRvbWFpbiBtb2RlbCB0byB0aGUgZm9ybS5cbiAqXG4gKiAgYGBgXG4gKiBAQ29tcG9uZW50KHtcbiAqICAgICAgc2VsZWN0b3I6IFwibG9naW4tY29tcFwiLFxuICogICAgICBkaXJlY3RpdmVzOiBbRk9STV9ESVJFQ1RJVkVTXSxcbiAqICAgICAgdGVtcGxhdGU6IGBcbiAqICAgICAgICA8Zm9ybSAoc3VibWl0KT0nb25Mb2dJbigpJz5cbiAqICAgICAgICAgIExvZ2luIDxpbnB1dCB0eXBlPSd0ZXh0JyBuZ0NvbnRyb2w9J2xvZ2luJyBbKG5nTW9kZWwpXT1cImNyZWRlbnRpYWxzLmxvZ2luXCI+XG4gKiAgICAgICAgICBQYXNzd29yZCA8aW5wdXQgdHlwZT0ncGFzc3dvcmQnIG5nQ29udHJvbD0ncGFzc3dvcmQnXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJjcmVkZW50aWFscy5wYXNzd29yZFwiPlxuICogICAgICAgICAgPGJ1dHRvbiB0eXBlPSdzdWJtaXQnPkxvZyBpbiE8L2J1dHRvbj5cbiAqICAgICAgICA8L2Zvcm0+XG4gKiAgICAgIGB9KVxuICogY2xhc3MgTG9naW5Db21wIHtcbiAqICBjcmVkZW50aWFsczoge2xvZ2luOnN0cmluZywgcGFzc3dvcmQ6c3RyaW5nfTtcbiAqXG4gKiAgb25Mb2dJbigpOiB2b2lkIHtcbiAqICAgIC8vIHRoaXMuY3JlZGVudGlhbHMubG9naW4gPT09IFwic29tZSBsb2dpblwiXG4gKiAgICAvLyB0aGlzLmNyZWRlbnRpYWxzLnBhc3N3b3JkID09PSBcInNvbWUgcGFzc3dvcmRcIlxuICogIH1cbiAqIH1cbiAqICBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25nQ29udHJvbF0nLFxuICBiaW5kaW5nczogW2NvbnRyb2xOYW1lQmluZGluZ10sXG4gIGlucHV0czogWyduYW1lOiBuZ0NvbnRyb2wnLCAnbW9kZWw6IG5nTW9kZWwnXSxcbiAgb3V0cHV0czogWyd1cGRhdGU6IG5nTW9kZWxDaGFuZ2UnXSxcbiAgZXhwb3J0QXM6ICduZ0Zvcm0nXG59KVxuZXhwb3J0IGNsYXNzIE5nQ29udHJvbE5hbWUgZXh0ZW5kcyBOZ0NvbnRyb2wgaW1wbGVtZW50cyBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95IHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICB1cGRhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIG1vZGVsOiBhbnk7XG4gIHZpZXdNb2RlbDogYW55O1xuICBwcml2YXRlIF9hZGRlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKEBIb3N0KCkgQFNraXBTZWxmKCkgcHJpdmF0ZSBfcGFyZW50OiBDb250cm9sQ29udGFpbmVyLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIEBJbmplY3QoTkdfVkFMSURBVE9SUykgcHJpdmF0ZSBfdmFsaWRhdG9yczpcbiAgICAgICAgICAgICAgICAgIC8qIEFycmF5PFZhbGlkYXRvcnxGdW5jdGlvbj4gKi8gYW55W10sXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgQEluamVjdChOR19BU1lOQ19WQUxJREFUT1JTKSBwcml2YXRlIF9hc3luY1ZhbGlkYXRvcnM6XG4gICAgICAgICAgICAgICAgICAvKiBBcnJheTxWYWxpZGF0b3J8RnVuY3Rpb24+ICovIGFueVtdLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIEBJbmplY3QoTkdfVkFMVUVfQUNDRVNTT1IpXG4gICAgICAgICAgICAgIHZhbHVlQWNjZXNzb3JzOiBDb250cm9sVmFsdWVBY2Nlc3NvcltdKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnZhbHVlQWNjZXNzb3IgPSBzZWxlY3RWYWx1ZUFjY2Vzc29yKHRoaXMsIHZhbHVlQWNjZXNzb3JzKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHtba2V5OiBzdHJpbmddOiBTaW1wbGVDaGFuZ2V9KSB7XG4gICAgaWYgKCF0aGlzLl9hZGRlZCkge1xuICAgICAgdGhpcy5mb3JtRGlyZWN0aXZlLmFkZENvbnRyb2wodGhpcyk7XG4gICAgICB0aGlzLl9hZGRlZCA9IHRydWU7XG4gICAgfVxuICAgIGlmIChpc1Byb3BlcnR5VXBkYXRlZChjaGFuZ2VzLCB0aGlzLnZpZXdNb2RlbCkpIHtcbiAgICAgIHRoaXMudmlld01vZGVsID0gdGhpcy5tb2RlbDtcbiAgICAgIHRoaXMuZm9ybURpcmVjdGl2ZS51cGRhdGVNb2RlbCh0aGlzLCB0aGlzLm1vZGVsKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHsgdGhpcy5mb3JtRGlyZWN0aXZlLnJlbW92ZUNvbnRyb2wodGhpcyk7IH1cblxuICB2aWV3VG9Nb2RlbFVwZGF0ZShuZXdWYWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy52aWV3TW9kZWwgPSBuZXdWYWx1ZTtcbiAgICBPYnNlcnZhYmxlV3JhcHBlci5jYWxsRW1pdCh0aGlzLnVwZGF0ZSwgbmV3VmFsdWUpO1xuICB9XG5cbiAgZ2V0IHBhdGgoKTogc3RyaW5nW10geyByZXR1cm4gY29udHJvbFBhdGgodGhpcy5uYW1lLCB0aGlzLl9wYXJlbnQpOyB9XG5cbiAgZ2V0IGZvcm1EaXJlY3RpdmUoKTogYW55IHsgcmV0dXJuIHRoaXMuX3BhcmVudC5mb3JtRGlyZWN0aXZlOyB9XG5cbiAgZ2V0IHZhbGlkYXRvcigpOiBWYWxpZGF0b3JGbiB7IHJldHVybiBjb21wb3NlVmFsaWRhdG9ycyh0aGlzLl92YWxpZGF0b3JzKTsgfVxuXG4gIGdldCBhc3luY1ZhbGlkYXRvcigpOiBBc3luY1ZhbGlkYXRvckZuIHsgcmV0dXJuIGNvbXBvc2VBc3luY1ZhbGlkYXRvcnModGhpcy5fYXN5bmNWYWxpZGF0b3JzKTsgfVxuXG4gIGdldCBjb250cm9sKCk6IENvbnRyb2wgeyByZXR1cm4gdGhpcy5mb3JtRGlyZWN0aXZlLmdldENvbnRyb2wodGhpcyk7IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
