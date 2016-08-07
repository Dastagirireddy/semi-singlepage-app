/// <reference path="../../observable.ts" />
(function () {
    var os;
    var on;
    os.concatMapObserver(function (v, i) { return Rx.Observable.just(i); }, function (e) { return Rx.Observable.just(e); }, function () { return Rx.Observable.empty(); });
    os.selectConcatObserver(function (v, i) { return Rx.Observable.just(i); }, function (e) { return Rx.Observable.just(e); }, function () { return Rx.Observable.empty(); });
    os.concatMapObserver(function (v, i) { return Rx.Observable.just(i); }, function (e) { return Rx.Observable.just(e); }, function () { return Rx.Observable.empty(); }, {});
    os.selectConcatObserver(function (v, i) { return Rx.Observable.just(i); }, function (e) { return Rx.Observable.just(e); }, function () { return Rx.Observable.empty(); }, {});
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvcngvdHMvY29yZS9saW5xL29ic2VydmFibGUvY29uY2F0bWFwb2JzZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQUFDQSw0Q0FENEM7QUF5QjVDLENBQUM7SUFDRyxJQUFJLEVBQXlCLENBQUM7SUFDOUIsSUFBSSxFQUF5QixDQUFDO0lBRTlCLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBckIsQ0FBcUIsRUFBRSxVQUFDLENBQUMsSUFBSyxPQUFBLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFyQixDQUFxQixFQUFFLGNBQU0sT0FBQSxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxFQUFyQixDQUFxQixDQUFDLENBQUM7SUFDakgsRUFBRSxDQUFDLG9CQUFvQixDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFyQixDQUFxQixFQUFFLFVBQUMsQ0FBQyxJQUFLLE9BQUEsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQXJCLENBQXFCLEVBQUUsY0FBTSxPQUFBLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEVBQXJCLENBQXFCLENBQUMsQ0FBQztJQUVwSCxFQUFFLENBQUMsaUJBQWlCLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQXJCLENBQXFCLEVBQUUsVUFBQyxDQUFDLElBQUssT0FBQSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBckIsQ0FBcUIsRUFBRSxjQUFNLE9BQUEsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsRUFBckIsQ0FBcUIsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNySCxFQUFFLENBQUMsb0JBQW9CLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQXJCLENBQXFCLEVBQUUsVUFBQyxDQUFDLElBQUssT0FBQSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBckIsQ0FBcUIsRUFBRSxjQUFNLE9BQUEsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsRUFBckIsQ0FBcUIsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUM1SCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL3J4L3RzL2NvcmUvbGlucS9vYnNlcnZhYmxlL2NvbmNhdG1hcG9ic2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL29ic2VydmFibGUudHNcIiAvPlxubW9kdWxlIFJ4IHtcbiAgICBleHBvcnQgaW50ZXJmYWNlIE9ic2VydmFibGU8VD4ge1xuICAgICAgICAvKipcbiAgICAgICAgKiBQcm9qZWN0cyBlYWNoIG5vdGlmaWNhdGlvbiBvZiBhbiBvYnNlcnZhYmxlIHNlcXVlbmNlIHRvIGFuIG9ic2VydmFibGUgc2VxdWVuY2UgYW5kIGNvbmNhdHMgdGhlIHJlc3VsdGluZyBvYnNlcnZhYmxlIHNlcXVlbmNlcyBpbnRvIG9uZSBvYnNlcnZhYmxlIHNlcXVlbmNlLlxuICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG9uTmV4dCBBIHRyYW5zZm9ybSBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIGVsZW1lbnQ7IHRoZSBzZWNvbmQgcGFyYW1ldGVyIG9mIHRoZSBmdW5jdGlvbiByZXByZXNlbnRzIHRoZSBpbmRleCBvZiB0aGUgc291cmNlIGVsZW1lbnQuXG4gICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gb25FcnJvciBBIHRyYW5zZm9ybSBmdW5jdGlvbiB0byBhcHBseSB3aGVuIGFuIGVycm9yIG9jY3VycyBpbiB0aGUgc291cmNlIHNlcXVlbmNlLlxuICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG9uQ29tcGxldGVkIEEgdHJhbnNmb3JtIGZ1bmN0aW9uIHRvIGFwcGx5IHdoZW4gdGhlIGVuZCBvZiB0aGUgc291cmNlIHNlcXVlbmNlIGlzIHJlYWNoZWQuXG4gICAgICAgICogQHBhcmFtIHtBbnl9IFt0aGlzQXJnXSBBbiBvcHRpb25hbCBcInRoaXNcIiB0byB1c2UgdG8gaW52b2tlIGVhY2ggdHJhbnNmb3JtLlxuICAgICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlfSBBbiBvYnNlcnZhYmxlIHNlcXVlbmNlIHdob3NlIGVsZW1lbnRzIGFyZSB0aGUgcmVzdWx0IG9mIGludm9raW5nIHRoZSBvbmUtdG8tbWFueSB0cmFuc2Zvcm0gZnVuY3Rpb24gY29ycmVzcG9uZGluZyB0byBlYWNoIG5vdGlmaWNhdGlvbiBpbiB0aGUgaW5wdXQgc2VxdWVuY2UuXG4gICAgICAgICovXG4gICAgICAgIGNvbmNhdE1hcE9ic2VydmVyPFQsIFRSZXN1bHQ+KG9uTmV4dDogKHZhbHVlOiBULCBpOiBudW1iZXIpID0+IE9ic2VydmFibGVPclByb21pc2U8VFJlc3VsdD4sIG9uRXJyb3I6IChlcnJvcjogYW55KSA9PiBPYnNlcnZhYmxlT3JQcm9taXNlPGFueT4sIG9uQ29tcGxldGVkOiAoKSA9PiBPYnNlcnZhYmxlT3JQcm9taXNlPGFueT4sIHRoaXNBcmc/OiBhbnkpOiBPYnNlcnZhYmxlPFRSZXN1bHQ+O1xuICAgICAgICAvKipcbiAgICAgICAgKiBQcm9qZWN0cyBlYWNoIG5vdGlmaWNhdGlvbiBvZiBhbiBvYnNlcnZhYmxlIHNlcXVlbmNlIHRvIGFuIG9ic2VydmFibGUgc2VxdWVuY2UgYW5kIGNvbmNhdHMgdGhlIHJlc3VsdGluZyBvYnNlcnZhYmxlIHNlcXVlbmNlcyBpbnRvIG9uZSBvYnNlcnZhYmxlIHNlcXVlbmNlLlxuICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG9uTmV4dCBBIHRyYW5zZm9ybSBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIGVsZW1lbnQ7IHRoZSBzZWNvbmQgcGFyYW1ldGVyIG9mIHRoZSBmdW5jdGlvbiByZXByZXNlbnRzIHRoZSBpbmRleCBvZiB0aGUgc291cmNlIGVsZW1lbnQuXG4gICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gb25FcnJvciBBIHRyYW5zZm9ybSBmdW5jdGlvbiB0byBhcHBseSB3aGVuIGFuIGVycm9yIG9jY3VycyBpbiB0aGUgc291cmNlIHNlcXVlbmNlLlxuICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG9uQ29tcGxldGVkIEEgdHJhbnNmb3JtIGZ1bmN0aW9uIHRvIGFwcGx5IHdoZW4gdGhlIGVuZCBvZiB0aGUgc291cmNlIHNlcXVlbmNlIGlzIHJlYWNoZWQuXG4gICAgICAgICogQHBhcmFtIHtBbnl9IFt0aGlzQXJnXSBBbiBvcHRpb25hbCBcInRoaXNcIiB0byB1c2UgdG8gaW52b2tlIGVhY2ggdHJhbnNmb3JtLlxuICAgICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlfSBBbiBvYnNlcnZhYmxlIHNlcXVlbmNlIHdob3NlIGVsZW1lbnRzIGFyZSB0aGUgcmVzdWx0IG9mIGludm9raW5nIHRoZSBvbmUtdG8tbWFueSB0cmFuc2Zvcm0gZnVuY3Rpb24gY29ycmVzcG9uZGluZyB0byBlYWNoIG5vdGlmaWNhdGlvbiBpbiB0aGUgaW5wdXQgc2VxdWVuY2UuXG4gICAgICAgICovXG4gICAgICAgIHNlbGVjdENvbmNhdE9ic2VydmVyPFQsIFRSZXN1bHQ+KG9uTmV4dDogKHZhbHVlOiBULCBpOiBudW1iZXIpID0+IE9ic2VydmFibGVPclByb21pc2U8VFJlc3VsdD4sIG9uRXJyb3I6IChlcnJvcjogYW55KSA9PiBPYnNlcnZhYmxlT3JQcm9taXNlPGFueT4sIG9uQ29tcGxldGVkOiAoKSA9PiBPYnNlcnZhYmxlT3JQcm9taXNlPGFueT4sIHRoaXNBcmc/OiBhbnkpOiBPYnNlcnZhYmxlPFRSZXN1bHQ+O1xuICAgIH1cbn1cblxuXG4oZnVuY3Rpb24oKSB7XG4gICAgdmFyIG9zOiBSeC5PYnNlcnZhYmxlPHN0cmluZz47XG4gICAgdmFyIG9uOiBSeC5PYnNlcnZhYmxlPG51bWJlcj47XG5cbiAgICBvcy5jb25jYXRNYXBPYnNlcnZlcigodiwgaSkgPT4gUnguT2JzZXJ2YWJsZS5qdXN0KGkpLCAoZSkgPT4gUnguT2JzZXJ2YWJsZS5qdXN0KGUpLCAoKSA9PiBSeC5PYnNlcnZhYmxlLmVtcHR5KCkpO1xuICAgIG9zLnNlbGVjdENvbmNhdE9ic2VydmVyKCh2LCBpKSA9PiBSeC5PYnNlcnZhYmxlLmp1c3QoaSksIChlKSA9PiBSeC5PYnNlcnZhYmxlLmp1c3QoZSksICgpID0+IFJ4Lk9ic2VydmFibGUuZW1wdHkoKSk7XG5cbiAgICBvcy5jb25jYXRNYXBPYnNlcnZlcigodiwgaSkgPT4gUnguT2JzZXJ2YWJsZS5qdXN0KGkpLCAoZSkgPT4gUnguT2JzZXJ2YWJsZS5qdXN0KGUpLCAoKSA9PiBSeC5PYnNlcnZhYmxlLmVtcHR5KCksIHt9KTtcbiAgICBvcy5zZWxlY3RDb25jYXRPYnNlcnZlcigodiwgaSkgPT4gUnguT2JzZXJ2YWJsZS5qdXN0KGkpLCAoZSkgPT4gUnguT2JzZXJ2YWJsZS5qdXN0KGUpLCAoKSA9PiBSeC5PYnNlcnZhYmxlLmVtcHR5KCksIHt9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9