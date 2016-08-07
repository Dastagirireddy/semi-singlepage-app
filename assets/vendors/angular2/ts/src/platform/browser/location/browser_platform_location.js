System.register(['angular2/src/core/di/decorators', './platform_location', 'angular2/src/platform/dom/dom_adapter'], function(exports_1, context_1) {
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
    var decorators_1, platform_location_1, dom_adapter_1;
    var BrowserPlatformLocation;
    return {
        setters:[
            function (decorators_1_1) {
                decorators_1 = decorators_1_1;
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
                    decorators_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], BrowserPlatformLocation);
                return BrowserPlatformLocation;
            }(platform_location_1.PlatformLocation));
            exports_1("BrowserPlatformLocation", BrowserPlatformLocation);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9icm93c2VyL2xvY2F0aW9uL2Jyb3dzZXJfcGxhdGZvcm1fbG9jYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUtBOzs7O2VBSUc7WUFFSDtnQkFBNkMsMkNBQWdCO2dCQUkzRDtvQkFDRSxpQkFBTyxDQUFDO29CQUNSLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDZixDQUFDO2dCQUVELDBGQUEwRjtnQkFDMUYsZ0JBQWdCO2dCQUNoQix1Q0FBSyxHQUFMO29CQUNFLElBQUksQ0FBQyxTQUFTLEdBQUcsaUJBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxpQkFBRyxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNuQyxDQUFDO2dCQUdELHNCQUFJLDZDQUFRO29CQURaLGdCQUFnQjt5QkFDaEIsY0FBMkIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBRW5ELG9EQUFrQixHQUFsQixjQUErQixNQUFNLENBQUMsaUJBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRTFELDRDQUFVLEdBQVYsVUFBVyxFQUFxQjtvQkFDOUIsaUJBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUM3RSxDQUFDO2dCQUVELDhDQUFZLEdBQVosVUFBYSxFQUFxQjtvQkFDaEMsaUJBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUMvRSxDQUFDO2dCQUVELHNCQUFJLDZDQUFRO3lCQUFaLGNBQXlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7eUJBRzFELFVBQWEsT0FBZSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7OzttQkFIVjtnQkFDMUQsc0JBQUksMkNBQU07eUJBQVYsY0FBdUIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUN0RCxzQkFBSSx5Q0FBSTt5QkFBUixjQUFxQixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBR2xELDJDQUFTLEdBQVQsVUFBVSxLQUFVLEVBQUUsS0FBYSxFQUFFLEdBQVc7b0JBQzlDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQzdDLENBQUM7Z0JBRUQsOENBQVksR0FBWixVQUFhLEtBQVUsRUFBRSxLQUFhLEVBQUUsR0FBVztvQkFDakQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDaEQsQ0FBQztnQkFFRCx5Q0FBTyxHQUFQLGNBQWtCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUU1QyxzQ0FBSSxHQUFKLGNBQWUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBN0N4QztvQkFBQyx1QkFBVSxFQUFFOzsyQ0FBQTtnQkE4Q2IsOEJBQUM7WUFBRCxDQTdDQSxBQTZDQyxDQTdDNEMsb0NBQWdCLEdBNkM1RDtZQTdDRCw2REE2Q0MsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvcGxhdGZvcm0vYnJvd3Nlci9sb2NhdGlvbi9icm93c2VyX3BsYXRmb3JtX2xvY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaS9kZWNvcmF0b3JzJztcbmltcG9ydCB7VXJsQ2hhbmdlTGlzdGVuZXIsIFBsYXRmb3JtTG9jYXRpb259IGZyb20gJy4vcGxhdGZvcm1fbG9jYXRpb24nO1xuaW1wb3J0IHtIaXN0b3J5LCBMb2NhdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9icm93c2VyJztcbmltcG9ydCB7RE9NfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9hZGFwdGVyJztcblxuLyoqXG4gKiBgUGxhdGZvcm1Mb2NhdGlvbmAgZW5jYXBzdWxhdGVzIGFsbCBvZiB0aGUgZGlyZWN0IGNhbGxzIHRvIHBsYXRmb3JtIEFQSXMuXG4gKiBUaGlzIGNsYXNzIHNob3VsZCBub3QgYmUgdXNlZCBkaXJlY3RseSBieSBhbiBhcHBsaWNhdGlvbiBkZXZlbG9wZXIuIEluc3RlYWQsIHVzZVxuICoge0BsaW5rIExvY2F0aW9ufS5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJyb3dzZXJQbGF0Zm9ybUxvY2F0aW9uIGV4dGVuZHMgUGxhdGZvcm1Mb2NhdGlvbiB7XG4gIHByaXZhdGUgX2xvY2F0aW9uOiBMb2NhdGlvbjtcbiAgcHJpdmF0ZSBfaGlzdG9yeTogSGlzdG9yeTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2luaXQoKTtcbiAgfVxuXG4gIC8vIFRoaXMgaXMgbW92ZWQgdG8gaXRzIG93biBtZXRob2Qgc28gdGhhdCBgTW9ja1BsYXRmb3JtTG9jYXRpb25TdHJhdGVneWAgY2FuIG92ZXJ3cml0ZSBpdFxuICAvKiogQGludGVybmFsICovXG4gIF9pbml0KCkge1xuICAgIHRoaXMuX2xvY2F0aW9uID0gRE9NLmdldExvY2F0aW9uKCk7XG4gICAgdGhpcy5faGlzdG9yeSA9IERPTS5nZXRIaXN0b3J5KCk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIGdldCBsb2NhdGlvbigpOiBMb2NhdGlvbiB7IHJldHVybiB0aGlzLl9sb2NhdGlvbjsgfVxuXG4gIGdldEJhc2VIcmVmRnJvbURPTSgpOiBzdHJpbmcgeyByZXR1cm4gRE9NLmdldEJhc2VIcmVmKCk7IH1cblxuICBvblBvcFN0YXRlKGZuOiBVcmxDaGFuZ2VMaXN0ZW5lcik6IHZvaWQge1xuICAgIERPTS5nZXRHbG9iYWxFdmVudFRhcmdldCgnd2luZG93JykuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCBmbiwgZmFsc2UpO1xuICB9XG5cbiAgb25IYXNoQ2hhbmdlKGZuOiBVcmxDaGFuZ2VMaXN0ZW5lcik6IHZvaWQge1xuICAgIERPTS5nZXRHbG9iYWxFdmVudFRhcmdldCgnd2luZG93JykuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIGZuLCBmYWxzZSk7XG4gIH1cblxuICBnZXQgcGF0aG5hbWUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2xvY2F0aW9uLnBhdGhuYW1lOyB9XG4gIGdldCBzZWFyY2goKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2xvY2F0aW9uLnNlYXJjaDsgfVxuICBnZXQgaGFzaCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fbG9jYXRpb24uaGFzaDsgfVxuICBzZXQgcGF0aG5hbWUobmV3UGF0aDogc3RyaW5nKSB7IHRoaXMuX2xvY2F0aW9uLnBhdGhuYW1lID0gbmV3UGF0aDsgfVxuXG4gIHB1c2hTdGF0ZShzdGF0ZTogYW55LCB0aXRsZTogc3RyaW5nLCB1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2hpc3RvcnkucHVzaFN0YXRlKHN0YXRlLCB0aXRsZSwgdXJsKTtcbiAgfVxuXG4gIHJlcGxhY2VTdGF0ZShzdGF0ZTogYW55LCB0aXRsZTogc3RyaW5nLCB1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2hpc3RvcnkucmVwbGFjZVN0YXRlKHN0YXRlLCB0aXRsZSwgdXJsKTtcbiAgfVxuXG4gIGZvcndhcmQoKTogdm9pZCB7IHRoaXMuX2hpc3RvcnkuZm9yd2FyZCgpOyB9XG5cbiAgYmFjaygpOiB2b2lkIHsgdGhpcy5faGlzdG9yeS5iYWNrKCk7IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
