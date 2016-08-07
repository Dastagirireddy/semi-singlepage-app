System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ConnectionBackend, Connection;
    return {
        setters:[],
        execute: function() {
            /**
             * Abstract class from which real backends are derived.
             *
             * The primary purpose of a `ConnectionBackend` is to create new connections to fulfill a given
             * {@link Request}.
             */
            ConnectionBackend = (function () {
                function ConnectionBackend() {
                }
                return ConnectionBackend;
            }());
            exports_1("ConnectionBackend", ConnectionBackend);
            /**
             * Abstract class from which real connections are derived.
             */
            Connection = (function () {
                function Connection() {
                }
                return Connection;
            }());
            exports_1("Connection", Connection);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2h0dHAvaW50ZXJmYWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O1lBT0E7Ozs7O2VBS0c7WUFDSDtnQkFBQTtnQkFBK0YsQ0FBQztnQkFBRCx3QkFBQztZQUFELENBQS9GLEFBQWdHLElBQUE7WUFBaEcsaURBQWdHLENBQUE7WUFFaEc7O2VBRUc7WUFDSDtnQkFBQTtnQkFJQSxDQUFDO2dCQUFELGlCQUFDO1lBQUQsQ0FKQSxBQUlDLElBQUE7WUFKRCxtQ0FJQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2h0dHAvaW50ZXJmYWNlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVhZHlTdGF0ZSwgUmVxdWVzdE1ldGhvZCwgUmVzcG9uc2VUeXBlfSBmcm9tICcuL2VudW1zJztcbmltcG9ydCB7SGVhZGVyc30gZnJvbSAnLi9oZWFkZXJzJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbiwgV3JhcHBlZEV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jJztcbmltcG9ydCB7UmVxdWVzdH0gZnJvbSAnLi9zdGF0aWNfcmVxdWVzdCc7XG5pbXBvcnQge1VSTFNlYXJjaFBhcmFtc30gZnJvbSAnLi91cmxfc2VhcmNoX3BhcmFtcyc7XG5cbi8qKlxuICogQWJzdHJhY3QgY2xhc3MgZnJvbSB3aGljaCByZWFsIGJhY2tlbmRzIGFyZSBkZXJpdmVkLlxuICpcbiAqIFRoZSBwcmltYXJ5IHB1cnBvc2Ugb2YgYSBgQ29ubmVjdGlvbkJhY2tlbmRgIGlzIHRvIGNyZWF0ZSBuZXcgY29ubmVjdGlvbnMgdG8gZnVsZmlsbCBhIGdpdmVuXG4gKiB7QGxpbmsgUmVxdWVzdH0uXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb25uZWN0aW9uQmFja2VuZCB7IGFic3RyYWN0IGNyZWF0ZUNvbm5lY3Rpb24ocmVxdWVzdDogYW55KTogQ29ubmVjdGlvbjsgfVxuXG4vKipcbiAqIEFic3RyYWN0IGNsYXNzIGZyb20gd2hpY2ggcmVhbCBjb25uZWN0aW9ucyBhcmUgZGVyaXZlZC5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbm5lY3Rpb24ge1xuICByZWFkeVN0YXRlOiBSZWFkeVN0YXRlO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICByZXNwb25zZTogYW55OyAgLy8gVE9ETzogZ2VuZXJpYyBvZiA8UmVzcG9uc2U+O1xufVxuXG4vKipcbiAqIEludGVyZmFjZSBmb3Igb3B0aW9ucyB0byBjb25zdHJ1Y3QgYSBSZXF1ZXN0T3B0aW9ucywgYmFzZWQgb25cbiAqIFtSZXF1ZXN0SW5pdF0oaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvI3JlcXVlc3Rpbml0KSBmcm9tIHRoZSBGZXRjaCBzcGVjLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RPcHRpb25zQXJncyB7XG4gIHVybD86IHN0cmluZztcbiAgbWV0aG9kPzogc3RyaW5nIHwgUmVxdWVzdE1ldGhvZDtcbiAgc2VhcmNoPzogc3RyaW5nIHwgVVJMU2VhcmNoUGFyYW1zO1xuICBoZWFkZXJzPzogSGVhZGVycztcbiAgLy8gVE9ETzogU3VwcG9ydCBCbG9iLCBBcnJheUJ1ZmZlciwgSlNPTiwgVVJMU2VhcmNoUGFyYW1zLCBGb3JtRGF0YVxuICBib2R5Pzogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcXVpcmVkIHN0cnVjdHVyZSB3aGVuIGNvbnN0cnVjdGluZyBuZXcgUmVxdWVzdCgpO1xuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RBcmdzIGV4dGVuZHMgUmVxdWVzdE9wdGlvbnNBcmdzIHsgdXJsOiBzdHJpbmc7IH1cblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIG9wdGlvbnMgdG8gY29uc3RydWN0IGEgUmVzcG9uc2UsIGJhc2VkIG9uXG4gKiBbUmVzcG9uc2VJbml0XShodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jcmVzcG9uc2Vpbml0KSBmcm9tIHRoZSBGZXRjaCBzcGVjLlxuICovXG5leHBvcnQgdHlwZSBSZXNwb25zZU9wdGlvbnNBcmdzID0ge1xuICAvLyBUT0RPOiBTdXBwb3J0IEJsb2IsIEFycmF5QnVmZmVyLCBKU09OXG4gIGJvZHk/OiBzdHJpbmcgfCBPYmplY3QgfCBGb3JtRGF0YTtcbiAgc3RhdHVzPzogbnVtYmVyO1xuICBzdGF0dXNUZXh0Pzogc3RyaW5nO1xuICBoZWFkZXJzPzogSGVhZGVycztcbiAgdHlwZT86IFJlc3BvbnNlVHlwZTtcbiAgdXJsPzogc3RyaW5nO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
