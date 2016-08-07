System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var TemplateRef, TemplateRef_;
    return {
        setters:[],
        execute: function() {
            /**
             * Represents an Embedded Template that can be used to instantiate Embedded Views.
             *
             * You can access a `TemplateRef`, in two ways. Via a directive placed on a `<template>` element (or
             * directive prefixed with `*`) and have the `TemplateRef` for this Embedded View injected into the
             * constructor of the directive using the `TemplateRef` Token. Alternatively you can query for the
             * `TemplateRef` from a Component or a Directive via {@link Query}.
             *
             * To instantiate Embedded Views based on a Template, use
             * {@link ViewContainerRef#createEmbeddedView}, which will create the View and attach it to the
             * View Container.
             */
            TemplateRef = (function () {
                function TemplateRef() {
                }
                Object.defineProperty(TemplateRef.prototype, "elementRef", {
                    /**
                     * The location in the View where the Embedded View logically belongs to.
                     *
                     * The data-binding and injection contexts of Embedded Views created from this `TemplateRef`
                     * inherit from the contexts of this location.
                     *
                     * Typically new Embedded Views are attached to the View Container of this location, but in
                     * advanced use-cases, the View can be attached to a different container while keeping the
                     * data-binding and injection context from the original location.
                     *
                     */
                    // TODO(i): rename to anchor or location
                    get: function () { return null; },
                    enumerable: true,
                    configurable: true
                });
                return TemplateRef;
            }());
            exports_1("TemplateRef", TemplateRef);
            TemplateRef_ = (function (_super) {
                __extends(TemplateRef_, _super);
                function TemplateRef_(_appElement, _viewFactory) {
                    _super.call(this);
                    this._appElement = _appElement;
                    this._viewFactory = _viewFactory;
                }
                TemplateRef_.prototype.createEmbeddedView = function () {
                    var view = this._viewFactory(this._appElement.parentView.viewUtils, this._appElement.parentInjector, this._appElement);
                    view.create(null, null);
                    return view.ref;
                };
                Object.defineProperty(TemplateRef_.prototype, "elementRef", {
                    get: function () { return this._appElement.elementRef; },
                    enumerable: true,
                    configurable: true
                });
                return TemplateRef_;
            }(TemplateRef));
            exports_1("TemplateRef_", TemplateRef_);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2xpbmtlci90ZW1wbGF0ZV9yZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O1lBS0E7Ozs7Ozs7Ozs7O2VBV0c7WUFDSDtnQkFBQTtnQkFnQkEsQ0FBQztnQkFIQyxzQkFBSSxtQ0FBVTtvQkFaZDs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCx3Q0FBd0M7eUJBQ3hDLGNBQStCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBRy9DLGtCQUFDO1lBQUQsQ0FoQkEsQUFnQkMsSUFBQTtZQWhCRCxxQ0FnQkMsQ0FBQTtZQUVEO2dCQUFrQyxnQ0FBVztnQkFDM0Msc0JBQW9CLFdBQXVCLEVBQVUsWUFBc0I7b0JBQUksaUJBQU8sQ0FBQztvQkFBbkUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7b0JBQVUsaUJBQVksR0FBWixZQUFZLENBQVU7Z0JBQWEsQ0FBQztnQkFFekYseUNBQWtCLEdBQWxCO29CQUNFLElBQUksSUFBSSxHQUFpQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUM5RixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ2xCLENBQUM7Z0JBRUQsc0JBQUksb0NBQVU7eUJBQWQsY0FBK0IsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUN0RSxtQkFBQztZQUFELENBWEEsQUFXQyxDQVhpQyxXQUFXLEdBVzVDO1lBWEQsdUNBV0MsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29yZS9saW5rZXIvdGVtcGxhdGVfcmVmLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFbGVtZW50UmVmfSBmcm9tICcuL2VsZW1lbnRfcmVmJztcbmltcG9ydCB7QXBwRWxlbWVudH0gZnJvbSAnLi9lbGVtZW50JztcbmltcG9ydCB7QXBwVmlld30gZnJvbSAnLi92aWV3JztcbmltcG9ydCB7RW1iZWRkZWRWaWV3UmVmfSBmcm9tICcuL3ZpZXdfcmVmJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIEVtYmVkZGVkIFRlbXBsYXRlIHRoYXQgY2FuIGJlIHVzZWQgdG8gaW5zdGFudGlhdGUgRW1iZWRkZWQgVmlld3MuXG4gKlxuICogWW91IGNhbiBhY2Nlc3MgYSBgVGVtcGxhdGVSZWZgLCBpbiB0d28gd2F5cy4gVmlhIGEgZGlyZWN0aXZlIHBsYWNlZCBvbiBhIGA8dGVtcGxhdGU+YCBlbGVtZW50IChvclxuICogZGlyZWN0aXZlIHByZWZpeGVkIHdpdGggYCpgKSBhbmQgaGF2ZSB0aGUgYFRlbXBsYXRlUmVmYCBmb3IgdGhpcyBFbWJlZGRlZCBWaWV3IGluamVjdGVkIGludG8gdGhlXG4gKiBjb25zdHJ1Y3RvciBvZiB0aGUgZGlyZWN0aXZlIHVzaW5nIHRoZSBgVGVtcGxhdGVSZWZgIFRva2VuLiBBbHRlcm5hdGl2ZWx5IHlvdSBjYW4gcXVlcnkgZm9yIHRoZVxuICogYFRlbXBsYXRlUmVmYCBmcm9tIGEgQ29tcG9uZW50IG9yIGEgRGlyZWN0aXZlIHZpYSB7QGxpbmsgUXVlcnl9LlxuICpcbiAqIFRvIGluc3RhbnRpYXRlIEVtYmVkZGVkIFZpZXdzIGJhc2VkIG9uIGEgVGVtcGxhdGUsIHVzZVxuICoge0BsaW5rIFZpZXdDb250YWluZXJSZWYjY3JlYXRlRW1iZWRkZWRWaWV3fSwgd2hpY2ggd2lsbCBjcmVhdGUgdGhlIFZpZXcgYW5kIGF0dGFjaCBpdCB0byB0aGVcbiAqIFZpZXcgQ29udGFpbmVyLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVGVtcGxhdGVSZWYge1xuICAvKipcbiAgICogVGhlIGxvY2F0aW9uIGluIHRoZSBWaWV3IHdoZXJlIHRoZSBFbWJlZGRlZCBWaWV3IGxvZ2ljYWxseSBiZWxvbmdzIHRvLlxuICAgKlxuICAgKiBUaGUgZGF0YS1iaW5kaW5nIGFuZCBpbmplY3Rpb24gY29udGV4dHMgb2YgRW1iZWRkZWQgVmlld3MgY3JlYXRlZCBmcm9tIHRoaXMgYFRlbXBsYXRlUmVmYFxuICAgKiBpbmhlcml0IGZyb20gdGhlIGNvbnRleHRzIG9mIHRoaXMgbG9jYXRpb24uXG4gICAqXG4gICAqIFR5cGljYWxseSBuZXcgRW1iZWRkZWQgVmlld3MgYXJlIGF0dGFjaGVkIHRvIHRoZSBWaWV3IENvbnRhaW5lciBvZiB0aGlzIGxvY2F0aW9uLCBidXQgaW5cbiAgICogYWR2YW5jZWQgdXNlLWNhc2VzLCB0aGUgVmlldyBjYW4gYmUgYXR0YWNoZWQgdG8gYSBkaWZmZXJlbnQgY29udGFpbmVyIHdoaWxlIGtlZXBpbmcgdGhlXG4gICAqIGRhdGEtYmluZGluZyBhbmQgaW5qZWN0aW9uIGNvbnRleHQgZnJvbSB0aGUgb3JpZ2luYWwgbG9jYXRpb24uXG4gICAqXG4gICAqL1xuICAvLyBUT0RPKGkpOiByZW5hbWUgdG8gYW5jaG9yIG9yIGxvY2F0aW9uXG4gIGdldCBlbGVtZW50UmVmKCk6IEVsZW1lbnRSZWYgeyByZXR1cm4gbnVsbDsgfVxuXG4gIGFic3RyYWN0IGNyZWF0ZUVtYmVkZGVkVmlldygpOiBFbWJlZGRlZFZpZXdSZWY7XG59XG5cbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZVJlZl8gZXh0ZW5kcyBUZW1wbGF0ZVJlZiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2FwcEVsZW1lbnQ6IEFwcEVsZW1lbnQsIHByaXZhdGUgX3ZpZXdGYWN0b3J5OiBGdW5jdGlvbikgeyBzdXBlcigpOyB9XG5cbiAgY3JlYXRlRW1iZWRkZWRWaWV3KCk6IEVtYmVkZGVkVmlld1JlZiB7XG4gICAgdmFyIHZpZXc6IEFwcFZpZXc8YW55PiA9IHRoaXMuX3ZpZXdGYWN0b3J5KHRoaXMuX2FwcEVsZW1lbnQucGFyZW50Vmlldy52aWV3VXRpbHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FwcEVsZW1lbnQucGFyZW50SW5qZWN0b3IsIHRoaXMuX2FwcEVsZW1lbnQpO1xuICAgIHZpZXcuY3JlYXRlKG51bGwsIG51bGwpO1xuICAgIHJldHVybiB2aWV3LnJlZjtcbiAgfVxuXG4gIGdldCBlbGVtZW50UmVmKCk6IEVsZW1lbnRSZWYgeyByZXR1cm4gdGhpcy5fYXBwRWxlbWVudC5lbGVtZW50UmVmOyB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
