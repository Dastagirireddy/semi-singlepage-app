System.register(['rxjs/Rx', 'rxjs/operator/map'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Rx_1, map_1;
    var obs;
    return {
        setters:[
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (map_1_1) {
                map_1 = map_1_1;
            }],
        execute: function() {
            obs = new Rx_1.Observable(function (sub) {
                var i = 0;
                setInterval(function () { return sub.next(++i); }, 1000);
            });
            map_1.map.call(obs, function (i) { return (i + " seconds elapsed"); }).subscribe(function (msg) { return console.log(msg); });
        }
    }
});
// #enddocregion

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL2ZhY2FkZS90cy9hc3luYy9vYnNlcnZhYmxlX3B1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQUlJLEdBQUc7Ozs7Ozs7Ozs7WUFBSCxHQUFHLEdBQUcsSUFBSSxlQUFVLENBQVMsVUFBQyxHQUF1QjtnQkFDdkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNWLFdBQVcsQ0FBQyxjQUFNLE9BQUEsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFiLENBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUMsQ0FBQztZQUNILFNBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQUMsQ0FBUyxJQUFLLE9BQUEsQ0FBRyxDQUFDLHNCQUFrQixFQUF0QixDQUFzQixDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsR0FBVyxJQUFLLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDOzs7O0FBQ2xHLGdCQUFnQiIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9leGFtcGxlcy9mYWNhZGUvdHMvYXN5bmMvb2JzZXJ2YWJsZV9wdXJlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gI2RvY3JlZ2lvbiBPYnNlcnZhYmxlXG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmliZXJ9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3IvbWFwJztcblxudmFyIG9icyA9IG5ldyBPYnNlcnZhYmxlPG51bWJlcj4oKHN1YjogU3Vic2NyaWJlcjxudW1iZXI+KSA9PiB7XG4gIHZhciBpID0gMDtcbiAgc2V0SW50ZXJ2YWwoKCkgPT4gc3ViLm5leHQoKytpKSwgMTAwMCk7XG59KTtcbm1hcC5jYWxsKG9icywgKGk6IG51bWJlcikgPT4gYCR7aX0gc2Vjb25kcyBlbGFwc2VkYCkuc3Vic2NyaWJlKChtc2c6IHN0cmluZykgPT4gY29uc29sZS5sb2cobXNnKSk7XG4vLyAjZW5kZG9jcmVnaW9uXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
