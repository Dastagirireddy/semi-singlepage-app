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
                MockApplicationRef.prototype.bootstrap = function (componentFactory) { return null; };
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
                MockApplicationRef.prototype.run = function (callback) { return null; };
                MockApplicationRef.prototype.waitForAsyncInitializers = function () { return null; };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9tb2NrL21vY2tfYXBwbGljYXRpb25fcmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFNQTs7ZUFFRztZQUVIO2dCQUF3QyxzQ0FBYztnQkFBdEQ7b0JBQXdDLDhCQUFjO2dCQW9CdEQsQ0FBQztnQkFuQkMsc0RBQXlCLEdBQXpCLFVBQTBCLFFBQXFDLElBQVMsQ0FBQztnQkFFekUsb0RBQXVCLEdBQXZCLFVBQXdCLE9BQW1CLElBQVMsQ0FBQztnQkFFckQsc0NBQVMsR0FBVCxVQUFVLGdCQUFrQyxJQUFrQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFFNUUsc0JBQUksd0NBQVE7eUJBQVosY0FBMkIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7OzttQkFBQTs7Z0JBRXpDLHNCQUFJLG9DQUFJO3lCQUFSLGNBQXFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7O2dCQUVuQyxnQ0FBRyxHQUFILFVBQUksUUFBa0IsSUFBUyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFFN0MscURBQXdCLEdBQXhCLGNBQTJDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUV6RCxvQ0FBTyxHQUFQLGNBQWlCLENBQUM7Z0JBRWxCLGlDQUFJLEdBQUosY0FBYyxDQUFDO2dCQUVmLHNCQUFJLDhDQUFjO3lCQUFsQixjQUErQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBOztnQkFwQi9DO29CQUFDLGVBQVUsRUFBRTs7c0NBQUE7Z0JBcUJiLHlCQUFDO1lBQUQsQ0FwQkEsQUFvQkMsQ0FwQnVDLGdDQUFjLEdBb0JyRDtZQXBCRCxtREFvQkMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvbW9jay9tb2NrX2FwcGxpY2F0aW9uX3JlZi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXBwbGljYXRpb25SZWZ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2FwcGxpY2F0aW9uX3JlZic7XG5pbXBvcnQge0luamVjdGFibGUsIEluamVjdG9yfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge1R5cGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0NvbXBvbmVudFJlZiwgQ29tcG9uZW50RmFjdG9yeX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL2NvbXBvbmVudF9mYWN0b3J5JztcbmltcG9ydCB7Tmdab25lfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS96b25lL25nX3pvbmUnO1xuXG4vKipcbiAqIEEgbm8tb3AgaW1wbGVtZW50YXRpb24gb2Yge0BsaW5rIEFwcGxpY2F0aW9uUmVmfSwgdXNlZnVsIGZvciB0ZXN0aW5nLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9ja0FwcGxpY2F0aW9uUmVmIGV4dGVuZHMgQXBwbGljYXRpb25SZWYge1xuICByZWdpc3RlckJvb3RzdHJhcExpc3RlbmVyKGxpc3RlbmVyOiAocmVmOiBDb21wb25lbnRSZWYpID0+IHZvaWQpOiB2b2lkIHt9XG5cbiAgcmVnaXN0ZXJEaXNwb3NlTGlzdGVuZXIoZGlzcG9zZTogKCkgPT4gdm9pZCk6IHZvaWQge31cblxuICBib290c3RyYXAoY29tcG9uZW50RmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeSk6IENvbXBvbmVudFJlZiB7IHJldHVybiBudWxsOyB9XG5cbiAgZ2V0IGluamVjdG9yKCk6IEluamVjdG9yIHsgcmV0dXJuIG51bGw7IH07XG5cbiAgZ2V0IHpvbmUoKTogTmdab25lIHsgcmV0dXJuIG51bGw7IH07XG5cbiAgcnVuKGNhbGxiYWNrOiBGdW5jdGlvbik6IGFueSB7IHJldHVybiBudWxsOyB9XG5cbiAgd2FpdEZvckFzeW5jSW5pdGlhbGl6ZXJzKCk6IFByb21pc2U8YW55PiB7IHJldHVybiBudWxsOyB9XG5cbiAgZGlzcG9zZSgpOiB2b2lkIHt9XG5cbiAgdGljaygpOiB2b2lkIHt9XG5cbiAgZ2V0IGNvbXBvbmVudFR5cGVzKCk6IFR5cGVbXSB7IHJldHVybiBudWxsOyB9O1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
