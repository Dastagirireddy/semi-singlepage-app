System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/collection'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, exceptions_1, collection_1;
    var Headers;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            }],
        execute: function() {
            /**
             * Polyfill for [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers), as
             * specified in the [Fetch Spec](https://fetch.spec.whatwg.org/#headers-class).
             *
             * The only known difference between this `Headers` implementation and the spec is the
             * lack of an `entries` method.
             *
             * ### Example ([live demo](http://plnkr.co/edit/MTdwT6?p=preview))
             *
             * ```
             * import {Headers} from 'angular2/http';
             *
             * var firstHeaders = new Headers();
             * firstHeaders.append('Content-Type', 'image/jpeg');
             * console.log(firstHeaders.get('Content-Type')) //'image/jpeg'
             *
             * // Create headers from Plain Old JavaScript Object
             * var secondHeaders = new Headers({
             *   'X-My-Custom-Header': 'Angular'
             * });
             * console.log(secondHeaders.get('X-My-Custom-Header')); //'Angular'
             *
             * var thirdHeaders = new Headers(secondHeaders);
             * console.log(thirdHeaders.get('X-My-Custom-Header')); //'Angular'
             * ```
             */
            Headers = (function () {
                function Headers(headers) {
                    var _this = this;
                    if (headers instanceof Headers) {
                        this._headersMap = headers._headersMap;
                        return;
                    }
                    this._headersMap = new collection_1.Map();
                    if (lang_1.isBlank(headers)) {
                        return;
                    }
                    // headers instanceof StringMap
                    collection_1.StringMapWrapper.forEach(headers, function (v, k) {
                        _this._headersMap.set(k, collection_1.isListLikeIterable(v) ? v : [v]);
                    });
                }
                /**
                 * Returns a new Headers instance from the given DOMString of Response Headers
                 */
                Headers.fromResponseHeaderString = function (headersString) {
                    return headersString.trim()
                        .split('\n')
                        .map(function (val) { return val.split(':'); })
                        .map(function (_a) {
                        var key = _a[0], parts = _a.slice(1);
                        return ([key.trim(), parts.join(':').trim()]);
                    })
                        .reduce(function (headers, _a) {
                        var key = _a[0], value = _a[1];
                        return !headers.set(key, value) && headers;
                    }, new Headers());
                };
                /**
                 * Appends a header to existing list of header values for a given header name.
                 */
                Headers.prototype.append = function (name, value) {
                    var mapName = this._headersMap.get(name);
                    var list = collection_1.isListLikeIterable(mapName) ? mapName : [];
                    list.push(value);
                    this._headersMap.set(name, list);
                };
                /**
                 * Deletes all header values for the given name.
                 */
                Headers.prototype.delete = function (name) { this._headersMap.delete(name); };
                Headers.prototype.forEach = function (fn) {
                    this._headersMap.forEach(fn);
                };
                /**
                 * Returns first header that matches given name.
                 */
                Headers.prototype.get = function (header) { return collection_1.ListWrapper.first(this._headersMap.get(header)); };
                /**
                 * Check for existence of header by given name.
                 */
                Headers.prototype.has = function (header) { return this._headersMap.has(header); };
                /**
                 * Provides names of set headers
                 */
                Headers.prototype.keys = function () { return collection_1.MapWrapper.keys(this._headersMap); };
                /**
                 * Sets or overrides header value for given name.
                 */
                Headers.prototype.set = function (header, value) {
                    var list = [];
                    if (collection_1.isListLikeIterable(value)) {
                        var pushValue = value.join(',');
                        list.push(pushValue);
                    }
                    else {
                        list.push(value);
                    }
                    this._headersMap.set(header, list);
                };
                /**
                 * Returns values of all headers.
                 */
                Headers.prototype.values = function () { return collection_1.MapWrapper.values(this._headersMap); };
                /**
                 * Returns string of all headers.
                 */
                Headers.prototype.toJSON = function () {
                    var serializableHeaders = {};
                    this._headersMap.forEach(function (values, name) {
                        var list = [];
                        collection_1.iterateListLike(values, function (val) { return list = collection_1.ListWrapper.concat(list, val.split(',')); });
                        serializableHeaders[name] = list;
                    });
                    return serializableHeaders;
                };
                /**
                 * Returns list of header values for a given name.
                 */
                Headers.prototype.getAll = function (header) {
                    var headers = this._headersMap.get(header);
                    return collection_1.isListLikeIterable(headers) ? headers : [];
                };
                /**
                 * This method is not implemented.
                 */
                Headers.prototype.entries = function () { throw new exceptions_1.BaseException('"entries" method is not implemented on Headers class'); };
                return Headers;
            }());
            exports_1("Headers", Headers);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9odHRwL2hlYWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFrQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUF5Qkc7WUFDSDtnQkFHRSxpQkFBWSxPQUF3QztvQkFIdEQsaUJBa0hDO29CQTlHRyxFQUFFLENBQUMsQ0FBQyxPQUFPLFlBQVksT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBYSxPQUFRLENBQUMsV0FBVyxDQUFDO3dCQUNsRCxNQUFNLENBQUM7b0JBQ1QsQ0FBQztvQkFFRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksZ0JBQUcsRUFBb0IsQ0FBQztvQkFFL0MsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDckIsTUFBTSxDQUFDO29CQUNULENBQUM7b0JBRUQsK0JBQStCO29CQUMvQiw2QkFBZ0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBTSxFQUFFLENBQVM7d0JBQ2xELEtBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSwrQkFBa0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzRCxDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDO2dCQUVEOzttQkFFRztnQkFDSSxnQ0FBd0IsR0FBL0IsVUFBZ0MsYUFBcUI7b0JBQ25ELE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFO3lCQUN0QixLQUFLLENBQUMsSUFBSSxDQUFDO3lCQUNYLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQWQsQ0FBYyxDQUFDO3lCQUMxQixHQUFHLENBQUMsVUFBQyxFQUFlOzRCQUFkLFdBQUcsRUFBRSxtQkFBUTt3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QkFFZCw0QkFBZSxDQUFDLE1BQU0sRUFBRSxVQUFBLEdBQUcsSUFBSSxPQUFBLElBQUksR0FBRyx3QkFBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUEvQyxDQUErQyxDQUFDLENBQUM7d0JBRWhGLG1CQUFtQixDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztvQkFDbkMsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsTUFBTSxDQUFDLG1CQUFtQixDQUFDO2dCQUM3QixDQUFDO2dCQUVEOzttQkFFRztnQkFDSCx3QkFBTSxHQUFOLFVBQU8sTUFBYztvQkFDbkIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzNDLE1BQU0sQ0FBQywrQkFBa0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxPQUFPLEdBQUcsRUFBRSxDQUFDO2dCQUNwRCxDQUFDO2dCQUVEOzttQkFFRztnQkFDSCx5QkFBTyxHQUFQLGNBQVksTUFBTSxJQUFJLDBCQUFhLENBQUMsc0RBQXNELENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hHLGNBQUM7WUFBRCxDQWxIQSxBQWtIQyxJQUFBO1lBbEhELDZCQWtIQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9odHRwL2hlYWRlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBpc1ByZXNlbnQsXG4gIGlzQmxhbmssXG4gIGlzSnNPYmplY3QsXG4gIGlzVHlwZSxcbiAgU3RyaW5nV3JhcHBlcixcbiAgSnNvblxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9uLCBXcmFwcGVkRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtcbiAgaXNMaXN0TGlrZUl0ZXJhYmxlLFxuICBpdGVyYXRlTGlzdExpa2UsXG4gIE1hcCxcbiAgTWFwV3JhcHBlcixcbiAgU3RyaW5nTWFwV3JhcHBlcixcbiAgTGlzdFdyYXBwZXIsXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5cbi8qKlxuICogUG9seWZpbGwgZm9yIFtIZWFkZXJzXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSGVhZGVycy9IZWFkZXJzKSwgYXNcbiAqIHNwZWNpZmllZCBpbiB0aGUgW0ZldGNoIFNwZWNdKGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNoZWFkZXJzLWNsYXNzKS5cbiAqXG4gKiBUaGUgb25seSBrbm93biBkaWZmZXJlbmNlIGJldHdlZW4gdGhpcyBgSGVhZGVyc2AgaW1wbGVtZW50YXRpb24gYW5kIHRoZSBzcGVjIGlzIHRoZVxuICogbGFjayBvZiBhbiBgZW50cmllc2AgbWV0aG9kLlxuICpcbiAqICMjIyBFeGFtcGxlIChbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC9NVGR3VDY/cD1wcmV2aWV3KSlcbiAqXG4gKiBgYGBcbiAqIGltcG9ydCB7SGVhZGVyc30gZnJvbSAnYW5ndWxhcjIvaHR0cCc7XG4gKlxuICogdmFyIGZpcnN0SGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gKiBmaXJzdEhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnaW1hZ2UvanBlZycpO1xuICogY29uc29sZS5sb2coZmlyc3RIZWFkZXJzLmdldCgnQ29udGVudC1UeXBlJykpIC8vJ2ltYWdlL2pwZWcnXG4gKlxuICogLy8gQ3JlYXRlIGhlYWRlcnMgZnJvbSBQbGFpbiBPbGQgSmF2YVNjcmlwdCBPYmplY3RcbiAqIHZhciBzZWNvbmRIZWFkZXJzID0gbmV3IEhlYWRlcnMoe1xuICogICAnWC1NeS1DdXN0b20tSGVhZGVyJzogJ0FuZ3VsYXInXG4gKiB9KTtcbiAqIGNvbnNvbGUubG9nKHNlY29uZEhlYWRlcnMuZ2V0KCdYLU15LUN1c3RvbS1IZWFkZXInKSk7IC8vJ0FuZ3VsYXInXG4gKlxuICogdmFyIHRoaXJkSGVhZGVycyA9IG5ldyBIZWFkZXJzKHNlY29uZEhlYWRlcnMpO1xuICogY29uc29sZS5sb2codGhpcmRIZWFkZXJzLmdldCgnWC1NeS1DdXN0b20tSGVhZGVyJykpOyAvLydBbmd1bGFyJ1xuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBIZWFkZXJzIHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfaGVhZGVyc01hcDogTWFwPHN0cmluZywgc3RyaW5nW10+O1xuICBjb25zdHJ1Y3RvcihoZWFkZXJzPzogSGVhZGVycyB8IHtba2V5OiBzdHJpbmddOiBhbnl9KSB7XG4gICAgaWYgKGhlYWRlcnMgaW5zdGFuY2VvZiBIZWFkZXJzKSB7XG4gICAgICB0aGlzLl9oZWFkZXJzTWFwID0gKDxIZWFkZXJzPmhlYWRlcnMpLl9oZWFkZXJzTWFwO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2hlYWRlcnNNYXAgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nW10+KCk7XG5cbiAgICBpZiAoaXNCbGFuayhoZWFkZXJzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGhlYWRlcnMgaW5zdGFuY2VvZiBTdHJpbmdNYXBcbiAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2goaGVhZGVycywgKHY6IGFueSwgazogc3RyaW5nKSA9PiB7XG4gICAgICB0aGlzLl9oZWFkZXJzTWFwLnNldChrLCBpc0xpc3RMaWtlSXRlcmFibGUodikgPyB2IDogW3ZdKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbmV3IEhlYWRlcnMgaW5zdGFuY2UgZnJvbSB0aGUgZ2l2ZW4gRE9NU3RyaW5nIG9mIFJlc3BvbnNlIEhlYWRlcnNcbiAgICovXG4gIHN0YXRpYyBmcm9tUmVzcG9uc2VIZWFkZXJTdHJpbmcoaGVhZGVyc1N0cmluZzogc3RyaW5nKTogSGVhZGVycyB7XG4gICAgcmV0dXJuIGhlYWRlcnNTdHJpbmcudHJpbSgpXG4gICAgICAgIC5zcGxpdCgnXFxuJylcbiAgICAgICAgLm1hcCh2YWwgPT4gdmFsLnNwbGl0KCc6JykpXG4gICAgICAgIC5tYXAoKFtrZXksIC4uLnBhcnRzXSkgPT4gKFtrZXkudHJpbSgpLCBwYXJ0cy5qb2luKCc6JykudHJpbSgpXSkpXG4gICAgICAgIC5yZWR1Y2UoKGhlYWRlcnMsIFtrZXksIHZhbHVlXSkgPT4gIWhlYWRlcnMuc2V0KGtleSwgdmFsdWUpICYmIGhlYWRlcnMsIG5ldyBIZWFkZXJzKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgYSBoZWFkZXIgdG8gZXhpc3RpbmcgbGlzdCBvZiBoZWFkZXIgdmFsdWVzIGZvciBhIGdpdmVuIGhlYWRlciBuYW1lLlxuICAgKi9cbiAgYXBwZW5kKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHZhciBtYXBOYW1lID0gdGhpcy5faGVhZGVyc01hcC5nZXQobmFtZSk7XG4gICAgdmFyIGxpc3QgPSBpc0xpc3RMaWtlSXRlcmFibGUobWFwTmFtZSkgPyBtYXBOYW1lIDogW107XG4gICAgbGlzdC5wdXNoKHZhbHVlKTtcbiAgICB0aGlzLl9oZWFkZXJzTWFwLnNldChuYW1lLCBsaXN0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGVzIGFsbCBoZWFkZXIgdmFsdWVzIGZvciB0aGUgZ2l2ZW4gbmFtZS5cbiAgICovXG4gIGRlbGV0ZSAobmFtZTogc3RyaW5nKTogdm9pZCB7IHRoaXMuX2hlYWRlcnNNYXAuZGVsZXRlKG5hbWUpOyB9XG5cbiAgZm9yRWFjaChmbjogKHZhbHVlczogc3RyaW5nW10sIG5hbWU6IHN0cmluZywgaGVhZGVyczogTWFwPHN0cmluZywgc3RyaW5nW10+KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5faGVhZGVyc01hcC5mb3JFYWNoKGZuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGZpcnN0IGhlYWRlciB0aGF0IG1hdGNoZXMgZ2l2ZW4gbmFtZS5cbiAgICovXG4gIGdldChoZWFkZXI6IHN0cmluZyk6IHN0cmluZyB7IHJldHVybiBMaXN0V3JhcHBlci5maXJzdCh0aGlzLl9oZWFkZXJzTWFwLmdldChoZWFkZXIpKTsgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBmb3IgZXhpc3RlbmNlIG9mIGhlYWRlciBieSBnaXZlbiBuYW1lLlxuICAgKi9cbiAgaGFzKGhlYWRlcjogc3RyaW5nKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9oZWFkZXJzTWFwLmhhcyhoZWFkZXIpOyB9XG5cbiAgLyoqXG4gICAqIFByb3ZpZGVzIG5hbWVzIG9mIHNldCBoZWFkZXJzXG4gICAqL1xuICBrZXlzKCk6IHN0cmluZ1tdIHsgcmV0dXJuIE1hcFdyYXBwZXIua2V5cyh0aGlzLl9oZWFkZXJzTWFwKTsgfVxuXG4gIC8qKlxuICAgKiBTZXRzIG9yIG92ZXJyaWRlcyBoZWFkZXIgdmFsdWUgZm9yIGdpdmVuIG5hbWUuXG4gICAqL1xuICBzZXQoaGVhZGVyOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSk6IHZvaWQge1xuICAgIHZhciBsaXN0OiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgaWYgKGlzTGlzdExpa2VJdGVyYWJsZSh2YWx1ZSkpIHtcbiAgICAgIHZhciBwdXNoVmFsdWUgPSAoPHN0cmluZ1tdPnZhbHVlKS5qb2luKCcsJyk7XG4gICAgICBsaXN0LnB1c2gocHVzaFZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5wdXNoKDxzdHJpbmc+dmFsdWUpO1xuICAgIH1cblxuICAgIHRoaXMuX2hlYWRlcnNNYXAuc2V0KGhlYWRlciwgbGlzdCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB2YWx1ZXMgb2YgYWxsIGhlYWRlcnMuXG4gICAqL1xuICB2YWx1ZXMoKTogc3RyaW5nW11bXSB7IHJldHVybiBNYXBXcmFwcGVyLnZhbHVlcyh0aGlzLl9oZWFkZXJzTWFwKTsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHN0cmluZyBvZiBhbGwgaGVhZGVycy5cbiAgICovXG4gIHRvSlNPTigpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgbGV0IHNlcmlhbGl6YWJsZUhlYWRlcnMgPSB7fTtcbiAgICB0aGlzLl9oZWFkZXJzTWFwLmZvckVhY2goKHZhbHVlczogc3RyaW5nW10sIG5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgbGV0IGxpc3QgPSBbXTtcblxuICAgICAgaXRlcmF0ZUxpc3RMaWtlKHZhbHVlcywgdmFsID0+IGxpc3QgPSBMaXN0V3JhcHBlci5jb25jYXQobGlzdCwgdmFsLnNwbGl0KCcsJykpKTtcblxuICAgICAgc2VyaWFsaXphYmxlSGVhZGVyc1tuYW1lXSA9IGxpc3Q7XG4gICAgfSk7XG4gICAgcmV0dXJuIHNlcmlhbGl6YWJsZUhlYWRlcnM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBsaXN0IG9mIGhlYWRlciB2YWx1ZXMgZm9yIGEgZ2l2ZW4gbmFtZS5cbiAgICovXG4gIGdldEFsbChoZWFkZXI6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICB2YXIgaGVhZGVycyA9IHRoaXMuX2hlYWRlcnNNYXAuZ2V0KGhlYWRlcik7XG4gICAgcmV0dXJuIGlzTGlzdExpa2VJdGVyYWJsZShoZWFkZXJzKSA/IGhlYWRlcnMgOiBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXG4gICAqL1xuICBlbnRyaWVzKCkgeyB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbignXCJlbnRyaWVzXCIgbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZCBvbiBIZWFkZXJzIGNsYXNzJyk7IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
