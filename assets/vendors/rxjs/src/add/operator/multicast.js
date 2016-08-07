System.register(['../../Observable', '../../operator/multicast'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, multicast_1;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (multicast_1_1) {
                multicast_1 = multicast_1_1;
            }],
        execute: function() {
            Observable_1.Observable.prototype.multicast = multicast_1.multicast;
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL2FkZC9vcGVyYXRvci9tdWx0aWNhc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztZQUlBLHVCQUFVLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBUSxxQkFBUyxDQUFDIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL2FkZC9vcGVyYXRvci9tdWx0aWNhc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAnLi4vLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQge211bHRpY2FzdCwgTXVsdGljYXN0U2lnbmF0dXJlfSBmcm9tICcuLi8uLi9vcGVyYXRvci9tdWx0aWNhc3QnO1xuXG5PYnNlcnZhYmxlLnByb3RvdHlwZS5tdWx0aWNhc3QgPSA8YW55Pm11bHRpY2FzdDtcblxuZGVjbGFyZSBtb2R1bGUgJy4uLy4uL09ic2VydmFibGUnIHtcbiAgaW50ZXJmYWNlIE9ic2VydmFibGU8VD4ge1xuICAgIG11bHRpY2FzdDogTXVsdGljYXN0U2lnbmF0dXJlPFQ+O1xuICB9XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
