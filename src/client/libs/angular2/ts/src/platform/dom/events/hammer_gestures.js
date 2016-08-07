System.register(['./hammer_common', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/core/di'], function(exports_1, context_1) {
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
    var hammer_common_1, lang_1, exceptions_1, di_1;
    var HammerGesturesPlugin;
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
            function (di_1_1) {
                di_1 = di_1_1;
            }],
        execute: function() {
            HammerGesturesPlugin = (function (_super) {
                __extends(HammerGesturesPlugin, _super);
                function HammerGesturesPlugin() {
                    _super.apply(this, arguments);
                }
                HammerGesturesPlugin.prototype.supports = function (eventName) {
                    if (!_super.prototype.supports.call(this, eventName))
                        return false;
                    if (!lang_1.isPresent(window['Hammer'])) {
                        throw new exceptions_1.BaseException("Hammer.js is not loaded, can not bind " + eventName + " event");
                    }
                    return true;
                };
                HammerGesturesPlugin.prototype.addEventListener = function (element, eventName, handler) {
                    var zone = this.manager.getZone();
                    eventName = eventName.toLowerCase();
                    return zone.runOutsideAngular(function () {
                        // Creating the manager bind events, must be done outside of angular
                        var mc = new Hammer(element);
                        mc.get('pinch').set({ enable: true });
                        mc.get('rotate').set({ enable: true });
                        var callback = function (eventObj) { zone.run(function () { handler(eventObj); }); };
                        mc.on(eventName, callback);
                        return function () { mc.off(eventName, callback); };
                    });
                };
                HammerGesturesPlugin = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], HammerGesturesPlugin);
                return HammerGesturesPlugin;
            }(hammer_common_1.HammerGesturesPluginCommon));
            exports_1("HammerGesturesPlugin", HammerGesturesPlugin);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL2RvbS9ldmVudHMvaGFtbWVyX2dlc3R1cmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFNQTtnQkFBMEMsd0NBQTBCO2dCQUFwRTtvQkFBMEMsOEJBQTBCO2dCQXlCcEUsQ0FBQztnQkF4QkMsdUNBQVEsR0FBUixVQUFTLFNBQWlCO29CQUN4QixFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFLLENBQUMsUUFBUSxZQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7b0JBRTdDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2pDLE1BQU0sSUFBSSwwQkFBYSxDQUFDLDJDQUF5QyxTQUFTLFdBQVEsQ0FBQyxDQUFDO29CQUN0RixDQUFDO29CQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQztnQkFFRCwrQ0FBZ0IsR0FBaEIsVUFBaUIsT0FBb0IsRUFBRSxTQUFpQixFQUFFLE9BQWlCO29CQUN6RSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNsQyxTQUFTLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUVwQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO3dCQUM1QixvRUFBb0U7d0JBQ3BFLElBQUksRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUM3QixFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO3dCQUNwQyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO3dCQUNyQyxJQUFJLFFBQVEsR0FBRyxVQUFTLFFBQVEsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ25GLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO3dCQUMzQixNQUFNLENBQUMsY0FBUSxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDaEQsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQztnQkF6Qkg7b0JBQUMsZUFBVSxFQUFFOzt3Q0FBQTtnQkEwQmIsMkJBQUM7WUFBRCxDQXpCQSxBQXlCQyxDQXpCeUMsMENBQTBCLEdBeUJuRTtZQXpCRCx1REF5QkMsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9kb20vZXZlbnRzL2hhbW1lcl9nZXN0dXJlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SGFtbWVyR2VzdHVyZXNQbHVnaW5Db21tb259IGZyb20gJy4vaGFtbWVyX2NvbW1vbic7XG5pbXBvcnQge2lzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbiwgV3JhcHBlZEV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSGFtbWVyR2VzdHVyZXNQbHVnaW4gZXh0ZW5kcyBIYW1tZXJHZXN0dXJlc1BsdWdpbkNvbW1vbiB7XG4gIHN1cHBvcnRzKGV2ZW50TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKCFzdXBlci5zdXBwb3J0cyhldmVudE5hbWUpKSByZXR1cm4gZmFsc2U7XG5cbiAgICBpZiAoIWlzUHJlc2VudCh3aW5kb3dbJ0hhbW1lciddKSkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYEhhbW1lci5qcyBpcyBub3QgbG9hZGVkLCBjYW4gbm90IGJpbmQgJHtldmVudE5hbWV9IGV2ZW50YCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgdmFyIHpvbmUgPSB0aGlzLm1hbmFnZXIuZ2V0Wm9uZSgpO1xuICAgIGV2ZW50TmFtZSA9IGV2ZW50TmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgcmV0dXJuIHpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoZnVuY3Rpb24oKSB7XG4gICAgICAvLyBDcmVhdGluZyB0aGUgbWFuYWdlciBiaW5kIGV2ZW50cywgbXVzdCBiZSBkb25lIG91dHNpZGUgb2YgYW5ndWxhclxuICAgICAgdmFyIG1jID0gbmV3IEhhbW1lcihlbGVtZW50KTtcbiAgICAgIG1jLmdldCgncGluY2gnKS5zZXQoe2VuYWJsZTogdHJ1ZX0pO1xuICAgICAgbWMuZ2V0KCdyb3RhdGUnKS5zZXQoe2VuYWJsZTogdHJ1ZX0pO1xuICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24oZXZlbnRPYmopIHsgem9uZS5ydW4oZnVuY3Rpb24oKSB7IGhhbmRsZXIoZXZlbnRPYmopOyB9KTsgfTtcbiAgICAgIG1jLm9uKGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICAgICAgcmV0dXJuICgpID0+IHsgbWMub2ZmKGV2ZW50TmFtZSwgY2FsbGJhY2spOyB9O1xuICAgIH0pO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
