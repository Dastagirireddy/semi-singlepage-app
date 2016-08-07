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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZm9ybXMvZGlyZWN0aXZlcy9uZ19mb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWlCTSxxQkFBcUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFBckIscUJBQXFCLEdBQ3ZCLGlCQUFVLENBQUMsSUFBSSxlQUFRLENBQUMsb0NBQWdCLEVBQUUsRUFBQyxXQUFXLEVBQUUsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsTUFBTSxFQUFOLENBQU0sQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXhGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBMERHO1lBVUg7Z0JBQTRCLDBCQUFnQjtnQkFJMUMsZ0JBQXVELFVBQWlCLEVBQ1gsZUFBc0I7b0JBQ2pGLGlCQUFPLENBQUM7b0JBSlYsYUFBUSxHQUFHLElBQUksb0JBQVksRUFBRSxDQUFDO29CQUs1QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksb0JBQVksQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLDBCQUFpQixDQUFDLFVBQVUsQ0FBQyxFQUN2QywrQkFBc0IsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUN4RSxDQUFDO2dCQUVELHNCQUFJLGlDQUFhO3lCQUFqQixjQUE0QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUUxQyxzQkFBSSwyQkFBTzt5QkFBWCxjQUE4QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFFakQsc0JBQUksd0JBQUk7eUJBQVIsY0FBdUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFFbkMsc0JBQUksNEJBQVE7eUJBQVosY0FBbUQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFB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bGFyMi90cy9zcmMvY29tbW9uL2Zvcm1zL2RpcmVjdGl2ZXMvbmdfZm9ybS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFByb21pc2VXcmFwcGVyLFxuICBPYnNlcnZhYmxlV3JhcHBlcixcbiAgRXZlbnRFbWl0dGVyLFxuICBQcm9taXNlQ29tcGxldGVyXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYXN5bmMnO1xuaW1wb3J0IHtTdHJpbmdNYXBXcmFwcGVyLCBMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7aXNQcmVzZW50LCBpc0JsYW5rLCBDT05TVF9FWFBSfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtEaXJlY3RpdmUsIGZvcndhcmRSZWYsIFByb3ZpZGVyLCBPcHRpb25hbCwgSW5qZWN0LCBTZWxmfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7TmdDb250cm9sfSBmcm9tICcuL25nX2NvbnRyb2wnO1xuaW1wb3J0IHtGb3JtfSBmcm9tICcuL2Zvcm1faW50ZXJmYWNlJztcbmltcG9ydCB7TmdDb250cm9sR3JvdXB9IGZyb20gJy4vbmdfY29udHJvbF9ncm91cCc7XG5pbXBvcnQge0NvbnRyb2xDb250YWluZXJ9IGZyb20gJy4vY29udHJvbF9jb250YWluZXInO1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2wsIENvbnRyb2xHcm91cCwgQ29udHJvbH0gZnJvbSAnLi4vbW9kZWwnO1xuaW1wb3J0IHtzZXRVcENvbnRyb2wsIHNldFVwQ29udHJvbEdyb3VwLCBjb21wb3NlVmFsaWRhdG9ycywgY29tcG9zZUFzeW5jVmFsaWRhdG9yc30gZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IHtWYWxpZGF0b3JzLCBOR19WQUxJREFUT1JTLCBOR19BU1lOQ19WQUxJREFUT1JTfSBmcm9tICcuLi92YWxpZGF0b3JzJztcblxuY29uc3QgZm9ybURpcmVjdGl2ZVByb3ZpZGVyID1cbiAgICBDT05TVF9FWFBSKG5ldyBQcm92aWRlcihDb250cm9sQ29udGFpbmVyLCB7dXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdGb3JtKX0pKTtcblxuLyoqXG4gKiBJZiBgTmdGb3JtYCBpcyBib3VuZCBpbiBhIGNvbXBvbmVudCwgYDxmb3JtPmAgZWxlbWVudHMgaW4gdGhhdCBjb21wb25lbnQgd2lsbCBiZVxuICogdXBncmFkZWQgdG8gdXNlIHRoZSBBbmd1bGFyIGZvcm0gc3lzdGVtLlxuICpcbiAqICMjIyBUeXBpY2FsIFVzZVxuICpcbiAqIEluY2x1ZGUgYEZPUk1fRElSRUNUSVZFU2AgaW4gdGhlIGBkaXJlY3RpdmVzYCBzZWN0aW9uIG9mIGEge0BsaW5rIFZpZXd9IGFubm90YXRpb25cbiAqIHRvIHVzZSBgTmdGb3JtYCBhbmQgaXRzIGFzc29jaWF0ZWQgY29udHJvbHMuXG4gKlxuICogIyMjIFN0cnVjdHVyZVxuICpcbiAqIEFuIEFuZ3VsYXIgZm9ybSBpcyBhIGNvbGxlY3Rpb24gb2YgYENvbnRyb2xgcyBpbiBzb21lIGhpZXJhcmNoeS5cbiAqIGBDb250cm9sYHMgY2FuIGJlIGF0IHRoZSB0b3AgbGV2ZWwgb3IgY2FuIGJlIG9yZ2FuaXplZCBpbiBgQ29udHJvbEdyb3VwYHNcbiAqIG9yIGBDb250cm9sQXJyYXlgcy4gVGhpcyBoaWVyYXJjaHkgaXMgcmVmbGVjdGVkIGluIHRoZSBmb3JtJ3MgYHZhbHVlYCwgYVxuICogSlNPTiBvYmplY3QgdGhhdCBtaXJyb3JzIHRoZSBmb3JtIHN0cnVjdHVyZS5cbiAqXG4gKiAjIyMgU3VibWlzc2lvblxuICpcbiAqIFRoZSBgbmdTdWJtaXRgIGV2ZW50IHNpZ25hbHMgd2hlbiB0aGUgdXNlciB0cmlnZ2VycyBhIGZvcm0gc3VibWlzc2lvbi5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvbHRkZ1lqNFAwaVk2NEFSNzFFcEw/cD1wcmV2aWV3KSlcbiAqXG4gKiAgYGBgdHlwZXNjcmlwdFxuICogQENvbXBvbmVudCh7XG4gKiAgIHNlbGVjdG9yOiAnbXktYXBwJyxcbiAqICAgdGVtcGxhdGU6IGBcbiAqICAgICA8ZGl2PlxuICogICAgICAgPHA+U3VibWl0IHRoZSBmb3JtIHRvIHNlZSB0aGUgZGF0YSBvYmplY3QgQW5ndWxhciBidWlsZHM8L3A+XG4gKiAgICAgICA8aDI+TmdGb3JtIGRlbW88L2gyPlxuICogICAgICAgPGZvcm0gI2Y9XCJuZ0Zvcm1cIiAobmdTdWJtaXQpPVwib25TdWJtaXQoZi52YWx1ZSlcIj5cbiAqICAgICAgICAgPGgzPkNvbnRyb2wgZ3JvdXA6IGNyZWRlbnRpYWxzPC9oMz5cbiAqICAgICAgICAgPGRpdiBuZ0NvbnRyb2xHcm91cD1cImNyZWRlbnRpYWxzXCI+XG4gKiAgICAgICAgICAgPHA+TG9naW46IDxpbnB1dCB0eXBlPVwidGV4dFwiIG5nQ29udHJvbD1cImxvZ2luXCI+PC9wPlxuICogICAgICAgICAgIDxwPlBhc3N3b3JkOiA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgbmdDb250cm9sPVwicGFzc3dvcmRcIj48L3A+XG4gKiAgICAgICAgIDwvZGl2PlxuICogICAgICAgICA8aDM+Q29udHJvbCBncm91cDogcGVyc29uPC9oMz5cbiAqICAgICAgICAgPGRpdiBuZ0NvbnRyb2xHcm91cD1cInBlcnNvblwiPlxuICogICAgICAgICAgIDxwPkZpcnN0IG5hbWU6IDxpbnB1dCB0eXBlPVwidGV4dFwiIG5nQ29udHJvbD1cImZpcnN0TmFtZVwiPjwvcD5cbiAqICAgICAgICAgICA8cD5MYXN0IG5hbWU6IDxpbnB1dCB0eXBlPVwidGV4dFwiIG5nQ29udHJvbD1cImxhc3ROYW1lXCI+PC9wPlxuICogICAgICAgICA8L2Rpdj5cbiAqICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+U3VibWl0IEZvcm08L2J1dHRvbj5cbiAqICAgICAgIDxwPkZvcm0gZGF0YSBzdWJtaXR0ZWQ6PC9wPlxuICogICAgICAgPC9mb3JtPlxuICogICAgICAgPHByZT57e2RhdGF9fTwvcHJlPlxuICogICAgIDwvZGl2PlxuICogYCxcbiAqICAgZGlyZWN0aXZlczogW0NPUkVfRElSRUNUSVZFUywgRk9STV9ESVJFQ1RJVkVTXVxuICogfSlcbiAqIGV4cG9ydCBjbGFzcyBBcHAge1xuICogICBjb25zdHJ1Y3RvcigpIHt9XG4gKlxuICogICBkYXRhOiBzdHJpbmc7XG4gKlxuICogICBvblN1Ym1pdChkYXRhKSB7XG4gKiAgICAgdGhpcy5kYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMik7XG4gKiAgIH1cbiAqIH1cbiAqICBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnZm9ybTpub3QoW25nTm9Gb3JtXSk6bm90KFtuZ0Zvcm1Nb2RlbF0pLG5nRm9ybSxbbmdGb3JtXScsXG4gIGJpbmRpbmdzOiBbZm9ybURpcmVjdGl2ZVByb3ZpZGVyXSxcbiAgaG9zdDoge1xuICAgICcoc3VibWl0KSc6ICdvblN1Ym1pdCgpJyxcbiAgfSxcbiAgb3V0cHV0czogWyduZ1N1Ym1pdCddLFxuICBleHBvcnRBczogJ25nRm9ybSdcbn0pXG5leHBvcnQgY2xhc3MgTmdGb3JtIGV4dGVuZHMgQ29udHJvbENvbnRhaW5lciBpbXBsZW1lbnRzIEZvcm0ge1xuICBmb3JtOiBDb250cm9sR3JvdXA7XG4gIG5nU3VibWl0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTZWxmKCkgQEluamVjdChOR19WQUxJREFUT1JTKSB2YWxpZGF0b3JzOiBhbnlbXSxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBASW5qZWN0KE5HX0FTWU5DX1ZBTElEQVRPUlMpIGFzeW5jVmFsaWRhdG9yczogYW55W10pIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZm9ybSA9IG5ldyBDb250cm9sR3JvdXAoe30sIG51bGwsIGNvbXBvc2VWYWxpZGF0b3JzKHZhbGlkYXRvcnMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9zZUFzeW5jVmFsaWRhdG9ycyhhc3luY1ZhbGlkYXRvcnMpKTtcbiAgfVxuXG4gIGdldCBmb3JtRGlyZWN0aXZlKCk6IEZvcm0geyByZXR1cm4gdGhpczsgfVxuXG4gIGdldCBjb250cm9sKCk6IENvbnRyb2xHcm91cCB7IHJldHVybiB0aGlzLmZvcm07IH1cblxuICBnZXQgcGF0aCgpOiBzdHJpbmdbXSB7IHJldHVybiBbXTsgfVxuXG4gIGdldCBjb250cm9scygpOiB7W2tleTogc3RyaW5nXTogQWJzdHJhY3RDb250cm9sfSB7IHJldHVybiB0aGlzLmZvcm0uY29udHJvbHM7IH1cblxuICBhZGRDb250cm9sKGRpcjogTmdDb250cm9sKTogdm9pZCB7XG4gICAgUHJvbWlzZVdyYXBwZXIuc2NoZWR1bGVNaWNyb3Rhc2soKCkgPT4ge1xuICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuX2ZpbmRDb250YWluZXIoZGlyLnBhdGgpO1xuICAgICAgdmFyIGN0cmwgPSBuZXcgQ29udHJvbCgpO1xuICAgICAgc2V0VXBDb250cm9sKGN0cmwsIGRpcik7XG4gICAgICBjb250YWluZXIuYWRkQ29udHJvbChkaXIubmFtZSwgY3RybCk7XG4gICAgICBjdHJsLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoe2VtaXRFdmVudDogZmFsc2V9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldENvbnRyb2woZGlyOiBOZ0NvbnRyb2wpOiBDb250cm9sIHsgcmV0dXJuIDxDb250cm9sPnRoaXMuZm9ybS5maW5kKGRpci5wYXRoKTsgfVxuXG4gIHJlbW92ZUNvbnRyb2woZGlyOiBOZ0NvbnRyb2wpOiB2b2lkIHtcbiAgICBQcm9taXNlV3JhcHBlci5zY2hlZHVsZU1pY3JvdGFzaygoKSA9PiB7XG4gICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5fZmluZENvbnRhaW5lcihkaXIucGF0aCk7XG4gICAgICBpZiAoaXNQcmVzZW50KGNvbnRhaW5lcikpIHtcbiAgICAgICAgY29udGFpbmVyLnJlbW92ZUNvbnRyb2woZGlyLm5hbWUpO1xuICAgICAgICBjb250YWluZXIudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSh7ZW1pdEV2ZW50OiBmYWxzZX0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYWRkQ29udHJvbEdyb3VwKGRpcjogTmdDb250cm9sR3JvdXApOiB2b2lkIHtcbiAgICBQcm9taXNlV3JhcHBlci5zY2hlZHVsZU1pY3JvdGFzaygoKSA9PiB7XG4gICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5fZmluZENvbnRhaW5lcihkaXIucGF0aCk7XG4gICAgICB2YXIgZ3JvdXAgPSBuZXcgQ29udHJvbEdyb3VwKHt9KTtcbiAgICAgIHNldFVwQ29udHJvbEdyb3VwKGdyb3VwLCBkaXIpO1xuICAgICAgY29udGFpbmVyLmFkZENvbnRyb2woZGlyLm5hbWUsIGdyb3VwKTtcbiAgICAgIGdyb3VwLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoe2VtaXRFdmVudDogZmFsc2V9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZUNvbnRyb2xHcm91cChkaXI6IE5nQ29udHJvbEdyb3VwKTogdm9pZCB7XG4gICAgUHJvbWlzZVdyYXBwZXIuc2NoZWR1bGVNaWNyb3Rhc2soKCkgPT4ge1xuICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuX2ZpbmRDb250YWluZXIoZGlyLnBhdGgpO1xuICAgICAgaWYgKGlzUHJlc2VudChjb250YWluZXIpKSB7XG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmVDb250cm9sKGRpci5uYW1lKTtcbiAgICAgICAgY29udGFpbmVyLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoe2VtaXRFdmVudDogZmFsc2V9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldENvbnRyb2xHcm91cChkaXI6IE5nQ29udHJvbEdyb3VwKTogQ29udHJvbEdyb3VwIHtcbiAgICByZXR1cm4gPENvbnRyb2xHcm91cD50aGlzLmZvcm0uZmluZChkaXIucGF0aCk7XG4gIH1cblxuICB1cGRhdGVNb2RlbChkaXI6IE5nQ29udHJvbCwgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgIFByb21pc2VXcmFwcGVyLnNjaGVkdWxlTWljcm90YXNrKCgpID0+IHtcbiAgICAgIHZhciBjdHJsID0gPENvbnRyb2w+dGhpcy5mb3JtLmZpbmQoZGlyLnBhdGgpO1xuICAgICAgY3RybC51cGRhdGVWYWx1ZSh2YWx1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBvblN1Ym1pdCgpOiBib29sZWFuIHtcbiAgICBPYnNlcnZhYmxlV3JhcHBlci5jYWxsRW1pdCh0aGlzLm5nU3VibWl0LCBudWxsKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9maW5kQ29udGFpbmVyKHBhdGg6IHN0cmluZ1tdKTogQ29udHJvbEdyb3VwIHtcbiAgICBwYXRoLnBvcCgpO1xuICAgIHJldHVybiBMaXN0V3JhcHBlci5pc0VtcHR5KHBhdGgpID8gdGhpcy5mb3JtIDogPENvbnRyb2xHcm91cD50aGlzLmZvcm0uZmluZChwYXRoKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
