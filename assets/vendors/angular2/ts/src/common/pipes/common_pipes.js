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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vcGlwZXMvY29tbW9uX3BpcGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUF3QmEsWUFBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQVB6Qjs7Ozs7O2VBTUc7WUFDVSwwQkFBQSxZQUFZLEdBQUcsaUJBQVUsQ0FBQztnQkFDckMsc0JBQVM7Z0JBQ1QsOEJBQWE7Z0JBQ2IsOEJBQWE7Z0JBQ2Isb0JBQVE7Z0JBQ1Isc0JBQVM7Z0JBQ1QseUJBQVc7Z0JBQ1gseUJBQVc7Z0JBQ1gsMEJBQVk7Z0JBQ1osb0JBQVE7Z0JBQ1IsMEJBQVc7Z0JBQ1gsaUNBQWM7Z0JBQ2QsaUNBQWM7YUFDZixDQUFDLENBQUEsQ0FBQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tbW9uL3BpcGVzL2NvbW1vbl9waXBlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQG1vZHVsZVxuICogQGRlc2NyaXB0aW9uXG4gKiBUaGlzIG1vZHVsZSBwcm92aWRlcyBhIHNldCBvZiBjb21tb24gUGlwZXMuXG4gKi9cbmltcG9ydCB7QXN5bmNQaXBlfSBmcm9tICcuL2FzeW5jX3BpcGUnO1xuaW1wb3J0IHtVcHBlckNhc2VQaXBlfSBmcm9tICcuL3VwcGVyY2FzZV9waXBlJztcbmltcG9ydCB7TG93ZXJDYXNlUGlwZX0gZnJvbSAnLi9sb3dlcmNhc2VfcGlwZSc7XG5pbXBvcnQge0pzb25QaXBlfSBmcm9tICcuL2pzb25fcGlwZSc7XG5pbXBvcnQge1NsaWNlUGlwZX0gZnJvbSAnLi9zbGljZV9waXBlJztcbmltcG9ydCB7RGF0ZVBpcGV9IGZyb20gJy4vZGF0ZV9waXBlJztcbmltcG9ydCB7RGVjaW1hbFBpcGUsIFBlcmNlbnRQaXBlLCBDdXJyZW5jeVBpcGV9IGZyb20gJy4vbnVtYmVyX3BpcGUnO1xuaW1wb3J0IHtSZXBsYWNlUGlwZX0gZnJvbSAnLi9yZXBsYWNlX3BpcGUnO1xuaW1wb3J0IHtJMThuUGx1cmFsUGlwZX0gZnJvbSAnLi9pMThuX3BsdXJhbF9waXBlJztcbmltcG9ydCB7STE4blNlbGVjdFBpcGV9IGZyb20gJy4vaTE4bl9zZWxlY3RfcGlwZSc7XG5pbXBvcnQge0NPTlNUX0VYUFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbi8qKlxuICogQSBjb2xsZWN0aW9uIG9mIEFuZ3VsYXIgY29yZSBwaXBlcyB0aGF0IGFyZSBsaWtlbHkgdG8gYmUgdXNlZCBpbiBlYWNoIGFuZCBldmVyeVxuICogYXBwbGljYXRpb24uXG4gKlxuICogVGhpcyBjb2xsZWN0aW9uIGNhbiBiZSB1c2VkIHRvIHF1aWNrbHkgZW51bWVyYXRlIGFsbCB0aGUgYnVpbHQtaW4gcGlwZXMgaW4gdGhlIGBwaXBlc2BcbiAqIHByb3BlcnR5IG9mIHRoZSBgQENvbXBvbmVudGAgZGVjb3JhdG9yLlxuICovXG5leHBvcnQgY29uc3QgQ09NTU9OX1BJUEVTID0gQ09OU1RfRVhQUihbXG4gIEFzeW5jUGlwZSxcbiAgVXBwZXJDYXNlUGlwZSxcbiAgTG93ZXJDYXNlUGlwZSxcbiAgSnNvblBpcGUsXG4gIFNsaWNlUGlwZSxcbiAgRGVjaW1hbFBpcGUsXG4gIFBlcmNlbnRQaXBlLFxuICBDdXJyZW5jeVBpcGUsXG4gIERhdGVQaXBlLFxuICBSZXBsYWNlUGlwZSxcbiAgSTE4blBsdXJhbFBpcGUsXG4gIEkxOG5TZWxlY3RQaXBlXG5dKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
