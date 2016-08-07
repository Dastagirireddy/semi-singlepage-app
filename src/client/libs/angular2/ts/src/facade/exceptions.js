System.register(['./base_wrapped_exception', './exception_handler'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var base_wrapped_exception_1, exception_handler_1;
    var BaseException, WrappedException;
    function makeTypeError(message) {
        return new TypeError(message);
    }
    exports_1("makeTypeError", makeTypeError);
    function unimplemented() {
        throw new BaseException('unimplemented');
    }
    exports_1("unimplemented", unimplemented);
    return {
        setters:[
            function (base_wrapped_exception_1_1) {
                base_wrapped_exception_1 = base_wrapped_exception_1_1;
            },
            function (exception_handler_1_1) {
                exception_handler_1 = exception_handler_1_1;
                exports_1({
                    "ExceptionHandler": exception_handler_1_1["ExceptionHandler"]
                });
            }],
        execute: function() {
            BaseException = (function (_super) {
                __extends(BaseException, _super);
                function BaseException(message) {
                    if (message === void 0) { message = "--"; }
                    _super.call(this, message);
                    this.message = message;
                    this.stack = (new Error(message)).stack;
                }
                BaseException.prototype.toString = function () { return this.message; };
                return BaseException;
            }(Error));
            exports_1("BaseException", BaseException);
            /**
             * Wraps an exception and provides additional context or information.
             */
            WrappedException = (function (_super) {
                __extends(WrappedException, _super);
                function WrappedException(_wrapperMessage, _originalException, _originalStack, _context) {
                    _super.call(this, _wrapperMessage);
                    this._wrapperMessage = _wrapperMessage;
                    this._originalException = _originalException;
                    this._originalStack = _originalStack;
                    this._context = _context;
                    this._wrapperStack = (new Error(_wrapperMessage)).stack;
                }
                Object.defineProperty(WrappedException.prototype, "wrapperMessage", {
                    get: function () { return this._wrapperMessage; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WrappedException.prototype, "wrapperStack", {
                    get: function () { return this._wrapperStack; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WrappedException.prototype, "originalException", {
                    get: function () { return this._originalException; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WrappedException.prototype, "originalStack", {
                    get: function () { return this._originalStack; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WrappedException.prototype, "context", {
                    get: function () { return this._context; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WrappedException.prototype, "message", {
                    get: function () { return exception_handler_1.ExceptionHandler.exceptionToString(this); },
                    enumerable: true,
                    configurable: true
                });
                WrappedException.prototype.toString = function () { return this.message; };
                return WrappedException;
            }(base_wrapped_exception_1.BaseWrappedException));
            exports_1("WrappedException", WrappedException);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2ZhY2FkZS9leGNlcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUE0Q0EsdUJBQThCLE9BQWdCO1FBQzVDLE1BQU0sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRkQseUNBRUMsQ0FBQTtJQUVEO1FBQ0UsTUFBTSxJQUFJLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRkQseUNBRUMsQ0FBQTs7Ozs7Ozs7Ozs7OztZQTdDRDtnQkFBbUMsaUNBQUs7Z0JBRXRDLHVCQUFtQixPQUFzQjtvQkFBN0IsdUJBQTZCLEdBQTdCLGNBQTZCO29CQUN2QyxrQkFBTSxPQUFPLENBQUMsQ0FBQztvQkFERSxZQUFPLEdBQVAsT0FBTyxDQUFlO29CQUV2QyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQy9DLENBQUM7Z0JBRUQsZ0NBQVEsR0FBUixjQUFxQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLG9CQUFDO1lBQUQsQ0FSQSxBQVFDLENBUmtDLEtBQUssR0FRdkM7WUFSRCx5Q0FRQyxDQUFBO1lBRUQ7O2VBRUc7WUFDSDtnQkFBc0Msb0NBQW9CO2dCQUd4RCwwQkFBb0IsZUFBdUIsRUFBVSxrQkFBa0IsRUFBVSxjQUFlLEVBQzVFLFFBQVM7b0JBQzNCLGtCQUFNLGVBQWUsQ0FBQyxDQUFDO29CQUZMLG9CQUFlLEdBQWYsZUFBZSxDQUFRO29CQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBQTtvQkFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBQztvQkFDNUUsYUFBUSxHQUFSLFFBQVEsQ0FBQztvQkFFM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUMvRCxDQUFDO2dCQUVELHNCQUFJLDRDQUFjO3lCQUFsQixjQUErQixNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFFN0Qsc0JBQUksMENBQVk7eUJBQWhCLGNBQTBCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUd0RCxzQkFBSSwrQ0FBaUI7eUJBQXJCLGNBQStCLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBRWhFLHNCQUFJLDJDQUFhO3lCQUFqQixjQUEyQixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFHeEQsc0JBQUkscUNBQU87eUJBQVgsY0FBcUIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBRTVDLHNCQUFJLHFDQUFPO3lCQUFYLGNBQXdCLE1BQU0sQ0FBQyxvQ0FBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFFMUUsbUNBQVEsR0FBUixjQUFxQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLHVCQUFDO1lBQUQsQ0F4QkEsQUF3QkMsQ0F4QnFDLDZDQUFvQixHQXdCekQ7WUF4QkQsK0NBd0JDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Jhc2VXcmFwcGVkRXhjZXB0aW9ufSBmcm9tICcuL2Jhc2Vfd3JhcHBlZF9leGNlcHRpb24nO1xuaW1wb3J0IHtFeGNlcHRpb25IYW5kbGVyfSBmcm9tICcuL2V4Y2VwdGlvbl9oYW5kbGVyJztcblxuZXhwb3J0IHtFeGNlcHRpb25IYW5kbGVyfSBmcm9tICcuL2V4Y2VwdGlvbl9oYW5kbGVyJztcblxuZXhwb3J0IGNsYXNzIEJhc2VFeGNlcHRpb24gZXh0ZW5kcyBFcnJvciB7XG4gIHB1YmxpYyBzdGFjazogYW55O1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbWVzc2FnZTogc3RyaW5nID0gXCItLVwiKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gICAgdGhpcy5zdGFjayA9ICg8YW55Pm5ldyBFcnJvcihtZXNzYWdlKSkuc3RhY2s7XG4gIH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5tZXNzYWdlOyB9XG59XG5cbi8qKlxuICogV3JhcHMgYW4gZXhjZXB0aW9uIGFuZCBwcm92aWRlcyBhZGRpdGlvbmFsIGNvbnRleHQgb3IgaW5mb3JtYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBXcmFwcGVkRXhjZXB0aW9uIGV4dGVuZHMgQmFzZVdyYXBwZWRFeGNlcHRpb24ge1xuICBwcml2YXRlIF93cmFwcGVyU3RhY2s6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF93cmFwcGVyTWVzc2FnZTogc3RyaW5nLCBwcml2YXRlIF9vcmlnaW5hbEV4Y2VwdGlvbiwgcHJpdmF0ZSBfb3JpZ2luYWxTdGFjaz8sXG4gICAgICAgICAgICAgIHByaXZhdGUgX2NvbnRleHQ/KSB7XG4gICAgc3VwZXIoX3dyYXBwZXJNZXNzYWdlKTtcbiAgICB0aGlzLl93cmFwcGVyU3RhY2sgPSAoPGFueT5uZXcgRXJyb3IoX3dyYXBwZXJNZXNzYWdlKSkuc3RhY2s7XG4gIH1cblxuICBnZXQgd3JhcHBlck1lc3NhZ2UoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3dyYXBwZXJNZXNzYWdlOyB9XG5cbiAgZ2V0IHdyYXBwZXJTdGFjaygpOiBhbnkgeyByZXR1cm4gdGhpcy5fd3JhcHBlclN0YWNrOyB9XG5cblxuICBnZXQgb3JpZ2luYWxFeGNlcHRpb24oKTogYW55IHsgcmV0dXJuIHRoaXMuX29yaWdpbmFsRXhjZXB0aW9uOyB9XG5cbiAgZ2V0IG9yaWdpbmFsU3RhY2soKTogYW55IHsgcmV0dXJuIHRoaXMuX29yaWdpbmFsU3RhY2s7IH1cblxuXG4gIGdldCBjb250ZXh0KCk6IGFueSB7IHJldHVybiB0aGlzLl9jb250ZXh0OyB9XG5cbiAgZ2V0IG1lc3NhZ2UoKTogc3RyaW5nIHsgcmV0dXJuIEV4Y2VwdGlvbkhhbmRsZXIuZXhjZXB0aW9uVG9TdHJpbmcodGhpcyk7IH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5tZXNzYWdlOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlVHlwZUVycm9yKG1lc3NhZ2U/OiBzdHJpbmcpOiBFcnJvciB7XG4gIHJldHVybiBuZXcgVHlwZUVycm9yKG1lc3NhZ2UpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5pbXBsZW1lbnRlZCgpOiBhbnkge1xuICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbigndW5pbXBsZW1lbnRlZCcpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
