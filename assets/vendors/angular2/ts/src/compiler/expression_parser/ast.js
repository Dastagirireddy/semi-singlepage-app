System.register(["angular2/src/facade/collection"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var collection_1;
    var AST, Quote, EmptyExpr, ImplicitReceiver, Chain, Conditional, PropertyRead, PropertyWrite, SafePropertyRead, KeyedRead, KeyedWrite, BindingPipe, LiteralPrimitive, LiteralArray, LiteralMap, Interpolation, Binary, PrefixNot, MethodCall, SafeMethodCall, FunctionCall, ASTWithSource, TemplateBinding, RecursiveAstVisitor, AstTransformer;
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            }],
        execute: function() {
            AST = (function () {
                function AST() {
                }
                AST.prototype.visit = function (visitor, context) {
                    if (context === void 0) { context = null; }
                    return null;
                };
                AST.prototype.toString = function () { return "AST"; };
                return AST;
            }());
            exports_1("AST", AST);
            /**
             * Represents a quoted expression of the form:
             *
             * quote = prefix `:` uninterpretedExpression
             * prefix = identifier
             * uninterpretedExpression = arbitrary string
             *
             * A quoted expression is meant to be pre-processed by an AST transformer that
             * converts it into another AST that no longer contains quoted expressions.
             * It is meant to allow third-party developers to extend Angular template
             * expression language. The `uninterpretedExpression` part of the quote is
             * therefore not interpreted by the Angular's own expression parser.
             */
            Quote = (function (_super) {
                __extends(Quote, _super);
                function Quote(prefix, uninterpretedExpression, location) {
                    _super.call(this);
                    this.prefix = prefix;
                    this.uninterpretedExpression = uninterpretedExpression;
                    this.location = location;
                }
                Quote.prototype.visit = function (visitor, context) {
                    if (context === void 0) { context = null; }
                    return visitor.visitQuote(this, context);
                };
                Quote.prototype.toString = function () { return "Quote"; };
                return Quote;
            }(AST));
            exports_1("Quote", Quote);
            EmptyExpr = (function (_super) {
                __extends(EmptyExpr, _super);
                function EmptyExpr() {
                    _super.apply(this, arguments);
                }
                EmptyExpr.prototype.visit = function (visitor, context) {
                    if (context === void 0) { context = null; }
                    // do nothing
                };
                return EmptyExpr;
            }(AST));
            exports_1("EmptyExpr", EmptyExpr);
            ImplicitReceiver = (function (_super) {
                __extends(ImplicitReceiver, _super);
                function ImplicitReceiver() {
                    _super.apply(this, arguments);
                }
                ImplicitReceiver.prototype.visit = function (visitor, context) {
                    if (context === void 0) { context = null; }
                    return visitor.visitImplicitReceiver(this, context);
                };
                return ImplicitReceiver;
            }(AST));
            exports_1("ImplicitReceiver", ImplicitReceiver);
            /**
             * Multiple expressions separated by a semicolon.
             */
            Chain = (function (_super) {
                __extends(Chain, _super);
                function Chain(expressions) {
                    _super.call(this);
                    this.expressions = expressions;
                }
                Chain.prototype.visit = function (visitor, context) {
                    if (context === void 0) { context = null; }
                    return visitor.visitChain(this, context);
                };
                return Chain;
            }(AST));
            exports_1("Chain", Chain);
            Conditional = (function (_super) {
                __extends(Conditional, _super);
                function Conditional(condition, trueExp, falseExp) {
                    _super.call(this);
                    this.condition = condition;
                    this.trueExp = trueExp;
                    this.falseExp = falseExp;
                }
                Conditional.prototype.visit = function (visitor, context) {
                    if (context === void 0) { context = null; }
                    return visitor.visitConditional(this, context);
                };
                return Conditional;
            }(AST));
            exports_1("Conditional", Conditional);
            PropertyRead = (function (_super) {
                __extends(PropertyRead, _super);
                function PropertyRead(receiver, name) {
                    _super.call(this);
                    this.receiver = receiver;
                    this.name = name;
                }
                PropertyRead.prototype.visit = function (visitor, context) {
                    if (context === void 0) { context = null; }
                    return visitor.visitPropertyRead(this, context);
                };
                return PropertyRead;
            }(AST));
            exports_1("PropertyRead", PropertyRead);
            PropertyWrite = (function (_super) {
                __extends(PropertyWrite, _super);
                function PropertyWrite(receiver, name, value) {
                    _super.call(this);
                    this.receiver = receiver;
                    this.name = name;
                    this.value = value;
                }
                PropertyWrite.prototype.visit = function (visitor, context) {
                    if (context === void 0) { context = null; }
                    return visitor.visitPropertyWrite(this, context);
                };
                return PropertyWrite;
            }(AST));
            exports_1("PropertyWrite", PropertyWrite);
            SafePropertyRead = (function (_super) {
                __extends(SafePropertyRead, _super);
                function SafePropertyRead(receiver, name) {
                    _super.call(this);
                    this.receiver = receiver;
                    this.name = name;
                }
                SafePropertyRead.prototype.visit = function (visitor, context) {
                    if (context === void 0) { context = null; }
                    return visitor.visitSafePropertyRead(this, context);
                };
                return SafePropertyRead;
            }(AST));
            exports_1("SafePropertyRead", SafePropertyRead);
            KeyedRead = (function (_super) {
                __extends(KeyedRead, _super);
                function KeyedRead(obj, key) {
                    _super.call(this);
                    this.obj = obj;
                    this.key = key;
                }
                KeyedRead.prototype.visit = function (visitor, context) {
                    if (context === void 0) { context = null; }
                    return visitor.visitKeyedRead(this, context);
                };
                return KeyedRead;
            }(AST));
            exports_1("KeyedRead", KeyedRead);
            KeyedWrite = (function (_super) {
                __extends(KeyedWrite, _super);
                function KeyedWrite(obj, key, value) {
                    _super.call(this);
                    this.obj = obj;
                    this.key = key;
                    this.value = value;
                }
                KeyedWrite.prototype.visit = function (visitor, context) {
                    if (context === void 0) { context = null; }
                    return visitor.visitKeyedWrite(this, context);
                };
                return KeyedWrite;
            }(AST));
            exports_1("KeyedWrite", KeyedWrite);
            BindingPipe = (function (_super) {
                __extends(BindingPipe, _super);
                function BindingPipe(exp, name, args) {
                    _super.call(this);
                    this.exp = exp;
                    this.name = name;
                    this.args = args;
                }
                BindingPipe.prototype.visit = function (visitor, context) {
                    if (context === void 0) { context = null; }
                    return visitor.visitPipe(this, context);
                };
                return BindingPipe;
            }(AST));
            exports_1("BindingPipe", BindingPipe);
            LiteralPrimitive = (function (_super) {
                __extends(LiteralPrimitive, _super);
                function LiteralPrimitive(value) {
                    _super.call(this);
                    this.value = value;
                }
                LiteralPrimitive.prototype.visit = function (visitor, context) {
                    if (context === void 0) { context = null; }
                    return visitor.visitLiteralPrimitive(this, context);
                };
                return LiteralPrimitive;
            }(AST));
            exports_1("LiteralPrimitive", LiteralPrimitive);
            LiteralArray = (function (_super) {
                __extends(LiteralArray, _super);
                function LiteralArray(expressions) {
                    _super.call(this);
                    this.expressions = expressions;
                }
                LiteralArray.prototype.visit = function (visitor, context) {
                    if (context === void 0) { context = null; }
                    return visitor.visitLiteralArray(this, context);
                };
                return LiteralArray;
            }(AST));
            exports_1("LiteralArray", LiteralArray);
            LiteralMap = (function (_super) {
                __extends(LiteralMap, _super);
                function LiteralMap(keys, values) {
                    _super.call(this);
                    this.keys = keys;
                    this.values = values;
                }
                LiteralMap.prototype.visit = function (visitor, context) {
                    if (context === void 0) { context = null; }
                    return visitor.visitLiteralMap(this, context);
                };
                return LiteralMap;
            }(AST));
            exports_1("LiteralMap", LiteralMap);
            Interpolation = (function (_super) {
                __extends(Interpolation, _super);
                function Interpolation(strings, expressions) {
                    _super.call(this);
                    this.strings = strings;
                    this.expressions = expressions;
                }
                Interpolation.prototype.visit = function (visitor, context) {
                    if (context === void 0) { context = null; }
                    return visitor.visitInterpolation(this, context);
                };
                return Interpolation;
            }(AST));
            exports_1("Interpolation", Interpolation);
            Binary = (function (_super) {
                __extends(Binary, _super);
                function Binary(operation, left, right) {
                    _super.call(this);
                    this.operation = operation;
                    this.left = left;
                    this.right = right;
                }
                Binary.prototype.visit = function (visitor, context) {
                    if (context === void 0) { context = null; }
                    return visitor.visitBinary(this, context);
                };
                return Binary;
            }(AST));
            exports_1("Binary", Binary);
            PrefixNot = (function (_super) {
                __extends(PrefixNot, _super);
                function PrefixNot(expression) {
                    _super.call(this);
                    this.expression = expression;
                }
                PrefixNot.prototype.visit = function (visitor, context) {
                    if (context === void 0) { context = null; }
                    return visitor.visitPrefixNot(this, context);
                };
                return PrefixNot;
            }(AST));
            exports_1("PrefixNot", PrefixNot);
            MethodCall = (function (_super) {
                __extends(MethodCall, _super);
                function MethodCall(receiver, name, args) {
                    _super.call(this);
                    this.receiver = receiver;
                    this.name = name;
                    this.args = args;
                }
                MethodCall.prototype.visit = function (visitor, context) {
                    if (context === void 0) { context = null; }
                    return visitor.visitMethodCall(this, context);
                };
                return MethodCall;
            }(AST));
            exports_1("MethodCall", MethodCall);
            SafeMethodCall = (function (_super) {
                __extends(SafeMethodCall, _super);
                function SafeMethodCall(receiver, name, args) {
                    _super.call(this);
                    this.receiver = receiver;
                    this.name = name;
                    this.args = args;
                }
                SafeMethodCall.prototype.visit = function (visitor, context) {
                    if (context === void 0) { context = null; }
                    return visitor.visitSafeMethodCall(this, context);
                };
                return SafeMethodCall;
            }(AST));
            exports_1("SafeMethodCall", SafeMethodCall);
            FunctionCall = (function (_super) {
                __extends(FunctionCall, _super);
                function FunctionCall(target, args) {
                    _super.call(this);
                    this.target = target;
                    this.args = args;
                }
                FunctionCall.prototype.visit = function (visitor, context) {
                    if (context === void 0) { context = null; }
                    return visitor.visitFunctionCall(this, context);
                };
                return FunctionCall;
            }(AST));
            exports_1("FunctionCall", FunctionCall);
            ASTWithSource = (function (_super) {
                __extends(ASTWithSource, _super);
                function ASTWithSource(ast, source, location) {
                    _super.call(this);
                    this.ast = ast;
                    this.source = source;
                    this.location = location;
                }
                ASTWithSource.prototype.visit = function (visitor, context) {
                    if (context === void 0) { context = null; }
                    return this.ast.visit(visitor, context);
                };
                ASTWithSource.prototype.toString = function () { return this.source + " in " + this.location; };
                return ASTWithSource;
            }(AST));
            exports_1("ASTWithSource", ASTWithSource);
            TemplateBinding = (function () {
                function TemplateBinding(key, keyIsVar, name, expression) {
                    this.key = key;
                    this.keyIsVar = keyIsVar;
                    this.name = name;
                    this.expression = expression;
                }
                return TemplateBinding;
            }());
            exports_1("TemplateBinding", TemplateBinding);
            RecursiveAstVisitor = (function () {
                function RecursiveAstVisitor() {
                }
                RecursiveAstVisitor.prototype.visitBinary = function (ast, context) {
                    ast.left.visit(this);
                    ast.right.visit(this);
                    return null;
                };
                RecursiveAstVisitor.prototype.visitChain = function (ast, context) { return this.visitAll(ast.expressions, context); };
                RecursiveAstVisitor.prototype.visitConditional = function (ast, context) {
                    ast.condition.visit(this);
                    ast.trueExp.visit(this);
                    ast.falseExp.visit(this);
                    return null;
                };
                RecursiveAstVisitor.prototype.visitPipe = function (ast, context) {
                    ast.exp.visit(this);
                    this.visitAll(ast.args, context);
                    return null;
                };
                RecursiveAstVisitor.prototype.visitFunctionCall = function (ast, context) {
                    ast.target.visit(this);
                    this.visitAll(ast.args, context);
                    return null;
                };
                RecursiveAstVisitor.prototype.visitImplicitReceiver = function (ast, context) { return null; };
                RecursiveAstVisitor.prototype.visitInterpolation = function (ast, context) {
                    return this.visitAll(ast.expressions, context);
                };
                RecursiveAstVisitor.prototype.visitKeyedRead = function (ast, context) {
                    ast.obj.visit(this);
                    ast.key.visit(this);
                    return null;
                };
                RecursiveAstVisitor.prototype.visitKeyedWrite = function (ast, context) {
                    ast.obj.visit(this);
                    ast.key.visit(this);
                    ast.value.visit(this);
                    return null;
                };
                RecursiveAstVisitor.prototype.visitLiteralArray = function (ast, context) {
                    return this.visitAll(ast.expressions, context);
                };
                RecursiveAstVisitor.prototype.visitLiteralMap = function (ast, context) { return this.visitAll(ast.values, context); };
                RecursiveAstVisitor.prototype.visitLiteralPrimitive = function (ast, context) { return null; };
                RecursiveAstVisitor.prototype.visitMethodCall = function (ast, context) {
                    ast.receiver.visit(this);
                    return this.visitAll(ast.args, context);
                };
                RecursiveAstVisitor.prototype.visitPrefixNot = function (ast, context) {
                    ast.expression.visit(this);
                    return null;
                };
                RecursiveAstVisitor.prototype.visitPropertyRead = function (ast, context) {
                    ast.receiver.visit(this);
                    return null;
                };
                RecursiveAstVisitor.prototype.visitPropertyWrite = function (ast, context) {
                    ast.receiver.visit(this);
                    ast.value.visit(this);
                    return null;
                };
                RecursiveAstVisitor.prototype.visitSafePropertyRead = function (ast, context) {
                    ast.receiver.visit(this);
                    return null;
                };
                RecursiveAstVisitor.prototype.visitSafeMethodCall = function (ast, context) {
                    ast.receiver.visit(this);
                    return this.visitAll(ast.args, context);
                };
                RecursiveAstVisitor.prototype.visitAll = function (asts, context) {
                    var _this = this;
                    asts.forEach(function (ast) { return ast.visit(_this, context); });
                    return null;
                };
                RecursiveAstVisitor.prototype.visitQuote = function (ast, context) { return null; };
                return RecursiveAstVisitor;
            }());
            exports_1("RecursiveAstVisitor", RecursiveAstVisitor);
            AstTransformer = (function () {
                function AstTransformer() {
                }
                AstTransformer.prototype.visitImplicitReceiver = function (ast, context) { return ast; };
                AstTransformer.prototype.visitInterpolation = function (ast, context) {
                    return new Interpolation(ast.strings, this.visitAll(ast.expressions));
                };
                AstTransformer.prototype.visitLiteralPrimitive = function (ast, context) {
                    return new LiteralPrimitive(ast.value);
                };
                AstTransformer.prototype.visitPropertyRead = function (ast, context) {
                    return new PropertyRead(ast.receiver.visit(this), ast.name);
                };
                AstTransformer.prototype.visitPropertyWrite = function (ast, context) {
                    return new PropertyWrite(ast.receiver.visit(this), ast.name, ast.value);
                };
                AstTransformer.prototype.visitSafePropertyRead = function (ast, context) {
                    return new SafePropertyRead(ast.receiver.visit(this), ast.name);
                };
                AstTransformer.prototype.visitMethodCall = function (ast, context) {
                    return new MethodCall(ast.receiver.visit(this), ast.name, this.visitAll(ast.args));
                };
                AstTransformer.prototype.visitSafeMethodCall = function (ast, context) {
                    return new SafeMethodCall(ast.receiver.visit(this), ast.name, this.visitAll(ast.args));
                };
                AstTransformer.prototype.visitFunctionCall = function (ast, context) {
                    return new FunctionCall(ast.target.visit(this), this.visitAll(ast.args));
                };
                AstTransformer.prototype.visitLiteralArray = function (ast, context) {
                    return new LiteralArray(this.visitAll(ast.expressions));
                };
                AstTransformer.prototype.visitLiteralMap = function (ast, context) {
                    return new LiteralMap(ast.keys, this.visitAll(ast.values));
                };
                AstTransformer.prototype.visitBinary = function (ast, context) {
                    return new Binary(ast.operation, ast.left.visit(this), ast.right.visit(this));
                };
                AstTransformer.prototype.visitPrefixNot = function (ast, context) {
                    return new PrefixNot(ast.expression.visit(this));
                };
                AstTransformer.prototype.visitConditional = function (ast, context) {
                    return new Conditional(ast.condition.visit(this), ast.trueExp.visit(this), ast.falseExp.visit(this));
                };
                AstTransformer.prototype.visitPipe = function (ast, context) {
                    return new BindingPipe(ast.exp.visit(this), ast.name, this.visitAll(ast.args));
                };
                AstTransformer.prototype.visitKeyedRead = function (ast, context) {
                    return new KeyedRead(ast.obj.visit(this), ast.key.visit(this));
                };
                AstTransformer.prototype.visitKeyedWrite = function (ast, context) {
                    return new KeyedWrite(ast.obj.visit(this), ast.key.visit(this), ast.value.visit(this));
                };
                AstTransformer.prototype.visitAll = function (asts) {
                    var res = collection_1.ListWrapper.createFixedSize(asts.length);
                    for (var i = 0; i < asts.length; ++i) {
                        res[i] = asts[i].visit(this);
                    }
                    return res;
                };
                AstTransformer.prototype.visitChain = function (ast, context) { return new Chain(this.visitAll(ast.expressions)); };
                AstTransformer.prototype.visitQuote = function (ast, context) {
                    return new Quote(ast.prefix, ast.uninterpretedExpression, ast.location);
                };
                return AstTransformer;
            }());
            exports_1("AstTransformer", AstTransformer);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9leHByZXNzaW9uX3BhcnNlci9hc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztZQUVBO2dCQUFBO2dCQUdBLENBQUM7Z0JBRkMsbUJBQUssR0FBTCxVQUFNLE9BQW1CLEVBQUUsT0FBbUI7b0JBQW5CLHVCQUFtQixHQUFuQixjQUFtQjtvQkFBUyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUFDLENBQUM7Z0JBQ3JFLHNCQUFRLEdBQVIsY0FBcUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLFVBQUM7WUFBRCxDQUhBLEFBR0MsSUFBQTtZQUhELHFCQUdDLENBQUE7WUFFRDs7Ozs7Ozs7Ozs7O2VBWUc7WUFDSDtnQkFBMkIseUJBQUc7Z0JBQzVCLGVBQW1CLE1BQWMsRUFBUyx1QkFBK0IsRUFBUyxRQUFhO29CQUM3RixpQkFBTyxDQUFDO29CQURTLFdBQU0sR0FBTixNQUFNLENBQVE7b0JBQVMsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUFRO29CQUFTLGFBQVEsR0FBUixRQUFRLENBQUs7Z0JBRS9GLENBQUM7Z0JBQ0QscUJBQUssR0FBTCxVQUFNLE9BQW1CLEVBQUUsT0FBbUI7b0JBQW5CLHVCQUFtQixHQUFuQixjQUFtQjtvQkFBUyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQUMsQ0FBQztnQkFDbEcsd0JBQVEsR0FBUixjQUFxQixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDeEMsWUFBQztZQUFELENBTkEsQUFNQyxDQU4wQixHQUFHLEdBTTdCO1lBTkQseUJBTUMsQ0FBQTtZQUVEO2dCQUErQiw2QkFBRztnQkFBbEM7b0JBQStCLDhCQUFHO2dCQUlsQyxDQUFDO2dCQUhDLHlCQUFLLEdBQUwsVUFBTSxPQUFtQixFQUFFLE9BQW1CO29CQUFuQix1QkFB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SyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3pGLENBQUM7Z0JBRUQsaUNBQVEsR0FBUixVQUFTLElBQVc7b0JBQ2xCLElBQUksR0FBRyxHQUFHLHdCQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDbkQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7d0JBQ3JDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMvQixDQUFDO29CQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7Z0JBQ2IsQ0FBQztnQkFFRCxtQ0FBVSxHQUFWLFVBQVcsR0FBVSxFQUFFLE9BQVksSUFBUyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRS9GLG1DQUFVLEdBQVYsVUFBVyxHQUFVLEVBQUUsT0FBWTtvQkFDakMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLHVCQUF1QixFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDMUUsQ0FBQztnQkFDSCxxQkFBQztZQUFELENBakZBLEFBaUZDLElBQUE7WUFqRkQsMkNBaUZDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL2V4cHJlc3Npb25fcGFyc2VyL2FzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TGlzdFdyYXBwZXJ9IGZyb20gXCJhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb25cIjtcblxuZXhwb3J0IGNsYXNzIEFTVCB7XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnkgeyByZXR1cm4gbnVsbDsgfVxuICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gXCJBU1RcIjsgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBxdW90ZWQgZXhwcmVzc2lvbiBvZiB0aGUgZm9ybTpcbiAqXG4gKiBxdW90ZSA9IHByZWZpeCBgOmAgdW5pbnRlcnByZXRlZEV4cHJlc3Npb25cbiAqIHByZWZpeCA9IGlkZW50aWZpZXJcbiAqIHVuaW50ZXJwcmV0ZWRFeHByZXNzaW9uID0gYXJiaXRyYXJ5IHN0cmluZ1xuICpcbiAqIEEgcXVvdGVkIGV4cHJlc3Npb24gaXMgbWVhbnQgdG8gYmUgcHJlLXByb2Nlc3NlZCBieSBhbiBBU1QgdHJhbnNmb3JtZXIgdGhhdFxuICogY29udmVydHMgaXQgaW50byBhbm90aGVyIEFTVCB0aGF0IG5vIGxvbmdlciBjb250YWlucyBxdW90ZWQgZXhwcmVzc2lvbnMuXG4gKiBJdCBpcyBtZWFudCB0byBhbGxvdyB0aGlyZC1wYXJ0eSBkZXZlbG9wZXJzIHRvIGV4dGVuZCBBbmd1bGFyIHRlbXBsYXRlXG4gKiBleHByZXNzaW9uIGxhbmd1YWdlLiBUaGUgYHVuaW50ZXJwcmV0ZWRFeHByZXNzaW9uYCBwYXJ0IG9mIHRoZSBxdW90ZSBpc1xuICogdGhlcmVmb3JlIG5vdCBpbnRlcnByZXRlZCBieSB0aGUgQW5ndWxhcidzIG93biBleHByZXNzaW9uIHBhcnNlci5cbiAqL1xuZXhwb3J0IGNsYXNzIFF1b3RlIGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3IocHVibGljIHByZWZpeDogc3RyaW5nLCBwdWJsaWMgdW5pbnRlcnByZXRlZEV4cHJlc3Npb246IHN0cmluZywgcHVibGljIGxvY2F0aW9uOiBhbnkpIHtcbiAgICBzdXBlcigpO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnkgeyByZXR1cm4gdmlzaXRvci52aXNpdFF1b3RlKHRoaXMsIGNvbnRleHQpOyB9XG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiBcIlF1b3RlXCI7IH1cbn1cblxuZXhwb3J0IGNsYXNzIEVtcHR5RXhwciBleHRlbmRzIEFTVCB7XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSA9IG51bGwpIHtcbiAgICAvLyBkbyBub3RoaW5nXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEltcGxpY2l0UmVjZWl2ZXIgZXh0ZW5kcyBBU1Qge1xuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdEltcGxpY2l0UmVjZWl2ZXIodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuLyoqXG4gKiBNdWx0aXBsZSBleHByZXNzaW9ucyBzZXBhcmF0ZWQgYnkgYSBzZW1pY29sb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBDaGFpbiBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBleHByZXNzaW9uczogYW55W10pIHsgc3VwZXIoKTsgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55IHsgcmV0dXJuIHZpc2l0b3IudmlzaXRDaGFpbih0aGlzLCBjb250ZXh0KTsgfVxufVxuXG5leHBvcnQgY2xhc3MgQ29uZGl0aW9uYWwgZXh0ZW5kcyBBU1Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29uZGl0aW9uOiBBU1QsIHB1YmxpYyB0cnVlRXhwOiBBU1QsIHB1YmxpYyBmYWxzZUV4cDogQVNUKSB7IHN1cGVyKCk7IH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRDb25kaXRpb25hbCh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJvcGVydHlSZWFkIGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3IocHVibGljIHJlY2VpdmVyOiBBU1QsIHB1YmxpYyBuYW1lOiBzdHJpbmcpIHsgc3VwZXIoKTsgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdFByb3BlcnR5UmVhZCh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJvcGVydHlXcml0ZSBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWNlaXZlcjogQVNULCBwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgdmFsdWU6IEFTVCkgeyBzdXBlcigpOyB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0UHJvcGVydHlXcml0ZSh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgU2FmZVByb3BlcnR5UmVhZCBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWNlaXZlcjogQVNULCBwdWJsaWMgbmFtZTogc3RyaW5nKSB7IHN1cGVyKCk7IH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRTYWZlUHJvcGVydHlSZWFkKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBLZXllZFJlYWQgZXh0ZW5kcyBBU1Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgb2JqOiBBU1QsIHB1YmxpYyBrZXk6IEFTVCkgeyBzdXBlcigpOyB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0S2V5ZWRSZWFkKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBLZXllZFdyaXRlIGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3IocHVibGljIG9iajogQVNULCBwdWJsaWMga2V5OiBBU1QsIHB1YmxpYyB2YWx1ZTogQVNUKSB7IHN1cGVyKCk7IH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRLZXllZFdyaXRlKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBCaW5kaW5nUGlwZSBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBleHA6IEFTVCwgcHVibGljIG5hbWU6IHN0cmluZywgcHVibGljIGFyZ3M6IGFueVtdKSB7IHN1cGVyKCk7IH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCk6IGFueSB7IHJldHVybiB2aXNpdG9yLnZpc2l0UGlwZSh0aGlzLCBjb250ZXh0KTsgfVxufVxuXG5leHBvcnQgY2xhc3MgTGl0ZXJhbFByaW1pdGl2ZSBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZSkgeyBzdXBlcigpOyB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0TGl0ZXJhbFByaW1pdGl2ZSh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTGl0ZXJhbEFycmF5IGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3IocHVibGljIGV4cHJlc3Npb25zOiBhbnlbXSkgeyBzdXBlcigpOyB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0TGl0ZXJhbEFycmF5KHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMaXRlcmFsTWFwIGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3IocHVibGljIGtleXM6IGFueVtdLCBwdWJsaWMgdmFsdWVzOiBhbnlbXSkgeyBzdXBlcigpOyB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0TGl0ZXJhbE1hcCh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW50ZXJwb2xhdGlvbiBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzdHJpbmdzOiBhbnlbXSwgcHVibGljIGV4cHJlc3Npb25zOiBhbnlbXSkgeyBzdXBlcigpOyB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0SW50ZXJwb2xhdGlvbih0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQmluYXJ5IGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3IocHVibGljIG9wZXJhdGlvbjogc3RyaW5nLCBwdWJsaWMgbGVmdDogQVNULCBwdWJsaWMgcmlnaHQ6IEFTVCkgeyBzdXBlcigpOyB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0QmluYXJ5KHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQcmVmaXhOb3QgZXh0ZW5kcyBBU1Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZXhwcmVzc2lvbjogQVNUKSB7IHN1cGVyKCk7IH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRQcmVmaXhOb3QodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1ldGhvZENhbGwgZXh0ZW5kcyBBU1Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVjZWl2ZXI6IEFTVCwgcHVibGljIG5hbWU6IHN0cmluZywgcHVibGljIGFyZ3M6IGFueVtdKSB7IHN1cGVyKCk7IH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRNZXRob2RDYWxsKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTYWZlTWV0aG9kQ2FsbCBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWNlaXZlcjogQVNULCBwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgYXJnczogYW55W10pIHsgc3VwZXIoKTsgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdFNhZmVNZXRob2RDYWxsKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBGdW5jdGlvbkNhbGwgZXh0ZW5kcyBBU1Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGFyZ2V0OiBBU1QsIHB1YmxpYyBhcmdzOiBhbnlbXSkgeyBzdXBlcigpOyB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0RnVuY3Rpb25DYWxsKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBU1RXaXRoU291cmNlIGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3IocHVibGljIGFzdDogQVNULCBwdWJsaWMgc291cmNlOiBzdHJpbmcsIHB1YmxpYyBsb2NhdGlvbjogc3RyaW5nKSB7IHN1cGVyKCk7IH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvciwgY29udGV4dDogYW55ID0gbnVsbCk6IGFueSB7IHJldHVybiB0aGlzLmFzdC52aXNpdCh2aXNpdG9yLCBjb250ZXh0KTsgfVxuICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gYCR7dGhpcy5zb3VyY2V9IGluICR7dGhpcy5sb2NhdGlvbn1gOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZUJpbmRpbmcge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMga2V5OiBzdHJpbmcsIHB1YmxpYyBrZXlJc1ZhcjogYm9vbGVhbiwgcHVibGljIG5hbWU6IHN0cmluZyxcbiAgICAgICAgICAgICAgcHVibGljIGV4cHJlc3Npb246IEFTVFdpdGhTb3VyY2UpIHt9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXN0VmlzaXRvciB7XG4gIHZpc2l0QmluYXJ5KGFzdDogQmluYXJ5LCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0Q2hhaW4oYXN0OiBDaGFpbiwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdENvbmRpdGlvbmFsKGFzdDogQ29uZGl0aW9uYWwsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRGdW5jdGlvbkNhbGwoYXN0OiBGdW5jdGlvbkNhbGwsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRJbXBsaWNpdFJlY2VpdmVyKGFzdDogSW1wbGljaXRSZWNlaXZlciwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEludGVycG9sYXRpb24oYXN0OiBJbnRlcnBvbGF0aW9uLCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0S2V5ZWRSZWFkKGFzdDogS2V5ZWRSZWFkLCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0S2V5ZWRXcml0ZShhc3Q6IEtleWVkV3JpdGUsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRMaXRlcmFsQXJyYXkoYXN0OiBMaXRlcmFsQXJyYXksIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRMaXRlcmFsTWFwKGFzdDogTGl0ZXJhbE1hcCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdExpdGVyYWxQcmltaXRpdmUoYXN0OiBMaXRlcmFsUHJpbWl0aXZlLCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0TWV0aG9kQ2FsbChhc3Q6IE1ldGhvZENhbGwsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRQaXBlKGFzdDogQmluZGluZ1BpcGUsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRQcmVmaXhOb3QoYXN0OiBQcmVmaXhOb3QsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRQcm9wZXJ0eVJlYWQoYXN0OiBQcm9wZXJ0eVJlYWQsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRQcm9wZXJ0eVdyaXRlKGFzdDogUHJvcGVydHlXcml0ZSwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdFF1b3RlKGFzdDogUXVvdGUsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRTYWZlTWV0aG9kQ2FsbChhc3Q6IFNhZmVNZXRob2RDYWxsLCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0U2FmZVByb3BlcnR5UmVhZChhc3Q6IFNhZmVQcm9wZXJ0eVJlYWQsIGNvbnRleHQ6IGFueSk6IGFueTtcbn1cblxuZXhwb3J0IGNsYXNzIFJlY3Vyc2l2ZUFzdFZpc2l0b3IgaW1wbGVtZW50cyBBc3RWaXNpdG9yIHtcbiAgdmlzaXRCaW5hcnkoYXN0OiBCaW5hcnksIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgYXN0LmxlZnQudmlzaXQodGhpcyk7XG4gICAgYXN0LnJpZ2h0LnZpc2l0KHRoaXMpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0Q2hhaW4oYXN0OiBDaGFpbiwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIHRoaXMudmlzaXRBbGwoYXN0LmV4cHJlc3Npb25zLCBjb250ZXh0KTsgfVxuICB2aXNpdENvbmRpdGlvbmFsKGFzdDogQ29uZGl0aW9uYWwsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgYXN0LmNvbmRpdGlvbi52aXNpdCh0aGlzKTtcbiAgICBhc3QudHJ1ZUV4cC52aXNpdCh0aGlzKTtcbiAgICBhc3QuZmFsc2VFeHAudmlzaXQodGhpcyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXRQaXBlKGFzdDogQmluZGluZ1BpcGUsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgYXN0LmV4cC52aXNpdCh0aGlzKTtcbiAgICB0aGlzLnZpc2l0QWxsKGFzdC5hcmdzLCBjb250ZXh0KTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdEZ1bmN0aW9uQ2FsbChhc3Q6IEZ1bmN0aW9uQ2FsbCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICBhc3QudGFyZ2V0LnZpc2l0KHRoaXMpO1xuICAgIHRoaXMudmlzaXRBbGwoYXN0LmFyZ3MsIGNvbnRleHQpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0SW1wbGljaXRSZWNlaXZlcihhc3Q6IEltcGxpY2l0UmVjZWl2ZXIsIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBudWxsOyB9XG4gIHZpc2l0SW50ZXJwb2xhdGlvbihhc3Q6IEludGVycG9sYXRpb24sIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMudmlzaXRBbGwoYXN0LmV4cHJlc3Npb25zLCBjb250ZXh0KTtcbiAgfVxuICB2aXNpdEtleWVkUmVhZChhc3Q6IEtleWVkUmVhZCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICBhc3Qub2JqLnZpc2l0KHRoaXMpO1xuICAgIGFzdC5rZXkudmlzaXQodGhpcyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXRLZXllZFdyaXRlKGFzdDogS2V5ZWRXcml0ZSwgY29udGV4dDogYW55KTogYW55IHtcbiAgICBhc3Qub2JqLnZpc2l0KHRoaXMpO1xuICAgIGFzdC5rZXkudmlzaXQodGhpcyk7XG4gICAgYXN0LnZhbHVlLnZpc2l0KHRoaXMpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0TGl0ZXJhbEFycmF5KGFzdDogTGl0ZXJhbEFycmF5LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnZpc2l0QWxsKGFzdC5leHByZXNzaW9ucywgY29udGV4dCk7XG4gIH1cbiAgdmlzaXRMaXRlcmFsTWFwKGFzdDogTGl0ZXJhbE1hcCwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIHRoaXMudmlzaXRBbGwoYXN0LnZhbHVlcywgY29udGV4dCk7IH1cbiAgdmlzaXRMaXRlcmFsUHJpbWl0aXZlKGFzdDogTGl0ZXJhbFByaW1pdGl2ZSwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIG51bGw7IH1cbiAgdmlzaXRNZXRob2RDYWxsKGFzdDogTWV0aG9kQ2FsbCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICBhc3QucmVjZWl2ZXIudmlzaXQodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMudmlzaXRBbGwoYXN0LmFyZ3MsIGNvbnRleHQpO1xuICB9XG4gIHZpc2l0UHJlZml4Tm90KGFzdDogUHJlZml4Tm90LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIGFzdC5leHByZXNzaW9uLnZpc2l0KHRoaXMpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0UHJvcGVydHlSZWFkKGFzdDogUHJvcGVydHlSZWFkLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIGFzdC5yZWNlaXZlci52aXNpdCh0aGlzKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdFByb3BlcnR5V3JpdGUoYXN0OiBQcm9wZXJ0eVdyaXRlLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIGFzdC5yZWNlaXZlci52aXNpdCh0aGlzKTtcbiAgICBhc3QudmFsdWUudmlzaXQodGhpcyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXRTYWZlUHJvcGVydHlSZWFkKGFzdDogU2FmZVByb3BlcnR5UmVhZCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICBhc3QucmVjZWl2ZXIudmlzaXQodGhpcyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXRTYWZlTWV0aG9kQ2FsbChhc3Q6IFNhZmVNZXRob2RDYWxsLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIGFzdC5yZWNlaXZlci52aXNpdCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy52aXNpdEFsbChhc3QuYXJncywgY29udGV4dCk7XG4gIH1cbiAgdmlzaXRBbGwoYXN0czogQVNUW10sIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgYXN0cy5mb3JFYWNoKGFzdCA9PiBhc3QudmlzaXQodGhpcywgY29udGV4dCkpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0UXVvdGUoYXN0OiBRdW90ZSwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIG51bGw7IH1cbn1cblxuZXhwb3J0IGNsYXNzIEFzdFRyYW5zZm9ybWVyIGltcGxlbWVudHMgQXN0VmlzaXRvciB7XG4gIHZpc2l0SW1wbGljaXRSZWNlaXZlcihhc3Q6IEltcGxpY2l0UmVjZWl2ZXIsIGNvbnRleHQ6IGFueSk6IEFTVCB7IHJldHVybiBhc3Q7IH1cblxuICB2aXNpdEludGVycG9sYXRpb24oYXN0OiBJbnRlcnBvbGF0aW9uLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgSW50ZXJwb2xhdGlvbihhc3Quc3RyaW5ncywgdGhpcy52aXNpdEFsbChhc3QuZXhwcmVzc2lvbnMpKTtcbiAgfVxuXG4gIHZpc2l0TGl0ZXJhbFByaW1pdGl2ZShhc3Q6IExpdGVyYWxQcmltaXRpdmUsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgcmV0dXJuIG5ldyBMaXRlcmFsUHJpbWl0aXZlKGFzdC52YWx1ZSk7XG4gIH1cblxuICB2aXNpdFByb3BlcnR5UmVhZChhc3Q6IFByb3BlcnR5UmVhZCwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gbmV3IFByb3BlcnR5UmVhZChhc3QucmVjZWl2ZXIudmlzaXQodGhpcyksIGFzdC5uYW1lKTtcbiAgfVxuXG4gIHZpc2l0UHJvcGVydHlXcml0ZShhc3Q6IFByb3BlcnR5V3JpdGUsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgcmV0dXJuIG5ldyBQcm9wZXJ0eVdyaXRlKGFzdC5yZWNlaXZlci52aXNpdCh0aGlzKSwgYXN0Lm5hbWUsIGFzdC52YWx1ZSk7XG4gIH1cblxuICB2aXNpdFNhZmVQcm9wZXJ0eVJlYWQoYXN0OiBTYWZlUHJvcGVydHlSZWFkLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgU2FmZVByb3BlcnR5UmVhZChhc3QucmVjZWl2ZXIudmlzaXQodGhpcyksIGFzdC5uYW1lKTtcbiAgfVxuXG4gIHZpc2l0TWV0aG9kQ2FsbChhc3Q6IE1ldGhvZENhbGwsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgcmV0dXJuIG5ldyBNZXRob2RDYWxsKGFzdC5yZWNlaXZlci52aXNpdCh0aGlzKSwgYXN0Lm5hbWUsIHRoaXMudmlzaXRBbGwoYXN0LmFyZ3MpKTtcbiAgfVxuXG4gIHZpc2l0U2FmZU1ldGhvZENhbGwoYXN0OiBTYWZlTWV0aG9kQ2FsbCwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gbmV3IFNhZmVNZXRob2RDYWxsKGFzdC5yZWNlaXZlci52aXNpdCh0aGlzKSwgYXN0Lm5hbWUsIHRoaXMudmlzaXRBbGwoYXN0LmFyZ3MpKTtcbiAgfVxuXG4gIHZpc2l0RnVuY3Rpb25DYWxsKGFzdDogRnVuY3Rpb25DYWxsLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgRnVuY3Rpb25DYWxsKGFzdC50YXJnZXQudmlzaXQodGhpcyksIHRoaXMudmlzaXRBbGwoYXN0LmFyZ3MpKTtcbiAgfVxuXG4gIHZpc2l0TGl0ZXJhbEFycmF5KGFzdDogTGl0ZXJhbEFycmF5LCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgTGl0ZXJhbEFycmF5KHRoaXMudmlzaXRBbGwoYXN0LmV4cHJlc3Npb25zKSk7XG4gIH1cblxuICB2aXNpdExpdGVyYWxNYXAoYXN0OiBMaXRlcmFsTWFwLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgTGl0ZXJhbE1hcChhc3Qua2V5cywgdGhpcy52aXNpdEFsbChhc3QudmFsdWVzKSk7XG4gIH1cblxuICB2aXNpdEJpbmFyeShhc3Q6IEJpbmFyeSwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gbmV3IEJpbmFyeShhc3Qub3BlcmF0aW9uLCBhc3QubGVmdC52aXNpdCh0aGlzKSwgYXN0LnJpZ2h0LnZpc2l0KHRoaXMpKTtcbiAgfVxuXG4gIHZpc2l0UHJlZml4Tm90KGFzdDogUHJlZml4Tm90LCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgUHJlZml4Tm90KGFzdC5leHByZXNzaW9uLnZpc2l0KHRoaXMpKTtcbiAgfVxuXG4gIHZpc2l0Q29uZGl0aW9uYWwoYXN0OiBDb25kaXRpb25hbCwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gbmV3IENvbmRpdGlvbmFsKGFzdC5jb25kaXRpb24udmlzaXQodGhpcyksIGFzdC50cnVlRXhwLnZpc2l0KHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN0LmZhbHNlRXhwLnZpc2l0KHRoaXMpKTtcbiAgfVxuXG4gIHZpc2l0UGlwZShhc3Q6IEJpbmRpbmdQaXBlLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgQmluZGluZ1BpcGUoYXN0LmV4cC52aXNpdCh0aGlzKSwgYXN0Lm5hbWUsIHRoaXMudmlzaXRBbGwoYXN0LmFyZ3MpKTtcbiAgfVxuXG4gIHZpc2l0S2V5ZWRSZWFkKGFzdDogS2V5ZWRSZWFkLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgS2V5ZWRSZWFkKGFzdC5vYmoudmlzaXQodGhpcyksIGFzdC5rZXkudmlzaXQodGhpcykpO1xuICB9XG5cbiAgdmlzaXRLZXllZFdyaXRlKGFzdDogS2V5ZWRXcml0ZSwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gbmV3IEtleWVkV3JpdGUoYXN0Lm9iai52aXNpdCh0aGlzKSwgYXN0LmtleS52aXNpdCh0aGlzKSwgYXN0LnZhbHVlLnZpc2l0KHRoaXMpKTtcbiAgfVxuXG4gIHZpc2l0QWxsKGFzdHM6IGFueVtdKTogYW55W10ge1xuICAgIHZhciByZXMgPSBMaXN0V3JhcHBlci5jcmVhdGVGaXhlZFNpemUoYXN0cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXN0cy5sZW5ndGg7ICsraSkge1xuICAgICAgcmVzW2ldID0gYXN0c1tpXS52aXNpdCh0aGlzKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIHZpc2l0Q2hhaW4oYXN0OiBDaGFpbiwgY29udGV4dDogYW55KTogQVNUIHsgcmV0dXJuIG5ldyBDaGFpbih0aGlzLnZpc2l0QWxsKGFzdC5leHByZXNzaW9ucykpOyB9XG5cbiAgdmlzaXRRdW90ZShhc3Q6IFF1b3RlLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgUXVvdGUoYXN0LnByZWZpeCwgYXN0LnVuaW50ZXJwcmV0ZWRFeHByZXNzaW9uLCBhc3QubG9jYXRpb24pO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
