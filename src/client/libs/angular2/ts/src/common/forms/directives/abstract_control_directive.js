System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, exceptions_1;
    var AbstractControlDirective;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
            /**
             * Base class for control directives.
             *
             * Only used internally in the forms module.
             */
            AbstractControlDirective = (function () {
                function AbstractControlDirective() {
                }
                Object.defineProperty(AbstractControlDirective.prototype, "control", {
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AbstractControlDirective.prototype, "value", {
                    get: function () { return lang_1.isPresent(this.control) ? this.control.value : null; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AbstractControlDirective.prototype, "valid", {
                    get: function () { return lang_1.isPresent(this.control) ? this.control.valid : null; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AbstractControlDirective.prototype, "errors", {
                    get: function () {
                        return lang_1.isPresent(this.control) ? this.control.errors : null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AbstractControlDirective.prototype, "pristine", {
                    get: function () { return lang_1.isPresent(this.control) ? this.control.pristine : null; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AbstractControlDirective.prototype, "dirty", {
                    get: function () { return lang_1.isPresent(this.control) ? this.control.dirty : null; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AbstractControlDirective.prototype, "touched", {
                    get: function () { return lang_1.isPresent(this.control) ? this.control.touched : null; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AbstractControlDirective.prototype, "untouched", {
                    get: function () { return lang_1.isPresent(this.control) ? this.control.untouched : null; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AbstractControlDirective.prototype, "path", {
                    get: function () { return null; },
                    enumerable: true,
                    configurable: true
                });
                return AbstractControlDirective;
            }());
            exports_1("AbstractControlDirective", AbstractControlDirective);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL2Fic3RyYWN0X2NvbnRyb2xfZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O1lBSUE7Ozs7ZUFJRztZQUNIO2dCQUFBO2dCQW9CQSxDQUFDO2dCQW5CQyxzQkFBSSw2Q0FBTzt5QkFBWCxjQUFpQyxNQUFNLENBQUMsMEJBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUUxRCxzQkFBSSwyQ0FBSzt5QkFBVCxjQUFtQixNQUFNLENBQUMsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUVoRixzQkFBSSwyQ0FBSzt5QkFBVCxjQUF1QixNQUFNLENBQUMsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUVwRixzQkFBSSw0Q0FBTTt5QkFBVjt3QkFDRSxNQUFNLENBQUMsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO29CQUM5RCxDQUFDOzs7bUJBQUE7Z0JBRUQsc0JBQUksOENBQVE7eUJBQVosY0FBMEIsTUFBTSxDQUFDLGdCQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFFMUYsc0JBQUksMkNBQUs7eUJBQVQsY0FBdUIsTUFBTSxDQUFDLGdCQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFFcEYsc0JBQUksNkNBQU87eUJBQVgsY0FBeUIsTUFBTSxDQUFDLGdCQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFFeEYsc0JBQUksK0NBQVM7eUJBQWIsY0FBMkIsTUFBTSxDQUFDLGdCQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFFNUYsc0JBQUksMENBQUk7eUJBQVIsY0FBdUIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFDdkMsK0JBQUM7WUFBRCxDQXBCQSxBQW9CQyxJQUFBO1lBcEJELCtEQW9CQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL2Fic3RyYWN0X2NvbnRyb2xfZGlyZWN0aXZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBYnN0cmFjdENvbnRyb2x9IGZyb20gJy4uL21vZGVsJztcbmltcG9ydCB7aXNQcmVzZW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHt1bmltcGxlbWVudGVkfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIGNvbnRyb2wgZGlyZWN0aXZlcy5cbiAqXG4gKiBPbmx5IHVzZWQgaW50ZXJuYWxseSBpbiB0aGUgZm9ybXMgbW9kdWxlLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RDb250cm9sRGlyZWN0aXZlIHtcbiAgZ2V0IGNvbnRyb2woKTogQWJzdHJhY3RDb250cm9sIHsgcmV0dXJuIHVuaW1wbGVtZW50ZWQoKTsgfVxuXG4gIGdldCB2YWx1ZSgpOiBhbnkgeyByZXR1cm4gaXNQcmVzZW50KHRoaXMuY29udHJvbCkgPyB0aGlzLmNvbnRyb2wudmFsdWUgOiBudWxsOyB9XG5cbiAgZ2V0IHZhbGlkKCk6IGJvb2xlYW4geyByZXR1cm4gaXNQcmVzZW50KHRoaXMuY29udHJvbCkgPyB0aGlzLmNvbnRyb2wudmFsaWQgOiBudWxsOyB9XG5cbiAgZ2V0IGVycm9ycygpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmNvbnRyb2wpID8gdGhpcy5jb250cm9sLmVycm9ycyA6IG51bGw7XG4gIH1cblxuICBnZXQgcHJpc3RpbmUoKTogYm9vbGVhbiB7IHJldHVybiBpc1ByZXNlbnQodGhpcy5jb250cm9sKSA/IHRoaXMuY29udHJvbC5wcmlzdGluZSA6IG51bGw7IH1cblxuICBnZXQgZGlydHkoKTogYm9vbGVhbiB7IHJldHVybiBpc1ByZXNlbnQodGhpcy5jb250cm9sKSA/IHRoaXMuY29udHJvbC5kaXJ0eSA6IG51bGw7IH1cblxuICBnZXQgdG91Y2hlZCgpOiBib29sZWFuIHsgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmNvbnRyb2wpID8gdGhpcy5jb250cm9sLnRvdWNoZWQgOiBudWxsOyB9XG5cbiAgZ2V0IHVudG91Y2hlZCgpOiBib29sZWFuIHsgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmNvbnRyb2wpID8gdGhpcy5jb250cm9sLnVudG91Y2hlZCA6IG51bGw7IH1cblxuICBnZXQgcGF0aCgpOiBzdHJpbmdbXSB7IHJldHVybiBudWxsOyB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
