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
                    this.ok = (this.status >= 200 && this.status <= 299);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9odHRwL3N0YXRpY19yZXNwb25zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztZQU9BOzs7Ozs7Ozs7Ozs7Ozs7OztlQWlCRztZQUNIO2dCQWtERSxrQkFBWSxlQUFnQztvQkFDMUMsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDO29CQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUM7b0JBQ3JDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDO29CQUNyRCxJQUFJLENBQUMsVUFBVSxHQUFHLGVBQWUsQ0FBQyxVQUFVLENBQUM7b0JBQzdDLElBQUksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQztvQkFDdkMsSUFBSSxDQUFDLElBQUksR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDO29CQUNqQyxJQUFJLENBQUMsR0FBRyxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUM7Z0JBQ2pDLENBQUM7Z0JBRUQ7O21CQUVHO2dCQUNILHlCQUF5QjtnQkFDekIsdUJBQUksR0FBSixjQUFjLE1BQU0sSUFBSSwwQkFBYSxDQUFDLHdEQUF3RCxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVsRzs7bUJBRUc7Z0JBQ0gsdUJBQUksR0FBSjtvQkFDRSxJQUFJLFlBQTZCLENBQUM7b0JBQ2xDLEVBQUUsQ0FBQyxDQUFDLHVCQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDM0IsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7b0JBQzVCLENBQUM7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGVBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNoQyxZQUFZLEdBQUcsV0FBSSxDQUFDLEtBQUssQ0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2hELENBQUM7b0JBQ0QsTUFBTSxDQUFDLFlBQVksQ0FBQztnQkFDdEIsQ0FBQztnQkFFRDs7bUJBRUc7Z0JBQ0gsdUJBQUksR0FBSixjQUFpQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRWhEOzttQkFFRztnQkFDSCxnQ0FBZ0M7Z0JBQ2hDLDhCQUFXLEdBQVg7b0JBQ0UsTUFBTSxJQUFJLDBCQUFhLENBQUMsK0RBQStELENBQUMsQ0FBQztnQkFDM0YsQ0FBQztnQkFDSCxlQUFDO1lBQUQsQ0EzRkEsQUEyRkMsSUFBQTtZQTNGRCwrQkEyRkMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvaHR0cC9zdGF0aWNfcmVzcG9uc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1Jlc3BvbnNlVHlwZX0gZnJvbSAnLi9lbnVtcyc7XG5pbXBvcnQge0NPTlNUX0VYUFIsIGlzU3RyaW5nLCBpc1ByZXNlbnQsIEpzb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb24sIFdyYXBwZWRFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge0hlYWRlcnN9IGZyb20gJy4vaGVhZGVycyc7XG5pbXBvcnQge1Jlc3BvbnNlT3B0aW9uc30gZnJvbSAnLi9iYXNlX3Jlc3BvbnNlX29wdGlvbnMnO1xuaW1wb3J0IHtpc0pzT2JqZWN0fSBmcm9tICcuL2h0dHBfdXRpbHMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYFJlc3BvbnNlYCBpbnN0YW5jZXMgZnJvbSBwcm92aWRlZCB2YWx1ZXMuXG4gKlxuICogVGhvdWdoIHRoaXMgb2JqZWN0IGlzbid0XG4gKiB1c3VhbGx5IGluc3RhbnRpYXRlZCBieSBlbmQtdXNlcnMsIGl0IGlzIHRoZSBwcmltYXJ5IG9iamVjdCBpbnRlcmFjdGVkIHdpdGggd2hlbiBpdCBjb21lcyB0aW1lIHRvXG4gKiBhZGQgZGF0YSB0byBhIHZpZXcuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGBcbiAqIGh0dHAucmVxdWVzdCgnbXktZnJpZW5kcy50eHQnKS5zdWJzY3JpYmUocmVzcG9uc2UgPT4gdGhpcy5mcmllbmRzID0gcmVzcG9uc2UudGV4dCgpKTtcbiAqIGBgYFxuICpcbiAqIFRoZSBSZXNwb25zZSdzIGludGVyZmFjZSBpcyBpbnNwaXJlZCBieSB0aGUgUmVzcG9uc2UgY29uc3RydWN0b3IgZGVmaW5lZCBpbiB0aGUgW0ZldGNoXG4gKiBTcGVjXShodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jcmVzcG9uc2UtY2xhc3MpLCBidXQgaXMgY29uc2lkZXJlZCBhIHN0YXRpYyB2YWx1ZSB3aG9zZSBib2R5XG4gKiBjYW4gYmUgYWNjZXNzZWQgbWFueSB0aW1lcy4gVGhlcmUgYXJlIG90aGVyIGRpZmZlcmVuY2VzIGluIHRoZSBpbXBsZW1lbnRhdGlvbiwgYnV0IHRoaXMgaXMgdGhlXG4gKiBtb3N0IHNpZ25pZmljYW50LlxuICovXG5leHBvcnQgY2xhc3MgUmVzcG9uc2Uge1xuICAvKipcbiAgICogT25lIG9mIFwiYmFzaWNcIiwgXCJjb3JzXCIsIFwiZGVmYXVsdFwiLCBcImVycm9yLCBvciBcIm9wYXF1ZVwiLlxuICAgKlxuICAgKiBEZWZhdWx0cyB0byBcImRlZmF1bHRcIi5cbiAgICovXG4gIHR5cGU6IFJlc3BvbnNlVHlwZTtcbiAgLyoqXG4gICAqIFRydWUgaWYgdGhlIHJlc3BvbnNlJ3Mgc3RhdHVzIGlzIHdpdGhpbiAyMDAtMjk5XG4gICAqL1xuICBvazogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFVSTCBvZiByZXNwb25zZS5cbiAgICpcbiAgICogRGVmYXVsdHMgdG8gZW1wdHkgc3RyaW5nLlxuICAgKi9cbiAgdXJsOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBTdGF0dXMgY29kZSByZXR1cm5lZCBieSBzZXJ2ZXIuXG4gICAqXG4gICAqIERlZmF1bHRzIHRvIDIwMC5cbiAgICovXG4gIHN0YXR1czogbnVtYmVyO1xuICAvKipcbiAgICogVGV4dCByZXByZXNlbnRpbmcgdGhlIGNvcnJlc3BvbmRpbmcgcmVhc29uIHBocmFzZSB0byB0aGUgYHN0YXR1c2AsIGFzIGRlZmluZWQgaW4gW2lldGYgcmZjIDI2MTZcbiAgICogc2VjdGlvbiA2LjEuMV0oaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzI2MTYjc2VjdGlvbi02LjEuMSlcbiAgICpcbiAgICogRGVmYXVsdHMgdG8gXCJPS1wiXG4gICAqL1xuICBzdGF0dXNUZXh0OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBOb24tc3RhbmRhcmQgcHJvcGVydHlcbiAgICpcbiAgICogRGVub3RlcyBob3cgbWFueSBvZiB0aGUgcmVzcG9uc2UgYm9keSdzIGJ5dGVzIGhhdmUgYmVlbiBsb2FkZWQsIGZvciBleGFtcGxlIGlmIHRoZSByZXNwb25zZSBpc1xuICAgKiB0aGUgcmVzdWx0IG9mIGEgcHJvZ3Jlc3MgZXZlbnQuXG4gICAqL1xuICBieXRlc0xvYWRlZDogbnVtYmVyO1xuICAvKipcbiAgICogTm9uLXN0YW5kYXJkIHByb3BlcnR5XG4gICAqXG4gICAqIERlbm90ZXMgaG93IG1hbnkgYnl0ZXMgYXJlIGV4cGVjdGVkIGluIHRoZSBmaW5hbCByZXNwb25zZSBib2R5LlxuICAgKi9cbiAgdG90YWxCeXRlczogbnVtYmVyO1xuICAvKipcbiAgICogSGVhZGVycyBvYmplY3QgYmFzZWQgb24gdGhlIGBIZWFkZXJzYCBjbGFzcyBpbiB0aGUgW0ZldGNoXG4gICAqIFNwZWNdKGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNoZWFkZXJzLWNsYXNzKS5cbiAgICovXG4gIGhlYWRlcnM6IEhlYWRlcnM7XG4gIC8vIFRPRE86IFN1cHBvcnQgQXJyYXlCdWZmZXIsIEpTT04sIEZvcm1EYXRhLCBCbG9iXG4gIHByaXZhdGUgX2JvZHk6IHN0cmluZyB8IE9iamVjdDtcbiAgY29uc3RydWN0b3IocmVzcG9uc2VPcHRpb25zOiBSZXNwb25zZU9wdGlvbnMpIHtcbiAgICB0aGlzLl9ib2R5ID0gcmVzcG9uc2VPcHRpb25zLmJvZHk7XG4gICAgdGhpcy5zdGF0dXMgPSByZXNwb25zZU9wdGlvbnMuc3RhdHVzO1xuICAgIHRoaXMub2sgPSAodGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDw9IDI5OSk7XG4gICAgdGhpcy5zdGF0dXNUZXh0ID0gcmVzcG9uc2VPcHRpb25zLnN0YXR1c1RleHQ7XG4gICAgdGhpcy5oZWFkZXJzID0gcmVzcG9uc2VPcHRpb25zLmhlYWRlcnM7XG4gICAgdGhpcy50eXBlID0gcmVzcG9uc2VPcHRpb25zLnR5cGU7XG4gICAgdGhpcy51cmwgPSByZXNwb25zZU9wdGlvbnMudXJsO1xuICB9XG5cbiAgLyoqXG4gICAqIE5vdCB5ZXQgaW1wbGVtZW50ZWRcbiAgICovXG4gIC8vIFRPRE86IEJsb2IgcmV0dXJuIHR5cGVcbiAgYmxvYigpOiBhbnkgeyB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbignXCJibG9iKClcIiBtZXRob2Qgbm90IGltcGxlbWVudGVkIG9uIFJlc3BvbnNlIHN1cGVyY2xhc3MnKTsgfVxuXG4gIC8qKlxuICAgKiBBdHRlbXB0cyB0byByZXR1cm4gYm9keSBhcyBwYXJzZWQgYEpTT05gIG9iamVjdCwgb3IgcmFpc2VzIGFuIGV4Y2VwdGlvbi5cbiAgICovXG4gIGpzb24oKTogYW55IHtcbiAgICB2YXIganNvblJlc3BvbnNlOiBzdHJpbmcgfCBPYmplY3Q7XG4gICAgaWYgKGlzSnNPYmplY3QodGhpcy5fYm9keSkpIHtcbiAgICAgIGpzb25SZXNwb25zZSA9IHRoaXMuX2JvZHk7XG4gICAgfSBlbHNlIGlmIChpc1N0cmluZyh0aGlzLl9ib2R5KSkge1xuICAgICAganNvblJlc3BvbnNlID0gSnNvbi5wYXJzZSg8c3RyaW5nPnRoaXMuX2JvZHkpO1xuICAgIH1cbiAgICByZXR1cm4ganNvblJlc3BvbnNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGJvZHkgYXMgYSBzdHJpbmcsIHByZXN1bWluZyBgdG9TdHJpbmcoKWAgY2FuIGJlIGNhbGxlZCBvbiB0aGUgcmVzcG9uc2UgYm9keS5cbiAgICovXG4gIHRleHQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2JvZHkudG9TdHJpbmcoKTsgfVxuXG4gIC8qKlxuICAgKiBOb3QgeWV0IGltcGxlbWVudGVkXG4gICAqL1xuICAvLyBUT0RPOiBBcnJheUJ1ZmZlciByZXR1cm4gdHlwZVxuICBhcnJheUJ1ZmZlcigpOiBhbnkge1xuICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKCdcImFycmF5QnVmZmVyKClcIiBtZXRob2Qgbm90IGltcGxlbWVudGVkIG9uIFJlc3BvbnNlIHN1cGVyY2xhc3MnKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
