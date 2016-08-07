System.register(['angular2/src/facade/lang', 'angular2/src/facade/collection'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, collection_1;
    var URLSearchParams;
    function paramParser(rawParams) {
        if (rawParams === void 0) { rawParams = ''; }
        var map = new collection_1.Map();
        if (rawParams.length > 0) {
            var params = rawParams.split('&');
            params.forEach(function (param) {
                var split = param.split('=');
                var key = split[0];
                var val = split[1];
                var list = lang_1.isPresent(map.get(key)) ? map.get(key) : [];
                list.push(val);
                map.set(key, list);
            });
        }
        return map;
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            }],
        execute: function() {
            /**
             * Map-like representation of url search parameters, based on
             * [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams) in the url living standard,
             * with several extensions for merging URLSearchParams objects:
             *   - setAll()
             *   - appendAll()
             *   - replaceAll()
             */
            URLSearchParams = (function () {
                function URLSearchParams(rawParams) {
                    if (rawParams === void 0) { rawParams = ''; }
                    this.rawParams = rawParams;
                    this.paramsMap = paramParser(rawParams);
                }
                URLSearchParams.prototype.clone = function () {
                    var clone = new URLSearchParams();
                    clone.appendAll(this);
                    return clone;
                };
                URLSearchParams.prototype.has = function (param) { return this.paramsMap.has(param); };
                URLSearchParams.prototype.get = function (param) {
                    var storedParam = this.paramsMap.get(param);
                    if (collection_1.isListLikeIterable(storedParam)) {
                        return collection_1.ListWrapper.first(storedParam);
                    }
                    else {
                        return null;
                    }
                };
                URLSearchParams.prototype.getAll = function (param) {
                    var mapParam = this.paramsMap.get(param);
                    return lang_1.isPresent(mapParam) ? mapParam : [];
                };
                URLSearchParams.prototype.set = function (param, val) {
                    var mapParam = this.paramsMap.get(param);
                    var list = lang_1.isPresent(mapParam) ? mapParam : [];
                    collection_1.ListWrapper.clear(list);
                    list.push(val);
                    this.paramsMap.set(param, list);
                };
                // A merge operation
                // For each name-values pair in `searchParams`, perform `set(name, values[0])`
                //
                // E.g: "a=[1,2,3], c=[8]" + "a=[4,5,6], b=[7]" = "a=[4], c=[8], b=[7]"
                //
                // TODO(@caitp): document this better
                URLSearchParams.prototype.setAll = function (searchParams) {
                    var _this = this;
                    searchParams.paramsMap.forEach(function (value, param) {
                        var mapParam = _this.paramsMap.get(param);
                        var list = lang_1.isPresent(mapParam) ? mapParam : [];
                        collection_1.ListWrapper.clear(list);
                        list.push(value[0]);
                        _this.paramsMap.set(param, list);
                    });
                };
                URLSearchParams.prototype.append = function (param, val) {
                    var mapParam = this.paramsMap.get(param);
                    var list = lang_1.isPresent(mapParam) ? mapParam : [];
                    list.push(val);
                    this.paramsMap.set(param, list);
                };
                // A merge operation
                // For each name-values pair in `searchParams`, perform `append(name, value)`
                // for each value in `values`.
                //
                // E.g: "a=[1,2], c=[8]" + "a=[3,4], b=[7]" = "a=[1,2,3,4], c=[8], b=[7]"
                //
                // TODO(@caitp): document this better
                URLSearchParams.prototype.appendAll = function (searchParams) {
                    var _this = this;
                    searchParams.paramsMap.forEach(function (value, param) {
                        var mapParam = _this.paramsMap.get(param);
                        var list = lang_1.isPresent(mapParam) ? mapParam : [];
                        for (var i = 0; i < value.length; ++i) {
                            list.push(value[i]);
                        }
                        _this.paramsMap.set(param, list);
                    });
                };
                // A merge operation
                // For each name-values pair in `searchParams`, perform `delete(name)`,
                // followed by `set(name, values)`
                //
                // E.g: "a=[1,2,3], c=[8]" + "a=[4,5,6], b=[7]" = "a=[4,5,6], c=[8], b=[7]"
                //
                // TODO(@caitp): document this better
                URLSearchParams.prototype.replaceAll = function (searchParams) {
                    var _this = this;
                    searchParams.paramsMap.forEach(function (value, param) {
                        var mapParam = _this.paramsMap.get(param);
                        var list = lang_1.isPresent(mapParam) ? mapParam : [];
                        collection_1.ListWrapper.clear(list);
                        for (var i = 0; i < value.length; ++i) {
                            list.push(value[i]);
                        }
                        _this.paramsMap.set(param, list);
                    });
                };
                URLSearchParams.prototype.toString = function () {
                    var paramsList = [];
                    this.paramsMap.forEach(function (values, k) { values.forEach(function (v) { return paramsList.push(k + '=' + v); }); });
                    return paramsList.join('&');
                };
                URLSearchParams.prototype.delete = function (param) { this.paramsMap.delete(param); };
                return URLSearchParams;
            }());
            exports_1("URLSearchParams", URLSearchParams);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2h0dHAvdXJsX3NlYXJjaF9wYXJhbXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7SUFHQSxxQkFBcUIsU0FBc0I7UUFBdEIseUJBQXNCLEdBQXRCLGNBQXNCO1FBQ3pDLElBQUksR0FBRyxHQUFHLElBQUksZ0JBQUcsRUFBb0IsQ0FBQztRQUN0QyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxNQUFNLEdBQWEsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1QyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBYTtnQkFDM0IsSUFBSSxLQUFLLEdBQWEsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLElBQUksSUFBSSxHQUFHLGdCQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNmLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDYixDQUFDOzs7Ozs7Ozs7O1lBRUQ7Ozs7Ozs7ZUFPRztZQUNIO2dCQUVFLHlCQUFtQixTQUFzQjtvQkFBN0IseUJBQTZCLEdBQTdCLGNBQTZCO29CQUF0QixjQUFTLEdBQVQsU0FBUyxDQUFhO29CQUFJLElBQUksQ0FB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Qzt3QkFDekMsSUFBSSxJQUFJLEdBQUcsZ0JBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxRQUFRLEdBQUcsRUFBRSxDQUFDO3dCQUMvQyx3QkFBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDeEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7NEJBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3RCLENBQUM7d0JBQ0QsS0FBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNsQyxDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDO2dCQUVELGtDQUFRLEdBQVI7b0JBQ0UsSUFBSSxVQUFVLEdBQWEsRUFBRSxDQUFDO29CQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU0sRUFBRSxDQUFDLElBQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBNUIsQ0FBNEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzlGLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM5QixDQUFDO2dCQUVELGdDQUFNLEdBQU4sVUFBUSxLQUFhLElBQVUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRSxzQkFBQztZQUFELENBdEdBLEFBc0dDLElBQUE7WUF0R0QsNkNBc0dDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvaHR0cC91cmxfc2VhcmNoX3BhcmFtcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q09OU1RfRVhQUiwgaXNQcmVzZW50LCBpc0JsYW5rfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtNYXAsIE1hcFdyYXBwZXIsIExpc3RXcmFwcGVyLCBpc0xpc3RMaWtlSXRlcmFibGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5cbmZ1bmN0aW9uIHBhcmFtUGFyc2VyKHJhd1BhcmFtczogc3RyaW5nID0gJycpOiBNYXA8c3RyaW5nLCBzdHJpbmdbXT4ge1xuICB2YXIgbWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZ1tdPigpO1xuICBpZiAocmF3UGFyYW1zLmxlbmd0aCA+IDApIHtcbiAgICB2YXIgcGFyYW1zOiBzdHJpbmdbXSA9IHJhd1BhcmFtcy5zcGxpdCgnJicpO1xuICAgIHBhcmFtcy5mb3JFYWNoKChwYXJhbTogc3RyaW5nKSA9PiB7XG4gICAgICB2YXIgc3BsaXQ6IHN0cmluZ1tdID0gcGFyYW0uc3BsaXQoJz0nKTtcbiAgICAgIHZhciBrZXkgPSBzcGxpdFswXTtcbiAgICAgIHZhciB2YWwgPSBzcGxpdFsxXTtcbiAgICAgIHZhciBsaXN0ID0gaXNQcmVzZW50KG1hcC5nZXQoa2V5KSkgPyBtYXAuZ2V0KGtleSkgOiBbXTtcbiAgICAgIGxpc3QucHVzaCh2YWwpO1xuICAgICAgbWFwLnNldChrZXksIGxpc3QpO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBtYXA7XG59XG5cbi8qKlxuICogTWFwLWxpa2UgcmVwcmVzZW50YXRpb24gb2YgdXJsIHNlYXJjaCBwYXJhbWV0ZXJzLCBiYXNlZCBvblxuICogW1VSTFNlYXJjaFBhcmFtc10oaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmxzZWFyY2hwYXJhbXMpIGluIHRoZSB1cmwgbGl2aW5nIHN0YW5kYXJkLFxuICogd2l0aCBzZXZlcmFsIGV4dGVuc2lvbnMgZm9yIG1lcmdpbmcgVVJMU2VhcmNoUGFyYW1zIG9iamVjdHM6XG4gKiAgIC0gc2V0QWxsKClcbiAqICAgLSBhcHBlbmRBbGwoKVxuICogICAtIHJlcGxhY2VBbGwoKVxuICovXG5leHBvcnQgY2xhc3MgVVJMU2VhcmNoUGFyYW1zIHtcbiAgcGFyYW1zTWFwOiBNYXA8c3RyaW5nLCBzdHJpbmdbXT47XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByYXdQYXJhbXM6IHN0cmluZyA9ICcnKSB7IHRoaXMucGFyYW1zTWFwID0gcGFyYW1QYXJzZXIocmF3UGFyYW1zKTsgfVxuXG4gIGNsb25lKCk6IFVSTFNlYXJjaFBhcmFtcyB7XG4gICAgdmFyIGNsb25lID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICAgIGNsb25lLmFwcGVuZEFsbCh0aGlzKTtcbiAgICByZXR1cm4gY2xvbmU7XG4gIH1cblxuICBoYXMocGFyYW06IHN0cmluZyk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5wYXJhbXNNYXAuaGFzKHBhcmFtKTsgfVxuXG4gIGdldChwYXJhbTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICB2YXIgc3RvcmVkUGFyYW0gPSB0aGlzLnBhcmFtc01hcC5nZXQocGFyYW0pO1xuICAgIGlmIChpc0xpc3RMaWtlSXRlcmFibGUoc3RvcmVkUGFyYW0pKSB7XG4gICAgICByZXR1cm4gTGlzdFdyYXBwZXIuZmlyc3Qoc3RvcmVkUGFyYW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBnZXRBbGwocGFyYW06IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICB2YXIgbWFwUGFyYW0gPSB0aGlzLnBhcmFtc01hcC5nZXQocGFyYW0pO1xuICAgIHJldHVybiBpc1ByZXNlbnQobWFwUGFyYW0pID8gbWFwUGFyYW0gOiBbXTtcbiAgfVxuXG4gIHNldChwYXJhbTogc3RyaW5nLCB2YWw6IHN0cmluZykge1xuICAgIHZhciBtYXBQYXJhbSA9IHRoaXMucGFyYW1zTWFwLmdldChwYXJhbSk7XG4gICAgdmFyIGxpc3QgPSBpc1ByZXNlbnQobWFwUGFyYW0pID8gbWFwUGFyYW0gOiBbXTtcbiAgICBMaXN0V3JhcHBlci5jbGVhcihsaXN0KTtcbiAgICBsaXN0LnB1c2godmFsKTtcbiAgICB0aGlzLnBhcmFtc01hcC5zZXQocGFyYW0sIGxpc3QpO1xuICB9XG5cbiAgLy8gQSBtZXJnZSBvcGVyYXRpb25cbiAgLy8gRm9yIGVhY2ggbmFtZS12YWx1ZXMgcGFpciBpbiBgc2VhcmNoUGFyYW1zYCwgcGVyZm9ybSBgc2V0KG5hbWUsIHZhbHVlc1swXSlgXG4gIC8vXG4gIC8vIEUuZzogXCJhPVsxLDIsM10sIGM9WzhdXCIgKyBcImE9WzQsNSw2XSwgYj1bN11cIiA9IFwiYT1bNF0sIGM9WzhdLCBiPVs3XVwiXG4gIC8vXG4gIC8vIFRPRE8oQGNhaXRwKTogZG9jdW1lbnQgdGhpcyBiZXR0ZXJcbiAgc2V0QWxsKHNlYXJjaFBhcmFtczogVVJMU2VhcmNoUGFyYW1zKSB7XG4gICAgc2VhcmNoUGFyYW1zLnBhcmFtc01hcC5mb3JFYWNoKCh2YWx1ZSwgcGFyYW0pID0+IHtcbiAgICAgIHZhciBtYXBQYXJhbSA9IHRoaXMucGFyYW1zTWFwLmdldChwYXJhbSk7XG4gICAgICB2YXIgbGlzdCA9IGlzUHJlc2VudChtYXBQYXJhbSkgPyBtYXBQYXJhbSA6IFtdO1xuICAgICAgTGlzdFdyYXBwZXIuY2xlYXIobGlzdCk7XG4gICAgICBsaXN0LnB1c2godmFsdWVbMF0pO1xuICAgICAgdGhpcy5wYXJhbXNNYXAuc2V0KHBhcmFtLCBsaXN0KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFwcGVuZChwYXJhbTogc3RyaW5nLCB2YWw6IHN0cmluZyk6IHZvaWQge1xuICAgIHZhciBtYXBQYXJhbSA9IHRoaXMucGFyYW1zTWFwLmdldChwYXJhbSk7XG4gICAgdmFyIGxpc3QgPSBpc1ByZXNlbnQobWFwUGFyYW0pID8gbWFwUGFyYW0gOiBbXTtcbiAgICBsaXN0LnB1c2godmFsKTtcbiAgICB0aGlzLnBhcmFtc01hcC5zZXQocGFyYW0sIGxpc3QpO1xuICB9XG5cbiAgLy8gQSBtZXJnZSBvcGVyYXRpb25cbiAgLy8gRm9yIGVhY2ggbmFtZS12YWx1ZXMgcGFpciBpbiBgc2VhcmNoUGFyYW1zYCwgcGVyZm9ybSBgYXBwZW5kKG5hbWUsIHZhbHVlKWBcbiAgLy8gZm9yIGVhY2ggdmFsdWUgaW4gYHZhbHVlc2AuXG4gIC8vXG4gIC8vIEUuZzogXCJhPVsxLDJdLCBjPVs4XVwiICsgXCJhPVszLDRdLCBiPVs3XVwiID0gXCJhPVsxLDIsMyw0XSwgYz1bOF0sIGI9WzddXCJcbiAgLy9cbiAgLy8gVE9ETyhAY2FpdHApOiBkb2N1bWVudCB0aGlzIGJldHRlclxuICBhcHBlbmRBbGwoc2VhcmNoUGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMpIHtcbiAgICBzZWFyY2hQYXJhbXMucGFyYW1zTWFwLmZvckVhY2goKHZhbHVlLCBwYXJhbSkgPT4ge1xuICAgICAgdmFyIG1hcFBhcmFtID0gdGhpcy5wYXJhbXNNYXAuZ2V0KHBhcmFtKTtcbiAgICAgIHZhciBsaXN0ID0gaXNQcmVzZW50KG1hcFBhcmFtKSA/IG1hcFBhcmFtIDogW107XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGxpc3QucHVzaCh2YWx1ZVtpXSk7XG4gICAgICB9XG4gICAgICB0aGlzLnBhcmFtc01hcC5zZXQocGFyYW0sIGxpc3QpO1xuICAgIH0pO1xuICB9XG5cblxuICAvLyBBIG1lcmdlIG9wZXJhdGlvblxuICAvLyBGb3IgZWFjaCBuYW1lLXZhbHVlcyBwYWlyIGluIGBzZWFyY2hQYXJhbXNgLCBwZXJmb3JtIGBkZWxldGUobmFtZSlgLFxuICAvLyBmb2xsb3dlZCBieSBgc2V0KG5hbWUsIHZhbHVlcylgXG4gIC8vXG4gIC8vIEUuZzogXCJhPVsxLDIsM10sIGM9WzhdXCIgKyBcImE9WzQsNSw2XSwgYj1bN11cIiA9IFwiYT1bNCw1LDZdLCBjPVs4XSwgYj1bN11cIlxuICAvL1xuICAvLyBUT0RPKEBjYWl0cCk6IGRvY3VtZW50IHRoaXMgYmV0dGVyXG4gIHJlcGxhY2VBbGwoc2VhcmNoUGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMpIHtcbiAgICBzZWFyY2hQYXJhbXMucGFyYW1zTWFwLmZvckVhY2goKHZhbHVlLCBwYXJhbSkgPT4ge1xuICAgICAgdmFyIG1hcFBhcmFtID0gdGhpcy5wYXJhbXNNYXAuZ2V0KHBhcmFtKTtcbiAgICAgIHZhciBsaXN0ID0gaXNQcmVzZW50KG1hcFBhcmFtKSA/IG1hcFBhcmFtIDogW107XG4gICAgICBMaXN0V3JhcHBlci5jbGVhcihsaXN0KTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgbGlzdC5wdXNoKHZhbHVlW2ldKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucGFyYW1zTWFwLnNldChwYXJhbSwgbGlzdCk7XG4gICAgfSk7XG4gIH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHZhciBwYXJhbXNMaXN0OiBzdHJpbmdbXSA9IFtdO1xuICAgIHRoaXMucGFyYW1zTWFwLmZvckVhY2goKHZhbHVlcywgaykgPT4geyB2YWx1ZXMuZm9yRWFjaCh2ID0+IHBhcmFtc0xpc3QucHVzaChrICsgJz0nICsgdikpOyB9KTtcbiAgICByZXR1cm4gcGFyYW1zTGlzdC5qb2luKCcmJyk7XG4gIH1cblxuICBkZWxldGUgKHBhcmFtOiBzdHJpbmcpOiB2b2lkIHsgdGhpcy5wYXJhbXNNYXAuZGVsZXRlKHBhcmFtKTsgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
