System.register(['rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Rx_1;
    var obs;
    return {
        setters:[
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }],
        execute: function() {
            obs = new Rx_1.Observable(function (obs) {
                var i = 0;
                setInterval(function () { obs.next(++i); }, 1000);
            });
            obs.subscribe(function (i) { return console.log(i + " seconds elapsed"); });
        }
    }
});
// #enddocregion

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvZmFjYWRlL3RzL2FzeW5jL29ic2VydmFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQUVJLEdBQUc7Ozs7Ozs7WUFBSCxHQUFHLEdBQUcsSUFBSSxlQUFVLENBQVMsVUFBQyxHQUF1QjtnQkFDdkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNWLFdBQVcsQ0FBQyxjQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM5QyxDQUFDLENBQUMsQ0FBQztZQUNILEdBQUcsQ0FBQyxTQUFTLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFJLENBQUMscUJBQWtCLENBQUMsRUFBbkMsQ0FBbUMsQ0FBQyxDQUFDOzs7O0FBQ3hELGdCQUFnQiIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL2ZhY2FkZS90cy9hc3luYy9vYnNlcnZhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gI2RvY3JlZ2lvbiBPYnNlcnZhYmxlXG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmliZXJ9IGZyb20gJ3J4anMvUngnO1xudmFyIG9icyA9IG5ldyBPYnNlcnZhYmxlPG51bWJlcj4oKG9iczogU3Vic2NyaWJlcjxudW1iZXI+KSA9PiB7XG4gIHZhciBpID0gMDtcbiAgc2V0SW50ZXJ2YWwoKCkgPT4geyBvYnMubmV4dCgrK2kpOyB9LCAxMDAwKTtcbn0pO1xub2JzLnN1YnNjcmliZShpID0+IGNvbnNvbGUubG9nKGAke2l9IHNlY29uZHMgZWxhcHNlZGApKTtcbi8vICNlbmRkb2NyZWdpb25cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
