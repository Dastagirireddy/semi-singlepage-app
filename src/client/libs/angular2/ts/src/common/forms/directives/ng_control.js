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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL25nX2NvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUtBOzs7OztlQUtHO1lBQ0g7Z0JBQXdDLDZCQUF3QjtnQkFBaEU7b0JBQXdDLDhCQUF3QjtvQkFDOUQsU0FBSSxHQUFXLElBQUksQ0FBQztvQkFDcEIsa0JBQWEsR0FBeUIsSUFBSSxDQUFDO2dCQU03QyxDQUFDO2dCQUpDLHNCQUFJLGdDQUFTO3lCQUFiLGNBQStCLE1BQU0sQ0FBYywwQkFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBQ3JFLHNCQUFJLHFDQUFjO3lCQUFsQixjQUF5QyxNQUFNLENBQW1CLDBCQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFHdEYsZ0JBQUM7WUFBRCxDQVJBLEFBUUMsQ0FSdUMscURBQXdCLEdBUS9EO1lBUkQsaUNBUUMsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZm9ybXMvZGlyZWN0aXZlcy9uZ19jb250cm9sLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9jb250cm9sX3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sRGlyZWN0aXZlfSBmcm9tICcuL2Fic3RyYWN0X2NvbnRyb2xfZGlyZWN0aXZlJztcbmltcG9ydCB7dW5pbXBsZW1lbnRlZH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7QXN5bmNWYWxpZGF0b3JGbiwgVmFsaWRhdG9yRm59IGZyb20gJy4vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogQSBiYXNlIGNsYXNzIHRoYXQgYWxsIGNvbnRyb2wgZGlyZWN0aXZlIGV4dGVuZC5cbiAqIEl0IGJpbmRzIGEge0BsaW5rIENvbnRyb2x9IG9iamVjdCB0byBhIERPTSBlbGVtZW50LlxuICpcbiAqIFVzZWQgaW50ZXJuYWxseSBieSBBbmd1bGFyIGZvcm1zLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTmdDb250cm9sIGV4dGVuZHMgQWJzdHJhY3RDb250cm9sRGlyZWN0aXZlIHtcbiAgbmFtZTogc3RyaW5nID0gbnVsbDtcbiAgdmFsdWVBY2Nlc3NvcjogQ29udHJvbFZhbHVlQWNjZXNzb3IgPSBudWxsO1xuXG4gIGdldCB2YWxpZGF0b3IoKTogVmFsaWRhdG9yRm4geyByZXR1cm4gPFZhbGlkYXRvckZuPnVuaW1wbGVtZW50ZWQoKTsgfVxuICBnZXQgYXN5bmNWYWxpZGF0b3IoKTogQXN5bmNWYWxpZGF0b3JGbiB7IHJldHVybiA8QXN5bmNWYWxpZGF0b3JGbj51bmltcGxlbWVudGVkKCk7IH1cblxuICBhYnN0cmFjdCB2aWV3VG9Nb2RlbFVwZGF0ZShuZXdWYWx1ZTogYW55KTogdm9pZDtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
