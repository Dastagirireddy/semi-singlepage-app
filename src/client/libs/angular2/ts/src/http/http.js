System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/core', './interfaces', './static_request', './base_request_options', './enums'], function(exports_1, context_1) {
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
    var lang_1, exceptions_1, core_1, interfaces_1, static_request_1, base_request_options_1, enums_1;
    var Http, Jsonp;
    function httpRequest(backend, request) {
        return backend.createConnection(request).response;
    }
    function mergeOptions(defaultOpts, providedOpts, method, url) {
        var newOptions = defaultOpts;
        if (lang_1.isPresent(providedOpts)) {
            // Hack so Dart can used named parameters
            return newOptions.merge(new base_request_options_1.RequestOptions({
                method: providedOpts.method || method,
                url: providedOpts.url || url,
                search: providedOpts.search,
                headers: providedOpts.headers,
                body: providedOpts.body
            }));
        }
        if (lang_1.isPresent(method)) {
            return newOptions.merge(new base_request_options_1.RequestOptions({ method: method, url: url }));
        }
        else {
            return newOptions.merge(new base_request_options_1.RequestOptions({ url: url }));
        }
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (interfaces_1_1) {
                interfaces_1 = interfaces_1_1;
            },
            function (static_request_1_1) {
                static_request_1 = static_request_1_1;
            },
            function (base_request_options_1_1) {
                base_request_options_1 = base_request_options_1_1;
            },
            function (enums_1_1) {
                enums_1 = enums_1_1;
            }],
        execute: function() {
            /**
             * Performs http requests using `XMLHttpRequest` as the default backend.
             *
             * `Http` is available as an injectable class, with methods to perform http requests. Calling
             * `request` returns an `Observable` which will emit a single {@link Response} when a
             * response is received.
             *
             * ### Example
             *
             * ```typescript
             * import {Http, HTTP_PROVIDERS} from 'angular2/http';
             * @Component({
             *   selector: 'http-app',
             *   viewProviders: [HTTP_PROVIDERS],
             *   templateUrl: 'people.html'
             * })
             * class PeopleComponent {
             *   constructor(http: Http) {
             *     http.get('people.json')
             *       // Call map on the response observable to get the parsed people object
             *       .map(res => res.json())
             *       // Subscribe to the observable to get the parsed people object and attach it to the
             *       // component
             *       .subscribe(people => this.people = people);
             *   }
             * }
             * ```
             *
             *
             * ### Example
             *
             * ```
             * http.get('people.json').observer({next: (value) => this.people = value});
             * ```
             *
             * The default construct used to perform requests, `XMLHttpRequest`, is abstracted as a "Backend" (
             * {@link XHRBackend} in this case), which could be mocked with dependency injection by replacing
             * the {@link XHRBackend} provider, as in the following example:
             *
             * ### Example
             *
             * ```typescript
             * import {BaseRequestOptions, Http} from 'angular2/http';
             * import {MockBackend} from 'angular2/http/testing';
             * var injector = Injector.resolveAndCreate([
             *   BaseRequestOptions,
             *   MockBackend,
             *   provide(Http, {useFactory:
             *       function(backend, defaultOptions) {
             *         return new Http(backend, defaultOptions);
             *       },
             *       deps: [MockBackend, BaseRequestOptions]})
             * ]);
             * var http = injector.get(Http);
             * http.get('request-from-mock-backend.json').subscribe((res:Response) => doSomething(res));
             * ```
             *
             **/
            Http = (function () {
                function Http(_backend, _defaultOptions) {
                    this._backend = _backend;
                    this._defaultOptions = _defaultOptions;
                }
                /**
                 * Performs any type of http request. First argument is required, and can either be a url or
                 * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
                 * object can be provided as the 2nd argument. The options object will be merged with the values
                 * of {@link BaseRequestOptions} before performing the request.
                 */
                Http.prototype.request = function (url, options) {
                    var responseObservable;
                    if (lang_1.isString(url)) {
                        responseObservable = httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions, options, enums_1.RequestMethod.Get, url)));
                    }
                    else if (url instanceof static_request_1.Request) {
                        responseObservable = httpRequest(this._backend, url);
                    }
                    else {
                        throw exceptions_1.makeTypeError('First argument must be a url string or Request instance.');
                    }
                    return responseObservable;
                };
                /**
                 * Performs a request with `get` http method.
                 */
                Http.prototype.get = function (url, options) {
                    return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions, options, enums_1.RequestMethod.Get, url)));
                };
                /**
                 * Performs a request with `post` http method.
                 */
                Http.prototype.post = function (url, body, options) {
                    return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions.merge(new base_request_options_1.RequestOptions({ body: body })), options, enums_1.RequestMethod.Post, url)));
                };
                /**
                 * Performs a request with `put` http method.
                 */
                Http.prototype.put = function (url, body, options) {
                    return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions.merge(new base_request_options_1.RequestOptions({ body: body })), options, enums_1.RequestMethod.Put, url)));
                };
                /**
                 * Performs a request with `delete` http method.
                 */
                Http.prototype.delete = function (url, options) {
                    return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions, options, enums_1.RequestMethod.Delete, url)));
                };
                /**
                 * Performs a request with `patch` http method.
                 */
                Http.prototype.patch = function (url, body, options) {
                    return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions.merge(new base_request_options_1.RequestOptions({ body: body })), options, enums_1.RequestMethod.Patch, url)));
                };
                /**
                 * Performs a request with `head` http method.
                 */
                Http.prototype.head = function (url, options) {
                    return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions, options, enums_1.RequestMethod.Head, url)));
                };
                Http = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [interfaces_1.ConnectionBackend, base_request_options_1.RequestOptions])
                ], Http);
                return Http;
            }());
            exports_1("Http", Http);
            Jsonp = (function (_super) {
                __extends(Jsonp, _super);
                function Jsonp(backend, defaultOptions) {
                    _super.call(this, backend, defaultOptions);
                }
                /**
                 * Performs any type of http request. First argument is required, and can either be a url or
                 * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
                 * object can be provided as the 2nd argument. The options object will be merged with the values
                 * of {@link BaseRequestOptions} before performing the request.
                 */
                Jsonp.prototype.request = function (url, options) {
                    var responseObservable;
                    if (lang_1.isString(url)) {
                        url =
                            new static_request_1.Request(mergeOptions(this._defaultOptions, options, enums_1.RequestMethod.Get, url));
                    }
                    if (url instanceof static_request_1.Request) {
                        if (url.method !== enums_1.RequestMethod.Get) {
                            exceptions_1.makeTypeError('JSONP requests must use GET request method.');
                        }
                        responseObservable = httpRequest(this._backend, url);
                    }
                    else {
                        throw exceptions_1.makeTypeError('First argument must be a url string or Request instance.');
                    }
                    return responseObservable;
                };
                Jsonp = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [interfaces_1.ConnectionBackend, base_request_options_1.RequestOptions])
                ], Jsonp);
                return Jsonp;
            }(Http));
            exports_1("Jsonp", Jsonp);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2h0dHAvaHR0cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBVUEscUJBQXFCLE9BQTBCLEVBQUUsT0FBZ0I7UUFDL0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDcEQsQ0FBQztJQUVELHNCQUFzQixXQUErQixFQUFFLFlBQWdDLEVBQ2pFLE1BQXFCLEVBQUUsR0FBVztRQUN0RCxJQUFJLFVBQVUsR0FBRyxXQUFXLENBQUM7UUFDN0IsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIseUNBQXlDO1lBQ3pDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUkscUNBQWMsQ0FBQztnQkFDekMsTUFBTSxFQUFFLFlBQVksQ0FBQyxNQUFNLElBQUksTUFBTTtnQkFDckMsR0FBRyxFQUFFLFlBQVksQ0FBQyxHQUFHLElBQUksR0FBRztnQkFDNUIsTUFBTSxFQUFFLFlBQVksQ0FBQyxNQUFNO2dCQUMzQixPQUFPLEVBQUUsWUFBWSxDQUFDLE9BQU87Z0JBQzdCLElBQUksRUFBRSxZQUFZLENBQUMsSUFBSTthQUN4QixDQUFDLENBQUMsQ0FBQztRQUNOLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLHFDQUFjLENBQUMsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUUsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxxQ0FBYyxDQUFDLEVBQUMsR0FBRyxFQUFF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QUcsRUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUMvRixDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLEdBQUcsWUFBWSx3QkFBTyxDQUFDLENBQUMsQ0FBQzt3QkFDM0IsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sS0FBSyxxQkFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7NEJBQ3JDLDBCQUFhLENBQUMsNkNBQTZDLENBQUMsQ0FBQzt3QkFDL0QsQ0FBQzt3QkFDRCxrQkFBa0IsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDdkQsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixNQUFNLDBCQUFhLENBQUMsMERBQTBELENBQUMsQ0FBQztvQkFDbEYsQ0FBQztvQkFDRCxNQUFNLENBQUMsa0JBQWtCLENBQUM7Z0JBQzVCLENBQUM7Z0JBM0JIO29CQUFDLGlCQUFVLEVBQUU7O3lCQUFBO2dCQTRCYixZQUFDO1lBQUQsQ0EzQkEsQUEyQkMsQ0EzQjBCLElBQUksR0EyQjlCO1lBM0JELHlCQTJCQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2h0dHAvaHR0cC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNTdHJpbmcsIGlzUHJlc2VudCwgaXNCbGFua30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7bWFrZVR5cGVFcnJvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1JlcXVlc3RPcHRpb25zQXJncywgQ29ubmVjdGlvbiwgQ29ubmVjdGlvbkJhY2tlbmR9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQge1JlcXVlc3R9IGZyb20gJy4vc3RhdGljX3JlcXVlc3QnO1xuaW1wb3J0IHtSZXNwb25zZX0gZnJvbSAnLi9zdGF0aWNfcmVzcG9uc2UnO1xuaW1wb3J0IHtCYXNlUmVxdWVzdE9wdGlvbnMsIFJlcXVlc3RPcHRpb25zfSBmcm9tICcuL2Jhc2VfcmVxdWVzdF9vcHRpb25zJztcbmltcG9ydCB7UmVxdWVzdE1ldGhvZH0gZnJvbSAnLi9lbnVtcyc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmZ1bmN0aW9uIGh0dHBSZXF1ZXN0KGJhY2tlbmQ6IENvbm5lY3Rpb25CYWNrZW5kLCByZXF1ZXN0OiBSZXF1ZXN0KTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xuICByZXR1cm4gYmFja2VuZC5jcmVhdGVDb25uZWN0aW9uKHJlcXVlc3QpLnJlc3BvbnNlO1xufVxuXG5mdW5jdGlvbiBtZXJnZU9wdGlvbnMoZGVmYXVsdE9wdHM6IEJhc2VSZXF1ZXN0T3B0aW9ucywgcHJvdmlkZWRPcHRzOiBSZXF1ZXN0T3B0aW9uc0FyZ3MsXG4gICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBSZXF1ZXN0TWV0aG9kLCB1cmw6IHN0cmluZyk6IFJlcXVlc3RPcHRpb25zIHtcbiAgdmFyIG5ld09wdGlvbnMgPSBkZWZhdWx0T3B0cztcbiAgaWYgKGlzUHJlc2VudChwcm92aWRlZE9wdHMpKSB7XG4gICAgLy8gSGFjayBzbyBEYXJ0IGNhbiB1c2VkIG5hbWVkIHBhcmFtZXRlcnNcbiAgICByZXR1cm4gbmV3T3B0aW9ucy5tZXJnZShuZXcgUmVxdWVzdE9wdGlvbnMoe1xuICAgICAgbWV0aG9kOiBwcm92aWRlZE9wdHMubWV0aG9kIHx8IG1ldGhvZCxcbiAgICAgIHVybDogcHJvdmlkZWRPcHRzLnVybCB8fCB1cmwsXG4gICAgICBzZWFyY2g6IHByb3ZpZGVkT3B0cy5zZWFyY2gsXG4gICAgICBoZWFkZXJzOiBwcm92aWRlZE9wdHMuaGVhZGVycyxcbiAgICAgIGJvZHk6IHByb3ZpZGVkT3B0cy5ib2R5XG4gICAgfSkpO1xuICB9XG4gIGlmIChpc1ByZXNlbnQobWV0aG9kKSkge1xuICAgIHJldHVybiBuZXdPcHRpb25zLm1lcmdlKG5ldyBSZXF1ZXN0T3B0aW9ucyh7bWV0aG9kOiBtZXRob2QsIHVybDogdXJsfSkpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXdPcHRpb25zLm1lcmdlKG5ldyBSZXF1ZXN0T3B0aW9ucyh7dXJsOiB1cmx9KSk7XG4gIH1cbn1cblxuLyoqXG4gKiBQZXJmb3JtcyBodHRwIHJlcXVlc3RzIHVzaW5nIGBYTUxIdHRwUmVxdWVzdGAgYXMgdGhlIGRlZmF1bHQgYmFja2VuZC5cbiAqXG4gKiBgSHR0cGAgaXMgYXZhaWxhYmxlIGFzIGFuIGluamVjdGFibGUgY2xhc3MsIHdpdGggbWV0aG9kcyB0byBwZXJmb3JtIGh0dHAgcmVxdWVzdHMuIENhbGxpbmdcbiAqIGByZXF1ZXN0YCByZXR1cm5zIGFuIGBPYnNlcnZhYmxlYCB3aGljaCB3aWxsIGVtaXQgYSBzaW5nbGUge0BsaW5rIFJlc3BvbnNlfSB3aGVuIGFcbiAqIHJlc3BvbnNlIGlzIHJlY2VpdmVkLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHtIdHRwLCBIVFRQX1BST1ZJREVSU30gZnJvbSAnYW5ndWxhcjIvaHR0cCc7XG4gKiBAQ29tcG9uZW50KHtcbiAqICAgc2VsZWN0b3I6ICdodHRwLWFwcCcsXG4gKiAgIHZpZXdQcm92aWRlcnM6IFtIVFRQX1BST1ZJREVSU10sXG4gKiAgIHRlbXBsYXRlVXJsOiAncGVvcGxlLmh0bWwnXG4gKiB9KVxuICogY2xhc3MgUGVvcGxlQ29tcG9uZW50IHtcbiAqICAgY29uc3RydWN0b3IoaHR0cDogSHR0cCkge1xuICogICAgIGh0dHAuZ2V0KCdwZW9wbGUuanNvbicpXG4gKiAgICAgICAvLyBDYWxsIG1hcCBvbiB0aGUgcmVzcG9uc2Ugb2JzZXJ2YWJsZSB0byBnZXQgdGhlIHBhcnNlZCBwZW9wbGUgb2JqZWN0XG4gKiAgICAgICAubWFwKHJlcyA9PiByZXMuanNvbigpKVxuICogICAgICAgLy8gU3Vic2NyaWJlIHRvIHRoZSBvYnNlcnZhYmxlIHRvIGdldCB0aGUgcGFyc2VkIHBlb3BsZSBvYmplY3QgYW5kIGF0dGFjaCBpdCB0byB0aGVcbiAqICAgICAgIC8vIGNvbXBvbmVudFxuICogICAgICAgLnN1YnNjcmliZShwZW9wbGUgPT4gdGhpcy5wZW9wbGUgPSBwZW9wbGUpO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGBcbiAqIGh0dHAuZ2V0KCdwZW9wbGUuanNvbicpLm9ic2VydmVyKHtuZXh0OiAodmFsdWUpID0+IHRoaXMucGVvcGxlID0gdmFsdWV9KTtcbiAqIGBgYFxuICpcbiAqIFRoZSBkZWZhdWx0IGNvbnN0cnVjdCB1c2VkIHRvIHBlcmZvcm0gcmVxdWVzdHMsIGBYTUxIdHRwUmVxdWVzdGAsIGlzIGFic3RyYWN0ZWQgYXMgYSBcIkJhY2tlbmRcIiAoXG4gKiB7QGxpbmsgWEhSQmFja2VuZH0gaW4gdGhpcyBjYXNlKSwgd2hpY2ggY291bGQgYmUgbW9ja2VkIHdpdGggZGVwZW5kZW5jeSBpbmplY3Rpb24gYnkgcmVwbGFjaW5nXG4gKiB0aGUge0BsaW5rIFhIUkJhY2tlbmR9IHByb3ZpZGVyLCBhcyBpbiB0aGUgZm9sbG93aW5nIGV4YW1wbGU6XG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQge0Jhc2VSZXF1ZXN0T3B0aW9ucywgSHR0cH0gZnJvbSAnYW5ndWxhcjIvaHR0cCc7XG4gKiBpbXBvcnQge01vY2tCYWNrZW5kfSBmcm9tICdhbmd1bGFyMi9odHRwL3Rlc3RpbmcnO1xuICogdmFyIGluamVjdG9yID0gSW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZShbXG4gKiAgIEJhc2VSZXF1ZXN0T3B0aW9ucyxcbiAqICAgTW9ja0JhY2tlbmQsXG4gKiAgIHByb3ZpZGUoSHR0cCwge3VzZUZhY3Rvcnk6XG4gKiAgICAgICBmdW5jdGlvbihiYWNrZW5kLCBkZWZhdWx0T3B0aW9ucykge1xuICogICAgICAgICByZXR1cm4gbmV3IEh0dHAoYmFja2VuZCwgZGVmYXVsdE9wdGlvbnMpO1xuICogICAgICAgfSxcbiAqICAgICAgIGRlcHM6IFtNb2NrQmFja2VuZCwgQmFzZVJlcXVlc3RPcHRpb25zXX0pXG4gKiBdKTtcbiAqIHZhciBodHRwID0gaW5qZWN0b3IuZ2V0KEh0dHApO1xuICogaHR0cC5nZXQoJ3JlcXVlc3QtZnJvbS1tb2NrLWJhY2tlbmQuanNvbicpLnN1YnNjcmliZSgocmVzOlJlc3BvbnNlKSA9PiBkb1NvbWV0aGluZyhyZXMpKTtcbiAqIGBgYFxuICpcbiAqKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIdHRwIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9iYWNrZW5kOiBDb25uZWN0aW9uQmFja2VuZCwgcHJvdGVjdGVkIF9kZWZhdWx0T3B0aW9uczogUmVxdWVzdE9wdGlvbnMpIHt9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGFueSB0eXBlIG9mIGh0dHAgcmVxdWVzdC4gRmlyc3QgYXJndW1lbnQgaXMgcmVxdWlyZWQsIGFuZCBjYW4gZWl0aGVyIGJlIGEgdXJsIG9yXG4gICAqIGEge0BsaW5rIFJlcXVlc3R9IGluc3RhbmNlLiBJZiB0aGUgZmlyc3QgYXJndW1lbnQgaXMgYSB1cmwsIGFuIG9wdGlvbmFsIHtAbGluayBSZXF1ZXN0T3B0aW9uc31cbiAgICogb2JqZWN0IGNhbiBiZSBwcm92aWRlZCBhcyB0aGUgMm5kIGFyZ3VtZW50LiBUaGUgb3B0aW9ucyBvYmplY3Qgd2lsbCBiZSBtZXJnZWQgd2l0aCB0aGUgdmFsdWVzXG4gICAqIG9mIHtAbGluayBCYXNlUmVxdWVzdE9wdGlvbnN9IGJlZm9yZSBwZXJmb3JtaW5nIHRoZSByZXF1ZXN0LlxuICAgKi9cbiAgcmVxdWVzdCh1cmw6IHN0cmluZyB8IFJlcXVlc3QsIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9uc0FyZ3MpOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XG4gICAgdmFyIHJlc3BvbnNlT2JzZXJ2YWJsZTogYW55O1xuICAgIGlmIChpc1N0cmluZyh1cmwpKSB7XG4gICAgICByZXNwb25zZU9ic2VydmFibGUgPSBodHRwUmVxdWVzdChcbiAgICAgICAgICB0aGlzLl9iYWNrZW5kLFxuICAgICAgICAgIG5ldyBSZXF1ZXN0KG1lcmdlT3B0aW9ucyh0aGlzLl9kZWZhdWx0T3B0aW9ucywgb3B0aW9ucywgUmVxdWVzdE1ldGhvZC5HZXQsIDxzdHJpbmc+dXJsKSkpO1xuICAgIH0gZWxzZSBpZiAodXJsIGluc3RhbmNlb2YgUmVxdWVzdCkge1xuICAgICAgcmVzcG9uc2VPYnNlcnZhYmxlID0gaHR0cFJlcXVlc3QodGhpcy5fYmFja2VuZCwgdXJsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbWFrZVR5cGVFcnJvcignRmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHVybCBzdHJpbmcgb3IgUmVxdWVzdCBpbnN0YW5jZS4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3BvbnNlT2JzZXJ2YWJsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIHJlcXVlc3Qgd2l0aCBgZ2V0YCBodHRwIG1ldGhvZC5cbiAgICovXG4gIGdldCh1cmw6IHN0cmluZywgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zQXJncyk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICByZXR1cm4gaHR0cFJlcXVlc3QodGhpcy5fYmFja2VuZCwgbmV3IFJlcXVlc3QobWVyZ2VPcHRpb25zKHRoaXMuX2RlZmF1bHRPcHRpb25zLCBvcHRpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVxdWVzdE1ldGhvZC5HZXQsIHVybCkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIHJlcXVlc3Qgd2l0aCBgcG9zdGAgaHR0cCBtZXRob2QuXG4gICAqL1xuICBwb3N0KHVybDogc3RyaW5nLCBib2R5OiBzdHJpbmcsIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9uc0FyZ3MpOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIGh0dHBSZXF1ZXN0KFxuICAgICAgICB0aGlzLl9iYWNrZW5kLFxuICAgICAgICBuZXcgUmVxdWVzdChtZXJnZU9wdGlvbnModGhpcy5fZGVmYXVsdE9wdGlvbnMubWVyZ2UobmV3IFJlcXVlc3RPcHRpb25zKHtib2R5OiBib2R5fSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucywgUmVxdWVzdE1ldGhvZC5Qb3N0LCB1cmwpKSk7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSByZXF1ZXN0IHdpdGggYHB1dGAgaHR0cCBtZXRob2QuXG4gICAqL1xuICBwdXQodXJsOiBzdHJpbmcsIGJvZHk6IHN0cmluZywgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zQXJncyk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICByZXR1cm4gaHR0cFJlcXVlc3QoXG4gICAgICAgIHRoaXMuX2JhY2tlbmQsXG4gICAgICAgIG5ldyBSZXF1ZXN0KG1lcmdlT3B0aW9ucyh0aGlzLl9kZWZhdWx0T3B0aW9ucy5tZXJnZShuZXcgUmVxdWVzdE9wdGlvbnMoe2JvZHk6IGJvZHl9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLCBSZXF1ZXN0TWV0aG9kLlB1dCwgdXJsKSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgcmVxdWVzdCB3aXRoIGBkZWxldGVgIGh0dHAgbWV0aG9kLlxuICAgKi9cbiAgZGVsZXRlICh1cmw6IHN0cmluZywgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zQXJncyk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICByZXR1cm4gaHR0cFJlcXVlc3QodGhpcy5fYmFja2VuZCwgbmV3IFJlcXVlc3QobWVyZ2VPcHRpb25zKHRoaXMuX2RlZmF1bHRPcHRpb25zLCBvcHRpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVxdWVzdE1ldGhvZC5EZWxldGUsIHVybCkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIHJlcXVlc3Qgd2l0aCBgcGF0Y2hgIGh0dHAgbWV0aG9kLlxuICAgKi9cbiAgcGF0Y2godXJsOiBzdHJpbmcsIGJvZHk6IHN0cmluZywgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zQXJncyk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICByZXR1cm4gaHR0cFJlcXVlc3QoXG4gICAgICAgIHRoaXMuX2JhY2tlbmQsXG4gICAgICAgIG5ldyBSZXF1ZXN0KG1lcmdlT3B0aW9ucyh0aGlzLl9kZWZhdWx0T3B0aW9ucy5tZXJnZShuZXcgUmVxdWVzdE9wdGlvbnMoe2JvZHk6IGJvZHl9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLCBSZXF1ZXN0TWV0aG9kLlBhdGNoLCB1cmwpKSk7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSByZXF1ZXN0IHdpdGggYGhlYWRgIGh0dHAgbWV0aG9kLlxuICAgKi9cbiAgaGVhZCh1cmw6IHN0cmluZywgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zQXJncyk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICByZXR1cm4gaHR0cFJlcXVlc3QodGhpcy5fYmFja2VuZCwgbmV3IFJlcXVlc3QobWVyZ2VPcHRpb25zKHRoaXMuX2RlZmF1bHRPcHRpb25zLCBvcHRpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVxdWVzdE1ldGhvZC5IZWFkLCB1cmwpKSk7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEpzb25wIGV4dGVuZHMgSHR0cCB7XG4gIGNvbnN0cnVjdG9yKGJhY2tlbmQ6IENvbm5lY3Rpb25CYWNrZW5kLCBkZWZhdWx0T3B0aW9uczogUmVxdWVzdE9wdGlvbnMpIHtcbiAgICBzdXBlcihiYWNrZW5kLCBkZWZhdWx0T3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYW55IHR5cGUgb2YgaHR0cCByZXF1ZXN0LiBGaXJzdCBhcmd1bWVudCBpcyByZXF1aXJlZCwgYW5kIGNhbiBlaXRoZXIgYmUgYSB1cmwgb3JcbiAgICogYSB7QGxpbmsgUmVxdWVzdH0gaW5zdGFuY2UuIElmIHRoZSBmaXJzdCBhcmd1bWVudCBpcyBhIHVybCwgYW4gb3B0aW9uYWwge0BsaW5rIFJlcXVlc3RPcHRpb25zfVxuICAgKiBvYmplY3QgY2FuIGJlIHByb3ZpZGVkIGFzIHRoZSAybmQgYXJndW1lbnQuIFRoZSBvcHRpb25zIG9iamVjdCB3aWxsIGJlIG1lcmdlZCB3aXRoIHRoZSB2YWx1ZXNcbiAgICogb2Yge0BsaW5rIEJhc2VSZXF1ZXN0T3B0aW9uc30gYmVmb3JlIHBlcmZvcm1pbmcgdGhlIHJlcXVlc3QuXG4gICAqL1xuICByZXF1ZXN0KHVybDogc3RyaW5nIHwgUmVxdWVzdCwgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zQXJncyk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICB2YXIgcmVzcG9uc2VPYnNlcnZhYmxlOiBhbnk7XG4gICAgaWYgKGlzU3RyaW5nKHVybCkpIHtcbiAgICAgIHVybCA9XG4gICAgICAgICAgbmV3IFJlcXVlc3QobWVyZ2VPcHRpb25zKHRoaXMuX2RlZmF1bHRPcHRpb25zLCBvcHRpb25zLCBSZXF1ZXN0TWV0aG9kLkdldCwgPHN0cmluZz51cmwpKTtcbiAgICB9XG4gICAgaWYgKHVybCBpbnN0YW5jZW9mIFJlcXVlc3QpIHtcbiAgICAgIGlmICh1cmwubWV0aG9kICE9PSBSZXF1ZXN0TWV0aG9kLkdldCkge1xuICAgICAgICBtYWtlVHlwZUVycm9yKCdKU09OUCByZXF1ZXN0cyBtdXN0IHVzZSBHRVQgcmVxdWVzdCBtZXRob2QuJyk7XG4gICAgICB9XG4gICAgICByZXNwb25zZU9ic2VydmFibGUgPSBodHRwUmVxdWVzdCh0aGlzLl9iYWNrZW5kLCB1cmwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBtYWtlVHlwZUVycm9yKCdGaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgdXJsIHN0cmluZyBvciBSZXF1ZXN0IGluc3RhbmNlLicpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzcG9uc2VPYnNlcnZhYmxlO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
