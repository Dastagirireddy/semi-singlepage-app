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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9ydWxlcy9yb3V0ZV9oYW5kbGVycy9zeW5jX3JvdXRlX2hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFPQTtnQkFNRSwwQkFBbUIsYUFBbUIsRUFBRSxJQUEyQjtvQkFBaEQsa0JBQWEsR0FBYixhQUFhLENBQU07b0JBSHRDLGdCQUFnQjtvQkFDaEIsdUJBQWtCLEdBQWlCLElBQUksQ0FBQztvQkFHdEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLHNCQUFjLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUNoRSxJQUFJLENBQUMsSUFBSSxHQUFHLGdCQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSx1QkFBUyxDQUFDLElBQUksQ0FBQyxHQUFHLDhCQUFnQixDQUFDO2dCQUN2RSxDQUFDO2dCQUVELCtDQUFvQixHQUFwQixjQUF1QyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztnQkFDMUUsdUJBQUM7WUFBRCxDQVpBLEFBWUMsSUFBQTtZQVpELCtDQVlDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvcm91dGVyL3J1bGVzL3JvdXRlX2hhbmRsZXJzL3N5bmNfcm91dGVfaGFuZGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UHJvbWlzZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYXN5bmMnO1xuaW1wb3J0IHtpc1ByZXNlbnQsIFR5cGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbmltcG9ydCB7Um91dGVIYW5kbGVyfSBmcm9tICcuL3JvdXRlX2hhbmRsZXInO1xuaW1wb3J0IHtSb3V0ZURhdGEsIEJMQU5LX1JPVVRFX0RBVEF9IGZyb20gJy4uLy4uL2luc3RydWN0aW9uJztcblxuXG5leHBvcnQgY2xhc3MgU3luY1JvdXRlSGFuZGxlciBpbXBsZW1lbnRzIFJvdXRlSGFuZGxlciB7XG4gIHB1YmxpYyBkYXRhOiBSb3V0ZURhdGE7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcmVzb2x2ZWRDb21wb25lbnQ6IFByb21pc2U8YW55PiA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGNvbXBvbmVudFR5cGU6IFR5cGUsIGRhdGE/OiB7W2tleTogc3RyaW5nXTogYW55fSkge1xuICAgIHRoaXMuX3Jlc29sdmVkQ29tcG9uZW50ID0gUHJvbWlzZVdyYXBwZXIucmVzb2x2ZShjb21wb25lbnRUeXBlKTtcbiAgICB0aGlzLmRhdGEgPSBpc1ByZXNlbnQoZGF0YSkgPyBuZXcgUm91dGVEYXRhKGRhdGEpIDogQkxBTktfUk9VVEVfREFUQTtcbiAgfVxuXG4gIHJlc29sdmVDb21wb25lbnRUeXBlKCk6IFByb21pc2U8YW55PiB7IHJldHVybiB0aGlzLl9yZXNvbHZlZENvbXBvbmVudDsgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
