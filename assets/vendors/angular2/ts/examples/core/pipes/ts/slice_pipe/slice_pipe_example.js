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
    var SlicePipeStringExample, SlicePipeListExample, AppCmp;
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
            // #docregion SlicePipe_string
            SlicePipeStringExample = (function () {
                function SlicePipeStringExample() {
                    this.str = 'abcdefghij';
                }
                SlicePipeStringExample = __decorate([
                    core_1.Component({
                        selector: 'slice-string-example',
                        template: "<div>\n    <p>{{str}}[0:4]: '{{str | slice:0:4}}' - output is expected to be 'abcd'</p>\n    <p>{{str}}[4:0]: '{{str | slice:4:0}}' - output is expected to be ''</p>\n    <p>{{str}}[-4]: '{{str | slice:-4}}' - output is expected to be 'ghij'</p>\n    <p>{{str}}[-4:-2]: '{{str | slice:-4:-2}}' - output is expected to be 'gh'</p>\n    <p>{{str}}[-100]: '{{str | slice:-100}}' - output is expected to be 'abcdefghij'</p>\n    <p>{{str}}[100]: '{{str | slice:100}}' - output is expected to be ''</p>\n  </div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], SlicePipeStringExample);
                return SlicePipeStringExample;
            }());
            exports_1("SlicePipeStringExample", SlicePipeStringExample);
            // #enddocregion
            // #docregion SlicePipe_list
            SlicePipeListExample = (function () {
                function SlicePipeListExample() {
                    this.collection = ['a', 'b', 'c', 'd'];
                }
                SlicePipeListExample = __decorate([
                    core_1.Component({
                        selector: 'slice-list-example',
                        template: "<div>\n    <li *ngFor=\"let  i of collection | slice:1:3\">{{i}}</li>\n  </div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], SlicePipeListExample);
                return SlicePipeListExample;
            }());
            exports_1("SlicePipeListExample", SlicePipeListExample);
            // #enddocregion
            AppCmp = (function () {
                function AppCmp() {
                }
                AppCmp = __decorate([
                    core_1.Component({
                        selector: 'example-app',
                        directives: [SlicePipeListExample, SlicePipeStringExample],
                        template: "\n    <h1>SlicePipe Examples</h1>\n    <slice-list-example></slice-list-example>\n    <slice-string-example></slice-string-example>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppCmp);
                return AppCmp;
            }());
            exports_1("AppCmp", AppCmp);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL2NvcmUvcGlwZXMvdHMvc2xpY2VfcGlwZS9zbGljZV9waXBlX2V4YW1wbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUE0Q0E7UUFDRSxtQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFGRCx1QkFFQyxDQUFBOzs7Ozs7Ozs7O1lBM0NELDhCQUE4QjtZQVk5QjtnQkFBQTtvQkFDRSxRQUFHLEdBQVcsWUFBWSxDQUFDO2dCQUM3QixDQUFDO2dCQWJEO29CQUFDLGdCQUFTLENBQUM7d0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjt3QkFDaEMsUUFBUSxFQUFFLDZmQU9IO3FCQUNSLENBQUM7OzBDQUFBO2dCQUdGLDZCQUFDO1lBQUQsQ0FGQSxBQUVDLElBQUE7WUFGRCwyREFFQyxDQUFBO1lBQ0QsZ0JBQWdCO1lBRWhCLDRCQUE0QjtZQU81QjtnQkFBQTtvQkFDRSxlQUFVLEdBQWEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDOUMsQ0FBQztnQkFSRDtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSxvQkFBb0I7d0JBQzlCLFFBQVEsRUFBRSxpRkFFSDtxQkFDUixDQUFDOzt3Q0FBQTtnQkFHRiwyQkFBQztZQUFELENBRkEsQUFFQyxJQUFBO1lBRkQsdURBRUMsQ0FBQTtZQUNELGdCQUFnQjtZQVdoQjtnQkFBQTtnQkFDQSxDQUFDO2dCQVZEO29CQUFDLGdCQUFTLENBQUM7d0JBQ1QsUUFBUSxFQUFFLGFBQWE7d0JBQ3ZCLFVBQVUsRUFBRSxDQUFDLG9CQUFvQixFQUFFLHNCQUFzQixDQUFDO3dCQUMxRCxRQUFRLEVBQUUseUlBSVQ7cUJBQ0YsQ0FBQzs7MEJBQUE7Z0JBRUYsYUFBQztZQUFELENBREEsQUFDQyxJQUFBO1lBREQsMkJBQ0MsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9leGFtcGxlcy9jb3JlL3BpcGVzL3RzL3NsaWNlX3BpcGUvc2xpY2VfcGlwZV9leGFtcGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIHByb3ZpZGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtib290c3RyYXB9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXInO1xuXG4vLyAjZG9jcmVnaW9uIFNsaWNlUGlwZV9zdHJpbmdcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NsaWNlLXN0cmluZy1leGFtcGxlJyxcbiAgdGVtcGxhdGU6IGA8ZGl2PlxuICAgIDxwPnt7c3RyfX1bMDo0XTogJ3t7c3RyIHwgc2xpY2U6MDo0fX0nIC0gb3V0cHV0IGlzIGV4cGVjdGVkIHRvIGJlICdhYmNkJzwvcD5cbiAgICA8cD57e3N0cn19WzQ6MF06ICd7e3N0ciB8IHNsaWNlOjQ6MH19JyAtIG91dHB1dCBpcyBleHBlY3RlZCB0byBiZSAnJzwvcD5cbiAgICA8cD57e3N0cn19Wy00XTogJ3t7c3RyIHwgc2xpY2U6LTR9fScgLSBvdXRwdXQgaXMgZXhwZWN0ZWQgdG8gYmUgJ2doaWonPC9wPlxuICAgIDxwPnt7c3RyfX1bLTQ6LTJdOiAne3tzdHIgfCBzbGljZTotNDotMn19JyAtIG91dHB1dCBpcyBleHBlY3RlZCB0byBiZSAnZ2gnPC9wPlxuICAgIDxwPnt7c3RyfX1bLTEwMF06ICd7e3N0ciB8IHNsaWNlOi0xMDB9fScgLSBvdXRwdXQgaXMgZXhwZWN0ZWQgdG8gYmUgJ2FiY2RlZmdoaWonPC9wPlxuICAgIDxwPnt7c3RyfX1bMTAwXTogJ3t7c3RyIHwgc2xpY2U6MTAwfX0nIC0gb3V0cHV0IGlzIGV4cGVjdGVkIHRvIGJlICcnPC9wPlxuICA8L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIFNsaWNlUGlwZVN0cmluZ0V4YW1wbGUge1xuICBzdHI6IHN0cmluZyA9ICdhYmNkZWZnaGlqJztcbn1cbi8vICNlbmRkb2NyZWdpb25cblxuLy8gI2RvY3JlZ2lvbiBTbGljZVBpcGVfbGlzdFxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2xpY2UtbGlzdC1leGFtcGxlJyxcbiAgdGVtcGxhdGU6IGA8ZGl2PlxuICAgIDxsaSAqbmdGb3I9XCJsZXQgIGkgb2YgY29sbGVjdGlvbiB8IHNsaWNlOjE6M1wiPnt7aX19PC9saT5cbiAgPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBTbGljZVBpcGVMaXN0RXhhbXBsZSB7XG4gIGNvbGxlY3Rpb246IHN0cmluZ1tdID0gWydhJywgJ2InLCAnYycsICdkJ107XG59XG4vLyAjZW5kZG9jcmVnaW9uXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2V4YW1wbGUtYXBwJyxcbiAgZGlyZWN0aXZlczogW1NsaWNlUGlwZUxpc3RFeGFtcGxlLCBTbGljZVBpcGVTdHJpbmdFeGFtcGxlXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aDE+U2xpY2VQaXBlIEV4YW1wbGVzPC9oMT5cbiAgICA8c2xpY2UtbGlzdC1leGFtcGxlPjwvc2xpY2UtbGlzdC1leGFtcGxlPlxuICAgIDxzbGljZS1zdHJpbmctZXhhbXBsZT48L3NsaWNlLXN0cmluZy1leGFtcGxlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIEFwcENtcCB7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBib290c3RyYXAoQXBwQ21wKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
