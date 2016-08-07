System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function getTypeOf(instance) {
        return instance.constructor;
    }
    exports_1("getTypeOf", getTypeOf);
    function instantiateType(type, params) {
        if (params === void 0) { params = []; }
        var instance = Object.create(type.prototype);
        instance.constructor.apply(instance, params);
        return instance;
    }
    exports_1("instantiateType", instantiateType);
    return {
        setters:[],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3Rlc3RpbmcvbGFuZ191dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQSxtQkFBMEIsUUFBUTtRQUNoQyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQztJQUM5QixDQUFDO0lBRkQsaUNBRUMsQ0FBQTtJQUVELHlCQUFnQyxJQUFjLEVBQUUsTUFBa0I7UUFBbEIsc0JBQWtCLEdBQWxCLFdBQWtCO1FBQ2hFLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM3QyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFKRCw2Q0FJQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3Rlc3RpbmcvbGFuZ191dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBnZXRUeXBlT2YoaW5zdGFuY2UpIHtcbiAgcmV0dXJuIGluc3RhbmNlLmNvbnN0cnVjdG9yO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5zdGFudGlhdGVUeXBlKHR5cGU6IEZ1bmN0aW9uLCBwYXJhbXM6IGFueVtdID0gW10pIHtcbiAgdmFyIGluc3RhbmNlID0gT2JqZWN0LmNyZWF0ZSh0eXBlLnByb3RvdHlwZSk7XG4gIGluc3RhbmNlLmNvbnN0cnVjdG9yLmFwcGx5KGluc3RhbmNlLCBwYXJhbXMpO1xuICByZXR1cm4gaW5zdGFuY2U7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
