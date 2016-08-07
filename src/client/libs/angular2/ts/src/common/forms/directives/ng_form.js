System.register(['angular2/src/facade/async', 'angular2/src/facade/collection', 'angular2/src/facade/lang', 'angular2/core', './control_container', '../model', './shared', '../validators'], function(exports_1, context_1) {
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
    var async_1, collection_1, lang_1, core_1, control_container_1, model_1, shared_1, validators_1;
    var formDirectiveProvider, NgForm;
    return {
        setters:[
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (control_container_1_1) {
                control_container_1 = control_container_1_1;
            },
            function (model_1_1) {
                model_1 = model_1_1;
            },
            function (shared_1_1) {
                shared_1 = shared_1_1;
            },
            function (validators_1_1) {
                validators_1 = validators_1_1;
            }],
        execute: function() {
            formDirectiveProvider = lang_1.CONST_EXPR(new core_1.Provider(control_container_1.ControlContainer, { useExisting: core_1.forwardRef(function () { return NgForm; }) }));
            /**
             * If `NgForm` is bound in a component, `<form>` elements in that component will be
             * upgraded to use the Angular form system.
             *
             * ### Typical Use
             *
             * Include `FORM_DIRECTIVES` in the `directives` section of a {@link View} annotation
             * to use `NgForm` and its associated controls.
             *
             * ### Structure
             *
             * An Angular form is a collection of `Control`s in some hierarchy.
             * `Control`s can be at the top level or can be organized in `ControlGroup`s
             * or `ControlArray`s. This hierarchy is reflected in the form's `value`, a
             * JSON object that mirrors the form structure.
             *
             * ### Submission
             *
             * The `ngSubmit` event signals when the user triggers a form submission.
             *
             * ### Example ([live demo](http://plnkr.co/edit/ltdgYj4P0iY64AR71EpL?p=preview))
             *
             *  ```typescript
             * @Component({
             *   selector: 'my-app',
             *   template: `
             *     <div>
             *       <p>Submit the form to see the data object Angular builds</p>
             *       <h2>NgForm demo</h2>
             *       <form #f="ngForm" (ngSubmit)="onSubmit(f.value)">
             *         <h3>Control group: credentials</h3>
             *         <div ngControlGroup="credentials">
             *           <p>Login: <input type="text" ngControl="login"></p>
             *           <p>Password: <input type="password" ngControl="password"></p>
             *         </div>
             *         <h3>Control group: person</h3>
             *         <div ngControlGroup="person">
             *           <p>First name: <input type="text" ngControl="firstName"></p>
             *           <p>Last name: <input type="text" ngControl="lastName"></p>
             *         </div>
             *         <button type="submit">Submit Form</button>
             *       <p>Form data submitted:</p>
             *       </form>
             *       <pre>{{data}}</pre>
             *     </div>
             * `,
             *   directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
             * })
             * export class App {
             *   constructor() {}
             *
             *   data: string;
             *
             *   onSubmit(data) {
             *     this.data = JSON.stringify(data, null, 2);
             *   }
             * }
             *  ```
             */
            NgForm = (function (_super) {
                __extends(NgForm, _super);
                function NgForm(validators, asyncValidators) {
                    _super.call(this);
                    this.ngSubmit = new async_1.EventEmitter();
                    this.form = new model_1.ControlGroup({}, null, shared_1.composeValidators(validators), shared_1.composeAsyncValidators(asyncValidators));
                }
                Object.defineProperty(NgForm.prototype, "formDirective", {
                    get: function () { return this; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgForm.prototype, "control", {
                    get: function () { return this.form; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgForm.prototype, "path", {
                    get: function () { return []; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgForm.prototype, "controls", {
                    get: function () { return this.form.controls; },
                    enumerable: true,
                    configurable: true
                });
                NgForm.prototype.addControl = function (dir) {
                    var _this = this;
                    async_1.PromiseWrapper.scheduleMicrotask(function () {
                        var container = _this._findContainer(dir.path);
                        var ctrl = new model_1.Control();
                        shared_1.setUpControl(ctrl, dir);
                        container.addControl(dir.name, ctrl);
                        ctrl.updateValueAndValidity({ emitEvent: false });
                    });
                };
                NgForm.prototype.getControl = function (dir) { return this.form.find(dir.path); };
                NgForm.prototype.removeControl = function (dir) {
                    var _this = this;
                    async_1.PromiseWrapper.scheduleMicrotask(function () {
                        var container = _this._findContainer(dir.path);
                        if (lang_1.isPresent(container)) {
                            container.removeControl(dir.name);
                            container.updateValueAndValidity({ emitEvent: false });
                        }
                    });
                };
                NgForm.prototype.addControlGroup = function (dir) {
                    var _this = this;
                    async_1.PromiseWrapper.scheduleMicrotask(function () {
                        var container = _this._findContainer(dir.path);
                        var group = new model_1.ControlGroup({});
                        shared_1.setUpControlGroup(group, dir);
                        container.addControl(dir.name, group);
                        group.updateValueAndValidity({ emitEvent: false });
                    });
                };
                NgForm.prototype.removeControlGroup = function (dir) {
                    var _this = this;
                    async_1.PromiseWrapper.scheduleMicrotask(function () {
                        var container = _this._findContainer(dir.path);
                        if (lang_1.isPresent(container)) {
                            container.removeControl(dir.name);
                            container.updateValueAndValidity({ emitEvent: false });
                        }
                    });
                };
                NgForm.prototype.getControlGroup = function (dir) {
                    return this.form.find(dir.path);
                };
                NgForm.prototype.updateModel = function (dir, value) {
                    var _this = this;
                    async_1.PromiseWrapper.scheduleMicrotask(function () {
                        var ctrl = _this.form.find(dir.path);
                        ctrl.updateValue(value);
                    });
                };
                NgForm.prototype.onSubmit = function () {
                    async_1.ObservableWrapper.callEmit(this.ngSubmit, null);
                    return false;
                };
                /** @internal */
                NgForm.prototype._findContainer = function (path) {
                    path.pop();
                    return collection_1.ListWrapper.isEmpty(path) ? this.form : this.form.find(path);
                };
                NgForm = __decorate([
                    core_1.Directive({
                        selector: 'form:not([ngNoForm]):not([ngFormModel]),ngForm,[ngForm]',
                        bindings: [formDirectiveProvider],
                        host: {
                            '(submit)': 'onSubmit()',
                        },
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
                ], NgForm);
                return NgForm;
            }(control_container_1.ControlContainer));
            exports_1("NgForm", NgForm);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL25nX2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBaUJNLHFCQUFxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUFyQixxQkFBcUIsR0FDdkIsaUJBQVUsQ0FBQyxJQUFJLGVBQVEsQ0FBQyxvQ0FBZ0IsRUFBRSxFQUFDLFdBQVcsRUFBRSxpQkFBVSxDQUFDLGNBQU0sT0FBQSxNQUFNLEVBQU4sQ0FBTSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFFeEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUEwREc7WUFVSDtnQkFBNEIsMEJBQWdCO2dCQUkxQyxnQkFBdUQsVUFBaUIsRUFDWCxlQUFzQjtvQkFDakYsaUJBQU8sQ0FBQztvQkFKVixhQUFRLEdBQUcsSUFBSSxvQkFBWSxFQUFFLENBQUM7b0JBSzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxvQkFBWSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsMEJBQWlCLENBQUMsVUFBVSxDQUFDLEVBQ3ZDLCtCQUFzQixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hFLENBQUM7Z0JBRUQsc0JBQUksaUNBQWE7eUJBQWpCLGNBQTRCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBRTFDLHNCQUFJLDJCQUFPO3lCQUFYLGNBQThCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUVqRCxzQkFBSSx3QkFBSTt5QkFBUixjQUF1QixNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUVuQyxzQkFBSSw0QkFBUTt5QkFBWixjQUFtRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FB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ZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL25nX2Zvcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBQcm9taXNlV3JhcHBlcixcbiAgT2JzZXJ2YWJsZVdyYXBwZXIsXG4gIEV2ZW50RW1pdHRlcixcbiAgUHJvbWlzZUNvbXBsZXRlclxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jJztcbmltcG9ydCB7U3RyaW5nTWFwV3JhcHBlciwgTGlzdFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge2lzUHJlc2VudCwgaXNCbGFuaywgQ09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7RGlyZWN0aXZlLCBmb3J3YXJkUmVmLCBQcm92aWRlciwgT3B0aW9uYWwsIEluamVjdCwgU2VsZn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge05nQ29udHJvbH0gZnJvbSAnLi9uZ19jb250cm9sJztcbmltcG9ydCB7Rm9ybX0gZnJvbSAnLi9mb3JtX2ludGVyZmFjZSc7XG5pbXBvcnQge05nQ29udHJvbEdyb3VwfSBmcm9tICcuL25nX2NvbnRyb2xfZ3JvdXAnO1xuaW1wb3J0IHtDb250cm9sQ29udGFpbmVyfSBmcm9tICcuL2NvbnRyb2xfY29udGFpbmVyJztcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sLCBDb250cm9sR3JvdXAsIENvbnRyb2x9IGZyb20gJy4uL21vZGVsJztcbmltcG9ydCB7c2V0VXBDb250cm9sLCBzZXRVcENvbnRyb2xHcm91cCwgY29tcG9zZVZhbGlkYXRvcnMsIGNvbXBvc2VBc3luY1ZhbGlkYXRvcnN9IGZyb20gJy4vc2hhcmVkJztcbmltcG9ydCB7VmFsaWRhdG9ycywgTkdfVkFMSURBVE9SUywgTkdfQVNZTkNfVkFMSURBVE9SU30gZnJvbSAnLi4vdmFsaWRhdG9ycyc7XG5cbmNvbnN0IGZvcm1EaXJlY3RpdmVQcm92aWRlciA9XG4gICAgQ09OU1RfRVhQUihuZXcgUHJvdmlkZXIoQ29udHJvbENvbnRhaW5lciwge3VzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nRm9ybSl9KSk7XG5cbi8qKlxuICogSWYgYE5nRm9ybWAgaXMgYm91bmQgaW4gYSBjb21wb25lbnQsIGA8Zm9ybT5gIGVsZW1lbnRzIGluIHRoYXQgY29tcG9uZW50IHdpbGwgYmVcbiAqIHVwZ3JhZGVkIHRvIHVzZSB0aGUgQW5ndWxhciBmb3JtIHN5c3RlbS5cbiAqXG4gKiAjIyMgVHlwaWNhbCBVc2VcbiAqXG4gKiBJbmNsdWRlIGBGT1JNX0RJUkVDVElWRVNgIGluIHRoZSBgZGlyZWN0aXZlc2Agc2VjdGlvbiBvZiBhIHtAbGluayBWaWV3fSBhbm5vdGF0aW9uXG4gKiB0byB1c2UgYE5nRm9ybWAgYW5kIGl0cyBhc3NvY2lhdGVkIGNvbnRyb2xzLlxuICpcbiAqICMjIyBTdHJ1Y3R1cmVcbiAqXG4gKiBBbiBBbmd1bGFyIGZvcm0gaXMgYSBjb2xsZWN0aW9uIG9mIGBDb250cm9sYHMgaW4gc29tZSBoaWVyYXJjaHkuXG4gKiBgQ29udHJvbGBzIGNhbiBiZSBhdCB0aGUgdG9wIGxldmVsIG9yIGNhbiBiZSBvcmdhbml6ZWQgaW4gYENvbnRyb2xHcm91cGBzXG4gKiBvciBgQ29udHJvbEFycmF5YHMuIFRoaXMgaGllcmFyY2h5IGlzIHJlZmxlY3RlZCBpbiB0aGUgZm9ybSdzIGB2YWx1ZWAsIGFcbiAqIEpTT04gb2JqZWN0IHRoYXQgbWlycm9ycyB0aGUgZm9ybSBzdHJ1Y3R1cmUuXG4gKlxuICogIyMjIFN1Ym1pc3Npb25cbiAqXG4gKiBUaGUgYG5nU3VibWl0YCBldmVudCBzaWduYWxzIHdoZW4gdGhlIHVzZXIgdHJpZ2dlcnMgYSBmb3JtIHN1Ym1pc3Npb24uXG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L2x0ZGdZajRQMGlZNjRBUjcxRXBMP3A9cHJldmlldykpXG4gKlxuICogIGBgYHR5cGVzY3JpcHRcbiAqIEBDb21wb25lbnQoe1xuICogICBzZWxlY3RvcjogJ215LWFwcCcsXG4gKiAgIHRlbXBsYXRlOiBgXG4gKiAgICAgPGRpdj5cbiAqICAgICAgIDxwPlN1Ym1pdCB0aGUgZm9ybSB0byBzZWUgdGhlIGRhdGEgb2JqZWN0IEFuZ3VsYXIgYnVpbGRzPC9wPlxuICogICAgICAgPGgyPk5nRm9ybSBkZW1vPC9oMj5cbiAqICAgICAgIDxmb3JtICNmPVwibmdGb3JtXCIgKG5nU3VibWl0KT1cIm9uU3VibWl0KGYudmFsdWUpXCI+XG4gKiAgICAgICAgIDxoMz5Db250cm9sIGdyb3VwOiBjcmVkZW50aWFsczwvaDM+XG4gKiAgICAgICAgIDxkaXYgbmdDb250cm9sR3JvdXA9XCJjcmVkZW50aWFsc1wiPlxuICogICAgICAgICAgIDxwPkxvZ2luOiA8aW5wdXQgdHlwZT1cInRleHRcIiBuZ0NvbnRyb2w9XCJsb2dpblwiPjwvcD5cbiAqICAgICAgICAgICA8cD5QYXNzd29yZDogPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIG5nQ29udHJvbD1cInBhc3N3b3JkXCI+PC9wPlxuICogICAgICAgICA8L2Rpdj5cbiAqICAgICAgICAgPGgzPkNvbnRyb2wgZ3JvdXA6IHBlcnNvbjwvaDM+XG4gKiAgICAgICAgIDxkaXYgbmdDb250cm9sR3JvdXA9XCJwZXJzb25cIj5cbiAqICAgICAgICAgICA8cD5GaXJzdCBuYW1lOiA8aW5wdXQgdHlwZT1cInRleHRcIiBuZ0NvbnRyb2w9XCJmaXJzdE5hbWVcIj48L3A+XG4gKiAgICAgICAgICAgPHA+TGFzdCBuYW1lOiA8aW5wdXQgdHlwZT1cInRleHRcIiBuZ0NvbnRyb2w9XCJsYXN0TmFtZVwiPjwvcD5cbiAqICAgICAgICAgPC9kaXY+XG4gKiAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlN1Ym1pdCBGb3JtPC9idXR0b24+XG4gKiAgICAgICA8cD5Gb3JtIGRhdGEgc3VibWl0dGVkOjwvcD5cbiAqICAgICAgIDwvZm9ybT5cbiAqICAgICAgIDxwcmU+e3tkYXRhfX08L3ByZT5cbiAqICAgICA8L2Rpdj5cbiAqIGAsXG4gKiAgIGRpcmVjdGl2ZXM6IFtDT1JFX0RJUkVDVElWRVMsIEZPUk1fRElSRUNUSVZFU11cbiAqIH0pXG4gKiBleHBvcnQgY2xhc3MgQXBwIHtcbiAqICAgY29uc3RydWN0b3IoKSB7fVxuICpcbiAqICAgZGF0YTogc3RyaW5nO1xuICpcbiAqICAgb25TdWJtaXQoZGF0YSkge1xuICogICAgIHRoaXMuZGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpO1xuICogICB9XG4gKiB9XG4gKiAgYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2Zvcm06bm90KFtuZ05vRm9ybV0pOm5vdChbbmdGb3JtTW9kZWxdKSxuZ0Zvcm0sW25nRm9ybV0nLFxuICBiaW5kaW5nczogW2Zvcm1EaXJlY3RpdmVQcm92aWRlcl0sXG4gIGhvc3Q6IHtcbiAgICAnKHN1Ym1pdCknOiAnb25TdWJtaXQoKScsXG4gIH0sXG4gIG91dHB1dHM6IFsnbmdTdWJtaXQnXSxcbiAgZXhwb3J0QXM6ICduZ0Zvcm0nXG59KVxuZXhwb3J0IGNsYXNzIE5nRm9ybSBleHRlbmRzIENvbnRyb2xDb250YWluZXIgaW1wbGVtZW50cyBGb3JtIHtcbiAgZm9ybTogQ29udHJvbEdyb3VwO1xuICBuZ1N1Ym1pdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2VsZigpIEBJbmplY3QoTkdfVkFMSURBVE9SUykgdmFsaWRhdG9yczogYW55W10sXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgQEluamVjdChOR19BU1lOQ19WQUxJREFUT1JTKSBhc3luY1ZhbGlkYXRvcnM6IGFueVtdKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmZvcm0gPSBuZXcgQ29udHJvbEdyb3VwKHt9LCBudWxsLCBjb21wb3NlVmFsaWRhdG9ycyh2YWxpZGF0b3JzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvc2VBc3luY1ZhbGlkYXRvcnMoYXN5bmNWYWxpZGF0b3JzKSk7XG4gIH1cblxuICBnZXQgZm9ybURpcmVjdGl2ZSgpOiBGb3JtIHsgcmV0dXJuIHRoaXM7IH1cblxuICBnZXQgY29udHJvbCgpOiBDb250cm9sR3JvdXAgeyByZXR1cm4gdGhpcy5mb3JtOyB9XG5cbiAgZ2V0IHBhdGgoKTogc3RyaW5nW10geyByZXR1cm4gW107IH1cblxuICBnZXQgY29udHJvbHMoKToge1trZXk6IHN0cmluZ106IEFic3RyYWN0Q29udHJvbH0geyByZXR1cm4gdGhpcy5mb3JtLmNvbnRyb2xzOyB9XG5cbiAgYWRkQ29udHJvbChkaXI6IE5nQ29udHJvbCk6IHZvaWQge1xuICAgIFByb21pc2VXcmFwcGVyLnNjaGVkdWxlTWljcm90YXNrKCgpID0+IHtcbiAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLl9maW5kQ29udGFpbmVyKGRpci5wYXRoKTtcbiAgICAgIHZhciBjdHJsID0gbmV3IENvbnRyb2woKTtcbiAgICAgIHNldFVwQ29udHJvbChjdHJsLCBkaXIpO1xuICAgICAgY29udGFpbmVyLmFkZENvbnRyb2woZGlyLm5hbWUsIGN0cmwpO1xuICAgICAgY3RybC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHtlbWl0RXZlbnQ6IGZhbHNlfSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRDb250cm9sKGRpcjogTmdDb250cm9sKTogQ29udHJvbCB7IHJldHVybiA8Q29udHJvbD50aGlzLmZvcm0uZmluZChkaXIucGF0aCk7IH1cblxuICByZW1vdmVDb250cm9sKGRpcjogTmdDb250cm9sKTogdm9pZCB7XG4gICAgUHJvbWlzZVdyYXBwZXIuc2NoZWR1bGVNaWNyb3Rhc2soKCkgPT4ge1xuICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuX2ZpbmRDb250YWluZXIoZGlyLnBhdGgpO1xuICAgICAgaWYgKGlzUHJlc2VudChjb250YWluZXIpKSB7XG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmVDb250cm9sKGRpci5uYW1lKTtcbiAgICAgICAgY29udGFpbmVyLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoe2VtaXRFdmVudDogZmFsc2V9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGFkZENvbnRyb2xHcm91cChkaXI6IE5nQ29udHJvbEdyb3VwKTogdm9pZCB7XG4gICAgUHJvbWlzZVdyYXBwZXIuc2NoZWR1bGVNaWNyb3Rhc2soKCkgPT4ge1xuICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuX2ZpbmRDb250YWluZXIoZGlyLnBhdGgpO1xuICAgICAgdmFyIGdyb3VwID0gbmV3IENvbnRyb2xHcm91cCh7fSk7XG4gICAgICBzZXRVcENvbnRyb2xHcm91cChncm91cCwgZGlyKTtcbiAgICAgIGNvbnRhaW5lci5hZGRDb250cm9sKGRpci5uYW1lLCBncm91cCk7XG4gICAgICBncm91cC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHtlbWl0RXZlbnQ6IGZhbHNlfSk7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVDb250cm9sR3JvdXAoZGlyOiBOZ0NvbnRyb2xHcm91cCk6IHZvaWQge1xuICAgIFByb21pc2VXcmFwcGVyLnNjaGVkdWxlTWljcm90YXNrKCgpID0+IHtcbiAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLl9maW5kQ29udGFpbmVyKGRpci5wYXRoKTtcbiAgICAgIGlmIChpc1ByZXNlbnQoY29udGFpbmVyKSkge1xuICAgICAgICBjb250YWluZXIucmVtb3ZlQ29udHJvbChkaXIubmFtZSk7XG4gICAgICAgIGNvbnRhaW5lci51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHtlbWl0RXZlbnQ6IGZhbHNlfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXRDb250cm9sR3JvdXAoZGlyOiBOZ0NvbnRyb2xHcm91cCk6IENvbnRyb2xHcm91cCB7XG4gICAgcmV0dXJuIDxDb250cm9sR3JvdXA+dGhpcy5mb3JtLmZpbmQoZGlyLnBhdGgpO1xuICB9XG5cbiAgdXBkYXRlTW9kZWwoZGlyOiBOZ0NvbnRyb2wsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBQcm9taXNlV3JhcHBlci5zY2hlZHVsZU1pY3JvdGFzaygoKSA9PiB7XG4gICAgICB2YXIgY3RybCA9IDxDb250cm9sPnRoaXMuZm9ybS5maW5kKGRpci5wYXRoKTtcbiAgICAgIGN0cmwudXBkYXRlVmFsdWUodmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgb25TdWJtaXQoKTogYm9vbGVhbiB7XG4gICAgT2JzZXJ2YWJsZVdyYXBwZXIuY2FsbEVtaXQodGhpcy5uZ1N1Ym1pdCwgbnVsbCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZmluZENvbnRhaW5lcihwYXRoOiBzdHJpbmdbXSk6IENvbnRyb2xHcm91cCB7XG4gICAgcGF0aC5wb3AoKTtcbiAgICByZXR1cm4gTGlzdFdyYXBwZXIuaXNFbXB0eShwYXRoKSA/IHRoaXMuZm9ybSA6IDxDb250cm9sR3JvdXA+dGhpcy5mb3JtLmZpbmQocGF0aCk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
