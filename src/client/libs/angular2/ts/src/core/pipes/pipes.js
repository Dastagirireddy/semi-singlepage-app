System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/collection', 'angular2/src/core/change_detection/pipes'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, exceptions_1, collection_1, cd;
    var ProtoPipes, Pipes;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (cd_1) {
                cd = cd_1;
            }],
        execute: function() {
            ProtoPipes = (function () {
                function ProtoPipes(
                    /**
                    * Map of {@link PipeMetadata} names to {@link PipeMetadata} implementations.
                    */
                    config) {
                    this.config = config;
                    this.config = config;
                }
                ProtoPipes.fromProviders = function (providers) {
                    var config = {};
                    providers.forEach(function (b) { return config[b.name] = b; });
                    return new ProtoPipes(config);
                };
                ProtoPipes.prototype.get = function (name) {
                    var provider = this.config[name];
                    if (lang_1.isBlank(provider))
                        throw new exceptions_1.BaseException("Cannot find pipe '" + name + "'.");
                    return provider;
                };
                return ProtoPipes;
            }());
            exports_1("ProtoPipes", ProtoPipes);
            Pipes = (function () {
                function Pipes(proto, injector) {
                    this.proto = proto;
                    this.injector = injector;
                    /** @internal */
                    this._config = {};
                }
                Pipes.prototype.get = function (name) {
                    var cached = collection_1.StringMapWrapper.get(this._config, name);
                    if (lang_1.isPresent(cached))
                        return cached;
                    var p = this.proto.get(name);
                    var transform = this.injector.instantiateResolved(p);
                    var res = new cd.SelectedPipe(transform, p.pure);
                    if (p.pure) {
                        collection_1.StringMapWrapper.set(this._config, name, res);
                    }
                    return res;
                };
                return Pipes;
            }());
            exports_1("Pipes", Pipes);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvcGlwZXMvcGlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFjQTtnQkFPRTtvQkFDSTs7c0JBRUU7b0JBQ0ssTUFBcUM7b0JBQXJDLFdBQU0sR0FBTixNQUFNLENBQStCO29CQUM5QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztnQkFDdkIsQ0FBQztnQkFaTSx3QkFBYSxHQUFwQixVQUFxQixTQUF5QjtvQkFDNUMsSUFBSSxNQUFNLEdBQWtDLEVBQUUsQ0FBQztvQkFDL0MsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFsQixDQUFrQixDQUFDLENBQUM7b0JBQzNDLE1BQU0sQ0FBQyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDaEMsQ0FBQztnQkFVRCx3QkFBRyxHQUFILFVBQUksSUFBWTtvQkFDZCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNqQyxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQUMsTUFBTSxJQUFJLDBCQUFhLENBQUMsdUJBQXFCLElBQUksT0FBSSxDQUFDLENBQUM7b0JBQzlFLE1BQU0sQ0FBQyxRQUFRLENBQUM7Z0JBQ2xCLENBQUM7Z0JBQ0gsaUJBQUM7WUFBRCxDQXBCQSxBQW9CQyxJQUFBO1lBcEJELG1DQW9CQyxDQUFBO1lBSUQ7Z0JBSUUsZUFBbUIsS0FBaUIsRUFBUyxRQUFrQjtvQkFBNUMsVUFBSyxHQUFMLEtBQUssQ0FBWTtvQkFBUyxhQUFRLEdBQVIsUUFBUSxDQUFVO29CQUgvRCxnQkFBZ0I7b0JBQ2hCLFlBQU8sR0FBcUMsRUFBRSxDQUFDO2dCQUVtQixDQUFDO2dCQUVuRSxtQkFBRyxHQUFILFVBQUksSUFBWTtvQkFDZCxJQUFJLE1BQU0sR0FBRyw2QkFBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDdEQsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFBQyxNQUFNLENBQUMsTUFBTSxDQUFDO29CQUNyQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckQsSUFBSSxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBRWpELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNYLDZCQUFnQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDaEQsQ0FBQztvQkFFRCxNQUFNLENBQUMsR0FBRyxDQUFDO2dCQUNiLENBQUM7Z0JBQ0gsWUFBQztZQUFELENBbkJBLEFBbUJDLElBQUE7WUFuQkQseUJBbUJDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29yZS9waXBlcy9waXBlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNCbGFuaywgaXNQcmVzZW50LCBDT05TVCwgVHlwZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbiwgV3JhcHBlZEV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7U3RyaW5nTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7XG4gIEluamVjdGFibGUsXG4gIE9wdGlvbmFsTWV0YWRhdGEsXG4gIFNraXBTZWxmTWV0YWRhdGEsXG4gIFByb3ZpZGVyLFxuICBJbmplY3RvcixcbiAgYmluZFxufSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge1BpcGVQcm92aWRlcn0gZnJvbSAnLi9waXBlX3Byb3ZpZGVyJztcbmltcG9ydCAqIGFzIGNkIGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vcGlwZXMnO1xuXG5leHBvcnQgY2xhc3MgUHJvdG9QaXBlcyB7XG4gIHN0YXRpYyBmcm9tUHJvdmlkZXJzKHByb3ZpZGVyczogUGlwZVByb3ZpZGVyW10pOiBQcm90b1BpcGVzIHtcbiAgICB2YXIgY29uZmlnOiB7W2tleTogc3RyaW5nXTogUGlwZVByb3ZpZGVyfSA9IHt9O1xuICAgIHByb3ZpZGVycy5mb3JFYWNoKGIgPT4gY29uZmlnW2IubmFtZV0gPSBiKTtcbiAgICByZXR1cm4gbmV3IFByb3RvUGlwZXMoY29uZmlnKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgLyoqXG4gICAgICAqIE1hcCBvZiB7QGxpbmsgUGlwZU1ldGFkYXRhfSBuYW1lcyB0byB7QGxpbmsgUGlwZU1ldGFkYXRhfSBpbXBsZW1lbnRhdGlvbnMuXG4gICAgICAqL1xuICAgICAgcHVibGljIGNvbmZpZzoge1trZXk6IHN0cmluZ106IFBpcGVQcm92aWRlcn0pIHtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgfVxuXG4gIGdldChuYW1lOiBzdHJpbmcpOiBQaXBlUHJvdmlkZXIge1xuICAgIHZhciBwcm92aWRlciA9IHRoaXMuY29uZmlnW25hbWVdO1xuICAgIGlmIChpc0JsYW5rKHByb3ZpZGVyKSkgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYENhbm5vdCBmaW5kIHBpcGUgJyR7bmFtZX0nLmApO1xuICAgIHJldHVybiBwcm92aWRlcjtcbiAgfVxufVxuXG5cblxuZXhwb3J0IGNsYXNzIFBpcGVzIGltcGxlbWVudHMgY2QuUGlwZXMge1xuICAvKiogQGludGVybmFsICovXG4gIF9jb25maWc6IHtba2V5OiBzdHJpbmddOiBjZC5TZWxlY3RlZFBpcGV9ID0ge307XG5cbiAgY29uc3RydWN0b3IocHVibGljIHByb3RvOiBQcm90b1BpcGVzLCBwdWJsaWMgaW5qZWN0b3I6IEluamVjdG9yKSB7fVxuXG4gIGdldChuYW1lOiBzdHJpbmcpOiBjZC5TZWxlY3RlZFBpcGUge1xuICAgIHZhciBjYWNoZWQgPSBTdHJpbmdNYXBXcmFwcGVyLmdldCh0aGlzLl9jb25maWcsIG5hbWUpO1xuICAgIGlmIChpc1ByZXNlbnQoY2FjaGVkKSkgcmV0dXJuIGNhY2hlZDtcbiAgICB2YXIgcCA9IHRoaXMucHJvdG8uZ2V0KG5hbWUpO1xuICAgIHZhciB0cmFuc2Zvcm0gPSB0aGlzLmluamVjdG9yLmluc3RhbnRpYXRlUmVzb2x2ZWQocCk7XG4gICAgdmFyIHJlcyA9IG5ldyBjZC5TZWxlY3RlZFBpcGUodHJhbnNmb3JtLCBwLnB1cmUpO1xuXG4gICAgaWYgKHAucHVyZSkge1xuICAgICAgU3RyaW5nTWFwV3JhcHBlci5zZXQodGhpcy5fY29uZmlnLCBuYW1lLCByZXMpO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
