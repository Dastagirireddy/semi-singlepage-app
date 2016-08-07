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
    var NumberPipeExample, PercentPipeExample, CurrencyPipeExample, AppCmp;
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
            // #docregion NumberPipe
            NumberPipeExample = (function () {
                function NumberPipeExample() {
                    this.pi = 3.141;
                    this.e = 2.718281828459045;
                }
                NumberPipeExample = __decorate([
                    core_1.Component({
                        selector: 'number-example',
                        template: "<div>\n    <p>e (no formatting): {{e}}</p>\n    <p>e (3.1-5): {{e | number:'3.1-5'}}</p>\n    <p>pi (no formatting): {{pi}}</p>\n    <p>pi (3.5-5): {{pi | number:'3.5-5'}}</p>\n  </div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], NumberPipeExample);
                return NumberPipeExample;
            }());
            exports_1("NumberPipeExample", NumberPipeExample);
            // #enddocregion
            // #docregion PercentPipe
            PercentPipeExample = (function () {
                function PercentPipeExample() {
                    this.a = 0.259;
                    this.b = 1.3495;
                }
                PercentPipeExample = __decorate([
                    core_1.Component({
                        selector: 'percent-example',
                        template: "<div>\n    <p>A: {{a | percent}}</p>\n    <p>B: {{b | percent:'4.3-5'}}</p>\n  </div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], PercentPipeExample);
                return PercentPipeExample;
            }());
            exports_1("PercentPipeExample", PercentPipeExample);
            // #enddocregion
            // #docregion CurrencyPipe
            CurrencyPipeExample = (function () {
                function CurrencyPipeExample() {
                    this.a = 0.259;
                    this.b = 1.3495;
                }
                CurrencyPipeExample = __decorate([
                    core_1.Component({
                        selector: 'currency-example',
                        template: "<div>\n    <p>A: {{a | currency:'USD':false}}</p>\n    <p>B: {{b | currency:'USD':true:'4.2-2'}}</p>\n  </div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], CurrencyPipeExample);
                return CurrencyPipeExample;
            }());
            exports_1("CurrencyPipeExample", CurrencyPipeExample);
            // #enddocregion
            AppCmp = (function () {
                function AppCmp() {
                }
                AppCmp = __decorate([
                    core_1.Component({
                        selector: 'example-app',
                        directives: [NumberPipeExample, PercentPipeExample, CurrencyPipeExample],
                        template: "\n    <h1>Numeric Pipe Examples</h1>\n    <h2>NumberPipe Example</h2>\n    <number-example></number-example>\n    <h2>PercentPipe Example</h2>\n    <percent-example></percent-example>\n    <h2>CurrencyPipeExample</h2>\n    <currency-example></currency-example>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppCmp);
                return AppCmp;
            }());
            exports_1("AppCmp", AppCmp);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL2NvcmUvcGlwZXMvdHMvbnVtYmVyX3BpcGUvbnVtYmVyX3BpcGVfZXhhbXBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQStEQTtRQUNFLG1CQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUZELHVCQUVDLENBQUE7Ozs7Ozs7Ozs7WUE5REQsd0JBQXdCO1lBVXhCO2dCQUFBO29CQUNFLE9BQUUsR0FBVyxLQUFLLENBQUM7b0JBQ25CLE1BQUMsR0FBVyxpQkFBaUIsQ0FBQztnQkFDaEMsQ0FBQztnQkFaRDtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7d0JBQzFCLFFBQVEsRUFBRSwyTEFLSDtxQkFDUixDQUFDOztxQ0FBQTtnQkFJRix3QkFBQztZQUFELENBSEEsQUFHQyxJQUFBO1lBSEQsaURBR0MsQ0FBQTtZQUNELGdCQUFnQjtZQUVoQix5QkFBeUI7WUFRekI7Z0JBQUE7b0JBQ0UsTUFBQyxHQUFXLEtBQUssQ0FBQztvQkFDbEIsTUFBQyxHQUFXLE1BQU0sQ0FBQztnQkFDckIsQ0FBQztnQkFWRDtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSxpQkFBaUI7d0JBQzNCLFFBQVEsRUFBRSx1RkFHSDtxQkFDUixDQUFDOztzQ0FBQTtnQkFJRix5QkFBQztZQUFELENBSEEsQUFHQyxJQUFBO1lBSEQsbURBR0MsQ0FBQTtZQUNELGdCQUFnQjtZQUVoQiwwQkFBMEI7WUFRMUI7Z0JBQUE7b0JBQ0UsTUFBQyxHQUFXLEtBQUssQ0FBQztvQkFDbEIsTUFBQyxHQUFXLE1BQU0sQ0FBQztnQkFDckIsQ0FBQztnQkFWRDtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSxrQkFBa0I7d0JBQzVCLFFBQVEsRUFBRSxnSEFHSDtxQkFDUixDQUFDOzt1Q0FBQTtnQkFJRiwwQkFBQztZQUFELENBSEEsQUFHQyxJQUFBO1lBSEQscURBR0MsQ0FBQTtZQUNELGdCQUFnQjtZQWVoQjtnQkFBQTtnQkFDQSxDQUFDO2dCQWREO29CQUFDLGdCQUFTLENBQUM7d0JBQ1QsUUFBUSxFQUFFLGFBQWE7d0JBQ3ZCLFVBQVUsRUFBRSxDQUFDLGlCQUFpQixFQUFFLGtCQUFrQixFQUFFLG1CQUFtQixDQUFDO3dCQUN4RSxRQUFRLEVBQUUsMFFBUVQ7cUJBQ0YsQ0FBQzs7MEJBQUE7Z0JBRUYsYUFBQztZQUFELENBREEsQUFDQyxJQUFBO1lBREQsMkJBQ0MsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9leGFtcGxlcy9jb3JlL3BpcGVzL3RzL251bWJlcl9waXBlL251bWJlcl9waXBlX2V4YW1wbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgcHJvdmlkZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge2Jvb3RzdHJhcH0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vYnJvd3Nlcic7XG5cbi8vICNkb2NyZWdpb24gTnVtYmVyUGlwZVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnVtYmVyLWV4YW1wbGUnLFxuICB0ZW1wbGF0ZTogYDxkaXY+XG4gICAgPHA+ZSAobm8gZm9ybWF0dGluZyk6IHt7ZX19PC9wPlxuICAgIDxwPmUgKDMuMS01KToge3tlIHwgbnVtYmVyOiczLjEtNSd9fTwvcD5cbiAgICA8cD5waSAobm8gZm9ybWF0dGluZyk6IHt7cGl9fTwvcD5cbiAgICA8cD5waSAoMy41LTUpOiB7e3BpIHwgbnVtYmVyOiczLjUtNSd9fTwvcD5cbiAgPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBOdW1iZXJQaXBlRXhhbXBsZSB7XG4gIHBpOiBudW1iZXIgPSAzLjE0MTtcbiAgZTogbnVtYmVyID0gMi43MTgyODE4Mjg0NTkwNDU7XG59XG4vLyAjZW5kZG9jcmVnaW9uXG5cbi8vICNkb2NyZWdpb24gUGVyY2VudFBpcGVcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BlcmNlbnQtZXhhbXBsZScsXG4gIHRlbXBsYXRlOiBgPGRpdj5cbiAgICA8cD5BOiB7e2EgfCBwZXJjZW50fX08L3A+XG4gICAgPHA+Qjoge3tiIHwgcGVyY2VudDonNC4zLTUnfX08L3A+XG4gIDwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgUGVyY2VudFBpcGVFeGFtcGxlIHtcbiAgYTogbnVtYmVyID0gMC4yNTk7XG4gIGI6IG51bWJlciA9IDEuMzQ5NTtcbn1cbi8vICNlbmRkb2NyZWdpb25cblxuLy8gI2RvY3JlZ2lvbiBDdXJyZW5jeVBpcGVcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N1cnJlbmN5LWV4YW1wbGUnLFxuICB0ZW1wbGF0ZTogYDxkaXY+XG4gICAgPHA+QToge3thIHwgY3VycmVuY3k6J1VTRCc6ZmFsc2V9fTwvcD5cbiAgICA8cD5COiB7e2IgfCBjdXJyZW5jeTonVVNEJzp0cnVlOic0LjItMid9fTwvcD5cbiAgPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBDdXJyZW5jeVBpcGVFeGFtcGxlIHtcbiAgYTogbnVtYmVyID0gMC4yNTk7XG4gIGI6IG51bWJlciA9IDEuMzQ5NTtcbn1cbi8vICNlbmRkb2NyZWdpb25cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZXhhbXBsZS1hcHAnLFxuICBkaXJlY3RpdmVzOiBbTnVtYmVyUGlwZUV4YW1wbGUsIFBlcmNlbnRQaXBlRXhhbXBsZSwgQ3VycmVuY3lQaXBlRXhhbXBsZV0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGgxPk51bWVyaWMgUGlwZSBFeGFtcGxlczwvaDE+XG4gICAgPGgyPk51bWJlclBpcGUgRXhhbXBsZTwvaDI+XG4gICAgPG51bWJlci1leGFtcGxlPjwvbnVtYmVyLWV4YW1wbGU+XG4gICAgPGgyPlBlcmNlbnRQaXBlIEV4YW1wbGU8L2gyPlxuICAgIDxwZXJjZW50LWV4YW1wbGU+PC9wZXJjZW50LWV4YW1wbGU+XG4gICAgPGgyPkN1cnJlbmN5UGlwZUV4YW1wbGU8L2gyPlxuICAgIDxjdXJyZW5jeS1leGFtcGxlPjwvY3VycmVuY3ktZXhhbXBsZT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBBcHBDbXAge1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgYm9vdHN0cmFwKEFwcENtcCk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
