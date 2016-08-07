System.register(['angular2/src/facade/lang', 'angular2/src/facade/collection', 'angular2/src/facade/exceptions', 'angular2/src/facade/async', 'angular2/core', './control_container', './shared', '../validators'], function(exports_1, context_1) {
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
    var lang_1, collection_1, exceptions_1, async_1, core_1, control_container_1, shared_1, validators_1;
    var formDirectiveProvider, NgFormModel;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
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
            function (shared_1_1) {
                shared_1 = shared_1_1;
            },
            function (validators_1_1) {
                validators_1 = validators_1_1;
            }],
        execute: function() {
            formDirectiveProvider = lang_1.CONST_EXPR(new core_1.Provider(control_container_1.ControlContainer, { useExisting: core_1.forwardRef(function () { return NgFormModel; }) }));
            /**
             * Binds an existing control group to a DOM element.
             *
             * ### Example ([live demo](http://plnkr.co/edit/jqrVirudY8anJxTMUjTP?p=preview))
             *
             * In this example, we bind the control group to the form element, and we bind the login and
             * password controls to the login and password elements.
             *
             *  ```typescript
             * @Component({
             *   selector: 'my-app',
             *   template: `
             *     <div>
             *       <h2>NgFormModel Example</h2>
             *       <form [ngFormModel]="loginForm">
             *         <p>Login: <input type="text" ngControl="login"></p>
             *         <p>Password: <input type="password" ngControl="password"></p>
             *       </form>
             *       <p>Value:</p>
             *       <pre>{{value}}</pre>
             *     </div>
             *   `,
             *   directives: [FORM_DIRECTIVES]
             * })
             * export class App {
             *   loginForm: ControlGroup;
             *
             *   constructor() {
             *     this.loginForm = new ControlGroup({
             *       login: new Control(""),
             *       password: new Control("")
             *     });
             *   }
             *
             *   get value(): string {
             *     return JSON.stringify(this.loginForm.value, null, 2);
             *   }
             * }
             *  ```
             *
             * We can also use ngModel to bind a domain model to the form.
             *
             *  ```typescript
             * @Component({
             *      selector: "login-comp",
             *      directives: [FORM_DIRECTIVES],
             *      template: `
             *        <form [ngFormModel]='loginForm'>
             *          Login <input type='text' ngControl='login' [(ngModel)]='credentials.login'>
             *          Password <input type='password' ngControl='password'
             *                          [(ngModel)]='credentials.password'>
             *          <button (click)="onLogin()">Login</button>
             *        </form>`
             *      })
             * class LoginComp {
             *  credentials: {login: string, password: string};
             *  loginForm: ControlGroup;
             *
             *  constructor() {
             *    this.loginForm = new ControlGroup({
             *      login: new Control(""),
             *      password: new Control("")
             *    });
             *  }
             *
             *  onLogin(): void {
             *    // this.credentials.login === 'some login'
             *    // this.credentials.password === 'some password'
             *  }
             * }
             *  ```
             */
            NgFormModel = (function (_super) {
                __extends(NgFormModel, _super);
                function NgFormModel(_validators, _asyncValidators) {
                    _super.call(this);
                    this._validators = _validators;
                    this._asyncValidators = _asyncValidators;
                    this.form = null;
                    this.directives = [];
                    this.ngSubmit = new async_1.EventEmitter();
                }
                NgFormModel.prototype.ngOnChanges = function (changes) {
                    this._checkFormPresent();
                    if (collection_1.StringMapWrapper.contains(changes, "form")) {
                        var sync = shared_1.composeValidators(this._validators);
                        this.form.validator = validators_1.Validators.compose([this.form.validator, sync]);
                        var async = shared_1.composeAsyncValidators(this._asyncValidators);
                        this.form.asyncValidator = validators_1.Validators.composeAsync([this.form.asyncValidator, async]);
                        this.form.updateValueAndValidity({ onlySelf: true, emitEvent: false });
                    }
                    this._updateDomValue();
                };
                Object.defineProperty(NgFormModel.prototype, "formDirective", {
                    get: function () { return this; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgFormModel.prototype, "control", {
                    get: function () { return this.form; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgFormModel.prototype, "path", {
                    get: function () { return []; },
                    enumerable: true,
                    configurable: true
                });
                NgFormModel.prototype.addControl = function (dir) {
                    var ctrl = this.form.find(dir.path);
                    shared_1.setUpControl(ctrl, dir);
                    ctrl.updateValueAndValidity({ emitEvent: false });
                    this.directives.push(dir);
                };
                NgFormModel.prototype.getControl = function (dir) { return this.form.find(dir.path); };
                NgFormModel.prototype.removeControl = function (dir) { collection_1.ListWrapper.remove(this.directives, dir); };
                NgFormModel.prototype.addControlGroup = function (dir) {
                    var ctrl = this.form.find(dir.path);
                    shared_1.setUpControlGroup(ctrl, dir);
                    ctrl.updateValueAndValidity({ emitEvent: false });
                };
                NgFormModel.prototype.removeControlGroup = function (dir) { };
                NgFormModel.prototype.getControlGroup = function (dir) {
                    return this.form.find(dir.path);
                };
                NgFormModel.prototype.updateModel = function (dir, value) {
                    var ctrl = this.form.find(dir.path);
                    ctrl.updateValue(value);
                };
                NgFormModel.prototype.onSubmit = function () {
                    async_1.ObservableWrapper.callEmit(this.ngSubmit, null);
                    return false;
                };
                /** @internal */
                NgFormModel.prototype._updateDomValue = function () {
                    var _this = this;
                    this.directives.forEach(function (dir) {
                        var ctrl = _this.form.find(dir.path);
                        dir.valueAccessor.writeValue(ctrl.value);
                    });
                };
                NgFormModel.prototype._checkFormPresent = function () {
                    if (lang_1.isBlank(this.form)) {
                        throw new exceptions_1.BaseException("ngFormModel expects a form. Please pass one in. Example: <form [ngFormModel]=\"myCoolForm\">");
                    }
                };
                NgFormModel = __decorate([
                    core_1.Directive({
                        selector: '[ngFormModel]',
                        bindings: [formDirectiveProvider],
                        inputs: ['form: ngFormModel'],
                        host: { '(submit)': 'onSubmit()' },
                        outputs: ['ngSubmit'],
                        exportAs: 'ngForm'
                    }),
                    __param(0, core_1.Optional()),
                    __param(0, core_1.Self()),
                    __param(0, core_1.Inject(validators_1.NG_VALIDATORS)),
                    __param(1, core_1.Optional()),
                    __param(1, core_1.Self()),
                    __param(1, core_1.Inject(validators_1.NG_ASYNC_VALIDATORS)), 
                    __metadata('design:paramtypes', [Array, Array])
                ], NgFormModel);
                return NgFormModel;
            }(control_container_1.ControlContainer));
            exports_1("NgFormModel", NgFormModel);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZm9ybXMvZGlyZWN0aXZlcy9uZ19mb3JtX21vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQXNCTSxxQkFBcUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFBckIscUJBQXFCLEdBQ3ZCLGlCQUFVLENBQUMsSUFBSSxlQUFRLENBQUMsb0NBQWdCLEVBQUUsRUFBQyxXQUFXLEVBQUUsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsV0FBVyxFQUFYLENBQVcsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTdGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQXVFRztZQVNIO2dCQUFpQywrQkFBZ0I7Z0JBTS9DLHFCQUErRCxXQUFrQixFQUNaLGdCQUF1QjtvQkFDMUYsaUJBQU8sQ0FBQztvQkFGcUQsZ0JBQVcsR0FBWCxXQUFXLENBQU87b0JBQ1oscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFPO29CQUw1RixTQUFJLEdBQWlCLElBQUksQ0FBQztvQkFDMUIsZUFBVSxHQUFnQixFQUFFLENBQUM7b0JBQzdCLGFBQVEsR0FBRyxJQUFJLG9CQUFZLEVBQUUsQ0FBQztnQkFLOUIsQ0FBQztnQkFFRCxpQ0FBVyxHQUFYLFVBQVksT0FBc0M7b0JBQ2hELElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO29CQUN6QixFQUFFLENBQUMsQ0FBQyw2QkFBZ0IsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDL0MsSUFBSSxJQUFJLEdBQUcsMEJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyx1QkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUks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QUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7d0JBQ3pCLElBQUksSUFBSSxHQUFRLEtBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDekMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMzQyxDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDO2dCQUVPLHVDQUFpQixHQUF6QjtvQkFDRSxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdkIsTUFBTSxJQUFJLDBCQUFhLENBQ25CLDhGQUE0RixDQUFDLENBQUM7b0JBQ3BHLENBQUM7Z0JBQ0gsQ0FBQztnQkF0Rkg7b0JBQUMsZ0JBQVMsQ0FBQzt3QkFDVCxRQUFRLEVBQUUsZUFBZTt3QkFDekIsUUFBUSxFQUFFLENBQUMscUJBQXFCLENBQUM7d0JBQ2pDLE1BQU0sRUFBRSxDQUFDLG1CQUFtQixDQUFDO3dCQUM3QixJQUFJLEVBQUUsRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFDO3dCQUNoQyxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUM7d0JBQ3JCLFFBQVEsRUFBRSxRQUFRO3FCQUNuQixDQUFDOytCQU9hLGVBQVEsRUFBRTsrQkFBRSxXQUFJLEVBQUU7K0JBQUUsYUFBTSxDQUFDLDBCQUFhLENBQUM7K0JBQ3pDLGVBQVEsRUFBRTsrQkFBRSxXQUFJLEVBQUU7K0JBQUUsYUFBTSxDQUFDLGdDQUFtQixDQUFDOzsrQkFSNUQ7Z0JBZ0ZGLGtCQUFDO1lBQUQsQ0EvRUEsQUErRUMsQ0EvRWdDLG9DQUFnQixHQStFaEQ7WUEvRUQscUNBK0VDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL25nX2Zvcm1fbW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NPTlNUX0VYUFIsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0xpc3RXcmFwcGVyLCBTdHJpbmdNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtPYnNlcnZhYmxlV3JhcHBlciwgRXZlbnRFbWl0dGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jJztcbmltcG9ydCB7XG4gIFNpbXBsZUNoYW5nZSxcbiAgT25DaGFuZ2VzLFxuICBEaXJlY3RpdmUsXG4gIGZvcndhcmRSZWYsXG4gIFByb3ZpZGVyLFxuICBJbmplY3QsXG4gIE9wdGlvbmFsLFxuICBTZWxmXG59IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtOZ0NvbnRyb2x9IGZyb20gJy4vbmdfY29udHJvbCc7XG5pbXBvcnQge05nQ29udHJvbEdyb3VwfSBmcm9tICcuL25nX2NvbnRyb2xfZ3JvdXAnO1xuaW1wb3J0IHtDb250cm9sQ29udGFpbmVyfSBmcm9tICcuL2NvbnRyb2xfY29udGFpbmVyJztcbmltcG9ydCB7Rm9ybX0gZnJvbSAnLi9mb3JtX2ludGVyZmFjZSc7XG5pbXBvcnQge0NvbnRyb2wsIENvbnRyb2xHcm91cH0gZnJvbSAnLi4vbW9kZWwnO1xuaW1wb3J0IHtzZXRVcENvbnRyb2wsIHNldFVwQ29udHJvbEdyb3VwLCBjb21wb3NlVmFsaWRhdG9ycywgY29tcG9zZUFzeW5jVmFsaWRhdG9yc30gZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IHtWYWxpZGF0b3JzLCBOR19WQUxJREFUT1JTLCBOR19BU1lOQ19WQUxJREFUT1JTfSBmcm9tICcuLi92YWxpZGF0b3JzJztcblxuY29uc3QgZm9ybURpcmVjdGl2ZVByb3ZpZGVyID1cbiAgICBDT05TVF9FWFBSKG5ldyBQcm92aWRlcihDb250cm9sQ29udGFpbmVyLCB7dXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdGb3JtTW9kZWwpfSkpO1xuXG4vKipcbiAqIEJpbmRzIGFuIGV4aXN0aW5nIGNvbnRyb2wgZ3JvdXAgdG8gYSBET00gZWxlbWVudC5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvanFyVmlydWRZOGFuSnhUTVVqVFA/cD1wcmV2aWV3KSlcbiAqXG4gKiBJbiB0aGlzIGV4YW1wbGUsIHdlIGJpbmQgdGhlIGNvbnRyb2wgZ3JvdXAgdG8gdGhlIGZvcm0gZWxlbWVudCwgYW5kIHdlIGJpbmQgdGhlIGxvZ2luIGFuZFxuICogcGFzc3dvcmQgY29udHJvbHMgdG8gdGhlIGxvZ2luIGFuZCBwYXNzd29yZCBlbGVtZW50cy5cbiAqXG4gKiAgYGBgdHlwZXNjcmlwdFxuICogQENvbXBvbmVudCh7XG4gKiAgIHNlbGVjdG9yOiAnbXktYXBwJyxcbiAqICAgdGVtcGxhdGU6IGBcbiAqICAgICA8ZGl2PlxuICogICAgICAgPGgyPk5nRm9ybU1vZGVsIEV4YW1wbGU8L2gyPlxuICogICAgICAgPGZvcm0gW25nRm9ybU1vZGVsXT1cImxvZ2luRm9ybVwiPlxuICogICAgICAgICA8cD5Mb2dpbjogPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmdDb250cm9sPVwibG9naW5cIj48L3A+XG4gKiAgICAgICAgIDxwPlBhc3N3b3JkOiA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgbmdDb250cm9sPVwicGFzc3dvcmRcIj48L3A+XG4gKiAgICAgICA8L2Zvcm0+XG4gKiAgICAgICA8cD5WYWx1ZTo8L3A+XG4gKiAgICAgICA8cHJlPnt7dmFsdWV9fTwvcHJlPlxuICogICAgIDwvZGl2PlxuICogICBgLFxuICogICBkaXJlY3RpdmVzOiBbRk9STV9ESVJFQ1RJVkVTXVxuICogfSlcbiAqIGV4cG9ydCBjbGFzcyBBcHAge1xuICogICBsb2dpbkZvcm06IENvbnRyb2xHcm91cDtcbiAqXG4gKiAgIGNvbnN0cnVjdG9yKCkge1xuICogICAgIHRoaXMubG9naW5Gb3JtID0gbmV3IENvbnRyb2xHcm91cCh7XG4gKiAgICAgICBsb2dpbjogbmV3IENvbnRyb2woXCJcIiksXG4gKiAgICAgICBwYXNzd29yZDogbmV3IENvbnRyb2woXCJcIilcbiAqICAgICB9KTtcbiAqICAgfVxuICpcbiAqICAgZ2V0IHZhbHVlKCk6IHN0cmluZyB7XG4gKiAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMubG9naW5Gb3JtLnZhbHVlLCBudWxsLCAyKTtcbiAqICAgfVxuICogfVxuICogIGBgYFxuICpcbiAqIFdlIGNhbiBhbHNvIHVzZSBuZ01vZGVsIHRvIGJpbmQgYSBkb21haW4gbW9kZWwgdG8gdGhlIGZvcm0uXG4gKlxuICogIGBgYHR5cGVzY3JpcHRcbiAqIEBDb21wb25lbnQoe1xuICogICAgICBzZWxlY3RvcjogXCJsb2dpbi1jb21wXCIsXG4gKiAgICAgIGRpcmVjdGl2ZXM6IFtGT1JNX0RJUkVDVElWRVNdLFxuICogICAgICB0ZW1wbGF0ZTogYFxuICogICAgICAgIDxmb3JtIFtuZ0Zvcm1Nb2RlbF09J2xvZ2luRm9ybSc+XG4gKiAgICAgICAgICBMb2dpbiA8aW5wdXQgdHlwZT0ndGV4dCcgbmdDb250cm9sPSdsb2dpbicgWyhuZ01vZGVsKV09J2NyZWRlbnRpYWxzLmxvZ2luJz5cbiAqICAgICAgICAgIFBhc3N3b3JkIDxpbnB1dCB0eXBlPSdwYXNzd29yZCcgbmdDb250cm9sPSdwYXNzd29yZCdcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT0nY3JlZGVudGlhbHMucGFzc3dvcmQnPlxuICogICAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwib25Mb2dpbigpXCI+TG9naW48L2J1dHRvbj5cbiAqICAgICAgICA8L2Zvcm0+YFxuICogICAgICB9KVxuICogY2xhc3MgTG9naW5Db21wIHtcbiAqICBjcmVkZW50aWFsczoge2xvZ2luOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmd9O1xuICogIGxvZ2luRm9ybTogQ29udHJvbEdyb3VwO1xuICpcbiAqICBjb25zdHJ1Y3RvcigpIHtcbiAqICAgIHRoaXMubG9naW5Gb3JtID0gbmV3IENvbnRyb2xHcm91cCh7XG4gKiAgICAgIGxvZ2luOiBuZXcgQ29udHJvbChcIlwiKSxcbiAqICAgICAgcGFzc3dvcmQ6IG5ldyBDb250cm9sKFwiXCIpXG4gKiAgICB9KTtcbiAqICB9XG4gKlxuICogIG9uTG9naW4oKTogdm9pZCB7XG4gKiAgICAvLyB0aGlzLmNyZWRlbnRpYWxzLmxvZ2luID09PSAnc29tZSBsb2dpbidcbiAqICAgIC8vIHRoaXMuY3JlZGVudGlhbHMucGFzc3dvcmQgPT09ICdzb21lIHBhc3N3b3JkJ1xuICogIH1cbiAqIH1cbiAqICBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25nRm9ybU1vZGVsXScsXG4gIGJpbmRpbmdzOiBbZm9ybURpcmVjdGl2ZVByb3ZpZGVyXSxcbiAgaW5wdXRzOiBbJ2Zvcm06IG5nRm9ybU1vZGVsJ10sXG4gIGhvc3Q6IHsnKHN1Ym1pdCknOiAnb25TdWJtaXQoKSd9LFxuICBvdXRwdXRzOiBbJ25nU3VibWl0J10sXG4gIGV4cG9ydEFzOiAnbmdGb3JtJ1xufSlcbmV4cG9ydCBjbGFzcyBOZ0Zvcm1Nb2RlbCBleHRlbmRzIENvbnRyb2xDb250YWluZXIgaW1wbGVtZW50cyBGb3JtLFxuICAgIE9uQ2hhbmdlcyB7XG4gIGZvcm06IENvbnRyb2xHcm91cCA9IG51bGw7XG4gIGRpcmVjdGl2ZXM6IE5nQ29udHJvbFtdID0gW107XG4gIG5nU3VibWl0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTZWxmKCkgQEluamVjdChOR19WQUxJREFUT1JTKSBwcml2YXRlIF92YWxpZGF0b3JzOiBhbnlbXSxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBASW5qZWN0KE5HX0FTWU5DX1ZBTElEQVRPUlMpIHByaXZhdGUgX2FzeW5jVmFsaWRhdG9yczogYW55W10pIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczoge1trZXk6IHN0cmluZ106IFNpbXBsZUNoYW5nZX0pOiB2b2lkIHtcbiAgICB0aGlzLl9jaGVja0Zvcm1QcmVzZW50KCk7XG4gICAgaWYgKFN0cmluZ01hcFdyYXBwZXIuY29udGFpbnMoY2hhbmdlcywgXCJmb3JtXCIpKSB7XG4gICAgICB2YXIgc3luYyA9IGNvbXBvc2VWYWxpZGF0b3JzKHRoaXMuX3ZhbGlkYXRvcnMpO1xuICAgICAgdGhpcy5mb3JtLnZhbGlkYXRvciA9IFZhbGlkYXRvcnMuY29tcG9zZShbdGhpcy5mb3JtLnZhbGlkYXRvciwgc3luY10pO1xuXG4gICAgICB2YXIgYXN5bmMgPSBjb21wb3NlQXN5bmNWYWxpZGF0b3JzKHRoaXMuX2FzeW5jVmFsaWRhdG9ycyk7XG4gICAgICB0aGlzLmZvcm0uYXN5bmNWYWxpZGF0b3IgPSBWYWxpZGF0b3JzLmNvbXBvc2VBc3luYyhbdGhpcy5mb3JtLmFzeW5jVmFsaWRhdG9yLCBhc3luY10pO1xuXG4gICAgICB0aGlzLmZvcm0udXBkYXRlVmFsdWVBbmRWYWxpZGl0eSh7b25seVNlbGY6IHRydWUsIGVtaXRFdmVudDogZmFsc2V9KTtcbiAgICB9XG5cbiAgICB0aGlzLl91cGRhdGVEb21WYWx1ZSgpO1xuICB9XG5cbiAgZ2V0IGZvcm1EaXJlY3RpdmUoKTogRm9ybSB7IHJldHVybiB0aGlzOyB9XG5cbiAgZ2V0IGNvbnRyb2woKTogQ29udHJvbEdyb3VwIHsgcmV0dXJuIHRoaXMuZm9ybTsgfVxuXG4gIGdldCBwYXRoKCk6IHN0cmluZ1tdIHsgcmV0dXJuIFtdOyB9XG5cbiAgYWRkQ29udHJvbChkaXI6IE5nQ29udHJvbCk6IHZvaWQge1xuICAgIHZhciBjdHJsOiBhbnkgPSB0aGlzLmZvcm0uZmluZChkaXIucGF0aCk7XG4gICAgc2V0VXBDb250cm9sKGN0cmwsIGRpcik7XG4gICAgY3RybC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHtlbWl0RXZlbnQ6IGZhbHNlfSk7XG4gICAgdGhpcy5kaXJlY3RpdmVzLnB1c2goZGlyKTtcbiAgfVxuXG4gIGdldENvbnRyb2woZGlyOiBOZ0NvbnRyb2wpOiBDb250cm9sIHsgcmV0dXJuIDxDb250cm9sPnRoaXMuZm9ybS5maW5kKGRpci5wYXRoKTsgfVxuXG4gIHJlbW92ZUNvbnRyb2woZGlyOiBOZ0NvbnRyb2wpOiB2b2lkIHsgTGlzdFdyYXBwZXIucmVtb3ZlKHRoaXMuZGlyZWN0aXZlcywgZGlyKTsgfVxuXG4gIGFkZENvbnRyb2xHcm91cChkaXI6IE5nQ29udHJvbEdyb3VwKSB7XG4gICAgdmFyIGN0cmw6IGFueSA9IHRoaXMuZm9ybS5maW5kKGRpci5wYXRoKTtcbiAgICBzZXRVcENvbnRyb2xHcm91cChjdHJsLCBkaXIpO1xuICAgIGN0cmwudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSh7ZW1pdEV2ZW50OiBmYWxzZX0pO1xuICB9XG5cbiAgcmVtb3ZlQ29udHJvbEdyb3VwKGRpcjogTmdDb250cm9sR3JvdXApIHt9XG5cbiAgZ2V0Q29udHJvbEdyb3VwKGRpcjogTmdDb250cm9sR3JvdXApOiBDb250cm9sR3JvdXAge1xuICAgIHJldHVybiA8Q29udHJvbEdyb3VwPnRoaXMuZm9ybS5maW5kKGRpci5wYXRoKTtcbiAgfVxuXG4gIHVwZGF0ZU1vZGVsKGRpcjogTmdDb250cm9sLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdmFyIGN0cmzCoCA9IDxDb250cm9sPnRoaXMuZm9ybS5maW5kKGRpci5wYXRoKTtcbiAgICBjdHJsLnVwZGF0ZVZhbHVlKHZhbHVlKTtcbiAgfVxuXG4gIG9uU3VibWl0KCk6IGJvb2xlYW4ge1xuICAgIE9ic2VydmFibGVXcmFwcGVyLmNhbGxFbWl0KHRoaXMubmdTdWJtaXQsIG51bGwpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3VwZGF0ZURvbVZhbHVlKCkge1xuICAgIHRoaXMuZGlyZWN0aXZlcy5mb3JFYWNoKGRpciA9PiB7XG4gICAgICB2YXIgY3RybDogYW55ID0gdGhpcy5mb3JtLmZpbmQoZGlyLnBhdGgpO1xuICAgICAgZGlyLnZhbHVlQWNjZXNzb3Iud3JpdGVWYWx1ZShjdHJsLnZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2NoZWNrRm9ybVByZXNlbnQoKSB7XG4gICAgaWYgKGlzQmxhbmsodGhpcy5mb3JtKSkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgICAgYG5nRm9ybU1vZGVsIGV4cGVjdHMgYSBmb3JtLiBQbGVhc2UgcGFzcyBvbmUgaW4uIEV4YW1wbGU6IDxmb3JtIFtuZ0Zvcm1Nb2RlbF09XCJteUNvb2xGb3JtXCI+YCk7XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
