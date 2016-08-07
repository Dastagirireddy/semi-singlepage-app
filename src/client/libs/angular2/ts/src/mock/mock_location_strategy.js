System.register(['angular2/src/core/di', 'angular2/src/facade/async', 'angular2/src/router/location/location_strategy'], function(exports_1, context_1) {
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
    var di_1, async_1, location_strategy_1;
    var MockLocationStrategy, _MockPopStateEvent;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (location_strategy_1_1) {
                location_strategy_1 = location_strategy_1_1;
            }],
        execute: function() {
            /**
             * A mock implementation of {@link LocationStrategy} that allows tests to fire simulated
             * location events.
             */
            MockLocationStrategy = (function (_super) {
                __extends(MockLocationStrategy, _super);
                function MockLocationStrategy() {
                    _super.call(this);
                    this.internalBaseHref = '/';
                    this.internalPath = '/';
                    this.internalTitle = '';
                    this.urlChanges = [];
                    /** @internal */
                    this._subject = new async_1.EventEmitter();
                }
                MockLocationStrategy.prototype.simulatePopState = function (url) {
                    this.internalPath = url;
                    async_1.ObservableWrapper.callEmit(this._subject, new _MockPopStateEvent(this.path()));
                };
                MockLocationStrategy.prototype.path = function () { return this.internalPath; };
                MockLocationStrategy.prototype.prepareExternalUrl = function (internal) {
                    if (internal.startsWith('/') && this.internalBaseHref.endsWith('/')) {
                        return this.internalBaseHref + internal.substring(1);
                    }
                    return this.internalBaseHref + internal;
                };
                MockLocationStrategy.prototype.pushState = function (ctx, title, path, query) {
                    this.internalTitle = title;
                    var url = path + (query.length > 0 ? ('?' + query) : '');
                    this.internalPath = url;
                    var externalUrl = this.prepareExternalUrl(url);
                    this.urlChanges.push(externalUrl);
                };
                MockLocationStrategy.prototype.replaceState = function (ctx, title, path, query) {
                    this.internalTitle = title;
                    var url = path + (query.length > 0 ? ('?' + query) : '');
                    this.internalPath = url;
                    var externalUrl = this.prepareExternalUrl(url);
                    this.urlChanges.push('replace: ' + externalUrl);
                };
                MockLocationStrategy.prototype.onPopState = function (fn) { async_1.ObservableWrapper.subscribe(this._subject, fn); };
                MockLocationStrategy.prototype.getBaseHref = function () { return this.internalBaseHref; };
                MockLocationStrategy.prototype.back = function () {
                    if (this.urlChanges.length > 0) {
                        this.urlChanges.pop();
                        var nextUrl = this.urlChanges.length > 0 ? this.urlChanges[this.urlChanges.length - 1] : '';
                        this.simulatePopState(nextUrl);
                    }
                };
                MockLocationStrategy.prototype.forward = function () { throw 'not implemented'; };
                MockLocationStrategy = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], MockLocationStrategy);
                return MockLocationStrategy;
            }(location_strategy_1.LocationStrategy));
            exports_1("MockLocationStrategy", MockLocationStrategy);
            _MockPopStateEvent = (function () {
                function _MockPopStateEvent(newUrl) {
                    this.newUrl = newUrl;
                    this.pop = true;
                    this.type = 'popstate';
                }
                return _MockPopStateEvent;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL21vY2svbW9ja19sb2NhdGlvbl9zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBS0E7OztlQUdHO1lBRUg7Z0JBQTBDLHdDQUFnQjtnQkFPeEQ7b0JBQWdCLGlCQUFPLENBQUM7b0JBTnhCLHFCQUFnQixHQUFXLEdBQUcsQ0FBQztvQkFDL0IsaUJBQVksR0FBVyxHQUFHLENBQUM7b0JBQzNCLGtCQUFhLEdBQVcsRUFBRSxDQUFDO29CQUMzQixlQUFVLEdBQWEsRUFBRSxDQUFDO29CQUMxQixnQkFBZ0I7b0JBQ2hCLGFBQVEsR0FBc0IsSUFBSSxvQkFBWSxFQUFFLENBQUM7Z0JBQ3hCLENBQUM7Z0JBRTFCLCtDQUFnQixHQUFoQixVQUFpQixHQUFXO29CQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztvQkFDeEIseUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNqRixDQUFDO2dCQUVELG1DQUFJLEdBQUosY0FBaUIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUU1QyxpREFBa0IsR0FBbEIsVUFBbUIsUUFBZ0I7b0JBQ2pDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkQsQ0FBQztvQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQztnQkFDMUMsQ0FBQztnQkFFRCx3Q0FBUyxHQUFULFVBQVUsR0FBUSxFQUFFLEtBQWEsRUFBRSxJQUFZLEVBQUUsS0FBYTtvQkFDNUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7b0JBRTNCLElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO29CQUN6RCxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztvQkFFeEIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDcEMsQ0FBQztnQkFFRCwyQ0FBWSxHQUFaLFVBQWEsR0FBUSxFQUFFLEtBQWEsRUFBRSxJQUFZLEVBQUUsS0FBYTtvQkFDL0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7b0JBRTNCLElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO29CQUN6RCxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztvQkFFeEIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLENBQUM7Z0JBQ2xELENBQUM7Z0JBRUQseUNBQVUsR0FBVixVQUFXLEVBQXdCLElBQVUseUJBQWlCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU5RiwwQ0FBVyxHQUFYLGNBQXdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO2dCQUV2RCxtQ0FBSSxHQUFKO29CQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUM7d0JBQ3RCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQzt3QkFDNUYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNqQyxDQUFDO2dCQUNILENBQUM7Z0JBRUQsc0NBQU8sR0FBUCxjQUFrQixNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztnQkF4RDlDO29CQUFDLGVBQVUsRUFBRTs7d0NBQUE7Z0JBeURiLDJCQUFDO1lBQUQsQ0F4REEsQUF3REMsQ0F4RHlDLG9DQUFnQixHQXdEekQ7WUF4REQsdURBd0RDLENBQUE7WUFFRDtnQkFHRSw0QkFBbUIsTUFBYztvQkFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO29CQUZqQyxRQUFHLEdBQVksSUFBSSxDQUFDO29CQUNwQixTQUFJLEdBQVcsVUFBVSxDQUFDO2dCQUNVLENBQUM7Z0JBQ3ZDLHlCQUFDO1lBQUQsQ0FKQSxBQUlDLElBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvbW9jay9tb2NrX2xvY2F0aW9uX3N0cmF0ZWd5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge0V2ZW50RW1pdHRlciwgT2JzZXJ2YWJsZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYXN5bmMnO1xuaW1wb3J0IHtMb2NhdGlvblN0cmF0ZWd5fSBmcm9tICdhbmd1bGFyMi9zcmMvcm91dGVyL2xvY2F0aW9uL2xvY2F0aW9uX3N0cmF0ZWd5JztcblxuXG4vKipcbiAqIEEgbW9jayBpbXBsZW1lbnRhdGlvbiBvZiB7QGxpbmsgTG9jYXRpb25TdHJhdGVneX0gdGhhdCBhbGxvd3MgdGVzdHMgdG8gZmlyZSBzaW11bGF0ZWRcbiAqIGxvY2F0aW9uIGV2ZW50cy5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vY2tMb2NhdGlvblN0cmF0ZWd5IGV4dGVuZHMgTG9jYXRpb25TdHJhdGVneSB7XG4gIGludGVybmFsQmFzZUhyZWY6IHN0cmluZyA9ICcvJztcbiAgaW50ZXJuYWxQYXRoOiBzdHJpbmcgPSAnLyc7XG4gIGludGVybmFsVGl0bGU6IHN0cmluZyA9ICcnO1xuICB1cmxDaGFuZ2VzOiBzdHJpbmdbXSA9IFtdO1xuICAvKiogQGludGVybmFsICovXG4gIF9zdWJqZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgY29uc3RydWN0b3IoKSB7IHN1cGVyKCk7IH1cblxuICBzaW11bGF0ZVBvcFN0YXRlKHVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5pbnRlcm5hbFBhdGggPSB1cmw7XG4gICAgT2JzZXJ2YWJsZVdyYXBwZXIuY2FsbEVtaXQodGhpcy5fc3ViamVjdCwgbmV3IF9Nb2NrUG9wU3RhdGVFdmVudCh0aGlzLnBhdGgoKSkpO1xuICB9XG5cbiAgcGF0aCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5pbnRlcm5hbFBhdGg7IH1cblxuICBwcmVwYXJlRXh0ZXJuYWxVcmwoaW50ZXJuYWw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKGludGVybmFsLnN0YXJ0c1dpdGgoJy8nKSAmJiB0aGlzLmludGVybmFsQmFzZUhyZWYuZW5kc1dpdGgoJy8nKSkge1xuICAgICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxCYXNlSHJlZiArIGludGVybmFsLnN1YnN0cmluZygxKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxCYXNlSHJlZiArIGludGVybmFsO1xuICB9XG5cbiAgcHVzaFN0YXRlKGN0eDogYW55LCB0aXRsZTogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIHF1ZXJ5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmludGVybmFsVGl0bGUgPSB0aXRsZTtcblxuICAgIHZhciB1cmwgPSBwYXRoICsgKHF1ZXJ5Lmxlbmd0aCA+IDAgPyAoJz8nICsgcXVlcnkpIDogJycpO1xuICAgIHRoaXMuaW50ZXJuYWxQYXRoID0gdXJsO1xuXG4gICAgdmFyIGV4dGVybmFsVXJsID0gdGhpcy5wcmVwYXJlRXh0ZXJuYWxVcmwodXJsKTtcbiAgICB0aGlzLnVybENoYW5nZXMucHVzaChleHRlcm5hbFVybCk7XG4gIH1cblxuICByZXBsYWNlU3RhdGUoY3R4OiBhbnksIHRpdGxlOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgcXVlcnk6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuaW50ZXJuYWxUaXRsZSA9IHRpdGxlO1xuXG4gICAgdmFyIHVybCA9IHBhdGggKyAocXVlcnkubGVuZ3RoID4gMCA/ICgnPycgKyBxdWVyeSkgOiAnJyk7XG4gICAgdGhpcy5pbnRlcm5hbFBhdGggPSB1cmw7XG5cbiAgICB2YXIgZXh0ZXJuYWxVcmwgPSB0aGlzLnByZXBhcmVFeHRlcm5hbFVybCh1cmwpO1xuICAgIHRoaXMudXJsQ2hhbmdlcy5wdXNoKCdyZXBsYWNlOiAnICsgZXh0ZXJuYWxVcmwpO1xuICB9XG5cbiAgb25Qb3BTdGF0ZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpOiB2b2lkIHsgT2JzZXJ2YWJsZVdyYXBwZXIuc3Vic2NyaWJlKHRoaXMuX3N1YmplY3QsIGZuKTsgfVxuXG4gIGdldEJhc2VIcmVmKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLmludGVybmFsQmFzZUhyZWY7IH1cblxuICBiYWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnVybENoYW5nZXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy51cmxDaGFuZ2VzLnBvcCgpO1xuICAgICAgdmFyIG5leHRVcmwgPSB0aGlzLnVybENoYW5nZXMubGVuZ3RoID4gMCA/IHRoaXMudXJsQ2hhbmdlc1t0aGlzLnVybENoYW5nZXMubGVuZ3RoIC0gMV0gOiAnJztcbiAgICAgIHRoaXMuc2ltdWxhdGVQb3BTdGF0ZShuZXh0VXJsKTtcbiAgICB9XG4gIH1cblxuICBmb3J3YXJkKCk6IHZvaWQgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxufVxuXG5jbGFzcyBfTW9ja1BvcFN0YXRlRXZlbnQge1xuICBwb3A6IGJvb2xlYW4gPSB0cnVlO1xuICB0eXBlOiBzdHJpbmcgPSAncG9wc3RhdGUnO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmV3VXJsOiBzdHJpbmcpIHt9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
