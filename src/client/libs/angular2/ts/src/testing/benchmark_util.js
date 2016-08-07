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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3Rlc3RpbmcvYmVuY2htYXJrX3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQUtJLEdBQUc7SUFFUCx5QkFBZ0MsSUFBWTtRQUMxQyxNQUFNLENBQUMsb0JBQWEsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUZELDZDQUVDLENBQUE7SUFFRCw0QkFBbUMsSUFBWTtRQUM3QyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsa0JBQVEsRUFBRSxrQkFBZSxJQUFJLFFBQUksQ0FBQyxDQUFDO1FBQ2xFLElBQUksS0FBSyxDQUFDO1FBQ1YsSUFBSSxFQUFFLENBQUM7UUFFUCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNwQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1osSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN4QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxPQUFPLElBQUksSUFBSSxJQUFJLFVBQVUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsRSxLQUFLLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDekIsS0FBSyxDQUFDO1lBQ1IsQ0FBQztRQUNILENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sSUFBSSwwQkFBYSxDQUFDLDhDQUE0QyxJQUFNLENBQUMsQ0FBQztRQUM5RSxDQUFDO1FBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7SUFuQkQsbURBbUJDLENBQUE7SUFFRCxvQkFBMkIsUUFBZ0IsRUFBRSxRQUFrQjtRQUM3RCxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLGtCQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDL0MsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLFVBQVMsQ0FBQyxJQUFJLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUhELG1DQUdDLENBQUE7SUFFRCx3QkFBK0IsSUFBSSxFQUFFLGNBQWMsRUFBRSxRQUFRO1FBQzNELElBQUksWUFBWSxHQUFNLElBQUksU0FBSSxjQUFnQixDQUFDO1FBQy9DLGdCQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNsQyxRQUFRLEVBQUUsQ0FBQztRQUNYLGdCQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBTEQsMkNBS0MsQ0FBQTtJQUVELHVCQUE4QixJQUFZO1FBQ2xDLGdCQUFNLENBQUMsT0FBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRkQseUNBRUMsQ0FBQTtJQUVELDBCQUFpQyxJQUFZO1FBQ3JDLGdCQUFNLENBQUMsT0FBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRkQsK0NBRUMsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7OztZQTdDRyxHQUFHLEdBQUcsSUFBSSxtQ0FBaUIsRUFBRSxDQUFDIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3Rlc3RpbmcvYmVuY2htYXJrX3V0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Jyb3dzZXJEb21BZGFwdGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vYnJvd3Nlci9icm93c2VyX2FkYXB0ZXInO1xuaW1wb3J0IHtkb2N1bWVudCwgd2luZG93fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2Jyb3dzZXInO1xuaW1wb3J0IHtOdW1iZXJXcmFwcGVyLCBpc0JsYW5rfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9uLCBXcmFwcGVkRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuXG52YXIgRE9NID0gbmV3IEJyb3dzZXJEb21BZGFwdGVyKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbnRQYXJhbWV0ZXIobmFtZTogc3RyaW5nKSB7XG4gIHJldHVybiBOdW1iZXJXcmFwcGVyLnBhcnNlSW50KGdldFN0cmluZ1BhcmFtZXRlcihuYW1lKSwgMTApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RyaW5nUGFyYW1ldGVyKG5hbWU6IHN0cmluZykge1xuICB2YXIgZWxzID0gRE9NLnF1ZXJ5U2VsZWN0b3JBbGwoZG9jdW1lbnQsIGBpbnB1dFtuYW1lPVwiJHtuYW1lfVwiXWApO1xuICB2YXIgdmFsdWU7XG4gIHZhciBlbDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGVscy5sZW5ndGg7IGkrKykge1xuICAgIGVsID0gZWxzW2ldO1xuICAgIHZhciB0eXBlID0gRE9NLnR5cGUoZWwpO1xuICAgIGlmICgodHlwZSAhPSAncmFkaW8nICYmIHR5cGUgIT0gJ2NoZWNrYm94JykgfHwgRE9NLmdldENoZWNrZWQoZWwpKSB7XG4gICAgICB2YWx1ZSA9IERPTS5nZXRWYWx1ZShlbCk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAoaXNCbGFuayh2YWx1ZSkpIHtcbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgQ291bGQgbm90IGZpbmQgYW5kIGlucHV0IGZpZWxkIHdpdGggbmFtZSAke25hbWV9YCk7XG4gIH1cblxuICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5kQWN0aW9uKHNlbGVjdG9yOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICB2YXIgZWwgPSBET00ucXVlcnlTZWxlY3Rvcihkb2N1bWVudCwgc2VsZWN0b3IpO1xuICBET00ub24oZWwsICdjbGljaycsIGZ1bmN0aW9uKF8pIHsgY2FsbGJhY2soKTsgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtaWNyb0JlbmNobWFyayhuYW1lLCBpdGVyYXRpb25Db3VudCwgY2FsbGJhY2spIHtcbiAgdmFyIGR1cmF0aW9uTmFtZSA9IGAke25hbWV9LyR7aXRlcmF0aW9uQ291bnR9YDtcbiAgd2luZG93LmNvbnNvbGUudGltZShkdXJhdGlvbk5hbWUpO1xuICBjYWxsYmFjaygpO1xuICB3aW5kb3cuY29uc29sZS50aW1lRW5kKGR1cmF0aW9uTmFtZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3aW5kb3dQcm9maWxlKG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAoPGFueT53aW5kb3cuY29uc29sZSkucHJvZmlsZShuYW1lKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdpbmRvd1Byb2ZpbGVFbmQobmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICg8YW55PndpbmRvdy5jb25zb2xlKS5wcm9maWxlRW5kKG5hbWUpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
