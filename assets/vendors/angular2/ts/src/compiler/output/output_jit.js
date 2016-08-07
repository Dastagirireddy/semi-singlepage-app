System.register(['angular2/src/facade/lang', './abstract_emitter', './abstract_js_emitter', '../util'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lang_1, abstract_emitter_1, abstract_js_emitter_1, util_1;
    var JitEmitterVisitor;
    function jitStatements(sourceUrl, statements, resultVar) {
        var converter = new JitEmitterVisitor();
        var ctx = abstract_emitter_1.EmitterVisitorContext.createRoot([resultVar]);
        converter.visitAllStatements(statements, ctx);
        return lang_1.evalExpression(sourceUrl, resultVar, ctx.toSource(), converter.getArgs());
    }
    exports_1("jitStatements", jitStatements);
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
            function (util_1_1) {
                util_1 = util_1_1;
            }],
        execute: function() {
            JitEmitterVisitor = (function (_super) {
                __extends(JitEmitterVisitor, _super);
                function JitEmitterVisitor() {
                    _super.apply(this, arguments);
                    this._evalArgNames = [];
                    this._evalArgValues = [];
                }
                JitEmitterVisitor.prototype.getArgs = function () {
                    var result = {};
                    for (var i = 0; i < this._evalArgNames.length; i++) {
                        result[this._evalArgNames[i]] = this._evalArgValues[i];
                    }
                    return result;
                };
                JitEmitterVisitor.prototype.visitExternalExpr = function (ast, ctx) {
                    var value = ast.value.runtime;
                    var id = this._evalArgValues.indexOf(value);
                    if (id === -1) {
                        id = this._evalArgValues.length;
                        this._evalArgValues.push(value);
                        var name = lang_1.isPresent(ast.value.name) ? util_1.sanitizeIdentifier(ast.value.name) : 'val';
                        this._evalArgNames.push(util_1.sanitizeIdentifier("jit_" + name + id));
                    }
                    ctx.print(this._evalArgNames[id]);
                    return null;
                };
                return JitEmitterVisitor;
            }(abstract_js_emitter_1.AbstractJsEmitterVisitor));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9vdXRwdXQvb3V0cHV0X2ppdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBYUEsdUJBQThCLFNBQWlCLEVBQUUsVUFBeUIsRUFDNUMsU0FBaUI7UUFDN0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1FBQ3hDLElBQUksR0FBRyxHQUFHLHdDQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDeEQsU0FBUyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM5QyxNQUFNLENBQUMscUJBQWMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBTkQseUNBTUMsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7OztZQUVEO2dCQUFnQyxxQ0FBd0I7Z0JBQXhEO29CQUFnQyw4QkFBd0I7b0JBQzlDLGtCQUFhLEdBQWEsRUFBRSxDQUFDO29CQUM3QixtQkFBYyxHQUFVLEVBQUUsQ0FBQztnQkFzQnJDLENBQUM7Z0JBcEJDLG1DQUFPLEdBQVA7b0JBQ0UsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO29CQUNoQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQ25ELE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekQsQ0FBQztvQkFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNoQixDQUFDO2dCQUVELDZDQUFpQixHQUFqQixVQUFrQixHQUFtQixFQUFFLEdBQTBCO29CQUMvRCxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztvQkFDOUIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzVDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2QsRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO3dCQUNoQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDaEMsSUFBSSxJQUFJLEdBQUcsZ0JBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLHlCQUFrQixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO3dCQUNsRixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyx5QkFBa0IsQ0FBQyxTQUFPLElBQUksR0FBRyxFQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNsRSxDQUFDO29CQUNELEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNkLENBQUM7Z0JBQ0gsd0JBQUM7WUFBRCxDQXhCQSxBQXdCQyxDQXhCK0IsOENBQXdCLEdBd0J2RCIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tcGlsZXIvb3V0cHV0L291dHB1dF9qaXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBpc1ByZXNlbnQsXG4gIGlzQmxhbmssXG4gIGlzU3RyaW5nLFxuICBldmFsRXhwcmVzc2lvbixcbiAgUmVnRXhwV3JhcHBlcixcbiAgU3RyaW5nV3JhcHBlclxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0ICogYXMgbyBmcm9tICcuL291dHB1dF9hc3QnO1xuaW1wb3J0IHtFbWl0dGVyVmlzaXRvckNvbnRleHR9IGZyb20gJy4vYWJzdHJhY3RfZW1pdHRlcic7XG5pbXBvcnQge0Fic3RyYWN0SnNFbWl0dGVyVmlzaXRvcn0gZnJvbSAnLi9hYnN0cmFjdF9qc19lbWl0dGVyJztcbmltcG9ydCB7c2FuaXRpemVJZGVudGlmaWVyfSBmcm9tICcuLi91dGlsJztcblxuZXhwb3J0IGZ1bmN0aW9uIGppdFN0YXRlbWVudHMoc291cmNlVXJsOiBzdHJpbmcsIHN0YXRlbWVudHM6IG8uU3RhdGVtZW50W10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRWYXI6IHN0cmluZyk6IGFueSB7XG4gIHZhciBjb252ZXJ0ZXIgPSBuZXcgSml0RW1pdHRlclZpc2l0b3IoKTtcbiAgdmFyIGN0eCA9IEVtaXR0ZXJWaXNpdG9yQ29udGV4dC5jcmVhdGVSb290KFtyZXN1bHRWYXJdKTtcbiAgY29udmVydGVyLnZpc2l0QWxsU3RhdGVtZW50cyhzdGF0ZW1lbnRzLCBjdHgpO1xuICByZXR1cm4gZXZhbEV4cHJlc3Npb24oc291cmNlVXJsLCByZXN1bHRWYXIsIGN0eC50b1NvdXJjZSgpLCBjb252ZXJ0ZXIuZ2V0QXJncygpKTtcbn1cblxuY2xhc3MgSml0RW1pdHRlclZpc2l0b3IgZXh0ZW5kcyBBYnN0cmFjdEpzRW1pdHRlclZpc2l0b3Ige1xuICBwcml2YXRlIF9ldmFsQXJnTmFtZXM6IHN0cmluZ1tdID0gW107XG4gIHByaXZhdGUgX2V2YWxBcmdWYWx1ZXM6IGFueVtdID0gW107XG5cbiAgZ2V0QXJncygpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fZXZhbEFyZ05hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXN1bHRbdGhpcy5fZXZhbEFyZ05hbWVzW2ldXSA9IHRoaXMuX2V2YWxBcmdWYWx1ZXNbaV07XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICB2aXNpdEV4dGVybmFsRXhwcihhc3Q6IG8uRXh0ZXJuYWxFeHByLCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgdmFyIHZhbHVlID0gYXN0LnZhbHVlLnJ1bnRpbWU7XG4gICAgdmFyIGlkID0gdGhpcy5fZXZhbEFyZ1ZhbHVlcy5pbmRleE9mKHZhbHVlKTtcbiAgICBpZiAoaWQgPT09IC0xKSB7XG4gICAgICBpZCA9IHRoaXMuX2V2YWxBcmdWYWx1ZXMubGVuZ3RoO1xuICAgICAgdGhpcy5fZXZhbEFyZ1ZhbHVlcy5wdXNoKHZhbHVlKTtcbiAgICAgIHZhciBuYW1lID0gaXNQcmVzZW50KGFzdC52YWx1ZS5uYW1lKSA/IHNhbml0aXplSWRlbnRpZmllcihhc3QudmFsdWUubmFtZSkgOiAndmFsJztcbiAgICAgIHRoaXMuX2V2YWxBcmdOYW1lcy5wdXNoKHNhbml0aXplSWRlbnRpZmllcihgaml0XyR7bmFtZX0ke2lkfWApKTtcbiAgICB9XG4gICAgY3R4LnByaW50KHRoaXMuX2V2YWxBcmdOYW1lc1tpZF0pO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
