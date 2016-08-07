System.register(['angular2/src/facade/collection', 'angular2/src/facade/async', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/core/reflection/reflection', 'angular2/core', './route_config/route_config_impl', './rules/rules', './rules/rule_set', './instruction', './route_config/route_config_normalizer', './url_parser'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
    var collection_1, async_1, lang_1, exceptions_1, reflection_1, core_1, route_config_impl_1, rules_1, rule_set_1, instruction_1, route_config_normalizer_1, url_parser_1;
    var _resolveToNull, ROUTER_PRIMARY_COMPONENT, RouteRegistry;
    /*
     * Given: ['/a/b', {c: 2}]
     * Returns: ['', 'a', 'b', {c: 2}]
     */
    function splitAndFlattenLinkParams(linkParams) {
        var accumulation = [];
        linkParams.forEach(function (item) {
            if (lang_1.isString(item)) {
                var strItem = item;
                accumulation = accumulation.concat(strItem.split('/'));
            }
            else {
                accumulation.push(item);
            }
        });
        return accumulation;
    }
    /*
     * Given a list of instructions, returns the most specific instruction
     */
    function mostSpecific(instructions) {
        instructions = instructions.filter(function (instruction) { return lang_1.isPresent(instruction); });
        if (instructions.length == 0) {
            return null;
        }
        if (instructions.length == 1) {
            return instructions[0];
        }
        var first = instructions[0];
        var rest = instructions.slice(1);
        return rest.reduce(function (instruction, contender) {
            if (compareSpecificityStrings(contender.specificity, instruction.specificity) == -1) {
                return contender;
            }
            return instruction;
        }, first);
    }
    /*
     * Expects strings to be in the form of "[0-2]+"
     * Returns -1 if string A should be sorted above string B, 1 if it should be sorted after,
     * or 0 if they are the same.
     */
    function compareSpecificityStrings(a, b) {
        var l = lang_1.Math.min(a.length, b.length);
        for (var i = 0; i < l; i += 1) {
            var ai = lang_1.StringWrapper.charCodeAt(a, i);
            var bi = lang_1.StringWrapper.charCodeAt(b, i);
            var difference = bi - ai;
            if (difference != 0) {
                return difference;
            }
        }
        return a.length - b.length;
    }
    function assertTerminalComponent(component, path) {
        if (!lang_1.isType(component)) {
            return;
        }
        var annotations = reflection_1.reflector.annotations(component);
        if (lang_1.isPresent(annotations)) {
            for (var i = 0; i < annotations.length; i++) {
                var annotation = annotations[i];
                if (annotation instanceof route_config_impl_1.RouteConfig) {
                    throw new exceptions_1.BaseException("Child routes are not allowed for \"" + path + "\". Use \"...\" on the parent's route path.");
                }
            }
        }
    }
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (reflection_1_1) {
                reflection_1 = reflection_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (route_config_impl_1_1) {
                route_config_impl_1 = route_config_impl_1_1;
            },
            function (rules_1_1) {
                rules_1 = rules_1_1;
            },
            function (rule_set_1_1) {
                rule_set_1 = rule_set_1_1;
            },
            function (instruction_1_1) {
                instruction_1 = instruction_1_1;
            },
            function (route_config_normalizer_1_1) {
                route_config_normalizer_1 = route_config_normalizer_1_1;
            },
            function (url_parser_1_1) {
                url_parser_1 = url_parser_1_1;
            }],
        execute: function() {
            _resolveToNull = async_1.PromiseWrapper.resolve(null);
            // A LinkItemArray is an array, which describes a set of routes
            // The items in the array are found in groups:
            // - the first item is the name of the route
            // - the next items are:
            //   - an object containing parameters
            //   - or an array describing an aux route
            // export type LinkRouteItem = string | Object;
            // export type LinkItem = LinkRouteItem | Array<LinkRouteItem>;
            // export type LinkItemArray = Array<LinkItem>;
            /**
             * Token used to bind the component with the top-level {@link RouteConfig}s for the
             * application.
             *
             * ### Example ([live demo](http://plnkr.co/edit/iRUP8B5OUbxCWQ3AcIDm))
             *
             * ```
             * import {Component} from 'angular2/core';
             * import {
             *   ROUTER_DIRECTIVES,
             *   ROUTER_PROVIDERS,
             *   RouteConfig
             * } from 'angular2/router';
             *
             * @Component({directives: [ROUTER_DIRECTIVES]})
             * @RouteConfig([
             *  {...},
             * ])
             * class AppCmp {
             *   // ...
             * }
             *
             * bootstrap(AppCmp, [ROUTER_PROVIDERS]);
             * ```
             */
            exports_1("ROUTER_PRIMARY_COMPONENT", ROUTER_PRIMARY_COMPONENT = lang_1.CONST_EXPR(new core_1.OpaqueToken('RouterPrimaryComponent')));
            /**
             * The RouteRegistry holds route configurations for each component in an Angular app.
             * It is responsible for creating Instructions from URLs, and generating URLs based on route and
             * parameters.
             */
            RouteRegistry = (function () {
                function RouteRegistry(_rootComponent) {
                    this._rootComponent = _rootComponent;
                    this._rules = new collection_1.Map();
                }
                /**
                 * Given a component and a configuration object, add the route to this registry
                 */
                RouteRegistry.prototype.config = function (parentComponent, config) {
                    config = route_config_normalizer_1.normalizeRouteConfig(config, this);
                    // this is here because Dart type guard reasons
                    if (config instanceof route_config_impl_1.Route) {
                        route_config_normalizer_1.assertComponentExists(config.component, config.path);
                    }
                    else if (config instanceof route_config_impl_1.AuxRoute) {
                        route_config_normalizer_1.assertComponentExists(config.component, config.path);
                    }
                    var rules = this._rules.get(parentComponent);
                    if (lang_1.isBlank(rules)) {
                        rules = new rule_set_1.RuleSet();
                        this._rules.set(parentComponent, rules);
                    }
                    var terminal = rules.config(config);
                    if (config instanceof route_config_impl_1.Route) {
                        if (terminal) {
                            assertTerminalComponent(config.component, config.path);
                        }
                        else {
                            this.configFromComponent(config.component);
                        }
                    }
                };
                /**
                 * Reads the annotations of a component and configures the registry based on them
                 */
                RouteRegistry.prototype.configFromComponent = function (component) {
                    var _this = this;
                    if (!lang_1.isType(component)) {
                        return;
                    }
                    // Don't read the annotations from a type more than once –
                    // this prevents an infinite loop if a component routes recursively.
                    if (this._rules.has(component)) {
                        return;
                    }
                    var annotations = reflection_1.reflector.annotations(component);
                    if (lang_1.isPresent(annotations)) {
                        for (var i = 0; i < annotations.length; i++) {
                            var annotation = annotations[i];
                            if (annotation instanceof route_config_impl_1.RouteConfig) {
                                var routeCfgs = annotation.configs;
                                routeCfgs.forEach(function (config) { return _this.config(component, config); });
                            }
                        }
                    }
                };
                /**
                 * Given a URL and a parent component, return the most specific instruction for navigating
                 * the application into the state specified by the url
                 */
                RouteRegistry.prototype.recognize = function (url, ancestorInstructions) {
                    var parsedUrl = url_parser_1.parser.parse(url);
                    return this._recognize(parsedUrl, []);
                };
                /**
                 * Recognizes all parent-child routes, but creates unresolved auxiliary routes
                 */
                RouteRegistry.prototype._recognize = function (parsedUrl, ancestorInstructions, _aux) {
                    var _this = this;
                    if (_aux === void 0) { _aux = false; }
                    var parentInstruction = collection_1.ListWrapper.last(ancestorInstructions);
                    var parentComponent = lang_1.isPresent(parentInstruction) ? parentInstruction.component.componentType :
                        this._rootComponent;
                    var rules = this._rules.get(parentComponent);
                    if (lang_1.isBlank(rules)) {
                        return _resolveToNull;
                    }
                    // Matches some beginning part of the given URL
                    var possibleMatches = _aux ? rules.recognizeAuxiliary(parsedUrl) : rules.recognize(parsedUrl);
                    var matchPromises = possibleMatches.map(function (candidate) { return candidate.then(function (candidate) {
                        if (candidate instanceof rules_1.PathMatch) {
                            var auxParentInstructions = ancestorInstructions.length > 0 ? [collection_1.ListWrapper.last(ancestorInstructions)] : [];
                            var auxInstructions = _this._auxRoutesToUnresolved(candidate.remainingAux, auxParentInstructions);
                            var instruction = new instruction_1.ResolvedInstruction(candidate.instruction, null, auxInstructions);
                            if (lang_1.isBlank(candidate.instruction) || candidate.instruction.terminal) {
                                return instruction;
                            }
                            var newAncestorInstructions = ancestorInstructions.concat([instruction]);
                            return _this._recognize(candidate.remaining, newAncestorInstructions)
                                .then(function (childInstruction) {
                                if (lang_1.isBlank(childInstruction)) {
                                    return null;
                                }
                                // redirect instructions are already absolute
                                if (childInstruction instanceof instruction_1.RedirectInstruction) {
                                    return childInstruction;
                                }
                                instruction.child = childInstruction;
                                return instruction;
                            });
                        }
                        if (candidate instanceof rules_1.RedirectMatch) {
                            var instruction = _this.generate(candidate.redirectTo, ancestorInstructions.concat([null]));
                            return new instruction_1.RedirectInstruction(instruction.component, instruction.child, instruction.auxInstruction, candidate.specificity);
                        }
                    }); });
                    if ((lang_1.isBlank(parsedUrl) || parsedUrl.path == '') && possibleMatches.length == 0) {
                        return async_1.PromiseWrapper.resolve(this.generateDefault(parentComponent));
                    }
                    return async_1.PromiseWrapper.all(matchPromises).then(mostSpecific);
                };
                RouteRegistry.prototype._auxRoutesToUnresolved = function (auxRoutes, parentInstructions) {
                    var _this = this;
                    var unresolvedAuxInstructions = {};
                    auxRoutes.forEach(function (auxUrl) {
                        unresolvedAuxInstructions[auxUrl.path] = new instruction_1.UnresolvedInstruction(function () { return _this._recognize(auxUrl, parentInstructions, true); });
                    });
                    return unresolvedAuxInstructions;
                };
                /**
                 * Given a normalized list with component names and params like: `['user', {id: 3 }]`
                 * generates a url with a leading slash relative to the provided `parentComponent`.
                 *
                 * If the optional param `_aux` is `true`, then we generate starting at an auxiliary
                 * route boundary.
                 */
                RouteRegistry.prototype.generate = function (linkParams, ancestorInstructions, _aux) {
                    if (_aux === void 0) { _aux = false; }
                    var params = splitAndFlattenLinkParams(linkParams);
                    var prevInstruction;
                    // The first segment should be either '.' (generate from parent) or '' (generate from root).
                    // When we normalize above, we strip all the slashes, './' becomes '.' and '/' becomes ''.
                    if (collection_1.ListWrapper.first(params) == '') {
                        params.shift();
                        prevInstruction = collection_1.ListWrapper.first(ancestorInstructions);
                        ancestorInstructions = [];
                    }
                    else {
                        prevInstruction = ancestorInstructions.length > 0 ? ancestorInstructions.pop() : null;
                        if (collection_1.ListWrapper.first(params) == '.') {
                            params.shift();
                        }
                        else if (collection_1.ListWrapper.first(params) == '..') {
                            while (collection_1.ListWrapper.first(params) == '..') {
                                if (ancestorInstructions.length <= 0) {
                                    throw new exceptions_1.BaseException("Link \"" + collection_1.ListWrapper.toJSON(linkParams) + "\" has too many \"../\" segments.");
                                }
                                prevInstruction = ancestorInstructions.pop();
                                params = collection_1.ListWrapper.slice(params, 1);
                            }
                        }
                        else {
                            // we must only peak at the link param, and not consume it
                            var routeName = collection_1.ListWrapper.first(params);
                            var parentComponentType = this._rootComponent;
                            var grandparentComponentType = null;
                            if (ancestorInstructions.length > 1) {
                                var parentComponentInstruction = ancestorInstructions[ancestorInstructions.length - 1];
                                var grandComponentInstruction = ancestorInstructions[ancestorInstructions.length - 2];
                                parentComponentType = parentComponentInstruction.component.componentType;
                                grandparentComponentType = grandComponentInstruction.component.componentType;
                            }
                            else if (ancestorInstructions.length == 1) {
                                parentComponentType = ancestorInstructions[0].component.componentType;
                                grandparentComponentType = this._rootComponent;
                            }
                            // For a link with no leading `./`, `/`, or `../`, we look for a sibling and child.
                            // If both exist, we throw. Otherwise, we prefer whichever exists.
                            var childRouteExists = this.hasRoute(routeName, parentComponentType);
                            var parentRouteExists = lang_1.isPresent(grandparentComponentType) &&
                                this.hasRoute(routeName, grandparentComponentType);
                            if (parentRouteExists && childRouteExists) {
                                var msg = "Link \"" + collection_1.ListWrapper.toJSON(linkParams) + "\" is ambiguous, use \"./\" or \"../\" to disambiguate.";
                                throw new exceptions_1.BaseException(msg);
                            }
                            if (parentRouteExists) {
                                prevInstruction = ancestorInstructions.pop();
                            }
                        }
                    }
                    if (params[params.length - 1] == '') {
                        params.pop();
                    }
                    if (params.length > 0 && params[0] == '') {
                        params.shift();
                    }
                    if (params.length < 1) {
                        var msg = "Link \"" + collection_1.ListWrapper.toJSON(linkParams) + "\" must include a route name.";
                        throw new exceptions_1.BaseException(msg);
                    }
                    var generatedInstruction = this._generate(params, ancestorInstructions, prevInstruction, _aux, linkParams);
                    // we don't clone the first (root) element
                    for (var i = ancestorInstructions.length - 1; i >= 0; i--) {
                        var ancestorInstruction = ancestorInstructions[i];
                        if (lang_1.isBlank(ancestorInstruction)) {
                            break;
                        }
                        generatedInstruction = ancestorInstruction.replaceChild(generatedInstruction);
                    }
                    return generatedInstruction;
                };
                /*
                 * Internal helper that does not make any assertions about the beginning of the link DSL.
                 * `ancestorInstructions` are parents that will be cloned.
                 * `prevInstruction` is the existing instruction that would be replaced, but which might have
                 * aux routes that need to be cloned.
                 */
                RouteRegistry.prototype._generate = function (linkParams, ancestorInstructions, prevInstruction, _aux, _originalLink) {
                    var _this = this;
                    if (_aux === void 0) { _aux = false; }
                    var parentComponentType = this._rootComponent;
                    var componentInstruction = null;
                    var auxInstructions = {};
                    var parentInstruction = collection_1.ListWrapper.last(ancestorInstructions);
                    if (lang_1.isPresent(parentInstruction) && lang_1.isPresent(parentInstruction.component)) {
                        parentComponentType = parentInstruction.component.componentType;
                    }
                    if (linkParams.length == 0) {
                        var defaultInstruction = this.generateDefault(parentComponentType);
                        if (lang_1.isBlank(defaultInstruction)) {
                            throw new exceptions_1.BaseException("Link \"" + collection_1.ListWrapper.toJSON(_originalLink) + "\" does not resolve to a terminal instruction.");
                        }
                        return defaultInstruction;
                    }
                    // for non-aux routes, we want to reuse the predecessor's existing primary and aux routes
                    // and only override routes for which the given link DSL provides
                    if (lang_1.isPresent(prevInstruction) && !_aux) {
                        auxInstructions = collection_1.StringMapWrapper.merge(prevInstruction.auxInstruction, auxInstructions);
                        componentInstruction = prevInstruction.component;
                    }
                    var rules = this._rules.get(parentComponentType);
                    if (lang_1.isBlank(rules)) {
                        throw new exceptions_1.BaseException("Component \"" + lang_1.getTypeNameForDebugging(parentComponentType) + "\" has no route config.");
                    }
                    var linkParamIndex = 0;
                    var routeParams = {};
                    // first, recognize the primary route if one is provided
                    if (linkParamIndex < linkParams.length && lang_1.isString(linkParams[linkParamIndex])) {
                        var routeName = linkParams[linkParamIndex];
                        if (routeName == '' || routeName == '.' || routeName == '..') {
                            throw new exceptions_1.BaseException("\"" + routeName + "/\" is only allowed at the beginning of a link DSL.");
                        }
                        linkParamIndex += 1;
                        if (linkParamIndex < linkParams.length) {
                            var linkParam = linkParams[linkParamIndex];
                            if (lang_1.isStringMap(linkParam) && !lang_1.isArray(linkParam)) {
                                routeParams = linkParam;
                                linkParamIndex += 1;
                            }
                        }
                        var routeRecognizer = (_aux ? rules.auxRulesByName : rules.rulesByName).get(routeName);
                        if (lang_1.isBlank(routeRecognizer)) {
                            throw new exceptions_1.BaseException("Component \"" + lang_1.getTypeNameForDebugging(parentComponentType) + "\" has no route named \"" + routeName + "\".");
                        }
                        // Create an "unresolved instruction" for async routes
                        // we'll figure out the rest of the route when we resolve the instruction and
                        // perform a navigation
                        if (lang_1.isBlank(routeRecognizer.handler.componentType)) {
                            var generatedUrl = routeRecognizer.generateComponentPathValues(routeParams);
                            return new instruction_1.UnresolvedInstruction(function () {
                                return routeRecognizer.handler.resolveComponentType().then(function (_) {
                                    return _this._generate(linkParams, ancestorInstructions, prevInstruction, _aux, _originalLink);
                                });
                            }, generatedUrl.urlPath, url_parser_1.convertUrlParamsToArray(generatedUrl.urlParams));
                        }
                        componentInstruction = _aux ? rules.generateAuxiliary(routeName, routeParams) :
                            rules.generate(routeName, routeParams);
                    }
                    // Next, recognize auxiliary instructions.
                    // If we have an ancestor instruction, we preserve whatever aux routes are active from it.
                    while (linkParamIndex < linkParams.length && lang_1.isArray(linkParams[linkParamIndex])) {
                        var auxParentInstruction = [parentInstruction];
                        var auxInstruction = this._generate(linkParams[linkParamIndex], auxParentInstruction, null, true, _originalLink);
                        // TODO: this will not work for aux routes with parameters or multiple segments
                        auxInstructions[auxInstruction.component.urlPath] = auxInstruction;
                        linkParamIndex += 1;
                    }
                    var instruction = new instruction_1.ResolvedInstruction(componentInstruction, null, auxInstructions);
                    // If the component is sync, we can generate resolved child route instructions
                    // If not, we'll resolve the instructions at navigation time
                    if (lang_1.isPresent(componentInstruction) && lang_1.isPresent(componentInstruction.componentType)) {
                        var childInstruction = null;
                        if (componentInstruction.terminal) {
                            if (linkParamIndex >= linkParams.length) {
                            }
                        }
                        else {
                            var childAncestorComponents = ancestorInstructions.concat([instruction]);
                            var remainingLinkParams = linkParams.slice(linkParamIndex);
                            childInstruction = this._generate(remainingLinkParams, childAncestorComponents, null, false, _originalLink);
                        }
                        instruction.child = childInstruction;
                    }
                    return instruction;
                };
                RouteRegistry.prototype.hasRoute = function (name, parentComponent) {
                    var rules = this._rules.get(parentComponent);
                    if (lang_1.isBlank(rules)) {
                        return false;
                    }
                    return rules.hasRoute(name);
                };
                RouteRegistry.prototype.generateDefault = function (componentCursor) {
                    var _this = this;
                    if (lang_1.isBlank(componentCursor)) {
                        return null;
                    }
                    var rules = this._rules.get(componentCursor);
                    if (lang_1.isBlank(rules) || lang_1.isBlank(rules.defaultRule)) {
                        return null;
                    }
                    var defaultChild = null;
                    if (lang_1.isPresent(rules.defaultRule.handler.componentType)) {
                        var componentInstruction = rules.defaultRule.generate({});
                        if (!rules.defaultRule.terminal) {
                            defaultChild = this.generateDefault(rules.defaultRule.handler.componentType);
                        }
                        return new instruction_1.DefaultInstruction(componentInstruction, defaultChild);
                    }
                    return new instruction_1.UnresolvedInstruction(function () {
                        return rules.defaultRule.handler.resolveComponentType().then(function (_) { return _this.generateDefault(componentCursor); });
                    });
                };
                RouteRegistry = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject(ROUTER_PRIMARY_COMPONENT)), 
                    __metadata('design:paramtypes', [lang_1.Type])
                ], RouteRegistry);
                return RouteRegistry;
            }());
            exports_1("RouteRegistry", RouteRegistry);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9yb3V0ZV9yZWdpc3RyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O1FBeUNJLGNBQWMsRUFxQ0wsd0JBQXdCO0lBc1pyQzs7O09BR0c7SUFDSCxtQ0FBbUMsVUFBaUI7UUFDbEQsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBUyxJQUFTO1lBQ25DLEVBQUUsQ0FBQyxDQUFDLGVBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLElBQUksT0FBTyxHQUFtQixJQUFJLENBQUM7Z0JBQ25DLFlBQVksR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN6RCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUFHRDs7T0FFRztJQUNILHNCQUFzQixZQUEyQjtRQUMvQyxZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFDLFdBQVcsSUFBSyxPQUFBLGdCQUFTLENBQUMsV0FBVyxDQUFDLEVBQXRCLENBQXNCLENBQUMsQ0FBQztRQUM1RSxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixDQUFDO1FBQ0QsSUFB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LENBQUM7d0JBQ0QsTUFBTSxDQUFDLElBQUksZ0NBQWtCLENBQUMsb0JBQW9CLEVBQUUsWUFBWSxDQUFDLENBQUM7b0JBQ3BFLENBQUM7b0JBRUQsTUFBTSxDQUFDLElBQUksbUNBQXFCLENBQUM7d0JBQy9CLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLElBQUksQ0FDeEQsVUFBQyxDQUFDLElBQUssT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxFQUFyQyxDQUFxQyxDQUFDLENBQUM7b0JBQ3BELENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUM7Z0JBMVlIO29CQUFDLGlCQUFVLEVBQUU7K0JBSUUsYUFBTSxDQUFDLHdCQUF3QixDQUFDOztpQ0FKbEM7Z0JBMlliLG9CQUFDO1lBQUQsQ0ExWUEsQUEwWUMsSUFBQTtZQTFZRCx5Q0EwWUMsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvcm91dGVfcmVnaXN0cnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0xpc3RXcmFwcGVyLCBNYXAsIE1hcFdyYXBwZXIsIFN0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge1Byb21pc2VXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jJztcbmltcG9ydCB7XG4gIGlzUHJlc2VudCxcbiAgaXNBcnJheSxcbiAgaXNCbGFuayxcbiAgaXNUeXBlLFxuICBpc1N0cmluZyxcbiAgaXNTdHJpbmdNYXAsXG4gIFR5cGUsXG4gIFN0cmluZ1dyYXBwZXIsXG4gIE1hdGgsXG4gIGdldFR5cGVOYW1lRm9yRGVidWdnaW5nLFxuICBDT05TVF9FWFBSXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb24sIFdyYXBwZWRFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge3JlZmxlY3Rvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVmbGVjdGlvbi9yZWZsZWN0aW9uJztcbmltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0LCBPcGFxdWVUb2tlbn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5cbmltcG9ydCB7XG4gIFJvdXRlQ29uZmlnLFxuICBBc3luY1JvdXRlLFxuICBSb3V0ZSxcbiAgQXV4Um91dGUsXG4gIFJlZGlyZWN0LFxuICBSb3V0ZURlZmluaXRpb25cbn0gZnJvbSAnLi9yb3V0ZV9jb25maWcvcm91dGVfY29uZmlnX2ltcGwnO1xuaW1wb3J0IHtQYXRoTWF0Y2gsIFJlZGlyZWN0TWF0Y2gsIFJvdXRlTWF0Y2h9IGZyb20gJy4vcnVsZXMvcnVsZXMnO1xuaW1wb3J0IHtSdWxlU2V0fSBmcm9tICcuL3J1bGVzL3J1bGVfc2V0JztcbmltcG9ydCB7XG4gIEluc3RydWN0aW9uLFxuICBSZXNvbHZlZEluc3RydWN0aW9uLFxuICBSZWRpcmVjdEluc3RydWN0aW9uLFxuICBVbnJlc29sdmVkSW5zdHJ1Y3Rpb24sXG4gIERlZmF1bHRJbnN0cnVjdGlvblxufSBmcm9tICcuL2luc3RydWN0aW9uJztcblxuaW1wb3J0IHtub3JtYWxpemVSb3V0ZUNvbmZpZywgYXNzZXJ0Q29tcG9uZW50RXhpc3RzfSBmcm9tICcuL3JvdXRlX2NvbmZpZy9yb3V0ZV9jb25maWdfbm9ybWFsaXplcic7XG5pbXBvcnQge3BhcnNlciwgVXJsLCBjb252ZXJ0VXJsUGFyYW1zVG9BcnJheSwgcGF0aFNlZ21lbnRzVG9Vcmx9IGZyb20gJy4vdXJsX3BhcnNlcic7XG5pbXBvcnQge0dlbmVyYXRlZFVybH0gZnJvbSAnLi9ydWxlcy9yb3V0ZV9wYXRocy9yb3V0ZV9wYXRoJztcblxudmFyIF9yZXNvbHZlVG9OdWxsID0gUHJvbWlzZVdyYXBwZXIucmVzb2x2ZTxJbnN0cnVjdGlvbj4obnVsbCk7XG5cbi8vIEEgTGlua0l0ZW1BcnJheSBpcyBhbiBhcnJheSwgd2hpY2ggZGVzY3JpYmVzIGEgc2V0IG9mIHJvdXRlc1xuLy8gVGhlIGl0ZW1zIGluIHRoZSBhcnJheSBhcmUgZm91bmQgaW4gZ3JvdXBzOlxuLy8gLSB0aGUgZmlyc3QgaXRlbSBpcyB0aGUgbmFtZSBvZiB0aGUgcm91dGVcbi8vIC0gdGhlIG5leHQgaXRlbXMgYXJlOlxuLy8gICAtIGFuIG9iamVjdCBjb250YWluaW5nIHBhcmFtZXRlcnNcbi8vICAgLSBvciBhbiBhcnJheSBkZXNjcmliaW5nIGFuIGF1eCByb3V0ZVxuLy8gZXhwb3J0IHR5cGUgTGlua1JvdXRlSXRlbSA9IHN0cmluZyB8IE9iamVjdDtcbi8vIGV4cG9ydCB0eXBlIExpbmtJdGVtID0gTGlua1JvdXRlSXRlbSB8IEFycmF5PExpbmtSb3V0ZUl0ZW0+O1xuLy8gZXhwb3J0IHR5cGUgTGlua0l0ZW1BcnJheSA9IEFycmF5PExpbmtJdGVtPjtcblxuLyoqXG4gKiBUb2tlbiB1c2VkIHRvIGJpbmQgdGhlIGNvbXBvbmVudCB3aXRoIHRoZSB0b3AtbGV2ZWwge0BsaW5rIFJvdXRlQ29uZmlnfXMgZm9yIHRoZVxuICogYXBwbGljYXRpb24uXG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L2lSVVA4QjVPVWJ4Q1dRM0FjSURtKSlcbiAqXG4gKiBgYGBcbiAqIGltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbiAqIGltcG9ydCB7XG4gKiAgIFJPVVRFUl9ESVJFQ1RJVkVTLFxuICogICBST1VURVJfUFJPVklERVJTLFxuICogICBSb3V0ZUNvbmZpZ1xuICogfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXInO1xuICpcbiAqIEBDb21wb25lbnQoe2RpcmVjdGl2ZXM6IFtST1VURVJfRElSRUNUSVZFU119KVxuICogQFJvdXRlQ29uZmlnKFtcbiAqICB7Li4ufSxcbiAqIF0pXG4gKiBjbGFzcyBBcHBDbXAge1xuICogICAvLyAuLi5cbiAqIH1cbiAqXG4gKiBib290c3RyYXAoQXBwQ21wLCBbUk9VVEVSX1BST1ZJREVSU10pO1xuICogYGBgXG4gKi9cbmV4cG9ydCBjb25zdCBST1VURVJfUFJJTUFSWV9DT01QT05FTlQ6IE9wYXF1ZVRva2VuID1cbiAgICBDT05TVF9FWFBSKG5ldyBPcGFxdWVUb2tlbignUm91dGVyUHJpbWFyeUNvbXBvbmVudCcpKTtcblxuXG4vKipcbiAqIFRoZSBSb3V0ZVJlZ2lzdHJ5IGhvbGRzIHJvdXRlIGNvbmZpZ3VyYXRpb25zIGZvciBlYWNoIGNvbXBvbmVudCBpbiBhbiBBbmd1bGFyIGFwcC5cbiAqIEl0IGlzIHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyBJbnN0cnVjdGlvbnMgZnJvbSBVUkxzLCBhbmQgZ2VuZXJhdGluZyBVUkxzIGJhc2VkIG9uIHJvdXRlIGFuZFxuICogcGFyYW1ldGVycy5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJvdXRlUmVnaXN0cnkge1xuICBwcml2YXRlIF9ydWxlcyA9IG5ldyBNYXA8YW55LCBSdWxlU2V0PigpO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoUk9VVEVSX1BSSU1BUllfQ09NUE9ORU5UKSBwcml2YXRlIF9yb290Q29tcG9uZW50OiBUeXBlKSB7fVxuXG4gIC8qKlxuICAgKiBHaXZlbiBhIGNvbXBvbmVudCBhbmQgYSBjb25maWd1cmF0aW9uIG9iamVjdCwgYWRkIHRoZSByb3V0ZSB0byB0aGlzIHJlZ2lzdHJ5XG4gICAqL1xuICBjb25maWcocGFyZW50Q29tcG9uZW50OiBhbnksIGNvbmZpZzogUm91dGVEZWZpbml0aW9uKTogdm9pZCB7XG4gICAgY29uZmlnID0gbm9ybWFsaXplUm91dGVDb25maWcoY29uZmlnLCB0aGlzKTtcblxuICAgIC8vIHRoaXMgaXMgaGVyZSBiZWNhdXNlIERhcnQgdHlwZSBndWFyZCByZWFzb25zXG4gICAgaWYgKGNvbmZpZyBpbnN0YW5jZW9mIFJvdXRlKSB7XG4gICAgICBhc3NlcnRDb21wb25lbnRFeGlzdHMoY29uZmlnLmNvbXBvbmVudCwgY29uZmlnLnBhdGgpO1xuICAgIH0gZWxzZSBpZiAoY29uZmlnIGluc3RhbmNlb2YgQXV4Um91dGUpIHtcbiAgICAgIGFzc2VydENvbXBvbmVudEV4aXN0cyhjb25maWcuY29tcG9uZW50LCBjb25maWcucGF0aCk7XG4gICAgfVxuXG4gICAgdmFyIHJ1bGVzID0gdGhpcy5fcnVsZXMuZ2V0KHBhcmVudENvbXBvbmVudCk7XG5cbiAgICBpZiAoaXNCbGFuayhydWxlcykpIHtcbiAgICAgIHJ1bGVzID0gbmV3IFJ1bGVTZXQoKTtcbiAgICAgIHRoaXMuX3J1bGVzLnNldChwYXJlbnRDb21wb25lbnQsIHJ1bGVzKTtcbiAgICB9XG5cbiAgICB2YXIgdGVybWluYWwgPSBydWxlcy5jb25maWcoY29uZmlnKTtcblxuICAgIGlmIChjb25maWcgaW5zdGFuY2VvZiBSb3V0ZSkge1xuICAgICAgaWYgKHRlcm1pbmFsKSB7XG4gICAgICAgIGFzc2VydFRlcm1pbmFsQ29tcG9uZW50KGNvbmZpZy5jb21wb25lbnQsIGNvbmZpZy5wYXRoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29uZmlnRnJvbUNvbXBvbmVudChjb25maWcuY29tcG9uZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVhZHMgdGhlIGFubm90YXRpb25zIG9mIGEgY29tcG9uZW50IGFuZCBjb25maWd1cmVzIHRoZSByZWdpc3RyeSBiYXNlZCBvbiB0aGVtXG4gICAqL1xuICBjb25maWdGcm9tQ29tcG9uZW50KGNvbXBvbmVudDogYW55KTogdm9pZCB7XG4gICAgaWYgKCFpc1R5cGUoY29tcG9uZW50KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIERvbid0IHJlYWQgdGhlIGFubm90YXRpb25zIGZyb20gYSB0eXBlIG1vcmUgdGhhbiBvbmNlIOKAk1xuICAgIC8vIHRoaXMgcHJldmVudHMgYW4gaW5maW5pdGUgbG9vcCBpZiBhIGNvbXBvbmVudCByb3V0ZXMgcmVjdXJzaXZlbHkuXG4gICAgaWYgKHRoaXMuX3J1bGVzLmhhcyhjb21wb25lbnQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBhbm5vdGF0aW9ucyA9IHJlZmxlY3Rvci5hbm5vdGF0aW9ucyhjb21wb25lbnQpO1xuICAgIGlmIChpc1ByZXNlbnQoYW5ub3RhdGlvbnMpKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFubm90YXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBhbm5vdGF0aW9uID0gYW5ub3RhdGlvbnNbaV07XG5cbiAgICAgICAgaWYgKGFubm90YXRpb24gaW5zdGFuY2VvZiBSb3V0ZUNvbmZpZykge1xuICAgICAgICAgIGxldCByb3V0ZUNmZ3M6IFJvdXRlRGVmaW5pdGlvbltdID0gYW5ub3RhdGlvbi5jb25maWdzO1xuICAgICAgICAgIHJvdXRlQ2Zncy5mb3JFYWNoKGNvbmZpZyA9PiB0aGlzLmNvbmZpZyhjb21wb25lbnQsIGNvbmZpZykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogR2l2ZW4gYSBVUkwgYW5kIGEgcGFyZW50IGNvbXBvbmVudCwgcmV0dXJuIHRoZSBtb3N0IHNwZWNpZmljIGluc3RydWN0aW9uIGZvciBuYXZpZ2F0aW5nXG4gICAqIHRoZSBhcHBsaWNhdGlvbiBpbnRvIHRoZSBzdGF0ZSBzcGVjaWZpZWQgYnkgdGhlIHVybFxuICAgKi9cbiAgcmVjb2duaXplKHVybDogc3RyaW5nLCBhbmNlc3Rvckluc3RydWN0aW9uczogSW5zdHJ1Y3Rpb25bXSk6IFByb21pc2U8SW5zdHJ1Y3Rpb24+IHtcbiAgICB2YXIgcGFyc2VkVXJsID0gcGFyc2VyLnBhcnNlKHVybCk7XG4gICAgcmV0dXJuIHRoaXMuX3JlY29nbml6ZShwYXJzZWRVcmwsIFtdKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFJlY29nbml6ZXMgYWxsIHBhcmVudC1jaGlsZCByb3V0ZXMsIGJ1dCBjcmVhdGVzIHVucmVzb2x2ZWQgYXV4aWxpYXJ5IHJvdXRlc1xuICAgKi9cbiAgcHJpdmF0ZSBfcmVjb2duaXplKHBhcnNlZFVybDogVXJsLCBhbmNlc3Rvckluc3RydWN0aW9uczogSW5zdHJ1Y3Rpb25bXSxcbiAgICAgICAgICAgICAgICAgICAgIF9hdXggPSBmYWxzZSk6IFByb21pc2U8SW5zdHJ1Y3Rpb24+IHtcbiAgICB2YXIgcGFyZW50SW5zdHJ1Y3Rpb24gPSBMaXN0V3JhcHBlci5sYXN0KGFuY2VzdG9ySW5zdHJ1Y3Rpb25zKTtcbiAgICB2YXIgcGFyZW50Q29tcG9uZW50ID0gaXNQcmVzZW50KHBhcmVudEluc3RydWN0aW9uKSA/IHBhcmVudEluc3RydWN0aW9uLmNvbXBvbmVudC5jb21wb25lbnRUeXBlIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvb3RDb21wb25lbnQ7XG5cbiAgICB2YXIgcnVsZXMgPSB0aGlzLl9ydWxlcy5nZXQocGFyZW50Q29tcG9uZW50KTtcbiAgICBpZiAoaXNCbGFuayhydWxlcykpIHtcbiAgICAgIHJldHVybiBfcmVzb2x2ZVRvTnVsbDtcbiAgICB9XG5cbiAgICAvLyBNYXRjaGVzIHNvbWUgYmVnaW5uaW5nIHBhcnQgb2YgdGhlIGdpdmVuIFVSTFxuICAgIHZhciBwb3NzaWJsZU1hdGNoZXM6IFByb21pc2U8Um91dGVNYXRjaD5bXSA9XG4gICAgICAgIF9hdXggPyBydWxlcy5yZWNvZ25pemVBdXhpbGlhcnkocGFyc2VkVXJsKSA6IHJ1bGVzLnJlY29nbml6ZShwYXJzZWRVcmwpO1xuXG4gICAgdmFyIG1hdGNoUHJvbWlzZXM6IFByb21pc2U8SW5zdHJ1Y3Rpb24+W10gPSBwb3NzaWJsZU1hdGNoZXMubWFwKFxuICAgICAgICAoY2FuZGlkYXRlOiBQcm9taXNlPFJvdXRlTWF0Y2g+KSA9PiBjYW5kaWRhdGUudGhlbigoY2FuZGlkYXRlOiBSb3V0ZU1hdGNoKSA9PiB7XG5cbiAgICAgICAgICBpZiAoY2FuZGlkYXRlIGluc3RhbmNlb2YgUGF0aE1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgYXV4UGFyZW50SW5zdHJ1Y3Rpb25zOiBJbnN0cnVjdGlvbltdID1cbiAgICAgICAgICAgICAgICBhbmNlc3Rvckluc3RydWN0aW9ucy5sZW5ndGggPiAwID8gW0xpc3RXcmFwcGVyLmxhc3QoYW5jZXN0b3JJbnN0cnVjdGlvbnMpXSA6IFtdO1xuICAgICAgICAgICAgdmFyIGF1eEluc3RydWN0aW9ucyA9XG4gICAgICAgICAgICAgICAgdGhpcy5fYXV4Um91dGVzVG9VbnJlc29sdmVkKGNhbmRpZGF0ZS5yZW1haW5pbmdBdXgsIGF1eFBhcmVudEluc3RydWN0aW9ucyk7XG5cbiAgICAgICAgICAgIHZhciBpbnN0cnVjdGlvbiA9IG5ldyBSZXNvbHZlZEluc3RydWN0aW9uKGNhbmRpZGF0ZS5pbnN0cnVjdGlvbiwgbnVsbCwgYXV4SW5zdHJ1Y3Rpb25zKTtcblxuICAgICAgICAgICAgaWYgKGlzQmxhbmsoY2FuZGlkYXRlLmluc3RydWN0aW9uKSB8fCBjYW5kaWRhdGUuaW5zdHJ1Y3Rpb24udGVybWluYWwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGluc3RydWN0aW9uO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbmV3QW5jZXN0b3JJbnN0cnVjdGlvbnM6IEluc3RydWN0aW9uW10gPSBhbmNlc3Rvckluc3RydWN0aW9ucy5jb25jYXQoW2luc3RydWN0aW9uXSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWNvZ25pemUoY2FuZGlkYXRlLnJlbWFpbmluZywgbmV3QW5jZXN0b3JJbnN0cnVjdGlvbnMpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGNoaWxkSW5zdHJ1Y3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChpc0JsYW5rKGNoaWxkSW5zdHJ1Y3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAvLyByZWRpcmVjdCBpbnN0cnVjdGlvbnMgYXJlIGFscmVhZHkgYWJzb2x1dGVcbiAgICAgICAgICAgICAgICAgIGlmIChjaGlsZEluc3RydWN0aW9uIGluc3RhbmNlb2YgUmVkaXJlY3RJbnN0cnVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2hpbGRJbnN0cnVjdGlvbjtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGluc3RydWN0aW9uLmNoaWxkID0gY2hpbGRJbnN0cnVjdGlvbjtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBpbnN0cnVjdGlvbjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY2FuZGlkYXRlIGluc3RhbmNlb2YgUmVkaXJlY3RNYXRjaCkge1xuICAgICAgICAgICAgdmFyIGluc3RydWN0aW9uID1cbiAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlKGNhbmRpZGF0ZS5yZWRpcmVjdFRvLCBhbmNlc3Rvckluc3RydWN0aW9ucy5jb25jYXQoW251bGxdKSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlZGlyZWN0SW5zdHJ1Y3Rpb24oaW5zdHJ1Y3Rpb24uY29tcG9uZW50LCBpbnN0cnVjdGlvbi5jaGlsZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbi5hdXhJbnN0cnVjdGlvbiwgY2FuZGlkYXRlLnNwZWNpZmljaXR5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcblxuICAgIGlmICgoaXNCbGFuayhwYXJzZWRVcmwpIHx8IHBhcnNlZFVybC5wYXRoID09ICcnKSAmJiBwb3NzaWJsZU1hdGNoZXMubGVuZ3RoID09IDApIHtcbiAgICAgIHJldHVybiBQcm9taXNlV3JhcHBlci5yZXNvbHZlKHRoaXMuZ2VuZXJhdGVEZWZhdWx0KHBhcmVudENvbXBvbmVudCkpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlV3JhcHBlci5hbGw8SW5zdHJ1Y3Rpb24+KG1hdGNoUHJvbWlzZXMpLnRoZW4obW9zdFNwZWNpZmljKTtcbiAgfVxuXG4gIHByaXZhdGUgX2F1eFJvdXRlc1RvVW5yZXNvbHZlZChhdXhSb3V0ZXM6IFVybFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50SW5zdHJ1Y3Rpb25zOiBJbnN0cnVjdGlvbltdKToge1trZXk6IHN0cmluZ106IEluc3RydWN0aW9ufSB7XG4gICAgdmFyIHVucmVzb2x2ZWRBdXhJbnN0cnVjdGlvbnM6IHtba2V5OiBzdHJpbmddOiBJbnN0cnVjdGlvbn0gPSB7fTtcblxuICAgIGF1eFJvdXRlcy5mb3JFYWNoKChhdXhVcmw6IFVybCkgPT4ge1xuICAgICAgdW5yZXNvbHZlZEF1eEluc3RydWN0aW9uc1thdXhVcmwucGF0aF0gPSBuZXcgVW5yZXNvbHZlZEluc3RydWN0aW9uKFxuICAgICAgICAgICgpID0+IHsgcmV0dXJuIHRoaXMuX3JlY29nbml6ZShhdXhVcmwsIHBhcmVudEluc3RydWN0aW9ucywgdHJ1ZSk7IH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHVucmVzb2x2ZWRBdXhJbnN0cnVjdGlvbnM7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBHaXZlbiBhIG5vcm1hbGl6ZWQgbGlzdCB3aXRoIGNvbXBvbmVudCBuYW1lcyBhbmQgcGFyYW1zIGxpa2U6IGBbJ3VzZXInLCB7aWQ6IDMgfV1gXG4gICAqIGdlbmVyYXRlcyBhIHVybCB3aXRoIGEgbGVhZGluZyBzbGFzaCByZWxhdGl2ZSB0byB0aGUgcHJvdmlkZWQgYHBhcmVudENvbXBvbmVudGAuXG4gICAqXG4gICAqIElmIHRoZSBvcHRpb25hbCBwYXJhbSBgX2F1eGAgaXMgYHRydWVgLCB0aGVuIHdlIGdlbmVyYXRlIHN0YXJ0aW5nIGF0IGFuIGF1eGlsaWFyeVxuICAgKiByb3V0ZSBib3VuZGFyeS5cbiAgICovXG4gIGdlbmVyYXRlKGxpbmtQYXJhbXM6IGFueVtdLCBhbmNlc3Rvckluc3RydWN0aW9uczogSW5zdHJ1Y3Rpb25bXSwgX2F1eCA9IGZhbHNlKTogSW5zdHJ1Y3Rpb24ge1xuICAgIHZhciBwYXJhbXMgPSBzcGxpdEFuZEZsYXR0ZW5MaW5rUGFyYW1zKGxpbmtQYXJhbXMpO1xuICAgIHZhciBwcmV2SW5zdHJ1Y3Rpb247XG5cbiAgICAvLyBUaGUgZmlyc3Qgc2VnbWVudCBzaG91bGQgYmUgZWl0aGVyICcuJyAoZ2VuZXJhdGUgZnJvbSBwYXJlbnQpIG9yICcnIChnZW5lcmF0ZSBmcm9tIHJvb3QpLlxuICAgIC8vIFdoZW4gd2Ugbm9ybWFsaXplIGFib3ZlLCB3ZSBzdHJpcCBhbGwgdGhlIHNsYXNoZXMsICcuLycgYmVjb21lcyAnLicgYW5kICcvJyBiZWNvbWVzICcnLlxuICAgIGlmIChMaXN0V3JhcHBlci5maXJzdChwYXJhbXMpID09ICcnKSB7XG4gICAgICBwYXJhbXMuc2hpZnQoKTtcbiAgICAgIHByZXZJbnN0cnVjdGlvbiA9IExpc3RXcmFwcGVyLmZpcnN0KGFuY2VzdG9ySW5zdHJ1Y3Rpb25zKTtcbiAgICAgIGFuY2VzdG9ySW5zdHJ1Y3Rpb25zID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHByZXZJbnN0cnVjdGlvbiA9IGFuY2VzdG9ySW5zdHJ1Y3Rpb25zLmxlbmd0aCA+IDAgPyBhbmNlc3Rvckluc3RydWN0aW9ucy5wb3AoKSA6IG51bGw7XG5cbiAgICAgIGlmIChMaXN0V3JhcHBlci5maXJzdChwYXJhbXMpID09ICcuJykge1xuICAgICAgICBwYXJhbXMuc2hpZnQoKTtcbiAgICAgIH0gZWxzZSBpZiAoTGlzdFdyYXBwZXIuZmlyc3QocGFyYW1zKSA9PSAnLi4nKSB7XG4gICAgICAgIHdoaWxlIChMaXN0V3JhcHBlci5maXJzdChwYXJhbXMpID09ICcuLicpIHtcbiAgICAgICAgICBpZiAoYW5jZXN0b3JJbnN0cnVjdGlvbnMubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFxuICAgICAgICAgICAgICAgIGBMaW5rIFwiJHtMaXN0V3JhcHBlci50b0pTT04obGlua1BhcmFtcyl9XCIgaGFzIHRvbyBtYW55IFwiLi4vXCIgc2VnbWVudHMuYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHByZXZJbnN0cnVjdGlvbiA9IGFuY2VzdG9ySW5zdHJ1Y3Rpb25zLnBvcCgpO1xuICAgICAgICAgIHBhcmFtcyA9IExpc3RXcmFwcGVyLnNsaWNlKHBhcmFtcywgMSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB3ZSdyZSBvbiB0byBpbXBsaWNpdCBjaGlsZC9zaWJsaW5nIHJvdXRlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyB3ZSBtdXN0IG9ubHkgcGVhayBhdCB0aGUgbGluayBwYXJhbSwgYW5kIG5vdCBjb25zdW1lIGl0XG4gICAgICAgIGxldCByb3V0ZU5hbWUgPSBMaXN0V3JhcHBlci5maXJzdChwYXJhbXMpO1xuICAgICAgICBsZXQgcGFyZW50Q29tcG9uZW50VHlwZSA9IHRoaXMuX3Jvb3RDb21wb25lbnQ7XG4gICAgICAgIGxldCBncmFuZHBhcmVudENvbXBvbmVudFR5cGUgPSBudWxsO1xuXG4gICAgICAgIGlmIChhbmNlc3Rvckluc3RydWN0aW9ucy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgbGV0IHBhcmVudENvbXBvbmVudEluc3RydWN0aW9uID0gYW5jZXN0b3JJbnN0cnVjdGlvbnNbYW5jZXN0b3JJbnN0cnVjdGlvbnMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgbGV0IGdyYW5kQ29tcG9uZW50SW5zdHJ1Y3Rpb24gPSBhbmNlc3Rvckluc3RydWN0aW9uc1thbmNlc3Rvckluc3RydWN0aW9ucy5sZW5ndGggLSAyXTtcblxuICAgICAgICAgIHBhcmVudENvbXBvbmVudFR5cGUgPSBwYXJlbnRDb21wb25lbnRJbnN0cnVjdGlvbi5jb21wb25lbnQuY29tcG9uZW50VHlwZTtcbiAgICAgICAgICBncmFuZHBhcmVudENvbXBvbmVudFR5cGUgPSBncmFuZENvbXBvbmVudEluc3RydWN0aW9uLmNvbXBvbmVudC5jb21wb25lbnRUeXBlO1xuICAgICAgICB9IGVsc2UgaWYgKGFuY2VzdG9ySW5zdHJ1Y3Rpb25zLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgcGFyZW50Q29tcG9uZW50VHlwZSA9IGFuY2VzdG9ySW5zdHJ1Y3Rpb25zWzBdLmNvbXBvbmVudC5jb21wb25lbnRUeXBlO1xuICAgICAgICAgIGdyYW5kcGFyZW50Q29tcG9uZW50VHlwZSA9IHRoaXMuX3Jvb3RDb21wb25lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGb3IgYSBsaW5rIHdpdGggbm8gbGVhZGluZyBgLi9gLCBgL2AsIG9yIGAuLi9gLCB3ZSBsb29rIGZvciBhIHNpYmxpbmcgYW5kIGNoaWxkLlxuICAgICAgICAvLyBJZiBib3RoIGV4aXN0LCB3ZSB0aHJvdy4gT3RoZXJ3aXNlLCB3ZSBwcmVmZXIgd2hpY2hldmVyIGV4aXN0cy5cbiAgICAgICAgdmFyIGNoaWxkUm91dGVFeGlzdHMgPSB0aGlzLmhhc1JvdXRlKHJvdXRlTmFtZSwgcGFyZW50Q29tcG9uZW50VHlwZSk7XG4gICAgICAgIHZhciBwYXJlbnRSb3V0ZUV4aXN0cyA9IGlzUHJlc2VudChncmFuZHBhcmVudENvbXBvbmVudFR5cGUpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzUm91dGUocm91dGVOYW1lLCBncmFuZHBhcmVudENvbXBvbmVudFR5cGUpO1xuXG4gICAgICAgIGlmIChwYXJlbnRSb3V0ZUV4aXN0cyAmJiBjaGlsZFJvdXRlRXhpc3RzKSB7XG4gICAgICAgICAgbGV0IG1zZyA9XG4gICAgICAgICAgICAgIGBMaW5rIFwiJHtMaXN0V3JhcHBlci50b0pTT04obGlua1BhcmFtcyl9XCIgaXMgYW1iaWd1b3VzLCB1c2UgXCIuL1wiIG9yIFwiLi4vXCIgdG8gZGlzYW1iaWd1YXRlLmA7XG4gICAgICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24obXNnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJlbnRSb3V0ZUV4aXN0cykge1xuICAgICAgICAgIHByZXZJbnN0cnVjdGlvbiA9IGFuY2VzdG9ySW5zdHJ1Y3Rpb25zLnBvcCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtc1twYXJhbXMubGVuZ3RoIC0gMV0gPT0gJycpIHtcbiAgICAgIHBhcmFtcy5wb3AoKTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zLmxlbmd0aCA+IDAgJiYgcGFyYW1zWzBdID09ICcnKSB7XG4gICAgICBwYXJhbXMuc2hpZnQoKTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zLmxlbmd0aCA8IDEpIHtcbiAgICAgIGxldCBtc2cgPSBgTGluayBcIiR7TGlzdFdyYXBwZXIudG9KU09OKGxpbmtQYXJhbXMpfVwiIG11c3QgaW5jbHVkZSBhIHJvdXRlIG5hbWUuYDtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKG1zZyk7XG4gICAgfVxuXG4gICAgdmFyIGdlbmVyYXRlZEluc3RydWN0aW9uID1cbiAgICAgICAgdGhpcy5fZ2VuZXJhdGUocGFyYW1zLCBhbmNlc3Rvckluc3RydWN0aW9ucywgcHJldkluc3RydWN0aW9uLCBfYXV4LCBsaW5rUGFyYW1zKTtcblxuICAgIC8vIHdlIGRvbid0IGNsb25lIHRoZSBmaXJzdCAocm9vdCkgZWxlbWVudFxuICAgIGZvciAodmFyIGkgPSBhbmNlc3Rvckluc3RydWN0aW9ucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgbGV0IGFuY2VzdG9ySW5zdHJ1Y3Rpb24gPSBhbmNlc3Rvckluc3RydWN0aW9uc1tpXTtcbiAgICAgIGlmIChpc0JsYW5rKGFuY2VzdG9ySW5zdHJ1Y3Rpb24pKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZ2VuZXJhdGVkSW5zdHJ1Y3Rpb24gPSBhbmNlc3Rvckluc3RydWN0aW9uLnJlcGxhY2VDaGlsZChnZW5lcmF0ZWRJbnN0cnVjdGlvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdlbmVyYXRlZEluc3RydWN0aW9uO1xuICB9XG5cblxuICAvKlxuICAgKiBJbnRlcm5hbCBoZWxwZXIgdGhhdCBkb2VzIG5vdCBtYWtlIGFueSBhc3NlcnRpb25zIGFib3V0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGxpbmsgRFNMLlxuICAgKiBgYW5jZXN0b3JJbnN0cnVjdGlvbnNgIGFyZSBwYXJlbnRzIHRoYXQgd2lsbCBiZSBjbG9uZWQuXG4gICAqIGBwcmV2SW5zdHJ1Y3Rpb25gIGlzIHRoZSBleGlzdGluZyBpbnN0cnVjdGlvbiB0aGF0IHdvdWxkIGJlIHJlcGxhY2VkLCBidXQgd2hpY2ggbWlnaHQgaGF2ZVxuICAgKiBhdXggcm91dGVzIHRoYXQgbmVlZCB0byBiZSBjbG9uZWQuXG4gICAqL1xuICBwcml2YXRlIF9nZW5lcmF0ZShsaW5rUGFyYW1zOiBhbnlbXSwgYW5jZXN0b3JJbnN0cnVjdGlvbnM6IEluc3RydWN0aW9uW10sXG4gICAgICAgICAgICAgICAgICAgIHByZXZJbnN0cnVjdGlvbjogSW5zdHJ1Y3Rpb24sIF9hdXggPSBmYWxzZSwgX29yaWdpbmFsTGluazogYW55W10pOiBJbnN0cnVjdGlvbiB7XG4gICAgbGV0IHBhcmVudENvbXBvbmVudFR5cGUgPSB0aGlzLl9yb290Q29tcG9uZW50O1xuICAgIGxldCBjb21wb25lbnRJbnN0cnVjdGlvbiA9IG51bGw7XG4gICAgbGV0IGF1eEluc3RydWN0aW9uczoge1trZXk6IHN0cmluZ106IEluc3RydWN0aW9ufSA9IHt9O1xuXG4gICAgbGV0IHBhcmVudEluc3RydWN0aW9uOiBJbnN0cnVjdGlvbiA9IExpc3RXcmFwcGVyLmxhc3QoYW5jZXN0b3JJbnN0cnVjdGlvbnMpO1xuICAgIGlmIChpc1ByZXNlbnQocGFyZW50SW5zdHJ1Y3Rpb24pICYmIGlzUHJlc2VudChwYXJlbnRJbnN0cnVjdGlvbi5jb21wb25lbnQpKSB7XG4gICAgICBwYXJlbnRDb21wb25lbnRUeXBlID0gcGFyZW50SW5zdHJ1Y3Rpb24uY29tcG9uZW50LmNvbXBvbmVudFR5cGU7XG4gICAgfVxuXG4gICAgaWYgKGxpbmtQYXJhbXMubGVuZ3RoID09IDApIHtcbiAgICAgIGxldCBkZWZhdWx0SW5zdHJ1Y3Rpb24gPSB0aGlzLmdlbmVyYXRlRGVmYXVsdChwYXJlbnRDb21wb25lbnRUeXBlKTtcbiAgICAgIGlmIChpc0JsYW5rKGRlZmF1bHRJbnN0cnVjdGlvbikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgICAgICBgTGluayBcIiR7TGlzdFdyYXBwZXIudG9KU09OKF9vcmlnaW5hbExpbmspfVwiIGRvZXMgbm90IHJlc29sdmUgdG8gYSB0ZXJtaW5hbCBpbnN0cnVjdGlvbi5gKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkZWZhdWx0SW5zdHJ1Y3Rpb247XG4gICAgfVxuXG4gICAgLy8gZm9yIG5vbi1hdXggcm91dGVzLCB3ZSB3YW50IHRvIHJldXNlIHRoZSBwcmVkZWNlc3NvcidzIGV4aXN0aW5nIHByaW1hcnkgYW5kIGF1eCByb3V0ZXNcbiAgICAvLyBhbmQgb25seSBvdmVycmlkZSByb3V0ZXMgZm9yIHdoaWNoIHRoZSBnaXZlbiBsaW5rIERTTCBwcm92aWRlc1xuICAgIGlmIChpc1ByZXNlbnQocHJldkluc3RydWN0aW9uKSAmJiAhX2F1eCkge1xuICAgICAgYXV4SW5zdHJ1Y3Rpb25zID0gU3RyaW5nTWFwV3JhcHBlci5tZXJnZShwcmV2SW5zdHJ1Y3Rpb24uYXV4SW5zdHJ1Y3Rpb24sIGF1eEluc3RydWN0aW9ucyk7XG4gICAgICBjb21wb25lbnRJbnN0cnVjdGlvbiA9IHByZXZJbnN0cnVjdGlvbi5jb21wb25lbnQ7XG4gICAgfVxuXG4gICAgdmFyIHJ1bGVzID0gdGhpcy5fcnVsZXMuZ2V0KHBhcmVudENvbXBvbmVudFR5cGUpO1xuICAgIGlmIChpc0JsYW5rKHJ1bGVzKSkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgICAgYENvbXBvbmVudCBcIiR7Z2V0VHlwZU5hbWVGb3JEZWJ1Z2dpbmcocGFyZW50Q29tcG9uZW50VHlwZSl9XCIgaGFzIG5vIHJvdXRlIGNvbmZpZy5gKTtcbiAgICB9XG5cbiAgICBsZXQgbGlua1BhcmFtSW5kZXggPSAwO1xuICAgIGxldCByb3V0ZVBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0gPSB7fTtcblxuICAgIC8vIGZpcnN0LCByZWNvZ25pemUgdGhlIHByaW1hcnkgcm91dGUgaWYgb25lIGlzIHByb3ZpZGVkXG4gICAgaWYgKGxpbmtQYXJhbUluZGV4IDwgbGlua1BhcmFtcy5sZW5ndGggJiYgaXNTdHJpbmcobGlua1BhcmFtc1tsaW5rUGFyYW1JbmRleF0pKSB7XG4gICAgICBsZXQgcm91dGVOYW1lID0gbGlua1BhcmFtc1tsaW5rUGFyYW1JbmRleF07XG4gICAgICBpZiAocm91dGVOYW1lID09ICcnIHx8IHJvdXRlTmFtZSA9PSAnLicgfHwgcm91dGVOYW1lID09ICcuLicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYFwiJHtyb3V0ZU5hbWV9L1wiIGlzIG9ubHkgYWxsb3dlZCBhdCB0aGUgYmVnaW5uaW5nIG9mIGEgbGluayBEU0wuYCk7XG4gICAgICB9XG4gICAgICBsaW5rUGFyYW1JbmRleCArPSAxO1xuICAgICAgaWYgKGxpbmtQYXJhbUluZGV4IDwgbGlua1BhcmFtcy5sZW5ndGgpIHtcbiAgICAgICAgbGV0IGxpbmtQYXJhbSA9IGxpbmtQYXJhbXNbbGlua1BhcmFtSW5kZXhdO1xuICAgICAgICBpZiAoaXNTdHJpbmdNYXAobGlua1BhcmFtKSAmJiAhaXNBcnJheShsaW5rUGFyYW0pKSB7XG4gICAgICAgICAgcm91dGVQYXJhbXMgPSBsaW5rUGFyYW07XG4gICAgICAgICAgbGlua1BhcmFtSW5kZXggKz0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIHJvdXRlUmVjb2duaXplciA9IChfYXV4ID8gcnVsZXMuYXV4UnVsZXNCeU5hbWUgOiBydWxlcy5ydWxlc0J5TmFtZSkuZ2V0KHJvdXRlTmFtZSk7XG5cbiAgICAgIGlmIChpc0JsYW5rKHJvdXRlUmVjb2duaXplcikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgICAgICBgQ29tcG9uZW50IFwiJHtnZXRUeXBlTmFtZUZvckRlYnVnZ2luZyhwYXJlbnRDb21wb25lbnRUeXBlKX1cIiBoYXMgbm8gcm91dGUgbmFtZWQgXCIke3JvdXRlTmFtZX1cIi5gKTtcbiAgICAgIH1cblxuICAgICAgLy8gQ3JlYXRlIGFuIFwidW5yZXNvbHZlZCBpbnN0cnVjdGlvblwiIGZvciBhc3luYyByb3V0ZXNcbiAgICAgIC8vIHdlJ2xsIGZpZ3VyZSBvdXQgdGhlIHJlc3Qgb2YgdGhlIHJvdXRlIHdoZW4gd2UgcmVzb2x2ZSB0aGUgaW5zdHJ1Y3Rpb24gYW5kXG4gICAgICAvLyBwZXJmb3JtIGEgbmF2aWdhdGlvblxuICAgICAgaWYgKGlzQmxhbmsocm91dGVSZWNvZ25pemVyLmhhbmRsZXIuY29tcG9uZW50VHlwZSkpIHtcbiAgICAgICAgdmFyIGdlbmVyYXRlZFVybDogR2VuZXJhdGVkVXJsID0gcm91dGVSZWNvZ25pemVyLmdlbmVyYXRlQ29tcG9uZW50UGF0aFZhbHVlcyhyb3V0ZVBhcmFtcyk7XG4gICAgICAgIHJldHVybiBuZXcgVW5yZXNvbHZlZEluc3RydWN0aW9uKCgpID0+IHtcbiAgICAgICAgICByZXR1cm4gcm91dGVSZWNvZ25pemVyLmhhbmRsZXIucmVzb2x2ZUNvbXBvbmVudFR5cGUoKS50aGVuKChfKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2VuZXJhdGUobGlua1BhcmFtcywgYW5jZXN0b3JJbnN0cnVjdGlvbnMsIHByZXZJbnN0cnVjdGlvbiwgX2F1eCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfb3JpZ2luYWxMaW5rKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZ2VuZXJhdGVkVXJsLnVybFBhdGgsIGNvbnZlcnRVcmxQYXJhbXNUb0FycmF5KGdlbmVyYXRlZFVybC51cmxQYXJhbXMpKTtcbiAgICAgIH1cblxuICAgICAgY29tcG9uZW50SW5zdHJ1Y3Rpb24gPSBfYXV4ID8gcnVsZXMuZ2VuZXJhdGVBdXhpbGlhcnkocm91dGVOYW1lLCByb3V0ZVBhcmFtcykgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVsZXMuZ2VuZXJhdGUocm91dGVOYW1lLCByb3V0ZVBhcmFtcyk7XG4gICAgfVxuXG4gICAgLy8gTmV4dCwgcmVjb2duaXplIGF1eGlsaWFyeSBpbnN0cnVjdGlvbnMuXG4gICAgLy8gSWYgd2UgaGF2ZSBhbiBhbmNlc3RvciBpbnN0cnVjdGlvbiwgd2UgcHJlc2VydmUgd2hhdGV2ZXIgYXV4IHJvdXRlcyBhcmUgYWN0aXZlIGZyb20gaXQuXG4gICAgd2hpbGUgKGxpbmtQYXJhbUluZGV4IDwgbGlua1BhcmFtcy5sZW5ndGggJiYgaXNBcnJheShsaW5rUGFyYW1zW2xpbmtQYXJhbUluZGV4XSkpIHtcbiAgICAgIGxldCBhdXhQYXJlbnRJbnN0cnVjdGlvbjogSW5zdHJ1Y3Rpb25bXSA9IFtwYXJlbnRJbnN0cnVjdGlvbl07XG4gICAgICBsZXQgYXV4SW5zdHJ1Y3Rpb24gPSB0aGlzLl9nZW5lcmF0ZShsaW5rUGFyYW1zW2xpbmtQYXJhbUluZGV4XSwgYXV4UGFyZW50SW5zdHJ1Y3Rpb24sIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlLCBfb3JpZ2luYWxMaW5rKTtcblxuICAgICAgLy8gVE9ETzogdGhpcyB3aWxsIG5vdCB3b3JrIGZvciBhdXggcm91dGVzIHdpdGggcGFyYW1ldGVycyBvciBtdWx0aXBsZSBzZWdtZW50c1xuICAgICAgYXV4SW5zdHJ1Y3Rpb25zW2F1eEluc3RydWN0aW9uLmNvbXBvbmVudC51cmxQYXRoXSA9IGF1eEluc3RydWN0aW9uO1xuICAgICAgbGlua1BhcmFtSW5kZXggKz0gMTtcbiAgICB9XG5cbiAgICB2YXIgaW5zdHJ1Y3Rpb24gPSBuZXcgUmVzb2x2ZWRJbnN0cnVjdGlvbihjb21wb25lbnRJbnN0cnVjdGlvbiwgbnVsbCwgYXV4SW5zdHJ1Y3Rpb25zKTtcblxuICAgIC8vIElmIHRoZSBjb21wb25lbnQgaXMgc3luYywgd2UgY2FuIGdlbmVyYXRlIHJlc29sdmVkIGNoaWxkIHJvdXRlIGluc3RydWN0aW9uc1xuICAgIC8vIElmIG5vdCwgd2UnbGwgcmVzb2x2ZSB0aGUgaW5zdHJ1Y3Rpb25zIGF0IG5hdmlnYXRpb24gdGltZVxuICAgIGlmIChpc1ByZXNlbnQoY29tcG9uZW50SW5zdHJ1Y3Rpb24pICYmIGlzUHJlc2VudChjb21wb25lbnRJbnN0cnVjdGlvbi5jb21wb25lbnRUeXBlKSkge1xuICAgICAgbGV0IGNoaWxkSW5zdHJ1Y3Rpb246IEluc3RydWN0aW9uID0gbnVsbDtcbiAgICAgIGlmIChjb21wb25lbnRJbnN0cnVjdGlvbi50ZXJtaW5hbCkge1xuICAgICAgICBpZiAobGlua1BhcmFtSW5kZXggPj0gbGlua1BhcmFtcy5sZW5ndGgpIHtcbiAgICAgICAgICAvLyBUT0RPOiB0aHJvdyB0aGF0IHRoZXJlIGFyZSBleHRyYSBsaW5rIHBhcmFtcyBiZXlvbmQgdGhlIHRlcm1pbmFsIGNvbXBvbmVudFxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgY2hpbGRBbmNlc3RvckNvbXBvbmVudHM6IEluc3RydWN0aW9uW10gPSBhbmNlc3Rvckluc3RydWN0aW9ucy5jb25jYXQoW2luc3RydWN0aW9uXSk7XG4gICAgICAgIGxldCByZW1haW5pbmdMaW5rUGFyYW1zID0gbGlua1BhcmFtcy5zbGljZShsaW5rUGFyYW1JbmRleCk7XG4gICAgICAgIGNoaWxkSW5zdHJ1Y3Rpb24gPSB0aGlzLl9nZW5lcmF0ZShyZW1haW5pbmdMaW5rUGFyYW1zLCBjaGlsZEFuY2VzdG9yQ29tcG9uZW50cywgbnVsbCwgZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfb3JpZ2luYWxMaW5rKTtcbiAgICAgIH1cbiAgICAgIGluc3RydWN0aW9uLmNoaWxkID0gY2hpbGRJbnN0cnVjdGlvbjtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5zdHJ1Y3Rpb247XG4gIH1cblxuICBwdWJsaWMgaGFzUm91dGUobmFtZTogc3RyaW5nLCBwYXJlbnRDb21wb25lbnQ6IGFueSk6IGJvb2xlYW4ge1xuICAgIHZhciBydWxlcyA9IHRoaXMuX3J1bGVzLmdldChwYXJlbnRDb21wb25lbnQpO1xuICAgIGlmIChpc0JsYW5rKHJ1bGVzKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gcnVsZXMuaGFzUm91dGUobmFtZSk7XG4gIH1cblxuICBwdWJsaWMgZ2VuZXJhdGVEZWZhdWx0KGNvbXBvbmVudEN1cnNvcjogVHlwZSk6IEluc3RydWN0aW9uIHtcbiAgICBpZiAoaXNCbGFuayhjb21wb25lbnRDdXJzb3IpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgcnVsZXMgPSB0aGlzLl9ydWxlcy5nZXQoY29tcG9uZW50Q3Vyc29yKTtcbiAgICBpZiAoaXNCbGFuayhydWxlcykgfHwgaXNCbGFuayhydWxlcy5kZWZhdWx0UnVsZSkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0Q2hpbGQgPSBudWxsO1xuICAgIGlmIChpc1ByZXNlbnQocnVsZXMuZGVmYXVsdFJ1bGUuaGFuZGxlci5jb21wb25lbnRUeXBlKSkge1xuICAgICAgdmFyIGNvbXBvbmVudEluc3RydWN0aW9uID0gcnVsZXMuZGVmYXVsdFJ1bGUuZ2VuZXJhdGUoe30pO1xuICAgICAgaWYgKCFydWxlcy5kZWZhdWx0UnVsZS50ZXJtaW5hbCkge1xuICAgICAgICBkZWZhdWx0Q2hpbGQgPSB0aGlzLmdlbmVyYXRlRGVmYXVsdChydWxlcy5kZWZhdWx0UnVsZS5oYW5kbGVyLmNvbXBvbmVudFR5cGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBEZWZhdWx0SW5zdHJ1Y3Rpb24oY29tcG9uZW50SW5zdHJ1Y3Rpb24sIGRlZmF1bHRDaGlsZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBVbnJlc29sdmVkSW5zdHJ1Y3Rpb24oKCkgPT4ge1xuICAgICAgcmV0dXJuIHJ1bGVzLmRlZmF1bHRSdWxlLmhhbmRsZXIucmVzb2x2ZUNvbXBvbmVudFR5cGUoKS50aGVuKFxuICAgICAgICAgIChfKSA9PiB0aGlzLmdlbmVyYXRlRGVmYXVsdChjb21wb25lbnRDdXJzb3IpKTtcbiAgICB9KTtcbiAgfVxufVxuXG4vKlxuICogR2l2ZW46IFsnL2EvYicsIHtjOiAyfV1cbiAqIFJldHVybnM6IFsnJywgJ2EnLCAnYicsIHtjOiAyfV1cbiAqL1xuZnVuY3Rpb24gc3BsaXRBbmRGbGF0dGVuTGlua1BhcmFtcyhsaW5rUGFyYW1zOiBhbnlbXSkge1xuICB2YXIgYWNjdW11bGF0aW9uID0gW107XG4gIGxpbmtQYXJhbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtOiBhbnkpIHtcbiAgICBpZiAoaXNTdHJpbmcoaXRlbSkpIHtcbiAgICAgIHZhciBzdHJJdGVtOiBzdHJpbmcgPSA8c3RyaW5nPml0ZW07XG4gICAgICBhY2N1bXVsYXRpb24gPSBhY2N1bXVsYXRpb24uY29uY2F0KHN0ckl0ZW0uc3BsaXQoJy8nKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjY3VtdWxhdGlvbi5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhY2N1bXVsYXRpb247XG59XG5cblxuLypcbiAqIEdpdmVuIGEgbGlzdCBvZiBpbnN0cnVjdGlvbnMsIHJldHVybnMgdGhlIG1vc3Qgc3BlY2lmaWMgaW5zdHJ1Y3Rpb25cbiAqL1xuZnVuY3Rpb24gbW9zdFNwZWNpZmljKGluc3RydWN0aW9uczogSW5zdHJ1Y3Rpb25bXSk6IEluc3RydWN0aW9uIHtcbiAgaW5zdHJ1Y3Rpb25zID0gaW5zdHJ1Y3Rpb25zLmZpbHRlcigoaW5zdHJ1Y3Rpb24pID0+IGlzUHJlc2VudChpbnN0cnVjdGlvbikpO1xuICBpZiAoaW5zdHJ1Y3Rpb25zLmxlbmd0aCA9PSAwKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKGluc3RydWN0aW9ucy5sZW5ndGggPT0gMSkge1xuICAgIHJldHVybiBpbnN0cnVjdGlvbnNbMF07XG4gIH1cbiAgdmFyIGZpcnN0ID0gaW5zdHJ1Y3Rpb25zWzBdO1xuICB2YXIgcmVzdCA9IGluc3RydWN0aW9ucy5zbGljZSgxKTtcbiAgcmV0dXJuIHJlc3QucmVkdWNlKChpbnN0cnVjdGlvbjogSW5zdHJ1Y3Rpb24sIGNvbnRlbmRlcjogSW5zdHJ1Y3Rpb24pID0+IHtcbiAgICBpZiAoY29tcGFyZVNwZWNpZmljaXR5U3RyaW5ncyhjb250ZW5kZXIuc3BlY2lmaWNpdHksIGluc3RydWN0aW9uLnNwZWNpZmljaXR5KSA9PSAtMSkge1xuICAgICAgcmV0dXJuIGNvbnRlbmRlcjtcbiAgICB9XG4gICAgcmV0dXJuIGluc3RydWN0aW9uO1xuICB9LCBmaXJzdCk7XG59XG5cbi8qXG4gKiBFeHBlY3RzIHN0cmluZ3MgdG8gYmUgaW4gdGhlIGZvcm0gb2YgXCJbMC0yXStcIlxuICogUmV0dXJucyAtMSBpZiBzdHJpbmcgQSBzaG91bGQgYmUgc29ydGVkIGFib3ZlIHN0cmluZyBCLCAxIGlmIGl0IHNob3VsZCBiZSBzb3J0ZWQgYWZ0ZXIsXG4gKiBvciAwIGlmIHRoZXkgYXJlIHRoZSBzYW1lLlxuICovXG5mdW5jdGlvbiBjb21wYXJlU3BlY2lmaWNpdHlTdHJpbmdzKGE6IHN0cmluZywgYjogc3RyaW5nKTogbnVtYmVyIHtcbiAgdmFyIGwgPSBNYXRoLm1pbihhLmxlbmd0aCwgYi5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGw7IGkgKz0gMSkge1xuICAgIHZhciBhaSA9IFN0cmluZ1dyYXBwZXIuY2hhckNvZGVBdChhLCBpKTtcbiAgICB2YXIgYmkgPSBTdHJpbmdXcmFwcGVyLmNoYXJDb2RlQXQoYiwgaSk7XG4gICAgdmFyIGRpZmZlcmVuY2UgPSBiaSAtIGFpO1xuICAgIGlmIChkaWZmZXJlbmNlICE9IDApIHtcbiAgICAgIHJldHVybiBkaWZmZXJlbmNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYS5sZW5ndGggLSBiLmxlbmd0aDtcbn1cblxuZnVuY3Rpb24gYXNzZXJ0VGVybWluYWxDb21wb25lbnQoY29tcG9uZW50LCBwYXRoKSB7XG4gIGlmICghaXNUeXBlKGNvbXBvbmVudCkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgYW5ub3RhdGlvbnMgPSByZWZsZWN0b3IuYW5ub3RhdGlvbnMoY29tcG9uZW50KTtcbiAgaWYgKGlzUHJlc2VudChhbm5vdGF0aW9ucykpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFubm90YXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgYW5ub3RhdGlvbiA9IGFubm90YXRpb25zW2ldO1xuXG4gICAgICBpZiAoYW5ub3RhdGlvbiBpbnN0YW5jZW9mIFJvdXRlQ29uZmlnKSB7XG4gICAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFxuICAgICAgICAgICAgYENoaWxkIHJvdXRlcyBhcmUgbm90IGFsbG93ZWQgZm9yIFwiJHtwYXRofVwiLiBVc2UgXCIuLi5cIiBvbiB0aGUgcGFyZW50J3Mgcm91dGUgcGF0aC5gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
