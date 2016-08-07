System.register(['angular2/src/facade/lang', 'angular2/src/core/debug/debug_node'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, debug_node_1;
    var DebugDomRootRenderer, DebugDomRenderer;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (debug_node_1_1) {
                debug_node_1 = debug_node_1_1;
            }],
        execute: function() {
            DebugDomRootRenderer = (function () {
                function DebugDomRootRenderer(_delegate) {
                    this._delegate = _delegate;
                }
                DebugDomRootRenderer.prototype.renderComponent = function (componentProto) {
                    return new DebugDomRenderer(this._delegate.renderComponent(componentProto));
                };
                return DebugDomRootRenderer;
            }());
            exports_1("DebugDomRootRenderer", DebugDomRootRenderer);
            DebugDomRenderer = (function () {
                function DebugDomRenderer(_delegate) {
                    this._delegate = _delegate;
                }
                DebugDomRenderer.prototype.selectRootElement = function (selectorOrNode, debugInfo) {
                    var nativeEl = this._delegate.selectRootElement(selectorOrNode, debugInfo);
                    var debugEl = new debug_node_1.DebugElement(nativeEl, null, debugInfo);
                    debug_node_1.indexDebugNode(debugEl);
                    return nativeEl;
                };
                DebugDomRenderer.prototype.createElement = function (parentElement, name, debugInfo) {
                    var nativeEl = this._delegate.createElement(parentElement, name, debugInfo);
                    var debugEl = new debug_node_1.DebugElement(nativeEl, debug_node_1.getDebugNode(parentElement), debugInfo);
                    debugEl.name = name;
                    debug_node_1.indexDebugNode(debugEl);
                    return nativeEl;
                };
                DebugDomRenderer.prototype.createViewRoot = function (hostElement) { return this._delegate.createViewRoot(hostElement); };
                DebugDomRenderer.prototype.createTemplateAnchor = function (parentElement, debugInfo) {
                    var comment = this._delegate.createTemplateAnchor(parentElement, debugInfo);
                    var debugEl = new debug_node_1.DebugNode(comment, debug_node_1.getDebugNode(parentElement), debugInfo);
                    debug_node_1.indexDebugNode(debugEl);
                    return comment;
                };
                DebugDomRenderer.prototype.createText = function (parentElement, value, debugInfo) {
                    var text = this._delegate.createText(parentElement, value, debugInfo);
                    var debugEl = new debug_node_1.DebugNode(text, debug_node_1.getDebugNode(parentElement), debugInfo);
                    debug_node_1.indexDebugNode(debugEl);
                    return text;
                };
                DebugDomRenderer.prototype.projectNodes = function (parentElement, nodes) {
                    var debugParent = debug_node_1.getDebugNode(parentElement);
                    if (lang_1.isPresent(debugParent) && debugParent instanceof debug_node_1.DebugElement) {
                        var debugElement_1 = debugParent;
                        nodes.forEach(function (node) { debugElement_1.addChild(debug_node_1.getDebugNode(node)); });
                    }
                    this._delegate.projectNodes(parentElement, nodes);
                };
                DebugDomRenderer.prototype.attachViewAfter = function (node, viewRootNodes) {
                    var debugNode = debug_node_1.getDebugNode(node);
                    if (lang_1.isPresent(debugNode)) {
                        var debugParent = debugNode.parent;
                        if (viewRootNodes.length > 0 && lang_1.isPresent(debugParent)) {
                            var debugViewRootNodes = [];
                            viewRootNodes.forEach(function (rootNode) { return debugViewRootNodes.push(debug_node_1.getDebugNode(rootNode)); });
                            debugParent.insertChildrenAfter(debugNode, debugViewRootNodes);
                        }
                    }
                    this._delegate.attachViewAfter(node, viewRootNodes);
                };
                DebugDomRenderer.prototype.detachView = function (viewRootNodes) {
                    viewRootNodes.forEach(function (node) {
                        var debugNode = debug_node_1.getDebugNode(node);
                        if (lang_1.isPresent(debugNode) && lang_1.isPresent(debugNode.parent)) {
                            debugNode.parent.removeChild(debugNode);
                        }
                    });
                    this._delegate.detachView(viewRootNodes);
                };
                DebugDomRenderer.prototype.destroyView = function (hostElement, viewAllNodes) {
                    viewAllNodes.forEach(function (node) { debug_node_1.removeDebugNodeFromIndex(debug_node_1.getDebugNode(node)); });
                    this._delegate.destroyView(hostElement, viewAllNodes);
                };
                DebugDomRenderer.prototype.listen = function (renderElement, name, callback) {
                    var debugEl = debug_node_1.getDebugNode(renderElement);
                    if (lang_1.isPresent(debugEl)) {
                        debugEl.listeners.push(new debug_node_1.EventListener(name, callback));
                    }
                    return this._delegate.listen(renderElement, name, callback);
                };
                DebugDomRenderer.prototype.listenGlobal = function (target, name, callback) {
                    return this._delegate.listenGlobal(target, name, callback);
                };
                DebugDomRenderer.prototype.setElementProperty = function (renderElement, propertyName, propertyValue) {
                    var debugEl = debug_node_1.getDebugNode(renderElement);
                    if (lang_1.isPresent(debugEl) && debugEl instanceof debug_node_1.DebugElement) {
                        debugEl.properties[propertyName] = propertyValue;
                    }
                    this._delegate.setElementProperty(renderElement, propertyName, propertyValue);
                };
                DebugDomRenderer.prototype.setElementAttribute = function (renderElement, attributeName, attributeValue) {
                    var debugEl = debug_node_1.getDebugNode(renderElement);
                    if (lang_1.isPresent(debugEl) && debugEl instanceof debug_node_1.DebugElement) {
                        debugEl.attributes[attributeName] = attributeValue;
                    }
                    this._delegate.setElementAttribute(renderElement, attributeName, attributeValue);
                };
                DebugDomRenderer.prototype.setBindingDebugInfo = function (renderElement, propertyName, propertyValue) {
                    this._delegate.setBindingDebugInfo(renderElement, propertyName, propertyValue);
                };
                DebugDomRenderer.prototype.setElementClass = function (renderElement, className, isAdd) {
                    this._delegate.setElementClass(renderElement, className, isAdd);
                };
                DebugDomRenderer.prototype.setElementStyle = function (renderElement, styleName, styleValue) {
                    this._delegate.setElementStyle(renderElement, styleName, styleValue);
                };
                DebugDomRenderer.prototype.invokeElementMethod = function (renderElement, methodName, args) {
                    this._delegate.invokeElementMethod(renderElement, methodName, args);
                };
                DebugDomRenderer.prototype.setText = function (renderNode, text) { this._delegate.setText(renderNode, text); };
                return DebugDomRenderer;
            }());
            exports_1("DebugDomRenderer", DebugDomRenderer);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2RlYnVnL2RlYnVnX3JlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O1lBZ0JBO2dCQUNFLDhCQUFvQixTQUF1QjtvQkFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztnQkFBRyxDQUFDO2dCQUUvQyw4Q0FBZSxHQUFmLFVBQWdCLGNBQW1DO29CQUNqRCxNQUFNLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUM5RSxDQUFDO2dCQUNILDJCQUFDO1lBQUQsQ0FOQSxBQU1DLElBQUE7WUFORCx1REFNQyxDQUFBO1lBRUQ7Z0JBQ0UsMEJBQW9CLFNBQW1CO29CQUFuQixjQUFTLEdBQVQsU0FBUyxDQUFVO2dCQUFHLENBQUM7Z0JBRTNDLDRDQUFpQixHQUFqQixVQUFrQixjQUE0QixFQUFFLFNBQTBCO29CQUN4RSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLGNBQWMsRUFBRSxTQUFTLENBQUMsQ0FBQztvQkFDM0UsSUFBSSxPQUFPLEdBQUcsSUFBSSx5QkFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQzFELDJCQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3hCLE1BQU0sQ0FBQyxRQUFRLENBQUM7Z0JBQ2xCLENBQUM7Z0JBRUQsd0NBQWEsR0FBYixVQUFjLGFBQWtCLEVBQUUsSUFBWSxFQUFFLFNBQTBCO29CQUN4RSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUM1RSxJQUFJLE9BQU8sR0FBRyxJQUFJLHlCQUFZLENBQUMsUUFBUSxFQUFFLHlCQUFZLENBQUMsYUFBYSxDQUFDLEVBQUUs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QUUsYUFBYSxDQUFDLENBQUM7Z0JBQ2pGLENBQUM7Z0JBRUQsMENBQWUsR0FBZixVQUFnQixhQUFrQixFQUFFLFNBQWlCLEVBQUUsS0FBYztvQkFDbkUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDbEUsQ0FBQztnQkFFRCwwQ0FBZSxHQUFmLFVBQWdCLGFBQWtCLEVBQUUsU0FBaUIsRUFBRSxVQUFrQjtvQkFDdkUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDdkUsQ0FBQztnQkFFRCw4Q0FBbUIsR0FBbkIsVUFBb0IsYUFBa0IsRUFBRSxVQUFrQixFQUFFLElBQVc7b0JBQ3JFLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDdEUsQ0FBQztnQkFFRCxrQ0FBTyxHQUFQLFVBQVEsVUFBZSxFQUFFLElBQVksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0Rix1QkFBQztZQUFELENBcEhBLEFBb0hDLElBQUE7WUFwSEQsK0NBb0hDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvZGVidWcvZGVidWdfcmVuZGVyZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7XG4gIFJlbmRlcmVyLFxuICBSb290UmVuZGVyZXIsXG4gIFJlbmRlckNvbXBvbmVudFR5cGUsXG4gIFJlbmRlckRlYnVnSW5mb1xufSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9yZW5kZXIvYXBpJztcbmltcG9ydCB7XG4gIERlYnVnTm9kZSxcbiAgRGVidWdFbGVtZW50LFxuICBFdmVudExpc3RlbmVyLFxuICBnZXREZWJ1Z05vZGUsXG4gIGluZGV4RGVidWdOb2RlLFxuICByZW1vdmVEZWJ1Z05vZGVGcm9tSW5kZXhcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGVidWcvZGVidWdfbm9kZSc7XG5cbmV4cG9ydCBjbGFzcyBEZWJ1Z0RvbVJvb3RSZW5kZXJlciBpbXBsZW1lbnRzIFJvb3RSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2RlbGVnYXRlOiBSb290UmVuZGVyZXIpIHt9XG5cbiAgcmVuZGVyQ29tcG9uZW50KGNvbXBvbmVudFByb3RvOiBSZW5kZXJDb21wb25lbnRUeXBlKTogUmVuZGVyZXIge1xuICAgIHJldHVybiBuZXcgRGVidWdEb21SZW5kZXJlcih0aGlzLl9kZWxlZ2F0ZS5yZW5kZXJDb21wb25lbnQoY29tcG9uZW50UHJvdG8pKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGVidWdEb21SZW5kZXJlciBpbXBsZW1lbnRzIFJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGVsZWdhdGU6IFJlbmRlcmVyKSB7fVxuXG4gIHNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yT3JOb2RlOiBzdHJpbmcgfCBhbnksIGRlYnVnSW5mbzogUmVuZGVyRGVidWdJbmZvKTogYW55IHtcbiAgICB2YXIgbmF0aXZlRWwgPSB0aGlzLl9kZWxlZ2F0ZS5zZWxlY3RSb290RWxlbWVudChzZWxlY3Rvck9yTm9kZSwgZGVidWdJbmZvKTtcbiAgICB2YXIgZGVidWdFbCA9IG5ldyBEZWJ1Z0VsZW1lbnQobmF0aXZlRWwsIG51bGwsIGRlYnVnSW5mbyk7XG4gICAgaW5kZXhEZWJ1Z05vZGUoZGVidWdFbCk7XG4gICAgcmV0dXJuIG5hdGl2ZUVsO1xuICB9XG5cbiAgY3JlYXRlRWxlbWVudChwYXJlbnRFbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZywgZGVidWdJbmZvOiBSZW5kZXJEZWJ1Z0luZm8pOiBhbnkge1xuICAgIHZhciBuYXRpdmVFbCA9IHRoaXMuX2RlbGVnYXRlLmNyZWF0ZUVsZW1lbnQocGFyZW50RWxlbWVudCwgbmFtZSwgZGVidWdJbmZvKTtcbiAgICB2YXIgZGVidWdFbCA9IG5ldyBEZWJ1Z0VsZW1lbnQobmF0aXZlRWwsIGdldERlYnVnTm9kZShwYXJlbnRFbGVtZW50KSwgZGVidWdJbmZvKTtcbiAgICBkZWJ1Z0VsLm5hbWUgPSBuYW1lO1xuICAgIGluZGV4RGVidWdOb2RlKGRlYnVnRWwpO1xuICAgIHJldHVybiBuYXRpdmVFbDtcbiAgfVxuXG4gIGNyZWF0ZVZpZXdSb290KGhvc3RFbGVtZW50OiBhbnkpOiBhbnkgeyByZXR1cm4gdGhpcy5fZGVsZWdhdGUuY3JlYXRlVmlld1Jvb3QoaG9zdEVsZW1lbnQpOyB9XG5cbiAgY3JlYXRlVGVtcGxhdGVBbmNob3IocGFyZW50RWxlbWVudDogYW55LCBkZWJ1Z0luZm86IFJlbmRlckRlYnVnSW5mbyk6IGFueSB7XG4gICAgdmFyIGNvbW1lbnQgPSB0aGlzLl9kZWxlZ2F0ZS5jcmVhdGVUZW1wbGF0ZUFuY2hvcihwYXJlbnRFbGVtZW50LCBkZWJ1Z0luZm8pO1xuICAgIHZhciBkZWJ1Z0VsID0gbmV3IERlYnVnTm9kZShjb21tZW50LCBnZXREZWJ1Z05vZGUocGFyZW50RWxlbWVudCksIGRlYnVnSW5mbyk7XG4gICAgaW5kZXhEZWJ1Z05vZGUoZGVidWdFbCk7XG4gICAgcmV0dXJuIGNvbW1lbnQ7XG4gIH1cblxuICBjcmVhdGVUZXh0KHBhcmVudEVsZW1lbnQ6IGFueSwgdmFsdWU6IHN0cmluZywgZGVidWdJbmZvOiBSZW5kZXJEZWJ1Z0luZm8pOiBhbnkge1xuICAgIHZhciB0ZXh0ID0gdGhpcy5fZGVsZWdhdGUuY3JlYXRlVGV4dChwYXJlbnRFbGVtZW50LCB2YWx1ZSwgZGVidWdJbmZvKTtcbiAgICB2YXIgZGVidWdFbCA9IG5ldyBEZWJ1Z05vZGUodGV4dCwgZ2V0RGVidWdOb2RlKHBhcmVudEVsZW1lbnQpLCBkZWJ1Z0luZm8pO1xuICAgIGluZGV4RGVidWdOb2RlKGRlYnVnRWwpO1xuICAgIHJldHVybiB0ZXh0O1xuICB9XG5cbiAgcHJvamVjdE5vZGVzKHBhcmVudEVsZW1lbnQ6IGFueSwgbm9kZXM6IGFueVtdKSB7XG4gICAgdmFyIGRlYnVnUGFyZW50ID0gZ2V0RGVidWdOb2RlKHBhcmVudEVsZW1lbnQpO1xuICAgIGlmIChpc1ByZXNlbnQoZGVidWdQYXJlbnQpICYmIGRlYnVnUGFyZW50IGluc3RhbmNlb2YgRGVidWdFbGVtZW50KSB7XG4gICAgICBsZXQgZGVidWdFbGVtZW50ID0gZGVidWdQYXJlbnQ7XG4gICAgICBub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7IGRlYnVnRWxlbWVudC5hZGRDaGlsZChnZXREZWJ1Z05vZGUobm9kZSkpOyB9KTtcbiAgICB9XG4gICAgdGhpcy5fZGVsZWdhdGUucHJvamVjdE5vZGVzKHBhcmVudEVsZW1lbnQsIG5vZGVzKTtcbiAgfVxuXG4gIGF0dGFjaFZpZXdBZnRlcihub2RlOiBhbnksIHZpZXdSb290Tm9kZXM6IGFueVtdKSB7XG4gICAgdmFyIGRlYnVnTm9kZSA9IGdldERlYnVnTm9kZShub2RlKTtcbiAgICBpZiAoaXNQcmVzZW50KGRlYnVnTm9kZSkpIHtcbiAgICAgIHZhciBkZWJ1Z1BhcmVudCA9IGRlYnVnTm9kZS5wYXJlbnQ7XG4gICAgICBpZiAodmlld1Jvb3ROb2Rlcy5sZW5ndGggPiAwICYmIGlzUHJlc2VudChkZWJ1Z1BhcmVudCkpIHtcbiAgICAgICAgdmFyIGRlYnVnVmlld1Jvb3ROb2RlczogRGVidWdOb2RlW10gPSBbXTtcbiAgICAgICAgdmlld1Jvb3ROb2Rlcy5mb3JFYWNoKChyb290Tm9kZSkgPT4gZGVidWdWaWV3Um9vdE5vZGVzLnB1c2goZ2V0RGVidWdOb2RlKHJvb3ROb2RlKSkpO1xuICAgICAgICBkZWJ1Z1BhcmVudC5pbnNlcnRDaGlsZHJlbkFmdGVyKGRlYnVnTm9kZSwgZGVidWdWaWV3Um9vdE5vZGVzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fZGVsZWdhdGUuYXR0YWNoVmlld0FmdGVyKG5vZGUsIHZpZXdSb290Tm9kZXMpO1xuICB9XG5cbiAgZGV0YWNoVmlldyh2aWV3Um9vdE5vZGVzOiBhbnlbXSkge1xuICAgIHZpZXdSb290Tm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgdmFyIGRlYnVnTm9kZSA9IGdldERlYnVnTm9kZShub2RlKTtcbiAgICAgIGlmIChpc1ByZXNlbnQoZGVidWdOb2RlKSAmJiBpc1ByZXNlbnQoZGVidWdOb2RlLnBhcmVudCkpIHtcbiAgICAgICAgZGVidWdOb2RlLnBhcmVudC5yZW1vdmVDaGlsZChkZWJ1Z05vZGUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX2RlbGVnYXRlLmRldGFjaFZpZXcodmlld1Jvb3ROb2Rlcyk7XG4gIH1cblxuICBkZXN0cm95Vmlldyhob3N0RWxlbWVudDogYW55LCB2aWV3QWxsTm9kZXM6IGFueVtdKSB7XG4gICAgdmlld0FsbE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHsgcmVtb3ZlRGVidWdOb2RlRnJvbUluZGV4KGdldERlYnVnTm9kZShub2RlKSk7IH0pO1xuICAgIHRoaXMuX2RlbGVnYXRlLmRlc3Ryb3lWaWV3KGhvc3RFbGVtZW50LCB2aWV3QWxsTm9kZXMpO1xuICB9XG5cbiAgbGlzdGVuKHJlbmRlckVsZW1lbnQ6IGFueSwgbmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgdmFyIGRlYnVnRWwgPSBnZXREZWJ1Z05vZGUocmVuZGVyRWxlbWVudCk7XG4gICAgaWYgKGlzUHJlc2VudChkZWJ1Z0VsKSkge1xuICAgICAgZGVidWdFbC5saXN0ZW5lcnMucHVzaChuZXcgRXZlbnRMaXN0ZW5lcihuYW1lLCBjYWxsYmFjaykpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUubGlzdGVuKHJlbmRlckVsZW1lbnQsIG5hbWUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGxpc3Rlbkdsb2JhbCh0YXJnZXQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLmxpc3Rlbkdsb2JhbCh0YXJnZXQsIG5hbWUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHNldEVsZW1lbnRQcm9wZXJ0eShyZW5kZXJFbGVtZW50OiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nLCBwcm9wZXJ0eVZhbHVlOiBhbnkpIHtcbiAgICB2YXIgZGVidWdFbCA9IGdldERlYnVnTm9kZShyZW5kZXJFbGVtZW50KTtcbiAgICBpZiAoaXNQcmVzZW50KGRlYnVnRWwpICYmIGRlYnVnRWwgaW5zdGFuY2VvZiBEZWJ1Z0VsZW1lbnQpIHtcbiAgICAgIGRlYnVnRWwucHJvcGVydGllc1twcm9wZXJ0eU5hbWVdID0gcHJvcGVydHlWYWx1ZTtcbiAgICB9XG4gICAgdGhpcy5fZGVsZWdhdGUuc2V0RWxlbWVudFByb3BlcnR5KHJlbmRlckVsZW1lbnQsIHByb3BlcnR5TmFtZSwgcHJvcGVydHlWYWx1ZSk7XG4gIH1cblxuICBzZXRFbGVtZW50QXR0cmlidXRlKHJlbmRlckVsZW1lbnQ6IGFueSwgYXR0cmlidXRlTmFtZTogc3RyaW5nLCBhdHRyaWJ1dGVWYWx1ZTogc3RyaW5nKSB7XG4gICAgdmFyIGRlYnVnRWwgPSBnZXREZWJ1Z05vZGUocmVuZGVyRWxlbWVudCk7XG4gICAgaWYgKGlzUHJlc2VudChkZWJ1Z0VsKSAmJiBkZWJ1Z0VsIGluc3RhbmNlb2YgRGVidWdFbGVtZW50KSB7XG4gICAgICBkZWJ1Z0VsLmF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0gPSBhdHRyaWJ1dGVWYWx1ZTtcbiAgICB9XG4gICAgdGhpcy5fZGVsZWdhdGUuc2V0RWxlbWVudEF0dHJpYnV0ZShyZW5kZXJFbGVtZW50LCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVWYWx1ZSk7XG4gIH1cblxuICBzZXRCaW5kaW5nRGVidWdJbmZvKHJlbmRlckVsZW1lbnQ6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcsIHByb3BlcnR5VmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2RlbGVnYXRlLnNldEJpbmRpbmdEZWJ1Z0luZm8ocmVuZGVyRWxlbWVudCwgcHJvcGVydHlOYW1lLCBwcm9wZXJ0eVZhbHVlKTtcbiAgfVxuXG4gIHNldEVsZW1lbnRDbGFzcyhyZW5kZXJFbGVtZW50OiBhbnksIGNsYXNzTmFtZTogc3RyaW5nLCBpc0FkZDogYm9vbGVhbikge1xuICAgIHRoaXMuX2RlbGVnYXRlLnNldEVsZW1lbnRDbGFzcyhyZW5kZXJFbGVtZW50LCBjbGFzc05hbWUsIGlzQWRkKTtcbiAgfVxuXG4gIHNldEVsZW1lbnRTdHlsZShyZW5kZXJFbGVtZW50OiBhbnksIHN0eWxlTmFtZTogc3RyaW5nLCBzdHlsZVZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5zZXRFbGVtZW50U3R5bGUocmVuZGVyRWxlbWVudCwgc3R5bGVOYW1lLCBzdHlsZVZhbHVlKTtcbiAgfVxuXG4gIGludm9rZUVsZW1lbnRNZXRob2QocmVuZGVyRWxlbWVudDogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGFyZ3M6IGFueVtdKSB7XG4gICAgdGhpcy5fZGVsZWdhdGUuaW52b2tlRWxlbWVudE1ldGhvZChyZW5kZXJFbGVtZW50LCBtZXRob2ROYW1lLCBhcmdzKTtcbiAgfVxuXG4gIHNldFRleHQocmVuZGVyTm9kZTogYW55LCB0ZXh0OiBzdHJpbmcpIHsgdGhpcy5fZGVsZWdhdGUuc2V0VGV4dChyZW5kZXJOb2RlLCB0ZXh0KTsgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
