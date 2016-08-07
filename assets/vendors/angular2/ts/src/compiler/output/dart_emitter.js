System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', './output_ast', './abstract_emitter', './path_util'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lang_1, exceptions_1, o, abstract_emitter_1, path_util_1;
    var _debugModuleUrl, DartEmitter, _DartEmitterVisitor;
    function debugOutputAstAsDart(ast) {
        var converter = new _DartEmitterVisitor(_debugModuleUrl);
        var ctx = abstract_emitter_1.EmitterVisitorContext.createRoot([]);
        var asts;
        if (lang_1.isArray(ast)) {
            asts = ast;
        }
        else {
            asts = [ast];
        }
        asts.forEach(function (ast) {
            if (ast instanceof o.Statement) {
                ast.visitStatement(converter, ctx);
            }
            else if (ast instanceof o.Expression) {
                ast.visitExpression(converter, ctx);
            }
            else if (ast instanceof o.Type) {
                ast.visitType(converter, ctx);
            }
            else {
                throw new exceptions_1.BaseException("Don't know how to print debug info for " + ast);
            }
        });
        return ctx.toSource();
    }
    exports_1("debugOutputAstAsDart", debugOutputAstAsDart);
    function getSuperConstructorCallExpr(stmt) {
        if (stmt instanceof o.ExpressionStatement) {
            var expr = stmt.expr;
            if (expr instanceof o.InvokeFunctionExpr) {
                var fn = expr.fn;
                if (fn instanceof o.ReadVarExpr) {
                    if (fn.builtin === o.BuiltinVar.Super) {
                        return expr;
                    }
                }
            }
        }
        return null;
    }
    function isConstType(type) {
        return lang_1.isPresent(type) && type.hasModifier(o.TypeModifier.Const);
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
            },
            function (abstract_emitter_1_1) {
                abstract_emitter_1 = abstract_emitter_1_1;
            },
            function (path_util_1_1) {
                path_util_1 = path_util_1_1;
            }],
        execute: function() {
            _debugModuleUrl = 'asset://debug/lib';
            DartEmitter = (function () {
                function DartEmitter() {
                }
                DartEmitter.prototype.emitStatements = function (moduleUrl, stmts, exportedVars) {
                    var srcParts = [];
                    // Note: We are not creating a library here as Dart does not need it.
                    // Dart analzyer might complain about it though.
                    var converter = new _DartEmitterVisitor(moduleUrl);
                    var ctx = abstract_emitter_1.EmitterVisitorContext.createRoot(exportedVars);
                    converter.visitAllStatements(stmts, ctx);
                    converter.importsWithPrefixes.forEach(function (prefix, importedModuleUrl) {
                        srcParts.push("import '" + path_util_1.getImportModulePath(moduleUrl, importedModuleUrl, path_util_1.ImportEnv.Dart) + "' as " + prefix + ";");
                    });
                    srcParts.push(ctx.toSource());
                    return srcParts.join('\n');
                };
                return DartEmitter;
            }());
            exports_1("DartEmitter", DartEmitter);
            _DartEmitterVisitor = (function (_super) {
                __extends(_DartEmitterVisitor, _super);
                function _DartEmitterVisitor(_moduleUrl) {
                    _super.call(this, true);
                    this._moduleUrl = _moduleUrl;
                    this.importsWithPrefixes = new Map();
                }
                _DartEmitterVisitor.prototype.visitExternalExpr = function (ast, ctx) {
                    this._visitIdentifier(ast.value, ast.typeParams, ctx);
                    return null;
                };
                _DartEmitterVisitor.prototype.visitDeclareVarStmt = function (stmt, ctx) {
                    if (stmt.hasModifier(o.StmtModifier.Final)) {
                        if (isConstType(stmt.type)) {
                            ctx.print("const ");
                        }
                        else {
                            ctx.print("final ");
                        }
                    }
                    else if (lang_1.isBlank(stmt.type)) {
                        ctx.print("var ");
                    }
                    if (lang_1.isPresent(stmt.type)) {
                        stmt.type.visitType(this, ctx);
                        ctx.print(" ");
                    }
                    ctx.print(stmt.name + " = ");
                    stmt.value.visitExpression(this, ctx);
                    ctx.println(";");
                    return null;
                };
                _DartEmitterVisitor.prototype.visitCastExpr = function (ast, ctx) {
                    ctx.print("(");
                    ast.value.visitExpression(this, ctx);
                    ctx.print(" as ");
                    ast.type.visitType(this, ctx);
                    ctx.print(")");
                    return null;
                };
                _DartEmitterVisitor.prototype.visitDeclareClassStmt = function (stmt, ctx) {
                    var _this = this;
                    ctx.pushClass(stmt);
                    ctx.print("class " + stmt.name);
                    if (lang_1.isPresent(stmt.parent)) {
                        ctx.print(" extends ");
                        stmt.parent.visitExpression(this, ctx);
                    }
                    ctx.println(" {");
                    ctx.incIndent();
                    stmt.fields.forEach(function (field) { return _this._visitClassField(field, ctx); });
                    if (lang_1.isPresent(stmt.constructorMethod)) {
                        this._visitClassConstructor(stmt, ctx);
                    }
                    stmt.getters.forEach(function (getter) { return _this._visitClassGetter(getter, ctx); });
                    stmt.methods.forEach(function (method) { return _this._visitClassMethod(method, ctx); });
                    ctx.decIndent();
                    ctx.println("}");
                    ctx.popClass();
                    return null;
                };
                _DartEmitterVisitor.prototype._visitClassField = function (field, ctx) {
                    if (field.hasModifier(o.StmtModifier.Final)) {
                        ctx.print("final ");
                    }
                    else if (lang_1.isBlank(field.type)) {
                        ctx.print("var ");
                    }
                    if (lang_1.isPresent(field.type)) {
                        field.type.visitType(this, ctx);
                        ctx.print(" ");
                    }
                    ctx.println(field.name + ";");
                };
                _DartEmitterVisitor.prototype._visitClassGetter = function (getter, ctx) {
                    if (lang_1.isPresent(getter.type)) {
                        getter.type.visitType(this, ctx);
                        ctx.print(" ");
                    }
                    ctx.println("get " + getter.name + " {");
                    ctx.incIndent();
                    this.visitAllStatements(getter.body, ctx);
                    ctx.decIndent();
                    ctx.println("}");
                };
                _DartEmitterVisitor.prototype._visitClassConstructor = function (stmt, ctx) {
                    ctx.print(stmt.name + "(");
                    this._visitParams(stmt.constructorMethod.params, ctx);
                    ctx.print(")");
                    var ctorStmts = stmt.constructorMethod.body;
                    var superCtorExpr = ctorStmts.length > 0 ? getSuperConstructorCallExpr(ctorStmts[0]) : null;
                    if (lang_1.isPresent(superCtorExpr)) {
                        ctx.print(": ");
                        superCtorExpr.visitExpression(this, ctx);
                        ctorStmts = ctorStmts.slice(1);
                    }
                    ctx.println(" {");
                    ctx.incIndent();
                    this.visitAllStatements(ctorStmts, ctx);
                    ctx.decIndent();
                    ctx.println("}");
                };
                _DartEmitterVisitor.prototype._visitClassMethod = function (method, ctx) {
                    if (lang_1.isPresent(method.type)) {
                        method.type.visitType(this, ctx);
                    }
                    else {
                        ctx.print("void");
                    }
                    ctx.print(" " + method.name + "(");
                    this._visitParams(method.params, ctx);
                    ctx.println(") {");
                    ctx.incIndent();
                    this.visitAllStatements(method.body, ctx);
                    ctx.decIndent();
                    ctx.println("}");
                };
                _DartEmitterVisitor.prototype.visitFunctionExpr = function (ast, ctx) {
                    ctx.print("(");
                    this._visitParams(ast.params, ctx);
                    ctx.println(") {");
                    ctx.incIndent();
                    this.visitAllStatements(ast.statements, ctx);
                    ctx.decIndent();
                    ctx.print("}");
                    return null;
                };
                _DartEmitterVisitor.prototype.visitDeclareFunctionStmt = function (stmt, ctx) {
                    if (lang_1.isPresent(stmt.type)) {
                        stmt.type.visitType(this, ctx);
                    }
                    else {
                        ctx.print("void");
                    }
                    ctx.print(" " + stmt.name + "(");
                    this._visitParams(stmt.params, ctx);
                    ctx.println(") {");
                    ctx.incIndent();
                    this.visitAllStatements(stmt.statements, ctx);
                    ctx.decIndent();
                    ctx.println("}");
                    return null;
                };
                _DartEmitterVisitor.prototype.getBuiltinMethodName = function (method) {
                    var name;
                    switch (method) {
                        case o.BuiltinMethod.ConcatArray:
                            name = '.addAll';
                            break;
                        case o.BuiltinMethod.SubscribeObservable:
                            name = 'listen';
                            break;
                        case o.BuiltinMethod.bind:
                            name = null;
                            break;
                        default:
                            throw new exceptions_1.BaseException("Unknown builtin method: " + method);
                    }
                    return name;
                };
                _DartEmitterVisitor.prototype.visitTryCatchStmt = function (stmt, ctx) {
                    ctx.println("try {");
                    ctx.incIndent();
                    this.visitAllStatements(stmt.bodyStmts, ctx);
                    ctx.decIndent();
                    ctx.println("} catch (" + abstract_emitter_1.CATCH_ERROR_VAR.name + ", " + abstract_emitter_1.CATCH_STACK_VAR.name + ") {");
                    ctx.incIndent();
                    this.visitAllStatements(stmt.catchStmts, ctx);
                    ctx.decIndent();
                    ctx.println("}");
                    return null;
                };
                _DartEmitterVisitor.prototype.visitBinaryOperatorExpr = function (ast, ctx) {
                    switch (ast.operator) {
                        case o.BinaryOperator.Identical:
                            ctx.print("identical(");
                            ast.lhs.visitExpression(this, ctx);
                            ctx.print(", ");
                            ast.rhs.visitExpression(this, ctx);
                            ctx.print(")");
                            break;
                        case o.BinaryOperator.NotIdentical:
                            ctx.print("!identical(");
                            ast.lhs.visitExpression(this, ctx);
                            ctx.print(", ");
                            ast.rhs.visitExpression(this, ctx);
                            ctx.print(")");
                            break;
                        default:
                            _super.prototype.visitBinaryOperatorExpr.call(this, ast, ctx);
                    }
                    return null;
                };
                _DartEmitterVisitor.prototype.visitLiteralArrayExpr = function (ast, ctx) {
                    if (isConstType(ast.type)) {
                        ctx.print("const ");
                    }
                    return _super.prototype.visitLiteralArrayExpr.call(this, ast, ctx);
                };
                _DartEmitterVisitor.prototype.visitLiteralMapExpr = function (ast, ctx) {
                    if (isConstType(ast.type)) {
                        ctx.print("const ");
                    }
                    if (lang_1.isPresent(ast.valueType)) {
                        ctx.print("<String, ");
                        ast.valueType.visitType(this, ctx);
                        ctx.print(">");
                    }
                    return _super.prototype.visitLiteralMapExpr.call(this, ast, ctx);
                };
                _DartEmitterVisitor.prototype.visitInstantiateExpr = function (ast, ctx) {
                    ctx.print(isConstType(ast.type) ? "const" : "new");
                    ctx.print(' ');
                    ast.classExpr.visitExpression(this, ctx);
                    ctx.print("(");
                    this.visitAllExpressions(ast.args, ctx, ",");
                    ctx.print(")");
                    return null;
                };
                _DartEmitterVisitor.prototype.visitBuiltintType = function (type, ctx) {
                    var typeStr;
                    switch (type.name) {
                        case o.BuiltinTypeName.Bool:
                            typeStr = 'bool';
                            break;
                        case o.BuiltinTypeName.Dynamic:
                            typeStr = 'dynamic';
                            break;
                        case o.BuiltinTypeName.Function:
                            typeStr = 'Function';
                            break;
                        case o.BuiltinTypeName.Number:
                            typeStr = 'num';
                            break;
                        case o.BuiltinTypeName.Int:
                            typeStr = 'int';
                            break;
                        case o.BuiltinTypeName.String:
                            typeStr = 'String';
                            break;
                        default:
                            throw new exceptions_1.BaseException("Unsupported builtin type " + type.name);
                    }
                    ctx.print(typeStr);
                    return null;
                };
                _DartEmitterVisitor.prototype.visitExternalType = function (ast, ctx) {
                    this._visitIdentifier(ast.value, ast.typeParams, ctx);
                    return null;
                };
                _DartEmitterVisitor.prototype.visitArrayType = function (type, ctx) {
                    ctx.print("List<");
                    if (lang_1.isPresent(type.of)) {
                        type.of.visitType(this, ctx);
                    }
                    else {
                        ctx.print("dynamic");
                    }
                    ctx.print(">");
                    return null;
                };
                _DartEmitterVisitor.prototype.visitMapType = function (type, ctx) {
                    ctx.print("Map<String, ");
                    if (lang_1.isPresent(type.valueType)) {
                        type.valueType.visitType(this, ctx);
                    }
                    else {
                        ctx.print("dynamic");
                    }
                    ctx.print(">");
                    return null;
                };
                _DartEmitterVisitor.prototype._visitParams = function (params, ctx) {
                    var _this = this;
                    this.visitAllObjects(function (param) {
                        if (lang_1.isPresent(param.type)) {
                            param.type.visitType(_this, ctx);
                            ctx.print(' ');
                        }
                        ctx.print(param.name);
                    }, params, ctx, ',');
                };
                _DartEmitterVisitor.prototype._visitIdentifier = function (value, typeParams, ctx) {
                    var _this = this;
                    if (lang_1.isPresent(value.moduleUrl) && value.moduleUrl != this._moduleUrl) {
                        var prefix = this.importsWithPrefixes.get(value.moduleUrl);
                        if (lang_1.isBlank(prefix)) {
                            prefix = "import" + this.importsWithPrefixes.size;
                            this.importsWithPrefixes.set(value.moduleUrl, prefix);
                        }
                        ctx.print(prefix + ".");
                    }
                    ctx.print(value.name);
                    if (lang_1.isPresent(typeParams) && typeParams.length > 0) {
                        ctx.print("<");
                        this.visitAllObjects(function (type) { return type.visitType(_this, ctx); }, typeParams, ctx, ',');
                        ctx.print(">");
                    }
                };
                return _DartEmitterVisitor;
            }(abstract_emitter_1.AbstractEmitterVisitor));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9vdXRwdXQvZGFydF9lbWl0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztRQXVCSSxlQUFlO0lBRW5CLDhCQUFxQyxHQUFnRDtRQUNuRixJQUFJLFNBQVMsR0FBRyxJQUFJLG1CQUFtQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3pELElBQUksR0FBRyxHQUFHLHdDQUFxQixDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMvQyxJQUFJLElBQVcsQ0FBQztRQUNoQixFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLElBQUksR0FBVSxHQUFHLENBQUM7UUFDcEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDZixDQUFDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7WUFDZixFQUFFLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLEdBQUcsQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3JDLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxHQUFHLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN0QyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDakMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDaEMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE1BQU0sSUFB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R0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDM0QsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDcEIsTUFBTSxHQUFHLFdBQVMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQU0sQ0FBQzs0QkFDbEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO3dCQUN4RCxDQUFDO3dCQUNELEdBQUcsQ0FBQyxLQUFLLENBQUksTUFBTSxNQUFHLENBQUMsQ0FBQztvQkFDMUIsQ0FBQztvQkFDRCxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDdEIsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ25ELEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ2YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSSxFQUFFLEdBQUcsQ0FBQyxFQUF6QixDQUF5QixFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBQ2hGLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2pCLENBQUM7Z0JBQ0gsQ0FBQztnQkFDSCwwQkFBQztZQUFELENBclNBLEFBcVNDLENBclNpQyx5Q0FBc0IsR0FxU3ZEIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9vdXRwdXQvZGFydF9lbWl0dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgU3RyaW5nV3JhcHBlcixcbiAgUmVnRXhwV3JhcHBlcixcbiAgaXNQcmVzZW50LFxuICBpc0JsYW5rLFxuICBNYXRoLFxuICBpc1N0cmluZyxcbiAgaXNBcnJheVxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7Q29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YX0gZnJvbSAnLi4vY29tcGlsZV9tZXRhZGF0YSc7XG5pbXBvcnQgKiBhcyBvIGZyb20gJy4vb3V0cHV0X2FzdCc7XG5pbXBvcnQge1xuICBPdXRwdXRFbWl0dGVyLFxuICBFbWl0dGVyVmlzaXRvckNvbnRleHQsXG4gIEFic3RyYWN0RW1pdHRlclZpc2l0b3IsXG4gIENBVENIX0VSUk9SX1ZBUixcbiAgQ0FUQ0hfU1RBQ0tfVkFSLFxuICBlc2NhcGVTaW5nbGVRdW90ZVN0cmluZ1xufSBmcm9tICcuL2Fic3RyYWN0X2VtaXR0ZXInO1xuaW1wb3J0IHtnZXRJbXBvcnRNb2R1bGVQYXRoLCBJbXBvcnRFbnZ9IGZyb20gJy4vcGF0aF91dGlsJztcblxudmFyIF9kZWJ1Z01vZHVsZVVybCA9ICdhc3NldDovL2RlYnVnL2xpYic7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWJ1Z091dHB1dEFzdEFzRGFydChhc3Q6IG8uU3RhdGVtZW50IHwgby5FeHByZXNzaW9uIHwgby5UeXBlIHwgYW55W10pOiBzdHJpbmcge1xuICB2YXIgY29udmVydGVyID0gbmV3IF9EYXJ0RW1pdHRlclZpc2l0b3IoX2RlYnVnTW9kdWxlVXJsKTtcbiAgdmFyIGN0eCA9IEVtaXR0ZXJWaXNpdG9yQ29udGV4dC5jcmVhdGVSb290KFtdKTtcbiAgdmFyIGFzdHM6IGFueVtdO1xuICBpZiAoaXNBcnJheShhc3QpKSB7XG4gICAgYXN0cyA9IDxhbnlbXT5hc3Q7XG4gIH0gZWxzZSB7XG4gICAgYXN0cyA9IFthc3RdO1xuICB9XG4gIGFzdHMuZm9yRWFjaCgoYXN0KSA9PiB7XG4gICAgaWYgKGFzdCBpbnN0YW5jZW9mIG8uU3RhdGVtZW50KSB7XG4gICAgICBhc3QudmlzaXRTdGF0ZW1lbnQoY29udmVydGVyLCBjdHgpO1xuICAgIH0gZWxzZSBpZiAoYXN0IGluc3RhbmNlb2Ygby5FeHByZXNzaW9uKSB7XG4gICAgICBhc3QudmlzaXRFeHByZXNzaW9uKGNvbnZlcnRlciwgY3R4KTtcbiAgICB9IGVsc2UgaWYgKGFzdCBpbnN0YW5jZW9mIG8uVHlwZSkge1xuICAgICAgYXN0LnZpc2l0VHlwZShjb252ZXJ0ZXIsIGN0eCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBEb24ndCBrbm93IGhvdyB0byBwcmludCBkZWJ1ZyBpbmZvIGZvciAke2FzdH1gKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gY3R4LnRvU291cmNlKCk7XG59XG5cbmV4cG9ydCBjbGFzcyBEYXJ0RW1pdHRlciBpbXBsZW1lbnRzIE91dHB1dEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHt9XG4gIGVtaXRTdGF0ZW1lbnRzKG1vZHVsZVVybDogc3RyaW5nLCBzdG10czogby5TdGF0ZW1lbnRbXSwgZXhwb3J0ZWRWYXJzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gICAgdmFyIHNyY1BhcnRzID0gW107XG4gICAgLy8gTm90ZTogV2UgYXJlIG5vdCBjcmVhdGluZyBhIGxpYnJhcnkgaGVyZSBhcyBEYXJ0IGRvZXMgbm90IG5lZWQgaXQuXG4gICAgLy8gRGFydCBhbmFsenllciBtaWdodCBjb21wbGFpbiBhYm91dCBpdCB0aG91Z2guXG5cbiAgICB2YXIgY29udmVydGVyID0gbmV3IF9EYXJ0RW1pdHRlclZpc2l0b3IobW9kdWxlVXJsKTtcbiAgICB2YXIgY3R4ID0gRW1pdHRlclZpc2l0b3JDb250ZXh0LmNyZWF0ZVJvb3QoZXhwb3J0ZWRWYXJzKTtcbiAgICBjb252ZXJ0ZXIudmlzaXRBbGxTdGF0ZW1lbnRzKHN0bXRzLCBjdHgpO1xuXG4gICAgY29udmVydGVyLmltcG9ydHNXaXRoUHJlZml4ZXMuZm9yRWFjaCgocHJlZml4LCBpbXBvcnRlZE1vZHVsZVVybCkgPT4ge1xuICAgICAgc3JjUGFydHMucHVzaChcbiAgICAgICAgICBgaW1wb3J0ICcke2dldEltcG9ydE1vZHVsZVBhdGgobW9kdWxlVXJsLCBpbXBvcnRlZE1vZHVsZVVybCwgSW1wb3J0RW52LkRhcnQpfScgYXMgJHtwcmVmaXh9O2ApO1xuICAgIH0pO1xuICAgIHNyY1BhcnRzLnB1c2goY3R4LnRvU291cmNlKCkpO1xuICAgIHJldHVybiBzcmNQYXJ0cy5qb2luKCdcXG4nKTtcbiAgfVxufVxuXG5jbGFzcyBfRGFydEVtaXR0ZXJWaXNpdG9yIGV4dGVuZHMgQWJzdHJhY3RFbWl0dGVyVmlzaXRvciBpbXBsZW1lbnRzIG8uVHlwZVZpc2l0b3Ige1xuICBpbXBvcnRzV2l0aFByZWZpeGVzID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tb2R1bGVVcmw6IHN0cmluZykgeyBzdXBlcih0cnVlKTsgfVxuXG4gIHZpc2l0RXh0ZXJuYWxFeHByKGFzdDogby5FeHRlcm5hbEV4cHIsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICB0aGlzLl92aXNpdElkZW50aWZpZXIoYXN0LnZhbHVlLCBhc3QudHlwZVBhcmFtcywgY3R4KTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdERlY2xhcmVWYXJTdG10KHN0bXQ6IG8uRGVjbGFyZVZhclN0bXQsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICBpZiAoc3RtdC5oYXNNb2RpZmllcihvLlN0bXRNb2RpZmllci5GaW5hbCkpIHtcbiAgICAgIGlmIChpc0NvbnN0VHlwZShzdG10LnR5cGUpKSB7XG4gICAgICAgIGN0eC5wcmludChgY29uc3QgYCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdHgucHJpbnQoYGZpbmFsIGApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNCbGFuayhzdG10LnR5cGUpKSB7XG4gICAgICBjdHgucHJpbnQoYHZhciBgKTtcbiAgICB9XG4gICAgaWYgKGlzUHJlc2VudChzdG10LnR5cGUpKSB7XG4gICAgICBzdG10LnR5cGUudmlzaXRUeXBlKHRoaXMsIGN0eCk7XG4gICAgICBjdHgucHJpbnQoYCBgKTtcbiAgICB9XG4gICAgY3R4LnByaW50KGAke3N0bXQubmFtZX0gPSBgKTtcbiAgICBzdG10LnZhbHVlLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICAgIGN0eC5wcmludGxuKGA7YCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXRDYXN0RXhwcihhc3Q6IG8uQ2FzdEV4cHIsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICBjdHgucHJpbnQoYChgKTtcbiAgICBhc3QudmFsdWUudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgY3R4LnByaW50KGAgYXMgYCk7XG4gICAgYXN0LnR5cGUudmlzaXRUeXBlKHRoaXMsIGN0eCk7XG4gICAgY3R4LnByaW50KGApYCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXREZWNsYXJlQ2xhc3NTdG10KHN0bXQ6IG8uQ2xhc3NTdG10LCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgY3R4LnB1c2hDbGFzcyhzdG10KTtcbiAgICBjdHgucHJpbnQoYGNsYXNzICR7c3RtdC5uYW1lfWApO1xuICAgIGlmIChpc1ByZXNlbnQoc3RtdC5wYXJlbnQpKSB7XG4gICAgICBjdHgucHJpbnQoYCBleHRlbmRzIGApO1xuICAgICAgc3RtdC5wYXJlbnQudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgfVxuICAgIGN0eC5wcmludGxuKGAge2ApO1xuICAgIGN0eC5pbmNJbmRlbnQoKTtcbiAgICBzdG10LmZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4gdGhpcy5fdmlzaXRDbGFzc0ZpZWxkKGZpZWxkLCBjdHgpKTtcbiAgICBpZiAoaXNQcmVzZW50KHN0bXQuY29uc3RydWN0b3JNZXRob2QpKSB7XG4gICAgICB0aGlzLl92aXNpdENsYXNzQ29uc3RydWN0b3Ioc3RtdCwgY3R4KTtcbiAgICB9XG4gICAgc3RtdC5nZXR0ZXJzLmZvckVhY2goKGdldHRlcikgPT4gdGhpcy5fdmlzaXRDbGFzc0dldHRlcihnZXR0ZXIsIGN0eCkpO1xuICAgIHN0bXQubWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHRoaXMuX3Zpc2l0Q2xhc3NNZXRob2QobWV0aG9kLCBjdHgpKTtcbiAgICBjdHguZGVjSW5kZW50KCk7XG4gICAgY3R4LnByaW50bG4oYH1gKTtcbiAgICBjdHgucG9wQ2xhc3MoKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBwcml2YXRlIF92aXNpdENsYXNzRmllbGQoZmllbGQ6IG8uQ2xhc3NGaWVsZCwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpIHtcbiAgICBpZiAoZmllbGQuaGFzTW9kaWZpZXIoby5TdG10TW9kaWZpZXIuRmluYWwpKSB7XG4gICAgICBjdHgucHJpbnQoYGZpbmFsIGApO1xuICAgIH0gZWxzZSBpZiAoaXNCbGFuayhmaWVsZC50eXBlKSkge1xuICAgICAgY3R4LnByaW50KGB2YXIgYCk7XG4gICAgfVxuICAgIGlmIChpc1ByZXNlbnQoZmllbGQudHlwZSkpIHtcbiAgICAgIGZpZWxkLnR5cGUudmlzaXRUeXBlKHRoaXMsIGN0eCk7XG4gICAgICBjdHgucHJpbnQoYCBgKTtcbiAgICB9XG4gICAgY3R4LnByaW50bG4oYCR7ZmllbGQubmFtZX07YCk7XG4gIH1cbiAgcHJpdmF0ZSBfdmlzaXRDbGFzc0dldHRlcihnZXR0ZXI6IG8uQ2xhc3NHZXR0ZXIsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KSB7XG4gICAgaWYgKGlzUHJlc2VudChnZXR0ZXIudHlwZSkpIHtcbiAgICAgIGdldHRlci50eXBlLnZpc2l0VHlwZSh0aGlzLCBjdHgpO1xuICAgICAgY3R4LnByaW50KGAgYCk7XG4gICAgfVxuICAgIGN0eC5wcmludGxuKGBnZXQgJHtnZXR0ZXIubmFtZX0ge2ApO1xuICAgIGN0eC5pbmNJbmRlbnQoKTtcbiAgICB0aGlzLnZpc2l0QWxsU3RhdGVtZW50cyhnZXR0ZXIuYm9keSwgY3R4KTtcbiAgICBjdHguZGVjSW5kZW50KCk7XG4gICAgY3R4LnByaW50bG4oYH1gKTtcbiAgfVxuICBwcml2YXRlIF92aXNpdENsYXNzQ29uc3RydWN0b3Ioc3RtdDogby5DbGFzc1N0bXQsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KSB7XG4gICAgY3R4LnByaW50KGAke3N0bXQubmFtZX0oYCk7XG4gICAgdGhpcy5fdmlzaXRQYXJhbXMoc3RtdC5jb25zdHJ1Y3Rvck1ldGhvZC5wYXJhbXMsIGN0eCk7XG4gICAgY3R4LnByaW50KGApYCk7XG5cbiAgICB2YXIgY3RvclN0bXRzID0gc3RtdC5jb25zdHJ1Y3Rvck1ldGhvZC5ib2R5O1xuICAgIHZhciBzdXBlckN0b3JFeHByID0gY3RvclN0bXRzLmxlbmd0aCA+IDAgPyBnZXRTdXBlckNvbnN0cnVjdG9yQ2FsbEV4cHIoY3RvclN0bXRzWzBdKSA6IG51bGw7XG4gICAgaWYgKGlzUHJlc2VudChzdXBlckN0b3JFeHByKSkge1xuICAgICAgY3R4LnByaW50KGA6IGApO1xuICAgICAgc3VwZXJDdG9yRXhwci52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICAgIGN0b3JTdG10cyA9IGN0b3JTdG10cy5zbGljZSgxKTtcbiAgICB9XG4gICAgY3R4LnByaW50bG4oYCB7YCk7XG4gICAgY3R4LmluY0luZGVudCgpO1xuICAgIHRoaXMudmlzaXRBbGxTdGF0ZW1lbnRzKGN0b3JTdG10cywgY3R4KTtcbiAgICBjdHguZGVjSW5kZW50KCk7XG4gICAgY3R4LnByaW50bG4oYH1gKTtcbiAgfVxuICBwcml2YXRlIF92aXNpdENsYXNzTWV0aG9kKG1ldGhvZDogby5DbGFzc01ldGhvZCwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpIHtcbiAgICBpZiAoaXNQcmVzZW50KG1ldGhvZC50eXBlKSkge1xuICAgICAgbWV0aG9kLnR5cGUudmlzaXRUeXBlKHRoaXMsIGN0eCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN0eC5wcmludChgdm9pZGApO1xuICAgIH1cbiAgICBjdHgucHJpbnQoYCAke21ldGhvZC5uYW1lfShgKTtcbiAgICB0aGlzLl92aXNpdFBhcmFtcyhtZXRob2QucGFyYW1zLCBjdHgpO1xuICAgIGN0eC5wcmludGxuKGApIHtgKTtcbiAgICBjdHguaW5jSW5kZW50KCk7XG4gICAgdGhpcy52aXNpdEFsbFN0YXRlbWVudHMobWV0aG9kLmJvZHksIGN0eCk7XG4gICAgY3R4LmRlY0luZGVudCgpO1xuICAgIGN0eC5wcmludGxuKGB9YCk7XG4gIH1cblxuICB2aXNpdEZ1bmN0aW9uRXhwcihhc3Q6IG8uRnVuY3Rpb25FeHByLCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgY3R4LnByaW50KGAoYCk7XG4gICAgdGhpcy5fdmlzaXRQYXJhbXMoYXN0LnBhcmFtcywgY3R4KTtcbiAgICBjdHgucHJpbnRsbihgKSB7YCk7XG4gICAgY3R4LmluY0luZGVudCgpO1xuICAgIHRoaXMudmlzaXRBbGxTdGF0ZW1lbnRzKGFzdC5zdGF0ZW1lbnRzLCBjdHgpO1xuICAgIGN0eC5kZWNJbmRlbnQoKTtcbiAgICBjdHgucHJpbnQoYH1gKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdERlY2xhcmVGdW5jdGlvblN0bXQoc3RtdDogby5EZWNsYXJlRnVuY3Rpb25TdG10LCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgaWYgKGlzUHJlc2VudChzdG10LnR5cGUpKSB7XG4gICAgICBzdG10LnR5cGUudmlzaXRUeXBlKHRoaXMsIGN0eCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN0eC5wcmludChgdm9pZGApO1xuICAgIH1cbiAgICBjdHgucHJpbnQoYCAke3N0bXQubmFtZX0oYCk7XG4gICAgdGhpcy5fdmlzaXRQYXJhbXMoc3RtdC5wYXJhbXMsIGN0eCk7XG4gICAgY3R4LnByaW50bG4oYCkge2ApO1xuICAgIGN0eC5pbmNJbmRlbnQoKTtcbiAgICB0aGlzLnZpc2l0QWxsU3RhdGVtZW50cyhzdG10LnN0YXRlbWVudHMsIGN0eCk7XG4gICAgY3R4LmRlY0luZGVudCgpO1xuICAgIGN0eC5wcmludGxuKGB9YCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXRCdWlsdGluTWV0aG9kTmFtZShtZXRob2Q6IG8uQnVpbHRpbk1ldGhvZCk6IHN0cmluZyB7XG4gICAgdmFyIG5hbWU7XG4gICAgc3dpdGNoIChtZXRob2QpIHtcbiAgICAgIGNhc2Ugby5CdWlsdGluTWV0aG9kLkNvbmNhdEFycmF5OlxuICAgICAgICBuYW1lID0gJy5hZGRBbGwnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Ugby5CdWlsdGluTWV0aG9kLlN1YnNjcmliZU9ic2VydmFibGU6XG4gICAgICAgIG5hbWUgPSAnbGlzdGVuJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIG8uQnVpbHRpbk1ldGhvZC5iaW5kOlxuICAgICAgICBuYW1lID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgVW5rbm93biBidWlsdGluIG1ldGhvZDogJHttZXRob2R9YCk7XG4gICAgfVxuICAgIHJldHVybiBuYW1lO1xuICB9XG4gIHZpc2l0VHJ5Q2F0Y2hTdG10KHN0bXQ6IG8uVHJ5Q2F0Y2hTdG10LCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgY3R4LnByaW50bG4oYHRyeSB7YCk7XG4gICAgY3R4LmluY0luZGVudCgpO1xuICAgIHRoaXMudmlzaXRBbGxTdGF0ZW1lbnRzKHN0bXQuYm9keVN0bXRzLCBjdHgpO1xuICAgIGN0eC5kZWNJbmRlbnQoKTtcbiAgICBjdHgucHJpbnRsbihgfSBjYXRjaCAoJHtDQVRDSF9FUlJPUl9WQVIubmFtZX0sICR7Q0FUQ0hfU1RBQ0tfVkFSLm5hbWV9KSB7YCk7XG4gICAgY3R4LmluY0luZGVudCgpO1xuICAgIHRoaXMudmlzaXRBbGxTdGF0ZW1lbnRzKHN0bXQuY2F0Y2hTdG10cywgY3R4KTtcbiAgICBjdHguZGVjSW5kZW50KCk7XG4gICAgY3R4LnByaW50bG4oYH1gKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdEJpbmFyeU9wZXJhdG9yRXhwcihhc3Q6IG8uQmluYXJ5T3BlcmF0b3JFeHByLCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgc3dpdGNoIChhc3Qub3BlcmF0b3IpIHtcbiAgICAgIGNhc2Ugby5CaW5hcnlPcGVyYXRvci5JZGVudGljYWw6XG4gICAgICAgIGN0eC5wcmludChgaWRlbnRpY2FsKGApO1xuICAgICAgICBhc3QubGhzLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICAgICAgICBjdHgucHJpbnQoYCwgYCk7XG4gICAgICAgIGFzdC5yaHMudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgICAgIGN0eC5wcmludChgKWApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Ugby5CaW5hcnlPcGVyYXRvci5Ob3RJZGVudGljYWw6XG4gICAgICAgIGN0eC5wcmludChgIWlkZW50aWNhbChgKTtcbiAgICAgICAgYXN0Lmxocy52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICAgICAgY3R4LnByaW50KGAsIGApO1xuICAgICAgICBhc3QucmhzLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICAgICAgICBjdHgucHJpbnQoYClgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBzdXBlci52aXNpdEJpbmFyeU9wZXJhdG9yRXhwcihhc3QsIGN0eCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0TGl0ZXJhbEFycmF5RXhwcihhc3Q6IG8uTGl0ZXJhbEFycmF5RXhwciwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIGlmIChpc0NvbnN0VHlwZShhc3QudHlwZSkpIHtcbiAgICAgIGN0eC5wcmludChgY29uc3QgYCk7XG4gICAgfVxuICAgIHJldHVybiBzdXBlci52aXNpdExpdGVyYWxBcnJheUV4cHIoYXN0LCBjdHgpO1xuICB9XG4gIHZpc2l0TGl0ZXJhbE1hcEV4cHIoYXN0OiBvLkxpdGVyYWxNYXBFeHByLCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgaWYgKGlzQ29uc3RUeXBlKGFzdC50eXBlKSkge1xuICAgICAgY3R4LnByaW50KGBjb25zdCBgKTtcbiAgICB9XG4gICAgaWYgKGlzUHJlc2VudChhc3QudmFsdWVUeXBlKSkge1xuICAgICAgY3R4LnByaW50KGA8U3RyaW5nLCBgKTtcbiAgICAgIGFzdC52YWx1ZVR5cGUudmlzaXRUeXBlKHRoaXMsIGN0eCk7XG4gICAgICBjdHgucHJpbnQoYD5gKTtcbiAgICB9XG4gICAgcmV0dXJuIHN1cGVyLnZpc2l0TGl0ZXJhbE1hcEV4cHIoYXN0LCBjdHgpO1xuICB9XG4gIHZpc2l0SW5zdGFudGlhdGVFeHByKGFzdDogby5JbnN0YW50aWF0ZUV4cHIsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICBjdHgucHJpbnQoaXNDb25zdFR5cGUoYXN0LnR5cGUpID8gYGNvbnN0YCA6IGBuZXdgKTtcbiAgICBjdHgucHJpbnQoJyAnKTtcbiAgICBhc3QuY2xhc3NFeHByLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICAgIGN0eC5wcmludChgKGApO1xuICAgIHRoaXMudmlzaXRBbGxFeHByZXNzaW9ucyhhc3QuYXJncywgY3R4LCBgLGApO1xuICAgIGN0eC5wcmludChgKWApO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0QnVpbHRpbnRUeXBlKHR5cGU6IG8uQnVpbHRpblR5cGUsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICB2YXIgdHlwZVN0cjtcbiAgICBzd2l0Y2ggKHR5cGUubmFtZSkge1xuICAgICAgY2FzZSBvLkJ1aWx0aW5UeXBlTmFtZS5Cb29sOlxuICAgICAgICB0eXBlU3RyID0gJ2Jvb2wnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Ugby5CdWlsdGluVHlwZU5hbWUuRHluYW1pYzpcbiAgICAgICAgdHlwZVN0ciA9ICdkeW5hbWljJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIG8uQnVpbHRpblR5cGVOYW1lLkZ1bmN0aW9uOlxuICAgICAgICB0eXBlU3RyID0gJ0Z1bmN0aW9uJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIG8uQnVpbHRpblR5cGVOYW1lLk51bWJlcjpcbiAgICAgICAgdHlwZVN0ciA9ICdudW0nO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Ugby5CdWlsdGluVHlwZU5hbWUuSW50OlxuICAgICAgICB0eXBlU3RyID0gJ2ludCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBvLkJ1aWx0aW5UeXBlTmFtZS5TdHJpbmc6XG4gICAgICAgIHR5cGVTdHIgPSAnU3RyaW5nJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgVW5zdXBwb3J0ZWQgYnVpbHRpbiB0eXBlICR7dHlwZS5uYW1lfWApO1xuICAgIH1cbiAgICBjdHgucHJpbnQodHlwZVN0cik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXRFeHRlcm5hbFR5cGUoYXN0OiBvLkV4dGVybmFsVHlwZSwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIHRoaXMuX3Zpc2l0SWRlbnRpZmllcihhc3QudmFsdWUsIGFzdC50eXBlUGFyYW1zLCBjdHgpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0QXJyYXlUeXBlKHR5cGU6IG8uQXJyYXlUeXBlLCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgY3R4LnByaW50KGBMaXN0PGApO1xuICAgIGlmIChpc1ByZXNlbnQodHlwZS5vZikpIHtcbiAgICAgIHR5cGUub2YudmlzaXRUeXBlKHRoaXMsIGN0eCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN0eC5wcmludChgZHluYW1pY2ApO1xuICAgIH1cbiAgICBjdHgucHJpbnQoYD5gKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdE1hcFR5cGUodHlwZTogby5NYXBUeXBlLCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgY3R4LnByaW50KGBNYXA8U3RyaW5nLCBgKTtcbiAgICBpZiAoaXNQcmVzZW50KHR5cGUudmFsdWVUeXBlKSkge1xuICAgICAgdHlwZS52YWx1ZVR5cGUudmlzaXRUeXBlKHRoaXMsIGN0eCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN0eC5wcmludChgZHluYW1pY2ApO1xuICAgIH1cbiAgICBjdHgucHJpbnQoYD5gKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgX3Zpc2l0UGFyYW1zKHBhcmFtczogby5GblBhcmFtW10sIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogdm9pZCB7XG4gICAgdGhpcy52aXNpdEFsbE9iamVjdHMoKHBhcmFtKSA9PiB7XG4gICAgICBpZiAoaXNQcmVzZW50KHBhcmFtLnR5cGUpKSB7XG4gICAgICAgIHBhcmFtLnR5cGUudmlzaXRUeXBlKHRoaXMsIGN0eCk7XG4gICAgICAgIGN0eC5wcmludCgnICcpO1xuICAgICAgfVxuICAgICAgY3R4LnByaW50KHBhcmFtLm5hbWUpO1xuICAgIH0sIHBhcmFtcywgY3R4LCAnLCcpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmlzaXRJZGVudGlmaWVyKHZhbHVlOiBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhLCB0eXBlUGFyYW1zOiBvLlR5cGVbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogdm9pZCB7XG4gICAgaWYgKGlzUHJlc2VudCh2YWx1ZS5tb2R1bGVVcmwpICYmIHZhbHVlLm1vZHVsZVVybCAhPSB0aGlzLl9tb2R1bGVVcmwpIHtcbiAgICAgIHZhciBwcmVmaXggPSB0aGlzLmltcG9ydHNXaXRoUHJlZml4ZXMuZ2V0KHZhbHVlLm1vZHVsZVVybCk7XG4gICAgICBpZiAoaXNCbGFuayhwcmVmaXgpKSB7XG4gICAgICAgIHByZWZpeCA9IGBpbXBvcnQke3RoaXMuaW1wb3J0c1dpdGhQcmVmaXhlcy5zaXplfWA7XG4gICAgICAgIHRoaXMuaW1wb3J0c1dpdGhQcmVmaXhlcy5zZXQodmFsdWUubW9kdWxlVXJsLCBwcmVmaXgpO1xuICAgICAgfVxuICAgICAgY3R4LnByaW50KGAke3ByZWZpeH0uYCk7XG4gICAgfVxuICAgIGN0eC5wcmludCh2YWx1ZS5uYW1lKTtcbiAgICBpZiAoaXNQcmVzZW50KHR5cGVQYXJhbXMpICYmIHR5cGVQYXJhbXMubGVuZ3RoID4gMCkge1xuICAgICAgY3R4LnByaW50KGA8YCk7XG4gICAgICB0aGlzLnZpc2l0QWxsT2JqZWN0cygodHlwZSkgPT4gdHlwZS52aXNpdFR5cGUodGhpcywgY3R4KSwgdHlwZVBhcmFtcywgY3R4LCAnLCcpO1xuICAgICAgY3R4LnByaW50KGA+YCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldFN1cGVyQ29uc3RydWN0b3JDYWxsRXhwcihzdG10OiBvLlN0YXRlbWVudCk6IG8uRXhwcmVzc2lvbiB7XG4gIGlmIChzdG10IGluc3RhbmNlb2Ygby5FeHByZXNzaW9uU3RhdGVtZW50KSB7XG4gICAgdmFyIGV4cHIgPSBzdG10LmV4cHI7XG4gICAgaWYgKGV4cHIgaW5zdGFuY2VvZiBvLkludm9rZUZ1bmN0aW9uRXhwcikge1xuICAgICAgdmFyIGZuID0gZXhwci5mbjtcbiAgICAgIGlmIChmbiBpbnN0YW5jZW9mIG8uUmVhZFZhckV4cHIpIHtcbiAgICAgICAgaWYgKGZuLmJ1aWx0aW4gPT09IG8uQnVpbHRpblZhci5TdXBlcikge1xuICAgICAgICAgIHJldHVybiBleHByO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBpc0NvbnN0VHlwZSh0eXBlOiBvLlR5cGUpOiBib29sZWFuIHtcbiAgcmV0dXJuIGlzUHJlc2VudCh0eXBlKSAmJiB0eXBlLmhhc01vZGlmaWVyKG8uVHlwZU1vZGlmaWVyLkNvbnN0KTtcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
