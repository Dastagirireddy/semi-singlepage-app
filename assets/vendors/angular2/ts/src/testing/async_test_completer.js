System.register(['angular2/src/facade/promise'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var promise_1;
    var AsyncTestCompleter;
    return {
        setters:[
            function (promise_1_1) {
                promise_1 = promise_1_1;
            }],
        execute: function() {
            /**
             * Injectable completer that allows signaling completion of an asynchronous test. Used internally.
             */
            AsyncTestCompleter = (function () {
                function AsyncTestCompleter() {
                    this._completer = new promise_1.PromiseCompleter();
                }
                AsyncTestCompleter.prototype.done = function (value) { this._completer.resolve(value); };
                AsyncTestCompleter.prototype.fail = function (error, stackTrace) { this._completer.reject(error, stackTrace); };
                Object.defineProperty(AsyncTestCompleter.prototype, "promise", {
                    get: function () { return this._completer.promise; },
                    enumerable: true,
                    configurable: true
                });
                return AsyncTestCompleter;
            }());
            exports_1("AsyncTestCompleter", AsyncTestCompleter);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy90ZXN0aW5nL2FzeW5jX3Rlc3RfY29tcGxldGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O1lBRUE7O2VBRUc7WUFDSDtnQkFBQTtvQkFDVSxlQUFVLEdBQUcsSUFBSSwwQkFBZ0IsRUFBTyxDQUFDO2dCQU1uRCxDQUFDO2dCQUxDLGlDQUFJLEdBQUosVUFBSyxLQUFXLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVyRCxpQ0FBSSxHQUFKLFVBQUssS0FBVyxFQUFFLFVBQW1CLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFckYsc0JBQUksdUNBQU87eUJBQVgsY0FBOEIsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUNqRSx5QkFBQztZQUFELENBUEEsQUFPQyxJQUFBO1lBUEQsbURBT0MsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvdGVzdGluZy9hc3luY190ZXN0X2NvbXBsZXRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UHJvbWlzZUNvbXBsZXRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9wcm9taXNlJztcblxuLyoqXG4gKiBJbmplY3RhYmxlIGNvbXBsZXRlciB0aGF0IGFsbG93cyBzaWduYWxpbmcgY29tcGxldGlvbiBvZiBhbiBhc3luY2hyb25vdXMgdGVzdC4gVXNlZCBpbnRlcm5hbGx5LlxuICovXG5leHBvcnQgY2xhc3MgQXN5bmNUZXN0Q29tcGxldGVyIHtcbiAgcHJpdmF0ZSBfY29tcGxldGVyID0gbmV3IFByb21pc2VDb21wbGV0ZXI8YW55PigpO1xuICBkb25lKHZhbHVlPzogYW55KSB7IHRoaXMuX2NvbXBsZXRlci5yZXNvbHZlKHZhbHVlKTsgfVxuXG4gIGZhaWwoZXJyb3I/OiBhbnksIHN0YWNrVHJhY2U/OiBzdHJpbmcpIHsgdGhpcy5fY29tcGxldGVyLnJlamVjdChlcnJvciwgc3RhY2tUcmFjZSk7IH1cblxuICBnZXQgcHJvbWlzZSgpOiBQcm9taXNlPGFueT4geyByZXR1cm4gdGhpcy5fY29tcGxldGVyLnByb21pc2U7IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
