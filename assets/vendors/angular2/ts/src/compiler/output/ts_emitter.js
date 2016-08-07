System.register(['./output_ast', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions', './abstract_emitter', './path_util'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var o, lang_1, exceptions_1, abstract_emitter_1, path_util_1;
    var _debugModuleUrl, TypeScriptEmitter, _TsEmitterVisitor;
    function debugOutputAstAsTypeScript(ast) {
        var converter = new _TsEmitterVisitor(_debugModuleUrl);
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
    exports_1("debugOutputAstAsTypeScript", debugOutputAstAsTypeScript);
    return {
        setters:[
            function (o_1) {
                o = o_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (abstract_emitter_1_1) {
                abstract_emitter_1 = abstract_emitter_1_1;
            },
            function (path_util_1_1) {
                path_util_1 = path_util_1_1;
            }],
        execute: function() {
            _debugModuleUrl = 'asset://debug/lib';
            TypeScriptEmitter = (function () {
                function TypeScriptEmitter() {
                }
                TypeScriptEmitter.prototype.emitStatements = function (moduleUrl, stmts, exportedVars) {
                    var converter = new _TsEmitterVisitor(moduleUrl);
                    var ctx = abstract_emitter_1.EmitterVisitorContext.createRoot(exportedVars);
                    converter.visitAllStatements(stmts, ctx);
                    var srcParts = [];
                    converter.importsWithPrefixes.forEach(function (prefix, importedModuleUrl) {
                        // Note: can't write the real word for import as it screws up system.js auto detection...
                        srcParts.push("imp" +
                            ("ort * as " + prefix + " from '" + path_util_1.getImportModulePath(moduleUrl, importedModuleUrl, path_util_1.ImportEnv.JS) + "';"));
                    });
                    srcParts.push(ctx.toSource());
                    return srcParts.join('\n');
                };
                return TypeScriptEmitter;
            }());
            exports_1("TypeScriptEmitter", TypeScriptEmitter);
            _TsEmitterVisitor = (function (_super) {
                __extends(_TsEmitterVisitor, _super);
                function _TsEmitterVisitor(_moduleUrl) {
                    _super.call(this, false);
                    this._moduleUrl = _moduleUrl;
                    this.importsWithPrefixes = new Map();
                }
                _TsEmitterVisitor.prototype.visitExternalExpr = function (ast, ctx) {
                    this._visitIdentifier(ast.value, ast.typeParams, ctx);
                    return null;
                };
                _TsEmitterVisitor.prototype.visitDeclareVarStmt = function (stmt, ctx) {
                    if (ctx.isExportedVar(stmt.name)) {
                        ctx.print("export ");
                    }
                    if (stmt.hasModifier(o.StmtModifier.Final)) {
                        ctx.print("const");
                    }
                    else {
                        ctx.print("var");
                    }
                    ctx.print(" " + stmt.name);
                    if (lang_1.isPresent(stmt.type)) {
                        ctx.print(":");
                        stmt.type.visitType(this, ctx);
                    }
                    ctx.print(" = ");
                    stmt.value.visitExpression(this, ctx);
                    ctx.println(";");
                    return null;
                };
                _TsEmitterVisitor.prototype.visitCastExpr = function (ast, ctx) {
                    ctx.print("(<");
                    ast.type.visitType(this, ctx);
                    ctx.print(">");
                    ast.value.visitExpression(this, ctx);
                    ctx.print(")");
                    return null;
                };
                _TsEmitterVisitor.prototype.visitDeclareClassStmt = function (stmt, ctx) {
                    var _this = this;
                    ctx.pushClass(stmt);
                    if (ctx.isExportedVar(stmt.name)) {
                        ctx.print("export ");
                    }
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
                _TsEmitterVisitor.prototype._visitClassField = function (field, ctx) {
                    if (field.hasModifier(o.StmtModifier.Private)) {
                        ctx.print("private ");
                    }
                    ctx.print(field.name);
                    if (lang_1.isPresent(field.type)) {
                        ctx.print(":");
                        field.type.visitType(this, ctx);
                    }
                    else {
                        ctx.print(": any");
                    }
                    ctx.println(";");
                };
                _TsEmitterVisitor.prototype._visitClassGetter = function (getter, ctx) {
                    if (getter.hasModifier(o.StmtModifier.Private)) {
                        ctx.print("private ");
                    }
                    ctx.print("get " + getter.name + "()");
                    if (lang_1.isPresent(getter.type)) {
                        ctx.print(":");
                        getter.type.visitType(this, ctx);
                    }
                    ctx.println(" {");
                    ctx.incIndent();
                    this.visitAllStatements(getter.body, ctx);
                    ctx.decIndent();
                    ctx.println("}");
                };
                _TsEmitterVisitor.prototype._visitClassConstructor = function (stmt, ctx) {
                    ctx.print("constructor(");
                    this._visitParams(stmt.constructorMethod.params, ctx);
                    ctx.println(") {");
                    ctx.incIndent();
                    this.visitAllStatements(stmt.constructorMethod.body, ctx);
                    ctx.decIndent();
                    ctx.println("}");
                };
                _TsEmitterVisitor.prototype._visitClassMethod = function (method, ctx) {
                    if (method.hasModifier(o.StmtModifier.Private)) {
                        ctx.print("private ");
                    }
                    ctx.print(method.name + "(");
                    this._visitParams(method.params, ctx);
                    ctx.print("):");
                    if (lang_1.isPresent(method.type)) {
                        method.type.visitType(this, ctx);
                    }
                    else {
                        ctx.print("void");
                    }
                    ctx.println(" {");
                    ctx.incIndent();
                    this.visitAllStatements(method.body, ctx);
                    ctx.decIndent();
                    ctx.println("}");
                };
                _TsEmitterVisitor.prototype.visitFunctionExpr = function (ast, ctx) {
                    ctx.print("(");
                    this._visitParams(ast.params, ctx);
                    ctx.print("):");
                    if (lang_1.isPresent(ast.type)) {
                        ast.type.visitType(this, ctx);
                    }
                    else {
                        ctx.print("void");
                    }
                    ctx.println(" => {");
                    ctx.incIndent();
                    this.visitAllStatements(ast.statements, ctx);
                    ctx.decIndent();
                    ctx.print("}");
                    return null;
                };
                _TsEmitterVisitor.prototype.visitDeclareFunctionStmt = function (stmt, ctx) {
                    if (ctx.isExportedVar(stmt.name)) {
                        ctx.print("export ");
                    }
                    ctx.print("function " + stmt.name + "(");
                    this._visitParams(stmt.params, ctx);
                    ctx.print("):");
                    if (lang_1.isPresent(stmt.type)) {
                        stmt.type.visitType(this, ctx);
                    }
                    else {
                        ctx.print("void");
                    }
                    ctx.println(" {");
                    ctx.incIndent();
                    this.visitAllStatements(stmt.statements, ctx);
                    ctx.decIndent();
                    ctx.println("}");
                    return null;
                };
                _TsEmitterVisitor.prototype.visitTryCatchStmt = function (stmt, ctx) {
                    ctx.println("try {");
                    ctx.incIndent();
                    this.visitAllStatements(stmt.bodyStmts, ctx);
                    ctx.decIndent();
                    ctx.println("} catch (" + abstract_emitter_1.CATCH_ERROR_VAR.name + ") {");
                    ctx.incIndent();
                    var catchStmts = [
                        abstract_emitter_1.CATCH_STACK_VAR.set(abstract_emitter_1.CATCH_ERROR_VAR.prop('stack'))
                            .toDeclStmt(null, [o.StmtModifier.Final])
                    ].concat(stmt.catchStmts);
                    this.visitAllStatements(catchStmts, ctx);
                    ctx.decIndent();
                    ctx.println("}");
                    return null;
                };
                _TsEmitterVisitor.prototype.visitBuiltintType = function (type, ctx) {
                    var typeStr;
                    switch (type.name) {
                        case o.BuiltinTypeName.Bool:
                            typeStr = 'boolean';
                            break;
                        case o.BuiltinTypeName.Dynamic:
                            typeStr = 'any';
                            break;
                        case o.BuiltinTypeName.Function:
                            typeStr = 'Function';
                            break;
                        case o.BuiltinTypeName.Number:
                            typeStr = 'number';
                            break;
                        case o.BuiltinTypeName.Int:
                            typeStr = 'number';
                            break;
                        case o.BuiltinTypeName.String:
                            typeStr = 'string';
                            break;
                        default:
                            throw new exceptions_1.BaseException("Unsupported builtin type " + type.name);
                    }
                    ctx.print(typeStr);
                    return null;
                };
                _TsEmitterVisitor.prototype.visitExternalType = function (ast, ctx) {
                    this._visitIdentifier(ast.value, ast.typeParams, ctx);
                    return null;
                };
                _TsEmitterVisitor.prototype.visitArrayType = function (type, ctx) {
                    if (lang_1.isPresent(type.of)) {
                        type.of.visitType(this, ctx);
                    }
                    else {
                        ctx.print("any");
                    }
                    ctx.print("[]");
                    return null;
                };
                _TsEmitterVisitor.prototype.visitMapType = function (type, ctx) {
                    ctx.print("{[key: string]:");
                    if (lang_1.isPresent(type.valueType)) {
                        type.valueType.visitType(this, ctx);
                    }
                    else {
                        ctx.print("any");
                    }
                    ctx.print("}");
                    return null;
                };
                _TsEmitterVisitor.prototype.getBuiltinMethodName = function (method) {
                    var name;
                    switch (method) {
                        case o.BuiltinMethod.ConcatArray:
                            name = 'concat';
                            break;
                        case o.BuiltinMethod.SubscribeObservable:
                            name = 'subscribe';
                            break;
                        case o.BuiltinMethod.bind:
                            name = 'bind';
                            break;
                        default:
                            throw new exceptions_1.BaseException("Unknown builtin method: " + method);
                    }
                    return name;
                };
                _TsEmitterVisitor.prototype._visitParams = function (params, ctx) {
                    var _this = this;
                    this.visitAllObjects(function (param) {
                        ctx.print(param.name);
                        if (lang_1.isPresent(param.type)) {
                            ctx.print(":");
                            param.type.visitType(_this, ctx);
                        }
                    }, params, ctx, ',');
                };
                _TsEmitterVisitor.prototype._visitIdentifier = function (value, typeParams, ctx) {
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
                return _TsEmitterVisitor;
            }(abstract_emitter_1.AbstractEmitterVisitor));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9vdXRwdXQvdHNfZW1pdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7UUFxQkksZUFBZTtJQUVuQixvQ0FBMkMsR0FDSztRQUM5QyxJQUFJLFNBQVMsR0FBRyxJQUFJLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3ZELElBQUksR0FBRyxHQUFHLHdDQUFxQixDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMvQyxJQUFJLElBQVcsQ0FBQztRQUNoQixFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLElBQUksR0FBVSxHQUFHLENBQUM7UUFDcEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDZixDQUFDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7WUFDZixFQUFFLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLEdBQUcsQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3JDLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxHQUFHLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN0QyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDakMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDaEMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE1BQU0sSUFBSSww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bUJBQW1CLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7d0JBQ3hELENBQUM7d0JBQ0QsR0FBRyxDQUFDLEtBQUssQ0FBSSxNQUFNLE1BQUcsQ0FBQyxDQUFDO29CQUMxQixDQUFDO29CQUNELEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN0QixFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbkQsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDZixJQUFJLENBQUMsZUFBZSxDQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFJLEVBQUUsR0FBRyxDQUFDLEVBQXpCLENBQXlCLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQzt3QkFDaEYsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDakIsQ0FBQztnQkFDSCxDQUFDO2dCQUNILHdCQUFDO1lBQUQsQ0F2UUEsQUF1UUMsQ0F2UStCLHlDQUFzQixHQXVRckQiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL291dHB1dC90c19lbWl0dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbyBmcm9tICcuL291dHB1dF9hc3QnO1xuaW1wb3J0IHtcbiAgaXNQcmVzZW50LFxuICBpc0JsYW5rLFxuICBpc1N0cmluZyxcbiAgZXZhbEV4cHJlc3Npb24sXG4gIFJlZ0V4cFdyYXBwZXIsXG4gIFN0cmluZ1dyYXBwZXIsXG4gIGlzQXJyYXlcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7Q29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YX0gZnJvbSAnLi4vY29tcGlsZV9tZXRhZGF0YSc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge1xuICBPdXRwdXRFbWl0dGVyLFxuICBFbWl0dGVyVmlzaXRvckNvbnRleHQsXG4gIEFic3RyYWN0RW1pdHRlclZpc2l0b3IsXG4gIENBVENIX0VSUk9SX1ZBUixcbiAgQ0FUQ0hfU1RBQ0tfVkFSXG59IGZyb20gJy4vYWJzdHJhY3RfZW1pdHRlcic7XG5pbXBvcnQge2dldEltcG9ydE1vZHVsZVBhdGgsIEltcG9ydEVudn0gZnJvbSAnLi9wYXRoX3V0aWwnO1xuXG52YXIgX2RlYnVnTW9kdWxlVXJsID0gJ2Fzc2V0Oi8vZGVidWcvbGliJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRlYnVnT3V0cHV0QXN0QXNUeXBlU2NyaXB0KGFzdDogby5TdGF0ZW1lbnQgfCBvLkV4cHJlc3Npb24gfCBvLlR5cGUgfFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFueVtdKTogc3RyaW5nIHtcbiAgdmFyIGNvbnZlcnRlciA9IG5ldyBfVHNFbWl0dGVyVmlzaXRvcihfZGVidWdNb2R1bGVVcmwpO1xuICB2YXIgY3R4ID0gRW1pdHRlclZpc2l0b3JDb250ZXh0LmNyZWF0ZVJvb3QoW10pO1xuICB2YXIgYXN0czogYW55W107XG4gIGlmIChpc0FycmF5KGFzdCkpIHtcbiAgICBhc3RzID0gPGFueVtdPmFzdDtcbiAgfSBlbHNlIHtcbiAgICBhc3RzID0gW2FzdF07XG4gIH1cbiAgYXN0cy5mb3JFYWNoKChhc3QpID0+IHtcbiAgICBpZiAoYXN0IGluc3RhbmNlb2Ygby5TdGF0ZW1lbnQpIHtcbiAgICAgIGFzdC52aXNpdFN0YXRlbWVudChjb252ZXJ0ZXIsIGN0eCk7XG4gICAgfSBlbHNlIGlmIChhc3QgaW5zdGFuY2VvZiBvLkV4cHJlc3Npb24pIHtcbiAgICAgIGFzdC52aXNpdEV4cHJlc3Npb24oY29udmVydGVyLCBjdHgpO1xuICAgIH0gZWxzZSBpZiAoYXN0IGluc3RhbmNlb2Ygby5UeXBlKSB7XG4gICAgICBhc3QudmlzaXRUeXBlKGNvbnZlcnRlciwgY3R4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYERvbid0IGtub3cgaG93IHRvIHByaW50IGRlYnVnIGluZm8gZm9yICR7YXN0fWApO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBjdHgudG9Tb3VyY2UoKTtcbn1cblxuZXhwb3J0IGNsYXNzIFR5cGVTY3JpcHRFbWl0dGVyIGltcGxlbWVudHMgT3V0cHV0RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgZW1pdFN0YXRlbWVudHMobW9kdWxlVXJsOiBzdHJpbmcsIHN0bXRzOiBvLlN0YXRlbWVudFtdLCBleHBvcnRlZFZhcnM6IHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgICB2YXIgY29udmVydGVyID0gbmV3IF9Uc0VtaXR0ZXJWaXNpdG9yKG1vZHVsZVVybCk7XG4gICAgdmFyIGN0eCA9IEVtaXR0ZXJWaXNpdG9yQ29udGV4dC5jcmVhdGVSb290KGV4cG9ydGVkVmFycyk7XG4gICAgY29udmVydGVyLnZpc2l0QWxsU3RhdGVtZW50cyhzdG10cywgY3R4KTtcbiAgICB2YXIgc3JjUGFydHMgPSBbXTtcbiAgICBjb252ZXJ0ZXIuaW1wb3J0c1dpdGhQcmVmaXhlcy5mb3JFYWNoKChwcmVmaXgsIGltcG9ydGVkTW9kdWxlVXJsKSA9PiB7XG4gICAgICAvLyBOb3RlOiBjYW4ndCB3cml0ZSB0aGUgcmVhbCB3b3JkIGZvciBpbXBvcnQgYXMgaXQgc2NyZXdzIHVwIHN5c3RlbS5qcyBhdXRvIGRldGVjdGlvbi4uLlxuICAgICAgc3JjUGFydHMucHVzaChcbiAgICAgICAgICBgaW1wYCArXG4gICAgICAgICAgYG9ydCAqIGFzICR7cHJlZml4fSBmcm9tICcke2dldEltcG9ydE1vZHVsZVBhdGgobW9kdWxlVXJsLCBpbXBvcnRlZE1vZHVsZVVybCwgSW1wb3J0RW52LkpTKX0nO2ApO1xuICAgIH0pO1xuICAgIHNyY1BhcnRzLnB1c2goY3R4LnRvU291cmNlKCkpO1xuICAgIHJldHVybiBzcmNQYXJ0cy5qb2luKCdcXG4nKTtcbiAgfVxufVxuXG5jbGFzcyBfVHNFbWl0dGVyVmlzaXRvciBleHRlbmRzIEFic3RyYWN0RW1pdHRlclZpc2l0b3IgaW1wbGVtZW50cyBvLlR5cGVWaXNpdG9yIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbW9kdWxlVXJsOiBzdHJpbmcpIHsgc3VwZXIoZmFsc2UpOyB9XG5cbiAgaW1wb3J0c1dpdGhQcmVmaXhlcyA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG5cbiAgdmlzaXRFeHRlcm5hbEV4cHIoYXN0OiBvLkV4dGVybmFsRXhwciwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIHRoaXMuX3Zpc2l0SWRlbnRpZmllcihhc3QudmFsdWUsIGFzdC50eXBlUGFyYW1zLCBjdHgpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0RGVjbGFyZVZhclN0bXQoc3RtdDogby5EZWNsYXJlVmFyU3RtdCwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIGlmIChjdHguaXNFeHBvcnRlZFZhcihzdG10Lm5hbWUpKSB7XG4gICAgICBjdHgucHJpbnQoYGV4cG9ydCBgKTtcbiAgICB9XG4gICAgaWYgKHN0bXQuaGFzTW9kaWZpZXIoby5TdG10TW9kaWZpZXIuRmluYWwpKSB7XG4gICAgICBjdHgucHJpbnQoYGNvbnN0YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN0eC5wcmludChgdmFyYCk7XG4gICAgfVxuICAgIGN0eC5wcmludChgICR7c3RtdC5uYW1lfWApO1xuICAgIGlmIChpc1ByZXNlbnQoc3RtdC50eXBlKSkge1xuICAgICAgY3R4LnByaW50KGA6YCk7XG4gICAgICBzdG10LnR5cGUudmlzaXRUeXBlKHRoaXMsIGN0eCk7XG4gICAgfVxuICAgIGN0eC5wcmludChgID0gYCk7XG4gICAgc3RtdC52YWx1ZS52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICBjdHgucHJpbnRsbihgO2ApO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0Q2FzdEV4cHIoYXN0OiBvLkNhc3RFeHByLCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgY3R4LnByaW50KGAoPGApO1xuICAgIGFzdC50eXBlLnZpc2l0VHlwZSh0aGlzLCBjdHgpO1xuICAgIGN0eC5wcmludChgPmApO1xuICAgIGFzdC52YWx1ZS52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICBjdHgucHJpbnQoYClgKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdERlY2xhcmVDbGFzc1N0bXQoc3RtdDogby5DbGFzc1N0bXQsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICBjdHgucHVzaENsYXNzKHN0bXQpO1xuICAgIGlmIChjdHguaXNFeHBvcnRlZFZhcihzdG10Lm5hbWUpKSB7XG4gICAgICBjdHgucHJpbnQoYGV4cG9ydCBgKTtcbiAgICB9XG4gICAgY3R4LnByaW50KGBjbGFzcyAke3N0bXQubmFtZX1gKTtcbiAgICBpZiAoaXNQcmVzZW50KHN0bXQucGFyZW50KSkge1xuICAgICAgY3R4LnByaW50KGAgZXh0ZW5kcyBgKTtcbiAgICAgIHN0bXQucGFyZW50LnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICAgIH1cbiAgICBjdHgucHJpbnRsbihgIHtgKTtcbiAgICBjdHguaW5jSW5kZW50KCk7XG4gICAgc3RtdC5maWVsZHMuZm9yRWFjaCgoZmllbGQpID0+IHRoaXMuX3Zpc2l0Q2xhc3NGaWVsZChmaWVsZCwgY3R4KSk7XG4gICAgaWYgKGlzUHJlc2VudChzdG10LmNvbnN0cnVjdG9yTWV0aG9kKSkge1xuICAgICAgdGhpcy5fdmlzaXRDbGFzc0NvbnN0cnVjdG9yKHN0bXQsIGN0eCk7XG4gICAgfVxuICAgIHN0bXQuZ2V0dGVycy5mb3JFYWNoKChnZXR0ZXIpID0+IHRoaXMuX3Zpc2l0Q2xhc3NHZXR0ZXIoZ2V0dGVyLCBjdHgpKTtcbiAgICBzdG10Lm1ldGhvZHMuZm9yRWFjaCgobWV0aG9kKSA9PiB0aGlzLl92aXNpdENsYXNzTWV0aG9kKG1ldGhvZCwgY3R4KSk7XG4gICAgY3R4LmRlY0luZGVudCgpO1xuICAgIGN0eC5wcmludGxuKGB9YCk7XG4gICAgY3R4LnBvcENsYXNzKCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcHJpdmF0ZSBfdmlzaXRDbGFzc0ZpZWxkKGZpZWxkOiBvLkNsYXNzRmllbGQsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KSB7XG4gICAgaWYgKGZpZWxkLmhhc01vZGlmaWVyKG8uU3RtdE1vZGlmaWVyLlByaXZhdGUpKSB7XG4gICAgICBjdHgucHJpbnQoYHByaXZhdGUgYCk7XG4gICAgfVxuICAgIGN0eC5wcmludChmaWVsZC5uYW1lKTtcbiAgICBpZiAoaXNQcmVzZW50KGZpZWxkLnR5cGUpKSB7XG4gICAgICBjdHgucHJpbnQoYDpgKTtcbiAgICAgIGZpZWxkLnR5cGUudmlzaXRUeXBlKHRoaXMsIGN0eCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN0eC5wcmludChgOiBhbnlgKTtcbiAgICB9XG4gICAgY3R4LnByaW50bG4oYDtgKTtcbiAgfVxuICBwcml2YXRlIF92aXNpdENsYXNzR2V0dGVyKGdldHRlcjogby5DbGFzc0dldHRlciwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpIHtcbiAgICBpZiAoZ2V0dGVyLmhhc01vZGlmaWVyKG8uU3RtdE1vZGlmaWVyLlByaXZhdGUpKSB7XG4gICAgICBjdHgucHJpbnQoYHByaXZhdGUgYCk7XG4gICAgfVxuICAgIGN0eC5wcmludChgZ2V0ICR7Z2V0dGVyLm5hbWV9KClgKTtcbiAgICBpZiAoaXNQcmVzZW50KGdldHRlci50eXBlKSkge1xuICAgICAgY3R4LnByaW50KGA6YCk7XG4gICAgICBnZXR0ZXIudHlwZS52aXNpdFR5cGUodGhpcywgY3R4KTtcbiAgICB9XG4gICAgY3R4LnByaW50bG4oYCB7YCk7XG4gICAgY3R4LmluY0luZGVudCgpO1xuICAgIHRoaXMudmlzaXRBbGxTdGF0ZW1lbnRzKGdldHRlci5ib2R5LCBjdHgpO1xuICAgIGN0eC5kZWNJbmRlbnQoKTtcbiAgICBjdHgucHJpbnRsbihgfWApO1xuICB9XG4gIHByaXZhdGUgX3Zpc2l0Q2xhc3NDb25zdHJ1Y3RvcihzdG10OiBvLkNsYXNzU3RtdCwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpIHtcbiAgICBjdHgucHJpbnQoYGNvbnN0cnVjdG9yKGApO1xuICAgIHRoaXMuX3Zpc2l0UGFyYW1zKHN0bXQuY29uc3RydWN0b3JNZXRob2QucGFyYW1zLCBjdHgpO1xuICAgIGN0eC5wcmludGxuKGApIHtgKTtcbiAgICBjdHguaW5jSW5kZW50KCk7XG4gICAgdGhpcy52aXNpdEFsbFN0YXRlbWVudHMoc3RtdC5jb25zdHJ1Y3Rvck1ldGhvZC5ib2R5LCBjdHgpO1xuICAgIGN0eC5kZWNJbmRlbnQoKTtcbiAgICBjdHgucHJpbnRsbihgfWApO1xuICB9XG4gIHByaXZhdGUgX3Zpc2l0Q2xhc3NNZXRob2QobWV0aG9kOiBvLkNsYXNzTWV0aG9kLCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCkge1xuICAgIGlmIChtZXRob2QuaGFzTW9kaWZpZXIoby5TdG10TW9kaWZpZXIuUHJpdmF0ZSkpIHtcbiAgICAgIGN0eC5wcmludChgcHJpdmF0ZSBgKTtcbiAgICB9XG4gICAgY3R4LnByaW50KGAke21ldGhvZC5uYW1lfShgKTtcbiAgICB0aGlzLl92aXNpdFBhcmFtcyhtZXRob2QucGFyYW1zLCBjdHgpO1xuICAgIGN0eC5wcmludChgKTpgKTtcbiAgICBpZiAoaXNQcmVzZW50KG1ldGhvZC50eXBlKSkge1xuICAgICAgbWV0aG9kLnR5cGUudmlzaXRUeXBlKHRoaXMsIGN0eCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN0eC5wcmludChgdm9pZGApO1xuICAgIH1cbiAgICBjdHgucHJpbnRsbihgIHtgKTtcbiAgICBjdHguaW5jSW5kZW50KCk7XG4gICAgdGhpcy52aXNpdEFsbFN0YXRlbWVudHMobWV0aG9kLmJvZHksIGN0eCk7XG4gICAgY3R4LmRlY0luZGVudCgpO1xuICAgIGN0eC5wcmludGxuKGB9YCk7XG4gIH1cbiAgdmlzaXRGdW5jdGlvbkV4cHIoYXN0OiBvLkZ1bmN0aW9uRXhwciwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIGN0eC5wcmludChgKGApO1xuICAgIHRoaXMuX3Zpc2l0UGFyYW1zKGFzdC5wYXJhbXMsIGN0eCk7XG4gICAgY3R4LnByaW50KGApOmApO1xuICAgIGlmIChpc1ByZXNlbnQoYXN0LnR5cGUpKSB7XG4gICAgICBhc3QudHlwZS52aXNpdFR5cGUodGhpcywgY3R4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3R4LnByaW50KGB2b2lkYCk7XG4gICAgfVxuICAgIGN0eC5wcmludGxuKGAgPT4ge2ApO1xuICAgIGN0eC5pbmNJbmRlbnQoKTtcbiAgICB0aGlzLnZpc2l0QWxsU3RhdGVtZW50cyhhc3Quc3RhdGVtZW50cywgY3R4KTtcbiAgICBjdHguZGVjSW5kZW50KCk7XG4gICAgY3R4LnByaW50KGB9YCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXREZWNsYXJlRnVuY3Rpb25TdG10KHN0bXQ6IG8uRGVjbGFyZUZ1bmN0aW9uU3RtdCwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIGlmIChjdHguaXNFeHBvcnRlZFZhcihzdG10Lm5hbWUpKSB7XG4gICAgICBjdHgucHJpbnQoYGV4cG9ydCBgKTtcbiAgICB9XG4gICAgY3R4LnByaW50KGBmdW5jdGlvbiAke3N0bXQubmFtZX0oYCk7XG4gICAgdGhpcy5fdmlzaXRQYXJhbXMoc3RtdC5wYXJhbXMsIGN0eCk7XG4gICAgY3R4LnByaW50KGApOmApO1xuICAgIGlmIChpc1ByZXNlbnQoc3RtdC50eXBlKSkge1xuICAgICAgc3RtdC50eXBlLnZpc2l0VHlwZSh0aGlzLCBjdHgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdHgucHJpbnQoYHZvaWRgKTtcbiAgICB9XG4gICAgY3R4LnByaW50bG4oYCB7YCk7XG4gICAgY3R4LmluY0luZGVudCgpO1xuICAgIHRoaXMudmlzaXRBbGxTdGF0ZW1lbnRzKHN0bXQuc3RhdGVtZW50cywgY3R4KTtcbiAgICBjdHguZGVjSW5kZW50KCk7XG4gICAgY3R4LnByaW50bG4oYH1gKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdFRyeUNhdGNoU3RtdChzdG10OiBvLlRyeUNhdGNoU3RtdCwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIGN0eC5wcmludGxuKGB0cnkge2ApO1xuICAgIGN0eC5pbmNJbmRlbnQoKTtcbiAgICB0aGlzLnZpc2l0QWxsU3RhdGVtZW50cyhzdG10LmJvZHlTdG10cywgY3R4KTtcbiAgICBjdHguZGVjSW5kZW50KCk7XG4gICAgY3R4LnByaW50bG4oYH0gY2F0Y2ggKCR7Q0FUQ0hfRVJST1JfVkFSLm5hbWV9KSB7YCk7XG4gICAgY3R4LmluY0luZGVudCgpO1xuICAgIHZhciBjYXRjaFN0bXRzID0gW1xuICAgICAgPG8uU3RhdGVtZW50PkNBVENIX1NUQUNLX1ZBUi5zZXQoQ0FUQ0hfRVJST1JfVkFSLnByb3AoJ3N0YWNrJykpXG4gICAgICAgICAgLnRvRGVjbFN0bXQobnVsbCwgW28uU3RtdE1vZGlmaWVyLkZpbmFsXSlcbiAgICBdLmNvbmNhdChzdG10LmNhdGNoU3RtdHMpO1xuICAgIHRoaXMudmlzaXRBbGxTdGF0ZW1lbnRzKGNhdGNoU3RtdHMsIGN0eCk7XG4gICAgY3R4LmRlY0luZGVudCgpO1xuICAgIGN0eC5wcmludGxuKGB9YCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2aXNpdEJ1aWx0aW50VHlwZSh0eXBlOiBvLkJ1aWx0aW5UeXBlLCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgdmFyIHR5cGVTdHI7XG4gICAgc3dpdGNoICh0eXBlLm5hbWUpIHtcbiAgICAgIGNhc2Ugby5CdWlsdGluVHlwZU5hbWUuQm9vbDpcbiAgICAgICAgdHlwZVN0ciA9ICdib29sZWFuJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIG8uQnVpbHRpblR5cGVOYW1lLkR5bmFtaWM6XG4gICAgICAgIHR5cGVTdHIgPSAnYW55JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIG8uQnVpbHRpblR5cGVOYW1lLkZ1bmN0aW9uOlxuICAgICAgICB0eXBlU3RyID0gJ0Z1bmN0aW9uJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIG8uQnVpbHRpblR5cGVOYW1lLk51bWJlcjpcbiAgICAgICAgdHlwZVN0ciA9ICdudW1iZXInO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Ugby5CdWlsdGluVHlwZU5hbWUuSW50OlxuICAgICAgICB0eXBlU3RyID0gJ251bWJlcic7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBvLkJ1aWx0aW5UeXBlTmFtZS5TdHJpbmc6XG4gICAgICAgIHR5cGVTdHIgPSAnc3RyaW5nJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgVW5zdXBwb3J0ZWQgYnVpbHRpbiB0eXBlICR7dHlwZS5uYW1lfWApO1xuICAgIH1cbiAgICBjdHgucHJpbnQodHlwZVN0cik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXRFeHRlcm5hbFR5cGUoYXN0OiBvLkV4dGVybmFsVHlwZSwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIHRoaXMuX3Zpc2l0SWRlbnRpZmllcihhc3QudmFsdWUsIGFzdC50eXBlUGFyYW1zLCBjdHgpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0QXJyYXlUeXBlKHR5cGU6IG8uQXJyYXlUeXBlLCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgaWYgKGlzUHJlc2VudCh0eXBlLm9mKSkge1xuICAgICAgdHlwZS5vZi52aXNpdFR5cGUodGhpcywgY3R4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3R4LnByaW50KGBhbnlgKTtcbiAgICB9XG4gICAgY3R4LnByaW50KGBbXWApO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0TWFwVHlwZSh0eXBlOiBvLk1hcFR5cGUsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICBjdHgucHJpbnQoYHtba2V5OiBzdHJpbmddOmApO1xuICAgIGlmIChpc1ByZXNlbnQodHlwZS52YWx1ZVR5cGUpKSB7XG4gICAgICB0eXBlLnZhbHVlVHlwZS52aXNpdFR5cGUodGhpcywgY3R4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3R4LnByaW50KGBhbnlgKTtcbiAgICB9XG4gICAgY3R4LnByaW50KGB9YCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXRCdWlsdGluTWV0aG9kTmFtZShtZXRob2Q6IG8uQnVpbHRpbk1ldGhvZCk6IHN0cmluZyB7XG4gICAgdmFyIG5hbWU7XG4gICAgc3dpdGNoIChtZXRob2QpIHtcbiAgICAgIGNhc2Ugby5CdWlsdGluTWV0aG9kLkNvbmNhdEFycmF5OlxuICAgICAgICBuYW1lID0gJ2NvbmNhdCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBvLkJ1aWx0aW5NZXRob2QuU3Vic2NyaWJlT2JzZXJ2YWJsZTpcbiAgICAgICAgbmFtZSA9ICdzdWJzY3JpYmUnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Ugby5CdWlsdGluTWV0aG9kLmJpbmQ6XG4gICAgICAgIG5hbWUgPSAnYmluZCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYFVua25vd24gYnVpbHRpbiBtZXRob2Q6ICR7bWV0aG9kfWApO1xuICAgIH1cbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBfdmlzaXRQYXJhbXMocGFyYW1zOiBvLkZuUGFyYW1bXSwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiB2b2lkIHtcbiAgICB0aGlzLnZpc2l0QWxsT2JqZWN0cygocGFyYW0pID0+IHtcbiAgICAgIGN0eC5wcmludChwYXJhbS5uYW1lKTtcbiAgICAgIGlmIChpc1ByZXNlbnQocGFyYW0udHlwZSkpIHtcbiAgICAgICAgY3R4LnByaW50KGA6YCk7XG4gICAgICAgIHBhcmFtLnR5cGUudmlzaXRUeXBlKHRoaXMsIGN0eCk7XG4gICAgICB9XG4gICAgfSwgcGFyYW1zLCBjdHgsICcsJyk7XG4gIH1cblxuICBwcml2YXRlIF92aXNpdElkZW50aWZpZXIodmFsdWU6IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEsIHR5cGVQYXJhbXM6IG8uVHlwZVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiB2b2lkIHtcbiAgICBpZiAoaXNQcmVzZW50KHZhbHVlLm1vZHVsZVVybCkgJiYgdmFsdWUubW9kdWxlVXJsICE9IHRoaXMuX21vZHVsZVVybCkge1xuICAgICAgdmFyIHByZWZpeCA9IHRoaXMuaW1wb3J0c1dpdGhQcmVmaXhlcy5nZXQodmFsdWUubW9kdWxlVXJsKTtcbiAgICAgIGlmIChpc0JsYW5rKHByZWZpeCkpIHtcbiAgICAgICAgcHJlZml4ID0gYGltcG9ydCR7dGhpcy5pbXBvcnRzV2l0aFByZWZpeGVzLnNpemV9YDtcbiAgICAgICAgdGhpcy5pbXBvcnRzV2l0aFByZWZpeGVzLnNldCh2YWx1ZS5tb2R1bGVVcmwsIHByZWZpeCk7XG4gICAgICB9XG4gICAgICBjdHgucHJpbnQoYCR7cHJlZml4fS5gKTtcbiAgICB9XG4gICAgY3R4LnByaW50KHZhbHVlLm5hbWUpO1xuICAgIGlmIChpc1ByZXNlbnQodHlwZVBhcmFtcykgJiYgdHlwZVBhcmFtcy5sZW5ndGggPiAwKSB7XG4gICAgICBjdHgucHJpbnQoYDxgKTtcbiAgICAgIHRoaXMudmlzaXRBbGxPYmplY3RzKCh0eXBlKSA9PiB0eXBlLnZpc2l0VHlwZSh0aGlzLCBjdHgpLCB0eXBlUGFyYW1zLCBjdHgsICcsJyk7XG4gICAgICBjdHgucHJpbnQoYD5gKTtcbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
