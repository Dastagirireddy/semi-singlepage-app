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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2xpbmtlci92aWV3X3R5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQUFBLFdBQVksUUFBUTtnQkFDbEIsd0VBQXdFO2dCQUN4RSw0QkFBNEI7Z0JBQzVCLHVDQUFJLENBQUE7Z0JBQ0osNEJBQTRCO2dCQUM1QixvQ0FBb0M7Z0JBQ3BDLGlEQUFTLENBQUE7Z0JBQ1QscUVBQXFFO2dCQUNyRSw2QkFBNkI7Z0JBQzdCLCtDQUFRLENBQUE7WUFDVixDQUFDLEVBVlcsUUFBUSxLQUFSLFFBQVEsUUFVbkI7NENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvbGlua2VyL3ZpZXdfdHlwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBlbnVtIFZpZXdUeXBlIHtcbiAgLy8gQSB2aWV3IHRoYXQgY29udGFpbnMgdGhlIGhvc3QgZWxlbWVudCB3aXRoIGJvdW5kIGNvbXBvbmVudCBkaXJlY3RpdmUuXG4gIC8vIENvbnRhaW5zIGEgQ09NUE9ORU5UIHZpZXdcbiAgSE9TVCxcbiAgLy8gVGhlIHZpZXcgb2YgdGhlIGNvbXBvbmVudFxuICAvLyBDYW4gY29udGFpbiAwIHRvIG4gRU1CRURERUQgdmlld3NcbiAgQ09NUE9ORU5ULFxuICAvLyBBIHZpZXcgdGhhdCBpcyBlbWJlZGRlZCBpbnRvIGFub3RoZXIgVmlldyB2aWEgYSA8dGVtcGxhdGU+IGVsZW1lbnRcbiAgLy8gaW5zaWRlIG9mIGEgQ09NUE9ORU5UIHZpZXdcbiAgRU1CRURERURcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
