System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1;
    /**
     * Allows to refer to references which are not yet defined.
     *
     * For instance, `forwardRef` is used when the `token` which we need to refer to for the purposes of
     * DI is declared,
     * but not yet defined. It is also used when the `token` which we use when creating a query is not
     * yet defined.
     *
     * ### Example
     * {@example core/di/ts/forward_ref/forward_ref.ts region='forward_ref'}
     */
    function forwardRef(forwardRefFn) {
        forwardRefFn.__forward_ref__ = forwardRef;
        forwardRefFn.toString = function () { return lang_1.stringify(this()); };
        return forwardRefFn;
    }
    exports_1("forwardRef", forwardRef);
    /**
     * Lazily retrieves the reference value from a forwardRef.
     *
     * Acts as the identity function when given a non-forward-ref value.
     *
     * ### Example ([live demo](http://plnkr.co/edit/GU72mJrk1fiodChcmiDR?p=preview))
     *
     * ```typescript
     * var ref = forwardRef(() => "refValue");
     * expect(resolveForwardRef(ref)).toEqual("refValue");
     * expect(resolveForwardRef("regularValue")).toEqual("regularValue");
     * ```
     *
     * See: {@link forwardRef}
     */
    function resolveForwardRef(type) {
        if (lang_1.isFunction(type) && type.hasOwnProperty('__forward_ref__') &&
            type.__forward_ref__ === forwardRef) {
            return type();
        }
        else {
            return type;
        }
    }
    exports_1("resolveForwardRef", resolveForwardRef);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvZGkvZm9yd2FyZF9yZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQVdBOzs7Ozs7Ozs7O09BVUc7SUFDSCxvQkFBMkIsWUFBMEI7UUFDN0MsWUFBYSxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUM7UUFDM0MsWUFBYSxDQUFDLFFBQVEsR0FBRyxjQUFhLE1BQU0sQ0FBQyxnQkFBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEUsTUFBTSxDQUFhLFlBQWEsQ0FBQztJQUNuQyxDQUFDO0lBSkQsbUNBSUMsQ0FBQTtJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsMkJBQWtDLElBQVM7UUFDekMsRUFBRSxDQUFDLENBQUMsaUJBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDO1lBQzFELElBQUksQ0FBQyxlQUFlLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUN4QyxNQUFNLENBQWdCLElBQUssRUFBRSxDQUFDO1FBQ2hDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQztJQVBELGlEQU9DLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29yZS9kaS9mb3J3YXJkX3JlZi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VHlwZSwgc3RyaW5naWZ5LCBpc0Z1bmN0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG4vKipcbiAqIEFuIGludGVyZmFjZSB0aGF0IGEgZnVuY3Rpb24gcGFzc2VkIGludG8ge0BsaW5rIGZvcndhcmRSZWZ9IGhhcyB0byBpbXBsZW1lbnQuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgY29yZS9kaS90cy9mb3J3YXJkX3JlZi9mb3J3YXJkX3JlZi50cyByZWdpb249J2ZvcndhcmRfcmVmX2ZuJ31cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBGb3J3YXJkUmVmRm4geyAoKTogYW55OyB9XG5cbi8qKlxuICogQWxsb3dzIHRvIHJlZmVyIHRvIHJlZmVyZW5jZXMgd2hpY2ggYXJlIG5vdCB5ZXQgZGVmaW5lZC5cbiAqXG4gKiBGb3IgaW5zdGFuY2UsIGBmb3J3YXJkUmVmYCBpcyB1c2VkIHdoZW4gdGhlIGB0b2tlbmAgd2hpY2ggd2UgbmVlZCB0byByZWZlciB0byBmb3IgdGhlIHB1cnBvc2VzIG9mXG4gKiBESSBpcyBkZWNsYXJlZCxcbiAqIGJ1dCBub3QgeWV0IGRlZmluZWQuIEl0IGlzIGFsc28gdXNlZCB3aGVuIHRoZSBgdG9rZW5gIHdoaWNoIHdlIHVzZSB3aGVuIGNyZWF0aW5nIGEgcXVlcnkgaXMgbm90XG4gKiB5ZXQgZGVmaW5lZC5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICoge0BleGFtcGxlIGNvcmUvZGkvdHMvZm9yd2FyZF9yZWYvZm9yd2FyZF9yZWYudHMgcmVnaW9uPSdmb3J3YXJkX3JlZid9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkUmVmKGZvcndhcmRSZWZGbjogRm9yd2FyZFJlZkZuKTogVHlwZSB7XG4gICg8YW55PmZvcndhcmRSZWZGbikuX19mb3J3YXJkX3JlZl9fID0gZm9yd2FyZFJlZjtcbiAgKDxhbnk+Zm9yd2FyZFJlZkZuKS50b1N0cmluZyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gc3RyaW5naWZ5KHRoaXMoKSk7IH07XG4gIHJldHVybiAoPFR5cGU+PGFueT5mb3J3YXJkUmVmRm4pO1xufVxuXG4vKipcbiAqIExhemlseSByZXRyaWV2ZXMgdGhlIHJlZmVyZW5jZSB2YWx1ZSBmcm9tIGEgZm9yd2FyZFJlZi5cbiAqXG4gKiBBY3RzIGFzIHRoZSBpZGVudGl0eSBmdW5jdGlvbiB3aGVuIGdpdmVuIGEgbm9uLWZvcndhcmQtcmVmIHZhbHVlLlxuICpcbiAqICMjIyBFeGFtcGxlIChbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC9HVTcybUpyazFmaW9kQ2hjbWlEUj9wPXByZXZpZXcpKVxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIHZhciByZWYgPSBmb3J3YXJkUmVmKCgpID0+IFwicmVmVmFsdWVcIik7XG4gKiBleHBlY3QocmVzb2x2ZUZvcndhcmRSZWYocmVmKSkudG9FcXVhbChcInJlZlZhbHVlXCIpO1xuICogZXhwZWN0KHJlc29sdmVGb3J3YXJkUmVmKFwicmVndWxhclZhbHVlXCIpKS50b0VxdWFsKFwicmVndWxhclZhbHVlXCIpO1xuICogYGBgXG4gKlxuICogU2VlOiB7QGxpbmsgZm9yd2FyZFJlZn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVGb3J3YXJkUmVmKHR5cGU6IGFueSk6IGFueSB7XG4gIGlmIChpc0Z1bmN0aW9uKHR5cGUpICYmIHR5cGUuaGFzT3duUHJvcGVydHkoJ19fZm9yd2FyZF9yZWZfXycpICYmXG4gICAgICB0eXBlLl9fZm9yd2FyZF9yZWZfXyA9PT0gZm9yd2FyZFJlZikge1xuICAgIHJldHVybiAoPEZvcndhcmRSZWZGbj50eXBlKSgpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0eXBlO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
