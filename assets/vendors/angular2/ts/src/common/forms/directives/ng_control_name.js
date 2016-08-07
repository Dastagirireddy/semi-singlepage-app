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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZm9ybXMvZGlyZWN0aXZlcy9uZ19jb250cm9sX25hbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBaUNNLGtCQUFrQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUFsQixrQkFBa0IsR0FDcEIsaUJBQVUsQ0FBQyxJQUFJLGVBQVEsQ0FBQyxzQkFBUyxFQUFFLEVBQUMsV0FBVyxFQUFFLGlCQUFVLENBQUMsY0FBTSxPQUFBLGFBQWEsRUFBYixDQUFhLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztZQUV4Rjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBc0RHO1lBUUg7Z0JBQW1DLGlDQUFTO2dCQVExQyx1QkFBd0MsT0FBeUIsRUFDRixXQUNWLEVBQ2dCLGdCQUNoQixFQUV6QyxjQUFzQztvQkFDaEQsaUJBQU8sQ0FBQztvQkFQOEIsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7b0JBQ0YsZ0JBQVcsR0FBWCxXQUFXLENBQ3JCO29CQUNnQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQ2hDO29CQVZyRCxnQkFBZ0I7b0JBQ2hCLFdBQU0sR0FBRyxJQUFJLG9CQUFZLEVBQUUsQ0FBQztvQkFHcEIsV0FBTSxHQUFHLEtBQUssQ0FBQztvQkFVckIsSUFBSSxDQUFDLGFBQWEsR0FBRyw0QkFBbUIsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQ2pFLENBQUM7Z0JBRUQsbUNBQVcsR0FBWCxVQUFZLE9BQXNDO29CQUNoRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUNqQixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQ3JCLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsMEJBQWlCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQy9DLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQzt3QkFDNUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDbkQsQ0FBQztnQkFDSCxDQUFDO2dCQUVELG1DQUFXLEdBQVgsY0FBc0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUUvRCx5Q0FBaUIsR0FBakIsVUFBa0IsUUFBYTtvQkFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7b0JBQzFCLHlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNwRCxDQUFDO2dCQUVELHNCQUFJLCtCQUFJO3lCQUFSLGNBQXVCLE1BQU0sQ0FBQyxvQkFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUVyRSxzQkFBSSx3Q0FBYTt5QkFBakIsY0FBMkIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUUvRCxzQkFBSSxvQ0FBUzt5QkFBYixjQUErQixNQUFNLENBQUMsMEJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUU1RSxzQkFBSSx5Q0FBYzt5QkFBbEIsY0FBeUMsTUFBTSxDQUFDLCtCQUFzQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUVoRyxzQkFBSSxrQ0FBTzt5QkFBWCxjQUF5QixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBcER4RTtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSxhQUFhO3dCQUN2QixRQUFRLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQzt3QkFDOUIsTUFBTSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsZ0JBQWdCLENBQUM7d0JBQzdDLE9BQU8sRUFBRSxDQUFDLHVCQUF1QixDQUFDO3dCQUNsQyxRQUFRLEVBQUUsUUFBUTtxQkFDbkIsQ0FBQzsrQkFTYSxXQUFJLEVBQUU7K0JBQUUsZUFBUSxFQUFFOytCQUNsQixlQUFRLEVBQUU7K0JBQUUsV0FBSSxFQUFFOytCQUFFLGFBQU0sQ0FBQywwQkFBYSxDQUFDOytCQUV6QyxlQUFRLEVBQUU7K0JBQUUsV0FBSSxFQUFFOytCQUFFLGFBQU0sQ0FBQyxnQ0FBbUIsQ0FBQzsrQkFFL0MsZUFBUSxFQUFFOytCQUFFLFdBQUksRUFBRTsrQkFBRSxhQUFNLENBQUMsMENBQWlCLENBQUM7O2lDQWQxRDtnQkErQ0Ysb0JBQUM7WUFBRCxDQTlDQSxBQThDQyxDQTlDa0Msc0JBQVMsR0E4QzNDO1lBOUNELHlDQThDQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZm9ybXMvZGlyZWN0aXZlcy9uZ19jb250cm9sX25hbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NPTlNUX0VYUFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0V2ZW50RW1pdHRlciwgT2JzZXJ2YWJsZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYXN5bmMnO1xuXG5pbXBvcnQge1xuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgU2ltcGxlQ2hhbmdlLFxuICBRdWVyeSxcbiAgRGlyZWN0aXZlLFxuICBmb3J3YXJkUmVmLFxuICBIb3N0LFxuICBTa2lwU2VsZixcbiAgUHJvdmlkZXIsXG4gIEluamVjdCxcbiAgT3B0aW9uYWwsXG4gIFNlbGZcbn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5cbmltcG9ydCB7Q29udHJvbENvbnRhaW5lcn0gZnJvbSAnLi9jb250cm9sX2NvbnRhaW5lcic7XG5pbXBvcnQge05nQ29udHJvbH0gZnJvbSAnLi9uZ19jb250cm9sJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICcuL2NvbnRyb2xfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtcbiAgY29udHJvbFBhdGgsXG4gIGNvbXBvc2VWYWxpZGF0b3JzLFxuICBjb21wb3NlQXN5bmNWYWxpZGF0b3JzLFxuICBpc1Byb3BlcnR5VXBkYXRlZCxcbiAgc2VsZWN0VmFsdWVBY2Nlc3NvclxufSBmcm9tICcuL3NoYXJlZCc7XG5pbXBvcnQge0NvbnRyb2x9IGZyb20gJy4uL21vZGVsJztcbmltcG9ydCB7TkdfVkFMSURBVE9SUywgTkdfQVNZTkNfVkFMSURBVE9SU30gZnJvbSAnLi4vdmFsaWRhdG9ycyc7XG5pbXBvcnQge1ZhbGlkYXRvckZuLCBBc3luY1ZhbGlkYXRvckZufSBmcm9tICcuL3ZhbGlkYXRvcnMnO1xuXG5cbmNvbnN0IGNvbnRyb2xOYW1lQmluZGluZyA9XG4gICAgQ09OU1RfRVhQUihuZXcgUHJvdmlkZXIoTmdDb250cm9sLCB7dXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdDb250cm9sTmFtZSl9KSk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgYmluZHMgYSBjb250cm9sIHdpdGggYSBzcGVjaWZpZWQgbmFtZSB0byBhIERPTSBlbGVtZW50LlxuICpcbiAqIFRoaXMgZGlyZWN0aXZlIGNhbiBvbmx5IGJlIHVzZWQgYXMgYSBjaGlsZCBvZiB7QGxpbmsgTmdGb3JtfSBvciB7QGxpbmsgTmdGb3JtTW9kZWx9LlxuXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIEluIHRoaXMgZXhhbXBsZSwgd2UgY3JlYXRlIHRoZSBsb2dpbiBhbmQgcGFzc3dvcmQgY29udHJvbHMuXG4gKiBXZSBjYW4gd29yayB3aXRoIGVhY2ggY29udHJvbCBzZXBhcmF0ZWx5OiBjaGVjayBpdHMgdmFsaWRpdHksIGdldCBpdHMgdmFsdWUsIGxpc3RlbiB0byBpdHNcbiAqIGNoYW5nZXMuXG4gKlxuICogIGBgYFxuICogQENvbXBvbmVudCh7XG4gKiAgICAgIHNlbGVjdG9yOiBcImxvZ2luLWNvbXBcIixcbiAqICAgICAgZGlyZWN0aXZlczogW0ZPUk1fRElSRUNUSVZFU10sXG4gKiAgICAgIHRlbXBsYXRlOiBgXG4gKiAgICAgICAgPGZvcm0gI2Y9XCJuZ0Zvcm1cIiAoc3VibWl0KT0nb25Mb2dJbihmLnZhbHVlKSc+XG4gKiAgICAgICAgICBMb2dpbiA8aW5wdXQgdHlwZT0ndGV4dCcgbmdDb250cm9sPSdsb2dpbicgI2w9XCJmb3JtXCI+XG4gKiAgICAgICAgICA8ZGl2ICpuZ0lmPVwiIWwudmFsaWRcIj5Mb2dpbiBpcyBpbnZhbGlkPC9kaXY+XG4gKlxuICogICAgICAgICAgUGFzc3dvcmQgPGlucHV0IHR5cGU9J3Bhc3N3b3JkJyBuZ0NvbnRyb2w9J3Bhc3N3b3JkJz5cbiAqICAgICAgICAgIDxidXR0b24gdHlwZT0nc3VibWl0Jz5Mb2cgaW4hPC9idXR0b24+XG4gKiAgICAgICAgPC9mb3JtPlxuICogICAgICBgfSlcbiAqIGNsYXNzIExvZ2luQ29tcCB7XG4gKiAgb25Mb2dJbih2YWx1ZSk6IHZvaWQge1xuICogICAgLy8gdmFsdWUgPT09IHtsb2dpbjogJ3NvbWUgbG9naW4nLCBwYXNzd29yZDogJ3NvbWUgcGFzc3dvcmQnfVxuICogIH1cbiAqIH1cbiAqICBgYGBcbiAqXG4gKiBXZSBjYW4gYWxzbyB1c2UgbmdNb2RlbCB0byBiaW5kIGEgZG9tYWluIG1vZGVsIHRvIHRoZSBmb3JtLlxuICpcbiAqICBgYGBcbiAqIEBDb21wb25lbnQoe1xuICogICAgICBzZWxlY3RvcjogXCJsb2dpbi1jb21wXCIsXG4gKiAgICAgIGRpcmVjdGl2ZXM6IFtGT1JNX0RJUkVDVElWRVNdLFxuICogICAgICB0ZW1wbGF0ZTogYFxuICogICAgICAgIDxmb3JtIChzdWJtaXQpPSdvbkxvZ0luKCknPlxuICogICAgICAgICAgTG9naW4gPGlucHV0IHR5cGU9J3RleHQnIG5nQ29udHJvbD0nbG9naW4nIFsobmdNb2RlbCldPVwiY3JlZGVudGlhbHMubG9naW5cIj5cbiAqICAgICAgICAgIFBhc3N3b3JkIDxpbnB1dCB0eXBlPSdwYXNzd29yZCcgbmdDb250cm9sPSdwYXNzd29yZCdcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cImNyZWRlbnRpYWxzLnBhc3N3b3JkXCI+XG4gKiAgICAgICAgICA8YnV0dG9uIHR5cGU9J3N1Ym1pdCc+TG9nIGluITwvYnV0dG9uPlxuICogICAgICAgIDwvZm9ybT5cbiAqICAgICAgYH0pXG4gKiBjbGFzcyBMb2dpbkNvbXAge1xuICogIGNyZWRlbnRpYWxzOiB7bG9naW46c3RyaW5nLCBwYXNzd29yZDpzdHJpbmd9O1xuICpcbiAqICBvbkxvZ0luKCk6IHZvaWQge1xuICogICAgLy8gdGhpcy5jcmVkZW50aWFscy5sb2dpbiA9PT0gXCJzb21lIGxvZ2luXCJcbiAqICAgIC8vIHRoaXMuY3JlZGVudGlhbHMucGFzc3dvcmQgPT09IFwic29tZSBwYXNzd29yZFwiXG4gKiAgfVxuICogfVxuICogIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdDb250cm9sXScsXG4gIGJpbmRpbmdzOiBbY29udHJvbE5hbWVCaW5kaW5nXSxcbiAgaW5wdXRzOiBbJ25hbWU6IG5nQ29udHJvbCcsICdtb2RlbDogbmdNb2RlbCddLFxuICBvdXRwdXRzOiBbJ3VwZGF0ZTogbmdNb2RlbENoYW5nZSddLFxuICBleHBvcnRBczogJ25nRm9ybSdcbn0pXG5leHBvcnQgY2xhc3MgTmdDb250cm9sTmFtZSBleHRlbmRzIE5nQ29udHJvbCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3kge1xuICAvKiogQGludGVybmFsICovXG4gIHVwZGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgbW9kZWw6IGFueTtcbiAgdmlld01vZGVsOiBhbnk7XG4gIHByaXZhdGUgX2FkZGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoQEhvc3QoKSBAU2tpcFNlbGYoKSBwcml2YXRlIF9wYXJlbnQ6IENvbnRyb2xDb250YWluZXIsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgQEluamVjdChOR19WQUxJREFUT1JTKSBwcml2YXRlIF92YWxpZGF0b3JzOlxuICAgICAgICAgICAgICAgICAgLyogQXJyYXk8VmFsaWRhdG9yfEZ1bmN0aW9uPiAqLyBhbnlbXSxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBASW5qZWN0KE5HX0FTWU5DX1ZBTElEQVRPUlMpIHByaXZhdGUgX2FzeW5jVmFsaWRhdG9yczpcbiAgICAgICAgICAgICAgICAgIC8qIEFycmF5PFZhbGlkYXRvcnxGdW5jdGlvbj4gKi8gYW55W10sXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgQEluamVjdChOR19WQUxVRV9BQ0NFU1NPUilcbiAgICAgICAgICAgICAgdmFsdWVBY2Nlc3NvcnM6IENvbnRyb2xWYWx1ZUFjY2Vzc29yW10pIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudmFsdWVBY2Nlc3NvciA9IHNlbGVjdFZhbHVlQWNjZXNzb3IodGhpcywgdmFsdWVBY2Nlc3NvcnMpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczoge1trZXk6IHN0cmluZ106IFNpbXBsZUNoYW5nZX0pIHtcbiAgICBpZiAoIXRoaXMuX2FkZGVkKSB7XG4gICAgICB0aGlzLmZvcm1EaXJlY3RpdmUuYWRkQ29udHJvbCh0aGlzKTtcbiAgICAgIHRoaXMuX2FkZGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGlzUHJvcGVydHlVcGRhdGVkKGNoYW5nZXMsIHRoaXMudmlld01vZGVsKSkge1xuICAgICAgdGhpcy52aWV3TW9kZWwgPSB0aGlzLm1vZGVsO1xuICAgICAgdGhpcy5mb3JtRGlyZWN0aXZlLnVwZGF0ZU1vZGVsKHRoaXMsIHRoaXMubW9kZWwpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQgeyB0aGlzLmZvcm1EaXJlY3RpdmUucmVtb3ZlQ29udHJvbCh0aGlzKTsgfVxuXG4gIHZpZXdUb01vZGVsVXBkYXRlKG5ld1ZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdNb2RlbCA9IG5ld1ZhbHVlO1xuICAgIE9ic2VydmFibGVXcmFwcGVyLmNhbGxFbWl0KHRoaXMudXBkYXRlLCBuZXdWYWx1ZSk7XG4gIH1cblxuICBnZXQgcGF0aCgpOiBzdHJpbmdbXSB7IHJldHVybiBjb250cm9sUGF0aCh0aGlzLm5hbWUsIHRoaXMuX3BhcmVudCk7IH1cblxuICBnZXQgZm9ybURpcmVjdGl2ZSgpOiBhbnkgeyByZXR1cm4gdGhpcy5fcGFyZW50LmZvcm1EaXJlY3RpdmU7IH1cblxuICBnZXQgdmFsaWRhdG9yKCk6IFZhbGlkYXRvckZuIHsgcmV0dXJuIGNvbXBvc2VWYWxpZGF0b3JzKHRoaXMuX3ZhbGlkYXRvcnMpOyB9XG5cbiAgZ2V0IGFzeW5jVmFsaWRhdG9yKCk6IEFzeW5jVmFsaWRhdG9yRm4geyByZXR1cm4gY29tcG9zZUFzeW5jVmFsaWRhdG9ycyh0aGlzLl9hc3luY1ZhbGlkYXRvcnMpOyB9XG5cbiAgZ2V0IGNvbnRyb2woKTogQ29udHJvbCB7IHJldHVybiB0aGlzLmZvcm1EaXJlY3RpdmUuZ2V0Q29udHJvbCh0aGlzKTsgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
