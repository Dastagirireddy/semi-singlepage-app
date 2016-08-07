System.register(['./async_pipe', './uppercase_pipe', './lowercase_pipe', './json_pipe', './slice_pipe', './date_pipe', './number_pipe', './replace_pipe', './i18n_plural_pipe', './i18n_select_pipe', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var async_pipe_1, uppercase_pipe_1, lowercase_pipe_1, json_pipe_1, slice_pipe_1, date_pipe_1, number_pipe_1, replace_pipe_1, i18n_plural_pipe_1, i18n_select_pipe_1, lang_1;
    var COMMON_PIPES;
    return {
        setters:[
            function (async_pipe_1_1) {
                async_pipe_1 = async_pipe_1_1;
            },
            function (uppercase_pipe_1_1) {
                uppercase_pipe_1 = uppercase_pipe_1_1;
            },
            function (lowercase_pipe_1_1) {
                lowercase_pipe_1 = lowercase_pipe_1_1;
            },
            function (json_pipe_1_1) {
                json_pipe_1 = json_pipe_1_1;
            },
            function (slice_pipe_1_1) {
                slice_pipe_1 = slice_pipe_1_1;
            },
            function (date_pipe_1_1) {
                date_pipe_1 = date_pipe_1_1;
            },
            function (number_pipe_1_1) {
                number_pipe_1 = number_pipe_1_1;
            },
            function (replace_pipe_1_1) {
                replace_pipe_1 = replace_pipe_1_1;
            },
            function (i18n_plural_pipe_1_1) {
                i18n_plural_pipe_1 = i18n_plural_pipe_1_1;
            },
            function (i18n_select_pipe_1_1) {
                i18n_select_pipe_1 = i18n_select_pipe_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * A collection of Angular core pipes that are likely to be used in each and every
             * application.
             *
             * This collection can be used to quickly enumerate all the built-in pipes in the `pipes`
             * property of the `@Component` decorator.
             */
            exports_1("COMMON_PIPES", COMMON_PIPES = lang_1.CONST_EXPR([
                async_pipe_1.AsyncPipe,
                uppercase_pipe_1.UpperCasePipe,
                lowercase_pipe_1.LowerCasePipe,
                json_pipe_1.JsonPipe,
                slice_pipe_1.SlicePipe,
                number_pipe_1.DecimalPipe,
                number_pipe_1.PercentPipe,
                number_pipe_1.CurrencyPipe,
                date_pipe_1.DatePipe,
                replace_pipe_1.ReplacePipe,
                i18n_plural_pipe_1.I18nPluralPipe,
                i18n_select_pipe_1.I18nSelectPipe
            ]));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9waXBlcy9jb21tb25fcGlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQXdCYSxZQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBUHpCOzs7Ozs7ZUFNRztZQUNVLDBCQUFBLFlBQVksR0FBRyxpQkFBVSxDQUFDO2dCQUNyQyxzQkFBUztnQkFDVCw4QkFBYTtnQkFDYiw4QkFBYTtnQkFDYixvQkFBUTtnQkFDUixzQkFBUztnQkFDVCx5QkFBVztnQkFDWCx5QkFBVztnQkFDWCwwQkFBWTtnQkFDWixvQkFBUTtnQkFDUiwwQkFBVztnQkFDWCxpQ0FBYztnQkFDZCxpQ0FBYzthQUNmLENBQUMsQ0FBQSxDQUFDIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9waXBlcy9jb21tb25fcGlwZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBtb2R1bGVcbiAqIEBkZXNjcmlwdGlvblxuICogVGhpcyBtb2R1bGUgcHJvdmlkZXMgYSBzZXQgb2YgY29tbW9uIFBpcGVzLlxuICovXG5pbXBvcnQge0FzeW5jUGlwZX0gZnJvbSAnLi9hc3luY19waXBlJztcbmltcG9ydCB7VXBwZXJDYXNlUGlwZX0gZnJvbSAnLi91cHBlcmNhc2VfcGlwZSc7XG5pbXBvcnQge0xvd2VyQ2FzZVBpcGV9IGZyb20gJy4vbG93ZXJjYXNlX3BpcGUnO1xuaW1wb3J0IHtKc29uUGlwZX0gZnJvbSAnLi9qc29uX3BpcGUnO1xuaW1wb3J0IHtTbGljZVBpcGV9IGZyb20gJy4vc2xpY2VfcGlwZSc7XG5pbXBvcnQge0RhdGVQaXBlfSBmcm9tICcuL2RhdGVfcGlwZSc7XG5pbXBvcnQge0RlY2ltYWxQaXBlLCBQZXJjZW50UGlwZSwgQ3VycmVuY3lQaXBlfSBmcm9tICcuL251bWJlcl9waXBlJztcbmltcG9ydCB7UmVwbGFjZVBpcGV9IGZyb20gJy4vcmVwbGFjZV9waXBlJztcbmltcG9ydCB7STE4blBsdXJhbFBpcGV9IGZyb20gJy4vaTE4bl9wbHVyYWxfcGlwZSc7XG5pbXBvcnQge0kxOG5TZWxlY3RQaXBlfSBmcm9tICcuL2kxOG5fc2VsZWN0X3BpcGUnO1xuaW1wb3J0IHtDT05TVF9FWFBSfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG4vKipcbiAqIEEgY29sbGVjdGlvbiBvZiBBbmd1bGFyIGNvcmUgcGlwZXMgdGhhdCBhcmUgbGlrZWx5IHRvIGJlIHVzZWQgaW4gZWFjaCBhbmQgZXZlcnlcbiAqIGFwcGxpY2F0aW9uLlxuICpcbiAqIFRoaXMgY29sbGVjdGlvbiBjYW4gYmUgdXNlZCB0byBxdWlja2x5IGVudW1lcmF0ZSBhbGwgdGhlIGJ1aWx0LWluIHBpcGVzIGluIHRoZSBgcGlwZXNgXG4gKiBwcm9wZXJ0eSBvZiB0aGUgYEBDb21wb25lbnRgIGRlY29yYXRvci5cbiAqL1xuZXhwb3J0IGNvbnN0IENPTU1PTl9QSVBFUyA9IENPTlNUX0VYUFIoW1xuICBBc3luY1BpcGUsXG4gIFVwcGVyQ2FzZVBpcGUsXG4gIExvd2VyQ2FzZVBpcGUsXG4gIEpzb25QaXBlLFxuICBTbGljZVBpcGUsXG4gIERlY2ltYWxQaXBlLFxuICBQZXJjZW50UGlwZSxcbiAgQ3VycmVuY3lQaXBlLFxuICBEYXRlUGlwZSxcbiAgUmVwbGFjZVBpcGUsXG4gIEkxOG5QbHVyYWxQaXBlLFxuICBJMThuU2VsZWN0UGlwZVxuXSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
