System.register(['angular2/src/facade/lang', 'angular2/src/facade/collection', './constants', '../output/output_ast', './compile_method', './expression_converter', './compile_binding'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, collection_1, constants_1, o, compile_method_1, expression_converter_1, compile_binding_1;
    var CompileEventListener;
    function collectEventListeners(hostEvents, dirs, compileElement) {
        var eventListeners = [];
        hostEvents.forEach(function (hostEvent) {
            compileElement.view.bindings.push(new compile_binding_1.CompileBinding(compileElement, hostEvent));
            var listener = CompileEventListener.getOrCreate(compileElement, hostEvent.target, hostEvent.name, eventListeners);
            listener.addAction(hostEvent, null, null);
        });
        collection_1.ListWrapper.forEachWithIndex(dirs, function (directiveAst, i) {
            var directiveInstance = compileElement.directiveInstances[i];
            directiveAst.hostEvents.forEach(function (hostEvent) {
                compileElement.view.bindings.push(new compile_binding_1.CompileBinding(compileElement, hostEvent));
                var listener = CompileEventListener.getOrCreate(compileElement, hostEvent.target, hostEvent.name, eventListeners);
                listener.addAction(hostEvent, directiveAst.directive, directiveInstance);
            });
        });
        eventListeners.forEach(function (listener) { return listener.finishMethod(); });
        return eventListeners;
    }
    exports_1("collectEventListeners", collectEventListeners);
    function bindDirectiveOutputs(directiveAst, directiveInstance, eventListeners) {
        collection_1.StringMapWrapper.forEach(directiveAst.directive.outputs, function (eventName, observablePropName) {
            eventListeners.filter(function (listener) { return listener.eventName == eventName; })
                .forEach(function (listener) { listener.listenToDirective(directiveInstance, observablePropName); });
        });
    }
    exports_1("bindDirectiveOutputs", bindDirectiveOutputs);
    function bindRenderOutputs(eventListeners) {
        eventListeners.forEach(function (listener) { return listener.listenToRenderer(); });
    }
    exports_1("bindRenderOutputs", bindRenderOutputs);
    function convertStmtIntoExpression(stmt) {
        if (stmt instanceof o.ExpressionStatement) {
            return stmt.expr;
        }
        else if (stmt instanceof o.ReturnStatement) {
            return stmt.value;
        }
        return null;
    }
    function santitizeEventName(name) {
        return lang_1.StringWrapper.replaceAll(name, /[^a-zA-Z_]/g, '_');
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            },
            function (o_1) {
                o = o_1;
            },
            function (compile_method_1_1) {
                compile_method_1 = compile_method_1_1;
            },
            function (expression_converter_1_1) {
                expression_converter_1 = expression_converter_1_1;
            },
            function (compile_binding_1_1) {
                compile_binding_1 = compile_binding_1_1;
            }],
        execute: function() {
            CompileEventListener = (function () {
                function CompileEventListener(compileElement, eventTarget, eventName, listenerIndex) {
                    this.compileElement = compileElement;
                    this.eventTarget = eventTarget;
                    this.eventName = eventName;
                    this._hasComponentHostListener = false;
                    this._actionResultExprs = [];
                    this._method = new compile_method_1.CompileMethod(compileElement.view);
                    this._methodName =
                        "_handle_" + santitizeEventName(eventName) + "_" + compileElement.nodeIndex + "_" + listenerIndex;
                    this._eventParam =
                        new o.FnParam(constants_1.EventHandlerVars.event.name, o.importType(this.compileElement.view.genConfig.renderTypes.renderEvent));
                }
                CompileEventListener.getOrCreate = function (compileElement, eventTarget, eventName, targetEventListeners) {
                    var listener = targetEventListeners.find(function (listener) { return listener.eventTarget == eventTarget &&
                        listener.eventName == eventName; });
                    if (lang_1.isBlank(listener)) {
                        listener = new CompileEventListener(compileElement, eventTarget, eventName, targetEventListeners.length);
                        targetEventListeners.push(listener);
                    }
                    return listener;
                };
                CompileEventListener.prototype.addAction = function (hostEvent, directive, directiveInstance) {
                    if (lang_1.isPresent(directive) && directive.isComponent) {
                        this._hasComponentHostListener = true;
                    }
                    this._method.resetDebugInfo(this.compileElement.nodeIndex, hostEvent);
                    var context = lang_1.isPresent(directiveInstance) ? directiveInstance : o.THIS_EXPR.prop('context');
                    var actionStmts = expression_converter_1.convertCdStatementToIr(this.compileElement.view, context, hostEvent.handler);
                    var lastIndex = actionStmts.length - 1;
                    if (lastIndex >= 0) {
                        var lastStatement = actionStmts[lastIndex];
                        var returnExpr = convertStmtIntoExpression(lastStatement);
                        var preventDefaultVar = o.variable("pd_" + this._actionResultExprs.length);
                        this._actionResultExprs.push(preventDefaultVar);
                        if (lang_1.isPresent(returnExpr)) {
                            // Note: We need to cast the result of the method call to dynamic,
                            // as it might be a void method!
                            actionStmts[lastIndex] =
                                preventDefaultVar.set(returnExpr.cast(o.DYNAMIC_TYPE).notIdentical(o.literal(false)))
                                    .toDeclStmt(null, [o.StmtModifier.Final]);
                        }
                    }
                    this._method.addStmts(actionStmts);
                };
                CompileEventListener.prototype.finishMethod = function () {
                    var markPathToRootStart = this._hasComponentHostListener ?
                        this.compileElement.appElement.prop('componentView') :
                        o.THIS_EXPR;
                    var resultExpr = o.literal(true);
                    this._actionResultExprs.forEach(function (expr) { resultExpr = resultExpr.and(expr); });
                    var stmts = [markPathToRootStart.callMethod('markPathToRootAsCheckOnce', []).toStmt()]
                        .concat(this._method.finish())
                        .concat([new o.ReturnStatement(resultExpr)]);
                    this.compileElement.view.eventHandlerMethods.push(new o.ClassMethod(this._methodName, [this._eventParam], stmts, o.BOOL_TYPE, [o.StmtModifier.Private]));
                };
                CompileEventListener.prototype.listenToRenderer = function () {
                    var listenExpr;
                    var eventListener = o.THIS_EXPR.callMethod('eventHandler', [
                        o.fn([this._eventParam], [
                            new o.ReturnStatement(o.THIS_EXPR.callMethod(this._methodName, [constants_1.EventHandlerVars.event]))
                        ])
                    ]);
                    if (lang_1.isPresent(this.eventTarget)) {
                        listenExpr = constants_1.ViewProperties.renderer.callMethod('listenGlobal', [o.literal(this.eventTarget), o.literal(this.eventName), eventListener]);
                    }
                    else {
                        listenExpr = constants_1.ViewProperties.renderer.callMethod('listen', [this.compileElement.renderNode, o.literal(this.eventName), eventListener]);
                    }
                    var disposable = o.variable("disposable_" + this.compileElement.view.disposables.length);
                    this.compileElement.view.disposables.push(disposable);
                    this.compileElement.view.createMethod.addStmt(disposable.set(listenExpr).toDeclStmt(o.FUNCTION_TYPE, [o.StmtModifier.Private]));
                };
                CompileEventListener.prototype.listenToDirective = function (directiveInstance, observablePropName) {
                    var subscription = o.variable("subscription_" + this.compileElement.view.subscriptions.length);
                    this.compileElement.view.subscriptions.push(subscription);
                    var eventListener = o.THIS_EXPR.callMethod('eventHandler', [
                        o.fn([this._eventParam], [o.THIS_EXPR.callMethod(this._methodName, [constants_1.EventHandlerVars.event]).toStmt()])
                    ]);
                    this.compileElement.view.createMethod.addStmt(subscription.set(directiveInstance.prop(observablePropName)
                        .callMethod(o.BuiltinMethod.SubscribeObservable, [eventListener]))
                        .toDeclStmt(null, [o.StmtModifier.Final]));
                };
                return CompileEventListener;
            }());
            exports_1("CompileEventListener", CompileEventListener);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci92aWV3X2NvbXBpbGVyL2V2ZW50X2JpbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztJQXNIQSwrQkFBc0MsVUFBMkIsRUFBRSxJQUFvQixFQUNqRCxjQUE4QjtRQUNsRSxJQUFJLGNBQWMsR0FBMkIsRUFBRSxDQUFDO1FBQ2hELFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxTQUFTO1lBQzNCLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLGdDQUFjLENBQUMsY0FBYyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDakYsSUFBSSxRQUFRLEdBQUcsb0JBQW9CLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxTQUFTLENBQUMsTUFBTSxFQUNoQyxTQUFTLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBQ2hGLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztRQUNILHdCQUFXLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFVBQUMsWUFBWSxFQUFFLENBQUM7WUFDakQsSUFBSSxpQkFBaUIsR0FBRyxjQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0QsWUFBWSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxTQUFTO2dCQUN4QyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxnQ0FBYyxDQUFDLGNBQWMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNqRixJQUFJLFFBQVEsR0FBRyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLFNBQVMsQ0FBQyxNQUFNLEVBQ2hDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQ2hGLFFBQVEsQ0FB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QyxhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUMxRCxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUU7d0JBQ3pELENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQ2xCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLDRCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztxQkFDcEYsQ0FBQyxDQUFDO29CQUNILElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQ3pDLFlBQVksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO3lCQUNyQyxVQUFVLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7eUJBQ2xGLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckQsQ0FBQztnQkFDSCwyQkFBQztZQUFELENBdEdBLEFBc0dDLElBQUE7WUF0R0QsdURBc0dDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL3ZpZXdfY29tcGlsZXIvZXZlbnRfYmluZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc0JsYW5rLCBpc1ByZXNlbnQsIFN0cmluZ1dyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0xpc3RXcmFwcGVyLCBTdHJpbmdNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtFdmVudEhhbmRsZXJWYXJzLCBWaWV3UHJvcGVydGllc30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5pbXBvcnQgKiBhcyBvIGZyb20gJy4uL291dHB1dC9vdXRwdXRfYXN0JztcbmltcG9ydCB7Q29tcGlsZUVsZW1lbnR9IGZyb20gJy4vY29tcGlsZV9lbGVtZW50JztcbmltcG9ydCB7Q29tcGlsZU1ldGhvZH0gZnJvbSAnLi9jb21waWxlX21ldGhvZCc7XG5cbmltcG9ydCB7Qm91bmRFdmVudEFzdCwgRGlyZWN0aXZlQXN0fSBmcm9tICcuLi90ZW1wbGF0ZV9hc3QnO1xuaW1wb3J0IHtDb21waWxlRGlyZWN0aXZlTWV0YWRhdGF9IGZyb20gJy4uL2NvbXBpbGVfbWV0YWRhdGEnO1xuXG5pbXBvcnQge2NvbnZlcnRDZFN0YXRlbWVudFRvSXJ9IGZyb20gJy4vZXhwcmVzc2lvbl9jb252ZXJ0ZXInO1xuaW1wb3J0IHtDb21waWxlQmluZGluZ30gZnJvbSAnLi9jb21waWxlX2JpbmRpbmcnO1xuXG5leHBvcnQgY2xhc3MgQ29tcGlsZUV2ZW50TGlzdGVuZXIge1xuICBwcml2YXRlIF9tZXRob2Q6IENvbXBpbGVNZXRob2Q7XG4gIHByaXZhdGUgX2hhc0NvbXBvbmVudEhvc3RMaXN0ZW5lcjogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9tZXRob2ROYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgX2V2ZW50UGFyYW06IG8uRm5QYXJhbTtcbiAgcHJpdmF0ZSBfYWN0aW9uUmVzdWx0RXhwcnM6IG8uRXhwcmVzc2lvbltdID0gW107XG5cbiAgc3RhdGljIGdldE9yQ3JlYXRlKGNvbXBpbGVFbGVtZW50OiBDb21waWxlRWxlbWVudCwgZXZlbnRUYXJnZXQ6IHN0cmluZywgZXZlbnROYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICB0YXJnZXRFdmVudExpc3RlbmVyczogQ29tcGlsZUV2ZW50TGlzdGVuZXJbXSk6IENvbXBpbGVFdmVudExpc3RlbmVyIHtcbiAgICB2YXIgbGlzdGVuZXIgPSB0YXJnZXRFdmVudExpc3RlbmVycy5maW5kKGxpc3RlbmVyID0+IGxpc3RlbmVyLmV2ZW50VGFyZ2V0ID09IGV2ZW50VGFyZ2V0ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lci5ldmVudE5hbWUgPT0gZXZlbnROYW1lKTtcbiAgICBpZiAoaXNCbGFuayhsaXN0ZW5lcikpIHtcbiAgICAgIGxpc3RlbmVyID0gbmV3IENvbXBpbGVFdmVudExpc3RlbmVyKGNvbXBpbGVFbGVtZW50LCBldmVudFRhcmdldCwgZXZlbnROYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RXZlbnRMaXN0ZW5lcnMubGVuZ3RoKTtcbiAgICAgIHRhcmdldEV2ZW50TGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cbiAgICByZXR1cm4gbGlzdGVuZXI7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29tcGlsZUVsZW1lbnQ6IENvbXBpbGVFbGVtZW50LCBwdWJsaWMgZXZlbnRUYXJnZXQ6IHN0cmluZyxcbiAgICAgICAgICAgICAgcHVibGljIGV2ZW50TmFtZTogc3RyaW5nLCBsaXN0ZW5lckluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9tZXRob2QgPSBuZXcgQ29tcGlsZU1ldGhvZChjb21waWxlRWxlbWVudC52aWV3KTtcbiAgICB0aGlzLl9tZXRob2ROYW1lID1cbiAgICAgICAgYF9oYW5kbGVfJHtzYW50aXRpemVFdmVudE5hbWUoZXZlbnROYW1lKX1fJHtjb21waWxlRWxlbWVudC5ub2RlSW5kZXh9XyR7bGlzdGVuZXJJbmRleH1gO1xuICAgIHRoaXMuX2V2ZW50UGFyYW0gPVxuICAgICAgICBuZXcgby5GblBhcmFtKEV2ZW50SGFuZGxlclZhcnMuZXZlbnQubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICBvLmltcG9ydFR5cGUodGhpcy5jb21waWxlRWxlbWVudC52aWV3LmdlbkNvbmZpZy5yZW5kZXJUeXBlcy5yZW5kZXJFdmVudCkpO1xuICB9XG5cbiAgYWRkQWN0aW9uKGhvc3RFdmVudDogQm91bmRFdmVudEFzdCwgZGlyZWN0aXZlOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsXG4gICAgICAgICAgICBkaXJlY3RpdmVJbnN0YW5jZTogby5FeHByZXNzaW9uKSB7XG4gICAgaWYgKGlzUHJlc2VudChkaXJlY3RpdmUpICYmIGRpcmVjdGl2ZS5pc0NvbXBvbmVudCkge1xuICAgICAgdGhpcy5faGFzQ29tcG9uZW50SG9zdExpc3RlbmVyID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5fbWV0aG9kLnJlc2V0RGVidWdJbmZvKHRoaXMuY29tcGlsZUVsZW1lbnQubm9kZUluZGV4LCBob3N0RXZlbnQpO1xuICAgIHZhciBjb250ZXh0ID0gaXNQcmVzZW50KGRpcmVjdGl2ZUluc3RhbmNlKSA/IGRpcmVjdGl2ZUluc3RhbmNlIDogby5USElTX0VYUFIucHJvcCgnY29udGV4dCcpO1xuICAgIHZhciBhY3Rpb25TdG10cyA9IGNvbnZlcnRDZFN0YXRlbWVudFRvSXIodGhpcy5jb21waWxlRWxlbWVudC52aWV3LCBjb250ZXh0LCBob3N0RXZlbnQuaGFuZGxlcik7XG4gICAgdmFyIGxhc3RJbmRleCA9IGFjdGlvblN0bXRzLmxlbmd0aCAtIDE7XG4gICAgaWYgKGxhc3RJbmRleCA+PSAwKSB7XG4gICAgICB2YXIgbGFzdFN0YXRlbWVudCA9IGFjdGlvblN0bXRzW2xhc3RJbmRleF07XG4gICAgICB2YXIgcmV0dXJuRXhwciA9IGNvbnZlcnRTdG10SW50b0V4cHJlc3Npb24obGFzdFN0YXRlbWVudCk7XG4gICAgICB2YXIgcHJldmVudERlZmF1bHRWYXIgPSBvLnZhcmlhYmxlKGBwZF8ke3RoaXMuX2FjdGlvblJlc3VsdEV4cHJzLmxlbmd0aH1gKTtcbiAgICAgIHRoaXMuX2FjdGlvblJlc3VsdEV4cHJzLnB1c2gocHJldmVudERlZmF1bHRWYXIpO1xuICAgICAgaWYgKGlzUHJlc2VudChyZXR1cm5FeHByKSkge1xuICAgICAgICAvLyBOb3RlOiBXZSBuZWVkIHRvIGNhc3QgdGhlIHJlc3VsdCBvZiB0aGUgbWV0aG9kIGNhbGwgdG8gZHluYW1pYyxcbiAgICAgICAgLy8gYXMgaXQgbWlnaHQgYmUgYSB2b2lkIG1ldGhvZCFcbiAgICAgICAgYWN0aW9uU3RtdHNbbGFzdEluZGV4XSA9XG4gICAgICAgICAgICBwcmV2ZW50RGVmYXVsdFZhci5zZXQocmV0dXJuRXhwci5jYXN0KG8uRFlOQU1JQ19UWVBFKS5ub3RJZGVudGljYWwoby5saXRlcmFsKGZhbHNlKSkpXG4gICAgICAgICAgICAgICAgLnRvRGVjbFN0bXQobnVsbCwgW28uU3RtdE1vZGlmaWVyLkZpbmFsXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX21ldGhvZC5hZGRTdG10cyhhY3Rpb25TdG10cyk7XG4gIH1cblxuICBmaW5pc2hNZXRob2QoKSB7XG4gICAgdmFyIG1hcmtQYXRoVG9Sb290U3RhcnQgPSB0aGlzLl9oYXNDb21wb25lbnRIb3N0TGlzdGVuZXIgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGlsZUVsZW1lbnQuYXBwRWxlbWVudC5wcm9wKCdjb21wb25lbnRWaWV3JykgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8uVEhJU19FWFBSO1xuICAgIHZhciByZXN1bHRFeHByOiBvLkV4cHJlc3Npb24gPSBvLmxpdGVyYWwodHJ1ZSk7XG4gICAgdGhpcy5fYWN0aW9uUmVzdWx0RXhwcnMuZm9yRWFjaCgoZXhwcikgPT4geyByZXN1bHRFeHByID0gcmVzdWx0RXhwci5hbmQoZXhwcik7IH0pO1xuICAgIHZhciBzdG10cyA9XG4gICAgICAgICg8by5TdGF0ZW1lbnRbXT5bbWFya1BhdGhUb1Jvb3RTdGFydC5jYWxsTWV0aG9kKCdtYXJrUGF0aFRvUm9vdEFzQ2hlY2tPbmNlJywgW10pLnRvU3RtdCgpXSlcbiAgICAgICAgICAgIC5jb25jYXQodGhpcy5fbWV0aG9kLmZpbmlzaCgpKVxuICAgICAgICAgICAgLmNvbmNhdChbbmV3IG8uUmV0dXJuU3RhdGVtZW50KHJlc3VsdEV4cHIpXSk7XG4gICAgdGhpcy5jb21waWxlRWxlbWVudC52aWV3LmV2ZW50SGFuZGxlck1ldGhvZHMucHVzaChuZXcgby5DbGFzc01ldGhvZChcbiAgICAgICAgdGhpcy5fbWV0aG9kTmFtZSwgW3RoaXMuX2V2ZW50UGFyYW1dLCBzdG10cywgby5CT09MX1RZUEUsIFtvLlN0bXRNb2RpZmllci5Qcml2YXRlXSkpO1xuICB9XG5cbiAgbGlzdGVuVG9SZW5kZXJlcigpIHtcbiAgICB2YXIgbGlzdGVuRXhwcjtcbiAgICB2YXIgZXZlbnRMaXN0ZW5lciA9IG8uVEhJU19FWFBSLmNhbGxNZXRob2QoJ2V2ZW50SGFuZGxlcicsIFtcbiAgICAgIG8uZm4oW3RoaXMuX2V2ZW50UGFyYW1dLFxuICAgICAgICAgICBbXG4gICAgICAgICAgICAgbmV3IG8uUmV0dXJuU3RhdGVtZW50KFxuICAgICAgICAgICAgICAgICBvLlRISVNfRVhQUi5jYWxsTWV0aG9kKHRoaXMuX21ldGhvZE5hbWUsIFtFdmVudEhhbmRsZXJWYXJzLmV2ZW50XSkpXG4gICAgICAgICAgIF0pXG4gICAgXSk7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLmV2ZW50VGFyZ2V0KSkge1xuICAgICAgbGlzdGVuRXhwciA9IFZpZXdQcm9wZXJ0aWVzLnJlbmRlcmVyLmNhbGxNZXRob2QoXG4gICAgICAgICAgJ2xpc3Rlbkdsb2JhbCcsIFtvLmxpdGVyYWwodGhpcy5ldmVudFRhcmdldCksIG8ubGl0ZXJhbCh0aGlzLmV2ZW50TmFtZSksIGV2ZW50TGlzdGVuZXJdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdGVuRXhwciA9IFZpZXdQcm9wZXJ0aWVzLnJlbmRlcmVyLmNhbGxNZXRob2QoXG4gICAgICAgICAgJ2xpc3RlbicsIFt0aGlzLmNvbXBpbGVFbGVtZW50LnJlbmRlck5vZGUsIG8ubGl0ZXJhbCh0aGlzLmV2ZW50TmFtZSksIGV2ZW50TGlzdGVuZXJdKTtcbiAgICB9XG4gICAgdmFyIGRpc3Bvc2FibGUgPSBvLnZhcmlhYmxlKGBkaXNwb3NhYmxlXyR7dGhpcy5jb21waWxlRWxlbWVudC52aWV3LmRpc3Bvc2FibGVzLmxlbmd0aH1gKTtcbiAgICB0aGlzLmNvbXBpbGVFbGVtZW50LnZpZXcuZGlzcG9zYWJsZXMucHVzaChkaXNwb3NhYmxlKTtcbiAgICB0aGlzLmNvbXBpbGVFbGVtZW50LnZpZXcuY3JlYXRlTWV0aG9kLmFkZFN0bXQoXG4gICAgICAgIGRpc3Bvc2FibGUuc2V0KGxpc3RlbkV4cHIpLnRvRGVjbFN0bXQoby5GVU5DVElPTl9UWVBFLCBbby5TdG10TW9kaWZpZXIuUHJpdmF0ZV0pKTtcbiAgfVxuXG4gIGxpc3RlblRvRGlyZWN0aXZlKGRpcmVjdGl2ZUluc3RhbmNlOiBvLkV4cHJlc3Npb24sIG9ic2VydmFibGVQcm9wTmFtZTogc3RyaW5nKSB7XG4gICAgdmFyIHN1YnNjcmlwdGlvbiA9IG8udmFyaWFibGUoYHN1YnNjcmlwdGlvbl8ke3RoaXMuY29tcGlsZUVsZW1lbnQudmlldy5zdWJzY3JpcHRpb25zLmxlbmd0aH1gKTtcbiAgICB0aGlzLmNvbXBpbGVFbGVtZW50LnZpZXcuc3Vic2NyaXB0aW9ucy5wdXNoKHN1YnNjcmlwdGlvbik7XG4gICAgdmFyIGV2ZW50TGlzdGVuZXIgPSBvLlRISVNfRVhQUi5jYWxsTWV0aG9kKCdldmVudEhhbmRsZXInLCBbXG4gICAgICBvLmZuKFt0aGlzLl9ldmVudFBhcmFtXSxcbiAgICAgICAgICAgW28uVEhJU19FWFBSLmNhbGxNZXRob2QodGhpcy5fbWV0aG9kTmFtZSwgW0V2ZW50SGFuZGxlclZhcnMuZXZlbnRdKS50b1N0bXQoKV0pXG4gICAgXSk7XG4gICAgdGhpcy5jb21waWxlRWxlbWVudC52aWV3LmNyZWF0ZU1ldGhvZC5hZGRTdG10KFxuICAgICAgICBzdWJzY3JpcHRpb24uc2V0KGRpcmVjdGl2ZUluc3RhbmNlLnByb3Aob2JzZXJ2YWJsZVByb3BOYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2FsbE1ldGhvZChvLkJ1aWx0aW5NZXRob2QuU3Vic2NyaWJlT2JzZXJ2YWJsZSwgW2V2ZW50TGlzdGVuZXJdKSlcbiAgICAgICAgICAgIC50b0RlY2xTdG10KG51bGwsIFtvLlN0bXRNb2RpZmllci5GaW5hbF0pKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29sbGVjdEV2ZW50TGlzdGVuZXJzKGhvc3RFdmVudHM6IEJvdW5kRXZlbnRBc3RbXSwgZGlyczogRGlyZWN0aXZlQXN0W10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBpbGVFbGVtZW50OiBDb21waWxlRWxlbWVudCk6IENvbXBpbGVFdmVudExpc3RlbmVyW10ge1xuICB2YXIgZXZlbnRMaXN0ZW5lcnM6IENvbXBpbGVFdmVudExpc3RlbmVyW10gPSBbXTtcbiAgaG9zdEV2ZW50cy5mb3JFYWNoKChob3N0RXZlbnQpID0+IHtcbiAgICBjb21waWxlRWxlbWVudC52aWV3LmJpbmRpbmdzLnB1c2gobmV3IENvbXBpbGVCaW5kaW5nKGNvbXBpbGVFbGVtZW50LCBob3N0RXZlbnQpKTtcbiAgICB2YXIgbGlzdGVuZXIgPSBDb21waWxlRXZlbnRMaXN0ZW5lci5nZXRPckNyZWF0ZShjb21waWxlRWxlbWVudCwgaG9zdEV2ZW50LnRhcmdldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3N0RXZlbnQubmFtZSwgZXZlbnRMaXN0ZW5lcnMpO1xuICAgIGxpc3RlbmVyLmFkZEFjdGlvbihob3N0RXZlbnQsIG51bGwsIG51bGwpO1xuICB9KTtcbiAgTGlzdFdyYXBwZXIuZm9yRWFjaFdpdGhJbmRleChkaXJzLCAoZGlyZWN0aXZlQXN0LCBpKSA9PiB7XG4gICAgdmFyIGRpcmVjdGl2ZUluc3RhbmNlID0gY29tcGlsZUVsZW1lbnQuZGlyZWN0aXZlSW5zdGFuY2VzW2ldO1xuICAgIGRpcmVjdGl2ZUFzdC5ob3N0RXZlbnRzLmZvckVhY2goKGhvc3RFdmVudCkgPT4ge1xuICAgICAgY29tcGlsZUVsZW1lbnQudmlldy5iaW5kaW5ncy5wdXNoKG5ldyBDb21waWxlQmluZGluZyhjb21waWxlRWxlbWVudCwgaG9zdEV2ZW50KSk7XG4gICAgICB2YXIgbGlzdGVuZXIgPSBDb21waWxlRXZlbnRMaXN0ZW5lci5nZXRPckNyZWF0ZShjb21waWxlRWxlbWVudCwgaG9zdEV2ZW50LnRhcmdldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvc3RFdmVudC5uYW1lLCBldmVudExpc3RlbmVycyk7XG4gICAgICBsaXN0ZW5lci5hZGRBY3Rpb24oaG9zdEV2ZW50LCBkaXJlY3RpdmVBc3QuZGlyZWN0aXZlLCBkaXJlY3RpdmVJbnN0YW5jZSk7XG4gICAgfSk7XG4gIH0pO1xuICBldmVudExpc3RlbmVycy5mb3JFYWNoKChsaXN0ZW5lcikgPT4gbGlzdGVuZXIuZmluaXNoTWV0aG9kKCkpO1xuICByZXR1cm4gZXZlbnRMaXN0ZW5lcnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5kRGlyZWN0aXZlT3V0cHV0cyhkaXJlY3RpdmVBc3Q6IERpcmVjdGl2ZUFzdCwgZGlyZWN0aXZlSW5zdGFuY2U6IG8uRXhwcmVzc2lvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudExpc3RlbmVyczogQ29tcGlsZUV2ZW50TGlzdGVuZXJbXSkge1xuICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2goZGlyZWN0aXZlQXN0LmRpcmVjdGl2ZS5vdXRwdXRzLCAoZXZlbnROYW1lLCBvYnNlcnZhYmxlUHJvcE5hbWUpID0+IHtcbiAgICBldmVudExpc3RlbmVycy5maWx0ZXIobGlzdGVuZXIgPT4gbGlzdGVuZXIuZXZlbnROYW1lID09IGV2ZW50TmFtZSlcbiAgICAgICAgLmZvckVhY2goXG4gICAgICAgICAgICAobGlzdGVuZXIpID0+IHsgbGlzdGVuZXIubGlzdGVuVG9EaXJlY3RpdmUoZGlyZWN0aXZlSW5zdGFuY2UsIG9ic2VydmFibGVQcm9wTmFtZSk7IH0pO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJpbmRSZW5kZXJPdXRwdXRzKGV2ZW50TGlzdGVuZXJzOiBDb21waWxlRXZlbnRMaXN0ZW5lcltdKSB7XG4gIGV2ZW50TGlzdGVuZXJzLmZvckVhY2gobGlzdGVuZXIgPT4gbGlzdGVuZXIubGlzdGVuVG9SZW5kZXJlcigpKTtcbn1cblxuZnVuY3Rpb24gY29udmVydFN0bXRJbnRvRXhwcmVzc2lvbihzdG10OiBvLlN0YXRlbWVudCk6IG8uRXhwcmVzc2lvbiB7XG4gIGlmIChzdG10IGluc3RhbmNlb2Ygby5FeHByZXNzaW9uU3RhdGVtZW50KSB7XG4gICAgcmV0dXJuIHN0bXQuZXhwcjtcbiAgfSBlbHNlIGlmIChzdG10IGluc3RhbmNlb2Ygby5SZXR1cm5TdGF0ZW1lbnQpIHtcbiAgICByZXR1cm4gc3RtdC52YWx1ZTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gc2FudGl0aXplRXZlbnROYW1lKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGwobmFtZSwgL1teYS16QS1aX10vZywgJ18nKTtcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
