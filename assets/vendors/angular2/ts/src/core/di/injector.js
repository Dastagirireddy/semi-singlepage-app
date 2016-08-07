System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, exceptions_1;
    var _THROW_IF_NOT_FOUND, THROW_IF_NOT_FOUND, Injector;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
            _THROW_IF_NOT_FOUND = lang_1.CONST_EXPR(new Object());
            exports_1("THROW_IF_NOT_FOUND", THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND);
            Injector = (function () {
                function Injector() {
                }
                /**
                 * Retrieves an instance from the injector based on the provided token.
                 * If not found:
                 * - Throws {@link NoProviderError} if no `notFoundValue` that is not equal to
                 * Injector.THROW_IF_NOT_FOUND is given
                 * - Returns the `notFoundValue` otherwise
                 *
                 * ### Example ([live demo](http://plnkr.co/edit/HeXSHg?p=preview))
                 *
                 * ```typescript
                 * var injector = ReflectiveInjector.resolveAndCreate([
                 *   provide("validToken", {useValue: "Value"})
                 * ]);
                 * expect(injector.get("validToken")).toEqual("Value");
                 * expect(() => injector.get("invalidToken")).toThrowError();
                 * ```
                 *
                 * `Injector` returns itself when given `Injector` as a token.
                 *
                 * ```typescript
                 * var injector = ReflectiveInjector.resolveAndCreate([]);
                 * expect(injector.get(Injector)).toBe(injector);
                 * ```
                 */
                Injector.prototype.get = function (token, notFoundValue) { return exceptions_1.unimplemented(); };
                Injector.THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
                return Injector;
            }());
            exports_1("Injector", Injector);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2RpL2luamVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFHTSxtQkFBbUIsRUFDWixrQkFBa0I7Ozs7Ozs7Ozs7WUFEekIsbUJBQW1CLEdBQUcsaUJBQVUsQ0FBQyxJQUFJLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDeEMsZ0NBQUEsa0JBQWtCLEdBQUcsbUJBQW1CLENBQUEsQ0FBQztZQUV0RDtnQkFBQTtnQkE0QkEsQ0FBQztnQkF6QkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQXVCRztnQkFDSCxzQkFBRyxHQUFILFVBQUksS0FBVSxFQUFFLGFBQW1CLElBQVMsTUFBTSxDQUFDLDBCQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBMUI5RCwyQkFBa0IsR0FBRyxtQkFBbUIsQ0FBQztnQkEyQmxELGVBQUM7WUFBRCxDQTVCQSxBQTRCQyxJQUFBO1lBNUJELCtCQTRCQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2RpL2luamVjdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDT05TVF9FWFBSfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHt1bmltcGxlbWVudGVkfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuXG5jb25zdCBfVEhST1dfSUZfTk9UX0ZPVU5EID0gQ09OU1RfRVhQUihuZXcgT2JqZWN0KCkpO1xuZXhwb3J0IGNvbnN0IFRIUk9XX0lGX05PVF9GT1VORCA9IF9USFJPV19JRl9OT1RfRk9VTkQ7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJbmplY3RvciB7XG4gIHN0YXRpYyBUSFJPV19JRl9OT1RfRk9VTkQgPSBfVEhST1dfSUZfTk9UX0ZPVU5EO1xuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgYW4gaW5zdGFuY2UgZnJvbSB0aGUgaW5qZWN0b3IgYmFzZWQgb24gdGhlIHByb3ZpZGVkIHRva2VuLlxuICAgKiBJZiBub3QgZm91bmQ6XG4gICAqIC0gVGhyb3dzIHtAbGluayBOb1Byb3ZpZGVyRXJyb3J9IGlmIG5vIGBub3RGb3VuZFZhbHVlYCB0aGF0IGlzIG5vdCBlcXVhbCB0b1xuICAgKiBJbmplY3Rvci5USFJPV19JRl9OT1RfRk9VTkQgaXMgZ2l2ZW5cbiAgICogLSBSZXR1cm5zIHRoZSBgbm90Rm91bmRWYWx1ZWAgb3RoZXJ3aXNlXG4gICAqXG4gICAqICMjIyBFeGFtcGxlIChbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC9IZVhTSGc/cD1wcmV2aWV3KSlcbiAgICpcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiB2YXIgaW5qZWN0b3IgPSBSZWZsZWN0aXZlSW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZShbXG4gICAqICAgcHJvdmlkZShcInZhbGlkVG9rZW5cIiwge3VzZVZhbHVlOiBcIlZhbHVlXCJ9KVxuICAgKiBdKTtcbiAgICogZXhwZWN0KGluamVjdG9yLmdldChcInZhbGlkVG9rZW5cIikpLnRvRXF1YWwoXCJWYWx1ZVwiKTtcbiAgICogZXhwZWN0KCgpID0+IGluamVjdG9yLmdldChcImludmFsaWRUb2tlblwiKSkudG9UaHJvd0Vycm9yKCk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBgSW5qZWN0b3JgIHJldHVybnMgaXRzZWxmIHdoZW4gZ2l2ZW4gYEluamVjdG9yYCBhcyBhIHRva2VuLlxuICAgKlxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIHZhciBpbmplY3RvciA9IFJlZmxlY3RpdmVJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKFtdKTtcbiAgICogZXhwZWN0KGluamVjdG9yLmdldChJbmplY3RvcikpLnRvQmUoaW5qZWN0b3IpO1xuICAgKiBgYGBcbiAgICovXG4gIGdldCh0b2tlbjogYW55LCBub3RGb3VuZFZhbHVlPzogYW55KTogYW55IHsgcmV0dXJuIHVuaW1wbGVtZW50ZWQoKTsgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
