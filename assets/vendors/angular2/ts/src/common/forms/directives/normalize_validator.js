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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZm9ybXMvZGlyZWN0aXZlcy9ub3JtYWxpemVfdmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUdBLDRCQUFtQyxTQUFrQztRQUNuRSxFQUFFLENBQUMsQ0FBYSxTQUFVLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbEQsTUFBTSxDQUFDLFVBQUMsQ0FBa0IsSUFBSyxPQUFZLFNBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQWxDLENBQWtDLENBQUM7UUFDcEUsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFjLFNBQVMsQ0FBQztRQUNoQyxDQUFDO0lBQ0gsQ0FBQztJQU5ELG1EQU1DLENBQUE7SUFFRCxpQ0FBd0MsU0FBdUM7UUFDN0UsRUFBRSxDQUFDLENBQWEsU0FBVSxDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxVQUFDLENBQWtCLElBQUssT0FBQSxPQUFPLENBQUMsT0FBTyxDQUFhLFNBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBbkQsQ0FBbUQsQ0FBQztRQUNyRixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQW1CLFNBQVMsQ0FBQztRQUNyQyxDQUFDO0lBQ0gsQ0FBQztJQU5ELDZEQU1DLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL25vcm1hbGl6ZV92YWxpZGF0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Fic3RyYWN0Q29udHJvbH0gZnJvbSBcIi4uL21vZGVsXCI7XG5pbXBvcnQge1ZhbGlkYXRvciwgVmFsaWRhdG9yRm4sIEFzeW5jVmFsaWRhdG9yRm59IGZyb20gJy4vdmFsaWRhdG9ycyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVWYWxpZGF0b3IodmFsaWRhdG9yOiBWYWxpZGF0b3JGbiB8IFZhbGlkYXRvcik6IFZhbGlkYXRvckZuIHtcbiAgaWYgKCg8VmFsaWRhdG9yPnZhbGlkYXRvcikudmFsaWRhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiAoYzogQWJzdHJhY3RDb250cm9sKSA9PiAoPFZhbGlkYXRvcj52YWxpZGF0b3IpLnZhbGlkYXRlKGMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiA8VmFsaWRhdG9yRm4+dmFsaWRhdG9yO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVBc3luY1ZhbGlkYXRvcih2YWxpZGF0b3I6IEFzeW5jVmFsaWRhdG9yRm4gfCBWYWxpZGF0b3IpOiBBc3luY1ZhbGlkYXRvckZuIHtcbiAgaWYgKCg8VmFsaWRhdG9yPnZhbGlkYXRvcikudmFsaWRhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiAoYzogQWJzdHJhY3RDb250cm9sKSA9PiBQcm9taXNlLnJlc29sdmUoKDxWYWxpZGF0b3I+dmFsaWRhdG9yKS52YWxpZGF0ZShjKSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIDxBc3luY1ZhbGlkYXRvckZuPnZhbGlkYXRvcjtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
