System.register(['angular2/core', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions', './platform_location', './location_strategy', './location'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, lang_1, exceptions_1, platform_location_1, location_strategy_1, location_1;
    var PathLocationStrategy;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (platform_location_1_1) {
                platform_location_1 = platform_location_1_1;
            },
            function (location_strategy_1_1) {
                location_strategy_1 = location_strategy_1_1;
            },
            function (location_1_1) {
                location_1 = location_1_1;
            }],
        execute: function() {
            /**
             * `PathLocationStrategy` is a {@link LocationStrategy} used to configure the
             * {@link Location} service to represent its state in the
             * [path](https://en.wikipedia.org/wiki/Uniform_Resource_Locator#Syntax) of the
             * browser's URL.
             *
             * `PathLocationStrategy` is the default binding for {@link LocationStrategy}
             * provided in {@link ROUTER_PROVIDERS}.
             *
             * If you're using `PathLocationStrategy`, you must provide a provider for
             * {@link APP_BASE_HREF} to a string representing the URL prefix that should
             * be preserved when generating and recognizing URLs.
             *
             * For instance, if you provide an `APP_BASE_HREF` of `'/my/app'` and call
             * `location.go('/foo')`, the browser's URL will become
             * `example.com/my/app/foo`.
             *
             * ### Example
             *
             * ```
             * import {Component, provide} from 'angular2/core';
             * import {bootstrap} from 'angular2/platform/browser';
             * import {
             *   Location,
             *   APP_BASE_HREF
             * } from 'angular2/platform/common';
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
             * bootstrap(AppCmp, [
             *   ROUTER_PROVIDERS, // includes binding to PathLocationStrategy
             *   provide(APP_BASE_HREF, {useValue: '/my/app'})
             * ]);
             * ```
             */
            PathLocationStrategy = (function (_super) {
                __extends(PathLocationStrategy, _super);
                function PathLocationStrategy(_platformLocation, href) {
                    _super.call(this);
                    this._platformLocation = _platformLocation;
                    if (lang_1.isBlank(href)) {
                        href = this._platformLocation.getBaseHrefFromDOM();
                    }
                    if (lang_1.isBlank(href)) {
                        throw new exceptions_1.BaseException("No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.");
                    }
                    this._baseHref = href;
                }
                PathLocationStrategy.prototype.onPopState = function (fn) {
                    this._platformLocation.onPopState(fn);
                    this._platformLocation.onHashChange(fn);
                };
                PathLocationStrategy.prototype.getBaseHref = function () { return this._baseHref; };
                PathLocationStrategy.prototype.prepareExternalUrl = function (internal) {
                    return location_1.Location.joinWithSlash(this._baseHref, internal);
                };
                PathLocationStrategy.prototype.path = function () {
                    return this._platformLocation.pathname +
                        location_1.Location.normalizeQueryParams(this._platformLocation.search);
                };
                PathLocationStrategy.prototype.pushState = function (state, title, url, queryParams) {
                    var externalUrl = this.prepareExternalUrl(url + location_1.Location.normalizeQueryParams(queryParams));
                    this._platformLocation.pushState(state, title, externalUrl);
                };
                PathLocationStrategy.prototype.replaceState = function (state, title, url, queryParams) {
                    var externalUrl = this.prepareExternalUrl(url + location_1.Location.normalizeQueryParams(queryParams));
                    this._platformLocation.replaceState(state, title, externalUrl);
                };
                PathLocationStrategy.prototype.forward = function () { this._platformLocation.forward(); };
                PathLocationStrategy.prototype.back = function () { this._platformLocation.back(); };
                PathLocationStrategy = __decorate([
                    core_1.Injectable(),
                    __param(1, core_1.Optional()),
                    __param(1, core_1.Inject(location_strategy_1.APP_BASE_HREF)), 
                    __metadata('design:paramtypes', [platform_location_1.PlatformLocation, String])
                ], PathLocationStrategy);
                return PathLocationStrategy;
            }(location_strategy_1.LocationStrategy));
            exports_1("PathLocationStrategy", PathLocationStrategy);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9icm93c2VyL2xvY2F0aW9uL3BhdGhfbG9jYXRpb25fc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQStDRztZQUVIO2dCQUEwQyx3Q0FBZ0I7Z0JBR3hELDhCQUFvQixpQkFBbUMsRUFDUixJQUFhO29CQUMxRCxpQkFBTyxDQUFDO29CQUZVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7b0JBSXJELEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2xCLElBQUksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztvQkFDckQsQ0FBQztvQkFFRCxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNsQixNQUFNLElBQUksMEJBQWEsQ0FDbkIsNkdBQTZHLENBQUMsQ0FBQztvQkFDckgsQ0FBQztvQkFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztnQkFDeEIsQ0FBQztnQkFFRCx5Q0FBVSxHQUFWLFVBQVcsRUFBcUI7b0JBQzlCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ3RDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzFDLENBQUM7Z0JBRUQsMENBQVcsR0FBWCxjQUF3QixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBRWhELGlEQUFrQixHQUFsQixVQUFtQixRQUFnQjtvQkFDakMsTUFBTSxDQUFDLG1CQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQzFELENBQUM7Z0JBRUQsbUNBQUksR0FBSjtvQkFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVE7d0JBQy9CLG1CQUFRLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0RSxDQUFDO2dCQUVELHdDQUFTLEdBQVQsVUFBVSxLQUFVLEVBQUUsS0FBYSxFQUFFLEdBQVcsRUFBRSxXQUFtQjtvQkFDbkUsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsR0FBRyxtQkFBUSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQzVGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDOUQsQ0FBQztnQkFFRCwyQ0FBWSxHQUFaLFVBQWEsS0FBVSxFQUFFLEtBQWEsRUFBRSxHQUFXLEVBQUUsV0FBbUI7b0JBQ3RFLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEdBQUcsbUJBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUM1RixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQ2pFLENBQUM7Z0JBRUQsc0NBQU8sR0FBUCxjQUFrQixJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUVyRCxtQ0FBSSxHQUFKLGNBQWUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFoRGpEO29CQUFDLGlCQUFVLEVBQUU7K0JBS0UsZUFBUSxFQUFFOytCQUFFLGFBQU0sQ0FBQyxpQ0FBYSxDQUFDOzt3Q0FMbkM7Z0JBaURiLDJCQUFDO1lBQUQsQ0FoREEsQUFnREMsQ0FoRHlDLG9DQUFnQixHQWdEekQ7WUFoREQsdURBZ0RDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL2Jyb3dzZXIvbG9jYXRpb24vcGF0aF9sb2NhdGlvbl9zdHJhdGVneS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0LCBPcHRpb25hbH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge2lzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge1BsYXRmb3JtTG9jYXRpb24sIFVybENoYW5nZUxpc3RlbmVyfSBmcm9tICcuL3BsYXRmb3JtX2xvY2F0aW9uJztcbmltcG9ydCB7TG9jYXRpb25TdHJhdGVneSwgQVBQX0JBU0VfSFJFRn0gZnJvbSAnLi9sb2NhdGlvbl9zdHJhdGVneSc7XG5pbXBvcnQge0xvY2F0aW9ufSBmcm9tICcuL2xvY2F0aW9uJztcblxuLyoqXG4gKiBgUGF0aExvY2F0aW9uU3RyYXRlZ3lgIGlzIGEge0BsaW5rIExvY2F0aW9uU3RyYXRlZ3l9IHVzZWQgdG8gY29uZmlndXJlIHRoZVxuICoge0BsaW5rIExvY2F0aW9ufSBzZXJ2aWNlIHRvIHJlcHJlc2VudCBpdHMgc3RhdGUgaW4gdGhlXG4gKiBbcGF0aF0oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvVW5pZm9ybV9SZXNvdXJjZV9Mb2NhdG9yI1N5bnRheCkgb2YgdGhlXG4gKiBicm93c2VyJ3MgVVJMLlxuICpcbiAqIGBQYXRoTG9jYXRpb25TdHJhdGVneWAgaXMgdGhlIGRlZmF1bHQgYmluZGluZyBmb3Ige0BsaW5rIExvY2F0aW9uU3RyYXRlZ3l9XG4gKiBwcm92aWRlZCBpbiB7QGxpbmsgUk9VVEVSX1BST1ZJREVSU30uXG4gKlxuICogSWYgeW91J3JlIHVzaW5nIGBQYXRoTG9jYXRpb25TdHJhdGVneWAsIHlvdSBtdXN0IHByb3ZpZGUgYSBwcm92aWRlciBmb3JcbiAqIHtAbGluayBBUFBfQkFTRV9IUkVGfSB0byBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIFVSTCBwcmVmaXggdGhhdCBzaG91bGRcbiAqIGJlIHByZXNlcnZlZCB3aGVuIGdlbmVyYXRpbmcgYW5kIHJlY29nbml6aW5nIFVSTHMuXG4gKlxuICogRm9yIGluc3RhbmNlLCBpZiB5b3UgcHJvdmlkZSBhbiBgQVBQX0JBU0VfSFJFRmAgb2YgYCcvbXkvYXBwJ2AgYW5kIGNhbGxcbiAqIGBsb2NhdGlvbi5nbygnL2ZvbycpYCwgdGhlIGJyb3dzZXIncyBVUkwgd2lsbCBiZWNvbWVcbiAqIGBleGFtcGxlLmNvbS9teS9hcHAvZm9vYC5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYFxuICogaW1wb3J0IHtDb21wb25lbnQsIHByb3ZpZGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuICogaW1wb3J0IHtib290c3RyYXB9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXInO1xuICogaW1wb3J0IHtcbiAqICAgTG9jYXRpb24sXG4gKiAgIEFQUF9CQVNFX0hSRUZcbiAqIH0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vY29tbW9uJztcbiAqIGltcG9ydCB7XG4gKiAgIFJPVVRFUl9ESVJFQ1RJVkVTLFxuICogICBST1VURVJfUFJPVklERVJTLFxuICogICBSb3V0ZUNvbmZpZ1xuICogfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXInO1xuICpcbiAqIEBDb21wb25lbnQoe2RpcmVjdGl2ZXM6IFtST1VURVJfRElSRUNUSVZFU119KVxuICogQFJvdXRlQ29uZmlnKFtcbiAqICB7Li4ufSxcbiAqIF0pXG4gKiBjbGFzcyBBcHBDbXAge1xuICogICBjb25zdHJ1Y3Rvcihsb2NhdGlvbjogTG9jYXRpb24pIHtcbiAqICAgICBsb2NhdGlvbi5nbygnL2ZvbycpO1xuICogICB9XG4gKiB9XG4gKlxuICogYm9vdHN0cmFwKEFwcENtcCwgW1xuICogICBST1VURVJfUFJPVklERVJTLCAvLyBpbmNsdWRlcyBiaW5kaW5nIHRvIFBhdGhMb2NhdGlvblN0cmF0ZWd5XG4gKiAgIHByb3ZpZGUoQVBQX0JBU0VfSFJFRiwge3VzZVZhbHVlOiAnL215L2FwcCd9KVxuICogXSk7XG4gKiBgYGBcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBhdGhMb2NhdGlvblN0cmF0ZWd5IGV4dGVuZHMgTG9jYXRpb25TdHJhdGVneSB7XG4gIHByaXZhdGUgX2Jhc2VIcmVmOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGxhdGZvcm1Mb2NhdGlvbjogUGxhdGZvcm1Mb2NhdGlvbixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChBUFBfQkFTRV9IUkVGKSBocmVmPzogc3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmIChpc0JsYW5rKGhyZWYpKSB7XG4gICAgICBocmVmID0gdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5nZXRCYXNlSHJlZkZyb21ET00oKTtcbiAgICB9XG5cbiAgICBpZiAoaXNCbGFuayhocmVmKSkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgICAgYE5vIGJhc2UgaHJlZiBzZXQuIFBsZWFzZSBwcm92aWRlIGEgdmFsdWUgZm9yIHRoZSBBUFBfQkFTRV9IUkVGIHRva2VuIG9yIGFkZCBhIGJhc2UgZWxlbWVudCB0byB0aGUgZG9jdW1lbnQuYCk7XG4gICAgfVxuXG4gICAgdGhpcy5fYmFzZUhyZWYgPSBocmVmO1xuICB9XG5cbiAgb25Qb3BTdGF0ZShmbjogVXJsQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLm9uUG9wU3RhdGUoZm4pO1xuICAgIHRoaXMuX3BsYXRmb3JtTG9jYXRpb24ub25IYXNoQ2hhbmdlKGZuKTtcbiAgfVxuXG4gIGdldEJhc2VIcmVmKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9iYXNlSHJlZjsgfVxuXG4gIHByZXBhcmVFeHRlcm5hbFVybChpbnRlcm5hbDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gTG9jYXRpb24uam9pbldpdGhTbGFzaCh0aGlzLl9iYXNlSHJlZiwgaW50ZXJuYWwpO1xuICB9XG5cbiAgcGF0aCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLnBhdGhuYW1lICtcbiAgICAgICAgICAgTG9jYXRpb24ubm9ybWFsaXplUXVlcnlQYXJhbXModGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5zZWFyY2gpO1xuICB9XG5cbiAgcHVzaFN0YXRlKHN0YXRlOiBhbnksIHRpdGxlOiBzdHJpbmcsIHVybDogc3RyaW5nLCBxdWVyeVBhcmFtczogc3RyaW5nKSB7XG4gICAgdmFyIGV4dGVybmFsVXJsID0gdGhpcy5wcmVwYXJlRXh0ZXJuYWxVcmwodXJsICsgTG9jYXRpb24ubm9ybWFsaXplUXVlcnlQYXJhbXMocXVlcnlQYXJhbXMpKTtcbiAgICB0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLnB1c2hTdGF0ZShzdGF0ZSwgdGl0bGUsIGV4dGVybmFsVXJsKTtcbiAgfVxuXG4gIHJlcGxhY2VTdGF0ZShzdGF0ZTogYW55LCB0aXRsZTogc3RyaW5nLCB1cmw6IHN0cmluZywgcXVlcnlQYXJhbXM6IHN0cmluZykge1xuICAgIHZhciBleHRlcm5hbFVybCA9IHRoaXMucHJlcGFyZUV4dGVybmFsVXJsKHVybCArIExvY2F0aW9uLm5vcm1hbGl6ZVF1ZXJ5UGFyYW1zKHF1ZXJ5UGFyYW1zKSk7XG4gICAgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5yZXBsYWNlU3RhdGUoc3RhdGUsIHRpdGxlLCBleHRlcm5hbFVybCk7XG4gIH1cblxuICBmb3J3YXJkKCk6IHZvaWQgeyB0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLmZvcndhcmQoKTsgfVxuXG4gIGJhY2soKTogdm9pZCB7IHRoaXMuX3BsYXRmb3JtTG9jYXRpb24uYmFjaygpOyB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
