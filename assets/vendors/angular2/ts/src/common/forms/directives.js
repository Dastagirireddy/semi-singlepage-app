System.register(['angular2/src/facade/lang', './directives/ng_control_name', './directives/ng_form_control', './directives/ng_model', './directives/ng_control_group', './directives/ng_form_model', './directives/ng_form', './directives/default_value_accessor', './directives/checkbox_value_accessor', './directives/number_value_accessor', './directives/radio_control_value_accessor', './directives/ng_control_status', './directives/select_control_value_accessor', './directives/validators', './directives/ng_control'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, ng_control_name_1, ng_form_control_1, ng_model_1, ng_control_group_1, ng_form_model_1, ng_form_1, default_value_accessor_1, checkbox_value_accessor_1, number_value_accessor_1, radio_control_value_accessor_1, ng_control_status_1, select_control_value_accessor_1, validators_1;
    var FORM_DIRECTIVES;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (ng_control_name_1_1) {
                ng_control_name_1 = ng_control_name_1_1;
                exports_1({
                    "NgControlName": ng_control_name_1_1["NgControlName"]
                });
            },
            function (ng_form_control_1_1) {
                ng_form_control_1 = ng_form_control_1_1;
                exports_1({
                    "NgFormControl": ng_form_control_1_1["NgFormControl"]
                });
            },
            function (ng_model_1_1) {
                ng_model_1 = ng_model_1_1;
                exports_1({
                    "NgModel": ng_model_1_1["NgModel"]
                });
            },
            function (ng_control_group_1_1) {
                ng_control_group_1 = ng_control_group_1_1;
                exports_1({
                    "NgControlGroup": ng_control_group_1_1["NgControlGroup"]
                });
            },
            function (ng_form_model_1_1) {
                ng_form_model_1 = ng_form_model_1_1;
                exports_1({
                    "NgFormModel": ng_form_model_1_1["NgFormModel"]
                });
            },
            function (ng_form_1_1) {
                ng_form_1 = ng_form_1_1;
                exports_1({
                    "NgForm": ng_form_1_1["NgForm"]
                });
            },
            function (default_value_accessor_1_1) {
                default_value_accessor_1 = default_value_accessor_1_1;
                exports_1({
                    "DefaultValueAccessor": default_value_accessor_1_1["DefaultValueAccessor"]
                });
            },
            function (checkbox_value_accessor_1_1) {
                checkbox_value_accessor_1 = checkbox_value_accessor_1_1;
                exports_1({
                    "CheckboxControlValueAccessor": checkbox_value_accessor_1_1["CheckboxControlValueAccessor"]
                });
            },
            function (number_value_accessor_1_1) {
                number_value_accessor_1 = number_value_accessor_1_1;
                exports_1({
                    "NumberValueAccessor": number_value_accessor_1_1["NumberValueAccessor"]
                });
            },
            function (radio_control_value_accessor_1_1) {
                radio_control_value_accessor_1 = radio_control_value_accessor_1_1;
                exports_1({
                    "RadioControlValueAccessor": radio_control_value_accessor_1_1["RadioControlValueAccessor"],
                    "RadioButtonState": radio_control_value_accessor_1_1["RadioButtonState"]
                });
            },
            function (ng_control_status_1_1) {
                ng_control_status_1 = ng_control_status_1_1;
                exports_1({
                    "NgControlStatus": ng_control_status_1_1["NgControlStatus"]
                });
            },
            function (select_control_value_accessor_1_1) {
                select_control_value_accessor_1 = select_control_value_accessor_1_1;
                exports_1({
                    "SelectControlValueAccessor": select_control_value_accessor_1_1["SelectControlValueAccessor"],
                    "NgSelectOption": select_control_value_accessor_1_1["NgSelectOption"]
                });
            },
            function (validators_1_1) {
                validators_1 = validators_1_1;
                exports_1({
                    "RequiredValidator": validators_1_1["RequiredValidator"],
                    "MinLengthValidator": validators_1_1["MinLengthValidator"],
                    "MaxLengthValidator": validators_1_1["MaxLengthValidator"],
                    "PatternValidator": validators_1_1["PatternValidator"]
                });
            },
            function (ng_control_1_1) {
                exports_1({
                    "NgControl": ng_control_1_1["NgControl"]
                });
            }],
        execute: function() {
            /**
             *
             * A list of all the form directives used as part of a `@Component` annotation.
             *
             *  This is a shorthand for importing them each individually.
             *
             * ### Example
             *
             * ```typescript
             * @Component({
             *   selector: 'my-app',
             *   directives: [FORM_DIRECTIVES]
             * })
             * class MyApp {}
             * ```
             */
            exports_1("FORM_DIRECTIVES", FORM_DIRECTIVES = lang_1.CONST_EXPR([
                ng_control_name_1.NgControlName,
                ng_control_group_1.NgControlGroup,
                ng_form_control_1.NgFormControl,
                ng_model_1.NgModel,
                ng_form_model_1.NgFormModel,
                ng_form_1.NgForm,
                select_control_value_accessor_1.NgSelectOption,
                default_value_accessor_1.DefaultValueAccessor,
                number_value_accessor_1.NumberValueAccessor,
                checkbox_value_accessor_1.CheckboxControlValueAccessor,
                select_control_value_accessor_1.SelectControlValueAccessor,
                radio_control_value_accessor_1.RadioControlValueAccessor,
                ng_control_status_1.NgControlStatus,
                validators_1.RequiredValidator,
                validators_1.MinLengthValidator,
                validators_1.MaxLengthValidator,
                validators_1.PatternValidator
            ]));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZm9ybXMvZGlyZWN0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBa0VhLGVBQWU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBaEI1Qjs7Ozs7Ozs7Ozs7Ozs7O2VBZUc7WUFDVSw2QkFBQSxlQUFlLEdBQVcsaUJBQVUsQ0FBQztnQkFDaEQsK0JBQWE7Z0JBQ2IsaUNBQWM7Z0JBRWQsK0JBQWE7Z0JBQ2Isa0JBQU87Z0JBQ1AsMkJBQVc7Z0JBQ1gsZ0JBQU07Z0JBRU4sOENBQWM7Z0JBQ2QsNkNBQW9CO2dCQUNwQiwyQ0FBbUI7Z0JBQ25CLHNEQUE0QjtnQkFDNUIsMERBQTBCO2dCQUMxQix3REFBeUI7Z0JBQ3pCLG1DQUFlO2dCQUVmLDhCQUFpQjtnQkFDakIsK0JBQWtCO2dCQUNsQiwrQkFBa0I7Z0JBQ2xCLDZCQUFnQjthQUNqQixDQUFDLENBQUEsQ0FBQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tbW9uL2Zvcm1zL2RpcmVjdGl2ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1R5cGUsIENPTlNUX0VYUFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge05nQ29udHJvbE5hbWV9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ19jb250cm9sX25hbWUnO1xuaW1wb3J0IHtOZ0Zvcm1Db250cm9sfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmdfZm9ybV9jb250cm9sJztcbmltcG9ydCB7TmdNb2RlbH0gZnJvbSAnLi9kaXJlY3RpdmVzL25nX21vZGVsJztcbmltcG9ydCB7TmdDb250cm9sR3JvdXB9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ19jb250cm9sX2dyb3VwJztcbmltcG9ydCB7TmdGb3JtTW9kZWx9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ19mb3JtX21vZGVsJztcbmltcG9ydCB7TmdGb3JtfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmdfZm9ybSc7XG5pbXBvcnQge0RlZmF1bHRWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL2RpcmVjdGl2ZXMvZGVmYXVsdF92YWx1ZV9hY2Nlc3Nvcic7XG5pbXBvcnQge0NoZWNrYm94Q29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJy4vZGlyZWN0aXZlcy9jaGVja2JveF92YWx1ZV9hY2Nlc3Nvcic7XG5pbXBvcnQge051bWJlclZhbHVlQWNjZXNzb3J9IGZyb20gJy4vZGlyZWN0aXZlcy9udW1iZXJfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtSYWRpb0NvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL2RpcmVjdGl2ZXMvcmFkaW9fY29udHJvbF92YWx1ZV9hY2Nlc3Nvcic7XG5pbXBvcnQge05nQ29udHJvbFN0YXR1c30gZnJvbSAnLi9kaXJlY3RpdmVzL25nX2NvbnRyb2xfc3RhdHVzJztcbmltcG9ydCB7XG4gIFNlbGVjdENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBOZ1NlbGVjdE9wdGlvblxufSBmcm9tICcuL2RpcmVjdGl2ZXMvc2VsZWN0X2NvbnRyb2xfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtcbiAgUmVxdWlyZWRWYWxpZGF0b3IsXG4gIE1pbkxlbmd0aFZhbGlkYXRvcixcbiAgTWF4TGVuZ3RoVmFsaWRhdG9yLFxuICBQYXR0ZXJuVmFsaWRhdG9yXG59IGZyb20gJy4vZGlyZWN0aXZlcy92YWxpZGF0b3JzJztcblxuZXhwb3J0IHtOZ0NvbnRyb2xOYW1lfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmdfY29udHJvbF9uYW1lJztcbmV4cG9ydCB7TmdGb3JtQ29udHJvbH0gZnJvbSAnLi9kaXJlY3RpdmVzL25nX2Zvcm1fY29udHJvbCc7XG5leHBvcnQge05nTW9kZWx9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ19tb2RlbCc7XG5leHBvcnQge05nQ29udHJvbEdyb3VwfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmdfY29udHJvbF9ncm91cCc7XG5leHBvcnQge05nRm9ybU1vZGVsfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmdfZm9ybV9tb2RlbCc7XG5leHBvcnQge05nRm9ybX0gZnJvbSAnLi9kaXJlY3RpdmVzL25nX2Zvcm0nO1xuZXhwb3J0IHtEZWZhdWx0VmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9kaXJlY3RpdmVzL2RlZmF1bHRfdmFsdWVfYWNjZXNzb3InO1xuZXhwb3J0IHtDaGVja2JveENvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL2RpcmVjdGl2ZXMvY2hlY2tib3hfdmFsdWVfYWNjZXNzb3InO1xuZXhwb3J0IHtcbiAgUmFkaW9Db250cm9sVmFsdWVBY2Nlc3NvcixcbiAgUmFkaW9CdXR0b25TdGF0ZVxufSBmcm9tICcuL2RpcmVjdGl2ZXMvcmFkaW9fY29udHJvbF92YWx1ZV9hY2Nlc3Nvcic7XG5leHBvcnQge051bWJlclZhbHVlQWNjZXNzb3J9IGZyb20gJy4vZGlyZWN0aXZlcy9udW1iZXJfdmFsdWVfYWNjZXNzb3InO1xuZXhwb3J0IHtOZ0NvbnRyb2xTdGF0dXN9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ19jb250cm9sX3N0YXR1cyc7XG5leHBvcnQge1xuICBTZWxlY3RDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgTmdTZWxlY3RPcHRpb25cbn0gZnJvbSAnLi9kaXJlY3RpdmVzL3NlbGVjdF9jb250cm9sX3ZhbHVlX2FjY2Vzc29yJztcbmV4cG9ydCB7XG4gIFJlcXVpcmVkVmFsaWRhdG9yLFxuICBNaW5MZW5ndGhWYWxpZGF0b3IsXG4gIE1heExlbmd0aFZhbGlkYXRvcixcbiAgUGF0dGVyblZhbGlkYXRvclxufSBmcm9tICcuL2RpcmVjdGl2ZXMvdmFsaWRhdG9ycyc7XG5leHBvcnQge05nQ29udHJvbH0gZnJvbSAnLi9kaXJlY3RpdmVzL25nX2NvbnRyb2wnO1xuZXhwb3J0IHtDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9kaXJlY3RpdmVzL2NvbnRyb2xfdmFsdWVfYWNjZXNzb3InO1xuXG4vKipcbiAqXG4gKiBBIGxpc3Qgb2YgYWxsIHRoZSBmb3JtIGRpcmVjdGl2ZXMgdXNlZCBhcyBwYXJ0IG9mIGEgYEBDb21wb25lbnRgIGFubm90YXRpb24uXG4gKlxuICogIFRoaXMgaXMgYSBzaG9ydGhhbmQgZm9yIGltcG9ydGluZyB0aGVtIGVhY2ggaW5kaXZpZHVhbGx5LlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogQENvbXBvbmVudCh7XG4gKiAgIHNlbGVjdG9yOiAnbXktYXBwJyxcbiAqICAgZGlyZWN0aXZlczogW0ZPUk1fRElSRUNUSVZFU11cbiAqIH0pXG4gKiBjbGFzcyBNeUFwcCB7fVxuICogYGBgXG4gKi9cbmV4cG9ydCBjb25zdCBGT1JNX0RJUkVDVElWRVM6IFR5cGVbXSA9IENPTlNUX0VYUFIoW1xuICBOZ0NvbnRyb2xOYW1lLFxuICBOZ0NvbnRyb2xHcm91cCxcblxuICBOZ0Zvcm1Db250cm9sLFxuICBOZ01vZGVsLFxuICBOZ0Zvcm1Nb2RlbCxcbiAgTmdGb3JtLFxuXG4gIE5nU2VsZWN0T3B0aW9uLFxuICBEZWZhdWx0VmFsdWVBY2Nlc3NvcixcbiAgTnVtYmVyVmFsdWVBY2Nlc3NvcixcbiAgQ2hlY2tib3hDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgU2VsZWN0Q29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIFJhZGlvQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIE5nQ29udHJvbFN0YXR1cyxcblxuICBSZXF1aXJlZFZhbGlkYXRvcixcbiAgTWluTGVuZ3RoVmFsaWRhdG9yLFxuICBNYXhMZW5ndGhWYWxpZGF0b3IsXG4gIFBhdHRlcm5WYWxpZGF0b3Jcbl0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
