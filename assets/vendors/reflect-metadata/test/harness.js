System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function runTests(fixture) {
        var results = { passed: [], failed: [] };
        for (var testName in fixture) {
            var test = fixture[testName];
            if (typeof test === "function") {
                try {
                    test();
                    results.passed.push(testName);
                }
                catch (e) {
                    results.failed.push([testName, e]);
                }
            }
        }
        return results;
    }
    exports_1("runTests", runTests);
    function printResults(results) {
        for (var _i = 0, _a = results.failed; _i < _a.length; _i++) {
            var _b = _a[_i], testName = _b[0], error = _b[1];
            var message_1 = "stack" in error ? error.stack : String(error);
            console.error(testName + " failed.\n" + message_1);
        }
        var passedCount = results.passed.length;
        var failedCount = results.failed.length;
        var totalCount = passedCount + failedCount;
        var message = "Run " + (failedCount > 0 ? "failed" : "succeeded") + ": passed: " + passedCount + ", failed: " + failedCount + ", total: " + totalCount + ".";
        if (results.failed.length) {
            console.error(message);
        }
        else {
            console.log(message);
        }
    }
    exports_1("printResults", printResults);
    return {
        setters:[],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3JlZmxlY3QtbWV0YWRhdGEvdGVzdC9oYXJuZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUtBLGtCQUF5QixPQUFZO1FBQ2pDLElBQUksT0FBTyxHQUFnQixFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQ3RELEdBQUcsQ0FBQyxDQUFDLElBQUksUUFBUSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzdCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQztvQkFDRCxJQUFJLEVBQUUsQ0FBQztvQkFDUCxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDbEMsQ0FDQTtnQkFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNQLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQWZELCtCQWVDLENBQUE7SUFFRCxzQkFBNkIsT0FBb0I7UUFDN0MsR0FBRyxDQUFDLENBQTBCLFVBQWMsRUFBZCxLQUFBLE9BQU8sQ0FBQyxNQUFNLEVBQWQsY0FBYyxFQUFkLElBQWMsQ0FBQztZQUF4QyxlQUFxQixFQUFoQixnQkFBUSxFQUFFLGFBQUs7WUFDckIsSUFBSSxTQUFPLEdBQUcsT0FBTyxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3RCxPQUFPLENBQUMsS0FBSyxDQUFJLFFBQVEsa0JBQWEsU0FBUyxDQUFDLENBQUM7U0FDcEQ7UUFFRCxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUN4QyxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUN4QyxJQUFJLFVBQVUsR0FBRyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBRTNDLElBQUksT0FBTyxHQUFHLFVBQU8sV0FBVyxHQUFHLENBQUMsR0FBRyxRQUFRLEdBQUcsV0FBVyxtQkFBYyxXQUFXLGtCQUFhLFdBQVcsaUJBQVksVUFBVSxNQUFHLENBQUM7UUFDeEksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0IsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QixDQUFDO0lBQ0wsQ0FBQztJQWpCRCx1Q0FpQkMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9yZWZsZWN0LW1ldGFkYXRhL3Rlc3QvaGFybmVzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgVGVzdFJlc3VsdHMge1xyXG4gICAgcGFzc2VkOiBzdHJpbmdbXTtcclxuICAgIGZhaWxlZDogW3N0cmluZywgYW55XVtdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcnVuVGVzdHMoZml4dHVyZTogYW55KTogVGVzdFJlc3VsdHMge1xyXG4gICAgbGV0IHJlc3VsdHM6IFRlc3RSZXN1bHRzID0geyBwYXNzZWQ6IFtdLCBmYWlsZWQ6IFtdIH07XHJcbiAgICBmb3IgKGxldCB0ZXN0TmFtZSBpbiBmaXh0dXJlKSB7XHJcbiAgICAgICAgbGV0IHRlc3QgPSBmaXh0dXJlW3Rlc3ROYW1lXTtcclxuICAgICAgICBpZiAodHlwZW9mIHRlc3QgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGVzdCgpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wYXNzZWQucHVzaCh0ZXN0TmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdHMuZmFpbGVkLnB1c2goW3Rlc3ROYW1lLCBlXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0cztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHByaW50UmVzdWx0cyhyZXN1bHRzOiBUZXN0UmVzdWx0cyk6IHZvaWQge1xyXG4gICAgZm9yIChsZXQgW3Rlc3ROYW1lLCBlcnJvcl0gb2YgcmVzdWx0cy5mYWlsZWQpIHtcclxuICAgICAgICBsZXQgbWVzc2FnZSA9IFwic3RhY2tcIiBpbiBlcnJvciA/IGVycm9yLnN0YWNrIDogU3RyaW5nKGVycm9yKTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGAke3Rlc3ROYW1lfSBmYWlsZWQuXFxuJHttZXNzYWdlfWApO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBwYXNzZWRDb3VudCA9IHJlc3VsdHMucGFzc2VkLmxlbmd0aDtcclxuICAgIGxldCBmYWlsZWRDb3VudCA9IHJlc3VsdHMuZmFpbGVkLmxlbmd0aDtcclxuICAgIGxldCB0b3RhbENvdW50ID0gcGFzc2VkQ291bnQgKyBmYWlsZWRDb3VudDtcclxuXHJcbiAgICBsZXQgbWVzc2FnZSA9IGBSdW4gJHtmYWlsZWRDb3VudCA+IDAgPyBcImZhaWxlZFwiIDogXCJzdWNjZWVkZWRcIiB9OiBwYXNzZWQ6ICR7cGFzc2VkQ291bnR9LCBmYWlsZWQ6ICR7ZmFpbGVkQ291bnR9LCB0b3RhbDogJHt0b3RhbENvdW50fS5gO1xyXG4gICAgaWYgKHJlc3VsdHMuZmFpbGVkLmxlbmd0aCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
