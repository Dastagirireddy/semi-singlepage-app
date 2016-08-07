System.register(['angular2/core', 'angular2/platform/browser', 'rxjs/Rx'], function(exports_1, context_1) {
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
    var core_1, browser_1, Rx_1;
    var AsyncPipeExample, Task, AppCmp;
    function main() {
        browser_1.bootstrap(AppCmp);
    }
    exports_1("main", main);
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }],
        execute: function() {
            // #docregion AsyncPipe
            AsyncPipeExample = (function () {
                function AsyncPipeExample() {
                    this.greeting = null;
                    this.arrived = false;
                    this.resolve = null;
                    this.reset();
                }
                AsyncPipeExample.prototype.reset = function () {
                    var _this = this;
                    this.arrived = false;
                    this.greeting = new Promise(function (resolve, reject) { _this.resolve = resolve; });
                };
                AsyncPipeExample.prototype.clicked = function () {
                    if (this.arrived) {
                        this.reset();
                    }
                    else {
                        this.resolve("hi there!");
                        this.arrived = true;
                    }
                };
                AsyncPipeExample = __decorate([
                    core_1.Component({
                        selector: 'async-example',
                        template: "<div>\n    <p>Wait for it... {{ greeting | async }}</p>\n    <button (click)=\"clicked()\">{{ arrived ? 'Reset' : 'Resolve' }}</button>\n  </div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], AsyncPipeExample);
                return AsyncPipeExample;
            }());
            exports_1("AsyncPipeExample", AsyncPipeExample);
            // #enddocregion
            // #docregion AsyncPipeObservable
            Task = (function () {
                function Task() {
                    this.time = new Rx_1.Observable(function (observer) {
                        setInterval(function () { return observer.next(new Date().getTime()); }, 500);
                    });
                }
                Task = __decorate([
                    core_1.Component({ selector: "task-cmp", template: "Time: {{ time | async }}" }), 
                    __metadata('design:paramtypes', [])
                ], Task);
                return Task;
            }());
            // #enddocregion
            AppCmp = (function () {
                function AppCmp() {
                }
                AppCmp = __decorate([
                    core_1.Component({
                        selector: 'example-app',
                        directives: [AsyncPipeExample],
                        template: "\n    <h1>AsyncPipe Example</h1>\n    <async-example></async-example>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppCmp);
                return AppCmp;
            }());
            exports_1("AppCmp", AppCmp);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvY29yZS9waXBlcy90cy9hc3luY19waXBlL2FzeW5jX3BpcGVfZXhhbXBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQXdEQTtRQUNFLG1CQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUZELHVCQUVDLENBQUE7Ozs7Ozs7Ozs7Ozs7WUF0REQsdUJBQXVCO1lBUXZCO2dCQU1FO29CQUxBLGFBQVEsR0FBb0IsSUFBSSxDQUFDO29CQUNqQyxZQUFPLEdBQVksS0FBSyxDQUFDO29CQUVqQixZQUFPLEdBQWEsSUFBSSxDQUFDO29CQUVqQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQUMsQ0FBQztnQkFFL0IsZ0NBQUssR0FBTDtvQkFBQSxpQkFHQztvQkFGQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztvQkFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLE9BQU8sQ0FBUyxVQUFDLE9BQU8sRUFBRSxNQUFNLElBQU8sS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEYsQ0FBQztnQkFFRCxrQ0FBTyxHQUFQO29CQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO3dCQUNqQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ2YsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztvQkFDdEIsQ0FBQztnQkFDSCxDQUFDO2dCQTNCSDtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSxlQUFlO3dCQUN6QixRQUFRLEVBQUUsbUpBR0g7cUJBQ1IsQ0FBQzs7b0NBQUE7Z0JBc0JGLHVCQUFDO1lBQUQsQ0FyQkEsQUFxQkMsSUFBQTtZQXJCRCwrQ0FxQkMsQ0FBQTtZQUNELGdCQUFnQjtZQUVoQixpQ0FBaUM7WUFFakM7Z0JBQUE7b0JBQ0UsU0FBSSxHQUFHLElBQUksZUFBVSxDQUFTLFVBQUMsUUFBNEI7d0JBQ3pELFdBQVcsQ0FBQyxjQUFNLE9BQUEsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQW5DLENBQW1DLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQzlELENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUM7Z0JBTEQ7b0JBQUMsZ0JBQVMsQ0FBQyxFQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLDBCQUEwQixFQUFDLENBQUM7O3dCQUFBO2dCQUt4RSxXQUFDO1lBQUQsQ0FKQSxBQUlDLElBQUE7WUFDRCxnQkFBZ0I7WUFVaEI7Z0JBQUE7Z0JBQ0EsQ0FBQztnQkFURDtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSxhQUFhO3dCQUN2QixVQUFVLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQzt3QkFDOUIsUUFBUSxFQUFFLDJFQUdUO3FCQUNGLENBQUM7OzBCQUFBO2dCQUVGLGFBQUM7WUFBRCxDQURBLEFBQ0MsSUFBQTtZQURELDJCQUNDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9leGFtcGxlcy9jb3JlL3BpcGVzL3RzL2FzeW5jX3BpcGUvYXN5bmNfcGlwZV9leGFtcGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIHByb3ZpZGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtib290c3RyYXB9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXInO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpYmVyfSBmcm9tICdyeGpzL1J4JztcblxuLy8gI2RvY3JlZ2lvbiBBc3luY1BpcGVcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FzeW5jLWV4YW1wbGUnLFxuICB0ZW1wbGF0ZTogYDxkaXY+XG4gICAgPHA+V2FpdCBmb3IgaXQuLi4ge3sgZ3JlZXRpbmcgfCBhc3luYyB9fTwvcD5cbiAgICA8YnV0dG9uIChjbGljayk9XCJjbGlja2VkKClcIj57eyBhcnJpdmVkID8gJ1Jlc2V0JyA6ICdSZXNvbHZlJyB9fTwvYnV0dG9uPlxuICA8L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIEFzeW5jUGlwZUV4YW1wbGUge1xuICBncmVldGluZzogUHJvbWlzZTxzdHJpbmc+ID0gbnVsbDtcbiAgYXJyaXZlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgcmVzb2x2ZTogRnVuY3Rpb24gPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB0aGlzLnJlc2V0KCk7IH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLmFycml2ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmdyZWV0aW5nID0gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7IHRoaXMucmVzb2x2ZSA9IHJlc29sdmU7IH0pO1xuICB9XG5cbiAgY2xpY2tlZCgpIHtcbiAgICBpZiAodGhpcy5hcnJpdmVkKSB7XG4gICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVzb2x2ZShcImhpIHRoZXJlIVwiKTtcbiAgICAgIHRoaXMuYXJyaXZlZCA9IHRydWU7XG4gICAgfVxuICB9XG59XG4vLyAjZW5kZG9jcmVnaW9uXG5cbi8vICNkb2NyZWdpb24gQXN5bmNQaXBlT2JzZXJ2YWJsZVxuQENvbXBvbmVudCh7c2VsZWN0b3I6IFwidGFzay1jbXBcIiwgdGVtcGxhdGU6IFwiVGltZToge3sgdGltZSB8IGFzeW5jIH19XCJ9KVxuY2xhc3MgVGFzayB7XG4gIHRpbWUgPSBuZXcgT2JzZXJ2YWJsZTxudW1iZXI+KChvYnNlcnZlcjogU3Vic2NyaWJlcjxudW1iZXI+KSA9PiB7XG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4gb2JzZXJ2ZXIubmV4dChuZXcgRGF0ZSgpLmdldFRpbWUoKSksIDUwMCk7XG4gIH0pO1xufVxuLy8gI2VuZGRvY3JlZ2lvblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdleGFtcGxlLWFwcCcsXG4gIGRpcmVjdGl2ZXM6IFtBc3luY1BpcGVFeGFtcGxlXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aDE+QXN5bmNQaXBlIEV4YW1wbGU8L2gxPlxuICAgIDxhc3luYy1leGFtcGxlPjwvYXN5bmMtZXhhbXBsZT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBBcHBDbXAge1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgYm9vdHN0cmFwKEFwcENtcCk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
