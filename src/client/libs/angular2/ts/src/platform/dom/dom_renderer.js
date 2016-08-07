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
                DomRenderer.prototype.renderComponent = function (componentProto) {
                    return this._rootRenderer.renderComponent(componentProto);
                };
                DomRenderer.prototype.selectRootElement = function (selector) {
                    var el = dom_adapter_1.DOM.querySelector(this._rootRenderer.document, selector);
                    if (lang_1.isBlank(el)) {
                        throw new exceptions_1.BaseException("The selector \"" + selector + "\" did not match any elements");
                    }
                    dom_adapter_1.DOM.clearNodes(el);
                    return el;
                };
                DomRenderer.prototype.createElement = function (parent, name) {
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
                DomRenderer.prototype.createTemplateAnchor = function (parentElement) {
                    var comment = dom_adapter_1.DOM.createComment(TEMPLATE_COMMENT_TEXT);
                    if (lang_1.isPresent(parentElement)) {
                        dom_adapter_1.DOM.appendChild(parentElement, comment);
                    }
                    return comment;
                };
                DomRenderer.prototype.createText = function (parentElement, value) {
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
                DomRenderer.prototype.setElementDebugInfo = function (renderElement, info) { };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL2RvbS9kb21fcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBOEJNLGNBQWMsRUFFZCxxQkFBcUIsRUFDdkIscUJBQXFCLGtEQStRckIsZUFBZSxFQUNOLGtCQUFrQixFQUNsQixTQUFTLEVBQ1QsWUFBWSxFQXVCckIsWUFBWTtJQTFEaEIsK0JBQStCLE9BQU8sRUFBRSxLQUFLO1FBQzNDLElBQUksTUFBTSxHQUFHLGlCQUFHLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLGdCQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUksV0FBVyxHQUFHLGlCQUFHLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNDLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDdEMsaUJBQUcsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxDQUFDO1lBQ0gsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUN0QyxpQkFBRyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLENBQUM7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WSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNoRSxpQkFBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7d0JBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTs2QkFDM0IsaUJBQWlCLENBQUMsaUJBQWlCLENBQUM7NkJBQ3BDLEtBQUssQ0FBYyxJQUFJLENBQUM7NkJBQ3hCLFVBQVUsQ0FBQzs0QkFDVixpQkFBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7NEJBQ2xDLGlCQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNuQixDQUFDLENBQUMsQ0FBQztvQkFDVCxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLGlCQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNuQixDQUFDO2dCQUNILENBQUM7Z0JBQ0gsa0JBQUM7WUFBRCxDQW5OQSxBQW1OQyxJQUFBO1lBbk5ELHFDQW1OQyxDQUFBO1lBa0NHLGVBQWUsR0FBRyxTQUFTLENBQUM7WUFDbkIsZ0NBQUEsa0JBQWtCLEdBQUcsUUFBUSxDQUFBLENBQUM7WUFDOUIsdUJBQUEsU0FBUyxHQUFHLGFBQVcsa0JBQW9CLENBQUEsQ0FBQztZQUM1QywwQkFBQSxZQUFZLEdBQUcsZ0JBQWMsa0JBQW9CLENBQUEsQ0FBQztZQXVCM0QsWUFBWSxHQUFHLGlCQUFpQixDQUFDIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL2RvbS9kb21fcmVuZGVyZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgT3BhcXVlVG9rZW59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7QW5pbWF0aW9uQnVpbGRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2FuaW1hdGUvYW5pbWF0aW9uX2J1aWxkZXInO1xuaW1wb3J0IHtcbiAgaXNQcmVzZW50LFxuICBpc0JsYW5rLFxuICBKc29uLFxuICBSZWdFeHBXcmFwcGVyLFxuICBDT05TVF9FWFBSLFxuICBzdHJpbmdpZnksXG4gIFN0cmluZ1dyYXBwZXIsXG4gIGlzQXJyYXlcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuaW1wb3J0IHtCYXNlRXhjZXB0aW9uLCBXcmFwcGVkRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtEb21TaGFyZWRTdHlsZXNIb3N0fSBmcm9tICcuL3NoYXJlZF9zdHlsZXNfaG9zdCc7XG5cbmltcG9ydCB7XG4gIFJlbmRlcmVyLFxuICBSb290UmVuZGVyZXIsXG4gIFJlbmRlckNvbXBvbmVudFR5cGUsXG4gIFJlbmRlckRlYnVnSW5mb1xufSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9yZW5kZXIvYXBpJztcblxuaW1wb3J0IHtFdmVudE1hbmFnZXJ9IGZyb20gJy4vZXZlbnRzL2V2ZW50X21hbmFnZXInO1xuXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICcuL2RvbV90b2tlbnMnO1xuaW1wb3J0IHtWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbWV0YWRhdGEnO1xuaW1wb3J0IHtET019IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZG9tX2FkYXB0ZXInO1xuaW1wb3J0IHtjYW1lbENhc2VUb0Rhc2hDYXNlfSBmcm9tICcuL3V0aWwnO1xuXG5jb25zdCBOQU1FU1BBQ0VfVVJJUyA9XG4gICAgQ09OU1RfRVhQUih7J3hsaW5rJzogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnLCAnc3ZnJzogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJ30pO1xuY29uc3QgVEVNUExBVEVfQ09NTUVOVF9URVhUID0gJ3RlbXBsYXRlIGJpbmRpbmdzPXt9JztcbnZhciBURU1QTEFURV9CSU5ESU5HU19FWFAgPSAvXnRlbXBsYXRlIGJpbmRpbmdzPSguKikkL2c7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEb21Sb290UmVuZGVyZXIgaW1wbGVtZW50cyBSb290UmVuZGVyZXIge1xuICBwcml2YXRlIF9yZWdpc3RlcmVkQ29tcG9uZW50czogTWFwPHN0cmluZywgRG9tUmVuZGVyZXI+ID0gbmV3IE1hcDxzdHJpbmcsIERvbVJlbmRlcmVyPigpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkb2N1bWVudDogYW55LCBwdWJsaWMgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsXG4gICAgICAgICAgICAgIHB1YmxpYyBzaGFyZWRTdHlsZXNIb3N0OiBEb21TaGFyZWRTdHlsZXNIb3N0LCBwdWJsaWMgYW5pbWF0ZTogQW5pbWF0aW9uQnVpbGRlcikge31cblxuICByZW5kZXJDb21wb25lbnQoY29tcG9uZW50UHJvdG86IFJlbmRlckNvbXBvbmVudFR5cGUpOiBSZW5kZXJlciB7XG4gICAgdmFyIHJlbmRlcmVyID0gdGhpcy5fcmVnaXN0ZXJlZENvbXBvbmVudHMuZ2V0KGNvbXBvbmVudFByb3RvLmlkKTtcbiAgICBpZiAoaXNCbGFuayhyZW5kZXJlcikpIHtcbiAgICAgIHJlbmRlcmVyID0gbmV3IERvbVJlbmRlcmVyKHRoaXMsIGNvbXBvbmVudFByb3RvKTtcbiAgICAgIHRoaXMuX3JlZ2lzdGVyZWRDb21wb25lbnRzLnNldChjb21wb25lbnRQcm90by5pZCwgcmVuZGVyZXIpO1xuICAgIH1cbiAgICByZXR1cm4gcmVuZGVyZXI7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERvbVJvb3RSZW5kZXJlcl8gZXh0ZW5kcyBEb21Sb290UmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBfZG9jdW1lbnQ6IGFueSwgX2V2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyLFxuICAgICAgICAgICAgICBzaGFyZWRTdHlsZXNIb3N0OiBEb21TaGFyZWRTdHlsZXNIb3N0LCBhbmltYXRlOiBBbmltYXRpb25CdWlsZGVyKSB7XG4gICAgc3VwZXIoX2RvY3VtZW50LCBfZXZlbnRNYW5hZ2VyLCBzaGFyZWRTdHlsZXNIb3N0LCBhbmltYXRlKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRG9tUmVuZGVyZXIgaW1wbGVtZW50cyBSZW5kZXJlciB7XG4gIHByaXZhdGUgX2NvbnRlbnRBdHRyOiBzdHJpbmc7XG4gIHByaXZhdGUgX2hvc3RBdHRyOiBzdHJpbmc7XG4gIHByaXZhdGUgX3N0eWxlczogc3RyaW5nW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm9vdFJlbmRlcmVyOiBEb21Sb290UmVuZGVyZXIsIHByaXZhdGUgY29tcG9uZW50UHJvdG86IFJlbmRlckNvbXBvbmVudFR5cGUpIHtcbiAgICB0aGlzLl9zdHlsZXMgPSBfZmxhdHRlblN0eWxlcyhjb21wb25lbnRQcm90by5pZCwgY29tcG9uZW50UHJvdG8uc3R5bGVzLCBbXSk7XG4gICAgaWYgKGNvbXBvbmVudFByb3RvLmVuY2Fwc3VsYXRpb24gIT09IFZpZXdFbmNhcHN1bGF0aW9uLk5hdGl2ZSkge1xuICAgICAgdGhpcy5fcm9vdFJlbmRlcmVyLnNoYXJlZFN0eWxlc0hvc3QuYWRkU3R5bGVzKHRoaXMuX3N0eWxlcyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbXBvbmVudFByb3RvLmVuY2Fwc3VsYXRpb24gPT09IFZpZXdFbmNhcHN1bGF0aW9uLkVtdWxhdGVkKSB7XG4gICAgICB0aGlzLl9jb250ZW50QXR0ciA9IF9zaGltQ29udGVudEF0dHJpYnV0ZShjb21wb25lbnRQcm90by5pZCk7XG4gICAgICB0aGlzLl9ob3N0QXR0ciA9IF9zaGltSG9zdEF0dHJpYnV0ZShjb21wb25lbnRQcm90by5pZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2NvbnRlbnRBdHRyID0gbnVsbDtcbiAgICAgIHRoaXMuX2hvc3RBdHRyID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICByZW5kZXJDb21wb25lbnQoY29tcG9uZW50UHJvdG86IFJlbmRlckNvbXBvbmVudFR5cGUpOiBSZW5kZXJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvb3RSZW5kZXJlci5yZW5kZXJDb21wb25lbnQoY29tcG9uZW50UHJvdG8pO1xuICB9XG5cbiAgc2VsZWN0Um9vdEVsZW1lbnQoc2VsZWN0b3I6IHN0cmluZyk6IEVsZW1lbnQge1xuICAgIHZhciBlbCA9IERPTS5xdWVyeVNlbGVjdG9yKHRoaXMuX3Jvb3RSZW5kZXJlci5kb2N1bWVudCwgc2VsZWN0b3IpO1xuICAgIGlmIChpc0JsYW5rKGVsKSkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYFRoZSBzZWxlY3RvciBcIiR7c2VsZWN0b3J9XCIgZGlkIG5vdCBtYXRjaCBhbnkgZWxlbWVudHNgKTtcbiAgICB9XG4gICAgRE9NLmNsZWFyTm9kZXMoZWwpO1xuICAgIHJldHVybiBlbDtcbiAgfVxuXG4gIGNyZWF0ZUVsZW1lbnQocGFyZW50OiBFbGVtZW50LCBuYW1lOiBzdHJpbmcpOiBOb2RlIHtcbiAgICB2YXIgbnNBbmROYW1lID0gc3BsaXROYW1lc3BhY2UobmFtZSk7XG4gICAgdmFyIGVsID0gaXNQcmVzZW50KG5zQW5kTmFtZVswXSkgP1xuICAgICAgICAgICAgICAgICBET00uY3JlYXRlRWxlbWVudE5TKE5BTUVTUEFDRV9VUklTW25zQW5kTmFtZVswXV0sIG5zQW5kTmFtZVsxXSkgOlxuICAgICAgICAgICAgICAgICBET00uY3JlYXRlRWxlbWVudChuc0FuZE5hbWVbMV0pO1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fY29udGVudEF0dHIpKSB7XG4gICAgICBET00uc2V0QXR0cmlidXRlKGVsLCB0aGlzLl9jb250ZW50QXR0ciwgJycpO1xuICAgIH1cbiAgICBpZiAoaXNQcmVzZW50KHBhcmVudCkpIHtcbiAgICAgIERPTS5hcHBlbmRDaGlsZChwYXJlbnQsIGVsKTtcbiAgICB9XG4gICAgcmV0dXJuIGVsO1xuICB9XG5cbiAgY3JlYXRlVmlld1Jvb3QoaG9zdEVsZW1lbnQ6IGFueSk6IGFueSB7XG4gICAgdmFyIG5vZGVzUGFyZW50O1xuICAgIGlmICh0aGlzLmNvbXBvbmVudFByb3RvLmVuY2Fwc3VsYXRpb24gPT09IFZpZXdFbmNhcHN1bGF0aW9uLk5hdGl2ZSkge1xuICAgICAgbm9kZXNQYXJlbnQgPSBET00uY3JlYXRlU2hhZG93Um9vdChob3N0RWxlbWVudCk7XG4gICAgICB0aGlzLl9yb290UmVuZGVyZXIuc2hhcmVkU3R5bGVzSG9zdC5hZGRIb3N0KG5vZGVzUGFyZW50KTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIERPTS5hcHBlbmRDaGlsZChub2Rlc1BhcmVudCwgRE9NLmNyZWF0ZVN0eWxlRWxlbWVudCh0aGlzLl9zdHlsZXNbaV0pKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLl9ob3N0QXR0cikpIHtcbiAgICAgICAgRE9NLnNldEF0dHJpYnV0ZShob3N0RWxlbWVudCwgdGhpcy5faG9zdEF0dHIsICcnKTtcbiAgICAgIH1cbiAgICAgIG5vZGVzUGFyZW50ID0gaG9zdEVsZW1lbnQ7XG4gICAgfVxuICAgIHJldHVybiBub2Rlc1BhcmVudDtcbiAgfVxuXG4gIGNyZWF0ZVRlbXBsYXRlQW5jaG9yKHBhcmVudEVsZW1lbnQ6IGFueSk6IGFueSB7XG4gICAgdmFyIGNvbW1lbnQgPSBET00uY3JlYXRlQ29tbWVudChURU1QTEFURV9DT01NRU5UX1RFWFQpO1xuICAgIGlmIChpc1ByZXNlbnQocGFyZW50RWxlbWVudCkpIHtcbiAgICAgIERPTS5hcHBlbmRDaGlsZChwYXJlbnRFbGVtZW50LCBjb21tZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbW1lbnQ7XG4gIH1cblxuICBjcmVhdGVUZXh0KHBhcmVudEVsZW1lbnQ6IGFueSwgdmFsdWU6IHN0cmluZyk6IGFueSB7XG4gICAgdmFyIG5vZGUgPSBET00uY3JlYXRlVGV4dE5vZGUodmFsdWUpO1xuICAgIGlmIChpc1ByZXNlbnQocGFyZW50RWxlbWVudCkpIHtcbiAgICAgIERPTS5hcHBlbmRDaGlsZChwYXJlbnRFbGVtZW50LCBub2RlKTtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBwcm9qZWN0Tm9kZXMocGFyZW50RWxlbWVudDogYW55LCBub2RlczogYW55W10pIHtcbiAgICBpZiAoaXNCbGFuayhwYXJlbnRFbGVtZW50KSkgcmV0dXJuO1xuICAgIGFwcGVuZE5vZGVzKHBhcmVudEVsZW1lbnQsIG5vZGVzKTtcbiAgfVxuXG4gIGF0dGFjaFZpZXdBZnRlcihub2RlOiBhbnksIHZpZXdSb290Tm9kZXM6IGFueVtdKSB7XG4gICAgbW92ZU5vZGVzQWZ0ZXJTaWJsaW5nKG5vZGUsIHZpZXdSb290Tm9kZXMpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmlld1Jvb3ROb2Rlcy5sZW5ndGg7IGkrKykgdGhpcy5hbmltYXRlTm9kZUVudGVyKHZpZXdSb290Tm9kZXNbaV0pO1xuICB9XG5cbiAgZGV0YWNoVmlldyh2aWV3Um9vdE5vZGVzOiBhbnlbXSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmlld1Jvb3ROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG5vZGUgPSB2aWV3Um9vdE5vZGVzW2ldO1xuICAgICAgRE9NLnJlbW92ZShub2RlKTtcbiAgICAgIHRoaXMuYW5pbWF0ZU5vZGVMZWF2ZShub2RlKTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95Vmlldyhob3N0RWxlbWVudDogYW55LCB2aWV3QWxsTm9kZXM6IGFueVtdKSB7XG4gICAgaWYgKHRoaXMuY29tcG9uZW50UHJvdG8uZW5jYXBzdWxhdGlvbiA9PT0gVmlld0VuY2Fwc3VsYXRpb24uTmF0aXZlICYmIGlzUHJlc2VudChob3N0RWxlbWVudCkpIHtcbiAgICAgIHRoaXMuX3Jvb3RSZW5kZXJlci5zaGFyZWRTdHlsZXNIb3N0LnJlbW92ZUhvc3QoRE9NLmdldFNoYWRvd1Jvb3QoaG9zdEVsZW1lbnQpKTtcbiAgICB9XG4gIH1cblxuICBsaXN0ZW4ocmVuZGVyRWxlbWVudDogYW55LCBuYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5fcm9vdFJlbmRlcmVyLmV2ZW50TWFuYWdlci5hZGRFdmVudExpc3RlbmVyKHJlbmRlckVsZW1lbnQsIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWNvcmF0ZVByZXZlbnREZWZhdWx0KGNhbGxiYWNrKSk7XG4gIH1cblxuICBsaXN0ZW5HbG9iYWwodGFyZ2V0OiBzdHJpbmcsIG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIHJldHVybiB0aGlzLl9yb290UmVuZGVyZXIuZXZlbnRNYW5hZ2VyLmFkZEdsb2JhbEV2ZW50TGlzdGVuZXIodGFyZ2V0LCBuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVjb3JhdGVQcmV2ZW50RGVmYXVsdChjYWxsYmFjaykpO1xuICB9XG5cbiAgc2V0RWxlbWVudFByb3BlcnR5KHJlbmRlckVsZW1lbnQ6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcsIHByb3BlcnR5VmFsdWU6IGFueSk6IHZvaWQge1xuICAgIERPTS5zZXRQcm9wZXJ0eShyZW5kZXJFbGVtZW50LCBwcm9wZXJ0eU5hbWUsIHByb3BlcnR5VmFsdWUpO1xuICB9XG5cbiAgc2V0RWxlbWVudEF0dHJpYnV0ZShyZW5kZXJFbGVtZW50OiBhbnksIGF0dHJpYnV0ZU5hbWU6IHN0cmluZywgYXR0cmlidXRlVmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHZhciBhdHRyTnM7XG4gICAgdmFyIG5zQW5kTmFtZSA9IHNwbGl0TmFtZXNwYWNlKGF0dHJpYnV0ZU5hbWUpO1xuICAgIGlmIChpc1ByZXNlbnQobnNBbmROYW1lWzBdKSkge1xuICAgICAgYXR0cmlidXRlTmFtZSA9IG5zQW5kTmFtZVswXSArICc6JyArIG5zQW5kTmFtZVsxXTtcbiAgICAgIGF0dHJOcyA9IE5BTUVTUEFDRV9VUklTW25zQW5kTmFtZVswXV07XG4gICAgfVxuICAgIGlmIChpc1ByZXNlbnQoYXR0cmlidXRlVmFsdWUpKSB7XG4gICAgICBpZiAoaXNQcmVzZW50KGF0dHJOcykpIHtcbiAgICAgICAgRE9NLnNldEF0dHJpYnV0ZU5TKHJlbmRlckVsZW1lbnQsIGF0dHJOcywgYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgRE9NLnNldEF0dHJpYnV0ZShyZW5kZXJFbGVtZW50LCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVWYWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChpc1ByZXNlbnQoYXR0ck5zKSkge1xuICAgICAgICBET00ucmVtb3ZlQXR0cmlidXRlTlMocmVuZGVyRWxlbWVudCwgYXR0ck5zLCBuc0FuZE5hbWVbMV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgRE9NLnJlbW92ZUF0dHJpYnV0ZShyZW5kZXJFbGVtZW50LCBhdHRyaWJ1dGVOYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXRCaW5kaW5nRGVidWdJbmZvKHJlbmRlckVsZW1lbnQ6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcsIHByb3BlcnR5VmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHZhciBkYXNoQ2FzZWRQcm9wZXJ0eU5hbWUgPSBjYW1lbENhc2VUb0Rhc2hDYXNlKHByb3BlcnR5TmFtZSk7XG4gICAgaWYgKERPTS5pc0NvbW1lbnROb2RlKHJlbmRlckVsZW1lbnQpKSB7XG4gICAgICB2YXIgZXhpc3RpbmdCaW5kaW5ncyA9IFJlZ0V4cFdyYXBwZXIuZmlyc3RNYXRjaChcbiAgICAgICAgICBURU1QTEFURV9CSU5ESU5HU19FWFAsIFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbChET00uZ2V0VGV4dChyZW5kZXJFbGVtZW50KSwgL1xcbi9nLCAnJykpO1xuICAgICAgdmFyIHBhcnNlZEJpbmRpbmdzID0gSnNvbi5wYXJzZShleGlzdGluZ0JpbmRpbmdzWzFdKTtcbiAgICAgIHBhcnNlZEJpbmRpbmdzW2Rhc2hDYXNlZFByb3BlcnR5TmFtZV0gPSBwcm9wZXJ0eVZhbHVlO1xuICAgICAgRE9NLnNldFRleHQocmVuZGVyRWxlbWVudCwgU3RyaW5nV3JhcHBlci5yZXBsYWNlKFRFTVBMQVRFX0NPTU1FTlRfVEVYVCwgJ3t9JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKc29uLnN0cmluZ2lmeShwYXJzZWRCaW5kaW5ncykpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRFbGVtZW50QXR0cmlidXRlKHJlbmRlckVsZW1lbnQsIHByb3BlcnR5TmFtZSwgcHJvcGVydHlWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgc2V0RWxlbWVudERlYnVnSW5mbyhyZW5kZXJFbGVtZW50OiBhbnksIGluZm86IFJlbmRlckRlYnVnSW5mbykge31cblxuICBzZXRFbGVtZW50Q2xhc3MocmVuZGVyRWxlbWVudDogYW55LCBjbGFzc05hbWU6IHN0cmluZywgaXNBZGQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoaXNBZGQpIHtcbiAgICAgIERPTS5hZGRDbGFzcyhyZW5kZXJFbGVtZW50LCBjbGFzc05hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBET00ucmVtb3ZlQ2xhc3MocmVuZGVyRWxlbWVudCwgY2xhc3NOYW1lKTtcbiAgICB9XG4gIH1cblxuICBzZXRFbGVtZW50U3R5bGUocmVuZGVyRWxlbWVudDogYW55LCBzdHlsZU5hbWU6IHN0cmluZywgc3R5bGVWYWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKGlzUHJlc2VudChzdHlsZVZhbHVlKSkge1xuICAgICAgRE9NLnNldFN0eWxlKHJlbmRlckVsZW1lbnQsIHN0eWxlTmFtZSwgc3RyaW5naWZ5KHN0eWxlVmFsdWUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgRE9NLnJlbW92ZVN0eWxlKHJlbmRlckVsZW1lbnQsIHN0eWxlTmFtZSk7XG4gICAgfVxuICB9XG5cbiAgaW52b2tlRWxlbWVudE1ldGhvZChyZW5kZXJFbGVtZW50OiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgYXJnczogYW55W10pOiB2b2lkIHtcbiAgICBET00uaW52b2tlKHJlbmRlckVsZW1lbnQsIG1ldGhvZE5hbWUsIGFyZ3MpO1xuICB9XG5cbiAgc2V0VGV4dChyZW5kZXJOb2RlOiBhbnksIHRleHQ6IHN0cmluZyk6IHZvaWQgeyBET00uc2V0VGV4dChyZW5kZXJOb2RlLCB0ZXh0KTsgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhbmltYXRpb25zIGlmIG5lY2Vzc2FyeVxuICAgKiBAcGFyYW0gbm9kZVxuICAgKi9cbiAgYW5pbWF0ZU5vZGVFbnRlcihub2RlOiBOb2RlKSB7XG4gICAgaWYgKERPTS5pc0VsZW1lbnROb2RlKG5vZGUpICYmIERPTS5oYXNDbGFzcyhub2RlLCAnbmctYW5pbWF0ZScpKSB7XG4gICAgICBET00uYWRkQ2xhc3Mobm9kZSwgJ25nLWVudGVyJyk7XG4gICAgICB0aGlzLl9yb290UmVuZGVyZXIuYW5pbWF0ZS5jc3MoKVxuICAgICAgICAgIC5hZGRBbmltYXRpb25DbGFzcygnbmctZW50ZXItYWN0aXZlJylcbiAgICAgICAgICAuc3RhcnQoPEhUTUxFbGVtZW50Pm5vZGUpXG4gICAgICAgICAgLm9uQ29tcGxldGUoKCkgPT4geyBET00ucmVtb3ZlQ2xhc3Mobm9kZSwgJ25nLWVudGVyJyk7IH0pO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIElmIGFuaW1hdGlvbnMgYXJlIG5lY2Vzc2FyeSwgcGVyZm9ybXMgYW5pbWF0aW9ucyB0aGVuIHJlbW92ZXMgdGhlIGVsZW1lbnQ7IG90aGVyd2lzZSwgaXQganVzdFxuICAgKiByZW1vdmVzIHRoZSBlbGVtZW50LlxuICAgKiBAcGFyYW0gbm9kZVxuICAgKi9cbiAgYW5pbWF0ZU5vZGVMZWF2ZShub2RlOiBOb2RlKSB7XG4gICAgaWYgKERPTS5pc0VsZW1lbnROb2RlKG5vZGUpICYmIERPTS5oYXNDbGFzcyhub2RlLCAnbmctYW5pbWF0ZScpKSB7XG4gICAgICBET00uYWRkQ2xhc3Mobm9kZSwgJ25nLWxlYXZlJyk7XG4gICAgICB0aGlzLl9yb290UmVuZGVyZXIuYW5pbWF0ZS5jc3MoKVxuICAgICAgICAgIC5hZGRBbmltYXRpb25DbGFzcygnbmctbGVhdmUtYWN0aXZlJylcbiAgICAgICAgICAuc3RhcnQoPEhUTUxFbGVtZW50Pm5vZGUpXG4gICAgICAgICAgLm9uQ29tcGxldGUoKCkgPT4ge1xuICAgICAgICAgICAgRE9NLnJlbW92ZUNsYXNzKG5vZGUsICduZy1sZWF2ZScpO1xuICAgICAgICAgICAgRE9NLnJlbW92ZShub2RlKTtcbiAgICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgRE9NLnJlbW92ZShub2RlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbW92ZU5vZGVzQWZ0ZXJTaWJsaW5nKHNpYmxpbmcsIG5vZGVzKSB7XG4gIHZhciBwYXJlbnQgPSBET00ucGFyZW50RWxlbWVudChzaWJsaW5nKTtcbiAgaWYgKG5vZGVzLmxlbmd0aCA+IDAgJiYgaXNQcmVzZW50KHBhcmVudCkpIHtcbiAgICB2YXIgbmV4dFNpYmxpbmcgPSBET00ubmV4dFNpYmxpbmcoc2libGluZyk7XG4gICAgaWYgKGlzUHJlc2VudChuZXh0U2libGluZykpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgRE9NLmluc2VydEJlZm9yZShuZXh0U2libGluZywgbm9kZXNbaV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIERPTS5hcHBlbmRDaGlsZChwYXJlbnQsIG5vZGVzW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwZW5kTm9kZXMocGFyZW50LCBub2Rlcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgRE9NLmFwcGVuZENoaWxkKHBhcmVudCwgbm9kZXNbaV0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlY29yYXRlUHJldmVudERlZmF1bHQoZXZlbnRIYW5kbGVyOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgcmV0dXJuIChldmVudCkgPT4ge1xuICAgIHZhciBhbGxvd0RlZmF1bHRCZWhhdmlvciA9IGV2ZW50SGFuZGxlcihldmVudCk7XG4gICAgaWYgKGFsbG93RGVmYXVsdEJlaGF2aW9yID09PSBmYWxzZSkge1xuICAgICAgLy8gVE9ETyh0Ym9zY2gpOiBtb3ZlIHByZXZlbnREZWZhdWx0IGludG8gZXZlbnQgcGx1Z2lucy4uLlxuICAgICAgRE9NLnByZXZlbnREZWZhdWx0KGV2ZW50KTtcbiAgICB9XG4gIH07XG59XG5cbnZhciBDT01QT05FTlRfUkVHRVggPSAvJUNPTVAlL2c7XG5leHBvcnQgY29uc3QgQ09NUE9ORU5UX1ZBUklBQkxFID0gJyVDT01QJSc7XG5leHBvcnQgY29uc3QgSE9TVF9BVFRSID0gYF9uZ2hvc3QtJHtDT01QT05FTlRfVkFSSUFCTEV9YDtcbmV4cG9ydCBjb25zdCBDT05URU5UX0FUVFIgPSBgX25nY29udGVudC0ke0NPTVBPTkVOVF9WQVJJQUJMRX1gO1xuXG5mdW5jdGlvbiBfc2hpbUNvbnRlbnRBdHRyaWJ1dGUoY29tcG9uZW50U2hvcnRJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbChDT05URU5UX0FUVFIsIENPTVBPTkVOVF9SRUdFWCwgY29tcG9uZW50U2hvcnRJZCk7XG59XG5cbmZ1bmN0aW9uIF9zaGltSG9zdEF0dHJpYnV0ZShjb21wb25lbnRTaG9ydElkOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsKEhPU1RfQVRUUiwgQ09NUE9ORU5UX1JFR0VYLCBjb21wb25lbnRTaG9ydElkKTtcbn1cblxuZnVuY3Rpb24gX2ZsYXR0ZW5TdHlsZXMoY29tcElkOiBzdHJpbmcsIHN0eWxlczogQXJyYXk8YW55IHwgYW55W10+LCB0YXJnZXQ6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzdHlsZSA9IHN0eWxlc1tpXTtcbiAgICBpZiAoaXNBcnJheShzdHlsZSkpIHtcbiAgICAgIF9mbGF0dGVuU3R5bGVzKGNvbXBJZCwgc3R5bGUsIHRhcmdldCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlID0gU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsKHN0eWxlLCBDT01QT05FTlRfUkVHRVgsIGNvbXBJZCk7XG4gICAgICB0YXJnZXQucHVzaChzdHlsZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbnZhciBOU19QUkVGSVhfUkUgPSAvXkAoW146XSspOiguKykvZztcblxuZnVuY3Rpb24gc3BsaXROYW1lc3BhY2UobmFtZTogc3RyaW5nKTogc3RyaW5nW10ge1xuICBpZiAobmFtZVswXSAhPSAnQCcpIHtcbiAgICByZXR1cm4gW251bGwsIG5hbWVdO1xuICB9XG4gIGxldCBtYXRjaCA9IFJlZ0V4cFdyYXBwZXIuZmlyc3RNYXRjaChOU19QUkVGSVhfUkUsIG5hbWUpO1xuICByZXR1cm4gW21hdGNoWzFdLCBtYXRjaFsyXV07XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
