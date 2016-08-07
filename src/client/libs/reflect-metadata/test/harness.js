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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvcmVmbGVjdC1tZXRhZGF0YS90ZXN0L2hhcm5lc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBS0Esa0JBQXlCLE9BQVk7UUFDakMsSUFBSSxPQUFPLEdBQWdCLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDdEQsR0FBRyxDQUFDLENBQUMsSUFBSSxRQUFRLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDN0IsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDO29CQUNELElBQUksRUFBRSxDQUFDO29CQUNQLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNsQyxDQUNBO2dCQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ1AsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBZkQsK0JBZUMsQ0FBQTtJQUVELHNCQUE2QixPQUFvQjtRQUM3QyxHQUFHLENBQUMsQ0FBMEIsVUFBYyxFQUFkLEtBQUEsT0FBTyxDQUFDLE1BQU0sRUFBZCxjQUFjLEVBQWQsSUFBYyxDQUFDO1lBQXhDLGVBQXFCLEVBQWhCLGdCQUFRLEVBQUUsYUFBSztZQUNyQixJQUFJLFNBQU8sR0FBRyxPQUFPLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdELE9BQU8sQ0FBQyxLQUFLLENBQUksUUFBUSxrQkFBYSxTQUFTLENBQUMsQ0FBQztTQUNwRDtRQUVELElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ3hDLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ3hDLElBQUksVUFBVSxHQUFHLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFFM0MsSUFBSSxPQUFPLEdBQUcsVUFBTyxXQUFXLEdBQUcsQ0FBQyxHQUFHLFFBQVEsR0FBRyxXQUFXLG1CQUFjLFdBQVcsa0JBQWEsV0FBVyxpQkFBWSxVQUFVLE1BQUcsQ0FBQztRQUN4SSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDeEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQixDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pCLENBQUM7SUFDTCxDQUFDO0lBakJELHVDQWlCQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvcmVmbGVjdC1tZXRhZGF0YS90ZXN0L2hhcm5lc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIFRlc3RSZXN1bHRzIHtcclxuICAgIHBhc3NlZDogc3RyaW5nW107XHJcbiAgICBmYWlsZWQ6IFtzdHJpbmcsIGFueV1bXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJ1blRlc3RzKGZpeHR1cmU6IGFueSk6IFRlc3RSZXN1bHRzIHtcclxuICAgIGxldCByZXN1bHRzOiBUZXN0UmVzdWx0cyA9IHsgcGFzc2VkOiBbXSwgZmFpbGVkOiBbXSB9O1xyXG4gICAgZm9yIChsZXQgdGVzdE5hbWUgaW4gZml4dHVyZSkge1xyXG4gICAgICAgIGxldCB0ZXN0ID0gZml4dHVyZVt0ZXN0TmFtZV07XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0ZXN0ID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHRlc3QoKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdHMucGFzc2VkLnB1c2godGVzdE5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRzLmZhaWxlZC5wdXNoKFt0ZXN0TmFtZSwgZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdHM7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwcmludFJlc3VsdHMocmVzdWx0czogVGVzdFJlc3VsdHMpOiB2b2lkIHtcclxuICAgIGZvciAobGV0IFt0ZXN0TmFtZSwgZXJyb3JdIG9mIHJlc3VsdHMuZmFpbGVkKSB7XHJcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSBcInN0YWNrXCIgaW4gZXJyb3IgPyBlcnJvci5zdGFjayA6IFN0cmluZyhlcnJvcik7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgJHt0ZXN0TmFtZX0gZmFpbGVkLlxcbiR7bWVzc2FnZX1gKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcGFzc2VkQ291bnQgPSByZXN1bHRzLnBhc3NlZC5sZW5ndGg7XHJcbiAgICBsZXQgZmFpbGVkQ291bnQgPSByZXN1bHRzLmZhaWxlZC5sZW5ndGg7XHJcbiAgICBsZXQgdG90YWxDb3VudCA9IHBhc3NlZENvdW50ICsgZmFpbGVkQ291bnQ7XHJcblxyXG4gICAgbGV0IG1lc3NhZ2UgPSBgUnVuICR7ZmFpbGVkQ291bnQgPiAwID8gXCJmYWlsZWRcIiA6IFwic3VjY2VlZGVkXCIgfTogcGFzc2VkOiAke3Bhc3NlZENvdW50fSwgZmFpbGVkOiAke2ZhaWxlZENvdW50fSwgdG90YWw6ICR7dG90YWxDb3VudH0uYDtcclxuICAgIGlmIChyZXN1bHRzLmZhaWxlZC5sZW5ndGgpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
