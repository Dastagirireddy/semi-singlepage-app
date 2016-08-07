System.register(['angular2/src/core/di', 'angular2/src/facade/lang', 'angular2/src/facade/collection', 'angular2/src/facade/exceptions', './view', 'angular2/src/core/render/api', '../profile/profile', 'angular2/src/core/application_tokens', './view_type'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var di_1, lang_1, collection_1, exceptions_1, view_1, api_1, profile_1, application_tokens_1, view_type_1;
    var AppViewManager, AppViewManager_;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (view_1_1) {
                view_1 = view_1_1;
            },
            function (api_1_1) {
                api_1 = api_1_1;
            },
            function (profile_1_1) {
                profile_1 = profile_1_1;
            },
            function (application_tokens_1_1) {
                application_tokens_1 = application_tokens_1_1;
            },
            function (view_type_1_1) {
                view_type_1 = view_type_1_1;
            }],
        execute: function() {
            /**
             * Service exposing low level API for creating, moving and destroying Views.
             *
             * Most applications should use higher-level abstractions like {@link DynamicComponentLoader} and
             * {@link ViewContainerRef} instead.
             */
            AppViewManager = (function () {
                function AppViewManager() {
                }
                return AppViewManager;
            }());
            exports_1("AppViewManager", AppViewManager);
            AppViewManager_ = (function (_super) {
                __extends(AppViewManager_, _super);
                function AppViewManager_(_renderer, _appId) {
                    _super.call(this);
                    this._renderer = _renderer;
                    this._appId = _appId;
                    this._nextCompTypeId = 0;
                    /** @internal */
                    this._createRootHostViewScope = profile_1.wtfCreateScope('AppViewManager#createRootHostView()');
                    /** @internal */
                    this._destroyRootHostViewScope = profile_1.wtfCreateScope('AppViewManager#destroyRootHostView()');
                    /** @internal */
                    this._createEmbeddedViewInContainerScope = profile_1.wtfCreateScope('AppViewManager#createEmbeddedViewInContainer()');
                    /** @internal */
                    this._createHostViewInContainerScope = profile_1.wtfCreateScope('AppViewManager#createHostViewInContainer()');
                    /** @internal */
                    this._destroyViewInContainerScope = profile_1.wtfCreateScope('AppViewMananger#destroyViewInContainer()');
                    /** @internal */
                    this._attachViewInContainerScope = profile_1.wtfCreateScope('AppViewMananger#attachViewInContainer()');
                    /** @internal */
                    this._detachViewInContainerScope = profile_1.wtfCreateScope('AppViewMananger#detachViewInContainer()');
                }
                AppViewManager_.prototype.getViewContainer = function (location) {
                    return location.internalElement.getViewContainerRef();
                };
                AppViewManager_.prototype.getHostElement = function (hostViewRef) {
                    var hostView = hostViewRef.internalView;
                    if (hostView.proto.type !== view_type_1.ViewType.HOST) {
                        throw new exceptions_1.BaseException('This operation is only allowed on host views');
                    }
                    return hostView.appElements[0].ref;
                };
                AppViewManager_.prototype.getNamedElementInComponentView = function (hostLocation, variableName) {
                    var appEl = hostLocation.internalElement;
                    var componentView = appEl.componentView;
                    if (lang_1.isBlank(componentView)) {
                        throw new exceptions_1.BaseException("There is no component directive at element " + hostLocation);
                    }
                    for (var i = 0; i < componentView.appElements.length; i++) {
                        var compAppEl = componentView.appElements[i];
                        if (collection_1.StringMapWrapper.contains(compAppEl.proto.directiveVariableBindings, variableName)) {
                            return compAppEl.ref;
                        }
                    }
                    throw new exceptions_1.BaseException("Could not find variable " + variableName);
                };
                AppViewManager_.prototype.getComponent = function (hostLocation) {
                    return hostLocation.internalElement.getComponent();
                };
                AppViewManager_.prototype.createRootHostView = function (hostViewFactoryRef, overrideSelector, injector, projectableNodes) {
                    if (projectableNodes === void 0) { projectableNodes = null; }
                    var s = this._createRootHostViewScope();
                    var hostViewFactory = hostViewFactoryRef.internalHostViewFactory;
                    var selector = lang_1.isPresent(overrideSelector) ? overrideSelector : hostViewFactory.selector;
                    var view = hostViewFactory.viewFactory(this._renderer, this, null, projectableNodes, selector, null, injector);
                    return profile_1.wtfLeave(s, view.ref);
                };
                AppViewManager_.prototype.destroyRootHostView = function (hostViewRef) {
                    var s = this._destroyRootHostViewScope();
                    var hostView = hostViewRef.internalView;
                    hostView.renderer.detachView(view_1.flattenNestedViewRenderNodes(hostView.rootNodesOrAppElements));
                    hostView.destroy();
                    profile_1.wtfLeave(s);
                };
                AppViewManager_.prototype.createEmbeddedViewInContainer = function (viewContainerLocation, index, templateRef) {
                    var s = this._createEmbeddedViewInContainerScope();
                    var contextEl = templateRef.elementRef.internalElement;
                    var view = contextEl.embeddedViewFactory(contextEl.parentView.renderer, this, contextEl, contextEl.parentView.projectableNodes, null, null, null);
                    this._attachViewToContainer(view, viewContainerLocation.internalElement, index);
                    return profile_1.wtfLeave(s, view.ref);
                };
                AppViewManager_.prototype.createHostViewInContainer = function (viewContainerLocation, index, hostViewFactoryRef, dynamicallyCreatedProviders, projectableNodes) {
                    var s = this._createHostViewInContainerScope();
                    // TODO(tbosch): This should be specifiable via an additional argument!
                    var viewContainerLocation_ = viewContainerLocation;
                    var contextEl = viewContainerLocation_.internalElement;
                    var hostViewFactory = hostViewFactoryRef.internalHostViewFactory;
                    var view = hostViewFactory.viewFactory(contextEl.parentView.renderer, contextEl.parentView.viewManager, contextEl, projectableNodes, null, dynamicallyCreatedProviders, null);
                    this._attachViewToContainer(view, viewContainerLocation_.internalElement, index);
                    return profile_1.wtfLeave(s, view.ref);
                };
                AppViewManager_.prototype.destroyViewInContainer = function (viewContainerLocation, index) {
                    var s = this._destroyViewInContainerScope();
                    var view = this._detachViewInContainer(viewContainerLocation.internalElement, index);
                    view.destroy();
                    profile_1.wtfLeave(s);
                };
                // TODO(i): refactor detachViewInContainer+attachViewInContainer to moveViewInContainer
                AppViewManager_.prototype.attachViewInContainer = function (viewContainerLocation, index, viewRef) {
                    var viewRef_ = viewRef;
                    var s = this._attachViewInContainerScope();
                    this._attachViewToContainer(viewRef_.internalView, viewContainerLocation.internalElement, index);
                    return profile_1.wtfLeave(s, viewRef_);
                };
                // TODO(i): refactor detachViewInContainer+attachViewInContainer to moveViewInContainer
                AppViewManager_.prototype.detachViewInContainer = function (viewContainerLocation, index) {
                    var s = this._detachViewInContainerScope();
                    var view = this._detachViewInContainer(viewContainerLocation.internalElement, index);
                    return profile_1.wtfLeave(s, view.ref);
                };
                /** @internal */
                AppViewManager_.prototype.onViewCreated = function (view) { };
                /** @internal */
                AppViewManager_.prototype.onViewDestroyed = function (view) { };
                /** @internal */
                AppViewManager_.prototype.createRenderComponentType = function (encapsulation, styles) {
                    return new api_1.RenderComponentType(this._appId + "-" + this._nextCompTypeId++, encapsulation, styles);
                };
                AppViewManager_.prototype._attachViewToContainer = function (view, vcAppElement, viewIndex) {
                    if (view.proto.type === view_type_1.ViewType.COMPONENT) {
                        throw new exceptions_1.BaseException("Component views can't be moved!");
                    }
                    var nestedViews = vcAppElement.nestedViews;
                    if (nestedViews == null) {
                        nestedViews = [];
                        vcAppElement.nestedViews = nestedViews;
                    }
                    collection_1.ListWrapper.insert(nestedViews, viewIndex, view);
                    var refNode;
                    if (viewIndex > 0) {
                        var prevView = nestedViews[viewIndex - 1];
                        refNode = prevView.rootNodesOrAppElements.length > 0 ?
                            prevView.rootNodesOrAppElements[prevView.rootNodesOrAppElements.length - 1] :
                            null;
                    }
                    else {
                        refNode = vcAppElement.nativeElement;
                    }
                    if (lang_1.isPresent(refNode)) {
                        var refRenderNode = view_1.findLastRenderNode(refNode);
                        view.renderer.attachViewAfter(refRenderNode, view_1.flattenNestedViewRenderNodes(view.rootNodesOrAppElements));
                    }
                    // TODO: This is only needed when a view is destroyed,
                    // not when it is detached for reordering with ng-for...
                    vcAppElement.parentView.changeDetector.addContentChild(view.changeDetector);
                    vcAppElement.traverseAndSetQueriesAsDirty();
                };
                AppViewManager_.prototype._detachViewInContainer = function (vcAppElement, viewIndex) {
                    var view = collection_1.ListWrapper.removeAt(vcAppElement.nestedViews, viewIndex);
                    if (view.proto.type === view_type_1.ViewType.COMPONENT) {
                        throw new exceptions_1.BaseException("Component views can't be moved!");
                    }
                    vcAppElement.traverseAndSetQueriesAsDirty();
                    view.renderer.detachView(view_1.flattenNestedViewRenderNodes(view.rootNodesOrAppElements));
                    // TODO: This is only needed when a view is destroyed,
                    // not when it is detached for reordering with ng-for...
                    view.changeDetector.remove();
                    return view;
                };
                AppViewManager_ = __decorate([
                    di_1.Injectable(),
                    __param(1, di_1.Inject(application_tokens_1.APP_ID)), 
                    __metadata('design:paramtypes', [api_1.RootRenderer, String])
                ], AppViewManager_);
                return AppViewManager_;
            }(AppViewManager));
            exports_1("AppViewManager_", AppViewManager_);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvbGlua2VyL3ZpZXdfbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBOEJBOzs7OztlQUtHO1lBQ0g7Z0JBQUE7Z0JBZ0pBLENBQUM7Z0JBQUQscUJBQUM7WUFBRCxDQWhKQSxBQWdKQyxJQUFBO1lBaEpELDJDQWdKQyxDQUFBO1lBR0Q7Z0JBQXFDLG1DQUFjO2dCQUdqRCx5QkFBb0IsU0FBdUIsRUFBMEIsTUFBYztvQkFBSSxpQkFBTyxDQUFDO29CQUEzRSxjQUFTLEdBQVQsU0FBUyxDQUFjO29CQUEwQixXQUFNLEdBQU4sTUFBTSxDQUFRO29CQUYzRSxvQkFBZSxHQUFXLENBQUMsQ0FBQztvQkFtQ3BDLGdCQUFnQjtvQkFDaEIsNkJBQXdCLEdBQWUsd0JBQWMsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO29CQVk3RixnQkFBZ0I7b0JBQ2hCLDhCQUF5QixHQUFlLHdCQUFjLENBQUMsc0NBQXNDLENBQUMsQ0FBQztvQkFVL0YsZ0JBQWdCO29CQUNoQix3Q0FBbUMsR0FDL0Isd0JBQWMsQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO29CQWFyRSxnQkFBZ0I7b0JBQ2hCLG9DQUErQixHQUMzQix3QkFBYyxDQUFDLDRDQUE0QyxDQUFDLENBQUM7b0JBa0JqRSxnQkFBZ0I7b0JBQ2hCLGlDQUE0QixHQUFHLHdCQUFjLENBQUMsMENBQTBDLENBQUMsQ0FBQztvQkFVMUYsZ0JBQWdCO29CQUNoQixnQ0FBMkIsR0FBRyx3QkFBYyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7b0JBWXhGLGdCQUFnQjtvQkFDaEIsZ0NBQTJCLEdBQUcsd0JBQWMsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO2dCQXJIUSxDQUFDO2dCQUVqRywwQ0FBZ0IsR0FBaEIsVUFBaUIsUUFBb0I7b0JBQ25DLE1BQU0sQ0FBZSxRQUFT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LFVBQVUsQ0FBQyxtQ0FBNEIsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO29CQUVwRixzREFBc0Q7b0JBQ3RELHdEQUF3RDtvQkFDeEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDZCxDQUFDO2dCQTNMSDtvQkFBQyxlQUFVLEVBQUU7K0JBSW1DLFdBQU0sQ0FBQywyQkFBTSxDQUFDOzttQ0FKakQ7Z0JBNExiLHNCQUFDO1lBQUQsQ0EzTEEsQUEyTEMsQ0EzTG9DLGNBQWMsR0EyTGxEO1lBM0xELDZDQTJMQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvbGlua2VyL3ZpZXdfbWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEluamVjdG9yLFxuICBJbmplY3QsXG4gIFByb3ZpZGVyLFxuICBJbmplY3RhYmxlLFxuICBSZXNvbHZlZFByb3ZpZGVyLFxuICBmb3J3YXJkUmVmXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7aXNQcmVzZW50LCBpc0JsYW5rLCBpc0FycmF5fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtMaXN0V3JhcHBlciwgU3RyaW5nTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7QXBwVmlldywgSG9zdFZpZXdGYWN0b3J5LCBmbGF0dGVuTmVzdGVkVmlld1JlbmRlck5vZGVzLCBmaW5kTGFzdFJlbmRlck5vZGV9IGZyb20gJy4vdmlldyc7XG5pbXBvcnQge0FwcEVsZW1lbnR9IGZyb20gJy4vZWxlbWVudCc7XG5pbXBvcnQge0VsZW1lbnRSZWYsIEVsZW1lbnRSZWZffSBmcm9tICcuL2VsZW1lbnRfcmVmJztcbmltcG9ydCB7XG4gIEhvc3RWaWV3RmFjdG9yeVJlZixcbiAgSG9zdFZpZXdGYWN0b3J5UmVmXyxcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBIb3N0Vmlld1JlZixcbiAgVmlld1JlZixcbiAgVmlld1JlZl9cbn0gZnJvbSAnLi92aWV3X3JlZic7XG5pbXBvcnQge1ZpZXdDb250YWluZXJSZWZ9IGZyb20gJy4vdmlld19jb250YWluZXJfcmVmJztcbmltcG9ydCB7VGVtcGxhdGVSZWYsIFRlbXBsYXRlUmVmX30gZnJvbSAnLi90ZW1wbGF0ZV9yZWYnO1xuaW1wb3J0IHtSb290UmVuZGVyZXIsIFJlbmRlckNvbXBvbmVudFR5cGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlbmRlci9hcGknO1xuaW1wb3J0IHt3dGZDcmVhdGVTY29wZSwgd3RmTGVhdmUsIFd0ZlNjb3BlRm59IGZyb20gJy4uL3Byb2ZpbGUvcHJvZmlsZSc7XG5pbXBvcnQge0FQUF9JRH0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvYXBwbGljYXRpb25fdG9rZW5zJztcbmltcG9ydCB7Vmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL21ldGFkYXRhL3ZpZXcnO1xuaW1wb3J0IHtWaWV3VHlwZX0gZnJvbSAnLi92aWV3X3R5cGUnO1xuXG4vKipcbiAqIFNlcnZpY2UgZXhwb3NpbmcgbG93IGxldmVsIEFQSSBmb3IgY3JlYXRpbmcsIG1vdmluZyBhbmQgZGVzdHJveWluZyBWaWV3cy5cbiAqXG4gKiBNb3N0IGFwcGxpY2F0aW9ucyBzaG91bGQgdXNlIGhpZ2hlci1sZXZlbCBhYnN0cmFjdGlvbnMgbGlrZSB7QGxpbmsgRHluYW1pY0NvbXBvbmVudExvYWRlcn0gYW5kXG4gKiB7QGxpbmsgVmlld0NvbnRhaW5lclJlZn0gaW5zdGVhZC5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFwcFZpZXdNYW5hZ2VyIHtcbiAgLyoqXG4gICAqIFJldHVybnMgYSB7QGxpbmsgVmlld0NvbnRhaW5lclJlZn0gb2YgdGhlIFZpZXcgQ29udGFpbmVyIGF0IHRoZSBzcGVjaWZpZWQgbG9jYXRpb24uXG4gICAqL1xuICBhYnN0cmFjdCBnZXRWaWV3Q29udGFpbmVyKGxvY2F0aW9uOiBFbGVtZW50UmVmKTogVmlld0NvbnRhaW5lclJlZjtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUge0BsaW5rIEVsZW1lbnRSZWZ9IHRoYXQgbWFrZXMgdXAgdGhlIHNwZWNpZmllZCBIb3N0IFZpZXcuXG4gICAqL1xuICBhYnN0cmFjdCBnZXRIb3N0RWxlbWVudChob3N0Vmlld1JlZjogSG9zdFZpZXdSZWYpOiBFbGVtZW50UmVmO1xuXG4gIC8qKlxuICAgKiBTZWFyY2hlcyB0aGUgQ29tcG9uZW50IFZpZXcgb2YgdGhlIENvbXBvbmVudCBzcGVjaWZpZWQgdmlhIGBob3N0TG9jYXRpb25gIGFuZCByZXR1cm5zIHRoZVxuICAgKiB7QGxpbmsgRWxlbWVudFJlZn0gZm9yIHRoZSBFbGVtZW50IGlkZW50aWZpZWQgdmlhIGEgVmFyaWFibGUgTmFtZSBgdmFyaWFibGVOYW1lYC5cbiAgICpcbiAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBpZiB0aGUgc3BlY2lmaWVkIGBob3N0TG9jYXRpb25gIGlzIG5vdCBhIEhvc3QgRWxlbWVudCBvZiBhIENvbXBvbmVudCwgb3IgaWZcbiAgICogdmFyaWFibGUgYHZhcmlhYmxlTmFtZWAgY291bGRuJ3QgYmUgZm91bmQgaW4gdGhlIENvbXBvbmVudCBWaWV3IG9mIHRoaXMgQ29tcG9uZW50LlxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0TmFtZWRFbGVtZW50SW5Db21wb25lbnRWaWV3KGhvc3RMb2NhdGlvbjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlTmFtZTogc3RyaW5nKTogRWxlbWVudFJlZjtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY29tcG9uZW50IGluc3RhbmNlIGZvciB0aGUgcHJvdmlkZWQgSG9zdCBFbGVtZW50LlxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0Q29tcG9uZW50KGhvc3RMb2NhdGlvbjogRWxlbWVudFJlZik6IGFueTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBhIENvbXBvbmVudCBhbmQgYXR0YWNoZXMgaXQgdG8gdGhlIGZpcnN0IGVsZW1lbnQgaW4gdGhlIGdsb2JhbCBWaWV3XG4gICAqICh1c3VhbGx5IERPTSBEb2N1bWVudCkgdGhhdCBtYXRjaGVzIHRoZSBjb21wb25lbnQncyBzZWxlY3RvciBvciBgb3ZlcnJpZGVTZWxlY3RvcmAuXG4gICAqXG4gICAqIFRoaXMgYXMgYSBsb3ctbGV2ZWwgd2F5IHRvIGJvb3RzdHJhcCBhbiBhcHBsaWNhdGlvbiBhbmQgdXBncmFkZSBhbiBleGlzdGluZyBFbGVtZW50IHRvIGFcbiAgICogSG9zdCBFbGVtZW50LiBNb3N0IGFwcGxpY2F0aW9ucyBzaG91bGQgdXNlIHtAbGluayBEeW5hbWljQ29tcG9uZW50TG9hZGVyI2xvYWRBc1Jvb3R9IGluc3RlYWQuXG4gICAqXG4gICAqIFRoZSBDb21wb25lbnQgYW5kIGl0cyBWaWV3IGFyZSBjcmVhdGVkIGJhc2VkIG9uIHRoZSBgaG9zdFByb3RvQ29tcG9uZW50UmVmYCB3aGljaCBjYW4gYmVcbiAgICogb2J0YWluZWRcbiAgICogYnkgY29tcGlsaW5nIHRoZSBjb21wb25lbnQgd2l0aCB7QGxpbmsgQ29tcGlsZXIjY29tcGlsZUluSG9zdH0uXG4gICAqXG4gICAqIFVzZSB7QGxpbmsgQXBwVmlld01hbmFnZXIjZGVzdHJveVJvb3RIb3N0Vmlld30gdG8gZGVzdHJveSB0aGUgY3JlYXRlZCBDb21wb25lbnQgYW5kIGl0J3MgSG9zdFxuICAgKiBWaWV3LlxuICAgKlxuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiBgYGBcbiAgICogQG5nLkNvbXBvbmVudCh7XG4gICAqICAgc2VsZWN0b3I6ICdjaGlsZC1jb21wb25lbnQnXG4gICAqIH0pXG4gICAqIEBuZy5WaWV3KHtcbiAgICogICB0ZW1wbGF0ZTogJ0NoaWxkJ1xuICAgKiB9KVxuICAgKiBjbGFzcyBDaGlsZENvbXBvbmVudCB7XG4gICAqXG4gICAqIH1cbiAgICpcbiAgICogQG5nLkNvbXBvbmVudCh7XG4gICAqICAgc2VsZWN0b3I6ICdteS1hcHAnXG4gICAqIH0pXG4gICAqIEBuZy5WaWV3KHtcbiAgICogICB0ZW1wbGF0ZTogYFxuICAgKiAgICAgUGFyZW50ICg8c29tZS1jb21wb25lbnQ+PC9zb21lLWNvbXBvbmVudD4pXG4gICAqICAgYFxuICAgKiB9KVxuICAgKiBjbGFzcyBNeUFwcCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gICAqICAgdmlld1JlZjogbmcuVmlld1JlZjtcbiAgICpcbiAgICogICBjb25zdHJ1Y3RvcihwdWJsaWMgYXBwVmlld01hbmFnZXI6IG5nLkFwcFZpZXdNYW5hZ2VyLCBjb21waWxlcjogbmcuQ29tcGlsZXIpIHtcbiAgICogICAgIGNvbXBpbGVyLmNvbXBpbGVJbkhvc3QoQ2hpbGRDb21wb25lbnQpLnRoZW4oKHByb3RvVmlldzogbmcuUHJvdG9Db21wb25lbnRSZWYpID0+IHtcbiAgICogICAgICAgdGhpcy52aWV3UmVmID0gYXBwVmlld01hbmFnZXIuY3JlYXRlUm9vdEhvc3RWaWV3KHByb3RvVmlldywgJ3NvbWUtY29tcG9uZW50JywgbnVsbCk7XG4gICAqICAgICB9KVxuICAgKiAgIH1cbiAgICpcbiAgICogICBuZ09uRGVzdHJveSgpIHtcbiAgICogICAgIHRoaXMuYXBwVmlld01hbmFnZXIuZGVzdHJveVJvb3RIb3N0Vmlldyh0aGlzLnZpZXdSZWYpO1xuICAgKiAgICAgdGhpcy52aWV3UmVmID0gbnVsbDtcbiAgICogICB9XG4gICAqIH1cbiAgICpcbiAgICogbmcuYm9vdHN0cmFwKE15QXBwKTtcbiAgICogYGBgXG4gICAqL1xuICBhYnN0cmFjdCBjcmVhdGVSb290SG9zdFZpZXcoaG9zdFZpZXdGYWN0b3J5UmVmOiBIb3N0Vmlld0ZhY3RvcnlSZWYsIG92ZXJyaWRlU2VsZWN0b3I6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluamVjdG9yOiBJbmplY3RvciwgcHJvamVjdGFibGVOb2Rlcz86IGFueVtdW10pOiBIb3N0Vmlld1JlZjtcblxuICAvKipcbiAgICogRGVzdHJveXMgdGhlIEhvc3QgVmlldyBjcmVhdGVkIHZpYSB7QGxpbmsgQXBwVmlld01hbmFnZXIjY3JlYXRlUm9vdEhvc3RWaWV3fS5cbiAgICpcbiAgICogQWxvbmcgd2l0aCB0aGUgSG9zdCBWaWV3LCB0aGUgQ29tcG9uZW50IEluc3RhbmNlIGFzIHdlbGwgYXMgYWxsIG5lc3RlZCBWaWV3IGFuZCBDb21wb25lbnRzIGFyZVxuICAgKiBkZXN0cm95ZWQgYXMgd2VsbC5cbiAgICovXG4gIGFic3RyYWN0IGRlc3Ryb3lSb290SG9zdFZpZXcoaG9zdFZpZXdSZWY6IEhvc3RWaWV3UmVmKTtcblxuICAvKipcbiAgICogSW5zdGFudGlhdGVzIGFuIEVtYmVkZGVkIFZpZXcgYmFzZWQgb24gdGhlIHtAbGluayBUZW1wbGF0ZVJlZiBgdGVtcGxhdGVSZWZgfSBhbmQgaW5zZXJ0cyBpdFxuICAgKiBpbnRvIHRoZSBWaWV3IENvbnRhaW5lciBzcGVjaWZpZWQgdmlhIGB2aWV3Q29udGFpbmVyTG9jYXRpb25gIGF0IHRoZSBzcGVjaWZpZWQgYGluZGV4YC5cbiAgICpcbiAgICogUmV0dXJucyB0aGUge0BsaW5rIFZpZXdSZWZ9IGZvciB0aGUgbmV3bHkgY3JlYXRlZCBWaWV3LlxuICAgKlxuICAgKiBUaGlzIGFzIGEgbG93LWxldmVsIHdheSB0byBjcmVhdGUgYW5kIGF0dGFjaCBhbiBFbWJlZGRlZCB2aWEgdG8gYSBWaWV3IENvbnRhaW5lci4gTW9zdFxuICAgKiBhcHBsaWNhdGlvbnMgc2hvdWxkIHVzZWQge0BsaW5rIFZpZXdDb250YWluZXJSZWYjY3JlYXRlRW1iZWRkZWRWaWV3fSBpbnN0ZWFkLlxuICAgKlxuICAgKiBVc2Uge0BsaW5rIEFwcFZpZXdNYW5hZ2VyI2Rlc3Ryb3lWaWV3SW5Db250YWluZXJ9IHRvIGRlc3Ryb3kgdGhlIGNyZWF0ZWQgRW1iZWRkZWQgVmlldy5cbiAgICovXG4gIC8vIFRPRE8oaSk6IHRoaXMgbG93LWxldmVsIHZlcnNpb24gb2YgVmlld0NvbnRhaW5lclJlZiNjcmVhdGVFbWJlZGRlZFZpZXcgZG9lc24ndCBhZGQgYW55dGhpbmcgbmV3XG4gIC8vICAgIHdlIHNob3VsZCBtYWtlIGl0IHByaXZhdGUsIG90aGVyd2lzZSB3ZSBoYXZlIHR3byBhcGlzIHRvIGRvIHRoZSBzYW1lIHRoaW5nLlxuICBhYnN0cmFjdCBjcmVhdGVFbWJlZGRlZFZpZXdJbkNvbnRhaW5lcih2aWV3Q29udGFpbmVyTG9jYXRpb246IEVsZW1lbnRSZWYsIGluZGV4OiBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZik6IEVtYmVkZGVkVmlld1JlZjtcblxuICAvKipcbiAgICogSW5zdGFudGlhdGVzIGEgc2luZ2xlIHtAbGluayBDb21wb25lbnR9IGFuZCBpbnNlcnRzIGl0cyBIb3N0IFZpZXcgaW50byB0aGUgVmlldyBDb250YWluZXJcbiAgICogZm91bmQgYXQgYHZpZXdDb250YWluZXJMb2NhdGlvbmAuIFdpdGhpbiB0aGUgY29udGFpbmVyLCB0aGUgdmlldyB3aWxsIGJlIGluc2VydGVkIGF0IHBvc2l0aW9uXG4gICAqIHNwZWNpZmllZCB2aWEgYGluZGV4YC5cbiAgICpcbiAgICogVGhlIGNvbXBvbmVudCBpcyBpbnN0YW50aWF0ZWQgdXNpbmcgaXRzIHtAbGluayBQcm90b1ZpZXdSZWYgYHByb3RvVmlld1JlZmB9IHdoaWNoIGNhbiBiZVxuICAgKiBvYnRhaW5lZCB2aWEge0BsaW5rIENvbXBpbGVyI2NvbXBpbGVJbkhvc3R9LlxuICAgKlxuICAgKiBZb3UgY2FuIG9wdGlvbmFsbHkgc3BlY2lmeSBgZHluYW1pY2FsbHlDcmVhdGVkUHJvdmlkZXJzYCwgd2hpY2ggY29uZmlndXJlIHRoZSB7QGxpbmsgSW5qZWN0b3J9XG4gICAqIHRoYXQgd2lsbCBiZSBjcmVhdGVkIGZvciB0aGUgSG9zdCBWaWV3LlxuICAgKlxuICAgKiBSZXR1cm5zIHRoZSB7QGxpbmsgSG9zdFZpZXdSZWZ9IG9mIHRoZSBIb3N0IFZpZXcgY3JlYXRlZCBmb3IgdGhlIG5ld2x5IGluc3RhbnRpYXRlZCBDb21wb25lbnQuXG4gICAqXG4gICAqIFVzZSB7QGxpbmsgQXBwVmlld01hbmFnZXIjZGVzdHJveVZpZXdJbkNvbnRhaW5lcn0gdG8gZGVzdHJveSB0aGUgY3JlYXRlZCBIb3N0IFZpZXcuXG4gICAqL1xuICBhYnN0cmFjdCBjcmVhdGVIb3N0Vmlld0luQ29udGFpbmVyKFxuICAgICAgdmlld0NvbnRhaW5lckxvY2F0aW9uOiBFbGVtZW50UmVmLCBpbmRleDogbnVtYmVyLCBob3N0Vmlld0ZhY3RvcnlSZWY6IEhvc3RWaWV3RmFjdG9yeVJlZixcbiAgICAgIGR5bmFtaWNhbGx5Q3JlYXRlZFByb3ZpZGVyczogUmVzb2x2ZWRQcm92aWRlcltdLCBwcm9qZWN0YWJsZU5vZGVzOiBhbnlbXVtdKTogSG9zdFZpZXdSZWY7XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIGFuIEVtYmVkZGVkIG9yIEhvc3QgVmlldyBhdHRhY2hlZCB0byBhIFZpZXcgQ29udGFpbmVyIGF0IHRoZSBzcGVjaWZpZWQgYGluZGV4YC5cbiAgICpcbiAgICogVGhlIFZpZXcgQ29udGFpbmVyIGlzIGxvY2F0ZWQgdmlhIGB2aWV3Q29udGFpbmVyTG9jYXRpb25gLlxuICAgKi9cbiAgYWJzdHJhY3QgZGVzdHJveVZpZXdJbkNvbnRhaW5lcih2aWV3Q29udGFpbmVyTG9jYXRpb246IEVsZW1lbnRSZWYsIGluZGV4OiBudW1iZXIpO1xuXG4gIC8qKlxuICAgKlxuICAgKiBTZWUge0BsaW5rIEFwcFZpZXdNYW5hZ2VyI2RldGFjaFZpZXdJbkNvbnRhaW5lcn0uXG4gICAqL1xuICAvLyBUT0RPKGkpOiByZWZhY3RvciBkZXRhY2hWaWV3SW5Db250YWluZXIrYXR0YWNoVmlld0luQ29udGFpbmVyIHRvIG1vdmVWaWV3SW5Db250YWluZXJcbiAgYWJzdHJhY3QgYXR0YWNoVmlld0luQ29udGFpbmVyKHZpZXdDb250YWluZXJMb2NhdGlvbjogRWxlbWVudFJlZiwgaW5kZXg6IG51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdSZWY6IEVtYmVkZGVkVmlld1JlZik6IEVtYmVkZGVkVmlld1JlZjtcblxuICAvKipcbiAgICogU2VlIHtAbGluayBBcHBWaWV3TWFuYWdlciNhdHRhY2hWaWV3SW5Db250YWluZXJ9LlxuICAgKi9cbiAgYWJzdHJhY3QgZGV0YWNoVmlld0luQ29udGFpbmVyKHZpZXdDb250YWluZXJMb2NhdGlvbjogRWxlbWVudFJlZiwgaW5kZXg6IG51bWJlcik6IEVtYmVkZGVkVmlld1JlZjtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFwcFZpZXdNYW5hZ2VyXyBleHRlbmRzIEFwcFZpZXdNYW5hZ2VyIHtcbiAgcHJpdmF0ZSBfbmV4dENvbXBUeXBlSWQ6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcmVuZGVyZXI6IFJvb3RSZW5kZXJlciwgQEluamVjdChBUFBfSUQpIHByaXZhdGUgX2FwcElkOiBzdHJpbmcpIHsgc3VwZXIoKTsgfVxuXG4gIGdldFZpZXdDb250YWluZXIobG9jYXRpb246IEVsZW1lbnRSZWYpOiBWaWV3Q29udGFpbmVyUmVmIHtcbiAgICByZXR1cm4gKDxFbGVtZW50UmVmXz5sb2NhdGlvbikuaW50ZXJuYWxFbGVtZW50LmdldFZpZXdDb250YWluZXJSZWYoKTtcbiAgfVxuXG4gIGdldEhvc3RFbGVtZW50KGhvc3RWaWV3UmVmOiBWaWV3UmVmKTogRWxlbWVudFJlZiB7XG4gICAgdmFyIGhvc3RWaWV3ID0gKDxWaWV3UmVmXz5ob3N0Vmlld1JlZikuaW50ZXJuYWxWaWV3O1xuICAgIGlmIChob3N0Vmlldy5wcm90by50eXBlICE9PSBWaWV3VHlwZS5IT1NUKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbignVGhpcyBvcGVyYXRpb24gaXMgb25seSBhbGxvd2VkIG9uIGhvc3Qgdmlld3MnKTtcbiAgICB9XG4gICAgcmV0dXJuIGhvc3RWaWV3LmFwcEVsZW1lbnRzWzBdLnJlZjtcbiAgfVxuXG4gIGdldE5hbWVkRWxlbWVudEluQ29tcG9uZW50Vmlldyhob3N0TG9jYXRpb246IEVsZW1lbnRSZWYsIHZhcmlhYmxlTmFtZTogc3RyaW5nKTogRWxlbWVudFJlZiB7XG4gICAgdmFyIGFwcEVsID0gKDxFbGVtZW50UmVmXz5ob3N0TG9jYXRpb24pLmludGVybmFsRWxlbWVudDtcbiAgICB2YXIgY29tcG9uZW50VmlldyA9IGFwcEVsLmNvbXBvbmVudFZpZXc7XG4gICAgaWYgKGlzQmxhbmsoY29tcG9uZW50VmlldykpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBUaGVyZSBpcyBubyBjb21wb25lbnQgZGlyZWN0aXZlIGF0IGVsZW1lbnQgJHtob3N0TG9jYXRpb259YCk7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29tcG9uZW50Vmlldy5hcHBFbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNvbXBBcHBFbCA9IGNvbXBvbmVudFZpZXcuYXBwRWxlbWVudHNbaV07XG4gICAgICBpZiAoU3RyaW5nTWFwV3JhcHBlci5jb250YWlucyhjb21wQXBwRWwucHJvdG8uZGlyZWN0aXZlVmFyaWFibGVCaW5kaW5ncywgdmFyaWFibGVOYW1lKSkge1xuICAgICAgICByZXR1cm4gY29tcEFwcEVsLnJlZjtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYENvdWxkIG5vdCBmaW5kIHZhcmlhYmxlICR7dmFyaWFibGVOYW1lfWApO1xuICB9XG5cbiAgZ2V0Q29tcG9uZW50KGhvc3RMb2NhdGlvbjogRWxlbWVudFJlZik6IGFueSB7XG4gICAgcmV0dXJuICg8RWxlbWVudFJlZl8+aG9zdExvY2F0aW9uKS5pbnRlcm5hbEVsZW1lbnQuZ2V0Q29tcG9uZW50KCk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9jcmVhdGVSb290SG9zdFZpZXdTY29wZTogV3RmU2NvcGVGbiA9IHd0ZkNyZWF0ZVNjb3BlKCdBcHBWaWV3TWFuYWdlciNjcmVhdGVSb290SG9zdFZpZXcoKScpO1xuXG4gIGNyZWF0ZVJvb3RIb3N0Vmlldyhob3N0Vmlld0ZhY3RvcnlSZWY6IEhvc3RWaWV3RmFjdG9yeVJlZiwgb3ZlcnJpZGVTZWxlY3Rvcjogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgaW5qZWN0b3I6IEluamVjdG9yLCBwcm9qZWN0YWJsZU5vZGVzOiBhbnlbXVtdID0gbnVsbCk6IEhvc3RWaWV3UmVmIHtcbiAgICB2YXIgcyA9IHRoaXMuX2NyZWF0ZVJvb3RIb3N0Vmlld1Njb3BlKCk7XG4gICAgdmFyIGhvc3RWaWV3RmFjdG9yeSA9ICg8SG9zdFZpZXdGYWN0b3J5UmVmXz5ob3N0Vmlld0ZhY3RvcnlSZWYpLmludGVybmFsSG9zdFZpZXdGYWN0b3J5O1xuICAgIHZhciBzZWxlY3RvciA9IGlzUHJlc2VudChvdmVycmlkZVNlbGVjdG9yKSA/IG92ZXJyaWRlU2VsZWN0b3IgOiBob3N0Vmlld0ZhY3Rvcnkuc2VsZWN0b3I7XG4gICAgdmFyIHZpZXcgPSBob3N0Vmlld0ZhY3Rvcnkudmlld0ZhY3RvcnkodGhpcy5fcmVuZGVyZXIsIHRoaXMsIG51bGwsIHByb2plY3RhYmxlTm9kZXMsIHNlbGVjdG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsIGluamVjdG9yKTtcbiAgICByZXR1cm4gd3RmTGVhdmUocywgdmlldy5yZWYpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZGVzdHJveVJvb3RIb3N0Vmlld1Njb3BlOiBXdGZTY29wZUZuID0gd3RmQ3JlYXRlU2NvcGUoJ0FwcFZpZXdNYW5hZ2VyI2Rlc3Ryb3lSb290SG9zdFZpZXcoKScpO1xuXG4gIGRlc3Ryb3lSb290SG9zdFZpZXcoaG9zdFZpZXdSZWY6IFZpZXdSZWYpIHtcbiAgICB2YXIgcyA9IHRoaXMuX2Rlc3Ryb3lSb290SG9zdFZpZXdTY29wZSgpO1xuICAgIHZhciBob3N0VmlldyA9ICg8Vmlld1JlZl8+aG9zdFZpZXdSZWYpLmludGVybmFsVmlldztcbiAgICBob3N0Vmlldy5yZW5kZXJlci5kZXRhY2hWaWV3KGZsYXR0ZW5OZXN0ZWRWaWV3UmVuZGVyTm9kZXMoaG9zdFZpZXcucm9vdE5vZGVzT3JBcHBFbGVtZW50cykpO1xuICAgIGhvc3RWaWV3LmRlc3Ryb3koKTtcbiAgICB3dGZMZWF2ZShzKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NyZWF0ZUVtYmVkZGVkVmlld0luQ29udGFpbmVyU2NvcGU6IFd0ZlNjb3BlRm4gPVxuICAgICAgd3RmQ3JlYXRlU2NvcGUoJ0FwcFZpZXdNYW5hZ2VyI2NyZWF0ZUVtYmVkZGVkVmlld0luQ29udGFpbmVyKCknKTtcblxuICBjcmVhdGVFbWJlZGRlZFZpZXdJbkNvbnRhaW5lcih2aWV3Q29udGFpbmVyTG9jYXRpb246IEVsZW1lbnRSZWYsIGluZGV4OiBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZik6IEVtYmVkZGVkVmlld1JlZiB7XG4gICAgdmFyIHMgPSB0aGlzLl9jcmVhdGVFbWJlZGRlZFZpZXdJbkNvbnRhaW5lclNjb3BlKCk7XG4gICAgdmFyIGNvbnRleHRFbCA9ICg8VGVtcGxhdGVSZWZfPnRlbXBsYXRlUmVmKS5lbGVtZW50UmVmLmludGVybmFsRWxlbWVudDtcbiAgICB2YXIgdmlldzogQXBwVmlldyA9XG4gICAgICAgIGNvbnRleHRFbC5lbWJlZGRlZFZpZXdGYWN0b3J5KGNvbnRleHRFbC5wYXJlbnRWaWV3LnJlbmRlcmVyLCB0aGlzLCBjb250ZXh0RWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRFbC5wYXJlbnRWaWV3LnByb2plY3RhYmxlTm9kZXMsIG51bGwsIG51bGwsIG51bGwpO1xuICAgIHRoaXMuX2F0dGFjaFZpZXdUb0NvbnRhaW5lcih2aWV3LCAoPEVsZW1lbnRSZWZfPnZpZXdDb250YWluZXJMb2NhdGlvbikuaW50ZXJuYWxFbGVtZW50LCBpbmRleCk7XG4gICAgcmV0dXJuIHd0ZkxlYXZlKHMsIHZpZXcucmVmKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NyZWF0ZUhvc3RWaWV3SW5Db250YWluZXJTY29wZTogV3RmU2NvcGVGbiA9XG4gICAgICB3dGZDcmVhdGVTY29wZSgnQXBwVmlld01hbmFnZXIjY3JlYXRlSG9zdFZpZXdJbkNvbnRhaW5lcigpJyk7XG5cbiAgY3JlYXRlSG9zdFZpZXdJbkNvbnRhaW5lcih2aWV3Q29udGFpbmVyTG9jYXRpb246IEVsZW1lbnRSZWYsIGluZGV4OiBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9zdFZpZXdGYWN0b3J5UmVmOiBIb3N0Vmlld0ZhY3RvcnlSZWYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHluYW1pY2FsbHlDcmVhdGVkUHJvdmlkZXJzOiBSZXNvbHZlZFByb3ZpZGVyW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdGFibGVOb2RlczogYW55W11bXSk6IEhvc3RWaWV3UmVmIHtcbiAgICB2YXIgcyA9IHRoaXMuX2NyZWF0ZUhvc3RWaWV3SW5Db250YWluZXJTY29wZSgpO1xuICAgIC8vIFRPRE8odGJvc2NoKTogVGhpcyBzaG91bGQgYmUgc3BlY2lmaWFibGUgdmlhIGFuIGFkZGl0aW9uYWwgYXJndW1lbnQhXG4gICAgdmFyIHZpZXdDb250YWluZXJMb2NhdGlvbl8gPSA8RWxlbWVudFJlZl8+dmlld0NvbnRhaW5lckxvY2F0aW9uO1xuICAgIHZhciBjb250ZXh0RWwgPSB2aWV3Q29udGFpbmVyTG9jYXRpb25fLmludGVybmFsRWxlbWVudDtcbiAgICB2YXIgaG9zdFZpZXdGYWN0b3J5ID0gKDxIb3N0Vmlld0ZhY3RvcnlSZWZfPmhvc3RWaWV3RmFjdG9yeVJlZikuaW50ZXJuYWxIb3N0Vmlld0ZhY3Rvcnk7XG4gICAgdmFyIHZpZXcgPSBob3N0Vmlld0ZhY3Rvcnkudmlld0ZhY3RvcnkoXG4gICAgICAgIGNvbnRleHRFbC5wYXJlbnRWaWV3LnJlbmRlcmVyLCBjb250ZXh0RWwucGFyZW50Vmlldy52aWV3TWFuYWdlciwgY29udGV4dEVsLFxuICAgICAgICBwcm9qZWN0YWJsZU5vZGVzLCBudWxsLCBkeW5hbWljYWxseUNyZWF0ZWRQcm92aWRlcnMsIG51bGwpO1xuICAgIHRoaXMuX2F0dGFjaFZpZXdUb0NvbnRhaW5lcih2aWV3LCB2aWV3Q29udGFpbmVyTG9jYXRpb25fLmludGVybmFsRWxlbWVudCwgaW5kZXgpO1xuICAgIHJldHVybiB3dGZMZWF2ZShzLCB2aWV3LnJlZik7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9kZXN0cm95Vmlld0luQ29udGFpbmVyU2NvcGUgPSB3dGZDcmVhdGVTY29wZSgnQXBwVmlld01hbmFuZ2VyI2Rlc3Ryb3lWaWV3SW5Db250YWluZXIoKScpO1xuXG4gIGRlc3Ryb3lWaWV3SW5Db250YWluZXIodmlld0NvbnRhaW5lckxvY2F0aW9uOiBFbGVtZW50UmVmLCBpbmRleDogbnVtYmVyKSB7XG4gICAgdmFyIHMgPSB0aGlzLl9kZXN0cm95Vmlld0luQ29udGFpbmVyU2NvcGUoKTtcbiAgICB2YXIgdmlldyA9XG4gICAgICAgIHRoaXMuX2RldGFjaFZpZXdJbkNvbnRhaW5lcigoPEVsZW1lbnRSZWZfPnZpZXdDb250YWluZXJMb2NhdGlvbikuaW50ZXJuYWxFbGVtZW50LCBpbmRleCk7XG4gICAgdmlldy5kZXN0cm95KCk7XG4gICAgd3RmTGVhdmUocyk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9hdHRhY2hWaWV3SW5Db250YWluZXJTY29wZSA9IHd0ZkNyZWF0ZVNjb3BlKCdBcHBWaWV3TWFuYW5nZXIjYXR0YWNoVmlld0luQ29udGFpbmVyKCknKTtcblxuICAvLyBUT0RPKGkpOiByZWZhY3RvciBkZXRhY2hWaWV3SW5Db250YWluZXIrYXR0YWNoVmlld0luQ29udGFpbmVyIHRvIG1vdmVWaWV3SW5Db250YWluZXJcbiAgYXR0YWNoVmlld0luQ29udGFpbmVyKHZpZXdDb250YWluZXJMb2NhdGlvbjogRWxlbWVudFJlZiwgaW5kZXg6IG51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdSZWY6IFZpZXdSZWYpOiBFbWJlZGRlZFZpZXdSZWYge1xuICAgIHZhciB2aWV3UmVmXyA9IDxWaWV3UmVmXz52aWV3UmVmO1xuICAgIHZhciBzID0gdGhpcy5fYXR0YWNoVmlld0luQ29udGFpbmVyU2NvcGUoKTtcbiAgICB0aGlzLl9hdHRhY2hWaWV3VG9Db250YWluZXIodmlld1JlZl8uaW50ZXJuYWxWaWV3LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoPEVsZW1lbnRSZWZfPnZpZXdDb250YWluZXJMb2NhdGlvbikuaW50ZXJuYWxFbGVtZW50LCBpbmRleCk7XG4gICAgcmV0dXJuIHd0ZkxlYXZlKHMsIHZpZXdSZWZfKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2RldGFjaFZpZXdJbkNvbnRhaW5lclNjb3BlID0gd3RmQ3JlYXRlU2NvcGUoJ0FwcFZpZXdNYW5hbmdlciNkZXRhY2hWaWV3SW5Db250YWluZXIoKScpO1xuXG4gIC8vIFRPRE8oaSk6IHJlZmFjdG9yIGRldGFjaFZpZXdJbkNvbnRhaW5lcithdHRhY2hWaWV3SW5Db250YWluZXIgdG8gbW92ZVZpZXdJbkNvbnRhaW5lclxuICBkZXRhY2hWaWV3SW5Db250YWluZXIodmlld0NvbnRhaW5lckxvY2F0aW9uOiBFbGVtZW50UmVmLCBpbmRleDogbnVtYmVyKTogRW1iZWRkZWRWaWV3UmVmIHtcbiAgICB2YXIgcyA9IHRoaXMuX2RldGFjaFZpZXdJbkNvbnRhaW5lclNjb3BlKCk7XG4gICAgdmFyIHZpZXcgPVxuICAgICAgICB0aGlzLl9kZXRhY2hWaWV3SW5Db250YWluZXIoKDxFbGVtZW50UmVmXz52aWV3Q29udGFpbmVyTG9jYXRpb24pLmludGVybmFsRWxlbWVudCwgaW5kZXgpO1xuICAgIHJldHVybiB3dGZMZWF2ZShzLCB2aWV3LnJlZik7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIG9uVmlld0NyZWF0ZWQodmlldzogQXBwVmlldykge31cblxuICAvKiogQGludGVybmFsICovXG4gIG9uVmlld0Rlc3Ryb3llZCh2aWV3OiBBcHBWaWV3KSB7fVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgY3JlYXRlUmVuZGVyQ29tcG9uZW50VHlwZShlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZXM6IEFycmF5PHN0cmluZyB8IGFueVtdPik6IFJlbmRlckNvbXBvbmVudFR5cGUge1xuICAgIHJldHVybiBuZXcgUmVuZGVyQ29tcG9uZW50VHlwZShgJHt0aGlzLl9hcHBJZH0tJHt0aGlzLl9uZXh0Q29tcFR5cGVJZCsrfWAsIGVuY2Fwc3VsYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlcyk7XG4gIH1cblxuICBwcml2YXRlIF9hdHRhY2hWaWV3VG9Db250YWluZXIodmlldzogQXBwVmlldywgdmNBcHBFbGVtZW50OiBBcHBFbGVtZW50LCB2aWV3SW5kZXg6IG51bWJlcikge1xuICAgIGlmICh2aWV3LnByb3RvLnR5cGUgPT09IFZpZXdUeXBlLkNPTVBPTkVOVCkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYENvbXBvbmVudCB2aWV3cyBjYW4ndCBiZSBtb3ZlZCFgKTtcbiAgICB9XG4gICAgdmFyIG5lc3RlZFZpZXdzID0gdmNBcHBFbGVtZW50Lm5lc3RlZFZpZXdzO1xuICAgIGlmIChuZXN0ZWRWaWV3cyA9PSBudWxsKSB7XG4gICAgICBuZXN0ZWRWaWV3cyA9IFtdO1xuICAgICAgdmNBcHBFbGVtZW50Lm5lc3RlZFZpZXdzID0gbmVzdGVkVmlld3M7XG4gICAgfVxuICAgIExpc3RXcmFwcGVyLmluc2VydChuZXN0ZWRWaWV3cywgdmlld0luZGV4LCB2aWV3KTtcbiAgICB2YXIgcmVmTm9kZTtcbiAgICBpZiAodmlld0luZGV4ID4gMCkge1xuICAgICAgdmFyIHByZXZWaWV3ID0gbmVzdGVkVmlld3Nbdmlld0luZGV4IC0gMV07XG4gICAgICByZWZOb2RlID0gcHJldlZpZXcucm9vdE5vZGVzT3JBcHBFbGVtZW50cy5sZW5ndGggPiAwID9cbiAgICAgICAgICAgICAgICAgICAgcHJldlZpZXcucm9vdE5vZGVzT3JBcHBFbGVtZW50c1twcmV2Vmlldy5yb290Tm9kZXNPckFwcEVsZW1lbnRzLmxlbmd0aCAtIDFdIDpcbiAgICAgICAgICAgICAgICAgICAgbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVmTm9kZSA9IHZjQXBwRWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIH1cbiAgICBpZiAoaXNQcmVzZW50KHJlZk5vZGUpKSB7XG4gICAgICB2YXIgcmVmUmVuZGVyTm9kZSA9IGZpbmRMYXN0UmVuZGVyTm9kZShyZWZOb2RlKTtcbiAgICAgIHZpZXcucmVuZGVyZXIuYXR0YWNoVmlld0FmdGVyKHJlZlJlbmRlck5vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGF0dGVuTmVzdGVkVmlld1JlbmRlck5vZGVzKHZpZXcucm9vdE5vZGVzT3JBcHBFbGVtZW50cykpO1xuICAgIH1cbiAgICAvLyBUT0RPOiBUaGlzIGlzIG9ubHkgbmVlZGVkIHdoZW4gYSB2aWV3IGlzIGRlc3Ryb3llZCxcbiAgICAvLyBub3Qgd2hlbiBpdCBpcyBkZXRhY2hlZCBmb3IgcmVvcmRlcmluZyB3aXRoIG5nLWZvci4uLlxuICAgIHZjQXBwRWxlbWVudC5wYXJlbnRWaWV3LmNoYW5nZURldGVjdG9yLmFkZENvbnRlbnRDaGlsZCh2aWV3LmNoYW5nZURldGVjdG9yKTtcbiAgICB2Y0FwcEVsZW1lbnQudHJhdmVyc2VBbmRTZXRRdWVyaWVzQXNEaXJ0eSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGV0YWNoVmlld0luQ29udGFpbmVyKHZjQXBwRWxlbWVudDogQXBwRWxlbWVudCwgdmlld0luZGV4OiBudW1iZXIpOiBBcHBWaWV3IHtcbiAgICB2YXIgdmlldyA9IExpc3RXcmFwcGVyLnJlbW92ZUF0KHZjQXBwRWxlbWVudC5uZXN0ZWRWaWV3cywgdmlld0luZGV4KTtcbiAgICBpZiAodmlldy5wcm90by50eXBlID09PSBWaWV3VHlwZS5DT01QT05FTlQpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBDb21wb25lbnQgdmlld3MgY2FuJ3QgYmUgbW92ZWQhYCk7XG4gICAgfVxuICAgIHZjQXBwRWxlbWVudC50cmF2ZXJzZUFuZFNldFF1ZXJpZXNBc0RpcnR5KCk7XG5cbiAgICB2aWV3LnJlbmRlcmVyLmRldGFjaFZpZXcoZmxhdHRlbk5lc3RlZFZpZXdSZW5kZXJOb2Rlcyh2aWV3LnJvb3ROb2Rlc09yQXBwRWxlbWVudHMpKTtcblxuICAgIC8vIFRPRE86IFRoaXMgaXMgb25seSBuZWVkZWQgd2hlbiBhIHZpZXcgaXMgZGVzdHJveWVkLFxuICAgIC8vIG5vdCB3aGVuIGl0IGlzIGRldGFjaGVkIGZvciByZW9yZGVyaW5nIHdpdGggbmctZm9yLi4uXG4gICAgdmlldy5jaGFuZ2VEZXRlY3Rvci5yZW1vdmUoKTtcbiAgICByZXR1cm4gdmlldztcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
