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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL3NlbGVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFVTSxpQkFBaUIsRUFJbkIsZ0JBQWdCOzs7Ozs7Ozs7Ozs7O1lBSmQsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1lBRTdCLGtDQUFrQztZQUNsQyxxREFBcUQ7WUFDakQsZ0JBQWdCLEdBQUcsb0JBQWEsQ0FBQyxNQUFNLENBQ3ZDLGNBQWM7Z0JBQ2QsWUFBWTtnQkFDWixtQkFBbUI7Z0JBQ25CLHNDQUFzQztnQkFDdEMsUUFBUTtnQkFDUixhQUFhLENBQUMsQ0FBQyxDQUEyQixNQUFNO1lBRXBEOzs7O2VBSUc7WUFDSDtnQkFBQTtvQkFDRSxZQUFPLEdBQVcsSUFBSSxDQUFDO29CQUN2QixlQUFVLEdBQWEsRUFBRSxDQUFDO29CQUMxQixVQUFLLEdBQWEsRUFBRSxDQUFDO29CQUNyQixpQkFBWSxHQUFrQixFQUFFLENBQUM7Z0JBNEduQyxDQUFDO2dCQTFHUSxpQkFBSyxHQUFaLFVBQWEsUUFBZ0I7b0JBQzNCLElBQUksT0FBTyxHQUFrQixFQUFFLENBQUM7b0JBQ2hDLElBQUksVUFBVSxHQUFHLFVBQUMsR0FBa0IsRUFBRSxNQUFNO3dCQUMxQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksY0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7NEJBQ3pELHdCQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSx3QkFBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNoRixNQUFNLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQzt3QkFDdkIsQ0FBQzt3QkFDRCxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNuQixDQUFDLENBQUM7b0JBQ0YsSUFBSSxX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QUFSLFVBQVMsV0FBd0IsRUFBRSxRQUEwQztvQkFDM0UsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO29CQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDO3dCQUM1QixDQUFDLGNBQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDcEUsSUFBSSxVQUFVLEdBQUcsZUFBZSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzt3QkFDckUsTUFBTSxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ2hELENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLGdCQUFTLENBQUMsUUFBUSxDQUFDO3dCQUM3QixDQUFDLGNBQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDcEUsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7d0JBQ3pDLENBQUM7d0JBQ0QsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUMxQyxDQUFDO29CQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQ2hCLENBQUM7Z0JBQ0gsc0JBQUM7WUFBRCxDQXhCQSxBQXdCQyxJQUFBO1lBeEJELDZDQXdCQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL3NlbGVjdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNYXAsIExpc3RXcmFwcGVyLCBNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtcbiAgaXNQcmVzZW50LFxuICBpc0JsYW5rLFxuICBSZWdFeHBXcmFwcGVyLFxuICBSZWdFeHBNYXRjaGVyV3JhcHBlcixcbiAgU3RyaW5nV3JhcHBlclxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9uLCBXcmFwcGVkRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuXG5jb25zdCBfRU1QVFlfQVRUUl9WQUxVRSA9ICcnO1xuXG4vLyBUT0RPOiBDYW4ndCB1c2UgYGNvbnN0YCBoZXJlIGFzXG4vLyBpbiBEYXJ0IHRoaXMgaXMgbm90IHRyYW5zcGlsZWQgaW50byBgZmluYWxgIHlldC4uLlxudmFyIF9TRUxFQ1RPUl9SRUdFWFAgPSBSZWdFeHBXcmFwcGVyLmNyZWF0ZShcbiAgICAnKFxcXFw6bm90XFxcXCgpfCcgKyAgICAgICAgICAgICAgICAgICAgICAgICAgLy9cIjpub3QoXCJcbiAgICAnKFstXFxcXHddKyl8JyArICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFwidGFnXCJcbiAgICAnKD86XFxcXC4oWy1cXFxcd10rKSl8JyArICAgICAgICAgICAgICAgICAgICAgLy8gXCIuY2xhc3NcIlxuICAgICcoPzpcXFxcWyhbLVxcXFx3Kl0rKSg/Oj0oW15cXFxcXV0qKSk/XFxcXF0pfCcgKyAgLy8gXCJbbmFtZV1cIiwgXCJbbmFtZT12YWx1ZV1cIiBvciBcIltuYW1lKj12YWx1ZV1cIlxuICAgICcoXFxcXCkpfCcgKyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gXCIpXCJcbiAgICAnKFxcXFxzKixcXFxccyopJyk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gXCIsXCJcblxuLyoqXG4gKiBBIGNzcyBzZWxlY3RvciBjb250YWlucyBhbiBlbGVtZW50IG5hbWUsXG4gKiBjc3MgY2xhc3NlcyBhbmQgYXR0cmlidXRlL3ZhbHVlIHBhaXJzIHdpdGggdGhlIHB1cnBvc2VcbiAqIG9mIHNlbGVjdGluZyBzdWJzZXRzIG91dCBvZiB0aGVtLlxuICovXG5leHBvcnQgY2xhc3MgQ3NzU2VsZWN0b3Ige1xuICBlbGVtZW50OiBzdHJpbmcgPSBudWxsO1xuICBjbGFzc05hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICBhdHRyczogc3RyaW5nW10gPSBbXTtcbiAgbm90U2VsZWN0b3JzOiBDc3NTZWxlY3RvcltdID0gW107XG5cbiAgc3RhdGljIHBhcnNlKHNlbGVjdG9yOiBzdHJpbmcpOiBDc3NTZWxlY3RvcltdIHtcbiAgICB2YXIgcmVzdWx0czogQ3NzU2VsZWN0b3JbXSA9IFtdO1xuICAgIHZhciBfYWRkUmVzdWx0ID0gKHJlczogQ3NzU2VsZWN0b3JbXSwgY3NzU2VsKSA9PiB7XG4gICAgICBpZiAoY3NzU2VsLm5vdFNlbGVjdG9ycy5sZW5ndGggPiAwICYmIGlzQmxhbmsoY3NzU2VsLmVsZW1lbnQpICYmXG4gICAgICAgICAgTGlzdFdyYXBwZXIuaXNFbXB0eShjc3NTZWwuY2xhc3NOYW1lcykgJiYgTGlzdFdyYXBwZXIuaXNFbXB0eShjc3NTZWwuYXR0cnMpKSB7XG4gICAgICAgIGNzc1NlbC5lbGVtZW50ID0gXCIqXCI7XG4gICAgICB9XG4gICAgICByZXMucHVzaChjc3NTZWwpO1xuICAgIH07XG4gICAgdmFyIGNzc1NlbGVjdG9yID0gbmV3IENzc1NlbGVjdG9yKCk7XG4gICAgdmFyIG1hdGNoZXIgPSBSZWdFeHBXcmFwcGVyLm1hdGNoZXIoX1NFTEVDVE9SX1JFR0VYUCwgc2VsZWN0b3IpO1xuICAgIHZhciBtYXRjaDtcbiAgICB2YXIgY3VycmVudCA9IGNzc1NlbGVjdG9yO1xuICAgIHZhciBpbk5vdCA9IGZhbHNlO1xuICAgIHdoaWxlIChpc1ByZXNlbnQobWF0Y2ggPSBSZWdFeHBNYXRjaGVyV3JhcHBlci5uZXh0KG1hdGNoZXIpKSkge1xuICAgICAgaWYgKGlzUHJlc2VudChtYXRjaFsxXSkpIHtcbiAgICAgICAgaWYgKGluTm90KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oJ05lc3RpbmcgOm5vdCBpcyBub3QgYWxsb3dlZCBpbiBhIHNlbGVjdG9yJyk7XG4gICAgICAgIH1cbiAgICAgICAgaW5Ob3QgPSB0cnVlO1xuICAgICAgICBjdXJyZW50ID0gbmV3IENzc1NlbGVjdG9yKCk7XG4gICAgICAgIGNzc1NlbGVjdG9yLm5vdFNlbGVjdG9ycy5wdXNoKGN1cnJlbnQpO1xuICAgICAgfVxuICAgICAgaWYgKGlzUHJlc2VudChtYXRjaFsyXSkpIHtcbiAgICAgICAgY3VycmVudC5zZXRFbGVtZW50KG1hdGNoWzJdKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc1ByZXNlbnQobWF0Y2hbM10pKSB7XG4gICAgICAgIGN1cnJlbnQuYWRkQ2xhc3NOYW1lKG1hdGNoWzNdKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc1ByZXNlbnQobWF0Y2hbNF0pKSB7XG4gICAgICAgIGN1cnJlbnQuYWRkQXR0cmlidXRlKG1hdGNoWzRdLCBtYXRjaFs1XSk7XG4gICAgICB9XG4gICAgICBpZiAoaXNQcmVzZW50KG1hdGNoWzZdKSkge1xuICAgICAgICBpbk5vdCA9IGZhbHNlO1xuICAgICAgICBjdXJyZW50ID0gY3NzU2VsZWN0b3I7XG4gICAgICB9XG4gICAgICBpZiAoaXNQcmVzZW50KG1hdGNoWzddKSkge1xuICAgICAgICBpZiAoaW5Ob3QpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbignTXVsdGlwbGUgc2VsZWN0b3JzIGluIDpub3QgYXJlIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBfYWRkUmVzdWx0KHJlc3VsdHMsIGNzc1NlbGVjdG9yKTtcbiAgICAgICAgY3NzU2VsZWN0b3IgPSBjdXJyZW50ID0gbmV3IENzc1NlbGVjdG9yKCk7XG4gICAgICB9XG4gICAgfVxuICAgIF9hZGRSZXN1bHQocmVzdWx0cywgY3NzU2VsZWN0b3IpO1xuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG5cbiAgaXNFbGVtZW50U2VsZWN0b3IoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmVsZW1lbnQpICYmIExpc3RXcmFwcGVyLmlzRW1wdHkodGhpcy5jbGFzc05hbWVzKSAmJlxuICAgICAgICAgICBMaXN0V3JhcHBlci5pc0VtcHR5KHRoaXMuYXR0cnMpICYmIHRoaXMubm90U2VsZWN0b3JzLmxlbmd0aCA9PT0gMDtcbiAgfVxuXG4gIHNldEVsZW1lbnQoZWxlbWVudDogc3RyaW5nID0gbnVsbCkgeyB0aGlzLmVsZW1lbnQgPSBlbGVtZW50OyB9XG5cbiAgLyoqIEdldHMgYSB0ZW1wbGF0ZSBzdHJpbmcgZm9yIGFuIGVsZW1lbnQgdGhhdCBtYXRjaGVzIHRoZSBzZWxlY3Rvci4gKi9cbiAgZ2V0TWF0Y2hpbmdFbGVtZW50VGVtcGxhdGUoKTogc3RyaW5nIHtcbiAgICBsZXQgdGFnTmFtZSA9IGlzUHJlc2VudCh0aGlzLmVsZW1lbnQpID8gdGhpcy5lbGVtZW50IDogJ2Rpdic7XG4gICAgbGV0IGNsYXNzQXR0ciA9IHRoaXMuY2xhc3NOYW1lcy5sZW5ndGggPiAwID8gYCBjbGFzcz1cIiR7dGhpcy5jbGFzc05hbWVzLmpvaW4oJyAnKX1cImAgOiAnJztcblxuICAgIGxldCBhdHRycyA9ICcnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hdHRycy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgbGV0IGF0dHJOYW1lID0gdGhpcy5hdHRyc1tpXTtcbiAgICAgIGxldCBhdHRyVmFsdWUgPSB0aGlzLmF0dHJzW2kgKyAxXSAhPT0gJycgPyBgPVwiJHt0aGlzLmF0dHJzW2kgKyAxXX1cImAgOiAnJztcbiAgICAgIGF0dHJzICs9IGAgJHthdHRyTmFtZX0ke2F0dHJWYWx1ZX1gO1xuICAgIH1cblxuICAgIHJldHVybiBgPCR7dGFnTmFtZX0ke2NsYXNzQXR0cn0ke2F0dHJzfT48LyR7dGFnTmFtZX0+YDtcbiAgfVxuXG4gIGFkZEF0dHJpYnV0ZShuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgPSBfRU1QVFlfQVRUUl9WQUxVRSkge1xuICAgIHRoaXMuYXR0cnMucHVzaChuYW1lKTtcbiAgICBpZiAoaXNQcmVzZW50KHZhbHVlKSkge1xuICAgICAgdmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSA9IF9FTVBUWV9BVFRSX1ZBTFVFO1xuICAgIH1cbiAgICB0aGlzLmF0dHJzLnB1c2godmFsdWUpO1xuICB9XG5cbiAgYWRkQ2xhc3NOYW1lKG5hbWU6IHN0cmluZykgeyB0aGlzLmNsYXNzTmFtZXMucHVzaChuYW1lLnRvTG93ZXJDYXNlKCkpOyB9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICB2YXIgcmVzID0gJyc7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLmVsZW1lbnQpKSB7XG4gICAgICByZXMgKz0gdGhpcy5lbGVtZW50O1xuICAgIH1cbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuY2xhc3NOYW1lcykpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jbGFzc05hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlcyArPSAnLicgKyB0aGlzLmNsYXNzTmFtZXNbaV07XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChpc1ByZXNlbnQodGhpcy5hdHRycykpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5hdHRycy5sZW5ndGg7KSB7XG4gICAgICAgIHZhciBhdHRyTmFtZSA9IHRoaXMuYXR0cnNbaSsrXTtcbiAgICAgICAgdmFyIGF0dHJWYWx1ZSA9IHRoaXMuYXR0cnNbaSsrXTtcbiAgICAgICAgcmVzICs9ICdbJyArIGF0dHJOYW1lO1xuICAgICAgICBpZiAoYXR0clZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXMgKz0gJz0nICsgYXR0clZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJlcyArPSAnXSc7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMubm90U2VsZWN0b3JzLmZvckVhY2gobm90U2VsZWN0b3IgPT4gcmVzICs9IGA6bm90KCR7bm90U2VsZWN0b3J9KWApO1xuICAgIHJldHVybiByZXM7XG4gIH1cbn1cblxuLyoqXG4gKiBSZWFkcyBhIGxpc3Qgb2YgQ3NzU2VsZWN0b3JzIGFuZCBhbGxvd3MgdG8gY2FsY3VsYXRlIHdoaWNoIG9uZXNcbiAqIGFyZSBjb250YWluZWQgaW4gYSBnaXZlbiBDc3NTZWxlY3Rvci5cbiAqL1xuZXhwb3J0IGNsYXNzIFNlbGVjdG9yTWF0Y2hlciB7XG4gIHN0YXRpYyBjcmVhdGVOb3RNYXRjaGVyKG5vdFNlbGVjdG9yczogQ3NzU2VsZWN0b3JbXSk6IFNlbGVjdG9yTWF0Y2hlciB7XG4gICAgdmFyIG5vdE1hdGNoZXIgPSBuZXcgU2VsZWN0b3JNYXRjaGVyKCk7XG4gICAgbm90TWF0Y2hlci5hZGRTZWxlY3RhYmxlcyhub3RTZWxlY3RvcnMsIG51bGwpO1xuICAgIHJldHVybiBub3RNYXRjaGVyO1xuICB9XG5cbiAgcHJpdmF0ZSBfZWxlbWVudE1hcCA9IG5ldyBNYXA8c3RyaW5nLCBTZWxlY3RvckNvbnRleHRbXT4oKTtcbiAgcHJpdmF0ZSBfZWxlbWVudFBhcnRpYWxNYXAgPSBuZXcgTWFwPHN0cmluZywgU2VsZWN0b3JNYXRjaGVyPigpO1xuICBwcml2YXRlIF9jbGFzc01hcCA9IG5ldyBNYXA8c3RyaW5nLCBTZWxlY3RvckNvbnRleHRbXT4oKTtcbiAgcHJpdmF0ZSBfY2xhc3NQYXJ0aWFsTWFwID0gbmV3IE1hcDxzdHJpbmcsIFNlbGVjdG9yTWF0Y2hlcj4oKTtcbiAgcHJpdmF0ZSBfYXR0clZhbHVlTWFwID0gbmV3IE1hcDxzdHJpbmcsIE1hcDxzdHJpbmcsIFNlbGVjdG9yQ29udGV4dFtdPj4oKTtcbiAgcHJpdmF0ZSBfYXR0clZhbHVlUGFydGlhbE1hcCA9IG5ldyBNYXA8c3RyaW5nLCBNYXA8c3RyaW5nLCBTZWxlY3Rvck1hdGNoZXI+PigpO1xuICBwcml2YXRlIF9saXN0Q29udGV4dHM6IFNlbGVjdG9yTGlzdENvbnRleHRbXSA9IFtdO1xuXG4gIGFkZFNlbGVjdGFibGVzKGNzc1NlbGVjdG9yczogQ3NzU2VsZWN0b3JbXSwgY2FsbGJhY2tDdHh0PzogYW55KSB7XG4gICAgdmFyIGxpc3RDb250ZXh0ID0gbnVsbDtcbiAgICBpZiAoY3NzU2VsZWN0b3JzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGxpc3RDb250ZXh0ID0gbmV3IFNlbGVjdG9yTGlzdENvbnRleHQoY3NzU2VsZWN0b3JzKTtcbiAgICAgIHRoaXMuX2xpc3RDb250ZXh0cy5wdXNoKGxpc3RDb250ZXh0KTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjc3NTZWxlY3RvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuX2FkZFNlbGVjdGFibGUoY3NzU2VsZWN0b3JzW2ldLCBjYWxsYmFja0N0eHQsIGxpc3RDb250ZXh0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkIGFuIG9iamVjdCB0aGF0IGNhbiBiZSBmb3VuZCBsYXRlciBvbiBieSBjYWxsaW5nIGBtYXRjaGAuXG4gICAqIEBwYXJhbSBjc3NTZWxlY3RvciBBIGNzcyBzZWxlY3RvclxuICAgKiBAcGFyYW0gY2FsbGJhY2tDdHh0IEFuIG9wYXF1ZSBvYmplY3QgdGhhdCB3aWxsIGJlIGdpdmVuIHRvIHRoZSBjYWxsYmFjayBvZiB0aGUgYG1hdGNoYCBmdW5jdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBfYWRkU2VsZWN0YWJsZShjc3NTZWxlY3RvcjogQ3NzU2VsZWN0b3IsIGNhbGxiYWNrQ3R4dDogYW55LFxuICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RDb250ZXh0OiBTZWxlY3Rvckxpc3RDb250ZXh0KSB7XG4gICAgdmFyIG1hdGNoZXI6IFNlbGVjdG9yTWF0Y2hlciA9IHRoaXM7XG4gICAgdmFyIGVsZW1lbnQgPSBjc3NTZWxlY3Rvci5lbGVtZW50O1xuICAgIHZhciBjbGFzc05hbWVzID0gY3NzU2VsZWN0b3IuY2xhc3NOYW1lcztcbiAgICB2YXIgYXR0cnMgPSBjc3NTZWxlY3Rvci5hdHRycztcbiAgICB2YXIgc2VsZWN0YWJsZSA9IG5ldyBTZWxlY3RvckNvbnRleHQoY3NzU2VsZWN0b3IsIGNhbGxiYWNrQ3R4dCwgbGlzdENvbnRleHQpO1xuXG4gICAgaWYgKGlzUHJlc2VudChlbGVtZW50KSkge1xuICAgICAgdmFyIGlzVGVybWluYWwgPSBhdHRycy5sZW5ndGggPT09IDAgJiYgY2xhc3NOYW1lcy5sZW5ndGggPT09IDA7XG4gICAgICBpZiAoaXNUZXJtaW5hbCkge1xuICAgICAgICB0aGlzLl9hZGRUZXJtaW5hbChtYXRjaGVyLl9lbGVtZW50TWFwLCBlbGVtZW50LCBzZWxlY3RhYmxlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hdGNoZXIgPSB0aGlzLl9hZGRQYXJ0aWFsKG1hdGNoZXIuX2VsZW1lbnRQYXJ0aWFsTWFwLCBlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNQcmVzZW50KGNsYXNzTmFtZXMpKSB7XG4gICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgY2xhc3NOYW1lcy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgdmFyIGlzVGVybWluYWwgPSBhdHRycy5sZW5ndGggPT09IDAgJiYgaW5kZXggPT09IGNsYXNzTmFtZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9IGNsYXNzTmFtZXNbaW5kZXhdO1xuICAgICAgICBpZiAoaXNUZXJtaW5hbCkge1xuICAgICAgICAgIHRoaXMuX2FkZFRlcm1pbmFsKG1hdGNoZXIuX2NsYXNzTWFwLCBjbGFzc05hbWUsIHNlbGVjdGFibGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1hdGNoZXIgPSB0aGlzLl9hZGRQYXJ0aWFsKG1hdGNoZXIuX2NsYXNzUGFydGlhbE1hcCwgY2xhc3NOYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc1ByZXNlbnQoYXR0cnMpKSB7XG4gICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgYXR0cnMubGVuZ3RoOykge1xuICAgICAgICB2YXIgaXNUZXJtaW5hbCA9IGluZGV4ID09PSBhdHRycy5sZW5ndGggLSAyO1xuICAgICAgICB2YXIgYXR0ck5hbWUgPSBhdHRyc1tpbmRleCsrXTtcbiAgICAgICAgdmFyIGF0dHJWYWx1ZSA9IGF0dHJzW2luZGV4KytdO1xuICAgICAgICBpZiAoaXNUZXJtaW5hbCkge1xuICAgICAgICAgIHZhciB0ZXJtaW5hbE1hcCA9IG1hdGNoZXIuX2F0dHJWYWx1ZU1hcDtcbiAgICAgICAgICB2YXIgdGVybWluYWxWYWx1ZXNNYXAgPSB0ZXJtaW5hbE1hcC5nZXQoYXR0ck5hbWUpO1xuICAgICAgICAgIGlmIChpc0JsYW5rKHRlcm1pbmFsVmFsdWVzTWFwKSkge1xuICAgICAgICAgICAgdGVybWluYWxWYWx1ZXNNYXAgPSBuZXcgTWFwPHN0cmluZywgU2VsZWN0b3JDb250ZXh0W10+KCk7XG4gICAgICAgICAgICB0ZXJtaW5hbE1hcC5zZXQoYXR0ck5hbWUsIHRlcm1pbmFsVmFsdWVzTWFwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fYWRkVGVybWluYWwodGVybWluYWxWYWx1ZXNNYXAsIGF0dHJWYWx1ZSwgc2VsZWN0YWJsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHBhcnR0aWFsTWFwID0gbWF0Y2hlci5fYXR0clZhbHVlUGFydGlhbE1hcDtcbiAgICAgICAgICB2YXIgcGFydGlhbFZhbHVlc01hcCA9IHBhcnR0aWFsTWFwLmdldChhdHRyTmFtZSk7XG4gICAgICAgICAgaWYgKGlzQmxhbmsocGFydGlhbFZhbHVlc01hcCkpIHtcbiAgICAgICAgICAgIHBhcnRpYWxWYWx1ZXNNYXAgPSBuZXcgTWFwPHN0cmluZywgU2VsZWN0b3JNYXRjaGVyPigpO1xuICAgICAgICAgICAgcGFydHRpYWxNYXAuc2V0KGF0dHJOYW1lLCBwYXJ0aWFsVmFsdWVzTWFwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbWF0Y2hlciA9IHRoaXMuX2FkZFBhcnRpYWwocGFydGlhbFZhbHVlc01hcCwgYXR0clZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRlcm1pbmFsKG1hcDogTWFwPHN0cmluZywgU2VsZWN0b3JDb250ZXh0W10+LCBuYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGFibGU6IFNlbGVjdG9yQ29udGV4dCkge1xuICAgIHZhciB0ZXJtaW5hbExpc3QgPSBtYXAuZ2V0KG5hbWUpO1xuICAgIGlmIChpc0JsYW5rKHRlcm1pbmFsTGlzdCkpIHtcbiAgICAgIHRlcm1pbmFsTGlzdCA9IFtdO1xuICAgICAgbWFwLnNldChuYW1lLCB0ZXJtaW5hbExpc3QpO1xuICAgIH1cbiAgICB0ZXJtaW5hbExpc3QucHVzaChzZWxlY3RhYmxlKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFBhcnRpYWwobWFwOiBNYXA8c3RyaW5nLCBTZWxlY3Rvck1hdGNoZXI+LCBuYW1lOiBzdHJpbmcpOiBTZWxlY3Rvck1hdGNoZXIge1xuICAgIHZhciBtYXRjaGVyID0gbWFwLmdldChuYW1lKTtcbiAgICBpZiAoaXNCbGFuayhtYXRjaGVyKSkge1xuICAgICAgbWF0Y2hlciA9IG5ldyBTZWxlY3Rvck1hdGNoZXIoKTtcbiAgICAgIG1hcC5zZXQobmFtZSwgbWF0Y2hlcik7XG4gICAgfVxuICAgIHJldHVybiBtYXRjaGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgdGhlIG9iamVjdHMgdGhhdCBoYXZlIGJlZW4gYWRkZWQgdmlhIGBhZGRTZWxlY3RhYmxlYFxuICAgKiB3aG9zZSBjc3Mgc2VsZWN0b3IgaXMgY29udGFpbmVkIGluIHRoZSBnaXZlbiBjc3Mgc2VsZWN0b3IuXG4gICAqIEBwYXJhbSBjc3NTZWxlY3RvciBBIGNzcyBzZWxlY3RvclxuICAgKiBAcGFyYW0gbWF0Y2hlZENhbGxiYWNrIFRoaXMgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgb2JqZWN0IGhhbmRlZCBpbnRvIGBhZGRTZWxlY3RhYmxlYFxuICAgKiBAcmV0dXJuIGJvb2xlYW4gdHJ1ZSBpZiBhIG1hdGNoIHdhcyBmb3VuZFxuICAqL1xuICBtYXRjaChjc3NTZWxlY3RvcjogQ3NzU2VsZWN0b3IsIG1hdGNoZWRDYWxsYmFjazogKGM6IENzc1NlbGVjdG9yLCBhOiBhbnkpID0+IHZvaWQpOiBib29sZWFuIHtcbiAgICB2YXIgcmVzdWx0ID0gZmFsc2U7XG4gICAgdmFyIGVsZW1lbnQgPSBjc3NTZWxlY3Rvci5lbGVtZW50O1xuICAgIHZhciBjbGFzc05hbWVzID0gY3NzU2VsZWN0b3IuY2xhc3NOYW1lcztcbiAgICB2YXIgYXR0cnMgPSBjc3NTZWxlY3Rvci5hdHRycztcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fbGlzdENvbnRleHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLl9saXN0Q29udGV4dHNbaV0uYWxyZWFkeU1hdGNoZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXN1bHQgPSB0aGlzLl9tYXRjaFRlcm1pbmFsKHRoaXMuX2VsZW1lbnRNYXAsIGVsZW1lbnQsIGNzc1NlbGVjdG9yLCBtYXRjaGVkQ2FsbGJhY2spIHx8IHJlc3VsdDtcbiAgICByZXN1bHQgPSB0aGlzLl9tYXRjaFBhcnRpYWwodGhpcy5fZWxlbWVudFBhcnRpYWxNYXAsIGVsZW1lbnQsIGNzc1NlbGVjdG9yLCBtYXRjaGVkQ2FsbGJhY2spIHx8XG4gICAgICAgICAgICAgcmVzdWx0O1xuXG4gICAgaWYgKGlzUHJlc2VudChjbGFzc05hbWVzKSkge1xuICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGNsYXNzTmFtZXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIHZhciBjbGFzc05hbWUgPSBjbGFzc05hbWVzW2luZGV4XTtcbiAgICAgICAgcmVzdWx0ID1cbiAgICAgICAgICAgIHRoaXMuX21hdGNoVGVybWluYWwodGhpcy5fY2xhc3NNYXAsIGNsYXNzTmFtZSwgY3NzU2VsZWN0b3IsIG1hdGNoZWRDYWxsYmFjaykgfHwgcmVzdWx0O1xuICAgICAgICByZXN1bHQgPVxuICAgICAgICAgICAgdGhpcy5fbWF0Y2hQYXJ0aWFsKHRoaXMuX2NsYXNzUGFydGlhbE1hcCwgY2xhc3NOYW1lLCBjc3NTZWxlY3RvciwgbWF0Y2hlZENhbGxiYWNrKSB8fFxuICAgICAgICAgICAgcmVzdWx0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc1ByZXNlbnQoYXR0cnMpKSB7XG4gICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgYXR0cnMubGVuZ3RoOykge1xuICAgICAgICB2YXIgYXR0ck5hbWUgPSBhdHRyc1tpbmRleCsrXTtcbiAgICAgICAgdmFyIGF0dHJWYWx1ZSA9IGF0dHJzW2luZGV4KytdO1xuXG4gICAgICAgIHZhciB0ZXJtaW5hbFZhbHVlc01hcCA9IHRoaXMuX2F0dHJWYWx1ZU1hcC5nZXQoYXR0ck5hbWUpO1xuICAgICAgICBpZiAoIVN0cmluZ1dyYXBwZXIuZXF1YWxzKGF0dHJWYWx1ZSwgX0VNUFRZX0FUVFJfVkFMVUUpKSB7XG4gICAgICAgICAgcmVzdWx0ID0gdGhpcy5fbWF0Y2hUZXJtaW5hbCh0ZXJtaW5hbFZhbHVlc01hcCwgX0VNUFRZX0FUVFJfVkFMVUUsIGNzc1NlbGVjdG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZENhbGxiYWNrKSB8fFxuICAgICAgICAgICAgICAgICAgIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQgPSB0aGlzLl9tYXRjaFRlcm1pbmFsKHRlcm1pbmFsVmFsdWVzTWFwLCBhdHRyVmFsdWUsIGNzc1NlbGVjdG9yLCBtYXRjaGVkQ2FsbGJhY2spIHx8XG4gICAgICAgICAgICAgICAgIHJlc3VsdDtcblxuICAgICAgICB2YXIgcGFydGlhbFZhbHVlc01hcCA9IHRoaXMuX2F0dHJWYWx1ZVBhcnRpYWxNYXAuZ2V0KGF0dHJOYW1lKTtcbiAgICAgICAgaWYgKCFTdHJpbmdXcmFwcGVyLmVxdWFscyhhdHRyVmFsdWUsIF9FTVBUWV9BVFRSX1ZBTFVFKSkge1xuICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX21hdGNoUGFydGlhbChwYXJ0aWFsVmFsdWVzTWFwLCBfRU1QVFlfQVRUUl9WQUxVRSwgY3NzU2VsZWN0b3IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZWRDYWxsYmFjaykgfHxcbiAgICAgICAgICAgICAgICAgICByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0ID1cbiAgICAgICAgICAgIHRoaXMuX21hdGNoUGFydGlhbChwYXJ0aWFsVmFsdWVzTWFwLCBhdHRyVmFsdWUsIGNzc1NlbGVjdG9yLCBtYXRjaGVkQ2FsbGJhY2spIHx8IHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX21hdGNoVGVybWluYWwobWFwOiBNYXA8c3RyaW5nLCBTZWxlY3RvckNvbnRleHRbXT4sIG5hbWUsIGNzc1NlbGVjdG9yOiBDc3NTZWxlY3RvcixcbiAgICAgICAgICAgICAgICAgbWF0Y2hlZENhbGxiYWNrOiAoYzogQ3NzU2VsZWN0b3IsIGE6IGFueSkgPT4gdm9pZCk6IGJvb2xlYW4ge1xuICAgIGlmIChpc0JsYW5rKG1hcCkgfHwgaXNCbGFuayhuYW1lKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBzZWxlY3RhYmxlcyA9IG1hcC5nZXQobmFtZSk7XG4gICAgdmFyIHN0YXJTZWxlY3RhYmxlcyA9IG1hcC5nZXQoXCIqXCIpO1xuICAgIGlmIChpc1ByZXNlbnQoc3RhclNlbGVjdGFibGVzKSkge1xuICAgICAgc2VsZWN0YWJsZXMgPSBzZWxlY3RhYmxlcy5jb25jYXQoc3RhclNlbGVjdGFibGVzKTtcbiAgICB9XG4gICAgaWYgKGlzQmxhbmsoc2VsZWN0YWJsZXMpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBzZWxlY3RhYmxlO1xuICAgIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgc2VsZWN0YWJsZXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBzZWxlY3RhYmxlID0gc2VsZWN0YWJsZXNbaW5kZXhdO1xuICAgICAgcmVzdWx0ID0gc2VsZWN0YWJsZS5maW5hbGl6ZShjc3NTZWxlY3RvciwgbWF0Y2hlZENhbGxiYWNrKSB8fCByZXN1bHQ7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9tYXRjaFBhcnRpYWwobWFwOiBNYXA8c3RyaW5nLCBTZWxlY3Rvck1hdGNoZXI+LCBuYW1lLCBjc3NTZWxlY3RvcjogQ3NzU2VsZWN0b3IsXG4gICAgICAgICAgICAgICAgbWF0Y2hlZENhbGxiYWNrIC8qOiAoYzogQ3NzU2VsZWN0b3IsIGE6IGFueSkgPT4gdm9pZCovKTogYm9vbGVhbiB7XG4gICAgaWYgKGlzQmxhbmsobWFwKSB8fCBpc0JsYW5rKG5hbWUpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBuZXN0ZWRTZWxlY3RvciA9IG1hcC5nZXQobmFtZSk7XG4gICAgaWYgKGlzQmxhbmsobmVzdGVkU2VsZWN0b3IpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIFRPRE8ocGVyZik6IGdldCByaWQgb2YgcmVjdXJzaW9uIGFuZCBtZWFzdXJlIGFnYWluXG4gICAgLy8gVE9ETyhwZXJmKTogZG9uJ3QgcGFzcyB0aGUgd2hvbGUgc2VsZWN0b3IgaW50byB0aGUgcmVjdXJzaW9uLFxuICAgIC8vIGJ1dCBvbmx5IHRoZSBub3QgcHJvY2Vzc2VkIHBhcnRzXG4gICAgcmV0dXJuIG5lc3RlZFNlbGVjdG9yLm1hdGNoKGNzc1NlbGVjdG9yLCBtYXRjaGVkQ2FsbGJhY2spO1xuICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFNlbGVjdG9yTGlzdENvbnRleHQge1xuICBhbHJlYWR5TWF0Y2hlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzZWxlY3RvcnM6IENzc1NlbGVjdG9yW10pIHt9XG59XG5cbi8vIFN0b3JlIGNvbnRleHQgdG8gcGFzcyBiYWNrIHNlbGVjdG9yIGFuZCBjb250ZXh0IHdoZW4gYSBzZWxlY3RvciBpcyBtYXRjaGVkXG5leHBvcnQgY2xhc3MgU2VsZWN0b3JDb250ZXh0IHtcbiAgbm90U2VsZWN0b3JzOiBDc3NTZWxlY3RvcltdO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzZWxlY3RvcjogQ3NzU2VsZWN0b3IsIHB1YmxpYyBjYkNvbnRleHQ6IGFueSxcbiAgICAgICAgICAgICAgcHVibGljIGxpc3RDb250ZXh0OiBTZWxlY3Rvckxpc3RDb250ZXh0KSB7XG4gICAgdGhpcy5ub3RTZWxlY3RvcnMgPSBzZWxlY3Rvci5ub3RTZWxlY3RvcnM7XG4gIH1cblxuICBmaW5hbGl6ZShjc3NTZWxlY3RvcjogQ3NzU2VsZWN0b3IsIGNhbGxiYWNrOiAoYzogQ3NzU2VsZWN0b3IsIGE6IGFueSkgPT4gdm9pZCk6IGJvb2xlYW4ge1xuICAgIHZhciByZXN1bHQgPSB0cnVlO1xuICAgIGlmICh0aGlzLm5vdFNlbGVjdG9ycy5sZW5ndGggPiAwICYmXG4gICAgICAgIChpc0JsYW5rKHRoaXMubGlzdENvbnRleHQpIHx8ICF0aGlzLmxpc3RDb250ZXh0LmFscmVhZHlNYXRjaGVkKSkge1xuICAgICAgdmFyIG5vdE1hdGNoZXIgPSBTZWxlY3Rvck1hdGNoZXIuY3JlYXRlTm90TWF0Y2hlcih0aGlzLm5vdFNlbGVjdG9ycyk7XG4gICAgICByZXN1bHQgPSAhbm90TWF0Y2hlci5tYXRjaChjc3NTZWxlY3RvciwgbnVsbCk7XG4gICAgfVxuICAgIGlmIChyZXN1bHQgJiYgaXNQcmVzZW50KGNhbGxiYWNrKSAmJlxuICAgICAgICAoaXNCbGFuayh0aGlzLmxpc3RDb250ZXh0KSB8fCAhdGhpcy5saXN0Q29udGV4dC5hbHJlYWR5TWF0Y2hlZCkpIHtcbiAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5saXN0Q29udGV4dCkpIHtcbiAgICAgICAgdGhpcy5saXN0Q29udGV4dC5hbHJlYWR5TWF0Y2hlZCA9IHRydWU7XG4gICAgICB9XG4gICAgICBjYWxsYmFjayh0aGlzLnNlbGVjdG9yLCB0aGlzLmNiQ29udGV4dCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
