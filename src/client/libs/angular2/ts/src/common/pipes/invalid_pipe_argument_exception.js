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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9waXBlcy9pbnZhbGlkX3BpcGVfYXJndW1lbnRfZXhjZXB0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFHQTtnQkFBa0QsZ0RBQWE7Z0JBQzdELHNDQUFZLElBQVUsRUFBRSxLQUFhO29CQUNuQyxrQkFBTSx1QkFBcUIsS0FBSyxvQkFBZSxnQkFBUyxDQUFDLElBQUksQ0FBQyxNQUFHLENBQUMsQ0FBQztnQkFDckUsQ0FBQztnQkFDSCxtQ0FBQztZQUFELENBSkEsQUFJQyxDQUppRCwwQkFBYSxHQUk5RDtZQUpELHVFQUlDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29tbW9uL3BpcGVzL2ludmFsaWRfcGlwZV9hcmd1bWVudF9leGNlcHRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NPTlNULCBUeXBlLCBzdHJpbmdpZnl9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb24sIFdyYXBwZWRFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5cbmV4cG9ydCBjbGFzcyBJbnZhbGlkUGlwZUFyZ3VtZW50RXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHR5cGU6IFR5cGUsIHZhbHVlOiBPYmplY3QpIHtcbiAgICBzdXBlcihgSW52YWxpZCBhcmd1bWVudCAnJHt2YWx1ZX0nIGZvciBwaXBlICcke3N0cmluZ2lmeSh0eXBlKX0nYCk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
