System.register(['angular2/src/core/di', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/async', 'angular2/src/core/reflection/reflection', './component_factory'], function(exports_1, context_1) {
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
    var di_1, lang_1, exceptions_1, async_1, reflection_1, component_factory_1;
    var ComponentResolver, ReflectorComponentResolver;
    function _isComponentFactory(type) {
        return type instanceof component_factory_1.ComponentFactory;
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
            function (component_factory_1_1) {
                component_factory_1 = component_factory_1_1;
            }],
        execute: function() {
            /**
             * Low-level service for loading {@link ComponentFactory}s, which
             * can later be used to create and render a Component instance.
             */
            ComponentResolver = (function () {
                function ComponentResolver() {
                }
                return ComponentResolver;
            }());
            exports_1("ComponentResolver", ComponentResolver);
            ReflectorComponentResolver = (function (_super) {
                __extends(ReflectorComponentResolver, _super);
                function ReflectorComponentResolver() {
                    _super.apply(this, arguments);
                }
                ReflectorComponentResolver.prototype.resolveComponent = function (componentType) {
                    var metadatas = reflection_1.reflector.annotations(componentType);
                    var componentFactory = metadatas.find(_isComponentFactory);
                    if (lang_1.isBlank(componentFactory)) {
                        throw new exceptions_1.BaseException("No precompiled component " + lang_1.stringify(componentType) + " found");
                    }
                    return async_1.PromiseWrapper.resolve(componentFactory);
                };
                ReflectorComponentResolver.prototype.clearCache = function () { };
                ReflectorComponentResolver = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], ReflectorComponentResolver);
                return ReflectorComponentResolver;
            }(ComponentResolver));
            exports_1("ReflectorComponentResolver", ReflectorComponentResolver);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2xpbmtlci9jb21wb25lbnRfcmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWdCQSw2QkFBNkIsSUFBUztRQUNwQyxNQUFNLENBQUMsSUFBSSxZQUFZLG9DQUFnQixDQUFDO0lBQzFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFYRDs7O2VBR0c7WUFDSDtnQkFBQTtnQkFHQSxDQUFDO2dCQUFELHdCQUFDO1lBQUQsQ0FIQSxBQUdDLElBQUE7WUFIRCxpREFHQyxDQUFBO1lBT0Q7Z0JBQWdELDhDQUFpQjtnQkFBakU7b0JBQWdELDhCQUFpQjtnQkFXakUsQ0FBQztnQkFWQyxxREFBZ0IsR0FBaEIsVUFBaUIsYUFBbUI7b0JBQ2xDLElBQUksU0FBUyxHQUFHLHNCQUFTLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUNyRCxJQUFJLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztvQkFFM0QsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM5QixNQUFNLElBQUksMEJBQWEsQ0FBQyw4QkFBNEIsZ0JBQVMsQ0FBQyxhQUFhLENBQUMsV0FBUSxDQUFDLENBQUM7b0JBQ3hGLENBQUM7b0JBQ0QsTUFBTSxDQUFDLHNCQUFjLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQ2xELENBQUM7Z0JBQ0QsK0NBQVUsR0FBVixjQUFjLENBQUM7Z0JBWGpCO29CQUFDLGVBQVUsRUFBRTs7OENBQUE7Z0JBWWIsaUNBQUM7WUFBRCxDQVhBLEFBV0MsQ0FYK0MsaUJBQWlCLEdBV2hFO1lBWEQsbUVBV0MsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29yZS9saW5rZXIvY29tcG9uZW50X3Jlc29sdmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge1R5cGUsIGlzQmxhbmssIHN0cmluZ2lmeX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7UHJvbWlzZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYXN5bmMnO1xuaW1wb3J0IHtyZWZsZWN0b3J9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlZmxlY3Rpb24vcmVmbGVjdGlvbic7XG5pbXBvcnQge0NvbXBvbmVudEZhY3Rvcnl9IGZyb20gJy4vY29tcG9uZW50X2ZhY3RvcnknO1xuXG4vKipcbiAqIExvdy1sZXZlbCBzZXJ2aWNlIGZvciBsb2FkaW5nIHtAbGluayBDb21wb25lbnRGYWN0b3J5fXMsIHdoaWNoXG4gKiBjYW4gbGF0ZXIgYmUgdXNlZCB0byBjcmVhdGUgYW5kIHJlbmRlciBhIENvbXBvbmVudCBpbnN0YW5jZS5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbXBvbmVudFJlc29sdmVyIHtcbiAgYWJzdHJhY3QgcmVzb2x2ZUNvbXBvbmVudChjb21wb25lbnRUeXBlOiBUeXBlKTogUHJvbWlzZTxDb21wb25lbnRGYWN0b3J5PjtcbiAgYWJzdHJhY3QgY2xlYXJDYWNoZSgpO1xufVxuXG5mdW5jdGlvbiBfaXNDb21wb25lbnRGYWN0b3J5KHR5cGU6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZSBpbnN0YW5jZW9mIENvbXBvbmVudEZhY3Rvcnk7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZWZsZWN0b3JDb21wb25lbnRSZXNvbHZlciBleHRlbmRzIENvbXBvbmVudFJlc29sdmVyIHtcbiAgcmVzb2x2ZUNvbXBvbmVudChjb21wb25lbnRUeXBlOiBUeXBlKTogUHJvbWlzZTxDb21wb25lbnRGYWN0b3J5PiB7XG4gICAgdmFyIG1ldGFkYXRhcyA9IHJlZmxlY3Rvci5hbm5vdGF0aW9ucyhjb21wb25lbnRUeXBlKTtcbiAgICB2YXIgY29tcG9uZW50RmFjdG9yeSA9IG1ldGFkYXRhcy5maW5kKF9pc0NvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgaWYgKGlzQmxhbmsoY29tcG9uZW50RmFjdG9yeSkpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBObyBwcmVjb21waWxlZCBjb21wb25lbnQgJHtzdHJpbmdpZnkoY29tcG9uZW50VHlwZSl9IGZvdW5kYCk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlV3JhcHBlci5yZXNvbHZlKGNvbXBvbmVudEZhY3RvcnkpO1xuICB9XG4gIGNsZWFyQ2FjaGUoKSB7fVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
