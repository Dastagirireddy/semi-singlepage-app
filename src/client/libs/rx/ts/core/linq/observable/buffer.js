/// <reference path="../../observable.ts" />
(function () {
    var o;
    var open;
    var so = o.buffer(open);
    so = o.buffer(function () { return Rx.Observable.timer(100); });
    so = o.buffer(open, function () { return Rx.Observable.timer(100); });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvcngvdHMvY29yZS9saW5xL29ic2VydmFibGUvYnVmZmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEFBQ0EsNENBRDRDO0FBMkI1QyxDQUFDO0lBQ0csSUFBSSxDQUF5QixDQUFDO0lBQzlCLElBQUksSUFBNkIsQ0FBQztJQUVsQyxJQUFJLEVBQUUsR0FBNkIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsRCxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFNLE9BQUEsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQXhCLENBQXdCLENBQUMsQ0FBQztJQUM5QyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsY0FBTSxPQUFBLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUF4QixDQUF3QixDQUFDLENBQUM7QUFDeEQsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9yeC90cy9jb3JlL2xpbnEvb2JzZXJ2YWJsZS9idWZmZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vb2JzZXJ2YWJsZS50c1wiIC8+XG5tb2R1bGUgUngge1xuICAgIGV4cG9ydCBpbnRlcmZhY2UgT2JzZXJ2YWJsZTxUPiB7XG4gICAgICAgIC8qKlxuICAgICAgICAqICBQcm9qZWN0cyBlYWNoIGVsZW1lbnQgb2YgYW4gb2JzZXJ2YWJsZSBzZXF1ZW5jZSBpbnRvIHplcm8gb3IgbW9yZSBidWZmZXJzLlxuICAgICAgICAqICBAcGFyYW0ge01peGVkfSBidWZmZXJPcGVuaW5nc09yQ2xvc2luZ1NlbGVjdG9yIE9ic2VydmFibGUgc2VxdWVuY2Ugd2hvc2UgZWxlbWVudHMgZGVub3RlIHRoZSBjcmVhdGlvbiBvZiBuZXcgd2luZG93cywgb3IsIGEgZnVuY3Rpb24gaW52b2tlZCB0byBkZWZpbmUgdGhlIGJvdW5kYXJpZXMgb2YgdGhlIHByb2R1Y2VkIHdpbmRvd3MgKGEgbmV3IHdpbmRvdyBpcyBzdGFydGVkIHdoZW4gdGhlIHByZXZpb3VzIG9uZSBpcyBjbG9zZWQsIHJlc3VsdGluZyBpbiBub24tb3ZlcmxhcHBpbmcgd2luZG93cykuXG4gICAgICAgICogIEBwYXJhbSB7RnVuY3Rpb259IFtidWZmZXJDbG9zaW5nU2VsZWN0b3JdIEEgZnVuY3Rpb24gaW52b2tlZCB0byBkZWZpbmUgdGhlIGNsb3Npbmcgb2YgZWFjaCBwcm9kdWNlZCB3aW5kb3cuIElmIGEgY2xvc2luZyBzZWxlY3RvciBmdW5jdGlvbiBpcyBzcGVjaWZpZWQgZm9yIHRoZSBmaXJzdCBwYXJhbWV0ZXIsIHRoaXMgcGFyYW1ldGVyIGlzIGlnbm9yZWQuXG4gICAgICAgICogIEByZXR1cm5zIHtPYnNlcnZhYmxlfSBBbiBvYnNlcnZhYmxlIHNlcXVlbmNlIG9mIHdpbmRvd3MuXG4gICAgICAgICovXG4gICAgICAgIGJ1ZmZlcjxUQnVmZmVyT3BlbmluZz4oYnVmZmVyT3BlbmluZ3M6IE9ic2VydmFibGU8VEJ1ZmZlck9wZW5pbmc+KTogT2JzZXJ2YWJsZTxUW10+O1xuICAgICAgICAvKipcbiAgICAgICAgKiAgUHJvamVjdHMgZWFjaCBlbGVtZW50IG9mIGFuIG9ic2VydmFibGUgc2VxdWVuY2UgaW50byB6ZXJvIG9yIG1vcmUgYnVmZmVycy5cbiAgICAgICAgKiAgQHBhcmFtIHtNaXhlZH0gYnVmZmVyT3BlbmluZ3NPckNsb3NpbmdTZWxlY3RvciBPYnNlcnZhYmxlIHNlcXVlbmNlIHdob3NlIGVsZW1lbnRzIGRlbm90ZSB0aGUgY3JlYXRpb24gb2YgbmV3IHdpbmRvd3MsIG9yLCBhIGZ1bmN0aW9uIGludm9rZWQgdG8gZGVmaW5lIHRoZSBib3VuZGFyaWVzIG9mIHRoZSBwcm9kdWNlZCB3aW5kb3dzIChhIG5ldyB3aW5kb3cgaXMgc3RhcnRlZCB3aGVuIHRoZSBwcmV2aW91cyBvbmUgaXMgY2xvc2VkLCByZXN1bHRpbmcgaW4gbm9uLW92ZXJsYXBwaW5nIHdpbmRvd3MpLlxuICAgICAgICAqICBAcGFyYW0ge0Z1bmN0aW9ufSBbYnVmZmVyQ2xvc2luZ1NlbGVjdG9yXSBBIGZ1bmN0aW9uIGludm9rZWQgdG8gZGVmaW5lIHRoZSBjbG9zaW5nIG9mIGVhY2ggcHJvZHVjZWQgd2luZG93LiBJZiBhIGNsb3Npbmcgc2VsZWN0b3IgZnVuY3Rpb24gaXMgc3BlY2lmaWVkIGZvciB0aGUgZmlyc3QgcGFyYW1ldGVyLCB0aGlzIHBhcmFtZXRlciBpcyBpZ25vcmVkLlxuICAgICAgICAqICBAcmV0dXJucyB7T2JzZXJ2YWJsZX0gQW4gb2JzZXJ2YWJsZSBzZXF1ZW5jZSBvZiB3aW5kb3dzLlxuICAgICAgICAqL1xuICAgICAgICBidWZmZXI8VEJ1ZmZlckNsb3Npbmc+KGJ1ZmZlckNsb3NpbmdTZWxlY3RvcjogKCkgPT4gT2JzZXJ2YWJsZTxUQnVmZmVyQ2xvc2luZz4pOiBPYnNlcnZhYmxlPFRbXT47XG4gICAgICAgIC8qKlxuICAgICAgICAqICBQcm9qZWN0cyBlYWNoIGVsZW1lbnQgb2YgYW4gb2JzZXJ2YWJsZSBzZXF1ZW5jZSBpbnRvIHplcm8gb3IgbW9yZSBidWZmZXJzLlxuICAgICAgICAqICBAcGFyYW0ge01peGVkfSBidWZmZXJPcGVuaW5nc09yQ2xvc2luZ1NlbGVjdG9yIE9ic2VydmFibGUgc2VxdWVuY2Ugd2hvc2UgZWxlbWVudHMgZGVub3RlIHRoZSBjcmVhdGlvbiBvZiBuZXcgd2luZG93cywgb3IsIGEgZnVuY3Rpb24gaW52b2tlZCB0byBkZWZpbmUgdGhlIGJvdW5kYXJpZXMgb2YgdGhlIHByb2R1Y2VkIHdpbmRvd3MgKGEgbmV3IHdpbmRvdyBpcyBzdGFydGVkIHdoZW4gdGhlIHByZXZpb3VzIG9uZSBpcyBjbG9zZWQsIHJlc3VsdGluZyBpbiBub24tb3ZlcmxhcHBpbmcgd2luZG93cykuXG4gICAgICAgICogIEBwYXJhbSB7RnVuY3Rpb259IFtidWZmZXJDbG9zaW5nU2VsZWN0b3JdIEEgZnVuY3Rpb24gaW52b2tlZCB0byBkZWZpbmUgdGhlIGNsb3Npbmcgb2YgZWFjaCBwcm9kdWNlZCB3aW5kb3cuIElmIGEgY2xvc2luZyBzZWxlY3RvciBmdW5jdGlvbiBpcyBzcGVjaWZpZWQgZm9yIHRoZSBmaXJzdCBwYXJhbWV0ZXIsIHRoaXMgcGFyYW1ldGVyIGlzIGlnbm9yZWQuXG4gICAgICAgICogIEByZXR1cm5zIHtPYnNlcnZhYmxlfSBBbiBvYnNlcnZhYmxlIHNlcXVlbmNlIG9mIHdpbmRvd3MuXG4gICAgICAgICovXG4gICAgICAgIGJ1ZmZlcjxUQnVmZmVyT3BlbmluZywgVEJ1ZmZlckNsb3Npbmc+KGJ1ZmZlck9wZW5pbmdzOiBPYnNlcnZhYmxlPFRCdWZmZXJPcGVuaW5nPiwgYnVmZmVyQ2xvc2luZ1NlbGVjdG9yOiAoKSA9PiBPYnNlcnZhYmxlPFRCdWZmZXJDbG9zaW5nPik6IE9ic2VydmFibGU8VFtdPjtcbiAgICB9XG59XG5cbihmdW5jdGlvbigpIHtcbiAgICB2YXIgbyA6IFJ4Lk9ic2VydmFibGU8c3RyaW5nPjtcbiAgICB2YXIgb3BlbiA6IFJ4Lk9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgICB2YXIgc28gOiBSeC5PYnNlcnZhYmxlPHN0cmluZ1tdPiA9IG8uYnVmZmVyKG9wZW4pO1xuICAgIHNvID0gby5idWZmZXIoKCkgPT4gUnguT2JzZXJ2YWJsZS50aW1lcigxMDApKTtcbiAgICBzbyA9IG8uYnVmZmVyKG9wZW4sICgpID0+IFJ4Lk9ic2VydmFibGUudGltZXIoMTAwKSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==