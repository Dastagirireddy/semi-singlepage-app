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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL2ZhY2FkZS90cy9hc3luYy9vYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFFSSxHQUFHOzs7Ozs7O1lBQUgsR0FBRyxHQUFHLElBQUksZUFBVSxDQUFTLFVBQUMsR0FBdUI7Z0JBQ3ZELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDVixXQUFXLENBQUMsY0FBUSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDOUMsQ0FBQyxDQUFDLENBQUM7WUFDSCxHQUFHLENBQUMsU0FBUyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBSSxDQUFDLHFCQUFrQixDQUFDLEVBQW5DLENBQW1DLENBQUMsQ0FBQzs7OztBQUN4RCxnQkFBZ0IiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvZmFjYWRlL3RzL2FzeW5jL29ic2VydmFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAjZG9jcmVnaW9uIE9ic2VydmFibGVcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaWJlcn0gZnJvbSAncnhqcy9SeCc7XG52YXIgb2JzID0gbmV3IE9ic2VydmFibGU8bnVtYmVyPigob2JzOiBTdWJzY3JpYmVyPG51bWJlcj4pID0+IHtcbiAgdmFyIGkgPSAwO1xuICBzZXRJbnRlcnZhbCgoKSA9PiB7IG9icy5uZXh0KCsraSk7IH0sIDEwMDApO1xufSk7XG5vYnMuc3Vic2NyaWJlKGkgPT4gY29uc29sZS5sb2coYCR7aX0gc2Vjb25kcyBlbGFwc2VkYCkpO1xuLy8gI2VuZGRvY3JlZ2lvblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
