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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvY29yZS9waXBlcy90cy9udW1iZXJfcGlwZS9udW1iZXJfcGlwZV9leGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBK0RBO1FBQ0UsbUJBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRkQsdUJBRUMsQ0FBQTs7Ozs7Ozs7OztZQTlERCx3QkFBd0I7WUFVeEI7Z0JBQUE7b0JBQ0UsT0FBRSxHQUFXLEtBQUssQ0FBQztvQkFDbkIsTUFBQyxHQUFXLGlCQUFpQixDQUFDO2dCQUNoQyxDQUFDO2dCQVpEO29CQUFDLGdCQUFTLENBQUM7d0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjt3QkFDMUIsUUFBUSxFQUFFLDJMQUtIO3FCQUNSLENBQUM7O3FDQUFBO2dCQUlGLHdCQUFDO1lBQUQsQ0FIQSxBQUdDLElBQUE7WUFIRCxpREFHQyxDQUFBO1lBQ0QsZ0JBQWdCO1lBRWhCLHlCQUF5QjtZQVF6QjtnQkFBQTtvQkFDRSxNQUFDLEdBQVcsS0FBSyxDQUFDO29CQUNsQixNQUFDLEdBQVcsTUFBTSxDQUFDO2dCQUNyQixDQUFDO2dCQVZEO29CQUFDLGdCQUFTLENBQUM7d0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjt3QkFDM0IsUUFBUSxFQUFFLHVGQUdIO3FCQUNSLENBQUM7O3NDQUFBO2dCQUlGLHlCQUFDO1lBQUQsQ0FIQSxBQUdDLElBQUE7WUFIRCxtREFHQyxDQUFBO1lBQ0QsZ0JBQWdCO1lBRWhCLDBCQUEwQjtZQVExQjtnQkFBQTtvQkFDRSxNQUFDLEdBQVcsS0FBSyxDQUFDO29CQUNsQixNQUFDLEdBQVcsTUFBTSxDQUFDO2dCQUNyQixDQUFDO2dCQVZEO29CQUFDLGdCQUFTLENBQUM7d0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjt3QkFDNUIsUUFBUSxFQUFFLGdIQUdIO3FCQUNSLENBQUM7O3VDQUFBO2dCQUlGLDBCQUFDO1lBQUQsQ0FIQSxBQUdDLElBQUE7WUFIRCxxREFHQyxDQUFBO1lBQ0QsZ0JBQWdCO1lBZWhCO2dCQUFBO2dCQUNBLENBQUM7Z0JBZEQ7b0JBQUMsZ0JBQVMsQ0FBQzt3QkFDVCxRQUFRLEVBQUUsYUFBYTt3QkFDdkIsVUFBVSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsa0JBQWtCLEVBQUUsbUJBQW1CLENBQUM7d0JBQ3hFLFFBQVEsRUFBRSwwUUFRVDtxQkFDRixDQUFDOzswQkFBQTtnQkFFRixhQUFDO1lBQUQsQ0FEQSxBQUNDLElBQUE7WUFERCwyQkFDQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvY29yZS9waXBlcy90cy9udW1iZXJfcGlwZS9udW1iZXJfcGlwZV9leGFtcGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIHByb3ZpZGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtib290c3RyYXB9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXInO1xuXG4vLyAjZG9jcmVnaW9uIE51bWJlclBpcGVcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ251bWJlci1leGFtcGxlJyxcbiAgdGVtcGxhdGU6IGA8ZGl2PlxuICAgIDxwPmUgKG5vIGZvcm1hdHRpbmcpOiB7e2V9fTwvcD5cbiAgICA8cD5lICgzLjEtNSk6IHt7ZSB8IG51bWJlcjonMy4xLTUnfX08L3A+XG4gICAgPHA+cGkgKG5vIGZvcm1hdHRpbmcpOiB7e3BpfX08L3A+XG4gICAgPHA+cGkgKDMuNS01KToge3twaSB8IG51bWJlcjonMy41LTUnfX08L3A+XG4gIDwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgTnVtYmVyUGlwZUV4YW1wbGUge1xuICBwaTogbnVtYmVyID0gMy4xNDE7XG4gIGU6IG51bWJlciA9IDIuNzE4MjgxODI4NDU5MDQ1O1xufVxuLy8gI2VuZGRvY3JlZ2lvblxuXG4vLyAjZG9jcmVnaW9uIFBlcmNlbnRQaXBlXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwZXJjZW50LWV4YW1wbGUnLFxuICB0ZW1wbGF0ZTogYDxkaXY+XG4gICAgPHA+QToge3thIHwgcGVyY2VudH19PC9wPlxuICAgIDxwPkI6IHt7YiB8IHBlcmNlbnQ6JzQuMy01J319PC9wPlxuICA8L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIFBlcmNlbnRQaXBlRXhhbXBsZSB7XG4gIGE6IG51bWJlciA9IDAuMjU5O1xuICBiOiBudW1iZXIgPSAxLjM0OTU7XG59XG4vLyAjZW5kZG9jcmVnaW9uXG5cbi8vICNkb2NyZWdpb24gQ3VycmVuY3lQaXBlXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjdXJyZW5jeS1leGFtcGxlJyxcbiAgdGVtcGxhdGU6IGA8ZGl2PlxuICAgIDxwPkE6IHt7YSB8IGN1cnJlbmN5OidVU0QnOmZhbHNlfX08L3A+XG4gICAgPHA+Qjoge3tiIHwgY3VycmVuY3k6J1VTRCc6dHJ1ZTonNC4yLTInfX08L3A+XG4gIDwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgQ3VycmVuY3lQaXBlRXhhbXBsZSB7XG4gIGE6IG51bWJlciA9IDAuMjU5O1xuICBiOiBudW1iZXIgPSAxLjM0OTU7XG59XG4vLyAjZW5kZG9jcmVnaW9uXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2V4YW1wbGUtYXBwJyxcbiAgZGlyZWN0aXZlczogW051bWJlclBpcGVFeGFtcGxlLCBQZXJjZW50UGlwZUV4YW1wbGUsIEN1cnJlbmN5UGlwZUV4YW1wbGVdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxoMT5OdW1lcmljIFBpcGUgRXhhbXBsZXM8L2gxPlxuICAgIDxoMj5OdW1iZXJQaXBlIEV4YW1wbGU8L2gyPlxuICAgIDxudW1iZXItZXhhbXBsZT48L251bWJlci1leGFtcGxlPlxuICAgIDxoMj5QZXJjZW50UGlwZSBFeGFtcGxlPC9oMj5cbiAgICA8cGVyY2VudC1leGFtcGxlPjwvcGVyY2VudC1leGFtcGxlPlxuICAgIDxoMj5DdXJyZW5jeVBpcGVFeGFtcGxlPC9oMj5cbiAgICA8Y3VycmVuY3ktZXhhbXBsZT48L2N1cnJlbmN5LWV4YW1wbGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQXBwQ21wIHtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGJvb3RzdHJhcChBcHBDbXApO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
