System.register(['angular2/src/facade/collection', 'angular2/src/facade/lang', 'angular2/src/platform/dom/dom_adapter', './generic_browser_adapter'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var collection_1, lang_1, dom_adapter_1, generic_browser_adapter_1;
    var _attrToPropMap, DOM_KEY_LOCATION_NUMPAD, _keyMap, _chromeNumKeyPadMap, BrowserDomAdapter, baseElement, urlParsingNode;
    function getBaseElementHref() {
        if (lang_1.isBlank(baseElement)) {
            baseElement = document.querySelector('base');
            if (lang_1.isBlank(baseElement)) {
                return null;
            }
        }
        return baseElement.getAttribute('href');
    }
    function relativePath(url) {
        if (lang_1.isBlank(urlParsingNode)) {
            urlParsingNode = document.createElement("a");
        }
        urlParsingNode.setAttribute('href', url);
        return (urlParsingNode.pathname.charAt(0) === '/') ? urlParsingNode.pathname :
            '/' + urlParsingNode.pathname;
    }
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            },
            function (generic_browser_adapter_1_1) {
                generic_browser_adapter_1 = generic_browser_adapter_1_1;
            }],
        execute: function() {
            _attrToPropMap = {
                'class': 'className',
                'innerHtml': 'innerHTML',
                'readonly': 'readOnly',
                'tabindex': 'tabIndex'
            };
            DOM_KEY_LOCATION_NUMPAD = 3;
            // Map to convert some key or keyIdentifier values to what will be returned by getEventKey
            _keyMap = {
                // The following values are here for cross-browser compatibility and to match the W3C standard
                // cf http://www.w3.org/TR/DOM-Level-3-Events-key/
                '\b': 'Backspace',
                '\t': 'Tab',
                '\x7F': 'Delete',
                '\x1B': 'Escape',
                'Del': 'Delete',
                'Esc': 'Escape',
                'Left': 'ArrowLeft',
                'Right': 'ArrowRight',
                'Up': 'ArrowUp',
                'Down': 'ArrowDown',
                'Menu': 'ContextMenu',
                'Scroll': 'ScrollLock',
                'Win': 'OS'
            };
            // There is a bug in Chrome for numeric keypad keys:
            // https://code.google.com/p/chromium/issues/detail?id=155654
            // 1, 2, 3 ... are reported as A, B, C ...
            _chromeNumKeyPadMap = {
                'A': '1',
                'B': '2',
                'C': '3',
                'D': '4',
                'E': '5',
                'F': '6',
                'G': '7',
                'H': '8',
                'I': '9',
                'J': '*',
                'K': '+',
                'M': '-',
                'N': '.',
                'O': '/',
                '\x60': '0',
                '\x90': 'NumLock'
            };
            /**
             * A `DomAdapter` powered by full browser DOM APIs.
             */
            /* tslint:disable:requireParameterType */
            BrowserDomAdapter = (function (_super) {
                __extends(BrowserDomAdapter, _super);
                function BrowserDomAdapter() {
                    _super.apply(this, arguments);
                }
                BrowserDomAdapter.prototype.parse = function (templateHtml) { throw new Error("parse not implemented"); };
                BrowserDomAdapter.makeCurrent = function () { dom_adapter_1.setRootDomAdapter(new BrowserDomAdapter()); };
                BrowserDomAdapter.prototype.hasProperty = function (element, name) { return name in element; };
                BrowserDomAdapter.prototype.setProperty = function (el, name, value) { el[name] = value; };
                BrowserDomAdapter.prototype.getProperty = function (el, name) { return el[name]; };
                BrowserDomAdapter.prototype.invoke = function (el, methodName, args) {
                    el[methodName].apply(el, args);
                };
                // TODO(tbosch): move this into a separate environment class once we have it
                BrowserDomAdapter.prototype.logError = function (error) {
                    if (window.console.error) {
                        window.console.error(error);
                    }
                    else {
                        window.console.log(error);
                    }
                };
                BrowserDomAdapter.prototype.log = function (error) { window.console.log(error); };
                BrowserDomAdapter.prototype.logGroup = function (error) {
                    if (window.console.group) {
                        window.console.group(error);
                        this.logError(error);
                    }
                    else {
                        window.console.log(error);
                    }
                };
                BrowserDomAdapter.prototype.logGroupEnd = function () {
                    if (window.console.groupEnd) {
                        window.console.groupEnd();
                    }
                };
                Object.defineProperty(BrowserDomAdapter.prototype, "attrToPropMap", {
                    get: function () { return _attrToPropMap; },
                    enumerable: true,
                    configurable: true
                });
                BrowserDomAdapter.prototype.query = function (selector) { return document.querySelector(selector); };
                BrowserDomAdapter.prototype.querySelector = function (el, selector) { return el.querySelector(selector); };
                BrowserDomAdapter.prototype.querySelectorAll = function (el, selector) { return el.querySelectorAll(selector); };
                BrowserDomAdapter.prototype.on = function (el, evt, listener) { el.addEventListener(evt, listener, false); };
                BrowserDomAdapter.prototype.onAndCancel = function (el, evt, listener) {
                    el.addEventListener(evt, listener, false);
                    // Needed to follow Dart's subscription semantic, until fix of
                    // https://code.google.com/p/dart/issues/detail?id=17406
                    return function () { el.removeEventListener(evt, listener, false); };
                };
                BrowserDomAdapter.prototype.dispatchEvent = function (el, evt) { el.dispatchEvent(evt); };
                BrowserDomAdapter.prototype.createMouseEvent = function (eventType) {
                    var evt = document.createEvent('MouseEvent');
                    evt.initEvent(eventType, true, true);
                    return evt;
                };
                BrowserDomAdapter.prototype.createEvent = function (eventType) {
                    var evt = document.createEvent('Event');
                    evt.initEvent(eventType, true, true);
                    return evt;
                };
                BrowserDomAdapter.prototype.preventDefault = function (evt) {
                    evt.preventDefault();
                    evt.returnValue = false;
                };
                BrowserDomAdapter.prototype.isPrevented = function (evt) {
                    return evt.defaultPrevented || lang_1.isPresent(evt.returnValue) && !evt.returnValue;
                };
                BrowserDomAdapter.prototype.getInnerHTML = function (el) { return el.innerHTML; };
                BrowserDomAdapter.prototype.getOuterHTML = function (el) { return el.outerHTML; };
                BrowserDomAdapter.prototype.nodeName = function (node) { return node.nodeName; };
                BrowserDomAdapter.prototype.nodeValue = function (node) { return node.nodeValue; };
                BrowserDomAdapter.prototype.type = function (node) { return node.type; };
                BrowserDomAdapter.prototype.content = function (node) {
                    if (this.hasProperty(node, "content")) {
                        return node.content;
                    }
                    else {
                        return node;
                    }
                };
                BrowserDomAdapter.prototype.firstChild = function (el) { return el.firstChild; };
                BrowserDomAdapter.prototype.nextSibling = function (el) { return el.nextSibling; };
                BrowserDomAdapter.prototype.parentElement = function (el) { return el.parentNode; };
                BrowserDomAdapter.prototype.childNodes = function (el) { return el.childNodes; };
                BrowserDomAdapter.prototype.childNodesAsList = function (el) {
                    var childNodes = el.childNodes;
                    var res = collection_1.ListWrapper.createFixedSize(childNodes.length);
                    for (var i = 0; i < childNodes.length; i++) {
                        res[i] = childNodes[i];
                    }
                    return res;
                };
                BrowserDomAdapter.prototype.clearNodes = function (el) {
                    while (el.firstChild) {
                        el.removeChild(el.firstChild);
                    }
                };
                BrowserDomAdapter.prototype.appendChild = function (el, node) { el.appendChild(node); };
                BrowserDomAdapter.prototype.removeChild = function (el, node) { el.removeChild(node); };
                BrowserDomAdapter.prototype.replaceChild = function (el, newChild, oldChild) { el.replaceChild(newChild, oldChild); };
                BrowserDomAdapter.prototype.remove = function (node) {
                    if (node.parentNode) {
                        node.parentNode.removeChild(node);
                    }
                    return node;
                };
                BrowserDomAdapter.prototype.insertBefore = function (el, node) { el.parentNode.insertBefore(node, el); };
                BrowserDomAdapter.prototype.insertAllBefore = function (el, nodes) { nodes.forEach(function (n) { return el.parentNode.insertBefore(n, el); }); };
                BrowserDomAdapter.prototype.insertAfter = function (el, node) { el.parentNode.insertBefore(node, el.nextSibling); };
                BrowserDomAdapter.prototype.setInnerHTML = function (el, value) { el.innerHTML = value; };
                BrowserDomAdapter.prototype.getText = function (el) { return el.textContent; };
                // TODO(vicb): removed Element type because it does not support StyleElement
                BrowserDomAdapter.prototype.setText = function (el, value) { el.textContent = value; };
                BrowserDomAdapter.prototype.getValue = function (el) { return el.value; };
                BrowserDomAdapter.prototype.setValue = function (el, value) { el.value = value; };
                BrowserDomAdapter.prototype.getChecked = function (el) { return el.checked; };
                BrowserDomAdapter.prototype.setChecked = function (el, value) { el.checked = value; };
                BrowserDomAdapter.prototype.createComment = function (text) { return document.createComment(text); };
                BrowserDomAdapter.prototype.createTemplate = function (html) {
                    var t = document.createElement('template');
                    t.innerHTML = html;
                    return t;
                };
                BrowserDomAdapter.prototype.createElement = function (tagName, doc) {
                    if (doc === void 0) { doc = document; }
                    return doc.createElement(tagName);
                };
                BrowserDomAdapter.prototype.createElementNS = function (ns, tagName, doc) {
                    if (doc === void 0) { doc = document; }
                    return doc.createElementNS(ns, tagName);
                };
                BrowserDomAdapter.prototype.createTextNode = function (text, doc) {
                    if (doc === void 0) { doc = document; }
                    return doc.createTextNode(text);
                };
                BrowserDomAdapter.prototype.createScriptTag = function (attrName, attrValue, doc) {
                    if (doc === void 0) { doc = document; }
                    var el = doc.createElement('SCRIPT');
                    el.setAttribute(attrName, attrValue);
                    return el;
                };
                BrowserDomAdapter.prototype.createStyleElement = function (css, doc) {
                    if (doc === void 0) { doc = document; }
                    var style = doc.createElement('style');
                    this.appendChild(style, this.createTextNode(css));
                    return style;
                };
                BrowserDomAdapter.prototype.createShadowRoot = function (el) { return el.createShadowRoot(); };
                BrowserDomAdapter.prototype.getShadowRoot = function (el) { return el.shadowRoot; };
                BrowserDomAdapter.prototype.getHost = function (el) { return el.host; };
                BrowserDomAdapter.prototype.clone = function (node) { return node.cloneNode(true); };
                BrowserDomAdapter.prototype.getElementsByClassName = function (element, name) {
                    return element.getElementsByClassName(name);
                };
                BrowserDomAdapter.prototype.getElementsByTagName = function (element, name) {
                    return element.getElementsByTagName(name);
                };
                BrowserDomAdapter.prototype.classList = function (element) { return Array.prototype.slice.call(element.classList, 0); };
                BrowserDomAdapter.prototype.addClass = function (element, className) { element.classList.add(className); };
                BrowserDomAdapter.prototype.removeClass = function (element, className) { element.classList.remove(className); };
                BrowserDomAdapter.prototype.hasClass = function (element, className) { return element.classList.contains(className); };
                BrowserDomAdapter.prototype.setStyle = function (element, styleName, styleValue) {
                    element.style[styleName] = styleValue;
                };
                BrowserDomAdapter.prototype.removeStyle = function (element, stylename) { element.style[stylename] = null; };
                BrowserDomAdapter.prototype.getStyle = function (element, stylename) { return element.style[stylename]; };
                BrowserDomAdapter.prototype.hasStyle = function (element, styleName, styleValue) {
                    if (styleValue === void 0) { styleValue = null; }
                    var value = this.getStyle(element, styleName) || '';
                    return styleValue ? value == styleValue : value.length > 0;
                };
                BrowserDomAdapter.prototype.tagName = function (element) { return element.tagName; };
                BrowserDomAdapter.prototype.attributeMap = function (element) {
                    var res = new Map();
                    var elAttrs = element.attributes;
                    for (var i = 0; i < elAttrs.length; i++) {
                        var attrib = elAttrs[i];
                        res.set(attrib.name, attrib.value);
                    }
                    return res;
                };
                BrowserDomAdapter.prototype.hasAttribute = function (element, attribute) { return element.hasAttribute(attribute); };
                BrowserDomAdapter.prototype.hasAttributeNS = function (element, ns, attribute) {
                    return element.hasAttributeNS(ns, attribute);
                };
                BrowserDomAdapter.prototype.getAttribute = function (element, attribute) { return element.getAttribute(attribute); };
                BrowserDomAdapter.prototype.getAttributeNS = function (element, ns, name) {
                    return element.getAttributeNS(ns, name);
                };
                BrowserDomAdapter.prototype.setAttribute = function (element, name, value) { element.setAttribute(name, value); };
                BrowserDomAdapter.prototype.setAttributeNS = function (element, ns, name, value) {
                    element.setAttributeNS(ns, name, value);
                };
                BrowserDomAdapter.prototype.removeAttribute = function (element, attribute) { element.removeAttribute(attribute); };
                BrowserDomAdapter.prototype.removeAttributeNS = function (element, ns, name) { element.removeAttributeNS(ns, name); };
                BrowserDomAdapter.prototype.templateAwareRoot = function (el) { return this.isTemplateElement(el) ? this.content(el) : el; };
                BrowserDomAdapter.prototype.createHtmlDocument = function () {
                    return document.implementation.createHTMLDocument('fakeTitle');
                };
                BrowserDomAdapter.prototype.defaultDoc = function () { return document; };
                BrowserDomAdapter.prototype.getBoundingClientRect = function (el) {
                    try {
                        return el.getBoundingClientRect();
                    }
                    catch (e) {
                        return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
                    }
                };
                BrowserDomAdapter.prototype.getTitle = function () { return document.title; };
                BrowserDomAdapter.prototype.setTitle = function (newTitle) { document.title = newTitle || ''; };
                BrowserDomAdapter.prototype.elementMatches = function (n, selector) {
                    var matches = false;
                    if (n instanceof HTMLElement) {
                        if (n.matches) {
                            matches = n.matches(selector);
                        }
                        else if (n.msMatchesSelector) {
                            matches = n.msMatchesSelector(selector);
                        }
                        else if (n.webkitMatchesSelector) {
                            matches = n.webkitMatchesSelector(selector);
                        }
                    }
                    return matches;
                };
                BrowserDomAdapter.prototype.isTemplateElement = function (el) {
                    return el instanceof HTMLElement && el.nodeName == "TEMPLATE";
                };
                BrowserDomAdapter.prototype.isTextNode = function (node) { return node.nodeType === Node.TEXT_NODE; };
                BrowserDomAdapter.prototype.isCommentNode = function (node) { return node.nodeType === Node.COMMENT_NODE; };
                BrowserDomAdapter.prototype.isElementNode = function (node) { return node.nodeType === Node.ELEMENT_NODE; };
                BrowserDomAdapter.prototype.hasShadowRoot = function (node) { return node instanceof HTMLElement && lang_1.isPresent(node.shadowRoot); };
                BrowserDomAdapter.prototype.isShadowRoot = function (node) { return node instanceof DocumentFragment; };
                BrowserDomAdapter.prototype.importIntoDoc = function (node) {
                    var toImport = node;
                    if (this.isTemplateElement(node)) {
                        toImport = this.content(node);
                    }
                    return document.importNode(toImport, true);
                };
                BrowserDomAdapter.prototype.adoptNode = function (node) { return document.adoptNode(node); };
                BrowserDomAdapter.prototype.getHref = function (el) { return el.href; };
                BrowserDomAdapter.prototype.getEventKey = function (event) {
                    var key = event.key;
                    if (lang_1.isBlank(key)) {
                        key = event.keyIdentifier;
                        // keyIdentifier is defined in the old draft of DOM Level 3 Events implemented by Chrome and
                        // Safari
                        // cf
                        // http://www.w3.org/TR/2007/WD-DOM-Level-3-Events-20071221/events.html#Events-KeyboardEvents-Interfaces
                        if (lang_1.isBlank(key)) {
                            return 'Unidentified';
                        }
                        if (key.startsWith('U+')) {
                            key = String.fromCharCode(parseInt(key.substring(2), 16));
                            if (event.location === DOM_KEY_LOCATION_NUMPAD && _chromeNumKeyPadMap.hasOwnProperty(key)) {
                                // There is a bug in Chrome for numeric keypad keys:
                                // https://code.google.com/p/chromium/issues/detail?id=155654
                                // 1, 2, 3 ... are reported as A, B, C ...
                                key = _chromeNumKeyPadMap[key];
                            }
                        }
                    }
                    if (_keyMap.hasOwnProperty(key)) {
                        key = _keyMap[key];
                    }
                    return key;
                };
                BrowserDomAdapter.prototype.getGlobalEventTarget = function (target) {
                    if (target == "window") {
                        return window;
                    }
                    else if (target == "document") {
                        return document;
                    }
                    else if (target == "body") {
                        return document.body;
                    }
                };
                BrowserDomAdapter.prototype.getHistory = function () { return window.history; };
                BrowserDomAdapter.prototype.getLocation = function () { return window.location; };
                BrowserDomAdapter.prototype.getBaseHref = function () {
                    var href = getBaseElementHref();
                    if (lang_1.isBlank(href)) {
                        return null;
                    }
                    return relativePath(href);
                };
                BrowserDomAdapter.prototype.resetBaseElement = function () { baseElement = null; };
                BrowserDomAdapter.prototype.getUserAgent = function () { return window.navigator.userAgent; };
                BrowserDomAdapter.prototype.setData = function (element, name, value) {
                    this.setAttribute(element, 'data-' + name, value);
                };
                BrowserDomAdapter.prototype.getData = function (element, name) { return this.getAttribute(element, 'data-' + name); };
                BrowserDomAdapter.prototype.getComputedStyle = function (element) { return getComputedStyle(element); };
                // TODO(tbosch): move this into a separate environment class once we have it
                BrowserDomAdapter.prototype.setGlobalVar = function (path, value) { lang_1.setValueOnPath(lang_1.global, path, value); };
                BrowserDomAdapter.prototype.requestAnimationFrame = function (callback) { return window.requestAnimationFrame(callback); };
                BrowserDomAdapter.prototype.cancelAnimationFrame = function (id) { window.cancelAnimationFrame(id); };
                BrowserDomAdapter.prototype.performanceNow = function () {
                    // performance.now() is not available in all browsers, see
                    // http://caniuse.com/#search=performance.now
                    if (lang_1.isPresent(window.performance) && lang_1.isPresent(window.performance.now)) {
                        return window.performance.now();
                    }
                    else {
                        return lang_1.DateWrapper.toMillis(lang_1.DateWrapper.now());
                    }
                };
                return BrowserDomAdapter;
            }(generic_browser_adapter_1.GenericBrowserDomAdapter));
            exports_1("BrowserDomAdapter", BrowserDomAdapter);
            baseElement = null;
            // based on urlUtils.js in AngularJS 1
            urlParsingNode = null;
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9icm93c2VyL2Jyb3dzZXJfYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7UUFLSSxjQUFjLEVBT1osdUJBQXVCLEVBR3pCLE9BQU8sRUFxQlAsbUJBQW1CLHFCQTJUbkIsV0FBVyxFQVlYLGNBQWM7SUFYbEI7UUFDRSxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdDLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZCxDQUFDO1FBQ0gsQ0FBQztRQUNELE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFJRCxzQkFBc0IsR0FBRztRQUN2QixFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFDRCxjQUFjLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN6QyxNQUFNLENBQUMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxjQUFjLENBQUMsUUFBUTtZQUN2QixHQUFHLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQztJQUNyRixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O1lBOVdHLGNBQWMsR0FBRztnQkFDbkIsT0FBTyxFQUFFLFdBQVc7Z0JBQ3BCLFdBQVcsRUFBRSxXQUFXO2dCQUN4QixVQUFVLEVBQUUsVUFBVTtnQkFD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U0EsQUFpU0MsQ0FqU3NDLGtEQUF3QixHQWlTOUQ7WUFqU0QsaURBaVNDLENBQUE7WUFHRyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBV3ZCLHNDQUFzQztZQUNsQyxjQUFjLEdBQUcsSUFBSSxDQUFDIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9icm93c2VyL2Jyb3dzZXJfYWRhcHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TWFwV3JhcHBlciwgTGlzdFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge2lzQmxhbmssIGlzUHJlc2VudCwgZ2xvYmFsLCBzZXRWYWx1ZU9uUGF0aCwgRGF0ZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge3NldFJvb3REb21BZGFwdGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9hZGFwdGVyJztcbmltcG9ydCB7R2VuZXJpY0Jyb3dzZXJEb21BZGFwdGVyfSBmcm9tICcuL2dlbmVyaWNfYnJvd3Nlcl9hZGFwdGVyJztcblxudmFyIF9hdHRyVG9Qcm9wTWFwID0ge1xuICAnY2xhc3MnOiAnY2xhc3NOYW1lJyxcbiAgJ2lubmVySHRtbCc6ICdpbm5lckhUTUwnLFxuICAncmVhZG9ubHknOiAncmVhZE9ubHknLFxuICAndGFiaW5kZXgnOiAndGFiSW5kZXgnXG59O1xuXG5jb25zdCBET01fS0VZX0xPQ0FUSU9OX05VTVBBRCA9IDM7XG5cbi8vIE1hcCB0byBjb252ZXJ0IHNvbWUga2V5IG9yIGtleUlkZW50aWZpZXIgdmFsdWVzIHRvIHdoYXQgd2lsbCBiZSByZXR1cm5lZCBieSBnZXRFdmVudEtleVxudmFyIF9rZXlNYXAgPSB7XG4gIC8vIFRoZSBmb2xsb3dpbmcgdmFsdWVzIGFyZSBoZXJlIGZvciBjcm9zcy1icm93c2VyIGNvbXBhdGliaWxpdHkgYW5kIHRvIG1hdGNoIHRoZSBXM0Mgc3RhbmRhcmRcbiAgLy8gY2YgaHR0cDovL3d3dy53My5vcmcvVFIvRE9NLUxldmVsLTMtRXZlbnRzLWtleS9cbiAgJ1xcYic6ICdCYWNrc3BhY2UnLFxuICAnXFx0JzogJ1RhYicsXG4gICdcXHg3Ric6ICdEZWxldGUnLFxuICAnXFx4MUInOiAnRXNjYXBlJyxcbiAgJ0RlbCc6ICdEZWxldGUnLFxuICAnRXNjJzogJ0VzY2FwZScsXG4gICdMZWZ0JzogJ0Fycm93TGVmdCcsXG4gICdSaWdodCc6ICdBcnJvd1JpZ2h0JyxcbiAgJ1VwJzogJ0Fycm93VXAnLFxuICAnRG93bic6ICdBcnJvd0Rvd24nLFxuICAnTWVudSc6ICdDb250ZXh0TWVudScsXG4gICdTY3JvbGwnOiAnU2Nyb2xsTG9jaycsXG4gICdXaW4nOiAnT1MnXG59O1xuXG4vLyBUaGVyZSBpcyBhIGJ1ZyBpbiBDaHJvbWUgZm9yIG51bWVyaWMga2V5cGFkIGtleXM6XG4vLyBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MTU1NjU0XG4vLyAxLCAyLCAzIC4uLiBhcmUgcmVwb3J0ZWQgYXMgQSwgQiwgQyAuLi5cbnZhciBfY2hyb21lTnVtS2V5UGFkTWFwID0ge1xuICAnQSc6ICcxJyxcbiAgJ0InOiAnMicsXG4gICdDJzogJzMnLFxuICAnRCc6ICc0JyxcbiAgJ0UnOiAnNScsXG4gICdGJzogJzYnLFxuICAnRyc6ICc3JyxcbiAgJ0gnOiAnOCcsXG4gICdJJzogJzknLFxuICAnSic6ICcqJyxcbiAgJ0snOiAnKycsXG4gICdNJzogJy0nLFxuICAnTic6ICcuJyxcbiAgJ08nOiAnLycsXG4gICdcXHg2MCc6ICcwJyxcbiAgJ1xceDkwJzogJ051bUxvY2snXG59O1xuXG4vKipcbiAqIEEgYERvbUFkYXB0ZXJgIHBvd2VyZWQgYnkgZnVsbCBicm93c2VyIERPTSBBUElzLlxuICovXG4vKiB0c2xpbnQ6ZGlzYWJsZTpyZXF1aXJlUGFyYW1ldGVyVHlwZSAqL1xuZXhwb3J0IGNsYXNzIEJyb3dzZXJEb21BZGFwdGVyIGV4dGVuZHMgR2VuZXJpY0Jyb3dzZXJEb21BZGFwdGVyIHtcbiAgcGFyc2UodGVtcGxhdGVIdG1sOiBzdHJpbmcpIHsgdGhyb3cgbmV3IEVycm9yKFwicGFyc2Ugbm90IGltcGxlbWVudGVkXCIpOyB9XG4gIHN0YXRpYyBtYWtlQ3VycmVudCgpIHsgc2V0Um9vdERvbUFkYXB0ZXIobmV3IEJyb3dzZXJEb21BZGFwdGVyKCkpOyB9XG4gIGhhc1Byb3BlcnR5KGVsZW1lbnQsIG5hbWU6IHN0cmluZyk6IGJvb2xlYW4geyByZXR1cm4gbmFtZSBpbiBlbGVtZW50OyB9XG4gIHNldFByb3BlcnR5KGVsOiAvKmVsZW1lbnQqLyBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkgeyBlbFtuYW1lXSA9IHZhbHVlOyB9XG4gIGdldFByb3BlcnR5KGVsOiAvKmVsZW1lbnQqLyBhbnksIG5hbWU6IHN0cmluZyk6IGFueSB7IHJldHVybiBlbFtuYW1lXTsgfVxuICBpbnZva2UoZWw6IC8qZWxlbWVudCovIGFueSwgbWV0aG9kTmFtZTogc3RyaW5nLCBhcmdzOiBhbnlbXSk6IGFueSB7XG4gICAgZWxbbWV0aG9kTmFtZV0uYXBwbHkoZWwsIGFyZ3MpO1xuICB9XG5cbiAgLy8gVE9ETyh0Ym9zY2gpOiBtb3ZlIHRoaXMgaW50byBhIHNlcGFyYXRlIGVudmlyb25tZW50IGNsYXNzIG9uY2Ugd2UgaGF2ZSBpdFxuICBsb2dFcnJvcihlcnJvcikge1xuICAgIGlmICh3aW5kb3cuY29uc29sZS5lcnJvcikge1xuICAgICAgd2luZG93LmNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cuY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGxvZyhlcnJvcikgeyB3aW5kb3cuY29uc29sZS5sb2coZXJyb3IpOyB9XG5cbiAgbG9nR3JvdXAoZXJyb3IpIHtcbiAgICBpZiAod2luZG93LmNvbnNvbGUuZ3JvdXApIHtcbiAgICAgIHdpbmRvdy5jb25zb2xlLmdyb3VwKGVycm9yKTtcbiAgICAgIHRoaXMubG9nRXJyb3IoZXJyb3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cuY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGxvZ0dyb3VwRW5kKCkge1xuICAgIGlmICh3aW5kb3cuY29uc29sZS5ncm91cEVuZCkge1xuICAgICAgd2luZG93LmNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgYXR0clRvUHJvcE1hcCgpOiBhbnkgeyByZXR1cm4gX2F0dHJUb1Byb3BNYXA7IH1cblxuICBxdWVyeShzZWxlY3Rvcjogc3RyaW5nKTogYW55IHsgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpOyB9XG4gIHF1ZXJ5U2VsZWN0b3IoZWwsIHNlbGVjdG9yOiBzdHJpbmcpOiBIVE1MRWxlbWVudCB7IHJldHVybiBlbC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTsgfVxuICBxdWVyeVNlbGVjdG9yQWxsKGVsLCBzZWxlY3Rvcjogc3RyaW5nKTogYW55W10geyByZXR1cm4gZWwucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7IH1cbiAgb24oZWwsIGV2dCwgbGlzdGVuZXIpIHsgZWwuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGxpc3RlbmVyLCBmYWxzZSk7IH1cbiAgb25BbmRDYW5jZWwoZWwsIGV2dCwgbGlzdGVuZXIpOiBGdW5jdGlvbiB7XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgLy8gTmVlZGVkIHRvIGZvbGxvdyBEYXJ0J3Mgc3Vic2NyaXB0aW9uIHNlbWFudGljLCB1bnRpbCBmaXggb2ZcbiAgICAvLyBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2RhcnQvaXNzdWVzL2RldGFpbD9pZD0xNzQwNlxuICAgIHJldHVybiAoKSA9PiB7IGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0LCBsaXN0ZW5lciwgZmFsc2UpOyB9O1xuICB9XG4gIGRpc3BhdGNoRXZlbnQoZWwsIGV2dCkgeyBlbC5kaXNwYXRjaEV2ZW50KGV2dCk7IH1cbiAgY3JlYXRlTW91c2VFdmVudChldmVudFR5cGU6IHN0cmluZyk6IE1vdXNlRXZlbnQge1xuICAgIHZhciBldnQ6IE1vdXNlRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudCcpO1xuICAgIGV2dC5pbml0RXZlbnQoZXZlbnRUeXBlLCB0cnVlLCB0cnVlKTtcbiAgICByZXR1cm4gZXZ0O1xuICB9XG4gIGNyZWF0ZUV2ZW50KGV2ZW50VHlwZSk6IEV2ZW50IHtcbiAgICB2YXIgZXZ0OiBFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgIGV2dC5pbml0RXZlbnQoZXZlbnRUeXBlLCB0cnVlLCB0cnVlKTtcbiAgICByZXR1cm4gZXZ0O1xuICB9XG4gIHByZXZlbnREZWZhdWx0KGV2dDogRXZlbnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldnQucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgfVxuICBpc1ByZXZlbnRlZChldnQ6IEV2ZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGV2dC5kZWZhdWx0UHJldmVudGVkIHx8IGlzUHJlc2VudChldnQucmV0dXJuVmFsdWUpICYmICFldnQucmV0dXJuVmFsdWU7XG4gIH1cbiAgZ2V0SW5uZXJIVE1MKGVsKTogc3RyaW5nIHsgcmV0dXJuIGVsLmlubmVySFRNTDsgfVxuICBnZXRPdXRlckhUTUwoZWwpOiBzdHJpbmcgeyByZXR1cm4gZWwub3V0ZXJIVE1MOyB9XG4gIG5vZGVOYW1lKG5vZGU6IE5vZGUpOiBzdHJpbmcgeyByZXR1cm4gbm9kZS5ub2RlTmFtZTsgfVxuICBub2RlVmFsdWUobm9kZTogTm9kZSk6IHN0cmluZyB7IHJldHVybiBub2RlLm5vZGVWYWx1ZTsgfVxuICB0eXBlKG5vZGU6IEhUTUxJbnB1dEVsZW1lbnQpOiBzdHJpbmcgeyByZXR1cm4gbm9kZS50eXBlOyB9XG4gIGNvbnRlbnQobm9kZTogTm9kZSk6IE5vZGUge1xuICAgIGlmICh0aGlzLmhhc1Byb3BlcnR5KG5vZGUsIFwiY29udGVudFwiKSkge1xuICAgICAgcmV0dXJuICg8YW55Pm5vZGUpLmNvbnRlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgfVxuICBmaXJzdENoaWxkKGVsKTogTm9kZSB7IHJldHVybiBlbC5maXJzdENoaWxkOyB9XG4gIG5leHRTaWJsaW5nKGVsKTogTm9kZSB7IHJldHVybiBlbC5uZXh0U2libGluZzsgfVxuICBwYXJlbnRFbGVtZW50KGVsKTogTm9kZSB7IHJldHVybiBlbC5wYXJlbnROb2RlOyB9XG4gIGNoaWxkTm9kZXMoZWwpOiBOb2RlW10geyByZXR1cm4gZWwuY2hpbGROb2RlczsgfVxuICBjaGlsZE5vZGVzQXNMaXN0KGVsKTogYW55W10ge1xuICAgIHZhciBjaGlsZE5vZGVzID0gZWwuY2hpbGROb2RlcztcbiAgICB2YXIgcmVzID0gTGlzdFdyYXBwZXIuY3JlYXRlRml4ZWRTaXplKGNoaWxkTm9kZXMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlc1tpXSA9IGNoaWxkTm9kZXNbaV07XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cbiAgY2xlYXJOb2RlcyhlbCkge1xuICAgIHdoaWxlIChlbC5maXJzdENoaWxkKSB7XG4gICAgICBlbC5yZW1vdmVDaGlsZChlbC5maXJzdENoaWxkKTtcbiAgICB9XG4gIH1cbiAgYXBwZW5kQ2hpbGQoZWwsIG5vZGUpIHsgZWwuYXBwZW5kQ2hpbGQobm9kZSk7IH1cbiAgcmVtb3ZlQ2hpbGQoZWwsIG5vZGUpIHsgZWwucmVtb3ZlQ2hpbGQobm9kZSk7IH1cbiAgcmVwbGFjZUNoaWxkKGVsOiBOb2RlLCBuZXdDaGlsZCwgb2xkQ2hpbGQpIHsgZWwucmVwbGFjZUNoaWxkKG5ld0NoaWxkLCBvbGRDaGlsZCk7IH1cbiAgcmVtb3ZlKG5vZGUpOiBOb2RlIHtcbiAgICBpZiAobm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xuICB9XG4gIGluc2VydEJlZm9yZShlbCwgbm9kZSkgeyBlbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLCBlbCk7IH1cbiAgaW5zZXJ0QWxsQmVmb3JlKGVsLCBub2RlcykgeyBub2Rlcy5mb3JFYWNoKG4gPT4gZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobiwgZWwpKTsgfVxuICBpbnNlcnRBZnRlcihlbCwgbm9kZSkgeyBlbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLCBlbC5uZXh0U2libGluZyk7IH1cbiAgc2V0SW5uZXJIVE1MKGVsLCB2YWx1ZSkgeyBlbC5pbm5lckhUTUwgPSB2YWx1ZTsgfVxuICBnZXRUZXh0KGVsKTogc3RyaW5nIHsgcmV0dXJuIGVsLnRleHRDb250ZW50OyB9XG4gIC8vIFRPRE8odmljYik6IHJlbW92ZWQgRWxlbWVudCB0eXBlIGJlY2F1c2UgaXQgZG9lcyBub3Qgc3VwcG9ydCBTdHlsZUVsZW1lbnRcbiAgc2V0VGV4dChlbCwgdmFsdWU6IHN0cmluZykgeyBlbC50ZXh0Q29udGVudCA9IHZhbHVlOyB9XG4gIGdldFZhbHVlKGVsKTogc3RyaW5nIHsgcmV0dXJuIGVsLnZhbHVlOyB9XG4gIHNldFZhbHVlKGVsLCB2YWx1ZTogc3RyaW5nKSB7IGVsLnZhbHVlID0gdmFsdWU7IH1cbiAgZ2V0Q2hlY2tlZChlbCk6IGJvb2xlYW4geyByZXR1cm4gZWwuY2hlY2tlZDsgfVxuICBzZXRDaGVja2VkKGVsLCB2YWx1ZTogYm9vbGVhbikgeyBlbC5jaGVja2VkID0gdmFsdWU7IH1cbiAgY3JlYXRlQ29tbWVudCh0ZXh0OiBzdHJpbmcpOiBDb21tZW50IHsgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQodGV4dCk7IH1cbiAgY3JlYXRlVGVtcGxhdGUoaHRtbCk6IEhUTUxFbGVtZW50IHtcbiAgICB2YXIgdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG4gICAgdC5pbm5lckhUTUwgPSBodG1sO1xuICAgIHJldHVybiB0O1xuICB9XG4gIGNyZWF0ZUVsZW1lbnQodGFnTmFtZSwgZG9jID0gZG9jdW1lbnQpOiBIVE1MRWxlbWVudCB7IHJldHVybiBkb2MuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTsgfVxuICBjcmVhdGVFbGVtZW50TlMobnMsIHRhZ05hbWUsIGRvYyA9IGRvY3VtZW50KTogRWxlbWVudCB7IHJldHVybiBkb2MuY3JlYXRlRWxlbWVudE5TKG5zLCB0YWdOYW1lKTsgfVxuICBjcmVhdGVUZXh0Tm9kZSh0ZXh0OiBzdHJpbmcsIGRvYyA9IGRvY3VtZW50KTogVGV4dCB7IHJldHVybiBkb2MuY3JlYXRlVGV4dE5vZGUodGV4dCk7IH1cbiAgY3JlYXRlU2NyaXB0VGFnKGF0dHJOYW1lOiBzdHJpbmcsIGF0dHJWYWx1ZTogc3RyaW5nLCBkb2MgPSBkb2N1bWVudCk6IEhUTUxTY3JpcHRFbGVtZW50IHtcbiAgICB2YXIgZWwgPSA8SFRNTFNjcmlwdEVsZW1lbnQ+ZG9jLmNyZWF0ZUVsZW1lbnQoJ1NDUklQVCcpO1xuICAgIGVsLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcbiAgICByZXR1cm4gZWw7XG4gIH1cbiAgY3JlYXRlU3R5bGVFbGVtZW50KGNzczogc3RyaW5nLCBkb2MgPSBkb2N1bWVudCk6IEhUTUxTdHlsZUVsZW1lbnQge1xuICAgIHZhciBzdHlsZSA9IDxIVE1MU3R5bGVFbGVtZW50PmRvYy5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHRoaXMuYXBwZW5kQ2hpbGQoc3R5bGUsIHRoaXMuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gICAgcmV0dXJuIHN0eWxlO1xuICB9XG4gIGNyZWF0ZVNoYWRvd1Jvb3QoZWw6IEhUTUxFbGVtZW50KTogRG9jdW1lbnRGcmFnbWVudCB7IHJldHVybiAoPGFueT5lbCkuY3JlYXRlU2hhZG93Um9vdCgpOyB9XG4gIGdldFNoYWRvd1Jvb3QoZWw6IEhUTUxFbGVtZW50KTogRG9jdW1lbnRGcmFnbWVudCB7IHJldHVybiAoPGFueT5lbCkuc2hhZG93Um9vdDsgfVxuICBnZXRIb3N0KGVsOiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHsgcmV0dXJuICg8YW55PmVsKS5ob3N0OyB9XG4gIGNsb25lKG5vZGU6IE5vZGUpOiBOb2RlIHsgcmV0dXJuIG5vZGUuY2xvbmVOb2RlKHRydWUpOyB9XG4gIGdldEVsZW1lbnRzQnlDbGFzc05hbWUoZWxlbWVudCwgbmFtZTogc3RyaW5nKTogSFRNTEVsZW1lbnRbXSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShuYW1lKTtcbiAgfVxuICBnZXRFbGVtZW50c0J5VGFnTmFtZShlbGVtZW50LCBuYW1lOiBzdHJpbmcpOiBIVE1MRWxlbWVudFtdIHtcbiAgICByZXR1cm4gZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShuYW1lKTtcbiAgfVxuICBjbGFzc0xpc3QoZWxlbWVudCk6IGFueVtdIHsgcmV0dXJuIDxhbnlbXT5BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlbGVtZW50LmNsYXNzTGlzdCwgMCk7IH1cbiAgYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lOiBzdHJpbmcpIHsgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7IH1cbiAgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lOiBzdHJpbmcpIHsgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7IH1cbiAgaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lOiBzdHJpbmcpOiBib29sZWFuIHsgcmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7IH1cbiAgc2V0U3R5bGUoZWxlbWVudCwgc3R5bGVOYW1lOiBzdHJpbmcsIHN0eWxlVmFsdWU6IHN0cmluZykge1xuICAgIGVsZW1lbnQuc3R5bGVbc3R5bGVOYW1lXSA9IHN0eWxlVmFsdWU7XG4gIH1cbiAgcmVtb3ZlU3R5bGUoZWxlbWVudCwgc3R5bGVuYW1lOiBzdHJpbmcpIHsgZWxlbWVudC5zdHlsZVtzdHlsZW5hbWVdID0gbnVsbDsgfVxuICBnZXRTdHlsZShlbGVtZW50LCBzdHlsZW5hbWU6IHN0cmluZyk6IHN0cmluZyB7IHJldHVybiBlbGVtZW50LnN0eWxlW3N0eWxlbmFtZV07IH1cbiAgaGFzU3R5bGUoZWxlbWVudCwgc3R5bGVOYW1lOiBzdHJpbmcsIHN0eWxlVmFsdWU6IHN0cmluZyA9IG51bGwpOiBib29sZWFuIHtcbiAgICB2YXIgdmFsdWUgPSB0aGlzLmdldFN0eWxlKGVsZW1lbnQsIHN0eWxlTmFtZSkgfHwgJyc7XG4gICAgcmV0dXJuIHN0eWxlVmFsdWUgPyB2YWx1ZSA9PSBzdHlsZVZhbHVlIDogdmFsdWUubGVuZ3RoID4gMDtcbiAgfVxuICB0YWdOYW1lKGVsZW1lbnQpOiBzdHJpbmcgeyByZXR1cm4gZWxlbWVudC50YWdOYW1lOyB9XG4gIGF0dHJpYnV0ZU1hcChlbGVtZW50KTogTWFwPHN0cmluZywgc3RyaW5nPiB7XG4gICAgdmFyIHJlcyA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG4gICAgdmFyIGVsQXR0cnMgPSBlbGVtZW50LmF0dHJpYnV0ZXM7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbEF0dHJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgYXR0cmliID0gZWxBdHRyc1tpXTtcbiAgICAgIHJlcy5zZXQoYXR0cmliLm5hbWUsIGF0dHJpYi52YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cbiAgaGFzQXR0cmlidXRlKGVsZW1lbnQsIGF0dHJpYnV0ZTogc3RyaW5nKTogYm9vbGVhbiB7IHJldHVybiBlbGVtZW50Lmhhc0F0dHJpYnV0ZShhdHRyaWJ1dGUpOyB9XG4gIGhhc0F0dHJpYnV0ZU5TKGVsZW1lbnQsIG5zOiBzdHJpbmcsIGF0dHJpYnV0ZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGVsZW1lbnQuaGFzQXR0cmlidXRlTlMobnMsIGF0dHJpYnV0ZSk7XG4gIH1cbiAgZ2V0QXR0cmlidXRlKGVsZW1lbnQsIGF0dHJpYnV0ZTogc3RyaW5nKTogc3RyaW5nIHsgcmV0dXJuIGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSk7IH1cbiAgZ2V0QXR0cmlidXRlTlMoZWxlbWVudCwgbnM6IHN0cmluZywgbmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGVOUyhucywgbmFtZSk7XG4gIH1cbiAgc2V0QXR0cmlidXRlKGVsZW1lbnQsIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgeyBlbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7IH1cbiAgc2V0QXR0cmlidXRlTlMoZWxlbWVudCwgbnM6IHN0cmluZywgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGVOUyhucywgbmFtZSwgdmFsdWUpO1xuICB9XG4gIHJlbW92ZUF0dHJpYnV0ZShlbGVtZW50LCBhdHRyaWJ1dGU6IHN0cmluZykgeyBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGUpOyB9XG4gIHJlbW92ZUF0dHJpYnV0ZU5TKGVsZW1lbnQsIG5zOiBzdHJpbmcsIG5hbWU6IHN0cmluZykgeyBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZU5TKG5zLCBuYW1lKTsgfVxuICB0ZW1wbGF0ZUF3YXJlUm9vdChlbCk6IGFueSB7IHJldHVybiB0aGlzLmlzVGVtcGxhdGVFbGVtZW50KGVsKSA/IHRoaXMuY29udGVudChlbCkgOiBlbDsgfVxuICBjcmVhdGVIdG1sRG9jdW1lbnQoKTogSFRNTERvY3VtZW50IHtcbiAgICByZXR1cm4gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KCdmYWtlVGl0bGUnKTtcbiAgfVxuICBkZWZhdWx0RG9jKCk6IEhUTUxEb2N1bWVudCB7IHJldHVybiBkb2N1bWVudDsgfVxuICBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWwpOiBhbnkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIHt0b3A6IDAsIGJvdHRvbTogMCwgbGVmdDogMCwgcmlnaHQ6IDAsIHdpZHRoOiAwLCBoZWlnaHQ6IDB9O1xuICAgIH1cbiAgfVxuICBnZXRUaXRsZSgpOiBzdHJpbmcgeyByZXR1cm4gZG9jdW1lbnQudGl0bGU7IH1cbiAgc2V0VGl0bGUobmV3VGl0bGU6IHN0cmluZykgeyBkb2N1bWVudC50aXRsZSA9IG5ld1RpdGxlIHx8ICcnOyB9XG4gIGVsZW1lbnRNYXRjaGVzKG4sIHNlbGVjdG9yOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICB2YXIgbWF0Y2hlcyA9IGZhbHNlO1xuICAgIGlmIChuIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgIGlmIChuLm1hdGNoZXMpIHtcbiAgICAgICAgbWF0Y2hlcyA9IG4ubWF0Y2hlcyhzZWxlY3Rvcik7XG4gICAgICB9IGVsc2UgaWYgKG4ubXNNYXRjaGVzU2VsZWN0b3IpIHtcbiAgICAgICAgbWF0Y2hlcyA9IG4ubXNNYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgfSBlbHNlIGlmIChuLndlYmtpdE1hdGNoZXNTZWxlY3Rvcikge1xuICAgICAgICBtYXRjaGVzID0gbi53ZWJraXRNYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWF0Y2hlcztcbiAgfVxuICBpc1RlbXBsYXRlRWxlbWVudChlbDogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgZWwubm9kZU5hbWUgPT0gXCJURU1QTEFURVwiO1xuICB9XG4gIGlzVGV4dE5vZGUobm9kZTogTm9kZSk6IGJvb2xlYW4geyByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREU7IH1cbiAgaXNDb21tZW50Tm9kZShub2RlOiBOb2RlKTogYm9vbGVhbiB7IHJldHVybiBub2RlLm5vZGVUeXBlID09PSBOb2RlLkNPTU1FTlRfTk9ERTsgfVxuICBpc0VsZW1lbnROb2RlKG5vZGU6IE5vZGUpOiBib29sZWFuIHsgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFOyB9XG4gIGhhc1NoYWRvd1Jvb3Qobm9kZSk6IGJvb2xlYW4geyByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIGlzUHJlc2VudChub2RlLnNoYWRvd1Jvb3QpOyB9XG4gIGlzU2hhZG93Um9vdChub2RlKTogYm9vbGVhbiB7IHJldHVybiBub2RlIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudDsgfVxuICBpbXBvcnRJbnRvRG9jKG5vZGU6IE5vZGUpOiBhbnkge1xuICAgIHZhciB0b0ltcG9ydCA9IG5vZGU7XG4gICAgaWYgKHRoaXMuaXNUZW1wbGF0ZUVsZW1lbnQobm9kZSkpIHtcbiAgICAgIHRvSW1wb3J0ID0gdGhpcy5jb250ZW50KG5vZGUpO1xuICAgIH1cbiAgICByZXR1cm4gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0b0ltcG9ydCwgdHJ1ZSk7XG4gIH1cbiAgYWRvcHROb2RlKG5vZGU6IE5vZGUpOiBhbnkgeyByZXR1cm4gZG9jdW1lbnQuYWRvcHROb2RlKG5vZGUpOyB9XG4gIGdldEhyZWYoZWw6IEVsZW1lbnQpOiBzdHJpbmcgeyByZXR1cm4gKDxhbnk+ZWwpLmhyZWY7IH1cbiAgZ2V0RXZlbnRLZXkoZXZlbnQpOiBzdHJpbmcge1xuICAgIHZhciBrZXkgPSBldmVudC5rZXk7XG4gICAgaWYgKGlzQmxhbmsoa2V5KSkge1xuICAgICAga2V5ID0gZXZlbnQua2V5SWRlbnRpZmllcjtcbiAgICAgIC8vIGtleUlkZW50aWZpZXIgaXMgZGVmaW5lZCBpbiB0aGUgb2xkIGRyYWZ0IG9mIERPTSBMZXZlbCAzIEV2ZW50cyBpbXBsZW1lbnRlZCBieSBDaHJvbWUgYW5kXG4gICAgICAvLyBTYWZhcmlcbiAgICAgIC8vIGNmXG4gICAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDA3L1dELURPTS1MZXZlbC0zLUV2ZW50cy0yMDA3MTIyMS9ldmVudHMuaHRtbCNFdmVudHMtS2V5Ym9hcmRFdmVudHMtSW50ZXJmYWNlc1xuICAgICAgaWYgKGlzQmxhbmsoa2V5KSkge1xuICAgICAgICByZXR1cm4gJ1VuaWRlbnRpZmllZCc7XG4gICAgICB9XG4gICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoJ1UrJykpIHtcbiAgICAgICAga2V5ID0gU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChrZXkuc3Vic3RyaW5nKDIpLCAxNikpO1xuICAgICAgICBpZiAoZXZlbnQubG9jYXRpb24gPT09IERPTV9LRVlfTE9DQVRJT05fTlVNUEFEICYmIF9jaHJvbWVOdW1LZXlQYWRNYXAuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIC8vIFRoZXJlIGlzIGEgYnVnIGluIENocm9tZSBmb3IgbnVtZXJpYyBrZXlwYWQga2V5czpcbiAgICAgICAgICAvLyBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MTU1NjU0XG4gICAgICAgICAgLy8gMSwgMiwgMyAuLi4gYXJlIHJlcG9ydGVkIGFzIEEsIEIsIEMgLi4uXG4gICAgICAgICAga2V5ID0gX2Nocm9tZU51bUtleVBhZE1hcFtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChfa2V5TWFwLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGtleSA9IF9rZXlNYXBba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIGtleTtcbiAgfVxuICBnZXRHbG9iYWxFdmVudFRhcmdldCh0YXJnZXQ6IHN0cmluZyk6IEV2ZW50VGFyZ2V0IHtcbiAgICBpZiAodGFyZ2V0ID09IFwid2luZG93XCIpIHtcbiAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgfSBlbHNlIGlmICh0YXJnZXQgPT0gXCJkb2N1bWVudFwiKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQ7XG4gICAgfSBlbHNlIGlmICh0YXJnZXQgPT0gXCJib2R5XCIpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5ib2R5O1xuICAgIH1cbiAgfVxuICBnZXRIaXN0b3J5KCk6IEhpc3RvcnkgeyByZXR1cm4gd2luZG93Lmhpc3Rvcnk7IH1cbiAgZ2V0TG9jYXRpb24oKTogTG9jYXRpb24geyByZXR1cm4gd2luZG93LmxvY2F0aW9uOyB9XG4gIGdldEJhc2VIcmVmKCk6IHN0cmluZyB7XG4gICAgdmFyIGhyZWYgPSBnZXRCYXNlRWxlbWVudEhyZWYoKTtcbiAgICBpZiAoaXNCbGFuayhocmVmKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiByZWxhdGl2ZVBhdGgoaHJlZik7XG4gIH1cbiAgcmVzZXRCYXNlRWxlbWVudCgpOiB2b2lkIHsgYmFzZUVsZW1lbnQgPSBudWxsOyB9XG4gIGdldFVzZXJBZ2VudCgpOiBzdHJpbmcgeyByZXR1cm4gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7IH1cbiAgc2V0RGF0YShlbGVtZW50LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZShlbGVtZW50LCAnZGF0YS0nICsgbmFtZSwgdmFsdWUpO1xuICB9XG4gIGdldERhdGEoZWxlbWVudCwgbmFtZTogc3RyaW5nKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKGVsZW1lbnQsICdkYXRhLScgKyBuYW1lKTsgfVxuICBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpOiBhbnkgeyByZXR1cm4gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTsgfVxuICAvLyBUT0RPKHRib3NjaCk6IG1vdmUgdGhpcyBpbnRvIGEgc2VwYXJhdGUgZW52aXJvbm1lbnQgY2xhc3Mgb25jZSB3ZSBoYXZlIGl0XG4gIHNldEdsb2JhbFZhcihwYXRoOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHsgc2V0VmFsdWVPblBhdGgoZ2xvYmFsLCBwYXRoLCB2YWx1ZSk7IH1cbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNhbGxiYWNrKTogbnVtYmVyIHsgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2FsbGJhY2spOyB9XG4gIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGlkOiBudW1iZXIpIHsgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGlkKTsgfVxuICBwZXJmb3JtYW5jZU5vdygpOiBudW1iZXIge1xuICAgIC8vIHBlcmZvcm1hbmNlLm5vdygpIGlzIG5vdCBhdmFpbGFibGUgaW4gYWxsIGJyb3dzZXJzLCBzZWVcbiAgICAvLyBodHRwOi8vY2FuaXVzZS5jb20vI3NlYXJjaD1wZXJmb3JtYW5jZS5ub3dcbiAgICBpZiAoaXNQcmVzZW50KHdpbmRvdy5wZXJmb3JtYW5jZSkgJiYgaXNQcmVzZW50KHdpbmRvdy5wZXJmb3JtYW5jZS5ub3cpKSB7XG4gICAgICByZXR1cm4gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gRGF0ZVdyYXBwZXIudG9NaWxsaXMoRGF0ZVdyYXBwZXIubm93KCkpO1xuICAgIH1cbiAgfVxufVxuXG5cbnZhciBiYXNlRWxlbWVudCA9IG51bGw7XG5mdW5jdGlvbiBnZXRCYXNlRWxlbWVudEhyZWYoKTogc3RyaW5nIHtcbiAgaWYgKGlzQmxhbmsoYmFzZUVsZW1lbnQpKSB7XG4gICAgYmFzZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdiYXNlJyk7XG4gICAgaWYgKGlzQmxhbmsoYmFzZUVsZW1lbnQpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJhc2VFbGVtZW50LmdldEF0dHJpYnV0ZSgnaHJlZicpO1xufVxuXG4vLyBiYXNlZCBvbiB1cmxVdGlscy5qcyBpbiBBbmd1bGFySlMgMVxudmFyIHVybFBhcnNpbmdOb2RlID0gbnVsbDtcbmZ1bmN0aW9uIHJlbGF0aXZlUGF0aCh1cmwpOiBzdHJpbmcge1xuICBpZiAoaXNCbGFuayh1cmxQYXJzaW5nTm9kZSkpIHtcbiAgICB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICB9XG4gIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIHVybCk7XG4gIHJldHVybiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID8gdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
