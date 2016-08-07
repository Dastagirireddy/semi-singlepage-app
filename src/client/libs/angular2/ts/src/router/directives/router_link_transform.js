System.register(['angular2/compiler', 'angular2/src/core/change_detection/parser/ast', 'angular2/src/facade/exceptions', 'angular2/core', 'angular2/src/core/change_detection/parser/parser'], function(exports_1, context_1) {
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
                RouterLinkAstTransformer.prototype.visitQuote = function (ast) {
                    if (ast.prefix == "route") {
                        return parseRouterLinkExpression(this.parser, ast.uninterpretedExpression);
                    }
                    else {
                        return _super.prototype.visitQuote.call(this, ast);
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
                    return new compiler_1.ElementAst(ast.name, ast.attrs, updatedInputs, ast.outputs, ast.exportAsVars, updatedDirectives, updatedChildren, ast.ngContentIndex, ast.sourceSpan);
                };
                RouterLinkTransform.prototype.visitVariable = function (ast, context) { return ast; };
                RouterLinkTransform.prototype.visitEvent = function (ast, context) { return ast; };
                RouterLinkTransform.prototype.visitElementProperty = function (ast, context) { return ast; };
                RouterLinkTransform.prototype.visitAttr = function (ast, context) { return ast; };
                RouterLinkTransform.prototype.visitBoundText = function (ast, context) { return ast; };
                RouterLinkTransform.prototype.visitText = function (ast, context) { return ast; };
                RouterLinkTransform.prototype.visitDirective = function (ast, context) {
                    var _this = this;
                    var updatedInputs = ast.inputs.map(function (c) { return c.visit(_this, context); });
                    return new compiler_1.DirectiveAst(ast.directive, updatedInputs, ast.hostProperties, ast.hostEvents, ast.exportAsVars, ast.sourceSpan);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9kaXJlY3RpdmVzL3JvdXRlcl9saW5rX3RyYW5zZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBcUtBLG1DQUEwQyxNQUFjLEVBQUUsR0FBVztRQUNuRSxJQUFJLE1BQU0sR0FBRyxJQUFJLGVBQWUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEUsTUFBTSxDQUFDLElBQUksc0JBQXNCLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDdkQsQ0FBQztJQUhELGlFQUdDLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFwSkQ7O2VBRUc7WUFDSDtnQkFDRSxtQkFBbUIsS0FBYTtvQkFBYixVQUFLLEdBQUwsS0FBSyxDQUFRO2dCQUFHLENBQUM7Z0JBQ3RDLGdCQUFDO1lBQUQsQ0FGQSxBQUVDLElBQUE7WUFFRDs7ZUFFRztZQUNIO2dCQUNFO2dCQUFlLENBQUM7Z0JBQ2xCLHFCQUFDO1lBQUQsQ0FGQSxBQUVDLElBQUE7WUFFRDs7ZUFFRztZQUNIO2dCQUNFO2dCQUFlLENBQUM7Z0JBQ2xCLG1CQUFDO1lBQUQsQ0FGQSxBQUVDLElBQUE7WUFFRDs7ZUFFRztZQUNIO2dCQUNFLGdCQUFtQixHQUFRO29CQUFSLFFBQUcsR0FBSCxHQUFHLENBQUs7Z0JBQUcsQ0FBQztnQkFDakMsYUFBQztZQUFELENBRkEsQUFFQyxJQUFBO1lBRUQ7Z0JBR0UseUJBQW9CLE1BQWMsRUFBVSxHQUFXO29CQUFuQyxXQUFNLEdBQU4sTUFBTSxDQUFRO29CQUFVLFFBQUcsR0FBSCxHQUFHLENBQVE7b0JBRnZELFVBQUssR0FBVyxDQUFDLENBQUM7Z0JBRXdDLENBQUM7Z0JBRTNELGtDQUFRLEdBQVI7b0JBQ0UsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO29CQUNoQixPQUFP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Q0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLFVBQVUsRUFDaEUsR0FBRyxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzVELENBQUM7Z0JBRUQsb0RBQXNCLEdBQXRCLFVBQXVCLEdBQThCLEVBQUUsT0FBWTtvQkFDakUsSUFBSSxnQkFBZ0IsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQzVELE1BQU0sQ0FBQyxJQUFJLG9DQUF5QixDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsRUFDckQsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN2RCxDQUFDO2dCQXhDSDtvQkFBQyxpQkFBVSxFQUFFOzt1Q0FBQTtnQkF5Q2IsMEJBQUM7WUFBRCxDQXhDQSxBQXdDQyxJQUFBO1lBeENELHFEQXdDQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9kaXJlY3RpdmVzL3JvdXRlcl9saW5rX3RyYW5zZm9ybS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFRlbXBsYXRlQXN0VmlzaXRvcixcbiAgRWxlbWVudEFzdCxcbiAgQm91bmREaXJlY3RpdmVQcm9wZXJ0eUFzdCxcbiAgRGlyZWN0aXZlQXN0LFxuICBCb3VuZEVsZW1lbnRQcm9wZXJ0eUFzdFxufSBmcm9tICdhbmd1bGFyMi9jb21waWxlcic7XG5pbXBvcnQge1xuICBBc3RUcmFuc2Zvcm1lcixcbiAgUXVvdGUsXG4gIEFTVCxcbiAgRW1wdHlFeHByLFxuICBMaXRlcmFsQXJyYXksXG4gIExpdGVyYWxQcmltaXRpdmUsXG4gIEFTVFdpdGhTb3VyY2Vcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9wYXJzZXIvYXN0JztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1BhcnNlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9wYXJzZXIvcGFyc2VyJztcblxuLyoqXG4gKiBlLmcuLCAnLi9Vc2VyJywgJ01vZGFsJyBpbiAuL1VzZXJbTW9kYWwocGFyYW06IHZhbHVlKV1cbiAqL1xuY2xhc3MgRml4ZWRQYXJ0IHtcbiAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBzdHJpbmcpIHt9XG59XG5cbi8qKlxuICogVGhlIHNxdWFyZSBicmFja2V0XG4gKi9cbmNsYXNzIEF1eGlsaWFyeVN0YXJ0IHtcbiAgY29uc3RydWN0b3IoKSB7fVxufVxuXG4vKipcbiAqIFRoZSBzcXVhcmUgYnJhY2tldFxuICovXG5jbGFzcyBBdXhpbGlhcnlFbmQge1xuICBjb25zdHJ1Y3RvcigpIHt9XG59XG5cbi8qKlxuICogZS5nLiwgcGFyYW06dmFsdWUgaW4gLi9Vc2VyW01vZGFsKHBhcmFtOiB2YWx1ZSldXG4gKi9cbmNsYXNzIFBhcmFtcyB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBhc3Q6IEFTVCkge31cbn1cblxuY2xhc3MgUm91dGVyTGlua0xleGVyIHtcbiAgaW5kZXg6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJzZXI6IFBhcnNlciwgcHJpdmF0ZSBleHA6IHN0cmluZykge31cblxuICB0b2tlbml6ZSgpOiBBcnJheTxGaXhlZFBhcnQgfCBBdXhpbGlhcnlTdGFydCB8IEF1eGlsaWFyeUVuZCB8IFBhcmFtcz4ge1xuICAgIGxldCB0b2tlbnMgPSBbXTtcbiAgICB3aGlsZSAodGhpcy5pbmRleCA8IHRoaXMuZXhwLmxlbmd0aCkge1xuICAgICAgdG9rZW5zLnB1c2godGhpcy5fcGFyc2VUb2tlbigpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRva2VucztcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlVG9rZW4oKSB7XG4gICAgbGV0IGMgPSB0aGlzLmV4cFt0aGlzLmluZGV4XTtcbiAgICBpZiAoYyA9PSAnWycpIHtcbiAgICAgIHRoaXMuaW5kZXgrKztcbiAgICAgIHJldHVybiBuZXcgQXV4aWxpYXJ5U3RhcnQoKTtcblxuICAgIH0gZWxzZSBpZiAoYyA9PSAnXScpIHtcbiAgICAgIHRoaXMuaW5kZXgrKztcbiAgICAgIHJldHVybiBuZXcgQXV4aWxpYXJ5RW5kKCk7XG5cbiAgICB9IGVsc2UgaWYgKGMgPT0gJygnKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcGFyc2VQYXJhbXMoKTtcblxuICAgIH0gZWxzZSBpZiAoYyA9PSAnLycgJiYgdGhpcy5pbmRleCAhPT0gMCkge1xuICAgICAgdGhpcy5pbmRleCsrO1xuICAgICAgcmV0dXJuIHRoaXMuX3BhcnNlRml4ZWRQYXJ0KCk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX3BhcnNlRml4ZWRQYXJ0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VQYXJhbXMoKSB7XG4gICAgbGV0IHN0YXJ0ID0gdGhpcy5pbmRleDtcbiAgICBmb3IgKDsgdGhpcy5pbmRleCA8IHRoaXMuZXhwLmxlbmd0aDsgKyt0aGlzLmluZGV4KSB7XG4gICAgICBsZXQgYyA9IHRoaXMuZXhwW3RoaXMuaW5kZXhdO1xuICAgICAgaWYgKGMgPT0gJyknKSB7XG4gICAgICAgIGxldCBwYXJhbXNDb250ZW50ID0gdGhpcy5leHAuc3Vic3RyaW5nKHN0YXJ0ICsgMSwgdGhpcy5pbmRleCk7XG4gICAgICAgIHRoaXMuaW5kZXgrKztcbiAgICAgICAgcmV0dXJuIG5ldyBQYXJhbXModGhpcy5wYXJzZXIucGFyc2VCaW5kaW5nKGB7JHtwYXJhbXNDb250ZW50fX1gLCBudWxsKS5hc3QpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcIkNhbm5vdCBmaW5kICcpJ1wiKTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlRml4ZWRQYXJ0KCkge1xuICAgIGxldCBzdGFydCA9IHRoaXMuaW5kZXg7XG4gICAgbGV0IHNhd05vblNsYXNoID0gZmFsc2U7XG5cblxuICAgIGZvciAoOyB0aGlzLmluZGV4IDwgdGhpcy5leHAubGVuZ3RoOyArK3RoaXMuaW5kZXgpIHtcbiAgICAgIGxldCBjID0gdGhpcy5leHBbdGhpcy5pbmRleF07XG5cbiAgICAgIGlmIChjID09ICcoJyB8fCBjID09ICdbJyB8fCBjID09ICddJyB8fCAoYyA9PSAnLycgJiYgc2F3Tm9uU2xhc2gpKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAoYyAhPSAnLicgJiYgYyAhPSAnLycpIHtcbiAgICAgICAgc2F3Tm9uU2xhc2ggPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBmaXhlZCA9IHRoaXMuZXhwLnN1YnN0cmluZyhzdGFydCwgdGhpcy5pbmRleCk7XG5cbiAgICBpZiAoc3RhcnQgPT09IHRoaXMuaW5kZXggfHwgIXNhd05vblNsYXNoIHx8IGZpeGVkLnN0YXJ0c1dpdGgoJy8vJykpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFwiSW52YWxpZCByb3V0ZXIgbGlua1wiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEZpeGVkUGFydChmaXhlZCk7XG4gIH1cbn1cblxuY2xhc3MgUm91dGVyTGlua0FzdEdlbmVyYXRvciB7XG4gIGluZGV4OiBudW1iZXIgPSAwO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRva2VuczogYW55W10pIHt9XG5cbiAgZ2VuZXJhdGUoKTogQVNUIHsgcmV0dXJuIHRoaXMuX2dlbkF1eGlsaWFyeSgpOyB9XG5cbiAgcHJpdmF0ZSBfZ2VuQXV4aWxpYXJ5KCk6IEFTVCB7XG4gICAgbGV0IGFyciA9IFtdO1xuICAgIGZvciAoOyB0aGlzLmluZGV4IDwgdGhpcy50b2tlbnMubGVuZ3RoOyB0aGlzLmluZGV4KyspIHtcbiAgICAgIGxldCByID0gdGhpcy50b2tlbnNbdGhpcy5pbmRleF07XG5cbiAgICAgIGlmIChyIGluc3RhbmNlb2YgRml4ZWRQYXJ0KSB7XG4gICAgICAgIGFyci5wdXNoKG5ldyBMaXRlcmFsUHJpbWl0aXZlKHIudmFsdWUpKTtcblxuICAgICAgfSBlbHNlIGlmIChyIGluc3RhbmNlb2YgUGFyYW1zKSB7XG4gICAgICAgIGFyci5wdXNoKHIuYXN0KTtcblxuICAgICAgfSBlbHNlIGlmIChyIGluc3RhbmNlb2YgQXV4aWxpYXJ5RW5kKSB7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICB9IGVsc2UgaWYgKHIgaW5zdGFuY2VvZiBBdXhpbGlhcnlTdGFydCkge1xuICAgICAgICB0aGlzLmluZGV4Kys7XG4gICAgICAgIGFyci5wdXNoKHRoaXMuX2dlbkF1eGlsaWFyeSgpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IExpdGVyYWxBcnJheShhcnIpO1xuICB9XG59XG5cbmNsYXNzIFJvdXRlckxpbmtBc3RUcmFuc2Zvcm1lciBleHRlbmRzIEFzdFRyYW5zZm9ybWVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJzZXI6IFBhcnNlcikgeyBzdXBlcigpOyB9XG5cbiAgdmlzaXRRdW90ZShhc3Q6IFF1b3RlKTogQVNUIHtcbiAgICBpZiAoYXN0LnByZWZpeCA9PSBcInJvdXRlXCIpIHtcbiAgICAgIHJldHVybiBwYXJzZVJvdXRlckxpbmtFeHByZXNzaW9uKHRoaXMucGFyc2VyLCBhc3QudW5pbnRlcnByZXRlZEV4cHJlc3Npb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc3VwZXIudmlzaXRRdW90ZShhc3QpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VSb3V0ZXJMaW5rRXhwcmVzc2lvbihwYXJzZXI6IFBhcnNlciwgZXhwOiBzdHJpbmcpOiBBU1Qge1xuICBsZXQgdG9rZW5zID0gbmV3IFJvdXRlckxpbmtMZXhlcihwYXJzZXIsIGV4cC50cmltKCkpLnRva2VuaXplKCk7XG4gIHJldHVybiBuZXcgUm91dGVyTGlua0FzdEdlbmVyYXRvcih0b2tlbnMpLmdlbmVyYXRlKCk7XG59XG5cbi8qKlxuICogQSBjb21waWxlciBwbHVnaW4gdGhhdCBpbXBsZW1lbnRzIHRoZSByb3V0ZXIgbGluayBEU0wuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSb3V0ZXJMaW5rVHJhbnNmb3JtIGltcGxlbWVudHMgVGVtcGxhdGVBc3RWaXNpdG9yIHtcbiAgcHJpdmF0ZSBhc3RUcmFuc2Zvcm1lcjtcblxuICBjb25zdHJ1Y3RvcihwYXJzZXI6IFBhcnNlcikgeyB0aGlzLmFzdFRyYW5zZm9ybWVyID0gbmV3IFJvdXRlckxpbmtBc3RUcmFuc2Zvcm1lcihwYXJzZXIpOyB9XG5cbiAgdmlzaXROZ0NvbnRlbnQoYXN0OiBhbnksIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBhc3Q7IH1cblxuICB2aXNpdEVtYmVkZGVkVGVtcGxhdGUoYXN0OiBhbnksIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBhc3Q7IH1cblxuICB2aXNpdEVsZW1lbnQoYXN0OiBFbGVtZW50QXN0LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIGxldCB1cGRhdGVkQ2hpbGRyZW4gPSBhc3QuY2hpbGRyZW4ubWFwKGMgPT4gYy52aXNpdCh0aGlzLCBjb250ZXh0KSk7XG4gICAgbGV0IHVwZGF0ZWRJbnB1dHMgPSBhc3QuaW5wdXRzLm1hcChjID0+IGMudmlzaXQodGhpcywgY29udGV4dCkpO1xuICAgIGxldCB1cGRhdGVkRGlyZWN0aXZlcyA9IGFzdC5kaXJlY3RpdmVzLm1hcChjID0+IGMudmlzaXQodGhpcywgY29udGV4dCkpO1xuICAgIHJldHVybiBuZXcgRWxlbWVudEFzdChhc3QubmFtZSwgYXN0LmF0dHJzLCB1cGRhdGVkSW5wdXRzLCBhc3Qub3V0cHV0cywgYXN0LmV4cG9ydEFzVmFycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZERpcmVjdGl2ZXMsIHVwZGF0ZWRDaGlsZHJlbiwgYXN0Lm5nQ29udGVudEluZGV4LCBhc3Quc291cmNlU3Bhbik7XG4gIH1cblxuICB2aXNpdFZhcmlhYmxlKGFzdDogYW55LCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gYXN0OyB9XG5cbiAgdmlzaXRFdmVudChhc3Q6IGFueSwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIGFzdDsgfVxuXG4gIHZpc2l0RWxlbWVudFByb3BlcnR5KGFzdDogYW55LCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gYXN0OyB9XG5cbiAgdmlzaXRBdHRyKGFzdDogYW55LCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gYXN0OyB9XG5cbiAgdmlzaXRCb3VuZFRleHQoYXN0OiBhbnksIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBhc3Q7IH1cblxuICB2aXNpdFRleHQoYXN0OiBhbnksIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBhc3Q7IH1cblxuICB2aXNpdERpcmVjdGl2ZShhc3Q6IERpcmVjdGl2ZUFzdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICBsZXQgdXBkYXRlZElucHV0cyA9IGFzdC5pbnB1dHMubWFwKGMgPT4gYy52aXNpdCh0aGlzLCBjb250ZXh0KSk7XG4gICAgcmV0dXJuIG5ldyBEaXJlY3RpdmVBc3QoYXN0LmRpcmVjdGl2ZSwgdXBkYXRlZElucHV0cywgYXN0Lmhvc3RQcm9wZXJ0aWVzLCBhc3QuaG9zdEV2ZW50cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3QuZXhwb3J0QXNWYXJzLCBhc3Quc291cmNlU3Bhbik7XG4gIH1cblxuICB2aXNpdERpcmVjdGl2ZVByb3BlcnR5KGFzdDogQm91bmREaXJlY3RpdmVQcm9wZXJ0eUFzdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICBsZXQgdHJhbnNmb3JtZWRWYWx1ZSA9IGFzdC52YWx1ZS52aXNpdCh0aGlzLmFzdFRyYW5zZm9ybWVyKTtcbiAgICByZXR1cm4gbmV3IEJvdW5kRGlyZWN0aXZlUHJvcGVydHlBc3QoYXN0LmRpcmVjdGl2ZU5hbWUsIGFzdC50ZW1wbGF0ZU5hbWUsIHRyYW5zZm9ybWVkVmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzdC5zb3VyY2VTcGFuKTtcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
