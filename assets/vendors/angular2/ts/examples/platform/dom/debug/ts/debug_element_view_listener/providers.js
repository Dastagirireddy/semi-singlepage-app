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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL3BsYXRmb3JtL2RvbS9kZWJ1Zy90cy9kZWJ1Z19lbGVtZW50X3ZpZXdfbGlzdGVuZXIvcHJvdmlkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBSUE7Z0JBQUE7Z0JBQ0EsQ0FBQztnQkFGRDtvQkFBQyxnQkFBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLGNBQWMsRUFBQyxDQUFDOztrQ0FBQTtnQkFFdEMscUJBQUM7WUFBRCxDQURBLEFBQ0MsSUFBQTtZQUVELHVCQUF1QjtZQUN2QixtQkFBUyxDQUFDLGNBQWMsRUFBRSxDQUFDLGlDQUF1QixDQUFDLENBQUMsQ0FBQzs7OztBQUNyRCxnQkFBZ0IiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvcGxhdGZvcm0vZG9tL2RlYnVnL3RzL2RlYnVnX2VsZW1lbnRfdmlld19saXN0ZW5lci9wcm92aWRlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge2Jvb3RzdHJhcCwgRUxFTUVOVF9QUk9CRV9QUk9WSURFUlN9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXInO1xuXG5AQ29tcG9uZW50KHtzZWxlY3RvcjogJ215LWNvbXBvbmVudCd9KVxuY2xhc3MgTXlBcHBDb21wb25lbnQge1xufVxuXG4vLyAjZG9jcmVnaW9uIHByb3ZpZGVyc1xuYm9vdHN0cmFwKE15QXBwQ29tcG9uZW50LCBbRUxFTUVOVF9QUk9CRV9QUk9WSURFUlNdKTtcbi8vICNlbmRkb2NyZWdpb25cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
