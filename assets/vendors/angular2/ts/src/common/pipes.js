/**
 * @module
 * @description
 * This module provides a set of common Pipes.
 */
System.register(['./pipes/async_pipe', './pipes/date_pipe', './pipes/json_pipe', './pipes/slice_pipe', './pipes/lowercase_pipe', './pipes/number_pipe', './pipes/uppercase_pipe', './pipes/replace_pipe', './pipes/i18n_plural_pipe', './pipes/i18n_select_pipe', './pipes/common_pipes'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[
            function (async_pipe_1_1) {
                exports_1({
                    "AsyncPipe": async_pipe_1_1["AsyncPipe"]
                });
            },
            function (date_pipe_1_1) {
                exports_1({
                    "DatePipe": date_pipe_1_1["DatePipe"]
                });
            },
            function (json_pipe_1_1) {
                exports_1({
                    "JsonPipe": json_pipe_1_1["JsonPipe"]
                });
            },
            function (slice_pipe_1_1) {
                exports_1({
                    "SlicePipe": slice_pipe_1_1["SlicePipe"]
                });
            },
            function (lowercase_pipe_1_1) {
                exports_1({
                    "LowerCasePipe": lowercase_pipe_1_1["LowerCasePipe"]
                });
            },
            function (number_pipe_1_1) {
                exports_1({
                    "NumberPipe": number_pipe_1_1["NumberPipe"],
                    "DecimalPipe": number_pipe_1_1["DecimalPipe"],
                    "PercentPipe": number_pipe_1_1["PercentPipe"],
                    "CurrencyPipe": number_pipe_1_1["CurrencyPipe"]
                });
            },
            function (uppercase_pipe_1_1) {
                exports_1({
                    "UpperCasePipe": uppercase_pipe_1_1["UpperCasePipe"]
                });
            },
            function (replace_pipe_1_1) {
                exports_1({
                    "ReplacePipe": replace_pipe_1_1["ReplacePipe"]
                });
            },
            function (i18n_plural_pipe_1_1) {
                exports_1({
                    "I18nPluralPipe": i18n_plural_pipe_1_1["I18nPluralPipe"]
                });
            },
            function (i18n_select_pipe_1_1) {
                exports_1({
                    "I18nSelectPipe": i18n_select_pipe_1_1["I18nSelectPipe"]
                });
            },
            function (common_pipes_1_1) {
                exports_1({
                    "COMMON_PIPES": common_pipes_1_1["COMMON_PIPES"]
                });
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vcGlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tbW9uL3BpcGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbW9kdWxlXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoaXMgbW9kdWxlIHByb3ZpZGVzIGEgc2V0IG9mIGNvbW1vbiBQaXBlcy5cbiAqL1xuXG5leHBvcnQge0FzeW5jUGlwZX0gZnJvbSAnLi9waXBlcy9hc3luY19waXBlJztcbmV4cG9ydCB7RGF0ZVBpcGV9IGZyb20gJy4vcGlwZXMvZGF0ZV9waXBlJztcbmV4cG9ydCB7SnNvblBpcGV9IGZyb20gJy4vcGlwZXMvanNvbl9waXBlJztcbmV4cG9ydCB7U2xpY2VQaXBlfSBmcm9tICcuL3BpcGVzL3NsaWNlX3BpcGUnO1xuZXhwb3J0IHtMb3dlckNhc2VQaXBlfSBmcm9tICcuL3BpcGVzL2xvd2VyY2FzZV9waXBlJztcbmV4cG9ydCB7TnVtYmVyUGlwZSwgRGVjaW1hbFBpcGUsIFBlcmNlbnRQaXBlLCBDdXJyZW5jeVBpcGV9IGZyb20gJy4vcGlwZXMvbnVtYmVyX3BpcGUnO1xuZXhwb3J0IHtVcHBlckNhc2VQaXBlfSBmcm9tICcuL3BpcGVzL3VwcGVyY2FzZV9waXBlJztcbmV4cG9ydCB7UmVwbGFjZVBpcGV9IGZyb20gJy4vcGlwZXMvcmVwbGFjZV9waXBlJztcbmV4cG9ydCB7STE4blBsdXJhbFBpcGV9IGZyb20gJy4vcGlwZXMvaTE4bl9wbHVyYWxfcGlwZSc7XG5leHBvcnQge0kxOG5TZWxlY3RQaXBlfSBmcm9tICcuL3BpcGVzL2kxOG5fc2VsZWN0X3BpcGUnO1xuZXhwb3J0IHtDT01NT05fUElQRVN9IGZyb20gJy4vcGlwZXMvY29tbW9uX3BpcGVzJztcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
