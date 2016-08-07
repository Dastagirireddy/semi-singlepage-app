System.register(['angular2/src/facade/collection', 'angular2/src/facade/lang', 'angular2/core', 'angular2/src/facade/exceptions', 'angular2/src/core/change_detection/change_detection', './html_parser', './html_tags', './parse_util', 'angular2/src/core/change_detection/parser/ast', './template_ast', 'angular2/src/compiler/selector', 'angular2/src/compiler/schema/element_schema_registry', './template_preparser', './style_url_resolver', './html_ast', './util'], function(exports_1, context_1) {
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
    var collection_1, lang_1, core_1, lang_2, exceptions_1, change_detection_1, html_parser_1, html_tags_1, parse_util_1, ast_1, template_ast_1, selector_1, element_schema_registry_1, template_preparser_1, style_url_resolver_1, html_ast_1, util_1;
    var BIND_NAME_REGEXP, TEMPLATE_ELEMENT, TEMPLATE_ATTR, TEMPLATE_ATTR_PREFIX, CLASS_ATTR, PROPERTY_PARTS_SEPARATOR, ATTRIBUTE_PREFIX, CLASS_PREFIX, STYLE_PREFIX, TEXT_CSS_SELECTOR, TEMPLATE_TRANSFORMS, TemplateParseError, TemplateParser, TemplateParseVisitor, NonBindableVisitor, BoundElementOrDirectiveProperty, Component, EMPTY_COMPONENT, NON_BINDABLE_VISITOR, PipeCollector;
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
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
                lang_2 = lang_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (change_detection_1_1) {
                change_detection_1 = change_detection_1_1;
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
            function (ast_1_1) {
                ast_1 = ast_1_1;
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
            }],
        execute: function() {
            // Group 1 = "bind-"
            // Group 2 = "var-" or "#"
            // Group 3 = "on-"
            // Group 4 = "bindon-"
            // Group 5 = the identifier after "bind-", "var-/#", or "on-"
            // Group 6 = identifier inside [()]
            // Group 7 = identifier inside []
            // Group 8 = identifier inside ()
            BIND_NAME_REGEXP = /^(?:(?:(?:(bind-)|(var-|#)|(on-)|(bindon-))(.+))|\[\(([^\)]+)\)\]|\[([^\]]+)\]|\(([^\)]+)\))$/g;
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
            exports_1("TEMPLATE_TRANSFORMS", TEMPLATE_TRANSFORMS = lang_2.CONST_EXPR(new core_1.OpaqueToken('TemplateTransforms')));
            TemplateParseError = (function (_super) {
                __extends(TemplateParseError, _super);
                function TemplateParseError(message, span) {
                    _super.call(this, span, message);
                }
                return TemplateParseError;
            }(parse_util_1.ParseError));
            exports_1("TemplateParseError", TemplateParseError);
            TemplateParser = (function () {
                function TemplateParser(_exprParser, _schemaRegistry, _htmlParser, transforms) {
                    this._exprParser = _exprParser;
                    this._schemaRegistry = _schemaRegistry;
                    this._htmlParser = _htmlParser;
                    this.transforms = transforms;
                }
                TemplateParser.prototype.parse = function (template, directives, pipes, templateUrl) {
                    var parseVisitor = new TemplateParseVisitor(directives, pipes, this._exprParser, this._schemaRegistry);
                    var htmlAstWithErrors = this._htmlParser.parse(template, templateUrl);
                    var result = html_ast_1.htmlVisitAll(parseVisitor, htmlAstWithErrors.rootNodes, EMPTY_COMPONENT);
                    var errors = htmlAstWithErrors.errors.concat(parseVisitor.errors);
                    if (errors.length > 0) {
                        var errorString = errors.join('\n');
                        throw new exceptions_1.BaseException("Template parse errors:\n" + errorString);
                    }
                    if (lang_1.isPresent(this.transforms)) {
                        this.transforms.forEach(function (transform) { result = template_ast_1.templateVisitAll(transform, result); });
                    }
                    return result;
                };
                TemplateParser = __decorate([
                    core_1.Injectable(),
                    __param(3, core_1.Optional()),
                    __param(3, core_1.Inject(TEMPLATE_TRANSFORMS)), 
                    __metadata('design:paramtypes', [change_detection_1.Parser, element_schema_registry_1.ElementSchemaRegistry, html_parser_1.HtmlParser, Array])
                ], TemplateParser);
                return TemplateParser;
            }());
            exports_1("TemplateParser", TemplateParser);
            TemplateParseVisitor = (function () {
                function TemplateParseVisitor(directives, pipes, _exprParser, _schemaRegistry) {
                    var _this = this;
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
                TemplateParseVisitor.prototype._reportError = function (message, sourceSpan) {
                    this.errors.push(new TemplateParseError(message, sourceSpan));
                };
                TemplateParseVisitor.prototype._parseInterpolation = function (value, sourceSpan) {
                    var sourceInfo = sourceSpan.start.toString();
                    try {
                        var ast = this._exprParser.parseInterpolation(value, sourceInfo);
                        this._checkPipes(ast, sourceSpan);
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
                        var bindings = this._exprParser.parseTemplateBindings(value, sourceInfo);
                        bindings.forEach(function (binding) {
                            if (lang_1.isPresent(binding.expression)) {
                                _this._checkPipes(binding.expression, sourceSpan);
                            }
                        });
                        return bindings;
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
                TemplateParseVisitor.prototype.visitText = function (ast, component) {
                    var ngContentIndex = component.findNgContentIndex(TEXT_CSS_SELECTOR);
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
                TemplateParseVisitor.prototype.visitElement = function (element, component) {
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
                    var vars = [];
                    var events = [];
                    var templateElementOrDirectiveProps = [];
                    var templateVars = [];
                    var templateMatchableAttrs = [];
                    var hasInlineTemplates = false;
                    var attrs = [];
                    element.attrs.forEach(function (attr) {
                        var hasBinding = _this._parseAttr(attr, matchableAttrs, elementOrDirectiveProps, events, vars);
                        var hasTemplateBinding = _this._parseInlineTemplateBinding(attr, templateMatchableAttrs, templateElementOrDirectiveProps, templateVars);
                        if (!hasBinding && !hasTemplateBinding) {
                            // don't include the bindings as attributes as well in the AST
                            attrs.push(_this.visitAttr(attr, null));
                            matchableAttrs.push([attr.name, attr.value]);
                        }
                        if (hasTemplateBinding) {
                            hasInlineTemplates = true;
                        }
                    });
                    var lcElName = html_tags_1.splitNsName(nodeName.toLowerCase())[1];
                    var isTemplateElement = lcElName == TEMPLATE_ELEMENT;
                    var elementCssSelector = createElementCssSelector(nodeName, matchableAttrs);
                    var directives = this._createDirectiveAsts(element.name, this._parseDirectives(this.selectorMatcher, elementCssSelector), elementOrDirectiveProps, isTemplateElement ? [] : vars, element.sourceSpan);
                    var elementProps = this._createElementPropertyAsts(element.name, elementOrDirectiveProps, directives);
                    var children = html_ast_1.htmlVisitAll(preparsedElement.nonBindable ? NON_BINDABLE_VISITOR : this, element.children, Component.create(directives));
                    // Override the actual selector when the `ngProjectAs` attribute is provided
                    var projectionSelector = lang_1.isPresent(preparsedElement.projectAs) ?
                        selector_1.CssSelector.parse(preparsedElement.projectAs)[0] :
                        elementCssSelector;
                    var ngContentIndex = component.findNgContentIndex(projectionSelector);
                    var parsedElement;
                    if (preparsedElement.type === template_preparser_1.PreparsedElementType.NG_CONTENT) {
                        if (lang_1.isPresent(element.children) && element.children.length > 0) {
                            this._reportError("<ng-content> element cannot have content. <ng-content> must be immediately followed by </ng-content>", element.sourceSpan);
                        }
                        parsedElement = new template_ast_1.NgContentAst(this.ngContentCount++, hasInlineTemplates ? null : ngContentIndex, element.sourceSpan);
                    }
                    else if (isTemplateElement) {
                        this._assertAllEventsPublishedByDirectives(directives, events);
                        this._assertNoComponentsNorElementBindingsOnTemplate(directives, elementProps, element.sourceSpan);
                        parsedElement =
                            new template_ast_1.EmbeddedTemplateAst(attrs, events, vars, directives, children, hasInlineTemplates ? null : ngContentIndex, element.sourceSpan);
                    }
                    else {
                        this._assertOnlyOneComponent(directives, element.sourceSpan);
                        var elementExportAsVars = vars.filter(function (varAst) { return varAst.value.length === 0; });
                        var ngContentIndex_1 = hasInlineTemplates ? null : component.findNgContentIndex(projectionSelector);
                        parsedElement =
                            new template_ast_1.ElementAst(nodeName, attrs, elementProps, events, elementExportAsVars, directives, children, hasInlineTemplates ? null : ngContentIndex_1, element.sourceSpan);
                    }
                    if (hasInlineTemplates) {
                        var templateCssSelector = createElementCssSelector(TEMPLATE_ELEMENT, templateMatchableAttrs);
                        var templateDirectives = this._createDirectiveAsts(element.name, this._parseDirectives(this.selectorMatcher, templateCssSelector), templateElementOrDirectiveProps, [], element.sourceSpan);
                        var templateElementProps = this._createElementPropertyAsts(element.name, templateElementOrDirectiveProps, templateDirectives);
                        this._assertNoComponentsNorElementBindingsOnTemplate(templateDirectives, templateElementProps, element.sourceSpan);
                        parsedElement = new template_ast_1.EmbeddedTemplateAst([], [], templateVars, templateDirectives, [parsedElement], ngContentIndex, element.sourceSpan);
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
                                targetMatchableAttrs.push([binding.key, binding.name]);
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
                TemplateParseVisitor.prototype._parseAttr = function (attr, targetMatchableAttrs, targetProps, targetEvents, targetVars) {
                    var attrName = this._normalizeAttributeName(attr.name);
                    var attrValue = attr.value;
                    var bindParts = lang_1.RegExpWrapper.firstMatch(BIND_NAME_REGEXP, attrName);
                    var hasBinding = false;
                    if (lang_1.isPresent(bindParts)) {
                        hasBinding = true;
                        if (lang_1.isPresent(bindParts[1])) {
                            this._parseProperty(bindParts[5], attrValue, attr.sourceSpan, targetMatchableAttrs, targetProps);
                        }
                        else if (lang_1.isPresent(bindParts[2])) {
                            var identifier = bindParts[5];
                            this._parseVariable(identifier, attrValue, attr.sourceSpan, targetVars);
                        }
                        else if (lang_1.isPresent(bindParts[3])) {
                            this._parseEvent(bindParts[5], attrValue, attr.sourceSpan, targetMatchableAttrs, targetEvents);
                        }
                        else if (lang_1.isPresent(bindParts[4])) {
                            this._parseProperty(bindParts[5], attrValue, attr.sourceSpan, targetMatchableAttrs, targetProps);
                            this._parseAssignmentEvent(bindParts[5], attrValue, attr.sourceSpan, targetMatchableAttrs, targetEvents);
                        }
                        else if (lang_1.isPresent(bindParts[6])) {
                            this._parseProperty(bindParts[6], attrValue, attr.sourceSpan, targetMatchableAttrs, targetProps);
                            this._parseAssignmentEvent(bindParts[6], attrValue, attr.sourceSpan, targetMatchableAttrs, targetEvents);
                        }
                        else if (lang_1.isPresent(bindParts[7])) {
                            this._parseProperty(bindParts[7], attrValue, attr.sourceSpan, targetMatchableAttrs, targetProps);
                        }
                        else if (lang_1.isPresent(bindParts[8])) {
                            this._parseEvent(bindParts[8], attrValue, attr.sourceSpan, targetMatchableAttrs, targetEvents);
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
                    var directives = [];
                    selectorMatcher.match(elementCssSelector, function (selector, directive) { directives.push(directive); });
                    // Need to sort the directives so that we get consistent results throughout,
                    // as selectorMatcher uses Maps inside.
                    // Also need to make components the first directive in the array
                    collection_1.ListWrapper.sort(directives, function (dir1, dir2) {
                        var dir1Comp = dir1.isComponent;
                        var dir2Comp = dir2.isComponent;
                        if (dir1Comp && !dir2Comp) {
                            return -1;
                        }
                        else if (!dir1Comp && dir2Comp) {
                            return 1;
                        }
                        else {
                            return _this.directivesIndex.get(dir1) - _this.directivesIndex.get(dir2);
                        }
                    });
                    return directives;
                };
                TemplateParseVisitor.prototype._createDirectiveAsts = function (elementName, directives, props, possibleExportAsVars, sourceSpan) {
                    var _this = this;
                    var matchedVariables = new Set();
                    var directiveAsts = directives.map(function (directive) {
                        var hostProperties = [];
                        var hostEvents = [];
                        var directiveProperties = [];
                        _this._createDirectiveHostPropertyAsts(elementName, directive.hostProperties, sourceSpan, hostProperties);
                        _this._createDirectiveHostEventAsts(directive.hostListeners, sourceSpan, hostEvents);
                        _this._createDirectivePropertyAsts(directive.inputs, props, directiveProperties);
                        var exportAsVars = [];
                        possibleExportAsVars.forEach(function (varAst) {
                            if ((varAst.value.length === 0 && directive.isComponent) ||
                                (directive.exportAs == varAst.value)) {
                                exportAsVars.push(varAst);
                                matchedVariables.add(varAst.name);
                            }
                        });
                        return new template_ast_1.DirectiveAst(directive, directiveProperties, hostProperties, hostEvents, exportAsVars, sourceSpan);
                    });
                    possibleExportAsVars.forEach(function (varAst) {
                        if (varAst.value.length > 0 && !collection_1.SetWrapper.has(matchedVariables, varAst.name)) {
                            _this._reportError("There is no directive with \"exportAs\" set to \"" + varAst.value + "\"", varAst.sourceSpan);
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
                NonBindableVisitor.prototype.visitElement = function (ast, component) {
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
                    var ngContentIndex = component.findNgContentIndex(selector);
                    var children = html_ast_1.htmlVisitAll(this, ast.children, EMPTY_COMPONENT);
                    return new template_ast_1.ElementAst(ast.name, html_ast_1.htmlVisitAll(this, ast.attrs), [], [], [], [], children, ngContentIndex, ast.sourceSpan);
                };
                NonBindableVisitor.prototype.visitComment = function (ast, context) { return null; };
                NonBindableVisitor.prototype.visitAttr = function (ast, context) {
                    return new template_ast_1.AttrAst(ast.name, ast.value, ast.sourceSpan);
                };
                NonBindableVisitor.prototype.visitText = function (ast, component) {
                    var ngContentIndex = component.findNgContentIndex(TEXT_CSS_SELECTOR);
                    return new template_ast_1.TextAst(ast.value, ngContentIndex, ast.sourceSpan);
                };
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
            Component = (function () {
                function Component(ngContentIndexMatcher, wildcardNgContentIndex) {
                    this.ngContentIndexMatcher = ngContentIndexMatcher;
                    this.wildcardNgContentIndex = wildcardNgContentIndex;
                }
                Component.create = function (directives) {
                    if (directives.length === 0 || !directives[0].directive.isComponent) {
                        return EMPTY_COMPONENT;
                    }
                    var matcher = new selector_1.SelectorMatcher();
                    var ngContentSelectors = directives[0].directive.template.ngContentSelectors;
                    var wildcardNgContentIndex = null;
                    for (var i = 0; i < ngContentSelectors.length; i++) {
                        var selector = ngContentSelectors[i];
                        if (lang_1.StringWrapper.equals(selector, '*')) {
                            wildcardNgContentIndex = i;
                        }
                        else {
                            matcher.addSelectables(selector_1.CssSelector.parse(ngContentSelectors[i]), i);
                        }
                    }
                    return new Component(matcher, wildcardNgContentIndex);
                };
                Component.prototype.findNgContentIndex = function (selector) {
                    var ngContentIndices = [];
                    this.ngContentIndexMatcher.match(selector, function (selector, ngContentIndex) { ngContentIndices.push(ngContentIndex); });
                    collection_1.ListWrapper.sort(ngContentIndices);
                    if (lang_1.isPresent(this.wildcardNgContentIndex)) {
                        ngContentIndices.push(this.wildcardNgContentIndex);
                    }
                    return ngContentIndices.length > 0 ? ngContentIndices[0] : null;
                };
                return Component;
            }());
            EMPTY_COMPONENT = new Component(new selector_1.SelectorMatcher(), null);
            NON_BINDABLE_VISITOR = new NonBindableVisitor();
            PipeCollector = (function (_super) {
                __extends(PipeCollector, _super);
                function PipeCollector() {
                    _super.apply(this, arguments);
                    this.pipes = new Set();
                }
                PipeCollector.prototype.visitPipe = function (ast) {
                    this.pipes.add(ast.name);
                    ast.exp.visit(this);
                    this.visitAll(ast.args);
                    return null;
                };
                return PipeCollector;
            }(ast_1.RecursiveAstVisitor));
            exports_1("PipeCollector", PipeCollector);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL3RlbXBsYXRlX3BhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUF5REksZ0JBQWdCLEVBR2QsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYixvQkFBb0IsRUFDcEIsVUFBVSxFQUVaLHdCQUF3QixFQUN0QixnQkFBZ0IsRUFDaEIsWUFBWSxFQUNaLFlBQVksRUFFZCxpQkFBaUIsRUFTUixtQkFBbUIsNEhBNnFCNUIsZUFBZSxFQUNmLG9CQUFvQjtJQTFEeEIsc0JBQTZCLGNBQXNCO1FBQ2pELE1BQU0sQ0FBQyxvQkFBYSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUZELHVDQUVDLENBQUE7SUFtQ0Qsa0NBQWtDLFdBQW1CLEVBQUUsY0FBMEI7UUFDL0UsSUFBSSxXQUFXLEdBQUcsSUFBSSxzQkFBVyxFQUFFLENBQUM7UUFDcEMsSUFBSSxVQUFVLEdBQUcsdUJBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU3QyxXQUFXLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRW5DLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQy9DLElBQUksUUFBUSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLFlBQVksR0FBRyx1QkFBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVDLElBQUksU0FBUyxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVyQyxXQUFXLENBQUMsWUFBWSxDQUFDLFlBQVks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SUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMzQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7b0JBQ3JELENBQUM7b0JBQ0QsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUNsRSxDQUFDO2dCQUNILGdCQUFDO1lBQUQsQ0EvQkEsQUErQkMsSUFBQTtZQXNCRyxlQUFlLEdBQUcsSUFBSSxTQUFTLENBQUMsSUFBSSwwQkFBZSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDN0Qsb0JBQW9CLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1lBR3BEO2dCQUFtQyxpQ0FBbUI7Z0JBQXREO29CQUFtQyw4QkFBbUI7b0JBQ3BELFVBQUssR0FBZ0IsSUFBSSxHQUFHLEVBQVUsQ0FBQztnQkFPekMsQ0FBQztnQkFOQyxpQ0FBUyxHQUFULFVBQVUsR0FBZ0I7b0JBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDekIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNkLENBQUM7Z0JBQ0gsb0JBQUM7WUFBRCxDQVJBLEFBUUMsQ0FSa0MseUJBQW1CLEdBUXJEO1lBUkQseUNBUUMsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci90ZW1wbGF0ZV9wYXJzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0xpc3RXcmFwcGVyLCBTdHJpbmdNYXBXcmFwcGVyLCBTZXRXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtSZWdFeHBXcmFwcGVyLCBpc1ByZXNlbnQsIFN0cmluZ1dyYXBwZXIsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0luamVjdGFibGUsIEluamVjdCwgT3BhcXVlVG9rZW4sIE9wdGlvbmFsfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Q09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7UGFyc2VyLCBBU1QsIEFTVFdpdGhTb3VyY2V9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdGlvbic7XG5pbXBvcnQge1RlbXBsYXRlQmluZGluZ30gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9wYXJzZXIvYXN0JztcbmltcG9ydCB7Q29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLCBDb21waWxlUGlwZU1ldGFkYXRhfSBmcm9tICcuL2RpcmVjdGl2ZV9tZXRhZGF0YSc7XG5pbXBvcnQge0h0bWxQYXJzZXJ9IGZyb20gJy4vaHRtbF9wYXJzZXInO1xuaW1wb3J0IHtzcGxpdE5zTmFtZSwgbWVyZ2VOc0FuZE5hbWV9IGZyb20gJy4vaHRtbF90YWdzJztcbmltcG9ydCB7UGFyc2VTb3VyY2VTcGFuLCBQYXJzZUVycm9yLCBQYXJzZUxvY2F0aW9ufSBmcm9tICcuL3BhcnNlX3V0aWwnO1xuaW1wb3J0IHtSZWN1cnNpdmVBc3RWaXNpdG9yLCBCaW5kaW5nUGlwZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9wYXJzZXIvYXN0JztcblxuaW1wb3J0IHtcbiAgRWxlbWVudEFzdCxcbiAgQm91bmRFbGVtZW50UHJvcGVydHlBc3QsXG4gIEJvdW5kRXZlbnRBc3QsXG4gIFZhcmlhYmxlQXN0LFxuICBUZW1wbGF0ZUFzdCxcbiAgVGVtcGxhdGVBc3RWaXNpdG9yLFxuICB0ZW1wbGF0ZVZpc2l0QWxsLFxuICBUZXh0QXN0LFxuICBCb3VuZFRleHRBc3QsXG4gIEVtYmVkZGVkVGVtcGxhdGVBc3QsXG4gIEF0dHJBc3QsXG4gIE5nQ29udGVudEFzdCxcbiAgUHJvcGVydHlCaW5kaW5nVHlwZSxcbiAgRGlyZWN0aXZlQXN0LFxuICBCb3VuZERpcmVjdGl2ZVByb3BlcnR5QXN0XG59IGZyb20gJy4vdGVtcGxhdGVfYXN0JztcbmltcG9ydCB7Q3NzU2VsZWN0b3IsIFNlbGVjdG9yTWF0Y2hlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3NlbGVjdG9yJztcblxuaW1wb3J0IHtFbGVtZW50U2NoZW1hUmVnaXN0cnl9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9zY2hlbWEvZWxlbWVudF9zY2hlbWFfcmVnaXN0cnknO1xuaW1wb3J0IHtwcmVwYXJzZUVsZW1lbnQsIFByZXBhcnNlZEVsZW1lbnQsIFByZXBhcnNlZEVsZW1lbnRUeXBlfSBmcm9tICcuL3RlbXBsYXRlX3ByZXBhcnNlcic7XG5cbmltcG9ydCB7aXNTdHlsZVVybFJlc29sdmFibGV9IGZyb20gJy4vc3R5bGVfdXJsX3Jlc29sdmVyJztcblxuaW1wb3J0IHtcbiAgSHRtbEFzdFZpc2l0b3IsXG4gIEh0bWxBc3QsXG4gIEh0bWxFbGVtZW50QXN0LFxuICBIdG1sQXR0ckFzdCxcbiAgSHRtbFRleHRBc3QsXG4gIEh0bWxDb21tZW50QXN0LFxuICBodG1sVmlzaXRBbGxcbn0gZnJvbSAnLi9odG1sX2FzdCc7XG5cbmltcG9ydCB7c3BsaXRBdENvbG9ufSBmcm9tICcuL3V0aWwnO1xuXG4vLyBHcm91cCAxID0gXCJiaW5kLVwiXG4vLyBHcm91cCAyID0gXCJ2YXItXCIgb3IgXCIjXCJcbi8vIEdyb3VwIDMgPSBcIm9uLVwiXG4vLyBHcm91cCA0ID0gXCJiaW5kb24tXCJcbi8vIEdyb3VwIDUgPSB0aGUgaWRlbnRpZmllciBhZnRlciBcImJpbmQtXCIsIFwidmFyLS8jXCIsIG9yIFwib24tXCJcbi8vIEdyb3VwIDYgPSBpZGVudGlmaWVyIGluc2lkZSBbKCldXG4vLyBHcm91cCA3ID0gaWRlbnRpZmllciBpbnNpZGUgW11cbi8vIEdyb3VwIDggPSBpZGVudGlmaWVyIGluc2lkZSAoKVxudmFyIEJJTkRfTkFNRV9SRUdFWFAgPVxuICAgIC9eKD86KD86KD86KGJpbmQtKXwodmFyLXwjKXwob24tKXwoYmluZG9uLSkpKC4rKSl8XFxbXFwoKFteXFwpXSspXFwpXFxdfFxcWyhbXlxcXV0rKVxcXXxcXCgoW15cXCldKylcXCkpJC9nO1xuXG5jb25zdCBURU1QTEFURV9FTEVNRU5UID0gJ3RlbXBsYXRlJztcbmNvbnN0IFRFTVBMQVRFX0FUVFIgPSAndGVtcGxhdGUnO1xuY29uc3QgVEVNUExBVEVfQVRUUl9QUkVGSVggPSAnKic7XG5jb25zdCBDTEFTU19BVFRSID0gJ2NsYXNzJztcblxudmFyIFBST1BFUlRZX1BBUlRTX1NFUEFSQVRPUiA9ICcuJztcbmNvbnN0IEFUVFJJQlVURV9QUkVGSVggPSAnYXR0cic7XG5jb25zdCBDTEFTU19QUkVGSVggPSAnY2xhc3MnO1xuY29uc3QgU1RZTEVfUFJFRklYID0gJ3N0eWxlJztcblxudmFyIFRFWFRfQ1NTX1NFTEVDVE9SID0gQ3NzU2VsZWN0b3IucGFyc2UoJyonKVswXTtcblxuLyoqXG4gKiBQcm92aWRlcyBhbiBhcnJheSBvZiB7QGxpbmsgVGVtcGxhdGVBc3RWaXNpdG9yfXMgd2hpY2ggd2lsbCBiZSB1c2VkIHRvIHRyYW5zZm9ybVxuICogcGFyc2VkIHRlbXBsYXRlcyBiZWZvcmUgY29tcGlsYXRpb24gaXMgaW52b2tlZCwgYWxsb3dpbmcgY3VzdG9tIGV4cHJlc3Npb24gc3ludGF4XG4gKiBhbmQgb3RoZXIgYWR2YW5jZWQgdHJhbnNmb3JtYXRpb25zLlxuICpcbiAqIFRoaXMgaXMgY3VycmVudGx5IGFuIGludGVybmFsLW9ubHkgZmVhdHVyZSBhbmQgbm90IG1lYW50IGZvciBnZW5lcmFsIHVzZS5cbiAqL1xuZXhwb3J0IGNvbnN0IFRFTVBMQVRFX1RSQU5TRk9STVMgPSBDT05TVF9FWFBSKG5ldyBPcGFxdWVUb2tlbignVGVtcGxhdGVUcmFuc2Zvcm1zJykpO1xuXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVQYXJzZUVycm9yIGV4dGVuZHMgUGFyc2VFcnJvciB7XG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZywgc3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7IHN1cGVyKHNwYW4sIG1lc3NhZ2UpOyB9XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZVBhcnNlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2V4cHJQYXJzZXI6IFBhcnNlciwgcHJpdmF0ZSBfc2NoZW1hUmVnaXN0cnk6IEVsZW1lbnRTY2hlbWFSZWdpc3RyeSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfaHRtbFBhcnNlcjogSHRtbFBhcnNlcixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChURU1QTEFURV9UUkFOU0ZPUk1TKSBwdWJsaWMgdHJhbnNmb3JtczogVGVtcGxhdGVBc3RWaXNpdG9yW10pIHt9XG5cbiAgcGFyc2UodGVtcGxhdGU6IHN0cmluZywgZGlyZWN0aXZlczogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhW10sIHBpcGVzOiBDb21waWxlUGlwZU1ldGFkYXRhW10sXG4gICAgICAgIHRlbXBsYXRlVXJsOiBzdHJpbmcpOiBUZW1wbGF0ZUFzdFtdIHtcbiAgICB2YXIgcGFyc2VWaXNpdG9yID1cbiAgICAgICAgbmV3IFRlbXBsYXRlUGFyc2VWaXNpdG9yKGRpcmVjdGl2ZXMsIHBpcGVzLCB0aGlzLl9leHByUGFyc2VyLCB0aGlzLl9zY2hlbWFSZWdpc3RyeSk7XG4gICAgdmFyIGh0bWxBc3RXaXRoRXJyb3JzID0gdGhpcy5faHRtbFBhcnNlci5wYXJzZSh0ZW1wbGF0ZSwgdGVtcGxhdGVVcmwpO1xuICAgIHZhciByZXN1bHQgPSBodG1sVmlzaXRBbGwocGFyc2VWaXNpdG9yLCBodG1sQXN0V2l0aEVycm9ycy5yb290Tm9kZXMsIEVNUFRZX0NPTVBPTkVOVCk7XG4gICAgdmFyIGVycm9yczogUGFyc2VFcnJvcltdID0gaHRtbEFzdFdpdGhFcnJvcnMuZXJyb3JzLmNvbmNhdChwYXJzZVZpc2l0b3IuZXJyb3JzKTtcbiAgICBpZiAoZXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICAgIHZhciBlcnJvclN0cmluZyA9IGVycm9ycy5qb2luKCdcXG4nKTtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBUZW1wbGF0ZSBwYXJzZSBlcnJvcnM6XFxuJHtlcnJvclN0cmluZ31gKTtcbiAgICB9XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLnRyYW5zZm9ybXMpKSB7XG4gICAgICB0aGlzLnRyYW5zZm9ybXMuZm9yRWFjaChcbiAgICAgICAgICAodHJhbnNmb3JtOiBUZW1wbGF0ZUFzdFZpc2l0b3IpID0+IHsgcmVzdWx0ID0gdGVtcGxhdGVWaXNpdEFsbCh0cmFuc2Zvcm0sIHJlc3VsdCk7IH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG5cbmNsYXNzIFRlbXBsYXRlUGFyc2VWaXNpdG9yIGltcGxlbWVudHMgSHRtbEFzdFZpc2l0b3Ige1xuICBzZWxlY3Rvck1hdGNoZXI6IFNlbGVjdG9yTWF0Y2hlcjtcbiAgZXJyb3JzOiBUZW1wbGF0ZVBhcnNlRXJyb3JbXSA9IFtdO1xuICBkaXJlY3RpdmVzSW5kZXggPSBuZXcgTWFwPENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSwgbnVtYmVyPigpO1xuICBuZ0NvbnRlbnRDb3VudDogbnVtYmVyID0gMDtcbiAgcGlwZXNCeU5hbWU6IE1hcDxzdHJpbmcsIENvbXBpbGVQaXBlTWV0YWRhdGE+O1xuXG4gIGNvbnN0cnVjdG9yKGRpcmVjdGl2ZXM6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YVtdLCBwaXBlczogQ29tcGlsZVBpcGVNZXRhZGF0YVtdLFxuICAgICAgICAgICAgICBwcml2YXRlIF9leHByUGFyc2VyOiBQYXJzZXIsIHByaXZhdGUgX3NjaGVtYVJlZ2lzdHJ5OiBFbGVtZW50U2NoZW1hUmVnaXN0cnkpIHtcbiAgICB0aGlzLnNlbGVjdG9yTWF0Y2hlciA9IG5ldyBTZWxlY3Rvck1hdGNoZXIoKTtcbiAgICBMaXN0V3JhcHBlci5mb3JFYWNoV2l0aEluZGV4KGRpcmVjdGl2ZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZGlyZWN0aXZlOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdG9yID0gQ3NzU2VsZWN0b3IucGFyc2UoZGlyZWN0aXZlLnNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rvck1hdGNoZXIuYWRkU2VsZWN0YWJsZXMoc2VsZWN0b3IsIGRpcmVjdGl2ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aXZlc0luZGV4LnNldChkaXJlY3RpdmUsIGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgIHRoaXMucGlwZXNCeU5hbWUgPSBuZXcgTWFwPHN0cmluZywgQ29tcGlsZVBpcGVNZXRhZGF0YT4oKTtcbiAgICBwaXBlcy5mb3JFYWNoKHBpcGUgPT4gdGhpcy5waXBlc0J5TmFtZS5zZXQocGlwZS5uYW1lLCBwaXBlKSk7XG4gIH1cblxuICBwcml2YXRlIF9yZXBvcnRFcnJvcihtZXNzYWdlOiBzdHJpbmcsIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbikge1xuICAgIHRoaXMuZXJyb3JzLnB1c2gobmV3IFRlbXBsYXRlUGFyc2VFcnJvcihtZXNzYWdlLCBzb3VyY2VTcGFuKSk7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZUludGVycG9sYXRpb24odmFsdWU6IHN0cmluZywgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKTogQVNUV2l0aFNvdXJjZSB7XG4gICAgdmFyIHNvdXJjZUluZm8gPSBzb3VyY2VTcGFuLnN0YXJ0LnRvU3RyaW5nKCk7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBhc3QgPSB0aGlzLl9leHByUGFyc2VyLnBhcnNlSW50ZXJwb2xhdGlvbih2YWx1ZSwgc291cmNlSW5mbyk7XG4gICAgICB0aGlzLl9jaGVja1BpcGVzKGFzdCwgc291cmNlU3Bhbik7XG4gICAgICByZXR1cm4gYXN0O1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMuX3JlcG9ydEVycm9yKGAke2V9YCwgc291cmNlU3Bhbik7XG4gICAgICByZXR1cm4gdGhpcy5fZXhwclBhcnNlci53cmFwTGl0ZXJhbFByaW1pdGl2ZSgnRVJST1InLCBzb3VyY2VJbmZvKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZUFjdGlvbih2YWx1ZTogc3RyaW5nLCBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pOiBBU1RXaXRoU291cmNlIHtcbiAgICB2YXIgc291cmNlSW5mbyA9IHNvdXJjZVNwYW4uc3RhcnQudG9TdHJpbmcoKTtcbiAgICB0cnkge1xuICAgICAgdmFyIGFzdCA9IHRoaXMuX2V4cHJQYXJzZXIucGFyc2VBY3Rpb24odmFsdWUsIHNvdXJjZUluZm8pO1xuICAgICAgdGhpcy5fY2hlY2tQaXBlcyhhc3QsIHNvdXJjZVNwYW4pO1xuICAgICAgcmV0dXJuIGFzdDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLl9yZXBvcnRFcnJvcihgJHtlfWAsIHNvdXJjZVNwYW4pO1xuICAgICAgcmV0dXJuIHRoaXMuX2V4cHJQYXJzZXIud3JhcExpdGVyYWxQcmltaXRpdmUoJ0VSUk9SJywgc291cmNlSW5mbyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VCaW5kaW5nKHZhbHVlOiBzdHJpbmcsIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbik6IEFTVFdpdGhTb3VyY2Uge1xuICAgIHZhciBzb3VyY2VJbmZvID0gc291cmNlU3Bhbi5zdGFydC50b1N0cmluZygpO1xuICAgIHRyeSB7XG4gICAgICB2YXIgYXN0ID0gdGhpcy5fZXhwclBhcnNlci5wYXJzZUJpbmRpbmcodmFsdWUsIHNvdXJjZUluZm8pO1xuICAgICAgdGhpcy5fY2hlY2tQaXBlcyhhc3QsIHNvdXJjZVNwYW4pO1xuICAgICAgcmV0dXJuIGFzdDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLl9yZXBvcnRFcnJvcihgJHtlfWAsIHNvdXJjZVNwYW4pO1xuICAgICAgcmV0dXJuIHRoaXMuX2V4cHJQYXJzZXIud3JhcExpdGVyYWxQcmltaXRpdmUoJ0VSUk9SJywgc291cmNlSW5mbyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VUZW1wbGF0ZUJpbmRpbmdzKHZhbHVlOiBzdHJpbmcsIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbik6IFRlbXBsYXRlQmluZGluZ1tdIHtcbiAgICB2YXIgc291cmNlSW5mbyA9IHNvdXJjZVNwYW4uc3RhcnQudG9TdHJpbmcoKTtcbiAgICB0cnkge1xuICAgICAgdmFyIGJpbmRpbmdzID0gdGhpcy5fZXhwclBhcnNlci5wYXJzZVRlbXBsYXRlQmluZGluZ3ModmFsdWUsIHNvdXJjZUluZm8pO1xuICAgICAgYmluZGluZ3MuZm9yRWFjaCgoYmluZGluZykgPT4ge1xuICAgICAgICBpZiAoaXNQcmVzZW50KGJpbmRpbmcuZXhwcmVzc2lvbikpIHtcbiAgICAgICAgICB0aGlzLl9jaGVja1BpcGVzKGJpbmRpbmcuZXhwcmVzc2lvbiwgc291cmNlU3Bhbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGJpbmRpbmdzO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMuX3JlcG9ydEVycm9yKGAke2V9YCwgc291cmNlU3Bhbik7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY2hlY2tQaXBlcyhhc3Q6IEFTVFdpdGhTb3VyY2UsIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbikge1xuICAgIGlmIChpc1ByZXNlbnQoYXN0KSkge1xuICAgICAgdmFyIGNvbGxlY3RvciA9IG5ldyBQaXBlQ29sbGVjdG9yKCk7XG4gICAgICBhc3QudmlzaXQoY29sbGVjdG9yKTtcbiAgICAgIGNvbGxlY3Rvci5waXBlcy5mb3JFYWNoKChwaXBlTmFtZSkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMucGlwZXNCeU5hbWUuaGFzKHBpcGVOYW1lKSkge1xuICAgICAgICAgIHRoaXMuX3JlcG9ydEVycm9yKGBUaGUgcGlwZSAnJHtwaXBlTmFtZX0nIGNvdWxkIG5vdCBiZSBmb3VuZGAsIHNvdXJjZVNwYW4pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICB2aXNpdFRleHQoYXN0OiBIdG1sVGV4dEFzdCwgY29tcG9uZW50OiBDb21wb25lbnQpOiBhbnkge1xuICAgIHZhciBuZ0NvbnRlbnRJbmRleCA9IGNvbXBvbmVudC5maW5kTmdDb250ZW50SW5kZXgoVEVYVF9DU1NfU0VMRUNUT1IpO1xuICAgIHZhciBleHByID0gdGhpcy5fcGFyc2VJbnRlcnBvbGF0aW9uKGFzdC52YWx1ZSwgYXN0LnNvdXJjZVNwYW4pO1xuICAgIGlmIChpc1ByZXNlbnQoZXhwcikpIHtcbiAgICAgIHJldHVybiBuZXcgQm91bmRUZXh0QXN0KGV4cHIsIG5nQ29udGVudEluZGV4LCBhc3Quc291cmNlU3Bhbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgVGV4dEFzdChhc3QudmFsdWUsIG5nQ29udGVudEluZGV4LCBhc3Quc291cmNlU3Bhbik7XG4gICAgfVxuICB9XG5cbiAgdmlzaXRBdHRyKGFzdDogSHRtbEF0dHJBc3QsIGNvbnRleDogYW55KTogYW55IHtcbiAgICByZXR1cm4gbmV3IEF0dHJBc3QoYXN0Lm5hbWUsIGFzdC52YWx1ZSwgYXN0LnNvdXJjZVNwYW4pO1xuICB9XG5cbiAgdmlzaXRDb21tZW50KGFzdDogSHRtbENvbW1lbnRBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBudWxsOyB9XG5cbiAgdmlzaXRFbGVtZW50KGVsZW1lbnQ6IEh0bWxFbGVtZW50QXN0LCBjb21wb25lbnQ6IENvbXBvbmVudCk6IGFueSB7XG4gICAgdmFyIG5vZGVOYW1lID0gZWxlbWVudC5uYW1lO1xuICAgIHZhciBwcmVwYXJzZWRFbGVtZW50ID0gcHJlcGFyc2VFbGVtZW50KGVsZW1lbnQpO1xuICAgIGlmIChwcmVwYXJzZWRFbGVtZW50LnR5cGUgPT09IFByZXBhcnNlZEVsZW1lbnRUeXBlLlNDUklQVCB8fFxuICAgICAgICBwcmVwYXJzZWRFbGVtZW50LnR5cGUgPT09IFByZXBhcnNlZEVsZW1lbnRUeXBlLlNUWUxFKSB7XG4gICAgICAvLyBTa2lwcGluZyA8c2NyaXB0PiBmb3Igc2VjdXJpdHkgcmVhc29uc1xuICAgICAgLy8gU2tpcHBpbmcgPHN0eWxlPiBhcyB3ZSBhbHJlYWR5IHByb2Nlc3NlZCB0aGVtXG4gICAgICAvLyBpbiB0aGUgU3R5bGVDb21waWxlclxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmIChwcmVwYXJzZWRFbGVtZW50LnR5cGUgPT09IFByZXBhcnNlZEVsZW1lbnRUeXBlLlNUWUxFU0hFRVQgJiZcbiAgICAgICAgaXNTdHlsZVVybFJlc29sdmFibGUocHJlcGFyc2VkRWxlbWVudC5ocmVmQXR0cikpIHtcbiAgICAgIC8vIFNraXBwaW5nIHN0eWxlc2hlZXRzIHdpdGggZWl0aGVyIHJlbGF0aXZlIHVybHMgb3IgcGFja2FnZSBzY2hlbWUgYXMgd2UgYWxyZWFkeSBwcm9jZXNzZWRcbiAgICAgIC8vIHRoZW0gaW4gdGhlIFN0eWxlQ29tcGlsZXJcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBtYXRjaGFibGVBdHRyczogc3RyaW5nW11bXSA9IFtdO1xuICAgIHZhciBlbGVtZW50T3JEaXJlY3RpdmVQcm9wczogQm91bmRFbGVtZW50T3JEaXJlY3RpdmVQcm9wZXJ0eVtdID0gW107XG4gICAgdmFyIHZhcnM6IFZhcmlhYmxlQXN0W10gPSBbXTtcbiAgICB2YXIgZXZlbnRzOiBCb3VuZEV2ZW50QXN0W10gPSBbXTtcblxuICAgIHZhciB0ZW1wbGF0ZUVsZW1lbnRPckRpcmVjdGl2ZVByb3BzOiBCb3VuZEVsZW1lbnRPckRpcmVjdGl2ZVByb3BlcnR5W10gPSBbXTtcbiAgICB2YXIgdGVtcGxhdGVWYXJzOiBWYXJpYWJsZUFzdFtdID0gW107XG4gICAgdmFyIHRlbXBsYXRlTWF0Y2hhYmxlQXR0cnM6IHN0cmluZ1tdW10gPSBbXTtcbiAgICB2YXIgaGFzSW5saW5lVGVtcGxhdGVzID0gZmFsc2U7XG4gICAgdmFyIGF0dHJzID0gW107XG5cbiAgICBlbGVtZW50LmF0dHJzLmZvckVhY2goYXR0ciA9PiB7XG4gICAgICB2YXIgaGFzQmluZGluZyA9IHRoaXMuX3BhcnNlQXR0cihhdHRyLCBtYXRjaGFibGVBdHRycywgZWxlbWVudE9yRGlyZWN0aXZlUHJvcHMsIGV2ZW50cywgdmFycyk7XG4gICAgICB2YXIgaGFzVGVtcGxhdGVCaW5kaW5nID0gdGhpcy5fcGFyc2VJbmxpbmVUZW1wbGF0ZUJpbmRpbmcoXG4gICAgICAgICAgYXR0ciwgdGVtcGxhdGVNYXRjaGFibGVBdHRycywgdGVtcGxhdGVFbGVtZW50T3JEaXJlY3RpdmVQcm9wcywgdGVtcGxhdGVWYXJzKTtcbiAgICAgIGlmICghaGFzQmluZGluZyAmJiAhaGFzVGVtcGxhdGVCaW5kaW5nKSB7XG4gICAgICAgIC8vIGRvbid0IGluY2x1ZGUgdGhlIGJpbmRpbmdzIGFzIGF0dHJpYnV0ZXMgYXMgd2VsbCBpbiB0aGUgQVNUXG4gICAgICAgIGF0dHJzLnB1c2godGhpcy52aXNpdEF0dHIoYXR0ciwgbnVsbCkpO1xuICAgICAgICBtYXRjaGFibGVBdHRycy5wdXNoKFthdHRyLm5hbWUsIGF0dHIudmFsdWVdKTtcbiAgICAgIH1cbiAgICAgIGlmIChoYXNUZW1wbGF0ZUJpbmRpbmcpIHtcbiAgICAgICAgaGFzSW5saW5lVGVtcGxhdGVzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBsY0VsTmFtZSA9IHNwbGl0TnNOYW1lKG5vZGVOYW1lLnRvTG93ZXJDYXNlKCkpWzFdO1xuICAgIHZhciBpc1RlbXBsYXRlRWxlbWVudCA9IGxjRWxOYW1lID09IFRFTVBMQVRFX0VMRU1FTlQ7XG4gICAgdmFyIGVsZW1lbnRDc3NTZWxlY3RvciA9IGNyZWF0ZUVsZW1lbnRDc3NTZWxlY3Rvcihub2RlTmFtZSwgbWF0Y2hhYmxlQXR0cnMpO1xuICAgIHZhciBkaXJlY3RpdmVzID0gdGhpcy5fY3JlYXRlRGlyZWN0aXZlQXN0cyhcbiAgICAgICAgZWxlbWVudC5uYW1lLCB0aGlzLl9wYXJzZURpcmVjdGl2ZXModGhpcy5zZWxlY3Rvck1hdGNoZXIsIGVsZW1lbnRDc3NTZWxlY3RvciksXG4gICAgICAgIGVsZW1lbnRPckRpcmVjdGl2ZVByb3BzLCBpc1RlbXBsYXRlRWxlbWVudCA/IFtdIDogdmFycywgZWxlbWVudC5zb3VyY2VTcGFuKTtcbiAgICB2YXIgZWxlbWVudFByb3BzOiBCb3VuZEVsZW1lbnRQcm9wZXJ0eUFzdFtdID1cbiAgICAgICAgdGhpcy5fY3JlYXRlRWxlbWVudFByb3BlcnR5QXN0cyhlbGVtZW50Lm5hbWUsIGVsZW1lbnRPckRpcmVjdGl2ZVByb3BzLCBkaXJlY3RpdmVzKTtcbiAgICB2YXIgY2hpbGRyZW4gPSBodG1sVmlzaXRBbGwocHJlcGFyc2VkRWxlbWVudC5ub25CaW5kYWJsZSA/IE5PTl9CSU5EQUJMRV9WSVNJVE9SIDogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jaGlsZHJlbiwgQ29tcG9uZW50LmNyZWF0ZShkaXJlY3RpdmVzKSk7XG5cbiAgICAvLyBPdmVycmlkZSB0aGUgYWN0dWFsIHNlbGVjdG9yIHdoZW4gdGhlIGBuZ1Byb2plY3RBc2AgYXR0cmlidXRlIGlzIHByb3ZpZGVkXG4gICAgdmFyIHByb2plY3Rpb25TZWxlY3RvciA9IGlzUHJlc2VudChwcmVwYXJzZWRFbGVtZW50LnByb2plY3RBcykgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ3NzU2VsZWN0b3IucGFyc2UocHJlcGFyc2VkRWxlbWVudC5wcm9qZWN0QXMpWzBdIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRDc3NTZWxlY3RvcjtcbiAgICB2YXIgbmdDb250ZW50SW5kZXggPSBjb21wb25lbnQuZmluZE5nQ29udGVudEluZGV4KHByb2plY3Rpb25TZWxlY3Rvcik7XG4gICAgdmFyIHBhcnNlZEVsZW1lbnQ7XG5cbiAgICBpZiAocHJlcGFyc2VkRWxlbWVudC50eXBlID09PSBQcmVwYXJzZWRFbGVtZW50VHlwZS5OR19DT05URU5UKSB7XG4gICAgICBpZiAoaXNQcmVzZW50KGVsZW1lbnQuY2hpbGRyZW4pICYmIGVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLl9yZXBvcnRFcnJvcihcbiAgICAgICAgICAgIGA8bmctY29udGVudD4gZWxlbWVudCBjYW5ub3QgaGF2ZSBjb250ZW50LiA8bmctY29udGVudD4gbXVzdCBiZSBpbW1lZGlhdGVseSBmb2xsb3dlZCBieSA8L25nLWNvbnRlbnQ+YCxcbiAgICAgICAgICAgIGVsZW1lbnQuc291cmNlU3Bhbik7XG4gICAgICB9XG5cbiAgICAgIHBhcnNlZEVsZW1lbnQgPSBuZXcgTmdDb250ZW50QXN0KFxuICAgICAgICAgIHRoaXMubmdDb250ZW50Q291bnQrKywgaGFzSW5saW5lVGVtcGxhdGVzID8gbnVsbCA6IG5nQ29udGVudEluZGV4LCBlbGVtZW50LnNvdXJjZVNwYW4pO1xuICAgIH0gZWxzZSBpZiAoaXNUZW1wbGF0ZUVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX2Fzc2VydEFsbEV2ZW50c1B1Ymxpc2hlZEJ5RGlyZWN0aXZlcyhkaXJlY3RpdmVzLCBldmVudHMpO1xuICAgICAgdGhpcy5fYXNzZXJ0Tm9Db21wb25lbnRzTm9yRWxlbWVudEJpbmRpbmdzT25UZW1wbGF0ZShkaXJlY3RpdmVzLCBlbGVtZW50UHJvcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc291cmNlU3Bhbik7XG5cbiAgICAgIHBhcnNlZEVsZW1lbnQgPVxuICAgICAgICAgIG5ldyBFbWJlZGRlZFRlbXBsYXRlQXN0KGF0dHJzLCBldmVudHMsIHZhcnMsIGRpcmVjdGl2ZXMsIGNoaWxkcmVuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0lubGluZVRlbXBsYXRlcyA/IG51bGwgOiBuZ0NvbnRlbnRJbmRleCwgZWxlbWVudC5zb3VyY2VTcGFuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYXNzZXJ0T25seU9uZUNvbXBvbmVudChkaXJlY3RpdmVzLCBlbGVtZW50LnNvdXJjZVNwYW4pO1xuICAgICAgdmFyIGVsZW1lbnRFeHBvcnRBc1ZhcnMgPSB2YXJzLmZpbHRlcih2YXJBc3QgPT4gdmFyQXN0LnZhbHVlLmxlbmd0aCA9PT0gMCk7XG4gICAgICBsZXQgbmdDb250ZW50SW5kZXggPVxuICAgICAgICAgIGhhc0lubGluZVRlbXBsYXRlcyA/IG51bGwgOiBjb21wb25lbnQuZmluZE5nQ29udGVudEluZGV4KHByb2plY3Rpb25TZWxlY3Rvcik7XG5cbiAgICAgIHBhcnNlZEVsZW1lbnQgPVxuICAgICAgICAgIG5ldyBFbGVtZW50QXN0KG5vZGVOYW1lLCBhdHRycywgZWxlbWVudFByb3BzLCBldmVudHMsIGVsZW1lbnRFeHBvcnRBc1ZhcnMsIGRpcmVjdGl2ZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4sIGhhc0lubGluZVRlbXBsYXRlcyA/IG51bGwgOiBuZ0NvbnRlbnRJbmRleCwgZWxlbWVudC5zb3VyY2VTcGFuKTtcbiAgICB9XG4gICAgaWYgKGhhc0lubGluZVRlbXBsYXRlcykge1xuICAgICAgdmFyIHRlbXBsYXRlQ3NzU2VsZWN0b3IgPSBjcmVhdGVFbGVtZW50Q3NzU2VsZWN0b3IoVEVNUExBVEVfRUxFTUVOVCwgdGVtcGxhdGVNYXRjaGFibGVBdHRycyk7XG4gICAgICB2YXIgdGVtcGxhdGVEaXJlY3RpdmVzID0gdGhpcy5fY3JlYXRlRGlyZWN0aXZlQXN0cyhcbiAgICAgICAgICBlbGVtZW50Lm5hbWUsIHRoaXMuX3BhcnNlRGlyZWN0aXZlcyh0aGlzLnNlbGVjdG9yTWF0Y2hlciwgdGVtcGxhdGVDc3NTZWxlY3RvciksXG4gICAgICAgICAgdGVtcGxhdGVFbGVtZW50T3JEaXJlY3RpdmVQcm9wcywgW10sIGVsZW1lbnQuc291cmNlU3Bhbik7XG4gICAgICB2YXIgdGVtcGxhdGVFbGVtZW50UHJvcHM6IEJvdW5kRWxlbWVudFByb3BlcnR5QXN0W10gPSB0aGlzLl9jcmVhdGVFbGVtZW50UHJvcGVydHlBc3RzKFxuICAgICAgICAgIGVsZW1lbnQubmFtZSwgdGVtcGxhdGVFbGVtZW50T3JEaXJlY3RpdmVQcm9wcywgdGVtcGxhdGVEaXJlY3RpdmVzKTtcbiAgICAgIHRoaXMuX2Fzc2VydE5vQ29tcG9uZW50c05vckVsZW1lbnRCaW5kaW5nc09uVGVtcGxhdGUodGVtcGxhdGVEaXJlY3RpdmVzLCB0ZW1wbGF0ZUVsZW1lbnRQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zb3VyY2VTcGFuKTtcblxuICAgICAgcGFyc2VkRWxlbWVudCA9IG5ldyBFbWJlZGRlZFRlbXBsYXRlQXN0KFtdLCBbXSwgdGVtcGxhdGVWYXJzLCB0ZW1wbGF0ZURpcmVjdGl2ZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3BhcnNlZEVsZW1lbnRdLCBuZ0NvbnRlbnRJbmRleCwgZWxlbWVudC5zb3VyY2VTcGFuKTtcbiAgICB9XG4gICAgcmV0dXJuIHBhcnNlZEVsZW1lbnQ7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZUlubGluZVRlbXBsYXRlQmluZGluZyhhdHRyOiBIdG1sQXR0ckFzdCwgdGFyZ2V0TWF0Y2hhYmxlQXR0cnM6IHN0cmluZ1tdW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFByb3BzOiBCb3VuZEVsZW1lbnRPckRpcmVjdGl2ZVByb3BlcnR5W10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFZhcnM6IFZhcmlhYmxlQXN0W10pOiBib29sZWFuIHtcbiAgICB2YXIgdGVtcGxhdGVCaW5kaW5nc1NvdXJjZSA9IG51bGw7XG4gICAgaWYgKGF0dHIubmFtZSA9PSBURU1QTEFURV9BVFRSKSB7XG4gICAgICB0ZW1wbGF0ZUJpbmRpbmdzU291cmNlID0gYXR0ci52YWx1ZTtcbiAgICB9IGVsc2UgaWYgKGF0dHIubmFtZS5zdGFydHNXaXRoKFRFTVBMQVRFX0FUVFJfUFJFRklYKSkge1xuICAgICAgdmFyIGtleSA9IGF0dHIubmFtZS5zdWJzdHJpbmcoVEVNUExBVEVfQVRUUl9QUkVGSVgubGVuZ3RoKTsgIC8vIHJlbW92ZSB0aGUgc3RhclxuICAgICAgdGVtcGxhdGVCaW5kaW5nc1NvdXJjZSA9IChhdHRyLnZhbHVlLmxlbmd0aCA9PSAwKSA/IGtleSA6IGtleSArICcgJyArIGF0dHIudmFsdWU7XG4gICAgfVxuICAgIGlmIChpc1ByZXNlbnQodGVtcGxhdGVCaW5kaW5nc1NvdXJjZSkpIHtcbiAgICAgIHZhciBiaW5kaW5ncyA9IHRoaXMuX3BhcnNlVGVtcGxhdGVCaW5kaW5ncyh0ZW1wbGF0ZUJpbmRpbmdzU291cmNlLCBhdHRyLnNvdXJjZVNwYW4pO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiaW5kaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYmluZGluZyA9IGJpbmRpbmdzW2ldO1xuICAgICAgICBpZiAoYmluZGluZy5rZXlJc1Zhcikge1xuICAgICAgICAgIHRhcmdldFZhcnMucHVzaChuZXcgVmFyaWFibGVBc3QoYmluZGluZy5rZXksIGJpbmRpbmcubmFtZSwgYXR0ci5zb3VyY2VTcGFuKSk7XG4gICAgICAgICAgdGFyZ2V0TWF0Y2hhYmxlQXR0cnMucHVzaChbYmluZGluZy5rZXksIGJpbmRpbmcubmFtZV0pO1xuICAgICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudChiaW5kaW5nLmV4cHJlc3Npb24pKSB7XG4gICAgICAgICAgdGhpcy5fcGFyc2VQcm9wZXJ0eUFzdChiaW5kaW5nLmtleSwgYmluZGluZy5leHByZXNzaW9uLCBhdHRyLnNvdXJjZVNwYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRNYXRjaGFibGVBdHRycywgdGFyZ2V0UHJvcHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhcmdldE1hdGNoYWJsZUF0dHJzLnB1c2goW2JpbmRpbmcua2V5LCAnJ10pO1xuICAgICAgICAgIHRoaXMuX3BhcnNlTGl0ZXJhbEF0dHIoYmluZGluZy5rZXksIG51bGwsIGF0dHIuc291cmNlU3BhbiwgdGFyZ2V0UHJvcHMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VBdHRyKGF0dHI6IEh0bWxBdHRyQXN0LCB0YXJnZXRNYXRjaGFibGVBdHRyczogc3RyaW5nW11bXSxcbiAgICAgICAgICAgICAgICAgICAgIHRhcmdldFByb3BzOiBCb3VuZEVsZW1lbnRPckRpcmVjdGl2ZVByb3BlcnR5W10sIHRhcmdldEV2ZW50czogQm91bmRFdmVudEFzdFtdLFxuICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0VmFyczogVmFyaWFibGVBc3RbXSk6IGJvb2xlYW4ge1xuICAgIHZhciBhdHRyTmFtZSA9IHRoaXMuX25vcm1hbGl6ZUF0dHJpYnV0ZU5hbWUoYXR0ci5uYW1lKTtcbiAgICB2YXIgYXR0clZhbHVlID0gYXR0ci52YWx1ZTtcbiAgICB2YXIgYmluZFBhcnRzID0gUmVnRXhwV3JhcHBlci5maXJzdE1hdGNoKEJJTkRfTkFNRV9SRUdFWFAsIGF0dHJOYW1lKTtcbiAgICB2YXIgaGFzQmluZGluZyA9IGZhbHNlO1xuICAgIGlmIChpc1ByZXNlbnQoYmluZFBhcnRzKSkge1xuICAgICAgaGFzQmluZGluZyA9IHRydWU7XG4gICAgICBpZiAoaXNQcmVzZW50KGJpbmRQYXJ0c1sxXSkpIHsgIC8vIG1hdGNoOiBiaW5kLXByb3BcbiAgICAgICAgdGhpcy5fcGFyc2VQcm9wZXJ0eShiaW5kUGFydHNbNV0sIGF0dHJWYWx1ZSwgYXR0ci5zb3VyY2VTcGFuLCB0YXJnZXRNYXRjaGFibGVBdHRycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRQcm9wcyk7XG5cbiAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KFxuICAgICAgICAgICAgICAgICAgICAgYmluZFBhcnRzWzJdKSkgeyAgLy8gbWF0Y2g6IHZhci1uYW1lIC8gdmFyLW5hbWU9XCJpZGVuXCIgLyAjbmFtZSAvICNuYW1lPVwiaWRlblwiXG4gICAgICAgIHZhciBpZGVudGlmaWVyID0gYmluZFBhcnRzWzVdO1xuICAgICAgICB0aGlzLl9wYXJzZVZhcmlhYmxlKGlkZW50aWZpZXIsIGF0dHJWYWx1ZSwgYXR0ci5zb3VyY2VTcGFuLCB0YXJnZXRWYXJzKTtcblxuICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQoYmluZFBhcnRzWzNdKSkgeyAgLy8gbWF0Y2g6IG9uLWV2ZW50XG4gICAgICAgIHRoaXMuX3BhcnNlRXZlbnQoYmluZFBhcnRzWzVdLCBhdHRyVmFsdWUsIGF0dHIuc291cmNlU3BhbiwgdGFyZ2V0TWF0Y2hhYmxlQXR0cnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RXZlbnRzKTtcblxuICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQoYmluZFBhcnRzWzRdKSkgeyAgLy8gbWF0Y2g6IGJpbmRvbi1wcm9wXG4gICAgICAgIHRoaXMuX3BhcnNlUHJvcGVydHkoYmluZFBhcnRzWzVdLCBhdHRyVmFsdWUsIGF0dHIuc291cmNlU3BhbiwgdGFyZ2V0TWF0Y2hhYmxlQXR0cnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UHJvcHMpO1xuICAgICAgICB0aGlzLl9wYXJzZUFzc2lnbm1lbnRFdmVudChiaW5kUGFydHNbNV0sIGF0dHJWYWx1ZSwgYXR0ci5zb3VyY2VTcGFuLCB0YXJnZXRNYXRjaGFibGVBdHRycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RXZlbnRzKTtcblxuICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQoYmluZFBhcnRzWzZdKSkgeyAgLy8gbWF0Y2g6IFsoZXhwcildXG4gICAgICAgIHRoaXMuX3BhcnNlUHJvcGVydHkoYmluZFBhcnRzWzZdLCBhdHRyVmFsdWUsIGF0dHIuc291cmNlU3BhbiwgdGFyZ2V0TWF0Y2hhYmxlQXR0cnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UHJvcHMpO1xuICAgICAgICB0aGlzLl9wYXJzZUFzc2lnbm1lbnRFdmVudChiaW5kUGFydHNbNl0sIGF0dHJWYWx1ZSwgYXR0ci5zb3VyY2VTcGFuLCB0YXJnZXRNYXRjaGFibGVBdHRycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RXZlbnRzKTtcblxuICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQoYmluZFBhcnRzWzddKSkgeyAgLy8gbWF0Y2g6IFtleHByXVxuICAgICAgICB0aGlzLl9wYXJzZVByb3BlcnR5KGJpbmRQYXJ0c1s3XSwgYXR0clZhbHVlLCBhdHRyLnNvdXJjZVNwYW4sIHRhcmdldE1hdGNoYWJsZUF0dHJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFByb3BzKTtcblxuICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQoYmluZFBhcnRzWzhdKSkgeyAgLy8gbWF0Y2g6IChldmVudClcbiAgICAgICAgdGhpcy5fcGFyc2VFdmVudChiaW5kUGFydHNbOF0sIGF0dHJWYWx1ZSwgYXR0ci5zb3VyY2VTcGFuLCB0YXJnZXRNYXRjaGFibGVBdHRycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRFdmVudHMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBoYXNCaW5kaW5nID0gdGhpcy5fcGFyc2VQcm9wZXJ0eUludGVycG9sYXRpb24oYXR0ck5hbWUsIGF0dHJWYWx1ZSwgYXR0ci5zb3VyY2VTcGFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldE1hdGNoYWJsZUF0dHJzLCB0YXJnZXRQcm9wcyk7XG4gICAgfVxuICAgIGlmICghaGFzQmluZGluZykge1xuICAgICAgdGhpcy5fcGFyc2VMaXRlcmFsQXR0cihhdHRyTmFtZSwgYXR0clZhbHVlLCBhdHRyLnNvdXJjZVNwYW4sIHRhcmdldFByb3BzKTtcbiAgICB9XG4gICAgcmV0dXJuIGhhc0JpbmRpbmc7XG4gIH1cblxuICBwcml2YXRlIF9ub3JtYWxpemVBdHRyaWJ1dGVOYW1lKGF0dHJOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBhdHRyTmFtZS50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoJ2RhdGEtJykgPyBhdHRyTmFtZS5zdWJzdHJpbmcoNSkgOiBhdHRyTmFtZTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlVmFyaWFibGUoaWRlbnRpZmllcjogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0VmFyczogVmFyaWFibGVBc3RbXSkge1xuICAgIGlmIChpZGVudGlmaWVyLmluZGV4T2YoJy0nKSA+IC0xKSB7XG4gICAgICB0aGlzLl9yZXBvcnRFcnJvcihgXCItXCIgaXMgbm90IGFsbG93ZWQgaW4gdmFyaWFibGUgbmFtZXNgLCBzb3VyY2VTcGFuKTtcbiAgICB9XG4gICAgdGFyZ2V0VmFycy5wdXNoKG5ldyBWYXJpYWJsZUFzdChpZGVudGlmaWVyLCB2YWx1ZSwgc291cmNlU3BhbikpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VQcm9wZXJ0eShuYW1lOiBzdHJpbmcsIGV4cHJlc3Npb246IHN0cmluZywgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldE1hdGNoYWJsZUF0dHJzOiBzdHJpbmdbXVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFByb3BzOiBCb3VuZEVsZW1lbnRPckRpcmVjdGl2ZVByb3BlcnR5W10pIHtcbiAgICB0aGlzLl9wYXJzZVByb3BlcnR5QXN0KG5hbWUsIHRoaXMuX3BhcnNlQmluZGluZyhleHByZXNzaW9uLCBzb3VyY2VTcGFuKSwgc291cmNlU3BhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldE1hdGNoYWJsZUF0dHJzLCB0YXJnZXRQcm9wcyk7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVByb3BlcnR5SW50ZXJwb2xhdGlvbihuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TWF0Y2hhYmxlQXR0cnM6IHN0cmluZ1tdW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFByb3BzOiBCb3VuZEVsZW1lbnRPckRpcmVjdGl2ZVByb3BlcnR5W10pOiBib29sZWFuIHtcbiAgICB2YXIgZXhwciA9IHRoaXMuX3BhcnNlSW50ZXJwb2xhdGlvbih2YWx1ZSwgc291cmNlU3Bhbik7XG4gICAgaWYgKGlzUHJlc2VudChleHByKSkge1xuICAgICAgdGhpcy5fcGFyc2VQcm9wZXJ0eUFzdChuYW1lLCBleHByLCBzb3VyY2VTcGFuLCB0YXJnZXRNYXRjaGFibGVBdHRycywgdGFyZ2V0UHJvcHMpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlUHJvcGVydHlBc3QobmFtZTogc3RyaW5nLCBhc3Q6IEFTVFdpdGhTb3VyY2UsIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRNYXRjaGFibGVBdHRyczogc3RyaW5nW11bXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRQcm9wczogQm91bmRFbGVtZW50T3JEaXJlY3RpdmVQcm9wZXJ0eVtdKSB7XG4gICAgdGFyZ2V0TWF0Y2hhYmxlQXR0cnMucHVzaChbbmFtZSwgYXN0LnNvdXJjZV0pO1xuICAgIHRhcmdldFByb3BzLnB1c2gobmV3IEJvdW5kRWxlbWVudE9yRGlyZWN0aXZlUHJvcGVydHkobmFtZSwgYXN0LCBmYWxzZSwgc291cmNlU3BhbikpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VBc3NpZ25tZW50RXZlbnQobmFtZTogc3RyaW5nLCBleHByZXNzaW9uOiBzdHJpbmcsIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TWF0Y2hhYmxlQXR0cnM6IHN0cmluZ1tdW10sIHRhcmdldEV2ZW50czogQm91bmRFdmVudEFzdFtdKSB7XG4gICAgdGhpcy5fcGFyc2VFdmVudChgJHtuYW1lfUNoYW5nZWAsIGAke2V4cHJlc3Npb259PSRldmVudGAsIHNvdXJjZVNwYW4sIHRhcmdldE1hdGNoYWJsZUF0dHJzLFxuICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RXZlbnRzKTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlRXZlbnQobmFtZTogc3RyaW5nLCBleHByZXNzaW9uOiBzdHJpbmcsIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbixcbiAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRNYXRjaGFibGVBdHRyczogc3RyaW5nW11bXSwgdGFyZ2V0RXZlbnRzOiBCb3VuZEV2ZW50QXN0W10pIHtcbiAgICAvLyBsb25nIGZvcm1hdDogJ3RhcmdldDogZXZlbnROYW1lJ1xuICAgIHZhciBwYXJ0cyA9IHNwbGl0QXRDb2xvbihuYW1lLCBbbnVsbCwgbmFtZV0pO1xuICAgIHZhciB0YXJnZXQgPSBwYXJ0c1swXTtcbiAgICB2YXIgZXZlbnROYW1lID0gcGFydHNbMV07XG4gICAgdmFyIGFzdCA9IHRoaXMuX3BhcnNlQWN0aW9uKGV4cHJlc3Npb24sIHNvdXJjZVNwYW4pO1xuICAgIHRhcmdldE1hdGNoYWJsZUF0dHJzLnB1c2goW25hbWUsIGFzdC5zb3VyY2VdKTtcbiAgICB0YXJnZXRFdmVudHMucHVzaChuZXcgQm91bmRFdmVudEFzdChldmVudE5hbWUsIHRhcmdldCwgYXN0LCBzb3VyY2VTcGFuKSk7XG4gICAgLy8gRG9uJ3QgZGV0ZWN0IGRpcmVjdGl2ZXMgZm9yIGV2ZW50IG5hbWVzIGZvciBub3csXG4gICAgLy8gc28gZG9uJ3QgYWRkIHRoZSBldmVudCBuYW1lIHRvIHRoZSBtYXRjaGFibGVBdHRyc1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VMaXRlcmFsQXR0cihuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRQcm9wczogQm91bmRFbGVtZW50T3JEaXJlY3RpdmVQcm9wZXJ0eVtdKSB7XG4gICAgdGFyZ2V0UHJvcHMucHVzaChuZXcgQm91bmRFbGVtZW50T3JEaXJlY3RpdmVQcm9wZXJ0eShcbiAgICAgICAgbmFtZSwgdGhpcy5fZXhwclBhcnNlci53cmFwTGl0ZXJhbFByaW1pdGl2ZSh2YWx1ZSwgJycpLCB0cnVlLCBzb3VyY2VTcGFuKSk7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZURpcmVjdGl2ZXMoc2VsZWN0b3JNYXRjaGVyOiBTZWxlY3Rvck1hdGNoZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50Q3NzU2VsZWN0b3I6IENzc1NlbGVjdG9yKTogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhW10ge1xuICAgIHZhciBkaXJlY3RpdmVzID0gW107XG4gICAgc2VsZWN0b3JNYXRjaGVyLm1hdGNoKGVsZW1lbnRDc3NTZWxlY3RvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKHNlbGVjdG9yLCBkaXJlY3RpdmUpID0+IHsgZGlyZWN0aXZlcy5wdXNoKGRpcmVjdGl2ZSk7IH0pO1xuICAgIC8vIE5lZWQgdG8gc29ydCB0aGUgZGlyZWN0aXZlcyBzbyB0aGF0IHdlIGdldCBjb25zaXN0ZW50IHJlc3VsdHMgdGhyb3VnaG91dCxcbiAgICAvLyBhcyBzZWxlY3Rvck1hdGNoZXIgdXNlcyBNYXBzIGluc2lkZS5cbiAgICAvLyBBbHNvIG5lZWQgdG8gbWFrZSBjb21wb25lbnRzIHRoZSBmaXJzdCBkaXJlY3RpdmUgaW4gdGhlIGFycmF5XG4gICAgTGlzdFdyYXBwZXIuc29ydChkaXJlY3RpdmVzLFxuICAgICAgICAgICAgICAgICAgICAgKGRpcjE6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSwgZGlyMjogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgIHZhciBkaXIxQ29tcCA9IGRpcjEuaXNDb21wb25lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgIHZhciBkaXIyQ29tcCA9IGRpcjIuaXNDb21wb25lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXIxQ29tcCAmJiAhZGlyMkNvbXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIWRpcjFDb21wICYmIGRpcjJDb21wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlyZWN0aXZlc0luZGV4LmdldChkaXIxKSAtIHRoaXMuZGlyZWN0aXZlc0luZGV4LmdldChkaXIyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgcmV0dXJuIGRpcmVjdGl2ZXM7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVEaXJlY3RpdmVBc3RzKGVsZW1lbnROYW1lOiBzdHJpbmcsIGRpcmVjdGl2ZXM6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzOiBCb3VuZEVsZW1lbnRPckRpcmVjdGl2ZVByb3BlcnR5W10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zc2libGVFeHBvcnRBc1ZhcnM6IFZhcmlhYmxlQXN0W10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKTogRGlyZWN0aXZlQXN0W10ge1xuICAgIHZhciBtYXRjaGVkVmFyaWFibGVzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgdmFyIGRpcmVjdGl2ZUFzdHMgPSBkaXJlY3RpdmVzLm1hcCgoZGlyZWN0aXZlOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEpID0+IHtcbiAgICAgIHZhciBob3N0UHJvcGVydGllczogQm91bmRFbGVtZW50UHJvcGVydHlBc3RbXSA9IFtdO1xuICAgICAgdmFyIGhvc3RFdmVudHM6IEJvdW5kRXZlbnRBc3RbXSA9IFtdO1xuICAgICAgdmFyIGRpcmVjdGl2ZVByb3BlcnRpZXM6IEJvdW5kRGlyZWN0aXZlUHJvcGVydHlBc3RbXSA9IFtdO1xuICAgICAgdGhpcy5fY3JlYXRlRGlyZWN0aXZlSG9zdFByb3BlcnR5QXN0cyhlbGVtZW50TmFtZSwgZGlyZWN0aXZlLmhvc3RQcm9wZXJ0aWVzLCBzb3VyY2VTcGFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3N0UHJvcGVydGllcyk7XG4gICAgICB0aGlzLl9jcmVhdGVEaXJlY3RpdmVIb3N0RXZlbnRBc3RzKGRpcmVjdGl2ZS5ob3N0TGlzdGVuZXJzLCBzb3VyY2VTcGFuLCBob3N0RXZlbnRzKTtcbiAgICAgIHRoaXMuX2NyZWF0ZURpcmVjdGl2ZVByb3BlcnR5QXN0cyhkaXJlY3RpdmUuaW5wdXRzLCBwcm9wcywgZGlyZWN0aXZlUHJvcGVydGllcyk7XG4gICAgICB2YXIgZXhwb3J0QXNWYXJzID0gW107XG4gICAgICBwb3NzaWJsZUV4cG9ydEFzVmFycy5mb3JFYWNoKCh2YXJBc3QpID0+IHtcbiAgICAgICAgaWYgKCh2YXJBc3QudmFsdWUubGVuZ3RoID09PSAwICYmIGRpcmVjdGl2ZS5pc0NvbXBvbmVudCkgfHxcbiAgICAgICAgICAgIChkaXJlY3RpdmUuZXhwb3J0QXMgPT0gdmFyQXN0LnZhbHVlKSkge1xuICAgICAgICAgIGV4cG9ydEFzVmFycy5wdXNoKHZhckFzdCk7XG4gICAgICAgICAgbWF0Y2hlZFZhcmlhYmxlcy5hZGQodmFyQXN0Lm5hbWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXcgRGlyZWN0aXZlQXN0KGRpcmVjdGl2ZSwgZGlyZWN0aXZlUHJvcGVydGllcywgaG9zdFByb3BlcnRpZXMsIGhvc3RFdmVudHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBvcnRBc1ZhcnMsIHNvdXJjZVNwYW4pO1xuICAgIH0pO1xuICAgIHBvc3NpYmxlRXhwb3J0QXNWYXJzLmZvckVhY2goKHZhckFzdCkgPT4ge1xuICAgICAgaWYgKHZhckFzdC52YWx1ZS5sZW5ndGggPiAwICYmICFTZXRXcmFwcGVyLmhhcyhtYXRjaGVkVmFyaWFibGVzLCB2YXJBc3QubmFtZSkpIHtcbiAgICAgICAgdGhpcy5fcmVwb3J0RXJyb3IoYFRoZXJlIGlzIG5vIGRpcmVjdGl2ZSB3aXRoIFwiZXhwb3J0QXNcIiBzZXQgdG8gXCIke3ZhckFzdC52YWx1ZX1cImAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhckFzdC5zb3VyY2VTcGFuKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZGlyZWN0aXZlQXN0cztcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZURpcmVjdGl2ZUhvc3RQcm9wZXJ0eUFzdHMoZWxlbWVudE5hbWU6IHN0cmluZywgaG9zdFByb3BzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UHJvcGVydHlBc3RzOiBCb3VuZEVsZW1lbnRQcm9wZXJ0eUFzdFtdKSB7XG4gICAgaWYgKGlzUHJlc2VudChob3N0UHJvcHMpKSB7XG4gICAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2goaG9zdFByb3BzLCAoZXhwcmVzc2lvbjogc3RyaW5nLCBwcm9wTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICAgIHZhciBleHByQXN0ID0gdGhpcy5fcGFyc2VCaW5kaW5nKGV4cHJlc3Npb24sIHNvdXJjZVNwYW4pO1xuICAgICAgICB0YXJnZXRQcm9wZXJ0eUFzdHMucHVzaChcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZUVsZW1lbnRQcm9wZXJ0eUFzdChlbGVtZW50TmFtZSwgcHJvcE5hbWUsIGV4cHJBc3QsIHNvdXJjZVNwYW4pKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZURpcmVjdGl2ZUhvc3RFdmVudEFzdHMoaG9zdExpc3RlbmVyczoge1trZXk6IHN0cmluZ106IHN0cmluZ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEV2ZW50QXN0czogQm91bmRFdmVudEFzdFtdKSB7XG4gICAgaWYgKGlzUHJlc2VudChob3N0TGlzdGVuZXJzKSkge1xuICAgICAgU3RyaW5nTWFwV3JhcHBlci5mb3JFYWNoKGhvc3RMaXN0ZW5lcnMsIChleHByZXNzaW9uOiBzdHJpbmcsIHByb3BOYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgdGhpcy5fcGFyc2VFdmVudChwcm9wTmFtZSwgZXhwcmVzc2lvbiwgc291cmNlU3BhbiwgW10sIHRhcmdldEV2ZW50QXN0cyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVEaXJlY3RpdmVQcm9wZXJ0eUFzdHMoZGlyZWN0aXZlUHJvcGVydGllczoge1trZXk6IHN0cmluZ106IHN0cmluZ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3VuZFByb3BzOiBCb3VuZEVsZW1lbnRPckRpcmVjdGl2ZVByb3BlcnR5W10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRCb3VuZERpcmVjdGl2ZVByb3BzOiBCb3VuZERpcmVjdGl2ZVByb3BlcnR5QXN0W10pIHtcbiAgICBpZiAoaXNQcmVzZW50KGRpcmVjdGl2ZVByb3BlcnRpZXMpKSB7XG4gICAgICB2YXIgYm91bmRQcm9wc0J5TmFtZSA9IG5ldyBNYXA8c3RyaW5nLCBCb3VuZEVsZW1lbnRPckRpcmVjdGl2ZVByb3BlcnR5PigpO1xuICAgICAgYm91bmRQcm9wcy5mb3JFYWNoKGJvdW5kUHJvcCA9PiB7XG4gICAgICAgIHZhciBwcmV2VmFsdWUgPSBib3VuZFByb3BzQnlOYW1lLmdldChib3VuZFByb3AubmFtZSk7XG4gICAgICAgIGlmIChpc0JsYW5rKHByZXZWYWx1ZSkgfHwgcHJldlZhbHVlLmlzTGl0ZXJhbCkge1xuICAgICAgICAgIC8vIGdpdmUgW2FdPVwiYlwiIGEgaGlnaGVyIHByZWNlZGVuY2UgdGhhbiBhPVwiYlwiIG9uIHRoZSBzYW1lIGVsZW1lbnRcbiAgICAgICAgICBib3VuZFByb3BzQnlOYW1lLnNldChib3VuZFByb3AubmFtZSwgYm91bmRQcm9wKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIFN0cmluZ01hcFdyYXBwZXIuZm9yRWFjaChkaXJlY3RpdmVQcm9wZXJ0aWVzLCAoZWxQcm9wOiBzdHJpbmcsIGRpclByb3A6IHN0cmluZykgPT4ge1xuICAgICAgICB2YXIgYm91bmRQcm9wID0gYm91bmRQcm9wc0J5TmFtZS5nZXQoZWxQcm9wKTtcblxuICAgICAgICAvLyBCaW5kaW5ncyBhcmUgb3B0aW9uYWwsIHNvIHRoaXMgYmluZGluZyBvbmx5IG5lZWRzIHRvIGJlIHNldCB1cCBpZiBhbiBleHByZXNzaW9uIGlzIGdpdmVuLlxuICAgICAgICBpZiAoaXNQcmVzZW50KGJvdW5kUHJvcCkpIHtcbiAgICAgICAgICB0YXJnZXRCb3VuZERpcmVjdGl2ZVByb3BzLnB1c2gobmV3IEJvdW5kRGlyZWN0aXZlUHJvcGVydHlBc3QoXG4gICAgICAgICAgICAgIGRpclByb3AsIGJvdW5kUHJvcC5uYW1lLCBib3VuZFByb3AuZXhwcmVzc2lvbiwgYm91bmRQcm9wLnNvdXJjZVNwYW4pKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlRWxlbWVudFByb3BlcnR5QXN0cyhlbGVtZW50TmFtZTogc3RyaW5nLCBwcm9wczogQm91bmRFbGVtZW50T3JEaXJlY3RpdmVQcm9wZXJ0eVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IERpcmVjdGl2ZUFzdFtdKTogQm91bmRFbGVtZW50UHJvcGVydHlBc3RbXSB7XG4gICAgdmFyIGJvdW5kRWxlbWVudFByb3BzOiBCb3VuZEVsZW1lbnRQcm9wZXJ0eUFzdFtdID0gW107XG4gICAgdmFyIGJvdW5kRGlyZWN0aXZlUHJvcHNJbmRleCA9IG5ldyBNYXA8c3RyaW5nLCBCb3VuZERpcmVjdGl2ZVByb3BlcnR5QXN0PigpO1xuICAgIGRpcmVjdGl2ZXMuZm9yRWFjaCgoZGlyZWN0aXZlOiBEaXJlY3RpdmVBc3QpID0+IHtcbiAgICAgIGRpcmVjdGl2ZS5pbnB1dHMuZm9yRWFjaCgocHJvcDogQm91bmREaXJlY3RpdmVQcm9wZXJ0eUFzdCkgPT4ge1xuICAgICAgICBib3VuZERpcmVjdGl2ZVByb3BzSW5kZXguc2V0KHByb3AudGVtcGxhdGVOYW1lLCBwcm9wKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHByb3BzLmZvckVhY2goKHByb3A6IEJvdW5kRWxlbWVudE9yRGlyZWN0aXZlUHJvcGVydHkpID0+IHtcbiAgICAgIGlmICghcHJvcC5pc0xpdGVyYWwgJiYgaXNCbGFuayhib3VuZERpcmVjdGl2ZVByb3BzSW5kZXguZ2V0KHByb3AubmFtZSkpKSB7XG4gICAgICAgIGJvdW5kRWxlbWVudFByb3BzLnB1c2godGhpcy5fY3JlYXRlRWxlbWVudFByb3BlcnR5QXN0KGVsZW1lbnROYW1lLCBwcm9wLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3AuZXhwcmVzc2lvbiwgcHJvcC5zb3VyY2VTcGFuKSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGJvdW5kRWxlbWVudFByb3BzO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlRWxlbWVudFByb3BlcnR5QXN0KGVsZW1lbnROYW1lOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgYXN0OiBBU1QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pOiBCb3VuZEVsZW1lbnRQcm9wZXJ0eUFzdCB7XG4gICAgdmFyIHVuaXQgPSBudWxsO1xuICAgIHZhciBiaW5kaW5nVHlwZTtcbiAgICB2YXIgYm91bmRQcm9wZXJ0eU5hbWU7XG4gICAgdmFyIHBhcnRzID0gbmFtZS5zcGxpdChQUk9QRVJUWV9QQVJUU19TRVBBUkFUT1IpO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGJvdW5kUHJvcGVydHlOYW1lID0gdGhpcy5fc2NoZW1hUmVnaXN0cnkuZ2V0TWFwcGVkUHJvcE5hbWUocGFydHNbMF0pO1xuICAgICAgYmluZGluZ1R5cGUgPSBQcm9wZXJ0eUJpbmRpbmdUeXBlLlByb3BlcnR5O1xuICAgICAgaWYgKCF0aGlzLl9zY2hlbWFSZWdpc3RyeS5oYXNQcm9wZXJ0eShlbGVtZW50TmFtZSwgYm91bmRQcm9wZXJ0eU5hbWUpKSB7XG4gICAgICAgIHRoaXMuX3JlcG9ydEVycm9yKFxuICAgICAgICAgICAgYENhbid0IGJpbmQgdG8gJyR7Ym91bmRQcm9wZXJ0eU5hbWV9JyBzaW5jZSBpdCBpc24ndCBhIGtub3duIG5hdGl2ZSBwcm9wZXJ0eWAsXG4gICAgICAgICAgICBzb3VyY2VTcGFuKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHBhcnRzWzBdID09IEFUVFJJQlVURV9QUkVGSVgpIHtcbiAgICAgICAgYm91bmRQcm9wZXJ0eU5hbWUgPSBwYXJ0c1sxXTtcbiAgICAgICAgbGV0IG5zU2VwYXJhdG9ySWR4ID0gYm91bmRQcm9wZXJ0eU5hbWUuaW5kZXhPZignOicpO1xuICAgICAgICBpZiAobnNTZXBhcmF0b3JJZHggPiAtMSkge1xuICAgICAgICAgIGxldCBucyA9IGJvdW5kUHJvcGVydHlOYW1lLnN1YnN0cmluZygwLCBuc1NlcGFyYXRvcklkeCk7XG4gICAgICAgICAgbGV0IG5hbWUgPSBib3VuZFByb3BlcnR5TmFtZS5zdWJzdHJpbmcobnNTZXBhcmF0b3JJZHggKyAxKTtcbiAgICAgICAgICBib3VuZFByb3BlcnR5TmFtZSA9IG1lcmdlTnNBbmROYW1lKG5zLCBuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBiaW5kaW5nVHlwZSA9IFByb3BlcnR5QmluZGluZ1R5cGUuQXR0cmlidXRlO1xuICAgICAgfSBlbHNlIGlmIChwYXJ0c1swXSA9PSBDTEFTU19QUkVGSVgpIHtcbiAgICAgICAgYm91bmRQcm9wZXJ0eU5hbWUgPSBwYXJ0c1sxXTtcbiAgICAgICAgYmluZGluZ1R5cGUgPSBQcm9wZXJ0eUJpbmRpbmdUeXBlLkNsYXNzO1xuICAgICAgfSBlbHNlIGlmIChwYXJ0c1swXSA9PSBTVFlMRV9QUkVGSVgpIHtcbiAgICAgICAgdW5pdCA9IHBhcnRzLmxlbmd0aCA+IDIgPyBwYXJ0c1syXSA6IG51bGw7XG4gICAgICAgIGJvdW5kUHJvcGVydHlOYW1lID0gcGFydHNbMV07XG4gICAgICAgIGJpbmRpbmdUeXBlID0gUHJvcGVydHlCaW5kaW5nVHlwZS5TdHlsZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3JlcG9ydEVycm9yKGBJbnZhbGlkIHByb3BlcnR5IG5hbWUgJyR7bmFtZX0nYCwgc291cmNlU3Bhbik7XG4gICAgICAgIGJpbmRpbmdUeXBlID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEJvdW5kRWxlbWVudFByb3BlcnR5QXN0KGJvdW5kUHJvcGVydHlOYW1lLCBiaW5kaW5nVHlwZSwgYXN0LCB1bml0LCBzb3VyY2VTcGFuKTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBfZmluZENvbXBvbmVudERpcmVjdGl2ZU5hbWVzKGRpcmVjdGl2ZXM6IERpcmVjdGl2ZUFzdFtdKTogc3RyaW5nW10ge1xuICAgIHZhciBjb21wb25lbnRUeXBlTmFtZXM6IHN0cmluZ1tdID0gW107XG4gICAgZGlyZWN0aXZlcy5mb3JFYWNoKGRpcmVjdGl2ZSA9PiB7XG4gICAgICB2YXIgdHlwZU5hbWUgPSBkaXJlY3RpdmUuZGlyZWN0aXZlLnR5cGUubmFtZTtcbiAgICAgIGlmIChkaXJlY3RpdmUuZGlyZWN0aXZlLmlzQ29tcG9uZW50KSB7XG4gICAgICAgIGNvbXBvbmVudFR5cGVOYW1lcy5wdXNoKHR5cGVOYW1lKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY29tcG9uZW50VHlwZU5hbWVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXNzZXJ0T25seU9uZUNvbXBvbmVudChkaXJlY3RpdmVzOiBEaXJlY3RpdmVBc3RbXSwgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7XG4gICAgdmFyIGNvbXBvbmVudFR5cGVOYW1lcyA9IHRoaXMuX2ZpbmRDb21wb25lbnREaXJlY3RpdmVOYW1lcyhkaXJlY3RpdmVzKTtcbiAgICBpZiAoY29tcG9uZW50VHlwZU5hbWVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRoaXMuX3JlcG9ydEVycm9yKGBNb3JlIHRoYW4gb25lIGNvbXBvbmVudDogJHtjb21wb25lbnRUeXBlTmFtZXMuam9pbignLCcpfWAsIHNvdXJjZVNwYW4pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2Fzc2VydE5vQ29tcG9uZW50c05vckVsZW1lbnRCaW5kaW5nc09uVGVtcGxhdGUoZGlyZWN0aXZlczogRGlyZWN0aXZlQXN0W10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudFByb3BzOiBCb3VuZEVsZW1lbnRQcm9wZXJ0eUFzdFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbikge1xuICAgIHZhciBjb21wb25lbnRUeXBlTmFtZXM6IHN0cmluZ1tdID0gdGhpcy5fZmluZENvbXBvbmVudERpcmVjdGl2ZU5hbWVzKGRpcmVjdGl2ZXMpO1xuICAgIGlmIChjb21wb25lbnRUeXBlTmFtZXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5fcmVwb3J0RXJyb3IoYENvbXBvbmVudHMgb24gYW4gZW1iZWRkZWQgdGVtcGxhdGU6ICR7Y29tcG9uZW50VHlwZU5hbWVzLmpvaW4oJywnKX1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlU3Bhbik7XG4gICAgfVxuICAgIGVsZW1lbnRQcm9wcy5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgdGhpcy5fcmVwb3J0RXJyb3IoXG4gICAgICAgICAgYFByb3BlcnR5IGJpbmRpbmcgJHtwcm9wLm5hbWV9IG5vdCB1c2VkIGJ5IGFueSBkaXJlY3RpdmUgb24gYW4gZW1iZWRkZWQgdGVtcGxhdGVgLFxuICAgICAgICAgIHNvdXJjZVNwYW4pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXNzZXJ0QWxsRXZlbnRzUHVibGlzaGVkQnlEaXJlY3RpdmVzKGRpcmVjdGl2ZXM6IERpcmVjdGl2ZUFzdFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzOiBCb3VuZEV2ZW50QXN0W10pIHtcbiAgICB2YXIgYWxsRGlyZWN0aXZlRXZlbnRzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgZGlyZWN0aXZlcy5mb3JFYWNoKGRpcmVjdGl2ZSA9PiB7XG4gICAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2goZGlyZWN0aXZlLmRpcmVjdGl2ZS5vdXRwdXRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChldmVudE5hbWU6IHN0cmluZywgXykgPT4geyBhbGxEaXJlY3RpdmVFdmVudHMuYWRkKGV2ZW50TmFtZSk7IH0pO1xuICAgIH0pO1xuICAgIGV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IHtcbiAgICAgIGlmIChpc1ByZXNlbnQoZXZlbnQudGFyZ2V0KSB8fCAhU2V0V3JhcHBlci5oYXMoYWxsRGlyZWN0aXZlRXZlbnRzLCBldmVudC5uYW1lKSkge1xuICAgICAgICB0aGlzLl9yZXBvcnRFcnJvcihcbiAgICAgICAgICAgIGBFdmVudCBiaW5kaW5nICR7ZXZlbnQuZnVsbE5hbWV9IG5vdCBlbWl0dGVkIGJ5IGFueSBkaXJlY3RpdmUgb24gYW4gZW1iZWRkZWQgdGVtcGxhdGVgLFxuICAgICAgICAgICAgZXZlbnQuc291cmNlU3Bhbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuY2xhc3MgTm9uQmluZGFibGVWaXNpdG9yIGltcGxlbWVudHMgSHRtbEFzdFZpc2l0b3Ige1xuICB2aXNpdEVsZW1lbnQoYXN0OiBIdG1sRWxlbWVudEFzdCwgY29tcG9uZW50OiBDb21wb25lbnQpOiBFbGVtZW50QXN0IHtcbiAgICB2YXIgcHJlcGFyc2VkRWxlbWVudCA9IHByZXBhcnNlRWxlbWVudChhc3QpO1xuICAgIGlmIChwcmVwYXJzZWRFbGVtZW50LnR5cGUgPT09IFByZXBhcnNlZEVsZW1lbnRUeXBlLlNDUklQVCB8fFxuICAgICAgICBwcmVwYXJzZWRFbGVtZW50LnR5cGUgPT09IFByZXBhcnNlZEVsZW1lbnRUeXBlLlNUWUxFIHx8XG4gICAgICAgIHByZXBhcnNlZEVsZW1lbnQudHlwZSA9PT0gUHJlcGFyc2VkRWxlbWVudFR5cGUuU1RZTEVTSEVFVCkge1xuICAgICAgLy8gU2tpcHBpbmcgPHNjcmlwdD4gZm9yIHNlY3VyaXR5IHJlYXNvbnNcbiAgICAgIC8vIFNraXBwaW5nIDxzdHlsZT4gYW5kIHN0eWxlc2hlZXRzIGFzIHdlIGFscmVhZHkgcHJvY2Vzc2VkIHRoZW1cbiAgICAgIC8vIGluIHRoZSBTdHlsZUNvbXBpbGVyXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgYXR0ck5hbWVBbmRWYWx1ZXMgPSBhc3QuYXR0cnMubWFwKGF0dHJBc3QgPT4gW2F0dHJBc3QubmFtZSwgYXR0ckFzdC52YWx1ZV0pO1xuICAgIHZhciBzZWxlY3RvciA9IGNyZWF0ZUVsZW1lbnRDc3NTZWxlY3Rvcihhc3QubmFtZSwgYXR0ck5hbWVBbmRWYWx1ZXMpO1xuICAgIHZhciBuZ0NvbnRlbnRJbmRleCA9IGNvbXBvbmVudC5maW5kTmdDb250ZW50SW5kZXgoc2VsZWN0b3IpO1xuICAgIHZhciBjaGlsZHJlbiA9IGh0bWxWaXNpdEFsbCh0aGlzLCBhc3QuY2hpbGRyZW4sIEVNUFRZX0NPTVBPTkVOVCk7XG4gICAgcmV0dXJuIG5ldyBFbGVtZW50QXN0KGFzdC5uYW1lLCBodG1sVmlzaXRBbGwodGhpcywgYXN0LmF0dHJzKSwgW10sIFtdLCBbXSwgW10sIGNoaWxkcmVuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBuZ0NvbnRlbnRJbmRleCwgYXN0LnNvdXJjZVNwYW4pO1xuICB9XG4gIHZpc2l0Q29tbWVudChhc3Q6IEh0bWxDb21tZW50QXN0LCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gbnVsbDsgfVxuICB2aXNpdEF0dHIoYXN0OiBIdG1sQXR0ckFzdCwgY29udGV4dDogYW55KTogQXR0ckFzdCB7XG4gICAgcmV0dXJuIG5ldyBBdHRyQXN0KGFzdC5uYW1lLCBhc3QudmFsdWUsIGFzdC5zb3VyY2VTcGFuKTtcbiAgfVxuICB2aXNpdFRleHQoYXN0OiBIdG1sVGV4dEFzdCwgY29tcG9uZW50OiBDb21wb25lbnQpOiBUZXh0QXN0IHtcbiAgICB2YXIgbmdDb250ZW50SW5kZXggPSBjb21wb25lbnQuZmluZE5nQ29udGVudEluZGV4KFRFWFRfQ1NTX1NFTEVDVE9SKTtcbiAgICByZXR1cm4gbmV3IFRleHRBc3QoYXN0LnZhbHVlLCBuZ0NvbnRlbnRJbmRleCwgYXN0LnNvdXJjZVNwYW4pO1xuICB9XG59XG5cbmNsYXNzIEJvdW5kRWxlbWVudE9yRGlyZWN0aXZlUHJvcGVydHkge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgZXhwcmVzc2lvbjogQVNULCBwdWJsaWMgaXNMaXRlcmFsOiBib29sZWFuLFxuICAgICAgICAgICAgICBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3BsaXRDbGFzc2VzKGNsYXNzQXR0clZhbHVlOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gIHJldHVybiBTdHJpbmdXcmFwcGVyLnNwbGl0KGNsYXNzQXR0clZhbHVlLnRyaW0oKSwgL1xccysvZyk7XG59XG5cbmNsYXNzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBjcmVhdGUoZGlyZWN0aXZlczogRGlyZWN0aXZlQXN0W10pOiBDb21wb25lbnQge1xuICAgIGlmIChkaXJlY3RpdmVzLmxlbmd0aCA9PT0gMCB8fCAhZGlyZWN0aXZlc1swXS5kaXJlY3RpdmUuaXNDb21wb25lbnQpIHtcbiAgICAgIHJldHVybiBFTVBUWV9DT01QT05FTlQ7XG4gICAgfVxuICAgIHZhciBtYXRjaGVyID0gbmV3IFNlbGVjdG9yTWF0Y2hlcigpO1xuICAgIHZhciBuZ0NvbnRlbnRTZWxlY3RvcnMgPSBkaXJlY3RpdmVzWzBdLmRpcmVjdGl2ZS50ZW1wbGF0ZS5uZ0NvbnRlbnRTZWxlY3RvcnM7XG4gICAgdmFyIHdpbGRjYXJkTmdDb250ZW50SW5kZXggPSBudWxsO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmdDb250ZW50U2VsZWN0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc2VsZWN0b3IgPSBuZ0NvbnRlbnRTZWxlY3RvcnNbaV07XG4gICAgICBpZiAoU3RyaW5nV3JhcHBlci5lcXVhbHMoc2VsZWN0b3IsICcqJykpIHtcbiAgICAgICAgd2lsZGNhcmROZ0NvbnRlbnRJbmRleCA9IGk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtYXRjaGVyLmFkZFNlbGVjdGFibGVzKENzc1NlbGVjdG9yLnBhcnNlKG5nQ29udGVudFNlbGVjdG9yc1tpXSksIGkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3IENvbXBvbmVudChtYXRjaGVyLCB3aWxkY2FyZE5nQ29udGVudEluZGV4KTtcbiAgfVxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdDb250ZW50SW5kZXhNYXRjaGVyOiBTZWxlY3Rvck1hdGNoZXIsXG4gICAgICAgICAgICAgIHB1YmxpYyB3aWxkY2FyZE5nQ29udGVudEluZGV4OiBudW1iZXIpIHt9XG5cbiAgZmluZE5nQ29udGVudEluZGV4KHNlbGVjdG9yOiBDc3NTZWxlY3Rvcik6IG51bWJlciB7XG4gICAgdmFyIG5nQ29udGVudEluZGljZXMgPSBbXTtcbiAgICB0aGlzLm5nQ29udGVudEluZGV4TWF0Y2hlci5tYXRjaChcbiAgICAgICAgc2VsZWN0b3IsIChzZWxlY3RvciwgbmdDb250ZW50SW5kZXgpID0+IHsgbmdDb250ZW50SW5kaWNlcy5wdXNoKG5nQ29udGVudEluZGV4KTsgfSk7XG4gICAgTGlzdFdyYXBwZXIuc29ydChuZ0NvbnRlbnRJbmRpY2VzKTtcbiAgICBpZiAoaXNQcmVzZW50KHRoaXMud2lsZGNhcmROZ0NvbnRlbnRJbmRleCkpIHtcbiAgICAgIG5nQ29udGVudEluZGljZXMucHVzaCh0aGlzLndpbGRjYXJkTmdDb250ZW50SW5kZXgpO1xuICAgIH1cbiAgICByZXR1cm4gbmdDb250ZW50SW5kaWNlcy5sZW5ndGggPiAwID8gbmdDb250ZW50SW5kaWNlc1swXSA6IG51bGw7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudENzc1NlbGVjdG9yKGVsZW1lbnROYW1lOiBzdHJpbmcsIG1hdGNoYWJsZUF0dHJzOiBzdHJpbmdbXVtdKTogQ3NzU2VsZWN0b3Ige1xuICB2YXIgY3NzU2VsZWN0b3IgPSBuZXcgQ3NzU2VsZWN0b3IoKTtcbiAgbGV0IGVsTmFtZU5vTnMgPSBzcGxpdE5zTmFtZShlbGVtZW50TmFtZSlbMV07XG5cbiAgY3NzU2VsZWN0b3Iuc2V0RWxlbWVudChlbE5hbWVOb05zKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IG1hdGNoYWJsZUF0dHJzLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGF0dHJOYW1lID0gbWF0Y2hhYmxlQXR0cnNbaV1bMF07XG4gICAgbGV0IGF0dHJOYW1lTm9OcyA9IHNwbGl0TnNOYW1lKGF0dHJOYW1lKVsxXTtcbiAgICBsZXQgYXR0clZhbHVlID0gbWF0Y2hhYmxlQXR0cnNbaV1bMV07XG5cbiAgICBjc3NTZWxlY3Rvci5hZGRBdHRyaWJ1dGUoYXR0ck5hbWVOb05zLCBhdHRyVmFsdWUpO1xuICAgIGlmIChhdHRyTmFtZS50b0xvd2VyQ2FzZSgpID09IENMQVNTX0FUVFIpIHtcbiAgICAgIHZhciBjbGFzc2VzID0gc3BsaXRDbGFzc2VzKGF0dHJWYWx1ZSk7XG4gICAgICBjbGFzc2VzLmZvckVhY2goY2xhc3NOYW1lID0+IGNzc1NlbGVjdG9yLmFkZENsYXNzTmFtZShjbGFzc05hbWUpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNzc1NlbGVjdG9yO1xufVxuXG52YXIgRU1QVFlfQ09NUE9ORU5UID0gbmV3IENvbXBvbmVudChuZXcgU2VsZWN0b3JNYXRjaGVyKCksIG51bGwpO1xudmFyIE5PTl9CSU5EQUJMRV9WSVNJVE9SID0gbmV3IE5vbkJpbmRhYmxlVmlzaXRvcigpO1xuXG5cbmV4cG9ydCBjbGFzcyBQaXBlQ29sbGVjdG9yIGV4dGVuZHMgUmVjdXJzaXZlQXN0VmlzaXRvciB7XG4gIHBpcGVzOiBTZXQ8c3RyaW5nPiA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICB2aXNpdFBpcGUoYXN0OiBCaW5kaW5nUGlwZSk6IGFueSB7XG4gICAgdGhpcy5waXBlcy5hZGQoYXN0Lm5hbWUpO1xuICAgIGFzdC5leHAudmlzaXQodGhpcyk7XG4gICAgdGhpcy52aXNpdEFsbChhc3QuYXJncyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
