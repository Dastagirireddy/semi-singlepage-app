/// <reference path="../../observable.ts" />
(function () {
    var a;
    var b;
    a = a.forkJoin(b, function (a, b) { return a; });
    b = a.forkJoin(b, function (a, b) { return b; });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvcngvdHMvY29yZS9saW5xL29ic2VydmFibGUvZm9ya2pvaW5wcm90by50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxBQUNBLDRDQUQ0QztBQWM1QyxDQUFDO0lBQ0csSUFBSSxDQUF5QixDQUFDO0lBQzlCLElBQUksQ0FBeUIsQ0FBQztJQUM5QixDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxFQUFELENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLEVBQUQsQ0FBQyxDQUFDLENBQUM7QUFDbkMsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9yeC90cy9jb3JlL2xpbnEvb2JzZXJ2YWJsZS9mb3Jram9pbnByb3RvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL29ic2VydmFibGUudHNcIiAvPlxubW9kdWxlIFJ4IHtcbiAgICBleHBvcnQgaW50ZXJmYWNlIE9ic2VydmFibGU8VD4ge1xuICAgICAgICAvKipcbiAgICAgICAgKiAgUnVucyB0d28gb2JzZXJ2YWJsZSBzZXF1ZW5jZXMgaW4gcGFyYWxsZWwgYW5kIGNvbWJpbmVzIHRoZWlyIGxhc3QgZWxlbWVuZXRzLlxuICAgICAgICAqXG4gICAgICAgICogQHBhcmFtIHtPYnNlcnZhYmxlfSBzZWNvbmQgU2Vjb25kIG9ic2VydmFibGUgc2VxdWVuY2UuXG4gICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzdWx0U2VsZWN0b3IgUmVzdWx0IHNlbGVjdG9yIGZ1bmN0aW9uIHRvIGludm9rZSB3aXRoIHRoZSBsYXN0IGVsZW1lbnRzIG9mIGJvdGggc2VxdWVuY2VzLlxuICAgICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlfSBBbiBvYnNlcnZhYmxlIHNlcXVlbmNlIHdpdGggdGhlIHJlc3VsdCBvZiBjYWxsaW5nIHRoZSBzZWxlY3RvciBmdW5jdGlvbiB3aXRoIHRoZSBsYXN0IGVsZW1lbnRzIG9mIGJvdGggaW5wdXQgc2VxdWVuY2VzLlxuICAgICAgICAqL1xuICAgICAgICBmb3JrSm9pbjxUU2Vjb25kLCBUUmVzdWx0PihzZWNvbmQ6IE9ic2VydmFibGVPclByb21pc2U8VFNlY29uZD4sIHJlc3VsdFNlbGVjdG9yOiAobGVmdDogVCwgcmlnaHQ6IFRTZWNvbmQpID0+IFRSZXN1bHQpOiBPYnNlcnZhYmxlPFRSZXN1bHQ+O1xuICAgIH1cbn1cblxuKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYSA6IFJ4Lk9ic2VydmFibGU8c3RyaW5nPjtcbiAgICB2YXIgYiA6IFJ4Lk9ic2VydmFibGU8bnVtYmVyPjtcbiAgICBhID0gYS5mb3JrSm9pbihiLCAoYSwgYikgPT4gYSk7XG4gICAgYiA9IGEuZm9ya0pvaW4oYiwgKGEsIGIpID0+IGIpO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=