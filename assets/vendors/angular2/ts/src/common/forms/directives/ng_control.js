System.register(['./abstract_control_directive', 'angular2/src/facade/exceptions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var abstract_control_directive_1, exceptions_1;
    var NgControl;
    return {
        setters:[
            function (abstract_control_directive_1_1) {
                abstract_control_directive_1 = abstract_control_directive_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
            /**
             * A base class that all control directive extend.
             * It binds a {@link Control} object to a DOM element.
             *
             * Used internally by Angular forms.
             */
            NgControl = (function (_super) {
                __extends(NgControl, _super);
                function NgControl() {
                    _super.apply(this, arguments);
                    this.name = null;
                    this.valueAccessor = null;
                }
                Object.defineProperty(NgControl.prototype, "validator", {
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgControl.prototype, "asyncValidator", {
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                return NgControl;
            }(abstract_control_directive_1.AbstractControlDirective));
            exports_1("NgControl", NgControl);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZm9ybXMvZGlyZWN0aXZlcy9uZ19jb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFLQTs7Ozs7ZUFLRztZQUNIO2dCQUF3Qyw2QkFBd0I7Z0JBQWhFO29CQUF3Qyw4QkFBd0I7b0JBQzlELFNBQUksR0FBVyxJQUFJLENBQUM7b0JBQ3BCLGtCQUFhLEdBQXlCLElBQUksQ0FBQztnQkFNN0MsQ0FBQztnQkFKQyxzQkFBSSxnQ0FBUzt5QkFBYixjQUErQixNQUFNLENBQWMsMEJBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUNyRSxzQkFBSSxxQ0FBYzt5QkFBbEIsY0FBeUMsTUFBTSxDQUFtQiwwQkFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBR3RGLGdCQUFDO1lBQUQsQ0FSQSxBQVFDLENBUnVDLHFEQUF3QixHQVEvRDtZQVJELGlDQVFDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL25nX2NvbnRyb2wuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL2NvbnRyb2xfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2xEaXJlY3RpdmV9IGZyb20gJy4vYWJzdHJhY3RfY29udHJvbF9kaXJlY3RpdmUnO1xuaW1wb3J0IHt1bmltcGxlbWVudGVkfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtBc3luY1ZhbGlkYXRvckZuLCBWYWxpZGF0b3JGbn0gZnJvbSAnLi92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBBIGJhc2UgY2xhc3MgdGhhdCBhbGwgY29udHJvbCBkaXJlY3RpdmUgZXh0ZW5kLlxuICogSXQgYmluZHMgYSB7QGxpbmsgQ29udHJvbH0gb2JqZWN0IHRvIGEgRE9NIGVsZW1lbnQuXG4gKlxuICogVXNlZCBpbnRlcm5hbGx5IGJ5IEFuZ3VsYXIgZm9ybXMuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOZ0NvbnRyb2wgZXh0ZW5kcyBBYnN0cmFjdENvbnRyb2xEaXJlY3RpdmUge1xuICBuYW1lOiBzdHJpbmcgPSBudWxsO1xuICB2YWx1ZUFjY2Vzc29yOiBDb250cm9sVmFsdWVBY2Nlc3NvciA9IG51bGw7XG5cbiAgZ2V0IHZhbGlkYXRvcigpOiBWYWxpZGF0b3JGbiB7IHJldHVybiA8VmFsaWRhdG9yRm4+dW5pbXBsZW1lbnRlZCgpOyB9XG4gIGdldCBhc3luY1ZhbGlkYXRvcigpOiBBc3luY1ZhbGlkYXRvckZuIHsgcmV0dXJuIDxBc3luY1ZhbGlkYXRvckZuPnVuaW1wbGVtZW50ZWQoKTsgfVxuXG4gIGFic3RyYWN0IHZpZXdUb01vZGVsVXBkYXRlKG5ld1ZhbHVlOiBhbnkpOiB2b2lkO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
