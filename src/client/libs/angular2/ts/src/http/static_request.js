System.register(['./headers', './http_utils', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var headers_1, http_utils_1, lang_1;
    var Request;
    return {
        setters:[
            function (headers_1_1) {
                headers_1 = headers_1_1;
            },
            function (http_utils_1_1) {
                http_utils_1 = http_utils_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            // TODO(jeffbcross): properly implement body accessors
            /**
             * Creates `Request` instances from provided values.
             *
             * The Request's interface is inspired by the Request constructor defined in the [Fetch
             * Spec](https://fetch.spec.whatwg.org/#request-class),
             * but is considered a static value whose body can be accessed many times. There are other
             * differences in the implementation, but this is the most significant.
             *
             * `Request` instances are typically created by higher-level classes, like {@link Http} and
             * {@link Jsonp}, but it may occasionally be useful to explicitly create `Request` instances.
             * One such example is when creating services that wrap higher-level services, like {@link Http},
             * where it may be useful to generate a `Request` with arbitrary headers and search params.
             *
             * ```typescript
             * import {Injectable, Injector} from 'angular2/core';
             * import {HTTP_PROVIDERS, Http, Request, RequestMethod} from 'angular2/http';
             *
             * @Injectable()
             * class AutoAuthenticator {
             *   constructor(public http:Http) {}
             *   request(url:string) {
             *     return this.http.request(new Request({
             *       method: RequestMethod.Get,
             *       url: url,
             *       search: 'password=123'
             *     }));
             *   }
             * }
             *
             * var injector = Injector.resolveAndCreate([HTTP_PROVIDERS, AutoAuthenticator]);
             * var authenticator = injector.get(AutoAuthenticator);
             * authenticator.request('people.json').subscribe(res => {
             *   //URL should have included '?password=123'
             *   console.log('people', res.json());
             * });
             * ```
             */
            Request = (function () {
                function Request(requestOptions) {
                    // TODO: assert that url is present
                    var url = requestOptions.url;
                    this.url = requestOptions.url;
                    if (lang_1.isPresent(requestOptions.search)) {
                        var search = requestOptions.search.toString();
                        if (search.length > 0) {
                            var prefix = '?';
                            if (lang_1.StringWrapper.contains(this.url, '?')) {
                                prefix = (this.url[this.url.length - 1] == '&') ? '' : '&';
                            }
                            // TODO: just delete search-query-looking string in url?
                            this.url = url + prefix + search;
                        }
                    }
                    this._body = requestOptions.body;
                    this.method = http_utils_1.normalizeMethodName(requestOptions.method);
                    // TODO(jeffbcross): implement behavior
                    // Defaults to 'omit', consistent with browser
                    // TODO(jeffbcross): implement behavior
                    this.headers = new headers_1.Headers(requestOptions.headers);
                }
                /**
                 * Returns the request's body as string, assuming that body exists. If body is undefined, return
                 * empty
                 * string.
                 */
                Request.prototype.text = function () { return lang_1.isPresent(this._body) ? this._body.toString() : ''; };
                return Request;
            }());
            exports_1("Request", Request);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2h0dHAvc3RhdGljX3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFZQSxzREFBc0Q7WUFDdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQW9DRztZQUNIO2dCQWFFLGlCQUFZLGNBQTJCO29CQUNyQyxtQ0FBbUM7b0JBQ25DLElBQUksR0FBRyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUM7b0JBQzdCLElBQUksQ0FBQyxHQUFHLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQztvQkFDOUIsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNyQyxJQUFJLE1BQU0sR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUM5QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3RCLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQzs0QkFDakIsRUFBRSxDQUFDLENBQUMsb0JBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQzFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQzs0QkFDN0QsQ0FBQzs0QkFDRCx3REFBd0Q7NEJBQ3hELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUM7d0JBQ25DLENBQUM7b0JBQ0gsQ0FBQztvQkFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUM7b0JBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsZ0NBQW1CLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN6RCx1Q0FBdUM7b0JBQ3ZDLDhDQUE4QztvQkFDOUMsdUNBQXVDO29CQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksaUJBQU8sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3JELENBQUM7Z0JBR0Q7Ozs7bUJBSUc7Z0JBQ0gsc0JBQUksR0FBSixjQUFpQixNQUFNLENBQUMsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMvRSxjQUFDO1lBQUQsQ0EzQ0EsQUEyQ0MsSUFBQTtZQTNDRCw2QkEyQ0MsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9odHRwL3N0YXRpY19yZXF1ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZXF1ZXN0TWV0aG9kfSBmcm9tICcuL2VudW1zJztcbmltcG9ydCB7UmVxdWVzdEFyZ3N9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQge0hlYWRlcnN9IGZyb20gJy4vaGVhZGVycyc7XG5pbXBvcnQge25vcm1hbGl6ZU1ldGhvZE5hbWV9IGZyb20gJy4vaHR0cF91dGlscyc7XG5pbXBvcnQge1xuICBSZWdFeHBXcmFwcGVyLFxuICBDT05TVF9FWFBSLFxuICBpc1ByZXNlbnQsXG4gIGlzSnNPYmplY3QsXG4gIFN0cmluZ1dyYXBwZXJcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuLy8gVE9ETyhqZWZmYmNyb3NzKTogcHJvcGVybHkgaW1wbGVtZW50IGJvZHkgYWNjZXNzb3JzXG4vKipcbiAqIENyZWF0ZXMgYFJlcXVlc3RgIGluc3RhbmNlcyBmcm9tIHByb3ZpZGVkIHZhbHVlcy5cbiAqXG4gKiBUaGUgUmVxdWVzdCdzIGludGVyZmFjZSBpcyBpbnNwaXJlZCBieSB0aGUgUmVxdWVzdCBjb25zdHJ1Y3RvciBkZWZpbmVkIGluIHRoZSBbRmV0Y2hcbiAqIFNwZWNdKGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNyZXF1ZXN0LWNsYXNzKSxcbiAqIGJ1dCBpcyBjb25zaWRlcmVkIGEgc3RhdGljIHZhbHVlIHdob3NlIGJvZHkgY2FuIGJlIGFjY2Vzc2VkIG1hbnkgdGltZXMuIFRoZXJlIGFyZSBvdGhlclxuICogZGlmZmVyZW5jZXMgaW4gdGhlIGltcGxlbWVudGF0aW9uLCBidXQgdGhpcyBpcyB0aGUgbW9zdCBzaWduaWZpY2FudC5cbiAqXG4gKiBgUmVxdWVzdGAgaW5zdGFuY2VzIGFyZSB0eXBpY2FsbHkgY3JlYXRlZCBieSBoaWdoZXItbGV2ZWwgY2xhc3NlcywgbGlrZSB7QGxpbmsgSHR0cH0gYW5kXG4gKiB7QGxpbmsgSnNvbnB9LCBidXQgaXQgbWF5IG9jY2FzaW9uYWxseSBiZSB1c2VmdWwgdG8gZXhwbGljaXRseSBjcmVhdGUgYFJlcXVlc3RgIGluc3RhbmNlcy5cbiAqIE9uZSBzdWNoIGV4YW1wbGUgaXMgd2hlbiBjcmVhdGluZyBzZXJ2aWNlcyB0aGF0IHdyYXAgaGlnaGVyLWxldmVsIHNlcnZpY2VzLCBsaWtlIHtAbGluayBIdHRwfSxcbiAqIHdoZXJlIGl0IG1heSBiZSB1c2VmdWwgdG8gZ2VuZXJhdGUgYSBgUmVxdWVzdGAgd2l0aCBhcmJpdHJhcnkgaGVhZGVycyBhbmQgc2VhcmNoIHBhcmFtcy5cbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQge0luamVjdGFibGUsIEluamVjdG9yfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbiAqIGltcG9ydCB7SFRUUF9QUk9WSURFUlMsIEh0dHAsIFJlcXVlc3QsIFJlcXVlc3RNZXRob2R9IGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xuICpcbiAqIEBJbmplY3RhYmxlKClcbiAqIGNsYXNzIEF1dG9BdXRoZW50aWNhdG9yIHtcbiAqICAgY29uc3RydWN0b3IocHVibGljIGh0dHA6SHR0cCkge31cbiAqICAgcmVxdWVzdCh1cmw6c3RyaW5nKSB7XG4gKiAgICAgcmV0dXJuIHRoaXMuaHR0cC5yZXF1ZXN0KG5ldyBSZXF1ZXN0KHtcbiAqICAgICAgIG1ldGhvZDogUmVxdWVzdE1ldGhvZC5HZXQsXG4gKiAgICAgICB1cmw6IHVybCxcbiAqICAgICAgIHNlYXJjaDogJ3Bhc3N3b3JkPTEyMydcbiAqICAgICB9KSk7XG4gKiAgIH1cbiAqIH1cbiAqXG4gKiB2YXIgaW5qZWN0b3IgPSBJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKFtIVFRQX1BST1ZJREVSUywgQXV0b0F1dGhlbnRpY2F0b3JdKTtcbiAqIHZhciBhdXRoZW50aWNhdG9yID0gaW5qZWN0b3IuZ2V0KEF1dG9BdXRoZW50aWNhdG9yKTtcbiAqIGF1dGhlbnRpY2F0b3IucmVxdWVzdCgncGVvcGxlLmpzb24nKS5zdWJzY3JpYmUocmVzID0+IHtcbiAqICAgLy9VUkwgc2hvdWxkIGhhdmUgaW5jbHVkZWQgJz9wYXNzd29yZD0xMjMnXG4gKiAgIGNvbnNvbGUubG9nKCdwZW9wbGUnLCByZXMuanNvbigpKTtcbiAqIH0pO1xuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXF1ZXN0IHtcbiAgLyoqXG4gICAqIEh0dHAgbWV0aG9kIHdpdGggd2hpY2ggdG8gcGVyZm9ybSB0aGUgcmVxdWVzdC5cbiAgICovXG4gIG1ldGhvZDogUmVxdWVzdE1ldGhvZDtcbiAgLyoqXG4gICAqIHtAbGluayBIZWFkZXJzfSBpbnN0YW5jZVxuICAgKi9cbiAgaGVhZGVyczogSGVhZGVycztcbiAgLyoqIFVybCBvZiB0aGUgcmVtb3RlIHJlc291cmNlICovXG4gIHVybDogc3RyaW5nO1xuICAvLyBUT0RPOiBzdXBwb3J0IFVSTFNlYXJjaFBhcmFtcyB8IEZvcm1EYXRhIHwgQmxvYiB8IEFycmF5QnVmZmVyXG4gIHByaXZhdGUgX2JvZHk6IHN0cmluZztcbiAgY29uc3RydWN0b3IocmVxdWVzdE9wdGlvbnM6IFJlcXVlc3RBcmdzKSB7XG4gICAgLy8gVE9ETzogYXNzZXJ0IHRoYXQgdXJsIGlzIHByZXNlbnRcbiAgICBsZXQgdXJsID0gcmVxdWVzdE9wdGlvbnMudXJsO1xuICAgIHRoaXMudXJsID0gcmVxdWVzdE9wdGlvbnMudXJsO1xuICAgIGlmIChpc1ByZXNlbnQocmVxdWVzdE9wdGlvbnMuc2VhcmNoKSkge1xuICAgICAgbGV0IHNlYXJjaCA9IHJlcXVlc3RPcHRpb25zLnNlYXJjaC50b1N0cmluZygpO1xuICAgICAgaWYgKHNlYXJjaC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCBwcmVmaXggPSAnPyc7XG4gICAgICAgIGlmIChTdHJpbmdXcmFwcGVyLmNvbnRhaW5zKHRoaXMudXJsLCAnPycpKSB7XG4gICAgICAgICAgcHJlZml4ID0gKHRoaXMudXJsW3RoaXMudXJsLmxlbmd0aCAtIDFdID09ICcmJykgPyAnJyA6ICcmJztcbiAgICAgICAgfVxuICAgICAgICAvLyBUT0RPOiBqdXN0IGRlbGV0ZSBzZWFyY2gtcXVlcnktbG9va2luZyBzdHJpbmcgaW4gdXJsP1xuICAgICAgICB0aGlzLnVybCA9IHVybCArIHByZWZpeCArIHNlYXJjaDtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fYm9keSA9IHJlcXVlc3RPcHRpb25zLmJvZHk7XG4gICAgdGhpcy5tZXRob2QgPSBub3JtYWxpemVNZXRob2ROYW1lKHJlcXVlc3RPcHRpb25zLm1ldGhvZCk7XG4gICAgLy8gVE9ETyhqZWZmYmNyb3NzKTogaW1wbGVtZW50IGJlaGF2aW9yXG4gICAgLy8gRGVmYXVsdHMgdG8gJ29taXQnLCBjb25zaXN0ZW50IHdpdGggYnJvd3NlclxuICAgIC8vIFRPRE8oamVmZmJjcm9zcyk6IGltcGxlbWVudCBiZWhhdmlvclxuICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKHJlcXVlc3RPcHRpb25zLmhlYWRlcnMpO1xuICB9XG5cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcmVxdWVzdCdzIGJvZHkgYXMgc3RyaW5nLCBhc3N1bWluZyB0aGF0IGJvZHkgZXhpc3RzLiBJZiBib2R5IGlzIHVuZGVmaW5lZCwgcmV0dXJuXG4gICAqIGVtcHR5XG4gICAqIHN0cmluZy5cbiAgICovXG4gIHRleHQoKTogU3RyaW5nIHsgcmV0dXJuIGlzUHJlc2VudCh0aGlzLl9ib2R5KSA/IHRoaXMuX2JvZHkudG9TdHJpbmcoKSA6ICcnOyB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
