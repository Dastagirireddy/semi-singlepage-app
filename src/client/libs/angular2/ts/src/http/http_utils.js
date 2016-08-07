System.register(['angular2/src/facade/lang', './enums', 'angular2/src/facade/exceptions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, enums_1, exceptions_1;
    var isSuccess;
    function normalizeMethodName(method) {
        if (lang_1.isString(method)) {
            var originalMethod = method;
            method = method
                .replace(/(\w)(\w*)/g, function (g0, g1, g2) {
                return g1.toUpperCase() + g2.toLowerCase();
            });
            method = enums_1.RequestMethod[method];
            if (typeof method !== 'number')
                throw exceptions_1.makeTypeError("Invalid request method. The method \"" + originalMethod + "\" is not supported.");
        }
        return method;
    }
    exports_1("normalizeMethodName", normalizeMethodName);
    function getResponseURL(xhr) {
        if ('responseURL' in xhr) {
            return xhr.responseURL;
        }
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
            return xhr.getResponseHeader('X-Request-URL');
        }
        return;
    }
    exports_1("getResponseURL", getResponseURL);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
                exports_1({
                    "isJsObject": lang_1_1["isJsObject"]
                });
            },
            function (enums_1_1) {
                enums_1 = enums_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
            exports_1("isSuccess", isSuccess = function (status) { return (status >= 200 && status < 300); });
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2h0dHAvaHR0cF91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBbUJhLFNBQVM7SUFkdEIsNkJBQW9DLE1BQThCO1FBQ2hFLEVBQUUsQ0FBQyxDQUFDLGVBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDO1lBQzVCLE1BQU0sR0FBWSxNQUFPO2lCQUNYLE9BQU8sQ0FBQyxZQUFZLEVBQUUsVUFBQyxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQVU7Z0JBQy9CLE9BQUEsRUFBRSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxXQUFXLEVBQUU7WUFBbkMsQ0FBbUMsQ0FBQyxDQUFDO1lBQzdFLE1BQU0sR0FBa0MscUJBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMvRCxFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUM7Z0JBQzdCLE1BQU0sMEJBQWEsQ0FDZiwwQ0FBdUMsY0FBYyx5QkFBcUIsQ0FBQyxDQUFDO1FBQ3BGLENBQUM7UUFDRCxNQUFNLENBQWdCLE1BQU0sQ0FBQztJQUMvQixDQUFDO0lBWkQscURBWUMsQ0FBQTtJQUlELHdCQUErQixHQUFRO1FBQ3JDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO1FBQ3pCLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNoRCxDQUFDO1FBQ0QsTUFBTSxDQUFDO0lBQ1QsQ0FBQztJQVJELDJDQVFDLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7WUFWWSx1QkFBQSxTQUFTLEdBQUcsVUFBQyxNQUFjLElBQWMsT0FBQSxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxFQUEvQixDQUErQixDQUFBLENBQUMiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvaHR0cC9odHRwX3V0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc1N0cmluZ30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7UmVxdWVzdE1ldGhvZH0gZnJvbSAnLi9lbnVtcyc7XG5pbXBvcnQge21ha2VUeXBlRXJyb3J9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge1Jlc3BvbnNlfSBmcm9tICcuL3N0YXRpY19yZXNwb25zZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVNZXRob2ROYW1lKG1ldGhvZDogc3RyaW5nIHwgUmVxdWVzdE1ldGhvZCk6IFJlcXVlc3RNZXRob2Qge1xuICBpZiAoaXNTdHJpbmcobWV0aG9kKSkge1xuICAgIHZhciBvcmlnaW5hbE1ldGhvZCA9IG1ldGhvZDtcbiAgICBtZXRob2QgPSAoPHN0cmluZz5tZXRob2QpXG4gICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oXFx3KShcXHcqKS9nLCAoZzA6IHN0cmluZywgZzE6IHN0cmluZywgZzI6IHN0cmluZykgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZzEudG9VcHBlckNhc2UoKSArIGcyLnRvTG93ZXJDYXNlKCkpO1xuICAgIG1ldGhvZCA9IDxudW1iZXI+KDx7W2tleTogc3RyaW5nXTogYW55fT5SZXF1ZXN0TWV0aG9kKVttZXRob2RdO1xuICAgIGlmICh0eXBlb2YgbWV0aG9kICE9PSAnbnVtYmVyJylcbiAgICAgIHRocm93IG1ha2VUeXBlRXJyb3IoXG4gICAgICAgICAgYEludmFsaWQgcmVxdWVzdCBtZXRob2QuIFRoZSBtZXRob2QgXCIke29yaWdpbmFsTWV0aG9kfVwiIGlzIG5vdCBzdXBwb3J0ZWQuYCk7XG4gIH1cbiAgcmV0dXJuIDxSZXF1ZXN0TWV0aG9kPm1ldGhvZDtcbn1cblxuZXhwb3J0IGNvbnN0IGlzU3VjY2VzcyA9IChzdGF0dXM6IG51bWJlcik6IGJvb2xlYW4gPT4gKHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJlc3BvbnNlVVJMKHhocjogYW55KTogc3RyaW5nIHtcbiAgaWYgKCdyZXNwb25zZVVSTCcgaW4geGhyKSB7XG4gICAgcmV0dXJuIHhoci5yZXNwb25zZVVSTDtcbiAgfVxuICBpZiAoL15YLVJlcXVlc3QtVVJMOi9tLnRlc3QoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSkge1xuICAgIHJldHVybiB4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ1gtUmVxdWVzdC1VUkwnKTtcbiAgfVxuICByZXR1cm47XG59XG5cbmV4cG9ydCB7aXNKc09iamVjdH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
