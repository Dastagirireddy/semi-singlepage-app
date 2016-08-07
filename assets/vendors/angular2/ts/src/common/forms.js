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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZm9ybXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQXdEYSxjQUFjLEVBT2QsYUFBYTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQWhCMUI7Ozs7Ozs7O2VBUUc7WUFDVSw0QkFBQSxjQUFjLEdBQVcsaUJBQVUsQ0FBQyxDQUFDLDBCQUFXLEVBQUUsbURBQW9CLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFFdEY7Ozs7ZUFJRztZQUNVLDJCQUFBLGFBQWEsR0FBRyxjQUFjLENBQUEsQ0FBQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tbW9uL2Zvcm1zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbW9kdWxlXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoaXMgbW9kdWxlIGlzIHVzZWQgZm9yIGhhbmRsaW5nIHVzZXIgaW5wdXQsIGJ5IGRlZmluaW5nIGFuZCBidWlsZGluZyBhIHtAbGluayBDb250cm9sR3JvdXB9IHRoYXRcbiAqIGNvbnNpc3RzIG9mXG4gKiB7QGxpbmsgQ29udHJvbH0gb2JqZWN0cywgYW5kIG1hcHBpbmcgdGhlbSBvbnRvIHRoZSBET00uIHtAbGluayBDb250cm9sfSBvYmplY3RzIGNhbiB0aGVuIGJlIHVzZWRcbiAqIHRvIHJlYWQgaW5mb3JtYXRpb25cbiAqIGZyb20gdGhlIGZvcm0gRE9NIGVsZW1lbnRzLlxuICpcbiAqIFRoaXMgbW9kdWxlIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGUgYGFuZ3VsYXIyYCBtb2R1bGU7IHlvdSBtdXN0IGltcG9ydCB0aGUgZm9ybXMgbW9kdWxlXG4gKiBleHBsaWNpdGx5LlxuICpcbiAqL1xuZXhwb3J0IHtBYnN0cmFjdENvbnRyb2wsIENvbnRyb2wsIENvbnRyb2xHcm91cCwgQ29udHJvbEFycmF5fSBmcm9tICcuL2Zvcm1zL21vZGVsJztcblxuZXhwb3J0IHtBYnN0cmFjdENvbnRyb2xEaXJlY3RpdmV9IGZyb20gJy4vZm9ybXMvZGlyZWN0aXZlcy9hYnN0cmFjdF9jb250cm9sX2RpcmVjdGl2ZSc7XG5leHBvcnQge0Zvcm19IGZyb20gJy4vZm9ybXMvZGlyZWN0aXZlcy9mb3JtX2ludGVyZmFjZSc7XG5leHBvcnQge0NvbnRyb2xDb250YWluZXJ9IGZyb20gJy4vZm9ybXMvZGlyZWN0aXZlcy9jb250cm9sX2NvbnRhaW5lcic7XG5leHBvcnQge05nQ29udHJvbE5hbWV9IGZyb20gJy4vZm9ybXMvZGlyZWN0aXZlcy9uZ19jb250cm9sX25hbWUnO1xuZXhwb3J0IHtOZ0Zvcm1Db250cm9sfSBmcm9tICcuL2Zvcm1zL2RpcmVjdGl2ZXMvbmdfZm9ybV9jb250cm9sJztcbmV4cG9ydCB7TmdNb2RlbH0gZnJvbSAnLi9mb3Jtcy9kaXJlY3RpdmVzL25nX21vZGVsJztcbmV4cG9ydCB7TmdDb250cm9sfSBmcm9tICcuL2Zvcm1zL2RpcmVjdGl2ZXMvbmdfY29udHJvbCc7XG5leHBvcnQge05nQ29udHJvbEdyb3VwfSBmcm9tICcuL2Zvcm1zL2RpcmVjdGl2ZXMvbmdfY29udHJvbF9ncm91cCc7XG5leHBvcnQge05nRm9ybU1vZGVsfSBmcm9tICcuL2Zvcm1zL2RpcmVjdGl2ZXMvbmdfZm9ybV9tb2RlbCc7XG5leHBvcnQge05nRm9ybX0gZnJvbSAnLi9mb3Jtcy9kaXJlY3RpdmVzL25nX2Zvcm0nO1xuZXhwb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJy4vZm9ybXMvZGlyZWN0aXZlcy9jb250cm9sX3ZhbHVlX2FjY2Vzc29yJztcbmV4cG9ydCB7RGVmYXVsdFZhbHVlQWNjZXNzb3J9IGZyb20gJy4vZm9ybXMvZGlyZWN0aXZlcy9kZWZhdWx0X3ZhbHVlX2FjY2Vzc29yJztcbmV4cG9ydCB7TmdDb250cm9sU3RhdHVzfSBmcm9tICcuL2Zvcm1zL2RpcmVjdGl2ZXMvbmdfY29udHJvbF9zdGF0dXMnO1xuZXhwb3J0IHtDaGVja2JveENvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL2Zvcm1zL2RpcmVjdGl2ZXMvY2hlY2tib3hfdmFsdWVfYWNjZXNzb3InO1xuZXhwb3J0IHtcbiAgTmdTZWxlY3RPcHRpb24sXG4gIFNlbGVjdENvbnRyb2xWYWx1ZUFjY2Vzc29yXG59IGZyb20gJy4vZm9ybXMvZGlyZWN0aXZlcy9zZWxlY3RfY29udHJvbF92YWx1ZV9hY2Nlc3Nvcic7XG5leHBvcnQge0ZPUk1fRElSRUNUSVZFUywgUmFkaW9CdXR0b25TdGF0ZX0gZnJvbSAnLi9mb3Jtcy9kaXJlY3RpdmVzJztcbmV4cG9ydCB7TkdfVkFMSURBVE9SUywgTkdfQVNZTkNfVkFMSURBVE9SUywgVmFsaWRhdG9yc30gZnJvbSAnLi9mb3Jtcy92YWxpZGF0b3JzJztcbmV4cG9ydCB7XG4gIFJlcXVpcmVkVmFsaWRhdG9yLFxuICBNaW5MZW5ndGhWYWxpZGF0b3IsXG4gIE1heExlbmd0aFZhbGlkYXRvcixcbiAgUGF0dGVyblZhbGlkYXRvcixcbiAgVmFsaWRhdG9yXG59IGZyb20gJy4vZm9ybXMvZGlyZWN0aXZlcy92YWxpZGF0b3JzJztcbmV4cG9ydCB7Rm9ybUJ1aWxkZXJ9IGZyb20gJy4vZm9ybXMvZm9ybV9idWlsZGVyJztcbmltcG9ydCB7Rm9ybUJ1aWxkZXJ9IGZyb20gJy4vZm9ybXMvZm9ybV9idWlsZGVyJztcbmltcG9ydCB7UmFkaW9Db250cm9sUmVnaXN0cnl9IGZyb20gJy4vZm9ybXMvZGlyZWN0aXZlcy9yYWRpb19jb250cm9sX3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7VHlwZSwgQ09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuLyoqXG4gKiBTaG9ydGhhbmQgc2V0IG9mIHByb3ZpZGVycyB1c2VkIGZvciBidWlsZGluZyBBbmd1bGFyIGZvcm1zLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogYm9vdHN0cmFwKE15QXBwLCBbRk9STV9QUk9WSURFUlNdKTtcbiAqIGBgYFxuICovXG5leHBvcnQgY29uc3QgRk9STV9QUk9WSURFUlM6IFR5cGVbXSA9IENPTlNUX0VYUFIoW0Zvcm1CdWlsZGVyLCBSYWRpb0NvbnRyb2xSZWdpc3RyeV0pO1xuXG4vKipcbiAqIFNlZSB7QGxpbmsgRk9STV9QUk9WSURFUlN9IGluc3RlYWQuXG4gKlxuICogQGRlcHJlY2F0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IEZPUk1fQklORElOR1MgPSBGT1JNX1BST1ZJREVSUztcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
