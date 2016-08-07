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
                    this._currentMode = CssLexerMode.BLOCK;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL2Nzcy9sZXhlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBZ0dBLDhCQUFxQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU07UUFDakYsTUFBTSxDQUFDLENBQUcsT0FBTyxtQkFBYyxHQUFHLFNBQUksTUFBTSxzQkFBa0I7WUFDdkQsZUFBZSxDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUNqRSxDQUFDO0lBSEQsdURBR0MsQ0FBQTtJQUVELHlCQUFnQyxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNO1FBQzlELElBQUksZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDckMsT0FBTyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDMUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFDRCxJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN4QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2hDLGNBQWMsSUFBSSxHQUFHLENBQUM7UUFDeEIsQ0FBQztRQUNELElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN2QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFD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QztvQkFDL0IsSUFBSSxNQUFNLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQztvQkFDakMsSUFBSSxJQUFJLEdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDN0IsZUFBZTt3QkFDWCxnQkFBUyxDQUFDLGVBQWUsQ0FBQyxHQUFHLGVBQWUsR0FBRyxvQkFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3pGLElBQUksWUFBWSxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7b0JBQzVGLElBQUksWUFBWSxHQUNaLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUNwRixFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7d0JBQ2xCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDakIsQ0FBQztvQkFDRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksZUFBZSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztvQkFDckUsTUFBTSxDQUFDLFlBQVksQ0FBQztnQkFDdEIsQ0FBQztnQkFDSCxpQkFBQztZQUFELENBeFdBLEFBd1dDLElBQUE7WUF4V0QsbUNBd1dDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29tcGlsZXIvY3NzL2xleGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOdW1iZXJXcmFwcGVyLCBTdHJpbmdXcmFwcGVyLCBpc1ByZXNlbnQsIHJlc29sdmVFbnVtVG9rZW59IGZyb20gXCJhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmdcIjtcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcblxuaW1wb3J0IHtcbiAgaXNXaGl0ZXNwYWNlLFxuICAkRU9GLFxuICAkSEFTSCxcbiAgJFRJTERBLFxuICAkQ0FSRVQsXG4gICRQRVJDRU5ULFxuICAkJCxcbiAgJF8sXG4gICRDT0xPTixcbiAgJFNRLFxuICAkRFEsXG4gICRFUSxcbiAgJFNMQVNILFxuICAkQkFDS1NMQVNILFxuICAkUEVSSU9ELFxuICAkU1RBUixcbiAgJFBMVVMsXG4gICRMUEFSRU4sXG4gICRSUEFSRU4sXG4gICRMQlJBQ0UsXG4gICRSQlJBQ0UsXG4gICRMQlJBQ0tFVCxcbiAgJFJCUkFDS0VULFxuICAkUElQRSxcbiAgJENPTU1BLFxuICAkU0VNSUNPTE9OLFxuICAkTUlOVVMsXG4gICRCQU5HLFxuICAkUVVFU1RJT04sXG4gICRBVCxcbiAgJEFNUEVSU0FORCxcbiAgJEdULFxuICAkYSxcbiAgJEEsXG4gICR6LFxuICAkWixcbiAgJDAsXG4gICQ5LFxuICAkRkYsXG4gICRDUixcbiAgJExGLFxuICAkVlRBQlxufSBmcm9tIFwiYW5ndWxhcjIvc3JjL2NvbXBpbGVyL2NoYXJzXCI7XG5cbmV4cG9ydCB7XG4gICRFT0YsXG4gICRBVCxcbiAgJFJCUkFDRSxcbiAgJExCUkFDRSxcbiAgJExCUkFDS0VULFxuICAkUkJSQUNLRVQsXG4gICRMUEFSRU4sXG4gICRSUEFSRU4sXG4gICRDT01NQSxcbiAgJENPTE9OLFxuICAkU0VNSUNPTE9OLFxuICBpc1doaXRlc3BhY2Vcbn0gZnJvbSBcImFuZ3VsYXIyL3NyYy9jb21waWxlci9jaGFyc1wiO1xuXG5leHBvcnQgZW51bSBDc3NUb2tlblR5cGUge1xuICBFT0YsXG4gIFN0cmluZyxcbiAgQ29tbWVudCxcbiAgSWRlbnRpZmllcixcbiAgTnVtYmVyLFxuICBJZGVudGlmaWVyT3JOdW1iZXIsXG4gIEF0S2V5d29yZCxcbiAgQ2hhcmFjdGVyLFxuICBXaGl0ZXNwYWNlLFxuICBJbnZhbGlkXG59XG5cbmV4cG9ydCBlbnVtIENzc0xleGVyTW9kZSB7XG4gIEFMTCxcbiAgQUxMX1RSQUNLX1dTLFxuICBTRUxFQ1RPUixcbiAgUFNFVURPX1NFTEVDVE9SLFxuICBBVFRSSUJVVEVfU0VMRUNUT1IsXG4gIEFUX1JVTEVfUVVFUlksXG4gIE1FRElBX1FVRVJZLFxuICBCTE9DSyxcbiAgS0VZRlJBTUVfQkxPQ0ssXG4gIFNUWUxFX0JMT0NLLFxuICBTVFlMRV9WQUxVRSxcbiAgU1RZTEVfVkFMVUVfRlVOQ1RJT04sXG4gIFNUWUxFX0NBTENfRlVOQ1RJT05cbn1cblxuZXhwb3J0IGNsYXNzIExleGVkQ3NzUmVzdWx0IHtcbiAgY29uc3RydWN0b3IocHVibGljIGVycm9yOiBDc3NTY2FubmVyRXJyb3IsIHB1YmxpYyB0b2tlbjogQ3NzVG9rZW4pIHt9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUVycm9yTWVzc2FnZShpbnB1dCwgbWVzc2FnZSwgZXJyb3JWYWx1ZSwgaW5kZXgsIHJvdywgY29sdW1uKSB7XG4gIHJldHVybiBgJHttZXNzYWdlfSBhdCBjb2x1bW4gJHtyb3d9OiR7Y29sdW1ufSBpbiBleHByZXNzaW9uIFtgICtcbiAgICAgICAgIGZpbmRQcm9ibGVtQ29kZShpbnB1dCwgZXJyb3JWYWx1ZSwgaW5kZXgsIGNvbHVtbikgKyAnXSc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kUHJvYmxlbUNvZGUoaW5wdXQsIGVycm9yVmFsdWUsIGluZGV4LCBjb2x1bW4pIHtcbiAgdmFyIGVuZE9mUHJvYmxlbUxpbmUgPSBpbmRleDtcbiAgdmFyIGN1cnJlbnQgPSBjaGFyQ29kZShpbnB1dCwgaW5kZXgpO1xuICB3aGlsZSAoY3VycmVudCA+IDAgJiYgIWlzTmV3bGluZShjdXJyZW50KSkge1xuICAgIGN1cnJlbnQgPSBjaGFyQ29kZShpbnB1dCwgKytlbmRPZlByb2JsZW1MaW5lKTtcbiAgfVxuICB2YXIgY2hvcHBlZFN0cmluZyA9IGlucHV0LnN1YnN0cmluZygwLCBlbmRPZlByb2JsZW1MaW5lKTtcbiAgdmFyIHBvaW50ZXJQYWRkaW5nID0gXCJcIjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2x1bW47IGkrKykge1xuICAgIHBvaW50ZXJQYWRkaW5nICs9IFwiIFwiO1xuICB9XG4gIHZhciBwb2ludGVyU3RyaW5nID0gXCJcIjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBlcnJvclZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgcG9pbnRlclN0cmluZyArPSBcIl5cIjtcbiAgfVxuICByZXR1cm4gY2hvcHBlZFN0cmluZyArIFwiXFxuXCIgKyBwb2ludGVyUGFkZGluZyArIHBvaW50ZXJTdHJpbmcgKyBcIlxcblwiO1xufVxuXG5leHBvcnQgY2xhc3MgQ3NzVG9rZW4ge1xuICBudW1WYWx1ZTogbnVtYmVyO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgaW5kZXg6IG51bWJlciwgcHVibGljIGNvbHVtbjogbnVtYmVyLCBwdWJsaWMgbGluZTogbnVtYmVyLFxuICAgICAgICAgICAgICBwdWJsaWMgdHlwZTogQ3NzVG9rZW5UeXBlLCBwdWJsaWMgc3RyVmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMubnVtVmFsdWUgPSBjaGFyQ29kZShzdHJWYWx1ZSwgMCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENzc0xleGVyIHtcbiAgc2Nhbih0ZXh0OiBzdHJpbmcsIHRyYWNrQ29tbWVudHM6IGJvb2xlYW4gPSBmYWxzZSk6IENzc1NjYW5uZXIge1xuICAgIHJldHVybiBuZXcgQ3NzU2Nhbm5lcih0ZXh0LCB0cmFja0NvbW1lbnRzKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3NzU2Nhbm5lckVycm9yIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIHB1YmxpYyByYXdNZXNzYWdlOiBzdHJpbmc7XG4gIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHRva2VuOiBDc3NUb2tlbiwgbWVzc2FnZSkge1xuICAgIHN1cGVyKCdDc3MgUGFyc2UgRXJyb3I6ICcgKyBtZXNzYWdlKTtcbiAgICB0aGlzLnJhd01lc3NhZ2UgPSBtZXNzYWdlO1xuICB9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMubWVzc2FnZTsgfVxufVxuXG5mdW5jdGlvbiBfdHJhY2tXaGl0ZXNwYWNlKG1vZGU6IENzc0xleGVyTW9kZSkge1xuICBzd2l0Y2ggKG1vZGUpIHtcbiAgICBjYXNlIENzc0xleGVyTW9kZS5TRUxFQ1RPUjpcbiAgICBjYXNlIENzc0xleGVyTW9kZS5BTExfVFJBQ0tfV1M6XG4gICAgY2FzZSBDc3NMZXhlck1vZGUuU1RZTEVfVkFMVUU6XG4gICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENzc1NjYW5uZXIge1xuICBwZWVrOiBudW1iZXI7XG4gIHBlZWtQZWVrOiBudW1iZXI7XG4gIGxlbmd0aDogbnVtYmVyID0gMDtcbiAgaW5kZXg6IG51bWJlciA9IC0xO1xuICBjb2x1bW46IG51bWJlciA9IC0xO1xuICBsaW5lOiBudW1iZXIgPSAwO1xuXG4gIF9jdXJyZW50TW9kZTogQ3NzTGV4ZXJNb2RlID0gQ3NzTGV4ZXJNb2RlLkJMT0NLO1xuICBfY3VycmVudEVycm9yOiBDc3NTY2FubmVyRXJyb3IgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpbnB1dDogc3RyaW5nLCBwcml2YXRlIF90cmFja0NvbW1lbnRzOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICB0aGlzLmxlbmd0aCA9IHRoaXMuaW5wdXQubGVuZ3RoO1xuICAgIHRoaXMucGVla1BlZWsgPSB0aGlzLnBlZWtBdCgwKTtcbiAgICB0aGlzLmFkdmFuY2UoKTtcbiAgfVxuXG4gIGdldE1vZGUoKTogQ3NzTGV4ZXJNb2RlIHsgcmV0dXJuIHRoaXMuX2N1cnJlbnRNb2RlOyB9XG5cbiAgc2V0TW9kZShtb2RlOiBDc3NMZXhlck1vZGUpIHtcbiAgICBpZiAodGhpcy5fY3VycmVudE1vZGUgIT0gbW9kZSkge1xuICAgICAgaWYgKF90cmFja1doaXRlc3BhY2UodGhpcy5fY3VycmVudE1vZGUpKSB7XG4gICAgICAgIHRoaXMuY29uc3VtZVdoaXRlc3BhY2UoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2N1cnJlbnRNb2RlID0gbW9kZTtcbiAgICB9XG4gIH1cblxuICBhZHZhbmNlKCk6IHZvaWQge1xuICAgIGlmIChpc05ld2xpbmUodGhpcy5wZWVrKSkge1xuICAgICAgdGhpcy5jb2x1bW4gPSAwO1xuICAgICAgdGhpcy5saW5lKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29sdW1uKys7XG4gICAgfVxuXG4gICAgdGhpcy5pbmRleCsrO1xuICAgIHRoaXMucGVlayA9IHRoaXMucGVla1BlZWs7XG4gICAgdGhpcy5wZWVrUGVlayA9IHRoaXMucGVla0F0KHRoaXMuaW5kZXggKyAxKTtcbiAgfVxuXG4gIHBlZWtBdChpbmRleCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGluZGV4ID49IHRoaXMubGVuZ3RoID8gJEVPRiA6IFN0cmluZ1dyYXBwZXIuY2hhckNvZGVBdCh0aGlzLmlucHV0LCBpbmRleCk7XG4gIH1cblxuICBjb25zdW1lRW1wdHlTdGF0ZW1lbnRzKCk6IHZvaWQge1xuICAgIHRoaXMuY29uc3VtZVdoaXRlc3BhY2UoKTtcbiAgICB3aGlsZSAodGhpcy5wZWVrID09ICRTRU1JQ09MT04pIHtcbiAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgICAgdGhpcy5jb25zdW1lV2hpdGVzcGFjZSgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN1bWVXaGl0ZXNwYWNlKCk6IHZvaWQge1xuICAgIHdoaWxlIChpc1doaXRlc3BhY2UodGhpcy5wZWVrKSB8fCBpc05ld2xpbmUodGhpcy5wZWVrKSkge1xuICAgICAgdGhpcy5hZHZhbmNlKCk7XG4gICAgICBpZiAoIXRoaXMuX3RyYWNrQ29tbWVudHMgJiYgaXNDb21tZW50U3RhcnQodGhpcy5wZWVrLCB0aGlzLnBlZWtQZWVrKSkge1xuICAgICAgICB0aGlzLmFkdmFuY2UoKTsgIC8vIC9cbiAgICAgICAgdGhpcy5hZHZhbmNlKCk7ICAvLyAqXG4gICAgICAgIHdoaWxlICghaXNDb21tZW50RW5kKHRoaXMucGVlaywgdGhpcy5wZWVrUGVlaykpIHtcbiAgICAgICAgICBpZiAodGhpcy5wZWVrID09ICRFT0YpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IoJ1VudGVybWluYXRlZCBjb21tZW50Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWR2YW5jZSgpOyAgLy8gKlxuICAgICAgICB0aGlzLmFkdmFuY2UoKTsgIC8vIC9cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdW1lKHR5cGU6IENzc1Rva2VuVHlwZSwgdmFsdWU6IHN0cmluZyA9IG51bGwpOiBMZXhlZENzc1Jlc3VsdCB7XG4gICAgdmFyIG1vZGUgPSB0aGlzLl9jdXJyZW50TW9kZTtcbiAgICB0aGlzLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLkFMTCk7XG5cbiAgICB2YXIgcHJldmlvdXNJbmRleCA9IHRoaXMuaW5kZXg7XG4gICAgdmFyIHByZXZpb3VzTGluZSA9IHRoaXMubGluZTtcbiAgICB2YXIgcHJldmlvdXNDb2x1bW4gPSB0aGlzLmNvbHVtbjtcblxuICAgIHZhciBvdXRwdXQgPSB0aGlzLnNjYW4oKTtcblxuICAgIC8vIGp1c3QgaW5jYXNlIHRoZSBpbm5lciBzY2FuIG1ldGhvZCByZXR1cm5lZCBhbiBlcnJvclxuICAgIGlmIChpc1ByZXNlbnQob3V0cHV0LmVycm9yKSkge1xuICAgICAgdGhpcy5zZXRNb2RlKG1vZGUpO1xuICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG5cbiAgICB2YXIgbmV4dCA9IG91dHB1dC50b2tlbjtcbiAgICBpZiAoIWlzUHJlc2VudChuZXh0KSkge1xuICAgICAgbmV4dCA9IG5ldyBDc3NUb2tlbigwLCAwLCAwLCBDc3NUb2tlblR5cGUuRU9GLCBcImVuZCBvZiBmaWxlXCIpO1xuICAgIH1cblxuICAgIHZhciBpc01hdGNoaW5nVHlwZTtcbiAgICBpZiAodHlwZSA9PSBDc3NUb2tlblR5cGUuSWRlbnRpZmllck9yTnVtYmVyKSB7XG4gICAgICAvLyBUT0RPIChtYXRza28pOiBpbXBsZW1lbnQgYXJyYXkgdHJhdmVyc2FsIGZvciBsb29rdXAgaGVyZVxuICAgICAgaXNNYXRjaGluZ1R5cGUgPSBuZXh0LnR5cGUgPT0gQ3NzVG9rZW5UeXBlLk51bWJlciB8fCBuZXh0LnR5cGUgPT0gQ3NzVG9rZW5UeXBlLklkZW50aWZpZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlzTWF0Y2hpbmdUeXBlID0gbmV4dC50eXBlID09IHR5cGU7XG4gICAgfVxuXG4gICAgLy8gYmVmb3JlIHRocm93aW5nIHRoZSBlcnJvciB3ZSBuZWVkIHRvIGJyaW5nIGJhY2sgdGhlIGZvcm1lclxuICAgIC8vIG1vZGUgc28gdGhhdCB0aGUgcGFyc2VyIGNhbiByZWNvdmVyLi4uXG4gICAgdGhpcy5zZXRNb2RlKG1vZGUpO1xuXG4gICAgdmFyIGVycm9yID0gbnVsbDtcbiAgICBpZiAoIWlzTWF0Y2hpbmdUeXBlIHx8IChpc1ByZXNlbnQodmFsdWUpICYmIHZhbHVlICE9IG5leHQuc3RyVmFsdWUpKSB7XG4gICAgICB2YXIgZXJyb3JNZXNzYWdlID0gcmVzb2x2ZUVudW1Ub2tlbihDc3NUb2tlblR5cGUsIG5leHQudHlwZSkgKyBcIiBkb2VzIG5vdCBtYXRjaCBleHBlY3RlZCBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZUVudW1Ub2tlbihDc3NUb2tlblR5cGUsIHR5cGUpICsgXCIgdmFsdWVcIjtcblxuICAgICAgaWYgKGlzUHJlc2VudCh2YWx1ZSkpIHtcbiAgICAgICAgZXJyb3JNZXNzYWdlICs9ICcgKFwiJyArIG5leHQuc3RyVmFsdWUgKyAnXCIgc2hvdWxkIG1hdGNoIFwiJyArIHZhbHVlICsgJ1wiKSc7XG4gICAgICB9XG5cbiAgICAgIGVycm9yID0gbmV3IENzc1NjYW5uZXJFcnJvcihcbiAgICAgICAgICBuZXh0LCBnZW5lcmF0ZUVycm9yTWVzc2FnZSh0aGlzLmlucHV0LCBlcnJvck1lc3NhZ2UsIG5leHQuc3RyVmFsdWUsIHByZXZpb3VzSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNMaW5lLCBwcmV2aW91c0NvbHVtbikpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgTGV4ZWRDc3NSZXN1bHQoZXJyb3IsIG5leHQpO1xuICB9XG5cblxuICBzY2FuKCk6IExleGVkQ3NzUmVzdWx0IHtcbiAgICB2YXIgdHJhY2tXUyA9IF90cmFja1doaXRlc3BhY2UodGhpcy5fY3VycmVudE1vZGUpO1xuICAgIGlmICh0aGlzLmluZGV4ID09IDAgJiYgIXRyYWNrV1MpIHsgIC8vIGZpcnN0IHNjYW5cbiAgICAgIHRoaXMuY29uc3VtZVdoaXRlc3BhY2UoKTtcbiAgICB9XG5cbiAgICB2YXIgdG9rZW4gPSB0aGlzLl9zY2FuKCk7XG4gICAgaWYgKHRva2VuID09IG51bGwpIHJldHVybiBudWxsO1xuXG4gICAgdmFyIGVycm9yID0gdGhpcy5fY3VycmVudEVycm9yO1xuICAgIHRoaXMuX2N1cnJlbnRFcnJvciA9IG51bGw7XG5cbiAgICBpZiAoIXRyYWNrV1MpIHtcbiAgICAgIHRoaXMuY29uc3VtZVdoaXRlc3BhY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBMZXhlZENzc1Jlc3VsdChlcnJvciwgdG9rZW4pO1xuICB9XG5cbiAgX3NjYW4oKTogQ3NzVG9rZW4ge1xuICAgIHZhciBwZWVrID0gdGhpcy5wZWVrO1xuICAgIHZhciBwZWVrUGVlayA9IHRoaXMucGVla1BlZWs7XG4gICAgaWYgKHBlZWsgPT0gJEVPRikgcmV0dXJuIG51bGw7XG5cbiAgICBpZiAoaXNDb21tZW50U3RhcnQocGVlaywgcGVla1BlZWspKSB7XG4gICAgICAvLyBldmVuIGlmIGNvbW1lbnRzIGFyZSBub3QgdHJhY2tlZCB3ZSBzdGlsbCBsZXggdGhlXG4gICAgICAvLyBjb21tZW50IHNvIHdlIGNhbiBtb3ZlIHRoZSBwb2ludGVyIGZvcndhcmRcbiAgICAgIHZhciBjb21tZW50VG9rZW4gPSB0aGlzLnNjYW5Db21tZW50KCk7XG4gICAgICBpZiAodGhpcy5fdHJhY2tDb21tZW50cykge1xuICAgICAgICByZXR1cm4gY29tbWVudFRva2VuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChfdHJhY2tXaGl0ZXNwYWNlKHRoaXMuX2N1cnJlbnRNb2RlKSAmJiAoaXNXaGl0ZXNwYWNlKHBlZWspIHx8IGlzTmV3bGluZShwZWVrKSkpIHtcbiAgICAgIHJldHVybiB0aGlzLnNjYW5XaGl0ZXNwYWNlKCk7XG4gICAgfVxuXG4gICAgcGVlayA9IHRoaXMucGVlaztcbiAgICBwZWVrUGVlayA9IHRoaXMucGVla1BlZWs7XG4gICAgaWYgKHBlZWsgPT0gJEVPRikgcmV0dXJuIG51bGw7XG5cbiAgICBpZiAoaXNTdHJpbmdTdGFydChwZWVrLCBwZWVrUGVlaykpIHtcbiAgICAgIHJldHVybiB0aGlzLnNjYW5TdHJpbmcoKTtcbiAgICB9XG5cbiAgICAvLyBzb21ldGhpbmcgbGlrZSB1cmwoY29vbClcbiAgICBpZiAodGhpcy5fY3VycmVudE1vZGUgPT0gQ3NzTGV4ZXJNb2RlLlNUWUxFX1ZBTFVFX0ZVTkNUSU9OKSB7XG4gICAgICByZXR1cm4gdGhpcy5zY2FuQ3NzVmFsdWVGdW5jdGlvbigpO1xuICAgIH1cblxuICAgIHZhciBpc01vZGlmaWVyID0gcGVlayA9PSAkUExVUyB8fCBwZWVrID09ICRNSU5VUztcbiAgICB2YXIgZGlnaXRBID0gaXNNb2RpZmllciA/IGZhbHNlIDogaXNEaWdpdChwZWVrKTtcbiAgICB2YXIgZGlnaXRCID0gaXNEaWdpdChwZWVrUGVlayk7XG4gICAgaWYgKGRpZ2l0QSB8fCAoaXNNb2RpZmllciAmJiAocGVla1BlZWsgPT0gJFBFUklPRCB8fCBkaWdpdEIpKSB8fCAocGVlayA9PSAkUEVSSU9EICYmIGRpZ2l0QikpIHtcbiAgICAgIHJldHVybiB0aGlzLnNjYW5OdW1iZXIoKTtcbiAgICB9XG5cbiAgICBpZiAocGVlayA9PSAkQVQpIHtcbiAgICAgIHJldHVybiB0aGlzLnNjYW5BdEV4cHJlc3Npb24oKTtcbiAgICB9XG5cbiAgICBpZiAoaXNJZGVudGlmaWVyU3RhcnQocGVlaywgcGVla1BlZWspKSB7XG4gICAgICByZXR1cm4gdGhpcy5zY2FuSWRlbnRpZmllcigpO1xuICAgIH1cblxuICAgIGlmIChpc1ZhbGlkQ3NzQ2hhcmFjdGVyKHBlZWssIHRoaXMuX2N1cnJlbnRNb2RlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2NhbkNoYXJhY3RlcigpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmVycm9yKGBVbmV4cGVjdGVkIGNoYXJhY3RlciBbJHtTdHJpbmdXcmFwcGVyLmZyb21DaGFyQ29kZShwZWVrKX1dYCk7XG4gIH1cblxuICBzY2FuQ29tbWVudCgpIHtcbiAgICBpZiAodGhpcy5hc3NlcnRDb25kaXRpb24oaXNDb21tZW50U3RhcnQodGhpcy5wZWVrLCB0aGlzLnBlZWtQZWVrKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJFeHBlY3RlZCBjb21tZW50IHN0YXJ0IHZhbHVlXCIpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgc3RhcnQgPSB0aGlzLmluZGV4O1xuICAgIHZhciBzdGFydGluZ0NvbHVtbiA9IHRoaXMuY29sdW1uO1xuICAgIHZhciBzdGFydGluZ0xpbmUgPSB0aGlzLmxpbmU7XG5cbiAgICB0aGlzLmFkdmFuY2UoKTsgIC8vIC9cbiAgICB0aGlzLmFkdmFuY2UoKTsgIC8vICpcblxuICAgIHdoaWxlICghaXNDb21tZW50RW5kKHRoaXMucGVlaywgdGhpcy5wZWVrUGVlaykpIHtcbiAgICAgIGlmICh0aGlzLnBlZWsgPT0gJEVPRikge1xuICAgICAgICB0aGlzLmVycm9yKCdVbnRlcm1pbmF0ZWQgY29tbWVudCcpO1xuICAgICAgfVxuICAgICAgdGhpcy5hZHZhbmNlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5hZHZhbmNlKCk7ICAvLyAqXG4gICAgdGhpcy5hZHZhbmNlKCk7ICAvLyAvXG5cbiAgICB2YXIgc3RyID0gdGhpcy5pbnB1dC5zdWJzdHJpbmcoc3RhcnQsIHRoaXMuaW5kZXgpO1xuICAgIHJldHVybiBuZXcgQ3NzVG9rZW4oc3RhcnQsIHN0YXJ0aW5nQ29sdW1uLCBzdGFydGluZ0xpbmUsIENzc1Rva2VuVHlwZS5Db21tZW50LCBzdHIpO1xuICB9XG5cbiAgc2NhbldoaXRlc3BhY2UoKSB7XG4gICAgdmFyIHN0YXJ0ID0gdGhpcy5pbmRleDtcbiAgICB2YXIgc3RhcnRpbmdDb2x1bW4gPSB0aGlzLmNvbHVtbjtcbiAgICB2YXIgc3RhcnRpbmdMaW5lID0gdGhpcy5saW5lO1xuICAgIHdoaWxlIChpc1doaXRlc3BhY2UodGhpcy5wZWVrKSAmJiB0aGlzLnBlZWsgIT0gJEVPRikge1xuICAgICAgdGhpcy5hZHZhbmNlKCk7XG4gICAgfVxuICAgIHZhciBzdHIgPSB0aGlzLmlucHV0LnN1YnN0cmluZyhzdGFydCwgdGhpcy5pbmRleCk7XG4gICAgcmV0dXJuIG5ldyBDc3NUb2tlbihzdGFydCwgc3RhcnRpbmdDb2x1bW4sIHN0YXJ0aW5nTGluZSwgQ3NzVG9rZW5UeXBlLldoaXRlc3BhY2UsIHN0cik7XG4gIH1cblxuICBzY2FuU3RyaW5nKCkge1xuICAgIGlmICh0aGlzLmFzc2VydENvbmRpdGlvbihpc1N0cmluZ1N0YXJ0KHRoaXMucGVlaywgdGhpcy5wZWVrUGVlayksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVW5leHBlY3RlZCBub24tc3RyaW5nIHN0YXJ0aW5nIHZhbHVlXCIpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgdGFyZ2V0ID0gdGhpcy5wZWVrO1xuICAgIHZhciBzdGFydCA9IHRoaXMuaW5kZXg7XG4gICAgdmFyIHN0YXJ0aW5nQ29sdW1uID0gdGhpcy5jb2x1bW47XG4gICAgdmFyIHN0YXJ0aW5nTGluZSA9IHRoaXMubGluZTtcbiAgICB2YXIgcHJldmlvdXMgPSB0YXJnZXQ7XG4gICAgdGhpcy5hZHZhbmNlKCk7XG5cbiAgICB3aGlsZSAoIWlzQ2hhck1hdGNoKHRhcmdldCwgcHJldmlvdXMsIHRoaXMucGVlaykpIHtcbiAgICAgIGlmICh0aGlzLnBlZWsgPT0gJEVPRiB8fCBpc05ld2xpbmUodGhpcy5wZWVrKSkge1xuICAgICAgICB0aGlzLmVycm9yKCdVbnRlcm1pbmF0ZWQgcXVvdGUnKTtcbiAgICAgIH1cbiAgICAgIHByZXZpb3VzID0gdGhpcy5wZWVrO1xuICAgICAgdGhpcy5hZHZhbmNlKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYXNzZXJ0Q29uZGl0aW9uKHRoaXMucGVlayA9PSB0YXJnZXQsIFwiVW50ZXJtaW5hdGVkIHF1b3RlXCIpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5hZHZhbmNlKCk7XG5cbiAgICB2YXIgc3RyID0gdGhpcy5pbnB1dC5zdWJzdHJpbmcoc3RhcnQsIHRoaXMuaW5kZXgpO1xuICAgIHJldHVybiBuZXcgQ3NzVG9rZW4oc3RhcnQsIHN0YXJ0aW5nQ29sdW1uLCBzdGFydGluZ0xpbmUsIENzc1Rva2VuVHlwZS5TdHJpbmcsIHN0cik7XG4gIH1cblxuICBzY2FuTnVtYmVyKCkge1xuICAgIHZhciBzdGFydCA9IHRoaXMuaW5kZXg7XG4gICAgdmFyIHN0YXJ0aW5nQ29sdW1uID0gdGhpcy5jb2x1bW47XG4gICAgaWYgKHRoaXMucGVlayA9PSAkUExVUyB8fCB0aGlzLnBlZWsgPT0gJE1JTlVTKSB7XG4gICAgICB0aGlzLmFkdmFuY2UoKTtcbiAgICB9XG4gICAgdmFyIHBlcmlvZFVzZWQgPSBmYWxzZTtcbiAgICB3aGlsZSAoaXNEaWdpdCh0aGlzLnBlZWspIHx8IHRoaXMucGVlayA9PSAkUEVSSU9EKSB7XG4gICAgICBpZiAodGhpcy5wZWVrID09ICRQRVJJT0QpIHtcbiAgICAgICAgaWYgKHBlcmlvZFVzZWQpIHtcbiAgICAgICAgICB0aGlzLmVycm9yKCdVbmV4cGVjdGVkIHVzZSBvZiBhIHNlY29uZCBwZXJpb2QgdmFsdWUnKTtcbiAgICAgICAgfVxuICAgICAgICBwZXJpb2RVc2VkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgIH1cbiAgICB2YXIgc3RyVmFsdWUgPSB0aGlzLmlucHV0LnN1YnN0cmluZyhzdGFydCwgdGhpcy5pbmRleCk7XG4gICAgcmV0dXJuIG5ldyBDc3NUb2tlbihzdGFydCwgc3RhcnRpbmdDb2x1bW4sIHRoaXMubGluZSwgQ3NzVG9rZW5UeXBlLk51bWJlciwgc3RyVmFsdWUpO1xuICB9XG5cbiAgc2NhbklkZW50aWZpZXIoKSB7XG4gICAgaWYgKHRoaXMuYXNzZXJ0Q29uZGl0aW9uKGlzSWRlbnRpZmllclN0YXJ0KHRoaXMucGVlaywgdGhpcy5wZWVrUGVlayksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICdFeHBlY3RlZCBpZGVudGlmaWVyIHN0YXJ0aW5nIHZhbHVlJykpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBzdGFydCA9IHRoaXMuaW5kZXg7XG4gICAgdmFyIHN0YXJ0aW5nQ29sdW1uID0gdGhpcy5jb2x1bW47XG4gICAgd2hpbGUgKGlzSWRlbnRpZmllclBhcnQodGhpcy5wZWVrKSkge1xuICAgICAgdGhpcy5hZHZhbmNlKCk7XG4gICAgfVxuICAgIHZhciBzdHJWYWx1ZSA9IHRoaXMuaW5wdXQuc3Vic3RyaW5nKHN0YXJ0LCB0aGlzLmluZGV4KTtcbiAgICByZXR1cm4gbmV3IENzc1Rva2VuKHN0YXJ0LCBzdGFydGluZ0NvbHVtbiwgdGhpcy5saW5lLCBDc3NUb2tlblR5cGUuSWRlbnRpZmllciwgc3RyVmFsdWUpO1xuICB9XG5cbiAgc2NhbkNzc1ZhbHVlRnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0YXJ0ID0gdGhpcy5pbmRleDtcbiAgICB2YXIgc3RhcnRpbmdDb2x1bW4gPSB0aGlzLmNvbHVtbjtcbiAgICB3aGlsZSAodGhpcy5wZWVrICE9ICRFT0YgJiYgdGhpcy5wZWVrICE9ICRSUEFSRU4pIHtcbiAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgIH1cbiAgICB2YXIgc3RyVmFsdWUgPSB0aGlzLmlucHV0LnN1YnN0cmluZyhzdGFydCwgdGhpcy5pbmRleCk7XG4gICAgcmV0dXJuIG5ldyBDc3NUb2tlbihzdGFydCwgc3RhcnRpbmdDb2x1bW4sIHRoaXMubGluZSwgQ3NzVG9rZW5UeXBlLklkZW50aWZpZXIsIHN0clZhbHVlKTtcbiAgfVxuXG4gIHNjYW5DaGFyYWN0ZXIoKSB7XG4gICAgdmFyIHN0YXJ0ID0gdGhpcy5pbmRleDtcbiAgICB2YXIgc3RhcnRpbmdDb2x1bW4gPSB0aGlzLmNvbHVtbjtcbiAgICBpZiAodGhpcy5hc3NlcnRDb25kaXRpb24oaXNWYWxpZENzc0NoYXJhY3Rlcih0aGlzLnBlZWssIHRoaXMuX2N1cnJlbnRNb2RlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhclN0cih0aGlzLnBlZWspICsgJyBpcyBub3QgYSB2YWxpZCBDU1MgY2hhcmFjdGVyJykpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBjID0gdGhpcy5pbnB1dC5zdWJzdHJpbmcoc3RhcnQsIHN0YXJ0ICsgMSk7XG4gICAgdGhpcy5hZHZhbmNlKCk7XG5cbiAgICByZXR1cm4gbmV3IENzc1Rva2VuKHN0YXJ0LCBzdGFydGluZ0NvbHVtbiwgdGhpcy5saW5lLCBDc3NUb2tlblR5cGUuQ2hhcmFjdGVyLCBjKTtcbiAgfVxuXG4gIHNjYW5BdEV4cHJlc3Npb24oKSB7XG4gICAgaWYgKHRoaXMuYXNzZXJ0Q29uZGl0aW9uKHRoaXMucGVlayA9PSAkQVQsICdFeHBlY3RlZCBAIHZhbHVlJykpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBzdGFydCA9IHRoaXMuaW5kZXg7XG4gICAgdmFyIHN0YXJ0aW5nQ29sdW1uID0gdGhpcy5jb2x1bW47XG4gICAgdGhpcy5hZHZhbmNlKCk7XG4gICAgaWYgKGlzSWRlbnRpZmllclN0YXJ0KHRoaXMucGVlaywgdGhpcy5wZWVrUGVlaykpIHtcbiAgICAgIHZhciBpZGVudCA9IHRoaXMuc2NhbklkZW50aWZpZXIoKTtcbiAgICAgIHZhciBzdHJWYWx1ZSA9ICdAJyArIGlkZW50LnN0clZhbHVlO1xuICAgICAgcmV0dXJuIG5ldyBDc3NUb2tlbihzdGFydCwgc3RhcnRpbmdDb2x1bW4sIHRoaXMubGluZSwgQ3NzVG9rZW5UeXBlLkF0S2V5d29yZCwgc3RyVmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5zY2FuQ2hhcmFjdGVyKCk7XG4gICAgfVxuICB9XG5cbiAgYXNzZXJ0Q29uZGl0aW9uKHN0YXR1czogYm9vbGVhbiwgZXJyb3JNZXNzYWdlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAoIXN0YXR1cykge1xuICAgICAgdGhpcy5lcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGVycm9yKG1lc3NhZ2U6IHN0cmluZywgZXJyb3JUb2tlblZhbHVlOiBzdHJpbmcgPSBudWxsLCBkb05vdEFkdmFuY2U6IGJvb2xlYW4gPSBmYWxzZSk6IENzc1Rva2VuIHtcbiAgICB2YXIgaW5kZXg6IG51bWJlciA9IHRoaXMuaW5kZXg7XG4gICAgdmFyIGNvbHVtbjogbnVtYmVyID0gdGhpcy5jb2x1bW47XG4gICAgdmFyIGxpbmU6IG51bWJlciA9IHRoaXMubGluZTtcbiAgICBlcnJvclRva2VuVmFsdWUgPVxuICAgICAgICBpc1ByZXNlbnQoZXJyb3JUb2tlblZhbHVlKSA/IGVycm9yVG9rZW5WYWx1ZSA6IFN0cmluZ1dyYXBwZXIuZnJvbUNoYXJDb2RlKHRoaXMucGVlayk7XG4gICAgdmFyIGludmFsaWRUb2tlbiA9IG5ldyBDc3NUb2tlbihpbmRleCwgY29sdW1uLCBsaW5lLCBDc3NUb2tlblR5cGUuSW52YWxpZCwgZXJyb3JUb2tlblZhbHVlKTtcbiAgICB2YXIgZXJyb3JNZXNzYWdlID1cbiAgICAgICAgZ2VuZXJhdGVFcnJvck1lc3NhZ2UodGhpcy5pbnB1dCwgbWVzc2FnZSwgZXJyb3JUb2tlblZhbHVlLCBpbmRleCwgbGluZSwgY29sdW1uKTtcbiAgICBpZiAoIWRvTm90QWR2YW5jZSkge1xuICAgICAgdGhpcy5hZHZhbmNlKCk7XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnRFcnJvciA9IG5ldyBDc3NTY2FubmVyRXJyb3IoaW52YWxpZFRva2VuLCBlcnJvck1lc3NhZ2UpO1xuICAgIHJldHVybiBpbnZhbGlkVG9rZW47XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNBdEtleXdvcmQoY3VycmVudDogQ3NzVG9rZW4sIG5leHQ6IENzc1Rva2VuKTogYm9vbGVhbiB7XG4gIHJldHVybiBjdXJyZW50Lm51bVZhbHVlID09ICRBVCAmJiBuZXh0LnR5cGUgPT0gQ3NzVG9rZW5UeXBlLklkZW50aWZpZXI7XG59XG5cbmZ1bmN0aW9uIGlzQ2hhck1hdGNoKHRhcmdldDogbnVtYmVyLCBwcmV2aW91czogbnVtYmVyLCBjb2RlOiBudW1iZXIpIHtcbiAgcmV0dXJuIGNvZGUgPT0gdGFyZ2V0ICYmIHByZXZpb3VzICE9ICRCQUNLU0xBU0g7XG59XG5cbmZ1bmN0aW9uIGlzRGlnaXQoY29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiAkMCA8PSBjb2RlICYmIGNvZGUgPD0gJDk7XG59XG5cbmZ1bmN0aW9uIGlzQ29tbWVudFN0YXJ0KGNvZGU6IG51bWJlciwgbmV4dDogbnVtYmVyKSB7XG4gIHJldHVybiBjb2RlID09ICRTTEFTSCAmJiBuZXh0ID09ICRTVEFSO1xufVxuXG5mdW5jdGlvbiBpc0NvbW1lbnRFbmQoY29kZTogbnVtYmVyLCBuZXh0OiBudW1iZXIpIHtcbiAgcmV0dXJuIGNvZGUgPT0gJFNUQVIgJiYgbmV4dCA9PSAkU0xBU0g7XG59XG5cbmZ1bmN0aW9uIGlzU3RyaW5nU3RhcnQoY29kZTogbnVtYmVyLCBuZXh0OiBudW1iZXIpOiBib29sZWFuIHtcbiAgdmFyIHRhcmdldCA9IGNvZGU7XG4gIGlmICh0YXJnZXQgPT0gJEJBQ0tTTEFTSCkge1xuICAgIHRhcmdldCA9IG5leHQ7XG4gIH1cbiAgcmV0dXJuIHRhcmdldCA9PSAkRFEgfHwgdGFyZ2V0ID09ICRTUTtcbn1cblxuZnVuY3Rpb24gaXNJZGVudGlmaWVyU3RhcnQoY29kZTogbnVtYmVyLCBuZXh0OiBudW1iZXIpOiBib29sZWFuIHtcbiAgdmFyIHRhcmdldCA9IGNvZGU7XG4gIGlmICh0YXJnZXQgPT0gJE1JTlVTKSB7XG4gICAgdGFyZ2V0ID0gbmV4dDtcbiAgfVxuXG4gIHJldHVybiAoJGEgPD0gdGFyZ2V0ICYmIHRhcmdldCA8PSAkeikgfHwgKCRBIDw9IHRhcmdldCAmJiB0YXJnZXQgPD0gJFopIHx8IHRhcmdldCA9PSAkQkFDS1NMQVNIIHx8XG4gICAgICAgICB0YXJnZXQgPT0gJE1JTlVTIHx8IHRhcmdldCA9PSAkXztcbn1cblxuZnVuY3Rpb24gaXNJZGVudGlmaWVyUGFydCh0YXJnZXQ6IG51bWJlcikge1xuICByZXR1cm4gKCRhIDw9IHRhcmdldCAmJiB0YXJnZXQgPD0gJHopIHx8ICgkQSA8PSB0YXJnZXQgJiYgdGFyZ2V0IDw9ICRaKSB8fCB0YXJnZXQgPT0gJEJBQ0tTTEFTSCB8fFxuICAgICAgICAgdGFyZ2V0ID09ICRNSU5VUyB8fCB0YXJnZXQgPT0gJF8gfHwgaXNEaWdpdCh0YXJnZXQpO1xufVxuXG5mdW5jdGlvbiBpc1ZhbGlkUHNldWRvU2VsZWN0b3JDaGFyYWN0ZXIoY29kZTogbnVtYmVyKSB7XG4gIHN3aXRjaCAoY29kZSkge1xuICAgIGNhc2UgJExQQVJFTjpcbiAgICBjYXNlICRSUEFSRU46XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWRLZXlmcmFtZUJsb2NrQ2hhcmFjdGVyKGNvZGU6IG51bWJlcikge1xuICByZXR1cm4gY29kZSA9PSAkUEVSQ0VOVDtcbn1cblxuZnVuY3Rpb24gaXNWYWxpZEF0dHJpYnV0ZVNlbGVjdG9yQ2hhcmFjdGVyKGNvZGU6IG51bWJlcikge1xuICAvLyB2YWx1ZV4qfCR+PXNvbWV0aGluZ1xuICBzd2l0Y2ggKGNvZGUpIHtcbiAgICBjYXNlICQkOlxuICAgIGNhc2UgJFBJUEU6XG4gICAgY2FzZSAkQ0FSRVQ6XG4gICAgY2FzZSAkVElMREE6XG4gICAgY2FzZSAkU1RBUjpcbiAgICBjYXNlICRFUTpcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNWYWxpZFNlbGVjdG9yQ2hhcmFjdGVyKGNvZGU6IG51bWJlcikge1xuICAvLyBzZWxlY3RvciBbIGtleSAgID0gdmFsdWUgXVxuICAvLyBJREVOVCAgICBDIElERU5UIEMgSURFTlQgQ1xuICAvLyAjaWQsIC5jbGFzcywgKit+PlxuICAvLyB0YWc6UFNFVURPXG4gIHN3aXRjaCAoY29kZSkge1xuICAgIGNhc2UgJEhBU0g6XG4gICAgY2FzZSAkUEVSSU9EOlxuICAgIGNhc2UgJFRJTERBOlxuICAgIGNhc2UgJFNUQVI6XG4gICAgY2FzZSAkUExVUzpcbiAgICBjYXNlICRHVDpcbiAgICBjYXNlICRDT0xPTjpcbiAgICBjYXNlICRQSVBFOlxuICAgIGNhc2UgJENPTU1BOlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc1ZhbGlkU3R5bGVCbG9ja0NoYXJhY3Rlcihjb2RlOiBudW1iZXIpIHtcbiAgLy8ga2V5OnZhbHVlO1xuICAvLyBrZXk6Y2FsYyhzb21ldGhpbmcgLi4uIClcbiAgc3dpdGNoIChjb2RlKSB7XG4gICAgY2FzZSAkSEFTSDpcbiAgICBjYXNlICRTRU1JQ09MT046XG4gICAgY2FzZSAkQ09MT046XG4gICAgY2FzZSAkUEVSQ0VOVDpcbiAgICBjYXNlICRTTEFTSDpcbiAgICBjYXNlICRCQUNLU0xBU0g6XG4gICAgY2FzZSAkQkFORzpcbiAgICBjYXNlICRQRVJJT0Q6XG4gICAgY2FzZSAkTFBBUkVOOlxuICAgIGNhc2UgJFJQQVJFTjpcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNWYWxpZE1lZGlhUXVlcnlSdWxlQ2hhcmFjdGVyKGNvZGU6IG51bWJlcikge1xuICAvLyAobWluLXdpZHRoOiA3LjVlbSkgYW5kIChvcmllbnRhdGlvbjogbGFuZHNjYXBlKVxuICBzd2l0Y2ggKGNvZGUpIHtcbiAgICBjYXNlICRMUEFSRU46XG4gICAgY2FzZSAkUlBBUkVOOlxuICAgIGNhc2UgJENPTE9OOlxuICAgIGNhc2UgJFBFUkNFTlQ6XG4gICAgY2FzZSAkUEVSSU9EOlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc1ZhbGlkQXRSdWxlQ2hhcmFjdGVyKGNvZGU6IG51bWJlcikge1xuICAvLyBAZG9jdW1lbnQgdXJsKGh0dHA6Ly93d3cudzMub3JnL3BhZ2U/c29tZXRoaW5nPW9uI2hhc2gpLFxuICBzd2l0Y2ggKGNvZGUpIHtcbiAgICBjYXNlICRMUEFSRU46XG4gICAgY2FzZSAkUlBBUkVOOlxuICAgIGNhc2UgJENPTE9OOlxuICAgIGNhc2UgJFBFUkNFTlQ6XG4gICAgY2FzZSAkUEVSSU9EOlxuICAgIGNhc2UgJFNMQVNIOlxuICAgIGNhc2UgJEJBQ0tTTEFTSDpcbiAgICBjYXNlICRIQVNIOlxuICAgIGNhc2UgJEVROlxuICAgIGNhc2UgJFFVRVNUSU9OOlxuICAgIGNhc2UgJEFNUEVSU0FORDpcbiAgICBjYXNlICRTVEFSOlxuICAgIGNhc2UgJENPTU1BOlxuICAgIGNhc2UgJE1JTlVTOlxuICAgIGNhc2UgJFBMVVM6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWRTdHlsZUZ1bmN0aW9uQ2hhcmFjdGVyKGNvZGU6IG51bWJlcikge1xuICBzd2l0Y2ggKGNvZGUpIHtcbiAgICBjYXNlICRQRVJJT0Q6XG4gICAgY2FzZSAkTUlOVVM6XG4gICAgY2FzZSAkUExVUzpcbiAgICBjYXNlICRTVEFSOlxuICAgIGNhc2UgJFNMQVNIOlxuICAgIGNhc2UgJExQQVJFTjpcbiAgICBjYXNlICRSUEFSRU46XG4gICAgY2FzZSAkQ09NTUE6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWRCbG9ja0NoYXJhY3Rlcihjb2RlOiBudW1iZXIpIHtcbiAgLy8gQHNvbWV0aGluZyB7IH1cbiAgLy8gSURFTlRcbiAgcmV0dXJuIGNvZGUgPT0gJEFUO1xufVxuXG5mdW5jdGlvbiBpc1ZhbGlkQ3NzQ2hhcmFjdGVyKGNvZGU6IG51bWJlciwgbW9kZTogQ3NzTGV4ZXJNb2RlKTogYm9vbGVhbiB7XG4gIHN3aXRjaCAobW9kZSkge1xuICAgIGNhc2UgQ3NzTGV4ZXJNb2RlLkFMTDpcbiAgICBjYXNlIENzc0xleGVyTW9kZS5BTExfVFJBQ0tfV1M6XG4gICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIGNhc2UgQ3NzTGV4ZXJNb2RlLlNFTEVDVE9SOlxuICAgICAgcmV0dXJuIGlzVmFsaWRTZWxlY3RvckNoYXJhY3Rlcihjb2RlKTtcblxuICAgIGNhc2UgQ3NzTGV4ZXJNb2RlLlBTRVVET19TRUxFQ1RPUjpcbiAgICAgIHJldHVybiBpc1ZhbGlkUHNldWRvU2VsZWN0b3JDaGFyYWN0ZXIoY29kZSk7XG5cbiAgICBjYXNlIENzc0xleGVyTW9kZS5BVFRSSUJVVEVfU0VMRUNUT1I6XG4gICAgICByZXR1cm4gaXNWYWxpZEF0dHJpYnV0ZVNlbGVjdG9yQ2hhcmFjdGVyKGNvZGUpO1xuXG4gICAgY2FzZSBDc3NMZXhlck1vZGUuTUVESUFfUVVFUlk6XG4gICAgICByZXR1cm4gaXNWYWxpZE1lZGlhUXVlcnlSdWxlQ2hhcmFjdGVyKGNvZGUpO1xuXG4gICAgY2FzZSBDc3NMZXhlck1vZGUuQVRfUlVMRV9RVUVSWTpcbiAgICAgIHJldHVybiBpc1ZhbGlkQXRSdWxlQ2hhcmFjdGVyKGNvZGUpO1xuXG4gICAgY2FzZSBDc3NMZXhlck1vZGUuS0VZRlJBTUVfQkxPQ0s6XG4gICAgICByZXR1cm4gaXNWYWxpZEtleWZyYW1lQmxvY2tDaGFyYWN0ZXIoY29kZSk7XG5cbiAgICBjYXNlIENzc0xleGVyTW9kZS5TVFlMRV9CTE9DSzpcbiAgICBjYXNlIENzc0xleGVyTW9kZS5TVFlMRV9WQUxVRTpcbiAgICAgIHJldHVybiBpc1ZhbGlkU3R5bGVCbG9ja0NoYXJhY3Rlcihjb2RlKTtcblxuICAgIGNhc2UgQ3NzTGV4ZXJNb2RlLlNUWUxFX0NBTENfRlVOQ1RJT046XG4gICAgICByZXR1cm4gaXNWYWxpZFN0eWxlRnVuY3Rpb25DaGFyYWN0ZXIoY29kZSk7XG5cbiAgICBjYXNlIENzc0xleGVyTW9kZS5CTE9DSzpcbiAgICAgIHJldHVybiBpc1ZhbGlkQmxvY2tDaGFyYWN0ZXIoY29kZSk7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNoYXJDb2RlKGlucHV0LCBpbmRleCk6IG51bWJlciB7XG4gIHJldHVybiBpbmRleCA+PSBpbnB1dC5sZW5ndGggPyAkRU9GIDogU3RyaW5nV3JhcHBlci5jaGFyQ29kZUF0KGlucHV0LCBpbmRleCk7XG59XG5cbmZ1bmN0aW9uIGNoYXJTdHIoY29kZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgcmV0dXJuIFN0cmluZ1dyYXBwZXIuZnJvbUNoYXJDb2RlKGNvZGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNOZXdsaW5lKGNvZGUpOiBib29sZWFuIHtcbiAgc3dpdGNoIChjb2RlKSB7XG4gICAgY2FzZSAkRkY6XG4gICAgY2FzZSAkQ1I6XG4gICAgY2FzZSAkTEY6XG4gICAgY2FzZSAkVlRBQjpcbiAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
