System.register(['angular2/core', 'angular2/src/facade/lang', '../validators'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, lang_1, validators_1, lang_2;
    var REQUIRED, REQUIRED_VALIDATOR, RequiredValidator, MIN_LENGTH_VALIDATOR, MinLengthValidator, MAX_LENGTH_VALIDATOR, MaxLengthValidator, PATTERN_VALIDATOR, PatternValidator;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
                lang_2 = lang_1_1;
            },
            function (validators_1_1) {
                validators_1 = validators_1_1;
            }],
        execute: function() {
            REQUIRED = validators_1.Validators.required;
            REQUIRED_VALIDATOR = lang_1.CONST_EXPR(new core_1.Provider(validators_1.NG_VALIDATORS, { useValue: REQUIRED, multi: true }));
            /**
             * A Directive that adds the `required` validator to any controls marked with the
             * `required` attribute, via the {@link NG_VALIDATORS} binding.
             *
             * ### Example
             *
             * ```
             * <input ngControl="fullName" required>
             * ```
             */
            RequiredValidator = (function () {
                function RequiredValidator() {
                }
                RequiredValidator = __decorate([
                    core_1.Directive({
                        selector: '[required][ngControl],[required][ngFormControl],[required][ngModel]',
                        providers: [REQUIRED_VALIDATOR]
                    }), 
                    __metadata('design:paramtypes', [])
                ], RequiredValidator);
                return RequiredValidator;
            }());
            exports_1("RequiredValidator", RequiredValidator);
            /**
             * Provivder which adds {@link MinLengthValidator} to {@link NG_VALIDATORS}.
             *
             * ## Example:
             *
             * {@example common/forms/ts/validators/validators.ts region='min'}
             */
            MIN_LENGTH_VALIDATOR = lang_1.CONST_EXPR(new core_1.Provider(validators_1.NG_VALIDATORS, { useExisting: core_1.forwardRef(function () { return MinLengthValidator; }), multi: true }));
            /**
             * A directive which installs the {@link MinLengthValidator} for any `ngControl`,
             * `ngFormControl`, or control with `ngModel` that also has a `minlength` attribute.
             */
            MinLengthValidator = (function () {
                function MinLengthValidator(minLength) {
                    this._validator = validators_1.Validators.minLength(lang_2.NumberWrapper.parseInt(minLength, 10));
                }
                MinLengthValidator.prototype.validate = function (c) { return this._validator(c); };
                MinLengthValidator = __decorate([
                    core_1.Directive({
                        selector: '[minlength][ngControl],[minlength][ngFormControl],[minlength][ngModel]',
                        providers: [MIN_LENGTH_VALIDATOR]
                    }),
                    __param(0, core_1.Attribute("minlength")), 
                    __metadata('design:paramtypes', [String])
                ], MinLengthValidator);
                return MinLengthValidator;
            }());
            exports_1("MinLengthValidator", MinLengthValidator);
            /**
             * Provider which adds {@link MaxLengthValidator} to {@link NG_VALIDATORS}.
             *
             * ## Example:
             *
             * {@example common/forms/ts/validators/validators.ts region='max'}
             */
            MAX_LENGTH_VALIDATOR = lang_1.CONST_EXPR(new core_1.Provider(validators_1.NG_VALIDATORS, { useExisting: core_1.forwardRef(function () { return MaxLengthValidator; }), multi: true }));
            /**
             * A directive which installs the {@link MaxLengthValidator} for any `ngControl, `ngFormControl`,
             * or control with `ngModel` that also has a `maxlength` attribute.
             */
            MaxLengthValidator = (function () {
                function MaxLengthValidator(maxLength) {
                    this._validator = validators_1.Validators.maxLength(lang_2.NumberWrapper.parseInt(maxLength, 10));
                }
                MaxLengthValidator.prototype.validate = function (c) { return this._validator(c); };
                MaxLengthValidator = __decorate([
                    core_1.Directive({
                        selector: '[maxlength][ngControl],[maxlength][ngFormControl],[maxlength][ngModel]',
                        providers: [MAX_LENGTH_VALIDATOR]
                    }),
                    __param(0, core_1.Attribute("maxlength")), 
                    __metadata('design:paramtypes', [String])
                ], MaxLengthValidator);
                return MaxLengthValidator;
            }());
            exports_1("MaxLengthValidator", MaxLengthValidator);
            /**
             * A Directive that adds the `pattern` validator to any controls marked with the
             * `pattern` attribute, via the {@link NG_VALIDATORS} binding. Uses attribute value
             * as the regex to validate Control value against.  Follows pattern attribute
             * semantics; i.e. regex must match entire Control value.
             *
             * ### Example
             *
             * ```
             * <input [ngControl]="fullName" pattern="[a-zA-Z ]*">
             * ```
             */
            PATTERN_VALIDATOR = lang_1.CONST_EXPR(new core_1.Provider(validators_1.NG_VALIDATORS, { useExisting: core_1.forwardRef(function () { return PatternValidator; }), multi: true }));
            PatternValidator = (function () {
                function PatternValidator(pattern) {
                    this._validator = validators_1.Validators.pattern(pattern);
                }
                PatternValidator.prototype.validate = function (c) { return this._validator(c); };
                PatternValidator = __decorate([
                    core_1.Directive({
                        selector: '[pattern][ngControl],[pattern][ngFormControl],[pattern][ngModel]',
                        providers: [PATTERN_VALIDATOR]
                    }),
                    __param(0, core_1.Attribute("pattern")), 
                    __metadata('design:paramtypes', [String])
                ], PatternValidator);
                return PatternValidator;
            }());
            exports_1("PatternValidator", PatternValidator);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL3ZhbGlkYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztRQTRCTSxRQUFRLEVBRVIsa0JBQWtCLHFCQWdDbEIsb0JBQW9CLHNCQTRCcEIsb0JBQW9CLHNCQWtDcEIsaUJBQWlCOzs7Ozs7Ozs7Ozs7OztZQWhHakIsUUFBUSxHQUFHLHVCQUFVLENBQUMsUUFBUSxDQUFDO1lBRS9CLGtCQUFrQixHQUNwQixpQkFBVSxDQUFDLElBQUksZUFBUSxDQUFDLDBCQUFhLEVBQUUsRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFFL0U7Ozs7Ozs7OztlQVNHO1lBS0g7Z0JBQUE7Z0JBQ0EsQ0FBQztnQkFMRDtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSxxRUFBcUU7d0JBQy9FLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixDQUFDO3FCQUNoQyxDQUFDOztxQ0FBQTtnQkFFRix3QkFBQztZQUFELENBREEsQUFDQyxJQUFBO1lBREQsaURBQ0MsQ0FBQTtZQU9EOzs7Ozs7ZUFNRztZQUNHLG9CQUFvQixHQUFHLGlCQUFVLENBQ25DLElBQUksZUFBUSxDQUFDLDBCQUFhLEVBQUUsRUFBQyxXQUFXLEVBQUUsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsa0JBQWtCLEVBQWxCLENBQWtCLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBRW5HOzs7ZUFHRztZQUtIO2dCQUdFLDRCQUFvQyxTQUFpQjtvQkFDbkQsSUFBSSxDQUFDLFVBQVUsR0FBRyx1QkFBVSxDQUFDLFNBQVMsQ0FBQyxvQkFBYSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDaEYsQ0FBQztnQkFFRCxxQ0FBUSxHQUFSLFVBQVMsQ0FBa0IsSUFBMEIsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQVhuRjtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSx3RUFBd0U7d0JBQ2xGLFNBQVMsRUFBRSxDQUFDLG9CQUFvQixDQUFDO3FCQUNsQyxDQUFDOytCQUlhLGdCQUFTLENBQUMsV0FBVyxDQUFDOztzQ0FKbkM7Z0JBU0YseUJBQUM7WUFBRCxDQVJBLEFBUUMsSUFBQTtZQVJELG1EQVFDLENBQUE7WUFFRDs7Ozs7O2VBTUc7WUFDRyxvQkFBb0IsR0FBRyxpQkFBVSxDQUNuQyxJQUFJLGVBQVEsQ0FBQywwQkFBYSxFQUFFLEVBQUMsV0FBVyxFQUFFLGlCQUFVLENBQUMsY0FBTSxPQUFBLGtCQUFrQixFQUFsQixDQUFrQixDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQztZQUVuRzs7O2VBR0c7WUFLSDtnQkFHRSw0QkFBb0MsU0FBaUI7b0JBQ25ELElBQUksQ0FBQyxVQUFVLEdBQUcsdUJBQVUsQ0FBQyxTQUFTLENBQUMsb0JBQWEsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hGLENBQUM7Z0JBRUQscUNBQVEsR0FBUixVQUFTLENBQWtCLElBQTBCLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFYbkY7b0JBQUMsZ0JBQVMsQ0FBQzt3QkFDVCxRQUFRLEVBQUUsd0VBQXdFO3dCQUNsRixTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztxQkFDbEMsQ0FBQzsrQkFJYSxnQkFBUyxDQUFDLFdBQVcsQ0FBQzs7c0NBSm5DO2dCQVNGLHlCQUFDO1lBQUQsQ0FSQSxBQVFDLElBQUE7WUFSRCxtREFRQyxDQUFBO1lBR0Q7Ozs7Ozs7Ozs7O2VBV0c7WUFDRyxpQkFBaUIsR0FBRyxpQkFBVSxDQUNoQyxJQUFJLGVBQVEsQ0FBQywwQkFBYSxFQUFFLEVBQUMsV0FBVyxFQUFFLGlCQUFVLENBQUMsY0FBTSxPQUFBLGdCQUFnQixFQUFoQixDQUFnQixDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQztZQUtqRztnQkFHRSwwQkFBa0MsT0FBZTtvQkFDL0MsSUFBSSxDQUFDLFVBQVUsR0FBRyx1QkFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDaEQsQ0FBQztnQkFFRCxtQ0FBUSxHQUFSLFVBQVMsQ0FBa0IsSUFBMEIsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQVhuRjtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSxrRUFBa0U7d0JBQzVFLFNBQVMsRUFBRSxDQUFDLGlCQUFpQixDQUFDO3FCQUMvQixDQUFDOytCQUlhLGdCQUFTLENBQUMsU0FBUyxDQUFDOztvQ0FKakM7Z0JBU0YsdUJBQUM7WUFBRCxDQVJBLEFBUUMsSUFBQTtZQVJELCtDQVFDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29tbW9uL2Zvcm1zL2RpcmVjdGl2ZXMvdmFsaWRhdG9ycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Zm9yd2FyZFJlZiwgUHJvdmlkZXIsIEF0dHJpYnV0ZSwgRGlyZWN0aXZlfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Q09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7VmFsaWRhdG9ycywgTkdfVkFMSURBVE9SU30gZnJvbSAnLi4vdmFsaWRhdG9ycyc7XG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbH0gZnJvbSAnLi4vbW9kZWwnO1xuaW1wb3J0ICogYXMgbW9kZWxNb2R1bGUgZnJvbSAnLi4vbW9kZWwnO1xuaW1wb3J0IHtOdW1iZXJXcmFwcGVyfSBmcm9tIFwiYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nXCI7XG5cblxuXG4vKipcbiAqIEFuIGludGVyZmFjZSB0aGF0IGNhbiBiZSBpbXBsZW1lbnRlZCBieSBjbGFzc2VzIHRoYXQgY2FuIGFjdCBhcyB2YWxpZGF0b3JzLlxuICpcbiAqICMjIFVzYWdlXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogQERpcmVjdGl2ZSh7XG4gKiAgIHNlbGVjdG9yOiAnW2N1c3RvbS12YWxpZGF0b3JdJyxcbiAqICAgcHJvdmlkZXJzOiBbcHJvdmlkZShOR19WQUxJREFUT1JTLCB7dXNlRXhpc3Rpbmc6IEN1c3RvbVZhbGlkYXRvckRpcmVjdGl2ZSwgbXVsdGk6IHRydWV9KV1cbiAqIH0pXG4gKiBjbGFzcyBDdXN0b21WYWxpZGF0b3JEaXJlY3RpdmUgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xuICogICB2YWxpZGF0ZShjOiBDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICogICAgIHJldHVybiB7XCJjdXN0b21cIjogdHJ1ZX07XG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgaW50ZXJmYWNlIFZhbGlkYXRvciB7IHZhbGlkYXRlKGM6IG1vZGVsTW9kdWxlLkFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBhbnl9OyB9XG5cbmNvbnN0IFJFUVVJUkVEID0gVmFsaWRhdG9ycy5yZXF1aXJlZDtcblxuY29uc3QgUkVRVUlSRURfVkFMSURBVE9SID1cbiAgICBDT05TVF9FWFBSKG5ldyBQcm92aWRlcihOR19WQUxJREFUT1JTLCB7dXNlVmFsdWU6IFJFUVVJUkVELCBtdWx0aTogdHJ1ZX0pKTtcblxuLyoqXG4gKiBBIERpcmVjdGl2ZSB0aGF0IGFkZHMgdGhlIGByZXF1aXJlZGAgdmFsaWRhdG9yIHRvIGFueSBjb250cm9scyBtYXJrZWQgd2l0aCB0aGVcbiAqIGByZXF1aXJlZGAgYXR0cmlidXRlLCB2aWEgdGhlIHtAbGluayBOR19WQUxJREFUT1JTfSBiaW5kaW5nLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgXG4gKiA8aW5wdXQgbmdDb250cm9sPVwiZnVsbE5hbWVcIiByZXF1aXJlZD5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcmVxdWlyZWRdW25nQ29udHJvbF0sW3JlcXVpcmVkXVtuZ0Zvcm1Db250cm9sXSxbcmVxdWlyZWRdW25nTW9kZWxdJyxcbiAgcHJvdmlkZXJzOiBbUkVRVUlSRURfVkFMSURBVE9SXVxufSlcbmV4cG9ydCBjbGFzcyBSZXF1aXJlZFZhbGlkYXRvciB7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmFsaWRhdG9yRm4geyAoYzogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX07IH1cbmV4cG9ydCBpbnRlcmZhY2UgQXN5bmNWYWxpZGF0b3JGbiB7XG4gIChjOiBBYnN0cmFjdENvbnRyb2wpOiBhbnkgLypQcm9taXNlPHtba2V5OiBzdHJpbmddOiBhbnl9PnxPYnNlcnZhYmxlPHtba2V5OiBzdHJpbmddOiBhbnl9PiovO1xufVxuXG4vKipcbiAqIFByb3ZpdmRlciB3aGljaCBhZGRzIHtAbGluayBNaW5MZW5ndGhWYWxpZGF0b3J9IHRvIHtAbGluayBOR19WQUxJREFUT1JTfS5cbiAqXG4gKiAjIyBFeGFtcGxlOlxuICpcbiAqIHtAZXhhbXBsZSBjb21tb24vZm9ybXMvdHMvdmFsaWRhdG9ycy92YWxpZGF0b3JzLnRzIHJlZ2lvbj0nbWluJ31cbiAqL1xuY29uc3QgTUlOX0xFTkdUSF9WQUxJREFUT1IgPSBDT05TVF9FWFBSKFxuICAgIG5ldyBQcm92aWRlcihOR19WQUxJREFUT1JTLCB7dXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWluTGVuZ3RoVmFsaWRhdG9yKSwgbXVsdGk6IHRydWV9KSk7XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgd2hpY2ggaW5zdGFsbHMgdGhlIHtAbGluayBNaW5MZW5ndGhWYWxpZGF0b3J9IGZvciBhbnkgYG5nQ29udHJvbGAsXG4gKiBgbmdGb3JtQ29udHJvbGAsIG9yIGNvbnRyb2wgd2l0aCBgbmdNb2RlbGAgdGhhdCBhbHNvIGhhcyBhIGBtaW5sZW5ndGhgIGF0dHJpYnV0ZS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21pbmxlbmd0aF1bbmdDb250cm9sXSxbbWlubGVuZ3RoXVtuZ0Zvcm1Db250cm9sXSxbbWlubGVuZ3RoXVtuZ01vZGVsXScsXG4gIHByb3ZpZGVyczogW01JTl9MRU5HVEhfVkFMSURBVE9SXVxufSlcbmV4cG9ydCBjbGFzcyBNaW5MZW5ndGhWYWxpZGF0b3IgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xuICBwcml2YXRlIF92YWxpZGF0b3I6IFZhbGlkYXRvckZuO1xuXG4gIGNvbnN0cnVjdG9yKEBBdHRyaWJ1dGUoXCJtaW5sZW5ndGhcIikgbWluTGVuZ3RoOiBzdHJpbmcpIHtcbiAgICB0aGlzLl92YWxpZGF0b3IgPSBWYWxpZGF0b3JzLm1pbkxlbmd0aChOdW1iZXJXcmFwcGVyLnBhcnNlSW50KG1pbkxlbmd0aCwgMTApKTtcbiAgfVxuXG4gIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHsgcmV0dXJuIHRoaXMuX3ZhbGlkYXRvcihjKTsgfVxufVxuXG4vKipcbiAqIFByb3ZpZGVyIHdoaWNoIGFkZHMge0BsaW5rIE1heExlbmd0aFZhbGlkYXRvcn0gdG8ge0BsaW5rIE5HX1ZBTElEQVRPUlN9LlxuICpcbiAqICMjIEV4YW1wbGU6XG4gKlxuICoge0BleGFtcGxlIGNvbW1vbi9mb3Jtcy90cy92YWxpZGF0b3JzL3ZhbGlkYXRvcnMudHMgcmVnaW9uPSdtYXgnfVxuICovXG5jb25zdCBNQVhfTEVOR1RIX1ZBTElEQVRPUiA9IENPTlNUX0VYUFIoXG4gICAgbmV3IFByb3ZpZGVyKE5HX1ZBTElEQVRPUlMsIHt1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNYXhMZW5ndGhWYWxpZGF0b3IpLCBtdWx0aTogdHJ1ZX0pKTtcblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB3aGljaCBpbnN0YWxscyB0aGUge0BsaW5rIE1heExlbmd0aFZhbGlkYXRvcn0gZm9yIGFueSBgbmdDb250cm9sLCBgbmdGb3JtQ29udHJvbGAsXG4gKiBvciBjb250cm9sIHdpdGggYG5nTW9kZWxgIHRoYXQgYWxzbyBoYXMgYSBgbWF4bGVuZ3RoYCBhdHRyaWJ1dGUuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXhsZW5ndGhdW25nQ29udHJvbF0sW21heGxlbmd0aF1bbmdGb3JtQ29udHJvbF0sW21heGxlbmd0aF1bbmdNb2RlbF0nLFxuICBwcm92aWRlcnM6IFtNQVhfTEVOR1RIX1ZBTElEQVRPUl1cbn0pXG5leHBvcnQgY2xhc3MgTWF4TGVuZ3RoVmFsaWRhdG9yIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcbiAgcHJpdmF0ZSBfdmFsaWRhdG9yOiBWYWxpZGF0b3JGbjtcblxuICBjb25zdHJ1Y3RvcihAQXR0cmlidXRlKFwibWF4bGVuZ3RoXCIpIG1heExlbmd0aDogc3RyaW5nKSB7XG4gICAgdGhpcy5fdmFsaWRhdG9yID0gVmFsaWRhdG9ycy5tYXhMZW5ndGgoTnVtYmVyV3JhcHBlci5wYXJzZUludChtYXhMZW5ndGgsIDEwKSk7XG4gIH1cblxuICB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYW55fSB7IHJldHVybiB0aGlzLl92YWxpZGF0b3IoYyk7IH1cbn1cblxuXG4vKipcbiAqIEEgRGlyZWN0aXZlIHRoYXQgYWRkcyB0aGUgYHBhdHRlcm5gIHZhbGlkYXRvciB0byBhbnkgY29udHJvbHMgbWFya2VkIHdpdGggdGhlXG4gKiBgcGF0dGVybmAgYXR0cmlidXRlLCB2aWEgdGhlIHtAbGluayBOR19WQUxJREFUT1JTfSBiaW5kaW5nLiBVc2VzIGF0dHJpYnV0ZSB2YWx1ZVxuICogYXMgdGhlIHJlZ2V4IHRvIHZhbGlkYXRlIENvbnRyb2wgdmFsdWUgYWdhaW5zdC4gIEZvbGxvd3MgcGF0dGVybiBhdHRyaWJ1dGVcbiAqIHNlbWFudGljczsgaS5lLiByZWdleCBtdXN0IG1hdGNoIGVudGlyZSBDb250cm9sIHZhbHVlLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgXG4gKiA8aW5wdXQgW25nQ29udHJvbF09XCJmdWxsTmFtZVwiIHBhdHRlcm49XCJbYS16QS1aIF0qXCI+XG4gKiBgYGBcbiAqL1xuY29uc3QgUEFUVEVSTl9WQUxJREFUT1IgPSBDT05TVF9FWFBSKFxuICAgIG5ldyBQcm92aWRlcihOR19WQUxJREFUT1JTLCB7dXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUGF0dGVyblZhbGlkYXRvciksIG11bHRpOiB0cnVlfSkpO1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3BhdHRlcm5dW25nQ29udHJvbF0sW3BhdHRlcm5dW25nRm9ybUNvbnRyb2xdLFtwYXR0ZXJuXVtuZ01vZGVsXScsXG4gIHByb3ZpZGVyczogW1BBVFRFUk5fVkFMSURBVE9SXVxufSlcbmV4cG9ydCBjbGFzcyBQYXR0ZXJuVmFsaWRhdG9yIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcbiAgcHJpdmF0ZSBfdmFsaWRhdG9yOiBWYWxpZGF0b3JGbjtcblxuICBjb25zdHJ1Y3RvcihAQXR0cmlidXRlKFwicGF0dGVyblwiKSBwYXR0ZXJuOiBzdHJpbmcpIHtcbiAgICB0aGlzLl92YWxpZGF0b3IgPSBWYWxpZGF0b3JzLnBhdHRlcm4ocGF0dGVybik7XG4gIH1cblxuICB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYW55fSB7IHJldHVybiB0aGlzLl92YWxpZGF0b3IoYyk7IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
