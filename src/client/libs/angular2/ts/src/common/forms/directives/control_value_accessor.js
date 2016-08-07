System.register(['angular2/core', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, lang_1;
    var NG_VALUE_ACCESSOR;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * Used to provide a {@link ControlValueAccessor} for form controls.
             *
             * See {@link DefaultValueAccessor} for how to implement one.
             */
            exports_1("NG_VALUE_ACCESSOR", NG_VALUE_ACCESSOR = lang_1.CONST_EXPR(new core_1.OpaqueToken("NgValueAccessor")));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL2NvbnRyb2xfdmFsdWVfYWNjZXNzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQWlDYSxpQkFBaUI7Ozs7Ozs7Ozs7WUFMOUI7Ozs7ZUFJRztZQUNVLCtCQUFBLGlCQUFpQixHQUFnQixpQkFBVSxDQUFDLElBQUksa0JBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUEsQ0FBQyIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZm9ybXMvZGlyZWN0aXZlcy9jb250cm9sX3ZhbHVlX2FjY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPcGFxdWVUb2tlbn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0NPTlNUX0VYUFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbi8qKlxuICogQSBicmlkZ2UgYmV0d2VlbiBhIGNvbnRyb2wgYW5kIGEgbmF0aXZlIGVsZW1lbnQuXG4gKlxuICogQSBgQ29udHJvbFZhbHVlQWNjZXNzb3JgIGFic3RyYWN0cyB0aGUgb3BlcmF0aW9ucyBvZiB3cml0aW5nIGEgbmV3IHZhbHVlIHRvIGFcbiAqIERPTSBlbGVtZW50IHJlcHJlc2VudGluZyBhbiBpbnB1dCBjb250cm9sLlxuICpcbiAqIFBsZWFzZSBzZWUge0BsaW5rIERlZmF1bHRWYWx1ZUFjY2Vzc29yfSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIC8qKlxuICAgKiBXcml0ZSBhIG5ldyB2YWx1ZSB0byB0aGUgZWxlbWVudC5cbiAgICovXG4gIHdyaXRlVmFsdWUob2JqOiBhbnkpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBjb250cm9sIHJlY2VpdmVzIGEgY2hhbmdlIGV2ZW50LlxuICAgKi9cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZDtcblxuICAvKipcbiAgICogU2V0IHRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgY29udHJvbCByZWNlaXZlcyBhIHRvdWNoIGV2ZW50LlxuICAgKi9cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQ7XG59XG5cbi8qKlxuICogVXNlZCB0byBwcm92aWRlIGEge0BsaW5rIENvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmb3IgZm9ybSBjb250cm9scy5cbiAqXG4gKiBTZWUge0BsaW5rIERlZmF1bHRWYWx1ZUFjY2Vzc29yfSBmb3IgaG93IHRvIGltcGxlbWVudCBvbmUuXG4gKi9cbmV4cG9ydCBjb25zdCBOR19WQUxVRV9BQ0NFU1NPUjogT3BhcXVlVG9rZW4gPSBDT05TVF9FWFBSKG5ldyBPcGFxdWVUb2tlbihcIk5nVmFsdWVBY2Nlc3NvclwiKSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
