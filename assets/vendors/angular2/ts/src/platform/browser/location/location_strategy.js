System.register(['angular2/src/facade/lang', 'angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, core_1;
    var LocationStrategy, APP_BASE_HREF;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            /**
             * `LocationStrategy` is responsible for representing and reading route state
             * from the browser's URL. Angular provides two strategies:
             * {@link HashLocationStrategy} and {@link PathLocationStrategy} (default).
             *
             * This is used under the hood of the {@link Location} service.
             *
             * Applications should use the {@link Router} or {@link Location} services to
             * interact with application route state.
             *
             * For instance, {@link HashLocationStrategy} produces URLs like
             * `http://example.com#/foo`, and {@link PathLocationStrategy} produces
             * `http://example.com/foo` as an equivalent URL.
             *
             * See these two classes for more.
             */
            LocationStrategy = (function () {
                function LocationStrategy() {
                }
                return LocationStrategy;
            }());
            exports_1("LocationStrategy", LocationStrategy);
            /**
             * The `APP_BASE_HREF` token represents the base href to be used with the
             * {@link PathLocationStrategy}.
             *
             * If you're using {@link PathLocationStrategy}, you must provide a provider to a string
             * representing the URL prefix that should be preserved when generating and recognizing
             * URLs.
             *
             * ### Example
             *
             * ```
             * import {Component} from 'angular2/core';
             * import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig} from 'angular2/router';
             * import {APP_BASE_HREF} from 'angular2/platform/common';
             *
             * @Component({directives: [ROUTER_DIRECTIVES]})
             * @RouteConfig([
             *  {...},
             * ])
             * class AppCmp {
             *   // ...
             * }
             *
             * bootstrap(AppCmp, [
             *   ROUTER_PROVIDERS,
             *   provide(APP_BASE_HREF, {useValue: '/my/app'})
             * ]);
             * ```
             */
            exports_1("APP_BASE_HREF", APP_BASE_HREF = lang_1.CONST_EXPR(new core_1.OpaqueToken('appBaseHref')));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9icm93c2VyL2xvY2F0aW9uL2xvY2F0aW9uX3N0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7MEJBNkRhLGFBQWE7Ozs7Ozs7Ozs7WUF6RDFCOzs7Ozs7Ozs7Ozs7Ozs7ZUFlRztZQUNIO2dCQUFBO2dCQVNBLENBQUM7Z0JBQUQsdUJBQUM7WUFBRCxDQVRBLEFBU0MsSUFBQTtZQVRELCtDQVNDLENBQUE7WUFHRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQTRCRztZQUNVLDJCQUFBLGFBQWEsR0FBZ0IsaUJBQVUsQ0FBQyxJQUFJLGtCQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQSxDQUFDIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9icm93c2VyL2xvY2F0aW9uL2xvY2F0aW9uX3N0cmF0ZWd5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDT05TVF9FWFBSfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtPcGFxdWVUb2tlbn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1VybENoYW5nZUxpc3RlbmVyfSBmcm9tICcuL3BsYXRmb3JtX2xvY2F0aW9uJztcblxuLyoqXG4gKiBgTG9jYXRpb25TdHJhdGVneWAgaXMgcmVzcG9uc2libGUgZm9yIHJlcHJlc2VudGluZyBhbmQgcmVhZGluZyByb3V0ZSBzdGF0ZVxuICogZnJvbSB0aGUgYnJvd3NlcidzIFVSTC4gQW5ndWxhciBwcm92aWRlcyB0d28gc3RyYXRlZ2llczpcbiAqIHtAbGluayBIYXNoTG9jYXRpb25TdHJhdGVneX0gYW5kIHtAbGluayBQYXRoTG9jYXRpb25TdHJhdGVneX0gKGRlZmF1bHQpLlxuICpcbiAqIFRoaXMgaXMgdXNlZCB1bmRlciB0aGUgaG9vZCBvZiB0aGUge0BsaW5rIExvY2F0aW9ufSBzZXJ2aWNlLlxuICpcbiAqIEFwcGxpY2F0aW9ucyBzaG91bGQgdXNlIHRoZSB7QGxpbmsgUm91dGVyfSBvciB7QGxpbmsgTG9jYXRpb259IHNlcnZpY2VzIHRvXG4gKiBpbnRlcmFjdCB3aXRoIGFwcGxpY2F0aW9uIHJvdXRlIHN0YXRlLlxuICpcbiAqIEZvciBpbnN0YW5jZSwge0BsaW5rIEhhc2hMb2NhdGlvblN0cmF0ZWd5fSBwcm9kdWNlcyBVUkxzIGxpa2VcbiAqIGBodHRwOi8vZXhhbXBsZS5jb20jL2Zvb2AsIGFuZCB7QGxpbmsgUGF0aExvY2F0aW9uU3RyYXRlZ3l9IHByb2R1Y2VzXG4gKiBgaHR0cDovL2V4YW1wbGUuY29tL2Zvb2AgYXMgYW4gZXF1aXZhbGVudCBVUkwuXG4gKlxuICogU2VlIHRoZXNlIHR3byBjbGFzc2VzIGZvciBtb3JlLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTG9jYXRpb25TdHJhdGVneSB7XG4gIGFic3RyYWN0IHBhdGgoKTogc3RyaW5nO1xuICBhYnN0cmFjdCBwcmVwYXJlRXh0ZXJuYWxVcmwoaW50ZXJuYWw6IHN0cmluZyk6IHN0cmluZztcbiAgYWJzdHJhY3QgcHVzaFN0YXRlKHN0YXRlOiBhbnksIHRpdGxlOiBzdHJpbmcsIHVybDogc3RyaW5nLCBxdWVyeVBhcmFtczogc3RyaW5nKTogdm9pZDtcbiAgYWJzdHJhY3QgcmVwbGFjZVN0YXRlKHN0YXRlOiBhbnksIHRpdGxlOiBzdHJpbmcsIHVybDogc3RyaW5nLCBxdWVyeVBhcmFtczogc3RyaW5nKTogdm9pZDtcbiAgYWJzdHJhY3QgZm9yd2FyZCgpOiB2b2lkO1xuICBhYnN0cmFjdCBiYWNrKCk6IHZvaWQ7XG4gIGFic3RyYWN0IG9uUG9wU3RhdGUoZm46IFVybENoYW5nZUxpc3RlbmVyKTogdm9pZDtcbiAgYWJzdHJhY3QgZ2V0QmFzZUhyZWYoKTogc3RyaW5nO1xufVxuXG5cbi8qKlxuICogVGhlIGBBUFBfQkFTRV9IUkVGYCB0b2tlbiByZXByZXNlbnRzIHRoZSBiYXNlIGhyZWYgdG8gYmUgdXNlZCB3aXRoIHRoZVxuICoge0BsaW5rIFBhdGhMb2NhdGlvblN0cmF0ZWd5fS5cbiAqXG4gKiBJZiB5b3UncmUgdXNpbmcge0BsaW5rIFBhdGhMb2NhdGlvblN0cmF0ZWd5fSwgeW91IG11c3QgcHJvdmlkZSBhIHByb3ZpZGVyIHRvIGEgc3RyaW5nXG4gKiByZXByZXNlbnRpbmcgdGhlIFVSTCBwcmVmaXggdGhhdCBzaG91bGQgYmUgcHJlc2VydmVkIHdoZW4gZ2VuZXJhdGluZyBhbmQgcmVjb2duaXppbmdcbiAqIFVSTHMuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGBcbiAqIGltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbiAqIGltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVMsIFJPVVRFUl9QUk9WSURFUlMsIFJvdXRlQ29uZmlnfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXInO1xuICogaW1wb3J0IHtBUFBfQkFTRV9IUkVGfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9jb21tb24nO1xuICpcbiAqIEBDb21wb25lbnQoe2RpcmVjdGl2ZXM6IFtST1VURVJfRElSRUNUSVZFU119KVxuICogQFJvdXRlQ29uZmlnKFtcbiAqICB7Li4ufSxcbiAqIF0pXG4gKiBjbGFzcyBBcHBDbXAge1xuICogICAvLyAuLi5cbiAqIH1cbiAqXG4gKiBib290c3RyYXAoQXBwQ21wLCBbXG4gKiAgIFJPVVRFUl9QUk9WSURFUlMsXG4gKiAgIHByb3ZpZGUoQVBQX0JBU0VfSFJFRiwge3VzZVZhbHVlOiAnL215L2FwcCd9KVxuICogXSk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNvbnN0IEFQUF9CQVNFX0hSRUY6IE9wYXF1ZVRva2VuID0gQ09OU1RfRVhQUihuZXcgT3BhcXVlVG9rZW4oJ2FwcEJhc2VIcmVmJykpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
