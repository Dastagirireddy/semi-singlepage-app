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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvZmFjYWRlL3RzL2FzeW5jL29ic2VydmFibGVfcHVyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBSUksR0FBRzs7Ozs7Ozs7OztZQUFILEdBQUcsR0FBRyxJQUFJLGVBQVUsQ0FBUyxVQUFDLEdBQXVCO2dCQUN2RCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ1YsV0FBVyxDQUFDLGNBQU0sT0FBQSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQWIsQ0FBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsU0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBQyxDQUFTLElBQUssT0FBQSxDQUFHLENBQUMsc0JBQWtCLEVBQXRCLENBQXNCLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFXLElBQUssT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFoQixDQUFnQixDQUFDLENBQUM7Ozs7QUFDbEcsZ0JBQWdCIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvZmFjYWRlL3RzL2FzeW5jL29ic2VydmFibGVfcHVyZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vICNkb2NyZWdpb24gT2JzZXJ2YWJsZVxuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpYmVyfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7bWFwfSBmcm9tICdyeGpzL29wZXJhdG9yL21hcCc7XG5cbnZhciBvYnMgPSBuZXcgT2JzZXJ2YWJsZTxudW1iZXI+KChzdWI6IFN1YnNjcmliZXI8bnVtYmVyPikgPT4ge1xuICB2YXIgaSA9IDA7XG4gIHNldEludGVydmFsKCgpID0+IHN1Yi5uZXh0KCsraSksIDEwMDApO1xufSk7XG5tYXAuY2FsbChvYnMsIChpOiBudW1iZXIpID0+IGAke2l9IHNlY29uZHMgZWxhcHNlZGApLnN1YnNjcmliZSgobXNnOiBzdHJpbmcpID0+IGNvbnNvbGUubG9nKG1zZykpO1xuLy8gI2VuZGRvY3JlZ2lvblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
