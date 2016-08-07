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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9mYWNhZGUvZXhjZXB0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBNENBLHVCQUE4QixPQUFnQjtRQUM1QyxNQUFNLENBQUMsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUZELHlDQUVDLENBQUE7SUFFRDtRQUNFLE1BQU0sSUFBSSxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUZELHlDQUVDLENBQUE7Ozs7Ozs7Ozs7Ozs7WUE3Q0Q7Z0JBQW1DLGlDQUFLO2dCQUV0Qyx1QkFBbUIsT0FBc0I7b0JBQTdCLHVCQUE2QixHQUE3QixjQUE2QjtvQkFDdkMsa0JBQU0sT0FBTyxDQUFDLENBQUM7b0JBREUsWUFBTyxHQUFQLE9BQU8sQ0FBZTtvQkFFdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUMvQyxDQUFDO2dCQUVELGdDQUFRLEdBQVIsY0FBcUIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxvQkFBQztZQUFELENBUkEsQUFRQyxDQVJrQyxLQUFLLEdBUXZDO1lBUkQseUNBUUMsQ0FBQTtZQUVEOztlQUVHO1lBQ0g7Z0JBQXNDLG9DQUFvQjtnQkFHeEQsMEJBQW9CLGVBQXVCLEVBQVUsa0JBQWtCLEVBQVUsY0FBZSxFQUM1RSxRQUFTO29CQUMzQixrQkFBTSxlQUFlLENBQUMsQ0FBQztvQkFGTCxvQkFBZSxHQUFmLGVBQWUsQ0FBUTtvQkFBVSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQUE7b0JBQVUsbUJBQWMsR0FBZCxjQUFjLENBQUM7b0JBQzVFLGFBQVEsR0FBUixRQUFRLENBQUM7b0JBRTNCLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDL0QsQ0FBQztnQkFFRCxzQkFBSSw0Q0FBYzt5QkFBbEIsY0FBK0IsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBRTdELHNCQUFJLDBDQUFZO3lCQUFoQixjQUEwQixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFHdEQsc0JBQUksK0NBQWlCO3lCQUFyQixjQUErQixNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUVoRSxzQkFBSSwyQ0FBYTt5QkFBakIsY0FBMkIsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBR3hELHNCQUFJLHFDQUFPO3lCQUFYLGNBQXFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUU1QyxzQkFBSSxxQ0FBTzt5QkFBWCxjQUF3QixNQUFNLENBQUMsb0NBQWdCLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBRTFFLG1DQUFRLEdBQVIsY0FBcUIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUM3Qyx1QkFBQztZQUFELENBeEJBLEFBd0JDLENBeEJxQyw2Q0FBb0IsR0F3QnpEO1lBeEJELCtDQXdCQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9mYWNhZGUvZXhjZXB0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QmFzZVdyYXBwZWRFeGNlcHRpb259IGZyb20gJy4vYmFzZV93cmFwcGVkX2V4Y2VwdGlvbic7XG5pbXBvcnQge0V4Y2VwdGlvbkhhbmRsZXJ9IGZyb20gJy4vZXhjZXB0aW9uX2hhbmRsZXInO1xuXG5leHBvcnQge0V4Y2VwdGlvbkhhbmRsZXJ9IGZyb20gJy4vZXhjZXB0aW9uX2hhbmRsZXInO1xuXG5leHBvcnQgY2xhc3MgQmFzZUV4Y2VwdGlvbiBleHRlbmRzIEVycm9yIHtcbiAgcHVibGljIHN0YWNrOiBhbnk7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBtZXNzYWdlOiBzdHJpbmcgPSBcIi0tXCIpIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB0aGlzLnN0YWNrID0gKDxhbnk+bmV3IEVycm9yKG1lc3NhZ2UpKS5zdGFjaztcbiAgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLm1lc3NhZ2U7IH1cbn1cblxuLyoqXG4gKiBXcmFwcyBhbiBleGNlcHRpb24gYW5kIHByb3ZpZGVzIGFkZGl0aW9uYWwgY29udGV4dCBvciBpbmZvcm1hdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIFdyYXBwZWRFeGNlcHRpb24gZXh0ZW5kcyBCYXNlV3JhcHBlZEV4Y2VwdGlvbiB7XG4gIHByaXZhdGUgX3dyYXBwZXJTdGFjazogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3dyYXBwZXJNZXNzYWdlOiBzdHJpbmcsIHByaXZhdGUgX29yaWdpbmFsRXhjZXB0aW9uLCBwcml2YXRlIF9vcmlnaW5hbFN0YWNrPyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfY29udGV4dD8pIHtcbiAgICBzdXBlcihfd3JhcHBlck1lc3NhZ2UpO1xuICAgIHRoaXMuX3dyYXBwZXJTdGFjayA9ICg8YW55Pm5ldyBFcnJvcihfd3JhcHBlck1lc3NhZ2UpKS5zdGFjaztcbiAgfVxuXG4gIGdldCB3cmFwcGVyTWVzc2FnZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fd3JhcHBlck1lc3NhZ2U7IH1cblxuICBnZXQgd3JhcHBlclN0YWNrKCk6IGFueSB7IHJldHVybiB0aGlzLl93cmFwcGVyU3RhY2s7IH1cblxuXG4gIGdldCBvcmlnaW5hbEV4Y2VwdGlvbigpOiBhbnkgeyByZXR1cm4gdGhpcy5fb3JpZ2luYWxFeGNlcHRpb247IH1cblxuICBnZXQgb3JpZ2luYWxTdGFjaygpOiBhbnkgeyByZXR1cm4gdGhpcy5fb3JpZ2luYWxTdGFjazsgfVxuXG5cbiAgZ2V0IGNvbnRleHQoKTogYW55IHsgcmV0dXJuIHRoaXMuX2NvbnRleHQ7IH1cblxuICBnZXQgbWVzc2FnZSgpOiBzdHJpbmcgeyByZXR1cm4gRXhjZXB0aW9uSGFuZGxlci5leGNlcHRpb25Ub1N0cmluZyh0aGlzKTsgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLm1lc3NhZ2U7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VUeXBlRXJyb3IobWVzc2FnZT86IHN0cmluZyk6IEVycm9yIHtcbiAgcmV0dXJuIG5ldyBUeXBlRXJyb3IobWVzc2FnZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmltcGxlbWVudGVkKCk6IGFueSB7XG4gIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKCd1bmltcGxlbWVudGVkJyk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
