System.register(['angular2/src/facade/lang', 'angular2/src/facade/promise', 'angular2/src/facade/async', 'angular2/src/facade/collection', 'angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, promise_1, async_1, collection_1, core_1;
    var NG_VALIDATORS, NG_ASYNC_VALIDATORS, Validators;
    function _convertToPromise(obj) {
        return promise_1.PromiseWrapper.isPromise(obj) ? obj : async_1.ObservableWrapper.toPromise(obj);
    }
    function _executeValidators(control, validators) {
        return validators.map(function (v) { return v(control); });
    }
    function _executeAsyncValidators(control, validators) {
        return validators.map(function (v) { return v(control); });
    }
    function _mergeErrors(arrayOfErrors) {
        var res = arrayOfErrors.reduce(function (res, errors) {
            return lang_1.isPresent(errors) ? collection_1.StringMapWrapper.merge(res, errors) : res;
        }, {});
        return collection_1.StringMapWrapper.isEmpty(res) ? null : res;
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (promise_1_1) {
                promise_1 = promise_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            /**
             * Providers for validators to be used for {@link Control}s in a form.
             *
             * Provide this using `multi: true` to add validators.
             *
             * ### Example
             *
             * {@example core/forms/ts/ng_validators/ng_validators.ts region='ng_validators'}
             */
            exports_1("NG_VALIDATORS", NG_VALIDATORS = lang_1.CONST_EXPR(new core_1.OpaqueToken("NgValidators")));
            /**
             * Providers for asynchronous validators to be used for {@link Control}s
             * in a form.
             *
             * Provide this using `multi: true` to add validators.
             *
             * See {@link NG_VALIDATORS} for more details.
             */
            exports_1("NG_ASYNC_VALIDATORS", NG_ASYNC_VALIDATORS = lang_1.CONST_EXPR(new core_1.OpaqueToken("NgAsyncValidators")));
            /**
             * Provides a set of validators used by form controls.
             *
             * A validator is a function that processes a {@link Control} or collection of
             * controls and returns a map of errors. A null map means that validation has passed.
             *
             * ### Example
             *
             * ```typescript
             * var loginControl = new Control("", Validators.required)
             * ```
             */
            Validators = (function () {
                function Validators() {
                }
                /**
                 * Validator that requires controls to have a non-empty value.
                 */
                Validators.required = function (control) {
                    return lang_1.isBlank(control.value) || (lang_1.isString(control.value) && control.value == "") ?
                        { "required": true } :
                        null;
                };
                /**
                 * Validator that requires controls to have a value of a minimum length.
                 */
                Validators.minLength = function (minLength) {
                    return function (control) {
                        if (lang_1.isPresent(Validators.required(control)))
                            return null;
                        var v = control.value;
                        return v.length < minLength ?
                            { "minlength": { "requiredLength": minLength, "actualLength": v.length } } :
                            null;
                    };
                };
                /**
                 * Validator that requires controls to have a value of a maximum length.
                 */
                Validators.maxLength = function (maxLength) {
                    return function (control) {
                        if (lang_1.isPresent(Validators.required(control)))
                            return null;
                        var v = control.value;
                        return v.length > maxLength ?
                            { "maxlength": { "requiredLength": maxLength, "actualLength": v.length } } :
                            null;
                    };
                };
                /**
                 * Validator that requires a control to match a regex to its value.
                 */
                Validators.pattern = function (pattern) {
                    return function (control) {
                        if (lang_1.isPresent(Validators.required(control)))
                            return null;
                        var regex = new RegExp("^" + pattern + "$");
                        var v = control.value;
                        return regex.test(v) ? null :
                            { "pattern": { "requiredPattern": "^" + pattern + "$", "actualValue": v } };
                    };
                };
                /**
                 * No-op validator.
                 */
                Validators.nullValidator = function (c) { return null; };
                /**
                 * Compose multiple validators into a single function that returns the union
                 * of the individual error maps.
                 */
                Validators.compose = function (validators) {
                    if (lang_1.isBlank(validators))
                        return null;
                    var presentValidators = validators.filter(lang_1.isPresent);
                    if (presentValidators.length == 0)
                        return null;
                    return function (control) {
                        return _mergeErrors(_executeValidators(control, presentValidators));
                    };
                };
                Validators.composeAsync = function (validators) {
                    if (lang_1.isBlank(validators))
                        return null;
                    var presentValidators = validators.filter(lang_1.isPresent);
                    if (presentValidators.length == 0)
                        return null;
                    return function (control) {
                        var promises = _executeAsyncValidators(control, presentValidators).map(_convertToPromise);
                        return promise_1.PromiseWrapper.all(promises).then(_mergeErrors);
                    };
                };
                return Validators;
            }());
            exports_1("Validators", Validators);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy92YWxpZGF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFrQmEsYUFBYSxFQVViLG1CQUFtQjtJQThGaEMsMkJBQTJCLEdBQVE7UUFDakMsTUFBTSxDQUFDLHdCQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyx5QkFBaUIsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVELDRCQUE0QixPQUFvQyxFQUNwQyxVQUF5QjtRQUNuRCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBVixDQUFVLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsaUNBQWlDLE9BQW9DLEVBQ3BDLFVBQThCO1FBQzdELE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFWLENBQVUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxzQkFBc0IsYUFBb0I7UUFDeEMsSUFBSSxHQUFHLEdBQ0gsYUFBYSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQXlCLEVBQUUsTUFBNEI7WUFDM0UsTUFBTSxDQUFDLGdCQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsNkJBQWdCLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDdkUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ1gsTUFBTSxDQUFDLDZCQUFnQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDO0lBQ3BELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFySUQ7Ozs7Ozs7O2VBUUc7WUFDVSwyQkFBQSxhQUFhLEdBQWdCLGlCQUFV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TSxDQUFDLElBQUksQ0FBQztvQkFDckMsSUFBSSxpQkFBaUIsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLGdCQUFTLENBQUMsQ0FBQztvQkFDckQsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQzt3QkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUUvQyxNQUFNLENBQUMsVUFBUyxPQUFvQzt3QkFDbEQsTUFBTSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO29CQUN0RSxDQUFDLENBQUM7Z0JBQ0osQ0FBQztnQkFFTSx1QkFBWSxHQUFuQixVQUFvQixVQUE4QjtvQkFDaEQsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ3JDLElBQUksaUJBQWlCLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxnQkFBUyxDQUFDLENBQUM7b0JBQ3JELEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7d0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFFL0MsTUFBTSxDQUFDLFVBQVMsT0FBb0M7d0JBQ2xELElBQUksUUFBUSxHQUFHLHVCQUF1QixDQUFDLE9BQU8sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO3dCQUMxRixNQUFNLENBQUMsd0JBQWMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUN6RCxDQUFDLENBQUM7Z0JBQ0osQ0FBQztnQkFDSCxpQkFBQztZQUFELENBOUVBLEFBOEVDLElBQUE7WUE5RUQsbUNBOEVDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29tbW9uL2Zvcm1zL3ZhbGlkYXRvcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzQmxhbmssIGlzUHJlc2VudCwgQ09OU1RfRVhQUiwgaXNTdHJpbmd9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge1Byb21pc2VXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL3Byb21pc2UnO1xuaW1wb3J0IHtPYnNlcnZhYmxlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5pbXBvcnQge0xpc3RXcmFwcGVyLCBTdHJpbmdNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtPcGFxdWVUb2tlbn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5cbmltcG9ydCAqIGFzIG1vZGVsTW9kdWxlIGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHtWYWxpZGF0b3JGbiwgQXN5bmNWYWxpZGF0b3JGbn0gZnJvbSAnLi9kaXJlY3RpdmVzL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIFByb3ZpZGVycyBmb3IgdmFsaWRhdG9ycyB0byBiZSB1c2VkIGZvciB7QGxpbmsgQ29udHJvbH1zIGluIGEgZm9ybS5cbiAqXG4gKiBQcm92aWRlIHRoaXMgdXNpbmcgYG11bHRpOiB0cnVlYCB0byBhZGQgdmFsaWRhdG9ycy5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIHtAZXhhbXBsZSBjb3JlL2Zvcm1zL3RzL25nX3ZhbGlkYXRvcnMvbmdfdmFsaWRhdG9ycy50cyByZWdpb249J25nX3ZhbGlkYXRvcnMnfVxuICovXG5leHBvcnQgY29uc3QgTkdfVkFMSURBVE9SUzogT3BhcXVlVG9rZW4gPSBDT05TVF9FWFBSKG5ldyBPcGFxdWVUb2tlbihcIk5nVmFsaWRhdG9yc1wiKSk7XG5cbi8qKlxuICogUHJvdmlkZXJzIGZvciBhc3luY2hyb25vdXMgdmFsaWRhdG9ycyB0byBiZSB1c2VkIGZvciB7QGxpbmsgQ29udHJvbH1zXG4gKiBpbiBhIGZvcm0uXG4gKlxuICogUHJvdmlkZSB0aGlzIHVzaW5nIGBtdWx0aTogdHJ1ZWAgdG8gYWRkIHZhbGlkYXRvcnMuXG4gKlxuICogU2VlIHtAbGluayBOR19WQUxJREFUT1JTfSBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG5leHBvcnQgY29uc3QgTkdfQVNZTkNfVkFMSURBVE9SUzogT3BhcXVlVG9rZW4gPSBDT05TVF9FWFBSKG5ldyBPcGFxdWVUb2tlbihcIk5nQXN5bmNWYWxpZGF0b3JzXCIpKTtcblxuLyoqXG4gKiBQcm92aWRlcyBhIHNldCBvZiB2YWxpZGF0b3JzIHVzZWQgYnkgZm9ybSBjb250cm9scy5cbiAqXG4gKiBBIHZhbGlkYXRvciBpcyBhIGZ1bmN0aW9uIHRoYXQgcHJvY2Vzc2VzIGEge0BsaW5rIENvbnRyb2x9IG9yIGNvbGxlY3Rpb24gb2ZcbiAqIGNvbnRyb2xzIGFuZCByZXR1cm5zIGEgbWFwIG9mIGVycm9ycy4gQSBudWxsIG1hcCBtZWFucyB0aGF0IHZhbGlkYXRpb24gaGFzIHBhc3NlZC5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIHZhciBsb2dpbkNvbnRyb2wgPSBuZXcgQ29udHJvbChcIlwiLCBWYWxpZGF0b3JzLnJlcXVpcmVkKVxuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBWYWxpZGF0b3JzIHtcbiAgLyoqXG4gICAqIFZhbGlkYXRvciB0aGF0IHJlcXVpcmVzIGNvbnRyb2xzIHRvIGhhdmUgYSBub24tZW1wdHkgdmFsdWUuXG4gICAqL1xuICBzdGF0aWMgcmVxdWlyZWQoY29udHJvbDogbW9kZWxNb2R1bGUuQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGJvb2xlYW59IHtcbiAgICByZXR1cm4gaXNCbGFuayhjb250cm9sLnZhbHVlKSB8fCAoaXNTdHJpbmcoY29udHJvbC52YWx1ZSkgJiYgY29udHJvbC52YWx1ZSA9PSBcIlwiKSA/XG4gICAgICAgICAgICAgICB7XCJyZXF1aXJlZFwiOiB0cnVlfSA6XG4gICAgICAgICAgICAgICBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRvciB0aGF0IHJlcXVpcmVzIGNvbnRyb2xzIHRvIGhhdmUgYSB2YWx1ZSBvZiBhIG1pbmltdW0gbGVuZ3RoLlxuICAgKi9cbiAgc3RhdGljIG1pbkxlbmd0aChtaW5MZW5ndGg6IG51bWJlcik6IFZhbGlkYXRvckZuIHtcbiAgICByZXR1cm4gKGNvbnRyb2w6IG1vZGVsTW9kdWxlLkFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0+IHtcbiAgICAgIGlmIChpc1ByZXNlbnQoVmFsaWRhdG9ycy5yZXF1aXJlZChjb250cm9sKSkpIHJldHVybiBudWxsO1xuICAgICAgdmFyIHY6IHN0cmluZyA9IGNvbnRyb2wudmFsdWU7XG4gICAgICByZXR1cm4gdi5sZW5ndGggPCBtaW5MZW5ndGggP1xuICAgICAgICAgICAgICAgICB7XCJtaW5sZW5ndGhcIjoge1wicmVxdWlyZWRMZW5ndGhcIjogbWluTGVuZ3RoLCBcImFjdHVhbExlbmd0aFwiOiB2Lmxlbmd0aH19IDpcbiAgICAgICAgICAgICAgICAgbnVsbDtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRvciB0aGF0IHJlcXVpcmVzIGNvbnRyb2xzIHRvIGhhdmUgYSB2YWx1ZSBvZiBhIG1heGltdW0gbGVuZ3RoLlxuICAgKi9cbiAgc3RhdGljIG1heExlbmd0aChtYXhMZW5ndGg6IG51bWJlcik6IFZhbGlkYXRvckZuIHtcbiAgICByZXR1cm4gKGNvbnRyb2w6IG1vZGVsTW9kdWxlLkFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0+IHtcbiAgICAgIGlmIChpc1ByZXNlbnQoVmFsaWRhdG9ycy5yZXF1aXJlZChjb250cm9sKSkpIHJldHVybiBudWxsO1xuICAgICAgdmFyIHY6IHN0cmluZyA9IGNvbnRyb2wudmFsdWU7XG4gICAgICByZXR1cm4gdi5sZW5ndGggPiBtYXhMZW5ndGggP1xuICAgICAgICAgICAgICAgICB7XCJtYXhsZW5ndGhcIjoge1wicmVxdWlyZWRMZW5ndGhcIjogbWF4TGVuZ3RoLCBcImFjdHVhbExlbmd0aFwiOiB2Lmxlbmd0aH19IDpcbiAgICAgICAgICAgICAgICAgbnVsbDtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRvciB0aGF0IHJlcXVpcmVzIGEgY29udHJvbCB0byBtYXRjaCBhIHJlZ2V4IHRvIGl0cyB2YWx1ZS5cbiAgICovXG4gIHN0YXRpYyBwYXR0ZXJuKHBhdHRlcm46IHN0cmluZyk6IFZhbGlkYXRvckZuIHtcbiAgICByZXR1cm4gKGNvbnRyb2w6IG1vZGVsTW9kdWxlLkFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0+IHtcbiAgICAgIGlmIChpc1ByZXNlbnQoVmFsaWRhdG9ycy5yZXF1aXJlZChjb250cm9sKSkpIHJldHVybiBudWxsO1xuICAgICAgbGV0IHJlZ2V4ID0gbmV3IFJlZ0V4cChgXiR7cGF0dGVybn0kYCk7XG4gICAgICBsZXQgdjogc3RyaW5nID0gY29udHJvbC52YWx1ZTtcbiAgICAgIHJldHVybiByZWdleC50ZXN0KHYpID8gbnVsbCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcInBhdHRlcm5cIjoge1wicmVxdWlyZWRQYXR0ZXJuXCI6IGBeJHtwYXR0ZXJufSRgLCBcImFjdHVhbFZhbHVlXCI6IHZ9fTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIE5vLW9wIHZhbGlkYXRvci5cbiAgICovXG4gIHN0YXRpYyBudWxsVmFsaWRhdG9yKGM6IG1vZGVsTW9kdWxlLkFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBib29sZWFufSB7IHJldHVybiBudWxsOyB9XG5cbiAgLyoqXG4gICAqIENvbXBvc2UgbXVsdGlwbGUgdmFsaWRhdG9ycyBpbnRvIGEgc2luZ2xlIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdW5pb25cbiAgICogb2YgdGhlIGluZGl2aWR1YWwgZXJyb3IgbWFwcy5cbiAgICovXG4gIHN0YXRpYyBjb21wb3NlKHZhbGlkYXRvcnM6IFZhbGlkYXRvckZuW10pOiBWYWxpZGF0b3JGbiB7XG4gICAgaWYgKGlzQmxhbmsodmFsaWRhdG9ycykpIHJldHVybiBudWxsO1xuICAgIHZhciBwcmVzZW50VmFsaWRhdG9ycyA9IHZhbGlkYXRvcnMuZmlsdGVyKGlzUHJlc2VudCk7XG4gICAgaWYgKHByZXNlbnRWYWxpZGF0b3JzLmxlbmd0aCA9PSAwKSByZXR1cm4gbnVsbDtcblxuICAgIHJldHVybiBmdW5jdGlvbihjb250cm9sOiBtb2RlbE1vZHVsZS5BYnN0cmFjdENvbnRyb2wpIHtcbiAgICAgIHJldHVybiBfbWVyZ2VFcnJvcnMoX2V4ZWN1dGVWYWxpZGF0b3JzKGNvbnRyb2wsIHByZXNlbnRWYWxpZGF0b3JzKSk7XG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBjb21wb3NlQXN5bmModmFsaWRhdG9yczogQXN5bmNWYWxpZGF0b3JGbltdKTogQXN5bmNWYWxpZGF0b3JGbiB7XG4gICAgaWYgKGlzQmxhbmsodmFsaWRhdG9ycykpIHJldHVybiBudWxsO1xuICAgIHZhciBwcmVzZW50VmFsaWRhdG9ycyA9IHZhbGlkYXRvcnMuZmlsdGVyKGlzUHJlc2VudCk7XG4gICAgaWYgKHByZXNlbnRWYWxpZGF0b3JzLmxlbmd0aCA9PSAwKSByZXR1cm4gbnVsbDtcblxuICAgIHJldHVybiBmdW5jdGlvbihjb250cm9sOiBtb2RlbE1vZHVsZS5BYnN0cmFjdENvbnRyb2wpIHtcbiAgICAgIGxldCBwcm9taXNlcyA9IF9leGVjdXRlQXN5bmNWYWxpZGF0b3JzKGNvbnRyb2wsIHByZXNlbnRWYWxpZGF0b3JzKS5tYXAoX2NvbnZlcnRUb1Byb21pc2UpO1xuICAgICAgcmV0dXJuIFByb21pc2VXcmFwcGVyLmFsbChwcm9taXNlcykudGhlbihfbWVyZ2VFcnJvcnMpO1xuICAgIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NvbnZlcnRUb1Byb21pc2Uob2JqOiBhbnkpOiBhbnkge1xuICByZXR1cm4gUHJvbWlzZVdyYXBwZXIuaXNQcm9taXNlKG9iaikgPyBvYmogOiBPYnNlcnZhYmxlV3JhcHBlci50b1Byb21pc2Uob2JqKTtcbn1cblxuZnVuY3Rpb24gX2V4ZWN1dGVWYWxpZGF0b3JzKGNvbnRyb2w6IG1vZGVsTW9kdWxlLkFic3RyYWN0Q29udHJvbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBWYWxpZGF0b3JGbltdKTogYW55W10ge1xuICByZXR1cm4gdmFsaWRhdG9ycy5tYXAodiA9PiB2KGNvbnRyb2wpKTtcbn1cblxuZnVuY3Rpb24gX2V4ZWN1dGVBc3luY1ZhbGlkYXRvcnMoY29udHJvbDogbW9kZWxNb2R1bGUuQWJzdHJhY3RDb250cm9sLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogQXN5bmNWYWxpZGF0b3JGbltdKTogYW55W10ge1xuICByZXR1cm4gdmFsaWRhdG9ycy5tYXAodiA9PiB2KGNvbnRyb2wpKTtcbn1cblxuZnVuY3Rpb24gX21lcmdlRXJyb3JzKGFycmF5T2ZFcnJvcnM6IGFueVtdKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICB2YXIgcmVzOiB7W2tleTogc3RyaW5nXTogYW55fSA9XG4gICAgICBhcnJheU9mRXJyb3JzLnJlZHVjZSgocmVzOiB7W2tleTogc3RyaW5nXTogYW55fSwgZXJyb3JzOiB7W2tleTogc3RyaW5nXTogYW55fSkgPT4ge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KGVycm9ycykgPyBTdHJpbmdNYXBXcmFwcGVyLm1lcmdlKHJlcywgZXJyb3JzKSA6IHJlcztcbiAgICAgIH0sIHt9KTtcbiAgcmV0dXJuIFN0cmluZ01hcFdyYXBwZXIuaXNFbXB0eShyZXMpID8gbnVsbCA6IHJlcztcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
