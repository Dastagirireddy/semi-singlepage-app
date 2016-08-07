System.register(['angular2/src/platform/browser/browser_adapter', 'angular2/src/facade/browser', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_adapter_1, browser_1, lang_1, exceptions_1;
    var DOM;
    function getIntParameter(name) {
        return lang_1.NumberWrapper.parseInt(getStringParameter(name), 10);
    }
    exports_1("getIntParameter", getIntParameter);
    function getStringParameter(name) {
        var els = DOM.querySelectorAll(browser_1.document, "input[name=\"" + name + "\"]");
        var value;
        var el;
        for (var i = 0; i < els.length; i++) {
            el = els[i];
            var type = DOM.type(el);
            if ((type != 'radio' && type != 'checkbox') || DOM.getChecked(el)) {
                value = DOM.getValue(el);
                break;
            }
        }
        if (lang_1.isBlank(value)) {
            throw new exceptions_1.BaseException("Could not find and input field with name " + name);
        }
        return value;
    }
    exports_1("getStringParameter", getStringParameter);
    function bindAction(selector, callback) {
        var el = DOM.querySelector(browser_1.document, selector);
        DOM.on(el, 'click', function (_) { callback(); });
    }
    exports_1("bindAction", bindAction);
    function microBenchmark(name, iterationCount, callback) {
        var durationName = name + "/" + iterationCount;
        browser_1.window.console.time(durationName);
        callback();
        browser_1.window.console.timeEnd(durationName);
    }
    exports_1("microBenchmark", microBenchmark);
    function windowProfile(name) {
        browser_1.window.console.profile(name);
    }
    exports_1("windowProfile", windowProfile);
    function windowProfileEnd(name) {
        browser_1.window.console.profileEnd(name);
    }
    exports_1("windowProfileEnd", windowProfileEnd);
    return {
        setters:[
            function (browser_adapter_1_1) {
                browser_adapter_1 = browser_adapter_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
            DOM = new browser_adapter_1.BrowserDomAdapter();
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy90ZXN0aW5nL2JlbmNobWFya191dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFLSSxHQUFHO0lBRVAseUJBQWdDLElBQVk7UUFDMUMsTUFBTSxDQUFDLG9CQUFhLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFGRCw2Q0FFQyxDQUFBO0lBRUQsNEJBQW1DLElBQVk7UUFDN0MsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGtCQUFRLEVBQUUsa0JBQWUsSUFBSSxRQUFJLENBQUMsQ0FBQztRQUNsRSxJQUFJLEtBQUssQ0FBQztRQUNWLElBQUksRUFBRSxDQUFDO1FBRVAsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDcEMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNaLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDeEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksT0FBTyxJQUFJLElBQUksSUFBSSxVQUFVLENBQUMsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEUsS0FBSyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3pCLEtBQUssQ0FBQztZQUNSLENBQUM7UUFDSCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixNQUFNLElBQUksMEJBQWEsQ0FBQyw4Q0FBNEMsSUFBTSxDQUFDLENBQUM7UUFDOUUsQ0FBQztRQUVELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDO0lBbkJELG1EQW1CQyxDQUFBO0lBRUQsb0JBQTJCLFFBQWdCLEVBQUUsUUFBa0I7UUFDN0QsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxrQkFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxVQUFTLENBQUMsSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFIRCxtQ0FHQyxDQUFBO0lBRUQsd0JBQStCLElBQUksRUFBRSxjQUFjLEVBQUUsUUFBUTtRQUMzRCxJQUFJLFlBQVksR0FBTSxJQUFJLFNBQUksY0FBZ0IsQ0FBQztRQUMvQyxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEMsUUFBUSxFQUFFLENBQUM7UUFDWCxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUxELDJDQUtDLENBQUE7SUFFRCx1QkFBOEIsSUFBWTtRQUNsQyxnQkFBTSxDQUFDLE9BQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUZELHlDQUVDLENBQUE7SUFFRCwwQkFBaUMsSUFBWTtRQUNyQyxnQkFBTSxDQUFDLE9BQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUZELCtDQUVDLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7WUE3Q0csR0FBRyxHQUFHLElBQUksbUNBQWlCLEVBQUUsQ0FBQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvdGVzdGluZy9iZW5jaG1hcmtfdXRpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QnJvd3NlckRvbUFkYXB0ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9icm93c2VyL2Jyb3dzZXJfYWRhcHRlcic7XG5pbXBvcnQge2RvY3VtZW50LCB3aW5kb3d9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYnJvd3Nlcic7XG5pbXBvcnQge051bWJlcldyYXBwZXIsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb24sIFdyYXBwZWRFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5cbnZhciBET00gPSBuZXcgQnJvd3NlckRvbUFkYXB0ZXIoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEludFBhcmFtZXRlcihuYW1lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIE51bWJlcldyYXBwZXIucGFyc2VJbnQoZ2V0U3RyaW5nUGFyYW1ldGVyKG5hbWUpLCAxMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdHJpbmdQYXJhbWV0ZXIobmFtZTogc3RyaW5nKSB7XG4gIHZhciBlbHMgPSBET00ucXVlcnlTZWxlY3RvckFsbChkb2N1bWVudCwgYGlucHV0W25hbWU9XCIke25hbWV9XCJdYCk7XG4gIHZhciB2YWx1ZTtcbiAgdmFyIGVsO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgZWwgPSBlbHNbaV07XG4gICAgdmFyIHR5cGUgPSBET00udHlwZShlbCk7XG4gICAgaWYgKCh0eXBlICE9ICdyYWRpbycgJiYgdHlwZSAhPSAnY2hlY2tib3gnKSB8fCBET00uZ2V0Q2hlY2tlZChlbCkpIHtcbiAgICAgIHZhbHVlID0gRE9NLmdldFZhbHVlKGVsKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmIChpc0JsYW5rKHZhbHVlKSkge1xuICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBDb3VsZCBub3QgZmluZCBhbmQgaW5wdXQgZmllbGQgd2l0aCBuYW1lICR7bmFtZX1gKTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJpbmRBY3Rpb24oc2VsZWN0b3I6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gIHZhciBlbCA9IERPTS5xdWVyeVNlbGVjdG9yKGRvY3VtZW50LCBzZWxlY3Rvcik7XG4gIERPTS5vbihlbCwgJ2NsaWNrJywgZnVuY3Rpb24oXykgeyBjYWxsYmFjaygpOyB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1pY3JvQmVuY2htYXJrKG5hbWUsIGl0ZXJhdGlvbkNvdW50LCBjYWxsYmFjaykge1xuICB2YXIgZHVyYXRpb25OYW1lID0gYCR7bmFtZX0vJHtpdGVyYXRpb25Db3VudH1gO1xuICB3aW5kb3cuY29uc29sZS50aW1lKGR1cmF0aW9uTmFtZSk7XG4gIGNhbGxiYWNrKCk7XG4gIHdpbmRvdy5jb25zb2xlLnRpbWVFbmQoZHVyYXRpb25OYW1lKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdpbmRvd1Byb2ZpbGUobmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICg8YW55PndpbmRvdy5jb25zb2xlKS5wcm9maWxlKG5hbWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd2luZG93UHJvZmlsZUVuZChuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgKDxhbnk+d2luZG93LmNvbnNvbGUpLnByb2ZpbGVFbmQobmFtZSk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
