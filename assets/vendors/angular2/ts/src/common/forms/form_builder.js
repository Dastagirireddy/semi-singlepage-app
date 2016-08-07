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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZm9ybXMvZm9ybV9idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUF3Q0c7WUFFSDtnQkFBQTtnQkE4REEsQ0FBQztnQkE3REM7Ozs7O21CQUtHO2dCQUNILDJCQUFLLEdBQUwsVUFBTSxjQUFvQyxFQUNwQyxLQUFrQztvQkFBbEMscUJBQWtDLEdBQWxDLFlBQWtDO29CQUN0QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUNwRCxJQUFJLFNBQVMsR0FBNkIsQ0FDdEMsZ0JBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyw2QkFBZ0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO29CQUN4RSxJQUFJLFNBQVMsR0FBZ0IsZ0JBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyw2QkFBZ0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQztvQkFDaEcsSUFBSSxjQUFjLEdBQ2QsZ0JBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyw2QkFBZ0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLGdCQUFnQixDQUFDLEdBQUcsSUFBSSxDQUFDO29CQUM1RSxNQUFNLENBQUMsSUFBSSxXQUFXLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUN0RixDQUFDO2dCQUNEOzttQkFFRztnQkFDSCw2QkFBTyxHQUFQLFVBQVEsS0FBYSxFQUFFLFNBQTZCLEVBQzVDLGNBQXVDO29CQUR4Qix5QkFBNkIsR0FBN0IsZ0JBQTZCO29CQUM1Qyw4QkFBdUMsR0FBdkMscUJBQXVDO29CQUM3QyxNQUFNLENBQUMsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQ25FLENBQUM7Z0JBRUQ7OzttQkFHRztnQkFDSCwyQkFBSyxHQUFMLFVBQU0sY0FBcUIsRUFBRSxTQUE2QixFQUNwRCxjQUF1QztvQkFEN0MsaUJBSUM7b0JBSjRCLHlCQUE2QixHQUE3QixnQkFBNkI7b0JBQ3BELDhCQUF1QyxHQUF2QyxxQkFBdUM7b0JBQzNDLElBQUksUUFBUSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUF0QixDQUFzQixDQUFDLENBQUM7b0JBQy9ELE1BQU0sQ0FBQyxJQUFJLFdBQVcsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztnQkFDM0UsQ0FBQztnQkFFRCxnQkFBZ0I7Z0JBQ2hCLHFDQUFlLEdBQWYsVUFBZ0IsY0FDeUI7b0JBRHpDLGlCQU9DO29CQUxDLElBQUksUUFBUSxHQUFpRCxFQUFFLENBQUM7b0JBQ2hFLDZCQUFnQixDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsVUFBQyxhQUFrQixFQUFFLFdBQW1CO3dCQUMvRSxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDN0QsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsTUFBTSxDQUFDLFFBQVEsQ0FBQztnQkFDbEIsQ0FBQztnQkFFRCxnQkFBZ0I7Z0JBQ2hCLG9DQUFjLEdBQWQsVUFBZSxhQUFrQjtvQkFDL0IsRUFBRSxDQUFDLENBQUMsYUFBYSxZQUFZLFdBQVcsQ0FBQyxPQUFPO3dCQUM1QyxhQUFhLFlBQVksV0FBVyxDQUFDLFlBQVk7d0JBQ2pELGFBQWEsWUFBWSxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzt3QkFDdEQsTUFBTSxDQUFDLGFBQWEsQ0FBQztvQkFFdkIsQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbEMsSUFBSSxLQUFLLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM3QixJQUFJLFNBQVMsR0FBZ0IsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQzt3QkFDaEYsSUFBSSxjQUFjLEdBQXFCLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7d0JBQzFGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7b0JBRXhELENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ3JDLENBQUM7Z0JBQ0gsQ0FBQztnQkE5REg7b0JBQUMsaUJBQVUsRUFBRTs7K0JBQUE7Z0JBK0RiLGtCQUFDO1lBQUQsQ0E5REEsQUE4REMsSUFBQTtZQTlERCxxQ0E4REMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tbW9uL2Zvcm1zL2Zvcm1fYnVpbGRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1N0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge2lzUHJlc2VudCwgaXNBcnJheSwgQ09OU1RfRVhQUiwgVHlwZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCAqIGFzIG1vZGVsTW9kdWxlIGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHtWYWxpZGF0b3JGbiwgQXN5bmNWYWxpZGF0b3JGbn0gZnJvbSAnLi9kaXJlY3RpdmVzL3ZhbGlkYXRvcnMnO1xuXG5cbi8qKlxuICogQ3JlYXRlcyBhIGZvcm0gb2JqZWN0IGZyb20gYSB1c2VyLXNwZWNpZmllZCBjb25maWd1cmF0aW9uLlxuICpcbiAqICMjIyBFeGFtcGxlIChbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC9FTmdabzhFdUlFQ1pOZW5zWkNWcj9wPXByZXZpZXcpKVxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIEBDb21wb25lbnQoe1xuICogICBzZWxlY3RvcjogJ215LWFwcCcsXG4gKiAgIHZpZXdCaW5kaW5nczogW0ZPUk1fQklORElOR1NdXG4gKiAgIHRlbXBsYXRlOiBgXG4gKiAgICAgPGZvcm0gW25nRm9ybU1vZGVsXT1cImxvZ2luRm9ybVwiPlxuICogICAgICAgPHA+TG9naW4gPGlucHV0IG5nQ29udHJvbD1cImxvZ2luXCI+PC9wPlxuICogICAgICAgPGRpdiBuZ0NvbnRyb2xHcm91cD1cInBhc3N3b3JkUmV0cnlcIj5cbiAqICAgICAgICAgPHA+UGFzc3dvcmQgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIG5nQ29udHJvbD1cInBhc3N3b3JkXCI+PC9wPlxuICogICAgICAgICA8cD5Db25maXJtIHBhc3N3b3JkIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBuZ0NvbnRyb2w9XCJwYXNzd29yZENvbmZpcm1hdGlvblwiPjwvcD5cbiAqICAgICAgIDwvZGl2PlxuICogICAgIDwvZm9ybT5cbiAqICAgICA8aDM+Rm9ybSB2YWx1ZTo8L2gzPlxuICogICAgIDxwcmU+e3t2YWx1ZX19PC9wcmU+XG4gKiAgIGAsXG4gKiAgIGRpcmVjdGl2ZXM6IFtGT1JNX0RJUkVDVElWRVNdXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIEFwcCB7XG4gKiAgIGxvZ2luRm9ybTogQ29udHJvbEdyb3VwO1xuICpcbiAqICAgY29uc3RydWN0b3IoYnVpbGRlcjogRm9ybUJ1aWxkZXIpIHtcbiAqICAgICB0aGlzLmxvZ2luRm9ybSA9IGJ1aWxkZXIuZ3JvdXAoe1xuICogICAgICAgbG9naW46IFtcIlwiLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAqICAgICAgIHBhc3N3b3JkUmV0cnk6IGJ1aWxkZXIuZ3JvdXAoe1xuICogICAgICAgICBwYXNzd29yZDogW1wiXCIsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICogICAgICAgICBwYXNzd29yZENvbmZpcm1hdGlvbjogW1wiXCIsIFZhbGlkYXRvcnMucmVxdWlyZWQsIGFzeW5jVmFsaWRhdG9yXVxuICogICAgICAgfSlcbiAqICAgICB9KTtcbiAqICAgfVxuICpcbiAqICAgZ2V0IHZhbHVlKCk6IHN0cmluZyB7XG4gKiAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMubG9naW5Gb3JtLnZhbHVlLCBudWxsLCAyKTtcbiAqICAgfVxuICogfVxuICogYGBgXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGb3JtQnVpbGRlciB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcge0BsaW5rIENvbnRyb2xHcm91cH0gd2l0aCB0aGUgZ2l2ZW4gbWFwIG9mIGNvbmZpZ3VyYXRpb24uXG4gICAqIFZhbGlkIGtleXMgZm9yIHRoZSBgZXh0cmFgIHBhcmFtZXRlciBtYXAgYXJlIGBvcHRpb25hbHNgIGFuZCBgdmFsaWRhdG9yYC5cbiAgICpcbiAgICogU2VlIHRoZSB7QGxpbmsgQ29udHJvbEdyb3VwfSBjb25zdHJ1Y3RvciBmb3IgbW9yZSBkZXRhaWxzLlxuICAgKi9cbiAgZ3JvdXAoY29udHJvbHNDb25maWc6IHtba2V5OiBzdHJpbmddOiBhbnl9LFxuICAgICAgICBleHRyYToge1trZXk6IHN0cmluZ106IGFueX0gPSBudWxsKTogbW9kZWxNb2R1bGUuQ29udHJvbEdyb3VwIHtcbiAgICB2YXIgY29udHJvbHMgPSB0aGlzLl9yZWR1Y2VDb250cm9scyhjb250cm9sc0NvbmZpZyk7XG4gICAgdmFyIG9wdGlvbmFscyA9IDx7W2tleTogc3RyaW5nXTogYm9vbGVhbn0+KFxuICAgICAgICBpc1ByZXNlbnQoZXh0cmEpID8gU3RyaW5nTWFwV3JhcHBlci5nZXQoZXh0cmEsIFwib3B0aW9uYWxzXCIpIDogbnVsbCk7XG4gICAgdmFyIHZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSBpc1ByZXNlbnQoZXh0cmEpID8gU3RyaW5nTWFwV3JhcHBlci5nZXQoZXh0cmEsIFwidmFsaWRhdG9yXCIpIDogbnVsbDtcbiAgICB2YXIgYXN5bmNWYWxpZGF0b3I6IEFzeW5jVmFsaWRhdG9yRm4gPVxuICAgICAgICBpc1ByZXNlbnQoZXh0cmEpID8gU3RyaW5nTWFwV3JhcHBlci5nZXQoZXh0cmEsIFwiYXN5bmNWYWxpZGF0b3JcIikgOiBudWxsO1xuICAgIHJldHVybiBuZXcgbW9kZWxNb2R1bGUuQ29udHJvbEdyb3VwKGNvbnRyb2xzLCBvcHRpb25hbHMsIHZhbGlkYXRvciwgYXN5bmNWYWxpZGF0b3IpO1xuICB9XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcge0BsaW5rIENvbnRyb2x9IHdpdGggdGhlIGdpdmVuIGB2YWx1ZWAsYHZhbGlkYXRvcmAsIGFuZCBgYXN5bmNWYWxpZGF0b3JgLlxuICAgKi9cbiAgY29udHJvbCh2YWx1ZTogT2JqZWN0LCB2YWxpZGF0b3I6IFZhbGlkYXRvckZuID0gbnVsbCxcbiAgICAgICAgICBhc3luY1ZhbGlkYXRvcjogQXN5bmNWYWxpZGF0b3JGbiA9IG51bGwpOiBtb2RlbE1vZHVsZS5Db250cm9sIHtcbiAgICByZXR1cm4gbmV3IG1vZGVsTW9kdWxlLkNvbnRyb2wodmFsdWUsIHZhbGlkYXRvciwgYXN5bmNWYWxpZGF0b3IpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhbiBhcnJheSBvZiB7QGxpbmsgQ29udHJvbH1zIGZyb20gdGhlIGdpdmVuIGBjb250cm9sc0NvbmZpZ2AgYXJyYXkgb2ZcbiAgICogY29uZmlndXJhdGlvbiwgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9uYWwgYHZhbGlkYXRvcmAgYW5kIGBhc3luY1ZhbGlkYXRvcmAuXG4gICAqL1xuICBhcnJheShjb250cm9sc0NvbmZpZzogYW55W10sIHZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSBudWxsLFxuICAgICAgICBhc3luY1ZhbGlkYXRvcjogQXN5bmNWYWxpZGF0b3JGbiA9IG51bGwpOiBtb2RlbE1vZHVsZS5Db250cm9sQXJyYXkge1xuICAgIHZhciBjb250cm9scyA9IGNvbnRyb2xzQ29uZmlnLm1hcChjID0+IHRoaXMuX2NyZWF0ZUNvbnRyb2woYykpO1xuICAgIHJldHVybiBuZXcgbW9kZWxNb2R1bGUuQ29udHJvbEFycmF5KGNvbnRyb2xzLCB2YWxpZGF0b3IsIGFzeW5jVmFsaWRhdG9yKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3JlZHVjZUNvbnRyb2xzKGNvbnRyb2xzQ29uZmlnOiB7W2s6IHN0cmluZ106XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbnl9KToge1trZXk6IHN0cmluZ106IG1vZGVsTW9kdWxlLkFic3RyYWN0Q29udHJvbH0ge1xuICAgIHZhciBjb250cm9sczoge1trZXk6IHN0cmluZ106IG1vZGVsTW9kdWxlLkFic3RyYWN0Q29udHJvbH0gPSB7fTtcbiAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2goY29udHJvbHNDb25maWcsIChjb250cm9sQ29uZmlnOiBhbnksIGNvbnRyb2xOYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnRyb2xzW2NvbnRyb2xOYW1lXSA9IHRoaXMuX2NyZWF0ZUNvbnRyb2woY29udHJvbENvbmZpZyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvbnRyb2xzO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY3JlYXRlQ29udHJvbChjb250cm9sQ29uZmlnOiBhbnkpOiBtb2RlbE1vZHVsZS5BYnN0cmFjdENvbnRyb2wge1xuICAgIGlmIChjb250cm9sQ29uZmlnIGluc3RhbmNlb2YgbW9kZWxNb2R1bGUuQ29udHJvbCB8fFxuICAgICAgICBjb250cm9sQ29uZmlnIGluc3RhbmNlb2YgbW9kZWxNb2R1bGUuQ29udHJvbEdyb3VwIHx8XG4gICAgICAgIGNvbnRyb2xDb25maWcgaW5zdGFuY2VvZiBtb2RlbE1vZHVsZS5Db250cm9sQXJyYXkpIHtcbiAgICAgIHJldHVybiBjb250cm9sQ29uZmlnO1xuXG4gICAgfSBlbHNlIGlmIChpc0FycmF5KGNvbnRyb2xDb25maWcpKSB7XG4gICAgICB2YXIgdmFsdWUgPSBjb250cm9sQ29uZmlnWzBdO1xuICAgICAgdmFyIHZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSBjb250cm9sQ29uZmlnLmxlbmd0aCA+IDEgPyBjb250cm9sQ29uZmlnWzFdIDogbnVsbDtcbiAgICAgIHZhciBhc3luY1ZhbGlkYXRvcjogQXN5bmNWYWxpZGF0b3JGbiA9IGNvbnRyb2xDb25maWcubGVuZ3RoID4gMiA/IGNvbnRyb2xDb25maWdbMl0gOiBudWxsO1xuICAgICAgcmV0dXJuIHRoaXMuY29udHJvbCh2YWx1ZSwgdmFsaWRhdG9yLCBhc3luY1ZhbGlkYXRvcik7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuY29udHJvbChjb250cm9sQ29uZmlnKTtcbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
