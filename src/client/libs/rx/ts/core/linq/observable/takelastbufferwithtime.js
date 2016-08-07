/// <reference path="../../observable.ts"/>
/// <reference path="../../concurrency/scheduler.ts" />
(function () {
    var o;
    var o2;
    o2 = o.takeLastBufferWithTime(1);
    o2 = o.takeLastBufferWithTime(1, Rx.Scheduler.async);
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvcngvdHMvY29yZS9saW5xL29ic2VydmFibGUvdGFrZWxhc3RidWZmZXJ3aXRodGltZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxBQUVBLDJDQUYyQztBQUMzQyx1REFBdUQ7QUFrQnZELENBQUM7SUFDRyxJQUFJLENBQXdCLENBQUM7SUFDN0IsSUFBSSxFQUEyQixDQUFDO0lBQ2hDLEVBQUUsR0FBRyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakMsRUFBRSxHQUFHLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6RCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL3J4L3RzL2NvcmUvbGlucS9vYnNlcnZhYmxlL3Rha2VsYXN0YnVmZmVyd2l0aHRpbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vb2JzZXJ2YWJsZS50c1wiLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9jb25jdXJyZW5jeS9zY2hlZHVsZXIudHNcIiAvPlxubW9kdWxlIFJ4IHtcbiAgICBleHBvcnQgaW50ZXJmYWNlIE9ic2VydmFibGU8VD4ge1xuICAgICAgICAvKipcbiAgICAgICAgKiAgUmV0dXJucyBhbiBhcnJheSB3aXRoIHRoZSBlbGVtZW50cyB3aXRoaW4gdGhlIHNwZWNpZmllZCBkdXJhdGlvbiBmcm9tIHRoZSBlbmQgb2YgdGhlIG9ic2VydmFibGUgc291cmNlIHNlcXVlbmNlLCB1c2luZyB0aGUgc3BlY2lmaWVkIHNjaGVkdWxlciB0byBydW4gdGltZXJzLlxuICAgICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAgICAqICBUaGlzIG9wZXJhdG9yIGFjY3VtdWxhdGVzIGEgcXVldWUgd2l0aCBhIGxlbmd0aCBlbm91Z2ggdG8gc3RvcmUgZWxlbWVudHMgcmVjZWl2ZWQgZHVyaW5nIHRoZSBpbml0aWFsIGR1cmF0aW9uIHdpbmRvdy5cbiAgICAgICAgKiAgQXMgbW9yZSBlbGVtZW50cyBhcmUgcmVjZWl2ZWQsIGVsZW1lbnRzIG9sZGVyIHRoYW4gdGhlIHNwZWNpZmllZCBkdXJhdGlvbiBhcmUgdGFrZW4gZnJvbSB0aGUgcXVldWUgYW5kIHByb2R1Y2VkIG9uIHRoZVxuICAgICAgICAqICByZXN1bHQgc2VxdWVuY2UuIFRoaXMgY2F1c2VzIGVsZW1lbnRzIHRvIGJlIGRlbGF5ZWQgd2l0aCBkdXJhdGlvbi5cbiAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb24gRHVyYXRpb24gZm9yIHRha2luZyBlbGVtZW50cyBmcm9tIHRoZSBlbmQgb2YgdGhlIHNlcXVlbmNlLlxuICAgICAgICAqIEBwYXJhbSB7U2NoZWR1bGVyfSBzY2hlZHVsZXIgU2NoZWR1bGVyIHRvIHJ1biB0aGUgdGltZXIgb24uIElmIG5vdCBzcGVjaWZpZWQsIGRlZmF1bHRzIHRvIFJ4LlNjaGVkdWxlci50aW1lb3V0LlxuICAgICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlfSBBbiBvYnNlcnZhYmxlIHNlcXVlbmNlIGNvbnRhaW5pbmcgYSBzaW5nbGUgYXJyYXkgd2l0aCB0aGUgZWxlbWVudHMgdGFrZW4gZHVyaW5nIHRoZSBzcGVjaWZpZWQgZHVyYXRpb24gZnJvbSB0aGUgZW5kIG9mIHRoZSBzb3VyY2Ugc2VxdWVuY2UuXG4gICAgICAgICovXG4gICAgICAgIHRha2VMYXN0QnVmZmVyV2l0aFRpbWUoZHVyYXRpb246IG51bWJlciwgc2NoZWR1bGVyPzogSVNjaGVkdWxlcik6IE9ic2VydmFibGU8VFtdPjtcbiAgICB9XG59XG5cblxuKGZ1bmN0aW9uKCkge1xuICAgIHZhciBvOiBSeC5PYnNlcnZhYmxlPG51bWJlcj47XG4gICAgdmFyIG8yOiBSeC5PYnNlcnZhYmxlPG51bWJlcltdPjtcbiAgICBvMiA9IG8udGFrZUxhc3RCdWZmZXJXaXRoVGltZSgxKTtcbiAgICBvMiA9IG8udGFrZUxhc3RCdWZmZXJXaXRoVGltZSgxLCBSeC5TY2hlZHVsZXIuYXN5bmMpO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=