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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvY29yZS9waXBlcy90cy9qc29uX3BpcGUvanNvbl9waXBlX2V4YW1wbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUE2QkE7UUFDRSxtQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFGRCx1QkFFQyxDQUFBOzs7Ozs7Ozs7O1lBNUJELHNCQUFzQjtZQVV0QjtnQkFBQTtvQkFDRSxXQUFNLEdBQVcsRUFBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBQyxDQUFBO2dCQUN2RixDQUFDO2dCQVhEO29CQUFDLGdCQUFTLENBQUM7d0JBQ1QsUUFBUSxFQUFFLGNBQWM7d0JBQ3hCLFFBQVEsRUFBRSx5SUFLSDtxQkFDUixDQUFDOzttQ0FBQTtnQkFHRixzQkFBQztZQUFELENBRkEsQUFFQyxJQUFBO1lBRkQsNkNBRUMsQ0FBQTtZQUNELGdCQUFnQjtZQVVoQjtnQkFBQTtnQkFDQSxDQUFDO2dCQVREO29CQUFDLGdCQUFTLENBQUM7d0JBQ1QsUUFBUSxFQUFFLGFBQWE7d0JBQ3ZCLFVBQVUsRUFBRSxDQUFDLGVBQWUsQ0FBQzt3QkFDN0IsUUFBUSxFQUFFLHdFQUdUO3FCQUNGLENBQUM7OzBCQUFBO2dCQUVGLGFBQUM7WUFBRCxDQURBLEFBQ0MsSUFBQTtZQURELDJCQUNDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9leGFtcGxlcy9jb3JlL3BpcGVzL3RzL2pzb25fcGlwZS9qc29uX3BpcGVfZXhhbXBsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBwcm92aWRlfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Ym9vdHN0cmFwfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9icm93c2VyJztcblxuLy8gI2RvY3JlZ2lvbiBKc29uUGlwZVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnanNvbi1leGFtcGxlJyxcbiAgdGVtcGxhdGU6IGA8ZGl2PlxuICAgIDxwPldpdGhvdXQgSlNPTiBwaXBlOjwvcD5cbiAgICA8cHJlPnt7b2JqZWN0fX08L3ByZT5cbiAgICA8cD5XaXRoIEpTT04gcGlwZTo8L3A+XG4gICAgPHByZT57e29iamVjdCB8IGpzb259fTwvcHJlPlxuICA8L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIEpzb25QaXBlRXhhbXBsZSB7XG4gIG9iamVjdDogT2JqZWN0ID0ge2ZvbzogJ2JhcicsIGJhejogJ3F1eCcsIG5lc3RlZDoge3h5ejogMywgbnVtYmVyczogWzEsIDIsIDMsIDQsIDVdfX1cbn1cbi8vICNlbmRkb2NyZWdpb25cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZXhhbXBsZS1hcHAnLFxuICBkaXJlY3RpdmVzOiBbSnNvblBpcGVFeGFtcGxlXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aDE+SnNvblBpcGUgRXhhbXBsZTwvaDE+XG4gICAgPGpzb24tZXhhbXBsZT48L2pzb24tZXhhbXBsZT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBBcHBDbXAge1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgYm9vdHN0cmFwKEFwcENtcCk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
