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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9odHRwL2JhY2tlbmRzL3hocl9iYWNrZW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBYUE7Ozs7Ozs7Y0FPRTtZQUNGO2dCQVFFLHVCQUFZLEdBQVksRUFBRSxVQUFzQixFQUFFLG1CQUFxQztvQkFSekYsaUJBdUVDO29CQTlERyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztvQkFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLHVCQUFVLENBQVcsVUFBQyxnQkFBb0M7d0JBQzVFLElBQUksSUFBSSxHQUFtQixVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUM1RCxxQkFBcUI7d0JBQ3JCLElBQUksTUFBTSxHQUFHOzRCQUNYLG1GQUFtRjs0QkFDbkYsb0ZBQW9GOzRCQUNwRixRQUFROzRCQUNSLElBQUksSUFBSSxHQUFHLGdCQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQzs0QkFFeEUsSUFBSSxPQUFPLEdBQUcsaUJBQU8sQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDOzRCQUU3RSxJQUFJLEdBQUcsR0FBRywyQkFBYyxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUUvQix5REFBeUQ7NEJBQ3pELElBQUksTUFBTSxHQUFXLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDOzRCQUU5RCwyREFBMkQ7NEJBQzNELHVFQUF1RTs0QkFDdkUs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QkFBRyxDQUFDO2dCQUM5RixxQ0FBZ0IsR0FBaEIsVUFBaUIsT0FBZ0I7b0JBQy9CLE1BQU0sQ0FBQyxJQUFJLGFBQWEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztnQkFDakYsQ0FBQztnQkFMSDtvQkFBQyxpQkFBVSxFQUFFOzs4QkFBQTtnQkFNYixpQkFBQztZQUFELENBTEEsQUFLQyxJQUFBO1lBTEQsbUNBS0MsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvaHR0cC9iYWNrZW5kcy94aHJfYmFja2VuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29ubmVjdGlvbkJhY2tlbmQsIENvbm5lY3Rpb259IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHtSZWFkeVN0YXRlLCBSZXF1ZXN0TWV0aG9kLCBSZXNwb25zZVR5cGV9IGZyb20gJy4uL2VudW1zJztcbmltcG9ydCB7UmVxdWVzdH0gZnJvbSAnLi4vc3RhdGljX3JlcXVlc3QnO1xuaW1wb3J0IHtSZXNwb25zZX0gZnJvbSAnLi4vc3RhdGljX3Jlc3BvbnNlJztcbmltcG9ydCB7SGVhZGVyc30gZnJvbSAnLi4vaGVhZGVycyc7XG5pbXBvcnQge1Jlc3BvbnNlT3B0aW9ucywgQmFzZVJlc3BvbnNlT3B0aW9uc30gZnJvbSAnLi4vYmFzZV9yZXNwb25zZV9vcHRpb25zJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0Jyb3dzZXJYaHJ9IGZyb20gJy4vYnJvd3Nlcl94aHInO1xuaW1wb3J0IHtpc1ByZXNlbnR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQge09ic2VydmVyfSBmcm9tICdyeGpzL09ic2VydmVyJztcbmltcG9ydCB7aXNTdWNjZXNzLCBnZXRSZXNwb25zZVVSTH0gZnJvbSAnLi4vaHR0cF91dGlscyc7XG5cbi8qKlxuKiBDcmVhdGVzIGNvbm5lY3Rpb25zIHVzaW5nIGBYTUxIdHRwUmVxdWVzdGAuIEdpdmVuIGEgZnVsbHktcXVhbGlmaWVkXG4qIHJlcXVlc3QsIGFuIGBYSFJDb25uZWN0aW9uYCB3aWxsIGltbWVkaWF0ZWx5IGNyZWF0ZSBhbiBgWE1MSHR0cFJlcXVlc3RgIG9iamVjdCBhbmQgc2VuZCB0aGVcbiogcmVxdWVzdC5cbipcbiogVGhpcyBjbGFzcyB3b3VsZCB0eXBpY2FsbHkgbm90IGJlIGNyZWF0ZWQgb3IgaW50ZXJhY3RlZCB3aXRoIGRpcmVjdGx5IGluc2lkZSBhcHBsaWNhdGlvbnMsIHRob3VnaFxuKiB0aGUge0BsaW5rIE1vY2tDb25uZWN0aW9ufSBtYXkgYmUgaW50ZXJhY3RlZCB3aXRoIGluIHRlc3RzLlxuKi9cbmV4cG9ydCBjbGFzcyBYSFJDb25uZWN0aW9uIGltcGxlbWVudHMgQ29ubmVjdGlvbiB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIC8qKlxuICAgKiBSZXNwb25zZSB7QGxpbmsgRXZlbnRFbWl0dGVyfSB3aGljaCBlbWl0cyBhIHNpbmdsZSB7QGxpbmsgUmVzcG9uc2V9IHZhbHVlIG9uIGxvYWQgZXZlbnQgb2ZcbiAgICogYFhNTEh0dHBSZXF1ZXN0YC5cbiAgICovXG4gIHJlc3BvbnNlOiBPYnNlcnZhYmxlPFJlc3BvbnNlPjtcbiAgcmVhZHlTdGF0ZTogUmVhZHlTdGF0ZTtcbiAgY29uc3RydWN0b3IocmVxOiBSZXF1ZXN0LCBicm93c2VyWEhSOiBCcm93c2VyWGhyLCBiYXNlUmVzcG9uc2VPcHRpb25zPzogUmVzcG9uc2VPcHRpb25zKSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxO1xuICAgIHRoaXMucmVzcG9uc2UgPSBuZXcgT2JzZXJ2YWJsZTxSZXNwb25zZT4oKHJlc3BvbnNlT2JzZXJ2ZXI6IE9ic2VydmVyPFJlc3BvbnNlPikgPT4ge1xuICAgICAgbGV0IF94aHI6IFhNTEh0dHBSZXF1ZXN0ID0gYnJvd3NlclhIUi5idWlsZCgpO1xuICAgICAgX3hoci5vcGVuKFJlcXVlc3RNZXRob2RbcmVxLm1ldGhvZF0udG9VcHBlckNhc2UoKSwgcmVxLnVybCk7XG4gICAgICAvLyBsb2FkIGV2ZW50IGhhbmRsZXJcbiAgICAgIGxldCBvbkxvYWQgPSAoKSA9PiB7XG4gICAgICAgIC8vIHJlc3BvbnNlVGV4dCBpcyB0aGUgb2xkLXNjaG9vbCB3YXkgb2YgcmV0cmlldmluZyByZXNwb25zZSAoc3VwcG9ydGVkIGJ5IElFOCAmIDkpXG4gICAgICAgIC8vIHJlc3BvbnNlL3Jlc3BvbnNlVHlwZSBwcm9wZXJ0aWVzIHdlcmUgaW50cm9kdWNlZCBpbiBYSFIgTGV2ZWwyIHNwZWMgKHN1cHBvcnRlZCBieVxuICAgICAgICAvLyBJRTEwKVxuICAgICAgICBsZXQgYm9keSA9IGlzUHJlc2VudChfeGhyLnJlc3BvbnNlKSA/IF94aHIucmVzcG9uc2UgOiBfeGhyLnJlc3BvbnNlVGV4dDtcblxuICAgICAgICBsZXQgaGVhZGVycyA9IEhlYWRlcnMuZnJvbVJlc3BvbnNlSGVhZGVyU3RyaW5nKF94aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpO1xuXG4gICAgICAgIGxldCB1cmwgPSBnZXRSZXNwb25zZVVSTChfeGhyKTtcblxuICAgICAgICAvLyBub3JtYWxpemUgSUU5IGJ1ZyAoaHR0cDovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvMTQ1MClcbiAgICAgICAgbGV0IHN0YXR1czogbnVtYmVyID0gX3hoci5zdGF0dXMgPT09IDEyMjMgPyAyMDQgOiBfeGhyLnN0YXR1cztcblxuICAgICAgICAvLyBmaXggc3RhdHVzIGNvZGUgd2hlbiBpdCBpcyAwICgwIHN0YXR1cyBpcyB1bmRvY3VtZW50ZWQpLlxuICAgICAgICAvLyBPY2N1cnMgd2hlbiBhY2Nlc3NpbmcgZmlsZSByZXNvdXJjZXMgb3Igb24gQW5kcm9pZCA0LjEgc3RvY2sgYnJvd3NlclxuICAgICAgICAvLyB3aGlsZSByZXRyaWV2aW5nIGZpbGVzIGZyb20gYXBwbGljYXRpb24gY2FjaGUuXG4gICAgICAgIGlmIChzdGF0dXMgPT09IDApIHtcbiAgICAgICAgICBzdGF0dXMgPSBib2R5ID8gMjAwIDogMDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzcG9uc2VPcHRpb25zID0gbmV3IFJlc3BvbnNlT3B0aW9ucyh7Ym9keSwgc3RhdHVzLCBoZWFkZXJzLCB1cmx9KTtcbiAgICAgICAgaWYgKGlzUHJlc2VudChiYXNlUmVzcG9uc2VPcHRpb25zKSkge1xuICAgICAgICAgIHJlc3BvbnNlT3B0aW9ucyA9IGJhc2VSZXNwb25zZU9wdGlvbnMubWVyZ2UocmVzcG9uc2VPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UocmVzcG9uc2VPcHRpb25zKTtcbiAgICAgICAgaWYgKGlzU3VjY2VzcyhzdGF0dXMpKSB7XG4gICAgICAgICAgcmVzcG9uc2VPYnNlcnZlci5uZXh0KHJlc3BvbnNlKTtcbiAgICAgICAgICAvLyBUT0RPKGdkaTIyOTApOiBkZWZlciBjb21wbGV0ZSBpZiBhcnJheSBidWZmZXIgdW50aWwgZG9uZVxuICAgICAgICAgIHJlc3BvbnNlT2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmVzcG9uc2VPYnNlcnZlci5lcnJvcihyZXNwb25zZSk7XG4gICAgICB9O1xuICAgICAgLy8gZXJyb3IgZXZlbnQgaGFuZGxlclxuICAgICAgbGV0IG9uRXJyb3IgPSAoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgdmFyIHJlc3BvbnNlT3B0aW9ucyA9IG5ldyBSZXNwb25zZU9wdGlvbnMoe2JvZHk6IGVyciwgdHlwZTogUmVzcG9uc2VUeXBlLkVycm9yfSk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoYmFzZVJlc3BvbnNlT3B0aW9ucykpIHtcbiAgICAgICAgICByZXNwb25zZU9wdGlvbnMgPSBiYXNlUmVzcG9uc2VPcHRpb25zLm1lcmdlKHJlc3BvbnNlT3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzcG9uc2VPYnNlcnZlci5lcnJvcihuZXcgUmVzcG9uc2UocmVzcG9uc2VPcHRpb25zKSk7XG4gICAgICB9O1xuXG4gICAgICBpZiAoaXNQcmVzZW50KHJlcS5oZWFkZXJzKSkge1xuICAgICAgICByZXEuaGVhZGVycy5mb3JFYWNoKCh2YWx1ZXMsIG5hbWUpID0+IF94aHIuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCB2YWx1ZXMuam9pbignLCcpKSk7XG4gICAgICB9XG5cbiAgICAgIF94aHIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIG9uTG9hZCk7XG4gICAgICBfeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgb25FcnJvcik7XG5cbiAgICAgIF94aHIuc2VuZCh0aGlzLnJlcXVlc3QudGV4dCgpKTtcblxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgX3hoci5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkJywgb25Mb2FkKTtcbiAgICAgICAgX3hoci5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIG9uRXJyb3IpO1xuICAgICAgICBfeGhyLmFib3J0KCk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogQ3JlYXRlcyB7QGxpbmsgWEhSQ29ubmVjdGlvbn0gaW5zdGFuY2VzLlxuICpcbiAqIFRoaXMgY2xhc3Mgd291bGQgdHlwaWNhbGx5IG5vdCBiZSB1c2VkIGJ5IGVuZCB1c2VycywgYnV0IGNvdWxkIGJlXG4gKiBvdmVycmlkZGVuIGlmIGEgZGlmZmVyZW50IGJhY2tlbmQgaW1wbGVtZW50YXRpb24gc2hvdWxkIGJlIHVzZWQsXG4gKiBzdWNoIGFzIGluIGEgbm9kZSBiYWNrZW5kLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgXG4gKiBpbXBvcnQge0h0dHAsIE15Tm9kZUJhY2tlbmQsIEhUVFBfUFJPVklERVJTLCBCYXNlUmVxdWVzdE9wdGlvbnN9IGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xuICogQENvbXBvbmVudCh7XG4gKiAgIHZpZXdQcm92aWRlcnM6IFtcbiAqICAgICBIVFRQX1BST1ZJREVSUyxcbiAqICAgICBwcm92aWRlKEh0dHAsIHt1c2VGYWN0b3J5OiAoYmFja2VuZCwgb3B0aW9ucykgPT4ge1xuICogICAgICAgcmV0dXJuIG5ldyBIdHRwKGJhY2tlbmQsIG9wdGlvbnMpO1xuICogICAgIH0sIGRlcHM6IFtNeU5vZGVCYWNrZW5kLCBCYXNlUmVxdWVzdE9wdGlvbnNdfSldXG4gKiB9KVxuICogY2xhc3MgTXlDb21wb25lbnQge1xuICogICBjb25zdHJ1Y3RvcihodHRwOkh0dHApIHtcbiAqICAgICBodHRwLnJlcXVlc3QoJ3Blb3BsZS5qc29uJykuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLnBlb3BsZSA9IHJlcy5qc29uKCkpO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgWEhSQmFja2VuZCBpbXBsZW1lbnRzIENvbm5lY3Rpb25CYWNrZW5kIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfYnJvd3NlclhIUjogQnJvd3NlclhociwgcHJpdmF0ZSBfYmFzZVJlc3BvbnNlT3B0aW9uczogUmVzcG9uc2VPcHRpb25zKSB7fVxuICBjcmVhdGVDb25uZWN0aW9uKHJlcXVlc3Q6IFJlcXVlc3QpOiBYSFJDb25uZWN0aW9uIHtcbiAgICByZXR1cm4gbmV3IFhIUkNvbm5lY3Rpb24ocmVxdWVzdCwgdGhpcy5fYnJvd3NlclhIUiwgdGhpcy5fYmFzZVJlc3BvbnNlT3B0aW9ucyk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
