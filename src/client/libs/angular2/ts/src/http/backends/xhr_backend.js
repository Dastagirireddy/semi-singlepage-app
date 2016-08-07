System.register(['../enums', '../static_response', '../headers', '../base_response_options', 'angular2/core', './browser_xhr', 'angular2/src/facade/lang', 'rxjs/Observable', '../http_utils'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var enums_1, static_response_1, headers_1, base_response_options_1, core_1, browser_xhr_1, lang_1, Observable_1, http_utils_1;
    var XHRConnection, XHRBackend;
    return {
        setters:[
            function (enums_1_1) {
                enums_1 = enums_1_1;
            },
            function (static_response_1_1) {
                static_response_1 = static_response_1_1;
            },
            function (headers_1_1) {
                headers_1 = headers_1_1;
            },
            function (base_response_options_1_1) {
                base_response_options_1 = base_response_options_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_xhr_1_1) {
                browser_xhr_1 = browser_xhr_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (http_utils_1_1) {
                http_utils_1 = http_utils_1_1;
            }],
        execute: function() {
            /**
            * Creates connections using `XMLHttpRequest`. Given a fully-qualified
            * request, an `XHRConnection` will immediately create an `XMLHttpRequest` object and send the
            * request.
            *
            * This class would typically not be created or interacted with directly inside applications, though
            * the {@link MockConnection} may be interacted with in tests.
            */
            XHRConnection = (function () {
                function XHRConnection(req, browserXHR, baseResponseOptions) {
                    var _this = this;
                    this.request = req;
                    this.response = new Observable_1.Observable(function (responseObserver) {
                        var _xhr = browserXHR.build();
                        _xhr.open(enums_1.RequestMethod[req.method].toUpperCase(), req.url);
                        // load event handler
                        var onLoad = function () {
                            // responseText is the old-school way of retrieving response (supported by IE8 & 9)
                            // response/responseType properties were introduced in XHR Level2 spec (supported by
                            // IE10)
                            var body = lang_1.isPresent(_xhr.response) ? _xhr.response : _xhr.responseText;
                            var headers = headers_1.Headers.fromResponseHeaderString(_xhr.getAllResponseHeaders());
                            var url = http_utils_1.getResponseURL(_xhr);
                            // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
                            var status = _xhr.status === 1223 ? 204 : _xhr.status;
                            // fix status code when it is 0 (0 status is undocumented).
                            // Occurs when accessing file resources or on Android 4.1 stock browser
                            // while retrieving files from application cache.
                            if (status === 0) {
                                status = body ? 200 : 0;
                            }
                            var responseOptions = new base_response_options_1.ResponseOptions({ body: body, status: status, headers: headers, url: url });
                            if (lang_1.isPresent(baseResponseOptions)) {
                                responseOptions = baseResponseOptions.merge(responseOptions);
                            }
                            var response = new static_response_1.Response(responseOptions);
                            if (http_utils_1.isSuccess(status)) {
                                responseObserver.next(response);
                                // TODO(gdi2290): defer complete if array buffer until done
                                responseObserver.complete();
                                return;
                            }
                            responseObserver.error(response);
                        };
                        // error event handler
                        var onError = function (err) {
                            var responseOptions = new base_response_options_1.ResponseOptions({ body: err, type: enums_1.ResponseType.Error });
                            if (lang_1.isPresent(baseResponseOptions)) {
                                responseOptions = baseResponseOptions.merge(responseOptions);
                            }
                            responseObserver.error(new static_response_1.Response(responseOptions));
                        };
                        if (lang_1.isPresent(req.headers)) {
                            req.headers.forEach(function (values, name) { return _xhr.setRequestHeader(name, values.join(',')); });
                        }
                        _xhr.addEventListener('load', onLoad);
                        _xhr.addEventListener('error', onError);
                        _xhr.send(_this.request.text());
                        return function () {
                            _xhr.removeEventListener('load', onLoad);
                            _xhr.removeEventListener('error', onError);
                            _xhr.abort();
                        };
                    });
                }
                return XHRConnection;
            }());
            exports_1("XHRConnection", XHRConnection);
            /**
             * Creates {@link XHRConnection} instances.
             *
             * This class would typically not be used by end users, but could be
             * overridden if a different backend implementation should be used,
             * such as in a node backend.
             *
             * ### Example
             *
             * ```
             * import {Http, MyNodeBackend, HTTP_PROVIDERS, BaseRequestOptions} from 'angular2/http';
             * @Component({
             *   viewProviders: [
             *     HTTP_PROVIDERS,
             *     provide(Http, {useFactory: (backend, options) => {
             *       return new Http(backend, options);
             *     }, deps: [MyNodeBackend, BaseRequestOptions]})]
             * })
             * class MyComponent {
             *   constructor(http:Http) {
             *     http.request('people.json').subscribe(res => this.people = res.json());
             *   }
             * }
             * ```
             *
             **/
            XHRBackend = (function () {
                function XHRBackend(_browserXHR, _baseResponseOptions) {
                    this._browserXHR = _browserXHR;
                    this._baseResponseOptions = _baseResponseOptions;
                }
                XHRBackend.prototype.createConnection = function (request) {
                    return new XHRConnection(request, this._browserXHR, this._baseResponseOptions);
                };
                XHRBackend = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [browser_xhr_1.BrowserXhr, base_response_options_1.ResponseOptions])
                ], XHRBackend);
                return XHRBackend;
            }());
            exports_1("XHRBackend", XHRBackend);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2h0dHAvYmFja2VuZHMveGhyX2JhY2tlbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFhQTs7Ozs7OztjQU9FO1lBQ0Y7Z0JBUUUsdUJBQVksR0FBWSxFQUFFLFVBQXNCLEVBQUUsbUJBQXFDO29CQVJ6RixpQkF1RUM7b0JBOURHLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO29CQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksdUJBQVUsQ0FBQyxVQUFDLGdCQUFvQzt3QkFDbEUsSUFBSSxJQUFJLEdBQW1CLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQzt3QkFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQzVELHFCQUFxQjt3QkFDckIsSUFBSSxNQUFNLEdBQUc7NEJBQ1gsbUZBQW1GOzRCQUNuRixvRkFBb0Y7NEJBQ3BGLFFBQVE7NEJBQ1IsSUFBSSxJQUFJLEdBQUcsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDOzRCQUV4RSxJQUFJLE9BQU8sR0FBRyxpQkFBTyxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUM7NEJBRTdFLElBQUksR0FBRyxHQUFHLDJCQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBRS9CLHlEQUF5RDs0QkFDekQsSUFBSSxNQUFNLEdBQVcsSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7NEJBRTlELDJEQUEyRDs0QkFDM0QsdUVBQXVFOzRC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QWlCO2dCQUFHLENBQUM7Z0JBQzlGLHFDQUFnQixHQUFoQixVQUFpQixPQUFnQjtvQkFDL0IsTUFBTSxDQUFDLElBQUksYUFBYSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2dCQUNqRixDQUFDO2dCQUxIO29CQUFDLGlCQUFVLEVBQUU7OzhCQUFBO2dCQU1iLGlCQUFDO1lBQUQsQ0FMQSxBQUtDLElBQUE7WUFMRCxtQ0FLQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2h0dHAvYmFja2VuZHMveGhyX2JhY2tlbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Nvbm5lY3Rpb25CYWNrZW5kLCBDb25uZWN0aW9ufSBmcm9tICcuLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7UmVhZHlTdGF0ZSwgUmVxdWVzdE1ldGhvZCwgUmVzcG9uc2VUeXBlfSBmcm9tICcuLi9lbnVtcyc7XG5pbXBvcnQge1JlcXVlc3R9IGZyb20gJy4uL3N0YXRpY19yZXF1ZXN0JztcbmltcG9ydCB7UmVzcG9uc2V9IGZyb20gJy4uL3N0YXRpY19yZXNwb25zZSc7XG5pbXBvcnQge0hlYWRlcnN9IGZyb20gJy4uL2hlYWRlcnMnO1xuaW1wb3J0IHtSZXNwb25zZU9wdGlvbnMsIEJhc2VSZXNwb25zZU9wdGlvbnN9IGZyb20gJy4uL2Jhc2VfcmVzcG9uc2Vfb3B0aW9ucyc7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtCcm93c2VyWGhyfSBmcm9tICcuL2Jyb3dzZXJfeGhyJztcbmltcG9ydCB7aXNQcmVzZW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHtPYnNlcnZlcn0gZnJvbSAncnhqcy9PYnNlcnZlcic7XG5pbXBvcnQge2lzU3VjY2VzcywgZ2V0UmVzcG9uc2VVUkx9IGZyb20gJy4uL2h0dHBfdXRpbHMnO1xuXG4vKipcbiogQ3JlYXRlcyBjb25uZWN0aW9ucyB1c2luZyBgWE1MSHR0cFJlcXVlc3RgLiBHaXZlbiBhIGZ1bGx5LXF1YWxpZmllZFxuKiByZXF1ZXN0LCBhbiBgWEhSQ29ubmVjdGlvbmAgd2lsbCBpbW1lZGlhdGVseSBjcmVhdGUgYW4gYFhNTEh0dHBSZXF1ZXN0YCBvYmplY3QgYW5kIHNlbmQgdGhlXG4qIHJlcXVlc3QuXG4qXG4qIFRoaXMgY2xhc3Mgd291bGQgdHlwaWNhbGx5IG5vdCBiZSBjcmVhdGVkIG9yIGludGVyYWN0ZWQgd2l0aCBkaXJlY3RseSBpbnNpZGUgYXBwbGljYXRpb25zLCB0aG91Z2hcbiogdGhlIHtAbGluayBNb2NrQ29ubmVjdGlvbn0gbWF5IGJlIGludGVyYWN0ZWQgd2l0aCBpbiB0ZXN0cy5cbiovXG5leHBvcnQgY2xhc3MgWEhSQ29ubmVjdGlvbiBpbXBsZW1lbnRzIENvbm5lY3Rpb24ge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICAvKipcbiAgICogUmVzcG9uc2Uge0BsaW5rIEV2ZW50RW1pdHRlcn0gd2hpY2ggZW1pdHMgYSBzaW5nbGUge0BsaW5rIFJlc3BvbnNlfSB2YWx1ZSBvbiBsb2FkIGV2ZW50IG9mXG4gICAqIGBYTUxIdHRwUmVxdWVzdGAuXG4gICAqL1xuICByZXNwb25zZTogT2JzZXJ2YWJsZTxSZXNwb25zZT47XG4gIHJlYWR5U3RhdGU6IFJlYWR5U3RhdGU7XG4gIGNvbnN0cnVjdG9yKHJlcTogUmVxdWVzdCwgYnJvd3NlclhIUjogQnJvd3NlclhociwgYmFzZVJlc3BvbnNlT3B0aW9ucz86IFJlc3BvbnNlT3B0aW9ucykge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcTtcbiAgICB0aGlzLnJlc3BvbnNlID0gbmV3IE9ic2VydmFibGUoKHJlc3BvbnNlT2JzZXJ2ZXI6IE9ic2VydmVyPFJlc3BvbnNlPikgPT4ge1xuICAgICAgbGV0IF94aHI6IFhNTEh0dHBSZXF1ZXN0ID0gYnJvd3NlclhIUi5idWlsZCgpO1xuICAgICAgX3hoci5vcGVuKFJlcXVlc3RNZXRob2RbcmVxLm1ldGhvZF0udG9VcHBlckNhc2UoKSwgcmVxLnVybCk7XG4gICAgICAvLyBsb2FkIGV2ZW50IGhhbmRsZXJcbiAgICAgIGxldCBvbkxvYWQgPSAoKSA9PiB7XG4gICAgICAgIC8vIHJlc3BvbnNlVGV4dCBpcyB0aGUgb2xkLXNjaG9vbCB3YXkgb2YgcmV0cmlldmluZyByZXNwb25zZSAoc3VwcG9ydGVkIGJ5IElFOCAmIDkpXG4gICAgICAgIC8vIHJlc3BvbnNlL3Jlc3BvbnNlVHlwZSBwcm9wZXJ0aWVzIHdlcmUgaW50cm9kdWNlZCBpbiBYSFIgTGV2ZWwyIHNwZWMgKHN1cHBvcnRlZCBieVxuICAgICAgICAvLyBJRTEwKVxuICAgICAgICBsZXQgYm9keSA9IGlzUHJlc2VudChfeGhyLnJlc3BvbnNlKSA/IF94aHIucmVzcG9uc2UgOiBfeGhyLnJlc3BvbnNlVGV4dDtcblxuICAgICAgICBsZXQgaGVhZGVycyA9IEhlYWRlcnMuZnJvbVJlc3BvbnNlSGVhZGVyU3RyaW5nKF94aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpO1xuXG4gICAgICAgIGxldCB1cmwgPSBnZXRSZXNwb25zZVVSTChfeGhyKTtcblxuICAgICAgICAvLyBub3JtYWxpemUgSUU5IGJ1ZyAoaHR0cDovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvMTQ1MClcbiAgICAgICAgbGV0IHN0YXR1czogbnVtYmVyID0gX3hoci5zdGF0dXMgPT09IDEyMjMgPyAyMDQgOiBfeGhyLnN0YXR1cztcblxuICAgICAgICAvLyBmaXggc3RhdHVzIGNvZGUgd2hlbiBpdCBpcyAwICgwIHN0YXR1cyBpcyB1bmRvY3VtZW50ZWQpLlxuICAgICAgICAvLyBPY2N1cnMgd2hlbiBhY2Nlc3NpbmcgZmlsZSByZXNvdXJjZXMgb3Igb24gQW5kcm9pZCA0LjEgc3RvY2sgYnJvd3NlclxuICAgICAgICAvLyB3aGlsZSByZXRyaWV2aW5nIGZpbGVzIGZyb20gYXBwbGljYXRpb24gY2FjaGUuXG4gICAgICAgIGlmIChzdGF0dXMgPT09IDApIHtcbiAgICAgICAgICBzdGF0dXMgPSBib2R5ID8gMjAwIDogMDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzcG9uc2VPcHRpb25zID0gbmV3IFJlc3BvbnNlT3B0aW9ucyh7Ym9keSwgc3RhdHVzLCBoZWFkZXJzLCB1cmx9KTtcbiAgICAgICAgaWYgKGlzUHJlc2VudChiYXNlUmVzcG9uc2VPcHRpb25zKSkge1xuICAgICAgICAgIHJlc3BvbnNlT3B0aW9ucyA9IGJhc2VSZXNwb25zZU9wdGlvbnMubWVyZ2UocmVzcG9uc2VPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UocmVzcG9uc2VPcHRpb25zKTtcbiAgICAgICAgaWYgKGlzU3VjY2VzcyhzdGF0dXMpKSB7XG4gICAgICAgICAgcmVzcG9uc2VPYnNlcnZlci5uZXh0KHJlc3BvbnNlKTtcbiAgICAgICAgICAvLyBUT0RPKGdkaTIyOTApOiBkZWZlciBjb21wbGV0ZSBpZiBhcnJheSBidWZmZXIgdW50aWwgZG9uZVxuICAgICAgICAgIHJlc3BvbnNlT2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmVzcG9uc2VPYnNlcnZlci5lcnJvcihyZXNwb25zZSk7XG4gICAgICB9O1xuICAgICAgLy8gZXJyb3IgZXZlbnQgaGFuZGxlclxuICAgICAgbGV0IG9uRXJyb3IgPSAoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgdmFyIHJlc3BvbnNlT3B0aW9ucyA9IG5ldyBSZXNwb25zZU9wdGlvbnMoe2JvZHk6IGVyciwgdHlwZTogUmVzcG9uc2VUeXBlLkVycm9yfSk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoYmFzZVJlc3BvbnNlT3B0aW9ucykpIHtcbiAgICAgICAgICByZXNwb25zZU9wdGlvbnMgPSBiYXNlUmVzcG9uc2VPcHRpb25zLm1lcmdlKHJlc3BvbnNlT3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzcG9uc2VPYnNlcnZlci5lcnJvcihuZXcgUmVzcG9uc2UocmVzcG9uc2VPcHRpb25zKSk7XG4gICAgICB9O1xuXG4gICAgICBpZiAoaXNQcmVzZW50KHJlcS5oZWFkZXJzKSkge1xuICAgICAgICByZXEuaGVhZGVycy5mb3JFYWNoKCh2YWx1ZXMsIG5hbWUpID0+IF94aHIuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCB2YWx1ZXMuam9pbignLCcpKSk7XG4gICAgICB9XG5cbiAgICAgIF94aHIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIG9uTG9hZCk7XG4gICAgICBfeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgb25FcnJvcik7XG5cbiAgICAgIF94aHIuc2VuZCh0aGlzLnJlcXVlc3QudGV4dCgpKTtcblxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgX3hoci5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkJywgb25Mb2FkKTtcbiAgICAgICAgX3hoci5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIG9uRXJyb3IpO1xuICAgICAgICBfeGhyLmFib3J0KCk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogQ3JlYXRlcyB7QGxpbmsgWEhSQ29ubmVjdGlvbn0gaW5zdGFuY2VzLlxuICpcbiAqIFRoaXMgY2xhc3Mgd291bGQgdHlwaWNhbGx5IG5vdCBiZSB1c2VkIGJ5IGVuZCB1c2VycywgYnV0IGNvdWxkIGJlXG4gKiBvdmVycmlkZGVuIGlmIGEgZGlmZmVyZW50IGJhY2tlbmQgaW1wbGVtZW50YXRpb24gc2hvdWxkIGJlIHVzZWQsXG4gKiBzdWNoIGFzIGluIGEgbm9kZSBiYWNrZW5kLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgXG4gKiBpbXBvcnQge0h0dHAsIE15Tm9kZUJhY2tlbmQsIEhUVFBfUFJPVklERVJTLCBCYXNlUmVxdWVzdE9wdGlvbnN9IGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xuICogQENvbXBvbmVudCh7XG4gKiAgIHZpZXdQcm92aWRlcnM6IFtcbiAqICAgICBIVFRQX1BST1ZJREVSUyxcbiAqICAgICBwcm92aWRlKEh0dHAsIHt1c2VGYWN0b3J5OiAoYmFja2VuZCwgb3B0aW9ucykgPT4ge1xuICogICAgICAgcmV0dXJuIG5ldyBIdHRwKGJhY2tlbmQsIG9wdGlvbnMpO1xuICogICAgIH0sIGRlcHM6IFtNeU5vZGVCYWNrZW5kLCBCYXNlUmVxdWVzdE9wdGlvbnNdfSldXG4gKiB9KVxuICogY2xhc3MgTXlDb21wb25lbnQge1xuICogICBjb25zdHJ1Y3RvcihodHRwOkh0dHApIHtcbiAqICAgICBodHRwLnJlcXVlc3QoJ3Blb3BsZS5qc29uJykuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLnBlb3BsZSA9IHJlcy5qc29uKCkpO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgWEhSQmFja2VuZCBpbXBsZW1lbnRzIENvbm5lY3Rpb25CYWNrZW5kIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfYnJvd3NlclhIUjogQnJvd3NlclhociwgcHJpdmF0ZSBfYmFzZVJlc3BvbnNlT3B0aW9uczogUmVzcG9uc2VPcHRpb25zKSB7fVxuICBjcmVhdGVDb25uZWN0aW9uKHJlcXVlc3Q6IFJlcXVlc3QpOiBYSFJDb25uZWN0aW9uIHtcbiAgICByZXR1cm4gbmV3IFhIUkNvbm5lY3Rpb24ocmVxdWVzdCwgdGhpcy5fYnJvd3NlclhIUiwgdGhpcy5fYmFzZVJlc3BvbnNlT3B0aW9ucyk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
