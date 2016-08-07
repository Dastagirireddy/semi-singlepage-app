System.register(['./hammer_common', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var hammer_common_1, lang_1, exceptions_1, core_1;
    var HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerGesturesPlugin;
    return {
        setters:[
            function (hammer_common_1_1) {
                hammer_common_1 = hammer_common_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            exports_1("HAMMER_GESTURE_CONFIG", HAMMER_GESTURE_CONFIG = lang_1.CONST_EXPR(new core_1.OpaqueToken("HammerGestureConfig")));
            HammerGestureConfig = (function () {
                function HammerGestureConfig() {
                    this.events = [];
                    this.overrides = {};
                }
                HammerGestureConfig.prototype.buildHammer = function (element) {
                    var mc = new Hammer(element);
                    mc.get('pinch').set({ enable: true });
                    mc.get('rotate').set({ enable: true });
                    for (var eventName in this.overrides) {
                        mc.get(eventName).set(this.overrides[eventName]);
                    }
                    return mc;
                };
                HammerGestureConfig = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], HammerGestureConfig);
                return HammerGestureConfig;
            }());
            exports_1("HammerGestureConfig", HammerGestureConfig);
            HammerGesturesPlugin = (function (_super) {
                __extends(HammerGesturesPlugin, _super);
                function HammerGesturesPlugin(_config) {
                    _super.call(this);
                    this._config = _config;
                }
                HammerGesturesPlugin.prototype.supports = function (eventName) {
                    if (!_super.prototype.supports.call(this, eventName) && !this.isCustomEvent(eventName))
                        return false;
                    if (!lang_1.isPresent(window['Hammer'])) {
                        throw new exceptions_1.BaseException("Hammer.js is not loaded, can not bind " + eventName + " event");
                    }
                    return true;
                };
                HammerGesturesPlugin.prototype.addEventListener = function (element, eventName, handler) {
                    var _this = this;
                    var zone = this.manager.getZone();
                    eventName = eventName.toLowerCase();
                    return zone.runOutsideAngular(function () {
                        // Creating the manager bind events, must be done outside of angular
                        var mc = _this._config.buildHammer(element);
                        var callback = function (eventObj) { zone.runGuarded(function () { handler(eventObj); }); };
                        mc.on(eventName, callback);
                        return function () { mc.off(eventName, callback); };
                    });
                };
                HammerGesturesPlugin.prototype.isCustomEvent = function (eventName) { return this._config.events.indexOf(eventName) > -1; };
                HammerGesturesPlugin = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject(HAMMER_GESTURE_CONFIG)), 
                    __metadata('design:paramtypes', [HammerGestureConfig])
                ], HammerGesturesPlugin);
                return HammerGesturesPlugin;
            }(hammer_common_1.HammerGesturesPluginCommon));
            exports_1("HammerGesturesPlugin", HammerGesturesPlugin);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9kb20vZXZlbnRzL2hhbW1lcl9nZXN0dXJlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFLYSxxQkFBcUI7Ozs7Ozs7Ozs7Ozs7Ozs7WUFBckIsbUNBQUEscUJBQXFCLEdBQzlCLGlCQUFVLENBQUMsSUFBSSxrQkFBVyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQSxDQUFDO1lBUXZEO2dCQUFBO29CQUNFLFdBQU0sR0FBYSxFQUFFLENBQUM7b0JBRXRCLGNBQVMsR0FBNEIsRUFBRSxDQUFDO2dCQWMxQyxDQUFDO2dCQVpDLHlDQUFXLEdBQVgsVUFBWSxPQUFvQjtvQkFDOUIsSUFBSSxFQUFFLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBRTdCLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7b0JBQ3BDLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7b0JBRXJDLEdBQUcsQ0FBQyxDQUFDLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO3dCQUNyQyxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ25ELENBQUM7b0JBRUQsTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDWixDQUFDO2dCQWpCSDtvQkFBQyxpQkFBVSxFQUFFOzt1Q0FBQTtnQkFrQmIsMEJBQUM7WUFBRCxDQWpCQSxBQWlCQyxJQUFBO1lBakJELHFEQWlCQyxDQUFBO1lBR0Q7Z0JBQTBDLHdDQUEwQjtnQkFDbEUsOEJBQW1ELE9BQTRCO29CQUFJLGlCQUFPLENBQUM7b0JBQXhDLFlBQU8sR0FBUCxPQUFPLENBQXFCO2dCQUFhLENBQUM7Z0JBRTdGLHVDQUFRLEdBQVIsVUFBUyxTQUFpQjtvQkFDeEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBSyxDQUFDLFFBQVEsWUFBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztvQkFFL0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDakMsTUFBTSxJQUFJLDBCQUFhLENBQUMsMkNBQXlDLFNBQVMsV0FBUSxDQUFDLENBQUM7b0JBQ3RGLENBQUM7b0JBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDZCxDQUFDO2dCQUVELCtDQUFnQixHQUFoQixVQUFpQixPQUFvQixFQUFFLFNBQWlCLEVBQUUsT0FBaUI7b0JBQTNFLGlCQVdDO29CQVZDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ2xDLFNBQVMsR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBRXBDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7d0JBQzVCLG9FQUFvRTt3QkFDcEUsSUFBSSxFQUFFLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQzNDLElBQUksUUFBUSxHQUFHLFVBQVMsUUFBUSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUYsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7d0JBQzNCLE1BQU0sQ0FBQyxjQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoRCxDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDO2dCQUVELDRDQUFhLEdBQWIsVUFBYyxTQUFpQixJQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQTNCbkc7b0JBQUMsaUJBQVUsRUFBRTsrQkFFRSxhQUFNLENBQUMscUJBQXFCLENBQUM7O3dDQUYvQjtnQkE0QmIsMkJBQUM7WUFBRCxDQTNCQSxBQTJCQyxDQTNCeUMsMENBQTBCLEdBMkJuRTtZQTNCRCx1REEyQkMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvcGxhdGZvcm0vZG9tL2V2ZW50cy9oYW1tZXJfZ2VzdHVyZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0hhbW1lckdlc3R1cmVzUGx1Z2luQ29tbW9ufSBmcm9tICcuL2hhbW1lcl9jb21tb24nO1xuaW1wb3J0IHtpc1ByZXNlbnQsIENPTlNUX0VYUFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb24sIFdyYXBwZWRFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge0luamVjdGFibGUsIEluamVjdCwgT3BhcXVlVG9rZW59IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuXG5leHBvcnQgY29uc3QgSEFNTUVSX0dFU1RVUkVfQ09ORklHOiBPcGFxdWVUb2tlbiA9XG4gICAgQ09OU1RfRVhQUihuZXcgT3BhcXVlVG9rZW4oXCJIYW1tZXJHZXN0dXJlQ29uZmlnXCIpKTtcblxuZXhwb3J0IGludGVyZmFjZSBIYW1tZXJJbnN0YW5jZSB7XG4gIG9uKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkO1xuICBvZmYoZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQ7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIYW1tZXJHZXN0dXJlQ29uZmlnIHtcbiAgZXZlbnRzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIG92ZXJyaWRlczoge1trZXk6IHN0cmluZ106IE9iamVjdH0gPSB7fTtcblxuICBidWlsZEhhbW1lcihlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhhbW1lckluc3RhbmNlIHtcbiAgICB2YXIgbWMgPSBuZXcgSGFtbWVyKGVsZW1lbnQpO1xuXG4gICAgbWMuZ2V0KCdwaW5jaCcpLnNldCh7ZW5hYmxlOiB0cnVlfSk7XG4gICAgbWMuZ2V0KCdyb3RhdGUnKS5zZXQoe2VuYWJsZTogdHJ1ZX0pO1xuXG4gICAgZm9yIChsZXQgZXZlbnROYW1lIGluIHRoaXMub3ZlcnJpZGVzKSB7XG4gICAgICBtYy5nZXQoZXZlbnROYW1lKS5zZXQodGhpcy5vdmVycmlkZXNbZXZlbnROYW1lXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1jO1xuICB9XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIYW1tZXJHZXN0dXJlc1BsdWdpbiBleHRlbmRzIEhhbW1lckdlc3R1cmVzUGx1Z2luQ29tbW9uIHtcbiAgY29uc3RydWN0b3IoQEluamVjdChIQU1NRVJfR0VTVFVSRV9DT05GSUcpIHByaXZhdGUgX2NvbmZpZzogSGFtbWVyR2VzdHVyZUNvbmZpZykgeyBzdXBlcigpOyB9XG5cbiAgc3VwcG9ydHMoZXZlbnROYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAoIXN1cGVyLnN1cHBvcnRzKGV2ZW50TmFtZSkgJiYgIXRoaXMuaXNDdXN0b21FdmVudChldmVudE5hbWUpKSByZXR1cm4gZmFsc2U7XG5cbiAgICBpZiAoIWlzUHJlc2VudCh3aW5kb3dbJ0hhbW1lciddKSkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYEhhbW1lci5qcyBpcyBub3QgbG9hZGVkLCBjYW4gbm90IGJpbmQgJHtldmVudE5hbWV9IGV2ZW50YCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgdmFyIHpvbmUgPSB0aGlzLm1hbmFnZXIuZ2V0Wm9uZSgpO1xuICAgIGV2ZW50TmFtZSA9IGV2ZW50TmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgcmV0dXJuIHpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgLy8gQ3JlYXRpbmcgdGhlIG1hbmFnZXIgYmluZCBldmVudHMsIG11c3QgYmUgZG9uZSBvdXRzaWRlIG9mIGFuZ3VsYXJcbiAgICAgIHZhciBtYyA9IHRoaXMuX2NvbmZpZy5idWlsZEhhbW1lcihlbGVtZW50KTtcbiAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKGV2ZW50T2JqKSB7IHpvbmUucnVuR3VhcmRlZChmdW5jdGlvbigpIHsgaGFuZGxlcihldmVudE9iaik7IH0pOyB9O1xuICAgICAgbWMub24oZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gICAgICByZXR1cm4gKCkgPT4geyBtYy5vZmYoZXZlbnROYW1lLCBjYWxsYmFjayk7IH07XG4gICAgfSk7XG4gIH1cblxuICBpc0N1c3RvbUV2ZW50KGV2ZW50TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9jb25maWcuZXZlbnRzLmluZGV4T2YoZXZlbnROYW1lKSA+IC0xOyB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
