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
    var JsonPipeExample, AppCmp;
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
            // #docregion JsonPipe
            JsonPipeExample = (function () {
                function JsonPipeExample() {
                    this.object = { foo: 'bar', baz: 'qux', nested: { xyz: 3, numbers: [1, 2, 3, 4, 5] } };
                }
                JsonPipeExample = __decorate([
                    core_1.Component({
                        selector: 'json-example',
                        template: "<div>\n    <p>Without JSON pipe:</p>\n    <pre>{{object}}</pre>\n    <p>With JSON pipe:</p>\n    <pre>{{object | json}}</pre>\n  </div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], JsonPipeExample);
                return JsonPipeExample;
            }());
            exports_1("JsonPipeExample", JsonPipeExample);
            // #enddocregion
            AppCmp = (function () {
                function AppCmp() {
                }
                AppCmp = __decorate([
                    core_1.Component({
                        selector: 'example-app',
                        directives: [JsonPipeExample],
                        template: "\n    <h1>JsonPipe Example</h1>\n    <json-example></json-example>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppCmp);
                return AppCmp;
            }());
            exports_1("AppCmp", AppCmp);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL2NvcmUvcGlwZXMvdHMvanNvbl9waXBlL2pzb25fcGlwZV9leGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBNkJBO1FBQ0UsbUJBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRkQsdUJBRUMsQ0FBQTs7Ozs7Ozs7OztZQTVCRCxzQkFBc0I7WUFVdEI7Z0JBQUE7b0JBQ0UsV0FBTSxHQUFXLEVBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUMsQ0FBQTtnQkFDdkYsQ0FBQztnQkFYRDtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSxjQUFjO3dCQUN4QixRQUFRLEVBQUUseUlBS0g7cUJBQ1IsQ0FBQzs7bUNBQUE7Z0JBR0Ysc0JBQUM7WUFBRCxDQUZBLEFBRUMsSUFBQTtZQUZELDZDQUVDLENBQUE7WUFDRCxnQkFBZ0I7WUFVaEI7Z0JBQUE7Z0JBQ0EsQ0FBQztnQkFURDtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSxhQUFhO3dCQUN2QixVQUFVLEVBQUUsQ0FBQyxlQUFlLENBQUM7d0JBQzdCLFFBQVEsRUFBRSx3RUFHVDtxQkFDRixDQUFDOzswQkFBQTtnQkFFRixhQUFDO1lBQUQsQ0FEQSxBQUNDLElBQUE7WUFERCwyQkFDQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL2NvcmUvcGlwZXMvdHMvanNvbl9waXBlL2pzb25fcGlwZV9leGFtcGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIHByb3ZpZGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtib290c3RyYXB9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXInO1xuXG4vLyAjZG9jcmVnaW9uIEpzb25QaXBlXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdqc29uLWV4YW1wbGUnLFxuICB0ZW1wbGF0ZTogYDxkaXY+XG4gICAgPHA+V2l0aG91dCBKU09OIHBpcGU6PC9wPlxuICAgIDxwcmU+e3tvYmplY3R9fTwvcHJlPlxuICAgIDxwPldpdGggSlNPTiBwaXBlOjwvcD5cbiAgICA8cHJlPnt7b2JqZWN0IHwganNvbn19PC9wcmU+XG4gIDwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgSnNvblBpcGVFeGFtcGxlIHtcbiAgb2JqZWN0OiBPYmplY3QgPSB7Zm9vOiAnYmFyJywgYmF6OiAncXV4JywgbmVzdGVkOiB7eHl6OiAzLCBudW1iZXJzOiBbMSwgMiwgMywgNCwgNV19fVxufVxuLy8gI2VuZGRvY3JlZ2lvblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdleGFtcGxlLWFwcCcsXG4gIGRpcmVjdGl2ZXM6IFtKc29uUGlwZUV4YW1wbGVdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxoMT5Kc29uUGlwZSBFeGFtcGxlPC9oMT5cbiAgICA8anNvbi1leGFtcGxlPjwvanNvbi1leGFtcGxlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIEFwcENtcCB7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBib290c3RyYXAoQXBwQ21wKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
