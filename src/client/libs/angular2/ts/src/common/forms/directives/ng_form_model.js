System.register(['angular2/src/facade/lang', 'angular2/src/facade/collection', 'angular2/src/facade/async', 'angular2/core', './control_container', './shared', '../validators'], function(exports_1, context_1) {
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
    var lang_1, collection_1, async_1, core_1, control_container_1, shared_1, validators_1;
    var formDirectiveProvider, NgFormModel;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL25nX2Zvcm1fbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBcUJNLHFCQUFxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUFyQixxQkFBcUIsR0FDdkIsaUJBQVUsQ0FBQyxJQUFJLGVBQVEsQ0FBQyxvQ0FBZ0IsRUFBRSxFQUFDLFdBQVcsRUFBRSxpQkFBVSxDQUFDLGNBQU0sT0FBQSxXQUFXLEVBQVgsQ0FBVyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFFN0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBdUVHO1lBU0g7Z0JBQWlDLCtCQUFnQjtnQkFNL0MscUJBQStELFdBQWtCLEVBQ1osZ0JBQXVCO29CQUMxRixpQkFBTyxDQUFDO29CQUZxRCxnQkFBVyxHQUFYLFdBQVcsQ0FBTztvQkFDWixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQU87b0JBTDVGLFNBQUksR0FBaUIsSUFBSSxDQUFDO29CQUMxQixlQUFVLEdBQWdCLEVBQUUsQ0FBQztvQkFDN0IsYUFBUSxHQUFHLElBQUksb0JBQVksRUFBRSxDQUFDO2dCQUs5QixDQUFDO2dCQUVELGlDQUFXLEdBQVgsVUFBWSxPQUFzQztvQkFDaEQsRUFBRSxDQUFDLENBQUMsNkJBQWdCLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQy9DLElBQUksSUFBSSxHQUFHLDBCQUFpQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsdUJBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENB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QUFJLElBQUksR0FBUSxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3pDLEdBQUcsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDM0MsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQztnQkE5RUg7b0JBQUMsZ0JBQVMsQ0FBQzt3QkFDVCxRQUFRLEVBQUUsZUFBZTt3QkFDekIsUUFBUSxFQUFFLENBQUMscUJBQXFCLENBQUM7d0JBQ2pDLE1BQU0sRUFBRSxDQUFDLG1CQUFtQixDQUFDO3dCQUM3QixJQUFJLEVBQUUsRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFDO3dCQUNoQyxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUM7d0JBQ3JCLFFBQVEsRUFBRSxRQUFRO3FCQUNuQixDQUFDOytCQU9hLGVBQVEsRUFBRTsrQkFBRSxXQUFJLEVBQUU7K0JBQUUsYUFBTSxDQUFDLDBCQUFhLENBQUM7K0JBQ3pDLGVBQVEsRUFBRTsrQkFBRSxXQUFJLEVBQUU7K0JBQUUsYUFBTSxDQUFDLGdDQUFtQixDQUFDOzsrQkFSNUQ7Z0JBd0VGLGtCQUFDO1lBQUQsQ0F2RUEsQUF1RUMsQ0F2RWdDLG9DQUFnQixHQXVFaEQ7WUF2RUQscUNBdUVDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29tbW9uL2Zvcm1zL2RpcmVjdGl2ZXMvbmdfZm9ybV9tb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7TGlzdFdyYXBwZXIsIFN0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge09ic2VydmFibGVXcmFwcGVyLCBFdmVudEVtaXR0ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYXN5bmMnO1xuaW1wb3J0IHtcbiAgU2ltcGxlQ2hhbmdlLFxuICBPbkNoYW5nZXMsXG4gIERpcmVjdGl2ZSxcbiAgZm9yd2FyZFJlZixcbiAgUHJvdmlkZXIsXG4gIEluamVjdCxcbiAgT3B0aW9uYWwsXG4gIFNlbGZcbn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge05nQ29udHJvbH0gZnJvbSAnLi9uZ19jb250cm9sJztcbmltcG9ydCB7TmdDb250cm9sR3JvdXB9IGZyb20gJy4vbmdfY29udHJvbF9ncm91cCc7XG5pbXBvcnQge0NvbnRyb2xDb250YWluZXJ9IGZyb20gJy4vY29udHJvbF9jb250YWluZXInO1xuaW1wb3J0IHtGb3JtfSBmcm9tICcuL2Zvcm1faW50ZXJmYWNlJztcbmltcG9ydCB7Q29udHJvbCwgQ29udHJvbEdyb3VwfSBmcm9tICcuLi9tb2RlbCc7XG5pbXBvcnQge3NldFVwQ29udHJvbCwgc2V0VXBDb250cm9sR3JvdXAsIGNvbXBvc2VWYWxpZGF0b3JzLCBjb21wb3NlQXN5bmNWYWxpZGF0b3JzfSBmcm9tICcuL3NoYXJlZCc7XG5pbXBvcnQge1ZhbGlkYXRvcnMsIE5HX1ZBTElEQVRPUlMsIE5HX0FTWU5DX1ZBTElEQVRPUlN9IGZyb20gJy4uL3ZhbGlkYXRvcnMnO1xuXG5jb25zdCBmb3JtRGlyZWN0aXZlUHJvdmlkZXIgPVxuICAgIENPTlNUX0VYUFIobmV3IFByb3ZpZGVyKENvbnRyb2xDb250YWluZXIsIHt1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ0Zvcm1Nb2RlbCl9KSk7XG5cbi8qKlxuICogQmluZHMgYW4gZXhpc3RpbmcgY29udHJvbCBncm91cCB0byBhIERPTSBlbGVtZW50LlxuICpcbiAqICMjIyBFeGFtcGxlIChbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC9qcXJWaXJ1ZFk4YW5KeFRNVWpUUD9wPXByZXZpZXcpKVxuICpcbiAqIEluIHRoaXMgZXhhbXBsZSwgd2UgYmluZCB0aGUgY29udHJvbCBncm91cCB0byB0aGUgZm9ybSBlbGVtZW50LCBhbmQgd2UgYmluZCB0aGUgbG9naW4gYW5kXG4gKiBwYXNzd29yZCBjb250cm9scyB0byB0aGUgbG9naW4gYW5kIHBhc3N3b3JkIGVsZW1lbnRzLlxuICpcbiAqICBgYGB0eXBlc2NyaXB0XG4gKiBAQ29tcG9uZW50KHtcbiAqICAgc2VsZWN0b3I6ICdteS1hcHAnLFxuICogICB0ZW1wbGF0ZTogYFxuICogICAgIDxkaXY+XG4gKiAgICAgICA8aDI+TmdGb3JtTW9kZWwgRXhhbXBsZTwvaDI+XG4gKiAgICAgICA8Zm9ybSBbbmdGb3JtTW9kZWxdPVwibG9naW5Gb3JtXCI+XG4gKiAgICAgICAgIDxwPkxvZ2luOiA8aW5wdXQgdHlwZT1cInRleHRcIiBuZ0NvbnRyb2w9XCJsb2dpblwiPjwvcD5cbiAqICAgICAgICAgPHA+UGFzc3dvcmQ6IDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBuZ0NvbnRyb2w9XCJwYXNzd29yZFwiPjwvcD5cbiAqICAgICAgIDwvZm9ybT5cbiAqICAgICAgIDxwPlZhbHVlOjwvcD5cbiAqICAgICAgIDxwcmU+e3t2YWx1ZX19PC9wcmU+XG4gKiAgICAgPC9kaXY+XG4gKiAgIGAsXG4gKiAgIGRpcmVjdGl2ZXM6IFtGT1JNX0RJUkVDVElWRVNdXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIEFwcCB7XG4gKiAgIGxvZ2luRm9ybTogQ29udHJvbEdyb3VwO1xuICpcbiAqICAgY29uc3RydWN0b3IoKSB7XG4gKiAgICAgdGhpcy5sb2dpbkZvcm0gPSBuZXcgQ29udHJvbEdyb3VwKHtcbiAqICAgICAgIGxvZ2luOiBuZXcgQ29udHJvbChcIlwiKSxcbiAqICAgICAgIHBhc3N3b3JkOiBuZXcgQ29udHJvbChcIlwiKVxuICogICAgIH0pO1xuICogICB9XG4gKlxuICogICBnZXQgdmFsdWUoKTogc3RyaW5nIHtcbiAqICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5sb2dpbkZvcm0udmFsdWUsIG51bGwsIDIpO1xuICogICB9XG4gKiB9XG4gKiAgYGBgXG4gKlxuICogV2UgY2FuIGFsc28gdXNlIG5nTW9kZWwgdG8gYmluZCBhIGRvbWFpbiBtb2RlbCB0byB0aGUgZm9ybS5cbiAqXG4gKiAgYGBgdHlwZXNjcmlwdFxuICogQENvbXBvbmVudCh7XG4gKiAgICAgIHNlbGVjdG9yOiBcImxvZ2luLWNvbXBcIixcbiAqICAgICAgZGlyZWN0aXZlczogW0ZPUk1fRElSRUNUSVZFU10sXG4gKiAgICAgIHRlbXBsYXRlOiBgXG4gKiAgICAgICAgPGZvcm0gW25nRm9ybU1vZGVsXT0nbG9naW5Gb3JtJz5cbiAqICAgICAgICAgIExvZ2luIDxpbnB1dCB0eXBlPSd0ZXh0JyBuZ0NvbnRyb2w9J2xvZ2luJyBbKG5nTW9kZWwpXT0nY3JlZGVudGlhbHMubG9naW4nPlxuICogICAgICAgICAgUGFzc3dvcmQgPGlucHV0IHR5cGU9J3Bhc3N3b3JkJyBuZ0NvbnRyb2w9J3Bhc3N3b3JkJ1xuICogICAgICAgICAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPSdjcmVkZW50aWFscy5wYXNzd29yZCc+XG4gKiAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJvbkxvZ2luKClcIj5Mb2dpbjwvYnV0dG9uPlxuICogICAgICAgIDwvZm9ybT5gXG4gKiAgICAgIH0pXG4gKiBjbGFzcyBMb2dpbkNvbXAge1xuICogIGNyZWRlbnRpYWxzOiB7bG9naW46IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZ307XG4gKiAgbG9naW5Gb3JtOiBDb250cm9sR3JvdXA7XG4gKlxuICogIGNvbnN0cnVjdG9yKCkge1xuICogICAgdGhpcy5sb2dpbkZvcm0gPSBuZXcgQ29udHJvbEdyb3VwKHtcbiAqICAgICAgbG9naW46IG5ldyBDb250cm9sKFwiXCIpLFxuICogICAgICBwYXNzd29yZDogbmV3IENvbnRyb2woXCJcIilcbiAqICAgIH0pO1xuICogIH1cbiAqXG4gKiAgb25Mb2dpbigpOiB2b2lkIHtcbiAqICAgIC8vIHRoaXMuY3JlZGVudGlhbHMubG9naW4gPT09ICdzb21lIGxvZ2luJ1xuICogICAgLy8gdGhpcy5jcmVkZW50aWFscy5wYXNzd29yZCA9PT0gJ3NvbWUgcGFzc3dvcmQnXG4gKiAgfVxuICogfVxuICogIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdGb3JtTW9kZWxdJyxcbiAgYmluZGluZ3M6IFtmb3JtRGlyZWN0aXZlUHJvdmlkZXJdLFxuICBpbnB1dHM6IFsnZm9ybTogbmdGb3JtTW9kZWwnXSxcbiAgaG9zdDogeycoc3VibWl0KSc6ICdvblN1Ym1pdCgpJ30sXG4gIG91dHB1dHM6IFsnbmdTdWJtaXQnXSxcbiAgZXhwb3J0QXM6ICduZ0Zvcm0nXG59KVxuZXhwb3J0IGNsYXNzIE5nRm9ybU1vZGVsIGV4dGVuZHMgQ29udHJvbENvbnRhaW5lciBpbXBsZW1lbnRzIEZvcm0sXG4gICAgT25DaGFuZ2VzIHtcbiAgZm9ybTogQ29udHJvbEdyb3VwID0gbnVsbDtcbiAgZGlyZWN0aXZlczogTmdDb250cm9sW10gPSBbXTtcbiAgbmdTdWJtaXQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNlbGYoKSBASW5qZWN0KE5HX1ZBTElEQVRPUlMpIHByaXZhdGUgX3ZhbGlkYXRvcnM6IGFueVtdLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIEBJbmplY3QoTkdfQVNZTkNfVkFMSURBVE9SUykgcHJpdmF0ZSBfYXN5bmNWYWxpZGF0b3JzOiBhbnlbXSkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7W2tleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlfSk6IHZvaWQge1xuICAgIGlmIChTdHJpbmdNYXBXcmFwcGVyLmNvbnRhaW5zKGNoYW5nZXMsIFwiZm9ybVwiKSkge1xuICAgICAgdmFyIHN5bmMgPSBjb21wb3NlVmFsaWRhdG9ycyh0aGlzLl92YWxpZGF0b3JzKTtcbiAgICAgIHRoaXMuZm9ybS52YWxpZGF0b3IgPSBWYWxpZGF0b3JzLmNvbXBvc2UoW3RoaXMuZm9ybS52YWxpZGF0b3IsIHN5bmNdKTtcblxuICAgICAgdmFyIGFzeW5jID0gY29tcG9zZUFzeW5jVmFsaWRhdG9ycyh0aGlzLl9hc3luY1ZhbGlkYXRvcnMpO1xuICAgICAgdGhpcy5mb3JtLmFzeW5jVmFsaWRhdG9yID0gVmFsaWRhdG9ycy5jb21wb3NlQXN5bmMoW3RoaXMuZm9ybS5hc3luY1ZhbGlkYXRvciwgYXN5bmNdKTtcblxuICAgICAgdGhpcy5mb3JtLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoe29ubHlTZWxmOiB0cnVlLCBlbWl0RXZlbnQ6IGZhbHNlfSk7XG4gICAgfVxuXG4gICAgdGhpcy5fdXBkYXRlRG9tVmFsdWUoKTtcbiAgfVxuXG4gIGdldCBmb3JtRGlyZWN0aXZlKCk6IEZvcm0geyByZXR1cm4gdGhpczsgfVxuXG4gIGdldCBjb250cm9sKCk6IENvbnRyb2xHcm91cCB7IHJldHVybiB0aGlzLmZvcm07IH1cblxuICBnZXQgcGF0aCgpOiBzdHJpbmdbXSB7IHJldHVybiBbXTsgfVxuXG4gIGFkZENvbnRyb2woZGlyOiBOZ0NvbnRyb2wpOiB2b2lkIHtcbiAgICB2YXIgY3RybDogYW55ID0gdGhpcy5mb3JtLmZpbmQoZGlyLnBhdGgpO1xuICAgIHNldFVwQ29udHJvbChjdHJsLCBkaXIpO1xuICAgIGN0cmwudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSh7ZW1pdEV2ZW50OiBmYWxzZX0pO1xuICAgIHRoaXMuZGlyZWN0aXZlcy5wdXNoKGRpcik7XG4gIH1cblxuICBnZXRDb250cm9sKGRpcjogTmdDb250cm9sKTogQ29udHJvbCB7IHJldHVybiA8Q29udHJvbD50aGlzLmZvcm0uZmluZChkaXIucGF0aCk7IH1cblxuICByZW1vdmVDb250cm9sKGRpcjogTmdDb250cm9sKTogdm9pZCB7IExpc3RXcmFwcGVyLnJlbW92ZSh0aGlzLmRpcmVjdGl2ZXMsIGRpcik7IH1cblxuICBhZGRDb250cm9sR3JvdXAoZGlyOiBOZ0NvbnRyb2xHcm91cCkge1xuICAgIHZhciBjdHJsOiBhbnkgPSB0aGlzLmZvcm0uZmluZChkaXIucGF0aCk7XG4gICAgc2V0VXBDb250cm9sR3JvdXAoY3RybCwgZGlyKTtcbiAgICBjdHJsLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoe2VtaXRFdmVudDogZmFsc2V9KTtcbiAgfVxuXG4gIHJlbW92ZUNvbnRyb2xHcm91cChkaXI6IE5nQ29udHJvbEdyb3VwKSB7fVxuXG4gIGdldENvbnRyb2xHcm91cChkaXI6IE5nQ29udHJvbEdyb3VwKTogQ29udHJvbEdyb3VwIHtcbiAgICByZXR1cm4gPENvbnRyb2xHcm91cD50aGlzLmZvcm0uZmluZChkaXIucGF0aCk7XG4gIH1cblxuICB1cGRhdGVNb2RlbChkaXI6IE5nQ29udHJvbCwgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHZhciBjdHJswqAgPSA8Q29udHJvbD50aGlzLmZvcm0uZmluZChkaXIucGF0aCk7XG4gICAgY3RybC51cGRhdGVWYWx1ZSh2YWx1ZSk7XG4gIH1cblxuICBvblN1Ym1pdCgpOiBib29sZWFuIHtcbiAgICBPYnNlcnZhYmxlV3JhcHBlci5jYWxsRW1pdCh0aGlzLm5nU3VibWl0LCBudWxsKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF91cGRhdGVEb21WYWx1ZSgpIHtcbiAgICB0aGlzLmRpcmVjdGl2ZXMuZm9yRWFjaChkaXIgPT4ge1xuICAgICAgdmFyIGN0cmw6IGFueSA9IHRoaXMuZm9ybS5maW5kKGRpci5wYXRoKTtcbiAgICAgIGRpci52YWx1ZUFjY2Vzc29yLndyaXRlVmFsdWUoY3RybC52YWx1ZSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
