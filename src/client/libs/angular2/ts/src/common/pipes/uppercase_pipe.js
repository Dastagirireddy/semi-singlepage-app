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
    var UpperCasePipe;
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
             * Implements uppercase transforms to text.
             *
             * ### Example
             *
             * {@example core/pipes/ts/lowerupper_pipe/lowerupper_pipe_example.ts region='LowerUpperPipe'}
             */
            UpperCasePipe = (function () {
                function UpperCasePipe() {
                }
                UpperCasePipe.prototype.transform = function (value, args) {
                    if (args === void 0) { args = null; }
                    if (lang_1.isBlank(value))
                        return value;
                    if (!lang_1.isString(value)) {
                        throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(UpperCasePipe, value);
                    }
                    return value.toUpperCase();
                };
                UpperCasePipe = __decorate([
                    lang_1.CONST(),
                    core_1.Pipe({ name: 'uppercase' }),
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], UpperCasePipe);
                return UpperCasePipe;
            }());
            exports_1("UpperCasePipe", UpperCasePipe);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9waXBlcy91cHBlcmNhc2VfcGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUlBOzs7Ozs7ZUFNRztZQUlIO2dCQUFBO2dCQVFBLENBQUM7Z0JBUEMsaUNBQVMsR0FBVCxVQUFVLEtBQWEsRUFBRSxJQUFrQjtvQkFBbEIsb0JBQWtCLEdBQWxCLFdBQWtCO29CQUN6QyxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztvQkFDakMsRUFBRSxDQUFDLENBQUMsQ0FBQyxlQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNyQixNQUFNLElBQUksOERBQTRCLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUMvRCxDQUFDO29CQUNELE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQzdCLENBQUM7Z0JBVkg7b0JBQUMsWUFBSyxFQUFFO29CQUNQLFdBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUMsQ0FBQztvQkFDekIsaUJBQVUsRUFBRTs7aUNBQUE7Z0JBU2Isb0JBQUM7WUFBRCxDQVJBLEFBUUMsSUFBQTtZQVJELHlDQVFDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29tbW9uL3BpcGVzL3VwcGVyY2FzZV9waXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc1N0cmluZywgQ09OU1QsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge1BpcGVUcmFuc2Zvcm0sIFdyYXBwZWRWYWx1ZSwgSW5qZWN0YWJsZSwgUGlwZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0ludmFsaWRQaXBlQXJndW1lbnRFeGNlcHRpb259IGZyb20gJy4vaW52YWxpZF9waXBlX2FyZ3VtZW50X2V4Y2VwdGlvbic7XG5cbi8qKlxuICogSW1wbGVtZW50cyB1cHBlcmNhc2UgdHJhbnNmb3JtcyB0byB0ZXh0LlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIGNvcmUvcGlwZXMvdHMvbG93ZXJ1cHBlcl9waXBlL2xvd2VydXBwZXJfcGlwZV9leGFtcGxlLnRzIHJlZ2lvbj0nTG93ZXJVcHBlclBpcGUnfVxuICovXG5AQ09OU1QoKVxuQFBpcGUoe25hbWU6ICd1cHBlcmNhc2UnfSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVcHBlckNhc2VQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nLCBhcmdzOiBhbnlbXSA9IG51bGwpOiBzdHJpbmcge1xuICAgIGlmIChpc0JsYW5rKHZhbHVlKSkgcmV0dXJuIHZhbHVlO1xuICAgIGlmICghaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZFBpcGVBcmd1bWVudEV4Y2VwdGlvbihVcHBlckNhc2VQaXBlLCB2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZS50b1VwcGVyQ2FzZSgpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
