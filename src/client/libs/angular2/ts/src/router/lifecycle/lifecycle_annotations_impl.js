System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
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
    var RouteLifecycleHook, CanActivate, routerCanReuse, routerCanDeactivate, routerOnActivate, routerOnReuse, routerOnDeactivate;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            RouteLifecycleHook = (function () {
                function RouteLifecycleHook(name) {
                    this.name = name;
                }
                RouteLifecycleHook = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [String])
                ], RouteLifecycleHook);
                return RouteLifecycleHook;
            }());
            exports_1("RouteLifecycleHook", RouteLifecycleHook);
            CanActivate = (function () {
                function CanActivate(fn) {
                    this.fn = fn;
                }
                CanActivate = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [Function])
                ], CanActivate);
                return CanActivate;
            }());
            exports_1("CanActivate", CanActivate);
            exports_1("routerCanReuse", routerCanReuse = lang_1.CONST_EXPR(new RouteLifecycleHook("routerCanReuse")));
            exports_1("routerCanDeactivate", routerCanDeactivate = lang_1.CONST_EXPR(new RouteLifecycleHook("routerCanDeactivate")));
            exports_1("routerOnActivate", routerOnActivate = lang_1.CONST_EXPR(new RouteLifecycleHook("routerOnActivate")));
            exports_1("routerOnReuse", routerOnReuse = lang_1.CONST_EXPR(new RouteLifecycleHook("routerOnReuse")));
            exports_1("routerOnDeactivate", routerOnDeactivate = lang_1.CONST_EXPR(new RouteLifecycleHook("routerOnDeactivate")));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9saWZlY3ljbGUvbGlmZWN5Y2xlX2Fubm90YXRpb25zX2ltcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozt5Q0FZYSxjQUFjLEVBRWQsbUJBQW1CLEVBRW5CLGdCQUFnQixFQUVoQixhQUFhLEVBRWIsa0JBQWtCOzs7Ozs7O1lBakIvQjtnQkFDRSw0QkFBbUIsSUFBWTtvQkFBWixTQUFJLEdBQUosSUFBSSxDQUFRO2dCQUFHLENBQUM7Z0JBRnJDO29CQUFDLFlBQUssRUFBRTs7c0NBQUE7Z0JBR1IseUJBQUM7WUFBRCxDQUZBLEFBRUMsSUFBQTtZQUZELG1EQUVDLENBQUE7WUFHRDtnQkFDRSxxQkFBbUIsRUFBWTtvQkFBWixPQUFFLEdBQUYsRUFBRSxDQUFVO2dCQUFHLENBQUM7Z0JBRnJDO29CQUFDLFlBQUssRUFBRTs7K0JBQUE7Z0JBR1Isa0JBQUM7WUFBRCxDQUZBLEFBRUMsSUFBQTtZQUZELHFDQUVDLENBQUE7WUFFWSw0QkFBQSxjQUFjLEdBQ3ZCLGlCQUFVLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUEsQ0FBQztZQUM1QyxpQ0FBQSxtQkFBbUIsR0FDNUIsaUJBQVUsQ0FBQyxJQUFJLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQSxDQUFDO1lBQ2pELDhCQUFBLGdCQUFnQixHQUN6QixpQkFBVSxDQUFDLElBQUksa0JBQWtCLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFDOUMsMkJBQUEsYUFBYSxHQUN0QixpQkFBVSxDQUFDLElBQUksa0JBQWtCLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQSxDQUFDO1lBQzNDLGdDQUFBLGtCQUFrQixHQUMzQixpQkFBVSxDQUFDLElBQUksa0JBQWtCLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFBLENBQUMiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvcm91dGVyL2xpZmVjeWNsZS9saWZlY3ljbGVfYW5ub3RhdGlvbnNfaW1wbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q09OU1QsIENPTlNUX0VYUFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbkBDT05TVCgpXG5leHBvcnQgY2xhc3MgUm91dGVMaWZlY3ljbGVIb29rIHtcbiAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge31cbn1cblxuQENPTlNUKClcbmV4cG9ydCBjbGFzcyBDYW5BY3RpdmF0ZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBmbjogRnVuY3Rpb24pIHt9XG59XG5cbmV4cG9ydCBjb25zdCByb3V0ZXJDYW5SZXVzZTogUm91dGVMaWZlY3ljbGVIb29rID1cbiAgICBDT05TVF9FWFBSKG5ldyBSb3V0ZUxpZmVjeWNsZUhvb2soXCJyb3V0ZXJDYW5SZXVzZVwiKSk7XG5leHBvcnQgY29uc3Qgcm91dGVyQ2FuRGVhY3RpdmF0ZTogUm91dGVMaWZlY3ljbGVIb29rID1cbiAgICBDT05TVF9FWFBSKG5ldyBSb3V0ZUxpZmVjeWNsZUhvb2soXCJyb3V0ZXJDYW5EZWFjdGl2YXRlXCIpKTtcbmV4cG9ydCBjb25zdCByb3V0ZXJPbkFjdGl2YXRlOiBSb3V0ZUxpZmVjeWNsZUhvb2sgPVxuICAgIENPTlNUX0VYUFIobmV3IFJvdXRlTGlmZWN5Y2xlSG9vayhcInJvdXRlck9uQWN0aXZhdGVcIikpO1xuZXhwb3J0IGNvbnN0IHJvdXRlck9uUmV1c2U6IFJvdXRlTGlmZWN5Y2xlSG9vayA9XG4gICAgQ09OU1RfRVhQUihuZXcgUm91dGVMaWZlY3ljbGVIb29rKFwicm91dGVyT25SZXVzZVwiKSk7XG5leHBvcnQgY29uc3Qgcm91dGVyT25EZWFjdGl2YXRlOiBSb3V0ZUxpZmVjeWNsZUhvb2sgPVxuICAgIENPTlNUX0VYUFIobmV3IFJvdXRlTGlmZWN5Y2xlSG9vayhcInJvdXRlck9uRGVhY3RpdmF0ZVwiKSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
