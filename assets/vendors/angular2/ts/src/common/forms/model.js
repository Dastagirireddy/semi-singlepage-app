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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZm9ybXMvbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O1FBU2EsS0FBSyxFQUtMLE9BQU8sRUFNUCxPQUFPO0lBRXBCLG1CQUEwQixPQUFlO1FBQ3ZDLE1BQU0sQ0FBQyxPQUFPLFlBQVksZUFBZSxDQUFDO0lBQzVDLENBQUM7SUFGRCxpQ0FFQyxDQUFBO0lBRUQsZUFBZSxPQUF3QixFQUFFLElBQW9DO1FBQzNFLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFFL0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxHQUFZLElBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksWUFBWSxLQUFLLElBQUksd0JBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBRXBFLE1BQU0sQ0FBMEIsSUFBSzthQUNoQyxNQUFNLENBQUMsVUFBQyxDQUFDLEVBQUUsSUFBSTtZQUNkLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixNQUFNLENBQUMsZ0JBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDL0QsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDckMsSUFBSSxLQUFLLEdBQVcsSUFBSSxDQUFDO2dCQUN6QixNQUFNLENBQUMsZ0JBQVMsQ0FB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O29CQUMzQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztnQkFDaEMsQ0FBQztnQkFLRCxzQkFBSSxnQ0FBTTtvQkFIVjs7dUJBRUc7eUJBQ0gsY0FBdUIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUVyRCxnQkFBZ0I7Z0JBQ2hCLG1DQUFZLEdBQVosY0FBdUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFDLE9BQU8sSUFBSyxPQUFBLE9BQU8sQ0FBQyxLQUFLLEVBQWIsQ0FBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVyRixnQkFBZ0I7Z0JBQ2hCLDZDQUFzQixHQUF0QixVQUF1QixNQUFjO29CQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsTUFBTSxJQUFJLE1BQU0sRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO2dCQUNyRCxDQUFDO2dCQUdELGdCQUFnQjtnQkFDaEIsNENBQXFCLEdBQXJCO29CQUFBLGlCQUVDO29CQURDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTyxJQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkUsQ0FBQztnQkFDSCxtQkFBQztZQUFELENBMURBLEFBMERDLENBMURpQyxlQUFlLEdBMERoRDtZQTFERCx1Q0EwREMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tbW9uL2Zvcm1zL21vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc1ByZXNlbnQsIGlzQmxhbmssIG5vcm1hbGl6ZUJvb2x9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge09ic2VydmFibGUsIEV2ZW50RW1pdHRlciwgT2JzZXJ2YWJsZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYXN5bmMnO1xuaW1wb3J0IHtQcm9taXNlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9wcm9taXNlJztcbmltcG9ydCB7U3RyaW5nTWFwV3JhcHBlciwgTGlzdFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge1ZhbGlkYXRvckZuLCBBc3luY1ZhbGlkYXRvckZufSBmcm9tICcuL2RpcmVjdGl2ZXMvdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogSW5kaWNhdGVzIHRoYXQgYSBDb250cm9sIGlzIHZhbGlkLCBpLmUuIHRoYXQgbm8gZXJyb3JzIGV4aXN0IGluIHRoZSBpbnB1dCB2YWx1ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IFZBTElEID0gXCJWQUxJRFwiO1xuXG4vKipcbiAqIEluZGljYXRlcyB0aGF0IGEgQ29udHJvbCBpcyBpbnZhbGlkLCBpLmUuIHRoYXQgYW4gZXJyb3IgZXhpc3RzIGluIHRoZSBpbnB1dCB2YWx1ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IElOVkFMSUQgPSBcIklOVkFMSURcIjtcblxuLyoqXG4gKiBJbmRpY2F0ZXMgdGhhdCBhIENvbnRyb2wgaXMgcGVuZGluZywgaS5lLiB0aGF0IGFzeW5jIHZhbGlkYXRpb24gaXMgb2NjdXJyaW5nIGFuZFxuICogZXJyb3JzIGFyZSBub3QgeWV0IGF2YWlsYWJsZSBmb3IgdGhlIGlucHV0IHZhbHVlLlxuICovXG5leHBvcnQgY29uc3QgUEVORElORyA9IFwiUEVORElOR1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNDb250cm9sKGNvbnRyb2w6IE9iamVjdCk6IGJvb2xlYW4ge1xuICByZXR1cm4gY29udHJvbCBpbnN0YW5jZW9mIEFic3RyYWN0Q29udHJvbDtcbn1cblxuZnVuY3Rpb24gX2ZpbmQoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBwYXRoOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+fCBzdHJpbmcpIHtcbiAgaWYgKGlzQmxhbmsocGF0aCkpIHJldHVybiBudWxsO1xuXG4gIGlmICghKHBhdGggaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICBwYXRoID0gKDxzdHJpbmc+cGF0aCkuc3BsaXQoXCIvXCIpO1xuICB9XG4gIGlmIChwYXRoIGluc3RhbmNlb2YgQXJyYXkgJiYgTGlzdFdyYXBwZXIuaXNFbXB0eShwYXRoKSkgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuICg8QXJyYXk8c3RyaW5nIHwgbnVtYmVyPj5wYXRoKVxuICAgICAgLnJlZHVjZSgodiwgbmFtZSkgPT4ge1xuICAgICAgICBpZiAodiBpbnN0YW5jZW9mIENvbnRyb2xHcm91cCkge1xuICAgICAgICAgIHJldHVybiBpc1ByZXNlbnQodi5jb250cm9sc1tuYW1lXSkgPyB2LmNvbnRyb2xzW25hbWVdIDogbnVsbDtcbiAgICAgICAgfSBlbHNlIGlmICh2IGluc3RhbmNlb2YgQ29udHJvbEFycmF5KSB7XG4gICAgICAgICAgdmFyIGluZGV4ID0gPG51bWJlcj5uYW1lO1xuICAgICAgICAgIHJldHVybiBpc1ByZXNlbnQodi5hdChpbmRleCkpID8gdi5hdChpbmRleCkgOiBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9LCBjb250cm9sKTtcbn1cblxuZnVuY3Rpb24gdG9PYnNlcnZhYmxlKHI6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG4gIHJldHVybiBQcm9taXNlV3JhcHBlci5pc1Byb21pc2UocikgPyBPYnNlcnZhYmxlV3JhcHBlci5mcm9tUHJvbWlzZShyKSA6IHI7XG59XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0Q29udHJvbCB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3ZhbHVlOiBhbnk7XG5cbiAgcHJpdmF0ZSBfdmFsdWVDaGFuZ2VzOiBFdmVudEVtaXR0ZXI8YW55PjtcbiAgcHJpdmF0ZSBfc3RhdHVzQ2hhbmdlczogRXZlbnRFbWl0dGVyPGFueT47XG4gIHByaXZhdGUgX3N0YXR1czogc3RyaW5nO1xuICBwcml2YXRlIF9lcnJvcnM6IHtba2V5OiBzdHJpbmddOiBhbnl9O1xuICBwcml2YXRlIF9wcmlzdGluZTogYm9vbGVhbiA9IHRydWU7XG4gIHByaXZhdGUgX3RvdWNoZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfcGFyZW50OiBDb250cm9sR3JvdXAgfCBDb250cm9sQXJyYXk7XG4gIHByaXZhdGUgX2FzeW5jVmFsaWRhdGlvblN1YnNjcmlwdGlvbjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWxpZGF0b3I6IFZhbGlkYXRvckZuLCBwdWJsaWMgYXN5bmNWYWxpZGF0b3I6IEFzeW5jVmFsaWRhdG9yRm4pIHt9XG5cbiAgZ2V0IHZhbHVlKCk6IGFueSB7IHJldHVybiB0aGlzLl92YWx1ZTsgfVxuXG4gIGdldCBzdGF0dXMoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3N0YXR1czsgfVxuXG4gIGdldCB2YWxpZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3N0YXR1cyA9PT0gVkFMSUQ7IH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZXJyb3JzIG9mIHRoaXMgY29udHJvbC5cbiAgICovXG4gIGdldCBlcnJvcnMoKToge1trZXk6IHN0cmluZ106IGFueX0geyByZXR1cm4gdGhpcy5fZXJyb3JzOyB9XG5cbiAgZ2V0IHByaXN0aW5lKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcHJpc3RpbmU7IH1cblxuICBnZXQgZGlydHkoKTogYm9vbGVhbiB7IHJldHVybiAhdGhpcy5wcmlzdGluZTsgfVxuXG4gIGdldCB0b3VjaGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fdG91Y2hlZDsgfVxuXG4gIGdldCB1bnRvdWNoZWQoKTogYm9vbGVhbiB7IHJldHVybiAhdGhpcy5fdG91Y2hlZDsgfVxuXG4gIGdldCB2YWx1ZUNoYW5nZXMoKTogT2JzZXJ2YWJsZTxhbnk+IHsgcmV0dXJuIHRoaXMuX3ZhbHVlQ2hhbmdlczsgfVxuXG4gIGdldCBzdGF0dXNDaGFuZ2VzKCk6IE9ic2VydmFibGU8YW55PiB7IHJldHVybiB0aGlzLl9zdGF0dXNDaGFuZ2VzOyB9XG5cbiAgZ2V0IHBlbmRpbmcoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9zdGF0dXMgPT0gUEVORElORzsgfVxuXG4gIG1hcmtBc1RvdWNoZWQoKTogdm9pZCB7IHRoaXMuX3RvdWNoZWQgPSB0cnVlOyB9XG5cbiAgbWFya0FzRGlydHkoe29ubHlTZWxmfToge29ubHlTZWxmPzogYm9vbGVhbn0gPSB7fSk6IHZvaWQge1xuICAgIG9ubHlTZWxmID0gbm9ybWFsaXplQm9vbChvbmx5U2VsZik7XG4gICAgdGhpcy5fcHJpc3RpbmUgPSBmYWxzZTtcblxuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fcGFyZW50KSAmJiAhb25seVNlbGYpIHtcbiAgICAgIHRoaXMuX3BhcmVudC5tYXJrQXNEaXJ0eSh7b25seVNlbGY6IG9ubHlTZWxmfSk7XG4gICAgfVxuICB9XG5cbiAgbWFya0FzUGVuZGluZyh7b25seVNlbGZ9OiB7b25seVNlbGY/OiBib29sZWFufSA9IHt9KTogdm9pZCB7XG4gICAgb25seVNlbGYgPSBub3JtYWxpemVCb29sKG9ubHlTZWxmKTtcbiAgICB0aGlzLl9zdGF0dXMgPSBQRU5ESU5HO1xuXG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl9wYXJlbnQpICYmICFvbmx5U2VsZikge1xuICAgICAgdGhpcy5fcGFyZW50Lm1hcmtBc1BlbmRpbmcoe29ubHlTZWxmOiBvbmx5U2VsZn0pO1xuICAgIH1cbiAgfVxuXG4gIHNldFBhcmVudChwYXJlbnQ6IENvbnRyb2xHcm91cCB8IENvbnRyb2xBcnJheSk6IHZvaWQgeyB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7IH1cblxuICB1cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KFxuICAgICAge29ubHlTZWxmLCBlbWl0RXZlbnR9OiB7b25seVNlbGY/OiBib29sZWFuLCBlbWl0RXZlbnQ/OiBib29sZWFufSA9IHt9KTogdm9pZCB7XG4gICAgb25seVNlbGYgPSBub3JtYWxpemVCb29sKG9ubHlTZWxmKTtcbiAgICBlbWl0RXZlbnQgPSBpc1ByZXNlbnQoZW1pdEV2ZW50KSA/IGVtaXRFdmVudCA6IHRydWU7XG5cbiAgICB0aGlzLl91cGRhdGVWYWx1ZSgpO1xuXG4gICAgdGhpcy5fZXJyb3JzID0gdGhpcy5fcnVuVmFsaWRhdG9yKCk7XG4gICAgdGhpcy5fc3RhdHVzID0gdGhpcy5fY2FsY3VsYXRlU3RhdHVzKCk7XG5cbiAgICBpZiAodGhpcy5fc3RhdHVzID09IFZBTElEIHx8IHRoaXMuX3N0YXR1cyA9PSBQRU5ESU5HKSB7XG4gICAgICB0aGlzLl9ydW5Bc3luY1ZhbGlkYXRvcihlbWl0RXZlbnQpO1xuICAgIH1cblxuICAgIGlmIChlbWl0RXZlbnQpIHtcbiAgICAgIE9ic2VydmFibGVXcmFwcGVyLmNhbGxFbWl0KHRoaXMuX3ZhbHVlQ2hhbmdlcywgdGhpcy5fdmFsdWUpO1xuICAgICAgT2JzZXJ2YWJsZVdyYXBwZXIuY2FsbEVtaXQodGhpcy5fc3RhdHVzQ2hhbmdlcywgdGhpcy5fc3RhdHVzKTtcbiAgICB9XG5cbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuX3BhcmVudCkgJiYgIW9ubHlTZWxmKSB7XG4gICAgICB0aGlzLl9wYXJlbnQudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSh7b25seVNlbGY6IG9ubHlTZWxmLCBlbWl0RXZlbnQ6IGVtaXRFdmVudH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3J1blZhbGlkYXRvcigpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLnZhbGlkYXRvcikgPyB0aGlzLnZhbGlkYXRvcih0aGlzKSA6IG51bGw7XG4gIH1cblxuICBwcml2YXRlIF9ydW5Bc3luY1ZhbGlkYXRvcihlbWl0RXZlbnQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuYXN5bmNWYWxpZGF0b3IpKSB7XG4gICAgICB0aGlzLl9zdGF0dXMgPSBQRU5ESU5HO1xuICAgICAgdGhpcy5fY2FuY2VsRXhpc3RpbmdTdWJzY3JpcHRpb24oKTtcbiAgICAgIHZhciBvYnMgPSB0b09ic2VydmFibGUodGhpcy5hc3luY1ZhbGlkYXRvcih0aGlzKSk7XG4gICAgICB0aGlzLl9hc3luY1ZhbGlkYXRpb25TdWJzY3JpcHRpb24gPSBPYnNlcnZhYmxlV3JhcHBlci5zdWJzY3JpYmUoXG4gICAgICAgICAgb2JzLCAocmVzOiB7W2tleTogc3RyaW5nXTogYW55fSkgPT4gdGhpcy5zZXRFcnJvcnMocmVzLCB7ZW1pdEV2ZW50OiBlbWl0RXZlbnR9KSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY2FuY2VsRXhpc3RpbmdTdWJzY3JpcHRpb24oKTogdm9pZCB7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl9hc3luY1ZhbGlkYXRpb25TdWJzY3JpcHRpb24pKSB7XG4gICAgICBPYnNlcnZhYmxlV3JhcHBlci5kaXNwb3NlKHRoaXMuX2FzeW5jVmFsaWRhdGlvblN1YnNjcmlwdGlvbik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgZXJyb3JzIG9uIGEgY29udHJvbC5cbiAgICpcbiAgICogVGhpcyBpcyB1c2VkIHdoZW4gdmFsaWRhdGlvbnMgYXJlIHJ1biBub3QgYXV0b21hdGljYWxseSwgYnV0IG1hbnVhbGx5IGJ5IHRoZSB1c2VyLlxuICAgKlxuICAgKiBDYWxsaW5nIGBzZXRFcnJvcnNgIHdpbGwgYWxzbyB1cGRhdGUgdGhlIHZhbGlkaXR5IG9mIHRoZSBwYXJlbnQgY29udHJvbC5cbiAgICpcbiAgICogIyMgVXNhZ2VcbiAgICpcbiAgICogYGBgXG4gICAqIHZhciBsb2dpbiA9IG5ldyBDb250cm9sKFwic29tZUxvZ2luXCIpO1xuICAgKiBsb2dpbi5zZXRFcnJvcnMoe1xuICAgKiAgIFwibm90VW5pcXVlXCI6IHRydWVcbiAgICogfSk7XG4gICAqXG4gICAqIGV4cGVjdChsb2dpbi52YWxpZCkudG9FcXVhbChmYWxzZSk7XG4gICAqIGV4cGVjdChsb2dpbi5lcnJvcnMpLnRvRXF1YWwoe1wibm90VW5pcXVlXCI6IHRydWV9KTtcbiAgICpcbiAgICogbG9naW4udXBkYXRlVmFsdWUoXCJzb21lT3RoZXJMb2dpblwiKTtcbiAgICpcbiAgICogZXhwZWN0KGxvZ2luLnZhbGlkKS50b0VxdWFsKHRydWUpO1xuICAgKiBgYGBcbiAgICovXG4gIHNldEVycm9ycyhlcnJvcnM6IHtba2V5OiBzdHJpbmddOiBhbnl9LCB7ZW1pdEV2ZW50fToge2VtaXRFdmVudD86IGJvb2xlYW59ID0ge30pOiB2b2lkIHtcbiAgICBlbWl0RXZlbnQgPSBpc1ByZXNlbnQoZW1pdEV2ZW50KSA/IGVtaXRFdmVudCA6IHRydWU7XG5cbiAgICB0aGlzLl9lcnJvcnMgPSBlcnJvcnM7XG4gICAgdGhpcy5fc3RhdHVzID0gdGhpcy5fY2FsY3VsYXRlU3RhdHVzKCk7XG5cbiAgICBpZiAoZW1pdEV2ZW50KSB7XG4gICAgICBPYnNlcnZhYmxlV3JhcHBlci5jYWxsRW1pdCh0aGlzLl9zdGF0dXNDaGFuZ2VzLCB0aGlzLl9zdGF0dXMpO1xuICAgIH1cblxuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fcGFyZW50KSkge1xuICAgICAgdGhpcy5fcGFyZW50Ll91cGRhdGVDb250cm9sc0Vycm9ycygpO1xuICAgIH1cbiAgfVxuXG4gIGZpbmQocGF0aDogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPnwgc3RyaW5nKTogQWJzdHJhY3RDb250cm9sIHsgcmV0dXJuIF9maW5kKHRoaXMsIHBhdGgpOyB9XG5cbiAgZ2V0RXJyb3IoZXJyb3JDb2RlOiBzdHJpbmcsIHBhdGg6IHN0cmluZ1tdID0gbnVsbCk6IGFueSB7XG4gICAgdmFyIGNvbnRyb2wgPSBpc1ByZXNlbnQocGF0aCkgJiYgIUxpc3RXcmFwcGVyLmlzRW1wdHkocGF0aCkgPyB0aGlzLmZpbmQocGF0aCkgOiB0aGlzO1xuICAgIGlmIChpc1ByZXNlbnQoY29udHJvbCkgJiYgaXNQcmVzZW50KGNvbnRyb2wuX2Vycm9ycykpIHtcbiAgICAgIHJldHVybiBTdHJpbmdNYXBXcmFwcGVyLmdldChjb250cm9sLl9lcnJvcnMsIGVycm9yQ29kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGhhc0Vycm9yKGVycm9yQ29kZTogc3RyaW5nLCBwYXRoOiBzdHJpbmdbXSA9IG51bGwpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuZ2V0RXJyb3IoZXJyb3JDb2RlLCBwYXRoKSk7XG4gIH1cblxuICBnZXQgcm9vdCgpOiBBYnN0cmFjdENvbnRyb2wge1xuICAgIGxldCB4OiBBYnN0cmFjdENvbnRyb2wgPSB0aGlzO1xuXG4gICAgd2hpbGUgKGlzUHJlc2VudCh4Ll9wYXJlbnQpKSB7XG4gICAgICB4ID0geC5fcGFyZW50O1xuICAgIH1cblxuICAgIHJldHVybiB4O1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfdXBkYXRlQ29udHJvbHNFcnJvcnMoKTogdm9pZCB7XG4gICAgdGhpcy5fc3RhdHVzID0gdGhpcy5fY2FsY3VsYXRlU3RhdHVzKCk7XG5cbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuX3BhcmVudCkpIHtcbiAgICAgIHRoaXMuX3BhcmVudC5fdXBkYXRlQ29udHJvbHNFcnJvcnMoKTtcbiAgICB9XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9pbml0T2JzZXJ2YWJsZXMoKSB7XG4gICAgdGhpcy5fdmFsdWVDaGFuZ2VzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXMuX3N0YXR1c0NoYW5nZXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIH1cblxuXG4gIHByaXZhdGUgX2NhbGN1bGF0ZVN0YXR1cygpOiBzdHJpbmcge1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fZXJyb3JzKSkgcmV0dXJuIElOVkFMSUQ7XG4gICAgaWYgKHRoaXMuX2FueUNvbnRyb2xzSGF2ZVN0YXR1cyhQRU5ESU5HKSkgcmV0dXJuIFBFTkRJTkc7XG4gICAgaWYgKHRoaXMuX2FueUNvbnRyb2xzSGF2ZVN0YXR1cyhJTlZBTElEKSkgcmV0dXJuIElOVkFMSUQ7XG4gICAgcmV0dXJuIFZBTElEO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBhYnN0cmFjdCBfdXBkYXRlVmFsdWUoKTogdm9pZDtcblxuICAvKiogQGludGVybmFsICovXG4gIGFic3RyYWN0IF9hbnlDb250cm9sc0hhdmVTdGF0dXMoc3RhdHVzOiBzdHJpbmcpOiBib29sZWFuO1xufVxuXG4vKipcbiAqIERlZmluZXMgYSBwYXJ0IG9mIGEgZm9ybSB0aGF0IGNhbm5vdCBiZSBkaXZpZGVkIGludG8gb3RoZXIgY29udHJvbHMuIGBDb250cm9sYHMgaGF2ZSB2YWx1ZXMgYW5kXG4gKiB2YWxpZGF0aW9uIHN0YXRlLCB3aGljaCBpcyBkZXRlcm1pbmVkIGJ5IGFuIG9wdGlvbmFsIHZhbGlkYXRpb24gZnVuY3Rpb24uXG4gKlxuICogYENvbnRyb2xgIGlzIG9uZSBvZiB0aGUgdGhyZWUgZnVuZGFtZW50YWwgYnVpbGRpbmcgYmxvY2tzIHVzZWQgdG8gZGVmaW5lIGZvcm1zIGluIEFuZ3VsYXIsIGFsb25nXG4gKiB3aXRoIHtAbGluayBDb250cm9sR3JvdXB9IGFuZCB7QGxpbmsgQ29udHJvbEFycmF5fS5cbiAqXG4gKiAjIyBVc2FnZVxuICpcbiAqIEJ5IGRlZmF1bHQsIGEgYENvbnRyb2xgIGlzIGNyZWF0ZWQgZm9yIGV2ZXJ5IGA8aW5wdXQ+YCBvciBvdGhlciBmb3JtIGNvbXBvbmVudC5cbiAqIFdpdGgge0BsaW5rIE5nRm9ybUNvbnRyb2x9IG9yIHtAbGluayBOZ0Zvcm1Nb2RlbH0gYW4gZXhpc3Rpbmcge0BsaW5rIENvbnRyb2x9IGNhbiBiZVxuICogYm91bmQgdG8gYSBET00gZWxlbWVudCBpbnN0ZWFkLiBUaGlzIGBDb250cm9sYCBjYW4gYmUgY29uZmlndXJlZCB3aXRoIGEgY3VzdG9tXG4gKiB2YWxpZGF0aW9uIGZ1bmN0aW9uLlxuICpcbiAqICMjIyBFeGFtcGxlIChbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC8yM0RFU09wYk5uQnBCSFp0MUJSND9wPXByZXZpZXcpKVxuICovXG5leHBvcnQgY2xhc3MgQ29udHJvbCBleHRlbmRzIEFic3RyYWN0Q29udHJvbCB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX29uQ2hhbmdlOiBGdW5jdGlvbjtcblxuICBjb25zdHJ1Y3Rvcih2YWx1ZTogYW55ID0gbnVsbCwgdmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IG51bGwsXG4gICAgICAgICAgICAgIGFzeW5jVmFsaWRhdG9yOiBBc3luY1ZhbGlkYXRvckZuID0gbnVsbCkge1xuICAgIHN1cGVyKHZhbGlkYXRvciwgYXN5bmNWYWxpZGF0b3IpO1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHtvbmx5U2VsZjogdHJ1ZSwgZW1pdEV2ZW50OiBmYWxzZX0pO1xuICAgIHRoaXMuX2luaXRPYnNlcnZhYmxlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgdmFsdWUgb2YgdGhlIGNvbnRyb2wgdG8gYHZhbHVlYC5cbiAgICpcbiAgICogSWYgYG9ubHlTZWxmYCBpcyBgdHJ1ZWAsIHRoaXMgY2hhbmdlIHdpbGwgb25seSBhZmZlY3QgdGhlIHZhbGlkYXRpb24gb2YgdGhpcyBgQ29udHJvbGBcbiAgICogYW5kIG5vdCBpdHMgcGFyZW50IGNvbXBvbmVudC4gSWYgYGVtaXRFdmVudGAgaXMgYHRydWVgLCB0aGlzIGNoYW5nZSB3aWxsIGNhdXNlIGFcbiAgICogYHZhbHVlQ2hhbmdlc2AgZXZlbnQgb24gdGhlIGBDb250cm9sYCB0byBiZSBlbWl0dGVkLiBCb3RoIG9mIHRoZXNlIG9wdGlvbnMgZGVmYXVsdCB0b1xuICAgKiBgZmFsc2VgLlxuICAgKlxuICAgKiBJZiBgZW1pdE1vZGVsVG9WaWV3Q2hhbmdlYCBpcyBgdHJ1ZWAsIHRoZSB2aWV3IHdpbGwgYmUgbm90aWZpZWQgYWJvdXQgdGhlIG5ldyB2YWx1ZVxuICAgKiB2aWEgYW4gYG9uQ2hhbmdlYCBldmVudC4gVGhpcyBpcyB0aGUgZGVmYXVsdCBiZWhhdmlvciBpZiBgZW1pdE1vZGVsVG9WaWV3Q2hhbmdlYCBpcyBub3RcbiAgICogc3BlY2lmaWVkLlxuICAgKi9cbiAgdXBkYXRlVmFsdWUodmFsdWU6IGFueSwge29ubHlTZWxmLCBlbWl0RXZlbnQsIGVtaXRNb2RlbFRvVmlld0NoYW5nZX06IHtcbiAgICBvbmx5U2VsZj86IGJvb2xlYW4sXG4gICAgZW1pdEV2ZW50PzogYm9vbGVhbixcbiAgICBlbWl0TW9kZWxUb1ZpZXdDaGFuZ2U/OiBib29sZWFuXG4gIH0gPSB7fSk6IHZvaWQge1xuICAgIGVtaXRNb2RlbFRvVmlld0NoYW5nZSA9IGlzUHJlc2VudChlbWl0TW9kZWxUb1ZpZXdDaGFuZ2UpID8gZW1pdE1vZGVsVG9WaWV3Q2hhbmdlIDogdHJ1ZTtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fb25DaGFuZ2UpICYmIGVtaXRNb2RlbFRvVmlld0NoYW5nZSkgdGhpcy5fb25DaGFuZ2UodGhpcy5fdmFsdWUpO1xuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSh7b25seVNlbGY6IG9ubHlTZWxmLCBlbWl0RXZlbnQ6IGVtaXRFdmVudH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgX3VwZGF0ZVZhbHVlKCkge31cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBfYW55Q29udHJvbHNIYXZlU3RhdHVzKHN0YXR1czogc3RyaW5nKTogYm9vbGVhbiB7IHJldHVybiBmYWxzZTsgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhIGxpc3RlbmVyIGZvciBjaGFuZ2UgZXZlbnRzLlxuICAgKi9cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHsgdGhpcy5fb25DaGFuZ2UgPSBmbjsgfVxufVxuXG4vKipcbiAqIERlZmluZXMgYSBwYXJ0IG9mIGEgZm9ybSwgb2YgZml4ZWQgbGVuZ3RoLCB0aGF0IGNhbiBjb250YWluIG90aGVyIGNvbnRyb2xzLlxuICpcbiAqIEEgYENvbnRyb2xHcm91cGAgYWdncmVnYXRlcyB0aGUgdmFsdWVzIG9mIGVhY2gge0BsaW5rIENvbnRyb2x9IGluIHRoZSBncm91cC5cbiAqIFRoZSBzdGF0dXMgb2YgYSBgQ29udHJvbEdyb3VwYCBkZXBlbmRzIG9uIHRoZSBzdGF0dXMgb2YgaXRzIGNoaWxkcmVuLlxuICogSWYgb25lIG9mIHRoZSBjb250cm9scyBpbiBhIGdyb3VwIGlzIGludmFsaWQsIHRoZSBlbnRpcmUgZ3JvdXAgaXMgaW52YWxpZC5cbiAqIFNpbWlsYXJseSwgaWYgYSBjb250cm9sIGNoYW5nZXMgaXRzIHZhbHVlLCB0aGUgZW50aXJlIGdyb3VwIGNoYW5nZXMgYXMgd2VsbC5cbiAqXG4gKiBgQ29udHJvbEdyb3VwYCBpcyBvbmUgb2YgdGhlIHRocmVlIGZ1bmRhbWVudGFsIGJ1aWxkaW5nIGJsb2NrcyB1c2VkIHRvIGRlZmluZSBmb3JtcyBpbiBBbmd1bGFyLFxuICogYWxvbmcgd2l0aCB7QGxpbmsgQ29udHJvbH0gYW5kIHtAbGluayBDb250cm9sQXJyYXl9LiB7QGxpbmsgQ29udHJvbEFycmF5fSBjYW4gYWxzbyBjb250YWluIG90aGVyXG4gKiBjb250cm9scywgYnV0IGlzIG9mIHZhcmlhYmxlIGxlbmd0aC5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvMjNERVNPcGJObkJwQkhadDFCUjQ/cD1wcmV2aWV3KSlcbiAqL1xuZXhwb3J0IGNsYXNzIENvbnRyb2xHcm91cCBleHRlbmRzIEFic3RyYWN0Q29udHJvbCB7XG4gIHByaXZhdGUgX29wdGlvbmFsczoge1trZXk6IHN0cmluZ106IGJvb2xlYW59O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb250cm9sczoge1trZXk6IHN0cmluZ106IEFic3RyYWN0Q29udHJvbH0sXG4gICAgICAgICAgICAgIG9wdGlvbmFsczoge1trZXk6IHN0cmluZ106IGJvb2xlYW59ID0gbnVsbCwgdmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IG51bGwsXG4gICAgICAgICAgICAgIGFzeW5jVmFsaWRhdG9yOiBBc3luY1ZhbGlkYXRvckZuID0gbnVsbCkge1xuICAgIHN1cGVyKHZhbGlkYXRvciwgYXN5bmNWYWxpZGF0b3IpO1xuICAgIHRoaXMuX29wdGlvbmFscyA9IGlzUHJlc2VudChvcHRpb25hbHMpID8gb3B0aW9uYWxzIDoge307XG4gICAgdGhpcy5faW5pdE9ic2VydmFibGVzKCk7XG4gICAgdGhpcy5fc2V0UGFyZW50Rm9yQ29udHJvbHMoKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoe29ubHlTZWxmOiB0cnVlLCBlbWl0RXZlbnQ6IGZhbHNlfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgY29udHJvbCB0byB0aGlzIGdyb3VwLlxuICAgKi9cbiAgYWRkQ29udHJvbChuYW1lOiBzdHJpbmcsIGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHZvaWQge1xuICAgIHRoaXMuY29udHJvbHNbbmFtZV0gPSBjb250cm9sO1xuICAgIGNvbnRyb2wuc2V0UGFyZW50KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIGNvbnRyb2wgZnJvbSB0aGlzIGdyb3VwLlxuICAgKi9cbiAgcmVtb3ZlQ29udHJvbChuYW1lOiBzdHJpbmcpOiB2b2lkIHsgU3RyaW5nTWFwV3JhcHBlci5kZWxldGUodGhpcy5jb250cm9scywgbmFtZSk7IH1cblxuICAvKipcbiAgICogTWFyayB0aGUgbmFtZWQgY29udHJvbCBhcyBub24tb3B0aW9uYWwuXG4gICAqL1xuICBpbmNsdWRlKGNvbnRyb2xOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBTdHJpbmdNYXBXcmFwcGVyLnNldCh0aGlzLl9vcHRpb25hbHMsIGNvbnRyb2xOYW1lLCB0cnVlKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYXJrIHRoZSBuYW1lZCBjb250cm9sIGFzIG9wdGlvbmFsLlxuICAgKi9cbiAgZXhjbHVkZShjb250cm9sTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgU3RyaW5nTWFwV3JhcHBlci5zZXQodGhpcy5fb3B0aW9uYWxzLCBjb250cm9sTmFtZSwgZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIHdoZXRoZXIgdGhlcmUgaXMgYSBjb250cm9sIHdpdGggdGhlIGdpdmVuIG5hbWUgaW4gdGhlIGdyb3VwLlxuICAgKi9cbiAgY29udGFpbnMoY29udHJvbE5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHZhciBjID0gU3RyaW5nTWFwV3JhcHBlci5jb250YWlucyh0aGlzLmNvbnRyb2xzLCBjb250cm9sTmFtZSk7XG4gICAgcmV0dXJuIGMgJiYgdGhpcy5faW5jbHVkZWQoY29udHJvbE5hbWUpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc2V0UGFyZW50Rm9yQ29udHJvbHMoKSB7XG4gICAgU3RyaW5nTWFwV3JhcHBlci5mb3JFYWNoKFxuICAgICAgICB0aGlzLmNvbnRyb2xzLCAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBuYW1lOiBzdHJpbmcpID0+IHsgY29udHJvbC5zZXRQYXJlbnQodGhpcyk7IH0pO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfdXBkYXRlVmFsdWUoKSB7IHRoaXMuX3ZhbHVlID0gdGhpcy5fcmVkdWNlVmFsdWUoKTsgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2FueUNvbnRyb2xzSGF2ZVN0YXR1cyhzdGF0dXM6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHZhciByZXMgPSBmYWxzZTtcbiAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2godGhpcy5jb250cm9scywgKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgbmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICByZXMgPSByZXMgfHwgKHRoaXMuY29udGFpbnMobmFtZSkgJiYgY29udHJvbC5zdGF0dXMgPT0gc3RhdHVzKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcmVkdWNlVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlZHVjZUNoaWxkcmVuKFxuICAgICAgICB7fSwgKGFjYzoge1trOiBzdHJpbmddOiBBYnN0cmFjdENvbnRyb2x9LCBjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIG5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGFjY1tuYW1lXSA9IGNvbnRyb2wudmFsdWU7XG4gICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9yZWR1Y2VDaGlsZHJlbihpbml0VmFsdWU6IGFueSwgZm46IEZ1bmN0aW9uKSB7XG4gICAgdmFyIHJlcyA9IGluaXRWYWx1ZTtcbiAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2godGhpcy5jb250cm9scywgKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgbmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAodGhpcy5faW5jbHVkZWQobmFtZSkpIHtcbiAgICAgICAgcmVzID0gZm4ocmVzLCBjb250cm9sLCBuYW1lKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfaW5jbHVkZWQoY29udHJvbE5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHZhciBpc09wdGlvbmFsID0gU3RyaW5nTWFwV3JhcHBlci5jb250YWlucyh0aGlzLl9vcHRpb25hbHMsIGNvbnRyb2xOYW1lKTtcbiAgICByZXR1cm4gIWlzT3B0aW9uYWwgfHwgU3RyaW5nTWFwV3JhcHBlci5nZXQodGhpcy5fb3B0aW9uYWxzLCBjb250cm9sTmFtZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBEZWZpbmVzIGEgcGFydCBvZiBhIGZvcm0sIG9mIHZhcmlhYmxlIGxlbmd0aCwgdGhhdCBjYW4gY29udGFpbiBvdGhlciBjb250cm9scy5cbiAqXG4gKiBBIGBDb250cm9sQXJyYXlgIGFnZ3JlZ2F0ZXMgdGhlIHZhbHVlcyBvZiBlYWNoIHtAbGluayBDb250cm9sfSBpbiB0aGUgZ3JvdXAuXG4gKiBUaGUgc3RhdHVzIG9mIGEgYENvbnRyb2xBcnJheWAgZGVwZW5kcyBvbiB0aGUgc3RhdHVzIG9mIGl0cyBjaGlsZHJlbi5cbiAqIElmIG9uZSBvZiB0aGUgY29udHJvbHMgaW4gYSBncm91cCBpcyBpbnZhbGlkLCB0aGUgZW50aXJlIGFycmF5IGlzIGludmFsaWQuXG4gKiBTaW1pbGFybHksIGlmIGEgY29udHJvbCBjaGFuZ2VzIGl0cyB2YWx1ZSwgdGhlIGVudGlyZSBhcnJheSBjaGFuZ2VzIGFzIHdlbGwuXG4gKlxuICogYENvbnRyb2xBcnJheWAgaXMgb25lIG9mIHRoZSB0aHJlZSBmdW5kYW1lbnRhbCBidWlsZGluZyBibG9ja3MgdXNlZCB0byBkZWZpbmUgZm9ybXMgaW4gQW5ndWxhcixcbiAqIGFsb25nIHdpdGgge0BsaW5rIENvbnRyb2x9IGFuZCB7QGxpbmsgQ29udHJvbEdyb3VwfS4ge0BsaW5rIENvbnRyb2xHcm91cH0gY2FuIGFsc28gY29udGFpblxuICogb3RoZXIgY29udHJvbHMsIGJ1dCBpcyBvZiBmaXhlZCBsZW5ndGguXG4gKlxuICogIyMgQWRkaW5nIG9yIHJlbW92aW5nIGNvbnRyb2xzXG4gKlxuICogVG8gY2hhbmdlIHRoZSBjb250cm9scyBpbiB0aGUgYXJyYXksIHVzZSB0aGUgYHB1c2hgLCBgaW5zZXJ0YCwgb3IgYHJlbW92ZUF0YCBtZXRob2RzXG4gKiBpbiBgQ29udHJvbEFycmF5YCBpdHNlbGYuIFRoZXNlIG1ldGhvZHMgZW5zdXJlIHRoZSBjb250cm9scyBhcmUgcHJvcGVybHkgdHJhY2tlZCBpbiB0aGVcbiAqIGZvcm0ncyBoaWVyYXJjaHkuIERvIG5vdCBtb2RpZnkgdGhlIGFycmF5IG9mIGBBYnN0cmFjdENvbnRyb2xgcyB1c2VkIHRvIGluc3RhbnRpYXRlXG4gKiB0aGUgYENvbnRyb2xBcnJheWAgZGlyZWN0bHksIGFzIHRoYXQgd2lsbCByZXN1bHQgaW4gc3RyYW5nZSBhbmQgdW5leHBlY3RlZCBiZWhhdmlvciBzdWNoXG4gKiBhcyBicm9rZW4gY2hhbmdlIGRldGVjdGlvbi5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvMjNERVNPcGJObkJwQkhadDFCUjQ/cD1wcmV2aWV3KSlcbiAqL1xuZXhwb3J0IGNsYXNzIENvbnRyb2xBcnJheSBleHRlbmRzIEFic3RyYWN0Q29udHJvbCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb250cm9sczogQWJzdHJhY3RDb250cm9sW10sIHZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSBudWxsLFxuICAgICAgICAgICAgICBhc3luY1ZhbGlkYXRvcjogQXN5bmNWYWxpZGF0b3JGbiA9IG51bGwpIHtcbiAgICBzdXBlcih2YWxpZGF0b3IsIGFzeW5jVmFsaWRhdG9yKTtcbiAgICB0aGlzLl9pbml0T2JzZXJ2YWJsZXMoKTtcbiAgICB0aGlzLl9zZXRQYXJlbnRGb3JDb250cm9scygpO1xuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSh7b25seVNlbGY6IHRydWUsIGVtaXRFdmVudDogZmFsc2V9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHtAbGluayBBYnN0cmFjdENvbnRyb2x9IGF0IHRoZSBnaXZlbiBgaW5kZXhgIGluIHRoZSBhcnJheS5cbiAgICovXG4gIGF0KGluZGV4OiBudW1iZXIpOiBBYnN0cmFjdENvbnRyb2wgeyByZXR1cm4gdGhpcy5jb250cm9sc1tpbmRleF07IH1cblxuICAvKipcbiAgICogSW5zZXJ0IGEgbmV3IHtAbGluayBBYnN0cmFjdENvbnRyb2x9IGF0IHRoZSBlbmQgb2YgdGhlIGFycmF5LlxuICAgKi9cbiAgcHVzaChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRyb2xzLnB1c2goY29udHJvbCk7XG4gICAgY29udHJvbC5zZXRQYXJlbnQodGhpcyk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gIH1cblxuICAvKipcbiAgICogSW5zZXJ0IGEgbmV3IHtAbGluayBBYnN0cmFjdENvbnRyb2x9IGF0IHRoZSBnaXZlbiBgaW5kZXhgIGluIHRoZSBhcnJheS5cbiAgICovXG4gIGluc2VydChpbmRleDogbnVtYmVyLCBjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB2b2lkIHtcbiAgICBMaXN0V3JhcHBlci5pbnNlcnQodGhpcy5jb250cm9scywgaW5kZXgsIGNvbnRyb2wpO1xuICAgIGNvbnRyb2wuc2V0UGFyZW50KHRoaXMpO1xuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSB0aGUgY29udHJvbCBhdCB0aGUgZ2l2ZW4gYGluZGV4YCBpbiB0aGUgYXJyYXkuXG4gICAqL1xuICByZW1vdmVBdChpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgTGlzdFdyYXBwZXIucmVtb3ZlQXQodGhpcy5jb250cm9scywgaW5kZXgpO1xuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIExlbmd0aCBvZiB0aGUgY29udHJvbCBhcnJheS5cbiAgICovXG4gIGdldCBsZW5ndGgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuY29udHJvbHMubGVuZ3RoOyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfdXBkYXRlVmFsdWUoKTogdm9pZCB7IHRoaXMuX3ZhbHVlID0gdGhpcy5jb250cm9scy5tYXAoKGNvbnRyb2wpID0+IGNvbnRyb2wudmFsdWUpOyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfYW55Q29udHJvbHNIYXZlU3RhdHVzKHN0YXR1czogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29udHJvbHMuc29tZShjID0+IGMuc3RhdHVzID09IHN0YXR1cyk7XG4gIH1cblxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3NldFBhcmVudEZvckNvbnRyb2xzKCk6IHZvaWQge1xuICAgIHRoaXMuY29udHJvbHMuZm9yRWFjaCgoY29udHJvbCkgPT4geyBjb250cm9sLnNldFBhcmVudCh0aGlzKTsgfSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
