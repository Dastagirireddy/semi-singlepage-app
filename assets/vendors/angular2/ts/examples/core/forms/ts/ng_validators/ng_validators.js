System.register(['angular2/platform/browser', 'angular2/common', 'angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, common_1, core_1;
    var MyApp, myValidator;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            MyApp = null;
            myValidator = null;
            // #docregion ng_validators
            browser_1.bootstrap(MyApp, [new core_1.Provider(common_1.NG_VALIDATORS, { useValue: myValidator, multi: true })]);
        }
    }
});
// #enddocregion

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL2NvcmUvZm9ybXMvdHMvbmdfdmFsaWRhdG9ycy9uZ192YWxpZGF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFJSSxLQUFLLEVBQ0wsV0FBVzs7Ozs7Ozs7Ozs7OztZQURYLEtBQUssR0FBYSxJQUFJLENBQUM7WUFDdkIsV0FBVyxHQUFRLElBQUksQ0FBQztZQUU1QiwyQkFBMkI7WUFDM0IsbUJBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLGVBQVEsQ0FBQyxzQkFBYSxFQUFFLEVBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7QUFDdEYsZ0JBQWdCIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL2NvcmUvZm9ybXMvdHMvbmdfdmFsaWRhdG9ycy9uZ192YWxpZGF0b3JzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtib290c3RyYXB9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXInO1xuaW1wb3J0IHtOR19WQUxJREFUT1JTfSBmcm9tICdhbmd1bGFyMi9jb21tb24nO1xuaW1wb3J0IHtQcm92aWRlcn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5cbmxldCBNeUFwcDogRnVuY3Rpb24gPSBudWxsO1xubGV0IG15VmFsaWRhdG9yOiBhbnkgPSBudWxsO1xuXG4vLyAjZG9jcmVnaW9uIG5nX3ZhbGlkYXRvcnNcbmJvb3RzdHJhcChNeUFwcCwgW25ldyBQcm92aWRlcihOR19WQUxJREFUT1JTLCB7dXNlVmFsdWU6IG15VmFsaWRhdG9yLCBtdWx0aTogdHJ1ZX0pXSk7XG4vLyAjZW5kZG9jcmVnaW9uXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
