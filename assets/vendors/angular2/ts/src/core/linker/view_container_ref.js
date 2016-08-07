System.register(['angular2/src/facade/collection', 'angular2/src/facade/exceptions', 'angular2/src/facade/lang', '../profile/profile'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var collection_1, exceptions_1, lang_1, profile_1;
    var ViewContainerRef, ViewContainerRef_;
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (profile_1_1) {
                profile_1 = profile_1_1;
            }],
        execute: function() {
            /**
             * Represents a container where one or more Views can be attached.
             *
             * The container can contain two kinds of Views. Host Views, created by instantiating a
             * {@link Component} via {@link #createComponent}, and Embedded Views, created by instantiating an
             * {@link TemplateRef Embedded Template} via {@link #createEmbeddedView}.
             *
             * The location of the View Container within the containing View is specified by the Anchor
             * `element`. Each View Container can have only one Anchor Element and each Anchor Element can only
             * have a single View Container.
             *
             * Root elements of Views attached to this container become siblings of the Anchor Element in
             * the Rendered View.
             *
             * To access a `ViewContainerRef` of an Element, you can either place a {@link Directive} injected
             * with `ViewContainerRef` on the Element, or you obtain it via a {@link ViewChild} query.
             */
            ViewContainerRef = (function () {
                function ViewContainerRef() {
                }
                Object.defineProperty(ViewContainerRef.prototype, "element", {
                    /**
                     * Anchor element that specifies the location of this container in the containing View.
                     * <!-- TODO: rename to anchorElement -->
                     */
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ViewContainerRef.prototype, "injector", {
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ViewContainerRef.prototype, "parentInjector", {
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ViewContainerRef.prototype, "length", {
                    /**
                     * Returns the number of Views currently attached to this container.
                     */
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                ;
                return ViewContainerRef;
            }());
            exports_1("ViewContainerRef", ViewContainerRef);
            ViewContainerRef_ = (function () {
                function ViewContainerRef_(_element) {
                    this._element = _element;
                    /** @internal */
                    this._createComponentInContainerScope = profile_1.wtfCreateScope('ViewContainerRef#createComponent()');
                    /** @internal */
                    this._insertScope = profile_1.wtfCreateScope('ViewContainerRef#insert()');
                    /** @internal */
                    this._removeScope = profile_1.wtfCreateScope('ViewContainerRef#remove()');
                    /** @internal */
                    this._detachScope = profile_1.wtfCreateScope('ViewContainerRef#detach()');
                }
                ViewContainerRef_.prototype.get = function (index) { return this._element.nestedViews[index].ref; };
                Object.defineProperty(ViewContainerRef_.prototype, "length", {
                    get: function () {
                        var views = this._element.nestedViews;
                        return lang_1.isPresent(views) ? views.length : 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ViewContainerRef_.prototype, "element", {
                    get: function () { return this._element.elementRef; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ViewContainerRef_.prototype, "injector", {
                    get: function () { return this._element.injector; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ViewContainerRef_.prototype, "parentInjector", {
                    get: function () { return this._element.parentInjector; },
                    enumerable: true,
                    configurable: true
                });
                // TODO(rado): profile and decide whether bounds checks should be added
                // to the methods below.
                ViewContainerRef_.prototype.createEmbeddedView = function (templateRef, index) {
                    if (index === void 0) { index = -1; }
                    var viewRef = templateRef.createEmbeddedView();
                    this.insert(viewRef, index);
                    return viewRef;
                };
                ViewContainerRef_.prototype.createComponent = function (componentFactory, index, injector, projectableNodes) {
                    if (index === void 0) { index = -1; }
                    if (injector === void 0) { injector = null; }
                    if (projectableNodes === void 0) { projectableNodes = null; }
                    var s = this._createComponentInContainerScope();
                    var contextInjector = lang_1.isPresent(injector) ? injector : this._element.parentInjector;
                    var componentRef = componentFactory.create(contextInjector, projectableNodes);
                    this.insert(componentRef.hostView, index);
                    return profile_1.wtfLeave(s, componentRef);
                };
                // TODO(i): refactor insert+remove into move
                ViewContainerRef_.prototype.insert = function (viewRef, index) {
                    if (index === void 0) { index = -1; }
                    var s = this._insertScope();
                    if (index == -1)
                        index = this.length;
                    var viewRef_ = viewRef;
                    this._element.attachView(viewRef_.internalView, index);
                    return profile_1.wtfLeave(s, viewRef_);
                };
                ViewContainerRef_.prototype.indexOf = function (viewRef) {
                    return collection_1.ListWrapper.indexOf(this._element.nestedViews, viewRef.internalView);
                };
                // TODO(i): rename to destroy
                ViewContainerRef_.prototype.remove = function (index) {
                    if (index === void 0) { index = -1; }
                    var s = this._removeScope();
                    if (index == -1)
                        index = this.length - 1;
                    var view = this._element.detachView(index);
                    view.destroy();
                    // view is intentionally not returned to the client.
                    profile_1.wtfLeave(s);
                };
                // TODO(i): refactor insert+remove into move
                ViewContainerRef_.prototype.detach = function (index) {
                    if (index === void 0) { index = -1; }
                    var s = this._detachScope();
                    if (index == -1)
                        index = this.length - 1;
                    var view = this._element.detachView(index);
                    return profile_1.wtfLeave(s, view.ref);
                };
                ViewContainerRef_.prototype.clear = function () {
                    for (var i = this.length - 1; i >= 0; i--) {
                        this.remove(i);
                    }
                };
                return ViewContainerRef_;
            }());
            exports_1("ViewContainerRef_", ViewContainerRef_);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2xpbmtlci92aWV3X2NvbnRhaW5lcl9yZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFhQTs7Ozs7Ozs7Ozs7Ozs7OztlQWdCRztZQUNIO2dCQUFBO2dCQWdGQSxDQUFDO2dCQTNFQyxzQkFBSSxxQ0FBTztvQkFKWDs7O3VCQUdHO3lCQUNILGNBQTRCLE1BQU0sQ0FBYSwwQkFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBRWpFLHNCQUFJLHNDQUFRO3lCQUFaLGNBQTJCLE1BQU0sQ0FBVywwQkFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBRTlELHNCQUFJLDRDQUFjO3lCQUFsQixjQUFpQyxNQUFNLENBQVcsMEJBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQWVwRSxzQkFBSSxvQ0FBTTtvQkFIVjs7dUJBRUc7eUJBQ0gsY0FBdUIsTUFBTSxDQUFTLDBCQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTs7Z0JBd0QxRCx1QkFBQztZQUFELENBaEZBLEFBZ0ZDLElBQUE7WUFoRkQsK0NBZ0ZDLENBQUE7WUFFRDtnQkFDRSwyQkFBb0IsUUFBb0I7b0JBQXBCLGFBQVEsR0FBUixRQUFRLENBQVk7b0JBc0J4QyxnQkFBZ0I7b0JBQ2hCLHFDQUFnQyxHQUM1Qix3QkFBYyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7b0JBV3pELGdCQUFnQjtvQkFDaEIsaUJBQVksR0FBRyx3QkFBYyxDQUFDLDJCQUEyQixDQUFDLENBQUM7b0JBZTNELGdCQUFnQjtvQkFDaEIsaUJBQVksR0FBRyx3QkFBYyxDQUFDLDJCQUEyQixDQUFDLENBQUM7b0JBWTNELGdCQUFnQjtvQkFDaEIsaUJBQVksR0FBRyx3QkFBYyxDQUFDLDJCQUEyQixDQUFDLENBQUM7Z0JBakVoQixDQUFDO2dCQUU1QywrQkFBRyxHQUFILFVBQUksS0FB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LElBQUE7WUFqRkQsaURBaUZDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvbGlua2VyL3ZpZXdfY29udGFpbmVyX3JlZi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TGlzdFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge3VuaW1wbGVtZW50ZWR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge0luamVjdG9yfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaS9pbmplY3Rvcic7XG5pbXBvcnQge2lzUHJlc2VudCwgaXNCbGFua30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7d3RmQ3JlYXRlU2NvcGUsIHd0ZkxlYXZlLCBXdGZTY29wZUZufSBmcm9tICcuLi9wcm9maWxlL3Byb2ZpbGUnO1xuXG5pbXBvcnQge0FwcEVsZW1lbnR9IGZyb20gJy4vZWxlbWVudCc7XG5cbmltcG9ydCB7RWxlbWVudFJlZn0gZnJvbSAnLi9lbGVtZW50X3JlZic7XG5pbXBvcnQge1RlbXBsYXRlUmVmLCBUZW1wbGF0ZVJlZl99IGZyb20gJy4vdGVtcGxhdGVfcmVmJztcbmltcG9ydCB7RW1iZWRkZWRWaWV3UmVmLCBWaWV3UmVmLCBWaWV3UmVmX30gZnJvbSAnLi92aWV3X3JlZic7XG5pbXBvcnQge0NvbXBvbmVudEZhY3RvcnksIENvbXBvbmVudFJlZn0gZnJvbSAnLi9jb21wb25lbnRfZmFjdG9yeSc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGNvbnRhaW5lciB3aGVyZSBvbmUgb3IgbW9yZSBWaWV3cyBjYW4gYmUgYXR0YWNoZWQuXG4gKlxuICogVGhlIGNvbnRhaW5lciBjYW4gY29udGFpbiB0d28ga2luZHMgb2YgVmlld3MuIEhvc3QgVmlld3MsIGNyZWF0ZWQgYnkgaW5zdGFudGlhdGluZyBhXG4gKiB7QGxpbmsgQ29tcG9uZW50fSB2aWEge0BsaW5rICNjcmVhdGVDb21wb25lbnR9LCBhbmQgRW1iZWRkZWQgVmlld3MsIGNyZWF0ZWQgYnkgaW5zdGFudGlhdGluZyBhblxuICoge0BsaW5rIFRlbXBsYXRlUmVmIEVtYmVkZGVkIFRlbXBsYXRlfSB2aWEge0BsaW5rICNjcmVhdGVFbWJlZGRlZFZpZXd9LlxuICpcbiAqIFRoZSBsb2NhdGlvbiBvZiB0aGUgVmlldyBDb250YWluZXIgd2l0aGluIHRoZSBjb250YWluaW5nIFZpZXcgaXMgc3BlY2lmaWVkIGJ5IHRoZSBBbmNob3JcbiAqIGBlbGVtZW50YC4gRWFjaCBWaWV3IENvbnRhaW5lciBjYW4gaGF2ZSBvbmx5IG9uZSBBbmNob3IgRWxlbWVudCBhbmQgZWFjaCBBbmNob3IgRWxlbWVudCBjYW4gb25seVxuICogaGF2ZSBhIHNpbmdsZSBWaWV3IENvbnRhaW5lci5cbiAqXG4gKiBSb290IGVsZW1lbnRzIG9mIFZpZXdzIGF0dGFjaGVkIHRvIHRoaXMgY29udGFpbmVyIGJlY29tZSBzaWJsaW5ncyBvZiB0aGUgQW5jaG9yIEVsZW1lbnQgaW5cbiAqIHRoZSBSZW5kZXJlZCBWaWV3LlxuICpcbiAqIFRvIGFjY2VzcyBhIGBWaWV3Q29udGFpbmVyUmVmYCBvZiBhbiBFbGVtZW50LCB5b3UgY2FuIGVpdGhlciBwbGFjZSBhIHtAbGluayBEaXJlY3RpdmV9IGluamVjdGVkXG4gKiB3aXRoIGBWaWV3Q29udGFpbmVyUmVmYCBvbiB0aGUgRWxlbWVudCwgb3IgeW91IG9idGFpbiBpdCB2aWEgYSB7QGxpbmsgVmlld0NoaWxkfSBxdWVyeS5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFZpZXdDb250YWluZXJSZWYge1xuICAvKipcbiAgICogQW5jaG9yIGVsZW1lbnQgdGhhdCBzcGVjaWZpZXMgdGhlIGxvY2F0aW9uIG9mIHRoaXMgY29udGFpbmVyIGluIHRoZSBjb250YWluaW5nIFZpZXcuXG4gICAqIDwhLS0gVE9ETzogcmVuYW1lIHRvIGFuY2hvckVsZW1lbnQgLS0+XG4gICAqL1xuICBnZXQgZWxlbWVudCgpOiBFbGVtZW50UmVmIHsgcmV0dXJuIDxFbGVtZW50UmVmPnVuaW1wbGVtZW50ZWQoKTsgfVxuXG4gIGdldCBpbmplY3RvcigpOiBJbmplY3RvciB7IHJldHVybiA8SW5qZWN0b3I+dW5pbXBsZW1lbnRlZCgpOyB9XG5cbiAgZ2V0IHBhcmVudEluamVjdG9yKCk6IEluamVjdG9yIHsgcmV0dXJuIDxJbmplY3Rvcj51bmltcGxlbWVudGVkKCk7IH1cblxuICAvKipcbiAgICogRGVzdHJveXMgYWxsIFZpZXdzIGluIHRoaXMgY29udGFpbmVyLlxuICAgKi9cbiAgYWJzdHJhY3QgY2xlYXIoKTogdm9pZDtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUge0BsaW5rIFZpZXdSZWZ9IGZvciB0aGUgVmlldyBsb2NhdGVkIGluIHRoaXMgY29udGFpbmVyIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguXG4gICAqL1xuICBhYnN0cmFjdCBnZXQoaW5kZXg6IG51bWJlcik6IFZpZXdSZWY7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBWaWV3cyBjdXJyZW50bHkgYXR0YWNoZWQgdG8gdGhpcyBjb250YWluZXIuXG4gICAqL1xuICBnZXQgbGVuZ3RoKCk6IG51bWJlciB7IHJldHVybiA8bnVtYmVyPnVuaW1wbGVtZW50ZWQoKTsgfTtcblxuICAvKipcbiAgICogSW5zdGFudGlhdGVzIGFuIEVtYmVkZGVkIFZpZXcgYmFzZWQgb24gdGhlIHtAbGluayBUZW1wbGF0ZVJlZiBgdGVtcGxhdGVSZWZgfSBhbmQgaW5zZXJ0cyBpdFxuICAgKiBpbnRvIHRoaXMgY29udGFpbmVyIGF0IHRoZSBzcGVjaWZpZWQgYGluZGV4YC5cbiAgICpcbiAgICogSWYgYGluZGV4YCBpcyBub3Qgc3BlY2lmaWVkLCB0aGUgbmV3IFZpZXcgd2lsbCBiZSBpbnNlcnRlZCBhcyB0aGUgbGFzdCBWaWV3IGluIHRoZSBjb250YWluZXIuXG4gICAqXG4gICAqIFJldHVybnMgdGhlIHtAbGluayBWaWV3UmVmfSBmb3IgdGhlIG5ld2x5IGNyZWF0ZWQgVmlldy5cbiAgICovXG4gIGFic3RyYWN0IGNyZWF0ZUVtYmVkZGVkVmlldyh0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWYsIGluZGV4PzogbnVtYmVyKTogRW1iZWRkZWRWaWV3UmVmO1xuXG4gIC8qKlxuICAgKiBJbnN0YW50aWF0ZXMgYSBzaW5nbGUge0BsaW5rIENvbXBvbmVudH0gYW5kIGluc2VydHMgaXRzIEhvc3QgVmlldyBpbnRvIHRoaXMgY29udGFpbmVyIGF0IHRoZVxuICAgKiBzcGVjaWZpZWQgYGluZGV4YC5cbiAgICpcbiAgICogVGhlIGNvbXBvbmVudCBpcyBpbnN0YW50aWF0ZWQgdXNpbmcgaXRzIHtAbGluayBDb21wb25lbnRGYWN0b3J5fSB3aGljaCBjYW4gYmVcbiAgICogb2J0YWluZWQgdmlhIHtAbGluayBDb21wb25lbnRSZXNvbHZlciNyZXNvbHZlQ29tcG9uZW50fS5cbiAgICpcbiAgICogSWYgYGluZGV4YCBpcyBub3Qgc3BlY2lmaWVkLCB0aGUgbmV3IFZpZXcgd2lsbCBiZSBpbnNlcnRlZCBhcyB0aGUgbGFzdCBWaWV3IGluIHRoZSBjb250YWluZXIuXG4gICAqXG4gICAqIFlvdSBjYW4gb3B0aW9uYWxseSBzcGVjaWZ5IHRoZSB7QGxpbmsgSW5qZWN0b3J9IHRoYXQgd2lsbCBiZSB1c2VkIGFzIHBhcmVudCBmb3IgdGhlIENvbXBvbmVudC5cbiAgICpcbiAgICogUmV0dXJucyB0aGUge0BsaW5rIENvbXBvbmVudFJlZn0gb2YgdGhlIEhvc3QgVmlldyBjcmVhdGVkIGZvciB0aGUgbmV3bHkgaW5zdGFudGlhdGVkIENvbXBvbmVudC5cbiAgICovXG4gIGFic3RyYWN0IGNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5LCBpbmRleD86IG51bWJlciwgaW5qZWN0b3I/OiBJbmplY3RvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3RhYmxlTm9kZXM/OiBhbnlbXVtdKTogQ29tcG9uZW50UmVmO1xuXG4gIC8qKlxuICAgKiBJbnNlcnRzIGEgVmlldyBpZGVudGlmaWVkIGJ5IGEge0BsaW5rIFZpZXdSZWZ9IGludG8gdGhlIGNvbnRhaW5lciBhdCB0aGUgc3BlY2lmaWVkIGBpbmRleGAuXG4gICAqXG4gICAqIElmIGBpbmRleGAgaXMgbm90IHNwZWNpZmllZCwgdGhlIG5ldyBWaWV3IHdpbGwgYmUgaW5zZXJ0ZWQgYXMgdGhlIGxhc3QgVmlldyBpbiB0aGUgY29udGFpbmVyLlxuICAgKlxuICAgKiBSZXR1cm5zIHRoZSBpbnNlcnRlZCB7QGxpbmsgVmlld1JlZn0uXG4gICAqL1xuICBhYnN0cmFjdCBpbnNlcnQodmlld1JlZjogVmlld1JlZiwgaW5kZXg/OiBudW1iZXIpOiBWaWV3UmVmO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgVmlldywgc3BlY2lmaWVkIHZpYSB7QGxpbmsgVmlld1JlZn0sIHdpdGhpbiB0aGUgY3VycmVudCBjb250YWluZXIgb3JcbiAgICogYC0xYCBpZiB0aGlzIGNvbnRhaW5lciBkb2Vzbid0IGNvbnRhaW4gdGhlIFZpZXcuXG4gICAqL1xuICBhYnN0cmFjdCBpbmRleE9mKHZpZXdSZWY6IFZpZXdSZWYpOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIGEgVmlldyBhdHRhY2hlZCB0byB0aGlzIGNvbnRhaW5lciBhdCB0aGUgc3BlY2lmaWVkIGBpbmRleGAuXG4gICAqXG4gICAqIElmIGBpbmRleGAgaXMgbm90IHNwZWNpZmllZCwgdGhlIGxhc3QgVmlldyBpbiB0aGUgY29udGFpbmVyIHdpbGwgYmUgcmVtb3ZlZC5cbiAgICovXG4gIGFic3RyYWN0IHJlbW92ZShpbmRleD86IG51bWJlcik6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFVzZSBhbG9uZyB3aXRoIHtAbGluayAjaW5zZXJ0fSB0byBtb3ZlIGEgVmlldyB3aXRoaW4gdGhlIGN1cnJlbnQgY29udGFpbmVyLlxuICAgKlxuICAgKiBJZiB0aGUgYGluZGV4YCBwYXJhbSBpcyBvbWl0dGVkLCB0aGUgbGFzdCB7QGxpbmsgVmlld1JlZn0gaXMgZGV0YWNoZWQuXG4gICAqL1xuICBhYnN0cmFjdCBkZXRhY2goaW5kZXg/OiBudW1iZXIpOiBWaWV3UmVmO1xufVxuXG5leHBvcnQgY2xhc3MgVmlld0NvbnRhaW5lclJlZl8gaW1wbGVtZW50cyBWaWV3Q29udGFpbmVyUmVmIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudDogQXBwRWxlbWVudCkge31cblxuICBnZXQoaW5kZXg6IG51bWJlcik6IEVtYmVkZGVkVmlld1JlZiB7IHJldHVybiB0aGlzLl9lbGVtZW50Lm5lc3RlZFZpZXdzW2luZGV4XS5yZWY7IH1cbiAgZ2V0IGxlbmd0aCgpOiBudW1iZXIge1xuICAgIHZhciB2aWV3cyA9IHRoaXMuX2VsZW1lbnQubmVzdGVkVmlld3M7XG4gICAgcmV0dXJuIGlzUHJlc2VudCh2aWV3cykgPyB2aWV3cy5sZW5ndGggOiAwO1xuICB9XG5cbiAgZ2V0IGVsZW1lbnQoKTogRWxlbWVudFJlZiB7IHJldHVybiB0aGlzLl9lbGVtZW50LmVsZW1lbnRSZWY7IH1cblxuICBnZXQgaW5qZWN0b3IoKTogSW5qZWN0b3IgeyByZXR1cm4gdGhpcy5fZWxlbWVudC5pbmplY3RvcjsgfVxuXG4gIGdldCBwYXJlbnRJbmplY3RvcigpOiBJbmplY3RvciB7IHJldHVybiB0aGlzLl9lbGVtZW50LnBhcmVudEluamVjdG9yOyB9XG5cbiAgLy8gVE9ETyhyYWRvKTogcHJvZmlsZSBhbmQgZGVjaWRlIHdoZXRoZXIgYm91bmRzIGNoZWNrcyBzaG91bGQgYmUgYWRkZWRcbiAgLy8gdG8gdGhlIG1ldGhvZHMgYmVsb3cuXG4gIGNyZWF0ZUVtYmVkZGVkVmlldyh0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWYsIGluZGV4OiBudW1iZXIgPSAtMSk6IEVtYmVkZGVkVmlld1JlZiB7XG4gICAgdmFyIHZpZXdSZWY6IEVtYmVkZGVkVmlld1JlZiA9IHRlbXBsYXRlUmVmLmNyZWF0ZUVtYmVkZGVkVmlldygpO1xuICAgIHRoaXMuaW5zZXJ0KHZpZXdSZWYsIGluZGV4KTtcbiAgICByZXR1cm4gdmlld1JlZjtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NyZWF0ZUNvbXBvbmVudEluQ29udGFpbmVyU2NvcGU6IFd0ZlNjb3BlRm4gPVxuICAgICAgd3RmQ3JlYXRlU2NvcGUoJ1ZpZXdDb250YWluZXJSZWYjY3JlYXRlQ29tcG9uZW50KCknKTtcblxuICBjcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeSwgaW5kZXg6IG51bWJlciA9IC0xLCBpbmplY3RvcjogSW5qZWN0b3IgPSBudWxsLFxuICAgICAgICAgICAgICAgICAgcHJvamVjdGFibGVOb2RlczogYW55W11bXSA9IG51bGwpOiBDb21wb25lbnRSZWYge1xuICAgIHZhciBzID0gdGhpcy5fY3JlYXRlQ29tcG9uZW50SW5Db250YWluZXJTY29wZSgpO1xuICAgIHZhciBjb250ZXh0SW5qZWN0b3IgPSBpc1ByZXNlbnQoaW5qZWN0b3IpID8gaW5qZWN0b3IgOiB0aGlzLl9lbGVtZW50LnBhcmVudEluamVjdG9yO1xuICAgIHZhciBjb21wb25lbnRSZWYgPSBjb21wb25lbnRGYWN0b3J5LmNyZWF0ZShjb250ZXh0SW5qZWN0b3IsIHByb2plY3RhYmxlTm9kZXMpO1xuICAgIHRoaXMuaW5zZXJ0KGNvbXBvbmVudFJlZi5ob3N0VmlldywgaW5kZXgpO1xuICAgIHJldHVybiB3dGZMZWF2ZShzLCBjb21wb25lbnRSZWYpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfaW5zZXJ0U2NvcGUgPSB3dGZDcmVhdGVTY29wZSgnVmlld0NvbnRhaW5lclJlZiNpbnNlcnQoKScpO1xuXG4gIC8vIFRPRE8oaSk6IHJlZmFjdG9yIGluc2VydCtyZW1vdmUgaW50byBtb3ZlXG4gIGluc2VydCh2aWV3UmVmOiBWaWV3UmVmLCBpbmRleDogbnVtYmVyID0gLTEpOiBWaWV3UmVmIHtcbiAgICB2YXIgcyA9IHRoaXMuX2luc2VydFNjb3BlKCk7XG4gICAgaWYgKGluZGV4ID09IC0xKSBpbmRleCA9IHRoaXMubGVuZ3RoO1xuICAgIHZhciB2aWV3UmVmXyA9IDxWaWV3UmVmXz52aWV3UmVmO1xuICAgIHRoaXMuX2VsZW1lbnQuYXR0YWNoVmlldyh2aWV3UmVmXy5pbnRlcm5hbFZpZXcsIGluZGV4KTtcbiAgICByZXR1cm4gd3RmTGVhdmUocywgdmlld1JlZl8pO1xuICB9XG5cbiAgaW5kZXhPZih2aWV3UmVmOiBWaWV3UmVmKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTGlzdFdyYXBwZXIuaW5kZXhPZih0aGlzLl9lbGVtZW50Lm5lc3RlZFZpZXdzLCAoPFZpZXdSZWZfPnZpZXdSZWYpLmludGVybmFsVmlldyk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9yZW1vdmVTY29wZSA9IHd0ZkNyZWF0ZVNjb3BlKCdWaWV3Q29udGFpbmVyUmVmI3JlbW92ZSgpJyk7XG5cbiAgLy8gVE9ETyhpKTogcmVuYW1lIHRvIGRlc3Ryb3lcbiAgcmVtb3ZlKGluZGV4OiBudW1iZXIgPSAtMSk6IHZvaWQge1xuICAgIHZhciBzID0gdGhpcy5fcmVtb3ZlU2NvcGUoKTtcbiAgICBpZiAoaW5kZXggPT0gLTEpIGluZGV4ID0gdGhpcy5sZW5ndGggLSAxO1xuICAgIHZhciB2aWV3ID0gdGhpcy5fZWxlbWVudC5kZXRhY2hWaWV3KGluZGV4KTtcbiAgICB2aWV3LmRlc3Ryb3koKTtcbiAgICAvLyB2aWV3IGlzIGludGVudGlvbmFsbHkgbm90IHJldHVybmVkIHRvIHRoZSBjbGllbnQuXG4gICAgd3RmTGVhdmUocyk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9kZXRhY2hTY29wZSA9IHd0ZkNyZWF0ZVNjb3BlKCdWaWV3Q29udGFpbmVyUmVmI2RldGFjaCgpJyk7XG5cbiAgLy8gVE9ETyhpKTogcmVmYWN0b3IgaW5zZXJ0K3JlbW92ZSBpbnRvIG1vdmVcbiAgZGV0YWNoKGluZGV4OiBudW1iZXIgPSAtMSk6IFZpZXdSZWYge1xuICAgIHZhciBzID0gdGhpcy5fZGV0YWNoU2NvcGUoKTtcbiAgICBpZiAoaW5kZXggPT0gLTEpIGluZGV4ID0gdGhpcy5sZW5ndGggLSAxO1xuICAgIHZhciB2aWV3ID0gdGhpcy5fZWxlbWVudC5kZXRhY2hWaWV3KGluZGV4KTtcbiAgICByZXR1cm4gd3RmTGVhdmUocywgdmlldy5yZWYpO1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgZm9yICh2YXIgaSA9IHRoaXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHRoaXMucmVtb3ZlKGkpO1xuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
