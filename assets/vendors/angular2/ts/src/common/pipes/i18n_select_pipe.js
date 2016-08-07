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
                I18nSelectPipe.prototype.transform = function (value, mapping) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vcGlwZXMvaTE4bl9zZWxlY3RfcGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUtBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBNEJHO1lBSUg7Z0JBQUE7Z0JBUUEsQ0FBQztnQkFQQyxrQ0FBUyxHQUFULFVBQVUsS0FBYSxFQUFFLE9BQWdDO29CQUN2RCxFQUFFLENBQUMsQ0FBQyxDQUFDLGtCQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMxQixNQUFNLElBQUksOERBQTRCLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUNsRSxDQUFDO29CQUVELE1BQU0sQ0FBQyw2QkFBZ0IsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3ZGLENBQUM7Z0JBVkg7b0JBQUMsWUFBSyxFQUFFO29CQUNQLFdBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDO29CQUN0QyxpQkFBVSxFQUFFOztrQ0FBQTtnQkFTYixxQkFBQztZQUFELENBUkEsQUFRQyxJQUFBO1lBUkQsMkNBUUMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tbW9uL3BpcGVzL2kxOG5fc2VsZWN0X3BpcGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NPTlNULCBpc1N0cmluZ01hcH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7U3RyaW5nTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7SW5qZWN0YWJsZSwgUGlwZVRyYW5zZm9ybSwgUGlwZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0ludmFsaWRQaXBlQXJndW1lbnRFeGNlcHRpb259IGZyb20gJy4vaW52YWxpZF9waXBlX2FyZ3VtZW50X2V4Y2VwdGlvbic7XG5cbi8qKlxuICpcbiAqICBHZW5lcmljIHNlbGVjdG9yIHRoYXQgZGlzcGxheXMgdGhlIHN0cmluZyB0aGF0IG1hdGNoZXMgdGhlIGN1cnJlbnQgdmFsdWUuXG4gKlxuICogICMjIFVzYWdlXG4gKlxuICogIGV4cHJlc3Npb24gfCBpMThuU2VsZWN0Om1hcHBpbmdcbiAqXG4gKiAgd2hlcmUgYG1hcHBpbmdgIGlzIGFuIG9iamVjdCB0aGF0IGluZGljYXRlcyB0aGUgdGV4dCB0aGF0IHNob3VsZCBiZSBkaXNwbGF5ZWRcbiAqICBmb3IgZGlmZmVyZW50IHZhbHVlcyBvZiB0aGUgcHJvdmlkZWQgYGV4cHJlc3Npb25gLlxuICpcbiAqICAjIyBFeGFtcGxlXG4gKlxuICogIGBgYFxuICogIDxkaXY+XG4gKiAgICB7eyBnZW5kZXIgfCBpMThuU2VsZWN0OiBpbnZpdGVNYXAgfX1cbiAqICA8L2Rpdj5cbiAqXG4gKiAgY2xhc3MgTXlBcHAge1xuICogICAgZ2VuZGVyOiBzdHJpbmcgPSAnbWFsZSc7XG4gKiAgICBpbnZpdGVNYXA6IGFueSA9IHtcbiAqICAgICAgJ21hbGUnOiAnSW52aXRlIGhlci4nLFxuICogICAgICAnZmVtYWxlJzogJ0ludml0ZSBoaW0uJyxcbiAqICAgICAgJ290aGVyJzogJ0ludml0ZSB0aGVtLidcbiAqICAgIH1cbiAqICAgIC4uLlxuICogIH1cbiAqICBgYGBcbiAqL1xuQENPTlNUKClcbkBQaXBlKHtuYW1lOiAnaTE4blNlbGVjdCcsIHB1cmU6IHRydWV9KVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEkxOG5TZWxlY3RQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nLCBtYXBwaW5nOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSk6IHN0cmluZyB7XG4gICAgaWYgKCFpc1N0cmluZ01hcChtYXBwaW5nKSkge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRQaXBlQXJndW1lbnRFeGNlcHRpb24oSTE4blNlbGVjdFBpcGUsIG1hcHBpbmcpO1xuICAgIH1cblxuICAgIHJldHVybiBTdHJpbmdNYXBXcmFwcGVyLmNvbnRhaW5zKG1hcHBpbmcsIHZhbHVlKSA/IG1hcHBpbmdbdmFsdWVdIDogbWFwcGluZ1snb3RoZXInXTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
