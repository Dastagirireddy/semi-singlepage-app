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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvY29yZS9waXBlcy90cy9sb3dlcnVwcGVyX3BpcGUvbG93ZXJ1cHBlcl9waXBlX2V4YW1wbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUE2QkE7UUFDRSxtQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFGRCx1QkFFQyxDQUFBOzs7Ozs7Ozs7O1lBNUJELDRCQUE0QjtZQVM1QjtnQkFBQTtnQkFHQSxDQUFDO2dCQURDLHNDQUFNLEdBQU4sVUFBTyxLQUFhLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQVYvQztvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSxvQkFBb0I7d0JBQzlCLFFBQVEsRUFBRSxnT0FJSDtxQkFDUixDQUFDOzt5Q0FBQTtnQkFJRiw0QkFBQztZQUFELENBSEEsQUFHQyxJQUFBO1lBSEQseURBR0MsQ0FBQTtZQUNELGdCQUFnQjtZQVVoQjtnQkFBQTtnQkFDQSxDQUFDO2dCQVREO29CQUFDLGdCQUFTLENBQUM7d0JBQ1QsUUFBUSxFQUFFLGFBQWE7d0JBQ3ZCLFVBQVUsRUFBRSxDQUFDLHFCQUFxQixDQUFDO3dCQUNuQyxRQUFRLEVBQUUsNkdBR1Q7cUJBQ0YsQ0FBQzs7MEJBQUE7Z0JBRUYsYUFBQztZQUFELENBREEsQUFDQyxJQUFBO1lBREQsMkJBQ0MsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL2NvcmUvcGlwZXMvdHMvbG93ZXJ1cHBlcl9waXBlL2xvd2VydXBwZXJfcGlwZV9leGFtcGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIHByb3ZpZGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtib290c3RyYXB9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXInO1xuXG4vLyAjZG9jcmVnaW9uIExvd2VyVXBwZXJQaXBlXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsb3dlcnVwcGVyLWV4YW1wbGUnLFxuICB0ZW1wbGF0ZTogYDxkaXY+XG4gICAgPGxhYmVsPk5hbWU6IDwvbGFiZWw+PGlucHV0ICNuYW1lIChrZXl1cCk9XCJjaGFuZ2UobmFtZS52YWx1ZSlcIiB0eXBlPVwidGV4dFwiPlxuICAgIDxwPkluIGxvd2VyY2FzZTogPHByZT4ne3t2YWx1ZSB8IGxvd2VyY2FzZX19JzwvcHJlPjwvcD5cbiAgICA8cD5JbiB1cHBlcmNhc2U6IDxwcmU+J3t7dmFsdWUgfCB1cHBlcmNhc2V9fSc8L3ByZT48L3A+XG4gIDwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgTG93ZXJVcHBlclBpcGVFeGFtcGxlIHtcbiAgdmFsdWU6IHN0cmluZztcbiAgY2hhbmdlKHZhbHVlOiBzdHJpbmcpIHsgdGhpcy52YWx1ZSA9IHZhbHVlOyB9XG59XG4vLyAjZW5kZG9jcmVnaW9uXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2V4YW1wbGUtYXBwJyxcbiAgZGlyZWN0aXZlczogW0xvd2VyVXBwZXJQaXBlRXhhbXBsZV0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGgxPkxvd2VyY2FzZVBpcGUgJmFtcDsgVXBwZXJjYXNlUGlwZSBFeGFtcGxlPC9oMT5cbiAgICA8bG93ZXJ1cHBlci1leGFtcGxlPjwvbG93ZXJ1cHBlci1leGFtcGxlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIEFwcENtcCB7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBib290c3RyYXAoQXBwQ21wKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
