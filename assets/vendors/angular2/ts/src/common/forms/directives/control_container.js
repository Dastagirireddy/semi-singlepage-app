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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZm9ybXMvZGlyZWN0aXZlcy9jb250cm9sX2NvbnRhaW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O1lBR0E7Ozs7ZUFJRztZQUNIO2dCQUFzQyxvQ0FBd0I7Z0JBQTlEO29CQUFzQyw4QkFBd0I7Z0JBWTlELENBQUM7Z0JBTkMsc0JBQUksMkNBQWE7b0JBSGpCOzt1QkFFRzt5QkFDSCxjQUE0QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUsxQyxzQkFBSSxrQ0FBSTtvQkFIUjs7dUJBRUc7eUJBQ0gsY0FBdUIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFDdkMsdUJBQUM7WUFBRCxDQVpBLEFBWUMsQ0FacUMscURBQXdCLEdBWTdEO1lBWkQsK0NBWUMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tbW9uL2Zvcm1zL2RpcmVjdGl2ZXMvY29udHJvbF9jb250YWluZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Zvcm19IGZyb20gJy4vZm9ybV9pbnRlcmZhY2UnO1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2xEaXJlY3RpdmV9IGZyb20gJy4vYWJzdHJhY3RfY29udHJvbF9kaXJlY3RpdmUnO1xuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRoYXQgY29udGFpbnMgbXVsdGlwbGUge0BsaW5rIE5nQ29udHJvbH1zLlxuICpcbiAqIE9ubHkgdXNlZCBieSB0aGUgZm9ybXMgbW9kdWxlLlxuICovXG5leHBvcnQgY2xhc3MgQ29udHJvbENvbnRhaW5lciBleHRlbmRzIEFic3RyYWN0Q29udHJvbERpcmVjdGl2ZSB7XG4gIG5hbWU6IHN0cmluZztcblxuICAvKipcbiAgICogR2V0IHRoZSBmb3JtIHRvIHdoaWNoIHRoaXMgY29udGFpbmVyIGJlbG9uZ3MuXG4gICAqL1xuICBnZXQgZm9ybURpcmVjdGl2ZSgpOiBGb3JtIHsgcmV0dXJuIG51bGw7IH1cblxuICAvKipcbiAgICogR2V0IHRoZSBwYXRoIHRvIHRoaXMgY29udGFpbmVyLlxuICAgKi9cbiAgZ2V0IHBhdGgoKTogc3RyaW5nW10geyByZXR1cm4gbnVsbDsgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
