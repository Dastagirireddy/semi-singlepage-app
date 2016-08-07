System.register(['angular2/compiler', 'angular2/src/compiler/expression_parser/ast', 'angular2/src/facade/exceptions', 'angular2/core', 'angular2/src/compiler/expression_parser/parser'], function(exports_1, context_1) {
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
    var compiler_1, ast_1, exceptions_1, core_1, parser_1;
    var FixedPart, AuxiliaryStart, AuxiliaryEnd, Params, RouterLinkLexer, RouterLinkAstGenerator, RouterLinkAstTransformer, RouterLinkTransform;
    function parseRouterLinkExpression(parser, exp) {
        var tokens = new RouterLinkLexer(parser, exp.trim()).tokenize();
        return new RouterLinkAstGenerator(tokens).generate();
    }
    exports_1("parseRouterLinkExpression", parseRouterLinkExpression);
    return {
        setters:[
            function (compiler_1_1) {
                compiler_1 = compiler_1_1;
            },
            function (ast_1_1) {
                ast_1 = ast_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (parser_1_1) {
                parser_1 = parser_1_1;
            }],
        execute: function() {
            /**
             * e.g., './User', 'Modal' in ./User[Modal(param: value)]
             */
            FixedPart = (function () {
                function FixedPart(value) {
                    this.value = value;
                }
                return FixedPart;
            }());
            /**
             * The square bracket
             */
            AuxiliaryStart = (function () {
                function AuxiliaryStart() {
                }
                return AuxiliaryStart;
            }());
            /**
             * The square bracket
             */
            AuxiliaryEnd = (function () {
                function AuxiliaryEnd() {
                }
                return AuxiliaryEnd;
            }());
            /**
             * e.g., param:value in ./User[Modal(param: value)]
             */
            Params = (function () {
                function Params(ast) {
                    this.ast = ast;
                }
                return Params;
            }());
            RouterLinkLexer = (function () {
                function RouterLinkLexer(parser, exp) {
                    this.parser = parser;
                    this.exp = exp;
                    this.index = 0;
                }
                RouterLinkLexer.prototype.tokenize = function () {
                    var tokens = [];
                    while (this.index < this.exp.length) {
                        tokens.push(this._parseToken());
                    }
                    return tokens;
                };
                RouterLinkLexer.prototype._parseToken = function () {
                    var c = this.exp[this.index];
                    if (c == '[') {
                        this.index++;
                        return new AuxiliaryStart();
                    }
                    else if (c == ']') {
                        this.index++;
                        return new AuxiliaryEnd();
                    }
                    else if (c == '(') {
                        return this._parseParams();
                    }
                    else if (c == '/' && this.index !== 0) {
                        this.index++;
                        return this._parseFixedPart();
                    }
                    else {
                        return this._parseFixedPart();
                    }
                };
                RouterLinkLexer.prototype._parseParams = function () {
                    var start = this.index;
                    for (; this.index < this.exp.length; ++this.index) {
                        var c = this.exp[this.index];
                        if (c == ')') {
                            var paramsContent = this.exp.substring(start + 1, this.index);
                            this.index++;
                            return new Params(this.parser.parseBinding("{" + paramsContent + "}", null).ast);
                        }
                    }
                    throw new exceptions_1.BaseException("Cannot find ')'");
                };
                RouterLinkLexer.prototype._parseFixedPart = function () {
                    var start = this.index;
                    var sawNonSlash = false;
                    for (; this.index < this.exp.length; ++this.index) {
                        var c = this.exp[this.index];
                        if (c == '(' || c == '[' || c == ']' || (c == '/' && sawNonSlash)) {
                            break;
                        }
                        if (c != '.' && c != '/') {
                            sawNonSlash = true;
                        }
                    }
                    var fixed = this.exp.substring(start, this.index);
                    if (start === this.index || !sawNonSlash || fixed.startsWith('//')) {
                        throw new exceptions_1.BaseException("Invalid router link");
                    }
                    return new FixedPart(fixed);
                };
                return RouterLinkLexer;
            }());
            RouterLinkAstGenerator = (function () {
                function RouterLinkAstGenerator(tokens) {
                    this.tokens = tokens;
                    this.index = 0;
                }
                RouterLinkAstGenerator.prototype.generate = function () { return this._genAuxiliary(); };
                RouterLinkAstGenerator.prototype._genAuxiliary = function () {
                    var arr = [];
                    for (; this.index < this.tokens.length; this.index++) {
                        var r = this.tokens[this.index];
                        if (r instanceof FixedPart) {
                            arr.push(new ast_1.LiteralPrimitive(r.value));
                        }
                        else if (r instanceof Params) {
                            arr.push(r.ast);
                        }
                        else if (r instanceof AuxiliaryEnd) {
                            break;
                        }
                        else if (r instanceof AuxiliaryStart) {
                            this.index++;
                            arr.push(this._genAuxiliary());
                        }
                    }
                    return new ast_1.LiteralArray(arr);
                };
                return RouterLinkAstGenerator;
            }());
            RouterLinkAstTransformer = (function (_super) {
                __extends(RouterLinkAstTransformer, _super);
                function RouterLinkAstTransformer(parser) {
                    _super.call(this);
                    this.parser = parser;
                }
                RouterLinkAstTransformer.prototype.visitQuote = function (ast, context) {
                    if (ast.prefix == "route") {
                        return parseRouterLinkExpression(this.parser, ast.uninterpretedExpression);
                    }
                    else {
                        return _super.prototype.visitQuote.call(this, ast, context);
                    }
                };
                return RouterLinkAstTransformer;
            }(ast_1.AstTransformer));
            /**
             * A compiler plugin that implements the router link DSL.
             */
            RouterLinkTransform = (function () {
                function RouterLinkTransform(parser) {
                    this.astTransformer = new RouterLinkAstTransformer(parser);
                }
                RouterLinkTransform.prototype.visitNgContent = function (ast, context) { return ast; };
                RouterLinkTransform.prototype.visitEmbeddedTemplate = function (ast, context) { return ast; };
                RouterLinkTransform.prototype.visitElement = function (ast, context) {
                    var _this = this;
                    var updatedChildren = ast.children.map(function (c) { return c.visit(_this, context); });
                    var updatedInputs = ast.inputs.map(function (c) { return c.visit(_this, context); });
                    var updatedDirectives = ast.directives.map(function (c) { return c.visit(_this, context); });
                    return new compiler_1.ElementAst(ast.name, ast.attrs, updatedInputs, ast.outputs, ast.references, updatedDirectives, ast.providers, ast.hasViewContainer, updatedChildren, ast.ngContentIndex, ast.sourceSpan);
                };
                RouterLinkTransform.prototype.visitReference = function (ast, context) { return ast; };
                RouterLinkTransform.prototype.visitVariable = function (ast, context) { return ast; };
                RouterLinkTransform.prototype.visitEvent = function (ast, context) { return ast; };
                RouterLinkTransform.prototype.visitElementProperty = function (ast, context) { return ast; };
                RouterLinkTransform.prototype.visitAttr = function (ast, context) { return ast; };
                RouterLinkTransform.prototype.visitBoundText = function (ast, context) { return ast; };
                RouterLinkTransform.prototype.visitText = function (ast, context) { return ast; };
                RouterLinkTransform.prototype.visitDirective = function (ast, context) {
                    var _this = this;
                    var updatedInputs = ast.inputs.map(function (c) { return c.visit(_this, context); });
                    return new compiler_1.DirectiveAst(ast.directive, updatedInputs, ast.hostProperties, ast.hostEvents, ast.sourceSpan);
                };
                RouterLinkTransform.prototype.visitDirectiveProperty = function (ast, context) {
                    var transformedValue = ast.value.visit(this.astTransformer);
                    return new compiler_1.BoundDirectivePropertyAst(ast.directiveName, ast.templateName, transformedValue, ast.sourceSpan);
                };
                RouterLinkTransform = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [parser_1.Parser])
                ], RouterLinkTransform);
                return RouterLinkTransform;
            }());
            exports_1("RouterLinkTransform", RouterLinkTransform);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvZGlyZWN0aXZlcy9yb3V0ZXJfbGlua190cmFuc2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXFLQSxtQ0FBMEMsTUFBYyxFQUFFLEdBQVc7UUFDbkUsSUFBSSxNQUFNLEdBQUcsSUFBSSxlQUFlLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hFLE1BQU0sQ0FBQyxJQUFJLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFIRCxpRUFHQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBcEpEOztlQUVHO1lBQ0g7Z0JBQ0UsbUJBQW1CLEtBQWE7b0JBQWIsVUFBSyxHQUFMLEtBQUssQ0FBUTtnQkFBRyxDQUFDO2dCQUN0QyxnQkFBQztZQUFELENBRkEsQUFFQyxJQUFBO1lBRUQ7O2VBRUc7WUFDSDtnQkFDRTtnQkFBZSxDQUFDO2dCQUNsQixxQkFBQztZQUFELENBRkEsQUFFQyxJQUFBO1lBRUQ7O2VBRUc7WUFDSDtnQkFDRTtnQkFBZSxDQUFDO2dCQUNsQixtQkFBQztZQUFELENBRkEsQUFFQyxJQUFBO1lBRUQ7O2VBRUc7WUFDSDtnQkFDRSxnQkFBbUIsR0FBUTtvQkFBUixRQUFHLEdBQUgsR0FBRyxDQUFLO2dCQUFHLENBQUM7Z0JBQ2pDLGFBQUM7WUFBRCxDQUZBLEFBRUMsSUFBQTtZQUVEO2dCQUdFLHlCQUFvQixNQUFjLEVBQVUsR0FBVztvQkFBbkMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtvQkFBVSxRQUFHLEdBQUgsR0FBRyxDQUFRO29CQUZ2RCxVQUFLLEdBQVcsQ0FBQyxDQUFDO2dCQUV3QyxDQUFDO2dCQUUzRCxrQ0FBUSxHQUFSO29CQUNFLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztvQkFDaEIsT0FBTyxJQUFJ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LENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSSxFQUFFLE9BQU8sQ0FBQyxFQUF0QixDQUFzQixDQUFDLENBQUM7b0JBQ2hFLE1BQU0sQ0FBQyxJQUFJLHVCQUFZLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxhQUFhLEVBQUUsR0FBRyxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsVUFBVSxFQUNoRSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzFDLENBQUM7Z0JBRUQsb0RBQXNCLEdBQXRCLFVBQXVCLEdBQThCLEVBQUUsT0FBWTtvQkFDakUsSUFBSSxnQkFBZ0IsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQzVELE1BQU0sQ0FBQyxJQUFJLG9DQUF5QixDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsRUFDckQsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN2RCxDQUFDO2dCQTNDSDtvQkFBQyxpQkFBVSxFQUFFOzt1Q0FBQTtnQkE0Q2IsMEJBQUM7WUFBRCxDQTNDQSxBQTJDQyxJQUFBO1lBM0NELHFEQTJDQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvZGlyZWN0aXZlcy9yb3V0ZXJfbGlua190cmFuc2Zvcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBUZW1wbGF0ZUFzdFZpc2l0b3IsXG4gIEVsZW1lbnRBc3QsXG4gIEJvdW5kRGlyZWN0aXZlUHJvcGVydHlBc3QsXG4gIERpcmVjdGl2ZUFzdCxcbiAgQm91bmRFbGVtZW50UHJvcGVydHlBc3Rcbn0gZnJvbSAnYW5ndWxhcjIvY29tcGlsZXInO1xuaW1wb3J0IHtcbiAgQXN0VHJhbnNmb3JtZXIsXG4gIFF1b3RlLFxuICBBU1QsXG4gIEVtcHR5RXhwcixcbiAgTGl0ZXJhbEFycmF5LFxuICBMaXRlcmFsUHJpbWl0aXZlLFxuICBBU1RXaXRoU291cmNlXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9leHByZXNzaW9uX3BhcnNlci9hc3QnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7UGFyc2VyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvZXhwcmVzc2lvbl9wYXJzZXIvcGFyc2VyJztcblxuLyoqXG4gKiBlLmcuLCAnLi9Vc2VyJywgJ01vZGFsJyBpbiAuL1VzZXJbTW9kYWwocGFyYW06IHZhbHVlKV1cbiAqL1xuY2xhc3MgRml4ZWRQYXJ0IHtcbiAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBzdHJpbmcpIHt9XG59XG5cbi8qKlxuICogVGhlIHNxdWFyZSBicmFja2V0XG4gKi9cbmNsYXNzIEF1eGlsaWFyeVN0YXJ0IHtcbiAgY29uc3RydWN0b3IoKSB7fVxufVxuXG4vKipcbiAqIFRoZSBzcXVhcmUgYnJhY2tldFxuICovXG5jbGFzcyBBdXhpbGlhcnlFbmQge1xuICBjb25zdHJ1Y3RvcigpIHt9XG59XG5cbi8qKlxuICogZS5nLiwgcGFyYW06dmFsdWUgaW4gLi9Vc2VyW01vZGFsKHBhcmFtOiB2YWx1ZSldXG4gKi9cbmNsYXNzIFBhcmFtcyB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBhc3Q6IEFTVCkge31cbn1cblxuY2xhc3MgUm91dGVyTGlua0xleGVyIHtcbiAgaW5kZXg6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJzZXI6IFBhcnNlciwgcHJpdmF0ZSBleHA6IHN0cmluZykge31cblxuICB0b2tlbml6ZSgpOiBBcnJheTxGaXhlZFBhcnQgfCBBdXhpbGlhcnlTdGFydCB8IEF1eGlsaWFyeUVuZCB8IFBhcmFtcz4ge1xuICAgIGxldCB0b2tlbnMgPSBbXTtcbiAgICB3aGlsZSAodGhpcy5pbmRleCA8IHRoaXMuZXhwLmxlbmd0aCkge1xuICAgICAgdG9rZW5zLnB1c2godGhpcy5fcGFyc2VUb2tlbigpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRva2VucztcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlVG9rZW4oKSB7XG4gICAgbGV0IGMgPSB0aGlzLmV4cFt0aGlzLmluZGV4XTtcbiAgICBpZiAoYyA9PSAnWycpIHtcbiAgICAgIHRoaXMuaW5kZXgrKztcbiAgICAgIHJldHVybiBuZXcgQXV4aWxpYXJ5U3RhcnQoKTtcblxuICAgIH0gZWxzZSBpZiAoYyA9PSAnXScpIHtcbiAgICAgIHRoaXMuaW5kZXgrKztcbiAgICAgIHJldHVybiBuZXcgQXV4aWxpYXJ5RW5kKCk7XG5cbiAgICB9IGVsc2UgaWYgKGMgPT0gJygnKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcGFyc2VQYXJhbXMoKTtcblxuICAgIH0gZWxzZSBpZiAoYyA9PSAnLycgJiYgdGhpcy5pbmRleCAhPT0gMCkge1xuICAgICAgdGhpcy5pbmRleCsrO1xuICAgICAgcmV0dXJuIHRoaXMuX3BhcnNlRml4ZWRQYXJ0KCk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX3BhcnNlRml4ZWRQYXJ0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VQYXJhbXMoKSB7XG4gICAgbGV0IHN0YXJ0ID0gdGhpcy5pbmRleDtcbiAgICBmb3IgKDsgdGhpcy5pbmRleCA8IHRoaXMuZXhwLmxlbmd0aDsgKyt0aGlzLmluZGV4KSB7XG4gICAgICBsZXQgYyA9IHRoaXMuZXhwW3RoaXMuaW5kZXhdO1xuICAgICAgaWYgKGMgPT0gJyknKSB7XG4gICAgICAgIGxldCBwYXJhbXNDb250ZW50ID0gdGhpcy5leHAuc3Vic3RyaW5nKHN0YXJ0ICsgMSwgdGhpcy5pbmRleCk7XG4gICAgICAgIHRoaXMuaW5kZXgrKztcbiAgICAgICAgcmV0dXJuIG5ldyBQYXJhbXModGhpcy5wYXJzZXIucGFyc2VCaW5kaW5nKGB7JHtwYXJhbXNDb250ZW50fX1gLCBudWxsKS5hc3QpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcIkNhbm5vdCBmaW5kICcpJ1wiKTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlRml4ZWRQYXJ0KCkge1xuICAgIGxldCBzdGFydCA9IHRoaXMuaW5kZXg7XG4gICAgbGV0IHNhd05vblNsYXNoID0gZmFsc2U7XG5cblxuICAgIGZvciAoOyB0aGlzLmluZGV4IDwgdGhpcy5leHAubGVuZ3RoOyArK3RoaXMuaW5kZXgpIHtcbiAgICAgIGxldCBjID0gdGhpcy5leHBbdGhpcy5pbmRleF07XG5cbiAgICAgIGlmIChjID09ICcoJyB8fCBjID09ICdbJyB8fCBjID09ICddJyB8fCAoYyA9PSAnLycgJiYgc2F3Tm9uU2xhc2gpKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAoYyAhPSAnLicgJiYgYyAhPSAnLycpIHtcbiAgICAgICAgc2F3Tm9uU2xhc2ggPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBmaXhlZCA9IHRoaXMuZXhwLnN1YnN0cmluZyhzdGFydCwgdGhpcy5pbmRleCk7XG5cbiAgICBpZiAoc3RhcnQgPT09IHRoaXMuaW5kZXggfHwgIXNhd05vblNsYXNoIHx8IGZpeGVkLnN0YXJ0c1dpdGgoJy8vJykpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFwiSW52YWxpZCByb3V0ZXIgbGlua1wiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEZpeGVkUGFydChmaXhlZCk7XG4gIH1cbn1cblxuY2xhc3MgUm91dGVyTGlua0FzdEdlbmVyYXRvciB7XG4gIGluZGV4OiBudW1iZXIgPSAwO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRva2VuczogYW55W10pIHt9XG5cbiAgZ2VuZXJhdGUoKTogQVNUIHsgcmV0dXJuIHRoaXMuX2dlbkF1eGlsaWFyeSgpOyB9XG5cbiAgcHJpdmF0ZSBfZ2VuQXV4aWxpYXJ5KCk6IEFTVCB7XG4gICAgbGV0IGFyciA9IFtdO1xuICAgIGZvciAoOyB0aGlzLmluZGV4IDwgdGhpcy50b2tlbnMubGVuZ3RoOyB0aGlzLmluZGV4KyspIHtcbiAgICAgIGxldCByID0gdGhpcy50b2tlbnNbdGhpcy5pbmRleF07XG5cbiAgICAgIGlmIChyIGluc3RhbmNlb2YgRml4ZWRQYXJ0KSB7XG4gICAgICAgIGFyci5wdXNoKG5ldyBMaXRlcmFsUHJpbWl0aXZlKHIudmFsdWUpKTtcblxuICAgICAgfSBlbHNlIGlmIChyIGluc3RhbmNlb2YgUGFyYW1zKSB7XG4gICAgICAgIGFyci5wdXNoKHIuYXN0KTtcblxuICAgICAgfSBlbHNlIGlmIChyIGluc3RhbmNlb2YgQXV4aWxpYXJ5RW5kKSB7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICB9IGVsc2UgaWYgKHIgaW5zdGFuY2VvZiBBdXhpbGlhcnlTdGFydCkge1xuICAgICAgICB0aGlzLmluZGV4Kys7XG4gICAgICAgIGFyci5wdXNoKHRoaXMuX2dlbkF1eGlsaWFyeSgpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IExpdGVyYWxBcnJheShhcnIpO1xuICB9XG59XG5cbmNsYXNzIFJvdXRlckxpbmtBc3RUcmFuc2Zvcm1lciBleHRlbmRzIEFzdFRyYW5zZm9ybWVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJzZXI6IFBhcnNlcikgeyBzdXBlcigpOyB9XG5cbiAgdmlzaXRRdW90ZShhc3Q6IFF1b3RlLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIGlmIChhc3QucHJlZml4ID09IFwicm91dGVcIikge1xuICAgICAgcmV0dXJuIHBhcnNlUm91dGVyTGlua0V4cHJlc3Npb24odGhpcy5wYXJzZXIsIGFzdC51bmludGVycHJldGVkRXhwcmVzc2lvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzdXBlci52aXNpdFF1b3RlKGFzdCwgY29udGV4dCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVJvdXRlckxpbmtFeHByZXNzaW9uKHBhcnNlcjogUGFyc2VyLCBleHA6IHN0cmluZyk6IEFTVCB7XG4gIGxldCB0b2tlbnMgPSBuZXcgUm91dGVyTGlua0xleGVyKHBhcnNlciwgZXhwLnRyaW0oKSkudG9rZW5pemUoKTtcbiAgcmV0dXJuIG5ldyBSb3V0ZXJMaW5rQXN0R2VuZXJhdG9yKHRva2VucykuZ2VuZXJhdGUoKTtcbn1cblxuLyoqXG4gKiBBIGNvbXBpbGVyIHBsdWdpbiB0aGF0IGltcGxlbWVudHMgdGhlIHJvdXRlciBsaW5rIERTTC5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJvdXRlckxpbmtUcmFuc2Zvcm0gaW1wbGVtZW50cyBUZW1wbGF0ZUFzdFZpc2l0b3Ige1xuICBwcml2YXRlIGFzdFRyYW5zZm9ybWVyO1xuXG4gIGNvbnN0cnVjdG9yKHBhcnNlcjogUGFyc2VyKSB7IHRoaXMuYXN0VHJhbnNmb3JtZXIgPSBuZXcgUm91dGVyTGlua0FzdFRyYW5zZm9ybWVyKHBhcnNlcik7IH1cblxuICB2aXNpdE5nQ29udGVudChhc3Q6IGFueSwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIGFzdDsgfVxuXG4gIHZpc2l0RW1iZWRkZWRUZW1wbGF0ZShhc3Q6IGFueSwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIGFzdDsgfVxuXG4gIHZpc2l0RWxlbWVudChhc3Q6IEVsZW1lbnRBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgbGV0IHVwZGF0ZWRDaGlsZHJlbiA9IGFzdC5jaGlsZHJlbi5tYXAoYyA9PiBjLnZpc2l0KHRoaXMsIGNvbnRleHQpKTtcbiAgICBsZXQgdXBkYXRlZElucHV0cyA9IGFzdC5pbnB1dHMubWFwKGMgPT4gYy52aXNpdCh0aGlzLCBjb250ZXh0KSk7XG4gICAgbGV0IHVwZGF0ZWREaXJlY3RpdmVzID0gYXN0LmRpcmVjdGl2ZXMubWFwKGMgPT4gYy52aXNpdCh0aGlzLCBjb250ZXh0KSk7XG4gICAgcmV0dXJuIG5ldyBFbGVtZW50QXN0KGFzdC5uYW1lLCBhc3QuYXR0cnMsIHVwZGF0ZWRJbnB1dHMsIGFzdC5vdXRwdXRzLCBhc3QucmVmZXJlbmNlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZERpcmVjdGl2ZXMsIGFzdC5wcm92aWRlcnMsIGFzdC5oYXNWaWV3Q29udGFpbmVyLCB1cGRhdGVkQ2hpbGRyZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFzdC5uZ0NvbnRlbnRJbmRleCwgYXN0LnNvdXJjZVNwYW4pO1xuICB9XG5cbiAgdmlzaXRSZWZlcmVuY2UoYXN0OiBhbnksIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBhc3Q7IH1cblxuICB2aXNpdFZhcmlhYmxlKGFzdDogYW55LCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gYXN0OyB9XG5cbiAgdmlzaXRFdmVudChhc3Q6IGFueSwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIGFzdDsgfVxuXG4gIHZpc2l0RWxlbWVudFByb3BlcnR5KGFzdDogYW55LCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gYXN0OyB9XG5cbiAgdmlzaXRBdHRyKGFzdDogYW55LCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gYXN0OyB9XG5cbiAgdmlzaXRCb3VuZFRleHQoYXN0OiBhbnksIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBhc3Q7IH1cblxuICB2aXNpdFRleHQoYXN0OiBhbnksIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBhc3Q7IH1cblxuICB2aXNpdERpcmVjdGl2ZShhc3Q6IERpcmVjdGl2ZUFzdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICBsZXQgdXBkYXRlZElucHV0cyA9IGFzdC5pbnB1dHMubWFwKGMgPT4gYy52aXNpdCh0aGlzLCBjb250ZXh0KSk7XG4gICAgcmV0dXJuIG5ldyBEaXJlY3RpdmVBc3QoYXN0LmRpcmVjdGl2ZSwgdXBkYXRlZElucHV0cywgYXN0Lmhvc3RQcm9wZXJ0aWVzLCBhc3QuaG9zdEV2ZW50cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3Quc291cmNlU3Bhbik7XG4gIH1cblxuICB2aXNpdERpcmVjdGl2ZVByb3BlcnR5KGFzdDogQm91bmREaXJlY3RpdmVQcm9wZXJ0eUFzdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICBsZXQgdHJhbnNmb3JtZWRWYWx1ZSA9IGFzdC52YWx1ZS52aXNpdCh0aGlzLmFzdFRyYW5zZm9ybWVyKTtcbiAgICByZXR1cm4gbmV3IEJvdW5kRGlyZWN0aXZlUHJvcGVydHlBc3QoYXN0LmRpcmVjdGl2ZU5hbWUsIGFzdC50ZW1wbGF0ZU5hbWUsIHRyYW5zZm9ybWVkVmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzdC5zb3VyY2VTcGFuKTtcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
