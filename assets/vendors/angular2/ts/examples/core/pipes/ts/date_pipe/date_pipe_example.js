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
    var DatePipeExample, AppCmp;
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
            }],
        execute: function() {
            // #docregion DatePipe
            DatePipeExample = (function () {
                function DatePipeExample() {
                    this.today = Date.now();
                }
                DatePipeExample = __decorate([
                    core_1.Component({
                        selector: 'date-example',
                        template: "<div>\n    <p>Today is {{today | date}}</p>\n    <p>Or if you prefer, {{today | date:'fullDate'}}</p>\n    <p>The time is {{today | date:'jmZ'}}</p>\n  </div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], DatePipeExample);
                return DatePipeExample;
            }());
            exports_1("DatePipeExample", DatePipeExample);
            // #enddocregion
            AppCmp = (function () {
                function AppCmp() {
                }
                AppCmp = __decorate([
                    core_1.Component({
                        selector: 'example-app',
                        directives: [DatePipeExample],
                        template: "\n    <h1>DatePipe Example</h1>\n    <date-example></date-example>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppCmp);
                return AppCmp;
            }());
            exports_1("AppCmp", AppCmp);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL2NvcmUvcGlwZXMvdHMvZGF0ZV9waXBlL2RhdGVfcGlwZV9leGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBNEJBO1FBQ0UsbUJBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRkQsdUJBRUMsQ0FBQTs7Ozs7Ozs7OztZQTNCRCxzQkFBc0I7WUFTdEI7Z0JBQUE7b0JBQ0UsVUFBSyxHQUFXLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDN0IsQ0FBQztnQkFWRDtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSxjQUFjO3dCQUN4QixRQUFRLEVBQUUsZ0tBSUg7cUJBQ1IsQ0FBQzs7bUNBQUE7Z0JBR0Ysc0JBQUM7WUFBRCxDQUZBLEFBRUMsSUFBQTtZQUZELDZDQUVDLENBQUE7WUFDRCxnQkFBZ0I7WUFVaEI7Z0JBQUE7Z0JBQ0EsQ0FBQztnQkFURDtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSxhQUFhO3dCQUN2QixVQUFVLEVBQUUsQ0FBQyxlQUFlLENBQUM7d0JBQzdCLFFBQVEsRUFBRSx3RUFHVDtxQkFDRixDQUFDOzswQkFBQTtnQkFFRixhQUFDO1lBQUQsQ0FEQSxBQUNDLElBQUE7WUFERCwyQkFDQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL2NvcmUvcGlwZXMvdHMvZGF0ZV9waXBlL2RhdGVfcGlwZV9leGFtcGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIHByb3ZpZGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtib290c3RyYXB9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXInO1xuXG4vLyAjZG9jcmVnaW9uIERhdGVQaXBlXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkYXRlLWV4YW1wbGUnLFxuICB0ZW1wbGF0ZTogYDxkaXY+XG4gICAgPHA+VG9kYXkgaXMge3t0b2RheSB8IGRhdGV9fTwvcD5cbiAgICA8cD5PciBpZiB5b3UgcHJlZmVyLCB7e3RvZGF5IHwgZGF0ZTonZnVsbERhdGUnfX08L3A+XG4gICAgPHA+VGhlIHRpbWUgaXMge3t0b2RheSB8IGRhdGU6J2ptWid9fTwvcD5cbiAgPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBEYXRlUGlwZUV4YW1wbGUge1xuICB0b2RheTogbnVtYmVyID0gRGF0ZS5ub3coKTtcbn1cbi8vICNlbmRkb2NyZWdpb25cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZXhhbXBsZS1hcHAnLFxuICBkaXJlY3RpdmVzOiBbRGF0ZVBpcGVFeGFtcGxlXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aDE+RGF0ZVBpcGUgRXhhbXBsZTwvaDE+XG4gICAgPGRhdGUtZXhhbXBsZT48L2RhdGUtZXhhbXBsZT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBBcHBDbXAge1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgYm9vdHN0cmFwKEFwcENtcCk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
