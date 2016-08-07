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
                function TemplateRef_(_elementRef) {
                    _super.call(this);
                    this._elementRef = _elementRef;
                }
                Object.defineProperty(TemplateRef_.prototype, "elementRef", {
                    get: function () { return this._elementRef; },
                    enumerable: true,
                    configurable: true
                });
                return TemplateRef_;
            }(TemplateRef));
            exports_1("TemplateRef_", TemplateRef_);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvbGlua2VyL3RlbXBsYXRlX3JlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7WUFFQTs7Ozs7Ozs7Ozs7ZUFXRztZQUNIO2dCQUFBO2dCQWNBLENBQUM7Z0JBREMsc0JBQUksbUNBQVU7b0JBWmQ7Ozs7Ozs7Ozs7dUJBVUc7b0JBQ0gsd0NBQXdDO3lCQUN4QyxjQUErQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUMvQyxrQkFBQztZQUFELENBZEEsQUFjQyxJQUFBO1lBZEQscUNBY0MsQ0FBQTtZQUVEO2dCQUFrQyxnQ0FBVztnQkFDM0Msc0JBQW9CLFdBQXdCO29CQUFJLGlCQUFPLENBQUM7b0JBQXBDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO2dCQUFhLENBQUM7Z0JBRTFELHNCQUFJLG9DQUFVO3lCQUFkLGNBQWdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUM1RCxtQkFBQztZQUFELENBSkEsQUFJQyxDQUppQyxXQUFXLEdBSTVDO1lBSkQsdUNBSUMsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2xpbmtlci90ZW1wbGF0ZV9yZWYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0VsZW1lbnRSZWYsIEVsZW1lbnRSZWZffSBmcm9tICcuL2VsZW1lbnRfcmVmJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIEVtYmVkZGVkIFRlbXBsYXRlIHRoYXQgY2FuIGJlIHVzZWQgdG8gaW5zdGFudGlhdGUgRW1iZWRkZWQgVmlld3MuXG4gKlxuICogWW91IGNhbiBhY2Nlc3MgYSBgVGVtcGxhdGVSZWZgLCBpbiB0d28gd2F5cy4gVmlhIGEgZGlyZWN0aXZlIHBsYWNlZCBvbiBhIGA8dGVtcGxhdGU+YCBlbGVtZW50IChvclxuICogZGlyZWN0aXZlIHByZWZpeGVkIHdpdGggYCpgKSBhbmQgaGF2ZSB0aGUgYFRlbXBsYXRlUmVmYCBmb3IgdGhpcyBFbWJlZGRlZCBWaWV3IGluamVjdGVkIGludG8gdGhlXG4gKiBjb25zdHJ1Y3RvciBvZiB0aGUgZGlyZWN0aXZlIHVzaW5nIHRoZSBgVGVtcGxhdGVSZWZgIFRva2VuLiBBbHRlcm5hdGl2ZWx5IHlvdSBjYW4gcXVlcnkgZm9yIHRoZVxuICogYFRlbXBsYXRlUmVmYCBmcm9tIGEgQ29tcG9uZW50IG9yIGEgRGlyZWN0aXZlIHZpYSB7QGxpbmsgUXVlcnl9LlxuICpcbiAqIFRvIGluc3RhbnRpYXRlIEVtYmVkZGVkIFZpZXdzIGJhc2VkIG9uIGEgVGVtcGxhdGUsIHVzZVxuICoge0BsaW5rIFZpZXdDb250YWluZXJSZWYjY3JlYXRlRW1iZWRkZWRWaWV3fSwgd2hpY2ggd2lsbCBjcmVhdGUgdGhlIFZpZXcgYW5kIGF0dGFjaCBpdCB0byB0aGVcbiAqIFZpZXcgQ29udGFpbmVyLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVGVtcGxhdGVSZWYge1xuICAvKipcbiAgICogVGhlIGxvY2F0aW9uIGluIHRoZSBWaWV3IHdoZXJlIHRoZSBFbWJlZGRlZCBWaWV3IGxvZ2ljYWxseSBiZWxvbmdzIHRvLlxuICAgKlxuICAgKiBUaGUgZGF0YS1iaW5kaW5nIGFuZCBpbmplY3Rpb24gY29udGV4dHMgb2YgRW1iZWRkZWQgVmlld3MgY3JlYXRlZCBmcm9tIHRoaXMgYFRlbXBsYXRlUmVmYFxuICAgKiBpbmhlcml0IGZyb20gdGhlIGNvbnRleHRzIG9mIHRoaXMgbG9jYXRpb24uXG4gICAqXG4gICAqIFR5cGljYWxseSBuZXcgRW1iZWRkZWQgVmlld3MgYXJlIGF0dGFjaGVkIHRvIHRoZSBWaWV3IENvbnRhaW5lciBvZiB0aGlzIGxvY2F0aW9uLCBidXQgaW5cbiAgICogYWR2YW5jZWQgdXNlLWNhc2VzLCB0aGUgVmlldyBjYW4gYmUgYXR0YWNoZWQgdG8gYSBkaWZmZXJlbnQgY29udGFpbmVyIHdoaWxlIGtlZXBpbmcgdGhlXG4gICAqIGRhdGEtYmluZGluZyBhbmQgaW5qZWN0aW9uIGNvbnRleHQgZnJvbSB0aGUgb3JpZ2luYWwgbG9jYXRpb24uXG4gICAqXG4gICAqL1xuICAvLyBUT0RPKGkpOiByZW5hbWUgdG8gYW5jaG9yIG9yIGxvY2F0aW9uXG4gIGdldCBlbGVtZW50UmVmKCk6IEVsZW1lbnRSZWYgeyByZXR1cm4gbnVsbDsgfVxufVxuXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVSZWZfIGV4dGVuZHMgVGVtcGxhdGVSZWYge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmXykgeyBzdXBlcigpOyB9XG5cbiAgZ2V0IGVsZW1lbnRSZWYoKTogRWxlbWVudFJlZl8geyByZXR1cm4gdGhpcy5fZWxlbWVudFJlZjsgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
