System.register(["angular2/src/compiler/parse_util", "angular2/src/facade/lang", "angular2/src/compiler/css/lexer"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var parse_util_1, lang_1, lexer_1;
    var BlockType, EOF_DELIM, RBRACE_DELIM, LBRACE_DELIM, COMMA_DELIM, COLON_DELIM, SEMICOLON_DELIM, NEWLINE_DELIM, RPAREN_DELIM, CssAST, ParsedCssResult, CssParser, CssStyleValueAST, CssRuleAST, CssBlockRuleAST, CssKeyframeRuleAST, CssKeyframeDefinitionAST, CssBlockDefinitionRuleAST, CssMediaQueryRuleAST, CssInlineRuleAST, CssSelectorRuleAST, CssDefinitionAST, CssSelectorAST, CssBlockAST, CssStyleSheetAST, CssParseError, CssUnknownTokenListAST;
    function mergeTokens(tokens, separator) {
        if (separator === void 0) { separator = ""; }
        var mainToken = tokens[0];
        var str = mainToken.strValue;
        for (var i = 1; i < tokens.length; i++) {
            str += separator + tokens[i].strValue;
        }
        return new lexer_1.CssToken(mainToken.index, mainToken.column, mainToken.line, mainToken.type, str);
    }
    function getDelimFromToken(token) {
        return getDelimFromCharacter(token.numValue);
    }
    function getDelimFromCharacter(code) {
        switch (code) {
            case lexer_1.$EOF:
                return EOF_DELIM;
            case lexer_1.$COMMA:
                return COMMA_DELIM;
            case lexer_1.$COLON:
                return COLON_DELIM;
            case lexer_1.$SEMICOLON:
                return SEMICOLON_DELIM;
            case lexer_1.$RBRACE:
                return RBRACE_DELIM;
            case lexer_1.$LBRACE:
                return LBRACE_DELIM;
            case lexer_1.$RPAREN:
                return RPAREN_DELIM;
            default:
                return lexer_1.isNewline(code) ? NEWLINE_DELIM : 0;
        }
    }
    function characterContainsDelimiter(code, delimiters) {
        return lang_1.bitWiseAnd([getDelimFromCharacter(code), delimiters]) > 0;
    }
    return {
        setters:[
            function (parse_util_1_1) {
                parse_util_1 = parse_util_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (lexer_1_1) {
                lexer_1 = lexer_1_1;
                exports_1({
                    "CssToken": lexer_1_1["CssToken"]
                });
            }],
        execute: function() {
            (function (BlockType) {
                BlockType[BlockType["Import"] = 0] = "Import";
                BlockType[BlockType["Charset"] = 1] = "Charset";
                BlockType[BlockType["Namespace"] = 2] = "Namespace";
                BlockType[BlockType["Supports"] = 3] = "Supports";
                BlockType[BlockType["Keyframes"] = 4] = "Keyframes";
                BlockType[BlockType["MediaQuery"] = 5] = "MediaQuery";
                BlockType[BlockType["Selector"] = 6] = "Selector";
                BlockType[BlockType["FontFace"] = 7] = "FontFace";
                BlockType[BlockType["Page"] = 8] = "Page";
                BlockType[BlockType["Document"] = 9] = "Document";
                BlockType[BlockType["Viewport"] = 10] = "Viewport";
                BlockType[BlockType["Unsupported"] = 11] = "Unsupported";
            })(BlockType || (BlockType = {}));
            exports_1("BlockType", BlockType);
            EOF_DELIM = 1;
            RBRACE_DELIM = 2;
            LBRACE_DELIM = 4;
            COMMA_DELIM = 8;
            COLON_DELIM = 16;
            SEMICOLON_DELIM = 32;
            NEWLINE_DELIM = 64;
            RPAREN_DELIM = 128;
            CssAST = (function () {
                function CssAST() {
                }
                CssAST.prototype.visit = function (visitor, context) { };
                return CssAST;
            }());
            exports_1("CssAST", CssAST);
            ParsedCssResult = (function () {
                function ParsedCssResult(errors, ast) {
                    this.errors = errors;
                    this.ast = ast;
                }
                return ParsedCssResult;
            }());
            exports_1("ParsedCssResult", ParsedCssResult);
            CssParser = (function () {
                function CssParser(_scanner, _fileName) {
                    this._scanner = _scanner;
                    this._fileName = _fileName;
                    this._errors = [];
                    this._file = new parse_util_1.ParseSourceFile(this._scanner.input, _fileName);
                }
                /** @internal */
                CssParser.prototype._resolveBlockType = function (token) {
                    switch (token.strValue) {
                        case '@-o-keyframes':
                        case '@-moz-keyframes':
                        case '@-webkit-keyframes':
                        case '@keyframes':
                            return BlockType.Keyframes;
                        case '@charset':
                            return BlockType.Charset;
                        case '@import':
                            return BlockType.Import;
                        case '@namespace':
                            return BlockType.Namespace;
                        case '@page':
                            return BlockType.Page;
                        case '@document':
                            return BlockType.Document;
                        case '@media':
                            return BlockType.MediaQuery;
                        case '@font-face':
                            return BlockType.FontFace;
                        case '@viewport':
                            return BlockType.Viewport;
                        case '@supports':
                            return BlockType.Supports;
                        default:
                            return BlockType.Unsupported;
                    }
                };
                CssParser.prototype.parse = function () {
                    var delimiters = EOF_DELIM;
                    var ast = this._parseStyleSheet(delimiters);
                    var errors = this._errors;
                    this._errors = [];
                    return new ParsedCssResult(errors, ast);
                };
                /** @internal */
                CssParser.prototype._parseStyleSheet = function (delimiters) {
                    var results = [];
                    this._scanner.consumeEmptyStatements();
                    while (this._scanner.peek != lexer_1.$EOF) {
                        this._scanner.setMode(lexer_1.CssLexerMode.BLOCK);
                        results.push(this._parseRule(delimiters));
                    }
                    return new CssStyleSheetAST(results);
                };
                /** @internal */
                CssParser.prototype._parseRule = function (delimiters) {
                    if (this._scanner.peek == lexer_1.$AT) {
                        return this._parseAtRule(delimiters);
                    }
                    return this._parseSelectorRule(delimiters);
                };
                /** @internal */
                CssParser.prototype._parseAtRule = function (delimiters) {
                    this._scanner.setMode(lexer_1.CssLexerMode.BLOCK);
                    var token = this._scan();
                    this._assertCondition(token.type == lexer_1.CssTokenType.AtKeyword, "The CSS Rule " + token.strValue + " is not a valid [@] rule.", token);
                    var block, type = this._resolveBlockType(token);
                    switch (type) {
                        case BlockType.Charset:
                        case BlockType.Namespace:
                        case BlockType.Import:
                            var value = this._parseValue(delimiters);
                            this._scanner.setMode(lexer_1.CssLexerMode.BLOCK);
                            this._scanner.consumeEmptyStatements();
                            return new CssInlineRuleAST(type, value);
                        case BlockType.Viewport:
                        case BlockType.FontFace:
                            block = this._parseStyleBlock(delimiters);
                            return new CssBlockRuleAST(type, block);
                        case BlockType.Keyframes:
                            var tokens = this._collectUntilDelim(lang_1.bitWiseOr([delimiters, RBRACE_DELIM, LBRACE_DELIM]));
                            // keyframes only have one identifier name
                            var name = tokens[0];
                            return new CssKeyframeRuleAST(name, this._parseKeyframeBlock(delimiters));
                        case BlockType.MediaQuery:
                            this._scanner.setMode(lexer_1.CssLexerMode.MEDIA_QUERY);
                            var tokens = this._collectUntilDelim(lang_1.bitWiseOr([delimiters, RBRACE_DELIM, LBRACE_DELIM]));
                            return new CssMediaQueryRuleAST(tokens, this._parseBlock(delimiters));
                        case BlockType.Document:
                        case BlockType.Supports:
                        case BlockType.Page:
                            this._scanner.setMode(lexer_1.CssLexerMode.AT_RULE_QUERY);
                            var tokens = this._collectUntilDelim(lang_1.bitWiseOr([delimiters, RBRACE_DELIM, LBRACE_DELIM]));
                            return new CssBlockDefinitionRuleAST(type, tokens, this._parseBlock(delimiters));
                        // if a custom @rule { ... } is used it should still tokenize the insides
                        default:
                            var listOfTokens = [];
                            this._scanner.setMode(lexer_1.CssLexerMode.ALL);
                            this._error(lexer_1.generateErrorMessage(this._scanner.input, "The CSS \"at\" rule \"" + token.strValue + "\" is not allowed to used here", token.strValue, token.index, token.line, token.column), token);
                            this._collectUntilDelim(lang_1.bitWiseOr([delimiters, LBRACE_DELIM, SEMICOLON_DELIM]))
                                .forEach(function (token) { listOfTokens.push(token); });
                            if (this._scanner.peek == lexer_1.$LBRACE) {
                                this._consume(lexer_1.CssTokenType.Character, '{');
                                this._collectUntilDelim(lang_1.bitWiseOr([delimiters, RBRACE_DELIM, LBRACE_DELIM]))
                                    .forEach(function (token) { listOfTokens.push(token); });
                                this._consume(lexer_1.CssTokenType.Character, '}');
                            }
                            return new CssUnknownTokenListAST(token, listOfTokens);
                    }
                };
                /** @internal */
                CssParser.prototype._parseSelectorRule = function (delimiters) {
                    var selectors = this._parseSelectors(delimiters);
                    var block = this._parseStyleBlock(delimiters);
                    this._scanner.setMode(lexer_1.CssLexerMode.BLOCK);
                    this._scanner.consumeEmptyStatements();
                    return new CssSelectorRuleAST(selectors, block);
                };
                /** @internal */
                CssParser.prototype._parseSelectors = function (delimiters) {
                    delimiters = lang_1.bitWiseOr([delimiters, LBRACE_DELIM]);
                    var selectors = [];
                    var isParsingSelectors = true;
                    while (isParsingSelectors) {
                        selectors.push(this._parseSelector(delimiters));
                        isParsingSelectors = !characterContainsDelimiter(this._scanner.peek, delimiters);
                        if (isParsingSelectors) {
                            this._consume(lexer_1.CssTokenType.Character, ',');
                            isParsingSelectors = !characterContainsDelimiter(this._scanner.peek, delimiters);
                        }
                    }
                    return selectors;
                };
                /** @internal */
                CssParser.prototype._scan = function () {
                    var output = this._scanner.scan();
                    var token = output.token;
                    var error = output.error;
                    if (lang_1.isPresent(error)) {
                        this._error(error.rawMessage, token);
                    }
                    return token;
                };
                /** @internal */
                CssParser.prototype._consume = function (type, value) {
                    if (value === void 0) { value = null; }
                    var output = this._scanner.consume(type, value);
                    var token = output.token;
                    var error = output.error;
                    if (lang_1.isPresent(error)) {
                        this._error(error.rawMessage, token);
                    }
                    return token;
                };
                /** @internal */
                CssParser.prototype._parseKeyframeBlock = function (delimiters) {
                    delimiters = lang_1.bitWiseOr([delimiters, RBRACE_DELIM]);
                    this._scanner.setMode(lexer_1.CssLexerMode.KEYFRAME_BLOCK);
                    this._consume(lexer_1.CssTokenType.Character, '{');
                    var definitions = [];
                    while (!characterContainsDelimiter(this._scanner.peek, delimiters)) {
                        definitions.push(this._parseKeyframeDefinition(delimiters));
                    }
                    this._consume(lexer_1.CssTokenType.Character, '}');
                    return new CssBlockAST(definitions);
                };
                /** @internal */
                CssParser.prototype._parseKeyframeDefinition = function (delimiters) {
                    var stepTokens = [];
                    delimiters = lang_1.bitWiseOr([delimiters, LBRACE_DELIM]);
                    while (!characterContainsDelimiter(this._scanner.peek, delimiters)) {
                        stepTokens.push(this._parseKeyframeLabel(lang_1.bitWiseOr([delimiters, COMMA_DELIM])));
                        if (this._scanner.peek != lexer_1.$LBRACE) {
                            this._consume(lexer_1.CssTokenType.Character, ',');
                        }
                    }
                    var styles = this._parseStyleBlock(lang_1.bitWiseOr([delimiters, RBRACE_DELIM]));
                    this._scanner.setMode(lexer_1.CssLexerMode.BLOCK);
                    return new CssKeyframeDefinitionAST(stepTokens, styles);
                };
                /** @internal */
                CssParser.prototype._parseKeyframeLabel = function (delimiters) {
                    this._scanner.setMode(lexer_1.CssLexerMode.KEYFRAME_BLOCK);
                    return mergeTokens(this._collectUntilDelim(delimiters));
                };
                /** @internal */
                CssParser.prototype._parseSelector = function (delimiters) {
                    delimiters = lang_1.bitWiseOr([delimiters, COMMA_DELIM, LBRACE_DELIM]);
                    this._scanner.setMode(lexer_1.CssLexerMode.SELECTOR);
                    var selectorCssTokens = [];
                    var isComplex = false;
                    var wsCssToken;
                    var previousToken;
                    var parenCount = 0;
                    while (!characterContainsDelimiter(this._scanner.peek, delimiters)) {
                        var code = this._scanner.peek;
                        switch (code) {
                            case lexer_1.$LPAREN:
                                parenCount++;
                                break;
                            case lexer_1.$RPAREN:
                                parenCount--;
                                break;
                            case lexer_1.$COLON:
                                this._scanner.setMode(lexer_1.CssLexerMode.PSEUDO_SELECTOR);
                                previousToken = this._consume(lexer_1.CssTokenType.Character, ':');
                                selectorCssTokens.push(previousToken);
                                continue;
                            case lexer_1.$LBRACKET:
                                // if we are already inside an attribute selector then we can't
                                // jump into the mode again. Therefore this error will get picked
                                // up when the scan method is called below.
                                if (this._scanner.getMode() != lexer_1.CssLexerMode.ATTRIBUTE_SELECTOR) {
                                    selectorCssTokens.push(this._consume(lexer_1.CssTokenType.Character, '['));
                                    this._scanner.setMode(lexer_1.CssLexerMode.ATTRIBUTE_SELECTOR);
                                    continue;
                                }
                                break;
                            case lexer_1.$RBRACKET:
                                selectorCssTokens.push(this._consume(lexer_1.CssTokenType.Character, ']'));
                                this._scanner.setMode(lexer_1.CssLexerMode.SELECTOR);
                                continue;
                        }
                        var token = this._scan();
                        // special case for the ":not(" selector since it
                        // contains an inner selector that needs to be parsed
                        // in isolation
                        if (this._scanner.getMode() == lexer_1.CssLexerMode.PSEUDO_SELECTOR && lang_1.isPresent(previousToken) &&
                            previousToken.numValue == lexer_1.$COLON && token.strValue == "not" &&
                            this._scanner.peek == lexer_1.$LPAREN) {
                            selectorCssTokens.push(token);
                            selectorCssTokens.push(this._consume(lexer_1.CssTokenType.Character, '('));
                            // the inner selector inside of :not(...) can only be one
                            // CSS selector (no commas allowed) therefore we parse only
                            // one selector by calling the method below
                            this._parseSelector(lang_1.bitWiseOr([delimiters, RPAREN_DELIM]))
                                .tokens.forEach(function (innerSelectorToken) { selectorCssTokens.push(innerSelectorToken); });
                            selectorCssTokens.push(this._consume(lexer_1.CssTokenType.Character, ')'));
                            continue;
                        }
                        previousToken = token;
                        if (token.type == lexer_1.CssTokenType.Whitespace) {
                            wsCssToken = token;
                        }
                        else {
                            if (lang_1.isPresent(wsCssToken)) {
                                selectorCssTokens.push(wsCssToken);
                                wsCssToken = null;
                                isComplex = true;
                            }
                            selectorCssTokens.push(token);
                        }
                    }
                    if (this._scanner.getMode() == lexer_1.CssLexerMode.ATTRIBUTE_SELECTOR) {
                        this._error("Unbalanced CSS attribute selector at column " + previousToken.line + ":" + previousToken.column, previousToken);
                    }
                    else if (parenCount > 0) {
                        this._error("Unbalanced pseudo selector function value at column " + previousToken.line + ":" + previousToken.column, previousToken);
                    }
                    return new CssSelectorAST(selectorCssTokens, isComplex);
                };
                /** @internal */
                CssParser.prototype._parseValue = function (delimiters) {
                    delimiters = lang_1.bitWiseOr([delimiters, RBRACE_DELIM, SEMICOLON_DELIM, NEWLINE_DELIM]);
                    this._scanner.setMode(lexer_1.CssLexerMode.STYLE_VALUE);
                    var strValue = "";
                    var tokens = [];
                    var previous;
                    while (!characterContainsDelimiter(this._scanner.peek, delimiters)) {
                        var token;
                        if (lang_1.isPresent(previous) && previous.type == lexer_1.CssTokenType.Identifier &&
                            this._scanner.peek == lexer_1.$LPAREN) {
                            token = this._consume(lexer_1.CssTokenType.Character, '(');
                            tokens.push(token);
                            strValue += token.strValue;
                            this._scanner.setMode(lexer_1.CssLexerMode.STYLE_VALUE_FUNCTION);
                            token = this._scan();
                            tokens.push(token);
                            strValue += token.strValue;
                            this._scanner.setMode(lexer_1.CssLexerMode.STYLE_VALUE);
                            token = this._consume(lexer_1.CssTokenType.Character, ')');
                            tokens.push(token);
                            strValue += token.strValue;
                        }
                        else {
                            token = this._scan();
                            if (token.type != lexer_1.CssTokenType.Whitespace) {
                                tokens.push(token);
                            }
                            strValue += token.strValue;
                        }
                        previous = token;
                    }
                    this._scanner.consumeWhitespace();
                    var code = this._scanner.peek;
                    if (code == lexer_1.$SEMICOLON) {
                        this._consume(lexer_1.CssTokenType.Character, ';');
                    }
                    else if (code != lexer_1.$RBRACE) {
                        this._error(lexer_1.generateErrorMessage(this._scanner.input, "The CSS key/value definition did not end with a semicolon", previous.strValue, previous.index, previous.line, previous.column), previous);
                    }
                    return new CssStyleValueAST(tokens, strValue);
                };
                /** @internal */
                CssParser.prototype._collectUntilDelim = function (delimiters, assertType) {
                    if (assertType === void 0) { assertType = null; }
                    var tokens = [];
                    while (!characterContainsDelimiter(this._scanner.peek, delimiters)) {
                        var val = lang_1.isPresent(assertType) ? this._consume(assertType) : this._scan();
                        tokens.push(val);
                    }
                    return tokens;
                };
                /** @internal */
                CssParser.prototype._parseBlock = function (delimiters) {
                    delimiters = lang_1.bitWiseOr([delimiters, RBRACE_DELIM]);
                    this._scanner.setMode(lexer_1.CssLexerMode.BLOCK);
                    this._consume(lexer_1.CssTokenType.Character, '{');
                    this._scanner.consumeEmptyStatements();
                    var results = [];
                    while (!characterContainsDelimiter(this._scanner.peek, delimiters)) {
                        results.push(this._parseRule(delimiters));
                    }
                    this._consume(lexer_1.CssTokenType.Character, '}');
                    this._scanner.setMode(lexer_1.CssLexerMode.BLOCK);
                    this._scanner.consumeEmptyStatements();
                    return new CssBlockAST(results);
                };
                /** @internal */
                CssParser.prototype._parseStyleBlock = function (delimiters) {
                    delimiters = lang_1.bitWiseOr([delimiters, RBRACE_DELIM, LBRACE_DELIM]);
                    this._scanner.setMode(lexer_1.CssLexerMode.STYLE_BLOCK);
                    this._consume(lexer_1.CssTokenType.Character, '{');
                    this._scanner.consumeEmptyStatements();
                    var definitions = [];
                    while (!characterContainsDelimiter(this._scanner.peek, delimiters)) {
                        definitions.push(this._parseDefinition(delimiters));
                        this._scanner.consumeEmptyStatements();
                    }
                    this._consume(lexer_1.CssTokenType.Character, '}');
                    this._scanner.setMode(lexer_1.CssLexerMode.STYLE_BLOCK);
                    this._scanner.consumeEmptyStatements();
                    return new CssBlockAST(definitions);
                };
                /** @internal */
                CssParser.prototype._parseDefinition = function (delimiters) {
                    this._scanner.setMode(lexer_1.CssLexerMode.STYLE_BLOCK);
                    var prop = this._consume(lexer_1.CssTokenType.Identifier);
                    var parseValue, value = null;
                    // the colon value separates the prop from the style.
                    // there are a few cases as to what could happen if it
                    // is missing
                    switch (this._scanner.peek) {
                        case lexer_1.$COLON:
                            this._consume(lexer_1.CssTokenType.Character, ':');
                            parseValue = true;
                            break;
                        case lexer_1.$SEMICOLON:
                        case lexer_1.$RBRACE:
                        case lexer_1.$EOF:
                            parseValue = false;
                            break;
                        default:
                            var propStr = [prop.strValue];
                            if (this._scanner.peek != lexer_1.$COLON) {
                                // this will throw the error
                                var nextValue = this._consume(lexer_1.CssTokenType.Character, ':');
                                propStr.push(nextValue.strValue);
                                var remainingTokens = this._collectUntilDelim(lang_1.bitWiseOr([delimiters, COLON_DELIM, SEMICOLON_DELIM]), lexer_1.CssTokenType.Identifier);
                                if (remainingTokens.length > 0) {
                                    remainingTokens.forEach(function (token) { propStr.push(token.strValue); });
                                }
                                prop = new lexer_1.CssToken(prop.index, prop.column, prop.line, prop.type, propStr.join(" "));
                            }
                            // this means we've reached the end of the definition and/or block
                            if (this._scanner.peek == lexer_1.$COLON) {
                                this._consume(lexer_1.CssTokenType.Character, ':');
                                parseValue = true;
                            }
                            else {
                                parseValue = false;
                            }
                            break;
                    }
                    if (parseValue) {
                        value = this._parseValue(delimiters);
                    }
                    else {
                        this._error(lexer_1.generateErrorMessage(this._scanner.input, "The CSS property was not paired with a style value", prop.strValue, prop.index, prop.line, prop.column), prop);
                    }
                    return new CssDefinitionAST(prop, value);
                };
                /** @internal */
                CssParser.prototype._assertCondition = function (status, errorMessage, problemToken) {
                    if (!status) {
                        this._error(errorMessage, problemToken);
                        return true;
                    }
                    return false;
                };
                /** @internal */
                CssParser.prototype._error = function (message, problemToken) {
                    var length = problemToken.strValue.length;
                    var error = CssParseError.create(this._file, 0, problemToken.line, problemToken.column, length, message);
                    this._errors.push(error);
                };
                return CssParser;
            }());
            exports_1("CssParser", CssParser);
            CssStyleValueAST = (function (_super) {
                __extends(CssStyleValueAST, _super);
                function CssStyleValueAST(tokens, strValue) {
                    _super.call(this);
                    this.tokens = tokens;
                    this.strValue = strValue;
                }
                CssStyleValueAST.prototype.visit = function (visitor, context) { visitor.visitCssValue(this); };
                return CssStyleValueAST;
            }(CssAST));
            exports_1("CssStyleValueAST", CssStyleValueAST);
            CssRuleAST = (function (_super) {
                __extends(CssRuleAST, _super);
                function CssRuleAST() {
                    _super.apply(this, arguments);
                }
                return CssRuleAST;
            }(CssAST));
            exports_1("CssRuleAST", CssRuleAST);
            CssBlockRuleAST = (function (_super) {
                __extends(CssBlockRuleAST, _super);
                function CssBlockRuleAST(type, block, name) {
                    if (name === void 0) { name = null; }
                    _super.call(this);
                    this.type = type;
                    this.block = block;
                    this.name = name;
                }
                CssBlockRuleAST.prototype.visit = function (visitor, context) { visitor.visitCssBlock(this.block, context); };
                return CssBlockRuleAST;
            }(CssRuleAST));
            exports_1("CssBlockRuleAST", CssBlockRuleAST);
            CssKeyframeRuleAST = (function (_super) {
                __extends(CssKeyframeRuleAST, _super);
                function CssKeyframeRuleAST(name, block) {
                    _super.call(this, BlockType.Keyframes, block, name);
                }
                CssKeyframeRuleAST.prototype.visit = function (visitor, context) { visitor.visitCssKeyframeRule(this, context); };
                return CssKeyframeRuleAST;
            }(CssBlockRuleAST));
            exports_1("CssKeyframeRuleAST", CssKeyframeRuleAST);
            CssKeyframeDefinitionAST = (function (_super) {
                __extends(CssKeyframeDefinitionAST, _super);
                function CssKeyframeDefinitionAST(_steps, block) {
                    _super.call(this, BlockType.Keyframes, block, mergeTokens(_steps, ","));
                    this.steps = _steps;
                }
                CssKeyframeDefinitionAST.prototype.visit = function (visitor, context) {
                    visitor.visitCssKeyframeDefinition(this, context);
                };
                return CssKeyframeDefinitionAST;
            }(CssBlockRuleAST));
            exports_1("CssKeyframeDefinitionAST", CssKeyframeDefinitionAST);
            CssBlockDefinitionRuleAST = (function (_super) {
                __extends(CssBlockDefinitionRuleAST, _super);
                function CssBlockDefinitionRuleAST(type, query, block) {
                    _super.call(this, type, block);
                    this.query = query;
                    this.strValue = query.map(function (token) { return token.strValue; }).join("");
                    var firstCssToken = query[0];
                    this.name = new lexer_1.CssToken(firstCssToken.index, firstCssToken.column, firstCssToken.line, lexer_1.CssTokenType.Identifier, this.strValue);
                }
                CssBlockDefinitionRuleAST.prototype.visit = function (visitor, context) { visitor.visitCssBlock(this.block, context); };
                return CssBlockDefinitionRuleAST;
            }(CssBlockRuleAST));
            exports_1("CssBlockDefinitionRuleAST", CssBlockDefinitionRuleAST);
            CssMediaQueryRuleAST = (function (_super) {
                __extends(CssMediaQueryRuleAST, _super);
                function CssMediaQueryRuleAST(query, block) {
                    _super.call(this, BlockType.MediaQuery, query, block);
                }
                CssMediaQueryRuleAST.prototype.visit = function (visitor, context) { visitor.visitCssMediaQueryRule(this, context); };
                return CssMediaQueryRuleAST;
            }(CssBlockDefinitionRuleAST));
            exports_1("CssMediaQueryRuleAST", CssMediaQueryRuleAST);
            CssInlineRuleAST = (function (_super) {
                __extends(CssInlineRuleAST, _super);
                function CssInlineRuleAST(type, value) {
                    _super.call(this);
                    this.type = type;
                    this.value = value;
                }
                CssInlineRuleAST.prototype.visit = function (visitor, context) { visitor.visitInlineCssRule(this, context); };
                return CssInlineRuleAST;
            }(CssRuleAST));
            exports_1("CssInlineRuleAST", CssInlineRuleAST);
            CssSelectorRuleAST = (function (_super) {
                __extends(CssSelectorRuleAST, _super);
                function CssSelectorRuleAST(selectors, block) {
                    _super.call(this, BlockType.Selector, block);
                    this.selectors = selectors;
                    this.strValue = selectors.map(function (selector) { return selector.strValue; }).join(",");
                }
                CssSelectorRuleAST.prototype.visit = function (visitor, context) { visitor.visitCssSelectorRule(this, context); };
                return CssSelectorRuleAST;
            }(CssBlockRuleAST));
            exports_1("CssSelectorRuleAST", CssSelectorRuleAST);
            CssDefinitionAST = (function (_super) {
                __extends(CssDefinitionAST, _super);
                function CssDefinitionAST(property, value) {
                    _super.call(this);
                    this.property = property;
                    this.value = value;
                }
                CssDefinitionAST.prototype.visit = function (visitor, context) { visitor.visitCssDefinition(this, context); };
                return CssDefinitionAST;
            }(CssAST));
            exports_1("CssDefinitionAST", CssDefinitionAST);
            CssSelectorAST = (function (_super) {
                __extends(CssSelectorAST, _super);
                function CssSelectorAST(tokens, isComplex) {
                    if (isComplex === void 0) { isComplex = false; }
                    _super.call(this);
                    this.tokens = tokens;
                    this.isComplex = isComplex;
                    this.strValue = tokens.map(function (token) { return token.strValue; }).join("");
                }
                CssSelectorAST.prototype.visit = function (visitor, context) { visitor.visitCssSelector(this, context); };
                return CssSelectorAST;
            }(CssAST));
            exports_1("CssSelectorAST", CssSelectorAST);
            CssBlockAST = (function (_super) {
                __extends(CssBlockAST, _super);
                function CssBlockAST(entries) {
                    _super.call(this);
                    this.entries = entries;
                }
                CssBlockAST.prototype.visit = function (visitor, context) { visitor.visitCssBlock(this, context); };
                return CssBlockAST;
            }(CssAST));
            exports_1("CssBlockAST", CssBlockAST);
            CssStyleSheetAST = (function (_super) {
                __extends(CssStyleSheetAST, _super);
                function CssStyleSheetAST(rules) {
                    _super.call(this);
                    this.rules = rules;
                }
                CssStyleSheetAST.prototype.visit = function (visitor, context) { visitor.visitCssStyleSheet(this, context); };
                return CssStyleSheetAST;
            }(CssAST));
            exports_1("CssStyleSheetAST", CssStyleSheetAST);
            CssParseError = (function (_super) {
                __extends(CssParseError, _super);
                function CssParseError(span, message) {
                    _super.call(this, span, message);
                }
                CssParseError.create = function (file, offset, line, col, length, errMsg) {
                    var start = new parse_util_1.ParseLocation(file, offset, line, col);
                    var end = new parse_util_1.ParseLocation(file, offset, line, col + length);
                    var span = new parse_util_1.ParseSourceSpan(start, end);
                    return new CssParseError(span, "CSS Parse Error: " + errMsg);
                };
                return CssParseError;
            }(parse_util_1.ParseError));
            exports_1("CssParseError", CssParseError);
            CssUnknownTokenListAST = (function (_super) {
                __extends(CssUnknownTokenListAST, _super);
                function CssUnknownTokenListAST(name, tokens) {
                    _super.call(this);
                    this.name = name;
                    this.tokens = tokens;
                }
                CssUnknownTokenListAST.prototype.visit = function (visitor, context) { visitor.visitUnkownRule(this, context); };
                return CssUnknownTokenListAST;
            }(CssRuleAST));
            exports_1("CssUnknownTokenListAST", CssUnknownTokenListAST);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9jc3MvcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OzttQkFxRE0sU0FBUyxFQUNULFlBQVksRUFDWixZQUFZLEVBQ1osV0FBVyxFQUNYLFdBQVcsRUFDWCxlQUFlLEVBQ2YsYUFBYSxFQUNiLFlBQVk7SUFFbEIscUJBQXFCLE1BQWtCLEVBQUUsU0FBc0I7UUFBdEIseUJBQXNCLEdBQXRCLGNBQXNCO1FBQzdELElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixJQUFJLEdBQUcsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDO1FBQzdCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3ZDLEdBQUcsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUN4QyxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksZ0JBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFRCwyQkFBMkIsS0FBZTtRQUN4QyxNQUFNLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCwrQkFBK0IsSUFBWTtRQUN6QyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2IsS0FBSyxZQUFJO2dCQUNQLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDbkIsS0FBSyxjQUFNO2dCQUNULE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFDckIsS0FBSyxjQUFNO2dCQUNULE1BQU0sQ0FBQyxXQUFX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QUFZLEVBQUUsR0FBVyxFQUFFLE1BQWMsRUFDaEYsTUFBYztvQkFDMUIsSUFBSSxLQUFLLEdBQUcsSUFBSSwwQkFBYSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN2RCxJQUFJLEdBQUcsR0FBRyxJQUFJLDBCQUFhLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDO29CQUM5RCxJQUFJLElBQUksR0FBRyxJQUFJLDRCQUFlLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUMzQyxNQUFNLENBQUMsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxDQUFDO2dCQUMvRCxDQUFDO2dCQUdILG9CQUFDO1lBQUQsQ0FWQSxBQVVDLENBVmtDLHVCQUFVLEdBVTVDO1lBVkQseUNBVUMsQ0FBQTtZQUVEO2dCQUE0QywwQ0FBVTtnQkFDcEQsZ0NBQW1CLElBQUksRUFBUyxNQUFrQjtvQkFBSSxpQkFBTyxDQUFDO29CQUEzQyxTQUFJLEdBQUosSUFBSSxDQUFBO29CQUFTLFdBQU0sR0FBTixNQUFNLENBQVk7Z0JBQWEsQ0FBQztnQkFDaEUsc0NBQUssR0FBTCxVQUFNLE9BQXNCLEVBQUUsT0FBYSxJQUFJLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUYsNkJBQUM7WUFBRCxDQUhBLEFBR0MsQ0FIMkMsVUFBVSxHQUdyRDtZQUhELDJEQUdDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL2Nzcy9wYXJzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBQYXJzZVNvdXJjZVNwYW4sXG4gIFBhcnNlU291cmNlRmlsZSxcbiAgUGFyc2VMb2NhdGlvbixcbiAgUGFyc2VFcnJvclxufSBmcm9tIFwiYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3BhcnNlX3V0aWxcIjtcblxuaW1wb3J0IHtcbiAgYml0V2lzZU9yLFxuICBiaXRXaXNlQW5kLFxuICBOdW1iZXJXcmFwcGVyLFxuICBTdHJpbmdXcmFwcGVyLFxuICBpc1ByZXNlbnRcbn0gZnJvbSBcImFuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZ1wiO1xuXG5pbXBvcnQge1xuICBDc3NMZXhlck1vZGUsXG4gIENzc1Rva2VuLFxuICBDc3NUb2tlblR5cGUsXG4gIENzc1NjYW5uZXIsXG4gIENzc1NjYW5uZXJFcnJvcixcbiAgZ2VuZXJhdGVFcnJvck1lc3NhZ2UsXG4gICRBVCxcbiAgJEVPRixcbiAgJFJCUkFDRSxcbiAgJExCUkFDRSxcbiAgJExCUkFDS0VULFxuICAkUkJSQUNLRVQsXG4gICRMUEFSRU4sXG4gICRSUEFSRU4sXG4gICRDT01NQSxcbiAgJENPTE9OLFxuICAkU0VNSUNPTE9OLFxuICBpc05ld2xpbmVcbn0gZnJvbSBcImFuZ3VsYXIyL3NyYy9jb21waWxlci9jc3MvbGV4ZXJcIjtcblxuZXhwb3J0IHtDc3NUb2tlbn0gZnJvbSBcImFuZ3VsYXIyL3NyYy9jb21waWxlci9jc3MvbGV4ZXJcIjtcblxuZXhwb3J0IGVudW0gQmxvY2tUeXBlIHtcbiAgSW1wb3J0LFxuICBDaGFyc2V0LFxuICBOYW1lc3BhY2UsXG4gIFN1cHBvcnRzLFxuICBLZXlmcmFtZXMsXG4gIE1lZGlhUXVlcnksXG4gIFNlbGVjdG9yLFxuICBGb250RmFjZSxcbiAgUGFnZSxcbiAgRG9jdW1lbnQsXG4gIFZpZXdwb3J0LFxuICBVbnN1cHBvcnRlZFxufVxuXG5jb25zdCBFT0ZfREVMSU0gPSAxO1xuY29uc3QgUkJSQUNFX0RFTElNID0gMjtcbmNvbnN0IExCUkFDRV9ERUxJTSA9IDQ7XG5jb25zdCBDT01NQV9ERUxJTSA9IDg7XG5jb25zdCBDT0xPTl9ERUxJTSA9IDE2O1xuY29uc3QgU0VNSUNPTE9OX0RFTElNID0gMzI7XG5jb25zdCBORVdMSU5FX0RFTElNID0gNjQ7XG5jb25zdCBSUEFSRU5fREVMSU0gPSAxMjg7XG5cbmZ1bmN0aW9uIG1lcmdlVG9rZW5zKHRva2VuczogQ3NzVG9rZW5bXSwgc2VwYXJhdG9yOiBzdHJpbmcgPSBcIlwiKTogQ3NzVG9rZW4ge1xuICB2YXIgbWFpblRva2VuID0gdG9rZW5zWzBdO1xuICB2YXIgc3RyID0gbWFpblRva2VuLnN0clZhbHVlO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgIHN0ciArPSBzZXBhcmF0b3IgKyB0b2tlbnNbaV0uc3RyVmFsdWU7XG4gIH1cblxuICByZXR1cm4gbmV3IENzc1Rva2VuKG1haW5Ub2tlbi5pbmRleCwgbWFpblRva2VuLmNvbHVtbiwgbWFpblRva2VuLmxpbmUsIG1haW5Ub2tlbi50eXBlLCBzdHIpO1xufVxuXG5mdW5jdGlvbiBnZXREZWxpbUZyb21Ub2tlbih0b2tlbjogQ3NzVG9rZW4pOiBudW1iZXIge1xuICByZXR1cm4gZ2V0RGVsaW1Gcm9tQ2hhcmFjdGVyKHRva2VuLm51bVZhbHVlKTtcbn1cblxuZnVuY3Rpb24gZ2V0RGVsaW1Gcm9tQ2hhcmFjdGVyKGNvZGU6IG51bWJlcik6IG51bWJlciB7XG4gIHN3aXRjaCAoY29kZSkge1xuICAgIGNhc2UgJEVPRjpcbiAgICAgIHJldHVybiBFT0ZfREVMSU07XG4gICAgY2FzZSAkQ09NTUE6XG4gICAgICByZXR1cm4gQ09NTUFfREVMSU07XG4gICAgY2FzZSAkQ09MT046XG4gICAgICByZXR1cm4gQ09MT05fREVMSU07XG4gICAgY2FzZSAkU0VNSUNPTE9OOlxuICAgICAgcmV0dXJuIFNFTUlDT0xPTl9ERUxJTTtcbiAgICBjYXNlICRSQlJBQ0U6XG4gICAgICByZXR1cm4gUkJSQUNFX0RFTElNO1xuICAgIGNhc2UgJExCUkFDRTpcbiAgICAgIHJldHVybiBMQlJBQ0VfREVMSU07XG4gICAgY2FzZSAkUlBBUkVOOlxuICAgICAgcmV0dXJuIFJQQVJFTl9ERUxJTTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGlzTmV3bGluZShjb2RlKSA/IE5FV0xJTkVfREVMSU0gOiAwO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNoYXJhY3RlckNvbnRhaW5zRGVsaW1pdGVyKGNvZGU6IG51bWJlciwgZGVsaW1pdGVyczogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiBiaXRXaXNlQW5kKFtnZXREZWxpbUZyb21DaGFyYWN0ZXIoY29kZSksIGRlbGltaXRlcnNdKSA+IDA7XG59XG5cbmV4cG9ydCBjbGFzcyBDc3NBU1Qge1xuICB2aXNpdCh2aXNpdG9yOiBDc3NBU1RWaXNpdG9yLCBjb250ZXh0PzogYW55KTogdm9pZCB7fVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIENzc0FTVFZpc2l0b3Ige1xuICB2aXNpdENzc1ZhbHVlKGFzdDogQ3NzU3R5bGVWYWx1ZUFTVCwgY29udGV4dD86IGFueSk6IHZvaWQ7XG4gIHZpc2l0SW5saW5lQ3NzUnVsZShhc3Q6IENzc0lubGluZVJ1bGVBU1QsIGNvbnRleHQ/OiBhbnkpOiB2b2lkO1xuICB2aXNpdENzc0tleWZyYW1lUnVsZShhc3Q6IENzc0tleWZyYW1lUnVsZUFTVCwgY29udGV4dD86IGFueSk6IHZvaWQ7XG4gIHZpc2l0Q3NzS2V5ZnJhbWVEZWZpbml0aW9uKGFzdDogQ3NzS2V5ZnJhbWVEZWZpbml0aW9uQVNULCBjb250ZXh0PzogYW55KTogdm9pZDtcbiAgdmlzaXRDc3NNZWRpYVF1ZXJ5UnVsZShhc3Q6IENzc01lZGlhUXVlcnlSdWxlQVNULCBjb250ZXh0PzogYW55KTogdm9pZDtcbiAgdmlzaXRDc3NTZWxlY3RvclJ1bGUoYXN0OiBDc3NTZWxlY3RvclJ1bGVBU1QsIGNvbnRleHQ/OiBhbnkpOiB2b2lkO1xuICB2aXNpdENzc1NlbGVjdG9yKGFzdDogQ3NzU2VsZWN0b3JBU1QsIGNvbnRleHQ/OiBhbnkpOiB2b2lkO1xuICB2aXNpdENzc0RlZmluaXRpb24oYXN0OiBDc3NEZWZpbml0aW9uQVNULCBjb250ZXh0PzogYW55KTogdm9pZDtcbiAgdmlzaXRDc3NCbG9jayhhc3Q6IENzc0Jsb2NrQVNULCBjb250ZXh0PzogYW55KTogdm9pZDtcbiAgdmlzaXRDc3NTdHlsZVNoZWV0KGFzdDogQ3NzU3R5bGVTaGVldEFTVCwgY29udGV4dD86IGFueSk6IHZvaWQ7XG4gIHZpc2l0VW5rb3duUnVsZShhc3Q6IENzc1Vua25vd25Ub2tlbkxpc3RBU1QsIGNvbnRleHQ/OiBhbnkpOiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgUGFyc2VkQ3NzUmVzdWx0IHtcbiAgY29uc3RydWN0b3IocHVibGljIGVycm9yczogQ3NzUGFyc2VFcnJvcltdLCBwdWJsaWMgYXN0OiBDc3NTdHlsZVNoZWV0QVNUKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgQ3NzUGFyc2VyIHtcbiAgcHJpdmF0ZSBfZXJyb3JzOiBDc3NQYXJzZUVycm9yW10gPSBbXTtcbiAgcHJpdmF0ZSBfZmlsZTogUGFyc2VTb3VyY2VGaWxlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NjYW5uZXI6IENzc1NjYW5uZXIsIHByaXZhdGUgX2ZpbGVOYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9maWxlID0gbmV3IFBhcnNlU291cmNlRmlsZSh0aGlzLl9zY2FubmVyLmlucHV0LCBfZmlsZU5hbWUpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcmVzb2x2ZUJsb2NrVHlwZSh0b2tlbjogQ3NzVG9rZW4pOiBCbG9ja1R5cGUge1xuICAgIHN3aXRjaCAodG9rZW4uc3RyVmFsdWUpIHtcbiAgICAgIGNhc2UgJ0Atby1rZXlmcmFtZXMnOlxuICAgICAgY2FzZSAnQC1tb3ota2V5ZnJhbWVzJzpcbiAgICAgIGNhc2UgJ0Atd2Via2l0LWtleWZyYW1lcyc6XG4gICAgICBjYXNlICdAa2V5ZnJhbWVzJzpcbiAgICAgICAgcmV0dXJuIEJsb2NrVHlwZS5LZXlmcmFtZXM7XG5cbiAgICAgIGNhc2UgJ0BjaGFyc2V0JzpcbiAgICAgICAgcmV0dXJuIEJsb2NrVHlwZS5DaGFyc2V0O1xuXG4gICAgICBjYXNlICdAaW1wb3J0JzpcbiAgICAgICAgcmV0dXJuIEJsb2NrVHlwZS5JbXBvcnQ7XG5cbiAgICAgIGNhc2UgJ0BuYW1lc3BhY2UnOlxuICAgICAgICByZXR1cm4gQmxvY2tUeXBlLk5hbWVzcGFjZTtcblxuICAgICAgY2FzZSAnQHBhZ2UnOlxuICAgICAgICByZXR1cm4gQmxvY2tUeXBlLlBhZ2U7XG5cbiAgICAgIGNhc2UgJ0Bkb2N1bWVudCc6XG4gICAgICAgIHJldHVybiBCbG9ja1R5cGUuRG9jdW1lbnQ7XG5cbiAgICAgIGNhc2UgJ0BtZWRpYSc6XG4gICAgICAgIHJldHVybiBCbG9ja1R5cGUuTWVkaWFRdWVyeTtcblxuICAgICAgY2FzZSAnQGZvbnQtZmFjZSc6XG4gICAgICAgIHJldHVybiBCbG9ja1R5cGUuRm9udEZhY2U7XG5cbiAgICAgIGNhc2UgJ0B2aWV3cG9ydCc6XG4gICAgICAgIHJldHVybiBCbG9ja1R5cGUuVmlld3BvcnQ7XG5cbiAgICAgIGNhc2UgJ0BzdXBwb3J0cyc6XG4gICAgICAgIHJldHVybiBCbG9ja1R5cGUuU3VwcG9ydHM7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBCbG9ja1R5cGUuVW5zdXBwb3J0ZWQ7XG4gICAgfVxuICB9XG5cbiAgcGFyc2UoKTogUGFyc2VkQ3NzUmVzdWx0IHtcbiAgICB2YXIgZGVsaW1pdGVyczogbnVtYmVyID0gRU9GX0RFTElNO1xuICAgIHZhciBhc3QgPSB0aGlzLl9wYXJzZVN0eWxlU2hlZXQoZGVsaW1pdGVycyk7XG5cbiAgICB2YXIgZXJyb3JzID0gdGhpcy5fZXJyb3JzO1xuICAgIHRoaXMuX2Vycm9ycyA9IFtdO1xuXG4gICAgcmV0dXJuIG5ldyBQYXJzZWRDc3NSZXN1bHQoZXJyb3JzLCBhc3QpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcGFyc2VTdHlsZVNoZWV0KGRlbGltaXRlcnMpOiBDc3NTdHlsZVNoZWV0QVNUIHtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgIHRoaXMuX3NjYW5uZXIuY29uc3VtZUVtcHR5U3RhdGVtZW50cygpO1xuICAgIHdoaWxlICh0aGlzLl9zY2FubmVyLnBlZWsgIT0gJEVPRikge1xuICAgICAgdGhpcy5fc2Nhbm5lci5zZXRNb2RlKENzc0xleGVyTW9kZS5CTE9DSyk7XG4gICAgICByZXN1bHRzLnB1c2godGhpcy5fcGFyc2VSdWxlKGRlbGltaXRlcnMpKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBDc3NTdHlsZVNoZWV0QVNUKHJlc3VsdHMpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcGFyc2VSdWxlKGRlbGltaXRlcnM6IG51bWJlcik6IENzc1J1bGVBU1Qge1xuICAgIGlmICh0aGlzLl9zY2FubmVyLnBlZWsgPT0gJEFUKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcGFyc2VBdFJ1bGUoZGVsaW1pdGVycyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9wYXJzZVNlbGVjdG9yUnVsZShkZWxpbWl0ZXJzKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3BhcnNlQXRSdWxlKGRlbGltaXRlcnM6IG51bWJlcik6IENzc1J1bGVBU1Qge1xuICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuQkxPQ0spO1xuXG4gICAgdmFyIHRva2VuID0gdGhpcy5fc2NhbigpO1xuXG4gICAgdGhpcy5fYXNzZXJ0Q29uZGl0aW9uKHRva2VuLnR5cGUgPT0gQ3NzVG9rZW5UeXBlLkF0S2V5d29yZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYFRoZSBDU1MgUnVsZSAke3Rva2VuLnN0clZhbHVlfSBpcyBub3QgYSB2YWxpZCBbQF0gcnVsZS5gLCB0b2tlbik7XG5cbiAgICB2YXIgYmxvY2ssIHR5cGUgPSB0aGlzLl9yZXNvbHZlQmxvY2tUeXBlKHRva2VuKTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgQmxvY2tUeXBlLkNoYXJzZXQ6XG4gICAgICBjYXNlIEJsb2NrVHlwZS5OYW1lc3BhY2U6XG4gICAgICBjYXNlIEJsb2NrVHlwZS5JbXBvcnQ6XG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuX3BhcnNlVmFsdWUoZGVsaW1pdGVycyk7XG4gICAgICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuQkxPQ0spO1xuICAgICAgICB0aGlzLl9zY2FubmVyLmNvbnN1bWVFbXB0eVN0YXRlbWVudHMoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBDc3NJbmxpbmVSdWxlQVNUKHR5cGUsIHZhbHVlKTtcblxuICAgICAgY2FzZSBCbG9ja1R5cGUuVmlld3BvcnQ6XG4gICAgICBjYXNlIEJsb2NrVHlwZS5Gb250RmFjZTpcbiAgICAgICAgYmxvY2sgPSB0aGlzLl9wYXJzZVN0eWxlQmxvY2soZGVsaW1pdGVycyk7XG4gICAgICAgIHJldHVybiBuZXcgQ3NzQmxvY2tSdWxlQVNUKHR5cGUsIGJsb2NrKTtcblxuICAgICAgY2FzZSBCbG9ja1R5cGUuS2V5ZnJhbWVzOlxuICAgICAgICB2YXIgdG9rZW5zID0gdGhpcy5fY29sbGVjdFVudGlsRGVsaW0oYml0V2lzZU9yKFtkZWxpbWl0ZXJzLCBSQlJBQ0VfREVMSU0sIExCUkFDRV9ERUxJTV0pKTtcbiAgICAgICAgLy8ga2V5ZnJhbWVzIG9ubHkgaGF2ZSBvbmUgaWRlbnRpZmllciBuYW1lXG4gICAgICAgIHZhciBuYW1lID0gdG9rZW5zWzBdO1xuICAgICAgICByZXR1cm4gbmV3IENzc0tleWZyYW1lUnVsZUFTVChuYW1lLCB0aGlzLl9wYXJzZUtleWZyYW1lQmxvY2soZGVsaW1pdGVycykpO1xuXG4gICAgICBjYXNlIEJsb2NrVHlwZS5NZWRpYVF1ZXJ5OlxuICAgICAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLk1FRElBX1FVRVJZKTtcbiAgICAgICAgdmFyIHRva2VucyA9IHRoaXMuX2NvbGxlY3RVbnRpbERlbGltKGJpdFdpc2VPcihbZGVsaW1pdGVycywgUkJSQUNFX0RFTElNLCBMQlJBQ0VfREVMSU1dKSk7XG4gICAgICAgIHJldHVybiBuZXcgQ3NzTWVkaWFRdWVyeVJ1bGVBU1QodG9rZW5zLCB0aGlzLl9wYXJzZUJsb2NrKGRlbGltaXRlcnMpKTtcblxuICAgICAgY2FzZSBCbG9ja1R5cGUuRG9jdW1lbnQ6XG4gICAgICBjYXNlIEJsb2NrVHlwZS5TdXBwb3J0czpcbiAgICAgIGNhc2UgQmxvY2tUeXBlLlBhZ2U6XG4gICAgICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuQVRfUlVMRV9RVUVSWSk7XG4gICAgICAgIHZhciB0b2tlbnMgPSB0aGlzLl9jb2xsZWN0VW50aWxEZWxpbShiaXRXaXNlT3IoW2RlbGltaXRlcnMsIFJCUkFDRV9ERUxJTSwgTEJSQUNFX0RFTElNXSkpO1xuICAgICAgICByZXR1cm4gbmV3IENzc0Jsb2NrRGVmaW5pdGlvblJ1bGVBU1QodHlwZSwgdG9rZW5zLCB0aGlzLl9wYXJzZUJsb2NrKGRlbGltaXRlcnMpKTtcblxuICAgICAgLy8gaWYgYSBjdXN0b20gQHJ1bGUgeyAuLi4gfSBpcyB1c2VkIGl0IHNob3VsZCBzdGlsbCB0b2tlbml6ZSB0aGUgaW5zaWRlc1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdmFyIGxpc3RPZlRva2VucyA9IFtdO1xuICAgICAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLkFMTCk7XG4gICAgICAgIHRoaXMuX2Vycm9yKGdlbmVyYXRlRXJyb3JNZXNzYWdlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2Nhbm5lci5pbnB1dCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGBUaGUgQ1NTIFwiYXRcIiBydWxlIFwiJHt0b2tlbi5zdHJWYWx1ZX1cIiBpcyBub3QgYWxsb3dlZCB0byB1c2VkIGhlcmVgLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4uc3RyVmFsdWUsIHRva2VuLmluZGV4LCB0b2tlbi5saW5lLCB0b2tlbi5jb2x1bW4pLFxuICAgICAgICAgICAgICAgICAgICB0b2tlbik7XG5cbiAgICAgICAgdGhpcy5fY29sbGVjdFVudGlsRGVsaW0oYml0V2lzZU9yKFtkZWxpbWl0ZXJzLCBMQlJBQ0VfREVMSU0sIFNFTUlDT0xPTl9ERUxJTV0pKVxuICAgICAgICAgICAgLmZvckVhY2goKHRva2VuKSA9PiB7IGxpc3RPZlRva2Vucy5wdXNoKHRva2VuKTsgfSk7XG4gICAgICAgIGlmICh0aGlzLl9zY2FubmVyLnBlZWsgPT0gJExCUkFDRSkge1xuICAgICAgICAgIHRoaXMuX2NvbnN1bWUoQ3NzVG9rZW5UeXBlLkNoYXJhY3RlciwgJ3snKTtcbiAgICAgICAgICB0aGlzLl9jb2xsZWN0VW50aWxEZWxpbShiaXRXaXNlT3IoW2RlbGltaXRlcnMsIFJCUkFDRV9ERUxJTSwgTEJSQUNFX0RFTElNXSkpXG4gICAgICAgICAgICAgIC5mb3JFYWNoKCh0b2tlbikgPT4geyBsaXN0T2ZUb2tlbnMucHVzaCh0b2tlbik7IH0pO1xuICAgICAgICAgIHRoaXMuX2NvbnN1bWUoQ3NzVG9rZW5UeXBlLkNoYXJhY3RlciwgJ30nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IENzc1Vua25vd25Ub2tlbkxpc3RBU1QodG9rZW4sIGxpc3RPZlRva2Vucyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcGFyc2VTZWxlY3RvclJ1bGUoZGVsaW1pdGVyczogbnVtYmVyKTogQ3NzU2VsZWN0b3JSdWxlQVNUIHtcbiAgICB2YXIgc2VsZWN0b3JzID0gdGhpcy5fcGFyc2VTZWxlY3RvcnMoZGVsaW1pdGVycyk7XG4gICAgdmFyIGJsb2NrID0gdGhpcy5fcGFyc2VTdHlsZUJsb2NrKGRlbGltaXRlcnMpO1xuICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuQkxPQ0spO1xuICAgIHRoaXMuX3NjYW5uZXIuY29uc3VtZUVtcHR5U3RhdGVtZW50cygpO1xuICAgIHJldHVybiBuZXcgQ3NzU2VsZWN0b3JSdWxlQVNUKHNlbGVjdG9ycywgYmxvY2spO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcGFyc2VTZWxlY3RvcnMoZGVsaW1pdGVyczogbnVtYmVyKTogQ3NzU2VsZWN0b3JBU1RbXSB7XG4gICAgZGVsaW1pdGVycyA9IGJpdFdpc2VPcihbZGVsaW1pdGVycywgTEJSQUNFX0RFTElNXSk7XG5cbiAgICB2YXIgc2VsZWN0b3JzID0gW107XG4gICAgdmFyIGlzUGFyc2luZ1NlbGVjdG9ycyA9IHRydWU7XG4gICAgd2hpbGUgKGlzUGFyc2luZ1NlbGVjdG9ycykge1xuICAgICAgc2VsZWN0b3JzLnB1c2godGhpcy5fcGFyc2VTZWxlY3RvcihkZWxpbWl0ZXJzKSk7XG5cbiAgICAgIGlzUGFyc2luZ1NlbGVjdG9ycyA9ICFjaGFyYWN0ZXJDb250YWluc0RlbGltaXRlcih0aGlzLl9zY2FubmVyLnBlZWssIGRlbGltaXRlcnMpO1xuXG4gICAgICBpZiAoaXNQYXJzaW5nU2VsZWN0b3JzKSB7XG4gICAgICAgIHRoaXMuX2NvbnN1bWUoQ3NzVG9rZW5UeXBlLkNoYXJhY3RlciwgJywnKTtcbiAgICAgICAgaXNQYXJzaW5nU2VsZWN0b3JzID0gIWNoYXJhY3RlckNvbnRhaW5zRGVsaW1pdGVyKHRoaXMuX3NjYW5uZXIucGVlaywgZGVsaW1pdGVycyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGVjdG9ycztcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3NjYW4oKTogQ3NzVG9rZW4ge1xuICAgIHZhciBvdXRwdXQgPSB0aGlzLl9zY2FubmVyLnNjYW4oKTtcbiAgICB2YXIgdG9rZW4gPSBvdXRwdXQudG9rZW47XG4gICAgdmFyIGVycm9yID0gb3V0cHV0LmVycm9yO1xuICAgIGlmIChpc1ByZXNlbnQoZXJyb3IpKSB7XG4gICAgICB0aGlzLl9lcnJvcihlcnJvci5yYXdNZXNzYWdlLCB0b2tlbik7XG4gICAgfVxuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NvbnN1bWUodHlwZTogQ3NzVG9rZW5UeXBlLCB2YWx1ZTogc3RyaW5nID0gbnVsbCk6IENzc1Rva2VuIHtcbiAgICB2YXIgb3V0cHV0ID0gdGhpcy5fc2Nhbm5lci5jb25zdW1lKHR5cGUsIHZhbHVlKTtcbiAgICB2YXIgdG9rZW4gPSBvdXRwdXQudG9rZW47XG4gICAgdmFyIGVycm9yID0gb3V0cHV0LmVycm9yO1xuICAgIGlmIChpc1ByZXNlbnQoZXJyb3IpKSB7XG4gICAgICB0aGlzLl9lcnJvcihlcnJvci5yYXdNZXNzYWdlLCB0b2tlbik7XG4gICAgfVxuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3BhcnNlS2V5ZnJhbWVCbG9jayhkZWxpbWl0ZXJzOiBudW1iZXIpOiBDc3NCbG9ja0FTVCB7XG4gICAgZGVsaW1pdGVycyA9IGJpdFdpc2VPcihbZGVsaW1pdGVycywgUkJSQUNFX0RFTElNXSk7XG4gICAgdGhpcy5fc2Nhbm5lci5zZXRNb2RlKENzc0xleGVyTW9kZS5LRVlGUkFNRV9CTE9DSyk7XG5cbiAgICB0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICd7Jyk7XG5cbiAgICB2YXIgZGVmaW5pdGlvbnMgPSBbXTtcbiAgICB3aGlsZSAoIWNoYXJhY3RlckNvbnRhaW5zRGVsaW1pdGVyKHRoaXMuX3NjYW5uZXIucGVlaywgZGVsaW1pdGVycykpIHtcbiAgICAgIGRlZmluaXRpb25zLnB1c2godGhpcy5fcGFyc2VLZXlmcmFtZURlZmluaXRpb24oZGVsaW1pdGVycykpO1xuICAgIH1cblxuICAgIHRoaXMuX2NvbnN1bWUoQ3NzVG9rZW5UeXBlLkNoYXJhY3RlciwgJ30nKTtcblxuICAgIHJldHVybiBuZXcgQ3NzQmxvY2tBU1QoZGVmaW5pdGlvbnMpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcGFyc2VLZXlmcmFtZURlZmluaXRpb24oZGVsaW1pdGVyczogbnVtYmVyKTogQ3NzS2V5ZnJhbWVEZWZpbml0aW9uQVNUIHtcbiAgICB2YXIgc3RlcFRva2VucyA9IFtdO1xuICAgIGRlbGltaXRlcnMgPSBiaXRXaXNlT3IoW2RlbGltaXRlcnMsIExCUkFDRV9ERUxJTV0pO1xuICAgIHdoaWxlICghY2hhcmFjdGVyQ29udGFpbnNEZWxpbWl0ZXIodGhpcy5fc2Nhbm5lci5wZWVrLCBkZWxpbWl0ZXJzKSkge1xuICAgICAgc3RlcFRva2Vucy5wdXNoKHRoaXMuX3BhcnNlS2V5ZnJhbWVMYWJlbChiaXRXaXNlT3IoW2RlbGltaXRlcnMsIENPTU1BX0RFTElNXSkpKTtcbiAgICAgIGlmICh0aGlzLl9zY2FubmVyLnBlZWsgIT0gJExCUkFDRSkge1xuICAgICAgICB0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICcsJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBzdHlsZXMgPSB0aGlzLl9wYXJzZVN0eWxlQmxvY2soYml0V2lzZU9yKFtkZWxpbWl0ZXJzLCBSQlJBQ0VfREVMSU1dKSk7XG4gICAgdGhpcy5fc2Nhbm5lci5zZXRNb2RlKENzc0xleGVyTW9kZS5CTE9DSyk7XG4gICAgcmV0dXJuIG5ldyBDc3NLZXlmcmFtZURlZmluaXRpb25BU1Qoc3RlcFRva2Vucywgc3R5bGVzKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3BhcnNlS2V5ZnJhbWVMYWJlbChkZWxpbWl0ZXJzOiBudW1iZXIpOiBDc3NUb2tlbiB7XG4gICAgdGhpcy5fc2Nhbm5lci5zZXRNb2RlKENzc0xleGVyTW9kZS5LRVlGUkFNRV9CTE9DSyk7XG4gICAgcmV0dXJuIG1lcmdlVG9rZW5zKHRoaXMuX2NvbGxlY3RVbnRpbERlbGltKGRlbGltaXRlcnMpKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3BhcnNlU2VsZWN0b3IoZGVsaW1pdGVyczogbnVtYmVyKTogQ3NzU2VsZWN0b3JBU1Qge1xuICAgIGRlbGltaXRlcnMgPSBiaXRXaXNlT3IoW2RlbGltaXRlcnMsIENPTU1BX0RFTElNLCBMQlJBQ0VfREVMSU1dKTtcbiAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLlNFTEVDVE9SKTtcblxuICAgIHZhciBzZWxlY3RvckNzc1Rva2VucyA9IFtdO1xuICAgIHZhciBpc0NvbXBsZXggPSBmYWxzZTtcbiAgICB2YXIgd3NDc3NUb2tlbjtcblxuICAgIHZhciBwcmV2aW91c1Rva2VuO1xuICAgIHZhciBwYXJlbkNvdW50ID0gMDtcbiAgICB3aGlsZSAoIWNoYXJhY3RlckNvbnRhaW5zRGVsaW1pdGVyKHRoaXMuX3NjYW5uZXIucGVlaywgZGVsaW1pdGVycykpIHtcbiAgICAgIHZhciBjb2RlID0gdGhpcy5fc2Nhbm5lci5wZWVrO1xuICAgICAgc3dpdGNoIChjb2RlKSB7XG4gICAgICAgIGNhc2UgJExQQVJFTjpcbiAgICAgICAgICBwYXJlbkNvdW50Kys7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAkUlBBUkVOOlxuICAgICAgICAgIHBhcmVuQ291bnQtLTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICRDT0xPTjpcbiAgICAgICAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLlBTRVVET19TRUxFQ1RPUik7XG4gICAgICAgICAgcHJldmlvdXNUb2tlbiA9IHRoaXMuX2NvbnN1bWUoQ3NzVG9rZW5UeXBlLkNoYXJhY3RlciwgJzonKTtcbiAgICAgICAgICBzZWxlY3RvckNzc1Rva2Vucy5wdXNoKHByZXZpb3VzVG9rZW4pO1xuICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgIGNhc2UgJExCUkFDS0VUOlxuICAgICAgICAgIC8vIGlmIHdlIGFyZSBhbHJlYWR5IGluc2lkZSBhbiBhdHRyaWJ1dGUgc2VsZWN0b3IgdGhlbiB3ZSBjYW4ndFxuICAgICAgICAgIC8vIGp1bXAgaW50byB0aGUgbW9kZSBhZ2Fpbi4gVGhlcmVmb3JlIHRoaXMgZXJyb3Igd2lsbCBnZXQgcGlja2VkXG4gICAgICAgICAgLy8gdXAgd2hlbiB0aGUgc2NhbiBtZXRob2QgaXMgY2FsbGVkIGJlbG93LlxuICAgICAgICAgIGlmICh0aGlzLl9zY2FubmVyLmdldE1vZGUoKSAhPSBDc3NMZXhlck1vZGUuQVRUUklCVVRFX1NFTEVDVE9SKSB7XG4gICAgICAgICAgICBzZWxlY3RvckNzc1Rva2Vucy5wdXNoKHRoaXMuX2NvbnN1bWUoQ3NzVG9rZW5UeXBlLkNoYXJhY3RlciwgJ1snKSk7XG4gICAgICAgICAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLkFUVFJJQlVURV9TRUxFQ1RPUik7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAkUkJSQUNLRVQ6XG4gICAgICAgICAgc2VsZWN0b3JDc3NUb2tlbnMucHVzaCh0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICddJykpO1xuICAgICAgICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuU0VMRUNUT1IpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgdG9rZW4gPSB0aGlzLl9zY2FuKCk7XG5cbiAgICAgIC8vIHNwZWNpYWwgY2FzZSBmb3IgdGhlIFwiOm5vdChcIiBzZWxlY3RvciBzaW5jZSBpdFxuICAgICAgLy8gY29udGFpbnMgYW4gaW5uZXIgc2VsZWN0b3IgdGhhdCBuZWVkcyB0byBiZSBwYXJzZWRcbiAgICAgIC8vIGluIGlzb2xhdGlvblxuICAgICAgaWYgKHRoaXMuX3NjYW5uZXIuZ2V0TW9kZSgpID09IENzc0xleGVyTW9kZS5QU0VVRE9fU0VMRUNUT1IgJiYgaXNQcmVzZW50KHByZXZpb3VzVG9rZW4pICYmXG4gICAgICAgICAgcHJldmlvdXNUb2tlbi5udW1WYWx1ZSA9PSAkQ09MT04gJiYgdG9rZW4uc3RyVmFsdWUgPT0gXCJub3RcIiAmJlxuICAgICAgICAgIHRoaXMuX3NjYW5uZXIucGVlayA9PSAkTFBBUkVOKSB7XG4gICAgICAgIHNlbGVjdG9yQ3NzVG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICBzZWxlY3RvckNzc1Rva2Vucy5wdXNoKHRoaXMuX2NvbnN1bWUoQ3NzVG9rZW5UeXBlLkNoYXJhY3RlciwgJygnKSk7XG5cbiAgICAgICAgLy8gdGhlIGlubmVyIHNlbGVjdG9yIGluc2lkZSBvZiA6bm90KC4uLikgY2FuIG9ubHkgYmUgb25lXG4gICAgICAgIC8vIENTUyBzZWxlY3RvciAobm8gY29tbWFzIGFsbG93ZWQpIHRoZXJlZm9yZSB3ZSBwYXJzZSBvbmx5XG4gICAgICAgIC8vIG9uZSBzZWxlY3RvciBieSBjYWxsaW5nIHRoZSBtZXRob2QgYmVsb3dcbiAgICAgICAgdGhpcy5fcGFyc2VTZWxlY3RvcihiaXRXaXNlT3IoW2RlbGltaXRlcnMsIFJQQVJFTl9ERUxJTV0pKVxuICAgICAgICAgICAgLnRva2Vucy5mb3JFYWNoKFxuICAgICAgICAgICAgICAgIChpbm5lclNlbGVjdG9yVG9rZW4pID0+IHsgc2VsZWN0b3JDc3NUb2tlbnMucHVzaChpbm5lclNlbGVjdG9yVG9rZW4pOyB9KTtcblxuICAgICAgICBzZWxlY3RvckNzc1Rva2Vucy5wdXNoKHRoaXMuX2NvbnN1bWUoQ3NzVG9rZW5UeXBlLkNoYXJhY3RlciwgJyknKSk7XG5cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHByZXZpb3VzVG9rZW4gPSB0b2tlbjtcblxuICAgICAgaWYgKHRva2VuLnR5cGUgPT0gQ3NzVG9rZW5UeXBlLldoaXRlc3BhY2UpIHtcbiAgICAgICAgd3NDc3NUb2tlbiA9IHRva2VuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh3c0Nzc1Rva2VuKSkge1xuICAgICAgICAgIHNlbGVjdG9yQ3NzVG9rZW5zLnB1c2god3NDc3NUb2tlbik7XG4gICAgICAgICAgd3NDc3NUb2tlbiA9IG51bGw7XG4gICAgICAgICAgaXNDb21wbGV4ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBzZWxlY3RvckNzc1Rva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5fc2Nhbm5lci5nZXRNb2RlKCkgPT0gQ3NzTGV4ZXJNb2RlLkFUVFJJQlVURV9TRUxFQ1RPUikge1xuICAgICAgdGhpcy5fZXJyb3IoXG4gICAgICAgICAgYFVuYmFsYW5jZWQgQ1NTIGF0dHJpYnV0ZSBzZWxlY3RvciBhdCBjb2x1bW4gJHtwcmV2aW91c1Rva2VuLmxpbmV9OiR7cHJldmlvdXNUb2tlbi5jb2x1bW59YCxcbiAgICAgICAgICBwcmV2aW91c1Rva2VuKTtcbiAgICB9IGVsc2UgaWYgKHBhcmVuQ291bnQgPiAwKSB7XG4gICAgICB0aGlzLl9lcnJvcihcbiAgICAgICAgICBgVW5iYWxhbmNlZCBwc2V1ZG8gc2VsZWN0b3IgZnVuY3Rpb24gdmFsdWUgYXQgY29sdW1uICR7cHJldmlvdXNUb2tlbi5saW5lfToke3ByZXZpb3VzVG9rZW4uY29sdW1ufWAsXG4gICAgICAgICAgcHJldmlvdXNUb2tlbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBDc3NTZWxlY3RvckFTVChzZWxlY3RvckNzc1Rva2VucywgaXNDb21wbGV4KTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3BhcnNlVmFsdWUoZGVsaW1pdGVyczogbnVtYmVyKTogQ3NzU3R5bGVWYWx1ZUFTVCB7XG4gICAgZGVsaW1pdGVycyA9IGJpdFdpc2VPcihbZGVsaW1pdGVycywgUkJSQUNFX0RFTElNLCBTRU1JQ09MT05fREVMSU0sIE5FV0xJTkVfREVMSU1dKTtcblxuICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuU1RZTEVfVkFMVUUpO1xuXG4gICAgdmFyIHN0clZhbHVlID0gXCJcIjtcbiAgICB2YXIgdG9rZW5zID0gW107XG4gICAgdmFyIHByZXZpb3VzOiBDc3NUb2tlbjtcbiAgICB3aGlsZSAoIWNoYXJhY3RlckNvbnRhaW5zRGVsaW1pdGVyKHRoaXMuX3NjYW5uZXIucGVlaywgZGVsaW1pdGVycykpIHtcbiAgICAgIHZhciB0b2tlbjtcbiAgICAgIGlmIChpc1ByZXNlbnQocHJldmlvdXMpICYmIHByZXZpb3VzLnR5cGUgPT0gQ3NzVG9rZW5UeXBlLklkZW50aWZpZXIgJiZcbiAgICAgICAgICB0aGlzLl9zY2FubmVyLnBlZWsgPT0gJExQQVJFTikge1xuICAgICAgICB0b2tlbiA9IHRoaXMuX2NvbnN1bWUoQ3NzVG9rZW5UeXBlLkNoYXJhY3RlciwgJygnKTtcbiAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICBzdHJWYWx1ZSArPSB0b2tlbi5zdHJWYWx1ZTtcblxuICAgICAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLlNUWUxFX1ZBTFVFX0ZVTkNUSU9OKTtcblxuICAgICAgICB0b2tlbiA9IHRoaXMuX3NjYW4oKTtcbiAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICBzdHJWYWx1ZSArPSB0b2tlbi5zdHJWYWx1ZTtcblxuICAgICAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLlNUWUxFX1ZBTFVFKTtcblxuICAgICAgICB0b2tlbiA9IHRoaXMuX2NvbnN1bWUoQ3NzVG9rZW5UeXBlLkNoYXJhY3RlciwgJyknKTtcbiAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICBzdHJWYWx1ZSArPSB0b2tlbi5zdHJWYWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRva2VuID0gdGhpcy5fc2NhbigpO1xuICAgICAgICBpZiAodG9rZW4udHlwZSAhPSBDc3NUb2tlblR5cGUuV2hpdGVzcGFjZSkge1xuICAgICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgfVxuICAgICAgICBzdHJWYWx1ZSArPSB0b2tlbi5zdHJWYWx1ZTtcbiAgICAgIH1cblxuICAgICAgcHJldmlvdXMgPSB0b2tlbjtcbiAgICB9XG5cbiAgICB0aGlzLl9zY2FubmVyLmNvbnN1bWVXaGl0ZXNwYWNlKCk7XG5cbiAgICB2YXIgY29kZSA9IHRoaXMuX3NjYW5uZXIucGVlaztcbiAgICBpZiAoY29kZSA9PSAkU0VNSUNPTE9OKSB7XG4gICAgICB0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICc7Jyk7XG4gICAgfSBlbHNlIGlmIChjb2RlICE9ICRSQlJBQ0UpIHtcbiAgICAgIHRoaXMuX2Vycm9yKFxuICAgICAgICAgIGdlbmVyYXRlRXJyb3JNZXNzYWdlKHRoaXMuX3NjYW5uZXIuaW5wdXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYFRoZSBDU1Mga2V5L3ZhbHVlIGRlZmluaXRpb24gZGlkIG5vdCBlbmQgd2l0aCBhIHNlbWljb2xvbmAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMuc3RyVmFsdWUsIHByZXZpb3VzLmluZGV4LCBwcmV2aW91cy5saW5lLCBwcmV2aW91cy5jb2x1bW4pLFxuICAgICAgICAgIHByZXZpb3VzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IENzc1N0eWxlVmFsdWVBU1QodG9rZW5zLCBzdHJWYWx1ZSk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9jb2xsZWN0VW50aWxEZWxpbShkZWxpbWl0ZXJzOiBudW1iZXIsIGFzc2VydFR5cGU6IENzc1Rva2VuVHlwZSA9IG51bGwpOiBDc3NUb2tlbltdIHtcbiAgICB2YXIgdG9rZW5zID0gW107XG4gICAgd2hpbGUgKCFjaGFyYWN0ZXJDb250YWluc0RlbGltaXRlcih0aGlzLl9zY2FubmVyLnBlZWssIGRlbGltaXRlcnMpKSB7XG4gICAgICB2YXIgdmFsID0gaXNQcmVzZW50KGFzc2VydFR5cGUpID8gdGhpcy5fY29uc3VtZShhc3NlcnRUeXBlKSA6IHRoaXMuX3NjYW4oKTtcbiAgICAgIHRva2Vucy5wdXNoKHZhbCk7XG4gICAgfVxuICAgIHJldHVybiB0b2tlbnM7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9wYXJzZUJsb2NrKGRlbGltaXRlcnM6IG51bWJlcik6IENzc0Jsb2NrQVNUIHtcbiAgICBkZWxpbWl0ZXJzID0gYml0V2lzZU9yKFtkZWxpbWl0ZXJzLCBSQlJBQ0VfREVMSU1dKTtcblxuICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuQkxPQ0spO1xuXG4gICAgdGhpcy5fY29uc3VtZShDc3NUb2tlblR5cGUuQ2hhcmFjdGVyLCAneycpO1xuICAgIHRoaXMuX3NjYW5uZXIuY29uc3VtZUVtcHR5U3RhdGVtZW50cygpO1xuXG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICB3aGlsZSAoIWNoYXJhY3RlckNvbnRhaW5zRGVsaW1pdGVyKHRoaXMuX3NjYW5uZXIucGVlaywgZGVsaW1pdGVycykpIHtcbiAgICAgIHJlc3VsdHMucHVzaCh0aGlzLl9wYXJzZVJ1bGUoZGVsaW1pdGVycykpO1xuICAgIH1cblxuICAgIHRoaXMuX2NvbnN1bWUoQ3NzVG9rZW5UeXBlLkNoYXJhY3RlciwgJ30nKTtcblxuICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuQkxPQ0spO1xuICAgIHRoaXMuX3NjYW5uZXIuY29uc3VtZUVtcHR5U3RhdGVtZW50cygpO1xuXG4gICAgcmV0dXJuIG5ldyBDc3NCbG9ja0FTVChyZXN1bHRzKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3BhcnNlU3R5bGVCbG9jayhkZWxpbWl0ZXJzOiBudW1iZXIpOiBDc3NCbG9ja0FTVCB7XG4gICAgZGVsaW1pdGVycyA9IGJpdFdpc2VPcihbZGVsaW1pdGVycywgUkJSQUNFX0RFTElNLCBMQlJBQ0VfREVMSU1dKTtcblxuICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuU1RZTEVfQkxPQ0spO1xuXG4gICAgdGhpcy5fY29uc3VtZShDc3NUb2tlblR5cGUuQ2hhcmFjdGVyLCAneycpO1xuICAgIHRoaXMuX3NjYW5uZXIuY29uc3VtZUVtcHR5U3RhdGVtZW50cygpO1xuXG4gICAgdmFyIGRlZmluaXRpb25zID0gW107XG4gICAgd2hpbGUgKCFjaGFyYWN0ZXJDb250YWluc0RlbGltaXRlcih0aGlzLl9zY2FubmVyLnBlZWssIGRlbGltaXRlcnMpKSB7XG4gICAgICBkZWZpbml0aW9ucy5wdXNoKHRoaXMuX3BhcnNlRGVmaW5pdGlvbihkZWxpbWl0ZXJzKSk7XG4gICAgICB0aGlzLl9zY2FubmVyLmNvbnN1bWVFbXB0eVN0YXRlbWVudHMoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICd9Jyk7XG5cbiAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLlNUWUxFX0JMT0NLKTtcbiAgICB0aGlzLl9zY2FubmVyLmNvbnN1bWVFbXB0eVN0YXRlbWVudHMoKTtcblxuICAgIHJldHVybiBuZXcgQ3NzQmxvY2tBU1QoZGVmaW5pdGlvbnMpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcGFyc2VEZWZpbml0aW9uKGRlbGltaXRlcnM6IG51bWJlcik6IENzc0RlZmluaXRpb25BU1Qge1xuICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuU1RZTEVfQkxPQ0spO1xuXG4gICAgdmFyIHByb3AgPSB0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5JZGVudGlmaWVyKTtcbiAgICB2YXIgcGFyc2VWYWx1ZSwgdmFsdWUgPSBudWxsO1xuXG4gICAgLy8gdGhlIGNvbG9uIHZhbHVlIHNlcGFyYXRlcyB0aGUgcHJvcCBmcm9tIHRoZSBzdHlsZS5cbiAgICAvLyB0aGVyZSBhcmUgYSBmZXcgY2FzZXMgYXMgdG8gd2hhdCBjb3VsZCBoYXBwZW4gaWYgaXRcbiAgICAvLyBpcyBtaXNzaW5nXG4gICAgc3dpdGNoICh0aGlzLl9zY2FubmVyLnBlZWspIHtcbiAgICAgIGNhc2UgJENPTE9OOlxuICAgICAgICB0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICc6Jyk7XG4gICAgICAgIHBhcnNlVmFsdWUgPSB0cnVlO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAkU0VNSUNPTE9OOlxuICAgICAgY2FzZSAkUkJSQUNFOlxuICAgICAgY2FzZSAkRU9GOlxuICAgICAgICBwYXJzZVZhbHVlID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB2YXIgcHJvcFN0ciA9IFtwcm9wLnN0clZhbHVlXTtcbiAgICAgICAgaWYgKHRoaXMuX3NjYW5uZXIucGVlayAhPSAkQ09MT04pIHtcbiAgICAgICAgICAvLyB0aGlzIHdpbGwgdGhyb3cgdGhlIGVycm9yXG4gICAgICAgICAgdmFyIG5leHRWYWx1ZSA9IHRoaXMuX2NvbnN1bWUoQ3NzVG9rZW5UeXBlLkNoYXJhY3RlciwgJzonKTtcbiAgICAgICAgICBwcm9wU3RyLnB1c2gobmV4dFZhbHVlLnN0clZhbHVlKTtcblxuICAgICAgICAgIHZhciByZW1haW5pbmdUb2tlbnMgPSB0aGlzLl9jb2xsZWN0VW50aWxEZWxpbShcbiAgICAgICAgICAgICAgYml0V2lzZU9yKFtkZWxpbWl0ZXJzLCBDT0xPTl9ERUxJTSwgU0VNSUNPTE9OX0RFTElNXSksIENzc1Rva2VuVHlwZS5JZGVudGlmaWVyKTtcbiAgICAgICAgICBpZiAocmVtYWluaW5nVG9rZW5zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJlbWFpbmluZ1Rva2Vucy5mb3JFYWNoKCh0b2tlbikgPT4geyBwcm9wU3RyLnB1c2godG9rZW4uc3RyVmFsdWUpOyB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBwcm9wID0gbmV3IENzc1Rva2VuKHByb3AuaW5kZXgsIHByb3AuY29sdW1uLCBwcm9wLmxpbmUsIHByb3AudHlwZSwgcHJvcFN0ci5qb2luKFwiIFwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aGlzIG1lYW5zIHdlJ3ZlIHJlYWNoZWQgdGhlIGVuZCBvZiB0aGUgZGVmaW5pdGlvbiBhbmQvb3IgYmxvY2tcbiAgICAgICAgaWYgKHRoaXMuX3NjYW5uZXIucGVlayA9PSAkQ09MT04pIHtcbiAgICAgICAgICB0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICc6Jyk7XG4gICAgICAgICAgcGFyc2VWYWx1ZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGFyc2VWYWx1ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChwYXJzZVZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IHRoaXMuX3BhcnNlVmFsdWUoZGVsaW1pdGVycyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2Vycm9yKGdlbmVyYXRlRXJyb3JNZXNzYWdlKHRoaXMuX3NjYW5uZXIuaW5wdXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgVGhlIENTUyBwcm9wZXJ0eSB3YXMgbm90IHBhaXJlZCB3aXRoIGEgc3R5bGUgdmFsdWVgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcC5zdHJWYWx1ZSwgcHJvcC5pbmRleCwgcHJvcC5saW5lLCBwcm9wLmNvbHVtbiksXG4gICAgICAgICAgICAgICAgICBwcm9wKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IENzc0RlZmluaXRpb25BU1QocHJvcCwgdmFsdWUpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfYXNzZXJ0Q29uZGl0aW9uKHN0YXR1czogYm9vbGVhbiwgZXJyb3JNZXNzYWdlOiBzdHJpbmcsIHByb2JsZW1Ub2tlbjogQ3NzVG9rZW4pOiBib29sZWFuIHtcbiAgICBpZiAoIXN0YXR1cykge1xuICAgICAgdGhpcy5fZXJyb3IoZXJyb3JNZXNzYWdlLCBwcm9ibGVtVG9rZW4pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2Vycm9yKG1lc3NhZ2U6IHN0cmluZywgcHJvYmxlbVRva2VuOiBDc3NUb2tlbikge1xuICAgIHZhciBsZW5ndGggPSBwcm9ibGVtVG9rZW4uc3RyVmFsdWUubGVuZ3RoO1xuICAgIHZhciBlcnJvciA9IENzc1BhcnNlRXJyb3IuY3JlYXRlKHRoaXMuX2ZpbGUsIDAsIHByb2JsZW1Ub2tlbi5saW5lLCBwcm9ibGVtVG9rZW4uY29sdW1uLCBsZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSk7XG4gICAgdGhpcy5fZXJyb3JzLnB1c2goZXJyb3IpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDc3NTdHlsZVZhbHVlQVNUIGV4dGVuZHMgQ3NzQVNUIHtcbiAgY29uc3RydWN0b3IocHVibGljIHRva2VuczogQ3NzVG9rZW5bXSwgcHVibGljIHN0clZhbHVlOiBzdHJpbmcpIHsgc3VwZXIoKTsgfVxuICB2aXNpdCh2aXNpdG9yOiBDc3NBU1RWaXNpdG9yLCBjb250ZXh0PzogYW55KSB7IHZpc2l0b3IudmlzaXRDc3NWYWx1ZSh0aGlzKTsgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3NzUnVsZUFTVCBleHRlbmRzIENzc0FTVCB7fVxuXG5leHBvcnQgY2xhc3MgQ3NzQmxvY2tSdWxlQVNUIGV4dGVuZHMgQ3NzUnVsZUFTVCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0eXBlOiBCbG9ja1R5cGUsIHB1YmxpYyBibG9jazogQ3NzQmxvY2tBU1QsIHB1YmxpYyBuYW1lOiBDc3NUb2tlbiA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IENzc0FTVFZpc2l0b3IsIGNvbnRleHQ/OiBhbnkpIHsgdmlzaXRvci52aXNpdENzc0Jsb2NrKHRoaXMuYmxvY2ssIGNvbnRleHQpOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBDc3NLZXlmcmFtZVJ1bGVBU1QgZXh0ZW5kcyBDc3NCbG9ja1J1bGVBU1Qge1xuICBjb25zdHJ1Y3RvcihuYW1lOiBDc3NUb2tlbiwgYmxvY2s6IENzc0Jsb2NrQVNUKSB7IHN1cGVyKEJsb2NrVHlwZS5LZXlmcmFtZXMsIGJsb2NrLCBuYW1lKTsgfVxuICB2aXNpdCh2aXNpdG9yOiBDc3NBU1RWaXNpdG9yLCBjb250ZXh0PzogYW55KSB7IHZpc2l0b3IudmlzaXRDc3NLZXlmcmFtZVJ1bGUodGhpcywgY29udGV4dCk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIENzc0tleWZyYW1lRGVmaW5pdGlvbkFTVCBleHRlbmRzIENzc0Jsb2NrUnVsZUFTVCB7XG4gIHB1YmxpYyBzdGVwcztcbiAgY29uc3RydWN0b3IoX3N0ZXBzOiBDc3NUb2tlbltdLCBibG9jazogQ3NzQmxvY2tBU1QpIHtcbiAgICBzdXBlcihCbG9ja1R5cGUuS2V5ZnJhbWVzLCBibG9jaywgbWVyZ2VUb2tlbnMoX3N0ZXBzLCBcIixcIikpO1xuICAgIHRoaXMuc3RlcHMgPSBfc3RlcHM7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQ3NzQVNUVmlzaXRvciwgY29udGV4dD86IGFueSkge1xuICAgIHZpc2l0b3IudmlzaXRDc3NLZXlmcmFtZURlZmluaXRpb24odGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENzc0Jsb2NrRGVmaW5pdGlvblJ1bGVBU1QgZXh0ZW5kcyBDc3NCbG9ja1J1bGVBU1Qge1xuICBwdWJsaWMgc3RyVmFsdWU6IHN0cmluZztcbiAgY29uc3RydWN0b3IodHlwZTogQmxvY2tUeXBlLCBwdWJsaWMgcXVlcnk6IENzc1Rva2VuW10sIGJsb2NrOiBDc3NCbG9ja0FTVCkge1xuICAgIHN1cGVyKHR5cGUsIGJsb2NrKTtcbiAgICB0aGlzLnN0clZhbHVlID0gcXVlcnkubWFwKHRva2VuID0+IHRva2VuLnN0clZhbHVlKS5qb2luKFwiXCIpO1xuICAgIHZhciBmaXJzdENzc1Rva2VuOiBDc3NUb2tlbiA9IHF1ZXJ5WzBdO1xuICAgIHRoaXMubmFtZSA9IG5ldyBDc3NUb2tlbihmaXJzdENzc1Rva2VuLmluZGV4LCBmaXJzdENzc1Rva2VuLmNvbHVtbiwgZmlyc3RDc3NUb2tlbi5saW5lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDc3NUb2tlblR5cGUuSWRlbnRpZmllciwgdGhpcy5zdHJWYWx1ZSk7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQ3NzQVNUVmlzaXRvciwgY29udGV4dD86IGFueSkgeyB2aXNpdG9yLnZpc2l0Q3NzQmxvY2sodGhpcy5ibG9jaywgY29udGV4dCk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIENzc01lZGlhUXVlcnlSdWxlQVNUIGV4dGVuZHMgQ3NzQmxvY2tEZWZpbml0aW9uUnVsZUFTVCB7XG4gIGNvbnN0cnVjdG9yKHF1ZXJ5OiBDc3NUb2tlbltdLCBibG9jazogQ3NzQmxvY2tBU1QpIHsgc3VwZXIoQmxvY2tUeXBlLk1lZGlhUXVlcnksIHF1ZXJ5LCBibG9jayk7IH1cbiAgdmlzaXQodmlzaXRvcjogQ3NzQVNUVmlzaXRvciwgY29udGV4dD86IGFueSkgeyB2aXNpdG9yLnZpc2l0Q3NzTWVkaWFRdWVyeVJ1bGUodGhpcywgY29udGV4dCk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIENzc0lubGluZVJ1bGVBU1QgZXh0ZW5kcyBDc3NSdWxlQVNUIHtcbiAgY29uc3RydWN0b3IocHVibGljIHR5cGU6IEJsb2NrVHlwZSwgcHVibGljIHZhbHVlOiBDc3NTdHlsZVZhbHVlQVNUKSB7IHN1cGVyKCk7IH1cbiAgdmlzaXQodmlzaXRvcjogQ3NzQVNUVmlzaXRvciwgY29udGV4dD86IGFueSkgeyB2aXNpdG9yLnZpc2l0SW5saW5lQ3NzUnVsZSh0aGlzLCBjb250ZXh0KTsgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3NzU2VsZWN0b3JSdWxlQVNUIGV4dGVuZHMgQ3NzQmxvY2tSdWxlQVNUIHtcbiAgcHVibGljIHN0clZhbHVlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHNlbGVjdG9yczogQ3NzU2VsZWN0b3JBU1RbXSwgYmxvY2s6IENzc0Jsb2NrQVNUKSB7XG4gICAgc3VwZXIoQmxvY2tUeXBlLlNlbGVjdG9yLCBibG9jayk7XG4gICAgdGhpcy5zdHJWYWx1ZSA9IHNlbGVjdG9ycy5tYXAoc2VsZWN0b3IgPT4gc2VsZWN0b3Iuc3RyVmFsdWUpLmpvaW4oXCIsXCIpO1xuICB9XG5cbiAgdmlzaXQodmlzaXRvcjogQ3NzQVNUVmlzaXRvciwgY29udGV4dD86IGFueSkgeyB2aXNpdG9yLnZpc2l0Q3NzU2VsZWN0b3JSdWxlKHRoaXMsIGNvbnRleHQpOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBDc3NEZWZpbml0aW9uQVNUIGV4dGVuZHMgQ3NzQVNUIHtcbiAgY29uc3RydWN0b3IocHVibGljIHByb3BlcnR5OiBDc3NUb2tlbiwgcHVibGljIHZhbHVlOiBDc3NTdHlsZVZhbHVlQVNUKSB7IHN1cGVyKCk7IH1cbiAgdmlzaXQodmlzaXRvcjogQ3NzQVNUVmlzaXRvciwgY29udGV4dD86IGFueSkgeyB2aXNpdG9yLnZpc2l0Q3NzRGVmaW5pdGlvbih0aGlzLCBjb250ZXh0KTsgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3NzU2VsZWN0b3JBU1QgZXh0ZW5kcyBDc3NBU1Qge1xuICBwdWJsaWMgc3RyVmFsdWU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0b2tlbnM6IENzc1Rva2VuW10sIHB1YmxpYyBpc0NvbXBsZXg6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zdHJWYWx1ZSA9IHRva2Vucy5tYXAodG9rZW4gPT4gdG9rZW4uc3RyVmFsdWUpLmpvaW4oXCJcIik7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQ3NzQVNUVmlzaXRvciwgY29udGV4dD86IGFueSkgeyB2aXNpdG9yLnZpc2l0Q3NzU2VsZWN0b3IodGhpcywgY29udGV4dCk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIENzc0Jsb2NrQVNUIGV4dGVuZHMgQ3NzQVNUIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVudHJpZXM6IENzc0FTVFtdKSB7IHN1cGVyKCk7IH1cbiAgdmlzaXQodmlzaXRvcjogQ3NzQVNUVmlzaXRvciwgY29udGV4dD86IGFueSkgeyB2aXNpdG9yLnZpc2l0Q3NzQmxvY2sodGhpcywgY29udGV4dCk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIENzc1N0eWxlU2hlZXRBU1QgZXh0ZW5kcyBDc3NBU1Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcnVsZXM6IENzc0FTVFtdKSB7IHN1cGVyKCk7IH1cbiAgdmlzaXQodmlzaXRvcjogQ3NzQVNUVmlzaXRvciwgY29udGV4dD86IGFueSkgeyB2aXNpdG9yLnZpc2l0Q3NzU3R5bGVTaGVldCh0aGlzLCBjb250ZXh0KTsgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3NzUGFyc2VFcnJvciBleHRlbmRzIFBhcnNlRXJyb3Ige1xuICBzdGF0aWMgY3JlYXRlKGZpbGU6IFBhcnNlU291cmNlRmlsZSwgb2Zmc2V0OiBudW1iZXIsIGxpbmU6IG51bWJlciwgY29sOiBudW1iZXIsIGxlbmd0aDogbnVtYmVyLFxuICAgICAgICAgICAgICAgIGVyck1zZzogc3RyaW5nKTogQ3NzUGFyc2VFcnJvciB7XG4gICAgdmFyIHN0YXJ0ID0gbmV3IFBhcnNlTG9jYXRpb24oZmlsZSwgb2Zmc2V0LCBsaW5lLCBjb2wpO1xuICAgIHZhciBlbmQgPSBuZXcgUGFyc2VMb2NhdGlvbihmaWxlLCBvZmZzZXQsIGxpbmUsIGNvbCArIGxlbmd0aCk7XG4gICAgdmFyIHNwYW4gPSBuZXcgUGFyc2VTb3VyY2VTcGFuKHN0YXJ0LCBlbmQpO1xuICAgIHJldHVybiBuZXcgQ3NzUGFyc2VFcnJvcihzcGFuLCBcIkNTUyBQYXJzZSBFcnJvcjogXCIgKyBlcnJNc2cpO1xuICB9XG5cbiAgY29uc3RydWN0b3Ioc3BhbjogUGFyc2VTb3VyY2VTcGFuLCBtZXNzYWdlOiBzdHJpbmcpIHsgc3VwZXIoc3BhbiwgbWVzc2FnZSk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIENzc1Vua25vd25Ub2tlbkxpc3RBU1QgZXh0ZW5kcyBDc3NSdWxlQVNUIHtcbiAgY29uc3RydWN0b3IocHVibGljIG5hbWUsIHB1YmxpYyB0b2tlbnM6IENzc1Rva2VuW10pIHsgc3VwZXIoKTsgfVxuICB2aXNpdCh2aXNpdG9yOiBDc3NBU1RWaXNpdG9yLCBjb250ZXh0PzogYW55KSB7IHZpc2l0b3IudmlzaXRVbmtvd25SdWxlKHRoaXMsIGNvbnRleHQpOyB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
