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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3Rlc3RpbmcvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OzthQXdCVyxnQkFBZ0Isb0JBb0R2QixpQkFBaUIsRUFFakIsVUFBVSxFQWtCVixtQkFBbUI7SUE1QnZCLHVCQUE4QixPQUFPLEVBQUUsU0FBUztRQUM5QyxpQkFBRyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsaUJBQUcsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRkQseUNBRUMsQ0FBQTtJQUVELFlBQW1CLElBQVk7UUFDN0IsTUFBTSxDQUFjLGlCQUFHLENBQUMsVUFBVSxDQUFDLGlCQUFHLENBQUMsT0FBTyxDQUFDLGlCQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRkQsbUJBRUMsQ0FBQTtJQUtELHdCQUErQixLQUFhO1FBQzFDLE1BQU0sQ0FBQyxvQkFBYSxDQUFDLE1BQU0sQ0FDdkIsb0JBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLFVBQUMsS0FBSyxJQUFLLE9BQUEsUUFBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUUsRUFBZixDQUFlLENBQUMsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFIRCwyQ0FHQyxDQUFBO0lBRUQsc0JBQTZCLEdBQVc7UUFDdEMsR0FBRyxHQUFHLG9CQUFhLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDakQsR0FBRyxHQUFHLG9CQUFhLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDakQsR0FBRyxHQUFHLG9CQUFhLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0MsR0FBRyxHQUFHLG9CQUFhLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDaEQsR0FBRyxHQUFHLG9CQUFhLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLGlDQUFpQyxFQUN0QyxVQUFDLEtBQUssSUFBSyxPQUFBLFlBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFJLEVBQXBCLENBQW9CLENBQUMsQ0FBQztRQUN0RSxHQUFHLEdBQUcsb0JBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUscUJBQXFCLEVBQzFCLFVBQUMsS0FBSyxJQUFLLE9BQUEsT0FBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLFdBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFJLEVBQTdCLENBQTZCLENBQUMsQ0FBQztRQUMvRSxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQVZELHVDQVVDLENBQUE7SUFHRCwwQkFBaUMsRUFBRTtRQUNqQyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsRUFBRSxDQUFDLENBQUMsaUJBQUcsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksT0FBTyxHQUFHLGlCQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBRTVDLGNBQWM7WUFDZCxNQUFNLElBQUksTUFBSSxPQUFTLENBQUM7WUFFeEIsK0JBQStCO1lBQy9CLElBQUksWUFBWSxHQUFHLGlCQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hDLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNkLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBWixDQUFZLENBQUMsQ0FBQztZQUM3Qyx3QkFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDckMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixJQUFJLFFBQVEsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGVBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLE1BQU0sSUFBSSxNQUFJLEdBQUssQ0FBQztnQkFDdEIsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixNQUFNLElBQUksTUFBSSxHQUFHLFdBQUssUUFBUSxPQUFHLENBQUM7Z0JBQ3BDLENBQUM7WUFDSCxDQUFDO1lBQ0QsTUFBTSxJQUFJLEdBQUcsQ0FBQztZQUVkLFdBQVc7WUFDWCxJQUFJLFlBQVksR0FBRyxpQkFBRyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzdDLElBQUksUUFBUSxHQUFHLGdCQUFTLENBQUMsWUFBWSxDQUFDLEdBQUcsaUJBQUcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzNFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUN6QyxNQUFNLElBQUksZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsQ0FBQztZQUVELGNBQWM7WUFDZCxFQUFFLENBQUMsQ0FBQyxDQUFDLHdCQUFXLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEQsTUFBTSxJQUFJLE9BQUssT0FBTyxNQUFHLENBQUM7WUFDNUIsQ0FBQztRQUNILENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsaUJBQUcsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sSUFBSSxTQUFPLGlCQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFLLENBQUM7UUFDMUMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxJQUFJLGlCQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVCLENBQUM7UUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUExQ0QsK0NBMENDLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7WUFySUQ7Z0JBR0U7b0JBQWdCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO2dCQUFDLENBQUM7Z0JBRXJDLGlCQUFHLEdBQUgsVUFBSSxLQUFLLElBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUUvQyxnQkFBRSxHQUFGLFVBQUcsS0FBSztvQkFBUixpQkFJQztvQkFIQyxNQUFNLENBQUMsVUFBQyxFQUFjLEVBQUUsRUFBYyxFQUFFLEVBQWMsRUFBRSxFQUFjLEVBQUUsRUFBYzt3QkFBOUUsa0JBQWMsR0FBZCxTQUFjO3dCQUFFLGtCQUFjLEdBQWQsU0FBYzt3QkFBRSxrQkFBYyxHQUFkLFNBQWM7d0JBQUUsa0JBQWMsR0FBZCxTQUFjO3dCQUFFLGtCQUFjLEdBQWQsU0FBYzt3QkFDcEYsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzVCLENBQUMsQ0FBQTtnQkFDSCxDQUFDO2dCQUVELG1CQUFLLEdBQUwsY0FBZ0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUVyQyxvQkFBTSxHQUFOLGNBQW1CLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBaEJ2RDtvQkFBQyxpQkFBVSxFQUFFOzt1QkFBQTtnQkFpQmIsVUFBQztZQUFELENBaEJBLEFBZ0JDLElBQUE7WUFoQkQscUJBZ0JDLENBQUE7WUFFVSw4QkFBQSxnQkFBZ0IsR0FBcUIsSUFBSSxDQUFBLENBQUM7WUFFckQ7Z0JBS0UsMEJBQVksRUFBVTtvQkFDcEIsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2xCLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO29CQUNoQixDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLElBQUksQ0FBQyxHQUFHLEdBQUcsZ0JBQVMsQ0FBQyxpQkFBRyxDQUFDLEdBQUcsaUJBQUcsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFLENBQUM7b0JBQ3RELENBQUM7Z0JBQ0gsQ0FBQztnQkFSTSxzQkFBSyxHQUFaLGNBQWlCLDhCQUFBLGdCQUFnQixHQUFHLElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7Z0JBVWpFLHNCQUFJLHVDQUFTO3lCQUFiLGNBQTJCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFFckUsc0JBQUksdUNBQVM7eUJBQWI7d0JBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDeEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ2xGLENBQUM7OzttQkFBQTtnQkFFRCxzQkFBSSxvQ0FBTTt5QkFBVixjQUF3QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBRS9ELHNCQUFJLGtDQUFJO3lCQUFSLGNBQXNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFFaEUsc0JBQUksc0NBQVE7eUJBQVo7d0JBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNoRixDQUFDOzs7bUJBQUE7Z0JBRUQsc0JBQUksb0NBQU07eUJBQVY7d0JBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNwRixDQUFDOzs7bUJBQUE7Z0JBRUQsc0JBQUksb0NBQU07eUJBQVYsY0FBd0IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUs1RSxzQkFBSSw2Q0FBZTtvQkFIbkIsc0VBQXNFO29CQUN0RSwrRUFBK0U7b0JBQy9FLHNFQUFzRTt5QkFDdEU7d0JBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUM3RSxDQUFDOzs7bUJBQUE7Z0JBQ0gsdUJBQUM7WUFBRCxDQXhDQSxBQXdDQyxJQUFBO1lBeENELCtDQXdDQyxDQUFBO1lBVUcsaUJBQWlCLEdBQ2pCLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDbEYsVUFBVSxHQUFHLG9CQUFhLENBQUMsTUFBTSxDQUFDLFFBQU0saUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFHLENBQUMsQ0FBQztZQWtCekUsbUJBQW1CLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3Rlc3RpbmcvdXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtMaXN0V3JhcHBlciwgTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7RE9NfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9hZGFwdGVyJztcbmltcG9ydCB7aXNQcmVzZW50LCBpc1N0cmluZywgUmVnRXhwV3JhcHBlciwgU3RyaW5nV3JhcHBlciwgUmVnRXhwfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9nIHtcbiAgbG9nSXRlbXM6IGFueVtdO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB0aGlzLmxvZ0l0ZW1zID0gW107IH1cblxuICBhZGQodmFsdWUpOiB2b2lkIHsgdGhpcy5sb2dJdGVtcy5wdXNoKHZhbHVlKTsgfVxuXG4gIGZuKHZhbHVlKSB7XG4gICAgcmV0dXJuIChhMTogYW55ID0gbnVsbCwgYTI6IGFueSA9IG51bGwsIGEzOiBhbnkgPSBudWxsLCBhNDogYW55ID0gbnVsbCwgYTU6IGFueSA9IG51bGwpID0+IHtcbiAgICAgIHRoaXMubG9nSXRlbXMucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgY2xlYXIoKTogdm9pZCB7IHRoaXMubG9nSXRlbXMgPSBbXTsgfVxuXG4gIHJlc3VsdCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5sb2dJdGVtcy5qb2luKFwiOyBcIik7IH1cbn1cblxuZXhwb3J0IHZhciBicm93c2VyRGV0ZWN0aW9uOiBCcm93c2VyRGV0ZWN0aW9uID0gbnVsbDtcblxuZXhwb3J0IGNsYXNzIEJyb3dzZXJEZXRlY3Rpb24ge1xuICBwcml2YXRlIF91YTogc3RyaW5nO1xuXG4gIHN0YXRpYyBzZXR1cCgpIHsgYnJvd3NlckRldGVjdGlvbiA9IG5ldyBCcm93c2VyRGV0ZWN0aW9uKG51bGwpOyB9XG5cbiAgY29uc3RydWN0b3IodWE6IHN0cmluZykge1xuICAgIGlmIChpc1ByZXNlbnQodWEpKSB7XG4gICAgICB0aGlzLl91YSA9IHVhO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl91YSA9IGlzUHJlc2VudChET00pID8gRE9NLmdldFVzZXJBZ2VudCgpIDogJyc7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGlzRmlyZWZveCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3VhLmluZGV4T2YoJ0ZpcmVmb3gnKSA+IC0xOyB9XG5cbiAgZ2V0IGlzQW5kcm9pZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignTW96aWxsYS81LjAnKSA+IC0xICYmIHRoaXMuX3VhLmluZGV4T2YoJ0FuZHJvaWQnKSA+IC0xICYmXG4gICAgICAgICAgIHRoaXMuX3VhLmluZGV4T2YoJ0FwcGxlV2ViS2l0JykgPiAtMSAmJiB0aGlzLl91YS5pbmRleE9mKCdDaHJvbWUnKSA9PSAtMTtcbiAgfVxuXG4gIGdldCBpc0VkZ2UoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl91YS5pbmRleE9mKCdFZGdlJykgPiAtMTsgfVxuXG4gIGdldCBpc0lFKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignVHJpZGVudCcpID4gLTE7IH1cblxuICBnZXQgaXNXZWJraXQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3VhLmluZGV4T2YoJ0FwcGxlV2ViS2l0JykgPiAtMSAmJiB0aGlzLl91YS5pbmRleE9mKCdFZGdlJykgPT0gLTE7XG4gIH1cblxuICBnZXQgaXNJT1M3KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl91YS5pbmRleE9mKCdpUGhvbmUgT1MgNycpID4gLTEgfHwgdGhpcy5fdWEuaW5kZXhPZignaVBhZCBPUyA3JykgPiAtMTtcbiAgfVxuXG4gIGdldCBpc1Nsb3coKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmlzQW5kcm9pZCB8fCB0aGlzLmlzSUUgfHwgdGhpcy5pc0lPUzc7IH1cblxuICAvLyBUaGUgSW50bCBBUEkgaXMgb25seSBwcm9wZXJseSBzdXBwb3J0ZWQgaW4gcmVjZW50IENocm9tZSBhbmQgT3BlcmEuXG4gIC8vIE5vdGU6IEVkZ2UgaXMgZGlzZ3Vpc2VkIGFzIENocm9tZSA0Miwgc28gY2hlY2tpbmcgdGhlIFwiRWRnZVwiIHBhcnQgaXMgbmVlZGVkLFxuICAvLyBzZWUgaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9oaDg2OTMwMSh2PXZzLjg1KS5hc3B4XG4gIGdldCBzdXBwb3J0c0ludGxBcGkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3VhLmluZGV4T2YoJ0Nocm9tZS80JykgPiAtMSAmJiB0aGlzLl91YS5pbmRleE9mKCdFZGdlJykgPT0gLTE7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BhdGNoRXZlbnQoZWxlbWVudCwgZXZlbnRUeXBlKTogdm9pZCB7XG4gIERPTS5kaXNwYXRjaEV2ZW50KGVsZW1lbnQsIERPTS5jcmVhdGVFdmVudChldmVudFR5cGUpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVsKGh0bWw6IHN0cmluZyk6IEhUTUxFbGVtZW50IHtcbiAgcmV0dXJuIDxIVE1MRWxlbWVudD5ET00uZmlyc3RDaGlsZChET00uY29udGVudChET00uY3JlYXRlVGVtcGxhdGUoaHRtbCkpKTtcbn1cblxudmFyIF9SRV9TUEVDSUFMX0NIQVJTID1cbiAgICBbJy0nLCAnWycsICddJywgJy8nLCAneycsICd9JywgJ1xcXFwnLCAnKCcsICcpJywgJyonLCAnKycsICc/JywgJy4nLCAnXicsICckJywgJ3wnXTtcbnZhciBfRVNDQVBFX1JFID0gUmVnRXhwV3JhcHBlci5jcmVhdGUoYFtcXFxcJHtfUkVfU1BFQ0lBTF9DSEFSUy5qb2luKCdcXFxcJyl9XWApO1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnRhaW5zUmVnZXhwKGlucHV0OiBzdHJpbmcpOiBSZWdFeHAge1xuICByZXR1cm4gUmVnRXhwV3JhcHBlci5jcmVhdGUoXG4gICAgICBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGxNYXBwZWQoaW5wdXQsIF9FU0NBUEVfUkUsIChtYXRjaCkgPT4gYFxcXFwke21hdGNoWzBdfWApKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUNTUyhjc3M6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNzcyA9IFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbChjc3MsIC9cXHMrL2csICcgJyk7XG4gIGNzcyA9IFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbChjc3MsIC86XFxzL2csICc6Jyk7XG4gIGNzcyA9IFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbChjc3MsIC8nL2csICdcIicpO1xuICBjc3MgPSBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGwoY3NzLCAvIH0vZywgJ30nKTtcbiAgY3NzID0gU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsTWFwcGVkKGNzcywgL3VybFxcKChcXFwifFxccykoLispKFxcXCJ8XFxzKVxcKShcXHMqKS9nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG1hdGNoKSA9PiBgdXJsKFwiJHttYXRjaFsyXX1cIilgKTtcbiAgY3NzID0gU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsTWFwcGVkKGNzcywgL1xcWyguKyk9KFteXCJcXF1dKylcXF0vZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtYXRjaCkgPT4gYFske21hdGNoWzFdfT1cIiR7bWF0Y2hbMl19XCJdYCk7XG4gIHJldHVybiBjc3M7XG59XG5cbnZhciBfc2luZ2xlVGFnV2hpdGVsaXN0ID0gWydicicsICdocicsICdpbnB1dCddO1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeUVsZW1lbnQoZWwpOiBzdHJpbmcge1xuICB2YXIgcmVzdWx0ID0gJyc7XG4gIGlmIChET00uaXNFbGVtZW50Tm9kZShlbCkpIHtcbiAgICB2YXIgdGFnTmFtZSA9IERPTS50YWdOYW1lKGVsKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gT3BlbmluZyB0YWdcbiAgICByZXN1bHQgKz0gYDwke3RhZ05hbWV9YDtcblxuICAgIC8vIEF0dHJpYnV0ZXMgaW4gYW4gb3JkZXJlZCB3YXlcbiAgICB2YXIgYXR0cmlidXRlTWFwID0gRE9NLmF0dHJpYnV0ZU1hcChlbCk7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBhdHRyaWJ1dGVNYXAuZm9yRWFjaCgodiwgaykgPT4ga2V5cy5wdXNoKGspKTtcbiAgICBMaXN0V3JhcHBlci5zb3J0KGtleXMpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICB2YXIgYXR0VmFsdWUgPSBhdHRyaWJ1dGVNYXAuZ2V0KGtleSk7XG4gICAgICBpZiAoIWlzU3RyaW5nKGF0dFZhbHVlKSkge1xuICAgICAgICByZXN1bHQgKz0gYCAke2tleX1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ICs9IGAgJHtrZXl9PVwiJHthdHRWYWx1ZX1cImA7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdCArPSAnPic7XG5cbiAgICAvLyBDaGlsZHJlblxuICAgIHZhciBjaGlsZHJlblJvb3QgPSBET00udGVtcGxhdGVBd2FyZVJvb3QoZWwpO1xuICAgIHZhciBjaGlsZHJlbiA9IGlzUHJlc2VudChjaGlsZHJlblJvb3QpID8gRE9NLmNoaWxkTm9kZXMoY2hpbGRyZW5Sb290KSA6IFtdO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiAgICAgIHJlc3VsdCArPSBzdHJpbmdpZnlFbGVtZW50KGNoaWxkcmVuW2pdKTtcbiAgICB9XG5cbiAgICAvLyBDbG9zaW5nIHRhZ1xuICAgIGlmICghTGlzdFdyYXBwZXIuY29udGFpbnMoX3NpbmdsZVRhZ1doaXRlbGlzdCwgdGFnTmFtZSkpIHtcbiAgICAgIHJlc3VsdCArPSBgPC8ke3RhZ05hbWV9PmA7XG4gICAgfVxuICB9IGVsc2UgaWYgKERPTS5pc0NvbW1lbnROb2RlKGVsKSkge1xuICAgIHJlc3VsdCArPSBgPCEtLSR7RE9NLm5vZGVWYWx1ZShlbCl9LS0+YDtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgKz0gRE9NLmdldFRleHQoZWwpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
