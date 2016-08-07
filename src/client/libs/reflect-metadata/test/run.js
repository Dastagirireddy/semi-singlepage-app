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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvcmVmbGVjdC1tZXRhZGF0YS90ZXN0L3J1bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBR0ksT0FBTzs7Ozs7Ozs7OztZQUFQLE9BQU8sR0FBRyxrQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdCLHNCQUFZLENBQUMsT0FBTyxDQUFDLENBQUMiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9yZWZsZWN0LW1ldGFkYXRhL3Rlc3QvcnVuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcnVuVGVzdHMsIHByaW50UmVzdWx0cyB9IGZyb20gJy4vaGFybmVzcyc7XHJcbmltcG9ydCAqIGFzIHNwZWMgZnJvbSBcIi4vc3BlY1wiO1xyXG5cclxubGV0IHJlc3VsdHMgPSBydW5UZXN0cyhzcGVjKTtcclxucHJpbnRSZXN1bHRzKHJlc3VsdHMpO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
