System.register(['angular2/src/compiler/xhr', 'angular2/src/facade/exceptions', 'angular2/src/facade/lang', 'angular2/src/facade/promise'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var xhr_1, exceptions_1, lang_1, promise_1;
    var CachedXHR;
    return {
        setters:[
            function (xhr_1_1) {
                xhr_1 = xhr_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (promise_1_1) {
                promise_1 = promise_1_1;
            }],
        execute: function() {
            /**
             * An implementation of XHR that uses a template cache to avoid doing an actual
             * XHR.
             *
             * The template cache needs to be built and loaded into window.$templateCache
             * via a separate mechanism.
             */
            CachedXHR = (function (_super) {
                __extends(CachedXHR, _super);
                function CachedXHR() {
                    _super.call(this);
                    this._cache = lang_1.global.$templateCache;
                    if (this._cache == null) {
                        throw new exceptions_1.BaseException('CachedXHR: Template cache was not found in $templateCache.');
                    }
                }
                CachedXHR.prototype.get = function (url) {
                    if (this._cache.hasOwnProperty(url)) {
                        return promise_1.PromiseWrapper.resolve(this._cache[url]);
                    }
                    else {
                        return promise_1.PromiseWrapper.reject('CachedXHR: Did not find cached template for ' + url, null);
                    }
                };
                return CachedXHR;
            }(xhr_1.XHR));
            exports_1("CachedXHR", CachedXHR);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9icm93c2VyL3hocl9jYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBS0E7Ozs7OztlQU1HO1lBQ0g7Z0JBQStCLDZCQUFHO2dCQUdoQztvQkFDRSxpQkFBTyxDQUFDO29CQUNSLElBQUksQ0FBQyxNQUFNLEdBQVMsYUFBTyxDQUFDLGNBQWMsQ0FBQztvQkFDM0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUN4QixNQUFNLElBQUksMEJBQWEsQ0FBQyw0REFBNEQsQ0FBQyxDQUFDO29CQUN4RixDQUFDO2dCQUNILENBQUM7Z0JBRUQsdUJBQUcsR0FBSCxVQUFJLEdBQVc7b0JBQ2IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNwQyxNQUFNLENBQUMsd0JBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNsRCxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLE1BQU0sQ0FBQyx3QkFBYyxDQUFDLE1BQU0sQ0FBQyw4Q0FBOEMsR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQzNGLENBQUM7Z0JBQ0gsQ0FBQztnQkFDSCxnQkFBQztZQUFELENBbEJBLEFBa0JDLENBbEI4QixTQUFHLEdBa0JqQztZQWxCRCxpQ0FrQkMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvcGxhdGZvcm0vYnJvd3Nlci94aHJfY2FjaGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1hIUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3hocic7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge2dsb2JhbH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7UHJvbWlzZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvcHJvbWlzZSc7XG5cbi8qKlxuICogQW4gaW1wbGVtZW50YXRpb24gb2YgWEhSIHRoYXQgdXNlcyBhIHRlbXBsYXRlIGNhY2hlIHRvIGF2b2lkIGRvaW5nIGFuIGFjdHVhbFxuICogWEhSLlxuICpcbiAqIFRoZSB0ZW1wbGF0ZSBjYWNoZSBuZWVkcyB0byBiZSBidWlsdCBhbmQgbG9hZGVkIGludG8gd2luZG93LiR0ZW1wbGF0ZUNhY2hlXG4gKiB2aWEgYSBzZXBhcmF0ZSBtZWNoYW5pc20uXG4gKi9cbmV4cG9ydCBjbGFzcyBDYWNoZWRYSFIgZXh0ZW5kcyBYSFIge1xuICBwcml2YXRlIF9jYWNoZToge1t1cmw6IHN0cmluZ106IHN0cmluZ307XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9jYWNoZSA9ICg8YW55Pmdsb2JhbCkuJHRlbXBsYXRlQ2FjaGU7XG4gICAgaWYgKHRoaXMuX2NhY2hlID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKCdDYWNoZWRYSFI6IFRlbXBsYXRlIGNhY2hlIHdhcyBub3QgZm91bmQgaW4gJHRlbXBsYXRlQ2FjaGUuJyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0KHVybDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBpZiAodGhpcy5fY2FjaGUuaGFzT3duUHJvcGVydHkodXJsKSkge1xuICAgICAgcmV0dXJuIFByb21pc2VXcmFwcGVyLnJlc29sdmUodGhpcy5fY2FjaGVbdXJsXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBQcm9taXNlV3JhcHBlci5yZWplY3QoJ0NhY2hlZFhIUjogRGlkIG5vdCBmaW5kIGNhY2hlZCB0ZW1wbGF0ZSBmb3IgJyArIHVybCwgbnVsbCk7XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
