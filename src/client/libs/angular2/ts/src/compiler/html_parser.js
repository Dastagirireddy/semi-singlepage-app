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
                HtmlParser.prototype.parse = function (sourceContent, sourceUrl) {
                    var tokensAndErrors = html_lexer_1.tokenizeHtml(sourceContent, sourceUrl);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL2h0bWxfcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFvUEEsNEJBQTRCLE1BQWMsRUFBRSxTQUFpQixFQUNqQyxhQUE2QjtRQUN2RCxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sR0FBRyxnQ0FBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQztZQUNqRSxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsTUFBTSxDQUFDLElBQUksZ0JBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELE1BQU0sR0FBRyx1QkFBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQyxDQUFDO1FBQ0gsQ0FBQztRQUVELE1BQU0sQ0FBQywwQkFBYyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBMU9EO2dCQUFtQyxpQ0FBVTtnQkFLM0MsdUJBQW1CLFdBQW1CLEVBQUUsSUFBcUIsRUFBRSxHQUFXO29CQUFJLGtCQUFNLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFBNUUsZ0JBQVcsR0FBWCxXQUFXLENBQVE7Z0JBQTBELENBQUM7Z0JBSjFGLG9CQUFNLEdBQWIsVUFBYyxXQUFtQixFQUFFLElBQXFCLEVBQUUsR0FBVztvQkFDbkUsTUFBTSxDQUFDLElBQUksYUFBYSxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ25ELENBQUM7Z0JBR0gsb0JBQUM7WUFBRCxDQU5BLEFBTUMsQ0FOa0MsdUJBQVUsR0FNNUM7WUFORCx5Q0FNQyxDQUFBO1lBRUQ7Z0JBQ0UsNkJBQW1CLFNBQW9CLEVBQVMsTUFBb0I7b0JBQWpELGNBQVMsR0FBVCxTQUFTLENBQVc7b0JBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBYztnQkFBRyxDQUFDO2dCQUMxRSwwQkFBQztZQUFELENBRkEsQUFFQyxJQUFBO1lBRkQscURBRUMsQ0FBQTtZQUdEO2dCQUFBO2dCQU9BLENBQUM7Z0JBTkMsMEJBQUssR0FBTCxVQUFNLGFBQXFCLEVBQUUsU0FBaUI7b0JBQzVDLElBQUksZUFBZSxHQUFHLHlCQUFZLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUM3RCxJQUFJLGFBQWEsR0FBRyxJQUFJLFdBQVcsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ3BFLE1BQU0sQ0FBQyxJQUFJLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQWlCLGVBQWUsQ0FBQyxNQUFPO3lCQUNqQyxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzdGLENBQUM7Z0JBUEg7b0JBQUMsZUFBVSxFQUFFOzs4QkFBQTtnQkFRYixpQkFBQztZQUFELENBUEEsQUFPQyxJQUFBO1lBUEQsbUNBT0MsQ0FBQTtZQUVEO2dCQVNFLHFCQUFvQixNQUFtQjtvQkFBbkIsV0FBTSxHQUFOLE1BQU0sQ0FBYTtvQkFSL0IsVUFBSyxHQUFXLENBQUMsQ0FBQyxDQUFDO29CQUduQixjQUFTLEdBQWMsRUFBRSxDQUFDO29CQUMxQixXQUFNLEdBQW9CLEVBQUUsQ0FBQztvQkFFN0IsaUJBQVksR0FBcUIsRUFBRSxDQUFDO29CQUVELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFBQyxDQUFDO2dCQUU3RCwyQkFBSyxHQUFMO29CQUNFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssMEJBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQzt3QkFDNUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssMEJBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDOzRCQUNwRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7d0JBQ3pDLENBQUM7d0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLDBCQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs0QkFDdEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzt3QkFDdkMsQ0FBQzt3QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssMEJBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOzRCQUN4RCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzs0QkFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzt3QkFDdEMsQ0FBQzt3QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssMEJBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDOzRCQUMxRCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzs0QkFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzt3QkFDeEMsQ0FBQzt3QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssMEJBQWEsQ0FBQyxJQUFJOzRCQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSywwQkFBYSxDQUFDLFFBQVE7NEJBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLDBCQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDOzRCQUMvRCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzs0QkFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzt3QkFDckMsQ0FB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QUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM1QixHQUFHLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUM7b0JBQ2xDLENBQUM7b0JBQ0QsTUFBTSxDQUFDLElBQUksc0JBQVcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksNEJBQWUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUMvRixDQUFDO2dCQUVPLHVDQUFpQixHQUF6QjtvQkFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLHdCQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQ25GLENBQUM7Z0JBRU8sa0NBQVksR0FBcEIsVUFBcUIsSUFBYTtvQkFDaEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7b0JBQ3RDLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN0QixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDN0IsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDNUIsQ0FBQztnQkFDSCxDQUFDO2dCQUNILGtCQUFDO1lBQUQsQ0F4TUEsQUF3TUMsSUFBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9odG1sX3BhcnNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGlzUHJlc2VudCxcbiAgaXNCbGFuayxcbiAgU3RyaW5nV3JhcHBlcixcbiAgc3RyaW5naWZ5LFxuICBhc3NlcnRpb25zRW5hYmxlZCxcbiAgU3RyaW5nSm9pbmVyLFxuICBzZXJpYWxpemVFbnVtLFxuICBDT05TVF9FWFBSXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbmltcG9ydCB7TGlzdFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5cbmltcG9ydCB7SHRtbEFzdCwgSHRtbEF0dHJBc3QsIEh0bWxUZXh0QXN0LCBIdG1sQ29tbWVudEFzdCwgSHRtbEVsZW1lbnRBc3R9IGZyb20gJy4vaHRtbF9hc3QnO1xuXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7SHRtbFRva2VuLCBIdG1sVG9rZW5UeXBlLCB0b2tlbml6ZUh0bWx9IGZyb20gJy4vaHRtbF9sZXhlcic7XG5pbXBvcnQge1BhcnNlRXJyb3IsIFBhcnNlTG9jYXRpb24sIFBhcnNlU291cmNlU3Bhbn0gZnJvbSAnLi9wYXJzZV91dGlsJztcbmltcG9ydCB7SHRtbFRhZ0RlZmluaXRpb24sIGdldEh0bWxUYWdEZWZpbml0aW9uLCBnZXROc1ByZWZpeCwgbWVyZ2VOc0FuZE5hbWV9IGZyb20gJy4vaHRtbF90YWdzJztcblxuZXhwb3J0IGNsYXNzIEh0bWxUcmVlRXJyb3IgZXh0ZW5kcyBQYXJzZUVycm9yIHtcbiAgc3RhdGljIGNyZWF0ZShlbGVtZW50TmFtZTogc3RyaW5nLCBzcGFuOiBQYXJzZVNvdXJjZVNwYW4sIG1zZzogc3RyaW5nKTogSHRtbFRyZWVFcnJvciB7XG4gICAgcmV0dXJuIG5ldyBIdG1sVHJlZUVycm9yKGVsZW1lbnROYW1lLCBzcGFuLCBtc2cpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnROYW1lOiBzdHJpbmcsIHNwYW46IFBhcnNlU291cmNlU3BhbiwgbXNnOiBzdHJpbmcpIHsgc3VwZXIoc3BhbiwgbXNnKTsgfVxufVxuXG5leHBvcnQgY2xhc3MgSHRtbFBhcnNlVHJlZVJlc3VsdCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByb290Tm9kZXM6IEh0bWxBc3RbXSwgcHVibGljIGVycm9yczogUGFyc2VFcnJvcltdKSB7fVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSHRtbFBhcnNlciB7XG4gIHBhcnNlKHNvdXJjZUNvbnRlbnQ6IHN0cmluZywgc291cmNlVXJsOiBzdHJpbmcpOiBIdG1sUGFyc2VUcmVlUmVzdWx0IHtcbiAgICB2YXIgdG9rZW5zQW5kRXJyb3JzID0gdG9rZW5pemVIdG1sKHNvdXJjZUNvbnRlbnQsIHNvdXJjZVVybCk7XG4gICAgdmFyIHRyZWVBbmRFcnJvcnMgPSBuZXcgVHJlZUJ1aWxkZXIodG9rZW5zQW5kRXJyb3JzLnRva2VucykuYnVpbGQoKTtcbiAgICByZXR1cm4gbmV3IEh0bWxQYXJzZVRyZWVSZXN1bHQodHJlZUFuZEVycm9ycy5yb290Tm9kZXMsICg8UGFyc2VFcnJvcltdPnRva2Vuc0FuZEVycm9ycy5lcnJvcnMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNvbmNhdCh0cmVlQW5kRXJyb3JzLmVycm9ycykpO1xuICB9XG59XG5cbmNsYXNzIFRyZWVCdWlsZGVyIHtcbiAgcHJpdmF0ZSBpbmRleDogbnVtYmVyID0gLTE7XG4gIHByaXZhdGUgcGVlazogSHRtbFRva2VuO1xuXG4gIHByaXZhdGUgcm9vdE5vZGVzOiBIdG1sQXN0W10gPSBbXTtcbiAgcHJpdmF0ZSBlcnJvcnM6IEh0bWxUcmVlRXJyb3JbXSA9IFtdO1xuXG4gIHByaXZhdGUgZWxlbWVudFN0YWNrOiBIdG1sRWxlbWVudEFzdFtdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0b2tlbnM6IEh0bWxUb2tlbltdKSB7IHRoaXMuX2FkdmFuY2UoKTsgfVxuXG4gIGJ1aWxkKCk6IEh0bWxQYXJzZVRyZWVSZXN1bHQge1xuICAgIHdoaWxlICh0aGlzLnBlZWsudHlwZSAhPT0gSHRtbFRva2VuVHlwZS5FT0YpIHtcbiAgICAgIGlmICh0aGlzLnBlZWsudHlwZSA9PT0gSHRtbFRva2VuVHlwZS5UQUdfT1BFTl9TVEFSVCkge1xuICAgICAgICB0aGlzLl9jb25zdW1lU3RhcnRUYWcodGhpcy5fYWR2YW5jZSgpKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wZWVrLnR5cGUgPT09IEh0bWxUb2tlblR5cGUuVEFHX0NMT1NFKSB7XG4gICAgICAgIHRoaXMuX2NvbnN1bWVFbmRUYWcodGhpcy5fYWR2YW5jZSgpKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wZWVrLnR5cGUgPT09IEh0bWxUb2tlblR5cGUuQ0RBVEFfU1RBUlQpIHtcbiAgICAgICAgdGhpcy5fY2xvc2VWb2lkRWxlbWVudCgpO1xuICAgICAgICB0aGlzLl9jb25zdW1lQ2RhdGEodGhpcy5fYWR2YW5jZSgpKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wZWVrLnR5cGUgPT09IEh0bWxUb2tlblR5cGUuQ09NTUVOVF9TVEFSVCkge1xuICAgICAgICB0aGlzLl9jbG9zZVZvaWRFbGVtZW50KCk7XG4gICAgICAgIHRoaXMuX2NvbnN1bWVDb21tZW50KHRoaXMuX2FkdmFuY2UoKSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucGVlay50eXBlID09PSBIdG1sVG9rZW5UeXBlLlRFWFQgfHxcbiAgICAgICAgICAgICAgICAgdGhpcy5wZWVrLnR5cGUgPT09IEh0bWxUb2tlblR5cGUuUkFXX1RFWFQgfHxcbiAgICAgICAgICAgICAgICAgdGhpcy5wZWVrLnR5cGUgPT09IEh0bWxUb2tlblR5cGUuRVNDQVBBQkxFX1JBV19URVhUKSB7XG4gICAgICAgIHRoaXMuX2Nsb3NlVm9pZEVsZW1lbnQoKTtcbiAgICAgICAgdGhpcy5fY29uc3VtZVRleHQodGhpcy5fYWR2YW5jZSgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFNraXAgYWxsIG90aGVyIHRva2Vucy4uLlxuICAgICAgICB0aGlzLl9hZHZhbmNlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXcgSHRtbFBhcnNlVHJlZVJlc3VsdCh0aGlzLnJvb3ROb2RlcywgdGhpcy5lcnJvcnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWR2YW5jZSgpOiBIdG1sVG9rZW4ge1xuICAgIHZhciBwcmV2ID0gdGhpcy5wZWVrO1xuICAgIGlmICh0aGlzLmluZGV4IDwgdGhpcy50b2tlbnMubGVuZ3RoIC0gMSkge1xuICAgICAgLy8gTm90ZTogdGhlcmUgaXMgYWx3YXlzIGFuIEVPRiB0b2tlbiBhdCB0aGUgZW5kXG4gICAgICB0aGlzLmluZGV4Kys7XG4gICAgfVxuICAgIHRoaXMucGVlayA9IHRoaXMudG9rZW5zW3RoaXMuaW5kZXhdO1xuICAgIHJldHVybiBwcmV2O1xuICB9XG5cbiAgcHJpdmF0ZSBfYWR2YW5jZUlmKHR5cGU6IEh0bWxUb2tlblR5cGUpOiBIdG1sVG9rZW4ge1xuICAgIGlmICh0aGlzLnBlZWsudHlwZSA9PT0gdHlwZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2FkdmFuY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIF9jb25zdW1lQ2RhdGEoc3RhcnRUb2tlbjogSHRtbFRva2VuKSB7XG4gICAgdGhpcy5fY29uc3VtZVRleHQodGhpcy5fYWR2YW5jZSgpKTtcbiAgICB0aGlzLl9hZHZhbmNlSWYoSHRtbFRva2VuVHlwZS5DREFUQV9FTkQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29uc3VtZUNvbW1lbnQodG9rZW46IEh0bWxUb2tlbikge1xuICAgIHZhciB0ZXh0ID0gdGhpcy5fYWR2YW5jZUlmKEh0bWxUb2tlblR5cGUuUkFXX1RFWFQpO1xuICAgIHRoaXMuX2FkdmFuY2VJZihIdG1sVG9rZW5UeXBlLkNPTU1FTlRfRU5EKTtcbiAgICB2YXIgdmFsdWUgPSBpc1ByZXNlbnQodGV4dCkgPyB0ZXh0LnBhcnRzWzBdLnRyaW0oKSA6IG51bGw7XG4gICAgdGhpcy5fYWRkVG9QYXJlbnQobmV3IEh0bWxDb21tZW50QXN0KHZhbHVlLCB0b2tlbi5zb3VyY2VTcGFuKSk7XG4gIH1cblxuICBwcml2YXRlIF9jb25zdW1lVGV4dCh0b2tlbjogSHRtbFRva2VuKSB7XG4gICAgbGV0IHRleHQgPSB0b2tlbi5wYXJ0c1swXTtcbiAgICBpZiAodGV4dC5sZW5ndGggPiAwICYmIHRleHRbMF0gPT0gJ1xcbicpIHtcbiAgICAgIGxldCBwYXJlbnQgPSB0aGlzLl9nZXRQYXJlbnRFbGVtZW50KCk7XG4gICAgICBpZiAoaXNQcmVzZW50KHBhcmVudCkgJiYgcGFyZW50LmNoaWxkcmVuLmxlbmd0aCA9PSAwICYmXG4gICAgICAgICAgZ2V0SHRtbFRhZ0RlZmluaXRpb24ocGFyZW50Lm5hbWUpLmlnbm9yZUZpcnN0TGYpIHtcbiAgICAgICAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0ZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuX2FkZFRvUGFyZW50KG5ldyBIdG1sVGV4dEFzdCh0ZXh0LCB0b2tlbi5zb3VyY2VTcGFuKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY2xvc2VWb2lkRWxlbWVudCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5lbGVtZW50U3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgbGV0IGVsID0gTGlzdFdyYXBwZXIubGFzdCh0aGlzLmVsZW1lbnRTdGFjayk7XG5cbiAgICAgIGlmIChnZXRIdG1sVGFnRGVmaW5pdGlvbihlbC5uYW1lKS5pc1ZvaWQpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50U3RhY2sucG9wKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY29uc3VtZVN0YXJ0VGFnKHN0YXJ0VGFnVG9rZW46IEh0bWxUb2tlbikge1xuICAgIHZhciBwcmVmaXggPSBzdGFydFRhZ1Rva2VuLnBhcnRzWzBdO1xuICAgIHZhciBuYW1lID0gc3RhcnRUYWdUb2tlbi5wYXJ0c1sxXTtcbiAgICB2YXIgYXR0cnMgPSBbXTtcbiAgICB3aGlsZSAodGhpcy5wZWVrLnR5cGUgPT09IEh0bWxUb2tlblR5cGUuQVRUUl9OQU1FKSB7XG4gICAgICBhdHRycy5wdXNoKHRoaXMuX2NvbnN1bWVBdHRyKHRoaXMuX2FkdmFuY2UoKSkpO1xuICAgIH1cbiAgICB2YXIgZnVsbE5hbWUgPSBnZXRFbGVtZW50RnVsbE5hbWUocHJlZml4LCBuYW1lLCB0aGlzLl9nZXRQYXJlbnRFbGVtZW50KCkpO1xuICAgIHZhciBzZWxmQ2xvc2luZyA9IGZhbHNlO1xuICAgIC8vIE5vdGU6IFRoZXJlIGNvdWxkIGhhdmUgYmVlbiBhIHRva2VuaXplciBlcnJvclxuICAgIC8vIHNvIHRoYXQgd2UgZG9uJ3QgZ2V0IGEgdG9rZW4gZm9yIHRoZSBlbmQgdGFnLi4uXG4gICAgaWYgKHRoaXMucGVlay50eXBlID09PSBIdG1sVG9rZW5UeXBlLlRBR19PUEVOX0VORF9WT0lEKSB7XG4gICAgICB0aGlzLl9hZHZhbmNlKCk7XG4gICAgICBzZWxmQ2xvc2luZyA9IHRydWU7XG4gICAgICBpZiAoZ2V0TnNQcmVmaXgoZnVsbE5hbWUpID09IG51bGwgJiYgIWdldEh0bWxUYWdEZWZpbml0aW9uKGZ1bGxOYW1lKS5pc1ZvaWQpIHtcbiAgICAgICAgdGhpcy5lcnJvcnMucHVzaChIdG1sVHJlZUVycm9yLmNyZWF0ZShcbiAgICAgICAgICAgIGZ1bGxOYW1lLCBzdGFydFRhZ1Rva2VuLnNvdXJjZVNwYW4sXG4gICAgICAgICAgICBgT25seSB2b2lkIGFuZCBmb3JlaWduIGVsZW1lbnRzIGNhbiBiZSBzZWxmIGNsb3NlZCBcIiR7c3RhcnRUYWdUb2tlbi5wYXJ0c1sxXX1cImApKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMucGVlay50eXBlID09PSBIdG1sVG9rZW5UeXBlLlRBR19PUEVOX0VORCkge1xuICAgICAgdGhpcy5fYWR2YW5jZSgpO1xuICAgICAgc2VsZkNsb3NpbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGVuZCA9IHRoaXMucGVlay5zb3VyY2VTcGFuLnN0YXJ0O1xuICAgIGxldCBzcGFuID0gbmV3IFBhcnNlU291cmNlU3BhbihzdGFydFRhZ1Rva2VuLnNvdXJjZVNwYW4uc3RhcnQsIGVuZCk7XG4gICAgdmFyIGVsID0gbmV3IEh0bWxFbGVtZW50QXN0KGZ1bGxOYW1lLCBhdHRycywgW10sIHNwYW4sIHNwYW4sIG51bGwpO1xuICAgIHRoaXMuX3B1c2hFbGVtZW50KGVsKTtcbiAgICBpZiAoc2VsZkNsb3NpbmcpIHtcbiAgICAgIHRoaXMuX3BvcEVsZW1lbnQoZnVsbE5hbWUpO1xuICAgICAgZWwuZW5kU291cmNlU3BhbiA9IHNwYW47XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcHVzaEVsZW1lbnQoZWw6IEh0bWxFbGVtZW50QXN0KSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudFN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgIHZhciBwYXJlbnRFbCA9IExpc3RXcmFwcGVyLmxhc3QodGhpcy5lbGVtZW50U3RhY2spO1xuICAgICAgaWYgKGdldEh0bWxUYWdEZWZpbml0aW9uKHBhcmVudEVsLm5hbWUpLmlzQ2xvc2VkQnlDaGlsZChlbC5uYW1lKSkge1xuICAgICAgICB0aGlzLmVsZW1lbnRTdGFjay5wb3AoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgdGFnRGVmID0gZ2V0SHRtbFRhZ0RlZmluaXRpb24oZWwubmFtZSk7XG4gICAgdmFyIHBhcmVudEVsID0gdGhpcy5fZ2V0UGFyZW50RWxlbWVudCgpO1xuICAgIGlmICh0YWdEZWYucmVxdWlyZUV4dHJhUGFyZW50KGlzUHJlc2VudChwYXJlbnRFbCkgPyBwYXJlbnRFbC5uYW1lIDogbnVsbCkpIHtcbiAgICAgIHZhciBuZXdQYXJlbnQgPSBuZXcgSHRtbEVsZW1lbnRBc3QodGFnRGVmLnBhcmVudFRvQWRkLCBbXSwgW2VsXSwgZWwuc291cmNlU3BhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc3RhcnRTb3VyY2VTcGFuLCBlbC5lbmRTb3VyY2VTcGFuKTtcbiAgICAgIHRoaXMuX2FkZFRvUGFyZW50KG5ld1BhcmVudCk7XG4gICAgICB0aGlzLmVsZW1lbnRTdGFjay5wdXNoKG5ld1BhcmVudCk7XG4gICAgICB0aGlzLmVsZW1lbnRTdGFjay5wdXNoKGVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYWRkVG9QYXJlbnQoZWwpO1xuICAgICAgdGhpcy5lbGVtZW50U3RhY2sucHVzaChlbCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY29uc3VtZUVuZFRhZyhlbmRUYWdUb2tlbjogSHRtbFRva2VuKSB7XG4gICAgdmFyIGZ1bGxOYW1lID1cbiAgICAgICAgZ2V0RWxlbWVudEZ1bGxOYW1lKGVuZFRhZ1Rva2VuLnBhcnRzWzBdLCBlbmRUYWdUb2tlbi5wYXJ0c1sxXSwgdGhpcy5fZ2V0UGFyZW50RWxlbWVudCgpKTtcblxuICAgIHRoaXMuX2dldFBhcmVudEVsZW1lbnQoKS5lbmRTb3VyY2VTcGFuID0gZW5kVGFnVG9rZW4uc291cmNlU3BhbjtcblxuICAgIGlmIChnZXRIdG1sVGFnRGVmaW5pdGlvbihmdWxsTmFtZSkuaXNWb2lkKSB7XG4gICAgICB0aGlzLmVycm9ycy5wdXNoKFxuICAgICAgICAgIEh0bWxUcmVlRXJyb3IuY3JlYXRlKGZ1bGxOYW1lLCBlbmRUYWdUb2tlbi5zb3VyY2VTcGFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBWb2lkIGVsZW1lbnRzIGRvIG5vdCBoYXZlIGVuZCB0YWdzIFwiJHtlbmRUYWdUb2tlbi5wYXJ0c1sxXX1cImApKTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLl9wb3BFbGVtZW50KGZ1bGxOYW1lKSkge1xuICAgICAgdGhpcy5lcnJvcnMucHVzaChIdG1sVHJlZUVycm9yLmNyZWF0ZShmdWxsTmFtZSwgZW5kVGFnVG9rZW4uc291cmNlU3BhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYFVuZXhwZWN0ZWQgY2xvc2luZyB0YWcgXCIke2VuZFRhZ1Rva2VuLnBhcnRzWzFdfVwiYCkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3BvcEVsZW1lbnQoZnVsbE5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGZvciAobGV0IHN0YWNrSW5kZXggPSB0aGlzLmVsZW1lbnRTdGFjay5sZW5ndGggLSAxOyBzdGFja0luZGV4ID49IDA7IHN0YWNrSW5kZXgtLSkge1xuICAgICAgbGV0IGVsID0gdGhpcy5lbGVtZW50U3RhY2tbc3RhY2tJbmRleF07XG4gICAgICBpZiAoZWwubmFtZSA9PSBmdWxsTmFtZSkge1xuICAgICAgICBMaXN0V3JhcHBlci5zcGxpY2UodGhpcy5lbGVtZW50U3RhY2ssIHN0YWNrSW5kZXgsIHRoaXMuZWxlbWVudFN0YWNrLmxlbmd0aCAtIHN0YWNrSW5kZXgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFnZXRIdG1sVGFnRGVmaW5pdGlvbihlbC5uYW1lKS5jbG9zZWRCeVBhcmVudCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnN1bWVBdHRyKGF0dHJOYW1lOiBIdG1sVG9rZW4pOiBIdG1sQXR0ckFzdCB7XG4gICAgdmFyIGZ1bGxOYW1lID0gbWVyZ2VOc0FuZE5hbWUoYXR0ck5hbWUucGFydHNbMF0sIGF0dHJOYW1lLnBhcnRzWzFdKTtcbiAgICB2YXIgZW5kID0gYXR0ck5hbWUuc291cmNlU3Bhbi5lbmQ7XG4gICAgdmFyIHZhbHVlID0gJyc7XG4gICAgaWYgKHRoaXMucGVlay50eXBlID09PSBIdG1sVG9rZW5UeXBlLkFUVFJfVkFMVUUpIHtcbiAgICAgIHZhciB2YWx1ZVRva2VuID0gdGhpcy5fYWR2YW5jZSgpO1xuICAgICAgdmFsdWUgPSB2YWx1ZVRva2VuLnBhcnRzWzBdO1xuICAgICAgZW5kID0gdmFsdWVUb2tlbi5zb3VyY2VTcGFuLmVuZDtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBIdG1sQXR0ckFzdChmdWxsTmFtZSwgdmFsdWUsIG5ldyBQYXJzZVNvdXJjZVNwYW4oYXR0ck5hbWUuc291cmNlU3Bhbi5zdGFydCwgZW5kKSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRQYXJlbnRFbGVtZW50KCk6IEh0bWxFbGVtZW50QXN0IHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50U3RhY2subGVuZ3RoID4gMCA/IExpc3RXcmFwcGVyLmxhc3QodGhpcy5lbGVtZW50U3RhY2spIDogbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvUGFyZW50KG5vZGU6IEh0bWxBc3QpIHtcbiAgICB2YXIgcGFyZW50ID0gdGhpcy5fZ2V0UGFyZW50RWxlbWVudCgpO1xuICAgIGlmIChpc1ByZXNlbnQocGFyZW50KSkge1xuICAgICAgcGFyZW50LmNoaWxkcmVuLnB1c2gobm9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucm9vdE5vZGVzLnB1c2gobm9kZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldEVsZW1lbnRGdWxsTmFtZShwcmVmaXg6IHN0cmluZywgbG9jYWxOYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50RWxlbWVudDogSHRtbEVsZW1lbnRBc3QpOiBzdHJpbmcge1xuICBpZiAoaXNCbGFuayhwcmVmaXgpKSB7XG4gICAgcHJlZml4ID0gZ2V0SHRtbFRhZ0RlZmluaXRpb24obG9jYWxOYW1lKS5pbXBsaWNpdE5hbWVzcGFjZVByZWZpeDtcbiAgICBpZiAoaXNCbGFuayhwcmVmaXgpICYmIGlzUHJlc2VudChwYXJlbnRFbGVtZW50KSkge1xuICAgICAgcHJlZml4ID0gZ2V0TnNQcmVmaXgocGFyZW50RWxlbWVudC5uYW1lKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWVyZ2VOc0FuZE5hbWUocHJlZml4LCBsb2NhbE5hbWUpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
