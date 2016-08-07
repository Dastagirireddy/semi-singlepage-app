System.register(['angular2/core', '../router', 'angular2/src/facade/lang'], function(exports_1, context_1) {
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
    var core_1, router_1, lang_1;
    var RouterOutlet;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            RouterOutlet = (function () {
                function RouterOutlet(parentOutletMap, _location) {
                    this._location = _location;
                    this.name = "";
                    parentOutletMap.registerOutlet("", this);
                }
                RouterOutlet.prototype.load = function (factory, providers, outletMap) {
                    if (lang_1.isPresent(this._loaded)) {
                        this._loaded.destroy();
                    }
                    this.outletMap = outletMap;
                    var inj = core_1.ReflectiveInjector.fromResolvedProviders(providers, this._location.parentInjector);
                    this._loaded = this._location.createComponent(factory, this._location.length, inj, []);
                    return this._loaded;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], RouterOutlet.prototype, "name", void 0);
                RouterOutlet = __decorate([
                    core_1.Directive({ selector: 'router-outlet' }), 
                    __metadata('design:paramtypes', [router_1.RouterOutletMap, core_1.ViewContainerRef])
                ], RouterOutlet);
                return RouterOutlet;
            }());
            exports_1("RouterOutlet", RouterOutlet);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9hbHRfcm91dGVyL2RpcmVjdGl2ZXMvcm91dGVyX291dGxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQWNBO2dCQUtFLHNCQUFZLGVBQWdDLEVBQVUsU0FBMkI7b0JBQTNCLGNBQVMsR0FBVCxTQUFTLENBQWtCO29CQUZ4RSxTQUFJLEdBQVcsRUFBRSxDQUFDO29CQUd6QixlQUFlLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDM0MsQ0FBQztnQkFFRCwyQkFBSSxHQUFKLFVBQUssT0FBeUIsRUFBRSxTQUF1QyxFQUNsRSxTQUEwQjtvQkFDN0IsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUN6QixDQUFDO29CQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO29CQUMzQixJQUFJLEdBQUcsR0FBRyx5QkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDN0YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUN2RixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDdEIsQ0FBQztnQkFmRDtvQkFBQyxZQUFLLEVBQUU7OzBEQUFBO2dCQUpWO29CQUFDLGdCQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUsZUFBZSxFQUFDLENBQUM7O2dDQUFBO2dCQW9CdkMsbUJBQUM7WUFBRCxDQW5CQSxBQW1CQyxJQUFBO1lBbkJELHVDQW1CQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9hbHRfcm91dGVyL2RpcmVjdGl2ZXMvcm91dGVyX291dGxldC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyLFxuICBEaXJlY3RpdmUsXG4gIER5bmFtaWNDb21wb25lbnRMb2FkZXIsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIElucHV0LFxuICBDb21wb25lbnRSZWYsXG4gIENvbXBvbmVudEZhY3RvcnksXG4gIFJlZmxlY3RpdmVJbmplY3RvclxufSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Um91dGVyT3V0bGV0TWFwfSBmcm9tICcuLi9yb3V0ZXInO1xuaW1wb3J0IHtpc1ByZXNlbnR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAncm91dGVyLW91dGxldCd9KVxuZXhwb3J0IGNsYXNzIFJvdXRlck91dGxldCB7XG4gIHByaXZhdGUgX2xvYWRlZDogQ29tcG9uZW50UmVmO1xuICBwdWJsaWMgb3V0bGV0TWFwOiBSb3V0ZXJPdXRsZXRNYXA7XG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZyA9IFwiXCI7XG5cbiAgY29uc3RydWN0b3IocGFyZW50T3V0bGV0TWFwOiBSb3V0ZXJPdXRsZXRNYXAsIHByaXZhdGUgX2xvY2F0aW9uOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgcGFyZW50T3V0bGV0TWFwLnJlZ2lzdGVyT3V0bGV0KFwiXCIsIHRoaXMpO1xuICB9XG5cbiAgbG9hZChmYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5LCBwcm92aWRlcnM6IFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyW10sXG4gICAgICAgb3V0bGV0TWFwOiBSb3V0ZXJPdXRsZXRNYXApOiBDb21wb25lbnRSZWYge1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fbG9hZGVkKSkge1xuICAgICAgdGhpcy5fbG9hZGVkLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgdGhpcy5vdXRsZXRNYXAgPSBvdXRsZXRNYXA7XG4gICAgbGV0IGluaiA9IFJlZmxlY3RpdmVJbmplY3Rvci5mcm9tUmVzb2x2ZWRQcm92aWRlcnMocHJvdmlkZXJzLCB0aGlzLl9sb2NhdGlvbi5wYXJlbnRJbmplY3Rvcik7XG4gICAgdGhpcy5fbG9hZGVkID0gdGhpcy5fbG9jYXRpb24uY3JlYXRlQ29tcG9uZW50KGZhY3RvcnksIHRoaXMuX2xvY2F0aW9uLmxlbmd0aCwgaW5qLCBbXSk7XG4gICAgcmV0dXJuIHRoaXMuX2xvYWRlZDtcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
