System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var RequestMethod, ReadyState, ResponseType;
    return {
        setters:[],
        execute: function() {
            /**
             * Supported http methods.
             */
            (function (RequestMethod) {
                RequestMethod[RequestMethod["Get"] = 0] = "Get";
                RequestMethod[RequestMethod["Post"] = 1] = "Post";
                RequestMethod[RequestMethod["Put"] = 2] = "Put";
                RequestMethod[RequestMethod["Delete"] = 3] = "Delete";
                RequestMethod[RequestMethod["Options"] = 4] = "Options";
                RequestMethod[RequestMethod["Head"] = 5] = "Head";
                RequestMethod[RequestMethod["Patch"] = 6] = "Patch";
            })(RequestMethod || (RequestMethod = {}));
            exports_1("RequestMethod", RequestMethod);
            /**
             * All possible states in which a connection can be, based on
             * [States](http://www.w3.org/TR/XMLHttpRequest/#states) from the `XMLHttpRequest` spec, but with an
             * additional "CANCELLED" state.
             */
            (function (ReadyState) {
                ReadyState[ReadyState["Unsent"] = 0] = "Unsent";
                ReadyState[ReadyState["Open"] = 1] = "Open";
                ReadyState[ReadyState["HeadersReceived"] = 2] = "HeadersReceived";
                ReadyState[ReadyState["Loading"] = 3] = "Loading";
                ReadyState[ReadyState["Done"] = 4] = "Done";
                ReadyState[ReadyState["Cancelled"] = 5] = "Cancelled";
            })(ReadyState || (ReadyState = {}));
            exports_1("ReadyState", ReadyState);
            /**
             * Acceptable response types to be associated with a {@link Response}, based on
             * [ResponseType](https://fetch.spec.whatwg.org/#responsetype) from the Fetch spec.
             */
            (function (ResponseType) {
                ResponseType[ResponseType["Basic"] = 0] = "Basic";
                ResponseType[ResponseType["Cors"] = 1] = "Cors";
                ResponseType[ResponseType["Default"] = 2] = "Default";
                ResponseType[ResponseType["Error"] = 3] = "Error";
                ResponseType[ResponseType["Opaque"] = 4] = "Opaque";
            })(ResponseType || (ResponseType = {}));
            exports_1("ResponseType", ResponseType);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9odHRwL2VudW1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7WUFFQTs7ZUFFRztZQUNILFdBQVksYUFBYTtnQkFDdkIsK0NBQUcsQ0FBQTtnQkFDSCxpREFBSSxDQUFBO2dCQUNKLCtDQUFHLENBQUE7Z0JBQ0gscURBQU0sQ0FBQTtnQkFDTix1REFBTyxDQUFBO2dCQUNQLGlEQUFJLENBQUE7Z0JBQ0osbURBQUssQ0FBQTtZQUNQLENBQUMsRUFSVyxhQUFhLEtBQWIsYUFBYSxRQVF4QjtzREFBQTtZQUVEOzs7O2VBSUc7WUFDSCxXQUFZLFVBQVU7Z0JBQ3BCLCtDQUFNLENBQUE7Z0JBQ04sMkNBQUksQ0FBQTtnQkFDSixpRUFBZSxDQUFBO2dCQUNmLGlEQUFPLENBQUE7Z0JBQ1AsMkNBQUksQ0FBQTtnQkFDSixxREFBUyxDQUFBO1lBQ1gsQ0FBQyxFQVBXLFVBQVUsS0FBVixVQUFVLFFBT3JCO2dEQUFBO1lBRUQ7OztlQUdHO1lBQ0gsV0FBWSxZQUFZO2dCQUN0QixpREFBSyxDQUFBO2dCQUNMLCtDQUFJLENBQUE7Z0JBQ0oscURBQU8sQ0FBQTtnQkFDUCxpREFBSyxDQUFBO2dCQUNMLG1EQUFNLENBQUE7WUFDUixDQUFDLEVBTlcsWUFBWSxLQUFaLFlBQVksUUFNdkI7b0RBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2h0dHAvZW51bXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5cbi8qKlxuICogU3VwcG9ydGVkIGh0dHAgbWV0aG9kcy5cbiAqL1xuZXhwb3J0IGVudW0gUmVxdWVzdE1ldGhvZCB7XG4gIEdldCxcbiAgUG9zdCxcbiAgUHV0LFxuICBEZWxldGUsXG4gIE9wdGlvbnMsXG4gIEhlYWQsXG4gIFBhdGNoXG59XG5cbi8qKlxuICogQWxsIHBvc3NpYmxlIHN0YXRlcyBpbiB3aGljaCBhIGNvbm5lY3Rpb24gY2FuIGJlLCBiYXNlZCBvblxuICogW1N0YXRlc10oaHR0cDovL3d3dy53My5vcmcvVFIvWE1MSHR0cFJlcXVlc3QvI3N0YXRlcykgZnJvbSB0aGUgYFhNTEh0dHBSZXF1ZXN0YCBzcGVjLCBidXQgd2l0aCBhblxuICogYWRkaXRpb25hbCBcIkNBTkNFTExFRFwiIHN0YXRlLlxuICovXG5leHBvcnQgZW51bSBSZWFkeVN0YXRlIHtcbiAgVW5zZW50LFxuICBPcGVuLFxuICBIZWFkZXJzUmVjZWl2ZWQsXG4gIExvYWRpbmcsXG4gIERvbmUsXG4gIENhbmNlbGxlZFxufVxuXG4vKipcbiAqIEFjY2VwdGFibGUgcmVzcG9uc2UgdHlwZXMgdG8gYmUgYXNzb2NpYXRlZCB3aXRoIGEge0BsaW5rIFJlc3BvbnNlfSwgYmFzZWQgb25cbiAqIFtSZXNwb25zZVR5cGVdKGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNyZXNwb25zZXR5cGUpIGZyb20gdGhlIEZldGNoIHNwZWMuXG4gKi9cbmV4cG9ydCBlbnVtIFJlc3BvbnNlVHlwZSB7XG4gIEJhc2ljLFxuICBDb3JzLFxuICBEZWZhdWx0LFxuICBFcnJvcixcbiAgT3BhcXVlXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
