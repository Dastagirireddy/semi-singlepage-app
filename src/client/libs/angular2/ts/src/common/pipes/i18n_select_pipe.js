System.register(['angular2/src/facade/lang', 'angular2/src/facade/collection', 'angular2/core', './invalid_pipe_argument_exception'], function(exports_1, context_1) {
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
    var lang_1, collection_1, core_1, invalid_pipe_argument_exception_1;
    var I18nSelectPipe;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (invalid_pipe_argument_exception_1_1) {
                invalid_pipe_argument_exception_1 = invalid_pipe_argument_exception_1_1;
            }],
        execute: function() {
            /**
             *
             *  Generic selector that displays the string that matches the current value.
             *
             *  ## Usage
             *
             *  expression | i18nSelect:mapping
             *
             *  where `mapping` is an object that indicates the text that should be displayed
             *  for different values of the provided `expression`.
             *
             *  ## Example
             *
             *  ```
             *  <div>
             *    {{ gender | i18nSelect: inviteMap }}
             *  </div>
             *
             *  class MyApp {
             *    gender: string = 'male';
             *    inviteMap: any = {
             *      'male': 'Invite her.',
             *      'female': 'Invite him.',
             *      'other': 'Invite them.'
             *    }
             *    ...
             *  }
             *  ```
             */
            I18nSelectPipe = (function () {
                function I18nSelectPipe() {
                }
                I18nSelectPipe.prototype.transform = function (value, args) {
                    if (args === void 0) { args = null; }
                    var mapping = (args[0]);
                    if (!lang_1.isStringMap(mapping)) {
                        throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(I18nSelectPipe, mapping);
                    }
                    return collection_1.StringMapWrapper.contains(mapping, value) ? mapping[value] : mapping['other'];
                };
                I18nSelectPipe = __decorate([
                    lang_1.CONST(),
                    core_1.Pipe({ name: 'i18nSelect', pure: true }),
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], I18nSelectPipe);
                return I18nSelectPipe;
            }());
            exports_1("I18nSelectPipe", I18nSelectPipe);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9waXBlcy9pMThuX3NlbGVjdF9waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBS0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUE0Qkc7WUFJSDtnQkFBQTtnQkFTQSxDQUFDO2dCQVJDLGtDQUFTLEdBQVQsVUFBVSxLQUFhLEVBQUUsSUFBa0I7b0JBQWxCLG9CQUFrQixHQUFsQixXQUFrQjtvQkFDekMsSUFBSSxPQUFPLEdBQXVELENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzVFLEVBQUUsQ0FBQyxDQUFDLENBQUMsa0JBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzFCLE1BQU0sSUFBSSw4REFBNEIsQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQ2xFLENBQUM7b0JBRUQsTUFBTSxDQUFDLDZCQUFnQixDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDdkYsQ0FBQztnQkFYSDtvQkFBQyxZQUFLLEVBQUU7b0JBQ1AsV0FBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUM7b0JBQ3RDLGlCQUFVLEVBQUU7O2tDQUFBO2dCQVViLHFCQUFDO1lBQUQsQ0FUQSxBQVNDLElBQUE7WUFURCwyQ0FTQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9waXBlcy9pMThuX3NlbGVjdF9waXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDT05TVCwgaXNTdHJpbmdNYXB9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge1N0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge0luamVjdGFibGUsIFBpcGVUcmFuc2Zvcm0sIFBpcGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtJbnZhbGlkUGlwZUFyZ3VtZW50RXhjZXB0aW9ufSBmcm9tICcuL2ludmFsaWRfcGlwZV9hcmd1bWVudF9leGNlcHRpb24nO1xuXG4vKipcbiAqXG4gKiAgR2VuZXJpYyBzZWxlY3RvciB0aGF0IGRpc3BsYXlzIHRoZSBzdHJpbmcgdGhhdCBtYXRjaGVzIHRoZSBjdXJyZW50IHZhbHVlLlxuICpcbiAqICAjIyBVc2FnZVxuICpcbiAqICBleHByZXNzaW9uIHwgaTE4blNlbGVjdDptYXBwaW5nXG4gKlxuICogIHdoZXJlIGBtYXBwaW5nYCBpcyBhbiBvYmplY3QgdGhhdCBpbmRpY2F0ZXMgdGhlIHRleHQgdGhhdCBzaG91bGQgYmUgZGlzcGxheWVkXG4gKiAgZm9yIGRpZmZlcmVudCB2YWx1ZXMgb2YgdGhlIHByb3ZpZGVkIGBleHByZXNzaW9uYC5cbiAqXG4gKiAgIyMgRXhhbXBsZVxuICpcbiAqICBgYGBcbiAqICA8ZGl2PlxuICogICAge3sgZ2VuZGVyIHwgaTE4blNlbGVjdDogaW52aXRlTWFwIH19XG4gKiAgPC9kaXY+XG4gKlxuICogIGNsYXNzIE15QXBwIHtcbiAqICAgIGdlbmRlcjogc3RyaW5nID0gJ21hbGUnO1xuICogICAgaW52aXRlTWFwOiBhbnkgPSB7XG4gKiAgICAgICdtYWxlJzogJ0ludml0ZSBoZXIuJyxcbiAqICAgICAgJ2ZlbWFsZSc6ICdJbnZpdGUgaGltLicsXG4gKiAgICAgICdvdGhlcic6ICdJbnZpdGUgdGhlbS4nXG4gKiAgICB9XG4gKiAgICAuLi5cbiAqICB9XG4gKiAgYGBgXG4gKi9cbkBDT05TVCgpXG5AUGlwZSh7bmFtZTogJ2kxOG5TZWxlY3QnLCBwdXJlOiB0cnVlfSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJMThuU2VsZWN0UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZywgYXJnczogYW55W10gPSBudWxsKTogc3RyaW5nIHtcbiAgICB2YXIgbWFwcGluZzoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSA8e1tjb3VudDogc3RyaW5nXTogc3RyaW5nfT4oYXJnc1swXSk7XG4gICAgaWYgKCFpc1N0cmluZ01hcChtYXBwaW5nKSkge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRQaXBlQXJndW1lbnRFeGNlcHRpb24oSTE4blNlbGVjdFBpcGUsIG1hcHBpbmcpO1xuICAgIH1cblxuICAgIHJldHVybiBTdHJpbmdNYXBXcmFwcGVyLmNvbnRhaW5zKG1hcHBpbmcsIHZhbHVlKSA/IG1hcHBpbmdbdmFsdWVdIDogbWFwcGluZ1snb3RoZXInXTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
