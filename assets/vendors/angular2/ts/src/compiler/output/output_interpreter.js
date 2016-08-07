System.register(['angular2/src/facade/lang', 'angular2/src/facade/async', './output_ast', 'angular2/src/core/reflection/reflection', 'angular2/src/facade/exceptions', 'angular2/src/facade/collection', './dart_emitter', './ts_emitter'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, async_1, o, reflection_1, exceptions_1, collection_1, dart_emitter_1, ts_emitter_1;
    var DynamicInstance, _ExecutionContext, ReturnValue, _DynamicClass, StatementInterpreter, CATCH_ERROR_VAR, CATCH_STACK_VAR;
    function interpretStatements(statements, resultVar, instanceFactory) {
        var stmtsWithReturn = statements.concat([new o.ReturnStatement(o.variable(resultVar))]);
        var ctx = new _ExecutionContext(null, null, null, null, new Map(), new Map(), new Map(), new Map(), instanceFactory);
        var visitor = new StatementInterpreter();
        var result = visitor.visitAllStatements(stmtsWithReturn, ctx);
        return lang_1.isPresent(result) ? result.value : null;
    }
    exports_1("interpretStatements", interpretStatements);
    function isDynamicInstance(instance) {
        if (lang_1.IS_DART) {
            return instance instanceof DynamicInstance;
        }
        else {
            return lang_1.isPresent(instance) && lang_1.isPresent(instance.props) && lang_1.isPresent(instance.getters) &&
                lang_1.isPresent(instance.methods);
        }
    }
    function _executeFunctionStatements(varNames, varValues, statements, ctx, visitor) {
        var childCtx = ctx.createChildWihtLocalVars();
        for (var i = 0; i < varNames.length; i++) {
            childCtx.vars.set(varNames[i], varValues[i]);
        }
        var result = visitor.visitAllStatements(statements, childCtx);
        return lang_1.isPresent(result) ? result.value : null;
    }
    function _declareFn(varNames, statements, ctx, visitor) {
        switch (varNames.length) {
            case 0:
                return function () { return _executeFunctionStatements(varNames, [], statements, ctx, visitor); };
            case 1:
                return function (d0) { return _executeFunctionStatements(varNames, [d0], statements, ctx, visitor); };
            case 2:
                return function (d0, d1) { return _executeFunctionStatements(varNames, [d0, d1], statements, ctx, visitor); };
            case 3:
                return function (d0, d1, d2) {
                    return _executeFunctionStatements(varNames, [d0, d1, d2], statements, ctx, visitor);
                };
            case 4:
                return function (d0, d1, d2, d3) {
                    return _executeFunctionStatements(varNames, [d0, d1, d2, d3], statements, ctx, visitor);
                };
            case 5:
                return function (d0, d1, d2, d3, d4) { return _executeFunctionStatements(varNames, [d0, d1, d2, d3, d4], statements, ctx, visitor); };
            case 6:
                return function (d0, d1, d2, d3, d4, d5) { return _executeFunctionStatements(varNames, [d0, d1, d2, d3, d4, d5], statements, ctx, visitor); };
            case 7:
                return function (d0, d1, d2, d3, d4, d5, d6) { return _executeFunctionStatements(varNames, [d0, d1, d2, d3, d4, d5, d6], statements, ctx, visitor); };
            case 8:
                return function (d0, d1, d2, d3, d4, d5, d6, d7) { return _executeFunctionStatements(varNames, [d0, d1, d2, d3, d4, d5, d6, d7], statements, ctx, visitor); };
            case 9:
                return function (d0, d1, d2, d3, d4, d5, d6, d7, d8) { return _executeFunctionStatements(varNames, [d0, d1, d2, d3, d4, d5, d6, d7, d8], statements, ctx, visitor); };
            case 10:
                return function (d0, d1, d2, d3, d4, d5, d6, d7, d8, d9) { return _executeFunctionStatements(varNames, [d0, d1, d2, d3, d4, d5, d6, d7, d8, d9], statements, ctx, visitor); };
            default:
                throw new exceptions_1.BaseException('Declaring functions with more than 10 arguments is not supported right now');
        }
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (o_1) {
                o = o_1;
            },
            function (reflection_1_1) {
                reflection_1 = reflection_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (dart_emitter_1_1) {
                dart_emitter_1 = dart_emitter_1_1;
            },
            function (ts_emitter_1_1) {
                ts_emitter_1 = ts_emitter_1_1;
            }],
        execute: function() {
            DynamicInstance = (function () {
                function DynamicInstance() {
                }
                Object.defineProperty(DynamicInstance.prototype, "props", {
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DynamicInstance.prototype, "getters", {
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DynamicInstance.prototype, "methods", {
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DynamicInstance.prototype, "clazz", {
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                return DynamicInstance;
            }());
            exports_1("DynamicInstance", DynamicInstance);
            _ExecutionContext = (function () {
                function _ExecutionContext(parent, superClass, superInstance, className, vars, props, getters, methods, instanceFactory) {
                    this.parent = parent;
                    this.superClass = superClass;
                    this.superInstance = superInstance;
                    this.className = className;
                    this.vars = vars;
                    this.props = props;
                    this.getters = getters;
                    this.methods = methods;
                    this.instanceFactory = instanceFactory;
                }
                _ExecutionContext.prototype.createChildWihtLocalVars = function () {
                    return new _ExecutionContext(this, this.superClass, this.superInstance, this.className, new Map(), this.props, this.getters, this.methods, this.instanceFactory);
                };
                return _ExecutionContext;
            }());
            ReturnValue = (function () {
                function ReturnValue(value) {
                    this.value = value;
                }
                return ReturnValue;
            }());
            _DynamicClass = (function () {
                function _DynamicClass(_classStmt, _ctx, _visitor) {
                    this._classStmt = _classStmt;
                    this._ctx = _ctx;
                    this._visitor = _visitor;
                }
                _DynamicClass.prototype.instantiate = function (args) {
                    var _this = this;
                    var props = new Map();
                    var getters = new Map();
                    var methods = new Map();
                    var superClass = this._classStmt.parent.visitExpression(this._visitor, this._ctx);
                    var instanceCtx = new _ExecutionContext(this._ctx, superClass, null, this._classStmt.name, this._ctx.vars, props, getters, methods, this._ctx.instanceFactory);
                    this._classStmt.fields.forEach(function (field) { props.set(field.name, null); });
                    this._classStmt.getters.forEach(function (getter) {
                        getters.set(getter.name, function () { return _executeFunctionStatements([], [], getter.body, instanceCtx, _this._visitor); });
                    });
                    this._classStmt.methods.forEach(function (method) {
                        var paramNames = method.params.map(function (param) { return param.name; });
                        methods.set(method.name, _declareFn(paramNames, method.body, instanceCtx, _this._visitor));
                    });
                    var ctorParamNames = this._classStmt.constructorMethod.params.map(function (param) { return param.name; });
                    _executeFunctionStatements(ctorParamNames, args, this._classStmt.constructorMethod.body, instanceCtx, this._visitor);
                    return instanceCtx.superInstance;
                };
                _DynamicClass.prototype.debugAst = function () { return this._visitor.debugAst(this._classStmt); };
                return _DynamicClass;
            }());
            StatementInterpreter = (function () {
                function StatementInterpreter() {
                }
                StatementInterpreter.prototype.debugAst = function (ast) {
                    return lang_1.IS_DART ? dart_emitter_1.debugOutputAstAsDart(ast) : ts_emitter_1.debugOutputAstAsTypeScript(ast);
                };
                StatementInterpreter.prototype.visitDeclareVarStmt = function (stmt, ctx) {
                    ctx.vars.set(stmt.name, stmt.value.visitExpression(this, ctx));
                    return null;
                };
                StatementInterpreter.prototype.visitWriteVarExpr = function (expr, ctx) {
                    var value = expr.value.visitExpression(this, ctx);
                    var currCtx = ctx;
                    while (currCtx != null) {
                        if (currCtx.vars.has(expr.name)) {
                            currCtx.vars.set(expr.name, value);
                            return value;
                        }
                        currCtx = currCtx.parent;
                    }
                    throw new exceptions_1.BaseException("Not declared variable " + expr.name);
                };
                StatementInterpreter.prototype.visitReadVarExpr = function (ast, ctx) {
                    var varName = ast.name;
                    if (lang_1.isPresent(ast.builtin)) {
                        switch (ast.builtin) {
                            case o.BuiltinVar.Super:
                            case o.BuiltinVar.This:
                                return ctx.superInstance;
                            case o.BuiltinVar.CatchError:
                                varName = CATCH_ERROR_VAR;
                                break;
                            case o.BuiltinVar.CatchStack:
                                varName = CATCH_STACK_VAR;
                                break;
                            default:
                                throw new exceptions_1.BaseException("Unknown builtin variable " + ast.builtin);
                        }
                    }
                    var currCtx = ctx;
                    while (currCtx != null) {
                        if (currCtx.vars.has(varName)) {
                            return currCtx.vars.get(varName);
                        }
                        currCtx = currCtx.parent;
                    }
                    throw new exceptions_1.BaseException("Not declared variable " + varName);
                };
                StatementInterpreter.prototype.visitWriteKeyExpr = function (expr, ctx) {
                    var receiver = expr.receiver.visitExpression(this, ctx);
                    var index = expr.index.visitExpression(this, ctx);
                    var value = expr.value.visitExpression(this, ctx);
                    receiver[index] = value;
                    return value;
                };
                StatementInterpreter.prototype.visitWritePropExpr = function (expr, ctx) {
                    var receiver = expr.receiver.visitExpression(this, ctx);
                    var value = expr.value.visitExpression(this, ctx);
                    if (isDynamicInstance(receiver)) {
                        var di = receiver;
                        if (di.props.has(expr.name)) {
                            di.props.set(expr.name, value);
                        }
                        else {
                            reflection_1.reflector.setter(expr.name)(receiver, value);
                        }
                    }
                    else {
                        reflection_1.reflector.setter(expr.name)(receiver, value);
                    }
                    return value;
                };
                StatementInterpreter.prototype.visitInvokeMethodExpr = function (expr, ctx) {
                    var receiver = expr.receiver.visitExpression(this, ctx);
                    var args = this.visitAllExpressions(expr.args, ctx);
                    var result;
                    if (lang_1.isPresent(expr.builtin)) {
                        switch (expr.builtin) {
                            case o.BuiltinMethod.ConcatArray:
                                result = collection_1.ListWrapper.concat(receiver, args[0]);
                                break;
                            case o.BuiltinMethod.SubscribeObservable:
                                result = async_1.ObservableWrapper.subscribe(receiver, args[0]);
                                break;
                            case o.BuiltinMethod.bind:
                                if (lang_1.IS_DART) {
                                    result = receiver;
                                }
                                else {
                                    result = receiver.bind(args[0]);
                                }
                                break;
                            default:
                                throw new exceptions_1.BaseException("Unknown builtin method " + expr.builtin);
                        }
                    }
                    else if (isDynamicInstance(receiver)) {
                        var di = receiver;
                        if (di.methods.has(expr.name)) {
                            result = lang_1.FunctionWrapper.apply(di.methods.get(expr.name), args);
                        }
                        else {
                            result = reflection_1.reflector.method(expr.name)(receiver, args);
                        }
                    }
                    else {
                        result = reflection_1.reflector.method(expr.name)(receiver, args);
                    }
                    return result;
                };
                StatementInterpreter.prototype.visitInvokeFunctionExpr = function (stmt, ctx) {
                    var args = this.visitAllExpressions(stmt.args, ctx);
                    var fnExpr = stmt.fn;
                    if (fnExpr instanceof o.ReadVarExpr && fnExpr.builtin === o.BuiltinVar.Super) {
                        ctx.superInstance = ctx.instanceFactory.createInstance(ctx.superClass, ctx.className, args, ctx.props, ctx.getters, ctx.methods);
                        ctx.parent.superInstance = ctx.superInstance;
                        return null;
                    }
                    else {
                        var fn = stmt.fn.visitExpression(this, ctx);
                        return lang_1.FunctionWrapper.apply(fn, args);
                    }
                };
                StatementInterpreter.prototype.visitReturnStmt = function (stmt, ctx) {
                    return new ReturnValue(stmt.value.visitExpression(this, ctx));
                };
                StatementInterpreter.prototype.visitDeclareClassStmt = function (stmt, ctx) {
                    var clazz = new _DynamicClass(stmt, ctx, this);
                    ctx.vars.set(stmt.name, clazz);
                    return null;
                };
                StatementInterpreter.prototype.visitExpressionStmt = function (stmt, ctx) {
                    return stmt.expr.visitExpression(this, ctx);
                };
                StatementInterpreter.prototype.visitIfStmt = function (stmt, ctx) {
                    var condition = stmt.condition.visitExpression(this, ctx);
                    if (condition) {
                        return this.visitAllStatements(stmt.trueCase, ctx);
                    }
                    else if (lang_1.isPresent(stmt.falseCase)) {
                        return this.visitAllStatements(stmt.falseCase, ctx);
                    }
                    return null;
                };
                StatementInterpreter.prototype.visitTryCatchStmt = function (stmt, ctx) {
                    try {
                        return this.visitAllStatements(stmt.bodyStmts, ctx);
                    }
                    catch (e) {
                        var childCtx = ctx.createChildWihtLocalVars();
                        childCtx.vars.set(CATCH_ERROR_VAR, e);
                        childCtx.vars.set(CATCH_STACK_VAR, e.stack);
                        return this.visitAllStatements(stmt.catchStmts, childCtx);
                    }
                };
                StatementInterpreter.prototype.visitThrowStmt = function (stmt, ctx) {
                    throw stmt.error.visitExpression(this, ctx);
                };
                StatementInterpreter.prototype.visitCommentStmt = function (stmt, context) { return null; };
                StatementInterpreter.prototype.visitInstantiateExpr = function (ast, ctx) {
                    var args = this.visitAllExpressions(ast.args, ctx);
                    var clazz = ast.classExpr.visitExpression(this, ctx);
                    if (clazz instanceof _DynamicClass) {
                        return clazz.instantiate(args);
                    }
                    else {
                        return lang_1.FunctionWrapper.apply(reflection_1.reflector.factory(clazz), args);
                    }
                };
                StatementInterpreter.prototype.visitLiteralExpr = function (ast, ctx) { return ast.value; };
                StatementInterpreter.prototype.visitExternalExpr = function (ast, ctx) { return ast.value.runtime; };
                StatementInterpreter.prototype.visitConditionalExpr = function (ast, ctx) {
                    if (ast.condition.visitExpression(this, ctx)) {
                        return ast.trueCase.visitExpression(this, ctx);
                    }
                    else if (lang_1.isPresent(ast.falseCase)) {
                        return ast.falseCase.visitExpression(this, ctx);
                    }
                    return null;
                };
                StatementInterpreter.prototype.visitNotExpr = function (ast, ctx) {
                    return !ast.condition.visitExpression(this, ctx);
                };
                StatementInterpreter.prototype.visitCastExpr = function (ast, ctx) {
                    return ast.value.visitExpression(this, ctx);
                };
                StatementInterpreter.prototype.visitFunctionExpr = function (ast, ctx) {
                    var paramNames = ast.params.map(function (param) { return param.name; });
                    return _declareFn(paramNames, ast.statements, ctx, this);
                };
                StatementInterpreter.prototype.visitDeclareFunctionStmt = function (stmt, ctx) {
                    var paramNames = stmt.params.map(function (param) { return param.name; });
                    ctx.vars.set(stmt.name, _declareFn(paramNames, stmt.statements, ctx, this));
                    return null;
                };
                StatementInterpreter.prototype.visitBinaryOperatorExpr = function (ast, ctx) {
                    var _this = this;
                    var lhs = function () { return ast.lhs.visitExpression(_this, ctx); };
                    var rhs = function () { return ast.rhs.visitExpression(_this, ctx); };
                    switch (ast.operator) {
                        case o.BinaryOperator.Equals:
                            return lhs() == rhs();
                        case o.BinaryOperator.Identical:
                            return lhs() === rhs();
                        case o.BinaryOperator.NotEquals:
                            return lhs() != rhs();
                        case o.BinaryOperator.NotIdentical:
                            return lhs() !== rhs();
                        case o.BinaryOperator.And:
                            return lhs() && rhs();
                        case o.BinaryOperator.Or:
                            return lhs() || rhs();
                        case o.BinaryOperator.Plus:
                            return lhs() + rhs();
                        case o.BinaryOperator.Minus:
                            return lhs() - rhs();
                        case o.BinaryOperator.Divide:
                            return lhs() / rhs();
                        case o.BinaryOperator.Multiply:
                            return lhs() * rhs();
                        case o.BinaryOperator.Modulo:
                            return lhs() % rhs();
                        case o.BinaryOperator.Lower:
                            return lhs() < rhs();
                        case o.BinaryOperator.LowerEquals:
                            return lhs() <= rhs();
                        case o.BinaryOperator.Bigger:
                            return lhs() > rhs();
                        case o.BinaryOperator.BiggerEquals:
                            return lhs() >= rhs();
                        default:
                            throw new exceptions_1.BaseException("Unknown operator " + ast.operator);
                    }
                };
                StatementInterpreter.prototype.visitReadPropExpr = function (ast, ctx) {
                    var result;
                    var receiver = ast.receiver.visitExpression(this, ctx);
                    if (isDynamicInstance(receiver)) {
                        var di = receiver;
                        if (di.props.has(ast.name)) {
                            result = di.props.get(ast.name);
                        }
                        else if (di.getters.has(ast.name)) {
                            result = di.getters.get(ast.name)();
                        }
                        else if (di.methods.has(ast.name)) {
                            result = di.methods.get(ast.name);
                        }
                        else {
                            result = reflection_1.reflector.getter(ast.name)(receiver);
                        }
                    }
                    else {
                        result = reflection_1.reflector.getter(ast.name)(receiver);
                    }
                    return result;
                };
                StatementInterpreter.prototype.visitReadKeyExpr = function (ast, ctx) {
                    var receiver = ast.receiver.visitExpression(this, ctx);
                    var prop = ast.index.visitExpression(this, ctx);
                    return receiver[prop];
                };
                StatementInterpreter.prototype.visitLiteralArrayExpr = function (ast, ctx) {
                    return this.visitAllExpressions(ast.entries, ctx);
                };
                StatementInterpreter.prototype.visitLiteralMapExpr = function (ast, ctx) {
                    var _this = this;
                    var result = {};
                    ast.entries.forEach(function (entry) { return result[entry[0]] =
                        entry[1].visitExpression(_this, ctx); });
                    return result;
                };
                StatementInterpreter.prototype.visitAllExpressions = function (expressions, ctx) {
                    var _this = this;
                    return expressions.map(function (expr) { return expr.visitExpression(_this, ctx); });
                };
                StatementInterpreter.prototype.visitAllStatements = function (statements, ctx) {
                    for (var i = 0; i < statements.length; i++) {
                        var stmt = statements[i];
                        var val = stmt.visitStatement(this, ctx);
                        if (val instanceof ReturnValue) {
                            return val;
                        }
                    }
                    return null;
                };
                return StatementInterpreter;
            }());
            CATCH_ERROR_VAR = 'error';
            CATCH_STACK_VAR = 'stack';
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9vdXRwdXQvb3V0cHV0X2ludGVycHJldGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OEZBb2FJLGVBQWUsRUFDZixlQUFlO0lBclpuQiw2QkFBb0MsVUFBeUIsRUFBRSxTQUFpQixFQUM1QyxlQUFnQztRQUNsRSxJQUFJLGVBQWUsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEYsSUFBSSxHQUFHLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxHQUFHLEVBQWUsRUFDOUMsSUFBSSxHQUFHLEVBQWUsRUFBRSxJQUFJLEdBQUcsRUFBb0IsRUFDbkQsSUFBSSxHQUFHLEVBQW9CLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDOUUsSUFBSSxPQUFPLEdBQUcsSUFBSSxvQkFBb0IsRUFBRSxDQUFDO1FBQ3pDLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDOUQsTUFBTSxDQUFDLGdCQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDakQsQ0FBQztJQVRELHFEQVNDLENBQUE7SUFjRCwyQkFBMkIsUUFBYTtRQUN0QyxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1osTUFBTSxDQUFDLFFBQVEsWUFBWSxlQUFlLENBQUM7UUFDN0MsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLGdCQUFTLENBQUMsUUFBUSxDQUFDLElBQUksZ0JBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksZ0JB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QUFDLENBQUMsY0FBYyxDQUFDLEVBQUU7NEJBQ3RCLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQzt3QkFDeEIsS0FBSyxDQUFDLENBQUMsY0FBYyxDQUFDLElBQUk7NEJBQ3hCLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQzt3QkFDdkIsS0FBSyxDQUFDLENBQUMsY0FBYyxDQUFDLEtBQUs7NEJBQ3pCLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQzt3QkFDdkIsS0FBSyxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU07NEJBQzFCLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQzt3QkFDdkIsS0FBSyxDQUFDLENBQUMsY0FBYyxDQUFDLFFBQVE7NEJBQzVCLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQzt3QkFDdkIsS0FBSyxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU07NEJBQzFCLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQzt3QkFDdkIsS0FBSyxDQUFDLENBQUMsY0FBYyxDQUFDLEtBQUs7NEJBQ3pCLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQzt3QkFDdkIsS0FBSyxDQUFDLENBQUMsY0FBYyxDQUFDLFdBQVc7NEJBQy9CLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQzt3QkFDeEIsS0FBSyxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU07NEJBQzFCLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQzt3QkFDdkIsS0FBSyxDQUFDLENBQUMsY0FBYyxDQUFDLFlBQVk7NEJBQ2hDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQzt3QkFDeEI7NEJBQ0UsTUFBTSxJQUFJLDBCQUFhLENBQUMsc0JBQW9CLEdBQUcsQ0FBQyxRQUFVLENBQUMsQ0FBQztvQkFDaEUs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QUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSSxFQUFFLEdBQUcsQ0FBQyxFQUEvQixDQUErQixDQUFDLENBQUM7Z0JBQ3BFLENBQUM7Z0JBRUQsaURBQWtCLEdBQWxCLFVBQW1CLFVBQXlCLEVBQUUsR0FBc0I7b0JBQ2xFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUMzQyxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3pCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUN6QyxFQUFFLENBQUMsQ0FBQyxHQUFHLFlBQVksV0FBVyxDQUFDLENBQUMsQ0FBQzs0QkFDL0IsTUFBTSxDQUFDLEdBQUcsQ0FBQzt3QkFDYixDQUFDO29CQUNILENBQUM7b0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDZCxDQUFDO2dCQUNILDJCQUFDO1lBQUQsQ0FoUkEsQUFnUkMsSUFBQTtZQXlDRyxlQUFlLEdBQUcsT0FBTyxDQUFDO1lBQzFCLGVBQWUsR0FBRyxPQUFPLENBQUMiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL291dHB1dC9vdXRwdXRfaW50ZXJwcmV0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBpc1ByZXNlbnQsXG4gIGlzQmxhbmssXG4gIGlzU3RyaW5nLFxuICBldmFsRXhwcmVzc2lvbixcbiAgSVNfREFSVCxcbiAgRnVuY3Rpb25XcmFwcGVyXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge09ic2VydmFibGVXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jJztcbmltcG9ydCAqIGFzIG8gZnJvbSAnLi9vdXRwdXRfYXN0JztcbmltcG9ydCB7cmVmbGVjdG9yfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9yZWZsZWN0aW9uL3JlZmxlY3Rpb24nO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9uLCB1bmltcGxlbWVudGVkfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtNYXBXcmFwcGVyLCBMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7ZGVidWdPdXRwdXRBc3RBc0RhcnR9IGZyb20gJy4vZGFydF9lbWl0dGVyJztcbmltcG9ydCB7ZGVidWdPdXRwdXRBc3RBc1R5cGVTY3JpcHR9IGZyb20gJy4vdHNfZW1pdHRlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnRlcnByZXRTdGF0ZW1lbnRzKHN0YXRlbWVudHM6IG8uU3RhdGVtZW50W10sIHJlc3VsdFZhcjogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VGYWN0b3J5OiBJbnN0YW5jZUZhY3RvcnkpOiBhbnkge1xuICB2YXIgc3RtdHNXaXRoUmV0dXJuID0gc3RhdGVtZW50cy5jb25jYXQoW25ldyBvLlJldHVyblN0YXRlbWVudChvLnZhcmlhYmxlKHJlc3VsdFZhcikpXSk7XG4gIHZhciBjdHggPSBuZXcgX0V4ZWN1dGlvbkNvbnRleHQobnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbmV3IE1hcDxzdHJpbmcsIGFueT4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgTWFwPHN0cmluZywgYW55PigpLCBuZXcgTWFwPHN0cmluZywgRnVuY3Rpb24+KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IE1hcDxzdHJpbmcsIEZ1bmN0aW9uPigpLCBpbnN0YW5jZUZhY3RvcnkpO1xuICB2YXIgdmlzaXRvciA9IG5ldyBTdGF0ZW1lbnRJbnRlcnByZXRlcigpO1xuICB2YXIgcmVzdWx0ID0gdmlzaXRvci52aXNpdEFsbFN0YXRlbWVudHMoc3RtdHNXaXRoUmV0dXJuLCBjdHgpO1xuICByZXR1cm4gaXNQcmVzZW50KHJlc3VsdCkgPyByZXN1bHQudmFsdWUgOiBudWxsO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEluc3RhbmNlRmFjdG9yeSB7XG4gIGNyZWF0ZUluc3RhbmNlKHN1cGVyQ2xhc3M6IGFueSwgY2xheno6IGFueSwgY29uc3RydWN0b3JBcmdzOiBhbnlbXSwgcHJvcHM6IE1hcDxzdHJpbmcsIGFueT4sXG4gICAgICAgICAgICAgICAgIGdldHRlcnM6IE1hcDxzdHJpbmcsIEZ1bmN0aW9uPiwgbWV0aG9kczogTWFwPHN0cmluZywgRnVuY3Rpb24+KTogRHluYW1pY0luc3RhbmNlO1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRHluYW1pY0luc3RhbmNlIHtcbiAgZ2V0IHByb3BzKCk6IE1hcDxzdHJpbmcsIGFueT4geyByZXR1cm4gdW5pbXBsZW1lbnRlZCgpOyB9XG4gIGdldCBnZXR0ZXJzKCk6IE1hcDxzdHJpbmcsIEZ1bmN0aW9uPiB7IHJldHVybiB1bmltcGxlbWVudGVkKCk7IH1cbiAgZ2V0IG1ldGhvZHMoKTogTWFwPHN0cmluZywgYW55PiB7IHJldHVybiB1bmltcGxlbWVudGVkKCk7IH1cbiAgZ2V0IGNsYXp6KCk6IGFueSB7IHJldHVybiB1bmltcGxlbWVudGVkKCk7IH1cbn1cblxuZnVuY3Rpb24gaXNEeW5hbWljSW5zdGFuY2UoaW5zdGFuY2U6IGFueSk6IGFueSB7XG4gIGlmIChJU19EQVJUKSB7XG4gICAgcmV0dXJuIGluc3RhbmNlIGluc3RhbmNlb2YgRHluYW1pY0luc3RhbmNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBpc1ByZXNlbnQoaW5zdGFuY2UpICYmIGlzUHJlc2VudChpbnN0YW5jZS5wcm9wcykgJiYgaXNQcmVzZW50KGluc3RhbmNlLmdldHRlcnMpICYmXG4gICAgICAgICAgIGlzUHJlc2VudChpbnN0YW5jZS5tZXRob2RzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfZXhlY3V0ZUZ1bmN0aW9uU3RhdGVtZW50cyh2YXJOYW1lczogc3RyaW5nW10sIHZhclZhbHVlczogYW55W10sIHN0YXRlbWVudHM6IG8uU3RhdGVtZW50W10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHg6IF9FeGVjdXRpb25Db250ZXh0LCB2aXNpdG9yOiBTdGF0ZW1lbnRJbnRlcnByZXRlcik6IGFueSB7XG4gIHZhciBjaGlsZEN0eCA9IGN0eC5jcmVhdGVDaGlsZFdpaHRMb2NhbFZhcnMoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YXJOYW1lcy5sZW5ndGg7IGkrKykge1xuICAgIGNoaWxkQ3R4LnZhcnMuc2V0KHZhck5hbWVzW2ldLCB2YXJWYWx1ZXNbaV0pO1xuICB9XG4gIHZhciByZXN1bHQgPSB2aXNpdG9yLnZpc2l0QWxsU3RhdGVtZW50cyhzdGF0ZW1lbnRzLCBjaGlsZEN0eCk7XG4gIHJldHVybiBpc1ByZXNlbnQocmVzdWx0KSA/IHJlc3VsdC52YWx1ZSA6IG51bGw7XG59XG5cbmNsYXNzIF9FeGVjdXRpb25Db250ZXh0IHtcbiAgY29uc3RydWN0b3IocHVibGljIHBhcmVudDogX0V4ZWN1dGlvbkNvbnRleHQsIHB1YmxpYyBzdXBlckNsYXNzOiBhbnksIHB1YmxpYyBzdXBlckluc3RhbmNlOiBhbnksXG4gICAgICAgICAgICAgIHB1YmxpYyBjbGFzc05hbWU6IHN0cmluZywgcHVibGljIHZhcnM6IE1hcDxzdHJpbmcsIGFueT4sXG4gICAgICAgICAgICAgIHB1YmxpYyBwcm9wczogTWFwPHN0cmluZywgYW55PiwgcHVibGljIGdldHRlcnM6IE1hcDxzdHJpbmcsIEZ1bmN0aW9uPixcbiAgICAgICAgICAgICAgcHVibGljIG1ldGhvZHM6IE1hcDxzdHJpbmcsIEZ1bmN0aW9uPiwgcHVibGljIGluc3RhbmNlRmFjdG9yeTogSW5zdGFuY2VGYWN0b3J5KSB7fVxuXG4gIGNyZWF0ZUNoaWxkV2lodExvY2FsVmFycygpOiBfRXhlY3V0aW9uQ29udGV4dCB7XG4gICAgcmV0dXJuIG5ldyBfRXhlY3V0aW9uQ29udGV4dCh0aGlzLCB0aGlzLnN1cGVyQ2xhc3MsIHRoaXMuc3VwZXJJbnN0YW5jZSwgdGhpcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgTWFwPHN0cmluZywgYW55PigpLCB0aGlzLnByb3BzLCB0aGlzLmdldHRlcnMsIHRoaXMubWV0aG9kcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VGYWN0b3J5KTtcbiAgfVxufVxuXG5jbGFzcyBSZXR1cm5WYWx1ZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogYW55KSB7fVxufVxuXG5jbGFzcyBfRHluYW1pY0NsYXNzIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2xhc3NTdG10OiBvLkNsYXNzU3RtdCwgcHJpdmF0ZSBfY3R4OiBfRXhlY3V0aW9uQ29udGV4dCxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfdmlzaXRvcjogU3RhdGVtZW50SW50ZXJwcmV0ZXIpIHt9XG5cbiAgaW5zdGFudGlhdGUoYXJnczogYW55W10pOiBEeW5hbWljSW5zdGFuY2Uge1xuICAgIHZhciBwcm9wcyA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gICAgdmFyIGdldHRlcnMgPSBuZXcgTWFwPHN0cmluZywgRnVuY3Rpb24+KCk7XG4gICAgdmFyIG1ldGhvZHMgPSBuZXcgTWFwPHN0cmluZywgRnVuY3Rpb24+KCk7XG4gICAgdmFyIHN1cGVyQ2xhc3MgPSB0aGlzLl9jbGFzc1N0bXQucGFyZW50LnZpc2l0RXhwcmVzc2lvbih0aGlzLl92aXNpdG9yLCB0aGlzLl9jdHgpO1xuICAgIHZhciBpbnN0YW5jZUN0eCA9XG4gICAgICAgIG5ldyBfRXhlY3V0aW9uQ29udGV4dCh0aGlzLl9jdHgsIHN1cGVyQ2xhc3MsIG51bGwsIHRoaXMuX2NsYXNzU3RtdC5uYW1lLCB0aGlzLl9jdHgudmFycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLCBnZXR0ZXJzLCBtZXRob2RzLCB0aGlzLl9jdHguaW5zdGFuY2VGYWN0b3J5KTtcblxuICAgIHRoaXMuX2NsYXNzU3RtdC5maWVsZHMuZm9yRWFjaCgoZmllbGQ6IG8uQ2xhc3NGaWVsZCkgPT4geyBwcm9wcy5zZXQoZmllbGQubmFtZSwgbnVsbCk7IH0pO1xuICAgIHRoaXMuX2NsYXNzU3RtdC5nZXR0ZXJzLmZvckVhY2goKGdldHRlcjogby5DbGFzc0dldHRlcikgPT4ge1xuICAgICAgZ2V0dGVycy5zZXQoZ2V0dGVyLm5hbWUsICgpID0+IF9leGVjdXRlRnVuY3Rpb25TdGF0ZW1lbnRzKFtdLCBbXSwgZ2V0dGVyLmJvZHksIGluc3RhbmNlQ3R4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Zpc2l0b3IpKTtcbiAgICB9KTtcbiAgICB0aGlzLl9jbGFzc1N0bXQubWV0aG9kcy5mb3JFYWNoKChtZXRob2Q6IG8uQ2xhc3NNZXRob2QpID0+IHtcbiAgICAgIHZhciBwYXJhbU5hbWVzID0gbWV0aG9kLnBhcmFtcy5tYXAocGFyYW0gPT4gcGFyYW0ubmFtZSk7XG4gICAgICBtZXRob2RzLnNldChtZXRob2QubmFtZSwgX2RlY2xhcmVGbihwYXJhbU5hbWVzLCBtZXRob2QuYm9keSwgaW5zdGFuY2VDdHgsIHRoaXMuX3Zpc2l0b3IpKTtcbiAgICB9KTtcblxuICAgIHZhciBjdG9yUGFyYW1OYW1lcyA9IHRoaXMuX2NsYXNzU3RtdC5jb25zdHJ1Y3Rvck1ldGhvZC5wYXJhbXMubWFwKHBhcmFtID0+IHBhcmFtLm5hbWUpO1xuICAgIF9leGVjdXRlRnVuY3Rpb25TdGF0ZW1lbnRzKGN0b3JQYXJhbU5hbWVzLCBhcmdzLCB0aGlzLl9jbGFzc1N0bXQuY29uc3RydWN0b3JNZXRob2QuYm9keSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZUN0eCwgdGhpcy5fdmlzaXRvcik7XG4gICAgcmV0dXJuIGluc3RhbmNlQ3R4LnN1cGVySW5zdGFuY2U7XG4gIH1cblxuICBkZWJ1Z0FzdCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fdmlzaXRvci5kZWJ1Z0FzdCh0aGlzLl9jbGFzc1N0bXQpOyB9XG59XG5cbmNsYXNzIFN0YXRlbWVudEludGVycHJldGVyIGltcGxlbWVudHMgby5TdGF0ZW1lbnRWaXNpdG9yLCBvLkV4cHJlc3Npb25WaXNpdG9yIHtcbiAgZGVidWdBc3QoYXN0OiBvLkV4cHJlc3Npb24gfCBvLlN0YXRlbWVudCB8IG8uVHlwZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIElTX0RBUlQgPyBkZWJ1Z091dHB1dEFzdEFzRGFydChhc3QpIDogZGVidWdPdXRwdXRBc3RBc1R5cGVTY3JpcHQoYXN0KTtcbiAgfVxuXG4gIHZpc2l0RGVjbGFyZVZhclN0bXQoc3RtdDogby5EZWNsYXJlVmFyU3RtdCwgY3R4OiBfRXhlY3V0aW9uQ29udGV4dCk6IGFueSB7XG4gICAgY3R4LnZhcnMuc2V0KHN0bXQubmFtZSwgc3RtdC52YWx1ZS52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXRXcml0ZVZhckV4cHIoZXhwcjogby5Xcml0ZVZhckV4cHIsIGN0eDogX0V4ZWN1dGlvbkNvbnRleHQpOiBhbnkge1xuICAgIHZhciB2YWx1ZSA9IGV4cHIudmFsdWUudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgdmFyIGN1cnJDdHggPSBjdHg7XG4gICAgd2hpbGUgKGN1cnJDdHggIT0gbnVsbCkge1xuICAgICAgaWYgKGN1cnJDdHgudmFycy5oYXMoZXhwci5uYW1lKSkge1xuICAgICAgICBjdXJyQ3R4LnZhcnMuc2V0KGV4cHIubmFtZSwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgICBjdXJyQ3R4ID0gY3VyckN0eC5wYXJlbnQ7XG4gICAgfVxuICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBOb3QgZGVjbGFyZWQgdmFyaWFibGUgJHtleHByLm5hbWV9YCk7XG4gIH1cbiAgdmlzaXRSZWFkVmFyRXhwcihhc3Q6IG8uUmVhZFZhckV4cHIsIGN0eDogX0V4ZWN1dGlvbkNvbnRleHQpOiBhbnkge1xuICAgIHZhciB2YXJOYW1lID0gYXN0Lm5hbWU7XG4gICAgaWYgKGlzUHJlc2VudChhc3QuYnVpbHRpbikpIHtcbiAgICAgIHN3aXRjaCAoYXN0LmJ1aWx0aW4pIHtcbiAgICAgICAgY2FzZSBvLkJ1aWx0aW5WYXIuU3VwZXI6XG4gICAgICAgIGNhc2Ugby5CdWlsdGluVmFyLlRoaXM6XG4gICAgICAgICAgcmV0dXJuIGN0eC5zdXBlckluc3RhbmNlO1xuICAgICAgICBjYXNlIG8uQnVpbHRpblZhci5DYXRjaEVycm9yOlxuICAgICAgICAgIHZhck5hbWUgPSBDQVRDSF9FUlJPUl9WQVI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Ugby5CdWlsdGluVmFyLkNhdGNoU3RhY2s6XG4gICAgICAgICAgdmFyTmFtZSA9IENBVENIX1NUQUNLX1ZBUjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgVW5rbm93biBidWlsdGluIHZhcmlhYmxlICR7YXN0LmJ1aWx0aW59YCk7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBjdXJyQ3R4ID0gY3R4O1xuICAgIHdoaWxlIChjdXJyQ3R4ICE9IG51bGwpIHtcbiAgICAgIGlmIChjdXJyQ3R4LnZhcnMuaGFzKHZhck5hbWUpKSB7XG4gICAgICAgIHJldHVybiBjdXJyQ3R4LnZhcnMuZ2V0KHZhck5hbWUpO1xuICAgICAgfVxuICAgICAgY3VyckN0eCA9IGN1cnJDdHgucGFyZW50O1xuICAgIH1cbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgTm90IGRlY2xhcmVkIHZhcmlhYmxlICR7dmFyTmFtZX1gKTtcbiAgfVxuICB2aXNpdFdyaXRlS2V5RXhwcihleHByOiBvLldyaXRlS2V5RXhwciwgY3R4OiBfRXhlY3V0aW9uQ29udGV4dCk6IGFueSB7XG4gICAgdmFyIHJlY2VpdmVyID0gZXhwci5yZWNlaXZlci52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICB2YXIgaW5kZXggPSBleHByLmluZGV4LnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICAgIHZhciB2YWx1ZSA9IGV4cHIudmFsdWUudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgcmVjZWl2ZXJbaW5kZXhdID0gdmFsdWU7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHZpc2l0V3JpdGVQcm9wRXhwcihleHByOiBvLldyaXRlUHJvcEV4cHIsIGN0eDogX0V4ZWN1dGlvbkNvbnRleHQpOiBhbnkge1xuICAgIHZhciByZWNlaXZlciA9IGV4cHIucmVjZWl2ZXIudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgdmFyIHZhbHVlID0gZXhwci52YWx1ZS52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICBpZiAoaXNEeW5hbWljSW5zdGFuY2UocmVjZWl2ZXIpKSB7XG4gICAgICB2YXIgZGkgPSA8RHluYW1pY0luc3RhbmNlPnJlY2VpdmVyO1xuICAgICAgaWYgKGRpLnByb3BzLmhhcyhleHByLm5hbWUpKSB7XG4gICAgICAgIGRpLnByb3BzLnNldChleHByLm5hbWUsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlZmxlY3Rvci5zZXR0ZXIoZXhwci5uYW1lKShyZWNlaXZlciwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZWZsZWN0b3Iuc2V0dGVyKGV4cHIubmFtZSkocmVjZWl2ZXIsIHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgdmlzaXRJbnZva2VNZXRob2RFeHByKGV4cHI6IG8uSW52b2tlTWV0aG9kRXhwciwgY3R4OiBfRXhlY3V0aW9uQ29udGV4dCk6IGFueSB7XG4gICAgdmFyIHJlY2VpdmVyID0gZXhwci5yZWNlaXZlci52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICB2YXIgYXJncyA9IHRoaXMudmlzaXRBbGxFeHByZXNzaW9ucyhleHByLmFyZ3MsIGN0eCk7XG4gICAgdmFyIHJlc3VsdDtcbiAgICBpZiAoaXNQcmVzZW50KGV4cHIuYnVpbHRpbikpIHtcbiAgICAgIHN3aXRjaCAoZXhwci5idWlsdGluKSB7XG4gICAgICAgIGNhc2Ugby5CdWlsdGluTWV0aG9kLkNvbmNhdEFycmF5OlxuICAgICAgICAgIHJlc3VsdCA9IExpc3RXcmFwcGVyLmNvbmNhdChyZWNlaXZlciwgYXJnc1swXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Ugby5CdWlsdGluTWV0aG9kLlN1YnNjcmliZU9ic2VydmFibGU6XG4gICAgICAgICAgcmVzdWx0ID0gT2JzZXJ2YWJsZVdyYXBwZXIuc3Vic2NyaWJlKHJlY2VpdmVyLCBhcmdzWzBdKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBvLkJ1aWx0aW5NZXRob2QuYmluZDpcbiAgICAgICAgICBpZiAoSVNfREFSVCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gcmVjZWl2ZXI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlY2VpdmVyLmJpbmQoYXJnc1swXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBVbmtub3duIGJ1aWx0aW4gbWV0aG9kICR7ZXhwci5idWlsdGlufWApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNEeW5hbWljSW5zdGFuY2UocmVjZWl2ZXIpKSB7XG4gICAgICB2YXIgZGkgPSA8RHluYW1pY0luc3RhbmNlPnJlY2VpdmVyO1xuICAgICAgaWYgKGRpLm1ldGhvZHMuaGFzKGV4cHIubmFtZSkpIHtcbiAgICAgICAgcmVzdWx0ID0gRnVuY3Rpb25XcmFwcGVyLmFwcGx5KGRpLm1ldGhvZHMuZ2V0KGV4cHIubmFtZSksIGFyZ3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gcmVmbGVjdG9yLm1ldGhvZChleHByLm5hbWUpKHJlY2VpdmVyLCBhcmdzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gcmVmbGVjdG9yLm1ldGhvZChleHByLm5hbWUpKHJlY2VpdmVyLCBhcmdzKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICB2aXNpdEludm9rZUZ1bmN0aW9uRXhwcihzdG10OiBvLkludm9rZUZ1bmN0aW9uRXhwciwgY3R4OiBfRXhlY3V0aW9uQ29udGV4dCk6IGFueSB7XG4gICAgdmFyIGFyZ3MgPSB0aGlzLnZpc2l0QWxsRXhwcmVzc2lvbnMoc3RtdC5hcmdzLCBjdHgpO1xuICAgIHZhciBmbkV4cHIgPSBzdG10LmZuO1xuICAgIGlmIChmbkV4cHIgaW5zdGFuY2VvZiBvLlJlYWRWYXJFeHByICYmIGZuRXhwci5idWlsdGluID09PSBvLkJ1aWx0aW5WYXIuU3VwZXIpIHtcbiAgICAgIGN0eC5zdXBlckluc3RhbmNlID0gY3R4Lmluc3RhbmNlRmFjdG9yeS5jcmVhdGVJbnN0YW5jZShjdHguc3VwZXJDbGFzcywgY3R4LmNsYXNzTmFtZSwgYXJncyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHgucHJvcHMsIGN0eC5nZXR0ZXJzLCBjdHgubWV0aG9kcyk7XG4gICAgICBjdHgucGFyZW50LnN1cGVySW5zdGFuY2UgPSBjdHguc3VwZXJJbnN0YW5jZTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZm4gPSBzdG10LmZuLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICAgICAgcmV0dXJuIEZ1bmN0aW9uV3JhcHBlci5hcHBseShmbiwgYXJncyk7XG4gICAgfVxuICB9XG4gIHZpc2l0UmV0dXJuU3RtdChzdG10OiBvLlJldHVyblN0YXRlbWVudCwgY3R4OiBfRXhlY3V0aW9uQ29udGV4dCk6IGFueSB7XG4gICAgcmV0dXJuIG5ldyBSZXR1cm5WYWx1ZShzdG10LnZhbHVlLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpKTtcbiAgfVxuICB2aXNpdERlY2xhcmVDbGFzc1N0bXQoc3RtdDogby5DbGFzc1N0bXQsIGN0eDogX0V4ZWN1dGlvbkNvbnRleHQpOiBhbnkge1xuICAgIHZhciBjbGF6eiA9IG5ldyBfRHluYW1pY0NsYXNzKHN0bXQsIGN0eCwgdGhpcyk7XG4gICAgY3R4LnZhcnMuc2V0KHN0bXQubmFtZSwgY2xhenopO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0RXhwcmVzc2lvblN0bXQoc3RtdDogby5FeHByZXNzaW9uU3RhdGVtZW50LCBjdHg6IF9FeGVjdXRpb25Db250ZXh0KTogYW55IHtcbiAgICByZXR1cm4gc3RtdC5leHByLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICB9XG4gIHZpc2l0SWZTdG10KHN0bXQ6IG8uSWZTdG10LCBjdHg6IF9FeGVjdXRpb25Db250ZXh0KTogYW55IHtcbiAgICB2YXIgY29uZGl0aW9uID0gc3RtdC5jb25kaXRpb24udmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgaWYgKGNvbmRpdGlvbikge1xuICAgICAgcmV0dXJuIHRoaXMudmlzaXRBbGxTdGF0ZW1lbnRzKHN0bXQudHJ1ZUNhc2UsIGN0eCk7XG4gICAgfSBlbHNlIGlmIChpc1ByZXNlbnQoc3RtdC5mYWxzZUNhc2UpKSB7XG4gICAgICByZXR1cm4gdGhpcy52aXNpdEFsbFN0YXRlbWVudHMoc3RtdC5mYWxzZUNhc2UsIGN0eCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0VHJ5Q2F0Y2hTdG10KHN0bXQ6IG8uVHJ5Q2F0Y2hTdG10LCBjdHg6IF9FeGVjdXRpb25Db250ZXh0KTogYW55IHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHRoaXMudmlzaXRBbGxTdGF0ZW1lbnRzKHN0bXQuYm9keVN0bXRzLCBjdHgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHZhciBjaGlsZEN0eCA9IGN0eC5jcmVhdGVDaGlsZFdpaHRMb2NhbFZhcnMoKTtcbiAgICAgIGNoaWxkQ3R4LnZhcnMuc2V0KENBVENIX0VSUk9SX1ZBUiwgZSk7XG4gICAgICBjaGlsZEN0eC52YXJzLnNldChDQVRDSF9TVEFDS19WQVIsIGUuc3RhY2spO1xuICAgICAgcmV0dXJuIHRoaXMudmlzaXRBbGxTdGF0ZW1lbnRzKHN0bXQuY2F0Y2hTdG10cywgY2hpbGRDdHgpO1xuICAgIH1cbiAgfVxuICB2aXNpdFRocm93U3RtdChzdG10OiBvLlRocm93U3RtdCwgY3R4OiBfRXhlY3V0aW9uQ29udGV4dCk6IGFueSB7XG4gICAgdGhyb3cgc3RtdC5lcnJvci52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgfVxuICB2aXNpdENvbW1lbnRTdG10KHN0bXQ6IG8uQ29tbWVudFN0bXQsIGNvbnRleHQ/OiBhbnkpOiBhbnkgeyByZXR1cm4gbnVsbDsgfVxuICB2aXNpdEluc3RhbnRpYXRlRXhwcihhc3Q6IG8uSW5zdGFudGlhdGVFeHByLCBjdHg6IF9FeGVjdXRpb25Db250ZXh0KTogYW55IHtcbiAgICB2YXIgYXJncyA9IHRoaXMudmlzaXRBbGxFeHByZXNzaW9ucyhhc3QuYXJncywgY3R4KTtcbiAgICB2YXIgY2xhenogPSBhc3QuY2xhc3NFeHByLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICAgIGlmIChjbGF6eiBpbnN0YW5jZW9mIF9EeW5hbWljQ2xhc3MpIHtcbiAgICAgIHJldHVybiBjbGF6ei5pbnN0YW50aWF0ZShhcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIEZ1bmN0aW9uV3JhcHBlci5hcHBseShyZWZsZWN0b3IuZmFjdG9yeShjbGF6eiksIGFyZ3MpO1xuICAgIH1cbiAgfVxuICB2aXNpdExpdGVyYWxFeHByKGFzdDogby5MaXRlcmFsRXhwciwgY3R4OiBfRXhlY3V0aW9uQ29udGV4dCk6IGFueSB7IHJldHVybiBhc3QudmFsdWU7IH1cbiAgdmlzaXRFeHRlcm5hbEV4cHIoYXN0OiBvLkV4dGVybmFsRXhwciwgY3R4OiBfRXhlY3V0aW9uQ29udGV4dCk6IGFueSB7IHJldHVybiBhc3QudmFsdWUucnVudGltZTsgfVxuICB2aXNpdENvbmRpdGlvbmFsRXhwcihhc3Q6IG8uQ29uZGl0aW9uYWxFeHByLCBjdHg6IF9FeGVjdXRpb25Db250ZXh0KTogYW55IHtcbiAgICBpZiAoYXN0LmNvbmRpdGlvbi52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KSkge1xuICAgICAgcmV0dXJuIGFzdC50cnVlQ2FzZS52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICB9IGVsc2UgaWYgKGlzUHJlc2VudChhc3QuZmFsc2VDYXNlKSkge1xuICAgICAgcmV0dXJuIGFzdC5mYWxzZUNhc2UudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0Tm90RXhwcihhc3Q6IG8uTm90RXhwciwgY3R4OiBfRXhlY3V0aW9uQ29udGV4dCk6IGFueSB7XG4gICAgcmV0dXJuICFhc3QuY29uZGl0aW9uLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICB9XG4gIHZpc2l0Q2FzdEV4cHIoYXN0OiBvLkNhc3RFeHByLCBjdHg6IF9FeGVjdXRpb25Db250ZXh0KTogYW55IHtcbiAgICByZXR1cm4gYXN0LnZhbHVlLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICB9XG4gIHZpc2l0RnVuY3Rpb25FeHByKGFzdDogby5GdW5jdGlvbkV4cHIsIGN0eDogX0V4ZWN1dGlvbkNvbnRleHQpOiBhbnkge1xuICAgIHZhciBwYXJhbU5hbWVzID0gYXN0LnBhcmFtcy5tYXAoKHBhcmFtKSA9PiBwYXJhbS5uYW1lKTtcbiAgICByZXR1cm4gX2RlY2xhcmVGbihwYXJhbU5hbWVzLCBhc3Quc3RhdGVtZW50cywgY3R4LCB0aGlzKTtcbiAgfVxuICB2aXNpdERlY2xhcmVGdW5jdGlvblN0bXQoc3RtdDogby5EZWNsYXJlRnVuY3Rpb25TdG10LCBjdHg6IF9FeGVjdXRpb25Db250ZXh0KTogYW55IHtcbiAgICB2YXIgcGFyYW1OYW1lcyA9IHN0bXQucGFyYW1zLm1hcCgocGFyYW0pID0+IHBhcmFtLm5hbWUpO1xuICAgIGN0eC52YXJzLnNldChzdG10Lm5hbWUsIF9kZWNsYXJlRm4ocGFyYW1OYW1lcywgc3RtdC5zdGF0ZW1lbnRzLCBjdHgsIHRoaXMpKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdEJpbmFyeU9wZXJhdG9yRXhwcihhc3Q6IG8uQmluYXJ5T3BlcmF0b3JFeHByLCBjdHg6IF9FeGVjdXRpb25Db250ZXh0KTogYW55IHtcbiAgICB2YXIgbGhzID0gKCkgPT4gYXN0Lmxocy52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICB2YXIgcmhzID0gKCkgPT4gYXN0LnJocy52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcblxuICAgIHN3aXRjaCAoYXN0Lm9wZXJhdG9yKSB7XG4gICAgICBjYXNlIG8uQmluYXJ5T3BlcmF0b3IuRXF1YWxzOlxuICAgICAgICByZXR1cm4gbGhzKCkgPT0gcmhzKCk7XG4gICAgICBjYXNlIG8uQmluYXJ5T3BlcmF0b3IuSWRlbnRpY2FsOlxuICAgICAgICByZXR1cm4gbGhzKCkgPT09IHJocygpO1xuICAgICAgY2FzZSBvLkJpbmFyeU9wZXJhdG9yLk5vdEVxdWFsczpcbiAgICAgICAgcmV0dXJuIGxocygpICE9IHJocygpO1xuICAgICAgY2FzZSBvLkJpbmFyeU9wZXJhdG9yLk5vdElkZW50aWNhbDpcbiAgICAgICAgcmV0dXJuIGxocygpICE9PSByaHMoKTtcbiAgICAgIGNhc2Ugby5CaW5hcnlPcGVyYXRvci5BbmQ6XG4gICAgICAgIHJldHVybiBsaHMoKSAmJiByaHMoKTtcbiAgICAgIGNhc2Ugby5CaW5hcnlPcGVyYXRvci5PcjpcbiAgICAgICAgcmV0dXJuIGxocygpIHx8IHJocygpO1xuICAgICAgY2FzZSBvLkJpbmFyeU9wZXJhdG9yLlBsdXM6XG4gICAgICAgIHJldHVybiBsaHMoKSArIHJocygpO1xuICAgICAgY2FzZSBvLkJpbmFyeU9wZXJhdG9yLk1pbnVzOlxuICAgICAgICByZXR1cm4gbGhzKCkgLSByaHMoKTtcbiAgICAgIGNhc2Ugby5CaW5hcnlPcGVyYXRvci5EaXZpZGU6XG4gICAgICAgIHJldHVybiBsaHMoKSAvIHJocygpO1xuICAgICAgY2FzZSBvLkJpbmFyeU9wZXJhdG9yLk11bHRpcGx5OlxuICAgICAgICByZXR1cm4gbGhzKCkgKiByaHMoKTtcbiAgICAgIGNhc2Ugby5CaW5hcnlPcGVyYXRvci5Nb2R1bG86XG4gICAgICAgIHJldHVybiBsaHMoKSAlIHJocygpO1xuICAgICAgY2FzZSBvLkJpbmFyeU9wZXJhdG9yLkxvd2VyOlxuICAgICAgICByZXR1cm4gbGhzKCkgPCByaHMoKTtcbiAgICAgIGNhc2Ugby5CaW5hcnlPcGVyYXRvci5Mb3dlckVxdWFsczpcbiAgICAgICAgcmV0dXJuIGxocygpIDw9IHJocygpO1xuICAgICAgY2FzZSBvLkJpbmFyeU9wZXJhdG9yLkJpZ2dlcjpcbiAgICAgICAgcmV0dXJuIGxocygpID4gcmhzKCk7XG4gICAgICBjYXNlIG8uQmluYXJ5T3BlcmF0b3IuQmlnZ2VyRXF1YWxzOlxuICAgICAgICByZXR1cm4gbGhzKCkgPj0gcmhzKCk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgVW5rbm93biBvcGVyYXRvciAke2FzdC5vcGVyYXRvcn1gKTtcbiAgICB9XG4gIH1cbiAgdmlzaXRSZWFkUHJvcEV4cHIoYXN0OiBvLlJlYWRQcm9wRXhwciwgY3R4OiBfRXhlY3V0aW9uQ29udGV4dCk6IGFueSB7XG4gICAgdmFyIHJlc3VsdDtcbiAgICB2YXIgcmVjZWl2ZXIgPSBhc3QucmVjZWl2ZXIudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgaWYgKGlzRHluYW1pY0luc3RhbmNlKHJlY2VpdmVyKSkge1xuICAgICAgdmFyIGRpID0gPER5bmFtaWNJbnN0YW5jZT5yZWNlaXZlcjtcbiAgICAgIGlmIChkaS5wcm9wcy5oYXMoYXN0Lm5hbWUpKSB7XG4gICAgICAgIHJlc3VsdCA9IGRpLnByb3BzLmdldChhc3QubmFtZSk7XG4gICAgICB9IGVsc2UgaWYgKGRpLmdldHRlcnMuaGFzKGFzdC5uYW1lKSkge1xuICAgICAgICByZXN1bHQgPSBkaS5nZXR0ZXJzLmdldChhc3QubmFtZSkoKTtcbiAgICAgIH0gZWxzZSBpZiAoZGkubWV0aG9kcy5oYXMoYXN0Lm5hbWUpKSB7XG4gICAgICAgIHJlc3VsdCA9IGRpLm1ldGhvZHMuZ2V0KGFzdC5uYW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IHJlZmxlY3Rvci5nZXR0ZXIoYXN0Lm5hbWUpKHJlY2VpdmVyKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gcmVmbGVjdG9yLmdldHRlcihhc3QubmFtZSkocmVjZWl2ZXIpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIHZpc2l0UmVhZEtleUV4cHIoYXN0OiBvLlJlYWRLZXlFeHByLCBjdHg6IF9FeGVjdXRpb25Db250ZXh0KTogYW55IHtcbiAgICB2YXIgcmVjZWl2ZXIgPSBhc3QucmVjZWl2ZXIudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgdmFyIHByb3AgPSBhc3QuaW5kZXgudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgcmV0dXJuIHJlY2VpdmVyW3Byb3BdO1xuICB9XG4gIHZpc2l0TGl0ZXJhbEFycmF5RXhwcihhc3Q6IG8uTGl0ZXJhbEFycmF5RXhwciwgY3R4OiBfRXhlY3V0aW9uQ29udGV4dCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMudmlzaXRBbGxFeHByZXNzaW9ucyhhc3QuZW50cmllcywgY3R4KTtcbiAgfVxuICB2aXNpdExpdGVyYWxNYXBFeHByKGFzdDogby5MaXRlcmFsTWFwRXhwciwgY3R4OiBfRXhlY3V0aW9uQ29udGV4dCk6IGFueSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGFzdC5lbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiByZXN1bHRbPHN0cmluZz5lbnRyeVswXV0gPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICg8by5FeHByZXNzaW9uPmVudHJ5WzFdKS52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHZpc2l0QWxsRXhwcmVzc2lvbnMoZXhwcmVzc2lvbnM6IG8uRXhwcmVzc2lvbltdLCBjdHg6IF9FeGVjdXRpb25Db250ZXh0KTogYW55IHtcbiAgICByZXR1cm4gZXhwcmVzc2lvbnMubWFwKChleHByKSA9PiBleHByLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpKTtcbiAgfVxuXG4gIHZpc2l0QWxsU3RhdGVtZW50cyhzdGF0ZW1lbnRzOiBvLlN0YXRlbWVudFtdLCBjdHg6IF9FeGVjdXRpb25Db250ZXh0KTogUmV0dXJuVmFsdWUge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RhdGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHN0bXQgPSBzdGF0ZW1lbnRzW2ldO1xuICAgICAgdmFyIHZhbCA9IHN0bXQudmlzaXRTdGF0ZW1lbnQodGhpcywgY3R4KTtcbiAgICAgIGlmICh2YWwgaW5zdGFuY2VvZiBSZXR1cm5WYWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5mdW5jdGlvbiBfZGVjbGFyZUZuKHZhck5hbWVzOiBzdHJpbmdbXSwgc3RhdGVtZW50czogby5TdGF0ZW1lbnRbXSwgY3R4OiBfRXhlY3V0aW9uQ29udGV4dCxcbiAgICAgICAgICAgICAgICAgICAgdmlzaXRvcjogU3RhdGVtZW50SW50ZXJwcmV0ZXIpOiBGdW5jdGlvbiB7XG4gIHN3aXRjaCAodmFyTmFtZXMubGVuZ3RoKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuICgpID0+IF9leGVjdXRlRnVuY3Rpb25TdGF0ZW1lbnRzKHZhck5hbWVzLCBbXSwgc3RhdGVtZW50cywgY3R4LCB2aXNpdG9yKTtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gKGQwKSA9PiBfZXhlY3V0ZUZ1bmN0aW9uU3RhdGVtZW50cyh2YXJOYW1lcywgW2QwXSwgc3RhdGVtZW50cywgY3R4LCB2aXNpdG9yKTtcbiAgICBjYXNlIDI6XG4gICAgICByZXR1cm4gKGQwLCBkMSkgPT4gX2V4ZWN1dGVGdW5jdGlvblN0YXRlbWVudHModmFyTmFtZXMsIFtkMCwgZDFdLCBzdGF0ZW1lbnRzLCBjdHgsIHZpc2l0b3IpO1xuICAgIGNhc2UgMzpcbiAgICAgIHJldHVybiAoZDAsIGQxLCBkMikgPT5cbiAgICAgICAgICAgICAgICAgX2V4ZWN1dGVGdW5jdGlvblN0YXRlbWVudHModmFyTmFtZXMsIFtkMCwgZDEsIGQyXSwgc3RhdGVtZW50cywgY3R4LCB2aXNpdG9yKTtcbiAgICBjYXNlIDQ6XG4gICAgICByZXR1cm4gKGQwLCBkMSwgZDIsIGQzKSA9PlxuICAgICAgICAgICAgICAgICBfZXhlY3V0ZUZ1bmN0aW9uU3RhdGVtZW50cyh2YXJOYW1lcywgW2QwLCBkMSwgZDIsIGQzXSwgc3RhdGVtZW50cywgY3R4LCB2aXNpdG9yKTtcbiAgICBjYXNlIDU6XG4gICAgICByZXR1cm4gKGQwLCBkMSwgZDIsIGQzLCBkNCkgPT4gX2V4ZWN1dGVGdW5jdGlvblN0YXRlbWVudHModmFyTmFtZXMsIFtkMCwgZDEsIGQyLCBkMywgZDRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudHMsIGN0eCwgdmlzaXRvcik7XG4gICAgY2FzZSA2OlxuICAgICAgcmV0dXJuIChkMCwgZDEsIGQyLCBkMywgZDQsIGQ1KSA9PiBfZXhlY3V0ZUZ1bmN0aW9uU3RhdGVtZW50cyhcbiAgICAgICAgICAgICAgICAgdmFyTmFtZXMsIFtkMCwgZDEsIGQyLCBkMywgZDQsIGQ1XSwgc3RhdGVtZW50cywgY3R4LCB2aXNpdG9yKTtcbiAgICBjYXNlIDc6XG4gICAgICByZXR1cm4gKGQwLCBkMSwgZDIsIGQzLCBkNCwgZDUsIGQ2KSA9PiBfZXhlY3V0ZUZ1bmN0aW9uU3RhdGVtZW50cyhcbiAgICAgICAgICAgICAgICAgdmFyTmFtZXMsIFtkMCwgZDEsIGQyLCBkMywgZDQsIGQ1LCBkNl0sIHN0YXRlbWVudHMsIGN0eCwgdmlzaXRvcik7XG4gICAgY2FzZSA4OlxuICAgICAgcmV0dXJuIChkMCwgZDEsIGQyLCBkMywgZDQsIGQ1LCBkNiwgZDcpID0+IF9leGVjdXRlRnVuY3Rpb25TdGF0ZW1lbnRzKFxuICAgICAgICAgICAgICAgICB2YXJOYW1lcywgW2QwLCBkMSwgZDIsIGQzLCBkNCwgZDUsIGQ2LCBkN10sIHN0YXRlbWVudHMsIGN0eCwgdmlzaXRvcik7XG4gICAgY2FzZSA5OlxuICAgICAgcmV0dXJuIChkMCwgZDEsIGQyLCBkMywgZDQsIGQ1LCBkNiwgZDcsIGQ4KSA9PiBfZXhlY3V0ZUZ1bmN0aW9uU3RhdGVtZW50cyhcbiAgICAgICAgICAgICAgICAgdmFyTmFtZXMsIFtkMCwgZDEsIGQyLCBkMywgZDQsIGQ1LCBkNiwgZDcsIGQ4XSwgc3RhdGVtZW50cywgY3R4LCB2aXNpdG9yKTtcbiAgICBjYXNlIDEwOlxuICAgICAgcmV0dXJuIChkMCwgZDEsIGQyLCBkMywgZDQsIGQ1LCBkNiwgZDcsIGQ4LCBkOSkgPT4gX2V4ZWN1dGVGdW5jdGlvblN0YXRlbWVudHMoXG4gICAgICAgICAgICAgICAgIHZhck5hbWVzLCBbZDAsIGQxLCBkMiwgZDMsIGQ0LCBkNSwgZDYsIGQ3LCBkOCwgZDldLCBzdGF0ZW1lbnRzLCBjdHgsIHZpc2l0b3IpO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcbiAgICAgICAgICAnRGVjbGFyaW5nIGZ1bmN0aW9ucyB3aXRoIG1vcmUgdGhhbiAxMCBhcmd1bWVudHMgaXMgbm90IHN1cHBvcnRlZCByaWdodCBub3cnKTtcbiAgfVxufVxuXG52YXIgQ0FUQ0hfRVJST1JfVkFSID0gJ2Vycm9yJztcbnZhciBDQVRDSF9TVEFDS19WQVIgPSAnc3RhY2snOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
