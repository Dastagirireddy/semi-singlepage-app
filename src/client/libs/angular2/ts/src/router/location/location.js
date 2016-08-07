System.register(['./location_strategy', 'angular2/src/facade/async', 'angular2/core'], function(exports_1, context_1) {
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
    var location_strategy_1, async_1, core_1;
    var Location;
    function _stripBaseHref(baseHref, url) {
        if (baseHref.length > 0 && url.startsWith(baseHref)) {
            return url.substring(baseHref.length);
        }
        return url;
    }
    function stripIndexHtml(url) {
        if (/\/index.html$/g.test(url)) {
            // '/index.html'.length == 11
            return url.substring(0, url.length - 11);
        }
        return url;
    }
    function stripTrailingSlash(url) {
        if (/\/$/g.test(url)) {
            url = url.substring(0, url.length - 1);
        }
        return url;
    }
    return {
        setters:[
            function (location_strategy_1_1) {
                location_strategy_1 = location_strategy_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            /**
             * `Location` is a service that applications can use to interact with a browser's URL.
             * Depending on which {@link LocationStrategy} is used, `Location` will either persist
             * to the URL's path or the URL's hash segment.
             *
             * Note: it's better to use {@link Router#navigate} service to trigger route changes. Use
             * `Location` only if you need to interact with or create normalized URLs outside of
             * routing.
             *
             * `Location` is responsible for normalizing the URL against the application's base href.
             * A normalized URL is absolute from the URL host, includes the application's base href, and has no
             * trailing slash:
             * - `/my/app/user/123` is normalized
             * - `my/app/user/123` **is not** normalized
             * - `/my/app/user/123/` **is not** normalized
             *
             * ### Example
             *
             * ```
             * import {Component} from 'angular2/core';
             * import {
             *   ROUTER_DIRECTIVES,
             *   ROUTER_PROVIDERS,
             *   RouteConfig,
             *   Location
             * } from 'angular2/router';
             *
             * @Component({directives: [ROUTER_DIRECTIVES]})
             * @RouteConfig([
             *  {...},
             * ])
             * class AppCmp {
             *   constructor(location: Location) {
             *     location.go('/foo');
             *   }
             * }
             *
             * bootstrap(AppCmp, [ROUTER_PROVIDERS]);
             * ```
             */
            Location = (function () {
                function Location(platformStrategy) {
                    var _this = this;
                    this.platformStrategy = platformStrategy;
                    /** @internal */
                    this._subject = new async_1.EventEmitter();
                    var browserBaseHref = this.platformStrategy.getBaseHref();
                    this._baseHref = stripTrailingSlash(stripIndexHtml(browserBaseHref));
                    this.platformStrategy.onPopState(function (ev) {
                        async_1.ObservableWrapper.callEmit(_this._subject, { 'url': _this.path(), 'pop': true, 'type': ev.type });
                    });
                }
                /**
                 * Returns the normalized URL path.
                 */
                Location.prototype.path = function () { return this.normalize(this.platformStrategy.path()); };
                /**
                 * Given a string representing a URL, returns the normalized URL path without leading or
                 * trailing slashes
                 */
                Location.prototype.normalize = function (url) {
                    return stripTrailingSlash(_stripBaseHref(this._baseHref, stripIndexHtml(url)));
                };
                /**
                 * Given a string representing a URL, returns the platform-specific external URL path.
                 * If the given URL doesn't begin with a leading slash (`'/'`), this method adds one
                 * before normalizing. This method will also add a hash if `HashLocationStrategy` is
                 * used, or the `APP_BASE_HREF` if the `PathLocationStrategy` is in use.
                 */
                Location.prototype.prepareExternalUrl = function (url) {
                    if (url.length > 0 && !url.startsWith('/')) {
                        url = '/' + url;
                    }
                    return this.platformStrategy.prepareExternalUrl(url);
                };
                // TODO: rename this method to pushState
                /**
                 * Changes the browsers URL to the normalized version of the given URL, and pushes a
                 * new item onto the platform's history.
                 */
                Location.prototype.go = function (path, query) {
                    if (query === void 0) { query = ''; }
                    this.platformStrategy.pushState(null, '', path, query);
                };
                /**
                 * Changes the browsers URL to the normalized version of the given URL, and replaces
                 * the top item on the platform's history stack.
                 */
                Location.prototype.replaceState = function (path, query) {
                    if (query === void 0) { query = ''; }
                    this.platformStrategy.replaceState(null, '', path, query);
                };
                /**
                 * Navigates forward in the platform's history.
                 */
                Location.prototype.forward = function () { this.platformStrategy.forward(); };
                /**
                 * Navigates back in the platform's history.
                 */
                Location.prototype.back = function () { this.platformStrategy.back(); };
                /**
                 * Subscribe to the platform's `popState` events.
                 */
                Location.prototype.subscribe = function (onNext, onThrow, onReturn) {
                    if (onThrow === void 0) { onThrow = null; }
                    if (onReturn === void 0) { onReturn = null; }
                    return async_1.ObservableWrapper.subscribe(this._subject, onNext, onThrow, onReturn);
                };
                Location = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [location_strategy_1.LocationStrategy])
                ], Location);
                return Location;
            }());
            exports_1("Location", Location);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9sb2NhdGlvbi9sb2NhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQXlIQSx3QkFBd0IsUUFBZ0IsRUFBRSxHQUFXO1FBQ25ELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRCx3QkFBd0IsR0FBVztRQUNqQyxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLDZCQUE2QjtZQUM3QixNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRCw0QkFBNEIsR0FBVztRQUNyQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixHQUFHLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNiLENBQUM7Ozs7Ozs7Ozs7Ozs7WUF6SUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQXVDRztZQUVIO2dCQU1FLGtCQUFtQixnQkFBa0M7b0JBTnZELGlCQTBFQztvQkFw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RUQsK0JBMEVDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvcm91dGVyL2xvY2F0aW9uL2xvY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtMb2NhdGlvblN0cmF0ZWd5fSBmcm9tICcuL2xvY2F0aW9uX3N0cmF0ZWd5JztcbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBPYnNlcnZhYmxlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5pbXBvcnQge0luamVjdGFibGUsIEluamVjdH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5cbi8qKlxuICogYExvY2F0aW9uYCBpcyBhIHNlcnZpY2UgdGhhdCBhcHBsaWNhdGlvbnMgY2FuIHVzZSB0byBpbnRlcmFjdCB3aXRoIGEgYnJvd3NlcidzIFVSTC5cbiAqIERlcGVuZGluZyBvbiB3aGljaCB7QGxpbmsgTG9jYXRpb25TdHJhdGVneX0gaXMgdXNlZCwgYExvY2F0aW9uYCB3aWxsIGVpdGhlciBwZXJzaXN0XG4gKiB0byB0aGUgVVJMJ3MgcGF0aCBvciB0aGUgVVJMJ3MgaGFzaCBzZWdtZW50LlxuICpcbiAqIE5vdGU6IGl0J3MgYmV0dGVyIHRvIHVzZSB7QGxpbmsgUm91dGVyI25hdmlnYXRlfSBzZXJ2aWNlIHRvIHRyaWdnZXIgcm91dGUgY2hhbmdlcy4gVXNlXG4gKiBgTG9jYXRpb25gIG9ubHkgaWYgeW91IG5lZWQgdG8gaW50ZXJhY3Qgd2l0aCBvciBjcmVhdGUgbm9ybWFsaXplZCBVUkxzIG91dHNpZGUgb2ZcbiAqIHJvdXRpbmcuXG4gKlxuICogYExvY2F0aW9uYCBpcyByZXNwb25zaWJsZSBmb3Igbm9ybWFsaXppbmcgdGhlIFVSTCBhZ2FpbnN0IHRoZSBhcHBsaWNhdGlvbidzIGJhc2UgaHJlZi5cbiAqIEEgbm9ybWFsaXplZCBVUkwgaXMgYWJzb2x1dGUgZnJvbSB0aGUgVVJMIGhvc3QsIGluY2x1ZGVzIHRoZSBhcHBsaWNhdGlvbidzIGJhc2UgaHJlZiwgYW5kIGhhcyBub1xuICogdHJhaWxpbmcgc2xhc2g6XG4gKiAtIGAvbXkvYXBwL3VzZXIvMTIzYCBpcyBub3JtYWxpemVkXG4gKiAtIGBteS9hcHAvdXNlci8xMjNgICoqaXMgbm90Kiogbm9ybWFsaXplZFxuICogLSBgL215L2FwcC91c2VyLzEyMy9gICoqaXMgbm90Kiogbm9ybWFsaXplZFxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgXG4gKiBpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG4gKiBpbXBvcnQge1xuICogICBST1VURVJfRElSRUNUSVZFUyxcbiAqICAgUk9VVEVSX1BST1ZJREVSUyxcbiAqICAgUm91dGVDb25maWcsXG4gKiAgIExvY2F0aW9uXG4gKiB9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlcic7XG4gKlxuICogQENvbXBvbmVudCh7ZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTXX0pXG4gKiBAUm91dGVDb25maWcoW1xuICogIHsuLi59LFxuICogXSlcbiAqIGNsYXNzIEFwcENtcCB7XG4gKiAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uOiBMb2NhdGlvbikge1xuICogICAgIGxvY2F0aW9uLmdvKCcvZm9vJyk7XG4gKiAgIH1cbiAqIH1cbiAqXG4gKiBib290c3RyYXAoQXBwQ21wLCBbUk9VVEVSX1BST1ZJREVSU10pO1xuICogYGBgXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2NhdGlvbiB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3N1YmplY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAvKiogQGludGVybmFsICovXG4gIF9iYXNlSHJlZjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwbGF0Zm9ybVN0cmF0ZWd5OiBMb2NhdGlvblN0cmF0ZWd5KSB7XG4gICAgdmFyIGJyb3dzZXJCYXNlSHJlZiA9IHRoaXMucGxhdGZvcm1TdHJhdGVneS5nZXRCYXNlSHJlZigpO1xuICAgIHRoaXMuX2Jhc2VIcmVmID0gc3RyaXBUcmFpbGluZ1NsYXNoKHN0cmlwSW5kZXhIdG1sKGJyb3dzZXJCYXNlSHJlZikpO1xuICAgIHRoaXMucGxhdGZvcm1TdHJhdGVneS5vblBvcFN0YXRlKChldikgPT4ge1xuICAgICAgT2JzZXJ2YWJsZVdyYXBwZXIuY2FsbEVtaXQodGhpcy5fc3ViamVjdCwgeyd1cmwnOiB0aGlzLnBhdGgoKSwgJ3BvcCc6IHRydWUsICd0eXBlJzogZXYudHlwZX0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG5vcm1hbGl6ZWQgVVJMIHBhdGguXG4gICAqL1xuICBwYXRoKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLm5vcm1hbGl6ZSh0aGlzLnBsYXRmb3JtU3RyYXRlZ3kucGF0aCgpKTsgfVxuXG4gIC8qKlxuICAgKiBHaXZlbiBhIHN0cmluZyByZXByZXNlbnRpbmcgYSBVUkwsIHJldHVybnMgdGhlIG5vcm1hbGl6ZWQgVVJMIHBhdGggd2l0aG91dCBsZWFkaW5nIG9yXG4gICAqIHRyYWlsaW5nIHNsYXNoZXNcbiAgICovXG4gIG5vcm1hbGl6ZSh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHN0cmlwVHJhaWxpbmdTbGFzaChfc3RyaXBCYXNlSHJlZih0aGlzLl9iYXNlSHJlZiwgc3RyaXBJbmRleEh0bWwodXJsKSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdpdmVuIGEgc3RyaW5nIHJlcHJlc2VudGluZyBhIFVSTCwgcmV0dXJucyB0aGUgcGxhdGZvcm0tc3BlY2lmaWMgZXh0ZXJuYWwgVVJMIHBhdGguXG4gICAqIElmIHRoZSBnaXZlbiBVUkwgZG9lc24ndCBiZWdpbiB3aXRoIGEgbGVhZGluZyBzbGFzaCAoYCcvJ2ApLCB0aGlzIG1ldGhvZCBhZGRzIG9uZVxuICAgKiBiZWZvcmUgbm9ybWFsaXppbmcuIFRoaXMgbWV0aG9kIHdpbGwgYWxzbyBhZGQgYSBoYXNoIGlmIGBIYXNoTG9jYXRpb25TdHJhdGVneWAgaXNcbiAgICogdXNlZCwgb3IgdGhlIGBBUFBfQkFTRV9IUkVGYCBpZiB0aGUgYFBhdGhMb2NhdGlvblN0cmF0ZWd5YCBpcyBpbiB1c2UuXG4gICAqL1xuICBwcmVwYXJlRXh0ZXJuYWxVcmwodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICh1cmwubGVuZ3RoID4gMCAmJiAhdXJsLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgdXJsID0gJy8nICsgdXJsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wbGF0Zm9ybVN0cmF0ZWd5LnByZXBhcmVFeHRlcm5hbFVybCh1cmwpO1xuICB9XG5cbiAgLy8gVE9ETzogcmVuYW1lIHRoaXMgbWV0aG9kIHRvIHB1c2hTdGF0ZVxuICAvKipcbiAgICogQ2hhbmdlcyB0aGUgYnJvd3NlcnMgVVJMIHRvIHRoZSBub3JtYWxpemVkIHZlcnNpb24gb2YgdGhlIGdpdmVuIFVSTCwgYW5kIHB1c2hlcyBhXG4gICAqIG5ldyBpdGVtIG9udG8gdGhlIHBsYXRmb3JtJ3MgaGlzdG9yeS5cbiAgICovXG4gIGdvKHBhdGg6IHN0cmluZywgcXVlcnk6IHN0cmluZyA9ICcnKTogdm9pZCB7XG4gICAgdGhpcy5wbGF0Zm9ybVN0cmF0ZWd5LnB1c2hTdGF0ZShudWxsLCAnJywgcGF0aCwgcXVlcnkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZXMgdGhlIGJyb3dzZXJzIFVSTCB0byB0aGUgbm9ybWFsaXplZCB2ZXJzaW9uIG9mIHRoZSBnaXZlbiBVUkwsIGFuZCByZXBsYWNlc1xuICAgKiB0aGUgdG9wIGl0ZW0gb24gdGhlIHBsYXRmb3JtJ3MgaGlzdG9yeSBzdGFjay5cbiAgICovXG4gIHJlcGxhY2VTdGF0ZShwYXRoOiBzdHJpbmcsIHF1ZXJ5OiBzdHJpbmcgPSAnJyk6IHZvaWQge1xuICAgIHRoaXMucGxhdGZvcm1TdHJhdGVneS5yZXBsYWNlU3RhdGUobnVsbCwgJycsIHBhdGgsIHF1ZXJ5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZXMgZm9yd2FyZCBpbiB0aGUgcGxhdGZvcm0ncyBoaXN0b3J5LlxuICAgKi9cbiAgZm9yd2FyZCgpOiB2b2lkIHsgdGhpcy5wbGF0Zm9ybVN0cmF0ZWd5LmZvcndhcmQoKTsgfVxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZXMgYmFjayBpbiB0aGUgcGxhdGZvcm0ncyBoaXN0b3J5LlxuICAgKi9cbiAgYmFjaygpOiB2b2lkIHsgdGhpcy5wbGF0Zm9ybVN0cmF0ZWd5LmJhY2soKTsgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmUgdG8gdGhlIHBsYXRmb3JtJ3MgYHBvcFN0YXRlYCBldmVudHMuXG4gICAqL1xuICBzdWJzY3JpYmUob25OZXh0OiAodmFsdWU6IGFueSkgPT4gdm9pZCwgb25UaHJvdzogKGV4Y2VwdGlvbjogYW55KSA9PiB2b2lkID0gbnVsbCxcbiAgICAgICAgICAgIG9uUmV0dXJuOiAoKSA9PiB2b2lkID0gbnVsbCk6IE9iamVjdCB7XG4gICAgcmV0dXJuIE9ic2VydmFibGVXcmFwcGVyLnN1YnNjcmliZSh0aGlzLl9zdWJqZWN0LCBvbk5leHQsIG9uVGhyb3csIG9uUmV0dXJuKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfc3RyaXBCYXNlSHJlZihiYXNlSHJlZjogc3RyaW5nLCB1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChiYXNlSHJlZi5sZW5ndGggPiAwICYmIHVybC5zdGFydHNXaXRoKGJhc2VIcmVmKSkge1xuICAgIHJldHVybiB1cmwuc3Vic3RyaW5nKGJhc2VIcmVmLmxlbmd0aCk7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn1cblxuZnVuY3Rpb24gc3RyaXBJbmRleEh0bWwodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAoL1xcL2luZGV4Lmh0bWwkL2cudGVzdCh1cmwpKSB7XG4gICAgLy8gJy9pbmRleC5odG1sJy5sZW5ndGggPT0gMTFcbiAgICByZXR1cm4gdXJsLnN1YnN0cmluZygwLCB1cmwubGVuZ3RoIC0gMTEpO1xuICB9XG4gIHJldHVybiB1cmw7XG59XG5cbmZ1bmN0aW9uIHN0cmlwVHJhaWxpbmdTbGFzaCh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmICgvXFwvJC9nLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zdWJzdHJpbmcoMCwgdXJsLmxlbmd0aCAtIDEpO1xuICB9XG4gIHJldHVybiB1cmw7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
