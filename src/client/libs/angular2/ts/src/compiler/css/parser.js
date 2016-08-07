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
                CssParser.prototype._parseStyleSheet = function (delimiters) {
                    var results = [];
                    this._scanner.consumeEmptyStatements();
                    while (this._scanner.peek != lexer_1.$EOF) {
                        this._scanner.setMode(lexer_1.CssLexerMode.BLOCK);
                        results.push(this._parseRule(delimiters));
                    }
                    return new CssStyleSheetAST(results);
                };
                CssParser.prototype._parseRule = function (delimiters) {
                    if (this._scanner.peek == lexer_1.$AT) {
                        return this._parseAtRule(delimiters);
                    }
                    return this._parseSelectorRule(delimiters);
                };
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
                CssParser.prototype._parseSelectorRule = function (delimiters) {
                    var selectors = this._parseSelectors(delimiters);
                    var block = this._parseStyleBlock(delimiters);
                    this._scanner.setMode(lexer_1.CssLexerMode.BLOCK);
                    this._scanner.consumeEmptyStatements();
                    return new CssSelectorRuleAST(selectors, block);
                };
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
                CssParser.prototype._scan = function () {
                    var output = this._scanner.scan();
                    var token = output.token;
                    var error = output.error;
                    if (lang_1.isPresent(error)) {
                        this._error(error.rawMessage, token);
                    }
                    return token;
                };
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
                CssParser.prototype._parseKeyframeLabel = function (delimiters) {
                    this._scanner.setMode(lexer_1.CssLexerMode.KEYFRAME_BLOCK);
                    return mergeTokens(this._collectUntilDelim(delimiters));
                };
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
                CssParser.prototype._collectUntilDelim = function (delimiters, assertType) {
                    if (assertType === void 0) { assertType = null; }
                    var tokens = [];
                    while (!characterContainsDelimiter(this._scanner.peek, delimiters)) {
                        var val = lang_1.isPresent(assertType) ? this._consume(assertType) : this._scan();
                        tokens.push(val);
                    }
                    return tokens;
                };
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
                CssParser.prototype._assertCondition = function (status, errorMessage, problemToken) {
                    if (!status) {
                        this._error(errorMessage, problemToken);
                        return true;
                    }
                    return false;
                };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL2Nzcy9wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O21CQXFETSxTQUFTLEVBQ1QsWUFBWSxFQUNaLFlBQVksRUFDWixXQUFXLEVBQ1gsV0FBVyxFQUNYLGVBQWUsRUFDZixhQUFhLEVBQ2IsWUFBWTtJQUVsQixxQkFBcUIsTUFBa0IsRUFBRSxTQUFzQjtRQUF0Qix5QkFBc0IsR0FBdEIsY0FBc0I7UUFDN0QsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUM7UUFDN0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDdkMsR0FBRyxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ3hDLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxnQkFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUVELDJCQUEyQixLQUFlO1FBQ3hDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELCtCQUErQixJQUFZO1FBQ3pDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDYixLQUFLLFlBQUk7Z0JBQ1AsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUNuQixLQUFLLGNBQU07Z0JBQ1QsTUFBTSxDQUFDLFdBQVcsQ0FBQztZQUNyQixLQUFLLGNBQU07Z0JBQ1QsTUFBTSxDQUFD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QUFDLENBQUM7b0JBQzNDLE1BQU0sQ0FBQyxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLEdBQUcsTUFBTSxDQUFDLENBQUM7Z0JBQy9ELENBQUM7Z0JBR0gsb0JBQUM7WUFBRCxDQVZBLEFBVUMsQ0FWa0MsdUJBQVUsR0FVNUM7WUFWRCx5Q0FVQyxDQUFBO1lBRUQ7Z0JBQTRDLDBDQUFVO2dCQUNwRCxnQ0FBbUIsSUFBSSxFQUFTLE1BQWtCO29CQUFJLGlCQUFPLENBQUM7b0JBQTNDLFNBQUksR0FBSixJQUFJLENBQUE7b0JBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBWTtnQkFBYSxDQUFDO2dCQUNoRSxzQ0FBSyxHQUFMLFVBQU0sT0FBc0IsRUFBRSxPQUFhLElBQUksT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxRiw2QkFBQztZQUFELENBSEEsQUFHQyxDQUgyQyxVQUFVLEdBR3JEO1lBSEQsMkRBR0MsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9jc3MvcGFyc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUGFyc2VTb3VyY2VTcGFuLFxuICBQYXJzZVNvdXJjZUZpbGUsXG4gIFBhcnNlTG9jYXRpb24sXG4gIFBhcnNlRXJyb3Jcbn0gZnJvbSBcImFuZ3VsYXIyL3NyYy9jb21waWxlci9wYXJzZV91dGlsXCI7XG5cbmltcG9ydCB7XG4gIGJpdFdpc2VPcixcbiAgYml0V2lzZUFuZCxcbiAgTnVtYmVyV3JhcHBlcixcbiAgU3RyaW5nV3JhcHBlcixcbiAgaXNQcmVzZW50XG59IGZyb20gXCJhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmdcIjtcblxuaW1wb3J0IHtcbiAgQ3NzTGV4ZXJNb2RlLFxuICBDc3NUb2tlbixcbiAgQ3NzVG9rZW5UeXBlLFxuICBDc3NTY2FubmVyLFxuICBDc3NTY2FubmVyRXJyb3IsXG4gIGdlbmVyYXRlRXJyb3JNZXNzYWdlLFxuICAkQVQsXG4gICRFT0YsXG4gICRSQlJBQ0UsXG4gICRMQlJBQ0UsXG4gICRMQlJBQ0tFVCxcbiAgJFJCUkFDS0VULFxuICAkTFBBUkVOLFxuICAkUlBBUkVOLFxuICAkQ09NTUEsXG4gICRDT0xPTixcbiAgJFNFTUlDT0xPTixcbiAgaXNOZXdsaW5lXG59IGZyb20gXCJhbmd1bGFyMi9zcmMvY29tcGlsZXIvY3NzL2xleGVyXCI7XG5cbmV4cG9ydCB7Q3NzVG9rZW59IGZyb20gXCJhbmd1bGFyMi9zcmMvY29tcGlsZXIvY3NzL2xleGVyXCI7XG5cbmV4cG9ydCBlbnVtIEJsb2NrVHlwZSB7XG4gIEltcG9ydCxcbiAgQ2hhcnNldCxcbiAgTmFtZXNwYWNlLFxuICBTdXBwb3J0cyxcbiAgS2V5ZnJhbWVzLFxuICBNZWRpYVF1ZXJ5LFxuICBTZWxlY3RvcixcbiAgRm9udEZhY2UsXG4gIFBhZ2UsXG4gIERvY3VtZW50LFxuICBWaWV3cG9ydCxcbiAgVW5zdXBwb3J0ZWRcbn1cblxuY29uc3QgRU9GX0RFTElNID0gMTtcbmNvbnN0IFJCUkFDRV9ERUxJTSA9IDI7XG5jb25zdCBMQlJBQ0VfREVMSU0gPSA0O1xuY29uc3QgQ09NTUFfREVMSU0gPSA4O1xuY29uc3QgQ09MT05fREVMSU0gPSAxNjtcbmNvbnN0IFNFTUlDT0xPTl9ERUxJTSA9IDMyO1xuY29uc3QgTkVXTElORV9ERUxJTSA9IDY0O1xuY29uc3QgUlBBUkVOX0RFTElNID0gMTI4O1xuXG5mdW5jdGlvbiBtZXJnZVRva2Vucyh0b2tlbnM6IENzc1Rva2VuW10sIHNlcGFyYXRvcjogc3RyaW5nID0gXCJcIik6IENzc1Rva2VuIHtcbiAgdmFyIG1haW5Ub2tlbiA9IHRva2Vuc1swXTtcbiAgdmFyIHN0ciA9IG1haW5Ub2tlbi5zdHJWYWx1ZTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICBzdHIgKz0gc2VwYXJhdG9yICsgdG9rZW5zW2ldLnN0clZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBDc3NUb2tlbihtYWluVG9rZW4uaW5kZXgsIG1haW5Ub2tlbi5jb2x1bW4sIG1haW5Ub2tlbi5saW5lLCBtYWluVG9rZW4udHlwZSwgc3RyKTtcbn1cblxuZnVuY3Rpb24gZ2V0RGVsaW1Gcm9tVG9rZW4odG9rZW46IENzc1Rva2VuKTogbnVtYmVyIHtcbiAgcmV0dXJuIGdldERlbGltRnJvbUNoYXJhY3Rlcih0b2tlbi5udW1WYWx1ZSk7XG59XG5cbmZ1bmN0aW9uIGdldERlbGltRnJvbUNoYXJhY3Rlcihjb2RlOiBudW1iZXIpOiBudW1iZXIge1xuICBzd2l0Y2ggKGNvZGUpIHtcbiAgICBjYXNlICRFT0Y6XG4gICAgICByZXR1cm4gRU9GX0RFTElNO1xuICAgIGNhc2UgJENPTU1BOlxuICAgICAgcmV0dXJuIENPTU1BX0RFTElNO1xuICAgIGNhc2UgJENPTE9OOlxuICAgICAgcmV0dXJuIENPTE9OX0RFTElNO1xuICAgIGNhc2UgJFNFTUlDT0xPTjpcbiAgICAgIHJldHVybiBTRU1JQ09MT05fREVMSU07XG4gICAgY2FzZSAkUkJSQUNFOlxuICAgICAgcmV0dXJuIFJCUkFDRV9ERUxJTTtcbiAgICBjYXNlICRMQlJBQ0U6XG4gICAgICByZXR1cm4gTEJSQUNFX0RFTElNO1xuICAgIGNhc2UgJFJQQVJFTjpcbiAgICAgIHJldHVybiBSUEFSRU5fREVMSU07XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBpc05ld2xpbmUoY29kZSkgPyBORVdMSU5FX0RFTElNIDogMDtcbiAgfVxufVxuXG5mdW5jdGlvbiBjaGFyYWN0ZXJDb250YWluc0RlbGltaXRlcihjb2RlOiBudW1iZXIsIGRlbGltaXRlcnM6IG51bWJlcikge1xuICByZXR1cm4gYml0V2lzZUFuZChbZ2V0RGVsaW1Gcm9tQ2hhcmFjdGVyKGNvZGUpLCBkZWxpbWl0ZXJzXSkgPiAwO1xufVxuXG5leHBvcnQgY2xhc3MgQ3NzQVNUIHtcbiAgdmlzaXQodmlzaXRvcjogQ3NzQVNUVmlzaXRvciwgY29udGV4dD86IGFueSk6IHZvaWQge31cbn1cblxuZXhwb3J0IGludGVyZmFjZSBDc3NBU1RWaXNpdG9yIHtcbiAgdmlzaXRDc3NWYWx1ZShhc3Q6IENzc1N0eWxlVmFsdWVBU1QsIGNvbnRleHQ/OiBhbnkpOiB2b2lkO1xuICB2aXNpdElubGluZUNzc1J1bGUoYXN0OiBDc3NJbmxpbmVSdWxlQVNULCBjb250ZXh0PzogYW55KTogdm9pZDtcbiAgdmlzaXRDc3NLZXlmcmFtZVJ1bGUoYXN0OiBDc3NLZXlmcmFtZVJ1bGVBU1QsIGNvbnRleHQ/OiBhbnkpOiB2b2lkO1xuICB2aXNpdENzc0tleWZyYW1lRGVmaW5pdGlvbihhc3Q6IENzc0tleWZyYW1lRGVmaW5pdGlvbkFTVCwgY29udGV4dD86IGFueSk6IHZvaWQ7XG4gIHZpc2l0Q3NzTWVkaWFRdWVyeVJ1bGUoYXN0OiBDc3NNZWRpYVF1ZXJ5UnVsZUFTVCwgY29udGV4dD86IGFueSk6IHZvaWQ7XG4gIHZpc2l0Q3NzU2VsZWN0b3JSdWxlKGFzdDogQ3NzU2VsZWN0b3JSdWxlQVNULCBjb250ZXh0PzogYW55KTogdm9pZDtcbiAgdmlzaXRDc3NTZWxlY3Rvcihhc3Q6IENzc1NlbGVjdG9yQVNULCBjb250ZXh0PzogYW55KTogdm9pZDtcbiAgdmlzaXRDc3NEZWZpbml0aW9uKGFzdDogQ3NzRGVmaW5pdGlvbkFTVCwgY29udGV4dD86IGFueSk6IHZvaWQ7XG4gIHZpc2l0Q3NzQmxvY2soYXN0OiBDc3NCbG9ja0FTVCwgY29udGV4dD86IGFueSk6IHZvaWQ7XG4gIHZpc2l0Q3NzU3R5bGVTaGVldChhc3Q6IENzc1N0eWxlU2hlZXRBU1QsIGNvbnRleHQ/OiBhbnkpOiB2b2lkO1xuICB2aXNpdFVua293blJ1bGUoYXN0OiBDc3NVbmtub3duVG9rZW5MaXN0QVNULCBjb250ZXh0PzogYW55KTogdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIFBhcnNlZENzc1Jlc3VsdCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlcnJvcnM6IENzc1BhcnNlRXJyb3JbXSwgcHVibGljIGFzdDogQ3NzU3R5bGVTaGVldEFTVCkge31cbn1cblxuZXhwb3J0IGNsYXNzIENzc1BhcnNlciB7XG4gIHByaXZhdGUgX2Vycm9yczogQ3NzUGFyc2VFcnJvcltdID0gW107XG4gIHByaXZhdGUgX2ZpbGU6IFBhcnNlU291cmNlRmlsZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zY2FubmVyOiBDc3NTY2FubmVyLCBwcml2YXRlIF9maWxlTmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fZmlsZSA9IG5ldyBQYXJzZVNvdXJjZUZpbGUodGhpcy5fc2Nhbm5lci5pbnB1dCwgX2ZpbGVOYW1lKTtcbiAgfVxuXG4gIF9yZXNvbHZlQmxvY2tUeXBlKHRva2VuOiBDc3NUb2tlbik6IEJsb2NrVHlwZSB7XG4gICAgc3dpdGNoICh0b2tlbi5zdHJWYWx1ZSkge1xuICAgICAgY2FzZSAnQC1vLWtleWZyYW1lcyc6XG4gICAgICBjYXNlICdALW1vei1rZXlmcmFtZXMnOlxuICAgICAgY2FzZSAnQC13ZWJraXQta2V5ZnJhbWVzJzpcbiAgICAgIGNhc2UgJ0BrZXlmcmFtZXMnOlxuICAgICAgICByZXR1cm4gQmxvY2tUeXBlLktleWZyYW1lcztcblxuICAgICAgY2FzZSAnQGNoYXJzZXQnOlxuICAgICAgICByZXR1cm4gQmxvY2tUeXBlLkNoYXJzZXQ7XG5cbiAgICAgIGNhc2UgJ0BpbXBvcnQnOlxuICAgICAgICByZXR1cm4gQmxvY2tUeXBlLkltcG9ydDtcblxuICAgICAgY2FzZSAnQG5hbWVzcGFjZSc6XG4gICAgICAgIHJldHVybiBCbG9ja1R5cGUuTmFtZXNwYWNlO1xuXG4gICAgICBjYXNlICdAcGFnZSc6XG4gICAgICAgIHJldHVybiBCbG9ja1R5cGUuUGFnZTtcblxuICAgICAgY2FzZSAnQGRvY3VtZW50JzpcbiAgICAgICAgcmV0dXJuIEJsb2NrVHlwZS5Eb2N1bWVudDtcblxuICAgICAgY2FzZSAnQG1lZGlhJzpcbiAgICAgICAgcmV0dXJuIEJsb2NrVHlwZS5NZWRpYVF1ZXJ5O1xuXG4gICAgICBjYXNlICdAZm9udC1mYWNlJzpcbiAgICAgICAgcmV0dXJuIEJsb2NrVHlwZS5Gb250RmFjZTtcblxuICAgICAgY2FzZSAnQHZpZXdwb3J0JzpcbiAgICAgICAgcmV0dXJuIEJsb2NrVHlwZS5WaWV3cG9ydDtcblxuICAgICAgY2FzZSAnQHN1cHBvcnRzJzpcbiAgICAgICAgcmV0dXJuIEJsb2NrVHlwZS5TdXBwb3J0cztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIEJsb2NrVHlwZS5VbnN1cHBvcnRlZDtcbiAgICB9XG4gIH1cblxuICBwYXJzZSgpOiBQYXJzZWRDc3NSZXN1bHQge1xuICAgIHZhciBkZWxpbWl0ZXJzOiBudW1iZXIgPSBFT0ZfREVMSU07XG4gICAgdmFyIGFzdCA9IHRoaXMuX3BhcnNlU3R5bGVTaGVldChkZWxpbWl0ZXJzKTtcblxuICAgIHZhciBlcnJvcnMgPSB0aGlzLl9lcnJvcnM7XG4gICAgdGhpcy5fZXJyb3JzID0gW107XG5cbiAgICByZXR1cm4gbmV3IFBhcnNlZENzc1Jlc3VsdChlcnJvcnMsIGFzdCk7XG4gIH1cblxuICBfcGFyc2VTdHlsZVNoZWV0KGRlbGltaXRlcnMpOiBDc3NTdHlsZVNoZWV0QVNUIHtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgIHRoaXMuX3NjYW5uZXIuY29uc3VtZUVtcHR5U3RhdGVtZW50cygpO1xuICAgIHdoaWxlICh0aGlzLl9zY2FubmVyLnBlZWsgIT0gJEVPRikge1xuICAgICAgdGhpcy5fc2Nhbm5lci5zZXRNb2RlKENzc0xleGVyTW9kZS5CTE9DSyk7XG4gICAgICByZXN1bHRzLnB1c2godGhpcy5fcGFyc2VSdWxlKGRlbGltaXRlcnMpKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBDc3NTdHlsZVNoZWV0QVNUKHJlc3VsdHMpO1xuICB9XG5cbiAgX3BhcnNlUnVsZShkZWxpbWl0ZXJzOiBudW1iZXIpOiBDc3NSdWxlQVNUIHtcbiAgICBpZiAodGhpcy5fc2Nhbm5lci5wZWVrID09ICRBVCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3BhcnNlQXRSdWxlKGRlbGltaXRlcnMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fcGFyc2VTZWxlY3RvclJ1bGUoZGVsaW1pdGVycyk7XG4gIH1cblxuICBfcGFyc2VBdFJ1bGUoZGVsaW1pdGVyczogbnVtYmVyKTogQ3NzUnVsZUFTVCB7XG4gICAgdGhpcy5fc2Nhbm5lci5zZXRNb2RlKENzc0xleGVyTW9kZS5CTE9DSyk7XG5cbiAgICB2YXIgdG9rZW4gPSB0aGlzLl9zY2FuKCk7XG5cbiAgICB0aGlzLl9hc3NlcnRDb25kaXRpb24odG9rZW4udHlwZSA9PSBDc3NUb2tlblR5cGUuQXRLZXl3b3JkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBgVGhlIENTUyBSdWxlICR7dG9rZW4uc3RyVmFsdWV9IGlzIG5vdCBhIHZhbGlkIFtAXSBydWxlLmAsIHRva2VuKTtcblxuICAgIHZhciBibG9jaywgdHlwZSA9IHRoaXMuX3Jlc29sdmVCbG9ja1R5cGUodG9rZW4pO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBCbG9ja1R5cGUuQ2hhcnNldDpcbiAgICAgIGNhc2UgQmxvY2tUeXBlLk5hbWVzcGFjZTpcbiAgICAgIGNhc2UgQmxvY2tUeXBlLkltcG9ydDpcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5fcGFyc2VWYWx1ZShkZWxpbWl0ZXJzKTtcbiAgICAgICAgdGhpcy5fc2Nhbm5lci5zZXRNb2RlKENzc0xleGVyTW9kZS5CTE9DSyk7XG4gICAgICAgIHRoaXMuX3NjYW5uZXIuY29uc3VtZUVtcHR5U3RhdGVtZW50cygpO1xuICAgICAgICByZXR1cm4gbmV3IENzc0lubGluZVJ1bGVBU1QodHlwZSwgdmFsdWUpO1xuXG4gICAgICBjYXNlIEJsb2NrVHlwZS5WaWV3cG9ydDpcbiAgICAgIGNhc2UgQmxvY2tUeXBlLkZvbnRGYWNlOlxuICAgICAgICBibG9jayA9IHRoaXMuX3BhcnNlU3R5bGVCbG9jayhkZWxpbWl0ZXJzKTtcbiAgICAgICAgcmV0dXJuIG5ldyBDc3NCbG9ja1J1bGVBU1QodHlwZSwgYmxvY2spO1xuXG4gICAgICBjYXNlIEJsb2NrVHlwZS5LZXlmcmFtZXM6XG4gICAgICAgIHZhciB0b2tlbnMgPSB0aGlzLl9jb2xsZWN0VW50aWxEZWxpbShiaXRXaXNlT3IoW2RlbGltaXRlcnMsIFJCUkFDRV9ERUxJTSwgTEJSQUNFX0RFTElNXSkpO1xuICAgICAgICAvLyBrZXlmcmFtZXMgb25seSBoYXZlIG9uZSBpZGVudGlmaWVyIG5hbWVcbiAgICAgICAgdmFyIG5hbWUgPSB0b2tlbnNbMF07XG4gICAgICAgIHJldHVybiBuZXcgQ3NzS2V5ZnJhbWVSdWxlQVNUKG5hbWUsIHRoaXMuX3BhcnNlS2V5ZnJhbWVCbG9jayhkZWxpbWl0ZXJzKSk7XG5cbiAgICAgIGNhc2UgQmxvY2tUeXBlLk1lZGlhUXVlcnk6XG4gICAgICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuTUVESUFfUVVFUlkpO1xuICAgICAgICB2YXIgdG9rZW5zID0gdGhpcy5fY29sbGVjdFVudGlsRGVsaW0oYml0V2lzZU9yKFtkZWxpbWl0ZXJzLCBSQlJBQ0VfREVMSU0sIExCUkFDRV9ERUxJTV0pKTtcbiAgICAgICAgcmV0dXJuIG5ldyBDc3NNZWRpYVF1ZXJ5UnVsZUFTVCh0b2tlbnMsIHRoaXMuX3BhcnNlQmxvY2soZGVsaW1pdGVycykpO1xuXG4gICAgICBjYXNlIEJsb2NrVHlwZS5Eb2N1bWVudDpcbiAgICAgIGNhc2UgQmxvY2tUeXBlLlN1cHBvcnRzOlxuICAgICAgY2FzZSBCbG9ja1R5cGUuUGFnZTpcbiAgICAgICAgdGhpcy5fc2Nhbm5lci5zZXRNb2RlKENzc0xleGVyTW9kZS5BVF9SVUxFX1FVRVJZKTtcbiAgICAgICAgdmFyIHRva2VucyA9IHRoaXMuX2NvbGxlY3RVbnRpbERlbGltKGJpdFdpc2VPcihbZGVsaW1pdGVycywgUkJSQUNFX0RFTElNLCBMQlJBQ0VfREVMSU1dKSk7XG4gICAgICAgIHJldHVybiBuZXcgQ3NzQmxvY2tEZWZpbml0aW9uUnVsZUFTVCh0eXBlLCB0b2tlbnMsIHRoaXMuX3BhcnNlQmxvY2soZGVsaW1pdGVycykpO1xuXG4gICAgICAvLyBpZiBhIGN1c3RvbSBAcnVsZSB7IC4uLiB9IGlzIHVzZWQgaXQgc2hvdWxkIHN0aWxsIHRva2VuaXplIHRoZSBpbnNpZGVzXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB2YXIgbGlzdE9mVG9rZW5zID0gW107XG4gICAgICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuQUxMKTtcbiAgICAgICAgdGhpcy5fZXJyb3IoZ2VuZXJhdGVFcnJvck1lc3NhZ2UoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zY2FubmVyLmlucHV0LFxuICAgICAgICAgICAgICAgICAgICAgICAgYFRoZSBDU1MgXCJhdFwiIHJ1bGUgXCIke3Rva2VuLnN0clZhbHVlfVwiIGlzIG5vdCBhbGxvd2VkIHRvIHVzZWQgaGVyZWAsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbi5zdHJWYWx1ZSwgdG9rZW4uaW5kZXgsIHRva2VuLmxpbmUsIHRva2VuLmNvbHVtbiksXG4gICAgICAgICAgICAgICAgICAgIHRva2VuKTtcblxuICAgICAgICB0aGlzLl9jb2xsZWN0VW50aWxEZWxpbShiaXRXaXNlT3IoW2RlbGltaXRlcnMsIExCUkFDRV9ERUxJTSwgU0VNSUNPTE9OX0RFTElNXSkpXG4gICAgICAgICAgICAuZm9yRWFjaCgodG9rZW4pID0+IHsgbGlzdE9mVG9rZW5zLnB1c2godG9rZW4pOyB9KTtcbiAgICAgICAgaWYgKHRoaXMuX3NjYW5uZXIucGVlayA9PSAkTEJSQUNFKSB7XG4gICAgICAgICAgdGhpcy5fY29uc3VtZShDc3NUb2tlblR5cGUuQ2hhcmFjdGVyLCAneycpO1xuICAgICAgICAgIHRoaXMuX2NvbGxlY3RVbnRpbERlbGltKGJpdFdpc2VPcihbZGVsaW1pdGVycywgUkJSQUNFX0RFTElNLCBMQlJBQ0VfREVMSU1dKSlcbiAgICAgICAgICAgICAgLmZvckVhY2goKHRva2VuKSA9PiB7IGxpc3RPZlRva2Vucy5wdXNoKHRva2VuKTsgfSk7XG4gICAgICAgICAgdGhpcy5fY29uc3VtZShDc3NUb2tlblR5cGUuQ2hhcmFjdGVyLCAnfScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgQ3NzVW5rbm93blRva2VuTGlzdEFTVCh0b2tlbiwgbGlzdE9mVG9rZW5zKTtcbiAgICB9XG4gIH1cblxuICBfcGFyc2VTZWxlY3RvclJ1bGUoZGVsaW1pdGVyczogbnVtYmVyKTogQ3NzU2VsZWN0b3JSdWxlQVNUIHtcbiAgICB2YXIgc2VsZWN0b3JzID0gdGhpcy5fcGFyc2VTZWxlY3RvcnMoZGVsaW1pdGVycyk7XG4gICAgdmFyIGJsb2NrID0gdGhpcy5fcGFyc2VTdHlsZUJsb2NrKGRlbGltaXRlcnMpO1xuICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuQkxPQ0spO1xuICAgIHRoaXMuX3NjYW5uZXIuY29uc3VtZUVtcHR5U3RhdGVtZW50cygpO1xuICAgIHJldHVybiBuZXcgQ3NzU2VsZWN0b3JSdWxlQVNUKHNlbGVjdG9ycywgYmxvY2spO1xuICB9XG5cbiAgX3BhcnNlU2VsZWN0b3JzKGRlbGltaXRlcnM6IG51bWJlcik6IENzc1NlbGVjdG9yQVNUW10ge1xuICAgIGRlbGltaXRlcnMgPSBiaXRXaXNlT3IoW2RlbGltaXRlcnMsIExCUkFDRV9ERUxJTV0pO1xuXG4gICAgdmFyIHNlbGVjdG9ycyA9IFtdO1xuICAgIHZhciBpc1BhcnNpbmdTZWxlY3RvcnMgPSB0cnVlO1xuICAgIHdoaWxlIChpc1BhcnNpbmdTZWxlY3RvcnMpIHtcbiAgICAgIHNlbGVjdG9ycy5wdXNoKHRoaXMuX3BhcnNlU2VsZWN0b3IoZGVsaW1pdGVycykpO1xuXG4gICAgICBpc1BhcnNpbmdTZWxlY3RvcnMgPSAhY2hhcmFjdGVyQ29udGFpbnNEZWxpbWl0ZXIodGhpcy5fc2Nhbm5lci5wZWVrLCBkZWxpbWl0ZXJzKTtcblxuICAgICAgaWYgKGlzUGFyc2luZ1NlbGVjdG9ycykge1xuICAgICAgICB0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICcsJyk7XG4gICAgICAgIGlzUGFyc2luZ1NlbGVjdG9ycyA9ICFjaGFyYWN0ZXJDb250YWluc0RlbGltaXRlcih0aGlzLl9zY2FubmVyLnBlZWssIGRlbGltaXRlcnMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzZWxlY3RvcnM7XG4gIH1cblxuICBfc2NhbigpOiBDc3NUb2tlbiB7XG4gICAgdmFyIG91dHB1dCA9IHRoaXMuX3NjYW5uZXIuc2NhbigpO1xuICAgIHZhciB0b2tlbiA9IG91dHB1dC50b2tlbjtcbiAgICB2YXIgZXJyb3IgPSBvdXRwdXQuZXJyb3I7XG4gICAgaWYgKGlzUHJlc2VudChlcnJvcikpIHtcbiAgICAgIHRoaXMuX2Vycm9yKGVycm9yLnJhd01lc3NhZ2UsIHRva2VuKTtcbiAgICB9XG4gICAgcmV0dXJuIHRva2VuO1xuICB9XG5cbiAgX2NvbnN1bWUodHlwZTogQ3NzVG9rZW5UeXBlLCB2YWx1ZTogc3RyaW5nID0gbnVsbCk6IENzc1Rva2VuIHtcbiAgICB2YXIgb3V0cHV0ID0gdGhpcy5fc2Nhbm5lci5jb25zdW1lKHR5cGUsIHZhbHVlKTtcbiAgICB2YXIgdG9rZW4gPSBvdXRwdXQudG9rZW47XG4gICAgdmFyIGVycm9yID0gb3V0cHV0LmVycm9yO1xuICAgIGlmIChpc1ByZXNlbnQoZXJyb3IpKSB7XG4gICAgICB0aGlzLl9lcnJvcihlcnJvci5yYXdNZXNzYWdlLCB0b2tlbik7XG4gICAgfVxuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuXG4gIF9wYXJzZUtleWZyYW1lQmxvY2soZGVsaW1pdGVyczogbnVtYmVyKTogQ3NzQmxvY2tBU1Qge1xuICAgIGRlbGltaXRlcnMgPSBiaXRXaXNlT3IoW2RlbGltaXRlcnMsIFJCUkFDRV9ERUxJTV0pO1xuICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuS0VZRlJBTUVfQkxPQ0spO1xuXG4gICAgdGhpcy5fY29uc3VtZShDc3NUb2tlblR5cGUuQ2hhcmFjdGVyLCAneycpO1xuXG4gICAgdmFyIGRlZmluaXRpb25zID0gW107XG4gICAgd2hpbGUgKCFjaGFyYWN0ZXJDb250YWluc0RlbGltaXRlcih0aGlzLl9zY2FubmVyLnBlZWssIGRlbGltaXRlcnMpKSB7XG4gICAgICBkZWZpbml0aW9ucy5wdXNoKHRoaXMuX3BhcnNlS2V5ZnJhbWVEZWZpbml0aW9uKGRlbGltaXRlcnMpKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICd9Jyk7XG5cbiAgICByZXR1cm4gbmV3IENzc0Jsb2NrQVNUKGRlZmluaXRpb25zKTtcbiAgfVxuXG4gIF9wYXJzZUtleWZyYW1lRGVmaW5pdGlvbihkZWxpbWl0ZXJzOiBudW1iZXIpOiBDc3NLZXlmcmFtZURlZmluaXRpb25BU1Qge1xuICAgIHZhciBzdGVwVG9rZW5zID0gW107XG4gICAgZGVsaW1pdGVycyA9IGJpdFdpc2VPcihbZGVsaW1pdGVycywgTEJSQUNFX0RFTElNXSk7XG4gICAgd2hpbGUgKCFjaGFyYWN0ZXJDb250YWluc0RlbGltaXRlcih0aGlzLl9zY2FubmVyLnBlZWssIGRlbGltaXRlcnMpKSB7XG4gICAgICBzdGVwVG9rZW5zLnB1c2godGhpcy5fcGFyc2VLZXlmcmFtZUxhYmVsKGJpdFdpc2VPcihbZGVsaW1pdGVycywgQ09NTUFfREVMSU1dKSkpO1xuICAgICAgaWYgKHRoaXMuX3NjYW5uZXIucGVlayAhPSAkTEJSQUNFKSB7XG4gICAgICAgIHRoaXMuX2NvbnN1bWUoQ3NzVG9rZW5UeXBlLkNoYXJhY3RlciwgJywnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIHN0eWxlcyA9IHRoaXMuX3BhcnNlU3R5bGVCbG9jayhiaXRXaXNlT3IoW2RlbGltaXRlcnMsIFJCUkFDRV9ERUxJTV0pKTtcbiAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLkJMT0NLKTtcbiAgICByZXR1cm4gbmV3IENzc0tleWZyYW1lRGVmaW5pdGlvbkFTVChzdGVwVG9rZW5zLCBzdHlsZXMpO1xuICB9XG5cbiAgX3BhcnNlS2V5ZnJhbWVMYWJlbChkZWxpbWl0ZXJzOiBudW1iZXIpOiBDc3NUb2tlbiB7XG4gICAgdGhpcy5fc2Nhbm5lci5zZXRNb2RlKENzc0xleGVyTW9kZS5LRVlGUkFNRV9CTE9DSyk7XG4gICAgcmV0dXJuIG1lcmdlVG9rZW5zKHRoaXMuX2NvbGxlY3RVbnRpbERlbGltKGRlbGltaXRlcnMpKTtcbiAgfVxuXG4gIF9wYXJzZVNlbGVjdG9yKGRlbGltaXRlcnM6IG51bWJlcik6IENzc1NlbGVjdG9yQVNUIHtcbiAgICBkZWxpbWl0ZXJzID0gYml0V2lzZU9yKFtkZWxpbWl0ZXJzLCBDT01NQV9ERUxJTSwgTEJSQUNFX0RFTElNXSk7XG4gICAgdGhpcy5fc2Nhbm5lci5zZXRNb2RlKENzc0xleGVyTW9kZS5TRUxFQ1RPUik7XG5cbiAgICB2YXIgc2VsZWN0b3JDc3NUb2tlbnMgPSBbXTtcbiAgICB2YXIgaXNDb21wbGV4ID0gZmFsc2U7XG4gICAgdmFyIHdzQ3NzVG9rZW47XG5cbiAgICB2YXIgcHJldmlvdXNUb2tlbjtcbiAgICB2YXIgcGFyZW5Db3VudCA9IDA7XG4gICAgd2hpbGUgKCFjaGFyYWN0ZXJDb250YWluc0RlbGltaXRlcih0aGlzLl9zY2FubmVyLnBlZWssIGRlbGltaXRlcnMpKSB7XG4gICAgICB2YXIgY29kZSA9IHRoaXMuX3NjYW5uZXIucGVlaztcbiAgICAgIHN3aXRjaCAoY29kZSkge1xuICAgICAgICBjYXNlICRMUEFSRU46XG4gICAgICAgICAgcGFyZW5Db3VudCsrO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJFJQQVJFTjpcbiAgICAgICAgICBwYXJlbkNvdW50LS07XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAkQ09MT046XG4gICAgICAgICAgdGhpcy5fc2Nhbm5lci5zZXRNb2RlKENzc0xleGVyTW9kZS5QU0VVRE9fU0VMRUNUT1IpO1xuICAgICAgICAgIHByZXZpb3VzVG9rZW4gPSB0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICc6Jyk7XG4gICAgICAgICAgc2VsZWN0b3JDc3NUb2tlbnMucHVzaChwcmV2aW91c1Rva2VuKTtcbiAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICBjYXNlICRMQlJBQ0tFVDpcbiAgICAgICAgICAvLyBpZiB3ZSBhcmUgYWxyZWFkeSBpbnNpZGUgYW4gYXR0cmlidXRlIHNlbGVjdG9yIHRoZW4gd2UgY2FuJ3RcbiAgICAgICAgICAvLyBqdW1wIGludG8gdGhlIG1vZGUgYWdhaW4uIFRoZXJlZm9yZSB0aGlzIGVycm9yIHdpbGwgZ2V0IHBpY2tlZFxuICAgICAgICAgIC8vIHVwIHdoZW4gdGhlIHNjYW4gbWV0aG9kIGlzIGNhbGxlZCBiZWxvdy5cbiAgICAgICAgICBpZiAodGhpcy5fc2Nhbm5lci5nZXRNb2RlKCkgIT0gQ3NzTGV4ZXJNb2RlLkFUVFJJQlVURV9TRUxFQ1RPUikge1xuICAgICAgICAgICAgc2VsZWN0b3JDc3NUb2tlbnMucHVzaCh0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICdbJykpO1xuICAgICAgICAgICAgdGhpcy5fc2Nhbm5lci5zZXRNb2RlKENzc0xleGVyTW9kZS5BVFRSSUJVVEVfU0VMRUNUT1IpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJFJCUkFDS0VUOlxuICAgICAgICAgIHNlbGVjdG9yQ3NzVG9rZW5zLnB1c2godGhpcy5fY29uc3VtZShDc3NUb2tlblR5cGUuQ2hhcmFjdGVyLCAnXScpKTtcbiAgICAgICAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLlNFTEVDVE9SKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIHRva2VuID0gdGhpcy5fc2NhbigpO1xuXG4gICAgICAvLyBzcGVjaWFsIGNhc2UgZm9yIHRoZSBcIjpub3QoXCIgc2VsZWN0b3Igc2luY2UgaXRcbiAgICAgIC8vIGNvbnRhaW5zIGFuIGlubmVyIHNlbGVjdG9yIHRoYXQgbmVlZHMgdG8gYmUgcGFyc2VkXG4gICAgICAvLyBpbiBpc29sYXRpb25cbiAgICAgIGlmICh0aGlzLl9zY2FubmVyLmdldE1vZGUoKSA9PSBDc3NMZXhlck1vZGUuUFNFVURPX1NFTEVDVE9SICYmIGlzUHJlc2VudChwcmV2aW91c1Rva2VuKSAmJlxuICAgICAgICAgIHByZXZpb3VzVG9rZW4ubnVtVmFsdWUgPT0gJENPTE9OICYmIHRva2VuLnN0clZhbHVlID09IFwibm90XCIgJiZcbiAgICAgICAgICB0aGlzLl9zY2FubmVyLnBlZWsgPT0gJExQQVJFTikge1xuICAgICAgICBzZWxlY3RvckNzc1Rva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgc2VsZWN0b3JDc3NUb2tlbnMucHVzaCh0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICcoJykpO1xuXG4gICAgICAgIC8vIHRoZSBpbm5lciBzZWxlY3RvciBpbnNpZGUgb2YgOm5vdCguLi4pIGNhbiBvbmx5IGJlIG9uZVxuICAgICAgICAvLyBDU1Mgc2VsZWN0b3IgKG5vIGNvbW1hcyBhbGxvd2VkKSB0aGVyZWZvcmUgd2UgcGFyc2Ugb25seVxuICAgICAgICAvLyBvbmUgc2VsZWN0b3IgYnkgY2FsbGluZyB0aGUgbWV0aG9kIGJlbG93XG4gICAgICAgIHRoaXMuX3BhcnNlU2VsZWN0b3IoYml0V2lzZU9yKFtkZWxpbWl0ZXJzLCBSUEFSRU5fREVMSU1dKSlcbiAgICAgICAgICAgIC50b2tlbnMuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAoaW5uZXJTZWxlY3RvclRva2VuKSA9PiB7IHNlbGVjdG9yQ3NzVG9rZW5zLnB1c2goaW5uZXJTZWxlY3RvclRva2VuKTsgfSk7XG5cbiAgICAgICAgc2VsZWN0b3JDc3NUb2tlbnMucHVzaCh0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICcpJykpO1xuXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBwcmV2aW91c1Rva2VuID0gdG9rZW47XG5cbiAgICAgIGlmICh0b2tlbi50eXBlID09IENzc1Rva2VuVHlwZS5XaGl0ZXNwYWNlKSB7XG4gICAgICAgIHdzQ3NzVG9rZW4gPSB0b2tlbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQod3NDc3NUb2tlbikpIHtcbiAgICAgICAgICBzZWxlY3RvckNzc1Rva2Vucy5wdXNoKHdzQ3NzVG9rZW4pO1xuICAgICAgICAgIHdzQ3NzVG9rZW4gPSBudWxsO1xuICAgICAgICAgIGlzQ29tcGxleCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZWN0b3JDc3NUb2tlbnMucHVzaCh0b2tlbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3NjYW5uZXIuZ2V0TW9kZSgpID09IENzc0xleGVyTW9kZS5BVFRSSUJVVEVfU0VMRUNUT1IpIHtcbiAgICAgIHRoaXMuX2Vycm9yKFxuICAgICAgICAgIGBVbmJhbGFuY2VkIENTUyBhdHRyaWJ1dGUgc2VsZWN0b3IgYXQgY29sdW1uICR7cHJldmlvdXNUb2tlbi5saW5lfToke3ByZXZpb3VzVG9rZW4uY29sdW1ufWAsXG4gICAgICAgICAgcHJldmlvdXNUb2tlbik7XG4gICAgfSBlbHNlIGlmIChwYXJlbkNvdW50ID4gMCkge1xuICAgICAgdGhpcy5fZXJyb3IoXG4gICAgICAgICAgYFVuYmFsYW5jZWQgcHNldWRvIHNlbGVjdG9yIGZ1bmN0aW9uIHZhbHVlIGF0IGNvbHVtbiAke3ByZXZpb3VzVG9rZW4ubGluZX06JHtwcmV2aW91c1Rva2VuLmNvbHVtbn1gLFxuICAgICAgICAgIHByZXZpb3VzVG9rZW4pO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQ3NzU2VsZWN0b3JBU1Qoc2VsZWN0b3JDc3NUb2tlbnMsIGlzQ29tcGxleCk7XG4gIH1cblxuICBfcGFyc2VWYWx1ZShkZWxpbWl0ZXJzOiBudW1iZXIpOiBDc3NTdHlsZVZhbHVlQVNUIHtcbiAgICBkZWxpbWl0ZXJzID0gYml0V2lzZU9yKFtkZWxpbWl0ZXJzLCBSQlJBQ0VfREVMSU0sIFNFTUlDT0xPTl9ERUxJTSwgTkVXTElORV9ERUxJTV0pO1xuXG4gICAgdGhpcy5fc2Nhbm5lci5zZXRNb2RlKENzc0xleGVyTW9kZS5TVFlMRV9WQUxVRSk7XG5cbiAgICB2YXIgc3RyVmFsdWUgPSBcIlwiO1xuICAgIHZhciB0b2tlbnMgPSBbXTtcbiAgICB2YXIgcHJldmlvdXM6IENzc1Rva2VuO1xuICAgIHdoaWxlICghY2hhcmFjdGVyQ29udGFpbnNEZWxpbWl0ZXIodGhpcy5fc2Nhbm5lci5wZWVrLCBkZWxpbWl0ZXJzKSkge1xuICAgICAgdmFyIHRva2VuO1xuICAgICAgaWYgKGlzUHJlc2VudChwcmV2aW91cykgJiYgcHJldmlvdXMudHlwZSA9PSBDc3NUb2tlblR5cGUuSWRlbnRpZmllciAmJlxuICAgICAgICAgIHRoaXMuX3NjYW5uZXIucGVlayA9PSAkTFBBUkVOKSB7XG4gICAgICAgIHRva2VuID0gdGhpcy5fY29uc3VtZShDc3NUb2tlblR5cGUuQ2hhcmFjdGVyLCAnKCcpO1xuICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgIHN0clZhbHVlICs9IHRva2VuLnN0clZhbHVlO1xuXG4gICAgICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuU1RZTEVfVkFMVUVfRlVOQ1RJT04pO1xuXG4gICAgICAgIHRva2VuID0gdGhpcy5fc2NhbigpO1xuICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgIHN0clZhbHVlICs9IHRva2VuLnN0clZhbHVlO1xuXG4gICAgICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuU1RZTEVfVkFMVUUpO1xuXG4gICAgICAgIHRva2VuID0gdGhpcy5fY29uc3VtZShDc3NUb2tlblR5cGUuQ2hhcmFjdGVyLCAnKScpO1xuICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgIHN0clZhbHVlICs9IHRva2VuLnN0clZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9rZW4gPSB0aGlzLl9zY2FuKCk7XG4gICAgICAgIGlmICh0b2tlbi50eXBlICE9IENzc1Rva2VuVHlwZS5XaGl0ZXNwYWNlKSB7XG4gICAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICB9XG4gICAgICAgIHN0clZhbHVlICs9IHRva2VuLnN0clZhbHVlO1xuICAgICAgfVxuXG4gICAgICBwcmV2aW91cyA9IHRva2VuO1xuICAgIH1cblxuICAgIHRoaXMuX3NjYW5uZXIuY29uc3VtZVdoaXRlc3BhY2UoKTtcblxuICAgIHZhciBjb2RlID0gdGhpcy5fc2Nhbm5lci5wZWVrO1xuICAgIGlmIChjb2RlID09ICRTRU1JQ09MT04pIHtcbiAgICAgIHRoaXMuX2NvbnN1bWUoQ3NzVG9rZW5UeXBlLkNoYXJhY3RlciwgJzsnKTtcbiAgICB9IGVsc2UgaWYgKGNvZGUgIT0gJFJCUkFDRSkge1xuICAgICAgdGhpcy5fZXJyb3IoXG4gICAgICAgICAgZ2VuZXJhdGVFcnJvck1lc3NhZ2UodGhpcy5fc2Nhbm5lci5pbnB1dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgVGhlIENTUyBrZXkvdmFsdWUgZGVmaW5pdGlvbiBkaWQgbm90IGVuZCB3aXRoIGEgc2VtaWNvbG9uYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91cy5zdHJWYWx1ZSwgcHJldmlvdXMuaW5kZXgsIHByZXZpb3VzLmxpbmUsIHByZXZpb3VzLmNvbHVtbiksXG4gICAgICAgICAgcHJldmlvdXMpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQ3NzU3R5bGVWYWx1ZUFTVCh0b2tlbnMsIHN0clZhbHVlKTtcbiAgfVxuXG4gIF9jb2xsZWN0VW50aWxEZWxpbShkZWxpbWl0ZXJzOiBudW1iZXIsIGFzc2VydFR5cGU6IENzc1Rva2VuVHlwZSA9IG51bGwpOiBDc3NUb2tlbltdIHtcbiAgICB2YXIgdG9rZW5zID0gW107XG4gICAgd2hpbGUgKCFjaGFyYWN0ZXJDb250YWluc0RlbGltaXRlcih0aGlzLl9zY2FubmVyLnBlZWssIGRlbGltaXRlcnMpKSB7XG4gICAgICB2YXIgdmFsID0gaXNQcmVzZW50KGFzc2VydFR5cGUpID8gdGhpcy5fY29uc3VtZShhc3NlcnRUeXBlKSA6IHRoaXMuX3NjYW4oKTtcbiAgICAgIHRva2Vucy5wdXNoKHZhbCk7XG4gICAgfVxuICAgIHJldHVybiB0b2tlbnM7XG4gIH1cblxuICBfcGFyc2VCbG9jayhkZWxpbWl0ZXJzOiBudW1iZXIpOiBDc3NCbG9ja0FTVCB7XG4gICAgZGVsaW1pdGVycyA9IGJpdFdpc2VPcihbZGVsaW1pdGVycywgUkJSQUNFX0RFTElNXSk7XG5cbiAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLkJMT0NLKTtcblxuICAgIHRoaXMuX2NvbnN1bWUoQ3NzVG9rZW5UeXBlLkNoYXJhY3RlciwgJ3snKTtcbiAgICB0aGlzLl9zY2FubmVyLmNvbnN1bWVFbXB0eVN0YXRlbWVudHMoKTtcblxuICAgIHZhciByZXN1bHRzID0gW107XG4gICAgd2hpbGUgKCFjaGFyYWN0ZXJDb250YWluc0RlbGltaXRlcih0aGlzLl9zY2FubmVyLnBlZWssIGRlbGltaXRlcnMpKSB7XG4gICAgICByZXN1bHRzLnB1c2godGhpcy5fcGFyc2VSdWxlKGRlbGltaXRlcnMpKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICd9Jyk7XG5cbiAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLkJMT0NLKTtcbiAgICB0aGlzLl9zY2FubmVyLmNvbnN1bWVFbXB0eVN0YXRlbWVudHMoKTtcblxuICAgIHJldHVybiBuZXcgQ3NzQmxvY2tBU1QocmVzdWx0cyk7XG4gIH1cblxuICBfcGFyc2VTdHlsZUJsb2NrKGRlbGltaXRlcnM6IG51bWJlcik6IENzc0Jsb2NrQVNUIHtcbiAgICBkZWxpbWl0ZXJzID0gYml0V2lzZU9yKFtkZWxpbWl0ZXJzLCBSQlJBQ0VfREVMSU0sIExCUkFDRV9ERUxJTV0pO1xuXG4gICAgdGhpcy5fc2Nhbm5lci5zZXRNb2RlKENzc0xleGVyTW9kZS5TVFlMRV9CTE9DSyk7XG5cbiAgICB0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICd7Jyk7XG4gICAgdGhpcy5fc2Nhbm5lci5jb25zdW1lRW1wdHlTdGF0ZW1lbnRzKCk7XG5cbiAgICB2YXIgZGVmaW5pdGlvbnMgPSBbXTtcbiAgICB3aGlsZSAoIWNoYXJhY3RlckNvbnRhaW5zRGVsaW1pdGVyKHRoaXMuX3NjYW5uZXIucGVlaywgZGVsaW1pdGVycykpIHtcbiAgICAgIGRlZmluaXRpb25zLnB1c2godGhpcy5fcGFyc2VEZWZpbml0aW9uKGRlbGltaXRlcnMpKTtcbiAgICAgIHRoaXMuX3NjYW5uZXIuY29uc3VtZUVtcHR5U3RhdGVtZW50cygpO1xuICAgIH1cblxuICAgIHRoaXMuX2NvbnN1bWUoQ3NzVG9rZW5UeXBlLkNoYXJhY3RlciwgJ30nKTtcblxuICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuU1RZTEVfQkxPQ0spO1xuICAgIHRoaXMuX3NjYW5uZXIuY29uc3VtZUVtcHR5U3RhdGVtZW50cygpO1xuXG4gICAgcmV0dXJuIG5ldyBDc3NCbG9ja0FTVChkZWZpbml0aW9ucyk7XG4gIH1cblxuICBfcGFyc2VEZWZpbml0aW9uKGRlbGltaXRlcnM6IG51bWJlcik6IENzc0RlZmluaXRpb25BU1Qge1xuICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuU1RZTEVfQkxPQ0spO1xuXG4gICAgdmFyIHByb3AgPSB0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5JZGVudGlmaWVyKTtcbiAgICB2YXIgcGFyc2VWYWx1ZSwgdmFsdWUgPSBudWxsO1xuXG4gICAgLy8gdGhlIGNvbG9uIHZhbHVlIHNlcGFyYXRlcyB0aGUgcHJvcCBmcm9tIHRoZSBzdHlsZS5cbiAgICAvLyB0aGVyZSBhcmUgYSBmZXcgY2FzZXMgYXMgdG8gd2hhdCBjb3VsZCBoYXBwZW4gaWYgaXRcbiAgICAvLyBpcyBtaXNzaW5nXG4gICAgc3dpdGNoICh0aGlzLl9zY2FubmVyLnBlZWspIHtcbiAgICAgIGNhc2UgJENPTE9OOlxuICAgICAgICB0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICc6Jyk7XG4gICAgICAgIHBhcnNlVmFsdWUgPSB0cnVlO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAkU0VNSUNPTE9OOlxuICAgICAgY2FzZSAkUkJSQUNFOlxuICAgICAgY2FzZSAkRU9GOlxuICAgICAgICBwYXJzZVZhbHVlID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB2YXIgcHJvcFN0ciA9IFtwcm9wLnN0clZhbHVlXTtcbiAgICAgICAgaWYgKHRoaXMuX3NjYW5uZXIucGVlayAhPSAkQ09MT04pIHtcbiAgICAgICAgICAvLyB0aGlzIHdpbGwgdGhyb3cgdGhlIGVycm9yXG4gICAgICAgICAgdmFyIG5leHRWYWx1ZSA9IHRoaXMuX2NvbnN1bWUoQ3NzVG9rZW5UeXBlLkNoYXJhY3RlciwgJzonKTtcbiAgICAgICAgICBwcm9wU3RyLnB1c2gobmV4dFZhbHVlLnN0clZhbHVlKTtcblxuICAgICAgICAgIHZhciByZW1haW5pbmdUb2tlbnMgPSB0aGlzLl9jb2xsZWN0VW50aWxEZWxpbShcbiAgICAgICAgICAgICAgYml0V2lzZU9yKFtkZWxpbWl0ZXJzLCBDT0xPTl9ERUxJTSwgU0VNSUNPTE9OX0RFTElNXSksIENzc1Rva2VuVHlwZS5JZGVudGlmaWVyKTtcbiAgICAgICAgICBpZiAocmVtYWluaW5nVG9rZW5zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJlbWFpbmluZ1Rva2Vucy5mb3JFYWNoKCh0b2tlbikgPT4geyBwcm9wU3RyLnB1c2godG9rZW4uc3RyVmFsdWUpOyB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBwcm9wID0gbmV3IENzc1Rva2VuKHByb3AuaW5kZXgsIHByb3AuY29sdW1uLCBwcm9wLmxpbmUsIHByb3AudHlwZSwgcHJvcFN0ci5qb2luKFwiIFwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aGlzIG1lYW5zIHdlJ3ZlIHJlYWNoZWQgdGhlIGVuZCBvZiB0aGUgZGVmaW5pdGlvbiBhbmQvb3IgYmxvY2tcbiAgICAgICAgaWYgKHRoaXMuX3NjYW5uZXIucGVlayA9PSAkQ09MT04pIHtcbiAgICAgICAgICB0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICc6Jyk7XG4gICAgICAgICAgcGFyc2VWYWx1ZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGFyc2VWYWx1ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChwYXJzZVZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IHRoaXMuX3BhcnNlVmFsdWUoZGVsaW1pdGVycyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2Vycm9yKGdlbmVyYXRlRXJyb3JNZXNzYWdlKHRoaXMuX3NjYW5uZXIuaW5wdXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgVGhlIENTUyBwcm9wZXJ0eSB3YXMgbm90IHBhaXJlZCB3aXRoIGEgc3R5bGUgdmFsdWVgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcC5zdHJWYWx1ZSwgcHJvcC5pbmRleCwgcHJvcC5saW5lLCBwcm9wLmNvbHVtbiksXG4gICAgICAgICAgICAgICAgICBwcm9wKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IENzc0RlZmluaXRpb25BU1QocHJvcCwgdmFsdWUpO1xuICB9XG5cbiAgX2Fzc2VydENvbmRpdGlvbihzdGF0dXM6IGJvb2xlYW4sIGVycm9yTWVzc2FnZTogc3RyaW5nLCBwcm9ibGVtVG9rZW46IENzc1Rva2VuKTogYm9vbGVhbiB7XG4gICAgaWYgKCFzdGF0dXMpIHtcbiAgICAgIHRoaXMuX2Vycm9yKGVycm9yTWVzc2FnZSwgcHJvYmxlbVRva2VuKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBfZXJyb3IobWVzc2FnZTogc3RyaW5nLCBwcm9ibGVtVG9rZW46IENzc1Rva2VuKSB7XG4gICAgdmFyIGxlbmd0aCA9IHByb2JsZW1Ub2tlbi5zdHJWYWx1ZS5sZW5ndGg7XG4gICAgdmFyIGVycm9yID0gQ3NzUGFyc2VFcnJvci5jcmVhdGUodGhpcy5fZmlsZSwgMCwgcHJvYmxlbVRva2VuLmxpbmUsIHByb2JsZW1Ub2tlbi5jb2x1bW4sIGxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlKTtcbiAgICB0aGlzLl9lcnJvcnMucHVzaChlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENzc1N0eWxlVmFsdWVBU1QgZXh0ZW5kcyBDc3NBU1Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdG9rZW5zOiBDc3NUb2tlbltdLCBwdWJsaWMgc3RyVmFsdWU6IHN0cmluZykgeyBzdXBlcigpOyB9XG4gIHZpc2l0KHZpc2l0b3I6IENzc0FTVFZpc2l0b3IsIGNvbnRleHQ/OiBhbnkpIHsgdmlzaXRvci52aXNpdENzc1ZhbHVlKHRoaXMpOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBDc3NSdWxlQVNUIGV4dGVuZHMgQ3NzQVNUIHt9XG5cbmV4cG9ydCBjbGFzcyBDc3NCbG9ja1J1bGVBU1QgZXh0ZW5kcyBDc3NSdWxlQVNUIHtcbiAgY29uc3RydWN0b3IocHVibGljIHR5cGU6IEJsb2NrVHlwZSwgcHVibGljIGJsb2NrOiBDc3NCbG9ja0FTVCwgcHVibGljIG5hbWU6IENzc1Rva2VuID0gbnVsbCkge1xuICAgIHN1cGVyKCk7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQ3NzQVNUVmlzaXRvciwgY29udGV4dD86IGFueSkgeyB2aXNpdG9yLnZpc2l0Q3NzQmxvY2sodGhpcy5ibG9jaywgY29udGV4dCk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIENzc0tleWZyYW1lUnVsZUFTVCBleHRlbmRzIENzc0Jsb2NrUnVsZUFTVCB7XG4gIGNvbnN0cnVjdG9yKG5hbWU6IENzc1Rva2VuLCBibG9jazogQ3NzQmxvY2tBU1QpIHsgc3VwZXIoQmxvY2tUeXBlLktleWZyYW1lcywgYmxvY2ssIG5hbWUpOyB9XG4gIHZpc2l0KHZpc2l0b3I6IENzc0FTVFZpc2l0b3IsIGNvbnRleHQ/OiBhbnkpIHsgdmlzaXRvci52aXNpdENzc0tleWZyYW1lUnVsZSh0aGlzLCBjb250ZXh0KTsgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3NzS2V5ZnJhbWVEZWZpbml0aW9uQVNUIGV4dGVuZHMgQ3NzQmxvY2tSdWxlQVNUIHtcbiAgcHVibGljIHN0ZXBzO1xuICBjb25zdHJ1Y3Rvcihfc3RlcHM6IENzc1Rva2VuW10sIGJsb2NrOiBDc3NCbG9ja0FTVCkge1xuICAgIHN1cGVyKEJsb2NrVHlwZS5LZXlmcmFtZXMsIGJsb2NrLCBtZXJnZVRva2Vucyhfc3RlcHMsIFwiLFwiKSk7XG4gICAgdGhpcy5zdGVwcyA9IF9zdGVwcztcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBDc3NBU1RWaXNpdG9yLCBjb250ZXh0PzogYW55KSB7XG4gICAgdmlzaXRvci52aXNpdENzc0tleWZyYW1lRGVmaW5pdGlvbih0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3NzQmxvY2tEZWZpbml0aW9uUnVsZUFTVCBleHRlbmRzIENzc0Jsb2NrUnVsZUFTVCB7XG4gIHB1YmxpYyBzdHJWYWx1ZTogc3RyaW5nO1xuICBjb25zdHJ1Y3Rvcih0eXBlOiBCbG9ja1R5cGUsIHB1YmxpYyBxdWVyeTogQ3NzVG9rZW5bXSwgYmxvY2s6IENzc0Jsb2NrQVNUKSB7XG4gICAgc3VwZXIodHlwZSwgYmxvY2spO1xuICAgIHRoaXMuc3RyVmFsdWUgPSBxdWVyeS5tYXAodG9rZW4gPT4gdG9rZW4uc3RyVmFsdWUpLmpvaW4oXCJcIik7XG4gICAgdmFyIGZpcnN0Q3NzVG9rZW46IENzc1Rva2VuID0gcXVlcnlbMF07XG4gICAgdGhpcy5uYW1lID0gbmV3IENzc1Rva2VuKGZpcnN0Q3NzVG9rZW4uaW5kZXgsIGZpcnN0Q3NzVG9rZW4uY29sdW1uLCBmaXJzdENzc1Rva2VuLmxpbmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIENzc1Rva2VuVHlwZS5JZGVudGlmaWVyLCB0aGlzLnN0clZhbHVlKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBDc3NBU1RWaXNpdG9yLCBjb250ZXh0PzogYW55KSB7IHZpc2l0b3IudmlzaXRDc3NCbG9jayh0aGlzLmJsb2NrLCBjb250ZXh0KTsgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3NzTWVkaWFRdWVyeVJ1bGVBU1QgZXh0ZW5kcyBDc3NCbG9ja0RlZmluaXRpb25SdWxlQVNUIHtcbiAgY29uc3RydWN0b3IocXVlcnk6IENzc1Rva2VuW10sIGJsb2NrOiBDc3NCbG9ja0FTVCkgeyBzdXBlcihCbG9ja1R5cGUuTWVkaWFRdWVyeSwgcXVlcnksIGJsb2NrKTsgfVxuICB2aXNpdCh2aXNpdG9yOiBDc3NBU1RWaXNpdG9yLCBjb250ZXh0PzogYW55KSB7IHZpc2l0b3IudmlzaXRDc3NNZWRpYVF1ZXJ5UnVsZSh0aGlzLCBjb250ZXh0KTsgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3NzSW5saW5lUnVsZUFTVCBleHRlbmRzIENzc1J1bGVBU1Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdHlwZTogQmxvY2tUeXBlLCBwdWJsaWMgdmFsdWU6IENzc1N0eWxlVmFsdWVBU1QpIHsgc3VwZXIoKTsgfVxuICB2aXNpdCh2aXNpdG9yOiBDc3NBU1RWaXNpdG9yLCBjb250ZXh0PzogYW55KSB7IHZpc2l0b3IudmlzaXRJbmxpbmVDc3NSdWxlKHRoaXMsIGNvbnRleHQpOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBDc3NTZWxlY3RvclJ1bGVBU1QgZXh0ZW5kcyBDc3NCbG9ja1J1bGVBU1Qge1xuICBwdWJsaWMgc3RyVmFsdWU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc2VsZWN0b3JzOiBDc3NTZWxlY3RvckFTVFtdLCBibG9jazogQ3NzQmxvY2tBU1QpIHtcbiAgICBzdXBlcihCbG9ja1R5cGUuU2VsZWN0b3IsIGJsb2NrKTtcbiAgICB0aGlzLnN0clZhbHVlID0gc2VsZWN0b3JzLm1hcChzZWxlY3RvciA9PiBzZWxlY3Rvci5zdHJWYWx1ZSkuam9pbihcIixcIik7XG4gIH1cblxuICB2aXNpdCh2aXNpdG9yOiBDc3NBU1RWaXNpdG9yLCBjb250ZXh0PzogYW55KSB7IHZpc2l0b3IudmlzaXRDc3NTZWxlY3RvclJ1bGUodGhpcywgY29udGV4dCk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIENzc0RlZmluaXRpb25BU1QgZXh0ZW5kcyBDc3NBU1Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJvcGVydHk6IENzc1Rva2VuLCBwdWJsaWMgdmFsdWU6IENzc1N0eWxlVmFsdWVBU1QpIHsgc3VwZXIoKTsgfVxuICB2aXNpdCh2aXNpdG9yOiBDc3NBU1RWaXNpdG9yLCBjb250ZXh0PzogYW55KSB7IHZpc2l0b3IudmlzaXRDc3NEZWZpbml0aW9uKHRoaXMsIGNvbnRleHQpOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBDc3NTZWxlY3RvckFTVCBleHRlbmRzIENzc0FTVCB7XG4gIHB1YmxpYyBzdHJWYWx1ZTtcbiAgY29uc3RydWN0b3IocHVibGljIHRva2VuczogQ3NzVG9rZW5bXSwgcHVibGljIGlzQ29tcGxleDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnN0clZhbHVlID0gdG9rZW5zLm1hcCh0b2tlbiA9PiB0b2tlbi5zdHJWYWx1ZSkuam9pbihcIlwiKTtcbiAgfVxuICB2aXNpdCh2aXNpdG9yOiBDc3NBU1RWaXNpdG9yLCBjb250ZXh0PzogYW55KSB7IHZpc2l0b3IudmlzaXRDc3NTZWxlY3Rvcih0aGlzLCBjb250ZXh0KTsgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3NzQmxvY2tBU1QgZXh0ZW5kcyBDc3NBU1Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZW50cmllczogQ3NzQVNUW10pIHsgc3VwZXIoKTsgfVxuICB2aXNpdCh2aXNpdG9yOiBDc3NBU1RWaXNpdG9yLCBjb250ZXh0PzogYW55KSB7IHZpc2l0b3IudmlzaXRDc3NCbG9jayh0aGlzLCBjb250ZXh0KTsgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3NzU3R5bGVTaGVldEFTVCBleHRlbmRzIENzc0FTVCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBydWxlczogQ3NzQVNUW10pIHsgc3VwZXIoKTsgfVxuICB2aXNpdCh2aXNpdG9yOiBDc3NBU1RWaXNpdG9yLCBjb250ZXh0PzogYW55KSB7IHZpc2l0b3IudmlzaXRDc3NTdHlsZVNoZWV0KHRoaXMsIGNvbnRleHQpOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBDc3NQYXJzZUVycm9yIGV4dGVuZHMgUGFyc2VFcnJvciB7XG4gIHN0YXRpYyBjcmVhdGUoZmlsZTogUGFyc2VTb3VyY2VGaWxlLCBvZmZzZXQ6IG51bWJlciwgbGluZTogbnVtYmVyLCBjb2w6IG51bWJlciwgbGVuZ3RoOiBudW1iZXIsXG4gICAgICAgICAgICAgICAgZXJyTXNnOiBzdHJpbmcpOiBDc3NQYXJzZUVycm9yIHtcbiAgICB2YXIgc3RhcnQgPSBuZXcgUGFyc2VMb2NhdGlvbihmaWxlLCBvZmZzZXQsIGxpbmUsIGNvbCk7XG4gICAgdmFyIGVuZCA9IG5ldyBQYXJzZUxvY2F0aW9uKGZpbGUsIG9mZnNldCwgbGluZSwgY29sICsgbGVuZ3RoKTtcbiAgICB2YXIgc3BhbiA9IG5ldyBQYXJzZVNvdXJjZVNwYW4oc3RhcnQsIGVuZCk7XG4gICAgcmV0dXJuIG5ldyBDc3NQYXJzZUVycm9yKHNwYW4sIFwiQ1NTIFBhcnNlIEVycm9yOiBcIiArIGVyck1zZyk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihzcGFuOiBQYXJzZVNvdXJjZVNwYW4sIG1lc3NhZ2U6IHN0cmluZykgeyBzdXBlcihzcGFuLCBtZXNzYWdlKTsgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3NzVW5rbm93blRva2VuTGlzdEFTVCBleHRlbmRzIENzc1J1bGVBU1Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZSwgcHVibGljIHRva2VuczogQ3NzVG9rZW5bXSkgeyBzdXBlcigpOyB9XG4gIHZpc2l0KHZpc2l0b3I6IENzc0FTVFZpc2l0b3IsIGNvbnRleHQ/OiBhbnkpIHsgdmlzaXRvci52aXNpdFVua293blJ1bGUodGhpcywgY29udGV4dCk7IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
