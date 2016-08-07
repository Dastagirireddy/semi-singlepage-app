System.register(['angular2/core', './ng_control', 'angular2/src/facade/lang'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, ng_control_1, lang_1;
    var NgControlStatus;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng_control_1_1) {
                ng_control_1 = ng_control_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * Directive automatically applied to Angular forms that sets CSS classes
             * based on control status (valid/invalid/dirty/etc).
             */
            NgControlStatus = (function () {
                function NgControlStatus(cd) {
                    this._cd = cd;
                }
                Object.defineProperty(NgControlStatus.prototype, "ngClassUntouched", {
                    get: function () {
                        return lang_1.isPresent(this._cd.control) ? this._cd.control.untouched : false;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgControlStatus.prototype, "ngClassTouched", {
                    get: function () {
                        return lang_1.isPresent(this._cd.control) ? this._cd.control.touched : false;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgControlStatus.prototype, "ngClassPristine", {
                    get: function () {
                        return lang_1.isPresent(this._cd.control) ? this._cd.control.pristine : false;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgControlStatus.prototype, "ngClassDirty", {
                    get: function () {
                        return lang_1.isPresent(this._cd.control) ? this._cd.control.dirty : false;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgControlStatus.prototype, "ngClassValid", {
                    get: function () {
                        return lang_1.isPresent(this._cd.control) ? this._cd.control.valid : false;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgControlStatus.prototype, "ngClassInvalid", {
                    get: function () {
                        return lang_1.isPresent(this._cd.control) ? !this._cd.control.valid : false;
                    },
                    enumerable: true,
                    configurable: true
                });
                NgControlStatus = __decorate([
                    core_1.Directive({
                        selector: '[ngControl],[ngModel],[ngFormControl]',
                        host: {
                            '[class.ng-untouched]': 'ngClassUntouched',
                            '[class.ng-touched]': 'ngClassTouched',
                            '[class.ng-pristine]': 'ngClassPristine',
                            '[class.ng-dirty]': 'ngClassDirty',
                            '[class.ng-valid]': 'ngClassValid',
                            '[class.ng-invalid]': 'ngClassInvalid'
                        }
                    }),
                    __param(0, core_1.Self()), 
                    __metadata('design:paramtypes', [ng_control_1.NgControl])
                ], NgControlStatus);
                return NgControlStatus;
            }());
            exports_1("NgControlStatus", NgControlStatus);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZm9ybXMvZGlyZWN0aXZlcy9uZ19jb250cm9sX3N0YXR1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUlBOzs7ZUFHRztZQVlIO2dCQUdFLHlCQUFvQixFQUFhO29CQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO2dCQUFDLENBQUM7Z0JBRXJELHNCQUFJLDZDQUFnQjt5QkFBcEI7d0JBQ0UsTUFBTSxDQUFDLGdCQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO29CQUMxRSxDQUFDOzs7bUJBQUE7Z0JBQ0Qsc0JBQUksMkNBQWM7eUJBQWxCO3dCQUNFLE1BQU0sQ0FBQyxnQkFBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztvQkFDeEUsQ0FBQzs7O21CQUFBO2dCQUNELHNCQUFJLDRDQUFlO3lCQUFuQjt3QkFDRSxNQUFNLENBQUMsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7b0JBQ3pFLENBQUM7OzttQkFBQTtnQkFDRCxzQkFBSSx5Q0FBWTt5QkFBaEI7d0JBQ0UsTUFBTSxDQUFDLGdCQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUN0RSxDQUFDOzs7bUJBQUE7Z0JBQ0Qsc0JBQUkseUNBQVk7eUJBQWhCO3dCQUNFLE1BQU0sQ0FBQyxnQkFBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDdEUsQ0FBQzs7O21CQUFBO2dCQUNELHNCQUFJLDJDQUFjO3lCQUFsQjt3QkFDRSxNQUFNLENBQUMsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDdkUsQ0FBQzs7O21CQUFBO2dCQWpDSDtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSx1Q0FBdUM7d0JBQ2pELElBQUksRUFBRTs0QkFDSixzQkFBc0IsRUFBRSxrQkFBa0I7NEJBQzFDLG9CQUFvQixFQUFFLGdCQUFnQjs0QkFDdEMscUJBQXFCLEVBQUUsaUJBQWlCOzRCQUN4QyxrQkFBa0IsRUFBRSxjQUFjOzRCQUNsQyxrQkFBa0IsRUFBRSxjQUFjOzRCQUNsQyxvQkFBb0IsRUFBRSxnQkFBZ0I7eUJBQ3ZDO3FCQUNGLENBQUM7K0JBSWEsV0FBSSxFQUFFOzttQ0FKbkI7Z0JBd0JGLHNCQUFDO1lBQUQsQ0F2QkEsQUF1QkMsSUFBQTtZQXZCRCw2Q0F1QkMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tbW9uL2Zvcm1zL2RpcmVjdGl2ZXMvbmdfY29udHJvbF9zdGF0dXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgU2VsZn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge05nQ29udHJvbH0gZnJvbSAnLi9uZ19jb250cm9sJztcbmltcG9ydCB7aXNCbGFuaywgaXNQcmVzZW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG4vKipcbiAqIERpcmVjdGl2ZSBhdXRvbWF0aWNhbGx5IGFwcGxpZWQgdG8gQW5ndWxhciBmb3JtcyB0aGF0IHNldHMgQ1NTIGNsYXNzZXNcbiAqIGJhc2VkIG9uIGNvbnRyb2wgc3RhdHVzICh2YWxpZC9pbnZhbGlkL2RpcnR5L2V0YykuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ0NvbnRyb2xdLFtuZ01vZGVsXSxbbmdGb3JtQ29udHJvbF0nLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5uZy11bnRvdWNoZWRdJzogJ25nQ2xhc3NVbnRvdWNoZWQnLFxuICAgICdbY2xhc3MubmctdG91Y2hlZF0nOiAnbmdDbGFzc1RvdWNoZWQnLFxuICAgICdbY2xhc3MubmctcHJpc3RpbmVdJzogJ25nQ2xhc3NQcmlzdGluZScsXG4gICAgJ1tjbGFzcy5uZy1kaXJ0eV0nOiAnbmdDbGFzc0RpcnR5JyxcbiAgICAnW2NsYXNzLm5nLXZhbGlkXSc6ICduZ0NsYXNzVmFsaWQnLFxuICAgICdbY2xhc3MubmctaW52YWxpZF0nOiAnbmdDbGFzc0ludmFsaWQnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTmdDb250cm9sU3RhdHVzIHtcbiAgcHJpdmF0ZSBfY2Q6IE5nQ29udHJvbDtcblxuICBjb25zdHJ1Y3RvcihAU2VsZigpIGNkOiBOZ0NvbnRyb2wpIHsgdGhpcy5fY2QgPSBjZDsgfVxuXG4gIGdldCBuZ0NsYXNzVW50b3VjaGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5fY2QuY29udHJvbCkgPyB0aGlzLl9jZC5jb250cm9sLnVudG91Y2hlZCA6IGZhbHNlO1xuICB9XG4gIGdldCBuZ0NsYXNzVG91Y2hlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuX2NkLmNvbnRyb2wpID8gdGhpcy5fY2QuY29udHJvbC50b3VjaGVkIDogZmFsc2U7XG4gIH1cbiAgZ2V0IG5nQ2xhc3NQcmlzdGluZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuX2NkLmNvbnRyb2wpID8gdGhpcy5fY2QuY29udHJvbC5wcmlzdGluZSA6IGZhbHNlO1xuICB9XG4gIGdldCBuZ0NsYXNzRGlydHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLl9jZC5jb250cm9sKSA/IHRoaXMuX2NkLmNvbnRyb2wuZGlydHkgOiBmYWxzZTtcbiAgfVxuICBnZXQgbmdDbGFzc1ZhbGlkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5fY2QuY29udHJvbCkgPyB0aGlzLl9jZC5jb250cm9sLnZhbGlkIDogZmFsc2U7XG4gIH1cbiAgZ2V0IG5nQ2xhc3NJbnZhbGlkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5fY2QuY29udHJvbCkgPyAhdGhpcy5fY2QuY29udHJvbC52YWxpZCA6IGZhbHNlO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
