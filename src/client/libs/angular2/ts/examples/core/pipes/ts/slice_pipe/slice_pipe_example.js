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
                        template: "<div>\n    <li *ngFor=\"var i of collection | slice:1:3\">{{i}}</li>\n  </div>"
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvY29yZS9waXBlcy90cy9zbGljZV9waXBlL3NsaWNlX3BpcGVfZXhhbXBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQTRDQTtRQUNFLG1CQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUZELHVCQUVDLENBQUE7Ozs7Ozs7Ozs7WUEzQ0QsOEJBQThCO1lBWTlCO2dCQUFBO29CQUNFLFFBQUcsR0FBVyxZQUFZLENBQUM7Z0JBQzdCLENBQUM7Z0JBYkQ7b0JBQUMsZ0JBQVMsQ0FBQzt3QkFDVCxRQUFRLEVBQUUsc0JBQXNCO3dCQUNoQyxRQUFRLEVBQUUsNmZBT0g7cUJBQ1IsQ0FBQzs7MENBQUE7Z0JBR0YsNkJBQUM7WUFBRCxDQUZBLEFBRUMsSUFBQTtZQUZELDJEQUVDLENBQUE7WUFDRCxnQkFBZ0I7WUFFaEIsNEJBQTRCO1lBTzVCO2dCQUFBO29CQUNFLGVBQVUsR0FBYSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUM5QyxDQUFDO2dCQVJEO29CQUFDLGdCQUFTLENBQUM7d0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjt3QkFDOUIsUUFBUSxFQUFFLGdGQUVIO3FCQUNSLENBQUM7O3dDQUFBO2dCQUdGLDJCQUFDO1lBQUQsQ0FGQSxBQUVDLElBQUE7WUFGRCx1REFFQyxDQUFBO1lBQ0QsZ0JBQWdCO1lBV2hCO2dCQUFBO2dCQUNBLENBQUM7Z0JBVkQ7b0JBQUMsZ0JBQVMsQ0FBQzt3QkFDVCxRQUFRLEVBQUUsYUFBYTt3QkFDdkIsVUFBVSxFQUFFLENBQUMsb0JBQW9CLEVBQUUsc0JBQXNCLENBQUM7d0JBQzFELFFBQVEsRUFBRSx5SUFJVDtxQkFDRixDQUFDOzswQkFBQTtnQkFFRixhQUFDO1lBQUQsQ0FEQSxBQUNDLElBQUE7WUFERCwyQkFDQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvY29yZS9waXBlcy90cy9zbGljZV9waXBlL3NsaWNlX3BpcGVfZXhhbXBsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBwcm92aWRlfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Ym9vdHN0cmFwfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9icm93c2VyJztcblxuLy8gI2RvY3JlZ2lvbiBTbGljZVBpcGVfc3RyaW5nXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzbGljZS1zdHJpbmctZXhhbXBsZScsXG4gIHRlbXBsYXRlOiBgPGRpdj5cbiAgICA8cD57e3N0cn19WzA6NF06ICd7e3N0ciB8IHNsaWNlOjA6NH19JyAtIG91dHB1dCBpcyBleHBlY3RlZCB0byBiZSAnYWJjZCc8L3A+XG4gICAgPHA+e3tzdHJ9fVs0OjBdOiAne3tzdHIgfCBzbGljZTo0OjB9fScgLSBvdXRwdXQgaXMgZXhwZWN0ZWQgdG8gYmUgJyc8L3A+XG4gICAgPHA+e3tzdHJ9fVstNF06ICd7e3N0ciB8IHNsaWNlOi00fX0nIC0gb3V0cHV0IGlzIGV4cGVjdGVkIHRvIGJlICdnaGlqJzwvcD5cbiAgICA8cD57e3N0cn19Wy00Oi0yXTogJ3t7c3RyIHwgc2xpY2U6LTQ6LTJ9fScgLSBvdXRwdXQgaXMgZXhwZWN0ZWQgdG8gYmUgJ2doJzwvcD5cbiAgICA8cD57e3N0cn19Wy0xMDBdOiAne3tzdHIgfCBzbGljZTotMTAwfX0nIC0gb3V0cHV0IGlzIGV4cGVjdGVkIHRvIGJlICdhYmNkZWZnaGlqJzwvcD5cbiAgICA8cD57e3N0cn19WzEwMF06ICd7e3N0ciB8IHNsaWNlOjEwMH19JyAtIG91dHB1dCBpcyBleHBlY3RlZCB0byBiZSAnJzwvcD5cbiAgPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBTbGljZVBpcGVTdHJpbmdFeGFtcGxlIHtcbiAgc3RyOiBzdHJpbmcgPSAnYWJjZGVmZ2hpaic7XG59XG4vLyAjZW5kZG9jcmVnaW9uXG5cbi8vICNkb2NyZWdpb24gU2xpY2VQaXBlX2xpc3RcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NsaWNlLWxpc3QtZXhhbXBsZScsXG4gIHRlbXBsYXRlOiBgPGRpdj5cbiAgICA8bGkgKm5nRm9yPVwidmFyIGkgb2YgY29sbGVjdGlvbiB8IHNsaWNlOjE6M1wiPnt7aX19PC9saT5cbiAgPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBTbGljZVBpcGVMaXN0RXhhbXBsZSB7XG4gIGNvbGxlY3Rpb246IHN0cmluZ1tdID0gWydhJywgJ2InLCAnYycsICdkJ107XG59XG4vLyAjZW5kZG9jcmVnaW9uXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2V4YW1wbGUtYXBwJyxcbiAgZGlyZWN0aXZlczogW1NsaWNlUGlwZUxpc3RFeGFtcGxlLCBTbGljZVBpcGVTdHJpbmdFeGFtcGxlXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aDE+U2xpY2VQaXBlIEV4YW1wbGVzPC9oMT5cbiAgICA8c2xpY2UtbGlzdC1leGFtcGxlPjwvc2xpY2UtbGlzdC1leGFtcGxlPlxuICAgIDxzbGljZS1zdHJpbmctZXhhbXBsZT48L3NsaWNlLXN0cmluZy1leGFtcGxlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIEFwcENtcCB7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBib290c3RyYXAoQXBwQ21wKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
