System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', './output_ast', './abstract_emitter'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lang_1, exceptions_1, o, abstract_emitter_1;
    var AbstractJsEmitterVisitor;
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
            }],
        execute: function() {
            AbstractJsEmitterVisitor = (function (_super) {
                __extends(AbstractJsEmitterVisitor, _super);
                function AbstractJsEmitterVisitor() {
                    _super.call(this, false);
                }
                AbstractJsEmitterVisitor.prototype.visitDeclareClassStmt = function (stmt, ctx) {
                    var _this = this;
                    ctx.pushClass(stmt);
                    this._visitClassConstructor(stmt, ctx);
                    if (lang_1.isPresent(stmt.parent)) {
                        ctx.print(stmt.name + ".prototype = Object.create(");
                        stmt.parent.visitExpression(this, ctx);
                        ctx.println(".prototype);");
                    }
                    stmt.getters.forEach(function (getter) { return _this._visitClassGetter(stmt, getter, ctx); });
                    stmt.methods.forEach(function (method) { return _this._visitClassMethod(stmt, method, ctx); });
                    ctx.popClass();
                    return null;
                };
                AbstractJsEmitterVisitor.prototype._visitClassConstructor = function (stmt, ctx) {
                    ctx.print("function " + stmt.name + "(");
                    if (lang_1.isPresent(stmt.constructorMethod)) {
                        this._visitParams(stmt.constructorMethod.params, ctx);
                    }
                    ctx.println(") {");
                    ctx.incIndent();
                    if (lang_1.isPresent(stmt.constructorMethod)) {
                        if (stmt.constructorMethod.body.length > 0) {
                            ctx.println("var self = this;");
                            this.visitAllStatements(stmt.constructorMethod.body, ctx);
                        }
                    }
                    ctx.decIndent();
                    ctx.println("}");
                };
                AbstractJsEmitterVisitor.prototype._visitClassGetter = function (stmt, getter, ctx) {
                    ctx.println("Object.defineProperty(" + stmt.name + ".prototype, '" + getter.name + "', { get: function() {");
                    ctx.incIndent();
                    if (getter.body.length > 0) {
                        ctx.println("var self = this;");
                        this.visitAllStatements(getter.body, ctx);
                    }
                    ctx.decIndent();
                    ctx.println("}});");
                };
                AbstractJsEmitterVisitor.prototype._visitClassMethod = function (stmt, method, ctx) {
                    ctx.print(stmt.name + ".prototype." + method.name + " = function(");
                    this._visitParams(method.params, ctx);
                    ctx.println(") {");
                    ctx.incIndent();
                    if (method.body.length > 0) {
                        ctx.println("var self = this;");
                        this.visitAllStatements(method.body, ctx);
                    }
                    ctx.decIndent();
                    ctx.println("};");
                };
                AbstractJsEmitterVisitor.prototype.visitReadVarExpr = function (ast, ctx) {
                    if (ast.builtin === o.BuiltinVar.This) {
                        ctx.print('self');
                    }
                    else if (ast.builtin === o.BuiltinVar.Super) {
                        throw new exceptions_1.BaseException("'super' needs to be handled at a parent ast node, not at the variable level!");
                    }
                    else {
                        _super.prototype.visitReadVarExpr.call(this, ast, ctx);
                    }
                    return null;
                };
                AbstractJsEmitterVisitor.prototype.visitDeclareVarStmt = function (stmt, ctx) {
                    ctx.print("var " + stmt.name + " = ");
                    stmt.value.visitExpression(this, ctx);
                    ctx.println(";");
                    return null;
                };
                AbstractJsEmitterVisitor.prototype.visitCastExpr = function (ast, ctx) {
                    ast.value.visitExpression(this, ctx);
                    return null;
                };
                AbstractJsEmitterVisitor.prototype.visitInvokeFunctionExpr = function (expr, ctx) {
                    var fnExpr = expr.fn;
                    if (fnExpr instanceof o.ReadVarExpr && fnExpr.builtin === o.BuiltinVar.Super) {
                        ctx.currentClass.parent.visitExpression(this, ctx);
                        ctx.print(".call(this");
                        if (expr.args.length > 0) {
                            ctx.print(", ");
                            this.visitAllExpressions(expr.args, ctx, ',');
                        }
                        ctx.print(")");
                    }
                    else {
                        _super.prototype.visitInvokeFunctionExpr.call(this, expr, ctx);
                    }
                    return null;
                };
                AbstractJsEmitterVisitor.prototype.visitFunctionExpr = function (ast, ctx) {
                    ctx.print("function(");
                    this._visitParams(ast.params, ctx);
                    ctx.println(") {");
                    ctx.incIndent();
                    this.visitAllStatements(ast.statements, ctx);
                    ctx.decIndent();
                    ctx.print("}");
                    return null;
                };
                AbstractJsEmitterVisitor.prototype.visitDeclareFunctionStmt = function (stmt, ctx) {
                    ctx.print("function " + stmt.name + "(");
                    this._visitParams(stmt.params, ctx);
                    ctx.println(") {");
                    ctx.incIndent();
                    this.visitAllStatements(stmt.statements, ctx);
                    ctx.decIndent();
                    ctx.println("}");
                    return null;
                };
                AbstractJsEmitterVisitor.prototype.visitTryCatchStmt = function (stmt, ctx) {
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
                AbstractJsEmitterVisitor.prototype._visitParams = function (params, ctx) {
                    this.visitAllObjects(function (param) { return ctx.print(param.name); }, params, ctx, ',');
                };
                AbstractJsEmitterVisitor.prototype.getBuiltinMethodName = function (method) {
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
                return AbstractJsEmitterVisitor;
            }(abstract_emitter_1.AbstractEmitterVisitor));
            exports_1("AbstractJsEmitterVisitor", AbstractJsEmitterVisitor);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9vdXRwdXQvYWJzdHJhY3RfanNfZW1pdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBVUE7Z0JBQXVELDRDQUFzQjtnQkFDM0U7b0JBQWdCLGtCQUFNLEtBQUssQ0FBQyxDQUFDO2dCQUFDLENBQUM7Z0JBQy9CLHdEQUFxQixHQUFyQixVQUFzQixJQUFpQixFQUFFLEdBQTBCO29CQUFuRSxpQkFhQztvQkFaQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNwQixJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUV2QyxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzNCLEdBQUcsQ0FBQyxLQUFLLENBQUksSUFBSSxDQUFDLElBQUksZ0NBQTZCLENBQUMsQ0FBQzt3QkFDckQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUN2QyxHQUFHLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUM5QixDQUFDO29CQUNELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBTSxJQUFLLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQXpDLENBQXlDLENBQUMsQ0FBQztvQkFDNUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNLElBQUssT0FBQSxLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBekMsQ0FBeUMsQ0FBQyxDQUFDO29CQUM1RSxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDZCxDQUFDO2dCQUVPLHlEQUFzQixHQUE5QixVQUErQixJQUFpQixFQUFFLEdBQTBCO29CQUMxRSxHQUFHLENBQUMsS0FBSyxDQUFDLGNBQVksSUFBSSxDQUFDLElBQUksTUFBRyxDQUFDLENBQUM7b0JBQ3BDLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ3hELENBQUM7b0JBQ0QsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDbkIsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUNoQixFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDM0MsR0FBRyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOzRCQUNoQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQzt3QkFDNUQsQ0FBQztvQkFDSCxDQUFDO29CQUNELEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDaEIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbkIsQ0FBQztnQkFFTyxvREFBaUIsR0FBekIsVUFBMEIsSUFBaUIsRUFBRSxNQUFxQixFQUFFLEdBQTBCO29CQUM1RixHQUFHLENBQUMsT0FBTyxDQUNQLDJCQUF5QixJQUFJLENBQUMsSUFBSSxxQkFBZ0IsTUFBTSxDQUFDLElBQUksMkJBQXdCLENBQUMsQ0FBQztvQkFDM0YsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUNoQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMzQixHQUFHLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7d0JBQ2hDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUM1QyxDQUFDO29CQUNELEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDaEIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQztnQkFFTyxvREFBaUIsR0FBekIsVUFBMEIsSUFBaUIsRUFBRSxNQUFxQixFQUFFLEdBQTBCO29CQUM1RixHQUFHLENBQUMsS0FBSyxDQUFJLElBQUksQ0FBQyxJQUFJLG1CQUFjLE1BQU0sQ0FBQyxJQUFJLGlCQUFjLENBQUMsQ0FBQztvQkFDL0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN0QyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNuQixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBQ2hCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzNCLEdBQUcsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQzt3QkFDaEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQzVDLENBQUM7b0JBQ0QsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUNoQixHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwQixDQUFDO2dCQUVELG1EQUFnQixHQUFoQixVQUFpQixHQUFrQixFQUFFLEdBQTBCO29CQUM3RCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDdEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDcEIsQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQzlDLE1BQU0sSUFBSSwwQkFBYSxDQUNuQiw4RUFBOEUsQ0FBQyxDQUFDO29CQUN0RixDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLGdCQUFLLENBQUMsZ0JBQWdCLFlBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUNuQyxDQUFDO29CQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQztnQkFDRCxzREFBbUIsR0FBbkIsVUFBb0IsSUFBc0IsRUFBRSxHQUEwQjtvQkFDcEUsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFPLElBQUksQ0FBQyxJQUFJLFFBQUssQ0FBQyxDQUFDO29CQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ3RDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQztnQkFDRCxnREFBYSxHQUFiLFVBQWMsR0FBZSxFQUFFLEdBQTBCO29CQUN2RCxHQUFHLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQztnQkFDRCwwREFBdUIsR0FBdkIsVUFBd0IsSUFBMEIsRUFBRSxHQUEwQjtvQkFDNUUsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztvQkFDckIsRUFBRSxDQUFDLENBQUMsTUFBTSxZQUFZLENBQUMsQ0FBQyxXQUFXLElBQUksTUFBTSxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQzdFLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBQ25ELEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7d0JBQ3hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3pCLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ2hCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQzt3QkFDaEQsQ0FBQzt3QkFDRCxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNqQixDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLGdCQUFLLENBQUMsdUJBQXVCLFlBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUMzQyxDQUFDO29CQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQztnQkFDRCxvREFBaUIsR0FBakIsVUFBa0IsR0FBbUIsRUFBRSxHQUEwQjtvQkFDL0QsR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUNuQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNuQixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUM3QyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBQ2hCLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDZCxDQUFDO2dCQUNELDJEQUF3QixHQUF4QixVQUF5QixJQUEyQixFQUFFLEdBQTBCO29CQUM5RSxHQUFHLENBQUMsS0FBSyxDQUFDLGNBQVksSUFBSSxDQUFDLElBQUksTUFBRyxDQUFDLENBQUM7b0JBQ3BDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDcEMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDbkIsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUNoQixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDOUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUNoQixHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNkLENBQUM7Z0JBQ0Qsb0RBQWlCLEdBQWpCLFVBQWtCLElBQW9CLEVBQUUsR0FBMEI7b0JBQ2hFLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3JCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQzdDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDaEIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFZLGtDQUFlLENBQUMsSUFBSSxRQUFLLENBQUMsQ0FBQztvQkFDbkQsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUNoQixJQUFJLFVBQVUsR0FBRzt3QkFDRixrQ0FBZSxDQUFDLEdBQUcsQ0FBQyxrQ0FBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs2QkFDMUQsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQzlDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDMUIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDekMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUNoQixHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNkLENBQUM7Z0JBRU8sK0NBQVksR0FBcEIsVUFBcUIsTUFBbUIsRUFBRSxHQUEwQjtvQkFDbEUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFDLEtBQUssSUFBSyxPQUFBLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFyQixDQUFxQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQzNFLENBQUM7Z0JBRUQsdURBQW9CLEdBQXBCLFVBQXFCLE1BQXVCO29CQUMxQyxJQUFJLElBQUksQ0FBQztvQkFDVCxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUNmLEtBQUssQ0FBQyxDQUFDLGFBQWEsQ0FBQyxXQUFXOzRCQUM5QixJQUFJLEdBQUcsUUFBUSxDQUFDOzRCQUNoQixLQUFLLENBQUM7d0JBQ1IsS0FBSyxDQUFDLENBQUMsYUFBYSxDQUFDLG1CQUFtQjs0QkFDdEMsSUFBSSxHQUFHLFdBQVcsQ0FBQzs0QkFDbkIsS0FBSyxDQUFDO3dCQUNSLEtBQUssQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJOzRCQUN2QixJQUFJLEdBQUcsTUFBTSxDQUFDOzRCQUNkLEtBQUssQ0FBQzt3QkFDUjs0QkFDRSxNQUFNLElBQUksMEJBQWEsQ0FBQyw2QkFBMkIsTUFBUSxDQUFDLENBQUM7b0JBQ2pFLENBQUM7b0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDZCxDQUFDO2dCQUNILCtCQUFDO1lBQUQsQ0F6SkEsQUF5SkMsQ0F6SnNELHlDQUFzQixHQXlKNUU7WUF6SkQsK0RBeUpDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL291dHB1dC9hYnN0cmFjdF9qc19lbWl0dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc1ByZXNlbnR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQgKiBhcyBvIGZyb20gJy4vb3V0cHV0X2FzdCc7XG5pbXBvcnQge1xuICBFbWl0dGVyVmlzaXRvckNvbnRleHQsXG4gIEFic3RyYWN0RW1pdHRlclZpc2l0b3IsXG4gIENBVENIX0VSUk9SX1ZBUixcbiAgQ0FUQ0hfU1RBQ0tfVkFSXG59IGZyb20gJy4vYWJzdHJhY3RfZW1pdHRlcic7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdEpzRW1pdHRlclZpc2l0b3IgZXh0ZW5kcyBBYnN0cmFjdEVtaXR0ZXJWaXNpdG9yIHtcbiAgY29uc3RydWN0b3IoKSB7IHN1cGVyKGZhbHNlKTsgfVxuICB2aXNpdERlY2xhcmVDbGFzc1N0bXQoc3RtdDogby5DbGFzc1N0bXQsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICBjdHgucHVzaENsYXNzKHN0bXQpO1xuICAgIHRoaXMuX3Zpc2l0Q2xhc3NDb25zdHJ1Y3RvcihzdG10LCBjdHgpO1xuXG4gICAgaWYgKGlzUHJlc2VudChzdG10LnBhcmVudCkpIHtcbiAgICAgIGN0eC5wcmludChgJHtzdG10Lm5hbWV9LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoYCk7XG4gICAgICBzdG10LnBhcmVudC52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICAgIGN0eC5wcmludGxuKGAucHJvdG90eXBlKTtgKTtcbiAgICB9XG4gICAgc3RtdC5nZXR0ZXJzLmZvckVhY2goKGdldHRlcikgPT4gdGhpcy5fdmlzaXRDbGFzc0dldHRlcihzdG10LCBnZXR0ZXIsIGN0eCkpO1xuICAgIHN0bXQubWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHRoaXMuX3Zpc2l0Q2xhc3NNZXRob2Qoc3RtdCwgbWV0aG9kLCBjdHgpKTtcbiAgICBjdHgucG9wQ2xhc3MoKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgX3Zpc2l0Q2xhc3NDb25zdHJ1Y3RvcihzdG10OiBvLkNsYXNzU3RtdCwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpIHtcbiAgICBjdHgucHJpbnQoYGZ1bmN0aW9uICR7c3RtdC5uYW1lfShgKTtcbiAgICBpZiAoaXNQcmVzZW50KHN0bXQuY29uc3RydWN0b3JNZXRob2QpKSB7XG4gICAgICB0aGlzLl92aXNpdFBhcmFtcyhzdG10LmNvbnN0cnVjdG9yTWV0aG9kLnBhcmFtcywgY3R4KTtcbiAgICB9XG4gICAgY3R4LnByaW50bG4oYCkge2ApO1xuICAgIGN0eC5pbmNJbmRlbnQoKTtcbiAgICBpZiAoaXNQcmVzZW50KHN0bXQuY29uc3RydWN0b3JNZXRob2QpKSB7XG4gICAgICBpZiAoc3RtdC5jb25zdHJ1Y3Rvck1ldGhvZC5ib2R5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgY3R4LnByaW50bG4oYHZhciBzZWxmID0gdGhpcztgKTtcbiAgICAgICAgdGhpcy52aXNpdEFsbFN0YXRlbWVudHMoc3RtdC5jb25zdHJ1Y3Rvck1ldGhvZC5ib2R5LCBjdHgpO1xuICAgICAgfVxuICAgIH1cbiAgICBjdHguZGVjSW5kZW50KCk7XG4gICAgY3R4LnByaW50bG4oYH1gKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Zpc2l0Q2xhc3NHZXR0ZXIoc3RtdDogby5DbGFzc1N0bXQsIGdldHRlcjogby5DbGFzc0dldHRlciwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpIHtcbiAgICBjdHgucHJpbnRsbihcbiAgICAgICAgYE9iamVjdC5kZWZpbmVQcm9wZXJ0eSgke3N0bXQubmFtZX0ucHJvdG90eXBlLCAnJHtnZXR0ZXIubmFtZX0nLCB7IGdldDogZnVuY3Rpb24oKSB7YCk7XG4gICAgY3R4LmluY0luZGVudCgpO1xuICAgIGlmIChnZXR0ZXIuYm9keS5sZW5ndGggPiAwKSB7XG4gICAgICBjdHgucHJpbnRsbihgdmFyIHNlbGYgPSB0aGlzO2ApO1xuICAgICAgdGhpcy52aXNpdEFsbFN0YXRlbWVudHMoZ2V0dGVyLmJvZHksIGN0eCk7XG4gICAgfVxuICAgIGN0eC5kZWNJbmRlbnQoKTtcbiAgICBjdHgucHJpbnRsbihgfX0pO2ApO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmlzaXRDbGFzc01ldGhvZChzdG10OiBvLkNsYXNzU3RtdCwgbWV0aG9kOiBvLkNsYXNzTWV0aG9kLCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCkge1xuICAgIGN0eC5wcmludChgJHtzdG10Lm5hbWV9LnByb3RvdHlwZS4ke21ldGhvZC5uYW1lfSA9IGZ1bmN0aW9uKGApO1xuICAgIHRoaXMuX3Zpc2l0UGFyYW1zKG1ldGhvZC5wYXJhbXMsIGN0eCk7XG4gICAgY3R4LnByaW50bG4oYCkge2ApO1xuICAgIGN0eC5pbmNJbmRlbnQoKTtcbiAgICBpZiAobWV0aG9kLmJvZHkubGVuZ3RoID4gMCkge1xuICAgICAgY3R4LnByaW50bG4oYHZhciBzZWxmID0gdGhpcztgKTtcbiAgICAgIHRoaXMudmlzaXRBbGxTdGF0ZW1lbnRzKG1ldGhvZC5ib2R5LCBjdHgpO1xuICAgIH1cbiAgICBjdHguZGVjSW5kZW50KCk7XG4gICAgY3R4LnByaW50bG4oYH07YCk7XG4gIH1cblxuICB2aXNpdFJlYWRWYXJFeHByKGFzdDogby5SZWFkVmFyRXhwciwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBzdHJpbmcge1xuICAgIGlmIChhc3QuYnVpbHRpbiA9PT0gby5CdWlsdGluVmFyLlRoaXMpIHtcbiAgICAgIGN0eC5wcmludCgnc2VsZicpO1xuICAgIH0gZWxzZSBpZiAoYXN0LmJ1aWx0aW4gPT09IG8uQnVpbHRpblZhci5TdXBlcikge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgICAgYCdzdXBlcicgbmVlZHMgdG8gYmUgaGFuZGxlZCBhdCBhIHBhcmVudCBhc3Qgbm9kZSwgbm90IGF0IHRoZSB2YXJpYWJsZSBsZXZlbCFgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIudmlzaXRSZWFkVmFyRXhwcihhc3QsIGN0eCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0RGVjbGFyZVZhclN0bXQoc3RtdDogby5EZWNsYXJlVmFyU3RtdCwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIGN0eC5wcmludChgdmFyICR7c3RtdC5uYW1lfSA9IGApO1xuICAgIHN0bXQudmFsdWUudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgY3R4LnByaW50bG4oYDtgKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdENhc3RFeHByKGFzdDogby5DYXN0RXhwciwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIGFzdC52YWx1ZS52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdEludm9rZUZ1bmN0aW9uRXhwcihleHByOiBvLkludm9rZUZ1bmN0aW9uRXhwciwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBzdHJpbmcge1xuICAgIHZhciBmbkV4cHIgPSBleHByLmZuO1xuICAgIGlmIChmbkV4cHIgaW5zdGFuY2VvZiBvLlJlYWRWYXJFeHByICYmIGZuRXhwci5idWlsdGluID09PSBvLkJ1aWx0aW5WYXIuU3VwZXIpIHtcbiAgICAgIGN0eC5jdXJyZW50Q2xhc3MucGFyZW50LnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICAgICAgY3R4LnByaW50KGAuY2FsbCh0aGlzYCk7XG4gICAgICBpZiAoZXhwci5hcmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY3R4LnByaW50KGAsIGApO1xuICAgICAgICB0aGlzLnZpc2l0QWxsRXhwcmVzc2lvbnMoZXhwci5hcmdzLCBjdHgsICcsJyk7XG4gICAgICB9XG4gICAgICBjdHgucHJpbnQoYClgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIudmlzaXRJbnZva2VGdW5jdGlvbkV4cHIoZXhwciwgY3R4KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXRGdW5jdGlvbkV4cHIoYXN0OiBvLkZ1bmN0aW9uRXhwciwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIGN0eC5wcmludChgZnVuY3Rpb24oYCk7XG4gICAgdGhpcy5fdmlzaXRQYXJhbXMoYXN0LnBhcmFtcywgY3R4KTtcbiAgICBjdHgucHJpbnRsbihgKSB7YCk7XG4gICAgY3R4LmluY0luZGVudCgpO1xuICAgIHRoaXMudmlzaXRBbGxTdGF0ZW1lbnRzKGFzdC5zdGF0ZW1lbnRzLCBjdHgpO1xuICAgIGN0eC5kZWNJbmRlbnQoKTtcbiAgICBjdHgucHJpbnQoYH1gKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdERlY2xhcmVGdW5jdGlvblN0bXQoc3RtdDogby5EZWNsYXJlRnVuY3Rpb25TdG10LCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgY3R4LnByaW50KGBmdW5jdGlvbiAke3N0bXQubmFtZX0oYCk7XG4gICAgdGhpcy5fdmlzaXRQYXJhbXMoc3RtdC5wYXJhbXMsIGN0eCk7XG4gICAgY3R4LnByaW50bG4oYCkge2ApO1xuICAgIGN0eC5pbmNJbmRlbnQoKTtcbiAgICB0aGlzLnZpc2l0QWxsU3RhdGVtZW50cyhzdG10LnN0YXRlbWVudHMsIGN0eCk7XG4gICAgY3R4LmRlY0luZGVudCgpO1xuICAgIGN0eC5wcmludGxuKGB9YCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXRUcnlDYXRjaFN0bXQoc3RtdDogby5UcnlDYXRjaFN0bXQsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICBjdHgucHJpbnRsbihgdHJ5IHtgKTtcbiAgICBjdHguaW5jSW5kZW50KCk7XG4gICAgdGhpcy52aXNpdEFsbFN0YXRlbWVudHMoc3RtdC5ib2R5U3RtdHMsIGN0eCk7XG4gICAgY3R4LmRlY0luZGVudCgpO1xuICAgIGN0eC5wcmludGxuKGB9IGNhdGNoICgke0NBVENIX0VSUk9SX1ZBUi5uYW1lfSkge2ApO1xuICAgIGN0eC5pbmNJbmRlbnQoKTtcbiAgICB2YXIgY2F0Y2hTdG10cyA9IFtcbiAgICAgIDxvLlN0YXRlbWVudD5DQVRDSF9TVEFDS19WQVIuc2V0KENBVENIX0VSUk9SX1ZBUi5wcm9wKCdzdGFjaycpKVxuICAgICAgICAgIC50b0RlY2xTdG10KG51bGwsIFtvLlN0bXRNb2RpZmllci5GaW5hbF0pXG4gICAgXS5jb25jYXQoc3RtdC5jYXRjaFN0bXRzKTtcbiAgICB0aGlzLnZpc2l0QWxsU3RhdGVtZW50cyhjYXRjaFN0bXRzLCBjdHgpO1xuICAgIGN0eC5kZWNJbmRlbnQoKTtcbiAgICBjdHgucHJpbnRsbihgfWApO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmlzaXRQYXJhbXMocGFyYW1zOiBvLkZuUGFyYW1bXSwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiB2b2lkIHtcbiAgICB0aGlzLnZpc2l0QWxsT2JqZWN0cygocGFyYW0pID0+IGN0eC5wcmludChwYXJhbS5uYW1lKSwgcGFyYW1zLCBjdHgsICcsJyk7XG4gIH1cblxuICBnZXRCdWlsdGluTWV0aG9kTmFtZShtZXRob2Q6IG8uQnVpbHRpbk1ldGhvZCk6IHN0cmluZyB7XG4gICAgdmFyIG5hbWU7XG4gICAgc3dpdGNoIChtZXRob2QpIHtcbiAgICAgIGNhc2Ugby5CdWlsdGluTWV0aG9kLkNvbmNhdEFycmF5OlxuICAgICAgICBuYW1lID0gJ2NvbmNhdCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBvLkJ1aWx0aW5NZXRob2QuU3Vic2NyaWJlT2JzZXJ2YWJsZTpcbiAgICAgICAgbmFtZSA9ICdzdWJzY3JpYmUnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Ugby5CdWlsdGluTWV0aG9kLmJpbmQ6XG4gICAgICAgIG5hbWUgPSAnYmluZCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYFVua25vd24gYnVpbHRpbiBtZXRob2Q6ICR7bWV0aG9kfWApO1xuICAgIH1cbiAgICByZXR1cm4gbmFtZTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
