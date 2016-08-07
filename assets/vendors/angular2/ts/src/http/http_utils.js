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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9odHRwL2h0dHBfdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQW1CYSxTQUFTO0lBZHRCLDZCQUFvQyxNQUE4QjtRQUNoRSxFQUFFLENBQUMsQ0FBQyxlQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQztZQUM1QixNQUFNLEdBQVksTUFBTztpQkFDWCxPQUFPLENBQUMsWUFBWSxFQUFFLFVBQUMsRUFBVSxFQUFFLEVBQVUsRUFBRSxFQUFVO2dCQUMvQixPQUFBLEVBQUUsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFO1lBQW5DLENBQW1DLENBQUMsQ0FBQztZQUM3RSxNQUFNLEdBQWtDLHFCQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDL0QsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDO2dCQUM3QixNQUFNLDBCQUFhLENBQ2YsMENBQXVDLGNBQWMseUJBQXFCLENBQUMsQ0FBQztRQUNwRixDQUFDO1FBQ0QsTUFBTSxDQUFnQixNQUFNLENBQUM7SUFDL0IsQ0FBQztJQVpELHFEQVlDLENBQUE7SUFJRCx3QkFBK0IsR0FBUTtRQUNyQyxFQUFFLENBQUMsQ0FBQyxhQUFhLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztRQUN6QixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pELE1BQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDaEQsQ0FBQztRQUNELE1BQU0sQ0FBQztJQUNULENBQUM7SUFSRCwyQ0FRQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7O1lBVlksdUJBQUEsU0FBUyxHQUFHLFVBQUMsTUFBYyxJQUFjLE9BQUEsQ0FBQyxNQUFNLElBQUksR0FBRyxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsRUFBL0IsQ0FBK0IsQ0FBQSxDQUFDIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9odHRwL2h0dHBfdXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzU3RyaW5nfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtSZXF1ZXN0TWV0aG9kfSBmcm9tICcuL2VudW1zJztcbmltcG9ydCB7bWFrZVR5cGVFcnJvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7UmVzcG9uc2V9IGZyb20gJy4vc3RhdGljX3Jlc3BvbnNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZU1ldGhvZE5hbWUobWV0aG9kOiBzdHJpbmcgfCBSZXF1ZXN0TWV0aG9kKTogUmVxdWVzdE1ldGhvZCB7XG4gIGlmIChpc1N0cmluZyhtZXRob2QpKSB7XG4gICAgdmFyIG9yaWdpbmFsTWV0aG9kID0gbWV0aG9kO1xuICAgIG1ldGhvZCA9ICg8c3RyaW5nPm1ldGhvZClcbiAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyhcXHcpKFxcdyopL2csIChnMDogc3RyaW5nLCBnMTogc3RyaW5nLCBnMjogc3RyaW5nKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnMS50b1VwcGVyQ2FzZSgpICsgZzIudG9Mb3dlckNhc2UoKSk7XG4gICAgbWV0aG9kID0gPG51bWJlcj4oPHtba2V5OiBzdHJpbmddOiBhbnl9PlJlcXVlc3RNZXRob2QpW21ldGhvZF07XG4gICAgaWYgKHR5cGVvZiBtZXRob2QgIT09ICdudW1iZXInKVxuICAgICAgdGhyb3cgbWFrZVR5cGVFcnJvcihcbiAgICAgICAgICBgSW52YWxpZCByZXF1ZXN0IG1ldGhvZC4gVGhlIG1ldGhvZCBcIiR7b3JpZ2luYWxNZXRob2R9XCIgaXMgbm90IHN1cHBvcnRlZC5gKTtcbiAgfVxuICByZXR1cm4gPFJlcXVlc3RNZXRob2Q+bWV0aG9kO1xufVxuXG5leHBvcnQgY29uc3QgaXNTdWNjZXNzID0gKHN0YXR1czogbnVtYmVyKTogYm9vbGVhbiA9PiAoc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDApO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVzcG9uc2VVUkwoeGhyOiBhbnkpOiBzdHJpbmcge1xuICBpZiAoJ3Jlc3BvbnNlVVJMJyBpbiB4aHIpIHtcbiAgICByZXR1cm4geGhyLnJlc3BvbnNlVVJMO1xuICB9XG4gIGlmICgvXlgtUmVxdWVzdC1VUkw6L20udGVzdCh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpKSB7XG4gICAgcmV0dXJuIHhoci5nZXRSZXNwb25zZUhlYWRlcignWC1SZXF1ZXN0LVVSTCcpO1xuICB9XG4gIHJldHVybjtcbn1cblxuZXhwb3J0IHtpc0pzT2JqZWN0fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
