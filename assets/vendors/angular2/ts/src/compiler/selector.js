System.register(['angular2/src/facade/collection', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var collection_1, lang_1, exceptions_1;
    var _EMPTY_ATTR_VALUE, _SELECTOR_REGEXP, CssSelector, SelectorMatcher, SelectorListContext, SelectorContext;
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
            _EMPTY_ATTR_VALUE = '';
            // TODO: Can't use `const` here as
            // in Dart this is not transpiled into `final` yet...
            _SELECTOR_REGEXP = lang_1.RegExpWrapper.create('(\\:not\\()|' +
                '([-\\w]+)|' +
                '(?:\\.([-\\w]+))|' +
                '(?:\\[([-\\w*]+)(?:=([^\\]]*))?\\])|' +
                '(\\))|' +
                '(\\s*,\\s*)'); // ","
            /**
             * A css selector contains an element name,
             * css classes and attribute/value pairs with the purpose
             * of selecting subsets out of them.
             */
            CssSelector = (function () {
                function CssSelector() {
                    this.element = null;
                    this.classNames = [];
                    this.attrs = [];
                    this.notSelectors = [];
                }
                CssSelector.parse = function (selector) {
                    var results = [];
                    var _addResult = function (res, cssSel) {
                        if (cssSel.notSelectors.length > 0 && lang_1.isBlank(cssSel.element) &&
                            collection_1.ListWrapper.isEmpty(cssSel.classNames) && collection_1.ListWrapper.isEmpty(cssSel.attrs)) {
                            cssSel.element = "*";
                        }
                        res.push(cssSel);
                    };
                    var cssSelector = new CssSelector();
                    var matcher = lang_1.RegExpWrapper.matcher(_SELECTOR_REGEXP, selector);
                    var match;
                    var current = cssSelector;
                    var inNot = false;
                    while (lang_1.isPresent(match = lang_1.RegExpMatcherWrapper.next(matcher))) {
                        if (lang_1.isPresent(match[1])) {
                            if (inNot) {
                                throw new exceptions_1.BaseException('Nesting :not is not allowed in a selector');
                            }
                            inNot = true;
                            current = new CssSelector();
                            cssSelector.notSelectors.push(current);
                        }
                        if (lang_1.isPresent(match[2])) {
                            current.setElement(match[2]);
                        }
                        if (lang_1.isPresent(match[3])) {
                            current.addClassName(match[3]);
                        }
                        if (lang_1.isPresent(match[4])) {
                            current.addAttribute(match[4], match[5]);
                        }
                        if (lang_1.isPresent(match[6])) {
                            inNot = false;
                            current = cssSelector;
                        }
                        if (lang_1.isPresent(match[7])) {
                            if (inNot) {
                                throw new exceptions_1.BaseException('Multiple selectors in :not are not supported');
                            }
                            _addResult(results, cssSelector);
                            cssSelector = current = new CssSelector();
                        }
                    }
                    _addResult(results, cssSelector);
                    return results;
                };
                CssSelector.prototype.isElementSelector = function () {
                    return lang_1.isPresent(this.element) && collection_1.ListWrapper.isEmpty(this.classNames) &&
                        collection_1.ListWrapper.isEmpty(this.attrs) && this.notSelectors.length === 0;
                };
                CssSelector.prototype.setElement = function (element) {
                    if (element === void 0) { element = null; }
                    this.element = element;
                };
                /** Gets a template string for an element that matches the selector. */
                CssSelector.prototype.getMatchingElementTemplate = function () {
                    var tagName = lang_1.isPresent(this.element) ? this.element : 'div';
                    var classAttr = this.classNames.length > 0 ? " class=\"" + this.classNames.join(' ') + "\"" : '';
                    var attrs = '';
                    for (var i = 0; i < this.attrs.length; i += 2) {
                        var attrName = this.attrs[i];
                        var attrValue = this.attrs[i + 1] !== '' ? "=\"" + this.attrs[i + 1] + "\"" : '';
                        attrs += " " + attrName + attrValue;
                    }
                    return "<" + tagName + classAttr + attrs + "></" + tagName + ">";
                };
                CssSelector.prototype.addAttribute = function (name, value) {
                    if (value === void 0) { value = _EMPTY_ATTR_VALUE; }
                    this.attrs.push(name);
                    if (lang_1.isPresent(value)) {
                        value = value.toLowerCase();
                    }
                    else {
                        value = _EMPTY_ATTR_VALUE;
                    }
                    this.attrs.push(value);
                };
                CssSelector.prototype.addClassName = function (name) { this.classNames.push(name.toLowerCase()); };
                CssSelector.prototype.toString = function () {
                    var res = '';
                    if (lang_1.isPresent(this.element)) {
                        res += this.element;
                    }
                    if (lang_1.isPresent(this.classNames)) {
                        for (var i = 0; i < this.classNames.length; i++) {
                            res += '.' + this.classNames[i];
                        }
                    }
                    if (lang_1.isPresent(this.attrs)) {
                        for (var i = 0; i < this.attrs.length;) {
                            var attrName = this.attrs[i++];
                            var attrValue = this.attrs[i++];
                            res += '[' + attrName;
                            if (attrValue.length > 0) {
                                res += '=' + attrValue;
                            }
                            res += ']';
                        }
                    }
                    this.notSelectors.forEach(function (notSelector) { return res += ":not(" + notSelector + ")"; });
                    return res;
                };
                return CssSelector;
            }());
            exports_1("CssSelector", CssSelector);
            /**
             * Reads a list of CssSelectors and allows to calculate which ones
             * are contained in a given CssSelector.
             */
            SelectorMatcher = (function () {
                function SelectorMatcher() {
                    this._elementMap = new collection_1.Map();
                    this._elementPartialMap = new collection_1.Map();
                    this._classMap = new collection_1.Map();
                    this._classPartialMap = new collection_1.Map();
                    this._attrValueMap = new collection_1.Map();
                    this._attrValuePartialMap = new collection_1.Map();
                    this._listContexts = [];
                }
                SelectorMatcher.createNotMatcher = function (notSelectors) {
                    var notMatcher = new SelectorMatcher();
                    notMatcher.addSelectables(notSelectors, null);
                    return notMatcher;
                };
                SelectorMatcher.prototype.addSelectables = function (cssSelectors, callbackCtxt) {
                    var listContext = null;
                    if (cssSelectors.length > 1) {
                        listContext = new SelectorListContext(cssSelectors);
                        this._listContexts.push(listContext);
                    }
                    for (var i = 0; i < cssSelectors.length; i++) {
                        this._addSelectable(cssSelectors[i], callbackCtxt, listContext);
                    }
                };
                /**
                 * Add an object that can be found later on by calling `match`.
                 * @param cssSelector A css selector
                 * @param callbackCtxt An opaque object that will be given to the callback of the `match` function
                 */
                SelectorMatcher.prototype._addSelectable = function (cssSelector, callbackCtxt, listContext) {
                    var matcher = this;
                    var element = cssSelector.element;
                    var classNames = cssSelector.classNames;
                    var attrs = cssSelector.attrs;
                    var selectable = new SelectorContext(cssSelector, callbackCtxt, listContext);
                    if (lang_1.isPresent(element)) {
                        var isTerminal = attrs.length === 0 && classNames.length === 0;
                        if (isTerminal) {
                            this._addTerminal(matcher._elementMap, element, selectable);
                        }
                        else {
                            matcher = this._addPartial(matcher._elementPartialMap, element);
                        }
                    }
                    if (lang_1.isPresent(classNames)) {
                        for (var index = 0; index < classNames.length; index++) {
                            var isTerminal = attrs.length === 0 && index === classNames.length - 1;
                            var className = classNames[index];
                            if (isTerminal) {
                                this._addTerminal(matcher._classMap, className, selectable);
                            }
                            else {
                                matcher = this._addPartial(matcher._classPartialMap, className);
                            }
                        }
                    }
                    if (lang_1.isPresent(attrs)) {
                        for (var index = 0; index < attrs.length;) {
                            var isTerminal = index === attrs.length - 2;
                            var attrName = attrs[index++];
                            var attrValue = attrs[index++];
                            if (isTerminal) {
                                var terminalMap = matcher._attrValueMap;
                                var terminalValuesMap = terminalMap.get(attrName);
                                if (lang_1.isBlank(terminalValuesMap)) {
                                    terminalValuesMap = new collection_1.Map();
                                    terminalMap.set(attrName, terminalValuesMap);
                                }
                                this._addTerminal(terminalValuesMap, attrValue, selectable);
                            }
                            else {
                                var parttialMap = matcher._attrValuePartialMap;
                                var partialValuesMap = parttialMap.get(attrName);
                                if (lang_1.isBlank(partialValuesMap)) {
                                    partialValuesMap = new collection_1.Map();
                                    parttialMap.set(attrName, partialValuesMap);
                                }
                                matcher = this._addPartial(partialValuesMap, attrValue);
                            }
                        }
                    }
                };
                SelectorMatcher.prototype._addTerminal = function (map, name, selectable) {
                    var terminalList = map.get(name);
                    if (lang_1.isBlank(terminalList)) {
                        terminalList = [];
                        map.set(name, terminalList);
                    }
                    terminalList.push(selectable);
                };
                SelectorMatcher.prototype._addPartial = function (map, name) {
                    var matcher = map.get(name);
                    if (lang_1.isBlank(matcher)) {
                        matcher = new SelectorMatcher();
                        map.set(name, matcher);
                    }
                    return matcher;
                };
                /**
                 * Find the objects that have been added via `addSelectable`
                 * whose css selector is contained in the given css selector.
                 * @param cssSelector A css selector
                 * @param matchedCallback This callback will be called with the object handed into `addSelectable`
                 * @return boolean true if a match was found
                */
                SelectorMatcher.prototype.match = function (cssSelector, matchedCallback) {
                    var result = false;
                    var element = cssSelector.element;
                    var classNames = cssSelector.classNames;
                    var attrs = cssSelector.attrs;
                    for (var i = 0; i < this._listContexts.length; i++) {
                        this._listContexts[i].alreadyMatched = false;
                    }
                    result = this._matchTerminal(this._elementMap, element, cssSelector, matchedCallback) || result;
                    result = this._matchPartial(this._elementPartialMap, element, cssSelector, matchedCallback) ||
                        result;
                    if (lang_1.isPresent(classNames)) {
                        for (var index = 0; index < classNames.length; index++) {
                            var className = classNames[index];
                            result =
                                this._matchTerminal(this._classMap, className, cssSelector, matchedCallback) || result;
                            result =
                                this._matchPartial(this._classPartialMap, className, cssSelector, matchedCallback) ||
                                    result;
                        }
                    }
                    if (lang_1.isPresent(attrs)) {
                        for (var index = 0; index < attrs.length;) {
                            var attrName = attrs[index++];
                            var attrValue = attrs[index++];
                            var terminalValuesMap = this._attrValueMap.get(attrName);
                            if (!lang_1.StringWrapper.equals(attrValue, _EMPTY_ATTR_VALUE)) {
                                result = this._matchTerminal(terminalValuesMap, _EMPTY_ATTR_VALUE, cssSelector, matchedCallback) ||
                                    result;
                            }
                            result = this._matchTerminal(terminalValuesMap, attrValue, cssSelector, matchedCallback) ||
                                result;
                            var partialValuesMap = this._attrValuePartialMap.get(attrName);
                            if (!lang_1.StringWrapper.equals(attrValue, _EMPTY_ATTR_VALUE)) {
                                result = this._matchPartial(partialValuesMap, _EMPTY_ATTR_VALUE, cssSelector, matchedCallback) ||
                                    result;
                            }
                            result =
                                this._matchPartial(partialValuesMap, attrValue, cssSelector, matchedCallback) || result;
                        }
                    }
                    return result;
                };
                /** @internal */
                SelectorMatcher.prototype._matchTerminal = function (map, name, cssSelector, matchedCallback) {
                    if (lang_1.isBlank(map) || lang_1.isBlank(name)) {
                        return false;
                    }
                    var selectables = map.get(name);
                    var starSelectables = map.get("*");
                    if (lang_1.isPresent(starSelectables)) {
                        selectables = selectables.concat(starSelectables);
                    }
                    if (lang_1.isBlank(selectables)) {
                        return false;
                    }
                    var selectable;
                    var result = false;
                    for (var index = 0; index < selectables.length; index++) {
                        selectable = selectables[index];
                        result = selectable.finalize(cssSelector, matchedCallback) || result;
                    }
                    return result;
                };
                /** @internal */
                SelectorMatcher.prototype._matchPartial = function (map, name, cssSelector, matchedCallback /*: (c: CssSelector, a: any) => void*/) {
                    if (lang_1.isBlank(map) || lang_1.isBlank(name)) {
                        return false;
                    }
                    var nestedSelector = map.get(name);
                    if (lang_1.isBlank(nestedSelector)) {
                        return false;
                    }
                    // TODO(perf): get rid of recursion and measure again
                    // TODO(perf): don't pass the whole selector into the recursion,
                    // but only the not processed parts
                    return nestedSelector.match(cssSelector, matchedCallback);
                };
                return SelectorMatcher;
            }());
            exports_1("SelectorMatcher", SelectorMatcher);
            SelectorListContext = (function () {
                function SelectorListContext(selectors) {
                    this.selectors = selectors;
                    this.alreadyMatched = false;
                }
                return SelectorListContext;
            }());
            exports_1("SelectorListContext", SelectorListContext);
            // Store context to pass back selector and context when a selector is matched
            SelectorContext = (function () {
                function SelectorContext(selector, cbContext, listContext) {
                    this.selector = selector;
                    this.cbContext = cbContext;
                    this.listContext = listContext;
                    this.notSelectors = selector.notSelectors;
                }
                SelectorContext.prototype.finalize = function (cssSelector, callback) {
                    var result = true;
                    if (this.notSelectors.length > 0 &&
                        (lang_1.isBlank(this.listContext) || !this.listContext.alreadyMatched)) {
                        var notMatcher = SelectorMatcher.createNotMatcher(this.notSelectors);
                        result = !notMatcher.match(cssSelector, null);
                    }
                    if (result && lang_1.isPresent(callback) &&
                        (lang_1.isBlank(this.listContext) || !this.listContext.alreadyMatched)) {
                        if (lang_1.isPresent(this.listContext)) {
                            this.listContext.alreadyMatched = true;
                        }
                        callback(this.selector, this.cbContext);
                    }
                    return result;
                };
                return SelectorContext;
            }());
            exports_1("SelectorContext", SelectorContext);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9zZWxlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBVU0saUJBQWlCLEVBSW5CLGdCQUFnQjs7Ozs7Ozs7Ozs7OztZQUpkLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztZQUU3QixrQ0FBa0M7WUFDbEMscURBQXFEO1lBQ2pELGdCQUFnQixHQUFHLG9CQUFhLENBQUMsTUFBTSxDQUN2QyxjQUFjO2dCQUNkLFlBQVk7Z0JBQ1osbUJBQW1CO2dCQUNuQixzQ0FBc0M7Z0JBQ3RDLFFBQVE7Z0JBQ1IsYUFBYSxDQUFDLENBQUMsQ0FBMkIsTUFBTTtZQUVwRDs7OztlQUlHO1lBQ0g7Z0JBQUE7b0JBQ0UsWUFBTyxHQUFXLElBQUksQ0FBQztvQkFDdkIsZUFBVSxHQUFhLEVBQUUsQ0FBQztvQkFDMUIsVUFBSyxHQUFhLEVBQUUsQ0FBQztvQkFDckIsaUJBQVksR0FBa0IsRUFBRSxDQUFDO2dCQTRHbkMsQ0FBQztnQkExR1EsaUJBQUssR0FBWixVQUFhLFFBQWdCO29CQUMzQixJQUFJLE9BQU8sR0FBa0IsRUFBRSxDQUFDO29CQUNoQyxJQUFJLFVBQVUsR0FBRyxVQUFDLEdBQWtCLEVBQUUsTUFBTTt3QkFDMUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLGNBQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDOzRCQUN6RCx3QkFBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksd0JBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDaEYsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7d0JBQ3ZCLENBQUM7d0JBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDbkIsQ0FBQyxDQUFDO29CQUNGLElBQUksV0FBVyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7b0JBQ3BDLElBQUksT0FBTyxHQUFHLG9CQUFhLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUNoRSxJQUFJLEtBQUssQ0FBQztvQkFDVixJQUFJLE9BQU8sR0FBRyxXQUFXLENBQUM7b0JBQzFCLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDbEIsT0FBTyxnQkFBUyxDQUFDLEtBQUssR0FBRywyQkFBb0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDO3dCQUM3RCxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDeEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQ0FDVixNQUFNLElBQUksMEJBQWEsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDOzRCQUN2RSxDQUFDOzRCQUNELEtBQUssR0FBRyxJQUFJLENBQUM7NEJBQ2IsT0FBTyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7NEJBQzVCLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUN6QyxDQUFDO3dCQUNELEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN4QixPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMvQixDQUFDO3dCQUNELEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN4QixPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNqQyxDQUFDO3dCQUNELEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN4QixPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDM0MsQ0FBQzt3QkFDRCxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDeEIsS0FBSyxHQUFHLEtBQUssQ0FBQzs0QkFDZCxPQUFPLEdBQUcsV0FBVyxDQUFDO3dCQUN4QixDQUFDO3dCQUNELEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN4QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dDQUNWLE1BQU0sSUFBSSwwQkFBYSxDQUFDLDhDQUE4QyxDQUFDLENBQUM7NEJBQzFFLENBQUM7NEJBQ0QsVUFBVSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQzs0QkFDakMsV0FBVyxHQUFHLE9BQU8sR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO3dCQUM1QyxDQUFDO29CQUNILENBQUM7b0JBQ0QsVUFBVSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztvQkFDakMsTUFBTSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsQ0FBQztnQkFFRCx1Q0FBaUIsR0FBakI7b0JBQ0UsTUFBTSxDQUFDLGdCQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLHdCQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7d0JBQy9ELHdCQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7Z0JBQzNFLENBQUM7Z0JBRUQsZ0NBQVUsR0FBVixVQUFXLE9BQXNCO29CQUF0Qix1QkFBc0IsR0FBdEIsY0FBc0I7b0JBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Z0JBQUMsQ0FBQztnQkFFOUQsdUVBQXVFO2dCQUN2RSxnREFBMEIsR0FBMUI7b0JBQ0UsSUFBSSxPQUFPLEdBQUcsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7b0JBQzdELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxjQUFXLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFHLEdBQUcsRUFBRSxDQUFDO29CQUUxRixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7b0JBQ2YsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7d0JBQzlDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzdCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxRQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFHLEdBQUcsRUFBRSxDQUFDO3dCQUMxRSxLQUFLLElBQUksTUFBSSxRQUFRLEdBQUcsU0FBVyxDQUFDO29CQUN0QyxDQUFDO29CQUVELE1BQU0sQ0FBQyxNQUFJLE9BQU8sR0FBRyxTQUFTLEdBQUcsS0FBSyxXQUFNLE9BQU8sTUFBRyxDQUFDO2dCQUN6RCxDQUFDO2dCQUVELGtDQUFZLEdBQVosVUFBYSxJQUFZLEVBQUUsS0FBaUM7b0JBQWpDLHFCQUFpQyxHQUFqQyx5QkFBaUM7b0JBQzFELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN0QixFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDckIsS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDOUIsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixLQUFLLEdBQUcsaUJBQWlCLENBQUM7b0JBQzVCLENBQUM7b0JBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pCLENBQUM7Z0JBRUQsa0NBQVksR0FBWixVQUFhLElBQVksSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXhFLDhCQUFRLEdBQVI7b0JBQ0UsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO29CQUNiLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDNUIsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ3RCLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMvQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7NEJBQ2hELEdBQUcsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbEMsQ0FBQztvQkFDSCxDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDOzRCQUN2QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7NEJBQy9CLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFDaEMsR0FBRyxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUM7NEJBQ3RCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDekIsR0FBRyxJQUFJLEdBQUcsR0FBRyxTQUFTLENBQUM7NEJBQ3pCLENBQUM7NEJBQ0QsR0FBRyxJQUFJLEdBQUcsQ0FBQzt3QkFDYixDQUFDO29CQUNILENBQUM7b0JBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBQSxXQUFXLElBQUksT0FBQSxHQUFHLElBQUksVUFBUSxXQUFXLE1BQUcsRUFBN0IsQ0FBNkIsQ0FBQyxDQUFDO29CQUN4RSxNQUFNLENBQUMsR0FBRyxDQUFDO2dCQUNiLENBQUM7Z0JBQ0gsa0JBQUM7WUFBRCxDQWhIQSxBQWdIQyxJQUFBO1lBaEhELHFDQWdIQyxDQUFBO1lBRUQ7OztlQUdHO1lBQ0g7Z0JBQUE7b0JBT1UsZ0JBQVcsR0FBRyxJQUFJLGdCQUFHLEVBQTZCLENBQUM7b0JBQ25ELHVCQUFrQixHQUFHLElBQUksZ0JBQUcsRUFBMkIsQ0FBQztvQkFDeEQsY0FBUyxHQUFHLElBQUksZ0JBQUcsRUFBNkIsQ0FBQztvQkFDakQscUJBQWdCLEdBQUcsSUFBSSxnQkFBRyxFQUEyQixDQUFDO29CQUN0RCxrQkFBYSxHQUFHLElBQUksZ0JBQUcsRUFBMEMsQ0FBQztvQkFDbEUseUJBQW9CLEdBQUcsSUFBSSxnQkFBRyxFQUF3QyxDQUFDO29CQUN2RSxrQkFBYSxHQUEwQixFQUFFLENBQUM7Z0JBOExwRCxDQUFDO2dCQTFNUSxnQ0FBZ0IsR0FBdkIsVUFBd0IsWUFBMkI7b0JBQ2pELElBQUksVUFBVSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7b0JBQ3ZDLFVBQVUsQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUM5QyxNQUFNLENBQUMsVUFBVSxDQUFDO2dCQUNwQixDQUFDO2dCQVVELHdDQUFjLEdBQWQsVUFBZSxZQUEyQixFQUFFLFlBQWtCO29CQUM1RCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUM7b0JBQ3ZCLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDNUIsV0FBVyxHQUFHLElBQUksbUJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUM7d0JBQ3BELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUN2QyxDQUFDO29CQUNELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUM3QyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUM7b0JBQ2xFLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRDs7OzttQkFJRztnQkFDSyx3Q0FBYyxHQUF0QixVQUF1QixXQUF3QixFQUFFLFlBQWlCLEVBQzNDLFdBQWdDO29CQUNyRCxJQUFJLE9BQU8sR0FBb0IsSUFBSSxDQUFDO29CQUNwQyxJQUFJLE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDO29CQUNsQyxJQUFJLFVBQVUsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDO29CQUN4QyxJQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDO29CQUM5QixJQUFJLFVBQVUsR0FBRyxJQUFJLGVBQWUsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLFdBQVcsQ0FBQyxDQUFDO29CQUU3RSxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdkIsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7d0JBQy9ELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7NEJBQ2YsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQzt3QkFDOUQsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDTixPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLENBQUM7d0JBQ2xFLENBQUM7b0JBQ0gsQ0FBQztvQkFFRCxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUIsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7NEJBQ3ZELElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzs0QkFDdkUsSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUNsQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dDQUNmLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7NEJBQzlELENBQUM7NEJBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ04sT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLFNBQVMsQ0FBQyxDQUFDOzRCQUNsRSxDQUFDO3dCQUNILENBQUM7b0JBQ0gsQ0FBQztvQkFFRCxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDckIsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUM7NEJBQzFDLElBQUksVUFBVSxHQUFHLEtBQUssS0FBSyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzs0QkFDNUMsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7NEJBQzlCLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDOzRCQUMvQixFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dDQUNmLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7Z0NBQ3hDLElBQUksaUJBQWlCLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQ0FDbEQsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUMvQixpQkFBaUIsR0FBRyxJQUFJLGdCQUFHLEVBQTZCLENBQUM7b0NBQ3pELFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLGlCQUFpQixDQUFDLENBQUM7Z0NBQy9DLENBQUM7Z0NBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7NEJBQzlELENBQUM7NEJBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ04sSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDO2dDQUMvQyxJQUFJLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Z0NBQ2pELEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQ0FDOUIsZ0JBQWdCLEdBQUcsSUFBSSxnQkFBRyxFQUEyQixDQUFDO29DQUN0RCxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO2dDQUM5QyxDQUFDO2dDQUNELE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLFNBQVMsQ0FBQyxDQUFDOzRCQUMxRCxDQUFDO3dCQUNILENBQUM7b0JBQ0gsQ0FBQztnQkFDSCxDQUFDO2dCQUVPLHNDQUFZLEdBQXBCLFVBQXFCLEdBQW1DLEVBQUUsSUFBWSxFQUNqRCxVQUEyQjtvQkFDOUMsSUFBSSxZQUFZLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDakMsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUIsWUFBWSxHQUFHLEVBQUUsQ0FBQzt3QkFDbEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7b0JBQzlCLENBQUM7b0JBQ0QsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDaEMsQ0FBQztnQkFFTyxxQ0FBVyxHQUFuQixVQUFvQixHQUFpQyxFQUFFLElBQVk7b0JBQ2pFLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzVCLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3JCLE9BQU8sR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO3dCQUNoQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDekIsQ0FBQztvQkFDRCxNQUFNLENBQUMsT0FBTyxDQUFDO2dCQUNqQixDQUFDO2dCQUVEOzs7Ozs7a0JBTUU7Z0JBQ0YsK0JBQUssR0FBTCxVQUFNLFdBQXdCLEVBQUUsZUFBaUQ7b0JBQy9FLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztvQkFDbkIsSUFBSSxPQUFPLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQztvQkFDbEMsSUFBSSxVQUFVLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQztvQkFDeEMsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQztvQkFFOUIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUNuRCxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7b0JBQy9DLENBQUM7b0JBRUQsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLGVBQWUsQ0FBQyxJQUFJLE1BQU0sQ0FBQztvQkFDaEcsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsZUFBZSxDQUFDO3dCQUNsRixNQUFNLENBQUM7b0JBRWhCLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMxQixHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQzs0QkFDdkQsSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUNsQyxNQUFNO2dDQUNGLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLGVBQWUsQ0FBQyxJQUFJLE1BQU0sQ0FBQzs0QkFDM0YsTUFBTTtnQ0FDRixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLGVBQWUsQ0FBQztvQ0FDbEYsTUFBTSxDQUFDO3dCQUNiLENBQUM7b0JBQ0gsQ0FBQztvQkFFRCxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDckIsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUM7NEJBQzFDLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDOzRCQUM5QixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQzs0QkFFL0IsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzs0QkFDekQsRUFBRSxDQUFDLENBQUMsQ0FBQyxvQkFBYSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ3hELE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFDakQsZUFBZSxDQUFDO29DQUNwQyxNQUFNLENBQUM7NEJBQ2xCLENBQUM7NEJBQ0QsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxlQUFlLENBQUM7Z0NBQy9FLE1BQU0sQ0FBQzs0QkFFaEIsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUMvRCxFQUFFLENBQUMsQ0FBQyxDQUFDLG9CQUFhLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDeEQsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUNoRCxlQUFlLENBQUM7b0NBQ25DLE1BQU0sQ0FBQzs0QkFDbEIsQ0FBQzs0QkFDRCxNQUFNO2dDQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxlQUFlLENBQUMsSUFBSSxNQUFNLENBQUM7d0JBQzlGLENBQUM7b0JBQ0gsQ0FBQztvQkFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNoQixDQUFDO2dCQUVELGdCQUFnQjtnQkFDaEIsd0NBQWMsR0FBZCxVQUFlLEdBQW1DLEVBQUUsSUFBSSxFQUFFLFdBQXdCLEVBQ25FLGVBQWlEO29CQUM5RCxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsR0FBRyxDQUFDLElBQUksY0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbEMsTUFBTSxDQUFDLEtBQUssQ0FBQztvQkFDZixDQUFDO29CQUVELElBQUksV0FBVyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2hDLElBQUksZUFBZSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ25DLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMvQixXQUFXLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztvQkFDcEQsQ0FBQztvQkFDRCxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN6QixNQUFNLENBQUMsS0FBSyxDQUFDO29CQUNmLENBQUM7b0JBQ0QsSUFBSSxVQUFVLENBQUM7b0JBQ2YsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO29CQUNuQixHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQzt3QkFDeEQsVUFBVSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDaEMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLGVBQWUsQ0FBQyxJQUFJLE1BQU0sQ0FBQztvQkFDdkUsQ0FBQztvQkFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNoQixDQUFDO2dCQUVELGdCQUFnQjtnQkFDaEIsdUNBQWEsR0FBYixVQUFjLEdBQWlDLEVBQUUsSUFBSSxFQUFFLFdBQXdCLEVBQ2pFLGVBQWUsQ0FBQyxzQ0FBc0M7b0JBQ2xFLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxjQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNsQyxNQUFNLENBQUMsS0FBSyxDQUFDO29CQUNmLENBQUM7b0JBQ0QsSUFBSSxjQUFjLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbkMsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDNUIsTUFBTSxDQUFDLEtBQUssQ0FBQztvQkFDZixDQUFDO29CQUNELHFEQUFxRDtvQkFDckQsZ0VBQWdFO29CQUNoRSxtQ0FBbUM7b0JBQ25DLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQztnQkFDNUQsQ0FBQztnQkFDSCxzQkFBQztZQUFELENBM01BLEFBMk1DLElBQUE7WUEzTUQsNkNBMk1DLENBQUE7WUFHRDtnQkFHRSw2QkFBbUIsU0FBd0I7b0JBQXhCLGNBQVMsR0FBVCxTQUFTLENBQWU7b0JBRjNDLG1CQUFjLEdBQVksS0FBSyxDQUFDO2dCQUVjLENBQUM7Z0JBQ2pELDBCQUFDO1lBQUQsQ0FKQSxBQUlDLElBQUE7WUFKRCxxREFJQyxDQUFBO1lBRUQsNkVBQTZFO1lBQzdFO2dCQUdFLHlCQUFtQixRQUFxQixFQUFTLFNBQWMsRUFDNUMsV0FBZ0M7b0JBRGhDLGFBQVEsR0FBUixRQUFRLENBQWE7b0JBQVMsY0FBUyxHQUFULFNBQVMsQ0FBSztvQkFDNUMsZ0JBQVcsR0FBWCxXQUFXLENBQXFCO29CQUNqRCxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUM7Z0JBQzVDLENBQUM7Z0JBRUQsa0NBQVEsR0FBUixVQUFTLFdBQXdCLEVBQUUsUUFBMEM7b0JBQzNFLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztvQkFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQzt3QkFDNUIsQ0FBQyxjQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BFLElBQUksVUFBVSxHQUFHLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7d0JBQ3JFLE1BQU0sR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNoRCxDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxnQkFBUyxDQUFDLFFBQVEsQ0FBQzt3QkFDN0IsQ0FBQyxjQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BFLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO3dCQUN6QyxDQUFDO3dCQUNELFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDMUMsQ0FBQztvQkFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNoQixDQUFDO2dCQUNILHNCQUFDO1lBQUQsQ0F4QkEsQUF3QkMsSUFBQTtZQXhCRCw2Q0F3QkMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tcGlsZXIvc2VsZWN0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01hcCwgTGlzdFdyYXBwZXIsIE1hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge1xuICBpc1ByZXNlbnQsXG4gIGlzQmxhbmssXG4gIFJlZ0V4cFdyYXBwZXIsXG4gIFJlZ0V4cE1hdGNoZXJXcmFwcGVyLFxuICBTdHJpbmdXcmFwcGVyXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb24sIFdyYXBwZWRFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5cbmNvbnN0IF9FTVBUWV9BVFRSX1ZBTFVFID0gJyc7XG5cbi8vIFRPRE86IENhbid0IHVzZSBgY29uc3RgIGhlcmUgYXNcbi8vIGluIERhcnQgdGhpcyBpcyBub3QgdHJhbnNwaWxlZCBpbnRvIGBmaW5hbGAgeWV0Li4uXG52YXIgX1NFTEVDVE9SX1JFR0VYUCA9IFJlZ0V4cFdyYXBwZXIuY3JlYXRlKFxuICAgICcoXFxcXDpub3RcXFxcKCl8JyArICAgICAgICAgICAgICAgICAgICAgICAgICAvL1wiOm5vdChcIlxuICAgICcoWy1cXFxcd10rKXwnICsgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gXCJ0YWdcIlxuICAgICcoPzpcXFxcLihbLVxcXFx3XSspKXwnICsgICAgICAgICAgICAgICAgICAgICAvLyBcIi5jbGFzc1wiXG4gICAgJyg/OlxcXFxbKFstXFxcXHcqXSspKD86PShbXlxcXFxdXSopKT9cXFxcXSl8JyArICAvLyBcIltuYW1lXVwiLCBcIltuYW1lPXZhbHVlXVwiIG9yIFwiW25hbWUqPXZhbHVlXVwiXG4gICAgJyhcXFxcKSl8JyArICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBcIilcIlxuICAgICcoXFxcXHMqLFxcXFxzKiknKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBcIixcIlxuXG4vKipcbiAqIEEgY3NzIHNlbGVjdG9yIGNvbnRhaW5zIGFuIGVsZW1lbnQgbmFtZSxcbiAqIGNzcyBjbGFzc2VzIGFuZCBhdHRyaWJ1dGUvdmFsdWUgcGFpcnMgd2l0aCB0aGUgcHVycG9zZVxuICogb2Ygc2VsZWN0aW5nIHN1YnNldHMgb3V0IG9mIHRoZW0uXG4gKi9cbmV4cG9ydCBjbGFzcyBDc3NTZWxlY3RvciB7XG4gIGVsZW1lbnQ6IHN0cmluZyA9IG51bGw7XG4gIGNsYXNzTmFtZXM6IHN0cmluZ1tdID0gW107XG4gIGF0dHJzOiBzdHJpbmdbXSA9IFtdO1xuICBub3RTZWxlY3RvcnM6IENzc1NlbGVjdG9yW10gPSBbXTtcblxuICBzdGF0aWMgcGFyc2Uoc2VsZWN0b3I6IHN0cmluZyk6IENzc1NlbGVjdG9yW10ge1xuICAgIHZhciByZXN1bHRzOiBDc3NTZWxlY3RvcltdID0gW107XG4gICAgdmFyIF9hZGRSZXN1bHQgPSAocmVzOiBDc3NTZWxlY3RvcltdLCBjc3NTZWwpID0+IHtcbiAgICAgIGlmIChjc3NTZWwubm90U2VsZWN0b3JzLmxlbmd0aCA+IDAgJiYgaXNCbGFuayhjc3NTZWwuZWxlbWVudCkgJiZcbiAgICAgICAgICBMaXN0V3JhcHBlci5pc0VtcHR5KGNzc1NlbC5jbGFzc05hbWVzKSAmJiBMaXN0V3JhcHBlci5pc0VtcHR5KGNzc1NlbC5hdHRycykpIHtcbiAgICAgICAgY3NzU2VsLmVsZW1lbnQgPSBcIipcIjtcbiAgICAgIH1cbiAgICAgIHJlcy5wdXNoKGNzc1NlbCk7XG4gICAgfTtcbiAgICB2YXIgY3NzU2VsZWN0b3IgPSBuZXcgQ3NzU2VsZWN0b3IoKTtcbiAgICB2YXIgbWF0Y2hlciA9IFJlZ0V4cFdyYXBwZXIubWF0Y2hlcihfU0VMRUNUT1JfUkVHRVhQLCBzZWxlY3Rvcik7XG4gICAgdmFyIG1hdGNoO1xuICAgIHZhciBjdXJyZW50ID0gY3NzU2VsZWN0b3I7XG4gICAgdmFyIGluTm90ID0gZmFsc2U7XG4gICAgd2hpbGUgKGlzUHJlc2VudChtYXRjaCA9IFJlZ0V4cE1hdGNoZXJXcmFwcGVyLm5leHQobWF0Y2hlcikpKSB7XG4gICAgICBpZiAoaXNQcmVzZW50KG1hdGNoWzFdKSkge1xuICAgICAgICBpZiAoaW5Ob3QpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbignTmVzdGluZyA6bm90IGlzIG5vdCBhbGxvd2VkIGluIGEgc2VsZWN0b3InKTtcbiAgICAgICAgfVxuICAgICAgICBpbk5vdCA9IHRydWU7XG4gICAgICAgIGN1cnJlbnQgPSBuZXcgQ3NzU2VsZWN0b3IoKTtcbiAgICAgICAgY3NzU2VsZWN0b3Iubm90U2VsZWN0b3JzLnB1c2goY3VycmVudCk7XG4gICAgICB9XG4gICAgICBpZiAoaXNQcmVzZW50KG1hdGNoWzJdKSkge1xuICAgICAgICBjdXJyZW50LnNldEVsZW1lbnQobWF0Y2hbMl0pO1xuICAgICAgfVxuICAgICAgaWYgKGlzUHJlc2VudChtYXRjaFszXSkpIHtcbiAgICAgICAgY3VycmVudC5hZGRDbGFzc05hbWUobWF0Y2hbM10pO1xuICAgICAgfVxuICAgICAgaWYgKGlzUHJlc2VudChtYXRjaFs0XSkpIHtcbiAgICAgICAgY3VycmVudC5hZGRBdHRyaWJ1dGUobWF0Y2hbNF0sIG1hdGNoWzVdKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc1ByZXNlbnQobWF0Y2hbNl0pKSB7XG4gICAgICAgIGluTm90ID0gZmFsc2U7XG4gICAgICAgIGN1cnJlbnQgPSBjc3NTZWxlY3RvcjtcbiAgICAgIH1cbiAgICAgIGlmIChpc1ByZXNlbnQobWF0Y2hbN10pKSB7XG4gICAgICAgIGlmIChpbk5vdCkge1xuICAgICAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKCdNdWx0aXBsZSBzZWxlY3RvcnMgaW4gOm5vdCBhcmUgbm90IHN1cHBvcnRlZCcpO1xuICAgICAgICB9XG4gICAgICAgIF9hZGRSZXN1bHQocmVzdWx0cywgY3NzU2VsZWN0b3IpO1xuICAgICAgICBjc3NTZWxlY3RvciA9IGN1cnJlbnQgPSBuZXcgQ3NzU2VsZWN0b3IoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgX2FkZFJlc3VsdChyZXN1bHRzLCBjc3NTZWxlY3Rvcik7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cblxuICBpc0VsZW1lbnRTZWxlY3RvcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuZWxlbWVudCkgJiYgTGlzdFdyYXBwZXIuaXNFbXB0eSh0aGlzLmNsYXNzTmFtZXMpICYmXG4gICAgICAgICAgIExpc3RXcmFwcGVyLmlzRW1wdHkodGhpcy5hdHRycykgJiYgdGhpcy5ub3RTZWxlY3RvcnMubGVuZ3RoID09PSAwO1xuICB9XG5cbiAgc2V0RWxlbWVudChlbGVtZW50OiBzdHJpbmcgPSBudWxsKSB7IHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7IH1cblxuICAvKiogR2V0cyBhIHRlbXBsYXRlIHN0cmluZyBmb3IgYW4gZWxlbWVudCB0aGF0IG1hdGNoZXMgdGhlIHNlbGVjdG9yLiAqL1xuICBnZXRNYXRjaGluZ0VsZW1lbnRUZW1wbGF0ZSgpOiBzdHJpbmcge1xuICAgIGxldCB0YWdOYW1lID0gaXNQcmVzZW50KHRoaXMuZWxlbWVudCkgPyB0aGlzLmVsZW1lbnQgOiAnZGl2JztcbiAgICBsZXQgY2xhc3NBdHRyID0gdGhpcy5jbGFzc05hbWVzLmxlbmd0aCA+IDAgPyBgIGNsYXNzPVwiJHt0aGlzLmNsYXNzTmFtZXMuam9pbignICcpfVwiYCA6ICcnO1xuXG4gICAgbGV0IGF0dHJzID0gJyc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmF0dHJzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICBsZXQgYXR0ck5hbWUgPSB0aGlzLmF0dHJzW2ldO1xuICAgICAgbGV0IGF0dHJWYWx1ZSA9IHRoaXMuYXR0cnNbaSArIDFdICE9PSAnJyA/IGA9XCIke3RoaXMuYXR0cnNbaSArIDFdfVwiYCA6ICcnO1xuICAgICAgYXR0cnMgKz0gYCAke2F0dHJOYW1lfSR7YXR0clZhbHVlfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGA8JHt0YWdOYW1lfSR7Y2xhc3NBdHRyfSR7YXR0cnN9PjwvJHt0YWdOYW1lfT5gO1xuICB9XG5cbiAgYWRkQXR0cmlidXRlKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyA9IF9FTVBUWV9BVFRSX1ZBTFVFKSB7XG4gICAgdGhpcy5hdHRycy5wdXNoKG5hbWUpO1xuICAgIGlmIChpc1ByZXNlbnQodmFsdWUpKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlID0gX0VNUFRZX0FUVFJfVkFMVUU7XG4gICAgfVxuICAgIHRoaXMuYXR0cnMucHVzaCh2YWx1ZSk7XG4gIH1cblxuICBhZGRDbGFzc05hbWUobmFtZTogc3RyaW5nKSB7IHRoaXMuY2xhc3NOYW1lcy5wdXNoKG5hbWUudG9Mb3dlckNhc2UoKSk7IH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHZhciByZXMgPSAnJztcbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuZWxlbWVudCkpIHtcbiAgICAgIHJlcyArPSB0aGlzLmVsZW1lbnQ7XG4gICAgfVxuICAgIGlmIChpc1ByZXNlbnQodGhpcy5jbGFzc05hbWVzKSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNsYXNzTmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzICs9ICcuJyArIHRoaXMuY2xhc3NOYW1lc1tpXTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLmF0dHJzKSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmF0dHJzLmxlbmd0aDspIHtcbiAgICAgICAgdmFyIGF0dHJOYW1lID0gdGhpcy5hdHRyc1tpKytdO1xuICAgICAgICB2YXIgYXR0clZhbHVlID0gdGhpcy5hdHRyc1tpKytdO1xuICAgICAgICByZXMgKz0gJ1snICsgYXR0ck5hbWU7XG4gICAgICAgIGlmIChhdHRyVmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJlcyArPSAnPScgKyBhdHRyVmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmVzICs9ICddJztcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5ub3RTZWxlY3RvcnMuZm9yRWFjaChub3RTZWxlY3RvciA9PiByZXMgKz0gYDpub3QoJHtub3RTZWxlY3Rvcn0pYCk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxufVxuXG4vKipcbiAqIFJlYWRzIGEgbGlzdCBvZiBDc3NTZWxlY3RvcnMgYW5kIGFsbG93cyB0byBjYWxjdWxhdGUgd2hpY2ggb25lc1xuICogYXJlIGNvbnRhaW5lZCBpbiBhIGdpdmVuIENzc1NlbGVjdG9yLlxuICovXG5leHBvcnQgY2xhc3MgU2VsZWN0b3JNYXRjaGVyIHtcbiAgc3RhdGljIGNyZWF0ZU5vdE1hdGNoZXIobm90U2VsZWN0b3JzOiBDc3NTZWxlY3RvcltdKTogU2VsZWN0b3JNYXRjaGVyIHtcbiAgICB2YXIgbm90TWF0Y2hlciA9IG5ldyBTZWxlY3Rvck1hdGNoZXIoKTtcbiAgICBub3RNYXRjaGVyLmFkZFNlbGVjdGFibGVzKG5vdFNlbGVjdG9ycywgbnVsbCk7XG4gICAgcmV0dXJuIG5vdE1hdGNoZXI7XG4gIH1cblxuICBwcml2YXRlIF9lbGVtZW50TWFwID0gbmV3IE1hcDxzdHJpbmcsIFNlbGVjdG9yQ29udGV4dFtdPigpO1xuICBwcml2YXRlIF9lbGVtZW50UGFydGlhbE1hcCA9IG5ldyBNYXA8c3RyaW5nLCBTZWxlY3Rvck1hdGNoZXI+KCk7XG4gIHByaXZhdGUgX2NsYXNzTWFwID0gbmV3IE1hcDxzdHJpbmcsIFNlbGVjdG9yQ29udGV4dFtdPigpO1xuICBwcml2YXRlIF9jbGFzc1BhcnRpYWxNYXAgPSBuZXcgTWFwPHN0cmluZywgU2VsZWN0b3JNYXRjaGVyPigpO1xuICBwcml2YXRlIF9hdHRyVmFsdWVNYXAgPSBuZXcgTWFwPHN0cmluZywgTWFwPHN0cmluZywgU2VsZWN0b3JDb250ZXh0W10+PigpO1xuICBwcml2YXRlIF9hdHRyVmFsdWVQYXJ0aWFsTWFwID0gbmV3IE1hcDxzdHJpbmcsIE1hcDxzdHJpbmcsIFNlbGVjdG9yTWF0Y2hlcj4+KCk7XG4gIHByaXZhdGUgX2xpc3RDb250ZXh0czogU2VsZWN0b3JMaXN0Q29udGV4dFtdID0gW107XG5cbiAgYWRkU2VsZWN0YWJsZXMoY3NzU2VsZWN0b3JzOiBDc3NTZWxlY3RvcltdLCBjYWxsYmFja0N0eHQ/OiBhbnkpIHtcbiAgICB2YXIgbGlzdENvbnRleHQgPSBudWxsO1xuICAgIGlmIChjc3NTZWxlY3RvcnMubGVuZ3RoID4gMSkge1xuICAgICAgbGlzdENvbnRleHQgPSBuZXcgU2VsZWN0b3JMaXN0Q29udGV4dChjc3NTZWxlY3RvcnMpO1xuICAgICAgdGhpcy5fbGlzdENvbnRleHRzLnB1c2gobGlzdENvbnRleHQpO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNzc1NlbGVjdG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5fYWRkU2VsZWN0YWJsZShjc3NTZWxlY3RvcnNbaV0sIGNhbGxiYWNrQ3R4dCwgbGlzdENvbnRleHQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIGZvdW5kIGxhdGVyIG9uIGJ5IGNhbGxpbmcgYG1hdGNoYC5cbiAgICogQHBhcmFtIGNzc1NlbGVjdG9yIEEgY3NzIHNlbGVjdG9yXG4gICAqIEBwYXJhbSBjYWxsYmFja0N0eHQgQW4gb3BhcXVlIG9iamVjdCB0aGF0IHdpbGwgYmUgZ2l2ZW4gdG8gdGhlIGNhbGxiYWNrIG9mIHRoZSBgbWF0Y2hgIGZ1bmN0aW9uXG4gICAqL1xuICBwcml2YXRlIF9hZGRTZWxlY3RhYmxlKGNzc1NlbGVjdG9yOiBDc3NTZWxlY3RvciwgY2FsbGJhY2tDdHh0OiBhbnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgbGlzdENvbnRleHQ6IFNlbGVjdG9yTGlzdENvbnRleHQpIHtcbiAgICB2YXIgbWF0Y2hlcjogU2VsZWN0b3JNYXRjaGVyID0gdGhpcztcbiAgICB2YXIgZWxlbWVudCA9IGNzc1NlbGVjdG9yLmVsZW1lbnQ7XG4gICAgdmFyIGNsYXNzTmFtZXMgPSBjc3NTZWxlY3Rvci5jbGFzc05hbWVzO1xuICAgIHZhciBhdHRycyA9IGNzc1NlbGVjdG9yLmF0dHJzO1xuICAgIHZhciBzZWxlY3RhYmxlID0gbmV3IFNlbGVjdG9yQ29udGV4dChjc3NTZWxlY3RvciwgY2FsbGJhY2tDdHh0LCBsaXN0Q29udGV4dCk7XG5cbiAgICBpZiAoaXNQcmVzZW50KGVsZW1lbnQpKSB7XG4gICAgICB2YXIgaXNUZXJtaW5hbCA9IGF0dHJzLmxlbmd0aCA9PT0gMCAmJiBjbGFzc05hbWVzLmxlbmd0aCA9PT0gMDtcbiAgICAgIGlmIChpc1Rlcm1pbmFsKSB7XG4gICAgICAgIHRoaXMuX2FkZFRlcm1pbmFsKG1hdGNoZXIuX2VsZW1lbnRNYXAsIGVsZW1lbnQsIHNlbGVjdGFibGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWF0Y2hlciA9IHRoaXMuX2FkZFBhcnRpYWwobWF0Y2hlci5fZWxlbWVudFBhcnRpYWxNYXAsIGVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc1ByZXNlbnQoY2xhc3NOYW1lcykpIHtcbiAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBjbGFzc05hbWVzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICB2YXIgaXNUZXJtaW5hbCA9IGF0dHJzLmxlbmd0aCA9PT0gMCAmJiBpbmRleCA9PT0gY2xhc3NOYW1lcy5sZW5ndGggLSAxO1xuICAgICAgICB2YXIgY2xhc3NOYW1lID0gY2xhc3NOYW1lc1tpbmRleF07XG4gICAgICAgIGlmIChpc1Rlcm1pbmFsKSB7XG4gICAgICAgICAgdGhpcy5fYWRkVGVybWluYWwobWF0Y2hlci5fY2xhc3NNYXAsIGNsYXNzTmFtZSwgc2VsZWN0YWJsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWF0Y2hlciA9IHRoaXMuX2FkZFBhcnRpYWwobWF0Y2hlci5fY2xhc3NQYXJ0aWFsTWFwLCBjbGFzc05hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzUHJlc2VudChhdHRycykpIHtcbiAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBhdHRycy5sZW5ndGg7KSB7XG4gICAgICAgIHZhciBpc1Rlcm1pbmFsID0gaW5kZXggPT09IGF0dHJzLmxlbmd0aCAtIDI7XG4gICAgICAgIHZhciBhdHRyTmFtZSA9IGF0dHJzW2luZGV4KytdO1xuICAgICAgICB2YXIgYXR0clZhbHVlID0gYXR0cnNbaW5kZXgrK107XG4gICAgICAgIGlmIChpc1Rlcm1pbmFsKSB7XG4gICAgICAgICAgdmFyIHRlcm1pbmFsTWFwID0gbWF0Y2hlci5fYXR0clZhbHVlTWFwO1xuICAgICAgICAgIHZhciB0ZXJtaW5hbFZhbHVlc01hcCA9IHRlcm1pbmFsTWFwLmdldChhdHRyTmFtZSk7XG4gICAgICAgICAgaWYgKGlzQmxhbmsodGVybWluYWxWYWx1ZXNNYXApKSB7XG4gICAgICAgICAgICB0ZXJtaW5hbFZhbHVlc01hcCA9IG5ldyBNYXA8c3RyaW5nLCBTZWxlY3RvckNvbnRleHRbXT4oKTtcbiAgICAgICAgICAgIHRlcm1pbmFsTWFwLnNldChhdHRyTmFtZSwgdGVybWluYWxWYWx1ZXNNYXApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9hZGRUZXJtaW5hbCh0ZXJtaW5hbFZhbHVlc01hcCwgYXR0clZhbHVlLCBzZWxlY3RhYmxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgcGFydHRpYWxNYXAgPSBtYXRjaGVyLl9hdHRyVmFsdWVQYXJ0aWFsTWFwO1xuICAgICAgICAgIHZhciBwYXJ0aWFsVmFsdWVzTWFwID0gcGFydHRpYWxNYXAuZ2V0KGF0dHJOYW1lKTtcbiAgICAgICAgICBpZiAoaXNCbGFuayhwYXJ0aWFsVmFsdWVzTWFwKSkge1xuICAgICAgICAgICAgcGFydGlhbFZhbHVlc01hcCA9IG5ldyBNYXA8c3RyaW5nLCBTZWxlY3Rvck1hdGNoZXI+KCk7XG4gICAgICAgICAgICBwYXJ0dGlhbE1hcC5zZXQoYXR0ck5hbWUsIHBhcnRpYWxWYWx1ZXNNYXApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBtYXRjaGVyID0gdGhpcy5fYWRkUGFydGlhbChwYXJ0aWFsVmFsdWVzTWFwLCBhdHRyVmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVGVybWluYWwobWFwOiBNYXA8c3RyaW5nLCBTZWxlY3RvckNvbnRleHRbXT4sIG5hbWU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0YWJsZTogU2VsZWN0b3JDb250ZXh0KSB7XG4gICAgdmFyIHRlcm1pbmFsTGlzdCA9IG1hcC5nZXQobmFtZSk7XG4gICAgaWYgKGlzQmxhbmsodGVybWluYWxMaXN0KSkge1xuICAgICAgdGVybWluYWxMaXN0ID0gW107XG4gICAgICBtYXAuc2V0KG5hbWUsIHRlcm1pbmFsTGlzdCk7XG4gICAgfVxuICAgIHRlcm1pbmFsTGlzdC5wdXNoKHNlbGVjdGFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkUGFydGlhbChtYXA6IE1hcDxzdHJpbmcsIFNlbGVjdG9yTWF0Y2hlcj4sIG5hbWU6IHN0cmluZyk6IFNlbGVjdG9yTWF0Y2hlciB7XG4gICAgdmFyIG1hdGNoZXIgPSBtYXAuZ2V0KG5hbWUpO1xuICAgIGlmIChpc0JsYW5rKG1hdGNoZXIpKSB7XG4gICAgICBtYXRjaGVyID0gbmV3IFNlbGVjdG9yTWF0Y2hlcigpO1xuICAgICAgbWFwLnNldChuYW1lLCBtYXRjaGVyKTtcbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoZXI7XG4gIH1cblxuICAvKipcbiAgICogRmluZCB0aGUgb2JqZWN0cyB0aGF0IGhhdmUgYmVlbiBhZGRlZCB2aWEgYGFkZFNlbGVjdGFibGVgXG4gICAqIHdob3NlIGNzcyBzZWxlY3RvciBpcyBjb250YWluZWQgaW4gdGhlIGdpdmVuIGNzcyBzZWxlY3Rvci5cbiAgICogQHBhcmFtIGNzc1NlbGVjdG9yIEEgY3NzIHNlbGVjdG9yXG4gICAqIEBwYXJhbSBtYXRjaGVkQ2FsbGJhY2sgVGhpcyBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSBvYmplY3QgaGFuZGVkIGludG8gYGFkZFNlbGVjdGFibGVgXG4gICAqIEByZXR1cm4gYm9vbGVhbiB0cnVlIGlmIGEgbWF0Y2ggd2FzIGZvdW5kXG4gICovXG4gIG1hdGNoKGNzc1NlbGVjdG9yOiBDc3NTZWxlY3RvciwgbWF0Y2hlZENhbGxiYWNrOiAoYzogQ3NzU2VsZWN0b3IsIGE6IGFueSkgPT4gdm9pZCk6IGJvb2xlYW4ge1xuICAgIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgICB2YXIgZWxlbWVudCA9IGNzc1NlbGVjdG9yLmVsZW1lbnQ7XG4gICAgdmFyIGNsYXNzTmFtZXMgPSBjc3NTZWxlY3Rvci5jbGFzc05hbWVzO1xuICAgIHZhciBhdHRycyA9IGNzc1NlbGVjdG9yLmF0dHJzO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9saXN0Q29udGV4dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuX2xpc3RDb250ZXh0c1tpXS5hbHJlYWR5TWF0Y2hlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJlc3VsdCA9IHRoaXMuX21hdGNoVGVybWluYWwodGhpcy5fZWxlbWVudE1hcCwgZWxlbWVudCwgY3NzU2VsZWN0b3IsIG1hdGNoZWRDYWxsYmFjaykgfHwgcmVzdWx0O1xuICAgIHJlc3VsdCA9IHRoaXMuX21hdGNoUGFydGlhbCh0aGlzLl9lbGVtZW50UGFydGlhbE1hcCwgZWxlbWVudCwgY3NzU2VsZWN0b3IsIG1hdGNoZWRDYWxsYmFjaykgfHxcbiAgICAgICAgICAgICByZXN1bHQ7XG5cbiAgICBpZiAoaXNQcmVzZW50KGNsYXNzTmFtZXMpKSB7XG4gICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgY2xhc3NOYW1lcy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9IGNsYXNzTmFtZXNbaW5kZXhdO1xuICAgICAgICByZXN1bHQgPVxuICAgICAgICAgICAgdGhpcy5fbWF0Y2hUZXJtaW5hbCh0aGlzLl9jbGFzc01hcCwgY2xhc3NOYW1lLCBjc3NTZWxlY3RvciwgbWF0Y2hlZENhbGxiYWNrKSB8fCByZXN1bHQ7XG4gICAgICAgIHJlc3VsdCA9XG4gICAgICAgICAgICB0aGlzLl9tYXRjaFBhcnRpYWwodGhpcy5fY2xhc3NQYXJ0aWFsTWFwLCBjbGFzc05hbWUsIGNzc1NlbGVjdG9yLCBtYXRjaGVkQ2FsbGJhY2spIHx8XG4gICAgICAgICAgICByZXN1bHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzUHJlc2VudChhdHRycykpIHtcbiAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBhdHRycy5sZW5ndGg7KSB7XG4gICAgICAgIHZhciBhdHRyTmFtZSA9IGF0dHJzW2luZGV4KytdO1xuICAgICAgICB2YXIgYXR0clZhbHVlID0gYXR0cnNbaW5kZXgrK107XG5cbiAgICAgICAgdmFyIHRlcm1pbmFsVmFsdWVzTWFwID0gdGhpcy5fYXR0clZhbHVlTWFwLmdldChhdHRyTmFtZSk7XG4gICAgICAgIGlmICghU3RyaW5nV3JhcHBlci5lcXVhbHMoYXR0clZhbHVlLCBfRU1QVFlfQVRUUl9WQUxVRSkpIHtcbiAgICAgICAgICByZXN1bHQgPSB0aGlzLl9tYXRjaFRlcm1pbmFsKHRlcm1pbmFsVmFsdWVzTWFwLCBfRU1QVFlfQVRUUl9WQUxVRSwgY3NzU2VsZWN0b3IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVkQ2FsbGJhY2spIHx8XG4gICAgICAgICAgICAgICAgICAgcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCA9IHRoaXMuX21hdGNoVGVybWluYWwodGVybWluYWxWYWx1ZXNNYXAsIGF0dHJWYWx1ZSwgY3NzU2VsZWN0b3IsIG1hdGNoZWRDYWxsYmFjaykgfHxcbiAgICAgICAgICAgICAgICAgcmVzdWx0O1xuXG4gICAgICAgIHZhciBwYXJ0aWFsVmFsdWVzTWFwID0gdGhpcy5fYXR0clZhbHVlUGFydGlhbE1hcC5nZXQoYXR0ck5hbWUpO1xuICAgICAgICBpZiAoIVN0cmluZ1dyYXBwZXIuZXF1YWxzKGF0dHJWYWx1ZSwgX0VNUFRZX0FUVFJfVkFMVUUpKSB7XG4gICAgICAgICAgcmVzdWx0ID0gdGhpcy5fbWF0Y2hQYXJ0aWFsKHBhcnRpYWxWYWx1ZXNNYXAsIF9FTVBUWV9BVFRSX1ZBTFVFLCBjc3NTZWxlY3RvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZENhbGxiYWNrKSB8fFxuICAgICAgICAgICAgICAgICAgIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQgPVxuICAgICAgICAgICAgdGhpcy5fbWF0Y2hQYXJ0aWFsKHBhcnRpYWxWYWx1ZXNNYXAsIGF0dHJWYWx1ZSwgY3NzU2VsZWN0b3IsIG1hdGNoZWRDYWxsYmFjaykgfHwgcmVzdWx0O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfbWF0Y2hUZXJtaW5hbChtYXA6IE1hcDxzdHJpbmcsIFNlbGVjdG9yQ29udGV4dFtdPiwgbmFtZSwgY3NzU2VsZWN0b3I6IENzc1NlbGVjdG9yLFxuICAgICAgICAgICAgICAgICBtYXRjaGVkQ2FsbGJhY2s6IChjOiBDc3NTZWxlY3RvciwgYTogYW55KSA9PiB2b2lkKTogYm9vbGVhbiB7XG4gICAgaWYgKGlzQmxhbmsobWFwKSB8fCBpc0JsYW5rKG5hbWUpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIHNlbGVjdGFibGVzID0gbWFwLmdldChuYW1lKTtcbiAgICB2YXIgc3RhclNlbGVjdGFibGVzID0gbWFwLmdldChcIipcIik7XG4gICAgaWYgKGlzUHJlc2VudChzdGFyU2VsZWN0YWJsZXMpKSB7XG4gICAgICBzZWxlY3RhYmxlcyA9IHNlbGVjdGFibGVzLmNvbmNhdChzdGFyU2VsZWN0YWJsZXMpO1xuICAgIH1cbiAgICBpZiAoaXNCbGFuayhzZWxlY3RhYmxlcykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIHNlbGVjdGFibGU7XG4gICAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBzZWxlY3RhYmxlcy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHNlbGVjdGFibGUgPSBzZWxlY3RhYmxlc1tpbmRleF07XG4gICAgICByZXN1bHQgPSBzZWxlY3RhYmxlLmZpbmFsaXplKGNzc1NlbGVjdG9yLCBtYXRjaGVkQ2FsbGJhY2spIHx8IHJlc3VsdDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX21hdGNoUGFydGlhbChtYXA6IE1hcDxzdHJpbmcsIFNlbGVjdG9yTWF0Y2hlcj4sIG5hbWUsIGNzc1NlbGVjdG9yOiBDc3NTZWxlY3RvcixcbiAgICAgICAgICAgICAgICBtYXRjaGVkQ2FsbGJhY2sgLyo6IChjOiBDc3NTZWxlY3RvciwgYTogYW55KSA9PiB2b2lkKi8pOiBib29sZWFuIHtcbiAgICBpZiAoaXNCbGFuayhtYXApIHx8IGlzQmxhbmsobmFtZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIG5lc3RlZFNlbGVjdG9yID0gbWFwLmdldChuYW1lKTtcbiAgICBpZiAoaXNCbGFuayhuZXN0ZWRTZWxlY3RvcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gVE9ETyhwZXJmKTogZ2V0IHJpZCBvZiByZWN1cnNpb24gYW5kIG1lYXN1cmUgYWdhaW5cbiAgICAvLyBUT0RPKHBlcmYpOiBkb24ndCBwYXNzIHRoZSB3aG9sZSBzZWxlY3RvciBpbnRvIHRoZSByZWN1cnNpb24sXG4gICAgLy8gYnV0IG9ubHkgdGhlIG5vdCBwcm9jZXNzZWQgcGFydHNcbiAgICByZXR1cm4gbmVzdGVkU2VsZWN0b3IubWF0Y2goY3NzU2VsZWN0b3IsIG1hdGNoZWRDYWxsYmFjayk7XG4gIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgU2VsZWN0b3JMaXN0Q29udGV4dCB7XG4gIGFscmVhZHlNYXRjaGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHNlbGVjdG9yczogQ3NzU2VsZWN0b3JbXSkge31cbn1cblxuLy8gU3RvcmUgY29udGV4dCB0byBwYXNzIGJhY2sgc2VsZWN0b3IgYW5kIGNvbnRleHQgd2hlbiBhIHNlbGVjdG9yIGlzIG1hdGNoZWRcbmV4cG9ydCBjbGFzcyBTZWxlY3RvckNvbnRleHQge1xuICBub3RTZWxlY3RvcnM6IENzc1NlbGVjdG9yW107XG5cbiAgY29uc3RydWN0b3IocHVibGljIHNlbGVjdG9yOiBDc3NTZWxlY3RvciwgcHVibGljIGNiQ29udGV4dDogYW55LFxuICAgICAgICAgICAgICBwdWJsaWMgbGlzdENvbnRleHQ6IFNlbGVjdG9yTGlzdENvbnRleHQpIHtcbiAgICB0aGlzLm5vdFNlbGVjdG9ycyA9IHNlbGVjdG9yLm5vdFNlbGVjdG9ycztcbiAgfVxuXG4gIGZpbmFsaXplKGNzc1NlbGVjdG9yOiBDc3NTZWxlY3RvciwgY2FsbGJhY2s6IChjOiBDc3NTZWxlY3RvciwgYTogYW55KSA9PiB2b2lkKTogYm9vbGVhbiB7XG4gICAgdmFyIHJlc3VsdCA9IHRydWU7XG4gICAgaWYgKHRoaXMubm90U2VsZWN0b3JzLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgKGlzQmxhbmsodGhpcy5saXN0Q29udGV4dCkgfHwgIXRoaXMubGlzdENvbnRleHQuYWxyZWFkeU1hdGNoZWQpKSB7XG4gICAgICB2YXIgbm90TWF0Y2hlciA9IFNlbGVjdG9yTWF0Y2hlci5jcmVhdGVOb3RNYXRjaGVyKHRoaXMubm90U2VsZWN0b3JzKTtcbiAgICAgIHJlc3VsdCA9ICFub3RNYXRjaGVyLm1hdGNoKGNzc1NlbGVjdG9yLCBudWxsKTtcbiAgICB9XG4gICAgaWYgKHJlc3VsdCAmJiBpc1ByZXNlbnQoY2FsbGJhY2spICYmXG4gICAgICAgIChpc0JsYW5rKHRoaXMubGlzdENvbnRleHQpIHx8ICF0aGlzLmxpc3RDb250ZXh0LmFscmVhZHlNYXRjaGVkKSkge1xuICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmxpc3RDb250ZXh0KSkge1xuICAgICAgICB0aGlzLmxpc3RDb250ZXh0LmFscmVhZHlNYXRjaGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGNhbGxiYWNrKHRoaXMuc2VsZWN0b3IsIHRoaXMuY2JDb250ZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
