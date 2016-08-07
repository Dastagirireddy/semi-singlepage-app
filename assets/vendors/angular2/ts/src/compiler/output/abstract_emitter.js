System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', './output_ast'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, exceptions_1, o;
    var _SINGLE_QUOTE_ESCAPE_STRING_RE, CATCH_ERROR_VAR, CATCH_STACK_VAR, OutputEmitter, _EmittedLine, EmitterVisitorContext, AbstractEmitterVisitor;
    function escapeSingleQuoteString(input, escapeDollar) {
        if (lang_1.isBlank(input)) {
            return null;
        }
        var body = lang_1.StringWrapper.replaceAllMapped(input, _SINGLE_QUOTE_ESCAPE_STRING_RE, function (match) {
            if (match[0] == '$') {
                return escapeDollar ? '\\$' : '$';
            }
            else if (match[0] == '\n') {
                return '\\n';
            }
            else if (match[0] == '\r') {
                return '\\r';
            }
            else {
                return "\\" + match[0];
            }
        });
        return "'" + body + "'";
    }
    exports_1("escapeSingleQuoteString", escapeSingleQuoteString);
    function _createIndent(count) {
        var res = '';
        for (var i = 0; i < count; i++) {
            res += '  ';
        }
        return res;
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (o_1) {
                o = o_1;
            }],
        execute: function() {
            _SINGLE_QUOTE_ESCAPE_STRING_RE = /'|\\|\n|\r|\$/g;
            exports_1("CATCH_ERROR_VAR", CATCH_ERROR_VAR = o.variable('error'));
            exports_1("CATCH_STACK_VAR", CATCH_STACK_VAR = o.variable('stack'));
            OutputEmitter = (function () {
                function OutputEmitter() {
                }
                return OutputEmitter;
            }());
            exports_1("OutputEmitter", OutputEmitter);
            _EmittedLine = (function () {
                function _EmittedLine(indent) {
                    this.indent = indent;
                    this.parts = [];
                }
                return _EmittedLine;
            }());
            EmitterVisitorContext = (function () {
                function EmitterVisitorContext(_exportedVars, _indent) {
                    this._exportedVars = _exportedVars;
                    this._indent = _indent;
                    this._classes = [];
                    this._lines = [new _EmittedLine(_indent)];
                }
                EmitterVisitorContext.createRoot = function (exportedVars) {
                    return new EmitterVisitorContext(exportedVars, 0);
                };
                Object.defineProperty(EmitterVisitorContext.prototype, "_currentLine", {
                    get: function () { return this._lines[this._lines.length - 1]; },
                    enumerable: true,
                    configurable: true
                });
                EmitterVisitorContext.prototype.isExportedVar = function (varName) { return this._exportedVars.indexOf(varName) !== -1; };
                EmitterVisitorContext.prototype.println = function (lastPart) {
                    if (lastPart === void 0) { lastPart = ''; }
                    this.print(lastPart, true);
                };
                EmitterVisitorContext.prototype.lineIsEmpty = function () { return this._currentLine.parts.length === 0; };
                EmitterVisitorContext.prototype.print = function (part, newLine) {
                    if (newLine === void 0) { newLine = false; }
                    if (part.length > 0) {
                        this._currentLine.parts.push(part);
                    }
                    if (newLine) {
                        this._lines.push(new _EmittedLine(this._indent));
                    }
                };
                EmitterVisitorContext.prototype.removeEmptyLastLine = function () {
                    if (this.lineIsEmpty()) {
                        this._lines.pop();
                    }
                };
                EmitterVisitorContext.prototype.incIndent = function () {
                    this._indent++;
                    this._currentLine.indent = this._indent;
                };
                EmitterVisitorContext.prototype.decIndent = function () {
                    this._indent--;
                    this._currentLine.indent = this._indent;
                };
                EmitterVisitorContext.prototype.pushClass = function (clazz) { this._classes.push(clazz); };
                EmitterVisitorContext.prototype.popClass = function () { return this._classes.pop(); };
                Object.defineProperty(EmitterVisitorContext.prototype, "currentClass", {
                    get: function () {
                        return this._classes.length > 0 ? this._classes[this._classes.length - 1] : null;
                    },
                    enumerable: true,
                    configurable: true
                });
                EmitterVisitorContext.prototype.toSource = function () {
                    var lines = this._lines;
                    if (lines[lines.length - 1].parts.length === 0) {
                        lines = lines.slice(0, lines.length - 1);
                    }
                    return lines.map(function (line) {
                        if (line.parts.length > 0) {
                            return _createIndent(line.indent) + line.parts.join('');
                        }
                        else {
                            return '';
                        }
                    })
                        .join('\n');
                };
                return EmitterVisitorContext;
            }());
            exports_1("EmitterVisitorContext", EmitterVisitorContext);
            AbstractEmitterVisitor = (function () {
                function AbstractEmitterVisitor(_escapeDollarInStrings) {
                    this._escapeDollarInStrings = _escapeDollarInStrings;
                }
                AbstractEmitterVisitor.prototype.visitExpressionStmt = function (stmt, ctx) {
                    stmt.expr.visitExpression(this, ctx);
                    ctx.println(';');
                    return null;
                };
                AbstractEmitterVisitor.prototype.visitReturnStmt = function (stmt, ctx) {
                    ctx.print("return ");
                    stmt.value.visitExpression(this, ctx);
                    ctx.println(';');
                    return null;
                };
                AbstractEmitterVisitor.prototype.visitIfStmt = function (stmt, ctx) {
                    ctx.print("if (");
                    stmt.condition.visitExpression(this, ctx);
                    ctx.print(") {");
                    var hasElseCase = lang_1.isPresent(stmt.falseCase) && stmt.falseCase.length > 0;
                    if (stmt.trueCase.length <= 1 && !hasElseCase) {
                        ctx.print(" ");
                        this.visitAllStatements(stmt.trueCase, ctx);
                        ctx.removeEmptyLastLine();
                        ctx.print(" ");
                    }
                    else {
                        ctx.println();
                        ctx.incIndent();
                        this.visitAllStatements(stmt.trueCase, ctx);
                        ctx.decIndent();
                        if (hasElseCase) {
                            ctx.println("} else {");
                            ctx.incIndent();
                            this.visitAllStatements(stmt.falseCase, ctx);
                            ctx.decIndent();
                        }
                    }
                    ctx.println("}");
                    return null;
                };
                AbstractEmitterVisitor.prototype.visitThrowStmt = function (stmt, ctx) {
                    ctx.print("throw ");
                    stmt.error.visitExpression(this, ctx);
                    ctx.println(";");
                    return null;
                };
                AbstractEmitterVisitor.prototype.visitCommentStmt = function (stmt, ctx) {
                    var lines = stmt.comment.split('\n');
                    lines.forEach(function (line) { ctx.println("// " + line); });
                    return null;
                };
                AbstractEmitterVisitor.prototype.visitWriteVarExpr = function (expr, ctx) {
                    var lineWasEmpty = ctx.lineIsEmpty();
                    if (!lineWasEmpty) {
                        ctx.print('(');
                    }
                    ctx.print(expr.name + " = ");
                    expr.value.visitExpression(this, ctx);
                    if (!lineWasEmpty) {
                        ctx.print(')');
                    }
                    return null;
                };
                AbstractEmitterVisitor.prototype.visitWriteKeyExpr = function (expr, ctx) {
                    var lineWasEmpty = ctx.lineIsEmpty();
                    if (!lineWasEmpty) {
                        ctx.print('(');
                    }
                    expr.receiver.visitExpression(this, ctx);
                    ctx.print("[");
                    expr.index.visitExpression(this, ctx);
                    ctx.print("] = ");
                    expr.value.visitExpression(this, ctx);
                    if (!lineWasEmpty) {
                        ctx.print(')');
                    }
                    return null;
                };
                AbstractEmitterVisitor.prototype.visitWritePropExpr = function (expr, ctx) {
                    var lineWasEmpty = ctx.lineIsEmpty();
                    if (!lineWasEmpty) {
                        ctx.print('(');
                    }
                    expr.receiver.visitExpression(this, ctx);
                    ctx.print("." + expr.name + " = ");
                    expr.value.visitExpression(this, ctx);
                    if (!lineWasEmpty) {
                        ctx.print(')');
                    }
                    return null;
                };
                AbstractEmitterVisitor.prototype.visitInvokeMethodExpr = function (expr, ctx) {
                    expr.receiver.visitExpression(this, ctx);
                    var name = expr.name;
                    if (lang_1.isPresent(expr.builtin)) {
                        name = this.getBuiltinMethodName(expr.builtin);
                        if (lang_1.isBlank(name)) {
                            // some builtins just mean to skip the call.
                            // e.g. `bind` in Dart.
                            return null;
                        }
                    }
                    ctx.print("." + name + "(");
                    this.visitAllExpressions(expr.args, ctx, ",");
                    ctx.print(")");
                    return null;
                };
                AbstractEmitterVisitor.prototype.visitInvokeFunctionExpr = function (expr, ctx) {
                    expr.fn.visitExpression(this, ctx);
                    ctx.print("(");
                    this.visitAllExpressions(expr.args, ctx, ',');
                    ctx.print(")");
                    return null;
                };
                AbstractEmitterVisitor.prototype.visitReadVarExpr = function (ast, ctx) {
                    var varName = ast.name;
                    if (lang_1.isPresent(ast.builtin)) {
                        switch (ast.builtin) {
                            case o.BuiltinVar.Super:
                                varName = 'super';
                                break;
                            case o.BuiltinVar.This:
                                varName = 'this';
                                break;
                            case o.BuiltinVar.CatchError:
                                varName = CATCH_ERROR_VAR.name;
                                break;
                            case o.BuiltinVar.CatchStack:
                                varName = CATCH_STACK_VAR.name;
                                break;
                            default:
                                throw new exceptions_1.BaseException("Unknown builtin variable " + ast.builtin);
                        }
                    }
                    ctx.print(varName);
                    return null;
                };
                AbstractEmitterVisitor.prototype.visitInstantiateExpr = function (ast, ctx) {
                    ctx.print("new ");
                    ast.classExpr.visitExpression(this, ctx);
                    ctx.print("(");
                    this.visitAllExpressions(ast.args, ctx, ',');
                    ctx.print(")");
                    return null;
                };
                AbstractEmitterVisitor.prototype.visitLiteralExpr = function (ast, ctx) {
                    var value = ast.value;
                    if (lang_1.isString(value)) {
                        ctx.print(escapeSingleQuoteString(value, this._escapeDollarInStrings));
                    }
                    else if (lang_1.isBlank(value)) {
                        ctx.print('null');
                    }
                    else {
                        ctx.print("" + value);
                    }
                    return null;
                };
                AbstractEmitterVisitor.prototype.visitConditionalExpr = function (ast, ctx) {
                    ctx.print("(");
                    ast.condition.visitExpression(this, ctx);
                    ctx.print('? ');
                    ast.trueCase.visitExpression(this, ctx);
                    ctx.print(': ');
                    ast.falseCase.visitExpression(this, ctx);
                    ctx.print(")");
                    return null;
                };
                AbstractEmitterVisitor.prototype.visitNotExpr = function (ast, ctx) {
                    ctx.print('!');
                    ast.condition.visitExpression(this, ctx);
                    return null;
                };
                AbstractEmitterVisitor.prototype.visitBinaryOperatorExpr = function (ast, ctx) {
                    var opStr;
                    switch (ast.operator) {
                        case o.BinaryOperator.Equals:
                            opStr = '==';
                            break;
                        case o.BinaryOperator.Identical:
                            opStr = '===';
                            break;
                        case o.BinaryOperator.NotEquals:
                            opStr = '!=';
                            break;
                        case o.BinaryOperator.NotIdentical:
                            opStr = '!==';
                            break;
                        case o.BinaryOperator.And:
                            opStr = '&&';
                            break;
                        case o.BinaryOperator.Or:
                            opStr = '||';
                            break;
                        case o.BinaryOperator.Plus:
                            opStr = '+';
                            break;
                        case o.BinaryOperator.Minus:
                            opStr = '-';
                            break;
                        case o.BinaryOperator.Divide:
                            opStr = '/';
                            break;
                        case o.BinaryOperator.Multiply:
                            opStr = '*';
                            break;
                        case o.BinaryOperator.Modulo:
                            opStr = '%';
                            break;
                        case o.BinaryOperator.Lower:
                            opStr = '<';
                            break;
                        case o.BinaryOperator.LowerEquals:
                            opStr = '<=';
                            break;
                        case o.BinaryOperator.Bigger:
                            opStr = '>';
                            break;
                        case o.BinaryOperator.BiggerEquals:
                            opStr = '>=';
                            break;
                        default:
                            throw new exceptions_1.BaseException("Unknown operator " + ast.operator);
                    }
                    ctx.print("(");
                    ast.lhs.visitExpression(this, ctx);
                    ctx.print(" " + opStr + " ");
                    ast.rhs.visitExpression(this, ctx);
                    ctx.print(")");
                    return null;
                };
                AbstractEmitterVisitor.prototype.visitReadPropExpr = function (ast, ctx) {
                    ast.receiver.visitExpression(this, ctx);
                    ctx.print(".");
                    ctx.print(ast.name);
                    return null;
                };
                AbstractEmitterVisitor.prototype.visitReadKeyExpr = function (ast, ctx) {
                    ast.receiver.visitExpression(this, ctx);
                    ctx.print("[");
                    ast.index.visitExpression(this, ctx);
                    ctx.print("]");
                    return null;
                };
                AbstractEmitterVisitor.prototype.visitLiteralArrayExpr = function (ast, ctx) {
                    var useNewLine = ast.entries.length > 1;
                    ctx.print("[", useNewLine);
                    ctx.incIndent();
                    this.visitAllExpressions(ast.entries, ctx, ',', useNewLine);
                    ctx.decIndent();
                    ctx.print("]", useNewLine);
                    return null;
                };
                AbstractEmitterVisitor.prototype.visitLiteralMapExpr = function (ast, ctx) {
                    var _this = this;
                    var useNewLine = ast.entries.length > 1;
                    ctx.print("{", useNewLine);
                    ctx.incIndent();
                    this.visitAllObjects(function (entry) {
                        ctx.print(escapeSingleQuoteString(entry[0], _this._escapeDollarInStrings) + ": ");
                        entry[1].visitExpression(_this, ctx);
                    }, ast.entries, ctx, ',', useNewLine);
                    ctx.decIndent();
                    ctx.print("}", useNewLine);
                    return null;
                };
                AbstractEmitterVisitor.prototype.visitAllExpressions = function (expressions, ctx, separator, newLine) {
                    var _this = this;
                    if (newLine === void 0) { newLine = false; }
                    this.visitAllObjects(function (expr) { return expr.visitExpression(_this, ctx); }, expressions, ctx, separator, newLine);
                };
                AbstractEmitterVisitor.prototype.visitAllObjects = function (handler, expressions, ctx, separator, newLine) {
                    if (newLine === void 0) { newLine = false; }
                    for (var i = 0; i < expressions.length; i++) {
                        if (i > 0) {
                            ctx.print(separator, newLine);
                        }
                        handler(expressions[i]);
                    }
                    if (newLine) {
                        ctx.println();
                    }
                };
                AbstractEmitterVisitor.prototype.visitAllStatements = function (statements, ctx) {
                    var _this = this;
                    statements.forEach(function (stmt) { return stmt.visitStatement(_this, ctx); });
                };
                return AbstractEmitterVisitor;
            }());
            exports_1("AbstractEmitterVisitor", AbstractEmitterVisitor);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9vdXRwdXQvYWJzdHJhY3RfZW1pdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBWUksOEJBQThCLEVBQ3ZCLGVBQWUsRUFDZixlQUFlO0lBbVkxQixpQ0FBd0MsS0FBYSxFQUFFLFlBQXFCO1FBQzFFLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUM7UUFDRCxJQUFJLElBQUksR0FBRyxvQkFBYSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSw4QkFBOEIsRUFBRSxVQUFDLEtBQUs7WUFDckYsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLE1BQU0sQ0FBQyxZQUFZLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQztZQUNwQyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2YsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDNUIsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNmLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsT0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFHLENBQUM7WUFDekIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLE1BQUksSUFBSSxNQUFHLENBQUM7SUFDckIsQ0FBQztJQWhCRCw2REFnQkMsQ0FBQTtJQUVELHVCQUF1QixLQUFhO1FBQ2xDLElBQUksR0FBRyxHQUFHLEVB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Q0FBQztnQkFFRCxtREFBa0IsR0FBbEIsVUFBbUIsVUFBeUIsRUFBRSxHQUEwQjtvQkFBeEUsaUJBRUM7b0JBREMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksSUFBTyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0UsQ0FBQztnQkFDSCw2QkFBQztZQUFELENBalRBLEFBaVRDLElBQUE7WUFqVEQsMkRBaVRDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL291dHB1dC9hYnN0cmFjdF9lbWl0dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgaXNQcmVzZW50LFxuICBpc0JsYW5rLFxuICBpc1N0cmluZyxcbiAgZXZhbEV4cHJlc3Npb24sXG4gIFJlZ0V4cFdyYXBwZXIsXG4gIFN0cmluZ1dyYXBwZXJcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7TGlzdFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb24sIHVuaW1wbGVtZW50ZWR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQgKiBhcyBvIGZyb20gJy4vb3V0cHV0X2FzdCc7XG5cbnZhciBfU0lOR0xFX1FVT1RFX0VTQ0FQRV9TVFJJTkdfUkUgPSAvJ3xcXFxcfFxcbnxcXHJ8XFwkL2c7XG5leHBvcnQgdmFyIENBVENIX0VSUk9SX1ZBUiA9IG8udmFyaWFibGUoJ2Vycm9yJyk7XG5leHBvcnQgdmFyIENBVENIX1NUQUNLX1ZBUiA9IG8udmFyaWFibGUoJ3N0YWNrJyk7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBPdXRwdXRFbWl0dGVyIHtcbiAgYWJzdHJhY3QgZW1pdFN0YXRlbWVudHMobW9kdWxlVXJsOiBzdHJpbmcsIHN0bXRzOiBvLlN0YXRlbWVudFtdLCBleHBvcnRlZFZhcnM6IHN0cmluZ1tdKTogc3RyaW5nO1xufVxuXG5jbGFzcyBfRW1pdHRlZExpbmUge1xuICBwYXJ0czogc3RyaW5nW10gPSBbXTtcbiAgY29uc3RydWN0b3IocHVibGljIGluZGVudDogbnVtYmVyKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgRW1pdHRlclZpc2l0b3JDb250ZXh0IHtcbiAgc3RhdGljIGNyZWF0ZVJvb3QoZXhwb3J0ZWRWYXJzOiBzdHJpbmdbXSk6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCB7XG4gICAgcmV0dXJuIG5ldyBFbWl0dGVyVmlzaXRvckNvbnRleHQoZXhwb3J0ZWRWYXJzLCAwKTtcbiAgfVxuXG4gIHByaXZhdGUgX2xpbmVzOiBfRW1pdHRlZExpbmVbXTtcbiAgcHJpdmF0ZSBfY2xhc3Nlczogby5DbGFzc1N0bXRbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2V4cG9ydGVkVmFyczogc3RyaW5nW10sIHByaXZhdGUgX2luZGVudDogbnVtYmVyKSB7XG4gICAgdGhpcy5fbGluZXMgPSBbbmV3IF9FbWl0dGVkTGluZShfaW5kZW50KV07XG4gIH1cblxuICBwcml2YXRlIGdldCBfY3VycmVudExpbmUoKTogX0VtaXR0ZWRMaW5lIHsgcmV0dXJuIHRoaXMuX2xpbmVzW3RoaXMuX2xpbmVzLmxlbmd0aCAtIDFdOyB9XG5cbiAgaXNFeHBvcnRlZFZhcih2YXJOYW1lOiBzdHJpbmcpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2V4cG9ydGVkVmFycy5pbmRleE9mKHZhck5hbWUpICE9PSAtMTsgfVxuXG4gIHByaW50bG4obGFzdFBhcnQ6IHN0cmluZyA9ICcnKTogdm9pZCB7IHRoaXMucHJpbnQobGFzdFBhcnQsIHRydWUpOyB9XG5cbiAgbGluZUlzRW1wdHkoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9jdXJyZW50TGluZS5wYXJ0cy5sZW5ndGggPT09IDA7IH1cblxuICBwcmludChwYXJ0OiBzdHJpbmcsIG5ld0xpbmU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGlmIChwYXJ0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRMaW5lLnBhcnRzLnB1c2gocGFydCk7XG4gICAgfVxuICAgIGlmIChuZXdMaW5lKSB7XG4gICAgICB0aGlzLl9saW5lcy5wdXNoKG5ldyBfRW1pdHRlZExpbmUodGhpcy5faW5kZW50KSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRW1wdHlMYXN0TGluZSgpIHtcbiAgICBpZiAodGhpcy5saW5lSXNFbXB0eSgpKSB7XG4gICAgICB0aGlzLl9saW5lcy5wb3AoKTtcbiAgICB9XG4gIH1cblxuICBpbmNJbmRlbnQoKSB7XG4gICAgdGhpcy5faW5kZW50Kys7XG4gICAgdGhpcy5fY3VycmVudExpbmUuaW5kZW50ID0gdGhpcy5faW5kZW50O1xuICB9XG5cbiAgZGVjSW5kZW50KCkge1xuICAgIHRoaXMuX2luZGVudC0tO1xuICAgIHRoaXMuX2N1cnJlbnRMaW5lLmluZGVudCA9IHRoaXMuX2luZGVudDtcbiAgfVxuXG4gIHB1c2hDbGFzcyhjbGF6ejogby5DbGFzc1N0bXQpIHsgdGhpcy5fY2xhc3Nlcy5wdXNoKGNsYXp6KTsgfVxuXG4gIHBvcENsYXNzKCk6IG8uQ2xhc3NTdG10IHsgcmV0dXJuIHRoaXMuX2NsYXNzZXMucG9wKCk7IH1cblxuICBnZXQgY3VycmVudENsYXNzKCk6IG8uQ2xhc3NTdG10IHtcbiAgICByZXR1cm4gdGhpcy5fY2xhc3Nlcy5sZW5ndGggPiAwID8gdGhpcy5fY2xhc3Nlc1t0aGlzLl9jbGFzc2VzLmxlbmd0aCAtIDFdIDogbnVsbDtcbiAgfVxuXG4gIHRvU291cmNlKCk6IGFueSB7XG4gICAgdmFyIGxpbmVzID0gdGhpcy5fbGluZXM7XG4gICAgaWYgKGxpbmVzW2xpbmVzLmxlbmd0aCAtIDFdLnBhcnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgbGluZXMgPSBsaW5lcy5zbGljZSgwLCBsaW5lcy5sZW5ndGggLSAxKTtcbiAgICB9XG4gICAgcmV0dXJuIGxpbmVzLm1hcCgobGluZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKGxpbmUucGFydHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NyZWF0ZUluZGVudChsaW5lLmluZGVudCkgKyBsaW5lLnBhcnRzLmpvaW4oJycpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIC5qb2luKCdcXG4nKTtcbiAgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RFbWl0dGVyVmlzaXRvciBpbXBsZW1lbnRzIG8uU3RhdGVtZW50VmlzaXRvciwgby5FeHByZXNzaW9uVmlzaXRvciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VzY2FwZURvbGxhckluU3RyaW5nczogYm9vbGVhbikge31cblxuICB2aXNpdEV4cHJlc3Npb25TdG10KHN0bXQ6IG8uRXhwcmVzc2lvblN0YXRlbWVudCwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIHN0bXQuZXhwci52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICBjdHgucHJpbnRsbignOycpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmlzaXRSZXR1cm5TdG10KHN0bXQ6IG8uUmV0dXJuU3RhdGVtZW50LCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgY3R4LnByaW50KGByZXR1cm4gYCk7XG4gICAgc3RtdC52YWx1ZS52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICBjdHgucHJpbnRsbignOycpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgYWJzdHJhY3QgdmlzaXRDYXN0RXhwcihhc3Q6IG8uQ2FzdEV4cHIsIGNvbnRleHQ6IGFueSk6IGFueTtcblxuICBhYnN0cmFjdCB2aXNpdERlY2xhcmVDbGFzc1N0bXQoc3RtdDogby5DbGFzc1N0bXQsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55O1xuXG4gIHZpc2l0SWZTdG10KHN0bXQ6IG8uSWZTdG10LCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgY3R4LnByaW50KGBpZiAoYCk7XG4gICAgc3RtdC5jb25kaXRpb24udmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgY3R4LnByaW50KGApIHtgKTtcbiAgICB2YXIgaGFzRWxzZUNhc2UgPSBpc1ByZXNlbnQoc3RtdC5mYWxzZUNhc2UpICYmIHN0bXQuZmFsc2VDYXNlLmxlbmd0aCA+IDA7XG4gICAgaWYgKHN0bXQudHJ1ZUNhc2UubGVuZ3RoIDw9IDEgJiYgIWhhc0Vsc2VDYXNlKSB7XG4gICAgICBjdHgucHJpbnQoYCBgKTtcbiAgICAgIHRoaXMudmlzaXRBbGxTdGF0ZW1lbnRzKHN0bXQudHJ1ZUNhc2UsIGN0eCk7XG4gICAgICBjdHgucmVtb3ZlRW1wdHlMYXN0TGluZSgpO1xuICAgICAgY3R4LnByaW50KGAgYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN0eC5wcmludGxuKCk7XG4gICAgICBjdHguaW5jSW5kZW50KCk7XG4gICAgICB0aGlzLnZpc2l0QWxsU3RhdGVtZW50cyhzdG10LnRydWVDYXNlLCBjdHgpO1xuICAgICAgY3R4LmRlY0luZGVudCgpO1xuICAgICAgaWYgKGhhc0Vsc2VDYXNlKSB7XG4gICAgICAgIGN0eC5wcmludGxuKGB9IGVsc2Uge2ApO1xuICAgICAgICBjdHguaW5jSW5kZW50KCk7XG4gICAgICAgIHRoaXMudmlzaXRBbGxTdGF0ZW1lbnRzKHN0bXQuZmFsc2VDYXNlLCBjdHgpO1xuICAgICAgICBjdHguZGVjSW5kZW50KCk7XG4gICAgICB9XG4gICAgfVxuICAgIGN0eC5wcmludGxuKGB9YCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBhYnN0cmFjdCB2aXNpdFRyeUNhdGNoU3RtdChzdG10OiBvLlRyeUNhdGNoU3RtdCwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnk7XG5cbiAgdmlzaXRUaHJvd1N0bXQoc3RtdDogby5UaHJvd1N0bXQsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICBjdHgucHJpbnQoYHRocm93IGApO1xuICAgIHN0bXQuZXJyb3IudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgY3R4LnByaW50bG4oYDtgKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdENvbW1lbnRTdG10KHN0bXQ6IG8uQ29tbWVudFN0bXQsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICB2YXIgbGluZXMgPSBzdG10LmNvbW1lbnQuc3BsaXQoJ1xcbicpO1xuICAgIGxpbmVzLmZvckVhY2goKGxpbmUpID0+IHsgY3R4LnByaW50bG4oYC8vICR7bGluZX1gKTsgfSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgYWJzdHJhY3QgdmlzaXREZWNsYXJlVmFyU3RtdChzdG10OiBvLkRlY2xhcmVWYXJTdG10LCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueTtcbiAgdmlzaXRXcml0ZVZhckV4cHIoZXhwcjogby5Xcml0ZVZhckV4cHIsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICB2YXIgbGluZVdhc0VtcHR5ID0gY3R4LmxpbmVJc0VtcHR5KCk7XG4gICAgaWYgKCFsaW5lV2FzRW1wdHkpIHtcbiAgICAgIGN0eC5wcmludCgnKCcpO1xuICAgIH1cbiAgICBjdHgucHJpbnQoYCR7ZXhwci5uYW1lfSA9IGApO1xuICAgIGV4cHIudmFsdWUudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgaWYgKCFsaW5lV2FzRW1wdHkpIHtcbiAgICAgIGN0eC5wcmludCgnKScpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdFdyaXRlS2V5RXhwcihleHByOiBvLldyaXRlS2V5RXhwciwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIHZhciBsaW5lV2FzRW1wdHkgPSBjdHgubGluZUlzRW1wdHkoKTtcbiAgICBpZiAoIWxpbmVXYXNFbXB0eSkge1xuICAgICAgY3R4LnByaW50KCcoJyk7XG4gICAgfVxuICAgIGV4cHIucmVjZWl2ZXIudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgY3R4LnByaW50KGBbYCk7XG4gICAgZXhwci5pbmRleC52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICBjdHgucHJpbnQoYF0gPSBgKTtcbiAgICBleHByLnZhbHVlLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICAgIGlmICghbGluZVdhc0VtcHR5KSB7XG4gICAgICBjdHgucHJpbnQoJyknKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXRXcml0ZVByb3BFeHByKGV4cHI6IG8uV3JpdGVQcm9wRXhwciwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIHZhciBsaW5lV2FzRW1wdHkgPSBjdHgubGluZUlzRW1wdHkoKTtcbiAgICBpZiAoIWxpbmVXYXNFbXB0eSkge1xuICAgICAgY3R4LnByaW50KCcoJyk7XG4gICAgfVxuICAgIGV4cHIucmVjZWl2ZXIudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgY3R4LnByaW50KGAuJHtleHByLm5hbWV9ID0gYCk7XG4gICAgZXhwci52YWx1ZS52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICBpZiAoIWxpbmVXYXNFbXB0eSkge1xuICAgICAgY3R4LnByaW50KCcpJyk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0SW52b2tlTWV0aG9kRXhwcihleHByOiBvLkludm9rZU1ldGhvZEV4cHIsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICBleHByLnJlY2VpdmVyLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICAgIHZhciBuYW1lID0gZXhwci5uYW1lO1xuICAgIGlmIChpc1ByZXNlbnQoZXhwci5idWlsdGluKSkge1xuICAgICAgbmFtZSA9IHRoaXMuZ2V0QnVpbHRpbk1ldGhvZE5hbWUoZXhwci5idWlsdGluKTtcbiAgICAgIGlmIChpc0JsYW5rKG5hbWUpKSB7XG4gICAgICAgIC8vIHNvbWUgYnVpbHRpbnMganVzdCBtZWFuIHRvIHNraXAgdGhlIGNhbGwuXG4gICAgICAgIC8vIGUuZy4gYGJpbmRgIGluIERhcnQuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBjdHgucHJpbnQoYC4ke25hbWV9KGApO1xuICAgIHRoaXMudmlzaXRBbGxFeHByZXNzaW9ucyhleHByLmFyZ3MsIGN0eCwgYCxgKTtcbiAgICBjdHgucHJpbnQoYClgKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGFic3RyYWN0IGdldEJ1aWx0aW5NZXRob2ROYW1lKG1ldGhvZDogby5CdWlsdGluTWV0aG9kKTogc3RyaW5nO1xuXG4gIHZpc2l0SW52b2tlRnVuY3Rpb25FeHByKGV4cHI6IG8uSW52b2tlRnVuY3Rpb25FeHByLCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgZXhwci5mbi52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICBjdHgucHJpbnQoYChgKTtcbiAgICB0aGlzLnZpc2l0QWxsRXhwcmVzc2lvbnMoZXhwci5hcmdzLCBjdHgsICcsJyk7XG4gICAgY3R4LnByaW50KGApYCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXRSZWFkVmFyRXhwcihhc3Q6IG8uUmVhZFZhckV4cHIsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICB2YXIgdmFyTmFtZSA9IGFzdC5uYW1lO1xuICAgIGlmIChpc1ByZXNlbnQoYXN0LmJ1aWx0aW4pKSB7XG4gICAgICBzd2l0Y2ggKGFzdC5idWlsdGluKSB7XG4gICAgICAgIGNhc2Ugby5CdWlsdGluVmFyLlN1cGVyOlxuICAgICAgICAgIHZhck5hbWUgPSAnc3VwZXInO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIG8uQnVpbHRpblZhci5UaGlzOlxuICAgICAgICAgIHZhck5hbWUgPSAndGhpcyc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Ugby5CdWlsdGluVmFyLkNhdGNoRXJyb3I6XG4gICAgICAgICAgdmFyTmFtZSA9IENBVENIX0VSUk9SX1ZBUi5uYW1lO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIG8uQnVpbHRpblZhci5DYXRjaFN0YWNrOlxuICAgICAgICAgIHZhck5hbWUgPSBDQVRDSF9TVEFDS19WQVIubmFtZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgVW5rbm93biBidWlsdGluIHZhcmlhYmxlICR7YXN0LmJ1aWx0aW59YCk7XG4gICAgICB9XG4gICAgfVxuICAgIGN0eC5wcmludCh2YXJOYW1lKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdEluc3RhbnRpYXRlRXhwcihhc3Q6IG8uSW5zdGFudGlhdGVFeHByLCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgY3R4LnByaW50KGBuZXcgYCk7XG4gICAgYXN0LmNsYXNzRXhwci52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICBjdHgucHJpbnQoYChgKTtcbiAgICB0aGlzLnZpc2l0QWxsRXhwcmVzc2lvbnMoYXN0LmFyZ3MsIGN0eCwgJywnKTtcbiAgICBjdHgucHJpbnQoYClgKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdExpdGVyYWxFeHByKGFzdDogby5MaXRlcmFsRXhwciwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIHZhciB2YWx1ZSA9IGFzdC52YWx1ZTtcbiAgICBpZiAoaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICBjdHgucHJpbnQoZXNjYXBlU2luZ2xlUXVvdGVTdHJpbmcodmFsdWUsIHRoaXMuX2VzY2FwZURvbGxhckluU3RyaW5ncykpO1xuICAgIH0gZWxzZSBpZiAoaXNCbGFuayh2YWx1ZSkpIHtcbiAgICAgIGN0eC5wcmludCgnbnVsbCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdHgucHJpbnQoYCR7dmFsdWV9YCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgYWJzdHJhY3QgdmlzaXRFeHRlcm5hbEV4cHIoYXN0OiBvLkV4dGVybmFsRXhwciwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnk7XG5cbiAgdmlzaXRDb25kaXRpb25hbEV4cHIoYXN0OiBvLkNvbmRpdGlvbmFsRXhwciwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIGN0eC5wcmludChgKGApO1xuICAgIGFzdC5jb25kaXRpb24udmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgY3R4LnByaW50KCc/ICcpO1xuICAgIGFzdC50cnVlQ2FzZS52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICBjdHgucHJpbnQoJzogJyk7XG4gICAgYXN0LmZhbHNlQ2FzZS52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICBjdHgucHJpbnQoYClgKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdE5vdEV4cHIoYXN0OiBvLk5vdEV4cHIsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICBjdHgucHJpbnQoJyEnKTtcbiAgICBhc3QuY29uZGl0aW9uLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGFic3RyYWN0IHZpc2l0RnVuY3Rpb25FeHByKGFzdDogby5GdW5jdGlvbkV4cHIsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55O1xuICBhYnN0cmFjdCB2aXNpdERlY2xhcmVGdW5jdGlvblN0bXQoc3RtdDogby5EZWNsYXJlRnVuY3Rpb25TdG10LCBjb250ZXh0OiBhbnkpOiBhbnk7XG5cbiAgdmlzaXRCaW5hcnlPcGVyYXRvckV4cHIoYXN0OiBvLkJpbmFyeU9wZXJhdG9yRXhwciwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIHZhciBvcFN0cjtcbiAgICBzd2l0Y2ggKGFzdC5vcGVyYXRvcikge1xuICAgICAgY2FzZSBvLkJpbmFyeU9wZXJhdG9yLkVxdWFsczpcbiAgICAgICAgb3BTdHIgPSAnPT0nO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Ugby5CaW5hcnlPcGVyYXRvci5JZGVudGljYWw6XG4gICAgICAgIG9wU3RyID0gJz09PSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBvLkJpbmFyeU9wZXJhdG9yLk5vdEVxdWFsczpcbiAgICAgICAgb3BTdHIgPSAnIT0nO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Ugby5CaW5hcnlPcGVyYXRvci5Ob3RJZGVudGljYWw6XG4gICAgICAgIG9wU3RyID0gJyE9PSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBvLkJpbmFyeU9wZXJhdG9yLkFuZDpcbiAgICAgICAgb3BTdHIgPSAnJiYnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Ugby5CaW5hcnlPcGVyYXRvci5PcjpcbiAgICAgICAgb3BTdHIgPSAnfHwnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Ugby5CaW5hcnlPcGVyYXRvci5QbHVzOlxuICAgICAgICBvcFN0ciA9ICcrJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIG8uQmluYXJ5T3BlcmF0b3IuTWludXM6XG4gICAgICAgIG9wU3RyID0gJy0nO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Ugby5CaW5hcnlPcGVyYXRvci5EaXZpZGU6XG4gICAgICAgIG9wU3RyID0gJy8nO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Ugby5CaW5hcnlPcGVyYXRvci5NdWx0aXBseTpcbiAgICAgICAgb3BTdHIgPSAnKic7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBvLkJpbmFyeU9wZXJhdG9yLk1vZHVsbzpcbiAgICAgICAgb3BTdHIgPSAnJSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBvLkJpbmFyeU9wZXJhdG9yLkxvd2VyOlxuICAgICAgICBvcFN0ciA9ICc8JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIG8uQmluYXJ5T3BlcmF0b3IuTG93ZXJFcXVhbHM6XG4gICAgICAgIG9wU3RyID0gJzw9JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIG8uQmluYXJ5T3BlcmF0b3IuQmlnZ2VyOlxuICAgICAgICBvcFN0ciA9ICc+JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIG8uQmluYXJ5T3BlcmF0b3IuQmlnZ2VyRXF1YWxzOlxuICAgICAgICBvcFN0ciA9ICc+PSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYFVua25vd24gb3BlcmF0b3IgJHthc3Qub3BlcmF0b3J9YCk7XG4gICAgfVxuICAgIGN0eC5wcmludChgKGApO1xuICAgIGFzdC5saHMudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgY3R4LnByaW50KGAgJHtvcFN0cn0gYCk7XG4gICAgYXN0LnJocy52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICBjdHgucHJpbnQoYClgKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZpc2l0UmVhZFByb3BFeHByKGFzdDogby5SZWFkUHJvcEV4cHIsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICBhc3QucmVjZWl2ZXIudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgY3R4LnByaW50KGAuYCk7XG4gICAgY3R4LnByaW50KGFzdC5uYW1lKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdFJlYWRLZXlFeHByKGFzdDogby5SZWFkS2V5RXhwciwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIGFzdC5yZWNlaXZlci52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICBjdHgucHJpbnQoYFtgKTtcbiAgICBhc3QuaW5kZXgudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgY3R4LnByaW50KGBdYCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXRMaXRlcmFsQXJyYXlFeHByKGFzdDogby5MaXRlcmFsQXJyYXlFeHByLCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgdmFyIHVzZU5ld0xpbmUgPSBhc3QuZW50cmllcy5sZW5ndGggPiAxO1xuICAgIGN0eC5wcmludChgW2AsIHVzZU5ld0xpbmUpO1xuICAgIGN0eC5pbmNJbmRlbnQoKTtcbiAgICB0aGlzLnZpc2l0QWxsRXhwcmVzc2lvbnMoYXN0LmVudHJpZXMsIGN0eCwgJywnLCB1c2VOZXdMaW5lKTtcbiAgICBjdHguZGVjSW5kZW50KCk7XG4gICAgY3R4LnByaW50KGBdYCwgdXNlTmV3TGluZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXRMaXRlcmFsTWFwRXhwcihhc3Q6IG8uTGl0ZXJhbE1hcEV4cHIsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICB2YXIgdXNlTmV3TGluZSA9IGFzdC5lbnRyaWVzLmxlbmd0aCA+IDE7XG4gICAgY3R4LnByaW50KGB7YCwgdXNlTmV3TGluZSk7XG4gICAgY3R4LmluY0luZGVudCgpO1xuICAgIHRoaXMudmlzaXRBbGxPYmplY3RzKChlbnRyeSkgPT4ge1xuICAgICAgY3R4LnByaW50KGAke2VzY2FwZVNpbmdsZVF1b3RlU3RyaW5nKGVudHJ5WzBdLCB0aGlzLl9lc2NhcGVEb2xsYXJJblN0cmluZ3MpfTogYCk7XG4gICAgICBlbnRyeVsxXS52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICB9LCBhc3QuZW50cmllcywgY3R4LCAnLCcsIHVzZU5ld0xpbmUpO1xuICAgIGN0eC5kZWNJbmRlbnQoKTtcbiAgICBjdHgucHJpbnQoYH1gLCB1c2VOZXdMaW5lKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZpc2l0QWxsRXhwcmVzc2lvbnMoZXhwcmVzc2lvbnM6IG8uRXhwcmVzc2lvbltdLCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCwgc2VwYXJhdG9yOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgbmV3TGluZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgdGhpcy52aXNpdEFsbE9iamVjdHMoKGV4cHIpID0+IGV4cHIudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCksIGV4cHJlc3Npb25zLCBjdHgsIHNlcGFyYXRvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICBuZXdMaW5lKTtcbiAgfVxuXG4gIHZpc2l0QWxsT2JqZWN0cyhoYW5kbGVyOiBGdW5jdGlvbiwgZXhwcmVzc2lvbnM6IGFueSwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQsXG4gICAgICAgICAgICAgICAgICBzZXBhcmF0b3I6IHN0cmluZywgbmV3TGluZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHByZXNzaW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgIGN0eC5wcmludChzZXBhcmF0b3IsIG5ld0xpbmUpO1xuICAgICAgfVxuICAgICAgaGFuZGxlcihleHByZXNzaW9uc1tpXSk7XG4gICAgfVxuICAgIGlmIChuZXdMaW5lKSB7XG4gICAgICBjdHgucHJpbnRsbigpO1xuICAgIH1cbiAgfVxuXG4gIHZpc2l0QWxsU3RhdGVtZW50cyhzdGF0ZW1lbnRzOiBvLlN0YXRlbWVudFtdLCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IHZvaWQge1xuICAgIHN0YXRlbWVudHMuZm9yRWFjaCgoc3RtdCkgPT4geyByZXR1cm4gc3RtdC52aXNpdFN0YXRlbWVudCh0aGlzLCBjdHgpOyB9KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlU2luZ2xlUXVvdGVTdHJpbmcoaW5wdXQ6IHN0cmluZywgZXNjYXBlRG9sbGFyOiBib29sZWFuKTogYW55IHtcbiAgaWYgKGlzQmxhbmsoaW5wdXQpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmFyIGJvZHkgPSBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGxNYXBwZWQoaW5wdXQsIF9TSU5HTEVfUVVPVEVfRVNDQVBFX1NUUklOR19SRSwgKG1hdGNoKSA9PiB7XG4gICAgaWYgKG1hdGNoWzBdID09ICckJykge1xuICAgICAgcmV0dXJuIGVzY2FwZURvbGxhciA/ICdcXFxcJCcgOiAnJCc7XG4gICAgfSBlbHNlIGlmIChtYXRjaFswXSA9PSAnXFxuJykge1xuICAgICAgcmV0dXJuICdcXFxcbic7XG4gICAgfSBlbHNlIGlmIChtYXRjaFswXSA9PSAnXFxyJykge1xuICAgICAgcmV0dXJuICdcXFxccic7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgXFxcXCR7bWF0Y2hbMF19YDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYCcke2JvZHl9J2A7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVJbmRlbnQoY291bnQ6IG51bWJlcik6IHN0cmluZyB7XG4gIHZhciByZXMgPSAnJztcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgcmVzICs9ICcgICc7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
