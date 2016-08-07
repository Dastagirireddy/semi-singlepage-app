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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2ZhY2FkZS9wcm9taXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7WUFDQTtnQkFLRTtvQkFMRixpQkFXQztvQkFMRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQUMsR0FBRyxFQUFFLEdBQUc7d0JBQ2xDLEtBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO3dCQUNuQixLQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztvQkFDcEIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQztnQkFDSCx1QkFBQztZQUFELENBWEEsQUFXQyxJQUFBO1lBWEQsK0NBV0MsQ0FBQTtZQUVEO2dCQUFBO2dCQXVDQSxDQUFDO2dCQXRDUSxzQkFBTyxHQUFkLFVBQWtCLEdBQU0sSUFBZ0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUUvRCxxQkFBTSxHQUFiLFVBQWMsR0FBUSxFQUFFLENBQUMsSUFBa0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUV4RSx5RUFBeUU7Z0JBQ3pFLHVCQUF1QjtnQkFDaEIseUJBQVUsR0FBakIsVUFBcUIsT0FBbUIsRUFDbkIsT0FBMkM7b0JBQzlELE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNoQyxDQUFDO2dCQUVNLGtCQUFHLEdBQVYsVUFBYyxRQUE0QjtvQkFDeEMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7d0JBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ3JELE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMvQixDQUFDO2dCQUVNLG1CQUFJLEdBQVgsVUFBa0IsT0FBbUIsRUFBRSxPQUF5QyxFQUM5RCxTQUEyRDtvQkFDM0UsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUMxQyxDQUFDO2dCQUVNLG1CQUFJLEdBQVgsVUFBZSxXQUFvQjtvQkFDakMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQUMsR0FBRyxFQUFFLEdBQUc7d0JBQzFCLElBQUksQ0FBQzs0QkFDSCxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzt3QkFDckIsQ0FBRTt3QkFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNYLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDVCxDQUFDO29CQUNILENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUM7Z0JBRU0sZ0NBQWlCLEdBQXhCLFVBQXlCLFdBQXNCO29CQUM3QyxjQUFjLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsV0FBVyxFQUFFLFVBQUMsQ0FBQyxJQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUM1RSxDQUFDO2dCQUVNLHdCQUFTLEdBQWhCLFVBQWlCLEdBQVEsSUFBYSxNQUFNLENBQUMsR0FBRyxZQUFZLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBRS9ELHdCQUFTLEdBQWhCLGNBQTZDLE1BQU0sQ0FBQyxJQUFJLGdCQUFnQixFQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNsRixxQkFBQztZQUFELENBdkNBLEFBdUNDLElBQUE7WUF2Q0QsMkNBdUNDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvZmFjYWRlL3Byb21pc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCBjbGFzcyBQcm9taXNlQ29tcGxldGVyPFI+IHtcbiAgcHJvbWlzZTogUHJvbWlzZTxSPjtcbiAgcmVzb2x2ZTogKHZhbHVlPzogUiB8IFByb21pc2VMaWtlPFI+KSA9PiB2b2lkO1xuICByZWplY3Q6IChlcnJvcj86IGFueSwgc3RhY2tUcmFjZT86IHN0cmluZykgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgIHRoaXMucmVzb2x2ZSA9IHJlcztcbiAgICAgIHRoaXMucmVqZWN0ID0gcmVqO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9taXNlV3JhcHBlciB7XG4gIHN0YXRpYyByZXNvbHZlPFQ+KG9iajogVCk6IFByb21pc2U8VD4geyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG9iaik7IH1cblxuICBzdGF0aWMgcmVqZWN0KG9iajogYW55LCBfKTogUHJvbWlzZTxhbnk+IHsgcmV0dXJuIFByb21pc2UucmVqZWN0KG9iaik7IH1cblxuICAvLyBOb3RlOiBXZSBjYW4ndCByZW5hbWUgdGhpcyBtZXRob2QgaW50byBgY2F0Y2hgLCBhcyB0aGlzIGlzIG5vdCBhIHZhbGlkXG4gIC8vIG1ldGhvZCBuYW1lIGluIERhcnQuXG4gIHN0YXRpYyBjYXRjaEVycm9yPFQ+KHByb21pc2U6IFByb21pc2U8VD4sXG4gICAgICAgICAgICAgICAgICAgICAgIG9uRXJyb3I6IChlcnJvcjogYW55KSA9PiBUIHwgUHJvbWlzZUxpa2U8VD4pOiBQcm9taXNlPFQ+IHtcbiAgICByZXR1cm4gcHJvbWlzZS5jYXRjaChvbkVycm9yKTtcbiAgfVxuXG4gIHN0YXRpYyBhbGw8VD4ocHJvbWlzZXM6IChUIHwgUHJvbWlzZTxUPilbXSk6IFByb21pc2U8VFtdPiB7XG4gICAgaWYgKHByb21pc2VzLmxlbmd0aCA9PSAwKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFtdKTtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICB9XG5cbiAgc3RhdGljIHRoZW48VCwgVT4ocHJvbWlzZTogUHJvbWlzZTxUPiwgc3VjY2VzczogKHZhbHVlOiBUKSA9PiBVIHwgUHJvbWlzZUxpa2U8VT4sXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdGlvbj86IChlcnJvcjogYW55LCBzdGFjaz86IGFueSkgPT4gVSB8IFByb21pc2VMaWtlPFU+KTogUHJvbWlzZTxVPiB7XG4gICAgcmV0dXJuIHByb21pc2UudGhlbihzdWNjZXNzLCByZWplY3Rpb24pO1xuICB9XG5cbiAgc3RhdGljIHdyYXA8VD4oY29tcHV0YXRpb246ICgpID0+IFQpOiBQcm9taXNlPFQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICByZXMoY29tcHV0YXRpb24oKSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJlaihlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBzY2hlZHVsZU1pY3JvdGFzayhjb21wdXRhdGlvbjogKCkgPT4gYW55KTogdm9pZCB7XG4gICAgUHJvbWlzZVdyYXBwZXIudGhlbihQcm9taXNlV3JhcHBlci5yZXNvbHZlKG51bGwpLCBjb21wdXRhdGlvbiwgKF8pID0+IHt9KTtcbiAgfVxuXG4gIHN0YXRpYyBpc1Byb21pc2Uob2JqOiBhbnkpOiBib29sZWFuIHsgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIFByb21pc2U7IH1cblxuICBzdGF0aWMgY29tcGxldGVyPFQ+KCk6IFByb21pc2VDb21wbGV0ZXI8VD4geyByZXR1cm4gbmV3IFByb21pc2VDb21wbGV0ZXI8VD4oKTsgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
