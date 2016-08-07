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
    var MyApp;
    function main() {
        return browser_1.bootstrap(MyApp);
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            }],
        execute: function() {
            // #docregion bootstrap
            MyApp = (function () {
                function MyApp() {
                    this.name = 'World';
                }
                MyApp = __decorate([
                    core_1.Component({ selector: 'my-app', template: 'Hello {{ name }}!' }), 
                    __metadata('design:paramtypes', [])
                ], MyApp);
                return MyApp;
            }());
        }
    }
});
// #enddocregion

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvY29yZS90cy9ib290c3RyYXAvYm9vdHN0cmFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBU0E7UUFDRSxNQUFNLENBQUMsbUJBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQixDQUFDOzs7Ozs7Ozs7O1lBUkQsdUJBQXVCO1lBRXZCO2dCQUFBO29CQUNFLFNBQUksR0FBVyxPQUFPLENBQUM7Z0JBQ3pCLENBQUM7Z0JBSEQ7b0JBQUMsZ0JBQVMsQ0FBQyxFQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFDLENBQUM7O3lCQUFBO2dCQUcvRCxZQUFDO1lBQUQsQ0FGQSxBQUVDLElBQUE7Ozs7QUFLRCxnQkFBZ0IiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9leGFtcGxlcy9jb3JlL3RzL2Jvb3RzdHJhcC9ib290c3RyYXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge2Jvb3RzdHJhcH0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vYnJvd3Nlcic7XG5cbi8vICNkb2NyZWdpb24gYm9vdHN0cmFwXG5AQ29tcG9uZW50KHtzZWxlY3RvcjogJ215LWFwcCcsIHRlbXBsYXRlOiAnSGVsbG8ge3sgbmFtZSB9fSEnfSlcbmNsYXNzIE15QXBwIHtcbiAgbmFtZTogc3RyaW5nID0gJ1dvcmxkJztcbn1cblxuZnVuY3Rpb24gbWFpbigpIHtcbiAgcmV0dXJuIGJvb3RzdHJhcChNeUFwcCk7XG59XG4vLyAjZW5kZG9jcmVnaW9uXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
