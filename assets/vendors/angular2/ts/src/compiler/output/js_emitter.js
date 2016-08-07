System.register(['angular2/src/facade/lang', './abstract_emitter', './abstract_js_emitter', './path_util'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lang_1, abstract_emitter_1, abstract_js_emitter_1, path_util_1;
    var JavaScriptEmitter, JsEmitterVisitor;
    function exportVar(varName) {
        return "Object.defineProperty(exports, '" + varName + "', { get: function() { return " + varName + "; }});";
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (abstract_emitter_1_1) {
                abstract_emitter_1 = abstract_emitter_1_1;
            },
            function (abstract_js_emitter_1_1) {
                abstract_js_emitter_1 = abstract_js_emitter_1_1;
            },
            function (path_util_1_1) {
                path_util_1 = path_util_1_1;
            }],
        execute: function() {
            JavaScriptEmitter = (function () {
                function JavaScriptEmitter() {
                }
                JavaScriptEmitter.prototype.emitStatements = function (moduleUrl, stmts, exportedVars) {
                    var converter = new JsEmitterVisitor(moduleUrl);
                    var ctx = abstract_emitter_1.EmitterVisitorContext.createRoot(exportedVars);
                    converter.visitAllStatements(stmts, ctx);
                    var srcParts = [];
                    converter.importsWithPrefixes.forEach(function (prefix, importedModuleUrl) {
                        // Note: can't write the real word for import as it screws up system.js auto detection...
                        srcParts.push(("var " + prefix + " = req") +
                            ("uire('" + path_util_1.getImportModulePath(moduleUrl, importedModuleUrl, path_util_1.ImportEnv.JS) + "');"));
                    });
                    srcParts.push(ctx.toSource());
                    return srcParts.join('\n');
                };
                return JavaScriptEmitter;
            }());
            exports_1("JavaScriptEmitter", JavaScriptEmitter);
            JsEmitterVisitor = (function (_super) {
                __extends(JsEmitterVisitor, _super);
                function JsEmitterVisitor(_moduleUrl) {
                    _super.call(this);
                    this._moduleUrl = _moduleUrl;
                    this.importsWithPrefixes = new Map();
                }
                JsEmitterVisitor.prototype.visitExternalExpr = function (ast, ctx) {
                    if (lang_1.isPresent(ast.value.moduleUrl) && ast.value.moduleUrl != this._moduleUrl) {
                        var prefix = this.importsWithPrefixes.get(ast.value.moduleUrl);
                        if (lang_1.isBlank(prefix)) {
                            prefix = "import" + this.importsWithPrefixes.size;
                            this.importsWithPrefixes.set(ast.value.moduleUrl, prefix);
                        }
                        ctx.print(prefix + ".");
                    }
                    ctx.print(ast.value.name);
                    return null;
                };
                JsEmitterVisitor.prototype.visitDeclareVarStmt = function (stmt, ctx) {
                    _super.prototype.visitDeclareVarStmt.call(this, stmt, ctx);
                    if (ctx.isExportedVar(stmt.name)) {
                        ctx.println(exportVar(stmt.name));
                    }
                    return null;
                };
                JsEmitterVisitor.prototype.visitDeclareFunctionStmt = function (stmt, ctx) {
                    _super.prototype.visitDeclareFunctionStmt.call(this, stmt, ctx);
                    if (ctx.isExportedVar(stmt.name)) {
                        ctx.println(exportVar(stmt.name));
                    }
                    return null;
                };
                JsEmitterVisitor.prototype.visitDeclareClassStmt = function (stmt, ctx) {
                    _super.prototype.visitDeclareClassStmt.call(this, stmt, ctx);
                    if (ctx.isExportedVar(stmt.name)) {
                        ctx.println(exportVar(stmt.name));
                    }
                    return null;
                };
                return JsEmitterVisitor;
            }(abstract_js_emitter_1.AbstractJsEmitterVisitor));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9vdXRwdXQvanNfZW1pdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBc0VBLG1CQUFtQixPQUFlO1FBQ2hDLE1BQU0sQ0FBQyxxQ0FBbUMsT0FBTyxzQ0FBaUMsT0FBTyxXQUFRLENBQUM7SUFDcEcsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztZQTNERDtnQkFDRTtnQkFBZSxDQUFDO2dCQUNoQiwwQ0FBYyxHQUFkLFVBQWUsU0FBaUIsRUFBRSxLQUFvQixFQUFFLFlBQXNCO29CQUM1RSxJQUFJLFNBQVMsR0FBRyxJQUFJLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNoRCxJQUFJLEdBQUcsR0FBRyx3Q0FBcUIsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQ3pELFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ3pDLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztvQkFDbEIsU0FBUyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU0sRUFBRSxpQkFBaUI7d0JBQzlELHlGQUF5Rjt3QkFDekYsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFPLE1BQU0sWUFBUTs0QkFDckIsWUFBUywrQkFBbUIsQ0FBQyxTQUFTLEVBQUUsaUJBQWlCLEVBQUUscUJBQVMsQ0FBQyxFQUFFLENBQUMsU0FBSyxDQUFDLENBQUM7b0JBQy9GLENBQUMsQ0FBQyxDQUFDO29CQUNILFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7b0JBQzlCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM3QixDQUFDO2dCQUNILHdCQUFDO1lBQUQsQ0FmQSxBQWVDLElBQUE7WUFmRCxpREFlQyxDQUFBO1lBRUQ7Z0JBQStCLG9DQUF3QjtnQkFHckQsMEJBQW9CLFVBQWtCO29CQUFJLGlCQUFPLENBQUM7b0JBQTlCLGVBQVUsR0FBVixVQUFVLENBQVE7b0JBRnRDLHdCQUFtQixHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO2dCQUVHLENBQUM7Z0JBRXBELDRDQUFpQixHQUFqQixVQUFrQixHQUFtQixFQUFFLEdBQTBCO29CQUMvRCxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7d0JBQzdFLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDL0QsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDcEIsTUFBTSxHQUFHLFdBQVMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQU0sQ0FBQzs0QkFDbEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFDNUQsQ0FBQzt3QkFDRCxHQUFHLENBQUMsS0FBSyxDQUFJLE1BQU0sTUFBRyxDQUFDLENBQUM7b0JBQzFCLENBQUM7b0JBQ0QsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNkLENBQUM7Z0JBQ0QsOENBQW1CLEdBQW5CLFVBQW9CLElBQXNCLEVBQUUsR0FBMEI7b0JBQ3BFLGdCQUFLLENBQUMsbUJBQW1CLFlBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUNyQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2pDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNwQyxDQUFDO29CQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQztnQkFDRCxtREFBd0IsR0FBeEIsVUFBeUIsSUFBMkIsRUFBRSxHQUEwQjtvQkFDOUUsZ0JBQUssQ0FBQyx3QkFBd0IsWUFBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQzFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDakMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3BDLENBQUM7b0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDZCxDQUFDO2dCQUNELGdEQUFxQixHQUFyQixVQUFzQixJQUFpQixFQUFFLEdBQTBCO29CQUNqRSxnQkFBSyxDQUFDLHFCQUFxQixZQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDdkMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNqQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDcEMsQ0FBQztvQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNkLENBQUM7Z0JBQ0gsdUJBQUM7WUFBRCxDQXRDQSxBQXNDQyxDQXRDOEIsOENBQXdCLEdBc0N0RCIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tcGlsZXIvb3V0cHV0L2pzX2VtaXR0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBvIGZyb20gJy4vb3V0cHV0X2FzdCc7XG5pbXBvcnQge1xuICBpc1ByZXNlbnQsXG4gIGlzQmxhbmssXG4gIGlzU3RyaW5nLFxuICBldmFsRXhwcmVzc2lvbixcbiAgUmVnRXhwV3JhcHBlcixcbiAgU3RyaW5nV3JhcHBlclxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtPdXRwdXRFbWl0dGVyLCBFbWl0dGVyVmlzaXRvckNvbnRleHR9IGZyb20gJy4vYWJzdHJhY3RfZW1pdHRlcic7XG5pbXBvcnQge0Fic3RyYWN0SnNFbWl0dGVyVmlzaXRvcn0gZnJvbSAnLi9hYnN0cmFjdF9qc19lbWl0dGVyJztcbmltcG9ydCB7Z2V0SW1wb3J0TW9kdWxlUGF0aCwgSW1wb3J0RW52fSBmcm9tICcuL3BhdGhfdXRpbCc7XG5cbmV4cG9ydCBjbGFzcyBKYXZhU2NyaXB0RW1pdHRlciBpbXBsZW1lbnRzIE91dHB1dEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHt9XG4gIGVtaXRTdGF0ZW1lbnRzKG1vZHVsZVVybDogc3RyaW5nLCBzdG10czogby5TdGF0ZW1lbnRbXSwgZXhwb3J0ZWRWYXJzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gICAgdmFyIGNvbnZlcnRlciA9IG5ldyBKc0VtaXR0ZXJWaXNpdG9yKG1vZHVsZVVybCk7XG4gICAgdmFyIGN0eCA9IEVtaXR0ZXJWaXNpdG9yQ29udGV4dC5jcmVhdGVSb290KGV4cG9ydGVkVmFycyk7XG4gICAgY29udmVydGVyLnZpc2l0QWxsU3RhdGVtZW50cyhzdG10cywgY3R4KTtcbiAgICB2YXIgc3JjUGFydHMgPSBbXTtcbiAgICBjb252ZXJ0ZXIuaW1wb3J0c1dpdGhQcmVmaXhlcy5mb3JFYWNoKChwcmVmaXgsIGltcG9ydGVkTW9kdWxlVXJsKSA9PiB7XG4gICAgICAvLyBOb3RlOiBjYW4ndCB3cml0ZSB0aGUgcmVhbCB3b3JkIGZvciBpbXBvcnQgYXMgaXQgc2NyZXdzIHVwIHN5c3RlbS5qcyBhdXRvIGRldGVjdGlvbi4uLlxuICAgICAgc3JjUGFydHMucHVzaChgdmFyICR7cHJlZml4fSA9IHJlcWAgK1xuICAgICAgICAgICAgICAgICAgICBgdWlyZSgnJHtnZXRJbXBvcnRNb2R1bGVQYXRoKG1vZHVsZVVybCwgaW1wb3J0ZWRNb2R1bGVVcmwsIEltcG9ydEVudi5KUyl9Jyk7YCk7XG4gICAgfSk7XG4gICAgc3JjUGFydHMucHVzaChjdHgudG9Tb3VyY2UoKSk7XG4gICAgcmV0dXJuIHNyY1BhcnRzLmpvaW4oJ1xcbicpO1xuICB9XG59XG5cbmNsYXNzIEpzRW1pdHRlclZpc2l0b3IgZXh0ZW5kcyBBYnN0cmFjdEpzRW1pdHRlclZpc2l0b3Ige1xuICBpbXBvcnRzV2l0aFByZWZpeGVzID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tb2R1bGVVcmw6IHN0cmluZykgeyBzdXBlcigpOyB9XG5cbiAgdmlzaXRFeHRlcm5hbEV4cHIoYXN0OiBvLkV4dGVybmFsRXhwciwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIGlmIChpc1ByZXNlbnQoYXN0LnZhbHVlLm1vZHVsZVVybCkgJiYgYXN0LnZhbHVlLm1vZHVsZVVybCAhPSB0aGlzLl9tb2R1bGVVcmwpIHtcbiAgICAgIHZhciBwcmVmaXggPSB0aGlzLmltcG9ydHNXaXRoUHJlZml4ZXMuZ2V0KGFzdC52YWx1ZS5tb2R1bGVVcmwpO1xuICAgICAgaWYgKGlzQmxhbmsocHJlZml4KSkge1xuICAgICAgICBwcmVmaXggPSBgaW1wb3J0JHt0aGlzLmltcG9ydHNXaXRoUHJlZml4ZXMuc2l6ZX1gO1xuICAgICAgICB0aGlzLmltcG9ydHNXaXRoUHJlZml4ZXMuc2V0KGFzdC52YWx1ZS5tb2R1bGVVcmwsIHByZWZpeCk7XG4gICAgICB9XG4gICAgICBjdHgucHJpbnQoYCR7cHJlZml4fS5gKTtcbiAgICB9XG4gICAgY3R4LnByaW50KGFzdC52YWx1ZS5uYW1lKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdERlY2xhcmVWYXJTdG10KHN0bXQ6IG8uRGVjbGFyZVZhclN0bXQsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICBzdXBlci52aXNpdERlY2xhcmVWYXJTdG10KHN0bXQsIGN0eCk7XG4gICAgaWYgKGN0eC5pc0V4cG9ydGVkVmFyKHN0bXQubmFtZSkpIHtcbiAgICAgIGN0eC5wcmludGxuKGV4cG9ydFZhcihzdG10Lm5hbWUpKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXREZWNsYXJlRnVuY3Rpb25TdG10KHN0bXQ6IG8uRGVjbGFyZUZ1bmN0aW9uU3RtdCwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIHN1cGVyLnZpc2l0RGVjbGFyZUZ1bmN0aW9uU3RtdChzdG10LCBjdHgpO1xuICAgIGlmIChjdHguaXNFeHBvcnRlZFZhcihzdG10Lm5hbWUpKSB7XG4gICAgICBjdHgucHJpbnRsbihleHBvcnRWYXIoc3RtdC5uYW1lKSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0RGVjbGFyZUNsYXNzU3RtdChzdG10OiBvLkNsYXNzU3RtdCwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIHN1cGVyLnZpc2l0RGVjbGFyZUNsYXNzU3RtdChzdG10LCBjdHgpO1xuICAgIGlmIChjdHguaXNFeHBvcnRlZFZhcihzdG10Lm5hbWUpKSB7XG4gICAgICBjdHgucHJpbnRsbihleHBvcnRWYXIoc3RtdC5uYW1lKSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmZ1bmN0aW9uIGV4cG9ydFZhcih2YXJOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gYE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnJHt2YXJOYW1lfScsIHsgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuICR7dmFyTmFtZX07IH19KTtgO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
