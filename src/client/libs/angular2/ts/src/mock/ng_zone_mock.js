System.register(['angular2/src/core/di', 'angular2/src/core/zone/ng_zone', 'angular2/src/facade/async'], function(exports_1, context_1) {
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
    var di_1, ng_zone_1, async_1;
    var MockNgZone;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (ng_zone_1_1) {
                ng_zone_1 = ng_zone_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            }],
        execute: function() {
            /**
             * A mock implementation of {@link NgZone}.
             */
            MockNgZone = (function (_super) {
                __extends(MockNgZone, _super);
                function MockNgZone() {
                    _super.call(this, { enableLongStackTrace: false });
                    /** @internal */
                    this._mockOnStable = new async_1.EventEmitter(false);
                }
                Object.defineProperty(MockNgZone.prototype, "onStable", {
                    get: function () { return this._mockOnStable; },
                    enumerable: true,
                    configurable: true
                });
                MockNgZone.prototype.run = function (fn) { return fn(); };
                MockNgZone.prototype.runOutsideAngular = function (fn) { return fn(); };
                MockNgZone.prototype.simulateZoneExit = function () { async_1.ObservableWrapper.callNext(this.onStable, null); };
                MockNgZone = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], MockNgZone);
                return MockNgZone;
            }(ng_zone_1.NgZone));
            exports_1("MockNgZone", MockNgZone);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL21vY2svbmdfem9uZV9tb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFJQTs7ZUFFRztZQUVIO2dCQUFnQyw4QkFBTTtnQkFJcEM7b0JBQWdCLGtCQUFNLEVBQUMsb0JBQW9CLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztvQkFIckQsZ0JBQWdCO29CQUNSLGtCQUFhLEdBQXNCLElBQUksb0JBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFYixDQUFDO2dCQUV2RCxzQkFBSSxnQ0FBUTt5QkFBWixjQUFpQixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFFN0Msd0JBQUcsR0FBSCxVQUFJLEVBQVksSUFBUyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUV2QyxzQ0FBaUIsR0FBakIsVUFBa0IsRUFBWSxJQUFTLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRXJELHFDQUFnQixHQUFoQixjQUEyQix5QkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBYi9FO29CQUFDLGVBQVUsRUFBRTs7OEJBQUE7Z0JBY2IsaUJBQUM7WUFBRCxDQWJBLEFBYUMsQ0FiK0IsZ0JBQU0sR0FhckM7WUFiRCxtQ0FhQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL21vY2svbmdfem9uZV9tb2NrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge05nWm9uZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvem9uZS9uZ196b25lJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBPYnNlcnZhYmxlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5cbi8qKlxuICogQSBtb2NrIGltcGxlbWVudGF0aW9uIG9mIHtAbGluayBOZ1pvbmV9LlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9ja05nWm9uZSBleHRlbmRzIE5nWm9uZSB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJpdmF0ZSBfbW9ja09uU3RhYmxlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoZmFsc2UpO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyBzdXBlcih7ZW5hYmxlTG9uZ1N0YWNrVHJhY2U6IGZhbHNlfSk7IH1cblxuICBnZXQgb25TdGFibGUoKSB7IHJldHVybiB0aGlzLl9tb2NrT25TdGFibGU7IH1cblxuICBydW4oZm46IEZ1bmN0aW9uKTogYW55IHsgcmV0dXJuIGZuKCk7IH1cblxuICBydW5PdXRzaWRlQW5ndWxhcihmbjogRnVuY3Rpb24pOiBhbnkgeyByZXR1cm4gZm4oKTsgfVxuXG4gIHNpbXVsYXRlWm9uZUV4aXQoKTogdm9pZCB7IE9ic2VydmFibGVXcmFwcGVyLmNhbGxOZXh0KHRoaXMub25TdGFibGUsIG51bGwpOyB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
