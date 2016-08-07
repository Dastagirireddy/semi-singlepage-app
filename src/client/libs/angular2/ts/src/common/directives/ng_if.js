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
    var NgIf;
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
             * Removes or recreates a portion of the DOM tree based on an {expression}.
             *
             * If the expression assigned to `ngIf` evaluates to a false value then the element
             * is removed from the DOM, otherwise a clone of the element is reinserted into the DOM.
             *
             * ### Example ([live demo](http://plnkr.co/edit/fe0kgemFBtmQOY31b4tw?p=preview)):
             *
             * ```
             * <div *ngIf="errorCount > 0" class="error">
             *   <!-- Error message displayed when the errorCount property on the current context is greater
             * than 0. -->
             *   {{errorCount}} errors detected
             * </div>
             * ```
             *
             * ### Syntax
             *
             * - `<div *ngIf="condition">...</div>`
             * - `<div template="ngIf condition">...</div>`
             * - `<template [ngIf]="condition"><div>...</div></template>`
             */
            NgIf = (function () {
                function NgIf(_viewContainer, _templateRef) {
                    this._viewContainer = _viewContainer;
                    this._templateRef = _templateRef;
                    this._prevCondition = null;
                }
                Object.defineProperty(NgIf.prototype, "ngIf", {
                    set: function (newCondition /* boolean */) {
                        if (newCondition && (lang_1.isBlank(this._prevCondition) || !this._prevCondition)) {
                            this._prevCondition = true;
                            this._viewContainer.createEmbeddedView(this._templateRef);
                        }
                        else if (!newCondition && (lang_1.isBlank(this._prevCondition) || this._prevCondition)) {
                            this._prevCondition = false;
                            this._viewContainer.clear();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                NgIf = __decorate([
                    core_1.Directive({ selector: '[ngIf]', inputs: ['ngIf'] }), 
                    __metadata('design:paramtypes', [core_1.ViewContainerRef, core_1.TemplateRef])
                ], NgIf);
                return NgIf;
            }());
            exports_1("NgIf", NgIf);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9kaXJlY3RpdmVzL25nX2lmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQXFCRztZQUVIO2dCQUdFLGNBQW9CLGNBQWdDLEVBQVUsWUFBeUI7b0JBQW5FLG1CQUFjLEdBQWQsY0FBYyxDQUFrQjtvQkFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYTtvQkFGL0UsbUJBQWMsR0FBWSxJQUFJLENBQUM7Z0JBRW1ELENBQUM7Z0JBRTNGLHNCQUFJLHNCQUFJO3lCQUFSLFVBQVMsWUFBaUIsQ0FBQyxhQUFhO3dCQUN0QyxFQUFFLENBQUMsQ0FBQyxZQUFZLElBQUksQ0FBQyxjQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDM0UsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7NEJBQzNCLElBQUksQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO3dCQUM1RCxDQUFDO3dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksSUFBSSxDQUFDLGNBQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDbEYsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7NEJBQzVCLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBQzlCLENBQUM7b0JBQ0gsQ0FBQzs7O21CQUFBO2dCQWRIO29CQUFDLGdCQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUM7O3dCQUFBO2dCQWVsRCxXQUFDO1lBQUQsQ0FkQSxBQWNDLElBQUE7WUFkRCx1QkFjQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9kaXJlY3RpdmVzL25nX2lmLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYsIFRlbXBsYXRlUmVmfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7aXNCbGFua30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuLyoqXG4gKiBSZW1vdmVzIG9yIHJlY3JlYXRlcyBhIHBvcnRpb24gb2YgdGhlIERPTSB0cmVlIGJhc2VkIG9uIGFuIHtleHByZXNzaW9ufS5cbiAqXG4gKiBJZiB0aGUgZXhwcmVzc2lvbiBhc3NpZ25lZCB0byBgbmdJZmAgZXZhbHVhdGVzIHRvIGEgZmFsc2UgdmFsdWUgdGhlbiB0aGUgZWxlbWVudFxuICogaXMgcmVtb3ZlZCBmcm9tIHRoZSBET00sIG90aGVyd2lzZSBhIGNsb25lIG9mIHRoZSBlbGVtZW50IGlzIHJlaW5zZXJ0ZWQgaW50byB0aGUgRE9NLlxuICpcbiAqICMjIyBFeGFtcGxlIChbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC9mZTBrZ2VtRkJ0bVFPWTMxYjR0dz9wPXByZXZpZXcpKTpcbiAqXG4gKiBgYGBcbiAqIDxkaXYgKm5nSWY9XCJlcnJvckNvdW50ID4gMFwiIGNsYXNzPVwiZXJyb3JcIj5cbiAqICAgPCEtLSBFcnJvciBtZXNzYWdlIGRpc3BsYXllZCB3aGVuIHRoZSBlcnJvckNvdW50IHByb3BlcnR5IG9uIHRoZSBjdXJyZW50IGNvbnRleHQgaXMgZ3JlYXRlclxuICogdGhhbiAwLiAtLT5cbiAqICAge3tlcnJvckNvdW50fX0gZXJyb3JzIGRldGVjdGVkXG4gKiA8L2Rpdj5cbiAqIGBgYFxuICpcbiAqICMjIyBTeW50YXhcbiAqXG4gKiAtIGA8ZGl2ICpuZ0lmPVwiY29uZGl0aW9uXCI+Li4uPC9kaXY+YFxuICogLSBgPGRpdiB0ZW1wbGF0ZT1cIm5nSWYgY29uZGl0aW9uXCI+Li4uPC9kaXY+YFxuICogLSBgPHRlbXBsYXRlIFtuZ0lmXT1cImNvbmRpdGlvblwiPjxkaXY+Li4uPC9kaXY+PC90ZW1wbGF0ZT5gXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25nSWZdJywgaW5wdXRzOiBbJ25nSWYnXX0pXG5leHBvcnQgY2xhc3MgTmdJZiB7XG4gIHByaXZhdGUgX3ByZXZDb25kaXRpb246IGJvb2xlYW4gPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3ZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgX3RlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZikge31cblxuICBzZXQgbmdJZihuZXdDb25kaXRpb246IGFueSAvKiBib29sZWFuICovKSB7XG4gICAgaWYgKG5ld0NvbmRpdGlvbiAmJiAoaXNCbGFuayh0aGlzLl9wcmV2Q29uZGl0aW9uKSB8fCAhdGhpcy5fcHJldkNvbmRpdGlvbikpIHtcbiAgICAgIHRoaXMuX3ByZXZDb25kaXRpb24gPSB0cnVlO1xuICAgICAgdGhpcy5fdmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy5fdGVtcGxhdGVSZWYpO1xuICAgIH0gZWxzZSBpZiAoIW5ld0NvbmRpdGlvbiAmJiAoaXNCbGFuayh0aGlzLl9wcmV2Q29uZGl0aW9uKSB8fCB0aGlzLl9wcmV2Q29uZGl0aW9uKSkge1xuICAgICAgdGhpcy5fcHJldkNvbmRpdGlvbiA9IGZhbHNlO1xuICAgICAgdGhpcy5fdmlld0NvbnRhaW5lci5jbGVhcigpO1xuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
