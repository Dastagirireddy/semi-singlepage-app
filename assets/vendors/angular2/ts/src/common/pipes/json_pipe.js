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
                JsonPipe.prototype.transform = function (value) { return lang_1.Json.stringify(value); };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vcGlwZXMvanNvbl9waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBR0E7Ozs7O2VBS0c7WUFJSDtnQkFBQTtnQkFFQSxDQUFDO2dCQURDLDRCQUFTLEdBQVQsVUFBVSxLQUFVLElBQVksTUFBTSxDQUFDLFdBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUpqRTtvQkFBQyxZQUFLLEVBQUU7b0JBQ1AsV0FBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFDLENBQUM7b0JBQ2pDLGlCQUFVLEVBQUU7OzRCQUFBO2dCQUdiLGVBQUM7WUFBRCxDQUZBLEFBRUMsSUFBQTtZQUZELCtCQUVDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9waXBlcy9qc29uX3BpcGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzQmxhbmssIGlzUHJlc2VudCwgSnNvbiwgQ09OU1R9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0luamVjdGFibGUsIFBpcGVUcmFuc2Zvcm0sIFdyYXBwZWRWYWx1ZSwgUGlwZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5cbi8qKlxuICogVHJhbnNmb3JtcyBhbnkgaW5wdXQgdmFsdWUgdXNpbmcgYEpTT04uc3RyaW5naWZ5YC4gVXNlZnVsIGZvciBkZWJ1Z2dpbmcuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqIHtAZXhhbXBsZSBjb3JlL3BpcGVzL3RzL2pzb25fcGlwZS9qc29uX3BpcGVfZXhhbXBsZS50cyByZWdpb249J0pzb25QaXBlJ31cbiAqL1xuQENPTlNUKClcbkBQaXBlKHtuYW1lOiAnanNvbicsIHB1cmU6IGZhbHNlfSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBKc29uUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0odmFsdWU6IGFueSk6IHN0cmluZyB7IHJldHVybiBKc29uLnN0cmluZ2lmeSh2YWx1ZSk7IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
