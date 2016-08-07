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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvbGlmZWN5Y2xlL2xpZmVjeWNsZV9hbm5vdGF0aW9uc19pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7eUNBWWEsY0FBYyxFQUVkLG1CQUFtQixFQUVuQixnQkFBZ0IsRUFFaEIsYUFBYSxFQUViLGtCQUFrQjs7Ozs7OztZQWpCL0I7Z0JBQ0UsNEJBQW1CLElBQVk7b0JBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtnQkFBRyxDQUFDO2dCQUZyQztvQkFBQyxZQUFLLEVBQUU7O3NDQUFBO2dCQUdSLHlCQUFDO1lBQUQsQ0FGQSxBQUVDLElBQUE7WUFGRCxtREFFQyxDQUFBO1lBR0Q7Z0JBQ0UscUJBQW1CLEVBQVk7b0JBQVosT0FBRSxHQUFGLEVBQUUsQ0FBVTtnQkFBRyxDQUFDO2dCQUZyQztvQkFBQyxZQUFLLEVBQUU7OytCQUFBO2dCQUdSLGtCQUFDO1lBQUQsQ0FGQSxBQUVDLElBQUE7WUFGRCxxQ0FFQyxDQUFBO1lBRVksNEJBQUEsY0FBYyxHQUN2QixpQkFBVSxDQUFDLElBQUksa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFDNUMsaUNBQUEsbUJBQW1CLEdBQzVCLGlCQUFVLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUEsQ0FBQztZQUNqRCw4QkFBQSxnQkFBZ0IsR0FDekIsaUJBQVUsQ0FBQyxJQUFJLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQSxDQUFDO1lBQzlDLDJCQUFBLGFBQWEsR0FDdEIsaUJBQVUsQ0FBQyxJQUFJLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUEsQ0FBQztZQUMzQyxnQ0FBQSxrQkFBa0IsR0FDM0IsaUJBQVUsQ0FBQyxJQUFJLGtCQUFrQixDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQSxDQUFDIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvbGlmZWN5Y2xlL2xpZmVjeWNsZV9hbm5vdGF0aW9uc19pbXBsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDT05TVCwgQ09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuQENPTlNUKClcbmV4cG9ydCBjbGFzcyBSb3V0ZUxpZmVjeWNsZUhvb2sge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7fVxufVxuXG5AQ09OU1QoKVxuZXhwb3J0IGNsYXNzIENhbkFjdGl2YXRlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGZuOiBGdW5jdGlvbikge31cbn1cblxuZXhwb3J0IGNvbnN0IHJvdXRlckNhblJldXNlOiBSb3V0ZUxpZmVjeWNsZUhvb2sgPVxuICAgIENPTlNUX0VYUFIobmV3IFJvdXRlTGlmZWN5Y2xlSG9vayhcInJvdXRlckNhblJldXNlXCIpKTtcbmV4cG9ydCBjb25zdCByb3V0ZXJDYW5EZWFjdGl2YXRlOiBSb3V0ZUxpZmVjeWNsZUhvb2sgPVxuICAgIENPTlNUX0VYUFIobmV3IFJvdXRlTGlmZWN5Y2xlSG9vayhcInJvdXRlckNhbkRlYWN0aXZhdGVcIikpO1xuZXhwb3J0IGNvbnN0IHJvdXRlck9uQWN0aXZhdGU6IFJvdXRlTGlmZWN5Y2xlSG9vayA9XG4gICAgQ09OU1RfRVhQUihuZXcgUm91dGVMaWZlY3ljbGVIb29rKFwicm91dGVyT25BY3RpdmF0ZVwiKSk7XG5leHBvcnQgY29uc3Qgcm91dGVyT25SZXVzZTogUm91dGVMaWZlY3ljbGVIb29rID1cbiAgICBDT05TVF9FWFBSKG5ldyBSb3V0ZUxpZmVjeWNsZUhvb2soXCJyb3V0ZXJPblJldXNlXCIpKTtcbmV4cG9ydCBjb25zdCByb3V0ZXJPbkRlYWN0aXZhdGU6IFJvdXRlTGlmZWN5Y2xlSG9vayA9XG4gICAgQ09OU1RfRVhQUihuZXcgUm91dGVMaWZlY3ljbGVIb29rKFwicm91dGVyT25EZWFjdGl2YXRlXCIpKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
