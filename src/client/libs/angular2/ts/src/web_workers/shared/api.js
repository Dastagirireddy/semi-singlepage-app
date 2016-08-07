System.register(["angular2/src/facade/lang", "angular2/src/core/di"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, di_1;
    var ON_WEB_WORKER;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            }],
        execute: function() {
            exports_1("ON_WEB_WORKER", ON_WEB_WORKER = lang_1.CONST_EXPR(new di_1.OpaqueToken('WebWorker.onWebWorker')));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQUdhLGFBQWE7Ozs7Ozs7Ozs7WUFBYiwyQkFBQSxhQUFhLEdBQUcsaUJBQVUsQ0FBQyxJQUFJLGdCQUFXLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFBLENBQUMiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL2FwaS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q09OU1RfRVhQUn0gZnJvbSBcImFuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZ1wiO1xuaW1wb3J0IHtPcGFxdWVUb2tlbn0gZnJvbSBcImFuZ3VsYXIyL3NyYy9jb3JlL2RpXCI7XG5cbmV4cG9ydCBjb25zdCBPTl9XRUJfV09SS0VSID0gQ09OU1RfRVhQUihuZXcgT3BhcXVlVG9rZW4oJ1dlYldvcmtlci5vbldlYldvcmtlcicpKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
