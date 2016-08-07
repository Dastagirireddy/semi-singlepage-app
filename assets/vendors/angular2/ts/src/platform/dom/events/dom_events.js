System.register(['angular2/src/platform/dom/dom_adapter', 'angular2/core', './event_manager'], function(exports_1, context_1) {
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
    var dom_adapter_1, core_1, event_manager_1;
    var DomEventsPlugin;
    return {
        setters:[
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (event_manager_1_1) {
                event_manager_1 = event_manager_1_1;
            }],
        execute: function() {
            DomEventsPlugin = (function (_super) {
                __extends(DomEventsPlugin, _super);
                function DomEventsPlugin() {
                    _super.apply(this, arguments);
                }
                // This plugin should come last in the list of plugins, because it accepts all
                // events.
                DomEventsPlugin.prototype.supports = function (eventName) { return true; };
                DomEventsPlugin.prototype.addEventListener = function (element, eventName, handler) {
                    var zone = this.manager.getZone();
                    var outsideHandler = function (event) { return zone.runGuarded(function () { return handler(event); }); };
                    return this.manager.getZone().runOutsideAngular(function () { return dom_adapter_1.DOM.onAndCancel(element, eventName, outsideHandler); });
                };
                DomEventsPlugin.prototype.addGlobalEventListener = function (target, eventName, handler) {
                    var element = dom_adapter_1.DOM.getGlobalEventTarget(target);
                    var zone = this.manager.getZone();
                    var outsideHandler = function (event) { return zone.runGuarded(function () { return handler(event); }); };
                    return this.manager.getZone().runOutsideAngular(function () { return dom_adapter_1.DOM.onAndCancel(element, eventName, outsideHandler); });
                };
                DomEventsPlugin = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], DomEventsPlugin);
                return DomEventsPlugin;
            }(event_manager_1.EventManagerPlugin));
            exports_1("DomEventsPlugin", DomEventsPlugin);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9kb20vZXZlbnRzL2RvbV9ldmVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUtBO2dCQUFxQyxtQ0FBa0I7Z0JBQXZEO29CQUFxQyw4QkFBa0I7Z0JBbUJ2RCxDQUFDO2dCQWxCQyw4RUFBOEU7Z0JBQzlFLFVBQVU7Z0JBQ1Ysa0NBQVEsR0FBUixVQUFTLFNBQWlCLElBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBRXJELDBDQUFnQixHQUFoQixVQUFpQixPQUFvQixFQUFFLFNBQWlCLEVBQUUsT0FBaUI7b0JBQ3pFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ2xDLElBQUksY0FBYyxHQUFHLFVBQUMsS0FBSyxJQUFLLE9BQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFkLENBQWMsQ0FBQyxFQUFyQyxDQUFxQyxDQUFDO29CQUN0RSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsQ0FDM0MsY0FBTSxPQUFBLGlCQUFHLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFDLEVBQW5ELENBQW1ELENBQUMsQ0FBQztnQkFDakUsQ0FBQztnQkFFRCxnREFBc0IsR0FBdEIsVUFBdUIsTUFBYyxFQUFFLFNBQWlCLEVBQUUsT0FBaUI7b0JBQ3pFLElBQUksT0FBTyxHQUFHLGlCQUFHLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQy9DLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ2xDLElBQUksY0FBYyxHQUFHLFVBQUMsS0FBSyxJQUFLLE9BQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFkLENBQWMsQ0FBQyxFQUFyQyxDQUFxQyxDQUFDO29CQUN0RSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsQ0FDM0MsY0FBTSxPQUFBLGlCQUFHLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFDLEVBQW5ELENBQW1ELENBQUMsQ0FBQztnQkFDakUsQ0FBQztnQkFuQkg7b0JBQUMsaUJBQVUsRUFBRTs7bUNBQUE7Z0JBb0JiLHNCQUFDO1lBQUQsQ0FuQkEsQUFtQkMsQ0FuQm9DLGtDQUFrQixHQW1CdEQ7WUFuQkQsNkNBbUJDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL2RvbS9ldmVudHMvZG9tX2V2ZW50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RE9NfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9hZGFwdGVyJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0V2ZW50TWFuYWdlclBsdWdpbiwgRXZlbnRNYW5hZ2VyfSBmcm9tICcuL2V2ZW50X21hbmFnZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRG9tRXZlbnRzUGx1Z2luIGV4dGVuZHMgRXZlbnRNYW5hZ2VyUGx1Z2luIHtcbiAgLy8gVGhpcyBwbHVnaW4gc2hvdWxkIGNvbWUgbGFzdCBpbiB0aGUgbGlzdCBvZiBwbHVnaW5zLCBiZWNhdXNlIGl0IGFjY2VwdHMgYWxsXG4gIC8vIGV2ZW50cy5cbiAgc3VwcG9ydHMoZXZlbnROYW1lOiBzdHJpbmcpOiBib29sZWFuIHsgcmV0dXJuIHRydWU7IH1cblxuICBhZGRFdmVudExpc3RlbmVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgdmFyIHpvbmUgPSB0aGlzLm1hbmFnZXIuZ2V0Wm9uZSgpO1xuICAgIHZhciBvdXRzaWRlSGFuZGxlciA9IChldmVudCkgPT4gem9uZS5ydW5HdWFyZGVkKCgpID0+IGhhbmRsZXIoZXZlbnQpKTtcbiAgICByZXR1cm4gdGhpcy5tYW5hZ2VyLmdldFpvbmUoKS5ydW5PdXRzaWRlQW5ndWxhcihcbiAgICAgICAgKCkgPT4gRE9NLm9uQW5kQ2FuY2VsKGVsZW1lbnQsIGV2ZW50TmFtZSwgb3V0c2lkZUhhbmRsZXIpKTtcbiAgfVxuXG4gIGFkZEdsb2JhbEV2ZW50TGlzdGVuZXIodGFyZ2V0OiBzdHJpbmcsIGV2ZW50TmFtZTogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICB2YXIgZWxlbWVudCA9IERPTS5nZXRHbG9iYWxFdmVudFRhcmdldCh0YXJnZXQpO1xuICAgIHZhciB6b25lID0gdGhpcy5tYW5hZ2VyLmdldFpvbmUoKTtcbiAgICB2YXIgb3V0c2lkZUhhbmRsZXIgPSAoZXZlbnQpID0+IHpvbmUucnVuR3VhcmRlZCgoKSA9PiBoYW5kbGVyKGV2ZW50KSk7XG4gICAgcmV0dXJuIHRoaXMubWFuYWdlci5nZXRab25lKCkucnVuT3V0c2lkZUFuZ3VsYXIoXG4gICAgICAgICgpID0+IERPTS5vbkFuZENhbmNlbChlbGVtZW50LCBldmVudE5hbWUsIG91dHNpZGVIYW5kbGVyKSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
