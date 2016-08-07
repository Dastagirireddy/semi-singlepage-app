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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9waXBlX3Jlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7c0JBNENXLHFCQUFxQjtJQXJDaEMseUJBQXlCLElBQVM7UUFDaEMsTUFBTSxDQUFDLElBQUksWUFBWSx1QkFBWSxDQUFDO0lBQ3RDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFFRDs7Ozs7O2VBTUc7WUFFSDtnQkFFRSxzQkFBWSxVQUE0QjtvQkFDdEMsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO29CQUMvQixDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLElBQUksQ0FBQyxVQUFVLEdBQUcsc0JBQVMsQ0FBQztvQkFDOUIsQ0FBQztnQkFDSCxDQUFDO2dCQUVEOzttQkFFRztnQkFDSCw4QkFBTyxHQUFQLFVBQVEsSUFBVTtvQkFDaEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsc0JBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDakUsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3JCLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7d0JBQzdDLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUMxQixNQUFNLENBQUMsVUFBVSxDQUFDO3dCQUNwQixDQUFDO29CQUNILENBQUM7b0JBQ0QsTUFBTSxJQUFJLDBCQUFhLENBQUMsZ0NBQThCLGdCQUFTLENBQUMsSUFBSSxDQUFHLENBQUMsQ0FBQztnQkFDM0UsQ0FBQztnQkF2Qkg7b0JBQUMsZUFBVSxFQUFFOztnQ0FBQTtnQkF3QmIsbUJBQUM7WUFBRCxDQXZCQSxBQXVCQyxJQUFBO1lBdkJELHVDQXVCQyxDQUFBO1lBRVUsbUNBQUEscUJBQXFCLEdBQUcsSUFBSSxZQUFZLENBQUMsc0JBQVMsQ0FBQyxDQUFBLENBQUMiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL3BpcGVfcmVzb2x2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3Jlc29sdmVGb3J3YXJkUmVmLCBJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge1R5cGUsIGlzUHJlc2VudCwgc3RyaW5naWZ5fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtQaXBlTWV0YWRhdGF9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL21ldGFkYXRhJztcbmltcG9ydCB7UmVmbGVjdG9yUmVhZGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9yZWZsZWN0aW9uL3JlZmxlY3Rvcl9yZWFkZXInO1xuaW1wb3J0IHtyZWZsZWN0b3J9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlZmxlY3Rpb24vcmVmbGVjdGlvbic7XG5cbmZ1bmN0aW9uIF9pc1BpcGVNZXRhZGF0YSh0eXBlOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGUgaW5zdGFuY2VvZiBQaXBlTWV0YWRhdGE7XG59XG5cbi8qKlxuICogUmVzb2x2ZSBhIGBUeXBlYCBmb3Ige0BsaW5rIFBpcGVNZXRhZGF0YX0uXG4gKlxuICogVGhpcyBpbnRlcmZhY2UgY2FuIGJlIG92ZXJyaWRkZW4gYnkgdGhlIGFwcGxpY2F0aW9uIGRldmVsb3BlciB0byBjcmVhdGUgY3VzdG9tIGJlaGF2aW9yLlxuICpcbiAqIFNlZSB7QGxpbmsgQ29tcGlsZXJ9XG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQaXBlUmVzb2x2ZXIge1xuICBwcml2YXRlIF9yZWZsZWN0b3I6IFJlZmxlY3RvclJlYWRlcjtcbiAgY29uc3RydWN0b3IoX3JlZmxlY3Rvcj86IFJlZmxlY3RvclJlYWRlcikge1xuICAgIGlmIChpc1ByZXNlbnQoX3JlZmxlY3RvcikpIHtcbiAgICAgIHRoaXMuX3JlZmxlY3RvciA9IF9yZWZsZWN0b3I7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3JlZmxlY3RvciA9IHJlZmxlY3RvcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHtAbGluayBQaXBlTWV0YWRhdGF9IGZvciBhIGdpdmVuIGBUeXBlYC5cbiAgICovXG4gIHJlc29sdmUodHlwZTogVHlwZSk6IFBpcGVNZXRhZGF0YSB7XG4gICAgdmFyIG1ldGFzID0gdGhpcy5fcmVmbGVjdG9yLmFubm90YXRpb25zKHJlc29sdmVGb3J3YXJkUmVmKHR5cGUpKTtcbiAgICBpZiAoaXNQcmVzZW50KG1ldGFzKSkge1xuICAgICAgdmFyIGFubm90YXRpb24gPSBtZXRhcy5maW5kKF9pc1BpcGVNZXRhZGF0YSk7XG4gICAgICBpZiAoaXNQcmVzZW50KGFubm90YXRpb24pKSB7XG4gICAgICAgIHJldHVybiBhbm5vdGF0aW9uO1xuICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgTm8gUGlwZSBkZWNvcmF0b3IgZm91bmQgb24gJHtzdHJpbmdpZnkodHlwZSl9YCk7XG4gIH1cbn1cblxuZXhwb3J0IHZhciBDT0RFR0VOX1BJUEVfUkVTT0xWRVIgPSBuZXcgUGlwZVJlc29sdmVyKHJlZmxlY3Rvcik7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
