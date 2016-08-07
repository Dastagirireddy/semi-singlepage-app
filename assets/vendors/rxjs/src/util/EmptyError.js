System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var EmptyError;
    return {
        setters:[],
        execute: function() {
            /**
             * An error thrown when an Observable or a sequence was queried but has no
             * elements.
             *
             * @see {@link first}
             * @see {@link last}
             * @see {@link single}
             *
             * @class EmptyError
             */
            EmptyError = (function (_super) {
                __extends(EmptyError, _super);
                function EmptyError() {
                    var err = _super.call(this, 'no elements in sequence');
                    this.name = err.name = 'EmptyError';
                    this.stack = err.stack;
                    this.message = err.message;
                }
                return EmptyError;
            }(Error));
            exports_1("EmptyError", EmptyError);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL3V0aWwvRW1wdHlFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7WUFBQTs7Ozs7Ozs7O2VBU0c7WUFDSDtnQkFBZ0MsOEJBQUs7Z0JBQ25DO29CQUNFLElBQU0sR0FBRyxHQUFRLGtCQUFNLHlCQUF5QixDQUFDLENBQUM7b0JBQzNDLElBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7b0JBQ3JDLElBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztvQkFDeEIsSUFBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO2dCQUNyQyxDQUFDO2dCQUNILGlCQUFDO1lBQUQsQ0FQQSxBQU9DLENBUCtCLEtBQUssR0FPcEM7WUFQRCxtQ0FPQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL3V0aWwvRW1wdHlFcnJvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQW4gZXJyb3IgdGhyb3duIHdoZW4gYW4gT2JzZXJ2YWJsZSBvciBhIHNlcXVlbmNlIHdhcyBxdWVyaWVkIGJ1dCBoYXMgbm9cbiAqIGVsZW1lbnRzLlxuICpcbiAqIEBzZWUge0BsaW5rIGZpcnN0fVxuICogQHNlZSB7QGxpbmsgbGFzdH1cbiAqIEBzZWUge0BsaW5rIHNpbmdsZX1cbiAqXG4gKiBAY2xhc3MgRW1wdHlFcnJvclxuICovXG5leHBvcnQgY2xhc3MgRW1wdHlFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3QgZXJyOiBhbnkgPSBzdXBlcignbm8gZWxlbWVudHMgaW4gc2VxdWVuY2UnKTtcbiAgICAoPGFueT4gdGhpcykubmFtZSA9IGVyci5uYW1lID0gJ0VtcHR5RXJyb3InO1xuICAgICg8YW55PiB0aGlzKS5zdGFjayA9IGVyci5zdGFjaztcbiAgICAoPGFueT4gdGhpcykubWVzc2FnZSA9IGVyci5tZXNzYWdlO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
