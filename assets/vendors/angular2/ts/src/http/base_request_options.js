System.register(['angular2/src/facade/lang', './headers', './enums', 'angular2/core', './url_search_params', './http_utils'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var lang_1, headers_1, enums_1, core_1, url_search_params_1, http_utils_1;
    var RequestOptions, BaseRequestOptions;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (headers_1_1) {
                headers_1 = headers_1_1;
            },
            function (enums_1_1) {
                enums_1 = enums_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (url_search_params_1_1) {
                url_search_params_1 = url_search_params_1_1;
            },
            function (http_utils_1_1) {
                http_utils_1 = http_utils_1_1;
            }],
        execute: function() {
            /**
             * Creates a request options object to be optionally provided when instantiating a
             * {@link Request}.
             *
             * This class is based on the `RequestInit` description in the [Fetch
             * Spec](https://fetch.spec.whatwg.org/#requestinit).
             *
             * All values are null by default. Typical defaults can be found in the {@link BaseRequestOptions}
             * class, which sub-classes `RequestOptions`.
             *
             * ### Example ([live demo](http://plnkr.co/edit/7Wvi3lfLq41aQPKlxB4O?p=preview))
             *
             * ```typescript
             * import {RequestOptions, Request, RequestMethod} from 'angular2/http';
             *
             * var options = new RequestOptions({
             *   method: RequestMethod.Post,
             *   url: 'https://google.com'
             * });
             * var req = new Request(options);
             * console.log('req.method:', RequestMethod[req.method]); // Post
             * console.log('options.url:', options.url); // https://google.com
             * ```
             */
            RequestOptions = (function () {
                function RequestOptions(_a) {
                    var _b = _a === void 0 ? {} : _a, method = _b.method, headers = _b.headers, body = _b.body, url = _b.url, search = _b.search;
                    this.method = lang_1.isPresent(method) ? http_utils_1.normalizeMethodName(method) : null;
                    this.headers = lang_1.isPresent(headers) ? headers : null;
                    this.body = lang_1.isPresent(body) ? body : null;
                    this.url = lang_1.isPresent(url) ? url : null;
                    this.search = lang_1.isPresent(search) ? (lang_1.isString(search) ? new url_search_params_1.URLSearchParams((search)) :
                        (search)) :
                        null;
                }
                /**
                 * Creates a copy of the `RequestOptions` instance, using the optional input as values to override
                 * existing values. This method will not change the values of the instance on which it is being
                 * called.
                 *
                 * Note that `headers` and `search` will override existing values completely if present in
                 * the `options` object. If these values should be merged, it should be done prior to calling
                 * `merge` on the `RequestOptions` instance.
                 *
                 * ### Example ([live demo](http://plnkr.co/edit/6w8XA8YTkDRcPYpdB9dk?p=preview))
                 *
                 * ```typescript
                 * import {RequestOptions, Request, RequestMethod} from 'angular2/http';
                 *
                 * var options = new RequestOptions({
                 *   method: RequestMethod.Post
                 * });
                 * var req = new Request(options.merge({
                 *   url: 'https://google.com'
                 * }));
                 * console.log('req.method:', RequestMethod[req.method]); // Post
                 * console.log('options.url:', options.url); // null
                 * console.log('req.url:', req.url); // https://google.com
                 * ```
                 */
                RequestOptions.prototype.merge = function (options) {
                    return new RequestOptions({
                        method: lang_1.isPresent(options) && lang_1.isPresent(options.method) ? options.method : this.method,
                        headers: lang_1.isPresent(options) && lang_1.isPresent(options.headers) ? options.headers : this.headers,
                        body: lang_1.isPresent(options) && lang_1.isPresent(options.body) ? options.body : this.body,
                        url: lang_1.isPresent(options) && lang_1.isPresent(options.url) ? options.url : this.url,
                        search: lang_1.isPresent(options) && lang_1.isPresent(options.search) ?
                            (lang_1.isString(options.search) ? new url_search_params_1.URLSearchParams((options.search)) :
                                (options.search).clone()) :
                            this.search
                    });
                };
                return RequestOptions;
            }());
            exports_1("RequestOptions", RequestOptions);
            /**
             * Subclass of {@link RequestOptions}, with default values.
             *
             * Default values:
             *  * method: {@link RequestMethod RequestMethod.Get}
             *  * headers: empty {@link Headers} object
             *
             * This class could be extended and bound to the {@link RequestOptions} class
             * when configuring an {@link Injector}, in order to override the default options
             * used by {@link Http} to create and send {@link Request Requests}.
             *
             * ### Example ([live demo](http://plnkr.co/edit/LEKVSx?p=preview))
             *
             * ```typescript
             * import {provide} from 'angular2/core';
             * import {bootstrap} from 'angular2/platform/browser';
             * import {HTTP_PROVIDERS, Http, BaseRequestOptions, RequestOptions} from 'angular2/http';
             * import {App} from './myapp';
             *
             * class MyOptions extends BaseRequestOptions {
             *   search: string = 'coreTeam=true';
             * }
             *
             * bootstrap(App, [HTTP_PROVIDERS, provide(RequestOptions, {useClass: MyOptions})]);
             * ```
             *
             * The options could also be extended when manually creating a {@link Request}
             * object.
             *
             * ### Example ([live demo](http://plnkr.co/edit/oyBoEvNtDhOSfi9YxaVb?p=preview))
             *
             * ```
             * import {BaseRequestOptions, Request, RequestMethod} from 'angular2/http';
             *
             * var options = new BaseRequestOptions();
             * var req = new Request(options.merge({
             *   method: RequestMethod.Post,
             *   url: 'https://google.com'
             * }));
             * console.log('req.method:', RequestMethod[req.method]); // Post
             * console.log('options.url:', options.url); // null
             * console.log('req.url:', req.url); // https://google.com
             * ```
             */
            BaseRequestOptions = (function (_super) {
                __extends(BaseRequestOptions, _super);
                function BaseRequestOptions() {
                    _super.call(this, { method: enums_1.RequestMethod.Get, headers: new headers_1.Headers() });
                }
                BaseRequestOptions = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], BaseRequestOptions);
                return BaseRequestOptions;
            }(RequestOptions));
            exports_1("BaseRequestOptions", BaseRequestOptions);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9odHRwL2Jhc2VfcmVxdWVzdF9vcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFRQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUF1Qkc7WUFDSDtnQkF1QkUsd0JBQVksRUFBNkQ7d0JBQTdELDRCQUE2RCxFQUE1RCxrQkFBTSxFQUFFLG9CQUFPLEVBQUUsY0FBSSxFQUFFLFlBQUcsRUFBRSxrQkFBTTtvQkFDN0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxnQkFBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLGdDQUFtQixDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQztvQkFDckUsSUFBSSxDQUFDLE9BQU8sR0FBRyxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBQ25ELElBQUksQ0FBQyxJQUFJLEdBQUcsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUMxQyxJQUFJLENBQUMsR0FBRyxHQUFHLGdCQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztvQkFDdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxnQkFBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksbUNBQWUsQ0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUNwQixDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUM5QyxJQUFJLENBQUM7Z0JBQ3pDLENBQUM7Z0JBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQkF3Qkc7Z0JBQ0gsOEJBQUssR0FBTCxVQUFNLE9BQTRCO29CQUNoQyxNQUFNLENBQUMsSUFBSSxjQUFjLENBQUM7d0JBQ3hCLE1BQU0sRUFBRSxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLGdCQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU07d0JBQ3RGLE9BQU8sRUFBRSxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLGdCQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU87d0JBQzFGLElBQUksRUFBRSxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLGdCQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUk7d0JBQzlFLEdBQUcsRUFBRSxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLGdCQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUc7d0JBQzFFLE1BQU0sRUFBRSxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLGdCQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQzs0QkFDM0MsQ0FBQyxlQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksbUNBQWUsQ0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQ0FDM0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7NEJBQ3hFLElBQUksQ0FBQyxNQUFNO3FCQUN4QixDQUFDLENBQUM7Z0JBQ0wsQ0FBQztnQkFDSCxxQkFBQztZQUFELENBdEVBLEFBc0VDLElBQUE7WUF0RUQsMkNBc0VDLENBQUE7WUFHRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQTJDRztZQUVIO2dCQUF3QyxzQ0FBYztnQkFDcEQ7b0JBQWdCLGtCQUFNLEVBQUMsTUFBTSxFQUFFLHFCQUFhLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLGlCQUFPLEVBQUUsRUFBQyxDQUFDLENBQUM7Z0JBQUMsQ0FBQztnQkFGL0U7b0JBQUMsaUJBQVUsRUFBRTs7c0NBQUE7Z0JBR2IseUJBQUM7WUFBRCxDQUZBLEFBRUMsQ0FGdUMsY0FBYyxHQUVyRDtZQUZELG1EQUVDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2h0dHAvYmFzZV9yZXF1ZXN0X29wdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzUHJlc2VudCwgaXNTdHJpbmd9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0hlYWRlcnN9IGZyb20gJy4vaGVhZGVycyc7XG5pbXBvcnQge1JlcXVlc3RNZXRob2R9IGZyb20gJy4vZW51bXMnO1xuaW1wb3J0IHtSZXF1ZXN0T3B0aW9uc0FyZ3N9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtVUkxTZWFyY2hQYXJhbXN9IGZyb20gJy4vdXJsX3NlYXJjaF9wYXJhbXMnO1xuaW1wb3J0IHtub3JtYWxpemVNZXRob2ROYW1lfSBmcm9tICcuL2h0dHBfdXRpbHMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSByZXF1ZXN0IG9wdGlvbnMgb2JqZWN0IHRvIGJlIG9wdGlvbmFsbHkgcHJvdmlkZWQgd2hlbiBpbnN0YW50aWF0aW5nIGFcbiAqIHtAbGluayBSZXF1ZXN0fS5cbiAqXG4gKiBUaGlzIGNsYXNzIGlzIGJhc2VkIG9uIHRoZSBgUmVxdWVzdEluaXRgIGRlc2NyaXB0aW9uIGluIHRoZSBbRmV0Y2hcbiAqIFNwZWNdKGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNyZXF1ZXN0aW5pdCkuXG4gKlxuICogQWxsIHZhbHVlcyBhcmUgbnVsbCBieSBkZWZhdWx0LiBUeXBpY2FsIGRlZmF1bHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUge0BsaW5rIEJhc2VSZXF1ZXN0T3B0aW9uc31cbiAqIGNsYXNzLCB3aGljaCBzdWItY2xhc3NlcyBgUmVxdWVzdE9wdGlvbnNgLlxuICpcbiAqICMjIyBFeGFtcGxlIChbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC83V3ZpM2xmTHE0MWFRUEtseEI0Tz9wPXByZXZpZXcpKVxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7UmVxdWVzdE9wdGlvbnMsIFJlcXVlc3QsIFJlcXVlc3RNZXRob2R9IGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xuICpcbiAqIHZhciBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHtcbiAqICAgbWV0aG9kOiBSZXF1ZXN0TWV0aG9kLlBvc3QsXG4gKiAgIHVybDogJ2h0dHBzOi8vZ29vZ2xlLmNvbSdcbiAqIH0pO1xuICogdmFyIHJlcSA9IG5ldyBSZXF1ZXN0KG9wdGlvbnMpO1xuICogY29uc29sZS5sb2coJ3JlcS5tZXRob2Q6JywgUmVxdWVzdE1ldGhvZFtyZXEubWV0aG9kXSk7IC8vIFBvc3RcbiAqIGNvbnNvbGUubG9nKCdvcHRpb25zLnVybDonLCBvcHRpb25zLnVybCk7IC8vIGh0dHBzOi8vZ29vZ2xlLmNvbVxuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXF1ZXN0T3B0aW9ucyB7XG4gIC8qKlxuICAgKiBIdHRwIG1ldGhvZCB3aXRoIHdoaWNoIHRvIGV4ZWN1dGUgYSB7QGxpbmsgUmVxdWVzdH0uXG4gICAqIEFjY2VwdGFibGUgbWV0aG9kcyBhcmUgZGVmaW5lZCBpbiB0aGUge0BsaW5rIFJlcXVlc3RNZXRob2R9IGVudW0uXG4gICAqL1xuICBtZXRob2Q6IFJlcXVlc3RNZXRob2QgfCBzdHJpbmc7XG4gIC8qKlxuICAgKiB7QGxpbmsgSGVhZGVyc30gdG8gYmUgYXR0YWNoZWQgdG8gYSB7QGxpbmsgUmVxdWVzdH0uXG4gICAqL1xuICBoZWFkZXJzOiBIZWFkZXJzO1xuICAvKipcbiAgICogQm9keSB0byBiZSB1c2VkIHdoZW4gY3JlYXRpbmcgYSB7QGxpbmsgUmVxdWVzdH0uXG4gICAqL1xuICAvLyBUT0RPOiBzdXBwb3J0IEZvcm1EYXRhLCBCbG9iLCBVUkxTZWFyY2hQYXJhbXNcbiAgYm9keTogc3RyaW5nO1xuICAvKipcbiAgICogVXJsIHdpdGggd2hpY2ggdG8gcGVyZm9ybSBhIHtAbGluayBSZXF1ZXN0fS5cbiAgICovXG4gIHVybDogc3RyaW5nO1xuICAvKipcbiAgICogU2VhcmNoIHBhcmFtZXRlcnMgdG8gYmUgaW5jbHVkZWQgaW4gYSB7QGxpbmsgUmVxdWVzdH0uXG4gICAqL1xuICBzZWFyY2g6IFVSTFNlYXJjaFBhcmFtcztcbiAgY29uc3RydWN0b3Ioe21ldGhvZCwgaGVhZGVycywgYm9keSwgdXJsLCBzZWFyY2h9OiBSZXF1ZXN0T3B0aW9uc0FyZ3MgPSB7fSkge1xuICAgIHRoaXMubWV0aG9kID0gaXNQcmVzZW50KG1ldGhvZCkgPyBub3JtYWxpemVNZXRob2ROYW1lKG1ldGhvZCkgOiBudWxsO1xuICAgIHRoaXMuaGVhZGVycyA9IGlzUHJlc2VudChoZWFkZXJzKSA/IGhlYWRlcnMgOiBudWxsO1xuICAgIHRoaXMuYm9keSA9IGlzUHJlc2VudChib2R5KSA/IGJvZHkgOiBudWxsO1xuICAgIHRoaXMudXJsID0gaXNQcmVzZW50KHVybCkgPyB1cmwgOiBudWxsO1xuICAgIHRoaXMuc2VhcmNoID0gaXNQcmVzZW50KHNlYXJjaCkgPyAoaXNTdHJpbmcoc2VhcmNoKSA/IG5ldyBVUkxTZWFyY2hQYXJhbXMoPHN0cmluZz4oc2VhcmNoKSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxVUkxTZWFyY2hQYXJhbXM+KHNlYXJjaCkpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGUgYFJlcXVlc3RPcHRpb25zYCBpbnN0YW5jZSwgdXNpbmcgdGhlIG9wdGlvbmFsIGlucHV0IGFzIHZhbHVlcyB0byBvdmVycmlkZVxuICAgKiBleGlzdGluZyB2YWx1ZXMuIFRoaXMgbWV0aG9kIHdpbGwgbm90IGNoYW5nZSB0aGUgdmFsdWVzIG9mIHRoZSBpbnN0YW5jZSBvbiB3aGljaCBpdCBpcyBiZWluZ1xuICAgKiBjYWxsZWQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCBgaGVhZGVyc2AgYW5kIGBzZWFyY2hgIHdpbGwgb3ZlcnJpZGUgZXhpc3RpbmcgdmFsdWVzIGNvbXBsZXRlbHkgaWYgcHJlc2VudCBpblxuICAgKiB0aGUgYG9wdGlvbnNgIG9iamVjdC4gSWYgdGhlc2UgdmFsdWVzIHNob3VsZCBiZSBtZXJnZWQsIGl0IHNob3VsZCBiZSBkb25lIHByaW9yIHRvIGNhbGxpbmdcbiAgICogYG1lcmdlYCBvbiB0aGUgYFJlcXVlc3RPcHRpb25zYCBpbnN0YW5jZS5cbiAgICpcbiAgICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0LzZ3OFhBOFlUa0RSY1BZcGRCOWRrP3A9cHJldmlldykpXG4gICAqXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogaW1wb3J0IHtSZXF1ZXN0T3B0aW9ucywgUmVxdWVzdCwgUmVxdWVzdE1ldGhvZH0gZnJvbSAnYW5ndWxhcjIvaHR0cCc7XG4gICAqXG4gICAqIHZhciBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHtcbiAgICogICBtZXRob2Q6IFJlcXVlc3RNZXRob2QuUG9zdFxuICAgKiB9KTtcbiAgICogdmFyIHJlcSA9IG5ldyBSZXF1ZXN0KG9wdGlvbnMubWVyZ2Uoe1xuICAgKiAgIHVybDogJ2h0dHBzOi8vZ29vZ2xlLmNvbSdcbiAgICogfSkpO1xuICAgKiBjb25zb2xlLmxvZygncmVxLm1ldGhvZDonLCBSZXF1ZXN0TWV0aG9kW3JlcS5tZXRob2RdKTsgLy8gUG9zdFxuICAgKiBjb25zb2xlLmxvZygnb3B0aW9ucy51cmw6Jywgb3B0aW9ucy51cmwpOyAvLyBudWxsXG4gICAqIGNvbnNvbGUubG9nKCdyZXEudXJsOicsIHJlcS51cmwpOyAvLyBodHRwczovL2dvb2dsZS5jb21cbiAgICogYGBgXG4gICAqL1xuICBtZXJnZShvcHRpb25zPzogUmVxdWVzdE9wdGlvbnNBcmdzKTogUmVxdWVzdE9wdGlvbnMge1xuICAgIHJldHVybiBuZXcgUmVxdWVzdE9wdGlvbnMoe1xuICAgICAgbWV0aG9kOiBpc1ByZXNlbnQob3B0aW9ucykgJiYgaXNQcmVzZW50KG9wdGlvbnMubWV0aG9kKSA/IG9wdGlvbnMubWV0aG9kIDogdGhpcy5tZXRob2QsXG4gICAgICBoZWFkZXJzOiBpc1ByZXNlbnQob3B0aW9ucykgJiYgaXNQcmVzZW50KG9wdGlvbnMuaGVhZGVycykgPyBvcHRpb25zLmhlYWRlcnMgOiB0aGlzLmhlYWRlcnMsXG4gICAgICBib2R5OiBpc1ByZXNlbnQob3B0aW9ucykgJiYgaXNQcmVzZW50KG9wdGlvbnMuYm9keSkgPyBvcHRpb25zLmJvZHkgOiB0aGlzLmJvZHksXG4gICAgICB1cmw6IGlzUHJlc2VudChvcHRpb25zKSAmJiBpc1ByZXNlbnQob3B0aW9ucy51cmwpID8gb3B0aW9ucy51cmwgOiB0aGlzLnVybCxcbiAgICAgIHNlYXJjaDogaXNQcmVzZW50KG9wdGlvbnMpICYmIGlzUHJlc2VudChvcHRpb25zLnNlYXJjaCkgP1xuICAgICAgICAgICAgICAgICAgKGlzU3RyaW5nKG9wdGlvbnMuc2VhcmNoKSA/IG5ldyBVUkxTZWFyY2hQYXJhbXMoPHN0cmluZz4ob3B0aW9ucy5zZWFyY2gpKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKDxVUkxTZWFyY2hQYXJhbXM+KG9wdGlvbnMuc2VhcmNoKSkuY2xvbmUoKSkgOlxuICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hcbiAgICB9KTtcbiAgfVxufVxuXG5cbi8qKlxuICogU3ViY2xhc3Mgb2Yge0BsaW5rIFJlcXVlc3RPcHRpb25zfSwgd2l0aCBkZWZhdWx0IHZhbHVlcy5cbiAqXG4gKiBEZWZhdWx0IHZhbHVlczpcbiAqICAqIG1ldGhvZDoge0BsaW5rIFJlcXVlc3RNZXRob2QgUmVxdWVzdE1ldGhvZC5HZXR9XG4gKiAgKiBoZWFkZXJzOiBlbXB0eSB7QGxpbmsgSGVhZGVyc30gb2JqZWN0XG4gKlxuICogVGhpcyBjbGFzcyBjb3VsZCBiZSBleHRlbmRlZCBhbmQgYm91bmQgdG8gdGhlIHtAbGluayBSZXF1ZXN0T3B0aW9uc30gY2xhc3NcbiAqIHdoZW4gY29uZmlndXJpbmcgYW4ge0BsaW5rIEluamVjdG9yfSwgaW4gb3JkZXIgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgb3B0aW9uc1xuICogdXNlZCBieSB7QGxpbmsgSHR0cH0gdG8gY3JlYXRlIGFuZCBzZW5kIHtAbGluayBSZXF1ZXN0IFJlcXVlc3RzfS5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvTEVLVlN4P3A9cHJldmlldykpXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHtwcm92aWRlfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbiAqIGltcG9ydCB7Ym9vdHN0cmFwfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9icm93c2VyJztcbiAqIGltcG9ydCB7SFRUUF9QUk9WSURFUlMsIEh0dHAsIEJhc2VSZXF1ZXN0T3B0aW9ucywgUmVxdWVzdE9wdGlvbnN9IGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xuICogaW1wb3J0IHtBcHB9IGZyb20gJy4vbXlhcHAnO1xuICpcbiAqIGNsYXNzIE15T3B0aW9ucyBleHRlbmRzIEJhc2VSZXF1ZXN0T3B0aW9ucyB7XG4gKiAgIHNlYXJjaDogc3RyaW5nID0gJ2NvcmVUZWFtPXRydWUnO1xuICogfVxuICpcbiAqIGJvb3RzdHJhcChBcHAsIFtIVFRQX1BST1ZJREVSUywgcHJvdmlkZShSZXF1ZXN0T3B0aW9ucywge3VzZUNsYXNzOiBNeU9wdGlvbnN9KV0pO1xuICogYGBgXG4gKlxuICogVGhlIG9wdGlvbnMgY291bGQgYWxzbyBiZSBleHRlbmRlZCB3aGVuIG1hbnVhbGx5IGNyZWF0aW5nIGEge0BsaW5rIFJlcXVlc3R9XG4gKiBvYmplY3QuXG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L295Qm9Fdk50RGhPU2ZpOVl4YVZiP3A9cHJldmlldykpXG4gKlxuICogYGBgXG4gKiBpbXBvcnQge0Jhc2VSZXF1ZXN0T3B0aW9ucywgUmVxdWVzdCwgUmVxdWVzdE1ldGhvZH0gZnJvbSAnYW5ndWxhcjIvaHR0cCc7XG4gKlxuICogdmFyIG9wdGlvbnMgPSBuZXcgQmFzZVJlcXVlc3RPcHRpb25zKCk7XG4gKiB2YXIgcmVxID0gbmV3IFJlcXVlc3Qob3B0aW9ucy5tZXJnZSh7XG4gKiAgIG1ldGhvZDogUmVxdWVzdE1ldGhvZC5Qb3N0LFxuICogICB1cmw6ICdodHRwczovL2dvb2dsZS5jb20nXG4gKiB9KSk7XG4gKiBjb25zb2xlLmxvZygncmVxLm1ldGhvZDonLCBSZXF1ZXN0TWV0aG9kW3JlcS5tZXRob2RdKTsgLy8gUG9zdFxuICogY29uc29sZS5sb2coJ29wdGlvbnMudXJsOicsIG9wdGlvbnMudXJsKTsgLy8gbnVsbFxuICogY29uc29sZS5sb2coJ3JlcS51cmw6JywgcmVxLnVybCk7IC8vIGh0dHBzOi8vZ29vZ2xlLmNvbVxuICogYGBgXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCYXNlUmVxdWVzdE9wdGlvbnMgZXh0ZW5kcyBSZXF1ZXN0T3B0aW9ucyB7XG4gIGNvbnN0cnVjdG9yKCkgeyBzdXBlcih7bWV0aG9kOiBSZXF1ZXN0TWV0aG9kLkdldCwgaGVhZGVyczogbmV3IEhlYWRlcnMoKX0pOyB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
