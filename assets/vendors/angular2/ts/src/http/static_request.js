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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9odHRwL3N0YXRpY19yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBWUEsc0RBQXNEO1lBQ3REOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFvQ0c7WUFDSDtnQkFhRSxpQkFBWSxjQUEyQjtvQkFDckMsbUNBQW1DO29CQUNuQyxJQUFJLEdBQUcsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDO29CQUM3QixJQUFJLENBQUMsR0FBRyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUM7b0JBQzlCLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDckMsSUFBSSxNQUFNLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDOUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN0QixJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUM7NEJBQ2pCLEVBQUUsQ0FBQyxDQUFDLG9CQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUMxQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7NEJBQzdELENBQUM7NEJBQ0Qsd0RBQXdEOzRCQUN4RCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDO3dCQUNuQyxDQUFDO29CQUNILENBQUM7b0JBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDO29CQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLGdDQUFtQixDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDekQsdUNBQXVDO29CQUN2Qyw4Q0FBOEM7b0JBQzlDLHVDQUF1QztvQkFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGlCQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNyRCxDQUFDO2dCQUdEOzs7O21CQUlHO2dCQUNILHNCQUFJLEdBQUosY0FBaUIsTUFBTSxDQUFDLGdCQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDL0UsY0FBQztZQUFELENBM0NBLEFBMkNDLElBQUE7WUEzQ0QsNkJBMkNDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2h0dHAvc3RhdGljX3JlcXVlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlcXVlc3RNZXRob2R9IGZyb20gJy4vZW51bXMnO1xuaW1wb3J0IHtSZXF1ZXN0QXJnc30gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7SGVhZGVyc30gZnJvbSAnLi9oZWFkZXJzJztcbmltcG9ydCB7bm9ybWFsaXplTWV0aG9kTmFtZX0gZnJvbSAnLi9odHRwX3V0aWxzJztcbmltcG9ydCB7XG4gIFJlZ0V4cFdyYXBwZXIsXG4gIENPTlNUX0VYUFIsXG4gIGlzUHJlc2VudCxcbiAgaXNKc09iamVjdCxcbiAgU3RyaW5nV3JhcHBlclxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG4vLyBUT0RPKGplZmZiY3Jvc3MpOiBwcm9wZXJseSBpbXBsZW1lbnQgYm9keSBhY2Nlc3NvcnNcbi8qKlxuICogQ3JlYXRlcyBgUmVxdWVzdGAgaW5zdGFuY2VzIGZyb20gcHJvdmlkZWQgdmFsdWVzLlxuICpcbiAqIFRoZSBSZXF1ZXN0J3MgaW50ZXJmYWNlIGlzIGluc3BpcmVkIGJ5IHRoZSBSZXF1ZXN0IGNvbnN0cnVjdG9yIGRlZmluZWQgaW4gdGhlIFtGZXRjaFxuICogU3BlY10oaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvI3JlcXVlc3QtY2xhc3MpLFxuICogYnV0IGlzIGNvbnNpZGVyZWQgYSBzdGF0aWMgdmFsdWUgd2hvc2UgYm9keSBjYW4gYmUgYWNjZXNzZWQgbWFueSB0aW1lcy4gVGhlcmUgYXJlIG90aGVyXG4gKiBkaWZmZXJlbmNlcyBpbiB0aGUgaW1wbGVtZW50YXRpb24sIGJ1dCB0aGlzIGlzIHRoZSBtb3N0IHNpZ25pZmljYW50LlxuICpcbiAqIGBSZXF1ZXN0YCBpbnN0YW5jZXMgYXJlIHR5cGljYWxseSBjcmVhdGVkIGJ5IGhpZ2hlci1sZXZlbCBjbGFzc2VzLCBsaWtlIHtAbGluayBIdHRwfSBhbmRcbiAqIHtAbGluayBKc29ucH0sIGJ1dCBpdCBtYXkgb2NjYXNpb25hbGx5IGJlIHVzZWZ1bCB0byBleHBsaWNpdGx5IGNyZWF0ZSBgUmVxdWVzdGAgaW5zdGFuY2VzLlxuICogT25lIHN1Y2ggZXhhbXBsZSBpcyB3aGVuIGNyZWF0aW5nIHNlcnZpY2VzIHRoYXQgd3JhcCBoaWdoZXItbGV2ZWwgc2VydmljZXMsIGxpa2Uge0BsaW5rIEh0dHB9LFxuICogd2hlcmUgaXQgbWF5IGJlIHVzZWZ1bCB0byBnZW5lcmF0ZSBhIGBSZXF1ZXN0YCB3aXRoIGFyYml0cmFyeSBoZWFkZXJzIGFuZCBzZWFyY2ggcGFyYW1zLlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0b3J9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuICogaW1wb3J0IHtIVFRQX1BST1ZJREVSUywgSHR0cCwgUmVxdWVzdCwgUmVxdWVzdE1ldGhvZH0gZnJvbSAnYW5ndWxhcjIvaHR0cCc7XG4gKlxuICogQEluamVjdGFibGUoKVxuICogY2xhc3MgQXV0b0F1dGhlbnRpY2F0b3Ige1xuICogICBjb25zdHJ1Y3RvcihwdWJsaWMgaHR0cDpIdHRwKSB7fVxuICogICByZXF1ZXN0KHVybDpzdHJpbmcpIHtcbiAqICAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3QobmV3IFJlcXVlc3Qoe1xuICogICAgICAgbWV0aG9kOiBSZXF1ZXN0TWV0aG9kLkdldCxcbiAqICAgICAgIHVybDogdXJsLFxuICogICAgICAgc2VhcmNoOiAncGFzc3dvcmQ9MTIzJ1xuICogICAgIH0pKTtcbiAqICAgfVxuICogfVxuICpcbiAqIHZhciBpbmplY3RvciA9IEluamVjdG9yLnJlc29sdmVBbmRDcmVhdGUoW0hUVFBfUFJPVklERVJTLCBBdXRvQXV0aGVudGljYXRvcl0pO1xuICogdmFyIGF1dGhlbnRpY2F0b3IgPSBpbmplY3Rvci5nZXQoQXV0b0F1dGhlbnRpY2F0b3IpO1xuICogYXV0aGVudGljYXRvci5yZXF1ZXN0KCdwZW9wbGUuanNvbicpLnN1YnNjcmliZShyZXMgPT4ge1xuICogICAvL1VSTCBzaG91bGQgaGF2ZSBpbmNsdWRlZCAnP3Bhc3N3b3JkPTEyMydcbiAqICAgY29uc29sZS5sb2coJ3Blb3BsZScsIHJlcy5qc29uKCkpO1xuICogfSk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNsYXNzIFJlcXVlc3Qge1xuICAvKipcbiAgICogSHR0cCBtZXRob2Qgd2l0aCB3aGljaCB0byBwZXJmb3JtIHRoZSByZXF1ZXN0LlxuICAgKi9cbiAgbWV0aG9kOiBSZXF1ZXN0TWV0aG9kO1xuICAvKipcbiAgICoge0BsaW5rIEhlYWRlcnN9IGluc3RhbmNlXG4gICAqL1xuICBoZWFkZXJzOiBIZWFkZXJzO1xuICAvKiogVXJsIG9mIHRoZSByZW1vdGUgcmVzb3VyY2UgKi9cbiAgdXJsOiBzdHJpbmc7XG4gIC8vIFRPRE86IHN1cHBvcnQgVVJMU2VhcmNoUGFyYW1zIHwgRm9ybURhdGEgfCBCbG9iIHwgQXJyYXlCdWZmZXJcbiAgcHJpdmF0ZSBfYm9keTogc3RyaW5nO1xuICBjb25zdHJ1Y3RvcihyZXF1ZXN0T3B0aW9uczogUmVxdWVzdEFyZ3MpIHtcbiAgICAvLyBUT0RPOiBhc3NlcnQgdGhhdCB1cmwgaXMgcHJlc2VudFxuICAgIGxldCB1cmwgPSByZXF1ZXN0T3B0aW9ucy51cmw7XG4gICAgdGhpcy51cmwgPSByZXF1ZXN0T3B0aW9ucy51cmw7XG4gICAgaWYgKGlzUHJlc2VudChyZXF1ZXN0T3B0aW9ucy5zZWFyY2gpKSB7XG4gICAgICBsZXQgc2VhcmNoID0gcmVxdWVzdE9wdGlvbnMuc2VhcmNoLnRvU3RyaW5nKCk7XG4gICAgICBpZiAoc2VhcmNoLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbGV0IHByZWZpeCA9ICc/JztcbiAgICAgICAgaWYgKFN0cmluZ1dyYXBwZXIuY29udGFpbnModGhpcy51cmwsICc/JykpIHtcbiAgICAgICAgICBwcmVmaXggPSAodGhpcy51cmxbdGhpcy51cmwubGVuZ3RoIC0gMV0gPT0gJyYnKSA/ICcnIDogJyYnO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRPRE86IGp1c3QgZGVsZXRlIHNlYXJjaC1xdWVyeS1sb29raW5nIHN0cmluZyBpbiB1cmw/XG4gICAgICAgIHRoaXMudXJsID0gdXJsICsgcHJlZml4ICsgc2VhcmNoO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9ib2R5ID0gcmVxdWVzdE9wdGlvbnMuYm9keTtcbiAgICB0aGlzLm1ldGhvZCA9IG5vcm1hbGl6ZU1ldGhvZE5hbWUocmVxdWVzdE9wdGlvbnMubWV0aG9kKTtcbiAgICAvLyBUT0RPKGplZmZiY3Jvc3MpOiBpbXBsZW1lbnQgYmVoYXZpb3JcbiAgICAvLyBEZWZhdWx0cyB0byAnb21pdCcsIGNvbnNpc3RlbnQgd2l0aCBicm93c2VyXG4gICAgLy8gVE9ETyhqZWZmYmNyb3NzKTogaW1wbGVtZW50IGJlaGF2aW9yXG4gICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMocmVxdWVzdE9wdGlvbnMuaGVhZGVycyk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByZXF1ZXN0J3MgYm9keSBhcyBzdHJpbmcsIGFzc3VtaW5nIHRoYXQgYm9keSBleGlzdHMuIElmIGJvZHkgaXMgdW5kZWZpbmVkLCByZXR1cm5cbiAgICogZW1wdHlcbiAgICogc3RyaW5nLlxuICAgKi9cbiAgdGV4dCgpOiBTdHJpbmcgeyByZXR1cm4gaXNQcmVzZW50KHRoaXMuX2JvZHkpID8gdGhpcy5fYm9keS50b1N0cmluZygpIDogJyc7IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
