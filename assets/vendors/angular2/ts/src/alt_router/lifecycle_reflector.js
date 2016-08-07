System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1;
    function hasLifecycleHook(name, obj) {
        var type = obj.constructor;
        if (!(type instanceof lang_1.Type))
            return false;
        return name in type.prototype;
    }
    exports_1("hasLifecycleHook", hasLifecycleHook);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9hbHRfcm91dGVyL2xpZmVjeWNsZV9yZWZsZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQUVBLDBCQUFpQyxJQUFZLEVBQUUsR0FBVztRQUN4RCxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFlBQVksV0FBSSxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxJQUFJLElBQVMsSUFBSyxDQUFDLFNBQVMsQ0FBQztJQUN0QyxDQUFDO0lBSkQsK0NBSUMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvYWx0X3JvdXRlci9saWZlY3ljbGVfcmVmbGVjdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUeXBlfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG5leHBvcnQgZnVuY3Rpb24gaGFzTGlmZWN5Y2xlSG9vayhuYW1lOiBzdHJpbmcsIG9iajogT2JqZWN0KTogYm9vbGVhbiB7XG4gIGxldCB0eXBlID0gb2JqLmNvbnN0cnVjdG9yO1xuICBpZiAoISh0eXBlIGluc3RhbmNlb2YgVHlwZSkpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIG5hbWUgaW4oPGFueT50eXBlKS5wcm90b3R5cGU7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
