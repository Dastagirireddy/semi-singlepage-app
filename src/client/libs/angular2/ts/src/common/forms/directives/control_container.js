System.register(['./abstract_control_directive'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var abstract_control_directive_1;
    var ControlContainer;
    return {
        setters:[
            function (abstract_control_directive_1_1) {
                abstract_control_directive_1 = abstract_control_directive_1_1;
            }],
        execute: function() {
            /**
             * A directive that contains multiple {@link NgControl}s.
             *
             * Only used by the forms module.
             */
            ControlContainer = (function (_super) {
                __extends(ControlContainer, _super);
                function ControlContainer() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(ControlContainer.prototype, "formDirective", {
                    /**
                     * Get the form to which this container belongs.
                     */
                    get: function () { return null; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ControlContainer.prototype, "path", {
                    /**
                     * Get the path to this container.
                     */
                    get: function () { return null; },
                    enumerable: true,
                    configurable: true
                });
                return ControlContainer;
            }(abstract_control_directive_1.AbstractControlDirective));
            exports_1("ControlContainer", ControlContainer);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL2NvbnRyb2xfY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7WUFHQTs7OztlQUlHO1lBQ0g7Z0JBQXNDLG9DQUF3QjtnQkFBOUQ7b0JBQXNDLDhCQUF3QjtnQkFZOUQsQ0FBQztnQkFOQyxzQkFBSSwyQ0FBYTtvQkFIakI7O3VCQUVHO3lCQUNILGNBQTRCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBSzFDLHNCQUFJLGtDQUFJO29CQUhSOzt1QkFFRzt5QkFDSCxjQUF1QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUN2Qyx1QkFBQztZQUFELENBWkEsQUFZQyxDQVpxQyxxREFBd0IsR0FZN0Q7WUFaRCwrQ0FZQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL2NvbnRyb2xfY29udGFpbmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtGb3JtfSBmcm9tICcuL2Zvcm1faW50ZXJmYWNlJztcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sRGlyZWN0aXZlfSBmcm9tICcuL2Fic3RyYWN0X2NvbnRyb2xfZGlyZWN0aXZlJztcblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IGNvbnRhaW5zIG11bHRpcGxlIHtAbGluayBOZ0NvbnRyb2x9cy5cbiAqXG4gKiBPbmx5IHVzZWQgYnkgdGhlIGZvcm1zIG1vZHVsZS5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbnRyb2xDb250YWluZXIgZXh0ZW5kcyBBYnN0cmFjdENvbnRyb2xEaXJlY3RpdmUge1xuICBuYW1lOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZm9ybSB0byB3aGljaCB0aGlzIGNvbnRhaW5lciBiZWxvbmdzLlxuICAgKi9cbiAgZ2V0IGZvcm1EaXJlY3RpdmUoKTogRm9ybSB7IHJldHVybiBudWxsOyB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcGF0aCB0byB0aGlzIGNvbnRhaW5lci5cbiAgICovXG4gIGdldCBwYXRoKCk6IHN0cmluZ1tdIHsgcmV0dXJuIG51bGw7IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
