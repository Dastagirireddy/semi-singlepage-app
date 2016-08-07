System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function normalizeValidator(validator) {
        if (validator.validate !== undefined) {
            return function (c) { return validator.validate(c); };
        }
        else {
            return validator;
        }
    }
    exports_1("normalizeValidator", normalizeValidator);
    function normalizeAsyncValidator(validator) {
        if (validator.validate !== undefined) {
            return function (c) { return Promise.resolve(validator.validate(c)); };
        }
        else {
            return validator;
        }
    }
    exports_1("normalizeAsyncValidator", normalizeAsyncValidator);
    return {
        setters:[],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL25vcm1hbGl6ZV92YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBR0EsNEJBQW1DLFNBQWtDO1FBQ25FLEVBQUUsQ0FBQyxDQUFhLFNBQVUsQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNsRCxNQUFNLENBQUMsVUFBQyxDQUFrQixJQUFLLE9BQVksU0FBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBbEMsQ0FBa0MsQ0FBQztRQUNwRSxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQWMsU0FBUyxDQUFDO1FBQ2hDLENBQUM7SUFDSCxDQUFDO0lBTkQsbURBTUMsQ0FBQTtJQUVELGlDQUF3QyxTQUF1QztRQUM3RSxFQUFFLENBQUMsQ0FBYSxTQUFVLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbEQsTUFBTSxDQUFDLFVBQUMsQ0FBa0IsSUFBSyxPQUFBLE9BQU8sQ0FBQyxPQUFPLENBQWEsU0FBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFuRCxDQUFtRCxDQUFDO1FBQ3JGLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBbUIsU0FBUyxDQUFDO1FBQ3JDLENBQUM7SUFDSCxDQUFDO0lBTkQsNkRBTUMsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZm9ybXMvZGlyZWN0aXZlcy9ub3JtYWxpemVfdmFsaWRhdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBYnN0cmFjdENvbnRyb2x9IGZyb20gXCIuLi9tb2RlbFwiO1xuaW1wb3J0IHtWYWxpZGF0b3IsIFZhbGlkYXRvckZuLCBBc3luY1ZhbGlkYXRvckZufSBmcm9tICcuL3ZhbGlkYXRvcnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplVmFsaWRhdG9yKHZhbGlkYXRvcjogVmFsaWRhdG9yRm4gfCBWYWxpZGF0b3IpOiBWYWxpZGF0b3JGbiB7XG4gIGlmICgoPFZhbGlkYXRvcj52YWxpZGF0b3IpLnZhbGlkYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gKGM6IEFic3RyYWN0Q29udHJvbCkgPT4gKDxWYWxpZGF0b3I+dmFsaWRhdG9yKS52YWxpZGF0ZShjKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gPFZhbGlkYXRvckZuPnZhbGlkYXRvcjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplQXN5bmNWYWxpZGF0b3IodmFsaWRhdG9yOiBBc3luY1ZhbGlkYXRvckZuIHwgVmFsaWRhdG9yKTogQXN5bmNWYWxpZGF0b3JGbiB7XG4gIGlmICgoPFZhbGlkYXRvcj52YWxpZGF0b3IpLnZhbGlkYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gKGM6IEFic3RyYWN0Q29udHJvbCkgPT4gUHJvbWlzZS5yZXNvbHZlKCg8VmFsaWRhdG9yPnZhbGlkYXRvcikudmFsaWRhdGUoYykpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiA8QXN5bmNWYWxpZGF0b3JGbj52YWxpZGF0b3I7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
