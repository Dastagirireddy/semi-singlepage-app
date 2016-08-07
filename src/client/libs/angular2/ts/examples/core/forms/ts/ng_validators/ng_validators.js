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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvY29yZS9mb3Jtcy90cy9uZ192YWxpZGF0b3JzL25nX3ZhbGlkYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQUlJLEtBQUssRUFDTCxXQUFXOzs7Ozs7Ozs7Ozs7O1lBRFgsS0FBSyxHQUFhLElBQUksQ0FBQztZQUN2QixXQUFXLEdBQVEsSUFBSSxDQUFDO1lBRTVCLDJCQUEyQjtZQUMzQixtQkFBUyxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksZUFBUSxDQUFDLHNCQUFhLEVBQUUsRUFBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztBQUN0RixnQkFBZ0IiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9leGFtcGxlcy9jb3JlL2Zvcm1zL3RzL25nX3ZhbGlkYXRvcnMvbmdfdmFsaWRhdG9ycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Ym9vdHN0cmFwfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9icm93c2VyJztcbmltcG9ydCB7TkdfVkFMSURBVE9SU30gZnJvbSAnYW5ndWxhcjIvY29tbW9uJztcbmltcG9ydCB7UHJvdmlkZXJ9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuXG5sZXQgTXlBcHA6IEZ1bmN0aW9uID0gbnVsbDtcbmxldCBteVZhbGlkYXRvcjogYW55ID0gbnVsbDtcblxuLy8gI2RvY3JlZ2lvbiBuZ192YWxpZGF0b3JzXG5ib290c3RyYXAoTXlBcHAsIFtuZXcgUHJvdmlkZXIoTkdfVkFMSURBVE9SUywge3VzZVZhbHVlOiBteVZhbGlkYXRvciwgbXVsdGk6IHRydWV9KV0pO1xuLy8gI2VuZGRvY3JlZ2lvblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
