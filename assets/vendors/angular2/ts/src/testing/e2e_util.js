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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy90ZXN0aW5nL2UyZV91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFFVyxPQUFPLEVBQ1AsQ0FBQztJQUVaLGtCQUF5QixlQUFlO1FBQ3RDLGVBQWUsQ0FBQyxPQUFPLENBQUMsVUFBUyxRQUFRLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUZELCtCQUVDLENBQUE7SUFFRDtRQUNFLDBFQUEwRTtRQUMxRSw0Q0FBNEM7UUFDNUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QixPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFTLFVBQVU7WUFDN0QsSUFBSSxXQUFXLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFTLFFBQVE7Z0JBQ25ELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUMvRCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3hDLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDdEUsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQWJELHlEQWFDLENBQUE7Ozs7Ozs7WUFwQlUscUJBQUEsT0FBTyxHQUF3QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUEsQ0FBQztZQUNqRCxlQUFBLENBQUMsR0FBc0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUMiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL3Rlc3RpbmcvZTJlX3V0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyB3ZWJkcml2ZXIgZnJvbSAnc2VsZW5pdW0td2ViZHJpdmVyJztcblxuZXhwb3J0IHZhciBicm93c2VyOiBwcm90cmFjdG9yLklCcm93c2VyID0gZ2xvYmFsWydicm93c2VyJ107XG5leHBvcnQgdmFyICQ6IGNzc1NlbGVjdG9ySGVscGVyID0gZ2xvYmFsWyckJ107XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGlja0FsbChidXR0b25TZWxlY3RvcnMpIHtcbiAgYnV0dG9uU2VsZWN0b3JzLmZvckVhY2goZnVuY3Rpb24oc2VsZWN0b3IpIHsgJChzZWxlY3RvcikuY2xpY2soKTsgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlOb0Jyb3dzZXJFcnJvcnMoKSB7XG4gIC8vIFRPRE8odGJvc2NoKTogQnVnIGluIENocm9tZURyaXZlcjogTmVlZCB0byBleGVjdXRlIGF0IGxlYXN0IG9uZSBjb21tYW5kXG4gIC8vIHNvIHRoYXQgdGhlIGJyb3dzZXIgbG9ncyBjYW4gYmUgcmVhZCBvdXQhXG4gIGJyb3dzZXIuZXhlY3V0ZVNjcmlwdCgnMSsxJyk7XG4gIGJyb3dzZXIubWFuYWdlKCkubG9ncygpLmdldCgnYnJvd3NlcicpLnRoZW4oZnVuY3Rpb24oYnJvd3NlckxvZykge1xuICAgIHZhciBmaWx0ZXJlZExvZyA9IGJyb3dzZXJMb2cuZmlsdGVyKGZ1bmN0aW9uKGxvZ0VudHJ5KSB7XG4gICAgICBpZiAobG9nRW50cnkubGV2ZWwudmFsdWUgPj0gd2ViZHJpdmVyLmxvZ2dpbmcuTGV2ZWwuSU5GTy52YWx1ZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnPj4gJyArIGxvZ0VudHJ5Lm1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGxvZ0VudHJ5LmxldmVsLnZhbHVlID4gd2ViZHJpdmVyLmxvZ2dpbmcuTGV2ZWwuV0FSTklORy52YWx1ZTtcbiAgICB9KTtcbiAgICBleHBlY3QoZmlsdGVyZWRMb2cpLnRvRXF1YWwoW10pO1xuICB9KTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
