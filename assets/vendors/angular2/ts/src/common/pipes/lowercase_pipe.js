System.register(['angular2/src/facade/lang', 'angular2/core', './invalid_pipe_argument_exception'], function(exports_1, context_1) {
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
    var lang_1, core_1, invalid_pipe_argument_exception_1;
    var LowerCasePipe;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (invalid_pipe_argument_exception_1_1) {
                invalid_pipe_argument_exception_1 = invalid_pipe_argument_exception_1_1;
            }],
        execute: function() {
            /**
             * Transforms text to lowercase.
             *
             * ### Example
             *
             * {@example core/pipes/ts/lowerupper_pipe/lowerupper_pipe_example.ts region='LowerUpperPipe'}
             */
            LowerCasePipe = (function () {
                function LowerCasePipe() {
                }
                LowerCasePipe.prototype.transform = function (value) {
                    if (lang_1.isBlank(value))
                        return value;
                    if (!lang_1.isString(value)) {
                        throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(LowerCasePipe, value);
                    }
                    return value.toLowerCase();
                };
                LowerCasePipe = __decorate([
                    lang_1.CONST(),
                    core_1.Pipe({ name: 'lowercase' }),
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], LowerCasePipe);
                return LowerCasePipe;
            }());
            exports_1("LowerCasePipe", LowerCasePipe);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vcGlwZXMvbG93ZXJjYXNlX3BpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFJQTs7Ozs7O2VBTUc7WUFJSDtnQkFBQTtnQkFRQSxDQUFDO2dCQVBDLGlDQUFTLEdBQVQsVUFBVSxLQUFhO29CQUNyQixFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztvQkFDakMsRUFBRSxDQUFDLENBQUMsQ0FBQyxlQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNyQixNQUFNLElBQUksOERBQTRCLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUMvRCxDQUFDO29CQUNELE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQzdCLENBQUM7Z0JBVkg7b0JBQUMsWUFBSyxFQUFFO29CQUNQLFdBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUMsQ0FBQztvQkFDekIsaUJBQVUsRUFBRTs7aUNBQUE7Z0JBU2Isb0JBQUM7WUFBRCxDQVJBLEFBUUMsSUFBQTtZQVJELHlDQVFDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9waXBlcy9sb3dlcmNhc2VfcGlwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNTdHJpbmcsIENPTlNULCBpc0JsYW5rfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtJbmplY3RhYmxlLCBQaXBlVHJhbnNmb3JtLCBXcmFwcGVkVmFsdWUsIFBpcGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtJbnZhbGlkUGlwZUFyZ3VtZW50RXhjZXB0aW9ufSBmcm9tICcuL2ludmFsaWRfcGlwZV9hcmd1bWVudF9leGNlcHRpb24nO1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGV4dCB0byBsb3dlcmNhc2UuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgY29yZS9waXBlcy90cy9sb3dlcnVwcGVyX3BpcGUvbG93ZXJ1cHBlcl9waXBlX2V4YW1wbGUudHMgcmVnaW9uPSdMb3dlclVwcGVyUGlwZSd9XG4gKi9cbkBDT05TVCgpXG5AUGlwZSh7bmFtZTogJ2xvd2VyY2FzZSd9KVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvd2VyQ2FzZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmIChpc0JsYW5rKHZhbHVlKSkgcmV0dXJuIHZhbHVlO1xuICAgIGlmICghaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZFBpcGVBcmd1bWVudEV4Y2VwdGlvbihMb3dlckNhc2VQaXBlLCB2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
