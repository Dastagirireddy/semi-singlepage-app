System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
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
    var lang_1;
    var __make_dart_analyzer_happy, RouteConfig, AbstractRoute, Route, AuxRoute, AsyncRoute, Redirect;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            __make_dart_analyzer_happy = null;
            /**
             * The `RouteConfig` decorator defines routes for a given component.
             *
             * It takes an array of {@link RouteDefinition}s.
             */
            RouteConfig = (function () {
                function RouteConfig(configs) {
                    this.configs = configs;
                }
                RouteConfig = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [Array])
                ], RouteConfig);
                return RouteConfig;
            }());
            exports_1("RouteConfig", RouteConfig);
            AbstractRoute = (function () {
                function AbstractRoute(_a) {
                    var name = _a.name, useAsDefault = _a.useAsDefault, path = _a.path, regex = _a.regex, serializer = _a.serializer, data = _a.data;
                    this.name = name;
                    this.useAsDefault = useAsDefault;
                    this.path = path;
                    this.regex = regex;
                    this.serializer = serializer;
                    this.data = data;
                }
                AbstractRoute = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [Object])
                ], AbstractRoute);
                return AbstractRoute;
            }());
            exports_1("AbstractRoute", AbstractRoute);
            /**
             * `Route` is a type of {@link RouteDefinition} used to route a path to a component.
             *
             * It has the following properties:
             * - `path` is a string that uses the route matcher DSL.
             * - `component` a component type.
             * - `name` is an optional `CamelCase` string representing the name of the route.
             * - `data` is an optional property of any type representing arbitrary route metadata for the given
             * route. It is injectable via {@link RouteData}.
             * - `useAsDefault` is a boolean value. If `true`, the child route will be navigated to if no child
             * route is specified during the navigation.
             *
             * ### Example
             * ```
             * import {RouteConfig, Route} from 'angular2/router';
             *
             * @RouteConfig([
             *   new Route({path: '/home', component: HomeCmp, name: 'HomeCmp' })
             * ])
             * class MyApp {}
             * ```
             */
            Route = (function (_super) {
                __extends(Route, _super);
                function Route(_a) {
                    var name = _a.name, useAsDefault = _a.useAsDefault, path = _a.path, regex = _a.regex, serializer = _a.serializer, data = _a.data, component = _a.component;
                    _super.call(this, {
                        name: name,
                        useAsDefault: useAsDefault,
                        path: path,
                        regex: regex,
                        serializer: serializer,
                        data: data
                    });
                    this.aux = null;
                    this.component = component;
                }
                Route = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [Object])
                ], Route);
                return Route;
            }(AbstractRoute));
            exports_1("Route", Route);
            /**
             * `AuxRoute` is a type of {@link RouteDefinition} used to define an auxiliary route.
             *
             * It takes an object with the following properties:
             * - `path` is a string that uses the route matcher DSL.
             * - `component` a component type.
             * - `name` is an optional `CamelCase` string representing the name of the route.
             * - `data` is an optional property of any type representing arbitrary route metadata for the given
             * route. It is injectable via {@link RouteData}.
             *
             * ### Example
             * ```
             * import {RouteConfig, AuxRoute} from 'angular2/router';
             *
             * @RouteConfig([
             *   new AuxRoute({path: '/home', component: HomeCmp})
             * ])
             * class MyApp {}
             * ```
             */
            AuxRoute = (function (_super) {
                __extends(AuxRoute, _super);
                function AuxRoute(_a) {
                    var name = _a.name, useAsDefault = _a.useAsDefault, path = _a.path, regex = _a.regex, serializer = _a.serializer, data = _a.data, component = _a.component;
                    _super.call(this, {
                        name: name,
                        useAsDefault: useAsDefault,
                        path: path,
                        regex: regex,
                        serializer: serializer,
                        data: data
                    });
                    this.component = component;
                }
                AuxRoute = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [Object])
                ], AuxRoute);
                return AuxRoute;
            }(AbstractRoute));
            exports_1("AuxRoute", AuxRoute);
            /**
             * `AsyncRoute` is a type of {@link RouteDefinition} used to route a path to an asynchronously
             * loaded component.
             *
             * It has the following properties:
             * - `path` is a string that uses the route matcher DSL.
             * - `loader` is a function that returns a promise that resolves to a component.
             * - `name` is an optional `CamelCase` string representing the name of the route.
             * - `data` is an optional property of any type representing arbitrary route metadata for the given
             * route. It is injectable via {@link RouteData}.
             * - `useAsDefault` is a boolean value. If `true`, the child route will be navigated to if no child
             * route is specified during the navigation.
             *
             * ### Example
             * ```
             * import {RouteConfig, AsyncRoute} from 'angular2/router';
             *
             * @RouteConfig([
             *   new AsyncRoute({path: '/home', loader: () => Promise.resolve(MyLoadedCmp), name:
             * 'MyLoadedCmp'})
             * ])
             * class MyApp {}
             * ```
             */
            AsyncRoute = (function (_super) {
                __extends(AsyncRoute, _super);
                function AsyncRoute(_a) {
                    var name = _a.name, useAsDefault = _a.useAsDefault, path = _a.path, regex = _a.regex, serializer = _a.serializer, data = _a.data, loader = _a.loader;
                    _super.call(this, {
                        name: name,
                        useAsDefault: useAsDefault,
                        path: path,
                        regex: regex,
                        serializer: serializer,
                        data: data
                    });
                    this.aux = null;
                    this.loader = loader;
                }
                AsyncRoute = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [Object])
                ], AsyncRoute);
                return AsyncRoute;
            }(AbstractRoute));
            exports_1("AsyncRoute", AsyncRoute);
            /**
             * `Redirect` is a type of {@link RouteDefinition} used to route a path to a canonical route.
             *
             * It has the following properties:
             * - `path` is a string that uses the route matcher DSL.
             * - `redirectTo` is an array representing the link DSL.
             *
             * Note that redirects **do not** affect how links are generated. For that, see the `useAsDefault`
             * option.
             *
             * ### Example
             * ```
             * import {RouteConfig, Route, Redirect} from 'angular2/router';
             *
             * @RouteConfig([
             *   new Redirect({path: '/', redirectTo: ['/Home'] }),
             *   new Route({path: '/home', component: HomeCmp, name: 'Home'})
             * ])
             * class MyApp {}
             * ```
             */
            Redirect = (function (_super) {
                __extends(Redirect, _super);
                function Redirect(_a) {
                    var name = _a.name, useAsDefault = _a.useAsDefault, path = _a.path, regex = _a.regex, serializer = _a.serializer, data = _a.data, redirectTo = _a.redirectTo;
                    _super.call(this, {
                        name: name,
                        useAsDefault: useAsDefault,
                        path: path,
                        regex: regex,
                        serializer: serializer,
                        data: data
                    });
                    this.redirectTo = redirectTo;
                }
                Redirect = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [Object])
                ], Redirect);
                return Redirect;
            }(AbstractRoute));
            exports_1("Redirect", Redirect);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9yb3V0ZV9jb25maWcvcm91dGVfY29uZmlnX2ltcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBTUksMEJBQTBCOzs7Ozs7O1lBQTFCLDBCQUEwQixHQUFpQixJQUFJLENBQUM7WUFFcEQ7Ozs7ZUFJRztZQUVIO2dCQUNFLHFCQUFtQixPQUEwQjtvQkFBMUIsWUFBTyxHQUFQLE9BQU8sQ0FBbUI7Z0JBQUcsQ0FBQztnQkFGbkQ7b0JBQUMsWUFBSyxFQUFFOzsrQkFBQTtnQkFHUixrQkFBQztZQUFELENBRkEsQUFFQyxJQUFBO1lBRkQscUNBRUMsQ0FBQTtZQUdEO2dCQVFFLHVCQUFZLEVBQW9FO3dCQUFuRSxjQUFJLEVBQUUsOEJBQVksRUFBRSxjQUFJLEVBQUUsZ0JBQUssRUFBRSwwQkFBVSxFQUFFLGNBQUk7b0JBQzVELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztvQkFDakMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUNuQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztvQkFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ25CLENBQUM7Z0JBaEJIO29CQUFDLFlBQUssRUFBRTs7aUNBQUE7Z0JBaUJSLG9CQUFDO1lBQUQsQ0FoQkEsQUFnQkMsSUFBQTtZQWhCRCx5Q0FnQkMsQ0FBQTtZQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFxQkc7WUFFSDtnQkFBMkIseUJBQWE7Z0JBSXRDLGVBQVksRUFBK0U7d0JBQTlFLGNBQUksRUFBRSw4QkFBWSxFQUFFLGNBQUksRUFBRSxnQkFBSyxFQUFFLDBCQUFVLEVBQUUsY0FBSSxFQUFFLHdCQUFTO29CQUN2RSxrQkFBTTt3QkFDSixJQUFJLEVBQUUsSUFBSTt3QkFDVixZQUFZLEVBQUUsWUFBWTt3QkFDMUIsSUFBSSxFQUFFLElBQUk7d0JBQ1YsS0FBSyxFQUFFLEtBQUs7d0JBQ1osVUFBVSxFQUFFLFVBQVU7d0JBQ3RCLElBQUksRUFBRSxJQUFJO3FCQUNYLENBQUMsQ0FBQztvQkFWTCxRQUFHLEdBQVcsSUFBSSxDQUFDO29CQVdqQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztnQkFDN0IsQ0FBQztnQkFmSDtvQkFBQyxZQUFLLEVBQUU7O3lCQUFBO2dCQWdCUixZQUFDO1lBQUQsQ0FmQSxBQWVDLENBZjBCLGFBQWEsR0FldkM7WUFmRCx5QkFlQyxDQUFBO1lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFtQkc7WUFFSDtnQkFBOEIsNEJBQWE7Z0JBR3pDLGtCQUFZLEVBQStFO3dCQUE5RSxjQUFJLEVBQUUsOEJBQVksRUFBRSxjQUFJLEVBQUUsZ0JBQUssRUFBRSwwQkFBVSxFQUFFLGNBQUksRUFBRSx3QkFBUztvQkFDdkUsa0JBQU07d0JBQ0osSUFBSSxFQUFFLElBQUk7d0JBQ1YsWUFBWSxFQUFFLFlBQVk7d0JBQzFCLElBQUksRUFBRSxJQUFJO3dCQUNWLEtBQUssRUFBRSxLQUFLO3dCQUNaLFVBQVUsRUFBRSxVQUFVO3dCQUN0QixJQUFJLEVBQUUsSUFBSTtxQkFDWCxDQUFDLENBQUM7b0JBQ0gsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7Z0JBQzdCLENBQUM7Z0JBZEg7b0JBQUMsWUFBSyxFQUFFOzs0QkFBQTtnQkFlUixlQUFDO1lBQUQsQ0FkQSxBQWNDLENBZDZCLGFBQWEsR0FjMUM7WUFkRCwrQkFjQyxDQUFBO1lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBdUJHO1lBRUg7Z0JBQWdDLDhCQUFhO2dCQUkzQyxvQkFBWSxFQUE0RTt3QkFBM0UsY0FBSSxFQUFFLDhCQUFZLEVBQUUsY0FBSSxFQUFFLGdCQUFLLEVBQUUsMEJBQVUsRUFBRSxjQUFJLEVBQUUsa0JBQU07b0JBQ3BFLGtCQUFNO3dCQUNKLElBQUksRUFBRSxJQUFJO3dCQUNWLFlBQVksRUFBRSxZQUFZO3dCQUMxQixJQUFJLEVBQUUsSUFBSTt3QkFDVixLQUFLLEVBQUUsS0FBSzt3QkFDWixVQUFVLEVBQUUsVUFBVTt3QkFDdEIsSUFBSSxFQUFFLElBQUk7cUJBQ1gsQ0FBQyxDQUFDO29CQVZMLFFBQUcsR0FBVyxJQUFJLENBQUM7b0JBV2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO2dCQUN2QixDQUFDO2dCQWZIO29CQUFDLFlBQUssRUFBRTs7OEJBQUE7Z0JBZ0JSLGlCQUFDO1lBQUQsQ0FmQSxBQWVDLENBZitCLGFBQWEsR0FlNUM7WUFmRCxtQ0FlQyxDQUFBO1lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBb0JHO1lBRUg7Z0JBQThCLDRCQUFhO2dCQUd6QyxrQkFBWSxFQUFnRjt3QkFBL0UsY0FBSSxFQUFFLDhCQUFZLEVBQUUsY0FBSSxFQUFFLGdCQUFLLEVBQUUsMEJBQVUsRUFBRSxjQUFJLEVBQUUsMEJBQVU7b0JBQ3hFLGtCQUFNO3dCQUNKLElBQUksRUFBRSxJQUFJO3dCQUNWLFlBQVksRUFBRSxZQUFZO3dCQUMxQixJQUFJLEVBQUUsSUFBSTt3QkFDVixLQUFLLEVBQUUsS0FBSzt3QkFDWixVQUFVLEVBQUUsVUFBVTt3QkFDdEIsSUFBSSxFQUFFLElBQUk7cUJBQ1gsQ0FBQyxDQUFDO29CQUNILElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO2dCQUMvQixDQUFDO2dCQWRIO29CQUFDLFlBQUssRUFBRTs7NEJBQUE7Z0JBZVIsZUFBQztZQUFELENBZEEsQUFjQyxDQWQ2QixhQUFhLEdBYzFDO1lBZEQsK0JBY0MsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvcm91dGVfY29uZmlnL3JvdXRlX2NvbmZpZ19pbXBsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDT05TVCwgVHlwZSwgaXNQcmVzZW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtSb3V0ZURlZmluaXRpb259IGZyb20gJy4uL3JvdXRlX2RlZmluaXRpb24nO1xuaW1wb3J0IHtSZWdleFNlcmlhbGl6ZXJ9IGZyb20gJy4uL3J1bGVzL3JvdXRlX3BhdGhzL3JlZ2V4X3JvdXRlX3BhdGgnO1xuXG5leHBvcnQge1JvdXRlRGVmaW5pdGlvbn0gZnJvbSAnLi4vcm91dGVfZGVmaW5pdGlvbic7XG5cbnZhciBfX21ha2VfZGFydF9hbmFseXplcl9oYXBweTogUHJvbWlzZTxhbnk+ID0gbnVsbDtcblxuLyoqXG4gKiBUaGUgYFJvdXRlQ29uZmlnYCBkZWNvcmF0b3IgZGVmaW5lcyByb3V0ZXMgZm9yIGEgZ2l2ZW4gY29tcG9uZW50LlxuICpcbiAqIEl0IHRha2VzIGFuIGFycmF5IG9mIHtAbGluayBSb3V0ZURlZmluaXRpb259cy5cbiAqL1xuQENPTlNUKClcbmV4cG9ydCBjbGFzcyBSb3V0ZUNvbmZpZyB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb25maWdzOiBSb3V0ZURlZmluaXRpb25bXSkge31cbn1cblxuQENPTlNUKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdFJvdXRlIGltcGxlbWVudHMgUm91dGVEZWZpbml0aW9uIHtcbiAgbmFtZTogc3RyaW5nO1xuICB1c2VBc0RlZmF1bHQ6IGJvb2xlYW47XG4gIHBhdGg6IHN0cmluZztcbiAgcmVnZXg6IHN0cmluZztcbiAgc2VyaWFsaXplcjogUmVnZXhTZXJpYWxpemVyO1xuICBkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fTtcblxuICBjb25zdHJ1Y3Rvcih7bmFtZSwgdXNlQXNEZWZhdWx0LCBwYXRoLCByZWdleCwgc2VyaWFsaXplciwgZGF0YX06IFJvdXRlRGVmaW5pdGlvbikge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy51c2VBc0RlZmF1bHQgPSB1c2VBc0RlZmF1bHQ7XG4gICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICB0aGlzLnJlZ2V4ID0gcmVnZXg7XG4gICAgdGhpcy5zZXJpYWxpemVyID0gc2VyaWFsaXplcjtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICB9XG59XG5cbi8qKlxuICogYFJvdXRlYCBpcyBhIHR5cGUgb2Yge0BsaW5rIFJvdXRlRGVmaW5pdGlvbn0gdXNlZCB0byByb3V0ZSBhIHBhdGggdG8gYSBjb21wb25lbnQuXG4gKlxuICogSXQgaGFzIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAqIC0gYHBhdGhgIGlzIGEgc3RyaW5nIHRoYXQgdXNlcyB0aGUgcm91dGUgbWF0Y2hlciBEU0wuXG4gKiAtIGBjb21wb25lbnRgIGEgY29tcG9uZW50IHR5cGUuXG4gKiAtIGBuYW1lYCBpcyBhbiBvcHRpb25hbCBgQ2FtZWxDYXNlYCBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBuYW1lIG9mIHRoZSByb3V0ZS5cbiAqIC0gYGRhdGFgIGlzIGFuIG9wdGlvbmFsIHByb3BlcnR5IG9mIGFueSB0eXBlIHJlcHJlc2VudGluZyBhcmJpdHJhcnkgcm91dGUgbWV0YWRhdGEgZm9yIHRoZSBnaXZlblxuICogcm91dGUuIEl0IGlzIGluamVjdGFibGUgdmlhIHtAbGluayBSb3V0ZURhdGF9LlxuICogLSBgdXNlQXNEZWZhdWx0YCBpcyBhIGJvb2xlYW4gdmFsdWUuIElmIGB0cnVlYCwgdGhlIGNoaWxkIHJvdXRlIHdpbGwgYmUgbmF2aWdhdGVkIHRvIGlmIG5vIGNoaWxkXG4gKiByb3V0ZSBpcyBzcGVjaWZpZWQgZHVyaW5nIHRoZSBuYXZpZ2F0aW9uLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKiBgYGBcbiAqIGltcG9ydCB7Um91dGVDb25maWcsIFJvdXRlfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXInO1xuICpcbiAqIEBSb3V0ZUNvbmZpZyhbXG4gKiAgIG5ldyBSb3V0ZSh7cGF0aDogJy9ob21lJywgY29tcG9uZW50OiBIb21lQ21wLCBuYW1lOiAnSG9tZUNtcCcgfSlcbiAqIF0pXG4gKiBjbGFzcyBNeUFwcCB7fVxuICogYGBgXG4gKi9cbkBDT05TVCgpXG5leHBvcnQgY2xhc3MgUm91dGUgZXh0ZW5kcyBBYnN0cmFjdFJvdXRlIHtcbiAgY29tcG9uZW50OiBhbnk7XG4gIGF1eDogc3RyaW5nID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcih7bmFtZSwgdXNlQXNEZWZhdWx0LCBwYXRoLCByZWdleCwgc2VyaWFsaXplciwgZGF0YSwgY29tcG9uZW50fTogUm91dGVEZWZpbml0aW9uKSB7XG4gICAgc3VwZXIoe1xuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIHVzZUFzRGVmYXVsdDogdXNlQXNEZWZhdWx0LFxuICAgICAgcGF0aDogcGF0aCxcbiAgICAgIHJlZ2V4OiByZWdleCxcbiAgICAgIHNlcmlhbGl6ZXI6IHNlcmlhbGl6ZXIsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSk7XG4gICAgdGhpcy5jb21wb25lbnQgPSBjb21wb25lbnQ7XG4gIH1cbn1cblxuLyoqXG4gKiBgQXV4Um91dGVgIGlzIGEgdHlwZSBvZiB7QGxpbmsgUm91dGVEZWZpbml0aW9ufSB1c2VkIHRvIGRlZmluZSBhbiBhdXhpbGlhcnkgcm91dGUuXG4gKlxuICogSXQgdGFrZXMgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICogLSBgcGF0aGAgaXMgYSBzdHJpbmcgdGhhdCB1c2VzIHRoZSByb3V0ZSBtYXRjaGVyIERTTC5cbiAqIC0gYGNvbXBvbmVudGAgYSBjb21wb25lbnQgdHlwZS5cbiAqIC0gYG5hbWVgIGlzIGFuIG9wdGlvbmFsIGBDYW1lbENhc2VgIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIG5hbWUgb2YgdGhlIHJvdXRlLlxuICogLSBgZGF0YWAgaXMgYW4gb3B0aW9uYWwgcHJvcGVydHkgb2YgYW55IHR5cGUgcmVwcmVzZW50aW5nIGFyYml0cmFyeSByb3V0ZSBtZXRhZGF0YSBmb3IgdGhlIGdpdmVuXG4gKiByb3V0ZS4gSXQgaXMgaW5qZWN0YWJsZSB2aWEge0BsaW5rIFJvdXRlRGF0YX0uXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqIGBgYFxuICogaW1wb3J0IHtSb3V0ZUNvbmZpZywgQXV4Um91dGV9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlcic7XG4gKlxuICogQFJvdXRlQ29uZmlnKFtcbiAqICAgbmV3IEF1eFJvdXRlKHtwYXRoOiAnL2hvbWUnLCBjb21wb25lbnQ6IEhvbWVDbXB9KVxuICogXSlcbiAqIGNsYXNzIE15QXBwIHt9XG4gKiBgYGBcbiAqL1xuQENPTlNUKClcbmV4cG9ydCBjbGFzcyBBdXhSb3V0ZSBleHRlbmRzIEFic3RyYWN0Um91dGUge1xuICBjb21wb25lbnQ6IGFueTtcblxuICBjb25zdHJ1Y3Rvcih7bmFtZSwgdXNlQXNEZWZhdWx0LCBwYXRoLCByZWdleCwgc2VyaWFsaXplciwgZGF0YSwgY29tcG9uZW50fTogUm91dGVEZWZpbml0aW9uKSB7XG4gICAgc3VwZXIoe1xuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIHVzZUFzRGVmYXVsdDogdXNlQXNEZWZhdWx0LFxuICAgICAgcGF0aDogcGF0aCxcbiAgICAgIHJlZ2V4OiByZWdleCxcbiAgICAgIHNlcmlhbGl6ZXI6IHNlcmlhbGl6ZXIsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSk7XG4gICAgdGhpcy5jb21wb25lbnQgPSBjb21wb25lbnQ7XG4gIH1cbn1cblxuLyoqXG4gKiBgQXN5bmNSb3V0ZWAgaXMgYSB0eXBlIG9mIHtAbGluayBSb3V0ZURlZmluaXRpb259IHVzZWQgdG8gcm91dGUgYSBwYXRoIHRvIGFuIGFzeW5jaHJvbm91c2x5XG4gKiBsb2FkZWQgY29tcG9uZW50LlxuICpcbiAqIEl0IGhhcyB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gKiAtIGBwYXRoYCBpcyBhIHN0cmluZyB0aGF0IHVzZXMgdGhlIHJvdXRlIG1hdGNoZXIgRFNMLlxuICogLSBgbG9hZGVyYCBpcyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIGNvbXBvbmVudC5cbiAqIC0gYG5hbWVgIGlzIGFuIG9wdGlvbmFsIGBDYW1lbENhc2VgIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIG5hbWUgb2YgdGhlIHJvdXRlLlxuICogLSBgZGF0YWAgaXMgYW4gb3B0aW9uYWwgcHJvcGVydHkgb2YgYW55IHR5cGUgcmVwcmVzZW50aW5nIGFyYml0cmFyeSByb3V0ZSBtZXRhZGF0YSBmb3IgdGhlIGdpdmVuXG4gKiByb3V0ZS4gSXQgaXMgaW5qZWN0YWJsZSB2aWEge0BsaW5rIFJvdXRlRGF0YX0uXG4gKiAtIGB1c2VBc0RlZmF1bHRgIGlzIGEgYm9vbGVhbiB2YWx1ZS4gSWYgYHRydWVgLCB0aGUgY2hpbGQgcm91dGUgd2lsbCBiZSBuYXZpZ2F0ZWQgdG8gaWYgbm8gY2hpbGRcbiAqIHJvdXRlIGlzIHNwZWNpZmllZCBkdXJpbmcgdGhlIG5hdmlnYXRpb24uXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqIGBgYFxuICogaW1wb3J0IHtSb3V0ZUNvbmZpZywgQXN5bmNSb3V0ZX0gZnJvbSAnYW5ndWxhcjIvcm91dGVyJztcbiAqXG4gKiBAUm91dGVDb25maWcoW1xuICogICBuZXcgQXN5bmNSb3V0ZSh7cGF0aDogJy9ob21lJywgbG9hZGVyOiAoKSA9PiBQcm9taXNlLnJlc29sdmUoTXlMb2FkZWRDbXApLCBuYW1lOlxuICogJ015TG9hZGVkQ21wJ30pXG4gKiBdKVxuICogY2xhc3MgTXlBcHAge31cbiAqIGBgYFxuICovXG5AQ09OU1QoKVxuZXhwb3J0IGNsYXNzIEFzeW5jUm91dGUgZXh0ZW5kcyBBYnN0cmFjdFJvdXRlIHtcbiAgbG9hZGVyOiAoKSA9PiBQcm9taXNlPFR5cGU+O1xuICBhdXg6IHN0cmluZyA9IG51bGw7XG5cbiAgY29uc3RydWN0b3Ioe25hbWUsIHVzZUFzRGVmYXVsdCwgcGF0aCwgcmVnZXgsIHNlcmlhbGl6ZXIsIGRhdGEsIGxvYWRlcn06IFJvdXRlRGVmaW5pdGlvbikge1xuICAgIHN1cGVyKHtcbiAgICAgIG5hbWU6IG5hbWUsXG4gICAgICB1c2VBc0RlZmF1bHQ6IHVzZUFzRGVmYXVsdCxcbiAgICAgIHBhdGg6IHBhdGgsXG4gICAgICByZWdleDogcmVnZXgsXG4gICAgICBzZXJpYWxpemVyOiBzZXJpYWxpemVyLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pO1xuICAgIHRoaXMubG9hZGVyID0gbG9hZGVyO1xuICB9XG59XG5cbi8qKlxuICogYFJlZGlyZWN0YCBpcyBhIHR5cGUgb2Yge0BsaW5rIFJvdXRlRGVmaW5pdGlvbn0gdXNlZCB0byByb3V0ZSBhIHBhdGggdG8gYSBjYW5vbmljYWwgcm91dGUuXG4gKlxuICogSXQgaGFzIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAqIC0gYHBhdGhgIGlzIGEgc3RyaW5nIHRoYXQgdXNlcyB0aGUgcm91dGUgbWF0Y2hlciBEU0wuXG4gKiAtIGByZWRpcmVjdFRvYCBpcyBhbiBhcnJheSByZXByZXNlbnRpbmcgdGhlIGxpbmsgRFNMLlxuICpcbiAqIE5vdGUgdGhhdCByZWRpcmVjdHMgKipkbyBub3QqKiBhZmZlY3QgaG93IGxpbmtzIGFyZSBnZW5lcmF0ZWQuIEZvciB0aGF0LCBzZWUgdGhlIGB1c2VBc0RlZmF1bHRgXG4gKiBvcHRpb24uXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqIGBgYFxuICogaW1wb3J0IHtSb3V0ZUNvbmZpZywgUm91dGUsIFJlZGlyZWN0fSBmcm9tICdhbmd1bGFyMi9yb3V0ZXInO1xuICpcbiAqIEBSb3V0ZUNvbmZpZyhbXG4gKiAgIG5ldyBSZWRpcmVjdCh7cGF0aDogJy8nLCByZWRpcmVjdFRvOiBbJy9Ib21lJ10gfSksXG4gKiAgIG5ldyBSb3V0ZSh7cGF0aDogJy9ob21lJywgY29tcG9uZW50OiBIb21lQ21wLCBuYW1lOiAnSG9tZSd9KVxuICogXSlcbiAqIGNsYXNzIE15QXBwIHt9XG4gKiBgYGBcbiAqL1xuQENPTlNUKClcbmV4cG9ydCBjbGFzcyBSZWRpcmVjdCBleHRlbmRzIEFic3RyYWN0Um91dGUge1xuICByZWRpcmVjdFRvOiBhbnlbXTtcblxuICBjb25zdHJ1Y3Rvcih7bmFtZSwgdXNlQXNEZWZhdWx0LCBwYXRoLCByZWdleCwgc2VyaWFsaXplciwgZGF0YSwgcmVkaXJlY3RUb306IFJvdXRlRGVmaW5pdGlvbikge1xuICAgIHN1cGVyKHtcbiAgICAgIG5hbWU6IG5hbWUsXG4gICAgICB1c2VBc0RlZmF1bHQ6IHVzZUFzRGVmYXVsdCxcbiAgICAgIHBhdGg6IHBhdGgsXG4gICAgICByZWdleDogcmVnZXgsXG4gICAgICBzZXJpYWxpemVyOiBzZXJpYWxpemVyLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pO1xuICAgIHRoaXMucmVkaXJlY3RUbyA9IHJlZGlyZWN0VG87XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
