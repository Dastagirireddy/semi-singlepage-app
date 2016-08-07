System.register(['angular2/src/facade/lang', 'angular2/src/facade/collection'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, collection_1;
    var TouchMap;
    function normalizeString(obj) {
        if (lang_1.isBlank(obj)) {
            return null;
        }
        else {
            return obj.toString();
        }
    }
    exports_1("normalizeString", normalizeString);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            }],
        execute: function() {
            TouchMap = (function () {
                function TouchMap(map) {
                    var _this = this;
                    this.map = {};
                    this.keys = {};
                    if (lang_1.isPresent(map)) {
                        collection_1.StringMapWrapper.forEach(map, function (value, key) {
                            _this.map[key] = lang_1.isPresent(value) ? value.toString() : null;
                            _this.keys[key] = true;
                        });
                    }
                }
                TouchMap.prototype.get = function (key) {
                    collection_1.StringMapWrapper.delete(this.keys, key);
                    return this.map[key];
                };
                TouchMap.prototype.getUnused = function () {
                    var _this = this;
                    var unused = {};
                    var keys = collection_1.StringMapWrapper.keys(this.keys);
                    keys.forEach(function (key) { return unused[key] = collection_1.StringMapWrapper.get(_this.map, key); });
                    return unused;
                };
                return TouchMap;
            }());
            exports_1("TouchMap", TouchMap);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7SUE4QkEseUJBQWdDLEdBQVE7UUFDdEMsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN4QixDQUFDO0lBQ0gsQ0FBQztJQU5ELDZDQU1DLENBQUE7Ozs7Ozs7Ozs7WUFqQ0Q7Z0JBSUUsa0JBQVksR0FBeUI7b0JBSnZDLGlCQXdCQztvQkF2QkMsUUFBRyxHQUE0QixFQUFFLENBQUM7b0JBQ2xDLFNBQUksR0FBNkIsRUFBRSxDQUFDO29CQUdsQyxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbkIsNkJBQWdCLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxVQUFDLEtBQUssRUFBRSxHQUFHOzRCQUN2QyxLQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLGdCQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQzs0QkFDM0QsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7d0JBQ3hCLENBQUMsQ0FBQyxDQUFDO29CQUNMLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCxzQkFBRyxHQUFILFVBQUksR0FBVztvQkFDYiw2QkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDeEMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3ZCLENBQUM7Z0JBRUQsNEJBQVMsR0FBVDtvQkFBQSxpQkFLQztvQkFKQyxJQUFJLE1BQU0sR0FBeUIsRUFBRSxDQUFDO29CQUN0QyxJQUFJLElBQUksR0FBRyw2QkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLDZCQUFnQixDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFqRCxDQUFpRCxDQUFDLENBQUM7b0JBQ3ZFLE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQ2hCLENBQUM7Z0JBQ0gsZUFBQztZQUFELENBeEJBLEFBd0JDLElBQUE7WUF4QkQsK0JBd0JDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci91dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNQcmVzZW50LCBpc0JsYW5rfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtTdHJpbmdNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuXG5leHBvcnQgY2xhc3MgVG91Y2hNYXAge1xuICBtYXA6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gIGtleXM6IHtba2V5OiBzdHJpbmddOiBib29sZWFufSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKG1hcDoge1trZXk6IHN0cmluZ106IGFueX0pIHtcbiAgICBpZiAoaXNQcmVzZW50KG1hcCkpIHtcbiAgICAgIFN0cmluZ01hcFdyYXBwZXIuZm9yRWFjaChtYXAsICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgIHRoaXMubWFwW2tleV0gPSBpc1ByZXNlbnQodmFsdWUpID8gdmFsdWUudG9TdHJpbmcoKSA6IG51bGw7XG4gICAgICAgIHRoaXMua2V5c1trZXldID0gdHJ1ZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldChrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgU3RyaW5nTWFwV3JhcHBlci5kZWxldGUodGhpcy5rZXlzLCBrZXkpO1xuICAgIHJldHVybiB0aGlzLm1hcFtrZXldO1xuICB9XG5cbiAgZ2V0VW51c2VkKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICB2YXIgdW51c2VkOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9O1xuICAgIHZhciBrZXlzID0gU3RyaW5nTWFwV3JhcHBlci5rZXlzKHRoaXMua2V5cyk7XG4gICAga2V5cy5mb3JFYWNoKGtleSA9PiB1bnVzZWRba2V5XSA9IFN0cmluZ01hcFdyYXBwZXIuZ2V0KHRoaXMubWFwLCBrZXkpKTtcbiAgICByZXR1cm4gdW51c2VkO1xuICB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZVN0cmluZyhvYmo6IGFueSk6IHN0cmluZyB7XG4gIGlmIChpc0JsYW5rKG9iaikpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb2JqLnRvU3RyaW5nKCk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
