System.register(['angular2/src/facade/collection', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions', '../validators', './default_value_accessor', './number_value_accessor', './checkbox_value_accessor', './select_control_value_accessor', './radio_control_value_accessor', './normalize_validator'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var collection_1, lang_1, exceptions_1, validators_1, default_value_accessor_1, number_value_accessor_1, checkbox_value_accessor_1, select_control_value_accessor_1, radio_control_value_accessor_1, normalize_validator_1;
    function controlPath(name, parent) {
        var p = collection_1.ListWrapper.clone(parent.path);
        p.push(name);
        return p;
    }
    exports_1("controlPath", controlPath);
    function setUpControl(control, dir) {
        if (lang_1.isBlank(control))
            _throwError(dir, "Cannot find control");
        if (lang_1.isBlank(dir.valueAccessor))
            _throwError(dir, "No value accessor for");
        control.validator = validators_1.Validators.compose([control.validator, dir.validator]);
        control.asyncValidator = validators_1.Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
        dir.valueAccessor.writeValue(control.value);
        // view -> model
        dir.valueAccessor.registerOnChange(function (newValue) {
            dir.viewToModelUpdate(newValue);
            control.updateValue(newValue, { emitModelToViewChange: false });
            control.markAsDirty();
        });
        // model -> view
        control.registerOnChange(function (newValue) { return dir.valueAccessor.writeValue(newValue); });
        // touched
        dir.valueAccessor.registerOnTouched(function () { return control.markAsTouched(); });
    }
    exports_1("setUpControl", setUpControl);
    function setUpControlGroup(control, dir) {
        if (lang_1.isBlank(control))
            _throwError(dir, "Cannot find control");
        control.validator = validators_1.Validators.compose([control.validator, dir.validator]);
        control.asyncValidator = validators_1.Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
    }
    exports_1("setUpControlGroup", setUpControlGroup);
    function _throwError(dir, message) {
        var path = dir.path.join(" -> ");
        throw new exceptions_1.BaseException(message + " '" + path + "'");
    }
    function composeValidators(validators) {
        return lang_1.isPresent(validators) ? validators_1.Validators.compose(validators.map(normalize_validator_1.normalizeValidator)) : null;
    }
    exports_1("composeValidators", composeValidators);
    function composeAsyncValidators(validators) {
        return lang_1.isPresent(validators) ? validators_1.Validators.composeAsync(validators.map(normalize_validator_1.normalizeAsyncValidator)) :
            null;
    }
    exports_1("composeAsyncValidators", composeAsyncValidators);
    function isPropertyUpdated(changes, viewModel) {
        if (!collection_1.StringMapWrapper.contains(changes, "model"))
            return false;
        var change = changes["model"];
        if (change.isFirstChange())
            return true;
        return !lang_1.looseIdentical(viewModel, change.currentValue);
    }
    exports_1("isPropertyUpdated", isPropertyUpdated);
    // TODO: vsavkin remove it once https://github.com/angular/angular/issues/3011 is implemented
    function selectValueAccessor(dir, valueAccessors) {
        if (lang_1.isBlank(valueAccessors))
            return null;
        var defaultAccessor;
        var builtinAccessor;
        var customAccessor;
        valueAccessors.forEach(function (v) {
            if (lang_1.hasConstructor(v, default_value_accessor_1.DefaultValueAccessor)) {
                defaultAccessor = v;
            }
            else if (lang_1.hasConstructor(v, checkbox_value_accessor_1.CheckboxControlValueAccessor) ||
                lang_1.hasConstructor(v, number_value_accessor_1.NumberValueAccessor) ||
                lang_1.hasConstructor(v, select_control_value_accessor_1.SelectControlValueAccessor) ||
                lang_1.hasConstructor(v, radio_control_value_accessor_1.RadioControlValueAccessor)) {
                if (lang_1.isPresent(builtinAccessor))
                    _throwError(dir, "More than one built-in value accessor matches");
                builtinAccessor = v;
            }
            else {
                if (lang_1.isPresent(customAccessor))
                    _throwError(dir, "More than one custom value accessor matches");
                customAccessor = v;
            }
        });
        if (lang_1.isPresent(customAccessor))
            return customAccessor;
        if (lang_1.isPresent(builtinAccessor))
            return builtinAccessor;
        if (lang_1.isPresent(defaultAccessor))
            return defaultAccessor;
        _throwError(dir, "No valid value accessor for");
        return null;
    }
    exports_1("selectValueAccessor", selectValueAccessor);
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (validators_1_1) {
                validators_1 = validators_1_1;
            },
            function (default_value_accessor_1_1) {
                default_value_accessor_1 = default_value_accessor_1_1;
            },
            function (number_value_accessor_1_1) {
                number_value_accessor_1 = number_value_accessor_1_1;
            },
            function (checkbox_value_accessor_1_1) {
                checkbox_value_accessor_1 = checkbox_value_accessor_1_1;
            },
            function (select_control_value_accessor_1_1) {
                select_control_value_accessor_1 = select_control_value_accessor_1_1;
            },
            function (radio_control_value_accessor_1_1) {
                radio_control_value_accessor_1 = radio_control_value_accessor_1_1;
            },
            function (normalize_validator_1_1) {
                normalize_validator_1 = normalize_validator_1_1;
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL3NoYXJlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0lBb0JBLHFCQUE0QixJQUFZLEVBQUUsTUFBd0I7UUFDaEUsSUFBSSxDQUFDLEdBQUcsd0JBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDYixNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUpELHFDQUlDLENBQUE7SUFFRCxzQkFBNkIsT0FBZ0IsRUFBRSxHQUFjO1FBQzNELEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUscUJBQXFCLENBQUMsQ0FBQztRQUM5RCxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1FBRTFFLE9BQU8sQ0FBQyxTQUFTLEdBQUcsdUJBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzNFLE9BQU8sQ0FBQyxjQUFjLEdBQUcsdUJBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQy9GLEdBQUcsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU1QyxnQkFBZ0I7UUFDaEIsR0FBRyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFDLFFBQWE7WUFDL0MsR0FBRyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hD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Z3VsYXIyL3RzL3NyYy9jb21tb24vZm9ybXMvZGlyZWN0aXZlcy9zaGFyZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0xpc3RXcmFwcGVyLCBTdHJpbmdNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtpc0JsYW5rLCBpc1ByZXNlbnQsIGxvb3NlSWRlbnRpY2FsLCBoYXNDb25zdHJ1Y3Rvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbiwgV3JhcHBlZEV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcblxuaW1wb3J0IHtDb250cm9sQ29udGFpbmVyfSBmcm9tICcuL2NvbnRyb2xfY29udGFpbmVyJztcbmltcG9ydCB7TmdDb250cm9sfSBmcm9tICcuL25nX2NvbnRyb2wnO1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2xEaXJlY3RpdmV9IGZyb20gJy4vYWJzdHJhY3RfY29udHJvbF9kaXJlY3RpdmUnO1xuaW1wb3J0IHtOZ0NvbnRyb2xHcm91cH0gZnJvbSAnLi9uZ19jb250cm9sX2dyb3VwJztcbmltcG9ydCB7Q29udHJvbCwgQ29udHJvbEdyb3VwfSBmcm9tICcuLi9tb2RlbCc7XG5pbXBvcnQge1ZhbGlkYXRvcnN9IGZyb20gJy4uL3ZhbGlkYXRvcnMnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9jb250cm9sX3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7RGVmYXVsdFZhbHVlQWNjZXNzb3J9IGZyb20gJy4vZGVmYXVsdF92YWx1ZV9hY2Nlc3Nvcic7XG5pbXBvcnQge051bWJlclZhbHVlQWNjZXNzb3J9IGZyb20gJy4vbnVtYmVyX3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7Q2hlY2tib3hDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9jaGVja2JveF92YWx1ZV9hY2Nlc3Nvcic7XG5pbXBvcnQge1NlbGVjdENvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL3NlbGVjdF9jb250cm9sX3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7UmFkaW9Db250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9yYWRpb19jb250cm9sX3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7bm9ybWFsaXplVmFsaWRhdG9yLCBub3JtYWxpemVBc3luY1ZhbGlkYXRvcn0gZnJvbSAnLi9ub3JtYWxpemVfdmFsaWRhdG9yJztcbmltcG9ydCB7VmFsaWRhdG9yRm4sIEFzeW5jVmFsaWRhdG9yRm59IGZyb20gJy4vdmFsaWRhdG9ycyc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnRyb2xQYXRoKG5hbWU6IHN0cmluZywgcGFyZW50OiBDb250cm9sQ29udGFpbmVyKTogc3RyaW5nW10ge1xuICB2YXIgcCA9IExpc3RXcmFwcGVyLmNsb25lKHBhcmVudC5wYXRoKTtcbiAgcC5wdXNoKG5hbWUpO1xuICByZXR1cm4gcDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFVwQ29udHJvbChjb250cm9sOiBDb250cm9sLCBkaXI6IE5nQ29udHJvbCk6IHZvaWQge1xuICBpZiAoaXNCbGFuayhjb250cm9sKSkgX3Rocm93RXJyb3IoZGlyLCBcIkNhbm5vdCBmaW5kIGNvbnRyb2xcIik7XG4gIGlmIChpc0JsYW5rKGRpci52YWx1ZUFjY2Vzc29yKSkgX3Rocm93RXJyb3IoZGlyLCBcIk5vIHZhbHVlIGFjY2Vzc29yIGZvclwiKTtcblxuICBjb250cm9sLnZhbGlkYXRvciA9IFZhbGlkYXRvcnMuY29tcG9zZShbY29udHJvbC52YWxpZGF0b3IsIGRpci52YWxpZGF0b3JdKTtcbiAgY29udHJvbC5hc3luY1ZhbGlkYXRvciA9IFZhbGlkYXRvcnMuY29tcG9zZUFzeW5jKFtjb250cm9sLmFzeW5jVmFsaWRhdG9yLCBkaXIuYXN5bmNWYWxpZGF0b3JdKTtcbiAgZGlyLnZhbHVlQWNjZXNzb3Iud3JpdGVWYWx1ZShjb250cm9sLnZhbHVlKTtcblxuICAvLyB2aWV3IC0+IG1vZGVsXG4gIGRpci52YWx1ZUFjY2Vzc29yLnJlZ2lzdGVyT25DaGFuZ2UoKG5ld1ZhbHVlOiBhbnkpID0+IHtcbiAgICBkaXIudmlld1RvTW9kZWxVcGRhdGUobmV3VmFsdWUpO1xuICAgIGNvbnRyb2wudXBkYXRlVmFsdWUobmV3VmFsdWUsIHtlbWl0TW9kZWxUb1ZpZXdDaGFuZ2U6IGZhbHNlfSk7XG4gICAgY29udHJvbC5tYXJrQXNEaXJ0eSgpO1xuICB9KTtcblxuICAvLyBtb2RlbCAtPiB2aWV3XG4gIGNvbnRyb2wucmVnaXN0ZXJPbkNoYW5nZSgobmV3VmFsdWU6IGFueSkgPT4gZGlyLnZhbHVlQWNjZXNzb3Iud3JpdGVWYWx1ZShuZXdWYWx1ZSkpO1xuXG4gIC8vIHRvdWNoZWRcbiAgZGlyLnZhbHVlQWNjZXNzb3IucmVnaXN0ZXJPblRvdWNoZWQoKCkgPT4gY29udHJvbC5tYXJrQXNUb3VjaGVkKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0VXBDb250cm9sR3JvdXAoY29udHJvbDogQ29udHJvbEdyb3VwLCBkaXI6IE5nQ29udHJvbEdyb3VwKSB7XG4gIGlmIChpc0JsYW5rKGNvbnRyb2wpKSBfdGhyb3dFcnJvcihkaXIsIFwiQ2Fubm90IGZpbmQgY29udHJvbFwiKTtcbiAgY29udHJvbC52YWxpZGF0b3IgPSBWYWxpZGF0b3JzLmNvbXBvc2UoW2NvbnRyb2wudmFsaWRhdG9yLCBkaXIudmFsaWRhdG9yXSk7XG4gIGNvbnRyb2wuYXN5bmNWYWxpZGF0b3IgPSBWYWxpZGF0b3JzLmNvbXBvc2VBc3luYyhbY29udHJvbC5hc3luY1ZhbGlkYXRvciwgZGlyLmFzeW5jVmFsaWRhdG9yXSk7XG59XG5cbmZ1bmN0aW9uIF90aHJvd0Vycm9yKGRpcjogQWJzdHJhY3RDb250cm9sRGlyZWN0aXZlLCBtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcbiAgdmFyIHBhdGggPSBkaXIucGF0aC5qb2luKFwiIC0+IFwiKTtcbiAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYCR7bWVzc2FnZX0gJyR7cGF0aH0nYCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wb3NlVmFsaWRhdG9ycyh2YWxpZGF0b3JzOiAvKiBBcnJheTxWYWxpZGF0b3J8RnVuY3Rpb24+ICovIGFueVtdKTogVmFsaWRhdG9yRm4ge1xuICByZXR1cm4gaXNQcmVzZW50KHZhbGlkYXRvcnMpID8gVmFsaWRhdG9ycy5jb21wb3NlKHZhbGlkYXRvcnMubWFwKG5vcm1hbGl6ZVZhbGlkYXRvcikpIDogbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvc2VBc3luY1ZhbGlkYXRvcnMoXG4gICAgdmFsaWRhdG9yczogLyogQXJyYXk8VmFsaWRhdG9yfEZ1bmN0aW9uPiAqLyBhbnlbXSk6IEFzeW5jVmFsaWRhdG9yRm4ge1xuICByZXR1cm4gaXNQcmVzZW50KHZhbGlkYXRvcnMpID8gVmFsaWRhdG9ycy5jb21wb3NlQXN5bmModmFsaWRhdG9ycy5tYXAobm9ybWFsaXplQXN5bmNWYWxpZGF0b3IpKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQcm9wZXJ0eVVwZGF0ZWQoY2hhbmdlczoge1trZXk6IHN0cmluZ106IGFueX0sIHZpZXdNb2RlbDogYW55KTogYm9vbGVhbiB7XG4gIGlmICghU3RyaW5nTWFwV3JhcHBlci5jb250YWlucyhjaGFuZ2VzLCBcIm1vZGVsXCIpKSByZXR1cm4gZmFsc2U7XG4gIHZhciBjaGFuZ2UgPSBjaGFuZ2VzW1wibW9kZWxcIl07XG5cbiAgaWYgKGNoYW5nZS5pc0ZpcnN0Q2hhbmdlKCkpIHJldHVybiB0cnVlO1xuICByZXR1cm4gIWxvb3NlSWRlbnRpY2FsKHZpZXdNb2RlbCwgY2hhbmdlLmN1cnJlbnRWYWx1ZSk7XG59XG5cbi8vIFRPRE86IHZzYXZraW4gcmVtb3ZlIGl0IG9uY2UgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMzAxMSBpcyBpbXBsZW1lbnRlZFxuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdFZhbHVlQWNjZXNzb3IoZGlyOiBOZ0NvbnRyb2wsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZUFjY2Vzc29yczogQ29udHJvbFZhbHVlQWNjZXNzb3JbXSk6IENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgaWYgKGlzQmxhbmsodmFsdWVBY2Nlc3NvcnMpKSByZXR1cm4gbnVsbDtcblxuICB2YXIgZGVmYXVsdEFjY2Vzc29yOiBDb250cm9sVmFsdWVBY2Nlc3NvcjtcbiAgdmFyIGJ1aWx0aW5BY2Nlc3NvcjogQ29udHJvbFZhbHVlQWNjZXNzb3I7XG4gIHZhciBjdXN0b21BY2Nlc3NvcjogQ29udHJvbFZhbHVlQWNjZXNzb3I7XG4gIHZhbHVlQWNjZXNzb3JzLmZvckVhY2goKHY6IENvbnRyb2xWYWx1ZUFjY2Vzc29yKSA9PiB7XG4gICAgaWYgKGhhc0NvbnN0cnVjdG9yKHYsIERlZmF1bHRWYWx1ZUFjY2Vzc29yKSkge1xuICAgICAgZGVmYXVsdEFjY2Vzc29yID0gdjtcblxuICAgIH0gZWxzZSBpZiAoaGFzQ29uc3RydWN0b3IodiwgQ2hlY2tib3hDb250cm9sVmFsdWVBY2Nlc3NvcikgfHxcbiAgICAgICAgICAgICAgIGhhc0NvbnN0cnVjdG9yKHYsIE51bWJlclZhbHVlQWNjZXNzb3IpIHx8XG4gICAgICAgICAgICAgICBoYXNDb25zdHJ1Y3Rvcih2LCBTZWxlY3RDb250cm9sVmFsdWVBY2Nlc3NvcikgfHxcbiAgICAgICAgICAgICAgIGhhc0NvbnN0cnVjdG9yKHYsIFJhZGlvQ29udHJvbFZhbHVlQWNjZXNzb3IpKSB7XG4gICAgICBpZiAoaXNQcmVzZW50KGJ1aWx0aW5BY2Nlc3NvcikpXG4gICAgICAgIF90aHJvd0Vycm9yKGRpciwgXCJNb3JlIHRoYW4gb25lIGJ1aWx0LWluIHZhbHVlIGFjY2Vzc29yIG1hdGNoZXNcIik7XG4gICAgICBidWlsdGluQWNjZXNzb3IgPSB2O1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChpc1ByZXNlbnQoY3VzdG9tQWNjZXNzb3IpKVxuICAgICAgICBfdGhyb3dFcnJvcihkaXIsIFwiTW9yZSB0aGFuIG9uZSBjdXN0b20gdmFsdWUgYWNjZXNzb3IgbWF0Y2hlc1wiKTtcbiAgICAgIGN1c3RvbUFjY2Vzc29yID0gdjtcbiAgICB9XG4gIH0pO1xuXG4gIGlmIChpc1ByZXNlbnQoY3VzdG9tQWNjZXNzb3IpKSByZXR1cm4gY3VzdG9tQWNjZXNzb3I7XG4gIGlmIChpc1ByZXNlbnQoYnVpbHRpbkFjY2Vzc29yKSkgcmV0dXJuIGJ1aWx0aW5BY2Nlc3NvcjtcbiAgaWYgKGlzUHJlc2VudChkZWZhdWx0QWNjZXNzb3IpKSByZXR1cm4gZGVmYXVsdEFjY2Vzc29yO1xuXG4gIF90aHJvd0Vycm9yKGRpciwgXCJObyB2YWxpZCB2YWx1ZSBhY2Nlc3NvciBmb3JcIik7XG4gIHJldHVybiBudWxsO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
