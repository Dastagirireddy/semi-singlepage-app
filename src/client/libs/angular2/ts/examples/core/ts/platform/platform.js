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
    var appProviders, MyApp, app;
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
            app = core_1.platform(browser_1.BROWSER_PROVIDERS).application([browser_1.BROWSER_APP_PROVIDERS, appProviders]);
            app.bootstrap(MyApp);
        }
    }
});
// #enddocregion

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvY29yZS90cy9wbGF0Zm9ybS9wbGF0Zm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBR0ksWUFBWSxTQU9aLEdBQUc7Ozs7Ozs7Ozs7WUFQSCxZQUFZLEdBQVUsRUFBRSxDQUFDO1lBRTdCLHNCQUFzQjtZQUV0QjtnQkFBQTtnQkFDQSxDQUFDO2dCQUZEO29CQUFDLGdCQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUMsQ0FBQzs7eUJBQUE7Z0JBRXpELFlBQUM7WUFBRCxDQURBLEFBQ0MsSUFBQTtZQUVHLEdBQUcsR0FBRyxlQUFRLENBQUMsMkJBQWlCLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQywrQkFBcUIsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3pGLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7QUFDckIsZ0JBQWdCIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvY29yZS90cy9wbGF0Zm9ybS9wbGF0Zm9ybS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBwbGF0Zm9ybX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0JST1dTRVJfUFJPVklERVJTLCBCUk9XU0VSX0FQUF9QUk9WSURFUlN9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXInO1xuXG52YXIgYXBwUHJvdmlkZXJzOiBhbnlbXSA9IFtdO1xuXG4vLyAjZG9jcmVnaW9uIGxvbmdmb3JtXG5AQ29tcG9uZW50KHtzZWxlY3RvcjogJ215LWFwcCcsIHRlbXBsYXRlOiAnSGVsbG8gV29ybGQnfSlcbmNsYXNzIE15QXBwIHtcbn1cblxudmFyIGFwcCA9IHBsYXRmb3JtKEJST1dTRVJfUFJPVklERVJTKS5hcHBsaWNhdGlvbihbQlJPV1NFUl9BUFBfUFJPVklERVJTLCBhcHBQcm92aWRlcnNdKTtcbmFwcC5ib290c3RyYXAoTXlBcHApO1xuLy8gI2VuZGRvY3JlZ2lvblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
