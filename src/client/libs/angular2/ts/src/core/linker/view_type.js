System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ViewType;
    return {
        setters:[],
        execute: function() {
            (function (ViewType) {
                // A view that contains the host element with bound component directive.
                // Contains a COMPONENT view
                ViewType[ViewType["HOST"] = 0] = "HOST";
                // The view of the component
                // Can contain 0 to n EMBEDDED views
                ViewType[ViewType["COMPONENT"] = 1] = "COMPONENT";
                // A view that is embedded into another View via a <template> element
                // inside of a COMPONENT view
                ViewType[ViewType["EMBEDDED"] = 2] = "EMBEDDED";
            })(ViewType || (ViewType = {}));
            exports_1("ViewType", ViewType);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvbGlua2VyL3ZpZXdfdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O1lBQUEsV0FBWSxRQUFRO2dCQUNsQix3RUFBd0U7Z0JBQ3hFLDRCQUE0QjtnQkFDNUIsdUNBQUksQ0FBQTtnQkFDSiw0QkFBNEI7Z0JBQzVCLG9DQUFvQztnQkFDcEMsaURBQVMsQ0FBQTtnQkFDVCxxRUFBcUU7Z0JBQ3JFLDZCQUE2QjtnQkFDN0IsK0NBQVEsQ0FBQTtZQUNWLENBQUMsRUFWVyxRQUFRLEtBQVIsUUFBUSxRQVVuQjs0Q0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2xpbmtlci92aWV3X3R5cGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZW51bSBWaWV3VHlwZSB7XG4gIC8vIEEgdmlldyB0aGF0IGNvbnRhaW5zIHRoZSBob3N0IGVsZW1lbnQgd2l0aCBib3VuZCBjb21wb25lbnQgZGlyZWN0aXZlLlxuICAvLyBDb250YWlucyBhIENPTVBPTkVOVCB2aWV3XG4gIEhPU1QsXG4gIC8vIFRoZSB2aWV3IG9mIHRoZSBjb21wb25lbnRcbiAgLy8gQ2FuIGNvbnRhaW4gMCB0byBuIEVNQkVEREVEIHZpZXdzXG4gIENPTVBPTkVOVCxcbiAgLy8gQSB2aWV3IHRoYXQgaXMgZW1iZWRkZWQgaW50byBhbm90aGVyIFZpZXcgdmlhIGEgPHRlbXBsYXRlPiBlbGVtZW50XG4gIC8vIGluc2lkZSBvZiBhIENPTVBPTkVOVCB2aWV3XG4gIEVNQkVEREVEXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
