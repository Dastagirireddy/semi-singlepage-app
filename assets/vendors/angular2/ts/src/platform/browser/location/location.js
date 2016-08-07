System.register(['angular2/src/facade/async', 'angular2/core', './location_strategy'], function(exports_1, context_1) {
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
    var async_1, core_1, location_strategy_1;
    var Location;
    function _stripBaseHref(baseHref, url) {
        if (baseHref.length > 0 && url.startsWith(baseHref)) {
            return url.substring(baseHref.length);
        }
        return url;
    }
    function _stripIndexHtml(url) {
        if (/\/index.html$/g.test(url)) {
            // '/index.html'.length == 11
            return url.substring(0, url.length - 11);
        }
        return url;
    }
    return {
        setters:[
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (location_strategy_1_1) {
                location_strategy_1 = location_strategy_1_1;
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
             * import {Location} from 'angular2/platform/common';
             * import {
             *   ROUTER_DIRECTIVES,
             *   ROUTER_PROVIDERS,
             *   RouteConfig
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
                    this._baseHref = Location.stripTrailingSlash(_stripIndexHtml(browserBaseHref));
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
                    return Location.stripTrailingSlash(_stripBaseHref(this._baseHref, _stripIndexHtml(url)));
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
                /**
                 * Given a string of url parameters, prepend with '?' if needed, otherwise return parameters as
                 * is.
                 */
                Location.normalizeQueryParams = function (params) {
                    return (params.length > 0 && params.substring(0, 1) != '?') ? ('?' + params) : params;
                };
                /**
                 * Given 2 parts of a url, join them with a slash if needed.
                 */
                Location.joinWithSlash = function (start, end) {
                    if (start.length == 0) {
                        return end;
                    }
                    if (end.length == 0) {
                        return start;
                    }
                    var slashes = 0;
                    if (start.endsWith('/')) {
                        slashes++;
                    }
                    if (end.startsWith('/')) {
                        slashes++;
                    }
                    if (slashes == 2) {
                        return start + end.substring(1);
                    }
                    if (slashes == 1) {
                        return start + end;
                    }
                    return start + '/' + end;
                };
                /**
                 * If url has a trailing slash, remove it, otherwise return url as is.
                 */
                Location.stripTrailingSlash = function (url) {
                    if (/\/$/g.test(url)) {
                        url = url.substring(0, url.length - 1);
                    }
                    return url;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9icm93c2VyL2xvY2F0aW9uL2xvY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBcUtBLHdCQUF3QixRQUFnQixFQUFFLEdBQVc7UUFDbkQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVELHlCQUF5QixHQUFXO1FBQ2xDLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsNkJBQTZCO1lBQzdCLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2IsQ0FBQzs7Ozs7Ozs7Ozs7OztZQTlLRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBdUNHO1lBRUg7Z0JBTUUsa0JBQW1CLGdCQUFrQztvQkFOdkQsaUJBc0hDO29CQWhIb0IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtvQkFMckQsZ0JBQWdCO29CQUNoQixhQUFRLEdBQXNCLElBQUksb0JBQVksRUFBRSxDQUFDO29CQUsvQyxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQzFELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxlQUFl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LENBQUMsQ0FBQztvQkFDekMsQ0FBQztvQkFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO2dCQUNiLENBQUM7Z0JBdEhIO29CQUFDLGlCQUFVLEVBQUU7OzRCQUFBO2dCQXVIYixlQUFDO1lBQUQsQ0F0SEEsQUFzSEMsSUFBQTtZQXRIRCwrQkFzSEMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvcGxhdGZvcm0vYnJvd3Nlci9sb2NhdGlvbi9sb2NhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnRFbWl0dGVyLCBPYnNlcnZhYmxlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5pbXBvcnQge0luamVjdGFibGUsIEluamVjdH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0xvY2F0aW9uU3RyYXRlZ3l9IGZyb20gJy4vbG9jYXRpb25fc3RyYXRlZ3knO1xuXG4vKipcbiAqIGBMb2NhdGlvbmAgaXMgYSBzZXJ2aWNlIHRoYXQgYXBwbGljYXRpb25zIGNhbiB1c2UgdG8gaW50ZXJhY3Qgd2l0aCBhIGJyb3dzZXIncyBVUkwuXG4gKiBEZXBlbmRpbmcgb24gd2hpY2gge0BsaW5rIExvY2F0aW9uU3RyYXRlZ3l9IGlzIHVzZWQsIGBMb2NhdGlvbmAgd2lsbCBlaXRoZXIgcGVyc2lzdFxuICogdG8gdGhlIFVSTCdzIHBhdGggb3IgdGhlIFVSTCdzIGhhc2ggc2VnbWVudC5cbiAqXG4gKiBOb3RlOiBpdCdzIGJldHRlciB0byB1c2Uge0BsaW5rIFJvdXRlciNuYXZpZ2F0ZX0gc2VydmljZSB0byB0cmlnZ2VyIHJvdXRlIGNoYW5nZXMuIFVzZVxuICogYExvY2F0aW9uYCBvbmx5IGlmIHlvdSBuZWVkIHRvIGludGVyYWN0IHdpdGggb3IgY3JlYXRlIG5vcm1hbGl6ZWQgVVJMcyBvdXRzaWRlIG9mXG4gKiByb3V0aW5nLlxuICpcbiAqIGBMb2NhdGlvbmAgaXMgcmVzcG9uc2libGUgZm9yIG5vcm1hbGl6aW5nIHRoZSBVUkwgYWdhaW5zdCB0aGUgYXBwbGljYXRpb24ncyBiYXNlIGhyZWYuXG4gKiBBIG5vcm1hbGl6ZWQgVVJMIGlzIGFic29sdXRlIGZyb20gdGhlIFVSTCBob3N0LCBpbmNsdWRlcyB0aGUgYXBwbGljYXRpb24ncyBiYXNlIGhyZWYsIGFuZCBoYXMgbm9cbiAqIHRyYWlsaW5nIHNsYXNoOlxuICogLSBgL215L2FwcC91c2VyLzEyM2AgaXMgbm9ybWFsaXplZFxuICogLSBgbXkvYXBwL3VzZXIvMTIzYCAqKmlzIG5vdCoqIG5vcm1hbGl6ZWRcbiAqIC0gYC9teS9hcHAvdXNlci8xMjMvYCAqKmlzIG5vdCoqIG5vcm1hbGl6ZWRcbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYFxuICogaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuICogaW1wb3J0IHtMb2NhdGlvbn0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vY29tbW9uJztcbiAqIGltcG9ydCB7XG4gKiAgIFJPVVRFUl9ESVJFQ1RJVkVTLFxuICogICBST1VURVJfUFJPVklERVJTLFxuICogICBSb3V0ZUNvbmZpZ1xuICogfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXInO1xuICpcbiAqIEBDb21wb25lbnQoe2RpcmVjdGl2ZXM6IFtST1VURVJfRElSRUNUSVZFU119KVxuICogQFJvdXRlQ29uZmlnKFtcbiAqICB7Li4ufSxcbiAqIF0pXG4gKiBjbGFzcyBBcHBDbXAge1xuICogICBjb25zdHJ1Y3Rvcihsb2NhdGlvbjogTG9jYXRpb24pIHtcbiAqICAgICBsb2NhdGlvbi5nbygnL2ZvbycpO1xuICogICB9XG4gKiB9XG4gKlxuICogYm9vdHN0cmFwKEFwcENtcCwgW1JPVVRFUl9QUk9WSURFUlNdKTtcbiAqIGBgYFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9jYXRpb24ge1xuICAvKiogQGludGVybmFsICovXG4gIF9zdWJqZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfYmFzZUhyZWY6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGxhdGZvcm1TdHJhdGVneTogTG9jYXRpb25TdHJhdGVneSkge1xuICAgIHZhciBicm93c2VyQmFzZUhyZWYgPSB0aGlzLnBsYXRmb3JtU3RyYXRlZ3kuZ2V0QmFzZUhyZWYoKTtcbiAgICB0aGlzLl9iYXNlSHJlZiA9IExvY2F0aW9uLnN0cmlwVHJhaWxpbmdTbGFzaChfc3RyaXBJbmRleEh0bWwoYnJvd3NlckJhc2VIcmVmKSk7XG4gICAgdGhpcy5wbGF0Zm9ybVN0cmF0ZWd5Lm9uUG9wU3RhdGUoKGV2KSA9PiB7XG4gICAgICBPYnNlcnZhYmxlV3JhcHBlci5jYWxsRW1pdCh0aGlzLl9zdWJqZWN0LCB7J3VybCc6IHRoaXMucGF0aCgpLCAncG9wJzogdHJ1ZSwgJ3R5cGUnOiBldi50eXBlfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbm9ybWFsaXplZCBVUkwgcGF0aC5cbiAgICovXG4gIHBhdGgoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMubm9ybWFsaXplKHRoaXMucGxhdGZvcm1TdHJhdGVneS5wYXRoKCkpOyB9XG5cbiAgLyoqXG4gICAqIEdpdmVuIGEgc3RyaW5nIHJlcHJlc2VudGluZyBhIFVSTCwgcmV0dXJucyB0aGUgbm9ybWFsaXplZCBVUkwgcGF0aCB3aXRob3V0IGxlYWRpbmcgb3JcbiAgICogdHJhaWxpbmcgc2xhc2hlc1xuICAgKi9cbiAgbm9ybWFsaXplKHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gTG9jYXRpb24uc3RyaXBUcmFpbGluZ1NsYXNoKF9zdHJpcEJhc2VIcmVmKHRoaXMuX2Jhc2VIcmVmLCBfc3RyaXBJbmRleEh0bWwodXJsKSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdpdmVuIGEgc3RyaW5nIHJlcHJlc2VudGluZyBhIFVSTCwgcmV0dXJucyB0aGUgcGxhdGZvcm0tc3BlY2lmaWMgZXh0ZXJuYWwgVVJMIHBhdGguXG4gICAqIElmIHRoZSBnaXZlbiBVUkwgZG9lc24ndCBiZWdpbiB3aXRoIGEgbGVhZGluZyBzbGFzaCAoYCcvJ2ApLCB0aGlzIG1ldGhvZCBhZGRzIG9uZVxuICAgKiBiZWZvcmUgbm9ybWFsaXppbmcuIFRoaXMgbWV0aG9kIHdpbGwgYWxzbyBhZGQgYSBoYXNoIGlmIGBIYXNoTG9jYXRpb25TdHJhdGVneWAgaXNcbiAgICogdXNlZCwgb3IgdGhlIGBBUFBfQkFTRV9IUkVGYCBpZiB0aGUgYFBhdGhMb2NhdGlvblN0cmF0ZWd5YCBpcyBpbiB1c2UuXG4gICAqL1xuICBwcmVwYXJlRXh0ZXJuYWxVcmwodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICh1cmwubGVuZ3RoID4gMCAmJiAhdXJsLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgdXJsID0gJy8nICsgdXJsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wbGF0Zm9ybVN0cmF0ZWd5LnByZXBhcmVFeHRlcm5hbFVybCh1cmwpO1xuICB9XG5cbiAgLy8gVE9ETzogcmVuYW1lIHRoaXMgbWV0aG9kIHRvIHB1c2hTdGF0ZVxuICAvKipcbiAgICogQ2hhbmdlcyB0aGUgYnJvd3NlcnMgVVJMIHRvIHRoZSBub3JtYWxpemVkIHZlcnNpb24gb2YgdGhlIGdpdmVuIFVSTCwgYW5kIHB1c2hlcyBhXG4gICAqIG5ldyBpdGVtIG9udG8gdGhlIHBsYXRmb3JtJ3MgaGlzdG9yeS5cbiAgICovXG4gIGdvKHBhdGg6IHN0cmluZywgcXVlcnk6IHN0cmluZyA9ICcnKTogdm9pZCB7XG4gICAgdGhpcy5wbGF0Zm9ybVN0cmF0ZWd5LnB1c2hTdGF0ZShudWxsLCAnJywgcGF0aCwgcXVlcnkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZXMgdGhlIGJyb3dzZXJzIFVSTCB0byB0aGUgbm9ybWFsaXplZCB2ZXJzaW9uIG9mIHRoZSBnaXZlbiBVUkwsIGFuZCByZXBsYWNlc1xuICAgKiB0aGUgdG9wIGl0ZW0gb24gdGhlIHBsYXRmb3JtJ3MgaGlzdG9yeSBzdGFjay5cbiAgICovXG4gIHJlcGxhY2VTdGF0ZShwYXRoOiBzdHJpbmcsIHF1ZXJ5OiBzdHJpbmcgPSAnJyk6IHZvaWQge1xuICAgIHRoaXMucGxhdGZvcm1TdHJhdGVneS5yZXBsYWNlU3RhdGUobnVsbCwgJycsIHBhdGgsIHF1ZXJ5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZXMgZm9yd2FyZCBpbiB0aGUgcGxhdGZvcm0ncyBoaXN0b3J5LlxuICAgKi9cbiAgZm9yd2FyZCgpOiB2b2lkIHsgdGhpcy5wbGF0Zm9ybVN0cmF0ZWd5LmZvcndhcmQoKTsgfVxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZXMgYmFjayBpbiB0aGUgcGxhdGZvcm0ncyBoaXN0b3J5LlxuICAgKi9cbiAgYmFjaygpOiB2b2lkIHsgdGhpcy5wbGF0Zm9ybVN0cmF0ZWd5LmJhY2soKTsgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmUgdG8gdGhlIHBsYXRmb3JtJ3MgYHBvcFN0YXRlYCBldmVudHMuXG4gICAqL1xuICBzdWJzY3JpYmUob25OZXh0OiAodmFsdWU6IGFueSkgPT4gdm9pZCwgb25UaHJvdzogKGV4Y2VwdGlvbjogYW55KSA9PiB2b2lkID0gbnVsbCxcbiAgICAgICAgICAgIG9uUmV0dXJuOiAoKSA9PiB2b2lkID0gbnVsbCk6IE9iamVjdCB7XG4gICAgcmV0dXJuIE9ic2VydmFibGVXcmFwcGVyLnN1YnNjcmliZSh0aGlzLl9zdWJqZWN0LCBvbk5leHQsIG9uVGhyb3csIG9uUmV0dXJuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHaXZlbiBhIHN0cmluZyBvZiB1cmwgcGFyYW1ldGVycywgcHJlcGVuZCB3aXRoICc/JyBpZiBuZWVkZWQsIG90aGVyd2lzZSByZXR1cm4gcGFyYW1ldGVycyBhc1xuICAgKiBpcy5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgbm9ybWFsaXplUXVlcnlQYXJhbXMocGFyYW1zOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiAocGFyYW1zLmxlbmd0aCA+IDAgJiYgcGFyYW1zLnN1YnN0cmluZygwLCAxKSAhPSAnPycpID8gKCc/JyArIHBhcmFtcykgOiBwYXJhbXM7XG4gIH1cblxuICAvKipcbiAgICogR2l2ZW4gMiBwYXJ0cyBvZiBhIHVybCwgam9pbiB0aGVtIHdpdGggYSBzbGFzaCBpZiBuZWVkZWQuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGpvaW5XaXRoU2xhc2goc3RhcnQ6IHN0cmluZywgZW5kOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmIChzdGFydC5sZW5ndGggPT0gMCkge1xuICAgICAgcmV0dXJuIGVuZDtcbiAgICB9XG4gICAgaWYgKGVuZC5sZW5ndGggPT0gMCkge1xuICAgICAgcmV0dXJuIHN0YXJ0O1xuICAgIH1cbiAgICB2YXIgc2xhc2hlcyA9IDA7XG4gICAgaWYgKHN0YXJ0LmVuZHNXaXRoKCcvJykpIHtcbiAgICAgIHNsYXNoZXMrKztcbiAgICB9XG4gICAgaWYgKGVuZC5zdGFydHNXaXRoKCcvJykpIHtcbiAgICAgIHNsYXNoZXMrKztcbiAgICB9XG4gICAgaWYgKHNsYXNoZXMgPT0gMikge1xuICAgICAgcmV0dXJuIHN0YXJ0ICsgZW5kLnN1YnN0cmluZygxKTtcbiAgICB9XG4gICAgaWYgKHNsYXNoZXMgPT0gMSkge1xuICAgICAgcmV0dXJuIHN0YXJ0ICsgZW5kO1xuICAgIH1cbiAgICByZXR1cm4gc3RhcnQgKyAnLycgKyBlbmQ7XG4gIH1cblxuICAvKipcbiAgICogSWYgdXJsIGhhcyBhIHRyYWlsaW5nIHNsYXNoLCByZW1vdmUgaXQsIG90aGVyd2lzZSByZXR1cm4gdXJsIGFzIGlzLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBzdHJpcFRyYWlsaW5nU2xhc2godXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICgvXFwvJC9nLnRlc3QodXJsKSkge1xuICAgICAgdXJsID0gdXJsLnN1YnN0cmluZygwLCB1cmwubGVuZ3RoIC0gMSk7XG4gICAgfVxuICAgIHJldHVybiB1cmw7XG4gIH1cbn1cblxuZnVuY3Rpb24gX3N0cmlwQmFzZUhyZWYoYmFzZUhyZWY6IHN0cmluZywgdXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAoYmFzZUhyZWYubGVuZ3RoID4gMCAmJiB1cmwuc3RhcnRzV2l0aChiYXNlSHJlZikpIHtcbiAgICByZXR1cm4gdXJsLnN1YnN0cmluZyhiYXNlSHJlZi5sZW5ndGgpO1xuICB9XG4gIHJldHVybiB1cmw7XG59XG5cbmZ1bmN0aW9uIF9zdHJpcEluZGV4SHRtbCh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmICgvXFwvaW5kZXguaHRtbCQvZy50ZXN0KHVybCkpIHtcbiAgICAvLyAnL2luZGV4Lmh0bWwnLmxlbmd0aCA9PSAxMVxuICAgIHJldHVybiB1cmwuc3Vic3RyaW5nKDAsIHVybC5sZW5ndGggLSAxMSk7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
