System.register(['angular2/core', './platform_location', 'angular2/src/platform/dom/dom_adapter'], function(exports_1, context_1) {
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
    var core_1, platform_location_1, dom_adapter_1;
    var BrowserPlatformLocation;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_location_1_1) {
                platform_location_1 = platform_location_1_1;
            },
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            }],
        execute: function() {
            /**
             * `PlatformLocation` encapsulates all of the direct calls to platform APIs.
             * This class should not be used directly by an application developer. Instead, use
             * {@link Location}.
             */
            BrowserPlatformLocation = (function (_super) {
                __extends(BrowserPlatformLocation, _super);
                function BrowserPlatformLocation() {
                    _super.call(this);
                    this._init();
                }
                // This is moved to its own method so that `MockPlatformLocationStrategy` can overwrite it
                /** @internal */
                BrowserPlatformLocation.prototype._init = function () {
                    this._location = dom_adapter_1.DOM.getLocation();
                    this._history = dom_adapter_1.DOM.getHistory();
                };
                Object.defineProperty(BrowserPlatformLocation.prototype, "location", {
                    /** @internal */
                    get: function () { return this._location; },
                    enumerable: true,
                    configurable: true
                });
                BrowserPlatformLocation.prototype.getBaseHrefFromDOM = function () { return dom_adapter_1.DOM.getBaseHref(); };
                BrowserPlatformLocation.prototype.onPopState = function (fn) {
                    dom_adapter_1.DOM.getGlobalEventTarget('window').addEventListener('popstate', fn, false);
                };
                BrowserPlatformLocation.prototype.onHashChange = function (fn) {
                    dom_adapter_1.DOM.getGlobalEventTarget('window').addEventListener('hashchange', fn, false);
                };
                Object.defineProperty(BrowserPlatformLocation.prototype, "pathname", {
                    get: function () { return this._location.pathname; },
                    set: function (newPath) { this._location.pathname = newPath; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BrowserPlatformLocation.prototype, "search", {
                    get: function () { return this._location.search; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BrowserPlatformLocation.prototype, "hash", {
                    get: function () { return this._location.hash; },
                    enumerable: true,
                    configurable: true
                });
                BrowserPlatformLocation.prototype.pushState = function (state, title, url) {
                    this._history.pushState(state, title, url);
                };
                BrowserPlatformLocation.prototype.replaceState = function (state, title, url) {
                    this._history.replaceState(state, title, url);
                };
                BrowserPlatformLocation.prototype.forward = function () { this._history.forward(); };
                BrowserPlatformLocation.prototype.back = function () { this._history.back(); };
                BrowserPlatformLocation = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], BrowserPlatformLocation);
                return BrowserPlatformLocation;
            }(platform_location_1.PlatformLocation));
            exports_1("BrowserPlatformLocation", BrowserPlatformLocation);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9sb2NhdGlvbi9icm93c2VyX3BsYXRmb3JtX2xvY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFNQTs7OztlQUlHO1lBRUg7Z0JBQTZDLDJDQUFnQjtnQkFJM0Q7b0JBQ0UsaUJBQU8sQ0FBQztvQkFDUixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2YsQ0FBQztnQkFFRCwwRkFBMEY7Z0JBQzFGLGdCQUFnQjtnQkFDaEIsdUNBQUssR0FBTDtvQkFDRSxJQUFJLENBQUMsU0FBUyxHQUFHLGlCQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsaUJBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDbkMsQ0FBQztnQkFHRCxzQkFBSSw2Q0FBUTtvQkFEWixnQkFBZ0I7eUJBQ2hCLGNBQTJCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUVuRCxvREFBa0IsR0FBbEIsY0FBK0IsTUFBTSxDQUFDLGlCQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUUxRCw0Q0FBVSxHQUFWLFVBQVcsRUFBcUI7b0JBQzlCLGlCQUFHLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDN0UsQ0FBQztnQkFFRCw4Q0FBWSxHQUFaLFVBQWEsRUFBcUI7b0JBQ2hDLGlCQUFHLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDL0UsQ0FBQztnQkFFRCxzQkFBSSw2Q0FBUTt5QkFBWixjQUF5QixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO3lCQUcxRCxVQUFhLE9BQWUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDOzs7bUJBSFY7Z0JBQzFELHNCQUFJLDJDQUFNO3lCQUFWLGNBQXVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFDdEQsc0JBQUkseUNBQUk7eUJBQVIsY0FBcUIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUdsRCwyQ0FBUyxHQUFULFVBQVUsS0FBVSxFQUFFLEtBQWEsRUFBRSxHQUFXO29CQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUM3QyxDQUFDO2dCQUVELDhDQUFZLEdBQVosVUFBYSxLQUFVLEVBQUUsS0FBYSxFQUFFLEdBQVc7b0JBQ2pELElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ2hELENBQUM7Z0JBRUQseUNBQU8sR0FBUCxjQUFrQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFNUMsc0NBQUksR0FBSixjQUFlLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQTdDeEM7b0JBQUMsaUJBQVUsRUFBRTs7MkNBQUE7Z0JBOENiLDhCQUFDO1lBQUQsQ0E3Q0EsQUE2Q0MsQ0E3QzRDLG9DQUFnQixHQTZDNUQ7WUE3Q0QsNkRBNkNDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvcm91dGVyL2xvY2F0aW9uL2Jyb3dzZXJfcGxhdGZvcm1fbG9jYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtIaXN0b3J5LCBMb2NhdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9icm93c2VyJztcbmltcG9ydCB7VXJsQ2hhbmdlTGlzdGVuZXJ9IGZyb20gJy4vcGxhdGZvcm1fbG9jYXRpb24nO1xuaW1wb3J0IHtQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICcuL3BsYXRmb3JtX2xvY2F0aW9uJztcbmltcG9ydCB7RE9NfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9hZGFwdGVyJztcblxuLyoqXG4gKiBgUGxhdGZvcm1Mb2NhdGlvbmAgZW5jYXBzdWxhdGVzIGFsbCBvZiB0aGUgZGlyZWN0IGNhbGxzIHRvIHBsYXRmb3JtIEFQSXMuXG4gKiBUaGlzIGNsYXNzIHNob3VsZCBub3QgYmUgdXNlZCBkaXJlY3RseSBieSBhbiBhcHBsaWNhdGlvbiBkZXZlbG9wZXIuIEluc3RlYWQsIHVzZVxuICoge0BsaW5rIExvY2F0aW9ufS5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJyb3dzZXJQbGF0Zm9ybUxvY2F0aW9uIGV4dGVuZHMgUGxhdGZvcm1Mb2NhdGlvbiB7XG4gIHByaXZhdGUgX2xvY2F0aW9uOiBMb2NhdGlvbjtcbiAgcHJpdmF0ZSBfaGlzdG9yeTogSGlzdG9yeTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2luaXQoKTtcbiAgfVxuXG4gIC8vIFRoaXMgaXMgbW92ZWQgdG8gaXRzIG93biBtZXRob2Qgc28gdGhhdCBgTW9ja1BsYXRmb3JtTG9jYXRpb25TdHJhdGVneWAgY2FuIG92ZXJ3cml0ZSBpdFxuICAvKiogQGludGVybmFsICovXG4gIF9pbml0KCkge1xuICAgIHRoaXMuX2xvY2F0aW9uID0gRE9NLmdldExvY2F0aW9uKCk7XG4gICAgdGhpcy5faGlzdG9yeSA9IERPTS5nZXRIaXN0b3J5KCk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIGdldCBsb2NhdGlvbigpOiBMb2NhdGlvbiB7IHJldHVybiB0aGlzLl9sb2NhdGlvbjsgfVxuXG4gIGdldEJhc2VIcmVmRnJvbURPTSgpOiBzdHJpbmcgeyByZXR1cm4gRE9NLmdldEJhc2VIcmVmKCk7IH1cblxuICBvblBvcFN0YXRlKGZuOiBVcmxDaGFuZ2VMaXN0ZW5lcik6IHZvaWQge1xuICAgIERPTS5nZXRHbG9iYWxFdmVudFRhcmdldCgnd2luZG93JykuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCBmbiwgZmFsc2UpO1xuICB9XG5cbiAgb25IYXNoQ2hhbmdlKGZuOiBVcmxDaGFuZ2VMaXN0ZW5lcik6IHZvaWQge1xuICAgIERPTS5nZXRHbG9iYWxFdmVudFRhcmdldCgnd2luZG93JykuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIGZuLCBmYWxzZSk7XG4gIH1cblxuICBnZXQgcGF0aG5hbWUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2xvY2F0aW9uLnBhdGhuYW1lOyB9XG4gIGdldCBzZWFyY2goKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2xvY2F0aW9uLnNlYXJjaDsgfVxuICBnZXQgaGFzaCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fbG9jYXRpb24uaGFzaDsgfVxuICBzZXQgcGF0aG5hbWUobmV3UGF0aDogc3RyaW5nKSB7IHRoaXMuX2xvY2F0aW9uLnBhdGhuYW1lID0gbmV3UGF0aDsgfVxuXG4gIHB1c2hTdGF0ZShzdGF0ZTogYW55LCB0aXRsZTogc3RyaW5nLCB1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2hpc3RvcnkucHVzaFN0YXRlKHN0YXRlLCB0aXRsZSwgdXJsKTtcbiAgfVxuXG4gIHJlcGxhY2VTdGF0ZShzdGF0ZTogYW55LCB0aXRsZTogc3RyaW5nLCB1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2hpc3RvcnkucmVwbGFjZVN0YXRlKHN0YXRlLCB0aXRsZSwgdXJsKTtcbiAgfVxuXG4gIGZvcndhcmQoKTogdm9pZCB7IHRoaXMuX2hpc3RvcnkuZm9yd2FyZCgpOyB9XG5cbiAgYmFjaygpOiB2b2lkIHsgdGhpcy5faGlzdG9yeS5iYWNrKCk7IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
