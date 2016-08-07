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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9mYWNhZGUvZXhjZXB0aW9uX2hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFJQTtnQkFBQTtvQkFDRSxRQUFHLEdBQVUsRUFBRSxDQUFDO2dCQUtsQixDQUFDO2dCQUpDLDBCQUFHLEdBQUgsVUFBSSxDQUFNLElBQVUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QywrQkFBUSxHQUFSLFVBQVMsQ0FBTSxJQUFVLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUMsK0JBQVEsR0FBUixVQUFTLENBQU0sSUFBVSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLGtDQUFXLEdBQVgsY0FBYyxDQUFDOztnQkFDakIsbUJBQUM7WUFBRCxDQU5BLEFBTUMsSUFBQTtZQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQW9CRztZQUNIO2dCQUNFLDBCQUFvQixPQUFZLEVBQVUsaUJBQWlDO29CQUF6QyxpQ0FBeUMsR0FBekMsd0JBQXlDO29CQUF2RCxZQUFPLEdBQVAsT0FBTyxDQUFLO29CQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBZ0I7Z0JBQUcsQ0FBQztnQkFFeEUsa0NBQWlCLEdBQXhCLFVBQXlCLFNBQWMsRUFBRSxVQUFzQixFQUFFLE1BQXFCO29CQUE3QywwQkFBc0IsR0FBdEIsaUJBQXNCO29CQUFFLHNCQUFxQixHQUFyQixhQUFxQjtvQkFDcEYsSUFBSSxDQUFDLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztvQkFDM0IsSUFBSSxDQUFDLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ3ZDLENBQUMsQ0FBQyxJQUFJLENBQUMs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U0FBUyxDQUFDLGFBQWEsQ0FBQztvQkFDcEMsT0FBTyxDQUFDLFlBQVksNkNBQW9CLElBQUksZ0JBQVMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDO3dCQUMzRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO3dCQUN4QixFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksNkNBQW9CLElBQUksZ0JBQVMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3hFLEtBQUssR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDO3dCQUMxQixDQUFDO29CQUNILENBQUM7b0JBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFDZixDQUFDO2dCQUNILHVCQUFDO1lBQUQsQ0FsR0EsQUFrR0MsSUFBQTtZQWxHRCwrQ0FrR0MsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvZmFjYWRlL2V4Y2VwdGlvbl9oYW5kbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc1ByZXNlbnQsIGlzQmxhbmssIHByaW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlV3JhcHBlZEV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9iYXNlX3dyYXBwZWRfZXhjZXB0aW9uJztcbmltcG9ydCB7TGlzdFdyYXBwZXIsIGlzTGlzdExpa2VJdGVyYWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcblxuY2xhc3MgX0FycmF5TG9nZ2VyIHtcbiAgcmVzOiBhbnlbXSA9IFtdO1xuICBsb2coczogYW55KTogdm9pZCB7IHRoaXMucmVzLnB1c2gocyk7IH1cbiAgbG9nRXJyb3IoczogYW55KTogdm9pZCB7IHRoaXMucmVzLnB1c2gocyk7IH1cbiAgbG9nR3JvdXAoczogYW55KTogdm9pZCB7IHRoaXMucmVzLnB1c2gocyk7IH1cbiAgbG9nR3JvdXBFbmQoKXt9O1xufVxuXG4vKipcbiAqIFByb3ZpZGVzIGEgaG9vayBmb3IgY2VudHJhbGl6ZWQgZXhjZXB0aW9uIGhhbmRsaW5nLlxuICpcbiAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIGBFeGNlcHRpb25IYW5kbGVyYCBwcmludHMgZXJyb3IgbWVzc2FnZXMgdG8gdGhlIGBDb25zb2xlYC4gVG9cbiAqIGludGVyY2VwdCBlcnJvciBoYW5kbGluZyxcbiAqIHdyaXRlIGEgY3VzdG9tIGV4Y2VwdGlvbiBoYW5kbGVyIHRoYXQgcmVwbGFjZXMgdGhpcyBkZWZhdWx0IGFzIGFwcHJvcHJpYXRlIGZvciB5b3VyIGFwcC5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqXG4gKiBjbGFzcyBNeUV4Y2VwdGlvbkhhbmRsZXIgaW1wbGVtZW50cyBFeGNlcHRpb25IYW5kbGVyIHtcbiAqICAgY2FsbChlcnJvciwgc3RhY2tUcmFjZSA9IG51bGwsIHJlYXNvbiA9IG51bGwpIHtcbiAqICAgICAvLyBkbyBzb21ldGhpbmcgd2l0aCB0aGUgZXhjZXB0aW9uXG4gKiAgIH1cbiAqIH1cbiAqXG4gKiBib290c3RyYXAoTXlBcHAsIFtwcm92aWRlKEV4Y2VwdGlvbkhhbmRsZXIsIHt1c2VDbGFzczogTXlFeGNlcHRpb25IYW5kbGVyfSldKVxuICpcbiAqIGBgYFxuICovXG5leHBvcnQgY2xhc3MgRXhjZXB0aW9uSGFuZGxlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2xvZ2dlcjogYW55LCBwcml2YXRlIF9yZXRocm93RXhjZXB0aW9uOiBib29sZWFuID0gdHJ1ZSkge31cblxuICBzdGF0aWMgZXhjZXB0aW9uVG9TdHJpbmcoZXhjZXB0aW9uOiBhbnksIHN0YWNrVHJhY2U6IGFueSA9IG51bGwsIHJlYXNvbjogc3RyaW5nID0gbnVsbCk6IHN0cmluZyB7XG4gICAgdmFyIGwgPSBuZXcgX0FycmF5TG9nZ2VyKCk7XG4gICAgdmFyIGUgPSBuZXcgRXhjZXB0aW9uSGFuZGxlcihsLCBmYWxzZSk7XG4gICAgZS5jYWxsKGV4Y2VwdGlvbiwgc3RhY2tUcmFjZSwgcmVhc29uKTtcbiAgICByZXR1cm4gbC5yZXMuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIGNhbGwoZXhjZXB0aW9uOiBhbnksIHN0YWNrVHJhY2U6IGFueSA9IG51bGwsIHJlYXNvbjogc3RyaW5nID0gbnVsbCk6IHZvaWQge1xuICAgIHZhciBvcmlnaW5hbEV4Y2VwdGlvbiA9IHRoaXMuX2ZpbmRPcmlnaW5hbEV4Y2VwdGlvbihleGNlcHRpb24pO1xuICAgIHZhciBvcmlnaW5hbFN0YWNrID0gdGhpcy5fZmluZE9yaWdpbmFsU3RhY2soZXhjZXB0aW9uKTtcbiAgICB2YXIgY29udGV4dCA9IHRoaXMuX2ZpbmRDb250ZXh0KGV4Y2VwdGlvbik7XG5cbiAgICB0aGlzLl9sb2dnZXIubG9nR3JvdXAoYEVYQ0VQVElPTjogJHt0aGlzLl9leHRyYWN0TWVzc2FnZShleGNlcHRpb24pfWApO1xuXG4gICAgaWYgKGlzUHJlc2VudChzdGFja1RyYWNlKSAmJiBpc0JsYW5rKG9yaWdpbmFsU3RhY2spKSB7XG4gICAgICB0aGlzLl9sb2dnZXIubG9nRXJyb3IoXCJTVEFDS1RSQUNFOlwiKTtcbiAgICAgIHRoaXMuX2xvZ2dlci5sb2dFcnJvcih0aGlzLl9sb25nU3RhY2tUcmFjZShzdGFja1RyYWNlKSk7XG4gICAgfVxuXG4gICAgaWYgKGlzUHJlc2VudChyZWFzb24pKSB7XG4gICAgICB0aGlzLl9sb2dnZXIubG9nRXJyb3IoYFJFQVNPTjogJHtyZWFzb259YCk7XG4gICAgfVxuXG4gICAgaWYgKGlzUHJlc2VudChvcmlnaW5hbEV4Y2VwdGlvbikpIHtcbiAgICAgIHRoaXMuX2xvZ2dlci5sb2dFcnJvcihgT1JJR0lOQUwgRVhDRVBUSU9OOiAke3RoaXMuX2V4dHJhY3RNZXNzYWdlKG9yaWdpbmFsRXhjZXB0aW9uKX1gKTtcbiAgICB9XG5cbiAgICBpZiAoaXNQcmVzZW50KG9yaWdpbmFsU3RhY2spKSB7XG4gICAgICB0aGlzLl9sb2dnZXIubG9nRXJyb3IoXCJPUklHSU5BTCBTVEFDS1RSQUNFOlwiKTtcbiAgICAgIHRoaXMuX2xvZ2dlci5sb2dFcnJvcih0aGlzLl9sb25nU3RhY2tUcmFjZShvcmlnaW5hbFN0YWNrKSk7XG4gICAgfVxuXG4gICAgaWYgKGlzUHJlc2VudChjb250ZXh0KSkge1xuICAgICAgdGhpcy5fbG9nZ2VyLmxvZ0Vycm9yKFwiRVJST1IgQ09OVEVYVDpcIik7XG4gICAgICB0aGlzLl9sb2dnZXIubG9nRXJyb3IoY29udGV4dCk7XG4gICAgfVxuXG4gICAgdGhpcy5fbG9nZ2VyLmxvZ0dyb3VwRW5kKCk7XG5cbiAgICAvLyBXZSByZXRocm93IGV4Y2VwdGlvbnMsIHNvIG9wZXJhdGlvbnMgbGlrZSAnYm9vdHN0cmFwJyB3aWxsIHJlc3VsdCBpbiBhbiBlcnJvclxuICAgIC8vIHdoZW4gYW4gZXhjZXB0aW9uIGhhcHBlbnMuIElmIHdlIGRvIG5vdCByZXRocm93LCBib290c3RyYXAgd2lsbCBhbHdheXMgc3VjY2VlZC5cbiAgICBpZiAodGhpcy5fcmV0aHJvd0V4Y2VwdGlvbikgdGhyb3cgZXhjZXB0aW9uO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZXh0cmFjdE1lc3NhZ2UoZXhjZXB0aW9uOiBhbnkpOiBzdHJpbmcge1xuICAgIHJldHVybiBleGNlcHRpb24gaW5zdGFuY2VvZiBCYXNlV3JhcHBlZEV4Y2VwdGlvbiA/IGV4Y2VwdGlvbi53cmFwcGVyTWVzc2FnZSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhjZXB0aW9uLnRvU3RyaW5nKCk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9sb25nU3RhY2tUcmFjZShzdGFja1RyYWNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBpc0xpc3RMaWtlSXRlcmFibGUoc3RhY2tUcmFjZSkgPyAoPGFueVtdPnN0YWNrVHJhY2UpLmpvaW4oXCJcXG5cXG4tLS0tLWFzeW5jIGdhcC0tLS0tXFxuXCIpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2tUcmFjZS50b1N0cmluZygpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZmluZENvbnRleHQoZXhjZXB0aW9uOiBhbnkpOiBhbnkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIShleGNlcHRpb24gaW5zdGFuY2VvZiBCYXNlV3JhcHBlZEV4Y2VwdGlvbikpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIGlzUHJlc2VudChleGNlcHRpb24uY29udGV4dCkgPyBleGNlcHRpb24uY29udGV4dCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpbmRDb250ZXh0KGV4Y2VwdGlvbi5vcmlnaW5hbEV4Y2VwdGlvbik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gZXhjZXB0aW9uLmNvbnRleHQgY2FuIHRocm93IGFuIGV4Y2VwdGlvbi4gaWYgaXQgaGFwcGVucywgd2UgaWdub3JlIHRoZSBjb250ZXh0LlxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZmluZE9yaWdpbmFsRXhjZXB0aW9uKGV4Y2VwdGlvbjogYW55KTogYW55IHtcbiAgICBpZiAoIShleGNlcHRpb24gaW5zdGFuY2VvZiBCYXNlV3JhcHBlZEV4Y2VwdGlvbikpIHJldHVybiBudWxsO1xuXG4gICAgdmFyIGUgPSBleGNlcHRpb24ub3JpZ2luYWxFeGNlcHRpb247XG4gICAgd2hpbGUgKGUgaW5zdGFuY2VvZiBCYXNlV3JhcHBlZEV4Y2VwdGlvbiAmJiBpc1ByZXNlbnQoZS5vcmlnaW5hbEV4Y2VwdGlvbikpIHtcbiAgICAgIGUgPSBlLm9yaWdpbmFsRXhjZXB0aW9uO1xuICAgIH1cblxuICAgIHJldHVybiBlO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZmluZE9yaWdpbmFsU3RhY2soZXhjZXB0aW9uOiBhbnkpOiBhbnkge1xuICAgIGlmICghKGV4Y2VwdGlvbiBpbnN0YW5jZW9mIEJhc2VXcmFwcGVkRXhjZXB0aW9uKSkgcmV0dXJuIG51bGw7XG5cbiAgICB2YXIgZSA9IGV4Y2VwdGlvbjtcbiAgICB2YXIgc3RhY2sgPSBleGNlcHRpb24ub3JpZ2luYWxTdGFjaztcbiAgICB3aGlsZSAoZSBpbnN0YW5jZW9mIEJhc2VXcmFwcGVkRXhjZXB0aW9uICYmIGlzUHJlc2VudChlLm9yaWdpbmFsRXhjZXB0aW9uKSkge1xuICAgICAgZSA9IGUub3JpZ2luYWxFeGNlcHRpb247XG4gICAgICBpZiAoZSBpbnN0YW5jZW9mIEJhc2VXcmFwcGVkRXhjZXB0aW9uICYmIGlzUHJlc2VudChlLm9yaWdpbmFsRXhjZXB0aW9uKSkge1xuICAgICAgICBzdGFjayA9IGUub3JpZ2luYWxTdGFjaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3RhY2s7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
