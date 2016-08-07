System.register(['angular2/src/core/di', 'angular2/src/facade/async'], function(exports_1, context_1) {
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
    var di_1, async_1;
    var SpyLocation;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            }],
        execute: function() {
            /**
             * A spy for {@link Location} that allows tests to fire simulated location events.
             */
            SpyLocation = (function () {
                function SpyLocation() {
                    this.urlChanges = [];
                    /** @internal */
                    this._path = '';
                    /** @internal */
                    this._query = '';
                    /** @internal */
                    this._subject = new async_1.EventEmitter();
                    /** @internal */
                    this._baseHref = '';
                    // TODO: remove these once Location is an interface, and can be implemented cleanly
                    this.platformStrategy = null;
                }
                SpyLocation.prototype.setInitialPath = function (url) { this._path = url; };
                SpyLocation.prototype.setBaseHref = function (url) { this._baseHref = url; };
                SpyLocation.prototype.path = function () { return this._path; };
                SpyLocation.prototype.simulateUrlPop = function (pathname) {
                    async_1.ObservableWrapper.callEmit(this._subject, { 'url': pathname, 'pop': true });
                };
                SpyLocation.prototype.simulateHashChange = function (pathname) {
                    // Because we don't prevent the native event, the browser will independently update the path
                    this.setInitialPath(pathname);
                    this.urlChanges.push('hash: ' + pathname);
                    async_1.ObservableWrapper.callEmit(this._subject, { 'url': pathname, 'pop': true, 'type': 'hashchange' });
                };
                SpyLocation.prototype.prepareExternalUrl = function (url) {
                    if (url.length > 0 && !url.startsWith('/')) {
                        url = '/' + url;
                    }
                    return this._baseHref + url;
                };
                SpyLocation.prototype.go = function (path, query) {
                    if (query === void 0) { query = ''; }
                    path = this.prepareExternalUrl(path);
                    if (this._path == path && this._query == query) {
                        return;
                    }
                    this._path = path;
                    this._query = query;
                    var url = path + (query.length > 0 ? ('?' + query) : '');
                    this.urlChanges.push(url);
                };
                SpyLocation.prototype.replaceState = function (path, query) {
                    if (query === void 0) { query = ''; }
                    path = this.prepareExternalUrl(path);
                    this._path = path;
                    this._query = query;
                    var url = path + (query.length > 0 ? ('?' + query) : '');
                    this.urlChanges.push('replace: ' + url);
                };
                SpyLocation.prototype.forward = function () {
                    // TODO
                };
                SpyLocation.prototype.back = function () {
                    // TODO
                };
                SpyLocation.prototype.subscribe = function (onNext, onThrow, onReturn) {
                    if (onThrow === void 0) { onThrow = null; }
                    if (onReturn === void 0) { onReturn = null; }
                    return async_1.ObservableWrapper.subscribe(this._subject, onNext, onThrow, onReturn);
                };
                SpyLocation.prototype.normalize = function (url) { return null; };
                SpyLocation = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], SpyLocation);
                return SpyLocation;
            }());
            exports_1("SpyLocation", SpyLocation);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9tb2NrL2xvY2F0aW9uX21vY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFLQTs7ZUFFRztZQUVIO2dCQUFBO29CQUNFLGVBQVUsR0FBYSxFQUFFLENBQUM7b0JBQzFCLGdCQUFnQjtvQkFDaEIsVUFBSyxHQUFXLEVBQUUsQ0FBQztvQkFDbkIsZ0JBQWdCO29CQUNoQixXQUFNLEdBQVcsRUFBRSxDQUFDO29CQUNwQixnQkFBZ0I7b0JBQ2hCLGFBQVEsR0FBc0IsSUFBSSxvQkFBWSxFQUFFLENBQUM7b0JBQ2pELGdCQUFnQjtvQkFDaEIsY0FBUyxHQUFXLEVBQUUsQ0FBQztvQkE0RHZCLG1GQUFtRjtvQkFDbkYscUJBQWdCLEdBQVEsSUFBSSxDQUFDO2dCQUUvQixDQUFDO2dCQTdEQyxvQ0FBYyxHQUFkLFVBQWUsR0FBVyxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFFakQsaUNBQVcsR0FBWCxVQUFZLEdBQVcsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBRWxELDBCQUFJLEdBQUosY0FBaUIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUVyQyxvQ0FBYyxHQUFkLFVBQWUsUUFBZ0I7b0JBQzdCLHlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztnQkFDNUUsQ0FBQztnQkFFRCx3Q0FBa0IsR0FBbEIsVUFBbUIsUUFBZ0I7b0JBQ2pDLDRGQUE0RjtvQkFDNUYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDO29CQUMxQyx5QkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFDLENBQUMsQ0FBQztnQkFDbEcsQ0FBQztnQkFFRCx3Q0FBa0IsR0FBbEIsVUFBbUIsR0FBVztvQkFDNUIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDM0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7b0JBQ2xCLENBQUM7b0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO2dCQUM5QixDQUFDO2dCQUVELHdCQUFFLEdBQUYsVUFBRyxJQUFZLEVBQUUsS0FBa0I7b0JBQWxCLHFCQUFrQixHQUFsQixVQUFrQjtvQkFDakMsSUFBSSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDckMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO3dCQUMvQyxNQUFNLENBQUM7b0JBQ1QsQ0FBQztvQkFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7b0JBRXBCLElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO29CQUN6RCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUIsQ0FBQztnQkFFRCxrQ0FBWSxHQUFaLFVBQWEsSUFBWSxFQUFFLEtBQWtCO29CQUFsQixxQkFBa0IsR0FBbEIsVUFBa0I7b0JBQzNDLElBQUksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO29CQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztvQkFFcEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7b0JBQ3pELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFDMUMsQ0FBQztnQkFFRCw2QkFBTyxHQUFQO29CQUNFLE9BQU87Z0JBQ1QsQ0FBQztnQkFFRCwwQkFBSSxHQUFKO29CQUNFLE9BQU87Z0JBQ1QsQ0FBQztnQkFFRCwrQkFBUyxHQUFULFVBQVUsTUFBNEIsRUFBRSxPQUFvQyxFQUNsRSxRQUEyQjtvQkFERyx1QkFBb0MsR0FBcEMsY0FBb0M7b0JBQ2xFLHdCQUEyQixHQUEzQixlQUEyQjtvQkFDbkMsTUFBTSxDQUFDLHlCQUFpQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQy9FLENBQUM7Z0JBSUQsK0JBQVMsR0FBVCxVQUFVLEdBQVcsSUFBWSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkF4RWpEO29CQUFDLGVBQVUsRUFBRTs7K0JBQUE7Z0JBeUViLGtCQUFDO1lBQUQsQ0F4RUEsQUF3RUMsSUFBQTtZQXhFRCxxQ0F3RUMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvbW9jay9sb2NhdGlvbl9tb2NrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge0V2ZW50RW1pdHRlciwgT2JzZXJ2YWJsZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYXN5bmMnO1xuaW1wb3J0IHtMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7TG9jYXRpb259IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2NvbW1vbic7XG5cbi8qKlxuICogQSBzcHkgZm9yIHtAbGluayBMb2NhdGlvbn0gdGhhdCBhbGxvd3MgdGVzdHMgdG8gZmlyZSBzaW11bGF0ZWQgbG9jYXRpb24gZXZlbnRzLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3B5TG9jYXRpb24gaW1wbGVtZW50cyBMb2NhdGlvbiB7XG4gIHVybENoYW5nZXM6IHN0cmluZ1tdID0gW107XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3BhdGg6IHN0cmluZyA9ICcnO1xuICAvKiogQGludGVybmFsICovXG4gIF9xdWVyeTogc3RyaW5nID0gJyc7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3N1YmplY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAvKiogQGludGVybmFsICovXG4gIF9iYXNlSHJlZjogc3RyaW5nID0gJyc7XG5cbiAgc2V0SW5pdGlhbFBhdGgodXJsOiBzdHJpbmcpIHsgdGhpcy5fcGF0aCA9IHVybDsgfVxuXG4gIHNldEJhc2VIcmVmKHVybDogc3RyaW5nKSB7IHRoaXMuX2Jhc2VIcmVmID0gdXJsOyB9XG5cbiAgcGF0aCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fcGF0aDsgfVxuXG4gIHNpbXVsYXRlVXJsUG9wKHBhdGhuYW1lOiBzdHJpbmcpIHtcbiAgICBPYnNlcnZhYmxlV3JhcHBlci5jYWxsRW1pdCh0aGlzLl9zdWJqZWN0LCB7J3VybCc6IHBhdGhuYW1lLCAncG9wJzogdHJ1ZX0pO1xuICB9XG5cbiAgc2ltdWxhdGVIYXNoQ2hhbmdlKHBhdGhuYW1lOiBzdHJpbmcpIHtcbiAgICAvLyBCZWNhdXNlIHdlIGRvbid0IHByZXZlbnQgdGhlIG5hdGl2ZSBldmVudCwgdGhlIGJyb3dzZXIgd2lsbCBpbmRlcGVuZGVudGx5IHVwZGF0ZSB0aGUgcGF0aFxuICAgIHRoaXMuc2V0SW5pdGlhbFBhdGgocGF0aG5hbWUpO1xuICAgIHRoaXMudXJsQ2hhbmdlcy5wdXNoKCdoYXNoOiAnICsgcGF0aG5hbWUpO1xuICAgIE9ic2VydmFibGVXcmFwcGVyLmNhbGxFbWl0KHRoaXMuX3N1YmplY3QsIHsndXJsJzogcGF0aG5hbWUsICdwb3AnOiB0cnVlLCAndHlwZSc6ICdoYXNoY2hhbmdlJ30pO1xuICB9XG5cbiAgcHJlcGFyZUV4dGVybmFsVXJsKHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAodXJsLmxlbmd0aCA+IDAgJiYgIXVybC5zdGFydHNXaXRoKCcvJykpIHtcbiAgICAgIHVybCA9ICcvJyArIHVybDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2Jhc2VIcmVmICsgdXJsO1xuICB9XG5cbiAgZ28ocGF0aDogc3RyaW5nLCBxdWVyeTogc3RyaW5nID0gJycpIHtcbiAgICBwYXRoID0gdGhpcy5wcmVwYXJlRXh0ZXJuYWxVcmwocGF0aCk7XG4gICAgaWYgKHRoaXMuX3BhdGggPT0gcGF0aCAmJiB0aGlzLl9xdWVyeSA9PSBxdWVyeSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9wYXRoID0gcGF0aDtcbiAgICB0aGlzLl9xdWVyeSA9IHF1ZXJ5O1xuXG4gICAgdmFyIHVybCA9IHBhdGggKyAocXVlcnkubGVuZ3RoID4gMCA/ICgnPycgKyBxdWVyeSkgOiAnJyk7XG4gICAgdGhpcy51cmxDaGFuZ2VzLnB1c2godXJsKTtcbiAgfVxuXG4gIHJlcGxhY2VTdGF0ZShwYXRoOiBzdHJpbmcsIHF1ZXJ5OiBzdHJpbmcgPSAnJykge1xuICAgIHBhdGggPSB0aGlzLnByZXBhcmVFeHRlcm5hbFVybChwYXRoKTtcbiAgICB0aGlzLl9wYXRoID0gcGF0aDtcbiAgICB0aGlzLl9xdWVyeSA9IHF1ZXJ5O1xuXG4gICAgdmFyIHVybCA9IHBhdGggKyAocXVlcnkubGVuZ3RoID4gMCA/ICgnPycgKyBxdWVyeSkgOiAnJyk7XG4gICAgdGhpcy51cmxDaGFuZ2VzLnB1c2goJ3JlcGxhY2U6ICcgKyB1cmwpO1xuICB9XG5cbiAgZm9yd2FyZCgpIHtcbiAgICAvLyBUT0RPXG4gIH1cblxuICBiYWNrKCkge1xuICAgIC8vIFRPRE9cbiAgfVxuXG4gIHN1YnNjcmliZShvbk5leHQ6ICh2YWx1ZTogYW55KSA9PiB2b2lkLCBvblRocm93OiAoZXJyb3I6IGFueSkgPT4gdm9pZCA9IG51bGwsXG4gICAgICAgICAgICBvblJldHVybjogKCkgPT4gdm9pZCA9IG51bGwpOiBPYmplY3Qge1xuICAgIHJldHVybiBPYnNlcnZhYmxlV3JhcHBlci5zdWJzY3JpYmUodGhpcy5fc3ViamVjdCwgb25OZXh0LCBvblRocm93LCBvblJldHVybik7XG4gIH1cblxuICAvLyBUT0RPOiByZW1vdmUgdGhlc2Ugb25jZSBMb2NhdGlvbiBpcyBhbiBpbnRlcmZhY2UsIGFuZCBjYW4gYmUgaW1wbGVtZW50ZWQgY2xlYW5seVxuICBwbGF0Zm9ybVN0cmF0ZWd5OiBhbnkgPSBudWxsO1xuICBub3JtYWxpemUodXJsOiBzdHJpbmcpOiBzdHJpbmcgeyByZXR1cm4gbnVsbDsgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
