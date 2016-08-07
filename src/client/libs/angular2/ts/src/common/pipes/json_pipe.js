System.register(['angular2/src/facade/lang', 'angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var lang_1, core_1;
    var JsonPipe;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            /**
             * Transforms any input value using `JSON.stringify`. Useful for debugging.
             *
             * ### Example
             * {@example core/pipes/ts/json_pipe/json_pipe_example.ts region='JsonPipe'}
             */
            JsonPipe = (function () {
                function JsonPipe() {
                }
                JsonPipe.prototype.transform = function (value, args) {
                    if (args === void 0) { args = null; }
                    return lang_1.Json.stringify(value);
                };
                JsonPipe = __decorate([
                    lang_1.CONST(),
                    core_1.Pipe({ name: 'json', pure: false }),
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], JsonPipe);
                return JsonPipe;
            }());
            exports_1("JsonPipe", JsonPipe);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9waXBlcy9qc29uX3BpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFHQTs7Ozs7ZUFLRztZQUlIO2dCQUFBO2dCQUVBLENBQUM7Z0JBREMsNEJBQVMsR0FBVCxVQUFVLEtBQVUsRUFBRSxJQUFrQjtvQkFBbEIsb0JBQWtCLEdBQWxCLFdBQWtCO29CQUFZLE1BQU0sQ0FBQyxXQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUFDLENBQUM7Z0JBSnJGO29CQUFDLFlBQUssRUFBRTtvQkFDUCxXQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQztvQkFDakMsaUJBQVUsRUFBRTs7NEJBQUE7Z0JBR2IsZUFBQztZQUFELENBRkEsQUFFQyxJQUFBO1lBRkQsK0JBRUMsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vcGlwZXMvanNvbl9waXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc0JsYW5rLCBpc1ByZXNlbnQsIEpzb24sIENPTlNUfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtJbmplY3RhYmxlLCBQaXBlVHJhbnNmb3JtLCBXcmFwcGVkVmFsdWUsIFBpcGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgYW55IGlucHV0IHZhbHVlIHVzaW5nIGBKU09OLnN0cmluZ2lmeWAuIFVzZWZ1bCBmb3IgZGVidWdnaW5nLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKiB7QGV4YW1wbGUgY29yZS9waXBlcy90cy9qc29uX3BpcGUvanNvbl9waXBlX2V4YW1wbGUudHMgcmVnaW9uPSdKc29uUGlwZSd9XG4gKi9cbkBDT05TVCgpXG5AUGlwZSh7bmFtZTogJ2pzb24nLCBwdXJlOiBmYWxzZX0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSnNvblBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGFyZ3M6IGFueVtdID0gbnVsbCk6IHN0cmluZyB7IHJldHVybiBKc29uLnN0cmluZ2lmeSh2YWx1ZSk7IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
