System.register(['angular2/src/facade/lang', 'angular2/src/facade/base_wrapped_exception', 'angular2/src/facade/collection'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, base_wrapped_exception_1, collection_1;
    var _ArrayLogger, ExceptionHandler;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (base_wrapped_exception_1_1) {
                base_wrapped_exception_1 = base_wrapped_exception_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            }],
        execute: function() {
            _ArrayLogger = (function () {
                function _ArrayLogger() {
                    this.res = [];
                }
                _ArrayLogger.prototype.log = function (s) { this.res.push(s); };
                _ArrayLogger.prototype.logError = function (s) { this.res.push(s); };
                _ArrayLogger.prototype.logGroup = function (s) { this.res.push(s); };
                _ArrayLogger.prototype.logGroupEnd = function () { };
                ;
                return _ArrayLogger;
            }());
            /**
             * Provides a hook for centralized exception handling.
             *
             * The default implementation of `ExceptionHandler` prints error messages to the `Console`. To
             * intercept error handling,
             * write a custom exception handler that replaces this default as appropriate for your app.
             *
             * ### Example
             *
             * ```javascript
             *
             * class MyExceptionHandler implements ExceptionHandler {
             *   call(error, stackTrace = null, reason = null) {
             *     // do something with the exception
             *   }
             * }
             *
             * bootstrap(MyApp, [provide(ExceptionHandler, {useClass: MyExceptionHandler})])
             *
             * ```
             */
            ExceptionHandler = (function () {
                function ExceptionHandler(_logger, _rethrowException) {
                    if (_rethrowException === void 0) { _rethrowException = true; }
                    this._logger = _logger;
                    this._rethrowException = _rethrowException;
                }
                ExceptionHandler.exceptionToString = function (exception, stackTrace, reason) {
                    if (stackTrace === void 0) { stackTrace = null; }
                    if (reason === void 0) { reason = null; }
                    var l = new _ArrayLogger();
                    var e = new ExceptionHandler(l, false);
                    e.call(exception, stackTrace, reason);
                    return l.res.join("\n");
                };
                ExceptionHandler.prototype.call = function (exception, stackTrace, reason) {
                    if (stackTrace === void 0) { stackTrace = null; }
                    if (reason === void 0) { reason = null; }
                    var originalException = this._findOriginalException(exception);
                    var originalStack = this._findOriginalStack(exception);
                    var context = this._findContext(exception);
                    this._logger.logGroup("EXCEPTION: " + this._extractMessage(exception));
                    if (lang_1.isPresent(stackTrace) && lang_1.isBlank(originalStack)) {
                        this._logger.logError("STACKTRACE:");
                        this._logger.logError(this._longStackTrace(stackTrace));
                    }
                    if (lang_1.isPresent(reason)) {
                        this._logger.logError("REASON: " + reason);
                    }
                    if (lang_1.isPresent(originalException)) {
                        this._logger.logError("ORIGINAL EXCEPTION: " + this._extractMessage(originalException));
                    }
                    if (lang_1.isPresent(originalStack)) {
                        this._logger.logError("ORIGINAL STACKTRACE:");
                        this._logger.logError(this._longStackTrace(originalStack));
                    }
                    if (lang_1.isPresent(context)) {
                        this._logger.logError("ERROR CONTEXT:");
                        this._logger.logError(context);
                    }
                    this._logger.logGroupEnd();
                    // We rethrow exceptions, so operations like 'bootstrap' will result in an error
                    // when an exception happens. If we do not rethrow, bootstrap will always succeed.
                    if (this._rethrowException)
                        throw exception;
                };
                /** @internal */
                ExceptionHandler.prototype._extractMessage = function (exception) {
                    return exception instanceof base_wrapped_exception_1.BaseWrappedException ? exception.wrapperMessage :
                        exception.toString();
                };
                /** @internal */
                ExceptionHandler.prototype._longStackTrace = function (stackTrace) {
                    return collection_1.isListLikeIterable(stackTrace) ? stackTrace.join("\n\n-----async gap-----\n") :
                        stackTrace.toString();
                };
                /** @internal */
                ExceptionHandler.prototype._findContext = function (exception) {
                    try {
                        if (!(exception instanceof base_wrapped_exception_1.BaseWrappedException))
                            return null;
                        return lang_1.isPresent(exception.context) ? exception.context :
                            this._findContext(exception.originalException);
                    }
                    catch (e) {
                        // exception.context can throw an exception. if it happens, we ignore the context.
                        return null;
                    }
                };
                /** @internal */
                ExceptionHandler.prototype._findOriginalException = function (exception) {
                    if (!(exception instanceof base_wrapped_exception_1.BaseWrappedException))
                        return null;
                    var e = exception.originalException;
                    while (e instanceof base_wrapped_exception_1.BaseWrappedException && lang_1.isPresent(e.originalException)) {
                        e = e.originalException;
                    }
                    return e;
                };
                /** @internal */
                ExceptionHandler.prototype._findOriginalStack = function (exception) {
                    if (!(exception instanceof base_wrapped_exception_1.BaseWrappedException))
                        return null;
                    var e = exception;
                    var stack = exception.originalStack;
                    while (e instanceof base_wrapped_exception_1.BaseWrappedException && lang_1.isPresent(e.originalException)) {
                        e = e.originalException;
                        if (e instanceof base_wrapped_exception_1.BaseWrappedException && lang_1.isPresent(e.originalException)) {
                            stack = e.originalStack;
                        }
                    }
                    return stack;
                };
                return ExceptionHandler;
            }());
            exports_1("ExceptionHandler", ExceptionHandler);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2ZhY2FkZS9leGNlcHRpb25faGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztZQUlBO2dCQUFBO29CQUNFLFFBQUcsR0FBVSxFQUFFLENBQUM7Z0JBS2xCLENBQUM7Z0JBSkMsMEJBQUcsR0FBSCxVQUFJLENBQU0sSUFBVSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLCtCQUFRLEdBQVIsVUFBUyxDQUFNLElBQVUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QywrQkFBUSxHQUFSLFVBQVMsQ0FBTSxJQUFVLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUMsa0NBQVcsR0FBWCxjQUFjLENBQUM7O2dCQUNqQixtQkFBQztZQUFELENBTkEsQUFNQyxJQUFBO1lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBb0JHO1lBQ0g7Z0JBQ0UsMEJBQW9CLE9BQVksRUFBVSxpQkFBaUM7b0JBQXpDLGlDQUF5QyxHQUF6Qyx3QkFBeUM7b0JBQXZELFlBQU8sR0FBUCxPQUFPLENBQUs7b0JBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFnQjtnQkFBRyxDQUFDO2dCQUV4RSxrQ0FBaUIsR0FBeEIsVUFBeUIsU0FBYyxFQUFFLFVBQXNCLEVBQUUsTUFBcUI7b0JBQTdDLDBCQUFzQixHQUF0QixpQkFBc0I7b0JBQUUsc0JBQXFCLEdBQXJCLGFBQXFCO29CQUNwRixJQUFJLENBQUMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO29CQUMzQixJQUFJLENBQUMsR0FBRyxJQUFJLGdCQUFnQixDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDdkMsQ0FBQyxDQUFDLElBQUks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R0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDO29CQUNwQyxPQUFPLENBQUMsWUFBWSw2Q0FBb0IsSUFBSSxnQkFBUyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUM7d0JBQzNFLENBQUMsR0FBRyxDQUFDLENBQUMsaUJBQWlCLENBQUM7d0JBQ3hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSw2Q0FBb0IsSUFBSSxnQkFBUyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDeEUsS0FBSyxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUM7d0JBQzFCLENBQUM7b0JBQ0gsQ0FBQztvQkFFRCxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNmLENBQUM7Z0JBQ0gsdUJBQUM7WUFBRCxDQWxHQSxBQWtHQyxJQUFBO1lBbEdELCtDQWtHQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2ZhY2FkZS9leGNlcHRpb25faGFuZGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNQcmVzZW50LCBpc0JsYW5rLCBwcmludH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZVdyYXBwZWRFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYmFzZV93cmFwcGVkX2V4Y2VwdGlvbic7XG5pbXBvcnQge0xpc3RXcmFwcGVyLCBpc0xpc3RMaWtlSXRlcmFibGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5cbmNsYXNzIF9BcnJheUxvZ2dlciB7XG4gIHJlczogYW55W10gPSBbXTtcbiAgbG9nKHM6IGFueSk6IHZvaWQgeyB0aGlzLnJlcy5wdXNoKHMpOyB9XG4gIGxvZ0Vycm9yKHM6IGFueSk6IHZvaWQgeyB0aGlzLnJlcy5wdXNoKHMpOyB9XG4gIGxvZ0dyb3VwKHM6IGFueSk6IHZvaWQgeyB0aGlzLnJlcy5wdXNoKHMpOyB9XG4gIGxvZ0dyb3VwRW5kKCl7fTtcbn1cblxuLyoqXG4gKiBQcm92aWRlcyBhIGhvb2sgZm9yIGNlbnRyYWxpemVkIGV4Y2VwdGlvbiBoYW5kbGluZy5cbiAqXG4gKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiBgRXhjZXB0aW9uSGFuZGxlcmAgcHJpbnRzIGVycm9yIG1lc3NhZ2VzIHRvIHRoZSBgQ29uc29sZWAuIFRvXG4gKiBpbnRlcmNlcHQgZXJyb3IgaGFuZGxpbmcsXG4gKiB3cml0ZSBhIGN1c3RvbSBleGNlcHRpb24gaGFuZGxlciB0aGF0IHJlcGxhY2VzIHRoaXMgZGVmYXVsdCBhcyBhcHByb3ByaWF0ZSBmb3IgeW91ciBhcHAuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKlxuICogY2xhc3MgTXlFeGNlcHRpb25IYW5kbGVyIGltcGxlbWVudHMgRXhjZXB0aW9uSGFuZGxlciB7XG4gKiAgIGNhbGwoZXJyb3IsIHN0YWNrVHJhY2UgPSBudWxsLCByZWFzb24gPSBudWxsKSB7XG4gKiAgICAgLy8gZG8gc29tZXRoaW5nIHdpdGggdGhlIGV4Y2VwdGlvblxuICogICB9XG4gKiB9XG4gKlxuICogYm9vdHN0cmFwKE15QXBwLCBbcHJvdmlkZShFeGNlcHRpb25IYW5kbGVyLCB7dXNlQ2xhc3M6IE15RXhjZXB0aW9uSGFuZGxlcn0pXSlcbiAqXG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNsYXNzIEV4Y2VwdGlvbkhhbmRsZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9sb2dnZXI6IGFueSwgcHJpdmF0ZSBfcmV0aHJvd0V4Y2VwdGlvbjogYm9vbGVhbiA9IHRydWUpIHt9XG5cbiAgc3RhdGljIGV4Y2VwdGlvblRvU3RyaW5nKGV4Y2VwdGlvbjogYW55LCBzdGFja1RyYWNlOiBhbnkgPSBudWxsLCByZWFzb246IHN0cmluZyA9IG51bGwpOiBzdHJpbmcge1xuICAgIHZhciBsID0gbmV3IF9BcnJheUxvZ2dlcigpO1xuICAgIHZhciBlID0gbmV3IEV4Y2VwdGlvbkhhbmRsZXIobCwgZmFsc2UpO1xuICAgIGUuY2FsbChleGNlcHRpb24sIHN0YWNrVHJhY2UsIHJlYXNvbik7XG4gICAgcmV0dXJuIGwucmVzLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICBjYWxsKGV4Y2VwdGlvbjogYW55LCBzdGFja1RyYWNlOiBhbnkgPSBudWxsLCByZWFzb246IHN0cmluZyA9IG51bGwpOiB2b2lkIHtcbiAgICB2YXIgb3JpZ2luYWxFeGNlcHRpb24gPSB0aGlzLl9maW5kT3JpZ2luYWxFeGNlcHRpb24oZXhjZXB0aW9uKTtcbiAgICB2YXIgb3JpZ2luYWxTdGFjayA9IHRoaXMuX2ZpbmRPcmlnaW5hbFN0YWNrKGV4Y2VwdGlvbik7XG4gICAgdmFyIGNvbnRleHQgPSB0aGlzLl9maW5kQ29udGV4dChleGNlcHRpb24pO1xuXG4gICAgdGhpcy5fbG9nZ2VyLmxvZ0dyb3VwKGBFWENFUFRJT046ICR7dGhpcy5fZXh0cmFjdE1lc3NhZ2UoZXhjZXB0aW9uKX1gKTtcblxuICAgIGlmIChpc1ByZXNlbnQoc3RhY2tUcmFjZSkgJiYgaXNCbGFuayhvcmlnaW5hbFN0YWNrKSkge1xuICAgICAgdGhpcy5fbG9nZ2VyLmxvZ0Vycm9yKFwiU1RBQ0tUUkFDRTpcIik7XG4gICAgICB0aGlzLl9sb2dnZXIubG9nRXJyb3IodGhpcy5fbG9uZ1N0YWNrVHJhY2Uoc3RhY2tUcmFjZSkpO1xuICAgIH1cblxuICAgIGlmIChpc1ByZXNlbnQocmVhc29uKSkge1xuICAgICAgdGhpcy5fbG9nZ2VyLmxvZ0Vycm9yKGBSRUFTT046ICR7cmVhc29ufWApO1xuICAgIH1cblxuICAgIGlmIChpc1ByZXNlbnQob3JpZ2luYWxFeGNlcHRpb24pKSB7XG4gICAgICB0aGlzLl9sb2dnZXIubG9nRXJyb3IoYE9SSUdJTkFMIEVYQ0VQVElPTjogJHt0aGlzLl9leHRyYWN0TWVzc2FnZShvcmlnaW5hbEV4Y2VwdGlvbil9YCk7XG4gICAgfVxuXG4gICAgaWYgKGlzUHJlc2VudChvcmlnaW5hbFN0YWNrKSkge1xuICAgICAgdGhpcy5fbG9nZ2VyLmxvZ0Vycm9yKFwiT1JJR0lOQUwgU1RBQ0tUUkFDRTpcIik7XG4gICAgICB0aGlzLl9sb2dnZXIubG9nRXJyb3IodGhpcy5fbG9uZ1N0YWNrVHJhY2Uob3JpZ2luYWxTdGFjaykpO1xuICAgIH1cblxuICAgIGlmIChpc1ByZXNlbnQoY29udGV4dCkpIHtcbiAgICAgIHRoaXMuX2xvZ2dlci5sb2dFcnJvcihcIkVSUk9SIENPTlRFWFQ6XCIpO1xuICAgICAgdGhpcy5fbG9nZ2VyLmxvZ0Vycm9yKGNvbnRleHQpO1xuICAgIH1cblxuICAgIHRoaXMuX2xvZ2dlci5sb2dHcm91cEVuZCgpO1xuXG4gICAgLy8gV2UgcmV0aHJvdyBleGNlcHRpb25zLCBzbyBvcGVyYXRpb25zIGxpa2UgJ2Jvb3RzdHJhcCcgd2lsbCByZXN1bHQgaW4gYW4gZXJyb3JcbiAgICAvLyB3aGVuIGFuIGV4Y2VwdGlvbiBoYXBwZW5zLiBJZiB3ZSBkbyBub3QgcmV0aHJvdywgYm9vdHN0cmFwIHdpbGwgYWx3YXlzIHN1Y2NlZWQuXG4gICAgaWYgKHRoaXMuX3JldGhyb3dFeGNlcHRpb24pIHRocm93IGV4Y2VwdGlvbjtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2V4dHJhY3RNZXNzYWdlKGV4Y2VwdGlvbjogYW55KTogc3RyaW5nIHtcbiAgICByZXR1cm4gZXhjZXB0aW9uIGluc3RhbmNlb2YgQmFzZVdyYXBwZWRFeGNlcHRpb24gPyBleGNlcHRpb24ud3JhcHBlck1lc3NhZ2UgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4Y2VwdGlvbi50b1N0cmluZygpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfbG9uZ1N0YWNrVHJhY2Uoc3RhY2tUcmFjZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gaXNMaXN0TGlrZUl0ZXJhYmxlKHN0YWNrVHJhY2UpID8gKDxhbnlbXT5zdGFja1RyYWNlKS5qb2luKFwiXFxuXFxuLS0tLS1hc3luYyBnYXAtLS0tLVxcblwiKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrVHJhY2UudG9TdHJpbmcoKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2ZpbmRDb250ZXh0KGV4Y2VwdGlvbjogYW55KTogYW55IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCEoZXhjZXB0aW9uIGluc3RhbmNlb2YgQmFzZVdyYXBwZWRFeGNlcHRpb24pKSByZXR1cm4gbnVsbDtcbiAgICAgIHJldHVybiBpc1ByZXNlbnQoZXhjZXB0aW9uLmNvbnRleHQpID8gZXhjZXB0aW9uLmNvbnRleHQgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9maW5kQ29udGV4dChleGNlcHRpb24ub3JpZ2luYWxFeGNlcHRpb24pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIGV4Y2VwdGlvbi5jb250ZXh0IGNhbiB0aHJvdyBhbiBleGNlcHRpb24uIGlmIGl0IGhhcHBlbnMsIHdlIGlnbm9yZSB0aGUgY29udGV4dC5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2ZpbmRPcmlnaW5hbEV4Y2VwdGlvbihleGNlcHRpb246IGFueSk6IGFueSB7XG4gICAgaWYgKCEoZXhjZXB0aW9uIGluc3RhbmNlb2YgQmFzZVdyYXBwZWRFeGNlcHRpb24pKSByZXR1cm4gbnVsbDtcblxuICAgIHZhciBlID0gZXhjZXB0aW9uLm9yaWdpbmFsRXhjZXB0aW9uO1xuICAgIHdoaWxlIChlIGluc3RhbmNlb2YgQmFzZVdyYXBwZWRFeGNlcHRpb24gJiYgaXNQcmVzZW50KGUub3JpZ2luYWxFeGNlcHRpb24pKSB7XG4gICAgICBlID0gZS5vcmlnaW5hbEV4Y2VwdGlvbjtcbiAgICB9XG5cbiAgICByZXR1cm4gZTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2ZpbmRPcmlnaW5hbFN0YWNrKGV4Y2VwdGlvbjogYW55KTogYW55IHtcbiAgICBpZiAoIShleGNlcHRpb24gaW5zdGFuY2VvZiBCYXNlV3JhcHBlZEV4Y2VwdGlvbikpIHJldHVybiBudWxsO1xuXG4gICAgdmFyIGUgPSBleGNlcHRpb247XG4gICAgdmFyIHN0YWNrID0gZXhjZXB0aW9uLm9yaWdpbmFsU3RhY2s7XG4gICAgd2hpbGUgKGUgaW5zdGFuY2VvZiBCYXNlV3JhcHBlZEV4Y2VwdGlvbiAmJiBpc1ByZXNlbnQoZS5vcmlnaW5hbEV4Y2VwdGlvbikpIHtcbiAgICAgIGUgPSBlLm9yaWdpbmFsRXhjZXB0aW9uO1xuICAgICAgaWYgKGUgaW5zdGFuY2VvZiBCYXNlV3JhcHBlZEV4Y2VwdGlvbiAmJiBpc1ByZXNlbnQoZS5vcmlnaW5hbEV4Y2VwdGlvbikpIHtcbiAgICAgICAgc3RhY2sgPSBlLm9yaWdpbmFsU3RhY2s7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YWNrO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
