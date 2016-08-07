System.register(['angular2/src/core/di', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/core/metadata', 'angular2/src/core/reflection/reflector_reader', 'angular2/src/core/reflection/reflection'], function(exports_1, context_1) {
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
    var di_1, lang_1, exceptions_1, metadata_1, reflector_reader_1, reflection_1;
    var PipeResolver, CODEGEN_PIPE_RESOLVER;
    function _isPipeMetadata(type) {
        return type instanceof metadata_1.PipeMetadata;
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
            function (metadata_1_1) {
                metadata_1 = metadata_1_1;
            },
            function (reflector_reader_1_1) {
                reflector_reader_1 = reflector_reader_1_1;
            },
            function (reflection_1_1) {
                reflection_1 = reflection_1_1;
            }],
        execute: function() {
            /**
             * Resolve a `Type` for {@link PipeMetadata}.
             *
             * This interface can be overridden by the application developer to create custom behavior.
             *
             * See {@link Compiler}
             */
            PipeResolver = (function () {
                function PipeResolver(_reflector) {
                    if (lang_1.isPresent(_reflector)) {
                        this._reflector = _reflector;
                    }
                    else {
                        this._reflector = reflection_1.reflector;
                    }
                }
                /**
                 * Return {@link PipeMetadata} for a given `Type`.
                 */
                PipeResolver.prototype.resolve = function (type) {
                    var metas = this._reflector.annotations(di_1.resolveForwardRef(type));
                    if (lang_1.isPresent(metas)) {
                        var annotation = metas.find(_isPipeMetadata);
                        if (lang_1.isPresent(annotation)) {
                            return annotation;
                        }
                    }
                    throw new exceptions_1.BaseException("No Pipe decorator found on " + lang_1.stringify(type));
                };
                PipeResolver = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [reflector_reader_1.ReflectorReader])
                ], PipeResolver);
                return PipeResolver;
            }());
            exports_1("PipeResolver", PipeResolver);
            exports_1("CODEGEN_PIPE_RESOLVER", CODEGEN_PIPE_RESOLVER = new PipeResolver(reflection_1.reflector));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvbGlua2VyL3BpcGVfcmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztzQkE0Q1cscUJBQXFCO0lBckNoQyx5QkFBeUIsSUFBUztRQUNoQyxNQUFNLENBQUMsSUFBSSxZQUFZLHVCQUFZLENBQUM7SUFDdEMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUVEOzs7Ozs7ZUFNRztZQUVIO2dCQUVFLHNCQUFZLFVBQTRCO29CQUN0QyxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7b0JBQy9CLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sSUFBSSxDQUFDLFVBQVUsR0FBRyxzQkFBUyxDQUFDO29CQUM5QixDQUFDO2dCQUNILENBQUM7Z0JBRUQ7O21CQUVHO2dCQUNILDhCQUFPLEdBQVAsVUFBUSxJQUFVO29CQUNoQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxzQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNqRSxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDckIsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzt3QkFDN0MsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzFCLE1BQU0sQ0FBQyxVQUFVLENBQUM7d0JBQ3BCLENBQUM7b0JBQ0gsQ0FBQztvQkFDRCxNQUFNLElBQUksMEJBQWEsQ0FBQyxnQ0FBOEIsZ0JBQVMsQ0FBQyxJQUFJLENBQUcsQ0FBQyxDQUFDO2dCQUMzRSxDQUFDO2dCQXZCSDtvQkFBQyxlQUFVLEVBQUU7O2dDQUFBO2dCQXdCYixtQkFBQztZQUFELENBdkJBLEFBdUJDLElBQUE7WUF2QkQsdUNBdUJDLENBQUE7WUFFVSxtQ0FBQSxxQkFBcUIsR0FBRyxJQUFJLFlBQVksQ0FBQyxzQkFBUyxDQUFDLENBQUEsQ0FBQyIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2xpbmtlci9waXBlX3Jlc29sdmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtyZXNvbHZlRm9yd2FyZFJlZiwgSW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtUeXBlLCBpc1ByZXNlbnQsIHN0cmluZ2lmeX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7UGlwZU1ldGFkYXRhfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9tZXRhZGF0YSc7XG5pbXBvcnQge1JlZmxlY3RvclJlYWRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVmbGVjdGlvbi9yZWZsZWN0b3JfcmVhZGVyJztcbmltcG9ydCB7cmVmbGVjdG9yfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9yZWZsZWN0aW9uL3JlZmxlY3Rpb24nO1xuXG5mdW5jdGlvbiBfaXNQaXBlTWV0YWRhdGEodHlwZTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlIGluc3RhbmNlb2YgUGlwZU1ldGFkYXRhO1xufVxuXG4vKipcbiAqIFJlc29sdmUgYSBgVHlwZWAgZm9yIHtAbGluayBQaXBlTWV0YWRhdGF9LlxuICpcbiAqIFRoaXMgaW50ZXJmYWNlIGNhbiBiZSBvdmVycmlkZGVuIGJ5IHRoZSBhcHBsaWNhdGlvbiBkZXZlbG9wZXIgdG8gY3JlYXRlIGN1c3RvbSBiZWhhdmlvci5cbiAqXG4gKiBTZWUge0BsaW5rIENvbXBpbGVyfVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGlwZVJlc29sdmVyIHtcbiAgcHJpdmF0ZSBfcmVmbGVjdG9yOiBSZWZsZWN0b3JSZWFkZXI7XG4gIGNvbnN0cnVjdG9yKF9yZWZsZWN0b3I/OiBSZWZsZWN0b3JSZWFkZXIpIHtcbiAgICBpZiAoaXNQcmVzZW50KF9yZWZsZWN0b3IpKSB7XG4gICAgICB0aGlzLl9yZWZsZWN0b3IgPSBfcmVmbGVjdG9yO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZWZsZWN0b3IgPSByZWZsZWN0b3I7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB7QGxpbmsgUGlwZU1ldGFkYXRhfSBmb3IgYSBnaXZlbiBgVHlwZWAuXG4gICAqL1xuICByZXNvbHZlKHR5cGU6IFR5cGUpOiBQaXBlTWV0YWRhdGEge1xuICAgIHZhciBtZXRhcyA9IHRoaXMuX3JlZmxlY3Rvci5hbm5vdGF0aW9ucyhyZXNvbHZlRm9yd2FyZFJlZih0eXBlKSk7XG4gICAgaWYgKGlzUHJlc2VudChtZXRhcykpIHtcbiAgICAgIHZhciBhbm5vdGF0aW9uID0gbWV0YXMuZmluZChfaXNQaXBlTWV0YWRhdGEpO1xuICAgICAgaWYgKGlzUHJlc2VudChhbm5vdGF0aW9uKSkge1xuICAgICAgICByZXR1cm4gYW5ub3RhdGlvbjtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYE5vIFBpcGUgZGVjb3JhdG9yIGZvdW5kIG9uICR7c3RyaW5naWZ5KHR5cGUpfWApO1xuICB9XG59XG5cbmV4cG9ydCB2YXIgQ09ERUdFTl9QSVBFX1JFU09MVkVSID0gbmV3IFBpcGVSZXNvbHZlcihyZWZsZWN0b3IpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
