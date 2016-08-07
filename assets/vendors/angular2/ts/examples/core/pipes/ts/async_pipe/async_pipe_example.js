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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL2NvcmUvcGlwZXMvdHMvYXN5bmNfcGlwZS9hc3luY19waXBlX2V4YW1wbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUF3REE7UUFDRSxtQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFGRCx1QkFFQyxDQUFBOzs7Ozs7Ozs7Ozs7O1lBdERELHVCQUF1QjtZQVF2QjtnQkFNRTtvQkFMQSxhQUFRLEdBQW9CLElBQUksQ0FBQztvQkFDakMsWUFBTyxHQUFZLEtBQUssQ0FBQztvQkFFakIsWUFBTyxHQUFhLElBQUksQ0FBQztvQkFFakIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUFDLENBQUM7Z0JBRS9CLGdDQUFLLEdBQUw7b0JBQUEsaUJBR0M7b0JBRkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxPQUFPLENBQVMsVUFBQyxPQUFPLEVBQUUsTUFBTSxJQUFPLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hGLENBQUM7Z0JBRUQsa0NBQU8sR0FBUDtvQkFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDakIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNmLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBQ3RCLENBQUM7Z0JBQ0gsQ0FBQztnQkEzQkg7b0JBQUMsZ0JBQVMsQ0FBQzt3QkFDVCxRQUFRLEVBQUUsZUFBZTt3QkFDekIsUUFBUSxFQUFFLG1KQUdIO3FCQUNSLENBQUM7O29DQUFBO2dCQXNCRix1QkFBQztZQUFELENBckJBLEFBcUJDLElBQUE7WUFyQkQsK0NBcUJDLENBQUE7WUFDRCxnQkFBZ0I7WUFFaEIsaUNBQWlDO1lBRWpDO2dCQUFBO29CQUNFLFNBQUksR0FBRyxJQUFJLGVBQVUsQ0FBUyxVQUFDLFFBQTRCO3dCQUN6RCxXQUFXLENBQUMsY0FBTSxPQUFBLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFuQyxDQUFtQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUM5RCxDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDO2dCQUxEO29CQUFDLGdCQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSwwQkFBMEIsRUFBQyxDQUFDOzt3QkFBQTtnQkFLeEUsV0FBQztZQUFELENBSkEsQUFJQyxJQUFBO1lBQ0QsZ0JBQWdCO1lBVWhCO2dCQUFBO2dCQUNBLENBQUM7Z0JBVEQ7b0JBQUMsZ0JBQVMsQ0FBQzt3QkFDVCxRQUFRLEVBQUUsYUFBYTt3QkFDdkIsVUFBVSxFQUFFLENBQUMsZ0JBQWdCLENBQUM7d0JBQzlCLFFBQVEsRUFBRSwyRUFHVDtxQkFDRixDQUFDOzswQkFBQTtnQkFFRixhQUFDO1lBQUQsQ0FEQSxBQUNDLElBQUE7WUFERCwyQkFDQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL2NvcmUvcGlwZXMvdHMvYXN5bmNfcGlwZS9hc3luY19waXBlX2V4YW1wbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgcHJvdmlkZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge2Jvb3RzdHJhcH0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vYnJvd3Nlcic7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmliZXJ9IGZyb20gJ3J4anMvUngnO1xuXG4vLyAjZG9jcmVnaW9uIEFzeW5jUGlwZVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXN5bmMtZXhhbXBsZScsXG4gIHRlbXBsYXRlOiBgPGRpdj5cbiAgICA8cD5XYWl0IGZvciBpdC4uLiB7eyBncmVldGluZyB8IGFzeW5jIH19PC9wPlxuICAgIDxidXR0b24gKGNsaWNrKT1cImNsaWNrZWQoKVwiPnt7IGFycml2ZWQgPyAnUmVzZXQnIDogJ1Jlc29sdmUnIH19PC9idXR0b24+XG4gIDwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgQXN5bmNQaXBlRXhhbXBsZSB7XG4gIGdyZWV0aW5nOiBQcm9taXNlPHN0cmluZz4gPSBudWxsO1xuICBhcnJpdmVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSByZXNvbHZlOiBGdW5jdGlvbiA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoKSB7IHRoaXMucmVzZXQoKTsgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuYXJyaXZlZCA9IGZhbHNlO1xuICAgIHRoaXMuZ3JlZXRpbmcgPSBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHsgdGhpcy5yZXNvbHZlID0gcmVzb2x2ZTsgfSk7XG4gIH1cblxuICBjbGlja2VkKCkge1xuICAgIGlmICh0aGlzLmFycml2ZWQpIHtcbiAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZXNvbHZlKFwiaGkgdGhlcmUhXCIpO1xuICAgICAgdGhpcy5hcnJpdmVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cbi8vICNlbmRkb2NyZWdpb25cblxuLy8gI2RvY3JlZ2lvbiBBc3luY1BpcGVPYnNlcnZhYmxlXG5AQ29tcG9uZW50KHtzZWxlY3RvcjogXCJ0YXNrLWNtcFwiLCB0ZW1wbGF0ZTogXCJUaW1lOiB7eyB0aW1lIHwgYXN5bmMgfX1cIn0pXG5jbGFzcyBUYXNrIHtcbiAgdGltZSA9IG5ldyBPYnNlcnZhYmxlPG51bWJlcj4oKG9ic2VydmVyOiBTdWJzY3JpYmVyPG51bWJlcj4pID0+IHtcbiAgICBzZXRJbnRlcnZhbCgoKSA9PiBvYnNlcnZlci5uZXh0KG5ldyBEYXRlKCkuZ2V0VGltZSgpKSwgNTAwKTtcbiAgfSk7XG59XG4vLyAjZW5kZG9jcmVnaW9uXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2V4YW1wbGUtYXBwJyxcbiAgZGlyZWN0aXZlczogW0FzeW5jUGlwZUV4YW1wbGVdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxoMT5Bc3luY1BpcGUgRXhhbXBsZTwvaDE+XG4gICAgPGFzeW5jLWV4YW1wbGU+PC9hc3luYy1leGFtcGxlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIEFwcENtcCB7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBib290c3RyYXAoQXBwQ21wKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
