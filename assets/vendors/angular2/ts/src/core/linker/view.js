System.register(['angular2/src/facade/collection', './element', 'angular2/src/facade/lang', 'angular2/src/facade/async', './view_ref', './view_type', './view_utils', 'angular2/src/core/change_detection/change_detection', '../profile/profile', './exceptions', './debug_context', './element_injector'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var collection_1, element_1, lang_1, async_1, view_ref_1, view_type_1, view_utils_1, change_detection_1, profile_1, exceptions_1, debug_context_1, element_injector_1;
    var EMPTY_CONTEXT, _scope_check, AppView;
    function _findLastRenderNode(node) {
        var lastNode;
        if (node instanceof element_1.AppElement) {
            var appEl = node;
            lastNode = appEl.nativeElement;
            if (lang_1.isPresent(appEl.nestedViews)) {
                // Note: Views might have no root nodes at all!
                for (var i = appEl.nestedViews.length - 1; i >= 0; i--) {
                    var nestedView = appEl.nestedViews[i];
                    if (nestedView.rootNodesOrAppElements.length > 0) {
                        lastNode = _findLastRenderNode(nestedView.rootNodesOrAppElements[nestedView.rootNodesOrAppElements.length - 1]);
                    }
                }
            }
        }
        else {
            lastNode = node;
        }
        return lastNode;
    }
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (element_1_1) {
                element_1 = element_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (view_ref_1_1) {
                view_ref_1 = view_ref_1_1;
            },
            function (view_type_1_1) {
                view_type_1 = view_type_1_1;
            },
            function (view_utils_1_1) {
                view_utils_1 = view_utils_1_1;
            },
            function (change_detection_1_1) {
                change_detection_1 = change_detection_1_1;
            },
            function (profile_1_1) {
                profile_1 = profile_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (debug_context_1_1) {
                debug_context_1 = debug_context_1_1;
            },
            function (element_injector_1_1) {
                element_injector_1 = element_injector_1_1;
            }],
        execute: function() {
            EMPTY_CONTEXT = lang_1.CONST_EXPR(new Object());
            _scope_check = profile_1.wtfCreateScope("AppView#check(ascii id)");
            /**
             * Cost of making objects: http://jsperf.com/instantiate-size-of-object
             *
             */
            AppView = (function () {
                function AppView(clazz, componentType, type, locals, viewUtils, parentInjector, declarationAppElement, cdMode, staticNodeDebugInfos) {
                    this.clazz = clazz;
                    this.componentType = componentType;
                    this.type = type;
                    this.locals = locals;
                    this.viewUtils = viewUtils;
                    this.parentInjector = parentInjector;
                    this.declarationAppElement = declarationAppElement;
                    this.cdMode = cdMode;
                    this.staticNodeDebugInfos = staticNodeDebugInfos;
                    this.contentChildren = [];
                    this.viewChildren = [];
                    this.viewContainerElement = null;
                    // The names of the below fields must be kept in sync with codegen_name_util.ts or
                    // change detection will fail.
                    this.cdState = change_detection_1.ChangeDetectorState.NeverChecked;
                    /**
                     * The context against which data-binding expressions in this view are evaluated against.
                     * This is always a component instance.
                     */
                    this.context = null;
                    this.destroyed = false;
                    this._currentDebugContext = null;
                    this.ref = new view_ref_1.ViewRef_(this);
                    if (type === view_type_1.ViewType.COMPONENT || type === view_type_1.ViewType.HOST) {
                        this.renderer = viewUtils.renderComponent(componentType);
                    }
                    else {
                        this.renderer = declarationAppElement.parentView.renderer;
                    }
                }
                AppView.prototype.create = function (givenProjectableNodes, rootSelectorOrNode) {
                    var context;
                    var projectableNodes;
                    switch (this.type) {
                        case view_type_1.ViewType.COMPONENT:
                            context = this.declarationAppElement.component;
                            projectableNodes = view_utils_1.ensureSlotCount(givenProjectableNodes, this.componentType.slotCount);
                            break;
                        case view_type_1.ViewType.EMBEDDED:
                            context = this.declarationAppElement.parentView.context;
                            projectableNodes = this.declarationAppElement.parentView.projectableNodes;
                            break;
                        case view_type_1.ViewType.HOST:
                            context = EMPTY_CONTEXT;
                            // Note: Don't ensure the slot count for the projectableNodes as we store
                            // them only for the contained component view (which will later check the slot count...)
                            projectableNodes = givenProjectableNodes;
                            break;
                    }
                    this._hasExternalHostElement = lang_1.isPresent(rootSelectorOrNode);
                    this.context = context;
                    this.projectableNodes = projectableNodes;
                    if (this.debugMode) {
                        this._resetDebug();
                        try {
                            return this.createInternal(rootSelectorOrNode);
                        }
                        catch (e) {
                            this._rethrowWithContext(e, e.stack);
                            throw e;
                        }
                    }
                    else {
                        return this.createInternal(rootSelectorOrNode);
                    }
                };
                /**
                 * Overwritten by implementations.
                 * Returns the AppElement for the host element for ViewType.HOST.
                 */
                AppView.prototype.createInternal = function (rootSelectorOrNode) { return null; };
                AppView.prototype.init = function (rootNodesOrAppElements, allNodes, disposables, subscriptions) {
                    this.rootNodesOrAppElements = rootNodesOrAppElements;
                    this.allNodes = allNodes;
                    this.disposables = disposables;
                    this.subscriptions = subscriptions;
                    if (this.type === view_type_1.ViewType.COMPONENT) {
                        // Note: the render nodes have been attached to their host element
                        // in the ViewFactory already.
                        this.declarationAppElement.parentView.viewChildren.push(this);
                        this.renderParent = this.declarationAppElement.parentView;
                        this.dirtyParentQueriesInternal();
                    }
                };
                AppView.prototype.selectOrCreateHostElement = function (elementName, rootSelectorOrNode, debugCtx) {
                    var hostElement;
                    if (lang_1.isPresent(rootSelectorOrNode)) {
                        hostElement = this.renderer.selectRootElement(rootSelectorOrNode, debugCtx);
                    }
                    else {
                        hostElement = this.renderer.createElement(null, elementName, debugCtx);
                    }
                    return hostElement;
                };
                AppView.prototype.injectorGet = function (token, nodeIndex, notFoundResult) {
                    if (this.debugMode) {
                        this._resetDebug();
                        try {
                            return this.injectorGetInternal(token, nodeIndex, notFoundResult);
                        }
                        catch (e) {
                            this._rethrowWithContext(e, e.stack);
                            throw e;
                        }
                    }
                    else {
                        return this.injectorGetInternal(token, nodeIndex, notFoundResult);
                    }
                };
                /**
                 * Overwritten by implementations
                 */
                AppView.prototype.injectorGetInternal = function (token, nodeIndex, notFoundResult) {
                    return notFoundResult;
                };
                AppView.prototype.injector = function (nodeIndex) {
                    if (lang_1.isPresent(nodeIndex)) {
                        return new element_injector_1.ElementInjector(this, nodeIndex);
                    }
                    else {
                        return this.parentInjector;
                    }
                };
                AppView.prototype.destroy = function () {
                    if (this._hasExternalHostElement) {
                        this.renderer.detachView(this.flatRootNodes);
                    }
                    else if (lang_1.isPresent(this.viewContainerElement)) {
                        this.viewContainerElement.detachView(this.viewContainerElement.nestedViews.indexOf(this));
                    }
                    this._destroyRecurse();
                };
                AppView.prototype._destroyRecurse = function () {
                    if (this.destroyed) {
                        return;
                    }
                    var children = this.contentChildren;
                    for (var i = 0; i < children.length; i++) {
                        children[i]._destroyRecurse();
                    }
                    children = this.viewChildren;
                    for (var i = 0; i < children.length; i++) {
                        children[i]._destroyRecurse();
                    }
                    if (this.debugMode) {
                        this._resetDebug();
                        try {
                            this._destroyLocal();
                        }
                        catch (e) {
                            this._rethrowWithContext(e, e.stack);
                            throw e;
                        }
                    }
                    else {
                        this._destroyLocal();
                    }
                    this.destroyed = true;
                };
                AppView.prototype._destroyLocal = function () {
                    var hostElement = this.type === view_type_1.ViewType.COMPONENT ? this.declarationAppElement.nativeElement : null;
                    for (var i = 0; i < this.disposables.length; i++) {
                        this.disposables[i]();
                    }
                    for (var i = 0; i < this.subscriptions.length; i++) {
                        async_1.ObservableWrapper.dispose(this.subscriptions[i]);
                    }
                    this.destroyInternal();
                    if (this._hasExternalHostElement) {
                        this.renderer.detachView(this.flatRootNodes);
                    }
                    else if (lang_1.isPresent(this.viewContainerElement)) {
                        this.viewContainerElement.detachView(this.viewContainerElement.nestedViews.indexOf(this));
                    }
                    else {
                        this.dirtyParentQueriesInternal();
                    }
                    this.renderer.destroyView(hostElement, this.allNodes);
                };
                /**
                 * Overwritten by implementations
                 */
                AppView.prototype.destroyInternal = function () { };
                Object.defineProperty(AppView.prototype, "debugMode", {
                    get: function () { return lang_1.isPresent(this.staticNodeDebugInfos); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AppView.prototype, "changeDetectorRef", {
                    get: function () { return this.ref; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AppView.prototype, "parent", {
                    get: function () {
                        return lang_1.isPresent(this.declarationAppElement) ? this.declarationAppElement.parentView : null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AppView.prototype, "flatRootNodes", {
                    get: function () { return view_utils_1.flattenNestedViewRenderNodes(this.rootNodesOrAppElements); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AppView.prototype, "lastRootNode", {
                    get: function () {
                        var lastNode = this.rootNodesOrAppElements.length > 0 ?
                            this.rootNodesOrAppElements[this.rootNodesOrAppElements.length - 1] :
                            null;
                        return _findLastRenderNode(lastNode);
                    },
                    enumerable: true,
                    configurable: true
                });
                AppView.prototype.hasLocal = function (contextName) {
                    return collection_1.StringMapWrapper.contains(this.locals, contextName);
                };
                AppView.prototype.setLocal = function (contextName, value) { this.locals[contextName] = value; };
                /**
                 * Overwritten by implementations
                 */
                AppView.prototype.dirtyParentQueriesInternal = function () { };
                AppView.prototype.addRenderContentChild = function (view) {
                    this.contentChildren.push(view);
                    view.renderParent = this;
                    view.dirtyParentQueriesInternal();
                };
                AppView.prototype.removeContentChild = function (view) {
                    collection_1.ListWrapper.remove(this.contentChildren, view);
                    view.dirtyParentQueriesInternal();
                    view.renderParent = null;
                };
                AppView.prototype.detectChanges = function (throwOnChange) {
                    var s = _scope_check(this.clazz);
                    if (this.cdMode === change_detection_1.ChangeDetectionStrategy.Detached ||
                        this.cdMode === change_detection_1.ChangeDetectionStrategy.Checked ||
                        this.cdState === change_detection_1.ChangeDetectorState.Errored)
                        return;
                    if (this.destroyed) {
                        this.throwDestroyedError('detectChanges');
                    }
                    if (this.debugMode) {
                        this._resetDebug();
                        try {
                            this.detectChangesInternal(throwOnChange);
                        }
                        catch (e) {
                            this._rethrowWithContext(e, e.stack);
                            throw e;
                        }
                    }
                    else {
                        this.detectChangesInternal(throwOnChange);
                    }
                    if (this.cdMode === change_detection_1.ChangeDetectionStrategy.CheckOnce)
                        this.cdMode = change_detection_1.ChangeDetectionStrategy.Checked;
                    this.cdState = change_detection_1.ChangeDetectorState.CheckedBefore;
                    profile_1.wtfLeave(s);
                };
                /**
                 * Overwritten by implementations
                 */
                AppView.prototype.detectChangesInternal = function (throwOnChange) {
                    this.detectContentChildrenChanges(throwOnChange);
                    this.detectViewChildrenChanges(throwOnChange);
                };
                AppView.prototype.detectContentChildrenChanges = function (throwOnChange) {
                    for (var i = 0; i < this.contentChildren.length; ++i) {
                        this.contentChildren[i].detectChanges(throwOnChange);
                    }
                };
                AppView.prototype.detectViewChildrenChanges = function (throwOnChange) {
                    for (var i = 0; i < this.viewChildren.length; ++i) {
                        this.viewChildren[i].detectChanges(throwOnChange);
                    }
                };
                AppView.prototype.addToContentChildren = function (renderAppElement) {
                    renderAppElement.parentView.contentChildren.push(this);
                    this.viewContainerElement = renderAppElement;
                    this.dirtyParentQueriesInternal();
                };
                AppView.prototype.removeFromContentChildren = function (renderAppElement) {
                    collection_1.ListWrapper.remove(renderAppElement.parentView.contentChildren, this);
                    this.dirtyParentQueriesInternal();
                    this.viewContainerElement = null;
                };
                AppView.prototype.markAsCheckOnce = function () { this.cdMode = change_detection_1.ChangeDetectionStrategy.CheckOnce; };
                AppView.prototype.markPathToRootAsCheckOnce = function () {
                    var c = this;
                    while (lang_1.isPresent(c) && c.cdMode !== change_detection_1.ChangeDetectionStrategy.Detached) {
                        if (c.cdMode === change_detection_1.ChangeDetectionStrategy.Checked) {
                            c.cdMode = change_detection_1.ChangeDetectionStrategy.CheckOnce;
                        }
                        c = c.renderParent;
                    }
                };
                AppView.prototype._resetDebug = function () { this._currentDebugContext = null; };
                AppView.prototype.debug = function (nodeIndex, rowNum, colNum) {
                    return this._currentDebugContext = new debug_context_1.DebugContext(this, nodeIndex, rowNum, colNum);
                };
                AppView.prototype._rethrowWithContext = function (e, stack) {
                    if (!(e instanceof exceptions_1.ViewWrappedException)) {
                        if (!(e instanceof exceptions_1.ExpressionChangedAfterItHasBeenCheckedException)) {
                            this.cdState = change_detection_1.ChangeDetectorState.Errored;
                        }
                        if (lang_1.isPresent(this._currentDebugContext)) {
                            throw new exceptions_1.ViewWrappedException(e, stack, this._currentDebugContext);
                        }
                    }
                };
                AppView.prototype.eventHandler = function (cb) {
                    var _this = this;
                    if (this.debugMode) {
                        return function (event) {
                            _this._resetDebug();
                            try {
                                return cb(event);
                            }
                            catch (e) {
                                _this._rethrowWithContext(e, e.stack);
                                throw e;
                            }
                        };
                    }
                    else {
                        return cb;
                    }
                };
                AppView.prototype.throwDestroyedError = function (details) { throw new exceptions_1.ViewDestroyedException(details); };
                return AppView;
            }());
            exports_1("AppView", AppView);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2xpbmtlci92aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFxRE0sYUFBYSxFQUVmLFlBQVk7SUFrV2hCLDZCQUE2QixJQUFTO1FBQ3BDLElBQUksUUFBUSxDQUFDO1FBQ2IsRUFBRSxDQUFDLENBQUMsSUFBSSxZQUFZLG9CQUFVLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksS0FBSyxHQUFlLElBQUksQ0FBQztZQUM3QixRQUFRLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQztZQUMvQixFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLCtDQUErQztnQkFDL0MsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDdkQsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNqRCxRQUFRLEdBQUcsbUJBQW1CLENBQzFCLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZGLENBQUM7Z0JBQ0gsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLENBQUM7UUFDRCxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ2xCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUF2WEssYUFB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LG1CQUFtQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Z0NBQ3JDLE1BQU0sQ0FBQyxDQUFDOzRCQUNWLENBQUM7d0JBQ0gsQ0FBQyxDQUFDO29CQUNKLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sTUFBTSxDQUFDLEVBQUUsQ0FBQztvQkFDWixDQUFDO2dCQUNILENBQUM7Z0JBRUQscUNBQW1CLEdBQW5CLFVBQW9CLE9BQWUsSUFBVSxNQUFNLElBQUksbUNBQXNCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzRixjQUFDO1lBQUQsQ0ExVkEsQUEwVkMsSUFBQTtZQTFWRCw2QkEwVkMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29yZS9saW5rZXIvdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIExpc3RXcmFwcGVyLFxuICBNYXBXcmFwcGVyLFxuICBNYXAsXG4gIFN0cmluZ01hcFdyYXBwZXIsXG4gIGlzTGlzdExpa2VJdGVyYWJsZSxcbiAgYXJlSXRlcmFibGVzRXF1YWxcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcblxuaW1wb3J0IHtJbmplY3Rvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtBcHBFbGVtZW50fSBmcm9tICcuL2VsZW1lbnQnO1xuaW1wb3J0IHtcbiAgYXNzZXJ0aW9uc0VuYWJsZWQsXG4gIGlzUHJlc2VudCxcbiAgaXNCbGFuayxcbiAgVHlwZSxcbiAgaXNBcnJheSxcbiAgaXNOdW1iZXIsXG4gIENPTlNULFxuICBDT05TVF9FWFBSLFxuICBzdHJpbmdpZnksXG4gIGlzUHJpbWl0aXZlLFxuICBpc1N0cmluZ1xufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG5pbXBvcnQge09ic2VydmFibGVXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jJztcbmltcG9ydCB7UmVuZGVyZXIsIFJvb3RSZW5kZXJlciwgUmVuZGVyQ29tcG9uZW50VHlwZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVuZGVyL2FwaSc7XG5pbXBvcnQge1ZpZXdSZWZffSBmcm9tICcuL3ZpZXdfcmVmJztcblxuaW1wb3J0IHtWaWV3VHlwZX0gZnJvbSAnLi92aWV3X3R5cGUnO1xuaW1wb3J0IHtcbiAgVmlld1V0aWxzLFxuICBmbGF0dGVuTmVzdGVkVmlld1JlbmRlck5vZGVzLFxuICBlbnN1cmVTbG90Q291bnQsXG4gIGFycmF5TG9vc2VJZGVudGljYWwsXG4gIG1hcExvb3NlSWRlbnRpY2FsXG59IGZyb20gJy4vdmlld191dGlscyc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yU3RhdGUsXG4gIGlzRGVmYXVsdENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBkZXZNb2RlRXF1YWxcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0aW9uJztcbmltcG9ydCB7d3RmQ3JlYXRlU2NvcGUsIHd0ZkxlYXZlLCBXdGZTY29wZUZufSBmcm9tICcuLi9wcm9maWxlL3Byb2ZpbGUnO1xuaW1wb3J0IHtcbiAgRXhwcmVzc2lvbkNoYW5nZWRBZnRlckl0SGFzQmVlbkNoZWNrZWRFeGNlcHRpb24sXG4gIFZpZXdEZXN0cm95ZWRFeGNlcHRpb24sXG4gIFZpZXdXcmFwcGVkRXhjZXB0aW9uXG59IGZyb20gJy4vZXhjZXB0aW9ucyc7XG5pbXBvcnQge1N0YXRpY05vZGVEZWJ1Z0luZm8sIERlYnVnQ29udGV4dH0gZnJvbSAnLi9kZWJ1Z19jb250ZXh0JztcbmltcG9ydCB7RWxlbWVudEluamVjdG9yfSBmcm9tICcuL2VsZW1lbnRfaW5qZWN0b3InO1xuXG5jb25zdCBFTVBUWV9DT05URVhUID0gQ09OU1RfRVhQUihuZXcgT2JqZWN0KCkpO1xuXG52YXIgX3Njb3BlX2NoZWNrOiBXdGZTY29wZUZuID0gd3RmQ3JlYXRlU2NvcGUoYEFwcFZpZXcjY2hlY2soYXNjaWkgaWQpYCk7XG5cbi8qKlxuICogQ29zdCBvZiBtYWtpbmcgb2JqZWN0czogaHR0cDovL2pzcGVyZi5jb20vaW5zdGFudGlhdGUtc2l6ZS1vZi1vYmplY3RcbiAqXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBcHBWaWV3PFQ+IHtcbiAgcmVmOiBWaWV3UmVmXztcbiAgcm9vdE5vZGVzT3JBcHBFbGVtZW50czogYW55W107XG4gIGFsbE5vZGVzOiBhbnlbXTtcbiAgZGlzcG9zYWJsZXM6IEZ1bmN0aW9uW107XG4gIHN1YnNjcmlwdGlvbnM6IGFueVtdO1xuICBjb250ZW50Q2hpbGRyZW46IEFwcFZpZXc8YW55PltdID0gW107XG4gIHZpZXdDaGlsZHJlbjogQXBwVmlldzxhbnk+W10gPSBbXTtcbiAgcmVuZGVyUGFyZW50OiBBcHBWaWV3PGFueT47XG4gIHZpZXdDb250YWluZXJFbGVtZW50OiBBcHBFbGVtZW50ID0gbnVsbDtcblxuICAvLyBUaGUgbmFtZXMgb2YgdGhlIGJlbG93IGZpZWxkcyBtdXN0IGJlIGtlcHQgaW4gc3luYyB3aXRoIGNvZGVnZW5fbmFtZV91dGlsLnRzIG9yXG4gIC8vIGNoYW5nZSBkZXRlY3Rpb24gd2lsbCBmYWlsLlxuICBjZFN0YXRlOiBDaGFuZ2VEZXRlY3RvclN0YXRlID0gQ2hhbmdlRGV0ZWN0b3JTdGF0ZS5OZXZlckNoZWNrZWQ7XG5cbiAgLyoqXG4gICAqIFRoZSBjb250ZXh0IGFnYWluc3Qgd2hpY2ggZGF0YS1iaW5kaW5nIGV4cHJlc3Npb25zIGluIHRoaXMgdmlldyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXG4gICAqIFRoaXMgaXMgYWx3YXlzIGEgY29tcG9uZW50IGluc3RhbmNlLlxuICAgKi9cbiAgY29udGV4dDogVCA9IG51bGw7XG5cbiAgcHJvamVjdGFibGVOb2RlczogQXJyYXk8YW55IHwgYW55W10+O1xuXG4gIGRlc3Ryb3llZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHJlbmRlcmVyOiBSZW5kZXJlcjtcblxuICBwcml2YXRlIF9jdXJyZW50RGVidWdDb250ZXh0OiBEZWJ1Z0NvbnRleHQgPSBudWxsO1xuXG4gIHByaXZhdGUgX2hhc0V4dGVybmFsSG9zdEVsZW1lbnQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocHVibGljIGNsYXp6OiBhbnksIHB1YmxpYyBjb21wb25lbnRUeXBlOiBSZW5kZXJDb21wb25lbnRUeXBlLCBwdWJsaWMgdHlwZTogVmlld1R5cGUsXG4gICAgICAgICAgICAgIHB1YmxpYyBsb2NhbHM6IHtba2V5OiBzdHJpbmddOiBhbnl9LCBwdWJsaWMgdmlld1V0aWxzOiBWaWV3VXRpbHMsXG4gICAgICAgICAgICAgIHB1YmxpYyBwYXJlbnRJbmplY3RvcjogSW5qZWN0b3IsIHB1YmxpYyBkZWNsYXJhdGlvbkFwcEVsZW1lbnQ6IEFwcEVsZW1lbnQsXG4gICAgICAgICAgICAgIHB1YmxpYyBjZE1vZGU6IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgICAgICAgICAgICBwdWJsaWMgc3RhdGljTm9kZURlYnVnSW5mb3M6IFN0YXRpY05vZGVEZWJ1Z0luZm9bXSkge1xuICAgIHRoaXMucmVmID0gbmV3IFZpZXdSZWZfKHRoaXMpO1xuICAgIGlmICh0eXBlID09PSBWaWV3VHlwZS5DT01QT05FTlQgfHwgdHlwZSA9PT0gVmlld1R5cGUuSE9TVCkge1xuICAgICAgdGhpcy5yZW5kZXJlciA9IHZpZXdVdGlscy5yZW5kZXJDb21wb25lbnQoY29tcG9uZW50VHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVuZGVyZXIgPSBkZWNsYXJhdGlvbkFwcEVsZW1lbnQucGFyZW50Vmlldy5yZW5kZXJlcjtcbiAgICB9XG4gIH1cblxuICBjcmVhdGUoZ2l2ZW5Qcm9qZWN0YWJsZU5vZGVzOiBBcnJheTxhbnkgfCBhbnlbXT4sIHJvb3RTZWxlY3Rvck9yTm9kZTogc3RyaW5nIHwgYW55KTogQXBwRWxlbWVudCB7XG4gICAgdmFyIGNvbnRleHQ7XG4gICAgdmFyIHByb2plY3RhYmxlTm9kZXM7XG4gICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgIGNhc2UgVmlld1R5cGUuQ09NUE9ORU5UOlxuICAgICAgICBjb250ZXh0ID0gdGhpcy5kZWNsYXJhdGlvbkFwcEVsZW1lbnQuY29tcG9uZW50O1xuICAgICAgICBwcm9qZWN0YWJsZU5vZGVzID0gZW5zdXJlU2xvdENvdW50KGdpdmVuUHJvamVjdGFibGVOb2RlcywgdGhpcy5jb21wb25lbnRUeXBlLnNsb3RDb3VudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBWaWV3VHlwZS5FTUJFRERFRDpcbiAgICAgICAgY29udGV4dCA9IHRoaXMuZGVjbGFyYXRpb25BcHBFbGVtZW50LnBhcmVudFZpZXcuY29udGV4dDtcbiAgICAgICAgcHJvamVjdGFibGVOb2RlcyA9IHRoaXMuZGVjbGFyYXRpb25BcHBFbGVtZW50LnBhcmVudFZpZXcucHJvamVjdGFibGVOb2RlcztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFZpZXdUeXBlLkhPU1Q6XG4gICAgICAgIGNvbnRleHQgPSBFTVBUWV9DT05URVhUO1xuICAgICAgICAvLyBOb3RlOiBEb24ndCBlbnN1cmUgdGhlIHNsb3QgY291bnQgZm9yIHRoZSBwcm9qZWN0YWJsZU5vZGVzIGFzIHdlIHN0b3JlXG4gICAgICAgIC8vIHRoZW0gb25seSBmb3IgdGhlIGNvbnRhaW5lZCBjb21wb25lbnQgdmlldyAod2hpY2ggd2lsbCBsYXRlciBjaGVjayB0aGUgc2xvdCBjb3VudC4uLilcbiAgICAgICAgcHJvamVjdGFibGVOb2RlcyA9IGdpdmVuUHJvamVjdGFibGVOb2RlcztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuX2hhc0V4dGVybmFsSG9zdEVsZW1lbnQgPSBpc1ByZXNlbnQocm9vdFNlbGVjdG9yT3JOb2RlKTtcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMucHJvamVjdGFibGVOb2RlcyA9IHByb2plY3RhYmxlTm9kZXM7XG4gICAgaWYgKHRoaXMuZGVidWdNb2RlKSB7XG4gICAgICB0aGlzLl9yZXNldERlYnVnKCk7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVJbnRlcm5hbChyb290U2VsZWN0b3JPck5vZGUpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLl9yZXRocm93V2l0aENvbnRleHQoZSwgZS5zdGFjayk7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUludGVybmFsKHJvb3RTZWxlY3Rvck9yTm9kZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJ3cml0dGVuIGJ5IGltcGxlbWVudGF0aW9ucy5cbiAgICogUmV0dXJucyB0aGUgQXBwRWxlbWVudCBmb3IgdGhlIGhvc3QgZWxlbWVudCBmb3IgVmlld1R5cGUuSE9TVC5cbiAgICovXG4gIGNyZWF0ZUludGVybmFsKHJvb3RTZWxlY3Rvck9yTm9kZTogc3RyaW5nIHwgYW55KTogQXBwRWxlbWVudCB7IHJldHVybiBudWxsOyB9XG5cbiAgaW5pdChyb290Tm9kZXNPckFwcEVsZW1lbnRzOiBhbnlbXSwgYWxsTm9kZXM6IGFueVtdLCBkaXNwb3NhYmxlczogRnVuY3Rpb25bXSxcbiAgICAgICBzdWJzY3JpcHRpb25zOiBhbnlbXSkge1xuICAgIHRoaXMucm9vdE5vZGVzT3JBcHBFbGVtZW50cyA9IHJvb3ROb2Rlc09yQXBwRWxlbWVudHM7XG4gICAgdGhpcy5hbGxOb2RlcyA9IGFsbE5vZGVzO1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBkaXNwb3NhYmxlcztcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBzdWJzY3JpcHRpb25zO1xuICAgIGlmICh0aGlzLnR5cGUgPT09IFZpZXdUeXBlLkNPTVBPTkVOVCkge1xuICAgICAgLy8gTm90ZTogdGhlIHJlbmRlciBub2RlcyBoYXZlIGJlZW4gYXR0YWNoZWQgdG8gdGhlaXIgaG9zdCBlbGVtZW50XG4gICAgICAvLyBpbiB0aGUgVmlld0ZhY3RvcnkgYWxyZWFkeS5cbiAgICAgIHRoaXMuZGVjbGFyYXRpb25BcHBFbGVtZW50LnBhcmVudFZpZXcudmlld0NoaWxkcmVuLnB1c2godGhpcyk7XG4gICAgICB0aGlzLnJlbmRlclBhcmVudCA9IHRoaXMuZGVjbGFyYXRpb25BcHBFbGVtZW50LnBhcmVudFZpZXc7XG4gICAgICB0aGlzLmRpcnR5UGFyZW50UXVlcmllc0ludGVybmFsKCk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0T3JDcmVhdGVIb3N0RWxlbWVudChlbGVtZW50TmFtZTogc3RyaW5nLCByb290U2VsZWN0b3JPck5vZGU6IHN0cmluZyB8IGFueSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z0N0eDogRGVidWdDb250ZXh0KTogYW55IHtcbiAgICB2YXIgaG9zdEVsZW1lbnQ7XG4gICAgaWYgKGlzUHJlc2VudChyb290U2VsZWN0b3JPck5vZGUpKSB7XG4gICAgICBob3N0RWxlbWVudCA9IHRoaXMucmVuZGVyZXIuc2VsZWN0Um9vdEVsZW1lbnQocm9vdFNlbGVjdG9yT3JOb2RlLCBkZWJ1Z0N0eCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhvc3RFbGVtZW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KG51bGwsIGVsZW1lbnROYW1lLCBkZWJ1Z0N0eCk7XG4gICAgfVxuICAgIHJldHVybiBob3N0RWxlbWVudDtcbiAgfVxuXG4gIGluamVjdG9yR2V0KHRva2VuOiBhbnksIG5vZGVJbmRleDogbnVtYmVyLCBub3RGb3VuZFJlc3VsdDogYW55KTogYW55IHtcbiAgICBpZiAodGhpcy5kZWJ1Z01vZGUpIHtcbiAgICAgIHRoaXMuX3Jlc2V0RGVidWcoKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiB0aGlzLmluamVjdG9yR2V0SW50ZXJuYWwodG9rZW4sIG5vZGVJbmRleCwgbm90Rm91bmRSZXN1bHQpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLl9yZXRocm93V2l0aENvbnRleHQoZSwgZS5zdGFjayk7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmluamVjdG9yR2V0SW50ZXJuYWwodG9rZW4sIG5vZGVJbmRleCwgbm90Rm91bmRSZXN1bHQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVyd3JpdHRlbiBieSBpbXBsZW1lbnRhdGlvbnNcbiAgICovXG4gIGluamVjdG9yR2V0SW50ZXJuYWwodG9rZW46IGFueSwgbm9kZUluZGV4OiBudW1iZXIsIG5vdEZvdW5kUmVzdWx0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBub3RGb3VuZFJlc3VsdDtcbiAgfVxuXG4gIGluamVjdG9yKG5vZGVJbmRleDogbnVtYmVyKTogSW5qZWN0b3Ige1xuICAgIGlmIChpc1ByZXNlbnQobm9kZUluZGV4KSkge1xuICAgICAgcmV0dXJuIG5ldyBFbGVtZW50SW5qZWN0b3IodGhpcywgbm9kZUluZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50SW5qZWN0b3I7XG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5faGFzRXh0ZXJuYWxIb3N0RWxlbWVudCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5kZXRhY2hWaWV3KHRoaXMuZmxhdFJvb3ROb2Rlcyk7XG4gICAgfSBlbHNlIGlmIChpc1ByZXNlbnQodGhpcy52aWV3Q29udGFpbmVyRWxlbWVudCkpIHtcbiAgICAgIHRoaXMudmlld0NvbnRhaW5lckVsZW1lbnQuZGV0YWNoVmlldyh0aGlzLnZpZXdDb250YWluZXJFbGVtZW50Lm5lc3RlZFZpZXdzLmluZGV4T2YodGhpcykpO1xuICAgIH1cbiAgICB0aGlzLl9kZXN0cm95UmVjdXJzZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGVzdHJveVJlY3Vyc2UoKSB7XG4gICAgaWYgKHRoaXMuZGVzdHJveWVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuY29udGVudENoaWxkcmVuO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkcmVuW2ldLl9kZXN0cm95UmVjdXJzZSgpO1xuICAgIH1cbiAgICBjaGlsZHJlbiA9IHRoaXMudmlld0NoaWxkcmVuO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkcmVuW2ldLl9kZXN0cm95UmVjdXJzZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5kZWJ1Z01vZGUpIHtcbiAgICAgIHRoaXMuX3Jlc2V0RGVidWcoKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lMb2NhbCgpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLl9yZXRocm93V2l0aENvbnRleHQoZSwgZS5zdGFjayk7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2Rlc3Ryb3lMb2NhbCgpO1xuICAgIH1cblxuICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rlc3Ryb3lMb2NhbCgpIHtcbiAgICB2YXIgaG9zdEVsZW1lbnQgPVxuICAgICAgICB0aGlzLnR5cGUgPT09IFZpZXdUeXBlLkNPTVBPTkVOVCA/IHRoaXMuZGVjbGFyYXRpb25BcHBFbGVtZW50Lm5hdGl2ZUVsZW1lbnQgOiBudWxsO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5kaXNwb3NhYmxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5kaXNwb3NhYmxlc1tpXSgpO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc3Vic2NyaXB0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgT2JzZXJ2YWJsZVdyYXBwZXIuZGlzcG9zZSh0aGlzLnN1YnNjcmlwdGlvbnNbaV0pO1xuICAgIH1cbiAgICB0aGlzLmRlc3Ryb3lJbnRlcm5hbCgpO1xuICAgIGlmICh0aGlzLl9oYXNFeHRlcm5hbEhvc3RFbGVtZW50KSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmRldGFjaFZpZXcodGhpcy5mbGF0Um9vdE5vZGVzKTtcbiAgICB9IGVsc2UgaWYgKGlzUHJlc2VudCh0aGlzLnZpZXdDb250YWluZXJFbGVtZW50KSkge1xuICAgICAgdGhpcy52aWV3Q29udGFpbmVyRWxlbWVudC5kZXRhY2hWaWV3KHRoaXMudmlld0NvbnRhaW5lckVsZW1lbnQubmVzdGVkVmlld3MuaW5kZXhPZih0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGlydHlQYXJlbnRRdWVyaWVzSW50ZXJuYWwoKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5kZXN0cm95Vmlldyhob3N0RWxlbWVudCwgdGhpcy5hbGxOb2Rlcyk7XG4gIH1cblxuICAvKipcbiAgICogT3ZlcndyaXR0ZW4gYnkgaW1wbGVtZW50YXRpb25zXG4gICAqL1xuICBkZXN0cm95SW50ZXJuYWwoKTogdm9pZCB7fVxuXG4gIGdldCBkZWJ1Z01vZGUoKTogYm9vbGVhbiB7IHJldHVybiBpc1ByZXNlbnQodGhpcy5zdGF0aWNOb2RlRGVidWdJbmZvcyk7IH1cblxuICBnZXQgY2hhbmdlRGV0ZWN0b3JSZWYoKTogQ2hhbmdlRGV0ZWN0b3JSZWYgeyByZXR1cm4gdGhpcy5yZWY7IH1cblxuICBnZXQgcGFyZW50KCk6IEFwcFZpZXc8YW55PiB7XG4gICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmRlY2xhcmF0aW9uQXBwRWxlbWVudCkgPyB0aGlzLmRlY2xhcmF0aW9uQXBwRWxlbWVudC5wYXJlbnRWaWV3IDogbnVsbDtcbiAgfVxuXG4gIGdldCBmbGF0Um9vdE5vZGVzKCk6IGFueVtdIHsgcmV0dXJuIGZsYXR0ZW5OZXN0ZWRWaWV3UmVuZGVyTm9kZXModGhpcy5yb290Tm9kZXNPckFwcEVsZW1lbnRzKTsgfVxuXG4gIGdldCBsYXN0Um9vdE5vZGUoKTogYW55IHtcbiAgICB2YXIgbGFzdE5vZGUgPSB0aGlzLnJvb3ROb2Rlc09yQXBwRWxlbWVudHMubGVuZ3RoID4gMCA/XG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9vdE5vZGVzT3JBcHBFbGVtZW50c1t0aGlzLnJvb3ROb2Rlc09yQXBwRWxlbWVudHMubGVuZ3RoIC0gMV0gOlxuICAgICAgICAgICAgICAgICAgICAgICBudWxsO1xuICAgIHJldHVybiBfZmluZExhc3RSZW5kZXJOb2RlKGxhc3ROb2RlKTtcbiAgfVxuXG4gIGhhc0xvY2FsKGNvbnRleHROYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gU3RyaW5nTWFwV3JhcHBlci5jb250YWlucyh0aGlzLmxvY2FscywgY29udGV4dE5hbWUpO1xuICB9XG5cbiAgc2V0TG9jYWwoY29udGV4dE5hbWU6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQgeyB0aGlzLmxvY2Fsc1tjb250ZXh0TmFtZV0gPSB2YWx1ZTsgfVxuXG4gIC8qKlxuICAgKiBPdmVyd3JpdHRlbiBieSBpbXBsZW1lbnRhdGlvbnNcbiAgICovXG4gIGRpcnR5UGFyZW50UXVlcmllc0ludGVybmFsKCk6IHZvaWQge31cblxuICBhZGRSZW5kZXJDb250ZW50Q2hpbGQodmlldzogQXBwVmlldzxhbnk+KTogdm9pZCB7XG4gICAgdGhpcy5jb250ZW50Q2hpbGRyZW4ucHVzaCh2aWV3KTtcbiAgICB2aWV3LnJlbmRlclBhcmVudCA9IHRoaXM7XG4gICAgdmlldy5kaXJ0eVBhcmVudFF1ZXJpZXNJbnRlcm5hbCgpO1xuICB9XG5cbiAgcmVtb3ZlQ29udGVudENoaWxkKHZpZXc6IEFwcFZpZXc8YW55Pik6IHZvaWQge1xuICAgIExpc3RXcmFwcGVyLnJlbW92ZSh0aGlzLmNvbnRlbnRDaGlsZHJlbiwgdmlldyk7XG4gICAgdmlldy5kaXJ0eVBhcmVudFF1ZXJpZXNJbnRlcm5hbCgpO1xuICAgIHZpZXcucmVuZGVyUGFyZW50ID0gbnVsbDtcbiAgfVxuXG4gIGRldGVjdENoYW5nZXModGhyb3dPbkNoYW5nZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHZhciBzID0gX3Njb3BlX2NoZWNrKHRoaXMuY2xhenopO1xuICAgIGlmICh0aGlzLmNkTW9kZSA9PT0gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGV0YWNoZWQgfHxcbiAgICAgICAgdGhpcy5jZE1vZGUgPT09IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkNoZWNrZWQgfHxcbiAgICAgICAgdGhpcy5jZFN0YXRlID09PSBDaGFuZ2VEZXRlY3RvclN0YXRlLkVycm9yZWQpXG4gICAgICByZXR1cm47XG4gICAgaWYgKHRoaXMuZGVzdHJveWVkKSB7XG4gICAgICB0aGlzLnRocm93RGVzdHJveWVkRXJyb3IoJ2RldGVjdENoYW5nZXMnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGVidWdNb2RlKSB7XG4gICAgICB0aGlzLl9yZXNldERlYnVnKCk7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLmRldGVjdENoYW5nZXNJbnRlcm5hbCh0aHJvd09uQ2hhbmdlKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhpcy5fcmV0aHJvd1dpdGhDb250ZXh0KGUsIGUuc3RhY2spO1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRldGVjdENoYW5nZXNJbnRlcm5hbCh0aHJvd09uQ2hhbmdlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY2RNb2RlID09PSBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5DaGVja09uY2UpXG4gICAgICB0aGlzLmNkTW9kZSA9IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkNoZWNrZWQ7XG5cbiAgICB0aGlzLmNkU3RhdGUgPSBDaGFuZ2VEZXRlY3RvclN0YXRlLkNoZWNrZWRCZWZvcmU7XG4gICAgd3RmTGVhdmUocyk7XG4gIH1cblxuICAvKipcbiAgICogT3ZlcndyaXR0ZW4gYnkgaW1wbGVtZW50YXRpb25zXG4gICAqL1xuICBkZXRlY3RDaGFuZ2VzSW50ZXJuYWwodGhyb3dPbkNoYW5nZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGV0ZWN0Q29udGVudENoaWxkcmVuQ2hhbmdlcyh0aHJvd09uQ2hhbmdlKTtcbiAgICB0aGlzLmRldGVjdFZpZXdDaGlsZHJlbkNoYW5nZXModGhyb3dPbkNoYW5nZSk7XG4gIH1cblxuICBkZXRlY3RDb250ZW50Q2hpbGRyZW5DaGFuZ2VzKHRocm93T25DaGFuZ2U6IGJvb2xlYW4pIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY29udGVudENoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICB0aGlzLmNvbnRlbnRDaGlsZHJlbltpXS5kZXRlY3RDaGFuZ2VzKHRocm93T25DaGFuZ2UpO1xuICAgIH1cbiAgfVxuXG4gIGRldGVjdFZpZXdDaGlsZHJlbkNoYW5nZXModGhyb3dPbkNoYW5nZTogYm9vbGVhbikge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy52aWV3Q2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgIHRoaXMudmlld0NoaWxkcmVuW2ldLmRldGVjdENoYW5nZXModGhyb3dPbkNoYW5nZSk7XG4gICAgfVxuICB9XG5cbiAgYWRkVG9Db250ZW50Q2hpbGRyZW4ocmVuZGVyQXBwRWxlbWVudDogQXBwRWxlbWVudCk6IHZvaWQge1xuICAgIHJlbmRlckFwcEVsZW1lbnQucGFyZW50Vmlldy5jb250ZW50Q2hpbGRyZW4ucHVzaCh0aGlzKTtcbiAgICB0aGlzLnZpZXdDb250YWluZXJFbGVtZW50ID0gcmVuZGVyQXBwRWxlbWVudDtcbiAgICB0aGlzLmRpcnR5UGFyZW50UXVlcmllc0ludGVybmFsKCk7XG4gIH1cblxuICByZW1vdmVGcm9tQ29udGVudENoaWxkcmVuKHJlbmRlckFwcEVsZW1lbnQ6IEFwcEVsZW1lbnQpOiB2b2lkIHtcbiAgICBMaXN0V3JhcHBlci5yZW1vdmUocmVuZGVyQXBwRWxlbWVudC5wYXJlbnRWaWV3LmNvbnRlbnRDaGlsZHJlbiwgdGhpcyk7XG4gICAgdGhpcy5kaXJ0eVBhcmVudFF1ZXJpZXNJbnRlcm5hbCgpO1xuICAgIHRoaXMudmlld0NvbnRhaW5lckVsZW1lbnQgPSBudWxsO1xuICB9XG5cbiAgbWFya0FzQ2hlY2tPbmNlKCk6IHZvaWQgeyB0aGlzLmNkTW9kZSA9IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkNoZWNrT25jZTsgfVxuXG4gIG1hcmtQYXRoVG9Sb290QXNDaGVja09uY2UoKTogdm9pZCB7XG4gICAgdmFyIGM6IEFwcFZpZXc8YW55PiA9IHRoaXM7XG4gICAgd2hpbGUgKGlzUHJlc2VudChjKSAmJiBjLmNkTW9kZSAhPT0gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGV0YWNoZWQpIHtcbiAgICAgIGlmIChjLmNkTW9kZSA9PT0gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuQ2hlY2tlZCkge1xuICAgICAgICBjLmNkTW9kZSA9IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkNoZWNrT25jZTtcbiAgICAgIH1cbiAgICAgIGMgPSBjLnJlbmRlclBhcmVudDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZXNldERlYnVnKCkgeyB0aGlzLl9jdXJyZW50RGVidWdDb250ZXh0ID0gbnVsbDsgfVxuXG4gIGRlYnVnKG5vZGVJbmRleDogbnVtYmVyLCByb3dOdW06IG51bWJlciwgY29sTnVtOiBudW1iZXIpOiBEZWJ1Z0NvbnRleHQge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50RGVidWdDb250ZXh0ID0gbmV3IERlYnVnQ29udGV4dCh0aGlzLCBub2RlSW5kZXgsIHJvd051bSwgY29sTnVtKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JldGhyb3dXaXRoQ29udGV4dChlOiBhbnksIHN0YWNrOiBhbnkpIHtcbiAgICBpZiAoIShlIGluc3RhbmNlb2YgVmlld1dyYXBwZWRFeGNlcHRpb24pKSB7XG4gICAgICBpZiAoIShlIGluc3RhbmNlb2YgRXhwcmVzc2lvbkNoYW5nZWRBZnRlckl0SGFzQmVlbkNoZWNrZWRFeGNlcHRpb24pKSB7XG4gICAgICAgIHRoaXMuY2RTdGF0ZSA9IENoYW5nZURldGVjdG9yU3RhdGUuRXJyb3JlZDtcbiAgICAgIH1cbiAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5fY3VycmVudERlYnVnQ29udGV4dCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFZpZXdXcmFwcGVkRXhjZXB0aW9uKGUsIHN0YWNrLCB0aGlzLl9jdXJyZW50RGVidWdDb250ZXh0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBldmVudEhhbmRsZXIoY2I6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIGlmICh0aGlzLmRlYnVnTW9kZSkge1xuICAgICAgcmV0dXJuIChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLl9yZXNldERlYnVnKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGNiKGV2ZW50KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHRoaXMuX3JldGhyb3dXaXRoQ29udGV4dChlLCBlLnN0YWNrKTtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY2I7XG4gICAgfVxuICB9XG5cbiAgdGhyb3dEZXN0cm95ZWRFcnJvcihkZXRhaWxzOiBzdHJpbmcpOiB2b2lkIHsgdGhyb3cgbmV3IFZpZXdEZXN0cm95ZWRFeGNlcHRpb24oZGV0YWlscyk7IH1cbn1cblxuZnVuY3Rpb24gX2ZpbmRMYXN0UmVuZGVyTm9kZShub2RlOiBhbnkpOiBhbnkge1xuICB2YXIgbGFzdE5vZGU7XG4gIGlmIChub2RlIGluc3RhbmNlb2YgQXBwRWxlbWVudCkge1xuICAgIHZhciBhcHBFbCA9IDxBcHBFbGVtZW50Pm5vZGU7XG4gICAgbGFzdE5vZGUgPSBhcHBFbC5uYXRpdmVFbGVtZW50O1xuICAgIGlmIChpc1ByZXNlbnQoYXBwRWwubmVzdGVkVmlld3MpKSB7XG4gICAgICAvLyBOb3RlOiBWaWV3cyBtaWdodCBoYXZlIG5vIHJvb3Qgbm9kZXMgYXQgYWxsIVxuICAgICAgZm9yICh2YXIgaSA9IGFwcEVsLm5lc3RlZFZpZXdzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIHZhciBuZXN0ZWRWaWV3ID0gYXBwRWwubmVzdGVkVmlld3NbaV07XG4gICAgICAgIGlmIChuZXN0ZWRWaWV3LnJvb3ROb2Rlc09yQXBwRWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGxhc3ROb2RlID0gX2ZpbmRMYXN0UmVuZGVyTm9kZShcbiAgICAgICAgICAgICAgbmVzdGVkVmlldy5yb290Tm9kZXNPckFwcEVsZW1lbnRzW25lc3RlZFZpZXcucm9vdE5vZGVzT3JBcHBFbGVtZW50cy5sZW5ndGggLSAxXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbGFzdE5vZGUgPSBub2RlO1xuICB9XG4gIHJldHVybiBsYXN0Tm9kZTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
