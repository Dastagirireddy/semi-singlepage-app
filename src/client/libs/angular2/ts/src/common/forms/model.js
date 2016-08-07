System.register(['angular2/src/facade/lang', 'angular2/src/facade/async', 'angular2/src/facade/promise', 'angular2/src/facade/collection'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lang_1, async_1, promise_1, collection_1;
    var VALID, INVALID, PENDING, AbstractControl, Control, ControlGroup, ControlArray;
    function isControl(control) {
        return control instanceof AbstractControl;
    }
    exports_1("isControl", isControl);
    function _find(control, path) {
        if (lang_1.isBlank(path))
            return null;
        if (!(path instanceof Array)) {
            path = path.split("/");
        }
        if (path instanceof Array && collection_1.ListWrapper.isEmpty(path))
            return null;
        return path
            .reduce(function (v, name) {
            if (v instanceof ControlGroup) {
                return lang_1.isPresent(v.controls[name]) ? v.controls[name] : null;
            }
            else if (v instanceof ControlArray) {
                var index = name;
                return lang_1.isPresent(v.at(index)) ? v.at(index) : null;
            }
            else {
                return null;
            }
        }, control);
    }
    function toObservable(r) {
        return promise_1.PromiseWrapper.isPromise(r) ? async_1.ObservableWrapper.fromPromise(r) : r;
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (promise_1_1) {
                promise_1 = promise_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            }],
        execute: function() {
            /**
             * Indicates that a Control is valid, i.e. that no errors exist in the input value.
             */
            exports_1("VALID", VALID = "VALID");
            /**
             * Indicates that a Control is invalid, i.e. that an error exists in the input value.
             */
            exports_1("INVALID", INVALID = "INVALID");
            /**
             * Indicates that a Control is pending, i.e. that async validation is occurring and
             * errors are not yet available for the input value.
             */
            exports_1("PENDING", PENDING = "PENDING");
            /**
             *
             */
            AbstractControl = (function () {
                function AbstractControl(validator, asyncValidator) {
                    this.validator = validator;
                    this.asyncValidator = asyncValidator;
                    this._pristine = true;
                    this._touched = false;
                }
                Object.defineProperty(AbstractControl.prototype, "value", {
                    get: function () { return this._value; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AbstractControl.prototype, "status", {
                    get: function () { return this._status; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AbstractControl.prototype, "valid", {
                    get: function () { return this._status === VALID; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AbstractControl.prototype, "errors", {
                    /**
                     * Returns the errors of this control.
                     */
                    get: function () { return this._errors; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AbstractControl.prototype, "pristine", {
                    get: function () { return this._pristine; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AbstractControl.prototype, "dirty", {
                    get: function () { return !this.pristine; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AbstractControl.prototype, "touched", {
                    get: function () { return this._touched; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AbstractControl.prototype, "untouched", {
                    get: function () { return !this._touched; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AbstractControl.prototype, "valueChanges", {
                    get: function () { return this._valueChanges; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AbstractControl.prototype, "statusChanges", {
                    get: function () { return this._statusChanges; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AbstractControl.prototype, "pending", {
                    get: function () { return this._status == PENDING; },
                    enumerable: true,
                    configurable: true
                });
                AbstractControl.prototype.markAsTouched = function () { this._touched = true; };
                AbstractControl.prototype.markAsDirty = function (_a) {
                    var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
                    onlySelf = lang_1.normalizeBool(onlySelf);
                    this._pristine = false;
                    if (lang_1.isPresent(this._parent) && !onlySelf) {
                        this._parent.markAsDirty({ onlySelf: onlySelf });
                    }
                };
                AbstractControl.prototype.markAsPending = function (_a) {
                    var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
                    onlySelf = lang_1.normalizeBool(onlySelf);
                    this._status = PENDING;
                    if (lang_1.isPresent(this._parent) && !onlySelf) {
                        this._parent.markAsPending({ onlySelf: onlySelf });
                    }
                };
                AbstractControl.prototype.setParent = function (parent) { this._parent = parent; };
                AbstractControl.prototype.updateValueAndValidity = function (_a) {
                    var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent;
                    onlySelf = lang_1.normalizeBool(onlySelf);
                    emitEvent = lang_1.isPresent(emitEvent) ? emitEvent : true;
                    this._updateValue();
                    this._errors = this._runValidator();
                    this._status = this._calculateStatus();
                    if (this._status == VALID || this._status == PENDING) {
                        this._runAsyncValidator(emitEvent);
                    }
                    if (emitEvent) {
                        async_1.ObservableWrapper.callEmit(this._valueChanges, this._value);
                        async_1.ObservableWrapper.callEmit(this._statusChanges, this._status);
                    }
                    if (lang_1.isPresent(this._parent) && !onlySelf) {
                        this._parent.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
                    }
                };
                AbstractControl.prototype._runValidator = function () {
                    return lang_1.isPresent(this.validator) ? this.validator(this) : null;
                };
                AbstractControl.prototype._runAsyncValidator = function (emitEvent) {
                    var _this = this;
                    if (lang_1.isPresent(this.asyncValidator)) {
                        this._status = PENDING;
                        this._cancelExistingSubscription();
                        var obs = toObservable(this.asyncValidator(this));
                        this._asyncValidationSubscription = async_1.ObservableWrapper.subscribe(obs, function (res) { return _this.setErrors(res, { emitEvent: emitEvent }); });
                    }
                };
                AbstractControl.prototype._cancelExistingSubscription = function () {
                    if (lang_1.isPresent(this._asyncValidationSubscription)) {
                        async_1.ObservableWrapper.dispose(this._asyncValidationSubscription);
                    }
                };
                /**
                 * Sets errors on a control.
                 *
                 * This is used when validations are run not automatically, but manually by the user.
                 *
                 * Calling `setErrors` will also update the validity of the parent control.
                 *
                 * ## Usage
                 *
                 * ```
                 * var login = new Control("someLogin");
                 * login.setErrors({
                 *   "notUnique": true
                 * });
                 *
                 * expect(login.valid).toEqual(false);
                 * expect(login.errors).toEqual({"notUnique": true});
                 *
                 * login.updateValue("someOtherLogin");
                 *
                 * expect(login.valid).toEqual(true);
                 * ```
                 */
                AbstractControl.prototype.setErrors = function (errors, _a) {
                    var emitEvent = (_a === void 0 ? {} : _a).emitEvent;
                    emitEvent = lang_1.isPresent(emitEvent) ? emitEvent : true;
                    this._errors = errors;
                    this._status = this._calculateStatus();
                    if (emitEvent) {
                        async_1.ObservableWrapper.callEmit(this._statusChanges, this._status);
                    }
                    if (lang_1.isPresent(this._parent)) {
                        this._parent._updateControlsErrors();
                    }
                };
                AbstractControl.prototype.find = function (path) { return _find(this, path); };
                AbstractControl.prototype.getError = function (errorCode, path) {
                    if (path === void 0) { path = null; }
                    var control = lang_1.isPresent(path) && !collection_1.ListWrapper.isEmpty(path) ? this.find(path) : this;
                    if (lang_1.isPresent(control) && lang_1.isPresent(control._errors)) {
                        return collection_1.StringMapWrapper.get(control._errors, errorCode);
                    }
                    else {
                        return null;
                    }
                };
                AbstractControl.prototype.hasError = function (errorCode, path) {
                    if (path === void 0) { path = null; }
                    return lang_1.isPresent(this.getError(errorCode, path));
                };
                Object.defineProperty(AbstractControl.prototype, "root", {
                    get: function () {
                        var x = this;
                        while (lang_1.isPresent(x._parent)) {
                            x = x._parent;
                        }
                        return x;
                    },
                    enumerable: true,
                    configurable: true
                });
                /** @internal */
                AbstractControl.prototype._updateControlsErrors = function () {
                    this._status = this._calculateStatus();
                    if (lang_1.isPresent(this._parent)) {
                        this._parent._updateControlsErrors();
                    }
                };
                /** @internal */
                AbstractControl.prototype._initObservables = function () {
                    this._valueChanges = new async_1.EventEmitter();
                    this._statusChanges = new async_1.EventEmitter();
                };
                AbstractControl.prototype._calculateStatus = function () {
                    if (lang_1.isPresent(this._errors))
                        return INVALID;
                    if (this._anyControlsHaveStatus(PENDING))
                        return PENDING;
                    if (this._anyControlsHaveStatus(INVALID))
                        return INVALID;
                    return VALID;
                };
                return AbstractControl;
            }());
            exports_1("AbstractControl", AbstractControl);
            /**
             * Defines a part of a form that cannot be divided into other controls. `Control`s have values and
             * validation state, which is determined by an optional validation function.
             *
             * `Control` is one of the three fundamental building blocks used to define forms in Angular, along
             * with {@link ControlGroup} and {@link ControlArray}.
             *
             * ## Usage
             *
             * By default, a `Control` is created for every `<input>` or other form component.
             * With {@link NgFormControl} or {@link NgFormModel} an existing {@link Control} can be
             * bound to a DOM element instead. This `Control` can be configured with a custom
             * validation function.
             *
             * ### Example ([live demo](http://plnkr.co/edit/23DESOpbNnBpBHZt1BR4?p=preview))
             */
            Control = (function (_super) {
                __extends(Control, _super);
                function Control(value, validator, asyncValidator) {
                    if (value === void 0) { value = null; }
                    if (validator === void 0) { validator = null; }
                    if (asyncValidator === void 0) { asyncValidator = null; }
                    _super.call(this, validator, asyncValidator);
                    this._value = value;
                    this.updateValueAndValidity({ onlySelf: true, emitEvent: false });
                    this._initObservables();
                }
                /**
                 * Set the value of the control to `value`.
                 *
                 * If `onlySelf` is `true`, this change will only affect the validation of this `Control`
                 * and not its parent component. If `emitEvent` is `true`, this change will cause a
                 * `valueChanges` event on the `Control` to be emitted. Both of these options default to
                 * `false`.
                 *
                 * If `emitModelToViewChange` is `true`, the view will be notified about the new value
                 * via an `onChange` event. This is the default behavior if `emitModelToViewChange` is not
                 * specified.
                 */
                Control.prototype.updateValue = function (value, _a) {
                    var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent, emitModelToViewChange = _b.emitModelToViewChange;
                    emitModelToViewChange = lang_1.isPresent(emitModelToViewChange) ? emitModelToViewChange : true;
                    this._value = value;
                    if (lang_1.isPresent(this._onChange) && emitModelToViewChange)
                        this._onChange(this._value);
                    this.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
                };
                /**
                 * @internal
                 */
                Control.prototype._updateValue = function () { };
                /**
                 * @internal
                 */
                Control.prototype._anyControlsHaveStatus = function (status) { return false; };
                /**
                 * Register a listener for change events.
                 */
                Control.prototype.registerOnChange = function (fn) { this._onChange = fn; };
                return Control;
            }(AbstractControl));
            exports_1("Control", Control);
            /**
             * Defines a part of a form, of fixed length, that can contain other controls.
             *
             * A `ControlGroup` aggregates the values of each {@link Control} in the group.
             * The status of a `ControlGroup` depends on the status of its children.
             * If one of the controls in a group is invalid, the entire group is invalid.
             * Similarly, if a control changes its value, the entire group changes as well.
             *
             * `ControlGroup` is one of the three fundamental building blocks used to define forms in Angular,
             * along with {@link Control} and {@link ControlArray}. {@link ControlArray} can also contain other
             * controls, but is of variable length.
             *
             * ### Example ([live demo](http://plnkr.co/edit/23DESOpbNnBpBHZt1BR4?p=preview))
             */
            ControlGroup = (function (_super) {
                __extends(ControlGroup, _super);
                function ControlGroup(controls, optionals, validator, asyncValidator) {
                    if (optionals === void 0) { optionals = null; }
                    if (validator === void 0) { validator = null; }
                    if (asyncValidator === void 0) { asyncValidator = null; }
                    _super.call(this, validator, asyncValidator);
                    this.controls = controls;
                    this._optionals = lang_1.isPresent(optionals) ? optionals : {};
                    this._initObservables();
                    this._setParentForControls();
                    this.updateValueAndValidity({ onlySelf: true, emitEvent: false });
                }
                /**
                 * Add a control to this group.
                 */
                ControlGroup.prototype.addControl = function (name, control) {
                    this.controls[name] = control;
                    control.setParent(this);
                };
                /**
                 * Remove a control from this group.
                 */
                ControlGroup.prototype.removeControl = function (name) { collection_1.StringMapWrapper.delete(this.controls, name); };
                /**
                 * Mark the named control as non-optional.
                 */
                ControlGroup.prototype.include = function (controlName) {
                    collection_1.StringMapWrapper.set(this._optionals, controlName, true);
                    this.updateValueAndValidity();
                };
                /**
                 * Mark the named control as optional.
                 */
                ControlGroup.prototype.exclude = function (controlName) {
                    collection_1.StringMapWrapper.set(this._optionals, controlName, false);
                    this.updateValueAndValidity();
                };
                /**
                 * Check whether there is a control with the given name in the group.
                 */
                ControlGroup.prototype.contains = function (controlName) {
                    var c = collection_1.StringMapWrapper.contains(this.controls, controlName);
                    return c && this._included(controlName);
                };
                /** @internal */
                ControlGroup.prototype._setParentForControls = function () {
                    var _this = this;
                    collection_1.StringMapWrapper.forEach(this.controls, function (control, name) { control.setParent(_this); });
                };
                /** @internal */
                ControlGroup.prototype._updateValue = function () { this._value = this._reduceValue(); };
                /** @internal */
                ControlGroup.prototype._anyControlsHaveStatus = function (status) {
                    var _this = this;
                    var res = false;
                    collection_1.StringMapWrapper.forEach(this.controls, function (control, name) {
                        res = res || (_this.contains(name) && control.status == status);
                    });
                    return res;
                };
                /** @internal */
                ControlGroup.prototype._reduceValue = function () {
                    return this._reduceChildren({}, function (acc, control, name) {
                        acc[name] = control.value;
                        return acc;
                    });
                };
                /** @internal */
                ControlGroup.prototype._reduceChildren = function (initValue, fn) {
                    var _this = this;
                    var res = initValue;
                    collection_1.StringMapWrapper.forEach(this.controls, function (control, name) {
                        if (_this._included(name)) {
                            res = fn(res, control, name);
                        }
                    });
                    return res;
                };
                /** @internal */
                ControlGroup.prototype._included = function (controlName) {
                    var isOptional = collection_1.StringMapWrapper.contains(this._optionals, controlName);
                    return !isOptional || collection_1.StringMapWrapper.get(this._optionals, controlName);
                };
                return ControlGroup;
            }(AbstractControl));
            exports_1("ControlGroup", ControlGroup);
            /**
             * Defines a part of a form, of variable length, that can contain other controls.
             *
             * A `ControlArray` aggregates the values of each {@link Control} in the group.
             * The status of a `ControlArray` depends on the status of its children.
             * If one of the controls in a group is invalid, the entire array is invalid.
             * Similarly, if a control changes its value, the entire array changes as well.
             *
             * `ControlArray` is one of the three fundamental building blocks used to define forms in Angular,
             * along with {@link Control} and {@link ControlGroup}. {@link ControlGroup} can also contain
             * other controls, but is of fixed length.
             *
             * ## Adding or removing controls
             *
             * To change the controls in the array, use the `push`, `insert`, or `removeAt` methods
             * in `ControlArray` itself. These methods ensure the controls are properly tracked in the
             * form's hierarchy. Do not modify the array of `AbstractControl`s used to instantiate
             * the `ControlArray` directly, as that will result in strange and unexpected behavior such
             * as broken change detection.
             *
             * ### Example ([live demo](http://plnkr.co/edit/23DESOpbNnBpBHZt1BR4?p=preview))
             */
            ControlArray = (function (_super) {
                __extends(ControlArray, _super);
                function ControlArray(controls, validator, asyncValidator) {
                    if (validator === void 0) { validator = null; }
                    if (asyncValidator === void 0) { asyncValidator = null; }
                    _super.call(this, validator, asyncValidator);
                    this.controls = controls;
                    this._initObservables();
                    this._setParentForControls();
                    this.updateValueAndValidity({ onlySelf: true, emitEvent: false });
                }
                /**
                 * Get the {@link AbstractControl} at the given `index` in the array.
                 */
                ControlArray.prototype.at = function (index) { return this.controls[index]; };
                /**
                 * Insert a new {@link AbstractControl} at the end of the array.
                 */
                ControlArray.prototype.push = function (control) {
                    this.controls.push(control);
                    control.setParent(this);
                    this.updateValueAndValidity();
                };
                /**
                 * Insert a new {@link AbstractControl} at the given `index` in the array.
                 */
                ControlArray.prototype.insert = function (index, control) {
                    collection_1.ListWrapper.insert(this.controls, index, control);
                    control.setParent(this);
                    this.updateValueAndValidity();
                };
                /**
                 * Remove the control at the given `index` in the array.
                 */
                ControlArray.prototype.removeAt = function (index) {
                    collection_1.ListWrapper.removeAt(this.controls, index);
                    this.updateValueAndValidity();
                };
                Object.defineProperty(ControlArray.prototype, "length", {
                    /**
                     * Length of the control array.
                     */
                    get: function () { return this.controls.length; },
                    enumerable: true,
                    configurable: true
                });
                /** @internal */
                ControlArray.prototype._updateValue = function () { this._value = this.controls.map(function (control) { return control.value; }); };
                /** @internal */
                ControlArray.prototype._anyControlsHaveStatus = function (status) {
                    return this.controls.some(function (c) { return c.status == status; });
                };
                /** @internal */
                ControlArray.prototype._setParentForControls = function () {
                    var _this = this;
                    this.controls.forEach(function (control) { control.setParent(_this); });
                };
                return ControlArray;
            }(AbstractControl));
            exports_1("ControlArray", ControlArray);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7UUFTYSxLQUFLLEVBS0wsT0FBTyxFQU1QLE9BQU87SUFFcEIsbUJBQTBCLE9BQWU7UUFDdkMsTUFBTSxDQUFDLE9BQU8sWUFBWSxlQUFlLENBQUM7SUFDNUMsQ0FBQztJQUZELGlDQUVDLENBQUE7SUFFRCxlQUFlLE9BQXdCLEVBQUUsSUFBb0M7UUFDM0UsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUUvQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLEdBQVksSUFBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxZQUFZLEtBQUssSUFBSSx3QkFBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFFcEUsTUFBTSxDQUEwQixJQUFLO2FBQ2hDLE1BQU0sQ0FBQyxVQUFDLENBQUMsRUFBRSxJQUFJO1lBQ2QsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLE1BQU0sQ0FBQyxnQkFBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztZQUMvRCxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLEtBQUssR0FBVyxJQUFJLENBQUM7Z0JBQ3pCLE1BQU0sQ0FBQyxnQkFB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LENBQUM7b0JBQzNDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO2dCQUNoQyxDQUFDO2dCQUtELHNCQUFJLGdDQUFNO29CQUhWOzt1QkFFRzt5QkFDSCxjQUF1QixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBRXJELGdCQUFnQjtnQkFDaEIsbUNBQVksR0FBWixjQUF1QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUMsT0FBTyxJQUFLLE9BQUEsT0FBTyxDQUFDLEtBQUssRUFBYixDQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXJGLGdCQUFnQjtnQkFDaEIsNkNBQXNCLEdBQXRCLFVBQXVCLE1BQWM7b0JBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxFQUFsQixDQUFrQixDQUFDLENBQUM7Z0JBQ3JELENBQUM7Z0JBR0QsZ0JBQWdCO2dCQUNoQiw0Q0FBcUIsR0FBckI7b0JBQUEsaUJBRUM7b0JBREMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxPQUFPLElBQU8sT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuRSxDQUFDO2dCQUNILG1CQUFDO1lBQUQsQ0ExREEsQUEwREMsQ0ExRGlDLGVBQWUsR0EwRGhEO1lBMURELHVDQTBEQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9tb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNQcmVzZW50LCBpc0JsYW5rLCBub3JtYWxpemVCb29sfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBFdmVudEVtaXR0ZXIsIE9ic2VydmFibGVXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jJztcbmltcG9ydCB7UHJvbWlzZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvcHJvbWlzZSc7XG5pbXBvcnQge1N0cmluZ01hcFdyYXBwZXIsIExpc3RXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtWYWxpZGF0b3JGbiwgQXN5bmNWYWxpZGF0b3JGbn0gZnJvbSAnLi9kaXJlY3RpdmVzL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIEluZGljYXRlcyB0aGF0IGEgQ29udHJvbCBpcyB2YWxpZCwgaS5lLiB0aGF0IG5vIGVycm9ycyBleGlzdCBpbiB0aGUgaW5wdXQgdmFsdWUuXG4gKi9cbmV4cG9ydCBjb25zdCBWQUxJRCA9IFwiVkFMSURcIjtcblxuLyoqXG4gKiBJbmRpY2F0ZXMgdGhhdCBhIENvbnRyb2wgaXMgaW52YWxpZCwgaS5lLiB0aGF0IGFuIGVycm9yIGV4aXN0cyBpbiB0aGUgaW5wdXQgdmFsdWUuXG4gKi9cbmV4cG9ydCBjb25zdCBJTlZBTElEID0gXCJJTlZBTElEXCI7XG5cbi8qKlxuICogSW5kaWNhdGVzIHRoYXQgYSBDb250cm9sIGlzIHBlbmRpbmcsIGkuZS4gdGhhdCBhc3luYyB2YWxpZGF0aW9uIGlzIG9jY3VycmluZyBhbmRcbiAqIGVycm9ycyBhcmUgbm90IHlldCBhdmFpbGFibGUgZm9yIHRoZSBpbnB1dCB2YWx1ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IFBFTkRJTkcgPSBcIlBFTkRJTkdcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ29udHJvbChjb250cm9sOiBPYmplY3QpOiBib29sZWFuIHtcbiAgcmV0dXJuIGNvbnRyb2wgaW5zdGFuY2VvZiBBYnN0cmFjdENvbnRyb2w7XG59XG5cbmZ1bmN0aW9uIF9maW5kKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgcGF0aDogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPnwgc3RyaW5nKSB7XG4gIGlmIChpc0JsYW5rKHBhdGgpKSByZXR1cm4gbnVsbDtcblxuICBpZiAoIShwYXRoIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgcGF0aCA9ICg8c3RyaW5nPnBhdGgpLnNwbGl0KFwiL1wiKTtcbiAgfVxuICBpZiAocGF0aCBpbnN0YW5jZW9mIEFycmF5ICYmIExpc3RXcmFwcGVyLmlzRW1wdHkocGF0aCkpIHJldHVybiBudWxsO1xuXG4gIHJldHVybiAoPEFycmF5PHN0cmluZyB8IG51bWJlcj4+cGF0aClcbiAgICAgIC5yZWR1Y2UoKHYsIG5hbWUpID0+IHtcbiAgICAgICAgaWYgKHYgaW5zdGFuY2VvZiBDb250cm9sR3JvdXApIHtcbiAgICAgICAgICByZXR1cm4gaXNQcmVzZW50KHYuY29udHJvbHNbbmFtZV0pID8gdi5jb250cm9sc1tuYW1lXSA6IG51bGw7XG4gICAgICAgIH0gZWxzZSBpZiAodiBpbnN0YW5jZW9mIENvbnRyb2xBcnJheSkge1xuICAgICAgICAgIHZhciBpbmRleCA9IDxudW1iZXI+bmFtZTtcbiAgICAgICAgICByZXR1cm4gaXNQcmVzZW50KHYuYXQoaW5kZXgpKSA/IHYuYXQoaW5kZXgpIDogbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSwgY29udHJvbCk7XG59XG5cbmZ1bmN0aW9uIHRvT2JzZXJ2YWJsZShyOiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuICByZXR1cm4gUHJvbWlzZVdyYXBwZXIuaXNQcm9taXNlKHIpID8gT2JzZXJ2YWJsZVdyYXBwZXIuZnJvbVByb21pc2UocikgOiByO1xufVxuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdENvbnRyb2wge1xuICAvKiogQGludGVybmFsICovXG4gIF92YWx1ZTogYW55O1xuXG4gIHByaXZhdGUgX3ZhbHVlQ2hhbmdlczogRXZlbnRFbWl0dGVyPGFueT47XG4gIHByaXZhdGUgX3N0YXR1c0NoYW5nZXM6IEV2ZW50RW1pdHRlcjxhbnk+O1xuICBwcml2YXRlIF9zdGF0dXM6IHN0cmluZztcbiAgcHJpdmF0ZSBfZXJyb3JzOiB7W2tleTogc3RyaW5nXTogYW55fTtcbiAgcHJpdmF0ZSBfcHJpc3RpbmU6IGJvb2xlYW4gPSB0cnVlO1xuICBwcml2YXRlIF90b3VjaGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX3BhcmVudDogQ29udHJvbEdyb3VwIHwgQ29udHJvbEFycmF5O1xuICBwcml2YXRlIF9hc3luY1ZhbGlkYXRpb25TdWJzY3JpcHRpb246IGFueTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsaWRhdG9yOiBWYWxpZGF0b3JGbiwgcHVibGljIGFzeW5jVmFsaWRhdG9yOiBBc3luY1ZhbGlkYXRvckZuKSB7fVxuXG4gIGdldCB2YWx1ZSgpOiBhbnkgeyByZXR1cm4gdGhpcy5fdmFsdWU7IH1cblxuICBnZXQgc3RhdHVzKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9zdGF0dXM7IH1cblxuICBnZXQgdmFsaWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9zdGF0dXMgPT09IFZBTElEOyB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGVycm9ycyBvZiB0aGlzIGNvbnRyb2wuXG4gICAqL1xuICBnZXQgZXJyb3JzKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHsgcmV0dXJuIHRoaXMuX2Vycm9yczsgfVxuXG4gIGdldCBwcmlzdGluZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3ByaXN0aW5lOyB9XG5cbiAgZ2V0IGRpcnR5KCk6IGJvb2xlYW4geyByZXR1cm4gIXRoaXMucHJpc3RpbmU7IH1cblxuICBnZXQgdG91Y2hlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3RvdWNoZWQ7IH1cblxuICBnZXQgdW50b3VjaGVkKCk6IGJvb2xlYW4geyByZXR1cm4gIXRoaXMuX3RvdWNoZWQ7IH1cblxuICBnZXQgdmFsdWVDaGFuZ2VzKCk6IE9ic2VydmFibGU8YW55PiB7IHJldHVybiB0aGlzLl92YWx1ZUNoYW5nZXM7IH1cblxuICBnZXQgc3RhdHVzQ2hhbmdlcygpOiBPYnNlcnZhYmxlPGFueT4geyByZXR1cm4gdGhpcy5fc3RhdHVzQ2hhbmdlczsgfVxuXG4gIGdldCBwZW5kaW5nKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc3RhdHVzID09IFBFTkRJTkc7IH1cblxuICBtYXJrQXNUb3VjaGVkKCk6IHZvaWQgeyB0aGlzLl90b3VjaGVkID0gdHJ1ZTsgfVxuXG4gIG1hcmtBc0RpcnR5KHtvbmx5U2VsZn06IHtvbmx5U2VsZj86IGJvb2xlYW59ID0ge30pOiB2b2lkIHtcbiAgICBvbmx5U2VsZiA9IG5vcm1hbGl6ZUJvb2wob25seVNlbGYpO1xuICAgIHRoaXMuX3ByaXN0aW5lID0gZmFsc2U7XG5cbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuX3BhcmVudCkgJiYgIW9ubHlTZWxmKSB7XG4gICAgICB0aGlzLl9wYXJlbnQubWFya0FzRGlydHkoe29ubHlTZWxmOiBvbmx5U2VsZn0pO1xuICAgIH1cbiAgfVxuXG4gIG1hcmtBc1BlbmRpbmcoe29ubHlTZWxmfToge29ubHlTZWxmPzogYm9vbGVhbn0gPSB7fSk6IHZvaWQge1xuICAgIG9ubHlTZWxmID0gbm9ybWFsaXplQm9vbChvbmx5U2VsZik7XG4gICAgdGhpcy5fc3RhdHVzID0gUEVORElORztcblxuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fcGFyZW50KSAmJiAhb25seVNlbGYpIHtcbiAgICAgIHRoaXMuX3BhcmVudC5tYXJrQXNQZW5kaW5nKHtvbmx5U2VsZjogb25seVNlbGZ9KTtcbiAgICB9XG4gIH1cblxuICBzZXRQYXJlbnQocGFyZW50OiBDb250cm9sR3JvdXAgfCBDb250cm9sQXJyYXkpOiB2b2lkIHsgdGhpcy5fcGFyZW50ID0gcGFyZW50OyB9XG5cbiAgdXBkYXRlVmFsdWVBbmRWYWxpZGl0eShcbiAgICAgIHtvbmx5U2VsZiwgZW1pdEV2ZW50fToge29ubHlTZWxmPzogYm9vbGVhbiwgZW1pdEV2ZW50PzogYm9vbGVhbn0gPSB7fSk6IHZvaWQge1xuICAgIG9ubHlTZWxmID0gbm9ybWFsaXplQm9vbChvbmx5U2VsZik7XG4gICAgZW1pdEV2ZW50ID0gaXNQcmVzZW50KGVtaXRFdmVudCkgPyBlbWl0RXZlbnQgOiB0cnVlO1xuXG4gICAgdGhpcy5fdXBkYXRlVmFsdWUoKTtcblxuICAgIHRoaXMuX2Vycm9ycyA9IHRoaXMuX3J1blZhbGlkYXRvcigpO1xuICAgIHRoaXMuX3N0YXR1cyA9IHRoaXMuX2NhbGN1bGF0ZVN0YXR1cygpO1xuXG4gICAgaWYgKHRoaXMuX3N0YXR1cyA9PSBWQUxJRCB8fCB0aGlzLl9zdGF0dXMgPT0gUEVORElORykge1xuICAgICAgdGhpcy5fcnVuQXN5bmNWYWxpZGF0b3IoZW1pdEV2ZW50KTtcbiAgICB9XG5cbiAgICBpZiAoZW1pdEV2ZW50KSB7XG4gICAgICBPYnNlcnZhYmxlV3JhcHBlci5jYWxsRW1pdCh0aGlzLl92YWx1ZUNoYW5nZXMsIHRoaXMuX3ZhbHVlKTtcbiAgICAgIE9ic2VydmFibGVXcmFwcGVyLmNhbGxFbWl0KHRoaXMuX3N0YXR1c0NoYW5nZXMsIHRoaXMuX3N0YXR1cyk7XG4gICAgfVxuXG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl9wYXJlbnQpICYmICFvbmx5U2VsZikge1xuICAgICAgdGhpcy5fcGFyZW50LnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoe29ubHlTZWxmOiBvbmx5U2VsZiwgZW1pdEV2ZW50OiBlbWl0RXZlbnR9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9ydW5WYWxpZGF0b3IoKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy52YWxpZGF0b3IpID8gdGhpcy52YWxpZGF0b3IodGhpcykgOiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBfcnVuQXN5bmNWYWxpZGF0b3IoZW1pdEV2ZW50OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLmFzeW5jVmFsaWRhdG9yKSkge1xuICAgICAgdGhpcy5fc3RhdHVzID0gUEVORElORztcbiAgICAgIHRoaXMuX2NhbmNlbEV4aXN0aW5nU3Vic2NyaXB0aW9uKCk7XG4gICAgICB2YXIgb2JzID0gdG9PYnNlcnZhYmxlKHRoaXMuYXN5bmNWYWxpZGF0b3IodGhpcykpO1xuICAgICAgdGhpcy5fYXN5bmNWYWxpZGF0aW9uU3Vic2NyaXB0aW9uID0gT2JzZXJ2YWJsZVdyYXBwZXIuc3Vic2NyaWJlKFxuICAgICAgICAgIG9icywgKHJlczoge1trZXk6IHN0cmluZ106IGFueX0pID0+IHRoaXMuc2V0RXJyb3JzKHJlcywge2VtaXRFdmVudDogZW1pdEV2ZW50fSkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NhbmNlbEV4aXN0aW5nU3Vic2NyaXB0aW9uKCk6IHZvaWQge1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fYXN5bmNWYWxpZGF0aW9uU3Vic2NyaXB0aW9uKSkge1xuICAgICAgT2JzZXJ2YWJsZVdyYXBwZXIuZGlzcG9zZSh0aGlzLl9hc3luY1ZhbGlkYXRpb25TdWJzY3JpcHRpb24pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGVycm9ycyBvbiBhIGNvbnRyb2wuXG4gICAqXG4gICAqIFRoaXMgaXMgdXNlZCB3aGVuIHZhbGlkYXRpb25zIGFyZSBydW4gbm90IGF1dG9tYXRpY2FsbHksIGJ1dCBtYW51YWxseSBieSB0aGUgdXNlci5cbiAgICpcbiAgICogQ2FsbGluZyBgc2V0RXJyb3JzYCB3aWxsIGFsc28gdXBkYXRlIHRoZSB2YWxpZGl0eSBvZiB0aGUgcGFyZW50IGNvbnRyb2wuXG4gICAqXG4gICAqICMjIFVzYWdlXG4gICAqXG4gICAqIGBgYFxuICAgKiB2YXIgbG9naW4gPSBuZXcgQ29udHJvbChcInNvbWVMb2dpblwiKTtcbiAgICogbG9naW4uc2V0RXJyb3JzKHtcbiAgICogICBcIm5vdFVuaXF1ZVwiOiB0cnVlXG4gICAqIH0pO1xuICAgKlxuICAgKiBleHBlY3QobG9naW4udmFsaWQpLnRvRXF1YWwoZmFsc2UpO1xuICAgKiBleHBlY3QobG9naW4uZXJyb3JzKS50b0VxdWFsKHtcIm5vdFVuaXF1ZVwiOiB0cnVlfSk7XG4gICAqXG4gICAqIGxvZ2luLnVwZGF0ZVZhbHVlKFwic29tZU90aGVyTG9naW5cIik7XG4gICAqXG4gICAqIGV4cGVjdChsb2dpbi52YWxpZCkudG9FcXVhbCh0cnVlKTtcbiAgICogYGBgXG4gICAqL1xuICBzZXRFcnJvcnMoZXJyb3JzOiB7W2tleTogc3RyaW5nXTogYW55fSwge2VtaXRFdmVudH06IHtlbWl0RXZlbnQ/OiBib29sZWFufSA9IHt9KTogdm9pZCB7XG4gICAgZW1pdEV2ZW50ID0gaXNQcmVzZW50KGVtaXRFdmVudCkgPyBlbWl0RXZlbnQgOiB0cnVlO1xuXG4gICAgdGhpcy5fZXJyb3JzID0gZXJyb3JzO1xuICAgIHRoaXMuX3N0YXR1cyA9IHRoaXMuX2NhbGN1bGF0ZVN0YXR1cygpO1xuXG4gICAgaWYgKGVtaXRFdmVudCkge1xuICAgICAgT2JzZXJ2YWJsZVdyYXBwZXIuY2FsbEVtaXQodGhpcy5fc3RhdHVzQ2hhbmdlcywgdGhpcy5fc3RhdHVzKTtcbiAgICB9XG5cbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuX3BhcmVudCkpIHtcbiAgICAgIHRoaXMuX3BhcmVudC5fdXBkYXRlQ29udHJvbHNFcnJvcnMoKTtcbiAgICB9XG4gIH1cblxuICBmaW5kKHBhdGg6IEFycmF5PHN0cmluZyB8IG51bWJlcj58IHN0cmluZyk6IEFic3RyYWN0Q29udHJvbCB7IHJldHVybiBfZmluZCh0aGlzLCBwYXRoKTsgfVxuXG4gIGdldEVycm9yKGVycm9yQ29kZTogc3RyaW5nLCBwYXRoOiBzdHJpbmdbXSA9IG51bGwpOiBhbnkge1xuICAgIHZhciBjb250cm9sID0gaXNQcmVzZW50KHBhdGgpICYmICFMaXN0V3JhcHBlci5pc0VtcHR5KHBhdGgpID8gdGhpcy5maW5kKHBhdGgpIDogdGhpcztcbiAgICBpZiAoaXNQcmVzZW50KGNvbnRyb2wpICYmIGlzUHJlc2VudChjb250cm9sLl9lcnJvcnMpKSB7XG4gICAgICByZXR1cm4gU3RyaW5nTWFwV3JhcHBlci5nZXQoY29udHJvbC5fZXJyb3JzLCBlcnJvckNvZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBoYXNFcnJvcihlcnJvckNvZGU6IHN0cmluZywgcGF0aDogc3RyaW5nW10gPSBudWxsKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmdldEVycm9yKGVycm9yQ29kZSwgcGF0aCkpO1xuICB9XG5cbiAgZ2V0IHJvb3QoKTogQWJzdHJhY3RDb250cm9sIHtcbiAgICBsZXQgeDogQWJzdHJhY3RDb250cm9sID0gdGhpcztcblxuICAgIHdoaWxlIChpc1ByZXNlbnQoeC5fcGFyZW50KSkge1xuICAgICAgeCA9IHguX3BhcmVudDtcbiAgICB9XG5cbiAgICByZXR1cm4geDtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3VwZGF0ZUNvbnRyb2xzRXJyb3JzKCk6IHZvaWQge1xuICAgIHRoaXMuX3N0YXR1cyA9IHRoaXMuX2NhbGN1bGF0ZVN0YXR1cygpO1xuXG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl9wYXJlbnQpKSB7XG4gICAgICB0aGlzLl9wYXJlbnQuX3VwZGF0ZUNvbnRyb2xzRXJyb3JzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfaW5pdE9ic2VydmFibGVzKCkge1xuICAgIHRoaXMuX3ZhbHVlQ2hhbmdlcyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB0aGlzLl9zdGF0dXNDaGFuZ2VzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICB9XG5cblxuICBwcml2YXRlIF9jYWxjdWxhdGVTdGF0dXMoKTogc3RyaW5nIHtcbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuX2Vycm9ycykpIHJldHVybiBJTlZBTElEO1xuICAgIGlmICh0aGlzLl9hbnlDb250cm9sc0hhdmVTdGF0dXMoUEVORElORykpIHJldHVybiBQRU5ESU5HO1xuICAgIGlmICh0aGlzLl9hbnlDb250cm9sc0hhdmVTdGF0dXMoSU5WQUxJRCkpIHJldHVybiBJTlZBTElEO1xuICAgIHJldHVybiBWQUxJRDtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgYWJzdHJhY3QgX3VwZGF0ZVZhbHVlKCk6IHZvaWQ7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBhYnN0cmFjdCBfYW55Q29udHJvbHNIYXZlU3RhdHVzKHN0YXR1czogc3RyaW5nKTogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBEZWZpbmVzIGEgcGFydCBvZiBhIGZvcm0gdGhhdCBjYW5ub3QgYmUgZGl2aWRlZCBpbnRvIG90aGVyIGNvbnRyb2xzLiBgQ29udHJvbGBzIGhhdmUgdmFsdWVzIGFuZFxuICogdmFsaWRhdGlvbiBzdGF0ZSwgd2hpY2ggaXMgZGV0ZXJtaW5lZCBieSBhbiBvcHRpb25hbCB2YWxpZGF0aW9uIGZ1bmN0aW9uLlxuICpcbiAqIGBDb250cm9sYCBpcyBvbmUgb2YgdGhlIHRocmVlIGZ1bmRhbWVudGFsIGJ1aWxkaW5nIGJsb2NrcyB1c2VkIHRvIGRlZmluZSBmb3JtcyBpbiBBbmd1bGFyLCBhbG9uZ1xuICogd2l0aCB7QGxpbmsgQ29udHJvbEdyb3VwfSBhbmQge0BsaW5rIENvbnRyb2xBcnJheX0uXG4gKlxuICogIyMgVXNhZ2VcbiAqXG4gKiBCeSBkZWZhdWx0LCBhIGBDb250cm9sYCBpcyBjcmVhdGVkIGZvciBldmVyeSBgPGlucHV0PmAgb3Igb3RoZXIgZm9ybSBjb21wb25lbnQuXG4gKiBXaXRoIHtAbGluayBOZ0Zvcm1Db250cm9sfSBvciB7QGxpbmsgTmdGb3JtTW9kZWx9IGFuIGV4aXN0aW5nIHtAbGluayBDb250cm9sfSBjYW4gYmVcbiAqIGJvdW5kIHRvIGEgRE9NIGVsZW1lbnQgaW5zdGVhZC4gVGhpcyBgQ29udHJvbGAgY2FuIGJlIGNvbmZpZ3VyZWQgd2l0aCBhIGN1c3RvbVxuICogdmFsaWRhdGlvbiBmdW5jdGlvbi5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvMjNERVNPcGJObkJwQkhadDFCUjQ/cD1wcmV2aWV3KSlcbiAqL1xuZXhwb3J0IGNsYXNzIENvbnRyb2wgZXh0ZW5kcyBBYnN0cmFjdENvbnRyb2wge1xuICAvKiogQGludGVybmFsICovXG4gIF9vbkNoYW5nZTogRnVuY3Rpb247XG5cbiAgY29uc3RydWN0b3IodmFsdWU6IGFueSA9IG51bGwsIHZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSBudWxsLFxuICAgICAgICAgICAgICBhc3luY1ZhbGlkYXRvcjogQXN5bmNWYWxpZGF0b3JGbiA9IG51bGwpIHtcbiAgICBzdXBlcih2YWxpZGF0b3IsIGFzeW5jVmFsaWRhdG9yKTtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSh7b25seVNlbGY6IHRydWUsIGVtaXRFdmVudDogZmFsc2V9KTtcbiAgICB0aGlzLl9pbml0T2JzZXJ2YWJsZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIHZhbHVlIG9mIHRoZSBjb250cm9sIHRvIGB2YWx1ZWAuXG4gICAqXG4gICAqIElmIGBvbmx5U2VsZmAgaXMgYHRydWVgLCB0aGlzIGNoYW5nZSB3aWxsIG9ubHkgYWZmZWN0IHRoZSB2YWxpZGF0aW9uIG9mIHRoaXMgYENvbnRyb2xgXG4gICAqIGFuZCBub3QgaXRzIHBhcmVudCBjb21wb25lbnQuIElmIGBlbWl0RXZlbnRgIGlzIGB0cnVlYCwgdGhpcyBjaGFuZ2Ugd2lsbCBjYXVzZSBhXG4gICAqIGB2YWx1ZUNoYW5nZXNgIGV2ZW50IG9uIHRoZSBgQ29udHJvbGAgdG8gYmUgZW1pdHRlZC4gQm90aCBvZiB0aGVzZSBvcHRpb25zIGRlZmF1bHQgdG9cbiAgICogYGZhbHNlYC5cbiAgICpcbiAgICogSWYgYGVtaXRNb2RlbFRvVmlld0NoYW5nZWAgaXMgYHRydWVgLCB0aGUgdmlldyB3aWxsIGJlIG5vdGlmaWVkIGFib3V0IHRoZSBuZXcgdmFsdWVcbiAgICogdmlhIGFuIGBvbkNoYW5nZWAgZXZlbnQuIFRoaXMgaXMgdGhlIGRlZmF1bHQgYmVoYXZpb3IgaWYgYGVtaXRNb2RlbFRvVmlld0NoYW5nZWAgaXMgbm90XG4gICAqIHNwZWNpZmllZC5cbiAgICovXG4gIHVwZGF0ZVZhbHVlKHZhbHVlOiBhbnksIHtvbmx5U2VsZiwgZW1pdEV2ZW50LCBlbWl0TW9kZWxUb1ZpZXdDaGFuZ2V9OiB7XG4gICAgb25seVNlbGY/OiBib29sZWFuLFxuICAgIGVtaXRFdmVudD86IGJvb2xlYW4sXG4gICAgZW1pdE1vZGVsVG9WaWV3Q2hhbmdlPzogYm9vbGVhblxuICB9ID0ge30pOiB2b2lkIHtcbiAgICBlbWl0TW9kZWxUb1ZpZXdDaGFuZ2UgPSBpc1ByZXNlbnQoZW1pdE1vZGVsVG9WaWV3Q2hhbmdlKSA/IGVtaXRNb2RlbFRvVmlld0NoYW5nZSA6IHRydWU7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuX29uQ2hhbmdlKSAmJiBlbWl0TW9kZWxUb1ZpZXdDaGFuZ2UpIHRoaXMuX29uQ2hhbmdlKHRoaXMuX3ZhbHVlKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoe29ubHlTZWxmOiBvbmx5U2VsZiwgZW1pdEV2ZW50OiBlbWl0RXZlbnR9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIF91cGRhdGVWYWx1ZSgpIHt9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgX2FueUNvbnRyb2xzSGF2ZVN0YXR1cyhzdGF0dXM6IHN0cmluZyk6IGJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgYSBsaXN0ZW5lciBmb3IgY2hhbmdlIGV2ZW50cy5cbiAgICovXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7IHRoaXMuX29uQ2hhbmdlID0gZm47IH1cbn1cblxuLyoqXG4gKiBEZWZpbmVzIGEgcGFydCBvZiBhIGZvcm0sIG9mIGZpeGVkIGxlbmd0aCwgdGhhdCBjYW4gY29udGFpbiBvdGhlciBjb250cm9scy5cbiAqXG4gKiBBIGBDb250cm9sR3JvdXBgIGFnZ3JlZ2F0ZXMgdGhlIHZhbHVlcyBvZiBlYWNoIHtAbGluayBDb250cm9sfSBpbiB0aGUgZ3JvdXAuXG4gKiBUaGUgc3RhdHVzIG9mIGEgYENvbnRyb2xHcm91cGAgZGVwZW5kcyBvbiB0aGUgc3RhdHVzIG9mIGl0cyBjaGlsZHJlbi5cbiAqIElmIG9uZSBvZiB0aGUgY29udHJvbHMgaW4gYSBncm91cCBpcyBpbnZhbGlkLCB0aGUgZW50aXJlIGdyb3VwIGlzIGludmFsaWQuXG4gKiBTaW1pbGFybHksIGlmIGEgY29udHJvbCBjaGFuZ2VzIGl0cyB2YWx1ZSwgdGhlIGVudGlyZSBncm91cCBjaGFuZ2VzIGFzIHdlbGwuXG4gKlxuICogYENvbnRyb2xHcm91cGAgaXMgb25lIG9mIHRoZSB0aHJlZSBmdW5kYW1lbnRhbCBidWlsZGluZyBibG9ja3MgdXNlZCB0byBkZWZpbmUgZm9ybXMgaW4gQW5ndWxhcixcbiAqIGFsb25nIHdpdGgge0BsaW5rIENvbnRyb2x9IGFuZCB7QGxpbmsgQ29udHJvbEFycmF5fS4ge0BsaW5rIENvbnRyb2xBcnJheX0gY2FuIGFsc28gY29udGFpbiBvdGhlclxuICogY29udHJvbHMsIGJ1dCBpcyBvZiB2YXJpYWJsZSBsZW5ndGguXG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0LzIzREVTT3BiTm5CcEJIWnQxQlI0P3A9cHJldmlldykpXG4gKi9cbmV4cG9ydCBjbGFzcyBDb250cm9sR3JvdXAgZXh0ZW5kcyBBYnN0cmFjdENvbnRyb2wge1xuICBwcml2YXRlIF9vcHRpb25hbHM6IHtba2V5OiBzdHJpbmddOiBib29sZWFufTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29udHJvbHM6IHtba2V5OiBzdHJpbmddOiBBYnN0cmFjdENvbnRyb2x9LFxuICAgICAgICAgICAgICBvcHRpb25hbHM6IHtba2V5OiBzdHJpbmddOiBib29sZWFufSA9IG51bGwsIHZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSBudWxsLFxuICAgICAgICAgICAgICBhc3luY1ZhbGlkYXRvcjogQXN5bmNWYWxpZGF0b3JGbiA9IG51bGwpIHtcbiAgICBzdXBlcih2YWxpZGF0b3IsIGFzeW5jVmFsaWRhdG9yKTtcbiAgICB0aGlzLl9vcHRpb25hbHMgPSBpc1ByZXNlbnQob3B0aW9uYWxzKSA/IG9wdGlvbmFscyA6IHt9O1xuICAgIHRoaXMuX2luaXRPYnNlcnZhYmxlcygpO1xuICAgIHRoaXMuX3NldFBhcmVudEZvckNvbnRyb2xzKCk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHtvbmx5U2VsZjogdHJ1ZSwgZW1pdEV2ZW50OiBmYWxzZX0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIGNvbnRyb2wgdG8gdGhpcyBncm91cC5cbiAgICovXG4gIGFkZENvbnRyb2wobmFtZTogc3RyaW5nLCBjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRyb2xzW25hbWVdID0gY29udHJvbDtcbiAgICBjb250cm9sLnNldFBhcmVudCh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBjb250cm9sIGZyb20gdGhpcyBncm91cC5cbiAgICovXG4gIHJlbW92ZUNvbnRyb2wobmFtZTogc3RyaW5nKTogdm9pZCB7IFN0cmluZ01hcFdyYXBwZXIuZGVsZXRlKHRoaXMuY29udHJvbHMsIG5hbWUpOyB9XG5cbiAgLyoqXG4gICAqIE1hcmsgdGhlIG5hbWVkIGNvbnRyb2wgYXMgbm9uLW9wdGlvbmFsLlxuICAgKi9cbiAgaW5jbHVkZShjb250cm9sTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgU3RyaW5nTWFwV3JhcHBlci5zZXQodGhpcy5fb3B0aW9uYWxzLCBjb250cm9sTmFtZSwgdHJ1ZSk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gIH1cblxuICAvKipcbiAgICogTWFyayB0aGUgbmFtZWQgY29udHJvbCBhcyBvcHRpb25hbC5cbiAgICovXG4gIGV4Y2x1ZGUoY29udHJvbE5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIFN0cmluZ01hcFdyYXBwZXIuc2V0KHRoaXMuX29wdGlvbmFscywgY29udHJvbE5hbWUsIGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB3aGV0aGVyIHRoZXJlIGlzIGEgY29udHJvbCB3aXRoIHRoZSBnaXZlbiBuYW1lIGluIHRoZSBncm91cC5cbiAgICovXG4gIGNvbnRhaW5zKGNvbnRyb2xOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICB2YXIgYyA9IFN0cmluZ01hcFdyYXBwZXIuY29udGFpbnModGhpcy5jb250cm9scywgY29udHJvbE5hbWUpO1xuICAgIHJldHVybiBjICYmIHRoaXMuX2luY2x1ZGVkKGNvbnRyb2xOYW1lKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3NldFBhcmVudEZvckNvbnRyb2xzKCkge1xuICAgIFN0cmluZ01hcFdyYXBwZXIuZm9yRWFjaChcbiAgICAgICAgdGhpcy5jb250cm9scywgKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgbmFtZTogc3RyaW5nKSA9PiB7IGNvbnRyb2wuc2V0UGFyZW50KHRoaXMpOyB9KTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3VwZGF0ZVZhbHVlKCkgeyB0aGlzLl92YWx1ZSA9IHRoaXMuX3JlZHVjZVZhbHVlKCk7IH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9hbnlDb250cm9sc0hhdmVTdGF0dXMoc3RhdHVzOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICB2YXIgcmVzID0gZmFsc2U7XG4gICAgU3RyaW5nTWFwV3JhcHBlci5mb3JFYWNoKHRoaXMuY29udHJvbHMsIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIG5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgcmVzID0gcmVzIHx8ICh0aGlzLmNvbnRhaW5zKG5hbWUpICYmIGNvbnRyb2wuc3RhdHVzID09IHN0YXR1cyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3JlZHVjZVZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl9yZWR1Y2VDaGlsZHJlbihcbiAgICAgICAge30sIChhY2M6IHtbazogc3RyaW5nXTogQWJzdHJhY3RDb250cm9sfSwgY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBuYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBhY2NbbmFtZV0gPSBjb250cm9sLnZhbHVlO1xuICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0pO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcmVkdWNlQ2hpbGRyZW4oaW5pdFZhbHVlOiBhbnksIGZuOiBGdW5jdGlvbikge1xuICAgIHZhciByZXMgPSBpbml0VmFsdWU7XG4gICAgU3RyaW5nTWFwV3JhcHBlci5mb3JFYWNoKHRoaXMuY29udHJvbHMsIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIG5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKHRoaXMuX2luY2x1ZGVkKG5hbWUpKSB7XG4gICAgICAgIHJlcyA9IGZuKHJlcywgY29udHJvbCwgbmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2luY2x1ZGVkKGNvbnRyb2xOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICB2YXIgaXNPcHRpb25hbCA9IFN0cmluZ01hcFdyYXBwZXIuY29udGFpbnModGhpcy5fb3B0aW9uYWxzLCBjb250cm9sTmFtZSk7XG4gICAgcmV0dXJuICFpc09wdGlvbmFsIHx8IFN0cmluZ01hcFdyYXBwZXIuZ2V0KHRoaXMuX29wdGlvbmFscywgY29udHJvbE5hbWUpO1xuICB9XG59XG5cbi8qKlxuICogRGVmaW5lcyBhIHBhcnQgb2YgYSBmb3JtLCBvZiB2YXJpYWJsZSBsZW5ndGgsIHRoYXQgY2FuIGNvbnRhaW4gb3RoZXIgY29udHJvbHMuXG4gKlxuICogQSBgQ29udHJvbEFycmF5YCBhZ2dyZWdhdGVzIHRoZSB2YWx1ZXMgb2YgZWFjaCB7QGxpbmsgQ29udHJvbH0gaW4gdGhlIGdyb3VwLlxuICogVGhlIHN0YXR1cyBvZiBhIGBDb250cm9sQXJyYXlgIGRlcGVuZHMgb24gdGhlIHN0YXR1cyBvZiBpdHMgY2hpbGRyZW4uXG4gKiBJZiBvbmUgb2YgdGhlIGNvbnRyb2xzIGluIGEgZ3JvdXAgaXMgaW52YWxpZCwgdGhlIGVudGlyZSBhcnJheSBpcyBpbnZhbGlkLlxuICogU2ltaWxhcmx5LCBpZiBhIGNvbnRyb2wgY2hhbmdlcyBpdHMgdmFsdWUsIHRoZSBlbnRpcmUgYXJyYXkgY2hhbmdlcyBhcyB3ZWxsLlxuICpcbiAqIGBDb250cm9sQXJyYXlgIGlzIG9uZSBvZiB0aGUgdGhyZWUgZnVuZGFtZW50YWwgYnVpbGRpbmcgYmxvY2tzIHVzZWQgdG8gZGVmaW5lIGZvcm1zIGluIEFuZ3VsYXIsXG4gKiBhbG9uZyB3aXRoIHtAbGluayBDb250cm9sfSBhbmQge0BsaW5rIENvbnRyb2xHcm91cH0uIHtAbGluayBDb250cm9sR3JvdXB9IGNhbiBhbHNvIGNvbnRhaW5cbiAqIG90aGVyIGNvbnRyb2xzLCBidXQgaXMgb2YgZml4ZWQgbGVuZ3RoLlxuICpcbiAqICMjIEFkZGluZyBvciByZW1vdmluZyBjb250cm9sc1xuICpcbiAqIFRvIGNoYW5nZSB0aGUgY29udHJvbHMgaW4gdGhlIGFycmF5LCB1c2UgdGhlIGBwdXNoYCwgYGluc2VydGAsIG9yIGByZW1vdmVBdGAgbWV0aG9kc1xuICogaW4gYENvbnRyb2xBcnJheWAgaXRzZWxmLiBUaGVzZSBtZXRob2RzIGVuc3VyZSB0aGUgY29udHJvbHMgYXJlIHByb3Blcmx5IHRyYWNrZWQgaW4gdGhlXG4gKiBmb3JtJ3MgaGllcmFyY2h5LiBEbyBub3QgbW9kaWZ5IHRoZSBhcnJheSBvZiBgQWJzdHJhY3RDb250cm9sYHMgdXNlZCB0byBpbnN0YW50aWF0ZVxuICogdGhlIGBDb250cm9sQXJyYXlgIGRpcmVjdGx5LCBhcyB0aGF0IHdpbGwgcmVzdWx0IGluIHN0cmFuZ2UgYW5kIHVuZXhwZWN0ZWQgYmVoYXZpb3Igc3VjaFxuICogYXMgYnJva2VuIGNoYW5nZSBkZXRlY3Rpb24uXG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0LzIzREVTT3BiTm5CcEJIWnQxQlI0P3A9cHJldmlldykpXG4gKi9cbmV4cG9ydCBjbGFzcyBDb250cm9sQXJyYXkgZXh0ZW5kcyBBYnN0cmFjdENvbnRyb2wge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29udHJvbHM6IEFic3RyYWN0Q29udHJvbFtdLCB2YWxpZGF0b3I6IFZhbGlkYXRvckZuID0gbnVsbCxcbiAgICAgICAgICAgICAgYXN5bmNWYWxpZGF0b3I6IEFzeW5jVmFsaWRhdG9yRm4gPSBudWxsKSB7XG4gICAgc3VwZXIodmFsaWRhdG9yLCBhc3luY1ZhbGlkYXRvcik7XG4gICAgdGhpcy5faW5pdE9ic2VydmFibGVzKCk7XG4gICAgdGhpcy5fc2V0UGFyZW50Rm9yQ29udHJvbHMoKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoe29ubHlTZWxmOiB0cnVlLCBlbWl0RXZlbnQ6IGZhbHNlfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB7QGxpbmsgQWJzdHJhY3RDb250cm9sfSBhdCB0aGUgZ2l2ZW4gYGluZGV4YCBpbiB0aGUgYXJyYXkuXG4gICAqL1xuICBhdChpbmRleDogbnVtYmVyKTogQWJzdHJhY3RDb250cm9sIHsgcmV0dXJuIHRoaXMuY29udHJvbHNbaW5kZXhdOyB9XG5cbiAgLyoqXG4gICAqIEluc2VydCBhIG5ldyB7QGxpbmsgQWJzdHJhY3RDb250cm9sfSBhdCB0aGUgZW5kIG9mIHRoZSBhcnJheS5cbiAgICovXG4gIHB1c2goY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogdm9pZCB7XG4gICAgdGhpcy5jb250cm9scy5wdXNoKGNvbnRyb2wpO1xuICAgIGNvbnRyb2wuc2V0UGFyZW50KHRoaXMpO1xuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluc2VydCBhIG5ldyB7QGxpbmsgQWJzdHJhY3RDb250cm9sfSBhdCB0aGUgZ2l2ZW4gYGluZGV4YCBpbiB0aGUgYXJyYXkuXG4gICAqL1xuICBpbnNlcnQoaW5kZXg6IG51bWJlciwgY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogdm9pZCB7XG4gICAgTGlzdFdyYXBwZXIuaW5zZXJ0KHRoaXMuY29udHJvbHMsIGluZGV4LCBjb250cm9sKTtcbiAgICBjb250cm9sLnNldFBhcmVudCh0aGlzKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgdGhlIGNvbnRyb2wgYXQgdGhlIGdpdmVuIGBpbmRleGAgaW4gdGhlIGFycmF5LlxuICAgKi9cbiAgcmVtb3ZlQXQoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIExpc3RXcmFwcGVyLnJlbW92ZUF0KHRoaXMuY29udHJvbHMsIGluZGV4KTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMZW5ndGggb2YgdGhlIGNvbnRyb2wgYXJyYXkuXG4gICAqL1xuICBnZXQgbGVuZ3RoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLmNvbnRyb2xzLmxlbmd0aDsgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3VwZGF0ZVZhbHVlKCk6IHZvaWQgeyB0aGlzLl92YWx1ZSA9IHRoaXMuY29udHJvbHMubWFwKChjb250cm9sKSA9PiBjb250cm9sLnZhbHVlKTsgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2FueUNvbnRyb2xzSGF2ZVN0YXR1cyhzdGF0dXM6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNvbnRyb2xzLnNvbWUoYyA9PiBjLnN0YXR1cyA9PSBzdGF0dXMpO1xuICB9XG5cblxuICAvKiogQGludGVybmFsICovXG4gIF9zZXRQYXJlbnRGb3JDb250cm9scygpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRyb2xzLmZvckVhY2goKGNvbnRyb2wpID0+IHsgY29udHJvbC5zZXRQYXJlbnQodGhpcyk7IH0pO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
