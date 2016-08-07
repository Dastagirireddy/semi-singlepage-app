System.register(['angular2/src/facade/collection', 'angular2/src/facade/lang', 'angular2/src/core/reflection/reflection', 'angular2/src/core/change_detection/change_detection', './template_ast', 'angular2/src/core/linker/interfaces'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var collection_1, lang_1, reflection_1, change_detection_1, template_ast_1, interfaces_1;
    var ProtoViewVisitor;
    function createChangeDetectorDefinitions(componentType, componentStrategy, genConfig, parsedTemplate) {
        var pvVisitors = [];
        var visitor = new ProtoViewVisitor(null, pvVisitors, componentStrategy);
        template_ast_1.templateVisitAll(visitor, parsedTemplate);
        return createChangeDefinitions(pvVisitors, componentType, genConfig);
    }
    exports_1("createChangeDetectorDefinitions", createChangeDetectorDefinitions);
    function createChangeDefinitions(pvVisitors, componentType, genConfig) {
        var pvVariableNames = _collectNestedProtoViewsVariableNames(pvVisitors);
        return pvVisitors.map(function (pvVisitor) {
            var id = componentType.name + "_" + pvVisitor.viewIndex;
            return new change_detection_1.ChangeDetectorDefinition(id, pvVisitor.strategy, pvVariableNames[pvVisitor.viewIndex], pvVisitor.bindingRecords, pvVisitor.eventRecords, pvVisitor.directiveRecords, genConfig);
        });
    }
    function _collectNestedProtoViewsVariableNames(pvVisitors) {
        var nestedPvVariableNames = collection_1.ListWrapper.createFixedSize(pvVisitors.length);
        pvVisitors.forEach(function (pv) {
            var parentVariableNames = lang_1.isPresent(pv.parent) ? nestedPvVariableNames[pv.parent.viewIndex] : [];
            nestedPvVariableNames[pv.viewIndex] = parentVariableNames.concat(pv.variableNames);
        });
        return nestedPvVariableNames;
    }
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (reflection_1_1) {
                reflection_1 = reflection_1_1;
            },
            function (change_detection_1_1) {
                change_detection_1 = change_detection_1_1;
            },
            function (template_ast_1_1) {
                template_ast_1 = template_ast_1_1;
            },
            function (interfaces_1_1) {
                interfaces_1 = interfaces_1_1;
            }],
        execute: function() {
            ProtoViewVisitor = (function () {
                function ProtoViewVisitor(parent, allVisitors, strategy) {
                    this.parent = parent;
                    this.allVisitors = allVisitors;
                    this.strategy = strategy;
                    this.nodeCount = 0;
                    this.boundElementCount = 0;
                    this.variableNames = [];
                    this.bindingRecords = [];
                    this.eventRecords = [];
                    this.directiveRecords = [];
                    this.viewIndex = allVisitors.length;
                    allVisitors.push(this);
                }
                ProtoViewVisitor.prototype.visitEmbeddedTemplate = function (ast, context) {
                    this.nodeCount++;
                    this.boundElementCount++;
                    template_ast_1.templateVisitAll(this, ast.outputs);
                    for (var i = 0; i < ast.directives.length; i++) {
                        ast.directives[i].visit(this, i);
                    }
                    var childVisitor = new ProtoViewVisitor(this, this.allVisitors, change_detection_1.ChangeDetectionStrategy.Default);
                    // Attention: variables present on an embedded template count towards
                    // the embedded template and not the template anchor!
                    template_ast_1.templateVisitAll(childVisitor, ast.vars);
                    template_ast_1.templateVisitAll(childVisitor, ast.children);
                    return null;
                };
                ProtoViewVisitor.prototype.visitElement = function (ast, context) {
                    this.nodeCount++;
                    if (ast.isBound()) {
                        this.boundElementCount++;
                    }
                    template_ast_1.templateVisitAll(this, ast.inputs, null);
                    template_ast_1.templateVisitAll(this, ast.outputs);
                    template_ast_1.templateVisitAll(this, ast.exportAsVars);
                    for (var i = 0; i < ast.directives.length; i++) {
                        ast.directives[i].visit(this, i);
                    }
                    template_ast_1.templateVisitAll(this, ast.children);
                    return null;
                };
                ProtoViewVisitor.prototype.visitNgContent = function (ast, context) { return null; };
                ProtoViewVisitor.prototype.visitVariable = function (ast, context) {
                    this.variableNames.push(ast.name);
                    return null;
                };
                ProtoViewVisitor.prototype.visitEvent = function (ast, directiveRecord) {
                    var bindingRecord = lang_1.isPresent(directiveRecord) ?
                        change_detection_1.BindingRecord.createForHostEvent(ast.handler, ast.fullName, directiveRecord) :
                        change_detection_1.BindingRecord.createForEvent(ast.handler, ast.fullName, this.boundElementCount - 1);
                    this.eventRecords.push(bindingRecord);
                    return null;
                };
                ProtoViewVisitor.prototype.visitElementProperty = function (ast, directiveRecord) {
                    var boundElementIndex = this.boundElementCount - 1;
                    var dirIndex = lang_1.isPresent(directiveRecord) ? directiveRecord.directiveIndex : null;
                    var bindingRecord;
                    if (ast.type === template_ast_1.PropertyBindingType.Property) {
                        bindingRecord =
                            lang_1.isPresent(dirIndex) ?
                                change_detection_1.BindingRecord.createForHostProperty(dirIndex, ast.value, ast.name) :
                                change_detection_1.BindingRecord.createForElementProperty(ast.value, boundElementIndex, ast.name);
                    }
                    else if (ast.type === template_ast_1.PropertyBindingType.Attribute) {
                        bindingRecord =
                            lang_1.isPresent(dirIndex) ?
                                change_detection_1.BindingRecord.createForHostAttribute(dirIndex, ast.value, ast.name) :
                                change_detection_1.BindingRecord.createForElementAttribute(ast.value, boundElementIndex, ast.name);
                    }
                    else if (ast.type === template_ast_1.PropertyBindingType.Class) {
                        bindingRecord =
                            lang_1.isPresent(dirIndex) ?
                                change_detection_1.BindingRecord.createForHostClass(dirIndex, ast.value, ast.name) :
                                change_detection_1.BindingRecord.createForElementClass(ast.value, boundElementIndex, ast.name);
                    }
                    else if (ast.type === template_ast_1.PropertyBindingType.Style) {
                        bindingRecord =
                            lang_1.isPresent(dirIndex) ?
                                change_detection_1.BindingRecord.createForHostStyle(dirIndex, ast.value, ast.name, ast.unit) :
                                change_detection_1.BindingRecord.createForElementStyle(ast.value, boundElementIndex, ast.name, ast.unit);
                    }
                    this.bindingRecords.push(bindingRecord);
                    return null;
                };
                ProtoViewVisitor.prototype.visitAttr = function (ast, context) { return null; };
                ProtoViewVisitor.prototype.visitBoundText = function (ast, context) {
                    var nodeIndex = this.nodeCount++;
                    this.bindingRecords.push(change_detection_1.BindingRecord.createForTextNode(ast.value, nodeIndex));
                    return null;
                };
                ProtoViewVisitor.prototype.visitText = function (ast, context) {
                    this.nodeCount++;
                    return null;
                };
                ProtoViewVisitor.prototype.visitDirective = function (ast, directiveIndexAsNumber) {
                    var directiveIndex = new change_detection_1.DirectiveIndex(this.boundElementCount - 1, directiveIndexAsNumber);
                    var directiveMetadata = ast.directive;
                    var outputsArray = [];
                    collection_1.StringMapWrapper.forEach(ast.directive.outputs, function (eventName, dirProperty) { return outputsArray.push([dirProperty, eventName]); });
                    var directiveRecord = new change_detection_1.DirectiveRecord({
                        directiveIndex: directiveIndex,
                        callAfterContentInit: directiveMetadata.lifecycleHooks.indexOf(interfaces_1.LifecycleHooks.AfterContentInit) !== -1,
                        callAfterContentChecked: directiveMetadata.lifecycleHooks.indexOf(interfaces_1.LifecycleHooks.AfterContentChecked) !== -1,
                        callAfterViewInit: directiveMetadata.lifecycleHooks.indexOf(interfaces_1.LifecycleHooks.AfterViewInit) !== -1,
                        callAfterViewChecked: directiveMetadata.lifecycleHooks.indexOf(interfaces_1.LifecycleHooks.AfterViewChecked) !== -1,
                        callOnChanges: directiveMetadata.lifecycleHooks.indexOf(interfaces_1.LifecycleHooks.OnChanges) !== -1,
                        callDoCheck: directiveMetadata.lifecycleHooks.indexOf(interfaces_1.LifecycleHooks.DoCheck) !== -1,
                        callOnInit: directiveMetadata.lifecycleHooks.indexOf(interfaces_1.LifecycleHooks.OnInit) !== -1,
                        callOnDestroy: directiveMetadata.lifecycleHooks.indexOf(interfaces_1.LifecycleHooks.OnDestroy) !== -1,
                        changeDetection: directiveMetadata.changeDetection,
                        outputs: outputsArray
                    });
                    this.directiveRecords.push(directiveRecord);
                    template_ast_1.templateVisitAll(this, ast.inputs, directiveRecord);
                    var bindingRecords = this.bindingRecords;
                    if (directiveRecord.callOnChanges) {
                        bindingRecords.push(change_detection_1.BindingRecord.createDirectiveOnChanges(directiveRecord));
                    }
                    if (directiveRecord.callOnInit) {
                        bindingRecords.push(change_detection_1.BindingRecord.createDirectiveOnInit(directiveRecord));
                    }
                    if (directiveRecord.callDoCheck) {
                        bindingRecords.push(change_detection_1.BindingRecord.createDirectiveDoCheck(directiveRecord));
                    }
                    template_ast_1.templateVisitAll(this, ast.hostProperties, directiveRecord);
                    template_ast_1.templateVisitAll(this, ast.hostEvents, directiveRecord);
                    template_ast_1.templateVisitAll(this, ast.exportAsVars);
                    return null;
                };
                ProtoViewVisitor.prototype.visitDirectiveProperty = function (ast, directiveRecord) {
                    // TODO: these setters should eventually be created by change detection, to make
                    // it monomorphic!
                    var setter = reflection_1.reflector.setter(ast.directiveName);
                    this.bindingRecords.push(change_detection_1.BindingRecord.createForDirective(ast.value, ast.directiveName, setter, directiveRecord));
                    return null;
                };
                return ProtoViewVisitor;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL2NoYW5nZV9kZWZpbml0aW9uX2ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7SUFrQ0EseUNBQ0ksYUFBa0MsRUFBRSxpQkFBMEMsRUFDOUUsU0FBa0MsRUFBRSxjQUE2QjtRQUNuRSxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDeEUsK0JBQWdCLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxVQUFVLEVBQUUsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFQRCw2RUFPQyxDQUFBO0lBNEpELGlDQUFpQyxVQUE4QixFQUFFLGFBQWtDLEVBQ2xFLFNBQWtDO1FBQ2pFLElBQUksZUFBZSxHQUFHLHFDQUFxQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQUEsU0FBUztZQUM3QixJQUFJLEVBQUUsR0FBTSxhQUFhLENBQUMsSUFBSSxTQUFJLFNBQVMsQ0FBQyxTQUFXLENBQUM7WUFDeEQsTUFBTSxDQUFDLElBQUksMkNBQXdCLENBQy9CLEVBQUUsRUFBRSxTQUFTLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsU0FBUyxDQUFDLGNBQWMsRUFDdEYsU0FBUyxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFckUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsK0NBQStDLFVBQThCO1FBQzNFLElBQUkscUJBQXFCLEdBQWUsd0JBQVcsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE1B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QyxDQUFDO29CQUM1RCwrQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQztvQkFDeEQsK0JBQWdCLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDekMsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDZCxDQUFDO2dCQUNELGlEQUFzQixHQUF0QixVQUF1QixHQUE4QixFQUFFLGVBQWdDO29CQUNyRixnRkFBZ0Y7b0JBQ2hGLGtCQUFrQjtvQkFDbEIsSUFBSSxNQUFNLEdBQUcsc0JBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUNqRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDcEIsZ0NBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxhQUFhLEVBQUUsTUFBTSxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUM7b0JBQzdGLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQztnQkFDSCx1QkFBQztZQUFELENBdkpBLEFBdUpDLElBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29tcGlsZXIvY2hhbmdlX2RlZmluaXRpb25fZmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TGlzdFdyYXBwZXIsIFN0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge2lzUHJlc2VudCwgaXNCbGFua30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7cmVmbGVjdG9yfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9yZWZsZWN0aW9uL3JlZmxlY3Rpb24nO1xuXG5pbXBvcnQge1xuICBEaXJlY3RpdmVJbmRleCxcbiAgQmluZGluZ1JlY29yZCxcbiAgRGlyZWN0aXZlUmVjb3JkLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JEZWZpbml0aW9uLFxuICBDaGFuZ2VEZXRlY3RvckdlbkNvbmZpZyxcbiAgQVNUV2l0aFNvdXJjZVxufSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2NoYW5nZV9kZXRlY3Rpb24nO1xuXG5pbXBvcnQge0NvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSwgQ29tcGlsZVR5cGVNZXRhZGF0YX0gZnJvbSAnLi9kaXJlY3RpdmVfbWV0YWRhdGEnO1xuaW1wb3J0IHtcbiAgVGVtcGxhdGVBc3QsXG4gIEVsZW1lbnRBc3QsXG4gIEJvdW5kVGV4dEFzdCxcbiAgUHJvcGVydHlCaW5kaW5nVHlwZSxcbiAgRGlyZWN0aXZlQXN0LFxuICBUZW1wbGF0ZUFzdFZpc2l0b3IsXG4gIHRlbXBsYXRlVmlzaXRBbGwsXG4gIE5nQ29udGVudEFzdCxcbiAgRW1iZWRkZWRUZW1wbGF0ZUFzdCxcbiAgVmFyaWFibGVBc3QsXG4gIEJvdW5kRWxlbWVudFByb3BlcnR5QXN0LFxuICBCb3VuZEV2ZW50QXN0LFxuICBCb3VuZERpcmVjdGl2ZVByb3BlcnR5QXN0LFxuICBBdHRyQXN0LFxuICBUZXh0QXN0XG59IGZyb20gJy4vdGVtcGxhdGVfYXN0JztcbmltcG9ydCB7TGlmZWN5Y2xlSG9va3N9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9pbnRlcmZhY2VzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNoYW5nZURldGVjdG9yRGVmaW5pdGlvbnMoXG4gICAgY29tcG9uZW50VHlwZTogQ29tcGlsZVR5cGVNZXRhZGF0YSwgY29tcG9uZW50U3RyYXRlZ3k6IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIGdlbkNvbmZpZzogQ2hhbmdlRGV0ZWN0b3JHZW5Db25maWcsIHBhcnNlZFRlbXBsYXRlOiBUZW1wbGF0ZUFzdFtdKTogQ2hhbmdlRGV0ZWN0b3JEZWZpbml0aW9uW10ge1xuICB2YXIgcHZWaXNpdG9ycyA9IFtdO1xuICB2YXIgdmlzaXRvciA9IG5ldyBQcm90b1ZpZXdWaXNpdG9yKG51bGwsIHB2VmlzaXRvcnMsIGNvbXBvbmVudFN0cmF0ZWd5KTtcbiAgdGVtcGxhdGVWaXNpdEFsbCh2aXNpdG9yLCBwYXJzZWRUZW1wbGF0ZSk7XG4gIHJldHVybiBjcmVhdGVDaGFuZ2VEZWZpbml0aW9ucyhwdlZpc2l0b3JzLCBjb21wb25lbnRUeXBlLCBnZW5Db25maWcpO1xufVxuXG5jbGFzcyBQcm90b1ZpZXdWaXNpdG9yIGltcGxlbWVudHMgVGVtcGxhdGVBc3RWaXNpdG9yIHtcbiAgdmlld0luZGV4OiBudW1iZXI7XG4gIG5vZGVDb3VudDogbnVtYmVyID0gMDtcbiAgYm91bmRFbGVtZW50Q291bnQ6IG51bWJlciA9IDA7XG4gIHZhcmlhYmxlTmFtZXM6IHN0cmluZ1tdID0gW107XG4gIGJpbmRpbmdSZWNvcmRzOiBCaW5kaW5nUmVjb3JkW10gPSBbXTtcbiAgZXZlbnRSZWNvcmRzOiBCaW5kaW5nUmVjb3JkW10gPSBbXTtcbiAgZGlyZWN0aXZlUmVjb3JkczogRGlyZWN0aXZlUmVjb3JkW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGFyZW50OiBQcm90b1ZpZXdWaXNpdG9yLCBwdWJsaWMgYWxsVmlzaXRvcnM6IFByb3RvVmlld1Zpc2l0b3JbXSxcbiAgICAgICAgICAgICAgcHVibGljIHN0cmF0ZWd5OiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSkge1xuICAgIHRoaXMudmlld0luZGV4ID0gYWxsVmlzaXRvcnMubGVuZ3RoO1xuICAgIGFsbFZpc2l0b3JzLnB1c2godGhpcyk7XG4gIH1cblxuICB2aXNpdEVtYmVkZGVkVGVtcGxhdGUoYXN0OiBFbWJlZGRlZFRlbXBsYXRlQXN0LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMubm9kZUNvdW50Kys7XG4gICAgdGhpcy5ib3VuZEVsZW1lbnRDb3VudCsrO1xuICAgIHRlbXBsYXRlVmlzaXRBbGwodGhpcywgYXN0Lm91dHB1dHMpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXN0LmRpcmVjdGl2ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFzdC5kaXJlY3RpdmVzW2ldLnZpc2l0KHRoaXMsIGkpO1xuICAgIH1cblxuICAgIHZhciBjaGlsZFZpc2l0b3IgPVxuICAgICAgICBuZXcgUHJvdG9WaWV3VmlzaXRvcih0aGlzLCB0aGlzLmFsbFZpc2l0b3JzLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0KTtcbiAgICAvLyBBdHRlbnRpb246IHZhcmlhYmxlcyBwcmVzZW50IG9uIGFuIGVtYmVkZGVkIHRlbXBsYXRlIGNvdW50IHRvd2FyZHNcbiAgICAvLyB0aGUgZW1iZWRkZWQgdGVtcGxhdGUgYW5kIG5vdCB0aGUgdGVtcGxhdGUgYW5jaG9yIVxuICAgIHRlbXBsYXRlVmlzaXRBbGwoY2hpbGRWaXNpdG9yLCBhc3QudmFycyk7XG4gICAgdGVtcGxhdGVWaXNpdEFsbChjaGlsZFZpc2l0b3IsIGFzdC5jaGlsZHJlbik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2aXNpdEVsZW1lbnQoYXN0OiBFbGVtZW50QXN0LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMubm9kZUNvdW50Kys7XG4gICAgaWYgKGFzdC5pc0JvdW5kKCkpIHtcbiAgICAgIHRoaXMuYm91bmRFbGVtZW50Q291bnQrKztcbiAgICB9XG4gICAgdGVtcGxhdGVWaXNpdEFsbCh0aGlzLCBhc3QuaW5wdXRzLCBudWxsKTtcbiAgICB0ZW1wbGF0ZVZpc2l0QWxsKHRoaXMsIGFzdC5vdXRwdXRzKTtcbiAgICB0ZW1wbGF0ZVZpc2l0QWxsKHRoaXMsIGFzdC5leHBvcnRBc1ZhcnMpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXN0LmRpcmVjdGl2ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFzdC5kaXJlY3RpdmVzW2ldLnZpc2l0KHRoaXMsIGkpO1xuICAgIH1cbiAgICB0ZW1wbGF0ZVZpc2l0QWxsKHRoaXMsIGFzdC5jaGlsZHJlbik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2aXNpdE5nQ29udGVudChhc3Q6IE5nQ29udGVudEFzdCwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIG51bGw7IH1cblxuICB2aXNpdFZhcmlhYmxlKGFzdDogVmFyaWFibGVBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgdGhpcy52YXJpYWJsZU5hbWVzLnB1c2goYXN0Lm5hbWUpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmlzaXRFdmVudChhc3Q6IEJvdW5kRXZlbnRBc3QsIGRpcmVjdGl2ZVJlY29yZDogRGlyZWN0aXZlUmVjb3JkKTogYW55IHtcbiAgICB2YXIgYmluZGluZ1JlY29yZCA9XG4gICAgICAgIGlzUHJlc2VudChkaXJlY3RpdmVSZWNvcmQpID9cbiAgICAgICAgICAgIEJpbmRpbmdSZWNvcmQuY3JlYXRlRm9ySG9zdEV2ZW50KGFzdC5oYW5kbGVyLCBhc3QuZnVsbE5hbWUsIGRpcmVjdGl2ZVJlY29yZCkgOlxuICAgICAgICAgICAgQmluZGluZ1JlY29yZC5jcmVhdGVGb3JFdmVudChhc3QuaGFuZGxlciwgYXN0LmZ1bGxOYW1lLCB0aGlzLmJvdW5kRWxlbWVudENvdW50IC0gMSk7XG4gICAgdGhpcy5ldmVudFJlY29yZHMucHVzaChiaW5kaW5nUmVjb3JkKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZpc2l0RWxlbWVudFByb3BlcnR5KGFzdDogQm91bmRFbGVtZW50UHJvcGVydHlBc3QsIGRpcmVjdGl2ZVJlY29yZDogRGlyZWN0aXZlUmVjb3JkKTogYW55IHtcbiAgICB2YXIgYm91bmRFbGVtZW50SW5kZXggPSB0aGlzLmJvdW5kRWxlbWVudENvdW50IC0gMTtcbiAgICB2YXIgZGlySW5kZXggPSBpc1ByZXNlbnQoZGlyZWN0aXZlUmVjb3JkKSA/IGRpcmVjdGl2ZVJlY29yZC5kaXJlY3RpdmVJbmRleCA6IG51bGw7XG4gICAgdmFyIGJpbmRpbmdSZWNvcmQ7XG4gICAgaWYgKGFzdC50eXBlID09PSBQcm9wZXJ0eUJpbmRpbmdUeXBlLlByb3BlcnR5KSB7XG4gICAgICBiaW5kaW5nUmVjb3JkID1cbiAgICAgICAgICBpc1ByZXNlbnQoZGlySW5kZXgpID9cbiAgICAgICAgICAgICAgQmluZGluZ1JlY29yZC5jcmVhdGVGb3JIb3N0UHJvcGVydHkoZGlySW5kZXgsIGFzdC52YWx1ZSwgYXN0Lm5hbWUpIDpcbiAgICAgICAgICAgICAgQmluZGluZ1JlY29yZC5jcmVhdGVGb3JFbGVtZW50UHJvcGVydHkoYXN0LnZhbHVlLCBib3VuZEVsZW1lbnRJbmRleCwgYXN0Lm5hbWUpO1xuICAgIH0gZWxzZSBpZiAoYXN0LnR5cGUgPT09IFByb3BlcnR5QmluZGluZ1R5cGUuQXR0cmlidXRlKSB7XG4gICAgICBiaW5kaW5nUmVjb3JkID1cbiAgICAgICAgICBpc1ByZXNlbnQoZGlySW5kZXgpID9cbiAgICAgICAgICAgICAgQmluZGluZ1JlY29yZC5jcmVhdGVGb3JIb3N0QXR0cmlidXRlKGRpckluZGV4LCBhc3QudmFsdWUsIGFzdC5uYW1lKSA6XG4gICAgICAgICAgICAgIEJpbmRpbmdSZWNvcmQuY3JlYXRlRm9yRWxlbWVudEF0dHJpYnV0ZShhc3QudmFsdWUsIGJvdW5kRWxlbWVudEluZGV4LCBhc3QubmFtZSk7XG4gICAgfSBlbHNlIGlmIChhc3QudHlwZSA9PT0gUHJvcGVydHlCaW5kaW5nVHlwZS5DbGFzcykge1xuICAgICAgYmluZGluZ1JlY29yZCA9XG4gICAgICAgICAgaXNQcmVzZW50KGRpckluZGV4KSA/XG4gICAgICAgICAgICAgIEJpbmRpbmdSZWNvcmQuY3JlYXRlRm9ySG9zdENsYXNzKGRpckluZGV4LCBhc3QudmFsdWUsIGFzdC5uYW1lKSA6XG4gICAgICAgICAgICAgIEJpbmRpbmdSZWNvcmQuY3JlYXRlRm9yRWxlbWVudENsYXNzKGFzdC52YWx1ZSwgYm91bmRFbGVtZW50SW5kZXgsIGFzdC5uYW1lKTtcbiAgICB9IGVsc2UgaWYgKGFzdC50eXBlID09PSBQcm9wZXJ0eUJpbmRpbmdUeXBlLlN0eWxlKSB7XG4gICAgICBiaW5kaW5nUmVjb3JkID1cbiAgICAgICAgICBpc1ByZXNlbnQoZGlySW5kZXgpID9cbiAgICAgICAgICAgICAgQmluZGluZ1JlY29yZC5jcmVhdGVGb3JIb3N0U3R5bGUoZGlySW5kZXgsIGFzdC52YWx1ZSwgYXN0Lm5hbWUsIGFzdC51bml0KSA6XG4gICAgICAgICAgICAgIEJpbmRpbmdSZWNvcmQuY3JlYXRlRm9yRWxlbWVudFN0eWxlKGFzdC52YWx1ZSwgYm91bmRFbGVtZW50SW5kZXgsIGFzdC5uYW1lLCBhc3QudW5pdCk7XG4gICAgfVxuICAgIHRoaXMuYmluZGluZ1JlY29yZHMucHVzaChiaW5kaW5nUmVjb3JkKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdEF0dHIoYXN0OiBBdHRyQXN0LCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gbnVsbDsgfVxuICB2aXNpdEJvdW5kVGV4dChhc3Q6IEJvdW5kVGV4dEFzdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB2YXIgbm9kZUluZGV4ID0gdGhpcy5ub2RlQ291bnQrKztcbiAgICB0aGlzLmJpbmRpbmdSZWNvcmRzLnB1c2goQmluZGluZ1JlY29yZC5jcmVhdGVGb3JUZXh0Tm9kZShhc3QudmFsdWUsIG5vZGVJbmRleCkpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0VGV4dChhc3Q6IFRleHRBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgdGhpcy5ub2RlQ291bnQrKztcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdERpcmVjdGl2ZShhc3Q6IERpcmVjdGl2ZUFzdCwgZGlyZWN0aXZlSW5kZXhBc051bWJlcjogbnVtYmVyKTogYW55IHtcbiAgICB2YXIgZGlyZWN0aXZlSW5kZXggPSBuZXcgRGlyZWN0aXZlSW5kZXgodGhpcy5ib3VuZEVsZW1lbnRDb3VudCAtIDEsIGRpcmVjdGl2ZUluZGV4QXNOdW1iZXIpO1xuICAgIHZhciBkaXJlY3RpdmVNZXRhZGF0YSA9IGFzdC5kaXJlY3RpdmU7XG4gICAgdmFyIG91dHB1dHNBcnJheSA9IFtdO1xuICAgIFN0cmluZ01hcFdyYXBwZXIuZm9yRWFjaChcbiAgICAgICAgYXN0LmRpcmVjdGl2ZS5vdXRwdXRzLFxuICAgICAgICAoZXZlbnROYW1lOiBzdHJpbmcsIGRpclByb3BlcnR5OiBzdHJpbmcpID0+IG91dHB1dHNBcnJheS5wdXNoKFtkaXJQcm9wZXJ0eSwgZXZlbnROYW1lXSkpO1xuICAgIHZhciBkaXJlY3RpdmVSZWNvcmQgPSBuZXcgRGlyZWN0aXZlUmVjb3JkKHtcbiAgICAgIGRpcmVjdGl2ZUluZGV4OiBkaXJlY3RpdmVJbmRleCxcbiAgICAgIGNhbGxBZnRlckNvbnRlbnRJbml0OlxuICAgICAgICAgIGRpcmVjdGl2ZU1ldGFkYXRhLmxpZmVjeWNsZUhvb2tzLmluZGV4T2YoTGlmZWN5Y2xlSG9va3MuQWZ0ZXJDb250ZW50SW5pdCkgIT09IC0xLFxuICAgICAgY2FsbEFmdGVyQ29udGVudENoZWNrZWQ6XG4gICAgICAgICAgZGlyZWN0aXZlTWV0YWRhdGEubGlmZWN5Y2xlSG9va3MuaW5kZXhPZihMaWZlY3ljbGVIb29rcy5BZnRlckNvbnRlbnRDaGVja2VkKSAhPT0gLTEsXG4gICAgICBjYWxsQWZ0ZXJWaWV3SW5pdDpcbiAgICAgICAgICBkaXJlY3RpdmVNZXRhZGF0YS5saWZlY3ljbGVIb29rcy5pbmRleE9mKExpZmVjeWNsZUhvb2tzLkFmdGVyVmlld0luaXQpICE9PSAtMSxcbiAgICAgIGNhbGxBZnRlclZpZXdDaGVja2VkOlxuICAgICAgICAgIGRpcmVjdGl2ZU1ldGFkYXRhLmxpZmVjeWNsZUhvb2tzLmluZGV4T2YoTGlmZWN5Y2xlSG9va3MuQWZ0ZXJWaWV3Q2hlY2tlZCkgIT09IC0xLFxuICAgICAgY2FsbE9uQ2hhbmdlczogZGlyZWN0aXZlTWV0YWRhdGEubGlmZWN5Y2xlSG9va3MuaW5kZXhPZihMaWZlY3ljbGVIb29rcy5PbkNoYW5nZXMpICE9PSAtMSxcbiAgICAgIGNhbGxEb0NoZWNrOiBkaXJlY3RpdmVNZXRhZGF0YS5saWZlY3ljbGVIb29rcy5pbmRleE9mKExpZmVjeWNsZUhvb2tzLkRvQ2hlY2spICE9PSAtMSxcbiAgICAgIGNhbGxPbkluaXQ6IGRpcmVjdGl2ZU1ldGFkYXRhLmxpZmVjeWNsZUhvb2tzLmluZGV4T2YoTGlmZWN5Y2xlSG9va3MuT25Jbml0KSAhPT0gLTEsXG4gICAgICBjYWxsT25EZXN0cm95OiBkaXJlY3RpdmVNZXRhZGF0YS5saWZlY3ljbGVIb29rcy5pbmRleE9mKExpZmVjeWNsZUhvb2tzLk9uRGVzdHJveSkgIT09IC0xLFxuICAgICAgY2hhbmdlRGV0ZWN0aW9uOiBkaXJlY3RpdmVNZXRhZGF0YS5jaGFuZ2VEZXRlY3Rpb24sXG4gICAgICBvdXRwdXRzOiBvdXRwdXRzQXJyYXlcbiAgICB9KTtcbiAgICB0aGlzLmRpcmVjdGl2ZVJlY29yZHMucHVzaChkaXJlY3RpdmVSZWNvcmQpO1xuXG4gICAgdGVtcGxhdGVWaXNpdEFsbCh0aGlzLCBhc3QuaW5wdXRzLCBkaXJlY3RpdmVSZWNvcmQpO1xuICAgIHZhciBiaW5kaW5nUmVjb3JkcyA9IHRoaXMuYmluZGluZ1JlY29yZHM7XG4gICAgaWYgKGRpcmVjdGl2ZVJlY29yZC5jYWxsT25DaGFuZ2VzKSB7XG4gICAgICBiaW5kaW5nUmVjb3Jkcy5wdXNoKEJpbmRpbmdSZWNvcmQuY3JlYXRlRGlyZWN0aXZlT25DaGFuZ2VzKGRpcmVjdGl2ZVJlY29yZCkpO1xuICAgIH1cbiAgICBpZiAoZGlyZWN0aXZlUmVjb3JkLmNhbGxPbkluaXQpIHtcbiAgICAgIGJpbmRpbmdSZWNvcmRzLnB1c2goQmluZGluZ1JlY29yZC5jcmVhdGVEaXJlY3RpdmVPbkluaXQoZGlyZWN0aXZlUmVjb3JkKSk7XG4gICAgfVxuICAgIGlmIChkaXJlY3RpdmVSZWNvcmQuY2FsbERvQ2hlY2spIHtcbiAgICAgIGJpbmRpbmdSZWNvcmRzLnB1c2goQmluZGluZ1JlY29yZC5jcmVhdGVEaXJlY3RpdmVEb0NoZWNrKGRpcmVjdGl2ZVJlY29yZCkpO1xuICAgIH1cbiAgICB0ZW1wbGF0ZVZpc2l0QWxsKHRoaXMsIGFzdC5ob3N0UHJvcGVydGllcywgZGlyZWN0aXZlUmVjb3JkKTtcbiAgICB0ZW1wbGF0ZVZpc2l0QWxsKHRoaXMsIGFzdC5ob3N0RXZlbnRzLCBkaXJlY3RpdmVSZWNvcmQpO1xuICAgIHRlbXBsYXRlVmlzaXRBbGwodGhpcywgYXN0LmV4cG9ydEFzVmFycyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXREaXJlY3RpdmVQcm9wZXJ0eShhc3Q6IEJvdW5kRGlyZWN0aXZlUHJvcGVydHlBc3QsIGRpcmVjdGl2ZVJlY29yZDogRGlyZWN0aXZlUmVjb3JkKTogYW55IHtcbiAgICAvLyBUT0RPOiB0aGVzZSBzZXR0ZXJzIHNob3VsZCBldmVudHVhbGx5IGJlIGNyZWF0ZWQgYnkgY2hhbmdlIGRldGVjdGlvbiwgdG8gbWFrZVxuICAgIC8vIGl0IG1vbm9tb3JwaGljIVxuICAgIHZhciBzZXR0ZXIgPSByZWZsZWN0b3Iuc2V0dGVyKGFzdC5kaXJlY3RpdmVOYW1lKTtcbiAgICB0aGlzLmJpbmRpbmdSZWNvcmRzLnB1c2goXG4gICAgICAgIEJpbmRpbmdSZWNvcmQuY3JlYXRlRm9yRGlyZWN0aXZlKGFzdC52YWx1ZSwgYXN0LmRpcmVjdGl2ZU5hbWUsIHNldHRlciwgZGlyZWN0aXZlUmVjb3JkKSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBjcmVhdGVDaGFuZ2VEZWZpbml0aW9ucyhwdlZpc2l0b3JzOiBQcm90b1ZpZXdWaXNpdG9yW10sIGNvbXBvbmVudFR5cGU6IENvbXBpbGVUeXBlTWV0YWRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5Db25maWc6IENoYW5nZURldGVjdG9yR2VuQ29uZmlnKTogQ2hhbmdlRGV0ZWN0b3JEZWZpbml0aW9uW10ge1xuICB2YXIgcHZWYXJpYWJsZU5hbWVzID0gX2NvbGxlY3ROZXN0ZWRQcm90b1ZpZXdzVmFyaWFibGVOYW1lcyhwdlZpc2l0b3JzKTtcbiAgcmV0dXJuIHB2VmlzaXRvcnMubWFwKHB2VmlzaXRvciA9PiB7XG4gICAgdmFyIGlkID0gYCR7Y29tcG9uZW50VHlwZS5uYW1lfV8ke3B2VmlzaXRvci52aWV3SW5kZXh9YDtcbiAgICByZXR1cm4gbmV3IENoYW5nZURldGVjdG9yRGVmaW5pdGlvbihcbiAgICAgICAgaWQsIHB2VmlzaXRvci5zdHJhdGVneSwgcHZWYXJpYWJsZU5hbWVzW3B2VmlzaXRvci52aWV3SW5kZXhdLCBwdlZpc2l0b3IuYmluZGluZ1JlY29yZHMsXG4gICAgICAgIHB2VmlzaXRvci5ldmVudFJlY29yZHMsIHB2VmlzaXRvci5kaXJlY3RpdmVSZWNvcmRzLCBnZW5Db25maWcpO1xuXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBfY29sbGVjdE5lc3RlZFByb3RvVmlld3NWYXJpYWJsZU5hbWVzKHB2VmlzaXRvcnM6IFByb3RvVmlld1Zpc2l0b3JbXSk6IHN0cmluZ1tdW10ge1xuICB2YXIgbmVzdGVkUHZWYXJpYWJsZU5hbWVzOiBzdHJpbmdbXVtdID0gTGlzdFdyYXBwZXIuY3JlYXRlRml4ZWRTaXplKHB2VmlzaXRvcnMubGVuZ3RoKTtcbiAgcHZWaXNpdG9ycy5mb3JFYWNoKChwdikgPT4ge1xuICAgIHZhciBwYXJlbnRWYXJpYWJsZU5hbWVzOiBzdHJpbmdbXSA9XG4gICAgICAgIGlzUHJlc2VudChwdi5wYXJlbnQpID8gbmVzdGVkUHZWYXJpYWJsZU5hbWVzW3B2LnBhcmVudC52aWV3SW5kZXhdIDogW107XG4gICAgbmVzdGVkUHZWYXJpYWJsZU5hbWVzW3B2LnZpZXdJbmRleF0gPSBwYXJlbnRWYXJpYWJsZU5hbWVzLmNvbmNhdChwdi52YXJpYWJsZU5hbWVzKTtcbiAgfSk7XG4gIHJldHVybiBuZXN0ZWRQdlZhcmlhYmxlTmFtZXM7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
