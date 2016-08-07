/// <reference path="../../observable.ts" />
(function () {
    Rx.Observable.for(['a'], function (x) { return x; });
    Rx.Observable.forIn(['a'], function (x) { return x; });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvcngvdHMvY29yZS9saW5xL29ic2VydmFibGUvZm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEFBQ0EsNENBRDRDO0FBc0I1QyxDQUFDO0lBQ0csRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsRUFBRCxDQUFDLENBQUMsQ0FBQztJQUNqQyxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxFQUFELENBQUMsQ0FBQyxDQUFDO0FBRXZDLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvcngvdHMvY29yZS9saW5xL29ic2VydmFibGUvZm9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL29ic2VydmFibGUudHNcIiAvPlxubW9kdWxlIFJ4IHtcbiAgICBleHBvcnQgaW50ZXJmYWNlIE9ic2VydmFibGVTdGF0aWMge1xuICAgICAgICAvKipcbiAgICAgICAgKiAgQ29uY2F0ZW5hdGVzIHRoZSBvYnNlcnZhYmxlIHNlcXVlbmNlcyBvYnRhaW5lZCBieSBydW5uaW5nIHRoZSBzcGVjaWZpZWQgcmVzdWx0IHNlbGVjdG9yIGZvciBlYWNoIGVsZW1lbnQgaW4gc291cmNlLlxuICAgICAgICAqIFRoZXJlIGlzIGFuIGFsaWFzIGZvciB0aGlzIG1ldGhvZCBjYWxsZWQgJ2ZvckluJyBmb3IgYnJvd3NlcnMgPElFOVxuICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHNvdXJjZXMgQW4gYXJyYXkgb2YgdmFsdWVzIHRvIHR1cm4gaW50byBhbiBvYnNlcnZhYmxlIHNlcXVlbmNlLlxuICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc3VsdFNlbGVjdG9yIEEgZnVuY3Rpb24gdG8gYXBwbHkgdG8gZWFjaCBpdGVtIGluIHRoZSBzb3VyY2VzIGFycmF5IHRvIHR1cm4gaXQgaW50byBhbiBvYnNlcnZhYmxlIHNlcXVlbmNlLlxuICAgICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlfSBBbiBvYnNlcnZhYmxlIHNlcXVlbmNlIGZyb20gdGhlIGNvbmNhdGVuYXRlZCBvYnNlcnZhYmxlIHNlcXVlbmNlcy5cbiAgICAgICAgKi9cbiAgICAgICAgZm9yPFQsIFRSZXN1bHQ+KHNvdXJjZXM6IFRbXSwgcmVzdWx0U2VsZWN0b3I6IF9TZWxlY3RvcjxULCBUUmVzdWx0PiwgdGhpc0FyZz86IGFueSk6IE9ic2VydmFibGU8VFJlc3VsdD47XG4gICAgICAgIC8qKlxuICAgICAgICAqICBDb25jYXRlbmF0ZXMgdGhlIG9ic2VydmFibGUgc2VxdWVuY2VzIG9idGFpbmVkIGJ5IHJ1bm5pbmcgdGhlIHNwZWNpZmllZCByZXN1bHQgc2VsZWN0b3IgZm9yIGVhY2ggZWxlbWVudCBpbiBzb3VyY2UuXG4gICAgICAgICogVGhlcmUgaXMgYW4gYWxpYXMgZm9yIHRoaXMgbWV0aG9kIGNhbGxlZCAnZm9ySW4nIGZvciBicm93c2VycyA8SUU5XG4gICAgICAgICogQHBhcmFtIHtBcnJheX0gc291cmNlcyBBbiBhcnJheSBvZiB2YWx1ZXMgdG8gdHVybiBpbnRvIGFuIG9ic2VydmFibGUgc2VxdWVuY2UuXG4gICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzdWx0U2VsZWN0b3IgQSBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIGl0ZW0gaW4gdGhlIHNvdXJjZXMgYXJyYXkgdG8gdHVybiBpdCBpbnRvIGFuIG9ic2VydmFibGUgc2VxdWVuY2UuXG4gICAgICAgICogQHJldHVybnMge09ic2VydmFibGV9IEFuIG9ic2VydmFibGUgc2VxdWVuY2UgZnJvbSB0aGUgY29uY2F0ZW5hdGVkIG9ic2VydmFibGUgc2VxdWVuY2VzLlxuICAgICAgICAqL1xuICAgICAgICBmb3JJbjxULCBUUmVzdWx0Pihzb3VyY2VzOiBUW10sIHJlc3VsdFNlbGVjdG9yOiBfU2VsZWN0b3I8VCwgVFJlc3VsdD4sIHRoaXNBcmc/OiBhbnkpOiBPYnNlcnZhYmxlPFRSZXN1bHQ+O1xuICAgIH1cbn1cblxuKGZ1bmN0aW9uKCkge1xuICAgIFJ4Lk9ic2VydmFibGUuZm9yKFsnYSddLCB4ID0+IHgpO1xuICAgIFJ4Lk9ic2VydmFibGUuZm9ySW4oWydhJ10sIHggPT4geCk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9