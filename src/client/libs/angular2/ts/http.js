System.register(['angular2/core', './src/http/http', './src/http/backends/xhr_backend', './src/http/backends/jsonp_backend', './src/http/backends/browser_xhr', './src/http/backends/browser_jsonp', './src/http/base_request_options', './src/http/base_response_options', './src/http/static_request', './src/http/static_response', './src/http/interfaces', './src/http/headers', './src/http/enums', './src/http/url_search_params'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, http_1, xhr_backend_1, jsonp_backend_1, browser_xhr_1, browser_jsonp_1, base_request_options_1, base_response_options_1;
    var HTTP_PROVIDERS, HTTP_BINDINGS, JSONP_PROVIDERS, JSON_BINDINGS;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                exports_1({
                    "Http": http_1_1["Http"],
                    "Jsonp": http_1_1["Jsonp"]
                });
            },
            function (xhr_backend_1_1) {
                xhr_backend_1 = xhr_backend_1_1;
                exports_1({
                    "XHRBackend": xhr_backend_1_1["XHRBackend"],
                    "XHRConnection": xhr_backend_1_1["XHRConnection"]
                });
            },
            function (jsonp_backend_1_1) {
                jsonp_backend_1 = jsonp_backend_1_1;
                exports_1({
                    "JSONPBackend": jsonp_backend_1_1["JSONPBackend"],
                    "JSONPConnection": jsonp_backend_1_1["JSONPConnection"]
                });
            },
            function (browser_xhr_1_1) {
                browser_xhr_1 = browser_xhr_1_1;
                exports_1({
                    "BrowserXhr": browser_xhr_1_1["BrowserXhr"]
                });
            },
            function (browser_jsonp_1_1) {
                browser_jsonp_1 = browser_jsonp_1_1;
            },
            function (base_request_options_1_1) {
                base_request_options_1 = base_request_options_1_1;
                exports_1({
                    "BaseRequestOptions": base_request_options_1_1["BaseRequestOptions"],
                    "RequestOptions": base_request_options_1_1["RequestOptions"]
                });
            },
            function (base_response_options_1_1) {
                base_response_options_1 = base_response_options_1_1;
                exports_1({
                    "BaseResponseOptions": base_response_options_1_1["BaseResponseOptions"],
                    "ResponseOptions": base_response_options_1_1["ResponseOptions"]
                });
            },
            function (static_request_1_1) {
                exports_1({
                    "Request": static_request_1_1["Request"]
                });
            },
            function (static_response_1_1) {
                exports_1({
                    "Response": static_response_1_1["Response"]
                });
            },
            function (interfaces_1_1) {
                exports_1({
                    "RequestOptionsArgs": interfaces_1_1["RequestOptionsArgs"],
                    "ResponseOptionsArgs": interfaces_1_1["ResponseOptionsArgs"],
                    "Connection": interfaces_1_1["Connection"],
                    "ConnectionBackend": interfaces_1_1["ConnectionBackend"]
                });
            },
            function (headers_1_1) {
                exports_1({
                    "Headers": headers_1_1["Headers"]
                });
            },
            function (enums_1_1) {
                exports_1({
                    "ResponseType": enums_1_1["ResponseType"],
                    "ReadyState": enums_1_1["ReadyState"],
                    "RequestMethod": enums_1_1["RequestMethod"]
                });
            },
            function (url_search_params_1_1) {
                exports_1({
                    "URLSearchParams": url_search_params_1_1["URLSearchParams"]
                });
            }],
        execute: function() {
            /**
             * Provides a basic set of injectables to use the {@link Http} service in any application.
             *
             * The `HTTP_PROVIDERS` should be included either in a component's injector,
             * or in the root injector when bootstrapping an application.
             *
             * ### Example ([live demo](http://plnkr.co/edit/snj7Nv?p=preview))
             *
             * ```
             * import {Component} from 'angular2/core';
             * import {bootstrap} from 'angular2/platform/browser';
             * import {NgFor} from 'angular2/common';
             * import {HTTP_PROVIDERS, Http} from 'angular2/http';
             *
             * @Component({
             *   selector: 'app',
             *   providers: [HTTP_PROVIDERS],
             *   template: `
             *     <div>
             *       <h1>People</h1>
             *       <ul>
             *         <li *ngFor="#person of people">
             *           {{person.name}}
             *         </li>
             *       </ul>
             *     </div>
             *   `,
             *   directives: [NgFor]
             * })
             * export class App {
             *   people: Object[];
             *   constructor(http:Http) {
             *     http.get('people.json').subscribe(res => {
             *       this.people = res.json();
             *     });
             *   }
             *   active:boolean = false;
             *   toggleActiveState() {
             *     this.active = !this.active;
             *   }
             * }
             *
             * bootstrap(App)
             *   .catch(err => console.error(err));
             * ```
             *
             * The primary public API included in `HTTP_PROVIDERS` is the {@link Http} class.
             * However, other providers required by `Http` are included,
             * which may be beneficial to override in certain cases.
             *
             * The providers included in `HTTP_PROVIDERS` include:
             *  * {@link Http}
             *  * {@link XHRBackend}
             *  * `BrowserXHR` - Private factory to create `XMLHttpRequest` instances
             *  * {@link RequestOptions} - Bound to {@link BaseRequestOptions} class
             *  * {@link ResponseOptions} - Bound to {@link BaseResponseOptions} class
             *
             * There may be cases where it makes sense to extend the base request options,
             * such as to add a search string to be appended to all URLs.
             * To accomplish this, a new provider for {@link RequestOptions} should
             * be added in the same injector as `HTTP_PROVIDERS`.
             *
             * ### Example ([live demo](http://plnkr.co/edit/aCMEXi?p=preview))
             *
             * ```
             * import {provide} from 'angular2/core';
             * import {bootstrap} from 'angular2/platform/browser';
             * import {HTTP_PROVIDERS, BaseRequestOptions, RequestOptions} from 'angular2/http';
             *
             * class MyOptions extends BaseRequestOptions {
             *   search: string = 'coreTeam=true';
             * }
             *
             * bootstrap(App, [HTTP_PROVIDERS, provide(RequestOptions, {useClass: MyOptions})])
             *   .catch(err => console.error(err));
             * ```
             *
             * Likewise, to use a mock backend for unit tests, the {@link XHRBackend}
             * provider should be bound to {@link MockBackend}.
             *
             * ### Example ([live demo](http://plnkr.co/edit/7LWALD?p=preview))
             *
             * ```
             * import {provide} from 'angular2/core';
             * import {bootstrap} from 'angular2/platform/browser';
             * import {HTTP_PROVIDERS, Http, Response, XHRBackend} from 'angular2/http';
             * import {MockBackend} from 'angular2/http/testing';
             *
             * var people = [{name: 'Jeff'}, {name: 'Tobias'}];
             *
             * var injector = Injector.resolveAndCreate([
             *   HTTP_PROVIDERS,
             *   MockBackend,
             *   provide(XHRBackend, {useExisting: MockBackend})
             * ]);
             * var http = injector.get(Http);
             * var backend = injector.get(MockBackend);
             *
             * // Listen for any new requests
             * backend.connections.observer({
             *   next: connection => {
             *     var response = new Response({body: people});
             *     setTimeout(() => {
             *       // Send a response to the request
             *       connection.mockRespond(response);
             *     });
             *   }
             * });
             *
             * http.get('people.json').observer({
             *   next: res => {
             *     // Response came from mock backend
             *     console.log('first person', res.json()[0].name);
             *   }
             * });
             * ```
             */
            exports_1("HTTP_PROVIDERS", HTTP_PROVIDERS = [
                // TODO(pascal): use factory type annotations once supported in DI
                // issue: https://github.com/angular/angular/issues/3183
                core_1.provide(http_1.Http, {
                    useFactory: function (xhrBackend, requestOptions) {
                        return new http_1.Http(xhrBackend, requestOptions);
                    },
                    deps: [xhr_backend_1.XHRBackend, base_request_options_1.RequestOptions]
                }),
                browser_xhr_1.BrowserXhr,
                core_1.provide(base_request_options_1.RequestOptions, { useClass: base_request_options_1.BaseRequestOptions }),
                core_1.provide(base_response_options_1.ResponseOptions, { useClass: base_response_options_1.BaseResponseOptions }),
                xhr_backend_1.XHRBackend
            ]);
            /**
             * See {@link HTTP_PROVIDERS} instead.
             *
             * @deprecated
             */
            exports_1("HTTP_BINDINGS", HTTP_BINDINGS = HTTP_PROVIDERS);
            /**
             * Provides a basic set of providers to use the {@link Jsonp} service in any application.
             *
             * The `JSONP_PROVIDERS` should be included either in a component's injector,
             * or in the root injector when bootstrapping an application.
             *
             * ### Example ([live demo](http://plnkr.co/edit/vmeN4F?p=preview))
             *
             * ```
             * import {Component} from 'angular2/core';
             * import {NgFor} from 'angular2/common';
             * import {JSONP_PROVIDERS, Jsonp} from 'angular2/http';
             *
             * @Component({
             *   selector: 'app',
             *   providers: [JSONP_PROVIDERS],
             *   template: `
             *     <div>
             *       <h1>People</h1>
             *       <ul>
             *         <li *ngFor="#person of people">
             *           {{person.name}}
             *         </li>
             *       </ul>
             *     </div>
             *   `,
             *   directives: [NgFor]
             * })
             * export class App {
             *   people: Array<Object>;
             *   constructor(jsonp:Jsonp) {
             *     jsonp.request('people.json').subscribe(res => {
             *       this.people = res.json();
             *     })
             *   }
             * }
             * ```
             *
             * The primary public API included in `JSONP_PROVIDERS` is the {@link Jsonp} class.
             * However, other providers required by `Jsonp` are included,
             * which may be beneficial to override in certain cases.
             *
             * The providers included in `JSONP_PROVIDERS` include:
             *  * {@link Jsonp}
             *  * {@link JSONPBackend}
             *  * `BrowserJsonp` - Private factory
             *  * {@link RequestOptions} - Bound to {@link BaseRequestOptions} class
             *  * {@link ResponseOptions} - Bound to {@link BaseResponseOptions} class
             *
             * There may be cases where it makes sense to extend the base request options,
             * such as to add a search string to be appended to all URLs.
             * To accomplish this, a new provider for {@link RequestOptions} should
             * be added in the same injector as `JSONP_PROVIDERS`.
             *
             * ### Example ([live demo](http://plnkr.co/edit/TFug7x?p=preview))
             *
             * ```
             * import {provide} from 'angular2/core';
             * import {bootstrap} from 'angular2/platform/browser';
             * import {JSONP_PROVIDERS, BaseRequestOptions, RequestOptions} from 'angular2/http';
             *
             * class MyOptions extends BaseRequestOptions {
             *   search: string = 'coreTeam=true';
             * }
             *
             * bootstrap(App, [JSONP_PROVIDERS, provide(RequestOptions, {useClass: MyOptions})])
             *   .catch(err => console.error(err));
             * ```
             *
             * Likewise, to use a mock backend for unit tests, the {@link JSONPBackend}
             * provider should be bound to {@link MockBackend}.
             *
             * ### Example ([live demo](http://plnkr.co/edit/HDqZWL?p=preview))
             *
             * ```
             * import {provide, Injector} from 'angular2/core';
             * import {JSONP_PROVIDERS, Jsonp, Response, JSONPBackend} from 'angular2/http';
             * import {MockBackend} from 'angular2/http/testing';
             *
             * var people = [{name: 'Jeff'}, {name: 'Tobias'}];
             * var injector = Injector.resolveAndCreate([
             *   JSONP_PROVIDERS,
             *   MockBackend,
             *   provide(JSONPBackend, {useExisting: MockBackend})
             * ]);
             * var jsonp = injector.get(Jsonp);
             * var backend = injector.get(MockBackend);
             *
             * // Listen for any new requests
             * backend.connections.observer({
             *   next: connection => {
             *     var response = new Response({body: people});
             *     setTimeout(() => {
             *       // Send a response to the request
             *       connection.mockRespond(response);
             *     });
             *   }
             * });
            
             * jsonp.get('people.json').observer({
             *   next: res => {
             *     // Response came from mock backend
             *     console.log('first person', res.json()[0].name);
             *   }
             * });
             * ```
             */
            exports_1("JSONP_PROVIDERS", JSONP_PROVIDERS = [
                // TODO(pascal): use factory type annotations once supported in DI
                // issue: https://github.com/angular/angular/issues/3183
                core_1.provide(http_1.Jsonp, {
                    useFactory: function (jsonpBackend, requestOptions) {
                        return new http_1.Jsonp(jsonpBackend, requestOptions);
                    },
                    deps: [jsonp_backend_1.JSONPBackend, base_request_options_1.RequestOptions]
                }),
                browser_jsonp_1.BrowserJsonp,
                core_1.provide(base_request_options_1.RequestOptions, { useClass: base_request_options_1.BaseRequestOptions }),
                core_1.provide(base_response_options_1.ResponseOptions, { useClass: base_response_options_1.BaseResponseOptions }),
                core_1.provide(jsonp_backend_1.JSONPBackend, { useClass: jsonp_backend_1.JSONPBackend_ })
            ]);
            /**
             * See {@link JSONP_PROVIDERS} instead.
             *
             * @deprecated
             */
            exports_1("JSON_BINDINGS", JSON_BINDINGS = JSONP_PROVIDERS);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvaHR0cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBMEphLGNBQWMsRUFvQmQsYUFBYSxFQTZHYixlQUFlLEVBb0JmLGFBQWE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBMVExQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFvSEc7WUFDVSw0QkFBQSxjQUFjLEdBQVU7Z0JBQ25DLGtFQUFrRTtnQkFDbEUsd0RBQXdEO2dCQUN4RCxjQUFPLENBQUMsV0FBSSxFQUNKO29CQUNFLFVBQVUsRUFBRSxVQUFDLFVBQXNCLEVBQUUsY0FBOEI7d0JBQ25ELE9BQUEsSUFBSSxXQUFJLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQztvQkFBcEMsQ0FBb0M7b0JBQ3BELElBQUksRUFBRSxDQUFDLHdCQUFVLEVBQUUscUNBQWMsQ0FBQztpQkFDbkMsQ0FBQztnQkFDVix3QkFBVTtnQkFDVixjQUFPLENBQUMscUNBQWMsRUFBRSxFQUFDLFFBQVEsRUFBRSx5Q0FBa0IsRUFBQyxDQUFDO2dCQUN2RCxjQUFPLENBQUMsdUNBQWUsRUFBRSxFQUFDLFFBQVEsRUFBRSwyQ0FBbUIsRUFBQyxDQUFDO2dCQUN6RCx3QkFBVTthQUNYLENBQUEsQ0FBQztZQUVGOzs7O2VBSUc7WUFDVSwyQkFBQSxhQUFhLEdBQUcsY0FBYyxDQUFBLENBQUM7WUFFNUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUEwR0c7WUFDVSw2QkFBQSxlQUFlLEdBQVU7Z0JBQ3BDLGtFQUFrRTtnQkFDbEUsd0RBQXdEO2dCQUN4RCxjQUFPLENBQUMsWUFBSyxFQUNMO29CQUNFLFVBQVUsRUFBRSxVQUFDLFlBQTBCLEVBQUUsY0FBOEI7d0JBQ3ZELE9BQUEsSUFBSSxZQUFLLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQztvQkFBdkMsQ0FBdUM7b0JBQ3ZELElBQUksRUFBRSxDQUFDLDRCQUFZLEVBQUUscUNBQWMsQ0FBQztpQkFDckMsQ0FBQztnQkFDViw0QkFBWTtnQkFDWixjQUFPLENBQUMscUNBQWMsRUFBRSxFQUFDLFFBQVEsRUFBRSx5Q0FBa0IsRUFBQyxDQUFDO2dCQUN2RCxjQUFPLENBQUMsdUNBQWUsRUFBRSxFQUFDLFFBQVEsRUFBRSwyQ0FBbUIsRUFBQyxDQUFDO2dCQUN6RCxjQUFPLENBQUMsNEJBQVksRUFBRSxFQUFDLFFBQVEsRUFBRSw2QkFBYSxFQUFDLENBQUM7YUFDakQsQ0FBQSxDQUFDO1lBRUY7Ozs7ZUFJRztZQUNVLDJCQUFBLGFBQWEsR0FBRyxlQUFlLENBQUEsQ0FBQyIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL2h0dHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBtb2R1bGVcbiAqIEBkZXNjcmlwdGlvblxuICogVGhlIGh0dHAgbW9kdWxlIHByb3ZpZGVzIHNlcnZpY2VzIHRvIHBlcmZvcm0gaHR0cCByZXF1ZXN0cy4gVG8gZ2V0IHN0YXJ0ZWQsIHNlZSB0aGUge0BsaW5rIEh0dHB9XG4gKiBjbGFzcy5cbiAqL1xuaW1wb3J0IHtwcm92aWRlLCBQcm92aWRlcn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0h0dHAsIEpzb25wfSBmcm9tICcuL3NyYy9odHRwL2h0dHAnO1xuaW1wb3J0IHtYSFJCYWNrZW5kLCBYSFJDb25uZWN0aW9ufSBmcm9tICcuL3NyYy9odHRwL2JhY2tlbmRzL3hocl9iYWNrZW5kJztcbmltcG9ydCB7SlNPTlBCYWNrZW5kLCBKU09OUEJhY2tlbmRfLCBKU09OUENvbm5lY3Rpb259IGZyb20gJy4vc3JjL2h0dHAvYmFja2VuZHMvanNvbnBfYmFja2VuZCc7XG5pbXBvcnQge0Jyb3dzZXJYaHJ9IGZyb20gJy4vc3JjL2h0dHAvYmFja2VuZHMvYnJvd3Nlcl94aHInO1xuaW1wb3J0IHtCcm93c2VySnNvbnB9IGZyb20gJy4vc3JjL2h0dHAvYmFja2VuZHMvYnJvd3Nlcl9qc29ucCc7XG5pbXBvcnQge0Jhc2VSZXF1ZXN0T3B0aW9ucywgUmVxdWVzdE9wdGlvbnN9IGZyb20gJy4vc3JjL2h0dHAvYmFzZV9yZXF1ZXN0X29wdGlvbnMnO1xuaW1wb3J0IHtDb25uZWN0aW9uQmFja2VuZH0gZnJvbSAnLi9zcmMvaHR0cC9pbnRlcmZhY2VzJztcbmltcG9ydCB7QmFzZVJlc3BvbnNlT3B0aW9ucywgUmVzcG9uc2VPcHRpb25zfSBmcm9tICcuL3NyYy9odHRwL2Jhc2VfcmVzcG9uc2Vfb3B0aW9ucyc7XG5leHBvcnQge1JlcXVlc3R9IGZyb20gJy4vc3JjL2h0dHAvc3RhdGljX3JlcXVlc3QnO1xuZXhwb3J0IHtSZXNwb25zZX0gZnJvbSAnLi9zcmMvaHR0cC9zdGF0aWNfcmVzcG9uc2UnO1xuXG5leHBvcnQge1xuICBSZXF1ZXN0T3B0aW9uc0FyZ3MsXG4gIFJlc3BvbnNlT3B0aW9uc0FyZ3MsXG4gIENvbm5lY3Rpb24sXG4gIENvbm5lY3Rpb25CYWNrZW5kXG59IGZyb20gJy4vc3JjL2h0dHAvaW50ZXJmYWNlcyc7XG5cbmV4cG9ydCB7QnJvd3Nlclhocn0gZnJvbSAnLi9zcmMvaHR0cC9iYWNrZW5kcy9icm93c2VyX3hocic7XG5leHBvcnQge0Jhc2VSZXF1ZXN0T3B0aW9ucywgUmVxdWVzdE9wdGlvbnN9IGZyb20gJy4vc3JjL2h0dHAvYmFzZV9yZXF1ZXN0X29wdGlvbnMnO1xuZXhwb3J0IHtCYXNlUmVzcG9uc2VPcHRpb25zLCBSZXNwb25zZU9wdGlvbnN9IGZyb20gJy4vc3JjL2h0dHAvYmFzZV9yZXNwb25zZV9vcHRpb25zJztcbmV4cG9ydCB7WEhSQmFja2VuZCwgWEhSQ29ubmVjdGlvbn0gZnJvbSAnLi9zcmMvaHR0cC9iYWNrZW5kcy94aHJfYmFja2VuZCc7XG5leHBvcnQge0pTT05QQmFja2VuZCwgSlNPTlBDb25uZWN0aW9ufSBmcm9tICcuL3NyYy9odHRwL2JhY2tlbmRzL2pzb25wX2JhY2tlbmQnO1xuZXhwb3J0IHtIdHRwLCBKc29ucH0gZnJvbSAnLi9zcmMvaHR0cC9odHRwJztcblxuZXhwb3J0IHtIZWFkZXJzfSBmcm9tICcuL3NyYy9odHRwL2hlYWRlcnMnO1xuXG5leHBvcnQge1Jlc3BvbnNlVHlwZSwgUmVhZHlTdGF0ZSwgUmVxdWVzdE1ldGhvZH0gZnJvbSAnLi9zcmMvaHR0cC9lbnVtcyc7XG5leHBvcnQge1VSTFNlYXJjaFBhcmFtc30gZnJvbSAnLi9zcmMvaHR0cC91cmxfc2VhcmNoX3BhcmFtcyc7XG5cbi8qKlxuICogUHJvdmlkZXMgYSBiYXNpYyBzZXQgb2YgaW5qZWN0YWJsZXMgdG8gdXNlIHRoZSB7QGxpbmsgSHR0cH0gc2VydmljZSBpbiBhbnkgYXBwbGljYXRpb24uXG4gKlxuICogVGhlIGBIVFRQX1BST1ZJREVSU2Agc2hvdWxkIGJlIGluY2x1ZGVkIGVpdGhlciBpbiBhIGNvbXBvbmVudCdzIGluamVjdG9yLFxuICogb3IgaW4gdGhlIHJvb3QgaW5qZWN0b3Igd2hlbiBib290c3RyYXBwaW5nIGFuIGFwcGxpY2F0aW9uLlxuICpcbiAqICMjIyBFeGFtcGxlIChbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC9zbmo3TnY/cD1wcmV2aWV3KSlcbiAqXG4gKiBgYGBcbiAqIGltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbiAqIGltcG9ydCB7Ym9vdHN0cmFwfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9icm93c2VyJztcbiAqIGltcG9ydCB7TmdGb3J9IGZyb20gJ2FuZ3VsYXIyL2NvbW1vbic7XG4gKiBpbXBvcnQge0hUVFBfUFJPVklERVJTLCBIdHRwfSBmcm9tICdhbmd1bGFyMi9odHRwJztcbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICAgc2VsZWN0b3I6ICdhcHAnLFxuICogICBwcm92aWRlcnM6IFtIVFRQX1BST1ZJREVSU10sXG4gKiAgIHRlbXBsYXRlOiBgXG4gKiAgICAgPGRpdj5cbiAqICAgICAgIDxoMT5QZW9wbGU8L2gxPlxuICogICAgICAgPHVsPlxuICogICAgICAgICA8bGkgKm5nRm9yPVwiI3BlcnNvbiBvZiBwZW9wbGVcIj5cbiAqICAgICAgICAgICB7e3BlcnNvbi5uYW1lfX1cbiAqICAgICAgICAgPC9saT5cbiAqICAgICAgIDwvdWw+XG4gKiAgICAgPC9kaXY+XG4gKiAgIGAsXG4gKiAgIGRpcmVjdGl2ZXM6IFtOZ0Zvcl1cbiAqIH0pXG4gKiBleHBvcnQgY2xhc3MgQXBwIHtcbiAqICAgcGVvcGxlOiBPYmplY3RbXTtcbiAqICAgY29uc3RydWN0b3IoaHR0cDpIdHRwKSB7XG4gKiAgICAgaHR0cC5nZXQoJ3Blb3BsZS5qc29uJykuc3Vic2NyaWJlKHJlcyA9PiB7XG4gKiAgICAgICB0aGlzLnBlb3BsZSA9IHJlcy5qc29uKCk7XG4gKiAgICAgfSk7XG4gKiAgIH1cbiAqICAgYWN0aXZlOmJvb2xlYW4gPSBmYWxzZTtcbiAqICAgdG9nZ2xlQWN0aXZlU3RhdGUoKSB7XG4gKiAgICAgdGhpcy5hY3RpdmUgPSAhdGhpcy5hY3RpdmU7XG4gKiAgIH1cbiAqIH1cbiAqXG4gKiBib290c3RyYXAoQXBwKVxuICogICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoZXJyKSk7XG4gKiBgYGBcbiAqXG4gKiBUaGUgcHJpbWFyeSBwdWJsaWMgQVBJIGluY2x1ZGVkIGluIGBIVFRQX1BST1ZJREVSU2AgaXMgdGhlIHtAbGluayBIdHRwfSBjbGFzcy5cbiAqIEhvd2V2ZXIsIG90aGVyIHByb3ZpZGVycyByZXF1aXJlZCBieSBgSHR0cGAgYXJlIGluY2x1ZGVkLFxuICogd2hpY2ggbWF5IGJlIGJlbmVmaWNpYWwgdG8gb3ZlcnJpZGUgaW4gY2VydGFpbiBjYXNlcy5cbiAqXG4gKiBUaGUgcHJvdmlkZXJzIGluY2x1ZGVkIGluIGBIVFRQX1BST1ZJREVSU2AgaW5jbHVkZTpcbiAqICAqIHtAbGluayBIdHRwfVxuICogICoge0BsaW5rIFhIUkJhY2tlbmR9XG4gKiAgKiBgQnJvd3NlclhIUmAgLSBQcml2YXRlIGZhY3RvcnkgdG8gY3JlYXRlIGBYTUxIdHRwUmVxdWVzdGAgaW5zdGFuY2VzXG4gKiAgKiB7QGxpbmsgUmVxdWVzdE9wdGlvbnN9IC0gQm91bmQgdG8ge0BsaW5rIEJhc2VSZXF1ZXN0T3B0aW9uc30gY2xhc3NcbiAqICAqIHtAbGluayBSZXNwb25zZU9wdGlvbnN9IC0gQm91bmQgdG8ge0BsaW5rIEJhc2VSZXNwb25zZU9wdGlvbnN9IGNsYXNzXG4gKlxuICogVGhlcmUgbWF5IGJlIGNhc2VzIHdoZXJlIGl0IG1ha2VzIHNlbnNlIHRvIGV4dGVuZCB0aGUgYmFzZSByZXF1ZXN0IG9wdGlvbnMsXG4gKiBzdWNoIGFzIHRvIGFkZCBhIHNlYXJjaCBzdHJpbmcgdG8gYmUgYXBwZW5kZWQgdG8gYWxsIFVSTHMuXG4gKiBUbyBhY2NvbXBsaXNoIHRoaXMsIGEgbmV3IHByb3ZpZGVyIGZvciB7QGxpbmsgUmVxdWVzdE9wdGlvbnN9IHNob3VsZFxuICogYmUgYWRkZWQgaW4gdGhlIHNhbWUgaW5qZWN0b3IgYXMgYEhUVFBfUFJPVklERVJTYC5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvYUNNRVhpP3A9cHJldmlldykpXG4gKlxuICogYGBgXG4gKiBpbXBvcnQge3Byb3ZpZGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuICogaW1wb3J0IHtib290c3RyYXB9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXInO1xuICogaW1wb3J0IHtIVFRQX1BST1ZJREVSUywgQmFzZVJlcXVlc3RPcHRpb25zLCBSZXF1ZXN0T3B0aW9uc30gZnJvbSAnYW5ndWxhcjIvaHR0cCc7XG4gKlxuICogY2xhc3MgTXlPcHRpb25zIGV4dGVuZHMgQmFzZVJlcXVlc3RPcHRpb25zIHtcbiAqICAgc2VhcmNoOiBzdHJpbmcgPSAnY29yZVRlYW09dHJ1ZSc7XG4gKiB9XG4gKlxuICogYm9vdHN0cmFwKEFwcCwgW0hUVFBfUFJPVklERVJTLCBwcm92aWRlKFJlcXVlc3RPcHRpb25zLCB7dXNlQ2xhc3M6IE15T3B0aW9uc30pXSlcbiAqICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKGVycikpO1xuICogYGBgXG4gKlxuICogTGlrZXdpc2UsIHRvIHVzZSBhIG1vY2sgYmFja2VuZCBmb3IgdW5pdCB0ZXN0cywgdGhlIHtAbGluayBYSFJCYWNrZW5kfVxuICogcHJvdmlkZXIgc2hvdWxkIGJlIGJvdW5kIHRvIHtAbGluayBNb2NrQmFja2VuZH0uXG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0LzdMV0FMRD9wPXByZXZpZXcpKVxuICpcbiAqIGBgYFxuICogaW1wb3J0IHtwcm92aWRlfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbiAqIGltcG9ydCB7Ym9vdHN0cmFwfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9icm93c2VyJztcbiAqIGltcG9ydCB7SFRUUF9QUk9WSURFUlMsIEh0dHAsIFJlc3BvbnNlLCBYSFJCYWNrZW5kfSBmcm9tICdhbmd1bGFyMi9odHRwJztcbiAqIGltcG9ydCB7TW9ja0JhY2tlbmR9IGZyb20gJ2FuZ3VsYXIyL2h0dHAvdGVzdGluZyc7XG4gKlxuICogdmFyIHBlb3BsZSA9IFt7bmFtZTogJ0plZmYnfSwge25hbWU6ICdUb2JpYXMnfV07XG4gKlxuICogdmFyIGluamVjdG9yID0gSW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZShbXG4gKiAgIEhUVFBfUFJPVklERVJTLFxuICogICBNb2NrQmFja2VuZCxcbiAqICAgcHJvdmlkZShYSFJCYWNrZW5kLCB7dXNlRXhpc3Rpbmc6IE1vY2tCYWNrZW5kfSlcbiAqIF0pO1xuICogdmFyIGh0dHAgPSBpbmplY3Rvci5nZXQoSHR0cCk7XG4gKiB2YXIgYmFja2VuZCA9IGluamVjdG9yLmdldChNb2NrQmFja2VuZCk7XG4gKlxuICogLy8gTGlzdGVuIGZvciBhbnkgbmV3IHJlcXVlc3RzXG4gKiBiYWNrZW5kLmNvbm5lY3Rpb25zLm9ic2VydmVyKHtcbiAqICAgbmV4dDogY29ubmVjdGlvbiA9PiB7XG4gKiAgICAgdmFyIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKHtib2R5OiBwZW9wbGV9KTtcbiAqICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAqICAgICAgIC8vIFNlbmQgYSByZXNwb25zZSB0byB0aGUgcmVxdWVzdFxuICogICAgICAgY29ubmVjdGlvbi5tb2NrUmVzcG9uZChyZXNwb25zZSk7XG4gKiAgICAgfSk7XG4gKiAgIH1cbiAqIH0pO1xuICpcbiAqIGh0dHAuZ2V0KCdwZW9wbGUuanNvbicpLm9ic2VydmVyKHtcbiAqICAgbmV4dDogcmVzID0+IHtcbiAqICAgICAvLyBSZXNwb25zZSBjYW1lIGZyb20gbW9jayBiYWNrZW5kXG4gKiAgICAgY29uc29sZS5sb2coJ2ZpcnN0IHBlcnNvbicsIHJlcy5qc29uKClbMF0ubmFtZSk7XG4gKiAgIH1cbiAqIH0pO1xuICogYGBgXG4gKi9cbmV4cG9ydCBjb25zdCBIVFRQX1BST1ZJREVSUzogYW55W10gPSBbXG4gIC8vIFRPRE8ocGFzY2FsKTogdXNlIGZhY3RvcnkgdHlwZSBhbm5vdGF0aW9ucyBvbmNlIHN1cHBvcnRlZCBpbiBESVxuICAvLyBpc3N1ZTogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMzE4M1xuICBwcm92aWRlKEh0dHAsXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXNlRmFjdG9yeTogKHhockJhY2tlbmQ6IFhIUkJhY2tlbmQsIHJlcXVlc3RPcHRpb25zOiBSZXF1ZXN0T3B0aW9ucykgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgSHR0cCh4aHJCYWNrZW5kLCByZXF1ZXN0T3B0aW9ucyksXG4gICAgICAgICAgICBkZXBzOiBbWEhSQmFja2VuZCwgUmVxdWVzdE9wdGlvbnNdXG4gICAgICAgICAgfSksXG4gIEJyb3dzZXJYaHIsXG4gIHByb3ZpZGUoUmVxdWVzdE9wdGlvbnMsIHt1c2VDbGFzczogQmFzZVJlcXVlc3RPcHRpb25zfSksXG4gIHByb3ZpZGUoUmVzcG9uc2VPcHRpb25zLCB7dXNlQ2xhc3M6IEJhc2VSZXNwb25zZU9wdGlvbnN9KSxcbiAgWEhSQmFja2VuZFxuXTtcblxuLyoqXG4gKiBTZWUge0BsaW5rIEhUVFBfUFJPVklERVJTfSBpbnN0ZWFkLlxuICpcbiAqIEBkZXByZWNhdGVkXG4gKi9cbmV4cG9ydCBjb25zdCBIVFRQX0JJTkRJTkdTID0gSFRUUF9QUk9WSURFUlM7XG5cbi8qKlxuICogUHJvdmlkZXMgYSBiYXNpYyBzZXQgb2YgcHJvdmlkZXJzIHRvIHVzZSB0aGUge0BsaW5rIEpzb25wfSBzZXJ2aWNlIGluIGFueSBhcHBsaWNhdGlvbi5cbiAqXG4gKiBUaGUgYEpTT05QX1BST1ZJREVSU2Agc2hvdWxkIGJlIGluY2x1ZGVkIGVpdGhlciBpbiBhIGNvbXBvbmVudCdzIGluamVjdG9yLFxuICogb3IgaW4gdGhlIHJvb3QgaW5qZWN0b3Igd2hlbiBib290c3RyYXBwaW5nIGFuIGFwcGxpY2F0aW9uLlxuICpcbiAqICMjIyBFeGFtcGxlIChbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC92bWVONEY/cD1wcmV2aWV3KSlcbiAqXG4gKiBgYGBcbiAqIGltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbiAqIGltcG9ydCB7TmdGb3J9IGZyb20gJ2FuZ3VsYXIyL2NvbW1vbic7XG4gKiBpbXBvcnQge0pTT05QX1BST1ZJREVSUywgSnNvbnB9IGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xuICpcbiAqIEBDb21wb25lbnQoe1xuICogICBzZWxlY3RvcjogJ2FwcCcsXG4gKiAgIHByb3ZpZGVyczogW0pTT05QX1BST1ZJREVSU10sXG4gKiAgIHRlbXBsYXRlOiBgXG4gKiAgICAgPGRpdj5cbiAqICAgICAgIDxoMT5QZW9wbGU8L2gxPlxuICogICAgICAgPHVsPlxuICogICAgICAgICA8bGkgKm5nRm9yPVwiI3BlcnNvbiBvZiBwZW9wbGVcIj5cbiAqICAgICAgICAgICB7e3BlcnNvbi5uYW1lfX1cbiAqICAgICAgICAgPC9saT5cbiAqICAgICAgIDwvdWw+XG4gKiAgICAgPC9kaXY+XG4gKiAgIGAsXG4gKiAgIGRpcmVjdGl2ZXM6IFtOZ0Zvcl1cbiAqIH0pXG4gKiBleHBvcnQgY2xhc3MgQXBwIHtcbiAqICAgcGVvcGxlOiBBcnJheTxPYmplY3Q+O1xuICogICBjb25zdHJ1Y3Rvcihqc29ucDpKc29ucCkge1xuICogICAgIGpzb25wLnJlcXVlc3QoJ3Blb3BsZS5qc29uJykuc3Vic2NyaWJlKHJlcyA9PiB7XG4gKiAgICAgICB0aGlzLnBlb3BsZSA9IHJlcy5qc29uKCk7XG4gKiAgICAgfSlcbiAqICAgfVxuICogfVxuICogYGBgXG4gKlxuICogVGhlIHByaW1hcnkgcHVibGljIEFQSSBpbmNsdWRlZCBpbiBgSlNPTlBfUFJPVklERVJTYCBpcyB0aGUge0BsaW5rIEpzb25wfSBjbGFzcy5cbiAqIEhvd2V2ZXIsIG90aGVyIHByb3ZpZGVycyByZXF1aXJlZCBieSBgSnNvbnBgIGFyZSBpbmNsdWRlZCxcbiAqIHdoaWNoIG1heSBiZSBiZW5lZmljaWFsIHRvIG92ZXJyaWRlIGluIGNlcnRhaW4gY2FzZXMuXG4gKlxuICogVGhlIHByb3ZpZGVycyBpbmNsdWRlZCBpbiBgSlNPTlBfUFJPVklERVJTYCBpbmNsdWRlOlxuICogICoge0BsaW5rIEpzb25wfVxuICogICoge0BsaW5rIEpTT05QQmFja2VuZH1cbiAqICAqIGBCcm93c2VySnNvbnBgIC0gUHJpdmF0ZSBmYWN0b3J5XG4gKiAgKiB7QGxpbmsgUmVxdWVzdE9wdGlvbnN9IC0gQm91bmQgdG8ge0BsaW5rIEJhc2VSZXF1ZXN0T3B0aW9uc30gY2xhc3NcbiAqICAqIHtAbGluayBSZXNwb25zZU9wdGlvbnN9IC0gQm91bmQgdG8ge0BsaW5rIEJhc2VSZXNwb25zZU9wdGlvbnN9IGNsYXNzXG4gKlxuICogVGhlcmUgbWF5IGJlIGNhc2VzIHdoZXJlIGl0IG1ha2VzIHNlbnNlIHRvIGV4dGVuZCB0aGUgYmFzZSByZXF1ZXN0IG9wdGlvbnMsXG4gKiBzdWNoIGFzIHRvIGFkZCBhIHNlYXJjaCBzdHJpbmcgdG8gYmUgYXBwZW5kZWQgdG8gYWxsIFVSTHMuXG4gKiBUbyBhY2NvbXBsaXNoIHRoaXMsIGEgbmV3IHByb3ZpZGVyIGZvciB7QGxpbmsgUmVxdWVzdE9wdGlvbnN9IHNob3VsZFxuICogYmUgYWRkZWQgaW4gdGhlIHNhbWUgaW5qZWN0b3IgYXMgYEpTT05QX1BST1ZJREVSU2AuXG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L1RGdWc3eD9wPXByZXZpZXcpKVxuICpcbiAqIGBgYFxuICogaW1wb3J0IHtwcm92aWRlfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbiAqIGltcG9ydCB7Ym9vdHN0cmFwfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9icm93c2VyJztcbiAqIGltcG9ydCB7SlNPTlBfUFJPVklERVJTLCBCYXNlUmVxdWVzdE9wdGlvbnMsIFJlcXVlc3RPcHRpb25zfSBmcm9tICdhbmd1bGFyMi9odHRwJztcbiAqXG4gKiBjbGFzcyBNeU9wdGlvbnMgZXh0ZW5kcyBCYXNlUmVxdWVzdE9wdGlvbnMge1xuICogICBzZWFyY2g6IHN0cmluZyA9ICdjb3JlVGVhbT10cnVlJztcbiAqIH1cbiAqXG4gKiBib290c3RyYXAoQXBwLCBbSlNPTlBfUFJPVklERVJTLCBwcm92aWRlKFJlcXVlc3RPcHRpb25zLCB7dXNlQ2xhc3M6IE15T3B0aW9uc30pXSlcbiAqICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKGVycikpO1xuICogYGBgXG4gKlxuICogTGlrZXdpc2UsIHRvIHVzZSBhIG1vY2sgYmFja2VuZCBmb3IgdW5pdCB0ZXN0cywgdGhlIHtAbGluayBKU09OUEJhY2tlbmR9XG4gKiBwcm92aWRlciBzaG91bGQgYmUgYm91bmQgdG8ge0BsaW5rIE1vY2tCYWNrZW5kfS5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvSERxWldMP3A9cHJldmlldykpXG4gKlxuICogYGBgXG4gKiBpbXBvcnQge3Byb3ZpZGUsIEluamVjdG9yfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbiAqIGltcG9ydCB7SlNPTlBfUFJPVklERVJTLCBKc29ucCwgUmVzcG9uc2UsIEpTT05QQmFja2VuZH0gZnJvbSAnYW5ndWxhcjIvaHR0cCc7XG4gKiBpbXBvcnQge01vY2tCYWNrZW5kfSBmcm9tICdhbmd1bGFyMi9odHRwL3Rlc3RpbmcnO1xuICpcbiAqIHZhciBwZW9wbGUgPSBbe25hbWU6ICdKZWZmJ30sIHtuYW1lOiAnVG9iaWFzJ31dO1xuICogdmFyIGluamVjdG9yID0gSW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZShbXG4gKiAgIEpTT05QX1BST1ZJREVSUyxcbiAqICAgTW9ja0JhY2tlbmQsXG4gKiAgIHByb3ZpZGUoSlNPTlBCYWNrZW5kLCB7dXNlRXhpc3Rpbmc6IE1vY2tCYWNrZW5kfSlcbiAqIF0pO1xuICogdmFyIGpzb25wID0gaW5qZWN0b3IuZ2V0KEpzb25wKTtcbiAqIHZhciBiYWNrZW5kID0gaW5qZWN0b3IuZ2V0KE1vY2tCYWNrZW5kKTtcbiAqXG4gKiAvLyBMaXN0ZW4gZm9yIGFueSBuZXcgcmVxdWVzdHNcbiAqIGJhY2tlbmQuY29ubmVjdGlvbnMub2JzZXJ2ZXIoe1xuICogICBuZXh0OiBjb25uZWN0aW9uID0+IHtcbiAqICAgICB2YXIgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2Uoe2JvZHk6IHBlb3BsZX0pO1xuICogICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICogICAgICAgLy8gU2VuZCBhIHJlc3BvbnNlIHRvIHRoZSByZXF1ZXN0XG4gKiAgICAgICBjb25uZWN0aW9uLm1vY2tSZXNwb25kKHJlc3BvbnNlKTtcbiAqICAgICB9KTtcbiAqICAgfVxuICogfSk7XG5cbiAqIGpzb25wLmdldCgncGVvcGxlLmpzb24nKS5vYnNlcnZlcih7XG4gKiAgIG5leHQ6IHJlcyA9PiB7XG4gKiAgICAgLy8gUmVzcG9uc2UgY2FtZSBmcm9tIG1vY2sgYmFja2VuZFxuICogICAgIGNvbnNvbGUubG9nKCdmaXJzdCBwZXJzb24nLCByZXMuanNvbigpWzBdLm5hbWUpO1xuICogICB9XG4gKiB9KTtcbiAqIGBgYFxuICovXG5leHBvcnQgY29uc3QgSlNPTlBfUFJPVklERVJTOiBhbnlbXSA9IFtcbiAgLy8gVE9ETyhwYXNjYWwpOiB1c2UgZmFjdG9yeSB0eXBlIGFubm90YXRpb25zIG9uY2Ugc3VwcG9ydGVkIGluIERJXG4gIC8vIGlzc3VlOiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8zMTgzXG4gIHByb3ZpZGUoSnNvbnAsXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXNlRmFjdG9yeTogKGpzb25wQmFja2VuZDogSlNPTlBCYWNrZW5kLCByZXF1ZXN0T3B0aW9uczogUmVxdWVzdE9wdGlvbnMpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEpzb25wKGpzb25wQmFja2VuZCwgcmVxdWVzdE9wdGlvbnMpLFxuICAgICAgICAgICAgZGVwczogW0pTT05QQmFja2VuZCwgUmVxdWVzdE9wdGlvbnNdXG4gICAgICAgICAgfSksXG4gIEJyb3dzZXJKc29ucCxcbiAgcHJvdmlkZShSZXF1ZXN0T3B0aW9ucywge3VzZUNsYXNzOiBCYXNlUmVxdWVzdE9wdGlvbnN9KSxcbiAgcHJvdmlkZShSZXNwb25zZU9wdGlvbnMsIHt1c2VDbGFzczogQmFzZVJlc3BvbnNlT3B0aW9uc30pLFxuICBwcm92aWRlKEpTT05QQmFja2VuZCwge3VzZUNsYXNzOiBKU09OUEJhY2tlbmRffSlcbl07XG5cbi8qKlxuICogU2VlIHtAbGluayBKU09OUF9QUk9WSURFUlN9IGluc3RlYWQuXG4gKlxuICogQGRlcHJlY2F0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IEpTT05fQklORElOR1MgPSBKU09OUF9QUk9WSURFUlM7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
