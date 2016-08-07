System.register(['angular2/core', 'angular2/src/facade/lang'], function(exports_1, context_1) {
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
    var core_1, lang_1;
    var NgTemplateOutlet;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * Creates and inserts an embedded view based on a prepared `TemplateRef`.
             *
             * ### Syntax
             * - `<template [ngTemplateOutlet]="templateRefExpression"></template>`
             */
            NgTemplateOutlet = (function () {
                function NgTemplateOutlet(_viewContainerRef) {
                    this._viewContainerRef = _viewContainerRef;
                }
                Object.defineProperty(NgTemplateOutlet.prototype, "ngTemplateOutlet", {
                    set: function (templateRef) {
                        if (lang_1.isPresent(this._insertedViewRef)) {
                            this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._insertedViewRef));
                        }
                        if (lang_1.isPresent(templateRef)) {
                            this._insertedViewRef = this._viewContainerRef.createEmbeddedView(templateRef);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', core_1.TemplateRef), 
                    __metadata('design:paramtypes', [core_1.TemplateRef])
                ], NgTemplateOutlet.prototype, "ngTemplateOutlet", null);
                NgTemplateOutlet = __decorate([
                    core_1.Directive({ selector: '[ngTemplateOutlet]' }), 
                    __metadata('design:paramtypes', [core_1.ViewContainerRef])
                ], NgTemplateOutlet);
                return NgTemplateOutlet;
            }());
            exports_1("NgTemplateOutlet", NgTemplateOutlet);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZGlyZWN0aXZlcy9uZ190ZW1wbGF0ZV9vdXRsZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFHQTs7Ozs7ZUFLRztZQUVIO2dCQUdFLDBCQUFvQixpQkFBbUM7b0JBQW5DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7Z0JBQUcsQ0FBQztnQkFHM0Qsc0JBQUksOENBQWdCO3lCQUFwQixVQUFxQixXQUF3Qjt3QkFDM0MsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3JDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO3dCQUN2RixDQUFDO3dCQUVELEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUMzQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUNqRixDQUFDO29CQUNILENBQUM7OzttQkFBQTtnQkFURDtvQkFBQyxZQUFLLEVBQUU7Ozt3RUFBQTtnQkFOVjtvQkFBQyxnQkFBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLG9CQUFvQixFQUFDLENBQUM7O29DQUFBO2dCQWdCNUMsdUJBQUM7WUFBRCxDQWZBLEFBZUMsSUFBQTtZQWZELCtDQWVDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9kaXJlY3RpdmVzL25nX3RlbXBsYXRlX291dGxldC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBJbnB1dCwgVmlld0NvbnRhaW5lclJlZiwgVmlld1JlZiwgVGVtcGxhdGVSZWZ9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtpc1ByZXNlbnR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgaW5zZXJ0cyBhbiBlbWJlZGRlZCB2aWV3IGJhc2VkIG9uIGEgcHJlcGFyZWQgYFRlbXBsYXRlUmVmYC5cbiAqXG4gKiAjIyMgU3ludGF4XG4gKiAtIGA8dGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVSZWZFeHByZXNzaW9uXCI+PC90ZW1wbGF0ZT5gXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25nVGVtcGxhdGVPdXRsZXRdJ30pXG5leHBvcnQgY2xhc3MgTmdUZW1wbGF0ZU91dGxldCB7XG4gIHByaXZhdGUgX2luc2VydGVkVmlld1JlZjogVmlld1JlZjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7fVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuZ1RlbXBsYXRlT3V0bGV0KHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZikge1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5faW5zZXJ0ZWRWaWV3UmVmKSkge1xuICAgICAgdGhpcy5fdmlld0NvbnRhaW5lclJlZi5yZW1vdmUodGhpcy5fdmlld0NvbnRhaW5lclJlZi5pbmRleE9mKHRoaXMuX2luc2VydGVkVmlld1JlZikpO1xuICAgIH1cblxuICAgIGlmIChpc1ByZXNlbnQodGVtcGxhdGVSZWYpKSB7XG4gICAgICB0aGlzLl9pbnNlcnRlZFZpZXdSZWYgPSB0aGlzLl92aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyh0ZW1wbGF0ZVJlZik7XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
