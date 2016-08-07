System.register(['angular2/src/core/di', 'angular2/src/facade/lang', './html_ast', './html_parser', './util'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var di_1, lang_1, html_ast_1, html_parser_1, util_1;
    var LONG_SYNTAX_REGEXP, SHORT_SYNTAX_REGEXP, VARIABLE_TPL_BINDING_REGEXP, TEMPLATE_SELECTOR_REGEXP, SPECIAL_PREFIXES_REGEXP, INTERPOLATION_REGEXP, SPECIAL_CASES, LegacyHtmlAstTransformer, LegacyHtmlParser;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (html_ast_1_1) {
                html_ast_1 = html_ast_1_1;
            },
            function (html_parser_1_1) {
                html_parser_1 = html_parser_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            }],
        execute: function() {
            LONG_SYNTAX_REGEXP = /^(?:on-(.*)|bindon-(.*)|bind-(.*)|var-(.*))$/ig;
            SHORT_SYNTAX_REGEXP = /^(?:\((.*)\)|\[\((.*)\)\]|\[(.*)\]|#(.*))$/ig;
            VARIABLE_TPL_BINDING_REGEXP = /(\bvar\s+|#)(\S+)/ig;
            TEMPLATE_SELECTOR_REGEXP = /^(\S+)/g;
            SPECIAL_PREFIXES_REGEXP = /^(class|style|attr)\./ig;
            INTERPOLATION_REGEXP = /\{\{.*?\}\}/g;
            SPECIAL_CASES = lang_1.CONST_EXPR([
                'ng-non-bindable',
                'ng-default-control',
                'ng-no-form',
            ]);
            /**
             * Convert templates to the case sensitive syntax
             *
             * @internal
             */
            LegacyHtmlAstTransformer = (function () {
                function LegacyHtmlAstTransformer(dashCaseSelectors) {
                    this.dashCaseSelectors = dashCaseSelectors;
                    this.rewrittenAst = [];
                    this.visitingTemplateEl = false;
                }
                LegacyHtmlAstTransformer.prototype.visitComment = function (ast, context) { return ast; };
                LegacyHtmlAstTransformer.prototype.visitElement = function (ast, context) {
                    var _this = this;
                    this.visitingTemplateEl = ast.name.toLowerCase() == 'template';
                    var attrs = ast.attrs.map(function (attr) { return attr.visit(_this, null); });
                    var children = ast.children.map(function (child) { return child.visit(_this, null); });
                    return new html_ast_1.HtmlElementAst(ast.name, attrs, children, ast.sourceSpan, ast.startSourceSpan, ast.endSourceSpan);
                };
                LegacyHtmlAstTransformer.prototype.visitAttr = function (originalAst, context) {
                    var ast = originalAst;
                    if (this.visitingTemplateEl) {
                        if (lang_1.isPresent(lang_1.RegExpWrapper.firstMatch(LONG_SYNTAX_REGEXP, ast.name))) {
                            // preserve the "-" in the prefix for the long syntax
                            ast = this._rewriteLongSyntax(ast);
                        }
                        else {
                            // rewrite any other attribute
                            var name_1 = util_1.dashCaseToCamelCase(ast.name);
                            ast = name_1 == ast.name ? ast : new html_ast_1.HtmlAttrAst(name_1, ast.value, ast.sourceSpan);
                        }
                    }
                    else {
                        ast = this._rewriteTemplateAttribute(ast);
                        ast = this._rewriteLongSyntax(ast);
                        ast = this._rewriteShortSyntax(ast);
                        ast = this._rewriteStar(ast);
                        ast = this._rewriteInterpolation(ast);
                        ast = this._rewriteSpecialCases(ast);
                    }
                    if (ast !== originalAst) {
                        this.rewrittenAst.push(ast);
                    }
                    return ast;
                };
                LegacyHtmlAstTransformer.prototype.visitText = function (ast, context) { return ast; };
                LegacyHtmlAstTransformer.prototype.visitExpansion = function (ast, context) {
                    var _this = this;
                    var cases = ast.cases.map(function (c) { return c.visit(_this, null); });
                    return new html_ast_1.HtmlExpansionAst(ast.switchValue, ast.type, cases, ast.sourceSpan, ast.switchValueSourceSpan);
                };
                LegacyHtmlAstTransformer.prototype.visitExpansionCase = function (ast, context) { return ast; };
                LegacyHtmlAstTransformer.prototype._rewriteLongSyntax = function (ast) {
                    var m = lang_1.RegExpWrapper.firstMatch(LONG_SYNTAX_REGEXP, ast.name);
                    var attrName = ast.name;
                    var attrValue = ast.value;
                    if (lang_1.isPresent(m)) {
                        if (lang_1.isPresent(m[1])) {
                            attrName = "on-" + util_1.dashCaseToCamelCase(m[1]);
                        }
                        else if (lang_1.isPresent(m[2])) {
                            attrName = "bindon-" + util_1.dashCaseToCamelCase(m[2]);
                        }
                        else if (lang_1.isPresent(m[3])) {
                            attrName = "bind-" + util_1.dashCaseToCamelCase(m[3]);
                        }
                        else if (lang_1.isPresent(m[4])) {
                            attrName = "var-" + util_1.dashCaseToCamelCase(m[4]);
                            attrValue = util_1.dashCaseToCamelCase(attrValue);
                        }
                    }
                    return attrName == ast.name && attrValue == ast.value ?
                        ast :
                        new html_ast_1.HtmlAttrAst(attrName, attrValue, ast.sourceSpan);
                };
                LegacyHtmlAstTransformer.prototype._rewriteTemplateAttribute = function (ast) {
                    var name = ast.name;
                    var value = ast.value;
                    if (name.toLowerCase() == 'template') {
                        name = 'template';
                        // rewrite the directive selector
                        value = lang_1.StringWrapper.replaceAllMapped(value, TEMPLATE_SELECTOR_REGEXP, function (m) { return util_1.dashCaseToCamelCase(m[1]); });
                        // rewrite the var declarations
                        value = lang_1.StringWrapper.replaceAllMapped(value, VARIABLE_TPL_BINDING_REGEXP, function (m) {
                            return "" + m[1].toLowerCase() + util_1.dashCaseToCamelCase(m[2]);
                        });
                    }
                    if (name == ast.name && value == ast.value) {
                        return ast;
                    }
                    return new html_ast_1.HtmlAttrAst(name, value, ast.sourceSpan);
                };
                LegacyHtmlAstTransformer.prototype._rewriteShortSyntax = function (ast) {
                    var m = lang_1.RegExpWrapper.firstMatch(SHORT_SYNTAX_REGEXP, ast.name);
                    var attrName = ast.name;
                    var attrValue = ast.value;
                    if (lang_1.isPresent(m)) {
                        if (lang_1.isPresent(m[1])) {
                            attrName = "(" + util_1.dashCaseToCamelCase(m[1]) + ")";
                        }
                        else if (lang_1.isPresent(m[2])) {
                            attrName = "[(" + util_1.dashCaseToCamelCase(m[2]) + ")]";
                        }
                        else if (lang_1.isPresent(m[3])) {
                            var prop = lang_1.StringWrapper.replaceAllMapped(m[3], SPECIAL_PREFIXES_REGEXP, function (m) { return m[1].toLowerCase() + '.'; });
                            if (prop.startsWith('class.') || prop.startsWith('attr.') || prop.startsWith('style.')) {
                                attrName = "[" + prop + "]";
                            }
                            else {
                                attrName = "[" + util_1.dashCaseToCamelCase(prop) + "]";
                            }
                        }
                        else if (lang_1.isPresent(m[4])) {
                            attrName = "#" + util_1.dashCaseToCamelCase(m[4]);
                            attrValue = util_1.dashCaseToCamelCase(attrValue);
                        }
                    }
                    return attrName == ast.name && attrValue == ast.value ?
                        ast :
                        new html_ast_1.HtmlAttrAst(attrName, attrValue, ast.sourceSpan);
                };
                LegacyHtmlAstTransformer.prototype._rewriteStar = function (ast) {
                    var attrName = ast.name;
                    var attrValue = ast.value;
                    if (attrName[0] == '*') {
                        attrName = util_1.dashCaseToCamelCase(attrName);
                        // rewrite the var declarations
                        attrValue = lang_1.StringWrapper.replaceAllMapped(attrValue, VARIABLE_TPL_BINDING_REGEXP, function (m) {
                            return "" + m[1].toLowerCase() + util_1.dashCaseToCamelCase(m[2]);
                        });
                    }
                    return attrName == ast.name && attrValue == ast.value ?
                        ast :
                        new html_ast_1.HtmlAttrAst(attrName, attrValue, ast.sourceSpan);
                };
                LegacyHtmlAstTransformer.prototype._rewriteInterpolation = function (ast) {
                    var hasInterpolation = lang_1.RegExpWrapper.test(INTERPOLATION_REGEXP, ast.value);
                    if (!hasInterpolation) {
                        return ast;
                    }
                    var name = ast.name;
                    if (!(name.startsWith('attr.') || name.startsWith('class.') || name.startsWith('style.'))) {
                        name = util_1.dashCaseToCamelCase(ast.name);
                    }
                    return name == ast.name ? ast : new html_ast_1.HtmlAttrAst(name, ast.value, ast.sourceSpan);
                };
                LegacyHtmlAstTransformer.prototype._rewriteSpecialCases = function (ast) {
                    var attrName = ast.name;
                    if (SPECIAL_CASES.indexOf(attrName) > -1) {
                        return new html_ast_1.HtmlAttrAst(util_1.dashCaseToCamelCase(attrName), ast.value, ast.sourceSpan);
                    }
                    if (lang_1.isPresent(this.dashCaseSelectors) && this.dashCaseSelectors.indexOf(attrName) > -1) {
                        return new html_ast_1.HtmlAttrAst(util_1.dashCaseToCamelCase(attrName), ast.value, ast.sourceSpan);
                    }
                    return ast;
                };
                return LegacyHtmlAstTransformer;
            }());
            exports_1("LegacyHtmlAstTransformer", LegacyHtmlAstTransformer);
            LegacyHtmlParser = (function (_super) {
                __extends(LegacyHtmlParser, _super);
                function LegacyHtmlParser() {
                    _super.apply(this, arguments);
                }
                LegacyHtmlParser.prototype.parse = function (sourceContent, sourceUrl, parseExpansionForms) {
                    if (parseExpansionForms === void 0) { parseExpansionForms = false; }
                    var transformer = new LegacyHtmlAstTransformer();
                    var htmlParseTreeResult = _super.prototype.parse.call(this, sourceContent, sourceUrl, parseExpansionForms);
                    var rootNodes = htmlParseTreeResult.rootNodes.map(function (node) { return node.visit(transformer, null); });
                    return transformer.rewrittenAst.length > 0 ?
                        new html_parser_1.HtmlParseTreeResult(rootNodes, htmlParseTreeResult.errors) :
                        htmlParseTreeResult;
                };
                LegacyHtmlParser = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], LegacyHtmlParser);
                return LegacyHtmlParser;
            }(html_parser_1.HtmlParser));
            exports_1("LegacyHtmlParser", LegacyHtmlParser);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9sZWdhY3lfdGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBd0JJLGtCQUFrQixFQUNsQixtQkFBbUIsRUFDbkIsMkJBQTJCLEVBQzNCLHdCQUF3QixFQUN4Qix1QkFBdUIsRUFDdkIsb0JBQW9CLEVBRWxCLGFBQWE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFQZixrQkFBa0IsR0FBRyxnREFBZ0QsQ0FBQztZQUN0RSxtQkFBbUIsR0FBRyw4Q0FBOEMsQ0FBQztZQUNyRSwyQkFBMkIsR0FBRyxxQkFBcUIsQ0FBQztZQUNwRCx3QkFBd0IsR0FBRyxTQUFTLENBQUM7WUFDckMsdUJBQXVCLEdBQUcseUJBQXlCLENBQUM7WUFDcEQsb0JBQW9CLEdBQUcsY0FBYyxDQUFDO1lBRXBDLGFBQWEsR0FBRyxpQkFBVSxDQUFDO2dCQUMvQixpQkFBaUI7Z0JBQ2pCLG9CQUFvQjtnQkFDcEIsWUFBWTthQUNiLENBQUMsQ0FBQztZQUVIOzs7O2VBSUc7WUFDSDtnQkFJRSxrQ0FBb0IsaUJBQTRCO29CQUE1QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQVc7b0JBSGhELGlCQUFZLEdBQWMsRUFBRSxDQUFDO29CQUM3Qix1QkFBa0IsR0FBWSxLQUFLLENBQUM7Z0JBRWUsQ0FBQztnQkFFcEQsK0NBQVksR0FBWixVQUFhLEdBQW1CLEVBQUUsT0FBWSxJQUFTLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUVwRSwrQ0FBWSxHQUFaLFVBQWEsR0FBbUIsRUFBRSxPQUFZO29CQUE5QyxpQkFNQztvQkFMQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxVQUFVLENBQUM7b0JBQy9ELElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEs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O29CQUFwQyxtQ0FBb0MsR0FBcEMsMkJBQW9DO29CQUN4QyxJQUFJLFdBQVcsR0FBRyxJQUFJLHdCQUF3QixFQUFFLENBQUM7b0JBQ2pELElBQUksbUJBQW1CLEdBQUcsZ0JBQUssQ0FBQyxLQUFLLFlBQUMsYUFBYSxFQUFFLFNBQVMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO29CQUVyRixJQUFJLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQTdCLENBQTZCLENBQUMsQ0FBQztvQkFFekYsTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUM7d0JBQy9CLElBQUksaUNBQW1CLENBQUMsU0FBUyxFQUFFLG1CQUFtQixDQUFDLE1BQU0sQ0FBQzt3QkFDOUQsbUJBQW1CLENBQUM7Z0JBQ2pDLENBQUM7Z0JBWkg7b0JBQUMsZUFBVSxFQUFFOztvQ0FBQTtnQkFhYix1QkFBQztZQUFELENBWkEsQUFZQyxDQVpxQyx3QkFBVSxHQVkvQztZQVpELCtDQVlDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL2xlZ2FjeV90ZW1wbGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgUHJvdmlkZXIsIHByb3ZpZGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcblxuaW1wb3J0IHtcbiAgU3RyaW5nV3JhcHBlcixcbiAgUmVnRXhwV3JhcHBlcixcbiAgQ09OU1RfRVhQUixcbiAgaXNCbGFuayxcbiAgaXNQcmVzZW50XG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbmltcG9ydCB7XG4gIEh0bWxBc3RWaXNpdG9yLFxuICBIdG1sQXR0ckFzdCxcbiAgSHRtbEVsZW1lbnRBc3QsXG4gIEh0bWxUZXh0QXN0LFxuICBIdG1sQ29tbWVudEFzdCxcbiAgSHRtbEV4cGFuc2lvbkFzdCxcbiAgSHRtbEV4cGFuc2lvbkNhc2VBc3QsXG4gIEh0bWxBc3Rcbn0gZnJvbSAnLi9odG1sX2FzdCc7XG5pbXBvcnQge0h0bWxQYXJzZXIsIEh0bWxQYXJzZVRyZWVSZXN1bHR9IGZyb20gJy4vaHRtbF9wYXJzZXInO1xuXG5pbXBvcnQge2Rhc2hDYXNlVG9DYW1lbENhc2UsIGNhbWVsQ2FzZVRvRGFzaENhc2V9IGZyb20gJy4vdXRpbCc7XG5cbnZhciBMT05HX1NZTlRBWF9SRUdFWFAgPSAvXig/Om9uLSguKil8YmluZG9uLSguKil8YmluZC0oLiopfHZhci0oLiopKSQvaWc7XG52YXIgU0hPUlRfU1lOVEFYX1JFR0VYUCA9IC9eKD86XFwoKC4qKVxcKXxcXFtcXCgoLiopXFwpXFxdfFxcWyguKilcXF18IyguKikpJC9pZztcbnZhciBWQVJJQUJMRV9UUExfQklORElOR19SRUdFWFAgPSAvKFxcYnZhclxccyt8IykoXFxTKykvaWc7XG52YXIgVEVNUExBVEVfU0VMRUNUT1JfUkVHRVhQID0gL14oXFxTKykvZztcbnZhciBTUEVDSUFMX1BSRUZJWEVTX1JFR0VYUCA9IC9eKGNsYXNzfHN0eWxlfGF0dHIpXFwuL2lnO1xudmFyIElOVEVSUE9MQVRJT05fUkVHRVhQID0gL1xce1xcey4qP1xcfVxcfS9nO1xuXG5jb25zdCBTUEVDSUFMX0NBU0VTID0gQ09OU1RfRVhQUihbXG4gICduZy1ub24tYmluZGFibGUnLFxuICAnbmctZGVmYXVsdC1jb250cm9sJyxcbiAgJ25nLW5vLWZvcm0nLFxuXSk7XG5cbi8qKlxuICogQ29udmVydCB0ZW1wbGF0ZXMgdG8gdGhlIGNhc2Ugc2Vuc2l0aXZlIHN5bnRheFxuICpcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY2xhc3MgTGVnYWN5SHRtbEFzdFRyYW5zZm9ybWVyIGltcGxlbWVudHMgSHRtbEFzdFZpc2l0b3Ige1xuICByZXdyaXR0ZW5Bc3Q6IEh0bWxBc3RbXSA9IFtdO1xuICB2aXNpdGluZ1RlbXBsYXRlRWw6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhc2hDYXNlU2VsZWN0b3JzPzogc3RyaW5nW10pIHt9XG5cbiAgdmlzaXRDb21tZW50KGFzdDogSHRtbENvbW1lbnRBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBhc3Q7IH1cblxuICB2aXNpdEVsZW1lbnQoYXN0OiBIdG1sRWxlbWVudEFzdCwgY29udGV4dDogYW55KTogSHRtbEVsZW1lbnRBc3Qge1xuICAgIHRoaXMudmlzaXRpbmdUZW1wbGF0ZUVsID0gYXN0Lm5hbWUudG9Mb3dlckNhc2UoKSA9PSAndGVtcGxhdGUnO1xuICAgIGxldCBhdHRycyA9IGFzdC5hdHRycy5tYXAoYXR0ciA9PiBhdHRyLnZpc2l0KHRoaXMsIG51bGwpKTtcbiAgICBsZXQgY2hpbGRyZW4gPSBhc3QuY2hpbGRyZW4ubWFwKGNoaWxkID0+IGNoaWxkLnZpc2l0KHRoaXMsIG51bGwpKTtcbiAgICByZXR1cm4gbmV3IEh0bWxFbGVtZW50QXN0KGFzdC5uYW1lLCBhdHRycywgY2hpbGRyZW4sIGFzdC5zb3VyY2VTcGFuLCBhc3Quc3RhcnRTb3VyY2VTcGFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN0LmVuZFNvdXJjZVNwYW4pO1xuICB9XG5cbiAgdmlzaXRBdHRyKG9yaWdpbmFsQXN0OiBIdG1sQXR0ckFzdCwgY29udGV4dDogYW55KTogSHRtbEF0dHJBc3Qge1xuICAgIGxldCBhc3QgPSBvcmlnaW5hbEFzdDtcblxuICAgIGlmICh0aGlzLnZpc2l0aW5nVGVtcGxhdGVFbCkge1xuICAgICAgaWYgKGlzUHJlc2VudChSZWdFeHBXcmFwcGVyLmZpcnN0TWF0Y2goTE9OR19TWU5UQVhfUkVHRVhQLCBhc3QubmFtZSkpKSB7XG4gICAgICAgIC8vIHByZXNlcnZlIHRoZSBcIi1cIiBpbiB0aGUgcHJlZml4IGZvciB0aGUgbG9uZyBzeW50YXhcbiAgICAgICAgYXN0ID0gdGhpcy5fcmV3cml0ZUxvbmdTeW50YXgoYXN0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHJld3JpdGUgYW55IG90aGVyIGF0dHJpYnV0ZVxuICAgICAgICBsZXQgbmFtZSA9IGRhc2hDYXNlVG9DYW1lbENhc2UoYXN0Lm5hbWUpO1xuICAgICAgICBhc3QgPSBuYW1lID09IGFzdC5uYW1lID8gYXN0IDogbmV3IEh0bWxBdHRyQXN0KG5hbWUsIGFzdC52YWx1ZSwgYXN0LnNvdXJjZVNwYW4pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBhc3QgPSB0aGlzLl9yZXdyaXRlVGVtcGxhdGVBdHRyaWJ1dGUoYXN0KTtcbiAgICAgIGFzdCA9IHRoaXMuX3Jld3JpdGVMb25nU3ludGF4KGFzdCk7XG4gICAgICBhc3QgPSB0aGlzLl9yZXdyaXRlU2hvcnRTeW50YXgoYXN0KTtcbiAgICAgIGFzdCA9IHRoaXMuX3Jld3JpdGVTdGFyKGFzdCk7XG4gICAgICBhc3QgPSB0aGlzLl9yZXdyaXRlSW50ZXJwb2xhdGlvbihhc3QpO1xuICAgICAgYXN0ID0gdGhpcy5fcmV3cml0ZVNwZWNpYWxDYXNlcyhhc3QpO1xuICAgIH1cblxuICAgIGlmIChhc3QgIT09IG9yaWdpbmFsQXN0KSB7XG4gICAgICB0aGlzLnJld3JpdHRlbkFzdC5wdXNoKGFzdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFzdDtcbiAgfVxuXG4gIHZpc2l0VGV4dChhc3Q6IEh0bWxUZXh0QXN0LCBjb250ZXh0OiBhbnkpOiBIdG1sVGV4dEFzdCB7IHJldHVybiBhc3Q7IH1cblxuICB2aXNpdEV4cGFuc2lvbihhc3Q6IEh0bWxFeHBhbnNpb25Bc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgbGV0IGNhc2VzID0gYXN0LmNhc2VzLm1hcChjID0+IGMudmlzaXQodGhpcywgbnVsbCkpO1xuICAgIHJldHVybiBuZXcgSHRtbEV4cGFuc2lvbkFzdChhc3Quc3dpdGNoVmFsdWUsIGFzdC50eXBlLCBjYXNlcywgYXN0LnNvdXJjZVNwYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzdC5zd2l0Y2hWYWx1ZVNvdXJjZVNwYW4pO1xuICB9XG5cbiAgdmlzaXRFeHBhbnNpb25DYXNlKGFzdDogSHRtbEV4cGFuc2lvbkNhc2VBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBhc3Q7IH1cblxuICBwcml2YXRlIF9yZXdyaXRlTG9uZ1N5bnRheChhc3Q6IEh0bWxBdHRyQXN0KTogSHRtbEF0dHJBc3Qge1xuICAgIGxldCBtID0gUmVnRXhwV3JhcHBlci5maXJzdE1hdGNoKExPTkdfU1lOVEFYX1JFR0VYUCwgYXN0Lm5hbWUpO1xuICAgIGxldCBhdHRyTmFtZSA9IGFzdC5uYW1lO1xuICAgIGxldCBhdHRyVmFsdWUgPSBhc3QudmFsdWU7XG5cbiAgICBpZiAoaXNQcmVzZW50KG0pKSB7XG4gICAgICBpZiAoaXNQcmVzZW50KG1bMV0pKSB7XG4gICAgICAgIGF0dHJOYW1lID0gYG9uLSR7ZGFzaENhc2VUb0NhbWVsQ2FzZShtWzFdKX1gO1xuICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQobVsyXSkpIHtcbiAgICAgICAgYXR0ck5hbWUgPSBgYmluZG9uLSR7ZGFzaENhc2VUb0NhbWVsQ2FzZShtWzJdKX1gO1xuICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQobVszXSkpIHtcbiAgICAgICAgYXR0ck5hbWUgPSBgYmluZC0ke2Rhc2hDYXNlVG9DYW1lbENhc2UobVszXSl9YDtcbiAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KG1bNF0pKSB7XG4gICAgICAgIGF0dHJOYW1lID0gYHZhci0ke2Rhc2hDYXNlVG9DYW1lbENhc2UobVs0XSl9YDtcbiAgICAgICAgYXR0clZhbHVlID0gZGFzaENhc2VUb0NhbWVsQ2FzZShhdHRyVmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhdHRyTmFtZSA9PSBhc3QubmFtZSAmJiBhdHRyVmFsdWUgPT0gYXN0LnZhbHVlID9cbiAgICAgICAgICAgICAgIGFzdCA6XG4gICAgICAgICAgICAgICBuZXcgSHRtbEF0dHJBc3QoYXR0ck5hbWUsIGF0dHJWYWx1ZSwgYXN0LnNvdXJjZVNwYW4pO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmV3cml0ZVRlbXBsYXRlQXR0cmlidXRlKGFzdDogSHRtbEF0dHJBc3QpOiBIdG1sQXR0ckFzdCB7XG4gICAgbGV0IG5hbWUgPSBhc3QubmFtZTtcbiAgICBsZXQgdmFsdWUgPSBhc3QudmFsdWU7XG5cbiAgICBpZiAobmFtZS50b0xvd2VyQ2FzZSgpID09ICd0ZW1wbGF0ZScpIHtcbiAgICAgIG5hbWUgPSAndGVtcGxhdGUnO1xuXG4gICAgICAvLyByZXdyaXRlIHRoZSBkaXJlY3RpdmUgc2VsZWN0b3JcbiAgICAgIHZhbHVlID0gU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsTWFwcGVkKHZhbHVlLCBURU1QTEFURV9TRUxFQ1RPUl9SRUdFWFAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobSkgPT4geyByZXR1cm4gZGFzaENhc2VUb0NhbWVsQ2FzZShtWzFdKTsgfSk7XG5cbiAgICAgIC8vIHJld3JpdGUgdGhlIHZhciBkZWNsYXJhdGlvbnNcbiAgICAgIHZhbHVlID0gU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsTWFwcGVkKHZhbHVlLCBWQVJJQUJMRV9UUExfQklORElOR19SRUdFWFAsIG0gPT4ge1xuICAgICAgICByZXR1cm4gYCR7bVsxXS50b0xvd2VyQ2FzZSgpfSR7ZGFzaENhc2VUb0NhbWVsQ2FzZShtWzJdKX1gO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKG5hbWUgPT0gYXN0Lm5hbWUgJiYgdmFsdWUgPT0gYXN0LnZhbHVlKSB7XG4gICAgICByZXR1cm4gYXN0O1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgSHRtbEF0dHJBc3QobmFtZSwgdmFsdWUsIGFzdC5zb3VyY2VTcGFuKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Jld3JpdGVTaG9ydFN5bnRheChhc3Q6IEh0bWxBdHRyQXN0KTogSHRtbEF0dHJBc3Qge1xuICAgIGxldCBtID0gUmVnRXhwV3JhcHBlci5maXJzdE1hdGNoKFNIT1JUX1NZTlRBWF9SRUdFWFAsIGFzdC5uYW1lKTtcbiAgICBsZXQgYXR0ck5hbWUgPSBhc3QubmFtZTtcbiAgICBsZXQgYXR0clZhbHVlID0gYXN0LnZhbHVlO1xuXG4gICAgaWYgKGlzUHJlc2VudChtKSkge1xuICAgICAgaWYgKGlzUHJlc2VudChtWzFdKSkge1xuICAgICAgICBhdHRyTmFtZSA9IGAoJHtkYXNoQ2FzZVRvQ2FtZWxDYXNlKG1bMV0pfSlgO1xuICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQobVsyXSkpIHtcbiAgICAgICAgYXR0ck5hbWUgPSBgWygke2Rhc2hDYXNlVG9DYW1lbENhc2UobVsyXSl9KV1gO1xuICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQobVszXSkpIHtcbiAgICAgICAgbGV0IHByb3AgPSBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGxNYXBwZWQobVszXSwgU1BFQ0lBTF9QUkVGSVhFU19SRUdFWFAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtKSA9PiB7IHJldHVybiBtWzFdLnRvTG93ZXJDYXNlKCkgKyAnLic7IH0pO1xuXG4gICAgICAgIGlmIChwcm9wLnN0YXJ0c1dpdGgoJ2NsYXNzLicpIHx8IHByb3Auc3RhcnRzV2l0aCgnYXR0ci4nKSB8fCBwcm9wLnN0YXJ0c1dpdGgoJ3N0eWxlLicpKSB7XG4gICAgICAgICAgYXR0ck5hbWUgPSBgWyR7cHJvcH1dYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhdHRyTmFtZSA9IGBbJHtkYXNoQ2FzZVRvQ2FtZWxDYXNlKHByb3ApfV1gO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudChtWzRdKSkge1xuICAgICAgICBhdHRyTmFtZSA9IGAjJHtkYXNoQ2FzZVRvQ2FtZWxDYXNlKG1bNF0pfWA7XG4gICAgICAgIGF0dHJWYWx1ZSA9IGRhc2hDYXNlVG9DYW1lbENhc2UoYXR0clZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYXR0ck5hbWUgPT0gYXN0Lm5hbWUgJiYgYXR0clZhbHVlID09IGFzdC52YWx1ZSA/XG4gICAgICAgICAgICAgICBhc3QgOlxuICAgICAgICAgICAgICAgbmV3IEh0bWxBdHRyQXN0KGF0dHJOYW1lLCBhdHRyVmFsdWUsIGFzdC5zb3VyY2VTcGFuKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Jld3JpdGVTdGFyKGFzdDogSHRtbEF0dHJBc3QpOiBIdG1sQXR0ckFzdCB7XG4gICAgbGV0IGF0dHJOYW1lID0gYXN0Lm5hbWU7XG4gICAgbGV0IGF0dHJWYWx1ZSA9IGFzdC52YWx1ZTtcblxuICAgIGlmIChhdHRyTmFtZVswXSA9PSAnKicpIHtcbiAgICAgIGF0dHJOYW1lID0gZGFzaENhc2VUb0NhbWVsQ2FzZShhdHRyTmFtZSk7XG4gICAgICAvLyByZXdyaXRlIHRoZSB2YXIgZGVjbGFyYXRpb25zXG4gICAgICBhdHRyVmFsdWUgPSBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGxNYXBwZWQoYXR0clZhbHVlLCBWQVJJQUJMRV9UUExfQklORElOR19SRUdFWFAsIG0gPT4ge1xuICAgICAgICByZXR1cm4gYCR7bVsxXS50b0xvd2VyQ2FzZSgpfSR7ZGFzaENhc2VUb0NhbWVsQ2FzZShtWzJdKX1gO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGF0dHJOYW1lID09IGFzdC5uYW1lICYmIGF0dHJWYWx1ZSA9PSBhc3QudmFsdWUgP1xuICAgICAgICAgICAgICAgYXN0IDpcbiAgICAgICAgICAgICAgIG5ldyBIdG1sQXR0ckFzdChhdHRyTmFtZSwgYXR0clZhbHVlLCBhc3Quc291cmNlU3Bhbik7XG4gIH1cblxuICBwcml2YXRlIF9yZXdyaXRlSW50ZXJwb2xhdGlvbihhc3Q6IEh0bWxBdHRyQXN0KTogSHRtbEF0dHJBc3Qge1xuICAgIGxldCBoYXNJbnRlcnBvbGF0aW9uID0gUmVnRXhwV3JhcHBlci50ZXN0KElOVEVSUE9MQVRJT05fUkVHRVhQLCBhc3QudmFsdWUpO1xuXG4gICAgaWYgKCFoYXNJbnRlcnBvbGF0aW9uKSB7XG4gICAgICByZXR1cm4gYXN0O1xuICAgIH1cblxuICAgIGxldCBuYW1lID0gYXN0Lm5hbWU7XG5cbiAgICBpZiAoIShuYW1lLnN0YXJ0c1dpdGgoJ2F0dHIuJykgfHwgbmFtZS5zdGFydHNXaXRoKCdjbGFzcy4nKSB8fCBuYW1lLnN0YXJ0c1dpdGgoJ3N0eWxlLicpKSkge1xuICAgICAgbmFtZSA9IGRhc2hDYXNlVG9DYW1lbENhc2UoYXN0Lm5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiBuYW1lID09IGFzdC5uYW1lID8gYXN0IDogbmV3IEh0bWxBdHRyQXN0KG5hbWUsIGFzdC52YWx1ZSwgYXN0LnNvdXJjZVNwYW4pO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmV3cml0ZVNwZWNpYWxDYXNlcyhhc3Q6IEh0bWxBdHRyQXN0KTogSHRtbEF0dHJBc3Qge1xuICAgIGxldCBhdHRyTmFtZSA9IGFzdC5uYW1lO1xuXG4gICAgaWYgKFNQRUNJQUxfQ0FTRVMuaW5kZXhPZihhdHRyTmFtZSkgPiAtMSkge1xuICAgICAgcmV0dXJuIG5ldyBIdG1sQXR0ckFzdChkYXNoQ2FzZVRvQ2FtZWxDYXNlKGF0dHJOYW1lKSwgYXN0LnZhbHVlLCBhc3Quc291cmNlU3Bhbik7XG4gICAgfVxuXG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLmRhc2hDYXNlU2VsZWN0b3JzKSAmJiB0aGlzLmRhc2hDYXNlU2VsZWN0b3JzLmluZGV4T2YoYXR0ck5hbWUpID4gLTEpIHtcbiAgICAgIHJldHVybiBuZXcgSHRtbEF0dHJBc3QoZGFzaENhc2VUb0NhbWVsQ2FzZShhdHRyTmFtZSksIGFzdC52YWx1ZSwgYXN0LnNvdXJjZVNwYW4pO1xuICAgIH1cblxuICAgIHJldHVybiBhc3Q7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExlZ2FjeUh0bWxQYXJzZXIgZXh0ZW5kcyBIdG1sUGFyc2VyIHtcbiAgcGFyc2Uoc291cmNlQ29udGVudDogc3RyaW5nLCBzb3VyY2VVcmw6IHN0cmluZyxcbiAgICAgICAgcGFyc2VFeHBhbnNpb25Gb3JtczogYm9vbGVhbiA9IGZhbHNlKTogSHRtbFBhcnNlVHJlZVJlc3VsdCB7XG4gICAgbGV0IHRyYW5zZm9ybWVyID0gbmV3IExlZ2FjeUh0bWxBc3RUcmFuc2Zvcm1lcigpO1xuICAgIGxldCBodG1sUGFyc2VUcmVlUmVzdWx0ID0gc3VwZXIucGFyc2Uoc291cmNlQ29udGVudCwgc291cmNlVXJsLCBwYXJzZUV4cGFuc2lvbkZvcm1zKTtcblxuICAgIGxldCByb290Tm9kZXMgPSBodG1sUGFyc2VUcmVlUmVzdWx0LnJvb3ROb2Rlcy5tYXAobm9kZSA9PiBub2RlLnZpc2l0KHRyYW5zZm9ybWVyLCBudWxsKSk7XG5cbiAgICByZXR1cm4gdHJhbnNmb3JtZXIucmV3cml0dGVuQXN0Lmxlbmd0aCA+IDAgP1xuICAgICAgICAgICAgICAgbmV3IEh0bWxQYXJzZVRyZWVSZXN1bHQocm9vdE5vZGVzLCBodG1sUGFyc2VUcmVlUmVzdWx0LmVycm9ycykgOlxuICAgICAgICAgICAgICAgaHRtbFBhcnNlVHJlZVJlc3VsdDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
