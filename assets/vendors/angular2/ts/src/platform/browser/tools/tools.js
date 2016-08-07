System.register(['angular2/src/facade/lang', './common_tools'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, common_tools_1;
    var context;
    /**
     * Enabled Angular 2 debug tools that are accessible via your browser's
     * developer console.
     *
     * Usage:
     *
     * 1. Open developer console (e.g. in Chrome Ctrl + Shift + j)
     * 1. Type `ng.` (usually the console will show auto-complete suggestion)
     * 1. Try the change detection profiler `ng.profiler.timeChangeDetection()`
     *    then hit Enter.
     */
    function enableDebugTools(ref) {
        context.ng = new common_tools_1.AngularTools(ref);
    }
    exports_1("enableDebugTools", enableDebugTools);
    /**
     * Disables Angular 2 tools.
     */
    function disableDebugTools() {
        delete context.ng;
    }
    exports_1("disableDebugTools", disableDebugTools);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (common_tools_1_1) {
                common_tools_1 = common_tools_1_1;
            }],
        execute: function() {
            context = lang_1.global;
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9icm93c2VyL3Rvb2xzL3Rvb2xzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFJSSxPQUFPO0lBRVg7Ozs7Ozs7Ozs7T0FVRztJQUNILDBCQUFpQyxHQUFpQjtRQUNoRCxPQUFPLENBQUMsRUFBRSxHQUFHLElBQUksMkJBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRkQsK0NBRUMsQ0FBQTtJQUVEOztPQUVHO0lBQ0g7UUFDRSxPQUFPLE9BQU8sQ0FBQyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUZELGlEQUVDLENBQUE7Ozs7Ozs7Ozs7WUF0QkcsT0FBTyxHQUFRLGFBQU0sQ0FBQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvcGxhdGZvcm0vYnJvd3Nlci90b29scy90b29scy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Z2xvYmFsfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtDb21wb25lbnRSZWZ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9jb21wb25lbnRfZmFjdG9yeSc7XG5pbXBvcnQge0FuZ3VsYXJUb29sc30gZnJvbSAnLi9jb21tb25fdG9vbHMnO1xuXG52YXIgY29udGV4dCA9IDxhbnk+Z2xvYmFsO1xuXG4vKipcbiAqIEVuYWJsZWQgQW5ndWxhciAyIGRlYnVnIHRvb2xzIHRoYXQgYXJlIGFjY2Vzc2libGUgdmlhIHlvdXIgYnJvd3NlcidzXG4gKiBkZXZlbG9wZXIgY29uc29sZS5cbiAqXG4gKiBVc2FnZTpcbiAqXG4gKiAxLiBPcGVuIGRldmVsb3BlciBjb25zb2xlIChlLmcuIGluIENocm9tZSBDdHJsICsgU2hpZnQgKyBqKVxuICogMS4gVHlwZSBgbmcuYCAodXN1YWxseSB0aGUgY29uc29sZSB3aWxsIHNob3cgYXV0by1jb21wbGV0ZSBzdWdnZXN0aW9uKVxuICogMS4gVHJ5IHRoZSBjaGFuZ2UgZGV0ZWN0aW9uIHByb2ZpbGVyIGBuZy5wcm9maWxlci50aW1lQ2hhbmdlRGV0ZWN0aW9uKClgXG4gKiAgICB0aGVuIGhpdCBFbnRlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZURlYnVnVG9vbHMocmVmOiBDb21wb25lbnRSZWYpOiB2b2lkIHtcbiAgY29udGV4dC5uZyA9IG5ldyBBbmd1bGFyVG9vbHMocmVmKTtcbn1cblxuLyoqXG4gKiBEaXNhYmxlcyBBbmd1bGFyIDIgdG9vbHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlRGVidWdUb29scygpOiB2b2lkIHtcbiAgZGVsZXRlIGNvbnRleHQubmc7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
