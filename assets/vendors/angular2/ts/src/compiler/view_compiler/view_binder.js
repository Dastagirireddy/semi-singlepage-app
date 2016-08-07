System.register(['angular2/src/facade/collection', '../template_ast', './property_binder', './event_binder', './lifecycle_binder'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var collection_1, template_ast_1, property_binder_1, event_binder_1, lifecycle_binder_1;
    var ViewBinderVisitor;
    function bindView(view, parsedTemplate) {
        var visitor = new ViewBinderVisitor(view);
        template_ast_1.templateVisitAll(visitor, parsedTemplate);
        view.pipes.forEach(function (pipe) { lifecycle_binder_1.bindPipeDestroyLifecycleCallbacks(pipe.meta, pipe.instance, pipe.view); });
    }
    exports_1("bindView", bindView);
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (template_ast_1_1) {
                template_ast_1 = template_ast_1_1;
            },
            function (property_binder_1_1) {
                property_binder_1 = property_binder_1_1;
            },
            function (event_binder_1_1) {
                event_binder_1 = event_binder_1_1;
            },
            function (lifecycle_binder_1_1) {
                lifecycle_binder_1 = lifecycle_binder_1_1;
            }],
        execute: function() {
            ViewBinderVisitor = (function () {
                function ViewBinderVisitor(view) {
                    this.view = view;
                    this._nodeIndex = 0;
                }
                ViewBinderVisitor.prototype.visitBoundText = function (ast, parent) {
                    var node = this.view.nodes[this._nodeIndex++];
                    property_binder_1.bindRenderText(ast, node, this.view);
                    return null;
                };
                ViewBinderVisitor.prototype.visitText = function (ast, parent) {
                    this._nodeIndex++;
                    return null;
                };
                ViewBinderVisitor.prototype.visitNgContent = function (ast, parent) { return null; };
                ViewBinderVisitor.prototype.visitElement = function (ast, parent) {
                    var compileElement = this.view.nodes[this._nodeIndex++];
                    var eventListeners = event_binder_1.collectEventListeners(ast.outputs, ast.directives, compileElement);
                    property_binder_1.bindRenderInputs(ast.inputs, compileElement);
                    event_binder_1.bindRenderOutputs(eventListeners);
                    collection_1.ListWrapper.forEachWithIndex(ast.directives, function (directiveAst, index) {
                        var directiveInstance = compileElement.directiveInstances[index];
                        property_binder_1.bindDirectiveInputs(directiveAst, directiveInstance, compileElement);
                        lifecycle_binder_1.bindDirectiveDetectChangesLifecycleCallbacks(directiveAst, directiveInstance, compileElement);
                        property_binder_1.bindDirectiveHostProps(directiveAst, directiveInstance, compileElement);
                        event_binder_1.bindDirectiveOutputs(directiveAst, directiveInstance, eventListeners);
                    });
                    template_ast_1.templateVisitAll(this, ast.children, compileElement);
                    // afterContent and afterView lifecycles need to be called bottom up
                    // so that children are notified before parents
                    collection_1.ListWrapper.forEachWithIndex(ast.directives, function (directiveAst, index) {
                        var directiveInstance = compileElement.directiveInstances[index];
                        lifecycle_binder_1.bindDirectiveAfterContentLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
                        lifecycle_binder_1.bindDirectiveAfterViewLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
                        lifecycle_binder_1.bindDirectiveDestroyLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
                    });
                    return null;
                };
                ViewBinderVisitor.prototype.visitEmbeddedTemplate = function (ast, parent) {
                    var compileElement = this.view.nodes[this._nodeIndex++];
                    var eventListeners = event_binder_1.collectEventListeners(ast.outputs, ast.directives, compileElement);
                    collection_1.ListWrapper.forEachWithIndex(ast.directives, function (directiveAst, index) {
                        var directiveInstance = compileElement.directiveInstances[index];
                        property_binder_1.bindDirectiveInputs(directiveAst, directiveInstance, compileElement);
                        lifecycle_binder_1.bindDirectiveDetectChangesLifecycleCallbacks(directiveAst, directiveInstance, compileElement);
                        event_binder_1.bindDirectiveOutputs(directiveAst, directiveInstance, eventListeners);
                        lifecycle_binder_1.bindDirectiveAfterContentLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
                        lifecycle_binder_1.bindDirectiveAfterViewLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
                        lifecycle_binder_1.bindDirectiveDestroyLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
                    });
                    bindView(compileElement.embeddedView, ast.children);
                    return null;
                };
                ViewBinderVisitor.prototype.visitAttr = function (ast, ctx) { return null; };
                ViewBinderVisitor.prototype.visitDirective = function (ast, ctx) { return null; };
                ViewBinderVisitor.prototype.visitEvent = function (ast, eventTargetAndNames) {
                    return null;
                };
                ViewBinderVisitor.prototype.visitReference = function (ast, ctx) { return null; };
                ViewBinderVisitor.prototype.visitVariable = function (ast, ctx) { return null; };
                ViewBinderVisitor.prototype.visitDirectiveProperty = function (ast, context) { return null; };
                ViewBinderVisitor.prototype.visitElementProperty = function (ast, context) { return null; };
                return ViewBinderVisitor;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci92aWV3X2NvbXBpbGVyL3ZpZXdfYmluZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0lBdUNBLGtCQUF5QixJQUFpQixFQUFFLGNBQTZCO1FBQ3ZFLElBQUksT0FBTyxHQUFHLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUMsK0JBQWdCLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUNkLFVBQUMsSUFBSSxJQUFPLG9EQUFpQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RixDQUFDO0lBTEQsK0JBS0MsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUVEO2dCQUdFLDJCQUFtQixJQUFpQjtvQkFBakIsU0FBSSxHQUFKLElBQUksQ0FBYTtvQkFGNUIsZUFBVSxHQUFXLENBQUMsQ0FBQztnQkFFUSxDQUFDO2dCQUV4QywwQ0FBYyxHQUFkLFVBQWUsR0FBaUIsRUFBRSxNQUFzQjtvQkFDdEQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7b0JBQzlDLGdDQUFjLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQztnQkFDRCxxQ0FBUyxHQUFULFVBQVUsR0FBWSxFQUFFLE1BQXNCO29CQUM1QyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQztnQkFFRCwwQ0FBYyxHQUFkLFVBQWUsR0FBaUIsRUFBRSxNQUFz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QUFDLFNBQVMsRUFBRSxpQkFBaUIsRUFDekMsY0FBYyxDQUFDLENBQUM7d0JBQ3pELHlEQUFzQyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsaUJBQWlCLEVBQ3pDLGNBQWMsQ0FBQyxDQUFDO29CQUN6RCxDQUFDLENBQUMsQ0FBQztvQkFDSCxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3BELE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQztnQkFFRCxxQ0FBUyxHQUFULFVBQVUsR0FBWSxFQUFFLEdBQVEsSUFBUyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdkQsMENBQWMsR0FBZCxVQUFlLEdBQWlCLEVBQUUsR0FBUSxJQUFTLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNqRSxzQ0FBVSxHQUFWLFVBQVcsR0FBa0IsRUFBRSxtQkFBK0M7b0JBQzVFLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQztnQkFFRCwwQ0FBYyxHQUFkLFVBQWUsR0FBaUIsRUFBRSxHQUFRLElBQVMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2pFLHlDQUFhLEdBQWIsVUFBYyxHQUFnQixFQUFFLEdBQVEsSUFBUyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDL0Qsa0RBQXNCLEdBQXRCLFVBQXVCLEdBQThCLEVBQUUsT0FBWSxJQUFTLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUMxRixnREFBb0IsR0FBcEIsVUFBcUIsR0FBNEIsRUFBRSxPQUFZLElBQVMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3hGLHdCQUFDO1lBQUQsQ0ExRUEsQUEwRUMsSUFBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tcGlsZXIvdmlld19jb21waWxlci92aWV3X2JpbmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIExpc3RXcmFwcGVyLFxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtcbiAgVGVtcGxhdGVBc3QsXG4gIFRlbXBsYXRlQXN0VmlzaXRvcixcbiAgTmdDb250ZW50QXN0LFxuICBFbWJlZGRlZFRlbXBsYXRlQXN0LFxuICBFbGVtZW50QXN0LFxuICBSZWZlcmVuY2VBc3QsXG4gIFZhcmlhYmxlQXN0LFxuICBCb3VuZEV2ZW50QXN0LFxuICBCb3VuZEVsZW1lbnRQcm9wZXJ0eUFzdCxcbiAgQXR0ckFzdCxcbiAgQm91bmRUZXh0QXN0LFxuICBUZXh0QXN0LFxuICBEaXJlY3RpdmVBc3QsXG4gIEJvdW5kRGlyZWN0aXZlUHJvcGVydHlBc3QsXG4gIHRlbXBsYXRlVmlzaXRBbGwsXG4gIFByb3BlcnR5QmluZGluZ1R5cGUsXG4gIFByb3ZpZGVyQXN0XG59IGZyb20gJy4uL3RlbXBsYXRlX2FzdCc7XG5pbXBvcnQge1xuICBiaW5kUmVuZGVyVGV4dCxcbiAgYmluZFJlbmRlcklucHV0cyxcbiAgYmluZERpcmVjdGl2ZUlucHV0cyxcbiAgYmluZERpcmVjdGl2ZUhvc3RQcm9wc1xufSBmcm9tICcuL3Byb3BlcnR5X2JpbmRlcic7XG5pbXBvcnQge2JpbmRSZW5kZXJPdXRwdXRzLCBjb2xsZWN0RXZlbnRMaXN0ZW5lcnMsIGJpbmREaXJlY3RpdmVPdXRwdXRzfSBmcm9tICcuL2V2ZW50X2JpbmRlcic7XG5pbXBvcnQge1xuICBiaW5kRGlyZWN0aXZlQWZ0ZXJDb250ZW50TGlmZWN5Y2xlQ2FsbGJhY2tzLFxuICBiaW5kRGlyZWN0aXZlQWZ0ZXJWaWV3TGlmZWN5Y2xlQ2FsbGJhY2tzLFxuICBiaW5kRGlyZWN0aXZlRGVzdHJveUxpZmVjeWNsZUNhbGxiYWNrcyxcbiAgYmluZFBpcGVEZXN0cm95TGlmZWN5Y2xlQ2FsbGJhY2tzLFxuICBiaW5kRGlyZWN0aXZlRGV0ZWN0Q2hhbmdlc0xpZmVjeWNsZUNhbGxiYWNrc1xufSBmcm9tICcuL2xpZmVjeWNsZV9iaW5kZXInO1xuaW1wb3J0IHtDb21waWxlVmlld30gZnJvbSAnLi9jb21waWxlX3ZpZXcnO1xuaW1wb3J0IHtDb21waWxlRWxlbWVudCwgQ29tcGlsZU5vZGV9IGZyb20gJy4vY29tcGlsZV9lbGVtZW50JztcblxuZXhwb3J0IGZ1bmN0aW9uIGJpbmRWaWV3KHZpZXc6IENvbXBpbGVWaWV3LCBwYXJzZWRUZW1wbGF0ZTogVGVtcGxhdGVBc3RbXSk6IHZvaWQge1xuICB2YXIgdmlzaXRvciA9IG5ldyBWaWV3QmluZGVyVmlzaXRvcih2aWV3KTtcbiAgdGVtcGxhdGVWaXNpdEFsbCh2aXNpdG9yLCBwYXJzZWRUZW1wbGF0ZSk7XG4gIHZpZXcucGlwZXMuZm9yRWFjaChcbiAgICAgIChwaXBlKSA9PiB7IGJpbmRQaXBlRGVzdHJveUxpZmVjeWNsZUNhbGxiYWNrcyhwaXBlLm1ldGEsIHBpcGUuaW5zdGFuY2UsIHBpcGUudmlldyk7IH0pO1xufVxuXG5jbGFzcyBWaWV3QmluZGVyVmlzaXRvciBpbXBsZW1lbnRzIFRlbXBsYXRlQXN0VmlzaXRvciB7XG4gIHByaXZhdGUgX25vZGVJbmRleDogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmlldzogQ29tcGlsZVZpZXcpIHt9XG5cbiAgdmlzaXRCb3VuZFRleHQoYXN0OiBCb3VuZFRleHRBc3QsIHBhcmVudDogQ29tcGlsZUVsZW1lbnQpOiBhbnkge1xuICAgIHZhciBub2RlID0gdGhpcy52aWV3Lm5vZGVzW3RoaXMuX25vZGVJbmRleCsrXTtcbiAgICBiaW5kUmVuZGVyVGV4dChhc3QsIG5vZGUsIHRoaXMudmlldyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXRUZXh0KGFzdDogVGV4dEFzdCwgcGFyZW50OiBDb21waWxlRWxlbWVudCk6IGFueSB7XG4gICAgdGhpcy5fbm9kZUluZGV4Kys7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2aXNpdE5nQ29udGVudChhc3Q6IE5nQ29udGVudEFzdCwgcGFyZW50OiBDb21waWxlRWxlbWVudCk6IGFueSB7IHJldHVybiBudWxsOyB9XG5cbiAgdmlzaXRFbGVtZW50KGFzdDogRWxlbWVudEFzdCwgcGFyZW50OiBDb21waWxlRWxlbWVudCk6IGFueSB7XG4gICAgdmFyIGNvbXBpbGVFbGVtZW50ID0gPENvbXBpbGVFbGVtZW50PnRoaXMudmlldy5ub2Rlc1t0aGlzLl9ub2RlSW5kZXgrK107XG4gICAgdmFyIGV2ZW50TGlzdGVuZXJzID0gY29sbGVjdEV2ZW50TGlzdGVuZXJzKGFzdC5vdXRwdXRzLCBhc3QuZGlyZWN0aXZlcywgY29tcGlsZUVsZW1lbnQpO1xuICAgIGJpbmRSZW5kZXJJbnB1dHMoYXN0LmlucHV0cywgY29tcGlsZUVsZW1lbnQpO1xuICAgIGJpbmRSZW5kZXJPdXRwdXRzKGV2ZW50TGlzdGVuZXJzKTtcbiAgICBMaXN0V3JhcHBlci5mb3JFYWNoV2l0aEluZGV4KGFzdC5kaXJlY3RpdmVzLCAoZGlyZWN0aXZlQXN0LCBpbmRleCkgPT4ge1xuICAgICAgdmFyIGRpcmVjdGl2ZUluc3RhbmNlID0gY29tcGlsZUVsZW1lbnQuZGlyZWN0aXZlSW5zdGFuY2VzW2luZGV4XTtcbiAgICAgIGJpbmREaXJlY3RpdmVJbnB1dHMoZGlyZWN0aXZlQXN0LCBkaXJlY3RpdmVJbnN0YW5jZSwgY29tcGlsZUVsZW1lbnQpO1xuICAgICAgYmluZERpcmVjdGl2ZURldGVjdENoYW5nZXNMaWZlY3ljbGVDYWxsYmFja3MoZGlyZWN0aXZlQXN0LCBkaXJlY3RpdmVJbnN0YW5jZSwgY29tcGlsZUVsZW1lbnQpO1xuXG4gICAgICBiaW5kRGlyZWN0aXZlSG9zdFByb3BzKGRpcmVjdGl2ZUFzdCwgZGlyZWN0aXZlSW5zdGFuY2UsIGNvbXBpbGVFbGVtZW50KTtcbiAgICAgIGJpbmREaXJlY3RpdmVPdXRwdXRzKGRpcmVjdGl2ZUFzdCwgZGlyZWN0aXZlSW5zdGFuY2UsIGV2ZW50TGlzdGVuZXJzKTtcbiAgICB9KTtcbiAgICB0ZW1wbGF0ZVZpc2l0QWxsKHRoaXMsIGFzdC5jaGlsZHJlbiwgY29tcGlsZUVsZW1lbnQpO1xuICAgIC8vIGFmdGVyQ29udGVudCBhbmQgYWZ0ZXJWaWV3IGxpZmVjeWNsZXMgbmVlZCB0byBiZSBjYWxsZWQgYm90dG9tIHVwXG4gICAgLy8gc28gdGhhdCBjaGlsZHJlbiBhcmUgbm90aWZpZWQgYmVmb3JlIHBhcmVudHNcbiAgICBMaXN0V3JhcHBlci5mb3JFYWNoV2l0aEluZGV4KGFzdC5kaXJlY3RpdmVzLCAoZGlyZWN0aXZlQXN0LCBpbmRleCkgPT4ge1xuICAgICAgdmFyIGRpcmVjdGl2ZUluc3RhbmNlID0gY29tcGlsZUVsZW1lbnQuZGlyZWN0aXZlSW5zdGFuY2VzW2luZGV4XTtcbiAgICAgIGJpbmREaXJlY3RpdmVBZnRlckNvbnRlbnRMaWZlY3ljbGVDYWxsYmFja3MoZGlyZWN0aXZlQXN0LmRpcmVjdGl2ZSwgZGlyZWN0aXZlSW5zdGFuY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBpbGVFbGVtZW50KTtcbiAgICAgIGJpbmREaXJlY3RpdmVBZnRlclZpZXdMaWZlY3ljbGVDYWxsYmFja3MoZGlyZWN0aXZlQXN0LmRpcmVjdGl2ZSwgZGlyZWN0aXZlSW5zdGFuY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBpbGVFbGVtZW50KTtcbiAgICAgIGJpbmREaXJlY3RpdmVEZXN0cm95TGlmZWN5Y2xlQ2FsbGJhY2tzKGRpcmVjdGl2ZUFzdC5kaXJlY3RpdmUsIGRpcmVjdGl2ZUluc3RhbmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGlsZUVsZW1lbnQpO1xuICAgIH0pO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmlzaXRFbWJlZGRlZFRlbXBsYXRlKGFzdDogRW1iZWRkZWRUZW1wbGF0ZUFzdCwgcGFyZW50OiBDb21waWxlRWxlbWVudCk6IGFueSB7XG4gICAgdmFyIGNvbXBpbGVFbGVtZW50ID0gPENvbXBpbGVFbGVtZW50PnRoaXMudmlldy5ub2Rlc1t0aGlzLl9ub2RlSW5kZXgrK107XG4gICAgdmFyIGV2ZW50TGlzdGVuZXJzID0gY29sbGVjdEV2ZW50TGlzdGVuZXJzKGFzdC5vdXRwdXRzLCBhc3QuZGlyZWN0aXZlcywgY29tcGlsZUVsZW1lbnQpO1xuICAgIExpc3RXcmFwcGVyLmZvckVhY2hXaXRoSW5kZXgoYXN0LmRpcmVjdGl2ZXMsIChkaXJlY3RpdmVBc3QsIGluZGV4KSA9PiB7XG4gICAgICB2YXIgZGlyZWN0aXZlSW5zdGFuY2UgPSBjb21waWxlRWxlbWVudC5kaXJlY3RpdmVJbnN0YW5jZXNbaW5kZXhdO1xuICAgICAgYmluZERpcmVjdGl2ZUlucHV0cyhkaXJlY3RpdmVBc3QsIGRpcmVjdGl2ZUluc3RhbmNlLCBjb21waWxlRWxlbWVudCk7XG4gICAgICBiaW5kRGlyZWN0aXZlRGV0ZWN0Q2hhbmdlc0xpZmVjeWNsZUNhbGxiYWNrcyhkaXJlY3RpdmVBc3QsIGRpcmVjdGl2ZUluc3RhbmNlLCBjb21waWxlRWxlbWVudCk7XG4gICAgICBiaW5kRGlyZWN0aXZlT3V0cHV0cyhkaXJlY3RpdmVBc3QsIGRpcmVjdGl2ZUluc3RhbmNlLCBldmVudExpc3RlbmVycyk7XG4gICAgICBiaW5kRGlyZWN0aXZlQWZ0ZXJDb250ZW50TGlmZWN5Y2xlQ2FsbGJhY2tzKGRpcmVjdGl2ZUFzdC5kaXJlY3RpdmUsIGRpcmVjdGl2ZUluc3RhbmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21waWxlRWxlbWVudCk7XG4gICAgICBiaW5kRGlyZWN0aXZlQWZ0ZXJWaWV3TGlmZWN5Y2xlQ2FsbGJhY2tzKGRpcmVjdGl2ZUFzdC5kaXJlY3RpdmUsIGRpcmVjdGl2ZUluc3RhbmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21waWxlRWxlbWVudCk7XG4gICAgICBiaW5kRGlyZWN0aXZlRGVzdHJveUxpZmVjeWNsZUNhbGxiYWNrcyhkaXJlY3RpdmVBc3QuZGlyZWN0aXZlLCBkaXJlY3RpdmVJbnN0YW5jZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBpbGVFbGVtZW50KTtcbiAgICB9KTtcbiAgICBiaW5kVmlldyhjb21waWxlRWxlbWVudC5lbWJlZGRlZFZpZXcsIGFzdC5jaGlsZHJlbik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2aXNpdEF0dHIoYXN0OiBBdHRyQXN0LCBjdHg6IGFueSk6IGFueSB7IHJldHVybiBudWxsOyB9XG4gIHZpc2l0RGlyZWN0aXZlKGFzdDogRGlyZWN0aXZlQXN0LCBjdHg6IGFueSk6IGFueSB7IHJldHVybiBudWxsOyB9XG4gIHZpc2l0RXZlbnQoYXN0OiBCb3VuZEV2ZW50QXN0LCBldmVudFRhcmdldEFuZE5hbWVzOiBNYXA8c3RyaW5nLCBCb3VuZEV2ZW50QXN0Pik6IGFueSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2aXNpdFJlZmVyZW5jZShhc3Q6IFJlZmVyZW5jZUFzdCwgY3R4OiBhbnkpOiBhbnkgeyByZXR1cm4gbnVsbDsgfVxuICB2aXNpdFZhcmlhYmxlKGFzdDogVmFyaWFibGVBc3QsIGN0eDogYW55KTogYW55IHsgcmV0dXJuIG51bGw7IH1cbiAgdmlzaXREaXJlY3RpdmVQcm9wZXJ0eShhc3Q6IEJvdW5kRGlyZWN0aXZlUHJvcGVydHlBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBudWxsOyB9XG4gIHZpc2l0RWxlbWVudFByb3BlcnR5KGFzdDogQm91bmRFbGVtZW50UHJvcGVydHlBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBudWxsOyB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
