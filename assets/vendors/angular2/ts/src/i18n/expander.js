System.register(['angular2/src/compiler/html_ast', 'angular2/src/facade/exceptions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var html_ast_1, exceptions_1;
    var ExpansionResult, _Expander;
    /**
     * Expands special forms into elements.
     *
     * For example,
     *
     * ```
     * { messages.length, plural,
     *   =0 {zero}
     *   =1 {one}
     *   =other {more than one}
     * }
     * ```
     *
     * will be expanded into
     *
     * ```
     * <ul [ngPlural]="messages.length">
     *   <template [ngPluralCase]="0"><li i18n="plural_0">zero</li></template>
     *   <template [ngPluralCase]="1"><li i18n="plural_1">one</li></template>
     *   <template [ngPluralCase]="other"><li i18n="plural_other">more than one</li></template>
     * </ul>
     * ```
     */
    function expandNodes(nodes) {
        var e = new _Expander();
        var n = html_ast_1.htmlVisitAll(e, nodes);
        return new ExpansionResult(n, e.expanded);
    }
    exports_1("expandNodes", expandNodes);
    function _expandPluralForm(ast) {
        var children = ast.cases.map(function (c) {
            var expansionResult = expandNodes(c.expression);
            var i18nAttrs = expansionResult.expanded ?
                [] :
                [new html_ast_1.HtmlAttrAst("i18n", ast.type + "_" + c.value, c.valueSourceSpan)];
            return new html_ast_1.HtmlElementAst("template", [
                new html_ast_1.HtmlAttrAst("ngPluralCase", c.value, c.valueSourceSpan),
            ], [
                new html_ast_1.HtmlElementAst("li", i18nAttrs, expansionResult.nodes, c.sourceSpan, c.sourceSpan, c.sourceSpan)
            ], c.sourceSpan, c.sourceSpan, c.sourceSpan);
        });
        var switchAttr = new html_ast_1.HtmlAttrAst("[ngPlural]", ast.switchValue, ast.switchValueSourceSpan);
        return new html_ast_1.HtmlElementAst("ul", [switchAttr], children, ast.sourceSpan, ast.sourceSpan, ast.sourceSpan);
    }
    function _expandDefaultForm(ast) {
        var children = ast.cases.map(function (c) {
            var expansionResult = expandNodes(c.expression);
            var i18nAttrs = expansionResult.expanded ?
                [] :
                [new html_ast_1.HtmlAttrAst("i18n", ast.type + "_" + c.value, c.valueSourceSpan)];
            return new html_ast_1.HtmlElementAst("template", [
                new html_ast_1.HtmlAttrAst("ngSwitchWhen", c.value, c.valueSourceSpan),
            ], [
                new html_ast_1.HtmlElementAst("li", i18nAttrs, expansionResult.nodes, c.sourceSpan, c.sourceSpan, c.sourceSpan)
            ], c.sourceSpan, c.sourceSpan, c.sourceSpan);
        });
        var switchAttr = new html_ast_1.HtmlAttrAst("[ngSwitch]", ast.switchValue, ast.switchValueSourceSpan);
        return new html_ast_1.HtmlElementAst("ul", [switchAttr], children, ast.sourceSpan, ast.sourceSpan, ast.sourceSpan);
    }
    return {
        setters:[
            function (html_ast_1_1) {
                html_ast_1 = html_ast_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
            ExpansionResult = (function () {
                function ExpansionResult(nodes, expanded) {
                    this.nodes = nodes;
                    this.expanded = expanded;
                }
                return ExpansionResult;
            }());
            exports_1("ExpansionResult", ExpansionResult);
            _Expander = (function () {
                function _Expander() {
                    this.expanded = false;
                }
                _Expander.prototype.visitElement = function (ast, context) {
                    return new html_ast_1.HtmlElementAst(ast.name, ast.attrs, html_ast_1.htmlVisitAll(this, ast.children), ast.sourceSpan, ast.startSourceSpan, ast.endSourceSpan);
                };
                _Expander.prototype.visitAttr = function (ast, context) { return ast; };
                _Expander.prototype.visitText = function (ast, context) { return ast; };
                _Expander.prototype.visitComment = function (ast, context) { return ast; };
                _Expander.prototype.visitExpansion = function (ast, context) {
                    this.expanded = true;
                    return ast.type == "plural" ? _expandPluralForm(ast) : _expandDefaultForm(ast);
                };
                _Expander.prototype.visitExpansionCase = function (ast, context) {
                    throw new exceptions_1.BaseException("Should not be reached");
                };
                return _Expander;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9pMThuL2V4cGFuZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0lBZUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FzQkc7SUFDSCxxQkFBNEIsS0FBZ0I7UUFDMUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsR0FBRyx1QkFBWSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMvQixNQUFNLENBQUMsSUFBSSxlQUFlLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBSkQscUNBSUMsQ0FBQTtJQStCRCwyQkFBMkIsR0FBcUI7UUFDOUMsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDO1lBQzVCLElBQUksZUFBZSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDaEQsSUFBSSxTQUFTLEdBQUcsZUFBZSxDQUFDLFFBQVE7Z0JBQ3BCLEVBQUU7Z0JBQ0YsQ0FBQyxJQUFJLHNCQUFXLENBQUMsTUFBTSxFQUFLLEdBQUcsQ0FBQyxJQUFJLFNBQUksQ0FBQyxDQUFDLEtBQU8sRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUUzRixNQUFNLENBQUMsSUFBSSx5QkFBYyxDQUFDLFVBQVUsRUFDVjtnQkFDRSxJQUFJLHNCQUFXLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQzthQUM1RCxFQUNEO2dCQUNFLElBQUkseUJBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLGVBQWUsQ0FBQyxLQUFLLEVBQ3RDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDO2FBQzdELEVBQ0QsQ0FBQyxD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LEdBQVosVUFBYSxHQUFtQixFQUFFLE9BQVksSUFBUyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFFcEUsa0NBQWMsR0FBZCxVQUFlLEdBQXFCLEVBQUUsT0FBWTtvQkFDaEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7b0JBQ3JCLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakYsQ0FBQztnQkFFRCxzQ0FBa0IsR0FBbEIsVUFBbUIsR0FBeUIsRUFBRSxPQUFZO29CQUN4RCxNQUFNLElBQUksMEJBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2dCQUNuRCxDQUFDO2dCQUNILGdCQUFDO1lBQUQsQ0F2QkEsQUF1QkMsSUFBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvaTE4bi9leHBhbmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEh0bWxBc3QsXG4gIEh0bWxBc3RWaXNpdG9yLFxuICBIdG1sRWxlbWVudEFzdCxcbiAgSHRtbEF0dHJBc3QsXG4gIEh0bWxUZXh0QXN0LFxuICBIdG1sQ29tbWVudEFzdCxcbiAgSHRtbEV4cGFuc2lvbkFzdCxcbiAgSHRtbEV4cGFuc2lvbkNhc2VBc3QsXG4gIGh0bWxWaXNpdEFsbFxufSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvaHRtbF9hc3QnO1xuXG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5cblxuLyoqXG4gKiBFeHBhbmRzIHNwZWNpYWwgZm9ybXMgaW50byBlbGVtZW50cy5cbiAqXG4gKiBGb3IgZXhhbXBsZSxcbiAqXG4gKiBgYGBcbiAqIHsgbWVzc2FnZXMubGVuZ3RoLCBwbHVyYWwsXG4gKiAgID0wIHt6ZXJvfVxuICogICA9MSB7b25lfVxuICogICA9b3RoZXIge21vcmUgdGhhbiBvbmV9XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiB3aWxsIGJlIGV4cGFuZGVkIGludG9cbiAqXG4gKiBgYGBcbiAqIDx1bCBbbmdQbHVyYWxdPVwibWVzc2FnZXMubGVuZ3RoXCI+XG4gKiAgIDx0ZW1wbGF0ZSBbbmdQbHVyYWxDYXNlXT1cIjBcIj48bGkgaTE4bj1cInBsdXJhbF8wXCI+emVybzwvbGk+PC90ZW1wbGF0ZT5cbiAqICAgPHRlbXBsYXRlIFtuZ1BsdXJhbENhc2VdPVwiMVwiPjxsaSBpMThuPVwicGx1cmFsXzFcIj5vbmU8L2xpPjwvdGVtcGxhdGU+XG4gKiAgIDx0ZW1wbGF0ZSBbbmdQbHVyYWxDYXNlXT1cIm90aGVyXCI+PGxpIGkxOG49XCJwbHVyYWxfb3RoZXJcIj5tb3JlIHRoYW4gb25lPC9saT48L3RlbXBsYXRlPlxuICogPC91bD5cbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gZXhwYW5kTm9kZXMobm9kZXM6IEh0bWxBc3RbXSk6IEV4cGFuc2lvblJlc3VsdCB7XG4gIGxldCBlID0gbmV3IF9FeHBhbmRlcigpO1xuICBsZXQgbiA9IGh0bWxWaXNpdEFsbChlLCBub2Rlcyk7XG4gIHJldHVybiBuZXcgRXhwYW5zaW9uUmVzdWx0KG4sIGUuZXhwYW5kZWQpO1xufVxuXG5leHBvcnQgY2xhc3MgRXhwYW5zaW9uUmVzdWx0IHtcbiAgY29uc3RydWN0b3IocHVibGljIG5vZGVzOiBIdG1sQXN0W10sIHB1YmxpYyBleHBhbmRlZDogYm9vbGVhbikge31cbn1cblxuY2xhc3MgX0V4cGFuZGVyIGltcGxlbWVudHMgSHRtbEFzdFZpc2l0b3Ige1xuICBleHBhbmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgdmlzaXRFbGVtZW50KGFzdDogSHRtbEVsZW1lbnRBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIG5ldyBIdG1sRWxlbWVudEFzdChhc3QubmFtZSwgYXN0LmF0dHJzLCBodG1sVmlzaXRBbGwodGhpcywgYXN0LmNoaWxkcmVuKSwgYXN0LnNvdXJjZVNwYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3Quc3RhcnRTb3VyY2VTcGFuLCBhc3QuZW5kU291cmNlU3Bhbik7XG4gIH1cblxuICB2aXNpdEF0dHIoYXN0OiBIdG1sQXR0ckFzdCwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIGFzdDsgfVxuXG4gIHZpc2l0VGV4dChhc3Q6IEh0bWxUZXh0QXN0LCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gYXN0OyB9XG5cbiAgdmlzaXRDb21tZW50KGFzdDogSHRtbENvbW1lbnRBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBhc3Q7IH1cblxuICB2aXNpdEV4cGFuc2lvbihhc3Q6IEh0bWxFeHBhbnNpb25Bc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgdGhpcy5leHBhbmRlZCA9IHRydWU7XG4gICAgcmV0dXJuIGFzdC50eXBlID09IFwicGx1cmFsXCIgPyBfZXhwYW5kUGx1cmFsRm9ybShhc3QpIDogX2V4cGFuZERlZmF1bHRGb3JtKGFzdCk7XG4gIH1cblxuICB2aXNpdEV4cGFuc2lvbkNhc2UoYXN0OiBIdG1sRXhwYW5zaW9uQ2FzZUFzdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcIlNob3VsZCBub3QgYmUgcmVhY2hlZFwiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfZXhwYW5kUGx1cmFsRm9ybShhc3Q6IEh0bWxFeHBhbnNpb25Bc3QpOiBIdG1sRWxlbWVudEFzdCB7XG4gIGxldCBjaGlsZHJlbiA9IGFzdC5jYXNlcy5tYXAoYyA9PiB7XG4gICAgbGV0IGV4cGFuc2lvblJlc3VsdCA9IGV4cGFuZE5vZGVzKGMuZXhwcmVzc2lvbik7XG4gICAgbGV0IGkxOG5BdHRycyA9IGV4cGFuc2lvblJlc3VsdC5leHBhbmRlZCA/XG4gICAgICAgICAgICAgICAgICAgICAgICBbXSA6XG4gICAgICAgICAgICAgICAgICAgICAgICBbbmV3IEh0bWxBdHRyQXN0KFwiaTE4blwiLCBgJHthc3QudHlwZX1fJHtjLnZhbHVlfWAsIGMudmFsdWVTb3VyY2VTcGFuKV07XG5cbiAgICByZXR1cm4gbmV3IEh0bWxFbGVtZW50QXN0KGB0ZW1wbGF0ZWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBIdG1sQXR0ckFzdChcIm5nUGx1cmFsQ2FzZVwiLCBjLnZhbHVlLCBjLnZhbHVlU291cmNlU3BhbiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgSHRtbEVsZW1lbnRBc3QoYGxpYCwgaTE4bkF0dHJzLCBleHBhbnNpb25SZXN1bHQubm9kZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLnNvdXJjZVNwYW4sIGMuc291cmNlU3BhbiwgYy5zb3VyY2VTcGFuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMuc291cmNlU3BhbiwgYy5zb3VyY2VTcGFuLCBjLnNvdXJjZVNwYW4pO1xuICB9KTtcbiAgbGV0IHN3aXRjaEF0dHIgPSBuZXcgSHRtbEF0dHJBc3QoXCJbbmdQbHVyYWxdXCIsIGFzdC5zd2l0Y2hWYWx1ZSwgYXN0LnN3aXRjaFZhbHVlU291cmNlU3Bhbik7XG4gIHJldHVybiBuZXcgSHRtbEVsZW1lbnRBc3QoXCJ1bFwiLCBbc3dpdGNoQXR0cl0sIGNoaWxkcmVuLCBhc3Quc291cmNlU3BhbiwgYXN0LnNvdXJjZVNwYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN0LnNvdXJjZVNwYW4pO1xufVxuXG5mdW5jdGlvbiBfZXhwYW5kRGVmYXVsdEZvcm0oYXN0OiBIdG1sRXhwYW5zaW9uQXN0KTogSHRtbEVsZW1lbnRBc3Qge1xuICBsZXQgY2hpbGRyZW4gPSBhc3QuY2FzZXMubWFwKGMgPT4ge1xuICAgIGxldCBleHBhbnNpb25SZXN1bHQgPSBleHBhbmROb2RlcyhjLmV4cHJlc3Npb24pO1xuICAgIGxldCBpMThuQXR0cnMgPSBleHBhbnNpb25SZXN1bHQuZXhwYW5kZWQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgW10gOlxuICAgICAgICAgICAgICAgICAgICAgICAgW25ldyBIdG1sQXR0ckFzdChcImkxOG5cIiwgYCR7YXN0LnR5cGV9XyR7Yy52YWx1ZX1gLCBjLnZhbHVlU291cmNlU3BhbildO1xuXG4gICAgcmV0dXJuIG5ldyBIdG1sRWxlbWVudEFzdChgdGVtcGxhdGVgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgSHRtbEF0dHJBc3QoXCJuZ1N3aXRjaFdoZW5cIiwgYy52YWx1ZSwgYy52YWx1ZVNvdXJjZVNwYW4pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEh0bWxFbGVtZW50QXN0KGBsaWAsIGkxOG5BdHRycywgZXhwYW5zaW9uUmVzdWx0Lm5vZGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYy5zb3VyY2VTcGFuLCBjLnNvdXJjZVNwYW4sIGMuc291cmNlU3BhbilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLnNvdXJjZVNwYW4sIGMuc291cmNlU3BhbiwgYy5zb3VyY2VTcGFuKTtcbiAgfSk7XG4gIGxldCBzd2l0Y2hBdHRyID0gbmV3IEh0bWxBdHRyQXN0KFwiW25nU3dpdGNoXVwiLCBhc3Quc3dpdGNoVmFsdWUsIGFzdC5zd2l0Y2hWYWx1ZVNvdXJjZVNwYW4pO1xuICByZXR1cm4gbmV3IEh0bWxFbGVtZW50QXN0KFwidWxcIiwgW3N3aXRjaEF0dHJdLCBjaGlsZHJlbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC5zb3VyY2VTcGFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzdC5zb3VyY2VTcGFuKTtcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
