System.register(['angular2/core', 'angular2/src/facade/collection', 'angular2/src/facade/lang', './model'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, collection_1, lang_1, modelModule;
    var FormBuilder;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (modelModule_1) {
                modelModule = modelModule_1;
            }],
        execute: function() {
            /**
             * Creates a form object from a user-specified configuration.
             *
             * ### Example ([live demo](http://plnkr.co/edit/ENgZo8EuIECZNensZCVr?p=preview))
             *
             * ```typescript
             * @Component({
             *   selector: 'my-app',
             *   viewBindings: [FORM_BINDINGS]
             *   template: `
             *     <form [ngFormModel]="loginForm">
             *       <p>Login <input ngControl="login"></p>
             *       <div ngControlGroup="passwordRetry">
             *         <p>Password <input type="password" ngControl="password"></p>
             *         <p>Confirm password <input type="password" ngControl="passwordConfirmation"></p>
             *       </div>
             *     </form>
             *     <h3>Form value:</h3>
             *     <pre>{{value}}</pre>
             *   `,
             *   directives: [FORM_DIRECTIVES]
             * })
             * export class App {
             *   loginForm: ControlGroup;
             *
             *   constructor(builder: FormBuilder) {
             *     this.loginForm = builder.group({
             *       login: ["", Validators.required],
             *       passwordRetry: builder.group({
             *         password: ["", Validators.required],
             *         passwordConfirmation: ["", Validators.required, asyncValidator]
             *       })
             *     });
             *   }
             *
             *   get value(): string {
             *     return JSON.stringify(this.loginForm.value, null, 2);
             *   }
             * }
             * ```
             */
            FormBuilder = (function () {
                function FormBuilder() {
                }
                /**
                 * Construct a new {@link ControlGroup} with the given map of configuration.
                 * Valid keys for the `extra` parameter map are `optionals` and `validator`.
                 *
                 * See the {@link ControlGroup} constructor for more details.
                 */
                FormBuilder.prototype.group = function (controlsConfig, extra) {
                    if (extra === void 0) { extra = null; }
                    var controls = this._reduceControls(controlsConfig);
                    var optionals = (lang_1.isPresent(extra) ? collection_1.StringMapWrapper.get(extra, "optionals") : null);
                    var validator = lang_1.isPresent(extra) ? collection_1.StringMapWrapper.get(extra, "validator") : null;
                    var asyncValidator = lang_1.isPresent(extra) ? collection_1.StringMapWrapper.get(extra, "asyncValidator") : null;
                    return new modelModule.ControlGroup(controls, optionals, validator, asyncValidator);
                };
                /**
                 * Construct a new {@link Control} with the given `value`,`validator`, and `asyncValidator`.
                 */
                FormBuilder.prototype.control = function (value, validator, asyncValidator) {
                    if (validator === void 0) { validator = null; }
                    if (asyncValidator === void 0) { asyncValidator = null; }
                    return new modelModule.Control(value, validator, asyncValidator);
                };
                /**
                 * Construct an array of {@link Control}s from the given `controlsConfig` array of
                 * configuration, with the given optional `validator` and `asyncValidator`.
                 */
                FormBuilder.prototype.array = function (controlsConfig, validator, asyncValidator) {
                    var _this = this;
                    if (validator === void 0) { validator = null; }
                    if (asyncValidator === void 0) { asyncValidator = null; }
                    var controls = controlsConfig.map(function (c) { return _this._createControl(c); });
                    return new modelModule.ControlArray(controls, validator, asyncValidator);
                };
                /** @internal */
                FormBuilder.prototype._reduceControls = function (controlsConfig) {
                    var _this = this;
                    var controls = {};
                    collection_1.StringMapWrapper.forEach(controlsConfig, function (controlConfig, controlName) {
                        controls[controlName] = _this._createControl(controlConfig);
                    });
                    return controls;
                };
                /** @internal */
                FormBuilder.prototype._createControl = function (controlConfig) {
                    if (controlConfig instanceof modelModule.Control ||
                        controlConfig instanceof modelModule.ControlGroup ||
                        controlConfig instanceof modelModule.ControlArray) {
                        return controlConfig;
                    }
                    else if (lang_1.isArray(controlConfig)) {
                        var value = controlConfig[0];
                        var validator = controlConfig.length > 1 ? controlConfig[1] : null;
                        var asyncValidator = controlConfig.length > 2 ? controlConfig[2] : null;
                        return this.control(value, validator, asyncValidator);
                    }
                    else {
                        return this.control(controlConfig);
                    }
                };
                FormBuilder = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], FormBuilder);
                return FormBuilder;
            }());
            exports_1("FormBuilder", FormBuilder);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9mb3JtX2J1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQXdDRztZQUVIO2dCQUFBO2dCQThEQSxDQUFDO2dCQTdEQzs7Ozs7bUJBS0c7Z0JBQ0gsMkJBQUssR0FBTCxVQUFNLGNBQW9DLEVBQ3BDLEtBQWtDO29CQUFsQyxxQkFBa0MsR0FBbEMsWUFBa0M7b0JBQ3RDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQ3BELElBQUksU0FBUyxHQUE2QixDQUN0QyxnQkFBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLDZCQUFnQixDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7b0JBQ3hFLElBQUksU0FBUyxHQUFnQixnQkFBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLDZCQUFnQixDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDO29CQUNoRyxJQUFJLGNBQWMsR0FDZCxnQkFBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLDZCQUFnQixDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsR0FBRyxJQUFJLENBQUM7b0JBQzVFLE1BQU0sQ0FBQyxJQUFJLFdBQVcsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQ3RGLENBQUM7Z0JBQ0Q7O21CQUVHO2dCQUNILDZCQUFPLEdBQVAsVUFBUSxLQUFhLEVBQUUsU0FBNkIsRUFDNUMsY0FBdUM7b0JBRHhCLHlCQUE2QixHQUE3QixnQkFBNkI7b0JBQzVDLDhCQUF1QyxHQUF2QyxxQkFBdUM7b0JBQzdDLE1BQU0sQ0FBQyxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztnQkFDbkUsQ0FBQztnQkFFRDs7O21CQUdHO2dCQUNILDJCQUFLLEdBQUwsVUFBTSxjQUFxQixFQUFFLFNBQTZCLEVBQ3BELGNBQXVDO29CQUQ3QyxpQkFJQztvQkFKNEIseUJBQTZCLEdBQTdCLGdCQUE2QjtvQkFDcEQsOEJBQXVDLEdBQXZDLHFCQUF1QztvQkFDM0MsSUFBSSxRQUFRLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQXRCLENBQXNCLENBQUMsQ0FBQztvQkFDL0QsTUFBTSxDQUFDLElBQUksV0FBVyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUMzRSxDQUFDO2dCQUVELGdCQUFnQjtnQkFDaEIscUNBQWUsR0FBZixVQUFnQixjQUN5QjtvQkFEekMsaUJBT0M7b0JBTEMsSUFBSSxRQUFRLEdBQWlELEVBQUUsQ0FBQztvQkFDaEUsNkJBQWdCLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxVQUFDLGFBQWtCLEVBQUUsV0FBbUI7d0JBQy9FLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUM3RCxDQUFDLENBQUMsQ0FBQztvQkFDSCxNQUFNLENBQUMsUUFBUSxDQUFDO2dCQUNsQixDQUFDO2dCQUVELGdCQUFnQjtnQkFDaEIsb0NBQWMsR0FBZCxVQUFlLGFBQWtCO29CQUMvQixFQUFFLENBQUMsQ0FBQyxhQUFhLFlBQVksV0FBVyxDQUFDLE9BQU87d0JBQzVDLGFBQWEsWUFBWSxXQUFXLENBQUMsWUFBWTt3QkFDakQsYUFBYSxZQUFZLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO3dCQUN0RCxNQUFNLENBQUMsYUFBYSxDQUFDO29CQUV2QixDQUFDO29CQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNsQyxJQUFJLEtBQUssR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzdCLElBQUksU0FBUyxHQUFnQixhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO3dCQUNoRixJQUFJLGNBQWMsR0FBcUIsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQzt3QkFDMUYsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztvQkFFeEQsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDckMsQ0FBQztnQkFDSCxDQUFDO2dCQTlESDtvQkFBQyxpQkFBVSxFQUFFOzsrQkFBQTtnQkErRGIsa0JBQUM7WUFBRCxDQTlEQSxBQThEQyxJQUFBO1lBOURELHFDQThEQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9mb3JtX2J1aWxkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtTdHJpbmdNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtpc1ByZXNlbnQsIGlzQXJyYXksIENPTlNUX0VYUFIsIFR5cGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQgKiBhcyBtb2RlbE1vZHVsZSBmcm9tICcuL21vZGVsJztcbmltcG9ydCB7VmFsaWRhdG9yRm4sIEFzeW5jVmFsaWRhdG9yRm59IGZyb20gJy4vZGlyZWN0aXZlcy92YWxpZGF0b3JzJztcblxuXG4vKipcbiAqIENyZWF0ZXMgYSBmb3JtIG9iamVjdCBmcm9tIGEgdXNlci1zcGVjaWZpZWQgY29uZmlndXJhdGlvbi5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvRU5nWm84RXVJRUNaTmVuc1pDVnI/cD1wcmV2aWV3KSlcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBAQ29tcG9uZW50KHtcbiAqICAgc2VsZWN0b3I6ICdteS1hcHAnLFxuICogICB2aWV3QmluZGluZ3M6IFtGT1JNX0JJTkRJTkdTXVxuICogICB0ZW1wbGF0ZTogYFxuICogICAgIDxmb3JtIFtuZ0Zvcm1Nb2RlbF09XCJsb2dpbkZvcm1cIj5cbiAqICAgICAgIDxwPkxvZ2luIDxpbnB1dCBuZ0NvbnRyb2w9XCJsb2dpblwiPjwvcD5cbiAqICAgICAgIDxkaXYgbmdDb250cm9sR3JvdXA9XCJwYXNzd29yZFJldHJ5XCI+XG4gKiAgICAgICAgIDxwPlBhc3N3b3JkIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBuZ0NvbnRyb2w9XCJwYXNzd29yZFwiPjwvcD5cbiAqICAgICAgICAgPHA+Q29uZmlybSBwYXNzd29yZCA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgbmdDb250cm9sPVwicGFzc3dvcmRDb25maXJtYXRpb25cIj48L3A+XG4gKiAgICAgICA8L2Rpdj5cbiAqICAgICA8L2Zvcm0+XG4gKiAgICAgPGgzPkZvcm0gdmFsdWU6PC9oMz5cbiAqICAgICA8cHJlPnt7dmFsdWV9fTwvcHJlPlxuICogICBgLFxuICogICBkaXJlY3RpdmVzOiBbRk9STV9ESVJFQ1RJVkVTXVxuICogfSlcbiAqIGV4cG9ydCBjbGFzcyBBcHAge1xuICogICBsb2dpbkZvcm06IENvbnRyb2xHcm91cDtcbiAqXG4gKiAgIGNvbnN0cnVjdG9yKGJ1aWxkZXI6IEZvcm1CdWlsZGVyKSB7XG4gKiAgICAgdGhpcy5sb2dpbkZvcm0gPSBidWlsZGVyLmdyb3VwKHtcbiAqICAgICAgIGxvZ2luOiBbXCJcIiwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gKiAgICAgICBwYXNzd29yZFJldHJ5OiBidWlsZGVyLmdyb3VwKHtcbiAqICAgICAgICAgcGFzc3dvcmQ6IFtcIlwiLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAqICAgICAgICAgcGFzc3dvcmRDb25maXJtYXRpb246IFtcIlwiLCBWYWxpZGF0b3JzLnJlcXVpcmVkLCBhc3luY1ZhbGlkYXRvcl1cbiAqICAgICAgIH0pXG4gKiAgICAgfSk7XG4gKiAgIH1cbiAqXG4gKiAgIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xuICogICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLmxvZ2luRm9ybS52YWx1ZSwgbnVsbCwgMik7XG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRm9ybUJ1aWxkZXIge1xuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHtAbGluayBDb250cm9sR3JvdXB9IHdpdGggdGhlIGdpdmVuIG1hcCBvZiBjb25maWd1cmF0aW9uLlxuICAgKiBWYWxpZCBrZXlzIGZvciB0aGUgYGV4dHJhYCBwYXJhbWV0ZXIgbWFwIGFyZSBgb3B0aW9uYWxzYCBhbmQgYHZhbGlkYXRvcmAuXG4gICAqXG4gICAqIFNlZSB0aGUge0BsaW5rIENvbnRyb2xHcm91cH0gY29uc3RydWN0b3IgZm9yIG1vcmUgZGV0YWlscy5cbiAgICovXG4gIGdyb3VwKGNvbnRyb2xzQ29uZmlnOiB7W2tleTogc3RyaW5nXTogYW55fSxcbiAgICAgICAgZXh0cmE6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0gbnVsbCk6IG1vZGVsTW9kdWxlLkNvbnRyb2xHcm91cCB7XG4gICAgdmFyIGNvbnRyb2xzID0gdGhpcy5fcmVkdWNlQ29udHJvbHMoY29udHJvbHNDb25maWcpO1xuICAgIHZhciBvcHRpb25hbHMgPSA8e1trZXk6IHN0cmluZ106IGJvb2xlYW59PihcbiAgICAgICAgaXNQcmVzZW50KGV4dHJhKSA/IFN0cmluZ01hcFdyYXBwZXIuZ2V0KGV4dHJhLCBcIm9wdGlvbmFsc1wiKSA6IG51bGwpO1xuICAgIHZhciB2YWxpZGF0b3I6IFZhbGlkYXRvckZuID0gaXNQcmVzZW50KGV4dHJhKSA/IFN0cmluZ01hcFdyYXBwZXIuZ2V0KGV4dHJhLCBcInZhbGlkYXRvclwiKSA6IG51bGw7XG4gICAgdmFyIGFzeW5jVmFsaWRhdG9yOiBBc3luY1ZhbGlkYXRvckZuID1cbiAgICAgICAgaXNQcmVzZW50KGV4dHJhKSA/IFN0cmluZ01hcFdyYXBwZXIuZ2V0KGV4dHJhLCBcImFzeW5jVmFsaWRhdG9yXCIpIDogbnVsbDtcbiAgICByZXR1cm4gbmV3IG1vZGVsTW9kdWxlLkNvbnRyb2xHcm91cChjb250cm9scywgb3B0aW9uYWxzLCB2YWxpZGF0b3IsIGFzeW5jVmFsaWRhdG9yKTtcbiAgfVxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHtAbGluayBDb250cm9sfSB3aXRoIHRoZSBnaXZlbiBgdmFsdWVgLGB2YWxpZGF0b3JgLCBhbmQgYGFzeW5jVmFsaWRhdG9yYC5cbiAgICovXG4gIGNvbnRyb2wodmFsdWU6IE9iamVjdCwgdmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IG51bGwsXG4gICAgICAgICAgYXN5bmNWYWxpZGF0b3I6IEFzeW5jVmFsaWRhdG9yRm4gPSBudWxsKTogbW9kZWxNb2R1bGUuQ29udHJvbCB7XG4gICAgcmV0dXJuIG5ldyBtb2RlbE1vZHVsZS5Db250cm9sKHZhbHVlLCB2YWxpZGF0b3IsIGFzeW5jVmFsaWRhdG9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYW4gYXJyYXkgb2Yge0BsaW5rIENvbnRyb2x9cyBmcm9tIHRoZSBnaXZlbiBgY29udHJvbHNDb25maWdgIGFycmF5IG9mXG4gICAqIGNvbmZpZ3VyYXRpb24sIHdpdGggdGhlIGdpdmVuIG9wdGlvbmFsIGB2YWxpZGF0b3JgIGFuZCBgYXN5bmNWYWxpZGF0b3JgLlxuICAgKi9cbiAgYXJyYXkoY29udHJvbHNDb25maWc6IGFueVtdLCB2YWxpZGF0b3I6IFZhbGlkYXRvckZuID0gbnVsbCxcbiAgICAgICAgYXN5bmNWYWxpZGF0b3I6IEFzeW5jVmFsaWRhdG9yRm4gPSBudWxsKTogbW9kZWxNb2R1bGUuQ29udHJvbEFycmF5IHtcbiAgICB2YXIgY29udHJvbHMgPSBjb250cm9sc0NvbmZpZy5tYXAoYyA9PiB0aGlzLl9jcmVhdGVDb250cm9sKGMpKTtcbiAgICByZXR1cm4gbmV3IG1vZGVsTW9kdWxlLkNvbnRyb2xBcnJheShjb250cm9scywgdmFsaWRhdG9yLCBhc3luY1ZhbGlkYXRvcik7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9yZWR1Y2VDb250cm9scyhjb250cm9sc0NvbmZpZzoge1trOiBzdHJpbmddOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW55fSk6IHtba2V5OiBzdHJpbmddOiBtb2RlbE1vZHVsZS5BYnN0cmFjdENvbnRyb2x9IHtcbiAgICB2YXIgY29udHJvbHM6IHtba2V5OiBzdHJpbmddOiBtb2RlbE1vZHVsZS5BYnN0cmFjdENvbnRyb2x9ID0ge307XG4gICAgU3RyaW5nTWFwV3JhcHBlci5mb3JFYWNoKGNvbnRyb2xzQ29uZmlnLCAoY29udHJvbENvbmZpZzogYW55LCBjb250cm9sTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICBjb250cm9sc1tjb250cm9sTmFtZV0gPSB0aGlzLl9jcmVhdGVDb250cm9sKGNvbnRyb2xDb25maWcpO1xuICAgIH0pO1xuICAgIHJldHVybiBjb250cm9scztcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NyZWF0ZUNvbnRyb2woY29udHJvbENvbmZpZzogYW55KTogbW9kZWxNb2R1bGUuQWJzdHJhY3RDb250cm9sIHtcbiAgICBpZiAoY29udHJvbENvbmZpZyBpbnN0YW5jZW9mIG1vZGVsTW9kdWxlLkNvbnRyb2wgfHxcbiAgICAgICAgY29udHJvbENvbmZpZyBpbnN0YW5jZW9mIG1vZGVsTW9kdWxlLkNvbnRyb2xHcm91cCB8fFxuICAgICAgICBjb250cm9sQ29uZmlnIGluc3RhbmNlb2YgbW9kZWxNb2R1bGUuQ29udHJvbEFycmF5KSB7XG4gICAgICByZXR1cm4gY29udHJvbENvbmZpZztcblxuICAgIH0gZWxzZSBpZiAoaXNBcnJheShjb250cm9sQ29uZmlnKSkge1xuICAgICAgdmFyIHZhbHVlID0gY29udHJvbENvbmZpZ1swXTtcbiAgICAgIHZhciB2YWxpZGF0b3I6IFZhbGlkYXRvckZuID0gY29udHJvbENvbmZpZy5sZW5ndGggPiAxID8gY29udHJvbENvbmZpZ1sxXSA6IG51bGw7XG4gICAgICB2YXIgYXN5bmNWYWxpZGF0b3I6IEFzeW5jVmFsaWRhdG9yRm4gPSBjb250cm9sQ29uZmlnLmxlbmd0aCA+IDIgPyBjb250cm9sQ29uZmlnWzJdIDogbnVsbDtcbiAgICAgIHJldHVybiB0aGlzLmNvbnRyb2wodmFsdWUsIHZhbGlkYXRvciwgYXN5bmNWYWxpZGF0b3IpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnRyb2woY29udHJvbENvbmZpZyk7XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
