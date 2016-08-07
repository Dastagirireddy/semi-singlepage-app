System.register(['angular2/src/core/di', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/async', 'angular2/src/core/reflection/reflection', 'angular2/src/core/linker/view', 'angular2/src/core/linker/view_ref'], function(exports_1, context_1) {
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
    var di_1, lang_1, exceptions_1, async_1, reflection_1, view_1, view_ref_1;
    var Compiler, Compiler_;
    function isHostViewFactory(type) {
        return type instanceof view_1.HostViewFactory;
    }
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (reflection_1_1) {
                reflection_1 = reflection_1_1;
            },
            function (view_1_1) {
                view_1 = view_1_1;
            },
            function (view_ref_1_1) {
                view_ref_1 = view_ref_1_1;
            }],
        execute: function() {
            /**
             * Low-level service for compiling {@link Component}s into {@link ProtoViewRef ProtoViews}s, which
             * can later be used to create and render a Component instance.
             *
             * Most applications should instead use higher-level {@link DynamicComponentLoader} service, which
             * both compiles and instantiates a Component.
             */
            Compiler = (function () {
                function Compiler() {
                }
                return Compiler;
            }());
            exports_1("Compiler", Compiler);
            Compiler_ = (function (_super) {
                __extends(Compiler_, _super);
                function Compiler_() {
                    _super.apply(this, arguments);
                }
                Compiler_.prototype.compileInHost = function (componentType) {
                    var metadatas = reflection_1.reflector.annotations(componentType);
                    var hostViewFactory = metadatas.find(isHostViewFactory);
                    if (lang_1.isBlank(hostViewFactory)) {
                        throw new exceptions_1.BaseException("No precompiled component " + lang_1.stringify(componentType) + " found");
                    }
                    return async_1.PromiseWrapper.resolve(new view_ref_1.HostViewFactoryRef_(hostViewFactory));
                };
                Compiler_.prototype.clearCache = function () { };
                Compiler_ = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], Compiler_);
                return Compiler_;
            }(Compiler));
            exports_1("Compiler_", Compiler_);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvbGlua2VyL2NvbXBpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFzQkEsMkJBQTJCLElBQVM7UUFDbEMsTUFBTSxDQUFDLElBQUksWUFBWSxzQkFBZSxDQUFDO0lBQ3pDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFkRDs7Ozs7O2VBTUc7WUFDSDtnQkFBQTtnQkFHQSxDQUFDO2dCQUFELGVBQUM7WUFBRCxDQUhBLEFBR0MsSUFBQTtZQUhELCtCQUdDLENBQUE7WUFPRDtnQkFBK0IsNkJBQVE7Z0JBQXZDO29CQUErQiw4QkFBUTtnQkFZdkMsQ0FBQztnQkFYQyxpQ0FBYSxHQUFiLFVBQWMsYUFBbUI7b0JBQy9CLElBQUksU0FBUyxHQUFHLHNCQUFTLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUNyRCxJQUFJLGVBQWUsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7b0JBRXhELEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzdCLE1BQU0sSUFBSSwwQkFBYSxDQUFDLDhCQUE0QixnQkFBUyxDQUFDLGFBQWEsQ0FBQyxXQUFRLENBQUMsQ0FBQztvQkFDeEYsQ0FBQztvQkFDRCxNQUFNLENBQUMsc0JBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSw4QkFBbUIsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUMxRSxDQUFDO2dCQUVELDhCQUFVLEdBQVYsY0FBYyxDQUFDO2dCQVpqQjtvQkFBQyxlQUFVLEVBQUU7OzZCQUFBO2dCQWFiLGdCQUFDO1lBQUQsQ0FaQSxBQVlDLENBWjhCLFFBQVEsR0FZdEM7WUFaRCxpQ0FZQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvbGlua2VyL2NvbXBpbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtIb3N0Vmlld0ZhY3RvcnlSZWZ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci92aWV3X3JlZic7XG5cbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtUeXBlLCBpc0JsYW5rLCBzdHJpbmdpZnl9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge1Byb21pc2VXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jJztcbmltcG9ydCB7cmVmbGVjdG9yfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9yZWZsZWN0aW9uL3JlZmxlY3Rpb24nO1xuaW1wb3J0IHtIb3N0Vmlld0ZhY3Rvcnl9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci92aWV3JztcbmltcG9ydCB7SG9zdFZpZXdGYWN0b3J5UmVmX30gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL3ZpZXdfcmVmJztcblxuLyoqXG4gKiBMb3ctbGV2ZWwgc2VydmljZSBmb3IgY29tcGlsaW5nIHtAbGluayBDb21wb25lbnR9cyBpbnRvIHtAbGluayBQcm90b1ZpZXdSZWYgUHJvdG9WaWV3c31zLCB3aGljaFxuICogY2FuIGxhdGVyIGJlIHVzZWQgdG8gY3JlYXRlIGFuZCByZW5kZXIgYSBDb21wb25lbnQgaW5zdGFuY2UuXG4gKlxuICogTW9zdCBhcHBsaWNhdGlvbnMgc2hvdWxkIGluc3RlYWQgdXNlIGhpZ2hlci1sZXZlbCB7QGxpbmsgRHluYW1pY0NvbXBvbmVudExvYWRlcn0gc2VydmljZSwgd2hpY2hcbiAqIGJvdGggY29tcGlsZXMgYW5kIGluc3RhbnRpYXRlcyBhIENvbXBvbmVudC5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbXBpbGVyIHtcbiAgYWJzdHJhY3QgY29tcGlsZUluSG9zdChjb21wb25lbnRUeXBlOiBUeXBlKTogUHJvbWlzZTxIb3N0Vmlld0ZhY3RvcnlSZWY+O1xuICBhYnN0cmFjdCBjbGVhckNhY2hlKCk7XG59XG5cbmZ1bmN0aW9uIGlzSG9zdFZpZXdGYWN0b3J5KHR5cGU6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZSBpbnN0YW5jZW9mIEhvc3RWaWV3RmFjdG9yeTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbXBpbGVyXyBleHRlbmRzIENvbXBpbGVyIHtcbiAgY29tcGlsZUluSG9zdChjb21wb25lbnRUeXBlOiBUeXBlKTogUHJvbWlzZTxIb3N0Vmlld0ZhY3RvcnlSZWZfPiB7XG4gICAgdmFyIG1ldGFkYXRhcyA9IHJlZmxlY3Rvci5hbm5vdGF0aW9ucyhjb21wb25lbnRUeXBlKTtcbiAgICB2YXIgaG9zdFZpZXdGYWN0b3J5ID0gbWV0YWRhdGFzLmZpbmQoaXNIb3N0Vmlld0ZhY3RvcnkpO1xuXG4gICAgaWYgKGlzQmxhbmsoaG9zdFZpZXdGYWN0b3J5KSkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYE5vIHByZWNvbXBpbGVkIGNvbXBvbmVudCAke3N0cmluZ2lmeShjb21wb25lbnRUeXBlKX0gZm91bmRgKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2VXcmFwcGVyLnJlc29sdmUobmV3IEhvc3RWaWV3RmFjdG9yeVJlZl8oaG9zdFZpZXdGYWN0b3J5KSk7XG4gIH1cblxuICBjbGVhckNhY2hlKCkge31cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
