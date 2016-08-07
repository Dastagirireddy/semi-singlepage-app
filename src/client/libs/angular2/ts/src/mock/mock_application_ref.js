System.register(['angular2/src/core/application_ref', 'angular2/src/core/di'], function(exports_1, context_1) {
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
    var application_ref_1, di_1;
    var MockApplicationRef;
    return {
        setters:[
            function (application_ref_1_1) {
                application_ref_1 = application_ref_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            }],
        execute: function() {
            /**
             * A no-op implementation of {@link ApplicationRef}, useful for testing.
             */
            MockApplicationRef = (function (_super) {
                __extends(MockApplicationRef, _super);
                function MockApplicationRef() {
                    _super.apply(this, arguments);
                }
                MockApplicationRef.prototype.registerBootstrapListener = function (listener) { };
                MockApplicationRef.prototype.registerDisposeListener = function (dispose) { };
                MockApplicationRef.prototype.bootstrap = function (componentType, bindings) {
                    return null;
                };
                Object.defineProperty(MockApplicationRef.prototype, "injector", {
                    get: function () { return null; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(MockApplicationRef.prototype, "zone", {
                    get: function () { return null; },
                    enumerable: true,
                    configurable: true
                });
                ;
                MockApplicationRef.prototype.dispose = function () { };
                MockApplicationRef.prototype.tick = function () { };
                Object.defineProperty(MockApplicationRef.prototype, "componentTypes", {
                    get: function () { return null; },
                    enumerable: true,
                    configurable: true
                });
                ;
                MockApplicationRef = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], MockApplicationRef);
                return MockApplicationRef;
            }(application_ref_1.ApplicationRef));
            exports_1("MockApplicationRef", MockApplicationRef);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL21vY2svbW9ja19hcHBsaWNhdGlvbl9yZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQU9BOztlQUVHO1lBRUg7Z0JBQXdDLHNDQUFjO2dCQUF0RDtvQkFBd0MsOEJBQWM7Z0JBa0J0RCxDQUFDO2dCQWpCQyxzREFBeUIsR0FBekIsVUFBMEIsUUFBcUMsSUFBUyxDQUFDO2dCQUV6RSxvREFBdUIsR0FBdkIsVUFBd0IsT0FBbUIsSUFBUyxDQUFDO2dCQUVyRCxzQ0FBUyxHQUFULFVBQVUsYUFBbUIsRUFBRSxRQUF5QztvQkFDdEUsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDZCxDQUFDO2dCQUVELHNCQUFJLHdDQUFRO3lCQUFaLGNBQTJCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7O2dCQUV6QyxzQkFBSSxvQ0FBSTt5QkFBUixjQUFxQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBOztnQkFFbkMsb0NBQU8sR0FBUCxjQUFpQixDQUFDO2dCQUVsQixpQ0FBSSxHQUFKLGNBQWMsQ0FBQztnQkFFZixzQkFBSSw4Q0FBYzt5QkFBbEIsY0FBK0IsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7OzttQkFBQTs7Z0JBbEIvQztvQkFBQyxlQUFVLEVBQUU7O3NDQUFBO2dCQW1CYix5QkFBQztZQUFELENBbEJBLEFBa0JDLENBbEJ1QyxnQ0FBYyxHQWtCckQ7WUFsQkQsbURBa0JDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvbW9jay9tb2NrX2FwcGxpY2F0aW9uX3JlZi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXBwbGljYXRpb25SZWZ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2FwcGxpY2F0aW9uX3JlZic7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7VHlwZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7Q29tcG9uZW50UmVmfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvZHluYW1pY19jb21wb25lbnRfbG9hZGVyJztcbmltcG9ydCB7UHJvdmlkZXIsIEluamVjdG9yfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge05nWm9uZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvem9uZS9uZ196b25lJztcblxuLyoqXG4gKiBBIG5vLW9wIGltcGxlbWVudGF0aW9uIG9mIHtAbGluayBBcHBsaWNhdGlvblJlZn0sIHVzZWZ1bCBmb3IgdGVzdGluZy5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vY2tBcHBsaWNhdGlvblJlZiBleHRlbmRzIEFwcGxpY2F0aW9uUmVmIHtcbiAgcmVnaXN0ZXJCb290c3RyYXBMaXN0ZW5lcihsaXN0ZW5lcjogKHJlZjogQ29tcG9uZW50UmVmKSA9PiB2b2lkKTogdm9pZCB7fVxuXG4gIHJlZ2lzdGVyRGlzcG9zZUxpc3RlbmVyKGRpc3Bvc2U6ICgpID0+IHZvaWQpOiB2b2lkIHt9XG5cbiAgYm9vdHN0cmFwKGNvbXBvbmVudFR5cGU6IFR5cGUsIGJpbmRpbmdzPzogQXJyYXk8VHlwZSB8IFByb3ZpZGVyIHwgYW55W10+KTogUHJvbWlzZTxDb21wb25lbnRSZWY+IHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGdldCBpbmplY3RvcigpOiBJbmplY3RvciB7IHJldHVybiBudWxsOyB9O1xuXG4gIGdldCB6b25lKCk6IE5nWm9uZSB7IHJldHVybiBudWxsOyB9O1xuXG4gIGRpc3Bvc2UoKTogdm9pZCB7fVxuXG4gIHRpY2soKTogdm9pZCB7fVxuXG4gIGdldCBjb21wb25lbnRUeXBlcygpOiBUeXBlW10geyByZXR1cm4gbnVsbDsgfTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
