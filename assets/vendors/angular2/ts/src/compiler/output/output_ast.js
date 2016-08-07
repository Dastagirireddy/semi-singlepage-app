System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lang_1;
    var TypeModifier, Type, BuiltinTypeName, BuiltinType, ExternalType, ArrayType, MapType, DYNAMIC_TYPE, BOOL_TYPE, INT_TYPE, NUMBER_TYPE, STRING_TYPE, FUNCTION_TYPE, BinaryOperator, Expression, BuiltinVar, ReadVarExpr, WriteVarExpr, WriteKeyExpr, WritePropExpr, BuiltinMethod, InvokeMethodExpr, InvokeFunctionExpr, InstantiateExpr, LiteralExpr, ExternalExpr, ConditionalExpr, NotExpr, CastExpr, FnParam, FunctionExpr, BinaryOperatorExpr, ReadPropExpr, ReadKeyExpr, LiteralArrayExpr, LiteralMapExpr, THIS_EXPR, SUPER_EXPR, CATCH_ERROR_VAR, CATCH_STACK_VAR, NULL_EXPR, StmtModifier, Statement, DeclareVarStmt, DeclareFunctionStmt, ExpressionStatement, ReturnStatement, AbstractClassPart, ClassField, ClassMethod, ClassGetter, ClassStmt, IfStmt, CommentStmt, TryCatchStmt, ThrowStmt, ExpressionTransformer, RecursiveExpressionVisitor, _ReplaceVariableTransformer, _VariableFinder;
    function replaceVarInExpression(varName, newValue, expression) {
        var transformer = new _ReplaceVariableTransformer(varName, newValue);
        return expression.visitExpression(transformer, null);
    }
    exports_1("replaceVarInExpression", replaceVarInExpression);
    function findReadVarNames(stmts) {
        var finder = new _VariableFinder();
        finder.visitAllStatements(stmts, null);
        return finder.varNames;
    }
    exports_1("findReadVarNames", findReadVarNames);
    function variable(name, type) {
        if (type === void 0) { type = null; }
        return new ReadVarExpr(name, type);
    }
    exports_1("variable", variable);
    function importExpr(id, typeParams) {
        if (typeParams === void 0) { typeParams = null; }
        return new ExternalExpr(id, null, typeParams);
    }
    exports_1("importExpr", importExpr);
    function importType(id, typeParams, typeModifiers) {
        if (typeParams === void 0) { typeParams = null; }
        if (typeModifiers === void 0) { typeModifiers = null; }
        return lang_1.isPresent(id) ? new ExternalType(id, typeParams, typeModifiers) : null;
    }
    exports_1("importType", importType);
    function literal(value, type) {
        if (type === void 0) { type = null; }
        return new LiteralExpr(value, type);
    }
    exports_1("literal", literal);
    function literalArr(values, type) {
        if (type === void 0) { type = null; }
        return new LiteralArrayExpr(values, type);
    }
    exports_1("literalArr", literalArr);
    function literalMap(values, type) {
        if (type === void 0) { type = null; }
        return new LiteralMapExpr(values, type);
    }
    exports_1("literalMap", literalMap);
    function not(expr) {
        return new NotExpr(expr);
    }
    exports_1("not", not);
    function fn(params, body, type) {
        if (type === void 0) { type = null; }
        return new FunctionExpr(params, body, type);
    }
    exports_1("fn", fn);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            //// Types
            (function (TypeModifier) {
                TypeModifier[TypeModifier["Const"] = 0] = "Const";
            })(TypeModifier || (TypeModifier = {}));
            exports_1("TypeModifier", TypeModifier);
            Type = (function () {
                function Type(modifiers) {
                    if (modifiers === void 0) { modifiers = null; }
                    this.modifiers = modifiers;
                    if (lang_1.isBlank(modifiers)) {
                        this.modifiers = [];
                    }
                }
                Type.prototype.hasModifier = function (modifier) { return this.modifiers.indexOf(modifier) !== -1; };
                return Type;
            }());
            exports_1("Type", Type);
            (function (BuiltinTypeName) {
                BuiltinTypeName[BuiltinTypeName["Dynamic"] = 0] = "Dynamic";
                BuiltinTypeName[BuiltinTypeName["Bool"] = 1] = "Bool";
                BuiltinTypeName[BuiltinTypeName["String"] = 2] = "String";
                BuiltinTypeName[BuiltinTypeName["Int"] = 3] = "Int";
                BuiltinTypeName[BuiltinTypeName["Number"] = 4] = "Number";
                BuiltinTypeName[BuiltinTypeName["Function"] = 5] = "Function";
            })(BuiltinTypeName || (BuiltinTypeName = {}));
            exports_1("BuiltinTypeName", BuiltinTypeName);
            BuiltinType = (function (_super) {
                __extends(BuiltinType, _super);
                function BuiltinType(name, modifiers) {
                    if (modifiers === void 0) { modifiers = null; }
                    _super.call(this, modifiers);
                    this.name = name;
                }
                BuiltinType.prototype.visitType = function (visitor, context) {
                    return visitor.visitBuiltintType(this, context);
                };
                return BuiltinType;
            }(Type));
            exports_1("BuiltinType", BuiltinType);
            ExternalType = (function (_super) {
                __extends(ExternalType, _super);
                function ExternalType(value, typeParams, modifiers) {
                    if (typeParams === void 0) { typeParams = null; }
                    if (modifiers === void 0) { modifiers = null; }
                    _super.call(this, modifiers);
                    this.value = value;
                    this.typeParams = typeParams;
                }
                ExternalType.prototype.visitType = function (visitor, context) {
                    return visitor.visitExternalType(this, context);
                };
                return ExternalType;
            }(Type));
            exports_1("ExternalType", ExternalType);
            ArrayType = (function (_super) {
                __extends(ArrayType, _super);
                function ArrayType(of, modifiers) {
                    if (modifiers === void 0) { modifiers = null; }
                    _super.call(this, modifiers);
                    this.of = of;
                }
                ArrayType.prototype.visitType = function (visitor, context) {
                    return visitor.visitArrayType(this, context);
                };
                return ArrayType;
            }(Type));
            exports_1("ArrayType", ArrayType);
            MapType = (function (_super) {
                __extends(MapType, _super);
                function MapType(valueType, modifiers) {
                    if (modifiers === void 0) { modifiers = null; }
                    _super.call(this, modifiers);
                    this.valueType = valueType;
                }
                MapType.prototype.visitType = function (visitor, context) { return visitor.visitMapType(this, context); };
                return MapType;
            }(Type));
            exports_1("MapType", MapType);
            exports_1("DYNAMIC_TYPE", DYNAMIC_TYPE = new BuiltinType(BuiltinTypeName.Dynamic));
            exports_1("BOOL_TYPE", BOOL_TYPE = new BuiltinType(BuiltinTypeName.Bool));
            exports_1("INT_TYPE", INT_TYPE = new BuiltinType(BuiltinTypeName.Int));
            exports_1("NUMBER_TYPE", NUMBER_TYPE = new BuiltinType(BuiltinTypeName.Number));
            exports_1("STRING_TYPE", STRING_TYPE = new BuiltinType(BuiltinTypeName.String));
            exports_1("FUNCTION_TYPE", FUNCTION_TYPE = new BuiltinType(BuiltinTypeName.Function));
            ///// Expressions
            (function (BinaryOperator) {
                BinaryOperator[BinaryOperator["Equals"] = 0] = "Equals";
                BinaryOperator[BinaryOperator["NotEquals"] = 1] = "NotEquals";
                BinaryOperator[BinaryOperator["Identical"] = 2] = "Identical";
                BinaryOperator[BinaryOperator["NotIdentical"] = 3] = "NotIdentical";
                BinaryOperator[BinaryOperator["Minus"] = 4] = "Minus";
                BinaryOperator[BinaryOperator["Plus"] = 5] = "Plus";
                BinaryOperator[BinaryOperator["Divide"] = 6] = "Divide";
                BinaryOperator[BinaryOperator["Multiply"] = 7] = "Multiply";
                BinaryOperator[BinaryOperator["Modulo"] = 8] = "Modulo";
                BinaryOperator[BinaryOperator["And"] = 9] = "And";
                BinaryOperator[BinaryOperator["Or"] = 10] = "Or";
                BinaryOperator[BinaryOperator["Lower"] = 11] = "Lower";
                BinaryOperator[BinaryOperator["LowerEquals"] = 12] = "LowerEquals";
                BinaryOperator[BinaryOperator["Bigger"] = 13] = "Bigger";
                BinaryOperator[BinaryOperator["BiggerEquals"] = 14] = "BiggerEquals";
            })(BinaryOperator || (BinaryOperator = {}));
            exports_1("BinaryOperator", BinaryOperator);
            Expression = (function () {
                function Expression(type) {
                    this.type = type;
                }
                Expression.prototype.prop = function (name) { return new ReadPropExpr(this, name); };
                Expression.prototype.key = function (index, type) {
                    if (type === void 0) { type = null; }
                    return new ReadKeyExpr(this, index, type);
                };
                Expression.prototype.callMethod = function (name, params) {
                    return new InvokeMethodExpr(this, name, params);
                };
                Expression.prototype.callFn = function (params) { return new InvokeFunctionExpr(this, params); };
                Expression.prototype.instantiate = function (params, type) {
                    if (type === void 0) { type = null; }
                    return new InstantiateExpr(this, params, type);
                };
                Expression.prototype.conditional = function (trueCase, falseCase) {
                    if (falseCase === void 0) { falseCase = null; }
                    return new ConditionalExpr(this, trueCase, falseCase);
                };
                Expression.prototype.equals = function (rhs) {
                    return new BinaryOperatorExpr(BinaryOperator.Equals, this, rhs);
                };
                Expression.prototype.notEquals = function (rhs) {
                    return new BinaryOperatorExpr(BinaryOperator.NotEquals, this, rhs);
                };
                Expression.prototype.identical = function (rhs) {
                    return new BinaryOperatorExpr(BinaryOperator.Identical, this, rhs);
                };
                Expression.prototype.notIdentical = function (rhs) {
                    return new BinaryOperatorExpr(BinaryOperator.NotIdentical, this, rhs);
                };
                Expression.prototype.minus = function (rhs) {
                    return new BinaryOperatorExpr(BinaryOperator.Minus, this, rhs);
                };
                Expression.prototype.plus = function (rhs) {
                    return new BinaryOperatorExpr(BinaryOperator.Plus, this, rhs);
                };
                Expression.prototype.divide = function (rhs) {
                    return new BinaryOperatorExpr(BinaryOperator.Divide, this, rhs);
                };
                Expression.prototype.multiply = function (rhs) {
                    return new BinaryOperatorExpr(BinaryOperator.Multiply, this, rhs);
                };
                Expression.prototype.modulo = function (rhs) {
                    return new BinaryOperatorExpr(BinaryOperator.Modulo, this, rhs);
                };
                Expression.prototype.and = function (rhs) {
                    return new BinaryOperatorExpr(BinaryOperator.And, this, rhs);
                };
                Expression.prototype.or = function (rhs) {
                    return new BinaryOperatorExpr(BinaryOperator.Or, this, rhs);
                };
                Expression.prototype.lower = function (rhs) {
                    return new BinaryOperatorExpr(BinaryOperator.Lower, this, rhs);
                };
                Expression.prototype.lowerEquals = function (rhs) {
                    return new BinaryOperatorExpr(BinaryOperator.LowerEquals, this, rhs);
                };
                Expression.prototype.bigger = function (rhs) {
                    return new BinaryOperatorExpr(BinaryOperator.Bigger, this, rhs);
                };
                Expression.prototype.biggerEquals = function (rhs) {
                    return new BinaryOperatorExpr(BinaryOperator.BiggerEquals, this, rhs);
                };
                Expression.prototype.isBlank = function () {
                    // Note: We use equals by purpose here to compare to null and undefined in JS.
                    return this.equals(NULL_EXPR);
                };
                Expression.prototype.cast = function (type) { return new CastExpr(this, type); };
                Expression.prototype.toStmt = function () { return new ExpressionStatement(this); };
                return Expression;
            }());
            exports_1("Expression", Expression);
            (function (BuiltinVar) {
                BuiltinVar[BuiltinVar["This"] = 0] = "This";
                BuiltinVar[BuiltinVar["Super"] = 1] = "Super";
                BuiltinVar[BuiltinVar["CatchError"] = 2] = "CatchError";
                BuiltinVar[BuiltinVar["CatchStack"] = 3] = "CatchStack";
            })(BuiltinVar || (BuiltinVar = {}));
            exports_1("BuiltinVar", BuiltinVar);
            ReadVarExpr = (function (_super) {
                __extends(ReadVarExpr, _super);
                function ReadVarExpr(name, type) {
                    if (type === void 0) { type = null; }
                    _super.call(this, type);
                    if (lang_1.isString(name)) {
                        this.name = name;
                        this.builtin = null;
                    }
                    else {
                        this.name = null;
                        this.builtin = name;
                    }
                }
                ReadVarExpr.prototype.visitExpression = function (visitor, context) {
                    return visitor.visitReadVarExpr(this, context);
                };
                ReadVarExpr.prototype.set = function (value) { return new WriteVarExpr(this.name, value); };
                return ReadVarExpr;
            }(Expression));
            exports_1("ReadVarExpr", ReadVarExpr);
            WriteVarExpr = (function (_super) {
                __extends(WriteVarExpr, _super);
                function WriteVarExpr(name, value, type) {
                    if (type === void 0) { type = null; }
                    _super.call(this, lang_1.isPresent(type) ? type : value.type);
                    this.name = name;
                    this.value = value;
                }
                WriteVarExpr.prototype.visitExpression = function (visitor, context) {
                    return visitor.visitWriteVarExpr(this, context);
                };
                WriteVarExpr.prototype.toDeclStmt = function (type, modifiers) {
                    if (type === void 0) { type = null; }
                    if (modifiers === void 0) { modifiers = null; }
                    return new DeclareVarStmt(this.name, this.value, type, modifiers);
                };
                return WriteVarExpr;
            }(Expression));
            exports_1("WriteVarExpr", WriteVarExpr);
            WriteKeyExpr = (function (_super) {
                __extends(WriteKeyExpr, _super);
                function WriteKeyExpr(receiver, index, value, type) {
                    if (type === void 0) { type = null; }
                    _super.call(this, lang_1.isPresent(type) ? type : value.type);
                    this.receiver = receiver;
                    this.index = index;
                    this.value = value;
                }
                WriteKeyExpr.prototype.visitExpression = function (visitor, context) {
                    return visitor.visitWriteKeyExpr(this, context);
                };
                return WriteKeyExpr;
            }(Expression));
            exports_1("WriteKeyExpr", WriteKeyExpr);
            WritePropExpr = (function (_super) {
                __extends(WritePropExpr, _super);
                function WritePropExpr(receiver, name, value, type) {
                    if (type === void 0) { type = null; }
                    _super.call(this, lang_1.isPresent(type) ? type : value.type);
                    this.receiver = receiver;
                    this.name = name;
                    this.value = value;
                }
                WritePropExpr.prototype.visitExpression = function (visitor, context) {
                    return visitor.visitWritePropExpr(this, context);
                };
                return WritePropExpr;
            }(Expression));
            exports_1("WritePropExpr", WritePropExpr);
            (function (BuiltinMethod) {
                BuiltinMethod[BuiltinMethod["ConcatArray"] = 0] = "ConcatArray";
                BuiltinMethod[BuiltinMethod["SubscribeObservable"] = 1] = "SubscribeObservable";
                BuiltinMethod[BuiltinMethod["bind"] = 2] = "bind";
            })(BuiltinMethod || (BuiltinMethod = {}));
            exports_1("BuiltinMethod", BuiltinMethod);
            InvokeMethodExpr = (function (_super) {
                __extends(InvokeMethodExpr, _super);
                function InvokeMethodExpr(receiver, method, args, type) {
                    if (type === void 0) { type = null; }
                    _super.call(this, type);
                    this.receiver = receiver;
                    this.args = args;
                    if (lang_1.isString(method)) {
                        this.name = method;
                        this.builtin = null;
                    }
                    else {
                        this.name = null;
                        this.builtin = method;
                    }
                }
                InvokeMethodExpr.prototype.visitExpression = function (visitor, context) {
                    return visitor.visitInvokeMethodExpr(this, context);
                };
                return InvokeMethodExpr;
            }(Expression));
            exports_1("InvokeMethodExpr", InvokeMethodExpr);
            InvokeFunctionExpr = (function (_super) {
                __extends(InvokeFunctionExpr, _super);
                function InvokeFunctionExpr(fn, args, type) {
                    if (type === void 0) { type = null; }
                    _super.call(this, type);
                    this.fn = fn;
                    this.args = args;
                }
                InvokeFunctionExpr.prototype.visitExpression = function (visitor, context) {
                    return visitor.visitInvokeFunctionExpr(this, context);
                };
                return InvokeFunctionExpr;
            }(Expression));
            exports_1("InvokeFunctionExpr", InvokeFunctionExpr);
            InstantiateExpr = (function (_super) {
                __extends(InstantiateExpr, _super);
                function InstantiateExpr(classExpr, args, type) {
                    _super.call(this, type);
                    this.classExpr = classExpr;
                    this.args = args;
                }
                InstantiateExpr.prototype.visitExpression = function (visitor, context) {
                    return visitor.visitInstantiateExpr(this, context);
                };
                return InstantiateExpr;
            }(Expression));
            exports_1("InstantiateExpr", InstantiateExpr);
            LiteralExpr = (function (_super) {
                __extends(LiteralExpr, _super);
                function LiteralExpr(value, type) {
                    if (type === void 0) { type = null; }
                    _super.call(this, type);
                    this.value = value;
                }
                LiteralExpr.prototype.visitExpression = function (visitor, context) {
                    return visitor.visitLiteralExpr(this, context);
                };
                return LiteralExpr;
            }(Expression));
            exports_1("LiteralExpr", LiteralExpr);
            ExternalExpr = (function (_super) {
                __extends(ExternalExpr, _super);
                function ExternalExpr(value, type, typeParams) {
                    if (type === void 0) { type = null; }
                    if (typeParams === void 0) { typeParams = null; }
                    _super.call(this, type);
                    this.value = value;
                    this.typeParams = typeParams;
                }
                ExternalExpr.prototype.visitExpression = function (visitor, context) {
                    return visitor.visitExternalExpr(this, context);
                };
                return ExternalExpr;
            }(Expression));
            exports_1("ExternalExpr", ExternalExpr);
            ConditionalExpr = (function (_super) {
                __extends(ConditionalExpr, _super);
                function ConditionalExpr(condition, trueCase, falseCase, type) {
                    if (falseCase === void 0) { falseCase = null; }
                    if (type === void 0) { type = null; }
                    _super.call(this, lang_1.isPresent(type) ? type : trueCase.type);
                    this.condition = condition;
                    this.falseCase = falseCase;
                    this.trueCase = trueCase;
                }
                ConditionalExpr.prototype.visitExpression = function (visitor, context) {
                    return visitor.visitConditionalExpr(this, context);
                };
                return ConditionalExpr;
            }(Expression));
            exports_1("ConditionalExpr", ConditionalExpr);
            NotExpr = (function (_super) {
                __extends(NotExpr, _super);
                function NotExpr(condition) {
                    _super.call(this, BOOL_TYPE);
                    this.condition = condition;
                }
                NotExpr.prototype.visitExpression = function (visitor, context) {
                    return visitor.visitNotExpr(this, context);
                };
                return NotExpr;
            }(Expression));
            exports_1("NotExpr", NotExpr);
            CastExpr = (function (_super) {
                __extends(CastExpr, _super);
                function CastExpr(value, type) {
                    _super.call(this, type);
                    this.value = value;
                }
                CastExpr.prototype.visitExpression = function (visitor, context) {
                    return visitor.visitCastExpr(this, context);
                };
                return CastExpr;
            }(Expression));
            exports_1("CastExpr", CastExpr);
            FnParam = (function () {
                function FnParam(name, type) {
                    if (type === void 0) { type = null; }
                    this.name = name;
                    this.type = type;
                }
                return FnParam;
            }());
            exports_1("FnParam", FnParam);
            FunctionExpr = (function (_super) {
                __extends(FunctionExpr, _super);
                function FunctionExpr(params, statements, type) {
                    if (type === void 0) { type = null; }
                    _super.call(this, type);
                    this.params = params;
                    this.statements = statements;
                }
                FunctionExpr.prototype.visitExpression = function (visitor, context) {
                    return visitor.visitFunctionExpr(this, context);
                };
                FunctionExpr.prototype.toDeclStmt = function (name, modifiers) {
                    if (modifiers === void 0) { modifiers = null; }
                    return new DeclareFunctionStmt(name, this.params, this.statements, this.type, modifiers);
                };
                return FunctionExpr;
            }(Expression));
            exports_1("FunctionExpr", FunctionExpr);
            BinaryOperatorExpr = (function (_super) {
                __extends(BinaryOperatorExpr, _super);
                function BinaryOperatorExpr(operator, lhs, rhs, type) {
                    if (type === void 0) { type = null; }
                    _super.call(this, lang_1.isPresent(type) ? type : lhs.type);
                    this.operator = operator;
                    this.rhs = rhs;
                    this.lhs = lhs;
                }
                BinaryOperatorExpr.prototype.visitExpression = function (visitor, context) {
                    return visitor.visitBinaryOperatorExpr(this, context);
                };
                return BinaryOperatorExpr;
            }(Expression));
            exports_1("BinaryOperatorExpr", BinaryOperatorExpr);
            ReadPropExpr = (function (_super) {
                __extends(ReadPropExpr, _super);
                function ReadPropExpr(receiver, name, type) {
                    if (type === void 0) { type = null; }
                    _super.call(this, type);
                    this.receiver = receiver;
                    this.name = name;
                }
                ReadPropExpr.prototype.visitExpression = function (visitor, context) {
                    return visitor.visitReadPropExpr(this, context);
                };
                ReadPropExpr.prototype.set = function (value) {
                    return new WritePropExpr(this.receiver, this.name, value);
                };
                return ReadPropExpr;
            }(Expression));
            exports_1("ReadPropExpr", ReadPropExpr);
            ReadKeyExpr = (function (_super) {
                __extends(ReadKeyExpr, _super);
                function ReadKeyExpr(receiver, index, type) {
                    if (type === void 0) { type = null; }
                    _super.call(this, type);
                    this.receiver = receiver;
                    this.index = index;
                }
                ReadKeyExpr.prototype.visitExpression = function (visitor, context) {
                    return visitor.visitReadKeyExpr(this, context);
                };
                ReadKeyExpr.prototype.set = function (value) {
                    return new WriteKeyExpr(this.receiver, this.index, value);
                };
                return ReadKeyExpr;
            }(Expression));
            exports_1("ReadKeyExpr", ReadKeyExpr);
            LiteralArrayExpr = (function (_super) {
                __extends(LiteralArrayExpr, _super);
                function LiteralArrayExpr(entries, type) {
                    if (type === void 0) { type = null; }
                    _super.call(this, type);
                    this.entries = entries;
                }
                LiteralArrayExpr.prototype.visitExpression = function (visitor, context) {
                    return visitor.visitLiteralArrayExpr(this, context);
                };
                return LiteralArrayExpr;
            }(Expression));
            exports_1("LiteralArrayExpr", LiteralArrayExpr);
            LiteralMapExpr = (function (_super) {
                __extends(LiteralMapExpr, _super);
                function LiteralMapExpr(entries, type) {
                    if (type === void 0) { type = null; }
                    _super.call(this, type);
                    this.entries = entries;
                    this.valueType = null;
                    if (lang_1.isPresent(type)) {
                        this.valueType = type.valueType;
                    }
                }
                ;
                LiteralMapExpr.prototype.visitExpression = function (visitor, context) {
                    return visitor.visitLiteralMapExpr(this, context);
                };
                return LiteralMapExpr;
            }(Expression));
            exports_1("LiteralMapExpr", LiteralMapExpr);
            exports_1("THIS_EXPR", THIS_EXPR = new ReadVarExpr(BuiltinVar.This));
            exports_1("SUPER_EXPR", SUPER_EXPR = new ReadVarExpr(BuiltinVar.Super));
            exports_1("CATCH_ERROR_VAR", CATCH_ERROR_VAR = new ReadVarExpr(BuiltinVar.CatchError));
            exports_1("CATCH_STACK_VAR", CATCH_STACK_VAR = new ReadVarExpr(BuiltinVar.CatchStack));
            exports_1("NULL_EXPR", NULL_EXPR = new LiteralExpr(null, null));
            //// Statements
            (function (StmtModifier) {
                StmtModifier[StmtModifier["Final"] = 0] = "Final";
                StmtModifier[StmtModifier["Private"] = 1] = "Private";
            })(StmtModifier || (StmtModifier = {}));
            exports_1("StmtModifier", StmtModifier);
            Statement = (function () {
                function Statement(modifiers) {
                    if (modifiers === void 0) { modifiers = null; }
                    this.modifiers = modifiers;
                    if (lang_1.isBlank(modifiers)) {
                        this.modifiers = [];
                    }
                }
                Statement.prototype.hasModifier = function (modifier) { return this.modifiers.indexOf(modifier) !== -1; };
                return Statement;
            }());
            exports_1("Statement", Statement);
            DeclareVarStmt = (function (_super) {
                __extends(DeclareVarStmt, _super);
                function DeclareVarStmt(name, value, type, modifiers) {
                    if (type === void 0) { type = null; }
                    if (modifiers === void 0) { modifiers = null; }
                    _super.call(this, modifiers);
                    this.name = name;
                    this.value = value;
                    this.type = lang_1.isPresent(type) ? type : value.type;
                }
                DeclareVarStmt.prototype.visitStatement = function (visitor, context) {
                    return visitor.visitDeclareVarStmt(this, context);
                };
                return DeclareVarStmt;
            }(Statement));
            exports_1("DeclareVarStmt", DeclareVarStmt);
            DeclareFunctionStmt = (function (_super) {
                __extends(DeclareFunctionStmt, _super);
                function DeclareFunctionStmt(name, params, statements, type, modifiers) {
                    if (type === void 0) { type = null; }
                    if (modifiers === void 0) { modifiers = null; }
                    _super.call(this, modifiers);
                    this.name = name;
                    this.params = params;
                    this.statements = statements;
                    this.type = type;
                }
                DeclareFunctionStmt.prototype.visitStatement = function (visitor, context) {
                    return visitor.visitDeclareFunctionStmt(this, context);
                };
                return DeclareFunctionStmt;
            }(Statement));
            exports_1("DeclareFunctionStmt", DeclareFunctionStmt);
            ExpressionStatement = (function (_super) {
                __extends(ExpressionStatement, _super);
                function ExpressionStatement(expr) {
                    _super.call(this);
                    this.expr = expr;
                }
                ExpressionStatement.prototype.visitStatement = function (visitor, context) {
                    return visitor.visitExpressionStmt(this, context);
                };
                return ExpressionStatement;
            }(Statement));
            exports_1("ExpressionStatement", ExpressionStatement);
            ReturnStatement = (function (_super) {
                __extends(ReturnStatement, _super);
                function ReturnStatement(value) {
                    _super.call(this);
                    this.value = value;
                }
                ReturnStatement.prototype.visitStatement = function (visitor, context) {
                    return visitor.visitReturnStmt(this, context);
                };
                return ReturnStatement;
            }(Statement));
            exports_1("ReturnStatement", ReturnStatement);
            AbstractClassPart = (function () {
                function AbstractClassPart(type, modifiers) {
                    if (type === void 0) { type = null; }
                    this.type = type;
                    this.modifiers = modifiers;
                    if (lang_1.isBlank(modifiers)) {
                        this.modifiers = [];
                    }
                }
                AbstractClassPart.prototype.hasModifier = function (modifier) { return this.modifiers.indexOf(modifier) !== -1; };
                return AbstractClassPart;
            }());
            exports_1("AbstractClassPart", AbstractClassPart);
            ClassField = (function (_super) {
                __extends(ClassField, _super);
                function ClassField(name, type, modifiers) {
                    if (type === void 0) { type = null; }
                    if (modifiers === void 0) { modifiers = null; }
                    _super.call(this, type, modifiers);
                    this.name = name;
                }
                return ClassField;
            }(AbstractClassPart));
            exports_1("ClassField", ClassField);
            ClassMethod = (function (_super) {
                __extends(ClassMethod, _super);
                function ClassMethod(name, params, body, type, modifiers) {
                    if (type === void 0) { type = null; }
                    if (modifiers === void 0) { modifiers = null; }
                    _super.call(this, type, modifiers);
                    this.name = name;
                    this.params = params;
                    this.body = body;
                }
                return ClassMethod;
            }(AbstractClassPart));
            exports_1("ClassMethod", ClassMethod);
            ClassGetter = (function (_super) {
                __extends(ClassGetter, _super);
                function ClassGetter(name, body, type, modifiers) {
                    if (type === void 0) { type = null; }
                    if (modifiers === void 0) { modifiers = null; }
                    _super.call(this, type, modifiers);
                    this.name = name;
                    this.body = body;
                }
                return ClassGetter;
            }(AbstractClassPart));
            exports_1("ClassGetter", ClassGetter);
            ClassStmt = (function (_super) {
                __extends(ClassStmt, _super);
                function ClassStmt(name, parent, fields, getters, constructorMethod, methods, modifiers) {
                    if (modifiers === void 0) { modifiers = null; }
                    _super.call(this, modifiers);
                    this.name = name;
                    this.parent = parent;
                    this.fields = fields;
                    this.getters = getters;
                    this.constructorMethod = constructorMethod;
                    this.methods = methods;
                }
                ClassStmt.prototype.visitStatement = function (visitor, context) {
                    return visitor.visitDeclareClassStmt(this, context);
                };
                return ClassStmt;
            }(Statement));
            exports_1("ClassStmt", ClassStmt);
            IfStmt = (function (_super) {
                __extends(IfStmt, _super);
                function IfStmt(condition, trueCase, falseCase) {
                    if (falseCase === void 0) { falseCase = lang_1.CONST_EXPR([]); }
                    _super.call(this);
                    this.condition = condition;
                    this.trueCase = trueCase;
                    this.falseCase = falseCase;
                }
                IfStmt.prototype.visitStatement = function (visitor, context) {
                    return visitor.visitIfStmt(this, context);
                };
                return IfStmt;
            }(Statement));
            exports_1("IfStmt", IfStmt);
            CommentStmt = (function (_super) {
                __extends(CommentStmt, _super);
                function CommentStmt(comment) {
                    _super.call(this);
                    this.comment = comment;
                }
                CommentStmt.prototype.visitStatement = function (visitor, context) {
                    return visitor.visitCommentStmt(this, context);
                };
                return CommentStmt;
            }(Statement));
            exports_1("CommentStmt", CommentStmt);
            TryCatchStmt = (function (_super) {
                __extends(TryCatchStmt, _super);
                function TryCatchStmt(bodyStmts, catchStmts) {
                    _super.call(this);
                    this.bodyStmts = bodyStmts;
                    this.catchStmts = catchStmts;
                }
                TryCatchStmt.prototype.visitStatement = function (visitor, context) {
                    return visitor.visitTryCatchStmt(this, context);
                };
                return TryCatchStmt;
            }(Statement));
            exports_1("TryCatchStmt", TryCatchStmt);
            ThrowStmt = (function (_super) {
                __extends(ThrowStmt, _super);
                function ThrowStmt(error) {
                    _super.call(this);
                    this.error = error;
                }
                ThrowStmt.prototype.visitStatement = function (visitor, context) {
                    return visitor.visitThrowStmt(this, context);
                };
                return ThrowStmt;
            }(Statement));
            exports_1("ThrowStmt", ThrowStmt);
            ExpressionTransformer = (function () {
                function ExpressionTransformer() {
                }
                ExpressionTransformer.prototype.visitReadVarExpr = function (ast, context) { return ast; };
                ExpressionTransformer.prototype.visitWriteVarExpr = function (expr, context) {
                    return new WriteVarExpr(expr.name, expr.value.visitExpression(this, context));
                };
                ExpressionTransformer.prototype.visitWriteKeyExpr = function (expr, context) {
                    return new WriteKeyExpr(expr.receiver.visitExpression(this, context), expr.index.visitExpression(this, context), expr.value.visitExpression(this, context));
                };
                ExpressionTransformer.prototype.visitWritePropExpr = function (expr, context) {
                    return new WritePropExpr(expr.receiver.visitExpression(this, context), expr.name, expr.value.visitExpression(this, context));
                };
                ExpressionTransformer.prototype.visitInvokeMethodExpr = function (ast, context) {
                    var method = lang_1.isPresent(ast.builtin) ? ast.builtin : ast.name;
                    return new InvokeMethodExpr(ast.receiver.visitExpression(this, context), method, this.visitAllExpressions(ast.args, context), ast.type);
                };
                ExpressionTransformer.prototype.visitInvokeFunctionExpr = function (ast, context) {
                    return new InvokeFunctionExpr(ast.fn.visitExpression(this, context), this.visitAllExpressions(ast.args, context), ast.type);
                };
                ExpressionTransformer.prototype.visitInstantiateExpr = function (ast, context) {
                    return new InstantiateExpr(ast.classExpr.visitExpression(this, context), this.visitAllExpressions(ast.args, context), ast.type);
                };
                ExpressionTransformer.prototype.visitLiteralExpr = function (ast, context) { return ast; };
                ExpressionTransformer.prototype.visitExternalExpr = function (ast, context) { return ast; };
                ExpressionTransformer.prototype.visitConditionalExpr = function (ast, context) {
                    return new ConditionalExpr(ast.condition.visitExpression(this, context), ast.trueCase.visitExpression(this, context), ast.falseCase.visitExpression(this, context));
                };
                ExpressionTransformer.prototype.visitNotExpr = function (ast, context) {
                    return new NotExpr(ast.condition.visitExpression(this, context));
                };
                ExpressionTransformer.prototype.visitCastExpr = function (ast, context) {
                    return new CastExpr(ast.value.visitExpression(this, context), context);
                };
                ExpressionTransformer.prototype.visitFunctionExpr = function (ast, context) {
                    // Don't descend into nested functions
                    return ast;
                };
                ExpressionTransformer.prototype.visitBinaryOperatorExpr = function (ast, context) {
                    return new BinaryOperatorExpr(ast.operator, ast.lhs.visitExpression(this, context), ast.rhs.visitExpression(this, context), ast.type);
                };
                ExpressionTransformer.prototype.visitReadPropExpr = function (ast, context) {
                    return new ReadPropExpr(ast.receiver.visitExpression(this, context), ast.name, ast.type);
                };
                ExpressionTransformer.prototype.visitReadKeyExpr = function (ast, context) {
                    return new ReadKeyExpr(ast.receiver.visitExpression(this, context), ast.index.visitExpression(this, context), ast.type);
                };
                ExpressionTransformer.prototype.visitLiteralArrayExpr = function (ast, context) {
                    return new LiteralArrayExpr(this.visitAllExpressions(ast.entries, context));
                };
                ExpressionTransformer.prototype.visitLiteralMapExpr = function (ast, context) {
                    var _this = this;
                    return new LiteralMapExpr(ast.entries.map(function (entry) { return [entry[0], entry[1].visitExpression(_this, context)]; }));
                };
                ExpressionTransformer.prototype.visitAllExpressions = function (exprs, context) {
                    var _this = this;
                    return exprs.map(function (expr) { return expr.visitExpression(_this, context); });
                };
                ExpressionTransformer.prototype.visitDeclareVarStmt = function (stmt, context) {
                    return new DeclareVarStmt(stmt.name, stmt.value.visitExpression(this, context), stmt.type, stmt.modifiers);
                };
                ExpressionTransformer.prototype.visitDeclareFunctionStmt = function (stmt, context) {
                    // Don't descend into nested functions
                    return stmt;
                };
                ExpressionTransformer.prototype.visitExpressionStmt = function (stmt, context) {
                    return new ExpressionStatement(stmt.expr.visitExpression(this, context));
                };
                ExpressionTransformer.prototype.visitReturnStmt = function (stmt, context) {
                    return new ReturnStatement(stmt.value.visitExpression(this, context));
                };
                ExpressionTransformer.prototype.visitDeclareClassStmt = function (stmt, context) {
                    // Don't descend into nested functions
                    return stmt;
                };
                ExpressionTransformer.prototype.visitIfStmt = function (stmt, context) {
                    return new IfStmt(stmt.condition.visitExpression(this, context), this.visitAllStatements(stmt.trueCase, context), this.visitAllStatements(stmt.falseCase, context));
                };
                ExpressionTransformer.prototype.visitTryCatchStmt = function (stmt, context) {
                    return new TryCatchStmt(this.visitAllStatements(stmt.bodyStmts, context), this.visitAllStatements(stmt.catchStmts, context));
                };
                ExpressionTransformer.prototype.visitThrowStmt = function (stmt, context) {
                    return new ThrowStmt(stmt.error.visitExpression(this, context));
                };
                ExpressionTransformer.prototype.visitCommentStmt = function (stmt, context) { return stmt; };
                ExpressionTransformer.prototype.visitAllStatements = function (stmts, context) {
                    var _this = this;
                    return stmts.map(function (stmt) { return stmt.visitStatement(_this, context); });
                };
                return ExpressionTransformer;
            }());
            exports_1("ExpressionTransformer", ExpressionTransformer);
            RecursiveExpressionVisitor = (function () {
                function RecursiveExpressionVisitor() {
                }
                RecursiveExpressionVisitor.prototype.visitReadVarExpr = function (ast, context) { return ast; };
                RecursiveExpressionVisitor.prototype.visitWriteVarExpr = function (expr, context) {
                    expr.value.visitExpression(this, context);
                    return expr;
                };
                RecursiveExpressionVisitor.prototype.visitWriteKeyExpr = function (expr, context) {
                    expr.receiver.visitExpression(this, context);
                    expr.index.visitExpression(this, context);
                    expr.value.visitExpression(this, context);
                    return expr;
                };
                RecursiveExpressionVisitor.prototype.visitWritePropExpr = function (expr, context) {
                    expr.receiver.visitExpression(this, context);
                    expr.value.visitExpression(this, context);
                    return expr;
                };
                RecursiveExpressionVisitor.prototype.visitInvokeMethodExpr = function (ast, context) {
                    ast.receiver.visitExpression(this, context);
                    this.visitAllExpressions(ast.args, context);
                    return ast;
                };
                RecursiveExpressionVisitor.prototype.visitInvokeFunctionExpr = function (ast, context) {
                    ast.fn.visitExpression(this, context);
                    this.visitAllExpressions(ast.args, context);
                    return ast;
                };
                RecursiveExpressionVisitor.prototype.visitInstantiateExpr = function (ast, context) {
                    ast.classExpr.visitExpression(this, context);
                    this.visitAllExpressions(ast.args, context);
                    return ast;
                };
                RecursiveExpressionVisitor.prototype.visitLiteralExpr = function (ast, context) { return ast; };
                RecursiveExpressionVisitor.prototype.visitExternalExpr = function (ast, context) { return ast; };
                RecursiveExpressionVisitor.prototype.visitConditionalExpr = function (ast, context) {
                    ast.condition.visitExpression(this, context);
                    ast.trueCase.visitExpression(this, context);
                    ast.falseCase.visitExpression(this, context);
                    return ast;
                };
                RecursiveExpressionVisitor.prototype.visitNotExpr = function (ast, context) {
                    ast.condition.visitExpression(this, context);
                    return ast;
                };
                RecursiveExpressionVisitor.prototype.visitCastExpr = function (ast, context) {
                    ast.value.visitExpression(this, context);
                    return ast;
                };
                RecursiveExpressionVisitor.prototype.visitFunctionExpr = function (ast, context) { return ast; };
                RecursiveExpressionVisitor.prototype.visitBinaryOperatorExpr = function (ast, context) {
                    ast.lhs.visitExpression(this, context);
                    ast.rhs.visitExpression(this, context);
                    return ast;
                };
                RecursiveExpressionVisitor.prototype.visitReadPropExpr = function (ast, context) {
                    ast.receiver.visitExpression(this, context);
                    return ast;
                };
                RecursiveExpressionVisitor.prototype.visitReadKeyExpr = function (ast, context) {
                    ast.receiver.visitExpression(this, context);
                    ast.index.visitExpression(this, context);
                    return ast;
                };
                RecursiveExpressionVisitor.prototype.visitLiteralArrayExpr = function (ast, context) {
                    this.visitAllExpressions(ast.entries, context);
                    return ast;
                };
                RecursiveExpressionVisitor.prototype.visitLiteralMapExpr = function (ast, context) {
                    var _this = this;
                    ast.entries.forEach(function (entry) { return entry[1].visitExpression(_this, context); });
                    return ast;
                };
                RecursiveExpressionVisitor.prototype.visitAllExpressions = function (exprs, context) {
                    var _this = this;
                    exprs.forEach(function (expr) { return expr.visitExpression(_this, context); });
                };
                RecursiveExpressionVisitor.prototype.visitDeclareVarStmt = function (stmt, context) {
                    stmt.value.visitExpression(this, context);
                    return stmt;
                };
                RecursiveExpressionVisitor.prototype.visitDeclareFunctionStmt = function (stmt, context) {
                    // Don't descend into nested functions
                    return stmt;
                };
                RecursiveExpressionVisitor.prototype.visitExpressionStmt = function (stmt, context) {
                    stmt.expr.visitExpression(this, context);
                    return stmt;
                };
                RecursiveExpressionVisitor.prototype.visitReturnStmt = function (stmt, context) {
                    stmt.value.visitExpression(this, context);
                    return stmt;
                };
                RecursiveExpressionVisitor.prototype.visitDeclareClassStmt = function (stmt, context) {
                    // Don't descend into nested functions
                    return stmt;
                };
                RecursiveExpressionVisitor.prototype.visitIfStmt = function (stmt, context) {
                    stmt.condition.visitExpression(this, context);
                    this.visitAllStatements(stmt.trueCase, context);
                    this.visitAllStatements(stmt.falseCase, context);
                    return stmt;
                };
                RecursiveExpressionVisitor.prototype.visitTryCatchStmt = function (stmt, context) {
                    this.visitAllStatements(stmt.bodyStmts, context);
                    this.visitAllStatements(stmt.catchStmts, context);
                    return stmt;
                };
                RecursiveExpressionVisitor.prototype.visitThrowStmt = function (stmt, context) {
                    stmt.error.visitExpression(this, context);
                    return stmt;
                };
                RecursiveExpressionVisitor.prototype.visitCommentStmt = function (stmt, context) { return stmt; };
                RecursiveExpressionVisitor.prototype.visitAllStatements = function (stmts, context) {
                    var _this = this;
                    stmts.forEach(function (stmt) { return stmt.visitStatement(_this, context); });
                };
                return RecursiveExpressionVisitor;
            }());
            exports_1("RecursiveExpressionVisitor", RecursiveExpressionVisitor);
            _ReplaceVariableTransformer = (function (_super) {
                __extends(_ReplaceVariableTransformer, _super);
                function _ReplaceVariableTransformer(_varName, _newValue) {
                    _super.call(this);
                    this._varName = _varName;
                    this._newValue = _newValue;
                }
                _ReplaceVariableTransformer.prototype.visitReadVarExpr = function (ast, context) {
                    return ast.name == this._varName ? this._newValue : ast;
                };
                return _ReplaceVariableTransformer;
            }(ExpressionTransformer));
            _VariableFinder = (function (_super) {
                __extends(_VariableFinder, _super);
                function _VariableFinder() {
                    _super.apply(this, arguments);
                    this.varNames = new Set();
                }
                _VariableFinder.prototype.visitReadVarExpr = function (ast, context) {
                    this.varNames.add(ast.name);
                    return null;
                };
                return _VariableFinder;
            }(RecursiveExpressionVisitor));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9vdXRwdXQvb3V0cHV0X2FzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7NEZBMkRXLFlBQVksRUFDWixTQUFTLEVBQ1QsUUFBUSxFQUNSLFdBQVcsRUFDWCxXQUFXLEVBQ1gsYUFBYSwrVUFvWGIsU0FBUyxFQUNULFVBQVUsRUFDVixlQUFlLEVBQ2YsZUFBZSxFQUNmLFNBQVM7SUFrWHBCLGdDQUF1QyxPQUFlLEVBQUUsUUFBb0IsRUFDckMsVUFBc0I7UUFDM0QsSUFBSSxXQUFXLEdBQUcsSUFBSSwyQkFBMkIsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDckUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFKRCwyREFJQyxDQUFBO0lBU0QsMEJBQWlDLEtBQWtCO1FBQ2pELElBQUksTUFBTSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7UUFDbkMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2QyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBSkQsK0NBSUMsQ0FBQTtJQVVELGtCQUF5QixJQUFZLEVBQUUsSUFBaUI7UUFBakIsb0JBQWlCLEdBQWpCLFdBQWlCO1FBQ3RELE1BQU0sQ0FBQyxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUZELCtCQUVDLENBQUE7SUFFRCxvQkFBMkIsRUFBNkIsRUFBRSxVQUF5QjtRQUF6QiwwQkFBeUIsR0FBekIsaUJBQXlCO1FBQ2pGLE1BQU0sQ0FBQyxJQUFJLFlBQVksQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFGRCxtQ0FFQyxDQUFBO0lBRUQsb0JBQTJCLEVB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QUFuRCxpQkFFQztvQkFEQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFJLEVBQUUsT0FBTyxDQUFDLEVBQWxDLENBQWtDLENBQUMsQ0FBQztnQkFDNUQsQ0FBQztnQkFDSCxpQ0FBQztZQUFELENBbEhBLEFBa0hDLElBQUE7WUFsSEQsbUVBa0hDLENBQUE7WUFRRDtnQkFBMEMsK0NBQXFCO2dCQUM3RCxxQ0FBb0IsUUFBZ0IsRUFBVSxTQUFxQjtvQkFBSSxpQkFBTyxDQUFDO29CQUEzRCxhQUFRLEdBQVIsUUFBUSxDQUFRO29CQUFVLGNBQVMsR0FBVCxTQUFTLENBQVk7Z0JBQWEsQ0FBQztnQkFDakYsc0RBQWdCLEdBQWhCLFVBQWlCLEdBQWdCLEVBQUUsT0FBWTtvQkFDN0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztnQkFDMUQsQ0FBQztnQkFDSCxrQ0FBQztZQUFELENBTEEsQUFLQyxDQUx5QyxxQkFBcUIsR0FLOUQ7WUFRRDtnQkFBOEIsbUNBQTBCO2dCQUF4RDtvQkFBOEIsOEJBQTBCO29CQUN0RCxhQUFRLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztnQkFLL0IsQ0FBQztnQkFKQywwQ0FBZ0IsR0FBaEIsVUFBaUIsR0FBZ0IsRUFBRSxPQUFZO29CQUM3QyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQztnQkFDSCxzQkFBQztZQUFELENBTkEsQUFNQyxDQU42QiwwQkFBMEIsR0FNdkQiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL291dHB1dC9vdXRwdXRfYXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDT05TVF9FWFBSLCBpc1N0cmluZywgaXNQcmVzZW50LCBpc0JsYW5rfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtDb21waWxlSWRlbnRpZmllck1ldGFkYXRhfSBmcm9tICcuLi9jb21waWxlX21ldGFkYXRhJztcblxuLy8vLyBUeXBlc1xuZXhwb3J0IGVudW0gVHlwZU1vZGlmaWVyIHtcbiAgQ29uc3Rcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFR5cGUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbW9kaWZpZXJzOiBUeXBlTW9kaWZpZXJbXSA9IG51bGwpIHtcbiAgICBpZiAoaXNCbGFuayhtb2RpZmllcnMpKSB7XG4gICAgICB0aGlzLm1vZGlmaWVycyA9IFtdO1xuICAgIH1cbiAgfVxuICBhYnN0cmFjdCB2aXNpdFR5cGUodmlzaXRvcjogVHlwZVZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueTtcblxuICBoYXNNb2RpZmllcihtb2RpZmllcjogVHlwZU1vZGlmaWVyKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLm1vZGlmaWVycy5pbmRleE9mKG1vZGlmaWVyKSAhPT0gLTE7IH1cbn1cblxuZXhwb3J0IGVudW0gQnVpbHRpblR5cGVOYW1lIHtcbiAgRHluYW1pYyxcbiAgQm9vbCxcbiAgU3RyaW5nLFxuICBJbnQsXG4gIE51bWJlcixcbiAgRnVuY3Rpb25cbn1cblxuZXhwb3J0IGNsYXNzIEJ1aWx0aW5UeXBlIGV4dGVuZHMgVHlwZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBCdWlsdGluVHlwZU5hbWUsIG1vZGlmaWVyczogVHlwZU1vZGlmaWVyW10gPSBudWxsKSB7IHN1cGVyKG1vZGlmaWVycyk7IH1cbiAgdmlzaXRUeXBlKHZpc2l0b3I6IFR5cGVWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0QnVpbHRpbnRUeXBlKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFeHRlcm5hbFR5cGUgZXh0ZW5kcyBUeXBlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhLCBwdWJsaWMgdHlwZVBhcmFtczogVHlwZVtdID0gbnVsbCxcbiAgICAgICAgICAgICAgbW9kaWZpZXJzOiBUeXBlTW9kaWZpZXJbXSA9IG51bGwpIHtcbiAgICBzdXBlcihtb2RpZmllcnMpO1xuICB9XG4gIHZpc2l0VHlwZSh2aXNpdG9yOiBUeXBlVmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdEV4dGVybmFsVHlwZSh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBBcnJheVR5cGUgZXh0ZW5kcyBUeXBlIHtcbiAgY29uc3RydWN0b3IocHVibGljIG9mOiBUeXBlLCBtb2RpZmllcnM6IFR5cGVNb2RpZmllcltdID0gbnVsbCkgeyBzdXBlcihtb2RpZmllcnMpOyB9XG4gIHZpc2l0VHlwZSh2aXNpdG9yOiBUeXBlVmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdEFycmF5VHlwZSh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBNYXBUeXBlIGV4dGVuZHMgVHlwZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZVR5cGU6IFR5cGUsIG1vZGlmaWVyczogVHlwZU1vZGlmaWVyW10gPSBudWxsKSB7IHN1cGVyKG1vZGlmaWVycyk7IH1cbiAgdmlzaXRUeXBlKHZpc2l0b3I6IFR5cGVWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gdmlzaXRvci52aXNpdE1hcFR5cGUodGhpcywgY29udGV4dCk7IH1cbn1cblxuZXhwb3J0IHZhciBEWU5BTUlDX1RZUEUgPSBuZXcgQnVpbHRpblR5cGUoQnVpbHRpblR5cGVOYW1lLkR5bmFtaWMpO1xuZXhwb3J0IHZhciBCT09MX1RZUEUgPSBuZXcgQnVpbHRpblR5cGUoQnVpbHRpblR5cGVOYW1lLkJvb2wpO1xuZXhwb3J0IHZhciBJTlRfVFlQRSA9IG5ldyBCdWlsdGluVHlwZShCdWlsdGluVHlwZU5hbWUuSW50KTtcbmV4cG9ydCB2YXIgTlVNQkVSX1RZUEUgPSBuZXcgQnVpbHRpblR5cGUoQnVpbHRpblR5cGVOYW1lLk51bWJlcik7XG5leHBvcnQgdmFyIFNUUklOR19UWVBFID0gbmV3IEJ1aWx0aW5UeXBlKEJ1aWx0aW5UeXBlTmFtZS5TdHJpbmcpO1xuZXhwb3J0IHZhciBGVU5DVElPTl9UWVBFID0gbmV3IEJ1aWx0aW5UeXBlKEJ1aWx0aW5UeXBlTmFtZS5GdW5jdGlvbik7XG5cblxuZXhwb3J0IGludGVyZmFjZSBUeXBlVmlzaXRvciB7XG4gIHZpc2l0QnVpbHRpbnRUeXBlKHR5cGU6IEJ1aWx0aW5UeXBlLCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0RXh0ZXJuYWxUeXBlKHR5cGU6IEV4dGVybmFsVHlwZSwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEFycmF5VHlwZSh0eXBlOiBBcnJheVR5cGUsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRNYXBUeXBlKHR5cGU6IE1hcFR5cGUsIGNvbnRleHQ6IGFueSk6IGFueTtcbn1cblxuLy8vLy8gRXhwcmVzc2lvbnNcblxuZXhwb3J0IGVudW0gQmluYXJ5T3BlcmF0b3Ige1xuICBFcXVhbHMsXG4gIE5vdEVxdWFscyxcbiAgSWRlbnRpY2FsLFxuICBOb3RJZGVudGljYWwsXG4gIE1pbnVzLFxuICBQbHVzLFxuICBEaXZpZGUsXG4gIE11bHRpcGx5LFxuICBNb2R1bG8sXG4gIEFuZCxcbiAgT3IsXG4gIExvd2VyLFxuICBMb3dlckVxdWFscyxcbiAgQmlnZ2VyLFxuICBCaWdnZXJFcXVhbHNcbn1cblxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRXhwcmVzc2lvbiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0eXBlOiBUeXBlKSB7fVxuXG4gIGFic3RyYWN0IHZpc2l0RXhwcmVzc2lvbih2aXNpdG9yOiBFeHByZXNzaW9uVmlzaXRvciwgY29udGV4dDogYW55KTogYW55O1xuXG4gIHByb3AobmFtZTogc3RyaW5nKTogUmVhZFByb3BFeHByIHsgcmV0dXJuIG5ldyBSZWFkUHJvcEV4cHIodGhpcywgbmFtZSk7IH1cblxuICBrZXkoaW5kZXg6IEV4cHJlc3Npb24sIHR5cGU6IFR5cGUgPSBudWxsKTogUmVhZEtleUV4cHIge1xuICAgIHJldHVybiBuZXcgUmVhZEtleUV4cHIodGhpcywgaW5kZXgsIHR5cGUpO1xuICB9XG5cbiAgY2FsbE1ldGhvZChuYW1lOiBzdHJpbmcgfCBCdWlsdGluTWV0aG9kLCBwYXJhbXM6IEV4cHJlc3Npb25bXSk6IEludm9rZU1ldGhvZEV4cHIge1xuICAgIHJldHVybiBuZXcgSW52b2tlTWV0aG9kRXhwcih0aGlzLCBuYW1lLCBwYXJhbXMpO1xuICB9XG5cbiAgY2FsbEZuKHBhcmFtczogRXhwcmVzc2lvbltdKTogSW52b2tlRnVuY3Rpb25FeHByIHsgcmV0dXJuIG5ldyBJbnZva2VGdW5jdGlvbkV4cHIodGhpcywgcGFyYW1zKTsgfVxuXG4gIGluc3RhbnRpYXRlKHBhcmFtczogRXhwcmVzc2lvbltdLCB0eXBlOiBUeXBlID0gbnVsbCk6IEluc3RhbnRpYXRlRXhwciB7XG4gICAgcmV0dXJuIG5ldyBJbnN0YW50aWF0ZUV4cHIodGhpcywgcGFyYW1zLCB0eXBlKTtcbiAgfVxuXG4gIGNvbmRpdGlvbmFsKHRydWVDYXNlOiBFeHByZXNzaW9uLCBmYWxzZUNhc2U6IEV4cHJlc3Npb24gPSBudWxsKTogQ29uZGl0aW9uYWxFeHByIHtcbiAgICByZXR1cm4gbmV3IENvbmRpdGlvbmFsRXhwcih0aGlzLCB0cnVlQ2FzZSwgZmFsc2VDYXNlKTtcbiAgfVxuXG4gIGVxdWFscyhyaHM6IEV4cHJlc3Npb24pOiBCaW5hcnlPcGVyYXRvckV4cHIge1xuICAgIHJldHVybiBuZXcgQmluYXJ5T3BlcmF0b3JFeHByKEJpbmFyeU9wZXJhdG9yLkVxdWFscywgdGhpcywgcmhzKTtcbiAgfVxuICBub3RFcXVhbHMocmhzOiBFeHByZXNzaW9uKTogQmluYXJ5T3BlcmF0b3JFeHByIHtcbiAgICByZXR1cm4gbmV3IEJpbmFyeU9wZXJhdG9yRXhwcihCaW5hcnlPcGVyYXRvci5Ob3RFcXVhbHMsIHRoaXMsIHJocyk7XG4gIH1cbiAgaWRlbnRpY2FsKHJoczogRXhwcmVzc2lvbik6IEJpbmFyeU9wZXJhdG9yRXhwciB7XG4gICAgcmV0dXJuIG5ldyBCaW5hcnlPcGVyYXRvckV4cHIoQmluYXJ5T3BlcmF0b3IuSWRlbnRpY2FsLCB0aGlzLCByaHMpO1xuICB9XG4gIG5vdElkZW50aWNhbChyaHM6IEV4cHJlc3Npb24pOiBCaW5hcnlPcGVyYXRvckV4cHIge1xuICAgIHJldHVybiBuZXcgQmluYXJ5T3BlcmF0b3JFeHByKEJpbmFyeU9wZXJhdG9yLk5vdElkZW50aWNhbCwgdGhpcywgcmhzKTtcbiAgfVxuICBtaW51cyhyaHM6IEV4cHJlc3Npb24pOiBCaW5hcnlPcGVyYXRvckV4cHIge1xuICAgIHJldHVybiBuZXcgQmluYXJ5T3BlcmF0b3JFeHByKEJpbmFyeU9wZXJhdG9yLk1pbnVzLCB0aGlzLCByaHMpO1xuICB9XG4gIHBsdXMocmhzOiBFeHByZXNzaW9uKTogQmluYXJ5T3BlcmF0b3JFeHByIHtcbiAgICByZXR1cm4gbmV3IEJpbmFyeU9wZXJhdG9yRXhwcihCaW5hcnlPcGVyYXRvci5QbHVzLCB0aGlzLCByaHMpO1xuICB9XG4gIGRpdmlkZShyaHM6IEV4cHJlc3Npb24pOiBCaW5hcnlPcGVyYXRvckV4cHIge1xuICAgIHJldHVybiBuZXcgQmluYXJ5T3BlcmF0b3JFeHByKEJpbmFyeU9wZXJhdG9yLkRpdmlkZSwgdGhpcywgcmhzKTtcbiAgfVxuICBtdWx0aXBseShyaHM6IEV4cHJlc3Npb24pOiBCaW5hcnlPcGVyYXRvckV4cHIge1xuICAgIHJldHVybiBuZXcgQmluYXJ5T3BlcmF0b3JFeHByKEJpbmFyeU9wZXJhdG9yLk11bHRpcGx5LCB0aGlzLCByaHMpO1xuICB9XG4gIG1vZHVsbyhyaHM6IEV4cHJlc3Npb24pOiBCaW5hcnlPcGVyYXRvckV4cHIge1xuICAgIHJldHVybiBuZXcgQmluYXJ5T3BlcmF0b3JFeHByKEJpbmFyeU9wZXJhdG9yLk1vZHVsbywgdGhpcywgcmhzKTtcbiAgfVxuICBhbmQocmhzOiBFeHByZXNzaW9uKTogQmluYXJ5T3BlcmF0b3JFeHByIHtcbiAgICByZXR1cm4gbmV3IEJpbmFyeU9wZXJhdG9yRXhwcihCaW5hcnlPcGVyYXRvci5BbmQsIHRoaXMsIHJocyk7XG4gIH1cbiAgb3IocmhzOiBFeHByZXNzaW9uKTogQmluYXJ5T3BlcmF0b3JFeHByIHtcbiAgICByZXR1cm4gbmV3IEJpbmFyeU9wZXJhdG9yRXhwcihCaW5hcnlPcGVyYXRvci5PciwgdGhpcywgcmhzKTtcbiAgfVxuICBsb3dlcihyaHM6IEV4cHJlc3Npb24pOiBCaW5hcnlPcGVyYXRvckV4cHIge1xuICAgIHJldHVybiBuZXcgQmluYXJ5T3BlcmF0b3JFeHByKEJpbmFyeU9wZXJhdG9yLkxvd2VyLCB0aGlzLCByaHMpO1xuICB9XG4gIGxvd2VyRXF1YWxzKHJoczogRXhwcmVzc2lvbik6IEJpbmFyeU9wZXJhdG9yRXhwciB7XG4gICAgcmV0dXJuIG5ldyBCaW5hcnlPcGVyYXRvckV4cHIoQmluYXJ5T3BlcmF0b3IuTG93ZXJFcXVhbHMsIHRoaXMsIHJocyk7XG4gIH1cbiAgYmlnZ2VyKHJoczogRXhwcmVzc2lvbik6IEJpbmFyeU9wZXJhdG9yRXhwciB7XG4gICAgcmV0dXJuIG5ldyBCaW5hcnlPcGVyYXRvckV4cHIoQmluYXJ5T3BlcmF0b3IuQmlnZ2VyLCB0aGlzLCByaHMpO1xuICB9XG4gIGJpZ2dlckVxdWFscyhyaHM6IEV4cHJlc3Npb24pOiBCaW5hcnlPcGVyYXRvckV4cHIge1xuICAgIHJldHVybiBuZXcgQmluYXJ5T3BlcmF0b3JFeHByKEJpbmFyeU9wZXJhdG9yLkJpZ2dlckVxdWFscywgdGhpcywgcmhzKTtcbiAgfVxuICBpc0JsYW5rKCk6IEV4cHJlc3Npb24ge1xuICAgIC8vIE5vdGU6IFdlIHVzZSBlcXVhbHMgYnkgcHVycG9zZSBoZXJlIHRvIGNvbXBhcmUgdG8gbnVsbCBhbmQgdW5kZWZpbmVkIGluIEpTLlxuICAgIHJldHVybiB0aGlzLmVxdWFscyhOVUxMX0VYUFIpO1xuICB9XG4gIGNhc3QodHlwZTogVHlwZSk6IEV4cHJlc3Npb24geyByZXR1cm4gbmV3IENhc3RFeHByKHRoaXMsIHR5cGUpOyB9XG4gIHRvU3RtdCgpOiBTdGF0ZW1lbnQgeyByZXR1cm4gbmV3IEV4cHJlc3Npb25TdGF0ZW1lbnQodGhpcyk7IH1cbn1cblxuZXhwb3J0IGVudW0gQnVpbHRpblZhciB7XG4gIFRoaXMsXG4gIFN1cGVyLFxuICBDYXRjaEVycm9yLFxuICBDYXRjaFN0YWNrXG59XG5cbmV4cG9ydCBjbGFzcyBSZWFkVmFyRXhwciBleHRlbmRzIEV4cHJlc3Npb24ge1xuICBwdWJsaWMgbmFtZTtcbiAgcHVibGljIGJ1aWx0aW46IEJ1aWx0aW5WYXI7XG5cbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nIHwgQnVpbHRpblZhciwgdHlwZTogVHlwZSA9IG51bGwpIHtcbiAgICBzdXBlcih0eXBlKTtcbiAgICBpZiAoaXNTdHJpbmcobmFtZSkpIHtcbiAgICAgIHRoaXMubmFtZSA9IDxzdHJpbmc+bmFtZTtcbiAgICAgIHRoaXMuYnVpbHRpbiA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubmFtZSA9IG51bGw7XG4gICAgICB0aGlzLmJ1aWx0aW4gPSA8QnVpbHRpblZhcj5uYW1lO1xuICAgIH1cbiAgfVxuICB2aXNpdEV4cHJlc3Npb24odmlzaXRvcjogRXhwcmVzc2lvblZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRSZWFkVmFyRXhwcih0aGlzLCBjb250ZXh0KTtcbiAgfVxuXG4gIHNldCh2YWx1ZTogRXhwcmVzc2lvbik6IFdyaXRlVmFyRXhwciB7IHJldHVybiBuZXcgV3JpdGVWYXJFeHByKHRoaXMubmFtZSwgdmFsdWUpOyB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFdyaXRlVmFyRXhwciBleHRlbmRzIEV4cHJlc3Npb24ge1xuICBwdWJsaWMgdmFsdWU6IEV4cHJlc3Npb247XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcsIHZhbHVlOiBFeHByZXNzaW9uLCB0eXBlOiBUeXBlID0gbnVsbCkge1xuICAgIHN1cGVyKGlzUHJlc2VudCh0eXBlKSA/IHR5cGUgOiB2YWx1ZS50eXBlKTtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICB2aXNpdEV4cHJlc3Npb24odmlzaXRvcjogRXhwcmVzc2lvblZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRXcml0ZVZhckV4cHIodGhpcywgY29udGV4dCk7XG4gIH1cblxuICB0b0RlY2xTdG10KHR5cGU6IFR5cGUgPSBudWxsLCBtb2RpZmllcnM6IFN0bXRNb2RpZmllcltdID0gbnVsbCk6IERlY2xhcmVWYXJTdG10IHtcbiAgICByZXR1cm4gbmV3IERlY2xhcmVWYXJTdG10KHRoaXMubmFtZSwgdGhpcy52YWx1ZSwgdHlwZSwgbW9kaWZpZXJzKTtcbiAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBXcml0ZUtleUV4cHIgZXh0ZW5kcyBFeHByZXNzaW9uIHtcbiAgcHVibGljIHZhbHVlOiBFeHByZXNzaW9uO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVjZWl2ZXI6IEV4cHJlc3Npb24sIHB1YmxpYyBpbmRleDogRXhwcmVzc2lvbiwgdmFsdWU6IEV4cHJlc3Npb24sXG4gICAgICAgICAgICAgIHR5cGU6IFR5cGUgPSBudWxsKSB7XG4gICAgc3VwZXIoaXNQcmVzZW50KHR5cGUpID8gdHlwZSA6IHZhbHVlLnR5cGUpO1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuICB2aXNpdEV4cHJlc3Npb24odmlzaXRvcjogRXhwcmVzc2lvblZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRXcml0ZUtleUV4cHIodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgV3JpdGVQcm9wRXhwciBleHRlbmRzIEV4cHJlc3Npb24ge1xuICBwdWJsaWMgdmFsdWU6IEV4cHJlc3Npb247XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWNlaXZlcjogRXhwcmVzc2lvbiwgcHVibGljIG5hbWU6IHN0cmluZywgdmFsdWU6IEV4cHJlc3Npb24sXG4gICAgICAgICAgICAgIHR5cGU6IFR5cGUgPSBudWxsKSB7XG4gICAgc3VwZXIoaXNQcmVzZW50KHR5cGUpID8gdHlwZSA6IHZhbHVlLnR5cGUpO1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuICB2aXNpdEV4cHJlc3Npb24odmlzaXRvcjogRXhwcmVzc2lvblZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRXcml0ZVByb3BFeHByKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBlbnVtIEJ1aWx0aW5NZXRob2Qge1xuICBDb25jYXRBcnJheSxcbiAgU3Vic2NyaWJlT2JzZXJ2YWJsZSxcbiAgYmluZFxufVxuXG5leHBvcnQgY2xhc3MgSW52b2tlTWV0aG9kRXhwciBleHRlbmRzIEV4cHJlc3Npb24ge1xuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICBwdWJsaWMgYnVpbHRpbjogQnVpbHRpbk1ldGhvZDtcbiAgY29uc3RydWN0b3IocHVibGljIHJlY2VpdmVyOiBFeHByZXNzaW9uLCBtZXRob2Q6IHN0cmluZyB8IEJ1aWx0aW5NZXRob2QsXG4gICAgICAgICAgICAgIHB1YmxpYyBhcmdzOiBFeHByZXNzaW9uW10sIHR5cGU6IFR5cGUgPSBudWxsKSB7XG4gICAgc3VwZXIodHlwZSk7XG4gICAgaWYgKGlzU3RyaW5nKG1ldGhvZCkpIHtcbiAgICAgIHRoaXMubmFtZSA9IDxzdHJpbmc+bWV0aG9kO1xuICAgICAgdGhpcy5idWlsdGluID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5uYW1lID0gbnVsbDtcbiAgICAgIHRoaXMuYnVpbHRpbiA9IDxCdWlsdGluTWV0aG9kPm1ldGhvZDtcbiAgICB9XG4gIH1cbiAgdmlzaXRFeHByZXNzaW9uKHZpc2l0b3I6IEV4cHJlc3Npb25WaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0SW52b2tlTWV0aG9kRXhwcih0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBJbnZva2VGdW5jdGlvbkV4cHIgZXh0ZW5kcyBFeHByZXNzaW9uIHtcbiAgY29uc3RydWN0b3IocHVibGljIGZuOiBFeHByZXNzaW9uLCBwdWJsaWMgYXJnczogRXhwcmVzc2lvbltdLCB0eXBlOiBUeXBlID0gbnVsbCkgeyBzdXBlcih0eXBlKTsgfVxuICB2aXNpdEV4cHJlc3Npb24odmlzaXRvcjogRXhwcmVzc2lvblZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRJbnZva2VGdW5jdGlvbkV4cHIodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgSW5zdGFudGlhdGVFeHByIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjbGFzc0V4cHI6IEV4cHJlc3Npb24sIHB1YmxpYyBhcmdzOiBFeHByZXNzaW9uW10sIHR5cGU/OiBUeXBlKSB7IHN1cGVyKHR5cGUpOyB9XG4gIHZpc2l0RXhwcmVzc2lvbih2aXNpdG9yOiBFeHByZXNzaW9uVmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdEluc3RhbnRpYXRlRXhwcih0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBMaXRlcmFsRXhwciBleHRlbmRzIEV4cHJlc3Npb24ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IGFueSwgdHlwZTogVHlwZSA9IG51bGwpIHsgc3VwZXIodHlwZSk7IH1cbiAgdmlzaXRFeHByZXNzaW9uKHZpc2l0b3I6IEV4cHJlc3Npb25WaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0TGl0ZXJhbEV4cHIodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgRXh0ZXJuYWxFeHByIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSwgdHlwZTogVHlwZSA9IG51bGwsXG4gICAgICAgICAgICAgIHB1YmxpYyB0eXBlUGFyYW1zOiBUeXBlW10gPSBudWxsKSB7XG4gICAgc3VwZXIodHlwZSk7XG4gIH1cbiAgdmlzaXRFeHByZXNzaW9uKHZpc2l0b3I6IEV4cHJlc3Npb25WaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0RXh0ZXJuYWxFeHByKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIENvbmRpdGlvbmFsRXhwciBleHRlbmRzIEV4cHJlc3Npb24ge1xuICBwdWJsaWMgdHJ1ZUNhc2U6IEV4cHJlc3Npb247XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb25kaXRpb246IEV4cHJlc3Npb24sIHRydWVDYXNlOiBFeHByZXNzaW9uLFxuICAgICAgICAgICAgICBwdWJsaWMgZmFsc2VDYXNlOiBFeHByZXNzaW9uID0gbnVsbCwgdHlwZTogVHlwZSA9IG51bGwpIHtcbiAgICBzdXBlcihpc1ByZXNlbnQodHlwZSkgPyB0eXBlIDogdHJ1ZUNhc2UudHlwZSk7XG4gICAgdGhpcy50cnVlQ2FzZSA9IHRydWVDYXNlO1xuICB9XG4gIHZpc2l0RXhwcmVzc2lvbih2aXNpdG9yOiBFeHByZXNzaW9uVmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdENvbmRpdGlvbmFsRXhwcih0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBOb3RFeHByIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb25kaXRpb246IEV4cHJlc3Npb24pIHsgc3VwZXIoQk9PTF9UWVBFKTsgfVxuICB2aXNpdEV4cHJlc3Npb24odmlzaXRvcjogRXhwcmVzc2lvblZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXROb3RFeHByKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDYXN0RXhwciBleHRlbmRzIEV4cHJlc3Npb24ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IEV4cHJlc3Npb24sIHR5cGU6IFR5cGUpIHsgc3VwZXIodHlwZSk7IH1cbiAgdmlzaXRFeHByZXNzaW9uKHZpc2l0b3I6IEV4cHJlc3Npb25WaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0Q2FzdEV4cHIodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgRm5QYXJhbSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyB0eXBlOiBUeXBlID0gbnVsbCkge31cbn1cblxuXG5leHBvcnQgY2xhc3MgRnVuY3Rpb25FeHByIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwYXJhbXM6IEZuUGFyYW1bXSwgcHVibGljIHN0YXRlbWVudHM6IFN0YXRlbWVudFtdLCB0eXBlOiBUeXBlID0gbnVsbCkge1xuICAgIHN1cGVyKHR5cGUpO1xuICB9XG4gIHZpc2l0RXhwcmVzc2lvbih2aXNpdG9yOiBFeHByZXNzaW9uVmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdEZ1bmN0aW9uRXhwcih0aGlzLCBjb250ZXh0KTtcbiAgfVxuXG4gIHRvRGVjbFN0bXQobmFtZTogc3RyaW5nLCBtb2RpZmllcnM6IFN0bXRNb2RpZmllcltdID0gbnVsbCk6IERlY2xhcmVGdW5jdGlvblN0bXQge1xuICAgIHJldHVybiBuZXcgRGVjbGFyZUZ1bmN0aW9uU3RtdChuYW1lLCB0aGlzLnBhcmFtcywgdGhpcy5zdGF0ZW1lbnRzLCB0aGlzLnR5cGUsIG1vZGlmaWVycyk7XG4gIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgQmluYXJ5T3BlcmF0b3JFeHByIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG4gIHB1YmxpYyBsaHM6IEV4cHJlc3Npb247XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcGVyYXRvcjogQmluYXJ5T3BlcmF0b3IsIGxoczogRXhwcmVzc2lvbiwgcHVibGljIHJoczogRXhwcmVzc2lvbixcbiAgICAgICAgICAgICAgdHlwZTogVHlwZSA9IG51bGwpIHtcbiAgICBzdXBlcihpc1ByZXNlbnQodHlwZSkgPyB0eXBlIDogbGhzLnR5cGUpO1xuICAgIHRoaXMubGhzID0gbGhzO1xuICB9XG4gIHZpc2l0RXhwcmVzc2lvbih2aXNpdG9yOiBFeHByZXNzaW9uVmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdEJpbmFyeU9wZXJhdG9yRXhwcih0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBSZWFkUHJvcEV4cHIgZXh0ZW5kcyBFeHByZXNzaW9uIHtcbiAgY29uc3RydWN0b3IocHVibGljIHJlY2VpdmVyOiBFeHByZXNzaW9uLCBwdWJsaWMgbmFtZTogc3RyaW5nLCB0eXBlOiBUeXBlID0gbnVsbCkgeyBzdXBlcih0eXBlKTsgfVxuICB2aXNpdEV4cHJlc3Npb24odmlzaXRvcjogRXhwcmVzc2lvblZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRSZWFkUHJvcEV4cHIodGhpcywgY29udGV4dCk7XG4gIH1cbiAgc2V0KHZhbHVlOiBFeHByZXNzaW9uKTogV3JpdGVQcm9wRXhwciB7XG4gICAgcmV0dXJuIG5ldyBXcml0ZVByb3BFeHByKHRoaXMucmVjZWl2ZXIsIHRoaXMubmFtZSwgdmFsdWUpO1xuICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFJlYWRLZXlFeHByIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWNlaXZlcjogRXhwcmVzc2lvbiwgcHVibGljIGluZGV4OiBFeHByZXNzaW9uLCB0eXBlOiBUeXBlID0gbnVsbCkge1xuICAgIHN1cGVyKHR5cGUpO1xuICB9XG4gIHZpc2l0RXhwcmVzc2lvbih2aXNpdG9yOiBFeHByZXNzaW9uVmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdFJlYWRLZXlFeHByKHRoaXMsIGNvbnRleHQpO1xuICB9XG4gIHNldCh2YWx1ZTogRXhwcmVzc2lvbik6IFdyaXRlS2V5RXhwciB7XG4gICAgcmV0dXJuIG5ldyBXcml0ZUtleUV4cHIodGhpcy5yZWNlaXZlciwgdGhpcy5pbmRleCwgdmFsdWUpO1xuICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIExpdGVyYWxBcnJheUV4cHIgZXh0ZW5kcyBFeHByZXNzaW9uIHtcbiAgcHVibGljIGVudHJpZXM6IEV4cHJlc3Npb25bXTtcbiAgY29uc3RydWN0b3IoZW50cmllczogRXhwcmVzc2lvbltdLCB0eXBlOiBUeXBlID0gbnVsbCkge1xuICAgIHN1cGVyKHR5cGUpO1xuICAgIHRoaXMuZW50cmllcyA9IGVudHJpZXM7XG4gIH1cbiAgdmlzaXRFeHByZXNzaW9uKHZpc2l0b3I6IEV4cHJlc3Npb25WaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0TGl0ZXJhbEFycmF5RXhwcih0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBMaXRlcmFsTWFwRXhwciBleHRlbmRzIEV4cHJlc3Npb24ge1xuICBwdWJsaWMgdmFsdWVUeXBlOiBUeXBlID0gbnVsbDtcbiAgO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZW50cmllczogQXJyYXk8QXJyYXk8c3RyaW5nIHwgRXhwcmVzc2lvbj4+LCB0eXBlOiBNYXBUeXBlID0gbnVsbCkge1xuICAgIHN1cGVyKHR5cGUpO1xuICAgIGlmIChpc1ByZXNlbnQodHlwZSkpIHtcbiAgICAgIHRoaXMudmFsdWVUeXBlID0gdHlwZS52YWx1ZVR5cGU7XG4gICAgfVxuICB9XG4gIHZpc2l0RXhwcmVzc2lvbih2aXNpdG9yOiBFeHByZXNzaW9uVmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdExpdGVyYWxNYXBFeHByKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXhwcmVzc2lvblZpc2l0b3Ige1xuICB2aXNpdFJlYWRWYXJFeHByKGFzdDogUmVhZFZhckV4cHIsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRXcml0ZVZhckV4cHIoZXhwcjogV3JpdGVWYXJFeHByLCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0V3JpdGVLZXlFeHByKGV4cHI6IFdyaXRlS2V5RXhwciwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdFdyaXRlUHJvcEV4cHIoZXhwcjogV3JpdGVQcm9wRXhwciwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEludm9rZU1ldGhvZEV4cHIoYXN0OiBJbnZva2VNZXRob2RFeHByLCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0SW52b2tlRnVuY3Rpb25FeHByKGFzdDogSW52b2tlRnVuY3Rpb25FeHByLCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0SW5zdGFudGlhdGVFeHByKGFzdDogSW5zdGFudGlhdGVFeHByLCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0TGl0ZXJhbEV4cHIoYXN0OiBMaXRlcmFsRXhwciwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEV4dGVybmFsRXhwcihhc3Q6IEV4dGVybmFsRXhwciwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdENvbmRpdGlvbmFsRXhwcihhc3Q6IENvbmRpdGlvbmFsRXhwciwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdE5vdEV4cHIoYXN0OiBOb3RFeHByLCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0Q2FzdEV4cHIoYXN0OiBDYXN0RXhwciwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEZ1bmN0aW9uRXhwcihhc3Q6IEZ1bmN0aW9uRXhwciwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEJpbmFyeU9wZXJhdG9yRXhwcihhc3Q6IEJpbmFyeU9wZXJhdG9yRXhwciwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdFJlYWRQcm9wRXhwcihhc3Q6IFJlYWRQcm9wRXhwciwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdFJlYWRLZXlFeHByKGFzdDogUmVhZEtleUV4cHIsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRMaXRlcmFsQXJyYXlFeHByKGFzdDogTGl0ZXJhbEFycmF5RXhwciwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdExpdGVyYWxNYXBFeHByKGFzdDogTGl0ZXJhbE1hcEV4cHIsIGNvbnRleHQ6IGFueSk6IGFueTtcbn1cblxuZXhwb3J0IHZhciBUSElTX0VYUFIgPSBuZXcgUmVhZFZhckV4cHIoQnVpbHRpblZhci5UaGlzKTtcbmV4cG9ydCB2YXIgU1VQRVJfRVhQUiA9IG5ldyBSZWFkVmFyRXhwcihCdWlsdGluVmFyLlN1cGVyKTtcbmV4cG9ydCB2YXIgQ0FUQ0hfRVJST1JfVkFSID0gbmV3IFJlYWRWYXJFeHByKEJ1aWx0aW5WYXIuQ2F0Y2hFcnJvcik7XG5leHBvcnQgdmFyIENBVENIX1NUQUNLX1ZBUiA9IG5ldyBSZWFkVmFyRXhwcihCdWlsdGluVmFyLkNhdGNoU3RhY2spO1xuZXhwb3J0IHZhciBOVUxMX0VYUFIgPSBuZXcgTGl0ZXJhbEV4cHIobnVsbCwgbnVsbCk7XG5cbi8vLy8gU3RhdGVtZW50c1xuZXhwb3J0IGVudW0gU3RtdE1vZGlmaWVyIHtcbiAgRmluYWwsXG4gIFByaXZhdGVcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFN0YXRlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBtb2RpZmllcnM6IFN0bXRNb2RpZmllcltdID0gbnVsbCkge1xuICAgIGlmIChpc0JsYW5rKG1vZGlmaWVycykpIHtcbiAgICAgIHRoaXMubW9kaWZpZXJzID0gW107XG4gICAgfVxuICB9XG5cbiAgYWJzdHJhY3QgdmlzaXRTdGF0ZW1lbnQodmlzaXRvcjogU3RhdGVtZW50VmlzaXRvciwgY29udGV4dDogYW55KTogYW55O1xuXG4gIGhhc01vZGlmaWVyKG1vZGlmaWVyOiBTdG10TW9kaWZpZXIpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMubW9kaWZpZXJzLmluZGV4T2YobW9kaWZpZXIpICE9PSAtMTsgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBEZWNsYXJlVmFyU3RtdCBleHRlbmRzIFN0YXRlbWVudCB7XG4gIHB1YmxpYyB0eXBlOiBUeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgdmFsdWU6IEV4cHJlc3Npb24sIHR5cGU6IFR5cGUgPSBudWxsLFxuICAgICAgICAgICAgICBtb2RpZmllcnM6IFN0bXRNb2RpZmllcltdID0gbnVsbCkge1xuICAgIHN1cGVyKG1vZGlmaWVycyk7XG4gICAgdGhpcy50eXBlID0gaXNQcmVzZW50KHR5cGUpID8gdHlwZSA6IHZhbHVlLnR5cGU7XG4gIH1cblxuICB2aXNpdFN0YXRlbWVudCh2aXNpdG9yOiBTdGF0ZW1lbnRWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0RGVjbGFyZVZhclN0bXQodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIERlY2xhcmVGdW5jdGlvblN0bXQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgcGFyYW1zOiBGblBhcmFtW10sIHB1YmxpYyBzdGF0ZW1lbnRzOiBTdGF0ZW1lbnRbXSxcbiAgICAgICAgICAgICAgcHVibGljIHR5cGU6IFR5cGUgPSBudWxsLCBtb2RpZmllcnM6IFN0bXRNb2RpZmllcltdID0gbnVsbCkge1xuICAgIHN1cGVyKG1vZGlmaWVycyk7XG4gIH1cblxuICB2aXNpdFN0YXRlbWVudCh2aXNpdG9yOiBTdGF0ZW1lbnRWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0RGVjbGFyZUZ1bmN0aW9uU3RtdCh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRXhwcmVzc2lvblN0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBleHByOiBFeHByZXNzaW9uKSB7IHN1cGVyKCk7IH1cblxuICB2aXNpdFN0YXRlbWVudCh2aXNpdG9yOiBTdGF0ZW1lbnRWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0RXhwcmVzc2lvblN0bXQodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgUmV0dXJuU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcbiAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBFeHByZXNzaW9uKSB7IHN1cGVyKCk7IH1cbiAgdmlzaXRTdGF0ZW1lbnQodmlzaXRvcjogU3RhdGVtZW50VmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdFJldHVyblN0bXQodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEFic3RyYWN0Q2xhc3NQYXJ0IHtcbiAgY29uc3RydWN0b3IocHVibGljIHR5cGU6IFR5cGUgPSBudWxsLCBwdWJsaWMgbW9kaWZpZXJzOiBTdG10TW9kaWZpZXJbXSkge1xuICAgIGlmIChpc0JsYW5rKG1vZGlmaWVycykpIHtcbiAgICAgIHRoaXMubW9kaWZpZXJzID0gW107XG4gICAgfVxuICB9XG4gIGhhc01vZGlmaWVyKG1vZGlmaWVyOiBTdG10TW9kaWZpZXIpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMubW9kaWZpZXJzLmluZGV4T2YobW9kaWZpZXIpICE9PSAtMTsgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2xhc3NGaWVsZCBleHRlbmRzIEFic3RyYWN0Q2xhc3NQYXJ0IHtcbiAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZywgdHlwZTogVHlwZSA9IG51bGwsIG1vZGlmaWVyczogU3RtdE1vZGlmaWVyW10gPSBudWxsKSB7XG4gICAgc3VwZXIodHlwZSwgbW9kaWZpZXJzKTtcbiAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBDbGFzc01ldGhvZCBleHRlbmRzIEFic3RyYWN0Q2xhc3NQYXJ0IHtcbiAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZywgcHVibGljIHBhcmFtczogRm5QYXJhbVtdLCBwdWJsaWMgYm9keTogU3RhdGVtZW50W10sXG4gICAgICAgICAgICAgIHR5cGU6IFR5cGUgPSBudWxsLCBtb2RpZmllcnM6IFN0bXRNb2RpZmllcltdID0gbnVsbCkge1xuICAgIHN1cGVyKHR5cGUsIG1vZGlmaWVycyk7XG4gIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgQ2xhc3NHZXR0ZXIgZXh0ZW5kcyBBYnN0cmFjdENsYXNzUGFydCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyBib2R5OiBTdGF0ZW1lbnRbXSwgdHlwZTogVHlwZSA9IG51bGwsXG4gICAgICAgICAgICAgIG1vZGlmaWVyczogU3RtdE1vZGlmaWVyW10gPSBudWxsKSB7XG4gICAgc3VwZXIodHlwZSwgbW9kaWZpZXJzKTtcbiAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBDbGFzc1N0bXQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgcGFyZW50OiBFeHByZXNzaW9uLCBwdWJsaWMgZmllbGRzOiBDbGFzc0ZpZWxkW10sXG4gICAgICAgICAgICAgIHB1YmxpYyBnZXR0ZXJzOiBDbGFzc0dldHRlcltdLCBwdWJsaWMgY29uc3RydWN0b3JNZXRob2Q6IENsYXNzTWV0aG9kLFxuICAgICAgICAgICAgICBwdWJsaWMgbWV0aG9kczogQ2xhc3NNZXRob2RbXSwgbW9kaWZpZXJzOiBTdG10TW9kaWZpZXJbXSA9IG51bGwpIHtcbiAgICBzdXBlcihtb2RpZmllcnMpO1xuICB9XG4gIHZpc2l0U3RhdGVtZW50KHZpc2l0b3I6IFN0YXRlbWVudFZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXREZWNsYXJlQ2xhc3NTdG10KHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIElmU3RtdCBleHRlbmRzIFN0YXRlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb25kaXRpb246IEV4cHJlc3Npb24sIHB1YmxpYyB0cnVlQ2FzZTogU3RhdGVtZW50W10sXG4gICAgICAgICAgICAgIHB1YmxpYyBmYWxzZUNhc2U6IFN0YXRlbWVudFtdID0gQ09OU1RfRVhQUihbXSkpIHtcbiAgICBzdXBlcigpO1xuICB9XG4gIHZpc2l0U3RhdGVtZW50KHZpc2l0b3I6IFN0YXRlbWVudFZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRJZlN0bXQodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgQ29tbWVudFN0bXQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29tbWVudDogc3RyaW5nKSB7IHN1cGVyKCk7IH1cbiAgdmlzaXRTdGF0ZW1lbnQodmlzaXRvcjogU3RhdGVtZW50VmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdENvbW1lbnRTdG10KHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFRyeUNhdGNoU3RtdCBleHRlbmRzIFN0YXRlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBib2R5U3RtdHM6IFN0YXRlbWVudFtdLCBwdWJsaWMgY2F0Y2hTdG10czogU3RhdGVtZW50W10pIHsgc3VwZXIoKTsgfVxuICB2aXNpdFN0YXRlbWVudCh2aXNpdG9yOiBTdGF0ZW1lbnRWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0VHJ5Q2F0Y2hTdG10KHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFRocm93U3RtdCBleHRlbmRzIFN0YXRlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlcnJvcjogRXhwcmVzc2lvbikgeyBzdXBlcigpOyB9XG4gIHZpc2l0U3RhdGVtZW50KHZpc2l0b3I6IFN0YXRlbWVudFZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRUaHJvd1N0bXQodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdGF0ZW1lbnRWaXNpdG9yIHtcbiAgdmlzaXREZWNsYXJlVmFyU3RtdChzdG10OiBEZWNsYXJlVmFyU3RtdCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdERlY2xhcmVGdW5jdGlvblN0bXQoc3RtdDogRGVjbGFyZUZ1bmN0aW9uU3RtdCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEV4cHJlc3Npb25TdG10KHN0bXQ6IEV4cHJlc3Npb25TdGF0ZW1lbnQsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRSZXR1cm5TdG10KHN0bXQ6IFJldHVyblN0YXRlbWVudCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdERlY2xhcmVDbGFzc1N0bXQoc3RtdDogQ2xhc3NTdG10LCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0SWZTdG10KHN0bXQ6IElmU3RtdCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdFRyeUNhdGNoU3RtdChzdG10OiBUcnlDYXRjaFN0bXQsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRUaHJvd1N0bXQoc3RtdDogVGhyb3dTdG10LCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0Q29tbWVudFN0bXQoc3RtdDogQ29tbWVudFN0bXQsIGNvbnRleHQ6IGFueSk6IGFueTtcbn1cblxuZXhwb3J0IGNsYXNzIEV4cHJlc3Npb25UcmFuc2Zvcm1lciBpbXBsZW1lbnRzIFN0YXRlbWVudFZpc2l0b3IsIEV4cHJlc3Npb25WaXNpdG9yIHtcbiAgdmlzaXRSZWFkVmFyRXhwcihhc3Q6IFJlYWRWYXJFeHByLCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gYXN0OyB9XG4gIHZpc2l0V3JpdGVWYXJFeHByKGV4cHI6IFdyaXRlVmFyRXhwciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gbmV3IFdyaXRlVmFyRXhwcihleHByLm5hbWUsIGV4cHIudmFsdWUudmlzaXRFeHByZXNzaW9uKHRoaXMsIGNvbnRleHQpKTtcbiAgfVxuICB2aXNpdFdyaXRlS2V5RXhwcihleHByOiBXcml0ZUtleUV4cHIsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIG5ldyBXcml0ZUtleUV4cHIoZXhwci5yZWNlaXZlci52aXNpdEV4cHJlc3Npb24odGhpcywgY29udGV4dCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwci5pbmRleC52aXNpdEV4cHJlc3Npb24odGhpcywgY29udGV4dCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwci52YWx1ZS52aXNpdEV4cHJlc3Npb24odGhpcywgY29udGV4dCkpO1xuICB9XG4gIHZpc2l0V3JpdGVQcm9wRXhwcihleHByOiBXcml0ZVByb3BFeHByLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBuZXcgV3JpdGVQcm9wRXhwcihleHByLnJlY2VpdmVyLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjb250ZXh0KSwgZXhwci5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByLnZhbHVlLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjb250ZXh0KSk7XG4gIH1cbiAgdmlzaXRJbnZva2VNZXRob2RFeHByKGFzdDogSW52b2tlTWV0aG9kRXhwciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB2YXIgbWV0aG9kID0gaXNQcmVzZW50KGFzdC5idWlsdGluKSA/IGFzdC5idWlsdGluIDogYXN0Lm5hbWU7XG4gICAgcmV0dXJuIG5ldyBJbnZva2VNZXRob2RFeHByKGFzdC5yZWNlaXZlci52aXNpdEV4cHJlc3Npb24odGhpcywgY29udGV4dCksIG1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aXNpdEFsbEV4cHJlc3Npb25zKGFzdC5hcmdzLCBjb250ZXh0KSwgYXN0LnR5cGUpO1xuICB9XG4gIHZpc2l0SW52b2tlRnVuY3Rpb25FeHByKGFzdDogSW52b2tlRnVuY3Rpb25FeHByLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBuZXcgSW52b2tlRnVuY3Rpb25FeHByKGFzdC5mbi52aXNpdEV4cHJlc3Npb24odGhpcywgY29udGV4dCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aXNpdEFsbEV4cHJlc3Npb25zKGFzdC5hcmdzLCBjb250ZXh0KSwgYXN0LnR5cGUpO1xuICB9XG4gIHZpc2l0SW5zdGFudGlhdGVFeHByKGFzdDogSW5zdGFudGlhdGVFeHByLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBuZXcgSW5zdGFudGlhdGVFeHByKGFzdC5jbGFzc0V4cHIudmlzaXRFeHByZXNzaW9uKHRoaXMsIGNvbnRleHQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlzaXRBbGxFeHByZXNzaW9ucyhhc3QuYXJncywgY29udGV4dCksIGFzdC50eXBlKTtcbiAgfVxuICB2aXNpdExpdGVyYWxFeHByKGFzdDogTGl0ZXJhbEV4cHIsIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBhc3Q7IH1cbiAgdmlzaXRFeHRlcm5hbEV4cHIoYXN0OiBFeHRlcm5hbEV4cHIsIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBhc3Q7IH1cbiAgdmlzaXRDb25kaXRpb25hbEV4cHIoYXN0OiBDb25kaXRpb25hbEV4cHIsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIG5ldyBDb25kaXRpb25hbEV4cHIoYXN0LmNvbmRpdGlvbi52aXNpdEV4cHJlc3Npb24odGhpcywgY29udGV4dCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN0LnRydWVDYXNlLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjb250ZXh0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3QuZmFsc2VDYXNlLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjb250ZXh0KSk7XG4gIH1cbiAgdmlzaXROb3RFeHByKGFzdDogTm90RXhwciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gbmV3IE5vdEV4cHIoYXN0LmNvbmRpdGlvbi52aXNpdEV4cHJlc3Npb24odGhpcywgY29udGV4dCkpO1xuICB9XG4gIHZpc2l0Q2FzdEV4cHIoYXN0OiBDYXN0RXhwciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gbmV3IENhc3RFeHByKGFzdC52YWx1ZS52aXNpdEV4cHJlc3Npb24odGhpcywgY29udGV4dCksIGNvbnRleHQpO1xuICB9XG4gIHZpc2l0RnVuY3Rpb25FeHByKGFzdDogRnVuY3Rpb25FeHByLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIC8vIERvbid0IGRlc2NlbmQgaW50byBuZXN0ZWQgZnVuY3Rpb25zXG4gICAgcmV0dXJuIGFzdDtcbiAgfVxuICB2aXNpdEJpbmFyeU9wZXJhdG9yRXhwcihhc3Q6IEJpbmFyeU9wZXJhdG9yRXhwciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gbmV3IEJpbmFyeU9wZXJhdG9yRXhwcihhc3Qub3BlcmF0b3IsIGFzdC5saHMudmlzaXRFeHByZXNzaW9uKHRoaXMsIGNvbnRleHQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzdC5yaHMudmlzaXRFeHByZXNzaW9uKHRoaXMsIGNvbnRleHQpLCBhc3QudHlwZSk7XG4gIH1cbiAgdmlzaXRSZWFkUHJvcEV4cHIoYXN0OiBSZWFkUHJvcEV4cHIsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIG5ldyBSZWFkUHJvcEV4cHIoYXN0LnJlY2VpdmVyLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjb250ZXh0KSwgYXN0Lm5hbWUsIGFzdC50eXBlKTtcbiAgfVxuICB2aXNpdFJlYWRLZXlFeHByKGFzdDogUmVhZEtleUV4cHIsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIG5ldyBSZWFkS2V5RXhwcihhc3QucmVjZWl2ZXIudmlzaXRFeHByZXNzaW9uKHRoaXMsIGNvbnRleHQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN0LmluZGV4LnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjb250ZXh0KSwgYXN0LnR5cGUpO1xuICB9XG4gIHZpc2l0TGl0ZXJhbEFycmF5RXhwcihhc3Q6IExpdGVyYWxBcnJheUV4cHIsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIG5ldyBMaXRlcmFsQXJyYXlFeHByKHRoaXMudmlzaXRBbGxFeHByZXNzaW9ucyhhc3QuZW50cmllcywgY29udGV4dCkpO1xuICB9XG4gIHZpc2l0TGl0ZXJhbE1hcEV4cHIoYXN0OiBMaXRlcmFsTWFwRXhwciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gbmV3IExpdGVyYWxNYXBFeHByKGFzdC5lbnRyaWVzLm1hcChcbiAgICAgICAgKGVudHJ5KSA9PiBbZW50cnlbMF0sICg8RXhwcmVzc2lvbj5lbnRyeVsxXSkudmlzaXRFeHByZXNzaW9uKHRoaXMsIGNvbnRleHQpXSkpO1xuICB9XG4gIHZpc2l0QWxsRXhwcmVzc2lvbnMoZXhwcnM6IEV4cHJlc3Npb25bXSwgY29udGV4dDogYW55KTogRXhwcmVzc2lvbltdIHtcbiAgICByZXR1cm4gZXhwcnMubWFwKGV4cHIgPT4gZXhwci52aXNpdEV4cHJlc3Npb24odGhpcywgY29udGV4dCkpO1xuICB9XG5cbiAgdmlzaXREZWNsYXJlVmFyU3RtdChzdG10OiBEZWNsYXJlVmFyU3RtdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gbmV3IERlY2xhcmVWYXJTdG10KHN0bXQubmFtZSwgc3RtdC52YWx1ZS52aXNpdEV4cHJlc3Npb24odGhpcywgY29udGV4dCksIHN0bXQudHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0bXQubW9kaWZpZXJzKTtcbiAgfVxuICB2aXNpdERlY2xhcmVGdW5jdGlvblN0bXQoc3RtdDogRGVjbGFyZUZ1bmN0aW9uU3RtdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICAvLyBEb24ndCBkZXNjZW5kIGludG8gbmVzdGVkIGZ1bmN0aW9uc1xuICAgIHJldHVybiBzdG10O1xuICB9XG4gIHZpc2l0RXhwcmVzc2lvblN0bXQoc3RtdDogRXhwcmVzc2lvblN0YXRlbWVudCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gbmV3IEV4cHJlc3Npb25TdGF0ZW1lbnQoc3RtdC5leHByLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjb250ZXh0KSk7XG4gIH1cbiAgdmlzaXRSZXR1cm5TdG10KHN0bXQ6IFJldHVyblN0YXRlbWVudCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gbmV3IFJldHVyblN0YXRlbWVudChzdG10LnZhbHVlLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjb250ZXh0KSk7XG4gIH1cbiAgdmlzaXREZWNsYXJlQ2xhc3NTdG10KHN0bXQ6IENsYXNzU3RtdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICAvLyBEb24ndCBkZXNjZW5kIGludG8gbmVzdGVkIGZ1bmN0aW9uc1xuICAgIHJldHVybiBzdG10O1xuICB9XG4gIHZpc2l0SWZTdG10KHN0bXQ6IElmU3RtdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gbmV3IElmU3RtdChzdG10LmNvbmRpdGlvbi52aXNpdEV4cHJlc3Npb24odGhpcywgY29udGV4dCksXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy52aXNpdEFsbFN0YXRlbWVudHMoc3RtdC50cnVlQ2FzZSwgY29udGV4dCksXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy52aXNpdEFsbFN0YXRlbWVudHMoc3RtdC5mYWxzZUNhc2UsIGNvbnRleHQpKTtcbiAgfVxuICB2aXNpdFRyeUNhdGNoU3RtdChzdG10OiBUcnlDYXRjaFN0bXQsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIG5ldyBUcnlDYXRjaFN0bXQodGhpcy52aXNpdEFsbFN0YXRlbWVudHMoc3RtdC5ib2R5U3RtdHMsIGNvbnRleHQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlzaXRBbGxTdGF0ZW1lbnRzKHN0bXQuY2F0Y2hTdG10cywgY29udGV4dCkpO1xuICB9XG4gIHZpc2l0VGhyb3dTdG10KHN0bXQ6IFRocm93U3RtdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gbmV3IFRocm93U3RtdChzdG10LmVycm9yLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjb250ZXh0KSk7XG4gIH1cbiAgdmlzaXRDb21tZW50U3RtdChzdG10OiBDb21tZW50U3RtdCwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIHN0bXQ7IH1cbiAgdmlzaXRBbGxTdGF0ZW1lbnRzKHN0bXRzOiBTdGF0ZW1lbnRbXSwgY29udGV4dDogYW55KTogU3RhdGVtZW50W10ge1xuICAgIHJldHVybiBzdG10cy5tYXAoc3RtdCA9PiBzdG10LnZpc2l0U3RhdGVtZW50KHRoaXMsIGNvbnRleHQpKTtcbiAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBSZWN1cnNpdmVFeHByZXNzaW9uVmlzaXRvciBpbXBsZW1lbnRzIFN0YXRlbWVudFZpc2l0b3IsIEV4cHJlc3Npb25WaXNpdG9yIHtcbiAgdmlzaXRSZWFkVmFyRXhwcihhc3Q6IFJlYWRWYXJFeHByLCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gYXN0OyB9XG4gIHZpc2l0V3JpdGVWYXJFeHByKGV4cHI6IFdyaXRlVmFyRXhwciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICBleHByLnZhbHVlLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjb250ZXh0KTtcbiAgICByZXR1cm4gZXhwcjtcbiAgfVxuICB2aXNpdFdyaXRlS2V5RXhwcihleHByOiBXcml0ZUtleUV4cHIsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgZXhwci5yZWNlaXZlci52aXNpdEV4cHJlc3Npb24odGhpcywgY29udGV4dCk7XG4gICAgZXhwci5pbmRleC52aXNpdEV4cHJlc3Npb24odGhpcywgY29udGV4dCk7XG4gICAgZXhwci52YWx1ZS52aXNpdEV4cHJlc3Npb24odGhpcywgY29udGV4dCk7XG4gICAgcmV0dXJuIGV4cHI7XG4gIH1cbiAgdmlzaXRXcml0ZVByb3BFeHByKGV4cHI6IFdyaXRlUHJvcEV4cHIsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgZXhwci5yZWNlaXZlci52aXNpdEV4cHJlc3Npb24odGhpcywgY29udGV4dCk7XG4gICAgZXhwci52YWx1ZS52aXNpdEV4cHJlc3Npb24odGhpcywgY29udGV4dCk7XG4gICAgcmV0dXJuIGV4cHI7XG4gIH1cbiAgdmlzaXRJbnZva2VNZXRob2RFeHByKGFzdDogSW52b2tlTWV0aG9kRXhwciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICBhc3QucmVjZWl2ZXIudmlzaXRFeHByZXNzaW9uKHRoaXMsIGNvbnRleHQpO1xuICAgIHRoaXMudmlzaXRBbGxFeHByZXNzaW9ucyhhc3QuYXJncywgY29udGV4dCk7XG4gICAgcmV0dXJuIGFzdDtcbiAgfVxuICB2aXNpdEludm9rZUZ1bmN0aW9uRXhwcihhc3Q6IEludm9rZUZ1bmN0aW9uRXhwciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICBhc3QuZm4udmlzaXRFeHByZXNzaW9uKHRoaXMsIGNvbnRleHQpO1xuICAgIHRoaXMudmlzaXRBbGxFeHByZXNzaW9ucyhhc3QuYXJncywgY29udGV4dCk7XG4gICAgcmV0dXJuIGFzdDtcbiAgfVxuICB2aXNpdEluc3RhbnRpYXRlRXhwcihhc3Q6IEluc3RhbnRpYXRlRXhwciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICBhc3QuY2xhc3NFeHByLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjb250ZXh0KTtcbiAgICB0aGlzLnZpc2l0QWxsRXhwcmVzc2lvbnMoYXN0LmFyZ3MsIGNvbnRleHQpO1xuICAgIHJldHVybiBhc3Q7XG4gIH1cbiAgdmlzaXRMaXRlcmFsRXhwcihhc3Q6IExpdGVyYWxFeHByLCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gYXN0OyB9XG4gIHZpc2l0RXh0ZXJuYWxFeHByKGFzdDogRXh0ZXJuYWxFeHByLCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gYXN0OyB9XG4gIHZpc2l0Q29uZGl0aW9uYWxFeHByKGFzdDogQ29uZGl0aW9uYWxFeHByLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIGFzdC5jb25kaXRpb24udmlzaXRFeHByZXNzaW9uKHRoaXMsIGNvbnRleHQpO1xuICAgIGFzdC50cnVlQ2FzZS52aXNpdEV4cHJlc3Npb24odGhpcywgY29udGV4dCk7XG4gICAgYXN0LmZhbHNlQ2FzZS52aXNpdEV4cHJlc3Npb24odGhpcywgY29udGV4dCk7XG4gICAgcmV0dXJuIGFzdDtcbiAgfVxuICB2aXNpdE5vdEV4cHIoYXN0OiBOb3RFeHByLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIGFzdC5jb25kaXRpb24udmlzaXRFeHByZXNzaW9uKHRoaXMsIGNvbnRleHQpO1xuICAgIHJldHVybiBhc3Q7XG4gIH1cbiAgdmlzaXRDYXN0RXhwcihhc3Q6IENhc3RFeHByLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIGFzdC52YWx1ZS52aXNpdEV4cHJlc3Npb24odGhpcywgY29udGV4dCk7XG4gICAgcmV0dXJuIGFzdDtcbiAgfVxuICB2aXNpdEZ1bmN0aW9uRXhwcihhc3Q6IEZ1bmN0aW9uRXhwciwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIGFzdDsgfVxuICB2aXNpdEJpbmFyeU9wZXJhdG9yRXhwcihhc3Q6IEJpbmFyeU9wZXJhdG9yRXhwciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICBhc3QubGhzLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjb250ZXh0KTtcbiAgICBhc3QucmhzLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjb250ZXh0KTtcbiAgICByZXR1cm4gYXN0O1xuICB9XG4gIHZpc2l0UmVhZFByb3BFeHByKGFzdDogUmVhZFByb3BFeHByLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIGFzdC5yZWNlaXZlci52aXNpdEV4cHJlc3Npb24odGhpcywgY29udGV4dCk7XG4gICAgcmV0dXJuIGFzdDtcbiAgfVxuICB2aXNpdFJlYWRLZXlFeHByKGFzdDogUmVhZEtleUV4cHIsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgYXN0LnJlY2VpdmVyLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjb250ZXh0KTtcbiAgICBhc3QuaW5kZXgudmlzaXRFeHByZXNzaW9uKHRoaXMsIGNvbnRleHQpO1xuICAgIHJldHVybiBhc3Q7XG4gIH1cbiAgdmlzaXRMaXRlcmFsQXJyYXlFeHByKGFzdDogTGl0ZXJhbEFycmF5RXhwciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB0aGlzLnZpc2l0QWxsRXhwcmVzc2lvbnMoYXN0LmVudHJpZXMsIGNvbnRleHQpO1xuICAgIHJldHVybiBhc3Q7XG4gIH1cbiAgdmlzaXRMaXRlcmFsTWFwRXhwcihhc3Q6IExpdGVyYWxNYXBFeHByLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIGFzdC5lbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiAoPEV4cHJlc3Npb24+ZW50cnlbMV0pLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjb250ZXh0KSk7XG4gICAgcmV0dXJuIGFzdDtcbiAgfVxuICB2aXNpdEFsbEV4cHJlc3Npb25zKGV4cHJzOiBFeHByZXNzaW9uW10sIGNvbnRleHQ6IGFueSk6IHZvaWQge1xuICAgIGV4cHJzLmZvckVhY2goZXhwciA9PiBleHByLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjb250ZXh0KSk7XG4gIH1cblxuICB2aXNpdERlY2xhcmVWYXJTdG10KHN0bXQ6IERlY2xhcmVWYXJTdG10LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHN0bXQudmFsdWUudmlzaXRFeHByZXNzaW9uKHRoaXMsIGNvbnRleHQpO1xuICAgIHJldHVybiBzdG10O1xuICB9XG4gIHZpc2l0RGVjbGFyZUZ1bmN0aW9uU3RtdChzdG10OiBEZWNsYXJlRnVuY3Rpb25TdG10LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIC8vIERvbid0IGRlc2NlbmQgaW50byBuZXN0ZWQgZnVuY3Rpb25zXG4gICAgcmV0dXJuIHN0bXQ7XG4gIH1cbiAgdmlzaXRFeHByZXNzaW9uU3RtdChzdG10OiBFeHByZXNzaW9uU3RhdGVtZW50LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHN0bXQuZXhwci52aXNpdEV4cHJlc3Npb24odGhpcywgY29udGV4dCk7XG4gICAgcmV0dXJuIHN0bXQ7XG4gIH1cbiAgdmlzaXRSZXR1cm5TdG10KHN0bXQ6IFJldHVyblN0YXRlbWVudCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICBzdG10LnZhbHVlLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjb250ZXh0KTtcbiAgICByZXR1cm4gc3RtdDtcbiAgfVxuICB2aXNpdERlY2xhcmVDbGFzc1N0bXQoc3RtdDogQ2xhc3NTdG10LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIC8vIERvbid0IGRlc2NlbmQgaW50byBuZXN0ZWQgZnVuY3Rpb25zXG4gICAgcmV0dXJuIHN0bXQ7XG4gIH1cbiAgdmlzaXRJZlN0bXQoc3RtdDogSWZTdG10LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHN0bXQuY29uZGl0aW9uLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjb250ZXh0KTtcbiAgICB0aGlzLnZpc2l0QWxsU3RhdGVtZW50cyhzdG10LnRydWVDYXNlLCBjb250ZXh0KTtcbiAgICB0aGlzLnZpc2l0QWxsU3RhdGVtZW50cyhzdG10LmZhbHNlQ2FzZSwgY29udGV4dCk7XG4gICAgcmV0dXJuIHN0bXQ7XG4gIH1cbiAgdmlzaXRUcnlDYXRjaFN0bXQoc3RtdDogVHJ5Q2F0Y2hTdG10LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMudmlzaXRBbGxTdGF0ZW1lbnRzKHN0bXQuYm9keVN0bXRzLCBjb250ZXh0KTtcbiAgICB0aGlzLnZpc2l0QWxsU3RhdGVtZW50cyhzdG10LmNhdGNoU3RtdHMsIGNvbnRleHQpO1xuICAgIHJldHVybiBzdG10O1xuICB9XG4gIHZpc2l0VGhyb3dTdG10KHN0bXQ6IFRocm93U3RtdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICBzdG10LmVycm9yLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjb250ZXh0KTtcbiAgICByZXR1cm4gc3RtdDtcbiAgfVxuICB2aXNpdENvbW1lbnRTdG10KHN0bXQ6IENvbW1lbnRTdG10LCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gc3RtdDsgfVxuICB2aXNpdEFsbFN0YXRlbWVudHMoc3RtdHM6IFN0YXRlbWVudFtdLCBjb250ZXh0OiBhbnkpOiB2b2lkIHtcbiAgICBzdG10cy5mb3JFYWNoKHN0bXQgPT4gc3RtdC52aXNpdFN0YXRlbWVudCh0aGlzLCBjb250ZXh0KSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VWYXJJbkV4cHJlc3Npb24odmFyTmFtZTogc3RyaW5nLCBuZXdWYWx1ZTogRXhwcmVzc2lvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IEV4cHJlc3Npb24pOiBFeHByZXNzaW9uIHtcbiAgdmFyIHRyYW5zZm9ybWVyID0gbmV3IF9SZXBsYWNlVmFyaWFibGVUcmFuc2Zvcm1lcih2YXJOYW1lLCBuZXdWYWx1ZSk7XG4gIHJldHVybiBleHByZXNzaW9uLnZpc2l0RXhwcmVzc2lvbih0cmFuc2Zvcm1lciwgbnVsbCk7XG59XG5cbmNsYXNzIF9SZXBsYWNlVmFyaWFibGVUcmFuc2Zvcm1lciBleHRlbmRzIEV4cHJlc3Npb25UcmFuc2Zvcm1lciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3Zhck5hbWU6IHN0cmluZywgcHJpdmF0ZSBfbmV3VmFsdWU6IEV4cHJlc3Npb24pIHsgc3VwZXIoKTsgfVxuICB2aXNpdFJlYWRWYXJFeHByKGFzdDogUmVhZFZhckV4cHIsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIGFzdC5uYW1lID09IHRoaXMuX3Zhck5hbWUgPyB0aGlzLl9uZXdWYWx1ZSA6IGFzdDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZFJlYWRWYXJOYW1lcyhzdG10czogU3RhdGVtZW50W10pOiBTZXQ8c3RyaW5nPiB7XG4gIHZhciBmaW5kZXIgPSBuZXcgX1ZhcmlhYmxlRmluZGVyKCk7XG4gIGZpbmRlci52aXNpdEFsbFN0YXRlbWVudHMoc3RtdHMsIG51bGwpO1xuICByZXR1cm4gZmluZGVyLnZhck5hbWVzO1xufVxuXG5jbGFzcyBfVmFyaWFibGVGaW5kZXIgZXh0ZW5kcyBSZWN1cnNpdmVFeHByZXNzaW9uVmlzaXRvciB7XG4gIHZhck5hbWVzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gIHZpc2l0UmVhZFZhckV4cHIoYXN0OiBSZWFkVmFyRXhwciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB0aGlzLnZhck5hbWVzLmFkZChhc3QubmFtZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhcmlhYmxlKG5hbWU6IHN0cmluZywgdHlwZTogVHlwZSA9IG51bGwpOiBSZWFkVmFyRXhwciB7XG4gIHJldHVybiBuZXcgUmVhZFZhckV4cHIobmFtZSwgdHlwZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbXBvcnRFeHByKGlkOiBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhLCB0eXBlUGFyYW1zOiBUeXBlW10gPSBudWxsKTogRXh0ZXJuYWxFeHByIHtcbiAgcmV0dXJuIG5ldyBFeHRlcm5hbEV4cHIoaWQsIG51bGwsIHR5cGVQYXJhbXMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW1wb3J0VHlwZShpZDogQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSwgdHlwZVBhcmFtczogVHlwZVtdID0gbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVNb2RpZmllcnM6IFR5cGVNb2RpZmllcltdID0gbnVsbCk6IEV4dGVybmFsVHlwZSB7XG4gIHJldHVybiBpc1ByZXNlbnQoaWQpID8gbmV3IEV4dGVybmFsVHlwZShpZCwgdHlwZVBhcmFtcywgdHlwZU1vZGlmaWVycykgOiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGl0ZXJhbCh2YWx1ZTogYW55LCB0eXBlOiBUeXBlID0gbnVsbCk6IExpdGVyYWxFeHByIHtcbiAgcmV0dXJuIG5ldyBMaXRlcmFsRXhwcih2YWx1ZSwgdHlwZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaXRlcmFsQXJyKHZhbHVlczogRXhwcmVzc2lvbltdLCB0eXBlOiBUeXBlID0gbnVsbCk6IExpdGVyYWxBcnJheUV4cHIge1xuICByZXR1cm4gbmV3IExpdGVyYWxBcnJheUV4cHIodmFsdWVzLCB0eXBlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpdGVyYWxNYXAodmFsdWVzOiBBcnJheTxBcnJheTxzdHJpbmcgfCBFeHByZXNzaW9uPj4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBNYXBUeXBlID0gbnVsbCk6IExpdGVyYWxNYXBFeHByIHtcbiAgcmV0dXJuIG5ldyBMaXRlcmFsTWFwRXhwcih2YWx1ZXMsIHR5cGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm90KGV4cHI6IEV4cHJlc3Npb24pOiBOb3RFeHByIHtcbiAgcmV0dXJuIG5ldyBOb3RFeHByKGV4cHIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm4ocGFyYW1zOiBGblBhcmFtW10sIGJvZHk6IFN0YXRlbWVudFtdLCB0eXBlOiBUeXBlID0gbnVsbCk6IEZ1bmN0aW9uRXhwciB7XG4gIHJldHVybiBuZXcgRnVuY3Rpb25FeHByKHBhcmFtcywgYm9keSwgdHlwZSk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
