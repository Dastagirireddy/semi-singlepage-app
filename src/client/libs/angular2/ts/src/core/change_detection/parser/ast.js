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
                AST.prototype.visit = function (visitor) { return null; };
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
                Quote.prototype.visit = function (visitor) { return visitor.visitQuote(this); };
                Quote.prototype.toString = function () { return "Quote"; };
                return Quote;
            }(AST));
            exports_1("Quote", Quote);
            EmptyExpr = (function (_super) {
                __extends(EmptyExpr, _super);
                function EmptyExpr() {
                    _super.apply(this, arguments);
                }
                EmptyExpr.prototype.visit = function (visitor) {
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
                ImplicitReceiver.prototype.visit = function (visitor) { return visitor.visitImplicitReceiver(this); };
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
                Chain.prototype.visit = function (visitor) { return visitor.visitChain(this); };
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
                Conditional.prototype.visit = function (visitor) { return visitor.visitConditional(this); };
                return Conditional;
            }(AST));
            exports_1("Conditional", Conditional);
            PropertyRead = (function (_super) {
                __extends(PropertyRead, _super);
                function PropertyRead(receiver, name, getter) {
                    _super.call(this);
                    this.receiver = receiver;
                    this.name = name;
                    this.getter = getter;
                }
                PropertyRead.prototype.visit = function (visitor) { return visitor.visitPropertyRead(this); };
                return PropertyRead;
            }(AST));
            exports_1("PropertyRead", PropertyRead);
            PropertyWrite = (function (_super) {
                __extends(PropertyWrite, _super);
                function PropertyWrite(receiver, name, setter, value) {
                    _super.call(this);
                    this.receiver = receiver;
                    this.name = name;
                    this.setter = setter;
                    this.value = value;
                }
                PropertyWrite.prototype.visit = function (visitor) { return visitor.visitPropertyWrite(this); };
                return PropertyWrite;
            }(AST));
            exports_1("PropertyWrite", PropertyWrite);
            SafePropertyRead = (function (_super) {
                __extends(SafePropertyRead, _super);
                function SafePropertyRead(receiver, name, getter) {
                    _super.call(this);
                    this.receiver = receiver;
                    this.name = name;
                    this.getter = getter;
                }
                SafePropertyRead.prototype.visit = function (visitor) { return visitor.visitSafePropertyRead(this); };
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
                KeyedRead.prototype.visit = function (visitor) { return visitor.visitKeyedRead(this); };
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
                KeyedWrite.prototype.visit = function (visitor) { return visitor.visitKeyedWrite(this); };
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
                BindingPipe.prototype.visit = function (visitor) { return visitor.visitPipe(this); };
                return BindingPipe;
            }(AST));
            exports_1("BindingPipe", BindingPipe);
            LiteralPrimitive = (function (_super) {
                __extends(LiteralPrimitive, _super);
                function LiteralPrimitive(value) {
                    _super.call(this);
                    this.value = value;
                }
                LiteralPrimitive.prototype.visit = function (visitor) { return visitor.visitLiteralPrimitive(this); };
                return LiteralPrimitive;
            }(AST));
            exports_1("LiteralPrimitive", LiteralPrimitive);
            LiteralArray = (function (_super) {
                __extends(LiteralArray, _super);
                function LiteralArray(expressions) {
                    _super.call(this);
                    this.expressions = expressions;
                }
                LiteralArray.prototype.visit = function (visitor) { return visitor.visitLiteralArray(this); };
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
                LiteralMap.prototype.visit = function (visitor) { return visitor.visitLiteralMap(this); };
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
                Interpolation.prototype.visit = function (visitor) { return visitor.visitInterpolation(this); };
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
                Binary.prototype.visit = function (visitor) { return visitor.visitBinary(this); };
                return Binary;
            }(AST));
            exports_1("Binary", Binary);
            PrefixNot = (function (_super) {
                __extends(PrefixNot, _super);
                function PrefixNot(expression) {
                    _super.call(this);
                    this.expression = expression;
                }
                PrefixNot.prototype.visit = function (visitor) { return visitor.visitPrefixNot(this); };
                return PrefixNot;
            }(AST));
            exports_1("PrefixNot", PrefixNot);
            MethodCall = (function (_super) {
                __extends(MethodCall, _super);
                function MethodCall(receiver, name, fn, args) {
                    _super.call(this);
                    this.receiver = receiver;
                    this.name = name;
                    this.fn = fn;
                    this.args = args;
                }
                MethodCall.prototype.visit = function (visitor) { return visitor.visitMethodCall(this); };
                return MethodCall;
            }(AST));
            exports_1("MethodCall", MethodCall);
            SafeMethodCall = (function (_super) {
                __extends(SafeMethodCall, _super);
                function SafeMethodCall(receiver, name, fn, args) {
                    _super.call(this);
                    this.receiver = receiver;
                    this.name = name;
                    this.fn = fn;
                    this.args = args;
                }
                SafeMethodCall.prototype.visit = function (visitor) { return visitor.visitSafeMethodCall(this); };
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
                FunctionCall.prototype.visit = function (visitor) { return visitor.visitFunctionCall(this); };
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
                ASTWithSource.prototype.visit = function (visitor) { return this.ast.visit(visitor); };
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
                RecursiveAstVisitor.prototype.visitBinary = function (ast) {
                    ast.left.visit(this);
                    ast.right.visit(this);
                    return null;
                };
                RecursiveAstVisitor.prototype.visitChain = function (ast) { return this.visitAll(ast.expressions); };
                RecursiveAstVisitor.prototype.visitConditional = function (ast) {
                    ast.condition.visit(this);
                    ast.trueExp.visit(this);
                    ast.falseExp.visit(this);
                    return null;
                };
                RecursiveAstVisitor.prototype.visitPipe = function (ast) {
                    ast.exp.visit(this);
                    this.visitAll(ast.args);
                    return null;
                };
                RecursiveAstVisitor.prototype.visitFunctionCall = function (ast) {
                    ast.target.visit(this);
                    this.visitAll(ast.args);
                    return null;
                };
                RecursiveAstVisitor.prototype.visitImplicitReceiver = function (ast) { return null; };
                RecursiveAstVisitor.prototype.visitInterpolation = function (ast) { return this.visitAll(ast.expressions); };
                RecursiveAstVisitor.prototype.visitKeyedRead = function (ast) {
                    ast.obj.visit(this);
                    ast.key.visit(this);
                    return null;
                };
                RecursiveAstVisitor.prototype.visitKeyedWrite = function (ast) {
                    ast.obj.visit(this);
                    ast.key.visit(this);
                    ast.value.visit(this);
                    return null;
                };
                RecursiveAstVisitor.prototype.visitLiteralArray = function (ast) { return this.visitAll(ast.expressions); };
                RecursiveAstVisitor.prototype.visitLiteralMap = function (ast) { return this.visitAll(ast.values); };
                RecursiveAstVisitor.prototype.visitLiteralPrimitive = function (ast) { return null; };
                RecursiveAstVisitor.prototype.visitMethodCall = function (ast) {
                    ast.receiver.visit(this);
                    return this.visitAll(ast.args);
                };
                RecursiveAstVisitor.prototype.visitPrefixNot = function (ast) {
                    ast.expression.visit(this);
                    return null;
                };
                RecursiveAstVisitor.prototype.visitPropertyRead = function (ast) {
                    ast.receiver.visit(this);
                    return null;
                };
                RecursiveAstVisitor.prototype.visitPropertyWrite = function (ast) {
                    ast.receiver.visit(this);
                    ast.value.visit(this);
                    return null;
                };
                RecursiveAstVisitor.prototype.visitSafePropertyRead = function (ast) {
                    ast.receiver.visit(this);
                    return null;
                };
                RecursiveAstVisitor.prototype.visitSafeMethodCall = function (ast) {
                    ast.receiver.visit(this);
                    return this.visitAll(ast.args);
                };
                RecursiveAstVisitor.prototype.visitAll = function (asts) {
                    var _this = this;
                    asts.forEach(function (ast) { return ast.visit(_this); });
                    return null;
                };
                RecursiveAstVisitor.prototype.visitQuote = function (ast) { return null; };
                return RecursiveAstVisitor;
            }());
            exports_1("RecursiveAstVisitor", RecursiveAstVisitor);
            AstTransformer = (function () {
                function AstTransformer() {
                }
                AstTransformer.prototype.visitImplicitReceiver = function (ast) { return ast; };
                AstTransformer.prototype.visitInterpolation = function (ast) {
                    return new Interpolation(ast.strings, this.visitAll(ast.expressions));
                };
                AstTransformer.prototype.visitLiteralPrimitive = function (ast) { return new LiteralPrimitive(ast.value); };
                AstTransformer.prototype.visitPropertyRead = function (ast) {
                    return new PropertyRead(ast.receiver.visit(this), ast.name, ast.getter);
                };
                AstTransformer.prototype.visitPropertyWrite = function (ast) {
                    return new PropertyWrite(ast.receiver.visit(this), ast.name, ast.setter, ast.value);
                };
                AstTransformer.prototype.visitSafePropertyRead = function (ast) {
                    return new SafePropertyRead(ast.receiver.visit(this), ast.name, ast.getter);
                };
                AstTransformer.prototype.visitMethodCall = function (ast) {
                    return new MethodCall(ast.receiver.visit(this), ast.name, ast.fn, this.visitAll(ast.args));
                };
                AstTransformer.prototype.visitSafeMethodCall = function (ast) {
                    return new SafeMethodCall(ast.receiver.visit(this), ast.name, ast.fn, this.visitAll(ast.args));
                };
                AstTransformer.prototype.visitFunctionCall = function (ast) {
                    return new FunctionCall(ast.target.visit(this), this.visitAll(ast.args));
                };
                AstTransformer.prototype.visitLiteralArray = function (ast) {
                    return new LiteralArray(this.visitAll(ast.expressions));
                };
                AstTransformer.prototype.visitLiteralMap = function (ast) {
                    return new LiteralMap(ast.keys, this.visitAll(ast.values));
                };
                AstTransformer.prototype.visitBinary = function (ast) {
                    return new Binary(ast.operation, ast.left.visit(this), ast.right.visit(this));
                };
                AstTransformer.prototype.visitPrefixNot = function (ast) { return new PrefixNot(ast.expression.visit(this)); };
                AstTransformer.prototype.visitConditional = function (ast) {
                    return new Conditional(ast.condition.visit(this), ast.trueExp.visit(this), ast.falseExp.visit(this));
                };
                AstTransformer.prototype.visitPipe = function (ast) {
                    return new BindingPipe(ast.exp.visit(this), ast.name, this.visitAll(ast.args));
                };
                AstTransformer.prototype.visitKeyedRead = function (ast) {
                    return new KeyedRead(ast.obj.visit(this), ast.key.visit(this));
                };
                AstTransformer.prototype.visitKeyedWrite = function (ast) {
                    return new KeyedWrite(ast.obj.visit(this), ast.key.visit(this), ast.value.visit(this));
                };
                AstTransformer.prototype.visitAll = function (asts) {
                    var res = collection_1.ListWrapper.createFixedSize(asts.length);
                    for (var i = 0; i < asts.length; ++i) {
                        res[i] = asts[i].visit(this);
                    }
                    return res;
                };
                AstTransformer.prototype.visitChain = function (ast) { return new Chain(this.visitAll(ast.expressions)); };
                AstTransformer.prototype.visitQuote = function (ast) {
                    return new Quote(ast.prefix, ast.uninterpretedExpression, ast.location);
                };
                return AstTransformer;
            }());
            exports_1("AstTransformer", AstTransformer);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9wYXJzZXIvYXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7WUFFQTtnQkFBQTtnQkFHQSxDQUFDO2dCQUZDLG1CQUFLLEdBQUwsVUFBTSxPQUFtQixJQUFTLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxzQkFBUSxHQUFSLGNBQXFCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxVQUFDO1lBQUQsQ0FIQSxBQUdDLElBQUE7WUFIRCxxQkFHQyxDQUFBO1lBRUQ7Ozs7Ozs7Ozs7OztlQVlHO1lBQ0g7Z0JBQTJCLHlCQUFHO2dCQUM1QixlQUFtQixNQUFjLEVBQVMsdUJBQStCLEVBQVMsUUFBYTtvQkFDN0YsaUJBQU8sQ0FBQztvQkFEUyxXQUFNLEdBQU4sTUFBTSxDQUFRO29CQUFTLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBUTtvQkFBUyxhQUFRLEdBQVIsUUFBUSxDQUFLO2dCQUUvRixDQUFDO2dCQUNELHFCQUFLLEdBQUwsVUFBTSxPQUFtQixJQUFTLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEUsd0JBQVEsR0FBUixjQUFxQixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDeEMsWUFBQztZQUFELENBTkEsQUFNQyxDQU4wQixHQUFHLEdBTTdCO1lBTkQseUJBTUMsQ0FBQTtZQUVEO2dCQUErQiw2QkFBRztnQkFBbEM7b0JBQStCLDhCQUFHO2dCQUlsQyxDQUFDO2dCQUhDLHlCQUFLLEdBQUwsVUFBTSxPQUFtQjtvQkFDdkIsYUFBYTtnQkFDZixDQUFDO2dCQUNILGdCQUFDO1lBQUQsQ0FKQSxBQUlDLENBSjhCLEdBQUcsR0FJakM7WUFKRCxpQ0FJQyxDQUFBO1lBRUQ7Z0JBQXNDLG9DQUFHO2dC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QUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMvQixDQUFDO29CQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7Z0JBQ2IsQ0FBQztnQkFFRCxtQ0FBVSxHQUFWLFVBQVcsR0FBVSxJQUFTLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFakYsbUNBQVUsR0FBVixVQUFXLEdBQVU7b0JBQ25CLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzFFLENBQUM7Z0JBQ0gscUJBQUM7WUFBRCxDQTdFQSxBQTZFQyxJQUFBO1lBN0VELDJDQTZFQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9wYXJzZXIvYXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtMaXN0V3JhcHBlcn0gZnJvbSBcImFuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvblwiO1xuXG5leHBvcnQgY2xhc3MgQVNUIHtcbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvcik6IGFueSB7IHJldHVybiBudWxsOyB9XG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiBcIkFTVFwiOyB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHF1b3RlZCBleHByZXNzaW9uIG9mIHRoZSBmb3JtOlxuICpcbiAqIHF1b3RlID0gcHJlZml4IGA6YCB1bmludGVycHJldGVkRXhwcmVzc2lvblxuICogcHJlZml4ID0gaWRlbnRpZmllclxuICogdW5pbnRlcnByZXRlZEV4cHJlc3Npb24gPSBhcmJpdHJhcnkgc3RyaW5nXG4gKlxuICogQSBxdW90ZWQgZXhwcmVzc2lvbiBpcyBtZWFudCB0byBiZSBwcmUtcHJvY2Vzc2VkIGJ5IGFuIEFTVCB0cmFuc2Zvcm1lciB0aGF0XG4gKiBjb252ZXJ0cyBpdCBpbnRvIGFub3RoZXIgQVNUIHRoYXQgbm8gbG9uZ2VyIGNvbnRhaW5zIHF1b3RlZCBleHByZXNzaW9ucy5cbiAqIEl0IGlzIG1lYW50IHRvIGFsbG93IHRoaXJkLXBhcnR5IGRldmVsb3BlcnMgdG8gZXh0ZW5kIEFuZ3VsYXIgdGVtcGxhdGVcbiAqIGV4cHJlc3Npb24gbGFuZ3VhZ2UuIFRoZSBgdW5pbnRlcnByZXRlZEV4cHJlc3Npb25gIHBhcnQgb2YgdGhlIHF1b3RlIGlzXG4gKiB0aGVyZWZvcmUgbm90IGludGVycHJldGVkIGJ5IHRoZSBBbmd1bGFyJ3Mgb3duIGV4cHJlc3Npb24gcGFyc2VyLlxuICovXG5leHBvcnQgY2xhc3MgUXVvdGUgZXh0ZW5kcyBBU1Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJlZml4OiBzdHJpbmcsIHB1YmxpYyB1bmludGVycHJldGVkRXhwcmVzc2lvbjogc3RyaW5nLCBwdWJsaWMgbG9jYXRpb246IGFueSkge1xuICAgIHN1cGVyKCk7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvcik6IGFueSB7IHJldHVybiB2aXNpdG9yLnZpc2l0UXVvdGUodGhpcyk7IH1cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIFwiUXVvdGVcIjsgfVxufVxuXG5leHBvcnQgY2xhc3MgRW1wdHlFeHByIGV4dGVuZHMgQVNUIHtcbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvcikge1xuICAgIC8vIGRvIG5vdGhpbmdcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW1wbGljaXRSZWNlaXZlciBleHRlbmRzIEFTVCB7XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IpOiBhbnkgeyByZXR1cm4gdmlzaXRvci52aXNpdEltcGxpY2l0UmVjZWl2ZXIodGhpcyk7IH1cbn1cblxuLyoqXG4gKiBNdWx0aXBsZSBleHByZXNzaW9ucyBzZXBhcmF0ZWQgYnkgYSBzZW1pY29sb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBDaGFpbiBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBleHByZXNzaW9uczogYW55W10pIHsgc3VwZXIoKTsgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yKTogYW55IHsgcmV0dXJuIHZpc2l0b3IudmlzaXRDaGFpbih0aGlzKTsgfVxufVxuXG5leHBvcnQgY2xhc3MgQ29uZGl0aW9uYWwgZXh0ZW5kcyBBU1Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29uZGl0aW9uOiBBU1QsIHB1YmxpYyB0cnVlRXhwOiBBU1QsIHB1YmxpYyBmYWxzZUV4cDogQVNUKSB7IHN1cGVyKCk7IH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvcik6IGFueSB7IHJldHVybiB2aXNpdG9yLnZpc2l0Q29uZGl0aW9uYWwodGhpcyk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFByb3BlcnR5UmVhZCBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWNlaXZlcjogQVNULCBwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgZ2V0dGVyOiBGdW5jdGlvbikgeyBzdXBlcigpOyB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IpOiBhbnkgeyByZXR1cm4gdmlzaXRvci52aXNpdFByb3BlcnR5UmVhZCh0aGlzKTsgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJvcGVydHlXcml0ZSBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWNlaXZlcjogQVNULCBwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgc2V0dGVyOiBGdW5jdGlvbixcbiAgICAgICAgICAgICAgcHVibGljIHZhbHVlOiBBU1QpIHtcbiAgICBzdXBlcigpO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IpOiBhbnkgeyByZXR1cm4gdmlzaXRvci52aXNpdFByb3BlcnR5V3JpdGUodGhpcyk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFNhZmVQcm9wZXJ0eVJlYWQgZXh0ZW5kcyBBU1Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVjZWl2ZXI6IEFTVCwgcHVibGljIG5hbWU6IHN0cmluZywgcHVibGljIGdldHRlcjogRnVuY3Rpb24pIHsgc3VwZXIoKTsgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yKTogYW55IHsgcmV0dXJuIHZpc2l0b3IudmlzaXRTYWZlUHJvcGVydHlSZWFkKHRoaXMpOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBLZXllZFJlYWQgZXh0ZW5kcyBBU1Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgb2JqOiBBU1QsIHB1YmxpYyBrZXk6IEFTVCkgeyBzdXBlcigpOyB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IpOiBhbnkgeyByZXR1cm4gdmlzaXRvci52aXNpdEtleWVkUmVhZCh0aGlzKTsgfVxufVxuXG5leHBvcnQgY2xhc3MgS2V5ZWRXcml0ZSBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvYmo6IEFTVCwgcHVibGljIGtleTogQVNULCBwdWJsaWMgdmFsdWU6IEFTVCkgeyBzdXBlcigpOyB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IpOiBhbnkgeyByZXR1cm4gdmlzaXRvci52aXNpdEtleWVkV3JpdGUodGhpcyk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIEJpbmRpbmdQaXBlIGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3IocHVibGljIGV4cDogQVNULCBwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgYXJnczogYW55W10pIHsgc3VwZXIoKTsgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yKTogYW55IHsgcmV0dXJuIHZpc2l0b3IudmlzaXRQaXBlKHRoaXMpOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBMaXRlcmFsUHJpbWl0aXZlIGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3IocHVibGljIHZhbHVlKSB7IHN1cGVyKCk7IH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvcik6IGFueSB7IHJldHVybiB2aXNpdG9yLnZpc2l0TGl0ZXJhbFByaW1pdGl2ZSh0aGlzKTsgfVxufVxuXG5leHBvcnQgY2xhc3MgTGl0ZXJhbEFycmF5IGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3IocHVibGljIGV4cHJlc3Npb25zOiBhbnlbXSkgeyBzdXBlcigpOyB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IpOiBhbnkgeyByZXR1cm4gdmlzaXRvci52aXNpdExpdGVyYWxBcnJheSh0aGlzKTsgfVxufVxuXG5leHBvcnQgY2xhc3MgTGl0ZXJhbE1hcCBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBrZXlzOiBhbnlbXSwgcHVibGljIHZhbHVlczogYW55W10pIHsgc3VwZXIoKTsgfVxuICB2aXNpdCh2aXNpdG9yOiBBc3RWaXNpdG9yKTogYW55IHsgcmV0dXJuIHZpc2l0b3IudmlzaXRMaXRlcmFsTWFwKHRoaXMpOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnRlcnBvbGF0aW9uIGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3IocHVibGljIHN0cmluZ3M6IGFueVtdLCBwdWJsaWMgZXhwcmVzc2lvbnM6IGFueVtdKSB7IHN1cGVyKCk7IH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvcik6IGFueSB7IHJldHVybiB2aXNpdG9yLnZpc2l0SW50ZXJwb2xhdGlvbih0aGlzKTsgfVxufVxuXG5leHBvcnQgY2xhc3MgQmluYXJ5IGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3IocHVibGljIG9wZXJhdGlvbjogc3RyaW5nLCBwdWJsaWMgbGVmdDogQVNULCBwdWJsaWMgcmlnaHQ6IEFTVCkgeyBzdXBlcigpOyB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IpOiBhbnkgeyByZXR1cm4gdmlzaXRvci52aXNpdEJpbmFyeSh0aGlzKTsgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJlZml4Tm90IGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3IocHVibGljIGV4cHJlc3Npb246IEFTVCkgeyBzdXBlcigpOyB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IpOiBhbnkgeyByZXR1cm4gdmlzaXRvci52aXNpdFByZWZpeE5vdCh0aGlzKTsgfVxufVxuXG5leHBvcnQgY2xhc3MgTWV0aG9kQ2FsbCBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWNlaXZlcjogQVNULCBwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgZm46IEZ1bmN0aW9uLCBwdWJsaWMgYXJnczogYW55W10pIHtcbiAgICBzdXBlcigpO1xuICB9XG4gIHZpc2l0KHZpc2l0b3I6IEFzdFZpc2l0b3IpOiBhbnkgeyByZXR1cm4gdmlzaXRvci52aXNpdE1ldGhvZENhbGwodGhpcyk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFNhZmVNZXRob2RDYWxsIGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3IocHVibGljIHJlY2VpdmVyOiBBU1QsIHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyBmbjogRnVuY3Rpb24sIHB1YmxpYyBhcmdzOiBhbnlbXSkge1xuICAgIHN1cGVyKCk7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvcik6IGFueSB7IHJldHVybiB2aXNpdG9yLnZpc2l0U2FmZU1ldGhvZENhbGwodGhpcyk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIEZ1bmN0aW9uQ2FsbCBleHRlbmRzIEFTVCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0YXJnZXQ6IEFTVCwgcHVibGljIGFyZ3M6IGFueVtdKSB7IHN1cGVyKCk7IH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvcik6IGFueSB7IHJldHVybiB2aXNpdG9yLnZpc2l0RnVuY3Rpb25DYWxsKHRoaXMpOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBBU1RXaXRoU291cmNlIGV4dGVuZHMgQVNUIHtcbiAgY29uc3RydWN0b3IocHVibGljIGFzdDogQVNULCBwdWJsaWMgc291cmNlOiBzdHJpbmcsIHB1YmxpYyBsb2NhdGlvbjogc3RyaW5nKSB7IHN1cGVyKCk7IH1cbiAgdmlzaXQodmlzaXRvcjogQXN0VmlzaXRvcik6IGFueSB7IHJldHVybiB0aGlzLmFzdC52aXNpdCh2aXNpdG9yKTsgfVxuICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gYCR7dGhpcy5zb3VyY2V9IGluICR7dGhpcy5sb2NhdGlvbn1gOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZUJpbmRpbmcge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMga2V5OiBzdHJpbmcsIHB1YmxpYyBrZXlJc1ZhcjogYm9vbGVhbiwgcHVibGljIG5hbWU6IHN0cmluZyxcbiAgICAgICAgICAgICAgcHVibGljIGV4cHJlc3Npb246IEFTVFdpdGhTb3VyY2UpIHt9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXN0VmlzaXRvciB7XG4gIHZpc2l0QmluYXJ5KGFzdDogQmluYXJ5KTogYW55O1xuICB2aXNpdENoYWluKGFzdDogQ2hhaW4pOiBhbnk7XG4gIHZpc2l0Q29uZGl0aW9uYWwoYXN0OiBDb25kaXRpb25hbCk6IGFueTtcbiAgdmlzaXRGdW5jdGlvbkNhbGwoYXN0OiBGdW5jdGlvbkNhbGwpOiBhbnk7XG4gIHZpc2l0SW1wbGljaXRSZWNlaXZlcihhc3Q6IEltcGxpY2l0UmVjZWl2ZXIpOiBhbnk7XG4gIHZpc2l0SW50ZXJwb2xhdGlvbihhc3Q6IEludGVycG9sYXRpb24pOiBhbnk7XG4gIHZpc2l0S2V5ZWRSZWFkKGFzdDogS2V5ZWRSZWFkKTogYW55O1xuICB2aXNpdEtleWVkV3JpdGUoYXN0OiBLZXllZFdyaXRlKTogYW55O1xuICB2aXNpdExpdGVyYWxBcnJheShhc3Q6IExpdGVyYWxBcnJheSk6IGFueTtcbiAgdmlzaXRMaXRlcmFsTWFwKGFzdDogTGl0ZXJhbE1hcCk6IGFueTtcbiAgdmlzaXRMaXRlcmFsUHJpbWl0aXZlKGFzdDogTGl0ZXJhbFByaW1pdGl2ZSk6IGFueTtcbiAgdmlzaXRNZXRob2RDYWxsKGFzdDogTWV0aG9kQ2FsbCk6IGFueTtcbiAgdmlzaXRQaXBlKGFzdDogQmluZGluZ1BpcGUpOiBhbnk7XG4gIHZpc2l0UHJlZml4Tm90KGFzdDogUHJlZml4Tm90KTogYW55O1xuICB2aXNpdFByb3BlcnR5UmVhZChhc3Q6IFByb3BlcnR5UmVhZCk6IGFueTtcbiAgdmlzaXRQcm9wZXJ0eVdyaXRlKGFzdDogUHJvcGVydHlXcml0ZSk6IGFueTtcbiAgdmlzaXRRdW90ZShhc3Q6IFF1b3RlKTogYW55O1xuICB2aXNpdFNhZmVNZXRob2RDYWxsKGFzdDogU2FmZU1ldGhvZENhbGwpOiBhbnk7XG4gIHZpc2l0U2FmZVByb3BlcnR5UmVhZChhc3Q6IFNhZmVQcm9wZXJ0eVJlYWQpOiBhbnk7XG59XG5cbmV4cG9ydCBjbGFzcyBSZWN1cnNpdmVBc3RWaXNpdG9yIGltcGxlbWVudHMgQXN0VmlzaXRvciB7XG4gIHZpc2l0QmluYXJ5KGFzdDogQmluYXJ5KTogYW55IHtcbiAgICBhc3QubGVmdC52aXNpdCh0aGlzKTtcbiAgICBhc3QucmlnaHQudmlzaXQodGhpcyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXRDaGFpbihhc3Q6IENoYWluKTogYW55IHsgcmV0dXJuIHRoaXMudmlzaXRBbGwoYXN0LmV4cHJlc3Npb25zKTsgfVxuICB2aXNpdENvbmRpdGlvbmFsKGFzdDogQ29uZGl0aW9uYWwpOiBhbnkge1xuICAgIGFzdC5jb25kaXRpb24udmlzaXQodGhpcyk7XG4gICAgYXN0LnRydWVFeHAudmlzaXQodGhpcyk7XG4gICAgYXN0LmZhbHNlRXhwLnZpc2l0KHRoaXMpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0UGlwZShhc3Q6IEJpbmRpbmdQaXBlKTogYW55IHtcbiAgICBhc3QuZXhwLnZpc2l0KHRoaXMpO1xuICAgIHRoaXMudmlzaXRBbGwoYXN0LmFyZ3MpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0RnVuY3Rpb25DYWxsKGFzdDogRnVuY3Rpb25DYWxsKTogYW55IHtcbiAgICBhc3QudGFyZ2V0LnZpc2l0KHRoaXMpO1xuICAgIHRoaXMudmlzaXRBbGwoYXN0LmFyZ3MpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0SW1wbGljaXRSZWNlaXZlcihhc3Q6IEltcGxpY2l0UmVjZWl2ZXIpOiBhbnkgeyByZXR1cm4gbnVsbDsgfVxuICB2aXNpdEludGVycG9sYXRpb24oYXN0OiBJbnRlcnBvbGF0aW9uKTogYW55IHsgcmV0dXJuIHRoaXMudmlzaXRBbGwoYXN0LmV4cHJlc3Npb25zKTsgfVxuICB2aXNpdEtleWVkUmVhZChhc3Q6IEtleWVkUmVhZCk6IGFueSB7XG4gICAgYXN0Lm9iai52aXNpdCh0aGlzKTtcbiAgICBhc3Qua2V5LnZpc2l0KHRoaXMpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0S2V5ZWRXcml0ZShhc3Q6IEtleWVkV3JpdGUpOiBhbnkge1xuICAgIGFzdC5vYmoudmlzaXQodGhpcyk7XG4gICAgYXN0LmtleS52aXNpdCh0aGlzKTtcbiAgICBhc3QudmFsdWUudmlzaXQodGhpcyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXRMaXRlcmFsQXJyYXkoYXN0OiBMaXRlcmFsQXJyYXkpOiBhbnkgeyByZXR1cm4gdGhpcy52aXNpdEFsbChhc3QuZXhwcmVzc2lvbnMpOyB9XG4gIHZpc2l0TGl0ZXJhbE1hcChhc3Q6IExpdGVyYWxNYXApOiBhbnkgeyByZXR1cm4gdGhpcy52aXNpdEFsbChhc3QudmFsdWVzKTsgfVxuICB2aXNpdExpdGVyYWxQcmltaXRpdmUoYXN0OiBMaXRlcmFsUHJpbWl0aXZlKTogYW55IHsgcmV0dXJuIG51bGw7IH1cbiAgdmlzaXRNZXRob2RDYWxsKGFzdDogTWV0aG9kQ2FsbCk6IGFueSB7XG4gICAgYXN0LnJlY2VpdmVyLnZpc2l0KHRoaXMpO1xuICAgIHJldHVybiB0aGlzLnZpc2l0QWxsKGFzdC5hcmdzKTtcbiAgfVxuICB2aXNpdFByZWZpeE5vdChhc3Q6IFByZWZpeE5vdCk6IGFueSB7XG4gICAgYXN0LmV4cHJlc3Npb24udmlzaXQodGhpcyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXRQcm9wZXJ0eVJlYWQoYXN0OiBQcm9wZXJ0eVJlYWQpOiBhbnkge1xuICAgIGFzdC5yZWNlaXZlci52aXNpdCh0aGlzKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdFByb3BlcnR5V3JpdGUoYXN0OiBQcm9wZXJ0eVdyaXRlKTogYW55IHtcbiAgICBhc3QucmVjZWl2ZXIudmlzaXQodGhpcyk7XG4gICAgYXN0LnZhbHVlLnZpc2l0KHRoaXMpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0U2FmZVByb3BlcnR5UmVhZChhc3Q6IFNhZmVQcm9wZXJ0eVJlYWQpOiBhbnkge1xuICAgIGFzdC5yZWNlaXZlci52aXNpdCh0aGlzKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdFNhZmVNZXRob2RDYWxsKGFzdDogU2FmZU1ldGhvZENhbGwpOiBhbnkge1xuICAgIGFzdC5yZWNlaXZlci52aXNpdCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy52aXNpdEFsbChhc3QuYXJncyk7XG4gIH1cbiAgdmlzaXRBbGwoYXN0czogQVNUW10pOiBhbnkge1xuICAgIGFzdHMuZm9yRWFjaChhc3QgPT4gYXN0LnZpc2l0KHRoaXMpKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdFF1b3RlKGFzdDogUXVvdGUpOiBhbnkgeyByZXR1cm4gbnVsbDsgfVxufVxuXG5leHBvcnQgY2xhc3MgQXN0VHJhbnNmb3JtZXIgaW1wbGVtZW50cyBBc3RWaXNpdG9yIHtcbiAgdmlzaXRJbXBsaWNpdFJlY2VpdmVyKGFzdDogSW1wbGljaXRSZWNlaXZlcik6IEFTVCB7IHJldHVybiBhc3Q7IH1cblxuICB2aXNpdEludGVycG9sYXRpb24oYXN0OiBJbnRlcnBvbGF0aW9uKTogQVNUIHtcbiAgICByZXR1cm4gbmV3IEludGVycG9sYXRpb24oYXN0LnN0cmluZ3MsIHRoaXMudmlzaXRBbGwoYXN0LmV4cHJlc3Npb25zKSk7XG4gIH1cblxuICB2aXNpdExpdGVyYWxQcmltaXRpdmUoYXN0OiBMaXRlcmFsUHJpbWl0aXZlKTogQVNUIHsgcmV0dXJuIG5ldyBMaXRlcmFsUHJpbWl0aXZlKGFzdC52YWx1ZSk7IH1cblxuICB2aXNpdFByb3BlcnR5UmVhZChhc3Q6IFByb3BlcnR5UmVhZCk6IEFTVCB7XG4gICAgcmV0dXJuIG5ldyBQcm9wZXJ0eVJlYWQoYXN0LnJlY2VpdmVyLnZpc2l0KHRoaXMpLCBhc3QubmFtZSwgYXN0LmdldHRlcik7XG4gIH1cblxuICB2aXNpdFByb3BlcnR5V3JpdGUoYXN0OiBQcm9wZXJ0eVdyaXRlKTogQVNUIHtcbiAgICByZXR1cm4gbmV3IFByb3BlcnR5V3JpdGUoYXN0LnJlY2VpdmVyLnZpc2l0KHRoaXMpLCBhc3QubmFtZSwgYXN0LnNldHRlciwgYXN0LnZhbHVlKTtcbiAgfVxuXG4gIHZpc2l0U2FmZVByb3BlcnR5UmVhZChhc3Q6IFNhZmVQcm9wZXJ0eVJlYWQpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgU2FmZVByb3BlcnR5UmVhZChhc3QucmVjZWl2ZXIudmlzaXQodGhpcyksIGFzdC5uYW1lLCBhc3QuZ2V0dGVyKTtcbiAgfVxuXG4gIHZpc2l0TWV0aG9kQ2FsbChhc3Q6IE1ldGhvZENhbGwpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgTWV0aG9kQ2FsbChhc3QucmVjZWl2ZXIudmlzaXQodGhpcyksIGFzdC5uYW1lLCBhc3QuZm4sIHRoaXMudmlzaXRBbGwoYXN0LmFyZ3MpKTtcbiAgfVxuXG4gIHZpc2l0U2FmZU1ldGhvZENhbGwoYXN0OiBTYWZlTWV0aG9kQ2FsbCk6IEFTVCB7XG4gICAgcmV0dXJuIG5ldyBTYWZlTWV0aG9kQ2FsbChhc3QucmVjZWl2ZXIudmlzaXQodGhpcyksIGFzdC5uYW1lLCBhc3QuZm4sIHRoaXMudmlzaXRBbGwoYXN0LmFyZ3MpKTtcbiAgfVxuXG4gIHZpc2l0RnVuY3Rpb25DYWxsKGFzdDogRnVuY3Rpb25DYWxsKTogQVNUIHtcbiAgICByZXR1cm4gbmV3IEZ1bmN0aW9uQ2FsbChhc3QudGFyZ2V0LnZpc2l0KHRoaXMpLCB0aGlzLnZpc2l0QWxsKGFzdC5hcmdzKSk7XG4gIH1cblxuICB2aXNpdExpdGVyYWxBcnJheShhc3Q6IExpdGVyYWxBcnJheSk6IEFTVCB7XG4gICAgcmV0dXJuIG5ldyBMaXRlcmFsQXJyYXkodGhpcy52aXNpdEFsbChhc3QuZXhwcmVzc2lvbnMpKTtcbiAgfVxuXG4gIHZpc2l0TGl0ZXJhbE1hcChhc3Q6IExpdGVyYWxNYXApOiBBU1Qge1xuICAgIHJldHVybiBuZXcgTGl0ZXJhbE1hcChhc3Qua2V5cywgdGhpcy52aXNpdEFsbChhc3QudmFsdWVzKSk7XG4gIH1cblxuICB2aXNpdEJpbmFyeShhc3Q6IEJpbmFyeSk6IEFTVCB7XG4gICAgcmV0dXJuIG5ldyBCaW5hcnkoYXN0Lm9wZXJhdGlvbiwgYXN0LmxlZnQudmlzaXQodGhpcyksIGFzdC5yaWdodC52aXNpdCh0aGlzKSk7XG4gIH1cblxuICB2aXNpdFByZWZpeE5vdChhc3Q6IFByZWZpeE5vdCk6IEFTVCB7IHJldHVybiBuZXcgUHJlZml4Tm90KGFzdC5leHByZXNzaW9uLnZpc2l0KHRoaXMpKTsgfVxuXG4gIHZpc2l0Q29uZGl0aW9uYWwoYXN0OiBDb25kaXRpb25hbCk6IEFTVCB7XG4gICAgcmV0dXJuIG5ldyBDb25kaXRpb25hbChhc3QuY29uZGl0aW9uLnZpc2l0KHRoaXMpLCBhc3QudHJ1ZUV4cC52aXNpdCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzdC5mYWxzZUV4cC52aXNpdCh0aGlzKSk7XG4gIH1cblxuICB2aXNpdFBpcGUoYXN0OiBCaW5kaW5nUGlwZSk6IEFTVCB7XG4gICAgcmV0dXJuIG5ldyBCaW5kaW5nUGlwZShhc3QuZXhwLnZpc2l0KHRoaXMpLCBhc3QubmFtZSwgdGhpcy52aXNpdEFsbChhc3QuYXJncykpO1xuICB9XG5cbiAgdmlzaXRLZXllZFJlYWQoYXN0OiBLZXllZFJlYWQpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgS2V5ZWRSZWFkKGFzdC5vYmoudmlzaXQodGhpcyksIGFzdC5rZXkudmlzaXQodGhpcykpO1xuICB9XG5cbiAgdmlzaXRLZXllZFdyaXRlKGFzdDogS2V5ZWRXcml0ZSk6IEFTVCB7XG4gICAgcmV0dXJuIG5ldyBLZXllZFdyaXRlKGFzdC5vYmoudmlzaXQodGhpcyksIGFzdC5rZXkudmlzaXQodGhpcyksIGFzdC52YWx1ZS52aXNpdCh0aGlzKSk7XG4gIH1cblxuICB2aXNpdEFsbChhc3RzOiBhbnlbXSk6IGFueVtdIHtcbiAgICB2YXIgcmVzID0gTGlzdFdyYXBwZXIuY3JlYXRlRml4ZWRTaXplKGFzdHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFzdHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHJlc1tpXSA9IGFzdHNbaV0udmlzaXQodGhpcyk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICB2aXNpdENoYWluKGFzdDogQ2hhaW4pOiBBU1QgeyByZXR1cm4gbmV3IENoYWluKHRoaXMudmlzaXRBbGwoYXN0LmV4cHJlc3Npb25zKSk7IH1cblxuICB2aXNpdFF1b3RlKGFzdDogUXVvdGUpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgUXVvdGUoYXN0LnByZWZpeCwgYXN0LnVuaW50ZXJwcmV0ZWRFeHByZXNzaW9uLCBhc3QubG9jYXRpb24pO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
