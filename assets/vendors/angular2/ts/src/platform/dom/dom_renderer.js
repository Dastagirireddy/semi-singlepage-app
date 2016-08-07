System.register(['angular2/src/core/di', 'angular2/src/animate/animation_builder', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions', './shared_styles_host', './events/event_manager', './dom_tokens', 'angular2/src/core/metadata', 'angular2/src/platform/dom/dom_adapter', './util'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var di_1, animation_builder_1, lang_1, exceptions_1, shared_styles_host_1, event_manager_1, dom_tokens_1, metadata_1, dom_adapter_1, util_1;
    var NAMESPACE_URIS, TEMPLATE_COMMENT_TEXT, TEMPLATE_BINDINGS_EXP, DomRootRenderer, DomRootRenderer_, DomRenderer, COMPONENT_REGEX, COMPONENT_VARIABLE, HOST_ATTR, CONTENT_ATTR, NS_PREFIX_RE;
    function moveNodesAfterSibling(sibling, nodes) {
        var parent = dom_adapter_1.DOM.parentElement(sibling);
        if (nodes.length > 0 && lang_1.isPresent(parent)) {
            var nextSibling = dom_adapter_1.DOM.nextSibling(sibling);
            if (lang_1.isPresent(nextSibling)) {
                for (var i = 0; i < nodes.length; i++) {
                    dom_adapter_1.DOM.insertBefore(nextSibling, nodes[i]);
                }
            }
            else {
                for (var i = 0; i < nodes.length; i++) {
                    dom_adapter_1.DOM.appendChild(parent, nodes[i]);
                }
            }
        }
    }
    function appendNodes(parent, nodes) {
        for (var i = 0; i < nodes.length; i++) {
            dom_adapter_1.DOM.appendChild(parent, nodes[i]);
        }
    }
    function decoratePreventDefault(eventHandler) {
        return function (event) {
            var allowDefaultBehavior = eventHandler(event);
            if (allowDefaultBehavior === false) {
                // TODO(tbosch): move preventDefault into event plugins...
                dom_adapter_1.DOM.preventDefault(event);
            }
        };
    }
    function _shimContentAttribute(componentShortId) {
        return lang_1.StringWrapper.replaceAll(CONTENT_ATTR, COMPONENT_REGEX, componentShortId);
    }
    function _shimHostAttribute(componentShortId) {
        return lang_1.StringWrapper.replaceAll(HOST_ATTR, COMPONENT_REGEX, componentShortId);
    }
    function _flattenStyles(compId, styles, target) {
        for (var i = 0; i < styles.length; i++) {
            var style = styles[i];
            if (lang_1.isArray(style)) {
                _flattenStyles(compId, style, target);
            }
            else {
                style = lang_1.StringWrapper.replaceAll(style, COMPONENT_REGEX, compId);
                target.push(style);
            }
        }
        return target;
    }
    function splitNamespace(name) {
        if (name[0] != '@') {
            return [null, name];
        }
        var match = lang_1.RegExpWrapper.firstMatch(NS_PREFIX_RE, name);
        return [match[1], match[2]];
    }
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (animation_builder_1_1) {
                animation_builder_1 = animation_builder_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (shared_styles_host_1_1) {
                shared_styles_host_1 = shared_styles_host_1_1;
            },
            function (event_manager_1_1) {
                event_manager_1 = event_manager_1_1;
            },
            function (dom_tokens_1_1) {
                dom_tokens_1 = dom_tokens_1_1;
            },
            function (metadata_1_1) {
                metadata_1 = metadata_1_1;
            },
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            }],
        execute: function() {
            NAMESPACE_URIS = lang_1.CONST_EXPR({ 'xlink': 'http://www.w3.org/1999/xlink', 'svg': 'http://www.w3.org/2000/svg' });
            TEMPLATE_COMMENT_TEXT = 'template bindings={}';
            TEMPLATE_BINDINGS_EXP = /^template bindings=(.*)$/g;
            DomRootRenderer = (function () {
                function DomRootRenderer(document, eventManager, sharedStylesHost, animate) {
                    this.document = document;
                    this.eventManager = eventManager;
                    this.sharedStylesHost = sharedStylesHost;
                    this.animate = animate;
                    this._registeredComponents = new Map();
                }
                DomRootRenderer.prototype.renderComponent = function (componentProto) {
                    var renderer = this._registeredComponents.get(componentProto.id);
                    if (lang_1.isBlank(renderer)) {
                        renderer = new DomRenderer(this, componentProto);
                        this._registeredComponents.set(componentProto.id, renderer);
                    }
                    return renderer;
                };
                return DomRootRenderer;
            }());
            exports_1("DomRootRenderer", DomRootRenderer);
            DomRootRenderer_ = (function (_super) {
                __extends(DomRootRenderer_, _super);
                function DomRootRenderer_(_document, _eventManager, sharedStylesHost, animate) {
                    _super.call(this, _document, _eventManager, sharedStylesHost, animate);
                }
                DomRootRenderer_ = __decorate([
                    di_1.Injectable(),
                    __param(0, di_1.Inject(dom_tokens_1.DOCUMENT)), 
                    __metadata('design:paramtypes', [Object, event_manager_1.EventManager, shared_styles_host_1.DomSharedStylesHost, animation_builder_1.AnimationBuilder])
                ], DomRootRenderer_);
                return DomRootRenderer_;
            }(DomRootRenderer));
            exports_1("DomRootRenderer_", DomRootRenderer_);
            DomRenderer = (function () {
                function DomRenderer(_rootRenderer, componentProto) {
                    this._rootRenderer = _rootRenderer;
                    this.componentProto = componentProto;
                    this._styles = _flattenStyles(componentProto.id, componentProto.styles, []);
                    if (componentProto.encapsulation !== metadata_1.ViewEncapsulation.Native) {
                        this._rootRenderer.sharedStylesHost.addStyles(this._styles);
                    }
                    if (this.componentProto.encapsulation === metadata_1.ViewEncapsulation.Emulated) {
                        this._contentAttr = _shimContentAttribute(componentProto.id);
                        this._hostAttr = _shimHostAttribute(componentProto.id);
                    }
                    else {
                        this._contentAttr = null;
                        this._hostAttr = null;
                    }
                }
                DomRenderer.prototype.selectRootElement = function (selectorOrNode, debugInfo) {
                    var el;
                    if (lang_1.isString(selectorOrNode)) {
                        el = dom_adapter_1.DOM.querySelector(this._rootRenderer.document, selectorOrNode);
                        if (lang_1.isBlank(el)) {
                            throw new exceptions_1.BaseException("The selector \"" + selectorOrNode + "\" did not match any elements");
                        }
                    }
                    else {
                        el = selectorOrNode;
                    }
                    dom_adapter_1.DOM.clearNodes(el);
                    return el;
                };
                DomRenderer.prototype.createElement = function (parent, name, debugInfo) {
                    var nsAndName = splitNamespace(name);
                    var el = lang_1.isPresent(nsAndName[0]) ?
                        dom_adapter_1.DOM.createElementNS(NAMESPACE_URIS[nsAndName[0]], nsAndName[1]) :
                        dom_adapter_1.DOM.createElement(nsAndName[1]);
                    if (lang_1.isPresent(this._contentAttr)) {
                        dom_adapter_1.DOM.setAttribute(el, this._contentAttr, '');
                    }
                    if (lang_1.isPresent(parent)) {
                        dom_adapter_1.DOM.appendChild(parent, el);
                    }
                    return el;
                };
                DomRenderer.prototype.createViewRoot = function (hostElement) {
                    var nodesParent;
                    if (this.componentProto.encapsulation === metadata_1.ViewEncapsulation.Native) {
                        nodesParent = dom_adapter_1.DOM.createShadowRoot(hostElement);
                        this._rootRenderer.sharedStylesHost.addHost(nodesParent);
                        for (var i = 0; i < this._styles.length; i++) {
                            dom_adapter_1.DOM.appendChild(nodesParent, dom_adapter_1.DOM.createStyleElement(this._styles[i]));
                        }
                    }
                    else {
                        if (lang_1.isPresent(this._hostAttr)) {
                            dom_adapter_1.DOM.setAttribute(hostElement, this._hostAttr, '');
                        }
                        nodesParent = hostElement;
                    }
                    return nodesParent;
                };
                DomRenderer.prototype.createTemplateAnchor = function (parentElement, debugInfo) {
                    var comment = dom_adapter_1.DOM.createComment(TEMPLATE_COMMENT_TEXT);
                    if (lang_1.isPresent(parentElement)) {
                        dom_adapter_1.DOM.appendChild(parentElement, comment);
                    }
                    return comment;
                };
                DomRenderer.prototype.createText = function (parentElement, value, debugInfo) {
                    var node = dom_adapter_1.DOM.createTextNode(value);
                    if (lang_1.isPresent(parentElement)) {
                        dom_adapter_1.DOM.appendChild(parentElement, node);
                    }
                    return node;
                };
                DomRenderer.prototype.projectNodes = function (parentElement, nodes) {
                    if (lang_1.isBlank(parentElement))
                        return;
                    appendNodes(parentElement, nodes);
                };
                DomRenderer.prototype.attachViewAfter = function (node, viewRootNodes) {
                    moveNodesAfterSibling(node, viewRootNodes);
                    for (var i = 0; i < viewRootNodes.length; i++)
                        this.animateNodeEnter(viewRootNodes[i]);
                };
                DomRenderer.prototype.detachView = function (viewRootNodes) {
                    for (var i = 0; i < viewRootNodes.length; i++) {
                        var node = viewRootNodes[i];
                        dom_adapter_1.DOM.remove(node);
                        this.animateNodeLeave(node);
                    }
                };
                DomRenderer.prototype.destroyView = function (hostElement, viewAllNodes) {
                    if (this.componentProto.encapsulation === metadata_1.ViewEncapsulation.Native && lang_1.isPresent(hostElement)) {
                        this._rootRenderer.sharedStylesHost.removeHost(dom_adapter_1.DOM.getShadowRoot(hostElement));
                    }
                };
                DomRenderer.prototype.listen = function (renderElement, name, callback) {
                    return this._rootRenderer.eventManager.addEventListener(renderElement, name, decoratePreventDefault(callback));
                };
                DomRenderer.prototype.listenGlobal = function (target, name, callback) {
                    return this._rootRenderer.eventManager.addGlobalEventListener(target, name, decoratePreventDefault(callback));
                };
                DomRenderer.prototype.setElementProperty = function (renderElement, propertyName, propertyValue) {
                    dom_adapter_1.DOM.setProperty(renderElement, propertyName, propertyValue);
                };
                DomRenderer.prototype.setElementAttribute = function (renderElement, attributeName, attributeValue) {
                    var attrNs;
                    var nsAndName = splitNamespace(attributeName);
                    if (lang_1.isPresent(nsAndName[0])) {
                        attributeName = nsAndName[0] + ':' + nsAndName[1];
                        attrNs = NAMESPACE_URIS[nsAndName[0]];
                    }
                    if (lang_1.isPresent(attributeValue)) {
                        if (lang_1.isPresent(attrNs)) {
                            dom_adapter_1.DOM.setAttributeNS(renderElement, attrNs, attributeName, attributeValue);
                        }
                        else {
                            dom_adapter_1.DOM.setAttribute(renderElement, attributeName, attributeValue);
                        }
                    }
                    else {
                        if (lang_1.isPresent(attrNs)) {
                            dom_adapter_1.DOM.removeAttributeNS(renderElement, attrNs, nsAndName[1]);
                        }
                        else {
                            dom_adapter_1.DOM.removeAttribute(renderElement, attributeName);
                        }
                    }
                };
                DomRenderer.prototype.setBindingDebugInfo = function (renderElement, propertyName, propertyValue) {
                    var dashCasedPropertyName = util_1.camelCaseToDashCase(propertyName);
                    if (dom_adapter_1.DOM.isCommentNode(renderElement)) {
                        var existingBindings = lang_1.RegExpWrapper.firstMatch(TEMPLATE_BINDINGS_EXP, lang_1.StringWrapper.replaceAll(dom_adapter_1.DOM.getText(renderElement), /\n/g, ''));
                        var parsedBindings = lang_1.Json.parse(existingBindings[1]);
                        parsedBindings[dashCasedPropertyName] = propertyValue;
                        dom_adapter_1.DOM.setText(renderElement, lang_1.StringWrapper.replace(TEMPLATE_COMMENT_TEXT, '{}', lang_1.Json.stringify(parsedBindings)));
                    }
                    else {
                        this.setElementAttribute(renderElement, propertyName, propertyValue);
                    }
                };
                DomRenderer.prototype.setElementClass = function (renderElement, className, isAdd) {
                    if (isAdd) {
                        dom_adapter_1.DOM.addClass(renderElement, className);
                    }
                    else {
                        dom_adapter_1.DOM.removeClass(renderElement, className);
                    }
                };
                DomRenderer.prototype.setElementStyle = function (renderElement, styleName, styleValue) {
                    if (lang_1.isPresent(styleValue)) {
                        dom_adapter_1.DOM.setStyle(renderElement, styleName, lang_1.stringify(styleValue));
                    }
                    else {
                        dom_adapter_1.DOM.removeStyle(renderElement, styleName);
                    }
                };
                DomRenderer.prototype.invokeElementMethod = function (renderElement, methodName, args) {
                    dom_adapter_1.DOM.invoke(renderElement, methodName, args);
                };
                DomRenderer.prototype.setText = function (renderNode, text) { dom_adapter_1.DOM.setText(renderNode, text); };
                /**
                 * Performs animations if necessary
                 * @param node
                 */
                DomRenderer.prototype.animateNodeEnter = function (node) {
                    if (dom_adapter_1.DOM.isElementNode(node) && dom_adapter_1.DOM.hasClass(node, 'ng-animate')) {
                        dom_adapter_1.DOM.addClass(node, 'ng-enter');
                        this._rootRenderer.animate.css()
                            .addAnimationClass('ng-enter-active')
                            .start(node)
                            .onComplete(function () { dom_adapter_1.DOM.removeClass(node, 'ng-enter'); });
                    }
                };
                /**
                 * If animations are necessary, performs animations then removes the element; otherwise, it just
                 * removes the element.
                 * @param node
                 */
                DomRenderer.prototype.animateNodeLeave = function (node) {
                    if (dom_adapter_1.DOM.isElementNode(node) && dom_adapter_1.DOM.hasClass(node, 'ng-animate')) {
                        dom_adapter_1.DOM.addClass(node, 'ng-leave');
                        this._rootRenderer.animate.css()
                            .addAnimationClass('ng-leave-active')
                            .start(node)
                            .onComplete(function () {
                            dom_adapter_1.DOM.removeClass(node, 'ng-leave');
                            dom_adapter_1.DOM.remove(node);
                        });
                    }
                    else {
                        dom_adapter_1.DOM.remove(node);
                    }
                };
                return DomRenderer;
            }());
            exports_1("DomRenderer", DomRenderer);
            COMPONENT_REGEX = /%COMP%/g;
            exports_1("COMPONENT_VARIABLE", COMPONENT_VARIABLE = '%COMP%');
            exports_1("HOST_ATTR", HOST_ATTR = "_nghost-" + COMPONENT_VARIABLE);
            exports_1("CONTENT_ATTR", CONTENT_ATTR = "_ngcontent-" + COMPONENT_VARIABLE);
            NS_PREFIX_RE = /^@([^:]+):(.+)/g;
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9kb20vZG9tX3JlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQStCTSxjQUFjLEVBRWQscUJBQXFCLEVBQ3ZCLHFCQUFxQixrREE4UXJCLGVBQWUsRUFDTixrQkFBa0IsRUFDbEIsU0FBUyxFQUNULFlBQVksRUF1QnJCLFlBQVk7SUExRGhCLCtCQUErQixPQUFPLEVBQUUsS0FBSztRQUMzQyxJQUFJLE1BQU0sR0FBRyxpQkFBRyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxnQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQyxJQUFJLFdBQVcsR0FBRyxpQkFBRyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQyxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBQ3RDLGlCQUFHLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUMsQ0FBQztZQUNILENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDdEMsaUJBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxDQUFDO1lBQ0gs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QUMsUUFBUSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2hFLGlCQUFHLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQzt3QkFDL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFOzZCQUMzQixpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQzs2QkFDcEMsS0FBSyxDQUFjLElBQUksQ0FBQzs2QkFDeEIsVUFBVSxDQUFDOzRCQUNWLGlCQUFHLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQzs0QkFDbEMsaUJBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ25CLENBQUMsQ0FBQyxDQUFDO29CQUNULENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04saUJBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ25CLENBQUM7Z0JBQ0gsQ0FBQztnQkFDSCxrQkFBQztZQUFELENBbE5BLEFBa05DLElBQUE7WUFsTkQscUNBa05DLENBQUE7WUFrQ0csZUFBZSxHQUFHLFNBQVMsQ0FBQztZQUNuQixnQ0FBQSxrQkFBa0IsR0FBRyxRQUFRLENBQUEsQ0FBQztZQUM5Qix1QkFBQSxTQUFTLEdBQUcsYUFBVyxrQkFBb0IsQ0FBQSxDQUFDO1lBQzVDLDBCQUFBLFlBQVksR0FBRyxnQkFBYyxrQkFBb0IsQ0FBQSxDQUFDO1lBdUIzRCxZQUFZLEdBQUcsaUJBQWlCLENBQUMiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL2RvbS9kb21fcmVuZGVyZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgT3BhcXVlVG9rZW59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7QW5pbWF0aW9uQnVpbGRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2FuaW1hdGUvYW5pbWF0aW9uX2J1aWxkZXInO1xuaW1wb3J0IHtcbiAgaXNQcmVzZW50LFxuICBpc0JsYW5rLFxuICBKc29uLFxuICBSZWdFeHBXcmFwcGVyLFxuICBDT05TVF9FWFBSLFxuICBzdHJpbmdpZnksXG4gIFN0cmluZ1dyYXBwZXIsXG4gIGlzQXJyYXksXG4gIGlzU3RyaW5nXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbmltcG9ydCB7QmFzZUV4Y2VwdGlvbiwgV3JhcHBlZEV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7RG9tU2hhcmVkU3R5bGVzSG9zdH0gZnJvbSAnLi9zaGFyZWRfc3R5bGVzX2hvc3QnO1xuXG5pbXBvcnQge1xuICBSZW5kZXJlcixcbiAgUm9vdFJlbmRlcmVyLFxuICBSZW5kZXJDb21wb25lbnRUeXBlLFxuICBSZW5kZXJEZWJ1Z0luZm9cbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVuZGVyL2FwaSc7XG5cbmltcG9ydCB7RXZlbnRNYW5hZ2VyfSBmcm9tICcuL2V2ZW50cy9ldmVudF9tYW5hZ2VyJztcblxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnLi9kb21fdG9rZW5zJztcbmltcG9ydCB7Vmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL21ldGFkYXRhJztcbmltcG9ydCB7RE9NfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9hZGFwdGVyJztcbmltcG9ydCB7Y2FtZWxDYXNlVG9EYXNoQ2FzZX0gZnJvbSAnLi91dGlsJztcblxuY29uc3QgTkFNRVNQQUNFX1VSSVMgPVxuICAgIENPTlNUX0VYUFIoeyd4bGluayc6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJywgJ3N2Zyc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyd9KTtcbmNvbnN0IFRFTVBMQVRFX0NPTU1FTlRfVEVYVCA9ICd0ZW1wbGF0ZSBiaW5kaW5ncz17fSc7XG52YXIgVEVNUExBVEVfQklORElOR1NfRVhQID0gL150ZW1wbGF0ZSBiaW5kaW5ncz0oLiopJC9nO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRG9tUm9vdFJlbmRlcmVyIGltcGxlbWVudHMgUm9vdFJlbmRlcmVyIHtcbiAgcHJpdmF0ZSBfcmVnaXN0ZXJlZENvbXBvbmVudHM6IE1hcDxzdHJpbmcsIERvbVJlbmRlcmVyPiA9IG5ldyBNYXA8c3RyaW5nLCBEb21SZW5kZXJlcj4oKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZG9jdW1lbnQ6IGFueSwgcHVibGljIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyLFxuICAgICAgICAgICAgICBwdWJsaWMgc2hhcmVkU3R5bGVzSG9zdDogRG9tU2hhcmVkU3R5bGVzSG9zdCwgcHVibGljIGFuaW1hdGU6IEFuaW1hdGlvbkJ1aWxkZXIpIHt9XG5cbiAgcmVuZGVyQ29tcG9uZW50KGNvbXBvbmVudFByb3RvOiBSZW5kZXJDb21wb25lbnRUeXBlKTogUmVuZGVyZXIge1xuICAgIHZhciByZW5kZXJlciA9IHRoaXMuX3JlZ2lzdGVyZWRDb21wb25lbnRzLmdldChjb21wb25lbnRQcm90by5pZCk7XG4gICAgaWYgKGlzQmxhbmsocmVuZGVyZXIpKSB7XG4gICAgICByZW5kZXJlciA9IG5ldyBEb21SZW5kZXJlcih0aGlzLCBjb21wb25lbnRQcm90byk7XG4gICAgICB0aGlzLl9yZWdpc3RlcmVkQ29tcG9uZW50cy5zZXQoY29tcG9uZW50UHJvdG8uaWQsIHJlbmRlcmVyKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlbmRlcmVyO1xuICB9XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEb21Sb290UmVuZGVyZXJfIGV4dGVuZHMgRG9tUm9vdFJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50OiBhbnksIF9ldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlcixcbiAgICAgICAgICAgICAgc2hhcmVkU3R5bGVzSG9zdDogRG9tU2hhcmVkU3R5bGVzSG9zdCwgYW5pbWF0ZTogQW5pbWF0aW9uQnVpbGRlcikge1xuICAgIHN1cGVyKF9kb2N1bWVudCwgX2V2ZW50TWFuYWdlciwgc2hhcmVkU3R5bGVzSG9zdCwgYW5pbWF0ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIERvbVJlbmRlcmVyIGltcGxlbWVudHMgUmVuZGVyZXIge1xuICBwcml2YXRlIF9jb250ZW50QXR0cjogc3RyaW5nO1xuICBwcml2YXRlIF9ob3N0QXR0cjogc3RyaW5nO1xuICBwcml2YXRlIF9zdHlsZXM6IHN0cmluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3Jvb3RSZW5kZXJlcjogRG9tUm9vdFJlbmRlcmVyLCBwcml2YXRlIGNvbXBvbmVudFByb3RvOiBSZW5kZXJDb21wb25lbnRUeXBlKSB7XG4gICAgdGhpcy5fc3R5bGVzID0gX2ZsYXR0ZW5TdHlsZXMoY29tcG9uZW50UHJvdG8uaWQsIGNvbXBvbmVudFByb3RvLnN0eWxlcywgW10pO1xuICAgIGlmIChjb21wb25lbnRQcm90by5lbmNhcHN1bGF0aW9uICE9PSBWaWV3RW5jYXBzdWxhdGlvbi5OYXRpdmUpIHtcbiAgICAgIHRoaXMuX3Jvb3RSZW5kZXJlci5zaGFyZWRTdHlsZXNIb3N0LmFkZFN0eWxlcyh0aGlzLl9zdHlsZXMpO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb21wb25lbnRQcm90by5lbmNhcHN1bGF0aW9uID09PSBWaWV3RW5jYXBzdWxhdGlvbi5FbXVsYXRlZCkge1xuICAgICAgdGhpcy5fY29udGVudEF0dHIgPSBfc2hpbUNvbnRlbnRBdHRyaWJ1dGUoY29tcG9uZW50UHJvdG8uaWQpO1xuICAgICAgdGhpcy5faG9zdEF0dHIgPSBfc2hpbUhvc3RBdHRyaWJ1dGUoY29tcG9uZW50UHJvdG8uaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9jb250ZW50QXR0ciA9IG51bGw7XG4gICAgICB0aGlzLl9ob3N0QXR0ciA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0Um9vdEVsZW1lbnQoc2VsZWN0b3JPck5vZGU6IHN0cmluZyB8IGFueSwgZGVidWdJbmZvOiBSZW5kZXJEZWJ1Z0luZm8pOiBFbGVtZW50IHtcbiAgICB2YXIgZWw7XG4gICAgaWYgKGlzU3RyaW5nKHNlbGVjdG9yT3JOb2RlKSkge1xuICAgICAgZWwgPSBET00ucXVlcnlTZWxlY3Rvcih0aGlzLl9yb290UmVuZGVyZXIuZG9jdW1lbnQsIHNlbGVjdG9yT3JOb2RlKTtcbiAgICAgIGlmIChpc0JsYW5rKGVsKSkge1xuICAgICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgVGhlIHNlbGVjdG9yIFwiJHtzZWxlY3Rvck9yTm9kZX1cIiBkaWQgbm90IG1hdGNoIGFueSBlbGVtZW50c2ApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlbCA9IHNlbGVjdG9yT3JOb2RlO1xuICAgIH1cbiAgICBET00uY2xlYXJOb2RlcyhlbCk7XG4gICAgcmV0dXJuIGVsO1xuICB9XG5cbiAgY3JlYXRlRWxlbWVudChwYXJlbnQ6IEVsZW1lbnQsIG5hbWU6IHN0cmluZywgZGVidWdJbmZvOiBSZW5kZXJEZWJ1Z0luZm8pOiBOb2RlIHtcbiAgICB2YXIgbnNBbmROYW1lID0gc3BsaXROYW1lc3BhY2UobmFtZSk7XG4gICAgdmFyIGVsID0gaXNQcmVzZW50KG5zQW5kTmFtZVswXSkgP1xuICAgICAgICAgICAgICAgICBET00uY3JlYXRlRWxlbWVudE5TKE5BTUVTUEFDRV9VUklTW25zQW5kTmFtZVswXV0sIG5zQW5kTmFtZVsxXSkgOlxuICAgICAgICAgICAgICAgICBET00uY3JlYXRlRWxlbWVudChuc0FuZE5hbWVbMV0pO1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fY29udGVudEF0dHIpKSB7XG4gICAgICBET00uc2V0QXR0cmlidXRlKGVsLCB0aGlzLl9jb250ZW50QXR0ciwgJycpO1xuICAgIH1cbiAgICBpZiAoaXNQcmVzZW50KHBhcmVudCkpIHtcbiAgICAgIERPTS5hcHBlbmRDaGlsZChwYXJlbnQsIGVsKTtcbiAgICB9XG4gICAgcmV0dXJuIGVsO1xuICB9XG5cbiAgY3JlYXRlVmlld1Jvb3QoaG9zdEVsZW1lbnQ6IGFueSk6IGFueSB7XG4gICAgdmFyIG5vZGVzUGFyZW50O1xuICAgIGlmICh0aGlzLmNvbXBvbmVudFByb3RvLmVuY2Fwc3VsYXRpb24gPT09IFZpZXdFbmNhcHN1bGF0aW9uLk5hdGl2ZSkge1xuICAgICAgbm9kZXNQYXJlbnQgPSBET00uY3JlYXRlU2hhZG93Um9vdChob3N0RWxlbWVudCk7XG4gICAgICB0aGlzLl9yb290UmVuZGVyZXIuc2hhcmVkU3R5bGVzSG9zdC5hZGRIb3N0KG5vZGVzUGFyZW50KTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIERPTS5hcHBlbmRDaGlsZChub2Rlc1BhcmVudCwgRE9NLmNyZWF0ZVN0eWxlRWxlbWVudCh0aGlzLl9zdHlsZXNbaV0pKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLl9ob3N0QXR0cikpIHtcbiAgICAgICAgRE9NLnNldEF0dHJpYnV0ZShob3N0RWxlbWVudCwgdGhpcy5faG9zdEF0dHIsICcnKTtcbiAgICAgIH1cbiAgICAgIG5vZGVzUGFyZW50ID0gaG9zdEVsZW1lbnQ7XG4gICAgfVxuICAgIHJldHVybiBub2Rlc1BhcmVudDtcbiAgfVxuXG4gIGNyZWF0ZVRlbXBsYXRlQW5jaG9yKHBhcmVudEVsZW1lbnQ6IGFueSwgZGVidWdJbmZvOiBSZW5kZXJEZWJ1Z0luZm8pOiBhbnkge1xuICAgIHZhciBjb21tZW50ID0gRE9NLmNyZWF0ZUNvbW1lbnQoVEVNUExBVEVfQ09NTUVOVF9URVhUKTtcbiAgICBpZiAoaXNQcmVzZW50KHBhcmVudEVsZW1lbnQpKSB7XG4gICAgICBET00uYXBwZW5kQ2hpbGQocGFyZW50RWxlbWVudCwgY29tbWVudCk7XG4gICAgfVxuICAgIHJldHVybiBjb21tZW50O1xuICB9XG5cbiAgY3JlYXRlVGV4dChwYXJlbnRFbGVtZW50OiBhbnksIHZhbHVlOiBzdHJpbmcsIGRlYnVnSW5mbzogUmVuZGVyRGVidWdJbmZvKTogYW55IHtcbiAgICB2YXIgbm9kZSA9IERPTS5jcmVhdGVUZXh0Tm9kZSh2YWx1ZSk7XG4gICAgaWYgKGlzUHJlc2VudChwYXJlbnRFbGVtZW50KSkge1xuICAgICAgRE9NLmFwcGVuZENoaWxkKHBhcmVudEVsZW1lbnQsIG5vZGUpO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHByb2plY3ROb2RlcyhwYXJlbnRFbGVtZW50OiBhbnksIG5vZGVzOiBhbnlbXSkge1xuICAgIGlmIChpc0JsYW5rKHBhcmVudEVsZW1lbnQpKSByZXR1cm47XG4gICAgYXBwZW5kTm9kZXMocGFyZW50RWxlbWVudCwgbm9kZXMpO1xuICB9XG5cbiAgYXR0YWNoVmlld0FmdGVyKG5vZGU6IGFueSwgdmlld1Jvb3ROb2RlczogYW55W10pIHtcbiAgICBtb3ZlTm9kZXNBZnRlclNpYmxpbmcobm9kZSwgdmlld1Jvb3ROb2Rlcyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2aWV3Um9vdE5vZGVzLmxlbmd0aDsgaSsrKSB0aGlzLmFuaW1hdGVOb2RlRW50ZXIodmlld1Jvb3ROb2Rlc1tpXSk7XG4gIH1cblxuICBkZXRhY2hWaWV3KHZpZXdSb290Tm9kZXM6IGFueVtdKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2aWV3Um9vdE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbm9kZSA9IHZpZXdSb290Tm9kZXNbaV07XG4gICAgICBET00ucmVtb3ZlKG5vZGUpO1xuICAgICAgdGhpcy5hbmltYXRlTm9kZUxlYXZlKG5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3lWaWV3KGhvc3RFbGVtZW50OiBhbnksIHZpZXdBbGxOb2RlczogYW55W10pIHtcbiAgICBpZiAodGhpcy5jb21wb25lbnRQcm90by5lbmNhcHN1bGF0aW9uID09PSBWaWV3RW5jYXBzdWxhdGlvbi5OYXRpdmUgJiYgaXNQcmVzZW50KGhvc3RFbGVtZW50KSkge1xuICAgICAgdGhpcy5fcm9vdFJlbmRlcmVyLnNoYXJlZFN0eWxlc0hvc3QucmVtb3ZlSG9zdChET00uZ2V0U2hhZG93Um9vdChob3N0RWxlbWVudCkpO1xuICAgIH1cbiAgfVxuXG4gIGxpc3RlbihyZW5kZXJFbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIHJldHVybiB0aGlzLl9yb290UmVuZGVyZXIuZXZlbnRNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIocmVuZGVyRWxlbWVudCwgbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlY29yYXRlUHJldmVudERlZmF1bHQoY2FsbGJhY2spKTtcbiAgfVxuXG4gIGxpc3Rlbkdsb2JhbCh0YXJnZXQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvb3RSZW5kZXJlci5ldmVudE1hbmFnZXIuYWRkR2xvYmFsRXZlbnRMaXN0ZW5lcih0YXJnZXQsIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWNvcmF0ZVByZXZlbnREZWZhdWx0KGNhbGxiYWNrKSk7XG4gIH1cblxuICBzZXRFbGVtZW50UHJvcGVydHkocmVuZGVyRWxlbWVudDogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgcHJvcGVydHlWYWx1ZTogYW55KTogdm9pZCB7XG4gICAgRE9NLnNldFByb3BlcnR5KHJlbmRlckVsZW1lbnQsIHByb3BlcnR5TmFtZSwgcHJvcGVydHlWYWx1ZSk7XG4gIH1cblxuICBzZXRFbGVtZW50QXR0cmlidXRlKHJlbmRlckVsZW1lbnQ6IGFueSwgYXR0cmlidXRlTmFtZTogc3RyaW5nLCBhdHRyaWJ1dGVWYWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdmFyIGF0dHJOcztcbiAgICB2YXIgbnNBbmROYW1lID0gc3BsaXROYW1lc3BhY2UoYXR0cmlidXRlTmFtZSk7XG4gICAgaWYgKGlzUHJlc2VudChuc0FuZE5hbWVbMF0pKSB7XG4gICAgICBhdHRyaWJ1dGVOYW1lID0gbnNBbmROYW1lWzBdICsgJzonICsgbnNBbmROYW1lWzFdO1xuICAgICAgYXR0ck5zID0gTkFNRVNQQUNFX1VSSVNbbnNBbmROYW1lWzBdXTtcbiAgICB9XG4gICAgaWYgKGlzUHJlc2VudChhdHRyaWJ1dGVWYWx1ZSkpIHtcbiAgICAgIGlmIChpc1ByZXNlbnQoYXR0ck5zKSkge1xuICAgICAgICBET00uc2V0QXR0cmlidXRlTlMocmVuZGVyRWxlbWVudCwgYXR0ck5zLCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVWYWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBET00uc2V0QXR0cmlidXRlKHJlbmRlckVsZW1lbnQsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZVZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGlzUHJlc2VudChhdHRyTnMpKSB7XG4gICAgICAgIERPTS5yZW1vdmVBdHRyaWJ1dGVOUyhyZW5kZXJFbGVtZW50LCBhdHRyTnMsIG5zQW5kTmFtZVsxXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBET00ucmVtb3ZlQXR0cmlidXRlKHJlbmRlckVsZW1lbnQsIGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldEJpbmRpbmdEZWJ1Z0luZm8ocmVuZGVyRWxlbWVudDogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgcHJvcGVydHlWYWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdmFyIGRhc2hDYXNlZFByb3BlcnR5TmFtZSA9IGNhbWVsQ2FzZVRvRGFzaENhc2UocHJvcGVydHlOYW1lKTtcbiAgICBpZiAoRE9NLmlzQ29tbWVudE5vZGUocmVuZGVyRWxlbWVudCkpIHtcbiAgICAgIHZhciBleGlzdGluZ0JpbmRpbmdzID0gUmVnRXhwV3JhcHBlci5maXJzdE1hdGNoKFxuICAgICAgICAgIFRFTVBMQVRFX0JJTkRJTkdTX0VYUCwgU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsKERPTS5nZXRUZXh0KHJlbmRlckVsZW1lbnQpLCAvXFxuL2csICcnKSk7XG4gICAgICB2YXIgcGFyc2VkQmluZGluZ3MgPSBKc29uLnBhcnNlKGV4aXN0aW5nQmluZGluZ3NbMV0pO1xuICAgICAgcGFyc2VkQmluZGluZ3NbZGFzaENhc2VkUHJvcGVydHlOYW1lXSA9IHByb3BlcnR5VmFsdWU7XG4gICAgICBET00uc2V0VGV4dChyZW5kZXJFbGVtZW50LCBTdHJpbmdXcmFwcGVyLnJlcGxhY2UoVEVNUExBVEVfQ09NTUVOVF9URVhULCAne30nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpzb24uc3RyaW5naWZ5KHBhcnNlZEJpbmRpbmdzKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldEVsZW1lbnRBdHRyaWJ1dGUocmVuZGVyRWxlbWVudCwgcHJvcGVydHlOYW1lLCBwcm9wZXJ0eVZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBzZXRFbGVtZW50Q2xhc3MocmVuZGVyRWxlbWVudDogYW55LCBjbGFzc05hbWU6IHN0cmluZywgaXNBZGQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoaXNBZGQpIHtcbiAgICAgIERPTS5hZGRDbGFzcyhyZW5kZXJFbGVtZW50LCBjbGFzc05hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBET00ucmVtb3ZlQ2xhc3MocmVuZGVyRWxlbWVudCwgY2xhc3NOYW1lKTtcbiAgICB9XG4gIH1cblxuICBzZXRFbGVtZW50U3R5bGUocmVuZGVyRWxlbWVudDogYW55LCBzdHlsZU5hbWU6IHN0cmluZywgc3R5bGVWYWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKGlzUHJlc2VudChzdHlsZVZhbHVlKSkge1xuICAgICAgRE9NLnNldFN0eWxlKHJlbmRlckVsZW1lbnQsIHN0eWxlTmFtZSwgc3RyaW5naWZ5KHN0eWxlVmFsdWUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgRE9NLnJlbW92ZVN0eWxlKHJlbmRlckVsZW1lbnQsIHN0eWxlTmFtZSk7XG4gICAgfVxuICB9XG5cbiAgaW52b2tlRWxlbWVudE1ldGhvZChyZW5kZXJFbGVtZW50OiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgYXJnczogYW55W10pOiB2b2lkIHtcbiAgICBET00uaW52b2tlKHJlbmRlckVsZW1lbnQsIG1ldGhvZE5hbWUsIGFyZ3MpO1xuICB9XG5cbiAgc2V0VGV4dChyZW5kZXJOb2RlOiBhbnksIHRleHQ6IHN0cmluZyk6IHZvaWQgeyBET00uc2V0VGV4dChyZW5kZXJOb2RlLCB0ZXh0KTsgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhbmltYXRpb25zIGlmIG5lY2Vzc2FyeVxuICAgKiBAcGFyYW0gbm9kZVxuICAgKi9cbiAgYW5pbWF0ZU5vZGVFbnRlcihub2RlOiBOb2RlKSB7XG4gICAgaWYgKERPTS5pc0VsZW1lbnROb2RlKG5vZGUpICYmIERPTS5oYXNDbGFzcyhub2RlLCAnbmctYW5pbWF0ZScpKSB7XG4gICAgICBET00uYWRkQ2xhc3Mobm9kZSwgJ25nLWVudGVyJyk7XG4gICAgICB0aGlzLl9yb290UmVuZGVyZXIuYW5pbWF0ZS5jc3MoKVxuICAgICAgICAgIC5hZGRBbmltYXRpb25DbGFzcygnbmctZW50ZXItYWN0aXZlJylcbiAgICAgICAgICAuc3RhcnQoPEhUTUxFbGVtZW50Pm5vZGUpXG4gICAgICAgICAgLm9uQ29tcGxldGUoKCkgPT4geyBET00ucmVtb3ZlQ2xhc3Mobm9kZSwgJ25nLWVudGVyJyk7IH0pO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIElmIGFuaW1hdGlvbnMgYXJlIG5lY2Vzc2FyeSwgcGVyZm9ybXMgYW5pbWF0aW9ucyB0aGVuIHJlbW92ZXMgdGhlIGVsZW1lbnQ7IG90aGVyd2lzZSwgaXQganVzdFxuICAgKiByZW1vdmVzIHRoZSBlbGVtZW50LlxuICAgKiBAcGFyYW0gbm9kZVxuICAgKi9cbiAgYW5pbWF0ZU5vZGVMZWF2ZShub2RlOiBOb2RlKSB7XG4gICAgaWYgKERPTS5pc0VsZW1lbnROb2RlKG5vZGUpICYmIERPTS5oYXNDbGFzcyhub2RlLCAnbmctYW5pbWF0ZScpKSB7XG4gICAgICBET00uYWRkQ2xhc3Mobm9kZSwgJ25nLWxlYXZlJyk7XG4gICAgICB0aGlzLl9yb290UmVuZGVyZXIuYW5pbWF0ZS5jc3MoKVxuICAgICAgICAgIC5hZGRBbmltYXRpb25DbGFzcygnbmctbGVhdmUtYWN0aXZlJylcbiAgICAgICAgICAuc3RhcnQoPEhUTUxFbGVtZW50Pm5vZGUpXG4gICAgICAgICAgLm9uQ29tcGxldGUoKCkgPT4ge1xuICAgICAgICAgICAgRE9NLnJlbW92ZUNsYXNzKG5vZGUsICduZy1sZWF2ZScpO1xuICAgICAgICAgICAgRE9NLnJlbW92ZShub2RlKTtcbiAgICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgRE9NLnJlbW92ZShub2RlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbW92ZU5vZGVzQWZ0ZXJTaWJsaW5nKHNpYmxpbmcsIG5vZGVzKSB7XG4gIHZhciBwYXJlbnQgPSBET00ucGFyZW50RWxlbWVudChzaWJsaW5nKTtcbiAgaWYgKG5vZGVzLmxlbmd0aCA+IDAgJiYgaXNQcmVzZW50KHBhcmVudCkpIHtcbiAgICB2YXIgbmV4dFNpYmxpbmcgPSBET00ubmV4dFNpYmxpbmcoc2libGluZyk7XG4gICAgaWYgKGlzUHJlc2VudChuZXh0U2libGluZykpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgRE9NLmluc2VydEJlZm9yZShuZXh0U2libGluZywgbm9kZXNbaV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIERPTS5hcHBlbmRDaGlsZChwYXJlbnQsIG5vZGVzW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwZW5kTm9kZXMocGFyZW50LCBub2Rlcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgRE9NLmFwcGVuZENoaWxkKHBhcmVudCwgbm9kZXNbaV0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlY29yYXRlUHJldmVudERlZmF1bHQoZXZlbnRIYW5kbGVyOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgcmV0dXJuIChldmVudCkgPT4ge1xuICAgIHZhciBhbGxvd0RlZmF1bHRCZWhhdmlvciA9IGV2ZW50SGFuZGxlcihldmVudCk7XG4gICAgaWYgKGFsbG93RGVmYXVsdEJlaGF2aW9yID09PSBmYWxzZSkge1xuICAgICAgLy8gVE9ETyh0Ym9zY2gpOiBtb3ZlIHByZXZlbnREZWZhdWx0IGludG8gZXZlbnQgcGx1Z2lucy4uLlxuICAgICAgRE9NLnByZXZlbnREZWZhdWx0KGV2ZW50KTtcbiAgICB9XG4gIH07XG59XG5cbnZhciBDT01QT05FTlRfUkVHRVggPSAvJUNPTVAlL2c7XG5leHBvcnQgY29uc3QgQ09NUE9ORU5UX1ZBUklBQkxFID0gJyVDT01QJSc7XG5leHBvcnQgY29uc3QgSE9TVF9BVFRSID0gYF9uZ2hvc3QtJHtDT01QT05FTlRfVkFSSUFCTEV9YDtcbmV4cG9ydCBjb25zdCBDT05URU5UX0FUVFIgPSBgX25nY29udGVudC0ke0NPTVBPTkVOVF9WQVJJQUJMRX1gO1xuXG5mdW5jdGlvbiBfc2hpbUNvbnRlbnRBdHRyaWJ1dGUoY29tcG9uZW50U2hvcnRJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbChDT05URU5UX0FUVFIsIENPTVBPTkVOVF9SRUdFWCwgY29tcG9uZW50U2hvcnRJZCk7XG59XG5cbmZ1bmN0aW9uIF9zaGltSG9zdEF0dHJpYnV0ZShjb21wb25lbnRTaG9ydElkOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsKEhPU1RfQVRUUiwgQ09NUE9ORU5UX1JFR0VYLCBjb21wb25lbnRTaG9ydElkKTtcbn1cblxuZnVuY3Rpb24gX2ZsYXR0ZW5TdHlsZXMoY29tcElkOiBzdHJpbmcsIHN0eWxlczogQXJyYXk8YW55IHwgYW55W10+LCB0YXJnZXQ6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzdHlsZSA9IHN0eWxlc1tpXTtcbiAgICBpZiAoaXNBcnJheShzdHlsZSkpIHtcbiAgICAgIF9mbGF0dGVuU3R5bGVzKGNvbXBJZCwgc3R5bGUsIHRhcmdldCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlID0gU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsKHN0eWxlLCBDT01QT05FTlRfUkVHRVgsIGNvbXBJZCk7XG4gICAgICB0YXJnZXQucHVzaChzdHlsZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbnZhciBOU19QUkVGSVhfUkUgPSAvXkAoW146XSspOiguKykvZztcblxuZnVuY3Rpb24gc3BsaXROYW1lc3BhY2UobmFtZTogc3RyaW5nKTogc3RyaW5nW10ge1xuICBpZiAobmFtZVswXSAhPSAnQCcpIHtcbiAgICByZXR1cm4gW251bGwsIG5hbWVdO1xuICB9XG4gIGxldCBtYXRjaCA9IFJlZ0V4cFdyYXBwZXIuZmlyc3RNYXRjaChOU19QUkVGSVhfUkUsIG5hbWUpO1xuICByZXR1cm4gW21hdGNoWzFdLCBtYXRjaFsyXV07XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
