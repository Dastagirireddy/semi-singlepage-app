System.register(['angular2/src/facade/lang', 'angular2/src/facade/collection', '../output/output_ast', './constants', './compile_query', './compile_method', './compile_pipe', 'angular2/src/core/linker/view_type', '../compile_metadata', './util'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, collection_1, o, constants_1, compile_query_1, compile_method_1, compile_pipe_1, view_type_1, compile_metadata_1, util_1;
    var CompileView;
    function getViewType(component, embeddedTemplateIndex) {
        if (embeddedTemplateIndex > 0) {
            return view_type_1.ViewType.EMBEDDED;
        }
        else if (component.type.isHost) {
            return view_type_1.ViewType.HOST;
        }
        else {
            return view_type_1.ViewType.COMPONENT;
        }
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (o_1) {
                o = o_1;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            },
            function (compile_query_1_1) {
                compile_query_1 = compile_query_1_1;
            },
            function (compile_method_1_1) {
                compile_method_1 = compile_method_1_1;
            },
            function (compile_pipe_1_1) {
                compile_pipe_1 = compile_pipe_1_1;
            },
            function (view_type_1_1) {
                view_type_1 = view_type_1_1;
            },
            function (compile_metadata_1_1) {
                compile_metadata_1 = compile_metadata_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            }],
        execute: function() {
            CompileView = (function () {
                function CompileView(component, genConfig, pipeMetas, styles, viewIndex, declarationElement, templateVariableBindings) {
                    var _this = this;
                    this.component = component;
                    this.genConfig = genConfig;
                    this.pipeMetas = pipeMetas;
                    this.styles = styles;
                    this.viewIndex = viewIndex;
                    this.declarationElement = declarationElement;
                    this.templateVariableBindings = templateVariableBindings;
                    this.nodes = [];
                    // root nodes or AppElements for ViewContainers
                    this.rootNodesOrAppElements = [];
                    this.bindings = [];
                    this.classStatements = [];
                    this.eventHandlerMethods = [];
                    this.fields = [];
                    this.getters = [];
                    this.disposables = [];
                    this.subscriptions = [];
                    this.purePipes = new Map();
                    this.pipes = [];
                    this.locals = new Map();
                    this.literalArrayCount = 0;
                    this.literalMapCount = 0;
                    this.pipeCount = 0;
                    this.createMethod = new compile_method_1.CompileMethod(this);
                    this.injectorGetMethod = new compile_method_1.CompileMethod(this);
                    this.updateContentQueriesMethod = new compile_method_1.CompileMethod(this);
                    this.dirtyParentQueriesMethod = new compile_method_1.CompileMethod(this);
                    this.updateViewQueriesMethod = new compile_method_1.CompileMethod(this);
                    this.detectChangesInInputsMethod = new compile_method_1.CompileMethod(this);
                    this.detectChangesRenderPropertiesMethod = new compile_method_1.CompileMethod(this);
                    this.afterContentLifecycleCallbacksMethod = new compile_method_1.CompileMethod(this);
                    this.afterViewLifecycleCallbacksMethod = new compile_method_1.CompileMethod(this);
                    this.destroyMethod = new compile_method_1.CompileMethod(this);
                    this.viewType = getViewType(component, viewIndex);
                    this.className = "_View_" + component.type.name + viewIndex;
                    this.classType = o.importType(new compile_metadata_1.CompileIdentifierMetadata({ name: this.className }));
                    this.viewFactory = o.variable(util_1.getViewFactoryName(component, viewIndex));
                    if (this.viewType === view_type_1.ViewType.COMPONENT || this.viewType === view_type_1.ViewType.HOST) {
                        this.componentView = this;
                    }
                    else {
                        this.componentView = this.declarationElement.view.componentView;
                    }
                    var viewQueries = new compile_metadata_1.CompileTokenMap();
                    if (this.viewType === view_type_1.ViewType.COMPONENT) {
                        var directiveInstance = o.THIS_EXPR.prop('context');
                        collection_1.ListWrapper.forEachWithIndex(this.component.viewQueries, function (queryMeta, queryIndex) {
                            var propName = "_viewQuery_" + queryMeta.selectors[0].name + "_" + queryIndex;
                            var queryList = compile_query_1.createQueryList(queryMeta, directiveInstance, propName, _this);
                            var query = new compile_query_1.CompileQuery(queryMeta, queryList, directiveInstance, _this);
                            compile_query_1.addQueryToTokenMap(viewQueries, query);
                        });
                        var constructorViewQueryCount = 0;
                        this.component.type.diDeps.forEach(function (dep) {
                            if (lang_1.isPresent(dep.viewQuery)) {
                                var queryList = o.THIS_EXPR.prop('declarationAppElement')
                                    .prop('componentConstructorViewQueries')
                                    .key(o.literal(constructorViewQueryCount++));
                                var query = new compile_query_1.CompileQuery(dep.viewQuery, queryList, null, _this);
                                compile_query_1.addQueryToTokenMap(viewQueries, query);
                            }
                        });
                    }
                    this.viewQueries = viewQueries;
                    templateVariableBindings.forEach(function (entry) {
                        _this.locals.set(entry[1], o.THIS_EXPR.prop('locals').key(o.literal(entry[0])));
                    });
                    if (!this.declarationElement.isNull()) {
                        this.declarationElement.setEmbeddedView(this);
                    }
                }
                CompileView.prototype.callPipe = function (name, input, args) {
                    var compView = this.componentView;
                    var pipe = compView.purePipes.get(name);
                    if (lang_1.isBlank(pipe)) {
                        pipe = new compile_pipe_1.CompilePipe(compView, name);
                        if (pipe.pure) {
                            compView.purePipes.set(name, pipe);
                        }
                        compView.pipes.push(pipe);
                    }
                    return pipe.call(this, [input].concat(args));
                };
                CompileView.prototype.getLocal = function (name) {
                    if (name == constants_1.EventHandlerVars.event.name) {
                        return constants_1.EventHandlerVars.event;
                    }
                    var currView = this;
                    var result = currView.locals.get(name);
                    while (lang_1.isBlank(result) && lang_1.isPresent(currView.declarationElement.view)) {
                        currView = currView.declarationElement.view;
                        result = currView.locals.get(name);
                    }
                    if (lang_1.isPresent(result)) {
                        return util_1.getPropertyInView(result, this, currView);
                    }
                    else {
                        return null;
                    }
                };
                CompileView.prototype.createLiteralArray = function (values) {
                    var proxyExpr = o.THIS_EXPR.prop("_arr_" + this.literalArrayCount++);
                    var proxyParams = [];
                    var proxyReturnEntries = [];
                    for (var i = 0; i < values.length; i++) {
                        var paramName = "p" + i;
                        proxyParams.push(new o.FnParam(paramName));
                        proxyReturnEntries.push(o.variable(paramName));
                    }
                    util_1.createPureProxy(o.fn(proxyParams, [new o.ReturnStatement(o.literalArr(proxyReturnEntries))]), values.length, proxyExpr, this);
                    return proxyExpr.callFn(values);
                };
                CompileView.prototype.createLiteralMap = function (entries) {
                    var proxyExpr = o.THIS_EXPR.prop("_map_" + this.literalMapCount++);
                    var proxyParams = [];
                    var proxyReturnEntries = [];
                    var values = [];
                    for (var i = 0; i < entries.length; i++) {
                        var paramName = "p" + i;
                        proxyParams.push(new o.FnParam(paramName));
                        proxyReturnEntries.push([entries[i][0], o.variable(paramName)]);
                        values.push(entries[i][1]);
                    }
                    util_1.createPureProxy(o.fn(proxyParams, [new o.ReturnStatement(o.literalMap(proxyReturnEntries))]), entries.length, proxyExpr, this);
                    return proxyExpr.callFn(values);
                };
                CompileView.prototype.afterNodes = function () {
                    var _this = this;
                    this.pipes.forEach(function (pipe) { return pipe.create(); });
                    this.viewQueries.values().forEach(function (queries) { return queries.forEach(function (query) { return query.afterChildren(_this.updateViewQueriesMethod); }); });
                };
                return CompileView;
            }());
            exports_1("CompileView", CompileView);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci92aWV3X2NvbXBpbGVyL2NvbXBpbGVfdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztJQTZMQSxxQkFBcUIsU0FBbUMsRUFBRSxxQkFBNkI7UUFDckYsRUFBRSxDQUFDLENBQUMscUJBQXFCLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixNQUFNLENBQUMsb0JBQVEsQ0FBQyxRQUFRLENBQUM7UUFDM0IsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLG9CQUFRLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxvQkFBUSxDQUFDLFNBQVMsQ0FBQztRQUM1QixDQUFDO0lBQ0gsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQTFLRDtnQkF3Q0UscUJBQW1CLFNBQW1DLEVBQVMsU0FBeUIsRUFDckUsU0FBZ0MsRUFBUyxNQUFvQixFQUM3RCxTQUFpQixFQUFTLGtCQUFrQyxFQUM1RCx3QkFBb0M7b0JBM0N6RCxpQkFnS0M7b0JBeEhvQixjQUFTLEdBQVQsU0FBUyxDQUEwQjtvQkFBUyxjQUFTLEdBQVQsU0FBUyxDQUFnQjtvQkFDckUsY0FBUyxHQUFULFNBQVMsQ0FBdUI7b0JBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBYztvQkFDN0QsY0FBUyxHQUFULFNBQVMsQ0FBUTtvQkFBUyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQWdCO29CQUM1RCw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQVk7b0JBdkNoRCxVQUFLLEdBQWtCLEVBQUUsQ0FBQztvQkFDakMsK0NBQStDO29CQUN4QywyQkFBc0IsR0FBbUIsRUFBRSxDQUFDO29CQUU1QyxhQUFRLEdBQXFCLEVBQUUsQ0FBQztv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L3NyYy9jb21waWxlci92aWV3X2NvbXBpbGVyL2NvbXBpbGVfdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNQcmVzZW50LCBpc0JsYW5rfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtMaXN0V3JhcHBlciwgU3RyaW5nTWFwV3JhcHBlciwgTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcblxuaW1wb3J0ICogYXMgbyBmcm9tICcuLi9vdXRwdXQvb3V0cHV0X2FzdCc7XG5pbXBvcnQge0V2ZW50SGFuZGxlclZhcnN9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7Q29tcGlsZVF1ZXJ5LCBjcmVhdGVRdWVyeUxpc3QsIGFkZFF1ZXJ5VG9Ub2tlbk1hcH0gZnJvbSAnLi9jb21waWxlX3F1ZXJ5JztcbmltcG9ydCB7TmFtZVJlc29sdmVyfSBmcm9tICcuL2V4cHJlc3Npb25fY29udmVydGVyJztcbmltcG9ydCB7Q29tcGlsZUVsZW1lbnQsIENvbXBpbGVOb2RlfSBmcm9tICcuL2NvbXBpbGVfZWxlbWVudCc7XG5pbXBvcnQge0NvbXBpbGVNZXRob2R9IGZyb20gJy4vY29tcGlsZV9tZXRob2QnO1xuaW1wb3J0IHtDb21waWxlUGlwZX0gZnJvbSAnLi9jb21waWxlX3BpcGUnO1xuaW1wb3J0IHtWaWV3VHlwZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL3ZpZXdfdHlwZSc7XG5pbXBvcnQge1xuICBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsXG4gIENvbXBpbGVQaXBlTWV0YWRhdGEsXG4gIENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEsXG4gIENvbXBpbGVUb2tlbk1hcFxufSBmcm9tICcuLi9jb21waWxlX21ldGFkYXRhJztcbmltcG9ydCB7XG4gIGdldFZpZXdGYWN0b3J5TmFtZSxcbiAgaW5qZWN0RnJvbVZpZXdQYXJlbnRJbmplY3RvcixcbiAgY3JlYXRlRGlUb2tlbkV4cHJlc3Npb24sXG4gIGdldFByb3BlcnR5SW5WaWV3LFxuICBjcmVhdGVQdXJlUHJveHlcbn0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7Q29tcGlsZXJDb25maWd9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQge0NvbXBpbGVCaW5kaW5nfSBmcm9tICcuL2NvbXBpbGVfYmluZGluZyc7XG5cbmV4cG9ydCBjbGFzcyBDb21waWxlVmlldyBpbXBsZW1lbnRzIE5hbWVSZXNvbHZlciB7XG4gIHB1YmxpYyB2aWV3VHlwZTogVmlld1R5cGU7XG4gIHB1YmxpYyB2aWV3UXVlcmllczogQ29tcGlsZVRva2VuTWFwPENvbXBpbGVRdWVyeVtdPjtcblxuICBwdWJsaWMgbm9kZXM6IENvbXBpbGVOb2RlW10gPSBbXTtcbiAgLy8gcm9vdCBub2RlcyBvciBBcHBFbGVtZW50cyBmb3IgVmlld0NvbnRhaW5lcnNcbiAgcHVibGljIHJvb3ROb2Rlc09yQXBwRWxlbWVudHM6IG8uRXhwcmVzc2lvbltdID0gW107XG5cbiAgcHVibGljIGJpbmRpbmdzOiBDb21waWxlQmluZGluZ1tdID0gW107XG5cbiAgcHVibGljIGNsYXNzU3RhdGVtZW50czogby5TdGF0ZW1lbnRbXSA9IFtdO1xuICBwdWJsaWMgY3JlYXRlTWV0aG9kOiBDb21waWxlTWV0aG9kO1xuICBwdWJsaWMgaW5qZWN0b3JHZXRNZXRob2Q6IENvbXBpbGVNZXRob2Q7XG4gIHB1YmxpYyB1cGRhdGVDb250ZW50UXVlcmllc01ldGhvZDogQ29tcGlsZU1ldGhvZDtcbiAgcHVibGljIGRpcnR5UGFyZW50UXVlcmllc01ldGhvZDogQ29tcGlsZU1ldGhvZDtcbiAgcHVibGljIHVwZGF0ZVZpZXdRdWVyaWVzTWV0aG9kOiBDb21waWxlTWV0aG9kO1xuICBwdWJsaWMgZGV0ZWN0Q2hhbmdlc0luSW5wdXRzTWV0aG9kOiBDb21waWxlTWV0aG9kO1xuICBwdWJsaWMgZGV0ZWN0Q2hhbmdlc1JlbmRlclByb3BlcnRpZXNNZXRob2Q6IENvbXBpbGVNZXRob2Q7XG4gIHB1YmxpYyBhZnRlckNvbnRlbnRMaWZlY3ljbGVDYWxsYmFja3NNZXRob2Q6IENvbXBpbGVNZXRob2Q7XG4gIHB1YmxpYyBhZnRlclZpZXdMaWZlY3ljbGVDYWxsYmFja3NNZXRob2Q6IENvbXBpbGVNZXRob2Q7XG4gIHB1YmxpYyBkZXN0cm95TWV0aG9kOiBDb21waWxlTWV0aG9kO1xuICBwdWJsaWMgZXZlbnRIYW5kbGVyTWV0aG9kczogby5DbGFzc01ldGhvZFtdID0gW107XG5cbiAgcHVibGljIGZpZWxkczogby5DbGFzc0ZpZWxkW10gPSBbXTtcbiAgcHVibGljIGdldHRlcnM6IG8uQ2xhc3NHZXR0ZXJbXSA9IFtdO1xuICBwdWJsaWMgZGlzcG9zYWJsZXM6IG8uRXhwcmVzc2lvbltdID0gW107XG4gIHB1YmxpYyBzdWJzY3JpcHRpb25zOiBvLkV4cHJlc3Npb25bXSA9IFtdO1xuXG4gIHB1YmxpYyBjb21wb25lbnRWaWV3OiBDb21waWxlVmlldztcbiAgcHVibGljIHB1cmVQaXBlcyA9IG5ldyBNYXA8c3RyaW5nLCBDb21waWxlUGlwZT4oKTtcbiAgcHVibGljIHBpcGVzOiBDb21waWxlUGlwZVtdID0gW107XG4gIHB1YmxpYyBsb2NhbHMgPSBuZXcgTWFwPHN0cmluZywgby5FeHByZXNzaW9uPigpO1xuICBwdWJsaWMgY2xhc3NOYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBjbGFzc1R5cGU6IG8uVHlwZTtcbiAgcHVibGljIHZpZXdGYWN0b3J5OiBvLlJlYWRWYXJFeHByO1xuXG4gIHB1YmxpYyBsaXRlcmFsQXJyYXlDb3VudCA9IDA7XG4gIHB1YmxpYyBsaXRlcmFsTWFwQ291bnQgPSAwO1xuICBwdWJsaWMgcGlwZUNvdW50ID0gMDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29tcG9uZW50OiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsIHB1YmxpYyBnZW5Db25maWc6IENvbXBpbGVyQ29uZmlnLFxuICAgICAgICAgICAgICBwdWJsaWMgcGlwZU1ldGFzOiBDb21waWxlUGlwZU1ldGFkYXRhW10sIHB1YmxpYyBzdHlsZXM6IG8uRXhwcmVzc2lvbixcbiAgICAgICAgICAgICAgcHVibGljIHZpZXdJbmRleDogbnVtYmVyLCBwdWJsaWMgZGVjbGFyYXRpb25FbGVtZW50OiBDb21waWxlRWxlbWVudCxcbiAgICAgICAgICAgICAgcHVibGljIHRlbXBsYXRlVmFyaWFibGVCaW5kaW5nczogc3RyaW5nW11bXSkge1xuICAgIHRoaXMuY3JlYXRlTWV0aG9kID0gbmV3IENvbXBpbGVNZXRob2QodGhpcyk7XG4gICAgdGhpcy5pbmplY3RvckdldE1ldGhvZCA9IG5ldyBDb21waWxlTWV0aG9kKHRoaXMpO1xuICAgIHRoaXMudXBkYXRlQ29udGVudFF1ZXJpZXNNZXRob2QgPSBuZXcgQ29tcGlsZU1ldGhvZCh0aGlzKTtcbiAgICB0aGlzLmRpcnR5UGFyZW50UXVlcmllc01ldGhvZCA9IG5ldyBDb21waWxlTWV0aG9kKHRoaXMpO1xuICAgIHRoaXMudXBkYXRlVmlld1F1ZXJpZXNNZXRob2QgPSBuZXcgQ29tcGlsZU1ldGhvZCh0aGlzKTtcbiAgICB0aGlzLmRldGVjdENoYW5nZXNJbklucHV0c01ldGhvZCA9IG5ldyBDb21waWxlTWV0aG9kKHRoaXMpO1xuICAgIHRoaXMuZGV0ZWN0Q2hhbmdlc1JlbmRlclByb3BlcnRpZXNNZXRob2QgPSBuZXcgQ29tcGlsZU1ldGhvZCh0aGlzKTtcblxuICAgIHRoaXMuYWZ0ZXJDb250ZW50TGlmZWN5Y2xlQ2FsbGJhY2tzTWV0aG9kID0gbmV3IENvbXBpbGVNZXRob2QodGhpcyk7XG4gICAgdGhpcy5hZnRlclZpZXdMaWZlY3ljbGVDYWxsYmFja3NNZXRob2QgPSBuZXcgQ29tcGlsZU1ldGhvZCh0aGlzKTtcbiAgICB0aGlzLmRlc3Ryb3lNZXRob2QgPSBuZXcgQ29tcGlsZU1ldGhvZCh0aGlzKTtcblxuICAgIHRoaXMudmlld1R5cGUgPSBnZXRWaWV3VHlwZShjb21wb25lbnQsIHZpZXdJbmRleCk7XG4gICAgdGhpcy5jbGFzc05hbWUgPSBgX1ZpZXdfJHtjb21wb25lbnQudHlwZS5uYW1lfSR7dmlld0luZGV4fWA7XG4gICAgdGhpcy5jbGFzc1R5cGUgPSBvLmltcG9ydFR5cGUobmV3IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEoe25hbWU6IHRoaXMuY2xhc3NOYW1lfSkpO1xuICAgIHRoaXMudmlld0ZhY3RvcnkgPSBvLnZhcmlhYmxlKGdldFZpZXdGYWN0b3J5TmFtZShjb21wb25lbnQsIHZpZXdJbmRleCkpO1xuICAgIGlmICh0aGlzLnZpZXdUeXBlID09PSBWaWV3VHlwZS5DT01QT05FTlQgfHwgdGhpcy52aWV3VHlwZSA9PT0gVmlld1R5cGUuSE9TVCkge1xuICAgICAgdGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb21wb25lbnRWaWV3ID0gdGhpcy5kZWNsYXJhdGlvbkVsZW1lbnQudmlldy5jb21wb25lbnRWaWV3O1xuICAgIH1cbiAgICB2YXIgdmlld1F1ZXJpZXMgPSBuZXcgQ29tcGlsZVRva2VuTWFwPENvbXBpbGVRdWVyeVtdPigpO1xuICAgIGlmICh0aGlzLnZpZXdUeXBlID09PSBWaWV3VHlwZS5DT01QT05FTlQpIHtcbiAgICAgIHZhciBkaXJlY3RpdmVJbnN0YW5jZSA9IG8uVEhJU19FWFBSLnByb3AoJ2NvbnRleHQnKTtcbiAgICAgIExpc3RXcmFwcGVyLmZvckVhY2hXaXRoSW5kZXgodGhpcy5jb21wb25lbnQudmlld1F1ZXJpZXMsIChxdWVyeU1ldGEsIHF1ZXJ5SW5kZXgpID0+IHtcbiAgICAgICAgdmFyIHByb3BOYW1lID0gYF92aWV3UXVlcnlfJHtxdWVyeU1ldGEuc2VsZWN0b3JzWzBdLm5hbWV9XyR7cXVlcnlJbmRleH1gO1xuICAgICAgICB2YXIgcXVlcnlMaXN0ID0gY3JlYXRlUXVlcnlMaXN0KHF1ZXJ5TWV0YSwgZGlyZWN0aXZlSW5zdGFuY2UsIHByb3BOYW1lLCB0aGlzKTtcbiAgICAgICAgdmFyIHF1ZXJ5ID0gbmV3IENvbXBpbGVRdWVyeShxdWVyeU1ldGEsIHF1ZXJ5TGlzdCwgZGlyZWN0aXZlSW5zdGFuY2UsIHRoaXMpO1xuICAgICAgICBhZGRRdWVyeVRvVG9rZW5NYXAodmlld1F1ZXJpZXMsIHF1ZXJ5KTtcbiAgICAgIH0pO1xuICAgICAgdmFyIGNvbnN0cnVjdG9yVmlld1F1ZXJ5Q291bnQgPSAwO1xuICAgICAgdGhpcy5jb21wb25lbnQudHlwZS5kaURlcHMuZm9yRWFjaCgoZGVwKSA9PiB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoZGVwLnZpZXdRdWVyeSkpIHtcbiAgICAgICAgICB2YXIgcXVlcnlMaXN0ID0gby5USElTX0VYUFIucHJvcCgnZGVjbGFyYXRpb25BcHBFbGVtZW50JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wcm9wKCdjb21wb25lbnRDb25zdHJ1Y3RvclZpZXdRdWVyaWVzJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5rZXkoby5saXRlcmFsKGNvbnN0cnVjdG9yVmlld1F1ZXJ5Q291bnQrKykpO1xuICAgICAgICAgIHZhciBxdWVyeSA9IG5ldyBDb21waWxlUXVlcnkoZGVwLnZpZXdRdWVyeSwgcXVlcnlMaXN0LCBudWxsLCB0aGlzKTtcbiAgICAgICAgICBhZGRRdWVyeVRvVG9rZW5NYXAodmlld1F1ZXJpZXMsIHF1ZXJ5KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMudmlld1F1ZXJpZXMgPSB2aWV3UXVlcmllcztcbiAgICB0ZW1wbGF0ZVZhcmlhYmxlQmluZGluZ3MuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgIHRoaXMubG9jYWxzLnNldChlbnRyeVsxXSwgby5USElTX0VYUFIucHJvcCgnbG9jYWxzJykua2V5KG8ubGl0ZXJhbChlbnRyeVswXSkpKTtcbiAgICB9KTtcblxuICAgIGlmICghdGhpcy5kZWNsYXJhdGlvbkVsZW1lbnQuaXNOdWxsKCkpIHtcbiAgICAgIHRoaXMuZGVjbGFyYXRpb25FbGVtZW50LnNldEVtYmVkZGVkVmlldyh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBjYWxsUGlwZShuYW1lOiBzdHJpbmcsIGlucHV0OiBvLkV4cHJlc3Npb24sIGFyZ3M6IG8uRXhwcmVzc2lvbltdKTogby5FeHByZXNzaW9uIHtcbiAgICB2YXIgY29tcFZpZXcgPSB0aGlzLmNvbXBvbmVudFZpZXc7XG4gICAgdmFyIHBpcGUgPSBjb21wVmlldy5wdXJlUGlwZXMuZ2V0KG5hbWUpO1xuICAgIGlmIChpc0JsYW5rKHBpcGUpKSB7XG4gICAgICBwaXBlID0gbmV3IENvbXBpbGVQaXBlKGNvbXBWaWV3LCBuYW1lKTtcbiAgICAgIGlmIChwaXBlLnB1cmUpIHtcbiAgICAgICAgY29tcFZpZXcucHVyZVBpcGVzLnNldChuYW1lLCBwaXBlKTtcbiAgICAgIH1cbiAgICAgIGNvbXBWaWV3LnBpcGVzLnB1c2gocGlwZSk7XG4gICAgfVxuICAgIHJldHVybiBwaXBlLmNhbGwodGhpcywgW2lucHV0XS5jb25jYXQoYXJncykpO1xuICB9XG5cbiAgZ2V0TG9jYWwobmFtZTogc3RyaW5nKTogby5FeHByZXNzaW9uIHtcbiAgICBpZiAobmFtZSA9PSBFdmVudEhhbmRsZXJWYXJzLmV2ZW50Lm5hbWUpIHtcbiAgICAgIHJldHVybiBFdmVudEhhbmRsZXJWYXJzLmV2ZW50O1xuICAgIH1cbiAgICB2YXIgY3VyclZpZXc6IENvbXBpbGVWaWV3ID0gdGhpcztcbiAgICB2YXIgcmVzdWx0ID0gY3VyclZpZXcubG9jYWxzLmdldChuYW1lKTtcbiAgICB3aGlsZSAoaXNCbGFuayhyZXN1bHQpICYmIGlzUHJlc2VudChjdXJyVmlldy5kZWNsYXJhdGlvbkVsZW1lbnQudmlldykpIHtcbiAgICAgIGN1cnJWaWV3ID0gY3VyclZpZXcuZGVjbGFyYXRpb25FbGVtZW50LnZpZXc7XG4gICAgICByZXN1bHQgPSBjdXJyVmlldy5sb2NhbHMuZ2V0KG5hbWUpO1xuICAgIH1cbiAgICBpZiAoaXNQcmVzZW50KHJlc3VsdCkpIHtcbiAgICAgIHJldHVybiBnZXRQcm9wZXJ0eUluVmlldyhyZXN1bHQsIHRoaXMsIGN1cnJWaWV3KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlTGl0ZXJhbEFycmF5KHZhbHVlczogby5FeHByZXNzaW9uW10pOiBvLkV4cHJlc3Npb24ge1xuICAgIHZhciBwcm94eUV4cHIgPSBvLlRISVNfRVhQUi5wcm9wKGBfYXJyXyR7dGhpcy5saXRlcmFsQXJyYXlDb3VudCsrfWApO1xuICAgIHZhciBwcm94eVBhcmFtczogby5GblBhcmFtW10gPSBbXTtcbiAgICB2YXIgcHJveHlSZXR1cm5FbnRyaWVzOiBvLkV4cHJlc3Npb25bXSA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcGFyYW1OYW1lID0gYHAke2l9YDtcbiAgICAgIHByb3h5UGFyYW1zLnB1c2gobmV3IG8uRm5QYXJhbShwYXJhbU5hbWUpKTtcbiAgICAgIHByb3h5UmV0dXJuRW50cmllcy5wdXNoKG8udmFyaWFibGUocGFyYW1OYW1lKSk7XG4gICAgfVxuICAgIGNyZWF0ZVB1cmVQcm94eShvLmZuKHByb3h5UGFyYW1zLCBbbmV3IG8uUmV0dXJuU3RhdGVtZW50KG8ubGl0ZXJhbEFycihwcm94eVJldHVybkVudHJpZXMpKV0pLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXMubGVuZ3RoLCBwcm94eUV4cHIsIHRoaXMpO1xuICAgIHJldHVybiBwcm94eUV4cHIuY2FsbEZuKHZhbHVlcyk7XG4gIH1cblxuICBjcmVhdGVMaXRlcmFsTWFwKGVudHJpZXM6IEFycmF5PEFycmF5PHN0cmluZyB8IG8uRXhwcmVzc2lvbj4+KTogby5FeHByZXNzaW9uIHtcbiAgICB2YXIgcHJveHlFeHByID0gby5USElTX0VYUFIucHJvcChgX21hcF8ke3RoaXMubGl0ZXJhbE1hcENvdW50Kyt9YCk7XG4gICAgdmFyIHByb3h5UGFyYW1zOiBvLkZuUGFyYW1bXSA9IFtdO1xuICAgIHZhciBwcm94eVJldHVybkVudHJpZXM6IEFycmF5PEFycmF5PHN0cmluZyB8IG8uRXhwcmVzc2lvbj4+ID0gW107XG4gICAgdmFyIHZhbHVlczogby5FeHByZXNzaW9uW10gPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVudHJpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBwYXJhbU5hbWUgPSBgcCR7aX1gO1xuICAgICAgcHJveHlQYXJhbXMucHVzaChuZXcgby5GblBhcmFtKHBhcmFtTmFtZSkpO1xuICAgICAgcHJveHlSZXR1cm5FbnRyaWVzLnB1c2goW2VudHJpZXNbaV1bMF0sIG8udmFyaWFibGUocGFyYW1OYW1lKV0pO1xuICAgICAgdmFsdWVzLnB1c2goPG8uRXhwcmVzc2lvbj5lbnRyaWVzW2ldWzFdKTtcbiAgICB9XG4gICAgY3JlYXRlUHVyZVByb3h5KG8uZm4ocHJveHlQYXJhbXMsIFtuZXcgby5SZXR1cm5TdGF0ZW1lbnQoby5saXRlcmFsTWFwKHByb3h5UmV0dXJuRW50cmllcykpXSksXG4gICAgICAgICAgICAgICAgICAgIGVudHJpZXMubGVuZ3RoLCBwcm94eUV4cHIsIHRoaXMpO1xuICAgIHJldHVybiBwcm94eUV4cHIuY2FsbEZuKHZhbHVlcyk7XG4gIH1cblxuICBhZnRlck5vZGVzKCkge1xuICAgIHRoaXMucGlwZXMuZm9yRWFjaCgocGlwZSkgPT4gcGlwZS5jcmVhdGUoKSk7XG4gICAgdGhpcy52aWV3UXVlcmllcy52YWx1ZXMoKS5mb3JFYWNoKFxuICAgICAgICAocXVlcmllcykgPT4gcXVlcmllcy5mb3JFYWNoKChxdWVyeSkgPT4gcXVlcnkuYWZ0ZXJDaGlsZHJlbih0aGlzLnVwZGF0ZVZpZXdRdWVyaWVzTWV0aG9kKSkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFZpZXdUeXBlKGNvbXBvbmVudDogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLCBlbWJlZGRlZFRlbXBsYXRlSW5kZXg6IG51bWJlcik6IFZpZXdUeXBlIHtcbiAgaWYgKGVtYmVkZGVkVGVtcGxhdGVJbmRleCA+IDApIHtcbiAgICByZXR1cm4gVmlld1R5cGUuRU1CRURERUQ7XG4gIH0gZWxzZSBpZiAoY29tcG9uZW50LnR5cGUuaXNIb3N0KSB7XG4gICAgcmV0dXJuIFZpZXdUeXBlLkhPU1Q7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFZpZXdUeXBlLkNPTVBPTkVOVDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
