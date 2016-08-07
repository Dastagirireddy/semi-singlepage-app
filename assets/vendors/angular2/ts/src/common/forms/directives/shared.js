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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZm9ybXMvZGlyZWN0aXZlcy9zaGFyZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQW9CQSxxQkFBNEIsSUFBWSxFQUFFLE1BQXdCO1FBQ2hFLElBQUksQ0FBQyxHQUFHLHdCQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2IsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFKRCxxQ0FJQyxDQUFBO0lBRUQsc0JBQTZCLE9BQWdCLEVBQUUsR0FBYztRQUMzRCxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFBQyxXQUFXLENBQUMsR0FBRyxFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFDOUQsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztRQUUxRSxPQUFPLENBQUMsU0FBUyxHQUFHLHVCQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUMzRSxPQUFPLENBQUMsY0FBYyxHQUFHLHVCQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUMvRixHQUFHLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFNUMsZ0JBQWdCO1FBQ2hCLEdBQUcsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsVUFBQyxRQUFhO1lBQy9DLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoQyxPQUFP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c3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL3NoYXJlZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TGlzdFdyYXBwZXIsIFN0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge2lzQmxhbmssIGlzUHJlc2VudCwgbG9vc2VJZGVudGljYWwsIGhhc0NvbnN0cnVjdG9yfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9uLCBXcmFwcGVkRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuXG5pbXBvcnQge0NvbnRyb2xDb250YWluZXJ9IGZyb20gJy4vY29udHJvbF9jb250YWluZXInO1xuaW1wb3J0IHtOZ0NvbnRyb2x9IGZyb20gJy4vbmdfY29udHJvbCc7XG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbERpcmVjdGl2ZX0gZnJvbSAnLi9hYnN0cmFjdF9jb250cm9sX2RpcmVjdGl2ZSc7XG5pbXBvcnQge05nQ29udHJvbEdyb3VwfSBmcm9tICcuL25nX2NvbnRyb2xfZ3JvdXAnO1xuaW1wb3J0IHtDb250cm9sLCBDb250cm9sR3JvdXB9IGZyb20gJy4uL21vZGVsJztcbmltcG9ydCB7VmFsaWRhdG9yc30gZnJvbSAnLi4vdmFsaWRhdG9ycyc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL2NvbnRyb2xfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtEZWZhdWx0VmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9kZWZhdWx0X3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7TnVtYmVyVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9udW1iZXJfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtDaGVja2JveENvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL2NoZWNrYm94X3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7U2VsZWN0Q29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJy4vc2VsZWN0X2NvbnRyb2xfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtSYWRpb0NvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL3JhZGlvX2NvbnRyb2xfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtub3JtYWxpemVWYWxpZGF0b3IsIG5vcm1hbGl6ZUFzeW5jVmFsaWRhdG9yfSBmcm9tICcuL25vcm1hbGl6ZV92YWxpZGF0b3InO1xuaW1wb3J0IHtWYWxpZGF0b3JGbiwgQXN5bmNWYWxpZGF0b3JGbn0gZnJvbSAnLi92YWxpZGF0b3JzJztcblxuXG5leHBvcnQgZnVuY3Rpb24gY29udHJvbFBhdGgobmFtZTogc3RyaW5nLCBwYXJlbnQ6IENvbnRyb2xDb250YWluZXIpOiBzdHJpbmdbXSB7XG4gIHZhciBwID0gTGlzdFdyYXBwZXIuY2xvbmUocGFyZW50LnBhdGgpO1xuICBwLnB1c2gobmFtZSk7XG4gIHJldHVybiBwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0VXBDb250cm9sKGNvbnRyb2w6IENvbnRyb2wsIGRpcjogTmdDb250cm9sKTogdm9pZCB7XG4gIGlmIChpc0JsYW5rKGNvbnRyb2wpKSBfdGhyb3dFcnJvcihkaXIsIFwiQ2Fubm90IGZpbmQgY29udHJvbFwiKTtcbiAgaWYgKGlzQmxhbmsoZGlyLnZhbHVlQWNjZXNzb3IpKSBfdGhyb3dFcnJvcihkaXIsIFwiTm8gdmFsdWUgYWNjZXNzb3IgZm9yXCIpO1xuXG4gIGNvbnRyb2wudmFsaWRhdG9yID0gVmFsaWRhdG9ycy5jb21wb3NlKFtjb250cm9sLnZhbGlkYXRvciwgZGlyLnZhbGlkYXRvcl0pO1xuICBjb250cm9sLmFzeW5jVmFsaWRhdG9yID0gVmFsaWRhdG9ycy5jb21wb3NlQXN5bmMoW2NvbnRyb2wuYXN5bmNWYWxpZGF0b3IsIGRpci5hc3luY1ZhbGlkYXRvcl0pO1xuICBkaXIudmFsdWVBY2Nlc3Nvci53cml0ZVZhbHVlKGNvbnRyb2wudmFsdWUpO1xuXG4gIC8vIHZpZXcgLT4gbW9kZWxcbiAgZGlyLnZhbHVlQWNjZXNzb3IucmVnaXN0ZXJPbkNoYW5nZSgobmV3VmFsdWU6IGFueSkgPT4ge1xuICAgIGRpci52aWV3VG9Nb2RlbFVwZGF0ZShuZXdWYWx1ZSk7XG4gICAgY29udHJvbC51cGRhdGVWYWx1ZShuZXdWYWx1ZSwge2VtaXRNb2RlbFRvVmlld0NoYW5nZTogZmFsc2V9KTtcbiAgICBjb250cm9sLm1hcmtBc0RpcnR5KCk7XG4gIH0pO1xuXG4gIC8vIG1vZGVsIC0+IHZpZXdcbiAgY29udHJvbC5yZWdpc3Rlck9uQ2hhbmdlKChuZXdWYWx1ZTogYW55KSA9PiBkaXIudmFsdWVBY2Nlc3Nvci53cml0ZVZhbHVlKG5ld1ZhbHVlKSk7XG5cbiAgLy8gdG91Y2hlZFxuICBkaXIudmFsdWVBY2Nlc3Nvci5yZWdpc3Rlck9uVG91Y2hlZCgoKSA9PiBjb250cm9sLm1hcmtBc1RvdWNoZWQoKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRVcENvbnRyb2xHcm91cChjb250cm9sOiBDb250cm9sR3JvdXAsIGRpcjogTmdDb250cm9sR3JvdXApIHtcbiAgaWYgKGlzQmxhbmsoY29udHJvbCkpIF90aHJvd0Vycm9yKGRpciwgXCJDYW5ub3QgZmluZCBjb250cm9sXCIpO1xuICBjb250cm9sLnZhbGlkYXRvciA9IFZhbGlkYXRvcnMuY29tcG9zZShbY29udHJvbC52YWxpZGF0b3IsIGRpci52YWxpZGF0b3JdKTtcbiAgY29udHJvbC5hc3luY1ZhbGlkYXRvciA9IFZhbGlkYXRvcnMuY29tcG9zZUFzeW5jKFtjb250cm9sLmFzeW5jVmFsaWRhdG9yLCBkaXIuYXN5bmNWYWxpZGF0b3JdKTtcbn1cblxuZnVuY3Rpb24gX3Rocm93RXJyb3IoZGlyOiBBYnN0cmFjdENvbnRyb2xEaXJlY3RpdmUsIG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuICB2YXIgcGF0aCA9IGRpci5wYXRoLmpvaW4oXCIgLT4gXCIpO1xuICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgJHttZXNzYWdlfSAnJHtwYXRofSdgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvc2VWYWxpZGF0b3JzKHZhbGlkYXRvcnM6IC8qIEFycmF5PFZhbGlkYXRvcnxGdW5jdGlvbj4gKi8gYW55W10pOiBWYWxpZGF0b3JGbiB7XG4gIHJldHVybiBpc1ByZXNlbnQodmFsaWRhdG9ycykgPyBWYWxpZGF0b3JzLmNvbXBvc2UodmFsaWRhdG9ycy5tYXAobm9ybWFsaXplVmFsaWRhdG9yKSkgOiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcG9zZUFzeW5jVmFsaWRhdG9ycyhcbiAgICB2YWxpZGF0b3JzOiAvKiBBcnJheTxWYWxpZGF0b3J8RnVuY3Rpb24+ICovIGFueVtdKTogQXN5bmNWYWxpZGF0b3JGbiB7XG4gIHJldHVybiBpc1ByZXNlbnQodmFsaWRhdG9ycykgPyBWYWxpZGF0b3JzLmNvbXBvc2VBc3luYyh2YWxpZGF0b3JzLm1hcChub3JtYWxpemVBc3luY1ZhbGlkYXRvcikpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1Byb3BlcnR5VXBkYXRlZChjaGFuZ2VzOiB7W2tleTogc3RyaW5nXTogYW55fSwgdmlld01vZGVsOiBhbnkpOiBib29sZWFuIHtcbiAgaWYgKCFTdHJpbmdNYXBXcmFwcGVyLmNvbnRhaW5zKGNoYW5nZXMsIFwibW9kZWxcIikpIHJldHVybiBmYWxzZTtcbiAgdmFyIGNoYW5nZSA9IGNoYW5nZXNbXCJtb2RlbFwiXTtcblxuICBpZiAoY2hhbmdlLmlzRmlyc3RDaGFuZ2UoKSkgcmV0dXJuIHRydWU7XG4gIHJldHVybiAhbG9vc2VJZGVudGljYWwodmlld01vZGVsLCBjaGFuZ2UuY3VycmVudFZhbHVlKTtcbn1cblxuLy8gVE9ETzogdnNhdmtpbiByZW1vdmUgaXQgb25jZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8zMDExIGlzIGltcGxlbWVudGVkXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0VmFsdWVBY2Nlc3NvcihkaXI6IE5nQ29udHJvbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlQWNjZXNzb3JzOiBDb250cm9sVmFsdWVBY2Nlc3NvcltdKTogQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBpZiAoaXNCbGFuayh2YWx1ZUFjY2Vzc29ycykpIHJldHVybiBudWxsO1xuXG4gIHZhciBkZWZhdWx0QWNjZXNzb3I6IENvbnRyb2xWYWx1ZUFjY2Vzc29yO1xuICB2YXIgYnVpbHRpbkFjY2Vzc29yOiBDb250cm9sVmFsdWVBY2Nlc3NvcjtcbiAgdmFyIGN1c3RvbUFjY2Vzc29yOiBDb250cm9sVmFsdWVBY2Nlc3NvcjtcbiAgdmFsdWVBY2Nlc3NvcnMuZm9yRWFjaCgodjogQ29udHJvbFZhbHVlQWNjZXNzb3IpID0+IHtcbiAgICBpZiAoaGFzQ29uc3RydWN0b3IodiwgRGVmYXVsdFZhbHVlQWNjZXNzb3IpKSB7XG4gICAgICBkZWZhdWx0QWNjZXNzb3IgPSB2O1xuXG4gICAgfSBlbHNlIGlmIChoYXNDb25zdHJ1Y3Rvcih2LCBDaGVja2JveENvbnRyb2xWYWx1ZUFjY2Vzc29yKSB8fFxuICAgICAgICAgICAgICAgaGFzQ29uc3RydWN0b3IodiwgTnVtYmVyVmFsdWVBY2Nlc3NvcikgfHxcbiAgICAgICAgICAgICAgIGhhc0NvbnN0cnVjdG9yKHYsIFNlbGVjdENvbnRyb2xWYWx1ZUFjY2Vzc29yKSB8fFxuICAgICAgICAgICAgICAgaGFzQ29uc3RydWN0b3IodiwgUmFkaW9Db250cm9sVmFsdWVBY2Nlc3NvcikpIHtcbiAgICAgIGlmIChpc1ByZXNlbnQoYnVpbHRpbkFjY2Vzc29yKSlcbiAgICAgICAgX3Rocm93RXJyb3IoZGlyLCBcIk1vcmUgdGhhbiBvbmUgYnVpbHQtaW4gdmFsdWUgYWNjZXNzb3IgbWF0Y2hlc1wiKTtcbiAgICAgIGJ1aWx0aW5BY2Nlc3NvciA9IHY7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGlzUHJlc2VudChjdXN0b21BY2Nlc3NvcikpXG4gICAgICAgIF90aHJvd0Vycm9yKGRpciwgXCJNb3JlIHRoYW4gb25lIGN1c3RvbSB2YWx1ZSBhY2Nlc3NvciBtYXRjaGVzXCIpO1xuICAgICAgY3VzdG9tQWNjZXNzb3IgPSB2O1xuICAgIH1cbiAgfSk7XG5cbiAgaWYgKGlzUHJlc2VudChjdXN0b21BY2Nlc3NvcikpIHJldHVybiBjdXN0b21BY2Nlc3NvcjtcbiAgaWYgKGlzUHJlc2VudChidWlsdGluQWNjZXNzb3IpKSByZXR1cm4gYnVpbHRpbkFjY2Vzc29yO1xuICBpZiAoaXNQcmVzZW50KGRlZmF1bHRBY2Nlc3NvcikpIHJldHVybiBkZWZhdWx0QWNjZXNzb3I7XG5cbiAgX3Rocm93RXJyb3IoZGlyLCBcIk5vIHZhbGlkIHZhbHVlIGFjY2Vzc29yIGZvclwiKTtcbiAgcmV0dXJuIG51bGw7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
