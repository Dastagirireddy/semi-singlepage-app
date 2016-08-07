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
    var LowerUpperPipeExample, AppCmp;
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
            // #docregion LowerUpperPipe
            LowerUpperPipeExample = (function () {
                function LowerUpperPipeExample() {
                }
                LowerUpperPipeExample.prototype.change = function (value) { this.value = value; };
                LowerUpperPipeExample = __decorate([
                    core_1.Component({
                        selector: 'lowerupper-example',
                        template: "<div>\n    <label>Name: </label><input #name (keyup)=\"change(name.value)\" type=\"text\">\n    <p>In lowercase: <pre>'{{value | lowercase}}'</pre></p>\n    <p>In uppercase: <pre>'{{value | uppercase}}'</pre></p>\n  </div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], LowerUpperPipeExample);
                return LowerUpperPipeExample;
            }());
            exports_1("LowerUpperPipeExample", LowerUpperPipeExample);
            // #enddocregion
            AppCmp = (function () {
                function AppCmp() {
                }
                AppCmp = __decorate([
                    core_1.Component({
                        selector: 'example-app',
                        directives: [LowerUpperPipeExample],
                        template: "\n    <h1>LowercasePipe &amp; UppercasePipe Example</h1>\n    <lowerupper-example></lowerupper-example>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppCmp);
                return AppCmp;
            }());
            exports_1("AppCmp", AppCmp);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL2NvcmUvcGlwZXMvdHMvbG93ZXJ1cHBlcl9waXBlL2xvd2VydXBwZXJfcGlwZV9leGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBNkJBO1FBQ0UsbUJBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRkQsdUJBRUMsQ0FBQTs7Ozs7Ozs7OztZQTVCRCw0QkFBNEI7WUFTNUI7Z0JBQUE7Z0JBR0EsQ0FBQztnQkFEQyxzQ0FBTSxHQUFOLFVBQU8sS0FBYSxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFWL0M7b0JBQUMsZ0JBQVMsQ0FBQzt3QkFDVCxRQUFRLEVBQUUsb0JBQW9CO3dCQUM5QixRQUFRLEVBQUUsZ09BSUg7cUJBQ1IsQ0FBQzs7eUNBQUE7Z0JBSUYsNEJBQUM7WUFBRCxDQUhBLEFBR0MsSUFBQTtZQUhELHlEQUdDLENBQUE7WUFDRCxnQkFBZ0I7WUFVaEI7Z0JBQUE7Z0JBQ0EsQ0FBQztnQkFURDtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSxhQUFhO3dCQUN2QixVQUFVLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQzt3QkFDbkMsUUFBUSxFQUFFLDZHQUdUO3FCQUNGLENBQUM7OzBCQUFBO2dCQUVGLGFBQUM7WUFBRCxDQURBLEFBQ0MsSUFBQTtZQURELDJCQUNDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvY29yZS9waXBlcy90cy9sb3dlcnVwcGVyX3BpcGUvbG93ZXJ1cHBlcl9waXBlX2V4YW1wbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgcHJvdmlkZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge2Jvb3RzdHJhcH0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vYnJvd3Nlcic7XG5cbi8vICNkb2NyZWdpb24gTG93ZXJVcHBlclBpcGVcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xvd2VydXBwZXItZXhhbXBsZScsXG4gIHRlbXBsYXRlOiBgPGRpdj5cbiAgICA8bGFiZWw+TmFtZTogPC9sYWJlbD48aW5wdXQgI25hbWUgKGtleXVwKT1cImNoYW5nZShuYW1lLnZhbHVlKVwiIHR5cGU9XCJ0ZXh0XCI+XG4gICAgPHA+SW4gbG93ZXJjYXNlOiA8cHJlPid7e3ZhbHVlIHwgbG93ZXJjYXNlfX0nPC9wcmU+PC9wPlxuICAgIDxwPkluIHVwcGVyY2FzZTogPHByZT4ne3t2YWx1ZSB8IHVwcGVyY2FzZX19JzwvcHJlPjwvcD5cbiAgPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBMb3dlclVwcGVyUGlwZUV4YW1wbGUge1xuICB2YWx1ZTogc3RyaW5nO1xuICBjaGFuZ2UodmFsdWU6IHN0cmluZykgeyB0aGlzLnZhbHVlID0gdmFsdWU7IH1cbn1cbi8vICNlbmRkb2NyZWdpb25cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZXhhbXBsZS1hcHAnLFxuICBkaXJlY3RpdmVzOiBbTG93ZXJVcHBlclBpcGVFeGFtcGxlXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aDE+TG93ZXJjYXNlUGlwZSAmYW1wOyBVcHBlcmNhc2VQaXBlIEV4YW1wbGU8L2gxPlxuICAgIDxsb3dlcnVwcGVyLWV4YW1wbGU+PC9sb3dlcnVwcGVyLWV4YW1wbGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQXBwQ21wIHtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGJvb3RzdHJhcChBcHBDbXApO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
