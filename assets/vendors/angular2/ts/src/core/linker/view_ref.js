System.register(['angular2/src/facade/exceptions', '../change_detection/change_detector_ref', 'angular2/src/core/change_detection/constants'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var exceptions_1, change_detector_ref_1, constants_1;
    var ViewRef, EmbeddedViewRef, ViewRef_;
    return {
        setters:[
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (change_detector_ref_1_1) {
                change_detector_ref_1 = change_detector_ref_1_1;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            }],
        execute: function() {
            ViewRef = (function (_super) {
                __extends(ViewRef, _super);
                function ViewRef() {
                    _super.apply(this, arguments);
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
            }(change_detector_ref_1.ChangeDetectorRef));
            exports_1("ViewRef", ViewRef);
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
             *   <li *ngFor="let  item of items">{{item}}</li>
             * </ul>
             * ```
             *
             * ... we have two {@link ProtoViewRef}s:
             *
             * Outer {@link ProtoViewRef}:
             * ```
             * Count: {{items.length}}
             * <ul>
             *   <template ngFor let-item [ngForOf]="items"></template>
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
                    get: function () { return this; },
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
                ViewRef_.prototype.markForCheck = function () { this._view.markPathToRootAsCheckOnce(); };
                ViewRef_.prototype.detach = function () { this._view.cdMode = constants_1.ChangeDetectionStrategy.Detached; };
                ViewRef_.prototype.detectChanges = function () { this._view.detectChanges(false); };
                ViewRef_.prototype.checkNoChanges = function () { this._view.detectChanges(true); };
                ViewRef_.prototype.reattach = function () {
                    this._view.cdMode = constants_1.ChangeDetectionStrategy.CheckAlways;
                    this.markForCheck();
                };
                ViewRef_.prototype.onDestroy = function (callback) { this._view.disposables.push(callback); };
                ViewRef_.prototype.destroy = function () { this._view.destroy(); };
                return ViewRef_;
            }());
            exports_1("ViewRef_", ViewRef_);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2xpbmtlci92aWV3X3JlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBTUE7Z0JBQXNDLDJCQUFpQjtnQkFBdkQ7b0JBQXNDLDhCQUFpQjtnQkFTdkQsQ0FBQztnQkFMQyxzQkFBSSxzQ0FBaUI7b0JBSHJCOzt1QkFFRzt5QkFDSCxjQUE2QyxNQUFNLENBQW9CLDBCQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTs7Z0JBRXpGLHNCQUFJLDhCQUFTO3lCQUFiLGNBQTJCLE1BQU0sQ0FBVSwwQkFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBRy9ELGNBQUM7WUFBRCxDQVRBLEFBU0MsQ0FUcUMsdUNBQWlCLEdBU3REO1lBVEQsNkJBU0MsQ0FBQTtZQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBb0RHO1lBQ0g7Z0JBQThDLG1DQUFPO2dCQUFyRDtvQkFBOEMsOEJBQU87Z0JBaUJyRCxDQUFDO2dCQU5DLHNCQUFJLHNDQUFTO3lCQUFiLGNBQXlCLE1BQU0sQ0FBUSwwQkFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7O2dCQU0zRCxzQkFBQztZQUFELENBakJBLEFBaUJDLENBakI2QyxPQUFPLEdBaUJwRDtZQWpCRCw2Q0FpQkMsQ0FBQTtZQUVEO2dCQUNFLGtCQUFvQixLQUFtQjtvQkFBbkIsVUFBSyxHQUFMLEtBQUssQ0FBYztvQkFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFBQyxDQUFDO2dCQUVoRSxzQkFBSSxrQ0FBWTt5QkFBaEIsY0FBbUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBS3ZELHNCQUFJLHVDQUFpQjtvQkFIckI7O3VCQUVHO3lCQUNILGNBQTZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBRTNELHNCQUFJLCtCQUFTO3lCQUFiLGNBQXlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFFM0QsMkJBQVEsR0FBUixVQUFTLFlBQW9CLEVBQUUsS0FBVSxJQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTlGLDJCQUFRLEdBQVIsVUFBUyxZQUFvQixJQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXJGLHNCQUFJLCtCQUFTO3lCQUFiLGNBQTJCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFFekQsK0JBQVksR0FBWixjQUF1QixJQUFJLENBQUMsS0FBSyxDQUFDLHlCQUF5QixFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNoRSx5QkFBTSxHQUFOLGNBQWlCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLG1DQUF1QixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hFLGdDQUFhLEdBQWIsY0FBd0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxRCxpQ0FBYyxHQUFkLGNBQXlCLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUQsMkJBQVEsR0FBUjtvQkFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxtQ0FBdUIsQ0FBQyxXQUFXLENBQUM7b0JBQ3hELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQztnQkFFRCw0QkFBUyxHQUFULFVBQVUsUUFBa0IsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUV4RSwwQkFBTyxHQUFQLGNBQVksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLGVBQUM7WUFBRCxDQTlCQSxBQThCQyxJQUFBO1lBOUJELCtCQThCQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2xpbmtlci92aWV3X3JlZi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7dW5pbXBsZW1lbnRlZH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7aXNQcmVzZW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnLi4vY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0b3JfcmVmJztcbmltcG9ydCB7QXBwVmlld30gZnJvbSAnLi92aWV3JztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vY29uc3RhbnRzJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFZpZXdSZWYgZXh0ZW5kcyBDaGFuZ2VEZXRlY3RvclJlZiB7XG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGdldCBjaGFuZ2VEZXRlY3RvclJlZigpOiBDaGFuZ2VEZXRlY3RvclJlZiB7IHJldHVybiA8Q2hhbmdlRGV0ZWN0b3JSZWY+dW5pbXBsZW1lbnRlZCgpOyB9O1xuXG4gIGdldCBkZXN0cm95ZWQoKTogYm9vbGVhbiB7IHJldHVybiA8Ym9vbGVhbj51bmltcGxlbWVudGVkKCk7IH1cblxuICBhYnN0cmFjdCBvbkRlc3Ryb3koY2FsbGJhY2s6IEZ1bmN0aW9uKTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIEFuZ3VsYXIgVmlldy5cbiAqXG4gKiA8IS0tIFRPRE86IG1vdmUgdGhlIG5leHQgdHdvIHBhcmFncmFwaHMgdG8gdGhlIGRldiBndWlkZSAtLT5cbiAqIEEgVmlldyBpcyBhIGZ1bmRhbWVudGFsIGJ1aWxkaW5nIGJsb2NrIG9mIHRoZSBhcHBsaWNhdGlvbiBVSS4gSXQgaXMgdGhlIHNtYWxsZXN0IGdyb3VwaW5nIG9mXG4gKiBFbGVtZW50cyB3aGljaCBhcmUgY3JlYXRlZCBhbmQgZGVzdHJveWVkIHRvZ2V0aGVyLlxuICpcbiAqIFByb3BlcnRpZXMgb2YgZWxlbWVudHMgaW4gYSBWaWV3IGNhbiBjaGFuZ2UsIGJ1dCB0aGUgc3RydWN0dXJlIChudW1iZXIgYW5kIG9yZGVyKSBvZiBlbGVtZW50cyBpblxuICogYSBWaWV3IGNhbm5vdC4gQ2hhbmdpbmcgdGhlIHN0cnVjdHVyZSBvZiBFbGVtZW50cyBjYW4gb25seSBiZSBkb25lIGJ5IGluc2VydGluZywgbW92aW5nIG9yXG4gKiByZW1vdmluZyBuZXN0ZWQgVmlld3MgdmlhIGEge0BsaW5rIFZpZXdDb250YWluZXJSZWZ9LiBFYWNoIFZpZXcgY2FuIGNvbnRhaW4gbWFueSBWaWV3IENvbnRhaW5lcnMuXG4gKiA8IS0tIC9UT0RPIC0tPlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogR2l2ZW4gdGhpcyB0ZW1wbGF0ZS4uLlxuICpcbiAqIGBgYFxuICogQ291bnQ6IHt7aXRlbXMubGVuZ3RofX1cbiAqIDx1bD5cbiAqICAgPGxpICpuZ0Zvcj1cImxldCAgaXRlbSBvZiBpdGVtc1wiPnt7aXRlbX19PC9saT5cbiAqIDwvdWw+XG4gKiBgYGBcbiAqXG4gKiAuLi4gd2UgaGF2ZSB0d28ge0BsaW5rIFByb3RvVmlld1JlZn1zOlxuICpcbiAqIE91dGVyIHtAbGluayBQcm90b1ZpZXdSZWZ9OlxuICogYGBgXG4gKiBDb3VudDoge3tpdGVtcy5sZW5ndGh9fVxuICogPHVsPlxuICogICA8dGVtcGxhdGUgbmdGb3IgbGV0LWl0ZW0gW25nRm9yT2ZdPVwiaXRlbXNcIj48L3RlbXBsYXRlPlxuICogPC91bD5cbiAqIGBgYFxuICpcbiAqIElubmVyIHtAbGluayBQcm90b1ZpZXdSZWZ9OlxuICogYGBgXG4gKiAgIDxsaT57e2l0ZW19fTwvbGk+XG4gKiBgYGBcbiAqXG4gKiBOb3RpY2UgdGhhdCB0aGUgb3JpZ2luYWwgdGVtcGxhdGUgaXMgYnJva2VuIGRvd24gaW50byB0d28gc2VwYXJhdGUge0BsaW5rIFByb3RvVmlld1JlZn1zLlxuICpcbiAqIFRoZSBvdXRlci9pbm5lciB7QGxpbmsgUHJvdG9WaWV3UmVmfXMgYXJlIHRoZW4gYXNzZW1ibGVkIGludG8gdmlld3MgbGlrZSBzbzpcbiAqXG4gKiBgYGBcbiAqIDwhLS0gVmlld1JlZjogb3V0ZXItMCAtLT5cbiAqIENvdW50OiAyXG4gKiA8dWw+XG4gKiAgIDx0ZW1wbGF0ZSB2aWV3LWNvbnRhaW5lci1yZWY+PC90ZW1wbGF0ZT5cbiAqICAgPCEtLSBWaWV3UmVmOiBpbm5lci0xIC0tPjxsaT5maXJzdDwvbGk+PCEtLSAvVmlld1JlZjogaW5uZXItMSAtLT5cbiAqICAgPCEtLSBWaWV3UmVmOiBpbm5lci0yIC0tPjxsaT5zZWNvbmQ8L2xpPjwhLS0gL1ZpZXdSZWY6IGlubmVyLTIgLS0+XG4gKiA8L3VsPlxuICogPCEtLSAvVmlld1JlZjogb3V0ZXItMCAtLT5cbiAqIGBgYFxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRW1iZWRkZWRWaWV3UmVmIGV4dGVuZHMgVmlld1JlZiB7XG4gIC8qKlxuICAgKiBTZXRzIGB2YWx1ZWAgb2YgbG9jYWwgdmFyaWFibGUgY2FsbGVkIGB2YXJpYWJsZU5hbWVgIGluIHRoaXMgVmlldy5cbiAgICovXG4gIGFic3RyYWN0IHNldExvY2FsKHZhcmlhYmxlTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZDtcblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgdGhpcyB2aWV3IGhhcyBhIGxvY2FsIHZhcmlhYmxlIGNhbGxlZCBgdmFyaWFibGVOYW1lYC5cbiAgICovXG4gIGFic3RyYWN0IGhhc0xvY2FsKHZhcmlhYmxlTmFtZTogc3RyaW5nKTogYm9vbGVhbjtcblxuICBnZXQgcm9vdE5vZGVzKCk6IGFueVtdIHsgcmV0dXJuIDxhbnlbXT51bmltcGxlbWVudGVkKCk7IH07XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIHRoZSB2aWV3IGFuZCBhbGwgb2YgdGhlIGRhdGEgc3RydWN0dXJlcyBhc3NvY2lhdGVkIHdpdGggaXQuXG4gICAqL1xuICBhYnN0cmFjdCBkZXN0cm95KCk7XG59XG5cbmV4cG9ydCBjbGFzcyBWaWV3UmVmXyBpbXBsZW1lbnRzIEVtYmVkZGVkVmlld1JlZiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3ZpZXc6IEFwcFZpZXc8YW55PikgeyB0aGlzLl92aWV3ID0gX3ZpZXc7IH1cblxuICBnZXQgaW50ZXJuYWxWaWV3KCk6IEFwcFZpZXc8YW55PiB7IHJldHVybiB0aGlzLl92aWV3OyB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBgQ2hhbmdlRGV0ZWN0b3JSZWZgXG4gICAqL1xuICBnZXQgY2hhbmdlRGV0ZWN0b3JSZWYoKTogQ2hhbmdlRGV0ZWN0b3JSZWYgeyByZXR1cm4gdGhpczsgfVxuXG4gIGdldCByb290Tm9kZXMoKTogYW55W10geyByZXR1cm4gdGhpcy5fdmlldy5mbGF0Um9vdE5vZGVzOyB9XG5cbiAgc2V0TG9jYWwodmFyaWFibGVOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHsgdGhpcy5fdmlldy5zZXRMb2NhbCh2YXJpYWJsZU5hbWUsIHZhbHVlKTsgfVxuXG4gIGhhc0xvY2FsKHZhcmlhYmxlTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl92aWV3Lmhhc0xvY2FsKHZhcmlhYmxlTmFtZSk7IH1cblxuICBnZXQgZGVzdHJveWVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fdmlldy5kZXN0cm95ZWQ7IH1cblxuICBtYXJrRm9yQ2hlY2soKTogdm9pZCB7IHRoaXMuX3ZpZXcubWFya1BhdGhUb1Jvb3RBc0NoZWNrT25jZSgpOyB9XG4gIGRldGFjaCgpOiB2b2lkIHsgdGhpcy5fdmlldy5jZE1vZGUgPSBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZXRhY2hlZDsgfVxuICBkZXRlY3RDaGFuZ2VzKCk6IHZvaWQgeyB0aGlzLl92aWV3LmRldGVjdENoYW5nZXMoZmFsc2UpOyB9XG4gIGNoZWNrTm9DaGFuZ2VzKCk6IHZvaWQgeyB0aGlzLl92aWV3LmRldGVjdENoYW5nZXModHJ1ZSk7IH1cbiAgcmVhdHRhY2goKTogdm9pZCB7XG4gICAgdGhpcy5fdmlldy5jZE1vZGUgPSBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5DaGVja0Fsd2F5cztcbiAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgb25EZXN0cm95KGNhbGxiYWNrOiBGdW5jdGlvbikgeyB0aGlzLl92aWV3LmRpc3Bvc2FibGVzLnB1c2goY2FsbGJhY2spOyB9XG5cbiAgZGVzdHJveSgpIHsgdGhpcy5fdmlldy5kZXN0cm95KCk7IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
