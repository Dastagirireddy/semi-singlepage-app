System.register(['angular2/src/facade/lang', '../../instruction'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, instruction_1;
    var AsyncRouteHandler;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (instruction_1_1) {
                instruction_1 = instruction_1_1;
            }],
        execute: function() {
            AsyncRouteHandler = (function () {
                function AsyncRouteHandler(_loader, data) {
                    if (data === void 0) { data = null; }
                    this._loader = _loader;
                    /** @internal */
                    this._resolvedComponent = null;
                    this.data = lang_1.isPresent(data) ? new instruction_1.RouteData(data) : instruction_1.BLANK_ROUTE_DATA;
                }
                AsyncRouteHandler.prototype.resolveComponentType = function () {
                    var _this = this;
                    if (lang_1.isPresent(this._resolvedComponent)) {
                        return this._resolvedComponent;
                    }
                    return this._resolvedComponent = this._loader().then(function (componentType) {
                        _this.componentType = componentType;
                        return componentType;
                    });
                };
                return AsyncRouteHandler;
            }());
            exports_1("AsyncRouteHandler", AsyncRouteHandler);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9ydWxlcy9yb3V0ZV9oYW5kbGVycy9hc3luY19yb3V0ZV9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O1lBTUE7Z0JBTUUsMkJBQW9CLE9BQTRCLEVBQUUsSUFBaUM7b0JBQWpDLG9CQUFpQyxHQUFqQyxXQUFpQztvQkFBL0QsWUFBTyxHQUFQLE9BQU8sQ0FBcUI7b0JBTGhELGdCQUFnQjtvQkFDaEIsdUJBQWtCLEdBQWtCLElBQUksQ0FBQztvQkFLdkMsSUFBSSxDQUFDLElBQUksR0FBRyxnQkFBUyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksdUJBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyw4QkFBZ0IsQ0FBQztnQkFDdkUsQ0FBQztnQkFFRCxnREFBb0IsR0FBcEI7b0JBQUEsaUJBU0M7b0JBUkMsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3ZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUM7b0JBQ2pDLENBQUM7b0JBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsYUFBYTt3QkFDakUsS0FBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7d0JBQ25DLE1BQU0sQ0FBQyxhQUFhLENBQUM7b0JBQ3ZCLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUM7Z0JBQ0gsd0JBQUM7WUFBRCxDQXBCQSxBQW9CQyxJQUFBO1lBcEJELGlEQW9CQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9ydWxlcy9yb3V0ZV9oYW5kbGVycy9hc3luY19yb3V0ZV9oYW5kbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc1ByZXNlbnQsIFR5cGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbmltcG9ydCB7Um91dGVIYW5kbGVyfSBmcm9tICcuL3JvdXRlX2hhbmRsZXInO1xuaW1wb3J0IHtSb3V0ZURhdGEsIEJMQU5LX1JPVVRFX0RBVEF9IGZyb20gJy4uLy4uL2luc3RydWN0aW9uJztcblxuXG5leHBvcnQgY2xhc3MgQXN5bmNSb3V0ZUhhbmRsZXIgaW1wbGVtZW50cyBSb3V0ZUhhbmRsZXIge1xuICAvKiogQGludGVybmFsICovXG4gIF9yZXNvbHZlZENvbXBvbmVudDogUHJvbWlzZTxUeXBlPiA9IG51bGw7XG4gIGNvbXBvbmVudFR5cGU6IFR5cGU7XG4gIHB1YmxpYyBkYXRhOiBSb3V0ZURhdGE7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbG9hZGVyOiAoKSA9PiBQcm9taXNlPFR5cGU+LCBkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSA9IG51bGwpIHtcbiAgICB0aGlzLmRhdGEgPSBpc1ByZXNlbnQoZGF0YSkgPyBuZXcgUm91dGVEYXRhKGRhdGEpIDogQkxBTktfUk9VVEVfREFUQTtcbiAgfVxuXG4gIHJlc29sdmVDb21wb25lbnRUeXBlKCk6IFByb21pc2U8VHlwZT4ge1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fcmVzb2x2ZWRDb21wb25lbnQpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVzb2x2ZWRDb21wb25lbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3Jlc29sdmVkQ29tcG9uZW50ID0gdGhpcy5fbG9hZGVyKCkudGhlbigoY29tcG9uZW50VHlwZSkgPT4ge1xuICAgICAgdGhpcy5jb21wb25lbnRUeXBlID0gY29tcG9uZW50VHlwZTtcbiAgICAgIHJldHVybiBjb21wb25lbnRUeXBlO1xuICAgIH0pO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
