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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvcm91dGVfY29uZmlnL3JvdXRlX2NvbmZpZ19pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQU1JLDBCQUEwQjs7Ozs7OztZQUExQiwwQkFBMEIsR0FBaUIsSUFBSSxDQUFDO1lBRXBEOzs7O2VBSUc7WUFFSDtnQkFDRSxxQkFBbUIsT0FBMEI7b0JBQTFCLFlBQU8sR0FBUCxPQUFPLENBQW1CO2dCQUFHLENBQUM7Z0JBRm5EO29CQUFDLFlBQUssRUFBRTs7K0JBQUE7Z0JBR1Isa0JBQUM7WUFBRCxDQUZBLEFBRUMsSUFBQTtZQUZELHFDQUVDLENBQUE7WUFHRDtnQkFRRSx1QkFBWSxFQUFvRTt3QkFBbkUsY0FBSSxFQUFFLDhCQUFZLEVBQUUsY0FBSSxFQUFFLGdCQUFLLEVBQUUsMEJBQVUsRUFBRSxjQUFJO29CQUM1RCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7b0JBQ2pDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7b0JBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixDQUFDO2dCQWhCSDtvQkFBQyxZQUFLLEVBQUU7O2lDQUFBO2dCQWlCUixvQkFBQztZQUFELENBaEJBLEFBZ0JDLElBQUE7WUFoQkQseUNBZ0JDLENBQUE7WUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBcUJHO1lBRUg7Z0JBQTJCLHlCQUFhO2dCQUl0QyxlQUFZLEVBQStFO3dCQUE5RSxjQUFJLEVBQUUsOEJBQVksRUFBRSxjQUFJLEVBQUUsZ0JBQUssRUFBRSwwQkFBVSxFQUFFLGNBQUksRUFBRSx3QkFBUztvQkFDdkUsa0JBQU07d0JBQ0osSUFBSSxFQUFFLElBQUk7d0JBQ1YsWUFBWSxFQUFFLFlBQVk7d0JBQzFCLElBQUksRUFBRSxJQUFJO3dCQUNWLEtBQUssRUFBRSxLQUFLO3dCQUNaLFVBQVUsRUFBRSxVQUFVO3dCQUN0QixJQUFJLEVBQUUsSUFBSTtxQkFDWCxDQUFDLENBQUM7b0JBVkwsUUFBRyxHQUFXLElBQUksQ0FBQztvQkFXakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7Z0JBQzdCLENBQUM7Z0JBZkg7b0JBQUMsWUFBSyxFQUFFOzt5QkFBQTtnQkFnQlIsWUFBQztZQUFELENBZkEsQUFlQyxDQWYwQixhQUFhLEdBZXZDO1lBZkQseUJBZUMsQ0FBQTtZQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBbUJHO1lBRUg7Z0JBQThCLDRCQUFhO2dCQUd6QyxrQkFBWSxFQUErRTt3QkFBOUUsY0FBSSxFQUFFLDhCQUFZLEVBQUUsY0FBSSxFQUFFLGdCQUFLLEVBQUUsMEJBQVUsRUFBRSxjQUFJLEVBQUUsd0JBQVM7b0JBQ3ZFLGtCQUFNO3dCQUNKLElBQUksRUFBRSxJQUFJO3dCQUNWLFlBQVksRUFBRSxZQUFZO3dCQUMxQixJQUFJLEVBQUUsSUFBSTt3QkFDVixLQUFLLEVBQUUsS0FBSzt3QkFDWixVQUFVLEVBQUUsVUFBVTt3QkFDdEIsSUFBSSxFQUFFLElBQUk7cUJBQ1gsQ0FBQyxDQUFDO29CQUNILElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO2dCQUM3QixDQUFDO2dCQWRIO29CQUFDLFlBQUssRUFBRTs7NEJBQUE7Z0JBZVIsZUFBQztZQUFELENBZEEsQUFjQyxDQWQ2QixhQUFhLEdBYzFDO1lBZEQsK0JBY0MsQ0FBQTtZQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQXVCRztZQUVIO2dCQUFnQyw4QkFBYTtnQkFJM0Msb0JBQVksRUFBNEU7d0JBQTNFLGNBQUksRUFBRSw4QkFBWSxFQUFFLGNBQUksRUFBRSxnQkFBSyxFQUFFLDBCQUFVLEVBQUUsY0FBSSxFQUFFLGtCQUFNO29CQUNwRSxrQkFBTTt3QkFDSixJQUFJLEVBQUUsSUFBSTt3QkFDVixZQUFZLEVBQUUsWUFBWTt3QkFDMUIsSUFBSSxFQUFFLElBQUk7d0JBQ1YsS0FBSyxFQUFFLEtBQUs7d0JBQ1osVUFBVSxFQUFFLFVBQVU7d0JBQ3RCLElBQUksRUFBRSxJQUFJO3FCQUNYLENBQUMsQ0FBQztvQkFWTCxRQUFHLEdBQVcsSUFBSSxDQUFDO29CQVdqQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztnQkFDdkIsQ0FBQztnQkFmSDtvQkFBQyxZQUFLLEVBQUU7OzhCQUFBO2dCQWdCUixpQkFBQztZQUFELENBZkEsQUFlQyxDQWYrQixhQUFhLEdBZTVDO1lBZkQsbUNBZUMsQ0FBQTtZQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQW9CRztZQUVIO2dCQUE4Qiw0QkFBYTtnQkFHekMsa0JBQVksRUFBZ0Y7d0JBQS9FLGNBQUksRUFBRSw4QkFBWSxFQUFFLGNBQUksRUFBRSxnQkFBSyxFQUFFLDBCQUFVLEVBQUUsY0FBSSxFQUFFLDBCQUFVO29CQUN4RSxrQkFBTTt3QkFDSixJQUFJLEVBQUUsSUFBSTt3QkFDVixZQUFZLEVBQUUsWUFBWTt3QkFDMUIsSUFBSSxFQUFFLElBQUk7d0JBQ1YsS0FBSyxFQUFFLEtBQUs7d0JBQ1osVUFBVSxFQUFFLFVBQVU7d0JBQ3RCLElBQUksRUFBRSxJQUFJO3FCQUNYLENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztnQkFDL0IsQ0FBQztnQkFkSDtvQkFBQyxZQUFLLEVBQUU7OzRCQUFBO2dCQWVSLGVBQUM7WUFBRCxDQWRBLEFBY0MsQ0FkNkIsYUFBYSxHQWMxQztZQWRELCtCQWNDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9yb3V0ZV9jb25maWcvcm91dGVfY29uZmlnX2ltcGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NPTlNULCBUeXBlLCBpc1ByZXNlbnR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge1JvdXRlRGVmaW5pdGlvbn0gZnJvbSAnLi4vcm91dGVfZGVmaW5pdGlvbic7XG5pbXBvcnQge1JlZ2V4U2VyaWFsaXplcn0gZnJvbSAnLi4vcnVsZXMvcm91dGVfcGF0aHMvcmVnZXhfcm91dGVfcGF0aCc7XG5cbmV4cG9ydCB7Um91dGVEZWZpbml0aW9ufSBmcm9tICcuLi9yb3V0ZV9kZWZpbml0aW9uJztcblxudmFyIF9fbWFrZV9kYXJ0X2FuYWx5emVyX2hhcHB5OiBQcm9taXNlPGFueT4gPSBudWxsO1xuXG4vKipcbiAqIFRoZSBgUm91dGVDb25maWdgIGRlY29yYXRvciBkZWZpbmVzIHJvdXRlcyBmb3IgYSBnaXZlbiBjb21wb25lbnQuXG4gKlxuICogSXQgdGFrZXMgYW4gYXJyYXkgb2Yge0BsaW5rIFJvdXRlRGVmaW5pdGlvbn1zLlxuICovXG5AQ09OU1QoKVxuZXhwb3J0IGNsYXNzIFJvdXRlQ29uZmlnIHtcbiAgY29uc3RydWN0b3IocHVibGljIGNvbmZpZ3M6IFJvdXRlRGVmaW5pdGlvbltdKSB7fVxufVxuXG5AQ09OU1QoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0Um91dGUgaW1wbGVtZW50cyBSb3V0ZURlZmluaXRpb24ge1xuICBuYW1lOiBzdHJpbmc7XG4gIHVzZUFzRGVmYXVsdDogYm9vbGVhbjtcbiAgcGF0aDogc3RyaW5nO1xuICByZWdleDogc3RyaW5nO1xuICBzZXJpYWxpemVyOiBSZWdleFNlcmlhbGl6ZXI7XG4gIGRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnl9O1xuXG4gIGNvbnN0cnVjdG9yKHtuYW1lLCB1c2VBc0RlZmF1bHQsIHBhdGgsIHJlZ2V4LCBzZXJpYWxpemVyLCBkYXRhfTogUm91dGVEZWZpbml0aW9uKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnVzZUFzRGVmYXVsdCA9IHVzZUFzRGVmYXVsdDtcbiAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgIHRoaXMucmVnZXggPSByZWdleDtcbiAgICB0aGlzLnNlcmlhbGl6ZXIgPSBzZXJpYWxpemVyO1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gIH1cbn1cblxuLyoqXG4gKiBgUm91dGVgIGlzIGEgdHlwZSBvZiB7QGxpbmsgUm91dGVEZWZpbml0aW9ufSB1c2VkIHRvIHJvdXRlIGEgcGF0aCB0byBhIGNvbXBvbmVudC5cbiAqXG4gKiBJdCBoYXMgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICogLSBgcGF0aGAgaXMgYSBzdHJpbmcgdGhhdCB1c2VzIHRoZSByb3V0ZSBtYXRjaGVyIERTTC5cbiAqIC0gYGNvbXBvbmVudGAgYSBjb21wb25lbnQgdHlwZS5cbiAqIC0gYG5hbWVgIGlzIGFuIG9wdGlvbmFsIGBDYW1lbENhc2VgIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIG5hbWUgb2YgdGhlIHJvdXRlLlxuICogLSBgZGF0YWAgaXMgYW4gb3B0aW9uYWwgcHJvcGVydHkgb2YgYW55IHR5cGUgcmVwcmVzZW50aW5nIGFyYml0cmFyeSByb3V0ZSBtZXRhZGF0YSBmb3IgdGhlIGdpdmVuXG4gKiByb3V0ZS4gSXQgaXMgaW5qZWN0YWJsZSB2aWEge0BsaW5rIFJvdXRlRGF0YX0uXG4gKiAtIGB1c2VBc0RlZmF1bHRgIGlzIGEgYm9vbGVhbiB2YWx1ZS4gSWYgYHRydWVgLCB0aGUgY2hpbGQgcm91dGUgd2lsbCBiZSBuYXZpZ2F0ZWQgdG8gaWYgbm8gY2hpbGRcbiAqIHJvdXRlIGlzIHNwZWNpZmllZCBkdXJpbmcgdGhlIG5hdmlnYXRpb24uXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqIGBgYFxuICogaW1wb3J0IHtSb3V0ZUNvbmZpZywgUm91dGV9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlcic7XG4gKlxuICogQFJvdXRlQ29uZmlnKFtcbiAqICAgbmV3IFJvdXRlKHtwYXRoOiAnL2hvbWUnLCBjb21wb25lbnQ6IEhvbWVDbXAsIG5hbWU6ICdIb21lQ21wJyB9KVxuICogXSlcbiAqIGNsYXNzIE15QXBwIHt9XG4gKiBgYGBcbiAqL1xuQENPTlNUKClcbmV4cG9ydCBjbGFzcyBSb3V0ZSBleHRlbmRzIEFic3RyYWN0Um91dGUge1xuICBjb21wb25lbnQ6IGFueTtcbiAgYXV4OiBzdHJpbmcgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHtuYW1lLCB1c2VBc0RlZmF1bHQsIHBhdGgsIHJlZ2V4LCBzZXJpYWxpemVyLCBkYXRhLCBjb21wb25lbnR9OiBSb3V0ZURlZmluaXRpb24pIHtcbiAgICBzdXBlcih7XG4gICAgICBuYW1lOiBuYW1lLFxuICAgICAgdXNlQXNEZWZhdWx0OiB1c2VBc0RlZmF1bHQsXG4gICAgICBwYXRoOiBwYXRoLFxuICAgICAgcmVnZXg6IHJlZ2V4LFxuICAgICAgc2VyaWFsaXplcjogc2VyaWFsaXplcixcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KTtcbiAgICB0aGlzLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcbiAgfVxufVxuXG4vKipcbiAqIGBBdXhSb3V0ZWAgaXMgYSB0eXBlIG9mIHtAbGluayBSb3V0ZURlZmluaXRpb259IHVzZWQgdG8gZGVmaW5lIGFuIGF1eGlsaWFyeSByb3V0ZS5cbiAqXG4gKiBJdCB0YWtlcyBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gKiAtIGBwYXRoYCBpcyBhIHN0cmluZyB0aGF0IHVzZXMgdGhlIHJvdXRlIG1hdGNoZXIgRFNMLlxuICogLSBgY29tcG9uZW50YCBhIGNvbXBvbmVudCB0eXBlLlxuICogLSBgbmFtZWAgaXMgYW4gb3B0aW9uYWwgYENhbWVsQ2FzZWAgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgbmFtZSBvZiB0aGUgcm91dGUuXG4gKiAtIGBkYXRhYCBpcyBhbiBvcHRpb25hbCBwcm9wZXJ0eSBvZiBhbnkgdHlwZSByZXByZXNlbnRpbmcgYXJiaXRyYXJ5IHJvdXRlIG1ldGFkYXRhIGZvciB0aGUgZ2l2ZW5cbiAqIHJvdXRlLiBJdCBpcyBpbmplY3RhYmxlIHZpYSB7QGxpbmsgUm91dGVEYXRhfS5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICogYGBgXG4gKiBpbXBvcnQge1JvdXRlQ29uZmlnLCBBdXhSb3V0ZX0gZnJvbSAnYW5ndWxhcjIvcm91dGVyJztcbiAqXG4gKiBAUm91dGVDb25maWcoW1xuICogICBuZXcgQXV4Um91dGUoe3BhdGg6ICcvaG9tZScsIGNvbXBvbmVudDogSG9tZUNtcH0pXG4gKiBdKVxuICogY2xhc3MgTXlBcHAge31cbiAqIGBgYFxuICovXG5AQ09OU1QoKVxuZXhwb3J0IGNsYXNzIEF1eFJvdXRlIGV4dGVuZHMgQWJzdHJhY3RSb3V0ZSB7XG4gIGNvbXBvbmVudDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHtuYW1lLCB1c2VBc0RlZmF1bHQsIHBhdGgsIHJlZ2V4LCBzZXJpYWxpemVyLCBkYXRhLCBjb21wb25lbnR9OiBSb3V0ZURlZmluaXRpb24pIHtcbiAgICBzdXBlcih7XG4gICAgICBuYW1lOiBuYW1lLFxuICAgICAgdXNlQXNEZWZhdWx0OiB1c2VBc0RlZmF1bHQsXG4gICAgICBwYXRoOiBwYXRoLFxuICAgICAgcmVnZXg6IHJlZ2V4LFxuICAgICAgc2VyaWFsaXplcjogc2VyaWFsaXplcixcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KTtcbiAgICB0aGlzLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcbiAgfVxufVxuXG4vKipcbiAqIGBBc3luY1JvdXRlYCBpcyBhIHR5cGUgb2Yge0BsaW5rIFJvdXRlRGVmaW5pdGlvbn0gdXNlZCB0byByb3V0ZSBhIHBhdGggdG8gYW4gYXN5bmNocm9ub3VzbHlcbiAqIGxvYWRlZCBjb21wb25lbnQuXG4gKlxuICogSXQgaGFzIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAqIC0gYHBhdGhgIGlzIGEgc3RyaW5nIHRoYXQgdXNlcyB0aGUgcm91dGUgbWF0Y2hlciBEU0wuXG4gKiAtIGBsb2FkZXJgIGlzIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgY29tcG9uZW50LlxuICogLSBgbmFtZWAgaXMgYW4gb3B0aW9uYWwgYENhbWVsQ2FzZWAgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgbmFtZSBvZiB0aGUgcm91dGUuXG4gKiAtIGBkYXRhYCBpcyBhbiBvcHRpb25hbCBwcm9wZXJ0eSBvZiBhbnkgdHlwZSByZXByZXNlbnRpbmcgYXJiaXRyYXJ5IHJvdXRlIG1ldGFkYXRhIGZvciB0aGUgZ2l2ZW5cbiAqIHJvdXRlLiBJdCBpcyBpbmplY3RhYmxlIHZpYSB7QGxpbmsgUm91dGVEYXRhfS5cbiAqIC0gYHVzZUFzRGVmYXVsdGAgaXMgYSBib29sZWFuIHZhbHVlLiBJZiBgdHJ1ZWAsIHRoZSBjaGlsZCByb3V0ZSB3aWxsIGJlIG5hdmlnYXRlZCB0byBpZiBubyBjaGlsZFxuICogcm91dGUgaXMgc3BlY2lmaWVkIGR1cmluZyB0aGUgbmF2aWdhdGlvbi5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICogYGBgXG4gKiBpbXBvcnQge1JvdXRlQ29uZmlnLCBBc3luY1JvdXRlfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXInO1xuICpcbiAqIEBSb3V0ZUNvbmZpZyhbXG4gKiAgIG5ldyBBc3luY1JvdXRlKHtwYXRoOiAnL2hvbWUnLCBsb2FkZXI6ICgpID0+IFByb21pc2UucmVzb2x2ZShNeUxvYWRlZENtcCksIG5hbWU6XG4gKiAnTXlMb2FkZWRDbXAnfSlcbiAqIF0pXG4gKiBjbGFzcyBNeUFwcCB7fVxuICogYGBgXG4gKi9cbkBDT05TVCgpXG5leHBvcnQgY2xhc3MgQXN5bmNSb3V0ZSBleHRlbmRzIEFic3RyYWN0Um91dGUge1xuICBsb2FkZXI6ICgpID0+IFByb21pc2U8VHlwZT47XG4gIGF1eDogc3RyaW5nID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcih7bmFtZSwgdXNlQXNEZWZhdWx0LCBwYXRoLCByZWdleCwgc2VyaWFsaXplciwgZGF0YSwgbG9hZGVyfTogUm91dGVEZWZpbml0aW9uKSB7XG4gICAgc3VwZXIoe1xuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIHVzZUFzRGVmYXVsdDogdXNlQXNEZWZhdWx0LFxuICAgICAgcGF0aDogcGF0aCxcbiAgICAgIHJlZ2V4OiByZWdleCxcbiAgICAgIHNlcmlhbGl6ZXI6IHNlcmlhbGl6ZXIsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSk7XG4gICAgdGhpcy5sb2FkZXIgPSBsb2FkZXI7XG4gIH1cbn1cblxuLyoqXG4gKiBgUmVkaXJlY3RgIGlzIGEgdHlwZSBvZiB7QGxpbmsgUm91dGVEZWZpbml0aW9ufSB1c2VkIHRvIHJvdXRlIGEgcGF0aCB0byBhIGNhbm9uaWNhbCByb3V0ZS5cbiAqXG4gKiBJdCBoYXMgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICogLSBgcGF0aGAgaXMgYSBzdHJpbmcgdGhhdCB1c2VzIHRoZSByb3V0ZSBtYXRjaGVyIERTTC5cbiAqIC0gYHJlZGlyZWN0VG9gIGlzIGFuIGFycmF5IHJlcHJlc2VudGluZyB0aGUgbGluayBEU0wuXG4gKlxuICogTm90ZSB0aGF0IHJlZGlyZWN0cyAqKmRvIG5vdCoqIGFmZmVjdCBob3cgbGlua3MgYXJlIGdlbmVyYXRlZC4gRm9yIHRoYXQsIHNlZSB0aGUgYHVzZUFzRGVmYXVsdGBcbiAqIG9wdGlvbi5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICogYGBgXG4gKiBpbXBvcnQge1JvdXRlQ29uZmlnLCBSb3V0ZSwgUmVkaXJlY3R9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlcic7XG4gKlxuICogQFJvdXRlQ29uZmlnKFtcbiAqICAgbmV3IFJlZGlyZWN0KHtwYXRoOiAnLycsIHJlZGlyZWN0VG86IFsnL0hvbWUnXSB9KSxcbiAqICAgbmV3IFJvdXRlKHtwYXRoOiAnL2hvbWUnLCBjb21wb25lbnQ6IEhvbWVDbXAsIG5hbWU6ICdIb21lJ30pXG4gKiBdKVxuICogY2xhc3MgTXlBcHAge31cbiAqIGBgYFxuICovXG5AQ09OU1QoKVxuZXhwb3J0IGNsYXNzIFJlZGlyZWN0IGV4dGVuZHMgQWJzdHJhY3RSb3V0ZSB7XG4gIHJlZGlyZWN0VG86IGFueVtdO1xuXG4gIGNvbnN0cnVjdG9yKHtuYW1lLCB1c2VBc0RlZmF1bHQsIHBhdGgsIHJlZ2V4LCBzZXJpYWxpemVyLCBkYXRhLCByZWRpcmVjdFRvfTogUm91dGVEZWZpbml0aW9uKSB7XG4gICAgc3VwZXIoe1xuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIHVzZUFzRGVmYXVsdDogdXNlQXNEZWZhdWx0LFxuICAgICAgcGF0aDogcGF0aCxcbiAgICAgIHJlZ2V4OiByZWdleCxcbiAgICAgIHNlcmlhbGl6ZXI6IHNlcmlhbGl6ZXIsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSk7XG4gICAgdGhpcy5yZWRpcmVjdFRvID0gcmVkaXJlY3RUbztcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
