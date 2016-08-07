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
                LegacyHtmlParser.prototype.parse = function (sourceContent, sourceUrl) {
                    var transformer = new LegacyHtmlAstTransformer();
                    var htmlParseTreeResult = _super.prototype.parse.call(this, sourceContent, sourceUrl);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL2xlZ2FjeV90ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFzQkksa0JBQWtCLEVBQ2xCLG1CQUFtQixFQUNuQiwyQkFBMkIsRUFDM0Isd0JBQXdCLEVBQ3hCLHVCQUF1QixFQUN2QixvQkFBb0IsRUFFbEIsYUFBYTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQVBmLGtCQUFrQixHQUFHLGdEQUFnRCxDQUFDO1lBQ3RFLG1CQUFtQixHQUFHLDhDQUE4QyxDQUFDO1lBQ3JFLDJCQUEyQixHQUFHLHFCQUFxQixDQUFDO1lBQ3BELHdCQUF3QixHQUFHLFNBQVMsQ0FBQztZQUNyQyx1QkFBdUIsR0FBRyx5QkFBeUIsQ0FBQztZQUNwRCxvQkFBb0IsR0FBRyxjQUFjLENBQUM7WUFFcEMsYUFBYSxHQUFHLGlCQUFVLENBQUM7Z0JBQy9CLGlCQUFpQjtnQkFDakIsb0JBQW9CO2dCQUNwQixZQUFZO2FBQ2IsQ0FBQyxDQUFDO1lBRUg7Ozs7ZUFJRztZQUNIO2dCQUlFLGtDQUFvQixpQkFBNEI7b0JBQTVCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBVztvQkFIaEQsaUJBQVksR0FBYyxFQUFFLENBQUM7b0JBQzdCLHVCQUFrQixHQUFZLEtBQUssQ0FBQztnQkFFZSxDQUFDO2dCQUVwRCwrQ0FBWSxHQUFaLFVBQWEsR0FBbUIsRUFBRSxPQUFZLElBQVMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBRXBFLCtDQUFZLEdBQVosVUFBYSxHQUFtQixFQUFFLE9BQVk7b0JBQTlDLGlCQU1DO29CQUxDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLFVBQVUsQ0FBQztvQkFDL0QsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJLElBQUks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b0NBQUE7Z0JBWWIsdUJBQUM7WUFBRCxDQVhBLEFBV0MsQ0FYcUMsd0JBQVUsR0FXL0M7WUFYRCwrQ0FXQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL2xlZ2FjeV90ZW1wbGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgUHJvdmlkZXIsIHByb3ZpZGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcblxuaW1wb3J0IHtcbiAgU3RyaW5nV3JhcHBlcixcbiAgUmVnRXhwV3JhcHBlcixcbiAgQ09OU1RfRVhQUixcbiAgaXNCbGFuayxcbiAgaXNQcmVzZW50XG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbmltcG9ydCB7XG4gIEh0bWxBc3RWaXNpdG9yLFxuICBIdG1sQXR0ckFzdCxcbiAgSHRtbEVsZW1lbnRBc3QsXG4gIEh0bWxUZXh0QXN0LFxuICBIdG1sQ29tbWVudEFzdCxcbiAgSHRtbEFzdFxufSBmcm9tICcuL2h0bWxfYXN0JztcbmltcG9ydCB7SHRtbFBhcnNlciwgSHRtbFBhcnNlVHJlZVJlc3VsdH0gZnJvbSAnLi9odG1sX3BhcnNlcic7XG5cbmltcG9ydCB7ZGFzaENhc2VUb0NhbWVsQ2FzZSwgY2FtZWxDYXNlVG9EYXNoQ2FzZX0gZnJvbSAnLi91dGlsJztcblxudmFyIExPTkdfU1lOVEFYX1JFR0VYUCA9IC9eKD86b24tKC4qKXxiaW5kb24tKC4qKXxiaW5kLSguKil8dmFyLSguKikpJC9pZztcbnZhciBTSE9SVF9TWU5UQVhfUkVHRVhQID0gL14oPzpcXCgoLiopXFwpfFxcW1xcKCguKilcXClcXF18XFxbKC4qKVxcXXwjKC4qKSkkL2lnO1xudmFyIFZBUklBQkxFX1RQTF9CSU5ESU5HX1JFR0VYUCA9IC8oXFxidmFyXFxzK3wjKShcXFMrKS9pZztcbnZhciBURU1QTEFURV9TRUxFQ1RPUl9SRUdFWFAgPSAvXihcXFMrKS9nO1xudmFyIFNQRUNJQUxfUFJFRklYRVNfUkVHRVhQID0gL14oY2xhc3N8c3R5bGV8YXR0cilcXC4vaWc7XG52YXIgSU5URVJQT0xBVElPTl9SRUdFWFAgPSAvXFx7XFx7Lio/XFx9XFx9L2c7XG5cbmNvbnN0IFNQRUNJQUxfQ0FTRVMgPSBDT05TVF9FWFBSKFtcbiAgJ25nLW5vbi1iaW5kYWJsZScsXG4gICduZy1kZWZhdWx0LWNvbnRyb2wnLFxuICAnbmctbm8tZm9ybScsXG5dKTtcblxuLyoqXG4gKiBDb252ZXJ0IHRlbXBsYXRlcyB0byB0aGUgY2FzZSBzZW5zaXRpdmUgc3ludGF4XG4gKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjbGFzcyBMZWdhY3lIdG1sQXN0VHJhbnNmb3JtZXIgaW1wbGVtZW50cyBIdG1sQXN0VmlzaXRvciB7XG4gIHJld3JpdHRlbkFzdDogSHRtbEFzdFtdID0gW107XG4gIHZpc2l0aW5nVGVtcGxhdGVFbDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGFzaENhc2VTZWxlY3RvcnM/OiBzdHJpbmdbXSkge31cblxuICB2aXNpdENvbW1lbnQoYXN0OiBIdG1sQ29tbWVudEFzdCwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIGFzdDsgfVxuXG4gIHZpc2l0RWxlbWVudChhc3Q6IEh0bWxFbGVtZW50QXN0LCBjb250ZXh0OiBhbnkpOiBIdG1sRWxlbWVudEFzdCB7XG4gICAgdGhpcy52aXNpdGluZ1RlbXBsYXRlRWwgPSBhc3QubmFtZS50b0xvd2VyQ2FzZSgpID09ICd0ZW1wbGF0ZSc7XG4gICAgbGV0IGF0dHJzID0gYXN0LmF0dHJzLm1hcChhdHRyID0+IGF0dHIudmlzaXQodGhpcywgbnVsbCkpO1xuICAgIGxldCBjaGlsZHJlbiA9IGFzdC5jaGlsZHJlbi5tYXAoY2hpbGQgPT4gY2hpbGQudmlzaXQodGhpcywgbnVsbCkpO1xuICAgIHJldHVybiBuZXcgSHRtbEVsZW1lbnRBc3QoYXN0Lm5hbWUsIGF0dHJzLCBjaGlsZHJlbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC5zdGFydFNvdXJjZVNwYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3QuZW5kU291cmNlU3Bhbik7XG4gIH1cblxuICB2aXNpdEF0dHIob3JpZ2luYWxBc3Q6IEh0bWxBdHRyQXN0LCBjb250ZXh0OiBhbnkpOiBIdG1sQXR0ckFzdCB7XG4gICAgbGV0IGFzdCA9IG9yaWdpbmFsQXN0O1xuXG4gICAgaWYgKHRoaXMudmlzaXRpbmdUZW1wbGF0ZUVsKSB7XG4gICAgICBpZiAoaXNQcmVzZW50KFJlZ0V4cFdyYXBwZXIuZmlyc3RNYXRjaChMT05HX1NZTlRBWF9SRUdFWFAsIGFzdC5uYW1lKSkpIHtcbiAgICAgICAgLy8gcHJlc2VydmUgdGhlIFwiLVwiIGluIHRoZSBwcmVmaXggZm9yIHRoZSBsb25nIHN5bnRheFxuICAgICAgICBhc3QgPSB0aGlzLl9yZXdyaXRlTG9uZ1N5bnRheChhc3QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcmV3cml0ZSBhbnkgb3RoZXIgYXR0cmlidXRlXG4gICAgICAgIGxldCBuYW1lID0gZGFzaENhc2VUb0NhbWVsQ2FzZShhc3QubmFtZSk7XG4gICAgICAgIGFzdCA9IG5hbWUgPT0gYXN0Lm5hbWUgPyBhc3QgOiBuZXcgSHRtbEF0dHJBc3QobmFtZSwgYXN0LnZhbHVlLCBhc3Quc291cmNlU3Bhbik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGFzdCA9IHRoaXMuX3Jld3JpdGVUZW1wbGF0ZUF0dHJpYnV0ZShhc3QpO1xuICAgICAgYXN0ID0gdGhpcy5fcmV3cml0ZUxvbmdTeW50YXgoYXN0KTtcbiAgICAgIGFzdCA9IHRoaXMuX3Jld3JpdGVTaG9ydFN5bnRheChhc3QpO1xuICAgICAgYXN0ID0gdGhpcy5fcmV3cml0ZVN0YXIoYXN0KTtcbiAgICAgIGFzdCA9IHRoaXMuX3Jld3JpdGVJbnRlcnBvbGF0aW9uKGFzdCk7XG4gICAgICBhc3QgPSB0aGlzLl9yZXdyaXRlU3BlY2lhbENhc2VzKGFzdCk7XG4gICAgfVxuXG4gICAgaWYgKGFzdCAhPT0gb3JpZ2luYWxBc3QpIHtcbiAgICAgIHRoaXMucmV3cml0dGVuQXN0LnB1c2goYXN0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgdmlzaXRUZXh0KGFzdDogSHRtbFRleHRBc3QsIGNvbnRleHQ6IGFueSk6IEh0bWxUZXh0QXN0IHsgcmV0dXJuIGFzdDsgfVxuXG4gIHByaXZhdGUgX3Jld3JpdGVMb25nU3ludGF4KGFzdDogSHRtbEF0dHJBc3QpOiBIdG1sQXR0ckFzdCB7XG4gICAgbGV0IG0gPSBSZWdFeHBXcmFwcGVyLmZpcnN0TWF0Y2goTE9OR19TWU5UQVhfUkVHRVhQLCBhc3QubmFtZSk7XG4gICAgbGV0IGF0dHJOYW1lID0gYXN0Lm5hbWU7XG4gICAgbGV0IGF0dHJWYWx1ZSA9IGFzdC52YWx1ZTtcblxuICAgIGlmIChpc1ByZXNlbnQobSkpIHtcbiAgICAgIGlmIChpc1ByZXNlbnQobVsxXSkpIHtcbiAgICAgICAgYXR0ck5hbWUgPSBgb24tJHtkYXNoQ2FzZVRvQ2FtZWxDYXNlKG1bMV0pfWA7XG4gICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudChtWzJdKSkge1xuICAgICAgICBhdHRyTmFtZSA9IGBiaW5kb24tJHtkYXNoQ2FzZVRvQ2FtZWxDYXNlKG1bMl0pfWA7XG4gICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudChtWzNdKSkge1xuICAgICAgICBhdHRyTmFtZSA9IGBiaW5kLSR7ZGFzaENhc2VUb0NhbWVsQ2FzZShtWzNdKX1gO1xuICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQobVs0XSkpIHtcbiAgICAgICAgYXR0ck5hbWUgPSBgdmFyLSR7ZGFzaENhc2VUb0NhbWVsQ2FzZShtWzRdKX1gO1xuICAgICAgICBhdHRyVmFsdWUgPSBkYXNoQ2FzZVRvQ2FtZWxDYXNlKGF0dHJWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGF0dHJOYW1lID09IGFzdC5uYW1lICYmIGF0dHJWYWx1ZSA9PSBhc3QudmFsdWUgP1xuICAgICAgICAgICAgICAgYXN0IDpcbiAgICAgICAgICAgICAgIG5ldyBIdG1sQXR0ckFzdChhdHRyTmFtZSwgYXR0clZhbHVlLCBhc3Quc291cmNlU3Bhbik7XG4gIH1cblxuICBwcml2YXRlIF9yZXdyaXRlVGVtcGxhdGVBdHRyaWJ1dGUoYXN0OiBIdG1sQXR0ckFzdCk6IEh0bWxBdHRyQXN0IHtcbiAgICBsZXQgbmFtZSA9IGFzdC5uYW1lO1xuICAgIGxldCB2YWx1ZSA9IGFzdC52YWx1ZTtcblxuICAgIGlmIChuYW1lLnRvTG93ZXJDYXNlKCkgPT0gJ3RlbXBsYXRlJykge1xuICAgICAgbmFtZSA9ICd0ZW1wbGF0ZSc7XG5cbiAgICAgIC8vIHJld3JpdGUgdGhlIGRpcmVjdGl2ZSBzZWxlY3RvclxuICAgICAgdmFsdWUgPSBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGxNYXBwZWQodmFsdWUsIFRFTVBMQVRFX1NFTEVDVE9SX1JFR0VYUCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtKSA9PiB7IHJldHVybiBkYXNoQ2FzZVRvQ2FtZWxDYXNlKG1bMV0pOyB9KTtcblxuICAgICAgLy8gcmV3cml0ZSB0aGUgdmFyIGRlY2xhcmF0aW9uc1xuICAgICAgdmFsdWUgPSBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGxNYXBwZWQodmFsdWUsIFZBUklBQkxFX1RQTF9CSU5ESU5HX1JFR0VYUCwgbSA9PiB7XG4gICAgICAgIHJldHVybiBgJHttWzFdLnRvTG93ZXJDYXNlKCl9JHtkYXNoQ2FzZVRvQ2FtZWxDYXNlKG1bMl0pfWA7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAobmFtZSA9PSBhc3QubmFtZSAmJiB2YWx1ZSA9PSBhc3QudmFsdWUpIHtcbiAgICAgIHJldHVybiBhc3Q7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBIdG1sQXR0ckFzdChuYW1lLCB2YWx1ZSwgYXN0LnNvdXJjZVNwYW4pO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmV3cml0ZVNob3J0U3ludGF4KGFzdDogSHRtbEF0dHJBc3QpOiBIdG1sQXR0ckFzdCB7XG4gICAgbGV0IG0gPSBSZWdFeHBXcmFwcGVyLmZpcnN0TWF0Y2goU0hPUlRfU1lOVEFYX1JFR0VYUCwgYXN0Lm5hbWUpO1xuICAgIGxldCBhdHRyTmFtZSA9IGFzdC5uYW1lO1xuICAgIGxldCBhdHRyVmFsdWUgPSBhc3QudmFsdWU7XG5cbiAgICBpZiAoaXNQcmVzZW50KG0pKSB7XG4gICAgICBpZiAoaXNQcmVzZW50KG1bMV0pKSB7XG4gICAgICAgIGF0dHJOYW1lID0gYCgke2Rhc2hDYXNlVG9DYW1lbENhc2UobVsxXSl9KWA7XG4gICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudChtWzJdKSkge1xuICAgICAgICBhdHRyTmFtZSA9IGBbKCR7ZGFzaENhc2VUb0NhbWVsQ2FzZShtWzJdKX0pXWA7XG4gICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudChtWzNdKSkge1xuICAgICAgICBsZXQgcHJvcCA9IFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbE1hcHBlZChtWzNdLCBTUEVDSUFMX1BSRUZJWEVTX1JFR0VYUCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG0pID0+IHsgcmV0dXJuIG1bMV0udG9Mb3dlckNhc2UoKSArICcuJzsgfSk7XG5cbiAgICAgICAgaWYgKHByb3Auc3RhcnRzV2l0aCgnY2xhc3MuJykgfHwgcHJvcC5zdGFydHNXaXRoKCdhdHRyLicpIHx8IHByb3Auc3RhcnRzV2l0aCgnc3R5bGUuJykpIHtcbiAgICAgICAgICBhdHRyTmFtZSA9IGBbJHtwcm9wfV1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF0dHJOYW1lID0gYFske2Rhc2hDYXNlVG9DYW1lbENhc2UocHJvcCl9XWA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KG1bNF0pKSB7XG4gICAgICAgIGF0dHJOYW1lID0gYCMke2Rhc2hDYXNlVG9DYW1lbENhc2UobVs0XSl9YDtcbiAgICAgICAgYXR0clZhbHVlID0gZGFzaENhc2VUb0NhbWVsQ2FzZShhdHRyVmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhdHRyTmFtZSA9PSBhc3QubmFtZSAmJiBhdHRyVmFsdWUgPT0gYXN0LnZhbHVlID9cbiAgICAgICAgICAgICAgIGFzdCA6XG4gICAgICAgICAgICAgICBuZXcgSHRtbEF0dHJBc3QoYXR0ck5hbWUsIGF0dHJWYWx1ZSwgYXN0LnNvdXJjZVNwYW4pO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmV3cml0ZVN0YXIoYXN0OiBIdG1sQXR0ckFzdCk6IEh0bWxBdHRyQXN0IHtcbiAgICBsZXQgYXR0ck5hbWUgPSBhc3QubmFtZTtcbiAgICBsZXQgYXR0clZhbHVlID0gYXN0LnZhbHVlO1xuXG4gICAgaWYgKGF0dHJOYW1lWzBdID09ICcqJykge1xuICAgICAgYXR0ck5hbWUgPSBkYXNoQ2FzZVRvQ2FtZWxDYXNlKGF0dHJOYW1lKTtcbiAgICAgIC8vIHJld3JpdGUgdGhlIHZhciBkZWNsYXJhdGlvbnNcbiAgICAgIGF0dHJWYWx1ZSA9IFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbE1hcHBlZChhdHRyVmFsdWUsIFZBUklBQkxFX1RQTF9CSU5ESU5HX1JFR0VYUCwgbSA9PiB7XG4gICAgICAgIHJldHVybiBgJHttWzFdLnRvTG93ZXJDYXNlKCl9JHtkYXNoQ2FzZVRvQ2FtZWxDYXNlKG1bMl0pfWA7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXR0ck5hbWUgPT0gYXN0Lm5hbWUgJiYgYXR0clZhbHVlID09IGFzdC52YWx1ZSA/XG4gICAgICAgICAgICAgICBhc3QgOlxuICAgICAgICAgICAgICAgbmV3IEh0bWxBdHRyQXN0KGF0dHJOYW1lLCBhdHRyVmFsdWUsIGFzdC5zb3VyY2VTcGFuKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Jld3JpdGVJbnRlcnBvbGF0aW9uKGFzdDogSHRtbEF0dHJBc3QpOiBIdG1sQXR0ckFzdCB7XG4gICAgbGV0IGhhc0ludGVycG9sYXRpb24gPSBSZWdFeHBXcmFwcGVyLnRlc3QoSU5URVJQT0xBVElPTl9SRUdFWFAsIGFzdC52YWx1ZSk7XG5cbiAgICBpZiAoIWhhc0ludGVycG9sYXRpb24pIHtcbiAgICAgIHJldHVybiBhc3Q7XG4gICAgfVxuXG4gICAgbGV0IG5hbWUgPSBhc3QubmFtZTtcblxuICAgIGlmICghKG5hbWUuc3RhcnRzV2l0aCgnYXR0ci4nKSB8fCBuYW1lLnN0YXJ0c1dpdGgoJ2NsYXNzLicpIHx8IG5hbWUuc3RhcnRzV2l0aCgnc3R5bGUuJykpKSB7XG4gICAgICBuYW1lID0gZGFzaENhc2VUb0NhbWVsQ2FzZShhc3QubmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5hbWUgPT0gYXN0Lm5hbWUgPyBhc3QgOiBuZXcgSHRtbEF0dHJBc3QobmFtZSwgYXN0LnZhbHVlLCBhc3Quc291cmNlU3Bhbik7XG4gIH1cblxuICBwcml2YXRlIF9yZXdyaXRlU3BlY2lhbENhc2VzKGFzdDogSHRtbEF0dHJBc3QpOiBIdG1sQXR0ckFzdCB7XG4gICAgbGV0IGF0dHJOYW1lID0gYXN0Lm5hbWU7XG5cbiAgICBpZiAoU1BFQ0lBTF9DQVNFUy5pbmRleE9mKGF0dHJOYW1lKSA+IC0xKSB7XG4gICAgICByZXR1cm4gbmV3IEh0bWxBdHRyQXN0KGRhc2hDYXNlVG9DYW1lbENhc2UoYXR0ck5hbWUpLCBhc3QudmFsdWUsIGFzdC5zb3VyY2VTcGFuKTtcbiAgICB9XG5cbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuZGFzaENhc2VTZWxlY3RvcnMpICYmIHRoaXMuZGFzaENhc2VTZWxlY3RvcnMuaW5kZXhPZihhdHRyTmFtZSkgPiAtMSkge1xuICAgICAgcmV0dXJuIG5ldyBIdG1sQXR0ckFzdChkYXNoQ2FzZVRvQ2FtZWxDYXNlKGF0dHJOYW1lKSwgYXN0LnZhbHVlLCBhc3Quc291cmNlU3Bhbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFzdDtcbiAgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTGVnYWN5SHRtbFBhcnNlciBleHRlbmRzIEh0bWxQYXJzZXIge1xuICBwYXJzZShzb3VyY2VDb250ZW50OiBzdHJpbmcsIHNvdXJjZVVybDogc3RyaW5nKTogSHRtbFBhcnNlVHJlZVJlc3VsdCB7XG4gICAgbGV0IHRyYW5zZm9ybWVyID0gbmV3IExlZ2FjeUh0bWxBc3RUcmFuc2Zvcm1lcigpO1xuICAgIGxldCBodG1sUGFyc2VUcmVlUmVzdWx0ID0gc3VwZXIucGFyc2Uoc291cmNlQ29udGVudCwgc291cmNlVXJsKTtcblxuICAgIGxldCByb290Tm9kZXMgPSBodG1sUGFyc2VUcmVlUmVzdWx0LnJvb3ROb2Rlcy5tYXAobm9kZSA9PiBub2RlLnZpc2l0KHRyYW5zZm9ybWVyLCBudWxsKSk7XG5cbiAgICByZXR1cm4gdHJhbnNmb3JtZXIucmV3cml0dGVuQXN0Lmxlbmd0aCA+IDAgP1xuICAgICAgICAgICAgICAgbmV3IEh0bWxQYXJzZVRyZWVSZXN1bHQocm9vdE5vZGVzLCBodG1sUGFyc2VUcmVlUmVzdWx0LmVycm9ycykgOlxuICAgICAgICAgICAgICAgaHRtbFBhcnNlVHJlZVJlc3VsdDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
