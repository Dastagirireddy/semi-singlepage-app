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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvbGlua2VyL2RpcmVjdGl2ZV9yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OzJCQXdLVywwQkFBMEI7SUFwSnJDLDhCQUE4QixJQUFTO1FBQ3JDLE1BQU0sQ0FBQyxJQUFJLFlBQVksNEJBQWlCLENBQUM7SUFDM0MsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUVEOzs7Ozs7ZUFNRztZQUVIO2dCQUdFLDJCQUFZLFVBQTRCO29CQUN0QyxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7b0JBQy9CLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sSUFBSSxDQUFDLFVBQVUsR0FBRyxzQkFBUyxDQUFDO29CQUM5QixDQUFDO2dCQUNILENBQUM7Z0JBRUQ7O21CQUVHO2dCQUNILG1DQUFPLEdBQVAsVUFBUSxJQUFVO29CQUNoQixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxzQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUN4RSxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDNUIsSUFBSSxRQUFRLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO3dCQUN2RCxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDeEIsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDMUQsTUFBTSxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxD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QyxRQUFROzRCQUNyQixPQUFPLEVBQUUsYUFBYTs0QkFDdEIsU0FBUyxFQUFFLEVBQUUsQ0FBQyxTQUFTO3lCQUN4QixDQUFDLENBQUM7b0JBQ0wsQ0FBQztnQkFDSCxDQUFDO2dCQXRJSDtvQkFBQyxlQUFVLEVBQUU7O3FDQUFBO2dCQXVJYix3QkFBQztZQUFELENBdElBLEFBc0lDLElBQUE7WUF0SUQsaURBc0lDLENBQUE7WUFFVSx3Q0FBQSwwQkFBMEIsR0FBRyxJQUFJLGlCQUFpQixDQUFDLHNCQUFTLENBQUMsQ0FBQSxDQUFDIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvbGlua2VyL2RpcmVjdGl2ZV9yZXNvbHZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7cmVzb2x2ZUZvcndhcmRSZWYsIEluamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7VHlwZSwgaXNQcmVzZW50LCBpc0JsYW5rLCBzdHJpbmdpZnl9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge0xpc3RXcmFwcGVyLCBTdHJpbmdNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuXG5pbXBvcnQge1xuICBEaXJlY3RpdmVNZXRhZGF0YSxcbiAgQ29tcG9uZW50TWV0YWRhdGEsXG4gIElucHV0TWV0YWRhdGEsXG4gIE91dHB1dE1ldGFkYXRhLFxuICBIb3N0QmluZGluZ01ldGFkYXRhLFxuICBIb3N0TGlzdGVuZXJNZXRhZGF0YSxcbiAgQ29udGVudENoaWxkcmVuTWV0YWRhdGEsXG4gIFZpZXdDaGlsZHJlbk1ldGFkYXRhLFxuICBDb250ZW50Q2hpbGRNZXRhZGF0YSxcbiAgVmlld0NoaWxkTWV0YWRhdGFcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbWV0YWRhdGEnO1xuaW1wb3J0IHtyZWZsZWN0b3J9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlZmxlY3Rpb24vcmVmbGVjdGlvbic7XG5pbXBvcnQge1JlZmxlY3RvclJlYWRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVmbGVjdGlvbi9yZWZsZWN0b3JfcmVhZGVyJztcblxuZnVuY3Rpb24gX2lzRGlyZWN0aXZlTWV0YWRhdGEodHlwZTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlIGluc3RhbmNlb2YgRGlyZWN0aXZlTWV0YWRhdGE7XG59XG5cbi8qXG4gKiBSZXNvbHZlIGEgYFR5cGVgIGZvciB7QGxpbmsgRGlyZWN0aXZlTWV0YWRhdGF9LlxuICpcbiAqIFRoaXMgaW50ZXJmYWNlIGNhbiBiZSBvdmVycmlkZGVuIGJ5IHRoZSBhcHBsaWNhdGlvbiBkZXZlbG9wZXIgdG8gY3JlYXRlIGN1c3RvbSBiZWhhdmlvci5cbiAqXG4gKiBTZWUge0BsaW5rIENvbXBpbGVyfVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGlyZWN0aXZlUmVzb2x2ZXIge1xuICBwcml2YXRlIF9yZWZsZWN0b3I6IFJlZmxlY3RvclJlYWRlcjtcblxuICBjb25zdHJ1Y3RvcihfcmVmbGVjdG9yPzogUmVmbGVjdG9yUmVhZGVyKSB7XG4gICAgaWYgKGlzUHJlc2VudChfcmVmbGVjdG9yKSkge1xuICAgICAgdGhpcy5fcmVmbGVjdG9yID0gX3JlZmxlY3RvcjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVmbGVjdG9yID0gcmVmbGVjdG9yO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4ge0BsaW5rIERpcmVjdGl2ZU1ldGFkYXRhfSBmb3IgYSBnaXZlbiBgVHlwZWAuXG4gICAqL1xuICByZXNvbHZlKHR5cGU6IFR5cGUpOiBEaXJlY3RpdmVNZXRhZGF0YSB7XG4gICAgdmFyIHR5cGVNZXRhZGF0YSA9IHRoaXMuX3JlZmxlY3Rvci5hbm5vdGF0aW9ucyhyZXNvbHZlRm9yd2FyZFJlZih0eXBlKSk7XG4gICAgaWYgKGlzUHJlc2VudCh0eXBlTWV0YWRhdGEpKSB7XG4gICAgICB2YXIgbWV0YWRhdGEgPSB0eXBlTWV0YWRhdGEuZmluZChfaXNEaXJlY3RpdmVNZXRhZGF0YSk7XG4gICAgICBpZiAoaXNQcmVzZW50KG1ldGFkYXRhKSkge1xuICAgICAgICB2YXIgcHJvcGVydHlNZXRhZGF0YSA9IHRoaXMuX3JlZmxlY3Rvci5wcm9wTWV0YWRhdGEodHlwZSk7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXJnZVdpdGhQcm9wZXJ0eU1ldGFkYXRhKG1ldGFkYXRhLCBwcm9wZXJ0eU1ldGFkYXRhLCB0eXBlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgTm8gRGlyZWN0aXZlIGFubm90YXRpb24gZm91bmQgb24gJHtzdHJpbmdpZnkodHlwZSl9YCk7XG4gIH1cblxuICBwcml2YXRlIF9tZXJnZVdpdGhQcm9wZXJ0eU1ldGFkYXRhKGRtOiBEaXJlY3RpdmVNZXRhZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eU1ldGFkYXRhOiB7W2tleTogc3RyaW5nXTogYW55W119LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZVR5cGU6IFR5cGUpOiBEaXJlY3RpdmVNZXRhZGF0YSB7XG4gICAgdmFyIGlucHV0cyA9IFtdO1xuICAgIHZhciBvdXRwdXRzID0gW107XG4gICAgdmFyIGhvc3Q6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gICAgdmFyIHF1ZXJpZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge307XG5cbiAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2gocHJvcGVydHlNZXRhZGF0YSwgKG1ldGFkYXRhOiBhbnlbXSwgcHJvcE5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgbWV0YWRhdGEuZm9yRWFjaChhID0+IHtcbiAgICAgICAgaWYgKGEgaW5zdGFuY2VvZiBJbnB1dE1ldGFkYXRhKSB7XG4gICAgICAgICAgaWYgKGlzUHJlc2VudChhLmJpbmRpbmdQcm9wZXJ0eU5hbWUpKSB7XG4gICAgICAgICAgICBpbnB1dHMucHVzaChgJHtwcm9wTmFtZX06ICR7YS5iaW5kaW5nUHJvcGVydHlOYW1lfWApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbnB1dHMucHVzaChwcm9wTmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGEgaW5zdGFuY2VvZiBPdXRwdXRNZXRhZGF0YSkge1xuICAgICAgICAgIGlmIChpc1ByZXNlbnQoYS5iaW5kaW5nUHJvcGVydHlOYW1lKSkge1xuICAgICAgICAgICAgb3V0cHV0cy5wdXNoKGAke3Byb3BOYW1lfTogJHthLmJpbmRpbmdQcm9wZXJ0eU5hbWV9YCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dHB1dHMucHVzaChwcm9wTmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGEgaW5zdGFuY2VvZiBIb3N0QmluZGluZ01ldGFkYXRhKSB7XG4gICAgICAgICAgaWYgKGlzUHJlc2VudChhLmhvc3RQcm9wZXJ0eU5hbWUpKSB7XG4gICAgICAgICAgICBob3N0W2BbJHthLmhvc3RQcm9wZXJ0eU5hbWV9XWBdID0gcHJvcE5hbWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhvc3RbYFske3Byb3BOYW1lfV1gXSA9IHByb3BOYW1lO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhIGluc3RhbmNlb2YgSG9zdExpc3RlbmVyTWV0YWRhdGEpIHtcbiAgICAgICAgICB2YXIgYXJncyA9IGlzUHJlc2VudChhLmFyZ3MpID8gKDxhbnlbXT5hLmFyZ3MpLmpvaW4oJywgJykgOiAnJztcbiAgICAgICAgICBob3N0W2AoJHthLmV2ZW50TmFtZX0pYF0gPSBgJHtwcm9wTmFtZX0oJHthcmdzfSlgO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGEgaW5zdGFuY2VvZiBDb250ZW50Q2hpbGRyZW5NZXRhZGF0YSkge1xuICAgICAgICAgIHF1ZXJpZXNbcHJvcE5hbWVdID0gYTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhIGluc3RhbmNlb2YgVmlld0NoaWxkcmVuTWV0YWRhdGEpIHtcbiAgICAgICAgICBxdWVyaWVzW3Byb3BOYW1lXSA9IGE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYSBpbnN0YW5jZW9mIENvbnRlbnRDaGlsZE1ldGFkYXRhKSB7XG4gICAgICAgICAgcXVlcmllc1twcm9wTmFtZV0gPSBhO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGEgaW5zdGFuY2VvZiBWaWV3Q2hpbGRNZXRhZGF0YSkge1xuICAgICAgICAgIHF1ZXJpZXNbcHJvcE5hbWVdID0gYTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuX21lcmdlKGRtLCBpbnB1dHMsIG91dHB1dHMsIGhvc3QsIHF1ZXJpZXMsIGRpcmVjdGl2ZVR5cGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbWVyZ2UoZG06IERpcmVjdGl2ZU1ldGFkYXRhLCBpbnB1dHM6IHN0cmluZ1tdLCBvdXRwdXRzOiBzdHJpbmdbXSxcbiAgICAgICAgICAgICAgICAgaG9zdDoge1trZXk6IHN0cmluZ106IHN0cmluZ30sIHF1ZXJpZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9LFxuICAgICAgICAgICAgICAgICBkaXJlY3RpdmVUeXBlOiBUeXBlKTogRGlyZWN0aXZlTWV0YWRhdGEge1xuICAgIHZhciBtZXJnZWRJbnB1dHMgPSBpc1ByZXNlbnQoZG0uaW5wdXRzKSA/IExpc3RXcmFwcGVyLmNvbmNhdChkbS5pbnB1dHMsIGlucHV0cykgOiBpbnB1dHM7XG5cbiAgICB2YXIgbWVyZ2VkT3V0cHV0cztcbiAgICBpZiAoaXNQcmVzZW50KGRtLm91dHB1dHMpKSB7XG4gICAgICBkbS5vdXRwdXRzLmZvckVhY2goKHByb3BOYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgaWYgKExpc3RXcmFwcGVyLmNvbnRhaW5zKG91dHB1dHMsIHByb3BOYW1lKSkge1xuICAgICAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFxuICAgICAgICAgICAgICBgT3V0cHV0IGV2ZW50ICcke3Byb3BOYW1lfScgZGVmaW5lZCBtdWx0aXBsZSB0aW1lcyBpbiAnJHtzdHJpbmdpZnkoZGlyZWN0aXZlVHlwZSl9J2ApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG1lcmdlZE91dHB1dHMgPSBMaXN0V3JhcHBlci5jb25jYXQoZG0ub3V0cHV0cywgb3V0cHV0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lcmdlZE91dHB1dHMgPSBvdXRwdXRzO1xuICAgIH1cblxuICAgIHZhciBtZXJnZWRIb3N0ID0gaXNQcmVzZW50KGRtLmhvc3QpID8gU3RyaW5nTWFwV3JhcHBlci5tZXJnZShkbS5ob3N0LCBob3N0KSA6IGhvc3Q7XG4gICAgdmFyIG1lcmdlZFF1ZXJpZXMgPVxuICAgICAgICBpc1ByZXNlbnQoZG0ucXVlcmllcykgPyBTdHJpbmdNYXBXcmFwcGVyLm1lcmdlKGRtLnF1ZXJpZXMsIHF1ZXJpZXMpIDogcXVlcmllcztcblxuICAgIGlmIChkbSBpbnN0YW5jZW9mIENvbXBvbmVudE1ldGFkYXRhKSB7XG4gICAgICByZXR1cm4gbmV3IENvbXBvbmVudE1ldGFkYXRhKHtcbiAgICAgICAgc2VsZWN0b3I6IGRtLnNlbGVjdG9yLFxuICAgICAgICBpbnB1dHM6IG1lcmdlZElucHV0cyxcbiAgICAgICAgb3V0cHV0czogbWVyZ2VkT3V0cHV0cyxcbiAgICAgICAgaG9zdDogbWVyZ2VkSG9zdCxcbiAgICAgICAgZXhwb3J0QXM6IGRtLmV4cG9ydEFzLFxuICAgICAgICBtb2R1bGVJZDogZG0ubW9kdWxlSWQsXG4gICAgICAgIHF1ZXJpZXM6IG1lcmdlZFF1ZXJpZXMsXG4gICAgICAgIGNoYW5nZURldGVjdGlvbjogZG0uY2hhbmdlRGV0ZWN0aW9uLFxuICAgICAgICBwcm92aWRlcnM6IGRtLnByb3ZpZGVycyxcbiAgICAgICAgdmlld1Byb3ZpZGVyczogZG0udmlld1Byb3ZpZGVyc1xuICAgICAgfSk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBEaXJlY3RpdmVNZXRhZGF0YSh7XG4gICAgICAgIHNlbGVjdG9yOiBkbS5zZWxlY3RvcixcbiAgICAgICAgaW5wdXRzOiBtZXJnZWRJbnB1dHMsXG4gICAgICAgIG91dHB1dHM6IG1lcmdlZE91dHB1dHMsXG4gICAgICAgIGhvc3Q6IG1lcmdlZEhvc3QsXG4gICAgICAgIGV4cG9ydEFzOiBkbS5leHBvcnRBcyxcbiAgICAgICAgcXVlcmllczogbWVyZ2VkUXVlcmllcyxcbiAgICAgICAgcHJvdmlkZXJzOiBkbS5wcm92aWRlcnNcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgdmFyIENPREVHRU5fRElSRUNUSVZFX1JFU09MVkVSID0gbmV3IERpcmVjdGl2ZVJlc29sdmVyKHJlZmxlY3Rvcik7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
