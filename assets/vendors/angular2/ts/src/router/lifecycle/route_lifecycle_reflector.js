System.register(['angular2/src/facade/lang', './lifecycle_annotations_impl', 'angular2/src/core/reflection/reflection'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, lifecycle_annotations_impl_1, reflection_1;
    function hasLifecycleHook(e, type) {
        if (!(type instanceof lang_1.Type))
            return false;
        return e.name in type.prototype;
    }
    exports_1("hasLifecycleHook", hasLifecycleHook);
    function getCanActivateHook(type) {
        var annotations = reflection_1.reflector.annotations(type);
        for (var i = 0; i < annotations.length; i += 1) {
            var annotation = annotations[i];
            if (annotation instanceof lifecycle_annotations_impl_1.CanActivate) {
                return annotation.fn;
            }
        }
        return null;
    }
    exports_1("getCanActivateHook", getCanActivateHook);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (lifecycle_annotations_impl_1_1) {
                lifecycle_annotations_impl_1 = lifecycle_annotations_impl_1_1;
            },
            function (reflection_1_1) {
                reflection_1 = reflection_1_1;
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvbGlmZWN5Y2xlL3JvdXRlX2xpZmVjeWNsZV9yZWZsZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQUlBLDBCQUFpQyxDQUFxQixFQUFFLElBQUk7UUFDMUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksWUFBWSxXQUFJLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDMUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQVMsSUFBSyxDQUFDLFNBQVMsQ0FBQztJQUN4QyxDQUFDO0lBSEQsK0NBR0MsQ0FBQTtJQUVELDRCQUFtQyxJQUFJO1FBQ3JDLElBQUksV0FBVyxHQUFHLHNCQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDL0MsSUFBSSxVQUFVLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsWUFBWSx3Q0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDdEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7WUFDdkIsQ0FBQztRQUNILENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQVZELG1EQVVDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9saWZlY3ljbGUvcm91dGVfbGlmZWN5Y2xlX3JlZmxlY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VHlwZSwgaXNQcmVzZW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtSb3V0ZUxpZmVjeWNsZUhvb2ssIENhbkFjdGl2YXRlfSBmcm9tICcuL2xpZmVjeWNsZV9hbm5vdGF0aW9uc19pbXBsJztcbmltcG9ydCB7cmVmbGVjdG9yfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9yZWZsZWN0aW9uL3JlZmxlY3Rpb24nO1xuXG5leHBvcnQgZnVuY3Rpb24gaGFzTGlmZWN5Y2xlSG9vayhlOiBSb3V0ZUxpZmVjeWNsZUhvb2ssIHR5cGUpOiBib29sZWFuIHtcbiAgaWYgKCEodHlwZSBpbnN0YW5jZW9mIFR5cGUpKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBlLm5hbWUgaW4oPGFueT50eXBlKS5wcm90b3R5cGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDYW5BY3RpdmF0ZUhvb2sodHlwZSk6IEZ1bmN0aW9uIHtcbiAgdmFyIGFubm90YXRpb25zID0gcmVmbGVjdG9yLmFubm90YXRpb25zKHR5cGUpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGFubm90YXRpb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgbGV0IGFubm90YXRpb24gPSBhbm5vdGF0aW9uc1tpXTtcbiAgICBpZiAoYW5ub3RhdGlvbiBpbnN0YW5jZW9mIENhbkFjdGl2YXRlKSB7XG4gICAgICByZXR1cm4gYW5ub3RhdGlvbi5mbjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
