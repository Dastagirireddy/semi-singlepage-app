System.register(['./lang', './async', './exceptions', './exception_handler'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[
            function (lang_1_1) {
                exports_1({
                    "ConcreteType": lang_1_1["ConcreteType"],
                    "Type": lang_1_1["Type"]
                });
            },
            function (async_1_1) {
                exports_1({
                    "EventEmitter": async_1_1["EventEmitter"]
                });
            },
            function (exceptions_1_1) {
                exports_1({
                    "WrappedException": exceptions_1_1["WrappedException"]
                });
            },
            function (exception_handler_1_1) {
                exports_1({
                    "ExceptionHandler": exception_handler_1_1["ExceptionHandler"]
                });
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9mYWNhZGUvZmFjYWRlLmpzIiwic291cmNlc0NvbnRlbnQiOltdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
