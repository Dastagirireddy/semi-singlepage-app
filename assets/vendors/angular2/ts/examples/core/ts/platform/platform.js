System.register(['angular2/core', 'angular2/platform/browser'], function(exports_1, context_1) {
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
    var core_1, browser_1;
    var appProviders, MyApp, platform, appInjector;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            }],
        execute: function() {
            appProviders = [];
            // #docregion longform
            MyApp = (function () {
                function MyApp() {
                }
                MyApp = __decorate([
                    core_1.Component({ selector: 'my-app', template: 'Hello World' }), 
                    __metadata('design:paramtypes', [])
                ], MyApp);
                return MyApp;
            }());
            platform = core_1.createPlatform(core_1.ReflectiveInjector.resolveAndCreate(browser_1.BROWSER_PROVIDERS));
            appInjector = core_1.ReflectiveInjector.resolveAndCreate([browser_1.BROWSER_APP_PROVIDERS, appProviders], platform.injector);
            core_1.coreLoadAndBootstrap(appInjector, MyApp);
        }
    }
});
// #enddocregion

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL2NvcmUvdHMvcGxhdGZvcm0vcGxhdGZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztRQUdJLFlBQVksU0FPWixRQUFRLEVBQ1IsV0FBVzs7Ozs7Ozs7OztZQVJYLFlBQVksR0FBVSxFQUFFLENBQUM7WUFFN0Isc0JBQXNCO1lBRXRCO2dCQUFBO2dCQUNBLENBQUM7Z0JBRkQ7b0JBQUMsZ0JBQVMsQ0FBQyxFQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBQyxDQUFDOzt5QkFBQTtnQkFFekQsWUFBQztZQUFELENBREEsQUFDQyxJQUFBO1lBRUcsUUFBUSxHQUFHLHFCQUFjLENBQUMseUJBQWtCLENBQUMsZ0JBQWdCLENBQUMsMkJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ2xGLFdBQVcsR0FDWCx5QkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLCtCQUFxQixFQUFFLFlBQVksQ0FBQyxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsRywyQkFBb0IsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7Ozs7QUFDekMsZ0JBQWdCIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL2NvcmUvdHMvcGxhdGZvcm0vcGxhdGZvcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgY3JlYXRlUGxhdGZvcm0sIGNvcmVMb2FkQW5kQm9vdHN0cmFwLCBSZWZsZWN0aXZlSW5qZWN0b3J9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtCUk9XU0VSX1BST1ZJREVSUywgQlJPV1NFUl9BUFBfUFJPVklERVJTfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9icm93c2VyJztcblxudmFyIGFwcFByb3ZpZGVyczogYW55W10gPSBbXTtcblxuLy8gI2RvY3JlZ2lvbiBsb25nZm9ybVxuQENvbXBvbmVudCh7c2VsZWN0b3I6ICdteS1hcHAnLCB0ZW1wbGF0ZTogJ0hlbGxvIFdvcmxkJ30pXG5jbGFzcyBNeUFwcCB7XG59XG5cbnZhciBwbGF0Zm9ybSA9IGNyZWF0ZVBsYXRmb3JtKFJlZmxlY3RpdmVJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKEJST1dTRVJfUFJPVklERVJTKSk7XG52YXIgYXBwSW5qZWN0b3IgPVxuICAgIFJlZmxlY3RpdmVJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKFtCUk9XU0VSX0FQUF9QUk9WSURFUlMsIGFwcFByb3ZpZGVyc10sIHBsYXRmb3JtLmluamVjdG9yKTtcbmNvcmVMb2FkQW5kQm9vdHN0cmFwKGFwcEluamVjdG9yLCBNeUFwcCk7XG4vLyAjZW5kZG9jcmVnaW9uXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
