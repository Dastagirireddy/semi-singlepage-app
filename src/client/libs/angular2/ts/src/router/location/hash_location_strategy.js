System.register(['angular2/core', './location_strategy', 'angular2/src/facade/lang', './platform_location'], function(exports_1, context_1) {
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
    var core_1, location_strategy_1, lang_1, platform_location_1;
    var HashLocationStrategy;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (location_strategy_1_1) {
                location_strategy_1 = location_strategy_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (platform_location_1_1) {
                platform_location_1 = platform_location_1_1;
            }],
        execute: function() {
            /**
             * `HashLocationStrategy` is a {@link LocationStrategy} used to configure the
             * {@link Location} service to represent its state in the
             * [hash fragment](https://en.wikipedia.org/wiki/Uniform_Resource_Locator#Syntax)
             * of the browser's URL.
             *
             * For instance, if you call `location.go('/foo')`, the browser's URL will become
             * `example.com#/foo`.
             *
             * ### Example
             *
             * ```
             * import {Component, provide} from 'angular2/core';
             * import {
             *   ROUTER_DIRECTIVES,
             *   ROUTER_PROVIDERS,
             *   RouteConfig,
             *   Location,
             *   LocationStrategy,
             *   HashLocationStrategy
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
             *   ROUTER_PROVIDERS,
             *   provide(LocationStrategy, {useClass: HashLocationStrategy})
             * ]);
             * ```
             */
            HashLocationStrategy = (function (_super) {
                __extends(HashLocationStrategy, _super);
                function HashLocationStrategy(_platformLocation, _baseHref) {
                    _super.call(this);
                    this._platformLocation = _platformLocation;
                    this._baseHref = '';
                    if (lang_1.isPresent(_baseHref)) {
                        this._baseHref = _baseHref;
                    }
                }
                HashLocationStrategy.prototype.onPopState = function (fn) {
                    this._platformLocation.onPopState(fn);
                    this._platformLocation.onHashChange(fn);
                };
                HashLocationStrategy.prototype.getBaseHref = function () { return this._baseHref; };
                HashLocationStrategy.prototype.path = function () {
                    // the hash value is always prefixed with a `#`
                    // and if it is empty then it will stay empty
                    var path = this._platformLocation.hash;
                    if (!lang_1.isPresent(path))
                        path = '#';
                    // Dart will complain if a call to substring is
                    // executed with a position value that extends the
                    // length of string.
                    return (path.length > 0 ? path.substring(1) : path);
                };
                HashLocationStrategy.prototype.prepareExternalUrl = function (internal) {
                    var url = location_strategy_1.joinWithSlash(this._baseHref, internal);
                    return url.length > 0 ? ('#' + url) : url;
                };
                HashLocationStrategy.prototype.pushState = function (state, title, path, queryParams) {
                    var url = this.prepareExternalUrl(path + location_strategy_1.normalizeQueryParams(queryParams));
                    if (url.length == 0) {
                        url = this._platformLocation.pathname;
                    }
                    this._platformLocation.pushState(state, title, url);
                };
                HashLocationStrategy.prototype.replaceState = function (state, title, path, queryParams) {
                    var url = this.prepareExternalUrl(path + location_strategy_1.normalizeQueryParams(queryParams));
                    if (url.length == 0) {
                        url = this._platformLocation.pathname;
                    }
                    this._platformLocation.replaceState(state, title, url);
                };
                HashLocationStrategy.prototype.forward = function () { this._platformLocation.forward(); };
                HashLocationStrategy.prototype.back = function () { this._platformLocation.back(); };
                HashLocationStrategy = __decorate([
                    core_1.Injectable(),
                    __param(1, core_1.Optional()),
                    __param(1, core_1.Inject(location_strategy_1.APP_BASE_HREF)), 
                    __metadata('design:paramtypes', [platform_location_1.PlatformLocation, String])
                ], HashLocationStrategy);
                return HashLocationStrategy;
            }(location_strategy_1.LocationStrategy));
            exports_1("HashLocationStrategy", HashLocationStrategy);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9sb2NhdGlvbi9oYXNoX2xvY2F0aW9uX3N0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFXQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQXFDRztZQUVIO2dCQUEwQyx3Q0FBZ0I7Z0JBRXhELDhCQUFvQixpQkFBbUMsRUFDUixTQUFrQjtvQkFDL0QsaUJBQU8sQ0FBQztvQkFGVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO29CQUQvQyxjQUFTLEdBQVcsRUFBRSxDQUFDO29CQUk3QixFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7b0JBQzdCLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCx5Q0FBVSxHQUFWLFVBQVcsRUFBcUI7b0JBQzlCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ3RDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzFDLENBQUM7Z0JBRUQsMENBQVcsR0FBWCxjQUF3QixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBRWhELG1DQUFJLEdBQUo7b0JBQ0UsK0NBQStDO29CQUMvQyw2Q0FBNkM7b0JBQzdDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7b0JBQ3ZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO29CQUVqQywrQ0FBK0M7b0JBQy9DLGtEQUFrRDtvQkFDbEQsb0JBQW9CO29CQUNwQixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUN0RCxDQUFDO2dCQUVELGlEQUFrQixHQUFsQixVQUFtQixRQUFnQjtvQkFDakMsSUFBSSxHQUFHLEdBQUcsaUNBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUNsRCxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO2dCQUM1QyxDQUFDO2dCQUVELHdDQUFTLEdBQVQsVUFBVSxLQUFVLEVBQUUsS0FBYSxFQUFFLElBQVksRUFBRSxXQUFtQjtvQkFDcEUsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksR0FBRyx3Q0FBb0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUM1RSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BCLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDO29CQUN4QyxDQUFDO29CQUNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDdEQsQ0FBQztnQkFFRCwyQ0FBWSxHQUFaLFVBQWEsS0FBVSxFQUFFLEtBQWEsRUFBRSxJQUFZLEVBQUUsV0FBbUI7b0JBQ3ZFLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEdBQUcsd0NBQW9CLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDNUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNwQixHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQztvQkFDeEMsQ0FBQztvQkFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ3pELENBQUM7Z0JBRUQsc0NBQU8sR0FBUCxjQUFrQixJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUVyRCxtQ0FBSSxHQUFKLGNBQWUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFyRGpEO29CQUFDLGlCQUFVLEVBQUU7K0JBSUUsZUFBUSxFQUFFOytCQUFFLGFBQU0sQ0FBQyxpQ0FBYSxDQUFDOzt3Q0FKbkM7Z0JBc0RiLDJCQUFDO1lBQUQsQ0FyREEsQUFxREMsQ0FyRHlDLG9DQUFnQixHQXFEekQ7WUFyREQsdURBcURDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvcm91dGVyL2xvY2F0aW9uL2hhc2hfbG9jYXRpb25fc3RyYXRlZ3kuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsIEluamVjdCwgT3B0aW9uYWx9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTG9jYXRpb25TdHJhdGVneSxcbiAgam9pbldpdGhTbGFzaCxcbiAgQVBQX0JBU0VfSFJFRixcbiAgbm9ybWFsaXplUXVlcnlQYXJhbXNcbn0gZnJvbSAnLi9sb2NhdGlvbl9zdHJhdGVneSc7XG5pbXBvcnQge1VybENoYW5nZUxpc3RlbmVyfSBmcm9tICcuL3BsYXRmb3JtX2xvY2F0aW9uJztcbmltcG9ydCB7aXNQcmVzZW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICcuL3BsYXRmb3JtX2xvY2F0aW9uJztcblxuLyoqXG4gKiBgSGFzaExvY2F0aW9uU3RyYXRlZ3lgIGlzIGEge0BsaW5rIExvY2F0aW9uU3RyYXRlZ3l9IHVzZWQgdG8gY29uZmlndXJlIHRoZVxuICoge0BsaW5rIExvY2F0aW9ufSBzZXJ2aWNlIHRvIHJlcHJlc2VudCBpdHMgc3RhdGUgaW4gdGhlXG4gKiBbaGFzaCBmcmFnbWVudF0oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvVW5pZm9ybV9SZXNvdXJjZV9Mb2NhdG9yI1N5bnRheClcbiAqIG9mIHRoZSBicm93c2VyJ3MgVVJMLlxuICpcbiAqIEZvciBpbnN0YW5jZSwgaWYgeW91IGNhbGwgYGxvY2F0aW9uLmdvKCcvZm9vJylgLCB0aGUgYnJvd3NlcidzIFVSTCB3aWxsIGJlY29tZVxuICogYGV4YW1wbGUuY29tIy9mb29gLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgXG4gKiBpbXBvcnQge0NvbXBvbmVudCwgcHJvdmlkZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG4gKiBpbXBvcnQge1xuICogICBST1VURVJfRElSRUNUSVZFUyxcbiAqICAgUk9VVEVSX1BST1ZJREVSUyxcbiAqICAgUm91dGVDb25maWcsXG4gKiAgIExvY2F0aW9uLFxuICogICBMb2NhdGlvblN0cmF0ZWd5LFxuICogICBIYXNoTG9jYXRpb25TdHJhdGVneVxuICogfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXInO1xuICpcbiAqIEBDb21wb25lbnQoe2RpcmVjdGl2ZXM6IFtST1VURVJfRElSRUNUSVZFU119KVxuICogQFJvdXRlQ29uZmlnKFtcbiAqICB7Li4ufSxcbiAqIF0pXG4gKiBjbGFzcyBBcHBDbXAge1xuICogICBjb25zdHJ1Y3Rvcihsb2NhdGlvbjogTG9jYXRpb24pIHtcbiAqICAgICBsb2NhdGlvbi5nbygnL2ZvbycpO1xuICogICB9XG4gKiB9XG4gKlxuICogYm9vdHN0cmFwKEFwcENtcCwgW1xuICogICBST1VURVJfUFJPVklERVJTLFxuICogICBwcm92aWRlKExvY2F0aW9uU3RyYXRlZ3ksIHt1c2VDbGFzczogSGFzaExvY2F0aW9uU3RyYXRlZ3l9KVxuICogXSk7XG4gKiBgYGBcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEhhc2hMb2NhdGlvblN0cmF0ZWd5IGV4dGVuZHMgTG9jYXRpb25TdHJhdGVneSB7XG4gIHByaXZhdGUgX2Jhc2VIcmVmOiBzdHJpbmcgPSAnJztcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGxhdGZvcm1Mb2NhdGlvbjogUGxhdGZvcm1Mb2NhdGlvbixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChBUFBfQkFTRV9IUkVGKSBfYmFzZUhyZWY/OiBzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuICAgIGlmIChpc1ByZXNlbnQoX2Jhc2VIcmVmKSkge1xuICAgICAgdGhpcy5fYmFzZUhyZWYgPSBfYmFzZUhyZWY7XG4gICAgfVxuICB9XG5cbiAgb25Qb3BTdGF0ZShmbjogVXJsQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLm9uUG9wU3RhdGUoZm4pO1xuICAgIHRoaXMuX3BsYXRmb3JtTG9jYXRpb24ub25IYXNoQ2hhbmdlKGZuKTtcbiAgfVxuXG4gIGdldEJhc2VIcmVmKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9iYXNlSHJlZjsgfVxuXG4gIHBhdGgoKTogc3RyaW5nIHtcbiAgICAvLyB0aGUgaGFzaCB2YWx1ZSBpcyBhbHdheXMgcHJlZml4ZWQgd2l0aCBhIGAjYFxuICAgIC8vIGFuZCBpZiBpdCBpcyBlbXB0eSB0aGVuIGl0IHdpbGwgc3RheSBlbXB0eVxuICAgIHZhciBwYXRoID0gdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5oYXNoO1xuICAgIGlmICghaXNQcmVzZW50KHBhdGgpKSBwYXRoID0gJyMnO1xuXG4gICAgLy8gRGFydCB3aWxsIGNvbXBsYWluIGlmIGEgY2FsbCB0byBzdWJzdHJpbmcgaXNcbiAgICAvLyBleGVjdXRlZCB3aXRoIGEgcG9zaXRpb24gdmFsdWUgdGhhdCBleHRlbmRzIHRoZVxuICAgIC8vIGxlbmd0aCBvZiBzdHJpbmcuXG4gICAgcmV0dXJuIChwYXRoLmxlbmd0aCA+IDAgPyBwYXRoLnN1YnN0cmluZygxKSA6IHBhdGgpO1xuICB9XG5cbiAgcHJlcGFyZUV4dGVybmFsVXJsKGludGVybmFsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHZhciB1cmwgPSBqb2luV2l0aFNsYXNoKHRoaXMuX2Jhc2VIcmVmLCBpbnRlcm5hbCk7XG4gICAgcmV0dXJuIHVybC5sZW5ndGggPiAwID8gKCcjJyArIHVybCkgOiB1cmw7XG4gIH1cblxuICBwdXNoU3RhdGUoc3RhdGU6IGFueSwgdGl0bGU6IHN0cmluZywgcGF0aDogc3RyaW5nLCBxdWVyeVBhcmFtczogc3RyaW5nKSB7XG4gICAgdmFyIHVybCA9IHRoaXMucHJlcGFyZUV4dGVybmFsVXJsKHBhdGggKyBub3JtYWxpemVRdWVyeVBhcmFtcyhxdWVyeVBhcmFtcykpO1xuICAgIGlmICh1cmwubGVuZ3RoID09IDApIHtcbiAgICAgIHVybCA9IHRoaXMuX3BsYXRmb3JtTG9jYXRpb24ucGF0aG5hbWU7XG4gICAgfVxuICAgIHRoaXMuX3BsYXRmb3JtTG9jYXRpb24ucHVzaFN0YXRlKHN0YXRlLCB0aXRsZSwgdXJsKTtcbiAgfVxuXG4gIHJlcGxhY2VTdGF0ZShzdGF0ZTogYW55LCB0aXRsZTogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIHF1ZXJ5UGFyYW1zOiBzdHJpbmcpIHtcbiAgICB2YXIgdXJsID0gdGhpcy5wcmVwYXJlRXh0ZXJuYWxVcmwocGF0aCArIG5vcm1hbGl6ZVF1ZXJ5UGFyYW1zKHF1ZXJ5UGFyYW1zKSk7XG4gICAgaWYgKHVybC5sZW5ndGggPT0gMCkge1xuICAgICAgdXJsID0gdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5wYXRobmFtZTtcbiAgICB9XG4gICAgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5yZXBsYWNlU3RhdGUoc3RhdGUsIHRpdGxlLCB1cmwpO1xuICB9XG5cbiAgZm9yd2FyZCgpOiB2b2lkIHsgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5mb3J3YXJkKCk7IH1cblxuICBiYWNrKCk6IHZvaWQgeyB0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLmJhY2soKTsgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
