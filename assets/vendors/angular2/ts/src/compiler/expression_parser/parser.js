System.register(['angular2/src/core/di/decorators', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/collection', './lexer', './ast'], function(exports_1, context_1) {
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
    var decorators_1, lang_1, exceptions_1, collection_1, lexer_1, ast_1;
    var _implicitReceiver, INTERPOLATION_REGEXP, ParseException, SplitInterpolation, TemplateBindingParseResult, Parser, _ParseAST, SimpleExpressionChecker;
    return {
        setters:[
            function (decorators_1_1) {
                decorators_1 = decorators_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lexer_1_1) {
                lexer_1 = lexer_1_1;
            },
            function (ast_1_1) {
                ast_1 = ast_1_1;
            }],
        execute: function() {
            _implicitReceiver = new ast_1.ImplicitReceiver();
            // TODO(tbosch): Cannot make this const/final right now because of the transpiler...
            INTERPOLATION_REGEXP = /\{\{([\s\S]*?)\}\}/g;
            ParseException = (function (_super) {
                __extends(ParseException, _super);
                function ParseException(message, input, errLocation, ctxLocation) {
                    _super.call(this, "Parser Error: " + message + " " + errLocation + " [" + input + "] in " + ctxLocation);
                }
                return ParseException;
            }(exceptions_1.BaseException));
            SplitInterpolation = (function () {
                function SplitInterpolation(strings, expressions) {
                    this.strings = strings;
                    this.expressions = expressions;
                }
                return SplitInterpolation;
            }());
            exports_1("SplitInterpolation", SplitInterpolation);
            TemplateBindingParseResult = (function () {
                function TemplateBindingParseResult(templateBindings, warnings) {
                    this.templateBindings = templateBindings;
                    this.warnings = warnings;
                }
                return TemplateBindingParseResult;
            }());
            exports_1("TemplateBindingParseResult", TemplateBindingParseResult);
            Parser = (function () {
                function Parser(/** @internal */ _lexer) {
                    this._lexer = _lexer;
                }
                Parser.prototype.parseAction = function (input, location) {
                    this._checkNoInterpolation(input, location);
                    var tokens = this._lexer.tokenize(this._stripComments(input));
                    var ast = new _ParseAST(input, location, tokens, true).parseChain();
                    return new ast_1.ASTWithSource(ast, input, location);
                };
                Parser.prototype.parseBinding = function (input, location) {
                    var ast = this._parseBindingAst(input, location);
                    return new ast_1.ASTWithSource(ast, input, location);
                };
                Parser.prototype.parseSimpleBinding = function (input, location) {
                    var ast = this._parseBindingAst(input, location);
                    if (!SimpleExpressionChecker.check(ast)) {
                        throw new ParseException('Host binding expression can only contain field access and constants', input, location);
                    }
                    return new ast_1.ASTWithSource(ast, input, location);
                };
                Parser.prototype._parseBindingAst = function (input, location) {
                    // Quotes expressions use 3rd-party expression language. We don't want to use
                    // our lexer or parser for that, so we check for that ahead of time.
                    var quote = this._parseQuote(input, location);
                    if (lang_1.isPresent(quote)) {
                        return quote;
                    }
                    this._checkNoInterpolation(input, location);
                    var tokens = this._lexer.tokenize(this._stripComments(input));
                    return new _ParseAST(input, location, tokens, false).parseChain();
                };
                Parser.prototype._parseQuote = function (input, location) {
                    if (lang_1.isBlank(input))
                        return null;
                    var prefixSeparatorIndex = input.indexOf(':');
                    if (prefixSeparatorIndex == -1)
                        return null;
                    var prefix = input.substring(0, prefixSeparatorIndex).trim();
                    if (!lexer_1.isIdentifier(prefix))
                        return null;
                    var uninterpretedExpression = input.substring(prefixSeparatorIndex + 1);
                    return new ast_1.Quote(prefix, uninterpretedExpression, location);
                };
                Parser.prototype.parseTemplateBindings = function (input, location) {
                    var tokens = this._lexer.tokenize(input);
                    return new _ParseAST(input, location, tokens, false).parseTemplateBindings();
                };
                Parser.prototype.parseInterpolation = function (input, location) {
                    var split = this.splitInterpolation(input, location);
                    if (split == null)
                        return null;
                    var expressions = [];
                    for (var i = 0; i < split.expressions.length; ++i) {
                        var tokens = this._lexer.tokenize(this._stripComments(split.expressions[i]));
                        var ast = new _ParseAST(input, location, tokens, false).parseChain();
                        expressions.push(ast);
                    }
                    return new ast_1.ASTWithSource(new ast_1.Interpolation(split.strings, expressions), input, location);
                };
                Parser.prototype.splitInterpolation = function (input, location) {
                    var parts = lang_1.StringWrapper.split(input, INTERPOLATION_REGEXP);
                    if (parts.length <= 1) {
                        return null;
                    }
                    var strings = [];
                    var expressions = [];
                    for (var i = 0; i < parts.length; i++) {
                        var part = parts[i];
                        if (i % 2 === 0) {
                            // fixed string
                            strings.push(part);
                        }
                        else if (part.trim().length > 0) {
                            expressions.push(part);
                        }
                        else {
                            throw new ParseException('Blank expressions are not allowed in interpolated strings', input, "at column " + this._findInterpolationErrorColumn(parts, i) + " in", location);
                        }
                    }
                    return new SplitInterpolation(strings, expressions);
                };
                Parser.prototype.wrapLiteralPrimitive = function (input, location) {
                    return new ast_1.ASTWithSource(new ast_1.LiteralPrimitive(input), input, location);
                };
                Parser.prototype._stripComments = function (input) {
                    var i = this._commentStart(input);
                    return lang_1.isPresent(i) ? input.substring(0, i).trim() : input;
                };
                Parser.prototype._commentStart = function (input) {
                    var outerQuote = null;
                    for (var i = 0; i < input.length - 1; i++) {
                        var char = lang_1.StringWrapper.charCodeAt(input, i);
                        var nextChar = lang_1.StringWrapper.charCodeAt(input, i + 1);
                        if (char === lexer_1.$SLASH && nextChar == lexer_1.$SLASH && lang_1.isBlank(outerQuote))
                            return i;
                        if (outerQuote === char) {
                            outerQuote = null;
                        }
                        else if (lang_1.isBlank(outerQuote) && lexer_1.isQuote(char)) {
                            outerQuote = char;
                        }
                    }
                    return null;
                };
                Parser.prototype._checkNoInterpolation = function (input, location) {
                    var parts = lang_1.StringWrapper.split(input, INTERPOLATION_REGEXP);
                    if (parts.length > 1) {
                        throw new ParseException('Got interpolation ({{}}) where expression was expected', input, "at column " + this._findInterpolationErrorColumn(parts, 1) + " in", location);
                    }
                };
                Parser.prototype._findInterpolationErrorColumn = function (parts, partInErrIdx) {
                    var errLocation = '';
                    for (var j = 0; j < partInErrIdx; j++) {
                        errLocation += j % 2 === 0 ? parts[j] : "{{" + parts[j] + "}}";
                    }
                    return errLocation.length;
                };
                Parser = __decorate([
                    decorators_1.Injectable(), 
                    __metadata('design:paramtypes', [lexer_1.Lexer])
                ], Parser);
                return Parser;
            }());
            exports_1("Parser", Parser);
            _ParseAST = (function () {
                function _ParseAST(input, location, tokens, parseAction) {
                    this.input = input;
                    this.location = location;
                    this.tokens = tokens;
                    this.parseAction = parseAction;
                    this.index = 0;
                }
                _ParseAST.prototype.peek = function (offset) {
                    var i = this.index + offset;
                    return i < this.tokens.length ? this.tokens[i] : lexer_1.EOF;
                };
                Object.defineProperty(_ParseAST.prototype, "next", {
                    get: function () { return this.peek(0); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(_ParseAST.prototype, "inputIndex", {
                    get: function () {
                        return (this.index < this.tokens.length) ? this.next.index : this.input.length;
                    },
                    enumerable: true,
                    configurable: true
                });
                _ParseAST.prototype.advance = function () { this.index++; };
                _ParseAST.prototype.optionalCharacter = function (code) {
                    if (this.next.isCharacter(code)) {
                        this.advance();
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                _ParseAST.prototype.peekKeywordLet = function () { return this.next.isKeywordLet(); };
                _ParseAST.prototype.peekDeprecatedKeywordVar = function () { return this.next.isKeywordDeprecatedVar(); };
                _ParseAST.prototype.peekDeprecatedOperatorHash = function () { return this.next.isOperator('#'); };
                _ParseAST.prototype.expectCharacter = function (code) {
                    if (this.optionalCharacter(code))
                        return;
                    this.error("Missing expected " + lang_1.StringWrapper.fromCharCode(code));
                };
                _ParseAST.prototype.optionalOperator = function (op) {
                    if (this.next.isOperator(op)) {
                        this.advance();
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                _ParseAST.prototype.expectOperator = function (operator) {
                    if (this.optionalOperator(operator))
                        return;
                    this.error("Missing expected operator " + operator);
                };
                _ParseAST.prototype.expectIdentifierOrKeyword = function () {
                    var n = this.next;
                    if (!n.isIdentifier() && !n.isKeyword()) {
                        this.error("Unexpected token " + n + ", expected identifier or keyword");
                    }
                    this.advance();
                    return n.toString();
                };
                _ParseAST.prototype.expectIdentifierOrKeywordOrString = function () {
                    var n = this.next;
                    if (!n.isIdentifier() && !n.isKeyword() && !n.isString()) {
                        this.error("Unexpected token " + n + ", expected identifier, keyword, or string");
                    }
                    this.advance();
                    return n.toString();
                };
                _ParseAST.prototype.parseChain = function () {
                    var exprs = [];
                    while (this.index < this.tokens.length) {
                        var expr = this.parsePipe();
                        exprs.push(expr);
                        if (this.optionalCharacter(lexer_1.$SEMICOLON)) {
                            if (!this.parseAction) {
                                this.error("Binding expression cannot contain chained expression");
                            }
                            while (this.optionalCharacter(lexer_1.$SEMICOLON)) {
                            } // read all semicolons
                        }
                        else if (this.index < this.tokens.length) {
                            this.error("Unexpected token '" + this.next + "'");
                        }
                    }
                    if (exprs.length == 0)
                        return new ast_1.EmptyExpr();
                    if (exprs.length == 1)
                        return exprs[0];
                    return new ast_1.Chain(exprs);
                };
                _ParseAST.prototype.parsePipe = function () {
                    var result = this.parseExpression();
                    if (this.optionalOperator("|")) {
                        if (this.parseAction) {
                            this.error("Cannot have a pipe in an action expression");
                        }
                        do {
                            var name = this.expectIdentifierOrKeyword();
                            var args = [];
                            while (this.optionalCharacter(lexer_1.$COLON)) {
                                args.push(this.parseExpression());
                            }
                            result = new ast_1.BindingPipe(result, name, args);
                        } while (this.optionalOperator("|"));
                    }
                    return result;
                };
                _ParseAST.prototype.parseExpression = function () { return this.parseConditional(); };
                _ParseAST.prototype.parseConditional = function () {
                    var start = this.inputIndex;
                    var result = this.parseLogicalOr();
                    if (this.optionalOperator('?')) {
                        var yes = this.parsePipe();
                        if (!this.optionalCharacter(lexer_1.$COLON)) {
                            var end = this.inputIndex;
                            var expression = this.input.substring(start, end);
                            this.error("Conditional expression " + expression + " requires all 3 expressions");
                        }
                        var no = this.parsePipe();
                        return new ast_1.Conditional(result, yes, no);
                    }
                    else {
                        return result;
                    }
                };
                _ParseAST.prototype.parseLogicalOr = function () {
                    // '||'
                    var result = this.parseLogicalAnd();
                    while (this.optionalOperator('||')) {
                        result = new ast_1.Binary('||', result, this.parseLogicalAnd());
                    }
                    return result;
                };
                _ParseAST.prototype.parseLogicalAnd = function () {
                    // '&&'
                    var result = this.parseEquality();
                    while (this.optionalOperator('&&')) {
                        result = new ast_1.Binary('&&', result, this.parseEquality());
                    }
                    return result;
                };
                _ParseAST.prototype.parseEquality = function () {
                    // '==','!=','===','!=='
                    var result = this.parseRelational();
                    while (true) {
                        if (this.optionalOperator('==')) {
                            result = new ast_1.Binary('==', result, this.parseRelational());
                        }
                        else if (this.optionalOperator('===')) {
                            result = new ast_1.Binary('===', result, this.parseRelational());
                        }
                        else if (this.optionalOperator('!=')) {
                            result = new ast_1.Binary('!=', result, this.parseRelational());
                        }
                        else if (this.optionalOperator('!==')) {
                            result = new ast_1.Binary('!==', result, this.parseRelational());
                        }
                        else {
                            return result;
                        }
                    }
                };
                _ParseAST.prototype.parseRelational = function () {
                    // '<', '>', '<=', '>='
                    var result = this.parseAdditive();
                    while (true) {
                        if (this.optionalOperator('<')) {
                            result = new ast_1.Binary('<', result, this.parseAdditive());
                        }
                        else if (this.optionalOperator('>')) {
                            result = new ast_1.Binary('>', result, this.parseAdditive());
                        }
                        else if (this.optionalOperator('<=')) {
                            result = new ast_1.Binary('<=', result, this.parseAdditive());
                        }
                        else if (this.optionalOperator('>=')) {
                            result = new ast_1.Binary('>=', result, this.parseAdditive());
                        }
                        else {
                            return result;
                        }
                    }
                };
                _ParseAST.prototype.parseAdditive = function () {
                    // '+', '-'
                    var result = this.parseMultiplicative();
                    while (true) {
                        if (this.optionalOperator('+')) {
                            result = new ast_1.Binary('+', result, this.parseMultiplicative());
                        }
                        else if (this.optionalOperator('-')) {
                            result = new ast_1.Binary('-', result, this.parseMultiplicative());
                        }
                        else {
                            return result;
                        }
                    }
                };
                _ParseAST.prototype.parseMultiplicative = function () {
                    // '*', '%', '/'
                    var result = this.parsePrefix();
                    while (true) {
                        if (this.optionalOperator('*')) {
                            result = new ast_1.Binary('*', result, this.parsePrefix());
                        }
                        else if (this.optionalOperator('%')) {
                            result = new ast_1.Binary('%', result, this.parsePrefix());
                        }
                        else if (this.optionalOperator('/')) {
                            result = new ast_1.Binary('/', result, this.parsePrefix());
                        }
                        else {
                            return result;
                        }
                    }
                };
                _ParseAST.prototype.parsePrefix = function () {
                    if (this.optionalOperator('+')) {
                        return this.parsePrefix();
                    }
                    else if (this.optionalOperator('-')) {
                        return new ast_1.Binary('-', new ast_1.LiteralPrimitive(0), this.parsePrefix());
                    }
                    else if (this.optionalOperator('!')) {
                        return new ast_1.PrefixNot(this.parsePrefix());
                    }
                    else {
                        return this.parseCallChain();
                    }
                };
                _ParseAST.prototype.parseCallChain = function () {
                    var result = this.parsePrimary();
                    while (true) {
                        if (this.optionalCharacter(lexer_1.$PERIOD)) {
                            result = this.parseAccessMemberOrMethodCall(result, false);
                        }
                        else if (this.optionalOperator('?.')) {
                            result = this.parseAccessMemberOrMethodCall(result, true);
                        }
                        else if (this.optionalCharacter(lexer_1.$LBRACKET)) {
                            var key = this.parsePipe();
                            this.expectCharacter(lexer_1.$RBRACKET);
                            if (this.optionalOperator("=")) {
                                var value = this.parseConditional();
                                result = new ast_1.KeyedWrite(result, key, value);
                            }
                            else {
                                result = new ast_1.KeyedRead(result, key);
                            }
                        }
                        else if (this.optionalCharacter(lexer_1.$LPAREN)) {
                            var args = this.parseCallArguments();
                            this.expectCharacter(lexer_1.$RPAREN);
                            result = new ast_1.FunctionCall(result, args);
                        }
                        else {
                            return result;
                        }
                    }
                };
                _ParseAST.prototype.parsePrimary = function () {
                    if (this.optionalCharacter(lexer_1.$LPAREN)) {
                        var result = this.parsePipe();
                        this.expectCharacter(lexer_1.$RPAREN);
                        return result;
                    }
                    else if (this.next.isKeywordNull() || this.next.isKeywordUndefined()) {
                        this.advance();
                        return new ast_1.LiteralPrimitive(null);
                    }
                    else if (this.next.isKeywordTrue()) {
                        this.advance();
                        return new ast_1.LiteralPrimitive(true);
                    }
                    else if (this.next.isKeywordFalse()) {
                        this.advance();
                        return new ast_1.LiteralPrimitive(false);
                    }
                    else if (this.optionalCharacter(lexer_1.$LBRACKET)) {
                        var elements = this.parseExpressionList(lexer_1.$RBRACKET);
                        this.expectCharacter(lexer_1.$RBRACKET);
                        return new ast_1.LiteralArray(elements);
                    }
                    else if (this.next.isCharacter(lexer_1.$LBRACE)) {
                        return this.parseLiteralMap();
                    }
                    else if (this.next.isIdentifier()) {
                        return this.parseAccessMemberOrMethodCall(_implicitReceiver, false);
                    }
                    else if (this.next.isNumber()) {
                        var value = this.next.toNumber();
                        this.advance();
                        return new ast_1.LiteralPrimitive(value);
                    }
                    else if (this.next.isString()) {
                        var literalValue = this.next.toString();
                        this.advance();
                        return new ast_1.LiteralPrimitive(literalValue);
                    }
                    else if (this.index >= this.tokens.length) {
                        this.error("Unexpected end of expression: " + this.input);
                    }
                    else {
                        this.error("Unexpected token " + this.next);
                    }
                    // error() throws, so we don't reach here.
                    throw new exceptions_1.BaseException("Fell through all cases in parsePrimary");
                };
                _ParseAST.prototype.parseExpressionList = function (terminator) {
                    var result = [];
                    if (!this.next.isCharacter(terminator)) {
                        do {
                            result.push(this.parsePipe());
                        } while (this.optionalCharacter(lexer_1.$COMMA));
                    }
                    return result;
                };
                _ParseAST.prototype.parseLiteralMap = function () {
                    var keys = [];
                    var values = [];
                    this.expectCharacter(lexer_1.$LBRACE);
                    if (!this.optionalCharacter(lexer_1.$RBRACE)) {
                        do {
                            var key = this.expectIdentifierOrKeywordOrString();
                            keys.push(key);
                            this.expectCharacter(lexer_1.$COLON);
                            values.push(this.parsePipe());
                        } while (this.optionalCharacter(lexer_1.$COMMA));
                        this.expectCharacter(lexer_1.$RBRACE);
                    }
                    return new ast_1.LiteralMap(keys, values);
                };
                _ParseAST.prototype.parseAccessMemberOrMethodCall = function (receiver, isSafe) {
                    if (isSafe === void 0) { isSafe = false; }
                    var id = this.expectIdentifierOrKeyword();
                    if (this.optionalCharacter(lexer_1.$LPAREN)) {
                        var args = this.parseCallArguments();
                        this.expectCharacter(lexer_1.$RPAREN);
                        return isSafe ? new ast_1.SafeMethodCall(receiver, id, args) : new ast_1.MethodCall(receiver, id, args);
                    }
                    else {
                        if (isSafe) {
                            if (this.optionalOperator("=")) {
                                this.error("The '?.' operator cannot be used in the assignment");
                            }
                            else {
                                return new ast_1.SafePropertyRead(receiver, id);
                            }
                        }
                        else {
                            if (this.optionalOperator("=")) {
                                if (!this.parseAction) {
                                    this.error("Bindings cannot contain assignments");
                                }
                                var value = this.parseConditional();
                                return new ast_1.PropertyWrite(receiver, id, value);
                            }
                            else {
                                return new ast_1.PropertyRead(receiver, id);
                            }
                        }
                    }
                    return null;
                };
                _ParseAST.prototype.parseCallArguments = function () {
                    if (this.next.isCharacter(lexer_1.$RPAREN))
                        return [];
                    var positionals = [];
                    do {
                        positionals.push(this.parsePipe());
                    } while (this.optionalCharacter(lexer_1.$COMMA));
                    return positionals;
                };
                _ParseAST.prototype.parseBlockContent = function () {
                    if (!this.parseAction) {
                        this.error("Binding expression cannot contain chained expression");
                    }
                    var exprs = [];
                    while (this.index < this.tokens.length && !this.next.isCharacter(lexer_1.$RBRACE)) {
                        var expr = this.parseExpression();
                        exprs.push(expr);
                        if (this.optionalCharacter(lexer_1.$SEMICOLON)) {
                            while (this.optionalCharacter(lexer_1.$SEMICOLON)) {
                            } // read all semicolons
                        }
                    }
                    if (exprs.length == 0)
                        return new ast_1.EmptyExpr();
                    if (exprs.length == 1)
                        return exprs[0];
                    return new ast_1.Chain(exprs);
                };
                /**
                 * An identifier, a keyword, a string with an optional `-` inbetween.
                 */
                _ParseAST.prototype.expectTemplateBindingKey = function () {
                    var result = '';
                    var operatorFound = false;
                    do {
                        result += this.expectIdentifierOrKeywordOrString();
                        operatorFound = this.optionalOperator('-');
                        if (operatorFound) {
                            result += '-';
                        }
                    } while (operatorFound);
                    return result.toString();
                };
                _ParseAST.prototype.parseTemplateBindings = function () {
                    var bindings = [];
                    var prefix = null;
                    var warnings = [];
                    while (this.index < this.tokens.length) {
                        var keyIsVar = this.peekKeywordLet();
                        if (!keyIsVar && this.peekDeprecatedKeywordVar()) {
                            keyIsVar = true;
                            warnings.push("\"var\" inside of expressions is deprecated. Use \"let\" instead!");
                        }
                        if (!keyIsVar && this.peekDeprecatedOperatorHash()) {
                            keyIsVar = true;
                            warnings.push("\"#\" inside of expressions is deprecated. Use \"let\" instead!");
                        }
                        if (keyIsVar) {
                            this.advance();
                        }
                        var key = this.expectTemplateBindingKey();
                        if (!keyIsVar) {
                            if (prefix == null) {
                                prefix = key;
                            }
                            else {
                                key = prefix + key[0].toUpperCase() + key.substring(1);
                            }
                        }
                        this.optionalCharacter(lexer_1.$COLON);
                        var name = null;
                        var expression = null;
                        if (keyIsVar) {
                            if (this.optionalOperator("=")) {
                                name = this.expectTemplateBindingKey();
                            }
                            else {
                                name = '\$implicit';
                            }
                        }
                        else if (this.next !== lexer_1.EOF && !this.peekKeywordLet() && !this.peekDeprecatedKeywordVar() &&
                            !this.peekDeprecatedOperatorHash()) {
                            var start = this.inputIndex;
                            var ast = this.parsePipe();
                            var source = this.input.substring(start, this.inputIndex);
                            expression = new ast_1.ASTWithSource(ast, source, this.location);
                        }
                        bindings.push(new ast_1.TemplateBinding(key, keyIsVar, name, expression));
                        if (!this.optionalCharacter(lexer_1.$SEMICOLON)) {
                            this.optionalCharacter(lexer_1.$COMMA);
                        }
                    }
                    return new TemplateBindingParseResult(bindings, warnings);
                };
                _ParseAST.prototype.error = function (message, index) {
                    if (index === void 0) { index = null; }
                    if (lang_1.isBlank(index))
                        index = this.index;
                    var location = (index < this.tokens.length) ? "at column " + (this.tokens[index].index + 1) + " in" :
                        "at the end of the expression";
                    throw new ParseException(message, this.input, location, this.location);
                };
                return _ParseAST;
            }());
            exports_1("_ParseAST", _ParseAST);
            SimpleExpressionChecker = (function () {
                function SimpleExpressionChecker() {
                    this.simple = true;
                }
                SimpleExpressionChecker.check = function (ast) {
                    var s = new SimpleExpressionChecker();
                    ast.visit(s);
                    return s.simple;
                };
                SimpleExpressionChecker.prototype.visitImplicitReceiver = function (ast, context) { };
                SimpleExpressionChecker.prototype.visitInterpolation = function (ast, context) { this.simple = false; };
                SimpleExpressionChecker.prototype.visitLiteralPrimitive = function (ast, context) { };
                SimpleExpressionChecker.prototype.visitPropertyRead = function (ast, context) { };
                SimpleExpressionChecker.prototype.visitPropertyWrite = function (ast, context) { this.simple = false; };
                SimpleExpressionChecker.prototype.visitSafePropertyRead = function (ast, context) { this.simple = false; };
                SimpleExpressionChecker.prototype.visitMethodCall = function (ast, context) { this.simple = false; };
                SimpleExpressionChecker.prototype.visitSafeMethodCall = function (ast, context) { this.simple = false; };
                SimpleExpressionChecker.prototype.visitFunctionCall = function (ast, context) { this.simple = false; };
                SimpleExpressionChecker.prototype.visitLiteralArray = function (ast, context) { this.visitAll(ast.expressions); };
                SimpleExpressionChecker.prototype.visitLiteralMap = function (ast, context) { this.visitAll(ast.values); };
                SimpleExpressionChecker.prototype.visitBinary = function (ast, context) { this.simple = false; };
                SimpleExpressionChecker.prototype.visitPrefixNot = function (ast, context) { this.simple = false; };
                SimpleExpressionChecker.prototype.visitConditional = function (ast, context) { this.simple = false; };
                SimpleExpressionChecker.prototype.visitPipe = function (ast, context) { this.simple = false; };
                SimpleExpressionChecker.prototype.visitKeyedRead = function (ast, context) { this.simple = false; };
                SimpleExpressionChecker.prototype.visitKeyedWrite = function (ast, context) { this.simple = false; };
                SimpleExpressionChecker.prototype.visitAll = function (asts) {
                    var res = collection_1.ListWrapper.createFixedSize(asts.length);
                    for (var i = 0; i < asts.length; ++i) {
                        res[i] = asts[i].visit(this);
                    }
                    return res;
                };
                SimpleExpressionChecker.prototype.visitChain = function (ast, context) { this.simple = false; };
                SimpleExpressionChecker.prototype.visitQuote = function (ast, context) { this.simple = false; };
                return SimpleExpressionChecker;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9leHByZXNzaW9uX3BhcnNlci9wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBa0RJLGlCQUFpQixFQUVqQixvQkFBb0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFGcEIsaUJBQWlCLEdBQUcsSUFBSSxzQkFBZ0IsRUFBRSxDQUFDO1lBQy9DLG9GQUFvRjtZQUNoRixvQkFBb0IsR0FBRyxxQkFBcUIsQ0FBQztZQUVqRDtnQkFBNkIsa0NBQWE7Z0JBQ3hDLHdCQUFZLE9BQWUsRUFBRSxLQUFhLEVBQUUsV0FBbUIsRUFBRSxXQUFpQjtvQkFDaEYsa0JBQU0sbUJBQWlCLE9BQU8sU0FBSSxXQUFXLFVBQUssS0FBSyxhQUFRLFdBQWEsQ0FBQyxDQUFDO2dCQUNoRixDQUFDO2dCQUNILHFCQUFDO1lBQUQsQ0FKQSxBQUlDLENBSjRCLDBCQUFhLEdBSXpDO1lBRUQ7Z0JBQ0UsNEJBQW1CLE9BQWlCLEVBQVMsV0FBcUI7b0JBQS9DLFlBQU8sR0FBUCxPQUFPLENBQVU7b0JBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQVU7Z0JBQUcsQ0FBQztnQkFDeEUseUJBQUM7WUFBRCxDQUZBLEFBRUMsSUFBQTtZQUZELG1EQUVDLENBQUE7WUFFRDtnQkFDRSxvQ0FBbUIsZ0JBQW1DLEVBQVMsUUFBa0I7b0JBQTlELHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBbUI7b0JBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtnQkFBRyxDQUFDO2dCQUN2RixpQ0FBQztZQUFELENBRkEsQUFFQyxJQUFBO1lBRkQsbUVBRUMsQ0FBQTtZQUdEO2dCQUNFLGdCQUFZLGdCQUFnQixDQUNULE1BQWE7b0JBQWIsV0FBTSxHQUFOLE1BQU0sQ0FBTztnQkFBRyxDQUFDO2dCQUVwQyw0QkFBVyxHQUFYLFVBQVksS0FBYSxFQUFFLFFBQWE7b0JBQ3RDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQzVDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDOUQsSUFBSSxHQUFHLEdBQUcsSUFBSSxTQUFTLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ3BFLE1BQU0sQ0FBQyxJQUFJLG1CQUFhLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDakQsQ0FBQztnQkFFRCw2QkFBWSxHQUFaLFVBQWEsS0FBYSxFQUFFLFFBQWE7b0JBQ3ZDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ2pELE1BQU0sQ0FBQyxJQUFJLG1CQUFhLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDakQsQ0FBQztnQkFFRCxtQ0FBa0IsR0FBbEIsVUFBbUIsS0FBYSxFQUFFLFFBQWdCO29CQUNoRCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUNqRCxFQUFFLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3hDLE1BQU0sSUFBSSxjQUFjLENBQ3BCLHFFQUFxRSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDOUYsQ0FBQztvQkFDRCxNQUFNLENBQUMsSUFBSSxtQkFBYSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ2pELENBQUM7Z0JBRU8saUNBQWdCLEdBQXhCLFVBQXlCLEtBQWEsRUFBRSxRQUFnQjtvQkFDdEQsNkVBQTZFO29CQUM3RSxvRUFBb0U7b0JBQ3BFLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUU5QyxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDckIsTUFBTSxDQUFDLEtBQUssQ0FBQztvQkFDZixDQUFDO29CQUVELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQzVDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDOUQsTUFBTSxDQUFDLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNwRSxDQUFDO2dCQUVPLDRCQUFXLEdBQW5CLFVBQW9CLEtBQWEsRUFBRSxRQUFhO29CQUM5QyxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDaEMsSUFBSSxvQkFBb0IsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM5QyxFQUFFLENBQUMsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUM1QyxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUM3RCxFQUFFLENBQUMsQ0FBQyxDQUFDLG9CQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDdkMsSUFBSSx1QkFBdUIsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUN4RSxNQUFNLENBQUMsSUFBSSxXQUFLLENBQUMsTUFBTSxFQUFFLHVCQUF1QixFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUM5RCxDQUFDO2dCQUVELHNDQUFxQixHQUFyQixVQUFzQixLQUFhLEVBQUUsUUFBYTtvQkFDaEQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3pDLE1BQU0sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2dCQUMvRSxDQUFDO2dCQUVELG1DQUFrQixHQUFsQixVQUFtQixLQUFhLEVBQUUsUUFBYTtvQkFDN0MsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDckQsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQzt3QkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUUvQixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7b0JBRXJCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQzt3QkFDbEQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDN0UsSUFBSSxHQUFHLEdBQUcsSUFBSSxTQUFTLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7d0JBQ3JFLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3hCLENBQUM7b0JBRUQsTUFBTSxDQUFDLElBQUksbUJBQWEsQ0FBQyxJQUFJLG1CQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQzNGLENBQUM7Z0JBRUQsbUNBQWtCLEdBQWxCLFVBQW1CLEtBQWEsRUFBRSxRQUFnQjtvQkFDaEQsSUFBSSxLQUFLLEdBQUcsb0JBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLG9CQUFvQixDQUFDLENBQUM7b0JBQzdELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDZCxDQUFDO29CQUNELElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztvQkFDakIsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO29CQUVyQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDdEMsSUFBSSxJQUFJLEdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM1QixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ2hCLGVBQWU7NEJBQ2YsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDckIsQ0FBQzt3QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNsQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN6QixDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLE1BQU0sSUFBSSxjQUFjLENBQUMsMkRBQTJELEVBQUUsS0FBSyxFQUNsRSxlQUFhLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLFFBQUssRUFDOUQsUUFBUSxDQUFDLENBQUM7d0JBQ3JDLENBQUM7b0JBQ0gsQ0FBQztvQkFDRCxNQUFNLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQ3RELENBQUM7Z0JBRUQscUNBQW9CLEdBQXBCLFVBQXFCLEtBQWEsRUFBRSxRQUFhO29CQUMvQyxNQUFNLENBQUMsSUFBSSxtQkFBYSxDQUFDLElBQUksc0JBQWdCLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUN6RSxDQUFDO2dCQUVPLCtCQUFjLEdBQXRCLFVBQXVCLEtBQWE7b0JBQ2xDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2xDLE1BQU0sQ0FBQyxnQkFBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQztnQkFDN0QsQ0FBQztnQkFFTyw4QkFBYSxHQUFyQixVQUFzQixLQUFhO29CQUNqQyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQ3RCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDMUMsSUFBSSxJQUFJLEdBQUcsb0JBQWEsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUM5QyxJQUFJLFFBQVEsR0FBRyxvQkFBYSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUV0RCxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssY0FBTSxJQUFJLFFBQVEsSUFBSSxjQUFNLElBQUksY0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDOzRCQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7d0JBRTNFLEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUN4QixVQUFVLEdBQUcsSUFBSSxDQUFDO3dCQUNwQixDQUFDO3dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsVUFBVSxDQUFDLElBQUksZUFBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDaEQsVUFBVSxHQUFHLElBQUksQ0FBQzt3QkFDcEIsQ0FBQztvQkFDSCxDQUFDO29CQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQztnQkFFTyxzQ0FBcUIsR0FBN0IsVUFBOEIsS0FBYSxFQUFFLFFBQWE7b0JBQ3hELElBQUksS0FBSyxHQUFHLG9CQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO29CQUM3RCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3JCLE1BQU0sSUFBSSxjQUFjLENBQUMsd0RBQXdELEVBQUUsS0FBSyxFQUMvRCxlQUFhLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLFFBQUssRUFDOUQsUUFBUSxDQUFDLENBQUM7b0JBQ3JDLENBQUM7Z0JBQ0gsQ0FBQztnQkFFTyw4Q0FBNkIsR0FBckMsVUFBc0MsS0FBZSxFQUFFLFlBQW9CO29CQUN6RSxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7b0JBQ3JCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQ3RDLFdBQVcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQUksQ0FBQztvQkFDNUQsQ0FBQztvQkFFRCxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztnQkFDNUIsQ0FBQztnQkF4SUg7b0JBQUMsdUJBQVUsRUFBRTs7MEJBQUE7Z0JBeUliLGFBQUM7WUFBRCxDQXhJQSxBQXdJQyxJQUFBO1lBeElELDJCQXdJQyxDQUFBO1lBRUQ7Z0JBRUUsbUJBQW1CLEtBQWEsRUFBUyxRQUFhLEVBQVMsTUFBYSxFQUN6RCxXQUFvQjtvQkFEcEIsVUFBSyxHQUFMLEtBQUssQ0FBUTtvQkFBUyxhQUFRLEdBQVIsUUFBUSxDQUFLO29CQUFTLFdBQU0sR0FBTixNQUFNLENBQU87b0JBQ3pELGdCQUFXLEdBQVgsV0FBVyxDQUFTO29CQUZ2QyxVQUFLLEdBQVcsQ0FBQyxDQUFDO2dCQUV3QixDQUFDO2dCQUUzQyx3QkFBSSxHQUFKLFVBQUssTUFBYztvQkFDakIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7b0JBQzVCLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFHLENBQUM7Z0JBQ3ZELENBQUM7Z0JBRUQsc0JBQUksMkJBQUk7eUJBQVIsY0FBb0IsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBRTFDLHNCQUFJLGlDQUFVO3lCQUFkO3dCQUNFLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztvQkFDakYsQ0FBQzs7O21CQUFBO2dCQUVELDJCQUFPLEdBQVAsY0FBWSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUUzQixxQ0FBaUIsR0FBakIsVUFBa0IsSUFBWTtvQkFDNUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNoQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDZCxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLE1BQU0sQ0FBQyxLQUFLLENBQUM7b0JBQ2YsQ0FBQztnQkFDSCxDQUFDO2dCQUVELGtDQUFjLEdBQWQsY0FBNEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUU5RCw0Q0FBd0IsR0FBeEIsY0FBc0MsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRWxGLDhDQUEwQixHQUExQixjQUF3QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUUzRSxtQ0FBZSxHQUFmLFVBQWdCLElBQVk7b0JBQzFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFBQyxNQUFNLENBQUM7b0JBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsc0JBQW9CLG9CQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBRyxDQUFDLENBQUM7Z0JBQ3JFLENBQUM7Z0JBR0Qsb0NBQWdCLEdBQWhCLFVBQWlCLEVBQVU7b0JBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDN0IsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ2QsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixNQUFNLENBQUMsS0FBSyxDQUFDO29CQUNmLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCxrQ0FBYyxHQUFkLFVBQWUsUUFBZ0I7b0JBQzdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFBQyxNQUFNLENBQUM7b0JBQzVDLElBQUksQ0FBQyxLQUFLLENBQUMsK0JBQTZCLFFBQVUsQ0FBQyxDQUFDO2dCQUN0RCxDQUFDO2dCQUVELDZDQUF5QixHQUF6QjtvQkFDRSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNsQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsc0JBQW9CLENBQUMscUNBQWtDLENBQUMsQ0FBQztvQkFDdEUsQ0FBQztvQkFDRCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ2YsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQztnQkFFRCxxREFBaUMsR0FBakM7b0JBQ0UsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDbEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUN6RCxJQUFJLENBQUMsS0FBSyxDQUFDLHNCQUFvQixDQUFDLDhDQUEyQyxDQUFDLENBQUM7b0JBQy9FLENBQUM7b0JBQ0QsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNmLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3RCLENBQUM7Z0JBRUQsOEJBQVUsR0FBVjtvQkFDRSxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7b0JBQ2YsT0FBTyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7d0JBQ3ZDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzt3QkFDNUIsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFFakIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3ZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0NBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsc0RBQXNELENBQUMsQ0FBQzs0QkFDckUsQ0FBQzs0QkFDRCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBVSxDQUFDLEVBQUUsQ0FBQzs0QkFDNUMsQ0FBQyxDQUFFLHNCQUFzQjt3QkFDM0IsQ0FBQzt3QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7NEJBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsdUJBQXFCLElBQUksQ0FBQyxJQUFJLE1BQUcsQ0FBQyxDQUFDO3dCQUNoRCxDQUFDO29CQUNILENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7d0JBQUMsTUFBTSxDQUFDLElBQUksZUFBUyxFQUFFLENBQUM7b0JBQzlDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZDLE1BQU0sQ0FBQyxJQUFJLFdBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDMUIsQ0FBQztnQkFFRCw2QkFBUyxHQUFUO29CQUNFLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztvQkFDcEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7NEJBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQzt3QkFDM0QsQ0FBQzt3QkFFRCxHQUFHLENBQUM7NEJBQ0YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7NEJBQzVDLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQzs0QkFDZCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFNLENBQUMsRUFBRSxDQUFDO2dDQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDOzRCQUNwQyxDQUFDOzRCQUNELE1BQU0sR0FBRyxJQUFJLGlCQUFXLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFDL0MsQ0FBQyxRQUFRLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDdkMsQ0FBQztvQkFFRCxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNoQixDQUFDO2dCQUVELG1DQUFlLEdBQWYsY0FBeUIsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFMUQsb0NBQWdCLEdBQWhCO29CQUNFLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7b0JBQzVCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFFbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDL0IsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO3dCQUMzQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3BDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7NEJBQzFCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQzs0QkFDbEQsSUFBSSxDQUFDLEtBQUssQ0FBQyw0QkFBMEIsVUFBVSxnQ0FBNkIsQ0FBQyxDQUFDO3dCQUNoRixDQUFDO3dCQUNELElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzt3QkFDMUIsTUFBTSxDQUFDLElBQUksaUJBQVcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUMxQyxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLE1BQU0sQ0FBQyxNQUFNLENBQUM7b0JBQ2hCLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCxrQ0FBYyxHQUFkO29CQUNFLE9BQU87b0JBQ1AsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO29CQUNwQyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO3dCQUNuQyxNQUFNLEdBQUcsSUFBSSxZQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztvQkFDNUQsQ0FBQztvQkFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNoQixDQUFDO2dCQUVELG1DQUFlLEdBQWY7b0JBQ0UsT0FBTztvQkFDUCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ2xDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7d0JBQ25DLE1BQU0sR0FBRyxJQUFJLFlBQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO29CQUMxRCxDQUFDO29CQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQ2hCLENBQUM7Z0JBRUQsaUNBQWEsR0FBYjtvQkFDRSx3QkFBd0I7b0JBQ3hCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztvQkFDcEMsT0FBTyxJQUFJLEVBQUUsQ0FBQzt3QkFDWixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNoQyxNQUFNLEdBQUcsSUFBSSxZQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQzt3QkFDNUQsQ0FBQzt3QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDeEMsTUFBTSxHQUFHLElBQUksWUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7d0JBQzdELENBQUM7d0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3ZDLE1BQU0sR0FBRyxJQUFJLFlBQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO3dCQUM1RCxDQUFDO3dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN4QyxNQUFNLEdBQUcsSUFBSSxZQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQzt3QkFDN0QsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDTixNQUFNLENBQUMsTUFBTSxDQUFDO3dCQUNoQixDQUFDO29CQUNILENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCxtQ0FBZSxHQUFmO29CQUNFLHVCQUF1QjtvQkFDdkIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNsQyxPQUFPLElBQUksRUFBRSxDQUFDO3dCQUNaLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQy9CLE1BQU0sR0FBRyxJQUFJLFlBQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO3dCQUN6RCxDQUFDO3dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN0QyxNQUFNLEdBQUcsSUFBSSxZQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQzt3QkFDekQsQ0FBQzt3QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDdkMsTUFBTSxHQUFHLElBQUksWUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7d0JBQzFELENBQUM7d0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3ZDLE1BQU0sR0FBRyxJQUFJLFlBQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO3dCQUMxRCxDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLE1BQU0sQ0FBQyxNQUFNLENBQUM7d0JBQ2hCLENBQUM7b0JBQ0gsQ0FBQztnQkFDSCxDQUFDO2dCQUVELGlDQUFhLEdBQWI7b0JBQ0UsV0FBVztvQkFDWCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztvQkFDeEMsT0FBTyxJQUFJLEVBQUUsQ0FBQzt3QkFDWixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUMvQixNQUFNLEdBQUcsSUFBSSxZQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO3dCQUMvRCxDQUFDO3dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN0QyxNQUFNLEdBQUcsSUFBSSxZQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO3dCQUMvRCxDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLE1BQU0sQ0FBQyxNQUFNLENBQUM7d0JBQ2hCLENBQUM7b0JBQ0gsQ0FBQztnQkFDSCxDQUFDO2dCQUVELHVDQUFtQixHQUFuQjtvQkFDRSxnQkFBZ0I7b0JBQ2hCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDaEMsT0FBTyxJQUFJLEVBQUUsQ0FBQzt3QkFDWixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUMvQixNQUFNLEdBQUcsSUFBSSxZQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzt3QkFDdkQsQ0FBQzt3QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDdEMsTUFBTSxHQUFHLElBQUksWUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7d0JBQ3ZELENBQUM7d0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3RDLE1BQU0sR0FBRyxJQUFJLFlBQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO3dCQUN2RCxDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLE1BQU0sQ0FBQyxNQUFNLENBQUM7d0JBQ2hCLENBQUM7b0JBQ0gsQ0FBQztnQkFDSCxDQUFDO2dCQUVELCtCQUFXLEdBQVg7b0JBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDNUIsQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdEMsTUFBTSxDQUFDLElBQUksWUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLHNCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO29CQUN0RSxDQUFDO29CQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN0QyxNQUFNLENBQUMsSUFBSSxlQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7b0JBQzNDLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDL0IsQ0FBQztnQkFDSCxDQUFDO2dCQUVELGtDQUFjLEdBQWQ7b0JBQ0UsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUNqQyxPQUFPLElBQUksRUFBRSxDQUFDO3dCQUNaLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3BDLE1BQU0sR0FBRyxJQUFJLENBQUMsNkJBQTZCLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO3dCQUU3RCxDQUFDO3dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN2QyxNQUFNLEdBQUcsSUFBSSxDQUFDLDZCQUE2QixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFFNUQsQ0FBQzt3QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzdDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs0QkFDM0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBUyxDQUFDLENBQUM7NEJBQ2hDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQy9CLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dDQUNwQyxNQUFNLEdBQUcsSUFBSSxnQkFBVSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7NEJBQzlDLENBQUM7NEJBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ04sTUFBTSxHQUFHLElBQUksZUFBUyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQzs0QkFDdEMsQ0FBQzt3QkFFSCxDQUFDO3dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUMzQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzs0QkFDckMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFPLENBQUMsQ0FBQzs0QkFDOUIsTUFBTSxHQUFHLElBQUksa0JBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBRTFDLENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ04sTUFBTSxDQUFDLE1BQU0sQ0FBQzt3QkFDaEIsQ0FBQztvQkFDSCxDQUFDO2dCQUNILENBQUM7Z0JBRUQsZ0NBQVksR0FBWjtvQkFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNwQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7d0JBQzlCLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBTyxDQUFDLENBQUM7d0JBQzlCLE1BQU0sQ0FBQyxNQUFNLENBQUM7b0JBQ2hCLENBQUM7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDdkUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNmLE1BQU0sQ0FBQyxJQUFJLHNCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO29CQUVwQyxDQUFDO29CQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDckMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNmLE1BQU0sQ0FBQyxJQUFJLHNCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO29CQUVwQyxDQUFDO29CQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDdEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNmLE1BQU0sQ0FBQyxJQUFJLHNCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUVyQyxDQUFDO29CQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDN0MsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGlCQUFTLENBQUMsQ0FBQzt3QkFDbkQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBUyxDQUFDLENBQUM7d0JBQ2hDLE1BQU0sQ0FBQyxJQUFJLGtCQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRXBDLENBQUM7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztvQkFFaEMsQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBRXRFLENBQUM7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUNoQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUNqQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ2YsTUFBTSxDQUFDLElBQUksc0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRXJDLENBQUM7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUNoQyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUN4QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ2YsTUFBTSxDQUFDLElBQUksc0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBRTVDLENBQUM7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUM1QyxJQUFJLENBQUMsS0FBSyxDQUFDLG1DQUFpQyxJQUFJLENBQUMsS0FBTyxDQUFDLENBQUM7b0JBRTVELENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBb0IsSUFBSSxDQUFDLElBQU0sQ0FBQyxDQUFDO29CQUM5QyxDQUFDO29CQUNELDBDQUEwQztvQkFDMUMsTUFBTSxJQUFJLDBCQUFhLENBQUMsd0NBQXdDLENBQUMsQ0FBQztnQkFDcEUsQ0FBQztnQkFFRCx1Q0FBbUIsR0FBbkIsVUFBb0IsVUFBa0I7b0JBQ3BDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztvQkFDaEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3ZDLEdBQUcsQ0FBQzs0QkFDRixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO3dCQUNoQyxDQUFDLFFBQVEsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQU0sQ0FBQyxFQUFFO29CQUMzQyxDQUFDO29CQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQ2hCLENBQUM7Z0JBRUQsbUNBQWUsR0FBZjtvQkFDRSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7b0JBQ2QsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO29CQUNoQixJQUFJLENBQUMsZUFBZSxDQUFDLGVBQU8sQ0FBQyxDQUFDO29CQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3JDLEdBQUcsQ0FBQzs0QkFDRixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsaUNBQWlDLEVBQUUsQ0FBQzs0QkFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDZixJQUFJLENBQUMsZUFBZSxDQUFDLGNBQU0sQ0FBQyxDQUFDOzRCQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO3dCQUNoQyxDQUFDLFFBQVEsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQU0sQ0FBQyxFQUFFO3dCQUN6QyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQU8sQ0FBQyxDQUFDO29CQUNoQyxDQUFDO29CQUNELE1BQU0sQ0FBQyxJQUFJLGdCQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QyxDQUFDO2dCQUVELGlEQUE2QixHQUE3QixVQUE4QixRQUFhLEVBQUUsTUFBdUI7b0JBQXZCLHNCQUF1QixHQUF2QixjQUF1QjtvQkFDbEUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7b0JBRTFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO3dCQUNyQyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQU8sQ0FBQyxDQUFDO3dCQUM5QixNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksb0JBQWMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLElBQUksZ0JBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUU5RixDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7NEJBQ1gsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxvREFBb0QsQ0FBQyxDQUFDOzRCQUNuRSxDQUFDOzRCQUFDLElBQUksQ0FBQyxDQUFDO2dDQUNOLE1BQU0sQ0FBQyxJQUFJLHNCQUFnQixDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQzs0QkFDNUMsQ0FBQzt3QkFDSCxDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQy9CLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0NBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztnQ0FDcEQsQ0FBQztnQ0FFRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQ0FDcEMsTUFBTSxDQUFDLElBQUksbUJBQWEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDOzRCQUNoRCxDQUFDOzRCQUFDLElBQUksQ0FBQyxDQUFDO2dDQUNOLE1BQU0sQ0FBQyxJQUFJLGtCQUFZLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDOzRCQUN4QyxDQUFDO3dCQUNILENBQUM7b0JBQ0gsQ0FBQztvQkFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNkLENBQUM7Z0JBRUQsc0NBQWtCLEdBQWxCO29CQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQU8sQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7b0JBQzlDLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztvQkFDckIsR0FBRyxDQUFDO3dCQUNGLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7b0JBQ3JDLENBQUMsUUFBUSxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBTSxDQUFDLEVBQUU7b0JBQ3pDLE1BQU0sQ0FBQyxXQUFXLENBQUM7Z0JBQ3JCLENBQUM7Z0JBRUQscUNBQWlCLEdBQWpCO29CQUNFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7d0JBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsc0RBQXNELENBQUMsQ0FBQztvQkFDckUsQ0FBQztvQkFDRCxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7b0JBQ2YsT0FBTyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBTyxDQUFDLEVBQUUsQ0FBQzt3QkFDMUUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO3dCQUNsQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUVqQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDdkMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQVUsQ0FBQyxFQUFFLENBQUM7NEJBQzVDLENBQUMsQ0FBRSxzQkFBc0I7d0JBQzNCLENBQUM7b0JBQ0gsQ0FBQztvQkFDRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQzt3QkFBQyxNQUFNLENBQUMsSUFBSSxlQUFTLEVBQUUsQ0FBQztvQkFDOUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7d0JBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFdkMsTUFBTSxDQUFDLElBQUksV0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMxQixDQUFDO2dCQUdEOzttQkFFRztnQkFDSCw0Q0FBd0IsR0FBeEI7b0JBQ0UsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO29CQUNoQixJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUM7b0JBQzFCLEdBQUcsQ0FBQzt3QkFDRixNQUFNLElBQUksSUFBSSxDQUFDLGlDQUFpQyxFQUFFLENBQUM7d0JBQ25ELGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQzNDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7NEJBQ2xCLE1BQU0sSUFBSSxHQUFHLENBQUM7d0JBQ2hCLENBQUM7b0JBQ0gsQ0FBQyxRQUFRLGFBQWEsRUFBRTtvQkFFeEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDM0IsQ0FBQztnQkFFRCx5Q0FBcUIsR0FBckI7b0JBQ0UsSUFBSSxRQUFRLEdBQXNCLEVBQUUsQ0FBQztvQkFDckMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO29CQUNsQixJQUFJLFFBQVEsR0FBYSxFQUFFLENBQUM7b0JBQzVCLE9BQU8sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO3dCQUN2QyxJQUFJLFFBQVEsR0FBWSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7d0JBQzlDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLENBQUMsQ0FBQzs0QkFDakQsUUFBUSxHQUFHLElBQUksQ0FBQzs0QkFDaEIsUUFBUSxDQUFDLElBQUksQ0FBQyxtRUFBK0QsQ0FBQyxDQUFDO3dCQUNqRixDQUFDO3dCQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDLENBQUMsQ0FBQzs0QkFDbkQsUUFBUSxHQUFHLElBQUksQ0FBQzs0QkFDaEIsUUFBUSxDQUFDLElBQUksQ0FBQyxpRUFBNkQsQ0FBQyxDQUFDO3dCQUMvRSxDQUFDO3dCQUNELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7NEJBQ2IsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNqQixDQUFDO3dCQUNELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO3dCQUMxQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7NEJBQ2QsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0NBQ25CLE1BQU0sR0FBRyxHQUFHLENBQUM7NEJBQ2YsQ0FBQzs0QkFBQyxJQUFJLENBQUMsQ0FBQztnQ0FDTixHQUFHLEdBQUcsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN6RCxDQUFDO3dCQUNILENBQUM7d0JBQ0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQU0sQ0FBQyxDQUFDO3dCQUMvQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7d0JBQ2hCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQzt3QkFDdEIsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs0QkFDYixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUMvQixJQUFJLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7NEJBQ3pDLENBQUM7NEJBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ04sSUFBSSxHQUFHLFlBQVksQ0FBQzs0QkFDdEIsQ0FBQzt3QkFDSCxDQUFDO3dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRTs0QkFDL0UsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQzlDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7NEJBQzVCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs0QkFDM0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzs0QkFDMUQsVUFBVSxHQUFHLElBQUksbUJBQWEsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDN0QsQ0FBQzt3QkFDRCxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUkscUJBQWUsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO3dCQUNwRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN4QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBTSxDQUFDLENBQUM7d0JBQ2pDLENBQUM7b0JBQ0gsQ0FBQztvQkFDRCxNQUFNLENBQUMsSUFBSSwwQkFBMEIsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQzVELENBQUM7Z0JBRUQseUJBQUssR0FBTCxVQUFNLE9BQWUsRUFBRSxLQUFvQjtvQkFBcEIscUJBQW9CLEdBQXBCLFlBQW9CO29CQUN6QyxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7b0JBRXZDLElBQUksUUFBUSxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsZ0JBQWEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxTQUFLO3dCQUM5Qyw4QkFBOEIsQ0FBQztvQkFFN0UsTUFBTSxJQUFJLGNBQWMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN6RSxDQUFDO2dCQUNILGdCQUFDO1lBQUQsQ0FwZEEsQUFvZEMsSUFBQTtZQXBkRCxpQ0FvZEMsQ0FBQTtZQUVEO2dCQUFBO29CQU9FLFdBQU0sR0FBRyxJQUFJLENBQUM7Z0JBK0NoQixDQUFDO2dCQXJEUSw2QkFBSyxHQUFaLFVBQWEsR0FBUTtvQkFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSx1QkFBdUIsRUFBRSxDQUFDO29CQUN0QyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNiLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO2dCQUNsQixDQUFDO2dCQUlELHVEQUFxQixHQUFyQixVQUFzQixHQUFxQixFQUFFLE9BQVksSUFBRyxDQUFDO2dCQUU3RCxvREFBa0IsR0FBbEIsVUFBbUIsR0FBa0IsRUFBRSxPQUFZLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUU3RSx1REFBcUIsR0FBckIsVUFBc0IsR0FBcUIsRUFBRSxPQUFZLElBQUcsQ0FBQztnQkFFN0QsbURBQWlCLEdBQWpCLFVBQWtCLEdBQWlCLEVBQUUsT0FBWSxJQUFHLENBQUM7Z0JBRXJELG9EQUFrQixHQUFsQixVQUFtQixHQUFrQixFQUFFLE9BQVksSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBRTdFLHVEQUFxQixHQUFyQixVQUFzQixHQUFxQixFQUFFLE9BQVksSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBRW5GLGlEQUFlLEdBQWYsVUFBZ0IsR0FBZSxFQUFFLE9BQVksSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBRXZFLHFEQUFtQixHQUFuQixVQUFvQixHQUFtQixFQUFFLE9BQVksSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBRS9FLG1EQUFpQixHQUFqQixVQUFrQixHQUFpQixFQUFFLE9BQVksSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBRTNFLG1EQUFpQixHQUFqQixVQUFrQixHQUFpQixFQUFFLE9BQVksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXRGLGlEQUFlLEdBQWYsVUFBZ0IsR0FBZSxFQUFFLE9BQVksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTdFLDZDQUFXLEdBQVgsVUFBWSxHQUFXLEVBQUUsT0FBWSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFFL0QsZ0RBQWMsR0FBZCxVQUFlLEdBQWMsRUFBRSxPQUFZLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUVyRSxrREFBZ0IsR0FBaEIsVUFBaUIsR0FBZ0IsRUFBRSxPQUFZLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUV6RSwyQ0FBUyxHQUFULFVBQVUsR0FBZ0IsRUFBRSxPQUFZLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUVsRSxnREFBYyxHQUFkLFVBQWUsR0FBYyxFQUFFLE9BQVksSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBRXJFLGlEQUFlLEdBQWYsVUFBZ0IsR0FBZSxFQUFFLE9BQVksSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBRXZFLDBDQUFRLEdBQVIsVUFBUyxJQUFXO29CQUNsQixJQUFJLEdBQUcsR0FBRyx3QkFBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ25ELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO3dCQUNyQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDL0IsQ0FBQztvQkFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO2dCQUNiLENBQUM7Z0JBRUQsNENBQVUsR0FBVixVQUFXLEdBQVUsRUFBRSxPQUFZLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUU3RCw0Q0FBVSxHQUFWLFVBQVcsR0FBVSxFQUFFLE9BQVksSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQy9ELDhCQUFDO1lBQUQsQ0F0REEsQUFzREMsSUFBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tcGlsZXIvZXhwcmVzc2lvbl9wYXJzZXIvcGFyc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaS9kZWNvcmF0b3JzJztcbmltcG9ydCB7aXNCbGFuaywgaXNQcmVzZW50LCBTdHJpbmdXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9uLCBXcmFwcGVkRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7XG4gIExleGVyLFxuICBFT0YsXG4gIGlzSWRlbnRpZmllcixcbiAgaXNRdW90ZSxcbiAgVG9rZW4sXG4gICRQRVJJT0QsXG4gICRDT0xPTixcbiAgJFNFTUlDT0xPTixcbiAgJExCUkFDS0VULFxuICAkUkJSQUNLRVQsXG4gICRDT01NQSxcbiAgJExCUkFDRSxcbiAgJFJCUkFDRSxcbiAgJExQQVJFTixcbiAgJFJQQVJFTixcbiAgJFNMQVNIXG59IGZyb20gJy4vbGV4ZXInO1xuaW1wb3J0IHtcbiAgQVNULFxuICBFbXB0eUV4cHIsXG4gIEltcGxpY2l0UmVjZWl2ZXIsXG4gIFByb3BlcnR5UmVhZCxcbiAgUHJvcGVydHlXcml0ZSxcbiAgU2FmZVByb3BlcnR5UmVhZCxcbiAgTGl0ZXJhbFByaW1pdGl2ZSxcbiAgQmluYXJ5LFxuICBQcmVmaXhOb3QsXG4gIENvbmRpdGlvbmFsLFxuICBCaW5kaW5nUGlwZSxcbiAgQ2hhaW4sXG4gIEtleWVkUmVhZCxcbiAgS2V5ZWRXcml0ZSxcbiAgTGl0ZXJhbEFycmF5LFxuICBMaXRlcmFsTWFwLFxuICBJbnRlcnBvbGF0aW9uLFxuICBNZXRob2RDYWxsLFxuICBTYWZlTWV0aG9kQ2FsbCxcbiAgRnVuY3Rpb25DYWxsLFxuICBUZW1wbGF0ZUJpbmRpbmcsXG4gIEFTVFdpdGhTb3VyY2UsXG4gIEFzdFZpc2l0b3IsXG4gIFF1b3RlXG59IGZyb20gJy4vYXN0JztcblxuXG52YXIgX2ltcGxpY2l0UmVjZWl2ZXIgPSBuZXcgSW1wbGljaXRSZWNlaXZlcigpO1xuLy8gVE9ETyh0Ym9zY2gpOiBDYW5ub3QgbWFrZSB0aGlzIGNvbnN0L2ZpbmFsIHJpZ2h0IG5vdyBiZWNhdXNlIG9mIHRoZSB0cmFuc3BpbGVyLi4uXG52YXIgSU5URVJQT0xBVElPTl9SRUdFWFAgPSAvXFx7XFx7KFtcXHNcXFNdKj8pXFx9XFx9L2c7XG5cbmNsYXNzIFBhcnNlRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZywgaW5wdXQ6IHN0cmluZywgZXJyTG9jYXRpb246IHN0cmluZywgY3R4TG9jYXRpb24/OiBhbnkpIHtcbiAgICBzdXBlcihgUGFyc2VyIEVycm9yOiAke21lc3NhZ2V9ICR7ZXJyTG9jYXRpb259IFske2lucHV0fV0gaW4gJHtjdHhMb2NhdGlvbn1gKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgU3BsaXRJbnRlcnBvbGF0aW9uIHtcbiAgY29uc3RydWN0b3IocHVibGljIHN0cmluZ3M6IHN0cmluZ1tdLCBwdWJsaWMgZXhwcmVzc2lvbnM6IHN0cmluZ1tdKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVCaW5kaW5nUGFyc2VSZXN1bHQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVCaW5kaW5nczogVGVtcGxhdGVCaW5kaW5nW10sIHB1YmxpYyB3YXJuaW5nczogc3RyaW5nW10pIHt9XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQYXJzZXIge1xuICBjb25zdHJ1Y3RvcigvKiogQGludGVybmFsICovXG4gICAgICAgICAgICAgIHB1YmxpYyBfbGV4ZXI6IExleGVyKSB7fVxuXG4gIHBhcnNlQWN0aW9uKGlucHV0OiBzdHJpbmcsIGxvY2F0aW9uOiBhbnkpOiBBU1RXaXRoU291cmNlIHtcbiAgICB0aGlzLl9jaGVja05vSW50ZXJwb2xhdGlvbihpbnB1dCwgbG9jYXRpb24pO1xuICAgIHZhciB0b2tlbnMgPSB0aGlzLl9sZXhlci50b2tlbml6ZSh0aGlzLl9zdHJpcENvbW1lbnRzKGlucHV0KSk7XG4gICAgdmFyIGFzdCA9IG5ldyBfUGFyc2VBU1QoaW5wdXQsIGxvY2F0aW9uLCB0b2tlbnMsIHRydWUpLnBhcnNlQ2hhaW4oKTtcbiAgICByZXR1cm4gbmV3IEFTVFdpdGhTb3VyY2UoYXN0LCBpbnB1dCwgbG9jYXRpb24pO1xuICB9XG5cbiAgcGFyc2VCaW5kaW5nKGlucHV0OiBzdHJpbmcsIGxvY2F0aW9uOiBhbnkpOiBBU1RXaXRoU291cmNlIHtcbiAgICB2YXIgYXN0ID0gdGhpcy5fcGFyc2VCaW5kaW5nQXN0KGlucHV0LCBsb2NhdGlvbik7XG4gICAgcmV0dXJuIG5ldyBBU1RXaXRoU291cmNlKGFzdCwgaW5wdXQsIGxvY2F0aW9uKTtcbiAgfVxuXG4gIHBhcnNlU2ltcGxlQmluZGluZyhpbnB1dDogc3RyaW5nLCBsb2NhdGlvbjogc3RyaW5nKTogQVNUV2l0aFNvdXJjZSB7XG4gICAgdmFyIGFzdCA9IHRoaXMuX3BhcnNlQmluZGluZ0FzdChpbnB1dCwgbG9jYXRpb24pO1xuICAgIGlmICghU2ltcGxlRXhwcmVzc2lvbkNoZWNrZXIuY2hlY2soYXN0KSkge1xuICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uKFxuICAgICAgICAgICdIb3N0IGJpbmRpbmcgZXhwcmVzc2lvbiBjYW4gb25seSBjb250YWluIGZpZWxkIGFjY2VzcyBhbmQgY29uc3RhbnRzJywgaW5wdXQsIGxvY2F0aW9uKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBBU1RXaXRoU291cmNlKGFzdCwgaW5wdXQsIGxvY2F0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlQmluZGluZ0FzdChpbnB1dDogc3RyaW5nLCBsb2NhdGlvbjogc3RyaW5nKTogQVNUIHtcbiAgICAvLyBRdW90ZXMgZXhwcmVzc2lvbnMgdXNlIDNyZC1wYXJ0eSBleHByZXNzaW9uIGxhbmd1YWdlLiBXZSBkb24ndCB3YW50IHRvIHVzZVxuICAgIC8vIG91ciBsZXhlciBvciBwYXJzZXIgZm9yIHRoYXQsIHNvIHdlIGNoZWNrIGZvciB0aGF0IGFoZWFkIG9mIHRpbWUuXG4gICAgdmFyIHF1b3RlID0gdGhpcy5fcGFyc2VRdW90ZShpbnB1dCwgbG9jYXRpb24pO1xuXG4gICAgaWYgKGlzUHJlc2VudChxdW90ZSkpIHtcbiAgICAgIHJldHVybiBxdW90ZTtcbiAgICB9XG5cbiAgICB0aGlzLl9jaGVja05vSW50ZXJwb2xhdGlvbihpbnB1dCwgbG9jYXRpb24pO1xuICAgIHZhciB0b2tlbnMgPSB0aGlzLl9sZXhlci50b2tlbml6ZSh0aGlzLl9zdHJpcENvbW1lbnRzKGlucHV0KSk7XG4gICAgcmV0dXJuIG5ldyBfUGFyc2VBU1QoaW5wdXQsIGxvY2F0aW9uLCB0b2tlbnMsIGZhbHNlKS5wYXJzZUNoYWluKCk7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVF1b3RlKGlucHV0OiBzdHJpbmcsIGxvY2F0aW9uOiBhbnkpOiBBU1Qge1xuICAgIGlmIChpc0JsYW5rKGlucHV0KSkgcmV0dXJuIG51bGw7XG4gICAgdmFyIHByZWZpeFNlcGFyYXRvckluZGV4ID0gaW5wdXQuaW5kZXhPZignOicpO1xuICAgIGlmIChwcmVmaXhTZXBhcmF0b3JJbmRleCA9PSAtMSkgcmV0dXJuIG51bGw7XG4gICAgdmFyIHByZWZpeCA9IGlucHV0LnN1YnN0cmluZygwLCBwcmVmaXhTZXBhcmF0b3JJbmRleCkudHJpbSgpO1xuICAgIGlmICghaXNJZGVudGlmaWVyKHByZWZpeCkpIHJldHVybiBudWxsO1xuICAgIHZhciB1bmludGVycHJldGVkRXhwcmVzc2lvbiA9IGlucHV0LnN1YnN0cmluZyhwcmVmaXhTZXBhcmF0b3JJbmRleCArIDEpO1xuICAgIHJldHVybiBuZXcgUXVvdGUocHJlZml4LCB1bmludGVycHJldGVkRXhwcmVzc2lvbiwgbG9jYXRpb24pO1xuICB9XG5cbiAgcGFyc2VUZW1wbGF0ZUJpbmRpbmdzKGlucHV0OiBzdHJpbmcsIGxvY2F0aW9uOiBhbnkpOiBUZW1wbGF0ZUJpbmRpbmdQYXJzZVJlc3VsdCB7XG4gICAgdmFyIHRva2VucyA9IHRoaXMuX2xleGVyLnRva2VuaXplKGlucHV0KTtcbiAgICByZXR1cm4gbmV3IF9QYXJzZUFTVChpbnB1dCwgbG9jYXRpb24sIHRva2VucywgZmFsc2UpLnBhcnNlVGVtcGxhdGVCaW5kaW5ncygpO1xuICB9XG5cbiAgcGFyc2VJbnRlcnBvbGF0aW9uKGlucHV0OiBzdHJpbmcsIGxvY2F0aW9uOiBhbnkpOiBBU1RXaXRoU291cmNlIHtcbiAgICBsZXQgc3BsaXQgPSB0aGlzLnNwbGl0SW50ZXJwb2xhdGlvbihpbnB1dCwgbG9jYXRpb24pO1xuICAgIGlmIChzcGxpdCA9PSBudWxsKSByZXR1cm4gbnVsbDtcblxuICAgIGxldCBleHByZXNzaW9ucyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcGxpdC5leHByZXNzaW9ucy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIHRva2VucyA9IHRoaXMuX2xleGVyLnRva2VuaXplKHRoaXMuX3N0cmlwQ29tbWVudHMoc3BsaXQuZXhwcmVzc2lvbnNbaV0pKTtcbiAgICAgIHZhciBhc3QgPSBuZXcgX1BhcnNlQVNUKGlucHV0LCBsb2NhdGlvbiwgdG9rZW5zLCBmYWxzZSkucGFyc2VDaGFpbigpO1xuICAgICAgZXhwcmVzc2lvbnMucHVzaChhc3QpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUV2l0aFNvdXJjZShuZXcgSW50ZXJwb2xhdGlvbihzcGxpdC5zdHJpbmdzLCBleHByZXNzaW9ucyksIGlucHV0LCBsb2NhdGlvbik7XG4gIH1cblxuICBzcGxpdEludGVycG9sYXRpb24oaW5wdXQ6IHN0cmluZywgbG9jYXRpb246IHN0cmluZyk6IFNwbGl0SW50ZXJwb2xhdGlvbiB7XG4gICAgdmFyIHBhcnRzID0gU3RyaW5nV3JhcHBlci5zcGxpdChpbnB1dCwgSU5URVJQT0xBVElPTl9SRUdFWFApO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPD0gMSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciBzdHJpbmdzID0gW107XG4gICAgdmFyIGV4cHJlc3Npb25zID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcGFydDogc3RyaW5nID0gcGFydHNbaV07XG4gICAgICBpZiAoaSAlIDIgPT09IDApIHtcbiAgICAgICAgLy8gZml4ZWQgc3RyaW5nXG4gICAgICAgIHN0cmluZ3MucHVzaChwYXJ0KTtcbiAgICAgIH0gZWxzZSBpZiAocGFydC50cmltKCkubGVuZ3RoID4gMCkge1xuICAgICAgICBleHByZXNzaW9ucy5wdXNoKHBhcnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uKCdCbGFuayBleHByZXNzaW9ucyBhcmUgbm90IGFsbG93ZWQgaW4gaW50ZXJwb2xhdGVkIHN0cmluZ3MnLCBpbnB1dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBhdCBjb2x1bW4gJHt0aGlzLl9maW5kSW50ZXJwb2xhdGlvbkVycm9yQ29sdW1uKHBhcnRzLCBpKX0gaW5gLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3IFNwbGl0SW50ZXJwb2xhdGlvbihzdHJpbmdzLCBleHByZXNzaW9ucyk7XG4gIH1cblxuICB3cmFwTGl0ZXJhbFByaW1pdGl2ZShpbnB1dDogc3RyaW5nLCBsb2NhdGlvbjogYW55KTogQVNUV2l0aFNvdXJjZSB7XG4gICAgcmV0dXJuIG5ldyBBU1RXaXRoU291cmNlKG5ldyBMaXRlcmFsUHJpbWl0aXZlKGlucHV0KSwgaW5wdXQsIGxvY2F0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgX3N0cmlwQ29tbWVudHMoaW5wdXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IGkgPSB0aGlzLl9jb21tZW50U3RhcnQoaW5wdXQpO1xuICAgIHJldHVybiBpc1ByZXNlbnQoaSkgPyBpbnB1dC5zdWJzdHJpbmcoMCwgaSkudHJpbSgpIDogaW5wdXQ7XG4gIH1cblxuICBwcml2YXRlIF9jb21tZW50U3RhcnQoaW5wdXQ6IHN0cmluZyk6IG51bWJlciB7XG4gICAgdmFyIG91dGVyUXVvdGUgPSBudWxsO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICBsZXQgY2hhciA9IFN0cmluZ1dyYXBwZXIuY2hhckNvZGVBdChpbnB1dCwgaSk7XG4gICAgICBsZXQgbmV4dENoYXIgPSBTdHJpbmdXcmFwcGVyLmNoYXJDb2RlQXQoaW5wdXQsIGkgKyAxKTtcblxuICAgICAgaWYgKGNoYXIgPT09ICRTTEFTSCAmJiBuZXh0Q2hhciA9PSAkU0xBU0ggJiYgaXNCbGFuayhvdXRlclF1b3RlKSkgcmV0dXJuIGk7XG5cbiAgICAgIGlmIChvdXRlclF1b3RlID09PSBjaGFyKSB7XG4gICAgICAgIG91dGVyUXVvdGUgPSBudWxsO1xuICAgICAgfSBlbHNlIGlmIChpc0JsYW5rKG91dGVyUXVvdGUpICYmIGlzUXVvdGUoY2hhcikpIHtcbiAgICAgICAgb3V0ZXJRdW90ZSA9IGNoYXI7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hlY2tOb0ludGVycG9sYXRpb24oaW5wdXQ6IHN0cmluZywgbG9jYXRpb246IGFueSk6IHZvaWQge1xuICAgIHZhciBwYXJ0cyA9IFN0cmluZ1dyYXBwZXIuc3BsaXQoaW5wdXQsIElOVEVSUE9MQVRJT05fUkVHRVhQKTtcbiAgICBpZiAocGFydHMubGVuZ3RoID4gMSkge1xuICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uKCdHb3QgaW50ZXJwb2xhdGlvbiAoe3t9fSkgd2hlcmUgZXhwcmVzc2lvbiB3YXMgZXhwZWN0ZWQnLCBpbnB1dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgYXQgY29sdW1uICR7dGhpcy5fZmluZEludGVycG9sYXRpb25FcnJvckNvbHVtbihwYXJ0cywgMSl9IGluYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZmluZEludGVycG9sYXRpb25FcnJvckNvbHVtbihwYXJ0czogc3RyaW5nW10sIHBhcnRJbkVycklkeDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICB2YXIgZXJyTG9jYXRpb24gPSAnJztcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHBhcnRJbkVycklkeDsgaisrKSB7XG4gICAgICBlcnJMb2NhdGlvbiArPSBqICUgMiA9PT0gMCA/IHBhcnRzW2pdIDogYHt7JHtwYXJ0c1tqXX19fWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVyckxvY2F0aW9uLmxlbmd0aDtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgX1BhcnNlQVNUIHtcbiAgaW5kZXg6IG51bWJlciA9IDA7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpbnB1dDogc3RyaW5nLCBwdWJsaWMgbG9jYXRpb246IGFueSwgcHVibGljIHRva2VuczogYW55W10sXG4gICAgICAgICAgICAgIHB1YmxpYyBwYXJzZUFjdGlvbjogYm9vbGVhbikge31cblxuICBwZWVrKG9mZnNldDogbnVtYmVyKTogVG9rZW4ge1xuICAgIHZhciBpID0gdGhpcy5pbmRleCArIG9mZnNldDtcbiAgICByZXR1cm4gaSA8IHRoaXMudG9rZW5zLmxlbmd0aCA/IHRoaXMudG9rZW5zW2ldIDogRU9GO1xuICB9XG5cbiAgZ2V0IG5leHQoKTogVG9rZW4geyByZXR1cm4gdGhpcy5wZWVrKDApOyB9XG5cbiAgZ2V0IGlucHV0SW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKHRoaXMuaW5kZXggPCB0aGlzLnRva2Vucy5sZW5ndGgpID8gdGhpcy5uZXh0LmluZGV4IDogdGhpcy5pbnB1dC5sZW5ndGg7XG4gIH1cblxuICBhZHZhbmNlKCkgeyB0aGlzLmluZGV4Kys7IH1cblxuICBvcHRpb25hbENoYXJhY3Rlcihjb2RlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5uZXh0LmlzQ2hhcmFjdGVyKGNvZGUpKSB7XG4gICAgICB0aGlzLmFkdmFuY2UoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcGVla0tleXdvcmRMZXQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLm5leHQuaXNLZXl3b3JkTGV0KCk7IH1cblxuICBwZWVrRGVwcmVjYXRlZEtleXdvcmRWYXIoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLm5leHQuaXNLZXl3b3JkRGVwcmVjYXRlZFZhcigpOyB9XG5cbiAgcGVla0RlcHJlY2F0ZWRPcGVyYXRvckhhc2goKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLm5leHQuaXNPcGVyYXRvcignIycpOyB9XG5cbiAgZXhwZWN0Q2hhcmFjdGVyKGNvZGU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLm9wdGlvbmFsQ2hhcmFjdGVyKGNvZGUpKSByZXR1cm47XG4gICAgdGhpcy5lcnJvcihgTWlzc2luZyBleHBlY3RlZCAke1N0cmluZ1dyYXBwZXIuZnJvbUNoYXJDb2RlKGNvZGUpfWApO1xuICB9XG5cblxuICBvcHRpb25hbE9wZXJhdG9yKG9wOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5uZXh0LmlzT3BlcmF0b3Iob3ApKSB7XG4gICAgICB0aGlzLmFkdmFuY2UoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZXhwZWN0T3BlcmF0b3Iob3BlcmF0b3I6IHN0cmluZykge1xuICAgIGlmICh0aGlzLm9wdGlvbmFsT3BlcmF0b3Iob3BlcmF0b3IpKSByZXR1cm47XG4gICAgdGhpcy5lcnJvcihgTWlzc2luZyBleHBlY3RlZCBvcGVyYXRvciAke29wZXJhdG9yfWApO1xuICB9XG5cbiAgZXhwZWN0SWRlbnRpZmllck9yS2V5d29yZCgpOiBzdHJpbmcge1xuICAgIHZhciBuID0gdGhpcy5uZXh0O1xuICAgIGlmICghbi5pc0lkZW50aWZpZXIoKSAmJiAhbi5pc0tleXdvcmQoKSkge1xuICAgICAgdGhpcy5lcnJvcihgVW5leHBlY3RlZCB0b2tlbiAke259LCBleHBlY3RlZCBpZGVudGlmaWVyIG9yIGtleXdvcmRgKTtcbiAgICB9XG4gICAgdGhpcy5hZHZhbmNlKCk7XG4gICAgcmV0dXJuIG4udG9TdHJpbmcoKTtcbiAgfVxuXG4gIGV4cGVjdElkZW50aWZpZXJPcktleXdvcmRPclN0cmluZygpOiBzdHJpbmcge1xuICAgIHZhciBuID0gdGhpcy5uZXh0O1xuICAgIGlmICghbi5pc0lkZW50aWZpZXIoKSAmJiAhbi5pc0tleXdvcmQoKSAmJiAhbi5pc1N0cmluZygpKSB7XG4gICAgICB0aGlzLmVycm9yKGBVbmV4cGVjdGVkIHRva2VuICR7bn0sIGV4cGVjdGVkIGlkZW50aWZpZXIsIGtleXdvcmQsIG9yIHN0cmluZ2ApO1xuICAgIH1cbiAgICB0aGlzLmFkdmFuY2UoKTtcbiAgICByZXR1cm4gbi50b1N0cmluZygpO1xuICB9XG5cbiAgcGFyc2VDaGFpbigpOiBBU1Qge1xuICAgIHZhciBleHBycyA9IFtdO1xuICAgIHdoaWxlICh0aGlzLmluZGV4IDwgdGhpcy50b2tlbnMubGVuZ3RoKSB7XG4gICAgICB2YXIgZXhwciA9IHRoaXMucGFyc2VQaXBlKCk7XG4gICAgICBleHBycy5wdXNoKGV4cHIpO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25hbENoYXJhY3RlcigkU0VNSUNPTE9OKSkge1xuICAgICAgICBpZiAoIXRoaXMucGFyc2VBY3Rpb24pIHtcbiAgICAgICAgICB0aGlzLmVycm9yKFwiQmluZGluZyBleHByZXNzaW9uIGNhbm5vdCBjb250YWluIGNoYWluZWQgZXhwcmVzc2lvblwiKTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAodGhpcy5vcHRpb25hbENoYXJhY3RlcigkU0VNSUNPTE9OKSkge1xuICAgICAgICB9ICAvLyByZWFkIGFsbCBzZW1pY29sb25zXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaW5kZXggPCB0aGlzLnRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5lcnJvcihgVW5leHBlY3RlZCB0b2tlbiAnJHt0aGlzLm5leHR9J2ApO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZXhwcnMubGVuZ3RoID09IDApIHJldHVybiBuZXcgRW1wdHlFeHByKCk7XG4gICAgaWYgKGV4cHJzLmxlbmd0aCA9PSAxKSByZXR1cm4gZXhwcnNbMF07XG4gICAgcmV0dXJuIG5ldyBDaGFpbihleHBycyk7XG4gIH1cblxuICBwYXJzZVBpcGUoKTogQVNUIHtcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTtcbiAgICBpZiAodGhpcy5vcHRpb25hbE9wZXJhdG9yKFwifFwiKSkge1xuICAgICAgaWYgKHRoaXMucGFyc2VBY3Rpb24pIHtcbiAgICAgICAgdGhpcy5lcnJvcihcIkNhbm5vdCBoYXZlIGEgcGlwZSBpbiBhbiBhY3Rpb24gZXhwcmVzc2lvblwiKTtcbiAgICAgIH1cblxuICAgICAgZG8ge1xuICAgICAgICB2YXIgbmFtZSA9IHRoaXMuZXhwZWN0SWRlbnRpZmllck9yS2V5d29yZCgpO1xuICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICB3aGlsZSAodGhpcy5vcHRpb25hbENoYXJhY3RlcigkQ09MT04pKSB7XG4gICAgICAgICAgYXJncy5wdXNoKHRoaXMucGFyc2VFeHByZXNzaW9uKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCA9IG5ldyBCaW5kaW5nUGlwZShyZXN1bHQsIG5hbWUsIGFyZ3MpO1xuICAgICAgfSB3aGlsZSAodGhpcy5vcHRpb25hbE9wZXJhdG9yKFwifFwiKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHBhcnNlRXhwcmVzc2lvbigpOiBBU1QgeyByZXR1cm4gdGhpcy5wYXJzZUNvbmRpdGlvbmFsKCk7IH1cblxuICBwYXJzZUNvbmRpdGlvbmFsKCk6IEFTVCB7XG4gICAgdmFyIHN0YXJ0ID0gdGhpcy5pbnB1dEluZGV4O1xuICAgIHZhciByZXN1bHQgPSB0aGlzLnBhcnNlTG9naWNhbE9yKCk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25hbE9wZXJhdG9yKCc/JykpIHtcbiAgICAgIHZhciB5ZXMgPSB0aGlzLnBhcnNlUGlwZSgpO1xuICAgICAgaWYgKCF0aGlzLm9wdGlvbmFsQ2hhcmFjdGVyKCRDT0xPTikpIHtcbiAgICAgICAgdmFyIGVuZCA9IHRoaXMuaW5wdXRJbmRleDtcbiAgICAgICAgdmFyIGV4cHJlc3Npb24gPSB0aGlzLmlucHV0LnN1YnN0cmluZyhzdGFydCwgZW5kKTtcbiAgICAgICAgdGhpcy5lcnJvcihgQ29uZGl0aW9uYWwgZXhwcmVzc2lvbiAke2V4cHJlc3Npb259IHJlcXVpcmVzIGFsbCAzIGV4cHJlc3Npb25zYCk7XG4gICAgICB9XG4gICAgICB2YXIgbm8gPSB0aGlzLnBhcnNlUGlwZSgpO1xuICAgICAgcmV0dXJuIG5ldyBDb25kaXRpb25hbChyZXN1bHQsIHllcywgbm8pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfVxuXG4gIHBhcnNlTG9naWNhbE9yKCk6IEFTVCB7XG4gICAgLy8gJ3x8J1xuICAgIHZhciByZXN1bHQgPSB0aGlzLnBhcnNlTG9naWNhbEFuZCgpO1xuICAgIHdoaWxlICh0aGlzLm9wdGlvbmFsT3BlcmF0b3IoJ3x8JykpIHtcbiAgICAgIHJlc3VsdCA9IG5ldyBCaW5hcnkoJ3x8JywgcmVzdWx0LCB0aGlzLnBhcnNlTG9naWNhbEFuZCgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHBhcnNlTG9naWNhbEFuZCgpOiBBU1Qge1xuICAgIC8vICcmJidcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5wYXJzZUVxdWFsaXR5KCk7XG4gICAgd2hpbGUgKHRoaXMub3B0aW9uYWxPcGVyYXRvcignJiYnKSkge1xuICAgICAgcmVzdWx0ID0gbmV3IEJpbmFyeSgnJiYnLCByZXN1bHQsIHRoaXMucGFyc2VFcXVhbGl0eSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHBhcnNlRXF1YWxpdHkoKTogQVNUIHtcbiAgICAvLyAnPT0nLCchPScsJz09PScsJyE9PSdcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5wYXJzZVJlbGF0aW9uYWwoKTtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgaWYgKHRoaXMub3B0aW9uYWxPcGVyYXRvcignPT0nKSkge1xuICAgICAgICByZXN1bHQgPSBuZXcgQmluYXJ5KCc9PScsIHJlc3VsdCwgdGhpcy5wYXJzZVJlbGF0aW9uYWwoKSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9uYWxPcGVyYXRvcignPT09JykpIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IEJpbmFyeSgnPT09JywgcmVzdWx0LCB0aGlzLnBhcnNlUmVsYXRpb25hbCgpKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25hbE9wZXJhdG9yKCchPScpKSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBCaW5hcnkoJyE9JywgcmVzdWx0LCB0aGlzLnBhcnNlUmVsYXRpb25hbCgpKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25hbE9wZXJhdG9yKCchPT0nKSkge1xuICAgICAgICByZXN1bHQgPSBuZXcgQmluYXJ5KCchPT0nLCByZXN1bHQsIHRoaXMucGFyc2VSZWxhdGlvbmFsKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwYXJzZVJlbGF0aW9uYWwoKTogQVNUIHtcbiAgICAvLyAnPCcsICc+JywgJzw9JywgJz49J1xuICAgIHZhciByZXN1bHQgPSB0aGlzLnBhcnNlQWRkaXRpdmUoKTtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgaWYgKHRoaXMub3B0aW9uYWxPcGVyYXRvcignPCcpKSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBCaW5hcnkoJzwnLCByZXN1bHQsIHRoaXMucGFyc2VBZGRpdGl2ZSgpKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25hbE9wZXJhdG9yKCc+JykpIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IEJpbmFyeSgnPicsIHJlc3VsdCwgdGhpcy5wYXJzZUFkZGl0aXZlKCkpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbmFsT3BlcmF0b3IoJzw9JykpIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IEJpbmFyeSgnPD0nLCByZXN1bHQsIHRoaXMucGFyc2VBZGRpdGl2ZSgpKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25hbE9wZXJhdG9yKCc+PScpKSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBCaW5hcnkoJz49JywgcmVzdWx0LCB0aGlzLnBhcnNlQWRkaXRpdmUoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBhcnNlQWRkaXRpdmUoKTogQVNUIHtcbiAgICAvLyAnKycsICctJ1xuICAgIHZhciByZXN1bHQgPSB0aGlzLnBhcnNlTXVsdGlwbGljYXRpdmUoKTtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgaWYgKHRoaXMub3B0aW9uYWxPcGVyYXRvcignKycpKSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBCaW5hcnkoJysnLCByZXN1bHQsIHRoaXMucGFyc2VNdWx0aXBsaWNhdGl2ZSgpKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25hbE9wZXJhdG9yKCctJykpIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IEJpbmFyeSgnLScsIHJlc3VsdCwgdGhpcy5wYXJzZU11bHRpcGxpY2F0aXZlKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwYXJzZU11bHRpcGxpY2F0aXZlKCk6IEFTVCB7XG4gICAgLy8gJyonLCAnJScsICcvJ1xuICAgIHZhciByZXN1bHQgPSB0aGlzLnBhcnNlUHJlZml4KCk7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbmFsT3BlcmF0b3IoJyonKSkge1xuICAgICAgICByZXN1bHQgPSBuZXcgQmluYXJ5KCcqJywgcmVzdWx0LCB0aGlzLnBhcnNlUHJlZml4KCkpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbmFsT3BlcmF0b3IoJyUnKSkge1xuICAgICAgICByZXN1bHQgPSBuZXcgQmluYXJ5KCclJywgcmVzdWx0LCB0aGlzLnBhcnNlUHJlZml4KCkpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbmFsT3BlcmF0b3IoJy8nKSkge1xuICAgICAgICByZXN1bHQgPSBuZXcgQmluYXJ5KCcvJywgcmVzdWx0LCB0aGlzLnBhcnNlUHJlZml4KCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwYXJzZVByZWZpeCgpOiBBU1Qge1xuICAgIGlmICh0aGlzLm9wdGlvbmFsT3BlcmF0b3IoJysnKSkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyc2VQcmVmaXgoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9uYWxPcGVyYXRvcignLScpKSB7XG4gICAgICByZXR1cm4gbmV3IEJpbmFyeSgnLScsIG5ldyBMaXRlcmFsUHJpbWl0aXZlKDApLCB0aGlzLnBhcnNlUHJlZml4KCkpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25hbE9wZXJhdG9yKCchJykpIHtcbiAgICAgIHJldHVybiBuZXcgUHJlZml4Tm90KHRoaXMucGFyc2VQcmVmaXgoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcnNlQ2FsbENoYWluKCk7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VDYWxsQ2hhaW4oKTogQVNUIHtcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5wYXJzZVByaW1hcnkoKTtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgaWYgKHRoaXMub3B0aW9uYWxDaGFyYWN0ZXIoJFBFUklPRCkpIHtcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5wYXJzZUFjY2Vzc01lbWJlck9yTWV0aG9kQ2FsbChyZXN1bHQsIGZhbHNlKTtcblxuICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbmFsT3BlcmF0b3IoJz8uJykpIHtcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5wYXJzZUFjY2Vzc01lbWJlck9yTWV0aG9kQ2FsbChyZXN1bHQsIHRydWUpO1xuXG4gICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9uYWxDaGFyYWN0ZXIoJExCUkFDS0VUKSkge1xuICAgICAgICB2YXIga2V5ID0gdGhpcy5wYXJzZVBpcGUoKTtcbiAgICAgICAgdGhpcy5leHBlY3RDaGFyYWN0ZXIoJFJCUkFDS0VUKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uYWxPcGVyYXRvcihcIj1cIikpIHtcbiAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLnBhcnNlQ29uZGl0aW9uYWwoKTtcbiAgICAgICAgICByZXN1bHQgPSBuZXcgS2V5ZWRXcml0ZShyZXN1bHQsIGtleSwgdmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdCA9IG5ldyBLZXllZFJlYWQocmVzdWx0LCBrZXkpO1xuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25hbENoYXJhY3RlcigkTFBBUkVOKSkge1xuICAgICAgICB2YXIgYXJncyA9IHRoaXMucGFyc2VDYWxsQXJndW1lbnRzKCk7XG4gICAgICAgIHRoaXMuZXhwZWN0Q2hhcmFjdGVyKCRSUEFSRU4pO1xuICAgICAgICByZXN1bHQgPSBuZXcgRnVuY3Rpb25DYWxsKHJlc3VsdCwgYXJncyk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcGFyc2VQcmltYXJ5KCk6IEFTVCB7XG4gICAgaWYgKHRoaXMub3B0aW9uYWxDaGFyYWN0ZXIoJExQQVJFTikpIHtcbiAgICAgIGxldCByZXN1bHQgPSB0aGlzLnBhcnNlUGlwZSgpO1xuICAgICAgdGhpcy5leHBlY3RDaGFyYWN0ZXIoJFJQQVJFTik7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gZWxzZSBpZiAodGhpcy5uZXh0LmlzS2V5d29yZE51bGwoKSB8fCB0aGlzLm5leHQuaXNLZXl3b3JkVW5kZWZpbmVkKCkpIHtcbiAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgICAgcmV0dXJuIG5ldyBMaXRlcmFsUHJpbWl0aXZlKG51bGwpO1xuXG4gICAgfSBlbHNlIGlmICh0aGlzLm5leHQuaXNLZXl3b3JkVHJ1ZSgpKSB7XG4gICAgICB0aGlzLmFkdmFuY2UoKTtcbiAgICAgIHJldHVybiBuZXcgTGl0ZXJhbFByaW1pdGl2ZSh0cnVlKTtcblxuICAgIH0gZWxzZSBpZiAodGhpcy5uZXh0LmlzS2V5d29yZEZhbHNlKCkpIHtcbiAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgICAgcmV0dXJuIG5ldyBMaXRlcmFsUHJpbWl0aXZlKGZhbHNlKTtcblxuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25hbENoYXJhY3RlcigkTEJSQUNLRVQpKSB7XG4gICAgICB2YXIgZWxlbWVudHMgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbkxpc3QoJFJCUkFDS0VUKTtcbiAgICAgIHRoaXMuZXhwZWN0Q2hhcmFjdGVyKCRSQlJBQ0tFVCk7XG4gICAgICByZXR1cm4gbmV3IExpdGVyYWxBcnJheShlbGVtZW50cyk7XG5cbiAgICB9IGVsc2UgaWYgKHRoaXMubmV4dC5pc0NoYXJhY3RlcigkTEJSQUNFKSkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyc2VMaXRlcmFsTWFwKCk7XG5cbiAgICB9IGVsc2UgaWYgKHRoaXMubmV4dC5pc0lkZW50aWZpZXIoKSkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyc2VBY2Nlc3NNZW1iZXJPck1ldGhvZENhbGwoX2ltcGxpY2l0UmVjZWl2ZXIsIGZhbHNlKTtcblxuICAgIH0gZWxzZSBpZiAodGhpcy5uZXh0LmlzTnVtYmVyKCkpIHtcbiAgICAgIHZhciB2YWx1ZSA9IHRoaXMubmV4dC50b051bWJlcigpO1xuICAgICAgdGhpcy5hZHZhbmNlKCk7XG4gICAgICByZXR1cm4gbmV3IExpdGVyYWxQcmltaXRpdmUodmFsdWUpO1xuXG4gICAgfSBlbHNlIGlmICh0aGlzLm5leHQuaXNTdHJpbmcoKSkge1xuICAgICAgdmFyIGxpdGVyYWxWYWx1ZSA9IHRoaXMubmV4dC50b1N0cmluZygpO1xuICAgICAgdGhpcy5hZHZhbmNlKCk7XG4gICAgICByZXR1cm4gbmV3IExpdGVyYWxQcmltaXRpdmUobGl0ZXJhbFZhbHVlKTtcblxuICAgIH0gZWxzZSBpZiAodGhpcy5pbmRleCA+PSB0aGlzLnRva2Vucy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZXJyb3IoYFVuZXhwZWN0ZWQgZW5kIG9mIGV4cHJlc3Npb246ICR7dGhpcy5pbnB1dH1gKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVycm9yKGBVbmV4cGVjdGVkIHRva2VuICR7dGhpcy5uZXh0fWApO1xuICAgIH1cbiAgICAvLyBlcnJvcigpIHRocm93cywgc28gd2UgZG9uJ3QgcmVhY2ggaGVyZS5cbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcIkZlbGwgdGhyb3VnaCBhbGwgY2FzZXMgaW4gcGFyc2VQcmltYXJ5XCIpO1xuICB9XG5cbiAgcGFyc2VFeHByZXNzaW9uTGlzdCh0ZXJtaW5hdG9yOiBudW1iZXIpOiBhbnlbXSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIGlmICghdGhpcy5uZXh0LmlzQ2hhcmFjdGVyKHRlcm1pbmF0b3IpKSB7XG4gICAgICBkbyB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHRoaXMucGFyc2VQaXBlKCkpO1xuICAgICAgfSB3aGlsZSAodGhpcy5vcHRpb25hbENoYXJhY3RlcigkQ09NTUEpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHBhcnNlTGl0ZXJhbE1hcCgpOiBMaXRlcmFsTWFwIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICB0aGlzLmV4cGVjdENoYXJhY3RlcigkTEJSQUNFKTtcbiAgICBpZiAoIXRoaXMub3B0aW9uYWxDaGFyYWN0ZXIoJFJCUkFDRSkpIHtcbiAgICAgIGRvIHtcbiAgICAgICAgdmFyIGtleSA9IHRoaXMuZXhwZWN0SWRlbnRpZmllck9yS2V5d29yZE9yU3RyaW5nKCk7XG4gICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgICB0aGlzLmV4cGVjdENoYXJhY3RlcigkQ09MT04pO1xuICAgICAgICB2YWx1ZXMucHVzaCh0aGlzLnBhcnNlUGlwZSgpKTtcbiAgICAgIH0gd2hpbGUgKHRoaXMub3B0aW9uYWxDaGFyYWN0ZXIoJENPTU1BKSk7XG4gICAgICB0aGlzLmV4cGVjdENoYXJhY3RlcigkUkJSQUNFKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBMaXRlcmFsTWFwKGtleXMsIHZhbHVlcyk7XG4gIH1cblxuICBwYXJzZUFjY2Vzc01lbWJlck9yTWV0aG9kQ2FsbChyZWNlaXZlcjogQVNULCBpc1NhZmU6IGJvb2xlYW4gPSBmYWxzZSk6IEFTVCB7XG4gICAgbGV0IGlkID0gdGhpcy5leHBlY3RJZGVudGlmaWVyT3JLZXl3b3JkKCk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25hbENoYXJhY3RlcigkTFBBUkVOKSkge1xuICAgICAgbGV0IGFyZ3MgPSB0aGlzLnBhcnNlQ2FsbEFyZ3VtZW50cygpO1xuICAgICAgdGhpcy5leHBlY3RDaGFyYWN0ZXIoJFJQQVJFTik7XG4gICAgICByZXR1cm4gaXNTYWZlID8gbmV3IFNhZmVNZXRob2RDYWxsKHJlY2VpdmVyLCBpZCwgYXJncykgOiBuZXcgTWV0aG9kQ2FsbChyZWNlaXZlciwgaWQsIGFyZ3MpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChpc1NhZmUpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uYWxPcGVyYXRvcihcIj1cIikpIHtcbiAgICAgICAgICB0aGlzLmVycm9yKFwiVGhlICc/Licgb3BlcmF0b3IgY2Fubm90IGJlIHVzZWQgaW4gdGhlIGFzc2lnbm1lbnRcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBTYWZlUHJvcGVydHlSZWFkKHJlY2VpdmVyLCBpZCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbmFsT3BlcmF0b3IoXCI9XCIpKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLnBhcnNlQWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yKFwiQmluZGluZ3MgY2Fubm90IGNvbnRhaW4gYXNzaWdubWVudHNcIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5wYXJzZUNvbmRpdGlvbmFsKCk7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wZXJ0eVdyaXRlKHJlY2VpdmVyLCBpZCwgdmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvcGVydHlSZWFkKHJlY2VpdmVyLCBpZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHBhcnNlQ2FsbEFyZ3VtZW50cygpOiBCaW5kaW5nUGlwZVtdIHtcbiAgICBpZiAodGhpcy5uZXh0LmlzQ2hhcmFjdGVyKCRSUEFSRU4pKSByZXR1cm4gW107XG4gICAgdmFyIHBvc2l0aW9uYWxzID0gW107XG4gICAgZG8ge1xuICAgICAgcG9zaXRpb25hbHMucHVzaCh0aGlzLnBhcnNlUGlwZSgpKTtcbiAgICB9IHdoaWxlICh0aGlzLm9wdGlvbmFsQ2hhcmFjdGVyKCRDT01NQSkpO1xuICAgIHJldHVybiBwb3NpdGlvbmFscztcbiAgfVxuXG4gIHBhcnNlQmxvY2tDb250ZW50KCk6IEFTVCB7XG4gICAgaWYgKCF0aGlzLnBhcnNlQWN0aW9uKSB7XG4gICAgICB0aGlzLmVycm9yKFwiQmluZGluZyBleHByZXNzaW9uIGNhbm5vdCBjb250YWluIGNoYWluZWQgZXhwcmVzc2lvblwiKTtcbiAgICB9XG4gICAgdmFyIGV4cHJzID0gW107XG4gICAgd2hpbGUgKHRoaXMuaW5kZXggPCB0aGlzLnRva2Vucy5sZW5ndGggJiYgIXRoaXMubmV4dC5pc0NoYXJhY3RlcigkUkJSQUNFKSkge1xuICAgICAgdmFyIGV4cHIgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbigpO1xuICAgICAgZXhwcnMucHVzaChleHByKTtcblxuICAgICAgaWYgKHRoaXMub3B0aW9uYWxDaGFyYWN0ZXIoJFNFTUlDT0xPTikpIHtcbiAgICAgICAgd2hpbGUgKHRoaXMub3B0aW9uYWxDaGFyYWN0ZXIoJFNFTUlDT0xPTikpIHtcbiAgICAgICAgfSAgLy8gcmVhZCBhbGwgc2VtaWNvbG9uc1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZXhwcnMubGVuZ3RoID09IDApIHJldHVybiBuZXcgRW1wdHlFeHByKCk7XG4gICAgaWYgKGV4cHJzLmxlbmd0aCA9PSAxKSByZXR1cm4gZXhwcnNbMF07XG5cbiAgICByZXR1cm4gbmV3IENoYWluKGV4cHJzKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEFuIGlkZW50aWZpZXIsIGEga2V5d29yZCwgYSBzdHJpbmcgd2l0aCBhbiBvcHRpb25hbCBgLWAgaW5iZXR3ZWVuLlxuICAgKi9cbiAgZXhwZWN0VGVtcGxhdGVCaW5kaW5nS2V5KCk6IHN0cmluZyB7XG4gICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgIHZhciBvcGVyYXRvckZvdW5kID0gZmFsc2U7XG4gICAgZG8ge1xuICAgICAgcmVzdWx0ICs9IHRoaXMuZXhwZWN0SWRlbnRpZmllck9yS2V5d29yZE9yU3RyaW5nKCk7XG4gICAgICBvcGVyYXRvckZvdW5kID0gdGhpcy5vcHRpb25hbE9wZXJhdG9yKCctJyk7XG4gICAgICBpZiAob3BlcmF0b3JGb3VuZCkge1xuICAgICAgICByZXN1bHQgKz0gJy0nO1xuICAgICAgfVxuICAgIH0gd2hpbGUgKG9wZXJhdG9yRm91bmQpO1xuXG4gICAgcmV0dXJuIHJlc3VsdC50b1N0cmluZygpO1xuICB9XG5cbiAgcGFyc2VUZW1wbGF0ZUJpbmRpbmdzKCk6IFRlbXBsYXRlQmluZGluZ1BhcnNlUmVzdWx0IHtcbiAgICB2YXIgYmluZGluZ3M6IFRlbXBsYXRlQmluZGluZ1tdID0gW107XG4gICAgdmFyIHByZWZpeCA9IG51bGw7XG4gICAgdmFyIHdhcm5pbmdzOiBzdHJpbmdbXSA9IFtdO1xuICAgIHdoaWxlICh0aGlzLmluZGV4IDwgdGhpcy50b2tlbnMubGVuZ3RoKSB7XG4gICAgICB2YXIga2V5SXNWYXI6IGJvb2xlYW4gPSB0aGlzLnBlZWtLZXl3b3JkTGV0KCk7XG4gICAgICBpZiAoIWtleUlzVmFyICYmIHRoaXMucGVla0RlcHJlY2F0ZWRLZXl3b3JkVmFyKCkpIHtcbiAgICAgICAga2V5SXNWYXIgPSB0cnVlO1xuICAgICAgICB3YXJuaW5ncy5wdXNoKGBcInZhclwiIGluc2lkZSBvZiBleHByZXNzaW9ucyBpcyBkZXByZWNhdGVkLiBVc2UgXCJsZXRcIiBpbnN0ZWFkIWApO1xuICAgICAgfVxuICAgICAgaWYgKCFrZXlJc1ZhciAmJiB0aGlzLnBlZWtEZXByZWNhdGVkT3BlcmF0b3JIYXNoKCkpIHtcbiAgICAgICAga2V5SXNWYXIgPSB0cnVlO1xuICAgICAgICB3YXJuaW5ncy5wdXNoKGBcIiNcIiBpbnNpZGUgb2YgZXhwcmVzc2lvbnMgaXMgZGVwcmVjYXRlZC4gVXNlIFwibGV0XCIgaW5zdGVhZCFgKTtcbiAgICAgIH1cbiAgICAgIGlmIChrZXlJc1Zhcikge1xuICAgICAgICB0aGlzLmFkdmFuY2UoKTtcbiAgICAgIH1cbiAgICAgIHZhciBrZXkgPSB0aGlzLmV4cGVjdFRlbXBsYXRlQmluZGluZ0tleSgpO1xuICAgICAgaWYgKCFrZXlJc1Zhcikge1xuICAgICAgICBpZiAocHJlZml4ID09IG51bGwpIHtcbiAgICAgICAgICBwcmVmaXggPSBrZXk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAga2V5ID0gcHJlZml4ICsga2V5WzBdLnRvVXBwZXJDYXNlKCkgKyBrZXkuc3Vic3RyaW5nKDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLm9wdGlvbmFsQ2hhcmFjdGVyKCRDT0xPTik7XG4gICAgICB2YXIgbmFtZSA9IG51bGw7XG4gICAgICB2YXIgZXhwcmVzc2lvbiA9IG51bGw7XG4gICAgICBpZiAoa2V5SXNWYXIpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uYWxPcGVyYXRvcihcIj1cIikpIHtcbiAgICAgICAgICBuYW1lID0gdGhpcy5leHBlY3RUZW1wbGF0ZUJpbmRpbmdLZXkoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuYW1lID0gJ1xcJGltcGxpY2l0JztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aGlzLm5leHQgIT09IEVPRiAmJiAhdGhpcy5wZWVrS2V5d29yZExldCgpICYmICF0aGlzLnBlZWtEZXByZWNhdGVkS2V5d29yZFZhcigpICYmXG4gICAgICAgICAgICAgICAgICF0aGlzLnBlZWtEZXByZWNhdGVkT3BlcmF0b3JIYXNoKCkpIHtcbiAgICAgICAgdmFyIHN0YXJ0ID0gdGhpcy5pbnB1dEluZGV4O1xuICAgICAgICB2YXIgYXN0ID0gdGhpcy5wYXJzZVBpcGUoKTtcbiAgICAgICAgdmFyIHNvdXJjZSA9IHRoaXMuaW5wdXQuc3Vic3RyaW5nKHN0YXJ0LCB0aGlzLmlucHV0SW5kZXgpO1xuICAgICAgICBleHByZXNzaW9uID0gbmV3IEFTVFdpdGhTb3VyY2UoYXN0LCBzb3VyY2UsIHRoaXMubG9jYXRpb24pO1xuICAgICAgfVxuICAgICAgYmluZGluZ3MucHVzaChuZXcgVGVtcGxhdGVCaW5kaW5nKGtleSwga2V5SXNWYXIsIG5hbWUsIGV4cHJlc3Npb24pKTtcbiAgICAgIGlmICghdGhpcy5vcHRpb25hbENoYXJhY3RlcigkU0VNSUNPTE9OKSkge1xuICAgICAgICB0aGlzLm9wdGlvbmFsQ2hhcmFjdGVyKCRDT01NQSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXcgVGVtcGxhdGVCaW5kaW5nUGFyc2VSZXN1bHQoYmluZGluZ3MsIHdhcm5pbmdzKTtcbiAgfVxuXG4gIGVycm9yKG1lc3NhZ2U6IHN0cmluZywgaW5kZXg6IG51bWJlciA9IG51bGwpIHtcbiAgICBpZiAoaXNCbGFuayhpbmRleCkpIGluZGV4ID0gdGhpcy5pbmRleDtcblxuICAgIHZhciBsb2NhdGlvbiA9IChpbmRleCA8IHRoaXMudG9rZW5zLmxlbmd0aCkgPyBgYXQgY29sdW1uICR7dGhpcy50b2tlbnNbaW5kZXhdLmluZGV4ICsgMX0gaW5gIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGF0IHRoZSBlbmQgb2YgdGhlIGV4cHJlc3Npb25gO1xuXG4gICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uKG1lc3NhZ2UsIHRoaXMuaW5wdXQsIGxvY2F0aW9uLCB0aGlzLmxvY2F0aW9uKTtcbiAgfVxufVxuXG5jbGFzcyBTaW1wbGVFeHByZXNzaW9uQ2hlY2tlciBpbXBsZW1lbnRzIEFzdFZpc2l0b3Ige1xuICBzdGF0aWMgY2hlY2soYXN0OiBBU1QpOiBib29sZWFuIHtcbiAgICB2YXIgcyA9IG5ldyBTaW1wbGVFeHByZXNzaW9uQ2hlY2tlcigpO1xuICAgIGFzdC52aXNpdChzKTtcbiAgICByZXR1cm4gcy5zaW1wbGU7XG4gIH1cblxuICBzaW1wbGUgPSB0cnVlO1xuXG4gIHZpc2l0SW1wbGljaXRSZWNlaXZlcihhc3Q6IEltcGxpY2l0UmVjZWl2ZXIsIGNvbnRleHQ6IGFueSkge31cblxuICB2aXNpdEludGVycG9sYXRpb24oYXN0OiBJbnRlcnBvbGF0aW9uLCBjb250ZXh0OiBhbnkpIHsgdGhpcy5zaW1wbGUgPSBmYWxzZTsgfVxuXG4gIHZpc2l0TGl0ZXJhbFByaW1pdGl2ZShhc3Q6IExpdGVyYWxQcmltaXRpdmUsIGNvbnRleHQ6IGFueSkge31cblxuICB2aXNpdFByb3BlcnR5UmVhZChhc3Q6IFByb3BlcnR5UmVhZCwgY29udGV4dDogYW55KSB7fVxuXG4gIHZpc2l0UHJvcGVydHlXcml0ZShhc3Q6IFByb3BlcnR5V3JpdGUsIGNvbnRleHQ6IGFueSkgeyB0aGlzLnNpbXBsZSA9IGZhbHNlOyB9XG5cbiAgdmlzaXRTYWZlUHJvcGVydHlSZWFkKGFzdDogU2FmZVByb3BlcnR5UmVhZCwgY29udGV4dDogYW55KSB7IHRoaXMuc2ltcGxlID0gZmFsc2U7IH1cblxuICB2aXNpdE1ldGhvZENhbGwoYXN0OiBNZXRob2RDYWxsLCBjb250ZXh0OiBhbnkpIHsgdGhpcy5zaW1wbGUgPSBmYWxzZTsgfVxuXG4gIHZpc2l0U2FmZU1ldGhvZENhbGwoYXN0OiBTYWZlTWV0aG9kQ2FsbCwgY29udGV4dDogYW55KSB7IHRoaXMuc2ltcGxlID0gZmFsc2U7IH1cblxuICB2aXNpdEZ1bmN0aW9uQ2FsbChhc3Q6IEZ1bmN0aW9uQ2FsbCwgY29udGV4dDogYW55KSB7IHRoaXMuc2ltcGxlID0gZmFsc2U7IH1cblxuICB2aXNpdExpdGVyYWxBcnJheShhc3Q6IExpdGVyYWxBcnJheSwgY29udGV4dDogYW55KSB7IHRoaXMudmlzaXRBbGwoYXN0LmV4cHJlc3Npb25zKTsgfVxuXG4gIHZpc2l0TGl0ZXJhbE1hcChhc3Q6IExpdGVyYWxNYXAsIGNvbnRleHQ6IGFueSkgeyB0aGlzLnZpc2l0QWxsKGFzdC52YWx1ZXMpOyB9XG5cbiAgdmlzaXRCaW5hcnkoYXN0OiBCaW5hcnksIGNvbnRleHQ6IGFueSkgeyB0aGlzLnNpbXBsZSA9IGZhbHNlOyB9XG5cbiAgdmlzaXRQcmVmaXhOb3QoYXN0OiBQcmVmaXhOb3QsIGNvbnRleHQ6IGFueSkgeyB0aGlzLnNpbXBsZSA9IGZhbHNlOyB9XG5cbiAgdmlzaXRDb25kaXRpb25hbChhc3Q6IENvbmRpdGlvbmFsLCBjb250ZXh0OiBhbnkpIHsgdGhpcy5zaW1wbGUgPSBmYWxzZTsgfVxuXG4gIHZpc2l0UGlwZShhc3Q6IEJpbmRpbmdQaXBlLCBjb250ZXh0OiBhbnkpIHsgdGhpcy5zaW1wbGUgPSBmYWxzZTsgfVxuXG4gIHZpc2l0S2V5ZWRSZWFkKGFzdDogS2V5ZWRSZWFkLCBjb250ZXh0OiBhbnkpIHsgdGhpcy5zaW1wbGUgPSBmYWxzZTsgfVxuXG4gIHZpc2l0S2V5ZWRXcml0ZShhc3Q6IEtleWVkV3JpdGUsIGNvbnRleHQ6IGFueSkgeyB0aGlzLnNpbXBsZSA9IGZhbHNlOyB9XG5cbiAgdmlzaXRBbGwoYXN0czogYW55W10pOiBhbnlbXSB7XG4gICAgdmFyIHJlcyA9IExpc3RXcmFwcGVyLmNyZWF0ZUZpeGVkU2l6ZShhc3RzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhc3RzLmxlbmd0aDsgKytpKSB7XG4gICAgICByZXNbaV0gPSBhc3RzW2ldLnZpc2l0KHRoaXMpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgdmlzaXRDaGFpbihhc3Q6IENoYWluLCBjb250ZXh0OiBhbnkpIHsgdGhpcy5zaW1wbGUgPSBmYWxzZTsgfVxuXG4gIHZpc2l0UXVvdGUoYXN0OiBRdW90ZSwgY29udGV4dDogYW55KSB7IHRoaXMuc2ltcGxlID0gZmFsc2U7IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
