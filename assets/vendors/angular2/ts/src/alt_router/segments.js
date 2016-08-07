System.register(['angular2/src/facade/collection', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var collection_1, lang_1;
    var Tree, UrlSegment, RouteSegment;
    function equalSegments(a, b) {
        if (lang_1.isBlank(a) && !lang_1.isBlank(b))
            return false;
        if (!lang_1.isBlank(a) && lang_1.isBlank(b))
            return false;
        return a._type === b._type && collection_1.StringMapWrapper.equals(a._parameters, b._parameters);
    }
    exports_1("equalSegments", equalSegments);
    function routeSegmentComponentFactory(a) {
        return a._componentFactory;
    }
    exports_1("routeSegmentComponentFactory", routeSegmentComponentFactory);
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            Tree = (function () {
                function Tree(_nodes) {
                    this._nodes = _nodes;
                }
                Object.defineProperty(Tree.prototype, "root", {
                    get: function () { return this._nodes[0]; },
                    enumerable: true,
                    configurable: true
                });
                Tree.prototype.parent = function (t) {
                    var index = this._nodes.indexOf(t);
                    return index > 0 ? this._nodes[index - 1] : null;
                };
                Tree.prototype.children = function (t) {
                    var index = this._nodes.indexOf(t);
                    return index > -1 && index < this._nodes.length - 1 ? [this._nodes[index + 1]] : [];
                };
                Tree.prototype.firstChild = function (t) {
                    var index = this._nodes.indexOf(t);
                    return index > -1 && index < this._nodes.length - 1 ? this._nodes[index + 1] : null;
                };
                Tree.prototype.pathToRoot = function (t) {
                    var index = this._nodes.indexOf(t);
                    return index > -1 ? this._nodes.slice(0, index + 1) : null;
                };
                return Tree;
            }());
            exports_1("Tree", Tree);
            UrlSegment = (function () {
                function UrlSegment(segment, parameters, outlet) {
                    this.segment = segment;
                    this.parameters = parameters;
                    this.outlet = outlet;
                }
                return UrlSegment;
            }());
            exports_1("UrlSegment", UrlSegment);
            RouteSegment = (function () {
                function RouteSegment(urlSegments, parameters, outlet, type, componentFactory) {
                    this.urlSegments = urlSegments;
                    this.outlet = outlet;
                    this._type = type;
                    this._componentFactory = componentFactory;
                    this._parameters = parameters;
                }
                RouteSegment.prototype.getParam = function (param) { return this._parameters[param]; };
                Object.defineProperty(RouteSegment.prototype, "type", {
                    get: function () { return this._type; },
                    enumerable: true,
                    configurable: true
                });
                return RouteSegment;
            }());
            exports_1("RouteSegment", RouteSegment);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9hbHRfcm91dGVyL3NlZ21lbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0lBeURBLHVCQUE4QixDQUFlLEVBQUUsQ0FBZTtRQUM1RCxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzVDLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLGNBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDNUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLEtBQUssSUFBSSw2QkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUpELHlDQUlDLENBQUE7SUFFRCxzQ0FBNkMsQ0FBZTtRQUMxRCxNQUFNLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO0lBQzdCLENBQUM7SUFGRCx1RUFFQyxDQUFBOzs7Ozs7Ozs7O1lBN0REO2dCQUNFLGNBQW9CLE1BQVc7b0JBQVgsV0FBTSxHQUFOLE1BQU0sQ0FBSztnQkFBRyxDQUFDO2dCQUVuQyxzQkFBSSxzQkFBSTt5QkFBUixjQUFnQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFFeEMscUJBQU0sR0FBTixVQUFPLENBQUk7b0JBQ1QsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ25DLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDbkQsQ0FBQztnQkFFRCx1QkFBUSxHQUFSLFVBQVMsQ0FBSTtvQkFDWCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbkMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ3RGLENBQUM7Z0JBRUQseUJBQVUsR0FBVixVQUFXLENBQUk7b0JBQ2IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ25DLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQ3RGLENBQUM7Z0JBRUQseUJBQVUsR0FBVixVQUFXLENBQUk7b0JBQ2IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ25DLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQzdELENBQUM7Z0JBQ0gsV0FBQztZQUFELENBeEJBLEFBd0JDLElBQUE7WUF4QkQsdUJBd0JDLENBQUE7WUFFRDtnQkFDRSxvQkFBbUIsT0FBZSxFQUFTLFVBQW1DLEVBQzNELE1BQWM7b0JBRGQsWUFBTyxHQUFQLE9BQU8sQ0FBUTtvQkFBUyxlQUFVLEdBQVYsVUFBVSxDQUF5QjtvQkFDM0QsV0FBTSxHQUFOLE1BQU0sQ0FBUTtnQkFBRyxDQUFDO2dCQUN2QyxpQkFBQztZQUFELENBSEEsQUFHQyxJQUFBO1lBSEQsbUNBR0MsQ0FBQTtZQUVEO2dCQVVFLHNCQUFtQixXQUF5QixFQUFFLFVBQW1DLEVBQzlELE1BQWMsRUFBRSxJQUFVLEVBQUUsZ0JBQWtDO29CQUQ5RCxnQkFBVyxHQUFYLFdBQVcsQ0FBYztvQkFDekIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtvQkFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQztvQkFDMUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7Z0JBQ2hDLENBQUM7Z0JBRUQsK0JBQVEsR0FBUixVQUFTLEtBQWEsSUFBWSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRW5FLHNCQUFJLDhCQUFJO3lCQUFSLGNBQW1CLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUN6QyxtQkFBQztZQUFELENBcEJBLEFBb0JDLElBQUE7WUFwQkQsdUNBb0JDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2FsdF9yb3V0ZXIvc2VnbWVudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudEZhY3Rvcnl9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtTdHJpbmdNYXBXcmFwcGVyLCBMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7VHlwZSwgaXNCbGFua30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuZXhwb3J0IGNsYXNzIFRyZWU8VD4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9ub2RlczogVFtdKSB7fVxuXG4gIGdldCByb290KCk6IFQgeyByZXR1cm4gdGhpcy5fbm9kZXNbMF07IH1cblxuICBwYXJlbnQodDogVCk6IFQge1xuICAgIGxldCBpbmRleCA9IHRoaXMuX25vZGVzLmluZGV4T2YodCk7XG4gICAgcmV0dXJuIGluZGV4ID4gMCA/IHRoaXMuX25vZGVzW2luZGV4IC0gMV0gOiBudWxsO1xuICB9XG5cbiAgY2hpbGRyZW4odDogVCk6IFRbXSB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5fbm9kZXMuaW5kZXhPZih0KTtcbiAgICByZXR1cm4gaW5kZXggPiAtMSAmJiBpbmRleCA8IHRoaXMuX25vZGVzLmxlbmd0aCAtIDEgPyBbdGhpcy5fbm9kZXNbaW5kZXggKyAxXV0gOiBbXTtcbiAgfVxuXG4gIGZpcnN0Q2hpbGQodDogVCk6IFQge1xuICAgIGxldCBpbmRleCA9IHRoaXMuX25vZGVzLmluZGV4T2YodCk7XG4gICAgcmV0dXJuIGluZGV4ID4gLTEgJiYgaW5kZXggPCB0aGlzLl9ub2Rlcy5sZW5ndGggLSAxID8gdGhpcy5fbm9kZXNbaW5kZXggKyAxXSA6IG51bGw7XG4gIH1cblxuICBwYXRoVG9Sb290KHQ6IFQpOiBUW10ge1xuICAgIGxldCBpbmRleCA9IHRoaXMuX25vZGVzLmluZGV4T2YodCk7XG4gICAgcmV0dXJuIGluZGV4ID4gLTEgPyB0aGlzLl9ub2Rlcy5zbGljZSgwLCBpbmRleCArIDEpIDogbnVsbDtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVXJsU2VnbWVudCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzZWdtZW50OiBzdHJpbmcsIHB1YmxpYyBwYXJhbWV0ZXJzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSxcbiAgICAgICAgICAgICAgcHVibGljIG91dGxldDogc3RyaW5nKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgUm91dGVTZWdtZW50IHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfdHlwZTogVHlwZTtcblxuICAvKiogQGludGVybmFsICovXG4gIF9jb21wb25lbnRGYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5O1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3BhcmFtZXRlcnM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB1cmxTZWdtZW50czogVXJsU2VnbWVudFtdLCBwYXJhbWV0ZXJzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSxcbiAgICAgICAgICAgICAgcHVibGljIG91dGxldDogc3RyaW5nLCB0eXBlOiBUeXBlLCBjb21wb25lbnRGYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5KSB7XG4gICAgdGhpcy5fdHlwZSA9IHR5cGU7XG4gICAgdGhpcy5fY29tcG9uZW50RmFjdG9yeSA9IGNvbXBvbmVudEZhY3Rvcnk7XG4gICAgdGhpcy5fcGFyYW1ldGVycyA9IHBhcmFtZXRlcnM7XG4gIH1cblxuICBnZXRQYXJhbShwYXJhbTogc3RyaW5nKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3BhcmFtZXRlcnNbcGFyYW1dOyB9XG5cbiAgZ2V0IHR5cGUoKTogVHlwZSB7IHJldHVybiB0aGlzLl90eXBlOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlcXVhbFNlZ21lbnRzKGE6IFJvdXRlU2VnbWVudCwgYjogUm91dGVTZWdtZW50KTogYm9vbGVhbiB7XG4gIGlmIChpc0JsYW5rKGEpICYmICFpc0JsYW5rKGIpKSByZXR1cm4gZmFsc2U7XG4gIGlmICghaXNCbGFuayhhKSAmJiBpc0JsYW5rKGIpKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBhLl90eXBlID09PSBiLl90eXBlICYmIFN0cmluZ01hcFdyYXBwZXIuZXF1YWxzKGEuX3BhcmFtZXRlcnMsIGIuX3BhcmFtZXRlcnMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcm91dGVTZWdtZW50Q29tcG9uZW50RmFjdG9yeShhOiBSb3V0ZVNlZ21lbnQpOiBDb21wb25lbnRGYWN0b3J5IHtcbiAgcmV0dXJuIGEuX2NvbXBvbmVudEZhY3Rvcnk7XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
