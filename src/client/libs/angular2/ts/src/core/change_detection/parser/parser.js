System.register(['angular2/src/core/di/decorators', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/collection', './lexer', 'angular2/src/core/reflection/reflection', './ast'], function(exports_1, context_1) {
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
    var decorators_1, lang_1, exceptions_1, collection_1, lexer_1, reflection_1, ast_1;
    var _implicitReceiver, INTERPOLATION_REGEXP, ParseException, SplitInterpolation, Parser, _ParseAST, SimpleExpressionChecker;
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
            function (reflection_1_1) {
                reflection_1 = reflection_1_1;
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
            Parser = (function () {
                function Parser(/** @internal */ _lexer, providedReflector) {
                    if (providedReflector === void 0) { providedReflector = null; }
                    this._lexer = _lexer;
                    this._reflector = lang_1.isPresent(providedReflector) ? providedReflector : reflection_1.reflector;
                }
                Parser.prototype.parseAction = function (input, location) {
                    this._checkNoInterpolation(input, location);
                    var tokens = this._lexer.tokenize(input);
                    var ast = new _ParseAST(input, location, tokens, this._reflector, true).parseChain();
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
                    var tokens = this._lexer.tokenize(input);
                    return new _ParseAST(input, location, tokens, this._reflector, false).parseChain();
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
                    return new _ParseAST(input, location, tokens, this._reflector, false).parseTemplateBindings();
                };
                Parser.prototype.parseInterpolation = function (input, location) {
                    var split = this.splitInterpolation(input, location);
                    if (split == null)
                        return null;
                    var expressions = [];
                    for (var i = 0; i < split.expressions.length; ++i) {
                        var tokens = this._lexer.tokenize(split.expressions[i]);
                        var ast = new _ParseAST(input, location, tokens, this._reflector, false).parseChain();
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
                    __metadata('design:paramtypes', [lexer_1.Lexer, reflection_1.Reflector])
                ], Parser);
                return Parser;
            }());
            exports_1("Parser", Parser);
            _ParseAST = (function () {
                function _ParseAST(input, location, tokens, reflector, parseAction) {
                    this.input = input;
                    this.location = location;
                    this.tokens = tokens;
                    this.reflector = reflector;
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
                _ParseAST.prototype.optionalKeywordVar = function () {
                    if (this.peekKeywordVar()) {
                        this.advance();
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                _ParseAST.prototype.peekKeywordVar = function () { return this.next.isKeywordVar() || this.next.isOperator('#'); };
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
                        var fn = this.reflector.method(id);
                        return isSafe ? new ast_1.SafeMethodCall(receiver, id, fn, args) :
                            new ast_1.MethodCall(receiver, id, fn, args);
                    }
                    else {
                        if (isSafe) {
                            if (this.optionalOperator("=")) {
                                this.error("The '?.' operator cannot be used in the assignment");
                            }
                            else {
                                return new ast_1.SafePropertyRead(receiver, id, this.reflector.getter(id));
                            }
                        }
                        else {
                            if (this.optionalOperator("=")) {
                                if (!this.parseAction) {
                                    this.error("Bindings cannot contain assignments");
                                }
                                var value = this.parseConditional();
                                return new ast_1.PropertyWrite(receiver, id, this.reflector.setter(id), value);
                            }
                            else {
                                return new ast_1.PropertyRead(receiver, id, this.reflector.getter(id));
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
                    while (this.index < this.tokens.length) {
                        var keyIsVar = this.optionalKeywordVar();
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
                        else if (this.next !== lexer_1.EOF && !this.peekKeywordVar()) {
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
                    return bindings;
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
                SimpleExpressionChecker.prototype.visitImplicitReceiver = function (ast) { };
                SimpleExpressionChecker.prototype.visitInterpolation = function (ast) { this.simple = false; };
                SimpleExpressionChecker.prototype.visitLiteralPrimitive = function (ast) { };
                SimpleExpressionChecker.prototype.visitPropertyRead = function (ast) { };
                SimpleExpressionChecker.prototype.visitPropertyWrite = function (ast) { this.simple = false; };
                SimpleExpressionChecker.prototype.visitSafePropertyRead = function (ast) { this.simple = false; };
                SimpleExpressionChecker.prototype.visitMethodCall = function (ast) { this.simple = false; };
                SimpleExpressionChecker.prototype.visitSafeMethodCall = function (ast) { this.simple = false; };
                SimpleExpressionChecker.prototype.visitFunctionCall = function (ast) { this.simple = false; };
                SimpleExpressionChecker.prototype.visitLiteralArray = function (ast) { this.visitAll(ast.expressions); };
                SimpleExpressionChecker.prototype.visitLiteralMap = function (ast) { this.visitAll(ast.values); };
                SimpleExpressionChecker.prototype.visitBinary = function (ast) { this.simple = false; };
                SimpleExpressionChecker.prototype.visitPrefixNot = function (ast) { this.simple = false; };
                SimpleExpressionChecker.prototype.visitConditional = function (ast) { this.simple = false; };
                SimpleExpressionChecker.prototype.visitPipe = function (ast) { this.simple = false; };
                SimpleExpressionChecker.prototype.visitKeyedRead = function (ast) { this.simple = false; };
                SimpleExpressionChecker.prototype.visitKeyedWrite = function (ast) { this.simple = false; };
                SimpleExpressionChecker.prototype.visitAll = function (asts) {
                    var res = collection_1.ListWrapper.createFixedSize(asts.length);
                    for (var i = 0; i < asts.length; ++i) {
                        res[i] = asts[i].visit(this);
                    }
                    return res;
                };
                SimpleExpressionChecker.prototype.visitChain = function (ast) { this.simple = false; };
                SimpleExpressionChecker.prototype.visitQuote = function (ast) { this.simple = false; };
                return SimpleExpressionChecker;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9wYXJzZXIvcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWlESSxpQkFBaUIsRUFFakIsb0JBQW9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBRnBCLGlCQUFpQixHQUFHLElBQUksc0JBQWdCLEVBQUUsQ0FBQztZQUMvQyxvRkFBb0Y7WUFDaEYsb0JBQW9CLEdBQUcscUJBQXFCLENBQUM7WUFFakQ7Z0JBQTZCLGtDQUFhO2dCQUN4Qyx3QkFBWSxPQUFlLEVBQUUsS0FBYSxFQUFFLFdBQW1CLEVBQUUsV0FBaUI7b0JBQ2hGLGtCQUFNLG1CQUFpQixPQUFPLFNBQUksV0FBVyxVQUFLLEtBQUssYUFBUSxXQUFhLENBQUMsQ0FBQztnQkFDaEYsQ0FBQztnQkFDSCxxQkFBQztZQUFELENBSkEsQUFJQyxDQUo0QiwwQkFBYSxHQUl6QztZQUVEO2dCQUNFLDRCQUFtQixPQUFpQixFQUFTLFdBQXFCO29CQUEvQyxZQUFPLEdBQVAsT0FBTyxDQUFVO29CQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFVO2dCQUFHLENBQUM7Z0JBQ3hFLHlCQUFDO1lBQUQsQ0FGQSxBQUVDLElBQUE7WUFGRCxtREFFQyxDQUFBO1lBR0Q7Z0JBSUUsZ0JBQVksZ0JBQWdCLENBQ1QsTUFBYSxFQUFFLGlCQUFtQztvQkFBbkMsaUNBQW1DLEdBQW5DLHdCQUFtQztvQkFBbEQsV0FBTSxHQUFOLE1BQU0sQ0FBTztvQkFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxnQkFBUyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsaUJBQWlCLEdBQUcsc0JBQVMsQ0FBQztnQkFDakYsQ0FBQztnQkFFRCw0QkFBVyxHQUFYLFVBQVksS0FBYSxFQUFFLFFBQWE7b0JBQ3RDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JB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QUFDO1lBQUQsQ0F0REEsQUFzREMsSUFBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vcGFyc2VyL3BhcnNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGkvZGVjb3JhdG9ycyc7XG5pbXBvcnQge2lzQmxhbmssIGlzUHJlc2VudCwgU3RyaW5nV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbiwgV3JhcHBlZEV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7TGlzdFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge1xuICBMZXhlcixcbiAgRU9GLFxuICBpc0lkZW50aWZpZXIsXG4gIFRva2VuLFxuICAkUEVSSU9ELFxuICAkQ09MT04sXG4gICRTRU1JQ09MT04sXG4gICRMQlJBQ0tFVCxcbiAgJFJCUkFDS0VULFxuICAkQ09NTUEsXG4gICRMQlJBQ0UsXG4gICRSQlJBQ0UsXG4gICRMUEFSRU4sXG4gICRSUEFSRU5cbn0gZnJvbSAnLi9sZXhlcic7XG5pbXBvcnQge3JlZmxlY3RvciwgUmVmbGVjdG9yfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9yZWZsZWN0aW9uL3JlZmxlY3Rpb24nO1xuaW1wb3J0IHtcbiAgQVNULFxuICBFbXB0eUV4cHIsXG4gIEltcGxpY2l0UmVjZWl2ZXIsXG4gIFByb3BlcnR5UmVhZCxcbiAgUHJvcGVydHlXcml0ZSxcbiAgU2FmZVByb3BlcnR5UmVhZCxcbiAgTGl0ZXJhbFByaW1pdGl2ZSxcbiAgQmluYXJ5LFxuICBQcmVmaXhOb3QsXG4gIENvbmRpdGlvbmFsLFxuICBCaW5kaW5nUGlwZSxcbiAgQ2hhaW4sXG4gIEtleWVkUmVhZCxcbiAgS2V5ZWRXcml0ZSxcbiAgTGl0ZXJhbEFycmF5LFxuICBMaXRlcmFsTWFwLFxuICBJbnRlcnBvbGF0aW9uLFxuICBNZXRob2RDYWxsLFxuICBTYWZlTWV0aG9kQ2FsbCxcbiAgRnVuY3Rpb25DYWxsLFxuICBUZW1wbGF0ZUJpbmRpbmcsXG4gIEFTVFdpdGhTb3VyY2UsXG4gIEFzdFZpc2l0b3IsXG4gIFF1b3RlXG59IGZyb20gJy4vYXN0JztcblxuXG52YXIgX2ltcGxpY2l0UmVjZWl2ZXIgPSBuZXcgSW1wbGljaXRSZWNlaXZlcigpO1xuLy8gVE9ETyh0Ym9zY2gpOiBDYW5ub3QgbWFrZSB0aGlzIGNvbnN0L2ZpbmFsIHJpZ2h0IG5vdyBiZWNhdXNlIG9mIHRoZSB0cmFuc3BpbGVyLi4uXG52YXIgSU5URVJQT0xBVElPTl9SRUdFWFAgPSAvXFx7XFx7KFtcXHNcXFNdKj8pXFx9XFx9L2c7XG5cbmNsYXNzIFBhcnNlRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZywgaW5wdXQ6IHN0cmluZywgZXJyTG9jYXRpb246IHN0cmluZywgY3R4TG9jYXRpb24/OiBhbnkpIHtcbiAgICBzdXBlcihgUGFyc2VyIEVycm9yOiAke21lc3NhZ2V9ICR7ZXJyTG9jYXRpb259IFske2lucHV0fV0gaW4gJHtjdHhMb2NhdGlvbn1gKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgU3BsaXRJbnRlcnBvbGF0aW9uIHtcbiAgY29uc3RydWN0b3IocHVibGljIHN0cmluZ3M6IHN0cmluZ1tdLCBwdWJsaWMgZXhwcmVzc2lvbnM6IHN0cmluZ1tdKSB7fVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGFyc2VyIHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcmVmbGVjdG9yOiBSZWZsZWN0b3I7XG5cbiAgY29uc3RydWN0b3IoLyoqIEBpbnRlcm5hbCAqL1xuICAgICAgICAgICAgICBwdWJsaWMgX2xleGVyOiBMZXhlciwgcHJvdmlkZWRSZWZsZWN0b3I6IFJlZmxlY3RvciA9IG51bGwpIHtcbiAgICB0aGlzLl9yZWZsZWN0b3IgPSBpc1ByZXNlbnQocHJvdmlkZWRSZWZsZWN0b3IpID8gcHJvdmlkZWRSZWZsZWN0b3IgOiByZWZsZWN0b3I7XG4gIH1cblxuICBwYXJzZUFjdGlvbihpbnB1dDogc3RyaW5nLCBsb2NhdGlvbjogYW55KTogQVNUV2l0aFNvdXJjZSB7XG4gICAgdGhpcy5fY2hlY2tOb0ludGVycG9sYXRpb24oaW5wdXQsIGxvY2F0aW9uKTtcbiAgICB2YXIgdG9rZW5zID0gdGhpcy5fbGV4ZXIudG9rZW5pemUoaW5wdXQpO1xuICAgIHZhciBhc3QgPSBuZXcgX1BhcnNlQVNUKGlucHV0LCBsb2NhdGlvbiwgdG9rZW5zLCB0aGlzLl9yZWZsZWN0b3IsIHRydWUpLnBhcnNlQ2hhaW4oKTtcbiAgICByZXR1cm4gbmV3IEFTVFdpdGhTb3VyY2UoYXN0LCBpbnB1dCwgbG9jYXRpb24pO1xuICB9XG5cbiAgcGFyc2VCaW5kaW5nKGlucHV0OiBzdHJpbmcsIGxvY2F0aW9uOiBhbnkpOiBBU1RXaXRoU291cmNlIHtcbiAgICB2YXIgYXN0ID0gdGhpcy5fcGFyc2VCaW5kaW5nQXN0KGlucHV0LCBsb2NhdGlvbik7XG4gICAgcmV0dXJuIG5ldyBBU1RXaXRoU291cmNlKGFzdCwgaW5wdXQsIGxvY2F0aW9uKTtcbiAgfVxuXG4gIHBhcnNlU2ltcGxlQmluZGluZyhpbnB1dDogc3RyaW5nLCBsb2NhdGlvbjogc3RyaW5nKTogQVNUV2l0aFNvdXJjZSB7XG4gICAgdmFyIGFzdCA9IHRoaXMuX3BhcnNlQmluZGluZ0FzdChpbnB1dCwgbG9jYXRpb24pO1xuICAgIGlmICghU2ltcGxlRXhwcmVzc2lvbkNoZWNrZXIuY2hlY2soYXN0KSkge1xuICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uKFxuICAgICAgICAgICdIb3N0IGJpbmRpbmcgZXhwcmVzc2lvbiBjYW4gb25seSBjb250YWluIGZpZWxkIGFjY2VzcyBhbmQgY29uc3RhbnRzJywgaW5wdXQsIGxvY2F0aW9uKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBBU1RXaXRoU291cmNlKGFzdCwgaW5wdXQsIGxvY2F0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlQmluZGluZ0FzdChpbnB1dDogc3RyaW5nLCBsb2NhdGlvbjogc3RyaW5nKTogQVNUIHtcbiAgICAvLyBRdW90ZXMgZXhwcmVzc2lvbnMgdXNlIDNyZC1wYXJ0eSBleHByZXNzaW9uIGxhbmd1YWdlLiBXZSBkb24ndCB3YW50IHRvIHVzZVxuICAgIC8vIG91ciBsZXhlciBvciBwYXJzZXIgZm9yIHRoYXQsIHNvIHdlIGNoZWNrIGZvciB0aGF0IGFoZWFkIG9mIHRpbWUuXG4gICAgdmFyIHF1b3RlID0gdGhpcy5fcGFyc2VRdW90ZShpbnB1dCwgbG9jYXRpb24pO1xuXG4gICAgaWYgKGlzUHJlc2VudChxdW90ZSkpIHtcbiAgICAgIHJldHVybiBxdW90ZTtcbiAgICB9XG5cbiAgICB0aGlzLl9jaGVja05vSW50ZXJwb2xhdGlvbihpbnB1dCwgbG9jYXRpb24pO1xuICAgIHZhciB0b2tlbnMgPSB0aGlzLl9sZXhlci50b2tlbml6ZShpbnB1dCk7XG4gICAgcmV0dXJuIG5ldyBfUGFyc2VBU1QoaW5wdXQsIGxvY2F0aW9uLCB0b2tlbnMsIHRoaXMuX3JlZmxlY3RvciwgZmFsc2UpLnBhcnNlQ2hhaW4oKTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlUXVvdGUoaW5wdXQ6IHN0cmluZywgbG9jYXRpb246IGFueSk6IEFTVCB7XG4gICAgaWYgKGlzQmxhbmsoaW5wdXQpKSByZXR1cm4gbnVsbDtcbiAgICB2YXIgcHJlZml4U2VwYXJhdG9ySW5kZXggPSBpbnB1dC5pbmRleE9mKCc6Jyk7XG4gICAgaWYgKHByZWZpeFNlcGFyYXRvckluZGV4ID09IC0xKSByZXR1cm4gbnVsbDtcbiAgICB2YXIgcHJlZml4ID0gaW5wdXQuc3Vic3RyaW5nKDAsIHByZWZpeFNlcGFyYXRvckluZGV4KS50cmltKCk7XG4gICAgaWYgKCFpc0lkZW50aWZpZXIocHJlZml4KSkgcmV0dXJuIG51bGw7XG4gICAgdmFyIHVuaW50ZXJwcmV0ZWRFeHByZXNzaW9uID0gaW5wdXQuc3Vic3RyaW5nKHByZWZpeFNlcGFyYXRvckluZGV4ICsgMSk7XG4gICAgcmV0dXJuIG5ldyBRdW90ZShwcmVmaXgsIHVuaW50ZXJwcmV0ZWRFeHByZXNzaW9uLCBsb2NhdGlvbik7XG4gIH1cblxuICBwYXJzZVRlbXBsYXRlQmluZGluZ3MoaW5wdXQ6IHN0cmluZywgbG9jYXRpb246IGFueSk6IFRlbXBsYXRlQmluZGluZ1tdIHtcbiAgICB2YXIgdG9rZW5zID0gdGhpcy5fbGV4ZXIudG9rZW5pemUoaW5wdXQpO1xuICAgIHJldHVybiBuZXcgX1BhcnNlQVNUKGlucHV0LCBsb2NhdGlvbiwgdG9rZW5zLCB0aGlzLl9yZWZsZWN0b3IsIGZhbHNlKS5wYXJzZVRlbXBsYXRlQmluZGluZ3MoKTtcbiAgfVxuXG4gIHBhcnNlSW50ZXJwb2xhdGlvbihpbnB1dDogc3RyaW5nLCBsb2NhdGlvbjogYW55KTogQVNUV2l0aFNvdXJjZSB7XG4gICAgbGV0IHNwbGl0ID0gdGhpcy5zcGxpdEludGVycG9sYXRpb24oaW5wdXQsIGxvY2F0aW9uKTtcbiAgICBpZiAoc3BsaXQgPT0gbnVsbCkgcmV0dXJuIG51bGw7XG5cbiAgICBsZXQgZXhwcmVzc2lvbnMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3BsaXQuZXhwcmVzc2lvbnMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciB0b2tlbnMgPSB0aGlzLl9sZXhlci50b2tlbml6ZShzcGxpdC5leHByZXNzaW9uc1tpXSk7XG4gICAgICB2YXIgYXN0ID0gbmV3IF9QYXJzZUFTVChpbnB1dCwgbG9jYXRpb24sIHRva2VucywgdGhpcy5fcmVmbGVjdG9yLCBmYWxzZSkucGFyc2VDaGFpbigpO1xuICAgICAgZXhwcmVzc2lvbnMucHVzaChhc3QpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUV2l0aFNvdXJjZShuZXcgSW50ZXJwb2xhdGlvbihzcGxpdC5zdHJpbmdzLCBleHByZXNzaW9ucyksIGlucHV0LCBsb2NhdGlvbik7XG4gIH1cblxuICBzcGxpdEludGVycG9sYXRpb24oaW5wdXQ6IHN0cmluZywgbG9jYXRpb246IHN0cmluZyk6IFNwbGl0SW50ZXJwb2xhdGlvbiB7XG4gICAgdmFyIHBhcnRzID0gU3RyaW5nV3JhcHBlci5zcGxpdChpbnB1dCwgSU5URVJQT0xBVElPTl9SRUdFWFApO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPD0gMSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciBzdHJpbmdzID0gW107XG4gICAgdmFyIGV4cHJlc3Npb25zID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcGFydDogc3RyaW5nID0gcGFydHNbaV07XG4gICAgICBpZiAoaSAlIDIgPT09IDApIHtcbiAgICAgICAgLy8gZml4ZWQgc3RyaW5nXG4gICAgICAgIHN0cmluZ3MucHVzaChwYXJ0KTtcbiAgICAgIH0gZWxzZSBpZiAocGFydC50cmltKCkubGVuZ3RoID4gMCkge1xuICAgICAgICBleHByZXNzaW9ucy5wdXNoKHBhcnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uKCdCbGFuayBleHByZXNzaW9ucyBhcmUgbm90IGFsbG93ZWQgaW4gaW50ZXJwb2xhdGVkIHN0cmluZ3MnLCBpbnB1dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBhdCBjb2x1bW4gJHt0aGlzLl9maW5kSW50ZXJwb2xhdGlvbkVycm9yQ29sdW1uKHBhcnRzLCBpKX0gaW5gLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3IFNwbGl0SW50ZXJwb2xhdGlvbihzdHJpbmdzLCBleHByZXNzaW9ucyk7XG4gIH1cblxuICB3cmFwTGl0ZXJhbFByaW1pdGl2ZShpbnB1dDogc3RyaW5nLCBsb2NhdGlvbjogYW55KTogQVNUV2l0aFNvdXJjZSB7XG4gICAgcmV0dXJuIG5ldyBBU1RXaXRoU291cmNlKG5ldyBMaXRlcmFsUHJpbWl0aXZlKGlucHV0KSwgaW5wdXQsIGxvY2F0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NoZWNrTm9JbnRlcnBvbGF0aW9uKGlucHV0OiBzdHJpbmcsIGxvY2F0aW9uOiBhbnkpOiB2b2lkIHtcbiAgICB2YXIgcGFydHMgPSBTdHJpbmdXcmFwcGVyLnNwbGl0KGlucHV0LCBJTlRFUlBPTEFUSU9OX1JFR0VYUCk7XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbignR290IGludGVycG9sYXRpb24gKHt7fX0pIHdoZXJlIGV4cHJlc3Npb24gd2FzIGV4cGVjdGVkJywgaW5wdXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGF0IGNvbHVtbiAke3RoaXMuX2ZpbmRJbnRlcnBvbGF0aW9uRXJyb3JDb2x1bW4ocGFydHMsIDEpfSBpbmAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2ZpbmRJbnRlcnBvbGF0aW9uRXJyb3JDb2x1bW4ocGFydHM6IHN0cmluZ1tdLCBwYXJ0SW5FcnJJZHg6IG51bWJlcik6IG51bWJlciB7XG4gICAgdmFyIGVyckxvY2F0aW9uID0gJyc7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBwYXJ0SW5FcnJJZHg7IGorKykge1xuICAgICAgZXJyTG9jYXRpb24gKz0gaiAlIDIgPT09IDAgPyBwYXJ0c1tqXSA6IGB7eyR7cGFydHNbal19fX1gO1xuICAgIH1cblxuICAgIHJldHVybiBlcnJMb2NhdGlvbi5sZW5ndGg7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIF9QYXJzZUFTVCB7XG4gIGluZGV4OiBudW1iZXIgPSAwO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgaW5wdXQ6IHN0cmluZywgcHVibGljIGxvY2F0aW9uOiBhbnksIHB1YmxpYyB0b2tlbnM6IGFueVtdLFxuICAgICAgICAgICAgICBwdWJsaWMgcmVmbGVjdG9yOiBSZWZsZWN0b3IsIHB1YmxpYyBwYXJzZUFjdGlvbjogYm9vbGVhbikge31cblxuICBwZWVrKG9mZnNldDogbnVtYmVyKTogVG9rZW4ge1xuICAgIHZhciBpID0gdGhpcy5pbmRleCArIG9mZnNldDtcbiAgICByZXR1cm4gaSA8IHRoaXMudG9rZW5zLmxlbmd0aCA/IHRoaXMudG9rZW5zW2ldIDogRU9GO1xuICB9XG5cbiAgZ2V0IG5leHQoKTogVG9rZW4geyByZXR1cm4gdGhpcy5wZWVrKDApOyB9XG5cbiAgZ2V0IGlucHV0SW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKHRoaXMuaW5kZXggPCB0aGlzLnRva2Vucy5sZW5ndGgpID8gdGhpcy5uZXh0LmluZGV4IDogdGhpcy5pbnB1dC5sZW5ndGg7XG4gIH1cblxuICBhZHZhbmNlKCkgeyB0aGlzLmluZGV4Kys7IH1cblxuICBvcHRpb25hbENoYXJhY3Rlcihjb2RlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5uZXh0LmlzQ2hhcmFjdGVyKGNvZGUpKSB7XG4gICAgICB0aGlzLmFkdmFuY2UoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgb3B0aW9uYWxLZXl3b3JkVmFyKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnBlZWtLZXl3b3JkVmFyKCkpIHtcbiAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwZWVrS2V5d29yZFZhcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMubmV4dC5pc0tleXdvcmRWYXIoKSB8fCB0aGlzLm5leHQuaXNPcGVyYXRvcignIycpOyB9XG5cbiAgZXhwZWN0Q2hhcmFjdGVyKGNvZGU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLm9wdGlvbmFsQ2hhcmFjdGVyKGNvZGUpKSByZXR1cm47XG4gICAgdGhpcy5lcnJvcihgTWlzc2luZyBleHBlY3RlZCAke1N0cmluZ1dyYXBwZXIuZnJvbUNoYXJDb2RlKGNvZGUpfWApO1xuICB9XG5cblxuICBvcHRpb25hbE9wZXJhdG9yKG9wOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5uZXh0LmlzT3BlcmF0b3Iob3ApKSB7XG4gICAgICB0aGlzLmFkdmFuY2UoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZXhwZWN0T3BlcmF0b3Iob3BlcmF0b3I6IHN0cmluZykge1xuICAgIGlmICh0aGlzLm9wdGlvbmFsT3BlcmF0b3Iob3BlcmF0b3IpKSByZXR1cm47XG4gICAgdGhpcy5lcnJvcihgTWlzc2luZyBleHBlY3RlZCBvcGVyYXRvciAke29wZXJhdG9yfWApO1xuICB9XG5cbiAgZXhwZWN0SWRlbnRpZmllck9yS2V5d29yZCgpOiBzdHJpbmcge1xuICAgIHZhciBuID0gdGhpcy5uZXh0O1xuICAgIGlmICghbi5pc0lkZW50aWZpZXIoKSAmJiAhbi5pc0tleXdvcmQoKSkge1xuICAgICAgdGhpcy5lcnJvcihgVW5leHBlY3RlZCB0b2tlbiAke259LCBleHBlY3RlZCBpZGVudGlmaWVyIG9yIGtleXdvcmRgKTtcbiAgICB9XG4gICAgdGhpcy5hZHZhbmNlKCk7XG4gICAgcmV0dXJuIG4udG9TdHJpbmcoKTtcbiAgfVxuXG4gIGV4cGVjdElkZW50aWZpZXJPcktleXdvcmRPclN0cmluZygpOiBzdHJpbmcge1xuICAgIHZhciBuID0gdGhpcy5uZXh0O1xuICAgIGlmICghbi5pc0lkZW50aWZpZXIoKSAmJiAhbi5pc0tleXdvcmQoKSAmJiAhbi5pc1N0cmluZygpKSB7XG4gICAgICB0aGlzLmVycm9yKGBVbmV4cGVjdGVkIHRva2VuICR7bn0sIGV4cGVjdGVkIGlkZW50aWZpZXIsIGtleXdvcmQsIG9yIHN0cmluZ2ApO1xuICAgIH1cbiAgICB0aGlzLmFkdmFuY2UoKTtcbiAgICByZXR1cm4gbi50b1N0cmluZygpO1xuICB9XG5cbiAgcGFyc2VDaGFpbigpOiBBU1Qge1xuICAgIHZhciBleHBycyA9IFtdO1xuICAgIHdoaWxlICh0aGlzLmluZGV4IDwgdGhpcy50b2tlbnMubGVuZ3RoKSB7XG4gICAgICB2YXIgZXhwciA9IHRoaXMucGFyc2VQaXBlKCk7XG4gICAgICBleHBycy5wdXNoKGV4cHIpO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25hbENoYXJhY3RlcigkU0VNSUNPTE9OKSkge1xuICAgICAgICBpZiAoIXRoaXMucGFyc2VBY3Rpb24pIHtcbiAgICAgICAgICB0aGlzLmVycm9yKFwiQmluZGluZyBleHByZXNzaW9uIGNhbm5vdCBjb250YWluIGNoYWluZWQgZXhwcmVzc2lvblwiKTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAodGhpcy5vcHRpb25hbENoYXJhY3RlcigkU0VNSUNPTE9OKSkge1xuICAgICAgICB9ICAvLyByZWFkIGFsbCBzZW1pY29sb25zXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaW5kZXggPCB0aGlzLnRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5lcnJvcihgVW5leHBlY3RlZCB0b2tlbiAnJHt0aGlzLm5leHR9J2ApO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZXhwcnMubGVuZ3RoID09IDApIHJldHVybiBuZXcgRW1wdHlFeHByKCk7XG4gICAgaWYgKGV4cHJzLmxlbmd0aCA9PSAxKSByZXR1cm4gZXhwcnNbMF07XG4gICAgcmV0dXJuIG5ldyBDaGFpbihleHBycyk7XG4gIH1cblxuICBwYXJzZVBpcGUoKTogQVNUIHtcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTtcbiAgICBpZiAodGhpcy5vcHRpb25hbE9wZXJhdG9yKFwifFwiKSkge1xuICAgICAgaWYgKHRoaXMucGFyc2VBY3Rpb24pIHtcbiAgICAgICAgdGhpcy5lcnJvcihcIkNhbm5vdCBoYXZlIGEgcGlwZSBpbiBhbiBhY3Rpb24gZXhwcmVzc2lvblwiKTtcbiAgICAgIH1cblxuICAgICAgZG8ge1xuICAgICAgICB2YXIgbmFtZSA9IHRoaXMuZXhwZWN0SWRlbnRpZmllck9yS2V5d29yZCgpO1xuICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICB3aGlsZSAodGhpcy5vcHRpb25hbENoYXJhY3RlcigkQ09MT04pKSB7XG4gICAgICAgICAgYXJncy5wdXNoKHRoaXMucGFyc2VFeHByZXNzaW9uKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCA9IG5ldyBCaW5kaW5nUGlwZShyZXN1bHQsIG5hbWUsIGFyZ3MpO1xuICAgICAgfSB3aGlsZSAodGhpcy5vcHRpb25hbE9wZXJhdG9yKFwifFwiKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHBhcnNlRXhwcmVzc2lvbigpOiBBU1QgeyByZXR1cm4gdGhpcy5wYXJzZUNvbmRpdGlvbmFsKCk7IH1cblxuICBwYXJzZUNvbmRpdGlvbmFsKCk6IEFTVCB7XG4gICAgdmFyIHN0YXJ0ID0gdGhpcy5pbnB1dEluZGV4O1xuICAgIHZhciByZXN1bHQgPSB0aGlzLnBhcnNlTG9naWNhbE9yKCk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25hbE9wZXJhdG9yKCc/JykpIHtcbiAgICAgIHZhciB5ZXMgPSB0aGlzLnBhcnNlUGlwZSgpO1xuICAgICAgaWYgKCF0aGlzLm9wdGlvbmFsQ2hhcmFjdGVyKCRDT0xPTikpIHtcbiAgICAgICAgdmFyIGVuZCA9IHRoaXMuaW5wdXRJbmRleDtcbiAgICAgICAgdmFyIGV4cHJlc3Npb24gPSB0aGlzLmlucHV0LnN1YnN0cmluZyhzdGFydCwgZW5kKTtcbiAgICAgICAgdGhpcy5lcnJvcihgQ29uZGl0aW9uYWwgZXhwcmVzc2lvbiAke2V4cHJlc3Npb259IHJlcXVpcmVzIGFsbCAzIGV4cHJlc3Npb25zYCk7XG4gICAgICB9XG4gICAgICB2YXIgbm8gPSB0aGlzLnBhcnNlUGlwZSgpO1xuICAgICAgcmV0dXJuIG5ldyBDb25kaXRpb25hbChyZXN1bHQsIHllcywgbm8pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfVxuXG4gIHBhcnNlTG9naWNhbE9yKCk6IEFTVCB7XG4gICAgLy8gJ3x8J1xuICAgIHZhciByZXN1bHQgPSB0aGlzLnBhcnNlTG9naWNhbEFuZCgpO1xuICAgIHdoaWxlICh0aGlzLm9wdGlvbmFsT3BlcmF0b3IoJ3x8JykpIHtcbiAgICAgIHJlc3VsdCA9IG5ldyBCaW5hcnkoJ3x8JywgcmVzdWx0LCB0aGlzLnBhcnNlTG9naWNhbEFuZCgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHBhcnNlTG9naWNhbEFuZCgpOiBBU1Qge1xuICAgIC8vICcmJidcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5wYXJzZUVxdWFsaXR5KCk7XG4gICAgd2hpbGUgKHRoaXMub3B0aW9uYWxPcGVyYXRvcignJiYnKSkge1xuICAgICAgcmVzdWx0ID0gbmV3IEJpbmFyeSgnJiYnLCByZXN1bHQsIHRoaXMucGFyc2VFcXVhbGl0eSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHBhcnNlRXF1YWxpdHkoKTogQVNUIHtcbiAgICAvLyAnPT0nLCchPScsJz09PScsJyE9PSdcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5wYXJzZVJlbGF0aW9uYWwoKTtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgaWYgKHRoaXMub3B0aW9uYWxPcGVyYXRvcignPT0nKSkge1xuICAgICAgICByZXN1bHQgPSBuZXcgQmluYXJ5KCc9PScsIHJlc3VsdCwgdGhpcy5wYXJzZVJlbGF0aW9uYWwoKSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9uYWxPcGVyYXRvcignPT09JykpIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IEJpbmFyeSgnPT09JywgcmVzdWx0LCB0aGlzLnBhcnNlUmVsYXRpb25hbCgpKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25hbE9wZXJhdG9yKCchPScpKSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBCaW5hcnkoJyE9JywgcmVzdWx0LCB0aGlzLnBhcnNlUmVsYXRpb25hbCgpKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25hbE9wZXJhdG9yKCchPT0nKSkge1xuICAgICAgICByZXN1bHQgPSBuZXcgQmluYXJ5KCchPT0nLCByZXN1bHQsIHRoaXMucGFyc2VSZWxhdGlvbmFsKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwYXJzZVJlbGF0aW9uYWwoKTogQVNUIHtcbiAgICAvLyAnPCcsICc+JywgJzw9JywgJz49J1xuICAgIHZhciByZXN1bHQgPSB0aGlzLnBhcnNlQWRkaXRpdmUoKTtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgaWYgKHRoaXMub3B0aW9uYWxPcGVyYXRvcignPCcpKSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBCaW5hcnkoJzwnLCByZXN1bHQsIHRoaXMucGFyc2VBZGRpdGl2ZSgpKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25hbE9wZXJhdG9yKCc+JykpIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IEJpbmFyeSgnPicsIHJlc3VsdCwgdGhpcy5wYXJzZUFkZGl0aXZlKCkpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbmFsT3BlcmF0b3IoJzw9JykpIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IEJpbmFyeSgnPD0nLCByZXN1bHQsIHRoaXMucGFyc2VBZGRpdGl2ZSgpKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25hbE9wZXJhdG9yKCc+PScpKSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBCaW5hcnkoJz49JywgcmVzdWx0LCB0aGlzLnBhcnNlQWRkaXRpdmUoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBhcnNlQWRkaXRpdmUoKTogQVNUIHtcbiAgICAvLyAnKycsICctJ1xuICAgIHZhciByZXN1bHQgPSB0aGlzLnBhcnNlTXVsdGlwbGljYXRpdmUoKTtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgaWYgKHRoaXMub3B0aW9uYWxPcGVyYXRvcignKycpKSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBCaW5hcnkoJysnLCByZXN1bHQsIHRoaXMucGFyc2VNdWx0aXBsaWNhdGl2ZSgpKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25hbE9wZXJhdG9yKCctJykpIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IEJpbmFyeSgnLScsIHJlc3VsdCwgdGhpcy5wYXJzZU11bHRpcGxpY2F0aXZlKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwYXJzZU11bHRpcGxpY2F0aXZlKCk6IEFTVCB7XG4gICAgLy8gJyonLCAnJScsICcvJ1xuICAgIHZhciByZXN1bHQgPSB0aGlzLnBhcnNlUHJlZml4KCk7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbmFsT3BlcmF0b3IoJyonKSkge1xuICAgICAgICByZXN1bHQgPSBuZXcgQmluYXJ5KCcqJywgcmVzdWx0LCB0aGlzLnBhcnNlUHJlZml4KCkpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbmFsT3BlcmF0b3IoJyUnKSkge1xuICAgICAgICByZXN1bHQgPSBuZXcgQmluYXJ5KCclJywgcmVzdWx0LCB0aGlzLnBhcnNlUHJlZml4KCkpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbmFsT3BlcmF0b3IoJy8nKSkge1xuICAgICAgICByZXN1bHQgPSBuZXcgQmluYXJ5KCcvJywgcmVzdWx0LCB0aGlzLnBhcnNlUHJlZml4KCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwYXJzZVByZWZpeCgpOiBBU1Qge1xuICAgIGlmICh0aGlzLm9wdGlvbmFsT3BlcmF0b3IoJysnKSkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyc2VQcmVmaXgoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9uYWxPcGVyYXRvcignLScpKSB7XG4gICAgICByZXR1cm4gbmV3IEJpbmFyeSgnLScsIG5ldyBMaXRlcmFsUHJpbWl0aXZlKDApLCB0aGlzLnBhcnNlUHJlZml4KCkpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25hbE9wZXJhdG9yKCchJykpIHtcbiAgICAgIHJldHVybiBuZXcgUHJlZml4Tm90KHRoaXMucGFyc2VQcmVmaXgoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcnNlQ2FsbENoYWluKCk7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VDYWxsQ2hhaW4oKTogQVNUIHtcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5wYXJzZVByaW1hcnkoKTtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgaWYgKHRoaXMub3B0aW9uYWxDaGFyYWN0ZXIoJFBFUklPRCkpIHtcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5wYXJzZUFjY2Vzc01lbWJlck9yTWV0aG9kQ2FsbChyZXN1bHQsIGZhbHNlKTtcblxuICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbmFsT3BlcmF0b3IoJz8uJykpIHtcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5wYXJzZUFjY2Vzc01lbWJlck9yTWV0aG9kQ2FsbChyZXN1bHQsIHRydWUpO1xuXG4gICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9uYWxDaGFyYWN0ZXIoJExCUkFDS0VUKSkge1xuICAgICAgICB2YXIga2V5ID0gdGhpcy5wYXJzZVBpcGUoKTtcbiAgICAgICAgdGhpcy5leHBlY3RDaGFyYWN0ZXIoJFJCUkFDS0VUKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uYWxPcGVyYXRvcihcIj1cIikpIHtcbiAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLnBhcnNlQ29uZGl0aW9uYWwoKTtcbiAgICAgICAgICByZXN1bHQgPSBuZXcgS2V5ZWRXcml0ZShyZXN1bHQsIGtleSwgdmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdCA9IG5ldyBLZXllZFJlYWQocmVzdWx0LCBrZXkpO1xuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25hbENoYXJhY3RlcigkTFBBUkVOKSkge1xuICAgICAgICB2YXIgYXJncyA9IHRoaXMucGFyc2VDYWxsQXJndW1lbnRzKCk7XG4gICAgICAgIHRoaXMuZXhwZWN0Q2hhcmFjdGVyKCRSUEFSRU4pO1xuICAgICAgICByZXN1bHQgPSBuZXcgRnVuY3Rpb25DYWxsKHJlc3VsdCwgYXJncyk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcGFyc2VQcmltYXJ5KCk6IEFTVCB7XG4gICAgaWYgKHRoaXMub3B0aW9uYWxDaGFyYWN0ZXIoJExQQVJFTikpIHtcbiAgICAgIGxldCByZXN1bHQgPSB0aGlzLnBhcnNlUGlwZSgpO1xuICAgICAgdGhpcy5leHBlY3RDaGFyYWN0ZXIoJFJQQVJFTik7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gZWxzZSBpZiAodGhpcy5uZXh0LmlzS2V5d29yZE51bGwoKSB8fCB0aGlzLm5leHQuaXNLZXl3b3JkVW5kZWZpbmVkKCkpIHtcbiAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgICAgcmV0dXJuIG5ldyBMaXRlcmFsUHJpbWl0aXZlKG51bGwpO1xuXG4gICAgfSBlbHNlIGlmICh0aGlzLm5leHQuaXNLZXl3b3JkVHJ1ZSgpKSB7XG4gICAgICB0aGlzLmFkdmFuY2UoKTtcbiAgICAgIHJldHVybiBuZXcgTGl0ZXJhbFByaW1pdGl2ZSh0cnVlKTtcblxuICAgIH0gZWxzZSBpZiAodGhpcy5uZXh0LmlzS2V5d29yZEZhbHNlKCkpIHtcbiAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgICAgcmV0dXJuIG5ldyBMaXRlcmFsUHJpbWl0aXZlKGZhbHNlKTtcblxuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25hbENoYXJhY3RlcigkTEJSQUNLRVQpKSB7XG4gICAgICB2YXIgZWxlbWVudHMgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbkxpc3QoJFJCUkFDS0VUKTtcbiAgICAgIHRoaXMuZXhwZWN0Q2hhcmFjdGVyKCRSQlJBQ0tFVCk7XG4gICAgICByZXR1cm4gbmV3IExpdGVyYWxBcnJheShlbGVtZW50cyk7XG5cbiAgICB9IGVsc2UgaWYgKHRoaXMubmV4dC5pc0NoYXJhY3RlcigkTEJSQUNFKSkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyc2VMaXRlcmFsTWFwKCk7XG5cbiAgICB9IGVsc2UgaWYgKHRoaXMubmV4dC5pc0lkZW50aWZpZXIoKSkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyc2VBY2Nlc3NNZW1iZXJPck1ldGhvZENhbGwoX2ltcGxpY2l0UmVjZWl2ZXIsIGZhbHNlKTtcblxuICAgIH0gZWxzZSBpZiAodGhpcy5uZXh0LmlzTnVtYmVyKCkpIHtcbiAgICAgIHZhciB2YWx1ZSA9IHRoaXMubmV4dC50b051bWJlcigpO1xuICAgICAgdGhpcy5hZHZhbmNlKCk7XG4gICAgICByZXR1cm4gbmV3IExpdGVyYWxQcmltaXRpdmUodmFsdWUpO1xuXG4gICAgfSBlbHNlIGlmICh0aGlzLm5leHQuaXNTdHJpbmcoKSkge1xuICAgICAgdmFyIGxpdGVyYWxWYWx1ZSA9IHRoaXMubmV4dC50b1N0cmluZygpO1xuICAgICAgdGhpcy5hZHZhbmNlKCk7XG4gICAgICByZXR1cm4gbmV3IExpdGVyYWxQcmltaXRpdmUobGl0ZXJhbFZhbHVlKTtcblxuICAgIH0gZWxzZSBpZiAodGhpcy5pbmRleCA+PSB0aGlzLnRva2Vucy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZXJyb3IoYFVuZXhwZWN0ZWQgZW5kIG9mIGV4cHJlc3Npb246ICR7dGhpcy5pbnB1dH1gKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVycm9yKGBVbmV4cGVjdGVkIHRva2VuICR7dGhpcy5uZXh0fWApO1xuICAgIH1cbiAgICAvLyBlcnJvcigpIHRocm93cywgc28gd2UgZG9uJ3QgcmVhY2ggaGVyZS5cbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcIkZlbGwgdGhyb3VnaCBhbGwgY2FzZXMgaW4gcGFyc2VQcmltYXJ5XCIpO1xuICB9XG5cbiAgcGFyc2VFeHByZXNzaW9uTGlzdCh0ZXJtaW5hdG9yOiBudW1iZXIpOiBhbnlbXSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIGlmICghdGhpcy5uZXh0LmlzQ2hhcmFjdGVyKHRlcm1pbmF0b3IpKSB7XG4gICAgICBkbyB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHRoaXMucGFyc2VQaXBlKCkpO1xuICAgICAgfSB3aGlsZSAodGhpcy5vcHRpb25hbENoYXJhY3RlcigkQ09NTUEpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHBhcnNlTGl0ZXJhbE1hcCgpOiBMaXRlcmFsTWFwIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICB0aGlzLmV4cGVjdENoYXJhY3RlcigkTEJSQUNFKTtcbiAgICBpZiAoIXRoaXMub3B0aW9uYWxDaGFyYWN0ZXIoJFJCUkFDRSkpIHtcbiAgICAgIGRvIHtcbiAgICAgICAgdmFyIGtleSA9IHRoaXMuZXhwZWN0SWRlbnRpZmllck9yS2V5d29yZE9yU3RyaW5nKCk7XG4gICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgICB0aGlzLmV4cGVjdENoYXJhY3RlcigkQ09MT04pO1xuICAgICAgICB2YWx1ZXMucHVzaCh0aGlzLnBhcnNlUGlwZSgpKTtcbiAgICAgIH0gd2hpbGUgKHRoaXMub3B0aW9uYWxDaGFyYWN0ZXIoJENPTU1BKSk7XG4gICAgICB0aGlzLmV4cGVjdENoYXJhY3RlcigkUkJSQUNFKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBMaXRlcmFsTWFwKGtleXMsIHZhbHVlcyk7XG4gIH1cblxuICBwYXJzZUFjY2Vzc01lbWJlck9yTWV0aG9kQ2FsbChyZWNlaXZlcjogQVNULCBpc1NhZmU6IGJvb2xlYW4gPSBmYWxzZSk6IEFTVCB7XG4gICAgbGV0IGlkID0gdGhpcy5leHBlY3RJZGVudGlmaWVyT3JLZXl3b3JkKCk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25hbENoYXJhY3RlcigkTFBBUkVOKSkge1xuICAgICAgbGV0IGFyZ3MgPSB0aGlzLnBhcnNlQ2FsbEFyZ3VtZW50cygpO1xuICAgICAgdGhpcy5leHBlY3RDaGFyYWN0ZXIoJFJQQVJFTik7XG4gICAgICBsZXQgZm4gPSB0aGlzLnJlZmxlY3Rvci5tZXRob2QoaWQpO1xuICAgICAgcmV0dXJuIGlzU2FmZSA/IG5ldyBTYWZlTWV0aG9kQ2FsbChyZWNlaXZlciwgaWQsIGZuLCBhcmdzKSA6XG4gICAgICAgICAgICAgICAgICAgICAgbmV3IE1ldGhvZENhbGwocmVjZWl2ZXIsIGlkLCBmbiwgYXJncyk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGlzU2FmZSkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25hbE9wZXJhdG9yKFwiPVwiKSkge1xuICAgICAgICAgIHRoaXMuZXJyb3IoXCJUaGUgJz8uJyBvcGVyYXRvciBjYW5ub3QgYmUgdXNlZCBpbiB0aGUgYXNzaWdubWVudFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFNhZmVQcm9wZXJ0eVJlYWQocmVjZWl2ZXIsIGlkLCB0aGlzLnJlZmxlY3Rvci5nZXR0ZXIoaWQpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uYWxPcGVyYXRvcihcIj1cIikpIHtcbiAgICAgICAgICBpZiAoIXRoaXMucGFyc2VBY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IoXCJCaW5kaW5ncyBjYW5ub3QgY29udGFpbiBhc3NpZ25tZW50c1wiKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnBhcnNlQ29uZGl0aW9uYWwoKTtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BlcnR5V3JpdGUocmVjZWl2ZXIsIGlkLCB0aGlzLnJlZmxlY3Rvci5zZXR0ZXIoaWQpLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wZXJ0eVJlYWQocmVjZWl2ZXIsIGlkLCB0aGlzLnJlZmxlY3Rvci5nZXR0ZXIoaWQpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcGFyc2VDYWxsQXJndW1lbnRzKCk6IEJpbmRpbmdQaXBlW10ge1xuICAgIGlmICh0aGlzLm5leHQuaXNDaGFyYWN0ZXIoJFJQQVJFTikpIHJldHVybiBbXTtcbiAgICB2YXIgcG9zaXRpb25hbHMgPSBbXTtcbiAgICBkbyB7XG4gICAgICBwb3NpdGlvbmFscy5wdXNoKHRoaXMucGFyc2VQaXBlKCkpO1xuICAgIH0gd2hpbGUgKHRoaXMub3B0aW9uYWxDaGFyYWN0ZXIoJENPTU1BKSk7XG4gICAgcmV0dXJuIHBvc2l0aW9uYWxzO1xuICB9XG5cbiAgcGFyc2VCbG9ja0NvbnRlbnQoKTogQVNUIHtcbiAgICBpZiAoIXRoaXMucGFyc2VBY3Rpb24pIHtcbiAgICAgIHRoaXMuZXJyb3IoXCJCaW5kaW5nIGV4cHJlc3Npb24gY2Fubm90IGNvbnRhaW4gY2hhaW5lZCBleHByZXNzaW9uXCIpO1xuICAgIH1cbiAgICB2YXIgZXhwcnMgPSBbXTtcbiAgICB3aGlsZSAodGhpcy5pbmRleCA8IHRoaXMudG9rZW5zLmxlbmd0aCAmJiAhdGhpcy5uZXh0LmlzQ2hhcmFjdGVyKCRSQlJBQ0UpKSB7XG4gICAgICB2YXIgZXhwciA9IHRoaXMucGFyc2VFeHByZXNzaW9uKCk7XG4gICAgICBleHBycy5wdXNoKGV4cHIpO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25hbENoYXJhY3RlcigkU0VNSUNPTE9OKSkge1xuICAgICAgICB3aGlsZSAodGhpcy5vcHRpb25hbENoYXJhY3RlcigkU0VNSUNPTE9OKSkge1xuICAgICAgICB9ICAvLyByZWFkIGFsbCBzZW1pY29sb25zXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChleHBycy5sZW5ndGggPT0gMCkgcmV0dXJuIG5ldyBFbXB0eUV4cHIoKTtcbiAgICBpZiAoZXhwcnMubGVuZ3RoID09IDEpIHJldHVybiBleHByc1swXTtcblxuICAgIHJldHVybiBuZXcgQ2hhaW4oZXhwcnMpO1xuICB9XG5cblxuICAvKipcbiAgICogQW4gaWRlbnRpZmllciwgYSBrZXl3b3JkLCBhIHN0cmluZyB3aXRoIGFuIG9wdGlvbmFsIGAtYCBpbmJldHdlZW4uXG4gICAqL1xuICBleHBlY3RUZW1wbGF0ZUJpbmRpbmdLZXkoKTogc3RyaW5nIHtcbiAgICB2YXIgcmVzdWx0ID0gJyc7XG4gICAgdmFyIG9wZXJhdG9yRm91bmQgPSBmYWxzZTtcbiAgICBkbyB7XG4gICAgICByZXN1bHQgKz0gdGhpcy5leHBlY3RJZGVudGlmaWVyT3JLZXl3b3JkT3JTdHJpbmcoKTtcbiAgICAgIG9wZXJhdG9yRm91bmQgPSB0aGlzLm9wdGlvbmFsT3BlcmF0b3IoJy0nKTtcbiAgICAgIGlmIChvcGVyYXRvckZvdW5kKSB7XG4gICAgICAgIHJlc3VsdCArPSAnLSc7XG4gICAgICB9XG4gICAgfSB3aGlsZSAob3BlcmF0b3JGb3VuZCk7XG5cbiAgICByZXR1cm4gcmVzdWx0LnRvU3RyaW5nKCk7XG4gIH1cblxuICBwYXJzZVRlbXBsYXRlQmluZGluZ3MoKTogYW55W10ge1xuICAgIHZhciBiaW5kaW5ncyA9IFtdO1xuICAgIHZhciBwcmVmaXggPSBudWxsO1xuICAgIHdoaWxlICh0aGlzLmluZGV4IDwgdGhpcy50b2tlbnMubGVuZ3RoKSB7XG4gICAgICB2YXIga2V5SXNWYXI6IGJvb2xlYW4gPSB0aGlzLm9wdGlvbmFsS2V5d29yZFZhcigpO1xuICAgICAgdmFyIGtleSA9IHRoaXMuZXhwZWN0VGVtcGxhdGVCaW5kaW5nS2V5KCk7XG4gICAgICBpZiAoIWtleUlzVmFyKSB7XG4gICAgICAgIGlmIChwcmVmaXggPT0gbnVsbCkge1xuICAgICAgICAgIHByZWZpeCA9IGtleTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBrZXkgPSBwcmVmaXggKyBrZXlbMF0udG9VcHBlckNhc2UoKSArIGtleS5zdWJzdHJpbmcoMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMub3B0aW9uYWxDaGFyYWN0ZXIoJENPTE9OKTtcbiAgICAgIHZhciBuYW1lID0gbnVsbDtcbiAgICAgIHZhciBleHByZXNzaW9uID0gbnVsbDtcbiAgICAgIGlmIChrZXlJc1Zhcikge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25hbE9wZXJhdG9yKFwiPVwiKSkge1xuICAgICAgICAgIG5hbWUgPSB0aGlzLmV4cGVjdFRlbXBsYXRlQmluZGluZ0tleSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5hbWUgPSAnXFwkaW1wbGljaXQnO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMubmV4dCAhPT0gRU9GICYmICF0aGlzLnBlZWtLZXl3b3JkVmFyKCkpIHtcbiAgICAgICAgdmFyIHN0YXJ0ID0gdGhpcy5pbnB1dEluZGV4O1xuICAgICAgICB2YXIgYXN0ID0gdGhpcy5wYXJzZVBpcGUoKTtcbiAgICAgICAgdmFyIHNvdXJjZSA9IHRoaXMuaW5wdXQuc3Vic3RyaW5nKHN0YXJ0LCB0aGlzLmlucHV0SW5kZXgpO1xuICAgICAgICBleHByZXNzaW9uID0gbmV3IEFTVFdpdGhTb3VyY2UoYXN0LCBzb3VyY2UsIHRoaXMubG9jYXRpb24pO1xuICAgICAgfVxuICAgICAgYmluZGluZ3MucHVzaChuZXcgVGVtcGxhdGVCaW5kaW5nKGtleSwga2V5SXNWYXIsIG5hbWUsIGV4cHJlc3Npb24pKTtcbiAgICAgIGlmICghdGhpcy5vcHRpb25hbENoYXJhY3RlcigkU0VNSUNPTE9OKSkge1xuICAgICAgICB0aGlzLm9wdGlvbmFsQ2hhcmFjdGVyKCRDT01NQSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBiaW5kaW5ncztcbiAgfVxuXG4gIGVycm9yKG1lc3NhZ2U6IHN0cmluZywgaW5kZXg6IG51bWJlciA9IG51bGwpIHtcbiAgICBpZiAoaXNCbGFuayhpbmRleCkpIGluZGV4ID0gdGhpcy5pbmRleDtcblxuICAgIHZhciBsb2NhdGlvbiA9IChpbmRleCA8IHRoaXMudG9rZW5zLmxlbmd0aCkgPyBgYXQgY29sdW1uICR7dGhpcy50b2tlbnNbaW5kZXhdLmluZGV4ICsgMX0gaW5gIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGF0IHRoZSBlbmQgb2YgdGhlIGV4cHJlc3Npb25gO1xuXG4gICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uKG1lc3NhZ2UsIHRoaXMuaW5wdXQsIGxvY2F0aW9uLCB0aGlzLmxvY2F0aW9uKTtcbiAgfVxufVxuXG5jbGFzcyBTaW1wbGVFeHByZXNzaW9uQ2hlY2tlciBpbXBsZW1lbnRzIEFzdFZpc2l0b3Ige1xuICBzdGF0aWMgY2hlY2soYXN0OiBBU1QpOiBib29sZWFuIHtcbiAgICB2YXIgcyA9IG5ldyBTaW1wbGVFeHByZXNzaW9uQ2hlY2tlcigpO1xuICAgIGFzdC52aXNpdChzKTtcbiAgICByZXR1cm4gcy5zaW1wbGU7XG4gIH1cblxuICBzaW1wbGUgPSB0cnVlO1xuXG4gIHZpc2l0SW1wbGljaXRSZWNlaXZlcihhc3Q6IEltcGxpY2l0UmVjZWl2ZXIpIHt9XG5cbiAgdmlzaXRJbnRlcnBvbGF0aW9uKGFzdDogSW50ZXJwb2xhdGlvbikgeyB0aGlzLnNpbXBsZSA9IGZhbHNlOyB9XG5cbiAgdmlzaXRMaXRlcmFsUHJpbWl0aXZlKGFzdDogTGl0ZXJhbFByaW1pdGl2ZSkge31cblxuICB2aXNpdFByb3BlcnR5UmVhZChhc3Q6IFByb3BlcnR5UmVhZCkge31cblxuICB2aXNpdFByb3BlcnR5V3JpdGUoYXN0OiBQcm9wZXJ0eVdyaXRlKSB7IHRoaXMuc2ltcGxlID0gZmFsc2U7IH1cblxuICB2aXNpdFNhZmVQcm9wZXJ0eVJlYWQoYXN0OiBTYWZlUHJvcGVydHlSZWFkKSB7IHRoaXMuc2ltcGxlID0gZmFsc2U7IH1cblxuICB2aXNpdE1ldGhvZENhbGwoYXN0OiBNZXRob2RDYWxsKSB7IHRoaXMuc2ltcGxlID0gZmFsc2U7IH1cblxuICB2aXNpdFNhZmVNZXRob2RDYWxsKGFzdDogU2FmZU1ldGhvZENhbGwpIHsgdGhpcy5zaW1wbGUgPSBmYWxzZTsgfVxuXG4gIHZpc2l0RnVuY3Rpb25DYWxsKGFzdDogRnVuY3Rpb25DYWxsKSB7IHRoaXMuc2ltcGxlID0gZmFsc2U7IH1cblxuICB2aXNpdExpdGVyYWxBcnJheShhc3Q6IExpdGVyYWxBcnJheSkgeyB0aGlzLnZpc2l0QWxsKGFzdC5leHByZXNzaW9ucyk7IH1cblxuICB2aXNpdExpdGVyYWxNYXAoYXN0OiBMaXRlcmFsTWFwKSB7IHRoaXMudmlzaXRBbGwoYXN0LnZhbHVlcyk7IH1cblxuICB2aXNpdEJpbmFyeShhc3Q6IEJpbmFyeSkgeyB0aGlzLnNpbXBsZSA9IGZhbHNlOyB9XG5cbiAgdmlzaXRQcmVmaXhOb3QoYXN0OiBQcmVmaXhOb3QpIHsgdGhpcy5zaW1wbGUgPSBmYWxzZTsgfVxuXG4gIHZpc2l0Q29uZGl0aW9uYWwoYXN0OiBDb25kaXRpb25hbCkgeyB0aGlzLnNpbXBsZSA9IGZhbHNlOyB9XG5cbiAgdmlzaXRQaXBlKGFzdDogQmluZGluZ1BpcGUpIHsgdGhpcy5zaW1wbGUgPSBmYWxzZTsgfVxuXG4gIHZpc2l0S2V5ZWRSZWFkKGFzdDogS2V5ZWRSZWFkKSB7IHRoaXMuc2ltcGxlID0gZmFsc2U7IH1cblxuICB2aXNpdEtleWVkV3JpdGUoYXN0OiBLZXllZFdyaXRlKSB7IHRoaXMuc2ltcGxlID0gZmFsc2U7IH1cblxuICB2aXNpdEFsbChhc3RzOiBhbnlbXSk6IGFueVtdIHtcbiAgICB2YXIgcmVzID0gTGlzdFdyYXBwZXIuY3JlYXRlRml4ZWRTaXplKGFzdHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFzdHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHJlc1tpXSA9IGFzdHNbaV0udmlzaXQodGhpcyk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICB2aXNpdENoYWluKGFzdDogQ2hhaW4pIHsgdGhpcy5zaW1wbGUgPSBmYWxzZTsgfVxuXG4gIHZpc2l0UXVvdGUoYXN0OiBRdW90ZSkgeyB0aGlzLnNpbXBsZSA9IGZhbHNlOyB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
