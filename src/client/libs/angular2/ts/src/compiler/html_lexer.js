System.register(['angular2/src/facade/lang', 'angular2/src/facade/collection', './parse_util', './html_tags'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lang_1, collection_1, parse_util_1, html_tags_1;
    var HtmlTokenType, HtmlToken, HtmlTokenError, HtmlTokenizeResult, $EOF, $TAB, $LF, $FF, $CR, $SPACE, $BANG, $DQ, $HASH, $$, $AMPERSAND, $SQ, $MINUS, $SLASH, $0, $SEMICOLON, $9, $COLON, $LT, $EQ, $GT, $QUESTION, $LBRACKET, $RBRACKET, $A, $F, $X, $Z, $a, $f, $z, $x, $NBSP, CR_OR_CRLF_REGEXP, ControlFlowError, _HtmlTokenizer;
    function tokenizeHtml(sourceContent, sourceUrl) {
        return new _HtmlTokenizer(new parse_util_1.ParseSourceFile(sourceContent, sourceUrl)).tokenize();
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
    function isTextEnd(code) {
        return code === $LT || code === $EOF;
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
                HtmlTokenType[HtmlTokenType["EOF"] = 14] = "EOF";
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
                function _HtmlTokenizer(file) {
                    this.file = file;
                    // Note: this is always lowercase!
                    this.peek = -1;
                    this.index = -1;
                    this.line = 0;
                    this.column = -1;
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
                _HtmlTokenizer.prototype._consumeText = function () {
                    var start = this._getLocation();
                    this._beginToken(HtmlTokenType.TEXT, start);
                    var parts = [this._readChar(true)];
                    while (!isTextEnd(this.peek)) {
                        parts.push(this._readChar(true));
                    }
                    this._endToken([this._processCarriageReturns(parts.join(''))]);
                };
                _HtmlTokenizer.prototype._savePosition = function () {
                    return [this.peek, this.index, this.column, this.line, this.tokens.length];
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
                return _HtmlTokenizer;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL2h0bWxfbGV4ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O3NFQWlETSxJQUFJLEVBQ0osSUFBSSxFQUNKLEdBQUcsRUFDSCxHQUFHLEVBQ0gsR0FBRyxFQUVILE1BQU0sRUFFTixLQUFLLEVBQ0wsR0FBRyxFQUNILEtBQUssRUFDTCxFQUFFLEVBQ0YsVUFBVSxFQUNWLEdBQUcsRUFDSCxNQUFNLEVBQ04sTUFBTSxFQUNOLEVBQUUsRUFFRixVQUFVLEVBRVYsRUFBRSxFQUNGLE1BQU0sRUFDTixHQUFHLEVBQ0gsR0FBRyxFQUNILEdBQUcsRUFDSCxTQUFTLEVBQ1QsU0FBUyxFQUNULFNBQVMsRUFDVCxFQUFFLEVBQ0YsRUFBRSxFQUNGLEVBQUUsRUFDRixFQUFFLEVBRUYsRUFBRSxFQUNGLEVBQUUsRUFDRixFQUFFLEVBQ0YsRUFBRSxFQUVGLEtBQUssRUFFUCxpQkFBaUI7SUE1Q3JCLHNCQUE2QixhQUFxQixFQUFFLFNBQWlCO1FBQ25FLE1BQU0sQ0FBQyxJQUFJLGNBQWMsQ0FBQyxJQUFJLDRCQUFlLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDdEYsQ0FBQztJQUZELHVDQUVDLENBQUE7SUE0Q0QscUNBQXFDLFFBQWdCO1FBQ25ELElBQUksSUFBSSxHQUFHLFFBQVEsS0FBSyxJQUFJLEdBQUcsS0FBSyxHQUFHLG9CQUFhLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVFLE1BQU0sQ0FBQyw0QkFBeUIsSUFBSSxPQUFHLENBQUM7SUFDMUMsQ0FBQztJQUVELCtCQUErQixTQUFpQjtRQUM5QyxNQUFNLENBQUMsc0JBQW1CLFNBQVMsMkRBQW1ELENBQUM7SUFDekYsQ0FBQztJQXFiRCx5QkFBeUIsSUFBWTtRQUNuQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUks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LEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDN0UsQ0FBQztnQkFFTyx5Q0FBZ0IsR0FBeEIsVUFBeUIsUUFBa0I7b0JBQ3pDLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4QixJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzNCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7d0JBQ2xDLDBCQUEwQjt3QkFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyx3QkFBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDNUQsQ0FBQztnQkFDSCxDQUFDO2dCQUNILHFCQUFDO1lBQUQsQ0E1YUEsQUE0YUMsSUFBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9odG1sX2xleGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgU3RyaW5nV3JhcHBlcixcbiAgTnVtYmVyV3JhcHBlcixcbiAgaXNQcmVzZW50LFxuICBpc0JsYW5rLFxuICBDT05TVF9FWFBSLFxuICBzZXJpYWxpemVFbnVtXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0xpc3RXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtQYXJzZUxvY2F0aW9uLCBQYXJzZUVycm9yLCBQYXJzZVNvdXJjZUZpbGUsIFBhcnNlU291cmNlU3Bhbn0gZnJvbSAnLi9wYXJzZV91dGlsJztcbmltcG9ydCB7Z2V0SHRtbFRhZ0RlZmluaXRpb24sIEh0bWxUYWdDb250ZW50VHlwZSwgTkFNRURfRU5USVRJRVN9IGZyb20gJy4vaHRtbF90YWdzJztcblxuZXhwb3J0IGVudW0gSHRtbFRva2VuVHlwZSB7XG4gIFRBR19PUEVOX1NUQVJULFxuICBUQUdfT1BFTl9FTkQsXG4gIFRBR19PUEVOX0VORF9WT0lELFxuICBUQUdfQ0xPU0UsXG4gIFRFWFQsXG4gIEVTQ0FQQUJMRV9SQVdfVEVYVCxcbiAgUkFXX1RFWFQsXG4gIENPTU1FTlRfU1RBUlQsXG4gIENPTU1FTlRfRU5ELFxuICBDREFUQV9TVEFSVCxcbiAgQ0RBVEFfRU5ELFxuICBBVFRSX05BTUUsXG4gIEFUVFJfVkFMVUUsXG4gIERPQ19UWVBFLFxuICBFT0Zcbn1cblxuZXhwb3J0IGNsYXNzIEh0bWxUb2tlbiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0eXBlOiBIdG1sVG9rZW5UeXBlLCBwdWJsaWMgcGFydHM6IHN0cmluZ1tdLFxuICAgICAgICAgICAgICBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgSHRtbFRva2VuRXJyb3IgZXh0ZW5kcyBQYXJzZUVycm9yIHtcbiAgY29uc3RydWN0b3IoZXJyb3JNc2c6IHN0cmluZywgcHVibGljIHRva2VuVHlwZTogSHRtbFRva2VuVHlwZSwgc3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7XG4gICAgc3VwZXIoc3BhbiwgZXJyb3JNc2cpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBIdG1sVG9rZW5pemVSZXN1bHQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdG9rZW5zOiBIdG1sVG9rZW5bXSwgcHVibGljIGVycm9yczogSHRtbFRva2VuRXJyb3JbXSkge31cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRva2VuaXplSHRtbChzb3VyY2VDb250ZW50OiBzdHJpbmcsIHNvdXJjZVVybDogc3RyaW5nKTogSHRtbFRva2VuaXplUmVzdWx0IHtcbiAgcmV0dXJuIG5ldyBfSHRtbFRva2VuaXplcihuZXcgUGFyc2VTb3VyY2VGaWxlKHNvdXJjZUNvbnRlbnQsIHNvdXJjZVVybCkpLnRva2VuaXplKCk7XG59XG5cbmNvbnN0ICRFT0YgPSAwO1xuY29uc3QgJFRBQiA9IDk7XG5jb25zdCAkTEYgPSAxMDtcbmNvbnN0ICRGRiA9IDEyO1xuY29uc3QgJENSID0gMTM7XG5cbmNvbnN0ICRTUEFDRSA9IDMyO1xuXG5jb25zdCAkQkFORyA9IDMzO1xuY29uc3QgJERRID0gMzQ7XG5jb25zdCAkSEFTSCA9IDM1O1xuY29uc3QgJCQgPSAzNjtcbmNvbnN0ICRBTVBFUlNBTkQgPSAzODtcbmNvbnN0ICRTUSA9IDM5O1xuY29uc3QgJE1JTlVTID0gNDU7XG5jb25zdCAkU0xBU0ggPSA0NztcbmNvbnN0ICQwID0gNDg7XG5cbmNvbnN0ICRTRU1JQ09MT04gPSA1OTtcblxuY29uc3QgJDkgPSA1NztcbmNvbnN0ICRDT0xPTiA9IDU4O1xuY29uc3QgJExUID0gNjA7XG5jb25zdCAkRVEgPSA2MTtcbmNvbnN0ICRHVCA9IDYyO1xuY29uc3QgJFFVRVNUSU9OID0gNjM7XG5jb25zdCAkTEJSQUNLRVQgPSA5MTtcbmNvbnN0ICRSQlJBQ0tFVCA9IDkzO1xuY29uc3QgJEEgPSA2NTtcbmNvbnN0ICRGID0gNzA7XG5jb25zdCAkWCA9IDg4O1xuY29uc3QgJFogPSA5MDtcblxuY29uc3QgJGEgPSA5NztcbmNvbnN0ICRmID0gMTAyO1xuY29uc3QgJHogPSAxMjI7XG5jb25zdCAkeCA9IDEyMDtcblxuY29uc3QgJE5CU1AgPSAxNjA7XG5cbnZhciBDUl9PUl9DUkxGX1JFR0VYUCA9IC9cXHJcXG4/L2c7XG5cbmZ1bmN0aW9uIHVuZXhwZWN0ZWRDaGFyYWN0ZXJFcnJvck1zZyhjaGFyQ29kZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgdmFyIGNoYXIgPSBjaGFyQ29kZSA9PT0gJEVPRiA/ICdFT0YnIDogU3RyaW5nV3JhcHBlci5mcm9tQ2hhckNvZGUoY2hhckNvZGUpO1xuICByZXR1cm4gYFVuZXhwZWN0ZWQgY2hhcmFjdGVyIFwiJHtjaGFyfVwiYDtcbn1cblxuZnVuY3Rpb24gdW5rbm93bkVudGl0eUVycm9yTXNnKGVudGl0eVNyYzogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGBVbmtub3duIGVudGl0eSBcIiR7ZW50aXR5U3JjfVwiIC0gdXNlIHRoZSBcIiYjPGRlY2ltYWw+O1wiIG9yICBcIiYjeDxoZXg+O1wiIHN5bnRheGA7XG59XG5cbmNsYXNzIENvbnRyb2xGbG93RXJyb3Ige1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZXJyb3I6IEh0bWxUb2tlbkVycm9yKSB7fVxufVxuXG4vLyBTZWUgaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDUxL3N5bnRheC5odG1sI3dyaXRpbmdcbmNsYXNzIF9IdG1sVG9rZW5pemVyIHtcbiAgcHJpdmF0ZSBpbnB1dDogc3RyaW5nO1xuICBwcml2YXRlIGxlbmd0aDogbnVtYmVyO1xuICAvLyBOb3RlOiB0aGlzIGlzIGFsd2F5cyBsb3dlcmNhc2UhXG4gIHByaXZhdGUgcGVlazogbnVtYmVyID0gLTE7XG4gIHByaXZhdGUgaW5kZXg6IG51bWJlciA9IC0xO1xuICBwcml2YXRlIGxpbmU6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgY29sdW1uOiBudW1iZXIgPSAtMTtcbiAgcHJpdmF0ZSBjdXJyZW50VG9rZW5TdGFydDogUGFyc2VMb2NhdGlvbjtcbiAgcHJpdmF0ZSBjdXJyZW50VG9rZW5UeXBlOiBIdG1sVG9rZW5UeXBlO1xuXG4gIHRva2VuczogSHRtbFRva2VuW10gPSBbXTtcbiAgZXJyb3JzOiBIdG1sVG9rZW5FcnJvcltdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmaWxlOiBQYXJzZVNvdXJjZUZpbGUpIHtcbiAgICB0aGlzLmlucHV0ID0gZmlsZS5jb250ZW50O1xuICAgIHRoaXMubGVuZ3RoID0gZmlsZS5jb250ZW50Lmxlbmd0aDtcbiAgICB0aGlzLl9hZHZhbmNlKCk7XG4gIH1cblxuICBwcml2YXRlIF9wcm9jZXNzQ2FycmlhZ2VSZXR1cm5zKGNvbnRlbnQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDUvc3ludGF4Lmh0bWwjcHJlcHJvY2Vzc2luZy10aGUtaW5wdXQtc3RyZWFtXG4gICAgLy8gSW4gb3JkZXIgdG8ga2VlcCB0aGUgb3JpZ2luYWwgcG9zaXRpb24gaW4gdGhlIHNvdXJjZSwgd2UgY2FuIG5vdFxuICAgIC8vIHByZS1wcm9jZXNzIGl0LlxuICAgIC8vIEluc3RlYWQgQ1JzIGFyZSBwcm9jZXNzZWQgcmlnaHQgYmVmb3JlIGluc3RhbnRpYXRpbmcgdGhlIHRva2Vucy5cbiAgICByZXR1cm4gU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsKGNvbnRlbnQsIENSX09SX0NSTEZfUkVHRVhQLCAnXFxuJyk7XG4gIH1cblxuICB0b2tlbml6ZSgpOiBIdG1sVG9rZW5pemVSZXN1bHQge1xuICAgIHdoaWxlICh0aGlzLnBlZWsgIT09ICRFT0YpIHtcbiAgICAgIHZhciBzdGFydCA9IHRoaXMuX2dldExvY2F0aW9uKCk7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAodGhpcy5fYXR0ZW1wdENoYXJDb2RlKCRMVCkpIHtcbiAgICAgICAgICBpZiAodGhpcy5fYXR0ZW1wdENoYXJDb2RlKCRCQU5HKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2F0dGVtcHRDaGFyQ29kZSgkTEJSQUNLRVQpKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2NvbnN1bWVDZGF0YShzdGFydCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2F0dGVtcHRDaGFyQ29kZSgkTUlOVVMpKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2NvbnN1bWVDb21tZW50KHN0YXJ0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuX2NvbnN1bWVEb2NUeXBlKHN0YXJ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2F0dGVtcHRDaGFyQ29kZSgkU0xBU0gpKSB7XG4gICAgICAgICAgICB0aGlzLl9jb25zdW1lVGFnQ2xvc2Uoc3RhcnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jb25zdW1lVGFnT3BlbihzdGFydCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2NvbnN1bWVUZXh0KCk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBDb250cm9sRmxvd0Vycm9yKSB7XG4gICAgICAgICAgdGhpcy5lcnJvcnMucHVzaChlLmVycm9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2JlZ2luVG9rZW4oSHRtbFRva2VuVHlwZS5FT0YpO1xuICAgIHRoaXMuX2VuZFRva2VuKFtdKTtcbiAgICByZXR1cm4gbmV3IEh0bWxUb2tlbml6ZVJlc3VsdChtZXJnZVRleHRUb2tlbnModGhpcy50b2tlbnMpLCB0aGlzLmVycm9ycyk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRMb2NhdGlvbigpOiBQYXJzZUxvY2F0aW9uIHtcbiAgICByZXR1cm4gbmV3IFBhcnNlTG9jYXRpb24odGhpcy5maWxlLCB0aGlzLmluZGV4LCB0aGlzLmxpbmUsIHRoaXMuY29sdW1uKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFNwYW4oc3RhcnQ/OiBQYXJzZUxvY2F0aW9uLCBlbmQ/OiBQYXJzZUxvY2F0aW9uKTogUGFyc2VTb3VyY2VTcGFuIHtcbiAgICBpZiAoaXNCbGFuayhzdGFydCkpIHtcbiAgICAgIHN0YXJ0ID0gdGhpcy5fZ2V0TG9jYXRpb24oKTtcbiAgICB9XG4gICAgaWYgKGlzQmxhbmsoZW5kKSkge1xuICAgICAgZW5kID0gdGhpcy5fZ2V0TG9jYXRpb24oKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBQYXJzZVNvdXJjZVNwYW4oc3RhcnQsIGVuZCk7XG4gIH1cblxuICBwcml2YXRlIF9iZWdpblRva2VuKHR5cGU6IEh0bWxUb2tlblR5cGUsIHN0YXJ0OiBQYXJzZUxvY2F0aW9uID0gbnVsbCkge1xuICAgIGlmIChpc0JsYW5rKHN0YXJ0KSkge1xuICAgICAgc3RhcnQgPSB0aGlzLl9nZXRMb2NhdGlvbigpO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRUb2tlblN0YXJ0ID0gc3RhcnQ7XG4gICAgdGhpcy5jdXJyZW50VG9rZW5UeXBlID0gdHlwZTtcbiAgfVxuXG4gIHByaXZhdGUgX2VuZFRva2VuKHBhcnRzOiBzdHJpbmdbXSwgZW5kOiBQYXJzZUxvY2F0aW9uID0gbnVsbCk6IEh0bWxUb2tlbiB7XG4gICAgaWYgKGlzQmxhbmsoZW5kKSkge1xuICAgICAgZW5kID0gdGhpcy5fZ2V0TG9jYXRpb24oKTtcbiAgICB9XG4gICAgdmFyIHRva2VuID0gbmV3IEh0bWxUb2tlbih0aGlzLmN1cnJlbnRUb2tlblR5cGUsIHBhcnRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhcnNlU291cmNlU3Bhbih0aGlzLmN1cnJlbnRUb2tlblN0YXJ0LCBlbmQpKTtcbiAgICB0aGlzLnRva2Vucy5wdXNoKHRva2VuKTtcbiAgICB0aGlzLmN1cnJlbnRUb2tlblN0YXJ0ID0gbnVsbDtcbiAgICB0aGlzLmN1cnJlbnRUb2tlblR5cGUgPSBudWxsO1xuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUVycm9yKG1zZzogc3RyaW5nLCBzcGFuOiBQYXJzZVNvdXJjZVNwYW4pOiBDb250cm9sRmxvd0Vycm9yIHtcbiAgICB2YXIgZXJyb3IgPSBuZXcgSHRtbFRva2VuRXJyb3IobXNnLCB0aGlzLmN1cnJlbnRUb2tlblR5cGUsIHNwYW4pO1xuICAgIHRoaXMuY3VycmVudFRva2VuU3RhcnQgPSBudWxsO1xuICAgIHRoaXMuY3VycmVudFRva2VuVHlwZSA9IG51bGw7XG4gICAgcmV0dXJuIG5ldyBDb250cm9sRmxvd0Vycm9yKGVycm9yKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkdmFuY2UoKSB7XG4gICAgaWYgKHRoaXMuaW5kZXggPj0gdGhpcy5sZW5ndGgpIHtcbiAgICAgIHRocm93IHRoaXMuX2NyZWF0ZUVycm9yKHVuZXhwZWN0ZWRDaGFyYWN0ZXJFcnJvck1zZygkRU9GKSwgdGhpcy5fZ2V0U3BhbigpKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucGVlayA9PT0gJExGKSB7XG4gICAgICB0aGlzLmxpbmUrKztcbiAgICAgIHRoaXMuY29sdW1uID0gMDtcbiAgICB9IGVsc2UgaWYgKHRoaXMucGVlayAhPT0gJExGICYmIHRoaXMucGVlayAhPT0gJENSKSB7XG4gICAgICB0aGlzLmNvbHVtbisrO1xuICAgIH1cbiAgICB0aGlzLmluZGV4Kys7XG4gICAgdGhpcy5wZWVrID0gdGhpcy5pbmRleCA+PSB0aGlzLmxlbmd0aCA/ICRFT0YgOiBTdHJpbmdXcmFwcGVyLmNoYXJDb2RlQXQodGhpcy5pbnB1dCwgdGhpcy5pbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9hdHRlbXB0Q2hhckNvZGUoY2hhckNvZGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnBlZWsgPT09IGNoYXJDb2RlKSB7XG4gICAgICB0aGlzLl9hZHZhbmNlKCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXR0ZW1wdENoYXJDb2RlQ2FzZUluc2Vuc2l0aXZlKGNoYXJDb2RlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAoY29tcGFyZUNoYXJDb2RlQ2FzZUluc2Vuc2l0aXZlKHRoaXMucGVlaywgY2hhckNvZGUpKSB7XG4gICAgICB0aGlzLl9hZHZhbmNlKCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVxdWlyZUNoYXJDb2RlKGNoYXJDb2RlOiBudW1iZXIpIHtcbiAgICB2YXIgbG9jYXRpb24gPSB0aGlzLl9nZXRMb2NhdGlvbigpO1xuICAgIGlmICghdGhpcy5fYXR0ZW1wdENoYXJDb2RlKGNoYXJDb2RlKSkge1xuICAgICAgdGhyb3cgdGhpcy5fY3JlYXRlRXJyb3IodW5leHBlY3RlZENoYXJhY3RlckVycm9yTXNnKHRoaXMucGVlayksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9nZXRTcGFuKGxvY2F0aW9uLCBsb2NhdGlvbikpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2F0dGVtcHRTdHIoY2hhcnM6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghdGhpcy5fYXR0ZW1wdENoYXJDb2RlKFN0cmluZ1dyYXBwZXIuY2hhckNvZGVBdChjaGFycywgaSkpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9hdHRlbXB0U3RyQ2FzZUluc2Vuc2l0aXZlKGNoYXJzOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoIXRoaXMuX2F0dGVtcHRDaGFyQ29kZUNhc2VJbnNlbnNpdGl2ZShTdHJpbmdXcmFwcGVyLmNoYXJDb2RlQXQoY2hhcnMsIGkpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVxdWlyZVN0cihjaGFyczogc3RyaW5nKSB7XG4gICAgdmFyIGxvY2F0aW9uID0gdGhpcy5fZ2V0TG9jYXRpb24oKTtcbiAgICBpZiAoIXRoaXMuX2F0dGVtcHRTdHIoY2hhcnMpKSB7XG4gICAgICB0aHJvdyB0aGlzLl9jcmVhdGVFcnJvcih1bmV4cGVjdGVkQ2hhcmFjdGVyRXJyb3JNc2codGhpcy5wZWVrKSwgdGhpcy5fZ2V0U3Bhbihsb2NhdGlvbikpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2F0dGVtcHRDaGFyQ29kZVVudGlsRm4ocHJlZGljYXRlOiBGdW5jdGlvbikge1xuICAgIHdoaWxlICghcHJlZGljYXRlKHRoaXMucGVlaykpIHtcbiAgICAgIHRoaXMuX2FkdmFuY2UoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZXF1aXJlQ2hhckNvZGVVbnRpbEZuKHByZWRpY2F0ZTogRnVuY3Rpb24sIGxlbjogbnVtYmVyKSB7XG4gICAgdmFyIHN0YXJ0ID0gdGhpcy5fZ2V0TG9jYXRpb24oKTtcbiAgICB0aGlzLl9hdHRlbXB0Q2hhckNvZGVVbnRpbEZuKHByZWRpY2F0ZSk7XG4gICAgaWYgKHRoaXMuaW5kZXggLSBzdGFydC5vZmZzZXQgPCBsZW4pIHtcbiAgICAgIHRocm93IHRoaXMuX2NyZWF0ZUVycm9yKHVuZXhwZWN0ZWRDaGFyYWN0ZXJFcnJvck1zZyh0aGlzLnBlZWspLCB0aGlzLl9nZXRTcGFuKHN0YXJ0LCBzdGFydCkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2F0dGVtcHRVbnRpbENoYXIoY2hhcjogbnVtYmVyKSB7XG4gICAgd2hpbGUgKHRoaXMucGVlayAhPT0gY2hhcikge1xuICAgICAgdGhpcy5fYWR2YW5jZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3JlYWRDaGFyKGRlY29kZUVudGl0aWVzOiBib29sZWFuKTogc3RyaW5nIHtcbiAgICBpZiAoZGVjb2RlRW50aXRpZXMgJiYgdGhpcy5wZWVrID09PSAkQU1QRVJTQU5EKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZGVjb2RlRW50aXR5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBpbmRleCA9IHRoaXMuaW5kZXg7XG4gICAgICB0aGlzLl9hZHZhbmNlKCk7XG4gICAgICByZXR1cm4gdGhpcy5pbnB1dFtpbmRleF07XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZGVjb2RlRW50aXR5KCk6IHN0cmluZyB7XG4gICAgdmFyIHN0YXJ0ID0gdGhpcy5fZ2V0TG9jYXRpb24oKTtcbiAgICB0aGlzLl9hZHZhbmNlKCk7XG4gICAgaWYgKHRoaXMuX2F0dGVtcHRDaGFyQ29kZSgkSEFTSCkpIHtcbiAgICAgIGxldCBpc0hleCA9IHRoaXMuX2F0dGVtcHRDaGFyQ29kZSgkeCkgfHwgdGhpcy5fYXR0ZW1wdENoYXJDb2RlKCRYKTtcbiAgICAgIGxldCBudW1iZXJTdGFydCA9IHRoaXMuX2dldExvY2F0aW9uKCkub2Zmc2V0O1xuICAgICAgdGhpcy5fYXR0ZW1wdENoYXJDb2RlVW50aWxGbihpc0RpZ2l0RW50aXR5RW5kKTtcbiAgICAgIGlmICh0aGlzLnBlZWsgIT0gJFNFTUlDT0xPTikge1xuICAgICAgICB0aHJvdyB0aGlzLl9jcmVhdGVFcnJvcih1bmV4cGVjdGVkQ2hhcmFjdGVyRXJyb3JNc2codGhpcy5wZWVrKSwgdGhpcy5fZ2V0U3BhbigpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2FkdmFuY2UoKTtcbiAgICAgIGxldCBzdHJOdW0gPSB0aGlzLmlucHV0LnN1YnN0cmluZyhudW1iZXJTdGFydCwgdGhpcy5pbmRleCAtIDEpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgbGV0IGNoYXJDb2RlID0gTnVtYmVyV3JhcHBlci5wYXJzZUludChzdHJOdW0sIGlzSGV4ID8gMTYgOiAxMCk7XG4gICAgICAgIHJldHVybiBTdHJpbmdXcmFwcGVyLmZyb21DaGFyQ29kZShjaGFyQ29kZSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGxldCBlbnRpdHkgPSB0aGlzLmlucHV0LnN1YnN0cmluZyhzdGFydC5vZmZzZXQgKyAxLCB0aGlzLmluZGV4IC0gMSk7XG4gICAgICAgIHRocm93IHRoaXMuX2NyZWF0ZUVycm9yKHVua25vd25FbnRpdHlFcnJvck1zZyhlbnRpdHkpLCB0aGlzLl9nZXRTcGFuKHN0YXJ0KSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBzdGFydFBvc2l0aW9uID0gdGhpcy5fc2F2ZVBvc2l0aW9uKCk7XG4gICAgICB0aGlzLl9hdHRlbXB0Q2hhckNvZGVVbnRpbEZuKGlzTmFtZWRFbnRpdHlFbmQpO1xuICAgICAgaWYgKHRoaXMucGVlayAhPSAkU0VNSUNPTE9OKSB7XG4gICAgICAgIHRoaXMuX3Jlc3RvcmVQb3NpdGlvbihzdGFydFBvc2l0aW9uKTtcbiAgICAgICAgcmV0dXJuICcmJztcbiAgICAgIH1cbiAgICAgIHRoaXMuX2FkdmFuY2UoKTtcbiAgICAgIGxldCBuYW1lID0gdGhpcy5pbnB1dC5zdWJzdHJpbmcoc3RhcnQub2Zmc2V0ICsgMSwgdGhpcy5pbmRleCAtIDEpO1xuICAgICAgbGV0IGNoYXIgPSBOQU1FRF9FTlRJVElFU1tuYW1lXTtcbiAgICAgIGlmIChpc0JsYW5rKGNoYXIpKSB7XG4gICAgICAgIHRocm93IHRoaXMuX2NyZWF0ZUVycm9yKHVua25vd25FbnRpdHlFcnJvck1zZyhuYW1lKSwgdGhpcy5fZ2V0U3BhbihzdGFydCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNoYXI7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY29uc3VtZVJhd1RleHQoZGVjb2RlRW50aXRpZXM6IGJvb2xlYW4sIGZpcnN0Q2hhck9mRW5kOiBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGF0dGVtcHRFbmRSZXN0OiBGdW5jdGlvbik6IEh0bWxUb2tlbiB7XG4gICAgdmFyIHRhZ0Nsb3NlU3RhcnQ7XG4gICAgdmFyIHRleHRTdGFydCA9IHRoaXMuX2dldExvY2F0aW9uKCk7XG4gICAgdGhpcy5fYmVnaW5Ub2tlbihkZWNvZGVFbnRpdGllcyA/IEh0bWxUb2tlblR5cGUuRVNDQVBBQkxFX1JBV19URVhUIDogSHRtbFRva2VuVHlwZS5SQVdfVEVYVCxcbiAgICAgICAgICAgICAgICAgICAgIHRleHRTdGFydCk7XG4gICAgdmFyIHBhcnRzID0gW107XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIHRhZ0Nsb3NlU3RhcnQgPSB0aGlzLl9nZXRMb2NhdGlvbigpO1xuICAgICAgaWYgKHRoaXMuX2F0dGVtcHRDaGFyQ29kZShmaXJzdENoYXJPZkVuZCkgJiYgYXR0ZW1wdEVuZFJlc3QoKSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmluZGV4ID4gdGFnQ2xvc2VTdGFydC5vZmZzZXQpIHtcbiAgICAgICAgcGFydHMucHVzaCh0aGlzLmlucHV0LnN1YnN0cmluZyh0YWdDbG9zZVN0YXJ0Lm9mZnNldCwgdGhpcy5pbmRleCkpO1xuICAgICAgfVxuICAgICAgd2hpbGUgKHRoaXMucGVlayAhPT0gZmlyc3RDaGFyT2ZFbmQpIHtcbiAgICAgICAgcGFydHMucHVzaCh0aGlzLl9yZWFkQ2hhcihkZWNvZGVFbnRpdGllcykpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZW5kVG9rZW4oW3RoaXMuX3Byb2Nlc3NDYXJyaWFnZVJldHVybnMocGFydHMuam9pbignJykpXSwgdGFnQ2xvc2VTdGFydCk7XG4gIH1cblxuICBwcml2YXRlIF9jb25zdW1lQ29tbWVudChzdGFydDogUGFyc2VMb2NhdGlvbikge1xuICAgIHRoaXMuX2JlZ2luVG9rZW4oSHRtbFRva2VuVHlwZS5DT01NRU5UX1NUQVJULCBzdGFydCk7XG4gICAgdGhpcy5fcmVxdWlyZUNoYXJDb2RlKCRNSU5VUyk7XG4gICAgdGhpcy5fZW5kVG9rZW4oW10pO1xuICAgIHZhciB0ZXh0VG9rZW4gPSB0aGlzLl9jb25zdW1lUmF3VGV4dChmYWxzZSwgJE1JTlVTLCAoKSA9PiB0aGlzLl9hdHRlbXB0U3RyKCctPicpKTtcbiAgICB0aGlzLl9iZWdpblRva2VuKEh0bWxUb2tlblR5cGUuQ09NTUVOVF9FTkQsIHRleHRUb2tlbi5zb3VyY2VTcGFuLmVuZCk7XG4gICAgdGhpcy5fZW5kVG9rZW4oW10pO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29uc3VtZUNkYXRhKHN0YXJ0OiBQYXJzZUxvY2F0aW9uKSB7XG4gICAgdGhpcy5fYmVnaW5Ub2tlbihIdG1sVG9rZW5UeXBlLkNEQVRBX1NUQVJULCBzdGFydCk7XG4gICAgdGhpcy5fcmVxdWlyZVN0cignQ0RBVEFbJyk7XG4gICAgdGhpcy5fZW5kVG9rZW4oW10pO1xuICAgIHZhciB0ZXh0VG9rZW4gPSB0aGlzLl9jb25zdW1lUmF3VGV4dChmYWxzZSwgJFJCUkFDS0VULCAoKSA9PiB0aGlzLl9hdHRlbXB0U3RyKCddPicpKTtcbiAgICB0aGlzLl9iZWdpblRva2VuKEh0bWxUb2tlblR5cGUuQ0RBVEFfRU5ELCB0ZXh0VG9rZW4uc291cmNlU3Bhbi5lbmQpO1xuICAgIHRoaXMuX2VuZFRva2VuKFtdKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnN1bWVEb2NUeXBlKHN0YXJ0OiBQYXJzZUxvY2F0aW9uKSB7XG4gICAgdGhpcy5fYmVnaW5Ub2tlbihIdG1sVG9rZW5UeXBlLkRPQ19UWVBFLCBzdGFydCk7XG4gICAgdGhpcy5fYXR0ZW1wdFVudGlsQ2hhcigkR1QpO1xuICAgIHRoaXMuX2FkdmFuY2UoKTtcbiAgICB0aGlzLl9lbmRUb2tlbihbdGhpcy5pbnB1dC5zdWJzdHJpbmcoc3RhcnQub2Zmc2V0ICsgMiwgdGhpcy5pbmRleCAtIDEpXSk7XG4gIH1cblxuICBwcml2YXRlIF9jb25zdW1lUHJlZml4QW5kTmFtZSgpOiBzdHJpbmdbXSB7XG4gICAgdmFyIG5hbWVPclByZWZpeFN0YXJ0ID0gdGhpcy5pbmRleDtcbiAgICB2YXIgcHJlZml4ID0gbnVsbDtcbiAgICB3aGlsZSAodGhpcy5wZWVrICE9PSAkQ09MT04gJiYgIWlzUHJlZml4RW5kKHRoaXMucGVlaykpIHtcbiAgICAgIHRoaXMuX2FkdmFuY2UoKTtcbiAgICB9XG4gICAgdmFyIG5hbWVTdGFydDtcbiAgICBpZiAodGhpcy5wZWVrID09PSAkQ09MT04pIHtcbiAgICAgIHRoaXMuX2FkdmFuY2UoKTtcbiAgICAgIHByZWZpeCA9IHRoaXMuaW5wdXQuc3Vic3RyaW5nKG5hbWVPclByZWZpeFN0YXJ0LCB0aGlzLmluZGV4IC0gMSk7XG4gICAgICBuYW1lU3RhcnQgPSB0aGlzLmluZGV4O1xuICAgIH0gZWxzZSB7XG4gICAgICBuYW1lU3RhcnQgPSBuYW1lT3JQcmVmaXhTdGFydDtcbiAgICB9XG4gICAgdGhpcy5fcmVxdWlyZUNoYXJDb2RlVW50aWxGbihpc05hbWVFbmQsIHRoaXMuaW5kZXggPT09IG5hbWVTdGFydCA/IDEgOiAwKTtcbiAgICB2YXIgbmFtZSA9IHRoaXMuaW5wdXQuc3Vic3RyaW5nKG5hbWVTdGFydCwgdGhpcy5pbmRleCk7XG4gICAgcmV0dXJuIFtwcmVmaXgsIG5hbWVdO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29uc3VtZVRhZ09wZW4oc3RhcnQ6IFBhcnNlTG9jYXRpb24pIHtcbiAgICBsZXQgc2F2ZWRQb3MgPSB0aGlzLl9zYXZlUG9zaXRpb24oKTtcbiAgICBsZXQgbG93ZXJjYXNlVGFnTmFtZTtcbiAgICB0cnkge1xuICAgICAgaWYgKCFpc0FzY2lpTGV0dGVyKHRoaXMucGVlaykpIHtcbiAgICAgICAgdGhyb3cgdGhpcy5fY3JlYXRlRXJyb3IodW5leHBlY3RlZENoYXJhY3RlckVycm9yTXNnKHRoaXMucGVlayksIHRoaXMuX2dldFNwYW4oKSk7XG4gICAgICB9XG4gICAgICB2YXIgbmFtZVN0YXJ0ID0gdGhpcy5pbmRleDtcbiAgICAgIHRoaXMuX2NvbnN1bWVUYWdPcGVuU3RhcnQoc3RhcnQpO1xuICAgICAgbG93ZXJjYXNlVGFnTmFtZSA9IHRoaXMuaW5wdXQuc3Vic3RyaW5nKG5hbWVTdGFydCwgdGhpcy5pbmRleCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIHRoaXMuX2F0dGVtcHRDaGFyQ29kZVVudGlsRm4oaXNOb3RXaGl0ZXNwYWNlKTtcbiAgICAgIHdoaWxlICh0aGlzLnBlZWsgIT09ICRTTEFTSCAmJiB0aGlzLnBlZWsgIT09ICRHVCkge1xuICAgICAgICB0aGlzLl9jb25zdW1lQXR0cmlidXRlTmFtZSgpO1xuICAgICAgICB0aGlzLl9hdHRlbXB0Q2hhckNvZGVVbnRpbEZuKGlzTm90V2hpdGVzcGFjZSk7XG4gICAgICAgIGlmICh0aGlzLl9hdHRlbXB0Q2hhckNvZGUoJEVRKSkge1xuICAgICAgICAgIHRoaXMuX2F0dGVtcHRDaGFyQ29kZVVudGlsRm4oaXNOb3RXaGl0ZXNwYWNlKTtcbiAgICAgICAgICB0aGlzLl9jb25zdW1lQXR0cmlidXRlVmFsdWUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9hdHRlbXB0Q2hhckNvZGVVbnRpbEZuKGlzTm90V2hpdGVzcGFjZSk7XG4gICAgICB9XG4gICAgICB0aGlzLl9jb25zdW1lVGFnT3BlbkVuZCgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlIGluc3RhbmNlb2YgQ29udHJvbEZsb3dFcnJvcikge1xuICAgICAgICAvLyBXaGVuIHRoZSBzdGFydCB0YWcgaXMgaW52YWxpZCwgYXNzdW1lIHdlIHdhbnQgYSBcIjxcIlxuICAgICAgICB0aGlzLl9yZXN0b3JlUG9zaXRpb24oc2F2ZWRQb3MpO1xuICAgICAgICAvLyBCYWNrIHRvIGJhY2sgdGV4dCB0b2tlbnMgYXJlIG1lcmdlZCBhdCB0aGUgZW5kXG4gICAgICAgIHRoaXMuX2JlZ2luVG9rZW4oSHRtbFRva2VuVHlwZS5URVhULCBzdGFydCk7XG4gICAgICAgIHRoaXMuX2VuZFRva2VuKFsnPCddKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aHJvdyBlO1xuICAgIH1cblxuICAgIHZhciBjb250ZW50VG9rZW5UeXBlID0gZ2V0SHRtbFRhZ0RlZmluaXRpb24obG93ZXJjYXNlVGFnTmFtZSkuY29udGVudFR5cGU7XG4gICAgaWYgKGNvbnRlbnRUb2tlblR5cGUgPT09IEh0bWxUYWdDb250ZW50VHlwZS5SQVdfVEVYVCkge1xuICAgICAgdGhpcy5fY29uc3VtZVJhd1RleHRXaXRoVGFnQ2xvc2UobG93ZXJjYXNlVGFnTmFtZSwgZmFsc2UpO1xuICAgIH0gZWxzZSBpZiAoY29udGVudFRva2VuVHlwZSA9PT0gSHRtbFRhZ0NvbnRlbnRUeXBlLkVTQ0FQQUJMRV9SQVdfVEVYVCkge1xuICAgICAgdGhpcy5fY29uc3VtZVJhd1RleHRXaXRoVGFnQ2xvc2UobG93ZXJjYXNlVGFnTmFtZSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY29uc3VtZVJhd1RleHRXaXRoVGFnQ2xvc2UobG93ZXJjYXNlVGFnTmFtZTogc3RyaW5nLCBkZWNvZGVFbnRpdGllczogYm9vbGVhbikge1xuICAgIHZhciB0ZXh0VG9rZW4gPSB0aGlzLl9jb25zdW1lUmF3VGV4dChkZWNvZGVFbnRpdGllcywgJExULCAoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuX2F0dGVtcHRDaGFyQ29kZSgkU0xBU0gpKSByZXR1cm4gZmFsc2U7XG4gICAgICB0aGlzLl9hdHRlbXB0Q2hhckNvZGVVbnRpbEZuKGlzTm90V2hpdGVzcGFjZSk7XG4gICAgICBpZiAoIXRoaXMuX2F0dGVtcHRTdHJDYXNlSW5zZW5zaXRpdmUobG93ZXJjYXNlVGFnTmFtZSkpIHJldHVybiBmYWxzZTtcbiAgICAgIHRoaXMuX2F0dGVtcHRDaGFyQ29kZVVudGlsRm4oaXNOb3RXaGl0ZXNwYWNlKTtcbiAgICAgIGlmICghdGhpcy5fYXR0ZW1wdENoYXJDb2RlKCRHVCkpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICAgIHRoaXMuX2JlZ2luVG9rZW4oSHRtbFRva2VuVHlwZS5UQUdfQ0xPU0UsIHRleHRUb2tlbi5zb3VyY2VTcGFuLmVuZCk7XG4gICAgdGhpcy5fZW5kVG9rZW4oW251bGwsIGxvd2VyY2FzZVRhZ05hbWVdKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnN1bWVUYWdPcGVuU3RhcnQoc3RhcnQ6IFBhcnNlTG9jYXRpb24pIHtcbiAgICB0aGlzLl9iZWdpblRva2VuKEh0bWxUb2tlblR5cGUuVEFHX09QRU5fU1RBUlQsIHN0YXJ0KTtcbiAgICB2YXIgcGFydHMgPSB0aGlzLl9jb25zdW1lUHJlZml4QW5kTmFtZSgpO1xuICAgIHRoaXMuX2VuZFRva2VuKHBhcnRzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnN1bWVBdHRyaWJ1dGVOYW1lKCkge1xuICAgIHRoaXMuX2JlZ2luVG9rZW4oSHRtbFRva2VuVHlwZS5BVFRSX05BTUUpO1xuICAgIHZhciBwcmVmaXhBbmROYW1lID0gdGhpcy5fY29uc3VtZVByZWZpeEFuZE5hbWUoKTtcbiAgICB0aGlzLl9lbmRUb2tlbihwcmVmaXhBbmROYW1lKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnN1bWVBdHRyaWJ1dGVWYWx1ZSgpIHtcbiAgICB0aGlzLl9iZWdpblRva2VuKEh0bWxUb2tlblR5cGUuQVRUUl9WQUxVRSk7XG4gICAgdmFyIHZhbHVlO1xuICAgIGlmICh0aGlzLnBlZWsgPT09ICRTUSB8fCB0aGlzLnBlZWsgPT09ICREUSkge1xuICAgICAgdmFyIHF1b3RlQ2hhciA9IHRoaXMucGVlaztcbiAgICAgIHRoaXMuX2FkdmFuY2UoKTtcbiAgICAgIHZhciBwYXJ0cyA9IFtdO1xuICAgICAgd2hpbGUgKHRoaXMucGVlayAhPT0gcXVvdGVDaGFyKSB7XG4gICAgICAgIHBhcnRzLnB1c2godGhpcy5fcmVhZENoYXIodHJ1ZSkpO1xuICAgICAgfVxuICAgICAgdmFsdWUgPSBwYXJ0cy5qb2luKCcnKTtcbiAgICAgIHRoaXMuX2FkdmFuY2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHZhbHVlU3RhcnQgPSB0aGlzLmluZGV4O1xuICAgICAgdGhpcy5fcmVxdWlyZUNoYXJDb2RlVW50aWxGbihpc05hbWVFbmQsIDEpO1xuICAgICAgdmFsdWUgPSB0aGlzLmlucHV0LnN1YnN0cmluZyh2YWx1ZVN0YXJ0LCB0aGlzLmluZGV4KTtcbiAgICB9XG4gICAgdGhpcy5fZW5kVG9rZW4oW3RoaXMuX3Byb2Nlc3NDYXJyaWFnZVJldHVybnModmFsdWUpXSk7XG4gIH1cblxuICBwcml2YXRlIF9jb25zdW1lVGFnT3BlbkVuZCgpIHtcbiAgICB2YXIgdG9rZW5UeXBlID0gdGhpcy5fYXR0ZW1wdENoYXJDb2RlKCRTTEFTSCkgPyBIdG1sVG9rZW5UeXBlLlRBR19PUEVOX0VORF9WT0lEIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIdG1sVG9rZW5UeXBlLlRBR19PUEVOX0VORDtcbiAgICB0aGlzLl9iZWdpblRva2VuKHRva2VuVHlwZSk7XG4gICAgdGhpcy5fcmVxdWlyZUNoYXJDb2RlKCRHVCk7XG4gICAgdGhpcy5fZW5kVG9rZW4oW10pO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29uc3VtZVRhZ0Nsb3NlKHN0YXJ0OiBQYXJzZUxvY2F0aW9uKSB7XG4gICAgdGhpcy5fYmVnaW5Ub2tlbihIdG1sVG9rZW5UeXBlLlRBR19DTE9TRSwgc3RhcnQpO1xuICAgIHRoaXMuX2F0dGVtcHRDaGFyQ29kZVVudGlsRm4oaXNOb3RXaGl0ZXNwYWNlKTtcbiAgICB2YXIgcHJlZml4QW5kTmFtZTtcbiAgICBwcmVmaXhBbmROYW1lID0gdGhpcy5fY29uc3VtZVByZWZpeEFuZE5hbWUoKTtcbiAgICB0aGlzLl9hdHRlbXB0Q2hhckNvZGVVbnRpbEZuKGlzTm90V2hpdGVzcGFjZSk7XG4gICAgdGhpcy5fcmVxdWlyZUNoYXJDb2RlKCRHVCk7XG4gICAgdGhpcy5fZW5kVG9rZW4ocHJlZml4QW5kTmFtZSk7XG4gIH1cblxuICBwcml2YXRlIF9jb25zdW1lVGV4dCgpIHtcbiAgICB2YXIgc3RhcnQgPSB0aGlzLl9nZXRMb2NhdGlvbigpO1xuICAgIHRoaXMuX2JlZ2luVG9rZW4oSHRtbFRva2VuVHlwZS5URVhULCBzdGFydCk7XG4gICAgdmFyIHBhcnRzID0gW3RoaXMuX3JlYWRDaGFyKHRydWUpXTtcbiAgICB3aGlsZSAoIWlzVGV4dEVuZCh0aGlzLnBlZWspKSB7XG4gICAgICBwYXJ0cy5wdXNoKHRoaXMuX3JlYWRDaGFyKHRydWUpKTtcbiAgICB9XG4gICAgdGhpcy5fZW5kVG9rZW4oW3RoaXMuX3Byb2Nlc3NDYXJyaWFnZVJldHVybnMocGFydHMuam9pbignJykpXSk7XG4gIH1cblxuICBwcml2YXRlIF9zYXZlUG9zaXRpb24oKTogbnVtYmVyW10ge1xuICAgIHJldHVybiBbdGhpcy5wZWVrLCB0aGlzLmluZGV4LCB0aGlzLmNvbHVtbiwgdGhpcy5saW5lLCB0aGlzLnRva2Vucy5sZW5ndGhdO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVzdG9yZVBvc2l0aW9uKHBvc2l0aW9uOiBudW1iZXJbXSk6IHZvaWQge1xuICAgIHRoaXMucGVlayA9IHBvc2l0aW9uWzBdO1xuICAgIHRoaXMuaW5kZXggPSBwb3NpdGlvblsxXTtcbiAgICB0aGlzLmNvbHVtbiA9IHBvc2l0aW9uWzJdO1xuICAgIHRoaXMubGluZSA9IHBvc2l0aW9uWzNdO1xuICAgIGxldCBuYlRva2VucyA9IHBvc2l0aW9uWzRdO1xuICAgIGlmIChuYlRva2VucyA8IHRoaXMudG9rZW5zLmxlbmd0aCkge1xuICAgICAgLy8gcmVtb3ZlIGFueSBleHRyYSB0b2tlbnNcbiAgICAgIHRoaXMudG9rZW5zID0gTGlzdFdyYXBwZXIuc2xpY2UodGhpcy50b2tlbnMsIDAsIG5iVG9rZW5zKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNOb3RXaGl0ZXNwYWNlKGNvZGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICByZXR1cm4gIWlzV2hpdGVzcGFjZShjb2RlKSB8fCBjb2RlID09PSAkRU9GO1xufVxuXG5mdW5jdGlvbiBpc1doaXRlc3BhY2UoY29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiAoY29kZSA+PSAkVEFCICYmIGNvZGUgPD0gJFNQQUNFKSB8fCAoY29kZSA9PT0gJE5CU1ApO1xufVxuXG5mdW5jdGlvbiBpc05hbWVFbmQoY29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiBpc1doaXRlc3BhY2UoY29kZSkgfHwgY29kZSA9PT0gJEdUIHx8IGNvZGUgPT09ICRTTEFTSCB8fCBjb2RlID09PSAkU1EgfHwgY29kZSA9PT0gJERRIHx8XG4gICAgICAgICBjb2RlID09PSAkRVE7XG59XG5cbmZ1bmN0aW9uIGlzUHJlZml4RW5kKGNvZGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICByZXR1cm4gKGNvZGUgPCAkYSB8fCAkeiA8IGNvZGUpICYmIChjb2RlIDwgJEEgfHwgJFogPCBjb2RlKSAmJiAoY29kZSA8ICQwIHx8IGNvZGUgPiAkOSk7XG59XG5cbmZ1bmN0aW9uIGlzRGlnaXRFbnRpdHlFbmQoY29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiBjb2RlID09ICRTRU1JQ09MT04gfHwgY29kZSA9PSAkRU9GIHx8ICFpc0FzY2lpSGV4RGlnaXQoY29kZSk7XG59XG5cbmZ1bmN0aW9uIGlzTmFtZWRFbnRpdHlFbmQoY29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiBjb2RlID09ICRTRU1JQ09MT04gfHwgY29kZSA9PSAkRU9GIHx8ICFpc0FzY2lpTGV0dGVyKGNvZGUpO1xufVxuXG5mdW5jdGlvbiBpc1RleHRFbmQoY29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiBjb2RlID09PSAkTFQgfHwgY29kZSA9PT0gJEVPRjtcbn1cblxuZnVuY3Rpb24gaXNBc2NpaUxldHRlcihjb2RlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgcmV0dXJuIGNvZGUgPj0gJGEgJiYgY29kZSA8PSAkeiB8fCBjb2RlID49ICRBICYmIGNvZGUgPD0gJFo7XG59XG5cbmZ1bmN0aW9uIGlzQXNjaWlIZXhEaWdpdChjb2RlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgcmV0dXJuIGNvZGUgPj0gJGEgJiYgY29kZSA8PSAkZiB8fCBjb2RlID49ICRBICYmIGNvZGUgPD0gJEYgfHwgY29kZSA+PSAkMCAmJiBjb2RlIDw9ICQ5O1xufVxuXG5mdW5jdGlvbiBjb21wYXJlQ2hhckNvZGVDYXNlSW5zZW5zaXRpdmUoY29kZTE6IG51bWJlciwgY29kZTI6IG51bWJlcik6IGJvb2xlYW4ge1xuICByZXR1cm4gdG9VcHBlckNhc2VDaGFyQ29kZShjb2RlMSkgPT0gdG9VcHBlckNhc2VDaGFyQ29kZShjb2RlMik7XG59XG5cbmZ1bmN0aW9uIHRvVXBwZXJDYXNlQ2hhckNvZGUoY29kZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuIGNvZGUgPj0gJGEgJiYgY29kZSA8PSAkeiA/IGNvZGUgLSAkYSArICRBIDogY29kZTtcbn1cblxuZnVuY3Rpb24gbWVyZ2VUZXh0VG9rZW5zKHNyY1Rva2VuczogSHRtbFRva2VuW10pOiBIdG1sVG9rZW5bXSB7XG4gIGxldCBkc3RUb2tlbnMgPSBbXTtcbiAgbGV0IGxhc3REc3RUb2tlbjogSHRtbFRva2VuO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNyY1Rva2Vucy5sZW5ndGg7IGkrKykge1xuICAgIGxldCB0b2tlbiA9IHNyY1Rva2Vuc1tpXTtcbiAgICBpZiAoaXNQcmVzZW50KGxhc3REc3RUb2tlbikgJiYgbGFzdERzdFRva2VuLnR5cGUgPT0gSHRtbFRva2VuVHlwZS5URVhUICYmXG4gICAgICAgIHRva2VuLnR5cGUgPT0gSHRtbFRva2VuVHlwZS5URVhUKSB7XG4gICAgICBsYXN0RHN0VG9rZW4ucGFydHNbMF0gKz0gdG9rZW4ucGFydHNbMF07XG4gICAgICBsYXN0RHN0VG9rZW4uc291cmNlU3Bhbi5lbmQgPSB0b2tlbi5zb3VyY2VTcGFuLmVuZDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGFzdERzdFRva2VuID0gdG9rZW47XG4gICAgICBkc3RUb2tlbnMucHVzaChsYXN0RHN0VG9rZW4pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkc3RUb2tlbnM7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
