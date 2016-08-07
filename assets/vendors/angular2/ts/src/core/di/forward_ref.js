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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2RpL2ZvcndhcmRfcmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7SUFXQTs7Ozs7Ozs7OztPQVVHO0lBQ0gsb0JBQTJCLFlBQTBCO1FBQzdDLFlBQWEsQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDO1FBQzNDLFlBQWEsQ0FBQyxRQUFRLEdBQUcsY0FBYSxNQUFNLENBQUMsZ0JBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sQ0FBYSxZQUFhLENBQUM7SUFDbkMsQ0FBQztJQUpELG1DQUlDLENBQUE7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILDJCQUFrQyxJQUFTO1FBQ3pDLEVBQUUsQ0FBQyxDQUFDLGlCQUFVLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQztZQUMxRCxJQUFJLENBQUMsZUFBZSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDeEMsTUFBTSxDQUFnQixJQUFLLEVBQUUsQ0FBQztRQUNoQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztJQUNILENBQUM7SUFQRCxpREFPQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2RpL2ZvcndhcmRfcmVmLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUeXBlLCBzdHJpbmdpZnksIGlzRnVuY3Rpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbi8qKlxuICogQW4gaW50ZXJmYWNlIHRoYXQgYSBmdW5jdGlvbiBwYXNzZWQgaW50byB7QGxpbmsgZm9yd2FyZFJlZn0gaGFzIHRvIGltcGxlbWVudC5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL2ZvcndhcmRfcmVmL2ZvcndhcmRfcmVmLnRzIHJlZ2lvbj0nZm9yd2FyZF9yZWZfZm4nfVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEZvcndhcmRSZWZGbiB7ICgpOiBhbnk7IH1cblxuLyoqXG4gKiBBbGxvd3MgdG8gcmVmZXIgdG8gcmVmZXJlbmNlcyB3aGljaCBhcmUgbm90IHlldCBkZWZpbmVkLlxuICpcbiAqIEZvciBpbnN0YW5jZSwgYGZvcndhcmRSZWZgIGlzIHVzZWQgd2hlbiB0aGUgYHRva2VuYCB3aGljaCB3ZSBuZWVkIHRvIHJlZmVyIHRvIGZvciB0aGUgcHVycG9zZXMgb2ZcbiAqIERJIGlzIGRlY2xhcmVkLFxuICogYnV0IG5vdCB5ZXQgZGVmaW5lZC4gSXQgaXMgYWxzbyB1c2VkIHdoZW4gdGhlIGB0b2tlbmAgd2hpY2ggd2UgdXNlIHdoZW4gY3JlYXRpbmcgYSBxdWVyeSBpcyBub3RcbiAqIHlldCBkZWZpbmVkLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKiB7QGV4YW1wbGUgY29yZS9kaS90cy9mb3J3YXJkX3JlZi9mb3J3YXJkX3JlZi50cyByZWdpb249J2ZvcndhcmRfcmVmJ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmRSZWYoZm9yd2FyZFJlZkZuOiBGb3J3YXJkUmVmRm4pOiBUeXBlIHtcbiAgKDxhbnk+Zm9yd2FyZFJlZkZuKS5fX2ZvcndhcmRfcmVmX18gPSBmb3J3YXJkUmVmO1xuICAoPGFueT5mb3J3YXJkUmVmRm4pLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7IHJldHVybiBzdHJpbmdpZnkodGhpcygpKTsgfTtcbiAgcmV0dXJuICg8VHlwZT48YW55PmZvcndhcmRSZWZGbik7XG59XG5cbi8qKlxuICogTGF6aWx5IHJldHJpZXZlcyB0aGUgcmVmZXJlbmNlIHZhbHVlIGZyb20gYSBmb3J3YXJkUmVmLlxuICpcbiAqIEFjdHMgYXMgdGhlIGlkZW50aXR5IGZ1bmN0aW9uIHdoZW4gZ2l2ZW4gYSBub24tZm9yd2FyZC1yZWYgdmFsdWUuXG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L0dVNzJtSnJrMWZpb2RDaGNtaURSP3A9cHJldmlldykpXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogdmFyIHJlZiA9IGZvcndhcmRSZWYoKCkgPT4gXCJyZWZWYWx1ZVwiKTtcbiAqIGV4cGVjdChyZXNvbHZlRm9yd2FyZFJlZihyZWYpKS50b0VxdWFsKFwicmVmVmFsdWVcIik7XG4gKiBleHBlY3QocmVzb2x2ZUZvcndhcmRSZWYoXCJyZWd1bGFyVmFsdWVcIikpLnRvRXF1YWwoXCJyZWd1bGFyVmFsdWVcIik7XG4gKiBgYGBcbiAqXG4gKiBTZWU6IHtAbGluayBmb3J3YXJkUmVmfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZUZvcndhcmRSZWYodHlwZTogYW55KTogYW55IHtcbiAgaWYgKGlzRnVuY3Rpb24odHlwZSkgJiYgdHlwZS5oYXNPd25Qcm9wZXJ0eSgnX19mb3J3YXJkX3JlZl9fJykgJiZcbiAgICAgIHR5cGUuX19mb3J3YXJkX3JlZl9fID09PSBmb3J3YXJkUmVmKSB7XG4gICAgcmV0dXJuICg8Rm9yd2FyZFJlZkZuPnR5cGUpKCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHR5cGU7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
