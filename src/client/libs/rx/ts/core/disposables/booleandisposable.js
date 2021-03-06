/// <reference path="./disposable.ts" />
var Rx;
(function (Rx) {
})(Rx || (Rx = {}));
(function () {
    var sad = new Rx.SingleAssignmentDisposable();
    sad.dispose();
    sad.isDisposed;
    var d = sad.getDisposable();
    sad.setDisposable(d);
    var sad = new Rx.SerialDisposable();
    sad.dispose();
    sad.isDisposed;
    var d = sad.getDisposable();
    sad.setDisposable(d);
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvcngvdHMvY29yZS9kaXNwb3NhYmxlcy9ib29sZWFuZGlzcG9zYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx3Q0FBd0M7QUFDeEMsSUFBTyxFQUFFLENBb0NSO0FBcENELFdBQU8sRUFBRSxFQUFDLENBQUM7QUFvQ1gsQ0FBQyxFQXBDTSxDQW1Da0QsQ0FuQ2hELEtBQUYsRUFBRSxRQW9DUjtBQUVELENBQUM7SUFDRyxJQUFJLEdBQUcsR0FBa0MsSUFBSSxFQUFFLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztJQUM3RSxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDZCxHQUFHLENBQUMsVUFBVSxDQUFDO0lBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzVCLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFckIsSUFBSSxHQUFHLEdBQXdCLElBQUksRUFBRSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDekQsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2QsR0FBRyxDQUFDLFVBQVUsQ0FBQztJQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM1QixHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pCLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvcngvdHMvY29yZS9kaXNwb3NhYmxlcy9ib29sZWFuZGlzcG9zYWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2Rpc3Bvc2FibGUudHNcIiAvPlxubW9kdWxlIFJ4IHtcbiAgICBleHBvcnQgaW50ZXJmYWNlIFNpbmdsZUFzc2lnbm1lbnREaXNwb3NhYmxlIHtcbiAgICAgICAgLyoqIFBlcmZvcm1zIHRoZSB0YXNrIG9mIGNsZWFuaW5nIHVwIHJlc291cmNlcy4gKi9cbiAgICAgICAgZGlzcG9zZSgpOiB2b2lkO1xuXG4gICAgICAgIC8qKiBJcyB0aGlzIHZhbHVlIGRpc3Bvc2VkLiAqL1xuICAgICAgICBpc0Rpc3Bvc2VkOiBib29sZWFuO1xuXG4gICAgICAgIGdldERpc3Bvc2FibGUoKTogSURpc3Bvc2FibGU7XG5cbiAgICAgICAgc2V0RGlzcG9zYWJsZSh2YWx1ZTogSURpc3Bvc2FibGUpOiB2b2lkO1xuICAgIH1cblxuICAgIGludGVyZmFjZSBTaW5nbGVBc3NpZ25tZW50RGlzcG9zYWJsZVN0YXRpYyB7XG4gICAgICAgIG5ldygpIDogU2luZ2xlQXNzaWdubWVudERpc3Bvc2FibGU7XG4gICAgfVxuXG4gICAgZXhwb3J0IHZhciBTaW5nbGVBc3NpZ25tZW50RGlzcG9zYWJsZSA6IFNpbmdsZUFzc2lnbm1lbnREaXNwb3NhYmxlU3RhdGljO1xuXG4gICAgZXhwb3J0IGludGVyZmFjZSBTZXJpYWxEaXNwb3NhYmxlIHtcbiAgICAgICAgLyoqIFBlcmZvcm1zIHRoZSB0YXNrIG9mIGNsZWFuaW5nIHVwIHJlc291cmNlcy4gKi9cbiAgICAgICAgZGlzcG9zZSgpOiB2b2lkO1xuXG4gICAgICAgIC8qKiBJcyB0aGlzIHZhbHVlIGRpc3Bvc2VkLiAqL1xuICAgICAgICBpc0Rpc3Bvc2VkOiBib29sZWFuO1xuXG4gICAgICAgIGdldERpc3Bvc2FibGUoKTogSURpc3Bvc2FibGU7XG5cbiAgICAgICAgc2V0RGlzcG9zYWJsZSh2YWx1ZTogSURpc3Bvc2FibGUpOiB2b2lkO1xuICAgIH1cblxuICAgIGludGVyZmFjZSBTZXJpYWxEaXNwb3NhYmxlU3RhdGljIHtcbiAgICAgICAgbmV3KCkgOiBTZXJpYWxEaXNwb3NhYmxlO1xuICAgIH1cblxuICAgIGV4cG9ydCB2YXIgU2VyaWFsRGlzcG9zYWJsZSA6IFNlcmlhbERpc3Bvc2FibGVTdGF0aWM7XG59XG5cbihmdW5jdGlvbigpIHtcbiAgICB2YXIgc2FkOiBSeC5TaW5nbGVBc3NpZ25tZW50RGlzcG9zYWJsZSA9IG5ldyBSeC5TaW5nbGVBc3NpZ25tZW50RGlzcG9zYWJsZSgpO1xuICAgIHNhZC5kaXNwb3NlKCk7XG4gICAgc2FkLmlzRGlzcG9zZWQ7XG4gICAgdmFyIGQgPSBzYWQuZ2V0RGlzcG9zYWJsZSgpO1xuICAgIHNhZC5zZXREaXNwb3NhYmxlKGQpO1xuICAgIFxuICAgIHZhciBzYWQ6IFJ4LlNlcmlhbERpc3Bvc2FibGUgPSBuZXcgUnguU2VyaWFsRGlzcG9zYWJsZSgpO1xuICAgIHNhZC5kaXNwb3NlKCk7XG4gICAgc2FkLmlzRGlzcG9zZWQ7XG4gICAgdmFyIGQgPSBzYWQuZ2V0RGlzcG9zYWJsZSgpO1xuICAgIHNhZC5zZXREaXNwb3NhYmxlKGQpO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
