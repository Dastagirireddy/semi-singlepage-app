System.register(['angular2/src/core/di', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/collection', 'angular2/src/core/metadata', 'angular2/src/core/reflection/reflection', 'angular2/src/core/reflection/reflector_reader'], function(exports_1, context_1) {
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
    var di_1, lang_1, exceptions_1, collection_1, metadata_1, reflection_1, reflector_reader_1;
    var DirectiveResolver, CODEGEN_DIRECTIVE_RESOLVER;
    function _isDirectiveMetadata(type) {
        return type instanceof metadata_1.DirectiveMetadata;
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
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (metadata_1_1) {
                metadata_1 = metadata_1_1;
            },
            function (reflection_1_1) {
                reflection_1 = reflection_1_1;
            },
            function (reflector_reader_1_1) {
                reflector_reader_1 = reflector_reader_1_1;
            }],
        execute: function() {
            /*
             * Resolve a `Type` for {@link DirectiveMetadata}.
             *
             * This interface can be overridden by the application developer to create custom behavior.
             *
             * See {@link Compiler}
             */
            DirectiveResolver = (function () {
                function DirectiveResolver(_reflector) {
                    if (lang_1.isPresent(_reflector)) {
                        this._reflector = _reflector;
                    }
                    else {
                        this._reflector = reflection_1.reflector;
                    }
                }
                /**
                 * Return {@link DirectiveMetadata} for a given `Type`.
                 */
                DirectiveResolver.prototype.resolve = function (type) {
                    var typeMetadata = this._reflector.annotations(di_1.resolveForwardRef(type));
                    if (lang_1.isPresent(typeMetadata)) {
                        var metadata = typeMetadata.find(_isDirectiveMetadata);
                        if (lang_1.isPresent(metadata)) {
                            var propertyMetadata = this._reflector.propMetadata(type);
                            return this._mergeWithPropertyMetadata(metadata, propertyMetadata, type);
                        }
                    }
                    throw new exceptions_1.BaseException("No Directive annotation found on " + lang_1.stringify(type));
                };
                DirectiveResolver.prototype._mergeWithPropertyMetadata = function (dm, propertyMetadata, directiveType) {
                    var inputs = [];
                    var outputs = [];
                    var host = {};
                    var queries = {};
                    collection_1.StringMapWrapper.forEach(propertyMetadata, function (metadata, propName) {
                        metadata.forEach(function (a) {
                            if (a instanceof metadata_1.InputMetadata) {
                                if (lang_1.isPresent(a.bindingPropertyName)) {
                                    inputs.push(propName + ": " + a.bindingPropertyName);
                                }
                                else {
                                    inputs.push(propName);
                                }
                            }
                            if (a instanceof metadata_1.OutputMetadata) {
                                if (lang_1.isPresent(a.bindingPropertyName)) {
                                    outputs.push(propName + ": " + a.bindingPropertyName);
                                }
                                else {
                                    outputs.push(propName);
                                }
                            }
                            if (a instanceof metadata_1.HostBindingMetadata) {
                                if (lang_1.isPresent(a.hostPropertyName)) {
                                    host[("[" + a.hostPropertyName + "]")] = propName;
                                }
                                else {
                                    host[("[" + propName + "]")] = propName;
                                }
                            }
                            if (a instanceof metadata_1.HostListenerMetadata) {
                                var args = lang_1.isPresent(a.args) ? a.args.join(', ') : '';
                                host[("(" + a.eventName + ")")] = propName + "(" + args + ")";
                            }
                            if (a instanceof metadata_1.ContentChildrenMetadata) {
                                queries[propName] = a;
                            }
                            if (a instanceof metadata_1.ViewChildrenMetadata) {
                                queries[propName] = a;
                            }
                            if (a instanceof metadata_1.ContentChildMetadata) {
                                queries[propName] = a;
                            }
                            if (a instanceof metadata_1.ViewChildMetadata) {
                                queries[propName] = a;
                            }
                        });
                    });
                    return this._merge(dm, inputs, outputs, host, queries, directiveType);
                };
                DirectiveResolver.prototype._merge = function (dm, inputs, outputs, host, queries, directiveType) {
                    var mergedInputs = lang_1.isPresent(dm.inputs) ? collection_1.ListWrapper.concat(dm.inputs, inputs) : inputs;
                    var mergedOutputs;
                    if (lang_1.isPresent(dm.outputs)) {
                        dm.outputs.forEach(function (propName) {
                            if (collection_1.ListWrapper.contains(outputs, propName)) {
                                throw new exceptions_1.BaseException("Output event '" + propName + "' defined multiple times in '" + lang_1.stringify(directiveType) + "'");
                            }
                        });
                        mergedOutputs = collection_1.ListWrapper.concat(dm.outputs, outputs);
                    }
                    else {
                        mergedOutputs = outputs;
                    }
                    var mergedHost = lang_1.isPresent(dm.host) ? collection_1.StringMapWrapper.merge(dm.host, host) : host;
                    var mergedQueries = lang_1.isPresent(dm.queries) ? collection_1.StringMapWrapper.merge(dm.queries, queries) : queries;
                    if (dm instanceof metadata_1.ComponentMetadata) {
                        return new metadata_1.ComponentMetadata({
                            selector: dm.selector,
                            inputs: mergedInputs,
                            outputs: mergedOutputs,
                            host: mergedHost,
                            exportAs: dm.exportAs,
                            moduleId: dm.moduleId,
                            queries: mergedQueries,
                            changeDetection: dm.changeDetection,
                            providers: dm.providers,
                            viewProviders: dm.viewProviders
                        });
                    }
                    else {
                        return new metadata_1.DirectiveMetadata({
                            selector: dm.selector,
                            inputs: mergedInputs,
                            outputs: mergedOutputs,
                            host: mergedHost,
                            exportAs: dm.exportAs,
                            queries: mergedQueries,
                            providers: dm.providers
                        });
                    }
                };
                DirectiveResolver = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [reflector_reader_1.ReflectorReader])
                ], DirectiveResolver);
                return DirectiveResolver;
            }());
            exports_1("DirectiveResolver", DirectiveResolver);
            exports_1("CODEGEN_DIRECTIVE_RESOLVER", CODEGEN_DIRECTIVE_RESOLVER = new DirectiveResolver(reflection_1.reflector));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9kaXJlY3RpdmVfcmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OzsyQkF3S1csMEJBQTBCO0lBcEpyQyw4QkFBOEIsSUFBUztRQUNyQyxNQUFNLENBQUMsSUFBSSxZQUFZLDRCQUFpQixDQUFDO0lBQzNDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFFRDs7Ozs7O2VBTUc7WUFFSDtnQkFHRSwyQkFBWSxVQUE0QjtvQkFDdEMsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO29CQUMvQixDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLElBQUksQ0FBQyxVQUFVLEdBQUcsc0JBQVMsQ0FBQztvQkFDOUIsQ0FBQztnQkFDSCxDQUFDO2dCQUVEOzttQkFFRztnQkFDSCxtQ0FBTyxHQUFQLFVBQVEsSUFBVTtvQkFDaEIsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsc0JBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDeEUsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzVCLElBQUksUUFBUSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQzt3QkFDdkQsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3hCLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQzFELE1BQU0sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFD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QkFDckIsT0FBTyxFQUFFLGFBQWE7NEJBQ3RCLFNBQVMsRUFBRSxFQUFFLENBQUMsU0FBUzt5QkFDeEIsQ0FBQyxDQUFDO29CQUNMLENBQUM7Z0JBQ0gsQ0FBQztnQkF0SUg7b0JBQUMsZUFBVSxFQUFFOztxQ0FBQTtnQkF1SWIsd0JBQUM7WUFBRCxDQXRJQSxBQXNJQyxJQUFBO1lBdElELGlEQXNJQyxDQUFBO1lBRVUsd0NBQUEsMEJBQTBCLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxzQkFBUyxDQUFDLENBQUEsQ0FBQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tcGlsZXIvZGlyZWN0aXZlX3Jlc29sdmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtyZXNvbHZlRm9yd2FyZFJlZiwgSW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtUeXBlLCBpc1ByZXNlbnQsIGlzQmxhbmssIHN0cmluZ2lmeX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7TGlzdFdyYXBwZXIsIFN0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5cbmltcG9ydCB7XG4gIERpcmVjdGl2ZU1ldGFkYXRhLFxuICBDb21wb25lbnRNZXRhZGF0YSxcbiAgSW5wdXRNZXRhZGF0YSxcbiAgT3V0cHV0TWV0YWRhdGEsXG4gIEhvc3RCaW5kaW5nTWV0YWRhdGEsXG4gIEhvc3RMaXN0ZW5lck1ldGFkYXRhLFxuICBDb250ZW50Q2hpbGRyZW5NZXRhZGF0YSxcbiAgVmlld0NoaWxkcmVuTWV0YWRhdGEsXG4gIENvbnRlbnRDaGlsZE1ldGFkYXRhLFxuICBWaWV3Q2hpbGRNZXRhZGF0YVxufSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9tZXRhZGF0YSc7XG5pbXBvcnQge3JlZmxlY3Rvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVmbGVjdGlvbi9yZWZsZWN0aW9uJztcbmltcG9ydCB7UmVmbGVjdG9yUmVhZGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9yZWZsZWN0aW9uL3JlZmxlY3Rvcl9yZWFkZXInO1xuXG5mdW5jdGlvbiBfaXNEaXJlY3RpdmVNZXRhZGF0YSh0eXBlOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGUgaW5zdGFuY2VvZiBEaXJlY3RpdmVNZXRhZGF0YTtcbn1cblxuLypcbiAqIFJlc29sdmUgYSBgVHlwZWAgZm9yIHtAbGluayBEaXJlY3RpdmVNZXRhZGF0YX0uXG4gKlxuICogVGhpcyBpbnRlcmZhY2UgY2FuIGJlIG92ZXJyaWRkZW4gYnkgdGhlIGFwcGxpY2F0aW9uIGRldmVsb3BlciB0byBjcmVhdGUgY3VzdG9tIGJlaGF2aW9yLlxuICpcbiAqIFNlZSB7QGxpbmsgQ29tcGlsZXJ9XG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEaXJlY3RpdmVSZXNvbHZlciB7XG4gIHByaXZhdGUgX3JlZmxlY3RvcjogUmVmbGVjdG9yUmVhZGVyO1xuXG4gIGNvbnN0cnVjdG9yKF9yZWZsZWN0b3I/OiBSZWZsZWN0b3JSZWFkZXIpIHtcbiAgICBpZiAoaXNQcmVzZW50KF9yZWZsZWN0b3IpKSB7XG4gICAgICB0aGlzLl9yZWZsZWN0b3IgPSBfcmVmbGVjdG9yO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZWZsZWN0b3IgPSByZWZsZWN0b3I7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB7QGxpbmsgRGlyZWN0aXZlTWV0YWRhdGF9IGZvciBhIGdpdmVuIGBUeXBlYC5cbiAgICovXG4gIHJlc29sdmUodHlwZTogVHlwZSk6IERpcmVjdGl2ZU1ldGFkYXRhIHtcbiAgICB2YXIgdHlwZU1ldGFkYXRhID0gdGhpcy5fcmVmbGVjdG9yLmFubm90YXRpb25zKHJlc29sdmVGb3J3YXJkUmVmKHR5cGUpKTtcbiAgICBpZiAoaXNQcmVzZW50KHR5cGVNZXRhZGF0YSkpIHtcbiAgICAgIHZhciBtZXRhZGF0YSA9IHR5cGVNZXRhZGF0YS5maW5kKF9pc0RpcmVjdGl2ZU1ldGFkYXRhKTtcbiAgICAgIGlmIChpc1ByZXNlbnQobWV0YWRhdGEpKSB7XG4gICAgICAgIHZhciBwcm9wZXJ0eU1ldGFkYXRhID0gdGhpcy5fcmVmbGVjdG9yLnByb3BNZXRhZGF0YSh0eXBlKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lcmdlV2l0aFByb3BlcnR5TWV0YWRhdGEobWV0YWRhdGEsIHByb3BlcnR5TWV0YWRhdGEsIHR5cGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBObyBEaXJlY3RpdmUgYW5ub3RhdGlvbiBmb3VuZCBvbiAke3N0cmluZ2lmeSh0eXBlKX1gKTtcbiAgfVxuXG4gIHByaXZhdGUgX21lcmdlV2l0aFByb3BlcnR5TWV0YWRhdGEoZG06IERpcmVjdGl2ZU1ldGFkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5TWV0YWRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnlbXX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlVHlwZTogVHlwZSk6IERpcmVjdGl2ZU1ldGFkYXRhIHtcbiAgICB2YXIgaW5wdXRzID0gW107XG4gICAgdmFyIG91dHB1dHMgPSBbXTtcbiAgICB2YXIgaG9zdDoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgICB2YXIgcXVlcmllczoge1trZXk6IHN0cmluZ106IGFueX0gPSB7fTtcblxuICAgIFN0cmluZ01hcFdyYXBwZXIuZm9yRWFjaChwcm9wZXJ0eU1ldGFkYXRhLCAobWV0YWRhdGE6IGFueVtdLCBwcm9wTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICBtZXRhZGF0YS5mb3JFYWNoKGEgPT4ge1xuICAgICAgICBpZiAoYSBpbnN0YW5jZW9mIElucHV0TWV0YWRhdGEpIHtcbiAgICAgICAgICBpZiAoaXNQcmVzZW50KGEuYmluZGluZ1Byb3BlcnR5TmFtZSkpIHtcbiAgICAgICAgICAgIGlucHV0cy5wdXNoKGAke3Byb3BOYW1lfTogJHthLmJpbmRpbmdQcm9wZXJ0eU5hbWV9YCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlucHV0cy5wdXNoKHByb3BOYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYSBpbnN0YW5jZW9mIE91dHB1dE1ldGFkYXRhKSB7XG4gICAgICAgICAgaWYgKGlzUHJlc2VudChhLmJpbmRpbmdQcm9wZXJ0eU5hbWUpKSB7XG4gICAgICAgICAgICBvdXRwdXRzLnB1c2goYCR7cHJvcE5hbWV9OiAke2EuYmluZGluZ1Byb3BlcnR5TmFtZX1gKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3V0cHV0cy5wdXNoKHByb3BOYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYSBpbnN0YW5jZW9mIEhvc3RCaW5kaW5nTWV0YWRhdGEpIHtcbiAgICAgICAgICBpZiAoaXNQcmVzZW50KGEuaG9zdFByb3BlcnR5TmFtZSkpIHtcbiAgICAgICAgICAgIGhvc3RbYFske2EuaG9zdFByb3BlcnR5TmFtZX1dYF0gPSBwcm9wTmFtZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaG9zdFtgWyR7cHJvcE5hbWV9XWBdID0gcHJvcE5hbWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGEgaW5zdGFuY2VvZiBIb3N0TGlzdGVuZXJNZXRhZGF0YSkge1xuICAgICAgICAgIHZhciBhcmdzID0gaXNQcmVzZW50KGEuYXJncykgPyAoPGFueVtdPmEuYXJncykuam9pbignLCAnKSA6ICcnO1xuICAgICAgICAgIGhvc3RbYCgke2EuZXZlbnROYW1lfSlgXSA9IGAke3Byb3BOYW1lfSgke2FyZ3N9KWA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYSBpbnN0YW5jZW9mIENvbnRlbnRDaGlsZHJlbk1ldGFkYXRhKSB7XG4gICAgICAgICAgcXVlcmllc1twcm9wTmFtZV0gPSBhO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGEgaW5zdGFuY2VvZiBWaWV3Q2hpbGRyZW5NZXRhZGF0YSkge1xuICAgICAgICAgIHF1ZXJpZXNbcHJvcE5hbWVdID0gYTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhIGluc3RhbmNlb2YgQ29udGVudENoaWxkTWV0YWRhdGEpIHtcbiAgICAgICAgICBxdWVyaWVzW3Byb3BOYW1lXSA9IGE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYSBpbnN0YW5jZW9mIFZpZXdDaGlsZE1ldGFkYXRhKSB7XG4gICAgICAgICAgcXVlcmllc1twcm9wTmFtZV0gPSBhO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5fbWVyZ2UoZG0sIGlucHV0cywgb3V0cHV0cywgaG9zdCwgcXVlcmllcywgZGlyZWN0aXZlVHlwZSk7XG4gIH1cblxuICBwcml2YXRlIF9tZXJnZShkbTogRGlyZWN0aXZlTWV0YWRhdGEsIGlucHV0czogc3RyaW5nW10sIG91dHB1dHM6IHN0cmluZ1tdLFxuICAgICAgICAgICAgICAgICBob3N0OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSwgcXVlcmllczoge1trZXk6IHN0cmluZ106IGFueX0sXG4gICAgICAgICAgICAgICAgIGRpcmVjdGl2ZVR5cGU6IFR5cGUpOiBEaXJlY3RpdmVNZXRhZGF0YSB7XG4gICAgdmFyIG1lcmdlZElucHV0cyA9IGlzUHJlc2VudChkbS5pbnB1dHMpID8gTGlzdFdyYXBwZXIuY29uY2F0KGRtLmlucHV0cywgaW5wdXRzKSA6IGlucHV0cztcblxuICAgIHZhciBtZXJnZWRPdXRwdXRzO1xuICAgIGlmIChpc1ByZXNlbnQoZG0ub3V0cHV0cykpIHtcbiAgICAgIGRtLm91dHB1dHMuZm9yRWFjaCgocHJvcE5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICBpZiAoTGlzdFdyYXBwZXIuY29udGFpbnMob3V0cHV0cywgcHJvcE5hbWUpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgICAgICAgIGBPdXRwdXQgZXZlbnQgJyR7cHJvcE5hbWV9JyBkZWZpbmVkIG11bHRpcGxlIHRpbWVzIGluICcke3N0cmluZ2lmeShkaXJlY3RpdmVUeXBlKX0nYCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgbWVyZ2VkT3V0cHV0cyA9IExpc3RXcmFwcGVyLmNvbmNhdChkbS5vdXRwdXRzLCBvdXRwdXRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVyZ2VkT3V0cHV0cyA9IG91dHB1dHM7XG4gICAgfVxuXG4gICAgdmFyIG1lcmdlZEhvc3QgPSBpc1ByZXNlbnQoZG0uaG9zdCkgPyBTdHJpbmdNYXBXcmFwcGVyLm1lcmdlKGRtLmhvc3QsIGhvc3QpIDogaG9zdDtcbiAgICB2YXIgbWVyZ2VkUXVlcmllcyA9XG4gICAgICAgIGlzUHJlc2VudChkbS5xdWVyaWVzKSA/IFN0cmluZ01hcFdyYXBwZXIubWVyZ2UoZG0ucXVlcmllcywgcXVlcmllcykgOiBxdWVyaWVzO1xuXG4gICAgaWYgKGRtIGluc3RhbmNlb2YgQ29tcG9uZW50TWV0YWRhdGEpIHtcbiAgICAgIHJldHVybiBuZXcgQ29tcG9uZW50TWV0YWRhdGEoe1xuICAgICAgICBzZWxlY3RvcjogZG0uc2VsZWN0b3IsXG4gICAgICAgIGlucHV0czogbWVyZ2VkSW5wdXRzLFxuICAgICAgICBvdXRwdXRzOiBtZXJnZWRPdXRwdXRzLFxuICAgICAgICBob3N0OiBtZXJnZWRIb3N0LFxuICAgICAgICBleHBvcnRBczogZG0uZXhwb3J0QXMsXG4gICAgICAgIG1vZHVsZUlkOiBkbS5tb2R1bGVJZCxcbiAgICAgICAgcXVlcmllczogbWVyZ2VkUXVlcmllcyxcbiAgICAgICAgY2hhbmdlRGV0ZWN0aW9uOiBkbS5jaGFuZ2VEZXRlY3Rpb24sXG4gICAgICAgIHByb3ZpZGVyczogZG0ucHJvdmlkZXJzLFxuICAgICAgICB2aWV3UHJvdmlkZXJzOiBkbS52aWV3UHJvdmlkZXJzXG4gICAgICB9KTtcblxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IERpcmVjdGl2ZU1ldGFkYXRhKHtcbiAgICAgICAgc2VsZWN0b3I6IGRtLnNlbGVjdG9yLFxuICAgICAgICBpbnB1dHM6IG1lcmdlZElucHV0cyxcbiAgICAgICAgb3V0cHV0czogbWVyZ2VkT3V0cHV0cyxcbiAgICAgICAgaG9zdDogbWVyZ2VkSG9zdCxcbiAgICAgICAgZXhwb3J0QXM6IGRtLmV4cG9ydEFzLFxuICAgICAgICBxdWVyaWVzOiBtZXJnZWRRdWVyaWVzLFxuICAgICAgICBwcm92aWRlcnM6IGRtLnByb3ZpZGVyc1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB2YXIgQ09ERUdFTl9ESVJFQ1RJVkVfUkVTT0xWRVIgPSBuZXcgRGlyZWN0aXZlUmVzb2x2ZXIocmVmbGVjdG9yKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
