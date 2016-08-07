System.register(["angular2/src/facade/exceptions"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var exceptions_1;
    var ExpressionChangedAfterItHasBeenCheckedException, ChangeDetectionError, DehydratedException, EventEvaluationError, EventEvaluationErrorContext;
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
                function ExpressionChangedAfterItHasBeenCheckedException(exp, oldValue, currValue, context) {
                    _super.call(this, ("Expression '" + exp + "' has changed after it was checked. ") +
                        ("Previous value: '" + oldValue + "'. Current value: '" + currValue + "'"));
                }
                return ExpressionChangedAfterItHasBeenCheckedException;
            }(exceptions_1.BaseException));
            exports_1("ExpressionChangedAfterItHasBeenCheckedException", ExpressionChangedAfterItHasBeenCheckedException);
            /**
             * Thrown when an expression evaluation raises an exception.
             *
             * This error wraps the original exception to attach additional contextual information that can
             * be useful for debugging.
             *
             * ### Example ([live demo](http://plnkr.co/edit/2Kywoz?p=preview))
             *
             * ```typescript
             * @Directive({selector: 'child', inputs: ['prop']})
             * class Child {
             *   prop;
             * }
             *
             * @Component({
             *   selector: 'app',
             *   template: `
             *     <child [prop]="field.first"></child>
             *   `,
             *   directives: [Child]
             * })
             * class App {
             *   field = null;
             * }
             *
             * bootstrap(App);
             * ```
             *
             * You can access the original exception and stack through the `originalException` and
             * `originalStack` properties.
             */
            ChangeDetectionError = (function (_super) {
                __extends(ChangeDetectionError, _super);
                function ChangeDetectionError(exp, originalException, originalStack, context) {
                    _super.call(this, originalException + " in [" + exp + "]", originalException, originalStack, context);
                    this.location = exp;
                }
                return ChangeDetectionError;
            }(exceptions_1.WrappedException));
            exports_1("ChangeDetectionError", ChangeDetectionError);
            /**
             * Thrown when change detector executes on dehydrated view.
             *
             * This error indicates a bug in the framework.
             *
             * This is an internal Angular error.
             */
            DehydratedException = (function (_super) {
                __extends(DehydratedException, _super);
                function DehydratedException(details) {
                    _super.call(this, "Attempt to use a dehydrated detector: " + details);
                }
                return DehydratedException;
            }(exceptions_1.BaseException));
            exports_1("DehydratedException", DehydratedException);
            /**
             * Wraps an exception thrown by an event handler.
             */
            EventEvaluationError = (function (_super) {
                __extends(EventEvaluationError, _super);
                function EventEvaluationError(eventName, originalException, originalStack, context) {
                    _super.call(this, "Error during evaluation of \"" + eventName + "\"", originalException, originalStack, context);
                }
                return EventEvaluationError;
            }(exceptions_1.WrappedException));
            exports_1("EventEvaluationError", EventEvaluationError);
            /**
             * Error context included when an event handler throws an exception.
             */
            EventEvaluationErrorContext = (function () {
                function EventEvaluationErrorContext(element, componentElement, context, locals, injector) {
                    this.element = element;
                    this.componentElement = componentElement;
                    this.context = context;
                    this.locals = locals;
                    this.injector = injector;
                }
                return EventEvaluationErrorContext;
            }());
            exports_1("EventEvaluationErrorContext", EventEvaluationErrorContext);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9leGNlcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7WUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFnQ0c7WUFDSDtnQkFBcUUsbUVBQWE7Z0JBQ2hGLHlEQUFZLEdBQVcsRUFBRSxRQUFhLEVBQUUsU0FBYyxFQUFFLE9BQVk7b0JBQ2xFLGtCQUFNLGtCQUFlLEdBQUcsMENBQXNDO3dCQUN4RCx1QkFBb0IsUUFBUSwyQkFBc0IsU0FBUyxPQUFHLENBQUMsQ0FBQztnQkFDeEUsQ0FBQztnQkFDSCxzREFBQztZQUFELENBTEEsQUFLQyxDQUxvRSwwQkFBYSxHQUtqRjtZQUxELDZHQUtDLENBQUE7WUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBOEJHO1lBQ0g7Z0JBQTBDLHdDQUFnQjtnQkFNeEQsOEJBQVksR0FBVyxFQUFFLGlCQUFzQixFQUFFLGFBQWtCLEVBQUUsT0FBWTtvQkFDL0Usa0JBQVMsaUJBQWlCLGFBQVEsR0FBRyxNQUFHLEVBQUUsaUJBQWlCLEVBQUUsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUNyRixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztnQkFDdEIsQ0FBQztnQkFDSCwyQkFBQztZQUFELENBVkEsQUFVQyxDQVZ5Qyw2QkFBZ0IsR0FVekQ7WUFWRCx1REFVQyxDQUFBO1lBRUQ7Ozs7OztlQU1HO1lBQ0g7Z0JBQXlDLHVDQUFhO2dCQUNwRCw2QkFBWSxPQUFlO29CQUFJLGtCQUFNLDJDQUF5QyxPQUFTLENBQUMsQ0FBQztnQkFBQyxDQUFDO2dCQUM3RiwwQkFBQztZQUFELENBRkEsQUFFQyxDQUZ3QywwQkFBYSxHQUVyRDtZQUZELHFEQUVDLENBQUE7WUFFRDs7ZUFFRztZQUNIO2dCQUEwQyx3Q0FBZ0I7Z0JBQ3hELDhCQUFZLFNBQWlCLEVBQUUsaUJBQXNCLEVBQUUsYUFBa0IsRUFBRSxPQUFZO29CQUNyRixrQkFBTSxrQ0FBK0IsU0FBUyxPQUFHLEVBQUUsaUJBQWlCLEVBQUUsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUNoRyxDQUFDO2dCQUNILDJCQUFDO1lBQUQsQ0FKQSxBQUlDLENBSnlDLDZCQUFnQixHQUl6RDtZQUpELHVEQUlDLENBQUE7WUFFRDs7ZUFFRztZQUNIO2dCQUNFLHFDQUFtQixPQUFZLEVBQVMsZ0JBQXFCLEVBQVMsT0FBWSxFQUMvRCxNQUFXLEVBQVMsUUFBYTtvQkFEakMsWUFBTyxHQUFQLE9BQU8sQ0FBSztvQkFBUyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQUs7b0JBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBSztvQkFDL0QsV0FBTSxHQUFOLE1BQU0sQ0FBSztvQkFBUyxhQUFRLEdBQVIsUUFBUSxDQUFLO2dCQUFHLENBQUM7Z0JBQzFELGtDQUFDO1lBQUQsQ0FIQSxBQUdDLElBQUE7WUFIRCxxRUFHQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9leGNlcHRpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCYXNlRXhjZXB0aW9uLCBXcmFwcGVkRXhjZXB0aW9ufSBmcm9tIFwiYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zXCI7XG5cbi8qKlxuICogQW4gZXJyb3IgdGhyb3duIGlmIGFwcGxpY2F0aW9uIGNoYW5nZXMgbW9kZWwgYnJlYWtpbmcgdGhlIHRvcC1kb3duIGRhdGEgZmxvdy5cbiAqXG4gKiBUaGlzIGV4Y2VwdGlvbiBpcyBvbmx5IHRocm93biBpbiBkZXYgbW9kZS5cbiAqXG4gKiA8IS0tIFRPRE86IEFkZCBhIGxpbmsgb25jZSB0aGUgZGV2IG1vZGUgb3B0aW9uIGlzIGNvbmZpZ3VyYWJsZSAtLT5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIEBDb21wb25lbnQoe1xuICogICBzZWxlY3RvcjogJ3BhcmVudCcsXG4gKiAgIHRlbXBsYXRlOiBgXG4gKiAgICAgPGNoaWxkIFtwcm9wXT1cInBhcmVudFByb3BcIj48L2NoaWxkPlxuICogICBgLFxuICogICBkaXJlY3RpdmVzOiBbZm9yd2FyZFJlZigoKSA9PiBDaGlsZCldXG4gKiB9KVxuICogY2xhc3MgUGFyZW50IHtcbiAqICAgcGFyZW50UHJvcCA9IFwiaW5pdFwiO1xuICogfVxuICpcbiAqIEBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnY2hpbGQnLCBpbnB1dHM6IFsncHJvcCddfSlcbiAqIGNsYXNzIENoaWxkIHtcbiAqICAgY29uc3RydWN0b3IocHVibGljIHBhcmVudDogUGFyZW50KSB7fVxuICpcbiAqICAgc2V0IHByb3Aodikge1xuICogICAgIC8vIHRoaXMgdXBkYXRlcyB0aGUgcGFyZW50IHByb3BlcnR5LCB3aGljaCBpcyBkaXNhbGxvd2VkIGR1cmluZyBjaGFuZ2UgZGV0ZWN0aW9uXG4gKiAgICAgLy8gdGhpcyB3aWxsIHJlc3VsdCBpbiBFeHByZXNzaW9uQ2hhbmdlZEFmdGVySXRIYXNCZWVuQ2hlY2tlZEV4Y2VwdGlvblxuICogICAgIHRoaXMucGFyZW50LnBhcmVudFByb3AgPSBcInVwZGF0ZWRcIjtcbiAqICAgfVxuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBFeHByZXNzaW9uQ2hhbmdlZEFmdGVySXRIYXNCZWVuQ2hlY2tlZEV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcihleHA6IHN0cmluZywgb2xkVmFsdWU6IGFueSwgY3VyclZhbHVlOiBhbnksIGNvbnRleHQ6IGFueSkge1xuICAgIHN1cGVyKGBFeHByZXNzaW9uICcke2V4cH0nIGhhcyBjaGFuZ2VkIGFmdGVyIGl0IHdhcyBjaGVja2VkLiBgICtcbiAgICAgICAgICBgUHJldmlvdXMgdmFsdWU6ICcke29sZFZhbHVlfScuIEN1cnJlbnQgdmFsdWU6ICcke2N1cnJWYWx1ZX0nYCk7XG4gIH1cbn1cblxuLyoqXG4gKiBUaHJvd24gd2hlbiBhbiBleHByZXNzaW9uIGV2YWx1YXRpb24gcmFpc2VzIGFuIGV4Y2VwdGlvbi5cbiAqXG4gKiBUaGlzIGVycm9yIHdyYXBzIHRoZSBvcmlnaW5hbCBleGNlcHRpb24gdG8gYXR0YWNoIGFkZGl0aW9uYWwgY29udGV4dHVhbCBpbmZvcm1hdGlvbiB0aGF0IGNhblxuICogYmUgdXNlZnVsIGZvciBkZWJ1Z2dpbmcuXG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0LzJLeXdvej9wPXByZXZpZXcpKVxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIEBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnY2hpbGQnLCBpbnB1dHM6IFsncHJvcCddfSlcbiAqIGNsYXNzIENoaWxkIHtcbiAqICAgcHJvcDtcbiAqIH1cbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICAgc2VsZWN0b3I6ICdhcHAnLFxuICogICB0ZW1wbGF0ZTogYFxuICogICAgIDxjaGlsZCBbcHJvcF09XCJmaWVsZC5maXJzdFwiPjwvY2hpbGQ+XG4gKiAgIGAsXG4gKiAgIGRpcmVjdGl2ZXM6IFtDaGlsZF1cbiAqIH0pXG4gKiBjbGFzcyBBcHAge1xuICogICBmaWVsZCA9IG51bGw7XG4gKiB9XG4gKlxuICogYm9vdHN0cmFwKEFwcCk7XG4gKiBgYGBcbiAqXG4gKiBZb3UgY2FuIGFjY2VzcyB0aGUgb3JpZ2luYWwgZXhjZXB0aW9uIGFuZCBzdGFjayB0aHJvdWdoIHRoZSBgb3JpZ2luYWxFeGNlcHRpb25gIGFuZFxuICogYG9yaWdpbmFsU3RhY2tgIHByb3BlcnRpZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBDaGFuZ2VEZXRlY3Rpb25FcnJvciBleHRlbmRzIFdyYXBwZWRFeGNlcHRpb24ge1xuICAvKipcbiAgICogSW5mb3JtYXRpb24gYWJvdXQgdGhlIGV4cHJlc3Npb24gdGhhdCB0cmlnZ2VyZWQgdGhlIGV4Y2VwdGlvbi5cbiAgICovXG4gIGxvY2F0aW9uOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoZXhwOiBzdHJpbmcsIG9yaWdpbmFsRXhjZXB0aW9uOiBhbnksIG9yaWdpbmFsU3RhY2s6IGFueSwgY29udGV4dDogYW55KSB7XG4gICAgc3VwZXIoYCR7b3JpZ2luYWxFeGNlcHRpb259IGluIFske2V4cH1dYCwgb3JpZ2luYWxFeGNlcHRpb24sIG9yaWdpbmFsU3RhY2ssIGNvbnRleHQpO1xuICAgIHRoaXMubG9jYXRpb24gPSBleHA7XG4gIH1cbn1cblxuLyoqXG4gKiBUaHJvd24gd2hlbiBjaGFuZ2UgZGV0ZWN0b3IgZXhlY3V0ZXMgb24gZGVoeWRyYXRlZCB2aWV3LlxuICpcbiAqIFRoaXMgZXJyb3IgaW5kaWNhdGVzIGEgYnVnIGluIHRoZSBmcmFtZXdvcmsuXG4gKlxuICogVGhpcyBpcyBhbiBpbnRlcm5hbCBBbmd1bGFyIGVycm9yLlxuICovXG5leHBvcnQgY2xhc3MgRGVoeWRyYXRlZEV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcihkZXRhaWxzOiBzdHJpbmcpIHsgc3VwZXIoYEF0dGVtcHQgdG8gdXNlIGEgZGVoeWRyYXRlZCBkZXRlY3RvcjogJHtkZXRhaWxzfWApOyB9XG59XG5cbi8qKlxuICogV3JhcHMgYW4gZXhjZXB0aW9uIHRocm93biBieSBhbiBldmVudCBoYW5kbGVyLlxuICovXG5leHBvcnQgY2xhc3MgRXZlbnRFdmFsdWF0aW9uRXJyb3IgZXh0ZW5kcyBXcmFwcGVkRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IoZXZlbnROYW1lOiBzdHJpbmcsIG9yaWdpbmFsRXhjZXB0aW9uOiBhbnksIG9yaWdpbmFsU3RhY2s6IGFueSwgY29udGV4dDogYW55KSB7XG4gICAgc3VwZXIoYEVycm9yIGR1cmluZyBldmFsdWF0aW9uIG9mIFwiJHtldmVudE5hbWV9XCJgLCBvcmlnaW5hbEV4Y2VwdGlvbiwgb3JpZ2luYWxTdGFjaywgY29udGV4dCk7XG4gIH1cbn1cblxuLyoqXG4gKiBFcnJvciBjb250ZXh0IGluY2x1ZGVkIHdoZW4gYW4gZXZlbnQgaGFuZGxlciB0aHJvd3MgYW4gZXhjZXB0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgRXZlbnRFdmFsdWF0aW9uRXJyb3JDb250ZXh0IHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IGFueSwgcHVibGljIGNvbXBvbmVudEVsZW1lbnQ6IGFueSwgcHVibGljIGNvbnRleHQ6IGFueSxcbiAgICAgICAgICAgICAgcHVibGljIGxvY2FsczogYW55LCBwdWJsaWMgaW5qZWN0b3I6IGFueSkge31cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
