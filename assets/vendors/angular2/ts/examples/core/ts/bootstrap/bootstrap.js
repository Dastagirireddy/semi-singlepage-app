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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL2NvcmUvdHMvYm9vdHN0cmFwL2Jvb3RzdHJhcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQVNBO1FBQ0UsTUFBTSxDQUFDLG1CQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQzs7Ozs7Ozs7OztZQVJELHVCQUF1QjtZQUV2QjtnQkFBQTtvQkFDRSxTQUFJLEdBQVcsT0FBTyxDQUFDO2dCQUN6QixDQUFDO2dCQUhEO29CQUFDLGdCQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBQyxDQUFDOzt5QkFBQTtnQkFHL0QsWUFBQztZQUFELENBRkEsQUFFQyxJQUFBOzs7O0FBS0QsZ0JBQWdCIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL2NvcmUvdHMvYm9vdHN0cmFwL2Jvb3RzdHJhcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Ym9vdHN0cmFwfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9icm93c2VyJztcblxuLy8gI2RvY3JlZ2lvbiBib290c3RyYXBcbkBDb21wb25lbnQoe3NlbGVjdG9yOiAnbXktYXBwJywgdGVtcGxhdGU6ICdIZWxsbyB7eyBuYW1lIH19ISd9KVxuY2xhc3MgTXlBcHAge1xuICBuYW1lOiBzdHJpbmcgPSAnV29ybGQnO1xufVxuXG5mdW5jdGlvbiBtYWluKCkge1xuICByZXR1cm4gYm9vdHN0cmFwKE15QXBwKTtcbn1cbi8vICNlbmRkb2NyZWdpb25cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
