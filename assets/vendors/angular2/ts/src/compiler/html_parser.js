System.register(['angular2/src/facade/lang', 'angular2/src/facade/collection', './html_ast', 'angular2/src/core/di', './html_lexer', './parse_util', './html_tags'], function(exports_1, context_1) {
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
    var lang_1, collection_1, html_ast_1, di_1, html_lexer_1, parse_util_1, html_tags_1;
    var HtmlTreeError, HtmlParseTreeResult, HtmlParser, TreeBuilder;
    function getElementFullName(prefix, localName, parentElement) {
        if (lang_1.isBlank(prefix)) {
            prefix = html_tags_1.getHtmlTagDefinition(localName).implicitNamespacePrefix;
            if (lang_1.isBlank(prefix) && lang_1.isPresent(parentElement)) {
                prefix = html_tags_1.getNsPrefix(parentElement.name);
            }
        }
        return html_tags_1.mergeNsAndName(prefix, localName);
    }
    function lastOnStack(stack, element) {
        return stack.length > 0 && stack[stack.length - 1] === element;
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (html_ast_1_1) {
                html_ast_1 = html_ast_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (html_lexer_1_1) {
                html_lexer_1 = html_lexer_1_1;
            },
            function (parse_util_1_1) {
                parse_util_1 = parse_util_1_1;
            },
            function (html_tags_1_1) {
                html_tags_1 = html_tags_1_1;
            }],
        execute: function() {
            HtmlTreeError = (function (_super) {
                __extends(HtmlTreeError, _super);
                function HtmlTreeError(elementName, span, msg) {
                    _super.call(this, span, msg);
                    this.elementName = elementName;
                }
                HtmlTreeError.create = function (elementName, span, msg) {
                    return new HtmlTreeError(elementName, span, msg);
                };
                return HtmlTreeError;
            }(parse_util_1.ParseError));
            exports_1("HtmlTreeError", HtmlTreeError);
            HtmlParseTreeResult = (function () {
                function HtmlParseTreeResult(rootNodes, errors) {
                    this.rootNodes = rootNodes;
                    this.errors = errors;
                }
                return HtmlParseTreeResult;
            }());
            exports_1("HtmlParseTreeResult", HtmlParseTreeResult);
            HtmlParser = (function () {
                function HtmlParser() {
                }
                HtmlParser.prototype.parse = function (sourceContent, sourceUrl, parseExpansionForms) {
                    if (parseExpansionForms === void 0) { parseExpansionForms = false; }
                    var tokensAndErrors = html_lexer_1.tokenizeHtml(sourceContent, sourceUrl, parseExpansionForms);
                    var treeAndErrors = new TreeBuilder(tokensAndErrors.tokens).build();
                    return new HtmlParseTreeResult(treeAndErrors.rootNodes, tokensAndErrors.errors
                        .concat(treeAndErrors.errors));
                };
                HtmlParser = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], HtmlParser);
                return HtmlParser;
            }());
            exports_1("HtmlParser", HtmlParser);
            TreeBuilder = (function () {
                function TreeBuilder(tokens) {
                    this.tokens = tokens;
                    this.index = -1;
                    this.rootNodes = [];
                    this.errors = [];
                    this.elementStack = [];
                    this._advance();
                }
                TreeBuilder.prototype.build = function () {
                    while (this.peek.type !== html_lexer_1.HtmlTokenType.EOF) {
                        if (this.peek.type === html_lexer_1.HtmlTokenType.TAG_OPEN_START) {
                            this._consumeStartTag(this._advance());
                        }
                        else if (this.peek.type === html_lexer_1.HtmlTokenType.TAG_CLOSE) {
                            this._consumeEndTag(this._advance());
                        }
                        else if (this.peek.type === html_lexer_1.HtmlTokenType.CDATA_START) {
                            this._closeVoidElement();
                            this._consumeCdata(this._advance());
                        }
                        else if (this.peek.type === html_lexer_1.HtmlTokenType.COMMENT_START) {
                            this._closeVoidElement();
                            this._consumeComment(this._advance());
                        }
                        else if (this.peek.type === html_lexer_1.HtmlTokenType.TEXT ||
                            this.peek.type === html_lexer_1.HtmlTokenType.RAW_TEXT ||
                            this.peek.type === html_lexer_1.HtmlTokenType.ESCAPABLE_RAW_TEXT) {
                            this._closeVoidElement();
                            this._consumeText(this._advance());
                        }
                        else if (this.peek.type === html_lexer_1.HtmlTokenType.EXPANSION_FORM_START) {
                            this._consumeExpansion(this._advance());
                        }
                        else {
                            // Skip all other tokens...
                            this._advance();
                        }
                    }
                    return new HtmlParseTreeResult(this.rootNodes, this.errors);
                };
                TreeBuilder.prototype._advance = function () {
                    var prev = this.peek;
                    if (this.index < this.tokens.length - 1) {
                        // Note: there is always an EOF token at the end
                        this.index++;
                    }
                    this.peek = this.tokens[this.index];
                    return prev;
                };
                TreeBuilder.prototype._advanceIf = function (type) {
                    if (this.peek.type === type) {
                        return this._advance();
                    }
                    return null;
                };
                TreeBuilder.prototype._consumeCdata = function (startToken) {
                    this._consumeText(this._advance());
                    this._advanceIf(html_lexer_1.HtmlTokenType.CDATA_END);
                };
                TreeBuilder.prototype._consumeComment = function (token) {
                    var text = this._advanceIf(html_lexer_1.HtmlTokenType.RAW_TEXT);
                    this._advanceIf(html_lexer_1.HtmlTokenType.COMMENT_END);
                    var value = lang_1.isPresent(text) ? text.parts[0].trim() : null;
                    this._addToParent(new html_ast_1.HtmlCommentAst(value, token.sourceSpan));
                };
                TreeBuilder.prototype._consumeExpansion = function (token) {
                    var switchValue = this._advance();
                    var type = this._advance();
                    var cases = [];
                    // read =
                    while (this.peek.type === html_lexer_1.HtmlTokenType.EXPANSION_CASE_VALUE) {
                        var expCase = this._parseExpansionCase();
                        if (lang_1.isBlank(expCase))
                            return; // error
                        cases.push(expCase);
                    }
                    // read the final }
                    if (this.peek.type !== html_lexer_1.HtmlTokenType.EXPANSION_FORM_END) {
                        this.errors.push(HtmlTreeError.create(null, this.peek.sourceSpan, "Invalid expansion form. Missing '}'."));
                        return;
                    }
                    this._advance();
                    var mainSourceSpan = new parse_util_1.ParseSourceSpan(token.sourceSpan.start, this.peek.sourceSpan.end);
                    this._addToParent(new html_ast_1.HtmlExpansionAst(switchValue.parts[0], type.parts[0], cases, mainSourceSpan, switchValue.sourceSpan));
                };
                TreeBuilder.prototype._parseExpansionCase = function () {
                    var value = this._advance();
                    // read {
                    if (this.peek.type !== html_lexer_1.HtmlTokenType.EXPANSION_CASE_EXP_START) {
                        this.errors.push(HtmlTreeError.create(null, this.peek.sourceSpan, "Invalid expansion form. Missing '{'.,"));
                        return null;
                    }
                    // read until }
                    var start = this._advance();
                    var exp = this._collectExpansionExpTokens(start);
                    if (lang_1.isBlank(exp))
                        return null;
                    var end = this._advance();
                    exp.push(new html_lexer_1.HtmlToken(html_lexer_1.HtmlTokenType.EOF, [], end.sourceSpan));
                    // parse everything in between { and }
                    var parsedExp = new TreeBuilder(exp).build();
                    if (parsedExp.errors.length > 0) {
                        this.errors = this.errors.concat(parsedExp.errors);
                        return null;
                    }
                    var sourceSpan = new parse_util_1.ParseSourceSpan(value.sourceSpan.start, end.sourceSpan.end);
                    var expSourceSpan = new parse_util_1.ParseSourceSpan(start.sourceSpan.start, end.sourceSpan.end);
                    return new html_ast_1.HtmlExpansionCaseAst(value.parts[0], parsedExp.rootNodes, sourceSpan, value.sourceSpan, expSourceSpan);
                };
                TreeBuilder.prototype._collectExpansionExpTokens = function (start) {
                    var exp = [];
                    var expansionFormStack = [html_lexer_1.HtmlTokenType.EXPANSION_CASE_EXP_START];
                    while (true) {
                        if (this.peek.type === html_lexer_1.HtmlTokenType.EXPANSION_FORM_START ||
                            this.peek.type === html_lexer_1.HtmlTokenType.EXPANSION_CASE_EXP_START) {
                            expansionFormStack.push(this.peek.type);
                        }
                        if (this.peek.type === html_lexer_1.HtmlTokenType.EXPANSION_CASE_EXP_END) {
                            if (lastOnStack(expansionFormStack, html_lexer_1.HtmlTokenType.EXPANSION_CASE_EXP_START)) {
                                expansionFormStack.pop();
                                if (expansionFormStack.length == 0)
                                    return exp;
                            }
                            else {
                                this.errors.push(HtmlTreeError.create(null, start.sourceSpan, "Invalid expansion form. Missing '}'."));
                                return null;
                            }
                        }
                        if (this.peek.type === html_lexer_1.HtmlTokenType.EXPANSION_FORM_END) {
                            if (lastOnStack(expansionFormStack, html_lexer_1.HtmlTokenType.EXPANSION_FORM_START)) {
                                expansionFormStack.pop();
                            }
                            else {
                                this.errors.push(HtmlTreeError.create(null, start.sourceSpan, "Invalid expansion form. Missing '}'."));
                                return null;
                            }
                        }
                        if (this.peek.type === html_lexer_1.HtmlTokenType.EOF) {
                            this.errors.push(HtmlTreeError.create(null, start.sourceSpan, "Invalid expansion form. Missing '}'."));
                            return null;
                        }
                        exp.push(this._advance());
                    }
                };
                TreeBuilder.prototype._consumeText = function (token) {
                    var text = token.parts[0];
                    if (text.length > 0 && text[0] == '\n') {
                        var parent_1 = this._getParentElement();
                        if (lang_1.isPresent(parent_1) && parent_1.children.length == 0 &&
                            html_tags_1.getHtmlTagDefinition(parent_1.name).ignoreFirstLf) {
                            text = text.substring(1);
                        }
                    }
                    if (text.length > 0) {
                        this._addToParent(new html_ast_1.HtmlTextAst(text, token.sourceSpan));
                    }
                };
                TreeBuilder.prototype._closeVoidElement = function () {
                    if (this.elementStack.length > 0) {
                        var el = collection_1.ListWrapper.last(this.elementStack);
                        if (html_tags_1.getHtmlTagDefinition(el.name).isVoid) {
                            this.elementStack.pop();
                        }
                    }
                };
                TreeBuilder.prototype._consumeStartTag = function (startTagToken) {
                    var prefix = startTagToken.parts[0];
                    var name = startTagToken.parts[1];
                    var attrs = [];
                    while (this.peek.type === html_lexer_1.HtmlTokenType.ATTR_NAME) {
                        attrs.push(this._consumeAttr(this._advance()));
                    }
                    var fullName = getElementFullName(prefix, name, this._getParentElement());
                    var selfClosing = false;
                    // Note: There could have been a tokenizer error
                    // so that we don't get a token for the end tag...
                    if (this.peek.type === html_lexer_1.HtmlTokenType.TAG_OPEN_END_VOID) {
                        this._advance();
                        selfClosing = true;
                        if (html_tags_1.getNsPrefix(fullName) == null && !html_tags_1.getHtmlTagDefinition(fullName).isVoid) {
                            this.errors.push(HtmlTreeError.create(fullName, startTagToken.sourceSpan, "Only void and foreign elements can be self closed \"" + startTagToken.parts[1] + "\""));
                        }
                    }
                    else if (this.peek.type === html_lexer_1.HtmlTokenType.TAG_OPEN_END) {
                        this._advance();
                        selfClosing = false;
                    }
                    var end = this.peek.sourceSpan.start;
                    var span = new parse_util_1.ParseSourceSpan(startTagToken.sourceSpan.start, end);
                    var el = new html_ast_1.HtmlElementAst(fullName, attrs, [], span, span, null);
                    this._pushElement(el);
                    if (selfClosing) {
                        this._popElement(fullName);
                        el.endSourceSpan = span;
                    }
                };
                TreeBuilder.prototype._pushElement = function (el) {
                    if (this.elementStack.length > 0) {
                        var parentEl = collection_1.ListWrapper.last(this.elementStack);
                        if (html_tags_1.getHtmlTagDefinition(parentEl.name).isClosedByChild(el.name)) {
                            this.elementStack.pop();
                        }
                    }
                    var tagDef = html_tags_1.getHtmlTagDefinition(el.name);
                    var parentEl = this._getParentElement();
                    if (tagDef.requireExtraParent(lang_1.isPresent(parentEl) ? parentEl.name : null)) {
                        var newParent = new html_ast_1.HtmlElementAst(tagDef.parentToAdd, [], [el], el.sourceSpan, el.startSourceSpan, el.endSourceSpan);
                        this._addToParent(newParent);
                        this.elementStack.push(newParent);
                        this.elementStack.push(el);
                    }
                    else {
                        this._addToParent(el);
                        this.elementStack.push(el);
                    }
                };
                TreeBuilder.prototype._consumeEndTag = function (endTagToken) {
                    var fullName = getElementFullName(endTagToken.parts[0], endTagToken.parts[1], this._getParentElement());
                    this._getParentElement().endSourceSpan = endTagToken.sourceSpan;
                    if (html_tags_1.getHtmlTagDefinition(fullName).isVoid) {
                        this.errors.push(HtmlTreeError.create(fullName, endTagToken.sourceSpan, "Void elements do not have end tags \"" + endTagToken.parts[1] + "\""));
                    }
                    else if (!this._popElement(fullName)) {
                        this.errors.push(HtmlTreeError.create(fullName, endTagToken.sourceSpan, "Unexpected closing tag \"" + endTagToken.parts[1] + "\""));
                    }
                };
                TreeBuilder.prototype._popElement = function (fullName) {
                    for (var stackIndex = this.elementStack.length - 1; stackIndex >= 0; stackIndex--) {
                        var el = this.elementStack[stackIndex];
                        if (el.name == fullName) {
                            collection_1.ListWrapper.splice(this.elementStack, stackIndex, this.elementStack.length - stackIndex);
                            return true;
                        }
                        if (!html_tags_1.getHtmlTagDefinition(el.name).closedByParent) {
                            return false;
                        }
                    }
                    return false;
                };
                TreeBuilder.prototype._consumeAttr = function (attrName) {
                    var fullName = html_tags_1.mergeNsAndName(attrName.parts[0], attrName.parts[1]);
                    var end = attrName.sourceSpan.end;
                    var value = '';
                    if (this.peek.type === html_lexer_1.HtmlTokenType.ATTR_VALUE) {
                        var valueToken = this._advance();
                        value = valueToken.parts[0];
                        end = valueToken.sourceSpan.end;
                    }
                    return new html_ast_1.HtmlAttrAst(fullName, value, new parse_util_1.ParseSourceSpan(attrName.sourceSpan.start, end));
                };
                TreeBuilder.prototype._getParentElement = function () {
                    return this.elementStack.length > 0 ? collection_1.ListWrapper.last(this.elementStack) : null;
                };
                TreeBuilder.prototype._addToParent = function (node) {
                    var parent = this._getParentElement();
                    if (lang_1.isPresent(parent)) {
                        parent.children.push(node);
                    }
                    else {
                        this.rootNodes.push(node);
                    }
                };
                return TreeBuilder;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9odG1sX3BhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBbVdBLDRCQUE0QixNQUFjLEVBQUUsU0FBaUIsRUFDakMsYUFBNkI7UUFDdkQsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixNQUFNLEdBQUcsZ0NBQW9CLENBQUMsU0FBUyxDQUFDLENBQUMsdUJBQXVCLENBQUM7WUFDakUsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLGdCQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxNQUFNLEdBQUcsdUJBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0MsQ0FBQztRQUNILENBQUM7UUFFRCxNQUFNLENBQUMsMEJBQWMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELHFCQUFxQixLQUFZLEVBQUUsT0FBWTtRQUM3QyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssT0FBTyxDQUFDO0lBQ2pFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFyVkQ7Z0JBQW1DLGlDQUFVO2dCQUszQyx1QkFBbUIsV0FBbUIsRUFBRSxJQUFxQixFQUFFLEdBQVc7b0JBQUksa0JBQU0sSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUE1RSxnQkFBVyxHQUFYLFdBQVcsQ0FBUTtnQkFBMEQsQ0FBQztnQkFKMUYsb0JBQU0sR0FBYixVQUFjLFdBQW1CLEVBQUUsSUFBcUIsRUFBRSxHQUFXO29CQUNuRSxNQUFNLENBQUMsSUFBSSxhQUFhLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxHQUFH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QUFDO2dCQUVPLGtDQUFZLEdBQXBCLFVBQXFCLElBQWE7b0JBQ2hDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO29CQUN0QyxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzdCLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzVCLENBQUM7Z0JBQ0gsQ0FBQztnQkFDSCxrQkFBQztZQUFELENBOVNBLEFBOFNDLElBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL2h0bWxfcGFyc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgaXNQcmVzZW50LFxuICBpc0JsYW5rLFxuICBTdHJpbmdXcmFwcGVyLFxuICBzdHJpbmdpZnksXG4gIGFzc2VydGlvbnNFbmFibGVkLFxuICBTdHJpbmdKb2luZXIsXG4gIHNlcmlhbGl6ZUVudW0sXG4gIENPTlNUX0VYUFJcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuaW1wb3J0IHtMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcblxuaW1wb3J0IHtcbiAgSHRtbEFzdCxcbiAgSHRtbEF0dHJBc3QsXG4gIEh0bWxUZXh0QXN0LFxuICBIdG1sQ29tbWVudEFzdCxcbiAgSHRtbEVsZW1lbnRBc3QsXG4gIEh0bWxFeHBhbnNpb25Bc3QsXG4gIEh0bWxFeHBhbnNpb25DYXNlQXN0XG59IGZyb20gJy4vaHRtbF9hc3QnO1xuXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7SHRtbFRva2VuLCBIdG1sVG9rZW5UeXBlLCB0b2tlbml6ZUh0bWx9IGZyb20gJy4vaHRtbF9sZXhlcic7XG5pbXBvcnQge1BhcnNlRXJyb3IsIFBhcnNlTG9jYXRpb24sIFBhcnNlU291cmNlU3Bhbn0gZnJvbSAnLi9wYXJzZV91dGlsJztcbmltcG9ydCB7SHRtbFRhZ0RlZmluaXRpb24sIGdldEh0bWxUYWdEZWZpbml0aW9uLCBnZXROc1ByZWZpeCwgbWVyZ2VOc0FuZE5hbWV9IGZyb20gJy4vaHRtbF90YWdzJztcblxuZXhwb3J0IGNsYXNzIEh0bWxUcmVlRXJyb3IgZXh0ZW5kcyBQYXJzZUVycm9yIHtcbiAgc3RhdGljIGNyZWF0ZShlbGVtZW50TmFtZTogc3RyaW5nLCBzcGFuOiBQYXJzZVNvdXJjZVNwYW4sIG1zZzogc3RyaW5nKTogSHRtbFRyZWVFcnJvciB7XG4gICAgcmV0dXJuIG5ldyBIdG1sVHJlZUVycm9yKGVsZW1lbnROYW1lLCBzcGFuLCBtc2cpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnROYW1lOiBzdHJpbmcsIHNwYW46IFBhcnNlU291cmNlU3BhbiwgbXNnOiBzdHJpbmcpIHsgc3VwZXIoc3BhbiwgbXNnKTsgfVxufVxuXG5leHBvcnQgY2xhc3MgSHRtbFBhcnNlVHJlZVJlc3VsdCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByb290Tm9kZXM6IEh0bWxBc3RbXSwgcHVibGljIGVycm9yczogUGFyc2VFcnJvcltdKSB7fVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSHRtbFBhcnNlciB7XG4gIHBhcnNlKHNvdXJjZUNvbnRlbnQ6IHN0cmluZywgc291cmNlVXJsOiBzdHJpbmcsXG4gICAgICAgIHBhcnNlRXhwYW5zaW9uRm9ybXM6IGJvb2xlYW4gPSBmYWxzZSk6IEh0bWxQYXJzZVRyZWVSZXN1bHQge1xuICAgIHZhciB0b2tlbnNBbmRFcnJvcnMgPSB0b2tlbml6ZUh0bWwoc291cmNlQ29udGVudCwgc291cmNlVXJsLCBwYXJzZUV4cGFuc2lvbkZvcm1zKTtcbiAgICB2YXIgdHJlZUFuZEVycm9ycyA9IG5ldyBUcmVlQnVpbGRlcih0b2tlbnNBbmRFcnJvcnMudG9rZW5zKS5idWlsZCgpO1xuICAgIHJldHVybiBuZXcgSHRtbFBhcnNlVHJlZVJlc3VsdCh0cmVlQW5kRXJyb3JzLnJvb3ROb2RlcywgKDxQYXJzZUVycm9yW10+dG9rZW5zQW5kRXJyb3JzLmVycm9ycylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY29uY2F0KHRyZWVBbmRFcnJvcnMuZXJyb3JzKSk7XG4gIH1cbn1cblxuY2xhc3MgVHJlZUJ1aWxkZXIge1xuICBwcml2YXRlIGluZGV4OiBudW1iZXIgPSAtMTtcbiAgcHJpdmF0ZSBwZWVrOiBIdG1sVG9rZW47XG5cbiAgcHJpdmF0ZSByb290Tm9kZXM6IEh0bWxBc3RbXSA9IFtdO1xuICBwcml2YXRlIGVycm9yczogSHRtbFRyZWVFcnJvcltdID0gW107XG5cbiAgcHJpdmF0ZSBlbGVtZW50U3RhY2s6IEh0bWxFbGVtZW50QXN0W10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRva2VuczogSHRtbFRva2VuW10pIHsgdGhpcy5fYWR2YW5jZSgpOyB9XG5cbiAgYnVpbGQoKTogSHRtbFBhcnNlVHJlZVJlc3VsdCB7XG4gICAgd2hpbGUgKHRoaXMucGVlay50eXBlICE9PSBIdG1sVG9rZW5UeXBlLkVPRikge1xuICAgICAgaWYgKHRoaXMucGVlay50eXBlID09PSBIdG1sVG9rZW5UeXBlLlRBR19PUEVOX1NUQVJUKSB7XG4gICAgICAgIHRoaXMuX2NvbnN1bWVTdGFydFRhZyh0aGlzLl9hZHZhbmNlKCkpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnBlZWsudHlwZSA9PT0gSHRtbFRva2VuVHlwZS5UQUdfQ0xPU0UpIHtcbiAgICAgICAgdGhpcy5fY29uc3VtZUVuZFRhZyh0aGlzLl9hZHZhbmNlKCkpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnBlZWsudHlwZSA9PT0gSHRtbFRva2VuVHlwZS5DREFUQV9TVEFSVCkge1xuICAgICAgICB0aGlzLl9jbG9zZVZvaWRFbGVtZW50KCk7XG4gICAgICAgIHRoaXMuX2NvbnN1bWVDZGF0YSh0aGlzLl9hZHZhbmNlKCkpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnBlZWsudHlwZSA9PT0gSHRtbFRva2VuVHlwZS5DT01NRU5UX1NUQVJUKSB7XG4gICAgICAgIHRoaXMuX2Nsb3NlVm9pZEVsZW1lbnQoKTtcbiAgICAgICAgdGhpcy5fY29uc3VtZUNvbW1lbnQodGhpcy5fYWR2YW5jZSgpKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wZWVrLnR5cGUgPT09IEh0bWxUb2tlblR5cGUuVEVYVCB8fFxuICAgICAgICAgICAgICAgICB0aGlzLnBlZWsudHlwZSA9PT0gSHRtbFRva2VuVHlwZS5SQVdfVEVYVCB8fFxuICAgICAgICAgICAgICAgICB0aGlzLnBlZWsudHlwZSA9PT0gSHRtbFRva2VuVHlwZS5FU0NBUEFCTEVfUkFXX1RFWFQpIHtcbiAgICAgICAgdGhpcy5fY2xvc2VWb2lkRWxlbWVudCgpO1xuICAgICAgICB0aGlzLl9jb25zdW1lVGV4dCh0aGlzLl9hZHZhbmNlKCkpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnBlZWsudHlwZSA9PT0gSHRtbFRva2VuVHlwZS5FWFBBTlNJT05fRk9STV9TVEFSVCkge1xuICAgICAgICB0aGlzLl9jb25zdW1lRXhwYW5zaW9uKHRoaXMuX2FkdmFuY2UoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBTa2lwIGFsbCBvdGhlciB0b2tlbnMuLi5cbiAgICAgICAgdGhpcy5fYWR2YW5jZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3IEh0bWxQYXJzZVRyZWVSZXN1bHQodGhpcy5yb290Tm9kZXMsIHRoaXMuZXJyb3JzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkdmFuY2UoKTogSHRtbFRva2VuIHtcbiAgICB2YXIgcHJldiA9IHRoaXMucGVlaztcbiAgICBpZiAodGhpcy5pbmRleCA8IHRoaXMudG9rZW5zLmxlbmd0aCAtIDEpIHtcbiAgICAgIC8vIE5vdGU6IHRoZXJlIGlzIGFsd2F5cyBhbiBFT0YgdG9rZW4gYXQgdGhlIGVuZFxuICAgICAgdGhpcy5pbmRleCsrO1xuICAgIH1cbiAgICB0aGlzLnBlZWsgPSB0aGlzLnRva2Vuc1t0aGlzLmluZGV4XTtcbiAgICByZXR1cm4gcHJldjtcbiAgfVxuXG4gIHByaXZhdGUgX2FkdmFuY2VJZih0eXBlOiBIdG1sVG9rZW5UeXBlKTogSHRtbFRva2VuIHtcbiAgICBpZiAodGhpcy5wZWVrLnR5cGUgPT09IHR5cGUpIHtcbiAgICAgIHJldHVybiB0aGlzLl9hZHZhbmNlKCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29uc3VtZUNkYXRhKHN0YXJ0VG9rZW46IEh0bWxUb2tlbikge1xuICAgIHRoaXMuX2NvbnN1bWVUZXh0KHRoaXMuX2FkdmFuY2UoKSk7XG4gICAgdGhpcy5fYWR2YW5jZUlmKEh0bWxUb2tlblR5cGUuQ0RBVEFfRU5EKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnN1bWVDb21tZW50KHRva2VuOiBIdG1sVG9rZW4pIHtcbiAgICB2YXIgdGV4dCA9IHRoaXMuX2FkdmFuY2VJZihIdG1sVG9rZW5UeXBlLlJBV19URVhUKTtcbiAgICB0aGlzLl9hZHZhbmNlSWYoSHRtbFRva2VuVHlwZS5DT01NRU5UX0VORCk7XG4gICAgdmFyIHZhbHVlID0gaXNQcmVzZW50KHRleHQpID8gdGV4dC5wYXJ0c1swXS50cmltKCkgOiBudWxsO1xuICAgIHRoaXMuX2FkZFRvUGFyZW50KG5ldyBIdG1sQ29tbWVudEFzdCh2YWx1ZSwgdG9rZW4uc291cmNlU3BhbikpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29uc3VtZUV4cGFuc2lvbih0b2tlbjogSHRtbFRva2VuKSB7XG4gICAgbGV0IHN3aXRjaFZhbHVlID0gdGhpcy5fYWR2YW5jZSgpO1xuXG4gICAgbGV0IHR5cGUgPSB0aGlzLl9hZHZhbmNlKCk7XG4gICAgbGV0IGNhc2VzID0gW107XG5cbiAgICAvLyByZWFkID1cbiAgICB3aGlsZSAodGhpcy5wZWVrLnR5cGUgPT09IEh0bWxUb2tlblR5cGUuRVhQQU5TSU9OX0NBU0VfVkFMVUUpIHtcbiAgICAgIGxldCBleHBDYXNlID0gdGhpcy5fcGFyc2VFeHBhbnNpb25DYXNlKCk7XG4gICAgICBpZiAoaXNCbGFuayhleHBDYXNlKSkgcmV0dXJuOyAgLy8gZXJyb3JcbiAgICAgIGNhc2VzLnB1c2goZXhwQ2FzZSk7XG4gICAgfVxuXG4gICAgLy8gcmVhZCB0aGUgZmluYWwgfVxuICAgIGlmICh0aGlzLnBlZWsudHlwZSAhPT0gSHRtbFRva2VuVHlwZS5FWFBBTlNJT05fRk9STV9FTkQpIHtcbiAgICAgIHRoaXMuZXJyb3JzLnB1c2goXG4gICAgICAgICAgSHRtbFRyZWVFcnJvci5jcmVhdGUobnVsbCwgdGhpcy5wZWVrLnNvdXJjZVNwYW4sIGBJbnZhbGlkIGV4cGFuc2lvbiBmb3JtLiBNaXNzaW5nICd9Jy5gKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2FkdmFuY2UoKTtcblxuICAgIGxldCBtYWluU291cmNlU3BhbiA9IG5ldyBQYXJzZVNvdXJjZVNwYW4odG9rZW4uc291cmNlU3Bhbi5zdGFydCwgdGhpcy5wZWVrLnNvdXJjZVNwYW4uZW5kKTtcbiAgICB0aGlzLl9hZGRUb1BhcmVudChuZXcgSHRtbEV4cGFuc2lvbkFzdChzd2l0Y2hWYWx1ZS5wYXJ0c1swXSwgdHlwZS5wYXJ0c1swXSwgY2FzZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpblNvdXJjZVNwYW4sIHN3aXRjaFZhbHVlLnNvdXJjZVNwYW4pKTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlRXhwYW5zaW9uQ2FzZSgpOiBIdG1sRXhwYW5zaW9uQ2FzZUFzdCB7XG4gICAgbGV0IHZhbHVlID0gdGhpcy5fYWR2YW5jZSgpO1xuXG4gICAgLy8gcmVhZCB7XG4gICAgaWYgKHRoaXMucGVlay50eXBlICE9PSBIdG1sVG9rZW5UeXBlLkVYUEFOU0lPTl9DQVNFX0VYUF9TVEFSVCkge1xuICAgICAgdGhpcy5lcnJvcnMucHVzaChIdG1sVHJlZUVycm9yLmNyZWF0ZShudWxsLCB0aGlzLnBlZWsuc291cmNlU3BhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYEludmFsaWQgZXhwYW5zaW9uIGZvcm0uIE1pc3NpbmcgJ3snLixgKSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyByZWFkIHVudGlsIH1cbiAgICBsZXQgc3RhcnQgPSB0aGlzLl9hZHZhbmNlKCk7XG5cbiAgICBsZXQgZXhwID0gdGhpcy5fY29sbGVjdEV4cGFuc2lvbkV4cFRva2VucyhzdGFydCk7XG4gICAgaWYgKGlzQmxhbmsoZXhwKSkgcmV0dXJuIG51bGw7XG5cbiAgICBsZXQgZW5kID0gdGhpcy5fYWR2YW5jZSgpO1xuICAgIGV4cC5wdXNoKG5ldyBIdG1sVG9rZW4oSHRtbFRva2VuVHlwZS5FT0YsIFtdLCBlbmQuc291cmNlU3BhbikpO1xuXG4gICAgLy8gcGFyc2UgZXZlcnl0aGluZyBpbiBiZXR3ZWVuIHsgYW5kIH1cbiAgICBsZXQgcGFyc2VkRXhwID0gbmV3IFRyZWVCdWlsZGVyKGV4cCkuYnVpbGQoKTtcbiAgICBpZiAocGFyc2VkRXhwLmVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmVycm9ycyA9IHRoaXMuZXJyb3JzLmNvbmNhdCg8SHRtbFRyZWVFcnJvcltdPnBhcnNlZEV4cC5lcnJvcnMpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbGV0IHNvdXJjZVNwYW4gPSBuZXcgUGFyc2VTb3VyY2VTcGFuKHZhbHVlLnNvdXJjZVNwYW4uc3RhcnQsIGVuZC5zb3VyY2VTcGFuLmVuZCk7XG4gICAgbGV0IGV4cFNvdXJjZVNwYW4gPSBuZXcgUGFyc2VTb3VyY2VTcGFuKHN0YXJ0LnNvdXJjZVNwYW4uc3RhcnQsIGVuZC5zb3VyY2VTcGFuLmVuZCk7XG4gICAgcmV0dXJuIG5ldyBIdG1sRXhwYW5zaW9uQ2FzZUFzdCh2YWx1ZS5wYXJ0c1swXSwgcGFyc2VkRXhwLnJvb3ROb2Rlcywgc291cmNlU3BhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLnNvdXJjZVNwYW4sIGV4cFNvdXJjZVNwYW4pO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29sbGVjdEV4cGFuc2lvbkV4cFRva2VucyhzdGFydDogSHRtbFRva2VuKTogSHRtbFRva2VuW10ge1xuICAgIGxldCBleHAgPSBbXTtcbiAgICBsZXQgZXhwYW5zaW9uRm9ybVN0YWNrID0gW0h0bWxUb2tlblR5cGUuRVhQQU5TSU9OX0NBU0VfRVhQX1NUQVJUXTtcblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBpZiAodGhpcy5wZWVrLnR5cGUgPT09IEh0bWxUb2tlblR5cGUuRVhQQU5TSU9OX0ZPUk1fU1RBUlQgfHxcbiAgICAgICAgICB0aGlzLnBlZWsudHlwZSA9PT0gSHRtbFRva2VuVHlwZS5FWFBBTlNJT05fQ0FTRV9FWFBfU1RBUlQpIHtcbiAgICAgICAgZXhwYW5zaW9uRm9ybVN0YWNrLnB1c2godGhpcy5wZWVrLnR5cGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5wZWVrLnR5cGUgPT09IEh0bWxUb2tlblR5cGUuRVhQQU5TSU9OX0NBU0VfRVhQX0VORCkge1xuICAgICAgICBpZiAobGFzdE9uU3RhY2soZXhwYW5zaW9uRm9ybVN0YWNrLCBIdG1sVG9rZW5UeXBlLkVYUEFOU0lPTl9DQVNFX0VYUF9TVEFSVCkpIHtcbiAgICAgICAgICBleHBhbnNpb25Gb3JtU3RhY2sucG9wKCk7XG4gICAgICAgICAgaWYgKGV4cGFuc2lvbkZvcm1TdGFjay5sZW5ndGggPT0gMCkgcmV0dXJuIGV4cDtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZXJyb3JzLnB1c2goXG4gICAgICAgICAgICAgIEh0bWxUcmVlRXJyb3IuY3JlYXRlKG51bGwsIHN0YXJ0LnNvdXJjZVNwYW4sIGBJbnZhbGlkIGV4cGFuc2lvbiBmb3JtLiBNaXNzaW5nICd9Jy5gKSk7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMucGVlay50eXBlID09PSBIdG1sVG9rZW5UeXBlLkVYUEFOU0lPTl9GT1JNX0VORCkge1xuICAgICAgICBpZiAobGFzdE9uU3RhY2soZXhwYW5zaW9uRm9ybVN0YWNrLCBIdG1sVG9rZW5UeXBlLkVYUEFOU0lPTl9GT1JNX1NUQVJUKSkge1xuICAgICAgICAgIGV4cGFuc2lvbkZvcm1TdGFjay5wb3AoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmVycm9ycy5wdXNoKFxuICAgICAgICAgICAgICBIdG1sVHJlZUVycm9yLmNyZWF0ZShudWxsLCBzdGFydC5zb3VyY2VTcGFuLCBgSW52YWxpZCBleHBhbnNpb24gZm9ybS4gTWlzc2luZyAnfScuYCkpO1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnBlZWsudHlwZSA9PT0gSHRtbFRva2VuVHlwZS5FT0YpIHtcbiAgICAgICAgdGhpcy5lcnJvcnMucHVzaChcbiAgICAgICAgICAgIEh0bWxUcmVlRXJyb3IuY3JlYXRlKG51bGwsIHN0YXJ0LnNvdXJjZVNwYW4sIGBJbnZhbGlkIGV4cGFuc2lvbiBmb3JtLiBNaXNzaW5nICd9Jy5gKSk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBleHAucHVzaCh0aGlzLl9hZHZhbmNlKCkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NvbnN1bWVUZXh0KHRva2VuOiBIdG1sVG9rZW4pIHtcbiAgICBsZXQgdGV4dCA9IHRva2VuLnBhcnRzWzBdO1xuICAgIGlmICh0ZXh0Lmxlbmd0aCA+IDAgJiYgdGV4dFswXSA9PSAnXFxuJykge1xuICAgICAgbGV0IHBhcmVudCA9IHRoaXMuX2dldFBhcmVudEVsZW1lbnQoKTtcbiAgICAgIGlmIChpc1ByZXNlbnQocGFyZW50KSAmJiBwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoID09IDAgJiZcbiAgICAgICAgICBnZXRIdG1sVGFnRGVmaW5pdGlvbihwYXJlbnQubmFtZSkuaWdub3JlRmlyc3RMZikge1xuICAgICAgICB0ZXh0ID0gdGV4dC5zdWJzdHJpbmcoMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRleHQubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5fYWRkVG9QYXJlbnQobmV3IEh0bWxUZXh0QXN0KHRleHQsIHRva2VuLnNvdXJjZVNwYW4pKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jbG9zZVZvaWRFbGVtZW50KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmVsZW1lbnRTdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgZWwgPSBMaXN0V3JhcHBlci5sYXN0KHRoaXMuZWxlbWVudFN0YWNrKTtcblxuICAgICAgaWYgKGdldEh0bWxUYWdEZWZpbml0aW9uKGVsLm5hbWUpLmlzVm9pZCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRTdGFjay5wb3AoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jb25zdW1lU3RhcnRUYWcoc3RhcnRUYWdUb2tlbjogSHRtbFRva2VuKSB7XG4gICAgdmFyIHByZWZpeCA9IHN0YXJ0VGFnVG9rZW4ucGFydHNbMF07XG4gICAgdmFyIG5hbWUgPSBzdGFydFRhZ1Rva2VuLnBhcnRzWzFdO1xuICAgIHZhciBhdHRycyA9IFtdO1xuICAgIHdoaWxlICh0aGlzLnBlZWsudHlwZSA9PT0gSHRtbFRva2VuVHlwZS5BVFRSX05BTUUpIHtcbiAgICAgIGF0dHJzLnB1c2godGhpcy5fY29uc3VtZUF0dHIodGhpcy5fYWR2YW5jZSgpKSk7XG4gICAgfVxuICAgIHZhciBmdWxsTmFtZSA9IGdldEVsZW1lbnRGdWxsTmFtZShwcmVmaXgsIG5hbWUsIHRoaXMuX2dldFBhcmVudEVsZW1lbnQoKSk7XG4gICAgdmFyIHNlbGZDbG9zaW5nID0gZmFsc2U7XG4gICAgLy8gTm90ZTogVGhlcmUgY291bGQgaGF2ZSBiZWVuIGEgdG9rZW5pemVyIGVycm9yXG4gICAgLy8gc28gdGhhdCB3ZSBkb24ndCBnZXQgYSB0b2tlbiBmb3IgdGhlIGVuZCB0YWcuLi5cbiAgICBpZiAodGhpcy5wZWVrLnR5cGUgPT09IEh0bWxUb2tlblR5cGUuVEFHX09QRU5fRU5EX1ZPSUQpIHtcbiAgICAgIHRoaXMuX2FkdmFuY2UoKTtcbiAgICAgIHNlbGZDbG9zaW5nID0gdHJ1ZTtcbiAgICAgIGlmIChnZXROc1ByZWZpeChmdWxsTmFtZSkgPT0gbnVsbCAmJiAhZ2V0SHRtbFRhZ0RlZmluaXRpb24oZnVsbE5hbWUpLmlzVm9pZCkge1xuICAgICAgICB0aGlzLmVycm9ycy5wdXNoKEh0bWxUcmVlRXJyb3IuY3JlYXRlKFxuICAgICAgICAgICAgZnVsbE5hbWUsIHN0YXJ0VGFnVG9rZW4uc291cmNlU3BhbixcbiAgICAgICAgICAgIGBPbmx5IHZvaWQgYW5kIGZvcmVpZ24gZWxlbWVudHMgY2FuIGJlIHNlbGYgY2xvc2VkIFwiJHtzdGFydFRhZ1Rva2VuLnBhcnRzWzFdfVwiYCkpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5wZWVrLnR5cGUgPT09IEh0bWxUb2tlblR5cGUuVEFHX09QRU5fRU5EKSB7XG4gICAgICB0aGlzLl9hZHZhbmNlKCk7XG4gICAgICBzZWxmQ2xvc2luZyA9IGZhbHNlO1xuICAgIH1cbiAgICB2YXIgZW5kID0gdGhpcy5wZWVrLnNvdXJjZVNwYW4uc3RhcnQ7XG4gICAgbGV0IHNwYW4gPSBuZXcgUGFyc2VTb3VyY2VTcGFuKHN0YXJ0VGFnVG9rZW4uc291cmNlU3Bhbi5zdGFydCwgZW5kKTtcbiAgICB2YXIgZWwgPSBuZXcgSHRtbEVsZW1lbnRBc3QoZnVsbE5hbWUsIGF0dHJzLCBbXSwgc3Bhbiwgc3BhbiwgbnVsbCk7XG4gICAgdGhpcy5fcHVzaEVsZW1lbnQoZWwpO1xuICAgIGlmIChzZWxmQ2xvc2luZykge1xuICAgICAgdGhpcy5fcG9wRWxlbWVudChmdWxsTmFtZSk7XG4gICAgICBlbC5lbmRTb3VyY2VTcGFuID0gc3BhbjtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9wdXNoRWxlbWVudChlbDogSHRtbEVsZW1lbnRBc3QpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50U3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgdmFyIHBhcmVudEVsID0gTGlzdFdyYXBwZXIubGFzdCh0aGlzLmVsZW1lbnRTdGFjayk7XG4gICAgICBpZiAoZ2V0SHRtbFRhZ0RlZmluaXRpb24ocGFyZW50RWwubmFtZSkuaXNDbG9zZWRCeUNoaWxkKGVsLm5hbWUpKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudFN0YWNrLnBvcCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciB0YWdEZWYgPSBnZXRIdG1sVGFnRGVmaW5pdGlvbihlbC5uYW1lKTtcbiAgICB2YXIgcGFyZW50RWwgPSB0aGlzLl9nZXRQYXJlbnRFbGVtZW50KCk7XG4gICAgaWYgKHRhZ0RlZi5yZXF1aXJlRXh0cmFQYXJlbnQoaXNQcmVzZW50KHBhcmVudEVsKSA/IHBhcmVudEVsLm5hbWUgOiBudWxsKSkge1xuICAgICAgdmFyIG5ld1BhcmVudCA9IG5ldyBIdG1sRWxlbWVudEFzdCh0YWdEZWYucGFyZW50VG9BZGQsIFtdLCBbZWxdLCBlbC5zb3VyY2VTcGFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5zdGFydFNvdXJjZVNwYW4sIGVsLmVuZFNvdXJjZVNwYW4pO1xuICAgICAgdGhpcy5fYWRkVG9QYXJlbnQobmV3UGFyZW50KTtcbiAgICAgIHRoaXMuZWxlbWVudFN0YWNrLnB1c2gobmV3UGFyZW50KTtcbiAgICAgIHRoaXMuZWxlbWVudFN0YWNrLnB1c2goZWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9hZGRUb1BhcmVudChlbCk7XG4gICAgICB0aGlzLmVsZW1lbnRTdGFjay5wdXNoKGVsKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jb25zdW1lRW5kVGFnKGVuZFRhZ1Rva2VuOiBIdG1sVG9rZW4pIHtcbiAgICB2YXIgZnVsbE5hbWUgPVxuICAgICAgICBnZXRFbGVtZW50RnVsbE5hbWUoZW5kVGFnVG9rZW4ucGFydHNbMF0sIGVuZFRhZ1Rva2VuLnBhcnRzWzFdLCB0aGlzLl9nZXRQYXJlbnRFbGVtZW50KCkpO1xuXG4gICAgdGhpcy5fZ2V0UGFyZW50RWxlbWVudCgpLmVuZFNvdXJjZVNwYW4gPSBlbmRUYWdUb2tlbi5zb3VyY2VTcGFuO1xuXG4gICAgaWYgKGdldEh0bWxUYWdEZWZpbml0aW9uKGZ1bGxOYW1lKS5pc1ZvaWQpIHtcbiAgICAgIHRoaXMuZXJyb3JzLnB1c2goXG4gICAgICAgICAgSHRtbFRyZWVFcnJvci5jcmVhdGUoZnVsbE5hbWUsIGVuZFRhZ1Rva2VuLnNvdXJjZVNwYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYFZvaWQgZWxlbWVudHMgZG8gbm90IGhhdmUgZW5kIHRhZ3MgXCIke2VuZFRhZ1Rva2VuLnBhcnRzWzFdfVwiYCkpO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuX3BvcEVsZW1lbnQoZnVsbE5hbWUpKSB7XG4gICAgICB0aGlzLmVycm9ycy5wdXNoKEh0bWxUcmVlRXJyb3IuY3JlYXRlKGZ1bGxOYW1lLCBlbmRUYWdUb2tlbi5zb3VyY2VTcGFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgVW5leHBlY3RlZCBjbG9zaW5nIHRhZyBcIiR7ZW5kVGFnVG9rZW4ucGFydHNbMV19XCJgKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcG9wRWxlbWVudChmdWxsTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgZm9yIChsZXQgc3RhY2tJbmRleCA9IHRoaXMuZWxlbWVudFN0YWNrLmxlbmd0aCAtIDE7IHN0YWNrSW5kZXggPj0gMDsgc3RhY2tJbmRleC0tKSB7XG4gICAgICBsZXQgZWwgPSB0aGlzLmVsZW1lbnRTdGFja1tzdGFja0luZGV4XTtcbiAgICAgIGlmIChlbC5uYW1lID09IGZ1bGxOYW1lKSB7XG4gICAgICAgIExpc3RXcmFwcGVyLnNwbGljZSh0aGlzLmVsZW1lbnRTdGFjaywgc3RhY2tJbmRleCwgdGhpcy5lbGVtZW50U3RhY2subGVuZ3RoIC0gc3RhY2tJbmRleCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWdldEh0bWxUYWdEZWZpbml0aW9uKGVsLm5hbWUpLmNsb3NlZEJ5UGFyZW50KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29uc3VtZUF0dHIoYXR0ck5hbWU6IEh0bWxUb2tlbik6IEh0bWxBdHRyQXN0IHtcbiAgICB2YXIgZnVsbE5hbWUgPSBtZXJnZU5zQW5kTmFtZShhdHRyTmFtZS5wYXJ0c1swXSwgYXR0ck5hbWUucGFydHNbMV0pO1xuICAgIHZhciBlbmQgPSBhdHRyTmFtZS5zb3VyY2VTcGFuLmVuZDtcbiAgICB2YXIgdmFsdWUgPSAnJztcbiAgICBpZiAodGhpcy5wZWVrLnR5cGUgPT09IEh0bWxUb2tlblR5cGUuQVRUUl9WQUxVRSkge1xuICAgICAgdmFyIHZhbHVlVG9rZW4gPSB0aGlzLl9hZHZhbmNlKCk7XG4gICAgICB2YWx1ZSA9IHZhbHVlVG9rZW4ucGFydHNbMF07XG4gICAgICBlbmQgPSB2YWx1ZVRva2VuLnNvdXJjZVNwYW4uZW5kO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEh0bWxBdHRyQXN0KGZ1bGxOYW1lLCB2YWx1ZSwgbmV3IFBhcnNlU291cmNlU3BhbihhdHRyTmFtZS5zb3VyY2VTcGFuLnN0YXJ0LCBlbmQpKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFBhcmVudEVsZW1lbnQoKTogSHRtbEVsZW1lbnRBc3Qge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRTdGFjay5sZW5ndGggPiAwID8gTGlzdFdyYXBwZXIubGFzdCh0aGlzLmVsZW1lbnRTdGFjaykgOiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9QYXJlbnQobm9kZTogSHRtbEFzdCkge1xuICAgIHZhciBwYXJlbnQgPSB0aGlzLl9nZXRQYXJlbnRFbGVtZW50KCk7XG4gICAgaWYgKGlzUHJlc2VudChwYXJlbnQpKSB7XG4gICAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaChub2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yb290Tm9kZXMucHVzaChub2RlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RWxlbWVudEZ1bGxOYW1lKHByZWZpeDogc3RyaW5nLCBsb2NhbE5hbWU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRFbGVtZW50OiBIdG1sRWxlbWVudEFzdCk6IHN0cmluZyB7XG4gIGlmIChpc0JsYW5rKHByZWZpeCkpIHtcbiAgICBwcmVmaXggPSBnZXRIdG1sVGFnRGVmaW5pdGlvbihsb2NhbE5hbWUpLmltcGxpY2l0TmFtZXNwYWNlUHJlZml4O1xuICAgIGlmIChpc0JsYW5rKHByZWZpeCkgJiYgaXNQcmVzZW50KHBhcmVudEVsZW1lbnQpKSB7XG4gICAgICBwcmVmaXggPSBnZXROc1ByZWZpeChwYXJlbnRFbGVtZW50Lm5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtZXJnZU5zQW5kTmFtZShwcmVmaXgsIGxvY2FsTmFtZSk7XG59XG5cbmZ1bmN0aW9uIGxhc3RPblN0YWNrKHN0YWNrOiBhbnlbXSwgZWxlbWVudDogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBzdGFjay5sZW5ndGggPiAwICYmIHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdID09PSBlbGVtZW50O1xufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
