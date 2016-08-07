System.register(['angular2/src/core/di/decorators', "angular2/src/facade/collection", "angular2/src/facade/lang", 'angular2/src/facade/exceptions'], function(exports_1, context_1) {
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
    var decorators_1, collection_1, lang_1, exceptions_1;
    var TokenType, Lexer, Token, EOF, $EOF, $TAB, $LF, $VTAB, $FF, $CR, $SPACE, $BANG, $DQ, $HASH, $$, $PERCENT, $AMPERSAND, $SQ, $LPAREN, $RPAREN, $STAR, $PLUS, $COMMA, $MINUS, $PERIOD, $SLASH, $COLON, $SEMICOLON, $LT, $EQ, $GT, $QUESTION, $0, $9, $A, $E, $Z, $LBRACKET, $BACKSLASH, $RBRACKET, $CARET, $_, $a, $e, $f, $n, $r, $t, $u, $v, $z, $LBRACE, $BAR, $RBRACE, $NBSP, ScannerError, _Scanner, OPERATORS, KEYWORDS;
    function newCharacterToken(index, code) {
        return new Token(index, TokenType.Character, code, lang_1.StringWrapper.fromCharCode(code));
    }
    function newIdentifierToken(index, text) {
        return new Token(index, TokenType.Identifier, 0, text);
    }
    function newKeywordToken(index, text) {
        return new Token(index, TokenType.Keyword, 0, text);
    }
    function newOperatorToken(index, text) {
        return new Token(index, TokenType.Operator, 0, text);
    }
    function newStringToken(index, text) {
        return new Token(index, TokenType.String, 0, text);
    }
    function newNumberToken(index, n) {
        return new Token(index, TokenType.Number, n, "");
    }
    function isWhitespace(code) {
        return (code >= $TAB && code <= $SPACE) || (code == $NBSP);
    }
    function isIdentifierStart(code) {
        return ($a <= code && code <= $z) || ($A <= code && code <= $Z) || (code == $_) || (code == $$);
    }
    function isIdentifier(input) {
        if (input.length == 0)
            return false;
        var scanner = new _Scanner(input);
        if (!isIdentifierStart(scanner.peek))
            return false;
        scanner.advance();
        while (scanner.peek !== $EOF) {
            if (!isIdentifierPart(scanner.peek))
                return false;
            scanner.advance();
        }
        return true;
    }
    exports_1("isIdentifier", isIdentifier);
    function isIdentifierPart(code) {
        return ($a <= code && code <= $z) || ($A <= code && code <= $Z) || ($0 <= code && code <= $9) ||
            (code == $_) || (code == $$);
    }
    function isDigit(code) {
        return $0 <= code && code <= $9;
    }
    function isExponentStart(code) {
        return code == $e || code == $E;
    }
    function isExponentSign(code) {
        return code == $MINUS || code == $PLUS;
    }
    function unescape(code) {
        switch (code) {
            case $n:
                return $LF;
            case $f:
                return $FF;
            case $r:
                return $CR;
            case $t:
                return $TAB;
            case $v:
                return $VTAB;
            default:
                return code;
        }
    }
    return {
        setters:[
            function (decorators_1_1) {
                decorators_1 = decorators_1_1;
            },
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
            (function (TokenType) {
                TokenType[TokenType["Character"] = 0] = "Character";
                TokenType[TokenType["Identifier"] = 1] = "Identifier";
                TokenType[TokenType["Keyword"] = 2] = "Keyword";
                TokenType[TokenType["String"] = 3] = "String";
                TokenType[TokenType["Operator"] = 4] = "Operator";
                TokenType[TokenType["Number"] = 5] = "Number";
            })(TokenType || (TokenType = {}));
            exports_1("TokenType", TokenType);
            Lexer = (function () {
                function Lexer() {
                }
                Lexer.prototype.tokenize = function (text) {
                    var scanner = new _Scanner(text);
                    var tokens = [];
                    var token = scanner.scanToken();
                    while (token != null) {
                        tokens.push(token);
                        token = scanner.scanToken();
                    }
                    return tokens;
                };
                Lexer = __decorate([
                    decorators_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], Lexer);
                return Lexer;
            }());
            exports_1("Lexer", Lexer);
            Token = (function () {
                function Token(index, type, numValue, strValue) {
                    this.index = index;
                    this.type = type;
                    this.numValue = numValue;
                    this.strValue = strValue;
                }
                Token.prototype.isCharacter = function (code) {
                    return (this.type == TokenType.Character && this.numValue == code);
                };
                Token.prototype.isNumber = function () { return (this.type == TokenType.Number); };
                Token.prototype.isString = function () { return (this.type == TokenType.String); };
                Token.prototype.isOperator = function (operater) {
                    return (this.type == TokenType.Operator && this.strValue == operater);
                };
                Token.prototype.isIdentifier = function () { return (this.type == TokenType.Identifier); };
                Token.prototype.isKeyword = function () { return (this.type == TokenType.Keyword); };
                Token.prototype.isKeywordVar = function () { return (this.type == TokenType.Keyword && this.strValue == "var"); };
                Token.prototype.isKeywordNull = function () { return (this.type == TokenType.Keyword && this.strValue == "null"); };
                Token.prototype.isKeywordUndefined = function () {
                    return (this.type == TokenType.Keyword && this.strValue == "undefined");
                };
                Token.prototype.isKeywordTrue = function () { return (this.type == TokenType.Keyword && this.strValue == "true"); };
                Token.prototype.isKeywordFalse = function () { return (this.type == TokenType.Keyword && this.strValue == "false"); };
                Token.prototype.toNumber = function () {
                    // -1 instead of NULL ok?
                    return (this.type == TokenType.Number) ? this.numValue : -1;
                };
                Token.prototype.toString = function () {
                    switch (this.type) {
                        case TokenType.Character:
                        case TokenType.Identifier:
                        case TokenType.Keyword:
                        case TokenType.Operator:
                        case TokenType.String:
                            return this.strValue;
                        case TokenType.Number:
                            return this.numValue.toString();
                        default:
                            return null;
                    }
                };
                return Token;
            }());
            exports_1("Token", Token);
            exports_1("EOF", EOF = new Token(-1, TokenType.Character, 0, ""));
            exports_1("$EOF", $EOF = 0);
            exports_1("$TAB", $TAB = 9);
            exports_1("$LF", $LF = 10);
            exports_1("$VTAB", $VTAB = 11);
            exports_1("$FF", $FF = 12);
            exports_1("$CR", $CR = 13);
            exports_1("$SPACE", $SPACE = 32);
            exports_1("$BANG", $BANG = 33);
            exports_1("$DQ", $DQ = 34);
            exports_1("$HASH", $HASH = 35);
            exports_1("$$", $$ = 36);
            exports_1("$PERCENT", $PERCENT = 37);
            exports_1("$AMPERSAND", $AMPERSAND = 38);
            exports_1("$SQ", $SQ = 39);
            exports_1("$LPAREN", $LPAREN = 40);
            exports_1("$RPAREN", $RPAREN = 41);
            exports_1("$STAR", $STAR = 42);
            exports_1("$PLUS", $PLUS = 43);
            exports_1("$COMMA", $COMMA = 44);
            exports_1("$MINUS", $MINUS = 45);
            exports_1("$PERIOD", $PERIOD = 46);
            exports_1("$SLASH", $SLASH = 47);
            exports_1("$COLON", $COLON = 58);
            exports_1("$SEMICOLON", $SEMICOLON = 59);
            exports_1("$LT", $LT = 60);
            exports_1("$EQ", $EQ = 61);
            exports_1("$GT", $GT = 62);
            exports_1("$QUESTION", $QUESTION = 63);
            $0 = 48;
            $9 = 57;
            $A = 65, $E = 69, $Z = 90;
            exports_1("$LBRACKET", $LBRACKET = 91);
            exports_1("$BACKSLASH", $BACKSLASH = 92);
            exports_1("$RBRACKET", $RBRACKET = 93);
            $CARET = 94;
            $_ = 95;
            $a = 97, $e = 101, $f = 102, $n = 110, $r = 114, $t = 116, $u = 117, $v = 118, $z = 122;
            exports_1("$LBRACE", $LBRACE = 123);
            exports_1("$BAR", $BAR = 124);
            exports_1("$RBRACE", $RBRACE = 125);
            $NBSP = 160;
            ScannerError = (function (_super) {
                __extends(ScannerError, _super);
                function ScannerError(message) {
                    _super.call(this);
                    this.message = message;
                }
                ScannerError.prototype.toString = function () { return this.message; };
                return ScannerError;
            }(exceptions_1.BaseException));
            exports_1("ScannerError", ScannerError);
            _Scanner = (function () {
                function _Scanner(input) {
                    this.input = input;
                    this.peek = 0;
                    this.index = -1;
                    this.length = input.length;
                    this.advance();
                }
                _Scanner.prototype.advance = function () {
                    this.peek =
                        ++this.index >= this.length ? $EOF : lang_1.StringWrapper.charCodeAt(this.input, this.index);
                };
                _Scanner.prototype.scanToken = function () {
                    var input = this.input, length = this.length, peek = this.peek, index = this.index;
                    // Skip whitespace.
                    while (peek <= $SPACE) {
                        if (++index >= length) {
                            peek = $EOF;
                            break;
                        }
                        else {
                            peek = lang_1.StringWrapper.charCodeAt(input, index);
                        }
                    }
                    this.peek = peek;
                    this.index = index;
                    if (index >= length) {
                        return null;
                    }
                    // Handle identifiers and numbers.
                    if (isIdentifierStart(peek))
                        return this.scanIdentifier();
                    if (isDigit(peek))
                        return this.scanNumber(index);
                    var start = index;
                    switch (peek) {
                        case $PERIOD:
                            this.advance();
                            return isDigit(this.peek) ? this.scanNumber(start) : newCharacterToken(start, $PERIOD);
                        case $LPAREN:
                        case $RPAREN:
                        case $LBRACE:
                        case $RBRACE:
                        case $LBRACKET:
                        case $RBRACKET:
                        case $COMMA:
                        case $COLON:
                        case $SEMICOLON:
                            return this.scanCharacter(start, peek);
                        case $SQ:
                        case $DQ:
                            return this.scanString();
                        case $HASH:
                        case $PLUS:
                        case $MINUS:
                        case $STAR:
                        case $SLASH:
                        case $PERCENT:
                        case $CARET:
                            return this.scanOperator(start, lang_1.StringWrapper.fromCharCode(peek));
                        case $QUESTION:
                            return this.scanComplexOperator(start, '?', $PERIOD, '.');
                        case $LT:
                        case $GT:
                            return this.scanComplexOperator(start, lang_1.StringWrapper.fromCharCode(peek), $EQ, '=');
                        case $BANG:
                        case $EQ:
                            return this.scanComplexOperator(start, lang_1.StringWrapper.fromCharCode(peek), $EQ, '=', $EQ, '=');
                        case $AMPERSAND:
                            return this.scanComplexOperator(start, '&', $AMPERSAND, '&');
                        case $BAR:
                            return this.scanComplexOperator(start, '|', $BAR, '|');
                        case $NBSP:
                            while (isWhitespace(this.peek))
                                this.advance();
                            return this.scanToken();
                    }
                    this.error("Unexpected character [" + lang_1.StringWrapper.fromCharCode(peek) + "]", 0);
                    return null;
                };
                _Scanner.prototype.scanCharacter = function (start, code) {
                    this.advance();
                    return newCharacterToken(start, code);
                };
                _Scanner.prototype.scanOperator = function (start, str) {
                    this.advance();
                    return newOperatorToken(start, str);
                };
                /**
                 * Tokenize a 2/3 char long operator
                 *
                 * @param start start index in the expression
                 * @param one first symbol (always part of the operator)
                 * @param twoCode code point for the second symbol
                 * @param two second symbol (part of the operator when the second code point matches)
                 * @param threeCode code point for the third symbol
                 * @param three third symbol (part of the operator when provided and matches source expression)
                 * @returns {Token}
                 */
                _Scanner.prototype.scanComplexOperator = function (start, one, twoCode, two, threeCode, three) {
                    this.advance();
                    var str = one;
                    if (this.peek == twoCode) {
                        this.advance();
                        str += two;
                    }
                    if (lang_1.isPresent(threeCode) && this.peek == threeCode) {
                        this.advance();
                        str += three;
                    }
                    return newOperatorToken(start, str);
                };
                _Scanner.prototype.scanIdentifier = function () {
                    var start = this.index;
                    this.advance();
                    while (isIdentifierPart(this.peek))
                        this.advance();
                    var str = this.input.substring(start, this.index);
                    if (collection_1.SetWrapper.has(KEYWORDS, str)) {
                        return newKeywordToken(start, str);
                    }
                    else {
                        return newIdentifierToken(start, str);
                    }
                };
                _Scanner.prototype.scanNumber = function (start) {
                    var simple = (this.index === start);
                    this.advance(); // Skip initial digit.
                    while (true) {
                        if (isDigit(this.peek)) {
                        }
                        else if (this.peek == $PERIOD) {
                            simple = false;
                        }
                        else if (isExponentStart(this.peek)) {
                            this.advance();
                            if (isExponentSign(this.peek))
                                this.advance();
                            if (!isDigit(this.peek))
                                this.error('Invalid exponent', -1);
                            simple = false;
                        }
                        else {
                            break;
                        }
                        this.advance();
                    }
                    var str = this.input.substring(start, this.index);
                    // TODO
                    var value = simple ? lang_1.NumberWrapper.parseIntAutoRadix(str) : lang_1.NumberWrapper.parseFloat(str);
                    return newNumberToken(start, value);
                };
                _Scanner.prototype.scanString = function () {
                    var start = this.index;
                    var quote = this.peek;
                    this.advance(); // Skip initial quote.
                    var buffer;
                    var marker = this.index;
                    var input = this.input;
                    while (this.peek != quote) {
                        if (this.peek == $BACKSLASH) {
                            if (buffer == null)
                                buffer = new lang_1.StringJoiner();
                            buffer.add(input.substring(marker, this.index));
                            this.advance();
                            var unescapedCode;
                            if (this.peek == $u) {
                                // 4 character hex code for unicode character.
                                var hex = input.substring(this.index + 1, this.index + 5);
                                try {
                                    unescapedCode = lang_1.NumberWrapper.parseInt(hex, 16);
                                }
                                catch (e) {
                                    this.error("Invalid unicode escape [\\u" + hex + "]", 0);
                                }
                                for (var i = 0; i < 5; i++) {
                                    this.advance();
                                }
                            }
                            else {
                                unescapedCode = unescape(this.peek);
                                this.advance();
                            }
                            buffer.add(lang_1.StringWrapper.fromCharCode(unescapedCode));
                            marker = this.index;
                        }
                        else if (this.peek == $EOF) {
                            this.error('Unterminated quote', 0);
                        }
                        else {
                            this.advance();
                        }
                    }
                    var last = input.substring(marker, this.index);
                    this.advance(); // Skip terminating quote.
                    // Compute the unescaped string value.
                    var unescaped = last;
                    if (buffer != null) {
                        buffer.add(last);
                        unescaped = buffer.toString();
                    }
                    return newStringToken(start, unescaped);
                };
                _Scanner.prototype.error = function (message, offset) {
                    var position = this.index + offset;
                    throw new ScannerError("Lexer Error: " + message + " at column " + position + " in expression [" + this.input + "]");
                };
                return _Scanner;
            }());
            OPERATORS = collection_1.SetWrapper.createFromList([
                '+',
                '-',
                '*',
                '/',
                '%',
                '^',
                '=',
                '==',
                '!=',
                '===',
                '!==',
                '<',
                '>',
                '<=',
                '>=',
                '&&',
                '||',
                '&',
                '|',
                '!',
                '?',
                '#',
                '?.'
            ]);
            KEYWORDS = collection_1.SetWrapper.createFromList(['var', 'null', 'undefined', 'true', 'false', 'if', 'else']);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9wYXJzZXIvbGV4ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lDQTBHVyxHQUFHLEVBRUQsSUFBSSxFQUNKLElBQUksRUFDSixHQUFHLEVBQ0gsS0FBSyxFQUNMLEdBQUcsRUFDSCxHQUFHLEVBQ0gsTUFBTSxFQUNOLEtBQUssRUFDTCxHQUFHLEVBQ0gsS0FBSyxFQUNMLEVBQUUsRUFDRixRQUFRLEVBQ1IsVUFBVSxFQUNWLEdBQUcsRUFDSCxPQUFPLEVBQ1AsT0FBTyxFQUNQLEtBQUssRUFDTCxLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEVBQ1YsR0FBRyxFQUNILEdBQUcsRUFDSCxHQUFHLEVBQ0gsU0FBUyxFQUVoQixFQUFFLEVBQ0YsRUFBRSxFQUVGLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUViLFNBQVMsRUFDVCxVQUFVLEVBQ1YsU0FBUyxFQUNoQixNQUFNLEVBQ04sRUFBRSxFQUVGLEVBQUUsRUFBTyxFQUFFLEVBQVEsRUFBRSxFQUFRLEVBQUUsRUFBUSxFQUFFLEVBQVEsRUFBRSxFQUFRLEVBQUUsRUFBUSxFQUFFLEVBQVEsRUFBRSxFQUUxRSxPQUFPLEVBQ1AsSUFBSSxFQUNKLE9BQU8sRUFDZCxLQUFLLDBCQXlSUCxTQUFTLEVBMkJULFFBQVE7SUE1WFosMkJBQTJCLEtBQWEsRUFBRSxJQUFZO1FBQ3BELE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsb0JBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBRUQsNEJBQTRCLEtBQWEsRUFBRSxJQUFZO1FBQ3JELE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELHlCQUF5QixLQUFhLEVBQUUsSUFBWTtRQUNsRCxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCwwQkFBMEIsS0FBYSxFQUFFLElBQVk7UUFDbkQsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsd0JBQXdCLEtBQWEsRUFBRSxJQUFZO1FBQ2pELE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELHdCQUF3QixLQUFhLEVBQUUsQ0FBUztRQUM5QyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFxUkQsc0JBQXNCLElBQVk7UUFDaEMsTUFBTSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELDJCQUEyQixJQUFZO1FBQ3JDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7SUFDbEcsQ0FBQztJQUVELHNCQUE2QixLQUFhO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNwQyxJQUFJLE9BQU8sR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDbkQsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2xCLE9BQU8sT0FBTyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUM3QixFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2xELE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNwQixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFWRCx1Q0FVQyxDQUFBO0lBRUQsMEJBQTBCLElBQVk7UUFDcEMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUN0RixDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsaUJBQWlCLElBQVk7UUFDM0IsTUFBTSxDQUFDLEVBQUUsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQseUJBQXlCLElBQVk7UUFDbkMsTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsd0JBQXdCLElBQVk7UUFDbEMsTUFBTSxDQUFDLElBQUksSUFBSSxNQUFNLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQztJQUN6QyxDQUFDO0lBRUQsa0JBQWtCLElBQVk7UUFDNUIsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNiLEtBQUssRUFBRTtnQkFDTCxNQUFNLENBQUMsR0FBRyxDQUFDO1lBQ2IsS0FBSyxFQUFFO2dCQUNMLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDYixLQUFLLEVBQUU7Z0JBQ0wsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUNiLEtBQUssRUFBRTtnQkFDTCxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2QsS0FBSyxFQUFFO2dCQUNMLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDZjtnQkFDRSxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7SUFDSCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O1lBM2FELFdBQVksU0FBUztnQkFDbkIsbURBQVMsQ0FBQTtnQkFDVCxxREFBVSxDQUFBO2dCQUNWLCtDQUFPLENBQUE7Z0JBQ1AsNkNBQU0sQ0FBQTtnQkFDTixpREFBUSxDQUFBO2dCQUNSLDZDQUFNLENBQUE7WUFDUixDQUFDLEVBUFcsU0FBUyxLQUFULFNBQVMsUUFPcEI7OENBQUE7WUFHRDtnQkFBQTtnQkFXQSxDQUFDO2dCQVZDLHdCQUFRLEdBQVIsVUFBUyxJQUFZO29CQUNuQixJQUFJLE9BQU8sR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDakMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO29CQUNoQixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBQ2hDLE9BQU8sS0FBSyxJQUFJLElBQUksRUFBRSxDQUFDO3dCQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNuQixLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUM5QixDQUFDO29CQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQ2hCLENBQUM7Z0JBWEg7b0JBQUMsdUJBQVUsRUFBRTs7eUJBQUE7Z0JBWWIsWUFBQztZQUFELENBWEEsQUFXQyxJQUFBO1lBWEQseUJBV0MsQ0FBQTtZQUVEO2dCQUNFLGVBQW1CLEtBQWEsRUFBUyxJQUFlLEVBQVMsUUFBZ0IsRUFDOUQsUUFBZ0I7b0JBRGhCLFVBQUssR0FBTCxLQUFLLENBQVE7b0JBQVMsU0FBSSxHQUFKLElBQUksQ0FBVztvQkFBUyxhQUFRLEdBQVIsUUFBUSxDQUFRO29CQUM5RCxhQUFRLEdBQVIsUUFBUSxDQUFRO2dCQUFHLENBQUM7Z0JBRXZDLDJCQUFXLEdBQVgsVUFBWSxJQUFZO29CQUN0QixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQztnQkFDckUsQ0FBQztnQkFFRCx3QkFBUSxHQUFSLGNBQXNCLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFL0Qsd0JBQVEsR0FBUixjQUFzQixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRS9ELDBCQUFVLEdBQVYsVUFBVyxRQUFnQjtvQkFDekIsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLENBQUM7Z0JBQ3hFLENBQUM7Z0JBRUQsNEJBQVksR0FBWixjQUEwQixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXZFLHlCQUFTLEdBQVQsY0FBdUIsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVqRSw0QkFBWSxHQUFaLGNBQTBCLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFOUYsNkJBQWEsR0FBYixjQUEyQixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRWhHLGtDQUFrQixHQUFsQjtvQkFDRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxXQUFXLENBQUMsQ0FBQztnQkFDMUUsQ0FBQztnQkFFRCw2QkFBYSxHQUFiLGNBQTJCLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFaEcsOEJBQWMsR0FBZCxjQUE0QixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRWxHLHdCQUFRLEdBQVI7b0JBQ0UseUJBQXlCO29CQUN6QixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUM5RCxDQUFDO2dCQUVELHdCQUFRLEdBQVI7b0JBQ0UsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ2xCLEtBQUssU0FBUyxDQUFDLFNBQVMsQ0FBQzt3QkFDekIsS0FBSyxTQUFTLENBQUMsVUFBVSxDQUFDO3dCQUMxQixLQUFLLFNBQVMsQ0FBQyxPQUFPLENBQUM7d0JBQ3ZCLEtBQUssU0FBUyxDQUFDLFFBQVEsQ0FBQzt3QkFDeEIsS0FBSyxTQUFTLENBQUMsTUFBTTs0QkFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7d0JBQ3ZCLEtBQUssU0FBUyxDQUFDLE1BQU07NEJBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUNsQzs0QkFDRSxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNoQixDQUFDO2dCQUNILENBQUM7Z0JBQ0gsWUFBQztZQUFELENBbkRBLEFBbURDLElBQUE7WUFuREQseUJBbURDLENBQUE7WUEyQlUsaUJBQUEsR0FBRyxHQUFVLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBLENBQUM7WUFFckQsa0JBQUEsSUFBSSxHQUFHLENBQUMsQ0FBQSxDQUFDO1lBQ1Qsa0JBQUEsSUFBSSxHQUFHLENBQUMsQ0FBQSxDQUFDO1lBQ1QsaUJBQUEsR0FBRyxHQUFHLEVBQUUsQ0FBQSxDQUFDO1lBQ1QsbUJBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQSxDQUFDO1lBQ1gsaUJBQUEsR0FBRyxHQUFHLEVBQUUsQ0FBQSxDQUFDO1lBQ1QsaUJBQUEsR0FBRyxHQUFHLEVBQUUsQ0FBQSxDQUFDO1lBQ1Qsb0JBQUEsTUFBTSxHQUFHLEVBQUUsQ0FBQSxDQUFDO1lBQ1osbUJBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQSxDQUFDO1lBQ1gsaUJBQUEsR0FBRyxHQUFHLEVBQUUsQ0FBQSxDQUFDO1lBQ1QsbUJBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQSxDQUFDO1lBQ1gsZ0JBQUEsRUFBRSxHQUFHLEVBQUUsQ0FBQSxDQUFDO1lBQ1Isc0JBQUEsUUFBUSxHQUFHLEVBQUUsQ0FBQSxDQUFDO1lBQ2Qsd0JBQUEsVUFBVSxHQUFHLEVBQUUsQ0FBQSxDQUFDO1lBQ2hCLGlCQUFBLEdBQUcsR0FBRyxFQUFFLENBQUEsQ0FBQztZQUNULHFCQUFBLE9BQU8sR0FBRyxFQUFFLENBQUEsQ0FBQztZQUNiLHFCQUFBLE9BQU8sR0FBRyxFQUFFLENBQUEsQ0FBQztZQUNiLG1CQUFBLEtBQUssR0FBRyxFQUFFLENBQUEsQ0FBQztZQUNYLG1CQUFBLEtBQUssR0FBRyxFQUFFLENBQUEsQ0FBQztZQUNYLG9CQUFBLE1BQU0sR0FBRyxFQUFFLENBQUEsQ0FBQztZQUNaLG9CQUFBLE1BQU0sR0FBRyxFQUFFLENBQUEsQ0FBQztZQUNaLHFCQUFBLE9BQU8sR0FBRyxFQUFFLENBQUEsQ0FBQztZQUNiLG9CQUFBLE1BQU0sR0FBRyxFQUFFLENBQUEsQ0FBQztZQUNaLG9CQUFBLE1BQU0sR0FBRyxFQUFFLENBQUEsQ0FBQztZQUNaLHdCQUFBLFVBQVUsR0FBRyxFQUFFLENBQUEsQ0FBQztZQUNoQixpQkFBQSxHQUFHLEdBQUcsRUFBRSxDQUFBLENBQUM7WUFDVCxpQkFBQSxHQUFHLEdBQUcsRUFBRSxDQUFBLENBQUM7WUFDVCxpQkFBQSxHQUFHLEdBQUcsRUFBRSxDQUFBLENBQUM7WUFDVCx1QkFBQSxTQUFTLEdBQUcsRUFBRSxDQUFBLENBQUM7WUFFdEIsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUNSLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFFUixFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUVuQix1QkFBQSxTQUFTLEdBQUcsRUFBRSxDQUFBLENBQUM7WUFDZix3QkFBQSxVQUFVLEdBQUcsRUFBRSxDQUFBLENBQUM7WUFDaEIsdUJBQUEsU0FBUyxHQUFHLEVBQUUsQ0FBQSxDQUFDO1lBQ3RCLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDWixFQUFFLEdBQUcsRUFBRSxDQUFDO1lBRVIsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsR0FBRyxFQUFFLEVBQUUsR0FBRyxHQUFHLEVBQUUsRUFBRSxHQUFHLEdBQUcsRUFBRSxFQUFFLEdBQUcsR0FBRyxFQUFFLEVBQUUsR0FBRyxHQUFHLEVBQUUsRUFBRSxHQUFHLEdBQUcsRUFBRSxFQUFFLEdBQUcsR0FBRyxFQUFFLEVBQUUsR0FBRyxHQUFHLENBQUM7WUFFakYscUJBQUEsT0FBTyxHQUFHLEdBQUcsQ0FBQSxDQUFDO1lBQ2Qsa0JBQUEsSUFBSSxHQUFHLEdBQUcsQ0FBQSxDQUFDO1lBQ1gscUJBQUEsT0FBTyxHQUFHLEdBQUcsQ0FBQSxDQUFDO1lBQ3JCLEtBQUssR0FBRyxHQUFHLENBQUM7WUFFbEI7Z0JBQWtDLGdDQUFhO2dCQUM3QyxzQkFBbUIsT0FBTztvQkFBSSxpQkFBTyxDQUFDO29CQUFuQixZQUFPLEdBQVAsT0FBTyxDQUFBO2dCQUFhLENBQUM7Z0JBRXhDLCtCQUFRLEdBQVIsY0FBcUIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxtQkFBQztZQUFELENBSkEsQUFJQyxDQUppQywwQkFBYSxHQUk5QztZQUpELHVDQUlDLENBQUE7WUFFRDtnQkFLRSxrQkFBbUIsS0FBYTtvQkFBYixVQUFLLEdBQUwsS0FBSyxDQUFRO29CQUhoQyxTQUFJLEdBQVcsQ0FBQyxDQUFDO29CQUNqQixVQUFLLEdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBR2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztvQkFDM0IsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNqQixDQUFDO2dCQUVELDBCQUFPLEdBQVA7b0JBQ0UsSUFBSSxDQUFDLElBQUk7d0JBQ0wsRUFBRSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLG9CQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM1RixDQUFDO2dCQUVELDRCQUFTLEdBQVQ7b0JBQ0UsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFFbkYsbUJBQW1CO29CQUNuQixPQUFPLElBQUksSUFBSSxNQUFNLEVBQUUsQ0FBQzt3QkFDdEIsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQzs0QkFDdEIsSUFBSSxHQUFHLElBQUksQ0FBQzs0QkFDWixLQUFLLENBQUM7d0JBQ1IsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDTixJQUFJLEdBQUcsb0JBQWEsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO3dCQUNoRCxDQUFDO29CQUNILENBQUM7b0JBRUQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUVuQixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDZCxDQUFDO29CQUVELGtDQUFrQztvQkFDbEMsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDMUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUVqRCxJQUFJLEtBQUssR0FBVyxLQUFLLENBQUM7b0JBQzFCLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ2IsS0FBSyxPQUFPOzRCQUNWLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0QkFDZixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLGlCQUFpQixDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQzt3QkFDekYsS0FBSyxPQUFPLENBQUM7d0JBQ2IsS0FBSyxPQUFPLENBQUM7d0JBQ2IsS0FBSyxPQUFPLENBQUM7d0JBQ2IsS0FBSyxPQUFPLENBQUM7d0JBQ2IsS0FBSyxTQUFTLENBQUM7d0JBQ2YsS0FBSyxTQUFTLENBQUM7d0JBQ2YsS0FBSyxNQUFNLENBQUM7d0JBQ1osS0FBSyxNQUFNLENBQUM7d0JBQ1osS0FBSyxVQUFVOzRCQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFDekMsS0FBSyxHQUFHLENBQUM7d0JBQ1QsS0FBSyxHQUFHOzRCQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7d0JBQzNCLEtBQUssS0FBSyxDQUFDO3dCQUNYLEtBQUssS0FBSyxDQUFDO3dCQUNYLEtBQUssTUFBTSxDQUFDO3dCQUNaLEtBQUssS0FBSyxDQUFDO3dCQUNYLEtBQUssTUFBTSxDQUFDO3dCQUNaLEtBQUssUUFBUSxDQUFDO3dCQUNkLEtBQUssTUFBTTs0QkFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsb0JBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDcEUsS0FBSyxTQUFTOzRCQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBQzVELEtBQUssR0FBRyxDQUFDO3dCQUNULEtBQUssR0FBRzs0QkFDTixNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxvQkFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBQ3JGLEtBQUssS0FBSyxDQUFDO3dCQUNYLEtBQUssR0FBRzs0QkFDTixNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxvQkFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFDdEQsR0FBRyxDQUFDLENBQUM7d0JBQ3ZDLEtBQUssVUFBVTs0QkFDYixNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUMvRCxLQUFLLElBQUk7NEJBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQzt3QkFDekQsS0FBSyxLQUFLOzRCQUNSLE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0NBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUMvQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUM1QixDQUFDO29CQUVELElBQUksQ0FBQyxLQUFLLENBQUMsMkJBQXlCLG9CQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQzVFLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQztnQkFFRCxnQ0FBYSxHQUFiLFVBQWMsS0FBYSxFQUFFLElBQVk7b0JBQ3ZDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDZixNQUFNLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN4QyxDQUFDO2dCQUdELCtCQUFZLEdBQVosVUFBYSxLQUFhLEVBQUUsR0FBVztvQkFDckMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNmLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ3RDLENBQUM7Z0JBRUQ7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsc0NBQW1CLEdBQW5CLFVBQW9CLEtBQWEsRUFBRSxHQUFXLEVBQUUsT0FBZSxFQUFFLEdBQVcsRUFBRSxTQUFrQixFQUM1RSxLQUFjO29CQUNoQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ2YsSUFBSSxHQUFHLEdBQVcsR0FBRyxDQUFDO29CQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQ3pCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFDZixHQUFHLElBQUksR0FBRyxDQUFDO29CQUNiLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0JBQ25ELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFDZixHQUFHLElBQUksS0FBSyxDQUFDO29CQUNmLENBQUM7b0JBQ0QsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDdEMsQ0FBQztnQkFFRCxpQ0FBYyxHQUFkO29CQUNFLElBQUksS0FBSyxHQUFXLElBQUksQ0FBQyxLQUFLLENBQUM7b0JBQy9CLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDZixPQUFPLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7d0JBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNuRCxJQUFJLEdBQUcsR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMxRCxFQUFFLENBQUMsQ0FBQyx1QkFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNsQyxNQUFNLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDckMsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixNQUFNLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN4QyxDQUFDO2dCQUNILENBQUM7Z0JBRUQsNkJBQVUsR0FBVixVQUFXLEtBQWE7b0JBQ3RCLElBQUksTUFBTSxHQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsQ0FBQztvQkFDN0MsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUUsc0JBQXNCO29CQUN2QyxPQUFPLElBQUksRUFBRSxDQUFDO3dCQUNaLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUV6QixDQUFDO3dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7NEJBQ2hDLE1BQU0sR0FBRyxLQUFLLENBQUM7d0JBQ2pCLENBQUM7d0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN0QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7NEJBQ2YsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7NEJBQzlDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzVELE1BQU0sR0FBRyxLQUFLLENBQUM7d0JBQ2pCLENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ04sS0FBSyxDQUFDO3dCQUNSLENBQUM7d0JBQ0QsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNqQixDQUFDO29CQUNELElBQUksR0FBRyxHQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzFELE9BQU87b0JBQ1AsSUFBSSxLQUFLLEdBQ0wsTUFBTSxHQUFHLG9CQUFhLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEdBQUcsb0JBQWEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2xGLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN0QyxDQUFDO2dCQUVELDZCQUFVLEdBQVY7b0JBQ0UsSUFBSSxLQUFLLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFDL0IsSUFBSSxLQUFLLEdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDOUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUUsc0JBQXNCO29CQUV2QyxJQUFJLE1BQW9CLENBQUM7b0JBQ3pCLElBQUksTUFBTSxHQUFXLElBQUksQ0FBQyxLQUFLLENBQUM7b0JBQ2hDLElBQUksS0FBSyxHQUFXLElBQUksQ0FBQyxLQUFLLENBQUM7b0JBRS9CLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxLQUFLLEVBQUUsQ0FBQzt3QkFDMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDOzRCQUM1QixFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDO2dDQUFDLE1BQU0sR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQzs0QkFDaEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs0QkFDaEQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUNmLElBQUksYUFBcUIsQ0FBQzs0QkFDMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dDQUNwQiw4Q0FBOEM7Z0NBQzlDLElBQUksR0FBRyxHQUFXLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQ0FDbEUsSUFBSSxDQUFDO29DQUNILGFBQWEsR0FBRyxvQkFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0NBQ2xELENBQUU7Z0NBQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQ0FDWCxJQUFJLENBQUMsS0FBSyxDQUFDLGdDQUE4QixHQUFHLE1BQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQ0FDdEQsQ0FBQztnQ0FDRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29DQUNuQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0NBQ2pCLENBQUM7NEJBQ0gsQ0FBQzs0QkFBQyxJQUFJLENBQUMsQ0FBQztnQ0FDTixhQUFhLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQ0FDcEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUNqQixDQUFDOzRCQUNELE1BQU0sQ0FBQyxHQUFHLENBQUMsb0JBQWEsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzs0QkFDdEQsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7d0JBQ3RCLENBQUM7d0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzs0QkFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDdEMsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDTixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ2pCLENBQUM7b0JBQ0gsQ0FBQztvQkFFRCxJQUFJLElBQUksR0FBVyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3ZELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFFLDBCQUEwQjtvQkFFM0Msc0NBQXNDO29CQUN0QyxJQUFJLFNBQVMsR0FBVyxJQUFJLENBQUM7b0JBQzdCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNuQixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNqQixTQUFTLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUNoQyxDQUFDO29CQUNELE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUMxQyxDQUFDO2dCQUVELHdCQUFLLEdBQUwsVUFBTSxPQUFlLEVBQUUsTUFBYztvQkFDbkMsSUFBSSxRQUFRLEdBQVcsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7b0JBQzNDLE1BQU0sSUFBSSxZQUFZLENBQ2xCLGtCQUFnQixPQUFPLG1CQUFjLFFBQVEsd0JBQW1CLElBQUksQ0FBQyxLQUFLLE1BQUcsQ0FBQyxDQUFDO2dCQUNyRixDQUFDO2dCQUNILGVBQUM7WUFBRCxDQXpOQSxBQXlOQyxJQUFBO1lBd0RHLFNBQVMsR0FBRyx1QkFBVSxDQUFDLGNBQWMsQ0FBQztnQkFDeEMsR0FBRztnQkFDSCxHQUFHO2dCQUNILEdBQUc7Z0JBQ0gsR0FBRztnQkFDSCxHQUFHO2dCQUNILEdBQUc7Z0JBQ0gsR0FBRztnQkFDSCxJQUFJO2dCQUNKLElBQUk7Z0JBQ0osS0FBSztnQkFDTCxLQUFLO2dCQUNMLEdBQUc7Z0JBQ0gsR0FBRztnQkFDSCxJQUFJO2dCQUNKLElBQUk7Z0JBQ0osSUFBSTtnQkFDSixJQUFJO2dCQUNKLEdBQUc7Z0JBQ0gsR0FBRztnQkFDSCxHQUFHO2dCQUNILEdBQUc7Z0JBQ0gsR0FBRztnQkFDSCxJQUFJO2FBQ0wsQ0FBQyxDQUFDO1lBR0MsUUFBUSxHQUNSLHVCQUFVLENBQUMsY0FBYyxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vcGFyc2VyL2xleGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaS9kZWNvcmF0b3JzJztcbmltcG9ydCB7TGlzdFdyYXBwZXIsIFNldFdyYXBwZXJ9IGZyb20gXCJhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb25cIjtcbmltcG9ydCB7TnVtYmVyV3JhcHBlciwgU3RyaW5nSm9pbmVyLCBTdHJpbmdXcmFwcGVyLCBpc1ByZXNlbnR9IGZyb20gXCJhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmdcIjtcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcblxuZXhwb3J0IGVudW0gVG9rZW5UeXBlIHtcbiAgQ2hhcmFjdGVyLFxuICBJZGVudGlmaWVyLFxuICBLZXl3b3JkLFxuICBTdHJpbmcsXG4gIE9wZXJhdG9yLFxuICBOdW1iZXJcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExleGVyIHtcbiAgdG9rZW5pemUodGV4dDogc3RyaW5nKTogYW55W10ge1xuICAgIHZhciBzY2FubmVyID0gbmV3IF9TY2FubmVyKHRleHQpO1xuICAgIHZhciB0b2tlbnMgPSBbXTtcbiAgICB2YXIgdG9rZW4gPSBzY2FubmVyLnNjYW5Ub2tlbigpO1xuICAgIHdoaWxlICh0b2tlbiAhPSBudWxsKSB7XG4gICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICB0b2tlbiA9IHNjYW5uZXIuc2NhblRva2VuKCk7XG4gICAgfVxuICAgIHJldHVybiB0b2tlbnM7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRva2VuIHtcbiAgY29uc3RydWN0b3IocHVibGljIGluZGV4OiBudW1iZXIsIHB1YmxpYyB0eXBlOiBUb2tlblR5cGUsIHB1YmxpYyBudW1WYWx1ZTogbnVtYmVyLFxuICAgICAgICAgICAgICBwdWJsaWMgc3RyVmFsdWU6IHN0cmluZykge31cblxuICBpc0NoYXJhY3Rlcihjb2RlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKHRoaXMudHlwZSA9PSBUb2tlblR5cGUuQ2hhcmFjdGVyICYmIHRoaXMubnVtVmFsdWUgPT0gY29kZSk7XG4gIH1cblxuICBpc051bWJlcigpOiBib29sZWFuIHsgcmV0dXJuICh0aGlzLnR5cGUgPT0gVG9rZW5UeXBlLk51bWJlcik7IH1cblxuICBpc1N0cmluZygpOiBib29sZWFuIHsgcmV0dXJuICh0aGlzLnR5cGUgPT0gVG9rZW5UeXBlLlN0cmluZyk7IH1cblxuICBpc09wZXJhdG9yKG9wZXJhdGVyOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKHRoaXMudHlwZSA9PSBUb2tlblR5cGUuT3BlcmF0b3IgJiYgdGhpcy5zdHJWYWx1ZSA9PSBvcGVyYXRlcik7XG4gIH1cblxuICBpc0lkZW50aWZpZXIoKTogYm9vbGVhbiB7IHJldHVybiAodGhpcy50eXBlID09IFRva2VuVHlwZS5JZGVudGlmaWVyKTsgfVxuXG4gIGlzS2V5d29yZCgpOiBib29sZWFuIHsgcmV0dXJuICh0aGlzLnR5cGUgPT0gVG9rZW5UeXBlLktleXdvcmQpOyB9XG5cbiAgaXNLZXl3b3JkVmFyKCk6IGJvb2xlYW4geyByZXR1cm4gKHRoaXMudHlwZSA9PSBUb2tlblR5cGUuS2V5d29yZCAmJiB0aGlzLnN0clZhbHVlID09IFwidmFyXCIpOyB9XG5cbiAgaXNLZXl3b3JkTnVsbCgpOiBib29sZWFuIHsgcmV0dXJuICh0aGlzLnR5cGUgPT0gVG9rZW5UeXBlLktleXdvcmQgJiYgdGhpcy5zdHJWYWx1ZSA9PSBcIm51bGxcIik7IH1cblxuICBpc0tleXdvcmRVbmRlZmluZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICh0aGlzLnR5cGUgPT0gVG9rZW5UeXBlLktleXdvcmQgJiYgdGhpcy5zdHJWYWx1ZSA9PSBcInVuZGVmaW5lZFwiKTtcbiAgfVxuXG4gIGlzS2V5d29yZFRydWUoKTogYm9vbGVhbiB7IHJldHVybiAodGhpcy50eXBlID09IFRva2VuVHlwZS5LZXl3b3JkICYmIHRoaXMuc3RyVmFsdWUgPT0gXCJ0cnVlXCIpOyB9XG5cbiAgaXNLZXl3b3JkRmFsc2UoKTogYm9vbGVhbiB7IHJldHVybiAodGhpcy50eXBlID09IFRva2VuVHlwZS5LZXl3b3JkICYmIHRoaXMuc3RyVmFsdWUgPT0gXCJmYWxzZVwiKTsgfVxuXG4gIHRvTnVtYmVyKCk6IG51bWJlciB7XG4gICAgLy8gLTEgaW5zdGVhZCBvZiBOVUxMIG9rP1xuICAgIHJldHVybiAodGhpcy50eXBlID09IFRva2VuVHlwZS5OdW1iZXIpID8gdGhpcy5udW1WYWx1ZSA6IC0xO1xuICB9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgY2FzZSBUb2tlblR5cGUuQ2hhcmFjdGVyOlxuICAgICAgY2FzZSBUb2tlblR5cGUuSWRlbnRpZmllcjpcbiAgICAgIGNhc2UgVG9rZW5UeXBlLktleXdvcmQ6XG4gICAgICBjYXNlIFRva2VuVHlwZS5PcGVyYXRvcjpcbiAgICAgIGNhc2UgVG9rZW5UeXBlLlN0cmluZzpcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyVmFsdWU7XG4gICAgICBjYXNlIFRva2VuVHlwZS5OdW1iZXI6XG4gICAgICAgIHJldHVybiB0aGlzLm51bVZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbmV3Q2hhcmFjdGVyVG9rZW4oaW5kZXg6IG51bWJlciwgY29kZTogbnVtYmVyKTogVG9rZW4ge1xuICByZXR1cm4gbmV3IFRva2VuKGluZGV4LCBUb2tlblR5cGUuQ2hhcmFjdGVyLCBjb2RlLCBTdHJpbmdXcmFwcGVyLmZyb21DaGFyQ29kZShjb2RlKSk7XG59XG5cbmZ1bmN0aW9uIG5ld0lkZW50aWZpZXJUb2tlbihpbmRleDogbnVtYmVyLCB0ZXh0OiBzdHJpbmcpOiBUb2tlbiB7XG4gIHJldHVybiBuZXcgVG9rZW4oaW5kZXgsIFRva2VuVHlwZS5JZGVudGlmaWVyLCAwLCB0ZXh0KTtcbn1cblxuZnVuY3Rpb24gbmV3S2V5d29yZFRva2VuKGluZGV4OiBudW1iZXIsIHRleHQ6IHN0cmluZyk6IFRva2VuIHtcbiAgcmV0dXJuIG5ldyBUb2tlbihpbmRleCwgVG9rZW5UeXBlLktleXdvcmQsIDAsIHRleHQpO1xufVxuXG5mdW5jdGlvbiBuZXdPcGVyYXRvclRva2VuKGluZGV4OiBudW1iZXIsIHRleHQ6IHN0cmluZyk6IFRva2VuIHtcbiAgcmV0dXJuIG5ldyBUb2tlbihpbmRleCwgVG9rZW5UeXBlLk9wZXJhdG9yLCAwLCB0ZXh0KTtcbn1cblxuZnVuY3Rpb24gbmV3U3RyaW5nVG9rZW4oaW5kZXg6IG51bWJlciwgdGV4dDogc3RyaW5nKTogVG9rZW4ge1xuICByZXR1cm4gbmV3IFRva2VuKGluZGV4LCBUb2tlblR5cGUuU3RyaW5nLCAwLCB0ZXh0KTtcbn1cblxuZnVuY3Rpb24gbmV3TnVtYmVyVG9rZW4oaW5kZXg6IG51bWJlciwgbjogbnVtYmVyKTogVG9rZW4ge1xuICByZXR1cm4gbmV3IFRva2VuKGluZGV4LCBUb2tlblR5cGUuTnVtYmVyLCBuLCBcIlwiKTtcbn1cblxuXG5leHBvcnQgdmFyIEVPRjogVG9rZW4gPSBuZXcgVG9rZW4oLTEsIFRva2VuVHlwZS5DaGFyYWN0ZXIsIDAsIFwiXCIpO1xuXG5leHBvcnQgY29uc3QgJEVPRiA9IDA7XG5leHBvcnQgY29uc3QgJFRBQiA9IDk7XG5leHBvcnQgY29uc3QgJExGID0gMTA7XG5leHBvcnQgY29uc3QgJFZUQUIgPSAxMTtcbmV4cG9ydCBjb25zdCAkRkYgPSAxMjtcbmV4cG9ydCBjb25zdCAkQ1IgPSAxMztcbmV4cG9ydCBjb25zdCAkU1BBQ0UgPSAzMjtcbmV4cG9ydCBjb25zdCAkQkFORyA9IDMzO1xuZXhwb3J0IGNvbnN0ICREUSA9IDM0O1xuZXhwb3J0IGNvbnN0ICRIQVNIID0gMzU7XG5leHBvcnQgY29uc3QgJCQgPSAzNjtcbmV4cG9ydCBjb25zdCAkUEVSQ0VOVCA9IDM3O1xuZXhwb3J0IGNvbnN0ICRBTVBFUlNBTkQgPSAzODtcbmV4cG9ydCBjb25zdCAkU1EgPSAzOTtcbmV4cG9ydCBjb25zdCAkTFBBUkVOID0gNDA7XG5leHBvcnQgY29uc3QgJFJQQVJFTiA9IDQxO1xuZXhwb3J0IGNvbnN0ICRTVEFSID0gNDI7XG5leHBvcnQgY29uc3QgJFBMVVMgPSA0MztcbmV4cG9ydCBjb25zdCAkQ09NTUEgPSA0NDtcbmV4cG9ydCBjb25zdCAkTUlOVVMgPSA0NTtcbmV4cG9ydCBjb25zdCAkUEVSSU9EID0gNDY7XG5leHBvcnQgY29uc3QgJFNMQVNIID0gNDc7XG5leHBvcnQgY29uc3QgJENPTE9OID0gNTg7XG5leHBvcnQgY29uc3QgJFNFTUlDT0xPTiA9IDU5O1xuZXhwb3J0IGNvbnN0ICRMVCA9IDYwO1xuZXhwb3J0IGNvbnN0ICRFUSA9IDYxO1xuZXhwb3J0IGNvbnN0ICRHVCA9IDYyO1xuZXhwb3J0IGNvbnN0ICRRVUVTVElPTiA9IDYzO1xuXG5jb25zdCAkMCA9IDQ4O1xuY29uc3QgJDkgPSA1NztcblxuY29uc3QgJEEgPSA2NSwgJEUgPSA2OSwgJFogPSA5MDtcblxuZXhwb3J0IGNvbnN0ICRMQlJBQ0tFVCA9IDkxO1xuZXhwb3J0IGNvbnN0ICRCQUNLU0xBU0ggPSA5MjtcbmV4cG9ydCBjb25zdCAkUkJSQUNLRVQgPSA5MztcbmNvbnN0ICRDQVJFVCA9IDk0O1xuY29uc3QgJF8gPSA5NTtcblxuY29uc3QgJGEgPSA5NywgJGUgPSAxMDEsICRmID0gMTAyLCAkbiA9IDExMCwgJHIgPSAxMTQsICR0ID0gMTE2LCAkdSA9IDExNywgJHYgPSAxMTgsICR6ID0gMTIyO1xuXG5leHBvcnQgY29uc3QgJExCUkFDRSA9IDEyMztcbmV4cG9ydCBjb25zdCAkQkFSID0gMTI0O1xuZXhwb3J0IGNvbnN0ICRSQlJBQ0UgPSAxMjU7XG5jb25zdCAkTkJTUCA9IDE2MDtcblxuZXhwb3J0IGNsYXNzIFNjYW5uZXJFcnJvciBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbWVzc2FnZSkgeyBzdXBlcigpOyB9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMubWVzc2FnZTsgfVxufVxuXG5jbGFzcyBfU2Nhbm5lciB7XG4gIGxlbmd0aDogbnVtYmVyO1xuICBwZWVrOiBudW1iZXIgPSAwO1xuICBpbmRleDogbnVtYmVyID0gLTE7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGlucHV0OiBzdHJpbmcpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGlucHV0Lmxlbmd0aDtcbiAgICB0aGlzLmFkdmFuY2UoKTtcbiAgfVxuXG4gIGFkdmFuY2UoKSB7XG4gICAgdGhpcy5wZWVrID1cbiAgICAgICAgKyt0aGlzLmluZGV4ID49IHRoaXMubGVuZ3RoID8gJEVPRiA6IFN0cmluZ1dyYXBwZXIuY2hhckNvZGVBdCh0aGlzLmlucHV0LCB0aGlzLmluZGV4KTtcbiAgfVxuXG4gIHNjYW5Ub2tlbigpOiBUb2tlbiB7XG4gICAgdmFyIGlucHV0ID0gdGhpcy5pbnB1dCwgbGVuZ3RoID0gdGhpcy5sZW5ndGgsIHBlZWsgPSB0aGlzLnBlZWssIGluZGV4ID0gdGhpcy5pbmRleDtcblxuICAgIC8vIFNraXAgd2hpdGVzcGFjZS5cbiAgICB3aGlsZSAocGVlayA8PSAkU1BBQ0UpIHtcbiAgICAgIGlmICgrK2luZGV4ID49IGxlbmd0aCkge1xuICAgICAgICBwZWVrID0gJEVPRjtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwZWVrID0gU3RyaW5nV3JhcHBlci5jaGFyQ29kZUF0KGlucHV0LCBpbmRleCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wZWVrID0gcGVlaztcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG5cbiAgICBpZiAoaW5kZXggPj0gbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgaWRlbnRpZmllcnMgYW5kIG51bWJlcnMuXG4gICAgaWYgKGlzSWRlbnRpZmllclN0YXJ0KHBlZWspKSByZXR1cm4gdGhpcy5zY2FuSWRlbnRpZmllcigpO1xuICAgIGlmIChpc0RpZ2l0KHBlZWspKSByZXR1cm4gdGhpcy5zY2FuTnVtYmVyKGluZGV4KTtcblxuICAgIHZhciBzdGFydDogbnVtYmVyID0gaW5kZXg7XG4gICAgc3dpdGNoIChwZWVrKSB7XG4gICAgICBjYXNlICRQRVJJT0Q6XG4gICAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgICAgICByZXR1cm4gaXNEaWdpdCh0aGlzLnBlZWspID8gdGhpcy5zY2FuTnVtYmVyKHN0YXJ0KSA6IG5ld0NoYXJhY3RlclRva2VuKHN0YXJ0LCAkUEVSSU9EKTtcbiAgICAgIGNhc2UgJExQQVJFTjpcbiAgICAgIGNhc2UgJFJQQVJFTjpcbiAgICAgIGNhc2UgJExCUkFDRTpcbiAgICAgIGNhc2UgJFJCUkFDRTpcbiAgICAgIGNhc2UgJExCUkFDS0VUOlxuICAgICAgY2FzZSAkUkJSQUNLRVQ6XG4gICAgICBjYXNlICRDT01NQTpcbiAgICAgIGNhc2UgJENPTE9OOlxuICAgICAgY2FzZSAkU0VNSUNPTE9OOlxuICAgICAgICByZXR1cm4gdGhpcy5zY2FuQ2hhcmFjdGVyKHN0YXJ0LCBwZWVrKTtcbiAgICAgIGNhc2UgJFNROlxuICAgICAgY2FzZSAkRFE6XG4gICAgICAgIHJldHVybiB0aGlzLnNjYW5TdHJpbmcoKTtcbiAgICAgIGNhc2UgJEhBU0g6XG4gICAgICBjYXNlICRQTFVTOlxuICAgICAgY2FzZSAkTUlOVVM6XG4gICAgICBjYXNlICRTVEFSOlxuICAgICAgY2FzZSAkU0xBU0g6XG4gICAgICBjYXNlICRQRVJDRU5UOlxuICAgICAgY2FzZSAkQ0FSRVQ6XG4gICAgICAgIHJldHVybiB0aGlzLnNjYW5PcGVyYXRvcihzdGFydCwgU3RyaW5nV3JhcHBlci5mcm9tQ2hhckNvZGUocGVlaykpO1xuICAgICAgY2FzZSAkUVVFU1RJT046XG4gICAgICAgIHJldHVybiB0aGlzLnNjYW5Db21wbGV4T3BlcmF0b3Ioc3RhcnQsICc/JywgJFBFUklPRCwgJy4nKTtcbiAgICAgIGNhc2UgJExUOlxuICAgICAgY2FzZSAkR1Q6XG4gICAgICAgIHJldHVybiB0aGlzLnNjYW5Db21wbGV4T3BlcmF0b3Ioc3RhcnQsIFN0cmluZ1dyYXBwZXIuZnJvbUNoYXJDb2RlKHBlZWspLCAkRVEsICc9Jyk7XG4gICAgICBjYXNlICRCQU5HOlxuICAgICAgY2FzZSAkRVE6XG4gICAgICAgIHJldHVybiB0aGlzLnNjYW5Db21wbGV4T3BlcmF0b3Ioc3RhcnQsIFN0cmluZ1dyYXBwZXIuZnJvbUNoYXJDb2RlKHBlZWspLCAkRVEsICc9JywgJEVRLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc9Jyk7XG4gICAgICBjYXNlICRBTVBFUlNBTkQ6XG4gICAgICAgIHJldHVybiB0aGlzLnNjYW5Db21wbGV4T3BlcmF0b3Ioc3RhcnQsICcmJywgJEFNUEVSU0FORCwgJyYnKTtcbiAgICAgIGNhc2UgJEJBUjpcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbkNvbXBsZXhPcGVyYXRvcihzdGFydCwgJ3wnLCAkQkFSLCAnfCcpO1xuICAgICAgY2FzZSAkTkJTUDpcbiAgICAgICAgd2hpbGUgKGlzV2hpdGVzcGFjZSh0aGlzLnBlZWspKSB0aGlzLmFkdmFuY2UoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhblRva2VuKCk7XG4gICAgfVxuXG4gICAgdGhpcy5lcnJvcihgVW5leHBlY3RlZCBjaGFyYWN0ZXIgWyR7U3RyaW5nV3JhcHBlci5mcm9tQ2hhckNvZGUocGVlayl9XWAsIDApO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgc2NhbkNoYXJhY3RlcihzdGFydDogbnVtYmVyLCBjb2RlOiBudW1iZXIpOiBUb2tlbiB7XG4gICAgdGhpcy5hZHZhbmNlKCk7XG4gICAgcmV0dXJuIG5ld0NoYXJhY3RlclRva2VuKHN0YXJ0LCBjb2RlKTtcbiAgfVxuXG5cbiAgc2Nhbk9wZXJhdG9yKHN0YXJ0OiBudW1iZXIsIHN0cjogc3RyaW5nKTogVG9rZW4ge1xuICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgIHJldHVybiBuZXdPcGVyYXRvclRva2VuKHN0YXJ0LCBzdHIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRva2VuaXplIGEgMi8zIGNoYXIgbG9uZyBvcGVyYXRvclxuICAgKlxuICAgKiBAcGFyYW0gc3RhcnQgc3RhcnQgaW5kZXggaW4gdGhlIGV4cHJlc3Npb25cbiAgICogQHBhcmFtIG9uZSBmaXJzdCBzeW1ib2wgKGFsd2F5cyBwYXJ0IG9mIHRoZSBvcGVyYXRvcilcbiAgICogQHBhcmFtIHR3b0NvZGUgY29kZSBwb2ludCBmb3IgdGhlIHNlY29uZCBzeW1ib2xcbiAgICogQHBhcmFtIHR3byBzZWNvbmQgc3ltYm9sIChwYXJ0IG9mIHRoZSBvcGVyYXRvciB3aGVuIHRoZSBzZWNvbmQgY29kZSBwb2ludCBtYXRjaGVzKVxuICAgKiBAcGFyYW0gdGhyZWVDb2RlIGNvZGUgcG9pbnQgZm9yIHRoZSB0aGlyZCBzeW1ib2xcbiAgICogQHBhcmFtIHRocmVlIHRoaXJkIHN5bWJvbCAocGFydCBvZiB0aGUgb3BlcmF0b3Igd2hlbiBwcm92aWRlZCBhbmQgbWF0Y2hlcyBzb3VyY2UgZXhwcmVzc2lvbilcbiAgICogQHJldHVybnMge1Rva2VufVxuICAgKi9cbiAgc2NhbkNvbXBsZXhPcGVyYXRvcihzdGFydDogbnVtYmVyLCBvbmU6IHN0cmluZywgdHdvQ29kZTogbnVtYmVyLCB0d286IHN0cmluZywgdGhyZWVDb2RlPzogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgIHRocmVlPzogc3RyaW5nKTogVG9rZW4ge1xuICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgIHZhciBzdHI6IHN0cmluZyA9IG9uZTtcbiAgICBpZiAodGhpcy5wZWVrID09IHR3b0NvZGUpIHtcbiAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgICAgc3RyICs9IHR3bztcbiAgICB9XG4gICAgaWYgKGlzUHJlc2VudCh0aHJlZUNvZGUpICYmIHRoaXMucGVlayA9PSB0aHJlZUNvZGUpIHtcbiAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgICAgc3RyICs9IHRocmVlO1xuICAgIH1cbiAgICByZXR1cm4gbmV3T3BlcmF0b3JUb2tlbihzdGFydCwgc3RyKTtcbiAgfVxuXG4gIHNjYW5JZGVudGlmaWVyKCk6IFRva2VuIHtcbiAgICB2YXIgc3RhcnQ6IG51bWJlciA9IHRoaXMuaW5kZXg7XG4gICAgdGhpcy5hZHZhbmNlKCk7XG4gICAgd2hpbGUgKGlzSWRlbnRpZmllclBhcnQodGhpcy5wZWVrKSkgdGhpcy5hZHZhbmNlKCk7XG4gICAgdmFyIHN0cjogc3RyaW5nID0gdGhpcy5pbnB1dC5zdWJzdHJpbmcoc3RhcnQsIHRoaXMuaW5kZXgpO1xuICAgIGlmIChTZXRXcmFwcGVyLmhhcyhLRVlXT1JEUywgc3RyKSkge1xuICAgICAgcmV0dXJuIG5ld0tleXdvcmRUb2tlbihzdGFydCwgc3RyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ld0lkZW50aWZpZXJUb2tlbihzdGFydCwgc3RyKTtcbiAgICB9XG4gIH1cblxuICBzY2FuTnVtYmVyKHN0YXJ0OiBudW1iZXIpOiBUb2tlbiB7XG4gICAgdmFyIHNpbXBsZTogYm9vbGVhbiA9ICh0aGlzLmluZGV4ID09PSBzdGFydCk7XG4gICAgdGhpcy5hZHZhbmNlKCk7ICAvLyBTa2lwIGluaXRpYWwgZGlnaXQuXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGlmIChpc0RpZ2l0KHRoaXMucGVlaykpIHtcbiAgICAgICAgLy8gRG8gbm90aGluZy5cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wZWVrID09ICRQRVJJT0QpIHtcbiAgICAgICAgc2ltcGxlID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKGlzRXhwb25lbnRTdGFydCh0aGlzLnBlZWspKSB7XG4gICAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgICAgICBpZiAoaXNFeHBvbmVudFNpZ24odGhpcy5wZWVrKSkgdGhpcy5hZHZhbmNlKCk7XG4gICAgICAgIGlmICghaXNEaWdpdCh0aGlzLnBlZWspKSB0aGlzLmVycm9yKCdJbnZhbGlkIGV4cG9uZW50JywgLTEpO1xuICAgICAgICBzaW1wbGUgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgdGhpcy5hZHZhbmNlKCk7XG4gICAgfVxuICAgIHZhciBzdHI6IHN0cmluZyA9IHRoaXMuaW5wdXQuc3Vic3RyaW5nKHN0YXJ0LCB0aGlzLmluZGV4KTtcbiAgICAvLyBUT0RPXG4gICAgdmFyIHZhbHVlOiBudW1iZXIgPVxuICAgICAgICBzaW1wbGUgPyBOdW1iZXJXcmFwcGVyLnBhcnNlSW50QXV0b1JhZGl4KHN0cikgOiBOdW1iZXJXcmFwcGVyLnBhcnNlRmxvYXQoc3RyKTtcbiAgICByZXR1cm4gbmV3TnVtYmVyVG9rZW4oc3RhcnQsIHZhbHVlKTtcbiAgfVxuXG4gIHNjYW5TdHJpbmcoKTogVG9rZW4ge1xuICAgIHZhciBzdGFydDogbnVtYmVyID0gdGhpcy5pbmRleDtcbiAgICB2YXIgcXVvdGU6IG51bWJlciA9IHRoaXMucGVlaztcbiAgICB0aGlzLmFkdmFuY2UoKTsgIC8vIFNraXAgaW5pdGlhbCBxdW90ZS5cblxuICAgIHZhciBidWZmZXI6IFN0cmluZ0pvaW5lcjtcbiAgICB2YXIgbWFya2VyOiBudW1iZXIgPSB0aGlzLmluZGV4O1xuICAgIHZhciBpbnB1dDogc3RyaW5nID0gdGhpcy5pbnB1dDtcblxuICAgIHdoaWxlICh0aGlzLnBlZWsgIT0gcXVvdGUpIHtcbiAgICAgIGlmICh0aGlzLnBlZWsgPT0gJEJBQ0tTTEFTSCkge1xuICAgICAgICBpZiAoYnVmZmVyID09IG51bGwpIGJ1ZmZlciA9IG5ldyBTdHJpbmdKb2luZXIoKTtcbiAgICAgICAgYnVmZmVyLmFkZChpbnB1dC5zdWJzdHJpbmcobWFya2VyLCB0aGlzLmluZGV4KSk7XG4gICAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgICAgICB2YXIgdW5lc2NhcGVkQ29kZTogbnVtYmVyO1xuICAgICAgICBpZiAodGhpcy5wZWVrID09ICR1KSB7XG4gICAgICAgICAgLy8gNCBjaGFyYWN0ZXIgaGV4IGNvZGUgZm9yIHVuaWNvZGUgY2hhcmFjdGVyLlxuICAgICAgICAgIHZhciBoZXg6IHN0cmluZyA9IGlucHV0LnN1YnN0cmluZyh0aGlzLmluZGV4ICsgMSwgdGhpcy5pbmRleCArIDUpO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB1bmVzY2FwZWRDb2RlID0gTnVtYmVyV3JhcHBlci5wYXJzZUludChoZXgsIDE2KTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yKGBJbnZhbGlkIHVuaWNvZGUgZXNjYXBlIFtcXFxcdSR7aGV4fV1gLCAwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZm9yICh2YXIgaTogbnVtYmVyID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5hZHZhbmNlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVuZXNjYXBlZENvZGUgPSB1bmVzY2FwZSh0aGlzLnBlZWspO1xuICAgICAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgICAgICB9XG4gICAgICAgIGJ1ZmZlci5hZGQoU3RyaW5nV3JhcHBlci5mcm9tQ2hhckNvZGUodW5lc2NhcGVkQ29kZSkpO1xuICAgICAgICBtYXJrZXIgPSB0aGlzLmluZGV4O1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnBlZWsgPT0gJEVPRikge1xuICAgICAgICB0aGlzLmVycm9yKCdVbnRlcm1pbmF0ZWQgcXVvdGUnLCAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBsYXN0OiBzdHJpbmcgPSBpbnB1dC5zdWJzdHJpbmcobWFya2VyLCB0aGlzLmluZGV4KTtcbiAgICB0aGlzLmFkdmFuY2UoKTsgIC8vIFNraXAgdGVybWluYXRpbmcgcXVvdGUuXG5cbiAgICAvLyBDb21wdXRlIHRoZSB1bmVzY2FwZWQgc3RyaW5nIHZhbHVlLlxuICAgIHZhciB1bmVzY2FwZWQ6IHN0cmluZyA9IGxhc3Q7XG4gICAgaWYgKGJ1ZmZlciAhPSBudWxsKSB7XG4gICAgICBidWZmZXIuYWRkKGxhc3QpO1xuICAgICAgdW5lc2NhcGVkID0gYnVmZmVyLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIHJldHVybiBuZXdTdHJpbmdUb2tlbihzdGFydCwgdW5lc2NhcGVkKTtcbiAgfVxuXG4gIGVycm9yKG1lc3NhZ2U6IHN0cmluZywgb2Zmc2V0OiBudW1iZXIpIHtcbiAgICB2YXIgcG9zaXRpb246IG51bWJlciA9IHRoaXMuaW5kZXggKyBvZmZzZXQ7XG4gICAgdGhyb3cgbmV3IFNjYW5uZXJFcnJvcihcbiAgICAgICAgYExleGVyIEVycm9yOiAke21lc3NhZ2V9IGF0IGNvbHVtbiAke3Bvc2l0aW9ufSBpbiBleHByZXNzaW9uIFske3RoaXMuaW5wdXR9XWApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzV2hpdGVzcGFjZShjb2RlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgcmV0dXJuIChjb2RlID49ICRUQUIgJiYgY29kZSA8PSAkU1BBQ0UpIHx8IChjb2RlID09ICROQlNQKTtcbn1cblxuZnVuY3Rpb24gaXNJZGVudGlmaWVyU3RhcnQoY29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiAoJGEgPD0gY29kZSAmJiBjb2RlIDw9ICR6KSB8fCAoJEEgPD0gY29kZSAmJiBjb2RlIDw9ICRaKSB8fCAoY29kZSA9PSAkXykgfHwgKGNvZGUgPT0gJCQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNJZGVudGlmaWVyKGlucHV0OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgaWYgKGlucHV0Lmxlbmd0aCA9PSAwKSByZXR1cm4gZmFsc2U7XG4gIHZhciBzY2FubmVyID0gbmV3IF9TY2FubmVyKGlucHV0KTtcbiAgaWYgKCFpc0lkZW50aWZpZXJTdGFydChzY2FubmVyLnBlZWspKSByZXR1cm4gZmFsc2U7XG4gIHNjYW5uZXIuYWR2YW5jZSgpO1xuICB3aGlsZSAoc2Nhbm5lci5wZWVrICE9PSAkRU9GKSB7XG4gICAgaWYgKCFpc0lkZW50aWZpZXJQYXJ0KHNjYW5uZXIucGVlaykpIHJldHVybiBmYWxzZTtcbiAgICBzY2FubmVyLmFkdmFuY2UoKTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaXNJZGVudGlmaWVyUGFydChjb2RlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgcmV0dXJuICgkYSA8PSBjb2RlICYmIGNvZGUgPD0gJHopIHx8ICgkQSA8PSBjb2RlICYmIGNvZGUgPD0gJFopIHx8ICgkMCA8PSBjb2RlICYmIGNvZGUgPD0gJDkpIHx8XG4gICAgICAgICAoY29kZSA9PSAkXykgfHwgKGNvZGUgPT0gJCQpO1xufVxuXG5mdW5jdGlvbiBpc0RpZ2l0KGNvZGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICByZXR1cm4gJDAgPD0gY29kZSAmJiBjb2RlIDw9ICQ5O1xufVxuXG5mdW5jdGlvbiBpc0V4cG9uZW50U3RhcnQoY29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiBjb2RlID09ICRlIHx8IGNvZGUgPT0gJEU7XG59XG5cbmZ1bmN0aW9uIGlzRXhwb25lbnRTaWduKGNvZGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICByZXR1cm4gY29kZSA9PSAkTUlOVVMgfHwgY29kZSA9PSAkUExVUztcbn1cblxuZnVuY3Rpb24gdW5lc2NhcGUoY29kZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgc3dpdGNoIChjb2RlKSB7XG4gICAgY2FzZSAkbjpcbiAgICAgIHJldHVybiAkTEY7XG4gICAgY2FzZSAkZjpcbiAgICAgIHJldHVybiAkRkY7XG4gICAgY2FzZSAkcjpcbiAgICAgIHJldHVybiAkQ1I7XG4gICAgY2FzZSAkdDpcbiAgICAgIHJldHVybiAkVEFCO1xuICAgIGNhc2UgJHY6XG4gICAgICByZXR1cm4gJFZUQUI7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBjb2RlO1xuICB9XG59XG5cbnZhciBPUEVSQVRPUlMgPSBTZXRXcmFwcGVyLmNyZWF0ZUZyb21MaXN0KFtcbiAgJysnLFxuICAnLScsXG4gICcqJyxcbiAgJy8nLFxuICAnJScsXG4gICdeJyxcbiAgJz0nLFxuICAnPT0nLFxuICAnIT0nLFxuICAnPT09JyxcbiAgJyE9PScsXG4gICc8JyxcbiAgJz4nLFxuICAnPD0nLFxuICAnPj0nLFxuICAnJiYnLFxuICAnfHwnLFxuICAnJicsXG4gICd8JyxcbiAgJyEnLFxuICAnPycsXG4gICcjJyxcbiAgJz8uJ1xuXSk7XG5cblxudmFyIEtFWVdPUkRTID1cbiAgICBTZXRXcmFwcGVyLmNyZWF0ZUZyb21MaXN0KFsndmFyJywgJ251bGwnLCAndW5kZWZpbmVkJywgJ3RydWUnLCAnZmFsc2UnLCAnaWYnLCAnZWxzZSddKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
