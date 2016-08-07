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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9waXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9waXBlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQG1vZHVsZVxuICogQGRlc2NyaXB0aW9uXG4gKiBUaGlzIG1vZHVsZSBwcm92aWRlcyBhIHNldCBvZiBjb21tb24gUGlwZXMuXG4gKi9cblxuZXhwb3J0IHtBc3luY1BpcGV9IGZyb20gJy4vcGlwZXMvYXN5bmNfcGlwZSc7XG5leHBvcnQge0RhdGVQaXBlfSBmcm9tICcuL3BpcGVzL2RhdGVfcGlwZSc7XG5leHBvcnQge0pzb25QaXBlfSBmcm9tICcuL3BpcGVzL2pzb25fcGlwZSc7XG5leHBvcnQge1NsaWNlUGlwZX0gZnJvbSAnLi9waXBlcy9zbGljZV9waXBlJztcbmV4cG9ydCB7TG93ZXJDYXNlUGlwZX0gZnJvbSAnLi9waXBlcy9sb3dlcmNhc2VfcGlwZSc7XG5leHBvcnQge051bWJlclBpcGUsIERlY2ltYWxQaXBlLCBQZXJjZW50UGlwZSwgQ3VycmVuY3lQaXBlfSBmcm9tICcuL3BpcGVzL251bWJlcl9waXBlJztcbmV4cG9ydCB7VXBwZXJDYXNlUGlwZX0gZnJvbSAnLi9waXBlcy91cHBlcmNhc2VfcGlwZSc7XG5leHBvcnQge1JlcGxhY2VQaXBlfSBmcm9tICcuL3BpcGVzL3JlcGxhY2VfcGlwZSc7XG5leHBvcnQge0kxOG5QbHVyYWxQaXBlfSBmcm9tICcuL3BpcGVzL2kxOG5fcGx1cmFsX3BpcGUnO1xuZXhwb3J0IHtJMThuU2VsZWN0UGlwZX0gZnJvbSAnLi9waXBlcy9pMThuX3NlbGVjdF9waXBlJztcbmV4cG9ydCB7Q09NTU9OX1BJUEVTfSBmcm9tICcuL3BpcGVzL2NvbW1vbl9waXBlcyc7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
