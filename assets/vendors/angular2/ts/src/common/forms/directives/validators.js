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
    var core_1, lang_1, validators_1;
    var REQUIRED, REQUIRED_VALIDATOR, RequiredValidator, MIN_LENGTH_VALIDATOR, MinLengthValidator, MAX_LENGTH_VALIDATOR, MaxLengthValidator, PATTERN_VALIDATOR, PatternValidator;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
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
                    this._validator = validators_1.Validators.minLength(lang_1.NumberWrapper.parseInt(minLength, 10));
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
                    this._validator = validators_1.Validators.maxLength(lang_1.NumberWrapper.parseInt(maxLength, 10));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZm9ybXMvZGlyZWN0aXZlcy92YWxpZGF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7UUEyQk0sUUFBUSxFQUVSLGtCQUFrQixxQkFnQ2xCLG9CQUFvQixzQkE0QnBCLG9CQUFvQixzQkFrQ3BCLGlCQUFpQjs7Ozs7Ozs7Ozs7OztZQWhHakIsUUFBUSxHQUFHLHVCQUFVLENBQUMsUUFBUSxDQUFDO1lBRS9CLGtCQUFrQixHQUNwQixpQkFBVSxDQUFDLElBQUksZUFBUSxDQUFDLDBCQUFhLEVBQUUsRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFFL0U7Ozs7Ozs7OztlQVNHO1lBS0g7Z0JBQUE7Z0JBQ0EsQ0FBQztnQkFMRDtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSxxRUFBcUU7d0JBQy9FLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixDQUFDO3FCQUNoQyxDQUFDOztxQ0FBQTtnQkFFRix3QkFBQztZQUFELENBREEsQUFDQyxJQUFBO1lBREQsaURBQ0MsQ0FBQTtZQU9EOzs7Ozs7ZUFNRztZQUNHLG9CQUFvQixHQUFHLGlCQUFVLENBQ25DLElBQUksZUFBUSxDQUFDLDBCQUFhLEVBQUUsRUFBQyxXQUFXLEVBQUUsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsa0JBQWtCLEVBQWxCLENBQWtCLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBRW5HOzs7ZUFHRztZQUtIO2dCQUdFLDRCQUFvQyxTQUFpQjtvQkFDbkQsSUFBSSxDQUFDLFVBQVUsR0FBRyx1QkFBVSxDQUFDLFNBQVMsQ0FBQyxvQkFBYSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDaEYsQ0FBQztnQkFFRCxxQ0FBUSxHQUFSLFVBQVMsQ0FBa0IsSUFBMEIsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQVhuRjtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSx3RUFBd0U7d0JBQ2xGLFNBQVMsRUFBRSxDQUFDLG9CQUFvQixDQUFDO3FCQUNsQyxDQUFDOytCQUlhLGdCQUFTLENBQUMsV0FBVyxDQUFDOztzQ0FKbkM7Z0JBU0YseUJBQUM7WUFBRCxDQVJBLEFBUUMsSUFBQTtZQVJELG1EQVFDLENBQUE7WUFFRDs7Ozs7O2VBTUc7WUFDRyxvQkFBb0IsR0FBRyxpQkFBVSxDQUNuQyxJQUFJLGVBQVEsQ0FBQywwQkFBYSxFQUFFLEVBQUMsV0FBVyxFQUFFLGlCQUFVLENBQUMsY0FBTSxPQUFBLGtCQUFrQixFQUFsQixDQUFrQixDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQztZQUVuRzs7O2VBR0c7WUFLSDtnQkFHRSw0QkFBb0MsU0FBaUI7b0JBQ25ELElBQUksQ0FBQyxVQUFVLEdBQUcsdUJBQVUsQ0FBQyxTQUFTLENBQUMsb0JBQWEsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hGLENBQUM7Z0JBRUQscUNBQVEsR0FBUixVQUFTLENBQWtCLElBQTBCLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFYbkY7b0JBQUMsZ0JBQVMsQ0FBQzt3QkFDVCxRQUFRLEVBQUUsd0VBQXdFO3dCQUNsRixTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztxQkFDbEMsQ0FBQzsrQkFJYSxnQkFBUyxDQUFDLFdBQVcsQ0FBQzs7c0NBSm5DO2dCQVNGLHlCQUFDO1lBQUQsQ0FSQSxBQVFDLElBQUE7WUFSRCxtREFRQyxDQUFBO1lBR0Q7Ozs7Ozs7Ozs7O2VBV0c7WUFDRyxpQkFBaUIsR0FBRyxpQkFBVSxDQUNoQyxJQUFJLGVBQVEsQ0FBQywwQkFBYSxFQUFFLEVBQUMsV0FBVyxFQUFFLGlCQUFVLENBQUMsY0FBTSxPQUFBLGdCQUFnQixFQUFoQixDQUFnQixDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQztZQUtqRztnQkFHRSwwQkFBa0MsT0FBZTtvQkFDL0MsSUFBSSxDQUFDLFVBQVUsR0FBRyx1QkFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDaEQsQ0FBQztnQkFFRCxtQ0FBUSxHQUFSLFVBQVMsQ0FBa0IsSUFBMEIsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQVhuRjtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSxrRUFBa0U7d0JBQzVFLFNBQVMsRUFBRSxDQUFDLGlCQUFpQixDQUFDO3FCQUMvQixDQUFDOytCQUlhLGdCQUFTLENBQUMsU0FBUyxDQUFDOztvQ0FKakM7Z0JBU0YsdUJBQUM7WUFBRCxDQVJBLEFBUUMsSUFBQTtZQVJELCtDQVFDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL3ZhbGlkYXRvcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2ZvcndhcmRSZWYsIFByb3ZpZGVyLCBBdHRyaWJ1dGUsIERpcmVjdGl2ZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0NPTlNUX0VYUFIsIE51bWJlcldyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge1ZhbGlkYXRvcnMsIE5HX1ZBTElEQVRPUlN9IGZyb20gJy4uL3ZhbGlkYXRvcnMnO1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2x9IGZyb20gJy4uL21vZGVsJztcbmltcG9ydCAqIGFzIG1vZGVsTW9kdWxlIGZyb20gJy4uL21vZGVsJztcblxuXG5cbi8qKlxuICogQW4gaW50ZXJmYWNlIHRoYXQgY2FuIGJlIGltcGxlbWVudGVkIGJ5IGNsYXNzZXMgdGhhdCBjYW4gYWN0IGFzIHZhbGlkYXRvcnMuXG4gKlxuICogIyMgVXNhZ2VcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBARGlyZWN0aXZlKHtcbiAqICAgc2VsZWN0b3I6ICdbY3VzdG9tLXZhbGlkYXRvcl0nLFxuICogICBwcm92aWRlcnM6IFtwcm92aWRlKE5HX1ZBTElEQVRPUlMsIHt1c2VFeGlzdGluZzogQ3VzdG9tVmFsaWRhdG9yRGlyZWN0aXZlLCBtdWx0aTogdHJ1ZX0pXVxuICogfSlcbiAqIGNsYXNzIEN1c3RvbVZhbGlkYXRvckRpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XG4gKiAgIHZhbGlkYXRlKGM6IENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gKiAgICAgcmV0dXJuIHtcImN1c3RvbVwiOiB0cnVlfTtcbiAqICAgfVxuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVmFsaWRhdG9yIHsgdmFsaWRhdGUoYzogbW9kZWxNb2R1bGUuQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX07IH1cblxuY29uc3QgUkVRVUlSRUQgPSBWYWxpZGF0b3JzLnJlcXVpcmVkO1xuXG5jb25zdCBSRVFVSVJFRF9WQUxJREFUT1IgPVxuICAgIENPTlNUX0VYUFIobmV3IFByb3ZpZGVyKE5HX1ZBTElEQVRPUlMsIHt1c2VWYWx1ZTogUkVRVUlSRUQsIG11bHRpOiB0cnVlfSkpO1xuXG4vKipcbiAqIEEgRGlyZWN0aXZlIHRoYXQgYWRkcyB0aGUgYHJlcXVpcmVkYCB2YWxpZGF0b3IgdG8gYW55IGNvbnRyb2xzIG1hcmtlZCB3aXRoIHRoZVxuICogYHJlcXVpcmVkYCBhdHRyaWJ1dGUsIHZpYSB0aGUge0BsaW5rIE5HX1ZBTElEQVRPUlN9IGJpbmRpbmcuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGBcbiAqIDxpbnB1dCBuZ0NvbnRyb2w9XCJmdWxsTmFtZVwiIHJlcXVpcmVkPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tyZXF1aXJlZF1bbmdDb250cm9sXSxbcmVxdWlyZWRdW25nRm9ybUNvbnRyb2xdLFtyZXF1aXJlZF1bbmdNb2RlbF0nLFxuICBwcm92aWRlcnM6IFtSRVFVSVJFRF9WQUxJREFUT1JdXG59KVxuZXhwb3J0IGNsYXNzIFJlcXVpcmVkVmFsaWRhdG9yIHtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBWYWxpZGF0b3JGbiB7IChjOiBBYnN0cmFjdENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYW55fTsgfVxuZXhwb3J0IGludGVyZmFjZSBBc3luY1ZhbGlkYXRvckZuIHtcbiAgKGM6IEFic3RyYWN0Q29udHJvbCk6IGFueSAvKlByb21pc2U8e1trZXk6IHN0cmluZ106IGFueX0+fE9ic2VydmFibGU8e1trZXk6IHN0cmluZ106IGFueX0+Ki87XG59XG5cbi8qKlxuICogUHJvdml2ZGVyIHdoaWNoIGFkZHMge0BsaW5rIE1pbkxlbmd0aFZhbGlkYXRvcn0gdG8ge0BsaW5rIE5HX1ZBTElEQVRPUlN9LlxuICpcbiAqICMjIEV4YW1wbGU6XG4gKlxuICoge0BleGFtcGxlIGNvbW1vbi9mb3Jtcy90cy92YWxpZGF0b3JzL3ZhbGlkYXRvcnMudHMgcmVnaW9uPSdtaW4nfVxuICovXG5jb25zdCBNSU5fTEVOR1RIX1ZBTElEQVRPUiA9IENPTlNUX0VYUFIoXG4gICAgbmV3IFByb3ZpZGVyKE5HX1ZBTElEQVRPUlMsIHt1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNaW5MZW5ndGhWYWxpZGF0b3IpLCBtdWx0aTogdHJ1ZX0pKTtcblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB3aGljaCBpbnN0YWxscyB0aGUge0BsaW5rIE1pbkxlbmd0aFZhbGlkYXRvcn0gZm9yIGFueSBgbmdDb250cm9sYCxcbiAqIGBuZ0Zvcm1Db250cm9sYCwgb3IgY29udHJvbCB3aXRoIGBuZ01vZGVsYCB0aGF0IGFsc28gaGFzIGEgYG1pbmxlbmd0aGAgYXR0cmlidXRlLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWlubGVuZ3RoXVtuZ0NvbnRyb2xdLFttaW5sZW5ndGhdW25nRm9ybUNvbnRyb2xdLFttaW5sZW5ndGhdW25nTW9kZWxdJyxcbiAgcHJvdmlkZXJzOiBbTUlOX0xFTkdUSF9WQUxJREFUT1JdXG59KVxuZXhwb3J0IGNsYXNzIE1pbkxlbmd0aFZhbGlkYXRvciBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XG4gIHByaXZhdGUgX3ZhbGlkYXRvcjogVmFsaWRhdG9yRm47XG5cbiAgY29uc3RydWN0b3IoQEF0dHJpYnV0ZShcIm1pbmxlbmd0aFwiKSBtaW5MZW5ndGg6IHN0cmluZykge1xuICAgIHRoaXMuX3ZhbGlkYXRvciA9IFZhbGlkYXRvcnMubWluTGVuZ3RoKE51bWJlcldyYXBwZXIucGFyc2VJbnQobWluTGVuZ3RoLCAxMCkpO1xuICB9XG5cbiAgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX0geyByZXR1cm4gdGhpcy5fdmFsaWRhdG9yKGMpOyB9XG59XG5cbi8qKlxuICogUHJvdmlkZXIgd2hpY2ggYWRkcyB7QGxpbmsgTWF4TGVuZ3RoVmFsaWRhdG9yfSB0byB7QGxpbmsgTkdfVkFMSURBVE9SU30uXG4gKlxuICogIyMgRXhhbXBsZTpcbiAqXG4gKiB7QGV4YW1wbGUgY29tbW9uL2Zvcm1zL3RzL3ZhbGlkYXRvcnMvdmFsaWRhdG9ycy50cyByZWdpb249J21heCd9XG4gKi9cbmNvbnN0IE1BWF9MRU5HVEhfVkFMSURBVE9SID0gQ09OU1RfRVhQUihcbiAgICBuZXcgUHJvdmlkZXIoTkdfVkFMSURBVE9SUywge3VzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1heExlbmd0aFZhbGlkYXRvciksIG11bHRpOiB0cnVlfSkpO1xuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHdoaWNoIGluc3RhbGxzIHRoZSB7QGxpbmsgTWF4TGVuZ3RoVmFsaWRhdG9yfSBmb3IgYW55IGBuZ0NvbnRyb2wsIGBuZ0Zvcm1Db250cm9sYCxcbiAqIG9yIGNvbnRyb2wgd2l0aCBgbmdNb2RlbGAgdGhhdCBhbHNvIGhhcyBhIGBtYXhsZW5ndGhgIGF0dHJpYnV0ZS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21heGxlbmd0aF1bbmdDb250cm9sXSxbbWF4bGVuZ3RoXVtuZ0Zvcm1Db250cm9sXSxbbWF4bGVuZ3RoXVtuZ01vZGVsXScsXG4gIHByb3ZpZGVyczogW01BWF9MRU5HVEhfVkFMSURBVE9SXVxufSlcbmV4cG9ydCBjbGFzcyBNYXhMZW5ndGhWYWxpZGF0b3IgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xuICBwcml2YXRlIF92YWxpZGF0b3I6IFZhbGlkYXRvckZuO1xuXG4gIGNvbnN0cnVjdG9yKEBBdHRyaWJ1dGUoXCJtYXhsZW5ndGhcIikgbWF4TGVuZ3RoOiBzdHJpbmcpIHtcbiAgICB0aGlzLl92YWxpZGF0b3IgPSBWYWxpZGF0b3JzLm1heExlbmd0aChOdW1iZXJXcmFwcGVyLnBhcnNlSW50KG1heExlbmd0aCwgMTApKTtcbiAgfVxuXG4gIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHsgcmV0dXJuIHRoaXMuX3ZhbGlkYXRvcihjKTsgfVxufVxuXG5cbi8qKlxuICogQSBEaXJlY3RpdmUgdGhhdCBhZGRzIHRoZSBgcGF0dGVybmAgdmFsaWRhdG9yIHRvIGFueSBjb250cm9scyBtYXJrZWQgd2l0aCB0aGVcbiAqIGBwYXR0ZXJuYCBhdHRyaWJ1dGUsIHZpYSB0aGUge0BsaW5rIE5HX1ZBTElEQVRPUlN9IGJpbmRpbmcuIFVzZXMgYXR0cmlidXRlIHZhbHVlXG4gKiBhcyB0aGUgcmVnZXggdG8gdmFsaWRhdGUgQ29udHJvbCB2YWx1ZSBhZ2FpbnN0LiAgRm9sbG93cyBwYXR0ZXJuIGF0dHJpYnV0ZVxuICogc2VtYW50aWNzOyBpLmUuIHJlZ2V4IG11c3QgbWF0Y2ggZW50aXJlIENvbnRyb2wgdmFsdWUuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGBcbiAqIDxpbnB1dCBbbmdDb250cm9sXT1cImZ1bGxOYW1lXCIgcGF0dGVybj1cIlthLXpBLVogXSpcIj5cbiAqIGBgYFxuICovXG5jb25zdCBQQVRURVJOX1ZBTElEQVRPUiA9IENPTlNUX0VYUFIoXG4gICAgbmV3IFByb3ZpZGVyKE5HX1ZBTElEQVRPUlMsIHt1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBQYXR0ZXJuVmFsaWRhdG9yKSwgbXVsdGk6IHRydWV9KSk7XG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcGF0dGVybl1bbmdDb250cm9sXSxbcGF0dGVybl1bbmdGb3JtQ29udHJvbF0sW3BhdHRlcm5dW25nTW9kZWxdJyxcbiAgcHJvdmlkZXJzOiBbUEFUVEVSTl9WQUxJREFUT1JdXG59KVxuZXhwb3J0IGNsYXNzIFBhdHRlcm5WYWxpZGF0b3IgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xuICBwcml2YXRlIF92YWxpZGF0b3I6IFZhbGlkYXRvckZuO1xuXG4gIGNvbnN0cnVjdG9yKEBBdHRyaWJ1dGUoXCJwYXR0ZXJuXCIpIHBhdHRlcm46IHN0cmluZykge1xuICAgIHRoaXMuX3ZhbGlkYXRvciA9IFZhbGlkYXRvcnMucGF0dGVybihwYXR0ZXJuKTtcbiAgfVxuXG4gIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHsgcmV0dXJuIHRoaXMuX3ZhbGlkYXRvcihjKTsgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
