System.register(['selenium-webdriver'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var webdriver;
    var browser, $;
    function clickAll(buttonSelectors) {
        buttonSelectors.forEach(function (selector) { $(selector).click(); });
    }
    exports_1("clickAll", clickAll);
    function verifyNoBrowserErrors() {
        // TODO(tbosch): Bug in ChromeDriver: Need to execute at least one command
        // so that the browser logs can be read out!
        browser.executeScript('1+1');
        browser.manage().logs().get('browser').then(function (browserLog) {
            var filteredLog = browserLog.filter(function (logEntry) {
                if (logEntry.level.value >= webdriver.logging.Level.INFO.value) {
                    console.log('>> ' + logEntry.message);
                }
                return logEntry.level.value > webdriver.logging.Level.WARNING.value;
            });
            expect(filteredLog).toEqual([]);
        });
    }
    exports_1("verifyNoBrowserErrors", verifyNoBrowserErrors);
    return {
        setters:[
            function (webdriver_1) {
                webdriver = webdriver_1;
            }],
        execute: function() {
            exports_1("browser", browser = global['browser']);
            exports_1("$", $ = global['$']);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3Rlc3RpbmcvZTJlX3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQUVXLE9BQU8sRUFDUCxDQUFDO0lBRVosa0JBQXlCLGVBQWU7UUFDdEMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxVQUFTLFFBQVEsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRkQsK0JBRUMsQ0FBQTtJQUVEO1FBQ0UsMEVBQTBFO1FBQzFFLDRDQUE0QztRQUM1QyxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVMsVUFBVTtZQUM3RCxJQUFJLFdBQVcsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQVMsUUFBUTtnQkFDbkQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDeEMsQ0FBQztnQkFDRCxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUN0RSxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBYkQseURBYUMsQ0FBQTs7Ozs7OztZQXBCVSxxQkFBQSxPQUFPLEdBQXdCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQSxDQUFDO1lBQ2pELGVBQUEsQ0FBQyxHQUFzQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQyIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy90ZXN0aW5nL2UyZV91dGlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgd2ViZHJpdmVyIGZyb20gJ3NlbGVuaXVtLXdlYmRyaXZlcic7XG5cbmV4cG9ydCB2YXIgYnJvd3NlcjogcHJvdHJhY3Rvci5JQnJvd3NlciA9IGdsb2JhbFsnYnJvd3NlciddO1xuZXhwb3J0IHZhciAkOiBjc3NTZWxlY3RvckhlbHBlciA9IGdsb2JhbFsnJCddO1xuXG5leHBvcnQgZnVuY3Rpb24gY2xpY2tBbGwoYnV0dG9uU2VsZWN0b3JzKSB7XG4gIGJ1dHRvblNlbGVjdG9ycy5mb3JFYWNoKGZ1bmN0aW9uKHNlbGVjdG9yKSB7ICQoc2VsZWN0b3IpLmNsaWNrKCk7IH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmVyaWZ5Tm9Ccm93c2VyRXJyb3JzKCkge1xuICAvLyBUT0RPKHRib3NjaCk6IEJ1ZyBpbiBDaHJvbWVEcml2ZXI6IE5lZWQgdG8gZXhlY3V0ZSBhdCBsZWFzdCBvbmUgY29tbWFuZFxuICAvLyBzbyB0aGF0IHRoZSBicm93c2VyIGxvZ3MgY2FuIGJlIHJlYWQgb3V0IVxuICBicm93c2VyLmV4ZWN1dGVTY3JpcHQoJzErMScpO1xuICBicm93c2VyLm1hbmFnZSgpLmxvZ3MoKS5nZXQoJ2Jyb3dzZXInKS50aGVuKGZ1bmN0aW9uKGJyb3dzZXJMb2cpIHtcbiAgICB2YXIgZmlsdGVyZWRMb2cgPSBicm93c2VyTG9nLmZpbHRlcihmdW5jdGlvbihsb2dFbnRyeSkge1xuICAgICAgaWYgKGxvZ0VudHJ5LmxldmVsLnZhbHVlID49IHdlYmRyaXZlci5sb2dnaW5nLkxldmVsLklORk8udmFsdWUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJz4+ICcgKyBsb2dFbnRyeS5tZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBsb2dFbnRyeS5sZXZlbC52YWx1ZSA+IHdlYmRyaXZlci5sb2dnaW5nLkxldmVsLldBUk5JTkcudmFsdWU7XG4gICAgfSk7XG4gICAgZXhwZWN0KGZpbHRlcmVkTG9nKS50b0VxdWFsKFtdKTtcbiAgfSk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
