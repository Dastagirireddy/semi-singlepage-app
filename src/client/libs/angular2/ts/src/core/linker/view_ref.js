System.register(['angular2/src/facade/exceptions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var exceptions_1;
    var ViewRef, HostViewRef, EmbeddedViewRef, ViewRef_, HostViewFactoryRef, HostViewFactoryRef_;
    return {
        setters:[
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
            ViewRef = (function () {
                function ViewRef() {
                }
                Object.defineProperty(ViewRef.prototype, "changeDetectorRef", {
                    /**
                     * @internal
                     */
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(ViewRef.prototype, "destroyed", {
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                return ViewRef;
            }());
            exports_1("ViewRef", ViewRef);
            /**
             * Represents a View containing a single Element that is the Host Element of a {@link Component}
             * instance.
             *
             * A Host View is created for every dynamically created Component that was compiled on its own (as
             * opposed to as a part of another Component's Template) via {@link Compiler#compileInHost} or one
             * of the higher-level APIs: {@link AppViewManager#createRootHostView},
             * {@link AppViewManager#createHostViewInContainer}, {@link ViewContainerRef#createHostView}.
             */
            HostViewRef = (function (_super) {
                __extends(HostViewRef, _super);
                function HostViewRef() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(HostViewRef.prototype, "rootNodes", {
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                ;
                return HostViewRef;
            }(ViewRef));
            exports_1("HostViewRef", HostViewRef);
            /**
             * Represents an Angular View.
             *
             * <!-- TODO: move the next two paragraphs to the dev guide -->
             * A View is a fundamental building block of the application UI. It is the smallest grouping of
             * Elements which are created and destroyed together.
             *
             * Properties of elements in a View can change, but the structure (number and order) of elements in
             * a View cannot. Changing the structure of Elements can only be done by inserting, moving or
             * removing nested Views via a {@link ViewContainerRef}. Each View can contain many View Containers.
             * <!-- /TODO -->
             *
             * ### Example
             *
             * Given this template...
             *
             * ```
             * Count: {{items.length}}
             * <ul>
             *   <li *ngFor="var item of items">{{item}}</li>
             * </ul>
             * ```
             *
             * ... we have two {@link ProtoViewRef}s:
             *
             * Outer {@link ProtoViewRef}:
             * ```
             * Count: {{items.length}}
             * <ul>
             *   <template ngFor var-item [ngForOf]="items"></template>
             * </ul>
             * ```
             *
             * Inner {@link ProtoViewRef}:
             * ```
             *   <li>{{item}}</li>
             * ```
             *
             * Notice that the original template is broken down into two separate {@link ProtoViewRef}s.
             *
             * The outer/inner {@link ProtoViewRef}s are then assembled into views like so:
             *
             * ```
             * <!-- ViewRef: outer-0 -->
             * Count: 2
             * <ul>
             *   <template view-container-ref></template>
             *   <!-- ViewRef: inner-1 --><li>first</li><!-- /ViewRef: inner-1 -->
             *   <!-- ViewRef: inner-2 --><li>second</li><!-- /ViewRef: inner-2 -->
             * </ul>
             * <!-- /ViewRef: outer-0 -->
             * ```
             */
            EmbeddedViewRef = (function (_super) {
                __extends(EmbeddedViewRef, _super);
                function EmbeddedViewRef() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(EmbeddedViewRef.prototype, "rootNodes", {
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                ;
                return EmbeddedViewRef;
            }(ViewRef));
            exports_1("EmbeddedViewRef", EmbeddedViewRef);
            ViewRef_ = (function () {
                function ViewRef_(_view) {
                    this._view = _view;
                    this._view = _view;
                }
                Object.defineProperty(ViewRef_.prototype, "internalView", {
                    get: function () { return this._view; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ViewRef_.prototype, "changeDetectorRef", {
                    /**
                     * Return `ChangeDetectorRef`
                     */
                    get: function () { return this._view.changeDetector.ref; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ViewRef_.prototype, "rootNodes", {
                    get: function () { return this._view.flatRootNodes; },
                    enumerable: true,
                    configurable: true
                });
                ViewRef_.prototype.setLocal = function (variableName, value) { this._view.setLocal(variableName, value); };
                ViewRef_.prototype.hasLocal = function (variableName) { return this._view.hasLocal(variableName); };
                Object.defineProperty(ViewRef_.prototype, "destroyed", {
                    get: function () { return this._view.destroyed; },
                    enumerable: true,
                    configurable: true
                });
                return ViewRef_;
            }());
            exports_1("ViewRef_", ViewRef_);
            HostViewFactoryRef = (function () {
                function HostViewFactoryRef() {
                }
                return HostViewFactoryRef;
            }());
            exports_1("HostViewFactoryRef", HostViewFactoryRef);
            HostViewFactoryRef_ = (function () {
                function HostViewFactoryRef_(_hostViewFactory) {
                    this._hostViewFactory = _hostViewFactory;
                }
                Object.defineProperty(HostViewFactoryRef_.prototype, "internalHostViewFactory", {
                    get: function () { return this._hostViewFactory; },
                    enumerable: true,
                    configurable: true
                });
                return HostViewFactoryRef_;
            }());
            exports_1("HostViewFactoryRef_", HostViewFactoryRef_);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvbGlua2VyL3ZpZXdfcmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7WUFJQTtnQkFBQTtnQkFPQSxDQUFDO2dCQUhDLHNCQUFJLHNDQUFpQjtvQkFIckI7O3VCQUVHO3lCQUNILGNBQTZDLE1BQU0sQ0FBb0IsMEJBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBOztnQkFFekYsc0JBQUksOEJBQVM7eUJBQWIsY0FBMkIsTUFBTSxDQUFVLDBCQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFDL0QsY0FBQztZQUFELENBUEEsQUFPQyxJQUFBO1lBUEQsNkJBT0MsQ0FBQTtZQUVEOzs7Ozs7OztlQVFHO1lBQ0g7Z0JBQTBDLCtCQUFPO2dCQUFqRDtvQkFBMEMsOEJBQU87Z0JBRWpELENBQUM7Z0JBREMsc0JBQUksa0NBQVM7eUJBQWIsY0FBeUIsTUFBTSxDQUFRLDBCQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTs7Z0JBQzNELGtCQUFDO1lBQUQsQ0FGQSxBQUVDLENBRnlDLE9BQU8sR0FFaEQ7WUFGRCxxQ0FFQyxDQUFBO1lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFvREc7WUFDSDtnQkFBOEMsbUNBQU87Z0JBQXJEO29CQUE4Qyw4QkFBTztnQkFZckQsQ0FBQztnQkFEQyxzQkFBSSxzQ0FBUzt5QkFBYixjQUF5QixNQUFNLENBQVEsMEJBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBOztnQkFDM0Qsc0JBQUM7WUFBRCxDQVpBLEFBWUMsQ0FaNkMsT0FBTyxHQVlwRDtZQVpELDZDQVlDLENBQUE7WUFFRDtnQkFDRSxrQkFBb0IsS0FBYztvQkFBZCxVQUFLLEdBQUwsS0FBSyxDQUFTO29CQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUFDLENBQUM7Z0JBRTNELHNCQUFJLGtDQUFZO3lCQUFoQixjQUE4QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFLbEQsc0JBQUksdUNBQWlCO29CQUhyQjs7dUJBRUc7eUJBQ0gsY0FBNkMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFFcEYsc0JBQUksK0JBQVM7eUJBQWIsY0FBeUIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUUzRCwyQkFBUSxHQUFSLFVBQVMsWUFBb0IsRUFBRSxLQUFVLElBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFOUYsMkJBQVEsR0FBUixVQUFTLFlBQW9CLElBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFckYsc0JBQUksK0JBQVM7eUJBQWIsY0FBMkIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUMzRCxlQUFDO1lBQUQsQ0FqQkEsQUFpQkMsSUFBQTtZQWpCRCwrQkFpQkMsQ0FBQTtZQUVEO2dCQUFBO2dCQUEwQyxDQUFDO2dCQUFELHlCQUFDO1lBQUQsQ0FBMUMsQUFBMkMsSUFBQTtZQUEzQyxtREFBMkMsQ0FBQTtZQUUzQztnQkFDRSw2QkFBb0IsZ0JBQWlDO29CQUFqQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO2dCQUFHLENBQUM7Z0JBRXpELHNCQUFJLHdEQUF1Qjt5QkFBM0IsY0FBaUQsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFDbEYsMEJBQUM7WUFBRCxDQUpBLEFBSUMsSUFBQTtZQUpELHFEQUlDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29yZS9saW5rZXIvdmlld19yZWYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3VuaW1wbGVtZW50ZWR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge0NoYW5nZURldGVjdG9yUmVmfSBmcm9tICcuLi9jaGFuZ2VfZGV0ZWN0aW9uL2NoYW5nZV9kZXRlY3Rvcl9yZWYnO1xuaW1wb3J0IHtBcHBWaWV3LCBIb3N0Vmlld0ZhY3Rvcnl9IGZyb20gJy4vdmlldyc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBWaWV3UmVmIHtcbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZ2V0IGNoYW5nZURldGVjdG9yUmVmKCk6IENoYW5nZURldGVjdG9yUmVmIHsgcmV0dXJuIDxDaGFuZ2VEZXRlY3RvclJlZj51bmltcGxlbWVudGVkKCk7IH07XG5cbiAgZ2V0IGRlc3Ryb3llZCgpOiBib29sZWFuIHsgcmV0dXJuIDxib29sZWFuPnVuaW1wbGVtZW50ZWQoKTsgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBWaWV3IGNvbnRhaW5pbmcgYSBzaW5nbGUgRWxlbWVudCB0aGF0IGlzIHRoZSBIb3N0IEVsZW1lbnQgb2YgYSB7QGxpbmsgQ29tcG9uZW50fVxuICogaW5zdGFuY2UuXG4gKlxuICogQSBIb3N0IFZpZXcgaXMgY3JlYXRlZCBmb3IgZXZlcnkgZHluYW1pY2FsbHkgY3JlYXRlZCBDb21wb25lbnQgdGhhdCB3YXMgY29tcGlsZWQgb24gaXRzIG93biAoYXNcbiAqIG9wcG9zZWQgdG8gYXMgYSBwYXJ0IG9mIGFub3RoZXIgQ29tcG9uZW50J3MgVGVtcGxhdGUpIHZpYSB7QGxpbmsgQ29tcGlsZXIjY29tcGlsZUluSG9zdH0gb3Igb25lXG4gKiBvZiB0aGUgaGlnaGVyLWxldmVsIEFQSXM6IHtAbGluayBBcHBWaWV3TWFuYWdlciNjcmVhdGVSb290SG9zdFZpZXd9LFxuICoge0BsaW5rIEFwcFZpZXdNYW5hZ2VyI2NyZWF0ZUhvc3RWaWV3SW5Db250YWluZXJ9LCB7QGxpbmsgVmlld0NvbnRhaW5lclJlZiNjcmVhdGVIb3N0Vmlld30uXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBIb3N0Vmlld1JlZiBleHRlbmRzIFZpZXdSZWYge1xuICBnZXQgcm9vdE5vZGVzKCk6IGFueVtdIHsgcmV0dXJuIDxhbnlbXT51bmltcGxlbWVudGVkKCk7IH07XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBBbmd1bGFyIFZpZXcuXG4gKlxuICogPCEtLSBUT0RPOiBtb3ZlIHRoZSBuZXh0IHR3byBwYXJhZ3JhcGhzIHRvIHRoZSBkZXYgZ3VpZGUgLS0+XG4gKiBBIFZpZXcgaXMgYSBmdW5kYW1lbnRhbCBidWlsZGluZyBibG9jayBvZiB0aGUgYXBwbGljYXRpb24gVUkuIEl0IGlzIHRoZSBzbWFsbGVzdCBncm91cGluZyBvZlxuICogRWxlbWVudHMgd2hpY2ggYXJlIGNyZWF0ZWQgYW5kIGRlc3Ryb3llZCB0b2dldGhlci5cbiAqXG4gKiBQcm9wZXJ0aWVzIG9mIGVsZW1lbnRzIGluIGEgVmlldyBjYW4gY2hhbmdlLCBidXQgdGhlIHN0cnVjdHVyZSAobnVtYmVyIGFuZCBvcmRlcikgb2YgZWxlbWVudHMgaW5cbiAqIGEgVmlldyBjYW5ub3QuIENoYW5naW5nIHRoZSBzdHJ1Y3R1cmUgb2YgRWxlbWVudHMgY2FuIG9ubHkgYmUgZG9uZSBieSBpbnNlcnRpbmcsIG1vdmluZyBvclxuICogcmVtb3ZpbmcgbmVzdGVkIFZpZXdzIHZpYSBhIHtAbGluayBWaWV3Q29udGFpbmVyUmVmfS4gRWFjaCBWaWV3IGNhbiBjb250YWluIG1hbnkgVmlldyBDb250YWluZXJzLlxuICogPCEtLSAvVE9ETyAtLT5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIEdpdmVuIHRoaXMgdGVtcGxhdGUuLi5cbiAqXG4gKiBgYGBcbiAqIENvdW50OiB7e2l0ZW1zLmxlbmd0aH19XG4gKiA8dWw+XG4gKiAgIDxsaSAqbmdGb3I9XCJ2YXIgaXRlbSBvZiBpdGVtc1wiPnt7aXRlbX19PC9saT5cbiAqIDwvdWw+XG4gKiBgYGBcbiAqXG4gKiAuLi4gd2UgaGF2ZSB0d28ge0BsaW5rIFByb3RvVmlld1JlZn1zOlxuICpcbiAqIE91dGVyIHtAbGluayBQcm90b1ZpZXdSZWZ9OlxuICogYGBgXG4gKiBDb3VudDoge3tpdGVtcy5sZW5ndGh9fVxuICogPHVsPlxuICogICA8dGVtcGxhdGUgbmdGb3IgdmFyLWl0ZW0gW25nRm9yT2ZdPVwiaXRlbXNcIj48L3RlbXBsYXRlPlxuICogPC91bD5cbiAqIGBgYFxuICpcbiAqIElubmVyIHtAbGluayBQcm90b1ZpZXdSZWZ9OlxuICogYGBgXG4gKiAgIDxsaT57e2l0ZW19fTwvbGk+XG4gKiBgYGBcbiAqXG4gKiBOb3RpY2UgdGhhdCB0aGUgb3JpZ2luYWwgdGVtcGxhdGUgaXMgYnJva2VuIGRvd24gaW50byB0d28gc2VwYXJhdGUge0BsaW5rIFByb3RvVmlld1JlZn1zLlxuICpcbiAqIFRoZSBvdXRlci9pbm5lciB7QGxpbmsgUHJvdG9WaWV3UmVmfXMgYXJlIHRoZW4gYXNzZW1ibGVkIGludG8gdmlld3MgbGlrZSBzbzpcbiAqXG4gKiBgYGBcbiAqIDwhLS0gVmlld1JlZjogb3V0ZXItMCAtLT5cbiAqIENvdW50OiAyXG4gKiA8dWw+XG4gKiAgIDx0ZW1wbGF0ZSB2aWV3LWNvbnRhaW5lci1yZWY+PC90ZW1wbGF0ZT5cbiAqICAgPCEtLSBWaWV3UmVmOiBpbm5lci0xIC0tPjxsaT5maXJzdDwvbGk+PCEtLSAvVmlld1JlZjogaW5uZXItMSAtLT5cbiAqICAgPCEtLSBWaWV3UmVmOiBpbm5lci0yIC0tPjxsaT5zZWNvbmQ8L2xpPjwhLS0gL1ZpZXdSZWY6IGlubmVyLTIgLS0+XG4gKiA8L3VsPlxuICogPCEtLSAvVmlld1JlZjogb3V0ZXItMCAtLT5cbiAqIGBgYFxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRW1iZWRkZWRWaWV3UmVmIGV4dGVuZHMgVmlld1JlZiB7XG4gIC8qKlxuICAgKiBTZXRzIGB2YWx1ZWAgb2YgbG9jYWwgdmFyaWFibGUgY2FsbGVkIGB2YXJpYWJsZU5hbWVgIGluIHRoaXMgVmlldy5cbiAgICovXG4gIGFic3RyYWN0IHNldExvY2FsKHZhcmlhYmxlTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZDtcblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgdGhpcyB2aWV3IGhhcyBhIGxvY2FsIHZhcmlhYmxlIGNhbGxlZCBgdmFyaWFibGVOYW1lYC5cbiAgICovXG4gIGFic3RyYWN0IGhhc0xvY2FsKHZhcmlhYmxlTmFtZTogc3RyaW5nKTogYm9vbGVhbjtcblxuICBnZXQgcm9vdE5vZGVzKCk6IGFueVtdIHsgcmV0dXJuIDxhbnlbXT51bmltcGxlbWVudGVkKCk7IH07XG59XG5cbmV4cG9ydCBjbGFzcyBWaWV3UmVmXyBpbXBsZW1lbnRzIEVtYmVkZGVkVmlld1JlZiwgSG9zdFZpZXdSZWYge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF92aWV3OiBBcHBWaWV3KSB7IHRoaXMuX3ZpZXcgPSBfdmlldzsgfVxuXG4gIGdldCBpbnRlcm5hbFZpZXcoKTogQXBwVmlldyB7IHJldHVybiB0aGlzLl92aWV3OyB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBgQ2hhbmdlRGV0ZWN0b3JSZWZgXG4gICAqL1xuICBnZXQgY2hhbmdlRGV0ZWN0b3JSZWYoKTogQ2hhbmdlRGV0ZWN0b3JSZWYgeyByZXR1cm4gdGhpcy5fdmlldy5jaGFuZ2VEZXRlY3Rvci5yZWY7IH1cblxuICBnZXQgcm9vdE5vZGVzKCk6IGFueVtdIHsgcmV0dXJuIHRoaXMuX3ZpZXcuZmxhdFJvb3ROb2RlczsgfVxuXG4gIHNldExvY2FsKHZhcmlhYmxlTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7IHRoaXMuX3ZpZXcuc2V0TG9jYWwodmFyaWFibGVOYW1lLCB2YWx1ZSk7IH1cblxuICBoYXNMb2NhbCh2YXJpYWJsZU5hbWU6IHN0cmluZyk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fdmlldy5oYXNMb2NhbCh2YXJpYWJsZU5hbWUpOyB9XG5cbiAgZ2V0IGRlc3Ryb3llZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3ZpZXcuZGVzdHJveWVkOyB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBIb3N0Vmlld0ZhY3RvcnlSZWYge31cblxuZXhwb3J0IGNsYXNzIEhvc3RWaWV3RmFjdG9yeVJlZl8gaW1wbGVtZW50cyBIb3N0Vmlld0ZhY3RvcnlSZWYge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9ob3N0Vmlld0ZhY3Rvcnk6IEhvc3RWaWV3RmFjdG9yeSkge31cblxuICBnZXQgaW50ZXJuYWxIb3N0Vmlld0ZhY3RvcnkoKTogSG9zdFZpZXdGYWN0b3J5IHsgcmV0dXJuIHRoaXMuX2hvc3RWaWV3RmFjdG9yeTsgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
