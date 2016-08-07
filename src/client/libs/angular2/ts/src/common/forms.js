System.register(['./forms/model', './forms/directives/abstract_control_directive', './forms/directives/control_container', './forms/directives/ng_control_name', './forms/directives/ng_form_control', './forms/directives/ng_model', './forms/directives/ng_control', './forms/directives/ng_control_group', './forms/directives/ng_form_model', './forms/directives/ng_form', './forms/directives/control_value_accessor', './forms/directives/default_value_accessor', './forms/directives/ng_control_status', './forms/directives/checkbox_value_accessor', './forms/directives/select_control_value_accessor', './forms/directives', './forms/validators', './forms/directives/validators', './forms/form_builder', './forms/directives/radio_control_value_accessor', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var form_builder_1, radio_control_value_accessor_1, lang_1;
    var FORM_PROVIDERS, FORM_BINDINGS;
    return {
        setters:[
            function (model_1_1) {
                exports_1({
                    "AbstractControl": model_1_1["AbstractControl"],
                    "Control": model_1_1["Control"],
                    "ControlGroup": model_1_1["ControlGroup"],
                    "ControlArray": model_1_1["ControlArray"]
                });
            },
            function (abstract_control_directive_1_1) {
                exports_1({
                    "AbstractControlDirective": abstract_control_directive_1_1["AbstractControlDirective"]
                });
            },
            function (control_container_1_1) {
                exports_1({
                    "ControlContainer": control_container_1_1["ControlContainer"]
                });
            },
            function (ng_control_name_1_1) {
                exports_1({
                    "NgControlName": ng_control_name_1_1["NgControlName"]
                });
            },
            function (ng_form_control_1_1) {
                exports_1({
                    "NgFormControl": ng_form_control_1_1["NgFormControl"]
                });
            },
            function (ng_model_1_1) {
                exports_1({
                    "NgModel": ng_model_1_1["NgModel"]
                });
            },
            function (ng_control_1_1) {
                exports_1({
                    "NgControl": ng_control_1_1["NgControl"]
                });
            },
            function (ng_control_group_1_1) {
                exports_1({
                    "NgControlGroup": ng_control_group_1_1["NgControlGroup"]
                });
            },
            function (ng_form_model_1_1) {
                exports_1({
                    "NgFormModel": ng_form_model_1_1["NgFormModel"]
                });
            },
            function (ng_form_1_1) {
                exports_1({
                    "NgForm": ng_form_1_1["NgForm"]
                });
            },
            function (control_value_accessor_1_1) {
                exports_1({
                    "ControlValueAccessor": control_value_accessor_1_1["ControlValueAccessor"],
                    "NG_VALUE_ACCESSOR": control_value_accessor_1_1["NG_VALUE_ACCESSOR"]
                });
            },
            function (default_value_accessor_1_1) {
                exports_1({
                    "DefaultValueAccessor": default_value_accessor_1_1["DefaultValueAccessor"]
                });
            },
            function (ng_control_status_1_1) {
                exports_1({
                    "NgControlStatus": ng_control_status_1_1["NgControlStatus"]
                });
            },
            function (checkbox_value_accessor_1_1) {
                exports_1({
                    "CheckboxControlValueAccessor": checkbox_value_accessor_1_1["CheckboxControlValueAccessor"]
                });
            },
            function (select_control_value_accessor_1_1) {
                exports_1({
                    "NgSelectOption": select_control_value_accessor_1_1["NgSelectOption"],
                    "SelectControlValueAccessor": select_control_value_accessor_1_1["SelectControlValueAccessor"]
                });
            },
            function (directives_1_1) {
                exports_1({
                    "FORM_DIRECTIVES": directives_1_1["FORM_DIRECTIVES"],
                    "RadioButtonState": directives_1_1["RadioButtonState"]
                });
            },
            function (validators_1_1) {
                exports_1({
                    "NG_VALIDATORS": validators_1_1["NG_VALIDATORS"],
                    "NG_ASYNC_VALIDATORS": validators_1_1["NG_ASYNC_VALIDATORS"],
                    "Validators": validators_1_1["Validators"]
                });
            },
            function (validators_2_1) {
                exports_1({
                    "RequiredValidator": validators_2_1["RequiredValidator"],
                    "MinLengthValidator": validators_2_1["MinLengthValidator"],
                    "MaxLengthValidator": validators_2_1["MaxLengthValidator"],
                    "PatternValidator": validators_2_1["PatternValidator"],
                    "Validator": validators_2_1["Validator"]
                });
            },
            function (form_builder_2_1) {
                exports_1({
                    "FormBuilder": form_builder_2_1["FormBuilder"]
                });
                form_builder_1 = form_builder_2_1;
            },
            function (radio_control_value_accessor_1_1) {
                radio_control_value_accessor_1 = radio_control_value_accessor_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * Shorthand set of providers used for building Angular forms.
             *
             * ### Example
             *
             * ```typescript
             * bootstrap(MyApp, [FORM_PROVIDERS]);
             * ```
             */
            exports_1("FORM_PROVIDERS", FORM_PROVIDERS = lang_1.CONST_EXPR([form_builder_1.FormBuilder, radio_control_value_accessor_1.RadioControlRegistry]));
            /**
             * See {@link FORM_PROVIDERS} instead.
             *
             * @deprecated
             */
            exports_1("FORM_BINDINGS", FORM_BINDINGS = FORM_PROVIDERS);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBd0RhLGNBQWMsRUFPZCxhQUFhOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBaEIxQjs7Ozs7Ozs7ZUFRRztZQUNVLDRCQUFBLGNBQWMsR0FBVyxpQkFBVSxDQUFDLENBQUMsMEJBQVcsRUFBRSxtREFBb0IsQ0FBQyxDQUFDLENBQUEsQ0FBQztZQUV0Rjs7OztlQUlHO1lBQ1UsMkJBQUEsYUFBYSxHQUFHLGNBQWMsQ0FBQSxDQUFDIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQG1vZHVsZVxuICogQGRlc2NyaXB0aW9uXG4gKiBUaGlzIG1vZHVsZSBpcyB1c2VkIGZvciBoYW5kbGluZyB1c2VyIGlucHV0LCBieSBkZWZpbmluZyBhbmQgYnVpbGRpbmcgYSB7QGxpbmsgQ29udHJvbEdyb3VwfSB0aGF0XG4gKiBjb25zaXN0cyBvZlxuICoge0BsaW5rIENvbnRyb2x9IG9iamVjdHMsIGFuZCBtYXBwaW5nIHRoZW0gb250byB0aGUgRE9NLiB7QGxpbmsgQ29udHJvbH0gb2JqZWN0cyBjYW4gdGhlbiBiZSB1c2VkXG4gKiB0byByZWFkIGluZm9ybWF0aW9uXG4gKiBmcm9tIHRoZSBmb3JtIERPTSBlbGVtZW50cy5cbiAqXG4gKiBUaGlzIG1vZHVsZSBpcyBub3QgaW5jbHVkZWQgaW4gdGhlIGBhbmd1bGFyMmAgbW9kdWxlOyB5b3UgbXVzdCBpbXBvcnQgdGhlIGZvcm1zIG1vZHVsZVxuICogZXhwbGljaXRseS5cbiAqXG4gKi9cbmV4cG9ydCB7QWJzdHJhY3RDb250cm9sLCBDb250cm9sLCBDb250cm9sR3JvdXAsIENvbnRyb2xBcnJheX0gZnJvbSAnLi9mb3Jtcy9tb2RlbCc7XG5cbmV4cG9ydCB7QWJzdHJhY3RDb250cm9sRGlyZWN0aXZlfSBmcm9tICcuL2Zvcm1zL2RpcmVjdGl2ZXMvYWJzdHJhY3RfY29udHJvbF9kaXJlY3RpdmUnO1xuZXhwb3J0IHtGb3JtfSBmcm9tICcuL2Zvcm1zL2RpcmVjdGl2ZXMvZm9ybV9pbnRlcmZhY2UnO1xuZXhwb3J0IHtDb250cm9sQ29udGFpbmVyfSBmcm9tICcuL2Zvcm1zL2RpcmVjdGl2ZXMvY29udHJvbF9jb250YWluZXInO1xuZXhwb3J0IHtOZ0NvbnRyb2xOYW1lfSBmcm9tICcuL2Zvcm1zL2RpcmVjdGl2ZXMvbmdfY29udHJvbF9uYW1lJztcbmV4cG9ydCB7TmdGb3JtQ29udHJvbH0gZnJvbSAnLi9mb3Jtcy9kaXJlY3RpdmVzL25nX2Zvcm1fY29udHJvbCc7XG5leHBvcnQge05nTW9kZWx9IGZyb20gJy4vZm9ybXMvZGlyZWN0aXZlcy9uZ19tb2RlbCc7XG5leHBvcnQge05nQ29udHJvbH0gZnJvbSAnLi9mb3Jtcy9kaXJlY3RpdmVzL25nX2NvbnRyb2wnO1xuZXhwb3J0IHtOZ0NvbnRyb2xHcm91cH0gZnJvbSAnLi9mb3Jtcy9kaXJlY3RpdmVzL25nX2NvbnRyb2xfZ3JvdXAnO1xuZXhwb3J0IHtOZ0Zvcm1Nb2RlbH0gZnJvbSAnLi9mb3Jtcy9kaXJlY3RpdmVzL25nX2Zvcm1fbW9kZWwnO1xuZXhwb3J0IHtOZ0Zvcm19IGZyb20gJy4vZm9ybXMvZGlyZWN0aXZlcy9uZ19mb3JtJztcbmV4cG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICcuL2Zvcm1zL2RpcmVjdGl2ZXMvY29udHJvbF92YWx1ZV9hY2Nlc3Nvcic7XG5leHBvcnQge0RlZmF1bHRWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL2Zvcm1zL2RpcmVjdGl2ZXMvZGVmYXVsdF92YWx1ZV9hY2Nlc3Nvcic7XG5leHBvcnQge05nQ29udHJvbFN0YXR1c30gZnJvbSAnLi9mb3Jtcy9kaXJlY3RpdmVzL25nX2NvbnRyb2xfc3RhdHVzJztcbmV4cG9ydCB7Q2hlY2tib3hDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9mb3Jtcy9kaXJlY3RpdmVzL2NoZWNrYm94X3ZhbHVlX2FjY2Vzc29yJztcbmV4cG9ydCB7XG4gIE5nU2VsZWN0T3B0aW9uLFxuICBTZWxlY3RDb250cm9sVmFsdWVBY2Nlc3NvclxufSBmcm9tICcuL2Zvcm1zL2RpcmVjdGl2ZXMvc2VsZWN0X2NvbnRyb2xfdmFsdWVfYWNjZXNzb3InO1xuZXhwb3J0IHtGT1JNX0RJUkVDVElWRVMsIFJhZGlvQnV0dG9uU3RhdGV9IGZyb20gJy4vZm9ybXMvZGlyZWN0aXZlcyc7XG5leHBvcnQge05HX1ZBTElEQVRPUlMsIE5HX0FTWU5DX1ZBTElEQVRPUlMsIFZhbGlkYXRvcnN9IGZyb20gJy4vZm9ybXMvdmFsaWRhdG9ycyc7XG5leHBvcnQge1xuICBSZXF1aXJlZFZhbGlkYXRvcixcbiAgTWluTGVuZ3RoVmFsaWRhdG9yLFxuICBNYXhMZW5ndGhWYWxpZGF0b3IsXG4gIFBhdHRlcm5WYWxpZGF0b3IsXG4gIFZhbGlkYXRvclxufSBmcm9tICcuL2Zvcm1zL2RpcmVjdGl2ZXMvdmFsaWRhdG9ycyc7XG5leHBvcnQge0Zvcm1CdWlsZGVyfSBmcm9tICcuL2Zvcm1zL2Zvcm1fYnVpbGRlcic7XG5pbXBvcnQge0Zvcm1CdWlsZGVyfSBmcm9tICcuL2Zvcm1zL2Zvcm1fYnVpbGRlcic7XG5pbXBvcnQge1JhZGlvQ29udHJvbFJlZ2lzdHJ5fSBmcm9tICcuL2Zvcm1zL2RpcmVjdGl2ZXMvcmFkaW9fY29udHJvbF92YWx1ZV9hY2Nlc3Nvcic7XG5pbXBvcnQge1R5cGUsIENPTlNUX0VYUFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbi8qKlxuICogU2hvcnRoYW5kIHNldCBvZiBwcm92aWRlcnMgdXNlZCBmb3IgYnVpbGRpbmcgQW5ndWxhciBmb3Jtcy5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGJvb3RzdHJhcChNeUFwcCwgW0ZPUk1fUFJPVklERVJTXSk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNvbnN0IEZPUk1fUFJPVklERVJTOiBUeXBlW10gPSBDT05TVF9FWFBSKFtGb3JtQnVpbGRlciwgUmFkaW9Db250cm9sUmVnaXN0cnldKTtcblxuLyoqXG4gKiBTZWUge0BsaW5rIEZPUk1fUFJPVklERVJTfSBpbnN0ZWFkLlxuICpcbiAqIEBkZXByZWNhdGVkXG4gKi9cbmV4cG9ydCBjb25zdCBGT1JNX0JJTkRJTkdTID0gRk9STV9QUk9WSURFUlM7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
