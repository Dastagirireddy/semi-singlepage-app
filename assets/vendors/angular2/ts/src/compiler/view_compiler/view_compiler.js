System.register(['angular2/src/core/di', './compile_element', './compile_view', './view_builder', './view_binder', '../config'], function(exports_1, context_1) {
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
    var di_1, compile_element_1, compile_view_1, view_builder_1, view_binder_1, config_1;
    var ViewCompileResult, ViewCompiler;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (compile_element_1_1) {
                compile_element_1 = compile_element_1_1;
            },
            function (compile_view_1_1) {
                compile_view_1 = compile_view_1_1;
            },
            function (view_builder_1_1) {
                view_builder_1 = view_builder_1_1;
            },
            function (view_binder_1_1) {
                view_binder_1 = view_binder_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            }],
        execute: function() {
            ViewCompileResult = (function () {
                function ViewCompileResult(statements, viewFactoryVar, dependencies) {
                    this.statements = statements;
                    this.viewFactoryVar = viewFactoryVar;
                    this.dependencies = dependencies;
                }
                return ViewCompileResult;
            }());
            exports_1("ViewCompileResult", ViewCompileResult);
            ViewCompiler = (function () {
                function ViewCompiler(_genConfig) {
                    this._genConfig = _genConfig;
                }
                ViewCompiler.prototype.compileComponent = function (component, template, styles, pipes) {
                    var statements = [];
                    var dependencies = [];
                    var view = new compile_view_1.CompileView(component, this._genConfig, pipes, styles, 0, compile_element_1.CompileElement.createNull(), []);
                    view_builder_1.buildView(view, template, dependencies);
                    // Need to separate binding from creation to be able to refer to
                    // variables that have been declared after usage.
                    view_binder_1.bindView(view, template);
                    view_builder_1.finishView(view, statements);
                    return new ViewCompileResult(statements, view.viewFactory.name, dependencies);
                };
                ViewCompiler = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [config_1.CompilerConfig])
                ], ViewCompiler);
                return ViewCompiler;
            }());
            exports_1("ViewCompiler", ViewCompiler);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci92aWV3X2NvbXBpbGVyL3ZpZXdfY29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFhQTtnQkFDRSwyQkFBbUIsVUFBeUIsRUFBUyxjQUFzQixFQUN4RCxZQUFxQztvQkFEckMsZUFBVSxHQUFWLFVBQVUsQ0FBZTtvQkFBUyxtQkFBYyxHQUFkLGNBQWMsQ0FBUTtvQkFDeEQsaUJBQVksR0FBWixZQUFZLENBQXlCO2dCQUFHLENBQUM7Z0JBQzlELHdCQUFDO1lBQUQsQ0FIQSxBQUdDLElBQUE7WUFIRCxpREFHQyxDQUFBO1lBR0Q7Z0JBQ0Usc0JBQW9CLFVBQTBCO29CQUExQixlQUFVLEdBQVYsVUFBVSxDQUFnQjtnQkFBRyxDQUFDO2dCQUVsRCx1Q0FBZ0IsR0FBaEIsVUFBaUIsU0FBbUMsRUFBRSxRQUF1QixFQUM1RCxNQUFvQixFQUFFLEtBQTRCO29CQUNqRSxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7b0JBQ3BCLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztvQkFDdEIsSUFBSSxJQUFJLEdBQUcsSUFBSSwwQkFBVyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUM1QyxnQ0FBYyxDQUFDLFVBQVUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUM1RCx3QkFBUyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7b0JBQ3hDLGdFQUFnRTtvQkFDaEUsaURBQWlEO29CQUNqRCxzQkFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDekIseUJBQVUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7b0JBRTdCLE1BQU0sQ0FBQyxJQUFJLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDaEYsQ0FBQztnQkFqQkg7b0JBQUMsZUFBVSxFQUFFOztnQ0FBQTtnQkFrQmIsbUJBQUM7WUFBRCxDQWpCQSxBQWlCQyxJQUFBO1lBakJELHVDQWlCQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci92aWV3X2NvbXBpbGVyL3ZpZXdfY29tcGlsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcblxuaW1wb3J0ICogYXMgbyBmcm9tICcuLi9vdXRwdXQvb3V0cHV0X2FzdCc7XG5pbXBvcnQge0NvbXBpbGVFbGVtZW50fSBmcm9tICcuL2NvbXBpbGVfZWxlbWVudCc7XG5pbXBvcnQge0NvbXBpbGVWaWV3fSBmcm9tICcuL2NvbXBpbGVfdmlldyc7XG5pbXBvcnQge2J1aWxkVmlldywgZmluaXNoVmlldywgVmlld0NvbXBpbGVEZXBlbmRlbmN5fSBmcm9tICcuL3ZpZXdfYnVpbGRlcic7XG5pbXBvcnQge2JpbmRWaWV3fSBmcm9tICcuL3ZpZXdfYmluZGVyJztcblxuaW1wb3J0IHtDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsIENvbXBpbGVQaXBlTWV0YWRhdGF9IGZyb20gJy4uL2NvbXBpbGVfbWV0YWRhdGEnO1xuXG5pbXBvcnQge1RlbXBsYXRlQXN0fSBmcm9tICcuLi90ZW1wbGF0ZV9hc3QnO1xuaW1wb3J0IHtDb21waWxlckNvbmZpZ30gZnJvbSAnLi4vY29uZmlnJztcblxuZXhwb3J0IGNsYXNzIFZpZXdDb21waWxlUmVzdWx0IHtcbiAgY29uc3RydWN0b3IocHVibGljIHN0YXRlbWVudHM6IG8uU3RhdGVtZW50W10sIHB1YmxpYyB2aWV3RmFjdG9yeVZhcjogc3RyaW5nLFxuICAgICAgICAgICAgICBwdWJsaWMgZGVwZW5kZW5jaWVzOiBWaWV3Q29tcGlsZURlcGVuZGVuY3lbXSkge31cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFZpZXdDb21waWxlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2dlbkNvbmZpZzogQ29tcGlsZXJDb25maWcpIHt9XG5cbiAgY29tcGlsZUNvbXBvbmVudChjb21wb25lbnQ6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSwgdGVtcGxhdGU6IFRlbXBsYXRlQXN0W10sXG4gICAgICAgICAgICAgICAgICAgc3R5bGVzOiBvLkV4cHJlc3Npb24sIHBpcGVzOiBDb21waWxlUGlwZU1ldGFkYXRhW10pOiBWaWV3Q29tcGlsZVJlc3VsdCB7XG4gICAgdmFyIHN0YXRlbWVudHMgPSBbXTtcbiAgICB2YXIgZGVwZW5kZW5jaWVzID0gW107XG4gICAgdmFyIHZpZXcgPSBuZXcgQ29tcGlsZVZpZXcoY29tcG9uZW50LCB0aGlzLl9nZW5Db25maWcsIHBpcGVzLCBzdHlsZXMsIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29tcGlsZUVsZW1lbnQuY3JlYXRlTnVsbCgpLCBbXSk7XG4gICAgYnVpbGRWaWV3KHZpZXcsIHRlbXBsYXRlLCBkZXBlbmRlbmNpZXMpO1xuICAgIC8vIE5lZWQgdG8gc2VwYXJhdGUgYmluZGluZyBmcm9tIGNyZWF0aW9uIHRvIGJlIGFibGUgdG8gcmVmZXIgdG9cbiAgICAvLyB2YXJpYWJsZXMgdGhhdCBoYXZlIGJlZW4gZGVjbGFyZWQgYWZ0ZXIgdXNhZ2UuXG4gICAgYmluZFZpZXcodmlldywgdGVtcGxhdGUpO1xuICAgIGZpbmlzaFZpZXcodmlldywgc3RhdGVtZW50cyk7XG5cbiAgICByZXR1cm4gbmV3IFZpZXdDb21waWxlUmVzdWx0KHN0YXRlbWVudHMsIHZpZXcudmlld0ZhY3RvcnkubmFtZSwgZGVwZW5kZW5jaWVzKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
