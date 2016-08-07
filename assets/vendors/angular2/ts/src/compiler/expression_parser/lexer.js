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
    var TokenType, Lexer, Token, EOF, $EOF, $TAB, $LF, $VTAB, $FF, $CR, $SPACE, $BANG, $DQ, $HASH, $$, $PERCENT, $AMPERSAND, $SQ, $LPAREN, $RPAREN, $STAR, $PLUS, $COMMA, $MINUS, $PERIOD, $SLASH, $COLON, $SEMICOLON, $LT, $EQ, $GT, $QUESTION, $0, $9, $A, $E, $Z, $LBRACKET, $BACKSLASH, $RBRACKET, $CARET, $_, $BT, $a, $e, $f, $n, $r, $t, $u, $v, $z, $LBRACE, $BAR, $RBRACE, $NBSP, ScannerError, _Scanner, OPERATORS, KEYWORDS;
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
    function isQuote(code) {
        return code === $SQ || code === $DQ || code === $BT;
    }
    exports_1("isQuote", isQuote);
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
                Token.prototype.isKeywordDeprecatedVar = function () {
                    return (this.type == TokenType.Keyword && this.strValue == "var");
                };
                Token.prototype.isKeywordLet = function () { return (this.type == TokenType.Keyword && this.strValue == "let"); };
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
            exports_1("$BT", $BT = 96);
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
            KEYWORDS = collection_1.SetWrapper.createFromList(['var', 'let', 'null', 'undefined', 'true', 'false', 'if', 'else']);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9leHByZXNzaW9uX3BhcnNlci9sZXhlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7aUNBOEdXLEdBQUcsRUFFRCxJQUFJLEVBQ0osSUFBSSxFQUNKLEdBQUcsRUFDSCxLQUFLLEVBQ0wsR0FBRyxFQUNILEdBQUcsRUFDSCxNQUFNLEVBQ04sS0FBSyxFQUNMLEdBQUcsRUFDSCxLQUFLLEVBQ0wsRUFBRSxFQUNGLFFBQVEsRUFDUixVQUFVLEVBQ1YsR0FBRyxFQUNILE9BQU8sRUFDUCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsRUFDVixHQUFHLEVBQ0gsR0FBRyxFQUNILEdBQUcsRUFDSCxTQUFTLEVBRWhCLEVBQUUsRUFDRixFQUFFLEVBRUYsRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBRWIsU0FBUyxFQUNULFVBQVUsRUFDVixTQUFTLEVBQ2hCLE1BQU0sRUFDTixFQUFFLEVBQ0ssR0FBRyxFQUNWLEVBQUUsRUFBTyxFQUFFLEVBQVEsRUFBRSxFQUFRLEVBQUUsRUFBUSxFQUFFLEVBQVEsRUFBRSxFQUFRLEVBQUUsRUFBUSxFQUFFLEVBQVEsRUFBRSxFQUUxRSxPQUFPLEVBQ1AsSUFBSSxFQUNKLE9BQU8sRUFDZCxLQUFLLDBCQTZSUCxTQUFTLEVBMkJULFFBQVE7SUFoWVosMkJBQTJCLEtBQWEsRUFBRSxJQUFZO1FBQ3BELE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsb0JBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBRUQsNEJBQTRCLEtBQWEsRUFBRSxJQUFZO1FBQ3JELE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FB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QUFHLHVCQUFVLENBQUMsY0FBYyxDQUFDO2dCQUN4QyxHQUFHO2dCQUNILEdBQUc7Z0JBQ0gsR0FBRztnQkFDSCxHQUFHO2dCQUNILEdBQUc7Z0JBQ0gsR0FBRztnQkFDSCxHQUFHO2dCQUNILElBQUk7Z0JBQ0osSUFBSTtnQkFDSixLQUFLO2dCQUNMLEtBQUs7Z0JBQ0wsR0FBRztnQkFDSCxHQUFHO2dCQUNILElBQUk7Z0JBQ0osSUFBSTtnQkFDSixJQUFJO2dCQUNKLElBQUk7Z0JBQ0osR0FBRztnQkFDSCxHQUFHO2dCQUNILEdBQUc7Z0JBQ0gsR0FBRztnQkFDSCxHQUFHO2dCQUNILElBQUk7YUFDTCxDQUFDLENBQUM7WUFHQyxRQUFRLEdBQ1IsdUJBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tcGlsZXIvZXhwcmVzc2lvbl9wYXJzZXIvbGV4ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpL2RlY29yYXRvcnMnO1xuaW1wb3J0IHtMaXN0V3JhcHBlciwgU2V0V3JhcHBlcn0gZnJvbSBcImFuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvblwiO1xuaW1wb3J0IHtOdW1iZXJXcmFwcGVyLCBTdHJpbmdKb2luZXIsIFN0cmluZ1dyYXBwZXIsIGlzUHJlc2VudH0gZnJvbSBcImFuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZ1wiO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuXG5leHBvcnQgZW51bSBUb2tlblR5cGUge1xuICBDaGFyYWN0ZXIsXG4gIElkZW50aWZpZXIsXG4gIEtleXdvcmQsXG4gIFN0cmluZyxcbiAgT3BlcmF0b3IsXG4gIE51bWJlclxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTGV4ZXIge1xuICB0b2tlbml6ZSh0ZXh0OiBzdHJpbmcpOiBhbnlbXSB7XG4gICAgdmFyIHNjYW5uZXIgPSBuZXcgX1NjYW5uZXIodGV4dCk7XG4gICAgdmFyIHRva2VucyA9IFtdO1xuICAgIHZhciB0b2tlbiA9IHNjYW5uZXIuc2NhblRva2VuKCk7XG4gICAgd2hpbGUgKHRva2VuICE9IG51bGwpIHtcbiAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgIHRva2VuID0gc2Nhbm5lci5zY2FuVG9rZW4oKTtcbiAgICB9XG4gICAgcmV0dXJuIHRva2VucztcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVG9rZW4ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgaW5kZXg6IG51bWJlciwgcHVibGljIHR5cGU6IFRva2VuVHlwZSwgcHVibGljIG51bVZhbHVlOiBudW1iZXIsXG4gICAgICAgICAgICAgIHB1YmxpYyBzdHJWYWx1ZTogc3RyaW5nKSB7fVxuXG4gIGlzQ2hhcmFjdGVyKGNvZGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiAodGhpcy50eXBlID09IFRva2VuVHlwZS5DaGFyYWN0ZXIgJiYgdGhpcy5udW1WYWx1ZSA9PSBjb2RlKTtcbiAgfVxuXG4gIGlzTnVtYmVyKCk6IGJvb2xlYW4geyByZXR1cm4gKHRoaXMudHlwZSA9PSBUb2tlblR5cGUuTnVtYmVyKTsgfVxuXG4gIGlzU3RyaW5nKCk6IGJvb2xlYW4geyByZXR1cm4gKHRoaXMudHlwZSA9PSBUb2tlblR5cGUuU3RyaW5nKTsgfVxuXG4gIGlzT3BlcmF0b3Iob3BlcmF0ZXI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAodGhpcy50eXBlID09IFRva2VuVHlwZS5PcGVyYXRvciAmJiB0aGlzLnN0clZhbHVlID09IG9wZXJhdGVyKTtcbiAgfVxuXG4gIGlzSWRlbnRpZmllcigpOiBib29sZWFuIHsgcmV0dXJuICh0aGlzLnR5cGUgPT0gVG9rZW5UeXBlLklkZW50aWZpZXIpOyB9XG5cbiAgaXNLZXl3b3JkKCk6IGJvb2xlYW4geyByZXR1cm4gKHRoaXMudHlwZSA9PSBUb2tlblR5cGUuS2V5d29yZCk7IH1cblxuICBpc0tleXdvcmREZXByZWNhdGVkVmFyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAodGhpcy50eXBlID09IFRva2VuVHlwZS5LZXl3b3JkICYmIHRoaXMuc3RyVmFsdWUgPT0gXCJ2YXJcIik7XG4gIH1cblxuICBpc0tleXdvcmRMZXQoKTogYm9vbGVhbiB7IHJldHVybiAodGhpcy50eXBlID09IFRva2VuVHlwZS5LZXl3b3JkICYmIHRoaXMuc3RyVmFsdWUgPT0gXCJsZXRcIik7IH1cblxuICBpc0tleXdvcmROdWxsKCk6IGJvb2xlYW4geyByZXR1cm4gKHRoaXMudHlwZSA9PSBUb2tlblR5cGUuS2V5d29yZCAmJiB0aGlzLnN0clZhbHVlID09IFwibnVsbFwiKTsgfVxuXG4gIGlzS2V5d29yZFVuZGVmaW5lZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKHRoaXMudHlwZSA9PSBUb2tlblR5cGUuS2V5d29yZCAmJiB0aGlzLnN0clZhbHVlID09IFwidW5kZWZpbmVkXCIpO1xuICB9XG5cbiAgaXNLZXl3b3JkVHJ1ZSgpOiBib29sZWFuIHsgcmV0dXJuICh0aGlzLnR5cGUgPT0gVG9rZW5UeXBlLktleXdvcmQgJiYgdGhpcy5zdHJWYWx1ZSA9PSBcInRydWVcIik7IH1cblxuICBpc0tleXdvcmRGYWxzZSgpOiBib29sZWFuIHsgcmV0dXJuICh0aGlzLnR5cGUgPT0gVG9rZW5UeXBlLktleXdvcmQgJiYgdGhpcy5zdHJWYWx1ZSA9PSBcImZhbHNlXCIpOyB9XG5cbiAgdG9OdW1iZXIoKTogbnVtYmVyIHtcbiAgICAvLyAtMSBpbnN0ZWFkIG9mIE5VTEwgb2s/XG4gICAgcmV0dXJuICh0aGlzLnR5cGUgPT0gVG9rZW5UeXBlLk51bWJlcikgPyB0aGlzLm51bVZhbHVlIDogLTE7XG4gIH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICBjYXNlIFRva2VuVHlwZS5DaGFyYWN0ZXI6XG4gICAgICBjYXNlIFRva2VuVHlwZS5JZGVudGlmaWVyOlxuICAgICAgY2FzZSBUb2tlblR5cGUuS2V5d29yZDpcbiAgICAgIGNhc2UgVG9rZW5UeXBlLk9wZXJhdG9yOlxuICAgICAgY2FzZSBUb2tlblR5cGUuU3RyaW5nOlxuICAgICAgICByZXR1cm4gdGhpcy5zdHJWYWx1ZTtcbiAgICAgIGNhc2UgVG9rZW5UeXBlLk51bWJlcjpcbiAgICAgICAgcmV0dXJuIHRoaXMubnVtVmFsdWUudG9TdHJpbmcoKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBuZXdDaGFyYWN0ZXJUb2tlbihpbmRleDogbnVtYmVyLCBjb2RlOiBudW1iZXIpOiBUb2tlbiB7XG4gIHJldHVybiBuZXcgVG9rZW4oaW5kZXgsIFRva2VuVHlwZS5DaGFyYWN0ZXIsIGNvZGUsIFN0cmluZ1dyYXBwZXIuZnJvbUNoYXJDb2RlKGNvZGUpKTtcbn1cblxuZnVuY3Rpb24gbmV3SWRlbnRpZmllclRva2VuKGluZGV4OiBudW1iZXIsIHRleHQ6IHN0cmluZyk6IFRva2VuIHtcbiAgcmV0dXJuIG5ldyBUb2tlbihpbmRleCwgVG9rZW5UeXBlLklkZW50aWZpZXIsIDAsIHRleHQpO1xufVxuXG5mdW5jdGlvbiBuZXdLZXl3b3JkVG9rZW4oaW5kZXg6IG51bWJlciwgdGV4dDogc3RyaW5nKTogVG9rZW4ge1xuICByZXR1cm4gbmV3IFRva2VuKGluZGV4LCBUb2tlblR5cGUuS2V5d29yZCwgMCwgdGV4dCk7XG59XG5cbmZ1bmN0aW9uIG5ld09wZXJhdG9yVG9rZW4oaW5kZXg6IG51bWJlciwgdGV4dDogc3RyaW5nKTogVG9rZW4ge1xuICByZXR1cm4gbmV3IFRva2VuKGluZGV4LCBUb2tlblR5cGUuT3BlcmF0b3IsIDAsIHRleHQpO1xufVxuXG5mdW5jdGlvbiBuZXdTdHJpbmdUb2tlbihpbmRleDogbnVtYmVyLCB0ZXh0OiBzdHJpbmcpOiBUb2tlbiB7XG4gIHJldHVybiBuZXcgVG9rZW4oaW5kZXgsIFRva2VuVHlwZS5TdHJpbmcsIDAsIHRleHQpO1xufVxuXG5mdW5jdGlvbiBuZXdOdW1iZXJUb2tlbihpbmRleDogbnVtYmVyLCBuOiBudW1iZXIpOiBUb2tlbiB7XG4gIHJldHVybiBuZXcgVG9rZW4oaW5kZXgsIFRva2VuVHlwZS5OdW1iZXIsIG4sIFwiXCIpO1xufVxuXG5cbmV4cG9ydCB2YXIgRU9GOiBUb2tlbiA9IG5ldyBUb2tlbigtMSwgVG9rZW5UeXBlLkNoYXJhY3RlciwgMCwgXCJcIik7XG5cbmV4cG9ydCBjb25zdCAkRU9GID0gMDtcbmV4cG9ydCBjb25zdCAkVEFCID0gOTtcbmV4cG9ydCBjb25zdCAkTEYgPSAxMDtcbmV4cG9ydCBjb25zdCAkVlRBQiA9IDExO1xuZXhwb3J0IGNvbnN0ICRGRiA9IDEyO1xuZXhwb3J0IGNvbnN0ICRDUiA9IDEzO1xuZXhwb3J0IGNvbnN0ICRTUEFDRSA9IDMyO1xuZXhwb3J0IGNvbnN0ICRCQU5HID0gMzM7XG5leHBvcnQgY29uc3QgJERRID0gMzQ7XG5leHBvcnQgY29uc3QgJEhBU0ggPSAzNTtcbmV4cG9ydCBjb25zdCAkJCA9IDM2O1xuZXhwb3J0IGNvbnN0ICRQRVJDRU5UID0gMzc7XG5leHBvcnQgY29uc3QgJEFNUEVSU0FORCA9IDM4O1xuZXhwb3J0IGNvbnN0ICRTUSA9IDM5O1xuZXhwb3J0IGNvbnN0ICRMUEFSRU4gPSA0MDtcbmV4cG9ydCBjb25zdCAkUlBBUkVOID0gNDE7XG5leHBvcnQgY29uc3QgJFNUQVIgPSA0MjtcbmV4cG9ydCBjb25zdCAkUExVUyA9IDQzO1xuZXhwb3J0IGNvbnN0ICRDT01NQSA9IDQ0O1xuZXhwb3J0IGNvbnN0ICRNSU5VUyA9IDQ1O1xuZXhwb3J0IGNvbnN0ICRQRVJJT0QgPSA0NjtcbmV4cG9ydCBjb25zdCAkU0xBU0ggPSA0NztcbmV4cG9ydCBjb25zdCAkQ09MT04gPSA1ODtcbmV4cG9ydCBjb25zdCAkU0VNSUNPTE9OID0gNTk7XG5leHBvcnQgY29uc3QgJExUID0gNjA7XG5leHBvcnQgY29uc3QgJEVRID0gNjE7XG5leHBvcnQgY29uc3QgJEdUID0gNjI7XG5leHBvcnQgY29uc3QgJFFVRVNUSU9OID0gNjM7XG5cbmNvbnN0ICQwID0gNDg7XG5jb25zdCAkOSA9IDU3O1xuXG5jb25zdCAkQSA9IDY1LCAkRSA9IDY5LCAkWiA9IDkwO1xuXG5leHBvcnQgY29uc3QgJExCUkFDS0VUID0gOTE7XG5leHBvcnQgY29uc3QgJEJBQ0tTTEFTSCA9IDkyO1xuZXhwb3J0IGNvbnN0ICRSQlJBQ0tFVCA9IDkzO1xuY29uc3QgJENBUkVUID0gOTQ7XG5jb25zdCAkXyA9IDk1O1xuZXhwb3J0IGNvbnN0ICRCVCA9IDk2O1xuY29uc3QgJGEgPSA5NywgJGUgPSAxMDEsICRmID0gMTAyLCAkbiA9IDExMCwgJHIgPSAxMTQsICR0ID0gMTE2LCAkdSA9IDExNywgJHYgPSAxMTgsICR6ID0gMTIyO1xuXG5leHBvcnQgY29uc3QgJExCUkFDRSA9IDEyMztcbmV4cG9ydCBjb25zdCAkQkFSID0gMTI0O1xuZXhwb3J0IGNvbnN0ICRSQlJBQ0UgPSAxMjU7XG5jb25zdCAkTkJTUCA9IDE2MDtcblxuZXhwb3J0IGNsYXNzIFNjYW5uZXJFcnJvciBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbWVzc2FnZSkgeyBzdXBlcigpOyB9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMubWVzc2FnZTsgfVxufVxuXG5jbGFzcyBfU2Nhbm5lciB7XG4gIGxlbmd0aDogbnVtYmVyO1xuICBwZWVrOiBudW1iZXIgPSAwO1xuICBpbmRleDogbnVtYmVyID0gLTE7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGlucHV0OiBzdHJpbmcpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGlucHV0Lmxlbmd0aDtcbiAgICB0aGlzLmFkdmFuY2UoKTtcbiAgfVxuXG4gIGFkdmFuY2UoKSB7XG4gICAgdGhpcy5wZWVrID1cbiAgICAgICAgKyt0aGlzLmluZGV4ID49IHRoaXMubGVuZ3RoID8gJEVPRiA6IFN0cmluZ1dyYXBwZXIuY2hhckNvZGVBdCh0aGlzLmlucHV0LCB0aGlzLmluZGV4KTtcbiAgfVxuXG4gIHNjYW5Ub2tlbigpOiBUb2tlbiB7XG4gICAgdmFyIGlucHV0ID0gdGhpcy5pbnB1dCwgbGVuZ3RoID0gdGhpcy5sZW5ndGgsIHBlZWsgPSB0aGlzLnBlZWssIGluZGV4ID0gdGhpcy5pbmRleDtcblxuICAgIC8vIFNraXAgd2hpdGVzcGFjZS5cbiAgICB3aGlsZSAocGVlayA8PSAkU1BBQ0UpIHtcbiAgICAgIGlmICgrK2luZGV4ID49IGxlbmd0aCkge1xuICAgICAgICBwZWVrID0gJEVPRjtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwZWVrID0gU3RyaW5nV3JhcHBlci5jaGFyQ29kZUF0KGlucHV0LCBpbmRleCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wZWVrID0gcGVlaztcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG5cbiAgICBpZiAoaW5kZXggPj0gbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgaWRlbnRpZmllcnMgYW5kIG51bWJlcnMuXG4gICAgaWYgKGlzSWRlbnRpZmllclN0YXJ0KHBlZWspKSByZXR1cm4gdGhpcy5zY2FuSWRlbnRpZmllcigpO1xuICAgIGlmIChpc0RpZ2l0KHBlZWspKSByZXR1cm4gdGhpcy5zY2FuTnVtYmVyKGluZGV4KTtcblxuICAgIHZhciBzdGFydDogbnVtYmVyID0gaW5kZXg7XG4gICAgc3dpdGNoIChwZWVrKSB7XG4gICAgICBjYXNlICRQRVJJT0Q6XG4gICAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgICAgICByZXR1cm4gaXNEaWdpdCh0aGlzLnBlZWspID8gdGhpcy5zY2FuTnVtYmVyKHN0YXJ0KSA6IG5ld0NoYXJhY3RlclRva2VuKHN0YXJ0LCAkUEVSSU9EKTtcbiAgICAgIGNhc2UgJExQQVJFTjpcbiAgICAgIGNhc2UgJFJQQVJFTjpcbiAgICAgIGNhc2UgJExCUkFDRTpcbiAgICAgIGNhc2UgJFJCUkFDRTpcbiAgICAgIGNhc2UgJExCUkFDS0VUOlxuICAgICAgY2FzZSAkUkJSQUNLRVQ6XG4gICAgICBjYXNlICRDT01NQTpcbiAgICAgIGNhc2UgJENPTE9OOlxuICAgICAgY2FzZSAkU0VNSUNPTE9OOlxuICAgICAgICByZXR1cm4gdGhpcy5zY2FuQ2hhcmFjdGVyKHN0YXJ0LCBwZWVrKTtcbiAgICAgIGNhc2UgJFNROlxuICAgICAgY2FzZSAkRFE6XG4gICAgICAgIHJldHVybiB0aGlzLnNjYW5TdHJpbmcoKTtcbiAgICAgIGNhc2UgJEhBU0g6XG4gICAgICBjYXNlICRQTFVTOlxuICAgICAgY2FzZSAkTUlOVVM6XG4gICAgICBjYXNlICRTVEFSOlxuICAgICAgY2FzZSAkU0xBU0g6XG4gICAgICBjYXNlICRQRVJDRU5UOlxuICAgICAgY2FzZSAkQ0FSRVQ6XG4gICAgICAgIHJldHVybiB0aGlzLnNjYW5PcGVyYXRvcihzdGFydCwgU3RyaW5nV3JhcHBlci5mcm9tQ2hhckNvZGUocGVlaykpO1xuICAgICAgY2FzZSAkUVVFU1RJT046XG4gICAgICAgIHJldHVybiB0aGlzLnNjYW5Db21wbGV4T3BlcmF0b3Ioc3RhcnQsICc/JywgJFBFUklPRCwgJy4nKTtcbiAgICAgIGNhc2UgJExUOlxuICAgICAgY2FzZSAkR1Q6XG4gICAgICAgIHJldHVybiB0aGlzLnNjYW5Db21wbGV4T3BlcmF0b3Ioc3RhcnQsIFN0cmluZ1dyYXBwZXIuZnJvbUNoYXJDb2RlKHBlZWspLCAkRVEsICc9Jyk7XG4gICAgICBjYXNlICRCQU5HOlxuICAgICAgY2FzZSAkRVE6XG4gICAgICAgIHJldHVybiB0aGlzLnNjYW5Db21wbGV4T3BlcmF0b3Ioc3RhcnQsIFN0cmluZ1dyYXBwZXIuZnJvbUNoYXJDb2RlKHBlZWspLCAkRVEsICc9JywgJEVRLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc9Jyk7XG4gICAgICBjYXNlICRBTVBFUlNBTkQ6XG4gICAgICAgIHJldHVybiB0aGlzLnNjYW5Db21wbGV4T3BlcmF0b3Ioc3RhcnQsICcmJywgJEFNUEVSU0FORCwgJyYnKTtcbiAgICAgIGNhc2UgJEJBUjpcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbkNvbXBsZXhPcGVyYXRvcihzdGFydCwgJ3wnLCAkQkFSLCAnfCcpO1xuICAgICAgY2FzZSAkTkJTUDpcbiAgICAgICAgd2hpbGUgKGlzV2hpdGVzcGFjZSh0aGlzLnBlZWspKSB0aGlzLmFkdmFuY2UoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhblRva2VuKCk7XG4gICAgfVxuXG4gICAgdGhpcy5lcnJvcihgVW5leHBlY3RlZCBjaGFyYWN0ZXIgWyR7U3RyaW5nV3JhcHBlci5mcm9tQ2hhckNvZGUocGVlayl9XWAsIDApO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgc2NhbkNoYXJhY3RlcihzdGFydDogbnVtYmVyLCBjb2RlOiBudW1iZXIpOiBUb2tlbiB7XG4gICAgdGhpcy5hZHZhbmNlKCk7XG4gICAgcmV0dXJuIG5ld0NoYXJhY3RlclRva2VuKHN0YXJ0LCBjb2RlKTtcbiAgfVxuXG5cbiAgc2Nhbk9wZXJhdG9yKHN0YXJ0OiBudW1iZXIsIHN0cjogc3RyaW5nKTogVG9rZW4ge1xuICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgIHJldHVybiBuZXdPcGVyYXRvclRva2VuKHN0YXJ0LCBzdHIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRva2VuaXplIGEgMi8zIGNoYXIgbG9uZyBvcGVyYXRvclxuICAgKlxuICAgKiBAcGFyYW0gc3RhcnQgc3RhcnQgaW5kZXggaW4gdGhlIGV4cHJlc3Npb25cbiAgICogQHBhcmFtIG9uZSBmaXJzdCBzeW1ib2wgKGFsd2F5cyBwYXJ0IG9mIHRoZSBvcGVyYXRvcilcbiAgICogQHBhcmFtIHR3b0NvZGUgY29kZSBwb2ludCBmb3IgdGhlIHNlY29uZCBzeW1ib2xcbiAgICogQHBhcmFtIHR3byBzZWNvbmQgc3ltYm9sIChwYXJ0IG9mIHRoZSBvcGVyYXRvciB3aGVuIHRoZSBzZWNvbmQgY29kZSBwb2ludCBtYXRjaGVzKVxuICAgKiBAcGFyYW0gdGhyZWVDb2RlIGNvZGUgcG9pbnQgZm9yIHRoZSB0aGlyZCBzeW1ib2xcbiAgICogQHBhcmFtIHRocmVlIHRoaXJkIHN5bWJvbCAocGFydCBvZiB0aGUgb3BlcmF0b3Igd2hlbiBwcm92aWRlZCBhbmQgbWF0Y2hlcyBzb3VyY2UgZXhwcmVzc2lvbilcbiAgICogQHJldHVybnMge1Rva2VufVxuICAgKi9cbiAgc2NhbkNvbXBsZXhPcGVyYXRvcihzdGFydDogbnVtYmVyLCBvbmU6IHN0cmluZywgdHdvQ29kZTogbnVtYmVyLCB0d286IHN0cmluZywgdGhyZWVDb2RlPzogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgIHRocmVlPzogc3RyaW5nKTogVG9rZW4ge1xuICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgIHZhciBzdHI6IHN0cmluZyA9IG9uZTtcbiAgICBpZiAodGhpcy5wZWVrID09IHR3b0NvZGUpIHtcbiAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgICAgc3RyICs9IHR3bztcbiAgICB9XG4gICAgaWYgKGlzUHJlc2VudCh0aHJlZUNvZGUpICYmIHRoaXMucGVlayA9PSB0aHJlZUNvZGUpIHtcbiAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgICAgc3RyICs9IHRocmVlO1xuICAgIH1cbiAgICByZXR1cm4gbmV3T3BlcmF0b3JUb2tlbihzdGFydCwgc3RyKTtcbiAgfVxuXG4gIHNjYW5JZGVudGlmaWVyKCk6IFRva2VuIHtcbiAgICB2YXIgc3RhcnQ6IG51bWJlciA9IHRoaXMuaW5kZXg7XG4gICAgdGhpcy5hZHZhbmNlKCk7XG4gICAgd2hpbGUgKGlzSWRlbnRpZmllclBhcnQodGhpcy5wZWVrKSkgdGhpcy5hZHZhbmNlKCk7XG4gICAgdmFyIHN0cjogc3RyaW5nID0gdGhpcy5pbnB1dC5zdWJzdHJpbmcoc3RhcnQsIHRoaXMuaW5kZXgpO1xuICAgIGlmIChTZXRXcmFwcGVyLmhhcyhLRVlXT1JEUywgc3RyKSkge1xuICAgICAgcmV0dXJuIG5ld0tleXdvcmRUb2tlbihzdGFydCwgc3RyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ld0lkZW50aWZpZXJUb2tlbihzdGFydCwgc3RyKTtcbiAgICB9XG4gIH1cblxuICBzY2FuTnVtYmVyKHN0YXJ0OiBudW1iZXIpOiBUb2tlbiB7XG4gICAgdmFyIHNpbXBsZTogYm9vbGVhbiA9ICh0aGlzLmluZGV4ID09PSBzdGFydCk7XG4gICAgdGhpcy5hZHZhbmNlKCk7ICAvLyBTa2lwIGluaXRpYWwgZGlnaXQuXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGlmIChpc0RpZ2l0KHRoaXMucGVlaykpIHtcbiAgICAgICAgLy8gRG8gbm90aGluZy5cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wZWVrID09ICRQRVJJT0QpIHtcbiAgICAgICAgc2ltcGxlID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKGlzRXhwb25lbnRTdGFydCh0aGlzLnBlZWspKSB7XG4gICAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgICAgICBpZiAoaXNFeHBvbmVudFNpZ24odGhpcy5wZWVrKSkgdGhpcy5hZHZhbmNlKCk7XG4gICAgICAgIGlmICghaXNEaWdpdCh0aGlzLnBlZWspKSB0aGlzLmVycm9yKCdJbnZhbGlkIGV4cG9uZW50JywgLTEpO1xuICAgICAgICBzaW1wbGUgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgdGhpcy5hZHZhbmNlKCk7XG4gICAgfVxuICAgIHZhciBzdHI6IHN0cmluZyA9IHRoaXMuaW5wdXQuc3Vic3RyaW5nKHN0YXJ0LCB0aGlzLmluZGV4KTtcbiAgICAvLyBUT0RPXG4gICAgdmFyIHZhbHVlOiBudW1iZXIgPVxuICAgICAgICBzaW1wbGUgPyBOdW1iZXJXcmFwcGVyLnBhcnNlSW50QXV0b1JhZGl4KHN0cikgOiBOdW1iZXJXcmFwcGVyLnBhcnNlRmxvYXQoc3RyKTtcbiAgICByZXR1cm4gbmV3TnVtYmVyVG9rZW4oc3RhcnQsIHZhbHVlKTtcbiAgfVxuXG4gIHNjYW5TdHJpbmcoKTogVG9rZW4ge1xuICAgIHZhciBzdGFydDogbnVtYmVyID0gdGhpcy5pbmRleDtcbiAgICB2YXIgcXVvdGU6IG51bWJlciA9IHRoaXMucGVlaztcbiAgICB0aGlzLmFkdmFuY2UoKTsgIC8vIFNraXAgaW5pdGlhbCBxdW90ZS5cblxuICAgIHZhciBidWZmZXI6IFN0cmluZ0pvaW5lcjtcbiAgICB2YXIgbWFya2VyOiBudW1iZXIgPSB0aGlzLmluZGV4O1xuICAgIHZhciBpbnB1dDogc3RyaW5nID0gdGhpcy5pbnB1dDtcblxuICAgIHdoaWxlICh0aGlzLnBlZWsgIT0gcXVvdGUpIHtcbiAgICAgIGlmICh0aGlzLnBlZWsgPT0gJEJBQ0tTTEFTSCkge1xuICAgICAgICBpZiAoYnVmZmVyID09IG51bGwpIGJ1ZmZlciA9IG5ldyBTdHJpbmdKb2luZXIoKTtcbiAgICAgICAgYnVmZmVyLmFkZChpbnB1dC5zdWJzdHJpbmcobWFya2VyLCB0aGlzLmluZGV4KSk7XG4gICAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgICAgICB2YXIgdW5lc2NhcGVkQ29kZTogbnVtYmVyO1xuICAgICAgICBpZiAodGhpcy5wZWVrID09ICR1KSB7XG4gICAgICAgICAgLy8gNCBjaGFyYWN0ZXIgaGV4IGNvZGUgZm9yIHVuaWNvZGUgY2hhcmFjdGVyLlxuICAgICAgICAgIHZhciBoZXg6IHN0cmluZyA9IGlucHV0LnN1YnN0cmluZyh0aGlzLmluZGV4ICsgMSwgdGhpcy5pbmRleCArIDUpO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB1bmVzY2FwZWRDb2RlID0gTnVtYmVyV3JhcHBlci5wYXJzZUludChoZXgsIDE2KTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yKGBJbnZhbGlkIHVuaWNvZGUgZXNjYXBlIFtcXFxcdSR7aGV4fV1gLCAwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZm9yICh2YXIgaTogbnVtYmVyID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5hZHZhbmNlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVuZXNjYXBlZENvZGUgPSB1bmVzY2FwZSh0aGlzLnBlZWspO1xuICAgICAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgICAgICB9XG4gICAgICAgIGJ1ZmZlci5hZGQoU3RyaW5nV3JhcHBlci5mcm9tQ2hhckNvZGUodW5lc2NhcGVkQ29kZSkpO1xuICAgICAgICBtYXJrZXIgPSB0aGlzLmluZGV4O1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnBlZWsgPT0gJEVPRikge1xuICAgICAgICB0aGlzLmVycm9yKCdVbnRlcm1pbmF0ZWQgcXVvdGUnLCAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBsYXN0OiBzdHJpbmcgPSBpbnB1dC5zdWJzdHJpbmcobWFya2VyLCB0aGlzLmluZGV4KTtcbiAgICB0aGlzLmFkdmFuY2UoKTsgIC8vIFNraXAgdGVybWluYXRpbmcgcXVvdGUuXG5cbiAgICAvLyBDb21wdXRlIHRoZSB1bmVzY2FwZWQgc3RyaW5nIHZhbHVlLlxuICAgIHZhciB1bmVzY2FwZWQ6IHN0cmluZyA9IGxhc3Q7XG4gICAgaWYgKGJ1ZmZlciAhPSBudWxsKSB7XG4gICAgICBidWZmZXIuYWRkKGxhc3QpO1xuICAgICAgdW5lc2NhcGVkID0gYnVmZmVyLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIHJldHVybiBuZXdTdHJpbmdUb2tlbihzdGFydCwgdW5lc2NhcGVkKTtcbiAgfVxuXG4gIGVycm9yKG1lc3NhZ2U6IHN0cmluZywgb2Zmc2V0OiBudW1iZXIpIHtcbiAgICB2YXIgcG9zaXRpb246IG51bWJlciA9IHRoaXMuaW5kZXggKyBvZmZzZXQ7XG4gICAgdGhyb3cgbmV3IFNjYW5uZXJFcnJvcihcbiAgICAgICAgYExleGVyIEVycm9yOiAke21lc3NhZ2V9IGF0IGNvbHVtbiAke3Bvc2l0aW9ufSBpbiBleHByZXNzaW9uIFske3RoaXMuaW5wdXR9XWApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzV2hpdGVzcGFjZShjb2RlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgcmV0dXJuIChjb2RlID49ICRUQUIgJiYgY29kZSA8PSAkU1BBQ0UpIHx8IChjb2RlID09ICROQlNQKTtcbn1cblxuZnVuY3Rpb24gaXNJZGVudGlmaWVyU3RhcnQoY29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiAoJGEgPD0gY29kZSAmJiBjb2RlIDw9ICR6KSB8fCAoJEEgPD0gY29kZSAmJiBjb2RlIDw9ICRaKSB8fCAoY29kZSA9PSAkXykgfHwgKGNvZGUgPT0gJCQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNJZGVudGlmaWVyKGlucHV0OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgaWYgKGlucHV0Lmxlbmd0aCA9PSAwKSByZXR1cm4gZmFsc2U7XG4gIHZhciBzY2FubmVyID0gbmV3IF9TY2FubmVyKGlucHV0KTtcbiAgaWYgKCFpc0lkZW50aWZpZXJTdGFydChzY2FubmVyLnBlZWspKSByZXR1cm4gZmFsc2U7XG4gIHNjYW5uZXIuYWR2YW5jZSgpO1xuICB3aGlsZSAoc2Nhbm5lci5wZWVrICE9PSAkRU9GKSB7XG4gICAgaWYgKCFpc0lkZW50aWZpZXJQYXJ0KHNjYW5uZXIucGVlaykpIHJldHVybiBmYWxzZTtcbiAgICBzY2FubmVyLmFkdmFuY2UoKTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaXNJZGVudGlmaWVyUGFydChjb2RlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgcmV0dXJuICgkYSA8PSBjb2RlICYmIGNvZGUgPD0gJHopIHx8ICgkQSA8PSBjb2RlICYmIGNvZGUgPD0gJFopIHx8ICgkMCA8PSBjb2RlICYmIGNvZGUgPD0gJDkpIHx8XG4gICAgICAgICAoY29kZSA9PSAkXykgfHwgKGNvZGUgPT0gJCQpO1xufVxuXG5mdW5jdGlvbiBpc0RpZ2l0KGNvZGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICByZXR1cm4gJDAgPD0gY29kZSAmJiBjb2RlIDw9ICQ5O1xufVxuXG5mdW5jdGlvbiBpc0V4cG9uZW50U3RhcnQoY29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiBjb2RlID09ICRlIHx8IGNvZGUgPT0gJEU7XG59XG5cbmZ1bmN0aW9uIGlzRXhwb25lbnRTaWduKGNvZGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICByZXR1cm4gY29kZSA9PSAkTUlOVVMgfHwgY29kZSA9PSAkUExVUztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUXVvdGUoY29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiBjb2RlID09PSAkU1EgfHwgY29kZSA9PT0gJERRIHx8IGNvZGUgPT09ICRCVDtcbn1cblxuZnVuY3Rpb24gdW5lc2NhcGUoY29kZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgc3dpdGNoIChjb2RlKSB7XG4gICAgY2FzZSAkbjpcbiAgICAgIHJldHVybiAkTEY7XG4gICAgY2FzZSAkZjpcbiAgICAgIHJldHVybiAkRkY7XG4gICAgY2FzZSAkcjpcbiAgICAgIHJldHVybiAkQ1I7XG4gICAgY2FzZSAkdDpcbiAgICAgIHJldHVybiAkVEFCO1xuICAgIGNhc2UgJHY6XG4gICAgICByZXR1cm4gJFZUQUI7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBjb2RlO1xuICB9XG59XG5cbnZhciBPUEVSQVRPUlMgPSBTZXRXcmFwcGVyLmNyZWF0ZUZyb21MaXN0KFtcbiAgJysnLFxuICAnLScsXG4gICcqJyxcbiAgJy8nLFxuICAnJScsXG4gICdeJyxcbiAgJz0nLFxuICAnPT0nLFxuICAnIT0nLFxuICAnPT09JyxcbiAgJyE9PScsXG4gICc8JyxcbiAgJz4nLFxuICAnPD0nLFxuICAnPj0nLFxuICAnJiYnLFxuICAnfHwnLFxuICAnJicsXG4gICd8JyxcbiAgJyEnLFxuICAnPycsXG4gICcjJyxcbiAgJz8uJ1xuXSk7XG5cblxudmFyIEtFWVdPUkRTID1cbiAgICBTZXRXcmFwcGVyLmNyZWF0ZUZyb21MaXN0KFsndmFyJywgJ2xldCcsICdudWxsJywgJ3VuZGVmaW5lZCcsICd0cnVlJywgJ2ZhbHNlJywgJ2lmJywgJ2Vsc2UnXSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
