System.register(['./compile_metadata', 'angular2/src/facade/exceptions', 'angular2/src/facade/collection', './output/output_ast', 'angular2/src/core/linker/component_factory', './util'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var compile_metadata_1, exceptions_1, collection_1, o, component_factory_1, util_1;
    var _COMPONENT_FACTORY_IDENTIFIER, SourceModule, NormalizedComponentWithViewDirectives, OfflineCompiler;
    function _resolveViewStatements(compileResult) {
        compileResult.dependencies.forEach(function (dep) { dep.factoryPlaceholder.moduleUrl = _templateModuleUrl(dep.comp); });
        return compileResult.statements;
    }
    function _resolveStyleStatements(compileResult) {
        compileResult.dependencies.forEach(function (dep) {
            dep.valuePlaceholder.moduleUrl = _stylesModuleUrl(dep.sourceUrl, dep.isShimmed);
        });
        return compileResult.statements;
    }
    function _templateModuleUrl(comp) {
        var moduleUrl = comp.type.moduleUrl;
        var urlWithoutSuffix = moduleUrl.substring(0, moduleUrl.length - util_1.MODULE_SUFFIX.length);
        return urlWithoutSuffix + ".ngfactory" + util_1.MODULE_SUFFIX;
    }
    function _stylesModuleUrl(stylesheetUrl, shim) {
        return shim ? stylesheetUrl + ".shim" + util_1.MODULE_SUFFIX : "" + stylesheetUrl + util_1.MODULE_SUFFIX;
    }
    function _assertComponent(meta) {
        if (!meta.isComponent) {
            throw new exceptions_1.BaseException("Could not compile '" + meta.type.name + "' because it is not a component.");
        }
    }
    return {
        setters:[
            function (compile_metadata_1_1) {
                compile_metadata_1 = compile_metadata_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (o_1) {
                o = o_1;
            },
            function (component_factory_1_1) {
                component_factory_1 = component_factory_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            }],
        execute: function() {
            _COMPONENT_FACTORY_IDENTIFIER = new compile_metadata_1.CompileIdentifierMetadata({
                name: 'ComponentFactory',
                runtime: component_factory_1.ComponentFactory,
                moduleUrl: "asset:angular2/lib/src/core/linker/component_factory" + util_1.MODULE_SUFFIX
            });
            SourceModule = (function () {
                function SourceModule(moduleUrl, source) {
                    this.moduleUrl = moduleUrl;
                    this.source = source;
                }
                return SourceModule;
            }());
            exports_1("SourceModule", SourceModule);
            NormalizedComponentWithViewDirectives = (function () {
                function NormalizedComponentWithViewDirectives(component, directives, pipes) {
                    this.component = component;
                    this.directives = directives;
                    this.pipes = pipes;
                }
                return NormalizedComponentWithViewDirectives;
            }());
            exports_1("NormalizedComponentWithViewDirectives", NormalizedComponentWithViewDirectives);
            OfflineCompiler = (function () {
                function OfflineCompiler(_directiveNormalizer, _templateParser, _styleCompiler, _viewCompiler, _outputEmitter) {
                    this._directiveNormalizer = _directiveNormalizer;
                    this._templateParser = _templateParser;
                    this._styleCompiler = _styleCompiler;
                    this._viewCompiler = _viewCompiler;
                    this._outputEmitter = _outputEmitter;
                }
                OfflineCompiler.prototype.normalizeDirectiveMetadata = function (directive) {
                    return this._directiveNormalizer.normalizeDirective(directive);
                };
                OfflineCompiler.prototype.compileTemplates = function (components) {
                    var _this = this;
                    if (components.length === 0) {
                        throw new exceptions_1.BaseException('No components given');
                    }
                    var statements = [];
                    var exportedVars = [];
                    var moduleUrl = _templateModuleUrl(components[0].component);
                    components.forEach(function (componentWithDirs) {
                        var compMeta = componentWithDirs.component;
                        _assertComponent(compMeta);
                        var compViewFactoryVar = _this._compileComponent(compMeta, componentWithDirs.directives, componentWithDirs.pipes, statements);
                        exportedVars.push(compViewFactoryVar);
                        var hostMeta = compile_metadata_1.createHostComponentMeta(compMeta.type, compMeta.selector);
                        var hostViewFactoryVar = _this._compileComponent(hostMeta, [compMeta], [], statements);
                        var compFactoryVar = compMeta.type.name + "NgFactory";
                        statements.push(o.variable(compFactoryVar)
                            .set(o.importExpr(_COMPONENT_FACTORY_IDENTIFIER)
                            .instantiate([
                            o.literal(compMeta.selector),
                            o.variable(hostViewFactoryVar),
                            o.importExpr(compMeta.type)
                        ], o.importType(_COMPONENT_FACTORY_IDENTIFIER, null, [o.TypeModifier.Const])))
                            .toDeclStmt(null, [o.StmtModifier.Final]));
                        exportedVars.push(compFactoryVar);
                    });
                    return this._codegenSourceModule(moduleUrl, statements, exportedVars);
                };
                OfflineCompiler.prototype.compileStylesheet = function (stylesheetUrl, cssText) {
                    var plainStyles = this._styleCompiler.compileStylesheet(stylesheetUrl, cssText, false);
                    var shimStyles = this._styleCompiler.compileStylesheet(stylesheetUrl, cssText, true);
                    return [
                        this._codegenSourceModule(_stylesModuleUrl(stylesheetUrl, false), _resolveStyleStatements(plainStyles), [plainStyles.stylesVar]),
                        this._codegenSourceModule(_stylesModuleUrl(stylesheetUrl, true), _resolveStyleStatements(shimStyles), [shimStyles.stylesVar])
                    ];
                };
                OfflineCompiler.prototype._compileComponent = function (compMeta, directives, pipes, targetStatements) {
                    var styleResult = this._styleCompiler.compileComponent(compMeta);
                    var parsedTemplate = this._templateParser.parse(compMeta, compMeta.template.template, directives, pipes, compMeta.type.name);
                    var viewResult = this._viewCompiler.compileComponent(compMeta, parsedTemplate, o.variable(styleResult.stylesVar), pipes);
                    collection_1.ListWrapper.addAll(targetStatements, _resolveStyleStatements(styleResult));
                    collection_1.ListWrapper.addAll(targetStatements, _resolveViewStatements(viewResult));
                    return viewResult.viewFactoryVar;
                };
                OfflineCompiler.prototype._codegenSourceModule = function (moduleUrl, statements, exportedVars) {
                    return new SourceModule(moduleUrl, this._outputEmitter.emitStatements(moduleUrl, statements, exportedVars));
                };
                return OfflineCompiler;
            }());
            exports_1("OfflineCompiler", OfflineCompiler);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9vZmZsaW5lX2NvbXBpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFxQkksNkJBQTZCO0lBMEZqQyxnQ0FBZ0MsYUFBZ0M7UUFDOUQsYUFBYSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQzlCLFVBQUMsR0FBRyxJQUFPLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkYsTUFBTSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7SUFDbEMsQ0FBQztJQUdELGlDQUFpQyxhQUFrQztRQUNqRSxhQUFhLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7WUFDckMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsRixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO0lBQ2xDLENBQUM7SUFFRCw0QkFBNEIsSUFBOEI7UUFDeEQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDcEMsSUFBSSxnQkFBZ0IsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsTUFBTSxHQUFHLG9CQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkYsTUFBTSxDQUFJLGdCQUFnQixrQkFBYSxvQkFBZSxDQUFDO0lBQ3pELENBQUM7SUFFRCwwQkFBMEIsYUFBcUIsRUFBRSxJQUFhO1FBQzVELE1BQU0sQ0FBQyxJQUFJLEdBQU0sYUFBYSxhQUFRLG9CQUFlLEdBQUcsS0FBRyxhQUFhLEdBQUcsb0JBQWUsQ0FBQztJQUM3RixDQUFDO0lBRUQsMEJB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QUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUMxRixDQUFDO2dCQUNILHNCQUFDO1lBQUQsQ0F6RUEsQUF5RUMsSUFBQTtZQXpFRCw2Q0F5RUMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tcGlsZXIvb2ZmbGluZV9jb21waWxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSxcbiAgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSxcbiAgQ29tcGlsZVBpcGVNZXRhZGF0YSxcbiAgY3JlYXRlSG9zdENvbXBvbmVudE1ldGFcbn0gZnJvbSAnLi9jb21waWxlX21ldGFkYXRhJztcblxuaW1wb3J0IHtCYXNlRXhjZXB0aW9uLCB1bmltcGxlbWVudGVkfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7U3R5bGVDb21waWxlciwgU3R5bGVzQ29tcGlsZURlcGVuZGVuY3ksIFN0eWxlc0NvbXBpbGVSZXN1bHR9IGZyb20gJy4vc3R5bGVfY29tcGlsZXInO1xuaW1wb3J0IHtWaWV3Q29tcGlsZXIsIFZpZXdDb21waWxlUmVzdWx0fSBmcm9tICcuL3ZpZXdfY29tcGlsZXIvdmlld19jb21waWxlcic7XG5pbXBvcnQge1RlbXBsYXRlUGFyc2VyfSBmcm9tICcuL3RlbXBsYXRlX3BhcnNlcic7XG5pbXBvcnQge0RpcmVjdGl2ZU5vcm1hbGl6ZXJ9IGZyb20gJy4vZGlyZWN0aXZlX25vcm1hbGl6ZXInO1xuaW1wb3J0IHtPdXRwdXRFbWl0dGVyfSBmcm9tICcuL291dHB1dC9hYnN0cmFjdF9lbWl0dGVyJztcbmltcG9ydCAqIGFzIG8gZnJvbSAnLi9vdXRwdXQvb3V0cHV0X2FzdCc7XG5pbXBvcnQge0NvbXBvbmVudEZhY3Rvcnl9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9jb21wb25lbnRfZmFjdG9yeSc7XG5cbmltcG9ydCB7XG4gIE1PRFVMRV9TVUZGSVgsXG59IGZyb20gJy4vdXRpbCc7XG5cbnZhciBfQ09NUE9ORU5UX0ZBQ1RPUllfSURFTlRJRklFUiA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKHtcbiAgbmFtZTogJ0NvbXBvbmVudEZhY3RvcnknLFxuICBydW50aW1lOiBDb21wb25lbnRGYWN0b3J5LFxuICBtb2R1bGVVcmw6IGBhc3NldDphbmd1bGFyMi9saWIvc3JjL2NvcmUvbGlua2VyL2NvbXBvbmVudF9mYWN0b3J5JHtNT0RVTEVfU1VGRklYfWBcbn0pO1xuXG5leHBvcnQgY2xhc3MgU291cmNlTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocHVibGljIG1vZHVsZVVybDogc3RyaW5nLCBwdWJsaWMgc291cmNlOiBzdHJpbmcpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBOb3JtYWxpemVkQ29tcG9uZW50V2l0aFZpZXdEaXJlY3RpdmVzIHtcbiAgY29uc3RydWN0b3IocHVibGljIGNvbXBvbmVudDogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLFxuICAgICAgICAgICAgICBwdWJsaWMgZGlyZWN0aXZlczogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhW10sIHB1YmxpYyBwaXBlczogQ29tcGlsZVBpcGVNZXRhZGF0YVtdKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgT2ZmbGluZUNvbXBpbGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGlyZWN0aXZlTm9ybWFsaXplcjogRGlyZWN0aXZlTm9ybWFsaXplcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfdGVtcGxhdGVQYXJzZXI6IFRlbXBsYXRlUGFyc2VyLCBwcml2YXRlIF9zdHlsZUNvbXBpbGVyOiBTdHlsZUNvbXBpbGVyLFxuICAgICAgICAgICAgICBwcml2YXRlIF92aWV3Q29tcGlsZXI6IFZpZXdDb21waWxlciwgcHJpdmF0ZSBfb3V0cHV0RW1pdHRlcjogT3V0cHV0RW1pdHRlcikge31cblxuICBub3JtYWxpemVEaXJlY3RpdmVNZXRhZGF0YShkaXJlY3RpdmU6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSk6XG4gICAgICBQcm9taXNlPENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YT4ge1xuICAgIHJldHVybiB0aGlzLl9kaXJlY3RpdmVOb3JtYWxpemVyLm5vcm1hbGl6ZURpcmVjdGl2ZShkaXJlY3RpdmUpO1xuICB9XG5cbiAgY29tcGlsZVRlbXBsYXRlcyhjb21wb25lbnRzOiBOb3JtYWxpemVkQ29tcG9uZW50V2l0aFZpZXdEaXJlY3RpdmVzW10pOiBTb3VyY2VNb2R1bGUge1xuICAgIGlmIChjb21wb25lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oJ05vIGNvbXBvbmVudHMgZ2l2ZW4nKTtcbiAgICB9XG4gICAgdmFyIHN0YXRlbWVudHMgPSBbXTtcbiAgICB2YXIgZXhwb3J0ZWRWYXJzID0gW107XG4gICAgdmFyIG1vZHVsZVVybCA9IF90ZW1wbGF0ZU1vZHVsZVVybChjb21wb25lbnRzWzBdLmNvbXBvbmVudCk7XG4gICAgY29tcG9uZW50cy5mb3JFYWNoKGNvbXBvbmVudFdpdGhEaXJzID0+IHtcbiAgICAgIHZhciBjb21wTWV0YSA9IDxDb21waWxlRGlyZWN0aXZlTWV0YWRhdGE+Y29tcG9uZW50V2l0aERpcnMuY29tcG9uZW50O1xuICAgICAgX2Fzc2VydENvbXBvbmVudChjb21wTWV0YSk7XG4gICAgICB2YXIgY29tcFZpZXdGYWN0b3J5VmFyID0gdGhpcy5fY29tcGlsZUNvbXBvbmVudChjb21wTWV0YSwgY29tcG9uZW50V2l0aERpcnMuZGlyZWN0aXZlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudFdpdGhEaXJzLnBpcGVzLCBzdGF0ZW1lbnRzKTtcbiAgICAgIGV4cG9ydGVkVmFycy5wdXNoKGNvbXBWaWV3RmFjdG9yeVZhcik7XG5cbiAgICAgIHZhciBob3N0TWV0YSA9IGNyZWF0ZUhvc3RDb21wb25lbnRNZXRhKGNvbXBNZXRhLnR5cGUsIGNvbXBNZXRhLnNlbGVjdG9yKTtcbiAgICAgIHZhciBob3N0Vmlld0ZhY3RvcnlWYXIgPSB0aGlzLl9jb21waWxlQ29tcG9uZW50KGhvc3RNZXRhLCBbY29tcE1ldGFdLCBbXSwgc3RhdGVtZW50cyk7XG4gICAgICB2YXIgY29tcEZhY3RvcnlWYXIgPSBgJHtjb21wTWV0YS50eXBlLm5hbWV9TmdGYWN0b3J5YDtcbiAgICAgIHN0YXRlbWVudHMucHVzaChvLnZhcmlhYmxlKGNvbXBGYWN0b3J5VmFyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuc2V0KG8uaW1wb3J0RXhwcihfQ09NUE9ORU5UX0ZBQ1RPUllfSURFTlRJRklFUilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmluc3RhbnRpYXRlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLmxpdGVyYWwoY29tcE1ldGEuc2VsZWN0b3IpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLnZhcmlhYmxlKGhvc3RWaWV3RmFjdG9yeVZhciksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8uaW1wb3J0RXhwcihjb21wTWV0YS50eXBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8uaW1wb3J0VHlwZShfQ09NUE9ORU5UX0ZBQ1RPUllfSURFTlRJRklFUiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbby5UeXBlTW9kaWZpZXIuQ29uc3RdKSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC50b0RlY2xTdG10KG51bGwsIFtvLlN0bXRNb2RpZmllci5GaW5hbF0pKTtcbiAgICAgIGV4cG9ydGVkVmFycy5wdXNoKGNvbXBGYWN0b3J5VmFyKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5fY29kZWdlblNvdXJjZU1vZHVsZShtb2R1bGVVcmwsIHN0YXRlbWVudHMsIGV4cG9ydGVkVmFycyk7XG4gIH1cblxuICBjb21waWxlU3R5bGVzaGVldChzdHlsZXNoZWV0VXJsOiBzdHJpbmcsIGNzc1RleHQ6IHN0cmluZyk6IFNvdXJjZU1vZHVsZVtdIHtcbiAgICB2YXIgcGxhaW5TdHlsZXMgPSB0aGlzLl9zdHlsZUNvbXBpbGVyLmNvbXBpbGVTdHlsZXNoZWV0KHN0eWxlc2hlZXRVcmwsIGNzc1RleHQsIGZhbHNlKTtcbiAgICB2YXIgc2hpbVN0eWxlcyA9IHRoaXMuX3N0eWxlQ29tcGlsZXIuY29tcGlsZVN0eWxlc2hlZXQoc3R5bGVzaGVldFVybCwgY3NzVGV4dCwgdHJ1ZSk7XG4gICAgcmV0dXJuIFtcbiAgICAgIHRoaXMuX2NvZGVnZW5Tb3VyY2VNb2R1bGUoX3N0eWxlc01vZHVsZVVybChzdHlsZXNoZWV0VXJsLCBmYWxzZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZXNvbHZlU3R5bGVTdGF0ZW1lbnRzKHBsYWluU3R5bGVzKSwgW3BsYWluU3R5bGVzLnN0eWxlc1Zhcl0pLFxuICAgICAgdGhpcy5fY29kZWdlblNvdXJjZU1vZHVsZShfc3R5bGVzTW9kdWxlVXJsKHN0eWxlc2hlZXRVcmwsIHRydWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVzb2x2ZVN0eWxlU3RhdGVtZW50cyhzaGltU3R5bGVzKSwgW3NoaW1TdHlsZXMuc3R5bGVzVmFyXSlcbiAgICBdO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29tcGlsZUNvbXBvbmVudChjb21wTWV0YTogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YVtdLCBwaXBlczogQ29tcGlsZVBpcGVNZXRhZGF0YVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFN0YXRlbWVudHM6IG8uU3RhdGVtZW50W10pOiBzdHJpbmcge1xuICAgIHZhciBzdHlsZVJlc3VsdCA9IHRoaXMuX3N0eWxlQ29tcGlsZXIuY29tcGlsZUNvbXBvbmVudChjb21wTWV0YSk7XG4gICAgdmFyIHBhcnNlZFRlbXBsYXRlID0gdGhpcy5fdGVtcGxhdGVQYXJzZXIucGFyc2UoY29tcE1ldGEsIGNvbXBNZXRhLnRlbXBsYXRlLnRlbXBsYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXMsIHBpcGVzLCBjb21wTWV0YS50eXBlLm5hbWUpO1xuICAgIHZhciB2aWV3UmVzdWx0ID0gdGhpcy5fdmlld0NvbXBpbGVyLmNvbXBpbGVDb21wb25lbnQoY29tcE1ldGEsIHBhcnNlZFRlbXBsYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgby52YXJpYWJsZShzdHlsZVJlc3VsdC5zdHlsZXNWYXIpLCBwaXBlcyk7XG4gICAgTGlzdFdyYXBwZXIuYWRkQWxsKHRhcmdldFN0YXRlbWVudHMsIF9yZXNvbHZlU3R5bGVTdGF0ZW1lbnRzKHN0eWxlUmVzdWx0KSk7XG4gICAgTGlzdFdyYXBwZXIuYWRkQWxsKHRhcmdldFN0YXRlbWVudHMsIF9yZXNvbHZlVmlld1N0YXRlbWVudHModmlld1Jlc3VsdCkpO1xuICAgIHJldHVybiB2aWV3UmVzdWx0LnZpZXdGYWN0b3J5VmFyO1xuICB9XG5cblxuICBwcml2YXRlIF9jb2RlZ2VuU291cmNlTW9kdWxlKG1vZHVsZVVybDogc3RyaW5nLCBzdGF0ZW1lbnRzOiBvLlN0YXRlbWVudFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cG9ydGVkVmFyczogc3RyaW5nW10pOiBTb3VyY2VNb2R1bGUge1xuICAgIHJldHVybiBuZXcgU291cmNlTW9kdWxlKFxuICAgICAgICBtb2R1bGVVcmwsIHRoaXMuX291dHB1dEVtaXR0ZXIuZW1pdFN0YXRlbWVudHMobW9kdWxlVXJsLCBzdGF0ZW1lbnRzLCBleHBvcnRlZFZhcnMpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfcmVzb2x2ZVZpZXdTdGF0ZW1lbnRzKGNvbXBpbGVSZXN1bHQ6IFZpZXdDb21waWxlUmVzdWx0KTogby5TdGF0ZW1lbnRbXSB7XG4gIGNvbXBpbGVSZXN1bHQuZGVwZW5kZW5jaWVzLmZvckVhY2goXG4gICAgICAoZGVwKSA9PiB7IGRlcC5mYWN0b3J5UGxhY2Vob2xkZXIubW9kdWxlVXJsID0gX3RlbXBsYXRlTW9kdWxlVXJsKGRlcC5jb21wKTsgfSk7XG4gIHJldHVybiBjb21waWxlUmVzdWx0LnN0YXRlbWVudHM7XG59XG5cblxuZnVuY3Rpb24gX3Jlc29sdmVTdHlsZVN0YXRlbWVudHMoY29tcGlsZVJlc3VsdDogU3R5bGVzQ29tcGlsZVJlc3VsdCk6IG8uU3RhdGVtZW50W10ge1xuICBjb21waWxlUmVzdWx0LmRlcGVuZGVuY2llcy5mb3JFYWNoKChkZXApID0+IHtcbiAgICBkZXAudmFsdWVQbGFjZWhvbGRlci5tb2R1bGVVcmwgPSBfc3R5bGVzTW9kdWxlVXJsKGRlcC5zb3VyY2VVcmwsIGRlcC5pc1NoaW1tZWQpO1xuICB9KTtcbiAgcmV0dXJuIGNvbXBpbGVSZXN1bHQuc3RhdGVtZW50cztcbn1cblxuZnVuY3Rpb24gX3RlbXBsYXRlTW9kdWxlVXJsKGNvbXA6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSk6IHN0cmluZyB7XG4gIHZhciBtb2R1bGVVcmwgPSBjb21wLnR5cGUubW9kdWxlVXJsO1xuICB2YXIgdXJsV2l0aG91dFN1ZmZpeCA9IG1vZHVsZVVybC5zdWJzdHJpbmcoMCwgbW9kdWxlVXJsLmxlbmd0aCAtIE1PRFVMRV9TVUZGSVgubGVuZ3RoKTtcbiAgcmV0dXJuIGAke3VybFdpdGhvdXRTdWZmaXh9Lm5nZmFjdG9yeSR7TU9EVUxFX1NVRkZJWH1gO1xufVxuXG5mdW5jdGlvbiBfc3R5bGVzTW9kdWxlVXJsKHN0eWxlc2hlZXRVcmw6IHN0cmluZywgc2hpbTogYm9vbGVhbik6IHN0cmluZyB7XG4gIHJldHVybiBzaGltID8gYCR7c3R5bGVzaGVldFVybH0uc2hpbSR7TU9EVUxFX1NVRkZJWH1gIDogYCR7c3R5bGVzaGVldFVybH0ke01PRFVMRV9TVUZGSVh9YDtcbn1cblxuZnVuY3Rpb24gX2Fzc2VydENvbXBvbmVudChtZXRhOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEpIHtcbiAgaWYgKCFtZXRhLmlzQ29tcG9uZW50KSB7XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYENvdWxkIG5vdCBjb21waWxlICcke21ldGEudHlwZS5uYW1lfScgYmVjYXVzZSBpdCBpcyBub3QgYSBjb21wb25lbnQuYCk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
