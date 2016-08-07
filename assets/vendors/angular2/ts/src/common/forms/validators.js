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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZm9ybXMvdmFsaWRhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBa0JhLGFBQWEsRUFVYixtQkFBbUI7SUE4RmhDLDJCQUEyQixHQUFRO1FBQ2pDLE1BQU0sQ0FBQyx3QkFBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcseUJBQWlCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFFRCw0QkFBNEIsT0FBb0MsRUFDcEMsVUFBeUI7UUFDbkQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQVYsQ0FBVSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELGlDQUFpQyxPQUFvQyxFQUNwQyxVQUE4QjtRQUM3RCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBVixDQUFVLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsc0JBQXNCLGFBQW9CO1FBQ3hDLElBQUksR0FBRyxHQUNILGFBQWEsQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUF5QixFQUFFLE1BQTRCO1lBQzNFLE1BQU0sQ0FBQyxnQkFBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLDZCQUFnQixDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3ZFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNYLE1BQU0sQ0FBQyw2QkFBZ0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUNwRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBcklEOzs7Ozs7OztlQVFHO1lBQ1UsMkJBQUEsYUFBYSxHQUFnQixpQkFBVSxDQUFD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QyxJQUFJLENBQUM7b0JBQ3JDLElBQUksaUJBQWlCLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxnQkFBUyxDQUFDLENBQUM7b0JBQ3JELEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7d0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFFL0MsTUFBTSxDQUFDLFVBQVMsT0FBb0M7d0JBQ2xELE1BQU0sQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLENBQUMsQ0FBQztvQkFDdEUsQ0FBQyxDQUFDO2dCQUNKLENBQUM7Z0JBRU0sdUJBQVksR0FBbkIsVUFBb0IsVUFBOEI7b0JBQ2hELEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNyQyxJQUFJLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsZ0JBQVMsQ0FBQyxDQUFDO29CQUNyRCxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBRS9DLE1BQU0sQ0FBQyxVQUFTLE9BQW9DO3dCQUNsRCxJQUFJLFFBQVEsR0FBRyx1QkFBdUIsQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQzt3QkFDMUYsTUFBTSxDQUFDLHdCQUFjLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDekQsQ0FBQyxDQUFDO2dCQUNKLENBQUM7Z0JBQ0gsaUJBQUM7WUFBRCxDQTlFQSxBQThFQyxJQUFBO1lBOUVELG1DQThFQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZm9ybXMvdmFsaWRhdG9ycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNCbGFuaywgaXNQcmVzZW50LCBDT05TVF9FWFBSLCBpc1N0cmluZ30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7UHJvbWlzZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvcHJvbWlzZSc7XG5pbXBvcnQge09ic2VydmFibGVXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jJztcbmltcG9ydCB7TGlzdFdyYXBwZXIsIFN0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge09wYXF1ZVRva2VufSBmcm9tICdhbmd1bGFyMi9jb3JlJztcblxuaW1wb3J0ICogYXMgbW9kZWxNb2R1bGUgZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQge1ZhbGlkYXRvckZuLCBBc3luY1ZhbGlkYXRvckZufSBmcm9tICcuL2RpcmVjdGl2ZXMvdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogUHJvdmlkZXJzIGZvciB2YWxpZGF0b3JzIHRvIGJlIHVzZWQgZm9yIHtAbGluayBDb250cm9sfXMgaW4gYSBmb3JtLlxuICpcbiAqIFByb3ZpZGUgdGhpcyB1c2luZyBgbXVsdGk6IHRydWVgIHRvIGFkZCB2YWxpZGF0b3JzLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIGNvcmUvZm9ybXMvdHMvbmdfdmFsaWRhdG9ycy9uZ192YWxpZGF0b3JzLnRzIHJlZ2lvbj0nbmdfdmFsaWRhdG9ycyd9XG4gKi9cbmV4cG9ydCBjb25zdCBOR19WQUxJREFUT1JTOiBPcGFxdWVUb2tlbiA9IENPTlNUX0VYUFIobmV3IE9wYXF1ZVRva2VuKFwiTmdWYWxpZGF0b3JzXCIpKTtcblxuLyoqXG4gKiBQcm92aWRlcnMgZm9yIGFzeW5jaHJvbm91cyB2YWxpZGF0b3JzIHRvIGJlIHVzZWQgZm9yIHtAbGluayBDb250cm9sfXNcbiAqIGluIGEgZm9ybS5cbiAqXG4gKiBQcm92aWRlIHRoaXMgdXNpbmcgYG11bHRpOiB0cnVlYCB0byBhZGQgdmFsaWRhdG9ycy5cbiAqXG4gKiBTZWUge0BsaW5rIE5HX1ZBTElEQVRPUlN9IGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbmV4cG9ydCBjb25zdCBOR19BU1lOQ19WQUxJREFUT1JTOiBPcGFxdWVUb2tlbiA9IENPTlNUX0VYUFIobmV3IE9wYXF1ZVRva2VuKFwiTmdBc3luY1ZhbGlkYXRvcnNcIikpO1xuXG4vKipcbiAqIFByb3ZpZGVzIGEgc2V0IG9mIHZhbGlkYXRvcnMgdXNlZCBieSBmb3JtIGNvbnRyb2xzLlxuICpcbiAqIEEgdmFsaWRhdG9yIGlzIGEgZnVuY3Rpb24gdGhhdCBwcm9jZXNzZXMgYSB7QGxpbmsgQ29udHJvbH0gb3IgY29sbGVjdGlvbiBvZlxuICogY29udHJvbHMgYW5kIHJldHVybnMgYSBtYXAgb2YgZXJyb3JzLiBBIG51bGwgbWFwIG1lYW5zIHRoYXQgdmFsaWRhdGlvbiBoYXMgcGFzc2VkLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogdmFyIGxvZ2luQ29udHJvbCA9IG5ldyBDb250cm9sKFwiXCIsIFZhbGlkYXRvcnMucmVxdWlyZWQpXG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNsYXNzIFZhbGlkYXRvcnMge1xuICAvKipcbiAgICogVmFsaWRhdG9yIHRoYXQgcmVxdWlyZXMgY29udHJvbHMgdG8gaGF2ZSBhIG5vbi1lbXB0eSB2YWx1ZS5cbiAgICovXG4gIHN0YXRpYyByZXF1aXJlZChjb250cm9sOiBtb2RlbE1vZHVsZS5BYnN0cmFjdENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn0ge1xuICAgIHJldHVybiBpc0JsYW5rKGNvbnRyb2wudmFsdWUpIHx8IChpc1N0cmluZyhjb250cm9sLnZhbHVlKSAmJiBjb250cm9sLnZhbHVlID09IFwiXCIpID9cbiAgICAgICAgICAgICAgIHtcInJlcXVpcmVkXCI6IHRydWV9IDpcbiAgICAgICAgICAgICAgIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdG9yIHRoYXQgcmVxdWlyZXMgY29udHJvbHMgdG8gaGF2ZSBhIHZhbHVlIG9mIGEgbWluaW11bSBsZW5ndGguXG4gICAqL1xuICBzdGF0aWMgbWluTGVuZ3RoKG1pbkxlbmd0aDogbnVtYmVyKTogVmFsaWRhdG9yRm4ge1xuICAgIHJldHVybiAoY29udHJvbDogbW9kZWxNb2R1bGUuQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX0gPT4ge1xuICAgICAgaWYgKGlzUHJlc2VudChWYWxpZGF0b3JzLnJlcXVpcmVkKGNvbnRyb2wpKSkgcmV0dXJuIG51bGw7XG4gICAgICB2YXIgdjogc3RyaW5nID0gY29udHJvbC52YWx1ZTtcbiAgICAgIHJldHVybiB2Lmxlbmd0aCA8IG1pbkxlbmd0aCA/XG4gICAgICAgICAgICAgICAgIHtcIm1pbmxlbmd0aFwiOiB7XCJyZXF1aXJlZExlbmd0aFwiOiBtaW5MZW5ndGgsIFwiYWN0dWFsTGVuZ3RoXCI6IHYubGVuZ3RofX0gOlxuICAgICAgICAgICAgICAgICBudWxsO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdG9yIHRoYXQgcmVxdWlyZXMgY29udHJvbHMgdG8gaGF2ZSBhIHZhbHVlIG9mIGEgbWF4aW11bSBsZW5ndGguXG4gICAqL1xuICBzdGF0aWMgbWF4TGVuZ3RoKG1heExlbmd0aDogbnVtYmVyKTogVmFsaWRhdG9yRm4ge1xuICAgIHJldHVybiAoY29udHJvbDogbW9kZWxNb2R1bGUuQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX0gPT4ge1xuICAgICAgaWYgKGlzUHJlc2VudChWYWxpZGF0b3JzLnJlcXVpcmVkKGNvbnRyb2wpKSkgcmV0dXJuIG51bGw7XG4gICAgICB2YXIgdjogc3RyaW5nID0gY29udHJvbC52YWx1ZTtcbiAgICAgIHJldHVybiB2Lmxlbmd0aCA+IG1heExlbmd0aCA/XG4gICAgICAgICAgICAgICAgIHtcIm1heGxlbmd0aFwiOiB7XCJyZXF1aXJlZExlbmd0aFwiOiBtYXhMZW5ndGgsIFwiYWN0dWFsTGVuZ3RoXCI6IHYubGVuZ3RofX0gOlxuICAgICAgICAgICAgICAgICBudWxsO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdG9yIHRoYXQgcmVxdWlyZXMgYSBjb250cm9sIHRvIG1hdGNoIGEgcmVnZXggdG8gaXRzIHZhbHVlLlxuICAgKi9cbiAgc3RhdGljIHBhdHRlcm4ocGF0dGVybjogc3RyaW5nKTogVmFsaWRhdG9yRm4ge1xuICAgIHJldHVybiAoY29udHJvbDogbW9kZWxNb2R1bGUuQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX0gPT4ge1xuICAgICAgaWYgKGlzUHJlc2VudChWYWxpZGF0b3JzLnJlcXVpcmVkKGNvbnRyb2wpKSkgcmV0dXJuIG51bGw7XG4gICAgICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKGBeJHtwYXR0ZXJufSRgKTtcbiAgICAgIGxldCB2OiBzdHJpbmcgPSBjb250cm9sLnZhbHVlO1xuICAgICAgcmV0dXJuIHJlZ2V4LnRlc3QodikgPyBudWxsIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1wicGF0dGVyblwiOiB7XCJyZXF1aXJlZFBhdHRlcm5cIjogYF4ke3BhdHRlcm59JGAsIFwiYWN0dWFsVmFsdWVcIjogdn19O1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogTm8tb3AgdmFsaWRhdG9yLlxuICAgKi9cbiAgc3RhdGljIG51bGxWYWxpZGF0b3IoYzogbW9kZWxNb2R1bGUuQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGJvb2xlYW59IHsgcmV0dXJuIG51bGw7IH1cblxuICAvKipcbiAgICogQ29tcG9zZSBtdWx0aXBsZSB2YWxpZGF0b3JzIGludG8gYSBzaW5nbGUgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB1bmlvblxuICAgKiBvZiB0aGUgaW5kaXZpZHVhbCBlcnJvciBtYXBzLlxuICAgKi9cbiAgc3RhdGljIGNvbXBvc2UodmFsaWRhdG9yczogVmFsaWRhdG9yRm5bXSk6IFZhbGlkYXRvckZuIHtcbiAgICBpZiAoaXNCbGFuayh2YWxpZGF0b3JzKSkgcmV0dXJuIG51bGw7XG4gICAgdmFyIHByZXNlbnRWYWxpZGF0b3JzID0gdmFsaWRhdG9ycy5maWx0ZXIoaXNQcmVzZW50KTtcbiAgICBpZiAocHJlc2VudFZhbGlkYXRvcnMubGVuZ3RoID09IDApIHJldHVybiBudWxsO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKGNvbnRyb2w6IG1vZGVsTW9kdWxlLkFic3RyYWN0Q29udHJvbCkge1xuICAgICAgcmV0dXJuIF9tZXJnZUVycm9ycyhfZXhlY3V0ZVZhbGlkYXRvcnMoY29udHJvbCwgcHJlc2VudFZhbGlkYXRvcnMpKTtcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGNvbXBvc2VBc3luYyh2YWxpZGF0b3JzOiBBc3luY1ZhbGlkYXRvckZuW10pOiBBc3luY1ZhbGlkYXRvckZuIHtcbiAgICBpZiAoaXNCbGFuayh2YWxpZGF0b3JzKSkgcmV0dXJuIG51bGw7XG4gICAgdmFyIHByZXNlbnRWYWxpZGF0b3JzID0gdmFsaWRhdG9ycy5maWx0ZXIoaXNQcmVzZW50KTtcbiAgICBpZiAocHJlc2VudFZhbGlkYXRvcnMubGVuZ3RoID09IDApIHJldHVybiBudWxsO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKGNvbnRyb2w6IG1vZGVsTW9kdWxlLkFic3RyYWN0Q29udHJvbCkge1xuICAgICAgbGV0IHByb21pc2VzID0gX2V4ZWN1dGVBc3luY1ZhbGlkYXRvcnMoY29udHJvbCwgcHJlc2VudFZhbGlkYXRvcnMpLm1hcChfY29udmVydFRvUHJvbWlzZSk7XG4gICAgICByZXR1cm4gUHJvbWlzZVdyYXBwZXIuYWxsKHByb21pc2VzKS50aGVuKF9tZXJnZUVycm9ycyk7XG4gICAgfTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY29udmVydFRvUHJvbWlzZShvYmo6IGFueSk6IGFueSB7XG4gIHJldHVybiBQcm9taXNlV3JhcHBlci5pc1Byb21pc2Uob2JqKSA/IG9iaiA6IE9ic2VydmFibGVXcmFwcGVyLnRvUHJvbWlzZShvYmopO1xufVxuXG5mdW5jdGlvbiBfZXhlY3V0ZVZhbGlkYXRvcnMoY29udHJvbDogbW9kZWxNb2R1bGUuQWJzdHJhY3RDb250cm9sLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFZhbGlkYXRvckZuW10pOiBhbnlbXSB7XG4gIHJldHVybiB2YWxpZGF0b3JzLm1hcCh2ID0+IHYoY29udHJvbCkpO1xufVxuXG5mdW5jdGlvbiBfZXhlY3V0ZUFzeW5jVmFsaWRhdG9ycyhjb250cm9sOiBtb2RlbE1vZHVsZS5BYnN0cmFjdENvbnRyb2wsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBBc3luY1ZhbGlkYXRvckZuW10pOiBhbnlbXSB7XG4gIHJldHVybiB2YWxpZGF0b3JzLm1hcCh2ID0+IHYoY29udHJvbCkpO1xufVxuXG5mdW5jdGlvbiBfbWVyZ2VFcnJvcnMoYXJyYXlPZkVycm9yczogYW55W10pOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gIHZhciByZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9ID1cbiAgICAgIGFycmF5T2ZFcnJvcnMucmVkdWNlKChyZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9LCBlcnJvcnM6IHtba2V5OiBzdHJpbmddOiBhbnl9KSA9PiB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQoZXJyb3JzKSA/IFN0cmluZ01hcFdyYXBwZXIubWVyZ2UocmVzLCBlcnJvcnMpIDogcmVzO1xuICAgICAgfSwge30pO1xuICByZXR1cm4gU3RyaW5nTWFwV3JhcHBlci5pc0VtcHR5KHJlcykgPyBudWxsIDogcmVzO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
