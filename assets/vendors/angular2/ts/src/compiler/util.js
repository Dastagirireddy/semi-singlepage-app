System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1;
    var MODULE_SUFFIX, CAMEL_CASE_REGEXP, DASH_CASE_REGEXP;
    function camelCaseToDashCase(input) {
        return lang_1.StringWrapper.replaceAllMapped(input, CAMEL_CASE_REGEXP, function (m) { return '-' + m[1].toLowerCase(); });
    }
    exports_1("camelCaseToDashCase", camelCaseToDashCase);
    function dashCaseToCamelCase(input) {
        return lang_1.StringWrapper.replaceAllMapped(input, DASH_CASE_REGEXP, function (m) { return m[1].toUpperCase(); });
    }
    exports_1("dashCaseToCamelCase", dashCaseToCamelCase);
    function splitAtColon(input, defaultValues) {
        var parts = lang_1.StringWrapper.split(input.trim(), /\s*:\s*/g);
        if (parts.length > 1) {
            return parts;
        }
        else {
            return defaultValues;
        }
    }
    exports_1("splitAtColon", splitAtColon);
    function sanitizeIdentifier(name) {
        return lang_1.StringWrapper.replaceAll(name, /\W/g, '_');
    }
    exports_1("sanitizeIdentifier", sanitizeIdentifier);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            exports_1("MODULE_SUFFIX", MODULE_SUFFIX = lang_1.IS_DART ? '.dart' : '');
            CAMEL_CASE_REGEXP = /([A-Z])/g;
            DASH_CASE_REGEXP = /-([a-z])/g;
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFFVyxhQUFhLEVBRXBCLGlCQUFpQixFQUNqQixnQkFBZ0I7SUFFcEIsNkJBQW9DLEtBQWE7UUFDL0MsTUFBTSxDQUFDLG9CQUFhLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLGlCQUFpQixFQUN4QixVQUFDLENBQUMsSUFBTyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFIRCxxREFHQyxDQUFBO0lBRUQsNkJBQW9DLEtBQWE7UUFDL0MsTUFBTSxDQUFDLG9CQUFhLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLGdCQUFnQixFQUN2QixVQUFDLENBQUMsSUFBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUhELHFEQUdDLENBQUE7SUFFRCxzQkFBNkIsS0FBYSxFQUFFLGFBQXVCO1FBQ2pFLElBQUksS0FBSyxHQUFHLG9CQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMxRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNmLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxhQUFhLENBQUM7UUFDdkIsQ0FBQztJQUNILENBQUM7SUFQRCx1Q0FPQyxDQUFBO0lBRUQsNEJBQW1DLElBQVk7UUFDN0MsTUFBTSxDQUFDLG9CQUFhLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUZELG1EQUVDLENBQUE7Ozs7Ozs7WUExQlUsMkJBQUEsYUFBYSxHQUFHLGNBQU8sR0FBRyxPQUFPLEdBQUcsRUFBRSxDQUFBLENBQUM7WUFFOUMsaUJBQWlCLEdBQUcsVUFBVSxDQUFDO1lBQy9CLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tcGlsZXIvdXRpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SVNfREFSVCwgU3RyaW5nV3JhcHBlciwgTWF0aCwgaXNCbGFua30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuZXhwb3J0IHZhciBNT0RVTEVfU1VGRklYID0gSVNfREFSVCA/ICcuZGFydCcgOiAnJztcblxudmFyIENBTUVMX0NBU0VfUkVHRVhQID0gLyhbQS1aXSkvZztcbnZhciBEQVNIX0NBU0VfUkVHRVhQID0gLy0oW2Etel0pL2c7XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW1lbENhc2VUb0Rhc2hDYXNlKGlucHV0OiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsTWFwcGVkKGlucHV0LCBDQU1FTF9DQVNFX1JFR0VYUCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobSkgPT4geyByZXR1cm4gJy0nICsgbVsxXS50b0xvd2VyQ2FzZSgpOyB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRhc2hDYXNlVG9DYW1lbENhc2UoaW5wdXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGxNYXBwZWQoaW5wdXQsIERBU0hfQ0FTRV9SRUdFWFAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG0pID0+IHsgcmV0dXJuIG1bMV0udG9VcHBlckNhc2UoKTsgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzcGxpdEF0Q29sb24oaW5wdXQ6IHN0cmluZywgZGVmYXVsdFZhbHVlczogc3RyaW5nW10pOiBzdHJpbmdbXSB7XG4gIHZhciBwYXJ0cyA9IFN0cmluZ1dyYXBwZXIuc3BsaXQoaW5wdXQudHJpbSgpLCAvXFxzKjpcXHMqL2cpO1xuICBpZiAocGFydHMubGVuZ3RoID4gMSkge1xuICAgIHJldHVybiBwYXJ0cztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZGVmYXVsdFZhbHVlcztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2FuaXRpemVJZGVudGlmaWVyKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGwobmFtZSwgL1xcVy9nLCAnXycpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
