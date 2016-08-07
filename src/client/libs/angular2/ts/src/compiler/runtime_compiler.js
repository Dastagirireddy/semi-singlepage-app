System.register(['angular2/src/core/linker/compiler', 'angular2/src/core/linker/view_ref', './template_compiler', 'angular2/src/core/di'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var compiler_1, view_ref_1, template_compiler_1, di_1;
    var RuntimeCompiler, RuntimeCompiler_;
    return {
        setters:[
            function (compiler_1_1) {
                compiler_1 = compiler_1_1;
            },
            function (view_ref_1_1) {
                view_ref_1 = view_ref_1_1;
            },
            function (template_compiler_1_1) {
                template_compiler_1 = template_compiler_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            }],
        execute: function() {
            RuntimeCompiler = (function (_super) {
                __extends(RuntimeCompiler, _super);
                function RuntimeCompiler() {
                    _super.apply(this, arguments);
                }
                return RuntimeCompiler;
            }(compiler_1.Compiler));
            exports_1("RuntimeCompiler", RuntimeCompiler);
            RuntimeCompiler_ = (function (_super) {
                __extends(RuntimeCompiler_, _super);
                function RuntimeCompiler_(_templateCompiler) {
                    _super.call(this);
                    this._templateCompiler = _templateCompiler;
                }
                RuntimeCompiler_.prototype.compileInHost = function (componentType) {
                    return this._templateCompiler.compileHostComponentRuntime(componentType)
                        .then(function (hostViewFactory) { return new view_ref_1.HostViewFactoryRef_(hostViewFactory); });
                };
                RuntimeCompiler_.prototype.clearCache = function () {
                    _super.prototype.clearCache.call(this);
                    this._templateCompiler.clearCache();
                };
                RuntimeCompiler_ = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [template_compiler_1.TemplateCompiler])
                ], RuntimeCompiler_);
                return RuntimeCompiler_;
            }(compiler_1.Compiler_));
            exports_1("RuntimeCompiler_", RuntimeCompiler_);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL3J1bnRpbWVfY29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQU9BO2dCQUE4QyxtQ0FBUTtnQkFBdEQ7b0JBQThDLDhCQUFRO2dCQUd0RCxDQUFDO2dCQUFELHNCQUFDO1lBQUQsQ0FIQSxBQUdDLENBSDZDLG1CQUFRLEdBR3JEO1lBSEQsNkNBR0MsQ0FBQTtZQUdEO2dCQUFzQyxvQ0FBUztnQkFDN0MsMEJBQW9CLGlCQUFtQztvQkFBSSxpQkFBTyxDQUFDO29CQUEvQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO2dCQUFhLENBQUM7Z0JBRXJFLHdDQUFhLEdBQWIsVUFBYyxhQUFtQjtvQkFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQywyQkFBMkIsQ0FBQyxhQUFhLENBQUM7eUJBQ25FLElBQUksQ0FBQyxVQUFBLGVBQWUsSUFBSSxPQUFBLElBQUksOEJBQW1CLENBQUMsZUFBZSxDQUFDLEVBQXhDLENBQXdDLENBQUMsQ0FBQztnQkFDekUsQ0FBQztnQkFFRCxxQ0FBVSxHQUFWO29CQUNFLGdCQUFLLENBQUMsVUFBVSxXQUFFLENBQUM7b0JBQ25CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDdEMsQ0FBQztnQkFaSDtvQkFBQyxlQUFVLEVBQUU7O29DQUFBO2dCQWFiLHVCQUFDO1lBQUQsQ0FaQSxBQVlDLENBWnFDLG9CQUFTLEdBWTlDO1lBWkQsK0NBWUMsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9ydW50aW1lX2NvbXBpbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21waWxlciwgQ29tcGlsZXJffSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvY29tcGlsZXInO1xuaW1wb3J0IHtIb3N0Vmlld0ZhY3RvcnlSZWYsIEhvc3RWaWV3RmFjdG9yeVJlZl99IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci92aWV3X3JlZic7XG5pbXBvcnQge1RlbXBsYXRlQ29tcGlsZXJ9IGZyb20gJy4vdGVtcGxhdGVfY29tcGlsZXInO1xuXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7VHlwZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJ1bnRpbWVDb21waWxlciBleHRlbmRzIENvbXBpbGVyIHtcbiAgYWJzdHJhY3QgY29tcGlsZUluSG9zdChjb21wb25lbnRUeXBlOiBUeXBlKTogUHJvbWlzZTxIb3N0Vmlld0ZhY3RvcnlSZWY+O1xuICBhYnN0cmFjdCBjbGVhckNhY2hlKCk7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSdW50aW1lQ29tcGlsZXJfIGV4dGVuZHMgQ29tcGlsZXJfIGltcGxlbWVudHMgUnVudGltZUNvbXBpbGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfdGVtcGxhdGVDb21waWxlcjogVGVtcGxhdGVDb21waWxlcikgeyBzdXBlcigpOyB9XG5cbiAgY29tcGlsZUluSG9zdChjb21wb25lbnRUeXBlOiBUeXBlKTogUHJvbWlzZTxIb3N0Vmlld0ZhY3RvcnlSZWZfPiB7XG4gICAgcmV0dXJuIHRoaXMuX3RlbXBsYXRlQ29tcGlsZXIuY29tcGlsZUhvc3RDb21wb25lbnRSdW50aW1lKGNvbXBvbmVudFR5cGUpXG4gICAgICAgIC50aGVuKGhvc3RWaWV3RmFjdG9yeSA9PiBuZXcgSG9zdFZpZXdGYWN0b3J5UmVmXyhob3N0Vmlld0ZhY3RvcnkpKTtcbiAgfVxuXG4gIGNsZWFyQ2FjaGUoKSB7XG4gICAgc3VwZXIuY2xlYXJDYWNoZSgpO1xuICAgIHRoaXMuX3RlbXBsYXRlQ29tcGlsZXIuY2xlYXJDYWNoZSgpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
