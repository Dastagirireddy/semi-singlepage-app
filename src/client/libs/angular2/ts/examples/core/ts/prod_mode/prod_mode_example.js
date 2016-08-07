System.register(['angular2/core', 'angular2/platform/browser', './my_component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, browser_1, my_component_1;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (my_component_1_1) {
                my_component_1 = my_component_1_1;
            }],
        execute: function() {
            core_1.enableProdMode();
            browser_1.bootstrap(my_component_1.MyComponent);
        }
    }
});
// #enddocregion

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvY29yZS90cy9wcm9kX21vZGUvcHJvZF9tb2RlX2V4YW1wbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztZQUtBLHFCQUFjLEVBQUUsQ0FBQztZQUNqQixtQkFBUyxDQUFDLDBCQUFXLENBQUMsQ0FBQzs7OztBQUN2QixnQkFBZ0IiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9leGFtcGxlcy9jb3JlL3RzL3Byb2RfbW9kZS9wcm9kX21vZGVfZXhhbXBsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vICNkb2NyZWdpb24gZW5hYmxlUHJvZE1vZGVcbmltcG9ydCB7ZW5hYmxlUHJvZE1vZGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtib290c3RyYXB9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXInO1xuaW1wb3J0IHtNeUNvbXBvbmVudH0gZnJvbSAnLi9teV9jb21wb25lbnQnO1xuXG5lbmFibGVQcm9kTW9kZSgpO1xuYm9vdHN0cmFwKE15Q29tcG9uZW50KTtcbi8vICNlbmRkb2NyZWdpb25cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
