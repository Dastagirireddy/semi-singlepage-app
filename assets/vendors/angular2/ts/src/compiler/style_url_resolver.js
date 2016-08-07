// Some of the code comes from WebComponents.JS
// https://github.com/webcomponents/webcomponentsjs/blob/master/src/HTMLImports/path.js
System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1;
    var StyleWithImports, _cssImportRe, _urlWithSchemaRe;
    function isStyleUrlResolvable(url) {
        if (lang_1.isBlank(url) || url.length === 0 || url[0] == '/')
            return false;
        var schemeMatch = lang_1.RegExpWrapper.firstMatch(_urlWithSchemaRe, url);
        return lang_1.isBlank(schemeMatch) || schemeMatch[1] == 'package' || schemeMatch[1] == 'asset';
    }
    exports_1("isStyleUrlResolvable", isStyleUrlResolvable);
    /**
     * Rewrites stylesheets by resolving and removing the @import urls that
     * are either relative or don't have a `package:` scheme
     */
    function extractStyleUrls(resolver, baseUrl, cssText) {
        var foundUrls = [];
        var modifiedCssText = lang_1.StringWrapper.replaceAllMapped(cssText, _cssImportRe, function (m) {
            var url = lang_1.isPresent(m[1]) ? m[1] : m[2];
            if (!isStyleUrlResolvable(url)) {
                // Do not attempt to resolve non-package absolute URLs with URI scheme
                return m[0];
            }
            foundUrls.push(resolver.resolve(baseUrl, url));
            return '';
        });
        return new StyleWithImports(modifiedCssText, foundUrls);
    }
    exports_1("extractStyleUrls", extractStyleUrls);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            StyleWithImports = (function () {
                function StyleWithImports(style, styleUrls) {
                    this.style = style;
                    this.styleUrls = styleUrls;
                }
                return StyleWithImports;
            }());
            exports_1("StyleWithImports", StyleWithImports);
            _cssImportRe = /@import\s+(?:url\()?\s*(?:(?:['"]([^'"]*))|([^;\)\s]*))[^;]*;?/g;
            // TODO: can't use /^[^:/?#.]+:/g due to clang-format bug:
            //       https://github.com/angular/angular/issues/4596
            _urlWithSchemaRe = /^([a-zA-Z\-\+\.]+):/g;
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9zdHlsZV91cmxfcmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsK0NBQStDO0FBQy9DLHVGQUF1Rjs7Ozs7MEJBa0NuRixZQUFZLEVBR1osZ0JBQWdCO0lBNUJwQiw4QkFBcUMsR0FBVztRQUM5QyxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQztZQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDcEUsSUFBSSxXQUFXLEdBQUcsb0JBQWEsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbEUsTUFBTSxDQUFDLGNBQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUM7SUFDMUYsQ0FBQztJQUpELHVEQUlDLENBQUE7SUFFRDs7O09BR0c7SUFDSCwwQkFBaUMsUUFBcUIsRUFBRSxPQUFlLEVBQ3RDLE9BQWU7UUFDOUMsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksZUFBZSxHQUFHLG9CQUFhLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFDLENBQUM7WUFDNUUsSUFBSSxHQUFHLEdBQUcsZ0JBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixzRUFBc0U7Z0JBQ3RFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZCxDQUFDO1lBQ0QsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQy9DLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDWixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxJQUFJLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBYkQsK0NBYUMsQ0FBQTs7Ozs7OztZQTNCRDtnQkFDRSwwQkFBbUIsS0FBYSxFQUFTLFNBQW1CO29CQUF6QyxVQUFLLEdBQUwsS0FBSyxDQUFRO29CQUFTLGNBQVMsR0FBVCxTQUFTLENBQVU7Z0JBQUcsQ0FBQztnQkFDbEUsdUJBQUM7WUFBRCxDQUZBLEFBRUMsSUFBQTtZQUZELCtDQUVDLENBQUE7WUEyQkcsWUFBWSxHQUFHLGlFQUFpRSxDQUFDO1lBQ3JGLDBEQUEwRDtZQUMxRCx1REFBdUQ7WUFDbkQsZ0JBQWdCLEdBQUcsc0JBQXNCLENBQUMiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL3N0eWxlX3VybF9yZXNvbHZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFNvbWUgb2YgdGhlIGNvZGUgY29tZXMgZnJvbSBXZWJDb21wb25lbnRzLkpTXG4vLyBodHRwczovL2dpdGh1Yi5jb20vd2ViY29tcG9uZW50cy93ZWJjb21wb25lbnRzanMvYmxvYi9tYXN0ZXIvc3JjL0hUTUxJbXBvcnRzL3BhdGguanNcblxuaW1wb3J0IHtSZWdFeHAsIFJlZ0V4cFdyYXBwZXIsIFN0cmluZ1dyYXBwZXIsIGlzUHJlc2VudCwgaXNCbGFua30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7VXJsUmVzb2x2ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci91cmxfcmVzb2x2ZXInO1xuXG5leHBvcnQgY2xhc3MgU3R5bGVXaXRoSW1wb3J0cyB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzdHlsZTogc3RyaW5nLCBwdWJsaWMgc3R5bGVVcmxzOiBzdHJpbmdbXSkge31cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3R5bGVVcmxSZXNvbHZhYmxlKHVybDogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGlmIChpc0JsYW5rKHVybCkgfHwgdXJsLmxlbmd0aCA9PT0gMCB8fCB1cmxbMF0gPT0gJy8nKSByZXR1cm4gZmFsc2U7XG4gIHZhciBzY2hlbWVNYXRjaCA9IFJlZ0V4cFdyYXBwZXIuZmlyc3RNYXRjaChfdXJsV2l0aFNjaGVtYVJlLCB1cmwpO1xuICByZXR1cm4gaXNCbGFuayhzY2hlbWVNYXRjaCkgfHwgc2NoZW1lTWF0Y2hbMV0gPT0gJ3BhY2thZ2UnIHx8IHNjaGVtZU1hdGNoWzFdID09ICdhc3NldCc7XG59XG5cbi8qKlxuICogUmV3cml0ZXMgc3R5bGVzaGVldHMgYnkgcmVzb2x2aW5nIGFuZCByZW1vdmluZyB0aGUgQGltcG9ydCB1cmxzIHRoYXRcbiAqIGFyZSBlaXRoZXIgcmVsYXRpdmUgb3IgZG9uJ3QgaGF2ZSBhIGBwYWNrYWdlOmAgc2NoZW1lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0U3R5bGVVcmxzKHJlc29sdmVyOiBVcmxSZXNvbHZlciwgYmFzZVVybDogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzVGV4dDogc3RyaW5nKTogU3R5bGVXaXRoSW1wb3J0cyB7XG4gIHZhciBmb3VuZFVybHMgPSBbXTtcbiAgdmFyIG1vZGlmaWVkQ3NzVGV4dCA9IFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbE1hcHBlZChjc3NUZXh0LCBfY3NzSW1wb3J0UmUsIChtKSA9PiB7XG4gICAgdmFyIHVybCA9IGlzUHJlc2VudChtWzFdKSA/IG1bMV0gOiBtWzJdO1xuICAgIGlmICghaXNTdHlsZVVybFJlc29sdmFibGUodXJsKSkge1xuICAgICAgLy8gRG8gbm90IGF0dGVtcHQgdG8gcmVzb2x2ZSBub24tcGFja2FnZSBhYnNvbHV0ZSBVUkxzIHdpdGggVVJJIHNjaGVtZVxuICAgICAgcmV0dXJuIG1bMF07XG4gICAgfVxuICAgIGZvdW5kVXJscy5wdXNoKHJlc29sdmVyLnJlc29sdmUoYmFzZVVybCwgdXJsKSk7XG4gICAgcmV0dXJuICcnO1xuICB9KTtcbiAgcmV0dXJuIG5ldyBTdHlsZVdpdGhJbXBvcnRzKG1vZGlmaWVkQ3NzVGV4dCwgZm91bmRVcmxzKTtcbn1cblxudmFyIF9jc3NJbXBvcnRSZSA9IC9AaW1wb3J0XFxzKyg/OnVybFxcKCk/XFxzKig/Oig/OlsnXCJdKFteJ1wiXSopKXwoW147XFwpXFxzXSopKVteO10qOz8vZztcbi8vIFRPRE86IGNhbid0IHVzZSAvXlteOi8/Iy5dKzovZyBkdWUgdG8gY2xhbmctZm9ybWF0IGJ1Zzpcbi8vICAgICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzQ1OTZcbnZhciBfdXJsV2l0aFNjaGVtYVJlID0gL14oW2EtekEtWlxcLVxcK1xcLl0rKTovZztcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
