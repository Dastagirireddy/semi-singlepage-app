System.register(['angular2/src/facade/async', 'angular2/src/facade/lang', '../../instruction'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var async_1, lang_1, instruction_1;
    var SyncRouteHandler;
    return {
        setters:[
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (instruction_1_1) {
                instruction_1 = instruction_1_1;
            }],
        execute: function() {
            SyncRouteHandler = (function () {
                function SyncRouteHandler(componentType, data) {
                    this.componentType = componentType;
                    /** @internal */
                    this._resolvedComponent = null;
                    this._resolvedComponent = async_1.PromiseWrapper.resolve(componentType);
                    this.data = lang_1.isPresent(data) ? new instruction_1.RouteData(data) : instruction_1.BLANK_ROUTE_DATA;
                }
                SyncRouteHandler.prototype.resolveComponentType = function () { return this._resolvedComponent; };
                return SyncRouteHandler;
            }());
            exports_1("SyncRouteHandler", SyncRouteHandler);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvcnVsZXMvcm91dGVfaGFuZGxlcnMvc3luY19yb3V0ZV9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBT0E7Z0JBTUUsMEJBQW1CLGFBQW1CLEVBQUUsSUFBMkI7b0JBQWhELGtCQUFhLEdBQWIsYUFBYSxDQUFNO29CQUh0QyxnQkFBZ0I7b0JBQ2hCLHVCQUFrQixHQUFpQixJQUFJLENBQUM7b0JBR3RDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxzQkFBYyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDaEUsSUFBSSxDQUFDLElBQUksR0FBRyxnQkFBUyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksdUJBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyw4QkFBZ0IsQ0FBQztnQkFDdkUsQ0FBQztnQkFFRCwrQ0FBb0IsR0FBcEIsY0FBdUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7Z0JBQzFFLHVCQUFDO1lBQUQsQ0FaQSxBQVlDLElBQUE7WUFaRCwrQ0FZQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvcnVsZXMvcm91dGVfaGFuZGxlcnMvc3luY19yb3V0ZV9oYW5kbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQcm9taXNlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5pbXBvcnQge2lzUHJlc2VudCwgVHlwZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuaW1wb3J0IHtSb3V0ZUhhbmRsZXJ9IGZyb20gJy4vcm91dGVfaGFuZGxlcic7XG5pbXBvcnQge1JvdXRlRGF0YSwgQkxBTktfUk9VVEVfREFUQX0gZnJvbSAnLi4vLi4vaW5zdHJ1Y3Rpb24nO1xuXG5cbmV4cG9ydCBjbGFzcyBTeW5jUm91dGVIYW5kbGVyIGltcGxlbWVudHMgUm91dGVIYW5kbGVyIHtcbiAgcHVibGljIGRhdGE6IFJvdXRlRGF0YTtcblxuICAvKiogQGludGVybmFsICovXG4gIF9yZXNvbHZlZENvbXBvbmVudDogUHJvbWlzZTxhbnk+ID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29tcG9uZW50VHlwZTogVHlwZSwgZGF0YT86IHtba2V5OiBzdHJpbmddOiBhbnl9KSB7XG4gICAgdGhpcy5fcmVzb2x2ZWRDb21wb25lbnQgPSBQcm9taXNlV3JhcHBlci5yZXNvbHZlKGNvbXBvbmVudFR5cGUpO1xuICAgIHRoaXMuZGF0YSA9IGlzUHJlc2VudChkYXRhKSA/IG5ldyBSb3V0ZURhdGEoZGF0YSkgOiBCTEFOS19ST1VURV9EQVRBO1xuICB9XG5cbiAgcmVzb2x2ZUNvbXBvbmVudFR5cGUoKTogUHJvbWlzZTxhbnk+IHsgcmV0dXJuIHRoaXMuX3Jlc29sdmVkQ29tcG9uZW50OyB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
