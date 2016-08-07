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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL2Jyb3dzZXIvYnJvd3Nlcl9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztRQUtJLGNBQWMsRUFPWix1QkFBdUIsRUFHekIsT0FBTyxFQXFCUCxtQkFBbUIscUJBMlRuQixXQUFXLEVBWVgsY0FBYztJQVhsQjtRQUNFLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0MsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekIsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNkLENBQUM7UUFDSCxDQUFDO1FBQ0QsTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUlELHNCQUFzQixHQUFHO1FBQ3ZCLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsY0FBYyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUNELGNBQWMsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxRQUFRO1lBQ3ZCLEdBQUcsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDO0lBQ3JGLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7WUE5V0csY0FBYyxHQUFHO2dCQUNuQixPQUFPLEVBQUUsV0FBVztnQkFDcEIsV0FBVyxFQUFFLFdBQVc7Z0JBQ3hCLFVBQVUsRUFBRSxVQUFV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RCxDQWpTQSxBQWlTQyxDQWpTc0Msa0RBQXdCLEdBaVM5RDtZQWpTRCxpREFpU0MsQ0FBQTtZQUdHLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFXdkIsc0NBQXNDO1lBQ2xDLGNBQWMsR0FBRyxJQUFJLENBQUMiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvcGxhdGZvcm0vYnJvd3Nlci9icm93c2VyX2FkYXB0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01hcFdyYXBwZXIsIExpc3RXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtpc0JsYW5rLCBpc1ByZXNlbnQsIGdsb2JhbCwgc2V0VmFsdWVPblBhdGgsIERhdGVXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtzZXRSb290RG9tQWRhcHRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fYWRhcHRlcic7XG5pbXBvcnQge0dlbmVyaWNCcm93c2VyRG9tQWRhcHRlcn0gZnJvbSAnLi9nZW5lcmljX2Jyb3dzZXJfYWRhcHRlcic7XG5cbnZhciBfYXR0clRvUHJvcE1hcCA9IHtcbiAgJ2NsYXNzJzogJ2NsYXNzTmFtZScsXG4gICdpbm5lckh0bWwnOiAnaW5uZXJIVE1MJyxcbiAgJ3JlYWRvbmx5JzogJ3JlYWRPbmx5JyxcbiAgJ3RhYmluZGV4JzogJ3RhYkluZGV4J1xufTtcblxuY29uc3QgRE9NX0tFWV9MT0NBVElPTl9OVU1QQUQgPSAzO1xuXG4vLyBNYXAgdG8gY29udmVydCBzb21lIGtleSBvciBrZXlJZGVudGlmaWVyIHZhbHVlcyB0byB3aGF0IHdpbGwgYmUgcmV0dXJuZWQgYnkgZ2V0RXZlbnRLZXlcbnZhciBfa2V5TWFwID0ge1xuICAvLyBUaGUgZm9sbG93aW5nIHZhbHVlcyBhcmUgaGVyZSBmb3IgY3Jvc3MtYnJvd3NlciBjb21wYXRpYmlsaXR5IGFuZCB0byBtYXRjaCB0aGUgVzNDIHN0YW5kYXJkXG4gIC8vIGNmIGh0dHA6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0zLUV2ZW50cy1rZXkvXG4gICdcXGInOiAnQmFja3NwYWNlJyxcbiAgJ1xcdCc6ICdUYWInLFxuICAnXFx4N0YnOiAnRGVsZXRlJyxcbiAgJ1xceDFCJzogJ0VzY2FwZScsXG4gICdEZWwnOiAnRGVsZXRlJyxcbiAgJ0VzYyc6ICdFc2NhcGUnLFxuICAnTGVmdCc6ICdBcnJvd0xlZnQnLFxuICAnUmlnaHQnOiAnQXJyb3dSaWdodCcsXG4gICdVcCc6ICdBcnJvd1VwJyxcbiAgJ0Rvd24nOiAnQXJyb3dEb3duJyxcbiAgJ01lbnUnOiAnQ29udGV4dE1lbnUnLFxuICAnU2Nyb2xsJzogJ1Njcm9sbExvY2snLFxuICAnV2luJzogJ09TJ1xufTtcblxuLy8gVGhlcmUgaXMgYSBidWcgaW4gQ2hyb21lIGZvciBudW1lcmljIGtleXBhZCBrZXlzOlxuLy8gaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTE1NTY1NFxuLy8gMSwgMiwgMyAuLi4gYXJlIHJlcG9ydGVkIGFzIEEsIEIsIEMgLi4uXG52YXIgX2Nocm9tZU51bUtleVBhZE1hcCA9IHtcbiAgJ0EnOiAnMScsXG4gICdCJzogJzInLFxuICAnQyc6ICczJyxcbiAgJ0QnOiAnNCcsXG4gICdFJzogJzUnLFxuICAnRic6ICc2JyxcbiAgJ0cnOiAnNycsXG4gICdIJzogJzgnLFxuICAnSSc6ICc5JyxcbiAgJ0onOiAnKicsXG4gICdLJzogJysnLFxuICAnTSc6ICctJyxcbiAgJ04nOiAnLicsXG4gICdPJzogJy8nLFxuICAnXFx4NjAnOiAnMCcsXG4gICdcXHg5MCc6ICdOdW1Mb2NrJ1xufTtcblxuLyoqXG4gKiBBIGBEb21BZGFwdGVyYCBwb3dlcmVkIGJ5IGZ1bGwgYnJvd3NlciBET00gQVBJcy5cbiAqL1xuLyogdHNsaW50OmRpc2FibGU6cmVxdWlyZVBhcmFtZXRlclR5cGUgKi9cbmV4cG9ydCBjbGFzcyBCcm93c2VyRG9tQWRhcHRlciBleHRlbmRzIEdlbmVyaWNCcm93c2VyRG9tQWRhcHRlciB7XG4gIHBhcnNlKHRlbXBsYXRlSHRtbDogc3RyaW5nKSB7IHRocm93IG5ldyBFcnJvcihcInBhcnNlIG5vdCBpbXBsZW1lbnRlZFwiKTsgfVxuICBzdGF0aWMgbWFrZUN1cnJlbnQoKSB7IHNldFJvb3REb21BZGFwdGVyKG5ldyBCcm93c2VyRG9tQWRhcHRlcigpKTsgfVxuICBoYXNQcm9wZXJ0eShlbGVtZW50LCBuYW1lOiBzdHJpbmcpOiBib29sZWFuIHsgcmV0dXJuIG5hbWUgaW4gZWxlbWVudDsgfVxuICBzZXRQcm9wZXJ0eShlbDogLyplbGVtZW50Ki8gYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHsgZWxbbmFtZV0gPSB2YWx1ZTsgfVxuICBnZXRQcm9wZXJ0eShlbDogLyplbGVtZW50Ki8gYW55LCBuYW1lOiBzdHJpbmcpOiBhbnkgeyByZXR1cm4gZWxbbmFtZV07IH1cbiAgaW52b2tlKGVsOiAvKmVsZW1lbnQqLyBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgYXJnczogYW55W10pOiBhbnkge1xuICAgIGVsW21ldGhvZE5hbWVdLmFwcGx5KGVsLCBhcmdzKTtcbiAgfVxuXG4gIC8vIFRPRE8odGJvc2NoKTogbW92ZSB0aGlzIGludG8gYSBzZXBhcmF0ZSBlbnZpcm9ubWVudCBjbGFzcyBvbmNlIHdlIGhhdmUgaXRcbiAgbG9nRXJyb3IoZXJyb3IpIHtcbiAgICBpZiAod2luZG93LmNvbnNvbGUuZXJyb3IpIHtcbiAgICAgIHdpbmRvdy5jb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LmNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBsb2coZXJyb3IpIHsgd2luZG93LmNvbnNvbGUubG9nKGVycm9yKTsgfVxuXG4gIGxvZ0dyb3VwKGVycm9yKSB7XG4gICAgaWYgKHdpbmRvdy5jb25zb2xlLmdyb3VwKSB7XG4gICAgICB3aW5kb3cuY29uc29sZS5ncm91cChlcnJvcik7XG4gICAgICB0aGlzLmxvZ0Vycm9yKGVycm9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LmNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBsb2dHcm91cEVuZCgpIHtcbiAgICBpZiAod2luZG93LmNvbnNvbGUuZ3JvdXBFbmQpIHtcbiAgICAgIHdpbmRvdy5jb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGF0dHJUb1Byb3BNYXAoKTogYW55IHsgcmV0dXJuIF9hdHRyVG9Qcm9wTWFwOyB9XG5cbiAgcXVlcnkoc2VsZWN0b3I6IHN0cmluZyk6IGFueSB7IHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTsgfVxuICBxdWVyeVNlbGVjdG9yKGVsLCBzZWxlY3Rvcjogc3RyaW5nKTogSFRNTEVsZW1lbnQgeyByZXR1cm4gZWwucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7IH1cbiAgcXVlcnlTZWxlY3RvckFsbChlbCwgc2VsZWN0b3I6IHN0cmluZyk6IGFueVtdIHsgcmV0dXJuIGVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpOyB9XG4gIG9uKGVsLCBldnQsIGxpc3RlbmVyKSB7IGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBsaXN0ZW5lciwgZmFsc2UpOyB9XG4gIG9uQW5kQ2FuY2VsKGVsLCBldnQsIGxpc3RlbmVyKTogRnVuY3Rpb24ge1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgIC8vIE5lZWRlZCB0byBmb2xsb3cgRGFydCdzIHN1YnNjcmlwdGlvbiBzZW1hbnRpYywgdW50aWwgZml4IG9mXG4gICAgLy8gaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9kYXJ0L2lzc3Vlcy9kZXRhaWw/aWQ9MTc0MDZcbiAgICByZXR1cm4gKCkgPT4geyBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dCwgbGlzdGVuZXIsIGZhbHNlKTsgfTtcbiAgfVxuICBkaXNwYXRjaEV2ZW50KGVsLCBldnQpIHsgZWwuZGlzcGF0Y2hFdmVudChldnQpOyB9XG4gIGNyZWF0ZU1vdXNlRXZlbnQoZXZlbnRUeXBlOiBzdHJpbmcpOiBNb3VzZUV2ZW50IHtcbiAgICB2YXIgZXZ0OiBNb3VzZUV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ01vdXNlRXZlbnQnKTtcbiAgICBldnQuaW5pdEV2ZW50KGV2ZW50VHlwZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgcmV0dXJuIGV2dDtcbiAgfVxuICBjcmVhdGVFdmVudChldmVudFR5cGUpOiBFdmVudCB7XG4gICAgdmFyIGV2dDogRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICBldnQuaW5pdEV2ZW50KGV2ZW50VHlwZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgcmV0dXJuIGV2dDtcbiAgfVxuICBwcmV2ZW50RGVmYXVsdChldnQ6IEV2ZW50KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZ0LnJldHVyblZhbHVlID0gZmFsc2U7XG4gIH1cbiAgaXNQcmV2ZW50ZWQoZXZ0OiBFdmVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBldnQuZGVmYXVsdFByZXZlbnRlZCB8fCBpc1ByZXNlbnQoZXZ0LnJldHVyblZhbHVlKSAmJiAhZXZ0LnJldHVyblZhbHVlO1xuICB9XG4gIGdldElubmVySFRNTChlbCk6IHN0cmluZyB7IHJldHVybiBlbC5pbm5lckhUTUw7IH1cbiAgZ2V0T3V0ZXJIVE1MKGVsKTogc3RyaW5nIHsgcmV0dXJuIGVsLm91dGVySFRNTDsgfVxuICBub2RlTmFtZShub2RlOiBOb2RlKTogc3RyaW5nIHsgcmV0dXJuIG5vZGUubm9kZU5hbWU7IH1cbiAgbm9kZVZhbHVlKG5vZGU6IE5vZGUpOiBzdHJpbmcgeyByZXR1cm4gbm9kZS5ub2RlVmFsdWU7IH1cbiAgdHlwZShub2RlOiBIVE1MSW5wdXRFbGVtZW50KTogc3RyaW5nIHsgcmV0dXJuIG5vZGUudHlwZTsgfVxuICBjb250ZW50KG5vZGU6IE5vZGUpOiBOb2RlIHtcbiAgICBpZiAodGhpcy5oYXNQcm9wZXJ0eShub2RlLCBcImNvbnRlbnRcIikpIHtcbiAgICAgIHJldHVybiAoPGFueT5ub2RlKS5jb250ZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gIH1cbiAgZmlyc3RDaGlsZChlbCk6IE5vZGUgeyByZXR1cm4gZWwuZmlyc3RDaGlsZDsgfVxuICBuZXh0U2libGluZyhlbCk6IE5vZGUgeyByZXR1cm4gZWwubmV4dFNpYmxpbmc7IH1cbiAgcGFyZW50RWxlbWVudChlbCk6IE5vZGUgeyByZXR1cm4gZWwucGFyZW50Tm9kZTsgfVxuICBjaGlsZE5vZGVzKGVsKTogTm9kZVtdIHsgcmV0dXJuIGVsLmNoaWxkTm9kZXM7IH1cbiAgY2hpbGROb2Rlc0FzTGlzdChlbCk6IGFueVtdIHtcbiAgICB2YXIgY2hpbGROb2RlcyA9IGVsLmNoaWxkTm9kZXM7XG4gICAgdmFyIHJlcyA9IExpc3RXcmFwcGVyLmNyZWF0ZUZpeGVkU2l6ZShjaGlsZE5vZGVzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXNbaV0gPSBjaGlsZE5vZGVzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIGNsZWFyTm9kZXMoZWwpIHtcbiAgICB3aGlsZSAoZWwuZmlyc3RDaGlsZCkge1xuICAgICAgZWwucmVtb3ZlQ2hpbGQoZWwuZmlyc3RDaGlsZCk7XG4gICAgfVxuICB9XG4gIGFwcGVuZENoaWxkKGVsLCBub2RlKSB7IGVsLmFwcGVuZENoaWxkKG5vZGUpOyB9XG4gIHJlbW92ZUNoaWxkKGVsLCBub2RlKSB7IGVsLnJlbW92ZUNoaWxkKG5vZGUpOyB9XG4gIHJlcGxhY2VDaGlsZChlbDogTm9kZSwgbmV3Q2hpbGQsIG9sZENoaWxkKSB7IGVsLnJlcGxhY2VDaGlsZChuZXdDaGlsZCwgb2xkQ2hpbGQpOyB9XG4gIHJlbW92ZShub2RlKTogTm9kZSB7XG4gICAgaWYgKG5vZGUucGFyZW50Tm9kZSkge1xuICAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuICBpbnNlcnRCZWZvcmUoZWwsIG5vZGUpIHsgZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobm9kZSwgZWwpOyB9XG4gIGluc2VydEFsbEJlZm9yZShlbCwgbm9kZXMpIHsgbm9kZXMuZm9yRWFjaChuID0+IGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG4sIGVsKSk7IH1cbiAgaW5zZXJ0QWZ0ZXIoZWwsIG5vZGUpIHsgZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobm9kZSwgZWwubmV4dFNpYmxpbmcpOyB9XG4gIHNldElubmVySFRNTChlbCwgdmFsdWUpIHsgZWwuaW5uZXJIVE1MID0gdmFsdWU7IH1cbiAgZ2V0VGV4dChlbCk6IHN0cmluZyB7IHJldHVybiBlbC50ZXh0Q29udGVudDsgfVxuICAvLyBUT0RPKHZpY2IpOiByZW1vdmVkIEVsZW1lbnQgdHlwZSBiZWNhdXNlIGl0IGRvZXMgbm90IHN1cHBvcnQgU3R5bGVFbGVtZW50XG4gIHNldFRleHQoZWwsIHZhbHVlOiBzdHJpbmcpIHsgZWwudGV4dENvbnRlbnQgPSB2YWx1ZTsgfVxuICBnZXRWYWx1ZShlbCk6IHN0cmluZyB7IHJldHVybiBlbC52YWx1ZTsgfVxuICBzZXRWYWx1ZShlbCwgdmFsdWU6IHN0cmluZykgeyBlbC52YWx1ZSA9IHZhbHVlOyB9XG4gIGdldENoZWNrZWQoZWwpOiBib29sZWFuIHsgcmV0dXJuIGVsLmNoZWNrZWQ7IH1cbiAgc2V0Q2hlY2tlZChlbCwgdmFsdWU6IGJvb2xlYW4pIHsgZWwuY2hlY2tlZCA9IHZhbHVlOyB9XG4gIGNyZWF0ZUNvbW1lbnQodGV4dDogc3RyaW5nKTogQ29tbWVudCB7IHJldHVybiBkb2N1bWVudC5jcmVhdGVDb21tZW50KHRleHQpOyB9XG4gIGNyZWF0ZVRlbXBsYXRlKGh0bWwpOiBIVE1MRWxlbWVudCB7XG4gICAgdmFyIHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuICAgIHQuaW5uZXJIVE1MID0gaHRtbDtcbiAgICByZXR1cm4gdDtcbiAgfVxuICBjcmVhdGVFbGVtZW50KHRhZ05hbWUsIGRvYyA9IGRvY3VtZW50KTogSFRNTEVsZW1lbnQgeyByZXR1cm4gZG9jLmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7IH1cbiAgY3JlYXRlRWxlbWVudE5TKG5zLCB0YWdOYW1lLCBkb2MgPSBkb2N1bWVudCk6IEVsZW1lbnQgeyByZXR1cm4gZG9jLmNyZWF0ZUVsZW1lbnROUyhucywgdGFnTmFtZSk7IH1cbiAgY3JlYXRlVGV4dE5vZGUodGV4dDogc3RyaW5nLCBkb2MgPSBkb2N1bWVudCk6IFRleHQgeyByZXR1cm4gZG9jLmNyZWF0ZVRleHROb2RlKHRleHQpOyB9XG4gIGNyZWF0ZVNjcmlwdFRhZyhhdHRyTmFtZTogc3RyaW5nLCBhdHRyVmFsdWU6IHN0cmluZywgZG9jID0gZG9jdW1lbnQpOiBIVE1MU2NyaXB0RWxlbWVudCB7XG4gICAgdmFyIGVsID0gPEhUTUxTY3JpcHRFbGVtZW50PmRvYy5jcmVhdGVFbGVtZW50KCdTQ1JJUFQnKTtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJWYWx1ZSk7XG4gICAgcmV0dXJuIGVsO1xuICB9XG4gIGNyZWF0ZVN0eWxlRWxlbWVudChjc3M6IHN0cmluZywgZG9jID0gZG9jdW1lbnQpOiBIVE1MU3R5bGVFbGVtZW50IHtcbiAgICB2YXIgc3R5bGUgPSA8SFRNTFN0eWxlRWxlbWVudD5kb2MuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICB0aGlzLmFwcGVuZENoaWxkKHN0eWxlLCB0aGlzLmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICAgIHJldHVybiBzdHlsZTtcbiAgfVxuICBjcmVhdGVTaGFkb3dSb290KGVsOiBIVE1MRWxlbWVudCk6IERvY3VtZW50RnJhZ21lbnQgeyByZXR1cm4gKDxhbnk+ZWwpLmNyZWF0ZVNoYWRvd1Jvb3QoKTsgfVxuICBnZXRTaGFkb3dSb290KGVsOiBIVE1MRWxlbWVudCk6IERvY3VtZW50RnJhZ21lbnQgeyByZXR1cm4gKDxhbnk+ZWwpLnNoYWRvd1Jvb3Q7IH1cbiAgZ2V0SG9zdChlbDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7IHJldHVybiAoPGFueT5lbCkuaG9zdDsgfVxuICBjbG9uZShub2RlOiBOb2RlKTogTm9kZSB7IHJldHVybiBub2RlLmNsb25lTm9kZSh0cnVlKTsgfVxuICBnZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGVsZW1lbnQsIG5hbWU6IHN0cmluZyk6IEhUTUxFbGVtZW50W10ge1xuICAgIHJldHVybiBlbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUobmFtZSk7XG4gIH1cbiAgZ2V0RWxlbWVudHNCeVRhZ05hbWUoZWxlbWVudCwgbmFtZTogc3RyaW5nKTogSFRNTEVsZW1lbnRbXSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUobmFtZSk7XG4gIH1cbiAgY2xhc3NMaXN0KGVsZW1lbnQpOiBhbnlbXSB7IHJldHVybiA8YW55W10+QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZWxlbWVudC5jbGFzc0xpc3QsIDApOyB9XG4gIGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZTogc3RyaW5nKSB7IGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpOyB9XG4gIHJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZTogc3RyaW5nKSB7IGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpOyB9XG4gIGhhc0NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7IHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpOyB9XG4gIHNldFN0eWxlKGVsZW1lbnQsIHN0eWxlTmFtZTogc3RyaW5nLCBzdHlsZVZhbHVlOiBzdHJpbmcpIHtcbiAgICBlbGVtZW50LnN0eWxlW3N0eWxlTmFtZV0gPSBzdHlsZVZhbHVlO1xuICB9XG4gIHJlbW92ZVN0eWxlKGVsZW1lbnQsIHN0eWxlbmFtZTogc3RyaW5nKSB7IGVsZW1lbnQuc3R5bGVbc3R5bGVuYW1lXSA9IG51bGw7IH1cbiAgZ2V0U3R5bGUoZWxlbWVudCwgc3R5bGVuYW1lOiBzdHJpbmcpOiBzdHJpbmcgeyByZXR1cm4gZWxlbWVudC5zdHlsZVtzdHlsZW5hbWVdOyB9XG4gIGhhc1N0eWxlKGVsZW1lbnQsIHN0eWxlTmFtZTogc3RyaW5nLCBzdHlsZVZhbHVlOiBzdHJpbmcgPSBudWxsKTogYm9vbGVhbiB7XG4gICAgdmFyIHZhbHVlID0gdGhpcy5nZXRTdHlsZShlbGVtZW50LCBzdHlsZU5hbWUpIHx8ICcnO1xuICAgIHJldHVybiBzdHlsZVZhbHVlID8gdmFsdWUgPT0gc3R5bGVWYWx1ZSA6IHZhbHVlLmxlbmd0aCA+IDA7XG4gIH1cbiAgdGFnTmFtZShlbGVtZW50KTogc3RyaW5nIHsgcmV0dXJuIGVsZW1lbnQudGFnTmFtZTsgfVxuICBhdHRyaWJ1dGVNYXAoZWxlbWVudCk6IE1hcDxzdHJpbmcsIHN0cmluZz4ge1xuICAgIHZhciByZXMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICAgIHZhciBlbEF0dHJzID0gZWxlbWVudC5hdHRyaWJ1dGVzO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxBdHRycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGF0dHJpYiA9IGVsQXR0cnNbaV07XG4gICAgICByZXMuc2V0KGF0dHJpYi5uYW1lLCBhdHRyaWIudmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIGhhc0F0dHJpYnV0ZShlbGVtZW50LCBhdHRyaWJ1dGU6IHN0cmluZyk6IGJvb2xlYW4geyByZXR1cm4gZWxlbWVudC5oYXNBdHRyaWJ1dGUoYXR0cmlidXRlKTsgfVxuICBoYXNBdHRyaWJ1dGVOUyhlbGVtZW50LCBuczogc3RyaW5nLCBhdHRyaWJ1dGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBlbGVtZW50Lmhhc0F0dHJpYnV0ZU5TKG5zLCBhdHRyaWJ1dGUpO1xuICB9XG4gIGdldEF0dHJpYnV0ZShlbGVtZW50LCBhdHRyaWJ1dGU6IHN0cmluZyk6IHN0cmluZyB7IHJldHVybiBlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpOyB9XG4gIGdldEF0dHJpYnV0ZU5TKGVsZW1lbnQsIG5zOiBzdHJpbmcsIG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGVsZW1lbnQuZ2V0QXR0cmlidXRlTlMobnMsIG5hbWUpO1xuICB9XG4gIHNldEF0dHJpYnV0ZShlbGVtZW50LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHsgZWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpOyB9XG4gIHNldEF0dHJpYnV0ZU5TKGVsZW1lbnQsIG5zOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlTlMobnMsIG5hbWUsIHZhbHVlKTtcbiAgfVxuICByZW1vdmVBdHRyaWJ1dGUoZWxlbWVudCwgYXR0cmlidXRlOiBzdHJpbmcpIHsgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlKTsgfVxuICByZW1vdmVBdHRyaWJ1dGVOUyhlbGVtZW50LCBuczogc3RyaW5nLCBuYW1lOiBzdHJpbmcpIHsgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGVOUyhucywgbmFtZSk7IH1cbiAgdGVtcGxhdGVBd2FyZVJvb3QoZWwpOiBhbnkgeyByZXR1cm4gdGhpcy5pc1RlbXBsYXRlRWxlbWVudChlbCkgPyB0aGlzLmNvbnRlbnQoZWwpIDogZWw7IH1cbiAgY3JlYXRlSHRtbERvY3VtZW50KCk6IEhUTUxEb2N1bWVudCB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCgnZmFrZVRpdGxlJyk7XG4gIH1cbiAgZGVmYXVsdERvYygpOiBIVE1MRG9jdW1lbnQgeyByZXR1cm4gZG9jdW1lbnQ7IH1cbiAgZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsKTogYW55IHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiB7dG9wOiAwLCBib3R0b206IDAsIGxlZnQ6IDAsIHJpZ2h0OiAwLCB3aWR0aDogMCwgaGVpZ2h0OiAwfTtcbiAgICB9XG4gIH1cbiAgZ2V0VGl0bGUoKTogc3RyaW5nIHsgcmV0dXJuIGRvY3VtZW50LnRpdGxlOyB9XG4gIHNldFRpdGxlKG5ld1RpdGxlOiBzdHJpbmcpIHsgZG9jdW1lbnQudGl0bGUgPSBuZXdUaXRsZSB8fCAnJzsgfVxuICBlbGVtZW50TWF0Y2hlcyhuLCBzZWxlY3Rvcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgdmFyIG1hdGNoZXMgPSBmYWxzZTtcbiAgICBpZiAobiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICBpZiAobi5tYXRjaGVzKSB7XG4gICAgICAgIG1hdGNoZXMgPSBuLm1hdGNoZXMoc2VsZWN0b3IpO1xuICAgICAgfSBlbHNlIGlmIChuLm1zTWF0Y2hlc1NlbGVjdG9yKSB7XG4gICAgICAgIG1hdGNoZXMgPSBuLm1zTWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgIH0gZWxzZSBpZiAobi53ZWJraXRNYXRjaGVzU2VsZWN0b3IpIHtcbiAgICAgICAgbWF0Y2hlcyA9IG4ud2Via2l0TWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoZXM7XG4gIH1cbiAgaXNUZW1wbGF0ZUVsZW1lbnQoZWw6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBlbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIGVsLm5vZGVOYW1lID09IFwiVEVNUExBVEVcIjtcbiAgfVxuICBpc1RleHROb2RlKG5vZGU6IE5vZGUpOiBib29sZWFuIHsgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFOyB9XG4gIGlzQ29tbWVudE5vZGUobm9kZTogTm9kZSk6IGJvb2xlYW4geyByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5DT01NRU5UX05PREU7IH1cbiAgaXNFbGVtZW50Tm9kZShub2RlOiBOb2RlKTogYm9vbGVhbiB7IHJldHVybiBub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERTsgfVxuICBoYXNTaGFkb3dSb290KG5vZGUpOiBib29sZWFuIHsgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBpc1ByZXNlbnQobm9kZS5zaGFkb3dSb290KTsgfVxuICBpc1NoYWRvd1Jvb3Qobm9kZSk6IGJvb2xlYW4geyByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQ7IH1cbiAgaW1wb3J0SW50b0RvYyhub2RlOiBOb2RlKTogYW55IHtcbiAgICB2YXIgdG9JbXBvcnQgPSBub2RlO1xuICAgIGlmICh0aGlzLmlzVGVtcGxhdGVFbGVtZW50KG5vZGUpKSB7XG4gICAgICB0b0ltcG9ydCA9IHRoaXMuY29udGVudChub2RlKTtcbiAgICB9XG4gICAgcmV0dXJuIGRvY3VtZW50LmltcG9ydE5vZGUodG9JbXBvcnQsIHRydWUpO1xuICB9XG4gIGFkb3B0Tm9kZShub2RlOiBOb2RlKTogYW55IHsgcmV0dXJuIGRvY3VtZW50LmFkb3B0Tm9kZShub2RlKTsgfVxuICBnZXRIcmVmKGVsOiBFbGVtZW50KTogc3RyaW5nIHsgcmV0dXJuICg8YW55PmVsKS5ocmVmOyB9XG4gIGdldEV2ZW50S2V5KGV2ZW50KTogc3RyaW5nIHtcbiAgICB2YXIga2V5ID0gZXZlbnQua2V5O1xuICAgIGlmIChpc0JsYW5rKGtleSkpIHtcbiAgICAgIGtleSA9IGV2ZW50LmtleUlkZW50aWZpZXI7XG4gICAgICAvLyBrZXlJZGVudGlmaWVyIGlzIGRlZmluZWQgaW4gdGhlIG9sZCBkcmFmdCBvZiBET00gTGV2ZWwgMyBFdmVudHMgaW1wbGVtZW50ZWQgYnkgQ2hyb21lIGFuZFxuICAgICAgLy8gU2FmYXJpXG4gICAgICAvLyBjZlxuICAgICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvMjAwNy9XRC1ET00tTGV2ZWwtMy1FdmVudHMtMjAwNzEyMjEvZXZlbnRzLmh0bWwjRXZlbnRzLUtleWJvYXJkRXZlbnRzLUludGVyZmFjZXNcbiAgICAgIGlmIChpc0JsYW5rKGtleSkpIHtcbiAgICAgICAgcmV0dXJuICdVbmlkZW50aWZpZWQnO1xuICAgICAgfVxuICAgICAgaWYgKGtleS5zdGFydHNXaXRoKCdVKycpKSB7XG4gICAgICAgIGtleSA9IFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQoa2V5LnN1YnN0cmluZygyKSwgMTYpKTtcbiAgICAgICAgaWYgKGV2ZW50LmxvY2F0aW9uID09PSBET01fS0VZX0xPQ0FUSU9OX05VTVBBRCAmJiBfY2hyb21lTnVtS2V5UGFkTWFwLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAvLyBUaGVyZSBpcyBhIGJ1ZyBpbiBDaHJvbWUgZm9yIG51bWVyaWMga2V5cGFkIGtleXM6XG4gICAgICAgICAgLy8gaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTE1NTY1NFxuICAgICAgICAgIC8vIDEsIDIsIDMgLi4uIGFyZSByZXBvcnRlZCBhcyBBLCBCLCBDIC4uLlxuICAgICAgICAgIGtleSA9IF9jaHJvbWVOdW1LZXlQYWRNYXBba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoX2tleU1hcC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBrZXkgPSBfa2V5TWFwW2tleV07XG4gICAgfVxuICAgIHJldHVybiBrZXk7XG4gIH1cbiAgZ2V0R2xvYmFsRXZlbnRUYXJnZXQodGFyZ2V0OiBzdHJpbmcpOiBFdmVudFRhcmdldCB7XG4gICAgaWYgKHRhcmdldCA9PSBcIndpbmRvd1wiKSB7XG4gICAgICByZXR1cm4gd2luZG93O1xuICAgIH0gZWxzZSBpZiAodGFyZ2V0ID09IFwiZG9jdW1lbnRcIikge1xuICAgICAgcmV0dXJuIGRvY3VtZW50O1xuICAgIH0gZWxzZSBpZiAodGFyZ2V0ID09IFwiYm9keVwiKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQuYm9keTtcbiAgICB9XG4gIH1cbiAgZ2V0SGlzdG9yeSgpOiBIaXN0b3J5IHsgcmV0dXJuIHdpbmRvdy5oaXN0b3J5OyB9XG4gIGdldExvY2F0aW9uKCk6IExvY2F0aW9uIHsgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbjsgfVxuICBnZXRCYXNlSHJlZigpOiBzdHJpbmcge1xuICAgIHZhciBocmVmID0gZ2V0QmFzZUVsZW1lbnRIcmVmKCk7XG4gICAgaWYgKGlzQmxhbmsoaHJlZikpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gcmVsYXRpdmVQYXRoKGhyZWYpO1xuICB9XG4gIHJlc2V0QmFzZUVsZW1lbnQoKTogdm9pZCB7IGJhc2VFbGVtZW50ID0gbnVsbDsgfVxuICBnZXRVc2VyQWdlbnQoKTogc3RyaW5nIHsgcmV0dXJuIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50OyB9XG4gIHNldERhdGEoZWxlbWVudCwgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoZWxlbWVudCwgJ2RhdGEtJyArIG5hbWUsIHZhbHVlKTtcbiAgfVxuICBnZXREYXRhKGVsZW1lbnQsIG5hbWU6IHN0cmluZyk6IHN0cmluZyB7IHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShlbGVtZW50LCAnZGF0YS0nICsgbmFtZSk7IH1cbiAgZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTogYW55IHsgcmV0dXJuIGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7IH1cbiAgLy8gVE9ETyh0Ym9zY2gpOiBtb3ZlIHRoaXMgaW50byBhIHNlcGFyYXRlIGVudmlyb25tZW50IGNsYXNzIG9uY2Ugd2UgaGF2ZSBpdFxuICBzZXRHbG9iYWxWYXIocGF0aDogc3RyaW5nLCB2YWx1ZTogYW55KSB7IHNldFZhbHVlT25QYXRoKGdsb2JhbCwgcGF0aCwgdmFsdWUpOyB9XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShjYWxsYmFjayk6IG51bWJlciB7IHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNhbGxiYWNrKTsgfVxuICBjYW5jZWxBbmltYXRpb25GcmFtZShpZDogbnVtYmVyKSB7IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShpZCk7IH1cbiAgcGVyZm9ybWFuY2VOb3coKTogbnVtYmVyIHtcbiAgICAvLyBwZXJmb3JtYW5jZS5ub3coKSBpcyBub3QgYXZhaWxhYmxlIGluIGFsbCBicm93c2Vycywgc2VlXG4gICAgLy8gaHR0cDovL2Nhbml1c2UuY29tLyNzZWFyY2g9cGVyZm9ybWFuY2Uubm93XG4gICAgaWYgKGlzUHJlc2VudCh3aW5kb3cucGVyZm9ybWFuY2UpICYmIGlzUHJlc2VudCh3aW5kb3cucGVyZm9ybWFuY2Uubm93KSkge1xuICAgICAgcmV0dXJuIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIERhdGVXcmFwcGVyLnRvTWlsbGlzKERhdGVXcmFwcGVyLm5vdygpKTtcbiAgICB9XG4gIH1cbn1cblxuXG52YXIgYmFzZUVsZW1lbnQgPSBudWxsO1xuZnVuY3Rpb24gZ2V0QmFzZUVsZW1lbnRIcmVmKCk6IHN0cmluZyB7XG4gIGlmIChpc0JsYW5rKGJhc2VFbGVtZW50KSkge1xuICAgIGJhc2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYmFzZScpO1xuICAgIGlmIChpc0JsYW5rKGJhc2VFbGVtZW50KSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG4gIHJldHVybiBiYXNlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbn1cblxuLy8gYmFzZWQgb24gdXJsVXRpbHMuanMgaW4gQW5ndWxhckpTIDFcbnZhciB1cmxQYXJzaW5nTm9kZSA9IG51bGw7XG5mdW5jdGlvbiByZWxhdGl2ZVBhdGgodXJsKTogc3RyaW5nIHtcbiAgaWYgKGlzQmxhbmsodXJsUGFyc2luZ05vZGUpKSB7XG4gICAgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgfVxuICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB1cmwpO1xuICByZXR1cm4gKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/IHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
