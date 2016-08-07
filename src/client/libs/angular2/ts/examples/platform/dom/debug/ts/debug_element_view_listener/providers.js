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
    var MyAppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            }],
        execute: function() {
            MyAppComponent = (function () {
                function MyAppComponent() {
                }
                MyAppComponent = __decorate([
                    core_1.Component({ selector: 'my-component' }), 
                    __metadata('design:paramtypes', [])
                ], MyAppComponent);
                return MyAppComponent;
            }());
            // #docregion providers
            browser_1.bootstrap(MyAppComponent, [browser_1.ELEMENT_PROBE_PROVIDERS]);
        }
    }
});
// #enddocregion 

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvcGxhdGZvcm0vZG9tL2RlYnVnL3RzL2RlYnVnX2VsZW1lbnRfdmlld19saXN0ZW5lci9wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFJQTtnQkFBQTtnQkFDQSxDQUFDO2dCQUZEO29CQUFDLGdCQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUsY0FBYyxFQUFDLENBQUM7O2tDQUFBO2dCQUV0QyxxQkFBQztZQUFELENBREEsQUFDQyxJQUFBO1lBRUQsdUJBQXVCO1lBQ3ZCLG1CQUFTLENBQUMsY0FBYyxFQUFFLENBQUMsaUNBQXVCLENBQUMsQ0FBQyxDQUFDOzs7O0FBQ3JELGdCQUFnQiIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL3BsYXRmb3JtL2RvbS9kZWJ1Zy90cy9kZWJ1Z19lbGVtZW50X3ZpZXdfbGlzdGVuZXIvcHJvdmlkZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtib290c3RyYXAsIEVMRU1FTlRfUFJPQkVfUFJPVklERVJTfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9icm93c2VyJztcblxuQENvbXBvbmVudCh7c2VsZWN0b3I6ICdteS1jb21wb25lbnQnfSlcbmNsYXNzIE15QXBwQ29tcG9uZW50IHtcbn1cblxuLy8gI2RvY3JlZ2lvbiBwcm92aWRlcnNcbmJvb3RzdHJhcChNeUFwcENvbXBvbmVudCwgW0VMRU1FTlRfUFJPQkVfUFJPVklERVJTXSk7XG4vLyAjZW5kZG9jcmVnaW9uIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
