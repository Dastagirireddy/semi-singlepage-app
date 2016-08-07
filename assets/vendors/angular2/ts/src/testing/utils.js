System.register(['angular2/core', 'angular2/src/facade/collection', 'angular2/src/platform/dom/dom_adapter', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, collection_1, dom_adapter_1, lang_1;
    var Log, browserDetection, BrowserDetection, _RE_SPECIAL_CHARS, _ESCAPE_RE, _singleTagWhitelist;
    function dispatchEvent(element, eventType) {
        dom_adapter_1.DOM.dispatchEvent(element, dom_adapter_1.DOM.createEvent(eventType));
    }
    exports_1("dispatchEvent", dispatchEvent);
    function el(html) {
        return dom_adapter_1.DOM.firstChild(dom_adapter_1.DOM.content(dom_adapter_1.DOM.createTemplate(html)));
    }
    exports_1("el", el);
    function containsRegexp(input) {
        return lang_1.RegExpWrapper.create(lang_1.StringWrapper.replaceAllMapped(input, _ESCAPE_RE, function (match) { return ("\\" + match[0]); }));
    }
    exports_1("containsRegexp", containsRegexp);
    function normalizeCSS(css) {
        css = lang_1.StringWrapper.replaceAll(css, /\s+/g, ' ');
        css = lang_1.StringWrapper.replaceAll(css, /:\s/g, ':');
        css = lang_1.StringWrapper.replaceAll(css, /'/g, '"');
        css = lang_1.StringWrapper.replaceAll(css, / }/g, '}');
        css = lang_1.StringWrapper.replaceAllMapped(css, /url\((\"|\s)(.+)(\"|\s)\)(\s*)/g, function (match) { return ("url(\"" + match[2] + "\")"); });
        css = lang_1.StringWrapper.replaceAllMapped(css, /\[(.+)=([^"\]]+)\]/g, function (match) { return ("[" + match[1] + "=\"" + match[2] + "\"]"); });
        return css;
    }
    exports_1("normalizeCSS", normalizeCSS);
    function stringifyElement(el) {
        var result = '';
        if (dom_adapter_1.DOM.isElementNode(el)) {
            var tagName = dom_adapter_1.DOM.tagName(el).toLowerCase();
            // Opening tag
            result += "<" + tagName;
            // Attributes in an ordered way
            var attributeMap = dom_adapter_1.DOM.attributeMap(el);
            var keys = [];
            attributeMap.forEach(function (v, k) { return keys.push(k); });
            collection_1.ListWrapper.sort(keys);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var attValue = attributeMap.get(key);
                if (!lang_1.isString(attValue)) {
                    result += " " + key;
                }
                else {
                    result += " " + key + "=\"" + attValue + "\"";
                }
            }
            result += '>';
            // Children
            var childrenRoot = dom_adapter_1.DOM.templateAwareRoot(el);
            var children = lang_1.isPresent(childrenRoot) ? dom_adapter_1.DOM.childNodes(childrenRoot) : [];
            for (var j = 0; j < children.length; j++) {
                result += stringifyElement(children[j]);
            }
            // Closing tag
            if (!collection_1.ListWrapper.contains(_singleTagWhitelist, tagName)) {
                result += "</" + tagName + ">";
            }
        }
        else if (dom_adapter_1.DOM.isCommentNode(el)) {
            result += "<!--" + dom_adapter_1.DOM.nodeValue(el) + "-->";
        }
        else {
            result += dom_adapter_1.DOM.getText(el);
        }
        return result;
    }
    exports_1("stringifyElement", stringifyElement);
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            Log = (function () {
                function Log() {
                    this.logItems = [];
                }
                Log.prototype.add = function (value) { this.logItems.push(value); };
                Log.prototype.fn = function (value) {
                    var _this = this;
                    return function (a1, a2, a3, a4, a5) {
                        if (a1 === void 0) { a1 = null; }
                        if (a2 === void 0) { a2 = null; }
                        if (a3 === void 0) { a3 = null; }
                        if (a4 === void 0) { a4 = null; }
                        if (a5 === void 0) { a5 = null; }
                        _this.logItems.push(value);
                    };
                };
                Log.prototype.clear = function () { this.logItems = []; };
                Log.prototype.result = function () { return this.logItems.join("; "); };
                Log = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], Log);
                return Log;
            }());
            exports_1("Log", Log);
            exports_1("browserDetection", browserDetection = null);
            BrowserDetection = (function () {
                function BrowserDetection(ua) {
                    if (lang_1.isPresent(ua)) {
                        this._ua = ua;
                    }
                    else {
                        this._ua = lang_1.isPresent(dom_adapter_1.DOM) ? dom_adapter_1.DOM.getUserAgent() : '';
                    }
                }
                BrowserDetection.setup = function () { exports_1("browserDetection", browserDetection = new BrowserDetection(null)); };
                Object.defineProperty(BrowserDetection.prototype, "isFirefox", {
                    get: function () { return this._ua.indexOf('Firefox') > -1; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BrowserDetection.prototype, "isAndroid", {
                    get: function () {
                        return this._ua.indexOf('Mozilla/5.0') > -1 && this._ua.indexOf('Android') > -1 &&
                            this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Chrome') == -1;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BrowserDetection.prototype, "isEdge", {
                    get: function () { return this._ua.indexOf('Edge') > -1; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BrowserDetection.prototype, "isIE", {
                    get: function () { return this._ua.indexOf('Trident') > -1; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BrowserDetection.prototype, "isWebkit", {
                    get: function () {
                        return this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Edge') == -1;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BrowserDetection.prototype, "isIOS7", {
                    get: function () {
                        return this._ua.indexOf('iPhone OS 7') > -1 || this._ua.indexOf('iPad OS 7') > -1;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BrowserDetection.prototype, "isSlow", {
                    get: function () { return this.isAndroid || this.isIE || this.isIOS7; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BrowserDetection.prototype, "supportsIntlApi", {
                    // The Intl API is only properly supported in recent Chrome and Opera.
                    // Note: Edge is disguised as Chrome 42, so checking the "Edge" part is needed,
                    // see https://msdn.microsoft.com/en-us/library/hh869301(v=vs.85).aspx
                    get: function () {
                        return this._ua.indexOf('Chrome/4') > -1 && this._ua.indexOf('Edge') == -1;
                    },
                    enumerable: true,
                    configurable: true
                });
                return BrowserDetection;
            }());
            exports_1("BrowserDetection", BrowserDetection);
            _RE_SPECIAL_CHARS = ['-', '[', ']', '/', '{', '}', '\\', '(', ')', '*', '+', '?', '.', '^', '$', '|'];
            _ESCAPE_RE = lang_1.RegExpWrapper.create("[\\" + _RE_SPECIAL_CHARS.join('\\') + "]");
            _singleTagWhitelist = ['br', 'hr', 'input'];
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy90ZXN0aW5nL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7YUF3QlcsZ0JBQWdCLG9CQW9EdkIsaUJBQWlCLEVBRWpCLFVBQVUsRUFrQlYsbUJBQW1CO0lBNUJ2Qix1QkFBOEIsT0FBTyxFQUFFLFNBQVM7UUFDOUMsaUJBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLGlCQUFHLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUZELHlDQUVDLENBQUE7SUFFRCxZQUFtQixJQUFZO1FBQzdCLE1BQU0sQ0FBYyxpQkFBRyxDQUFDLFVBQVUsQ0FBQyxpQkFBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUZELG1CQUVDLENBQUE7SUFLRCx3QkFBK0IsS0FBYTtRQUMxQyxNQUFNLENBQUMsb0JBQWEsQ0FBQyxNQUFNLENBQ3ZCLG9CQUFhLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxVQUFDLEtBQUssSUFBSyxPQUFBLFFBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFFLEVBQWYsQ0FBZSxDQUFDLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBSEQsMkNBR0MsQ0FBQTtJQUVELHNCQUE2QixHQUFXO1FBQ3RDLEdBQUcsR0FBRyxvQkFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELEdBQUcsR0FBRyxvQkFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELEdBQUcsR0FBRyxvQkFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLEdBQUcsR0FBRyxvQkFBYSxD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O2dCQUNILHVCQUFDO1lBQUQsQ0F4Q0EsQUF3Q0MsSUFBQTtZQXhDRCwrQ0F3Q0MsQ0FBQTtZQVVHLGlCQUFpQixHQUNqQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2xGLFVBQVUsR0FBRyxvQkFBYSxDQUFDLE1BQU0sQ0FBQyxRQUFNLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBRyxDQUFDLENBQUM7WUFrQnpFLG1CQUFtQixHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvdGVzdGluZy91dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0xpc3RXcmFwcGVyLCBNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtET019IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZG9tX2FkYXB0ZXInO1xuaW1wb3J0IHtpc1ByZXNlbnQsIGlzU3RyaW5nLCBSZWdFeHBXcmFwcGVyLCBTdHJpbmdXcmFwcGVyLCBSZWdFeHB9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2cge1xuICBsb2dJdGVtczogYW55W107XG5cbiAgY29uc3RydWN0b3IoKSB7IHRoaXMubG9nSXRlbXMgPSBbXTsgfVxuXG4gIGFkZCh2YWx1ZSk6IHZvaWQgeyB0aGlzLmxvZ0l0ZW1zLnB1c2godmFsdWUpOyB9XG5cbiAgZm4odmFsdWUpIHtcbiAgICByZXR1cm4gKGExOiBhbnkgPSBudWxsLCBhMjogYW55ID0gbnVsbCwgYTM6IGFueSA9IG51bGwsIGE0OiBhbnkgPSBudWxsLCBhNTogYW55ID0gbnVsbCkgPT4ge1xuICAgICAgdGhpcy5sb2dJdGVtcy5wdXNoKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBjbGVhcigpOiB2b2lkIHsgdGhpcy5sb2dJdGVtcyA9IFtdOyB9XG5cbiAgcmVzdWx0KCk6IHN0cmluZyB7IHJldHVybiB0aGlzLmxvZ0l0ZW1zLmpvaW4oXCI7IFwiKTsgfVxufVxuXG5leHBvcnQgdmFyIGJyb3dzZXJEZXRlY3Rpb246IEJyb3dzZXJEZXRlY3Rpb24gPSBudWxsO1xuXG5leHBvcnQgY2xhc3MgQnJvd3NlckRldGVjdGlvbiB7XG4gIHByaXZhdGUgX3VhOiBzdHJpbmc7XG5cbiAgc3RhdGljIHNldHVwKCkgeyBicm93c2VyRGV0ZWN0aW9uID0gbmV3IEJyb3dzZXJEZXRlY3Rpb24obnVsbCk7IH1cblxuICBjb25zdHJ1Y3Rvcih1YTogc3RyaW5nKSB7XG4gICAgaWYgKGlzUHJlc2VudCh1YSkpIHtcbiAgICAgIHRoaXMuX3VhID0gdWE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3VhID0gaXNQcmVzZW50KERPTSkgPyBET00uZ2V0VXNlckFnZW50KCkgOiAnJztcbiAgICB9XG4gIH1cblxuICBnZXQgaXNGaXJlZm94KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignRmlyZWZveCcpID4gLTE7IH1cblxuICBnZXQgaXNBbmRyb2lkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl91YS5pbmRleE9mKCdNb3ppbGxhLzUuMCcpID4gLTEgJiYgdGhpcy5fdWEuaW5kZXhPZignQW5kcm9pZCcpID4gLTEgJiZcbiAgICAgICAgICAgdGhpcy5fdWEuaW5kZXhPZignQXBwbGVXZWJLaXQnKSA+IC0xICYmIHRoaXMuX3VhLmluZGV4T2YoJ0Nocm9tZScpID09IC0xO1xuICB9XG5cbiAgZ2V0IGlzRWRnZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3VhLmluZGV4T2YoJ0VkZ2UnKSA+IC0xOyB9XG5cbiAgZ2V0IGlzSUUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl91YS5pbmRleE9mKCdUcmlkZW50JykgPiAtMTsgfVxuXG4gIGdldCBpc1dlYmtpdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignQXBwbGVXZWJLaXQnKSA+IC0xICYmIHRoaXMuX3VhLmluZGV4T2YoJ0VkZ2UnKSA9PSAtMTtcbiAgfVxuXG4gIGdldCBpc0lPUzcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3VhLmluZGV4T2YoJ2lQaG9uZSBPUyA3JykgPiAtMSB8fCB0aGlzLl91YS5pbmRleE9mKCdpUGFkIE9TIDcnKSA+IC0xO1xuICB9XG5cbiAgZ2V0IGlzU2xvdygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuaXNBbmRyb2lkIHx8IHRoaXMuaXNJRSB8fCB0aGlzLmlzSU9TNzsgfVxuXG4gIC8vIFRoZSBJbnRsIEFQSSBpcyBvbmx5IHByb3Blcmx5IHN1cHBvcnRlZCBpbiByZWNlbnQgQ2hyb21lIGFuZCBPcGVyYS5cbiAgLy8gTm90ZTogRWRnZSBpcyBkaXNndWlzZWQgYXMgQ2hyb21lIDQyLCBzbyBjaGVja2luZyB0aGUgXCJFZGdlXCIgcGFydCBpcyBuZWVkZWQsXG4gIC8vIHNlZSBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2hoODY5MzAxKHY9dnMuODUpLmFzcHhcbiAgZ2V0IHN1cHBvcnRzSW50bEFwaSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignQ2hyb21lLzQnKSA+IC0xICYmIHRoaXMuX3VhLmluZGV4T2YoJ0VkZ2UnKSA9PSAtMTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGF0Y2hFdmVudChlbGVtZW50LCBldmVudFR5cGUpOiB2b2lkIHtcbiAgRE9NLmRpc3BhdGNoRXZlbnQoZWxlbWVudCwgRE9NLmNyZWF0ZUV2ZW50KGV2ZW50VHlwZSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWwoaHRtbDogc3RyaW5nKTogSFRNTEVsZW1lbnQge1xuICByZXR1cm4gPEhUTUxFbGVtZW50PkRPTS5maXJzdENoaWxkKERPTS5jb250ZW50KERPTS5jcmVhdGVUZW1wbGF0ZShodG1sKSkpO1xufVxuXG52YXIgX1JFX1NQRUNJQUxfQ0hBUlMgPVxuICAgIFsnLScsICdbJywgJ10nLCAnLycsICd7JywgJ30nLCAnXFxcXCcsICcoJywgJyknLCAnKicsICcrJywgJz8nLCAnLicsICdeJywgJyQnLCAnfCddO1xudmFyIF9FU0NBUEVfUkUgPSBSZWdFeHBXcmFwcGVyLmNyZWF0ZShgW1xcXFwke19SRV9TUEVDSUFMX0NIQVJTLmpvaW4oJ1xcXFwnKX1dYCk7XG5leHBvcnQgZnVuY3Rpb24gY29udGFpbnNSZWdleHAoaW5wdXQ6IHN0cmluZyk6IFJlZ0V4cCB7XG4gIHJldHVybiBSZWdFeHBXcmFwcGVyLmNyZWF0ZShcbiAgICAgIFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbE1hcHBlZChpbnB1dCwgX0VTQ0FQRV9SRSwgKG1hdGNoKSA9PiBgXFxcXCR7bWF0Y2hbMF19YCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplQ1NTKGNzczogc3RyaW5nKTogc3RyaW5nIHtcbiAgY3NzID0gU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsKGNzcywgL1xccysvZywgJyAnKTtcbiAgY3NzID0gU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsKGNzcywgLzpcXHMvZywgJzonKTtcbiAgY3NzID0gU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsKGNzcywgLycvZywgJ1wiJyk7XG4gIGNzcyA9IFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbChjc3MsIC8gfS9nLCAnfScpO1xuICBjc3MgPSBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGxNYXBwZWQoY3NzLCAvdXJsXFwoKFxcXCJ8XFxzKSguKykoXFxcInxcXHMpXFwpKFxccyopL2csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobWF0Y2gpID0+IGB1cmwoXCIke21hdGNoWzJdfVwiKWApO1xuICBjc3MgPSBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGxNYXBwZWQoY3NzLCAvXFxbKC4rKT0oW15cIlxcXV0rKVxcXS9nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG1hdGNoKSA9PiBgWyR7bWF0Y2hbMV19PVwiJHttYXRjaFsyXX1cIl1gKTtcbiAgcmV0dXJuIGNzcztcbn1cblxudmFyIF9zaW5nbGVUYWdXaGl0ZWxpc3QgPSBbJ2JyJywgJ2hyJywgJ2lucHV0J107XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5RWxlbWVudChlbCk6IHN0cmluZyB7XG4gIHZhciByZXN1bHQgPSAnJztcbiAgaWYgKERPTS5pc0VsZW1lbnROb2RlKGVsKSkge1xuICAgIHZhciB0YWdOYW1lID0gRE9NLnRhZ05hbWUoZWwpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAvLyBPcGVuaW5nIHRhZ1xuICAgIHJlc3VsdCArPSBgPCR7dGFnTmFtZX1gO1xuXG4gICAgLy8gQXR0cmlidXRlcyBpbiBhbiBvcmRlcmVkIHdheVxuICAgIHZhciBhdHRyaWJ1dGVNYXAgPSBET00uYXR0cmlidXRlTWFwKGVsKTtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGF0dHJpYnV0ZU1hcC5mb3JFYWNoKCh2LCBrKSA9PiBrZXlzLnB1c2goaykpO1xuICAgIExpc3RXcmFwcGVyLnNvcnQoa2V5cyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgIHZhciBhdHRWYWx1ZSA9IGF0dHJpYnV0ZU1hcC5nZXQoa2V5KTtcbiAgICAgIGlmICghaXNTdHJpbmcoYXR0VmFsdWUpKSB7XG4gICAgICAgIHJlc3VsdCArPSBgICR7a2V5fWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgKz0gYCAke2tleX09XCIke2F0dFZhbHVlfVwiYDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0ICs9ICc+JztcblxuICAgIC8vIENoaWxkcmVuXG4gICAgdmFyIGNoaWxkcmVuUm9vdCA9IERPTS50ZW1wbGF0ZUF3YXJlUm9vdChlbCk7XG4gICAgdmFyIGNoaWxkcmVuID0gaXNQcmVzZW50KGNoaWxkcmVuUm9vdCkgPyBET00uY2hpbGROb2RlcyhjaGlsZHJlblJvb3QpIDogW107XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBjaGlsZHJlbi5sZW5ndGg7IGorKykge1xuICAgICAgcmVzdWx0ICs9IHN0cmluZ2lmeUVsZW1lbnQoY2hpbGRyZW5bal0pO1xuICAgIH1cblxuICAgIC8vIENsb3NpbmcgdGFnXG4gICAgaWYgKCFMaXN0V3JhcHBlci5jb250YWlucyhfc2luZ2xlVGFnV2hpdGVsaXN0LCB0YWdOYW1lKSkge1xuICAgICAgcmVzdWx0ICs9IGA8LyR7dGFnTmFtZX0+YDtcbiAgICB9XG4gIH0gZWxzZSBpZiAoRE9NLmlzQ29tbWVudE5vZGUoZWwpKSB7XG4gICAgcmVzdWx0ICs9IGA8IS0tJHtET00ubm9kZVZhbHVlKGVsKX0tLT5gO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCArPSBET00uZ2V0VGV4dChlbCk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
