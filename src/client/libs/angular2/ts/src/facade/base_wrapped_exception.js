System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var BaseWrappedException;
    return {
        setters:[],
        execute: function() {
            /**
             * A base class for the WrappedException that can be used to identify
             * a WrappedException from ExceptionHandler without adding circular
             * dependency.
             */
            BaseWrappedException = (function (_super) {
                __extends(BaseWrappedException, _super);
                function BaseWrappedException(message) {
                    _super.call(this, message);
                }
                Object.defineProperty(BaseWrappedException.prototype, "wrapperMessage", {
                    get: function () { return ''; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseWrappedException.prototype, "wrapperStack", {
                    get: function () { return null; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseWrappedException.prototype, "originalException", {
                    get: function () { return null; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseWrappedException.prototype, "originalStack", {
                    get: function () { return null; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseWrappedException.prototype, "context", {
                    get: function () { return null; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseWrappedException.prototype, "message", {
                    get: function () { return ''; },
                    enumerable: true,
                    configurable: true
                });
                return BaseWrappedException;
            }(Error));
            exports_1("BaseWrappedException", BaseWrappedException);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2ZhY2FkZS9iYXNlX3dyYXBwZWRfZXhjZXB0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztZQUFBOzs7O2VBSUc7WUFDSDtnQkFBMEMsd0NBQUs7Z0JBQzdDLDhCQUFZLE9BQWU7b0JBQUksa0JBQU0sT0FBTyxDQUFDLENBQUM7Z0JBQUMsQ0FBQztnQkFFaEQsc0JBQUksZ0RBQWM7eUJBQWxCLGNBQStCLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBQzNDLHNCQUFJLDhDQUFZO3lCQUFoQixjQUEwQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUN4QyxzQkFBSSxtREFBaUI7eUJBQXJCLGNBQStCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBQzdDLHNCQUFJLCtDQUFhO3lCQUFqQixjQUEyQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUN6QyxzQkFBSSx5Q0FBTzt5QkFBWCxjQUFxQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUNuQyxzQkFBSSx5Q0FBTzt5QkFBWCxjQUF3QixNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUN0QywyQkFBQztZQUFELENBVEEsQUFTQyxDQVR5QyxLQUFLLEdBUzlDO1lBVEQsdURBU0MsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9mYWNhZGUvYmFzZV93cmFwcGVkX2V4Y2VwdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQSBiYXNlIGNsYXNzIGZvciB0aGUgV3JhcHBlZEV4Y2VwdGlvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGlkZW50aWZ5XG4gKiBhIFdyYXBwZWRFeGNlcHRpb24gZnJvbSBFeGNlcHRpb25IYW5kbGVyIHdpdGhvdXQgYWRkaW5nIGNpcmN1bGFyXG4gKiBkZXBlbmRlbmN5LlxuICovXG5leHBvcnQgY2xhc3MgQmFzZVdyYXBwZWRFeGNlcHRpb24gZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZykgeyBzdXBlcihtZXNzYWdlKTsgfVxuXG4gIGdldCB3cmFwcGVyTWVzc2FnZSgpOiBzdHJpbmcgeyByZXR1cm4gJyc7IH1cbiAgZ2V0IHdyYXBwZXJTdGFjaygpOiBhbnkgeyByZXR1cm4gbnVsbDsgfVxuICBnZXQgb3JpZ2luYWxFeGNlcHRpb24oKTogYW55IHsgcmV0dXJuIG51bGw7IH1cbiAgZ2V0IG9yaWdpbmFsU3RhY2soKTogYW55IHsgcmV0dXJuIG51bGw7IH1cbiAgZ2V0IGNvbnRleHQoKTogYW55IHsgcmV0dXJuIG51bGw7IH1cbiAgZ2V0IG1lc3NhZ2UoKTogc3RyaW5nIHsgcmV0dXJuICcnOyB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
