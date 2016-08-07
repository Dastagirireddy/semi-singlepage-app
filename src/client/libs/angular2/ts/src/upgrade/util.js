System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function stringify(obj) {
        if (typeof obj == 'function')
            return obj.name || obj.toString();
        return '' + obj;
    }
    exports_1("stringify", stringify);
    function onError(e) {
        // TODO: (misko): We seem to not have a stack trace here!
        console.log(e, e.stack);
        throw e;
    }
    exports_1("onError", onError);
    function controllerKey(name) {
        return '$' + name + 'Controller';
    }
    exports_1("controllerKey", controllerKey);
    return {
        setters:[],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3VwZ3JhZGUvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFDQSxtQkFBMEIsR0FBUTtRQUNoQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxVQUFVLENBQUM7WUFBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEUsTUFBTSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDbEIsQ0FBQztJQUhELGlDQUdDLENBQUE7SUFHRCxpQkFBd0IsQ0FBTTtRQUM1Qix5REFBeUQ7UUFDekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxDQUFDO0lBQ1YsQ0FBQztJQUpELDZCQUlDLENBQUE7SUFFRCx1QkFBOEIsSUFBWTtRQUN4QyxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksR0FBRyxZQUFZLENBQUM7SUFDbkMsQ0FBQztJQUZELHlDQUVDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvdXBncmFkZS91dGlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5KG9iajogYW55KTogc3RyaW5nIHtcbiAgaWYgKHR5cGVvZiBvYmogPT0gJ2Z1bmN0aW9uJykgcmV0dXJuIG9iai5uYW1lIHx8IG9iai50b1N0cmluZygpO1xuICByZXR1cm4gJycgKyBvYmo7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG9uRXJyb3IoZTogYW55KSB7XG4gIC8vIFRPRE86IChtaXNrbyk6IFdlIHNlZW0gdG8gbm90IGhhdmUgYSBzdGFjayB0cmFjZSBoZXJlIVxuICBjb25zb2xlLmxvZyhlLCBlLnN0YWNrKTtcbiAgdGhyb3cgZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnRyb2xsZXJLZXkobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuICckJyArIG5hbWUgKyAnQ29udHJvbGxlcic7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
