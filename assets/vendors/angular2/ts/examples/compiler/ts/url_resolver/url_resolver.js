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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL2NvbXBpbGVyL3RzL3VybF9yZXNvbHZlci91cmxfcmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O1FBSUksS0FBSzs7Ozs7Ozs7Ozs7OztZQUVULDBCQUEwQjtZQUMxQjtnQkFBNEIsaUNBQVc7Z0JBQXZDO29CQUE0Qiw4QkFBVztnQkFRdkMsQ0FBQztnQkFQQywrQkFBTyxHQUFQLFVBQVEsT0FBZSxFQUFFLEdBQVc7b0JBQ2xDLHNDQUFzQztvQkFDdEMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7d0JBQzlCLE1BQU0sQ0FBQyxnQkFBSyxDQUFDLE9BQU8sWUFBQywyQkFBMkIsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDekQsQ0FBQztvQkFDRCxNQUFNLENBQUMsZ0JBQUssQ0FBQyxPQUFPLFlBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQyxDQUFDO2dCQUNILG9CQUFDO1lBQUQsQ0FSQSxBQVFDLENBUjJCLHNCQUFXLEdBUXRDO1lBRUQsbUJBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxjQUFPLENBQUMsc0JBQVcsRUFBRSxFQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztBQUNwRSxnQkFBZ0IiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvY29tcGlsZXIvdHMvdXJsX3Jlc29sdmVyL3VybF9yZXNvbHZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7cHJvdmlkZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge2Jvb3RzdHJhcH0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vYnJvd3Nlcic7XG5pbXBvcnQge1VybFJlc29sdmVyfSBmcm9tICdhbmd1bGFyMi9jb21waWxlcic7XG5cbnZhciBNeUFwcDogYW55O1xuXG4vLyAjZG9jcmVnaW9uIHVybF9yZXNvbHZlclxuY2xhc3MgTXlVcmxSZXNvbHZlciBleHRlbmRzIFVybFJlc29sdmVyIHtcbiAgcmVzb2x2ZShiYXNlVXJsOiBzdHJpbmcsIHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAvLyBTZXJ2ZSBDU1MgZmlsZXMgZnJvbSBhIHNwZWNpYWwgQ0ROLlxuICAgIGlmICh1cmwuc3Vic3RyKC00KSA9PT0gJy5jc3MnKSB7XG4gICAgICByZXR1cm4gc3VwZXIucmVzb2x2ZSgnaHR0cDovL2Nkbi5teWFwcC5jb20vY3NzLycsIHVybCk7XG4gICAgfVxuICAgIHJldHVybiBzdXBlci5yZXNvbHZlKGJhc2VVcmwsIHVybCk7XG4gIH1cbn1cblxuYm9vdHN0cmFwKE15QXBwLCBbcHJvdmlkZShVcmxSZXNvbHZlciwge3VzZUNsYXNzOiBNeVVybFJlc29sdmVyfSldKTtcbi8vICNlbmRkb2NyZWdpb25cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
