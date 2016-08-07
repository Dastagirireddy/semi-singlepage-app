System.register(['rxjs/Rx', 'rxjs/add/operator/map'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Rx_1;
    var obs;
    return {
        setters:[
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (_1) {}],
        execute: function() {
            obs = new Rx_1.Observable(function (obs) {
                var i = 0;
                setInterval(function () { return obs.next(++i); }, 1000);
            });
            obs.map(function (i) { return (i + " seconds elapsed"); }).subscribe(function (msg) { return console.log(msg); });
        }
    }
});
// #enddocregion

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvZmFjYWRlL3RzL2FzeW5jL29ic2VydmFibGVfcGF0Y2hlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBSUksR0FBRzs7Ozs7Ozs7WUFBSCxHQUFHLEdBQUcsSUFBSSxlQUFVLENBQVMsVUFBQyxHQUFvQjtnQkFDcEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNWLFdBQVcsQ0FBQyxjQUFNLE9BQUEsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFiLENBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUMsQ0FBQztZQUNILEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFTLElBQUssT0FBQSxDQUFHLENBQUMsc0JBQWtCLEVBQXRCLENBQXNCLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFoQixDQUFnQixDQUFDLENBQUM7Ozs7QUFDbEYsZ0JBQWdCIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvZmFjYWRlL3RzL2FzeW5jL29ic2VydmFibGVfcGF0Y2hlZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vICNkb2NyZWdpb24gT2JzZXJ2YWJsZVxuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpYmVyfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcblxudmFyIG9icyA9IG5ldyBPYnNlcnZhYmxlPG51bWJlcj4oKG9iczogU3Vic2NyaWJlcjxhbnk+KSA9PiB7XG4gIHZhciBpID0gMDtcbiAgc2V0SW50ZXJ2YWwoKCkgPT4gb2JzLm5leHQoKytpKSwgMTAwMCk7XG59KTtcbm9icy5tYXAoKGk6IG51bWJlcikgPT4gYCR7aX0gc2Vjb25kcyBlbGFwc2VkYCkuc3Vic2NyaWJlKG1zZyA9PiBjb25zb2xlLmxvZyhtc2cpKTtcbi8vICNlbmRkb2NyZWdpb25cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
