System.register(["angular2/src/facade/lang"], function(exports_1, context_1) {
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
    var lang_1;
    var RouteMetadata, Route, RoutesMetadata;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            RouteMetadata = (function () {
                function RouteMetadata() {
                }
                Object.defineProperty(RouteMetadata.prototype, "path", {
                    get: function () { },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RouteMetadata.prototype, "component", {
                    get: function () { },
                    enumerable: true,
                    configurable: true
                });
                return RouteMetadata;
            }());
            exports_1("RouteMetadata", RouteMetadata);
            Route = (function () {
                function Route(_a) {
                    var _b = _a === void 0 ? {} : _a, path = _b.path, component = _b.component;
                    this.path = path;
                    this.component = component;
                }
                Route.prototype.toString = function () { return "@Route(" + this.path + ", " + lang_1.stringify(this.component) + ")"; };
                Route = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [Object])
                ], Route);
                return Route;
            }());
            exports_1("Route", Route);
            RoutesMetadata = (function () {
                function RoutesMetadata(routes) {
                    this.routes = routes;
                }
                RoutesMetadata.prototype.toString = function () { return "@Routes(" + this.routes + ")"; };
                RoutesMetadata = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [Array])
                ], RoutesMetadata);
                return RoutesMetadata;
            }());
            exports_1("RoutesMetadata", RoutesMetadata);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9hbHRfcm91dGVyL21ldGFkYXRhL21ldGFkYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBRUE7Z0JBQUE7Z0JBR0EsQ0FBQztnQkFGQyxzQkFBYSwrQkFBSTt5QkFBakIsZUFBNEI7OzttQkFBQTtnQkFDNUIsc0JBQWEsb0NBQVM7eUJBQXRCLGVBQStCOzs7bUJBQUE7Z0JBQ2pDLG9CQUFDO1lBQUQsQ0FIQSxBQUdDLElBQUE7WUFIRCx5Q0FHQyxDQUFBO1lBR0Q7Z0JBR0UsZUFBWSxFQUF5RDt3QkFBekQsNEJBQXlELEVBQXhELGNBQUksRUFBRSx3QkFBUztvQkFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO2dCQUM3QixDQUFDO2dCQUNELHdCQUFRLEdBQVIsY0FBcUIsTUFBTSxDQUFDLFlBQVUsSUFBSSxDQUFDLElBQUksVUFBSyxnQkFBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBRyxDQUFDLENBQUMsQ0FBQztnQkFSckY7b0JBQUMsWUFBSyxFQUFFOzt5QkFBQTtnQkFTUixZQUFDO1lBQUQsQ0FSQSxBQVFDLElBQUE7WUFSRCx5QkFRQyxDQUFBO1lBR0Q7Z0JBQ0Usd0JBQW1CLE1BQXVCO29CQUF2QixXQUFNLEdBQU4sTUFBTSxDQUFpQjtnQkFBRyxDQUFDO2dCQUM5QyxpQ0FBUSxHQUFSLGNBQXFCLE1BQU0sQ0FBQyxhQUFXLElBQUksQ0FBQyxNQUFNLE1BQUcsQ0FBQyxDQUFDLENBQUM7Z0JBSDFEO29CQUFDLFlBQUssRUFBRTs7a0NBQUE7Z0JBSVIscUJBQUM7WUFBRCxDQUhBLEFBR0MsSUFBQTtZQUhELDJDQUdDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2FsdF9yb3V0ZXIvbWV0YWRhdGEvbWV0YWRhdGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NPTlNULCBUeXBlLCBzdHJpbmdpZnl9IGZyb20gXCJhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmdcIjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJvdXRlTWV0YWRhdGEge1xuICBhYnN0cmFjdCBnZXQgcGF0aCgpOiBzdHJpbmc7XG4gIGFic3RyYWN0IGdldCBjb21wb25lbnQoKTogVHlwZTtcbn1cblxuQENPTlNUKClcbmV4cG9ydCBjbGFzcyBSb3V0ZSBpbXBsZW1lbnRzIFJvdXRlTWV0YWRhdGEge1xuICBwYXRoOiBzdHJpbmc7XG4gIGNvbXBvbmVudDogVHlwZTtcbiAgY29uc3RydWN0b3Ioe3BhdGgsIGNvbXBvbmVudH06IHtwYXRoPzogc3RyaW5nLCBjb21wb25lbnQ/OiBUeXBlfSA9IHt9KSB7XG4gICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICB0aGlzLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcbiAgfVxuICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gYEBSb3V0ZSgke3RoaXMucGF0aH0sICR7c3RyaW5naWZ5KHRoaXMuY29tcG9uZW50KX0pYDsgfVxufVxuXG5AQ09OU1QoKVxuZXhwb3J0IGNsYXNzIFJvdXRlc01ldGFkYXRhIHtcbiAgY29uc3RydWN0b3IocHVibGljIHJvdXRlczogUm91dGVNZXRhZGF0YVtdKSB7fVxuICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gYEBSb3V0ZXMoJHt0aGlzLnJvdXRlc30pYDsgfVxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
