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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFrRWEsZUFBZTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFoQjVCOzs7Ozs7Ozs7Ozs7Ozs7ZUFlRztZQUNVLDZCQUFBLGVBQWUsR0FBVyxpQkFBVSxDQUFDO2dCQUNoRCwrQkFBYTtnQkFDYixpQ0FBYztnQkFFZCwrQkFBYTtnQkFDYixrQkFBTztnQkFDUCwyQkFBVztnQkFDWCxnQkFBTTtnQkFFTiw4Q0FBYztnQkFDZCw2Q0FBb0I7Z0JBQ3BCLDJDQUFtQjtnQkFDbkIsc0RBQTRCO2dCQUM1QiwwREFBMEI7Z0JBQzFCLHdEQUF5QjtnQkFDekIsbUNBQWU7Z0JBRWYsOEJBQWlCO2dCQUNqQiwrQkFBa0I7Z0JBQ2xCLCtCQUFrQjtnQkFDbEIsNkJBQWdCO2FBQ2pCLENBQUMsQ0FBQSxDQUFDIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUeXBlLCBDT05TVF9FWFBSfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtOZ0NvbnRyb2xOYW1lfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmdfY29udHJvbF9uYW1lJztcbmltcG9ydCB7TmdGb3JtQ29udHJvbH0gZnJvbSAnLi9kaXJlY3RpdmVzL25nX2Zvcm1fY29udHJvbCc7XG5pbXBvcnQge05nTW9kZWx9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ19tb2RlbCc7XG5pbXBvcnQge05nQ29udHJvbEdyb3VwfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmdfY29udHJvbF9ncm91cCc7XG5pbXBvcnQge05nRm9ybU1vZGVsfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmdfZm9ybV9tb2RlbCc7XG5pbXBvcnQge05nRm9ybX0gZnJvbSAnLi9kaXJlY3RpdmVzL25nX2Zvcm0nO1xuaW1wb3J0IHtEZWZhdWx0VmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9kaXJlY3RpdmVzL2RlZmF1bHRfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtDaGVja2JveENvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL2RpcmVjdGl2ZXMvY2hlY2tib3hfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtOdW1iZXJWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL2RpcmVjdGl2ZXMvbnVtYmVyX3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7UmFkaW9Db250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9kaXJlY3RpdmVzL3JhZGlvX2NvbnRyb2xfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtOZ0NvbnRyb2xTdGF0dXN9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ19jb250cm9sX3N0YXR1cyc7XG5pbXBvcnQge1xuICBTZWxlY3RDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgTmdTZWxlY3RPcHRpb25cbn0gZnJvbSAnLi9kaXJlY3RpdmVzL3NlbGVjdF9jb250cm9sX3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7XG4gIFJlcXVpcmVkVmFsaWRhdG9yLFxuICBNaW5MZW5ndGhWYWxpZGF0b3IsXG4gIE1heExlbmd0aFZhbGlkYXRvcixcbiAgUGF0dGVyblZhbGlkYXRvclxufSBmcm9tICcuL2RpcmVjdGl2ZXMvdmFsaWRhdG9ycyc7XG5cbmV4cG9ydCB7TmdDb250cm9sTmFtZX0gZnJvbSAnLi9kaXJlY3RpdmVzL25nX2NvbnRyb2xfbmFtZSc7XG5leHBvcnQge05nRm9ybUNvbnRyb2x9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ19mb3JtX2NvbnRyb2wnO1xuZXhwb3J0IHtOZ01vZGVsfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmdfbW9kZWwnO1xuZXhwb3J0IHtOZ0NvbnRyb2xHcm91cH0gZnJvbSAnLi9kaXJlY3RpdmVzL25nX2NvbnRyb2xfZ3JvdXAnO1xuZXhwb3J0IHtOZ0Zvcm1Nb2RlbH0gZnJvbSAnLi9kaXJlY3RpdmVzL25nX2Zvcm1fbW9kZWwnO1xuZXhwb3J0IHtOZ0Zvcm19IGZyb20gJy4vZGlyZWN0aXZlcy9uZ19mb3JtJztcbmV4cG9ydCB7RGVmYXVsdFZhbHVlQWNjZXNzb3J9IGZyb20gJy4vZGlyZWN0aXZlcy9kZWZhdWx0X3ZhbHVlX2FjY2Vzc29yJztcbmV4cG9ydCB7Q2hlY2tib3hDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9kaXJlY3RpdmVzL2NoZWNrYm94X3ZhbHVlX2FjY2Vzc29yJztcbmV4cG9ydCB7XG4gIFJhZGlvQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIFJhZGlvQnV0dG9uU3RhdGVcbn0gZnJvbSAnLi9kaXJlY3RpdmVzL3JhZGlvX2NvbnRyb2xfdmFsdWVfYWNjZXNzb3InO1xuZXhwb3J0IHtOdW1iZXJWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL2RpcmVjdGl2ZXMvbnVtYmVyX3ZhbHVlX2FjY2Vzc29yJztcbmV4cG9ydCB7TmdDb250cm9sU3RhdHVzfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmdfY29udHJvbF9zdGF0dXMnO1xuZXhwb3J0IHtcbiAgU2VsZWN0Q29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIE5nU2VsZWN0T3B0aW9uXG59IGZyb20gJy4vZGlyZWN0aXZlcy9zZWxlY3RfY29udHJvbF92YWx1ZV9hY2Nlc3Nvcic7XG5leHBvcnQge1xuICBSZXF1aXJlZFZhbGlkYXRvcixcbiAgTWluTGVuZ3RoVmFsaWRhdG9yLFxuICBNYXhMZW5ndGhWYWxpZGF0b3IsXG4gIFBhdHRlcm5WYWxpZGF0b3Jcbn0gZnJvbSAnLi9kaXJlY3RpdmVzL3ZhbGlkYXRvcnMnO1xuZXhwb3J0IHtOZ0NvbnRyb2x9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ19jb250cm9sJztcbmV4cG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJy4vZGlyZWN0aXZlcy9jb250cm9sX3ZhbHVlX2FjY2Vzc29yJztcblxuLyoqXG4gKlxuICogQSBsaXN0IG9mIGFsbCB0aGUgZm9ybSBkaXJlY3RpdmVzIHVzZWQgYXMgcGFydCBvZiBhIGBAQ29tcG9uZW50YCBhbm5vdGF0aW9uLlxuICpcbiAqICBUaGlzIGlzIGEgc2hvcnRoYW5kIGZvciBpbXBvcnRpbmcgdGhlbSBlYWNoIGluZGl2aWR1YWxseS5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIEBDb21wb25lbnQoe1xuICogICBzZWxlY3RvcjogJ215LWFwcCcsXG4gKiAgIGRpcmVjdGl2ZXM6IFtGT1JNX0RJUkVDVElWRVNdXG4gKiB9KVxuICogY2xhc3MgTXlBcHAge31cbiAqIGBgYFxuICovXG5leHBvcnQgY29uc3QgRk9STV9ESVJFQ1RJVkVTOiBUeXBlW10gPSBDT05TVF9FWFBSKFtcbiAgTmdDb250cm9sTmFtZSxcbiAgTmdDb250cm9sR3JvdXAsXG5cbiAgTmdGb3JtQ29udHJvbCxcbiAgTmdNb2RlbCxcbiAgTmdGb3JtTW9kZWwsXG4gIE5nRm9ybSxcblxuICBOZ1NlbGVjdE9wdGlvbixcbiAgRGVmYXVsdFZhbHVlQWNjZXNzb3IsXG4gIE51bWJlclZhbHVlQWNjZXNzb3IsXG4gIENoZWNrYm94Q29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIFNlbGVjdENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBSYWRpb0NvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBOZ0NvbnRyb2xTdGF0dXMsXG5cbiAgUmVxdWlyZWRWYWxpZGF0b3IsXG4gIE1pbkxlbmd0aFZhbGlkYXRvcixcbiAgTWF4TGVuZ3RoVmFsaWRhdG9yLFxuICBQYXR0ZXJuVmFsaWRhdG9yXG5dKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
