/// <reference path="../../observable.ts" />
(function () {
    var o;
    o = o.distinct();
    o = o.distinct(function (x) { return x.length; });
    o = o.distinct(function (x) { return x.length; }, function (x) { return x.toString() + '' + x; });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvcngvdHMvY29yZS9saW5xL29ic2VydmFibGUvZGlzdGluY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQUFDQSw0Q0FENEM7QUFtQjVDLENBQUM7SUFDRyxJQUFJLENBQXlCLENBQUM7SUFDOUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNqQixDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLEVBQVIsQ0FBUSxDQUFDLENBQUM7SUFDOUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsTUFBTSxFQUFSLENBQVEsRUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFyQixDQUFxQixDQUFDLENBQUM7QUFDOUQsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9yeC90cy9jb3JlL2xpbnEvb2JzZXJ2YWJsZS9kaXN0aW5jdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9vYnNlcnZhYmxlLnRzXCIgLz5cbm1vZHVsZSBSeCB7XG4gICAgZXhwb3J0IGludGVyZmFjZSBPYnNlcnZhYmxlPFQ+IHtcbiAgICAgICAgLyoqXG4gICAgICAgICogIFJldHVybnMgYW4gb2JzZXJ2YWJsZSBzZXF1ZW5jZSB0aGF0IGNvbnRhaW5zIG9ubHkgZGlzdGluY3QgZWxlbWVudHMgYWNjb3JkaW5nIHRvIHRoZSBrZXlTZWxlY3RvciBhbmQgdGhlIGNvbXBhcmVyLlxuICAgICAgICAqICBVc2FnZSBvZiB0aGlzIG9wZXJhdG9yIHNob3VsZCBiZSBjb25zaWRlcmVkIGNhcmVmdWxseSBkdWUgdG8gdGhlIG1haW50ZW5hbmNlIG9mIGFuIGludGVybmFsIGxvb2t1cCBzdHJ1Y3R1cmUgd2hpY2ggY2FuIGdyb3cgbGFyZ2UuXG4gICAgICAgICpcbiAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAqICB2YXIgcmVzID0gb2JzID0geHMuZGlzdGluY3QoKTtcbiAgICAgICAgKiAgMiAtIG9icyA9IHhzLmRpc3RpbmN0KGZ1bmN0aW9uICh4KSB7IHJldHVybiB4LmlkOyB9KTtcbiAgICAgICAgKiAgMiAtIG9icyA9IHhzLmRpc3RpbmN0KGZ1bmN0aW9uICh4KSB7IHJldHVybiB4LmlkOyB9LCBmdW5jdGlvbiAoYSxiKSB7IHJldHVybiBhID09PSBiOyB9KTtcbiAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBba2V5U2VsZWN0b3JdICBBIGZ1bmN0aW9uIHRvIGNvbXB1dGUgdGhlIGNvbXBhcmlzb24ga2V5IGZvciBlYWNoIGVsZW1lbnQuXG4gICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbXBhcmVyXSAgVXNlZCB0byBjb21wYXJlIGl0ZW1zIGluIHRoZSBjb2xsZWN0aW9uLlxuICAgICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlfSBBbiBvYnNlcnZhYmxlIHNlcXVlbmNlIG9ubHkgY29udGFpbmluZyB0aGUgZGlzdGluY3QgZWxlbWVudHMsIGJhc2VkIG9uIGEgY29tcHV0ZWQga2V5IHZhbHVlLCBmcm9tIHRoZSBzb3VyY2Ugc2VxdWVuY2UuXG4gICAgICAgICovXG4gICAgICAgIGRpc3RpbmN0PFRLZXk+KGtleVNlbGVjdG9yPzogKHZhbHVlOiBUKSA9PiBUS2V5LCBrZXlTZXJpYWxpemVyPzogKGtleTogVEtleSkgPT4gc3RyaW5nKTogT2JzZXJ2YWJsZTxUPjtcbiAgICB9XG59XG5cbihmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG8gOiBSeC5PYnNlcnZhYmxlPHN0cmluZz47XG4gICAgbyA9IG8uZGlzdGluY3QoKTtcbiAgICBvID0gby5kaXN0aW5jdCh4ID0+IHgubGVuZ3RoKTtcbiAgICBvID0gby5kaXN0aW5jdCh4ID0+IHgubGVuZ3RoLCB4ID0+IHgudG9TdHJpbmcoKSArICcnICsgeCk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==