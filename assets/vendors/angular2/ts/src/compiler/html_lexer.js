System.register(['angular2/src/facade/lang', 'angular2/src/facade/collection', './parse_util', './html_tags'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lang_1, collection_1, parse_util_1, html_tags_1;
    var HtmlTokenType, HtmlToken, HtmlTokenError, HtmlTokenizeResult, $EOF, $TAB, $LF, $FF, $CR, $SPACE, $BANG, $DQ, $HASH, $$, $AMPERSAND, $SQ, $MINUS, $SLASH, $0, $SEMICOLON, $9, $COLON, $LT, $EQ, $GT, $QUESTION, $LBRACKET, $RBRACKET, $LBRACE, $RBRACE, $COMMA, $A, $F, $X, $Z, $a, $f, $z, $x, $NBSP, CR_OR_CRLF_REGEXP, ControlFlowError, _HtmlTokenizer;
    function tokenizeHtml(sourceContent, sourceUrl, tokenizeExpansionForms) {
        if (tokenizeExpansionForms === void 0) { tokenizeExpansionForms = false; }
        return new _HtmlTokenizer(new parse_util_1.ParseSourceFile(sourceContent, sourceUrl), tokenizeExpansionForms)
            .tokenize();
    }
    exports_1("tokenizeHtml", tokenizeHtml);
    function unexpectedCharacterErrorMsg(charCode) {
        var char = charCode === $EOF ? 'EOF' : lang_1.StringWrapper.fromCharCode(charCode);
        return "Unexpected character \"" + char + "\"";
    }
    function unknownEntityErrorMsg(entitySrc) {
        return "Unknown entity \"" + entitySrc + "\" - use the \"&#<decimal>;\" or  \"&#x<hex>;\" syntax";
    }
    function isNotWhitespace(code) {
        return !isWhitespace(code) || code === $EOF;
    }
    function isWhitespace(code) {
        return (code >= $TAB && code <= $SPACE) || (code === $NBSP);
    }
    function isNameEnd(code) {
        return isWhitespace(code) || code === $GT || code === $SLASH || code === $SQ || code === $DQ ||
            code === $EQ;
    }
    function isPrefixEnd(code) {
        return (code < $a || $z < code) && (code < $A || $Z < code) && (code < $0 || code > $9);
    }
    function isDigitEntityEnd(code) {
        return code == $SEMICOLON || code == $EOF || !isAsciiHexDigit(code);
    }
    function isNamedEntityEnd(code) {
        return code == $SEMICOLON || code == $EOF || !isAsciiLetter(code);
    }
    function isSpecialFormStart(peek, nextPeek) {
        return peek === $LBRACE && nextPeek != $LBRACE;
    }
    function isAsciiLetter(code) {
        return code >= $a && code <= $z || code >= $A && code <= $Z;
    }
    function isAsciiHexDigit(code) {
        return code >= $a && code <= $f || code >= $A && code <= $F || code >= $0 && code <= $9;
    }
    function compareCharCodeCaseInsensitive(code1, code2) {
        return toUpperCaseCharCode(code1) == toUpperCaseCharCode(code2);
    }
    function toUpperCaseCharCode(code) {
        return code >= $a && code <= $z ? code - $a + $A : code;
    }
    function mergeTextTokens(srcTokens) {
        var dstTokens = [];
        var lastDstToken;
        for (var i = 0; i < srcTokens.length; i++) {
            var token = srcTokens[i];
            if (lang_1.isPresent(lastDstToken) && lastDstToken.type == HtmlTokenType.TEXT &&
                token.type == HtmlTokenType.TEXT) {
                lastDstToken.parts[0] += token.parts[0];
                lastDstToken.sourceSpan.end = token.sourceSpan.end;
            }
            else {
                lastDstToken = token;
                dstTokens.push(lastDstToken);
            }
        }
        return dstTokens;
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (parse_util_1_1) {
                parse_util_1 = parse_util_1_1;
            },
            function (html_tags_1_1) {
                html_tags_1 = html_tags_1_1;
            }],
        execute: function() {
            (function (HtmlTokenType) {
                HtmlTokenType[HtmlTokenType["TAG_OPEN_START"] = 0] = "TAG_OPEN_START";
                HtmlTokenType[HtmlTokenType["TAG_OPEN_END"] = 1] = "TAG_OPEN_END";
                HtmlTokenType[HtmlTokenType["TAG_OPEN_END_VOID"] = 2] = "TAG_OPEN_END_VOID";
                HtmlTokenType[HtmlTokenType["TAG_CLOSE"] = 3] = "TAG_CLOSE";
                HtmlTokenType[HtmlTokenType["TEXT"] = 4] = "TEXT";
                HtmlTokenType[HtmlTokenType["ESCAPABLE_RAW_TEXT"] = 5] = "ESCAPABLE_RAW_TEXT";
                HtmlTokenType[HtmlTokenType["RAW_TEXT"] = 6] = "RAW_TEXT";
                HtmlTokenType[HtmlTokenType["COMMENT_START"] = 7] = "COMMENT_START";
                HtmlTokenType[HtmlTokenType["COMMENT_END"] = 8] = "COMMENT_END";
                HtmlTokenType[HtmlTokenType["CDATA_START"] = 9] = "CDATA_START";
                HtmlTokenType[HtmlTokenType["CDATA_END"] = 10] = "CDATA_END";
                HtmlTokenType[HtmlTokenType["ATTR_NAME"] = 11] = "ATTR_NAME";
                HtmlTokenType[HtmlTokenType["ATTR_VALUE"] = 12] = "ATTR_VALUE";
                HtmlTokenType[HtmlTokenType["DOC_TYPE"] = 13] = "DOC_TYPE";
                HtmlTokenType[HtmlTokenType["EXPANSION_FORM_START"] = 14] = "EXPANSION_FORM_START";
                HtmlTokenType[HtmlTokenType["EXPANSION_CASE_VALUE"] = 15] = "EXPANSION_CASE_VALUE";
                HtmlTokenType[HtmlTokenType["EXPANSION_CASE_EXP_START"] = 16] = "EXPANSION_CASE_EXP_START";
                HtmlTokenType[HtmlTokenType["EXPANSION_CASE_EXP_END"] = 17] = "EXPANSION_CASE_EXP_END";
                HtmlTokenType[HtmlTokenType["EXPANSION_FORM_END"] = 18] = "EXPANSION_FORM_END";
                HtmlTokenType[HtmlTokenType["EOF"] = 19] = "EOF";
            })(HtmlTokenType || (HtmlTokenType = {}));
            exports_1("HtmlTokenType", HtmlTokenType);
            HtmlToken = (function () {
                function HtmlToken(type, parts, sourceSpan) {
                    this.type = type;
                    this.parts = parts;
                    this.sourceSpan = sourceSpan;
                }
                return HtmlToken;
            }());
            exports_1("HtmlToken", HtmlToken);
            HtmlTokenError = (function (_super) {
                __extends(HtmlTokenError, _super);
                function HtmlTokenError(errorMsg, tokenType, span) {
                    _super.call(this, span, errorMsg);
                    this.tokenType = tokenType;
                }
                return HtmlTokenError;
            }(parse_util_1.ParseError));
            exports_1("HtmlTokenError", HtmlTokenError);
            HtmlTokenizeResult = (function () {
                function HtmlTokenizeResult(tokens, errors) {
                    this.tokens = tokens;
                    this.errors = errors;
                }
                return HtmlTokenizeResult;
            }());
            exports_1("HtmlTokenizeResult", HtmlTokenizeResult);
            $EOF = 0;
            $TAB = 9;
            $LF = 10;
            $FF = 12;
            $CR = 13;
            $SPACE = 32;
            $BANG = 33;
            $DQ = 34;
            $HASH = 35;
            $$ = 36;
            $AMPERSAND = 38;
            $SQ = 39;
            $MINUS = 45;
            $SLASH = 47;
            $0 = 48;
            $SEMICOLON = 59;
            $9 = 57;
            $COLON = 58;
            $LT = 60;
            $EQ = 61;
            $GT = 62;
            $QUESTION = 63;
            $LBRACKET = 91;
            $RBRACKET = 93;
            $LBRACE = 123;
            $RBRACE = 125;
            $COMMA = 44;
            $A = 65;
            $F = 70;
            $X = 88;
            $Z = 90;
            $a = 97;
            $f = 102;
            $z = 122;
            $x = 120;
            $NBSP = 160;
            CR_OR_CRLF_REGEXP = /\r\n?/g;
            ControlFlowError = (function () {
                function ControlFlowError(error) {
                    this.error = error;
                }
                return ControlFlowError;
            }());
            // See http://www.w3.org/TR/html51/syntax.html#writing
            _HtmlTokenizer = (function () {
                function _HtmlTokenizer(file, tokenizeExpansionForms) {
                    this.file = file;
                    this.tokenizeExpansionForms = tokenizeExpansionForms;
                    // Note: this is always lowercase!
                    this.peek = -1;
                    this.nextPeek = -1;
                    this.index = -1;
                    this.line = 0;
                    this.column = -1;
                    this.expansionCaseStack = [];
                    this.tokens = [];
                    this.errors = [];
                    this.input = file.content;
                    this.length = file.content.length;
                    this._advance();
                }
                _HtmlTokenizer.prototype._processCarriageReturns = function (content) {
                    // http://www.w3.org/TR/html5/syntax.html#preprocessing-the-input-stream
                    // In order to keep the original position in the source, we can not
                    // pre-process it.
                    // Instead CRs are processed right before instantiating the tokens.
                    return lang_1.StringWrapper.replaceAll(content, CR_OR_CRLF_REGEXP, '\n');
                };
                _HtmlTokenizer.prototype.tokenize = function () {
                    while (this.peek !== $EOF) {
                        var start = this._getLocation();
                        try {
                            if (this._attemptCharCode($LT)) {
                                if (this._attemptCharCode($BANG)) {
                                    if (this._attemptCharCode($LBRACKET)) {
                                        this._consumeCdata(start);
                                    }
                                    else if (this._attemptCharCode($MINUS)) {
                                        this._consumeComment(start);
                                    }
                                    else {
                                        this._consumeDocType(start);
                                    }
                                }
                                else if (this._attemptCharCode($SLASH)) {
                                    this._consumeTagClose(start);
                                }
                                else {
                                    this._consumeTagOpen(start);
                                }
                            }
                            else if (isSpecialFormStart(this.peek, this.nextPeek) && this.tokenizeExpansionForms) {
                                this._consumeExpansionFormStart();
                            }
                            else if (this.peek === $EQ && this.tokenizeExpansionForms) {
                                this._consumeExpansionCaseStart();
                            }
                            else if (this.peek === $RBRACE && this.isInExpansionCase() &&
                                this.tokenizeExpansionForms) {
                                this._consumeExpansionCaseEnd();
                            }
                            else if (this.peek === $RBRACE && this.isInExpansionForm() &&
                                this.tokenizeExpansionForms) {
                                this._consumeExpansionFormEnd();
                            }
                            else {
                                this._consumeText();
                            }
                        }
                        catch (e) {
                            if (e instanceof ControlFlowError) {
                                this.errors.push(e.error);
                            }
                            else {
                                throw e;
                            }
                        }
                    }
                    this._beginToken(HtmlTokenType.EOF);
                    this._endToken([]);
                    return new HtmlTokenizeResult(mergeTextTokens(this.tokens), this.errors);
                };
                _HtmlTokenizer.prototype._getLocation = function () {
                    return new parse_util_1.ParseLocation(this.file, this.index, this.line, this.column);
                };
                _HtmlTokenizer.prototype._getSpan = function (start, end) {
                    if (lang_1.isBlank(start)) {
                        start = this._getLocation();
                    }
                    if (lang_1.isBlank(end)) {
                        end = this._getLocation();
                    }
                    return new parse_util_1.ParseSourceSpan(start, end);
                };
                _HtmlTokenizer.prototype._beginToken = function (type, start) {
                    if (start === void 0) { start = null; }
                    if (lang_1.isBlank(start)) {
                        start = this._getLocation();
                    }
                    this.currentTokenStart = start;
                    this.currentTokenType = type;
                };
                _HtmlTokenizer.prototype._endToken = function (parts, end) {
                    if (end === void 0) { end = null; }
                    if (lang_1.isBlank(end)) {
                        end = this._getLocation();
                    }
                    var token = new HtmlToken(this.currentTokenType, parts, new parse_util_1.ParseSourceSpan(this.currentTokenStart, end));
                    this.tokens.push(token);
                    this.currentTokenStart = null;
                    this.currentTokenType = null;
                    return token;
                };
                _HtmlTokenizer.prototype._createError = function (msg, span) {
                    var error = new HtmlTokenError(msg, this.currentTokenType, span);
                    this.currentTokenStart = null;
                    this.currentTokenType = null;
                    return new ControlFlowError(error);
                };
                _HtmlTokenizer.prototype._advance = function () {
                    if (this.index >= this.length) {
                        throw this._createError(unexpectedCharacterErrorMsg($EOF), this._getSpan());
                    }
                    if (this.peek === $LF) {
                        this.line++;
                        this.column = 0;
                    }
                    else if (this.peek !== $LF && this.peek !== $CR) {
                        this.column++;
                    }
                    this.index++;
                    this.peek = this.index >= this.length ? $EOF : lang_1.StringWrapper.charCodeAt(this.input, this.index);
                    this.nextPeek =
                        this.index + 1 >= this.length ? $EOF : lang_1.StringWrapper.charCodeAt(this.input, this.index + 1);
                };
                _HtmlTokenizer.prototype._attemptCharCode = function (charCode) {
                    if (this.peek === charCode) {
                        this._advance();
                        return true;
                    }
                    return false;
                };
                _HtmlTokenizer.prototype._attemptCharCodeCaseInsensitive = function (charCode) {
                    if (compareCharCodeCaseInsensitive(this.peek, charCode)) {
                        this._advance();
                        return true;
                    }
                    return false;
                };
                _HtmlTokenizer.prototype._requireCharCode = function (charCode) {
                    var location = this._getLocation();
                    if (!this._attemptCharCode(charCode)) {
                        throw this._createError(unexpectedCharacterErrorMsg(this.peek), this._getSpan(location, location));
                    }
                };
                _HtmlTokenizer.prototype._attemptStr = function (chars) {
                    for (var i = 0; i < chars.length; i++) {
                        if (!this._attemptCharCode(lang_1.StringWrapper.charCodeAt(chars, i))) {
                            return false;
                        }
                    }
                    return true;
                };
                _HtmlTokenizer.prototype._attemptStrCaseInsensitive = function (chars) {
                    for (var i = 0; i < chars.length; i++) {
                        if (!this._attemptCharCodeCaseInsensitive(lang_1.StringWrapper.charCodeAt(chars, i))) {
                            return false;
                        }
                    }
                    return true;
                };
                _HtmlTokenizer.prototype._requireStr = function (chars) {
                    var location = this._getLocation();
                    if (!this._attemptStr(chars)) {
                        throw this._createError(unexpectedCharacterErrorMsg(this.peek), this._getSpan(location));
                    }
                };
                _HtmlTokenizer.prototype._attemptCharCodeUntilFn = function (predicate) {
                    while (!predicate(this.peek)) {
                        this._advance();
                    }
                };
                _HtmlTokenizer.prototype._requireCharCodeUntilFn = function (predicate, len) {
                    var start = this._getLocation();
                    this._attemptCharCodeUntilFn(predicate);
                    if (this.index - start.offset < len) {
                        throw this._createError(unexpectedCharacterErrorMsg(this.peek), this._getSpan(start, start));
                    }
                };
                _HtmlTokenizer.prototype._attemptUntilChar = function (char) {
                    while (this.peek !== char) {
                        this._advance();
                    }
                };
                _HtmlTokenizer.prototype._readChar = function (decodeEntities) {
                    if (decodeEntities && this.peek === $AMPERSAND) {
                        return this._decodeEntity();
                    }
                    else {
                        var index = this.index;
                        this._advance();
                        return this.input[index];
                    }
                };
                _HtmlTokenizer.prototype._decodeEntity = function () {
                    var start = this._getLocation();
                    this._advance();
                    if (this._attemptCharCode($HASH)) {
                        var isHex = this._attemptCharCode($x) || this._attemptCharCode($X);
                        var numberStart = this._getLocation().offset;
                        this._attemptCharCodeUntilFn(isDigitEntityEnd);
                        if (this.peek != $SEMICOLON) {
                            throw this._createError(unexpectedCharacterErrorMsg(this.peek), this._getSpan());
                        }
                        this._advance();
                        var strNum = this.input.substring(numberStart, this.index - 1);
                        try {
                            var charCode = lang_1.NumberWrapper.parseInt(strNum, isHex ? 16 : 10);
                            return lang_1.StringWrapper.fromCharCode(charCode);
                        }
                        catch (e) {
                            var entity = this.input.substring(start.offset + 1, this.index - 1);
                            throw this._createError(unknownEntityErrorMsg(entity), this._getSpan(start));
                        }
                    }
                    else {
                        var startPosition = this._savePosition();
                        this._attemptCharCodeUntilFn(isNamedEntityEnd);
                        if (this.peek != $SEMICOLON) {
                            this._restorePosition(startPosition);
                            return '&';
                        }
                        this._advance();
                        var name_1 = this.input.substring(start.offset + 1, this.index - 1);
                        var char = html_tags_1.NAMED_ENTITIES[name_1];
                        if (lang_1.isBlank(char)) {
                            throw this._createError(unknownEntityErrorMsg(name_1), this._getSpan(start));
                        }
                        return char;
                    }
                };
                _HtmlTokenizer.prototype._consumeRawText = function (decodeEntities, firstCharOfEnd, attemptEndRest) {
                    var tagCloseStart;
                    var textStart = this._getLocation();
                    this._beginToken(decodeEntities ? HtmlTokenType.ESCAPABLE_RAW_TEXT : HtmlTokenType.RAW_TEXT, textStart);
                    var parts = [];
                    while (true) {
                        tagCloseStart = this._getLocation();
                        if (this._attemptCharCode(firstCharOfEnd) && attemptEndRest()) {
                            break;
                        }
                        if (this.index > tagCloseStart.offset) {
                            parts.push(this.input.substring(tagCloseStart.offset, this.index));
                        }
                        while (this.peek !== firstCharOfEnd) {
                            parts.push(this._readChar(decodeEntities));
                        }
                    }
                    return this._endToken([this._processCarriageReturns(parts.join(''))], tagCloseStart);
                };
                _HtmlTokenizer.prototype._consumeComment = function (start) {
                    var _this = this;
                    this._beginToken(HtmlTokenType.COMMENT_START, start);
                    this._requireCharCode($MINUS);
                    this._endToken([]);
                    var textToken = this._consumeRawText(false, $MINUS, function () { return _this._attemptStr('->'); });
                    this._beginToken(HtmlTokenType.COMMENT_END, textToken.sourceSpan.end);
                    this._endToken([]);
                };
                _HtmlTokenizer.prototype._consumeCdata = function (start) {
                    var _this = this;
                    this._beginToken(HtmlTokenType.CDATA_START, start);
                    this._requireStr('CDATA[');
                    this._endToken([]);
                    var textToken = this._consumeRawText(false, $RBRACKET, function () { return _this._attemptStr(']>'); });
                    this._beginToken(HtmlTokenType.CDATA_END, textToken.sourceSpan.end);
                    this._endToken([]);
                };
                _HtmlTokenizer.prototype._consumeDocType = function (start) {
                    this._beginToken(HtmlTokenType.DOC_TYPE, start);
                    this._attemptUntilChar($GT);
                    this._advance();
                    this._endToken([this.input.substring(start.offset + 2, this.index - 1)]);
                };
                _HtmlTokenizer.prototype._consumePrefixAndName = function () {
                    var nameOrPrefixStart = this.index;
                    var prefix = null;
                    while (this.peek !== $COLON && !isPrefixEnd(this.peek)) {
                        this._advance();
                    }
                    var nameStart;
                    if (this.peek === $COLON) {
                        this._advance();
                        prefix = this.input.substring(nameOrPrefixStart, this.index - 1);
                        nameStart = this.index;
                    }
                    else {
                        nameStart = nameOrPrefixStart;
                    }
                    this._requireCharCodeUntilFn(isNameEnd, this.index === nameStart ? 1 : 0);
                    var name = this.input.substring(nameStart, this.index);
                    return [prefix, name];
                };
                _HtmlTokenizer.prototype._consumeTagOpen = function (start) {
                    var savedPos = this._savePosition();
                    var lowercaseTagName;
                    try {
                        if (!isAsciiLetter(this.peek)) {
                            throw this._createError(unexpectedCharacterErrorMsg(this.peek), this._getSpan());
                        }
                        var nameStart = this.index;
                        this._consumeTagOpenStart(start);
                        lowercaseTagName = this.input.substring(nameStart, this.index).toLowerCase();
                        this._attemptCharCodeUntilFn(isNotWhitespace);
                        while (this.peek !== $SLASH && this.peek !== $GT) {
                            this._consumeAttributeName();
                            this._attemptCharCodeUntilFn(isNotWhitespace);
                            if (this._attemptCharCode($EQ)) {
                                this._attemptCharCodeUntilFn(isNotWhitespace);
                                this._consumeAttributeValue();
                            }
                            this._attemptCharCodeUntilFn(isNotWhitespace);
                        }
                        this._consumeTagOpenEnd();
                    }
                    catch (e) {
                        if (e instanceof ControlFlowError) {
                            // When the start tag is invalid, assume we want a "<"
                            this._restorePosition(savedPos);
                            // Back to back text tokens are merged at the end
                            this._beginToken(HtmlTokenType.TEXT, start);
                            this._endToken(['<']);
                            return;
                        }
                        throw e;
                    }
                    var contentTokenType = html_tags_1.getHtmlTagDefinition(lowercaseTagName).contentType;
                    if (contentTokenType === html_tags_1.HtmlTagContentType.RAW_TEXT) {
                        this._consumeRawTextWithTagClose(lowercaseTagName, false);
                    }
                    else if (contentTokenType === html_tags_1.HtmlTagContentType.ESCAPABLE_RAW_TEXT) {
                        this._consumeRawTextWithTagClose(lowercaseTagName, true);
                    }
                };
                _HtmlTokenizer.prototype._consumeRawTextWithTagClose = function (lowercaseTagName, decodeEntities) {
                    var _this = this;
                    var textToken = this._consumeRawText(decodeEntities, $LT, function () {
                        if (!_this._attemptCharCode($SLASH))
                            return false;
                        _this._attemptCharCodeUntilFn(isNotWhitespace);
                        if (!_this._attemptStrCaseInsensitive(lowercaseTagName))
                            return false;
                        _this._attemptCharCodeUntilFn(isNotWhitespace);
                        if (!_this._attemptCharCode($GT))
                            return false;
                        return true;
                    });
                    this._beginToken(HtmlTokenType.TAG_CLOSE, textToken.sourceSpan.end);
                    this._endToken([null, lowercaseTagName]);
                };
                _HtmlTokenizer.prototype._consumeTagOpenStart = function (start) {
                    this._beginToken(HtmlTokenType.TAG_OPEN_START, start);
                    var parts = this._consumePrefixAndName();
                    this._endToken(parts);
                };
                _HtmlTokenizer.prototype._consumeAttributeName = function () {
                    this._beginToken(HtmlTokenType.ATTR_NAME);
                    var prefixAndName = this._consumePrefixAndName();
                    this._endToken(prefixAndName);
                };
                _HtmlTokenizer.prototype._consumeAttributeValue = function () {
                    this._beginToken(HtmlTokenType.ATTR_VALUE);
                    var value;
                    if (this.peek === $SQ || this.peek === $DQ) {
                        var quoteChar = this.peek;
                        this._advance();
                        var parts = [];
                        while (this.peek !== quoteChar) {
                            parts.push(this._readChar(true));
                        }
                        value = parts.join('');
                        this._advance();
                    }
                    else {
                        var valueStart = this.index;
                        this._requireCharCodeUntilFn(isNameEnd, 1);
                        value = this.input.substring(valueStart, this.index);
                    }
                    this._endToken([this._processCarriageReturns(value)]);
                };
                _HtmlTokenizer.prototype._consumeTagOpenEnd = function () {
                    var tokenType = this._attemptCharCode($SLASH) ? HtmlTokenType.TAG_OPEN_END_VOID :
                        HtmlTokenType.TAG_OPEN_END;
                    this._beginToken(tokenType);
                    this._requireCharCode($GT);
                    this._endToken([]);
                };
                _HtmlTokenizer.prototype._consumeTagClose = function (start) {
                    this._beginToken(HtmlTokenType.TAG_CLOSE, start);
                    this._attemptCharCodeUntilFn(isNotWhitespace);
                    var prefixAndName;
                    prefixAndName = this._consumePrefixAndName();
                    this._attemptCharCodeUntilFn(isNotWhitespace);
                    this._requireCharCode($GT);
                    this._endToken(prefixAndName);
                };
                _HtmlTokenizer.prototype._consumeExpansionFormStart = function () {
                    this._beginToken(HtmlTokenType.EXPANSION_FORM_START, this._getLocation());
                    this._requireCharCode($LBRACE);
                    this._endToken([]);
                    this._beginToken(HtmlTokenType.RAW_TEXT, this._getLocation());
                    var condition = this._readUntil($COMMA);
                    this._endToken([condition], this._getLocation());
                    this._requireCharCode($COMMA);
                    this._attemptCharCodeUntilFn(isNotWhitespace);
                    this._beginToken(HtmlTokenType.RAW_TEXT, this._getLocation());
                    var type = this._readUntil($COMMA);
                    this._endToken([type], this._getLocation());
                    this._requireCharCode($COMMA);
                    this._attemptCharCodeUntilFn(isNotWhitespace);
                    this.expansionCaseStack.push(HtmlTokenType.EXPANSION_FORM_START);
                };
                _HtmlTokenizer.prototype._consumeExpansionCaseStart = function () {
                    this._requireCharCode($EQ);
                    this._beginToken(HtmlTokenType.EXPANSION_CASE_VALUE, this._getLocation());
                    var value = this._readUntil($LBRACE).trim();
                    this._endToken([value], this._getLocation());
                    this._attemptCharCodeUntilFn(isNotWhitespace);
                    this._beginToken(HtmlTokenType.EXPANSION_CASE_EXP_START, this._getLocation());
                    this._requireCharCode($LBRACE);
                    this._endToken([], this._getLocation());
                    this._attemptCharCodeUntilFn(isNotWhitespace);
                    this.expansionCaseStack.push(HtmlTokenType.EXPANSION_CASE_EXP_START);
                };
                _HtmlTokenizer.prototype._consumeExpansionCaseEnd = function () {
                    this._beginToken(HtmlTokenType.EXPANSION_CASE_EXP_END, this._getLocation());
                    this._requireCharCode($RBRACE);
                    this._endToken([], this._getLocation());
                    this._attemptCharCodeUntilFn(isNotWhitespace);
                    this.expansionCaseStack.pop();
                };
                _HtmlTokenizer.prototype._consumeExpansionFormEnd = function () {
                    this._beginToken(HtmlTokenType.EXPANSION_FORM_END, this._getLocation());
                    this._requireCharCode($RBRACE);
                    this._endToken([]);
                    this.expansionCaseStack.pop();
                };
                _HtmlTokenizer.prototype._consumeText = function () {
                    var start = this._getLocation();
                    this._beginToken(HtmlTokenType.TEXT, start);
                    var parts = [];
                    var interpolation = false;
                    if (this.peek === $LBRACE && this.nextPeek === $LBRACE) {
                        parts.push(this._readChar(true));
                        parts.push(this._readChar(true));
                        interpolation = true;
                    }
                    else {
                        parts.push(this._readChar(true));
                    }
                    while (!this.isTextEnd(interpolation)) {
                        if (this.peek === $LBRACE && this.nextPeek === $LBRACE) {
                            parts.push(this._readChar(true));
                            parts.push(this._readChar(true));
                            interpolation = true;
                        }
                        else if (this.peek === $RBRACE && this.nextPeek === $RBRACE && interpolation) {
                            parts.push(this._readChar(true));
                            parts.push(this._readChar(true));
                            interpolation = false;
                        }
                        else {
                            parts.push(this._readChar(true));
                        }
                    }
                    this._endToken([this._processCarriageReturns(parts.join(''))]);
                };
                _HtmlTokenizer.prototype.isTextEnd = function (interpolation) {
                    if (this.peek === $LT || this.peek === $EOF)
                        return true;
                    if (this.tokenizeExpansionForms) {
                        if (isSpecialFormStart(this.peek, this.nextPeek))
                            return true;
                        if (this.peek === $RBRACE && !interpolation &&
                            (this.isInExpansionCase() || this.isInExpansionForm()))
                            return true;
                    }
                    return false;
                };
                _HtmlTokenizer.prototype._savePosition = function () {
                    return [this.peek, this.index, this.column, this.line, this.tokens.length];
                };
                _HtmlTokenizer.prototype._readUntil = function (char) {
                    var start = this.index;
                    this._attemptUntilChar(char);
                    return this.input.substring(start, this.index);
                };
                _HtmlTokenizer.prototype._restorePosition = function (position) {
                    this.peek = position[0];
                    this.index = position[1];
                    this.column = position[2];
                    this.line = position[3];
                    var nbTokens = position[4];
                    if (nbTokens < this.tokens.length) {
                        // remove any extra tokens
                        this.tokens = collection_1.ListWrapper.slice(this.tokens, 0, nbTokens);
                    }
                };
                _HtmlTokenizer.prototype.isInExpansionCase = function () {
                    return this.expansionCaseStack.length > 0 &&
                        this.expansionCaseStack[this.expansionCaseStack.length - 1] ===
                            HtmlTokenType.EXPANSION_CASE_EXP_START;
                };
                _HtmlTokenizer.prototype.isInExpansionForm = function () {
                    return this.expansionCaseStack.length > 0 &&
                        this.expansionCaseStack[this.expansionCaseStack.length - 1] ===
                            HtmlTokenType.EXPANSION_FORM_START;
                };
                return _HtmlTokenizer;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9odG1sX2xleGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztzRUF3RE0sSUFBSSxFQUNKLElBQUksRUFDSixHQUFHLEVBQ0gsR0FBRyxFQUNILEdBQUcsRUFFSCxNQUFNLEVBRU4sS0FBSyxFQUNMLEdBQUcsRUFDSCxLQUFLLEVBQ0wsRUFBRSxFQUNGLFVBQVUsRUFDVixHQUFHLEVBQ0gsTUFBTSxFQUNOLE1BQU0sRUFDTixFQUFFLEVBRUYsVUFBVSxFQUVWLEVBQUUsRUFDRixNQUFNLEVBQ04sR0FBRyxFQUNILEdBQUcsRUFDSCxHQUFHLEVBQ0gsU0FBUyxFQUNULFNBQVMsRUFDVCxTQUFTLEVBQ1QsT0FBTyxFQUNQLE9BQU8sRUFDUCxNQUFNLEVBQ04sRUFBRSxFQUNGLEVBQUUsRUFDRixFQUFFLEVBQ0YsRUFBRSxFQUVGLEVBQUUsRUFDRixFQUFFLEVBQ0YsRUFBRSxFQUNGLEVBQUUsRUFFRixLQUFLLEVBRVAsaUJBQWlCO0lBakRyQixzQkFBNkIsYUFBcUIsRUFBRSxTQUFpQixFQUN4QyxzQkFBdUM7UUFBdkMsc0NBQXVDLEdBQXZDLDhCQUF1QztRQUNsRSxNQUFNLENBQUMsSUFBSSxjQUFjLENBQUMsSUFBSSw0QkFBZSxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsRUFBRSxzQkFBc0IsQ0FBQzthQUMzRixRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBSkQsdUNBSUMsQ0FBQTtJQStDRCxxQ0FBcUMsUUFBZ0I7UUFDbkQsSUFBSSxJQUFJLEdBQUcsUUFBUSxLQUFLLElBQUksR0FBRyxLQUFLLEdBQUcsb0JBQWEsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUUsTUFBTSxDQUFDLDRCQUF5QixJQUFJLE9BQUcsQ0FBQztJQUMxQyxDQUFDO0lBRUQsK0JBQStCLFNBQWlCO1FBQzlDLE1BQU0sQ0FBQyxzQkFBbUIsU0FBUywyREFBbUQsQ0FB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Q0FBQztnQkFDSCxDQUFDO2dCQUVPLDBDQUFpQixHQUF6QjtvQkFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sR0FBRyxDQUFDO3dCQUNsQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7NEJBQ3ZELGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQztnQkFDcEQsQ0FBQztnQkFFTywwQ0FBaUIsR0FBekI7b0JBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQzt3QkFDbEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDOzRCQUN2RCxhQUFhLENBQUMsb0JBQW9CLENBQUM7Z0JBQ2hELENBQUM7Z0JBQ0gscUJBQUM7WUFBRCxDQXRpQkEsQUFzaUJDLElBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL2h0bWxfbGV4ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBTdHJpbmdXcmFwcGVyLFxuICBOdW1iZXJXcmFwcGVyLFxuICBpc1ByZXNlbnQsXG4gIGlzQmxhbmssXG4gIENPTlNUX0VYUFIsXG4gIHNlcmlhbGl6ZUVudW1cbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7TGlzdFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge1BhcnNlTG9jYXRpb24sIFBhcnNlRXJyb3IsIFBhcnNlU291cmNlRmlsZSwgUGFyc2VTb3VyY2VTcGFufSBmcm9tICcuL3BhcnNlX3V0aWwnO1xuaW1wb3J0IHtnZXRIdG1sVGFnRGVmaW5pdGlvbiwgSHRtbFRhZ0NvbnRlbnRUeXBlLCBOQU1FRF9FTlRJVElFU30gZnJvbSAnLi9odG1sX3RhZ3MnO1xuXG5leHBvcnQgZW51bSBIdG1sVG9rZW5UeXBlIHtcbiAgVEFHX09QRU5fU1RBUlQsXG4gIFRBR19PUEVOX0VORCxcbiAgVEFHX09QRU5fRU5EX1ZPSUQsXG4gIFRBR19DTE9TRSxcbiAgVEVYVCxcbiAgRVNDQVBBQkxFX1JBV19URVhULFxuICBSQVdfVEVYVCxcbiAgQ09NTUVOVF9TVEFSVCxcbiAgQ09NTUVOVF9FTkQsXG4gIENEQVRBX1NUQVJULFxuICBDREFUQV9FTkQsXG4gIEFUVFJfTkFNRSxcbiAgQVRUUl9WQUxVRSxcbiAgRE9DX1RZUEUsXG4gIEVYUEFOU0lPTl9GT1JNX1NUQVJULFxuICBFWFBBTlNJT05fQ0FTRV9WQUxVRSxcbiAgRVhQQU5TSU9OX0NBU0VfRVhQX1NUQVJULFxuICBFWFBBTlNJT05fQ0FTRV9FWFBfRU5ELFxuICBFWFBBTlNJT05fRk9STV9FTkQsXG4gIEVPRlxufVxuXG5leHBvcnQgY2xhc3MgSHRtbFRva2VuIHtcbiAgY29uc3RydWN0b3IocHVibGljIHR5cGU6IEh0bWxUb2tlblR5cGUsIHB1YmxpYyBwYXJ0czogc3RyaW5nW10sXG4gICAgICAgICAgICAgIHB1YmxpYyBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBIdG1sVG9rZW5FcnJvciBleHRlbmRzIFBhcnNlRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihlcnJvck1zZzogc3RyaW5nLCBwdWJsaWMgdG9rZW5UeXBlOiBIdG1sVG9rZW5UeXBlLCBzcGFuOiBQYXJzZVNvdXJjZVNwYW4pIHtcbiAgICBzdXBlcihzcGFuLCBlcnJvck1zZyk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEh0bWxUb2tlbml6ZVJlc3VsdCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0b2tlbnM6IEh0bWxUb2tlbltdLCBwdWJsaWMgZXJyb3JzOiBIdG1sVG9rZW5FcnJvcltdKSB7fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9rZW5pemVIdG1sKHNvdXJjZUNvbnRlbnQ6IHN0cmluZywgc291cmNlVXJsOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuaXplRXhwYW5zaW9uRm9ybXM6IGJvb2xlYW4gPSBmYWxzZSk6IEh0bWxUb2tlbml6ZVJlc3VsdCB7XG4gIHJldHVybiBuZXcgX0h0bWxUb2tlbml6ZXIobmV3IFBhcnNlU291cmNlRmlsZShzb3VyY2VDb250ZW50LCBzb3VyY2VVcmwpLCB0b2tlbml6ZUV4cGFuc2lvbkZvcm1zKVxuICAgICAgLnRva2VuaXplKCk7XG59XG5cbmNvbnN0ICRFT0YgPSAwO1xuY29uc3QgJFRBQiA9IDk7XG5jb25zdCAkTEYgPSAxMDtcbmNvbnN0ICRGRiA9IDEyO1xuY29uc3QgJENSID0gMTM7XG5cbmNvbnN0ICRTUEFDRSA9IDMyO1xuXG5jb25zdCAkQkFORyA9IDMzO1xuY29uc3QgJERRID0gMzQ7XG5jb25zdCAkSEFTSCA9IDM1O1xuY29uc3QgJCQgPSAzNjtcbmNvbnN0ICRBTVBFUlNBTkQgPSAzODtcbmNvbnN0ICRTUSA9IDM5O1xuY29uc3QgJE1JTlVTID0gNDU7XG5jb25zdCAkU0xBU0ggPSA0NztcbmNvbnN0ICQwID0gNDg7XG5cbmNvbnN0ICRTRU1JQ09MT04gPSA1OTtcblxuY29uc3QgJDkgPSA1NztcbmNvbnN0ICRDT0xPTiA9IDU4O1xuY29uc3QgJExUID0gNjA7XG5jb25zdCAkRVEgPSA2MTtcbmNvbnN0ICRHVCA9IDYyO1xuY29uc3QgJFFVRVNUSU9OID0gNjM7XG5jb25zdCAkTEJSQUNLRVQgPSA5MTtcbmNvbnN0ICRSQlJBQ0tFVCA9IDkzO1xuY29uc3QgJExCUkFDRSA9IDEyMztcbmNvbnN0ICRSQlJBQ0UgPSAxMjU7XG5jb25zdCAkQ09NTUEgPSA0NDtcbmNvbnN0ICRBID0gNjU7XG5jb25zdCAkRiA9IDcwO1xuY29uc3QgJFggPSA4ODtcbmNvbnN0ICRaID0gOTA7XG5cbmNvbnN0ICRhID0gOTc7XG5jb25zdCAkZiA9IDEwMjtcbmNvbnN0ICR6ID0gMTIyO1xuY29uc3QgJHggPSAxMjA7XG5cbmNvbnN0ICROQlNQID0gMTYwO1xuXG52YXIgQ1JfT1JfQ1JMRl9SRUdFWFAgPSAvXFxyXFxuPy9nO1xuXG5mdW5jdGlvbiB1bmV4cGVjdGVkQ2hhcmFjdGVyRXJyb3JNc2coY2hhckNvZGU6IG51bWJlcik6IHN0cmluZyB7XG4gIHZhciBjaGFyID0gY2hhckNvZGUgPT09ICRFT0YgPyAnRU9GJyA6IFN0cmluZ1dyYXBwZXIuZnJvbUNoYXJDb2RlKGNoYXJDb2RlKTtcbiAgcmV0dXJuIGBVbmV4cGVjdGVkIGNoYXJhY3RlciBcIiR7Y2hhcn1cImA7XG59XG5cbmZ1bmN0aW9uIHVua25vd25FbnRpdHlFcnJvck1zZyhlbnRpdHlTcmM6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBgVW5rbm93biBlbnRpdHkgXCIke2VudGl0eVNyY31cIiAtIHVzZSB0aGUgXCImIzxkZWNpbWFsPjtcIiBvciAgXCImI3g8aGV4PjtcIiBzeW50YXhgO1xufVxuXG5jbGFzcyBDb250cm9sRmxvd0Vycm9yIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVycm9yOiBIdG1sVG9rZW5FcnJvcikge31cbn1cblxuLy8gU2VlIGh0dHA6Ly93d3cudzMub3JnL1RSL2h0bWw1MS9zeW50YXguaHRtbCN3cml0aW5nXG5jbGFzcyBfSHRtbFRva2VuaXplciB7XG4gIHByaXZhdGUgaW5wdXQ6IHN0cmluZztcbiAgcHJpdmF0ZSBsZW5ndGg6IG51bWJlcjtcbiAgLy8gTm90ZTogdGhpcyBpcyBhbHdheXMgbG93ZXJjYXNlIVxuICBwcml2YXRlIHBlZWs6IG51bWJlciA9IC0xO1xuICBwcml2YXRlIG5leHRQZWVrOiBudW1iZXIgPSAtMTtcbiAgcHJpdmF0ZSBpbmRleDogbnVtYmVyID0gLTE7XG4gIHByaXZhdGUgbGluZTogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBjb2x1bW46IG51bWJlciA9IC0xO1xuICBwcml2YXRlIGN1cnJlbnRUb2tlblN0YXJ0OiBQYXJzZUxvY2F0aW9uO1xuICBwcml2YXRlIGN1cnJlbnRUb2tlblR5cGU6IEh0bWxUb2tlblR5cGU7XG5cbiAgcHJpdmF0ZSBleHBhbnNpb25DYXNlU3RhY2sgPSBbXTtcblxuICB0b2tlbnM6IEh0bWxUb2tlbltdID0gW107XG4gIGVycm9yczogSHRtbFRva2VuRXJyb3JbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZmlsZTogUGFyc2VTb3VyY2VGaWxlLCBwcml2YXRlIHRva2VuaXplRXhwYW5zaW9uRm9ybXM6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmlucHV0ID0gZmlsZS5jb250ZW50O1xuICAgIHRoaXMubGVuZ3RoID0gZmlsZS5jb250ZW50Lmxlbmd0aDtcbiAgICB0aGlzLl9hZHZhbmNlKCk7XG4gIH1cblxuICBwcml2YXRlIF9wcm9jZXNzQ2FycmlhZ2VSZXR1cm5zKGNvbnRlbnQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDUvc3ludGF4Lmh0bWwjcHJlcHJvY2Vzc2luZy10aGUtaW5wdXQtc3RyZWFtXG4gICAgLy8gSW4gb3JkZXIgdG8ga2VlcCB0aGUgb3JpZ2luYWwgcG9zaXRpb24gaW4gdGhlIHNvdXJjZSwgd2UgY2FuIG5vdFxuICAgIC8vIHByZS1wcm9jZXNzIGl0LlxuICAgIC8vIEluc3RlYWQgQ1JzIGFyZSBwcm9jZXNzZWQgcmlnaHQgYmVmb3JlIGluc3RhbnRpYXRpbmcgdGhlIHRva2Vucy5cbiAgICByZXR1cm4gU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsKGNvbnRlbnQsIENSX09SX0NSTEZfUkVHRVhQLCAnXFxuJyk7XG4gIH1cblxuICB0b2tlbml6ZSgpOiBIdG1sVG9rZW5pemVSZXN1bHQge1xuICAgIHdoaWxlICh0aGlzLnBlZWsgIT09ICRFT0YpIHtcbiAgICAgIHZhciBzdGFydCA9IHRoaXMuX2dldExvY2F0aW9uKCk7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAodGhpcy5fYXR0ZW1wdENoYXJDb2RlKCRMVCkpIHtcbiAgICAgICAgICBpZiAodGhpcy5fYXR0ZW1wdENoYXJDb2RlKCRCQU5HKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2F0dGVtcHRDaGFyQ29kZSgkTEJSQUNLRVQpKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2NvbnN1bWVDZGF0YShzdGFydCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2F0dGVtcHRDaGFyQ29kZSgkTUlOVVMpKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2NvbnN1bWVDb21tZW50KHN0YXJ0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuX2NvbnN1bWVEb2NUeXBlKHN0YXJ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2F0dGVtcHRDaGFyQ29kZSgkU0xBU0gpKSB7XG4gICAgICAgICAgICB0aGlzLl9jb25zdW1lVGFnQ2xvc2Uoc3RhcnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jb25zdW1lVGFnT3BlbihzdGFydCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGlzU3BlY2lhbEZvcm1TdGFydCh0aGlzLnBlZWssIHRoaXMubmV4dFBlZWspICYmIHRoaXMudG9rZW5pemVFeHBhbnNpb25Gb3Jtcykge1xuICAgICAgICAgIHRoaXMuX2NvbnN1bWVFeHBhbnNpb25Gb3JtU3RhcnQoKTtcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGVlayA9PT0gJEVRICYmIHRoaXMudG9rZW5pemVFeHBhbnNpb25Gb3Jtcykge1xuICAgICAgICAgIHRoaXMuX2NvbnN1bWVFeHBhbnNpb25DYXNlU3RhcnQoKTtcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGVlayA9PT0gJFJCUkFDRSAmJiB0aGlzLmlzSW5FeHBhbnNpb25DYXNlKCkgJiZcbiAgICAgICAgICAgICAgICAgICB0aGlzLnRva2VuaXplRXhwYW5zaW9uRm9ybXMpIHtcbiAgICAgICAgICB0aGlzLl9jb25zdW1lRXhwYW5zaW9uQ2FzZUVuZCgpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wZWVrID09PSAkUkJSQUNFICYmIHRoaXMuaXNJbkV4cGFuc2lvbkZvcm0oKSAmJlxuICAgICAgICAgICAgICAgICAgIHRoaXMudG9rZW5pemVFeHBhbnNpb25Gb3Jtcykge1xuICAgICAgICAgIHRoaXMuX2NvbnN1bWVFeHBhbnNpb25Gb3JtRW5kKCk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9jb25zdW1lVGV4dCgpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChlIGluc3RhbmNlb2YgQ29udHJvbEZsb3dFcnJvcikge1xuICAgICAgICAgIHRoaXMuZXJyb3JzLnB1c2goZS5lcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9iZWdpblRva2VuKEh0bWxUb2tlblR5cGUuRU9GKTtcbiAgICB0aGlzLl9lbmRUb2tlbihbXSk7XG4gICAgcmV0dXJuIG5ldyBIdG1sVG9rZW5pemVSZXN1bHQobWVyZ2VUZXh0VG9rZW5zKHRoaXMudG9rZW5zKSwgdGhpcy5lcnJvcnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0TG9jYXRpb24oKTogUGFyc2VMb2NhdGlvbiB7XG4gICAgcmV0dXJuIG5ldyBQYXJzZUxvY2F0aW9uKHRoaXMuZmlsZSwgdGhpcy5pbmRleCwgdGhpcy5saW5lLCB0aGlzLmNvbHVtbik7XG4gIH1cblxuICBwcml2YXRlIF9nZXRTcGFuKHN0YXJ0PzogUGFyc2VMb2NhdGlvbiwgZW5kPzogUGFyc2VMb2NhdGlvbik6IFBhcnNlU291cmNlU3BhbiB7XG4gICAgaWYgKGlzQmxhbmsoc3RhcnQpKSB7XG4gICAgICBzdGFydCA9IHRoaXMuX2dldExvY2F0aW9uKCk7XG4gICAgfVxuICAgIGlmIChpc0JsYW5rKGVuZCkpIHtcbiAgICAgIGVuZCA9IHRoaXMuX2dldExvY2F0aW9uKCk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUGFyc2VTb3VyY2VTcGFuKHN0YXJ0LCBlbmQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYmVnaW5Ub2tlbih0eXBlOiBIdG1sVG9rZW5UeXBlLCBzdGFydDogUGFyc2VMb2NhdGlvbiA9IG51bGwpIHtcbiAgICBpZiAoaXNCbGFuayhzdGFydCkpIHtcbiAgICAgIHN0YXJ0ID0gdGhpcy5fZ2V0TG9jYXRpb24oKTtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50VG9rZW5TdGFydCA9IHN0YXJ0O1xuICAgIHRoaXMuY3VycmVudFRva2VuVHlwZSA9IHR5cGU7XG4gIH1cblxuICBwcml2YXRlIF9lbmRUb2tlbihwYXJ0czogc3RyaW5nW10sIGVuZDogUGFyc2VMb2NhdGlvbiA9IG51bGwpOiBIdG1sVG9rZW4ge1xuICAgIGlmIChpc0JsYW5rKGVuZCkpIHtcbiAgICAgIGVuZCA9IHRoaXMuX2dldExvY2F0aW9uKCk7XG4gICAgfVxuICAgIHZhciB0b2tlbiA9IG5ldyBIdG1sVG9rZW4odGhpcy5jdXJyZW50VG9rZW5UeXBlLCBwYXJ0cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXJzZVNvdXJjZVNwYW4odGhpcy5jdXJyZW50VG9rZW5TdGFydCwgZW5kKSk7XG4gICAgdGhpcy50b2tlbnMucHVzaCh0b2tlbik7XG4gICAgdGhpcy5jdXJyZW50VG9rZW5TdGFydCA9IG51bGw7XG4gICAgdGhpcy5jdXJyZW50VG9rZW5UeXBlID0gbnVsbDtcbiAgICByZXR1cm4gdG9rZW47XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVFcnJvcihtc2c6IHN0cmluZywgc3BhbjogUGFyc2VTb3VyY2VTcGFuKTogQ29udHJvbEZsb3dFcnJvciB7XG4gICAgdmFyIGVycm9yID0gbmV3IEh0bWxUb2tlbkVycm9yKG1zZywgdGhpcy5jdXJyZW50VG9rZW5UeXBlLCBzcGFuKTtcbiAgICB0aGlzLmN1cnJlbnRUb2tlblN0YXJ0ID0gbnVsbDtcbiAgICB0aGlzLmN1cnJlbnRUb2tlblR5cGUgPSBudWxsO1xuICAgIHJldHVybiBuZXcgQ29udHJvbEZsb3dFcnJvcihlcnJvcik7XG4gIH1cblxuICBwcml2YXRlIF9hZHZhbmNlKCkge1xuICAgIGlmICh0aGlzLmluZGV4ID49IHRoaXMubGVuZ3RoKSB7XG4gICAgICB0aHJvdyB0aGlzLl9jcmVhdGVFcnJvcih1bmV4cGVjdGVkQ2hhcmFjdGVyRXJyb3JNc2coJEVPRiksIHRoaXMuX2dldFNwYW4oKSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnBlZWsgPT09ICRMRikge1xuICAgICAgdGhpcy5saW5lKys7XG4gICAgICB0aGlzLmNvbHVtbiA9IDA7XG4gICAgfSBlbHNlIGlmICh0aGlzLnBlZWsgIT09ICRMRiAmJiB0aGlzLnBlZWsgIT09ICRDUikge1xuICAgICAgdGhpcy5jb2x1bW4rKztcbiAgICB9XG4gICAgdGhpcy5pbmRleCsrO1xuICAgIHRoaXMucGVlayA9IHRoaXMuaW5kZXggPj0gdGhpcy5sZW5ndGggPyAkRU9GIDogU3RyaW5nV3JhcHBlci5jaGFyQ29kZUF0KHRoaXMuaW5wdXQsIHRoaXMuaW5kZXgpO1xuICAgIHRoaXMubmV4dFBlZWsgPVxuICAgICAgICB0aGlzLmluZGV4ICsgMSA+PSB0aGlzLmxlbmd0aCA/ICRFT0YgOiBTdHJpbmdXcmFwcGVyLmNoYXJDb2RlQXQodGhpcy5pbnB1dCwgdGhpcy5pbmRleCArIDEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXR0ZW1wdENoYXJDb2RlKGNoYXJDb2RlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5wZWVrID09PSBjaGFyQ29kZSkge1xuICAgICAgdGhpcy5fYWR2YW5jZSgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgX2F0dGVtcHRDaGFyQ29kZUNhc2VJbnNlbnNpdGl2ZShjaGFyQ29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgaWYgKGNvbXBhcmVDaGFyQ29kZUNhc2VJbnNlbnNpdGl2ZSh0aGlzLnBlZWssIGNoYXJDb2RlKSkge1xuICAgICAgdGhpcy5fYWR2YW5jZSgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlcXVpcmVDaGFyQ29kZShjaGFyQ29kZTogbnVtYmVyKSB7XG4gICAgdmFyIGxvY2F0aW9uID0gdGhpcy5fZ2V0TG9jYXRpb24oKTtcbiAgICBpZiAoIXRoaXMuX2F0dGVtcHRDaGFyQ29kZShjaGFyQ29kZSkpIHtcbiAgICAgIHRocm93IHRoaXMuX2NyZWF0ZUVycm9yKHVuZXhwZWN0ZWRDaGFyYWN0ZXJFcnJvck1zZyh0aGlzLnBlZWspLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2V0U3Bhbihsb2NhdGlvbiwgbG9jYXRpb24pKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9hdHRlbXB0U3RyKGNoYXJzOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoIXRoaXMuX2F0dGVtcHRDaGFyQ29kZShTdHJpbmdXcmFwcGVyLmNoYXJDb2RlQXQoY2hhcnMsIGkpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXR0ZW1wdFN0ckNhc2VJbnNlbnNpdGl2ZShjaGFyczogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCF0aGlzLl9hdHRlbXB0Q2hhckNvZGVDYXNlSW5zZW5zaXRpdmUoU3RyaW5nV3JhcHBlci5jaGFyQ29kZUF0KGNoYXJzLCBpKSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlcXVpcmVTdHIoY2hhcnM6IHN0cmluZykge1xuICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuX2dldExvY2F0aW9uKCk7XG4gICAgaWYgKCF0aGlzLl9hdHRlbXB0U3RyKGNoYXJzKSkge1xuICAgICAgdGhyb3cgdGhpcy5fY3JlYXRlRXJyb3IodW5leHBlY3RlZENoYXJhY3RlckVycm9yTXNnKHRoaXMucGVlayksIHRoaXMuX2dldFNwYW4obG9jYXRpb24pKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9hdHRlbXB0Q2hhckNvZGVVbnRpbEZuKHByZWRpY2F0ZTogRnVuY3Rpb24pIHtcbiAgICB3aGlsZSAoIXByZWRpY2F0ZSh0aGlzLnBlZWspKSB7XG4gICAgICB0aGlzLl9hZHZhbmNlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcmVxdWlyZUNoYXJDb2RlVW50aWxGbihwcmVkaWNhdGU6IEZ1bmN0aW9uLCBsZW46IG51bWJlcikge1xuICAgIHZhciBzdGFydCA9IHRoaXMuX2dldExvY2F0aW9uKCk7XG4gICAgdGhpcy5fYXR0ZW1wdENoYXJDb2RlVW50aWxGbihwcmVkaWNhdGUpO1xuICAgIGlmICh0aGlzLmluZGV4IC0gc3RhcnQub2Zmc2V0IDwgbGVuKSB7XG4gICAgICB0aHJvdyB0aGlzLl9jcmVhdGVFcnJvcih1bmV4cGVjdGVkQ2hhcmFjdGVyRXJyb3JNc2codGhpcy5wZWVrKSwgdGhpcy5fZ2V0U3BhbihzdGFydCwgc3RhcnQpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9hdHRlbXB0VW50aWxDaGFyKGNoYXI6IG51bWJlcikge1xuICAgIHdoaWxlICh0aGlzLnBlZWsgIT09IGNoYXIpIHtcbiAgICAgIHRoaXMuX2FkdmFuY2UoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZWFkQ2hhcihkZWNvZGVFbnRpdGllczogYm9vbGVhbik6IHN0cmluZyB7XG4gICAgaWYgKGRlY29kZUVudGl0aWVzICYmIHRoaXMucGVlayA9PT0gJEFNUEVSU0FORCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2RlY29kZUVudGl0eSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgaW5kZXggPSB0aGlzLmluZGV4O1xuICAgICAgdGhpcy5fYWR2YW5jZSgpO1xuICAgICAgcmV0dXJuIHRoaXMuaW5wdXRbaW5kZXhdO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2RlY29kZUVudGl0eSgpOiBzdHJpbmcge1xuICAgIHZhciBzdGFydCA9IHRoaXMuX2dldExvY2F0aW9uKCk7XG4gICAgdGhpcy5fYWR2YW5jZSgpO1xuICAgIGlmICh0aGlzLl9hdHRlbXB0Q2hhckNvZGUoJEhBU0gpKSB7XG4gICAgICBsZXQgaXNIZXggPSB0aGlzLl9hdHRlbXB0Q2hhckNvZGUoJHgpIHx8IHRoaXMuX2F0dGVtcHRDaGFyQ29kZSgkWCk7XG4gICAgICBsZXQgbnVtYmVyU3RhcnQgPSB0aGlzLl9nZXRMb2NhdGlvbigpLm9mZnNldDtcbiAgICAgIHRoaXMuX2F0dGVtcHRDaGFyQ29kZVVudGlsRm4oaXNEaWdpdEVudGl0eUVuZCk7XG4gICAgICBpZiAodGhpcy5wZWVrICE9ICRTRU1JQ09MT04pIHtcbiAgICAgICAgdGhyb3cgdGhpcy5fY3JlYXRlRXJyb3IodW5leHBlY3RlZENoYXJhY3RlckVycm9yTXNnKHRoaXMucGVlayksIHRoaXMuX2dldFNwYW4oKSk7XG4gICAgICB9XG4gICAgICB0aGlzLl9hZHZhbmNlKCk7XG4gICAgICBsZXQgc3RyTnVtID0gdGhpcy5pbnB1dC5zdWJzdHJpbmcobnVtYmVyU3RhcnQsIHRoaXMuaW5kZXggLSAxKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGxldCBjaGFyQ29kZSA9IE51bWJlcldyYXBwZXIucGFyc2VJbnQoc3RyTnVtLCBpc0hleCA/IDE2IDogMTApO1xuICAgICAgICByZXR1cm4gU3RyaW5nV3JhcHBlci5mcm9tQ2hhckNvZGUoY2hhckNvZGUpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBsZXQgZW50aXR5ID0gdGhpcy5pbnB1dC5zdWJzdHJpbmcoc3RhcnQub2Zmc2V0ICsgMSwgdGhpcy5pbmRleCAtIDEpO1xuICAgICAgICB0aHJvdyB0aGlzLl9jcmVhdGVFcnJvcih1bmtub3duRW50aXR5RXJyb3JNc2coZW50aXR5KSwgdGhpcy5fZ2V0U3BhbihzdGFydCkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgc3RhcnRQb3NpdGlvbiA9IHRoaXMuX3NhdmVQb3NpdGlvbigpO1xuICAgICAgdGhpcy5fYXR0ZW1wdENoYXJDb2RlVW50aWxGbihpc05hbWVkRW50aXR5RW5kKTtcbiAgICAgIGlmICh0aGlzLnBlZWsgIT0gJFNFTUlDT0xPTikge1xuICAgICAgICB0aGlzLl9yZXN0b3JlUG9zaXRpb24oc3RhcnRQb3NpdGlvbik7XG4gICAgICAgIHJldHVybiAnJic7XG4gICAgICB9XG4gICAgICB0aGlzLl9hZHZhbmNlKCk7XG4gICAgICBsZXQgbmFtZSA9IHRoaXMuaW5wdXQuc3Vic3RyaW5nKHN0YXJ0Lm9mZnNldCArIDEsIHRoaXMuaW5kZXggLSAxKTtcbiAgICAgIGxldCBjaGFyID0gTkFNRURfRU5USVRJRVNbbmFtZV07XG4gICAgICBpZiAoaXNCbGFuayhjaGFyKSkge1xuICAgICAgICB0aHJvdyB0aGlzLl9jcmVhdGVFcnJvcih1bmtub3duRW50aXR5RXJyb3JNc2cobmFtZSksIHRoaXMuX2dldFNwYW4oc3RhcnQpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjaGFyO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NvbnN1bWVSYXdUZXh0KGRlY29kZUVudGl0aWVzOiBib29sZWFuLCBmaXJzdENoYXJPZkVuZDogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRlbXB0RW5kUmVzdDogRnVuY3Rpb24pOiBIdG1sVG9rZW4ge1xuICAgIHZhciB0YWdDbG9zZVN0YXJ0O1xuICAgIHZhciB0ZXh0U3RhcnQgPSB0aGlzLl9nZXRMb2NhdGlvbigpO1xuICAgIHRoaXMuX2JlZ2luVG9rZW4oZGVjb2RlRW50aXRpZXMgPyBIdG1sVG9rZW5UeXBlLkVTQ0FQQUJMRV9SQVdfVEVYVCA6IEh0bWxUb2tlblR5cGUuUkFXX1RFWFQsXG4gICAgICAgICAgICAgICAgICAgICB0ZXh0U3RhcnQpO1xuICAgIHZhciBwYXJ0cyA9IFtdO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICB0YWdDbG9zZVN0YXJ0ID0gdGhpcy5fZ2V0TG9jYXRpb24oKTtcbiAgICAgIGlmICh0aGlzLl9hdHRlbXB0Q2hhckNvZGUoZmlyc3RDaGFyT2ZFbmQpICYmIGF0dGVtcHRFbmRSZXN0KCkpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5pbmRleCA+IHRhZ0Nsb3NlU3RhcnQub2Zmc2V0KSB7XG4gICAgICAgIHBhcnRzLnB1c2godGhpcy5pbnB1dC5zdWJzdHJpbmcodGFnQ2xvc2VTdGFydC5vZmZzZXQsIHRoaXMuaW5kZXgpKTtcbiAgICAgIH1cbiAgICAgIHdoaWxlICh0aGlzLnBlZWsgIT09IGZpcnN0Q2hhck9mRW5kKSB7XG4gICAgICAgIHBhcnRzLnB1c2godGhpcy5fcmVhZENoYXIoZGVjb2RlRW50aXRpZXMpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2VuZFRva2VuKFt0aGlzLl9wcm9jZXNzQ2FycmlhZ2VSZXR1cm5zKHBhcnRzLmpvaW4oJycpKV0sIHRhZ0Nsb3NlU3RhcnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29uc3VtZUNvbW1lbnQoc3RhcnQ6IFBhcnNlTG9jYXRpb24pIHtcbiAgICB0aGlzLl9iZWdpblRva2VuKEh0bWxUb2tlblR5cGUuQ09NTUVOVF9TVEFSVCwgc3RhcnQpO1xuICAgIHRoaXMuX3JlcXVpcmVDaGFyQ29kZSgkTUlOVVMpO1xuICAgIHRoaXMuX2VuZFRva2VuKFtdKTtcbiAgICB2YXIgdGV4dFRva2VuID0gdGhpcy5fY29uc3VtZVJhd1RleHQoZmFsc2UsICRNSU5VUywgKCkgPT4gdGhpcy5fYXR0ZW1wdFN0cignLT4nKSk7XG4gICAgdGhpcy5fYmVnaW5Ub2tlbihIdG1sVG9rZW5UeXBlLkNPTU1FTlRfRU5ELCB0ZXh0VG9rZW4uc291cmNlU3Bhbi5lbmQpO1xuICAgIHRoaXMuX2VuZFRva2VuKFtdKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnN1bWVDZGF0YShzdGFydDogUGFyc2VMb2NhdGlvbikge1xuICAgIHRoaXMuX2JlZ2luVG9rZW4oSHRtbFRva2VuVHlwZS5DREFUQV9TVEFSVCwgc3RhcnQpO1xuICAgIHRoaXMuX3JlcXVpcmVTdHIoJ0NEQVRBWycpO1xuICAgIHRoaXMuX2VuZFRva2VuKFtdKTtcbiAgICB2YXIgdGV4dFRva2VuID0gdGhpcy5fY29uc3VtZVJhd1RleHQoZmFsc2UsICRSQlJBQ0tFVCwgKCkgPT4gdGhpcy5fYXR0ZW1wdFN0cignXT4nKSk7XG4gICAgdGhpcy5fYmVnaW5Ub2tlbihIdG1sVG9rZW5UeXBlLkNEQVRBX0VORCwgdGV4dFRva2VuLnNvdXJjZVNwYW4uZW5kKTtcbiAgICB0aGlzLl9lbmRUb2tlbihbXSk7XG4gIH1cblxuICBwcml2YXRlIF9jb25zdW1lRG9jVHlwZShzdGFydDogUGFyc2VMb2NhdGlvbikge1xuICAgIHRoaXMuX2JlZ2luVG9rZW4oSHRtbFRva2VuVHlwZS5ET0NfVFlQRSwgc3RhcnQpO1xuICAgIHRoaXMuX2F0dGVtcHRVbnRpbENoYXIoJEdUKTtcbiAgICB0aGlzLl9hZHZhbmNlKCk7XG4gICAgdGhpcy5fZW5kVG9rZW4oW3RoaXMuaW5wdXQuc3Vic3RyaW5nKHN0YXJ0Lm9mZnNldCArIDIsIHRoaXMuaW5kZXggLSAxKV0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29uc3VtZVByZWZpeEFuZE5hbWUoKTogc3RyaW5nW10ge1xuICAgIHZhciBuYW1lT3JQcmVmaXhTdGFydCA9IHRoaXMuaW5kZXg7XG4gICAgdmFyIHByZWZpeCA9IG51bGw7XG4gICAgd2hpbGUgKHRoaXMucGVlayAhPT0gJENPTE9OICYmICFpc1ByZWZpeEVuZCh0aGlzLnBlZWspKSB7XG4gICAgICB0aGlzLl9hZHZhbmNlKCk7XG4gICAgfVxuICAgIHZhciBuYW1lU3RhcnQ7XG4gICAgaWYgKHRoaXMucGVlayA9PT0gJENPTE9OKSB7XG4gICAgICB0aGlzLl9hZHZhbmNlKCk7XG4gICAgICBwcmVmaXggPSB0aGlzLmlucHV0LnN1YnN0cmluZyhuYW1lT3JQcmVmaXhTdGFydCwgdGhpcy5pbmRleCAtIDEpO1xuICAgICAgbmFtZVN0YXJ0ID0gdGhpcy5pbmRleDtcbiAgICB9IGVsc2Uge1xuICAgICAgbmFtZVN0YXJ0ID0gbmFtZU9yUHJlZml4U3RhcnQ7XG4gICAgfVxuICAgIHRoaXMuX3JlcXVpcmVDaGFyQ29kZVVudGlsRm4oaXNOYW1lRW5kLCB0aGlzLmluZGV4ID09PSBuYW1lU3RhcnQgPyAxIDogMCk7XG4gICAgdmFyIG5hbWUgPSB0aGlzLmlucHV0LnN1YnN0cmluZyhuYW1lU3RhcnQsIHRoaXMuaW5kZXgpO1xuICAgIHJldHVybiBbcHJlZml4LCBuYW1lXTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnN1bWVUYWdPcGVuKHN0YXJ0OiBQYXJzZUxvY2F0aW9uKSB7XG4gICAgbGV0IHNhdmVkUG9zID0gdGhpcy5fc2F2ZVBvc2l0aW9uKCk7XG4gICAgbGV0IGxvd2VyY2FzZVRhZ05hbWU7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghaXNBc2NpaUxldHRlcih0aGlzLnBlZWspKSB7XG4gICAgICAgIHRocm93IHRoaXMuX2NyZWF0ZUVycm9yKHVuZXhwZWN0ZWRDaGFyYWN0ZXJFcnJvck1zZyh0aGlzLnBlZWspLCB0aGlzLl9nZXRTcGFuKCkpO1xuICAgICAgfVxuICAgICAgdmFyIG5hbWVTdGFydCA9IHRoaXMuaW5kZXg7XG4gICAgICB0aGlzLl9jb25zdW1lVGFnT3BlblN0YXJ0KHN0YXJ0KTtcbiAgICAgIGxvd2VyY2FzZVRhZ05hbWUgPSB0aGlzLmlucHV0LnN1YnN0cmluZyhuYW1lU3RhcnQsIHRoaXMuaW5kZXgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICB0aGlzLl9hdHRlbXB0Q2hhckNvZGVVbnRpbEZuKGlzTm90V2hpdGVzcGFjZSk7XG4gICAgICB3aGlsZSAodGhpcy5wZWVrICE9PSAkU0xBU0ggJiYgdGhpcy5wZWVrICE9PSAkR1QpIHtcbiAgICAgICAgdGhpcy5fY29uc3VtZUF0dHJpYnV0ZU5hbWUoKTtcbiAgICAgICAgdGhpcy5fYXR0ZW1wdENoYXJDb2RlVW50aWxGbihpc05vdFdoaXRlc3BhY2UpO1xuICAgICAgICBpZiAodGhpcy5fYXR0ZW1wdENoYXJDb2RlKCRFUSkpIHtcbiAgICAgICAgICB0aGlzLl9hdHRlbXB0Q2hhckNvZGVVbnRpbEZuKGlzTm90V2hpdGVzcGFjZSk7XG4gICAgICAgICAgdGhpcy5fY29uc3VtZUF0dHJpYnV0ZVZhbHVlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYXR0ZW1wdENoYXJDb2RlVW50aWxGbihpc05vdFdoaXRlc3BhY2UpO1xuICAgICAgfVxuICAgICAgdGhpcy5fY29uc3VtZVRhZ09wZW5FbmQoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZSBpbnN0YW5jZW9mIENvbnRyb2xGbG93RXJyb3IpIHtcbiAgICAgICAgLy8gV2hlbiB0aGUgc3RhcnQgdGFnIGlzIGludmFsaWQsIGFzc3VtZSB3ZSB3YW50IGEgXCI8XCJcbiAgICAgICAgdGhpcy5fcmVzdG9yZVBvc2l0aW9uKHNhdmVkUG9zKTtcbiAgICAgICAgLy8gQmFjayB0byBiYWNrIHRleHQgdG9rZW5zIGFyZSBtZXJnZWQgYXQgdGhlIGVuZFxuICAgICAgICB0aGlzLl9iZWdpblRva2VuKEh0bWxUb2tlblR5cGUuVEVYVCwgc3RhcnQpO1xuICAgICAgICB0aGlzLl9lbmRUb2tlbihbJzwnXSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhyb3cgZTtcbiAgICB9XG5cbiAgICB2YXIgY29udGVudFRva2VuVHlwZSA9IGdldEh0bWxUYWdEZWZpbml0aW9uKGxvd2VyY2FzZVRhZ05hbWUpLmNvbnRlbnRUeXBlO1xuICAgIGlmIChjb250ZW50VG9rZW5UeXBlID09PSBIdG1sVGFnQ29udGVudFR5cGUuUkFXX1RFWFQpIHtcbiAgICAgIHRoaXMuX2NvbnN1bWVSYXdUZXh0V2l0aFRhZ0Nsb3NlKGxvd2VyY2FzZVRhZ05hbWUsIGZhbHNlKTtcbiAgICB9IGVsc2UgaWYgKGNvbnRlbnRUb2tlblR5cGUgPT09IEh0bWxUYWdDb250ZW50VHlwZS5FU0NBUEFCTEVfUkFXX1RFWFQpIHtcbiAgICAgIHRoaXMuX2NvbnN1bWVSYXdUZXh0V2l0aFRhZ0Nsb3NlKGxvd2VyY2FzZVRhZ05hbWUsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NvbnN1bWVSYXdUZXh0V2l0aFRhZ0Nsb3NlKGxvd2VyY2FzZVRhZ05hbWU6IHN0cmluZywgZGVjb2RlRW50aXRpZXM6IGJvb2xlYW4pIHtcbiAgICB2YXIgdGV4dFRva2VuID0gdGhpcy5fY29uc3VtZVJhd1RleHQoZGVjb2RlRW50aXRpZXMsICRMVCwgKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLl9hdHRlbXB0Q2hhckNvZGUoJFNMQVNIKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgdGhpcy5fYXR0ZW1wdENoYXJDb2RlVW50aWxGbihpc05vdFdoaXRlc3BhY2UpO1xuICAgICAgaWYgKCF0aGlzLl9hdHRlbXB0U3RyQ2FzZUluc2Vuc2l0aXZlKGxvd2VyY2FzZVRhZ05hbWUpKSByZXR1cm4gZmFsc2U7XG4gICAgICB0aGlzLl9hdHRlbXB0Q2hhckNvZGVVbnRpbEZuKGlzTm90V2hpdGVzcGFjZSk7XG4gICAgICBpZiAoIXRoaXMuX2F0dGVtcHRDaGFyQ29kZSgkR1QpKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgICB0aGlzLl9iZWdpblRva2VuKEh0bWxUb2tlblR5cGUuVEFHX0NMT1NFLCB0ZXh0VG9rZW4uc291cmNlU3Bhbi5lbmQpO1xuICAgIHRoaXMuX2VuZFRva2VuKFtudWxsLCBsb3dlcmNhc2VUYWdOYW1lXSk7XG4gIH1cblxuICBwcml2YXRlIF9jb25zdW1lVGFnT3BlblN0YXJ0KHN0YXJ0OiBQYXJzZUxvY2F0aW9uKSB7XG4gICAgdGhpcy5fYmVnaW5Ub2tlbihIdG1sVG9rZW5UeXBlLlRBR19PUEVOX1NUQVJULCBzdGFydCk7XG4gICAgdmFyIHBhcnRzID0gdGhpcy5fY29uc3VtZVByZWZpeEFuZE5hbWUoKTtcbiAgICB0aGlzLl9lbmRUb2tlbihwYXJ0cyk7XG4gIH1cblxuICBwcml2YXRlIF9jb25zdW1lQXR0cmlidXRlTmFtZSgpIHtcbiAgICB0aGlzLl9iZWdpblRva2VuKEh0bWxUb2tlblR5cGUuQVRUUl9OQU1FKTtcbiAgICB2YXIgcHJlZml4QW5kTmFtZSA9IHRoaXMuX2NvbnN1bWVQcmVmaXhBbmROYW1lKCk7XG4gICAgdGhpcy5fZW5kVG9rZW4ocHJlZml4QW5kTmFtZSk7XG4gIH1cblxuICBwcml2YXRlIF9jb25zdW1lQXR0cmlidXRlVmFsdWUoKSB7XG4gICAgdGhpcy5fYmVnaW5Ub2tlbihIdG1sVG9rZW5UeXBlLkFUVFJfVkFMVUUpO1xuICAgIHZhciB2YWx1ZTtcbiAgICBpZiAodGhpcy5wZWVrID09PSAkU1EgfHwgdGhpcy5wZWVrID09PSAkRFEpIHtcbiAgICAgIHZhciBxdW90ZUNoYXIgPSB0aGlzLnBlZWs7XG4gICAgICB0aGlzLl9hZHZhbmNlKCk7XG4gICAgICB2YXIgcGFydHMgPSBbXTtcbiAgICAgIHdoaWxlICh0aGlzLnBlZWsgIT09IHF1b3RlQ2hhcikge1xuICAgICAgICBwYXJ0cy5wdXNoKHRoaXMuX3JlYWRDaGFyKHRydWUpKTtcbiAgICAgIH1cbiAgICAgIHZhbHVlID0gcGFydHMuam9pbignJyk7XG4gICAgICB0aGlzLl9hZHZhbmNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB2YWx1ZVN0YXJ0ID0gdGhpcy5pbmRleDtcbiAgICAgIHRoaXMuX3JlcXVpcmVDaGFyQ29kZVVudGlsRm4oaXNOYW1lRW5kLCAxKTtcbiAgICAgIHZhbHVlID0gdGhpcy5pbnB1dC5zdWJzdHJpbmcodmFsdWVTdGFydCwgdGhpcy5pbmRleCk7XG4gICAgfVxuICAgIHRoaXMuX2VuZFRva2VuKFt0aGlzLl9wcm9jZXNzQ2FycmlhZ2VSZXR1cm5zKHZhbHVlKV0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29uc3VtZVRhZ09wZW5FbmQoKSB7XG4gICAgdmFyIHRva2VuVHlwZSA9IHRoaXMuX2F0dGVtcHRDaGFyQ29kZSgkU0xBU0gpID8gSHRtbFRva2VuVHlwZS5UQUdfT1BFTl9FTkRfVk9JRCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSHRtbFRva2VuVHlwZS5UQUdfT1BFTl9FTkQ7XG4gICAgdGhpcy5fYmVnaW5Ub2tlbih0b2tlblR5cGUpO1xuICAgIHRoaXMuX3JlcXVpcmVDaGFyQ29kZSgkR1QpO1xuICAgIHRoaXMuX2VuZFRva2VuKFtdKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnN1bWVUYWdDbG9zZShzdGFydDogUGFyc2VMb2NhdGlvbikge1xuICAgIHRoaXMuX2JlZ2luVG9rZW4oSHRtbFRva2VuVHlwZS5UQUdfQ0xPU0UsIHN0YXJ0KTtcbiAgICB0aGlzLl9hdHRlbXB0Q2hhckNvZGVVbnRpbEZuKGlzTm90V2hpdGVzcGFjZSk7XG4gICAgdmFyIHByZWZpeEFuZE5hbWU7XG4gICAgcHJlZml4QW5kTmFtZSA9IHRoaXMuX2NvbnN1bWVQcmVmaXhBbmROYW1lKCk7XG4gICAgdGhpcy5fYXR0ZW1wdENoYXJDb2RlVW50aWxGbihpc05vdFdoaXRlc3BhY2UpO1xuICAgIHRoaXMuX3JlcXVpcmVDaGFyQ29kZSgkR1QpO1xuICAgIHRoaXMuX2VuZFRva2VuKHByZWZpeEFuZE5hbWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29uc3VtZUV4cGFuc2lvbkZvcm1TdGFydCgpIHtcbiAgICB0aGlzLl9iZWdpblRva2VuKEh0bWxUb2tlblR5cGUuRVhQQU5TSU9OX0ZPUk1fU1RBUlQsIHRoaXMuX2dldExvY2F0aW9uKCkpO1xuICAgIHRoaXMuX3JlcXVpcmVDaGFyQ29kZSgkTEJSQUNFKTtcbiAgICB0aGlzLl9lbmRUb2tlbihbXSk7XG5cbiAgICB0aGlzLl9iZWdpblRva2VuKEh0bWxUb2tlblR5cGUuUkFXX1RFWFQsIHRoaXMuX2dldExvY2F0aW9uKCkpO1xuICAgIGxldCBjb25kaXRpb24gPSB0aGlzLl9yZWFkVW50aWwoJENPTU1BKTtcbiAgICB0aGlzLl9lbmRUb2tlbihbY29uZGl0aW9uXSwgdGhpcy5fZ2V0TG9jYXRpb24oKSk7XG4gICAgdGhpcy5fcmVxdWlyZUNoYXJDb2RlKCRDT01NQSk7XG4gICAgdGhpcy5fYXR0ZW1wdENoYXJDb2RlVW50aWxGbihpc05vdFdoaXRlc3BhY2UpO1xuXG4gICAgdGhpcy5fYmVnaW5Ub2tlbihIdG1sVG9rZW5UeXBlLlJBV19URVhULCB0aGlzLl9nZXRMb2NhdGlvbigpKTtcbiAgICBsZXQgdHlwZSA9IHRoaXMuX3JlYWRVbnRpbCgkQ09NTUEpO1xuICAgIHRoaXMuX2VuZFRva2VuKFt0eXBlXSwgdGhpcy5fZ2V0TG9jYXRpb24oKSk7XG4gICAgdGhpcy5fcmVxdWlyZUNoYXJDb2RlKCRDT01NQSk7XG4gICAgdGhpcy5fYXR0ZW1wdENoYXJDb2RlVW50aWxGbihpc05vdFdoaXRlc3BhY2UpO1xuXG4gICAgdGhpcy5leHBhbnNpb25DYXNlU3RhY2sucHVzaChIdG1sVG9rZW5UeXBlLkVYUEFOU0lPTl9GT1JNX1NUQVJUKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnN1bWVFeHBhbnNpb25DYXNlU3RhcnQoKSB7XG4gICAgdGhpcy5fcmVxdWlyZUNoYXJDb2RlKCRFUSk7XG5cbiAgICB0aGlzLl9iZWdpblRva2VuKEh0bWxUb2tlblR5cGUuRVhQQU5TSU9OX0NBU0VfVkFMVUUsIHRoaXMuX2dldExvY2F0aW9uKCkpO1xuICAgIGxldCB2YWx1ZSA9IHRoaXMuX3JlYWRVbnRpbCgkTEJSQUNFKS50cmltKCk7XG4gICAgdGhpcy5fZW5kVG9rZW4oW3ZhbHVlXSwgdGhpcy5fZ2V0TG9jYXRpb24oKSk7XG4gICAgdGhpcy5fYXR0ZW1wdENoYXJDb2RlVW50aWxGbihpc05vdFdoaXRlc3BhY2UpO1xuXG4gICAgdGhpcy5fYmVnaW5Ub2tlbihIdG1sVG9rZW5UeXBlLkVYUEFOU0lPTl9DQVNFX0VYUF9TVEFSVCwgdGhpcy5fZ2V0TG9jYXRpb24oKSk7XG4gICAgdGhpcy5fcmVxdWlyZUNoYXJDb2RlKCRMQlJBQ0UpO1xuICAgIHRoaXMuX2VuZFRva2VuKFtdLCB0aGlzLl9nZXRMb2NhdGlvbigpKTtcbiAgICB0aGlzLl9hdHRlbXB0Q2hhckNvZGVVbnRpbEZuKGlzTm90V2hpdGVzcGFjZSk7XG5cbiAgICB0aGlzLmV4cGFuc2lvbkNhc2VTdGFjay5wdXNoKEh0bWxUb2tlblR5cGUuRVhQQU5TSU9OX0NBU0VfRVhQX1NUQVJUKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnN1bWVFeHBhbnNpb25DYXNlRW5kKCkge1xuICAgIHRoaXMuX2JlZ2luVG9rZW4oSHRtbFRva2VuVHlwZS5FWFBBTlNJT05fQ0FTRV9FWFBfRU5ELCB0aGlzLl9nZXRMb2NhdGlvbigpKTtcbiAgICB0aGlzLl9yZXF1aXJlQ2hhckNvZGUoJFJCUkFDRSk7XG4gICAgdGhpcy5fZW5kVG9rZW4oW10sIHRoaXMuX2dldExvY2F0aW9uKCkpO1xuICAgIHRoaXMuX2F0dGVtcHRDaGFyQ29kZVVudGlsRm4oaXNOb3RXaGl0ZXNwYWNlKTtcblxuICAgIHRoaXMuZXhwYW5zaW9uQ2FzZVN0YWNrLnBvcCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29uc3VtZUV4cGFuc2lvbkZvcm1FbmQoKSB7XG4gICAgdGhpcy5fYmVnaW5Ub2tlbihIdG1sVG9rZW5UeXBlLkVYUEFOU0lPTl9GT1JNX0VORCwgdGhpcy5fZ2V0TG9jYXRpb24oKSk7XG4gICAgdGhpcy5fcmVxdWlyZUNoYXJDb2RlKCRSQlJBQ0UpO1xuICAgIHRoaXMuX2VuZFRva2VuKFtdKTtcblxuICAgIHRoaXMuZXhwYW5zaW9uQ2FzZVN0YWNrLnBvcCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29uc3VtZVRleHQoKSB7XG4gICAgdmFyIHN0YXJ0ID0gdGhpcy5fZ2V0TG9jYXRpb24oKTtcbiAgICB0aGlzLl9iZWdpblRva2VuKEh0bWxUb2tlblR5cGUuVEVYVCwgc3RhcnQpO1xuXG4gICAgdmFyIHBhcnRzID0gW107XG4gICAgbGV0IGludGVycG9sYXRpb24gPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLnBlZWsgPT09ICRMQlJBQ0UgJiYgdGhpcy5uZXh0UGVlayA9PT0gJExCUkFDRSkge1xuICAgICAgcGFydHMucHVzaCh0aGlzLl9yZWFkQ2hhcih0cnVlKSk7XG4gICAgICBwYXJ0cy5wdXNoKHRoaXMuX3JlYWRDaGFyKHRydWUpKTtcbiAgICAgIGludGVycG9sYXRpb24gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0cy5wdXNoKHRoaXMuX3JlYWRDaGFyKHRydWUpKTtcbiAgICB9XG5cbiAgICB3aGlsZSAoIXRoaXMuaXNUZXh0RW5kKGludGVycG9sYXRpb24pKSB7XG4gICAgICBpZiAodGhpcy5wZWVrID09PSAkTEJSQUNFICYmIHRoaXMubmV4dFBlZWsgPT09ICRMQlJBQ0UpIHtcbiAgICAgICAgcGFydHMucHVzaCh0aGlzLl9yZWFkQ2hhcih0cnVlKSk7XG4gICAgICAgIHBhcnRzLnB1c2godGhpcy5fcmVhZENoYXIodHJ1ZSkpO1xuICAgICAgICBpbnRlcnBvbGF0aW9uID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wZWVrID09PSAkUkJSQUNFICYmIHRoaXMubmV4dFBlZWsgPT09ICRSQlJBQ0UgJiYgaW50ZXJwb2xhdGlvbikge1xuICAgICAgICBwYXJ0cy5wdXNoKHRoaXMuX3JlYWRDaGFyKHRydWUpKTtcbiAgICAgICAgcGFydHMucHVzaCh0aGlzLl9yZWFkQ2hhcih0cnVlKSk7XG4gICAgICAgIGludGVycG9sYXRpb24gPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnRzLnB1c2godGhpcy5fcmVhZENoYXIodHJ1ZSkpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9lbmRUb2tlbihbdGhpcy5fcHJvY2Vzc0NhcnJpYWdlUmV0dXJucyhwYXJ0cy5qb2luKCcnKSldKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNUZXh0RW5kKGludGVycG9sYXRpb246IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5wZWVrID09PSAkTFQgfHwgdGhpcy5wZWVrID09PSAkRU9GKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAodGhpcy50b2tlbml6ZUV4cGFuc2lvbkZvcm1zKSB7XG4gICAgICBpZiAoaXNTcGVjaWFsRm9ybVN0YXJ0KHRoaXMucGVlaywgdGhpcy5uZXh0UGVlaykpIHJldHVybiB0cnVlO1xuICAgICAgaWYgKHRoaXMucGVlayA9PT0gJFJCUkFDRSAmJiAhaW50ZXJwb2xhdGlvbiAmJlxuICAgICAgICAgICh0aGlzLmlzSW5FeHBhbnNpb25DYXNlKCkgfHwgdGhpcy5pc0luRXhwYW5zaW9uRm9ybSgpKSlcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgX3NhdmVQb3NpdGlvbigpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIFt0aGlzLnBlZWssIHRoaXMuaW5kZXgsIHRoaXMuY29sdW1uLCB0aGlzLmxpbmUsIHRoaXMudG9rZW5zLmxlbmd0aF07XG4gIH1cblxuICBwcml2YXRlIF9yZWFkVW50aWwoY2hhcjogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBsZXQgc3RhcnQgPSB0aGlzLmluZGV4O1xuICAgIHRoaXMuX2F0dGVtcHRVbnRpbENoYXIoY2hhcik7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXQuc3Vic3RyaW5nKHN0YXJ0LCB0aGlzLmluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3Jlc3RvcmVQb3NpdGlvbihwb3NpdGlvbjogbnVtYmVyW10pOiB2b2lkIHtcbiAgICB0aGlzLnBlZWsgPSBwb3NpdGlvblswXTtcbiAgICB0aGlzLmluZGV4ID0gcG9zaXRpb25bMV07XG4gICAgdGhpcy5jb2x1bW4gPSBwb3NpdGlvblsyXTtcbiAgICB0aGlzLmxpbmUgPSBwb3NpdGlvblszXTtcbiAgICBsZXQgbmJUb2tlbnMgPSBwb3NpdGlvbls0XTtcbiAgICBpZiAobmJUb2tlbnMgPCB0aGlzLnRva2Vucy5sZW5ndGgpIHtcbiAgICAgIC8vIHJlbW92ZSBhbnkgZXh0cmEgdG9rZW5zXG4gICAgICB0aGlzLnRva2VucyA9IExpc3RXcmFwcGVyLnNsaWNlKHRoaXMudG9rZW5zLCAwLCBuYlRva2Vucyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpc0luRXhwYW5zaW9uQ2FzZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5leHBhbnNpb25DYXNlU3RhY2subGVuZ3RoID4gMCAmJlxuICAgICAgICAgICB0aGlzLmV4cGFuc2lvbkNhc2VTdGFja1t0aGlzLmV4cGFuc2lvbkNhc2VTdGFjay5sZW5ndGggLSAxXSA9PT1cbiAgICAgICAgICAgICAgIEh0bWxUb2tlblR5cGUuRVhQQU5TSU9OX0NBU0VfRVhQX1NUQVJUO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0luRXhwYW5zaW9uRm9ybSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5leHBhbnNpb25DYXNlU3RhY2subGVuZ3RoID4gMCAmJlxuICAgICAgICAgICB0aGlzLmV4cGFuc2lvbkNhc2VTdGFja1t0aGlzLmV4cGFuc2lvbkNhc2VTdGFjay5sZW5ndGggLSAxXSA9PT1cbiAgICAgICAgICAgICAgIEh0bWxUb2tlblR5cGUuRVhQQU5TSU9OX0ZPUk1fU1RBUlQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNOb3RXaGl0ZXNwYWNlKGNvZGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICByZXR1cm4gIWlzV2hpdGVzcGFjZShjb2RlKSB8fCBjb2RlID09PSAkRU9GO1xufVxuXG5mdW5jdGlvbiBpc1doaXRlc3BhY2UoY29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiAoY29kZSA+PSAkVEFCICYmIGNvZGUgPD0gJFNQQUNFKSB8fCAoY29kZSA9PT0gJE5CU1ApO1xufVxuXG5mdW5jdGlvbiBpc05hbWVFbmQoY29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiBpc1doaXRlc3BhY2UoY29kZSkgfHwgY29kZSA9PT0gJEdUIHx8IGNvZGUgPT09ICRTTEFTSCB8fCBjb2RlID09PSAkU1EgfHwgY29kZSA9PT0gJERRIHx8XG4gICAgICAgICBjb2RlID09PSAkRVE7XG59XG5cbmZ1bmN0aW9uIGlzUHJlZml4RW5kKGNvZGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICByZXR1cm4gKGNvZGUgPCAkYSB8fCAkeiA8IGNvZGUpICYmIChjb2RlIDwgJEEgfHwgJFogPCBjb2RlKSAmJiAoY29kZSA8ICQwIHx8IGNvZGUgPiAkOSk7XG59XG5cbmZ1bmN0aW9uIGlzRGlnaXRFbnRpdHlFbmQoY29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiBjb2RlID09ICRTRU1JQ09MT04gfHwgY29kZSA9PSAkRU9GIHx8ICFpc0FzY2lpSGV4RGlnaXQoY29kZSk7XG59XG5cbmZ1bmN0aW9uIGlzTmFtZWRFbnRpdHlFbmQoY29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiBjb2RlID09ICRTRU1JQ09MT04gfHwgY29kZSA9PSAkRU9GIHx8ICFpc0FzY2lpTGV0dGVyKGNvZGUpO1xufVxuXG5mdW5jdGlvbiBpc1NwZWNpYWxGb3JtU3RhcnQocGVlazogbnVtYmVyLCBuZXh0UGVlazogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiBwZWVrID09PSAkTEJSQUNFICYmIG5leHRQZWVrICE9ICRMQlJBQ0U7XG59XG5cbmZ1bmN0aW9uIGlzQXNjaWlMZXR0ZXIoY29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiBjb2RlID49ICRhICYmIGNvZGUgPD0gJHogfHwgY29kZSA+PSAkQSAmJiBjb2RlIDw9ICRaO1xufVxuXG5mdW5jdGlvbiBpc0FzY2lpSGV4RGlnaXQoY29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiBjb2RlID49ICRhICYmIGNvZGUgPD0gJGYgfHwgY29kZSA+PSAkQSAmJiBjb2RlIDw9ICRGIHx8IGNvZGUgPj0gJDAgJiYgY29kZSA8PSAkOTtcbn1cblxuZnVuY3Rpb24gY29tcGFyZUNoYXJDb2RlQ2FzZUluc2Vuc2l0aXZlKGNvZGUxOiBudW1iZXIsIGNvZGUyOiBudW1iZXIpOiBib29sZWFuIHtcbiAgcmV0dXJuIHRvVXBwZXJDYXNlQ2hhckNvZGUoY29kZTEpID09IHRvVXBwZXJDYXNlQ2hhckNvZGUoY29kZTIpO1xufVxuXG5mdW5jdGlvbiB0b1VwcGVyQ2FzZUNoYXJDb2RlKGNvZGU6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBjb2RlID49ICRhICYmIGNvZGUgPD0gJHogPyBjb2RlIC0gJGEgKyAkQSA6IGNvZGU7XG59XG5cbmZ1bmN0aW9uIG1lcmdlVGV4dFRva2VucyhzcmNUb2tlbnM6IEh0bWxUb2tlbltdKTogSHRtbFRva2VuW10ge1xuICBsZXQgZHN0VG9rZW5zID0gW107XG4gIGxldCBsYXN0RHN0VG9rZW46IEh0bWxUb2tlbjtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcmNUb2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgdG9rZW4gPSBzcmNUb2tlbnNbaV07XG4gICAgaWYgKGlzUHJlc2VudChsYXN0RHN0VG9rZW4pICYmIGxhc3REc3RUb2tlbi50eXBlID09IEh0bWxUb2tlblR5cGUuVEVYVCAmJlxuICAgICAgICB0b2tlbi50eXBlID09IEh0bWxUb2tlblR5cGUuVEVYVCkge1xuICAgICAgbGFzdERzdFRva2VuLnBhcnRzWzBdICs9IHRva2VuLnBhcnRzWzBdO1xuICAgICAgbGFzdERzdFRva2VuLnNvdXJjZVNwYW4uZW5kID0gdG9rZW4uc291cmNlU3Bhbi5lbmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhc3REc3RUb2tlbiA9IHRva2VuO1xuICAgICAgZHN0VG9rZW5zLnB1c2gobGFzdERzdFRva2VuKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZHN0VG9rZW5zO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
