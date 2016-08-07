System.register(['angular2/core', 'angular2/platform/browser', 'angular2/compiler'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var core_1, browser_1, compiler_1;
    var MyApp, MyUrlResolver;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (compiler_1_1) {
                compiler_1 = compiler_1_1;
            }],
        execute: function() {
            // #docregion url_resolver
            MyUrlResolver = (function (_super) {
                __extends(MyUrlResolver, _super);
                function MyUrlResolver() {
                    _super.apply(this, arguments);
                }
                MyUrlResolver.prototype.resolve = function (baseUrl, url) {
                    // Serve CSS files from a special CDN.
                    if (url.substr(-4) === '.css') {
                        return _super.prototype.resolve.call(this, 'http://cdn.myapp.com/css/', url);
                    }
                    return _super.prototype.resolve.call(this, baseUrl, url);
                };
                return MyUrlResolver;
            }(compiler_1.UrlResolver));
            browser_1.bootstrap(MyApp, [core_1.provide(compiler_1.UrlResolver, { useClass: MyUrlResolver })]);
        }
    }
});
// #enddocregion

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvY29tcGlsZXIvdHMvdXJsX3Jlc29sdmVyL3VybF9yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7UUFJSSxLQUFLOzs7Ozs7Ozs7Ozs7O1lBRVQsMEJBQTBCO1lBQzFCO2dCQUE0QixpQ0FBVztnQkFBdkM7b0JBQTRCLDhCQUFXO2dCQVF2QyxDQUFDO2dCQVBDLCtCQUFPLEdBQVAsVUFBUSxPQUFlLEVBQUUsR0FBVztvQkFDbEMsc0NBQXNDO29CQUN0QyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFDOUIsTUFBTSxDQUFDLGdCQUFLLENBQUMsT0FBTyxZQUFDLDJCQUEyQixFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN6RCxDQUFDO29CQUNELE1BQU0sQ0FBQyxnQkFBSyxDQUFDLE9BQU8sWUFBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ3JDLENBQUM7Z0JBQ0gsb0JBQUM7WUFBRCxDQVJBLEFBUUMsQ0FSMkIsc0JBQVcsR0FRdEM7WUFFRCxtQkFBUyxDQUFDLEtBQUssRUFBRSxDQUFDLGNBQU8sQ0FBQyxzQkFBVyxFQUFFLEVBQUMsUUFBUSxFQUFFLGFBQWEsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O0FBQ3BFLGdCQUFnQiIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL2NvbXBpbGVyL3RzL3VybF9yZXNvbHZlci91cmxfcmVzb2x2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3Byb3ZpZGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtib290c3RyYXB9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXInO1xuaW1wb3J0IHtVcmxSZXNvbHZlcn0gZnJvbSAnYW5ndWxhcjIvY29tcGlsZXInO1xuXG52YXIgTXlBcHA6IGFueTtcblxuLy8gI2RvY3JlZ2lvbiB1cmxfcmVzb2x2ZXJcbmNsYXNzIE15VXJsUmVzb2x2ZXIgZXh0ZW5kcyBVcmxSZXNvbHZlciB7XG4gIHJlc29sdmUoYmFzZVVybDogc3RyaW5nLCB1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgLy8gU2VydmUgQ1NTIGZpbGVzIGZyb20gYSBzcGVjaWFsIENETi5cbiAgICBpZiAodXJsLnN1YnN0cigtNCkgPT09ICcuY3NzJykge1xuICAgICAgcmV0dXJuIHN1cGVyLnJlc29sdmUoJ2h0dHA6Ly9jZG4ubXlhcHAuY29tL2Nzcy8nLCB1cmwpO1xuICAgIH1cbiAgICByZXR1cm4gc3VwZXIucmVzb2x2ZShiYXNlVXJsLCB1cmwpO1xuICB9XG59XG5cbmJvb3RzdHJhcChNeUFwcCwgW3Byb3ZpZGUoVXJsUmVzb2x2ZXIsIHt1c2VDbGFzczogTXlVcmxSZXNvbHZlcn0pXSk7XG4vLyAjZW5kZG9jcmVnaW9uXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
