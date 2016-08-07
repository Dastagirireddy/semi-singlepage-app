System.register(['angular2/src/facade/lang', 'angular2/src/facade/collection', './change_detection_util', './change_detector_ref', './exceptions', './parser/locals', './constants', '../profile/profile', 'angular2/src/facade/async'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, collection_1, change_detection_util_1, change_detector_ref_1, exceptions_1, locals_1, constants_1, profile_1, async_1;
    var _scope_check, _Context, AbstractChangeDetector;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (change_detection_util_1_1) {
                change_detection_util_1 = change_detection_util_1_1;
            },
            function (change_detector_ref_1_1) {
                change_detector_ref_1 = change_detector_ref_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (locals_1_1) {
                locals_1 = locals_1_1;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            },
            function (profile_1_1) {
                profile_1 = profile_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            }],
        execute: function() {
            _scope_check = profile_1.wtfCreateScope("ChangeDetector#check(ascii id, bool throwOnChange)");
            _Context = (function () {
                function _Context(element, componentElement, context, locals, injector, expression) {
                    this.element = element;
                    this.componentElement = componentElement;
                    this.context = context;
                    this.locals = locals;
                    this.injector = injector;
                    this.expression = expression;
                }
                return _Context;
            }());
            AbstractChangeDetector = (function () {
                function AbstractChangeDetector(id, numberOfPropertyProtoRecords, bindingTargets, directiveIndices, strategy) {
                    this.id = id;
                    this.numberOfPropertyProtoRecords = numberOfPropertyProtoRecords;
                    this.bindingTargets = bindingTargets;
                    this.directiveIndices = directiveIndices;
                    this.strategy = strategy;
                    this.contentChildren = [];
                    this.viewChildren = [];
                    // The names of the below fields must be kept in sync with codegen_name_util.ts or
                    // change detection will fail.
                    this.state = constants_1.ChangeDetectorState.NeverChecked;
                    this.locals = null;
                    this.mode = null;
                    this.pipes = null;
                    this.ref = new change_detector_ref_1.ChangeDetectorRef_(this);
                }
                AbstractChangeDetector.prototype.addContentChild = function (cd) {
                    this.contentChildren.push(cd);
                    cd.parent = this;
                };
                AbstractChangeDetector.prototype.removeContentChild = function (cd) { collection_1.ListWrapper.remove(this.contentChildren, cd); };
                AbstractChangeDetector.prototype.addViewChild = function (cd) {
                    this.viewChildren.push(cd);
                    cd.parent = this;
                };
                AbstractChangeDetector.prototype.removeViewChild = function (cd) { collection_1.ListWrapper.remove(this.viewChildren, cd); };
                AbstractChangeDetector.prototype.remove = function () { this.parent.removeContentChild(this); };
                AbstractChangeDetector.prototype.handleEvent = function (eventName, elIndex, event) {
                    if (!this.hydrated()) {
                        this.throwDehydratedError(this.id + " -> " + eventName);
                    }
                    try {
                        var locals = new Map();
                        locals.set('$event', event);
                        var res = !this.handleEventInternal(eventName, elIndex, new locals_1.Locals(this.locals, locals));
                        this.markPathToRootAsCheckOnce();
                        return res;
                    }
                    catch (e) {
                        var c = this.dispatcher.getDebugContext(null, elIndex, null);
                        var context = lang_1.isPresent(c) ?
                            new exceptions_1.EventEvaluationErrorContext(c.element, c.componentElement, c.context, c.locals, c.injector) :
                            null;
                        throw new exceptions_1.EventEvaluationError(eventName, e, e.stack, context);
                    }
                };
                AbstractChangeDetector.prototype.handleEventInternal = function (eventName, elIndex, locals) { return false; };
                AbstractChangeDetector.prototype.detectChanges = function () { this.runDetectChanges(false); };
                AbstractChangeDetector.prototype.checkNoChanges = function () {
                    if (lang_1.assertionsEnabled()) {
                        this.runDetectChanges(true);
                    }
                };
                AbstractChangeDetector.prototype.runDetectChanges = function (throwOnChange) {
                    if (this.mode === constants_1.ChangeDetectionStrategy.Detached ||
                        this.mode === constants_1.ChangeDetectionStrategy.Checked || this.state === constants_1.ChangeDetectorState.Errored)
                        return;
                    var s = _scope_check(this.id, throwOnChange);
                    this.detectChangesInRecords(throwOnChange);
                    this._detectChangesContentChildren(throwOnChange);
                    if (!throwOnChange)
                        this.afterContentLifecycleCallbacks();
                    this._detectChangesInViewChildren(throwOnChange);
                    if (!throwOnChange)
                        this.afterViewLifecycleCallbacks();
                    if (this.mode === constants_1.ChangeDetectionStrategy.CheckOnce)
                        this.mode = constants_1.ChangeDetectionStrategy.Checked;
                    this.state = constants_1.ChangeDetectorState.CheckedBefore;
                    profile_1.wtfLeave(s);
                };
                // This method is not intended to be overridden. Subclasses should instead provide an
                // implementation of `detectChangesInRecordsInternal` which does the work of detecting changes
                // and which this method will call.
                // This method expects that `detectChangesInRecordsInternal` will set the property
                // `this.propertyBindingIndex` to the propertyBindingIndex of the first proto record. This is to
                // facilitate error reporting.
                AbstractChangeDetector.prototype.detectChangesInRecords = function (throwOnChange) {
                    if (!this.hydrated()) {
                        this.throwDehydratedError(this.id);
                    }
                    try {
                        this.detectChangesInRecordsInternal(throwOnChange);
                    }
                    catch (e) {
                        // throwOnChange errors aren't counted as fatal errors.
                        if (!(e instanceof exceptions_1.ExpressionChangedAfterItHasBeenCheckedException)) {
                            this.state = constants_1.ChangeDetectorState.Errored;
                        }
                        this._throwError(e, e.stack);
                    }
                };
                // Subclasses should override this method to perform any work necessary to detect and report
                // changes. For example, changes should be reported via `ChangeDetectionUtil.addChange`, lifecycle
                // methods should be called, etc.
                // This implementation should also set `this.propertyBindingIndex` to the propertyBindingIndex of
                // the
                // first proto record to facilitate error reporting. See {@link #detectChangesInRecords}.
                AbstractChangeDetector.prototype.detectChangesInRecordsInternal = function (throwOnChange) { };
                // This method is not intended to be overridden. Subclasses should instead provide an
                // implementation of `hydrateDirectives`.
                AbstractChangeDetector.prototype.hydrate = function (context, locals, dispatcher, pipes) {
                    this.dispatcher = dispatcher;
                    this.mode = change_detection_util_1.ChangeDetectionUtil.changeDetectionMode(this.strategy);
                    this.context = context;
                    this.locals = locals;
                    this.pipes = pipes;
                    this.hydrateDirectives(dispatcher);
                    this.state = constants_1.ChangeDetectorState.NeverChecked;
                };
                // Subclasses should override this method to hydrate any directives.
                AbstractChangeDetector.prototype.hydrateDirectives = function (dispatcher) { };
                // This method is not intended to be overridden. Subclasses should instead provide an
                // implementation of `dehydrateDirectives`.
                AbstractChangeDetector.prototype.dehydrate = function () {
                    this.dehydrateDirectives(true);
                    this._unsubscribeFromOutputs();
                    this.dispatcher = null;
                    this.context = null;
                    this.locals = null;
                    this.pipes = null;
                };
                // Subclasses should override this method to dehydrate any directives. This method should reverse
                // any work done in `hydrateDirectives`.
                AbstractChangeDetector.prototype.dehydrateDirectives = function (destroyPipes) { };
                AbstractChangeDetector.prototype.hydrated = function () { return lang_1.isPresent(this.context); };
                AbstractChangeDetector.prototype.destroyRecursive = function () {
                    this.dispatcher.notifyOnDestroy();
                    this.dehydrate();
                    var children = this.contentChildren;
                    for (var i = 0; i < children.length; i++) {
                        children[i].destroyRecursive();
                    }
                    children = this.viewChildren;
                    for (var i = 0; i < children.length; i++) {
                        children[i].destroyRecursive();
                    }
                };
                AbstractChangeDetector.prototype.afterContentLifecycleCallbacks = function () {
                    this.dispatcher.notifyAfterContentChecked();
                    this.afterContentLifecycleCallbacksInternal();
                };
                AbstractChangeDetector.prototype.afterContentLifecycleCallbacksInternal = function () { };
                AbstractChangeDetector.prototype.afterViewLifecycleCallbacks = function () {
                    this.dispatcher.notifyAfterViewChecked();
                    this.afterViewLifecycleCallbacksInternal();
                };
                AbstractChangeDetector.prototype.afterViewLifecycleCallbacksInternal = function () { };
                /** @internal */
                AbstractChangeDetector.prototype._detectChangesContentChildren = function (throwOnChange) {
                    var c = this.contentChildren;
                    for (var i = 0; i < c.length; ++i) {
                        c[i].runDetectChanges(throwOnChange);
                    }
                };
                /** @internal */
                AbstractChangeDetector.prototype._detectChangesInViewChildren = function (throwOnChange) {
                    var c = this.viewChildren;
                    for (var i = 0; i < c.length; ++i) {
                        c[i].runDetectChanges(throwOnChange);
                    }
                };
                AbstractChangeDetector.prototype.markAsCheckOnce = function () { this.mode = constants_1.ChangeDetectionStrategy.CheckOnce; };
                AbstractChangeDetector.prototype.markPathToRootAsCheckOnce = function () {
                    var c = this;
                    while (lang_1.isPresent(c) && c.mode !== constants_1.ChangeDetectionStrategy.Detached) {
                        if (c.mode === constants_1.ChangeDetectionStrategy.Checked)
                            c.mode = constants_1.ChangeDetectionStrategy.CheckOnce;
                        c = c.parent;
                    }
                };
                AbstractChangeDetector.prototype._unsubscribeFromOutputs = function () {
                    if (lang_1.isPresent(this.outputSubscriptions)) {
                        for (var i = 0; i < this.outputSubscriptions.length; ++i) {
                            async_1.ObservableWrapper.dispose(this.outputSubscriptions[i]);
                            this.outputSubscriptions[i] = null;
                        }
                    }
                };
                AbstractChangeDetector.prototype.getDirectiveFor = function (directives, index) {
                    return directives.getDirectiveFor(this.directiveIndices[index]);
                };
                AbstractChangeDetector.prototype.getDetectorFor = function (directives, index) {
                    return directives.getDetectorFor(this.directiveIndices[index]);
                };
                AbstractChangeDetector.prototype.notifyDispatcher = function (value) {
                    this.dispatcher.notifyOnBinding(this._currentBinding(), value);
                };
                AbstractChangeDetector.prototype.logBindingUpdate = function (value) {
                    this.dispatcher.logBindingUpdate(this._currentBinding(), value);
                };
                AbstractChangeDetector.prototype.addChange = function (changes, oldValue, newValue) {
                    if (lang_1.isBlank(changes)) {
                        changes = {};
                    }
                    changes[this._currentBinding().name] = change_detection_util_1.ChangeDetectionUtil.simpleChange(oldValue, newValue);
                    return changes;
                };
                AbstractChangeDetector.prototype._throwError = function (exception, stack) {
                    var error;
                    try {
                        var c = this.dispatcher.getDebugContext(null, this._currentBinding().elementIndex, null);
                        var context = lang_1.isPresent(c) ? new _Context(c.element, c.componentElement, c.context, c.locals, c.injector, this._currentBinding().debug) :
                            null;
                        error = new exceptions_1.ChangeDetectionError(this._currentBinding().debug, exception, stack, context);
                    }
                    catch (e) {
                        // if an error happens during getting the debug context, we throw a ChangeDetectionError
                        // without the extra information.
                        error = new exceptions_1.ChangeDetectionError(null, exception, stack, null);
                    }
                    throw error;
                };
                AbstractChangeDetector.prototype.throwOnChangeError = function (oldValue, newValue) {
                    throw new exceptions_1.ExpressionChangedAfterItHasBeenCheckedException(this._currentBinding().debug, oldValue, newValue, null);
                };
                AbstractChangeDetector.prototype.throwDehydratedError = function (detail) { throw new exceptions_1.DehydratedException(detail); };
                AbstractChangeDetector.prototype._currentBinding = function () {
                    return this.bindingTargets[this.propertyBindingIndex];
                };
                return AbstractChangeDetector;
            }());
            exports_1("AbstractChangeDetector", AbstractChangeDetector);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9hYnN0cmFjdF9jaGFuZ2VfZGV0ZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQW9CSSxZQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBQVosWUFBWSxHQUFlLHdCQUFjLENBQUMsb0RBQW9ELENBQUMsQ0FBQztZQUVwRztnQkFDRSxrQkFBbUIsT0FBWSxFQUFTLGdCQUFxQixFQUFTLE9BQVksRUFDL0QsTUFBVyxFQUFTLFFBQWEsRUFBUyxVQUFlO29CQUR6RCxZQUFPLEdBQVAsT0FBTyxDQUFLO29CQUFTLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBSztvQkFBUyxZQUFPLEdBQVAsT0FBTyxDQUFLO29CQUMvRCxXQUFNLEdBQU4sTUFBTSxDQUFLO29CQUFTLGFBQVEsR0FBUixRQUFRLENBQUs7b0JBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBSztnQkFBRyxDQUFDO2dCQUNsRixlQUFDO1lBQUQsQ0FIQSxBQUdDLElBQUE7WUFFRDtnQkFtQkUsZ0NBQW1CLEVBQVUsRUFBUyw0QkFBb0MsRUFDdkQsY0FBK0IsRUFBUyxnQkFBa0MsRUFDMUUsUUFBaUM7b0JBRmpDLE9BQUUsR0FBRixFQUFFLENBQVE7b0JBQVMsaUNBQTRCLEdBQTVCLDRCQUE0QixDQUFRO29CQUN2RCxtQkFBYyxHQUFkLGNBQWMsQ0FBaUI7b0JBQVMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtvQkFDMUUsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7b0JBcEJwRCxvQkFBZSxHQUFVLEVBQUUsQ0FBQztvQkFDNUIsaUJBQVksR0FBVSxFQUFFLENBQUM7b0JBSXpCLGtGQUFrRjtvQkFDbEYsOEJBQThCO29CQUM5QixVQUFLLEdBQXdCLCtCQUFtQixDQUFDLFlBQVksQ0FBQztvQkFFOUQsV0FBTSxHQUFXLElBQUksQ0FBQztvQkFDdEIsU0FBSSxHQUE0QixJQUFJ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QTtZQTVRRCwyREE0UUMsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vYWJzdHJhY3RfY2hhbmdlX2RldGVjdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthc3NlcnRpb25zRW5hYmxlZCwgaXNQcmVzZW50LCBpc0JsYW5rLCBTdHJpbmdXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uVXRpbH0gZnJvbSAnLi9jaGFuZ2VfZGV0ZWN0aW9uX3V0aWwnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgQ2hhbmdlRGV0ZWN0b3JSZWZffSBmcm9tICcuL2NoYW5nZV9kZXRlY3Rvcl9yZWYnO1xuaW1wb3J0IHtEaXJlY3RpdmVJbmRleH0gZnJvbSAnLi9kaXJlY3RpdmVfcmVjb3JkJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3IsIENoYW5nZURpc3BhdGNoZXJ9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQge1BpcGVzfSBmcm9tICcuL3BpcGVzJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvbkVycm9yLFxuICBFeHByZXNzaW9uQ2hhbmdlZEFmdGVySXRIYXNCZWVuQ2hlY2tlZEV4Y2VwdGlvbixcbiAgRGVoeWRyYXRlZEV4Y2VwdGlvbixcbiAgRXZlbnRFdmFsdWF0aW9uRXJyb3JDb250ZXh0LFxuICBFdmVudEV2YWx1YXRpb25FcnJvclxufSBmcm9tICcuL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtCaW5kaW5nVGFyZ2V0fSBmcm9tICcuL2JpbmRpbmdfcmVjb3JkJztcbmltcG9ydCB7TG9jYWxzfSBmcm9tICcuL3BhcnNlci9sb2NhbHMnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JTdGF0ZX0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHt3dGZDcmVhdGVTY29wZSwgd3RmTGVhdmUsIFd0ZlNjb3BlRm59IGZyb20gJy4uL3Byb2ZpbGUvcHJvZmlsZSc7XG5pbXBvcnQge09ic2VydmFibGVXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jJztcblxudmFyIF9zY29wZV9jaGVjazogV3RmU2NvcGVGbiA9IHd0ZkNyZWF0ZVNjb3BlKGBDaGFuZ2VEZXRlY3RvciNjaGVjayhhc2NpaSBpZCwgYm9vbCB0aHJvd09uQ2hhbmdlKWApO1xuXG5jbGFzcyBfQ29udGV4dCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBhbnksIHB1YmxpYyBjb21wb25lbnRFbGVtZW50OiBhbnksIHB1YmxpYyBjb250ZXh0OiBhbnksXG4gICAgICAgICAgICAgIHB1YmxpYyBsb2NhbHM6IGFueSwgcHVibGljIGluamVjdG9yOiBhbnksIHB1YmxpYyBleHByZXNzaW9uOiBhbnkpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBBYnN0cmFjdENoYW5nZURldGVjdG9yPFQ+IGltcGxlbWVudHMgQ2hhbmdlRGV0ZWN0b3Ige1xuICBjb250ZW50Q2hpbGRyZW46IGFueVtdID0gW107XG4gIHZpZXdDaGlsZHJlbjogYW55W10gPSBbXTtcbiAgcGFyZW50OiBDaGFuZ2VEZXRlY3RvcjtcbiAgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZjtcblxuICAvLyBUaGUgbmFtZXMgb2YgdGhlIGJlbG93IGZpZWxkcyBtdXN0IGJlIGtlcHQgaW4gc3luYyB3aXRoIGNvZGVnZW5fbmFtZV91dGlsLnRzIG9yXG4gIC8vIGNoYW5nZSBkZXRlY3Rpb24gd2lsbCBmYWlsLlxuICBzdGF0ZTogQ2hhbmdlRGV0ZWN0b3JTdGF0ZSA9IENoYW5nZURldGVjdG9yU3RhdGUuTmV2ZXJDaGVja2VkO1xuICBjb250ZXh0OiBUO1xuICBsb2NhbHM6IExvY2FscyA9IG51bGw7XG4gIG1vZGU6IENoYW5nZURldGVjdGlvblN0cmF0ZWd5ID0gbnVsbDtcbiAgcGlwZXM6IFBpcGVzID0gbnVsbDtcbiAgcHJvcGVydHlCaW5kaW5nSW5kZXg6IG51bWJlcjtcbiAgb3V0cHV0U3Vic2NyaXB0aW9uczogYW55W107XG5cbiAgZGlzcGF0Y2hlcjogQ2hhbmdlRGlzcGF0Y2hlcjtcblxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpZDogc3RyaW5nLCBwdWJsaWMgbnVtYmVyT2ZQcm9wZXJ0eVByb3RvUmVjb3JkczogbnVtYmVyLFxuICAgICAgICAgICAgICBwdWJsaWMgYmluZGluZ1RhcmdldHM6IEJpbmRpbmdUYXJnZXRbXSwgcHVibGljIGRpcmVjdGl2ZUluZGljZXM6IERpcmVjdGl2ZUluZGV4W10sXG4gICAgICAgICAgICAgIHB1YmxpYyBzdHJhdGVneTogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kpIHtcbiAgICB0aGlzLnJlZiA9IG5ldyBDaGFuZ2VEZXRlY3RvclJlZl8odGhpcyk7XG4gIH1cblxuICBhZGRDb250ZW50Q2hpbGQoY2Q6IENoYW5nZURldGVjdG9yKTogdm9pZCB7XG4gICAgdGhpcy5jb250ZW50Q2hpbGRyZW4ucHVzaChjZCk7XG4gICAgY2QucGFyZW50ID0gdGhpcztcbiAgfVxuXG4gIHJlbW92ZUNvbnRlbnRDaGlsZChjZDogQ2hhbmdlRGV0ZWN0b3IpOiB2b2lkIHsgTGlzdFdyYXBwZXIucmVtb3ZlKHRoaXMuY29udGVudENoaWxkcmVuLCBjZCk7IH1cblxuICBhZGRWaWV3Q2hpbGQoY2Q6IENoYW5nZURldGVjdG9yKTogdm9pZCB7XG4gICAgdGhpcy52aWV3Q2hpbGRyZW4ucHVzaChjZCk7XG4gICAgY2QucGFyZW50ID0gdGhpcztcbiAgfVxuXG4gIHJlbW92ZVZpZXdDaGlsZChjZDogQ2hhbmdlRGV0ZWN0b3IpOiB2b2lkIHsgTGlzdFdyYXBwZXIucmVtb3ZlKHRoaXMudmlld0NoaWxkcmVuLCBjZCk7IH1cblxuICByZW1vdmUoKTogdm9pZCB7IHRoaXMucGFyZW50LnJlbW92ZUNvbnRlbnRDaGlsZCh0aGlzKTsgfVxuXG4gIGhhbmRsZUV2ZW50KGV2ZW50TmFtZTogc3RyaW5nLCBlbEluZGV4OiBudW1iZXIsIGV2ZW50OiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuaHlkcmF0ZWQoKSkge1xuICAgICAgdGhpcy50aHJvd0RlaHlkcmF0ZWRFcnJvcihgJHt0aGlzLmlkfSAtPiAke2V2ZW50TmFtZX1gKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIHZhciBsb2NhbHMgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgICAgbG9jYWxzLnNldCgnJGV2ZW50JywgZXZlbnQpO1xuICAgICAgdmFyIHJlcyA9ICF0aGlzLmhhbmRsZUV2ZW50SW50ZXJuYWwoZXZlbnROYW1lLCBlbEluZGV4LCBuZXcgTG9jYWxzKHRoaXMubG9jYWxzLCBsb2NhbHMpKTtcbiAgICAgIHRoaXMubWFya1BhdGhUb1Jvb3RBc0NoZWNrT25jZSgpO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB2YXIgYyA9IHRoaXMuZGlzcGF0Y2hlci5nZXREZWJ1Z0NvbnRleHQobnVsbCwgZWxJbmRleCwgbnVsbCk7XG4gICAgICB2YXIgY29udGV4dCA9IGlzUHJlc2VudChjKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgRXZlbnRFdmFsdWF0aW9uRXJyb3JDb250ZXh0KGMuZWxlbWVudCwgYy5jb21wb25lbnRFbGVtZW50LCBjLmNvbnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMubG9jYWxzLCBjLmluamVjdG9yKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICBudWxsO1xuICAgICAgdGhyb3cgbmV3IEV2ZW50RXZhbHVhdGlvbkVycm9yKGV2ZW50TmFtZSwgZSwgZS5zdGFjaywgY29udGV4dCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRXZlbnRJbnRlcm5hbChldmVudE5hbWU6IHN0cmluZywgZWxJbmRleDogbnVtYmVyLCBsb2NhbHM6IExvY2Fscyk6IGJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cblxuICBkZXRlY3RDaGFuZ2VzKCk6IHZvaWQgeyB0aGlzLnJ1bkRldGVjdENoYW5nZXMoZmFsc2UpOyB9XG5cbiAgY2hlY2tOb0NoYW5nZXMoKTogdm9pZCB7XG4gICAgaWYgKGFzc2VydGlvbnNFbmFibGVkKCkpIHtcbiAgICAgIHRoaXMucnVuRGV0ZWN0Q2hhbmdlcyh0cnVlKTtcbiAgICB9XG4gIH1cblxuICBydW5EZXRlY3RDaGFuZ2VzKHRocm93T25DaGFuZ2U6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tb2RlID09PSBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZXRhY2hlZCB8fFxuICAgICAgICB0aGlzLm1vZGUgPT09IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkNoZWNrZWQgfHwgdGhpcy5zdGF0ZSA9PT0gQ2hhbmdlRGV0ZWN0b3JTdGF0ZS5FcnJvcmVkKVxuICAgICAgcmV0dXJuO1xuICAgIHZhciBzID0gX3Njb3BlX2NoZWNrKHRoaXMuaWQsIHRocm93T25DaGFuZ2UpO1xuXG4gICAgdGhpcy5kZXRlY3RDaGFuZ2VzSW5SZWNvcmRzKHRocm93T25DaGFuZ2UpO1xuXG4gICAgdGhpcy5fZGV0ZWN0Q2hhbmdlc0NvbnRlbnRDaGlsZHJlbih0aHJvd09uQ2hhbmdlKTtcbiAgICBpZiAoIXRocm93T25DaGFuZ2UpIHRoaXMuYWZ0ZXJDb250ZW50TGlmZWN5Y2xlQ2FsbGJhY2tzKCk7XG5cbiAgICB0aGlzLl9kZXRlY3RDaGFuZ2VzSW5WaWV3Q2hpbGRyZW4odGhyb3dPbkNoYW5nZSk7XG4gICAgaWYgKCF0aHJvd09uQ2hhbmdlKSB0aGlzLmFmdGVyVmlld0xpZmVjeWNsZUNhbGxiYWNrcygpO1xuXG4gICAgaWYgKHRoaXMubW9kZSA9PT0gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuQ2hlY2tPbmNlKVxuICAgICAgdGhpcy5tb2RlID0gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuQ2hlY2tlZDtcblxuICAgIHRoaXMuc3RhdGUgPSBDaGFuZ2VEZXRlY3RvclN0YXRlLkNoZWNrZWRCZWZvcmU7XG4gICAgd3RmTGVhdmUocyk7XG4gIH1cblxuICAvLyBUaGlzIG1ldGhvZCBpcyBub3QgaW50ZW5kZWQgdG8gYmUgb3ZlcnJpZGRlbi4gU3ViY2xhc3NlcyBzaG91bGQgaW5zdGVhZCBwcm92aWRlIGFuXG4gIC8vIGltcGxlbWVudGF0aW9uIG9mIGBkZXRlY3RDaGFuZ2VzSW5SZWNvcmRzSW50ZXJuYWxgIHdoaWNoIGRvZXMgdGhlIHdvcmsgb2YgZGV0ZWN0aW5nIGNoYW5nZXNcbiAgLy8gYW5kIHdoaWNoIHRoaXMgbWV0aG9kIHdpbGwgY2FsbC5cbiAgLy8gVGhpcyBtZXRob2QgZXhwZWN0cyB0aGF0IGBkZXRlY3RDaGFuZ2VzSW5SZWNvcmRzSW50ZXJuYWxgIHdpbGwgc2V0IHRoZSBwcm9wZXJ0eVxuICAvLyBgdGhpcy5wcm9wZXJ0eUJpbmRpbmdJbmRleGAgdG8gdGhlIHByb3BlcnR5QmluZGluZ0luZGV4IG9mIHRoZSBmaXJzdCBwcm90byByZWNvcmQuIFRoaXMgaXMgdG9cbiAgLy8gZmFjaWxpdGF0ZSBlcnJvciByZXBvcnRpbmcuXG4gIGRldGVjdENoYW5nZXNJblJlY29yZHModGhyb3dPbkNoYW5nZTogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICghdGhpcy5oeWRyYXRlZCgpKSB7XG4gICAgICB0aGlzLnRocm93RGVoeWRyYXRlZEVycm9yKHRoaXMuaWQpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzSW5SZWNvcmRzSW50ZXJuYWwodGhyb3dPbkNoYW5nZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gdGhyb3dPbkNoYW5nZSBlcnJvcnMgYXJlbid0IGNvdW50ZWQgYXMgZmF0YWwgZXJyb3JzLlxuICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIEV4cHJlc3Npb25DaGFuZ2VkQWZ0ZXJJdEhhc0JlZW5DaGVja2VkRXhjZXB0aW9uKSkge1xuICAgICAgICB0aGlzLnN0YXRlID0gQ2hhbmdlRGV0ZWN0b3JTdGF0ZS5FcnJvcmVkO1xuICAgICAgfVxuICAgICAgdGhpcy5fdGhyb3dFcnJvcihlLCBlLnN0YWNrKTtcbiAgICB9XG4gIH1cblxuICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGFueSB3b3JrIG5lY2Vzc2FyeSB0byBkZXRlY3QgYW5kIHJlcG9ydFxuICAvLyBjaGFuZ2VzLiBGb3IgZXhhbXBsZSwgY2hhbmdlcyBzaG91bGQgYmUgcmVwb3J0ZWQgdmlhIGBDaGFuZ2VEZXRlY3Rpb25VdGlsLmFkZENoYW5nZWAsIGxpZmVjeWNsZVxuICAvLyBtZXRob2RzIHNob3VsZCBiZSBjYWxsZWQsIGV0Yy5cbiAgLy8gVGhpcyBpbXBsZW1lbnRhdGlvbiBzaG91bGQgYWxzbyBzZXQgYHRoaXMucHJvcGVydHlCaW5kaW5nSW5kZXhgIHRvIHRoZSBwcm9wZXJ0eUJpbmRpbmdJbmRleCBvZlxuICAvLyB0aGVcbiAgLy8gZmlyc3QgcHJvdG8gcmVjb3JkIHRvIGZhY2lsaXRhdGUgZXJyb3IgcmVwb3J0aW5nLiBTZWUge0BsaW5rICNkZXRlY3RDaGFuZ2VzSW5SZWNvcmRzfS5cbiAgZGV0ZWN0Q2hhbmdlc0luUmVjb3Jkc0ludGVybmFsKHRocm93T25DaGFuZ2U6IGJvb2xlYW4pOiB2b2lkIHt9XG5cbiAgLy8gVGhpcyBtZXRob2QgaXMgbm90IGludGVuZGVkIHRvIGJlIG92ZXJyaWRkZW4uIFN1YmNsYXNzZXMgc2hvdWxkIGluc3RlYWQgcHJvdmlkZSBhblxuICAvLyBpbXBsZW1lbnRhdGlvbiBvZiBgaHlkcmF0ZURpcmVjdGl2ZXNgLlxuICBoeWRyYXRlKGNvbnRleHQ6IFQsIGxvY2FsczogTG9jYWxzLCBkaXNwYXRjaGVyOiBDaGFuZ2VEaXNwYXRjaGVyLCBwaXBlczogUGlwZXMpOiB2b2lkIHtcbiAgICB0aGlzLmRpc3BhdGNoZXIgPSBkaXNwYXRjaGVyO1xuICAgIHRoaXMubW9kZSA9IENoYW5nZURldGVjdGlvblV0aWwuY2hhbmdlRGV0ZWN0aW9uTW9kZSh0aGlzLnN0cmF0ZWd5KTtcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuXG4gICAgdGhpcy5sb2NhbHMgPSBsb2NhbHM7XG4gICAgdGhpcy5waXBlcyA9IHBpcGVzO1xuICAgIHRoaXMuaHlkcmF0ZURpcmVjdGl2ZXMoZGlzcGF0Y2hlcik7XG4gICAgdGhpcy5zdGF0ZSA9IENoYW5nZURldGVjdG9yU3RhdGUuTmV2ZXJDaGVja2VkO1xuICB9XG5cbiAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gaHlkcmF0ZSBhbnkgZGlyZWN0aXZlcy5cbiAgaHlkcmF0ZURpcmVjdGl2ZXMoZGlzcGF0Y2hlcjogQ2hhbmdlRGlzcGF0Y2hlcik6IHZvaWQge31cblxuICAvLyBUaGlzIG1ldGhvZCBpcyBub3QgaW50ZW5kZWQgdG8gYmUgb3ZlcnJpZGRlbi4gU3ViY2xhc3NlcyBzaG91bGQgaW5zdGVhZCBwcm92aWRlIGFuXG4gIC8vIGltcGxlbWVudGF0aW9uIG9mIGBkZWh5ZHJhdGVEaXJlY3RpdmVzYC5cbiAgZGVoeWRyYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuZGVoeWRyYXRlRGlyZWN0aXZlcyh0cnVlKTtcblxuICAgIHRoaXMuX3Vuc3Vic2NyaWJlRnJvbU91dHB1dHMoKTtcblxuICAgIHRoaXMuZGlzcGF0Y2hlciA9IG51bGw7XG4gICAgdGhpcy5jb250ZXh0ID0gbnVsbDtcbiAgICB0aGlzLmxvY2FscyA9IG51bGw7XG4gICAgdGhpcy5waXBlcyA9IG51bGw7XG4gIH1cblxuICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBkZWh5ZHJhdGUgYW55IGRpcmVjdGl2ZXMuIFRoaXMgbWV0aG9kIHNob3VsZCByZXZlcnNlXG4gIC8vIGFueSB3b3JrIGRvbmUgaW4gYGh5ZHJhdGVEaXJlY3RpdmVzYC5cbiAgZGVoeWRyYXRlRGlyZWN0aXZlcyhkZXN0cm95UGlwZXM6IGJvb2xlYW4pOiB2b2lkIHt9XG5cbiAgaHlkcmF0ZWQoKTogYm9vbGVhbiB7IHJldHVybiBpc1ByZXNlbnQodGhpcy5jb250ZXh0KTsgfVxuXG4gIGRlc3Ryb3lSZWN1cnNpdmUoKTogdm9pZCB7XG4gICAgdGhpcy5kaXNwYXRjaGVyLm5vdGlmeU9uRGVzdHJveSgpO1xuICAgIHRoaXMuZGVoeWRyYXRlKCk7XG4gICAgdmFyIGNoaWxkcmVuID0gdGhpcy5jb250ZW50Q2hpbGRyZW47XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGRyZW5baV0uZGVzdHJveVJlY3Vyc2l2ZSgpO1xuICAgIH1cbiAgICBjaGlsZHJlbiA9IHRoaXMudmlld0NoaWxkcmVuO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkcmVuW2ldLmRlc3Ryb3lSZWN1cnNpdmUoKTtcbiAgICB9XG4gIH1cblxuICBhZnRlckNvbnRlbnRMaWZlY3ljbGVDYWxsYmFja3MoKTogdm9pZCB7XG4gICAgdGhpcy5kaXNwYXRjaGVyLm5vdGlmeUFmdGVyQ29udGVudENoZWNrZWQoKTtcbiAgICB0aGlzLmFmdGVyQ29udGVudExpZmVjeWNsZUNhbGxiYWNrc0ludGVybmFsKCk7XG4gIH1cblxuICBhZnRlckNvbnRlbnRMaWZlY3ljbGVDYWxsYmFja3NJbnRlcm5hbCgpOiB2b2lkIHt9XG5cbiAgYWZ0ZXJWaWV3TGlmZWN5Y2xlQ2FsbGJhY2tzKCk6IHZvaWQge1xuICAgIHRoaXMuZGlzcGF0Y2hlci5ub3RpZnlBZnRlclZpZXdDaGVja2VkKCk7XG4gICAgdGhpcy5hZnRlclZpZXdMaWZlY3ljbGVDYWxsYmFja3NJbnRlcm5hbCgpO1xuICB9XG5cbiAgYWZ0ZXJWaWV3TGlmZWN5Y2xlQ2FsbGJhY2tzSW50ZXJuYWwoKTogdm9pZCB7fVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2RldGVjdENoYW5nZXNDb250ZW50Q2hpbGRyZW4odGhyb3dPbkNoYW5nZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHZhciBjID0gdGhpcy5jb250ZW50Q2hpbGRyZW47XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjLmxlbmd0aDsgKytpKSB7XG4gICAgICBjW2ldLnJ1bkRldGVjdENoYW5nZXModGhyb3dPbkNoYW5nZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZGV0ZWN0Q2hhbmdlc0luVmlld0NoaWxkcmVuKHRocm93T25DaGFuZ2U6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB2YXIgYyA9IHRoaXMudmlld0NoaWxkcmVuO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYy5sZW5ndGg7ICsraSkge1xuICAgICAgY1tpXS5ydW5EZXRlY3RDaGFuZ2VzKHRocm93T25DaGFuZ2UpO1xuICAgIH1cbiAgfVxuXG4gIG1hcmtBc0NoZWNrT25jZSgpOiB2b2lkIHsgdGhpcy5tb2RlID0gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuQ2hlY2tPbmNlOyB9XG5cbiAgbWFya1BhdGhUb1Jvb3RBc0NoZWNrT25jZSgpOiB2b2lkIHtcbiAgICB2YXIgYzogQ2hhbmdlRGV0ZWN0b3IgPSB0aGlzO1xuICAgIHdoaWxlIChpc1ByZXNlbnQoYykgJiYgYy5tb2RlICE9PSBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZXRhY2hlZCkge1xuICAgICAgaWYgKGMubW9kZSA9PT0gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuQ2hlY2tlZCkgYy5tb2RlID0gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuQ2hlY2tPbmNlO1xuICAgICAgYyA9IGMucGFyZW50O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3Vuc3Vic2NyaWJlRnJvbU91dHB1dHMoKTogdm9pZCB7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLm91dHB1dFN1YnNjcmlwdGlvbnMpKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMub3V0cHV0U3Vic2NyaXB0aW9ucy5sZW5ndGg7ICsraSkge1xuICAgICAgICBPYnNlcnZhYmxlV3JhcHBlci5kaXNwb3NlKHRoaXMub3V0cHV0U3Vic2NyaXB0aW9uc1tpXSk7XG4gICAgICAgIHRoaXMub3V0cHV0U3Vic2NyaXB0aW9uc1tpXSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0RGlyZWN0aXZlRm9yKGRpcmVjdGl2ZXM6IGFueSwgaW5kZXg6IG51bWJlcik6IGFueSB7XG4gICAgcmV0dXJuIGRpcmVjdGl2ZXMuZ2V0RGlyZWN0aXZlRm9yKHRoaXMuZGlyZWN0aXZlSW5kaWNlc1tpbmRleF0pO1xuICB9XG5cbiAgZ2V0RGV0ZWN0b3JGb3IoZGlyZWN0aXZlczogYW55LCBpbmRleDogbnVtYmVyKTogQ2hhbmdlRGV0ZWN0b3Ige1xuICAgIHJldHVybiBkaXJlY3RpdmVzLmdldERldGVjdG9yRm9yKHRoaXMuZGlyZWN0aXZlSW5kaWNlc1tpbmRleF0pO1xuICB9XG5cbiAgbm90aWZ5RGlzcGF0Y2hlcih2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5kaXNwYXRjaGVyLm5vdGlmeU9uQmluZGluZyh0aGlzLl9jdXJyZW50QmluZGluZygpLCB2YWx1ZSk7XG4gIH1cblxuICBsb2dCaW5kaW5nVXBkYXRlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmRpc3BhdGNoZXIubG9nQmluZGluZ1VwZGF0ZSh0aGlzLl9jdXJyZW50QmluZGluZygpLCB2YWx1ZSk7XG4gIH1cblxuICBhZGRDaGFuZ2UoY2hhbmdlczoge1trZXk6IHN0cmluZ106IGFueX0sIG9sZFZhbHVlOiBhbnksIG5ld1ZhbHVlOiBhbnkpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgaWYgKGlzQmxhbmsoY2hhbmdlcykpIHtcbiAgICAgIGNoYW5nZXMgPSB7fTtcbiAgICB9XG4gICAgY2hhbmdlc1t0aGlzLl9jdXJyZW50QmluZGluZygpLm5hbWVdID0gQ2hhbmdlRGV0ZWN0aW9uVXRpbC5zaW1wbGVDaGFuZ2Uob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICByZXR1cm4gY2hhbmdlcztcbiAgfVxuXG4gIHByaXZhdGUgX3Rocm93RXJyb3IoZXhjZXB0aW9uOiBhbnksIHN0YWNrOiBhbnkpOiB2b2lkIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBjID0gdGhpcy5kaXNwYXRjaGVyLmdldERlYnVnQ29udGV4dChudWxsLCB0aGlzLl9jdXJyZW50QmluZGluZygpLmVsZW1lbnRJbmRleCwgbnVsbCk7XG4gICAgICB2YXIgY29udGV4dCA9IGlzUHJlc2VudChjKSA/IG5ldyBfQ29udGV4dChjLmVsZW1lbnQsIGMuY29tcG9uZW50RWxlbWVudCwgYy5jb250ZXh0LCBjLmxvY2FscyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMuaW5qZWN0b3IsIHRoaXMuX2N1cnJlbnRCaW5kaW5nKCkuZGVidWcpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbDtcbiAgICAgIGVycm9yID0gbmV3IENoYW5nZURldGVjdGlvbkVycm9yKHRoaXMuX2N1cnJlbnRCaW5kaW5nKCkuZGVidWcsIGV4Y2VwdGlvbiwgc3RhY2ssIGNvbnRleHQpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIGlmIGFuIGVycm9yIGhhcHBlbnMgZHVyaW5nIGdldHRpbmcgdGhlIGRlYnVnIGNvbnRleHQsIHdlIHRocm93IGEgQ2hhbmdlRGV0ZWN0aW9uRXJyb3JcbiAgICAgIC8vIHdpdGhvdXQgdGhlIGV4dHJhIGluZm9ybWF0aW9uLlxuICAgICAgZXJyb3IgPSBuZXcgQ2hhbmdlRGV0ZWN0aW9uRXJyb3IobnVsbCwgZXhjZXB0aW9uLCBzdGFjaywgbnVsbCk7XG4gICAgfVxuICAgIHRocm93IGVycm9yO1xuICB9XG5cbiAgdGhyb3dPbkNoYW5nZUVycm9yKG9sZFZhbHVlOiBhbnksIG5ld1ZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aHJvdyBuZXcgRXhwcmVzc2lvbkNoYW5nZWRBZnRlckl0SGFzQmVlbkNoZWNrZWRFeGNlcHRpb24odGhpcy5fY3VycmVudEJpbmRpbmcoKS5kZWJ1ZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWUsIG5ld1ZhbHVlLCBudWxsKTtcbiAgfVxuXG4gIHRocm93RGVoeWRyYXRlZEVycm9yKGRldGFpbDogc3RyaW5nKTogdm9pZCB7IHRocm93IG5ldyBEZWh5ZHJhdGVkRXhjZXB0aW9uKGRldGFpbCk7IH1cblxuICBwcml2YXRlIF9jdXJyZW50QmluZGluZygpOiBCaW5kaW5nVGFyZ2V0IHtcbiAgICByZXR1cm4gdGhpcy5iaW5kaW5nVGFyZ2V0c1t0aGlzLnByb3BlcnR5QmluZGluZ0luZGV4XTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
