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
                    return new DebugDomRenderer(this, this._delegate.renderComponent(componentProto));
                };
                return DebugDomRootRenderer;
            }());
            exports_1("DebugDomRootRenderer", DebugDomRootRenderer);
            DebugDomRenderer = (function () {
                function DebugDomRenderer(_rootRenderer, _delegate) {
                    this._rootRenderer = _rootRenderer;
                    this._delegate = _delegate;
                }
                DebugDomRenderer.prototype.renderComponent = function (componentType) {
                    return this._rootRenderer.renderComponent(componentType);
                };
                DebugDomRenderer.prototype.selectRootElement = function (selector) {
                    var nativeEl = this._delegate.selectRootElement(selector);
                    var debugEl = new debug_node_1.DebugElement(nativeEl, null);
                    debug_node_1.indexDebugNode(debugEl);
                    return nativeEl;
                };
                DebugDomRenderer.prototype.createElement = function (parentElement, name) {
                    var nativeEl = this._delegate.createElement(parentElement, name);
                    var debugEl = new debug_node_1.DebugElement(nativeEl, debug_node_1.getDebugNode(parentElement));
                    debugEl.name = name;
                    debug_node_1.indexDebugNode(debugEl);
                    return nativeEl;
                };
                DebugDomRenderer.prototype.createViewRoot = function (hostElement) { return this._delegate.createViewRoot(hostElement); };
                DebugDomRenderer.prototype.createTemplateAnchor = function (parentElement) {
                    var comment = this._delegate.createTemplateAnchor(parentElement);
                    var debugEl = new debug_node_1.DebugNode(comment, debug_node_1.getDebugNode(parentElement));
                    debug_node_1.indexDebugNode(debugEl);
                    return comment;
                };
                DebugDomRenderer.prototype.createText = function (parentElement, value) {
                    var text = this._delegate.createText(parentElement, value);
                    var debugEl = new debug_node_1.DebugNode(text, debug_node_1.getDebugNode(parentElement));
                    debug_node_1.indexDebugNode(debugEl);
                    return text;
                };
                DebugDomRenderer.prototype.projectNodes = function (parentElement, nodes) {
                    var debugParent = debug_node_1.getDebugNode(parentElement);
                    if (lang_1.isPresent(debugParent) && debugParent instanceof debug_node_1.DebugElement) {
                        nodes.forEach(function (node) { debugParent.addChild(debug_node_1.getDebugNode(node)); });
                    }
                    return this._delegate.projectNodes(parentElement, nodes);
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
                    return this._delegate.attachViewAfter(node, viewRootNodes);
                };
                DebugDomRenderer.prototype.detachView = function (viewRootNodes) {
                    viewRootNodes.forEach(function (node) {
                        var debugNode = debug_node_1.getDebugNode(node);
                        if (lang_1.isPresent(debugNode) && lang_1.isPresent(debugNode.parent)) {
                            debugNode.parent.removeChild(debugNode);
                        }
                    });
                    return this._delegate.detachView(viewRootNodes);
                };
                DebugDomRenderer.prototype.destroyView = function (hostElement, viewAllNodes) {
                    viewAllNodes.forEach(function (node) { debug_node_1.removeDebugNodeFromIndex(debug_node_1.getDebugNode(node)); });
                    return this._delegate.destroyView(hostElement, viewAllNodes);
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
                        debugEl.properties.set(propertyName, propertyValue);
                    }
                    return this._delegate.setElementProperty(renderElement, propertyName, propertyValue);
                };
                DebugDomRenderer.prototype.setElementAttribute = function (renderElement, attributeName, attributeValue) {
                    var debugEl = debug_node_1.getDebugNode(renderElement);
                    if (lang_1.isPresent(debugEl) && debugEl instanceof debug_node_1.DebugElement) {
                        debugEl.attributes.set(attributeName, attributeValue);
                    }
                    return this._delegate.setElementAttribute(renderElement, attributeName, attributeValue);
                };
                /**
                 * Used only in debug mode to serialize property changes to comment nodes,
                 * such as <template> placeholders.
                 */
                DebugDomRenderer.prototype.setBindingDebugInfo = function (renderElement, propertyName, propertyValue) {
                    return this._delegate.setBindingDebugInfo(renderElement, propertyName, propertyValue);
                };
                /**
                 * Used only in development mode to set information needed by the DebugNode for this element.
                 */
                DebugDomRenderer.prototype.setElementDebugInfo = function (renderElement, info) {
                    var debugEl = debug_node_1.getDebugNode(renderElement);
                    debugEl.setDebugInfo(info);
                    return this._delegate.setElementDebugInfo(renderElement, info);
                };
                DebugDomRenderer.prototype.setElementClass = function (renderElement, className, isAdd) {
                    return this._delegate.setElementClass(renderElement, className, isAdd);
                };
                DebugDomRenderer.prototype.setElementStyle = function (renderElement, styleName, styleValue) {
                    return this._delegate.setElementStyle(renderElement, styleName, styleValue);
                };
                DebugDomRenderer.prototype.invokeElementMethod = function (renderElement, methodName, args) {
                    return this._delegate.invokeElementMethod(renderElement, methodName, args);
                };
                DebugDomRenderer.prototype.setText = function (renderNode, text) { return this._delegate.setText(renderNode, text); };
                return DebugDomRenderer;
            }());
            exports_1("DebugDomRenderer", DebugDomRenderer);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvZGVidWcvZGVidWdfcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7WUFnQkE7Z0JBQ0UsOEJBQW9CLFNBQXVCO29CQUF2QixjQUFTLEdBQVQsU0FBUyxDQUFjO2dCQUFHLENBQUM7Z0JBRS9DLDhDQUFlLEdBQWYsVUFBZ0IsY0FBbUM7b0JBQ2pELE1BQU0sQ0FBQyxJQUFJLGdCQUFnQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUNwRixDQUFDO2dCQUNILDJCQUFDO1lBQUQsQ0FOQSxBQU1DLElBQUE7WUFORCx1REFNQyxDQUFBO1lBRUQ7Z0JBQ0UsMEJBQW9CLGFBQW1DLEVBQVUsU0FBbUI7b0JBQWhFLGtCQUFhLEdBQWIsYUFBYSxDQUFzQjtvQkFBVSxjQUFTLEdBQVQsU0FBUyxDQUFVO2dCQUFHLENBQUM7Z0JBRXhGLDBDQUFlLEdBQWYsVUFBZ0IsYUFBa0M7b0JBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDM0QsQ0FBQztnQkFFRCw0Q0FBaUIsR0FBakIsVUFBa0IsUUFBZ0I7b0JBQ2hDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQzFELElBQUksT0FBTyxHQUFHLElBQUkseUJBQVksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQy9DLDJCQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3hCLE1BQU0sQ0FBQyxRQUFRLENBQUM7Z0JBQ2xCLENBQUM7Z0JBRUQsd0NBQWEsR0FBYixVQUFjLGFBQWtCLEVBQUUsSUFBWTtvQkFDNUMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFh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Q0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0YsdUJBQUM7WUFBRCxDQXBJQSxBQW9JQyxJQUFBO1lBcElELCtDQW9JQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvZGVidWcvZGVidWdfcmVuZGVyZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7XG4gIFJlbmRlcmVyLFxuICBSb290UmVuZGVyZXIsXG4gIFJlbmRlckNvbXBvbmVudFR5cGUsXG4gIFJlbmRlckRlYnVnSW5mb1xufSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9yZW5kZXIvYXBpJztcbmltcG9ydCB7XG4gIERlYnVnTm9kZSxcbiAgRGVidWdFbGVtZW50LFxuICBFdmVudExpc3RlbmVyLFxuICBnZXREZWJ1Z05vZGUsXG4gIGluZGV4RGVidWdOb2RlLFxuICByZW1vdmVEZWJ1Z05vZGVGcm9tSW5kZXhcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGVidWcvZGVidWdfbm9kZSc7XG5cbmV4cG9ydCBjbGFzcyBEZWJ1Z0RvbVJvb3RSZW5kZXJlciBpbXBsZW1lbnRzIFJvb3RSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2RlbGVnYXRlOiBSb290UmVuZGVyZXIpIHt9XG5cbiAgcmVuZGVyQ29tcG9uZW50KGNvbXBvbmVudFByb3RvOiBSZW5kZXJDb21wb25lbnRUeXBlKTogUmVuZGVyZXIge1xuICAgIHJldHVybiBuZXcgRGVidWdEb21SZW5kZXJlcih0aGlzLCB0aGlzLl9kZWxlZ2F0ZS5yZW5kZXJDb21wb25lbnQoY29tcG9uZW50UHJvdG8pKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGVidWdEb21SZW5kZXJlciBpbXBsZW1lbnRzIFJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm9vdFJlbmRlcmVyOiBEZWJ1Z0RvbVJvb3RSZW5kZXJlciwgcHJpdmF0ZSBfZGVsZWdhdGU6IFJlbmRlcmVyKSB7fVxuXG4gIHJlbmRlckNvbXBvbmVudChjb21wb25lbnRUeXBlOiBSZW5kZXJDb21wb25lbnRUeXBlKTogUmVuZGVyZXIge1xuICAgIHJldHVybiB0aGlzLl9yb290UmVuZGVyZXIucmVuZGVyQ29tcG9uZW50KGNvbXBvbmVudFR5cGUpO1xuICB9XG5cbiAgc2VsZWN0Um9vdEVsZW1lbnQoc2VsZWN0b3I6IHN0cmluZyk6IGFueSB7XG4gICAgdmFyIG5hdGl2ZUVsID0gdGhpcy5fZGVsZWdhdGUuc2VsZWN0Um9vdEVsZW1lbnQoc2VsZWN0b3IpO1xuICAgIHZhciBkZWJ1Z0VsID0gbmV3IERlYnVnRWxlbWVudChuYXRpdmVFbCwgbnVsbCk7XG4gICAgaW5kZXhEZWJ1Z05vZGUoZGVidWdFbCk7XG4gICAgcmV0dXJuIG5hdGl2ZUVsO1xuICB9XG5cbiAgY3JlYXRlRWxlbWVudChwYXJlbnRFbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgdmFyIG5hdGl2ZUVsID0gdGhpcy5fZGVsZWdhdGUuY3JlYXRlRWxlbWVudChwYXJlbnRFbGVtZW50LCBuYW1lKTtcbiAgICB2YXIgZGVidWdFbCA9IG5ldyBEZWJ1Z0VsZW1lbnQobmF0aXZlRWwsIGdldERlYnVnTm9kZShwYXJlbnRFbGVtZW50KSk7XG4gICAgZGVidWdFbC5uYW1lID0gbmFtZTtcbiAgICBpbmRleERlYnVnTm9kZShkZWJ1Z0VsKTtcbiAgICByZXR1cm4gbmF0aXZlRWw7XG4gIH1cblxuICBjcmVhdGVWaWV3Um9vdChob3N0RWxlbWVudDogYW55KTogYW55IHsgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLmNyZWF0ZVZpZXdSb290KGhvc3RFbGVtZW50KTsgfVxuXG4gIGNyZWF0ZVRlbXBsYXRlQW5jaG9yKHBhcmVudEVsZW1lbnQ6IGFueSk6IGFueSB7XG4gICAgdmFyIGNvbW1lbnQgPSB0aGlzLl9kZWxlZ2F0ZS5jcmVhdGVUZW1wbGF0ZUFuY2hvcihwYXJlbnRFbGVtZW50KTtcbiAgICB2YXIgZGVidWdFbCA9IG5ldyBEZWJ1Z05vZGUoY29tbWVudCwgZ2V0RGVidWdOb2RlKHBhcmVudEVsZW1lbnQpKTtcbiAgICBpbmRleERlYnVnTm9kZShkZWJ1Z0VsKTtcbiAgICByZXR1cm4gY29tbWVudDtcbiAgfVxuXG4gIGNyZWF0ZVRleHQocGFyZW50RWxlbWVudDogYW55LCB2YWx1ZTogc3RyaW5nKTogYW55IHtcbiAgICB2YXIgdGV4dCA9IHRoaXMuX2RlbGVnYXRlLmNyZWF0ZVRleHQocGFyZW50RWxlbWVudCwgdmFsdWUpO1xuICAgIHZhciBkZWJ1Z0VsID0gbmV3IERlYnVnTm9kZSh0ZXh0LCBnZXREZWJ1Z05vZGUocGFyZW50RWxlbWVudCkpO1xuICAgIGluZGV4RGVidWdOb2RlKGRlYnVnRWwpO1xuICAgIHJldHVybiB0ZXh0O1xuICB9XG5cbiAgcHJvamVjdE5vZGVzKHBhcmVudEVsZW1lbnQ6IGFueSwgbm9kZXM6IGFueVtdKSB7XG4gICAgdmFyIGRlYnVnUGFyZW50ID0gZ2V0RGVidWdOb2RlKHBhcmVudEVsZW1lbnQpO1xuICAgIGlmIChpc1ByZXNlbnQoZGVidWdQYXJlbnQpICYmIGRlYnVnUGFyZW50IGluc3RhbmNlb2YgRGVidWdFbGVtZW50KSB7XG4gICAgICBub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7IGRlYnVnUGFyZW50LmFkZENoaWxkKGdldERlYnVnTm9kZShub2RlKSk7IH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUucHJvamVjdE5vZGVzKHBhcmVudEVsZW1lbnQsIG5vZGVzKTtcbiAgfVxuXG4gIGF0dGFjaFZpZXdBZnRlcihub2RlOiBhbnksIHZpZXdSb290Tm9kZXM6IGFueVtdKSB7XG4gICAgdmFyIGRlYnVnTm9kZSA9IGdldERlYnVnTm9kZShub2RlKTtcbiAgICBpZiAoaXNQcmVzZW50KGRlYnVnTm9kZSkpIHtcbiAgICAgIHZhciBkZWJ1Z1BhcmVudCA9IGRlYnVnTm9kZS5wYXJlbnQ7XG4gICAgICBpZiAodmlld1Jvb3ROb2Rlcy5sZW5ndGggPiAwICYmIGlzUHJlc2VudChkZWJ1Z1BhcmVudCkpIHtcbiAgICAgICAgdmFyIGRlYnVnVmlld1Jvb3ROb2RlczogRGVidWdOb2RlW10gPSBbXTtcbiAgICAgICAgdmlld1Jvb3ROb2Rlcy5mb3JFYWNoKChyb290Tm9kZSkgPT4gZGVidWdWaWV3Um9vdE5vZGVzLnB1c2goZ2V0RGVidWdOb2RlKHJvb3ROb2RlKSkpO1xuICAgICAgICBkZWJ1Z1BhcmVudC5pbnNlcnRDaGlsZHJlbkFmdGVyKGRlYnVnTm9kZSwgZGVidWdWaWV3Um9vdE5vZGVzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLmF0dGFjaFZpZXdBZnRlcihub2RlLCB2aWV3Um9vdE5vZGVzKTtcbiAgfVxuXG4gIGRldGFjaFZpZXcodmlld1Jvb3ROb2RlczogYW55W10pIHtcbiAgICB2aWV3Um9vdE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIHZhciBkZWJ1Z05vZGUgPSBnZXREZWJ1Z05vZGUobm9kZSk7XG4gICAgICBpZiAoaXNQcmVzZW50KGRlYnVnTm9kZSkgJiYgaXNQcmVzZW50KGRlYnVnTm9kZS5wYXJlbnQpKSB7XG4gICAgICAgIGRlYnVnTm9kZS5wYXJlbnQucmVtb3ZlQ2hpbGQoZGVidWdOb2RlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuZGV0YWNoVmlldyh2aWV3Um9vdE5vZGVzKTtcbiAgfVxuXG4gIGRlc3Ryb3lWaWV3KGhvc3RFbGVtZW50OiBhbnksIHZpZXdBbGxOb2RlczogYW55W10pIHtcbiAgICB2aWV3QWxsTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4geyByZW1vdmVEZWJ1Z05vZGVGcm9tSW5kZXgoZ2V0RGVidWdOb2RlKG5vZGUpKTsgfSk7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLmRlc3Ryb3lWaWV3KGhvc3RFbGVtZW50LCB2aWV3QWxsTm9kZXMpO1xuICB9XG5cbiAgbGlzdGVuKHJlbmRlckVsZW1lbnQ6IGFueSwgbmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICB2YXIgZGVidWdFbCA9IGdldERlYnVnTm9kZShyZW5kZXJFbGVtZW50KTtcbiAgICBpZiAoaXNQcmVzZW50KGRlYnVnRWwpKSB7XG4gICAgICBkZWJ1Z0VsLmxpc3RlbmVycy5wdXNoKG5ldyBFdmVudExpc3RlbmVyKG5hbWUsIGNhbGxiYWNrKSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5saXN0ZW4ocmVuZGVyRWxlbWVudCwgbmFtZSwgY2FsbGJhY2spO1xuICB9XG5cbiAgbGlzdGVuR2xvYmFsKHRhcmdldDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUubGlzdGVuR2xvYmFsKHRhcmdldCwgbmFtZSwgY2FsbGJhY2spO1xuICB9XG5cbiAgc2V0RWxlbWVudFByb3BlcnR5KHJlbmRlckVsZW1lbnQ6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcsIHByb3BlcnR5VmFsdWU6IGFueSkge1xuICAgIHZhciBkZWJ1Z0VsID0gZ2V0RGVidWdOb2RlKHJlbmRlckVsZW1lbnQpO1xuICAgIGlmIChpc1ByZXNlbnQoZGVidWdFbCkgJiYgZGVidWdFbCBpbnN0YW5jZW9mIERlYnVnRWxlbWVudCkge1xuICAgICAgZGVidWdFbC5wcm9wZXJ0aWVzLnNldChwcm9wZXJ0eU5hbWUsIHByb3BlcnR5VmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuc2V0RWxlbWVudFByb3BlcnR5KHJlbmRlckVsZW1lbnQsIHByb3BlcnR5TmFtZSwgcHJvcGVydHlWYWx1ZSk7XG4gIH1cblxuICBzZXRFbGVtZW50QXR0cmlidXRlKHJlbmRlckVsZW1lbnQ6IGFueSwgYXR0cmlidXRlTmFtZTogc3RyaW5nLCBhdHRyaWJ1dGVWYWx1ZTogc3RyaW5nKSB7XG4gICAgdmFyIGRlYnVnRWwgPSBnZXREZWJ1Z05vZGUocmVuZGVyRWxlbWVudCk7XG4gICAgaWYgKGlzUHJlc2VudChkZWJ1Z0VsKSAmJiBkZWJ1Z0VsIGluc3RhbmNlb2YgRGVidWdFbGVtZW50KSB7XG4gICAgICBkZWJ1Z0VsLmF0dHJpYnV0ZXMuc2V0KGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZVZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLnNldEVsZW1lbnRBdHRyaWJ1dGUocmVuZGVyRWxlbWVudCwgYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgb25seSBpbiBkZWJ1ZyBtb2RlIHRvIHNlcmlhbGl6ZSBwcm9wZXJ0eSBjaGFuZ2VzIHRvIGNvbW1lbnQgbm9kZXMsXG4gICAqIHN1Y2ggYXMgPHRlbXBsYXRlPiBwbGFjZWhvbGRlcnMuXG4gICAqL1xuICBzZXRCaW5kaW5nRGVidWdJbmZvKHJlbmRlckVsZW1lbnQ6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcsIHByb3BlcnR5VmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5zZXRCaW5kaW5nRGVidWdJbmZvKHJlbmRlckVsZW1lbnQsIHByb3BlcnR5TmFtZSwgcHJvcGVydHlWYWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCBvbmx5IGluIGRldmVsb3BtZW50IG1vZGUgdG8gc2V0IGluZm9ybWF0aW9uIG5lZWRlZCBieSB0aGUgRGVidWdOb2RlIGZvciB0aGlzIGVsZW1lbnQuXG4gICAqL1xuICBzZXRFbGVtZW50RGVidWdJbmZvKHJlbmRlckVsZW1lbnQ6IGFueSwgaW5mbzogUmVuZGVyRGVidWdJbmZvKSB7XG4gICAgdmFyIGRlYnVnRWwgPSBnZXREZWJ1Z05vZGUocmVuZGVyRWxlbWVudCk7XG4gICAgZGVidWdFbC5zZXREZWJ1Z0luZm8oaW5mbyk7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLnNldEVsZW1lbnREZWJ1Z0luZm8ocmVuZGVyRWxlbWVudCwgaW5mbyk7XG4gIH1cblxuICBzZXRFbGVtZW50Q2xhc3MocmVuZGVyRWxlbWVudDogYW55LCBjbGFzc05hbWU6IHN0cmluZywgaXNBZGQ6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuc2V0RWxlbWVudENsYXNzKHJlbmRlckVsZW1lbnQsIGNsYXNzTmFtZSwgaXNBZGQpO1xuICB9XG5cbiAgc2V0RWxlbWVudFN0eWxlKHJlbmRlckVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcsIHN0eWxlVmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5zZXRFbGVtZW50U3R5bGUocmVuZGVyRWxlbWVudCwgc3R5bGVOYW1lLCBzdHlsZVZhbHVlKTtcbiAgfVxuXG4gIGludm9rZUVsZW1lbnRNZXRob2QocmVuZGVyRWxlbWVudDogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGFyZ3M6IGFueVtdKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLmludm9rZUVsZW1lbnRNZXRob2QocmVuZGVyRWxlbWVudCwgbWV0aG9kTmFtZSwgYXJncyk7XG4gIH1cblxuICBzZXRUZXh0KHJlbmRlck5vZGU6IGFueSwgdGV4dDogc3RyaW5nKSB7IHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5zZXRUZXh0KHJlbmRlck5vZGUsIHRleHQpOyB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
