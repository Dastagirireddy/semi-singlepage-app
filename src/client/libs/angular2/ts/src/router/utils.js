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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztJQThCQSx5QkFBZ0MsR0FBUTtRQUN0QyxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3hCLENBQUM7SUFDSCxDQUFDO0lBTkQsNkNBTUMsQ0FBQTs7Ozs7Ozs7OztZQWpDRDtnQkFJRSxrQkFBWSxHQUF5QjtvQkFKdkMsaUJBd0JDO29CQXZCQyxRQUFHLEdBQTRCLEVBQUUsQ0FBQztvQkFDbEMsU0FBSSxHQUE2QixFQUFFLENBQUM7b0JBR2xDLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNuQiw2QkFBZ0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFVBQUMsS0FBSyxFQUFFLEdBQUc7NEJBQ3ZDLEtBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsZ0JBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDOzRCQUMzRCxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQzt3QkFDeEIsQ0FBQyxDQUFDLENBQUM7b0JBQ0wsQ0FBQztnQkFDSCxDQUFDO2dCQUVELHNCQUFHLEdBQUgsVUFBSSxHQUFXO29CQUNiLDZCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdkIsQ0FBQztnQkFFRCw0QkFBUyxHQUFUO29CQUFBLGlCQUtDO29CQUpDLElBQUksTUFBTSxHQUF5QixFQUFFLENBQUM7b0JBQ3RDLElBQUksSUFBSSxHQUFHLDZCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsNkJBQWdCLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQWpELENBQWlELENBQUMsQ0FBQztvQkFDdkUsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDaEIsQ0FBQztnQkFDSCxlQUFDO1lBQUQsQ0F4QkEsQUF3QkMsSUFBQTtZQXhCRCwrQkF3QkMsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvdXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzUHJlc2VudCwgaXNCbGFua30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7U3RyaW5nTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcblxuZXhwb3J0IGNsYXNzIFRvdWNoTWFwIHtcbiAgbWFwOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICBrZXlzOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn0gPSB7fTtcblxuICBjb25zdHJ1Y3RvcihtYXA6IHtba2V5OiBzdHJpbmddOiBhbnl9KSB7XG4gICAgaWYgKGlzUHJlc2VudChtYXApKSB7XG4gICAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2gobWFwLCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICB0aGlzLm1hcFtrZXldID0gaXNQcmVzZW50KHZhbHVlKSA/IHZhbHVlLnRvU3RyaW5nKCkgOiBudWxsO1xuICAgICAgICB0aGlzLmtleXNba2V5XSA9IHRydWU7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXQoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIFN0cmluZ01hcFdyYXBwZXIuZGVsZXRlKHRoaXMua2V5cywga2V5KTtcbiAgICByZXR1cm4gdGhpcy5tYXBba2V5XTtcbiAgfVxuXG4gIGdldFVudXNlZCgpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgdmFyIHVudXNlZDoge1trZXk6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICB2YXIga2V5cyA9IFN0cmluZ01hcFdyYXBwZXIua2V5cyh0aGlzLmtleXMpO1xuICAgIGtleXMuZm9yRWFjaChrZXkgPT4gdW51c2VkW2tleV0gPSBTdHJpbmdNYXBXcmFwcGVyLmdldCh0aGlzLm1hcCwga2V5KSk7XG4gICAgcmV0dXJuIHVudXNlZDtcbiAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVTdHJpbmcob2JqOiBhbnkpOiBzdHJpbmcge1xuICBpZiAoaXNCbGFuayhvYmopKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9iai50b1N0cmluZygpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
