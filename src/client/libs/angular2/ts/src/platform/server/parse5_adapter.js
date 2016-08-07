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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL3NlcnZlci9wYXJzZTVfYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7UUFBSSxNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsRUFDVixXQUFXLEVBZ0JYLGNBQWMsRUFNZCxNQUFNLEVBRU4sUUFBUSxvQkEwaEJSLHdCQUF3QjtJQXhoQjVCLHlCQUF5QixVQUFVO1FBQ2pDLE1BQU0sQ0FBQyxJQUFJLDBCQUFhLENBQUMsc0RBQXNELEdBQUcsVUFBVSxDQUFDLENBQUM7SUFDaEcsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQS9CRyxNQUFNLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM1RCxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDcEUsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFnQmpDLGNBQWMsR0FBNEI7Z0JBQzVDLE9BQU8sRUFBRSxXQUFXO2dCQUNwQixXQUFXLEVBQUUsV0FBVztnQkFDeEIsVUFBVSxFQUFFLFVBQVU7Z0JBQ3RCLFVBQVUsRUFBRSxVQUFVO2FBQ3ZCLENBQUM7WUFDRSxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBRWQsUUFBUSxHQUFHLENBQUMsU0FBUyxFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFNcEUseUNBQXlDO1lBQ3pDO2dCQUFzQyxvQ0FBVTtnQkFBaEQ7b0JBQXNDLDhCQUFVO2dCQWdoQmhELENBQUM7Z0JBL2dCUSw0QkFBVyxHQUFsQixjQUF1Qiw4QkFBaUIsQ0FBQyxJQUFJLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JB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Z0JBQ1gsV0FBVztnQkFDWCxXQUFXO2dCQUNYLFFBQVE7Z0JBQ1IsZ0JBQWdCO2dCQUNoQixXQUFXO2dCQUNYLFVBQVU7Z0JBQ1YsS0FBSztnQkFDTCxXQUFXO2dCQUNYLE1BQU07Z0JBQ04sT0FBTztnQkFDUCxtQkFBbUI7Z0JBQ25CLGtCQUFrQjtnQkFDbEIsbUJBQW1CO2dCQUNuQixVQUFVO2dCQUNWLHlCQUF5QjtnQkFDekIsMEJBQTBCO2dCQUMxQixvQkFBb0I7Z0JBQ3BCLHdCQUF3QjtnQkFDeEIsU0FBUztnQkFDVCxlQUFlO2dCQUNmLFVBQVU7Z0JBQ1YsU0FBUztnQkFDVCxPQUFPO2dCQUNQLFFBQVE7Z0JBQ1IsZUFBZTtnQkFDZixhQUFhO2dCQUNiLGNBQWM7Z0JBQ2QsWUFBWTtnQkFDWixTQUFTO2dCQUNULFdBQVc7Z0JBQ1gsV0FBVztnQkFDWCxXQUFXO2dCQUNYLFdBQVc7Z0JBQ1gsY0FBYztnQkFDZCxhQUFhO2dCQUNiLFdBQVc7Z0JBQ1gsWUFBWTtnQkFDWixjQUFjO2dCQUNkLGFBQWE7Z0JBQ2IsV0FBVztnQkFDWCxZQUFZO2dCQUNaLGNBQWM7Z0JBQ2QsY0FBYztnQkFDZCxhQUFhO2dCQUNiLFdBQVc7Z0JBQ1gsWUFBWTtnQkFDWixXQUFXO2dCQUNYLFFBQVE7Z0JBQ1IsY0FBYztnQkFDZCxJQUFJO2dCQUNKLE9BQU87Z0JBQ1AsWUFBWTtnQkFDWixTQUFTO2dCQUNULGVBQWU7Z0JBQ2YsYUFBYTtnQkFDYixTQUFTO2dCQUNULGVBQWU7Z0JBQ2YsYUFBYTtnQkFDYixpQkFBaUI7Z0JBQ2pCLFdBQVc7Z0JBQ1gsWUFBWTtnQkFDWixZQUFZO2dCQUNaLFlBQVk7Z0JBQ1osVUFBVTtnQkFDVixXQUFXO2dCQUNYLFVBQVU7Z0JBQ1YsbUJBQW1CO2dCQUNuQixZQUFZO2FBQ2IsQ0FBQyIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9zZXJ2ZXIvcGFyc2U1X2FkYXB0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgcGFyc2U1ID0gcmVxdWlyZSgncGFyc2U1L2luZGV4Jyk7XG52YXIgcGFyc2VyID0gbmV3IHBhcnNlNS5QYXJzZXIocGFyc2U1LlRyZWVBZGFwdGVycy5odG1scGFyc2VyMik7XG52YXIgc2VyaWFsaXplciA9IG5ldyBwYXJzZTUuU2VyaWFsaXplcihwYXJzZTUuVHJlZUFkYXB0ZXJzLmh0bWxwYXJzZXIyKTtcbnZhciB0cmVlQWRhcHRlciA9IHBhcnNlci50cmVlQWRhcHRlcjtcblxuaW1wb3J0IHtNYXBXcmFwcGVyLCBMaXN0V3JhcHBlciwgU3RyaW5nTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7RG9tQWRhcHRlciwgc2V0Um9vdERvbUFkYXB0ZXJ9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2NvbW1vbl9kb20nO1xuaW1wb3J0IHtcbiAgaXNQcmVzZW50LFxuICBpc0JsYW5rLFxuICBnbG9iYWwsXG4gIFR5cGUsXG4gIHNldFZhbHVlT25QYXRoLFxuICBEYXRlV3JhcHBlclxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9uLCBXcmFwcGVkRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtTZWxlY3Rvck1hdGNoZXIsIENzc1NlbGVjdG9yfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvc2VsZWN0b3InO1xuaW1wb3J0IHtYSFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci94aHInO1xuXG52YXIgX2F0dHJUb1Byb3BNYXA6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAnY2xhc3MnOiAnY2xhc3NOYW1lJyxcbiAgJ2lubmVySHRtbCc6ICdpbm5lckhUTUwnLFxuICAncmVhZG9ubHknOiAncmVhZE9ubHknLFxuICAndGFiaW5kZXgnOiAndGFiSW5kZXgnLFxufTtcbnZhciBkZWZEb2MgPSBudWxsO1xuXG52YXIgbWFwUHJvcHMgPSBbJ2F0dHJpYnMnLCAneC1hdHRyaWJzTmFtZXNwYWNlJywgJ3gtYXR0cmlic1ByZWZpeCddO1xuXG5mdW5jdGlvbiBfbm90SW1wbGVtZW50ZWQobWV0aG9kTmFtZSkge1xuICByZXR1cm4gbmV3IEJhc2VFeGNlcHRpb24oJ1RoaXMgbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZCBpbiBQYXJzZTVEb21BZGFwdGVyOiAnICsgbWV0aG9kTmFtZSk7XG59XG5cbi8qIHRzbGludDpkaXNhYmxlOnJlcXVpcmVQYXJhbWV0ZXJUeXBlICovXG5leHBvcnQgY2xhc3MgUGFyc2U1RG9tQWRhcHRlciBleHRlbmRzIERvbUFkYXB0ZXIge1xuICBzdGF0aWMgbWFrZUN1cnJlbnQoKSB7IHNldFJvb3REb21BZGFwdGVyKG5ldyBQYXJzZTVEb21BZGFwdGVyKCkpOyB9XG5cbiAgaGFzUHJvcGVydHkoZWxlbWVudCwgbmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIF9IVE1MRWxlbWVudFByb3BlcnR5TGlzdC5pbmRleE9mKG5hbWUpID4gLTE7XG4gIH1cbiAgLy8gVE9ETyh0Ym9zY2gpOiBkb24ndCBldmVuIGNhbGwgdGhpcyBtZXRob2Qgd2hlbiB3ZSBydW4gdGhlIHRlc3RzIG9uIHNlcnZlciBzaWRlXG4gIC8vIGJ5IG5vdCB1c2luZyB0aGUgRG9tUmVuZGVyZXIgaW4gdGVzdHMuIEtlZXBpbmcgdGhpcyBmb3Igbm93IHRvIG1ha2UgdGVzdHMgaGFwcHkuLi5cbiAgc2V0UHJvcGVydHkoZWw6IC8qZWxlbWVudCovIGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgaWYgKG5hbWUgPT09ICdpbm5lckhUTUwnKSB7XG4gICAgICB0aGlzLnNldElubmVySFRNTChlbCwgdmFsdWUpO1xuICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gJ2NsYXNzTmFtZScpIHtcbiAgICAgIGVsLmF0dHJpYnNbXCJjbGFzc1wiXSA9IGVsLmNsYXNzTmFtZSA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbFtuYW1lXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICAvLyBUT0RPKHRib3NjaCk6IGRvbid0IGV2ZW4gY2FsbCB0aGlzIG1ldGhvZCB3aGVuIHdlIHJ1biB0aGUgdGVzdHMgb24gc2VydmVyIHNpZGVcbiAgLy8gYnkgbm90IHVzaW5nIHRoZSBEb21SZW5kZXJlciBpbiB0ZXN0cy4gS2VlcGluZyB0aGlzIGZvciBub3cgdG8gbWFrZSB0ZXN0cyBoYXBweS4uLlxuICBnZXRQcm9wZXJ0eShlbDogLyplbGVtZW50Ki8gYW55LCBuYW1lOiBzdHJpbmcpOiBhbnkgeyByZXR1cm4gZWxbbmFtZV07IH1cblxuICBsb2dFcnJvcihlcnJvcikgeyBjb25zb2xlLmVycm9yKGVycm9yKTsgfVxuXG4gIGxvZyhlcnJvcikgeyBjb25zb2xlLmxvZyhlcnJvcik7IH1cblxuICBsb2dHcm91cChlcnJvcikgeyBjb25zb2xlLmVycm9yKGVycm9yKTsgfVxuXG4gIGxvZ0dyb3VwRW5kKCkge31cblxuICBnZXRYSFIoKTogVHlwZSB7IHJldHVybiBYSFI7IH1cblxuICBnZXQgYXR0clRvUHJvcE1hcCgpIHsgcmV0dXJuIF9hdHRyVG9Qcm9wTWFwOyB9XG5cbiAgcXVlcnkoc2VsZWN0b3IpIHsgdGhyb3cgX25vdEltcGxlbWVudGVkKCdxdWVyeScpOyB9XG4gIHF1ZXJ5U2VsZWN0b3IoZWwsIHNlbGVjdG9yOiBzdHJpbmcpOiBhbnkgeyByZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKGVsLCBzZWxlY3RvcilbMF07IH1cbiAgcXVlcnlTZWxlY3RvckFsbChlbCwgc2VsZWN0b3I6IHN0cmluZyk6IGFueVtdIHtcbiAgICB2YXIgcmVzID0gW107XG4gICAgdmFyIF9yZWN1cnNpdmUgPSAocmVzdWx0LCBub2RlLCBzZWxlY3RvciwgbWF0Y2hlcikgPT4ge1xuICAgICAgdmFyIGNOb2RlcyA9IG5vZGUuY2hpbGROb2RlcztcbiAgICAgIGlmIChjTm9kZXMgJiYgY05vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgY2hpbGROb2RlID0gY05vZGVzW2ldO1xuICAgICAgICAgIGlmICh0aGlzLmVsZW1lbnRNYXRjaGVzKGNoaWxkTm9kZSwgc2VsZWN0b3IsIG1hdGNoZXIpKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChjaGlsZE5vZGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBfcmVjdXJzaXZlKHJlc3VsdCwgY2hpbGROb2RlLCBzZWxlY3RvciwgbWF0Y2hlcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBtYXRjaGVyID0gbmV3IFNlbGVjdG9yTWF0Y2hlcigpO1xuICAgIG1hdGNoZXIuYWRkU2VsZWN0YWJsZXMoQ3NzU2VsZWN0b3IucGFyc2Uoc2VsZWN0b3IpKTtcbiAgICBfcmVjdXJzaXZlKHJlcywgZWwsIHNlbGVjdG9yLCBtYXRjaGVyKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIGVsZW1lbnRNYXRjaGVzKG5vZGUsIHNlbGVjdG9yOiBzdHJpbmcsIG1hdGNoZXIgPSBudWxsKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuaXNFbGVtZW50Tm9kZShub2RlKSAmJiBzZWxlY3RvciA9PT0gJyonKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuICAgIGlmIChzZWxlY3RvciAmJiBzZWxlY3Rvci5jaGFyQXQoMCkgPT0gXCIjXCIpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuZ2V0QXR0cmlidXRlKG5vZGUsICdpZCcpID09IHNlbGVjdG9yLnN1YnN0cmluZygxKTtcbiAgICB9IGVsc2UgaWYgKHNlbGVjdG9yKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBpZiAobWF0Y2hlciA9PSBudWxsKSB7XG4gICAgICAgIG1hdGNoZXIgPSBuZXcgU2VsZWN0b3JNYXRjaGVyKCk7XG4gICAgICAgIG1hdGNoZXIuYWRkU2VsZWN0YWJsZXMoQ3NzU2VsZWN0b3IucGFyc2Uoc2VsZWN0b3IpKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGNzc1NlbGVjdG9yID0gbmV3IENzc1NlbGVjdG9yKCk7XG4gICAgICBjc3NTZWxlY3Rvci5zZXRFbGVtZW50KHRoaXMudGFnTmFtZShub2RlKSk7XG4gICAgICBpZiAobm9kZS5hdHRyaWJzKSB7XG4gICAgICAgIGZvciAodmFyIGF0dHJOYW1lIGluIG5vZGUuYXR0cmlicykge1xuICAgICAgICAgIGNzc1NlbGVjdG9yLmFkZEF0dHJpYnV0ZShhdHRyTmFtZSwgbm9kZS5hdHRyaWJzW2F0dHJOYW1lXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBjbGFzc0xpc3QgPSB0aGlzLmNsYXNzTGlzdChub2RlKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3NMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNzc1NlbGVjdG9yLmFkZENsYXNzTmFtZShjbGFzc0xpc3RbaV0pO1xuICAgICAgfVxuXG4gICAgICBtYXRjaGVyLm1hdGNoKGNzc1NlbGVjdG9yLCBmdW5jdGlvbihzZWxlY3RvciwgY2IpIHsgcmVzdWx0ID0gdHJ1ZTsgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgb24oZWwsIGV2dCwgbGlzdGVuZXIpIHtcbiAgICB2YXIgbGlzdGVuZXJzTWFwOiB7W2s6IC8qYW55Ki8gc3RyaW5nXTogYW55fSA9IGVsLl9ldmVudExpc3RlbmVyc01hcDtcbiAgICBpZiAoaXNCbGFuayhsaXN0ZW5lcnNNYXApKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzTWFwOiB7W2s6IC8qYW55Ki8gc3RyaW5nXTogYW55fSA9IFN0cmluZ01hcFdyYXBwZXIuY3JlYXRlKCk7XG4gICAgICBlbC5fZXZlbnRMaXN0ZW5lcnNNYXAgPSBsaXN0ZW5lcnNNYXA7XG4gICAgfVxuICAgIHZhciBsaXN0ZW5lcnMgPSBTdHJpbmdNYXBXcmFwcGVyLmdldChsaXN0ZW5lcnNNYXAsIGV2dCk7XG4gICAgaWYgKGlzQmxhbmsobGlzdGVuZXJzKSkge1xuICAgICAgbGlzdGVuZXJzID0gW107XG4gICAgfVxuICAgIGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICBTdHJpbmdNYXBXcmFwcGVyLnNldChsaXN0ZW5lcnNNYXAsIGV2dCwgbGlzdGVuZXJzKTtcbiAgfVxuICBvbkFuZENhbmNlbChlbCwgZXZ0LCBsaXN0ZW5lcik6IEZ1bmN0aW9uIHtcbiAgICB0aGlzLm9uKGVsLCBldnQsIGxpc3RlbmVyKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgTGlzdFdyYXBwZXIucmVtb3ZlKFN0cmluZ01hcFdyYXBwZXIuZ2V0PGFueVtdPihlbC5fZXZlbnRMaXN0ZW5lcnNNYXAsIGV2dCksIGxpc3RlbmVyKTtcbiAgICB9O1xuICB9XG4gIGRpc3BhdGNoRXZlbnQoZWwsIGV2dCkge1xuICAgIGlmIChpc0JsYW5rKGV2dC50YXJnZXQpKSB7XG4gICAgICBldnQudGFyZ2V0ID0gZWw7XG4gICAgfVxuICAgIGlmIChpc1ByZXNlbnQoZWwuX2V2ZW50TGlzdGVuZXJzTWFwKSkge1xuICAgICAgdmFyIGxpc3RlbmVyczogYW55ID0gU3RyaW5nTWFwV3JhcHBlci5nZXQoZWwuX2V2ZW50TGlzdGVuZXJzTWFwLCBldnQudHlwZSk7XG4gICAgICBpZiAoaXNQcmVzZW50KGxpc3RlbmVycykpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBsaXN0ZW5lcnNbaV0oZXZ0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXNQcmVzZW50KGVsLnBhcmVudCkpIHtcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChlbC5wYXJlbnQsIGV2dCk7XG4gICAgfVxuICAgIGlmIChpc1ByZXNlbnQoZWwuX3dpbmRvdykpIHtcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChlbC5fd2luZG93LCBldnQpO1xuICAgIH1cbiAgfVxuICBjcmVhdGVNb3VzZUV2ZW50KGV2ZW50VHlwZSk6IEV2ZW50IHsgcmV0dXJuIHRoaXMuY3JlYXRlRXZlbnQoZXZlbnRUeXBlKTsgfVxuICBjcmVhdGVFdmVudChldmVudFR5cGU6IHN0cmluZyk6IEV2ZW50IHtcbiAgICB2YXIgZXZ0ID0gPEV2ZW50PntcbiAgICAgIHR5cGU6IGV2ZW50VHlwZSxcbiAgICAgIGRlZmF1bHRQcmV2ZW50ZWQ6IGZhbHNlLFxuICAgICAgcHJldmVudERlZmF1bHQ6ICgpID0+IHsgZXZ0LmRlZmF1bHRQcmV2ZW50ZWQgPSB0cnVlOyB9XG4gICAgfTtcbiAgICByZXR1cm4gZXZ0O1xuICB9XG4gIHByZXZlbnREZWZhdWx0KGV2dCkgeyBldnQucmV0dXJuVmFsdWUgPSBmYWxzZTsgfVxuICBpc1ByZXZlbnRlZChldnQpOiBib29sZWFuIHsgcmV0dXJuIGlzUHJlc2VudChldnQucmV0dXJuVmFsdWUpICYmICFldnQucmV0dXJuVmFsdWU7IH1cbiAgZ2V0SW5uZXJIVE1MKGVsKTogc3RyaW5nIHsgcmV0dXJuIHNlcmlhbGl6ZXIuc2VyaWFsaXplKHRoaXMudGVtcGxhdGVBd2FyZVJvb3QoZWwpKTsgfVxuICBnZXRPdXRlckhUTUwoZWwpOiBzdHJpbmcge1xuICAgIHNlcmlhbGl6ZXIuaHRtbCA9ICcnO1xuICAgIHNlcmlhbGl6ZXIuX3NlcmlhbGl6ZUVsZW1lbnQoZWwpO1xuICAgIHJldHVybiBzZXJpYWxpemVyLmh0bWw7XG4gIH1cbiAgbm9kZU5hbWUobm9kZSk6IHN0cmluZyB7IHJldHVybiBub2RlLnRhZ05hbWU7IH1cbiAgbm9kZVZhbHVlKG5vZGUpOiBzdHJpbmcgeyByZXR1cm4gbm9kZS5ub2RlVmFsdWU7IH1cbiAgdHlwZShub2RlOiBhbnkpOiBzdHJpbmcgeyB0aHJvdyBfbm90SW1wbGVtZW50ZWQoJ3R5cGUnKTsgfVxuICBjb250ZW50KG5vZGUpOiBzdHJpbmcgeyByZXR1cm4gbm9kZS5jaGlsZE5vZGVzWzBdOyB9XG4gIGZpcnN0Q2hpbGQoZWwpOiBOb2RlIHsgcmV0dXJuIGVsLmZpcnN0Q2hpbGQ7IH1cbiAgbmV4dFNpYmxpbmcoZWwpOiBOb2RlIHsgcmV0dXJuIGVsLm5leHRTaWJsaW5nOyB9XG4gIHBhcmVudEVsZW1lbnQoZWwpOiBOb2RlIHsgcmV0dXJuIGVsLnBhcmVudDsgfVxuICBjaGlsZE5vZGVzKGVsKTogTm9kZVtdIHsgcmV0dXJuIGVsLmNoaWxkTm9kZXM7IH1cbiAgY2hpbGROb2Rlc0FzTGlzdChlbCk6IGFueVtdIHtcbiAgICB2YXIgY2hpbGROb2RlcyA9IGVsLmNoaWxkTm9kZXM7XG4gICAgdmFyIHJlcyA9IExpc3RXcmFwcGVyLmNyZWF0ZUZpeGVkU2l6ZShjaGlsZE5vZGVzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXNbaV0gPSBjaGlsZE5vZGVzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIGNsZWFyTm9kZXMoZWwpIHtcbiAgICB3aGlsZSAoZWwuY2hpbGROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnJlbW92ZShlbC5jaGlsZE5vZGVzWzBdKTtcbiAgICB9XG4gIH1cbiAgYXBwZW5kQ2hpbGQoZWwsIG5vZGUpIHtcbiAgICB0aGlzLnJlbW92ZShub2RlKTtcbiAgICB0cmVlQWRhcHRlci5hcHBlbmRDaGlsZCh0aGlzLnRlbXBsYXRlQXdhcmVSb290KGVsKSwgbm9kZSk7XG4gIH1cbiAgcmVtb3ZlQ2hpbGQoZWwsIG5vZGUpIHtcbiAgICBpZiAoTGlzdFdyYXBwZXIuY29udGFpbnMoZWwuY2hpbGROb2Rlcywgbm9kZSkpIHtcbiAgICAgIHRoaXMucmVtb3ZlKG5vZGUpO1xuICAgIH1cbiAgfVxuICByZW1vdmUoZWwpOiBIVE1MRWxlbWVudCB7XG4gICAgdmFyIHBhcmVudCA9IGVsLnBhcmVudDtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICB2YXIgaW5kZXggPSBwYXJlbnQuY2hpbGROb2Rlcy5pbmRleE9mKGVsKTtcbiAgICAgIHBhcmVudC5jaGlsZE5vZGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIHZhciBwcmV2ID0gZWwucHJldmlvdXNTaWJsaW5nO1xuICAgIHZhciBuZXh0ID0gZWwubmV4dFNpYmxpbmc7XG4gICAgaWYgKHByZXYpIHtcbiAgICAgIHByZXYubmV4dCA9IG5leHQ7XG4gICAgfVxuICAgIGlmIChuZXh0KSB7XG4gICAgICBuZXh0LnByZXYgPSBwcmV2O1xuICAgIH1cbiAgICBlbC5wcmV2ID0gbnVsbDtcbiAgICBlbC5uZXh0ID0gbnVsbDtcbiAgICBlbC5wYXJlbnQgPSBudWxsO1xuICAgIHJldHVybiBlbDtcbiAgfVxuICBpbnNlcnRCZWZvcmUoZWwsIG5vZGUpIHtcbiAgICB0aGlzLnJlbW92ZShub2RlKTtcbiAgICB0cmVlQWRhcHRlci5pbnNlcnRCZWZvcmUoZWwucGFyZW50LCBub2RlLCBlbCk7XG4gIH1cbiAgaW5zZXJ0QWxsQmVmb3JlKGVsLCBub2RlcykgeyBub2Rlcy5mb3JFYWNoKG4gPT4gdGhpcy5pbnNlcnRCZWZvcmUoZWwsIG4pKTsgfVxuICBpbnNlcnRBZnRlcihlbCwgbm9kZSkge1xuICAgIGlmIChlbC5uZXh0U2libGluZykge1xuICAgICAgdGhpcy5pbnNlcnRCZWZvcmUoZWwubmV4dFNpYmxpbmcsIG5vZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFwcGVuZENoaWxkKGVsLnBhcmVudCwgbm9kZSk7XG4gICAgfVxuICB9XG4gIHNldElubmVySFRNTChlbCwgdmFsdWUpIHtcbiAgICB0aGlzLmNsZWFyTm9kZXMoZWwpO1xuICAgIHZhciBjb250ZW50ID0gcGFyc2VyLnBhcnNlRnJhZ21lbnQodmFsdWUpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGVudC5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0cmVlQWRhcHRlci5hcHBlbmRDaGlsZChlbCwgY29udGVudC5jaGlsZE5vZGVzW2ldKTtcbiAgICB9XG4gIH1cbiAgZ2V0VGV4dChlbCwgaXNSZWN1cnNpdmU/OiBib29sZWFuKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5pc1RleHROb2RlKGVsKSkge1xuICAgICAgcmV0dXJuIGVsLmRhdGE7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzQ29tbWVudE5vZGUoZWwpKSB7XG4gICAgICAvLyBJbiB0aGUgRE9NLCBjb21tZW50cyB3aXRoaW4gYW4gZWxlbWVudCByZXR1cm4gYW4gZW1wdHkgc3RyaW5nIGZvciB0ZXh0Q29udGVudFxuICAgICAgLy8gSG93ZXZlciwgY29tbWVudCBub2RlIGluc3RhbmNlcyByZXR1cm4gdGhlIGNvbW1lbnQgY29udGVudCBmb3IgdGV4dENvbnRlbnQgZ2V0dGVyXG4gICAgICByZXR1cm4gaXNSZWN1cnNpdmUgPyAnJyA6IGVsLmRhdGE7XG4gICAgfSBlbHNlIGlmIChpc0JsYW5rKGVsLmNoaWxkTm9kZXMpIHx8IGVsLmNoaWxkTm9kZXMubGVuZ3RoID09IDApIHtcbiAgICAgIHJldHVybiBcIlwiO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbC5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRleHRDb250ZW50ICs9IHRoaXMuZ2V0VGV4dChlbC5jaGlsZE5vZGVzW2ldLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0ZXh0Q29udGVudDtcbiAgICB9XG4gIH1cbiAgc2V0VGV4dChlbCwgdmFsdWU6IHN0cmluZykge1xuICAgIGlmICh0aGlzLmlzVGV4dE5vZGUoZWwpIHx8IHRoaXMuaXNDb21tZW50Tm9kZShlbCkpIHtcbiAgICAgIGVsLmRhdGEgPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jbGVhck5vZGVzKGVsKTtcbiAgICAgIGlmICh2YWx1ZSAhPT0gJycpIHRyZWVBZGFwdGVyLmluc2VydFRleHQoZWwsIHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgZ2V0VmFsdWUoZWwpOiBzdHJpbmcgeyByZXR1cm4gZWwudmFsdWU7IH1cbiAgc2V0VmFsdWUoZWwsIHZhbHVlOiBzdHJpbmcpIHsgZWwudmFsdWUgPSB2YWx1ZTsgfVxuICBnZXRDaGVja2VkKGVsKTogYm9vbGVhbiB7IHJldHVybiBlbC5jaGVja2VkOyB9XG4gIHNldENoZWNrZWQoZWwsIHZhbHVlOiBib29sZWFuKSB7IGVsLmNoZWNrZWQgPSB2YWx1ZTsgfVxuICBjcmVhdGVDb21tZW50KHRleHQ6IHN0cmluZyk6IENvbW1lbnQgeyByZXR1cm4gdHJlZUFkYXB0ZXIuY3JlYXRlQ29tbWVudE5vZGUodGV4dCk7IH1cbiAgY3JlYXRlVGVtcGxhdGUoaHRtbCk6IEhUTUxFbGVtZW50IHtcbiAgICB2YXIgdGVtcGxhdGUgPSB0cmVlQWRhcHRlci5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIiwgJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnLCBbXSk7XG4gICAgdmFyIGNvbnRlbnQgPSBwYXJzZXIucGFyc2VGcmFnbWVudChodG1sKTtcbiAgICB0cmVlQWRhcHRlci5hcHBlbmRDaGlsZCh0ZW1wbGF0ZSwgY29udGVudCk7XG4gICAgcmV0dXJuIHRlbXBsYXRlO1xuICB9XG4gIGNyZWF0ZUVsZW1lbnQodGFnTmFtZSk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdHJlZUFkYXB0ZXIuY3JlYXRlRWxlbWVudCh0YWdOYW1lLCAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCcsIFtdKTtcbiAgfVxuICBjcmVhdGVFbGVtZW50TlMobnMsIHRhZ05hbWUpOiBIVE1MRWxlbWVudCB7IHJldHVybiB0cmVlQWRhcHRlci5jcmVhdGVFbGVtZW50KHRhZ05hbWUsIG5zLCBbXSk7IH1cbiAgY3JlYXRlVGV4dE5vZGUodGV4dDogc3RyaW5nKTogVGV4dCB7XG4gICAgdmFyIHQgPSA8YW55PnRoaXMuY3JlYXRlQ29tbWVudCh0ZXh0KTtcbiAgICB0LnR5cGUgPSAndGV4dCc7XG4gICAgcmV0dXJuIHQ7XG4gIH1cbiAgY3JlYXRlU2NyaXB0VGFnKGF0dHJOYW1lOiBzdHJpbmcsIGF0dHJWYWx1ZTogc3RyaW5nKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0cmVlQWRhcHRlci5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIsICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbe25hbWU6IGF0dHJOYW1lLCB2YWx1ZTogYXR0clZhbHVlfV0pO1xuICB9XG4gIGNyZWF0ZVN0eWxlRWxlbWVudChjc3M6IHN0cmluZyk6IEhUTUxTdHlsZUVsZW1lbnQge1xuICAgIHZhciBzdHlsZSA9IHRoaXMuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICB0aGlzLnNldFRleHQoc3R5bGUsIGNzcyk7XG4gICAgcmV0dXJuIDxIVE1MU3R5bGVFbGVtZW50PnN0eWxlO1xuICB9XG4gIGNyZWF0ZVNoYWRvd1Jvb3QoZWwpOiBIVE1MRWxlbWVudCB7XG4gICAgZWwuc2hhZG93Um9vdCA9IHRyZWVBZGFwdGVyLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBlbC5zaGFkb3dSb290LnBhcmVudCA9IGVsO1xuICAgIHJldHVybiBlbC5zaGFkb3dSb290O1xuICB9XG4gIGdldFNoYWRvd1Jvb3QoZWwpOiBFbGVtZW50IHsgcmV0dXJuIGVsLnNoYWRvd1Jvb3Q7IH1cbiAgZ2V0SG9zdChlbCk6IHN0cmluZyB7IHJldHVybiBlbC5ob3N0OyB9XG4gIGdldERpc3RyaWJ1dGVkTm9kZXMoZWw6IGFueSk6IE5vZGVbXSB7IHRocm93IF9ub3RJbXBsZW1lbnRlZCgnZ2V0RGlzdHJpYnV0ZWROb2RlcycpOyB9XG4gIGNsb25lKG5vZGU6IE5vZGUpOiBOb2RlIHtcbiAgICB2YXIgX3JlY3Vyc2l2ZSA9IChub2RlKSA9PiB7XG4gICAgICB2YXIgbm9kZUNsb25lID0gT2JqZWN0LmNyZWF0ZShPYmplY3QuZ2V0UHJvdG90eXBlT2Yobm9kZSkpO1xuICAgICAgZm9yICh2YXIgcHJvcCBpbiBub2RlKSB7XG4gICAgICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihub2RlLCBwcm9wKTtcbiAgICAgICAgaWYgKGRlc2MgJiYgJ3ZhbHVlJyBpbiBkZXNjICYmIHR5cGVvZiBkZXNjLnZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIG5vZGVDbG9uZVtwcm9wXSA9IG5vZGVbcHJvcF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG5vZGVDbG9uZS5wYXJlbnQgPSBudWxsO1xuICAgICAgbm9kZUNsb25lLnByZXYgPSBudWxsO1xuICAgICAgbm9kZUNsb25lLm5leHQgPSBudWxsO1xuICAgICAgbm9kZUNsb25lLmNoaWxkcmVuID0gbnVsbDtcblxuICAgICAgbWFwUHJvcHMuZm9yRWFjaChtYXBOYW1lID0+IHtcbiAgICAgICAgaWYgKGlzUHJlc2VudChub2RlW21hcE5hbWVdKSkge1xuICAgICAgICAgIG5vZGVDbG9uZVttYXBOYW1lXSA9IHt9O1xuICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gbm9kZVttYXBOYW1lXSkge1xuICAgICAgICAgICAgbm9kZUNsb25lW21hcE5hbWVdW3Byb3BdID0gbm9kZVttYXBOYW1lXVtwcm9wXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdmFyIGNOb2RlcyA9IG5vZGUuY2hpbGRyZW47XG4gICAgICBpZiAoY05vZGVzKSB7XG4gICAgICAgIHZhciBjTm9kZXNDbG9uZSA9IG5ldyBBcnJheShjTm9kZXMubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgY2hpbGROb2RlID0gY05vZGVzW2ldO1xuICAgICAgICAgIHZhciBjaGlsZE5vZGVDbG9uZSA9IF9yZWN1cnNpdmUoY2hpbGROb2RlKTtcbiAgICAgICAgICBjTm9kZXNDbG9uZVtpXSA9IGNoaWxkTm9kZUNsb25lO1xuICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgY2hpbGROb2RlQ2xvbmUucHJldiA9IGNOb2Rlc0Nsb25lW2kgLSAxXTtcbiAgICAgICAgICAgIGNOb2Rlc0Nsb25lW2kgLSAxXS5uZXh0ID0gY2hpbGROb2RlQ2xvbmU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNoaWxkTm9kZUNsb25lLnBhcmVudCA9IG5vZGVDbG9uZTtcbiAgICAgICAgfVxuICAgICAgICBub2RlQ2xvbmUuY2hpbGRyZW4gPSBjTm9kZXNDbG9uZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBub2RlQ2xvbmU7XG4gICAgfTtcbiAgICByZXR1cm4gX3JlY3Vyc2l2ZShub2RlKTtcbiAgfVxuICBnZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGVsZW1lbnQsIG5hbWU6IHN0cmluZyk6IEhUTUxFbGVtZW50W10ge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudCwgXCIuXCIgKyBuYW1lKTtcbiAgfVxuICBnZXRFbGVtZW50c0J5VGFnTmFtZShlbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZyk6IEhUTUxFbGVtZW50W10ge1xuICAgIHRocm93IF9ub3RJbXBsZW1lbnRlZCgnZ2V0RWxlbWVudHNCeVRhZ05hbWUnKTtcbiAgfVxuICBjbGFzc0xpc3QoZWxlbWVudCk6IHN0cmluZ1tdIHtcbiAgICB2YXIgY2xhc3NBdHRyVmFsdWUgPSBudWxsO1xuICAgIHZhciBhdHRyaWJ1dGVzID0gZWxlbWVudC5hdHRyaWJzO1xuICAgIGlmIChhdHRyaWJ1dGVzICYmIGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoXCJjbGFzc1wiKSkge1xuICAgICAgY2xhc3NBdHRyVmFsdWUgPSBhdHRyaWJ1dGVzW1wiY2xhc3NcIl07XG4gICAgfVxuICAgIHJldHVybiBjbGFzc0F0dHJWYWx1ZSA/IGNsYXNzQXR0clZhbHVlLnRyaW0oKS5zcGxpdCgvXFxzKy9nKSA6IFtdO1xuICB9XG4gIGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gICAgdmFyIGNsYXNzTGlzdCA9IHRoaXMuY2xhc3NMaXN0KGVsZW1lbnQpO1xuICAgIHZhciBpbmRleCA9IGNsYXNzTGlzdC5pbmRleE9mKGNsYXNzTmFtZSk7XG4gICAgaWYgKGluZGV4ID09IC0xKSB7XG4gICAgICBjbGFzc0xpc3QucHVzaChjbGFzc05hbWUpO1xuICAgICAgZWxlbWVudC5hdHRyaWJzW1wiY2xhc3NcIl0gPSBlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTGlzdC5qb2luKFwiIFwiKTtcbiAgICB9XG4gIH1cbiAgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lOiBzdHJpbmcpIHtcbiAgICB2YXIgY2xhc3NMaXN0ID0gdGhpcy5jbGFzc0xpc3QoZWxlbWVudCk7XG4gICAgdmFyIGluZGV4ID0gY2xhc3NMaXN0LmluZGV4T2YoY2xhc3NOYW1lKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgY2xhc3NMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICBlbGVtZW50LmF0dHJpYnNbXCJjbGFzc1wiXSA9IGVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NMaXN0LmpvaW4oXCIgXCIpO1xuICAgIH1cbiAgfVxuICBoYXNDbGFzcyhlbGVtZW50LCBjbGFzc05hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBMaXN0V3JhcHBlci5jb250YWlucyh0aGlzLmNsYXNzTGlzdChlbGVtZW50KSwgY2xhc3NOYW1lKTtcbiAgfVxuICBoYXNTdHlsZShlbGVtZW50LCBzdHlsZU5hbWU6IHN0cmluZywgc3R5bGVWYWx1ZTogc3RyaW5nID0gbnVsbCk6IGJvb2xlYW4ge1xuICAgIHZhciB2YWx1ZSA9IHRoaXMuZ2V0U3R5bGUoZWxlbWVudCwgc3R5bGVOYW1lKSB8fCAnJztcbiAgICByZXR1cm4gc3R5bGVWYWx1ZSA/IHZhbHVlID09IHN0eWxlVmFsdWUgOiB2YWx1ZS5sZW5ndGggPiAwO1xuICB9XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3JlYWRTdHlsZUF0dHJpYnV0ZShlbGVtZW50KSB7XG4gICAgdmFyIHN0eWxlTWFwID0ge307XG4gICAgdmFyIGF0dHJpYnV0ZXMgPSBlbGVtZW50LmF0dHJpYnM7XG4gICAgaWYgKGF0dHJpYnV0ZXMgJiYgYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eShcInN0eWxlXCIpKSB7XG4gICAgICB2YXIgc3R5bGVBdHRyVmFsdWUgPSBhdHRyaWJ1dGVzW1wic3R5bGVcIl07XG4gICAgICB2YXIgc3R5bGVMaXN0ID0gc3R5bGVBdHRyVmFsdWUuc3BsaXQoLzsrL2cpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHN0eWxlTGlzdFtpXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdmFyIGVsZW1zID0gc3R5bGVMaXN0W2ldLnNwbGl0KC86Ky9nKTtcbiAgICAgICAgICBzdHlsZU1hcFtlbGVtc1swXS50cmltKCldID0gZWxlbXNbMV0udHJpbSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdHlsZU1hcDtcbiAgfVxuICAvKiogQGludGVybmFsICovXG4gIF93cml0ZVN0eWxlQXR0cmlidXRlKGVsZW1lbnQsIHN0eWxlTWFwKSB7XG4gICAgdmFyIHN0eWxlQXR0clZhbHVlID0gXCJcIjtcbiAgICBmb3IgKHZhciBrZXkgaW4gc3R5bGVNYXApIHtcbiAgICAgIHZhciBuZXdWYWx1ZSA9IHN0eWxlTWFwW2tleV07XG4gICAgICBpZiAobmV3VmFsdWUgJiYgbmV3VmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICBzdHlsZUF0dHJWYWx1ZSArPSBrZXkgKyBcIjpcIiArIHN0eWxlTWFwW2tleV0gKyBcIjtcIjtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxlbWVudC5hdHRyaWJzW1wic3R5bGVcIl0gPSBzdHlsZUF0dHJWYWx1ZTtcbiAgfVxuICBzZXRTdHlsZShlbGVtZW50LCBzdHlsZU5hbWU6IHN0cmluZywgc3R5bGVWYWx1ZTogc3RyaW5nKSB7XG4gICAgdmFyIHN0eWxlTWFwID0gdGhpcy5fcmVhZFN0eWxlQXR0cmlidXRlKGVsZW1lbnQpO1xuICAgIHN0eWxlTWFwW3N0eWxlTmFtZV0gPSBzdHlsZVZhbHVlO1xuICAgIHRoaXMuX3dyaXRlU3R5bGVBdHRyaWJ1dGUoZWxlbWVudCwgc3R5bGVNYXApO1xuICB9XG4gIHJlbW92ZVN0eWxlKGVsZW1lbnQsIHN0eWxlTmFtZTogc3RyaW5nKSB7IHRoaXMuc2V0U3R5bGUoZWxlbWVudCwgc3R5bGVOYW1lLCBudWxsKTsgfVxuICBnZXRTdHlsZShlbGVtZW50LCBzdHlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgdmFyIHN0eWxlTWFwID0gdGhpcy5fcmVhZFN0eWxlQXR0cmlidXRlKGVsZW1lbnQpO1xuICAgIHJldHVybiBzdHlsZU1hcC5oYXNPd25Qcm9wZXJ0eShzdHlsZU5hbWUpID8gc3R5bGVNYXBbc3R5bGVOYW1lXSA6IFwiXCI7XG4gIH1cbiAgdGFnTmFtZShlbGVtZW50KTogc3RyaW5nIHsgcmV0dXJuIGVsZW1lbnQudGFnTmFtZSA9PSBcInN0eWxlXCIgPyBcIlNUWUxFXCIgOiBlbGVtZW50LnRhZ05hbWU7IH1cbiAgYXR0cmlidXRlTWFwKGVsZW1lbnQpOiBNYXA8c3RyaW5nLCBzdHJpbmc+IHtcbiAgICB2YXIgcmVzID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbiAgICB2YXIgZWxBdHRycyA9IHRyZWVBZGFwdGVyLmdldEF0dHJMaXN0KGVsZW1lbnQpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxBdHRycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGF0dHJpYiA9IGVsQXR0cnNbaV07XG4gICAgICByZXMuc2V0KGF0dHJpYi5uYW1lLCBhdHRyaWIudmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIGhhc0F0dHJpYnV0ZShlbGVtZW50LCBhdHRyaWJ1dGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBlbGVtZW50LmF0dHJpYnMgJiYgZWxlbWVudC5hdHRyaWJzLmhhc093blByb3BlcnR5KGF0dHJpYnV0ZSk7XG4gIH1cbiAgaGFzQXR0cmlidXRlTlMoZWxlbWVudCwgbnM6IHN0cmluZywgYXR0cmlidXRlOiBzdHJpbmcpOiBib29sZWFuIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0QXR0cmlidXRlKGVsZW1lbnQsIGF0dHJpYnV0ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZWxlbWVudC5hdHRyaWJzICYmIGVsZW1lbnQuYXR0cmlicy5oYXNPd25Qcm9wZXJ0eShhdHRyaWJ1dGUpID9cbiAgICAgICAgICAgICAgIGVsZW1lbnQuYXR0cmlic1thdHRyaWJ1dGVdIDpcbiAgICAgICAgICAgICAgIG51bGw7XG4gIH1cbiAgZ2V0QXR0cmlidXRlTlMoZWxlbWVudCwgbnM6IHN0cmluZywgYXR0cmlidXRlOiBzdHJpbmcpOiBzdHJpbmcgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBzZXRBdHRyaWJ1dGUoZWxlbWVudCwgYXR0cmlidXRlOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAoYXR0cmlidXRlKSB7XG4gICAgICBlbGVtZW50LmF0dHJpYnNbYXR0cmlidXRlXSA9IHZhbHVlO1xuICAgICAgaWYgKGF0dHJpYnV0ZSA9PT0gJ2NsYXNzJykge1xuICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBzZXRBdHRyaWJ1dGVOUyhlbGVtZW50LCBuczogc3RyaW5nLCBhdHRyaWJ1dGU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICByZW1vdmVBdHRyaWJ1dGUoZWxlbWVudCwgYXR0cmlidXRlOiBzdHJpbmcpIHtcbiAgICBpZiAoYXR0cmlidXRlKSB7XG4gICAgICBTdHJpbmdNYXBXcmFwcGVyLmRlbGV0ZShlbGVtZW50LmF0dHJpYnMsIGF0dHJpYnV0ZSk7XG4gICAgfVxuICB9XG4gIHJlbW92ZUF0dHJpYnV0ZU5TKGVsZW1lbnQsIG5zOiBzdHJpbmcsIG5hbWU6IHN0cmluZykgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICB0ZW1wbGF0ZUF3YXJlUm9vdChlbCk6IGFueSB7IHJldHVybiB0aGlzLmlzVGVtcGxhdGVFbGVtZW50KGVsKSA/IHRoaXMuY29udGVudChlbCkgOiBlbDsgfVxuICBjcmVhdGVIdG1sRG9jdW1lbnQoKTogRG9jdW1lbnQge1xuICAgIHZhciBuZXdEb2MgPSB0cmVlQWRhcHRlci5jcmVhdGVEb2N1bWVudCgpO1xuICAgIG5ld0RvYy50aXRsZSA9IFwiZmFrZSB0aXRsZVwiO1xuICAgIHZhciBoZWFkID0gdHJlZUFkYXB0ZXIuY3JlYXRlRWxlbWVudChcImhlYWRcIiwgbnVsbCwgW10pO1xuICAgIHZhciBib2R5ID0gdHJlZUFkYXB0ZXIuY3JlYXRlRWxlbWVudChcImJvZHlcIiwgJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnLCBbXSk7XG4gICAgdGhpcy5hcHBlbmRDaGlsZChuZXdEb2MsIGhlYWQpO1xuICAgIHRoaXMuYXBwZW5kQ2hpbGQobmV3RG9jLCBib2R5KTtcbiAgICBTdHJpbmdNYXBXcmFwcGVyLnNldChuZXdEb2MsIFwiaGVhZFwiLCBoZWFkKTtcbiAgICBTdHJpbmdNYXBXcmFwcGVyLnNldChuZXdEb2MsIFwiYm9keVwiLCBib2R5KTtcbiAgICBTdHJpbmdNYXBXcmFwcGVyLnNldChuZXdEb2MsIFwiX3dpbmRvd1wiLCBTdHJpbmdNYXBXcmFwcGVyLmNyZWF0ZSgpKTtcbiAgICByZXR1cm4gbmV3RG9jO1xuICB9XG4gIGRlZmF1bHREb2MoKTogRG9jdW1lbnQge1xuICAgIGlmIChkZWZEb2MgPT09IG51bGwpIHtcbiAgICAgIGRlZkRvYyA9IHRoaXMuY3JlYXRlSHRtbERvY3VtZW50KCk7XG4gICAgfVxuICAgIHJldHVybiBkZWZEb2M7XG4gIH1cbiAgZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsKTogYW55IHsgcmV0dXJuIHtsZWZ0OiAwLCB0b3A6IDAsIHdpZHRoOiAwLCBoZWlnaHQ6IDB9OyB9XG4gIGdldFRpdGxlKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLmRlZmF1bHREb2MoKS50aXRsZSB8fCBcIlwiOyB9XG4gIHNldFRpdGxlKG5ld1RpdGxlOiBzdHJpbmcpIHsgdGhpcy5kZWZhdWx0RG9jKCkudGl0bGUgPSBuZXdUaXRsZTsgfVxuICBpc1RlbXBsYXRlRWxlbWVudChlbDogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNFbGVtZW50Tm9kZShlbCkgJiYgdGhpcy50YWdOYW1lKGVsKSA9PT0gXCJ0ZW1wbGF0ZVwiO1xuICB9XG4gIGlzVGV4dE5vZGUobm9kZSk6IGJvb2xlYW4geyByZXR1cm4gdHJlZUFkYXB0ZXIuaXNUZXh0Tm9kZShub2RlKTsgfVxuICBpc0NvbW1lbnROb2RlKG5vZGUpOiBib29sZWFuIHsgcmV0dXJuIHRyZWVBZGFwdGVyLmlzQ29tbWVudE5vZGUobm9kZSk7IH1cbiAgaXNFbGVtZW50Tm9kZShub2RlKTogYm9vbGVhbiB7IHJldHVybiBub2RlID8gdHJlZUFkYXB0ZXIuaXNFbGVtZW50Tm9kZShub2RlKSA6IGZhbHNlOyB9XG4gIGhhc1NoYWRvd1Jvb3Qobm9kZSk6IGJvb2xlYW4geyByZXR1cm4gaXNQcmVzZW50KG5vZGUuc2hhZG93Um9vdCk7IH1cbiAgaXNTaGFkb3dSb290KG5vZGUpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuZ2V0U2hhZG93Um9vdChub2RlKSA9PSBub2RlOyB9XG4gIGltcG9ydEludG9Eb2Mobm9kZSk6IGFueSB7IHJldHVybiB0aGlzLmNsb25lKG5vZGUpOyB9XG4gIGFkb3B0Tm9kZShub2RlKTogYW55IHsgcmV0dXJuIG5vZGU7IH1cbiAgZ2V0SHJlZihlbCk6IHN0cmluZyB7IHJldHVybiBlbC5ocmVmOyB9XG4gIHJlc29sdmVBbmRTZXRIcmVmKGVsLCBiYXNlVXJsOiBzdHJpbmcsIGhyZWY6IHN0cmluZykge1xuICAgIGlmIChocmVmID09IG51bGwpIHtcbiAgICAgIGVsLmhyZWYgPSBiYXNlVXJsO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5ocmVmID0gYmFzZVVybCArICcvLi4vJyArIGhyZWY7XG4gICAgfVxuICB9XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2J1aWxkUnVsZXMocGFyc2VkUnVsZXMsIGNzcz8pIHtcbiAgICB2YXIgcnVsZXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnNlZFJ1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcGFyc2VkUnVsZSA9IHBhcnNlZFJ1bGVzW2ldO1xuICAgICAgdmFyIHJ1bGU6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0gU3RyaW5nTWFwV3JhcHBlci5jcmVhdGUoKTtcbiAgICAgIFN0cmluZ01hcFdyYXBwZXIuc2V0KHJ1bGUsIFwiY3NzVGV4dFwiLCBjc3MpO1xuICAgICAgU3RyaW5nTWFwV3JhcHBlci5zZXQocnVsZSwgXCJzdHlsZVwiLCB7Y29udGVudDogXCJcIiwgY3NzVGV4dDogXCJcIn0pO1xuICAgICAgaWYgKHBhcnNlZFJ1bGUudHlwZSA9PSBcInJ1bGVcIikge1xuICAgICAgICBTdHJpbmdNYXBXcmFwcGVyLnNldChydWxlLCBcInR5cGVcIiwgMSk7XG4gICAgICAgIFN0cmluZ01hcFdyYXBwZXIuc2V0KHJ1bGUsIFwic2VsZWN0b3JUZXh0XCIsIHBhcnNlZFJ1bGUuc2VsZWN0b3JzLmpvaW4oXCIsIFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHN7Mix9L2csIFwiIFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHMqflxccyovZywgXCIgfiBcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxzKlxcK1xccyovZywgXCIgKyBcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxzKj5cXHMqL2csIFwiID4gXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcWyhcXHcrKT0oXFx3KylcXF0vZywgJ1skMT1cIiQyXCJdJykpO1xuICAgICAgICBpZiAoaXNCbGFuayhwYXJzZWRSdWxlLmRlY2xhcmF0aW9ucykpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHBhcnNlZFJ1bGUuZGVjbGFyYXRpb25zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgdmFyIGRlY2xhcmF0aW9uID0gcGFyc2VkUnVsZS5kZWNsYXJhdGlvbnNbal07XG4gICAgICAgICAgU3RyaW5nTWFwV3JhcHBlci5zZXQoU3RyaW5nTWFwV3JhcHBlci5nZXQocnVsZSwgXCJzdHlsZVwiKSwgZGVjbGFyYXRpb24ucHJvcGVydHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVjbGFyYXRpb24udmFsdWUpO1xuICAgICAgICAgIFN0cmluZ01hcFdyYXBwZXIuZ2V0KHJ1bGUsIFwic3R5bGVcIikuY3NzVGV4dCArPVxuICAgICAgICAgICAgICBkZWNsYXJhdGlvbi5wcm9wZXJ0eSArIFwiOiBcIiArIGRlY2xhcmF0aW9uLnZhbHVlICsgXCI7XCI7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocGFyc2VkUnVsZS50eXBlID09IFwibWVkaWFcIikge1xuICAgICAgICBTdHJpbmdNYXBXcmFwcGVyLnNldChydWxlLCBcInR5cGVcIiwgNCk7XG4gICAgICAgIFN0cmluZ01hcFdyYXBwZXIuc2V0KHJ1bGUsIFwibWVkaWFcIiwge21lZGlhVGV4dDogcGFyc2VkUnVsZS5tZWRpYX0pO1xuICAgICAgICBpZiAocGFyc2VkUnVsZS5ydWxlcykge1xuICAgICAgICAgIFN0cmluZ01hcFdyYXBwZXIuc2V0KHJ1bGUsIFwiY3NzUnVsZXNcIiwgdGhpcy5fYnVpbGRSdWxlcyhwYXJzZWRSdWxlLnJ1bGVzKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJ1bGVzLnB1c2gocnVsZSk7XG4gICAgfVxuICAgIHJldHVybiBydWxlcztcbiAgfVxuICBzdXBwb3J0c0RPTUV2ZW50cygpOiBib29sZWFuIHsgcmV0dXJuIGZhbHNlOyB9XG4gIHN1cHBvcnRzTmF0aXZlU2hhZG93RE9NKCk6IGJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cbiAgZ2V0R2xvYmFsRXZlbnRUYXJnZXQodGFyZ2V0OiBzdHJpbmcpOiBhbnkge1xuICAgIGlmICh0YXJnZXQgPT0gXCJ3aW5kb3dcIikge1xuICAgICAgcmV0dXJuICg8YW55PnRoaXMuZGVmYXVsdERvYygpKS5fd2luZG93O1xuICAgIH0gZWxzZSBpZiAodGFyZ2V0ID09IFwiZG9jdW1lbnRcIikge1xuICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdERvYygpO1xuICAgIH0gZWxzZSBpZiAodGFyZ2V0ID09IFwiYm9keVwiKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWZhdWx0RG9jKCkuYm9keTtcbiAgICB9XG4gIH1cbiAgZ2V0QmFzZUhyZWYoKTogc3RyaW5nIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgcmVzZXRCYXNlRWxlbWVudCgpOiB2b2lkIHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0SGlzdG9yeSgpOiBIaXN0b3J5IHsgdGhyb3cgJ25vdCBpbXBsZW1lbnRlZCc7IH1cbiAgZ2V0TG9jYXRpb24oKTogTG9jYXRpb24geyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxuICBnZXRVc2VyQWdlbnQoKTogc3RyaW5nIHsgcmV0dXJuIFwiRmFrZSB1c2VyIGFnZW50XCI7IH1cbiAgZ2V0RGF0YShlbCwgbmFtZTogc3RyaW5nKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKGVsLCAnZGF0YS0nICsgbmFtZSk7IH1cbiAgZ2V0Q29tcHV0ZWRTdHlsZShlbCk6IGFueSB7IHRocm93ICdub3QgaW1wbGVtZW50ZWQnOyB9XG4gIHNldERhdGEoZWwsIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgeyB0aGlzLnNldEF0dHJpYnV0ZShlbCwgJ2RhdGEtJyArIG5hbWUsIHZhbHVlKTsgfVxuICAvLyBUT0RPKHRib3NjaCk6IG1vdmUgdGhpcyBpbnRvIGEgc2VwYXJhdGUgZW52aXJvbm1lbnQgY2xhc3Mgb25jZSB3ZSBoYXZlIGl0XG4gIHNldEdsb2JhbFZhcihwYXRoOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHsgc2V0VmFsdWVPblBhdGgoZ2xvYmFsLCBwYXRoLCB2YWx1ZSk7IH1cbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNhbGxiYWNrKTogbnVtYmVyIHsgcmV0dXJuIHNldFRpbWVvdXQoY2FsbGJhY2ssIDApOyB9XG4gIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGlkOiBudW1iZXIpIHsgY2xlYXJUaW1lb3V0KGlkKTsgfVxuICBwZXJmb3JtYW5jZU5vdygpOiBudW1iZXIgeyByZXR1cm4gRGF0ZVdyYXBwZXIudG9NaWxsaXMoRGF0ZVdyYXBwZXIubm93KCkpOyB9XG4gIGdldEFuaW1hdGlvblByZWZpeCgpOiBzdHJpbmcgeyByZXR1cm4gJyc7IH1cbiAgZ2V0VHJhbnNpdGlvbkVuZCgpOiBzdHJpbmcgeyByZXR1cm4gJ3RyYW5zaXRpb25lbmQnOyB9XG4gIHN1cHBvcnRzQW5pbWF0aW9uKCk6IGJvb2xlYW4geyByZXR1cm4gdHJ1ZTsgfVxuXG4gIHJlcGxhY2VDaGlsZChlbCwgbmV3Tm9kZSwgb2xkTm9kZSkgeyB0aHJvdyBuZXcgRXJyb3IoJ25vdCBpbXBsZW1lbnRlZCcpOyB9XG4gIHBhcnNlKHRlbXBsYXRlSHRtbDogc3RyaW5nKSB7IHRocm93IG5ldyBFcnJvcignbm90IGltcGxlbWVudGVkJyk7IH1cbiAgaW52b2tlKGVsOiBFbGVtZW50LCBtZXRob2ROYW1lOiBzdHJpbmcsIGFyZ3M6IGFueVtdKTogYW55IHsgdGhyb3cgbmV3IEVycm9yKCdub3QgaW1wbGVtZW50ZWQnKTsgfVxuICBnZXRFdmVudEtleShldmVudCk6IHN0cmluZyB7IHRocm93IG5ldyBFcnJvcignbm90IGltcGxlbWVudGVkJyk7IH1cbn1cblxuLy8gVE9ETzogYnVpbGQgYSBwcm9wZXIgbGlzdCwgdGhpcyBvbmUgaXMgYWxsIHRoZSBrZXlzIG9mIGEgSFRNTElucHV0RWxlbWVudFxudmFyIF9IVE1MRWxlbWVudFByb3BlcnR5TGlzdCA9IFtcbiAgXCJ3ZWJraXRFbnRyaWVzXCIsXG4gIFwiaW5jcmVtZW50YWxcIixcbiAgXCJ3ZWJraXRkaXJlY3RvcnlcIixcbiAgXCJzZWxlY3Rpb25EaXJlY3Rpb25cIixcbiAgXCJzZWxlY3Rpb25FbmRcIixcbiAgXCJzZWxlY3Rpb25TdGFydFwiLFxuICBcImxhYmVsc1wiLFxuICBcInZhbGlkYXRpb25NZXNzYWdlXCIsXG4gIFwidmFsaWRpdHlcIixcbiAgXCJ3aWxsVmFsaWRhdGVcIixcbiAgXCJ3aWR0aFwiLFxuICBcInZhbHVlQXNOdW1iZXJcIixcbiAgXCJ2YWx1ZUFzRGF0ZVwiLFxuICBcInZhbHVlXCIsXG4gIFwidXNlTWFwXCIsXG4gIFwiZGVmYXVsdFZhbHVlXCIsXG4gIFwidHlwZVwiLFxuICBcInN0ZXBcIixcbiAgXCJzcmNcIixcbiAgXCJzaXplXCIsXG4gIFwicmVxdWlyZWRcIixcbiAgXCJyZWFkT25seVwiLFxuICBcInBsYWNlaG9sZGVyXCIsXG4gIFwicGF0dGVyblwiLFxuICBcIm5hbWVcIixcbiAgXCJtdWx0aXBsZVwiLFxuICBcIm1pblwiLFxuICBcIm1pbkxlbmd0aFwiLFxuICBcIm1heExlbmd0aFwiLFxuICBcIm1heFwiLFxuICBcImxpc3RcIixcbiAgXCJpbmRldGVybWluYXRlXCIsXG4gIFwiaGVpZ2h0XCIsXG4gIFwiZm9ybVRhcmdldFwiLFxuICBcImZvcm1Ob1ZhbGlkYXRlXCIsXG4gIFwiZm9ybU1ldGhvZFwiLFxuICBcImZvcm1FbmN0eXBlXCIsXG4gIFwiZm9ybUFjdGlvblwiLFxuICBcImZpbGVzXCIsXG4gIFwiZm9ybVwiLFxuICBcImRpc2FibGVkXCIsXG4gIFwiZGlyTmFtZVwiLFxuICBcImNoZWNrZWRcIixcbiAgXCJkZWZhdWx0Q2hlY2tlZFwiLFxuICBcImF1dG9mb2N1c1wiLFxuICBcImF1dG9jb21wbGV0ZVwiLFxuICBcImFsdFwiLFxuICBcImFsaWduXCIsXG4gIFwiYWNjZXB0XCIsXG4gIFwib25hdXRvY29tcGxldGVlcnJvclwiLFxuICBcIm9uYXV0b2NvbXBsZXRlXCIsXG4gIFwib253YWl0aW5nXCIsXG4gIFwib252b2x1bWVjaGFuZ2VcIixcbiAgXCJvbnRvZ2dsZVwiLFxuICBcIm9udGltZXVwZGF0ZVwiLFxuICBcIm9uc3VzcGVuZFwiLFxuICBcIm9uc3VibWl0XCIsXG4gIFwib25zdGFsbGVkXCIsXG4gIFwib25zaG93XCIsXG4gIFwib25zZWxlY3RcIixcbiAgXCJvbnNlZWtpbmdcIixcbiAgXCJvbnNlZWtlZFwiLFxuICBcIm9uc2Nyb2xsXCIsXG4gIFwib25yZXNpemVcIixcbiAgXCJvbnJlc2V0XCIsXG4gIFwib25yYXRlY2hhbmdlXCIsXG4gIFwib25wcm9ncmVzc1wiLFxuICBcIm9ucGxheWluZ1wiLFxuICBcIm9ucGxheVwiLFxuICBcIm9ucGF1c2VcIixcbiAgXCJvbm1vdXNld2hlZWxcIixcbiAgXCJvbm1vdXNldXBcIixcbiAgXCJvbm1vdXNlb3ZlclwiLFxuICBcIm9ubW91c2VvdXRcIixcbiAgXCJvbm1vdXNlbW92ZVwiLFxuICBcIm9ubW91c2VsZWF2ZVwiLFxuICBcIm9ubW91c2VlbnRlclwiLFxuICBcIm9ubW91c2Vkb3duXCIsXG4gIFwib25sb2Fkc3RhcnRcIixcbiAgXCJvbmxvYWRlZG1ldGFkYXRhXCIsXG4gIFwib25sb2FkZWRkYXRhXCIsXG4gIFwib25sb2FkXCIsXG4gIFwib25rZXl1cFwiLFxuICBcIm9ua2V5cHJlc3NcIixcbiAgXCJvbmtleWRvd25cIixcbiAgXCJvbmludmFsaWRcIixcbiAgXCJvbmlucHV0XCIsXG4gIFwib25mb2N1c1wiLFxuICBcIm9uZXJyb3JcIixcbiAgXCJvbmVuZGVkXCIsXG4gIFwib25lbXB0aWVkXCIsXG4gIFwib25kdXJhdGlvbmNoYW5nZVwiLFxuICBcIm9uZHJvcFwiLFxuICBcIm9uZHJhZ3N0YXJ0XCIsXG4gIFwib25kcmFnb3ZlclwiLFxuICBcIm9uZHJhZ2xlYXZlXCIsXG4gIFwib25kcmFnZW50ZXJcIixcbiAgXCJvbmRyYWdlbmRcIixcbiAgXCJvbmRyYWdcIixcbiAgXCJvbmRibGNsaWNrXCIsXG4gIFwib25jdWVjaGFuZ2VcIixcbiAgXCJvbmNvbnRleHRtZW51XCIsXG4gIFwib25jbG9zZVwiLFxuICBcIm9uY2xpY2tcIixcbiAgXCJvbmNoYW5nZVwiLFxuICBcIm9uY2FucGxheXRocm91Z2hcIixcbiAgXCJvbmNhbnBsYXlcIixcbiAgXCJvbmNhbmNlbFwiLFxuICBcIm9uYmx1clwiLFxuICBcIm9uYWJvcnRcIixcbiAgXCJzcGVsbGNoZWNrXCIsXG4gIFwiaXNDb250ZW50RWRpdGFibGVcIixcbiAgXCJjb250ZW50RWRpdGFibGVcIixcbiAgXCJvdXRlclRleHRcIixcbiAgXCJpbm5lclRleHRcIixcbiAgXCJhY2Nlc3NLZXlcIixcbiAgXCJoaWRkZW5cIixcbiAgXCJ3ZWJraXRkcm9wem9uZVwiLFxuICBcImRyYWdnYWJsZVwiLFxuICBcInRhYkluZGV4XCIsXG4gIFwiZGlyXCIsXG4gIFwidHJhbnNsYXRlXCIsXG4gIFwibGFuZ1wiLFxuICBcInRpdGxlXCIsXG4gIFwiY2hpbGRFbGVtZW50Q291bnRcIixcbiAgXCJsYXN0RWxlbWVudENoaWxkXCIsXG4gIFwiZmlyc3RFbGVtZW50Q2hpbGRcIixcbiAgXCJjaGlsZHJlblwiLFxuICBcIm9ud2Via2l0ZnVsbHNjcmVlbmVycm9yXCIsXG4gIFwib253ZWJraXRmdWxsc2NyZWVuY2hhbmdlXCIsXG4gIFwibmV4dEVsZW1lbnRTaWJsaW5nXCIsXG4gIFwicHJldmlvdXNFbGVtZW50U2libGluZ1wiLFxuICBcIm9ud2hlZWxcIixcbiAgXCJvbnNlbGVjdHN0YXJ0XCIsXG4gIFwib25zZWFyY2hcIixcbiAgXCJvbnBhc3RlXCIsXG4gIFwib25jdXRcIixcbiAgXCJvbmNvcHlcIixcbiAgXCJvbmJlZm9yZXBhc3RlXCIsXG4gIFwib25iZWZvcmVjdXRcIixcbiAgXCJvbmJlZm9yZWNvcHlcIixcbiAgXCJzaGFkb3dSb290XCIsXG4gIFwiZGF0YXNldFwiLFxuICBcImNsYXNzTGlzdFwiLFxuICBcImNsYXNzTmFtZVwiLFxuICBcIm91dGVySFRNTFwiLFxuICBcImlubmVySFRNTFwiLFxuICBcInNjcm9sbEhlaWdodFwiLFxuICBcInNjcm9sbFdpZHRoXCIsXG4gIFwic2Nyb2xsVG9wXCIsXG4gIFwic2Nyb2xsTGVmdFwiLFxuICBcImNsaWVudEhlaWdodFwiLFxuICBcImNsaWVudFdpZHRoXCIsXG4gIFwiY2xpZW50VG9wXCIsXG4gIFwiY2xpZW50TGVmdFwiLFxuICBcIm9mZnNldFBhcmVudFwiLFxuICBcIm9mZnNldEhlaWdodFwiLFxuICBcIm9mZnNldFdpZHRoXCIsXG4gIFwib2Zmc2V0VG9wXCIsXG4gIFwib2Zmc2V0TGVmdFwiLFxuICBcImxvY2FsTmFtZVwiLFxuICBcInByZWZpeFwiLFxuICBcIm5hbWVzcGFjZVVSSVwiLFxuICBcImlkXCIsXG4gIFwic3R5bGVcIixcbiAgXCJhdHRyaWJ1dGVzXCIsXG4gIFwidGFnTmFtZVwiLFxuICBcInBhcmVudEVsZW1lbnRcIixcbiAgXCJ0ZXh0Q29udGVudFwiLFxuICBcImJhc2VVUklcIixcbiAgXCJvd25lckRvY3VtZW50XCIsXG4gIFwibmV4dFNpYmxpbmdcIixcbiAgXCJwcmV2aW91c1NpYmxpbmdcIixcbiAgXCJsYXN0Q2hpbGRcIixcbiAgXCJmaXJzdENoaWxkXCIsXG4gIFwiY2hpbGROb2Rlc1wiLFxuICBcInBhcmVudE5vZGVcIixcbiAgXCJub2RlVHlwZVwiLFxuICBcIm5vZGVWYWx1ZVwiLFxuICBcIm5vZGVOYW1lXCIsXG4gIFwiY2xvc3VyZV9sbV83MTQ2MTdcIixcbiAgXCJfX2pzYWN0aW9uXCJcbl07XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
