/// <reference path="../../observable.ts"/>
/// <reference path="../../concurrency/scheduler.ts" />
(function () {
    var o;
    o = o.takeWithTime(1);
    o = o.takeWithTime(100, Rx.Scheduler.default);
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvcngvdHMvY29yZS9saW5xL29ic2VydmFibGUvdGFrZXdpdGh0aW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEFBRUEsMkNBRjJDO0FBQzNDLHVEQUF1RDtBQXFCdkQsQ0FBQztJQUNHLElBQUksQ0FBd0IsQ0FBQztJQUM3QixDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0QixDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNsRCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL3J4L3RzL2NvcmUvbGlucS9vYnNlcnZhYmxlL3Rha2V3aXRodGltZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9vYnNlcnZhYmxlLnRzXCIvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2NvbmN1cnJlbmN5L3NjaGVkdWxlci50c1wiIC8+XG5tb2R1bGUgUngge1xuICAgIGV4cG9ydCBpbnRlcmZhY2UgT2JzZXJ2YWJsZTxUPiB7XG4gICAgICAgIC8qKlxuICAgICAgICAqICBUYWtlcyBlbGVtZW50cyBmb3IgdGhlIHNwZWNpZmllZCBkdXJhdGlvbiBmcm9tIHRoZSBzdGFydCBvZiB0aGUgb2JzZXJ2YWJsZSBzb3VyY2Ugc2VxdWVuY2UsIHVzaW5nIHRoZSBzcGVjaWZpZWQgc2NoZWR1bGVyIHRvIHJ1biB0aW1lcnMuXG4gICAgICAgICpcbiAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAqICAxIC0gcmVzID0gc291cmNlLnRha2VXaXRoVGltZSg1MDAwLCAgW29wdGlvbmFsIHNjaGVkdWxlcl0pO1xuICAgICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAgICAqICBUaGlzIG9wZXJhdG9yIGFjY3VtdWxhdGVzIGEgcXVldWUgd2l0aCBhIGxlbmd0aCBlbm91Z2ggdG8gc3RvcmUgZWxlbWVudHMgcmVjZWl2ZWQgZHVyaW5nIHRoZSBpbml0aWFsIGR1cmF0aW9uIHdpbmRvdy5cbiAgICAgICAgKiAgQXMgbW9yZSBlbGVtZW50cyBhcmUgcmVjZWl2ZWQsIGVsZW1lbnRzIG9sZGVyIHRoYW4gdGhlIHNwZWNpZmllZCBkdXJhdGlvbiBhcmUgdGFrZW4gZnJvbSB0aGUgcXVldWUgYW5kIHByb2R1Y2VkIG9uIHRoZVxuICAgICAgICAqICByZXN1bHQgc2VxdWVuY2UuIFRoaXMgY2F1c2VzIGVsZW1lbnRzIHRvIGJlIGRlbGF5ZWQgd2l0aCBkdXJhdGlvbi5cbiAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb24gRHVyYXRpb24gZm9yIHRha2luZyBlbGVtZW50cyBmcm9tIHRoZSBzdGFydCBvZiB0aGUgc2VxdWVuY2UuXG4gICAgICAgICogQHBhcmFtIHtTY2hlZHVsZXJ9IHNjaGVkdWxlciBTY2hlZHVsZXIgdG8gcnVuIHRoZSB0aW1lciBvbi4gSWYgbm90IHNwZWNpZmllZCwgZGVmYXVsdHMgdG8gUnguU2NoZWR1bGVyLnRpbWVvdXQuXG4gICAgICAgICogQHJldHVybnMge09ic2VydmFibGV9IEFuIG9ic2VydmFibGUgc2VxdWVuY2Ugd2l0aCB0aGUgZWxlbWVudHMgdGFrZW4gZHVyaW5nIHRoZSBzcGVjaWZpZWQgZHVyYXRpb24gZnJvbSB0aGUgc3RhcnQgb2YgdGhlIHNvdXJjZSBzZXF1ZW5jZS5cbiAgICAgICAgKi9cbiAgICAgICAgdGFrZVdpdGhUaW1lKGR1cmF0aW9uOiBudW1iZXIsIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpOiBPYnNlcnZhYmxlPFQ+O1xuICAgIH1cbn1cblxuXG4oZnVuY3Rpb24oKSB7XG4gICAgdmFyIG86IFJ4Lk9ic2VydmFibGU8bnVtYmVyPjtcbiAgICBvID0gby50YWtlV2l0aFRpbWUoMSk7XG4gICAgbyA9IG8udGFrZVdpdGhUaW1lKDEwMCwgUnguU2NoZWR1bGVyLmRlZmF1bHQpO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=