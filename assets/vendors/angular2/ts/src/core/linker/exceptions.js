System.register(["angular2/src/facade/exceptions"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var exceptions_1;
    var ExpressionChangedAfterItHasBeenCheckedException, ViewWrappedException, ViewDestroyedException;
    return {
        setters:[
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
            /**
             * An error thrown if application changes model breaking the top-down data flow.
             *
             * This exception is only thrown in dev mode.
             *
             * <!-- TODO: Add a link once the dev mode option is configurable -->
             *
             * ### Example
             *
             * ```typescript
             * @Component({
             *   selector: 'parent',
             *   template: `
             *     <child [prop]="parentProp"></child>
             *   `,
             *   directives: [forwardRef(() => Child)]
             * })
             * class Parent {
             *   parentProp = "init";
             * }
             *
             * @Directive({selector: 'child', inputs: ['prop']})
             * class Child {
             *   constructor(public parent: Parent) {}
             *
             *   set prop(v) {
             *     // this updates the parent property, which is disallowed during change detection
             *     // this will result in ExpressionChangedAfterItHasBeenCheckedException
             *     this.parent.parentProp = "updated";
             *   }
             * }
             * ```
             */
            ExpressionChangedAfterItHasBeenCheckedException = (function (_super) {
                __extends(ExpressionChangedAfterItHasBeenCheckedException, _super);
                function ExpressionChangedAfterItHasBeenCheckedException(oldValue, currValue, context) {
                    _super.call(this, "Expression has changed after it was checked. " +
                        ("Previous value: '" + oldValue + "'. Current value: '" + currValue + "'"));
                }
                return ExpressionChangedAfterItHasBeenCheckedException;
            }(exceptions_1.BaseException));
            exports_1("ExpressionChangedAfterItHasBeenCheckedException", ExpressionChangedAfterItHasBeenCheckedException);
            /**
             * Thrown when an exception was raised during view creation, change detection or destruction.
             *
             * This error wraps the original exception to attach additional contextual information that can
             * be useful for debugging.
             */
            ViewWrappedException = (function (_super) {
                __extends(ViewWrappedException, _super);
                function ViewWrappedException(originalException, originalStack, context) {
                    _super.call(this, "Error in " + context.source, originalException, originalStack, context);
                }
                return ViewWrappedException;
            }(exceptions_1.WrappedException));
            exports_1("ViewWrappedException", ViewWrappedException);
            /**
             * Thrown when a destroyed view is used.
             *
             * This error indicates a bug in the framework.
             *
             * This is an internal Angular error.
             */
            ViewDestroyedException = (function (_super) {
                __extends(ViewDestroyedException, _super);
                function ViewDestroyedException(details) {
                    _super.call(this, "Attempt to use a destroyed view: " + details);
                }
                return ViewDestroyedException;
            }(exceptions_1.BaseException));
            exports_1("ViewDestroyedException", ViewDestroyedException);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2xpbmtlci9leGNlcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7WUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFnQ0c7WUFDSDtnQkFBcUUsbUVBQWE7Z0JBQ2hGLHlEQUFZLFFBQWEsRUFBRSxTQUFjLEVBQUUsT0FBWTtvQkFDckQsa0JBQU0sK0NBQStDO3dCQUMvQyx1QkFBb0IsUUFBUSwyQkFBc0IsU0FBUyxPQUFHLENBQUMsQ0FBQztnQkFDeEUsQ0FBQztnQkFDSCxzREFBQztZQUFELENBTEEsQUFLQyxDQUxvRSwwQkFBYSxHQUtqRjtZQUxELDZHQUtDLENBQUE7WUFFRDs7Ozs7ZUFLRztZQUNIO2dCQUEwQyx3Q0FBZ0I7Z0JBQ3hELDhCQUFZLGlCQUFzQixFQUFFLGFBQWtCLEVBQUUsT0FBWTtvQkFDbEUsa0JBQU0sY0FBWSxPQUFPLENBQUMsTUFBUSxFQUFFLGlCQUFpQixFQUFFLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDakYsQ0FBQztnQkFDSCwyQkFBQztZQUFELENBSkEsQUFJQyxDQUp5Qyw2QkFBZ0IsR0FJekQ7WUFKRCx1REFJQyxDQUFBO1lBRUQ7Ozs7OztlQU1HO1lBQ0g7Z0JBQTRDLDBDQUFhO2dCQUN2RCxnQ0FBWSxPQUFlO29CQUFJLGtCQUFNLHNDQUFvQyxPQUFTLENBQUMsQ0FBQztnQkFBQyxDQUFDO2dCQUN4Riw2QkFBQztZQUFELENBRkEsQUFFQyxDQUYyQywwQkFBYSxHQUV4RDtZQUZELDJEQUVDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvbGlua2VyL2V4Y2VwdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Jhc2VFeGNlcHRpb24sIFdyYXBwZWRFeGNlcHRpb259IGZyb20gXCJhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnNcIjtcblxuLyoqXG4gKiBBbiBlcnJvciB0aHJvd24gaWYgYXBwbGljYXRpb24gY2hhbmdlcyBtb2RlbCBicmVha2luZyB0aGUgdG9wLWRvd24gZGF0YSBmbG93LlxuICpcbiAqIFRoaXMgZXhjZXB0aW9uIGlzIG9ubHkgdGhyb3duIGluIGRldiBtb2RlLlxuICpcbiAqIDwhLS0gVE9ETzogQWRkIGEgbGluayBvbmNlIHRoZSBkZXYgbW9kZSBvcHRpb24gaXMgY29uZmlndXJhYmxlIC0tPlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogQENvbXBvbmVudCh7XG4gKiAgIHNlbGVjdG9yOiAncGFyZW50JyxcbiAqICAgdGVtcGxhdGU6IGBcbiAqICAgICA8Y2hpbGQgW3Byb3BdPVwicGFyZW50UHJvcFwiPjwvY2hpbGQ+XG4gKiAgIGAsXG4gKiAgIGRpcmVjdGl2ZXM6IFtmb3J3YXJkUmVmKCgpID0+IENoaWxkKV1cbiAqIH0pXG4gKiBjbGFzcyBQYXJlbnQge1xuICogICBwYXJlbnRQcm9wID0gXCJpbml0XCI7XG4gKiB9XG4gKlxuICogQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdjaGlsZCcsIGlucHV0czogWydwcm9wJ119KVxuICogY2xhc3MgQ2hpbGQge1xuICogICBjb25zdHJ1Y3RvcihwdWJsaWMgcGFyZW50OiBQYXJlbnQpIHt9XG4gKlxuICogICBzZXQgcHJvcCh2KSB7XG4gKiAgICAgLy8gdGhpcyB1cGRhdGVzIHRoZSBwYXJlbnQgcHJvcGVydHksIHdoaWNoIGlzIGRpc2FsbG93ZWQgZHVyaW5nIGNoYW5nZSBkZXRlY3Rpb25cbiAqICAgICAvLyB0aGlzIHdpbGwgcmVzdWx0IGluIEV4cHJlc3Npb25DaGFuZ2VkQWZ0ZXJJdEhhc0JlZW5DaGVja2VkRXhjZXB0aW9uXG4gKiAgICAgdGhpcy5wYXJlbnQucGFyZW50UHJvcCA9IFwidXBkYXRlZFwiO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNsYXNzIEV4cHJlc3Npb25DaGFuZ2VkQWZ0ZXJJdEhhc0JlZW5DaGVja2VkRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKG9sZFZhbHVlOiBhbnksIGN1cnJWYWx1ZTogYW55LCBjb250ZXh0OiBhbnkpIHtcbiAgICBzdXBlcihgRXhwcmVzc2lvbiBoYXMgY2hhbmdlZCBhZnRlciBpdCB3YXMgY2hlY2tlZC4gYCArXG4gICAgICAgICAgYFByZXZpb3VzIHZhbHVlOiAnJHtvbGRWYWx1ZX0nLiBDdXJyZW50IHZhbHVlOiAnJHtjdXJyVmFsdWV9J2ApO1xuICB9XG59XG5cbi8qKlxuICogVGhyb3duIHdoZW4gYW4gZXhjZXB0aW9uIHdhcyByYWlzZWQgZHVyaW5nIHZpZXcgY3JlYXRpb24sIGNoYW5nZSBkZXRlY3Rpb24gb3IgZGVzdHJ1Y3Rpb24uXG4gKlxuICogVGhpcyBlcnJvciB3cmFwcyB0aGUgb3JpZ2luYWwgZXhjZXB0aW9uIHRvIGF0dGFjaCBhZGRpdGlvbmFsIGNvbnRleHR1YWwgaW5mb3JtYXRpb24gdGhhdCBjYW5cbiAqIGJlIHVzZWZ1bCBmb3IgZGVidWdnaW5nLlxuICovXG5leHBvcnQgY2xhc3MgVmlld1dyYXBwZWRFeGNlcHRpb24gZXh0ZW5kcyBXcmFwcGVkRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3Iob3JpZ2luYWxFeGNlcHRpb246IGFueSwgb3JpZ2luYWxTdGFjazogYW55LCBjb250ZXh0OiBhbnkpIHtcbiAgICBzdXBlcihgRXJyb3IgaW4gJHtjb250ZXh0LnNvdXJjZX1gLCBvcmlnaW5hbEV4Y2VwdGlvbiwgb3JpZ2luYWxTdGFjaywgY29udGV4dCk7XG4gIH1cbn1cblxuLyoqXG4gKiBUaHJvd24gd2hlbiBhIGRlc3Ryb3llZCB2aWV3IGlzIHVzZWQuXG4gKlxuICogVGhpcyBlcnJvciBpbmRpY2F0ZXMgYSBidWcgaW4gdGhlIGZyYW1ld29yay5cbiAqXG4gKiBUaGlzIGlzIGFuIGludGVybmFsIEFuZ3VsYXIgZXJyb3IuXG4gKi9cbmV4cG9ydCBjbGFzcyBWaWV3RGVzdHJveWVkRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKGRldGFpbHM6IHN0cmluZykgeyBzdXBlcihgQXR0ZW1wdCB0byB1c2UgYSBkZXN0cm95ZWQgdmlldzogJHtkZXRhaWxzfWApOyB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
