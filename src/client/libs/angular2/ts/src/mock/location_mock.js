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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL21vY2svbG9jYXRpb25fbW9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUtBOztlQUVHO1lBRUg7Z0JBQUE7b0JBQ0UsZUFBVSxHQUFhLEVBQUUsQ0FBQztvQkFDMUIsZ0JBQWdCO29CQUNoQixVQUFLLEdBQVcsRUFBRSxDQUFDO29CQUNuQixnQkFBZ0I7b0JBQ2hCLFdBQU0sR0FBVyxFQUFFLENBQUM7b0JBQ3BCLGdCQUFnQjtvQkFDaEIsYUFBUSxHQUFzQixJQUFJLG9CQUFZLEVBQUUsQ0FBQztvQkFDakQsZ0JBQWdCO29CQUNoQixjQUFTLEdBQVcsRUFBRSxDQUFDO29CQTREdkIsbUZBQW1GO29CQUNuRixxQkFBZ0IsR0FBUSxJQUFJLENBQUM7Z0JBRS9CLENBQUM7Z0JBN0RDLG9DQUFjLEdBQWQsVUFBZSxHQUFXLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUVqRCxpQ0FBVyxHQUFYLFVBQVksR0FBVyxJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFFbEQsMEJBQUksR0FBSixjQUFpQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBRXJDLG9DQUFjLEdBQWQsVUFBZSxRQUFnQjtvQkFDN0IseUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO2dCQUM1RSxDQUFDO2dCQUVELHdDQUFrQixHQUFsQixVQUFtQixRQUFnQjtvQkFDakMsNEZBQTRGO29CQUM1RixJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUM7b0JBQzFDLHlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUMsQ0FBQyxDQUFDO2dCQUNsRyxDQUFDO2dCQUVELHdDQUFrQixHQUFsQixVQUFtQixHQUFXO29CQUM1QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMzQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztvQkFDbEIsQ0FBQztvQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7Z0JBQzlCLENBQUM7Z0JBRUQsd0JBQUUsR0FBRixVQUFHLElBQVksRUFBRSxLQUFrQjtvQkFBbEIscUJBQWtCLEdBQWxCLFVBQWtCO29CQUNqQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNyQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQy9DLE1BQU0sQ0FBQztvQkFDVCxDQUFDO29CQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO29CQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztvQkFFcEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7b0JBQ3pELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QixDQUFDO2dCQUVELGtDQUFZLEdBQVosVUFBYSxJQUFZLEVBQUUsS0FBa0I7b0JBQWxCLHFCQUFrQixHQUFsQixVQUFrQjtvQkFDM0MsSUFBSSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDckMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO29CQUVwQixJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztvQkFDekQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQyxDQUFDO2dCQUVELDZCQUFPLEdBQVA7b0JBQ0UsT0FBTztnQkFDVCxDQUFDO2dCQUVELDBCQUFJLEdBQUo7b0JBQ0UsT0FBTztnQkFDVCxDQUFDO2dCQUVELCtCQUFTLEdBQVQsVUFBVSxNQUE0QixFQUFFLE9BQW9DLEVBQ2xFLFFBQTJCO29CQURHLHVCQUFvQyxHQUFwQyxjQUFvQztvQkFDbEUsd0JBQTJCLEdBQTNCLGVBQTJCO29CQUNuQyxNQUFNLENBQUMseUJBQWlCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDL0UsQ0FBQztnQkFJRCwrQkFBUyxHQUFULFVBQVUsR0FBVyxJQUFZLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQXhFakQ7b0JBQUMsZUFBVSxFQUFFOzsrQkFBQTtnQkF5RWIsa0JBQUM7WUFBRCxDQXhFQSxBQXdFQyxJQUFBO1lBeEVELHFDQXdFQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL21vY2svbG9jYXRpb25fbW9jay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIE9ic2VydmFibGVXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jJztcbmltcG9ydCB7TGlzdFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge0xvY2F0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvcm91dGVyL2xvY2F0aW9uL2xvY2F0aW9uJztcblxuLyoqXG4gKiBBIHNweSBmb3Ige0BsaW5rIExvY2F0aW9ufSB0aGF0IGFsbG93cyB0ZXN0cyB0byBmaXJlIHNpbXVsYXRlZCBsb2NhdGlvbiBldmVudHMuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTcHlMb2NhdGlvbiBpbXBsZW1lbnRzIExvY2F0aW9uIHtcbiAgdXJsQ2hhbmdlczogc3RyaW5nW10gPSBbXTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcGF0aDogc3RyaW5nID0gJyc7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3F1ZXJ5OiBzdHJpbmcgPSAnJztcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc3ViamVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2Jhc2VIcmVmOiBzdHJpbmcgPSAnJztcblxuICBzZXRJbml0aWFsUGF0aCh1cmw6IHN0cmluZykgeyB0aGlzLl9wYXRoID0gdXJsOyB9XG5cbiAgc2V0QmFzZUhyZWYodXJsOiBzdHJpbmcpIHsgdGhpcy5fYmFzZUhyZWYgPSB1cmw7IH1cblxuICBwYXRoKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9wYXRoOyB9XG5cbiAgc2ltdWxhdGVVcmxQb3AocGF0aG5hbWU6IHN0cmluZykge1xuICAgIE9ic2VydmFibGVXcmFwcGVyLmNhbGxFbWl0KHRoaXMuX3N1YmplY3QsIHsndXJsJzogcGF0aG5hbWUsICdwb3AnOiB0cnVlfSk7XG4gIH1cblxuICBzaW11bGF0ZUhhc2hDaGFuZ2UocGF0aG5hbWU6IHN0cmluZykge1xuICAgIC8vIEJlY2F1c2Ugd2UgZG9uJ3QgcHJldmVudCB0aGUgbmF0aXZlIGV2ZW50LCB0aGUgYnJvd3NlciB3aWxsIGluZGVwZW5kZW50bHkgdXBkYXRlIHRoZSBwYXRoXG4gICAgdGhpcy5zZXRJbml0aWFsUGF0aChwYXRobmFtZSk7XG4gICAgdGhpcy51cmxDaGFuZ2VzLnB1c2goJ2hhc2g6ICcgKyBwYXRobmFtZSk7XG4gICAgT2JzZXJ2YWJsZVdyYXBwZXIuY2FsbEVtaXQodGhpcy5fc3ViamVjdCwgeyd1cmwnOiBwYXRobmFtZSwgJ3BvcCc6IHRydWUsICd0eXBlJzogJ2hhc2hjaGFuZ2UnfSk7XG4gIH1cblxuICBwcmVwYXJlRXh0ZXJuYWxVcmwodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICh1cmwubGVuZ3RoID4gMCAmJiAhdXJsLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgdXJsID0gJy8nICsgdXJsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fYmFzZUhyZWYgKyB1cmw7XG4gIH1cblxuICBnbyhwYXRoOiBzdHJpbmcsIHF1ZXJ5OiBzdHJpbmcgPSAnJykge1xuICAgIHBhdGggPSB0aGlzLnByZXBhcmVFeHRlcm5hbFVybChwYXRoKTtcbiAgICBpZiAodGhpcy5fcGF0aCA9PSBwYXRoICYmIHRoaXMuX3F1ZXJ5ID09IHF1ZXJ5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3BhdGggPSBwYXRoO1xuICAgIHRoaXMuX3F1ZXJ5ID0gcXVlcnk7XG5cbiAgICB2YXIgdXJsID0gcGF0aCArIChxdWVyeS5sZW5ndGggPiAwID8gKCc/JyArIHF1ZXJ5KSA6ICcnKTtcbiAgICB0aGlzLnVybENoYW5nZXMucHVzaCh1cmwpO1xuICB9XG5cbiAgcmVwbGFjZVN0YXRlKHBhdGg6IHN0cmluZywgcXVlcnk6IHN0cmluZyA9ICcnKSB7XG4gICAgcGF0aCA9IHRoaXMucHJlcGFyZUV4dGVybmFsVXJsKHBhdGgpO1xuICAgIHRoaXMuX3BhdGggPSBwYXRoO1xuICAgIHRoaXMuX3F1ZXJ5ID0gcXVlcnk7XG5cbiAgICB2YXIgdXJsID0gcGF0aCArIChxdWVyeS5sZW5ndGggPiAwID8gKCc/JyArIHF1ZXJ5KSA6ICcnKTtcbiAgICB0aGlzLnVybENoYW5nZXMucHVzaCgncmVwbGFjZTogJyArIHVybCk7XG4gIH1cblxuICBmb3J3YXJkKCkge1xuICAgIC8vIFRPRE9cbiAgfVxuXG4gIGJhY2soKSB7XG4gICAgLy8gVE9ET1xuICB9XG5cbiAgc3Vic2NyaWJlKG9uTmV4dDogKHZhbHVlOiBhbnkpID0+IHZvaWQsIG9uVGhyb3c6IChlcnJvcjogYW55KSA9PiB2b2lkID0gbnVsbCxcbiAgICAgICAgICAgIG9uUmV0dXJuOiAoKSA9PiB2b2lkID0gbnVsbCk6IE9iamVjdCB7XG4gICAgcmV0dXJuIE9ic2VydmFibGVXcmFwcGVyLnN1YnNjcmliZSh0aGlzLl9zdWJqZWN0LCBvbk5leHQsIG9uVGhyb3csIG9uUmV0dXJuKTtcbiAgfVxuXG4gIC8vIFRPRE86IHJlbW92ZSB0aGVzZSBvbmNlIExvY2F0aW9uIGlzIGFuIGludGVyZmFjZSwgYW5kIGNhbiBiZSBpbXBsZW1lbnRlZCBjbGVhbmx5XG4gIHBsYXRmb3JtU3RyYXRlZ3k6IGFueSA9IG51bGw7XG4gIG5vcm1hbGl6ZSh1cmw6IHN0cmluZyk6IHN0cmluZyB7IHJldHVybiBudWxsOyB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
