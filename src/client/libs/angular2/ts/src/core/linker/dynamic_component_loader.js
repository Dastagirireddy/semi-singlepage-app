System.register(['angular2/src/core/di', './compiler', 'angular2/src/facade/lang', 'angular2/src/core/linker/view_manager'], function(exports_1, context_1) {
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
    var di_1, compiler_1, lang_1, view_manager_1;
    var ComponentRef, ComponentRef_, DynamicComponentLoader, DynamicComponentLoader_;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (compiler_1_1) {
                compiler_1 = compiler_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (view_manager_1_1) {
                view_manager_1 = view_manager_1_1;
            }],
        execute: function() {
            /**
             * Represents an instance of a Component created via {@link DynamicComponentLoader}.
             *
             * `ComponentRef` provides access to the Component Instance as well other objects related to this
             * Component Instance and allows you to destroy the Component Instance via the {@link #dispose}
             * method.
             */
            ComponentRef = (function () {
                function ComponentRef() {
                }
                Object.defineProperty(ComponentRef.prototype, "hostView", {
                    /**
                     * The {@link ViewRef} of the Host View of this Component instance.
                     */
                    get: function () {
                        return this.location.internalElement.parentView.ref;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ComponentRef.prototype, "hostComponent", {
                    /**
                     * @internal
                     *
                     * The instance of the component.
                     *
                     * TODO(i): this api should be removed
                     */
                    get: function () { return this.instance; },
                    enumerable: true,
                    configurable: true
                });
                return ComponentRef;
            }());
            exports_1("ComponentRef", ComponentRef);
            ComponentRef_ = (function (_super) {
                __extends(ComponentRef_, _super);
                /**
                 * TODO(i): refactor into public/private fields
                 */
                function ComponentRef_(location, instance, componentType, injector, _dispose) {
                    _super.call(this);
                    this._dispose = _dispose;
                    this.location = location;
                    this.instance = instance;
                    this.componentType = componentType;
                    this.injector = injector;
                }
                Object.defineProperty(ComponentRef_.prototype, "hostComponentType", {
                    /**
                     * @internal
                     *
                     * Returns the type of this Component instance.
                     *
                     * TODO(i): this api should be removed
                     */
                    get: function () { return this.componentType; },
                    enumerable: true,
                    configurable: true
                });
                ComponentRef_.prototype.dispose = function () { this._dispose(); };
                return ComponentRef_;
            }(ComponentRef));
            exports_1("ComponentRef_", ComponentRef_);
            /**
             * Service for instantiating a Component and attaching it to a View at a specified location.
             */
            DynamicComponentLoader = (function () {
                function DynamicComponentLoader() {
                }
                return DynamicComponentLoader;
            }());
            exports_1("DynamicComponentLoader", DynamicComponentLoader);
            DynamicComponentLoader_ = (function (_super) {
                __extends(DynamicComponentLoader_, _super);
                function DynamicComponentLoader_(_compiler, _viewManager) {
                    _super.call(this);
                    this._compiler = _compiler;
                    this._viewManager = _viewManager;
                }
                DynamicComponentLoader_.prototype.loadAsRoot = function (type, overrideSelector, injector, onDispose, projectableNodes) {
                    var _this = this;
                    return this._compiler.compileInHost(type).then(function (hostProtoViewRef) {
                        var hostViewRef = _this._viewManager.createRootHostView(hostProtoViewRef, overrideSelector, injector, projectableNodes);
                        var newLocation = _this._viewManager.getHostElement(hostViewRef);
                        var component = _this._viewManager.getComponent(newLocation);
                        var dispose = function () {
                            if (lang_1.isPresent(onDispose)) {
                                onDispose();
                            }
                            _this._viewManager.destroyRootHostView(hostViewRef);
                        };
                        return new ComponentRef_(newLocation, component, type, injector, dispose);
                    });
                };
                DynamicComponentLoader_.prototype.loadIntoLocation = function (type, hostLocation, anchorName, providers, projectableNodes) {
                    if (providers === void 0) { providers = null; }
                    if (projectableNodes === void 0) { projectableNodes = null; }
                    return this.loadNextToLocation(type, this._viewManager.getNamedElementInComponentView(hostLocation, anchorName), providers, projectableNodes);
                };
                DynamicComponentLoader_.prototype.loadNextToLocation = function (type, location, providers, projectableNodes) {
                    var _this = this;
                    if (providers === void 0) { providers = null; }
                    if (projectableNodes === void 0) { projectableNodes = null; }
                    return this._compiler.compileInHost(type).then(function (hostProtoViewRef) {
                        var viewContainer = _this._viewManager.getViewContainer(location);
                        var hostViewRef = viewContainer.createHostView(hostProtoViewRef, viewContainer.length, providers, projectableNodes);
                        var newLocation = _this._viewManager.getHostElement(hostViewRef);
                        var component = _this._viewManager.getComponent(newLocation);
                        var dispose = function () {
                            var index = viewContainer.indexOf(hostViewRef);
                            if (!hostViewRef.destroyed && index !== -1) {
                                viewContainer.remove(index);
                            }
                        };
                        return new ComponentRef_(newLocation, component, type, null, dispose);
                    });
                };
                DynamicComponentLoader_ = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [compiler_1.Compiler, view_manager_1.AppViewManager])
                ], DynamicComponentLoader_);
                return DynamicComponentLoader_;
            }(DynamicComponentLoader));
            exports_1("DynamicComponentLoader_", DynamicComponentLoader_);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvbGlua2VyL2R5bmFtaWNfY29tcG9uZW50X2xvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBT0E7Ozs7OztlQU1HO1lBQ0g7Z0JBQUE7Z0JBZ0RBLENBQUM7Z0JBbkJDLHNCQUFJLGtDQUFRO29CQUhaOzt1QkFFRzt5QkFDSDt3QkFDRSxNQUFNLENBQWUsSUFBSSxDQUFDLFFBQVMsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztvQkFDckUsQ0FBQzs7O21CQUFBO2dCQVNELHNCQUFJLHVDQUFhO29CQVBqQjs7Ozs7O3VCQU1HO3lCQUNILGNBQTJCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQVFwRCxtQkFBQztZQUFELENBaERBLEFBZ0RDLElBQUE7WUFoREQsdUNBZ0RDLENBQUE7WUFFRDtnQkFBbUMsaUNBQVk7Z0JBQzdDOzttQkFFRztnQkFDSCx1QkFBWSxRQUFvQixFQUFFLFFBQWEsRUFBRSxhQUFtQixFQUFFLFFBQWtCLEVBQ3BFLFFBQW9CO29CQUN0QyxpQkFBTyxDQUFDO29CQURVLGFBQVEsR0FBUixRQUFRLENBQVk7b0JBRXRDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO29CQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztvQkFDekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7b0JBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO2dCQUMzQixDQUFDO2dCQVNELHNCQUFJLDRDQUFpQjtvQkFQckI7Ozs7Ozt1QkFNRzt5QkFDSCxjQUFnQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFFNUQsK0JBQU8sR0FBUCxjQUFrQixJQUFJLENBQUMs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WUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUU1RCxJQUFJLE9BQU8sR0FBRzs0QkFDWixJQUFJLEtBQUssR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDOzRCQUMvQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDM0MsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDOUIsQ0FBQzt3QkFDSCxDQUFDLENBQUM7d0JBQ0YsTUFBTSxDQUFDLElBQUksYUFBYSxDQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDeEUsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQztnQkEvQ0g7b0JBQUMsZUFBVSxFQUFFOzsyQ0FBQTtnQkFnRGIsOEJBQUM7WUFBRCxDQS9DQSxBQStDQyxDQS9DNEMsc0JBQXNCLEdBK0NsRTtZQS9DRCw2REErQ0MsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2xpbmtlci9keW5hbWljX2NvbXBvbmVudF9sb2FkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0tleSwgSW5qZWN0b3IsIFJlc29sdmVkUHJvdmlkZXIsIFByb3ZpZGVyLCBwcm92aWRlLCBJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge0NvbXBpbGVyfSBmcm9tICcuL2NvbXBpbGVyJztcbmltcG9ydCB7aXNUeXBlLCBUeXBlLCBzdHJpbmdpZnksIGlzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QXBwVmlld01hbmFnZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci92aWV3X21hbmFnZXInO1xuaW1wb3J0IHtFbGVtZW50UmVmLCBFbGVtZW50UmVmX30gZnJvbSAnLi9lbGVtZW50X3JlZic7XG5pbXBvcnQge0hvc3RWaWV3UmVmfSBmcm9tICcuL3ZpZXdfcmVmJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGluc3RhbmNlIG9mIGEgQ29tcG9uZW50IGNyZWF0ZWQgdmlhIHtAbGluayBEeW5hbWljQ29tcG9uZW50TG9hZGVyfS5cbiAqXG4gKiBgQ29tcG9uZW50UmVmYCBwcm92aWRlcyBhY2Nlc3MgdG8gdGhlIENvbXBvbmVudCBJbnN0YW5jZSBhcyB3ZWxsIG90aGVyIG9iamVjdHMgcmVsYXRlZCB0byB0aGlzXG4gKiBDb21wb25lbnQgSW5zdGFuY2UgYW5kIGFsbG93cyB5b3UgdG8gZGVzdHJveSB0aGUgQ29tcG9uZW50IEluc3RhbmNlIHZpYSB0aGUge0BsaW5rICNkaXNwb3NlfVxuICogbWV0aG9kLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29tcG9uZW50UmVmIHtcbiAgLyoqXG4gICAqIFRoZSBpbmplY3RvciBwcm92aWRlZCB7QGxpbmsgRHluYW1pY0NvbXBvbmVudExvYWRlciNsb2FkQXNSb290fS5cbiAgICpcbiAgICogVE9ETyhpKTogdGhpcyBhcGkgaXMgdXNlbGVzcyBhbmQgc2hvdWxkIGJlIHJlcGxhY2VkIGJ5IGFuIGluamVjdG9yIHJldHJpZXZlZCBmcm9tXG4gICAqICAgICB0aGUgSG9zdEVsZW1lbnRSZWYsIHdoaWNoIGlzIGN1cnJlbnRseSBub3QgcG9zc2libGUuXG4gICAqL1xuICBpbmplY3RvcjogSW5qZWN0b3I7XG5cbiAgLyoqXG4gICAqIExvY2F0aW9uIG9mIHRoZSBIb3N0IEVsZW1lbnQgb2YgdGhpcyBDb21wb25lbnQgSW5zdGFuY2UuXG4gICAqL1xuICBsb2NhdGlvbjogRWxlbWVudFJlZjtcblxuICAvKipcbiAgICogVGhlIGluc3RhbmNlIG9mIHRoZSBDb21wb25lbnQuXG4gICAqL1xuICBpbnN0YW5jZTogYW55O1xuXG4gIC8qKlxuICAgKiBUaGUgdXNlciBkZWZpbmVkIGNvbXBvbmVudCB0eXBlLCByZXByZXNlbnRlZCB2aWEgdGhlIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICAgKlxuICAgKiA8IS0tIFRPRE86IGN1c3RvbWl6ZSB3b3JkaW5nIGZvciBEYXJ0IGRvY3MgLS0+XG4gICAqL1xuICBjb21wb25lbnRUeXBlOiBUeXBlO1xuXG4gIC8qKlxuICAgKiBUaGUge0BsaW5rIFZpZXdSZWZ9IG9mIHRoZSBIb3N0IFZpZXcgb2YgdGhpcyBDb21wb25lbnQgaW5zdGFuY2UuXG4gICAqL1xuICBnZXQgaG9zdFZpZXcoKTogSG9zdFZpZXdSZWYge1xuICAgIHJldHVybiAoPEVsZW1lbnRSZWZfPnRoaXMubG9jYXRpb24pLmludGVybmFsRWxlbWVudC5wYXJlbnRWaWV3LnJlZjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICpcbiAgICogVGhlIGluc3RhbmNlIG9mIHRoZSBjb21wb25lbnQuXG4gICAqXG4gICAqIFRPRE8oaSk6IHRoaXMgYXBpIHNob3VsZCBiZSByZW1vdmVkXG4gICAqL1xuICBnZXQgaG9zdENvbXBvbmVudCgpOiBhbnkgeyByZXR1cm4gdGhpcy5pbnN0YW5jZTsgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyB0aGUgY29tcG9uZW50IGluc3RhbmNlIGFuZCBhbGwgb2YgdGhlIGRhdGEgc3RydWN0dXJlcyBhc3NvY2lhdGVkIHdpdGggaXQuXG4gICAqXG4gICAqIFRPRE8oaSk6IHJlbmFtZSB0byBkZXN0cm95IHRvIGJlIGNvbnNpc3RlbnQgd2l0aCBBcHBWaWV3TWFuYWdlciBhbmQgVmlld0NvbnRhaW5lclJlZlxuICAgKi9cbiAgYWJzdHJhY3QgZGlzcG9zZSgpOiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50UmVmXyBleHRlbmRzIENvbXBvbmVudFJlZiB7XG4gIC8qKlxuICAgKiBUT0RPKGkpOiByZWZhY3RvciBpbnRvIHB1YmxpYy9wcml2YXRlIGZpZWxkc1xuICAgKi9cbiAgY29uc3RydWN0b3IobG9jYXRpb246IEVsZW1lbnRSZWYsIGluc3RhbmNlOiBhbnksIGNvbXBvbmVudFR5cGU6IFR5cGUsIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfZGlzcG9zZTogKCkgPT4gdm9pZCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5sb2NhdGlvbiA9IGxvY2F0aW9uO1xuICAgIHRoaXMuaW5zdGFuY2UgPSBpbnN0YW5jZTtcbiAgICB0aGlzLmNvbXBvbmVudFR5cGUgPSBjb21wb25lbnRUeXBlO1xuICAgIHRoaXMuaW5qZWN0b3IgPSBpbmplY3RvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICpcbiAgICogUmV0dXJucyB0aGUgdHlwZSBvZiB0aGlzIENvbXBvbmVudCBpbnN0YW5jZS5cbiAgICpcbiAgICogVE9ETyhpKTogdGhpcyBhcGkgc2hvdWxkIGJlIHJlbW92ZWRcbiAgICovXG4gIGdldCBob3N0Q29tcG9uZW50VHlwZSgpOiBUeXBlIHsgcmV0dXJuIHRoaXMuY29tcG9uZW50VHlwZTsgfVxuXG4gIGRpc3Bvc2UoKTogdm9pZCB7IHRoaXMuX2Rpc3Bvc2UoKTsgfVxufVxuXG4vKipcbiAqIFNlcnZpY2UgZm9yIGluc3RhbnRpYXRpbmcgYSBDb21wb25lbnQgYW5kIGF0dGFjaGluZyBpdCB0byBhIFZpZXcgYXQgYSBzcGVjaWZpZWQgbG9jYXRpb24uXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEeW5hbWljQ29tcG9uZW50TG9hZGVyIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgYSBDb21wb25lbnQgYHR5cGVgIGFuZCBhdHRhY2hlcyBpdCB0byB0aGUgZmlyc3QgZWxlbWVudCBpbiB0aGVcbiAgICogcGxhdGZvcm0tc3BlY2lmaWMgZ2xvYmFsIHZpZXcgdGhhdCBtYXRjaGVzIHRoZSBjb21wb25lbnQncyBzZWxlY3Rvci5cbiAgICpcbiAgICogSW4gYSBicm93c2VyIHRoZSBwbGF0Zm9ybS1zcGVjaWZpYyBnbG9iYWwgdmlldyBpcyB0aGUgbWFpbiBET00gRG9jdW1lbnQuXG4gICAqXG4gICAqIElmIG5lZWRlZCwgdGhlIGNvbXBvbmVudCdzIHNlbGVjdG9yIGNhbiBiZSBvdmVycmlkZGVuIHZpYSBgb3ZlcnJpZGVTZWxlY3RvcmAuXG4gICAqXG4gICAqIFlvdSBjYW4gb3B0aW9uYWxseSBwcm92aWRlIGBpbmplY3RvcmAgYW5kIHRoaXMge0BsaW5rIEluamVjdG9yfSB3aWxsIGJlIHVzZWQgdG8gaW5zdGFudGlhdGUgdGhlXG4gICAqIENvbXBvbmVudC5cbiAgICpcbiAgICogVG8gYmUgbm90aWZpZWQgd2hlbiB0aGlzIENvbXBvbmVudCBpbnN0YW5jZSBpcyBkZXN0cm95ZWQsIHlvdSBjYW4gYWxzbyBvcHRpb25hbGx5IHByb3ZpZGVcbiAgICogYG9uRGlzcG9zZWAgY2FsbGJhY2suXG4gICAqXG4gICAqIFJldHVybnMgYSBwcm9taXNlIGZvciB0aGUge0BsaW5rIENvbXBvbmVudFJlZn0gcmVwcmVzZW50aW5nIHRoZSBuZXdseSBjcmVhdGVkIENvbXBvbmVudC5cbiAgICpcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICogYGBgXG4gICAqIEBDb21wb25lbnQoe1xuICAgKiAgIHNlbGVjdG9yOiAnY2hpbGQtY29tcG9uZW50JyxcbiAgICogICB0ZW1wbGF0ZTogJ0NoaWxkJ1xuICAgKiB9KVxuICAgKiBjbGFzcyBDaGlsZENvbXBvbmVudCB7XG4gICAqIH1cbiAgICpcbiAgICogQENvbXBvbmVudCh7XG4gICAqICAgc2VsZWN0b3I6ICdteS1hcHAnLFxuICAgKiAgIHRlbXBsYXRlOiAnUGFyZW50ICg8Y2hpbGQgaWQ9XCJjaGlsZFwiPjwvY2hpbGQ+KSdcbiAgICogfSlcbiAgICogY2xhc3MgTXlBcHAge1xuICAgKiAgIGNvbnN0cnVjdG9yKGRjbDogRHluYW1pY0NvbXBvbmVudExvYWRlciwgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAqICAgICBkY2wubG9hZEFzUm9vdChDaGlsZENvbXBvbmVudCwgJyNjaGlsZCcsIGluamVjdG9yKTtcbiAgICogICB9XG4gICAqIH1cbiAgICpcbiAgICogYm9vdHN0cmFwKE15QXBwKTtcbiAgICogYGBgXG4gICAqXG4gICAqIFJlc3VsdGluZyBET006XG4gICAqXG4gICAqIGBgYFxuICAgKiA8bXktYXBwPlxuICAgKiAgIFBhcmVudCAoXG4gICAqICAgICA8Y2hpbGQgaWQ9XCJjaGlsZFwiPkNoaWxkPC9jaGlsZD5cbiAgICogICApXG4gICAqIDwvbXktYXBwPlxuICAgKiBgYGBcbiAgICovXG4gIGFic3RyYWN0IGxvYWRBc1Jvb3QodHlwZTogVHlwZSwgb3ZlcnJpZGVTZWxlY3Rvcjogc3RyaW5nLCBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgICAgICAgICAgICAgICAgb25EaXNwb3NlPzogKCkgPT4gdm9pZCwgcHJvamVjdGFibGVOb2Rlcz86IGFueVtdW10pOiBQcm9taXNlPENvbXBvbmVudFJlZj47XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgYSBDb21wb25lbnQgYW5kIGF0dGFjaGVzIGl0IHRvIGEgVmlldyBDb250YWluZXIgbG9jYXRlZCBpbnNpZGUgb2YgdGhlXG4gICAqIENvbXBvbmVudCBWaWV3IG9mIGFub3RoZXIgQ29tcG9uZW50IGluc3RhbmNlLlxuICAgKlxuICAgKiBUaGUgdGFyZ2V0ZWQgQ29tcG9uZW50IEluc3RhbmNlIGlzIHNwZWNpZmllZCB2aWEgaXRzIGBob3N0TG9jYXRpb25gIHtAbGluayBFbGVtZW50UmVmfS4gVGhlXG4gICAqIGxvY2F0aW9uIHdpdGhpbiB0aGUgQ29tcG9uZW50IFZpZXcgb2YgdGhpcyBDb21wb25lbnQgSW5zdGFuY2UgaXMgc3BlY2lmaWVkIHZpYSBgYW5jaG9yTmFtZWBcbiAgICogVGVtcGxhdGUgVmFyaWFibGUgTmFtZS5cbiAgICpcbiAgICogWW91IGNhbiBvcHRpb25hbGx5IHByb3ZpZGUgYHByb3ZpZGVyc2AgdG8gY29uZmlndXJlIHRoZSB7QGxpbmsgSW5qZWN0b3J9IHByb3Zpc2lvbmVkIGZvciB0aGlzXG4gICAqIENvbXBvbmVudCBJbnN0YW5jZS5cbiAgICpcbiAgICogUmV0dXJucyBhIHByb21pc2UgZm9yIHRoZSB7QGxpbmsgQ29tcG9uZW50UmVmfSByZXByZXNlbnRpbmcgdGhlIG5ld2x5IGNyZWF0ZWQgQ29tcG9uZW50LlxuICAgKlxuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiBgYGBcbiAgICogQENvbXBvbmVudCh7XG4gICAqICAgc2VsZWN0b3I6ICdjaGlsZC1jb21wb25lbnQnLFxuICAgKiAgIHRlbXBsYXRlOiAnQ2hpbGQnXG4gICAqIH0pXG4gICAqIGNsYXNzIENoaWxkQ29tcG9uZW50IHtcbiAgICogfVxuICAgKlxuICAgKiBAQ29tcG9uZW50KHtcbiAgICogICBzZWxlY3RvcjogJ215LWFwcCcsXG4gICAqICAgdGVtcGxhdGU6ICdQYXJlbnQgKDxkaXYgI2NoaWxkPjwvZGl2PiknXG4gICAqIH0pXG4gICAqIGNsYXNzIE15QXBwIHtcbiAgICogICBjb25zdHJ1Y3RvcihkY2w6IER5bmFtaWNDb21wb25lbnRMb2FkZXIsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICogICAgIGRjbC5sb2FkSW50b0xvY2F0aW9uKENoaWxkQ29tcG9uZW50LCBlbGVtZW50UmVmLCAnY2hpbGQnKTtcbiAgICogICB9XG4gICAqIH1cbiAgICpcbiAgICogYm9vdHN0cmFwKE15QXBwKTtcbiAgICogYGBgXG4gICAqXG4gICAqIFJlc3VsdGluZyBET006XG4gICAqXG4gICAqIGBgYFxuICAgKiA8bXktYXBwPlxuICAgKiAgICBQYXJlbnQgKFxuICAgKiAgICAgIDxkaXYgI2NoaWxkPVwiXCIgY2xhc3M9XCJuZy1iaW5kaW5nXCI+PC9kaXY+XG4gICAqICAgICAgPGNoaWxkLWNvbXBvbmVudCBjbGFzcz1cIm5nLWJpbmRpbmdcIj5DaGlsZDwvY2hpbGQtY29tcG9uZW50PlxuICAgKiAgICApXG4gICAqIDwvbXktYXBwPlxuICAgKiBgYGBcbiAgICovXG4gIGFic3RyYWN0IGxvYWRJbnRvTG9jYXRpb24odHlwZTogVHlwZSwgaG9zdExvY2F0aW9uOiBFbGVtZW50UmVmLCBhbmNob3JOYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXJzPzogUmVzb2x2ZWRQcm92aWRlcltdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3RhYmxlTm9kZXM/OiBhbnlbXVtdKTogUHJvbWlzZTxDb21wb25lbnRSZWY+O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIGEgQ29tcG9uZW50IGFuZCBhdHRhY2hlcyBpdCB0byB0aGUgVmlldyBDb250YWluZXIgZm91bmQgYXQgdGhlXG4gICAqIGBsb2NhdGlvbmAgc3BlY2lmaWVkIGFzIHtAbGluayBFbGVtZW50UmVmfS5cbiAgICpcbiAgICogWW91IGNhbiBvcHRpb25hbGx5IHByb3ZpZGUgYHByb3ZpZGVyc2AgdG8gY29uZmlndXJlIHRoZSB7QGxpbmsgSW5qZWN0b3J9IHByb3Zpc2lvbmVkIGZvciB0aGlzXG4gICAqIENvbXBvbmVudCBJbnN0YW5jZS5cbiAgICpcbiAgICogUmV0dXJucyBhIHByb21pc2UgZm9yIHRoZSB7QGxpbmsgQ29tcG9uZW50UmVmfSByZXByZXNlbnRpbmcgdGhlIG5ld2x5IGNyZWF0ZWQgQ29tcG9uZW50LlxuICAgKlxuICAgKlxuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiBgYGBcbiAgICogQENvbXBvbmVudCh7XG4gICAqICAgc2VsZWN0b3I6ICdjaGlsZC1jb21wb25lbnQnLFxuICAgKiAgIHRlbXBsYXRlOiAnQ2hpbGQnXG4gICAqIH0pXG4gICAqIGNsYXNzIENoaWxkQ29tcG9uZW50IHtcbiAgICogfVxuICAgKlxuICAgKiBAQ29tcG9uZW50KHtcbiAgICogICBzZWxlY3RvcjogJ215LWFwcCcsXG4gICAqICAgdGVtcGxhdGU6ICdQYXJlbnQnXG4gICAqIH0pXG4gICAqIGNsYXNzIE15QXBwIHtcbiAgICogICBjb25zdHJ1Y3RvcihkY2w6IER5bmFtaWNDb21wb25lbnRMb2FkZXIsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICogICAgIGRjbC5sb2FkTmV4dFRvTG9jYXRpb24oQ2hpbGRDb21wb25lbnQsIGVsZW1lbnRSZWYpO1xuICAgKiAgIH1cbiAgICogfVxuICAgKlxuICAgKiBib290c3RyYXAoTXlBcHApO1xuICAgKiBgYGBcbiAgICpcbiAgICogUmVzdWx0aW5nIERPTTpcbiAgICpcbiAgICogYGBgXG4gICAqIDxteS1hcHA+UGFyZW50PC9teS1hcHA+XG4gICAqIDxjaGlsZC1jb21wb25lbnQ+Q2hpbGQ8L2NoaWxkLWNvbXBvbmVudD5cbiAgICogYGBgXG4gICAqL1xuICBhYnN0cmFjdCBsb2FkTmV4dFRvTG9jYXRpb24odHlwZTogVHlwZSwgbG9jYXRpb246IEVsZW1lbnRSZWYsIHByb3ZpZGVycz86IFJlc29sdmVkUHJvdmlkZXJbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3RhYmxlTm9kZXM/OiBhbnlbXVtdKTogUHJvbWlzZTxDb21wb25lbnRSZWY+O1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRHluYW1pY0NvbXBvbmVudExvYWRlcl8gZXh0ZW5kcyBEeW5hbWljQ29tcG9uZW50TG9hZGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY29tcGlsZXI6IENvbXBpbGVyLCBwcml2YXRlIF92aWV3TWFuYWdlcjogQXBwVmlld01hbmFnZXIpIHsgc3VwZXIoKTsgfVxuXG4gIGxvYWRBc1Jvb3QodHlwZTogVHlwZSwgb3ZlcnJpZGVTZWxlY3Rvcjogc3RyaW5nLCBpbmplY3RvcjogSW5qZWN0b3IsIG9uRGlzcG9zZT86ICgpID0+IHZvaWQsXG4gICAgICAgICAgICAgcHJvamVjdGFibGVOb2Rlcz86IGFueVtdW10pOiBQcm9taXNlPENvbXBvbmVudFJlZj4ge1xuICAgIHJldHVybiB0aGlzLl9jb21waWxlci5jb21waWxlSW5Ib3N0KHR5cGUpLnRoZW4oaG9zdFByb3RvVmlld1JlZiA9PiB7XG4gICAgICB2YXIgaG9zdFZpZXdSZWYgPSB0aGlzLl92aWV3TWFuYWdlci5jcmVhdGVSb290SG9zdFZpZXcoaG9zdFByb3RvVmlld1JlZiwgb3ZlcnJpZGVTZWxlY3RvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmplY3RvciwgcHJvamVjdGFibGVOb2Rlcyk7XG4gICAgICB2YXIgbmV3TG9jYXRpb24gPSB0aGlzLl92aWV3TWFuYWdlci5nZXRIb3N0RWxlbWVudChob3N0Vmlld1JlZik7XG4gICAgICB2YXIgY29tcG9uZW50ID0gdGhpcy5fdmlld01hbmFnZXIuZ2V0Q29tcG9uZW50KG5ld0xvY2F0aW9uKTtcblxuICAgICAgdmFyIGRpc3Bvc2UgPSAoKSA9PiB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQob25EaXNwb3NlKSkge1xuICAgICAgICAgIG9uRGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3ZpZXdNYW5hZ2VyLmRlc3Ryb3lSb290SG9zdFZpZXcoaG9zdFZpZXdSZWYpO1xuICAgICAgfTtcbiAgICAgIHJldHVybiBuZXcgQ29tcG9uZW50UmVmXyhuZXdMb2NhdGlvbiwgY29tcG9uZW50LCB0eXBlLCBpbmplY3RvciwgZGlzcG9zZSk7XG4gICAgfSk7XG4gIH1cblxuICBsb2FkSW50b0xvY2F0aW9uKHR5cGU6IFR5cGUsIGhvc3RMb2NhdGlvbjogRWxlbWVudFJlZiwgYW5jaG9yTmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyczogUmVzb2x2ZWRQcm92aWRlcltdID0gbnVsbCxcbiAgICAgICAgICAgICAgICAgICBwcm9qZWN0YWJsZU5vZGVzOiBhbnlbXVtdID0gbnVsbCk6IFByb21pc2U8Q29tcG9uZW50UmVmPiB7XG4gICAgcmV0dXJuIHRoaXMubG9hZE5leHRUb0xvY2F0aW9uKFxuICAgICAgICB0eXBlLCB0aGlzLl92aWV3TWFuYWdlci5nZXROYW1lZEVsZW1lbnRJbkNvbXBvbmVudFZpZXcoaG9zdExvY2F0aW9uLCBhbmNob3JOYW1lKSwgcHJvdmlkZXJzLFxuICAgICAgICBwcm9qZWN0YWJsZU5vZGVzKTtcbiAgfVxuXG4gIGxvYWROZXh0VG9Mb2NhdGlvbih0eXBlOiBUeXBlLCBsb2NhdGlvbjogRWxlbWVudFJlZiwgcHJvdmlkZXJzOiBSZXNvbHZlZFByb3ZpZGVyW10gPSBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgcHJvamVjdGFibGVOb2RlczogYW55W11bXSA9IG51bGwpOiBQcm9taXNlPENvbXBvbmVudFJlZj4ge1xuICAgIHJldHVybiB0aGlzLl9jb21waWxlci5jb21waWxlSW5Ib3N0KHR5cGUpLnRoZW4oaG9zdFByb3RvVmlld1JlZiA9PiB7XG4gICAgICB2YXIgdmlld0NvbnRhaW5lciA9IHRoaXMuX3ZpZXdNYW5hZ2VyLmdldFZpZXdDb250YWluZXIobG9jYXRpb24pO1xuICAgICAgdmFyIGhvc3RWaWV3UmVmID0gdmlld0NvbnRhaW5lci5jcmVhdGVIb3N0Vmlldyhob3N0UHJvdG9WaWV3UmVmLCB2aWV3Q29udGFpbmVyLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXJzLCBwcm9qZWN0YWJsZU5vZGVzKTtcbiAgICAgIHZhciBuZXdMb2NhdGlvbiA9IHRoaXMuX3ZpZXdNYW5hZ2VyLmdldEhvc3RFbGVtZW50KGhvc3RWaWV3UmVmKTtcbiAgICAgIHZhciBjb21wb25lbnQgPSB0aGlzLl92aWV3TWFuYWdlci5nZXRDb21wb25lbnQobmV3TG9jYXRpb24pO1xuXG4gICAgICB2YXIgZGlzcG9zZSA9ICgpID0+IHtcbiAgICAgICAgdmFyIGluZGV4ID0gdmlld0NvbnRhaW5lci5pbmRleE9mKGhvc3RWaWV3UmVmKTtcbiAgICAgICAgaWYgKCFob3N0Vmlld1JlZi5kZXN0cm95ZWQgJiYgaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgdmlld0NvbnRhaW5lci5yZW1vdmUoaW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmV0dXJuIG5ldyBDb21wb25lbnRSZWZfKG5ld0xvY2F0aW9uLCBjb21wb25lbnQsIHR5cGUsIG51bGwsIGRpc3Bvc2UpO1xuICAgIH0pO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
