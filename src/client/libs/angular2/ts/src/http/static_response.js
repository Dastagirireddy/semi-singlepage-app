System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', './http_utils'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, exceptions_1, http_utils_1;
    var Response;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (http_utils_1_1) {
                http_utils_1 = http_utils_1_1;
            }],
        execute: function() {
            /**
             * Creates `Response` instances from provided values.
             *
             * Though this object isn't
             * usually instantiated by end-users, it is the primary object interacted with when it comes time to
             * add data to a view.
             *
             * ### Example
             *
             * ```
             * http.request('my-friends.txt').subscribe(response => this.friends = response.text());
             * ```
             *
             * The Response's interface is inspired by the Response constructor defined in the [Fetch
             * Spec](https://fetch.spec.whatwg.org/#response-class), but is considered a static value whose body
             * can be accessed many times. There are other differences in the implementation, but this is the
             * most significant.
             */
            Response = (function () {
                function Response(responseOptions) {
                    this._body = responseOptions.body;
                    this.status = responseOptions.status;
                    this.statusText = responseOptions.statusText;
                    this.headers = responseOptions.headers;
                    this.type = responseOptions.type;
                    this.url = responseOptions.url;
                }
                /**
                 * Not yet implemented
                 */
                // TODO: Blob return type
                Response.prototype.blob = function () { throw new exceptions_1.BaseException('"blob()" method not implemented on Response superclass'); };
                /**
                 * Attempts to return body as parsed `JSON` object, or raises an exception.
                 */
                Response.prototype.json = function () {
                    var jsonResponse;
                    if (http_utils_1.isJsObject(this._body)) {
                        jsonResponse = this._body;
                    }
                    else if (lang_1.isString(this._body)) {
                        jsonResponse = lang_1.Json.parse(this._body);
                    }
                    return jsonResponse;
                };
                /**
                 * Returns the body as a string, presuming `toString()` can be called on the response body.
                 */
                Response.prototype.text = function () { return this._body.toString(); };
                /**
                 * Not yet implemented
                 */
                // TODO: ArrayBuffer return type
                Response.prototype.arrayBuffer = function () {
                    throw new exceptions_1.BaseException('"arrayBuffer()" method not implemented on Response superclass');
                };
                return Response;
            }());
            exports_1("Response", Response);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2h0dHAvc3RhdGljX3Jlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBaUJHO1lBQ0g7Z0JBa0RFLGtCQUFZLGVBQWdDO29CQUMxQyxJQUFJLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUM7b0JBQ2xDLElBQUksQ0FBQyxNQUFNLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQztvQkFDckMsSUFBSSxDQUFDLFVBQVUsR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDO29CQUM3QyxJQUFJLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxJQUFJLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQztvQkFDakMsSUFBSSxDQUFDLEdBQUcsR0FBRyxlQUFlLENBQUMsR0FBRyxDQUFDO2dCQUNqQyxDQUFDO2dCQUVEOzttQkFFRztnQkFDSCx5QkFBeUI7Z0JBQ3pCLHVCQUFJLEdBQUosY0FBYyxNQUFNLElBQUksMEJBQWEsQ0FBQyx3REFBd0QsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFbEc7O21CQUVHO2dCQUNILHVCQUFJLEdBQUo7b0JBQ0UsSUFBSSxZQUE2QixDQUFDO29CQUNsQyxFQUFFLENBQUMsQ0FBQyx1QkFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzNCLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUM1QixDQUFDO29CQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxlQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDaEMsWUFBWSxHQUFHLFdBQUksQ0FBQyxLQUFLLENBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNoRCxDQUFDO29CQUNELE1BQU0sQ0FBQyxZQUFZLENBQUM7Z0JBQ3RCLENBQUM7Z0JBRUQ7O21CQUVHO2dCQUNILHVCQUFJLEdBQUosY0FBaUIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUVoRDs7bUJBRUc7Z0JBQ0gsZ0NBQWdDO2dCQUNoQyw4QkFBVyxHQUFYO29CQUNFLE1BQU0sSUFBSSwwQkFBYSxDQUFDLCtEQUErRCxDQUFDLENBQUM7Z0JBQzNGLENBQUM7Z0JBQ0gsZUFBQztZQUFELENBMUZBLEFBMEZDLElBQUE7WUExRkQsK0JBMEZDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvaHR0cC9zdGF0aWNfcmVzcG9uc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1Jlc3BvbnNlVHlwZX0gZnJvbSAnLi9lbnVtcyc7XG5pbXBvcnQge0NPTlNUX0VYUFIsIGlzU3RyaW5nLCBpc1ByZXNlbnQsIEpzb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb24sIFdyYXBwZWRFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge0hlYWRlcnN9IGZyb20gJy4vaGVhZGVycyc7XG5pbXBvcnQge1Jlc3BvbnNlT3B0aW9uc30gZnJvbSAnLi9iYXNlX3Jlc3BvbnNlX29wdGlvbnMnO1xuaW1wb3J0IHtpc0pzT2JqZWN0fSBmcm9tICcuL2h0dHBfdXRpbHMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYFJlc3BvbnNlYCBpbnN0YW5jZXMgZnJvbSBwcm92aWRlZCB2YWx1ZXMuXG4gKlxuICogVGhvdWdoIHRoaXMgb2JqZWN0IGlzbid0XG4gKiB1c3VhbGx5IGluc3RhbnRpYXRlZCBieSBlbmQtdXNlcnMsIGl0IGlzIHRoZSBwcmltYXJ5IG9iamVjdCBpbnRlcmFjdGVkIHdpdGggd2hlbiBpdCBjb21lcyB0aW1lIHRvXG4gKiBhZGQgZGF0YSB0byBhIHZpZXcuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGBcbiAqIGh0dHAucmVxdWVzdCgnbXktZnJpZW5kcy50eHQnKS5zdWJzY3JpYmUocmVzcG9uc2UgPT4gdGhpcy5mcmllbmRzID0gcmVzcG9uc2UudGV4dCgpKTtcbiAqIGBgYFxuICpcbiAqIFRoZSBSZXNwb25zZSdzIGludGVyZmFjZSBpcyBpbnNwaXJlZCBieSB0aGUgUmVzcG9uc2UgY29uc3RydWN0b3IgZGVmaW5lZCBpbiB0aGUgW0ZldGNoXG4gKiBTcGVjXShodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jcmVzcG9uc2UtY2xhc3MpLCBidXQgaXMgY29uc2lkZXJlZCBhIHN0YXRpYyB2YWx1ZSB3aG9zZSBib2R5XG4gKiBjYW4gYmUgYWNjZXNzZWQgbWFueSB0aW1lcy4gVGhlcmUgYXJlIG90aGVyIGRpZmZlcmVuY2VzIGluIHRoZSBpbXBsZW1lbnRhdGlvbiwgYnV0IHRoaXMgaXMgdGhlXG4gKiBtb3N0IHNpZ25pZmljYW50LlxuICovXG5leHBvcnQgY2xhc3MgUmVzcG9uc2Uge1xuICAvKipcbiAgICogT25lIG9mIFwiYmFzaWNcIiwgXCJjb3JzXCIsIFwiZGVmYXVsdFwiLCBcImVycm9yLCBvciBcIm9wYXF1ZVwiLlxuICAgKlxuICAgKiBEZWZhdWx0cyB0byBcImRlZmF1bHRcIi5cbiAgICovXG4gIHR5cGU6IFJlc3BvbnNlVHlwZTtcbiAgLyoqXG4gICAqIFRydWUgaWYgdGhlIHJlc3BvbnNlJ3Mgc3RhdHVzIGlzIHdpdGhpbiAyMDAtMjk5XG4gICAqL1xuICBvazogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFVSTCBvZiByZXNwb25zZS5cbiAgICpcbiAgICogRGVmYXVsdHMgdG8gZW1wdHkgc3RyaW5nLlxuICAgKi9cbiAgdXJsOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBTdGF0dXMgY29kZSByZXR1cm5lZCBieSBzZXJ2ZXIuXG4gICAqXG4gICAqIERlZmF1bHRzIHRvIDIwMC5cbiAgICovXG4gIHN0YXR1czogbnVtYmVyO1xuICAvKipcbiAgICogVGV4dCByZXByZXNlbnRpbmcgdGhlIGNvcnJlc3BvbmRpbmcgcmVhc29uIHBocmFzZSB0byB0aGUgYHN0YXR1c2AsIGFzIGRlZmluZWQgaW4gW2lldGYgcmZjIDI2MTZcbiAgICogc2VjdGlvbiA2LjEuMV0oaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzI2MTYjc2VjdGlvbi02LjEuMSlcbiAgICpcbiAgICogRGVmYXVsdHMgdG8gXCJPS1wiXG4gICAqL1xuICBzdGF0dXNUZXh0OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBOb24tc3RhbmRhcmQgcHJvcGVydHlcbiAgICpcbiAgICogRGVub3RlcyBob3cgbWFueSBvZiB0aGUgcmVzcG9uc2UgYm9keSdzIGJ5dGVzIGhhdmUgYmVlbiBsb2FkZWQsIGZvciBleGFtcGxlIGlmIHRoZSByZXNwb25zZSBpc1xuICAgKiB0aGUgcmVzdWx0IG9mIGEgcHJvZ3Jlc3MgZXZlbnQuXG4gICAqL1xuICBieXRlc0xvYWRlZDogbnVtYmVyO1xuICAvKipcbiAgICogTm9uLXN0YW5kYXJkIHByb3BlcnR5XG4gICAqXG4gICAqIERlbm90ZXMgaG93IG1hbnkgYnl0ZXMgYXJlIGV4cGVjdGVkIGluIHRoZSBmaW5hbCByZXNwb25zZSBib2R5LlxuICAgKi9cbiAgdG90YWxCeXRlczogbnVtYmVyO1xuICAvKipcbiAgICogSGVhZGVycyBvYmplY3QgYmFzZWQgb24gdGhlIGBIZWFkZXJzYCBjbGFzcyBpbiB0aGUgW0ZldGNoXG4gICAqIFNwZWNdKGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNoZWFkZXJzLWNsYXNzKS5cbiAgICovXG4gIGhlYWRlcnM6IEhlYWRlcnM7XG4gIC8vIFRPRE86IFN1cHBvcnQgQXJyYXlCdWZmZXIsIEpTT04sIEZvcm1EYXRhLCBCbG9iXG4gIHByaXZhdGUgX2JvZHk6IHN0cmluZyB8IE9iamVjdDtcbiAgY29uc3RydWN0b3IocmVzcG9uc2VPcHRpb25zOiBSZXNwb25zZU9wdGlvbnMpIHtcbiAgICB0aGlzLl9ib2R5ID0gcmVzcG9uc2VPcHRpb25zLmJvZHk7XG4gICAgdGhpcy5zdGF0dXMgPSByZXNwb25zZU9wdGlvbnMuc3RhdHVzO1xuICAgIHRoaXMuc3RhdHVzVGV4dCA9IHJlc3BvbnNlT3B0aW9ucy5zdGF0dXNUZXh0O1xuICAgIHRoaXMuaGVhZGVycyA9IHJlc3BvbnNlT3B0aW9ucy5oZWFkZXJzO1xuICAgIHRoaXMudHlwZSA9IHJlc3BvbnNlT3B0aW9ucy50eXBlO1xuICAgIHRoaXMudXJsID0gcmVzcG9uc2VPcHRpb25zLnVybDtcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3QgeWV0IGltcGxlbWVudGVkXG4gICAqL1xuICAvLyBUT0RPOiBCbG9iIHJldHVybiB0eXBlXG4gIGJsb2IoKTogYW55IHsgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oJ1wiYmxvYigpXCIgbWV0aG9kIG5vdCBpbXBsZW1lbnRlZCBvbiBSZXNwb25zZSBzdXBlcmNsYXNzJyk7IH1cblxuICAvKipcbiAgICogQXR0ZW1wdHMgdG8gcmV0dXJuIGJvZHkgYXMgcGFyc2VkIGBKU09OYCBvYmplY3QsIG9yIHJhaXNlcyBhbiBleGNlcHRpb24uXG4gICAqL1xuICBqc29uKCk6IGFueSB7XG4gICAgdmFyIGpzb25SZXNwb25zZTogc3RyaW5nIHwgT2JqZWN0O1xuICAgIGlmIChpc0pzT2JqZWN0KHRoaXMuX2JvZHkpKSB7XG4gICAgICBqc29uUmVzcG9uc2UgPSB0aGlzLl9ib2R5O1xuICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcodGhpcy5fYm9keSkpIHtcbiAgICAgIGpzb25SZXNwb25zZSA9IEpzb24ucGFyc2UoPHN0cmluZz50aGlzLl9ib2R5KTtcbiAgICB9XG4gICAgcmV0dXJuIGpzb25SZXNwb25zZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBib2R5IGFzIGEgc3RyaW5nLCBwcmVzdW1pbmcgYHRvU3RyaW5nKClgIGNhbiBiZSBjYWxsZWQgb24gdGhlIHJlc3BvbnNlIGJvZHkuXG4gICAqL1xuICB0ZXh0KCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9ib2R5LnRvU3RyaW5nKCk7IH1cblxuICAvKipcbiAgICogTm90IHlldCBpbXBsZW1lbnRlZFxuICAgKi9cbiAgLy8gVE9ETzogQXJyYXlCdWZmZXIgcmV0dXJuIHR5cGVcbiAgYXJyYXlCdWZmZXIoKTogYW55IHtcbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbignXCJhcnJheUJ1ZmZlcigpXCIgbWV0aG9kIG5vdCBpbXBsZW1lbnRlZCBvbiBSZXNwb25zZSBzdXBlcmNsYXNzJyk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
