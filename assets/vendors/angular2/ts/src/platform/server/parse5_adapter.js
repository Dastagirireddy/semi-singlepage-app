System.register(['angular2/src/facade/collection', 'angular2/platform/common_dom', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/compiler/selector', 'angular2/src/compiler/xhr'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var collection_1, common_dom_1, lang_1, exceptions_1, selector_1, xhr_1;
    var parse5, parser, serializer, treeAdapter, _attrToPropMap, defDoc, mapProps, Parse5DomAdapter, _HTMLElementPropertyList;
    function _notImplemented(methodName) {
        return new exceptions_1.BaseException('This method is not implemented in Parse5DomAdapter: ' + methodName);
    }
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (common_dom_1_1) {
                common_dom_1 = common_dom_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (selector_1_1) {
                selector_1 = selector_1_1;
            },
            function (xhr_1_1) {
                xhr_1 = xhr_1_1;
            }],
        execute: function() {
            parse5 = require('parse5/index');
            parser = new parse5.Parser(parse5.TreeAdapters.htmlparser2);
            serializer = new parse5.Serializer(parse5.TreeAdapters.htmlparser2);
            treeAdapter = parser.treeAdapter;
            _attrToPropMap = {
                'class': 'className',
                'innerHtml': 'innerHTML',
                'readonly': 'readOnly',
                'tabindex': 'tabIndex',
            };
            defDoc = null;
            mapProps = ['attribs', 'x-attribsNamespace', 'x-attribsPrefix'];
            /* tslint:disable:requireParameterType */
            Parse5DomAdapter = (function (_super) {
                __extends(Parse5DomAdapter, _super);
                function Parse5DomAdapter() {
                    _super.apply(this, arguments);
                }
                Parse5DomAdapter.makeCurrent = function () { common_dom_1.setRootDomAdapter(new Parse5DomAdapter()); };
                Parse5DomAdapter.prototype.hasProperty = function (element, name) {
                    return _HTMLElementPropertyList.indexOf(name) > -1;
                };
                // TODO(tbosch): don't even call this method when we run the tests on server side
                // by not using the DomRenderer in tests. Keeping this for now to make tests happy...
                Parse5DomAdapter.prototype.setProperty = function (el, name, value) {
                    if (name === 'innerHTML') {
                        this.setInnerHTML(el, value);
                    }
                    else if (name === 'className') {
                        el.attribs["class"] = el.className = value;
                    }
                    else {
                        el[name] = value;
                    }
                };
                // TODO(tbosch): don't even call this method when we run the tests on server side
                // by not using the DomRenderer in tests. Keeping this for now to make tests happy...
                Parse5DomAdapter.prototype.getProperty = function (el, name) { return el[name]; };
                Parse5DomAdapter.prototype.logError = function (error) { console.error(error); };
                Parse5DomAdapter.prototype.log = function (error) { console.log(error); };
                Parse5DomAdapter.prototype.logGroup = function (error) { console.error(error); };
                Parse5DomAdapter.prototype.logGroupEnd = function () { };
                Parse5DomAdapter.prototype.getXHR = function () { return xhr_1.XHR; };
                Object.defineProperty(Parse5DomAdapter.prototype, "attrToPropMap", {
                    get: function () { return _attrToPropMap; },
                    enumerable: true,
                    configurable: true
                });
                Parse5DomAdapter.prototype.query = function (selector) { throw _notImplemented('query'); };
                Parse5DomAdapter.prototype.querySelector = function (el, selector) { return this.querySelectorAll(el, selector)[0]; };
                Parse5DomAdapter.prototype.querySelectorAll = function (el, selector) {
                    var _this = this;
                    var res = [];
                    var _recursive = function (result, node, selector, matcher) {
                        var cNodes = node.childNodes;
                        if (cNodes && cNodes.length > 0) {
                            for (var i = 0; i < cNodes.length; i++) {
                                var childNode = cNodes[i];
                                if (_this.elementMatches(childNode, selector, matcher)) {
                                    result.push(childNode);
                                }
                                _recursive(result, childNode, selector, matcher);
                            }
                        }
                    };
                    var matcher = new selector_1.SelectorMatcher();
                    matcher.addSelectables(selector_1.CssSelector.parse(selector));
                    _recursive(res, el, selector, matcher);
                    return res;
                };
                Parse5DomAdapter.prototype.elementMatches = function (node, selector, matcher) {
                    if (matcher === void 0) { matcher = null; }
                    if (this.isElementNode(node) && selector === '*') {
                        return true;
                    }
                    var result = false;
                    if (selector && selector.charAt(0) == "#") {
                        result = this.getAttribute(node, 'id') == selector.substring(1);
                    }
                    else if (selector) {
                        var result = false;
                        if (matcher == null) {
                            matcher = new selector_1.SelectorMatcher();
                            matcher.addSelectables(selector_1.CssSelector.parse(selector));
                        }
                        var cssSelector = new selector_1.CssSelector();
                        cssSelector.setElement(this.tagName(node));
                        if (node.attribs) {
                            for (var attrName in node.attribs) {
                                cssSelector.addAttribute(attrName, node.attribs[attrName]);
                            }
                        }
                        var classList = this.classList(node);
                        for (var i = 0; i < classList.length; i++) {
                            cssSelector.addClassName(classList[i]);
                        }
                        matcher.match(cssSelector, function (selector, cb) { result = true; });
                    }
                    return result;
                };
                Parse5DomAdapter.prototype.on = function (el, evt, listener) {
                    var listenersMap = el._eventListenersMap;
                    if (lang_1.isBlank(listenersMap)) {
                        var listenersMap = collection_1.StringMapWrapper.create();
                        el._eventListenersMap = listenersMap;
                    }
                    var listeners = collection_1.StringMapWrapper.get(listenersMap, evt);
                    if (lang_1.isBlank(listeners)) {
                        listeners = [];
                    }
                    listeners.push(listener);
                    collection_1.StringMapWrapper.set(listenersMap, evt, listeners);
                };
                Parse5DomAdapter.prototype.onAndCancel = function (el, evt, listener) {
                    this.on(el, evt, listener);
                    return function () {
                        collection_1.ListWrapper.remove(collection_1.StringMapWrapper.get(el._eventListenersMap, evt), listener);
                    };
                };
                Parse5DomAdapter.prototype.dispatchEvent = function (el, evt) {
                    if (lang_1.isBlank(evt.target)) {
                        evt.target = el;
                    }
                    if (lang_1.isPresent(el._eventListenersMap)) {
                        var listeners = collection_1.StringMapWrapper.get(el._eventListenersMap, evt.type);
                        if (lang_1.isPresent(listeners)) {
                            for (var i = 0; i < listeners.length; i++) {
                                listeners[i](evt);
                            }
                        }
                    }
                    if (lang_1.isPresent(el.parent)) {
                        this.dispatchEvent(el.parent, evt);
                    }
                    if (lang_1.isPresent(el._window)) {
                        this.dispatchEvent(el._window, evt);
                    }
                };
                Parse5DomAdapter.prototype.createMouseEvent = function (eventType) { return this.createEvent(eventType); };
                Parse5DomAdapter.prototype.createEvent = function (eventType) {
                    var evt = {
                        type: eventType,
                        defaultPrevented: false,
                        preventDefault: function () { evt.defaultPrevented = true; }
                    };
                    return evt;
                };
                Parse5DomAdapter.prototype.preventDefault = function (evt) { evt.returnValue = false; };
                Parse5DomAdapter.prototype.isPrevented = function (evt) { return lang_1.isPresent(evt.returnValue) && !evt.returnValue; };
                Parse5DomAdapter.prototype.getInnerHTML = function (el) { return serializer.serialize(this.templateAwareRoot(el)); };
                Parse5DomAdapter.prototype.getOuterHTML = function (el) {
                    serializer.html = '';
                    serializer._serializeElement(el);
                    return serializer.html;
                };
                Parse5DomAdapter.prototype.nodeName = function (node) { return node.tagName; };
                Parse5DomAdapter.prototype.nodeValue = function (node) { return node.nodeValue; };
                Parse5DomAdapter.prototype.type = function (node) { throw _notImplemented('type'); };
                Parse5DomAdapter.prototype.content = function (node) { return node.childNodes[0]; };
                Parse5DomAdapter.prototype.firstChild = function (el) { return el.firstChild; };
                Parse5DomAdapter.prototype.nextSibling = function (el) { return el.nextSibling; };
                Parse5DomAdapter.prototype.parentElement = function (el) { return el.parent; };
                Parse5DomAdapter.prototype.childNodes = function (el) { return el.childNodes; };
                Parse5DomAdapter.prototype.childNodesAsList = function (el) {
                    var childNodes = el.childNodes;
                    var res = collection_1.ListWrapper.createFixedSize(childNodes.length);
                    for (var i = 0; i < childNodes.length; i++) {
                        res[i] = childNodes[i];
                    }
                    return res;
                };
                Parse5DomAdapter.prototype.clearNodes = function (el) {
                    while (el.childNodes.length > 0) {
                        this.remove(el.childNodes[0]);
                    }
                };
                Parse5DomAdapter.prototype.appendChild = function (el, node) {
                    this.remove(node);
                    treeAdapter.appendChild(this.templateAwareRoot(el), node);
                };
                Parse5DomAdapter.prototype.removeChild = function (el, node) {
                    if (collection_1.ListWrapper.contains(el.childNodes, node)) {
                        this.remove(node);
                    }
                };
                Parse5DomAdapter.prototype.remove = function (el) {
                    var parent = el.parent;
                    if (parent) {
                        var index = parent.childNodes.indexOf(el);
                        parent.childNodes.splice(index, 1);
                    }
                    var prev = el.previousSibling;
                    var next = el.nextSibling;
                    if (prev) {
                        prev.next = next;
                    }
                    if (next) {
                        next.prev = prev;
                    }
                    el.prev = null;
                    el.next = null;
                    el.parent = null;
                    return el;
                };
                Parse5DomAdapter.prototype.insertBefore = function (el, node) {
                    this.remove(node);
                    treeAdapter.insertBefore(el.parent, node, el);
                };
                Parse5DomAdapter.prototype.insertAllBefore = function (el, nodes) {
                    var _this = this;
                    nodes.forEach(function (n) { return _this.insertBefore(el, n); });
                };
                Parse5DomAdapter.prototype.insertAfter = function (el, node) {
                    if (el.nextSibling) {
                        this.insertBefore(el.nextSibling, node);
                    }
                    else {
                        this.appendChild(el.parent, node);
                    }
                };
                Parse5DomAdapter.prototype.setInnerHTML = function (el, value) {
                    this.clearNodes(el);
                    var content = parser.parseFragment(value);
                    for (var i = 0; i < content.childNodes.length; i++) {
                        treeAdapter.appendChild(el, content.childNodes[i]);
                    }
                };
                Parse5DomAdapter.prototype.getText = function (el, isRecursive) {
                    if (this.isTextNode(el)) {
                        return el.data;
                    }
                    else if (this.isCommentNode(el)) {
                        // In the DOM, comments within an element return an empty string for textContent
                        // However, comment node instances return the comment content for textContent getter
                        return isRecursive ? '' : el.data;
                    }
                    else if (lang_1.isBlank(el.childNodes) || el.childNodes.length == 0) {
                        return "";
                    }
                    else {
                        var textContent = "";
                        for (var i = 0; i < el.childNodes.length; i++) {
                            textContent += this.getText(el.childNodes[i], true);
                        }
                        return textContent;
                    }
                };
                Parse5DomAdapter.prototype.setText = function (el, value) {
                    if (this.isTextNode(el) || this.isCommentNode(el)) {
                        el.data = value;
                    }
                    else {
                        this.clearNodes(el);
                        if (value !== '')
                            treeAdapter.insertText(el, value);
                    }
                };
                Parse5DomAdapter.prototype.getValue = function (el) { return el.value; };
                Parse5DomAdapter.prototype.setValue = function (el, value) { el.value = value; };
                Parse5DomAdapter.prototype.getChecked = function (el) { return el.checked; };
                Parse5DomAdapter.prototype.setChecked = function (el, value) { el.checked = value; };
                Parse5DomAdapter.prototype.createComment = function (text) { return treeAdapter.createCommentNode(text); };
                Parse5DomAdapter.prototype.createTemplate = function (html) {
                    var template = treeAdapter.createElement("template", 'http://www.w3.org/1999/xhtml', []);
                    var content = parser.parseFragment(html);
                    treeAdapter.appendChild(template, content);
                    return template;
                };
                Parse5DomAdapter.prototype.createElement = function (tagName) {
                    return treeAdapter.createElement(tagName, 'http://www.w3.org/1999/xhtml', []);
                };
                Parse5DomAdapter.prototype.createElementNS = function (ns, tagName) { return treeAdapter.createElement(tagName, ns, []); };
                Parse5DomAdapter.prototype.createTextNode = function (text) {
                    var t = this.createComment(text);
                    t.type = 'text';
                    return t;
                };
                Parse5DomAdapter.prototype.createScriptTag = function (attrName, attrValue) {
                    return treeAdapter.createElement("script", 'http://www.w3.org/1999/xhtml', [{ name: attrName, value: attrValue }]);
                };
                Parse5DomAdapter.prototype.createStyleElement = function (css) {
                    var style = this.createElement('style');
                    this.setText(style, css);
                    return style;
                };
                Parse5DomAdapter.prototype.createShadowRoot = function (el) {
                    el.shadowRoot = treeAdapter.createDocumentFragment();
                    el.shadowRoot.parent = el;
                    return el.shadowRoot;
                };
                Parse5DomAdapter.prototype.getShadowRoot = function (el) { return el.shadowRoot; };
                Parse5DomAdapter.prototype.getHost = function (el) { return el.host; };
                Parse5DomAdapter.prototype.getDistributedNodes = function (el) { throw _notImplemented('getDistributedNodes'); };
                Parse5DomAdapter.prototype.clone = function (node) {
                    var _recursive = function (node) {
                        var nodeClone = Object.create(Object.getPrototypeOf(node));
                        for (var prop in node) {
                            var desc = Object.getOwnPropertyDescriptor(node, prop);
                            if (desc && 'value' in desc && typeof desc.value !== 'object') {
                                nodeClone[prop] = node[prop];
                            }
                        }
                        nodeClone.parent = null;
                        nodeClone.prev = null;
                        nodeClone.next = null;
                        nodeClone.children = null;
                        mapProps.forEach(function (mapName) {
                            if (lang_1.isPresent(node[mapName])) {
                                nodeClone[mapName] = {};
                                for (var prop in node[mapName]) {
                                    nodeClone[mapName][prop] = node[mapName][prop];
                                }
                            }
                        });
                        var cNodes = node.children;
                        if (cNodes) {
                            var cNodesClone = new Array(cNodes.length);
                            for (var i = 0; i < cNodes.length; i++) {
                                var childNode = cNodes[i];
                                var childNodeClone = _recursive(childNode);
                                cNodesClone[i] = childNodeClone;
                                if (i > 0) {
                                    childNodeClone.prev = cNodesClone[i - 1];
                                    cNodesClone[i - 1].next = childNodeClone;
                                }
                                childNodeClone.parent = nodeClone;
                            }
                            nodeClone.children = cNodesClone;
                        }
                        return nodeClone;
                    };
                    return _recursive(node);
                };
                Parse5DomAdapter.prototype.getElementsByClassName = function (element, name) {
                    return this.querySelectorAll(element, "." + name);
                };
                Parse5DomAdapter.prototype.getElementsByTagName = function (element, name) {
                    throw _notImplemented('getElementsByTagName');
                };
                Parse5DomAdapter.prototype.classList = function (element) {
                    var classAttrValue = null;
                    var attributes = element.attribs;
                    if (attributes && attributes.hasOwnProperty("class")) {
                        classAttrValue = attributes["class"];
                    }
                    return classAttrValue ? classAttrValue.trim().split(/\s+/g) : [];
                };
                Parse5DomAdapter.prototype.addClass = function (element, className) {
                    var classList = this.classList(element);
                    var index = classList.indexOf(className);
                    if (index == -1) {
                        classList.push(className);
                        element.attribs["class"] = element.className = classList.join(" ");
                    }
                };
                Parse5DomAdapter.prototype.removeClass = function (element, className) {
                    var classList = this.classList(element);
                    var index = classList.indexOf(className);
                    if (index > -1) {
                        classList.splice(index, 1);
                        element.attribs["class"] = element.className = classList.join(" ");
                    }
                };
                Parse5DomAdapter.prototype.hasClass = function (element, className) {
                    return collection_1.ListWrapper.contains(this.classList(element), className);
                };
                Parse5DomAdapter.prototype.hasStyle = function (element, styleName, styleValue) {
                    if (styleValue === void 0) { styleValue = null; }
                    var value = this.getStyle(element, styleName) || '';
                    return styleValue ? value == styleValue : value.length > 0;
                };
                /** @internal */
                Parse5DomAdapter.prototype._readStyleAttribute = function (element) {
                    var styleMap = {};
                    var attributes = element.attribs;
                    if (attributes && attributes.hasOwnProperty("style")) {
                        var styleAttrValue = attributes["style"];
                        var styleList = styleAttrValue.split(/;+/g);
                        for (var i = 0; i < styleList.length; i++) {
                            if (styleList[i].length > 0) {
                                var elems = styleList[i].split(/:+/g);
                                styleMap[elems[0].trim()] = elems[1].trim();
                            }
                        }
                    }
                    return styleMap;
                };
                /** @internal */
                Parse5DomAdapter.prototype._writeStyleAttribute = function (element, styleMap) {
                    var styleAttrValue = "";
                    for (var key in styleMap) {
                        var newValue = styleMap[key];
                        if (newValue && newValue.length > 0) {
                            styleAttrValue += key + ":" + styleMap[key] + ";";
                        }
                    }
                    element.attribs["style"] = styleAttrValue;
                };
                Parse5DomAdapter.prototype.setStyle = function (element, styleName, styleValue) {
                    var styleMap = this._readStyleAttribute(element);
                    styleMap[styleName] = styleValue;
                    this._writeStyleAttribute(element, styleMap);
                };
                Parse5DomAdapter.prototype.removeStyle = function (element, styleName) { this.setStyle(element, styleName, null); };
                Parse5DomAdapter.prototype.getStyle = function (element, styleName) {
                    var styleMap = this._readStyleAttribute(element);
                    return styleMap.hasOwnProperty(styleName) ? styleMap[styleName] : "";
                };
                Parse5DomAdapter.prototype.tagName = function (element) { return element.tagName == "style" ? "STYLE" : element.tagName; };
                Parse5DomAdapter.prototype.attributeMap = function (element) {
                    var res = new Map();
                    var elAttrs = treeAdapter.getAttrList(element);
                    for (var i = 0; i < elAttrs.length; i++) {
                        var attrib = elAttrs[i];
                        res.set(attrib.name, attrib.value);
                    }
                    return res;
                };
                Parse5DomAdapter.prototype.hasAttribute = function (element, attribute) {
                    return element.attribs && element.attribs.hasOwnProperty(attribute);
                };
                Parse5DomAdapter.prototype.hasAttributeNS = function (element, ns, attribute) { throw 'not implemented'; };
                Parse5DomAdapter.prototype.getAttribute = function (element, attribute) {
                    return element.attribs && element.attribs.hasOwnProperty(attribute) ?
                        element.attribs[attribute] :
                        null;
                };
                Parse5DomAdapter.prototype.getAttributeNS = function (element, ns, attribute) { throw 'not implemented'; };
                Parse5DomAdapter.prototype.setAttribute = function (element, attribute, value) {
                    if (attribute) {
                        element.attribs[attribute] = value;
                        if (attribute === 'class') {
                            element.className = value;
                        }
                    }
                };
                Parse5DomAdapter.prototype.setAttributeNS = function (element, ns, attribute, value) { throw 'not implemented'; };
                Parse5DomAdapter.prototype.removeAttribute = function (element, attribute) {
                    if (attribute) {
                        collection_1.StringMapWrapper.delete(element.attribs, attribute);
                    }
                };
                Parse5DomAdapter.prototype.removeAttributeNS = function (element, ns, name) { throw 'not implemented'; };
                Parse5DomAdapter.prototype.templateAwareRoot = function (el) { return this.isTemplateElement(el) ? this.content(el) : el; };
                Parse5DomAdapter.prototype.createHtmlDocument = function () {
                    var newDoc = treeAdapter.createDocument();
                    newDoc.title = "fake title";
                    var head = treeAdapter.createElement("head", null, []);
                    var body = treeAdapter.createElement("body", 'http://www.w3.org/1999/xhtml', []);
                    this.appendChild(newDoc, head);
                    this.appendChild(newDoc, body);
                    collection_1.StringMapWrapper.set(newDoc, "head", head);
                    collection_1.StringMapWrapper.set(newDoc, "body", body);
                    collection_1.StringMapWrapper.set(newDoc, "_window", collection_1.StringMapWrapper.create());
                    return newDoc;
                };
                Parse5DomAdapter.prototype.defaultDoc = function () {
                    if (defDoc === null) {
                        defDoc = this.createHtmlDocument();
                    }
                    return defDoc;
                };
                Parse5DomAdapter.prototype.getBoundingClientRect = function (el) { return { left: 0, top: 0, width: 0, height: 0 }; };
                Parse5DomAdapter.prototype.getTitle = function () { return this.defaultDoc().title || ""; };
                Parse5DomAdapter.prototype.setTitle = function (newTitle) { this.defaultDoc().title = newTitle; };
                Parse5DomAdapter.prototype.isTemplateElement = function (el) {
                    return this.isElementNode(el) && this.tagName(el) === "template";
                };
                Parse5DomAdapter.prototype.isTextNode = function (node) { return treeAdapter.isTextNode(node); };
                Parse5DomAdapter.prototype.isCommentNode = function (node) { return treeAdapter.isCommentNode(node); };
                Parse5DomAdapter.prototype.isElementNode = function (node) { return node ? treeAdapter.isElementNode(node) : false; };
                Parse5DomAdapter.prototype.hasShadowRoot = function (node) { return lang_1.isPresent(node.shadowRoot); };
                Parse5DomAdapter.prototype.isShadowRoot = function (node) { return this.getShadowRoot(node) == node; };
                Parse5DomAdapter.prototype.importIntoDoc = function (node) { return this.clone(node); };
                Parse5DomAdapter.prototype.adoptNode = function (node) { return node; };
                Parse5DomAdapter.prototype.getHref = function (el) { return el.href; };
                Parse5DomAdapter.prototype.resolveAndSetHref = function (el, baseUrl, href) {
                    if (href == null) {
                        el.href = baseUrl;
                    }
                    else {
                        el.href = baseUrl + '/../' + href;
                    }
                };
                /** @internal */
                Parse5DomAdapter.prototype._buildRules = function (parsedRules, css) {
                    var rules = [];
                    for (var i = 0; i < parsedRules.length; i++) {
                        var parsedRule = parsedRules[i];
                        var rule = collection_1.StringMapWrapper.create();
                        collection_1.StringMapWrapper.set(rule, "cssText", css);
                        collection_1.StringMapWrapper.set(rule, "style", { content: "", cssText: "" });
                        if (parsedRule.type == "rule") {
                            collection_1.StringMapWrapper.set(rule, "type", 1);
                            collection_1.StringMapWrapper.set(rule, "selectorText", parsedRule.selectors.join(", ")
                                .replace(/\s{2,}/g, " ")
                                .replace(/\s*~\s*/g, " ~ ")
                                .replace(/\s*\+\s*/g, " + ")
                                .replace(/\s*>\s*/g, " > ")
                                .replace(/\[(\w+)=(\w+)\]/g, '[$1="$2"]'));
                            if (lang_1.isBlank(parsedRule.declarations)) {
                                continue;
                            }
                            for (var j = 0; j < parsedRule.declarations.length; j++) {
                                var declaration = parsedRule.declarations[j];
                                collection_1.StringMapWrapper.set(collection_1.StringMapWrapper.get(rule, "style"), declaration.property, declaration.value);
                                collection_1.StringMapWrapper.get(rule, "style").cssText +=
                                    declaration.property + ": " + declaration.value + ";";
                            }
                        }
                        else if (parsedRule.type == "media") {
                            collection_1.StringMapWrapper.set(rule, "type", 4);
                            collection_1.StringMapWrapper.set(rule, "media", { mediaText: parsedRule.media });
                            if (parsedRule.rules) {
                                collection_1.StringMapWrapper.set(rule, "cssRules", this._buildRules(parsedRule.rules));
                            }
                        }
                        rules.push(rule);
                    }
                    return rules;
                };
                Parse5DomAdapter.prototype.supportsDOMEvents = function () { return false; };
                Parse5DomAdapter.prototype.supportsNativeShadowDOM = function () { return false; };
                Parse5DomAdapter.prototype.getGlobalEventTarget = function (target) {
                    if (target == "window") {
                        return this.defaultDoc()._window;
                    }
                    else if (target == "document") {
                        return this.defaultDoc();
                    }
                    else if (target == "body") {
                        return this.defaultDoc().body;
                    }
                };
                Parse5DomAdapter.prototype.getBaseHref = function () { throw 'not implemented'; };
                Parse5DomAdapter.prototype.resetBaseElement = function () { throw 'not implemented'; };
                Parse5DomAdapter.prototype.getHistory = function () { throw 'not implemented'; };
                Parse5DomAdapter.prototype.getLocation = function () { throw 'not implemented'; };
                Parse5DomAdapter.prototype.getUserAgent = function () { return "Fake user agent"; };
                Parse5DomAdapter.prototype.getData = function (el, name) { return this.getAttribute(el, 'data-' + name); };
                Parse5DomAdapter.prototype.getComputedStyle = function (el) { throw 'not implemented'; };
                Parse5DomAdapter.prototype.setData = function (el, name, value) { this.setAttribute(el, 'data-' + name, value); };
                // TODO(tbosch): move this into a separate environment class once we have it
                Parse5DomAdapter.prototype.setGlobalVar = function (path, value) { lang_1.setValueOnPath(lang_1.global, path, value); };
                Parse5DomAdapter.prototype.requestAnimationFrame = function (callback) { return setTimeout(callback, 0); };
                Parse5DomAdapter.prototype.cancelAnimationFrame = function (id) { clearTimeout(id); };
                Parse5DomAdapter.prototype.performanceNow = function () { return lang_1.DateWrapper.toMillis(lang_1.DateWrapper.now()); };
                Parse5DomAdapter.prototype.getAnimationPrefix = function () { return ''; };
                Parse5DomAdapter.prototype.getTransitionEnd = function () { return 'transitionend'; };
                Parse5DomAdapter.prototype.supportsAnimation = function () { return true; };
                Parse5DomAdapter.prototype.replaceChild = function (el, newNode, oldNode) { throw new Error('not implemented'); };
                Parse5DomAdapter.prototype.parse = function (templateHtml) { throw new Error('not implemented'); };
                Parse5DomAdapter.prototype.invoke = function (el, methodName, args) { throw new Error('not implemented'); };
                Parse5DomAdapter.prototype.getEventKey = function (event) { throw new Error('not implemented'); };
                return Parse5DomAdapter;
            }(common_dom_1.DomAdapter));
            exports_1("Parse5DomAdapter", Parse5DomAdapter);
            // TODO: build a proper list, this one is all the keys of a HTMLInputElement
            _HTMLElementPropertyList = [
                "webkitEntries",
                "incremental",
                "webkitdirectory",
                "selectionDirection",
                "selectionEnd",
                "selectionStart",
                "labels",
                "validationMessage",
                "validity",
                "willValidate",
                "width",
                "valueAsNumber",
                "valueAsDate",
                "value",
                "useMap",
                "defaultValue",
                "type",
                "step",
                "src",
                "size",
                "required",
                "readOnly",
                "placeholder",
                "pattern",
                "name",
                "multiple",
                "min",
                "minLength",
                "maxLength",
                "max",
                "list",
                "indeterminate",
                "height",
                "formTarget",
                "formNoValidate",
                "formMethod",
                "formEnctype",
                "formAction",
                "files",
                "form",
                "disabled",
                "dirName",
                "checked",
                "defaultChecked",
                "autofocus",
                "autocomplete",
                "alt",
                "align",
                "accept",
                "onautocompleteerror",
                "onautocomplete",
                "onwaiting",
                "onvolumechange",
                "ontoggle",
                "ontimeupdate",
                "onsuspend",
                "onsubmit",
                "onstalled",
                "onshow",
                "onselect",
                "onseeking",
                "onseeked",
                "onscroll",
                "onresize",
                "onreset",
                "onratechange",
                "onprogress",
                "onplaying",
                "onplay",
                "onpause",
                "onmousewheel",
                "onmouseup",
                "onmouseover",
                "onmouseout",
                "onmousemove",
                "onmouseleave",
                "onmouseenter",
                "onmousedown",
                "onloadstart",
                "onloadedmetadata",
                "onloadeddata",
                "onload",
                "onkeyup",
                "onkeypress",
                "onkeydown",
                "oninvalid",
                "oninput",
                "onfocus",
                "onerror",
                "onended",
                "onemptied",
                "ondurationchange",
                "ondrop",
                "ondragstart",
                "ondragover",
                "ondragleave",
                "ondragenter",
                "ondragend",
                "ondrag",
                "ondblclick",
                "oncuechange",
                "oncontextmenu",
                "onclose",
                "onclick",
                "onchange",
                "oncanplaythrough",
                "oncanplay",
                "oncancel",
                "onblur",
                "onabort",
                "spellcheck",
                "isContentEditable",
                "contentEditable",
                "outerText",
                "innerText",
                "accessKey",
                "hidden",
                "webkitdropzone",
                "draggable",
                "tabIndex",
                "dir",
                "translate",
                "lang",
                "title",
                "childElementCount",
                "lastElementChild",
                "firstElementChild",
                "children",
                "onwebkitfullscreenerror",
                "onwebkitfullscreenchange",
                "nextElementSibling",
                "previousElementSibling",
                "onwheel",
                "onselectstart",
                "onsearch",
                "onpaste",
                "oncut",
                "oncopy",
                "onbeforepaste",
                "onbeforecut",
                "onbeforecopy",
                "shadowRoot",
                "dataset",
                "classList",
                "className",
                "outerHTML",
                "innerHTML",
                "scrollHeight",
                "scrollWidth",
                "scrollTop",
                "scrollLeft",
                "clientHeight",
                "clientWidth",
                "clientTop",
                "clientLeft",
                "offsetParent",
                "offsetHeight",
                "offsetWidth",
                "offsetTop",
                "offsetLeft",
                "localName",
                "prefix",
                "namespaceURI",
                "id",
                "style",
                "attributes",
                "tagName",
                "parentElement",
                "textContent",
                "baseURI",
                "ownerDocument",
                "nextSibling",
                "previousSibling",
                "lastChild",
                "firstChild",
                "childNodes",
                "parentNode",
                "nodeType",
                "nodeValue",
                "nodeName",
                "closure_lm_714617",
                "__jsaction"
            ];
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9zZXJ2ZXIvcGFyc2U1X2FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O1FBQUksTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEVBQ1YsV0FBVyxFQWdCWCxjQUFjLEVBTWQsTUFBTSxFQUVOLFFBQVEsb0JBMGhCUix3QkFBd0I7SUF4aEI1Qix5QkFBeUIsVUFBVTtRQUNqQyxNQUFNLENBQUMsSUFBSSwwQkFBYSxDQUFDLHNEQUFzRCxHQUFHLFVBQVUsQ0FBQyxDQUFDO0lBQ2hHLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUEvQkcsTUFBTSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNqQyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDNUQsVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3BFLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBZ0JqQyxjQUFjLEdBQTRCO2dCQUM1QyxPQUFPLEVBQUUsV0FBVztnQkFDcEIsV0FBVyxFQUFFLFdBQVc7Z0JBQ3hCLFVBQVUsRUFBRSxVQUFVO2dCQUN0QixVQUFVLEVBQUUsVUFBVTthQUN2QixDQUFDO1lBQ0UsTUFBTSxHQUFHLElBQUksQ0FBQztZQUVkLFFBQVEsR0FBRyxDQUFDLFNBQVMsRUFBRSxvQkFBb0IsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBTXBFLHlDQUF5QztZQUN6QztnQkFBc0Msb0NBQVU7Z0JBQWhEO29CQUFzQyw4QkFBVTtnQkFnaEJoRCxDQUFDO2dCQS9nQlEsNEJBQVcsR0FBbEIsY0FBdUIsOEJBQWlCLENBQUMsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVuRSxz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LFdBQVc7Z0JBQ1gsV0FBVztnQkFDWCxRQUFRO2dCQUNSLGdCQUFnQjtnQkFDaEIsV0FBVztnQkFDWCxVQUFVO2dCQUNWLEtBQUs7Z0JBQ0wsV0FBVztnQkFDWCxNQUFNO2dCQUNOLE9BQU87Z0JBQ1AsbUJBQW1CO2dCQUNuQixrQkFBa0I7Z0JBQ2xCLG1CQUFtQjtnQkFDbkIsVUFBVTtnQkFDVix5QkFBeUI7Z0JBQ3pCLDBCQUEwQjtnQkFDMUIsb0JBQW9CO2dCQUNwQix3QkFBd0I7Z0JBQ3hCLFNBQVM7Z0JBQ1QsZUFBZTtnQkFDZixVQUFVO2dCQUNWLFNBQVM7Z0JBQ1QsT0FBTztnQkFDUCxRQUFRO2dCQUNSLGVBQWU7Z0JBQ2YsYUFBYTtnQkFDYixjQUFjO2dCQUNkLFlBQVk7Z0JBQ1osU0FBUztnQkFDVCxXQUFXO2dCQUNYLFdBQVc7Z0JBQ1gsV0FBVztnQkFDWCxXQUFXO2dCQUNYLGNBQWM7Z0JBQ2QsYUFBYTtnQkFDYixXQUFXO2dCQUNYLFlBQVk7Z0JBQ1osY0FBYztnQkFDZCxhQUFhO2dCQUNiLFdBQVc7Z0JBQ1gsWUFBWTtnQkFDWixjQUFjO2dCQUNkLGNBQWM7Z0JBQ2QsYUFBYTtnQkFDYixXQUFXO2dCQUNYLFlBQVk7Z0JBQ1osV0FBVztnQkFDWCxRQUFRO2dCQUNSLGNBQWM7Z0JBQ2QsSUFBSTtnQkFDSixPQUFPO2dCQUNQLFlBQVk7Z0JBQ1osU0FBUztnQkFDVCxlQUFlO2dCQUNmLGFBQWE7Z0JBQ2IsU0FBUztnQkFDVCxlQUFlO2dCQUNmLGFBQWE7Z0JBQ2IsaUJBQWlCO2dCQUNqQixXQUFXO2dCQUNYLFlBQVk7Z0JBQ1osWUFBWTtnQkFDWixZQUFZO2dCQUNaLFVBQVU7Z0JBQ1YsV0FBVztnQkFDWCxVQUFVO2dCQUNWLG1CQUFtQjtnQkFDbkIsWUFBWTthQUNiLENBQUMiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL3NlcnZlci9wYXJzZTVfYWRhcHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBwYXJzZTUgPSByZXF1aXJlKCdwYXJzZTUvaW5kZXgnKTtcbnZhciBwYXJzZXIgPSBuZXcgcGFyc2U1LlBhcnNlcihwYXJzZTUuVHJlZUFkYXB0ZXJzLmh0bWxwYXJzZXIyKTtcbnZhciBzZXJpYWxpemVyID0gbmV3IHBhcnNlNS5TZXJpYWxpemVyKHBhcnNlNS5UcmVlQWRhcHRlcnMuaHRtbHBhcnNlcjIpO1xudmFyIHRyZWVBZGFwdGVyID0gcGFyc2VyLnRyZWVBZGFwdGVyO1xuXG5pbXBvcnQge01hcFdyYXBwZXIsIExpc3RXcmFwcGVyLCBTdHJpbmdNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtEb21BZGFwdGVyLCBzZXRSb290RG9tQWRhcHRlcn0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vY29tbW9uX2RvbSc7XG5pbXBvcnQge1xuICBpc1ByZXNlbnQsXG4gIGlzQmxhbmssXG4gIGdsb2JhbCxcbiAgVHlwZSxcbiAgc2V0VmFsdWVPblBhdGgsXG4gIERhdGVXcmFwcGVyXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb24sIFdyYXBwZWRFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge1NlbGVjdG9yTWF0Y2hlciwgQ3NzU2VsZWN0b3J9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9zZWxlY3Rvcic7XG5pbXBvcnQge1hIUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3hocic7XG5cbnZhciBfYXR0clRvUHJvcE1hcDoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICdjbGFzcyc6ICdjbGFzc05hbWUnLFxuICAnaW5uZXJIdG1sJzogJ2lubmVySFRNTCcsXG4gICdyZWFkb25seSc6ICdyZWFkT25seScsXG4gICd0YWJpbmRleCc6ICd0YWJJbmRleCcsXG59O1xudmFyIGRlZkRvYyA9IG51bGw7XG5cbnZhciBtYXBQcm9wcyA9IFsnYXR0cmlicycsICd4LWF0dHJpYnNOYW1lc3BhY2UnLCAneC1hdHRyaWJzUHJlZml4J107XG5cbmZ1bmN0aW9uIF9ub3RJbXBsZW1lbnRlZChtZXRob2ROYW1lKSB7XG4gIHJldHVybiBuZXcgQmFzZUV4Y2VwdGlvbignVGhpcyBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkIGluIFBhcnNlNURvbUFkYXB0ZXI6ICcgKyBtZXRob2ROYW1lKTtcbn1cblxuLyogdHNsaW50OmRpc2FibGU6cmVxdWlyZVBhcmFtZXRlclR5cGUgKi9cbmV4cG9ydCBjbGFzcyBQYXJzZTVEb21BZGFwdGVyIGV4dGVuZHMgRG9tQWRhcHRlciB7XG4gIHN0YXRpYyBtYWtlQ3VycmVudCgpIHsgc2V0Um9vdERvbUFkYXB0ZXIobmV3IFBhcnNlNURvbUFkYXB0ZXIoKSk7IH1cblxuICBoYXNQcm9wZXJ0eShlbGVtZW50LCBuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gX0hUTUxFbGVtZW50UHJvcGVydHlMaXN0LmluZGV4T2YobmFtZSkgPiAtMTtcbiAgfVxuICAvLyBUT0RPKHRib3NjaCk6IGRvbid0IGV2ZW4gY2FsbCB0aGlzIG1ldGhvZCB3aGVuIHdlIHJ1biB0aGUgdGVzdHMgb24gc2VydmVyIHNpZGVcbiAgLy8gYnkgbm90IHVzaW5nIHRoZSBEb21SZW5kZXJlciBpbiB0ZXN0cy4gS2VlcGluZyB0aGlzIGZvciBub3cgdG8gbWFrZSB0ZXN0cyBoYXBweS4uLlxuICBzZXRQcm9wZXJ0eShlbDogLyplbGVtZW50Ki8gYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICBpZiAobmFtZSA9PT0gJ2lubmVySFRNTCcpIHtcbiAgICAgIHRoaXMuc2V0SW5uZXJIVE1MKGVsLCB2YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChuYW1lID09PSAnY2xhc3NOYW1lJykge1xuICAgICAgZWwuYXR0cmlic1tcImNsYXNzXCJdID0gZWwuY2xhc3NOYW1lID0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsW25hbWVdID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIC8vIFRPRE8odGJvc2NoKTogZG9uJ3QgZXZlbiBjYWxsIHRoaXMgbWV0aG9kIHdoZW4gd2UgcnVuIHRoZSB0ZXN0cyBvbiBzZXJ2ZXIgc2lkZVxuICAvLyBieSBub3QgdXNpbmcgdGhlIERvbVJlbmRlcmVyIGluIHRlc3RzLiBLZWVwaW5nIHRoaXMgZm9yIG5vdyB0byBtYWtlIHRlc3RzIGhhcHB5Li4uXG4gIGdldFByb3BlcnR5KGVsOiAvKmVsZW1lbnQqLyBhbnksIG5hbWU6IHN0cmluZyk6IGFueSB7IHJldHVybiBlbFtuYW1lXTsgfVxuXG4gIGxvZ0Vycm9yKGVycm9yKSB7IGNvbnNvbGUuZXJyb3IoZXJyb3IpOyB9XG5cbiAgbG9nKGVycm9yKSB7IGNvbnNvbGUubG9nKGVycm9yKTsgfVxuXG4gIGxvZ0dyb3VwKGVycm9yKSB7IGNvbnNvbGUuZXJyb3IoZXJyb3IpOyB9XG5cbiAgbG9nR3JvdXBFbmQoKSB7fVxuXG4gIGdldFhIUigpOiBUeXBlIHsgcmV0dXJuIFhIUjsgfVxuXG4gIGdldCBhdHRyVG9Qcm9wTWFwKCkgeyByZXR1cm4gX2F0dHJUb1Byb3BNYXA7IH1cblxuICBxdWVyeShzZWxlY3RvcikgeyB0aHJvdyBfbm90SW1wbGVtZW50ZWQoJ3F1ZXJ5Jyk7IH1cbiAgcXVlcnlTZWxlY3RvcihlbCwgc2VsZWN0b3I6IHN0cmluZyk6IGFueSB7IHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoZWwsIHNlbGVjdG9yKVswXTsgfVxuICBxdWVyeVNlbGVjdG9yQWxsKGVsLCBzZWxlY3Rvcjogc3RyaW5nKTogYW55W10ge1xuICAgIHZhciByZXMgPSBbXTtcbiAgICB2YXIgX3JlY3Vyc2l2ZSA9IChyZXN1bHQsIG5vZGUsIHNlbGVjdG9yLCBtYXRjaGVyKSA9PiB7XG4gICAgICB2YXIgY05vZGVzID0gbm9kZS5jaGlsZE5vZGVzO1xuICAgICAgaWYgKGNOb2RlcyAmJiBjTm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNOb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBjaGlsZE5vZGUgPSBjTm9kZXNbaV07XG4gICAgICAgICAgaWYgKHRoaXMuZWxlbWVudE1hdGNoZXMoY2hpbGROb2RlLCBzZWxlY3RvciwgbWF0Y2hlcikpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNoaWxkTm9kZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIF9yZWN1cnNpdmUocmVzdWx0LCBjaGlsZE5vZGUsIHNlbGVjdG9yLCBtYXRjaGVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgdmFyIG1hdGNoZXIgPSBuZXcgU2VsZWN0b3JNYXRjaGVyKCk7XG4gICAgbWF0Y2hlci5hZGRTZWxlY3RhYmxlcyhDc3NTZWxlY3Rvci5wYXJzZShzZWxlY3RvcikpO1xuICAgIF9yZWN1cnNpdmUocmVzLCBlbCwgc2VsZWN0b3IsIG1hdGNoZXIpO1xuICAgIHJldHVybiByZXM7XG4gIH1cbiAgZWxlbWVudE1hdGNoZXMobm9kZSwgc2VsZWN0b3I6IHN0cmluZywgbWF0Y2hlciA9IG51bGwpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5pc0VsZW1lbnROb2RlKG5vZGUpICYmIHNlbGVjdG9yID09PSAnKicpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0ID0gZmFsc2U7XG4gICAgaWYgKHNlbGVjdG9yICYmIHNlbGVjdG9yLmNoYXJBdCgwKSA9PSBcIiNcIikge1xuICAgICAgcmVzdWx0ID0gdGhpcy5nZXRBdHRyaWJ1dGUobm9kZSwgJ2lkJykgPT0gc2VsZWN0b3Iuc3Vic3RyaW5nKDEpO1xuICAgIH0gZWxzZSBpZiAoc2VsZWN0b3IpIHtcbiAgICAgIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGlmIChtYXRjaGVyID09IG51bGwpIHtcbiAgICAgICAgbWF0Y2hlciA9IG5ldyBTZWxlY3Rvck1hdGNoZXIoKTtcbiAgICAgICAgbWF0Y2hlci5hZGRTZWxlY3RhYmxlcyhDc3NTZWxlY3Rvci5wYXJzZShzZWxlY3RvcikpO1xuICAgICAgfVxuXG4gICAgICB2YXIgY3NzU2VsZWN0b3IgPSBuZXcgQ3NzU2VsZWN0b3IoKTtcbiAgICAgIGNzc1NlbGVjdG9yLnNldEVsZW1lbnQodGhpcy50YWdOYW1lKG5vZGUpKTtcbiAgICAgIGlmIChub2RlLmF0dHJpYnMpIHtcbiAgICAgICAgZm9yICh2YXIgYXR0ck5hbWUgaW4gbm9kZS5hdHRyaWJzKSB7XG4gICAgICAgICAgY3NzU2VsZWN0b3IuYWRkQXR0cmlidXRlKGF0dHJOYW1lLCBub2RlLmF0dHJpYnNbYXR0ck5hbWVdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIGNsYXNzTGlzdCA9IHRoaXMuY2xhc3NMaXN0KG5vZGUpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY3NzU2VsZWN0b3IuYWRkQ2xhc3NOYW1lKGNsYXNzTGlzdFtpXSk7XG4gICAgICB9XG5cbiAgICAgIG1hdGNoZXIubWF0Y2goY3NzU2VsZWN0b3IsIGZ1bmN0aW9uKHNlbGVjdG9yLCBjYikgeyByZXN1bHQgPSB0cnVlOyB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBvbihlbCwgZXZ0LCBsaXN0ZW5lcikge1xuICAgIHZhciBsaXN0ZW5lcnNNYXA6IHtbazogLyphbnkqLyBzdHJpbmddOiBhbnl9ID0gZWwuX2V2ZW50TGlzdGVuZXJzTWFwO1xuICAgIGlmIChpc0JsYW5rKGxpc3RlbmVyc01hcCkpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnNNYXA6IHtbazogLyphbnkqLyBzdHJpbmddOiBhbnl9ID0gU3RyaW5nTWFwV3JhcHBlci5jcmVhdGUoKTtcbiAgICAgIGVsLl9ldmVudExpc3RlbmVyc01hcCA9IGxpc3RlbmVyc01hcDtcbiAgICB9XG4gICAgdmFyIGxpc3RlbmVycyA9IFN0cmluZ01hcFdyYXBwZXIuZ2V0KGxpc3RlbmVyc01hcCwgZXZ0KTtcbiAgICBpZiAoaXNCbGFuayhsaXN0ZW5lcnMpKSB7XG4gICAgICBsaXN0ZW5lcnMgPSBbXTtcbiAgICB9XG4gICAgbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIFN0cmluZ01hcFdyYXBwZXIuc2V0KGxpc3RlbmVyc01hcCwgZXZ0LCBsaXN0ZW5lcnMpO1xuICB9XG4gIG9uQW5kQ2FuY2VsKGVsLCBldnQsIGxpc3RlbmVyKTogRnVuY3Rpb24ge1xuICAgIHRoaXMub24oZWwsIGV2dCwgbGlzdGVuZXIpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBMaXN0V3JhcHBlci5yZW1vdmUoU3RyaW5nTWFwV3JhcHBlci5nZXQ8YW55W10+KGVsLl9ldmVudExpc3RlbmVyc01hcCwgZXZ0KSwgbGlzdGVuZXIpO1xuICAgIH07XG4gIH1cbiAgZGlzcGF0Y2hFdmVudChlbCwgZXZ0KSB7XG4gICAgaWYgKGlzQmxhbmsoZXZ0LnRhcmdldCkpIHtcbiAgICAgIGV2dC50YXJnZXQgPSBlbDtcbiAgICB9XG4gICAgaWYgKGlzUHJlc2VudChlbC5fZXZlbnRMaXN0ZW5lcnNNYXApKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzOiBhbnkgPSBTdHJpbmdNYXBXcmFwcGVyLmdldChlbC5fZXZlbnRMaXN0ZW5lcnNNYXAsIGV2dC50eXBlKTtcbiAgICAgIGlmIChpc1ByZXNlbnQobGlzdGVuZXJzKSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGxpc3RlbmVyc1tpXShldnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChpc1ByZXNlbnQoZWwucGFyZW50KSkge1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGVsLnBhcmVudCwgZXZ0KTtcbiAgICB9XG4gICAgaWYgKGlzUHJlc2VudChlbC5fd2luZG93KSkge1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGVsLl93aW5kb3csIGV2dCk7XG4gICAgfVxuICB9XG4gIGNyZWF0ZU1vdXNlRXZlbnQoZXZlbnRUeXBlKTogRXZlbnQgeyByZXR1cm4gdGhpcy5jcmVhdGVFdmVudChldmVudFR5cGUpOyB9XG4gIGNyZWF0ZUV2ZW50KGV2ZW50VHlwZTogc3RyaW5nKTogRXZlbnQge1xuICAgIHZhciBldnQgPSA8RXZlbnQ+e1xuICAgICAgdHlwZTogZXZlbnRUeXBlLFxuICAgICAgZGVmYXVsdFByZXZlbnRlZDogZmFsc2UsXG4gICAgICBwcmV2ZW50RGVmYXVsdDogKCkgPT4geyAoPGFueT5ldnQpLmRlZmF1bHRQcmV2ZW50ZWQgPSB0cnVlOyB9XG4gICAgfTtcbiAgICByZXR1cm4gZXZ0O1xuICB9XG4gIHByZXZlbnREZWZhdWx0KGV2dCkgeyBldnQucmV0dXJuVmFsdWUgPSBmYWxzZTsgfVxuICBpc1ByZXZlbnRlZChldnQpOiBib29sZWFuIHsgcmV0dXJuIGlzUHJlc2VudChldnQucmV0dXJuVmFsdWUpICYmICFldnQucmV0dXJuVmFsdWU7IH1cbiAgZ2V0SW5uZXJIVE1MKGVsKTogc3RyaW5nIHsgcmV0dXJuIHNlcmlhbGl6ZXIuc2VyaWFsaXplKHRoaXMudGVtcGxhdGVBd2FyZVJvb3QoZWwpKTsgfVxuICBnZXRPdXRlckhUTUwoZWwpOiBzdHJpbmcge1xuICAgIHNlcmlhbGl6ZXIuaHRtbCA9ICcnO1xuICAgIHNlcmlhbGl6ZXIuX3NlcmlhbGl6ZUVsZW1lbnQoZWwpO1xuICAgIHJldHVybiBzZXJpYWxpemVyLmh0bWw7XG4gIH1cbiAgbm9kZU5hbWUobm9kZSk6IHN0cmluZyB7IHJldHVybiBub2RlLnRhZ05hbWU7IH1cbiAgbm9kZVZhbHVlKG5vZGUpOiBzdHJpbmcgeyByZXR1cm4gbm9kZS5ub2RlVmFsdWU7IH1cbiAgdHlwZShub2RlOiBhbnkpOiBzdHJpbmcgeyB0aHJvdyBfbm90SW1wbGVtZW50ZWQoJ3R5cGUnKTsgfVxuICBjb250ZW50KG5vZGUpOiBzdHJpbmcgeyByZXR1cm4gbm9kZS5jaGlsZE5vZGVzWzBdOyB9XG4gIGZpcnN0Q2hpbGQoZWwpOiBOb2RlIHsgcmV0dXJuIGVsLmZpcnN0Q2hpbGQ7IH1cbiAgbmV4dFNpYmxpbmcoZWwpOiBOb2RlIHsgcmV0dXJuIGVsLm5leHRTaWJsaW5nOyB9XG4gIHBhcmVudEVsZW1lbnQoZWwpOiBOb2RlIHsgcmV0dXJuIGVsLnBhcmVudDsgfVxuICBjaGlsZE5vZGVzKGVsKTogTm9kZVtdIHsgcmV0dXJuIGVsLmNoaWxkTm9kZXM7IH1cbiAgY2hpbGROb2Rlc0FzTGlzdChlbCk6IGFueVtdIHtcbiAgICB2YXIgY2hpbGROb2RlcyA9IGVsLmNoaWxkTm9kZXM7XG4gICAgdmFyIHJlcyA9IExpc3RXcmFwcGVyLmNyZWF0ZUZpeGVkU2l6ZShjaGlsZE5vZGVzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXNbaV0gPSBjaGlsZE5vZGVzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIGNsZWFyTm9kZXMoZWwpIHtcbiAgICB3aGlsZSAoZWwuY2hpbGROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnJlbW92ZShlbC5jaGlsZE5vZGVzWzBdKTtcbiAgICB9XG4gIH1cbiAgYXBwZW5kQ2hpbGQoZWwsIG5vZGUpIHtcbiAgICB0aGlzLnJlbW92ZShub2RlKTtcbiAgICB0cmVlQWRhcHRlci5hcHBlbmRDaGlsZCh0aGlzLnRlbXBsYXRlQXdhcmVSb290KGVsKSwgbm9kZSk7XG4gIH1cbiAgcmVtb3ZlQ2hpbGQoZWwsIG5vZGUpIHtcbiAgICBpZiAoTGlzdFdyYXBwZXIuY29udGFpbnMoZWwuY2hpbGROb2Rlcywgbm9kZSkpIHtcbiAgICAgIHRoaXMucmVtb3ZlKG5vZGUpO1xuICAgIH1cbiAgfVxuICByZW1vdmUoZWwpOiBIVE1MRWxlbWVudCB7XG4gICAgdmFyIHBhcmVudCA9IGVsLnBhcmVudDtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICB2YXIgaW5kZXggPSBwYXJlbnQuY2hpbGROb2Rlcy5pbmRleE9mKGVsKTtcbiAgICAgIHBhcmVudC5jaGlsZE5vZGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIHZhciBwcmV2ID0gZWwucHJldmlvdXNTaWJsaW5nO1xuICAgIHZhciBuZXh0ID0gZWwubmV4dFNpYmxpbmc7XG4gICAgaWYgKHByZXYpIHtcbiAgICAgIHByZXYubmV4dCA9IG5leHQ7XG4gICAgfVxuICAgIGlmIChuZXh0KSB7XG4gICAgICBuZXh0LnByZXYgPSBwcmV2O1xuICAgIH1cbiAgICBlbC5wcmV2ID0gbnVsbDtcbiAgICBlbC5uZXh0ID0gbnVsbDtcbiAgICBlbC5wYXJlbnQgPSBudWxsO1xuICAgIHJldHVybiBlbDtcbiAgfVxuICBpbnNlcnRCZWZvcmUoZWwsIG5vZGUpIHtcbiAgICB0aGlzLnJlbW92ZShub2RlKTtcbiAgICB0cmVlQWRhcHRlci5pbnNlcnRCZWZvcmUoZWwucGFyZW50LCBub2RlLCBlbCk7XG4gIH1cbiAgaW5zZXJ0QWxsQmVmb3JlKGVsLCBub2RlcykgeyBub2Rlcy5mb3JFYWNoKG4gPT4gdGhpcy5pbnNlcnRCZWZvcmUoZWwsIG4pKTsgfVxuICBpbnNlcnRBZnRlcihlbCwgbm9kZSkge1xuICAgIGlmIChlbC5uZXh0U2libGluZykge1xuICAgICAgdGhpcy5pbnNlcnRCZWZvcmUoZWwubmV4dFNpYmxpbmcsIG5vZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFwcGVuZENoaWxkKGVsLnBhcmVudCwgbm9kZSk7XG4gICAgfVxuICB9XG4gIHNldElubmVySFRNTChlbCwgdmFsdWUpIHtcbiAgICB0aGlzLmNsZWFyTm9kZXMoZWwpO1xuICAgIHZhciBjb250ZW50ID0gcGFyc2VyLnBhcnNlRnJhZ21lbnQodmFsdWUpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGVudC5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0cmVlQWRhcHRlci5hcHBlbmRDaGlsZChlbCwgY29udGVudC5jaGlsZE5vZGVzW2ldKTtcbiAgICB9XG4gIH1cbiAgZ2V0VGV4dChlbCwgaXNSZWN1cnNpdmU/OiBib29sZWFuKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5pc1RleHROb2RlKGVsKSkge1xuICAgICAgcmV0dXJuIGVsLmRhdGE7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzQ29tbWVudE5vZGUoZWwpKSB7XG4gICAgICAvLyBJbiB0aGUgRE9NLCBjb21tZW50cyB3aXRoaW4gYW4gZWxlbWVudCByZXR1cm4gYW4gZW1wdHkgc3RyaW5nIGZvciB0ZXh0Q29udGVudFxuICAgICAgLy8gSG93ZXZlciwgY29tbWVudCBub2RlIGluc3RhbmNlcyByZXR1cm4gdGhlIGNvbW1lbnQgY29udGVudCBmb3IgdGV4dENvbnRlbnQgZ2V0dGVyXG4gICAgICByZXR1cm4gaXNSZWN1cnNpdmUgPyAnJyA6IGVsLmRhdGE7XG4gICAgfSBlbHNlIGlmIChpc0JsYW5rKGVsLmNoaWxkTm9kZXMpIHx8IGVsLmNoaWxkTm9kZXMubGVuZ3RoID09IDApIHtcbiAgICAgIHJldHVybiBcIlwiO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbC5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRleHRDb250ZW50ICs9IHRoaXMuZ2V0VGV4dChlbC5jaGlsZE5vZGVzW2ldLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0ZXh0Q29udGVudDtcbiAgICB9XG4gIH1cbiAgc2V0VGV4dChlbCwgdmFsdWU6IHN0cmluZykge1xuICAgIGlmICh0aGlzLmlzVGV4dE5vZGUoZWwpIHx8IHRoaXMuaXNDb21tZW50Tm9kZShlbCkpIHtcbiAgICAgIGVsLmRhdGEgPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jbGVhck5vZGVzKGVsKTtcbiAgICAgIGlmICh2YWx1ZSAhPT0gJycpIHRyZWVBZGFwdGVyLmluc2VydFRleHQoZWwsIHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgZ2V0VmFsdWUoZWwpOiBzdHJpbmcgeyByZXR1cm4gZWwudmFsdWU7IH1cbiAgc2V0VmFsdWUoZWwsIHZhbHVlOiBzdHJpbmcpIHsgZWwudmFsdWUgPSB2YWx1ZTsgfVxuICBnZXRDaGVja2VkKGVsKTogYm9vbGVhbiB7IHJldHVybiBlbC5jaGVja2VkOyB9XG4gIHNldENoZWNrZWQoZWwsIHZhbHVlOiBib29sZWFuKSB7IGVsLmNoZWNrZWQgPSB2YWx1ZTsgfVxuICBjcmVhdGVDb21tZW50KHRleHQ6IHN0cmluZyk6IENvbW1lbnQgeyByZXR1cm4gdHJlZUFkYXB0ZXIuY3JlYXRlQ29tbWVudE5vZGUodGV4dCk7IH1cbiAgY3JlYXRlVGVtcGxhdGUoaHRtbCk6IEhUTUxFbGVtZW50IHtcbiAgICB2YXIgdGVtcGxhdGUgPSB0cmVlQWRhcHRlci5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIiwgJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnLCBbXSk7XG4gICAgdmFyIGNvbnRlbnQgPSBwYXJzZXIucGFyc2VGcmFnbWVudChodG1sKTtcbiAgICB0cmVlQWRhcHRlci5hcHBlbmRDaGlsZCh0ZW1wbGF0ZSwgY29udGVudCk7XG4gICAgcmV0dXJuIHRlbXBsYXRlO1xuICB9XG4gIGNyZWF0ZUVsZW1lbnQodGFnTmFtZSk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdHJlZUFkYXB0ZXIuY3JlYXRlRWxlbWVudCh0YWdOYW1lLCAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCcsIFtdKTtcbiAgfVxuICBjcmVhdGVFbGVtZW50TlMobnMsIHRhZ05hbWUpOiBIVE1MRWxlbWVudCB7IHJldHVybiB0cmVlQWRhcHRlci5jcmVhdGVFbGVtZW50KHRhZ05hbWUsIG5zLCBbXSk7IH1cbiAgY3JlYXRlVGV4dE5vZGUodGV4dDogc3RyaW5nKTogVGV4dCB7XG4gICAgdmFyIHQgPSA8YW55PnRoaXMuY3JlYXRlQ29tbWVudCh0ZXh0KTtcbiAgICB0LnR5cGUgPSAndGV4dCc7XG4gICAgcmV0dXJuIHQ7XG4gIH1cbiAgY3JlYXRlU2NyaXB0VGFnKGF0dHJOYW1lOiBzdHJpbmcsIGF0dHJWYWx1ZTogc3RyaW5nKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0cmVlQWRhcHRlci5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIsICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbe25hbWU6IGF0dHJOYW1lLCB2YWx1ZTogYXR0clZhbHVlfV0pO1xuICB9XG4gIGNyZWF0ZVN0eWxlRWxlbWVudChjc3M6IHN0cmluZyk6IEhUTUxTdHlsZUVsZW1lbnQge1xuICAgIHZhciBzdHlsZSA9IHRoaXMuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICB0aGlzLnNldFRleHQoc3R5bGUsIGNzcyk7XG4gICAgcmV0dXJuIDxIVE1MU3R5bGVFbGVtZW50PnN0eWxlO1xuICB9XG4gIGNyZWF0ZVNoYWRvd1Jvb3QoZWwpOiBIVE1MRWxlbWVudCB7XG4gICAgZWwuc2hhZG93Um9vdCA9IHRyZWVBZGFwdGVyLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBlbC5zaGFkb3dSb290LnBhcmVudCA9IGVsO1xuICAgIHJldHVybiBlbC5zaGFkb3dSb290O1xuICB9XG4gIGdldFNoYWRvd1Jvb3QoZWwpOiBFbGVtZW50IHsgcmV0dXJuIGVsLnNoYWRvd1Jvb3Q7IH1cbiAgZ2V0SG9zdChlbCk6IHN0cmluZyB7IHJldHVybiBlbC5ob3N0OyB9XG4gIGdldERpc3RyaWJ1dGVkTm9kZXMoZWw6IGFueSk6IE5vZGVbXSB7IHRocm93IF9ub3RJbXBsZW1lbnRlZCgnZ2V0RGlzdHJpYnV0ZWROb2RlcycpOyB9XG4gIGNsb25lKG5vZGU6IE5vZGUpOiBOb2RlIHtcbiAgICB2YXIgX3JlY3Vyc2l2ZSA9IChub2RlKSA9PiB7XG4gICAgICB2YXIgbm9kZUNsb25lID0gT2JqZWN0LmNyZWF0ZShPYmplY3QuZ2V0UHJvdG90eXBlT2Yobm9kZSkpO1xuICAgICAgZm9yICh2YXIgcHJvcCBpbiBub2RlKSB7XG4gICAgICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihub2RlLCBwcm9wKTtcbiAgICAgICAgaWYgKGRlc2MgJiYgJ3ZhbHVlJyBpbiBkZXNjICYmIHR5cGVvZiBkZXNjLnZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIG5vZGVDbG9uZVtwcm9wXSA9IG5vZGVbcHJvcF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG5vZGVDbG9uZS5wYXJlbnQgPSBudWxsO1xuICAgICAgbm9kZUNsb25lLnByZXYgPSBudWxsO1xuICAgICAgbm9kZUNsb25lLm5leHQgPSBudWxsO1xuICAgICAgbm9kZUNsb25lLmNoaWxkcmVuID0gbnVsbDtcblxuICAgICAgbWFwUHJvcHMuZm9yRWFjaChtYXBOYW1lID0+IHtcbiAgICAgICAgaWYgKGlzUHJlc2VudChub2RlW21hcE5hbWVdKSkge1xuICAgICAgICAgIG5vZGVDbG9uZVttYXBOYW1lXSA9IHt9O1xuICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gbm9kZVttYXBOYW1lXSkge1xuICAgICAgICAgICAgbm9kZUNsb25lW21hcE5hbWVdW3Byb3BdID0gbm9kZVttYXBOYW1lXVtwcm9wXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdmFyIGNOb2RlcyA9IG5vZGUuY2hpbGRyZW47XG4gICAgICBpZiAoY05vZGVzKSB7XG4gICAgICAgIHZhciBjTm9kZXNDbG9uZSA9IG5ldyBBcnJheShjTm9kZXMubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgY2hpbGROb2RlID0gY05vZGVzW2ldO1xuICAgICAgICAgIHZhciBjaGlsZE5vZGVDbG9uZSA9IF9yZWN1cnNpdmUoY2hpbGROb2RlKTtcbiAgICAgICAgICBjTm9kZXNDbG9uZVtpXSA9IGNoaWxkTm9kZUNsb25lO1xuICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgY2hpbGROb2RlQ2xvbmUucHJldiA9IGNOb2Rlc0Nsb25lW2kgLSAxXTtcbiAgICAgICAgICAgIGNOb2Rlc0Nsb25lW2kgLSAxXS5uZXh0ID0gY2hpbGROb2RlQ2xvbmU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNoaWxkTm9kZUNsb25lLnBhcmVudCA9IG5vZGVDbG9uZTtcbiAgICAgICAgfVxuICAgICAgICBub2RlQ2xvbmUuY2hpbGRyZW4gPSBjTm9kZXNDbG9uZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBub2RlQ2xvbmU7XG4gICAgfTtcbiAgICByZXR1cm4gX3JlY3Vyc2l2ZShub2RlKTtcbiAgfVxuICBnZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGVsZW1lbnQsIG5hbWU6IHN0cmluZyk6IEhUTUxFbGVtZW50W10ge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudCwgXCIuXCIgKyBuYW1lKTtcbiAgfVxuICBnZXRFbGVtZW50c0J5VGFnTmFtZShlbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZyk6IEhUTUxFbGVtZW50W10ge1xuICAgIHRocm93IF9ub3RJbXBsZW1lbnRlZCgnZ2V0RWxlbWVudHNCeVRhZ05hbWUnKTtcbiAgfVxuICBjbGFzc0xpc3QoZWxlbWVudCk6IHN0cmluZ1tdIHtcbiAgICB2YXIgY2xhc3NBdHRyVmFsdWUgPSBudWxsO1xuICAgIHZhciBhdHRyaWJ1dGVzID0gZWxlbWVudC5hdHRyaWJzO1xuICAgIGlmIChhdHRyaWJ1dGVzICYmIGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoXCJjbGFzc1wiKSkge1xuICAgICAgY2xhc3NBdHRyVmFsdWUgPSBhdHRyaWJ1dGVzW1wiY2xhc3NcIl07XG4gICAgfVxuICAgIHJldHVybiBjbGFzc0F0dHJWYWx1ZSA/IGNsYXNzQXR0clZhbHVlLnRyaW0oKS5zcGxpdCgvXFxzKy9nKSA6IFtdO1xuICB9XG4gIGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gICAgdmFyIGNsYXNzTGlzdCA9IHRoaXMuY2xhc3NMaXN0KGVsZW1lbnQpO1xuICAgIHZhciBpbmRleCA9IGNsYXNzTGlzdC5pbmRleE9mKGNsYXNzTmFtZSk7XG4gICAgaWYgKGluZGV4ID09IC0xKSB7XG4gICAgICBjbGFzc0xpc3QucHVzaChjbGFzc05hbWUpO1xuICAgICAgZWxlbWVudC5hdHRyaWJzW1wiY2xhc3NcIl0gPSBlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTGlzdC5qb2luKFwiIFwiKTtcbiAgICB9XG4gIH1cbiAgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lOiBzdHJpbmcpIHtcbiAgICB2YXIgY2xhc3NMaXN0ID0gdGhpcy5jbGFzc0xpc3QoZWxlbWVudCk7XG4gICAgdmFyIGluZGV4ID0gY2xhc3NMaXN0LmluZGV4T2YoY2xhc3NOYW1lKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgY2xhc3NMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICBlbGVtZW50LmF0dHJpYnNbXCJjbGFzc1wiXSA9IGVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NMaXN0LmpvaW4oXCIgXCIpO1xuICAgIH1cbiAgfVxuICBoYXNDbGFzcyhlbGVtZW50LCBjbGFzc05hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBMaXN0V3JhcHBlci5jb250YWlucyh0aGlzLmNsYXNzTGlzdChlbGVtZW50KSwgY2xhc3NOYW1lKTtcbiAgfVxuICBoYXNTdHlsZShlbGVtZW50LCBzdHlsZU5hbWU6IHN0cmluZywgc3R5bGVWYWx1ZTogc3RyaW5nID0gbnVsbCk6IGJvb2xlYW4ge1xuICAgIHZhciB2YWx1ZSA9IHRoaXMuZ2V0U3R5bGUoZWxlbWVudCwgc3R5bGVOYW1lKSB8fCAnJztcbiAgICByZXR1cm4gc3R5bGVWYWx1ZSA/IHZhbHVlID09IHN0eWxlVmFsdWUgOiB2YWx1ZS5sZW5ndGggPiAwO1xuICB9XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3JlYWRTdHlsZUF0dHJpYnV0ZShlbGVtZW50KSB7XG4gICAgdmFyIHN0eWxlTWFwID0ge307XG4gICAgdmFyIGF0dHJpYnV0ZXMgPSBlbGVtZW50LmF0dHJpYnM7XG4gICAgaWYgKGF0dHJpYnV0ZXMgJiYgYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eShcInN0eWxlXCIpKSB7XG4gICAgICB2YXIgc3R5bGVBdHRyVmFsdWUgPSBhdHRyaWJ1dGVzW1wic3R5bGVcIl07XG4gICAgICB2YXIgc3R5bGVMaXN0ID0gc3R5bGVBdHRyVmFsdWUuc3BsaXQoLzsrL2cpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHN0eWxlTGlzdFtpXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdmFyIGVsZW1zID0gc3R5bGVMaXN0W2ldLnNwbGl0KC86Ky9nKTtcbiAgICAgICAgICBzdHlsZU1hcFtlbGVtc1swXS50cmltKCldID0gZWxlbXNbMV0udHJpbSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdHlsZU1hcDtcbiAgfVxuICAvKiogQGludGVybmFsICovXG4gIF93cml0ZVN0eWxlQXR0cmlidXRlKGVsZW1lbnQsIHN0eWxlTWFwKSB7XG4gICAgdmFyIHN0eWxlQXR0clZhbHVlID0gXCJcIjtcbiAgICBmb3IgKHZhciBrZXkgaW4gc3R5bGVNYXApIHtcbiAgICAgIHZhciBuZXdWYWx1ZSA9IHN0eWxlTWFwW2tleV07XG4gICAgICBpZiAobmV3VmFsdWUgJiYgbmV3VmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICBzdHlsZUF0dHJWYWx1ZSArPSBrZXkgKyBcIjpcIiArIHN0eWxlTWFwW2tleV0gKyBcIjtcIjtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxlbWVudC5hdHRyaWJzW1wic3R5bGVcIl0gPSBzdHlsZUF0dHJWYWx1ZTtcbiAgfVxuICBzZXRTdHlsZShlbGVtZW50LCBzdHlsZU5hbWU6IHN0cmluZywgc3R5bGVWYWx1ZTogc3RyaW5nKSB7XG4gICAgdmFyIHN0eWxlTWFwID0gdGhpcy5fcmVhZFN0eWxlQXR0cmlidXRlKGVsZW1lbnQpO1xuICAgIHN0eWxlTWFwW3N0eWxlTmFtZV0gPSBzdHlsZVZhbHVlO1xuICAgIHRoaXMuX3dyaXRlU3R5bGVBdHRyaWJ1dGUoZWxlbWVudCwgc3R5bGVNYXApO1xuICB9XG4gIHJlbW92ZVN0eWxlKGVsZW1lbnQsIHN0eWxlTmFtZTogc3RyaW5nKSB7IHRoaXMuc2V0U3R5bGUoZWxlbWVudCwgc3R5bGVOYW1lLCBudWxsKTsgfVxuICBnZXRTdHlsZShlbGVtZW50LCBzdHlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgdmFyIHN0eWxlTWFwID0gdGhpcy5fcmVhZFN0eWxlQXR0cmlidXRlKGVsZW1lbnQpO1xuICAgIHJldHVybiBzdHlsZU1hcC5oYXNPd25Qcm9wZXJ0eShzdHlsZU5hbWUpID8gc3R5bGVNYXBbc3R5bGVOYW1lXSA6IFwiXCI7XG4gIH1cbiAgdGFnTmFtZShlbGVtZW50KTogc3RyaW5nIHsgcmV0dXJuIGVsZW1lbnQudGFnTmFtZSA9PSBcInN0eWxlXCIgPyBcIlNUWUxFXCIgOiBlbGVtZW50LnRhZ05hbWU7IH1cbiAgYXR0cmlidXRlTWFwKGVsZW1lbnQpOiBNYXA8c3RyaW5nLCBzdHJpbmc+IHtcbiAgICB2YXIgcmVzID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbiAgICB2YXIgZWxBdHRycyA9IHRyZWVBZGFwdGVyLmdldEF0dHJMaXN0KGVsZW1lbnQpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxBdHRycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGF0dHJpYiA9IGVsQXR0cnNbaV07XG4gICAgICByZXMuc2V0KGF0dHJpYi5uYW1lLCBhdHRyaWIudmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIGhhc0F0dHJpYnV0ZShlbGVtZW50LCBhdHRyaWJ1dGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBlbGVtZW50LmF0dHJpYnMgJiYgZWxlbWVudC5hdHRyaWJzLmhhc093blByb3BlcnR5KGF0dHJpYnV0ZSk7XG4gIH1cbiAgaGFzQXR0cmlidXRlTlMoZWxlbWVudCwgbnM6IHN0cmluZywgYXR0cmlidXRlOiBzdHJpbmcpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0QXR0cmlidXRlKGVsZW1lbnQsIGF0dHJpYnV0ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZWxlbWVudC5hdHRyaWJzICYmIGVsZW1lbnQuYXR0cmlicy5oYXNPd25Qcm9wZXJ0eShhdHRyaWJ1dGUpID9cbiAgICAgICAgICAgICAgIGVsZW1lbnQuYXR0cmlic1thdHRyaWJ1dGVdIDpcbiAgICAgICAgICAgICAgIG51bGw7XG4gIH1cbiAgZ2V0QXR0cmlidXRlTlMoZWxlbWVudCwgbnM6IHN0cmluZywgYXR0cmlidXRlOiBzdHJpbmcpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzZXRBdHRyaWJ1dGUoZWxlbWVudCwgYXR0cmlidXRlOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAoYXR0cmlidXRlKSB7XG4gICAgICBlbGVtZW50LmF0dHJpYnNbYXR0cmlidXRlXSA9IHZhbHVlO1xuICAgICAgaWYgKGF0dHJpYnV0ZSA9PT0gJ2NsYXNzJykge1xuICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBzZXRBdHRyaWJ1dGVOUyhlbGVtZW50LCBuczogc3RyaW5nLCBhdHRyaWJ1dGU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICByZW1vdmVBdHRyaWJ1dGUoZWxlbWVudCwgYXR0cmlidXRlOiBzdHJpbmcpIHtcbiAgICBpZiAoYXR0cmlidXRlKSB7XG4gICAgICBTdHJpbmdNYXBXcmFwcGVyLmRlbGV0ZShlbGVtZW50LmF0dHJpYnMsIGF0dHJpYnV0ZSk7XG4gICAgfVxuICB9XG4gIHJlbW92ZUF0dHJpYnV0ZU5TKGVsZW1lbnQsIG5zOiBzdHJpbmcsIG5hbWU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICB0ZW1wbGF0ZUF3YXJlUm9vdChlbCk6IGFueSB7IHJldHVybiB0aGlzLmlzVGVtcGxhdGVFbGVtZW50KGVsKSA/IHRoaXMuY29udGVudChlbCkgOiBlbDsgfVxuICBjcmVhdGVIdG1sRG9jdW1lbnQoKTogRG9jdW1lbnQge1xuICAgIHZhciBuZXdEb2MgPSB0cmVlQWRhcHRlci5jcmVhdGVEb2N1bWVudCgpO1xuICAgIG5ld0RvYy50aXRsZSA9IFwiZmFrZSB0aXRsZVwiO1xuICAgIHZhciBoZWFkID0gdHJlZUFkYXB0ZXIuY3JlYXRlRWxlbWVudChcImhlYWRcIiwgbnVsbCwgW10pO1xuICAgIHZhciBib2R5ID0gdHJlZUFkYXB0ZXIuY3JlYXRlRWxlbWVudChcImJvZHlcIiwgJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnLCBbXSk7XG4gICAgdGhpcy5hcHBlbmRDaGlsZChuZXdEb2MsIGhlYWQpO1xuICAgIHRoaXMuYXBwZW5kQ2hpbGQobmV3RG9jLCBib2R5KTtcbiAgICBTdHJpbmdNYXBXcmFwcGVyLnNldChuZXdEb2MsIFwiaGVhZFwiLCBoZWFkKTtcbiAgICBTdHJpbmdNYXBXcmFwcGVyLnNldChuZXdEb2MsIFwiYm9keVwiLCBib2R5KTtcbiAgICBTdHJpbmdNYXBXcmFwcGVyLnNldChuZXdEb2MsIFwiX3dpbmRvd1wiLCBTdHJpbmdNYXBXcmFwcGVyLmNyZWF0ZSgpKTtcbiAgICByZXR1cm4gbmV3RG9jO1xuICB9XG4gIGRlZmF1bHREb2MoKTogRG9jdW1lbnQge1xuICAgIGlmIChkZWZEb2MgPT09IG51bGwpIHtcbiAgICAgIGRlZkRvYyA9IHRoaXMuY3JlYXRlSHRtbERvY3VtZW50KCk7XG4gICAgfVxuICAgIHJldHVybiBkZWZEb2M7XG4gIH1cbiAgZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsKTogYW55IHsgcmV0dXJuIHtsZWZ0OiAwLCB0b3A6IDAsIHdpZHRoOiAwLCBoZWlnaHQ6IDB9OyB9XG4gIGdldFRpdGxlKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLmRlZmF1bHREb2MoKS50aXRsZSB8fCBcIlwiOyB9XG4gIHNldFRpdGxlKG5ld1RpdGxlOiBzdHJpbmcpIHsgdGhpcy5kZWZhdWx0RG9jKCkudGl0bGUgPSBuZXdUaXRsZTsgfVxuICBpc1RlbXBsYXRlRWxlbWVudChlbDogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNFbGVtZW50Tm9kZShlbCkgJiYgdGhpcy50YWdOYW1lKGVsKSA9PT0gXCJ0ZW1wbGF0ZVwiO1xuICB9XG4gIGlzVGV4dE5vZGUobm9kZSk6IGJvb2xlYW4geyByZXR1cm4gdHJlZUFkYXB0ZXIuaXNUZXh0Tm9kZShub2RlKTsgfVxuICBpc0NvbW1lbnROb2RlKG5vZGUpOiBib29sZWFuIHsgcmV0dXJuIHRyZWVBZGFwdGVyLmlzQ29tbWVudE5vZGUobm9kZSk7IH1cbiAgaXNFbGVtZW50Tm9kZShub2RlKTogYm9vbGVhbiB7IHJldHVybiBub2RlID8gdHJlZUFkYXB0ZXIuaXNFbGVtZW50Tm9kZShub2RlKSA6IGZhbHNlOyB9XG4gIGhhc1NoYWRvd1Jvb3Qobm9kZSk6IGJvb2xlYW4geyByZXR1cm4gaXNQcmVzZW50KG5vZGUuc2hhZG93Um9vdCk7IH1cbiAgaXNTaGFkb3dSb290KG5vZGUpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuZ2V0U2hhZG93Um9vdChub2RlKSA9PSBub2RlOyB9XG4gIGltcG9ydEludG9Eb2Mobm9kZSk6IGFueSB7IHJldHVybiB0aGlzLmNsb25lKG5vZGUpOyB9XG4gIGFkb3B0Tm9kZShub2RlKTogYW55IHsgcmV0dXJuIG5vZGU7IH1cbiAgZ2V0SHJlZihlbCk6IHN0cmluZyB7IHJldHVybiBlbC5ocmVmOyB9XG4gIHJlc29sdmVBbmRTZXRIcmVmKGVsLCBiYXNlVXJsOiBzdHJpbmcsIGhyZWY6IHN0cmluZykge1xuICAgIGlmIChocmVmID09IG51bGwpIHtcbiAgICAgIGVsLmhyZWYgPSBiYXNlVXJsO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5ocmVmID0gYmFzZVVybCArICcvLi4vJyArIGhyZWY7XG4gICAgfVxuICB9XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2J1aWxkUnVsZXMocGFyc2VkUnVsZXMsIGNzcz8pIHtcbiAgICB2YXIgcnVsZXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnNlZFJ1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcGFyc2VkUnVsZSA9IHBhcnNlZFJ1bGVzW2ldO1xuICAgICAgdmFyIHJ1bGU6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0gU3RyaW5nTWFwV3JhcHBlci5jcmVhdGUoKTtcbiAgICAgIFN0cmluZ01hcFdyYXBwZXIuc2V0KHJ1bGUsIFwiY3NzVGV4dFwiLCBjc3MpO1xuICAgICAgU3RyaW5nTWFwV3JhcHBlci5zZXQocnVsZSwgXCJzdHlsZVwiLCB7Y29udGVudDogXCJcIiwgY3NzVGV4dDogXCJcIn0pO1xuICAgICAgaWYgKHBhcnNlZFJ1bGUudHlwZSA9PSBcInJ1bGVcIikge1xuICAgICAgICBTdHJpbmdNYXBXcmFwcGVyLnNldChydWxlLCBcInR5cGVcIiwgMSk7XG4gICAgICAgIFN0cmluZ01hcFdyYXBwZXIuc2V0KHJ1bGUsIFwic2VsZWN0b3JUZXh0XCIsIHBhcnNlZFJ1bGUuc2VsZWN0b3JzLmpvaW4oXCIsIFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHN7Mix9L2csIFwiIFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHMqflxccyovZywgXCIgfiBcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxzKlxcK1xccyovZywgXCIgKyBcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxzKj5cXHMqL2csIFwiID4gXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcWyhcXHcrKT0oXFx3KylcXF0vZywgJ1skMT1cIiQyXCJdJykpO1xuICAgICAgICBpZiAoaXNCbGFuayhwYXJzZWRSdWxlLmRlY2xhcmF0aW9ucykpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHBhcnNlZFJ1bGUuZGVjbGFyYXRpb25zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgdmFyIGRlY2xhcmF0aW9uID0gcGFyc2VkUnVsZS5kZWNsYXJhdGlvbnNbal07XG4gICAgICAgICAgU3RyaW5nTWFwV3JhcHBlci5zZXQoU3RyaW5nTWFwV3JhcHBlci5nZXQocnVsZSwgXCJzdHlsZVwiKSwgZGVjbGFyYXRpb24ucHJvcGVydHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVjbGFyYXRpb24udmFsdWUpO1xuICAgICAgICAgIFN0cmluZ01hcFdyYXBwZXIuZ2V0KHJ1bGUsIFwic3R5bGVcIikuY3NzVGV4dCArPVxuICAgICAgICAgICAgICBkZWNsYXJhdGlvbi5wcm9wZXJ0eSArIFwiOiBcIiArIGRlY2xhcmF0aW9uLnZhbHVlICsgXCI7XCI7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocGFyc2VkUnVsZS50eXBlID09IFwibWVkaWFcIikge1xuICAgICAgICBTdHJpbmdNYXBXcmFwcGVyLnNldChydWxlLCBcInR5cGVcIiwgNCk7XG4gICAgICAgIFN0cmluZ01hcFdyYXBwZXIuc2V0KHJ1bGUsIFwibWVkaWFcIiwge21lZGlhVGV4dDogcGFyc2VkUnVsZS5tZWRpYX0pO1xuICAgICAgICBpZiAocGFyc2VkUnVsZS5ydWxlcykge1xuICAgICAgICAgIFN0cmluZ01hcFdyYXBwZXIuc2V0KHJ1bGUsIFwiY3NzUnVsZXNcIiwgdGhpcy5fYnVpbGRSdWxlcyhwYXJzZWRSdWxlLnJ1bGVzKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJ1bGVzLnB1c2gocnVsZSk7XG4gICAgfVxuICAgIHJldHVybiBydWxlcztcbiAgfVxuICBzdXBwb3J0c0RPTUV2ZW50cygpOiBib29sZWFuIHsgcmV0dXJuIGZhbHNlOyB9XG4gIHN1cHBvcnRzTmF0aXZlU2hhZG93RE9NKCk6IGJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cbiAgZ2V0R2xvYmFsRXZlbnRUYXJnZXQodGFyZ2V0OiBzdHJpbmcpOiBhbnkge1xuICAgIGlmICh0YXJnZXQgPT0gXCJ3aW5kb3dcIikge1xuICAgICAgcmV0dXJuICg8YW55PnRoaXMuZGVmYXVsdERvYygpKS5fd2luZG93O1xuICAgIH0gZWxzZSBpZiAodGFyZ2V0ID09IFwiZG9jdW1lbnRcIikge1xuICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdERvYygpO1xuICAgIH0gZWxzZSBpZiAodGFyZ2V0ID09IFwiYm9keVwiKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWZhdWx0RG9jKCkuYm9keTtcbiAgICB9XG4gIH1cbiAgZ2V0QmFzZUhyZWYoKTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcmVzZXRCYXNlRWxlbWVudCgpOiB2b2lkIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0SGlzdG9yeSgpOiBIaXN0b3J5IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0TG9jYXRpb24oKTogTG9jYXRpb24geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRVc2VyQWdlbnQoKTogc3RyaW5nIHsgcmV0dXJuIFwiRmFrZSB1c2VyIGFnZW50XCI7IH1cbiAgZ2V0RGF0YShlbCwgbmFtZTogc3RyaW5nKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKGVsLCAnZGF0YS0nICsgbmFtZSk7IH1cbiAgZ2V0Q29tcHV0ZWRTdHlsZShlbCk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHNldERhdGEoZWwsIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgeyB0aGlzLnNldEF0dHJpYnV0ZShlbCwgJ2RhdGEtJyArIG5hbWUsIHZhbHVlKTsgfVxuICAvLyBUT0RPKHRib3NjaCk6IG1vdmUgdGhpcyBpbnRvIGEgc2VwYXJhdGUgZW52aXJvbm1lbnQgY2xhc3Mgb25jZSB3ZSBoYXZlIGl0XG4gIHNldEdsb2JhbFZhcihwYXRoOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHsgc2V0VmFsdWVPblBhdGgoZ2xvYmFsLCBwYXRoLCB2YWx1ZSk7IH1cbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNhbGxiYWNrKTogbnVtYmVyIHsgcmV0dXJuIHNldFRpbWVvdXQoY2FsbGJhY2ssIDApOyB9XG4gIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGlkOiBudW1iZXIpIHsgY2xlYXJUaW1lb3V0KGlkKTsgfVxuICBwZXJmb3JtYW5jZU5vdygpOiBudW1iZXIgeyByZXR1cm4gRGF0ZVdyYXBwZXIudG9NaWxsaXMoRGF0ZVdyYXBwZXIubm93KCkpOyB9XG4gIGdldEFuaW1hdGlvblByZWZpeCgpOiBzdHJpbmcgeyByZXR1cm4gJyc7IH1cbiAgZ2V0VHJhbnNpdGlvbkVuZCgpOiBzdHJpbmcgeyByZXR1cm4gJ3RyYW5zaXRpb25lbmQnOyB9XG4gIHN1cHBvcnRzQW5pbWF0aW9uKCk6IGJvb2xlYW4geyByZXR1cm4gdHJ1ZTsgfVxuXG4gIHJlcGxhY2VDaGlsZChlbCwgbmV3Tm9kZSwgb2xkTm9kZSkgeyB0aHJvdyBuZXcgRXJyb3IoJ25vdCBpbXBsZW1lbnRlZCcpOyB9XG4gIHBhcnNlKHRlbXBsYXRlSHRtbDogc3RyaW5nKSB7IHRocm93IG5ldyBFcnJvcignbm90IGltcGxlbWVudGVkJyk7IH1cbiAgaW52b2tlKGVsOiBFbGVtZW50LCBtZXRob2ROYW1lOiBzdHJpbmcsIGFyZ3M6IGFueVtdKTogYW55IHsgdGhyb3cgbmV3IEVycm9yKCdub3QgaW1wbGVtZW50ZWQnKTsgfVxuICBnZXRFdmVudEtleShldmVudCk6IHN0cmluZyB7IHRocm93IG5ldyBFcnJvcignbm90IGltcGxlbWVudGVkJyk7IH1cbn1cblxuLy8gVE9ETzogYnVpbGQgYSBwcm9wZXIgbGlzdCwgdGhpcyBvbmUgaXMgYWxsIHRoZSBrZXlzIG9mIGEgSFRNTElucHV0RWxlbWVudFxudmFyIF9IVE1MRWxlbWVudFByb3BlcnR5TGlzdCA9IFtcbiAgXCJ3ZWJraXRFbnRyaWVzXCIsXG4gIFwiaW5jcmVtZW50YWxcIixcbiAgXCJ3ZWJraXRkaXJlY3RvcnlcIixcbiAgXCJzZWxlY3Rpb25EaXJlY3Rpb25cIixcbiAgXCJzZWxlY3Rpb25FbmRcIixcbiAgXCJzZWxlY3Rpb25TdGFydFwiLFxuICBcImxhYmVsc1wiLFxuICBcInZhbGlkYXRpb25NZXNzYWdlXCIsXG4gIFwidmFsaWRpdHlcIixcbiAgXCJ3aWxsVmFsaWRhdGVcIixcbiAgXCJ3aWR0aFwiLFxuICBcInZhbHVlQXNOdW1iZXJcIixcbiAgXCJ2YWx1ZUFzRGF0ZVwiLFxuICBcInZhbHVlXCIsXG4gIFwidXNlTWFwXCIsXG4gIFwiZGVmYXVsdFZhbHVlXCIsXG4gIFwidHlwZVwiLFxuICBcInN0ZXBcIixcbiAgXCJzcmNcIixcbiAgXCJzaXplXCIsXG4gIFwicmVxdWlyZWRcIixcbiAgXCJyZWFkT25seVwiLFxuICBcInBsYWNlaG9sZGVyXCIsXG4gIFwicGF0dGVyblwiLFxuICBcIm5hbWVcIixcbiAgXCJtdWx0aXBsZVwiLFxuICBcIm1pblwiLFxuICBcIm1pbkxlbmd0aFwiLFxuICBcIm1heExlbmd0aFwiLFxuICBcIm1heFwiLFxuICBcImxpc3RcIixcbiAgXCJpbmRldGVybWluYXRlXCIsXG4gIFwiaGVpZ2h0XCIsXG4gIFwiZm9ybVRhcmdldFwiLFxuICBcImZvcm1Ob1ZhbGlkYXRlXCIsXG4gIFwiZm9ybU1ldGhvZFwiLFxuICBcImZvcm1FbmN0eXBlXCIsXG4gIFwiZm9ybUFjdGlvblwiLFxuICBcImZpbGVzXCIsXG4gIFwiZm9ybVwiLFxuICBcImRpc2FibGVkXCIsXG4gIFwiZGlyTmFtZVwiLFxuICBcImNoZWNrZWRcIixcbiAgXCJkZWZhdWx0Q2hlY2tlZFwiLFxuICBcImF1dG9mb2N1c1wiLFxuICBcImF1dG9jb21wbGV0ZVwiLFxuICBcImFsdFwiLFxuICBcImFsaWduXCIsXG4gIFwiYWNjZXB0XCIsXG4gIFwib25hdXRvY29tcGxldGVlcnJvclwiLFxuICBcIm9uYXV0b2NvbXBsZXRlXCIsXG4gIFwib253YWl0aW5nXCIsXG4gIFwib252b2x1bWVjaGFuZ2VcIixcbiAgXCJvbnRvZ2dsZVwiLFxuICBcIm9udGltZXVwZGF0ZVwiLFxuICBcIm9uc3VzcGVuZFwiLFxuICBcIm9uc3VibWl0XCIsXG4gIFwib25zdGFsbGVkXCIsXG4gIFwib25zaG93XCIsXG4gIFwib25zZWxlY3RcIixcbiAgXCJvbnNlZWtpbmdcIixcbiAgXCJvbnNlZWtlZFwiLFxuICBcIm9uc2Nyb2xsXCIsXG4gIFwib25yZXNpemVcIixcbiAgXCJvbnJlc2V0XCIsXG4gIFwib25yYXRlY2hhbmdlXCIsXG4gIFwib25wcm9ncmVzc1wiLFxuICBcIm9ucGxheWluZ1wiLFxuICBcIm9ucGxheVwiLFxuICBcIm9ucGF1c2VcIixcbiAgXCJvbm1vdXNld2hlZWxcIixcbiAgXCJvbm1vdXNldXBcIixcbiAgXCJvbm1vdXNlb3ZlclwiLFxuICBcIm9ubW91c2VvdXRcIixcbiAgXCJvbm1vdXNlbW92ZVwiLFxuICBcIm9ubW91c2VsZWF2ZVwiLFxuICBcIm9ubW91c2VlbnRlclwiLFxuICBcIm9ubW91c2Vkb3duXCIsXG4gIFwib25sb2Fkc3RhcnRcIixcbiAgXCJvbmxvYWRlZG1ldGFkYXRhXCIsXG4gIFwib25sb2FkZWRkYXRhXCIsXG4gIFwib25sb2FkXCIsXG4gIFwib25rZXl1cFwiLFxuICBcIm9ua2V5cHJlc3NcIixcbiAgXCJvbmtleWRvd25cIixcbiAgXCJvbmludmFsaWRcIixcbiAgXCJvbmlucHV0XCIsXG4gIFwib25mb2N1c1wiLFxuICBcIm9uZXJyb3JcIixcbiAgXCJvbmVuZGVkXCIsXG4gIFwib25lbXB0aWVkXCIsXG4gIFwib25kdXJhdGlvbmNoYW5nZVwiLFxuICBcIm9uZHJvcFwiLFxuICBcIm9uZHJhZ3N0YXJ0XCIsXG4gIFwib25kcmFnb3ZlclwiLFxuICBcIm9uZHJhZ2xlYXZlXCIsXG4gIFwib25kcmFnZW50ZXJcIixcbiAgXCJvbmRyYWdlbmRcIixcbiAgXCJvbmRyYWdcIixcbiAgXCJvbmRibGNsaWNrXCIsXG4gIFwib25jdWVjaGFuZ2VcIixcbiAgXCJvbmNvbnRleHRtZW51XCIsXG4gIFwib25jbG9zZVwiLFxuICBcIm9uY2xpY2tcIixcbiAgXCJvbmNoYW5nZVwiLFxuICBcIm9uY2FucGxheXRocm91Z2hcIixcbiAgXCJvbmNhbnBsYXlcIixcbiAgXCJvbmNhbmNlbFwiLFxuICBcIm9uYmx1clwiLFxuICBcIm9uYWJvcnRcIixcbiAgXCJzcGVsbGNoZWNrXCIsXG4gIFwiaXNDb250ZW50RWRpdGFibGVcIixcbiAgXCJjb250ZW50RWRpdGFibGVcIixcbiAgXCJvdXRlclRleHRcIixcbiAgXCJpbm5lclRleHRcIixcbiAgXCJhY2Nlc3NLZXlcIixcbiAgXCJoaWRkZW5cIixcbiAgXCJ3ZWJraXRkcm9wem9uZVwiLFxuICBcImRyYWdnYWJsZVwiLFxuICBcInRhYkluZGV4XCIsXG4gIFwiZGlyXCIsXG4gIFwidHJhbnNsYXRlXCIsXG4gIFwibGFuZ1wiLFxuICBcInRpdGxlXCIsXG4gIFwiY2hpbGRFbGVtZW50Q291bnRcIixcbiAgXCJsYXN0RWxlbWVudENoaWxkXCIsXG4gIFwiZmlyc3RFbGVtZW50Q2hpbGRcIixcbiAgXCJjaGlsZHJlblwiLFxuICBcIm9ud2Via2l0ZnVsbHNjcmVlbmVycm9yXCIsXG4gIFwib253ZWJraXRmdWxsc2NyZWVuY2hhbmdlXCIsXG4gIFwibmV4dEVsZW1lbnRTaWJsaW5nXCIsXG4gIFwicHJldmlvdXNFbGVtZW50U2libGluZ1wiLFxuICBcIm9ud2hlZWxcIixcbiAgXCJvbnNlbGVjdHN0YXJ0XCIsXG4gIFwib25zZWFyY2hcIixcbiAgXCJvbnBhc3RlXCIsXG4gIFwib25jdXRcIixcbiAgXCJvbmNvcHlcIixcbiAgXCJvbmJlZm9yZXBhc3RlXCIsXG4gIFwib25iZWZvcmVjdXRcIixcbiAgXCJvbmJlZm9yZWNvcHlcIixcbiAgXCJzaGFkb3dSb290XCIsXG4gIFwiZGF0YXNldFwiLFxuICBcImNsYXNzTGlzdFwiLFxuICBcImNsYXNzTmFtZVwiLFxuICBcIm91dGVySFRNTFwiLFxuICBcImlubmVySFRNTFwiLFxuICBcInNjcm9sbEhlaWdodFwiLFxuICBcInNjcm9sbFdpZHRoXCIsXG4gIFwic2Nyb2xsVG9wXCIsXG4gIFwic2Nyb2xsTGVmdFwiLFxuICBcImNsaWVudEhlaWdodFwiLFxuICBcImNsaWVudFdpZHRoXCIsXG4gIFwiY2xpZW50VG9wXCIsXG4gIFwiY2xpZW50TGVmdFwiLFxuICBcIm9mZnNldFBhcmVudFwiLFxuICBcIm9mZnNldEhlaWdodFwiLFxuICBcIm9mZnNldFdpZHRoXCIsXG4gIFwib2Zmc2V0VG9wXCIsXG4gIFwib2Zmc2V0TGVmdFwiLFxuICBcImxvY2FsTmFtZVwiLFxuICBcInByZWZpeFwiLFxuICBcIm5hbWVzcGFjZVVSSVwiLFxuICBcImlkXCIsXG4gIFwic3R5bGVcIixcbiAgXCJhdHRyaWJ1dGVzXCIsXG4gIFwidGFnTmFtZVwiLFxuICBcInBhcmVudEVsZW1lbnRcIixcbiAgXCJ0ZXh0Q29udGVudFwiLFxuICBcImJhc2VVUklcIixcbiAgXCJvd25lckRvY3VtZW50XCIsXG4gIFwibmV4dFNpYmxpbmdcIixcbiAgXCJwcmV2aW91c1NpYmxpbmdcIixcbiAgXCJsYXN0Q2hpbGRcIixcbiAgXCJmaXJzdENoaWxkXCIsXG4gIFwiY2hpbGROb2Rlc1wiLFxuICBcInBhcmVudE5vZGVcIixcbiAgXCJub2RlVHlwZVwiLFxuICBcIm5vZGVWYWx1ZVwiLFxuICBcIm5vZGVOYW1lXCIsXG4gIFwiY2xvc3VyZV9sbV83MTQ2MTdcIixcbiAgXCJfX2pzYWN0aW9uXCJcbl07XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
