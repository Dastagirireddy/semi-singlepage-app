System.register(['angular2/src/facade/collection', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var collection_1, lang_1;
    var ShadowCss, _cssContentNextSelectorRe, _cssContentRuleRe, _cssContentUnscopedRuleRe, _polyfillHost, _polyfillHostContext, _parenSuffix, _cssColonHostRe, _cssColonHostContextRe, _polyfillHostNoCombinator, _shadowDOMSelectorsRe, _shadowDeepSelectors, _selectorReSuffix, _polyfillHostRe, _colonHostRe, _colonHostContextRe, _commentRe, _ruleRe, _curlyRe, OPEN_CURLY, CLOSE_CURLY, BLOCK_PLACEHOLDER, CssRule, StringWithEscapedBlocks;
    function stripComments(input) {
        return lang_1.StringWrapper.replaceAllMapped(input, _commentRe, function (_) { return ''; });
    }
    function processRules(input, ruleCallback) {
        var inputWithEscapedBlocks = escapeBlocks(input);
        var nextBlockIndex = 0;
        return lang_1.StringWrapper.replaceAllMapped(inputWithEscapedBlocks.escapedString, _ruleRe, function (m) {
            var selector = m[2];
            var content = '';
            var suffix = m[4];
            var contentPrefix = '';
            if (lang_1.isPresent(m[4]) && m[4].startsWith('{' + BLOCK_PLACEHOLDER)) {
                content = inputWithEscapedBlocks.blocks[nextBlockIndex++];
                suffix = m[4].substring(BLOCK_PLACEHOLDER.length + 1);
                contentPrefix = '{';
            }
            var rule = ruleCallback(new CssRule(selector, content));
            return "" + m[1] + rule.selector + m[3] + contentPrefix + rule.content + suffix;
        });
    }
    exports_1("processRules", processRules);
    function escapeBlocks(input) {
        var inputParts = lang_1.StringWrapper.split(input, _curlyRe);
        var resultParts = [];
        var escapedBlocks = [];
        var bracketCount = 0;
        var currentBlockParts = [];
        for (var partIndex = 0; partIndex < inputParts.length; partIndex++) {
            var part = inputParts[partIndex];
            if (part == CLOSE_CURLY) {
                bracketCount--;
            }
            if (bracketCount > 0) {
                currentBlockParts.push(part);
            }
            else {
                if (currentBlockParts.length > 0) {
                    escapedBlocks.push(currentBlockParts.join(''));
                    resultParts.push(BLOCK_PLACEHOLDER);
                    currentBlockParts = [];
                }
                resultParts.push(part);
            }
            if (part == OPEN_CURLY) {
                bracketCount++;
            }
        }
        if (currentBlockParts.length > 0) {
            escapedBlocks.push(currentBlockParts.join(''));
            resultParts.push(BLOCK_PLACEHOLDER);
        }
        return new StringWithEscapedBlocks(resultParts.join(''), escapedBlocks);
    }
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * This file is a port of shadowCSS from webcomponents.js to TypeScript.
             *
             * Please make sure to keep to edits in sync with the source file.
             *
             * Source:
             * https://github.com/webcomponents/webcomponentsjs/blob/4efecd7e0e/src/ShadowCSS/ShadowCSS.js
             *
             * The original file level comment is reproduced below
             */
            /*
              This is a limited shim for ShadowDOM css styling.
              https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html#styles
            
              The intention here is to support only the styling features which can be
              relatively simply implemented. The goal is to allow users to avoid the
              most obvious pitfalls and do so without compromising performance significantly.
              For ShadowDOM styling that's not covered here, a set of best practices
              can be provided that should allow users to accomplish more complex styling.
            
              The following is a list of specific ShadowDOM styling features and a brief
              discussion of the approach used to shim.
            
              Shimmed features:
            
              * :host, :host-context: ShadowDOM allows styling of the shadowRoot's host
              element using the :host rule. To shim this feature, the :host styles are
              reformatted and prefixed with a given scope name and promoted to a
              document level stylesheet.
              For example, given a scope name of .foo, a rule like this:
            
                :host {
                    background: red;
                  }
                }
            
              becomes:
            
                .foo {
                  background: red;
                }
            
              * encapsultion: Styles defined within ShadowDOM, apply only to
              dom inside the ShadowDOM. Polymer uses one of two techniques to implement
              this feature.
            
              By default, rules are prefixed with the host element tag name
              as a descendant selector. This ensures styling does not leak out of the 'top'
              of the element's ShadowDOM. For example,
            
              div {
                  font-weight: bold;
                }
            
              becomes:
            
              x-foo div {
                  font-weight: bold;
                }
            
              becomes:
            
            
              Alternatively, if WebComponents.ShadowCSS.strictStyling is set to true then
              selectors are scoped by adding an attribute selector suffix to each
              simple selector that contains the host element tag name. Each element
              in the element's ShadowDOM template is also given the scope attribute.
              Thus, these rules match only elements that have the scope attribute.
              For example, given a scope name of x-foo, a rule like this:
            
                div {
                  font-weight: bold;
                }
            
              becomes:
            
                div[x-foo] {
                  font-weight: bold;
                }
            
              Note that elements that are dynamically added to a scope must have the scope
              selector added to them manually.
            
              * upper/lower bound encapsulation: Styles which are defined outside a
              shadowRoot should not cross the ShadowDOM boundary and should not apply
              inside a shadowRoot.
            
              This styling behavior is not emulated. Some possible ways to do this that
              were rejected due to complexity and/or performance concerns include: (1) reset
              every possible property for every possible selector for a given scope name;
              (2) re-implement css in javascript.
            
              As an alternative, users should make sure to use selectors
              specific to the scope in which they are working.
            
              * ::distributed: This behavior is not emulated. It's often not necessary
              to style the contents of a specific insertion point and instead, descendants
              of the host element can be styled selectively. Users can also create an
              extra node around an insertion point and style that node's contents
              via descendent selectors. For example, with a shadowRoot like this:
            
                <style>
                  ::content(div) {
                    background: red;
                  }
                </style>
                <content></content>
            
              could become:
            
                <style>
                  / *@polyfill .content-container div * /
                  ::content(div) {
                    background: red;
                  }
                </style>
                <div class="content-container">
                  <content></content>
                </div>
            
              Note the use of @polyfill in the comment above a ShadowDOM specific style
              declaration. This is a directive to the styling shim to use the selector
              in comments in lieu of the next selector when running under polyfill.
            */
            ShadowCss = (function () {
                function ShadowCss() {
                    this.strictStyling = true;
                }
                /*
                * Shim some cssText with the given selector. Returns cssText that can
                * be included in the document via WebComponents.ShadowCSS.addCssToDocument(css).
                *
                * When strictStyling is true:
                * - selector is the attribute added to all elements inside the host,
                * - hostSelector is the attribute added to the host itself.
                */
                ShadowCss.prototype.shimCssText = function (cssText, selector, hostSelector) {
                    if (hostSelector === void 0) { hostSelector = ''; }
                    cssText = stripComments(cssText);
                    cssText = this._insertDirectives(cssText);
                    return this._scopeCssText(cssText, selector, hostSelector);
                };
                ShadowCss.prototype._insertDirectives = function (cssText) {
                    cssText = this._insertPolyfillDirectivesInCssText(cssText);
                    return this._insertPolyfillRulesInCssText(cssText);
                };
                /*
                 * Process styles to convert native ShadowDOM rules that will trip
                 * up the css parser; we rely on decorating the stylesheet with inert rules.
                 *
                 * For example, we convert this rule:
                 *
                 * polyfill-next-selector { content: ':host menu-item'; }
                 * ::content menu-item {
                 *
                 * to this:
                 *
                 * scopeName menu-item {
                 *
                **/
                ShadowCss.prototype._insertPolyfillDirectivesInCssText = function (cssText) {
                    // Difference with webcomponents.js: does not handle comments
                    return lang_1.StringWrapper.replaceAllMapped(cssText, _cssContentNextSelectorRe, function (m) { return m[1] + '{'; });
                };
                /*
                 * Process styles to add rules which will only apply under the polyfill
                 *
                 * For example, we convert this rule:
                 *
                 * polyfill-rule {
                 *   content: ':host menu-item';
                 * ...
                 * }
                 *
                 * to this:
                 *
                 * scopeName menu-item {...}
                 *
                **/
                ShadowCss.prototype._insertPolyfillRulesInCssText = function (cssText) {
                    // Difference with webcomponents.js: does not handle comments
                    return lang_1.StringWrapper.replaceAllMapped(cssText, _cssContentRuleRe, function (m) {
                        var rule = m[0];
                        rule = lang_1.StringWrapper.replace(rule, m[1], '');
                        rule = lang_1.StringWrapper.replace(rule, m[2], '');
                        return m[3] + rule;
                    });
                };
                /* Ensure styles are scoped. Pseudo-scoping takes a rule like:
                 *
                 *  .foo {... }
                 *
                 *  and converts this to
                 *
                 *  scopeName .foo { ... }
                */
                ShadowCss.prototype._scopeCssText = function (cssText, scopeSelector, hostSelector) {
                    var unscoped = this._extractUnscopedRulesFromCssText(cssText);
                    cssText = this._insertPolyfillHostInCssText(cssText);
                    cssText = this._convertColonHost(cssText);
                    cssText = this._convertColonHostContext(cssText);
                    cssText = this._convertShadowDOMSelectors(cssText);
                    if (lang_1.isPresent(scopeSelector)) {
                        cssText = this._scopeSelectors(cssText, scopeSelector, hostSelector);
                    }
                    cssText = cssText + '\n' + unscoped;
                    return cssText.trim();
                };
                /*
                 * Process styles to add rules which will only apply under the polyfill
                 * and do not process via CSSOM. (CSSOM is destructive to rules on rare
                 * occasions, e.g. -webkit-calc on Safari.)
                 * For example, we convert this rule:
                 *
                 * @polyfill-unscoped-rule {
                 *   content: 'menu-item';
                 * ... }
                 *
                 * to this:
                 *
                 * menu-item {...}
                 *
                **/
                ShadowCss.prototype._extractUnscopedRulesFromCssText = function (cssText) {
                    // Difference with webcomponents.js: does not handle comments
                    var r = '', m;
                    var matcher = lang_1.RegExpWrapper.matcher(_cssContentUnscopedRuleRe, cssText);
                    while (lang_1.isPresent(m = lang_1.RegExpMatcherWrapper.next(matcher))) {
                        var rule = m[0];
                        rule = lang_1.StringWrapper.replace(rule, m[2], '');
                        rule = lang_1.StringWrapper.replace(rule, m[1], m[3]);
                        r += rule + '\n\n';
                    }
                    return r;
                };
                /*
                 * convert a rule like :host(.foo) > .bar { }
                 *
                 * to
                 *
                 * scopeName.foo > .bar
                */
                ShadowCss.prototype._convertColonHost = function (cssText) {
                    return this._convertColonRule(cssText, _cssColonHostRe, this._colonHostPartReplacer);
                };
                /*
                 * convert a rule like :host-context(.foo) > .bar { }
                 *
                 * to
                 *
                 * scopeName.foo > .bar, .foo scopeName > .bar { }
                 *
                 * and
                 *
                 * :host-context(.foo:host) .bar { ... }
                 *
                 * to
                 *
                 * scopeName.foo .bar { ... }
                */
                ShadowCss.prototype._convertColonHostContext = function (cssText) {
                    return this._convertColonRule(cssText, _cssColonHostContextRe, this._colonHostContextPartReplacer);
                };
                ShadowCss.prototype._convertColonRule = function (cssText, regExp, partReplacer) {
                    // p1 = :host, p2 = contents of (), p3 rest of rule
                    return lang_1.StringWrapper.replaceAllMapped(cssText, regExp, function (m) {
                        if (lang_1.isPresent(m[2])) {
                            var parts = m[2].split(','), r = [];
                            for (var i = 0; i < parts.length; i++) {
                                var p = parts[i];
                                if (lang_1.isBlank(p))
                                    break;
                                p = p.trim();
                                r.push(partReplacer(_polyfillHostNoCombinator, p, m[3]));
                            }
                            return r.join(',');
                        }
                        else {
                            return _polyfillHostNoCombinator + m[3];
                        }
                    });
                };
                ShadowCss.prototype._colonHostContextPartReplacer = function (host, part, suffix) {
                    if (lang_1.StringWrapper.contains(part, _polyfillHost)) {
                        return this._colonHostPartReplacer(host, part, suffix);
                    }
                    else {
                        return host + part + suffix + ', ' + part + ' ' + host + suffix;
                    }
                };
                ShadowCss.prototype._colonHostPartReplacer = function (host, part, suffix) {
                    return host + lang_1.StringWrapper.replace(part, _polyfillHost, '') + suffix;
                };
                /*
                 * Convert combinators like ::shadow and pseudo-elements like ::content
                 * by replacing with space.
                */
                ShadowCss.prototype._convertShadowDOMSelectors = function (cssText) {
                    for (var i = 0; i < _shadowDOMSelectorsRe.length; i++) {
                        cssText = lang_1.StringWrapper.replaceAll(cssText, _shadowDOMSelectorsRe[i], ' ');
                    }
                    return cssText;
                };
                // change a selector like 'div' to 'name div'
                ShadowCss.prototype._scopeSelectors = function (cssText, scopeSelector, hostSelector) {
                    var _this = this;
                    return processRules(cssText, function (rule) {
                        var selector = rule.selector;
                        var content = rule.content;
                        if (rule.selector[0] != '@' || rule.selector.startsWith('@page')) {
                            selector =
                                _this._scopeSelector(rule.selector, scopeSelector, hostSelector, _this.strictStyling);
                        }
                        else if (rule.selector.startsWith('@media')) {
                            content = _this._scopeSelectors(rule.content, scopeSelector, hostSelector);
                        }
                        return new CssRule(selector, content);
                    });
                };
                ShadowCss.prototype._scopeSelector = function (selector, scopeSelector, hostSelector, strict) {
                    var r = [], parts = selector.split(',');
                    for (var i = 0; i < parts.length; i++) {
                        var p = parts[i].trim();
                        var deepParts = lang_1.StringWrapper.split(p, _shadowDeepSelectors);
                        var shallowPart = deepParts[0];
                        if (this._selectorNeedsScoping(shallowPart, scopeSelector)) {
                            deepParts[0] = strict && !lang_1.StringWrapper.contains(shallowPart, _polyfillHostNoCombinator) ?
                                this._applyStrictSelectorScope(shallowPart, scopeSelector) :
                                this._applySelectorScope(shallowPart, scopeSelector, hostSelector);
                        }
                        // replace /deep/ with a space for child selectors
                        r.push(deepParts.join(' '));
                    }
                    return r.join(', ');
                };
                ShadowCss.prototype._selectorNeedsScoping = function (selector, scopeSelector) {
                    var re = this._makeScopeMatcher(scopeSelector);
                    return !lang_1.isPresent(lang_1.RegExpWrapper.firstMatch(re, selector));
                };
                ShadowCss.prototype._makeScopeMatcher = function (scopeSelector) {
                    var lre = /\[/g;
                    var rre = /\]/g;
                    scopeSelector = lang_1.StringWrapper.replaceAll(scopeSelector, lre, '\\[');
                    scopeSelector = lang_1.StringWrapper.replaceAll(scopeSelector, rre, '\\]');
                    return lang_1.RegExpWrapper.create('^(' + scopeSelector + ')' + _selectorReSuffix, 'm');
                };
                ShadowCss.prototype._applySelectorScope = function (selector, scopeSelector, hostSelector) {
                    // Difference from webcomponentsjs: scopeSelector could not be an array
                    return this._applySimpleSelectorScope(selector, scopeSelector, hostSelector);
                };
                // scope via name and [is=name]
                ShadowCss.prototype._applySimpleSelectorScope = function (selector, scopeSelector, hostSelector) {
                    if (lang_1.isPresent(lang_1.RegExpWrapper.firstMatch(_polyfillHostRe, selector))) {
                        var replaceBy = this.strictStyling ? "[" + hostSelector + "]" : scopeSelector;
                        selector = lang_1.StringWrapper.replace(selector, _polyfillHostNoCombinator, replaceBy);
                        return lang_1.StringWrapper.replaceAll(selector, _polyfillHostRe, replaceBy + ' ');
                    }
                    else {
                        return scopeSelector + ' ' + selector;
                    }
                };
                // return a selector with [name] suffix on each simple selector
                // e.g. .foo.bar > .zot becomes .foo[name].bar[name] > .zot[name]  /** @internal */
                ShadowCss.prototype._applyStrictSelectorScope = function (selector, scopeSelector) {
                    var isRe = /\[is=([^\]]*)\]/g;
                    scopeSelector = lang_1.StringWrapper.replaceAllMapped(scopeSelector, isRe, function (m) { return m[1]; });
                    var splits = [' ', '>', '+', '~'], scoped = selector, attrName = '[' + scopeSelector + ']';
                    for (var i = 0; i < splits.length; i++) {
                        var sep = splits[i];
                        var parts = scoped.split(sep);
                        scoped = parts.map(function (p) {
                            // remove :host since it should be unnecessary
                            var t = lang_1.StringWrapper.replaceAll(p.trim(), _polyfillHostRe, '');
                            if (t.length > 0 && !collection_1.ListWrapper.contains(splits, t) &&
                                !lang_1.StringWrapper.contains(t, attrName)) {
                                var re = /([^:]*)(:*)(.*)/g;
                                var m = lang_1.RegExpWrapper.firstMatch(re, t);
                                if (lang_1.isPresent(m)) {
                                    p = m[1] + attrName + m[2] + m[3];
                                }
                            }
                            return p;
                        })
                            .join(sep);
                    }
                    return scoped;
                };
                ShadowCss.prototype._insertPolyfillHostInCssText = function (selector) {
                    selector = lang_1.StringWrapper.replaceAll(selector, _colonHostContextRe, _polyfillHostContext);
                    selector = lang_1.StringWrapper.replaceAll(selector, _colonHostRe, _polyfillHost);
                    return selector;
                };
                return ShadowCss;
            }());
            exports_1("ShadowCss", ShadowCss);
            _cssContentNextSelectorRe = /polyfill-next-selector[^}]*content:[\s]*?['"](.*?)['"][;\s]*}([^{]*?){/gim;
            _cssContentRuleRe = /(polyfill-rule)[^}]*(content:[\s]*['"](.*?)['"])[;\s]*[^}]*}/gim;
            _cssContentUnscopedRuleRe = /(polyfill-unscoped-rule)[^}]*(content:[\s]*['"](.*?)['"])[;\s]*[^}]*}/gim;
            _polyfillHost = '-shadowcsshost';
            // note: :host-context pre-processed to -shadowcsshostcontext.
            _polyfillHostContext = '-shadowcsscontext';
            _parenSuffix = ')(?:\\((' +
                '(?:\\([^)(]*\\)|[^)(]*)+?' +
                ')\\))?([^,{]*)';
            _cssColonHostRe = lang_1.RegExpWrapper.create('(' + _polyfillHost + _parenSuffix, 'im');
            _cssColonHostContextRe = lang_1.RegExpWrapper.create('(' + _polyfillHostContext + _parenSuffix, 'im');
            _polyfillHostNoCombinator = _polyfillHost + '-no-combinator';
            _shadowDOMSelectorsRe = [
                /::shadow/g,
                /::content/g,
                // Deprecated selectors
                // TODO(vicb): see https://github.com/angular/clang-format/issues/16
                // clang-format off
                /\/shadow-deep\//g,
                /\/shadow\//g,
            ];
            _shadowDeepSelectors = /(?:>>>)|(?:\/deep\/)/g;
            _selectorReSuffix = '([>\\s~+\[.,{:][\\s\\S]*)?$';
            _polyfillHostRe = lang_1.RegExpWrapper.create(_polyfillHost, 'im');
            _colonHostRe = /:host/gim;
            _colonHostContextRe = /:host-context/gim;
            _commentRe = /\/\*[\s\S]*?\*\//g;
            _ruleRe = /(\s*)([^;\{\}]+?)(\s*)((?:{%BLOCK%}?\s*;?)|(?:\s*;))/g;
            _curlyRe = /([{}])/g;
            OPEN_CURLY = '{';
            CLOSE_CURLY = '}';
            BLOCK_PLACEHOLDER = '%BLOCK%';
            CssRule = (function () {
                function CssRule(selector, content) {
                    this.selector = selector;
                    this.content = content;
                }
                return CssRule;
            }());
            exports_1("CssRule", CssRule);
            StringWithEscapedBlocks = (function () {
                function StringWithEscapedBlocks(escapedString, blocks) {
                    this.escapedString = escapedString;
                    this.blocks = blocks;
                }
                return StringWithEscapedBlocks;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL3NoYWRvd19jc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzttQkF1YUkseUJBQXlCLEVBRXpCLGlCQUFpQixFQUNqQix5QkFBeUIsRUFFekIsYUFBYSxFQUViLG9CQUFvQixFQUNwQixZQUFZLEVBR1osZUFBZSxFQUNmLHNCQUFzQixFQUN0Qix5QkFBeUIsRUFDekIscUJBQXFCLEVBVXJCLG9CQUFvQixFQUNwQixpQkFBaUIsRUFDakIsZUFBZSxFQUNmLFlBQVksRUFDWixtQkFBbUIsRUFFbkIsVUFBVSxFQU1WLE9BQU8sRUFDUCxRQUFRLEVBQ04sVUFBVSxFQUNWLFdBQVcsRUFDWCxpQkFBaUI7SUFSdkIsdUJBQXVCLEtBQVk7UUFDakMsTUFBTSxDQUFDLG9CQUFhLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxVQUFDLENBQUMsSUFBSyxPQUFBLEVBQUUsRUFBRixDQUFFLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBWUQsc0JBQTZCLEtBQVksRUFBRSxZQUFxQjtRQUM5RCxJQUFJLHNCQUFzQixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRCxJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUM7UUFDdkIsTUFBTSxDQUFDLG9CQUFhLENBQUMsZ0JBQWdCLENBQUMsc0JBQXNCLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxVQUFTLENBQUM7WUFDN0YsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNqQixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxD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QUksQ0FBQyxDQUFDO1lBQy9GLHlCQUF5QixHQUFHLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQztZQUM3RCxxQkFBcUIsR0FBRztnQkFDMUIsV0FBVztnQkFDWCxZQUFZO2dCQUNaLHVCQUF1QjtnQkFDdkIsb0VBQW9FO2dCQUNwRSxtQkFBbUI7Z0JBQ25CLGtCQUFrQjtnQkFDbEIsYUFBYTthQUVkLENBQUM7WUFDRSxvQkFBb0IsR0FBRyx1QkFBdUIsQ0FBQztZQUMvQyxpQkFBaUIsR0FBRyw2QkFBNkIsQ0FBQztZQUNsRCxlQUFlLEdBQUcsb0JBQWEsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzVELFlBQVksR0FBRyxVQUFVLENBQUM7WUFDMUIsbUJBQW1CLEdBQUcsa0JBQWtCLENBQUM7WUFFekMsVUFBVSxHQUFHLG1CQUFtQixDQUFDO1lBTWpDLE9BQU8sR0FBRyx1REFBdUQsQ0FBQztZQUNsRSxRQUFRLEdBQUcsU0FBUyxDQUFDO1lBQ25CLFVBQVUsR0FBRyxHQUFHLENBQUM7WUFDakIsV0FBVyxHQUFHLEdBQUcsQ0FBQztZQUNsQixpQkFBaUIsR0FBRyxTQUFTLENBQUM7WUFFcEM7Z0JBQ0UsaUJBQW1CLFFBQWUsRUFBUyxPQUFjO29CQUF0QyxhQUFRLEdBQVIsUUFBUSxDQUFPO29CQUFTLFlBQU8sR0FBUCxPQUFPLENBQU87Z0JBQUcsQ0FBQztnQkFDL0QsY0FBQztZQUFELENBRkEsQUFFQyxJQUFBO1lBRkQsNkJBRUMsQ0FBQTtZQW9CRDtnQkFDRSxpQ0FBbUIsYUFBb0IsRUFBUyxNQUFlO29CQUE1QyxrQkFBYSxHQUFiLGFBQWEsQ0FBTztvQkFBUyxXQUFNLEdBQU4sTUFBTSxDQUFTO2dCQUFHLENBQUM7Z0JBQ3JFLDhCQUFDO1lBQUQsQ0FGQSxBQUVDLElBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29tcGlsZXIvc2hhZG93X2Nzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TGlzdFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge1xuICBTdHJpbmdXcmFwcGVyLFxuICBSZWdFeHAsXG4gIFJlZ0V4cFdyYXBwZXIsXG4gIFJlZ0V4cE1hdGNoZXJXcmFwcGVyLFxuICBpc1ByZXNlbnQsXG4gIGlzQmxhbmtcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuLyoqXG4gKiBUaGlzIGZpbGUgaXMgYSBwb3J0IG9mIHNoYWRvd0NTUyBmcm9tIHdlYmNvbXBvbmVudHMuanMgdG8gVHlwZVNjcmlwdC5cbiAqXG4gKiBQbGVhc2UgbWFrZSBzdXJlIHRvIGtlZXAgdG8gZWRpdHMgaW4gc3luYyB3aXRoIHRoZSBzb3VyY2UgZmlsZS5cbiAqXG4gKiBTb3VyY2U6XG4gKiBodHRwczovL2dpdGh1Yi5jb20vd2ViY29tcG9uZW50cy93ZWJjb21wb25lbnRzanMvYmxvYi80ZWZlY2Q3ZTBlL3NyYy9TaGFkb3dDU1MvU2hhZG93Q1NTLmpzXG4gKlxuICogVGhlIG9yaWdpbmFsIGZpbGUgbGV2ZWwgY29tbWVudCBpcyByZXByb2R1Y2VkIGJlbG93XG4gKi9cblxuLypcbiAgVGhpcyBpcyBhIGxpbWl0ZWQgc2hpbSBmb3IgU2hhZG93RE9NIGNzcyBzdHlsaW5nLlxuICBodHRwczovL2R2Y3MudzMub3JnL2hnL3dlYmNvbXBvbmVudHMvcmF3LWZpbGUvdGlwL3NwZWMvc2hhZG93L2luZGV4Lmh0bWwjc3R5bGVzXG5cbiAgVGhlIGludGVudGlvbiBoZXJlIGlzIHRvIHN1cHBvcnQgb25seSB0aGUgc3R5bGluZyBmZWF0dXJlcyB3aGljaCBjYW4gYmVcbiAgcmVsYXRpdmVseSBzaW1wbHkgaW1wbGVtZW50ZWQuIFRoZSBnb2FsIGlzIHRvIGFsbG93IHVzZXJzIHRvIGF2b2lkIHRoZVxuICBtb3N0IG9idmlvdXMgcGl0ZmFsbHMgYW5kIGRvIHNvIHdpdGhvdXQgY29tcHJvbWlzaW5nIHBlcmZvcm1hbmNlIHNpZ25pZmljYW50bHkuXG4gIEZvciBTaGFkb3dET00gc3R5bGluZyB0aGF0J3Mgbm90IGNvdmVyZWQgaGVyZSwgYSBzZXQgb2YgYmVzdCBwcmFjdGljZXNcbiAgY2FuIGJlIHByb3ZpZGVkIHRoYXQgc2hvdWxkIGFsbG93IHVzZXJzIHRvIGFjY29tcGxpc2ggbW9yZSBjb21wbGV4IHN0eWxpbmcuXG5cbiAgVGhlIGZvbGxvd2luZyBpcyBhIGxpc3Qgb2Ygc3BlY2lmaWMgU2hhZG93RE9NIHN0eWxpbmcgZmVhdHVyZXMgYW5kIGEgYnJpZWZcbiAgZGlzY3Vzc2lvbiBvZiB0aGUgYXBwcm9hY2ggdXNlZCB0byBzaGltLlxuXG4gIFNoaW1tZWQgZmVhdHVyZXM6XG5cbiAgKiA6aG9zdCwgOmhvc3QtY29udGV4dDogU2hhZG93RE9NIGFsbG93cyBzdHlsaW5nIG9mIHRoZSBzaGFkb3dSb290J3MgaG9zdFxuICBlbGVtZW50IHVzaW5nIHRoZSA6aG9zdCBydWxlLiBUbyBzaGltIHRoaXMgZmVhdHVyZSwgdGhlIDpob3N0IHN0eWxlcyBhcmVcbiAgcmVmb3JtYXR0ZWQgYW5kIHByZWZpeGVkIHdpdGggYSBnaXZlbiBzY29wZSBuYW1lIGFuZCBwcm9tb3RlZCB0byBhXG4gIGRvY3VtZW50IGxldmVsIHN0eWxlc2hlZXQuXG4gIEZvciBleGFtcGxlLCBnaXZlbiBhIHNjb3BlIG5hbWUgb2YgLmZvbywgYSBydWxlIGxpa2UgdGhpczpcblxuICAgIDpob3N0IHtcbiAgICAgICAgYmFja2dyb3VuZDogcmVkO1xuICAgICAgfVxuICAgIH1cblxuICBiZWNvbWVzOlxuXG4gICAgLmZvbyB7XG4gICAgICBiYWNrZ3JvdW5kOiByZWQ7XG4gICAgfVxuXG4gICogZW5jYXBzdWx0aW9uOiBTdHlsZXMgZGVmaW5lZCB3aXRoaW4gU2hhZG93RE9NLCBhcHBseSBvbmx5IHRvXG4gIGRvbSBpbnNpZGUgdGhlIFNoYWRvd0RPTS4gUG9seW1lciB1c2VzIG9uZSBvZiB0d28gdGVjaG5pcXVlcyB0byBpbXBsZW1lbnRcbiAgdGhpcyBmZWF0dXJlLlxuXG4gIEJ5IGRlZmF1bHQsIHJ1bGVzIGFyZSBwcmVmaXhlZCB3aXRoIHRoZSBob3N0IGVsZW1lbnQgdGFnIG5hbWVcbiAgYXMgYSBkZXNjZW5kYW50IHNlbGVjdG9yLiBUaGlzIGVuc3VyZXMgc3R5bGluZyBkb2VzIG5vdCBsZWFrIG91dCBvZiB0aGUgJ3RvcCdcbiAgb2YgdGhlIGVsZW1lbnQncyBTaGFkb3dET00uIEZvciBleGFtcGxlLFxuXG4gIGRpdiB7XG4gICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB9XG5cbiAgYmVjb21lczpcblxuICB4LWZvbyBkaXYge1xuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgfVxuXG4gIGJlY29tZXM6XG5cblxuICBBbHRlcm5hdGl2ZWx5LCBpZiBXZWJDb21wb25lbnRzLlNoYWRvd0NTUy5zdHJpY3RTdHlsaW5nIGlzIHNldCB0byB0cnVlIHRoZW5cbiAgc2VsZWN0b3JzIGFyZSBzY29wZWQgYnkgYWRkaW5nIGFuIGF0dHJpYnV0ZSBzZWxlY3RvciBzdWZmaXggdG8gZWFjaFxuICBzaW1wbGUgc2VsZWN0b3IgdGhhdCBjb250YWlucyB0aGUgaG9zdCBlbGVtZW50IHRhZyBuYW1lLiBFYWNoIGVsZW1lbnRcbiAgaW4gdGhlIGVsZW1lbnQncyBTaGFkb3dET00gdGVtcGxhdGUgaXMgYWxzbyBnaXZlbiB0aGUgc2NvcGUgYXR0cmlidXRlLlxuICBUaHVzLCB0aGVzZSBydWxlcyBtYXRjaCBvbmx5IGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgc2NvcGUgYXR0cmlidXRlLlxuICBGb3IgZXhhbXBsZSwgZ2l2ZW4gYSBzY29wZSBuYW1lIG9mIHgtZm9vLCBhIHJ1bGUgbGlrZSB0aGlzOlxuXG4gICAgZGl2IHtcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIH1cblxuICBiZWNvbWVzOlxuXG4gICAgZGl2W3gtZm9vXSB7XG4gICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB9XG5cbiAgTm90ZSB0aGF0IGVsZW1lbnRzIHRoYXQgYXJlIGR5bmFtaWNhbGx5IGFkZGVkIHRvIGEgc2NvcGUgbXVzdCBoYXZlIHRoZSBzY29wZVxuICBzZWxlY3RvciBhZGRlZCB0byB0aGVtIG1hbnVhbGx5LlxuXG4gICogdXBwZXIvbG93ZXIgYm91bmQgZW5jYXBzdWxhdGlvbjogU3R5bGVzIHdoaWNoIGFyZSBkZWZpbmVkIG91dHNpZGUgYVxuICBzaGFkb3dSb290IHNob3VsZCBub3QgY3Jvc3MgdGhlIFNoYWRvd0RPTSBib3VuZGFyeSBhbmQgc2hvdWxkIG5vdCBhcHBseVxuICBpbnNpZGUgYSBzaGFkb3dSb290LlxuXG4gIFRoaXMgc3R5bGluZyBiZWhhdmlvciBpcyBub3QgZW11bGF0ZWQuIFNvbWUgcG9zc2libGUgd2F5cyB0byBkbyB0aGlzIHRoYXRcbiAgd2VyZSByZWplY3RlZCBkdWUgdG8gY29tcGxleGl0eSBhbmQvb3IgcGVyZm9ybWFuY2UgY29uY2VybnMgaW5jbHVkZTogKDEpIHJlc2V0XG4gIGV2ZXJ5IHBvc3NpYmxlIHByb3BlcnR5IGZvciBldmVyeSBwb3NzaWJsZSBzZWxlY3RvciBmb3IgYSBnaXZlbiBzY29wZSBuYW1lO1xuICAoMikgcmUtaW1wbGVtZW50IGNzcyBpbiBqYXZhc2NyaXB0LlxuXG4gIEFzIGFuIGFsdGVybmF0aXZlLCB1c2VycyBzaG91bGQgbWFrZSBzdXJlIHRvIHVzZSBzZWxlY3RvcnNcbiAgc3BlY2lmaWMgdG8gdGhlIHNjb3BlIGluIHdoaWNoIHRoZXkgYXJlIHdvcmtpbmcuXG5cbiAgKiA6OmRpc3RyaWJ1dGVkOiBUaGlzIGJlaGF2aW9yIGlzIG5vdCBlbXVsYXRlZC4gSXQncyBvZnRlbiBub3QgbmVjZXNzYXJ5XG4gIHRvIHN0eWxlIHRoZSBjb250ZW50cyBvZiBhIHNwZWNpZmljIGluc2VydGlvbiBwb2ludCBhbmQgaW5zdGVhZCwgZGVzY2VuZGFudHNcbiAgb2YgdGhlIGhvc3QgZWxlbWVudCBjYW4gYmUgc3R5bGVkIHNlbGVjdGl2ZWx5LiBVc2VycyBjYW4gYWxzbyBjcmVhdGUgYW5cbiAgZXh0cmEgbm9kZSBhcm91bmQgYW4gaW5zZXJ0aW9uIHBvaW50IGFuZCBzdHlsZSB0aGF0IG5vZGUncyBjb250ZW50c1xuICB2aWEgZGVzY2VuZGVudCBzZWxlY3RvcnMuIEZvciBleGFtcGxlLCB3aXRoIGEgc2hhZG93Um9vdCBsaWtlIHRoaXM6XG5cbiAgICA8c3R5bGU+XG4gICAgICA6OmNvbnRlbnQoZGl2KSB7XG4gICAgICAgIGJhY2tncm91bmQ6IHJlZDtcbiAgICAgIH1cbiAgICA8L3N0eWxlPlxuICAgIDxjb250ZW50PjwvY29udGVudD5cblxuICBjb3VsZCBiZWNvbWU6XG5cbiAgICA8c3R5bGU+XG4gICAgICAvICpAcG9seWZpbGwgLmNvbnRlbnQtY29udGFpbmVyIGRpdiAqIC9cbiAgICAgIDo6Y29udGVudChkaXYpIHtcbiAgICAgICAgYmFja2dyb3VuZDogcmVkO1xuICAgICAgfVxuICAgIDwvc3R5bGU+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRlbnQtY29udGFpbmVyXCI+XG4gICAgICA8Y29udGVudD48L2NvbnRlbnQ+XG4gICAgPC9kaXY+XG5cbiAgTm90ZSB0aGUgdXNlIG9mIEBwb2x5ZmlsbCBpbiB0aGUgY29tbWVudCBhYm92ZSBhIFNoYWRvd0RPTSBzcGVjaWZpYyBzdHlsZVxuICBkZWNsYXJhdGlvbi4gVGhpcyBpcyBhIGRpcmVjdGl2ZSB0byB0aGUgc3R5bGluZyBzaGltIHRvIHVzZSB0aGUgc2VsZWN0b3JcbiAgaW4gY29tbWVudHMgaW4gbGlldSBvZiB0aGUgbmV4dCBzZWxlY3RvciB3aGVuIHJ1bm5pbmcgdW5kZXIgcG9seWZpbGwuXG4qL1xuXG5leHBvcnQgY2xhc3MgU2hhZG93Q3NzIHtcbiAgc3RyaWN0U3R5bGluZzogYm9vbGVhbiA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIC8qXG4gICogU2hpbSBzb21lIGNzc1RleHQgd2l0aCB0aGUgZ2l2ZW4gc2VsZWN0b3IuIFJldHVybnMgY3NzVGV4dCB0aGF0IGNhblxuICAqIGJlIGluY2x1ZGVkIGluIHRoZSBkb2N1bWVudCB2aWEgV2ViQ29tcG9uZW50cy5TaGFkb3dDU1MuYWRkQ3NzVG9Eb2N1bWVudChjc3MpLlxuICAqXG4gICogV2hlbiBzdHJpY3RTdHlsaW5nIGlzIHRydWU6XG4gICogLSBzZWxlY3RvciBpcyB0aGUgYXR0cmlidXRlIGFkZGVkIHRvIGFsbCBlbGVtZW50cyBpbnNpZGUgdGhlIGhvc3QsXG4gICogLSBob3N0U2VsZWN0b3IgaXMgdGhlIGF0dHJpYnV0ZSBhZGRlZCB0byB0aGUgaG9zdCBpdHNlbGYuXG4gICovXG4gIHNoaW1Dc3NUZXh0KGNzc1RleHQ6IHN0cmluZywgc2VsZWN0b3I6IHN0cmluZywgaG9zdFNlbGVjdG9yOiBzdHJpbmcgPSAnJyk6IHN0cmluZyB7XG4gICAgY3NzVGV4dCA9IHN0cmlwQ29tbWVudHMoY3NzVGV4dCk7XG4gICAgY3NzVGV4dCA9IHRoaXMuX2luc2VydERpcmVjdGl2ZXMoY3NzVGV4dCk7XG4gICAgcmV0dXJuIHRoaXMuX3Njb3BlQ3NzVGV4dChjc3NUZXh0LCBzZWxlY3RvciwgaG9zdFNlbGVjdG9yKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luc2VydERpcmVjdGl2ZXMoY3NzVGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjc3NUZXh0ID0gdGhpcy5faW5zZXJ0UG9seWZpbGxEaXJlY3RpdmVzSW5Dc3NUZXh0KGNzc1RleHQpO1xuICAgIHJldHVybiB0aGlzLl9pbnNlcnRQb2x5ZmlsbFJ1bGVzSW5Dc3NUZXh0KGNzc1RleHQpO1xuICB9XG5cbiAgLypcbiAgICogUHJvY2VzcyBzdHlsZXMgdG8gY29udmVydCBuYXRpdmUgU2hhZG93RE9NIHJ1bGVzIHRoYXQgd2lsbCB0cmlwXG4gICAqIHVwIHRoZSBjc3MgcGFyc2VyOyB3ZSByZWx5IG9uIGRlY29yYXRpbmcgdGhlIHN0eWxlc2hlZXQgd2l0aCBpbmVydCBydWxlcy5cbiAgICpcbiAgICogRm9yIGV4YW1wbGUsIHdlIGNvbnZlcnQgdGhpcyBydWxlOlxuICAgKlxuICAgKiBwb2x5ZmlsbC1uZXh0LXNlbGVjdG9yIHsgY29udGVudDogJzpob3N0IG1lbnUtaXRlbSc7IH1cbiAgICogOjpjb250ZW50IG1lbnUtaXRlbSB7XG4gICAqXG4gICAqIHRvIHRoaXM6XG4gICAqXG4gICAqIHNjb3BlTmFtZSBtZW51LWl0ZW0ge1xuICAgKlxuICAqKi9cbiAgcHJpdmF0ZSBfaW5zZXJ0UG9seWZpbGxEaXJlY3RpdmVzSW5Dc3NUZXh0KGNzc1RleHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgLy8gRGlmZmVyZW5jZSB3aXRoIHdlYmNvbXBvbmVudHMuanM6IGRvZXMgbm90IGhhbmRsZSBjb21tZW50c1xuICAgIHJldHVybiBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGxNYXBwZWQoY3NzVGV4dCwgX2Nzc0NvbnRlbnROZXh0U2VsZWN0b3JSZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKG0pIHsgcmV0dXJuIG1bMV0gKyAneyc7IH0pO1xuICB9XG5cbiAgLypcbiAgICogUHJvY2VzcyBzdHlsZXMgdG8gYWRkIHJ1bGVzIHdoaWNoIHdpbGwgb25seSBhcHBseSB1bmRlciB0aGUgcG9seWZpbGxcbiAgICpcbiAgICogRm9yIGV4YW1wbGUsIHdlIGNvbnZlcnQgdGhpcyBydWxlOlxuICAgKlxuICAgKiBwb2x5ZmlsbC1ydWxlIHtcbiAgICogICBjb250ZW50OiAnOmhvc3QgbWVudS1pdGVtJztcbiAgICogLi4uXG4gICAqIH1cbiAgICpcbiAgICogdG8gdGhpczpcbiAgICpcbiAgICogc2NvcGVOYW1lIG1lbnUtaXRlbSB7Li4ufVxuICAgKlxuICAqKi9cbiAgcHJpdmF0ZSBfaW5zZXJ0UG9seWZpbGxSdWxlc0luQ3NzVGV4dChjc3NUZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIC8vIERpZmZlcmVuY2Ugd2l0aCB3ZWJjb21wb25lbnRzLmpzOiBkb2VzIG5vdCBoYW5kbGUgY29tbWVudHNcbiAgICByZXR1cm4gU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsTWFwcGVkKGNzc1RleHQsIF9jc3NDb250ZW50UnVsZVJlLCBmdW5jdGlvbihtKSB7XG4gICAgICB2YXIgcnVsZSA9IG1bMF07XG4gICAgICBydWxlID0gU3RyaW5nV3JhcHBlci5yZXBsYWNlKHJ1bGUsIG1bMV0sICcnKTtcbiAgICAgIHJ1bGUgPSBTdHJpbmdXcmFwcGVyLnJlcGxhY2UocnVsZSwgbVsyXSwgJycpO1xuICAgICAgcmV0dXJuIG1bM10gKyBydWxlO1xuICAgIH0pO1xuICB9XG5cbiAgLyogRW5zdXJlIHN0eWxlcyBhcmUgc2NvcGVkLiBQc2V1ZG8tc2NvcGluZyB0YWtlcyBhIHJ1bGUgbGlrZTpcbiAgICpcbiAgICogIC5mb28gey4uLiB9XG4gICAqXG4gICAqICBhbmQgY29udmVydHMgdGhpcyB0b1xuICAgKlxuICAgKiAgc2NvcGVOYW1lIC5mb28geyAuLi4gfVxuICAqL1xuICBwcml2YXRlIF9zY29wZUNzc1RleHQoY3NzVGV4dDogc3RyaW5nLCBzY29wZVNlbGVjdG9yOiBzdHJpbmcsIGhvc3RTZWxlY3Rvcjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICB2YXIgdW5zY29wZWQgPSB0aGlzLl9leHRyYWN0VW5zY29wZWRSdWxlc0Zyb21Dc3NUZXh0KGNzc1RleHQpO1xuICAgIGNzc1RleHQgPSB0aGlzLl9pbnNlcnRQb2x5ZmlsbEhvc3RJbkNzc1RleHQoY3NzVGV4dCk7XG4gICAgY3NzVGV4dCA9IHRoaXMuX2NvbnZlcnRDb2xvbkhvc3QoY3NzVGV4dCk7XG4gICAgY3NzVGV4dCA9IHRoaXMuX2NvbnZlcnRDb2xvbkhvc3RDb250ZXh0KGNzc1RleHQpO1xuICAgIGNzc1RleHQgPSB0aGlzLl9jb252ZXJ0U2hhZG93RE9NU2VsZWN0b3JzKGNzc1RleHQpO1xuICAgIGlmIChpc1ByZXNlbnQoc2NvcGVTZWxlY3RvcikpIHtcbiAgICAgIGNzc1RleHQgPSB0aGlzLl9zY29wZVNlbGVjdG9ycyhjc3NUZXh0LCBzY29wZVNlbGVjdG9yLCBob3N0U2VsZWN0b3IpO1xuICAgIH1cbiAgICBjc3NUZXh0ID0gY3NzVGV4dCArICdcXG4nICsgdW5zY29wZWQ7XG4gICAgcmV0dXJuIGNzc1RleHQudHJpbSgpO1xuICB9XG5cbiAgLypcbiAgICogUHJvY2VzcyBzdHlsZXMgdG8gYWRkIHJ1bGVzIHdoaWNoIHdpbGwgb25seSBhcHBseSB1bmRlciB0aGUgcG9seWZpbGxcbiAgICogYW5kIGRvIG5vdCBwcm9jZXNzIHZpYSBDU1NPTS4gKENTU09NIGlzIGRlc3RydWN0aXZlIHRvIHJ1bGVzIG9uIHJhcmVcbiAgICogb2NjYXNpb25zLCBlLmcuIC13ZWJraXQtY2FsYyBvbiBTYWZhcmkuKVxuICAgKiBGb3IgZXhhbXBsZSwgd2UgY29udmVydCB0aGlzIHJ1bGU6XG4gICAqXG4gICAqIEBwb2x5ZmlsbC11bnNjb3BlZC1ydWxlIHtcbiAgICogICBjb250ZW50OiAnbWVudS1pdGVtJztcbiAgICogLi4uIH1cbiAgICpcbiAgICogdG8gdGhpczpcbiAgICpcbiAgICogbWVudS1pdGVtIHsuLi59XG4gICAqXG4gICoqL1xuICBwcml2YXRlIF9leHRyYWN0VW5zY29wZWRSdWxlc0Zyb21Dc3NUZXh0KGNzc1RleHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgLy8gRGlmZmVyZW5jZSB3aXRoIHdlYmNvbXBvbmVudHMuanM6IGRvZXMgbm90IGhhbmRsZSBjb21tZW50c1xuICAgIHZhciByID0gJycsIG07XG4gICAgdmFyIG1hdGNoZXIgPSBSZWdFeHBXcmFwcGVyLm1hdGNoZXIoX2Nzc0NvbnRlbnRVbnNjb3BlZFJ1bGVSZSwgY3NzVGV4dCk7XG4gICAgd2hpbGUgKGlzUHJlc2VudChtID0gUmVnRXhwTWF0Y2hlcldyYXBwZXIubmV4dChtYXRjaGVyKSkpIHtcbiAgICAgIHZhciBydWxlID0gbVswXTtcbiAgICAgIHJ1bGUgPSBTdHJpbmdXcmFwcGVyLnJlcGxhY2UocnVsZSwgbVsyXSwgJycpO1xuICAgICAgcnVsZSA9IFN0cmluZ1dyYXBwZXIucmVwbGFjZShydWxlLCBtWzFdLCBtWzNdKTtcbiAgICAgIHIgKz0gcnVsZSArICdcXG5cXG4nO1xuICAgIH1cbiAgICByZXR1cm4gcjtcbiAgfVxuXG4gIC8qXG4gICAqIGNvbnZlcnQgYSBydWxlIGxpa2UgOmhvc3QoLmZvbykgPiAuYmFyIHsgfVxuICAgKlxuICAgKiB0b1xuICAgKlxuICAgKiBzY29wZU5hbWUuZm9vID4gLmJhclxuICAqL1xuICBwcml2YXRlIF9jb252ZXJ0Q29sb25Ib3N0KGNzc1RleHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnZlcnRDb2xvblJ1bGUoY3NzVGV4dCwgX2Nzc0NvbG9uSG9zdFJlLCB0aGlzLl9jb2xvbkhvc3RQYXJ0UmVwbGFjZXIpO1xuICB9XG5cbiAgLypcbiAgICogY29udmVydCBhIHJ1bGUgbGlrZSA6aG9zdC1jb250ZXh0KC5mb28pID4gLmJhciB7IH1cbiAgICpcbiAgICogdG9cbiAgICpcbiAgICogc2NvcGVOYW1lLmZvbyA+IC5iYXIsIC5mb28gc2NvcGVOYW1lID4gLmJhciB7IH1cbiAgICpcbiAgICogYW5kXG4gICAqXG4gICAqIDpob3N0LWNvbnRleHQoLmZvbzpob3N0KSAuYmFyIHsgLi4uIH1cbiAgICpcbiAgICogdG9cbiAgICpcbiAgICogc2NvcGVOYW1lLmZvbyAuYmFyIHsgLi4uIH1cbiAgKi9cbiAgcHJpdmF0ZSBfY29udmVydENvbG9uSG9zdENvbnRleHQoY3NzVGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fY29udmVydENvbG9uUnVsZShjc3NUZXh0LCBfY3NzQ29sb25Ib3N0Q29udGV4dFJlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbG9uSG9zdENvbnRleHRQYXJ0UmVwbGFjZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29udmVydENvbG9uUnVsZShjc3NUZXh0OiBzdHJpbmcsIHJlZ0V4cDogUmVnRXhwLCBwYXJ0UmVwbGFjZXI6IEZ1bmN0aW9uKTogc3RyaW5nIHtcbiAgICAvLyBwMSA9IDpob3N0LCBwMiA9IGNvbnRlbnRzIG9mICgpLCBwMyByZXN0IG9mIHJ1bGVcbiAgICByZXR1cm4gU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsTWFwcGVkKGNzc1RleHQsIHJlZ0V4cCwgZnVuY3Rpb24obSkge1xuICAgICAgaWYgKGlzUHJlc2VudChtWzJdKSkge1xuICAgICAgICB2YXIgcGFydHMgPSBtWzJdLnNwbGl0KCcsJyksIHIgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBwID0gcGFydHNbaV07XG4gICAgICAgICAgaWYgKGlzQmxhbmsocCkpIGJyZWFrO1xuICAgICAgICAgIHAgPSBwLnRyaW0oKTtcbiAgICAgICAgICByLnB1c2gocGFydFJlcGxhY2VyKF9wb2x5ZmlsbEhvc3ROb0NvbWJpbmF0b3IsIHAsIG1bM10pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gci5qb2luKCcsJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gX3BvbHlmaWxsSG9zdE5vQ29tYmluYXRvciArIG1bM107XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9jb2xvbkhvc3RDb250ZXh0UGFydFJlcGxhY2VyKGhvc3Q6IHN0cmluZywgcGFydDogc3RyaW5nLCBzdWZmaXg6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKFN0cmluZ1dyYXBwZXIuY29udGFpbnMocGFydCwgX3BvbHlmaWxsSG9zdCkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb2xvbkhvc3RQYXJ0UmVwbGFjZXIoaG9zdCwgcGFydCwgc3VmZml4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGhvc3QgKyBwYXJ0ICsgc3VmZml4ICsgJywgJyArIHBhcnQgKyAnICcgKyBob3N0ICsgc3VmZml4O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NvbG9uSG9zdFBhcnRSZXBsYWNlcihob3N0OiBzdHJpbmcsIHBhcnQ6IHN0cmluZywgc3VmZml4OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBob3N0ICsgU3RyaW5nV3JhcHBlci5yZXBsYWNlKHBhcnQsIF9wb2x5ZmlsbEhvc3QsICcnKSArIHN1ZmZpeDtcbiAgfVxuXG4gIC8qXG4gICAqIENvbnZlcnQgY29tYmluYXRvcnMgbGlrZSA6OnNoYWRvdyBhbmQgcHNldWRvLWVsZW1lbnRzIGxpa2UgOjpjb250ZW50XG4gICAqIGJ5IHJlcGxhY2luZyB3aXRoIHNwYWNlLlxuICAqL1xuICBwcml2YXRlIF9jb252ZXJ0U2hhZG93RE9NU2VsZWN0b3JzKGNzc1RleHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfc2hhZG93RE9NU2VsZWN0b3JzUmUubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNzc1RleHQgPSBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGwoY3NzVGV4dCwgX3NoYWRvd0RPTVNlbGVjdG9yc1JlW2ldLCAnICcpO1xuICAgIH1cbiAgICByZXR1cm4gY3NzVGV4dDtcbiAgfVxuXG4gIC8vIGNoYW5nZSBhIHNlbGVjdG9yIGxpa2UgJ2RpdicgdG8gJ25hbWUgZGl2J1xuICBwcml2YXRlIF9zY29wZVNlbGVjdG9ycyhjc3NUZXh0OiBzdHJpbmcsIHNjb3BlU2VsZWN0b3I6IHN0cmluZywgaG9zdFNlbGVjdG9yOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBwcm9jZXNzUnVsZXMoY3NzVGV4dCwgKHJ1bGU6IENzc1J1bGUpID0+IHtcbiAgICAgIHZhciBzZWxlY3RvciA9IHJ1bGUuc2VsZWN0b3I7XG4gICAgICB2YXIgY29udGVudCA9IHJ1bGUuY29udGVudDtcbiAgICAgIGlmIChydWxlLnNlbGVjdG9yWzBdICE9ICdAJyB8fCBydWxlLnNlbGVjdG9yLnN0YXJ0c1dpdGgoJ0BwYWdlJykpIHtcbiAgICAgICAgc2VsZWN0b3IgPVxuICAgICAgICAgICAgdGhpcy5fc2NvcGVTZWxlY3RvcihydWxlLnNlbGVjdG9yLCBzY29wZVNlbGVjdG9yLCBob3N0U2VsZWN0b3IsIHRoaXMuc3RyaWN0U3R5bGluZyk7XG4gICAgICB9IGVsc2UgaWYgKHJ1bGUuc2VsZWN0b3Iuc3RhcnRzV2l0aCgnQG1lZGlhJykpIHtcbiAgICAgICAgY29udGVudCA9IHRoaXMuX3Njb3BlU2VsZWN0b3JzKHJ1bGUuY29udGVudCwgc2NvcGVTZWxlY3RvciwgaG9zdFNlbGVjdG9yKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgQ3NzUnVsZShzZWxlY3RvciwgY29udGVudCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9zY29wZVNlbGVjdG9yKHNlbGVjdG9yOiBzdHJpbmcsIHNjb3BlU2VsZWN0b3I6IHN0cmluZywgaG9zdFNlbGVjdG9yOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgc3RyaWN0OiBib29sZWFuKTogc3RyaW5nIHtcbiAgICB2YXIgciA9IFtdLCBwYXJ0cyA9IHNlbGVjdG9yLnNwbGl0KCcsJyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHAgPSBwYXJ0c1tpXS50cmltKCk7XG4gICAgICB2YXIgZGVlcFBhcnRzID0gU3RyaW5nV3JhcHBlci5zcGxpdChwLCBfc2hhZG93RGVlcFNlbGVjdG9ycyk7XG4gICAgICB2YXIgc2hhbGxvd1BhcnQgPSBkZWVwUGFydHNbMF07XG4gICAgICBpZiAodGhpcy5fc2VsZWN0b3JOZWVkc1Njb3Bpbmcoc2hhbGxvd1BhcnQsIHNjb3BlU2VsZWN0b3IpKSB7XG4gICAgICAgIGRlZXBQYXJ0c1swXSA9IHN0cmljdCAmJiAhU3RyaW5nV3JhcHBlci5jb250YWlucyhzaGFsbG93UGFydCwgX3BvbHlmaWxsSG9zdE5vQ29tYmluYXRvcikgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXBwbHlTdHJpY3RTZWxlY3RvclNjb3BlKHNoYWxsb3dQYXJ0LCBzY29wZVNlbGVjdG9yKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hcHBseVNlbGVjdG9yU2NvcGUoc2hhbGxvd1BhcnQsIHNjb3BlU2VsZWN0b3IsIGhvc3RTZWxlY3Rvcik7XG4gICAgICB9XG4gICAgICAvLyByZXBsYWNlIC9kZWVwLyB3aXRoIGEgc3BhY2UgZm9yIGNoaWxkIHNlbGVjdG9yc1xuICAgICAgci5wdXNoKGRlZXBQYXJ0cy5qb2luKCcgJykpO1xuICAgIH1cbiAgICByZXR1cm4gci5qb2luKCcsICcpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2VsZWN0b3JOZWVkc1Njb3Bpbmcoc2VsZWN0b3I6IHN0cmluZywgc2NvcGVTZWxlY3Rvcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgdmFyIHJlID0gdGhpcy5fbWFrZVNjb3BlTWF0Y2hlcihzY29wZVNlbGVjdG9yKTtcbiAgICByZXR1cm4gIWlzUHJlc2VudChSZWdFeHBXcmFwcGVyLmZpcnN0TWF0Y2gocmUsIHNlbGVjdG9yKSk7XG4gIH1cblxuICBwcml2YXRlIF9tYWtlU2NvcGVNYXRjaGVyKHNjb3BlU2VsZWN0b3I6IHN0cmluZyk6IFJlZ0V4cCB7XG4gICAgdmFyIGxyZSA9IC9cXFsvZztcbiAgICB2YXIgcnJlID0gL1xcXS9nO1xuICAgIHNjb3BlU2VsZWN0b3IgPSBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGwoc2NvcGVTZWxlY3RvciwgbHJlLCAnXFxcXFsnKTtcbiAgICBzY29wZVNlbGVjdG9yID0gU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsKHNjb3BlU2VsZWN0b3IsIHJyZSwgJ1xcXFxdJyk7XG4gICAgcmV0dXJuIFJlZ0V4cFdyYXBwZXIuY3JlYXRlKCdeKCcgKyBzY29wZVNlbGVjdG9yICsgJyknICsgX3NlbGVjdG9yUmVTdWZmaXgsICdtJyk7XG4gIH1cblxuICBwcml2YXRlIF9hcHBseVNlbGVjdG9yU2NvcGUoc2VsZWN0b3I6IHN0cmluZywgc2NvcGVTZWxlY3Rvcjogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9zdFNlbGVjdG9yOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIC8vIERpZmZlcmVuY2UgZnJvbSB3ZWJjb21wb25lbnRzanM6IHNjb3BlU2VsZWN0b3IgY291bGQgbm90IGJlIGFuIGFycmF5XG4gICAgcmV0dXJuIHRoaXMuX2FwcGx5U2ltcGxlU2VsZWN0b3JTY29wZShzZWxlY3Rvciwgc2NvcGVTZWxlY3RvciwgaG9zdFNlbGVjdG9yKTtcbiAgfVxuXG4gIC8vIHNjb3BlIHZpYSBuYW1lIGFuZCBbaXM9bmFtZV1cbiAgcHJpdmF0ZSBfYXBwbHlTaW1wbGVTZWxlY3RvclNjb3BlKHNlbGVjdG9yOiBzdHJpbmcsIHNjb3BlU2VsZWN0b3I6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvc3RTZWxlY3Rvcjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAoaXNQcmVzZW50KFJlZ0V4cFdyYXBwZXIuZmlyc3RNYXRjaChfcG9seWZpbGxIb3N0UmUsIHNlbGVjdG9yKSkpIHtcbiAgICAgIHZhciByZXBsYWNlQnkgPSB0aGlzLnN0cmljdFN0eWxpbmcgPyBgWyR7aG9zdFNlbGVjdG9yfV1gIDogc2NvcGVTZWxlY3RvcjtcbiAgICAgIHNlbGVjdG9yID0gU3RyaW5nV3JhcHBlci5yZXBsYWNlKHNlbGVjdG9yLCBfcG9seWZpbGxIb3N0Tm9Db21iaW5hdG9yLCByZXBsYWNlQnkpO1xuICAgICAgcmV0dXJuIFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbChzZWxlY3RvciwgX3BvbHlmaWxsSG9zdFJlLCByZXBsYWNlQnkgKyAnICcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc2NvcGVTZWxlY3RvciArICcgJyArIHNlbGVjdG9yO1xuICAgIH1cbiAgfVxuXG4gIC8vIHJldHVybiBhIHNlbGVjdG9yIHdpdGggW25hbWVdIHN1ZmZpeCBvbiBlYWNoIHNpbXBsZSBzZWxlY3RvclxuICAvLyBlLmcuIC5mb28uYmFyID4gLnpvdCBiZWNvbWVzIC5mb29bbmFtZV0uYmFyW25hbWVdID4gLnpvdFtuYW1lXSAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIF9hcHBseVN0cmljdFNlbGVjdG9yU2NvcGUoc2VsZWN0b3I6IHN0cmluZywgc2NvcGVTZWxlY3Rvcjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICB2YXIgaXNSZSA9IC9cXFtpcz0oW15cXF1dKilcXF0vZztcbiAgICBzY29wZVNlbGVjdG9yID0gU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsTWFwcGVkKHNjb3BlU2VsZWN0b3IsIGlzUmUsIChtKSA9PiBtWzFdKTtcbiAgICB2YXIgc3BsaXRzID0gWycgJywgJz4nLCAnKycsICd+J10sIHNjb3BlZCA9IHNlbGVjdG9yLCBhdHRyTmFtZSA9ICdbJyArIHNjb3BlU2VsZWN0b3IgKyAnXSc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzcGxpdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzZXAgPSBzcGxpdHNbaV07XG4gICAgICB2YXIgcGFydHMgPSBzY29wZWQuc3BsaXQoc2VwKTtcbiAgICAgIHNjb3BlZCA9IHBhcnRzLm1hcChwID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgOmhvc3Qgc2luY2UgaXQgc2hvdWxkIGJlIHVubmVjZXNzYXJ5XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGwocC50cmltKCksIF9wb2x5ZmlsbEhvc3RSZSwgJycpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmICh0Lmxlbmd0aCA+IDAgJiYgIUxpc3RXcmFwcGVyLmNvbnRhaW5zKHNwbGl0cywgdCkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIVN0cmluZ1dyYXBwZXIuY29udGFpbnModCwgYXR0ck5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmUgPSAvKFteOl0qKSg6KikoLiopL2c7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbSA9IFJlZ0V4cFdyYXBwZXIuZmlyc3RNYXRjaChyZSwgdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNQcmVzZW50KG0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHAgPSBtWzFdICsgYXR0ck5hbWUgKyBtWzJdICsgbVszXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgLmpvaW4oc2VwKTtcbiAgICB9XG4gICAgcmV0dXJuIHNjb3BlZDtcbiAgfVxuXG4gIHByaXZhdGUgX2luc2VydFBvbHlmaWxsSG9zdEluQ3NzVGV4dChzZWxlY3Rvcjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBzZWxlY3RvciA9IFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbChzZWxlY3RvciwgX2NvbG9uSG9zdENvbnRleHRSZSwgX3BvbHlmaWxsSG9zdENvbnRleHQpO1xuICAgIHNlbGVjdG9yID0gU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsKHNlbGVjdG9yLCBfY29sb25Ib3N0UmUsIF9wb2x5ZmlsbEhvc3QpO1xuICAgIHJldHVybiBzZWxlY3RvcjtcbiAgfVxufVxudmFyIF9jc3NDb250ZW50TmV4dFNlbGVjdG9yUmUgPVxuICAgIC9wb2x5ZmlsbC1uZXh0LXNlbGVjdG9yW159XSpjb250ZW50OltcXHNdKj9bJ1wiXSguKj8pWydcIl1bO1xcc10qfShbXntdKj8pey9naW07XG52YXIgX2Nzc0NvbnRlbnRSdWxlUmUgPSAvKHBvbHlmaWxsLXJ1bGUpW159XSooY29udGVudDpbXFxzXSpbJ1wiXSguKj8pWydcIl0pWztcXHNdKltefV0qfS9naW07XG52YXIgX2Nzc0NvbnRlbnRVbnNjb3BlZFJ1bGVSZSA9XG4gICAgLyhwb2x5ZmlsbC11bnNjb3BlZC1ydWxlKVtefV0qKGNvbnRlbnQ6W1xcc10qWydcIl0oLio/KVsnXCJdKVs7XFxzXSpbXn1dKn0vZ2ltO1xudmFyIF9wb2x5ZmlsbEhvc3QgPSAnLXNoYWRvd2Nzc2hvc3QnO1xuLy8gbm90ZTogOmhvc3QtY29udGV4dCBwcmUtcHJvY2Vzc2VkIHRvIC1zaGFkb3djc3Nob3N0Y29udGV4dC5cbnZhciBfcG9seWZpbGxIb3N0Q29udGV4dCA9ICctc2hhZG93Y3NzY29udGV4dCc7XG52YXIgX3BhcmVuU3VmZml4ID0gJykoPzpcXFxcKCgnICtcbiAgICAgICAgICAgICAgICAgICAnKD86XFxcXChbXikoXSpcXFxcKXxbXikoXSopKz8nICtcbiAgICAgICAgICAgICAgICAgICAnKVxcXFwpKT8oW14se10qKSc7XG52YXIgX2Nzc0NvbG9uSG9zdFJlID0gUmVnRXhwV3JhcHBlci5jcmVhdGUoJygnICsgX3BvbHlmaWxsSG9zdCArIF9wYXJlblN1ZmZpeCwgJ2ltJyk7XG52YXIgX2Nzc0NvbG9uSG9zdENvbnRleHRSZSA9IFJlZ0V4cFdyYXBwZXIuY3JlYXRlKCcoJyArIF9wb2x5ZmlsbEhvc3RDb250ZXh0ICsgX3BhcmVuU3VmZml4LCAnaW0nKTtcbnZhciBfcG9seWZpbGxIb3N0Tm9Db21iaW5hdG9yID0gX3BvbHlmaWxsSG9zdCArICctbm8tY29tYmluYXRvcic7XG52YXIgX3NoYWRvd0RPTVNlbGVjdG9yc1JlID0gW1xuICAvOjpzaGFkb3cvZyxcbiAgLzo6Y29udGVudC9nLFxuICAvLyBEZXByZWNhdGVkIHNlbGVjdG9yc1xuICAvLyBUT0RPKHZpY2IpOiBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvY2xhbmctZm9ybWF0L2lzc3Vlcy8xNlxuICAvLyBjbGFuZy1mb3JtYXQgb2ZmXG4gIC9cXC9zaGFkb3ctZGVlcFxcLy9nLCAgLy8gZm9ybWVyIC9kZWVwL1xuICAvXFwvc2hhZG93XFwvL2csICAgICAgIC8vIGZvcm1lciA6OnNoYWRvd1xuICAvLyBjbGFuZi1mb3JtYXQgb25cbl07XG52YXIgX3NoYWRvd0RlZXBTZWxlY3RvcnMgPSAvKD86Pj4+KXwoPzpcXC9kZWVwXFwvKS9nO1xudmFyIF9zZWxlY3RvclJlU3VmZml4ID0gJyhbPlxcXFxzfitcXFsuLHs6XVtcXFxcc1xcXFxTXSopPyQnO1xudmFyIF9wb2x5ZmlsbEhvc3RSZSA9IFJlZ0V4cFdyYXBwZXIuY3JlYXRlKF9wb2x5ZmlsbEhvc3QsICdpbScpO1xudmFyIF9jb2xvbkhvc3RSZSA9IC86aG9zdC9naW07XG52YXIgX2NvbG9uSG9zdENvbnRleHRSZSA9IC86aG9zdC1jb250ZXh0L2dpbTtcblxudmFyIF9jb21tZW50UmUgPSAvXFwvXFwqW1xcc1xcU10qP1xcKlxcLy9nO1xuXG5mdW5jdGlvbiBzdHJpcENvbW1lbnRzKGlucHV0OnN0cmluZyk6c3RyaW5nIHtcbiAgcmV0dXJuIFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbE1hcHBlZChpbnB1dCwgX2NvbW1lbnRSZSwgKF8pID0+ICcnKTtcbn1cblxudmFyIF9ydWxlUmUgPSAvKFxccyopKFteO1xce1xcfV0rPykoXFxzKikoKD86eyVCTE9DSyV9P1xccyo7Pyl8KD86XFxzKjspKS9nO1xudmFyIF9jdXJseVJlID0gLyhbe31dKS9nO1xuY29uc3QgT1BFTl9DVVJMWSA9ICd7JztcbmNvbnN0IENMT1NFX0NVUkxZID0gJ30nO1xuY29uc3QgQkxPQ0tfUExBQ0VIT0xERVIgPSAnJUJMT0NLJSc7XG5cbmV4cG9ydCBjbGFzcyBDc3NSdWxlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHNlbGVjdG9yOnN0cmluZywgcHVibGljIGNvbnRlbnQ6c3RyaW5nKSB7fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc1J1bGVzKGlucHV0OnN0cmluZywgcnVsZUNhbGxiYWNrOkZ1bmN0aW9uKTpzdHJpbmcge1xuICB2YXIgaW5wdXRXaXRoRXNjYXBlZEJsb2NrcyA9IGVzY2FwZUJsb2NrcyhpbnB1dCk7XG4gIHZhciBuZXh0QmxvY2tJbmRleCA9IDA7XG4gIHJldHVybiBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGxNYXBwZWQoaW5wdXRXaXRoRXNjYXBlZEJsb2Nrcy5lc2NhcGVkU3RyaW5nLCBfcnVsZVJlLCBmdW5jdGlvbihtKSB7XG4gICAgdmFyIHNlbGVjdG9yID0gbVsyXTtcbiAgICB2YXIgY29udGVudCA9ICcnO1xuICAgIHZhciBzdWZmaXggPSBtWzRdO1xuICAgIHZhciBjb250ZW50UHJlZml4ID0gJyc7XG4gICAgaWYgKGlzUHJlc2VudChtWzRdKSAmJiBtWzRdLnN0YXJ0c1dpdGgoJ3snK0JMT0NLX1BMQUNFSE9MREVSKSkge1xuICAgICAgY29udGVudCA9IGlucHV0V2l0aEVzY2FwZWRCbG9ja3MuYmxvY2tzW25leHRCbG9ja0luZGV4KytdO1xuICAgICAgc3VmZml4ID0gbVs0XS5zdWJzdHJpbmcoQkxPQ0tfUExBQ0VIT0xERVIubGVuZ3RoKzEpO1xuICAgICAgY29udGVudFByZWZpeCA9ICd7JztcbiAgICB9XG4gICAgdmFyIHJ1bGUgPSBydWxlQ2FsbGJhY2sobmV3IENzc1J1bGUoc2VsZWN0b3IsIGNvbnRlbnQpKTtcbiAgICByZXR1cm4gYCR7bVsxXX0ke3J1bGUuc2VsZWN0b3J9JHttWzNdfSR7Y29udGVudFByZWZpeH0ke3J1bGUuY29udGVudH0ke3N1ZmZpeH1gO1xuICB9KTtcbn1cblxuY2xhc3MgU3RyaW5nV2l0aEVzY2FwZWRCbG9ja3Mge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZXNjYXBlZFN0cmluZzpzdHJpbmcsIHB1YmxpYyBibG9ja3M6c3RyaW5nW10pIHt9XG59XG5cbmZ1bmN0aW9uIGVzY2FwZUJsb2NrcyhpbnB1dDpzdHJpbmcpOlN0cmluZ1dpdGhFc2NhcGVkQmxvY2tzIHtcbiAgdmFyIGlucHV0UGFydHMgPSBTdHJpbmdXcmFwcGVyLnNwbGl0KGlucHV0LCBfY3VybHlSZSk7XG4gIHZhciByZXN1bHRQYXJ0cyA9IFtdO1xuICB2YXIgZXNjYXBlZEJsb2NrcyA9IFtdO1xuICB2YXIgYnJhY2tldENvdW50ID0gMDtcbiAgdmFyIGN1cnJlbnRCbG9ja1BhcnRzID0gW107XG4gIGZvciAodmFyIHBhcnRJbmRleCA9IDA7IHBhcnRJbmRleDxpbnB1dFBhcnRzLmxlbmd0aDsgcGFydEluZGV4KyspIHtcbiAgICB2YXIgcGFydCA9IGlucHV0UGFydHNbcGFydEluZGV4XTtcbiAgICBpZiAocGFydCA9PSBDTE9TRV9DVVJMWSkge1xuICAgICAgYnJhY2tldENvdW50LS07XG4gICAgfVxuICAgIGlmIChicmFja2V0Q291bnQgPiAwKSB7XG4gICAgICBjdXJyZW50QmxvY2tQYXJ0cy5wdXNoKHBhcnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY3VycmVudEJsb2NrUGFydHMubGVuZ3RoID4gMCkge1xuICAgICAgICBlc2NhcGVkQmxvY2tzLnB1c2goY3VycmVudEJsb2NrUGFydHMuam9pbignJykpO1xuICAgICAgICByZXN1bHRQYXJ0cy5wdXNoKEJMT0NLX1BMQUNFSE9MREVSKTtcbiAgICAgICAgY3VycmVudEJsb2NrUGFydHMgPSBbXTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdFBhcnRzLnB1c2gocGFydCk7XG4gICAgfVxuICAgIGlmIChwYXJ0ID09IE9QRU5fQ1VSTFkpIHtcbiAgICAgIGJyYWNrZXRDb3VudCsrO1xuICAgIH1cbiAgfVxuICBpZiAoY3VycmVudEJsb2NrUGFydHMubGVuZ3RoID4gMCkge1xuICAgIGVzY2FwZWRCbG9ja3MucHVzaChjdXJyZW50QmxvY2tQYXJ0cy5qb2luKCcnKSk7XG4gICAgcmVzdWx0UGFydHMucHVzaChCTE9DS19QTEFDRUhPTERFUik7XG4gIH1cbiAgcmV0dXJuIG5ldyBTdHJpbmdXaXRoRXNjYXBlZEJsb2NrcyhyZXN1bHRQYXJ0cy5qb2luKCcnKSwgZXNjYXBlZEJsb2Nrcyk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
