System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/core', './invalid_pipe_argument_exception'], function(exports_1, context_1) {
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
    var lang_1, exceptions_1, core_1, invalid_pipe_argument_exception_1;
    var ReplacePipe;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (invalid_pipe_argument_exception_1_1) {
                invalid_pipe_argument_exception_1 = invalid_pipe_argument_exception_1_1;
            }],
        execute: function() {
            /**
             * Creates a new String with some or all of the matches of a pattern replaced by
             * a replacement.
             *
             * The pattern to be matched is specified by the 'pattern' parameter.
             *
             * The replacement to be set is specified by the 'replacement' parameter.
             *
             * An optional 'flags' parameter can be set.
             *
             * ### Usage
             *
             *     expression | replace:pattern:replacement
             *
             * All behavior is based on the expected behavior of the JavaScript API
             * String.prototype.replace() function.
             *
             * Where the input expression is a [String] or [Number] (to be treated as a string),
             * the `pattern` is a [String] or [RegExp],
             * the 'replacement' is a [String] or [Function].
             *
             * --Note--: The 'pattern' parameter will be converted to a RegExp instance. Make sure to escape the
             * string properly if you are matching for regular expression special characters like parenthesis,
             * brackets etc.
             */
            ReplacePipe = (function () {
                function ReplacePipe() {
                }
                ReplacePipe.prototype.transform = function (value, args) {
                    if (lang_1.isBlank(args) || args.length !== 2) {
                        throw new exceptions_1.BaseException('ReplacePipe requires two arguments');
                    }
                    if (lang_1.isBlank(value)) {
                        return value;
                    }
                    if (!this._supportedInput(value)) {
                        throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(ReplacePipe, value);
                    }
                    var input = value.toString();
                    var pattern = args[0];
                    var replacement = args[1];
                    if (!this._supportedPattern(pattern)) {
                        throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(ReplacePipe, pattern);
                    }
                    if (!this._supportedReplacement(replacement)) {
                        throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(ReplacePipe, replacement);
                    }
                    // template fails with literal RegExp e.g /pattern/igm
                    // var rgx = pattern instanceof RegExp ? pattern : RegExpWrapper.create(pattern);
                    if (lang_1.isFunction(replacement)) {
                        var rgxPattern = lang_1.isString(pattern) ? lang_1.RegExpWrapper.create(pattern) : pattern;
                        return lang_1.StringWrapper.replaceAllMapped(input, rgxPattern, replacement);
                    }
                    if (pattern instanceof RegExp) {
                        // use the replaceAll variant
                        return lang_1.StringWrapper.replaceAll(input, pattern, replacement);
                    }
                    return lang_1.StringWrapper.replace(input, pattern, replacement);
                };
                ReplacePipe.prototype._supportedInput = function (input) { return lang_1.isString(input) || lang_1.isNumber(input); };
                ReplacePipe.prototype._supportedPattern = function (pattern) {
                    return lang_1.isString(pattern) || pattern instanceof RegExp;
                };
                ReplacePipe.prototype._supportedReplacement = function (replacement) {
                    return lang_1.isString(replacement) || lang_1.isFunction(replacement);
                };
                ReplacePipe = __decorate([
                    core_1.Pipe({ name: 'replace' }),
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], ReplacePipe);
                return ReplacePipe;
            }());
            exports_1("ReplacePipe", ReplacePipe);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9waXBlcy9yZXBsYWNlX3BpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFZQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBd0JHO1lBSUg7Z0JBQUE7Z0JBa0RBLENBQUM7Z0JBakRDLCtCQUFTLEdBQVQsVUFBVSxLQUFVLEVBQUUsSUFBVztvQkFDL0IsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdkMsTUFBTSxJQUFJLDBCQUFhLENBQUMsb0NBQW9DLENBQUMsQ0FBQztvQkFDaEUsQ0FBQztvQkFFRCxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNuQixNQUFNLENBQUMsS0FBSyxDQUFDO29CQUNmLENBQUM7b0JBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDakMsTUFBTSxJQUFJLDhEQUE0QixDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDN0QsQ0FBQztvQkFFRCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQzdCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUcxQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3JDLE1BQU0sSUFBSSw4REFBNEIsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQy9ELENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM3QyxNQUFNLElBQUksOERBQTRCLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO29CQUNuRSxDQUFDO29CQUNELHNEQUFzRDtvQkFDdEQsaUZBQWlGO29CQUVqRixFQUFFLENBQUMsQ0FBQyxpQkFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDNUIsSUFBSSxVQUFVLEdBQUcsZUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLG9CQUFhLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLE9BQU8sQ0FBQzt3QkFFN0UsTUFBTSxDQUFDLG9CQUFhLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztvQkFDeEUsQ0FBQztvQkFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLFlBQVksTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFDOUIsNkJBQTZCO3dCQUM3QixNQUFNLENBQUMsb0JBQWEsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztvQkFDL0QsQ0FBQztvQkFFRCxNQUFNLENBQUMsb0JBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDNUQsQ0FBQztnQkFFTyxxQ0FBZSxHQUF2QixVQUF3QixLQUFVLElBQWEsTUFBTSxDQUFDLGVBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxlQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVuRix1Q0FBaUIsR0FBekIsVUFBMEIsT0FBWTtvQkFDcEMsTUFBTSxDQUFDLGVBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLFlBQVksTUFBTSxDQUFDO2dCQUN4RCxDQUFDO2dCQUVPLDJDQUFxQixHQUE3QixVQUE4QixXQUFnQjtvQkFDNUMsTUFBTSxDQUFDLGVBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxpQkFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUMxRCxDQUFDO2dCQW5ESDtvQkFBQyxXQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFDLENBQUM7b0JBQ3ZCLGlCQUFVLEVBQUU7OytCQUFBO2dCQW1EYixrQkFBQztZQUFELENBbERBLEFBa0RDLElBQUE7WUFsREQscUNBa0RDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29tbW9uL3BpcGVzL3JlcGxhY2VfcGlwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGlzQmxhbmssXG4gIGlzU3RyaW5nLFxuICBpc051bWJlcixcbiAgaXNGdW5jdGlvbixcbiAgUmVnRXhwV3JhcHBlcixcbiAgU3RyaW5nV3JhcHBlclxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtJbmplY3RhYmxlLCBQaXBlVHJhbnNmb3JtLCBQaXBlfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7SW52YWxpZFBpcGVBcmd1bWVudEV4Y2VwdGlvbn0gZnJvbSAnLi9pbnZhbGlkX3BpcGVfYXJndW1lbnRfZXhjZXB0aW9uJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFN0cmluZyB3aXRoIHNvbWUgb3IgYWxsIG9mIHRoZSBtYXRjaGVzIG9mIGEgcGF0dGVybiByZXBsYWNlZCBieVxuICogYSByZXBsYWNlbWVudC5cbiAqXG4gKiBUaGUgcGF0dGVybiB0byBiZSBtYXRjaGVkIGlzIHNwZWNpZmllZCBieSB0aGUgJ3BhdHRlcm4nIHBhcmFtZXRlci5cbiAqXG4gKiBUaGUgcmVwbGFjZW1lbnQgdG8gYmUgc2V0IGlzIHNwZWNpZmllZCBieSB0aGUgJ3JlcGxhY2VtZW50JyBwYXJhbWV0ZXIuXG4gKlxuICogQW4gb3B0aW9uYWwgJ2ZsYWdzJyBwYXJhbWV0ZXIgY2FuIGJlIHNldC5cbiAqXG4gKiAjIyMgVXNhZ2VcbiAqXG4gKiAgICAgZXhwcmVzc2lvbiB8IHJlcGxhY2U6cGF0dGVybjpyZXBsYWNlbWVudFxuICpcbiAqIEFsbCBiZWhhdmlvciBpcyBiYXNlZCBvbiB0aGUgZXhwZWN0ZWQgYmVoYXZpb3Igb2YgdGhlIEphdmFTY3JpcHQgQVBJXG4gKiBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2UoKSBmdW5jdGlvbi5cbiAqXG4gKiBXaGVyZSB0aGUgaW5wdXQgZXhwcmVzc2lvbiBpcyBhIFtTdHJpbmddIG9yIFtOdW1iZXJdICh0byBiZSB0cmVhdGVkIGFzIGEgc3RyaW5nKSxcbiAqIHRoZSBgcGF0dGVybmAgaXMgYSBbU3RyaW5nXSBvciBbUmVnRXhwXSxcbiAqIHRoZSAncmVwbGFjZW1lbnQnIGlzIGEgW1N0cmluZ10gb3IgW0Z1bmN0aW9uXS5cbiAqXG4gKiAtLU5vdGUtLTogVGhlICdwYXR0ZXJuJyBwYXJhbWV0ZXIgd2lsbCBiZSBjb252ZXJ0ZWQgdG8gYSBSZWdFeHAgaW5zdGFuY2UuIE1ha2Ugc3VyZSB0byBlc2NhcGUgdGhlXG4gKiBzdHJpbmcgcHJvcGVybHkgaWYgeW91IGFyZSBtYXRjaGluZyBmb3IgcmVndWxhciBleHByZXNzaW9uIHNwZWNpYWwgY2hhcmFjdGVycyBsaWtlIHBhcmVudGhlc2lzLFxuICogYnJhY2tldHMgZXRjLlxuICovXG5cbkBQaXBlKHtuYW1lOiAncmVwbGFjZSd9KVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlcGxhY2VQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBhcmdzOiBhbnlbXSk6IGFueSB7XG4gICAgaWYgKGlzQmxhbmsoYXJncykgfHwgYXJncy5sZW5ndGggIT09IDIpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKCdSZXBsYWNlUGlwZSByZXF1aXJlcyB0d28gYXJndW1lbnRzJyk7XG4gICAgfVxuXG4gICAgaWYgKGlzQmxhbmsodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9zdXBwb3J0ZWRJbnB1dCh2YWx1ZSkpIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkUGlwZUFyZ3VtZW50RXhjZXB0aW9uKFJlcGxhY2VQaXBlLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgdmFyIGlucHV0ID0gdmFsdWUudG9TdHJpbmcoKTtcbiAgICB2YXIgcGF0dGVybiA9IGFyZ3NbMF07XG4gICAgdmFyIHJlcGxhY2VtZW50ID0gYXJnc1sxXTtcblxuXG4gICAgaWYgKCF0aGlzLl9zdXBwb3J0ZWRQYXR0ZXJuKHBhdHRlcm4pKSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZFBpcGVBcmd1bWVudEV4Y2VwdGlvbihSZXBsYWNlUGlwZSwgcGF0dGVybik7XG4gICAgfVxuICAgIGlmICghdGhpcy5fc3VwcG9ydGVkUmVwbGFjZW1lbnQocmVwbGFjZW1lbnQpKSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZFBpcGVBcmd1bWVudEV4Y2VwdGlvbihSZXBsYWNlUGlwZSwgcmVwbGFjZW1lbnQpO1xuICAgIH1cbiAgICAvLyB0ZW1wbGF0ZSBmYWlscyB3aXRoIGxpdGVyYWwgUmVnRXhwIGUuZyAvcGF0dGVybi9pZ21cbiAgICAvLyB2YXIgcmd4ID0gcGF0dGVybiBpbnN0YW5jZW9mIFJlZ0V4cCA/IHBhdHRlcm4gOiBSZWdFeHBXcmFwcGVyLmNyZWF0ZShwYXR0ZXJuKTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKHJlcGxhY2VtZW50KSkge1xuICAgICAgdmFyIHJneFBhdHRlcm4gPSBpc1N0cmluZyhwYXR0ZXJuKSA/IFJlZ0V4cFdyYXBwZXIuY3JlYXRlKHBhdHRlcm4pIDogcGF0dGVybjtcblxuICAgICAgcmV0dXJuIFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbE1hcHBlZChpbnB1dCwgcmd4UGF0dGVybiwgcmVwbGFjZW1lbnQpO1xuICAgIH1cbiAgICBpZiAocGF0dGVybiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgLy8gdXNlIHRoZSByZXBsYWNlQWxsIHZhcmlhbnRcbiAgICAgIHJldHVybiBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGwoaW5wdXQsIHBhdHRlcm4sIHJlcGxhY2VtZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gU3RyaW5nV3JhcHBlci5yZXBsYWNlKGlucHV0LCBwYXR0ZXJuLCByZXBsYWNlbWVudCk7XG4gIH1cblxuICBwcml2YXRlIF9zdXBwb3J0ZWRJbnB1dChpbnB1dDogYW55KTogYm9vbGVhbiB7IHJldHVybiBpc1N0cmluZyhpbnB1dCkgfHwgaXNOdW1iZXIoaW5wdXQpOyB9XG5cbiAgcHJpdmF0ZSBfc3VwcG9ydGVkUGF0dGVybihwYXR0ZXJuOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNTdHJpbmcocGF0dGVybikgfHwgcGF0dGVybiBpbnN0YW5jZW9mIFJlZ0V4cDtcbiAgfVxuXG4gIHByaXZhdGUgX3N1cHBvcnRlZFJlcGxhY2VtZW50KHJlcGxhY2VtZW50OiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNTdHJpbmcocmVwbGFjZW1lbnQpIHx8IGlzRnVuY3Rpb24ocmVwbGFjZW1lbnQpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
