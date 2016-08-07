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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL2ZhY2FkZS90cy9hc3luYy9vYnNlcnZhYmxlX3BhdGNoZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQUlJLEdBQUc7Ozs7Ozs7O1lBQUgsR0FBRyxHQUFHLElBQUksZUFBVSxDQUFTLFVBQUMsR0FBb0I7Z0JBQ3BELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDVixXQUFXLENBQUMsY0FBTSxPQUFBLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBYixDQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUM7WUFDSCxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBUyxJQUFLLE9BQUEsQ0FBRyxDQUFDLHNCQUFrQixFQUF0QixDQUFzQixDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDOzs7O0FBQ2xGLGdCQUFnQiIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9leGFtcGxlcy9mYWNhZGUvdHMvYXN5bmMvb2JzZXJ2YWJsZV9wYXRjaGVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gI2RvY3JlZ2lvbiBPYnNlcnZhYmxlXG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmliZXJ9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xuXG52YXIgb2JzID0gbmV3IE9ic2VydmFibGU8bnVtYmVyPigob2JzOiBTdWJzY3JpYmVyPGFueT4pID0+IHtcbiAgdmFyIGkgPSAwO1xuICBzZXRJbnRlcnZhbCgoKSA9PiBvYnMubmV4dCgrK2kpLCAxMDAwKTtcbn0pO1xub2JzLm1hcCgoaTogbnVtYmVyKSA9PiBgJHtpfSBzZWNvbmRzIGVsYXBzZWRgKS5zdWJzY3JpYmUobXNnID0+IGNvbnNvbGUubG9nKG1zZykpO1xuLy8gI2VuZGRvY3JlZ2lvblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
