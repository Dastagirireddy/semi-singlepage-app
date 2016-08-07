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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9mYWNhZGUvYmFzZV93cmFwcGVkX2V4Y2VwdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7WUFBQTs7OztlQUlHO1lBQ0g7Z0JBQTBDLHdDQUFLO2dCQUM3Qyw4QkFBWSxPQUFlO29CQUFJLGtCQUFNLE9BQU8sQ0FBQyxDQUFDO2dCQUFDLENBQUM7Z0JBRWhELHNCQUFJLGdEQUFjO3lCQUFsQixjQUErQixNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUMzQyxzQkFBSSw4Q0FBWTt5QkFBaEIsY0FBMEIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFDeEMsc0JBQUksbURBQWlCO3lCQUFyQixjQUErQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUM3QyxzQkFBSSwrQ0FBYTt5QkFBakIsY0FBMkIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFDekMsc0JBQUkseUNBQU87eUJBQVgsY0FBcUIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFDbkMsc0JBQUkseUNBQU87eUJBQVgsY0FBd0IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFDdEMsMkJBQUM7WUFBRCxDQVRBLEFBU0MsQ0FUeUMsS0FBSyxHQVM5QztZQVRELHVEQVNDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2ZhY2FkZS9iYXNlX3dyYXBwZWRfZXhjZXB0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBBIGJhc2UgY2xhc3MgZm9yIHRoZSBXcmFwcGVkRXhjZXB0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gaWRlbnRpZnlcbiAqIGEgV3JhcHBlZEV4Y2VwdGlvbiBmcm9tIEV4Y2VwdGlvbkhhbmRsZXIgd2l0aG91dCBhZGRpbmcgY2lyY3VsYXJcbiAqIGRlcGVuZGVuY3kuXG4gKi9cbmV4cG9ydCBjbGFzcyBCYXNlV3JhcHBlZEV4Y2VwdGlvbiBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nKSB7IHN1cGVyKG1lc3NhZ2UpOyB9XG5cbiAgZ2V0IHdyYXBwZXJNZXNzYWdlKCk6IHN0cmluZyB7IHJldHVybiAnJzsgfVxuICBnZXQgd3JhcHBlclN0YWNrKCk6IGFueSB7IHJldHVybiBudWxsOyB9XG4gIGdldCBvcmlnaW5hbEV4Y2VwdGlvbigpOiBhbnkgeyByZXR1cm4gbnVsbDsgfVxuICBnZXQgb3JpZ2luYWxTdGFjaygpOiBhbnkgeyByZXR1cm4gbnVsbDsgfVxuICBnZXQgY29udGV4dCgpOiBhbnkgeyByZXR1cm4gbnVsbDsgfVxuICBnZXQgbWVzc2FnZSgpOiBzdHJpbmcgeyByZXR1cm4gJyc7IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
