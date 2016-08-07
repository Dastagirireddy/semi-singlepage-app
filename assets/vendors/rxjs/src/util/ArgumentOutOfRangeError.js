System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var ArgumentOutOfRangeError;
    return {
        setters:[],
        execute: function() {
            /**
             * An error thrown when an element was queried at a certain index of an
             * Observable, but no such index or position exists in that sequence.
             *
             * @see {@link elementAt}
             * @see {@link take}
             * @see {@link takeLast}
             *
             * @class ArgumentOutOfRangeError
             */
            ArgumentOutOfRangeError = (function (_super) {
                __extends(ArgumentOutOfRangeError, _super);
                function ArgumentOutOfRangeError() {
                    var err = _super.call(this, 'argument out of range');
                    this.name = err.name = 'ArgumentOutOfRangeError';
                    this.stack = err.stack;
                    this.message = err.message;
                }
                return ArgumentOutOfRangeError;
            }(Error));
            exports_1("ArgumentOutOfRangeError", ArgumentOutOfRangeError);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL3V0aWwvQXJndW1lbnRPdXRPZlJhbmdlRXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O1lBQUE7Ozs7Ozs7OztlQVNHO1lBQ0g7Z0JBQTZDLDJDQUFLO2dCQUNoRDtvQkFDRSxJQUFNLEdBQUcsR0FBUSxrQkFBTSx1QkFBdUIsQ0FBQyxDQUFDO29CQUN6QyxJQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcseUJBQXlCLENBQUM7b0JBQ2xELElBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztvQkFDeEIsSUFBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO2dCQUNyQyxDQUFDO2dCQUNILDhCQUFDO1lBQUQsQ0FQQSxBQU9DLENBUDRDLEtBQUssR0FPakQ7WUFQRCw2REFPQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL3V0aWwvQXJndW1lbnRPdXRPZlJhbmdlRXJyb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEFuIGVycm9yIHRocm93biB3aGVuIGFuIGVsZW1lbnQgd2FzIHF1ZXJpZWQgYXQgYSBjZXJ0YWluIGluZGV4IG9mIGFuXG4gKiBPYnNlcnZhYmxlLCBidXQgbm8gc3VjaCBpbmRleCBvciBwb3NpdGlvbiBleGlzdHMgaW4gdGhhdCBzZXF1ZW5jZS5cbiAqXG4gKiBAc2VlIHtAbGluayBlbGVtZW50QXR9XG4gKiBAc2VlIHtAbGluayB0YWtlfVxuICogQHNlZSB7QGxpbmsgdGFrZUxhc3R9XG4gKlxuICogQGNsYXNzIEFyZ3VtZW50T3V0T2ZSYW5nZUVycm9yXG4gKi9cbmV4cG9ydCBjbGFzcyBBcmd1bWVudE91dE9mUmFuZ2VFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3QgZXJyOiBhbnkgPSBzdXBlcignYXJndW1lbnQgb3V0IG9mIHJhbmdlJyk7XG4gICAgKDxhbnk+IHRoaXMpLm5hbWUgPSBlcnIubmFtZSA9ICdBcmd1bWVudE91dE9mUmFuZ2VFcnJvcic7XG4gICAgKDxhbnk+IHRoaXMpLnN0YWNrID0gZXJyLnN0YWNrO1xuICAgICg8YW55PiB0aGlzKS5tZXNzYWdlID0gZXJyLm1lc3NhZ2U7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
