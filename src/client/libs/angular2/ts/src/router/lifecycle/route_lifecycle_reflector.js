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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9saWZlY3ljbGUvcm91dGVfbGlmZWN5Y2xlX3JlZmxlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0lBSUEsMEJBQWlDLENBQXFCLEVBQUUsSUFBSTtRQUMxRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxZQUFZLFdBQUksQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUMxQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBUyxJQUFLLENBQUMsU0FBUyxDQUFDO0lBQ3hDLENBQUM7SUFIRCwrQ0FHQyxDQUFBO0lBRUQsNEJBQW1DLElBQUk7UUFDckMsSUFBSSxXQUFXLEdBQUcsc0JBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUMvQyxJQUFJLFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsRUFBRSxDQUFDLENBQUMsVUFBVSxZQUFZLHdDQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUN2QixDQUFDO1FBQ0gsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBVkQsbURBVUMsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvbGlmZWN5Y2xlL3JvdXRlX2xpZmVjeWNsZV9yZWZsZWN0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1R5cGUsIGlzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7Um91dGVMaWZlY3ljbGVIb29rLCBDYW5BY3RpdmF0ZX0gZnJvbSAnLi9saWZlY3ljbGVfYW5ub3RhdGlvbnNfaW1wbCc7XG5pbXBvcnQge3JlZmxlY3Rvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVmbGVjdGlvbi9yZWZsZWN0aW9uJztcblxuZXhwb3J0IGZ1bmN0aW9uIGhhc0xpZmVjeWNsZUhvb2soZTogUm91dGVMaWZlY3ljbGVIb29rLCB0eXBlKTogYm9vbGVhbiB7XG4gIGlmICghKHR5cGUgaW5zdGFuY2VvZiBUeXBlKSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gZS5uYW1lIGluKDxhbnk+dHlwZSkucHJvdG90eXBlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2FuQWN0aXZhdGVIb29rKHR5cGUpOiBGdW5jdGlvbiB7XG4gIHZhciBhbm5vdGF0aW9ucyA9IHJlZmxlY3Rvci5hbm5vdGF0aW9ucyh0eXBlKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbm5vdGF0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGxldCBhbm5vdGF0aW9uID0gYW5ub3RhdGlvbnNbaV07XG4gICAgaWYgKGFubm90YXRpb24gaW5zdGFuY2VvZiBDYW5BY3RpdmF0ZSkge1xuICAgICAgcmV0dXJuIGFubm90YXRpb24uZm47XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
