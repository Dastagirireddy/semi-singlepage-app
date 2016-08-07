/// <reference path="./observer-lite.ts" />
var Rx;
(function (Rx) {
})(Rx || (Rx = {}));
(function () {
    var iObserver;
    var anonymousObserver;
    iObserver = anonymousObserver;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvcngvdHMvY29yZS9hbm9ueW1vdXNvYnNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwyQ0FBMkM7QUFDM0MsSUFBTyxFQUFFLENBZ0NSO0FBaENELFdBQU8sRUFBRSxFQUFDLENBQUM7QUFnQ1gsQ0FBQyxFQWhDTSxDQStCb0QsQ0EvQmxELEtBQUYsRUFBRSxRQWdDUjtBQUdELENBQUM7SUFDRyxJQUFJLFNBQStCLENBQUM7SUFDcEMsSUFBSSxpQkFBK0MsQ0FBQztJQUVwRCxTQUFTLEdBQUcsaUJBQWlCLENBQUM7QUFDbEMsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9yeC90cy9jb3JlL2Fub255bW91c29ic2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vb2JzZXJ2ZXItbGl0ZS50c1wiIC8+XG5tb2R1bGUgUngge1xuICAgIC8qKlxuICAgICAqIENsYXNzIHRvIGNyZWF0ZSBhbiBPYnNlcnZlciBpbnN0YW5jZSBmcm9tIGRlbGVnYXRlLWJhc2VkIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgb24qIG1ldGhvZHMuXG4gICAgICovXG4gICAgZXhwb3J0IGludGVyZmFjZSBBbm9ueW1vdXNPYnNlcnZlcjxUPiBleHRlbmRzIE9ic2VydmVyPFQ+IHtcbiAgICAgICAgLyoqXG4gICAgICAgICogTm90aWZpZXMgdGhlIG9ic2VydmVyIG9mIGEgbmV3IGVsZW1lbnQgaW4gdGhlIHNlcXVlbmNlLlxuICAgICAgICAqIEBwYXJhbSB7QW55fSB2YWx1ZSBOZXh0IGVsZW1lbnQgaW4gdGhlIHNlcXVlbmNlLlxuICAgICAgICAqL1xuICAgICAgICBvbk5leHQodmFsdWU6IFQpOiB2b2lkO1xuICAgICAgICAvKipcbiAgICAgICAgKiBOb3RpZmllcyB0aGUgb2JzZXJ2ZXIgdGhhdCBhbiBleGNlcHRpb24gaGFzIG9jY3VycmVkLlxuICAgICAgICAqIEBwYXJhbSB7QW55fSBlcnJvciBUaGUgZXJyb3IgdGhhdCBoYXMgb2NjdXJyZWQuXG4gICAgICAgICovXG4gICAgICAgIG9uRXJyb3IoZXhjZXB0aW9uOiBhbnkpOiB2b2lkO1xuICAgICAgICAvKipcbiAgICAgICAgKiBOb3RpZmllcyB0aGUgb2JzZXJ2ZXIgb2YgdGhlIGVuZCBvZiB0aGUgc2VxdWVuY2UuXG4gICAgICAgICovXG4gICAgICAgIG9uQ29tcGxldGVkKCk6IHZvaWQ7XG4gICAgfVxuXG4gICAgaW50ZXJmYWNlIEFub255bW91c09ic2VydmVyU3RhdGljIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgYW4gb2JzZXJ2ZXIgZnJvbSB0aGUgc3BlY2lmaWVkIE9uTmV4dCwgT25FcnJvciwgYW5kIE9uQ29tcGxldGVkIGFjdGlvbnMuXG4gICAgICAgICAqIEBwYXJhbSB7QW55fSBvbk5leHQgT2JzZXJ2ZXIncyBPbk5leHQgYWN0aW9uIGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgKiBAcGFyYW0ge0FueX0gb25FcnJvciBPYnNlcnZlcidzIE9uRXJyb3IgYWN0aW9uIGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgKiBAcGFyYW0ge0FueX0gb25Db21wbGV0ZWQgT2JzZXJ2ZXIncyBPbkNvbXBsZXRlZCBhY3Rpb24gaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAqL1xuICAgICAgICBuZXcgPFQ+KG9uTmV4dD86ICh2YWx1ZTogVCkgPT4gdm9pZCwgb25FcnJvcj86IChleGNlcHRpb246IGFueSkgPT4gdm9pZCwgb25Db21wbGV0ZWQ/OiAoKSA9PiB2b2lkKTogQW5vbnltb3VzT2JzZXJ2ZXI8VD47XG4gICAgfVxuXG4gICAgZXhwb3J0IHZhciBBbm9ueW1vdXNPYnNlcnZlciA6IEFub255bW91c09ic2VydmVyU3RhdGljO1xufVxuXG5cbihmdW5jdGlvbigpIHtcbiAgICB2YXIgaU9ic2VydmVyOiBSeC5JT2JzZXJ2ZXI8bnVtYmVyPjtcbiAgICB2YXIgYW5vbnltb3VzT2JzZXJ2ZXI6IFJ4LkFub255bW91c09ic2VydmVyPG51bWJlcj47XG5cbiAgICBpT2JzZXJ2ZXIgPSBhbm9ueW1vdXNPYnNlcnZlcjtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9