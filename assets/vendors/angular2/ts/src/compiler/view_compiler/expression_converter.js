System.register(['../output/output_ast', '../identifiers', 'angular2/src/facade/exceptions', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var o, identifiers_1, exceptions_1, lang_1;
    var IMPLICIT_RECEIVER, ExpressionWithWrappedValueInfo, _Mode, _AstToIrVisitor;
    function convertCdExpressionToIr(nameResolver, implicitReceiver, expression, valueUnwrapper) {
        var visitor = new _AstToIrVisitor(nameResolver, implicitReceiver, valueUnwrapper);
        var irAst = expression.visit(visitor, _Mode.Expression);
        return new ExpressionWithWrappedValueInfo(irAst, visitor.needsValueUnwrapper);
    }
    exports_1("convertCdExpressionToIr", convertCdExpressionToIr);
    function convertCdStatementToIr(nameResolver, implicitReceiver, stmt) {
        var visitor = new _AstToIrVisitor(nameResolver, implicitReceiver, null);
        var statements = [];
        flattenStatements(stmt.visit(visitor, _Mode.Statement), statements);
        return statements;
    }
    exports_1("convertCdStatementToIr", convertCdStatementToIr);
    function ensureStatementMode(mode, ast) {
        if (mode !== _Mode.Statement) {
            throw new exceptions_1.BaseException("Expected a statement, but saw " + ast);
        }
    }
    function ensureExpressionMode(mode, ast) {
        if (mode !== _Mode.Expression) {
            throw new exceptions_1.BaseException("Expected an expression, but saw " + ast);
        }
    }
    function convertToStatementIfNeeded(mode, expr) {
        if (mode === _Mode.Statement) {
            return expr.toStmt();
        }
        else {
            return expr;
        }
    }
    function flattenStatements(arg, output) {
        if (lang_1.isArray(arg)) {
            arg.forEach(function (entry) { return flattenStatements(entry, output); });
        }
        else {
            output.push(arg);
        }
    }
    return {
        setters:[
            function (o_1) {
                o = o_1;
            },
            function (identifiers_1_1) {
                identifiers_1 = identifiers_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            IMPLICIT_RECEIVER = o.variable('#implicit');
            ExpressionWithWrappedValueInfo = (function () {
                function ExpressionWithWrappedValueInfo(expression, needsValueUnwrapper) {
                    this.expression = expression;
                    this.needsValueUnwrapper = needsValueUnwrapper;
                }
                return ExpressionWithWrappedValueInfo;
            }());
            exports_1("ExpressionWithWrappedValueInfo", ExpressionWithWrappedValueInfo);
            (function (_Mode) {
                _Mode[_Mode["Statement"] = 0] = "Statement";
                _Mode[_Mode["Expression"] = 1] = "Expression";
            })(_Mode || (_Mode = {}));
            _AstToIrVisitor = (function () {
                function _AstToIrVisitor(_nameResolver, _implicitReceiver, _valueUnwrapper) {
                    this._nameResolver = _nameResolver;
                    this._implicitReceiver = _implicitReceiver;
                    this._valueUnwrapper = _valueUnwrapper;
                    this.needsValueUnwrapper = false;
                }
                _AstToIrVisitor.prototype.visitBinary = function (ast, mode) {
                    var op;
                    switch (ast.operation) {
                        case '+':
                            op = o.BinaryOperator.Plus;
                            break;
                        case '-':
                            op = o.BinaryOperator.Minus;
                            break;
                        case '*':
                            op = o.BinaryOperator.Multiply;
                            break;
                        case '/':
                            op = o.BinaryOperator.Divide;
                            break;
                        case '%':
                            op = o.BinaryOperator.Modulo;
                            break;
                        case '&&':
                            op = o.BinaryOperator.And;
                            break;
                        case '||':
                            op = o.BinaryOperator.Or;
                            break;
                        case '==':
                            op = o.BinaryOperator.Equals;
                            break;
                        case '!=':
                            op = o.BinaryOperator.NotEquals;
                            break;
                        case '===':
                            op = o.BinaryOperator.Identical;
                            break;
                        case '!==':
                            op = o.BinaryOperator.NotIdentical;
                            break;
                        case '<':
                            op = o.BinaryOperator.Lower;
                            break;
                        case '>':
                            op = o.BinaryOperator.Bigger;
                            break;
                        case '<=':
                            op = o.BinaryOperator.LowerEquals;
                            break;
                        case '>=':
                            op = o.BinaryOperator.BiggerEquals;
                            break;
                        default:
                            throw new exceptions_1.BaseException("Unsupported operation " + ast.operation);
                    }
                    return convertToStatementIfNeeded(mode, new o.BinaryOperatorExpr(op, ast.left.visit(this, _Mode.Expression), ast.right.visit(this, _Mode.Expression)));
                };
                _AstToIrVisitor.prototype.visitChain = function (ast, mode) {
                    ensureStatementMode(mode, ast);
                    return this.visitAll(ast.expressions, mode);
                };
                _AstToIrVisitor.prototype.visitConditional = function (ast, mode) {
                    var value = ast.condition.visit(this, _Mode.Expression);
                    return convertToStatementIfNeeded(mode, value.conditional(ast.trueExp.visit(this, _Mode.Expression), ast.falseExp.visit(this, _Mode.Expression)));
                };
                _AstToIrVisitor.prototype.visitPipe = function (ast, mode) {
                    var input = ast.exp.visit(this, _Mode.Expression);
                    var args = this.visitAll(ast.args, _Mode.Expression);
                    var value = this._nameResolver.callPipe(ast.name, input, args);
                    this.needsValueUnwrapper = true;
                    return convertToStatementIfNeeded(mode, this._valueUnwrapper.callMethod('unwrap', [value]));
                };
                _AstToIrVisitor.prototype.visitFunctionCall = function (ast, mode) {
                    return convertToStatementIfNeeded(mode, ast.target.visit(this, _Mode.Expression)
                        .callFn(this.visitAll(ast.args, _Mode.Expression)));
                };
                _AstToIrVisitor.prototype.visitImplicitReceiver = function (ast, mode) {
                    ensureExpressionMode(mode, ast);
                    return IMPLICIT_RECEIVER;
                };
                _AstToIrVisitor.prototype.visitInterpolation = function (ast, mode) {
                    ensureExpressionMode(mode, ast);
                    var args = [o.literal(ast.expressions.length)];
                    for (var i = 0; i < ast.strings.length - 1; i++) {
                        args.push(o.literal(ast.strings[i]));
                        args.push(ast.expressions[i].visit(this, _Mode.Expression));
                    }
                    args.push(o.literal(ast.strings[ast.strings.length - 1]));
                    return o.importExpr(identifiers_1.Identifiers.interpolate).callFn(args);
                };
                _AstToIrVisitor.prototype.visitKeyedRead = function (ast, mode) {
                    return convertToStatementIfNeeded(mode, ast.obj.visit(this, _Mode.Expression).key(ast.key.visit(this, _Mode.Expression)));
                };
                _AstToIrVisitor.prototype.visitKeyedWrite = function (ast, mode) {
                    var obj = ast.obj.visit(this, _Mode.Expression);
                    var key = ast.key.visit(this, _Mode.Expression);
                    var value = ast.value.visit(this, _Mode.Expression);
                    return convertToStatementIfNeeded(mode, obj.key(key).set(value));
                };
                _AstToIrVisitor.prototype.visitLiteralArray = function (ast, mode) {
                    return convertToStatementIfNeeded(mode, this._nameResolver.createLiteralArray(this.visitAll(ast.expressions, mode)));
                };
                _AstToIrVisitor.prototype.visitLiteralMap = function (ast, mode) {
                    var parts = [];
                    for (var i = 0; i < ast.keys.length; i++) {
                        parts.push([ast.keys[i], ast.values[i].visit(this, _Mode.Expression)]);
                    }
                    return convertToStatementIfNeeded(mode, this._nameResolver.createLiteralMap(parts));
                };
                _AstToIrVisitor.prototype.visitLiteralPrimitive = function (ast, mode) {
                    return convertToStatementIfNeeded(mode, o.literal(ast.value));
                };
                _AstToIrVisitor.prototype.visitMethodCall = function (ast, mode) {
                    var args = this.visitAll(ast.args, _Mode.Expression);
                    var result = null;
                    var receiver = ast.receiver.visit(this, _Mode.Expression);
                    if (receiver === IMPLICIT_RECEIVER) {
                        var varExpr = this._nameResolver.getLocal(ast.name);
                        if (lang_1.isPresent(varExpr)) {
                            result = varExpr.callFn(args);
                        }
                        else {
                            receiver = this._implicitReceiver;
                        }
                    }
                    if (lang_1.isBlank(result)) {
                        result = receiver.callMethod(ast.name, args);
                    }
                    return convertToStatementIfNeeded(mode, result);
                };
                _AstToIrVisitor.prototype.visitPrefixNot = function (ast, mode) {
                    return convertToStatementIfNeeded(mode, o.not(ast.expression.visit(this, _Mode.Expression)));
                };
                _AstToIrVisitor.prototype.visitPropertyRead = function (ast, mode) {
                    var result = null;
                    var receiver = ast.receiver.visit(this, _Mode.Expression);
                    if (receiver === IMPLICIT_RECEIVER) {
                        result = this._nameResolver.getLocal(ast.name);
                        if (lang_1.isBlank(result)) {
                            receiver = this._implicitReceiver;
                        }
                    }
                    if (lang_1.isBlank(result)) {
                        result = receiver.prop(ast.name);
                    }
                    return convertToStatementIfNeeded(mode, result);
                };
                _AstToIrVisitor.prototype.visitPropertyWrite = function (ast, mode) {
                    var receiver = ast.receiver.visit(this, _Mode.Expression);
                    if (receiver === IMPLICIT_RECEIVER) {
                        var varExpr = this._nameResolver.getLocal(ast.name);
                        if (lang_1.isPresent(varExpr)) {
                            throw new exceptions_1.BaseException('Cannot assign to a reference or variable!');
                        }
                        receiver = this._implicitReceiver;
                    }
                    return convertToStatementIfNeeded(mode, receiver.prop(ast.name).set(ast.value.visit(this, _Mode.Expression)));
                };
                _AstToIrVisitor.prototype.visitSafePropertyRead = function (ast, mode) {
                    var receiver = ast.receiver.visit(this, _Mode.Expression);
                    return convertToStatementIfNeeded(mode, receiver.isBlank().conditional(o.NULL_EXPR, receiver.prop(ast.name)));
                };
                _AstToIrVisitor.prototype.visitSafeMethodCall = function (ast, mode) {
                    var receiver = ast.receiver.visit(this, _Mode.Expression);
                    var args = this.visitAll(ast.args, _Mode.Expression);
                    return convertToStatementIfNeeded(mode, receiver.isBlank().conditional(o.NULL_EXPR, receiver.callMethod(ast.name, args)));
                };
                _AstToIrVisitor.prototype.visitAll = function (asts, mode) {
                    var _this = this;
                    return asts.map(function (ast) { return ast.visit(_this, mode); });
                };
                _AstToIrVisitor.prototype.visitQuote = function (ast, mode) {
                    throw new exceptions_1.BaseException('Quotes are not supported for evaluation!');
                };
                return _AstToIrVisitor;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci92aWV3X2NvbXBpbGVyL2V4cHJlc3Npb25fY29udmVydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFPSSxpQkFBaUI7SUFhckIsaUNBQ0ksWUFBMEIsRUFBRSxnQkFBOEIsRUFBRSxVQUFxQixFQUNqRixjQUE2QjtRQUMvQixJQUFJLE9BQU8sR0FBRyxJQUFJLGVBQWUsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDbEYsSUFBSSxLQUFLLEdBQWlCLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0RSxNQUFNLENBQUMsSUFBSSw4QkFBOEIsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDaEYsQ0FBQztJQU5ELDZEQU1DLENBQUE7SUFFRCxnQ0FBdUMsWUFBMEIsRUFBRSxnQkFBOEIsRUFDMUQsSUFBZTtRQUNwRCxJQUFJLE9BQU8sR0FBRyxJQUFJLGVBQWUsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEUsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNwRSxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFORCwyREFNQyxDQUFBO0lBT0QsNkJBQTZCLElBQVcsRUFBRSxHQUFjO1FBQ3RELEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUM3QixNQUFNLElBQUksMEJBQWEsQ0FBQyxtQ0FBaUMsR0FBSyxDQUFDLENBQUM7UUFDbEUsQ0FBQztJQUNILENBQUM7SUFFRCw4QkFBOEIs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QUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUYsQ0FBQztnQkFDRCxrQ0FBUSxHQUFSLFVBQVMsSUFBaUIsRUFBRSxJQUFXO29CQUF2QyxpQkFBZ0c7b0JBQWhELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFJLEVBQUUsSUFBSSxDQUFDLEVBQXJCLENBQXFCLENBQUMsQ0FBQztnQkFBQyxDQUFDO2dCQUNoRyxvQ0FBVSxHQUFWLFVBQVcsR0FBZ0IsRUFBRSxJQUFXO29CQUN0QyxNQUFNLElBQUksMEJBQWEsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO2dCQUN0RSxDQUFDO2dCQUNILHNCQUFDO1lBQUQsQ0F0TEEsQUFzTEMsSUFBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tcGlsZXIvdmlld19jb21waWxlci9leHByZXNzaW9uX2NvbnZlcnRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkQXN0IGZyb20gJy4uL2V4cHJlc3Npb25fcGFyc2VyL2FzdCc7XG5pbXBvcnQgKiBhcyBvIGZyb20gJy4uL291dHB1dC9vdXRwdXRfYXN0JztcbmltcG9ydCB7SWRlbnRpZmllcnN9IGZyb20gJy4uL2lkZW50aWZpZXJzJztcblxuaW1wb3J0IHtCYXNlRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtpc0JsYW5rLCBpc1ByZXNlbnQsIGlzQXJyYXksIENPTlNUX0VYUFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbnZhciBJTVBMSUNJVF9SRUNFSVZFUiA9IG8udmFyaWFibGUoJyNpbXBsaWNpdCcpO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5hbWVSZXNvbHZlciB7XG4gIGNhbGxQaXBlKG5hbWU6IHN0cmluZywgaW5wdXQ6IG8uRXhwcmVzc2lvbiwgYXJnczogby5FeHByZXNzaW9uW10pOiBvLkV4cHJlc3Npb247XG4gIGdldExvY2FsKG5hbWU6IHN0cmluZyk6IG8uRXhwcmVzc2lvbjtcbiAgY3JlYXRlTGl0ZXJhbEFycmF5KHZhbHVlczogby5FeHByZXNzaW9uW10pOiBvLkV4cHJlc3Npb247XG4gIGNyZWF0ZUxpdGVyYWxNYXAodmFsdWVzOiBBcnJheTxBcnJheTxzdHJpbmcgfCBvLkV4cHJlc3Npb24+Pik6IG8uRXhwcmVzc2lvbjtcbn1cblxuZXhwb3J0IGNsYXNzIEV4cHJlc3Npb25XaXRoV3JhcHBlZFZhbHVlSW5mbyB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBleHByZXNzaW9uOiBvLkV4cHJlc3Npb24sIHB1YmxpYyBuZWVkc1ZhbHVlVW53cmFwcGVyOiBib29sZWFuKSB7fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydENkRXhwcmVzc2lvblRvSXIoXG4gICAgbmFtZVJlc29sdmVyOiBOYW1lUmVzb2x2ZXIsIGltcGxpY2l0UmVjZWl2ZXI6IG8uRXhwcmVzc2lvbiwgZXhwcmVzc2lvbjogY2RBc3QuQVNULFxuICAgIHZhbHVlVW53cmFwcGVyOiBvLlJlYWRWYXJFeHByKTogRXhwcmVzc2lvbldpdGhXcmFwcGVkVmFsdWVJbmZvIHtcbiAgdmFyIHZpc2l0b3IgPSBuZXcgX0FzdFRvSXJWaXNpdG9yKG5hbWVSZXNvbHZlciwgaW1wbGljaXRSZWNlaXZlciwgdmFsdWVVbndyYXBwZXIpO1xuICB2YXIgaXJBc3Q6IG8uRXhwcmVzc2lvbiA9IGV4cHJlc3Npb24udmlzaXQodmlzaXRvciwgX01vZGUuRXhwcmVzc2lvbik7XG4gIHJldHVybiBuZXcgRXhwcmVzc2lvbldpdGhXcmFwcGVkVmFsdWVJbmZvKGlyQXN0LCB2aXNpdG9yLm5lZWRzVmFsdWVVbndyYXBwZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydENkU3RhdGVtZW50VG9JcihuYW1lUmVzb2x2ZXI6IE5hbWVSZXNvbHZlciwgaW1wbGljaXRSZWNlaXZlcjogby5FeHByZXNzaW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RtdDogY2RBc3QuQVNUKTogby5TdGF0ZW1lbnRbXSB7XG4gIHZhciB2aXNpdG9yID0gbmV3IF9Bc3RUb0lyVmlzaXRvcihuYW1lUmVzb2x2ZXIsIGltcGxpY2l0UmVjZWl2ZXIsIG51bGwpO1xuICB2YXIgc3RhdGVtZW50cyA9IFtdO1xuICBmbGF0dGVuU3RhdGVtZW50cyhzdG10LnZpc2l0KHZpc2l0b3IsIF9Nb2RlLlN0YXRlbWVudCksIHN0YXRlbWVudHMpO1xuICByZXR1cm4gc3RhdGVtZW50cztcbn1cblxuZW51bSBfTW9kZSB7XG4gIFN0YXRlbWVudCxcbiAgRXhwcmVzc2lvblxufVxuXG5mdW5jdGlvbiBlbnN1cmVTdGF0ZW1lbnRNb2RlKG1vZGU6IF9Nb2RlLCBhc3Q6IGNkQXN0LkFTVCkge1xuICBpZiAobW9kZSAhPT0gX01vZGUuU3RhdGVtZW50KSB7XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYEV4cGVjdGVkIGEgc3RhdGVtZW50LCBidXQgc2F3ICR7YXN0fWApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVuc3VyZUV4cHJlc3Npb25Nb2RlKG1vZGU6IF9Nb2RlLCBhc3Q6IGNkQXN0LkFTVCkge1xuICBpZiAobW9kZSAhPT0gX01vZGUuRXhwcmVzc2lvbikge1xuICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBFeHBlY3RlZCBhbiBleHByZXNzaW9uLCBidXQgc2F3ICR7YXN0fWApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRUb1N0YXRlbWVudElmTmVlZGVkKG1vZGU6IF9Nb2RlLCBleHByOiBvLkV4cHJlc3Npb24pOiBvLkV4cHJlc3Npb24gfCBvLlN0YXRlbWVudCB7XG4gIGlmIChtb2RlID09PSBfTW9kZS5TdGF0ZW1lbnQpIHtcbiAgICByZXR1cm4gZXhwci50b1N0bXQoKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZXhwcjtcbiAgfVxufVxuXG5jbGFzcyBfQXN0VG9JclZpc2l0b3IgaW1wbGVtZW50cyBjZEFzdC5Bc3RWaXNpdG9yIHtcbiAgcHVibGljIG5lZWRzVmFsdWVVbndyYXBwZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9uYW1lUmVzb2x2ZXI6IE5hbWVSZXNvbHZlciwgcHJpdmF0ZSBfaW1wbGljaXRSZWNlaXZlcjogby5FeHByZXNzaW9uLFxuICAgICAgICAgICAgICBwcml2YXRlIF92YWx1ZVVud3JhcHBlcjogby5SZWFkVmFyRXhwcikge31cblxuICB2aXNpdEJpbmFyeShhc3Q6IGNkQXN0LkJpbmFyeSwgbW9kZTogX01vZGUpOiBhbnkge1xuICAgIHZhciBvcDtcbiAgICBzd2l0Y2ggKGFzdC5vcGVyYXRpb24pIHtcbiAgICAgIGNhc2UgJysnOlxuICAgICAgICBvcCA9IG8uQmluYXJ5T3BlcmF0b3IuUGx1cztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICctJzpcbiAgICAgICAgb3AgPSBvLkJpbmFyeU9wZXJhdG9yLk1pbnVzO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJyonOlxuICAgICAgICBvcCA9IG8uQmluYXJ5T3BlcmF0b3IuTXVsdGlwbHk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnLyc6XG4gICAgICAgIG9wID0gby5CaW5hcnlPcGVyYXRvci5EaXZpZGU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnJSc6XG4gICAgICAgIG9wID0gby5CaW5hcnlPcGVyYXRvci5Nb2R1bG87XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnJiYnOlxuICAgICAgICBvcCA9IG8uQmluYXJ5T3BlcmF0b3IuQW5kO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3x8JzpcbiAgICAgICAgb3AgPSBvLkJpbmFyeU9wZXJhdG9yLk9yO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJz09JzpcbiAgICAgICAgb3AgPSBvLkJpbmFyeU9wZXJhdG9yLkVxdWFscztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICchPSc6XG4gICAgICAgIG9wID0gby5CaW5hcnlPcGVyYXRvci5Ob3RFcXVhbHM7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnPT09JzpcbiAgICAgICAgb3AgPSBvLkJpbmFyeU9wZXJhdG9yLklkZW50aWNhbDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICchPT0nOlxuICAgICAgICBvcCA9IG8uQmluYXJ5T3BlcmF0b3IuTm90SWRlbnRpY2FsO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJzwnOlxuICAgICAgICBvcCA9IG8uQmluYXJ5T3BlcmF0b3IuTG93ZXI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnPic6XG4gICAgICAgIG9wID0gby5CaW5hcnlPcGVyYXRvci5CaWdnZXI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnPD0nOlxuICAgICAgICBvcCA9IG8uQmluYXJ5T3BlcmF0b3IuTG93ZXJFcXVhbHM7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnPj0nOlxuICAgICAgICBvcCA9IG8uQmluYXJ5T3BlcmF0b3IuQmlnZ2VyRXF1YWxzO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBVbnN1cHBvcnRlZCBvcGVyYXRpb24gJHthc3Qub3BlcmF0aW9ufWApO1xuICAgIH1cblxuICAgIHJldHVybiBjb252ZXJ0VG9TdGF0ZW1lbnRJZk5lZWRlZChcbiAgICAgICAgbW9kZSwgbmV3IG8uQmluYXJ5T3BlcmF0b3JFeHByKG9wLCBhc3QubGVmdC52aXNpdCh0aGlzLCBfTW9kZS5FeHByZXNzaW9uKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzdC5yaWdodC52aXNpdCh0aGlzLCBfTW9kZS5FeHByZXNzaW9uKSkpO1xuICB9XG4gIHZpc2l0Q2hhaW4oYXN0OiBjZEFzdC5DaGFpbiwgbW9kZTogX01vZGUpOiBhbnkge1xuICAgIGVuc3VyZVN0YXRlbWVudE1vZGUobW9kZSwgYXN0KTtcbiAgICByZXR1cm4gdGhpcy52aXNpdEFsbChhc3QuZXhwcmVzc2lvbnMsIG1vZGUpO1xuICB9XG4gIHZpc2l0Q29uZGl0aW9uYWwoYXN0OiBjZEFzdC5Db25kaXRpb25hbCwgbW9kZTogX01vZGUpOiBhbnkge1xuICAgIHZhciB2YWx1ZTogby5FeHByZXNzaW9uID0gYXN0LmNvbmRpdGlvbi52aXNpdCh0aGlzLCBfTW9kZS5FeHByZXNzaW9uKTtcbiAgICByZXR1cm4gY29udmVydFRvU3RhdGVtZW50SWZOZWVkZWQoXG4gICAgICAgIG1vZGUsIHZhbHVlLmNvbmRpdGlvbmFsKGFzdC50cnVlRXhwLnZpc2l0KHRoaXMsIF9Nb2RlLkV4cHJlc3Npb24pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3QuZmFsc2VFeHAudmlzaXQodGhpcywgX01vZGUuRXhwcmVzc2lvbikpKTtcbiAgfVxuICB2aXNpdFBpcGUoYXN0OiBjZEFzdC5CaW5kaW5nUGlwZSwgbW9kZTogX01vZGUpOiBhbnkge1xuICAgIHZhciBpbnB1dCA9IGFzdC5leHAudmlzaXQodGhpcywgX01vZGUuRXhwcmVzc2lvbik7XG4gICAgdmFyIGFyZ3MgPSB0aGlzLnZpc2l0QWxsKGFzdC5hcmdzLCBfTW9kZS5FeHByZXNzaW9uKTtcbiAgICB2YXIgdmFsdWUgPSB0aGlzLl9uYW1lUmVzb2x2ZXIuY2FsbFBpcGUoYXN0Lm5hbWUsIGlucHV0LCBhcmdzKTtcbiAgICB0aGlzLm5lZWRzVmFsdWVVbndyYXBwZXIgPSB0cnVlO1xuICAgIHJldHVybiBjb252ZXJ0VG9TdGF0ZW1lbnRJZk5lZWRlZChtb2RlLCB0aGlzLl92YWx1ZVVud3JhcHBlci5jYWxsTWV0aG9kKCd1bndyYXAnLCBbdmFsdWVdKSk7XG4gIH1cbiAgdmlzaXRGdW5jdGlvbkNhbGwoYXN0OiBjZEFzdC5GdW5jdGlvbkNhbGwsIG1vZGU6IF9Nb2RlKTogYW55IHtcbiAgICByZXR1cm4gY29udmVydFRvU3RhdGVtZW50SWZOZWVkZWQobW9kZSwgYXN0LnRhcmdldC52aXNpdCh0aGlzLCBfTW9kZS5FeHByZXNzaW9uKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGxGbih0aGlzLnZpc2l0QWxsKGFzdC5hcmdzLCBfTW9kZS5FeHByZXNzaW9uKSkpO1xuICB9XG4gIHZpc2l0SW1wbGljaXRSZWNlaXZlcihhc3Q6IGNkQXN0LkltcGxpY2l0UmVjZWl2ZXIsIG1vZGU6IF9Nb2RlKTogYW55IHtcbiAgICBlbnN1cmVFeHByZXNzaW9uTW9kZShtb2RlLCBhc3QpO1xuICAgIHJldHVybiBJTVBMSUNJVF9SRUNFSVZFUjtcbiAgfVxuICB2aXNpdEludGVycG9sYXRpb24oYXN0OiBjZEFzdC5JbnRlcnBvbGF0aW9uLCBtb2RlOiBfTW9kZSk6IGFueSB7XG4gICAgZW5zdXJlRXhwcmVzc2lvbk1vZGUobW9kZSwgYXN0KTtcbiAgICB2YXIgYXJncyA9IFtvLmxpdGVyYWwoYXN0LmV4cHJlc3Npb25zLmxlbmd0aCldO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXN0LnN0cmluZ3MubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICBhcmdzLnB1c2goby5saXRlcmFsKGFzdC5zdHJpbmdzW2ldKSk7XG4gICAgICBhcmdzLnB1c2goYXN0LmV4cHJlc3Npb25zW2ldLnZpc2l0KHRoaXMsIF9Nb2RlLkV4cHJlc3Npb24pKTtcbiAgICB9XG4gICAgYXJncy5wdXNoKG8ubGl0ZXJhbChhc3Quc3RyaW5nc1thc3Quc3RyaW5ncy5sZW5ndGggLSAxXSkpO1xuICAgIHJldHVybiBvLmltcG9ydEV4cHIoSWRlbnRpZmllcnMuaW50ZXJwb2xhdGUpLmNhbGxGbihhcmdzKTtcbiAgfVxuICB2aXNpdEtleWVkUmVhZChhc3Q6IGNkQXN0LktleWVkUmVhZCwgbW9kZTogX01vZGUpOiBhbnkge1xuICAgIHJldHVybiBjb252ZXJ0VG9TdGF0ZW1lbnRJZk5lZWRlZChcbiAgICAgICAgbW9kZSwgYXN0Lm9iai52aXNpdCh0aGlzLCBfTW9kZS5FeHByZXNzaW9uKS5rZXkoYXN0LmtleS52aXNpdCh0aGlzLCBfTW9kZS5FeHByZXNzaW9uKSkpO1xuICB9XG4gIHZpc2l0S2V5ZWRXcml0ZShhc3Q6IGNkQXN0LktleWVkV3JpdGUsIG1vZGU6IF9Nb2RlKTogYW55IHtcbiAgICB2YXIgb2JqOiBvLkV4cHJlc3Npb24gPSBhc3Qub2JqLnZpc2l0KHRoaXMsIF9Nb2RlLkV4cHJlc3Npb24pO1xuICAgIHZhciBrZXk6IG8uRXhwcmVzc2lvbiA9IGFzdC5rZXkudmlzaXQodGhpcywgX01vZGUuRXhwcmVzc2lvbik7XG4gICAgdmFyIHZhbHVlOiBvLkV4cHJlc3Npb24gPSBhc3QudmFsdWUudmlzaXQodGhpcywgX01vZGUuRXhwcmVzc2lvbik7XG4gICAgcmV0dXJuIGNvbnZlcnRUb1N0YXRlbWVudElmTmVlZGVkKG1vZGUsIG9iai5rZXkoa2V5KS5zZXQodmFsdWUpKTtcbiAgfVxuICB2aXNpdExpdGVyYWxBcnJheShhc3Q6IGNkQXN0LkxpdGVyYWxBcnJheSwgbW9kZTogX01vZGUpOiBhbnkge1xuICAgIHJldHVybiBjb252ZXJ0VG9TdGF0ZW1lbnRJZk5lZWRlZChcbiAgICAgICAgbW9kZSwgdGhpcy5fbmFtZVJlc29sdmVyLmNyZWF0ZUxpdGVyYWxBcnJheSh0aGlzLnZpc2l0QWxsKGFzdC5leHByZXNzaW9ucywgbW9kZSkpKTtcbiAgfVxuICB2aXNpdExpdGVyYWxNYXAoYXN0OiBjZEFzdC5MaXRlcmFsTWFwLCBtb2RlOiBfTW9kZSk6IGFueSB7XG4gICAgdmFyIHBhcnRzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhc3Qua2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgcGFydHMucHVzaChbYXN0LmtleXNbaV0sIGFzdC52YWx1ZXNbaV0udmlzaXQodGhpcywgX01vZGUuRXhwcmVzc2lvbildKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnZlcnRUb1N0YXRlbWVudElmTmVlZGVkKG1vZGUsIHRoaXMuX25hbWVSZXNvbHZlci5jcmVhdGVMaXRlcmFsTWFwKHBhcnRzKSk7XG4gIH1cbiAgdmlzaXRMaXRlcmFsUHJpbWl0aXZlKGFzdDogY2RBc3QuTGl0ZXJhbFByaW1pdGl2ZSwgbW9kZTogX01vZGUpOiBhbnkge1xuICAgIHJldHVybiBjb252ZXJ0VG9TdGF0ZW1lbnRJZk5lZWRlZChtb2RlLCBvLmxpdGVyYWwoYXN0LnZhbHVlKSk7XG4gIH1cbiAgdmlzaXRNZXRob2RDYWxsKGFzdDogY2RBc3QuTWV0aG9kQ2FsbCwgbW9kZTogX01vZGUpOiBhbnkge1xuICAgIHZhciBhcmdzID0gdGhpcy52aXNpdEFsbChhc3QuYXJncywgX01vZGUuRXhwcmVzc2lvbik7XG4gICAgdmFyIHJlc3VsdCA9IG51bGw7XG4gICAgdmFyIHJlY2VpdmVyID0gYXN0LnJlY2VpdmVyLnZpc2l0KHRoaXMsIF9Nb2RlLkV4cHJlc3Npb24pO1xuICAgIGlmIChyZWNlaXZlciA9PT0gSU1QTElDSVRfUkVDRUlWRVIpIHtcbiAgICAgIHZhciB2YXJFeHByID0gdGhpcy5fbmFtZVJlc29sdmVyLmdldExvY2FsKGFzdC5uYW1lKTtcbiAgICAgIGlmIChpc1ByZXNlbnQodmFyRXhwcikpIHtcbiAgICAgICAgcmVzdWx0ID0gdmFyRXhwci5jYWxsRm4oYXJncyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWNlaXZlciA9IHRoaXMuX2ltcGxpY2l0UmVjZWl2ZXI7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChpc0JsYW5rKHJlc3VsdCkpIHtcbiAgICAgIHJlc3VsdCA9IHJlY2VpdmVyLmNhbGxNZXRob2QoYXN0Lm5hbWUsIGFyZ3MpO1xuICAgIH1cbiAgICByZXR1cm4gY29udmVydFRvU3RhdGVtZW50SWZOZWVkZWQobW9kZSwgcmVzdWx0KTtcbiAgfVxuICB2aXNpdFByZWZpeE5vdChhc3Q6IGNkQXN0LlByZWZpeE5vdCwgbW9kZTogX01vZGUpOiBhbnkge1xuICAgIHJldHVybiBjb252ZXJ0VG9TdGF0ZW1lbnRJZk5lZWRlZChtb2RlLCBvLm5vdChhc3QuZXhwcmVzc2lvbi52aXNpdCh0aGlzLCBfTW9kZS5FeHByZXNzaW9uKSkpO1xuICB9XG4gIHZpc2l0UHJvcGVydHlSZWFkKGFzdDogY2RBc3QuUHJvcGVydHlSZWFkLCBtb2RlOiBfTW9kZSk6IGFueSB7XG4gICAgdmFyIHJlc3VsdCA9IG51bGw7XG4gICAgdmFyIHJlY2VpdmVyID0gYXN0LnJlY2VpdmVyLnZpc2l0KHRoaXMsIF9Nb2RlLkV4cHJlc3Npb24pO1xuICAgIGlmIChyZWNlaXZlciA9PT0gSU1QTElDSVRfUkVDRUlWRVIpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuX25hbWVSZXNvbHZlci5nZXRMb2NhbChhc3QubmFtZSk7XG4gICAgICBpZiAoaXNCbGFuayhyZXN1bHQpKSB7XG4gICAgICAgIHJlY2VpdmVyID0gdGhpcy5faW1wbGljaXRSZWNlaXZlcjtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzQmxhbmsocmVzdWx0KSkge1xuICAgICAgcmVzdWx0ID0gcmVjZWl2ZXIucHJvcChhc3QubmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBjb252ZXJ0VG9TdGF0ZW1lbnRJZk5lZWRlZChtb2RlLCByZXN1bHQpO1xuICB9XG4gIHZpc2l0UHJvcGVydHlXcml0ZShhc3Q6IGNkQXN0LlByb3BlcnR5V3JpdGUsIG1vZGU6IF9Nb2RlKTogYW55IHtcbiAgICB2YXIgcmVjZWl2ZXI6IG8uRXhwcmVzc2lvbiA9IGFzdC5yZWNlaXZlci52aXNpdCh0aGlzLCBfTW9kZS5FeHByZXNzaW9uKTtcbiAgICBpZiAocmVjZWl2ZXIgPT09IElNUExJQ0lUX1JFQ0VJVkVSKSB7XG4gICAgICB2YXIgdmFyRXhwciA9IHRoaXMuX25hbWVSZXNvbHZlci5nZXRMb2NhbChhc3QubmFtZSk7XG4gICAgICBpZiAoaXNQcmVzZW50KHZhckV4cHIpKSB7XG4gICAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKCdDYW5ub3QgYXNzaWduIHRvIGEgcmVmZXJlbmNlIG9yIHZhcmlhYmxlIScpO1xuICAgICAgfVxuICAgICAgcmVjZWl2ZXIgPSB0aGlzLl9pbXBsaWNpdFJlY2VpdmVyO1xuICAgIH1cbiAgICByZXR1cm4gY29udmVydFRvU3RhdGVtZW50SWZOZWVkZWQoXG4gICAgICAgIG1vZGUsIHJlY2VpdmVyLnByb3AoYXN0Lm5hbWUpLnNldChhc3QudmFsdWUudmlzaXQodGhpcywgX01vZGUuRXhwcmVzc2lvbikpKTtcbiAgfVxuICB2aXNpdFNhZmVQcm9wZXJ0eVJlYWQoYXN0OiBjZEFzdC5TYWZlUHJvcGVydHlSZWFkLCBtb2RlOiBfTW9kZSk6IGFueSB7XG4gICAgdmFyIHJlY2VpdmVyID0gYXN0LnJlY2VpdmVyLnZpc2l0KHRoaXMsIF9Nb2RlLkV4cHJlc3Npb24pO1xuICAgIHJldHVybiBjb252ZXJ0VG9TdGF0ZW1lbnRJZk5lZWRlZChcbiAgICAgICAgbW9kZSwgcmVjZWl2ZXIuaXNCbGFuaygpLmNvbmRpdGlvbmFsKG8uTlVMTF9FWFBSLCByZWNlaXZlci5wcm9wKGFzdC5uYW1lKSkpO1xuICB9XG4gIHZpc2l0U2FmZU1ldGhvZENhbGwoYXN0OiBjZEFzdC5TYWZlTWV0aG9kQ2FsbCwgbW9kZTogX01vZGUpOiBhbnkge1xuICAgIHZhciByZWNlaXZlciA9IGFzdC5yZWNlaXZlci52aXNpdCh0aGlzLCBfTW9kZS5FeHByZXNzaW9uKTtcbiAgICB2YXIgYXJncyA9IHRoaXMudmlzaXRBbGwoYXN0LmFyZ3MsIF9Nb2RlLkV4cHJlc3Npb24pO1xuICAgIHJldHVybiBjb252ZXJ0VG9TdGF0ZW1lbnRJZk5lZWRlZChcbiAgICAgICAgbW9kZSwgcmVjZWl2ZXIuaXNCbGFuaygpLmNvbmRpdGlvbmFsKG8uTlVMTF9FWFBSLCByZWNlaXZlci5jYWxsTWV0aG9kKGFzdC5uYW1lLCBhcmdzKSkpO1xuICB9XG4gIHZpc2l0QWxsKGFzdHM6IGNkQXN0LkFTVFtdLCBtb2RlOiBfTW9kZSk6IGFueSB7IHJldHVybiBhc3RzLm1hcChhc3QgPT4gYXN0LnZpc2l0KHRoaXMsIG1vZGUpKTsgfVxuICB2aXNpdFF1b3RlKGFzdDogY2RBc3QuUXVvdGUsIG1vZGU6IF9Nb2RlKTogYW55IHtcbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbignUXVvdGVzIGFyZSBub3Qgc3VwcG9ydGVkIGZvciBldmFsdWF0aW9uIScpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZsYXR0ZW5TdGF0ZW1lbnRzKGFyZzogYW55LCBvdXRwdXQ6IG8uU3RhdGVtZW50W10pIHtcbiAgaWYgKGlzQXJyYXkoYXJnKSkge1xuICAgICg8YW55W10+YXJnKS5mb3JFYWNoKChlbnRyeSkgPT4gZmxhdHRlblN0YXRlbWVudHMoZW50cnksIG91dHB1dCkpO1xuICB9IGVsc2Uge1xuICAgIG91dHB1dC5wdXNoKGFyZyk7XG4gIH1cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
