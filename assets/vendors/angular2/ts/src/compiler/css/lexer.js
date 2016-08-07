System.register(["angular2/src/facade/lang", 'angular2/src/facade/exceptions', "angular2/src/compiler/chars"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lang_1, exceptions_1, chars_1;
    var CssTokenType, CssLexerMode, LexedCssResult, CssToken, CssLexer, CssScannerError, CssScanner;
    function generateErrorMessage(input, message, errorValue, index, row, column) {
        return (message + " at column " + row + ":" + column + " in expression [") +
            findProblemCode(input, errorValue, index, column) + ']';
    }
    exports_1("generateErrorMessage", generateErrorMessage);
    function findProblemCode(input, errorValue, index, column) {
        var endOfProblemLine = index;
        var current = charCode(input, index);
        while (current > 0 && !isNewline(current)) {
            current = charCode(input, ++endOfProblemLine);
        }
        var choppedString = input.substring(0, endOfProblemLine);
        var pointerPadding = "";
        for (var i = 0; i < column; i++) {
            pointerPadding += " ";
        }
        var pointerString = "";
        for (var i = 0; i < errorValue.length; i++) {
            pointerString += "^";
        }
        return choppedString + "\n" + pointerPadding + pointerString + "\n";
    }
    exports_1("findProblemCode", findProblemCode);
    function _trackWhitespace(mode) {
        switch (mode) {
            case CssLexerMode.SELECTOR:
            case CssLexerMode.ALL_TRACK_WS:
            case CssLexerMode.STYLE_VALUE:
                return true;
            default:
                return false;
        }
    }
    function isAtKeyword(current, next) {
        return current.numValue == chars_1.$AT && next.type == CssTokenType.Identifier;
    }
    function isCharMatch(target, previous, code) {
        return code == target && previous != chars_1.$BACKSLASH;
    }
    function isDigit(code) {
        return chars_1.$0 <= code && code <= chars_1.$9;
    }
    function isCommentStart(code, next) {
        return code == chars_1.$SLASH && next == chars_1.$STAR;
    }
    function isCommentEnd(code, next) {
        return code == chars_1.$STAR && next == chars_1.$SLASH;
    }
    function isStringStart(code, next) {
        var target = code;
        if (target == chars_1.$BACKSLASH) {
            target = next;
        }
        return target == chars_1.$DQ || target == chars_1.$SQ;
    }
    function isIdentifierStart(code, next) {
        var target = code;
        if (target == chars_1.$MINUS) {
            target = next;
        }
        return (chars_1.$a <= target && target <= chars_1.$z) || (chars_1.$A <= target && target <= chars_1.$Z) || target == chars_1.$BACKSLASH ||
            target == chars_1.$MINUS || target == chars_1.$_;
    }
    function isIdentifierPart(target) {
        return (chars_1.$a <= target && target <= chars_1.$z) || (chars_1.$A <= target && target <= chars_1.$Z) || target == chars_1.$BACKSLASH ||
            target == chars_1.$MINUS || target == chars_1.$_ || isDigit(target);
    }
    function isValidPseudoSelectorCharacter(code) {
        switch (code) {
            case chars_1.$LPAREN:
            case chars_1.$RPAREN:
                return true;
            default:
                return false;
        }
    }
    function isValidKeyframeBlockCharacter(code) {
        return code == chars_1.$PERCENT;
    }
    function isValidAttributeSelectorCharacter(code) {
        // value^*|$~=something
        switch (code) {
            case chars_1.$$:
            case chars_1.$PIPE:
            case chars_1.$CARET:
            case chars_1.$TILDA:
            case chars_1.$STAR:
            case chars_1.$EQ:
                return true;
            default:
                return false;
        }
    }
    function isValidSelectorCharacter(code) {
        // selector [ key   = value ]
        // IDENT    C IDENT C IDENT C
        // #id, .class, *+~>
        // tag:PSEUDO
        switch (code) {
            case chars_1.$HASH:
            case chars_1.$PERIOD:
            case chars_1.$TILDA:
            case chars_1.$STAR:
            case chars_1.$PLUS:
            case chars_1.$GT:
            case chars_1.$COLON:
            case chars_1.$PIPE:
            case chars_1.$COMMA:
                return true;
            default:
                return false;
        }
    }
    function isValidStyleBlockCharacter(code) {
        // key:value;
        // key:calc(something ... )
        switch (code) {
            case chars_1.$HASH:
            case chars_1.$SEMICOLON:
            case chars_1.$COLON:
            case chars_1.$PERCENT:
            case chars_1.$SLASH:
            case chars_1.$BACKSLASH:
            case chars_1.$BANG:
            case chars_1.$PERIOD:
            case chars_1.$LPAREN:
            case chars_1.$RPAREN:
                return true;
            default:
                return false;
        }
    }
    function isValidMediaQueryRuleCharacter(code) {
        // (min-width: 7.5em) and (orientation: landscape)
        switch (code) {
            case chars_1.$LPAREN:
            case chars_1.$RPAREN:
            case chars_1.$COLON:
            case chars_1.$PERCENT:
            case chars_1.$PERIOD:
                return true;
            default:
                return false;
        }
    }
    function isValidAtRuleCharacter(code) {
        // @document url(http://www.w3.org/page?something=on#hash),
        switch (code) {
            case chars_1.$LPAREN:
            case chars_1.$RPAREN:
            case chars_1.$COLON:
            case chars_1.$PERCENT:
            case chars_1.$PERIOD:
            case chars_1.$SLASH:
            case chars_1.$BACKSLASH:
            case chars_1.$HASH:
            case chars_1.$EQ:
            case chars_1.$QUESTION:
            case chars_1.$AMPERSAND:
            case chars_1.$STAR:
            case chars_1.$COMMA:
            case chars_1.$MINUS:
            case chars_1.$PLUS:
                return true;
            default:
                return false;
        }
    }
    function isValidStyleFunctionCharacter(code) {
        switch (code) {
            case chars_1.$PERIOD:
            case chars_1.$MINUS:
            case chars_1.$PLUS:
            case chars_1.$STAR:
            case chars_1.$SLASH:
            case chars_1.$LPAREN:
            case chars_1.$RPAREN:
            case chars_1.$COMMA:
                return true;
            default:
                return false;
        }
    }
    function isValidBlockCharacter(code) {
        // @something { }
        // IDENT
        return code == chars_1.$AT;
    }
    function isValidCssCharacter(code, mode) {
        switch (mode) {
            case CssLexerMode.ALL:
            case CssLexerMode.ALL_TRACK_WS:
                return true;
            case CssLexerMode.SELECTOR:
                return isValidSelectorCharacter(code);
            case CssLexerMode.PSEUDO_SELECTOR:
                return isValidPseudoSelectorCharacter(code);
            case CssLexerMode.ATTRIBUTE_SELECTOR:
                return isValidAttributeSelectorCharacter(code);
            case CssLexerMode.MEDIA_QUERY:
                return isValidMediaQueryRuleCharacter(code);
            case CssLexerMode.AT_RULE_QUERY:
                return isValidAtRuleCharacter(code);
            case CssLexerMode.KEYFRAME_BLOCK:
                return isValidKeyframeBlockCharacter(code);
            case CssLexerMode.STYLE_BLOCK:
            case CssLexerMode.STYLE_VALUE:
                return isValidStyleBlockCharacter(code);
            case CssLexerMode.STYLE_CALC_FUNCTION:
                return isValidStyleFunctionCharacter(code);
            case CssLexerMode.BLOCK:
                return isValidBlockCharacter(code);
            default:
                return false;
        }
    }
    function charCode(input, index) {
        return index >= input.length ? chars_1.$EOF : lang_1.StringWrapper.charCodeAt(input, index);
    }
    function charStr(code) {
        return lang_1.StringWrapper.fromCharCode(code);
    }
    function isNewline(code) {
        switch (code) {
            case chars_1.$FF:
            case chars_1.$CR:
            case chars_1.$LF:
            case chars_1.$VTAB:
                return true;
            default:
                return false;
        }
    }
    exports_1("isNewline", isNewline);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (chars_1_1) {
                chars_1 = chars_1_1;
                exports_1({
                    "$EOF": chars_1_1["$EOF"],
                    "$AT": chars_1_1["$AT"],
                    "$RBRACE": chars_1_1["$RBRACE"],
                    "$LBRACE": chars_1_1["$LBRACE"],
                    "$LBRACKET": chars_1_1["$LBRACKET"],
                    "$RBRACKET": chars_1_1["$RBRACKET"],
                    "$LPAREN": chars_1_1["$LPAREN"],
                    "$RPAREN": chars_1_1["$RPAREN"],
                    "$COMMA": chars_1_1["$COMMA"],
                    "$COLON": chars_1_1["$COLON"],
                    "$SEMICOLON": chars_1_1["$SEMICOLON"],
                    "isWhitespace": chars_1_1["isWhitespace"]
                });
            }],
        execute: function() {
            (function (CssTokenType) {
                CssTokenType[CssTokenType["EOF"] = 0] = "EOF";
                CssTokenType[CssTokenType["String"] = 1] = "String";
                CssTokenType[CssTokenType["Comment"] = 2] = "Comment";
                CssTokenType[CssTokenType["Identifier"] = 3] = "Identifier";
                CssTokenType[CssTokenType["Number"] = 4] = "Number";
                CssTokenType[CssTokenType["IdentifierOrNumber"] = 5] = "IdentifierOrNumber";
                CssTokenType[CssTokenType["AtKeyword"] = 6] = "AtKeyword";
                CssTokenType[CssTokenType["Character"] = 7] = "Character";
                CssTokenType[CssTokenType["Whitespace"] = 8] = "Whitespace";
                CssTokenType[CssTokenType["Invalid"] = 9] = "Invalid";
            })(CssTokenType || (CssTokenType = {}));
            exports_1("CssTokenType", CssTokenType);
            (function (CssLexerMode) {
                CssLexerMode[CssLexerMode["ALL"] = 0] = "ALL";
                CssLexerMode[CssLexerMode["ALL_TRACK_WS"] = 1] = "ALL_TRACK_WS";
                CssLexerMode[CssLexerMode["SELECTOR"] = 2] = "SELECTOR";
                CssLexerMode[CssLexerMode["PSEUDO_SELECTOR"] = 3] = "PSEUDO_SELECTOR";
                CssLexerMode[CssLexerMode["ATTRIBUTE_SELECTOR"] = 4] = "ATTRIBUTE_SELECTOR";
                CssLexerMode[CssLexerMode["AT_RULE_QUERY"] = 5] = "AT_RULE_QUERY";
                CssLexerMode[CssLexerMode["MEDIA_QUERY"] = 6] = "MEDIA_QUERY";
                CssLexerMode[CssLexerMode["BLOCK"] = 7] = "BLOCK";
                CssLexerMode[CssLexerMode["KEYFRAME_BLOCK"] = 8] = "KEYFRAME_BLOCK";
                CssLexerMode[CssLexerMode["STYLE_BLOCK"] = 9] = "STYLE_BLOCK";
                CssLexerMode[CssLexerMode["STYLE_VALUE"] = 10] = "STYLE_VALUE";
                CssLexerMode[CssLexerMode["STYLE_VALUE_FUNCTION"] = 11] = "STYLE_VALUE_FUNCTION";
                CssLexerMode[CssLexerMode["STYLE_CALC_FUNCTION"] = 12] = "STYLE_CALC_FUNCTION";
            })(CssLexerMode || (CssLexerMode = {}));
            exports_1("CssLexerMode", CssLexerMode);
            LexedCssResult = (function () {
                function LexedCssResult(error, token) {
                    this.error = error;
                    this.token = token;
                }
                return LexedCssResult;
            }());
            exports_1("LexedCssResult", LexedCssResult);
            CssToken = (function () {
                function CssToken(index, column, line, type, strValue) {
                    this.index = index;
                    this.column = column;
                    this.line = line;
                    this.type = type;
                    this.strValue = strValue;
                    this.numValue = charCode(strValue, 0);
                }
                return CssToken;
            }());
            exports_1("CssToken", CssToken);
            CssLexer = (function () {
                function CssLexer() {
                }
                CssLexer.prototype.scan = function (text, trackComments) {
                    if (trackComments === void 0) { trackComments = false; }
                    return new CssScanner(text, trackComments);
                };
                return CssLexer;
            }());
            exports_1("CssLexer", CssLexer);
            CssScannerError = (function (_super) {
                __extends(CssScannerError, _super);
                function CssScannerError(token, message) {
                    _super.call(this, 'Css Parse Error: ' + message);
                    this.token = token;
                    this.rawMessage = message;
                }
                CssScannerError.prototype.toString = function () { return this.message; };
                return CssScannerError;
            }(exceptions_1.BaseException));
            exports_1("CssScannerError", CssScannerError);
            CssScanner = (function () {
                function CssScanner(input, _trackComments) {
                    if (_trackComments === void 0) { _trackComments = false; }
                    this.input = input;
                    this._trackComments = _trackComments;
                    this.length = 0;
                    this.index = -1;
                    this.column = -1;
                    this.line = 0;
                    /** @internal */
                    this._currentMode = CssLexerMode.BLOCK;
                    /** @internal */
                    this._currentError = null;
                    this.length = this.input.length;
                    this.peekPeek = this.peekAt(0);
                    this.advance();
                }
                CssScanner.prototype.getMode = function () { return this._currentMode; };
                CssScanner.prototype.setMode = function (mode) {
                    if (this._currentMode != mode) {
                        if (_trackWhitespace(this._currentMode)) {
                            this.consumeWhitespace();
                        }
                        this._currentMode = mode;
                    }
                };
                CssScanner.prototype.advance = function () {
                    if (isNewline(this.peek)) {
                        this.column = 0;
                        this.line++;
                    }
                    else {
                        this.column++;
                    }
                    this.index++;
                    this.peek = this.peekPeek;
                    this.peekPeek = this.peekAt(this.index + 1);
                };
                CssScanner.prototype.peekAt = function (index) {
                    return index >= this.length ? chars_1.$EOF : lang_1.StringWrapper.charCodeAt(this.input, index);
                };
                CssScanner.prototype.consumeEmptyStatements = function () {
                    this.consumeWhitespace();
                    while (this.peek == chars_1.$SEMICOLON) {
                        this.advance();
                        this.consumeWhitespace();
                    }
                };
                CssScanner.prototype.consumeWhitespace = function () {
                    while (chars_1.isWhitespace(this.peek) || isNewline(this.peek)) {
                        this.advance();
                        if (!this._trackComments && isCommentStart(this.peek, this.peekPeek)) {
                            this.advance(); // /
                            this.advance(); // *
                            while (!isCommentEnd(this.peek, this.peekPeek)) {
                                if (this.peek == chars_1.$EOF) {
                                    this.error('Unterminated comment');
                                }
                                this.advance();
                            }
                            this.advance(); // *
                            this.advance(); // /
                        }
                    }
                };
                CssScanner.prototype.consume = function (type, value) {
                    if (value === void 0) { value = null; }
                    var mode = this._currentMode;
                    this.setMode(CssLexerMode.ALL);
                    var previousIndex = this.index;
                    var previousLine = this.line;
                    var previousColumn = this.column;
                    var output = this.scan();
                    // just incase the inner scan method returned an error
                    if (lang_1.isPresent(output.error)) {
                        this.setMode(mode);
                        return output;
                    }
                    var next = output.token;
                    if (!lang_1.isPresent(next)) {
                        next = new CssToken(0, 0, 0, CssTokenType.EOF, "end of file");
                    }
                    var isMatchingType;
                    if (type == CssTokenType.IdentifierOrNumber) {
                        // TODO (matsko): implement array traversal for lookup here
                        isMatchingType = next.type == CssTokenType.Number || next.type == CssTokenType.Identifier;
                    }
                    else {
                        isMatchingType = next.type == type;
                    }
                    // before throwing the error we need to bring back the former
                    // mode so that the parser can recover...
                    this.setMode(mode);
                    var error = null;
                    if (!isMatchingType || (lang_1.isPresent(value) && value != next.strValue)) {
                        var errorMessage = lang_1.resolveEnumToken(CssTokenType, next.type) + " does not match expected " +
                            lang_1.resolveEnumToken(CssTokenType, type) + " value";
                        if (lang_1.isPresent(value)) {
                            errorMessage += ' ("' + next.strValue + '" should match "' + value + '")';
                        }
                        error = new CssScannerError(next, generateErrorMessage(this.input, errorMessage, next.strValue, previousIndex, previousLine, previousColumn));
                    }
                    return new LexedCssResult(error, next);
                };
                CssScanner.prototype.scan = function () {
                    var trackWS = _trackWhitespace(this._currentMode);
                    if (this.index == 0 && !trackWS) {
                        this.consumeWhitespace();
                    }
                    var token = this._scan();
                    if (token == null)
                        return null;
                    var error = this._currentError;
                    this._currentError = null;
                    if (!trackWS) {
                        this.consumeWhitespace();
                    }
                    return new LexedCssResult(error, token);
                };
                /** @internal */
                CssScanner.prototype._scan = function () {
                    var peek = this.peek;
                    var peekPeek = this.peekPeek;
                    if (peek == chars_1.$EOF)
                        return null;
                    if (isCommentStart(peek, peekPeek)) {
                        // even if comments are not tracked we still lex the
                        // comment so we can move the pointer forward
                        var commentToken = this.scanComment();
                        if (this._trackComments) {
                            return commentToken;
                        }
                    }
                    if (_trackWhitespace(this._currentMode) && (chars_1.isWhitespace(peek) || isNewline(peek))) {
                        return this.scanWhitespace();
                    }
                    peek = this.peek;
                    peekPeek = this.peekPeek;
                    if (peek == chars_1.$EOF)
                        return null;
                    if (isStringStart(peek, peekPeek)) {
                        return this.scanString();
                    }
                    // something like url(cool)
                    if (this._currentMode == CssLexerMode.STYLE_VALUE_FUNCTION) {
                        return this.scanCssValueFunction();
                    }
                    var isModifier = peek == chars_1.$PLUS || peek == chars_1.$MINUS;
                    var digitA = isModifier ? false : isDigit(peek);
                    var digitB = isDigit(peekPeek);
                    if (digitA || (isModifier && (peekPeek == chars_1.$PERIOD || digitB)) || (peek == chars_1.$PERIOD && digitB)) {
                        return this.scanNumber();
                    }
                    if (peek == chars_1.$AT) {
                        return this.scanAtExpression();
                    }
                    if (isIdentifierStart(peek, peekPeek)) {
                        return this.scanIdentifier();
                    }
                    if (isValidCssCharacter(peek, this._currentMode)) {
                        return this.scanCharacter();
                    }
                    return this.error("Unexpected character [" + lang_1.StringWrapper.fromCharCode(peek) + "]");
                };
                CssScanner.prototype.scanComment = function () {
                    if (this.assertCondition(isCommentStart(this.peek, this.peekPeek), "Expected comment start value")) {
                        return null;
                    }
                    var start = this.index;
                    var startingColumn = this.column;
                    var startingLine = this.line;
                    this.advance(); // /
                    this.advance(); // *
                    while (!isCommentEnd(this.peek, this.peekPeek)) {
                        if (this.peek == chars_1.$EOF) {
                            this.error('Unterminated comment');
                        }
                        this.advance();
                    }
                    this.advance(); // *
                    this.advance(); // /
                    var str = this.input.substring(start, this.index);
                    return new CssToken(start, startingColumn, startingLine, CssTokenType.Comment, str);
                };
                CssScanner.prototype.scanWhitespace = function () {
                    var start = this.index;
                    var startingColumn = this.column;
                    var startingLine = this.line;
                    while (chars_1.isWhitespace(this.peek) && this.peek != chars_1.$EOF) {
                        this.advance();
                    }
                    var str = this.input.substring(start, this.index);
                    return new CssToken(start, startingColumn, startingLine, CssTokenType.Whitespace, str);
                };
                CssScanner.prototype.scanString = function () {
                    if (this.assertCondition(isStringStart(this.peek, this.peekPeek), "Unexpected non-string starting value")) {
                        return null;
                    }
                    var target = this.peek;
                    var start = this.index;
                    var startingColumn = this.column;
                    var startingLine = this.line;
                    var previous = target;
                    this.advance();
                    while (!isCharMatch(target, previous, this.peek)) {
                        if (this.peek == chars_1.$EOF || isNewline(this.peek)) {
                            this.error('Unterminated quote');
                        }
                        previous = this.peek;
                        this.advance();
                    }
                    if (this.assertCondition(this.peek == target, "Unterminated quote")) {
                        return null;
                    }
                    this.advance();
                    var str = this.input.substring(start, this.index);
                    return new CssToken(start, startingColumn, startingLine, CssTokenType.String, str);
                };
                CssScanner.prototype.scanNumber = function () {
                    var start = this.index;
                    var startingColumn = this.column;
                    if (this.peek == chars_1.$PLUS || this.peek == chars_1.$MINUS) {
                        this.advance();
                    }
                    var periodUsed = false;
                    while (isDigit(this.peek) || this.peek == chars_1.$PERIOD) {
                        if (this.peek == chars_1.$PERIOD) {
                            if (periodUsed) {
                                this.error('Unexpected use of a second period value');
                            }
                            periodUsed = true;
                        }
                        this.advance();
                    }
                    var strValue = this.input.substring(start, this.index);
                    return new CssToken(start, startingColumn, this.line, CssTokenType.Number, strValue);
                };
                CssScanner.prototype.scanIdentifier = function () {
                    if (this.assertCondition(isIdentifierStart(this.peek, this.peekPeek), 'Expected identifier starting value')) {
                        return null;
                    }
                    var start = this.index;
                    var startingColumn = this.column;
                    while (isIdentifierPart(this.peek)) {
                        this.advance();
                    }
                    var strValue = this.input.substring(start, this.index);
                    return new CssToken(start, startingColumn, this.line, CssTokenType.Identifier, strValue);
                };
                CssScanner.prototype.scanCssValueFunction = function () {
                    var start = this.index;
                    var startingColumn = this.column;
                    while (this.peek != chars_1.$EOF && this.peek != chars_1.$RPAREN) {
                        this.advance();
                    }
                    var strValue = this.input.substring(start, this.index);
                    return new CssToken(start, startingColumn, this.line, CssTokenType.Identifier, strValue);
                };
                CssScanner.prototype.scanCharacter = function () {
                    var start = this.index;
                    var startingColumn = this.column;
                    if (this.assertCondition(isValidCssCharacter(this.peek, this._currentMode), charStr(this.peek) + ' is not a valid CSS character')) {
                        return null;
                    }
                    var c = this.input.substring(start, start + 1);
                    this.advance();
                    return new CssToken(start, startingColumn, this.line, CssTokenType.Character, c);
                };
                CssScanner.prototype.scanAtExpression = function () {
                    if (this.assertCondition(this.peek == chars_1.$AT, 'Expected @ value')) {
                        return null;
                    }
                    var start = this.index;
                    var startingColumn = this.column;
                    this.advance();
                    if (isIdentifierStart(this.peek, this.peekPeek)) {
                        var ident = this.scanIdentifier();
                        var strValue = '@' + ident.strValue;
                        return new CssToken(start, startingColumn, this.line, CssTokenType.AtKeyword, strValue);
                    }
                    else {
                        return this.scanCharacter();
                    }
                };
                CssScanner.prototype.assertCondition = function (status, errorMessage) {
                    if (!status) {
                        this.error(errorMessage);
                        return true;
                    }
                    return false;
                };
                CssScanner.prototype.error = function (message, errorTokenValue, doNotAdvance) {
                    if (errorTokenValue === void 0) { errorTokenValue = null; }
                    if (doNotAdvance === void 0) { doNotAdvance = false; }
                    var index = this.index;
                    var column = this.column;
                    var line = this.line;
                    errorTokenValue =
                        lang_1.isPresent(errorTokenValue) ? errorTokenValue : lang_1.StringWrapper.fromCharCode(this.peek);
                    var invalidToken = new CssToken(index, column, line, CssTokenType.Invalid, errorTokenValue);
                    var errorMessage = generateErrorMessage(this.input, message, errorTokenValue, index, line, column);
                    if (!doNotAdvance) {
                        this.advance();
                    }
                    this._currentError = new CssScannerError(invalidToken, errorMessage);
                    return invalidToken;
                };
                return CssScanner;
            }());
            exports_1("CssScanner", CssScanner);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9jc3MvbGV4ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQWdHQSw4QkFBcUMsS0FBYSxFQUFFLE9BQWUsRUFBRSxVQUFrQixFQUNsRCxLQUFhLEVBQUUsR0FBVyxFQUFFLE1BQWM7UUFDN0UsTUFBTSxDQUFDLENBQUcsT0FBTyxtQkFBYyxHQUFHLFNBQUksTUFBTSxzQkFBa0I7WUFDdkQsZUFBZSxDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUNqRSxDQUFDO0lBSkQsdURBSUMsQ0FBQTtJQUVELHlCQUFnQyxLQUFhLEVBQUUsVUFBa0IsRUFBRSxLQUFhLEVBQ2hELE1BQWM7UUFDNUMsSUFBSSxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyQyxPQUFPLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUMxQyxPQUFPLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDaEQsQ0FBQztRQUNELElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDekQsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDaEMsY0FBYyxJQUFJLEdBQUcsQ0FBQztRQUN4QixDQUFDO1FBQ0QsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMs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QjtvQkFDbEYsSUFBSSxLQUFLLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFDL0IsSUFBSSxNQUFNLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQztvQkFDakMsSUFBSSxJQUFJLEdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDN0IsZUFBZTt3QkFDWCxnQkFBUyxDQUFDLGVBQWUsQ0FBQyxHQUFHLGVBQWUsR0FBRyxvQkFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3pGLElBQUksWUFBWSxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7b0JBQzVGLElBQUksWUFBWSxHQUNaLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUNwRixFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7d0JBQ2xCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDakIsQ0FBQztvQkFDRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksZUFBZSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztvQkFDckUsTUFBTSxDQUFDLFlBQVksQ0FBQztnQkFDdEIsQ0FBQztnQkFDSCxpQkFBQztZQUFELENBM1dBLEFBMldDLElBQUE7WUEzV0QsbUNBMldDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL2Nzcy9sZXhlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TnVtYmVyV3JhcHBlciwgU3RyaW5nV3JhcHBlciwgaXNQcmVzZW50LCByZXNvbHZlRW51bVRva2VufSBmcm9tIFwiYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nXCI7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5cbmltcG9ydCB7XG4gIGlzV2hpdGVzcGFjZSxcbiAgJEVPRixcbiAgJEhBU0gsXG4gICRUSUxEQSxcbiAgJENBUkVULFxuICAkUEVSQ0VOVCxcbiAgJCQsXG4gICRfLFxuICAkQ09MT04sXG4gICRTUSxcbiAgJERRLFxuICAkRVEsXG4gICRTTEFTSCxcbiAgJEJBQ0tTTEFTSCxcbiAgJFBFUklPRCxcbiAgJFNUQVIsXG4gICRQTFVTLFxuICAkTFBBUkVOLFxuICAkUlBBUkVOLFxuICAkTEJSQUNFLFxuICAkUkJSQUNFLFxuICAkTEJSQUNLRVQsXG4gICRSQlJBQ0tFVCxcbiAgJFBJUEUsXG4gICRDT01NQSxcbiAgJFNFTUlDT0xPTixcbiAgJE1JTlVTLFxuICAkQkFORyxcbiAgJFFVRVNUSU9OLFxuICAkQVQsXG4gICRBTVBFUlNBTkQsXG4gICRHVCxcbiAgJGEsXG4gICRBLFxuICAkeixcbiAgJFosXG4gICQwLFxuICAkOSxcbiAgJEZGLFxuICAkQ1IsXG4gICRMRixcbiAgJFZUQUJcbn0gZnJvbSBcImFuZ3VsYXIyL3NyYy9jb21waWxlci9jaGFyc1wiO1xuXG5leHBvcnQge1xuICAkRU9GLFxuICAkQVQsXG4gICRSQlJBQ0UsXG4gICRMQlJBQ0UsXG4gICRMQlJBQ0tFVCxcbiAgJFJCUkFDS0VULFxuICAkTFBBUkVOLFxuICAkUlBBUkVOLFxuICAkQ09NTUEsXG4gICRDT0xPTixcbiAgJFNFTUlDT0xPTixcbiAgaXNXaGl0ZXNwYWNlXG59IGZyb20gXCJhbmd1bGFyMi9zcmMvY29tcGlsZXIvY2hhcnNcIjtcblxuZXhwb3J0IGVudW0gQ3NzVG9rZW5UeXBlIHtcbiAgRU9GLFxuICBTdHJpbmcsXG4gIENvbW1lbnQsXG4gIElkZW50aWZpZXIsXG4gIE51bWJlcixcbiAgSWRlbnRpZmllck9yTnVtYmVyLFxuICBBdEtleXdvcmQsXG4gIENoYXJhY3RlcixcbiAgV2hpdGVzcGFjZSxcbiAgSW52YWxpZFxufVxuXG5leHBvcnQgZW51bSBDc3NMZXhlck1vZGUge1xuICBBTEwsXG4gIEFMTF9UUkFDS19XUyxcbiAgU0VMRUNUT1IsXG4gIFBTRVVET19TRUxFQ1RPUixcbiAgQVRUUklCVVRFX1NFTEVDVE9SLFxuICBBVF9SVUxFX1FVRVJZLFxuICBNRURJQV9RVUVSWSxcbiAgQkxPQ0ssXG4gIEtFWUZSQU1FX0JMT0NLLFxuICBTVFlMRV9CTE9DSyxcbiAgU1RZTEVfVkFMVUUsXG4gIFNUWUxFX1ZBTFVFX0ZVTkNUSU9OLFxuICBTVFlMRV9DQUxDX0ZVTkNUSU9OXG59XG5cbmV4cG9ydCBjbGFzcyBMZXhlZENzc1Jlc3VsdCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlcnJvcjogQ3NzU2Nhbm5lckVycm9yLCBwdWJsaWMgdG9rZW46IENzc1Rva2VuKSB7fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVFcnJvck1lc3NhZ2UoaW5wdXQ6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBlcnJvclZhbHVlOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IG51bWJlciwgcm93OiBudW1iZXIsIGNvbHVtbjogbnVtYmVyKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAke21lc3NhZ2V9IGF0IGNvbHVtbiAke3Jvd306JHtjb2x1bW59IGluIGV4cHJlc3Npb24gW2AgK1xuICAgICAgICAgZmluZFByb2JsZW1Db2RlKGlucHV0LCBlcnJvclZhbHVlLCBpbmRleCwgY29sdW1uKSArICddJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRQcm9ibGVtQ29kZShpbnB1dDogc3RyaW5nLCBlcnJvclZhbHVlOiBzdHJpbmcsIGluZGV4OiBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbjogbnVtYmVyKTogc3RyaW5nIHtcbiAgdmFyIGVuZE9mUHJvYmxlbUxpbmUgPSBpbmRleDtcbiAgdmFyIGN1cnJlbnQgPSBjaGFyQ29kZShpbnB1dCwgaW5kZXgpO1xuICB3aGlsZSAoY3VycmVudCA+IDAgJiYgIWlzTmV3bGluZShjdXJyZW50KSkge1xuICAgIGN1cnJlbnQgPSBjaGFyQ29kZShpbnB1dCwgKytlbmRPZlByb2JsZW1MaW5lKTtcbiAgfVxuICB2YXIgY2hvcHBlZFN0cmluZyA9IGlucHV0LnN1YnN0cmluZygwLCBlbmRPZlByb2JsZW1MaW5lKTtcbiAgdmFyIHBvaW50ZXJQYWRkaW5nID0gXCJcIjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2x1bW47IGkrKykge1xuICAgIHBvaW50ZXJQYWRkaW5nICs9IFwiIFwiO1xuICB9XG4gIHZhciBwb2ludGVyU3RyaW5nID0gXCJcIjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBlcnJvclZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgcG9pbnRlclN0cmluZyArPSBcIl5cIjtcbiAgfVxuICByZXR1cm4gY2hvcHBlZFN0cmluZyArIFwiXFxuXCIgKyBwb2ludGVyUGFkZGluZyArIHBvaW50ZXJTdHJpbmcgKyBcIlxcblwiO1xufVxuXG5leHBvcnQgY2xhc3MgQ3NzVG9rZW4ge1xuICBudW1WYWx1ZTogbnVtYmVyO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgaW5kZXg6IG51bWJlciwgcHVibGljIGNvbHVtbjogbnVtYmVyLCBwdWJsaWMgbGluZTogbnVtYmVyLFxuICAgICAgICAgICAgICBwdWJsaWMgdHlwZTogQ3NzVG9rZW5UeXBlLCBwdWJsaWMgc3RyVmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMubnVtVmFsdWUgPSBjaGFyQ29kZShzdHJWYWx1ZSwgMCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENzc0xleGVyIHtcbiAgc2Nhbih0ZXh0OiBzdHJpbmcsIHRyYWNrQ29tbWVudHM6IGJvb2xlYW4gPSBmYWxzZSk6IENzc1NjYW5uZXIge1xuICAgIHJldHVybiBuZXcgQ3NzU2Nhbm5lcih0ZXh0LCB0cmFja0NvbW1lbnRzKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3NzU2Nhbm5lckVycm9yIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIHB1YmxpYyByYXdNZXNzYWdlOiBzdHJpbmc7XG4gIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHRva2VuOiBDc3NUb2tlbiwgbWVzc2FnZSkge1xuICAgIHN1cGVyKCdDc3MgUGFyc2UgRXJyb3I6ICcgKyBtZXNzYWdlKTtcbiAgICB0aGlzLnJhd01lc3NhZ2UgPSBtZXNzYWdlO1xuICB9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMubWVzc2FnZTsgfVxufVxuXG5mdW5jdGlvbiBfdHJhY2tXaGl0ZXNwYWNlKG1vZGU6IENzc0xleGVyTW9kZSkge1xuICBzd2l0Y2ggKG1vZGUpIHtcbiAgICBjYXNlIENzc0xleGVyTW9kZS5TRUxFQ1RPUjpcbiAgICBjYXNlIENzc0xleGVyTW9kZS5BTExfVFJBQ0tfV1M6XG4gICAgY2FzZSBDc3NMZXhlck1vZGUuU1RZTEVfVkFMVUU6XG4gICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENzc1NjYW5uZXIge1xuICBwZWVrOiBudW1iZXI7XG4gIHBlZWtQZWVrOiBudW1iZXI7XG4gIGxlbmd0aDogbnVtYmVyID0gMDtcbiAgaW5kZXg6IG51bWJlciA9IC0xO1xuICBjb2x1bW46IG51bWJlciA9IC0xO1xuICBsaW5lOiBudW1iZXIgPSAwO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2N1cnJlbnRNb2RlOiBDc3NMZXhlck1vZGUgPSBDc3NMZXhlck1vZGUuQkxPQ0s7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2N1cnJlbnRFcnJvcjogQ3NzU2Nhbm5lckVycm9yID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaW5wdXQ6IHN0cmluZywgcHJpdmF0ZSBfdHJhY2tDb21tZW50czogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgdGhpcy5sZW5ndGggPSB0aGlzLmlucHV0Lmxlbmd0aDtcbiAgICB0aGlzLnBlZWtQZWVrID0gdGhpcy5wZWVrQXQoMCk7XG4gICAgdGhpcy5hZHZhbmNlKCk7XG4gIH1cblxuICBnZXRNb2RlKCk6IENzc0xleGVyTW9kZSB7IHJldHVybiB0aGlzLl9jdXJyZW50TW9kZTsgfVxuXG4gIHNldE1vZGUobW9kZTogQ3NzTGV4ZXJNb2RlKSB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRNb2RlICE9IG1vZGUpIHtcbiAgICAgIGlmIChfdHJhY2tXaGl0ZXNwYWNlKHRoaXMuX2N1cnJlbnRNb2RlKSkge1xuICAgICAgICB0aGlzLmNvbnN1bWVXaGl0ZXNwYWNlKCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9jdXJyZW50TW9kZSA9IG1vZGU7XG4gICAgfVxuICB9XG5cbiAgYWR2YW5jZSgpOiB2b2lkIHtcbiAgICBpZiAoaXNOZXdsaW5lKHRoaXMucGVlaykpIHtcbiAgICAgIHRoaXMuY29sdW1uID0gMDtcbiAgICAgIHRoaXMubGluZSsrO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbHVtbisrO1xuICAgIH1cblxuICAgIHRoaXMuaW5kZXgrKztcbiAgICB0aGlzLnBlZWsgPSB0aGlzLnBlZWtQZWVrO1xuICAgIHRoaXMucGVla1BlZWsgPSB0aGlzLnBlZWtBdCh0aGlzLmluZGV4ICsgMSk7XG4gIH1cblxuICBwZWVrQXQoaW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIGluZGV4ID49IHRoaXMubGVuZ3RoID8gJEVPRiA6IFN0cmluZ1dyYXBwZXIuY2hhckNvZGVBdCh0aGlzLmlucHV0LCBpbmRleCk7XG4gIH1cblxuICBjb25zdW1lRW1wdHlTdGF0ZW1lbnRzKCk6IHZvaWQge1xuICAgIHRoaXMuY29uc3VtZVdoaXRlc3BhY2UoKTtcbiAgICB3aGlsZSAodGhpcy5wZWVrID09ICRTRU1JQ09MT04pIHtcbiAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgICAgdGhpcy5jb25zdW1lV2hpdGVzcGFjZSgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN1bWVXaGl0ZXNwYWNlKCk6IHZvaWQge1xuICAgIHdoaWxlIChpc1doaXRlc3BhY2UodGhpcy5wZWVrKSB8fCBpc05ld2xpbmUodGhpcy5wZWVrKSkge1xuICAgICAgdGhpcy5hZHZhbmNlKCk7XG4gICAgICBpZiAoIXRoaXMuX3RyYWNrQ29tbWVudHMgJiYgaXNDb21tZW50U3RhcnQodGhpcy5wZWVrLCB0aGlzLnBlZWtQZWVrKSkge1xuICAgICAgICB0aGlzLmFkdmFuY2UoKTsgIC8vIC9cbiAgICAgICAgdGhpcy5hZHZhbmNlKCk7ICAvLyAqXG4gICAgICAgIHdoaWxlICghaXNDb21tZW50RW5kKHRoaXMucGVlaywgdGhpcy5wZWVrUGVlaykpIHtcbiAgICAgICAgICBpZiAodGhpcy5wZWVrID09ICRFT0YpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IoJ1VudGVybWluYXRlZCBjb21tZW50Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWR2YW5jZSgpOyAgLy8gKlxuICAgICAgICB0aGlzLmFkdmFuY2UoKTsgIC8vIC9cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdW1lKHR5cGU6IENzc1Rva2VuVHlwZSwgdmFsdWU6IHN0cmluZyA9IG51bGwpOiBMZXhlZENzc1Jlc3VsdCB7XG4gICAgdmFyIG1vZGUgPSB0aGlzLl9jdXJyZW50TW9kZTtcbiAgICB0aGlzLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLkFMTCk7XG5cbiAgICB2YXIgcHJldmlvdXNJbmRleCA9IHRoaXMuaW5kZXg7XG4gICAgdmFyIHByZXZpb3VzTGluZSA9IHRoaXMubGluZTtcbiAgICB2YXIgcHJldmlvdXNDb2x1bW4gPSB0aGlzLmNvbHVtbjtcblxuICAgIHZhciBvdXRwdXQgPSB0aGlzLnNjYW4oKTtcblxuICAgIC8vIGp1c3QgaW5jYXNlIHRoZSBpbm5lciBzY2FuIG1ldGhvZCByZXR1cm5lZCBhbiBlcnJvclxuICAgIGlmIChpc1ByZXNlbnQob3V0cHV0LmVycm9yKSkge1xuICAgICAgdGhpcy5zZXRNb2RlKG1vZGUpO1xuICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG5cbiAgICB2YXIgbmV4dCA9IG91dHB1dC50b2tlbjtcbiAgICBpZiAoIWlzUHJlc2VudChuZXh0KSkge1xuICAgICAgbmV4dCA9IG5ldyBDc3NUb2tlbigwLCAwLCAwLCBDc3NUb2tlblR5cGUuRU9GLCBcImVuZCBvZiBmaWxlXCIpO1xuICAgIH1cblxuICAgIHZhciBpc01hdGNoaW5nVHlwZTtcbiAgICBpZiAodHlwZSA9PSBDc3NUb2tlblR5cGUuSWRlbnRpZmllck9yTnVtYmVyKSB7XG4gICAgICAvLyBUT0RPIChtYXRza28pOiBpbXBsZW1lbnQgYXJyYXkgdHJhdmVyc2FsIGZvciBsb29rdXAgaGVyZVxuICAgICAgaXNNYXRjaGluZ1R5cGUgPSBuZXh0LnR5cGUgPT0gQ3NzVG9rZW5UeXBlLk51bWJlciB8fCBuZXh0LnR5cGUgPT0gQ3NzVG9rZW5UeXBlLklkZW50aWZpZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlzTWF0Y2hpbmdUeXBlID0gbmV4dC50eXBlID09IHR5cGU7XG4gICAgfVxuXG4gICAgLy8gYmVmb3JlIHRocm93aW5nIHRoZSBlcnJvciB3ZSBuZWVkIHRvIGJyaW5nIGJhY2sgdGhlIGZvcm1lclxuICAgIC8vIG1vZGUgc28gdGhhdCB0aGUgcGFyc2VyIGNhbiByZWNvdmVyLi4uXG4gICAgdGhpcy5zZXRNb2RlKG1vZGUpO1xuXG4gICAgdmFyIGVycm9yID0gbnVsbDtcbiAgICBpZiAoIWlzTWF0Y2hpbmdUeXBlIHx8IChpc1ByZXNlbnQodmFsdWUpICYmIHZhbHVlICE9IG5leHQuc3RyVmFsdWUpKSB7XG4gICAgICB2YXIgZXJyb3JNZXNzYWdlID0gcmVzb2x2ZUVudW1Ub2tlbihDc3NUb2tlblR5cGUsIG5leHQudHlwZSkgKyBcIiBkb2VzIG5vdCBtYXRjaCBleHBlY3RlZCBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZUVudW1Ub2tlbihDc3NUb2tlblR5cGUsIHR5cGUpICsgXCIgdmFsdWVcIjtcblxuICAgICAgaWYgKGlzUHJlc2VudCh2YWx1ZSkpIHtcbiAgICAgICAgZXJyb3JNZXNzYWdlICs9ICcgKFwiJyArIG5leHQuc3RyVmFsdWUgKyAnXCIgc2hvdWxkIG1hdGNoIFwiJyArIHZhbHVlICsgJ1wiKSc7XG4gICAgICB9XG5cbiAgICAgIGVycm9yID0gbmV3IENzc1NjYW5uZXJFcnJvcihcbiAgICAgICAgICBuZXh0LCBnZW5lcmF0ZUVycm9yTWVzc2FnZSh0aGlzLmlucHV0LCBlcnJvck1lc3NhZ2UsIG5leHQuc3RyVmFsdWUsIHByZXZpb3VzSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNMaW5lLCBwcmV2aW91c0NvbHVtbikpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgTGV4ZWRDc3NSZXN1bHQoZXJyb3IsIG5leHQpO1xuICB9XG5cblxuICBzY2FuKCk6IExleGVkQ3NzUmVzdWx0IHtcbiAgICB2YXIgdHJhY2tXUyA9IF90cmFja1doaXRlc3BhY2UodGhpcy5fY3VycmVudE1vZGUpO1xuICAgIGlmICh0aGlzLmluZGV4ID09IDAgJiYgIXRyYWNrV1MpIHsgIC8vIGZpcnN0IHNjYW5cbiAgICAgIHRoaXMuY29uc3VtZVdoaXRlc3BhY2UoKTtcbiAgICB9XG5cbiAgICB2YXIgdG9rZW4gPSB0aGlzLl9zY2FuKCk7XG4gICAgaWYgKHRva2VuID09IG51bGwpIHJldHVybiBudWxsO1xuXG4gICAgdmFyIGVycm9yID0gdGhpcy5fY3VycmVudEVycm9yO1xuICAgIHRoaXMuX2N1cnJlbnRFcnJvciA9IG51bGw7XG5cbiAgICBpZiAoIXRyYWNrV1MpIHtcbiAgICAgIHRoaXMuY29uc3VtZVdoaXRlc3BhY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBMZXhlZENzc1Jlc3VsdChlcnJvciwgdG9rZW4pO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc2NhbigpOiBDc3NUb2tlbiB7XG4gICAgdmFyIHBlZWsgPSB0aGlzLnBlZWs7XG4gICAgdmFyIHBlZWtQZWVrID0gdGhpcy5wZWVrUGVlaztcbiAgICBpZiAocGVlayA9PSAkRU9GKSByZXR1cm4gbnVsbDtcblxuICAgIGlmIChpc0NvbW1lbnRTdGFydChwZWVrLCBwZWVrUGVlaykpIHtcbiAgICAgIC8vIGV2ZW4gaWYgY29tbWVudHMgYXJlIG5vdCB0cmFja2VkIHdlIHN0aWxsIGxleCB0aGVcbiAgICAgIC8vIGNvbW1lbnQgc28gd2UgY2FuIG1vdmUgdGhlIHBvaW50ZXIgZm9yd2FyZFxuICAgICAgdmFyIGNvbW1lbnRUb2tlbiA9IHRoaXMuc2NhbkNvbW1lbnQoKTtcbiAgICAgIGlmICh0aGlzLl90cmFja0NvbW1lbnRzKSB7XG4gICAgICAgIHJldHVybiBjb21tZW50VG9rZW47XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKF90cmFja1doaXRlc3BhY2UodGhpcy5fY3VycmVudE1vZGUpICYmIChpc1doaXRlc3BhY2UocGVlaykgfHwgaXNOZXdsaW5lKHBlZWspKSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2NhbldoaXRlc3BhY2UoKTtcbiAgICB9XG5cbiAgICBwZWVrID0gdGhpcy5wZWVrO1xuICAgIHBlZWtQZWVrID0gdGhpcy5wZWVrUGVlaztcbiAgICBpZiAocGVlayA9PSAkRU9GKSByZXR1cm4gbnVsbDtcblxuICAgIGlmIChpc1N0cmluZ1N0YXJ0KHBlZWssIHBlZWtQZWVrKSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2NhblN0cmluZygpO1xuICAgIH1cblxuICAgIC8vIHNvbWV0aGluZyBsaWtlIHVybChjb29sKVxuICAgIGlmICh0aGlzLl9jdXJyZW50TW9kZSA9PSBDc3NMZXhlck1vZGUuU1RZTEVfVkFMVUVfRlVOQ1RJT04pIHtcbiAgICAgIHJldHVybiB0aGlzLnNjYW5Dc3NWYWx1ZUZ1bmN0aW9uKCk7XG4gICAgfVxuXG4gICAgdmFyIGlzTW9kaWZpZXIgPSBwZWVrID09ICRQTFVTIHx8IHBlZWsgPT0gJE1JTlVTO1xuICAgIHZhciBkaWdpdEEgPSBpc01vZGlmaWVyID8gZmFsc2UgOiBpc0RpZ2l0KHBlZWspO1xuICAgIHZhciBkaWdpdEIgPSBpc0RpZ2l0KHBlZWtQZWVrKTtcbiAgICBpZiAoZGlnaXRBIHx8IChpc01vZGlmaWVyICYmIChwZWVrUGVlayA9PSAkUEVSSU9EIHx8IGRpZ2l0QikpIHx8IChwZWVrID09ICRQRVJJT0QgJiYgZGlnaXRCKSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2Nhbk51bWJlcigpO1xuICAgIH1cblxuICAgIGlmIChwZWVrID09ICRBVCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2NhbkF0RXhwcmVzc2lvbigpO1xuICAgIH1cblxuICAgIGlmIChpc0lkZW50aWZpZXJTdGFydChwZWVrLCBwZWVrUGVlaykpIHtcbiAgICAgIHJldHVybiB0aGlzLnNjYW5JZGVudGlmaWVyKCk7XG4gICAgfVxuXG4gICAgaWYgKGlzVmFsaWRDc3NDaGFyYWN0ZXIocGVlaywgdGhpcy5fY3VycmVudE1vZGUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5zY2FuQ2hhcmFjdGVyKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZXJyb3IoYFVuZXhwZWN0ZWQgY2hhcmFjdGVyIFske1N0cmluZ1dyYXBwZXIuZnJvbUNoYXJDb2RlKHBlZWspfV1gKTtcbiAgfVxuXG4gIHNjYW5Db21tZW50KCk6IENzc1Rva2VuIHtcbiAgICBpZiAodGhpcy5hc3NlcnRDb25kaXRpb24oaXNDb21tZW50U3RhcnQodGhpcy5wZWVrLCB0aGlzLnBlZWtQZWVrKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJFeHBlY3RlZCBjb21tZW50IHN0YXJ0IHZhbHVlXCIpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgc3RhcnQgPSB0aGlzLmluZGV4O1xuICAgIHZhciBzdGFydGluZ0NvbHVtbiA9IHRoaXMuY29sdW1uO1xuICAgIHZhciBzdGFydGluZ0xpbmUgPSB0aGlzLmxpbmU7XG5cbiAgICB0aGlzLmFkdmFuY2UoKTsgIC8vIC9cbiAgICB0aGlzLmFkdmFuY2UoKTsgIC8vICpcblxuICAgIHdoaWxlICghaXNDb21tZW50RW5kKHRoaXMucGVlaywgdGhpcy5wZWVrUGVlaykpIHtcbiAgICAgIGlmICh0aGlzLnBlZWsgPT0gJEVPRikge1xuICAgICAgICB0aGlzLmVycm9yKCdVbnRlcm1pbmF0ZWQgY29tbWVudCcpO1xuICAgICAgfVxuICAgICAgdGhpcy5hZHZhbmNlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5hZHZhbmNlKCk7ICAvLyAqXG4gICAgdGhpcy5hZHZhbmNlKCk7ICAvLyAvXG5cbiAgICB2YXIgc3RyID0gdGhpcy5pbnB1dC5zdWJzdHJpbmcoc3RhcnQsIHRoaXMuaW5kZXgpO1xuICAgIHJldHVybiBuZXcgQ3NzVG9rZW4oc3RhcnQsIHN0YXJ0aW5nQ29sdW1uLCBzdGFydGluZ0xpbmUsIENzc1Rva2VuVHlwZS5Db21tZW50LCBzdHIpO1xuICB9XG5cbiAgc2NhbldoaXRlc3BhY2UoKTogQ3NzVG9rZW4ge1xuICAgIHZhciBzdGFydCA9IHRoaXMuaW5kZXg7XG4gICAgdmFyIHN0YXJ0aW5nQ29sdW1uID0gdGhpcy5jb2x1bW47XG4gICAgdmFyIHN0YXJ0aW5nTGluZSA9IHRoaXMubGluZTtcbiAgICB3aGlsZSAoaXNXaGl0ZXNwYWNlKHRoaXMucGVlaykgJiYgdGhpcy5wZWVrICE9ICRFT0YpIHtcbiAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgIH1cbiAgICB2YXIgc3RyID0gdGhpcy5pbnB1dC5zdWJzdHJpbmcoc3RhcnQsIHRoaXMuaW5kZXgpO1xuICAgIHJldHVybiBuZXcgQ3NzVG9rZW4oc3RhcnQsIHN0YXJ0aW5nQ29sdW1uLCBzdGFydGluZ0xpbmUsIENzc1Rva2VuVHlwZS5XaGl0ZXNwYWNlLCBzdHIpO1xuICB9XG5cbiAgc2NhblN0cmluZygpOiBDc3NUb2tlbiB7XG4gICAgaWYgKHRoaXMuYXNzZXJ0Q29uZGl0aW9uKGlzU3RyaW5nU3RhcnQodGhpcy5wZWVrLCB0aGlzLnBlZWtQZWVrKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVbmV4cGVjdGVkIG5vbi1zdHJpbmcgc3RhcnRpbmcgdmFsdWVcIikpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciB0YXJnZXQgPSB0aGlzLnBlZWs7XG4gICAgdmFyIHN0YXJ0ID0gdGhpcy5pbmRleDtcbiAgICB2YXIgc3RhcnRpbmdDb2x1bW4gPSB0aGlzLmNvbHVtbjtcbiAgICB2YXIgc3RhcnRpbmdMaW5lID0gdGhpcy5saW5lO1xuICAgIHZhciBwcmV2aW91cyA9IHRhcmdldDtcbiAgICB0aGlzLmFkdmFuY2UoKTtcblxuICAgIHdoaWxlICghaXNDaGFyTWF0Y2godGFyZ2V0LCBwcmV2aW91cywgdGhpcy5wZWVrKSkge1xuICAgICAgaWYgKHRoaXMucGVlayA9PSAkRU9GIHx8IGlzTmV3bGluZSh0aGlzLnBlZWspKSB7XG4gICAgICAgIHRoaXMuZXJyb3IoJ1VudGVybWluYXRlZCBxdW90ZScpO1xuICAgICAgfVxuICAgICAgcHJldmlvdXMgPSB0aGlzLnBlZWs7XG4gICAgICB0aGlzLmFkdmFuY2UoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5hc3NlcnRDb25kaXRpb24odGhpcy5wZWVrID09IHRhcmdldCwgXCJVbnRlcm1pbmF0ZWQgcXVvdGVcIikpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB0aGlzLmFkdmFuY2UoKTtcblxuICAgIHZhciBzdHIgPSB0aGlzLmlucHV0LnN1YnN0cmluZyhzdGFydCwgdGhpcy5pbmRleCk7XG4gICAgcmV0dXJuIG5ldyBDc3NUb2tlbihzdGFydCwgc3RhcnRpbmdDb2x1bW4sIHN0YXJ0aW5nTGluZSwgQ3NzVG9rZW5UeXBlLlN0cmluZywgc3RyKTtcbiAgfVxuXG4gIHNjYW5OdW1iZXIoKTogQ3NzVG9rZW4ge1xuICAgIHZhciBzdGFydCA9IHRoaXMuaW5kZXg7XG4gICAgdmFyIHN0YXJ0aW5nQ29sdW1uID0gdGhpcy5jb2x1bW47XG4gICAgaWYgKHRoaXMucGVlayA9PSAkUExVUyB8fCB0aGlzLnBlZWsgPT0gJE1JTlVTKSB7XG4gICAgICB0aGlzLmFkdmFuY2UoKTtcbiAgICB9XG4gICAgdmFyIHBlcmlvZFVzZWQgPSBmYWxzZTtcbiAgICB3aGlsZSAoaXNEaWdpdCh0aGlzLnBlZWspIHx8IHRoaXMucGVlayA9PSAkUEVSSU9EKSB7XG4gICAgICBpZiAodGhpcy5wZWVrID09ICRQRVJJT0QpIHtcbiAgICAgICAgaWYgKHBlcmlvZFVzZWQpIHtcbiAgICAgICAgICB0aGlzLmVycm9yKCdVbmV4cGVjdGVkIHVzZSBvZiBhIHNlY29uZCBwZXJpb2QgdmFsdWUnKTtcbiAgICAgICAgfVxuICAgICAgICBwZXJpb2RVc2VkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgIH1cbiAgICB2YXIgc3RyVmFsdWUgPSB0aGlzLmlucHV0LnN1YnN0cmluZyhzdGFydCwgdGhpcy5pbmRleCk7XG4gICAgcmV0dXJuIG5ldyBDc3NUb2tlbihzdGFydCwgc3RhcnRpbmdDb2x1bW4sIHRoaXMubGluZSwgQ3NzVG9rZW5UeXBlLk51bWJlciwgc3RyVmFsdWUpO1xuICB9XG5cbiAgc2NhbklkZW50aWZpZXIoKTogQ3NzVG9rZW4ge1xuICAgIGlmICh0aGlzLmFzc2VydENvbmRpdGlvbihpc0lkZW50aWZpZXJTdGFydCh0aGlzLnBlZWssIHRoaXMucGVla1BlZWspLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRXhwZWN0ZWQgaWRlbnRpZmllciBzdGFydGluZyB2YWx1ZScpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgc3RhcnQgPSB0aGlzLmluZGV4O1xuICAgIHZhciBzdGFydGluZ0NvbHVtbiA9IHRoaXMuY29sdW1uO1xuICAgIHdoaWxlIChpc0lkZW50aWZpZXJQYXJ0KHRoaXMucGVlaykpIHtcbiAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgIH1cbiAgICB2YXIgc3RyVmFsdWUgPSB0aGlzLmlucHV0LnN1YnN0cmluZyhzdGFydCwgdGhpcy5pbmRleCk7XG4gICAgcmV0dXJuIG5ldyBDc3NUb2tlbihzdGFydCwgc3RhcnRpbmdDb2x1bW4sIHRoaXMubGluZSwgQ3NzVG9rZW5UeXBlLklkZW50aWZpZXIsIHN0clZhbHVlKTtcbiAgfVxuXG4gIHNjYW5Dc3NWYWx1ZUZ1bmN0aW9uKCk6IENzc1Rva2VuIHtcbiAgICB2YXIgc3RhcnQgPSB0aGlzLmluZGV4O1xuICAgIHZhciBzdGFydGluZ0NvbHVtbiA9IHRoaXMuY29sdW1uO1xuICAgIHdoaWxlICh0aGlzLnBlZWsgIT0gJEVPRiAmJiB0aGlzLnBlZWsgIT0gJFJQQVJFTikge1xuICAgICAgdGhpcy5hZHZhbmNlKCk7XG4gICAgfVxuICAgIHZhciBzdHJWYWx1ZSA9IHRoaXMuaW5wdXQuc3Vic3RyaW5nKHN0YXJ0LCB0aGlzLmluZGV4KTtcbiAgICByZXR1cm4gbmV3IENzc1Rva2VuKHN0YXJ0LCBzdGFydGluZ0NvbHVtbiwgdGhpcy5saW5lLCBDc3NUb2tlblR5cGUuSWRlbnRpZmllciwgc3RyVmFsdWUpO1xuICB9XG5cbiAgc2NhbkNoYXJhY3RlcigpOiBDc3NUb2tlbiB7XG4gICAgdmFyIHN0YXJ0ID0gdGhpcy5pbmRleDtcbiAgICB2YXIgc3RhcnRpbmdDb2x1bW4gPSB0aGlzLmNvbHVtbjtcbiAgICBpZiAodGhpcy5hc3NlcnRDb25kaXRpb24oaXNWYWxpZENzc0NoYXJhY3Rlcih0aGlzLnBlZWssIHRoaXMuX2N1cnJlbnRNb2RlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhclN0cih0aGlzLnBlZWspICsgJyBpcyBub3QgYSB2YWxpZCBDU1MgY2hhcmFjdGVyJykpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBjID0gdGhpcy5pbnB1dC5zdWJzdHJpbmcoc3RhcnQsIHN0YXJ0ICsgMSk7XG4gICAgdGhpcy5hZHZhbmNlKCk7XG5cbiAgICByZXR1cm4gbmV3IENzc1Rva2VuKHN0YXJ0LCBzdGFydGluZ0NvbHVtbiwgdGhpcy5saW5lLCBDc3NUb2tlblR5cGUuQ2hhcmFjdGVyLCBjKTtcbiAgfVxuXG4gIHNjYW5BdEV4cHJlc3Npb24oKTogQ3NzVG9rZW4ge1xuICAgIGlmICh0aGlzLmFzc2VydENvbmRpdGlvbih0aGlzLnBlZWsgPT0gJEFULCAnRXhwZWN0ZWQgQCB2YWx1ZScpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgc3RhcnQgPSB0aGlzLmluZGV4O1xuICAgIHZhciBzdGFydGluZ0NvbHVtbiA9IHRoaXMuY29sdW1uO1xuICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgIGlmIChpc0lkZW50aWZpZXJTdGFydCh0aGlzLnBlZWssIHRoaXMucGVla1BlZWspKSB7XG4gICAgICB2YXIgaWRlbnQgPSB0aGlzLnNjYW5JZGVudGlmaWVyKCk7XG4gICAgICB2YXIgc3RyVmFsdWUgPSAnQCcgKyBpZGVudC5zdHJWYWx1ZTtcbiAgICAgIHJldHVybiBuZXcgQ3NzVG9rZW4oc3RhcnQsIHN0YXJ0aW5nQ29sdW1uLCB0aGlzLmxpbmUsIENzc1Rva2VuVHlwZS5BdEtleXdvcmQsIHN0clZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuc2NhbkNoYXJhY3RlcigpO1xuICAgIH1cbiAgfVxuXG4gIGFzc2VydENvbmRpdGlvbihzdGF0dXM6IGJvb2xlYW4sIGVycm9yTWVzc2FnZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKCFzdGF0dXMpIHtcbiAgICAgIHRoaXMuZXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBlcnJvcihtZXNzYWdlOiBzdHJpbmcsIGVycm9yVG9rZW5WYWx1ZTogc3RyaW5nID0gbnVsbCwgZG9Ob3RBZHZhbmNlOiBib29sZWFuID0gZmFsc2UpOiBDc3NUb2tlbiB7XG4gICAgdmFyIGluZGV4OiBudW1iZXIgPSB0aGlzLmluZGV4O1xuICAgIHZhciBjb2x1bW46IG51bWJlciA9IHRoaXMuY29sdW1uO1xuICAgIHZhciBsaW5lOiBudW1iZXIgPSB0aGlzLmxpbmU7XG4gICAgZXJyb3JUb2tlblZhbHVlID1cbiAgICAgICAgaXNQcmVzZW50KGVycm9yVG9rZW5WYWx1ZSkgPyBlcnJvclRva2VuVmFsdWUgOiBTdHJpbmdXcmFwcGVyLmZyb21DaGFyQ29kZSh0aGlzLnBlZWspO1xuICAgIHZhciBpbnZhbGlkVG9rZW4gPSBuZXcgQ3NzVG9rZW4oaW5kZXgsIGNvbHVtbiwgbGluZSwgQ3NzVG9rZW5UeXBlLkludmFsaWQsIGVycm9yVG9rZW5WYWx1ZSk7XG4gICAgdmFyIGVycm9yTWVzc2FnZSA9XG4gICAgICAgIGdlbmVyYXRlRXJyb3JNZXNzYWdlKHRoaXMuaW5wdXQsIG1lc3NhZ2UsIGVycm9yVG9rZW5WYWx1ZSwgaW5kZXgsIGxpbmUsIGNvbHVtbik7XG4gICAgaWYgKCFkb05vdEFkdmFuY2UpIHtcbiAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgIH1cbiAgICB0aGlzLl9jdXJyZW50RXJyb3IgPSBuZXcgQ3NzU2Nhbm5lckVycm9yKGludmFsaWRUb2tlbiwgZXJyb3JNZXNzYWdlKTtcbiAgICByZXR1cm4gaW52YWxpZFRva2VuO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzQXRLZXl3b3JkKGN1cnJlbnQ6IENzc1Rva2VuLCBuZXh0OiBDc3NUb2tlbik6IGJvb2xlYW4ge1xuICByZXR1cm4gY3VycmVudC5udW1WYWx1ZSA9PSAkQVQgJiYgbmV4dC50eXBlID09IENzc1Rva2VuVHlwZS5JZGVudGlmaWVyO1xufVxuXG5mdW5jdGlvbiBpc0NoYXJNYXRjaCh0YXJnZXQ6IG51bWJlciwgcHJldmlvdXM6IG51bWJlciwgY29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiBjb2RlID09IHRhcmdldCAmJiBwcmV2aW91cyAhPSAkQkFDS1NMQVNIO1xufVxuXG5mdW5jdGlvbiBpc0RpZ2l0KGNvZGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICByZXR1cm4gJDAgPD0gY29kZSAmJiBjb2RlIDw9ICQ5O1xufVxuXG5mdW5jdGlvbiBpc0NvbW1lbnRTdGFydChjb2RlOiBudW1iZXIsIG5leHQ6IG51bWJlcik6IGJvb2xlYW4ge1xuICByZXR1cm4gY29kZSA9PSAkU0xBU0ggJiYgbmV4dCA9PSAkU1RBUjtcbn1cblxuZnVuY3Rpb24gaXNDb21tZW50RW5kKGNvZGU6IG51bWJlciwgbmV4dDogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiBjb2RlID09ICRTVEFSICYmIG5leHQgPT0gJFNMQVNIO1xufVxuXG5mdW5jdGlvbiBpc1N0cmluZ1N0YXJ0KGNvZGU6IG51bWJlciwgbmV4dDogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHZhciB0YXJnZXQgPSBjb2RlO1xuICBpZiAodGFyZ2V0ID09ICRCQUNLU0xBU0gpIHtcbiAgICB0YXJnZXQgPSBuZXh0O1xuICB9XG4gIHJldHVybiB0YXJnZXQgPT0gJERRIHx8IHRhcmdldCA9PSAkU1E7XG59XG5cbmZ1bmN0aW9uIGlzSWRlbnRpZmllclN0YXJ0KGNvZGU6IG51bWJlciwgbmV4dDogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHZhciB0YXJnZXQgPSBjb2RlO1xuICBpZiAodGFyZ2V0ID09ICRNSU5VUykge1xuICAgIHRhcmdldCA9IG5leHQ7XG4gIH1cblxuICByZXR1cm4gKCRhIDw9IHRhcmdldCAmJiB0YXJnZXQgPD0gJHopIHx8ICgkQSA8PSB0YXJnZXQgJiYgdGFyZ2V0IDw9ICRaKSB8fCB0YXJnZXQgPT0gJEJBQ0tTTEFTSCB8fFxuICAgICAgICAgdGFyZ2V0ID09ICRNSU5VUyB8fCB0YXJnZXQgPT0gJF87XG59XG5cbmZ1bmN0aW9uIGlzSWRlbnRpZmllclBhcnQodGFyZ2V0OiBudW1iZXIpOiBib29sZWFuIHtcbiAgcmV0dXJuICgkYSA8PSB0YXJnZXQgJiYgdGFyZ2V0IDw9ICR6KSB8fCAoJEEgPD0gdGFyZ2V0ICYmIHRhcmdldCA8PSAkWikgfHwgdGFyZ2V0ID09ICRCQUNLU0xBU0ggfHxcbiAgICAgICAgIHRhcmdldCA9PSAkTUlOVVMgfHwgdGFyZ2V0ID09ICRfIHx8IGlzRGlnaXQodGFyZ2V0KTtcbn1cblxuZnVuY3Rpb24gaXNWYWxpZFBzZXVkb1NlbGVjdG9yQ2hhcmFjdGVyKGNvZGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICBzd2l0Y2ggKGNvZGUpIHtcbiAgICBjYXNlICRMUEFSRU46XG4gICAgY2FzZSAkUlBBUkVOOlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc1ZhbGlkS2V5ZnJhbWVCbG9ja0NoYXJhY3Rlcihjb2RlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgcmV0dXJuIGNvZGUgPT0gJFBFUkNFTlQ7XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWRBdHRyaWJ1dGVTZWxlY3RvckNoYXJhY3Rlcihjb2RlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgLy8gdmFsdWVeKnwkfj1zb21ldGhpbmdcbiAgc3dpdGNoIChjb2RlKSB7XG4gICAgY2FzZSAkJDpcbiAgICBjYXNlICRQSVBFOlxuICAgIGNhc2UgJENBUkVUOlxuICAgIGNhc2UgJFRJTERBOlxuICAgIGNhc2UgJFNUQVI6XG4gICAgY2FzZSAkRVE6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWRTZWxlY3RvckNoYXJhY3Rlcihjb2RlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgLy8gc2VsZWN0b3IgWyBrZXkgICA9IHZhbHVlIF1cbiAgLy8gSURFTlQgICAgQyBJREVOVCBDIElERU5UIENcbiAgLy8gI2lkLCAuY2xhc3MsICorfj5cbiAgLy8gdGFnOlBTRVVET1xuICBzd2l0Y2ggKGNvZGUpIHtcbiAgICBjYXNlICRIQVNIOlxuICAgIGNhc2UgJFBFUklPRDpcbiAgICBjYXNlICRUSUxEQTpcbiAgICBjYXNlICRTVEFSOlxuICAgIGNhc2UgJFBMVVM6XG4gICAgY2FzZSAkR1Q6XG4gICAgY2FzZSAkQ09MT046XG4gICAgY2FzZSAkUElQRTpcbiAgICBjYXNlICRDT01NQTpcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNWYWxpZFN0eWxlQmxvY2tDaGFyYWN0ZXIoY29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gIC8vIGtleTp2YWx1ZTtcbiAgLy8ga2V5OmNhbGMoc29tZXRoaW5nIC4uLiApXG4gIHN3aXRjaCAoY29kZSkge1xuICAgIGNhc2UgJEhBU0g6XG4gICAgY2FzZSAkU0VNSUNPTE9OOlxuICAgIGNhc2UgJENPTE9OOlxuICAgIGNhc2UgJFBFUkNFTlQ6XG4gICAgY2FzZSAkU0xBU0g6XG4gICAgY2FzZSAkQkFDS1NMQVNIOlxuICAgIGNhc2UgJEJBTkc6XG4gICAgY2FzZSAkUEVSSU9EOlxuICAgIGNhc2UgJExQQVJFTjpcbiAgICBjYXNlICRSUEFSRU46XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWRNZWRpYVF1ZXJ5UnVsZUNoYXJhY3Rlcihjb2RlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgLy8gKG1pbi13aWR0aDogNy41ZW0pIGFuZCAob3JpZW50YXRpb246IGxhbmRzY2FwZSlcbiAgc3dpdGNoIChjb2RlKSB7XG4gICAgY2FzZSAkTFBBUkVOOlxuICAgIGNhc2UgJFJQQVJFTjpcbiAgICBjYXNlICRDT0xPTjpcbiAgICBjYXNlICRQRVJDRU5UOlxuICAgIGNhc2UgJFBFUklPRDpcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNWYWxpZEF0UnVsZUNoYXJhY3Rlcihjb2RlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgLy8gQGRvY3VtZW50IHVybChodHRwOi8vd3d3LnczLm9yZy9wYWdlP3NvbWV0aGluZz1vbiNoYXNoKSxcbiAgc3dpdGNoIChjb2RlKSB7XG4gICAgY2FzZSAkTFBBUkVOOlxuICAgIGNhc2UgJFJQQVJFTjpcbiAgICBjYXNlICRDT0xPTjpcbiAgICBjYXNlICRQRVJDRU5UOlxuICAgIGNhc2UgJFBFUklPRDpcbiAgICBjYXNlICRTTEFTSDpcbiAgICBjYXNlICRCQUNLU0xBU0g6XG4gICAgY2FzZSAkSEFTSDpcbiAgICBjYXNlICRFUTpcbiAgICBjYXNlICRRVUVTVElPTjpcbiAgICBjYXNlICRBTVBFUlNBTkQ6XG4gICAgY2FzZSAkU1RBUjpcbiAgICBjYXNlICRDT01NQTpcbiAgICBjYXNlICRNSU5VUzpcbiAgICBjYXNlICRQTFVTOlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc1ZhbGlkU3R5bGVGdW5jdGlvbkNoYXJhY3Rlcihjb2RlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgc3dpdGNoIChjb2RlKSB7XG4gICAgY2FzZSAkUEVSSU9EOlxuICAgIGNhc2UgJE1JTlVTOlxuICAgIGNhc2UgJFBMVVM6XG4gICAgY2FzZSAkU1RBUjpcbiAgICBjYXNlICRTTEFTSDpcbiAgICBjYXNlICRMUEFSRU46XG4gICAgY2FzZSAkUlBBUkVOOlxuICAgIGNhc2UgJENPTU1BOlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc1ZhbGlkQmxvY2tDaGFyYWN0ZXIoY29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gIC8vIEBzb21ldGhpbmcgeyB9XG4gIC8vIElERU5UXG4gIHJldHVybiBjb2RlID09ICRBVDtcbn1cblxuZnVuY3Rpb24gaXNWYWxpZENzc0NoYXJhY3Rlcihjb2RlOiBudW1iZXIsIG1vZGU6IENzc0xleGVyTW9kZSk6IGJvb2xlYW4ge1xuICBzd2l0Y2ggKG1vZGUpIHtcbiAgICBjYXNlIENzc0xleGVyTW9kZS5BTEw6XG4gICAgY2FzZSBDc3NMZXhlck1vZGUuQUxMX1RSQUNLX1dTOlxuICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICBjYXNlIENzc0xleGVyTW9kZS5TRUxFQ1RPUjpcbiAgICAgIHJldHVybiBpc1ZhbGlkU2VsZWN0b3JDaGFyYWN0ZXIoY29kZSk7XG5cbiAgICBjYXNlIENzc0xleGVyTW9kZS5QU0VVRE9fU0VMRUNUT1I6XG4gICAgICByZXR1cm4gaXNWYWxpZFBzZXVkb1NlbGVjdG9yQ2hhcmFjdGVyKGNvZGUpO1xuXG4gICAgY2FzZSBDc3NMZXhlck1vZGUuQVRUUklCVVRFX1NFTEVDVE9SOlxuICAgICAgcmV0dXJuIGlzVmFsaWRBdHRyaWJ1dGVTZWxlY3RvckNoYXJhY3Rlcihjb2RlKTtcblxuICAgIGNhc2UgQ3NzTGV4ZXJNb2RlLk1FRElBX1FVRVJZOlxuICAgICAgcmV0dXJuIGlzVmFsaWRNZWRpYVF1ZXJ5UnVsZUNoYXJhY3Rlcihjb2RlKTtcblxuICAgIGNhc2UgQ3NzTGV4ZXJNb2RlLkFUX1JVTEVfUVVFUlk6XG4gICAgICByZXR1cm4gaXNWYWxpZEF0UnVsZUNoYXJhY3Rlcihjb2RlKTtcblxuICAgIGNhc2UgQ3NzTGV4ZXJNb2RlLktFWUZSQU1FX0JMT0NLOlxuICAgICAgcmV0dXJuIGlzVmFsaWRLZXlmcmFtZUJsb2NrQ2hhcmFjdGVyKGNvZGUpO1xuXG4gICAgY2FzZSBDc3NMZXhlck1vZGUuU1RZTEVfQkxPQ0s6XG4gICAgY2FzZSBDc3NMZXhlck1vZGUuU1RZTEVfVkFMVUU6XG4gICAgICByZXR1cm4gaXNWYWxpZFN0eWxlQmxvY2tDaGFyYWN0ZXIoY29kZSk7XG5cbiAgICBjYXNlIENzc0xleGVyTW9kZS5TVFlMRV9DQUxDX0ZVTkNUSU9OOlxuICAgICAgcmV0dXJuIGlzVmFsaWRTdHlsZUZ1bmN0aW9uQ2hhcmFjdGVyKGNvZGUpO1xuXG4gICAgY2FzZSBDc3NMZXhlck1vZGUuQkxPQ0s6XG4gICAgICByZXR1cm4gaXNWYWxpZEJsb2NrQ2hhcmFjdGVyKGNvZGUpO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjaGFyQ29kZShpbnB1dCwgaW5kZXgpOiBudW1iZXIge1xuICByZXR1cm4gaW5kZXggPj0gaW5wdXQubGVuZ3RoID8gJEVPRiA6IFN0cmluZ1dyYXBwZXIuY2hhckNvZGVBdChpbnB1dCwgaW5kZXgpO1xufVxuXG5mdW5jdGlvbiBjaGFyU3RyKGNvZGU6IG51bWJlcik6IHN0cmluZyB7XG4gIHJldHVybiBTdHJpbmdXcmFwcGVyLmZyb21DaGFyQ29kZShjb2RlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTmV3bGluZShjb2RlKTogYm9vbGVhbiB7XG4gIHN3aXRjaCAoY29kZSkge1xuICAgIGNhc2UgJEZGOlxuICAgIGNhc2UgJENSOlxuICAgIGNhc2UgJExGOlxuICAgIGNhc2UgJFZUQUI6XG4gICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
