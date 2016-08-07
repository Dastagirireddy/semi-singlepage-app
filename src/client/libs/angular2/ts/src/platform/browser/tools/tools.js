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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL2Jyb3dzZXIvdG9vbHMvdG9vbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQUlJLE9BQU87SUFFWDs7Ozs7Ozs7OztPQVVHO0lBQ0gsMEJBQWlDLEdBQWlCO1FBQ2hELE9BQU8sQ0FBQyxFQUFFLEdBQUcsSUFBSSwyQkFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFGRCwrQ0FFQyxDQUFBO0lBRUQ7O09BRUc7SUFDSDtRQUNFLE9BQU8sT0FBTyxDQUFDLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRkQsaURBRUMsQ0FBQTs7Ozs7Ozs7OztZQXRCRyxPQUFPLEdBQVEsYUFBTSxDQUFDIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL2Jyb3dzZXIvdG9vbHMvdG9vbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2dsb2JhbH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7Q29tcG9uZW50UmVmfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvZHluYW1pY19jb21wb25lbnRfbG9hZGVyJztcbmltcG9ydCB7QW5ndWxhclRvb2xzfSBmcm9tICcuL2NvbW1vbl90b29scyc7XG5cbnZhciBjb250ZXh0ID0gPGFueT5nbG9iYWw7XG5cbi8qKlxuICogRW5hYmxlZCBBbmd1bGFyIDIgZGVidWcgdG9vbHMgdGhhdCBhcmUgYWNjZXNzaWJsZSB2aWEgeW91ciBicm93c2VyJ3NcbiAqIGRldmVsb3BlciBjb25zb2xlLlxuICpcbiAqIFVzYWdlOlxuICpcbiAqIDEuIE9wZW4gZGV2ZWxvcGVyIGNvbnNvbGUgKGUuZy4gaW4gQ2hyb21lIEN0cmwgKyBTaGlmdCArIGopXG4gKiAxLiBUeXBlIGBuZy5gICh1c3VhbGx5IHRoZSBjb25zb2xlIHdpbGwgc2hvdyBhdXRvLWNvbXBsZXRlIHN1Z2dlc3Rpb24pXG4gKiAxLiBUcnkgdGhlIGNoYW5nZSBkZXRlY3Rpb24gcHJvZmlsZXIgYG5nLnByb2ZpbGVyLnRpbWVDaGFuZ2VEZXRlY3Rpb24oKWBcbiAqICAgIHRoZW4gaGl0IEVudGVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlRGVidWdUb29scyhyZWY6IENvbXBvbmVudFJlZik6IHZvaWQge1xuICBjb250ZXh0Lm5nID0gbmV3IEFuZ3VsYXJUb29scyhyZWYpO1xufVxuXG4vKipcbiAqIERpc2FibGVzIEFuZ3VsYXIgMiB0b29scy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGVEZWJ1Z1Rvb2xzKCk6IHZvaWQge1xuICBkZWxldGUgY29udGV4dC5uZztcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
