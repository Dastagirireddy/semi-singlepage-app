System.register(['angular2/src/facade/collection', 'angular2/src/facade/lang', 'angular2/core', 'angular2/src/core/console', 'angular2/src/facade/exceptions', './expression_parser/ast', './expression_parser/parser', './html_parser', './html_tags', './parse_util', 'angular2/src/core/linker/view_utils', './template_ast', 'angular2/src/compiler/selector', 'angular2/src/compiler/schema/element_schema_registry', './template_preparser', './style_url_resolver', './html_ast', './util', './identifiers', './provider_parser'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var collection_1, lang_1, core_1, console_1, exceptions_1, ast_1, parser_1, html_parser_1, html_tags_1, parse_util_1, view_utils_1, template_ast_1, selector_1, element_schema_registry_1, template_preparser_1, style_url_resolver_1, html_ast_1, util_1, identifiers_1, provider_parser_1;
    var BIND_NAME_REGEXP, TEMPLATE_ELEMENT, TEMPLATE_ATTR, TEMPLATE_ATTR_PREFIX, CLASS_ATTR, PROPERTY_PARTS_SEPARATOR, ATTRIBUTE_PREFIX, CLASS_PREFIX, STYLE_PREFIX, TEXT_CSS_SELECTOR, TEMPLATE_TRANSFORMS, TemplateParseError, TemplateParseResult, TemplateParser, TemplateParseVisitor, NonBindableVisitor, BoundElementOrDirectiveProperty, ElementOrDirectiveRef, ElementContext, EMPTY_ELEMENT_CONTEXT, NON_BINDABLE_VISITOR, PipeCollector;
    function splitClasses(classAttrValue) {
        return lang_1.StringWrapper.split(classAttrValue.trim(), /\s+/g);
    }
    exports_1("splitClasses", splitClasses);
    function createElementCssSelector(elementName, matchableAttrs) {
        var cssSelector = new selector_1.CssSelector();
        var elNameNoNs = html_tags_1.splitNsName(elementName)[1];
        cssSelector.setElement(elNameNoNs);
        for (var i = 0; i < matchableAttrs.length; i++) {
            var attrName = matchableAttrs[i][0];
            var attrNameNoNs = html_tags_1.splitNsName(attrName)[1];
            var attrValue = matchableAttrs[i][1];
            cssSelector.addAttribute(attrNameNoNs, attrValue);
            if (attrName.toLowerCase() == CLASS_ATTR) {
                var classes = splitClasses(attrValue);
                classes.forEach(function (className) { return cssSelector.addClassName(className); });
            }
        }
        return cssSelector;
    }
    function removeDuplicates(items) {
        var res = [];
        items.forEach(function (item) {
            var hasMatch = res.filter(function (r) { return r.type.name == item.type.name && r.type.moduleUrl == item.type.moduleUrl &&
                r.type.runtime == item.type.runtime; })
                .length > 0;
            if (!hasMatch) {
                res.push(item);
            }
        });
        return res;
    }
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (console_1_1) {
                console_1 = console_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (ast_1_1) {
                ast_1 = ast_1_1;
            },
            function (parser_1_1) {
                parser_1 = parser_1_1;
            },
            function (html_parser_1_1) {
                html_parser_1 = html_parser_1_1;
            },
            function (html_tags_1_1) {
                html_tags_1 = html_tags_1_1;
            },
            function (parse_util_1_1) {
                parse_util_1 = parse_util_1_1;
            },
            function (view_utils_1_1) {
                view_utils_1 = view_utils_1_1;
            },
            function (template_ast_1_1) {
                template_ast_1 = template_ast_1_1;
            },
            function (selector_1_1) {
                selector_1 = selector_1_1;
            },
            function (element_schema_registry_1_1) {
                element_schema_registry_1 = element_schema_registry_1_1;
            },
            function (template_preparser_1_1) {
                template_preparser_1 = template_preparser_1_1;
            },
            function (style_url_resolver_1_1) {
                style_url_resolver_1 = style_url_resolver_1_1;
            },
            function (html_ast_1_1) {
                html_ast_1 = html_ast_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (identifiers_1_1) {
                identifiers_1 = identifiers_1_1;
            },
            function (provider_parser_1_1) {
                provider_parser_1 = provider_parser_1_1;
            }],
        execute: function() {
            // Group 1 = "bind-"
            // Group 2 = "var-"
            // Group 3 = "let-"
            // Group 4 = "ref-/#"
            // Group 5 = "on-"
            // Group 6 = "bindon-"
            // Group 7 = the identifier after "bind-", "var-/#", or "on-"
            // Group 8 = identifier inside [()]
            // Group 9 = identifier inside []
            // Group 10 = identifier inside ()
            BIND_NAME_REGEXP = /^(?:(?:(?:(bind-)|(var-)|(let-)|(ref-|#)|(on-)|(bindon-))(.+))|\[\(([^\)]+)\)\]|\[([^\]]+)\]|\(([^\)]+)\))$/g;
            TEMPLATE_ELEMENT = 'template';
            TEMPLATE_ATTR = 'template';
            TEMPLATE_ATTR_PREFIX = '*';
            CLASS_ATTR = 'class';
            PROPERTY_PARTS_SEPARATOR = '.';
            ATTRIBUTE_PREFIX = 'attr';
            CLASS_PREFIX = 'class';
            STYLE_PREFIX = 'style';
            TEXT_CSS_SELECTOR = selector_1.CssSelector.parse('*')[0];
            /**
             * Provides an array of {@link TemplateAstVisitor}s which will be used to transform
             * parsed templates before compilation is invoked, allowing custom expression syntax
             * and other advanced transformations.
             *
             * This is currently an internal-only feature and not meant for general use.
             */
            exports_1("TEMPLATE_TRANSFORMS", TEMPLATE_TRANSFORMS = lang_1.CONST_EXPR(new core_1.OpaqueToken('TemplateTransforms')));
            TemplateParseError = (function (_super) {
                __extends(TemplateParseError, _super);
                function TemplateParseError(message, span, level) {
                    _super.call(this, span, message, level);
                }
                return TemplateParseError;
            }(parse_util_1.ParseError));
            exports_1("TemplateParseError", TemplateParseError);
            TemplateParseResult = (function () {
                function TemplateParseResult(templateAst, errors) {
                    this.templateAst = templateAst;
                    this.errors = errors;
                }
                return TemplateParseResult;
            }());
            exports_1("TemplateParseResult", TemplateParseResult);
            TemplateParser = (function () {
                function TemplateParser(_exprParser, _schemaRegistry, _htmlParser, _console, transforms) {
                    this._exprParser = _exprParser;
                    this._schemaRegistry = _schemaRegistry;
                    this._htmlParser = _htmlParser;
                    this._console = _console;
                    this.transforms = transforms;
                }
                TemplateParser.prototype.parse = function (component, template, directives, pipes, templateUrl) {
                    var result = this.tryParse(component, template, directives, pipes, templateUrl);
                    var warnings = result.errors.filter(function (error) { return error.level === parse_util_1.ParseErrorLevel.WARNING; });
                    var errors = result.errors.filter(function (error) { return error.level === parse_util_1.ParseErrorLevel.FATAL; });
                    if (warnings.length > 0) {
                        this._console.warn("Template parse warnings:\n" + warnings.join('\n'));
                    }
                    if (errors.length > 0) {
                        var errorString = errors.join('\n');
                        throw new exceptions_1.BaseException("Template parse errors:\n" + errorString);
                    }
                    return result.templateAst;
                };
                TemplateParser.prototype.tryParse = function (component, template, directives, pipes, templateUrl) {
                    var htmlAstWithErrors = this._htmlParser.parse(template, templateUrl);
                    var errors = htmlAstWithErrors.errors;
                    var result;
                    if (htmlAstWithErrors.rootNodes.length > 0) {
                        var uniqDirectives = removeDuplicates(directives);
                        var uniqPipes = removeDuplicates(pipes);
                        var providerViewContext = new provider_parser_1.ProviderViewContext(component, htmlAstWithErrors.rootNodes[0].sourceSpan);
                        var parseVisitor = new TemplateParseVisitor(providerViewContext, uniqDirectives, uniqPipes, this._exprParser, this._schemaRegistry);
                        result = html_ast_1.htmlVisitAll(parseVisitor, htmlAstWithErrors.rootNodes, EMPTY_ELEMENT_CONTEXT);
                        errors = errors.concat(parseVisitor.errors).concat(providerViewContext.errors);
                    }
                    else {
                        result = [];
                    }
                    if (errors.length > 0) {
                        return new TemplateParseResult(result, errors);
                    }
                    if (lang_1.isPresent(this.transforms)) {
                        this.transforms.forEach(function (transform) { result = template_ast_1.templateVisitAll(transform, result); });
                    }
                    return new TemplateParseResult(result, errors);
                };
                TemplateParser = __decorate([
                    core_1.Injectable(),
                    __param(4, core_1.Optional()),
                    __param(4, core_1.Inject(TEMPLATE_TRANSFORMS)), 
                    __metadata('design:paramtypes', [parser_1.Parser, element_schema_registry_1.ElementSchemaRegistry, html_parser_1.HtmlParser, console_1.Console, Array])
                ], TemplateParser);
                return TemplateParser;
            }());
            exports_1("TemplateParser", TemplateParser);
            TemplateParseVisitor = (function () {
                function TemplateParseVisitor(providerViewContext, directives, pipes, _exprParser, _schemaRegistry) {
                    var _this = this;
                    this.providerViewContext = providerViewContext;
                    this._exprParser = _exprParser;
                    this._schemaRegistry = _schemaRegistry;
                    this.errors = [];
                    this.directivesIndex = new Map();
                    this.ngContentCount = 0;
                    this.selectorMatcher = new selector_1.SelectorMatcher();
                    collection_1.ListWrapper.forEachWithIndex(directives, function (directive, index) {
                        var selector = selector_1.CssSelector.parse(directive.selector);
                        _this.selectorMatcher.addSelectables(selector, directive);
                        _this.directivesIndex.set(directive, index);
                    });
                    this.pipesByName = new Map();
                    pipes.forEach(function (pipe) { return _this.pipesByName.set(pipe.name, pipe); });
                }
                TemplateParseVisitor.prototype._reportError = function (message, sourceSpan, level) {
                    if (level === void 0) { level = parse_util_1.ParseErrorLevel.FATAL; }
                    this.errors.push(new TemplateParseError(message, sourceSpan, level));
                };
                TemplateParseVisitor.prototype._parseInterpolation = function (value, sourceSpan) {
                    var sourceInfo = sourceSpan.start.toString();
                    try {
                        var ast = this._exprParser.parseInterpolation(value, sourceInfo);
                        this._checkPipes(ast, sourceSpan);
                        if (lang_1.isPresent(ast) &&
                            ast.ast.expressions.length > view_utils_1.MAX_INTERPOLATION_VALUES) {
                            throw new exceptions_1.BaseException("Only support at most " + view_utils_1.MAX_INTERPOLATION_VALUES + " interpolation values!");
                        }
                        return ast;
                    }
                    catch (e) {
                        this._reportError("" + e, sourceSpan);
                        return this._exprParser.wrapLiteralPrimitive('ERROR', sourceInfo);
                    }
                };
                TemplateParseVisitor.prototype._parseAction = function (value, sourceSpan) {
                    var sourceInfo = sourceSpan.start.toString();
                    try {
                        var ast = this._exprParser.parseAction(value, sourceInfo);
                        this._checkPipes(ast, sourceSpan);
                        return ast;
                    }
                    catch (e) {
                        this._reportError("" + e, sourceSpan);
                        return this._exprParser.wrapLiteralPrimitive('ERROR', sourceInfo);
                    }
                };
                TemplateParseVisitor.prototype._parseBinding = function (value, sourceSpan) {
                    var sourceInfo = sourceSpan.start.toString();
                    try {
                        var ast = this._exprParser.parseBinding(value, sourceInfo);
                        this._checkPipes(ast, sourceSpan);
                        return ast;
                    }
                    catch (e) {
                        this._reportError("" + e, sourceSpan);
                        return this._exprParser.wrapLiteralPrimitive('ERROR', sourceInfo);
                    }
                };
                TemplateParseVisitor.prototype._parseTemplateBindings = function (value, sourceSpan) {
                    var _this = this;
                    var sourceInfo = sourceSpan.start.toString();
                    try {
                        var bindingsResult = this._exprParser.parseTemplateBindings(value, sourceInfo);
                        bindingsResult.templateBindings.forEach(function (binding) {
                            if (lang_1.isPresent(binding.expression)) {
                                _this._checkPipes(binding.expression, sourceSpan);
                            }
                        });
                        bindingsResult.warnings.forEach(function (warning) { _this._reportError(warning, sourceSpan, parse_util_1.ParseErrorLevel.WARNING); });
                        return bindingsResult.templateBindings;
                    }
                    catch (e) {
                        this._reportError("" + e, sourceSpan);
                        return [];
                    }
                };
                TemplateParseVisitor.prototype._checkPipes = function (ast, sourceSpan) {
                    var _this = this;
                    if (lang_1.isPresent(ast)) {
                        var collector = new PipeCollector();
                        ast.visit(collector);
                        collector.pipes.forEach(function (pipeName) {
                            if (!_this.pipesByName.has(pipeName)) {
                                _this._reportError("The pipe '" + pipeName + "' could not be found", sourceSpan);
                            }
                        });
                    }
                };
                TemplateParseVisitor.prototype.visitExpansion = function (ast, context) { return null; };
                TemplateParseVisitor.prototype.visitExpansionCase = function (ast, context) { return null; };
                TemplateParseVisitor.prototype.visitText = function (ast, parent) {
                    var ngContentIndex = parent.findNgContentIndex(TEXT_CSS_SELECTOR);
                    var expr = this._parseInterpolation(ast.value, ast.sourceSpan);
                    if (lang_1.isPresent(expr)) {
                        return new template_ast_1.BoundTextAst(expr, ngContentIndex, ast.sourceSpan);
                    }
                    else {
                        return new template_ast_1.TextAst(ast.value, ngContentIndex, ast.sourceSpan);
                    }
                };
                TemplateParseVisitor.prototype.visitAttr = function (ast, contex) {
                    return new template_ast_1.AttrAst(ast.name, ast.value, ast.sourceSpan);
                };
                TemplateParseVisitor.prototype.visitComment = function (ast, context) { return null; };
                TemplateParseVisitor.prototype.visitElement = function (element, parent) {
                    var _this = this;
                    var nodeName = element.name;
                    var preparsedElement = template_preparser_1.preparseElement(element);
                    if (preparsedElement.type === template_preparser_1.PreparsedElementType.SCRIPT ||
                        preparsedElement.type === template_preparser_1.PreparsedElementType.STYLE) {
                        // Skipping <script> for security reasons
                        // Skipping <style> as we already processed them
                        // in the StyleCompiler
                        return null;
                    }
                    if (preparsedElement.type === template_preparser_1.PreparsedElementType.STYLESHEET &&
                        style_url_resolver_1.isStyleUrlResolvable(preparsedElement.hrefAttr)) {
                        // Skipping stylesheets with either relative urls or package scheme as we already processed
                        // them in the StyleCompiler
                        return null;
                    }
                    var matchableAttrs = [];
                    var elementOrDirectiveProps = [];
                    var elementOrDirectiveRefs = [];
                    var elementVars = [];
                    var events = [];
                    var templateElementOrDirectiveProps = [];
                    var templateMatchableAttrs = [];
                    var templateElementVars = [];
                    var hasInlineTemplates = false;
                    var attrs = [];
                    var lcElName = html_tags_1.splitNsName(nodeName.toLowerCase())[1];
                    var isTemplateElement = lcElName == TEMPLATE_ELEMENT;
                    element.attrs.forEach(function (attr) {
                        var hasBinding = _this._parseAttr(isTemplateElement, attr, matchableAttrs, elementOrDirectiveProps, events, elementOrDirectiveRefs, elementVars);
                        var hasTemplateBinding = _this._parseInlineTemplateBinding(attr, templateMatchableAttrs, templateElementOrDirectiveProps, templateElementVars);
                        if (!hasBinding && !hasTemplateBinding) {
                            // don't include the bindings as attributes as well in the AST
                            attrs.push(_this.visitAttr(attr, null));
                            matchableAttrs.push([attr.name, attr.value]);
                        }
                        if (hasTemplateBinding) {
                            hasInlineTemplates = true;
                        }
                    });
                    var elementCssSelector = createElementCssSelector(nodeName, matchableAttrs);
                    var directiveMetas = this._parseDirectives(this.selectorMatcher, elementCssSelector);
                    var references = [];
                    var directiveAsts = this._createDirectiveAsts(isTemplateElement, element.name, directiveMetas, elementOrDirectiveProps, elementOrDirectiveRefs, element.sourceSpan, references);
                    var elementProps = this._createElementPropertyAsts(element.name, elementOrDirectiveProps, directiveAsts);
                    var isViewRoot = parent.isTemplateElement || hasInlineTemplates;
                    var providerContext = new provider_parser_1.ProviderElementContext(this.providerViewContext, parent.providerContext, isViewRoot, directiveAsts, attrs, references, element.sourceSpan);
                    var children = html_ast_1.htmlVisitAll(preparsedElement.nonBindable ? NON_BINDABLE_VISITOR : this, element.children, ElementContext.create(isTemplateElement, directiveAsts, isTemplateElement ? parent.providerContext : providerContext));
                    providerContext.afterElement();
                    // Override the actual selector when the `ngProjectAs` attribute is provided
                    var projectionSelector = lang_1.isPresent(preparsedElement.projectAs) ?
                        selector_1.CssSelector.parse(preparsedElement.projectAs)[0] :
                        elementCssSelector;
                    var ngContentIndex = parent.findNgContentIndex(projectionSelector);
                    var parsedElement;
                    if (preparsedElement.type === template_preparser_1.PreparsedElementType.NG_CONTENT) {
                        if (lang_1.isPresent(element.children) && element.children.length > 0) {
                            this._reportError("<ng-content> element cannot have content. <ng-content> must be immediately followed by </ng-content>", element.sourceSpan);
                        }
                        parsedElement = new template_ast_1.NgContentAst(this.ngContentCount++, hasInlineTemplates ? null : ngContentIndex, element.sourceSpan);
                    }
                    else if (isTemplateElement) {
                        this._assertAllEventsPublishedByDirectives(directiveAsts, events);
                        this._assertNoComponentsNorElementBindingsOnTemplate(directiveAsts, elementProps, element.sourceSpan);
                        parsedElement = new template_ast_1.EmbeddedTemplateAst(attrs, events, references, elementVars, providerContext.transformedDirectiveAsts, providerContext.transformProviders, providerContext.transformedHasViewContainer, children, hasInlineTemplates ? null : ngContentIndex, element.sourceSpan);
                    }
                    else {
                        this._assertOnlyOneComponent(directiveAsts, element.sourceSpan);
                        var ngContentIndex_1 = hasInlineTemplates ? null : parent.findNgContentIndex(projectionSelector);
                        parsedElement = new template_ast_1.ElementAst(nodeName, attrs, elementProps, events, references, providerContext.transformedDirectiveAsts, providerContext.transformProviders, providerContext.transformedHasViewContainer, children, hasInlineTemplates ? null : ngContentIndex_1, element.sourceSpan);
                    }
                    if (hasInlineTemplates) {
                        var templateCssSelector = createElementCssSelector(TEMPLATE_ELEMENT, templateMatchableAttrs);
                        var templateDirectiveMetas = this._parseDirectives(this.selectorMatcher, templateCssSelector);
                        var templateDirectiveAsts = this._createDirectiveAsts(true, element.name, templateDirectiveMetas, templateElementOrDirectiveProps, [], element.sourceSpan, []);
                        var templateElementProps = this._createElementPropertyAsts(element.name, templateElementOrDirectiveProps, templateDirectiveAsts);
                        this._assertNoComponentsNorElementBindingsOnTemplate(templateDirectiveAsts, templateElementProps, element.sourceSpan);
                        var templateProviderContext = new provider_parser_1.ProviderElementContext(this.providerViewContext, parent.providerContext, parent.isTemplateElement, templateDirectiveAsts, [], [], element.sourceSpan);
                        templateProviderContext.afterElement();
                        parsedElement = new template_ast_1.EmbeddedTemplateAst([], [], [], templateElementVars, templateProviderContext.transformedDirectiveAsts, templateProviderContext.transformProviders, templateProviderContext.transformedHasViewContainer, [parsedElement], ngContentIndex, element.sourceSpan);
                    }
                    return parsedElement;
                };
                TemplateParseVisitor.prototype._parseInlineTemplateBinding = function (attr, targetMatchableAttrs, targetProps, targetVars) {
                    var templateBindingsSource = null;
                    if (attr.name == TEMPLATE_ATTR) {
                        templateBindingsSource = attr.value;
                    }
                    else if (attr.name.startsWith(TEMPLATE_ATTR_PREFIX)) {
                        var key = attr.name.substring(TEMPLATE_ATTR_PREFIX.length); // remove the star
                        templateBindingsSource = (attr.value.length == 0) ? key : key + ' ' + attr.value;
                    }
                    if (lang_1.isPresent(templateBindingsSource)) {
                        var bindings = this._parseTemplateBindings(templateBindingsSource, attr.sourceSpan);
                        for (var i = 0; i < bindings.length; i++) {
                            var binding = bindings[i];
                            if (binding.keyIsVar) {
                                targetVars.push(new template_ast_1.VariableAst(binding.key, binding.name, attr.sourceSpan));
                            }
                            else if (lang_1.isPresent(binding.expression)) {
                                this._parsePropertyAst(binding.key, binding.expression, attr.sourceSpan, targetMatchableAttrs, targetProps);
                            }
                            else {
                                targetMatchableAttrs.push([binding.key, '']);
                                this._parseLiteralAttr(binding.key, null, attr.sourceSpan, targetProps);
                            }
                        }
                        return true;
                    }
                    return false;
                };
                TemplateParseVisitor.prototype._parseAttr = function (isTemplateElement, attr, targetMatchableAttrs, targetProps, targetEvents, targetRefs, targetVars) {
                    var attrName = this._normalizeAttributeName(attr.name);
                    var attrValue = attr.value;
                    var bindParts = lang_1.RegExpWrapper.firstMatch(BIND_NAME_REGEXP, attrName);
                    var hasBinding = false;
                    if (lang_1.isPresent(bindParts)) {
                        hasBinding = true;
                        if (lang_1.isPresent(bindParts[1])) {
                            this._parseProperty(bindParts[7], attrValue, attr.sourceSpan, targetMatchableAttrs, targetProps);
                        }
                        else if (lang_1.isPresent(bindParts[2])) {
                            var identifier = bindParts[7];
                            if (isTemplateElement) {
                                this._reportError("\"var-\" on <template> elements is deprecated. Use \"let-\" instead!", attr.sourceSpan, parse_util_1.ParseErrorLevel.WARNING);
                                this._parseVariable(identifier, attrValue, attr.sourceSpan, targetVars);
                            }
                            else {
                                this._reportError("\"var-\" on non <template> elements is deprecated. Use \"ref-\" instead!", attr.sourceSpan, parse_util_1.ParseErrorLevel.WARNING);
                                this._parseReference(identifier, attrValue, attr.sourceSpan, targetRefs);
                            }
                        }
                        else if (lang_1.isPresent(bindParts[3])) {
                            if (isTemplateElement) {
                                var identifier = bindParts[7];
                                this._parseVariable(identifier, attrValue, attr.sourceSpan, targetVars);
                            }
                            else {
                                this._reportError("\"let-\" is only supported on template elements.", attr.sourceSpan);
                            }
                        }
                        else if (lang_1.isPresent(bindParts[4])) {
                            var identifier = bindParts[7];
                            this._parseReference(identifier, attrValue, attr.sourceSpan, targetRefs);
                        }
                        else if (lang_1.isPresent(bindParts[5])) {
                            this._parseEvent(bindParts[7], attrValue, attr.sourceSpan, targetMatchableAttrs, targetEvents);
                        }
                        else if (lang_1.isPresent(bindParts[6])) {
                            this._parseProperty(bindParts[7], attrValue, attr.sourceSpan, targetMatchableAttrs, targetProps);
                            this._parseAssignmentEvent(bindParts[7], attrValue, attr.sourceSpan, targetMatchableAttrs, targetEvents);
                        }
                        else if (lang_1.isPresent(bindParts[8])) {
                            this._parseProperty(bindParts[8], attrValue, attr.sourceSpan, targetMatchableAttrs, targetProps);
                            this._parseAssignmentEvent(bindParts[8], attrValue, attr.sourceSpan, targetMatchableAttrs, targetEvents);
                        }
                        else if (lang_1.isPresent(bindParts[9])) {
                            this._parseProperty(bindParts[9], attrValue, attr.sourceSpan, targetMatchableAttrs, targetProps);
                        }
                        else if (lang_1.isPresent(bindParts[10])) {
                            this._parseEvent(bindParts[10], attrValue, attr.sourceSpan, targetMatchableAttrs, targetEvents);
                        }
                    }
                    else {
                        hasBinding = this._parsePropertyInterpolation(attrName, attrValue, attr.sourceSpan, targetMatchableAttrs, targetProps);
                    }
                    if (!hasBinding) {
                        this._parseLiteralAttr(attrName, attrValue, attr.sourceSpan, targetProps);
                    }
                    return hasBinding;
                };
                TemplateParseVisitor.prototype._normalizeAttributeName = function (attrName) {
                    return attrName.toLowerCase().startsWith('data-') ? attrName.substring(5) : attrName;
                };
                TemplateParseVisitor.prototype._parseVariable = function (identifier, value, sourceSpan, targetVars) {
                    if (identifier.indexOf('-') > -1) {
                        this._reportError("\"-\" is not allowed in variable names", sourceSpan);
                    }
                    targetVars.push(new template_ast_1.VariableAst(identifier, value, sourceSpan));
                };
                TemplateParseVisitor.prototype._parseReference = function (identifier, value, sourceSpan, targetRefs) {
                    if (identifier.indexOf('-') > -1) {
                        this._reportError("\"-\" is not allowed in reference names", sourceSpan);
                    }
                    targetRefs.push(new ElementOrDirectiveRef(identifier, value, sourceSpan));
                };
                TemplateParseVisitor.prototype._parseProperty = function (name, expression, sourceSpan, targetMatchableAttrs, targetProps) {
                    this._parsePropertyAst(name, this._parseBinding(expression, sourceSpan), sourceSpan, targetMatchableAttrs, targetProps);
                };
                TemplateParseVisitor.prototype._parsePropertyInterpolation = function (name, value, sourceSpan, targetMatchableAttrs, targetProps) {
                    var expr = this._parseInterpolation(value, sourceSpan);
                    if (lang_1.isPresent(expr)) {
                        this._parsePropertyAst(name, expr, sourceSpan, targetMatchableAttrs, targetProps);
                        return true;
                    }
                    return false;
                };
                TemplateParseVisitor.prototype._parsePropertyAst = function (name, ast, sourceSpan, targetMatchableAttrs, targetProps) {
                    targetMatchableAttrs.push([name, ast.source]);
                    targetProps.push(new BoundElementOrDirectiveProperty(name, ast, false, sourceSpan));
                };
                TemplateParseVisitor.prototype._parseAssignmentEvent = function (name, expression, sourceSpan, targetMatchableAttrs, targetEvents) {
                    this._parseEvent(name + "Change", expression + "=$event", sourceSpan, targetMatchableAttrs, targetEvents);
                };
                TemplateParseVisitor.prototype._parseEvent = function (name, expression, sourceSpan, targetMatchableAttrs, targetEvents) {
                    // long format: 'target: eventName'
                    var parts = util_1.splitAtColon(name, [null, name]);
                    var target = parts[0];
                    var eventName = parts[1];
                    var ast = this._parseAction(expression, sourceSpan);
                    targetMatchableAttrs.push([name, ast.source]);
                    targetEvents.push(new template_ast_1.BoundEventAst(eventName, target, ast, sourceSpan));
                    // Don't detect directives for event names for now,
                    // so don't add the event name to the matchableAttrs
                };
                TemplateParseVisitor.prototype._parseLiteralAttr = function (name, value, sourceSpan, targetProps) {
                    targetProps.push(new BoundElementOrDirectiveProperty(name, this._exprParser.wrapLiteralPrimitive(value, ''), true, sourceSpan));
                };
                TemplateParseVisitor.prototype._parseDirectives = function (selectorMatcher, elementCssSelector) {
                    var _this = this;
                    // Need to sort the directives so that we get consistent results throughout,
                    // as selectorMatcher uses Maps inside.
                    // Also dedupe directives as they might match more than one time!
                    var directives = collection_1.ListWrapper.createFixedSize(this.directivesIndex.size);
                    selectorMatcher.match(elementCssSelector, function (selector, directive) {
                        directives[_this.directivesIndex.get(directive)] = directive;
                    });
                    return directives.filter(function (dir) { return lang_1.isPresent(dir); });
                };
                TemplateParseVisitor.prototype._createDirectiveAsts = function (isTemplateElement, elementName, directives, props, elementOrDirectiveRefs, sourceSpan, targetReferences) {
                    var _this = this;
                    var matchedReferences = new Set();
                    var component = null;
                    var directiveAsts = directives.map(function (directive) {
                        if (directive.isComponent) {
                            component = directive;
                        }
                        var hostProperties = [];
                        var hostEvents = [];
                        var directiveProperties = [];
                        _this._createDirectiveHostPropertyAsts(elementName, directive.hostProperties, sourceSpan, hostProperties);
                        _this._createDirectiveHostEventAsts(directive.hostListeners, sourceSpan, hostEvents);
                        _this._createDirectivePropertyAsts(directive.inputs, props, directiveProperties);
                        elementOrDirectiveRefs.forEach(function (elOrDirRef) {
                            if ((elOrDirRef.value.length === 0 && directive.isComponent) ||
                                (directive.exportAs == elOrDirRef.value)) {
                                targetReferences.push(new template_ast_1.ReferenceAst(elOrDirRef.name, identifiers_1.identifierToken(directive.type), elOrDirRef.sourceSpan));
                                matchedReferences.add(elOrDirRef.name);
                            }
                        });
                        return new template_ast_1.DirectiveAst(directive, directiveProperties, hostProperties, hostEvents, sourceSpan);
                    });
                    elementOrDirectiveRefs.forEach(function (elOrDirRef) {
                        if (elOrDirRef.value.length > 0) {
                            if (!collection_1.SetWrapper.has(matchedReferences, elOrDirRef.name)) {
                                _this._reportError("There is no directive with \"exportAs\" set to \"" + elOrDirRef.value + "\"", elOrDirRef.sourceSpan);
                            }
                            ;
                        }
                        else if (lang_1.isBlank(component)) {
                            var refToken = null;
                            if (isTemplateElement) {
                                refToken = identifiers_1.identifierToken(identifiers_1.Identifiers.TemplateRef);
                            }
                            targetReferences.push(new template_ast_1.ReferenceAst(elOrDirRef.name, refToken, elOrDirRef.sourceSpan));
                        }
                    });
                    return directiveAsts;
                };
                TemplateParseVisitor.prototype._createDirectiveHostPropertyAsts = function (elementName, hostProps, sourceSpan, targetPropertyAsts) {
                    var _this = this;
                    if (lang_1.isPresent(hostProps)) {
                        collection_1.StringMapWrapper.forEach(hostProps, function (expression, propName) {
                            var exprAst = _this._parseBinding(expression, sourceSpan);
                            targetPropertyAsts.push(_this._createElementPropertyAst(elementName, propName, exprAst, sourceSpan));
                        });
                    }
                };
                TemplateParseVisitor.prototype._createDirectiveHostEventAsts = function (hostListeners, sourceSpan, targetEventAsts) {
                    var _this = this;
                    if (lang_1.isPresent(hostListeners)) {
                        collection_1.StringMapWrapper.forEach(hostListeners, function (expression, propName) {
                            _this._parseEvent(propName, expression, sourceSpan, [], targetEventAsts);
                        });
                    }
                };
                TemplateParseVisitor.prototype._createDirectivePropertyAsts = function (directiveProperties, boundProps, targetBoundDirectiveProps) {
                    if (lang_1.isPresent(directiveProperties)) {
                        var boundPropsByName = new Map();
                        boundProps.forEach(function (boundProp) {
                            var prevValue = boundPropsByName.get(boundProp.name);
                            if (lang_1.isBlank(prevValue) || prevValue.isLiteral) {
                                // give [a]="b" a higher precedence than a="b" on the same element
                                boundPropsByName.set(boundProp.name, boundProp);
                            }
                        });
                        collection_1.StringMapWrapper.forEach(directiveProperties, function (elProp, dirProp) {
                            var boundProp = boundPropsByName.get(elProp);
                            // Bindings are optional, so this binding only needs to be set up if an expression is given.
                            if (lang_1.isPresent(boundProp)) {
                                targetBoundDirectiveProps.push(new template_ast_1.BoundDirectivePropertyAst(dirProp, boundProp.name, boundProp.expression, boundProp.sourceSpan));
                            }
                        });
                    }
                };
                TemplateParseVisitor.prototype._createElementPropertyAsts = function (elementName, props, directives) {
                    var _this = this;
                    var boundElementProps = [];
                    var boundDirectivePropsIndex = new Map();
                    directives.forEach(function (directive) {
                        directive.inputs.forEach(function (prop) {
                            boundDirectivePropsIndex.set(prop.templateName, prop);
                        });
                    });
                    props.forEach(function (prop) {
                        if (!prop.isLiteral && lang_1.isBlank(boundDirectivePropsIndex.get(prop.name))) {
                            boundElementProps.push(_this._createElementPropertyAst(elementName, prop.name, prop.expression, prop.sourceSpan));
                        }
                    });
                    return boundElementProps;
                };
                TemplateParseVisitor.prototype._createElementPropertyAst = function (elementName, name, ast, sourceSpan) {
                    var unit = null;
                    var bindingType;
                    var boundPropertyName;
                    var parts = name.split(PROPERTY_PARTS_SEPARATOR);
                    if (parts.length === 1) {
                        boundPropertyName = this._schemaRegistry.getMappedPropName(parts[0]);
                        bindingType = template_ast_1.PropertyBindingType.Property;
                        if (!this._schemaRegistry.hasProperty(elementName, boundPropertyName)) {
                            this._reportError("Can't bind to '" + boundPropertyName + "' since it isn't a known native property", sourceSpan);
                        }
                    }
                    else {
                        if (parts[0] == ATTRIBUTE_PREFIX) {
                            boundPropertyName = parts[1];
                            var nsSeparatorIdx = boundPropertyName.indexOf(':');
                            if (nsSeparatorIdx > -1) {
                                var ns = boundPropertyName.substring(0, nsSeparatorIdx);
                                var name_1 = boundPropertyName.substring(nsSeparatorIdx + 1);
                                boundPropertyName = html_tags_1.mergeNsAndName(ns, name_1);
                            }
                            bindingType = template_ast_1.PropertyBindingType.Attribute;
                        }
                        else if (parts[0] == CLASS_PREFIX) {
                            boundPropertyName = parts[1];
                            bindingType = template_ast_1.PropertyBindingType.Class;
                        }
                        else if (parts[0] == STYLE_PREFIX) {
                            unit = parts.length > 2 ? parts[2] : null;
                            boundPropertyName = parts[1];
                            bindingType = template_ast_1.PropertyBindingType.Style;
                        }
                        else {
                            this._reportError("Invalid property name '" + name + "'", sourceSpan);
                            bindingType = null;
                        }
                    }
                    return new template_ast_1.BoundElementPropertyAst(boundPropertyName, bindingType, ast, unit, sourceSpan);
                };
                TemplateParseVisitor.prototype._findComponentDirectiveNames = function (directives) {
                    var componentTypeNames = [];
                    directives.forEach(function (directive) {
                        var typeName = directive.directive.type.name;
                        if (directive.directive.isComponent) {
                            componentTypeNames.push(typeName);
                        }
                    });
                    return componentTypeNames;
                };
                TemplateParseVisitor.prototype._assertOnlyOneComponent = function (directives, sourceSpan) {
                    var componentTypeNames = this._findComponentDirectiveNames(directives);
                    if (componentTypeNames.length > 1) {
                        this._reportError("More than one component: " + componentTypeNames.join(','), sourceSpan);
                    }
                };
                TemplateParseVisitor.prototype._assertNoComponentsNorElementBindingsOnTemplate = function (directives, elementProps, sourceSpan) {
                    var _this = this;
                    var componentTypeNames = this._findComponentDirectiveNames(directives);
                    if (componentTypeNames.length > 0) {
                        this._reportError("Components on an embedded template: " + componentTypeNames.join(','), sourceSpan);
                    }
                    elementProps.forEach(function (prop) {
                        _this._reportError("Property binding " + prop.name + " not used by any directive on an embedded template", sourceSpan);
                    });
                };
                TemplateParseVisitor.prototype._assertAllEventsPublishedByDirectives = function (directives, events) {
                    var _this = this;
                    var allDirectiveEvents = new Set();
                    directives.forEach(function (directive) {
                        collection_1.StringMapWrapper.forEach(directive.directive.outputs, function (eventName, _) { allDirectiveEvents.add(eventName); });
                    });
                    events.forEach(function (event) {
                        if (lang_1.isPresent(event.target) || !collection_1.SetWrapper.has(allDirectiveEvents, event.name)) {
                            _this._reportError("Event binding " + event.fullName + " not emitted by any directive on an embedded template", event.sourceSpan);
                        }
                    });
                };
                return TemplateParseVisitor;
            }());
            NonBindableVisitor = (function () {
                function NonBindableVisitor() {
                }
                NonBindableVisitor.prototype.visitElement = function (ast, parent) {
                    var preparsedElement = template_preparser_1.preparseElement(ast);
                    if (preparsedElement.type === template_preparser_1.PreparsedElementType.SCRIPT ||
                        preparsedElement.type === template_preparser_1.PreparsedElementType.STYLE ||
                        preparsedElement.type === template_preparser_1.PreparsedElementType.STYLESHEET) {
                        // Skipping <script> for security reasons
                        // Skipping <style> and stylesheets as we already processed them
                        // in the StyleCompiler
                        return null;
                    }
                    var attrNameAndValues = ast.attrs.map(function (attrAst) { return [attrAst.name, attrAst.value]; });
                    var selector = createElementCssSelector(ast.name, attrNameAndValues);
                    var ngContentIndex = parent.findNgContentIndex(selector);
                    var children = html_ast_1.htmlVisitAll(this, ast.children, EMPTY_ELEMENT_CONTEXT);
                    return new template_ast_1.ElementAst(ast.name, html_ast_1.htmlVisitAll(this, ast.attrs), [], [], [], [], [], false, children, ngContentIndex, ast.sourceSpan);
                };
                NonBindableVisitor.prototype.visitComment = function (ast, context) { return null; };
                NonBindableVisitor.prototype.visitAttr = function (ast, context) {
                    return new template_ast_1.AttrAst(ast.name, ast.value, ast.sourceSpan);
                };
                NonBindableVisitor.prototype.visitText = function (ast, parent) {
                    var ngContentIndex = parent.findNgContentIndex(TEXT_CSS_SELECTOR);
                    return new template_ast_1.TextAst(ast.value, ngContentIndex, ast.sourceSpan);
                };
                NonBindableVisitor.prototype.visitExpansion = function (ast, context) { return ast; };
                NonBindableVisitor.prototype.visitExpansionCase = function (ast, context) { return ast; };
                return NonBindableVisitor;
            }());
            BoundElementOrDirectiveProperty = (function () {
                function BoundElementOrDirectiveProperty(name, expression, isLiteral, sourceSpan) {
                    this.name = name;
                    this.expression = expression;
                    this.isLiteral = isLiteral;
                    this.sourceSpan = sourceSpan;
                }
                return BoundElementOrDirectiveProperty;
            }());
            ElementOrDirectiveRef = (function () {
                function ElementOrDirectiveRef(name, value, sourceSpan) {
                    this.name = name;
                    this.value = value;
                    this.sourceSpan = sourceSpan;
                }
                return ElementOrDirectiveRef;
            }());
            ElementContext = (function () {
                function ElementContext(isTemplateElement, _ngContentIndexMatcher, _wildcardNgContentIndex, providerContext) {
                    this.isTemplateElement = isTemplateElement;
                    this._ngContentIndexMatcher = _ngContentIndexMatcher;
                    this._wildcardNgContentIndex = _wildcardNgContentIndex;
                    this.providerContext = providerContext;
                }
                ElementContext.create = function (isTemplateElement, directives, providerContext) {
                    var matcher = new selector_1.SelectorMatcher();
                    var wildcardNgContentIndex = null;
                    if (directives.length > 0 && directives[0].directive.isComponent) {
                        var ngContentSelectors = directives[0].directive.template.ngContentSelectors;
                        for (var i = 0; i < ngContentSelectors.length; i++) {
                            var selector = ngContentSelectors[i];
                            if (lang_1.StringWrapper.equals(selector, '*')) {
                                wildcardNgContentIndex = i;
                            }
                            else {
                                matcher.addSelectables(selector_1.CssSelector.parse(ngContentSelectors[i]), i);
                            }
                        }
                    }
                    return new ElementContext(isTemplateElement, matcher, wildcardNgContentIndex, providerContext);
                };
                ElementContext.prototype.findNgContentIndex = function (selector) {
                    var ngContentIndices = [];
                    this._ngContentIndexMatcher.match(selector, function (selector, ngContentIndex) { ngContentIndices.push(ngContentIndex); });
                    collection_1.ListWrapper.sort(ngContentIndices);
                    if (lang_1.isPresent(this._wildcardNgContentIndex)) {
                        ngContentIndices.push(this._wildcardNgContentIndex);
                    }
                    return ngContentIndices.length > 0 ? ngContentIndices[0] : null;
                };
                return ElementContext;
            }());
            EMPTY_ELEMENT_CONTEXT = new ElementContext(true, new selector_1.SelectorMatcher(), null, null);
            NON_BINDABLE_VISITOR = new NonBindableVisitor();
            PipeCollector = (function (_super) {
                __extends(PipeCollector, _super);
                function PipeCollector() {
                    _super.apply(this, arguments);
                    this.pipes = new Set();
                }
                PipeCollector.prototype.visitPipe = function (ast, context) {
                    this.pipes.add(ast.name);
                    ast.exp.visit(this);
                    this.visitAll(ast.args, context);
                    return null;
                };
                return PipeCollector;
            }(ast_1.RecursiveAstVisitor));
            exports_1("PipeCollector", PipeCollector);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci90ZW1wbGF0ZV9wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBOEZJLGdCQUFnQixFQUdkLGdCQUFnQixFQUNoQixhQUFhLEVBQ2Isb0JBQW9CLEVBQ3BCLFVBQVUsRUFFWix3QkFBd0IsRUFDdEIsZ0JBQWdCLEVBQ2hCLFlBQVksRUFDWixZQUFZLEVBRWQsaUJBQWlCLEVBU1IsbUJBQW1CLDZLQXF4QjVCLHFCQUFxQixFQUNyQixvQkFBb0I7SUEzRHhCLHNCQUE2QixjQUFzQjtRQUNqRCxNQUFNLENBQUMsb0JBQWEsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFGRCx1Q0FFQyxDQUFBO0lBb0NELGtDQUFrQyxXQUFtQixFQUFFLGNBQTBCO1FBQy9FLElBQUksV0FBVyxHQUFHLElBQUksc0JBQVcsRUFBRSxDQUFDO1FBQ3BDLElBQUksVUFBVSxHQUFHLHVCQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFN0MsV0FBVyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVuQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUMvQyxJQUFJLFFBQVEsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEMsSUFBSSxZQUFZLEdBQUcsdUJBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QyxJQUFJLFNBQVMsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFckMsV0FBVyxDQUFDLFlBQVksQ0FBQyxZQUFZLEVB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SUFBSSxDQUFDO2dCQUNsRSxDQUFDO2dCQUNILHFCQUFDO1lBQUQsQ0FoQ0EsQUFnQ0MsSUFBQTtZQXNCRyxxQkFBcUIsR0FBRyxJQUFJLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSwwQkFBZSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3BGLG9CQUFvQixHQUFHLElBQUksa0JBQWtCLEVBQUUsQ0FBQztZQUdwRDtnQkFBbUMsaUNBQW1CO2dCQUF0RDtvQkFBbUMsOEJBQW1CO29CQUNwRCxVQUFLLEdBQWdCLElBQUksR0FBRyxFQUFVLENBQUM7Z0JBT3pDLENBQUM7Z0JBTkMsaUNBQVMsR0FBVCxVQUFVLEdBQWdCLEVBQUUsT0FBWTtvQkFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN6QixHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNkLENBQUM7Z0JBQ0gsb0JBQUM7WUFBRCxDQVJBLEFBUUMsQ0FSa0MseUJBQW1CLEdBUXJEO1lBUkQseUNBUUMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tcGlsZXIvdGVtcGxhdGVfcGFyc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgTGlzdFdyYXBwZXIsXG4gIFN0cmluZ01hcFdyYXBwZXIsXG4gIFNldFdyYXBwZXIsXG4gIE1hcFdyYXBwZXJcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7XG4gIENPTlNUX0VYUFIsXG4gIFJlZ0V4cFdyYXBwZXIsXG4gIGlzUHJlc2VudCxcbiAgU3RyaW5nV3JhcHBlcixcbiAgaXNCbGFuayxcbiAgaXNBcnJheVxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3QsIE9wYXF1ZVRva2VuLCBPcHRpb25hbH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0NvbnNvbGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2NvbnNvbGUnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtcbiAgQVNULFxuICBJbnRlcnBvbGF0aW9uLFxuICBBU1RXaXRoU291cmNlLFxuICBUZW1wbGF0ZUJpbmRpbmcsXG4gIFJlY3Vyc2l2ZUFzdFZpc2l0b3IsXG4gIEJpbmRpbmdQaXBlXG59IGZyb20gJy4vZXhwcmVzc2lvbl9wYXJzZXIvYXN0JztcbmltcG9ydCB7UGFyc2VyfSBmcm9tICcuL2V4cHJlc3Npb25fcGFyc2VyL3BhcnNlcic7XG5pbXBvcnQge1xuICBDb21waWxlVG9rZW5NYXAsXG4gIENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSxcbiAgQ29tcGlsZVBpcGVNZXRhZGF0YSxcbiAgQ29tcGlsZU1ldGFkYXRhV2l0aFR5cGUsXG4gIENvbXBpbGVQcm92aWRlck1ldGFkYXRhLFxuICBDb21waWxlVG9rZW5NZXRhZGF0YSxcbiAgQ29tcGlsZVR5cGVNZXRhZGF0YVxufSBmcm9tICcuL2NvbXBpbGVfbWV0YWRhdGEnO1xuaW1wb3J0IHtIdG1sUGFyc2VyfSBmcm9tICcuL2h0bWxfcGFyc2VyJztcbmltcG9ydCB7c3BsaXROc05hbWUsIG1lcmdlTnNBbmROYW1lfSBmcm9tICcuL2h0bWxfdGFncyc7XG5pbXBvcnQge1BhcnNlU291cmNlU3BhbiwgUGFyc2VFcnJvciwgUGFyc2VMb2NhdGlvbiwgUGFyc2VFcnJvckxldmVsfSBmcm9tICcuL3BhcnNlX3V0aWwnO1xuaW1wb3J0IHtNQVhfSU5URVJQT0xBVElPTl9WQUxVRVN9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci92aWV3X3V0aWxzJztcblxuaW1wb3J0IHtcbiAgRWxlbWVudEFzdCxcbiAgQm91bmRFbGVtZW50UHJvcGVydHlBc3QsXG4gIEJvdW5kRXZlbnRBc3QsXG4gIFJlZmVyZW5jZUFzdCxcbiAgVGVtcGxhdGVBc3QsXG4gIFRlbXBsYXRlQXN0VmlzaXRvcixcbiAgdGVtcGxhdGVWaXNpdEFsbCxcbiAgVGV4dEFzdCxcbiAgQm91bmRUZXh0QXN0LFxuICBFbWJlZGRlZFRlbXBsYXRlQXN0LFxuICBBdHRyQXN0LFxuICBOZ0NvbnRlbnRBc3QsXG4gIFByb3BlcnR5QmluZGluZ1R5cGUsXG4gIERpcmVjdGl2ZUFzdCxcbiAgQm91bmREaXJlY3RpdmVQcm9wZXJ0eUFzdCxcbiAgUHJvdmlkZXJBc3QsXG4gIFByb3ZpZGVyQXN0VHlwZSxcbiAgVmFyaWFibGVBc3Rcbn0gZnJvbSAnLi90ZW1wbGF0ZV9hc3QnO1xuaW1wb3J0IHtDc3NTZWxlY3RvciwgU2VsZWN0b3JNYXRjaGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvc2VsZWN0b3InO1xuXG5pbXBvcnQge0VsZW1lbnRTY2hlbWFSZWdpc3RyeX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3NjaGVtYS9lbGVtZW50X3NjaGVtYV9yZWdpc3RyeSc7XG5pbXBvcnQge3ByZXBhcnNlRWxlbWVudCwgUHJlcGFyc2VkRWxlbWVudCwgUHJlcGFyc2VkRWxlbWVudFR5cGV9IGZyb20gJy4vdGVtcGxhdGVfcHJlcGFyc2VyJztcblxuaW1wb3J0IHtpc1N0eWxlVXJsUmVzb2x2YWJsZX0gZnJvbSAnLi9zdHlsZV91cmxfcmVzb2x2ZXInO1xuXG5pbXBvcnQge1xuICBIdG1sQXN0VmlzaXRvcixcbiAgSHRtbEFzdCxcbiAgSHRtbEVsZW1lbnRBc3QsXG4gIEh0bWxBdHRyQXN0LFxuICBIdG1sVGV4dEFzdCxcbiAgSHRtbENvbW1lbnRBc3QsXG4gIEh0bWxFeHBhbnNpb25Bc3QsXG4gIEh0bWxFeHBhbnNpb25DYXNlQXN0LFxuICBodG1sVmlzaXRBbGxcbn0gZnJvbSAnLi9odG1sX2FzdCc7XG5cbmltcG9ydCB7c3BsaXRBdENvbG9ufSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHtpZGVudGlmaWVyVG9rZW4sIElkZW50aWZpZXJzfSBmcm9tICcuL2lkZW50aWZpZXJzJztcblxuaW1wb3J0IHtQcm92aWRlckVsZW1lbnRDb250ZXh0LCBQcm92aWRlclZpZXdDb250ZXh0fSBmcm9tICcuL3Byb3ZpZGVyX3BhcnNlcic7XG5cbi8vIEdyb3VwIDEgPSBcImJpbmQtXCJcbi8vIEdyb3VwIDIgPSBcInZhci1cIlxuLy8gR3JvdXAgMyA9IFwibGV0LVwiXG4vLyBHcm91cCA0ID0gXCJyZWYtLyNcIlxuLy8gR3JvdXAgNSA9IFwib24tXCJcbi8vIEdyb3VwIDYgPSBcImJpbmRvbi1cIlxuLy8gR3JvdXAgNyA9IHRoZSBpZGVudGlmaWVyIGFmdGVyIFwiYmluZC1cIiwgXCJ2YXItLyNcIiwgb3IgXCJvbi1cIlxuLy8gR3JvdXAgOCA9IGlkZW50aWZpZXIgaW5zaWRlIFsoKV1cbi8vIEdyb3VwIDkgPSBpZGVudGlmaWVyIGluc2lkZSBbXVxuLy8gR3JvdXAgMTAgPSBpZGVudGlmaWVyIGluc2lkZSAoKVxudmFyIEJJTkRfTkFNRV9SRUdFWFAgPVxuICAgIC9eKD86KD86KD86KGJpbmQtKXwodmFyLSl8KGxldC0pfChyZWYtfCMpfChvbi0pfChiaW5kb24tKSkoLispKXxcXFtcXCgoW15cXCldKylcXClcXF18XFxbKFteXFxdXSspXFxdfFxcKChbXlxcKV0rKVxcKSkkL2c7XG5cbmNvbnN0IFRFTVBMQVRFX0VMRU1FTlQgPSAndGVtcGxhdGUnO1xuY29uc3QgVEVNUExBVEVfQVRUUiA9ICd0ZW1wbGF0ZSc7XG5jb25zdCBURU1QTEFURV9BVFRSX1BSRUZJWCA9ICcqJztcbmNvbnN0IENMQVNTX0FUVFIgPSAnY2xhc3MnO1xuXG52YXIgUFJPUEVSVFlfUEFSVFNfU0VQQVJBVE9SID0gJy4nO1xuY29uc3QgQVRUUklCVVRFX1BSRUZJWCA9ICdhdHRyJztcbmNvbnN0IENMQVNTX1BSRUZJWCA9ICdjbGFzcyc7XG5jb25zdCBTVFlMRV9QUkVGSVggPSAnc3R5bGUnO1xuXG52YXIgVEVYVF9DU1NfU0VMRUNUT1IgPSBDc3NTZWxlY3Rvci5wYXJzZSgnKicpWzBdO1xuXG4vKipcbiAqIFByb3ZpZGVzIGFuIGFycmF5IG9mIHtAbGluayBUZW1wbGF0ZUFzdFZpc2l0b3J9cyB3aGljaCB3aWxsIGJlIHVzZWQgdG8gdHJhbnNmb3JtXG4gKiBwYXJzZWQgdGVtcGxhdGVzIGJlZm9yZSBjb21waWxhdGlvbiBpcyBpbnZva2VkLCBhbGxvd2luZyBjdXN0b20gZXhwcmVzc2lvbiBzeW50YXhcbiAqIGFuZCBvdGhlciBhZHZhbmNlZCB0cmFuc2Zvcm1hdGlvbnMuXG4gKlxuICogVGhpcyBpcyBjdXJyZW50bHkgYW4gaW50ZXJuYWwtb25seSBmZWF0dXJlIGFuZCBub3QgbWVhbnQgZm9yIGdlbmVyYWwgdXNlLlxuICovXG5leHBvcnQgY29uc3QgVEVNUExBVEVfVFJBTlNGT1JNUyA9IENPTlNUX0VYUFIobmV3IE9wYXF1ZVRva2VuKCdUZW1wbGF0ZVRyYW5zZm9ybXMnKSk7XG5cbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZVBhcnNlRXJyb3IgZXh0ZW5kcyBQYXJzZUVycm9yIHtcbiAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nLCBzcGFuOiBQYXJzZVNvdXJjZVNwYW4sIGxldmVsOiBQYXJzZUVycm9yTGV2ZWwpIHtcbiAgICBzdXBlcihzcGFuLCBtZXNzYWdlLCBsZXZlbCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRlbXBsYXRlUGFyc2VSZXN1bHQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVBc3Q/OiBUZW1wbGF0ZUFzdFtdLCBwdWJsaWMgZXJyb3JzPzogUGFyc2VFcnJvcltdKSB7fVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVQYXJzZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9leHByUGFyc2VyOiBQYXJzZXIsIHByaXZhdGUgX3NjaGVtYVJlZ2lzdHJ5OiBFbGVtZW50U2NoZW1hUmVnaXN0cnksXG4gICAgICAgICAgICAgIHByaXZhdGUgX2h0bWxQYXJzZXI6IEh0bWxQYXJzZXIsIHByaXZhdGUgX2NvbnNvbGU6IENvbnNvbGUsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoVEVNUExBVEVfVFJBTlNGT1JNUykgcHVibGljIHRyYW5zZm9ybXM6IFRlbXBsYXRlQXN0VmlzaXRvcltdKSB7fVxuXG4gIHBhcnNlKGNvbXBvbmVudDogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLCB0ZW1wbGF0ZTogc3RyaW5nLFxuICAgICAgICBkaXJlY3RpdmVzOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGFbXSwgcGlwZXM6IENvbXBpbGVQaXBlTWV0YWRhdGFbXSxcbiAgICAgICAgdGVtcGxhdGVVcmw6IHN0cmluZyk6IFRlbXBsYXRlQXN0W10ge1xuICAgIHZhciByZXN1bHQgPSB0aGlzLnRyeVBhcnNlKGNvbXBvbmVudCwgdGVtcGxhdGUsIGRpcmVjdGl2ZXMsIHBpcGVzLCB0ZW1wbGF0ZVVybCk7XG4gICAgdmFyIHdhcm5pbmdzID0gcmVzdWx0LmVycm9ycy5maWx0ZXIoZXJyb3IgPT4gZXJyb3IubGV2ZWwgPT09IFBhcnNlRXJyb3JMZXZlbC5XQVJOSU5HKTtcbiAgICB2YXIgZXJyb3JzID0gcmVzdWx0LmVycm9ycy5maWx0ZXIoZXJyb3IgPT4gZXJyb3IubGV2ZWwgPT09IFBhcnNlRXJyb3JMZXZlbC5GQVRBTCk7XG4gICAgaWYgKHdhcm5pbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuX2NvbnNvbGUud2FybihgVGVtcGxhdGUgcGFyc2Ugd2FybmluZ3M6XFxuJHt3YXJuaW5ncy5qb2luKCdcXG4nKX1gKTtcbiAgICB9XG4gICAgaWYgKGVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgICB2YXIgZXJyb3JTdHJpbmcgPSBlcnJvcnMuam9pbignXFxuJyk7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgVGVtcGxhdGUgcGFyc2UgZXJyb3JzOlxcbiR7ZXJyb3JTdHJpbmd9YCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQudGVtcGxhdGVBc3Q7XG4gIH1cblxuICB0cnlQYXJzZShjb21wb25lbnQ6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSwgdGVtcGxhdGU6IHN0cmluZyxcbiAgICAgICAgICAgZGlyZWN0aXZlczogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhW10sIHBpcGVzOiBDb21waWxlUGlwZU1ldGFkYXRhW10sXG4gICAgICAgICAgIHRlbXBsYXRlVXJsOiBzdHJpbmcpOiBUZW1wbGF0ZVBhcnNlUmVzdWx0IHtcbiAgICB2YXIgaHRtbEFzdFdpdGhFcnJvcnMgPSB0aGlzLl9odG1sUGFyc2VyLnBhcnNlKHRlbXBsYXRlLCB0ZW1wbGF0ZVVybCk7XG4gICAgdmFyIGVycm9yczogUGFyc2VFcnJvcltdID0gaHRtbEFzdFdpdGhFcnJvcnMuZXJyb3JzO1xuICAgIHZhciByZXN1bHQ7XG4gICAgaWYgKGh0bWxBc3RXaXRoRXJyb3JzLnJvb3ROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICB2YXIgdW5pcURpcmVjdGl2ZXMgPSA8Q29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhW10+cmVtb3ZlRHVwbGljYXRlcyhkaXJlY3RpdmVzKTtcbiAgICAgIHZhciB1bmlxUGlwZXMgPSA8Q29tcGlsZVBpcGVNZXRhZGF0YVtdPnJlbW92ZUR1cGxpY2F0ZXMocGlwZXMpO1xuICAgICAgdmFyIHByb3ZpZGVyVmlld0NvbnRleHQgPVxuICAgICAgICAgIG5ldyBQcm92aWRlclZpZXdDb250ZXh0KGNvbXBvbmVudCwgaHRtbEFzdFdpdGhFcnJvcnMucm9vdE5vZGVzWzBdLnNvdXJjZVNwYW4pO1xuICAgICAgdmFyIHBhcnNlVmlzaXRvciA9IG5ldyBUZW1wbGF0ZVBhcnNlVmlzaXRvcihwcm92aWRlclZpZXdDb250ZXh0LCB1bmlxRGlyZWN0aXZlcywgdW5pcVBpcGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9leHByUGFyc2VyLCB0aGlzLl9zY2hlbWFSZWdpc3RyeSk7XG5cbiAgICAgIHJlc3VsdCA9IGh0bWxWaXNpdEFsbChwYXJzZVZpc2l0b3IsIGh0bWxBc3RXaXRoRXJyb3JzLnJvb3ROb2RlcywgRU1QVFlfRUxFTUVOVF9DT05URVhUKTtcbiAgICAgIGVycm9ycyA9IGVycm9ycy5jb25jYXQocGFyc2VWaXNpdG9yLmVycm9ycykuY29uY2F0KHByb3ZpZGVyVmlld0NvbnRleHQuZXJyb3JzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gW107XG4gICAgfVxuICAgIGlmIChlcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIG5ldyBUZW1wbGF0ZVBhcnNlUmVzdWx0KHJlc3VsdCwgZXJyb3JzKTtcbiAgICB9XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLnRyYW5zZm9ybXMpKSB7XG4gICAgICB0aGlzLnRyYW5zZm9ybXMuZm9yRWFjaChcbiAgICAgICAgICAodHJhbnNmb3JtOiBUZW1wbGF0ZUFzdFZpc2l0b3IpID0+IHsgcmVzdWx0ID0gdGVtcGxhdGVWaXNpdEFsbCh0cmFuc2Zvcm0sIHJlc3VsdCk7IH0pO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFRlbXBsYXRlUGFyc2VSZXN1bHQocmVzdWx0LCBlcnJvcnMpO1xuICB9XG59XG5cbmNsYXNzIFRlbXBsYXRlUGFyc2VWaXNpdG9yIGltcGxlbWVudHMgSHRtbEFzdFZpc2l0b3Ige1xuICBzZWxlY3Rvck1hdGNoZXI6IFNlbGVjdG9yTWF0Y2hlcjtcbiAgZXJyb3JzOiBUZW1wbGF0ZVBhcnNlRXJyb3JbXSA9IFtdO1xuICBkaXJlY3RpdmVzSW5kZXggPSBuZXcgTWFwPENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSwgbnVtYmVyPigpO1xuICBuZ0NvbnRlbnRDb3VudDogbnVtYmVyID0gMDtcbiAgcGlwZXNCeU5hbWU6IE1hcDxzdHJpbmcsIENvbXBpbGVQaXBlTWV0YWRhdGE+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwcm92aWRlclZpZXdDb250ZXh0OiBQcm92aWRlclZpZXdDb250ZXh0LFxuICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGFbXSwgcGlwZXM6IENvbXBpbGVQaXBlTWV0YWRhdGFbXSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfZXhwclBhcnNlcjogUGFyc2VyLCBwcml2YXRlIF9zY2hlbWFSZWdpc3RyeTogRWxlbWVudFNjaGVtYVJlZ2lzdHJ5KSB7XG4gICAgdGhpcy5zZWxlY3Rvck1hdGNoZXIgPSBuZXcgU2VsZWN0b3JNYXRjaGVyKCk7XG4gICAgTGlzdFdyYXBwZXIuZm9yRWFjaFdpdGhJbmRleChkaXJlY3RpdmVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGRpcmVjdGl2ZTogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3RvciA9IENzc1NlbGVjdG9yLnBhcnNlKGRpcmVjdGl2ZS5zZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0b3JNYXRjaGVyLmFkZFNlbGVjdGFibGVzKHNlbGVjdG9yLCBkaXJlY3RpdmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGl2ZXNJbmRleC5zZXQoZGlyZWN0aXZlLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICB0aGlzLnBpcGVzQnlOYW1lID0gbmV3IE1hcDxzdHJpbmcsIENvbXBpbGVQaXBlTWV0YWRhdGE+KCk7XG4gICAgcGlwZXMuZm9yRWFjaChwaXBlID0+IHRoaXMucGlwZXNCeU5hbWUuc2V0KHBpcGUubmFtZSwgcGlwZSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVwb3J0RXJyb3IobWVzc2FnZTogc3RyaW5nLCBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sXG4gICAgICAgICAgICAgICAgICAgICAgIGxldmVsOiBQYXJzZUVycm9yTGV2ZWwgPSBQYXJzZUVycm9yTGV2ZWwuRkFUQUwpIHtcbiAgICB0aGlzLmVycm9ycy5wdXNoKG5ldyBUZW1wbGF0ZVBhcnNlRXJyb3IobWVzc2FnZSwgc291cmNlU3BhbiwgbGV2ZWwpKTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlSW50ZXJwb2xhdGlvbih2YWx1ZTogc3RyaW5nLCBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pOiBBU1RXaXRoU291cmNlIHtcbiAgICB2YXIgc291cmNlSW5mbyA9IHNvdXJjZVNwYW4uc3RhcnQudG9TdHJpbmcoKTtcbiAgICB0cnkge1xuICAgICAgdmFyIGFzdCA9IHRoaXMuX2V4cHJQYXJzZXIucGFyc2VJbnRlcnBvbGF0aW9uKHZhbHVlLCBzb3VyY2VJbmZvKTtcbiAgICAgIHRoaXMuX2NoZWNrUGlwZXMoYXN0LCBzb3VyY2VTcGFuKTtcbiAgICAgIGlmIChpc1ByZXNlbnQoYXN0KSAmJlxuICAgICAgICAgICg8SW50ZXJwb2xhdGlvbj5hc3QuYXN0KS5leHByZXNzaW9ucy5sZW5ndGggPiBNQVhfSU5URVJQT0xBVElPTl9WQUxVRVMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgICAgICBgT25seSBzdXBwb3J0IGF0IG1vc3QgJHtNQVhfSU5URVJQT0xBVElPTl9WQUxVRVN9IGludGVycG9sYXRpb24gdmFsdWVzIWApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFzdDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLl9yZXBvcnRFcnJvcihgJHtlfWAsIHNvdXJjZVNwYW4pO1xuICAgICAgcmV0dXJuIHRoaXMuX2V4cHJQYXJzZXIud3JhcExpdGVyYWxQcmltaXRpdmUoJ0VSUk9SJywgc291cmNlSW5mbyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VBY3Rpb24odmFsdWU6IHN0cmluZywgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKTogQVNUV2l0aFNvdXJjZSB7XG4gICAgdmFyIHNvdXJjZUluZm8gPSBzb3VyY2VTcGFuLnN0YXJ0LnRvU3RyaW5nKCk7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBhc3QgPSB0aGlzLl9leHByUGFyc2VyLnBhcnNlQWN0aW9uKHZhbHVlLCBzb3VyY2VJbmZvKTtcbiAgICAgIHRoaXMuX2NoZWNrUGlwZXMoYXN0LCBzb3VyY2VTcGFuKTtcbiAgICAgIHJldHVybiBhc3Q7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5fcmVwb3J0RXJyb3IoYCR7ZX1gLCBzb3VyY2VTcGFuKTtcbiAgICAgIHJldHVybiB0aGlzLl9leHByUGFyc2VyLndyYXBMaXRlcmFsUHJpbWl0aXZlKCdFUlJPUicsIHNvdXJjZUluZm8pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlQmluZGluZyh2YWx1ZTogc3RyaW5nLCBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pOiBBU1RXaXRoU291cmNlIHtcbiAgICB2YXIgc291cmNlSW5mbyA9IHNvdXJjZVNwYW4uc3RhcnQudG9TdHJpbmcoKTtcbiAgICB0cnkge1xuICAgICAgdmFyIGFzdCA9IHRoaXMuX2V4cHJQYXJzZXIucGFyc2VCaW5kaW5nKHZhbHVlLCBzb3VyY2VJbmZvKTtcbiAgICAgIHRoaXMuX2NoZWNrUGlwZXMoYXN0LCBzb3VyY2VTcGFuKTtcbiAgICAgIHJldHVybiBhc3Q7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5fcmVwb3J0RXJyb3IoYCR7ZX1gLCBzb3VyY2VTcGFuKTtcbiAgICAgIHJldHVybiB0aGlzLl9leHByUGFyc2VyLndyYXBMaXRlcmFsUHJpbWl0aXZlKCdFUlJPUicsIHNvdXJjZUluZm8pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlVGVtcGxhdGVCaW5kaW5ncyh2YWx1ZTogc3RyaW5nLCBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pOiBUZW1wbGF0ZUJpbmRpbmdbXSB7XG4gICAgdmFyIHNvdXJjZUluZm8gPSBzb3VyY2VTcGFuLnN0YXJ0LnRvU3RyaW5nKCk7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBiaW5kaW5nc1Jlc3VsdCA9IHRoaXMuX2V4cHJQYXJzZXIucGFyc2VUZW1wbGF0ZUJpbmRpbmdzKHZhbHVlLCBzb3VyY2VJbmZvKTtcbiAgICAgIGJpbmRpbmdzUmVzdWx0LnRlbXBsYXRlQmluZGluZ3MuZm9yRWFjaCgoYmluZGluZykgPT4ge1xuICAgICAgICBpZiAoaXNQcmVzZW50KGJpbmRpbmcuZXhwcmVzc2lvbikpIHtcbiAgICAgICAgICB0aGlzLl9jaGVja1BpcGVzKGJpbmRpbmcuZXhwcmVzc2lvbiwgc291cmNlU3Bhbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgYmluZGluZ3NSZXN1bHQud2FybmluZ3MuZm9yRWFjaChcbiAgICAgICAgICAod2FybmluZykgPT4geyB0aGlzLl9yZXBvcnRFcnJvcih3YXJuaW5nLCBzb3VyY2VTcGFuLCBQYXJzZUVycm9yTGV2ZWwuV0FSTklORyk7IH0pO1xuICAgICAgcmV0dXJuIGJpbmRpbmdzUmVzdWx0LnRlbXBsYXRlQmluZGluZ3M7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5fcmVwb3J0RXJyb3IoYCR7ZX1gLCBzb3VyY2VTcGFuKTtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jaGVja1BpcGVzKGFzdDogQVNUV2l0aFNvdXJjZSwgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7XG4gICAgaWYgKGlzUHJlc2VudChhc3QpKSB7XG4gICAgICB2YXIgY29sbGVjdG9yID0gbmV3IFBpcGVDb2xsZWN0b3IoKTtcbiAgICAgIGFzdC52aXNpdChjb2xsZWN0b3IpO1xuICAgICAgY29sbGVjdG9yLnBpcGVzLmZvckVhY2goKHBpcGVOYW1lKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5waXBlc0J5TmFtZS5oYXMocGlwZU5hbWUpKSB7XG4gICAgICAgICAgdGhpcy5fcmVwb3J0RXJyb3IoYFRoZSBwaXBlICcke3BpcGVOYW1lfScgY291bGQgbm90IGJlIGZvdW5kYCwgc291cmNlU3Bhbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHZpc2l0RXhwYW5zaW9uKGFzdDogSHRtbEV4cGFuc2lvbkFzdCwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIG51bGw7IH1cblxuICB2aXNpdEV4cGFuc2lvbkNhc2UoYXN0OiBIdG1sRXhwYW5zaW9uQ2FzZUFzdCwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIG51bGw7IH1cblxuICB2aXNpdFRleHQoYXN0OiBIdG1sVGV4dEFzdCwgcGFyZW50OiBFbGVtZW50Q29udGV4dCk6IGFueSB7XG4gICAgdmFyIG5nQ29udGVudEluZGV4ID0gcGFyZW50LmZpbmROZ0NvbnRlbnRJbmRleChURVhUX0NTU19TRUxFQ1RPUik7XG4gICAgdmFyIGV4cHIgPSB0aGlzLl9wYXJzZUludGVycG9sYXRpb24oYXN0LnZhbHVlLCBhc3Quc291cmNlU3Bhbik7XG4gICAgaWYgKGlzUHJlc2VudChleHByKSkge1xuICAgICAgcmV0dXJuIG5ldyBCb3VuZFRleHRBc3QoZXhwciwgbmdDb250ZW50SW5kZXgsIGFzdC5zb3VyY2VTcGFuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBUZXh0QXN0KGFzdC52YWx1ZSwgbmdDb250ZW50SW5kZXgsIGFzdC5zb3VyY2VTcGFuKTtcbiAgICB9XG4gIH1cblxuICB2aXNpdEF0dHIoYXN0OiBIdG1sQXR0ckFzdCwgY29udGV4OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBuZXcgQXR0ckFzdChhc3QubmFtZSwgYXN0LnZhbHVlLCBhc3Quc291cmNlU3Bhbik7XG4gIH1cblxuICB2aXNpdENvbW1lbnQoYXN0OiBIdG1sQ29tbWVudEFzdCwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIG51bGw7IH1cblxuICB2aXNpdEVsZW1lbnQoZWxlbWVudDogSHRtbEVsZW1lbnRBc3QsIHBhcmVudDogRWxlbWVudENvbnRleHQpOiBhbnkge1xuICAgIHZhciBub2RlTmFtZSA9IGVsZW1lbnQubmFtZTtcbiAgICB2YXIgcHJlcGFyc2VkRWxlbWVudCA9IHByZXBhcnNlRWxlbWVudChlbGVtZW50KTtcbiAgICBpZiAocHJlcGFyc2VkRWxlbWVudC50eXBlID09PSBQcmVwYXJzZWRFbGVtZW50VHlwZS5TQ1JJUFQgfHxcbiAgICAgICAgcHJlcGFyc2VkRWxlbWVudC50eXBlID09PSBQcmVwYXJzZWRFbGVtZW50VHlwZS5TVFlMRSkge1xuICAgICAgLy8gU2tpcHBpbmcgPHNjcmlwdD4gZm9yIHNlY3VyaXR5IHJlYXNvbnNcbiAgICAgIC8vIFNraXBwaW5nIDxzdHlsZT4gYXMgd2UgYWxyZWFkeSBwcm9jZXNzZWQgdGhlbVxuICAgICAgLy8gaW4gdGhlIFN0eWxlQ29tcGlsZXJcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAocHJlcGFyc2VkRWxlbWVudC50eXBlID09PSBQcmVwYXJzZWRFbGVtZW50VHlwZS5TVFlMRVNIRUVUICYmXG4gICAgICAgIGlzU3R5bGVVcmxSZXNvbHZhYmxlKHByZXBhcnNlZEVsZW1lbnQuaHJlZkF0dHIpKSB7XG4gICAgICAvLyBTa2lwcGluZyBzdHlsZXNoZWV0cyB3aXRoIGVpdGhlciByZWxhdGl2ZSB1cmxzIG9yIHBhY2thZ2Ugc2NoZW1lIGFzIHdlIGFscmVhZHkgcHJvY2Vzc2VkXG4gICAgICAvLyB0aGVtIGluIHRoZSBTdHlsZUNvbXBpbGVyXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgbWF0Y2hhYmxlQXR0cnM6IHN0cmluZ1tdW10gPSBbXTtcbiAgICB2YXIgZWxlbWVudE9yRGlyZWN0aXZlUHJvcHM6IEJvdW5kRWxlbWVudE9yRGlyZWN0aXZlUHJvcGVydHlbXSA9IFtdO1xuICAgIHZhciBlbGVtZW50T3JEaXJlY3RpdmVSZWZzOiBFbGVtZW50T3JEaXJlY3RpdmVSZWZbXSA9IFtdO1xuICAgIHZhciBlbGVtZW50VmFyczogVmFyaWFibGVBc3RbXSA9IFtdO1xuICAgIHZhciBldmVudHM6IEJvdW5kRXZlbnRBc3RbXSA9IFtdO1xuXG4gICAgdmFyIHRlbXBsYXRlRWxlbWVudE9yRGlyZWN0aXZlUHJvcHM6IEJvdW5kRWxlbWVudE9yRGlyZWN0aXZlUHJvcGVydHlbXSA9IFtdO1xuICAgIHZhciB0ZW1wbGF0ZU1hdGNoYWJsZUF0dHJzOiBzdHJpbmdbXVtdID0gW107XG4gICAgdmFyIHRlbXBsYXRlRWxlbWVudFZhcnM6IFZhcmlhYmxlQXN0W10gPSBbXTtcblxuICAgIHZhciBoYXNJbmxpbmVUZW1wbGF0ZXMgPSBmYWxzZTtcbiAgICB2YXIgYXR0cnMgPSBbXTtcbiAgICB2YXIgbGNFbE5hbWUgPSBzcGxpdE5zTmFtZShub2RlTmFtZS50b0xvd2VyQ2FzZSgpKVsxXTtcbiAgICB2YXIgaXNUZW1wbGF0ZUVsZW1lbnQgPSBsY0VsTmFtZSA9PSBURU1QTEFURV9FTEVNRU5UO1xuXG4gICAgZWxlbWVudC5hdHRycy5mb3JFYWNoKGF0dHIgPT4ge1xuICAgICAgdmFyIGhhc0JpbmRpbmcgPVxuICAgICAgICAgIHRoaXMuX3BhcnNlQXR0cihpc1RlbXBsYXRlRWxlbWVudCwgYXR0ciwgbWF0Y2hhYmxlQXR0cnMsIGVsZW1lbnRPckRpcmVjdGl2ZVByb3BzLCBldmVudHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRPckRpcmVjdGl2ZVJlZnMsIGVsZW1lbnRWYXJzKTtcbiAgICAgIHZhciBoYXNUZW1wbGF0ZUJpbmRpbmcgPSB0aGlzLl9wYXJzZUlubGluZVRlbXBsYXRlQmluZGluZyhcbiAgICAgICAgICBhdHRyLCB0ZW1wbGF0ZU1hdGNoYWJsZUF0dHJzLCB0ZW1wbGF0ZUVsZW1lbnRPckRpcmVjdGl2ZVByb3BzLCB0ZW1wbGF0ZUVsZW1lbnRWYXJzKTtcbiAgICAgIGlmICghaGFzQmluZGluZyAmJiAhaGFzVGVtcGxhdGVCaW5kaW5nKSB7XG4gICAgICAgIC8vIGRvbid0IGluY2x1ZGUgdGhlIGJpbmRpbmdzIGFzIGF0dHJpYnV0ZXMgYXMgd2VsbCBpbiB0aGUgQVNUXG4gICAgICAgIGF0dHJzLnB1c2godGhpcy52aXNpdEF0dHIoYXR0ciwgbnVsbCkpO1xuICAgICAgICBtYXRjaGFibGVBdHRycy5wdXNoKFthdHRyLm5hbWUsIGF0dHIudmFsdWVdKTtcbiAgICAgIH1cbiAgICAgIGlmIChoYXNUZW1wbGF0ZUJpbmRpbmcpIHtcbiAgICAgICAgaGFzSW5saW5lVGVtcGxhdGVzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBlbGVtZW50Q3NzU2VsZWN0b3IgPSBjcmVhdGVFbGVtZW50Q3NzU2VsZWN0b3Iobm9kZU5hbWUsIG1hdGNoYWJsZUF0dHJzKTtcbiAgICB2YXIgZGlyZWN0aXZlTWV0YXMgPSB0aGlzLl9wYXJzZURpcmVjdGl2ZXModGhpcy5zZWxlY3Rvck1hdGNoZXIsIGVsZW1lbnRDc3NTZWxlY3Rvcik7XG4gICAgdmFyIHJlZmVyZW5jZXM6IFJlZmVyZW5jZUFzdFtdID0gW107XG4gICAgdmFyIGRpcmVjdGl2ZUFzdHMgPSB0aGlzLl9jcmVhdGVEaXJlY3RpdmVBc3RzKGlzVGVtcGxhdGVFbGVtZW50LCBlbGVtZW50Lm5hbWUsIGRpcmVjdGl2ZU1ldGFzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50T3JEaXJlY3RpdmVQcm9wcywgZWxlbWVudE9yRGlyZWN0aXZlUmVmcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zb3VyY2VTcGFuLCByZWZlcmVuY2VzKTtcbiAgICB2YXIgZWxlbWVudFByb3BzOiBCb3VuZEVsZW1lbnRQcm9wZXJ0eUFzdFtdID1cbiAgICAgICAgdGhpcy5fY3JlYXRlRWxlbWVudFByb3BlcnR5QXN0cyhlbGVtZW50Lm5hbWUsIGVsZW1lbnRPckRpcmVjdGl2ZVByb3BzLCBkaXJlY3RpdmVBc3RzKTtcbiAgICB2YXIgaXNWaWV3Um9vdCA9IHBhcmVudC5pc1RlbXBsYXRlRWxlbWVudCB8fCBoYXNJbmxpbmVUZW1wbGF0ZXM7XG4gICAgdmFyIHByb3ZpZGVyQ29udGV4dCA9XG4gICAgICAgIG5ldyBQcm92aWRlckVsZW1lbnRDb250ZXh0KHRoaXMucHJvdmlkZXJWaWV3Q29udGV4dCwgcGFyZW50LnByb3ZpZGVyQ29udGV4dCwgaXNWaWV3Um9vdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlQXN0cywgYXR0cnMsIHJlZmVyZW5jZXMsIGVsZW1lbnQuc291cmNlU3Bhbik7XG4gICAgdmFyIGNoaWxkcmVuID0gaHRtbFZpc2l0QWxsKFxuICAgICAgICBwcmVwYXJzZWRFbGVtZW50Lm5vbkJpbmRhYmxlID8gTk9OX0JJTkRBQkxFX1ZJU0lUT1IgOiB0aGlzLCBlbGVtZW50LmNoaWxkcmVuLFxuICAgICAgICBFbGVtZW50Q29udGV4dC5jcmVhdGUoaXNUZW1wbGF0ZUVsZW1lbnQsIGRpcmVjdGl2ZUFzdHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1RlbXBsYXRlRWxlbWVudCA/IHBhcmVudC5wcm92aWRlckNvbnRleHQgOiBwcm92aWRlckNvbnRleHQpKTtcbiAgICBwcm92aWRlckNvbnRleHQuYWZ0ZXJFbGVtZW50KCk7XG4gICAgLy8gT3ZlcnJpZGUgdGhlIGFjdHVhbCBzZWxlY3RvciB3aGVuIHRoZSBgbmdQcm9qZWN0QXNgIGF0dHJpYnV0ZSBpcyBwcm92aWRlZFxuICAgIHZhciBwcm9qZWN0aW9uU2VsZWN0b3IgPSBpc1ByZXNlbnQocHJlcGFyc2VkRWxlbWVudC5wcm9qZWN0QXMpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENzc1NlbGVjdG9yLnBhcnNlKHByZXBhcnNlZEVsZW1lbnQucHJvamVjdEFzKVswXSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50Q3NzU2VsZWN0b3I7XG4gICAgdmFyIG5nQ29udGVudEluZGV4ID0gcGFyZW50LmZpbmROZ0NvbnRlbnRJbmRleChwcm9qZWN0aW9uU2VsZWN0b3IpO1xuICAgIHZhciBwYXJzZWRFbGVtZW50O1xuXG4gICAgaWYgKHByZXBhcnNlZEVsZW1lbnQudHlwZSA9PT0gUHJlcGFyc2VkRWxlbWVudFR5cGUuTkdfQ09OVEVOVCkge1xuICAgICAgaWYgKGlzUHJlc2VudChlbGVtZW50LmNoaWxkcmVuKSAmJiBlbGVtZW50LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5fcmVwb3J0RXJyb3IoXG4gICAgICAgICAgICBgPG5nLWNvbnRlbnQ+IGVsZW1lbnQgY2Fubm90IGhhdmUgY29udGVudC4gPG5nLWNvbnRlbnQ+IG11c3QgYmUgaW1tZWRpYXRlbHkgZm9sbG93ZWQgYnkgPC9uZy1jb250ZW50PmAsXG4gICAgICAgICAgICBlbGVtZW50LnNvdXJjZVNwYW4pO1xuICAgICAgfVxuXG4gICAgICBwYXJzZWRFbGVtZW50ID0gbmV3IE5nQ29udGVudEFzdChcbiAgICAgICAgICB0aGlzLm5nQ29udGVudENvdW50KyssIGhhc0lubGluZVRlbXBsYXRlcyA/IG51bGwgOiBuZ0NvbnRlbnRJbmRleCwgZWxlbWVudC5zb3VyY2VTcGFuKTtcbiAgICB9IGVsc2UgaWYgKGlzVGVtcGxhdGVFbGVtZW50KSB7XG4gICAgICB0aGlzLl9hc3NlcnRBbGxFdmVudHNQdWJsaXNoZWRCeURpcmVjdGl2ZXMoZGlyZWN0aXZlQXN0cywgZXZlbnRzKTtcbiAgICAgIHRoaXMuX2Fzc2VydE5vQ29tcG9uZW50c05vckVsZW1lbnRCaW5kaW5nc09uVGVtcGxhdGUoZGlyZWN0aXZlQXN0cywgZWxlbWVudFByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnNvdXJjZVNwYW4pO1xuXG4gICAgICBwYXJzZWRFbGVtZW50ID0gbmV3IEVtYmVkZGVkVGVtcGxhdGVBc3QoXG4gICAgICAgICAgYXR0cnMsIGV2ZW50cywgcmVmZXJlbmNlcywgZWxlbWVudFZhcnMsIHByb3ZpZGVyQ29udGV4dC50cmFuc2Zvcm1lZERpcmVjdGl2ZUFzdHMsXG4gICAgICAgICAgcHJvdmlkZXJDb250ZXh0LnRyYW5zZm9ybVByb3ZpZGVycywgcHJvdmlkZXJDb250ZXh0LnRyYW5zZm9ybWVkSGFzVmlld0NvbnRhaW5lciwgY2hpbGRyZW4sXG4gICAgICAgICAgaGFzSW5saW5lVGVtcGxhdGVzID8gbnVsbCA6IG5nQ29udGVudEluZGV4LCBlbGVtZW50LnNvdXJjZVNwYW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9hc3NlcnRPbmx5T25lQ29tcG9uZW50KGRpcmVjdGl2ZUFzdHMsIGVsZW1lbnQuc291cmNlU3Bhbik7XG4gICAgICBsZXQgbmdDb250ZW50SW5kZXggPVxuICAgICAgICAgIGhhc0lubGluZVRlbXBsYXRlcyA/IG51bGwgOiBwYXJlbnQuZmluZE5nQ29udGVudEluZGV4KHByb2plY3Rpb25TZWxlY3Rvcik7XG4gICAgICBwYXJzZWRFbGVtZW50ID0gbmV3IEVsZW1lbnRBc3QoXG4gICAgICAgICAgbm9kZU5hbWUsIGF0dHJzLCBlbGVtZW50UHJvcHMsIGV2ZW50cywgcmVmZXJlbmNlcyxcbiAgICAgICAgICBwcm92aWRlckNvbnRleHQudHJhbnNmb3JtZWREaXJlY3RpdmVBc3RzLCBwcm92aWRlckNvbnRleHQudHJhbnNmb3JtUHJvdmlkZXJzLFxuICAgICAgICAgIHByb3ZpZGVyQ29udGV4dC50cmFuc2Zvcm1lZEhhc1ZpZXdDb250YWluZXIsIGNoaWxkcmVuLFxuICAgICAgICAgIGhhc0lubGluZVRlbXBsYXRlcyA/IG51bGwgOiBuZ0NvbnRlbnRJbmRleCwgZWxlbWVudC5zb3VyY2VTcGFuKTtcbiAgICB9XG4gICAgaWYgKGhhc0lubGluZVRlbXBsYXRlcykge1xuICAgICAgdmFyIHRlbXBsYXRlQ3NzU2VsZWN0b3IgPSBjcmVhdGVFbGVtZW50Q3NzU2VsZWN0b3IoVEVNUExBVEVfRUxFTUVOVCwgdGVtcGxhdGVNYXRjaGFibGVBdHRycyk7XG4gICAgICB2YXIgdGVtcGxhdGVEaXJlY3RpdmVNZXRhcyA9IHRoaXMuX3BhcnNlRGlyZWN0aXZlcyh0aGlzLnNlbGVjdG9yTWF0Y2hlciwgdGVtcGxhdGVDc3NTZWxlY3Rvcik7XG4gICAgICB2YXIgdGVtcGxhdGVEaXJlY3RpdmVBc3RzID1cbiAgICAgICAgICB0aGlzLl9jcmVhdGVEaXJlY3RpdmVBc3RzKHRydWUsIGVsZW1lbnQubmFtZSwgdGVtcGxhdGVEaXJlY3RpdmVNZXRhcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlRWxlbWVudE9yRGlyZWN0aXZlUHJvcHMsIFtdLCBlbGVtZW50LnNvdXJjZVNwYW4sIFtdKTtcbiAgICAgIHZhciB0ZW1wbGF0ZUVsZW1lbnRQcm9wczogQm91bmRFbGVtZW50UHJvcGVydHlBc3RbXSA9IHRoaXMuX2NyZWF0ZUVsZW1lbnRQcm9wZXJ0eUFzdHMoXG4gICAgICAgICAgZWxlbWVudC5uYW1lLCB0ZW1wbGF0ZUVsZW1lbnRPckRpcmVjdGl2ZVByb3BzLCB0ZW1wbGF0ZURpcmVjdGl2ZUFzdHMpO1xuICAgICAgdGhpcy5fYXNzZXJ0Tm9Db21wb25lbnRzTm9yRWxlbWVudEJpbmRpbmdzT25UZW1wbGF0ZShcbiAgICAgICAgICB0ZW1wbGF0ZURpcmVjdGl2ZUFzdHMsIHRlbXBsYXRlRWxlbWVudFByb3BzLCBlbGVtZW50LnNvdXJjZVNwYW4pO1xuICAgICAgdmFyIHRlbXBsYXRlUHJvdmlkZXJDb250ZXh0ID0gbmV3IFByb3ZpZGVyRWxlbWVudENvbnRleHQoXG4gICAgICAgICAgdGhpcy5wcm92aWRlclZpZXdDb250ZXh0LCBwYXJlbnQucHJvdmlkZXJDb250ZXh0LCBwYXJlbnQuaXNUZW1wbGF0ZUVsZW1lbnQsXG4gICAgICAgICAgdGVtcGxhdGVEaXJlY3RpdmVBc3RzLCBbXSwgW10sIGVsZW1lbnQuc291cmNlU3Bhbik7XG4gICAgICB0ZW1wbGF0ZVByb3ZpZGVyQ29udGV4dC5hZnRlckVsZW1lbnQoKTtcblxuICAgICAgcGFyc2VkRWxlbWVudCA9IG5ldyBFbWJlZGRlZFRlbXBsYXRlQXN0KFtdLCBbXSwgW10sIHRlbXBsYXRlRWxlbWVudFZhcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVQcm92aWRlckNvbnRleHQudHJhbnNmb3JtZWREaXJlY3RpdmVBc3RzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUHJvdmlkZXJDb250ZXh0LnRyYW5zZm9ybVByb3ZpZGVycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVByb3ZpZGVyQ29udGV4dC50cmFuc2Zvcm1lZEhhc1ZpZXdDb250YWluZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3BhcnNlZEVsZW1lbnRdLCBuZ0NvbnRlbnRJbmRleCwgZWxlbWVudC5zb3VyY2VTcGFuKTtcbiAgICB9XG4gICAgcmV0dXJuIHBhcnNlZEVsZW1lbnQ7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZUlubGluZVRlbXBsYXRlQmluZGluZyhhdHRyOiBIdG1sQXR0ckFzdCwgdGFyZ2V0TWF0Y2hhYmxlQXR0cnM6IHN0cmluZ1tdW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFByb3BzOiBCb3VuZEVsZW1lbnRPckRpcmVjdGl2ZVByb3BlcnR5W10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFZhcnM6IFZhcmlhYmxlQXN0W10pOiBib29sZWFuIHtcbiAgICB2YXIgdGVtcGxhdGVCaW5kaW5nc1NvdXJjZSA9IG51bGw7XG4gICAgaWYgKGF0dHIubmFtZSA9PSBURU1QTEFURV9BVFRSKSB7XG4gICAgICB0ZW1wbGF0ZUJpbmRpbmdzU291cmNlID0gYXR0ci52YWx1ZTtcbiAgICB9IGVsc2UgaWYgKGF0dHIubmFtZS5zdGFydHNXaXRoKFRFTVBMQVRFX0FUVFJfUFJFRklYKSkge1xuICAgICAgdmFyIGtleSA9IGF0dHIubmFtZS5zdWJzdHJpbmcoVEVNUExBVEVfQVRUUl9QUkVGSVgubGVuZ3RoKTsgIC8vIHJlbW92ZSB0aGUgc3RhclxuICAgICAgdGVtcGxhdGVCaW5kaW5nc1NvdXJjZSA9IChhdHRyLnZhbHVlLmxlbmd0aCA9PSAwKSA/IGtleSA6IGtleSArICcgJyArIGF0dHIudmFsdWU7XG4gICAgfVxuICAgIGlmIChpc1ByZXNlbnQodGVtcGxhdGVCaW5kaW5nc1NvdXJjZSkpIHtcbiAgICAgIHZhciBiaW5kaW5ncyA9IHRoaXMuX3BhcnNlVGVtcGxhdGVCaW5kaW5ncyh0ZW1wbGF0ZUJpbmRpbmdzU291cmNlLCBhdHRyLnNvdXJjZVNwYW4pO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiaW5kaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYmluZGluZyA9IGJpbmRpbmdzW2ldO1xuICAgICAgICBpZiAoYmluZGluZy5rZXlJc1Zhcikge1xuICAgICAgICAgIHRhcmdldFZhcnMucHVzaChuZXcgVmFyaWFibGVBc3QoYmluZGluZy5rZXksIGJpbmRpbmcubmFtZSwgYXR0ci5zb3VyY2VTcGFuKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KGJpbmRpbmcuZXhwcmVzc2lvbikpIHtcbiAgICAgICAgICB0aGlzLl9wYXJzZVByb3BlcnR5QXN0KGJpbmRpbmcua2V5LCBiaW5kaW5nLmV4cHJlc3Npb24sIGF0dHIuc291cmNlU3BhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldE1hdGNoYWJsZUF0dHJzLCB0YXJnZXRQcm9wcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFyZ2V0TWF0Y2hhYmxlQXR0cnMucHVzaChbYmluZGluZy5rZXksICcnXSk7XG4gICAgICAgICAgdGhpcy5fcGFyc2VMaXRlcmFsQXR0cihiaW5kaW5nLmtleSwgbnVsbCwgYXR0ci5zb3VyY2VTcGFuLCB0YXJnZXRQcm9wcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZUF0dHIoaXNUZW1wbGF0ZUVsZW1lbnQ6IGJvb2xlYW4sIGF0dHI6IEh0bWxBdHRyQXN0LFxuICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TWF0Y2hhYmxlQXR0cnM6IHN0cmluZ1tdW10sXG4gICAgICAgICAgICAgICAgICAgICB0YXJnZXRQcm9wczogQm91bmRFbGVtZW50T3JEaXJlY3RpdmVQcm9wZXJ0eVtdLCB0YXJnZXRFdmVudHM6IEJvdW5kRXZlbnRBc3RbXSxcbiAgICAgICAgICAgICAgICAgICAgIHRhcmdldFJlZnM6IEVsZW1lbnRPckRpcmVjdGl2ZVJlZltdLCB0YXJnZXRWYXJzOiBWYXJpYWJsZUFzdFtdKTogYm9vbGVhbiB7XG4gICAgdmFyIGF0dHJOYW1lID0gdGhpcy5fbm9ybWFsaXplQXR0cmlidXRlTmFtZShhdHRyLm5hbWUpO1xuICAgIHZhciBhdHRyVmFsdWUgPSBhdHRyLnZhbHVlO1xuICAgIHZhciBiaW5kUGFydHMgPSBSZWdFeHBXcmFwcGVyLmZpcnN0TWF0Y2goQklORF9OQU1FX1JFR0VYUCwgYXR0ck5hbWUpO1xuICAgIHZhciBoYXNCaW5kaW5nID0gZmFsc2U7XG4gICAgaWYgKGlzUHJlc2VudChiaW5kUGFydHMpKSB7XG4gICAgICBoYXNCaW5kaW5nID0gdHJ1ZTtcbiAgICAgIGlmIChpc1ByZXNlbnQoYmluZFBhcnRzWzFdKSkgeyAgLy8gbWF0Y2g6IGJpbmQtcHJvcFxuICAgICAgICB0aGlzLl9wYXJzZVByb3BlcnR5KGJpbmRQYXJ0c1s3XSwgYXR0clZhbHVlLCBhdHRyLnNvdXJjZVNwYW4sIHRhcmdldE1hdGNoYWJsZUF0dHJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFByb3BzKTtcblxuICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQoYmluZFBhcnRzWzJdKSkgeyAgLy8gbWF0Y2g6IHZhci1uYW1lIC8gdmFyLW5hbWU9XCJpZGVuXCJcbiAgICAgICAgdmFyIGlkZW50aWZpZXIgPSBiaW5kUGFydHNbN107XG4gICAgICAgIGlmIChpc1RlbXBsYXRlRWxlbWVudCkge1xuICAgICAgICAgIHRoaXMuX3JlcG9ydEVycm9yKGBcInZhci1cIiBvbiA8dGVtcGxhdGU+IGVsZW1lbnRzIGlzIGRlcHJlY2F0ZWQuIFVzZSBcImxldC1cIiBpbnN0ZWFkIWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0ci5zb3VyY2VTcGFuLCBQYXJzZUVycm9yTGV2ZWwuV0FSTklORyk7XG4gICAgICAgICAgdGhpcy5fcGFyc2VWYXJpYWJsZShpZGVudGlmaWVyLCBhdHRyVmFsdWUsIGF0dHIuc291cmNlU3BhbiwgdGFyZ2V0VmFycyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fcmVwb3J0RXJyb3IoYFwidmFyLVwiIG9uIG5vbiA8dGVtcGxhdGU+IGVsZW1lbnRzIGlzIGRlcHJlY2F0ZWQuIFVzZSBcInJlZi1cIiBpbnN0ZWFkIWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0ci5zb3VyY2VTcGFuLCBQYXJzZUVycm9yTGV2ZWwuV0FSTklORyk7XG4gICAgICAgICAgdGhpcy5fcGFyc2VSZWZlcmVuY2UoaWRlbnRpZmllciwgYXR0clZhbHVlLCBhdHRyLnNvdXJjZVNwYW4sIHRhcmdldFJlZnMpO1xuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KGJpbmRQYXJ0c1szXSkpIHsgIC8vIG1hdGNoOiBsZXQtbmFtZVxuICAgICAgICBpZiAoaXNUZW1wbGF0ZUVsZW1lbnQpIHtcbiAgICAgICAgICB2YXIgaWRlbnRpZmllciA9IGJpbmRQYXJ0c1s3XTtcbiAgICAgICAgICB0aGlzLl9wYXJzZVZhcmlhYmxlKGlkZW50aWZpZXIsIGF0dHJWYWx1ZSwgYXR0ci5zb3VyY2VTcGFuLCB0YXJnZXRWYXJzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9yZXBvcnRFcnJvcihgXCJsZXQtXCIgaXMgb25seSBzdXBwb3J0ZWQgb24gdGVtcGxhdGUgZWxlbWVudHMuYCwgYXR0ci5zb3VyY2VTcGFuKTtcbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudChiaW5kUGFydHNbNF0pKSB7ICAvLyBtYXRjaDogcmVmLSAvICNpZGVuXG4gICAgICAgIHZhciBpZGVudGlmaWVyID0gYmluZFBhcnRzWzddO1xuICAgICAgICB0aGlzLl9wYXJzZVJlZmVyZW5jZShpZGVudGlmaWVyLCBhdHRyVmFsdWUsIGF0dHIuc291cmNlU3BhbiwgdGFyZ2V0UmVmcyk7XG5cbiAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KGJpbmRQYXJ0c1s1XSkpIHsgIC8vIG1hdGNoOiBvbi1ldmVudFxuICAgICAgICB0aGlzLl9wYXJzZUV2ZW50KGJpbmRQYXJ0c1s3XSwgYXR0clZhbHVlLCBhdHRyLnNvdXJjZVNwYW4sIHRhcmdldE1hdGNoYWJsZUF0dHJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEV2ZW50cyk7XG5cbiAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KGJpbmRQYXJ0c1s2XSkpIHsgIC8vIG1hdGNoOiBiaW5kb24tcHJvcFxuICAgICAgICB0aGlzLl9wYXJzZVByb3BlcnR5KGJpbmRQYXJ0c1s3XSwgYXR0clZhbHVlLCBhdHRyLnNvdXJjZVNwYW4sIHRhcmdldE1hdGNoYWJsZUF0dHJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFByb3BzKTtcbiAgICAgICAgdGhpcy5fcGFyc2VBc3NpZ25tZW50RXZlbnQoYmluZFBhcnRzWzddLCBhdHRyVmFsdWUsIGF0dHIuc291cmNlU3BhbiwgdGFyZ2V0TWF0Y2hhYmxlQXR0cnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEV2ZW50cyk7XG5cbiAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KGJpbmRQYXJ0c1s4XSkpIHsgIC8vIG1hdGNoOiBbKGV4cHIpXVxuICAgICAgICB0aGlzLl9wYXJzZVByb3BlcnR5KGJpbmRQYXJ0c1s4XSwgYXR0clZhbHVlLCBhdHRyLnNvdXJjZVNwYW4sIHRhcmdldE1hdGNoYWJsZUF0dHJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFByb3BzKTtcbiAgICAgICAgdGhpcy5fcGFyc2VBc3NpZ25tZW50RXZlbnQoYmluZFBhcnRzWzhdLCBhdHRyVmFsdWUsIGF0dHIuc291cmNlU3BhbiwgdGFyZ2V0TWF0Y2hhYmxlQXR0cnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEV2ZW50cyk7XG5cbiAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KGJpbmRQYXJ0c1s5XSkpIHsgIC8vIG1hdGNoOiBbZXhwcl1cbiAgICAgICAgdGhpcy5fcGFyc2VQcm9wZXJ0eShiaW5kUGFydHNbOV0sIGF0dHJWYWx1ZSwgYXR0ci5zb3VyY2VTcGFuLCB0YXJnZXRNYXRjaGFibGVBdHRycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRQcm9wcyk7XG5cbiAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KGJpbmRQYXJ0c1sxMF0pKSB7ICAvLyBtYXRjaDogKGV2ZW50KVxuICAgICAgICB0aGlzLl9wYXJzZUV2ZW50KGJpbmRQYXJ0c1sxMF0sIGF0dHJWYWx1ZSwgYXR0ci5zb3VyY2VTcGFuLCB0YXJnZXRNYXRjaGFibGVBdHRycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRFdmVudHMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBoYXNCaW5kaW5nID0gdGhpcy5fcGFyc2VQcm9wZXJ0eUludGVycG9sYXRpb24oYXR0ck5hbWUsIGF0dHJWYWx1ZSwgYXR0ci5zb3VyY2VTcGFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldE1hdGNoYWJsZUF0dHJzLCB0YXJnZXRQcm9wcyk7XG4gICAgfVxuICAgIGlmICghaGFzQmluZGluZykge1xuICAgICAgdGhpcy5fcGFyc2VMaXRlcmFsQXR0cihhdHRyTmFtZSwgYXR0clZhbHVlLCBhdHRyLnNvdXJjZVNwYW4sIHRhcmdldFByb3BzKTtcbiAgICB9XG4gICAgcmV0dXJuIGhhc0JpbmRpbmc7XG4gIH1cblxuICBwcml2YXRlIF9ub3JtYWxpemVBdHRyaWJ1dGVOYW1lKGF0dHJOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBhdHRyTmFtZS50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoJ2RhdGEtJykgPyBhdHRyTmFtZS5zdWJzdHJpbmcoNSkgOiBhdHRyTmFtZTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlVmFyaWFibGUoaWRlbnRpZmllcjogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0VmFyczogVmFyaWFibGVBc3RbXSkge1xuICAgIGlmIChpZGVudGlmaWVyLmluZGV4T2YoJy0nKSA+IC0xKSB7XG4gICAgICB0aGlzLl9yZXBvcnRFcnJvcihgXCItXCIgaXMgbm90IGFsbG93ZWQgaW4gdmFyaWFibGUgbmFtZXNgLCBzb3VyY2VTcGFuKTtcbiAgICB9XG4gICAgdGFyZ2V0VmFycy5wdXNoKG5ldyBWYXJpYWJsZUFzdChpZGVudGlmaWVyLCB2YWx1ZSwgc291cmNlU3BhbikpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VSZWZlcmVuY2UoaWRlbnRpZmllcjogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFJlZnM6IEVsZW1lbnRPckRpcmVjdGl2ZVJlZltdKSB7XG4gICAgaWYgKGlkZW50aWZpZXIuaW5kZXhPZignLScpID4gLTEpIHtcbiAgICAgIHRoaXMuX3JlcG9ydEVycm9yKGBcIi1cIiBpcyBub3QgYWxsb3dlZCBpbiByZWZlcmVuY2UgbmFtZXNgLCBzb3VyY2VTcGFuKTtcbiAgICB9XG4gICAgdGFyZ2V0UmVmcy5wdXNoKG5ldyBFbGVtZW50T3JEaXJlY3RpdmVSZWYoaWRlbnRpZmllciwgdmFsdWUsIHNvdXJjZVNwYW4pKTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlUHJvcGVydHkobmFtZTogc3RyaW5nLCBleHByZXNzaW9uOiBzdHJpbmcsIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRNYXRjaGFibGVBdHRyczogc3RyaW5nW11bXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRQcm9wczogQm91bmRFbGVtZW50T3JEaXJlY3RpdmVQcm9wZXJ0eVtdKSB7XG4gICAgdGhpcy5fcGFyc2VQcm9wZXJ0eUFzdChuYW1lLCB0aGlzLl9wYXJzZUJpbmRpbmcoZXhwcmVzc2lvbiwgc291cmNlU3BhbiksIHNvdXJjZVNwYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRNYXRjaGFibGVBdHRycywgdGFyZ2V0UHJvcHMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VQcm9wZXJ0eUludGVycG9sYXRpb24obmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldE1hdGNoYWJsZUF0dHJzOiBzdHJpbmdbXVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRQcm9wczogQm91bmRFbGVtZW50T3JEaXJlY3RpdmVQcm9wZXJ0eVtdKTogYm9vbGVhbiB7XG4gICAgdmFyIGV4cHIgPSB0aGlzLl9wYXJzZUludGVycG9sYXRpb24odmFsdWUsIHNvdXJjZVNwYW4pO1xuICAgIGlmIChpc1ByZXNlbnQoZXhwcikpIHtcbiAgICAgIHRoaXMuX3BhcnNlUHJvcGVydHlBc3QobmFtZSwgZXhwciwgc291cmNlU3BhbiwgdGFyZ2V0TWF0Y2hhYmxlQXR0cnMsIHRhcmdldFByb3BzKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVByb3BlcnR5QXN0KG5hbWU6IHN0cmluZywgYXN0OiBBU1RXaXRoU291cmNlLCBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TWF0Y2hhYmxlQXR0cnM6IHN0cmluZ1tdW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UHJvcHM6IEJvdW5kRWxlbWVudE9yRGlyZWN0aXZlUHJvcGVydHlbXSkge1xuICAgIHRhcmdldE1hdGNoYWJsZUF0dHJzLnB1c2goW25hbWUsIGFzdC5zb3VyY2VdKTtcbiAgICB0YXJnZXRQcm9wcy5wdXNoKG5ldyBCb3VuZEVsZW1lbnRPckRpcmVjdGl2ZVByb3BlcnR5KG5hbWUsIGFzdCwgZmFsc2UsIHNvdXJjZVNwYW4pKTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlQXNzaWdubWVudEV2ZW50KG5hbWU6IHN0cmluZywgZXhwcmVzc2lvbjogc3RyaW5nLCBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldE1hdGNoYWJsZUF0dHJzOiBzdHJpbmdbXVtdLCB0YXJnZXRFdmVudHM6IEJvdW5kRXZlbnRBc3RbXSkge1xuICAgIHRoaXMuX3BhcnNlRXZlbnQoYCR7bmFtZX1DaGFuZ2VgLCBgJHtleHByZXNzaW9ufT0kZXZlbnRgLCBzb3VyY2VTcGFuLCB0YXJnZXRNYXRjaGFibGVBdHRycyxcbiAgICAgICAgICAgICAgICAgICAgIHRhcmdldEV2ZW50cyk7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZUV2ZW50KG5hbWU6IHN0cmluZywgZXhwcmVzc2lvbjogc3RyaW5nLCBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sXG4gICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TWF0Y2hhYmxlQXR0cnM6IHN0cmluZ1tdW10sIHRhcmdldEV2ZW50czogQm91bmRFdmVudEFzdFtdKSB7XG4gICAgLy8gbG9uZyBmb3JtYXQ6ICd0YXJnZXQ6IGV2ZW50TmFtZSdcbiAgICB2YXIgcGFydHMgPSBzcGxpdEF0Q29sb24obmFtZSwgW251bGwsIG5hbWVdKTtcbiAgICB2YXIgdGFyZ2V0ID0gcGFydHNbMF07XG4gICAgdmFyIGV2ZW50TmFtZSA9IHBhcnRzWzFdO1xuICAgIHZhciBhc3QgPSB0aGlzLl9wYXJzZUFjdGlvbihleHByZXNzaW9uLCBzb3VyY2VTcGFuKTtcbiAgICB0YXJnZXRNYXRjaGFibGVBdHRycy5wdXNoKFtuYW1lLCBhc3Quc291cmNlXSk7XG4gICAgdGFyZ2V0RXZlbnRzLnB1c2gobmV3IEJvdW5kRXZlbnRBc3QoZXZlbnROYW1lLCB0YXJnZXQsIGFzdCwgc291cmNlU3BhbikpO1xuICAgIC8vIERvbid0IGRldGVjdCBkaXJlY3RpdmVzIGZvciBldmVudCBuYW1lcyBmb3Igbm93LFxuICAgIC8vIHNvIGRvbid0IGFkZCB0aGUgZXZlbnQgbmFtZSB0byB0aGUgbWF0Y2hhYmxlQXR0cnNcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlTGl0ZXJhbEF0dHIobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UHJvcHM6IEJvdW5kRWxlbWVudE9yRGlyZWN0aXZlUHJvcGVydHlbXSkge1xuICAgIHRhcmdldFByb3BzLnB1c2gobmV3IEJvdW5kRWxlbWVudE9yRGlyZWN0aXZlUHJvcGVydHkoXG4gICAgICAgIG5hbWUsIHRoaXMuX2V4cHJQYXJzZXIud3JhcExpdGVyYWxQcmltaXRpdmUodmFsdWUsICcnKSwgdHJ1ZSwgc291cmNlU3BhbikpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VEaXJlY3RpdmVzKHNlbGVjdG9yTWF0Y2hlcjogU2VsZWN0b3JNYXRjaGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudENzc1NlbGVjdG9yOiBDc3NTZWxlY3Rvcik6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YVtdIHtcbiAgICAvLyBOZWVkIHRvIHNvcnQgdGhlIGRpcmVjdGl2ZXMgc28gdGhhdCB3ZSBnZXQgY29uc2lzdGVudCByZXN1bHRzIHRocm91Z2hvdXQsXG4gICAgLy8gYXMgc2VsZWN0b3JNYXRjaGVyIHVzZXMgTWFwcyBpbnNpZGUuXG4gICAgLy8gQWxzbyBkZWR1cGUgZGlyZWN0aXZlcyBhcyB0aGV5IG1pZ2h0IG1hdGNoIG1vcmUgdGhhbiBvbmUgdGltZSFcbiAgICB2YXIgZGlyZWN0aXZlcyA9IExpc3RXcmFwcGVyLmNyZWF0ZUZpeGVkU2l6ZSh0aGlzLmRpcmVjdGl2ZXNJbmRleC5zaXplKTtcbiAgICBzZWxlY3Rvck1hdGNoZXIubWF0Y2goZWxlbWVudENzc1NlbGVjdG9yLCAoc2VsZWN0b3IsIGRpcmVjdGl2ZSkgPT4ge1xuICAgICAgZGlyZWN0aXZlc1t0aGlzLmRpcmVjdGl2ZXNJbmRleC5nZXQoZGlyZWN0aXZlKV0gPSBkaXJlY3RpdmU7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRpcmVjdGl2ZXMuZmlsdGVyKGRpciA9PiBpc1ByZXNlbnQoZGlyKSk7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVEaXJlY3RpdmVBc3RzKGlzVGVtcGxhdGVFbGVtZW50OiBib29sZWFuLCBlbGVtZW50TmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzOiBCb3VuZEVsZW1lbnRPckRpcmVjdGl2ZVByb3BlcnR5W10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudE9yRGlyZWN0aXZlUmVmczogRWxlbWVudE9yRGlyZWN0aXZlUmVmW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFJlZmVyZW5jZXM6IFJlZmVyZW5jZUFzdFtdKTogRGlyZWN0aXZlQXN0W10ge1xuICAgIHZhciBtYXRjaGVkUmVmZXJlbmNlcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgIHZhciBjb21wb25lbnQ6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSA9IG51bGw7XG4gICAgdmFyIGRpcmVjdGl2ZUFzdHMgPSBkaXJlY3RpdmVzLm1hcCgoZGlyZWN0aXZlOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEpID0+IHtcbiAgICAgIGlmIChkaXJlY3RpdmUuaXNDb21wb25lbnQpIHtcbiAgICAgICAgY29tcG9uZW50ID0gZGlyZWN0aXZlO1xuICAgICAgfVxuICAgICAgdmFyIGhvc3RQcm9wZXJ0aWVzOiBCb3VuZEVsZW1lbnRQcm9wZXJ0eUFzdFtdID0gW107XG4gICAgICB2YXIgaG9zdEV2ZW50czogQm91bmRFdmVudEFzdFtdID0gW107XG4gICAgICB2YXIgZGlyZWN0aXZlUHJvcGVydGllczogQm91bmREaXJlY3RpdmVQcm9wZXJ0eUFzdFtdID0gW107XG4gICAgICB0aGlzLl9jcmVhdGVEaXJlY3RpdmVIb3N0UHJvcGVydHlBc3RzKGVsZW1lbnROYW1lLCBkaXJlY3RpdmUuaG9zdFByb3BlcnRpZXMsIHNvdXJjZVNwYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvc3RQcm9wZXJ0aWVzKTtcbiAgICAgIHRoaXMuX2NyZWF0ZURpcmVjdGl2ZUhvc3RFdmVudEFzdHMoZGlyZWN0aXZlLmhvc3RMaXN0ZW5lcnMsIHNvdXJjZVNwYW4sIGhvc3RFdmVudHMpO1xuICAgICAgdGhpcy5fY3JlYXRlRGlyZWN0aXZlUHJvcGVydHlBc3RzKGRpcmVjdGl2ZS5pbnB1dHMsIHByb3BzLCBkaXJlY3RpdmVQcm9wZXJ0aWVzKTtcbiAgICAgIGVsZW1lbnRPckRpcmVjdGl2ZVJlZnMuZm9yRWFjaCgoZWxPckRpclJlZikgPT4ge1xuICAgICAgICBpZiAoKGVsT3JEaXJSZWYudmFsdWUubGVuZ3RoID09PSAwICYmIGRpcmVjdGl2ZS5pc0NvbXBvbmVudCkgfHxcbiAgICAgICAgICAgIChkaXJlY3RpdmUuZXhwb3J0QXMgPT0gZWxPckRpclJlZi52YWx1ZSkpIHtcbiAgICAgICAgICB0YXJnZXRSZWZlcmVuY2VzLnB1c2gobmV3IFJlZmVyZW5jZUFzdChlbE9yRGlyUmVmLm5hbWUsIGlkZW50aWZpZXJUb2tlbihkaXJlY3RpdmUudHlwZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxPckRpclJlZi5zb3VyY2VTcGFuKSk7XG4gICAgICAgICAgbWF0Y2hlZFJlZmVyZW5jZXMuYWRkKGVsT3JEaXJSZWYubmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ldyBEaXJlY3RpdmVBc3QoZGlyZWN0aXZlLCBkaXJlY3RpdmVQcm9wZXJ0aWVzLCBob3N0UHJvcGVydGllcywgaG9zdEV2ZW50cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZVNwYW4pO1xuICAgIH0pO1xuICAgIGVsZW1lbnRPckRpcmVjdGl2ZVJlZnMuZm9yRWFjaCgoZWxPckRpclJlZikgPT4ge1xuICAgICAgaWYgKGVsT3JEaXJSZWYudmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAoIVNldFdyYXBwZXIuaGFzKG1hdGNoZWRSZWZlcmVuY2VzLCBlbE9yRGlyUmVmLm5hbWUpKSB7XG4gICAgICAgICAgdGhpcy5fcmVwb3J0RXJyb3IoYFRoZXJlIGlzIG5vIGRpcmVjdGl2ZSB3aXRoIFwiZXhwb3J0QXNcIiBzZXQgdG8gXCIke2VsT3JEaXJSZWYudmFsdWV9XCJgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsT3JEaXJSZWYuc291cmNlU3Bhbik7XG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKGlzQmxhbmsoY29tcG9uZW50KSkge1xuICAgICAgICB2YXIgcmVmVG9rZW4gPSBudWxsO1xuICAgICAgICBpZiAoaXNUZW1wbGF0ZUVsZW1lbnQpIHtcbiAgICAgICAgICByZWZUb2tlbiA9IGlkZW50aWZpZXJUb2tlbihJZGVudGlmaWVycy5UZW1wbGF0ZVJlZik7XG4gICAgICAgIH1cbiAgICAgICAgdGFyZ2V0UmVmZXJlbmNlcy5wdXNoKG5ldyBSZWZlcmVuY2VBc3QoZWxPckRpclJlZi5uYW1lLCByZWZUb2tlbiwgZWxPckRpclJlZi5zb3VyY2VTcGFuKSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGRpcmVjdGl2ZUFzdHM7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVEaXJlY3RpdmVIb3N0UHJvcGVydHlBc3RzKGVsZW1lbnROYW1lOiBzdHJpbmcsIGhvc3RQcm9wczoge1trZXk6IHN0cmluZ106IHN0cmluZ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFByb3BlcnR5QXN0czogQm91bmRFbGVtZW50UHJvcGVydHlBc3RbXSkge1xuICAgIGlmIChpc1ByZXNlbnQoaG9zdFByb3BzKSkge1xuICAgICAgU3RyaW5nTWFwV3JhcHBlci5mb3JFYWNoKGhvc3RQcm9wcywgKGV4cHJlc3Npb246IHN0cmluZywgcHJvcE5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICB2YXIgZXhwckFzdCA9IHRoaXMuX3BhcnNlQmluZGluZyhleHByZXNzaW9uLCBzb3VyY2VTcGFuKTtcbiAgICAgICAgdGFyZ2V0UHJvcGVydHlBc3RzLnB1c2goXG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVFbGVtZW50UHJvcGVydHlBc3QoZWxlbWVudE5hbWUsIHByb3BOYW1lLCBleHByQXN0LCBzb3VyY2VTcGFuKSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVEaXJlY3RpdmVIb3N0RXZlbnRBc3RzKGhvc3RMaXN0ZW5lcnM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRFdmVudEFzdHM6IEJvdW5kRXZlbnRBc3RbXSkge1xuICAgIGlmIChpc1ByZXNlbnQoaG9zdExpc3RlbmVycykpIHtcbiAgICAgIFN0cmluZ01hcFdyYXBwZXIuZm9yRWFjaChob3N0TGlzdGVuZXJzLCAoZXhwcmVzc2lvbjogc3RyaW5nLCBwcm9wTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICAgIHRoaXMuX3BhcnNlRXZlbnQocHJvcE5hbWUsIGV4cHJlc3Npb24sIHNvdXJjZVNwYW4sIFtdLCB0YXJnZXRFdmVudEFzdHMpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlRGlyZWN0aXZlUHJvcGVydHlBc3RzKGRpcmVjdGl2ZVByb3BlcnRpZXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm91bmRQcm9wczogQm91bmRFbGVtZW50T3JEaXJlY3RpdmVQcm9wZXJ0eVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Qm91bmREaXJlY3RpdmVQcm9wczogQm91bmREaXJlY3RpdmVQcm9wZXJ0eUFzdFtdKSB7XG4gICAgaWYgKGlzUHJlc2VudChkaXJlY3RpdmVQcm9wZXJ0aWVzKSkge1xuICAgICAgdmFyIGJvdW5kUHJvcHNCeU5hbWUgPSBuZXcgTWFwPHN0cmluZywgQm91bmRFbGVtZW50T3JEaXJlY3RpdmVQcm9wZXJ0eT4oKTtcbiAgICAgIGJvdW5kUHJvcHMuZm9yRWFjaChib3VuZFByb3AgPT4ge1xuICAgICAgICB2YXIgcHJldlZhbHVlID0gYm91bmRQcm9wc0J5TmFtZS5nZXQoYm91bmRQcm9wLm5hbWUpO1xuICAgICAgICBpZiAoaXNCbGFuayhwcmV2VmFsdWUpIHx8IHByZXZWYWx1ZS5pc0xpdGVyYWwpIHtcbiAgICAgICAgICAvLyBnaXZlIFthXT1cImJcIiBhIGhpZ2hlciBwcmVjZWRlbmNlIHRoYW4gYT1cImJcIiBvbiB0aGUgc2FtZSBlbGVtZW50XG4gICAgICAgICAgYm91bmRQcm9wc0J5TmFtZS5zZXQoYm91bmRQcm9wLm5hbWUsIGJvdW5kUHJvcCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2goZGlyZWN0aXZlUHJvcGVydGllcywgKGVsUHJvcDogc3RyaW5nLCBkaXJQcm9wOiBzdHJpbmcpID0+IHtcbiAgICAgICAgdmFyIGJvdW5kUHJvcCA9IGJvdW5kUHJvcHNCeU5hbWUuZ2V0KGVsUHJvcCk7XG5cbiAgICAgICAgLy8gQmluZGluZ3MgYXJlIG9wdGlvbmFsLCBzbyB0aGlzIGJpbmRpbmcgb25seSBuZWVkcyB0byBiZSBzZXQgdXAgaWYgYW4gZXhwcmVzc2lvbiBpcyBnaXZlbi5cbiAgICAgICAgaWYgKGlzUHJlc2VudChib3VuZFByb3ApKSB7XG4gICAgICAgICAgdGFyZ2V0Qm91bmREaXJlY3RpdmVQcm9wcy5wdXNoKG5ldyBCb3VuZERpcmVjdGl2ZVByb3BlcnR5QXN0KFxuICAgICAgICAgICAgICBkaXJQcm9wLCBib3VuZFByb3AubmFtZSwgYm91bmRQcm9wLmV4cHJlc3Npb24sIGJvdW5kUHJvcC5zb3VyY2VTcGFuKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUVsZW1lbnRQcm9wZXJ0eUFzdHMoZWxlbWVudE5hbWU6IHN0cmluZywgcHJvcHM6IEJvdW5kRWxlbWVudE9yRGlyZWN0aXZlUHJvcGVydHlbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBEaXJlY3RpdmVBc3RbXSk6IEJvdW5kRWxlbWVudFByb3BlcnR5QXN0W10ge1xuICAgIHZhciBib3VuZEVsZW1lbnRQcm9wczogQm91bmRFbGVtZW50UHJvcGVydHlBc3RbXSA9IFtdO1xuICAgIHZhciBib3VuZERpcmVjdGl2ZVByb3BzSW5kZXggPSBuZXcgTWFwPHN0cmluZywgQm91bmREaXJlY3RpdmVQcm9wZXJ0eUFzdD4oKTtcbiAgICBkaXJlY3RpdmVzLmZvckVhY2goKGRpcmVjdGl2ZTogRGlyZWN0aXZlQXN0KSA9PiB7XG4gICAgICBkaXJlY3RpdmUuaW5wdXRzLmZvckVhY2goKHByb3A6IEJvdW5kRGlyZWN0aXZlUHJvcGVydHlBc3QpID0+IHtcbiAgICAgICAgYm91bmREaXJlY3RpdmVQcm9wc0luZGV4LnNldChwcm9wLnRlbXBsYXRlTmFtZSwgcHJvcCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBwcm9wcy5mb3JFYWNoKChwcm9wOiBCb3VuZEVsZW1lbnRPckRpcmVjdGl2ZVByb3BlcnR5KSA9PiB7XG4gICAgICBpZiAoIXByb3AuaXNMaXRlcmFsICYmIGlzQmxhbmsoYm91bmREaXJlY3RpdmVQcm9wc0luZGV4LmdldChwcm9wLm5hbWUpKSkge1xuICAgICAgICBib3VuZEVsZW1lbnRQcm9wcy5wdXNoKHRoaXMuX2NyZWF0ZUVsZW1lbnRQcm9wZXJ0eUFzdChlbGVtZW50TmFtZSwgcHJvcC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wLmV4cHJlc3Npb24sIHByb3Auc291cmNlU3BhbikpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBib3VuZEVsZW1lbnRQcm9wcztcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUVsZW1lbnRQcm9wZXJ0eUFzdChlbGVtZW50TmFtZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGFzdDogQVNULFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKTogQm91bmRFbGVtZW50UHJvcGVydHlBc3Qge1xuICAgIHZhciB1bml0ID0gbnVsbDtcbiAgICB2YXIgYmluZGluZ1R5cGU7XG4gICAgdmFyIGJvdW5kUHJvcGVydHlOYW1lO1xuICAgIHZhciBwYXJ0cyA9IG5hbWUuc3BsaXQoUFJPUEVSVFlfUEFSVFNfU0VQQVJBVE9SKTtcbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAxKSB7XG4gICAgICBib3VuZFByb3BlcnR5TmFtZSA9IHRoaXMuX3NjaGVtYVJlZ2lzdHJ5LmdldE1hcHBlZFByb3BOYW1lKHBhcnRzWzBdKTtcbiAgICAgIGJpbmRpbmdUeXBlID0gUHJvcGVydHlCaW5kaW5nVHlwZS5Qcm9wZXJ0eTtcbiAgICAgIGlmICghdGhpcy5fc2NoZW1hUmVnaXN0cnkuaGFzUHJvcGVydHkoZWxlbWVudE5hbWUsIGJvdW5kUHJvcGVydHlOYW1lKSkge1xuICAgICAgICB0aGlzLl9yZXBvcnRFcnJvcihcbiAgICAgICAgICAgIGBDYW4ndCBiaW5kIHRvICcke2JvdW5kUHJvcGVydHlOYW1lfScgc2luY2UgaXQgaXNuJ3QgYSBrbm93biBuYXRpdmUgcHJvcGVydHlgLFxuICAgICAgICAgICAgc291cmNlU3Bhbik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwYXJ0c1swXSA9PSBBVFRSSUJVVEVfUFJFRklYKSB7XG4gICAgICAgIGJvdW5kUHJvcGVydHlOYW1lID0gcGFydHNbMV07XG4gICAgICAgIGxldCBuc1NlcGFyYXRvcklkeCA9IGJvdW5kUHJvcGVydHlOYW1lLmluZGV4T2YoJzonKTtcbiAgICAgICAgaWYgKG5zU2VwYXJhdG9ySWR4ID4gLTEpIHtcbiAgICAgICAgICBsZXQgbnMgPSBib3VuZFByb3BlcnR5TmFtZS5zdWJzdHJpbmcoMCwgbnNTZXBhcmF0b3JJZHgpO1xuICAgICAgICAgIGxldCBuYW1lID0gYm91bmRQcm9wZXJ0eU5hbWUuc3Vic3RyaW5nKG5zU2VwYXJhdG9ySWR4ICsgMSk7XG4gICAgICAgICAgYm91bmRQcm9wZXJ0eU5hbWUgPSBtZXJnZU5zQW5kTmFtZShucywgbmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgYmluZGluZ1R5cGUgPSBQcm9wZXJ0eUJpbmRpbmdUeXBlLkF0dHJpYnV0ZTtcbiAgICAgIH0gZWxzZSBpZiAocGFydHNbMF0gPT0gQ0xBU1NfUFJFRklYKSB7XG4gICAgICAgIGJvdW5kUHJvcGVydHlOYW1lID0gcGFydHNbMV07XG4gICAgICAgIGJpbmRpbmdUeXBlID0gUHJvcGVydHlCaW5kaW5nVHlwZS5DbGFzcztcbiAgICAgIH0gZWxzZSBpZiAocGFydHNbMF0gPT0gU1RZTEVfUFJFRklYKSB7XG4gICAgICAgIHVuaXQgPSBwYXJ0cy5sZW5ndGggPiAyID8gcGFydHNbMl0gOiBudWxsO1xuICAgICAgICBib3VuZFByb3BlcnR5TmFtZSA9IHBhcnRzWzFdO1xuICAgICAgICBiaW5kaW5nVHlwZSA9IFByb3BlcnR5QmluZGluZ1R5cGUuU3R5bGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9yZXBvcnRFcnJvcihgSW52YWxpZCBwcm9wZXJ0eSBuYW1lICcke25hbWV9J2AsIHNvdXJjZVNwYW4pO1xuICAgICAgICBiaW5kaW5nVHlwZSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBCb3VuZEVsZW1lbnRQcm9wZXJ0eUFzdChib3VuZFByb3BlcnR5TmFtZSwgYmluZGluZ1R5cGUsIGFzdCwgdW5pdCwgc291cmNlU3Bhbik7XG4gIH1cblxuXG4gIHByaXZhdGUgX2ZpbmRDb21wb25lbnREaXJlY3RpdmVOYW1lcyhkaXJlY3RpdmVzOiBEaXJlY3RpdmVBc3RbXSk6IHN0cmluZ1tdIHtcbiAgICB2YXIgY29tcG9uZW50VHlwZU5hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGRpcmVjdGl2ZXMuZm9yRWFjaChkaXJlY3RpdmUgPT4ge1xuICAgICAgdmFyIHR5cGVOYW1lID0gZGlyZWN0aXZlLmRpcmVjdGl2ZS50eXBlLm5hbWU7XG4gICAgICBpZiAoZGlyZWN0aXZlLmRpcmVjdGl2ZS5pc0NvbXBvbmVudCkge1xuICAgICAgICBjb21wb25lbnRUeXBlTmFtZXMucHVzaCh0eXBlTmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvbXBvbmVudFR5cGVOYW1lcztcbiAgfVxuXG4gIHByaXZhdGUgX2Fzc2VydE9ubHlPbmVDb21wb25lbnQoZGlyZWN0aXZlczogRGlyZWN0aXZlQXN0W10sIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbikge1xuICAgIHZhciBjb21wb25lbnRUeXBlTmFtZXMgPSB0aGlzLl9maW5kQ29tcG9uZW50RGlyZWN0aXZlTmFtZXMoZGlyZWN0aXZlcyk7XG4gICAgaWYgKGNvbXBvbmVudFR5cGVOYW1lcy5sZW5ndGggPiAxKSB7XG4gICAgICB0aGlzLl9yZXBvcnRFcnJvcihgTW9yZSB0aGFuIG9uZSBjb21wb25lbnQ6ICR7Y29tcG9uZW50VHlwZU5hbWVzLmpvaW4oJywnKX1gLCBzb3VyY2VTcGFuKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9hc3NlcnROb0NvbXBvbmVudHNOb3JFbGVtZW50QmluZGluZ3NPblRlbXBsYXRlKGRpcmVjdGl2ZXM6IERpcmVjdGl2ZUFzdFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRQcm9wczogQm91bmRFbGVtZW50UHJvcGVydHlBc3RbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pIHtcbiAgICB2YXIgY29tcG9uZW50VHlwZU5hbWVzOiBzdHJpbmdbXSA9IHRoaXMuX2ZpbmRDb21wb25lbnREaXJlY3RpdmVOYW1lcyhkaXJlY3RpdmVzKTtcbiAgICBpZiAoY29tcG9uZW50VHlwZU5hbWVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuX3JlcG9ydEVycm9yKGBDb21wb25lbnRzIG9uIGFuIGVtYmVkZGVkIHRlbXBsYXRlOiAke2NvbXBvbmVudFR5cGVOYW1lcy5qb2luKCcsJyl9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZVNwYW4pO1xuICAgIH1cbiAgICBlbGVtZW50UHJvcHMuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgIHRoaXMuX3JlcG9ydEVycm9yKFxuICAgICAgICAgIGBQcm9wZXJ0eSBiaW5kaW5nICR7cHJvcC5uYW1lfSBub3QgdXNlZCBieSBhbnkgZGlyZWN0aXZlIG9uIGFuIGVtYmVkZGVkIHRlbXBsYXRlYCxcbiAgICAgICAgICBzb3VyY2VTcGFuKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2Fzc2VydEFsbEV2ZW50c1B1Ymxpc2hlZEJ5RGlyZWN0aXZlcyhkaXJlY3RpdmVzOiBEaXJlY3RpdmVBc3RbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50czogQm91bmRFdmVudEFzdFtdKSB7XG4gICAgdmFyIGFsbERpcmVjdGl2ZUV2ZW50cyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgIGRpcmVjdGl2ZXMuZm9yRWFjaChkaXJlY3RpdmUgPT4ge1xuICAgICAgU3RyaW5nTWFwV3JhcHBlci5mb3JFYWNoKGRpcmVjdGl2ZS5kaXJlY3RpdmUub3V0cHV0cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZXZlbnROYW1lOiBzdHJpbmcsIF8pID0+IHsgYWxsRGlyZWN0aXZlRXZlbnRzLmFkZChldmVudE5hbWUpOyB9KTtcbiAgICB9KTtcbiAgICBldmVudHMuZm9yRWFjaChldmVudCA9PiB7XG4gICAgICBpZiAoaXNQcmVzZW50KGV2ZW50LnRhcmdldCkgfHwgIVNldFdyYXBwZXIuaGFzKGFsbERpcmVjdGl2ZUV2ZW50cywgZXZlbnQubmFtZSkpIHtcbiAgICAgICAgdGhpcy5fcmVwb3J0RXJyb3IoXG4gICAgICAgICAgICBgRXZlbnQgYmluZGluZyAke2V2ZW50LmZ1bGxOYW1lfSBub3QgZW1pdHRlZCBieSBhbnkgZGlyZWN0aXZlIG9uIGFuIGVtYmVkZGVkIHRlbXBsYXRlYCxcbiAgICAgICAgICAgIGV2ZW50LnNvdXJjZVNwYW4pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmNsYXNzIE5vbkJpbmRhYmxlVmlzaXRvciBpbXBsZW1lbnRzIEh0bWxBc3RWaXNpdG9yIHtcbiAgdmlzaXRFbGVtZW50KGFzdDogSHRtbEVsZW1lbnRBc3QsIHBhcmVudDogRWxlbWVudENvbnRleHQpOiBFbGVtZW50QXN0IHtcbiAgICB2YXIgcHJlcGFyc2VkRWxlbWVudCA9IHByZXBhcnNlRWxlbWVudChhc3QpO1xuICAgIGlmIChwcmVwYXJzZWRFbGVtZW50LnR5cGUgPT09IFByZXBhcnNlZEVsZW1lbnRUeXBlLlNDUklQVCB8fFxuICAgICAgICBwcmVwYXJzZWRFbGVtZW50LnR5cGUgPT09IFByZXBhcnNlZEVsZW1lbnRUeXBlLlNUWUxFIHx8XG4gICAgICAgIHByZXBhcnNlZEVsZW1lbnQudHlwZSA9PT0gUHJlcGFyc2VkRWxlbWVudFR5cGUuU1RZTEVTSEVFVCkge1xuICAgICAgLy8gU2tpcHBpbmcgPHNjcmlwdD4gZm9yIHNlY3VyaXR5IHJlYXNvbnNcbiAgICAgIC8vIFNraXBwaW5nIDxzdHlsZT4gYW5kIHN0eWxlc2hlZXRzIGFzIHdlIGFscmVhZHkgcHJvY2Vzc2VkIHRoZW1cbiAgICAgIC8vIGluIHRoZSBTdHlsZUNvbXBpbGVyXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgYXR0ck5hbWVBbmRWYWx1ZXMgPSBhc3QuYXR0cnMubWFwKGF0dHJBc3QgPT4gW2F0dHJBc3QubmFtZSwgYXR0ckFzdC52YWx1ZV0pO1xuICAgIHZhciBzZWxlY3RvciA9IGNyZWF0ZUVsZW1lbnRDc3NTZWxlY3Rvcihhc3QubmFtZSwgYXR0ck5hbWVBbmRWYWx1ZXMpO1xuICAgIHZhciBuZ0NvbnRlbnRJbmRleCA9IHBhcmVudC5maW5kTmdDb250ZW50SW5kZXgoc2VsZWN0b3IpO1xuICAgIHZhciBjaGlsZHJlbiA9IGh0bWxWaXNpdEFsbCh0aGlzLCBhc3QuY2hpbGRyZW4sIEVNUFRZX0VMRU1FTlRfQ09OVEVYVCk7XG4gICAgcmV0dXJuIG5ldyBFbGVtZW50QXN0KGFzdC5uYW1lLCBodG1sVmlzaXRBbGwodGhpcywgYXN0LmF0dHJzKSwgW10sIFtdLCBbXSwgW10sIFtdLCBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4sIG5nQ29udGVudEluZGV4LCBhc3Quc291cmNlU3Bhbik7XG4gIH1cbiAgdmlzaXRDb21tZW50KGFzdDogSHRtbENvbW1lbnRBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBudWxsOyB9XG4gIHZpc2l0QXR0cihhc3Q6IEh0bWxBdHRyQXN0LCBjb250ZXh0OiBhbnkpOiBBdHRyQXN0IHtcbiAgICByZXR1cm4gbmV3IEF0dHJBc3QoYXN0Lm5hbWUsIGFzdC52YWx1ZSwgYXN0LnNvdXJjZVNwYW4pO1xuICB9XG4gIHZpc2l0VGV4dChhc3Q6IEh0bWxUZXh0QXN0LCBwYXJlbnQ6IEVsZW1lbnRDb250ZXh0KTogVGV4dEFzdCB7XG4gICAgdmFyIG5nQ29udGVudEluZGV4ID0gcGFyZW50LmZpbmROZ0NvbnRlbnRJbmRleChURVhUX0NTU19TRUxFQ1RPUik7XG4gICAgcmV0dXJuIG5ldyBUZXh0QXN0KGFzdC52YWx1ZSwgbmdDb250ZW50SW5kZXgsIGFzdC5zb3VyY2VTcGFuKTtcbiAgfVxuICB2aXNpdEV4cGFuc2lvbihhc3Q6IEh0bWxFeHBhbnNpb25Bc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBhc3Q7IH1cbiAgdmlzaXRFeHBhbnNpb25DYXNlKGFzdDogSHRtbEV4cGFuc2lvbkNhc2VBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBhc3Q7IH1cbn1cblxuY2xhc3MgQm91bmRFbGVtZW50T3JEaXJlY3RpdmVQcm9wZXJ0eSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyBleHByZXNzaW9uOiBBU1QsIHB1YmxpYyBpc0xpdGVyYWw6IGJvb2xlYW4sXG4gICAgICAgICAgICAgIHB1YmxpYyBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pIHt9XG59XG5cbmNsYXNzIEVsZW1lbnRPckRpcmVjdGl2ZVJlZiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyB2YWx1ZTogc3RyaW5nLCBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3BsaXRDbGFzc2VzKGNsYXNzQXR0clZhbHVlOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gIHJldHVybiBTdHJpbmdXcmFwcGVyLnNwbGl0KGNsYXNzQXR0clZhbHVlLnRyaW0oKSwgL1xccysvZyk7XG59XG5cbmNsYXNzIEVsZW1lbnRDb250ZXh0IHtcbiAgc3RhdGljIGNyZWF0ZShpc1RlbXBsYXRlRWxlbWVudDogYm9vbGVhbiwgZGlyZWN0aXZlczogRGlyZWN0aXZlQXN0W10sXG4gICAgICAgICAgICAgICAgcHJvdmlkZXJDb250ZXh0OiBQcm92aWRlckVsZW1lbnRDb250ZXh0KTogRWxlbWVudENvbnRleHQge1xuICAgIHZhciBtYXRjaGVyID0gbmV3IFNlbGVjdG9yTWF0Y2hlcigpO1xuICAgIHZhciB3aWxkY2FyZE5nQ29udGVudEluZGV4ID0gbnVsbDtcbiAgICBpZiAoZGlyZWN0aXZlcy5sZW5ndGggPiAwICYmIGRpcmVjdGl2ZXNbMF0uZGlyZWN0aXZlLmlzQ29tcG9uZW50KSB7XG4gICAgICB2YXIgbmdDb250ZW50U2VsZWN0b3JzID0gZGlyZWN0aXZlc1swXS5kaXJlY3RpdmUudGVtcGxhdGUubmdDb250ZW50U2VsZWN0b3JzO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZ0NvbnRlbnRTZWxlY3RvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHNlbGVjdG9yID0gbmdDb250ZW50U2VsZWN0b3JzW2ldO1xuICAgICAgICBpZiAoU3RyaW5nV3JhcHBlci5lcXVhbHMoc2VsZWN0b3IsICcqJykpIHtcbiAgICAgICAgICB3aWxkY2FyZE5nQ29udGVudEluZGV4ID0gaTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtYXRjaGVyLmFkZFNlbGVjdGFibGVzKENzc1NlbGVjdG9yLnBhcnNlKG5nQ29udGVudFNlbGVjdG9yc1tpXSksIGkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXcgRWxlbWVudENvbnRleHQoaXNUZW1wbGF0ZUVsZW1lbnQsIG1hdGNoZXIsIHdpbGRjYXJkTmdDb250ZW50SW5kZXgsIHByb3ZpZGVyQ29udGV4dCk7XG4gIH1cbiAgY29uc3RydWN0b3IocHVibGljIGlzVGVtcGxhdGVFbGVtZW50OiBib29sZWFuLCBwcml2YXRlIF9uZ0NvbnRlbnRJbmRleE1hdGNoZXI6IFNlbGVjdG9yTWF0Y2hlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfd2lsZGNhcmROZ0NvbnRlbnRJbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgICBwdWJsaWMgcHJvdmlkZXJDb250ZXh0OiBQcm92aWRlckVsZW1lbnRDb250ZXh0KSB7fVxuXG4gIGZpbmROZ0NvbnRlbnRJbmRleChzZWxlY3RvcjogQ3NzU2VsZWN0b3IpOiBudW1iZXIge1xuICAgIHZhciBuZ0NvbnRlbnRJbmRpY2VzID0gW107XG4gICAgdGhpcy5fbmdDb250ZW50SW5kZXhNYXRjaGVyLm1hdGNoKFxuICAgICAgICBzZWxlY3RvciwgKHNlbGVjdG9yLCBuZ0NvbnRlbnRJbmRleCkgPT4geyBuZ0NvbnRlbnRJbmRpY2VzLnB1c2gobmdDb250ZW50SW5kZXgpOyB9KTtcbiAgICBMaXN0V3JhcHBlci5zb3J0KG5nQ29udGVudEluZGljZXMpO1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fd2lsZGNhcmROZ0NvbnRlbnRJbmRleCkpIHtcbiAgICAgIG5nQ29udGVudEluZGljZXMucHVzaCh0aGlzLl93aWxkY2FyZE5nQ29udGVudEluZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIG5nQ29udGVudEluZGljZXMubGVuZ3RoID4gMCA/IG5nQ29udGVudEluZGljZXNbMF0gOiBudWxsO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRDc3NTZWxlY3RvcihlbGVtZW50TmFtZTogc3RyaW5nLCBtYXRjaGFibGVBdHRyczogc3RyaW5nW11bXSk6IENzc1NlbGVjdG9yIHtcbiAgdmFyIGNzc1NlbGVjdG9yID0gbmV3IENzc1NlbGVjdG9yKCk7XG4gIGxldCBlbE5hbWVOb05zID0gc3BsaXROc05hbWUoZWxlbWVudE5hbWUpWzFdO1xuXG4gIGNzc1NlbGVjdG9yLnNldEVsZW1lbnQoZWxOYW1lTm9Ocyk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXRjaGFibGVBdHRycy5sZW5ndGg7IGkrKykge1xuICAgIGxldCBhdHRyTmFtZSA9IG1hdGNoYWJsZUF0dHJzW2ldWzBdO1xuICAgIGxldCBhdHRyTmFtZU5vTnMgPSBzcGxpdE5zTmFtZShhdHRyTmFtZSlbMV07XG4gICAgbGV0IGF0dHJWYWx1ZSA9IG1hdGNoYWJsZUF0dHJzW2ldWzFdO1xuXG4gICAgY3NzU2VsZWN0b3IuYWRkQXR0cmlidXRlKGF0dHJOYW1lTm9OcywgYXR0clZhbHVlKTtcbiAgICBpZiAoYXR0ck5hbWUudG9Mb3dlckNhc2UoKSA9PSBDTEFTU19BVFRSKSB7XG4gICAgICB2YXIgY2xhc3NlcyA9IHNwbGl0Q2xhc3NlcyhhdHRyVmFsdWUpO1xuICAgICAgY2xhc3Nlcy5mb3JFYWNoKGNsYXNzTmFtZSA9PiBjc3NTZWxlY3Rvci5hZGRDbGFzc05hbWUoY2xhc3NOYW1lKSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBjc3NTZWxlY3Rvcjtcbn1cblxudmFyIEVNUFRZX0VMRU1FTlRfQ09OVEVYVCA9IG5ldyBFbGVtZW50Q29udGV4dCh0cnVlLCBuZXcgU2VsZWN0b3JNYXRjaGVyKCksIG51bGwsIG51bGwpO1xudmFyIE5PTl9CSU5EQUJMRV9WSVNJVE9SID0gbmV3IE5vbkJpbmRhYmxlVmlzaXRvcigpO1xuXG5cbmV4cG9ydCBjbGFzcyBQaXBlQ29sbGVjdG9yIGV4dGVuZHMgUmVjdXJzaXZlQXN0VmlzaXRvciB7XG4gIHBpcGVzOiBTZXQ8c3RyaW5nPiA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICB2aXNpdFBpcGUoYXN0OiBCaW5kaW5nUGlwZSwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB0aGlzLnBpcGVzLmFkZChhc3QubmFtZSk7XG4gICAgYXN0LmV4cC52aXNpdCh0aGlzKTtcbiAgICB0aGlzLnZpc2l0QWxsKGFzdC5hcmdzLCBjb250ZXh0KTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVEdXBsaWNhdGVzKGl0ZW1zOiBDb21waWxlTWV0YWRhdGFXaXRoVHlwZVtdKTogQ29tcGlsZU1ldGFkYXRhV2l0aFR5cGVbXSB7XG4gIGxldCByZXMgPSBbXTtcbiAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICBsZXQgaGFzTWF0Y2ggPVxuICAgICAgICByZXMuZmlsdGVyKHIgPT4gci50eXBlLm5hbWUgPT0gaXRlbS50eXBlLm5hbWUgJiYgci50eXBlLm1vZHVsZVVybCA9PSBpdGVtLnR5cGUubW9kdWxlVXJsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICByLnR5cGUucnVudGltZSA9PSBpdGVtLnR5cGUucnVudGltZSlcbiAgICAgICAgICAgIC5sZW5ndGggPiAwO1xuICAgIGlmICghaGFzTWF0Y2gpIHtcbiAgICAgIHJlcy5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXM7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
