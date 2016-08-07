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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2h0dHAvZW51bXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQUVBOztlQUVHO1lBQ0gsV0FBWSxhQUFhO2dCQUN2QiwrQ0FBRyxDQUFBO2dCQUNILGlEQUFJLENBQUE7Z0JBQ0osK0NBQUcsQ0FBQTtnQkFDSCxxREFBTSxDQUFBO2dCQUNOLHVEQUFPLENBQUE7Z0JBQ1AsaURBQUksQ0FBQTtnQkFDSixtREFBSyxDQUFBO1lBQ1AsQ0FBQyxFQVJXLGFBQWEsS0FBYixhQUFhLFFBUXhCO3NEQUFBO1lBRUQ7Ozs7ZUFJRztZQUNILFdBQVksVUFBVTtnQkFDcEIsK0NBQU0sQ0FBQTtnQkFDTiwyQ0FBSSxDQUFBO2dCQUNKLGlFQUFlLENBQUE7Z0JBQ2YsaURBQU8sQ0FBQTtnQkFDUCwyQ0FBSSxDQUFBO2dCQUNKLHFEQUFTLENBQUE7WUFDWCxDQUFDLEVBUFcsVUFBVSxLQUFWLFVBQVUsUUFPckI7Z0RBQUE7WUFFRDs7O2VBR0c7WUFDSCxXQUFZLFlBQVk7Z0JBQ3RCLGlEQUFLLENBQUE7Z0JBQ0wsK0NBQUksQ0FBQTtnQkFDSixxREFBTyxDQUFBO2dCQUNQLGlEQUFLLENBQUE7Z0JBQ0wsbURBQU0sQ0FBQTtZQUNSLENBQUMsRUFOVyxZQUFZLEtBQVosWUFBWSxRQU12QjtvREFBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9odHRwL2VudW1zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdHJpbmdNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuXG4vKipcbiAqIFN1cHBvcnRlZCBodHRwIG1ldGhvZHMuXG4gKi9cbmV4cG9ydCBlbnVtIFJlcXVlc3RNZXRob2Qge1xuICBHZXQsXG4gIFBvc3QsXG4gIFB1dCxcbiAgRGVsZXRlLFxuICBPcHRpb25zLFxuICBIZWFkLFxuICBQYXRjaFxufVxuXG4vKipcbiAqIEFsbCBwb3NzaWJsZSBzdGF0ZXMgaW4gd2hpY2ggYSBjb25uZWN0aW9uIGNhbiBiZSwgYmFzZWQgb25cbiAqIFtTdGF0ZXNdKGh0dHA6Ly93d3cudzMub3JnL1RSL1hNTEh0dHBSZXF1ZXN0LyNzdGF0ZXMpIGZyb20gdGhlIGBYTUxIdHRwUmVxdWVzdGAgc3BlYywgYnV0IHdpdGggYW5cbiAqIGFkZGl0aW9uYWwgXCJDQU5DRUxMRURcIiBzdGF0ZS5cbiAqL1xuZXhwb3J0IGVudW0gUmVhZHlTdGF0ZSB7XG4gIFVuc2VudCxcbiAgT3BlbixcbiAgSGVhZGVyc1JlY2VpdmVkLFxuICBMb2FkaW5nLFxuICBEb25lLFxuICBDYW5jZWxsZWRcbn1cblxuLyoqXG4gKiBBY2NlcHRhYmxlIHJlc3BvbnNlIHR5cGVzIHRvIGJlIGFzc29jaWF0ZWQgd2l0aCBhIHtAbGluayBSZXNwb25zZX0sIGJhc2VkIG9uXG4gKiBbUmVzcG9uc2VUeXBlXShodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jcmVzcG9uc2V0eXBlKSBmcm9tIHRoZSBGZXRjaCBzcGVjLlxuICovXG5leHBvcnQgZW51bSBSZXNwb25zZVR5cGUge1xuICBCYXNpYyxcbiAgQ29ycyxcbiAgRGVmYXVsdCxcbiAgRXJyb3IsXG4gIE9wYXF1ZVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
