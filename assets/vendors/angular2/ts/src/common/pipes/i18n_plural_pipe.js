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
    var interpolationExp, I18nPluralPipe;
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
            interpolationExp = lang_1.RegExpWrapper.create('#');
            /**
             *
             *  Maps a value to a string that pluralizes the value properly.
             *
             *  ## Usage
             *
             *  expression | i18nPlural:mapping
             *
             *  where `expression` is a number and `mapping` is an object that indicates the proper text for
             *  when the `expression` evaluates to 0, 1, or some other number.  You can interpolate the actual
             *  value into the text using the `#` sign.
             *
             *  ## Example
             *
             *  ```
             *  <div>
             *    {{ messages.length | i18nPlural: messageMapping }}
             *  </div>
             *
             *  class MyApp {
             *    messages: any[];
             *    messageMapping: any = {
             *      '=0': 'No messages.',
             *      '=1': 'One message.',
             *      'other': '# messages.'
             *    }
             *    ...
             *  }
             *  ```
             *
             */
            I18nPluralPipe = (function () {
                function I18nPluralPipe() {
                }
                I18nPluralPipe.prototype.transform = function (value, pluralMap) {
                    var key;
                    var valueStr;
                    if (!lang_1.isStringMap(pluralMap)) {
                        throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(I18nPluralPipe, pluralMap);
                    }
                    key = value === 0 || value === 1 ? "=" + value : 'other';
                    valueStr = lang_1.isPresent(value) ? value.toString() : '';
                    return lang_1.StringWrapper.replaceAll(pluralMap[key], interpolationExp, valueStr);
                };
                I18nPluralPipe = __decorate([
                    lang_1.CONST(),
                    core_1.Pipe({ name: 'i18nPlural', pure: true }),
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], I18nPluralPipe);
                return I18nPluralPipe;
            }());
            exports_1("I18nPluralPipe", I18nPluralPipe);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vcGlwZXMvaTE4bl9wbHVyYWxfcGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBVUksZ0JBQWdCOzs7Ozs7Ozs7Ozs7O1lBQWhCLGdCQUFnQixHQUFXLG9CQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRXpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUE4Qkc7WUFJSDtnQkFBQTtnQkFjQSxDQUFDO2dCQWJDLGtDQUFTLEdBQVQsVUFBVSxLQUFhLEVBQUUsU0FBb0M7b0JBQzNELElBQUksR0FBVyxDQUFDO29CQUNoQixJQUFJLFFBQWdCLENBQUM7b0JBRXJCLEVBQUUsQ0FBQyxDQUFDLENBQUMsa0JBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzVCLE1BQU0sSUFBSSw4REFBNEIsQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQ3BFLENBQUM7b0JBRUQsR0FBRyxHQUFHLEtBQUssS0FBSyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsR0FBRyxNQUFJLEtBQU8sR0FBRyxPQUFPLENBQUM7b0JBQ3pELFFBQVEsR0FBRyxnQkFBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUM7b0JBRXBELE1BQU0sQ0FBQyxvQkFBYSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQzlFLENBQUM7Z0JBaEJIO29CQUFDLFlBQUssRUFBRTtvQkFDUCxXQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQztvQkFDdEMsaUJBQVUsRUFBRTs7a0NBQUE7Z0JBZWIscUJBQUM7WUFBRCxDQWRBLEFBY0MsSUFBQTtZQWRELDJDQWNDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9waXBlcy9pMThuX3BsdXJhbF9waXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ09OU1QsXG4gIGlzU3RyaW5nTWFwLFxuICBTdHJpbmdXcmFwcGVyLFxuICBpc1ByZXNlbnQsXG4gIFJlZ0V4cFdyYXBwZXJcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7SW5qZWN0YWJsZSwgUGlwZVRyYW5zZm9ybSwgUGlwZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0ludmFsaWRQaXBlQXJndW1lbnRFeGNlcHRpb259IGZyb20gJy4vaW52YWxpZF9waXBlX2FyZ3VtZW50X2V4Y2VwdGlvbic7XG5cbnZhciBpbnRlcnBvbGF0aW9uRXhwOiBSZWdFeHAgPSBSZWdFeHBXcmFwcGVyLmNyZWF0ZSgnIycpO1xuXG4vKipcbiAqXG4gKiAgTWFwcyBhIHZhbHVlIHRvIGEgc3RyaW5nIHRoYXQgcGx1cmFsaXplcyB0aGUgdmFsdWUgcHJvcGVybHkuXG4gKlxuICogICMjIFVzYWdlXG4gKlxuICogIGV4cHJlc3Npb24gfCBpMThuUGx1cmFsOm1hcHBpbmdcbiAqXG4gKiAgd2hlcmUgYGV4cHJlc3Npb25gIGlzIGEgbnVtYmVyIGFuZCBgbWFwcGluZ2AgaXMgYW4gb2JqZWN0IHRoYXQgaW5kaWNhdGVzIHRoZSBwcm9wZXIgdGV4dCBmb3JcbiAqICB3aGVuIHRoZSBgZXhwcmVzc2lvbmAgZXZhbHVhdGVzIHRvIDAsIDEsIG9yIHNvbWUgb3RoZXIgbnVtYmVyLiAgWW91IGNhbiBpbnRlcnBvbGF0ZSB0aGUgYWN0dWFsXG4gKiAgdmFsdWUgaW50byB0aGUgdGV4dCB1c2luZyB0aGUgYCNgIHNpZ24uXG4gKlxuICogICMjIEV4YW1wbGVcbiAqXG4gKiAgYGBgXG4gKiAgPGRpdj5cbiAqICAgIHt7IG1lc3NhZ2VzLmxlbmd0aCB8IGkxOG5QbHVyYWw6IG1lc3NhZ2VNYXBwaW5nIH19XG4gKiAgPC9kaXY+XG4gKlxuICogIGNsYXNzIE15QXBwIHtcbiAqICAgIG1lc3NhZ2VzOiBhbnlbXTtcbiAqICAgIG1lc3NhZ2VNYXBwaW5nOiBhbnkgPSB7XG4gKiAgICAgICc9MCc6ICdObyBtZXNzYWdlcy4nLFxuICogICAgICAnPTEnOiAnT25lIG1lc3NhZ2UuJyxcbiAqICAgICAgJ290aGVyJzogJyMgbWVzc2FnZXMuJ1xuICogICAgfVxuICogICAgLi4uXG4gKiAgfVxuICogIGBgYFxuICpcbiAqL1xuQENPTlNUKClcbkBQaXBlKHtuYW1lOiAnaTE4blBsdXJhbCcsIHB1cmU6IHRydWV9KVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEkxOG5QbHVyYWxQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybSh2YWx1ZTogbnVtYmVyLCBwbHVyYWxNYXA6IHtbY291bnQ6IHN0cmluZ106IHN0cmluZ30pOiBzdHJpbmcge1xuICAgIHZhciBrZXk6IHN0cmluZztcbiAgICB2YXIgdmFsdWVTdHI6IHN0cmluZztcblxuICAgIGlmICghaXNTdHJpbmdNYXAocGx1cmFsTWFwKSkge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRQaXBlQXJndW1lbnRFeGNlcHRpb24oSTE4blBsdXJhbFBpcGUsIHBsdXJhbE1hcCk7XG4gICAgfVxuXG4gICAga2V5ID0gdmFsdWUgPT09IDAgfHwgdmFsdWUgPT09IDEgPyBgPSR7dmFsdWV9YCA6ICdvdGhlcic7XG4gICAgdmFsdWVTdHIgPSBpc1ByZXNlbnQodmFsdWUpID8gdmFsdWUudG9TdHJpbmcoKSA6ICcnO1xuXG4gICAgcmV0dXJuIFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbChwbHVyYWxNYXBba2V5XSwgaW50ZXJwb2xhdGlvbkV4cCwgdmFsdWVTdHIpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
