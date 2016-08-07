System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lang_1, exceptions_1;
    var InvalidPipeArgumentException;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
            InvalidPipeArgumentException = (function (_super) {
                __extends(InvalidPipeArgumentException, _super);
                function InvalidPipeArgumentException(type, value) {
                    _super.call(this, "Invalid argument '" + value + "' for pipe '" + lang_1.stringify(type) + "'");
                }
                return InvalidPipeArgumentException;
            }(exceptions_1.BaseException));
            exports_1("InvalidPipeArgumentException", InvalidPipeArgumentException);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vcGlwZXMvaW52YWxpZF9waXBlX2FyZ3VtZW50X2V4Y2VwdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBR0E7Z0JBQWtELGdEQUFhO2dCQUM3RCxzQ0FBWSxJQUFVLEVBQUUsS0FBYTtvQkFDbkMsa0JBQU0sdUJBQXFCLEtBQUssb0JBQWUsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsTUFBRyxDQUFDLENBQUM7Z0JBQ3JFLENBQUM7Z0JBQ0gsbUNBQUM7WUFBRCxDQUpBLEFBSUMsQ0FKaUQsMEJBQWEsR0FJOUQ7WUFKRCx1RUFJQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vcGlwZXMvaW52YWxpZF9waXBlX2FyZ3VtZW50X2V4Y2VwdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q09OU1QsIFR5cGUsIHN0cmluZ2lmeX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbiwgV3JhcHBlZEV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcblxuZXhwb3J0IGNsYXNzIEludmFsaWRQaXBlQXJndW1lbnRFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IodHlwZTogVHlwZSwgdmFsdWU6IE9iamVjdCkge1xuICAgIHN1cGVyKGBJbnZhbGlkIGFyZ3VtZW50ICcke3ZhbHVlfScgZm9yIHBpcGUgJyR7c3RyaW5naWZ5KHR5cGUpfSdgKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
