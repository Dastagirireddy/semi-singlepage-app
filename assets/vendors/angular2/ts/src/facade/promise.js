System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var PromiseCompleter, PromiseWrapper;
    return {
        setters:[],
        execute: function() {
            PromiseCompleter = (function () {
                function PromiseCompleter() {
                    var _this = this;
                    this.promise = new Promise(function (res, rej) {
                        _this.resolve = res;
                        _this.reject = rej;
                    });
                }
                return PromiseCompleter;
            }());
            exports_1("PromiseCompleter", PromiseCompleter);
            PromiseWrapper = (function () {
                function PromiseWrapper() {
                }
                PromiseWrapper.resolve = function (obj) { return Promise.resolve(obj); };
                PromiseWrapper.reject = function (obj, _) { return Promise.reject(obj); };
                // Note: We can't rename this method into `catch`, as this is not a valid
                // method name in Dart.
                PromiseWrapper.catchError = function (promise, onError) {
                    return promise.catch(onError);
                };
                PromiseWrapper.all = function (promises) {
                    if (promises.length == 0)
                        return Promise.resolve([]);
                    return Promise.all(promises);
                };
                PromiseWrapper.then = function (promise, success, rejection) {
                    return promise.then(success, rejection);
                };
                PromiseWrapper.wrap = function (computation) {
                    return new Promise(function (res, rej) {
                        try {
                            res(computation());
                        }
                        catch (e) {
                            rej(e);
                        }
                    });
                };
                PromiseWrapper.scheduleMicrotask = function (computation) {
                    PromiseWrapper.then(PromiseWrapper.resolve(null), computation, function (_) { });
                };
                PromiseWrapper.isPromise = function (obj) { return obj instanceof Promise; };
                PromiseWrapper.completer = function () { return new PromiseCompleter(); };
                return PromiseWrapper;
            }());
            exports_1("PromiseWrapper", PromiseWrapper);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9mYWNhZGUvcHJvbWlzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O1lBQ0E7Z0JBS0U7b0JBTEYsaUJBV0M7b0JBTEcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxVQUFDLEdBQUcsRUFBRSxHQUFHO3dCQUNsQyxLQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQzt3QkFDbkIsS0FBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7b0JBQ3BCLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUM7Z0JBQ0gsdUJBQUM7WUFBRCxDQVhBLEFBV0MsSUFBQTtZQVhELCtDQVdDLENBQUE7WUFFRDtnQkFBQTtnQkF1Q0EsQ0FBQztnQkF0Q1Esc0JBQU8sR0FBZCxVQUFrQixHQUFNLElBQWdCLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFL0QscUJBQU0sR0FBYixVQUFjLEdBQVEsRUFBRSxDQUFDLElBQWtCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFeEUseUVBQXlFO2dCQUN6RSx1QkFBdUI7Z0JBQ2hCLHlCQUFVLEdBQWpCLFVBQXFCLE9BQW1CLEVBQ25CLE9BQTJDO29CQUM5RCxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDaEMsQ0FBQztnQkFFTSxrQkFBRyxHQUFWLFVBQWMsUUFBNEI7b0JBQ3hDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNyRCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDL0IsQ0FBQztnQkFFTSxtQkFBSSxHQUFYLFVBQWtCLE9BQW1CLEVBQUUsT0FBeUMsRUFDOUQsU0FBMkQ7b0JBQzNFLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDMUMsQ0FBQztnQkFFTSxtQkFBSSxHQUFYLFVBQWUsV0FBb0I7b0JBQ2pDLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFDLEdBQUcsRUFBRSxHQUFHO3dCQUMxQixJQUFJLENBQUM7NEJBQ0gsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7d0JBQ3JCLENBQUU7d0JBQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDWCxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ1QsQ0FBQztvQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDO2dCQUVNLGdDQUFpQixHQUF4QixVQUF5QixXQUFzQjtvQkFDN0MsY0FBYyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLFdBQVcsRUFBRSxVQUFDLENBQUMsSUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDNUUsQ0FBQztnQkFFTSx3QkFBUyxHQUFoQixVQUFpQixHQUFRLElBQWEsTUFBTSxDQUFDLEdBQUcsWUFBWSxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUUvRCx3QkFBUyxHQUFoQixjQUE2QyxNQUFNLENBQUMsSUFBSSxnQkFBZ0IsRUFBSyxDQUFDLENBQUMsQ0FBQztnQkFDbEYscUJBQUM7WUFBRCxDQXZDQSxBQXVDQyxJQUFBO1lBdkNELDJDQXVDQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9mYWNhZGUvcHJvbWlzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGNsYXNzIFByb21pc2VDb21wbGV0ZXI8Uj4ge1xuICBwcm9taXNlOiBQcm9taXNlPFI+O1xuICByZXNvbHZlOiAodmFsdWU/OiBSIHwgUHJvbWlzZUxpa2U8Uj4pID0+IHZvaWQ7XG4gIHJlamVjdDogKGVycm9yPzogYW55LCBzdGFja1RyYWNlPzogc3RyaW5nKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgdGhpcy5yZXNvbHZlID0gcmVzO1xuICAgICAgdGhpcy5yZWplY3QgPSByZWo7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFByb21pc2VXcmFwcGVyIHtcbiAgc3RhdGljIHJlc29sdmU8VD4ob2JqOiBUKTogUHJvbWlzZTxUPiB7IHJldHVybiBQcm9taXNlLnJlc29sdmUob2JqKTsgfVxuXG4gIHN0YXRpYyByZWplY3Qob2JqOiBhbnksIF8pOiBQcm9taXNlPGFueT4geyByZXR1cm4gUHJvbWlzZS5yZWplY3Qob2JqKTsgfVxuXG4gIC8vIE5vdGU6IFdlIGNhbid0IHJlbmFtZSB0aGlzIG1ldGhvZCBpbnRvIGBjYXRjaGAsIGFzIHRoaXMgaXMgbm90IGEgdmFsaWRcbiAgLy8gbWV0aG9kIG5hbWUgaW4gRGFydC5cbiAgc3RhdGljIGNhdGNoRXJyb3I8VD4ocHJvbWlzZTogUHJvbWlzZTxUPixcbiAgICAgICAgICAgICAgICAgICAgICAgb25FcnJvcjogKGVycm9yOiBhbnkpID0+IFQgfCBQcm9taXNlTGlrZTxUPik6IFByb21pc2U8VD4ge1xuICAgIHJldHVybiBwcm9taXNlLmNhdGNoKG9uRXJyb3IpO1xuICB9XG5cbiAgc3RhdGljIGFsbDxUPihwcm9taXNlczogKFQgfCBQcm9taXNlPFQ+KVtdKTogUHJvbWlzZTxUW10+IHtcbiAgICBpZiAocHJvbWlzZXMubGVuZ3RoID09IDApIHJldHVybiBQcm9taXNlLnJlc29sdmUoW10pO1xuICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gIH1cblxuICBzdGF0aWMgdGhlbjxULCBVPihwcm9taXNlOiBQcm9taXNlPFQ+LCBzdWNjZXNzOiAodmFsdWU6IFQpID0+IFUgfCBQcm9taXNlTGlrZTxVPixcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0aW9uPzogKGVycm9yOiBhbnksIHN0YWNrPzogYW55KSA9PiBVIHwgUHJvbWlzZUxpa2U8VT4pOiBQcm9taXNlPFU+IHtcbiAgICByZXR1cm4gcHJvbWlzZS50aGVuKHN1Y2Nlc3MsIHJlamVjdGlvbik7XG4gIH1cblxuICBzdGF0aWMgd3JhcDxUPihjb21wdXRhdGlvbjogKCkgPT4gVCk6IFByb21pc2U8VD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcyhjb21wdXRhdGlvbigpKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmVqKGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHNjaGVkdWxlTWljcm90YXNrKGNvbXB1dGF0aW9uOiAoKSA9PiBhbnkpOiB2b2lkIHtcbiAgICBQcm9taXNlV3JhcHBlci50aGVuKFByb21pc2VXcmFwcGVyLnJlc29sdmUobnVsbCksIGNvbXB1dGF0aW9uLCAoXykgPT4ge30pO1xuICB9XG5cbiAgc3RhdGljIGlzUHJvbWlzZShvYmo6IGFueSk6IGJvb2xlYW4geyByZXR1cm4gb2JqIGluc3RhbmNlb2YgUHJvbWlzZTsgfVxuXG4gIHN0YXRpYyBjb21wbGV0ZXI8VD4oKTogUHJvbWlzZUNvbXBsZXRlcjxUPiB7IHJldHVybiBuZXcgUHJvbWlzZUNvbXBsZXRlcjxUPigpOyB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
