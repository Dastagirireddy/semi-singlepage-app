System.register(['./harness', "./spec"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var harness_1, spec;
    var results;
    return {
        setters:[
            function (harness_1_1) {
                harness_1 = harness_1_1;
            },
            function (spec_1) {
                spec = spec_1;
            }],
        execute: function() {
            results = harness_1.runTests(spec);
            harness_1.printResults(results);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3JlZmxlY3QtbWV0YWRhdGEvdGVzdC9ydW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQUdJLE9BQU87Ozs7Ozs7Ozs7WUFBUCxPQUFPLEdBQUcsa0JBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QixzQkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL3JlZmxlY3QtbWV0YWRhdGEvdGVzdC9ydW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBydW5UZXN0cywgcHJpbnRSZXN1bHRzIH0gZnJvbSAnLi9oYXJuZXNzJztcclxuaW1wb3J0ICogYXMgc3BlYyBmcm9tIFwiLi9zcGVjXCI7XHJcblxyXG5sZXQgcmVzdWx0cyA9IHJ1blRlc3RzKHNwZWMpO1xyXG5wcmludFJlc3VsdHMocmVzdWx0cyk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
