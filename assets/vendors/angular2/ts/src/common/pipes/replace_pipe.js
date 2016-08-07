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
    var ReplacePipe;
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
                ReplacePipe.prototype.transform = function (value, pattern, replacement) {
                    if (lang_1.isBlank(value)) {
                        return value;
                    }
                    if (!this._supportedInput(value)) {
                        throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(ReplacePipe, value);
                    }
                    var input = value.toString();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vcGlwZXMvcmVwbGFjZV9waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBV0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQXdCRztZQUlIO2dCQUFBO2dCQTJDQSxDQUFDO2dCQTFDQywrQkFBUyxHQUFULFVBQVUsS0FBVSxFQUFFLE9BQXdCLEVBQUUsV0FBOEI7b0JBQzVFLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ25CLE1BQU0sQ0FBQyxLQUFLLENBQUM7b0JBQ2YsQ0FBQztvQkFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNqQyxNQUFNLElBQUksOERBQTRCLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUM3RCxDQUFDO29CQUVELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFFN0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNyQyxNQUFNLElBQUksOERBQTRCLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUMvRCxDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDN0MsTUFBTSxJQUFJLDhEQUE0QixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztvQkFDbkUsQ0FBQztvQkFDRCxzREFBc0Q7b0JBQ3RELGlGQUFpRjtvQkFFakYsRUFBRSxDQUFDLENBQUMsaUJBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzVCLElBQUksVUFBVSxHQUFHLGVBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxvQkFBYSxDQUFDLE1BQU0sQ0FBUyxPQUFPLENBQUMsR0FBVyxPQUFPLENBQUM7d0JBRTdGLE1BQU0sQ0FBQyxvQkFBYSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxVQUFVLEVBQVksV0FBVyxDQUFDLENBQUM7b0JBQ2xGLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxZQUFZLE1BQU0sQ0FBQyxDQUFDLENBQUM7d0JBQzlCLDZCQUE2Qjt3QkFDN0IsTUFBTSxDQUFDLG9CQUFhLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQVUsV0FBVyxDQUFDLENBQUM7b0JBQ3ZFLENBQUM7b0JBRUQsTUFBTSxDQUFDLG9CQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBVSxPQUFPLEVBQVUsV0FBVyxDQUFDLENBQUM7Z0JBQzVFLENBQUM7Z0JBRU8scUNBQWUsR0FBdkIsVUFBd0IsS0FBVSxJQUFhLE1BQU0sQ0FBQyxlQUFRLENBQUMsS0FBSyxDQUFDLElBQUksZUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFbkYsdUNBQWlCLEdBQXpCLFVBQTBCLE9BQVk7b0JBQ3BDLE1BQU0sQ0FBQyxlQUFRLENBQUMsT0FBTyxDQUFDLElBQUksT0FBTyxZQUFZLE1BQU0sQ0FBQztnQkFDeEQsQ0FBQztnQkFFTywyQ0FBcUIsR0FBN0IsVUFBOEIsV0FBZ0I7b0JBQzVDLE1BQU0sQ0FBQyxlQUFRLENBQUMsV0FBVyxDQUFDLElBQUksaUJBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDMUQsQ0FBQztnQkE1Q0g7b0JBQUMsV0FBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO29CQUN2QixpQkFBVSxFQUFFOzsrQkFBQTtnQkE0Q2Isa0JBQUM7WUFBRCxDQTNDQSxBQTJDQyxJQUFBO1lBM0NELHFDQTJDQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vcGlwZXMvcmVwbGFjZV9waXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgaXNCbGFuayxcbiAgaXNTdHJpbmcsXG4gIGlzTnVtYmVyLFxuICBpc0Z1bmN0aW9uLFxuICBSZWdFeHBXcmFwcGVyLFxuICBTdHJpbmdXcmFwcGVyXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0luamVjdGFibGUsIFBpcGVUcmFuc2Zvcm0sIFBpcGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtJbnZhbGlkUGlwZUFyZ3VtZW50RXhjZXB0aW9ufSBmcm9tICcuL2ludmFsaWRfcGlwZV9hcmd1bWVudF9leGNlcHRpb24nO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgU3RyaW5nIHdpdGggc29tZSBvciBhbGwgb2YgdGhlIG1hdGNoZXMgb2YgYSBwYXR0ZXJuIHJlcGxhY2VkIGJ5XG4gKiBhIHJlcGxhY2VtZW50LlxuICpcbiAqIFRoZSBwYXR0ZXJuIHRvIGJlIG1hdGNoZWQgaXMgc3BlY2lmaWVkIGJ5IHRoZSAncGF0dGVybicgcGFyYW1ldGVyLlxuICpcbiAqIFRoZSByZXBsYWNlbWVudCB0byBiZSBzZXQgaXMgc3BlY2lmaWVkIGJ5IHRoZSAncmVwbGFjZW1lbnQnIHBhcmFtZXRlci5cbiAqXG4gKiBBbiBvcHRpb25hbCAnZmxhZ3MnIHBhcmFtZXRlciBjYW4gYmUgc2V0LlxuICpcbiAqICMjIyBVc2FnZVxuICpcbiAqICAgICBleHByZXNzaW9uIHwgcmVwbGFjZTpwYXR0ZXJuOnJlcGxhY2VtZW50XG4gKlxuICogQWxsIGJlaGF2aW9yIGlzIGJhc2VkIG9uIHRoZSBleHBlY3RlZCBiZWhhdmlvciBvZiB0aGUgSmF2YVNjcmlwdCBBUElcbiAqIFN0cmluZy5wcm90b3R5cGUucmVwbGFjZSgpIGZ1bmN0aW9uLlxuICpcbiAqIFdoZXJlIHRoZSBpbnB1dCBleHByZXNzaW9uIGlzIGEgW1N0cmluZ10gb3IgW051bWJlcl0gKHRvIGJlIHRyZWF0ZWQgYXMgYSBzdHJpbmcpLFxuICogdGhlIGBwYXR0ZXJuYCBpcyBhIFtTdHJpbmddIG9yIFtSZWdFeHBdLFxuICogdGhlICdyZXBsYWNlbWVudCcgaXMgYSBbU3RyaW5nXSBvciBbRnVuY3Rpb25dLlxuICpcbiAqIC0tTm90ZS0tOiBUaGUgJ3BhdHRlcm4nIHBhcmFtZXRlciB3aWxsIGJlIGNvbnZlcnRlZCB0byBhIFJlZ0V4cCBpbnN0YW5jZS4gTWFrZSBzdXJlIHRvIGVzY2FwZSB0aGVcbiAqIHN0cmluZyBwcm9wZXJseSBpZiB5b3UgYXJlIG1hdGNoaW5nIGZvciByZWd1bGFyIGV4cHJlc3Npb24gc3BlY2lhbCBjaGFyYWN0ZXJzIGxpa2UgcGFyZW50aGVzaXMsXG4gKiBicmFja2V0cyBldGMuXG4gKi9cblxuQFBpcGUoe25hbWU6ICdyZXBsYWNlJ30pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVwbGFjZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIHBhdHRlcm46IHN0cmluZyB8IFJlZ0V4cCwgcmVwbGFjZW1lbnQ6IEZ1bmN0aW9uIHwgc3RyaW5nKTogYW55IHtcbiAgICBpZiAoaXNCbGFuayh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX3N1cHBvcnRlZElucHV0KHZhbHVlKSkge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRQaXBlQXJndW1lbnRFeGNlcHRpb24oUmVwbGFjZVBpcGUsIHZhbHVlKTtcbiAgICB9XG5cbiAgICB2YXIgaW5wdXQgPSB2YWx1ZS50b1N0cmluZygpO1xuXG4gICAgaWYgKCF0aGlzLl9zdXBwb3J0ZWRQYXR0ZXJuKHBhdHRlcm4pKSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZFBpcGVBcmd1bWVudEV4Y2VwdGlvbihSZXBsYWNlUGlwZSwgcGF0dGVybik7XG4gICAgfVxuICAgIGlmICghdGhpcy5fc3VwcG9ydGVkUmVwbGFjZW1lbnQocmVwbGFjZW1lbnQpKSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZFBpcGVBcmd1bWVudEV4Y2VwdGlvbihSZXBsYWNlUGlwZSwgcmVwbGFjZW1lbnQpO1xuICAgIH1cbiAgICAvLyB0ZW1wbGF0ZSBmYWlscyB3aXRoIGxpdGVyYWwgUmVnRXhwIGUuZyAvcGF0dGVybi9pZ21cbiAgICAvLyB2YXIgcmd4ID0gcGF0dGVybiBpbnN0YW5jZW9mIFJlZ0V4cCA/IHBhdHRlcm4gOiBSZWdFeHBXcmFwcGVyLmNyZWF0ZShwYXR0ZXJuKTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKHJlcGxhY2VtZW50KSkge1xuICAgICAgdmFyIHJneFBhdHRlcm4gPSBpc1N0cmluZyhwYXR0ZXJuKSA/IFJlZ0V4cFdyYXBwZXIuY3JlYXRlKDxzdHJpbmc+cGF0dGVybikgOiA8UmVnRXhwPnBhdHRlcm47XG5cbiAgICAgIHJldHVybiBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGxNYXBwZWQoaW5wdXQsIHJneFBhdHRlcm4sIDxGdW5jdGlvbj5yZXBsYWNlbWVudCk7XG4gICAgfVxuICAgIGlmIChwYXR0ZXJuIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAvLyB1c2UgdGhlIHJlcGxhY2VBbGwgdmFyaWFudFxuICAgICAgcmV0dXJuIFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbChpbnB1dCwgcGF0dGVybiwgPHN0cmluZz5yZXBsYWNlbWVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFN0cmluZ1dyYXBwZXIucmVwbGFjZShpbnB1dCwgPHN0cmluZz5wYXR0ZXJuLCA8c3RyaW5nPnJlcGxhY2VtZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgX3N1cHBvcnRlZElucHV0KGlucHV0OiBhbnkpOiBib29sZWFuIHsgcmV0dXJuIGlzU3RyaW5nKGlucHV0KSB8fCBpc051bWJlcihpbnB1dCk7IH1cblxuICBwcml2YXRlIF9zdXBwb3J0ZWRQYXR0ZXJuKHBhdHRlcm46IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc1N0cmluZyhwYXR0ZXJuKSB8fCBwYXR0ZXJuIGluc3RhbmNlb2YgUmVnRXhwO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3VwcG9ydGVkUmVwbGFjZW1lbnQocmVwbGFjZW1lbnQ6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc1N0cmluZyhyZXBsYWNlbWVudCkgfHwgaXNGdW5jdGlvbihyZXBsYWNlbWVudCk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
