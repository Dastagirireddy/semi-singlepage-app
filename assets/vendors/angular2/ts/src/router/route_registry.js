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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvcm91dGVfcmVnaXN0cnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztRQXlDSSxjQUFjLEVBcUNMLHdCQUF3QjtJQXNackM7OztPQUdHO0lBQ0gsbUNBQW1DLFVBQWlCO1FBQ2xELElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN0QixVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVMsSUFBUztZQUNuQyxFQUFFLENBQUMsQ0FBQyxlQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixJQUFJLE9BQU8sR0FBbUIsSUFBSSxDQUFDO2dCQUNuQyxZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDekQsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLFlBQVksQ0FBQztJQUN0QixDQUFDO0lBR0Q7O09BRUc7SUFDSCxzQkFBc0IsWUFBMkI7UUFDL0MsWUFBWSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBQyxXQUFXLElBQUssT0FBQSxnQkFBUyxDQUFDLFdBQVcsQ0FBQyxFQUF0QixDQUFzQixDQUFDLENBQUM7UUFDNUUsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsQ0FBQztRQUNELElBQUksS0FB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O3dCQUNELE1BQU0sQ0FBQyxJQUFJLGdDQUFrQixDQUFDLG9CQUFvQixFQUFFLFlBQVksQ0FBQyxDQUFDO29CQUNwRSxDQUFDO29CQUVELE1BQU0sQ0FBQyxJQUFJLG1DQUFxQixDQUFDO3dCQUMvQixNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxJQUFJLENBQ3hELFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsRUFBckMsQ0FBcUMsQ0FBQyxDQUFDO29CQUNwRCxDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDO2dCQTFZSDtvQkFBQyxpQkFBVSxFQUFFOytCQUlFLGFBQU0sQ0FBQyx3QkFBd0IsQ0FBQzs7aUNBSmxDO2dCQTJZYixvQkFBQztZQUFELENBMVlBLEFBMFlDLElBQUE7WUExWUQseUNBMFlDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9yb3V0ZV9yZWdpc3RyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TGlzdFdyYXBwZXIsIE1hcCwgTWFwV3JhcHBlciwgU3RyaW5nTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7UHJvbWlzZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYXN5bmMnO1xuaW1wb3J0IHtcbiAgaXNQcmVzZW50LFxuICBpc0FycmF5LFxuICBpc0JsYW5rLFxuICBpc1R5cGUsXG4gIGlzU3RyaW5nLFxuICBpc1N0cmluZ01hcCxcbiAgVHlwZSxcbiAgU3RyaW5nV3JhcHBlcixcbiAgTWF0aCxcbiAgZ2V0VHlwZU5hbWVGb3JEZWJ1Z2dpbmcsXG4gIENPTlNUX0VYUFJcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbiwgV3JhcHBlZEV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7cmVmbGVjdG9yfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9yZWZsZWN0aW9uL3JlZmxlY3Rpb24nO1xuaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3QsIE9wYXF1ZVRva2VufSBmcm9tICdhbmd1bGFyMi9jb3JlJztcblxuaW1wb3J0IHtcbiAgUm91dGVDb25maWcsXG4gIEFzeW5jUm91dGUsXG4gIFJvdXRlLFxuICBBdXhSb3V0ZSxcbiAgUmVkaXJlY3QsXG4gIFJvdXRlRGVmaW5pdGlvblxufSBmcm9tICcuL3JvdXRlX2NvbmZpZy9yb3V0ZV9jb25maWdfaW1wbCc7XG5pbXBvcnQge1BhdGhNYXRjaCwgUmVkaXJlY3RNYXRjaCwgUm91dGVNYXRjaH0gZnJvbSAnLi9ydWxlcy9ydWxlcyc7XG5pbXBvcnQge1J1bGVTZXR9IGZyb20gJy4vcnVsZXMvcnVsZV9zZXQnO1xuaW1wb3J0IHtcbiAgSW5zdHJ1Y3Rpb24sXG4gIFJlc29sdmVkSW5zdHJ1Y3Rpb24sXG4gIFJlZGlyZWN0SW5zdHJ1Y3Rpb24sXG4gIFVucmVzb2x2ZWRJbnN0cnVjdGlvbixcbiAgRGVmYXVsdEluc3RydWN0aW9uXG59IGZyb20gJy4vaW5zdHJ1Y3Rpb24nO1xuXG5pbXBvcnQge25vcm1hbGl6ZVJvdXRlQ29uZmlnLCBhc3NlcnRDb21wb25lbnRFeGlzdHN9IGZyb20gJy4vcm91dGVfY29uZmlnL3JvdXRlX2NvbmZpZ19ub3JtYWxpemVyJztcbmltcG9ydCB7cGFyc2VyLCBVcmwsIGNvbnZlcnRVcmxQYXJhbXNUb0FycmF5LCBwYXRoU2VnbWVudHNUb1VybH0gZnJvbSAnLi91cmxfcGFyc2VyJztcbmltcG9ydCB7R2VuZXJhdGVkVXJsfSBmcm9tICcuL3J1bGVzL3JvdXRlX3BhdGhzL3JvdXRlX3BhdGgnO1xuXG52YXIgX3Jlc29sdmVUb051bGwgPSBQcm9taXNlV3JhcHBlci5yZXNvbHZlPEluc3RydWN0aW9uPihudWxsKTtcblxuLy8gQSBMaW5rSXRlbUFycmF5IGlzIGFuIGFycmF5LCB3aGljaCBkZXNjcmliZXMgYSBzZXQgb2Ygcm91dGVzXG4vLyBUaGUgaXRlbXMgaW4gdGhlIGFycmF5IGFyZSBmb3VuZCBpbiBncm91cHM6XG4vLyAtIHRoZSBmaXJzdCBpdGVtIGlzIHRoZSBuYW1lIG9mIHRoZSByb3V0ZVxuLy8gLSB0aGUgbmV4dCBpdGVtcyBhcmU6XG4vLyAgIC0gYW4gb2JqZWN0IGNvbnRhaW5pbmcgcGFyYW1ldGVyc1xuLy8gICAtIG9yIGFuIGFycmF5IGRlc2NyaWJpbmcgYW4gYXV4IHJvdXRlXG4vLyBleHBvcnQgdHlwZSBMaW5rUm91dGVJdGVtID0gc3RyaW5nIHwgT2JqZWN0O1xuLy8gZXhwb3J0IHR5cGUgTGlua0l0ZW0gPSBMaW5rUm91dGVJdGVtIHwgQXJyYXk8TGlua1JvdXRlSXRlbT47XG4vLyBleHBvcnQgdHlwZSBMaW5rSXRlbUFycmF5ID0gQXJyYXk8TGlua0l0ZW0+O1xuXG4vKipcbiAqIFRva2VuIHVzZWQgdG8gYmluZCB0aGUgY29tcG9uZW50IHdpdGggdGhlIHRvcC1sZXZlbCB7QGxpbmsgUm91dGVDb25maWd9cyBmb3IgdGhlXG4gKiBhcHBsaWNhdGlvbi5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvaVJVUDhCNU9VYnhDV1EzQWNJRG0pKVxuICpcbiAqIGBgYFxuICogaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuICogaW1wb3J0IHtcbiAqICAgUk9VVEVSX0RJUkVDVElWRVMsXG4gKiAgIFJPVVRFUl9QUk9WSURFUlMsXG4gKiAgIFJvdXRlQ29uZmlnXG4gKiB9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlcic7XG4gKlxuICogQENvbXBvbmVudCh7ZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTXX0pXG4gKiBAUm91dGVDb25maWcoW1xuICogIHsuLi59LFxuICogXSlcbiAqIGNsYXNzIEFwcENtcCB7XG4gKiAgIC8vIC4uLlxuICogfVxuICpcbiAqIGJvb3RzdHJhcChBcHBDbXAsIFtST1VURVJfUFJPVklERVJTXSk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNvbnN0IFJPVVRFUl9QUklNQVJZX0NPTVBPTkVOVDogT3BhcXVlVG9rZW4gPVxuICAgIENPTlNUX0VYUFIobmV3IE9wYXF1ZVRva2VuKCdSb3V0ZXJQcmltYXJ5Q29tcG9uZW50JykpO1xuXG5cbi8qKlxuICogVGhlIFJvdXRlUmVnaXN0cnkgaG9sZHMgcm91dGUgY29uZmlndXJhdGlvbnMgZm9yIGVhY2ggY29tcG9uZW50IGluIGFuIEFuZ3VsYXIgYXBwLlxuICogSXQgaXMgcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIEluc3RydWN0aW9ucyBmcm9tIFVSTHMsIGFuZCBnZW5lcmF0aW5nIFVSTHMgYmFzZWQgb24gcm91dGUgYW5kXG4gKiBwYXJhbWV0ZXJzLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUm91dGVSZWdpc3RyeSB7XG4gIHByaXZhdGUgX3J1bGVzID0gbmV3IE1hcDxhbnksIFJ1bGVTZXQ+KCk7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChST1VURVJfUFJJTUFSWV9DT01QT05FTlQpIHByaXZhdGUgX3Jvb3RDb21wb25lbnQ6IFR5cGUpIHt9XG5cbiAgLyoqXG4gICAqIEdpdmVuIGEgY29tcG9uZW50IGFuZCBhIGNvbmZpZ3VyYXRpb24gb2JqZWN0LCBhZGQgdGhlIHJvdXRlIHRvIHRoaXMgcmVnaXN0cnlcbiAgICovXG4gIGNvbmZpZyhwYXJlbnRDb21wb25lbnQ6IGFueSwgY29uZmlnOiBSb3V0ZURlZmluaXRpb24pOiB2b2lkIHtcbiAgICBjb25maWcgPSBub3JtYWxpemVSb3V0ZUNvbmZpZyhjb25maWcsIHRoaXMpO1xuXG4gICAgLy8gdGhpcyBpcyBoZXJlIGJlY2F1c2UgRGFydCB0eXBlIGd1YXJkIHJlYXNvbnNcbiAgICBpZiAoY29uZmlnIGluc3RhbmNlb2YgUm91dGUpIHtcbiAgICAgIGFzc2VydENvbXBvbmVudEV4aXN0cyhjb25maWcuY29tcG9uZW50LCBjb25maWcucGF0aCk7XG4gICAgfSBlbHNlIGlmIChjb25maWcgaW5zdGFuY2VvZiBBdXhSb3V0ZSkge1xuICAgICAgYXNzZXJ0Q29tcG9uZW50RXhpc3RzKGNvbmZpZy5jb21wb25lbnQsIGNvbmZpZy5wYXRoKTtcbiAgICB9XG5cbiAgICB2YXIgcnVsZXMgPSB0aGlzLl9ydWxlcy5nZXQocGFyZW50Q29tcG9uZW50KTtcblxuICAgIGlmIChpc0JsYW5rKHJ1bGVzKSkge1xuICAgICAgcnVsZXMgPSBuZXcgUnVsZVNldCgpO1xuICAgICAgdGhpcy5fcnVsZXMuc2V0KHBhcmVudENvbXBvbmVudCwgcnVsZXMpO1xuICAgIH1cblxuICAgIHZhciB0ZXJtaW5hbCA9IHJ1bGVzLmNvbmZpZyhjb25maWcpO1xuXG4gICAgaWYgKGNvbmZpZyBpbnN0YW5jZW9mIFJvdXRlKSB7XG4gICAgICBpZiAodGVybWluYWwpIHtcbiAgICAgICAgYXNzZXJ0VGVybWluYWxDb21wb25lbnQoY29uZmlnLmNvbXBvbmVudCwgY29uZmlnLnBhdGgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb25maWdGcm9tQ29tcG9uZW50KGNvbmZpZy5jb21wb25lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkcyB0aGUgYW5ub3RhdGlvbnMgb2YgYSBjb21wb25lbnQgYW5kIGNvbmZpZ3VyZXMgdGhlIHJlZ2lzdHJ5IGJhc2VkIG9uIHRoZW1cbiAgICovXG4gIGNvbmZpZ0Zyb21Db21wb25lbnQoY29tcG9uZW50OiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoIWlzVHlwZShjb21wb25lbnQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gRG9uJ3QgcmVhZCB0aGUgYW5ub3RhdGlvbnMgZnJvbSBhIHR5cGUgbW9yZSB0aGFuIG9uY2Ug4oCTXG4gICAgLy8gdGhpcyBwcmV2ZW50cyBhbiBpbmZpbml0ZSBsb29wIGlmIGEgY29tcG9uZW50IHJvdXRlcyByZWN1cnNpdmVseS5cbiAgICBpZiAodGhpcy5fcnVsZXMuaGFzKGNvbXBvbmVudCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGFubm90YXRpb25zID0gcmVmbGVjdG9yLmFubm90YXRpb25zKGNvbXBvbmVudCk7XG4gICAgaWYgKGlzUHJlc2VudChhbm5vdGF0aW9ucykpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYW5ub3RhdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGFubm90YXRpb24gPSBhbm5vdGF0aW9uc1tpXTtcblxuICAgICAgICBpZiAoYW5ub3RhdGlvbiBpbnN0YW5jZW9mIFJvdXRlQ29uZmlnKSB7XG4gICAgICAgICAgbGV0IHJvdXRlQ2ZnczogUm91dGVEZWZpbml0aW9uW10gPSBhbm5vdGF0aW9uLmNvbmZpZ3M7XG4gICAgICAgICAgcm91dGVDZmdzLmZvckVhY2goY29uZmlnID0+IHRoaXMuY29uZmlnKGNvbXBvbmVudCwgY29uZmlnKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBHaXZlbiBhIFVSTCBhbmQgYSBwYXJlbnQgY29tcG9uZW50LCByZXR1cm4gdGhlIG1vc3Qgc3BlY2lmaWMgaW5zdHJ1Y3Rpb24gZm9yIG5hdmlnYXRpbmdcbiAgICogdGhlIGFwcGxpY2F0aW9uIGludG8gdGhlIHN0YXRlIHNwZWNpZmllZCBieSB0aGUgdXJsXG4gICAqL1xuICByZWNvZ25pemUodXJsOiBzdHJpbmcsIGFuY2VzdG9ySW5zdHJ1Y3Rpb25zOiBJbnN0cnVjdGlvbltdKTogUHJvbWlzZTxJbnN0cnVjdGlvbj4ge1xuICAgIHZhciBwYXJzZWRVcmwgPSBwYXJzZXIucGFyc2UodXJsKTtcbiAgICByZXR1cm4gdGhpcy5fcmVjb2duaXplKHBhcnNlZFVybCwgW10pO1xuICB9XG5cblxuICAvKipcbiAgICogUmVjb2duaXplcyBhbGwgcGFyZW50LWNoaWxkIHJvdXRlcywgYnV0IGNyZWF0ZXMgdW5yZXNvbHZlZCBhdXhpbGlhcnkgcm91dGVzXG4gICAqL1xuICBwcml2YXRlIF9yZWNvZ25pemUocGFyc2VkVXJsOiBVcmwsIGFuY2VzdG9ySW5zdHJ1Y3Rpb25zOiBJbnN0cnVjdGlvbltdLFxuICAgICAgICAgICAgICAgICAgICAgX2F1eCA9IGZhbHNlKTogUHJvbWlzZTxJbnN0cnVjdGlvbj4ge1xuICAgIHZhciBwYXJlbnRJbnN0cnVjdGlvbiA9IExpc3RXcmFwcGVyLmxhc3QoYW5jZXN0b3JJbnN0cnVjdGlvbnMpO1xuICAgIHZhciBwYXJlbnRDb21wb25lbnQgPSBpc1ByZXNlbnQocGFyZW50SW5zdHJ1Y3Rpb24pID8gcGFyZW50SW5zdHJ1Y3Rpb24uY29tcG9uZW50LmNvbXBvbmVudFR5cGUgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm9vdENvbXBvbmVudDtcblxuICAgIHZhciBydWxlcyA9IHRoaXMuX3J1bGVzLmdldChwYXJlbnRDb21wb25lbnQpO1xuICAgIGlmIChpc0JsYW5rKHJ1bGVzKSkge1xuICAgICAgcmV0dXJuIF9yZXNvbHZlVG9OdWxsO1xuICAgIH1cblxuICAgIC8vIE1hdGNoZXMgc29tZSBiZWdpbm5pbmcgcGFydCBvZiB0aGUgZ2l2ZW4gVVJMXG4gICAgdmFyIHBvc3NpYmxlTWF0Y2hlczogUHJvbWlzZTxSb3V0ZU1hdGNoPltdID1cbiAgICAgICAgX2F1eCA/IHJ1bGVzLnJlY29nbml6ZUF1eGlsaWFyeShwYXJzZWRVcmwpIDogcnVsZXMucmVjb2duaXplKHBhcnNlZFVybCk7XG5cbiAgICB2YXIgbWF0Y2hQcm9taXNlczogUHJvbWlzZTxJbnN0cnVjdGlvbj5bXSA9IHBvc3NpYmxlTWF0Y2hlcy5tYXAoXG4gICAgICAgIChjYW5kaWRhdGU6IFByb21pc2U8Um91dGVNYXRjaD4pID0+IGNhbmRpZGF0ZS50aGVuKChjYW5kaWRhdGU6IFJvdXRlTWF0Y2gpID0+IHtcblxuICAgICAgICAgIGlmIChjYW5kaWRhdGUgaW5zdGFuY2VvZiBQYXRoTWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBhdXhQYXJlbnRJbnN0cnVjdGlvbnM6IEluc3RydWN0aW9uW10gPVxuICAgICAgICAgICAgICAgIGFuY2VzdG9ySW5zdHJ1Y3Rpb25zLmxlbmd0aCA+IDAgPyBbTGlzdFdyYXBwZXIubGFzdChhbmNlc3Rvckluc3RydWN0aW9ucyldIDogW107XG4gICAgICAgICAgICB2YXIgYXV4SW5zdHJ1Y3Rpb25zID1cbiAgICAgICAgICAgICAgICB0aGlzLl9hdXhSb3V0ZXNUb1VucmVzb2x2ZWQoY2FuZGlkYXRlLnJlbWFpbmluZ0F1eCwgYXV4UGFyZW50SW5zdHJ1Y3Rpb25zKTtcblxuICAgICAgICAgICAgdmFyIGluc3RydWN0aW9uID0gbmV3IFJlc29sdmVkSW5zdHJ1Y3Rpb24oY2FuZGlkYXRlLmluc3RydWN0aW9uLCBudWxsLCBhdXhJbnN0cnVjdGlvbnMpO1xuXG4gICAgICAgICAgICBpZiAoaXNCbGFuayhjYW5kaWRhdGUuaW5zdHJ1Y3Rpb24pIHx8IGNhbmRpZGF0ZS5pbnN0cnVjdGlvbi50ZXJtaW5hbCkge1xuICAgICAgICAgICAgICByZXR1cm4gaW5zdHJ1Y3Rpb247XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBuZXdBbmNlc3Rvckluc3RydWN0aW9uczogSW5zdHJ1Y3Rpb25bXSA9IGFuY2VzdG9ySW5zdHJ1Y3Rpb25zLmNvbmNhdChbaW5zdHJ1Y3Rpb25dKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlY29nbml6ZShjYW5kaWRhdGUucmVtYWluaW5nLCBuZXdBbmNlc3Rvckluc3RydWN0aW9ucylcbiAgICAgICAgICAgICAgICAudGhlbigoY2hpbGRJbnN0cnVjdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKGlzQmxhbmsoY2hpbGRJbnN0cnVjdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIC8vIHJlZGlyZWN0IGluc3RydWN0aW9ucyBhcmUgYWxyZWFkeSBhYnNvbHV0ZVxuICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkSW5zdHJ1Y3Rpb24gaW5zdGFuY2VvZiBSZWRpcmVjdEluc3RydWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjaGlsZEluc3RydWN0aW9uO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb24uY2hpbGQgPSBjaGlsZEluc3RydWN0aW9uO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGluc3RydWN0aW9uO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjYW5kaWRhdGUgaW5zdGFuY2VvZiBSZWRpcmVjdE1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaW5zdHJ1Y3Rpb24gPVxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGUoY2FuZGlkYXRlLnJlZGlyZWN0VG8sIGFuY2VzdG9ySW5zdHJ1Y3Rpb25zLmNvbmNhdChbbnVsbF0pKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVkaXJlY3RJbnN0cnVjdGlvbihpbnN0cnVjdGlvbi5jb21wb25lbnQsIGluc3RydWN0aW9uLmNoaWxkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RydWN0aW9uLmF1eEluc3RydWN0aW9uLCBjYW5kaWRhdGUuc3BlY2lmaWNpdHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuXG4gICAgaWYgKChpc0JsYW5rKHBhcnNlZFVybCkgfHwgcGFyc2VkVXJsLnBhdGggPT0gJycpICYmIHBvc3NpYmxlTWF0Y2hlcy5sZW5ndGggPT0gMCkge1xuICAgICAgcmV0dXJuIFByb21pc2VXcmFwcGVyLnJlc29sdmUodGhpcy5nZW5lcmF0ZURlZmF1bHQocGFyZW50Q29tcG9uZW50KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2VXcmFwcGVyLmFsbDxJbnN0cnVjdGlvbj4obWF0Y2hQcm9taXNlcykudGhlbihtb3N0U3BlY2lmaWMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXV4Um91dGVzVG9VbnJlc29sdmVkKGF1eFJvdXRlczogVXJsW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRJbnN0cnVjdGlvbnM6IEluc3RydWN0aW9uW10pOiB7W2tleTogc3RyaW5nXTogSW5zdHJ1Y3Rpb259IHtcbiAgICB2YXIgdW5yZXNvbHZlZEF1eEluc3RydWN0aW9uczoge1trZXk6IHN0cmluZ106IEluc3RydWN0aW9ufSA9IHt9O1xuXG4gICAgYXV4Um91dGVzLmZvckVhY2goKGF1eFVybDogVXJsKSA9PiB7XG4gICAgICB1bnJlc29sdmVkQXV4SW5zdHJ1Y3Rpb25zW2F1eFVybC5wYXRoXSA9IG5ldyBVbnJlc29sdmVkSW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgKCkgPT4geyByZXR1cm4gdGhpcy5fcmVjb2duaXplKGF1eFVybCwgcGFyZW50SW5zdHJ1Y3Rpb25zLCB0cnVlKTsgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdW5yZXNvbHZlZEF1eEluc3RydWN0aW9ucztcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEdpdmVuIGEgbm9ybWFsaXplZCBsaXN0IHdpdGggY29tcG9uZW50IG5hbWVzIGFuZCBwYXJhbXMgbGlrZTogYFsndXNlcicsIHtpZDogMyB9XWBcbiAgICogZ2VuZXJhdGVzIGEgdXJsIHdpdGggYSBsZWFkaW5nIHNsYXNoIHJlbGF0aXZlIHRvIHRoZSBwcm92aWRlZCBgcGFyZW50Q29tcG9uZW50YC5cbiAgICpcbiAgICogSWYgdGhlIG9wdGlvbmFsIHBhcmFtIGBfYXV4YCBpcyBgdHJ1ZWAsIHRoZW4gd2UgZ2VuZXJhdGUgc3RhcnRpbmcgYXQgYW4gYXV4aWxpYXJ5XG4gICAqIHJvdXRlIGJvdW5kYXJ5LlxuICAgKi9cbiAgZ2VuZXJhdGUobGlua1BhcmFtczogYW55W10sIGFuY2VzdG9ySW5zdHJ1Y3Rpb25zOiBJbnN0cnVjdGlvbltdLCBfYXV4ID0gZmFsc2UpOiBJbnN0cnVjdGlvbiB7XG4gICAgdmFyIHBhcmFtcyA9IHNwbGl0QW5kRmxhdHRlbkxpbmtQYXJhbXMobGlua1BhcmFtcyk7XG4gICAgdmFyIHByZXZJbnN0cnVjdGlvbjtcblxuICAgIC8vIFRoZSBmaXJzdCBzZWdtZW50IHNob3VsZCBiZSBlaXRoZXIgJy4nIChnZW5lcmF0ZSBmcm9tIHBhcmVudCkgb3IgJycgKGdlbmVyYXRlIGZyb20gcm9vdCkuXG4gICAgLy8gV2hlbiB3ZSBub3JtYWxpemUgYWJvdmUsIHdlIHN0cmlwIGFsbCB0aGUgc2xhc2hlcywgJy4vJyBiZWNvbWVzICcuJyBhbmQgJy8nIGJlY29tZXMgJycuXG4gICAgaWYgKExpc3RXcmFwcGVyLmZpcnN0KHBhcmFtcykgPT0gJycpIHtcbiAgICAgIHBhcmFtcy5zaGlmdCgpO1xuICAgICAgcHJldkluc3RydWN0aW9uID0gTGlzdFdyYXBwZXIuZmlyc3QoYW5jZXN0b3JJbnN0cnVjdGlvbnMpO1xuICAgICAgYW5jZXN0b3JJbnN0cnVjdGlvbnMgPSBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJldkluc3RydWN0aW9uID0gYW5jZXN0b3JJbnN0cnVjdGlvbnMubGVuZ3RoID4gMCA/IGFuY2VzdG9ySW5zdHJ1Y3Rpb25zLnBvcCgpIDogbnVsbDtcblxuICAgICAgaWYgKExpc3RXcmFwcGVyLmZpcnN0KHBhcmFtcykgPT0gJy4nKSB7XG4gICAgICAgIHBhcmFtcy5zaGlmdCgpO1xuICAgICAgfSBlbHNlIGlmIChMaXN0V3JhcHBlci5maXJzdChwYXJhbXMpID09ICcuLicpIHtcbiAgICAgICAgd2hpbGUgKExpc3RXcmFwcGVyLmZpcnN0KHBhcmFtcykgPT0gJy4uJykge1xuICAgICAgICAgIGlmIChhbmNlc3Rvckluc3RydWN0aW9ucy5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgICAgICAgICAgYExpbmsgXCIke0xpc3RXcmFwcGVyLnRvSlNPTihsaW5rUGFyYW1zKX1cIiBoYXMgdG9vIG1hbnkgXCIuLi9cIiBzZWdtZW50cy5gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcHJldkluc3RydWN0aW9uID0gYW5jZXN0b3JJbnN0cnVjdGlvbnMucG9wKCk7XG4gICAgICAgICAgcGFyYW1zID0gTGlzdFdyYXBwZXIuc2xpY2UocGFyYW1zLCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdlJ3JlIG9uIHRvIGltcGxpY2l0IGNoaWxkL3NpYmxpbmcgcm91dGVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHdlIG11c3Qgb25seSBwZWFrIGF0IHRoZSBsaW5rIHBhcmFtLCBhbmQgbm90IGNvbnN1bWUgaXRcbiAgICAgICAgbGV0IHJvdXRlTmFtZSA9IExpc3RXcmFwcGVyLmZpcnN0KHBhcmFtcyk7XG4gICAgICAgIGxldCBwYXJlbnRDb21wb25lbnRUeXBlID0gdGhpcy5fcm9vdENvbXBvbmVudDtcbiAgICAgICAgbGV0IGdyYW5kcGFyZW50Q29tcG9uZW50VHlwZSA9IG51bGw7XG5cbiAgICAgICAgaWYgKGFuY2VzdG9ySW5zdHJ1Y3Rpb25zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBsZXQgcGFyZW50Q29tcG9uZW50SW5zdHJ1Y3Rpb24gPSBhbmNlc3Rvckluc3RydWN0aW9uc1thbmNlc3Rvckluc3RydWN0aW9ucy5sZW5ndGggLSAxXTtcbiAgICAgICAgICBsZXQgZ3JhbmRDb21wb25lbnRJbnN0cnVjdGlvbiA9IGFuY2VzdG9ySW5zdHJ1Y3Rpb25zW2FuY2VzdG9ySW5zdHJ1Y3Rpb25zLmxlbmd0aCAtIDJdO1xuXG4gICAgICAgICAgcGFyZW50Q29tcG9uZW50VHlwZSA9IHBhcmVudENvbXBvbmVudEluc3RydWN0aW9uLmNvbXBvbmVudC5jb21wb25lbnRUeXBlO1xuICAgICAgICAgIGdyYW5kcGFyZW50Q29tcG9uZW50VHlwZSA9IGdyYW5kQ29tcG9uZW50SW5zdHJ1Y3Rpb24uY29tcG9uZW50LmNvbXBvbmVudFR5cGU7XG4gICAgICAgIH0gZWxzZSBpZiAoYW5jZXN0b3JJbnN0cnVjdGlvbnMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICBwYXJlbnRDb21wb25lbnRUeXBlID0gYW5jZXN0b3JJbnN0cnVjdGlvbnNbMF0uY29tcG9uZW50LmNvbXBvbmVudFR5cGU7XG4gICAgICAgICAgZ3JhbmRwYXJlbnRDb21wb25lbnRUeXBlID0gdGhpcy5fcm9vdENvbXBvbmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZvciBhIGxpbmsgd2l0aCBubyBsZWFkaW5nIGAuL2AsIGAvYCwgb3IgYC4uL2AsIHdlIGxvb2sgZm9yIGEgc2libGluZyBhbmQgY2hpbGQuXG4gICAgICAgIC8vIElmIGJvdGggZXhpc3QsIHdlIHRocm93LiBPdGhlcndpc2UsIHdlIHByZWZlciB3aGljaGV2ZXIgZXhpc3RzLlxuICAgICAgICB2YXIgY2hpbGRSb3V0ZUV4aXN0cyA9IHRoaXMuaGFzUm91dGUocm91dGVOYW1lLCBwYXJlbnRDb21wb25lbnRUeXBlKTtcbiAgICAgICAgdmFyIHBhcmVudFJvdXRlRXhpc3RzID0gaXNQcmVzZW50KGdyYW5kcGFyZW50Q29tcG9uZW50VHlwZSkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNSb3V0ZShyb3V0ZU5hbWUsIGdyYW5kcGFyZW50Q29tcG9uZW50VHlwZSk7XG5cbiAgICAgICAgaWYgKHBhcmVudFJvdXRlRXhpc3RzICYmIGNoaWxkUm91dGVFeGlzdHMpIHtcbiAgICAgICAgICBsZXQgbXNnID1cbiAgICAgICAgICAgICAgYExpbmsgXCIke0xpc3RXcmFwcGVyLnRvSlNPTihsaW5rUGFyYW1zKX1cIiBpcyBhbWJpZ3VvdXMsIHVzZSBcIi4vXCIgb3IgXCIuLi9cIiB0byBkaXNhbWJpZ3VhdGUuYDtcbiAgICAgICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihtc2cpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcmVudFJvdXRlRXhpc3RzKSB7XG4gICAgICAgICAgcHJldkluc3RydWN0aW9uID0gYW5jZXN0b3JJbnN0cnVjdGlvbnMucG9wKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocGFyYW1zW3BhcmFtcy5sZW5ndGggLSAxXSA9PSAnJykge1xuICAgICAgcGFyYW1zLnBvcCgpO1xuICAgIH1cblxuICAgIGlmIChwYXJhbXMubGVuZ3RoID4gMCAmJiBwYXJhbXNbMF0gPT0gJycpIHtcbiAgICAgIHBhcmFtcy5zaGlmdCgpO1xuICAgIH1cblxuICAgIGlmIChwYXJhbXMubGVuZ3RoIDwgMSkge1xuICAgICAgbGV0IG1zZyA9IGBMaW5rIFwiJHtMaXN0V3JhcHBlci50b0pTT04obGlua1BhcmFtcyl9XCIgbXVzdCBpbmNsdWRlIGEgcm91dGUgbmFtZS5gO1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24obXNnKTtcbiAgICB9XG5cbiAgICB2YXIgZ2VuZXJhdGVkSW5zdHJ1Y3Rpb24gPVxuICAgICAgICB0aGlzLl9nZW5lcmF0ZShwYXJhbXMsIGFuY2VzdG9ySW5zdHJ1Y3Rpb25zLCBwcmV2SW5zdHJ1Y3Rpb24sIF9hdXgsIGxpbmtQYXJhbXMpO1xuXG4gICAgLy8gd2UgZG9uJ3QgY2xvbmUgdGhlIGZpcnN0IChyb290KSBlbGVtZW50XG4gICAgZm9yICh2YXIgaSA9IGFuY2VzdG9ySW5zdHJ1Y3Rpb25zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBsZXQgYW5jZXN0b3JJbnN0cnVjdGlvbiA9IGFuY2VzdG9ySW5zdHJ1Y3Rpb25zW2ldO1xuICAgICAgaWYgKGlzQmxhbmsoYW5jZXN0b3JJbnN0cnVjdGlvbikpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBnZW5lcmF0ZWRJbnN0cnVjdGlvbiA9IGFuY2VzdG9ySW5zdHJ1Y3Rpb24ucmVwbGFjZUNoaWxkKGdlbmVyYXRlZEluc3RydWN0aW9uKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZ2VuZXJhdGVkSW5zdHJ1Y3Rpb247XG4gIH1cblxuXG4gIC8qXG4gICAqIEludGVybmFsIGhlbHBlciB0aGF0IGRvZXMgbm90IG1ha2UgYW55IGFzc2VydGlvbnMgYWJvdXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgbGluayBEU0wuXG4gICAqIGBhbmNlc3Rvckluc3RydWN0aW9uc2AgYXJlIHBhcmVudHMgdGhhdCB3aWxsIGJlIGNsb25lZC5cbiAgICogYHByZXZJbnN0cnVjdGlvbmAgaXMgdGhlIGV4aXN0aW5nIGluc3RydWN0aW9uIHRoYXQgd291bGQgYmUgcmVwbGFjZWQsIGJ1dCB3aGljaCBtaWdodCBoYXZlXG4gICAqIGF1eCByb3V0ZXMgdGhhdCBuZWVkIHRvIGJlIGNsb25lZC5cbiAgICovXG4gIHByaXZhdGUgX2dlbmVyYXRlKGxpbmtQYXJhbXM6IGFueVtdLCBhbmNlc3Rvckluc3RydWN0aW9uczogSW5zdHJ1Y3Rpb25bXSxcbiAgICAgICAgICAgICAgICAgICAgcHJldkluc3RydWN0aW9uOiBJbnN0cnVjdGlvbiwgX2F1eCA9IGZhbHNlLCBfb3JpZ2luYWxMaW5rOiBhbnlbXSk6IEluc3RydWN0aW9uIHtcbiAgICBsZXQgcGFyZW50Q29tcG9uZW50VHlwZSA9IHRoaXMuX3Jvb3RDb21wb25lbnQ7XG4gICAgbGV0IGNvbXBvbmVudEluc3RydWN0aW9uID0gbnVsbDtcbiAgICBsZXQgYXV4SW5zdHJ1Y3Rpb25zOiB7W2tleTogc3RyaW5nXTogSW5zdHJ1Y3Rpb259ID0ge307XG5cbiAgICBsZXQgcGFyZW50SW5zdHJ1Y3Rpb246IEluc3RydWN0aW9uID0gTGlzdFdyYXBwZXIubGFzdChhbmNlc3Rvckluc3RydWN0aW9ucyk7XG4gICAgaWYgKGlzUHJlc2VudChwYXJlbnRJbnN0cnVjdGlvbikgJiYgaXNQcmVzZW50KHBhcmVudEluc3RydWN0aW9uLmNvbXBvbmVudCkpIHtcbiAgICAgIHBhcmVudENvbXBvbmVudFR5cGUgPSBwYXJlbnRJbnN0cnVjdGlvbi5jb21wb25lbnQuY29tcG9uZW50VHlwZTtcbiAgICB9XG5cbiAgICBpZiAobGlua1BhcmFtcy5sZW5ndGggPT0gMCkge1xuICAgICAgbGV0IGRlZmF1bHRJbnN0cnVjdGlvbiA9IHRoaXMuZ2VuZXJhdGVEZWZhdWx0KHBhcmVudENvbXBvbmVudFR5cGUpO1xuICAgICAgaWYgKGlzQmxhbmsoZGVmYXVsdEluc3RydWN0aW9uKSkge1xuICAgICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcbiAgICAgICAgICAgIGBMaW5rIFwiJHtMaXN0V3JhcHBlci50b0pTT04oX29yaWdpbmFsTGluayl9XCIgZG9lcyBub3QgcmVzb2x2ZSB0byBhIHRlcm1pbmFsIGluc3RydWN0aW9uLmApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRlZmF1bHRJbnN0cnVjdGlvbjtcbiAgICB9XG5cbiAgICAvLyBmb3Igbm9uLWF1eCByb3V0ZXMsIHdlIHdhbnQgdG8gcmV1c2UgdGhlIHByZWRlY2Vzc29yJ3MgZXhpc3RpbmcgcHJpbWFyeSBhbmQgYXV4IHJvdXRlc1xuICAgIC8vIGFuZCBvbmx5IG92ZXJyaWRlIHJvdXRlcyBmb3Igd2hpY2ggdGhlIGdpdmVuIGxpbmsgRFNMIHByb3ZpZGVzXG4gICAgaWYgKGlzUHJlc2VudChwcmV2SW5zdHJ1Y3Rpb24pICYmICFfYXV4KSB7XG4gICAgICBhdXhJbnN0cnVjdGlvbnMgPSBTdHJpbmdNYXBXcmFwcGVyLm1lcmdlKHByZXZJbnN0cnVjdGlvbi5hdXhJbnN0cnVjdGlvbiwgYXV4SW5zdHJ1Y3Rpb25zKTtcbiAgICAgIGNvbXBvbmVudEluc3RydWN0aW9uID0gcHJldkluc3RydWN0aW9uLmNvbXBvbmVudDtcbiAgICB9XG5cbiAgICB2YXIgcnVsZXMgPSB0aGlzLl9ydWxlcy5nZXQocGFyZW50Q29tcG9uZW50VHlwZSk7XG4gICAgaWYgKGlzQmxhbmsocnVsZXMpKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcbiAgICAgICAgICBgQ29tcG9uZW50IFwiJHtnZXRUeXBlTmFtZUZvckRlYnVnZ2luZyhwYXJlbnRDb21wb25lbnRUeXBlKX1cIiBoYXMgbm8gcm91dGUgY29uZmlnLmApO1xuICAgIH1cblxuICAgIGxldCBsaW5rUGFyYW1JbmRleCA9IDA7XG4gICAgbGV0IHJvdXRlUGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9O1xuXG4gICAgLy8gZmlyc3QsIHJlY29nbml6ZSB0aGUgcHJpbWFyeSByb3V0ZSBpZiBvbmUgaXMgcHJvdmlkZWRcbiAgICBpZiAobGlua1BhcmFtSW5kZXggPCBsaW5rUGFyYW1zLmxlbmd0aCAmJiBpc1N0cmluZyhsaW5rUGFyYW1zW2xpbmtQYXJhbUluZGV4XSkpIHtcbiAgICAgIGxldCByb3V0ZU5hbWUgPSBsaW5rUGFyYW1zW2xpbmtQYXJhbUluZGV4XTtcbiAgICAgIGlmIChyb3V0ZU5hbWUgPT0gJycgfHwgcm91dGVOYW1lID09ICcuJyB8fCByb3V0ZU5hbWUgPT0gJy4uJykge1xuICAgICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgXCIke3JvdXRlTmFtZX0vXCIgaXMgb25seSBhbGxvd2VkIGF0IHRoZSBiZWdpbm5pbmcgb2YgYSBsaW5rIERTTC5gKTtcbiAgICAgIH1cbiAgICAgIGxpbmtQYXJhbUluZGV4ICs9IDE7XG4gICAgICBpZiAobGlua1BhcmFtSW5kZXggPCBsaW5rUGFyYW1zLmxlbmd0aCkge1xuICAgICAgICBsZXQgbGlua1BhcmFtID0gbGlua1BhcmFtc1tsaW5rUGFyYW1JbmRleF07XG4gICAgICAgIGlmIChpc1N0cmluZ01hcChsaW5rUGFyYW0pICYmICFpc0FycmF5KGxpbmtQYXJhbSkpIHtcbiAgICAgICAgICByb3V0ZVBhcmFtcyA9IGxpbmtQYXJhbTtcbiAgICAgICAgICBsaW5rUGFyYW1JbmRleCArPSAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgcm91dGVSZWNvZ25pemVyID0gKF9hdXggPyBydWxlcy5hdXhSdWxlc0J5TmFtZSA6IHJ1bGVzLnJ1bGVzQnlOYW1lKS5nZXQocm91dGVOYW1lKTtcblxuICAgICAgaWYgKGlzQmxhbmsocm91dGVSZWNvZ25pemVyKSkge1xuICAgICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcbiAgICAgICAgICAgIGBDb21wb25lbnQgXCIke2dldFR5cGVOYW1lRm9yRGVidWdnaW5nKHBhcmVudENvbXBvbmVudFR5cGUpfVwiIGhhcyBubyByb3V0ZSBuYW1lZCBcIiR7cm91dGVOYW1lfVwiLmApO1xuICAgICAgfVxuXG4gICAgICAvLyBDcmVhdGUgYW4gXCJ1bnJlc29sdmVkIGluc3RydWN0aW9uXCIgZm9yIGFzeW5jIHJvdXRlc1xuICAgICAgLy8gd2UnbGwgZmlndXJlIG91dCB0aGUgcmVzdCBvZiB0aGUgcm91dGUgd2hlbiB3ZSByZXNvbHZlIHRoZSBpbnN0cnVjdGlvbiBhbmRcbiAgICAgIC8vIHBlcmZvcm0gYSBuYXZpZ2F0aW9uXG4gICAgICBpZiAoaXNCbGFuayhyb3V0ZVJlY29nbml6ZXIuaGFuZGxlci5jb21wb25lbnRUeXBlKSkge1xuICAgICAgICB2YXIgZ2VuZXJhdGVkVXJsOiBHZW5lcmF0ZWRVcmwgPSByb3V0ZVJlY29nbml6ZXIuZ2VuZXJhdGVDb21wb25lbnRQYXRoVmFsdWVzKHJvdXRlUGFyYW1zKTtcbiAgICAgICAgcmV0dXJuIG5ldyBVbnJlc29sdmVkSW5zdHJ1Y3Rpb24oKCkgPT4ge1xuICAgICAgICAgIHJldHVybiByb3V0ZVJlY29nbml6ZXIuaGFuZGxlci5yZXNvbHZlQ29tcG9uZW50VHlwZSgpLnRoZW4oKF8pID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZW5lcmF0ZShsaW5rUGFyYW1zLCBhbmNlc3Rvckluc3RydWN0aW9ucywgcHJldkluc3RydWN0aW9uLCBfYXV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9vcmlnaW5hbExpbmspO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LCBnZW5lcmF0ZWRVcmwudXJsUGF0aCwgY29udmVydFVybFBhcmFtc1RvQXJyYXkoZ2VuZXJhdGVkVXJsLnVybFBhcmFtcykpO1xuICAgICAgfVxuXG4gICAgICBjb21wb25lbnRJbnN0cnVjdGlvbiA9IF9hdXggPyBydWxlcy5nZW5lcmF0ZUF1eGlsaWFyeShyb3V0ZU5hbWUsIHJvdXRlUGFyYW1zKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydWxlcy5nZW5lcmF0ZShyb3V0ZU5hbWUsIHJvdXRlUGFyYW1zKTtcbiAgICB9XG5cbiAgICAvLyBOZXh0LCByZWNvZ25pemUgYXV4aWxpYXJ5IGluc3RydWN0aW9ucy5cbiAgICAvLyBJZiB3ZSBoYXZlIGFuIGFuY2VzdG9yIGluc3RydWN0aW9uLCB3ZSBwcmVzZXJ2ZSB3aGF0ZXZlciBhdXggcm91dGVzIGFyZSBhY3RpdmUgZnJvbSBpdC5cbiAgICB3aGlsZSAobGlua1BhcmFtSW5kZXggPCBsaW5rUGFyYW1zLmxlbmd0aCAmJiBpc0FycmF5KGxpbmtQYXJhbXNbbGlua1BhcmFtSW5kZXhdKSkge1xuICAgICAgbGV0IGF1eFBhcmVudEluc3RydWN0aW9uOiBJbnN0cnVjdGlvbltdID0gW3BhcmVudEluc3RydWN0aW9uXTtcbiAgICAgIGxldCBhdXhJbnN0cnVjdGlvbiA9IHRoaXMuX2dlbmVyYXRlKGxpbmtQYXJhbXNbbGlua1BhcmFtSW5kZXhdLCBhdXhQYXJlbnRJbnN0cnVjdGlvbiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWUsIF9vcmlnaW5hbExpbmspO1xuXG4gICAgICAvLyBUT0RPOiB0aGlzIHdpbGwgbm90IHdvcmsgZm9yIGF1eCByb3V0ZXMgd2l0aCBwYXJhbWV0ZXJzIG9yIG11bHRpcGxlIHNlZ21lbnRzXG4gICAgICBhdXhJbnN0cnVjdGlvbnNbYXV4SW5zdHJ1Y3Rpb24uY29tcG9uZW50LnVybFBhdGhdID0gYXV4SW5zdHJ1Y3Rpb247XG4gICAgICBsaW5rUGFyYW1JbmRleCArPSAxO1xuICAgIH1cblxuICAgIHZhciBpbnN0cnVjdGlvbiA9IG5ldyBSZXNvbHZlZEluc3RydWN0aW9uKGNvbXBvbmVudEluc3RydWN0aW9uLCBudWxsLCBhdXhJbnN0cnVjdGlvbnMpO1xuXG4gICAgLy8gSWYgdGhlIGNvbXBvbmVudCBpcyBzeW5jLCB3ZSBjYW4gZ2VuZXJhdGUgcmVzb2x2ZWQgY2hpbGQgcm91dGUgaW5zdHJ1Y3Rpb25zXG4gICAgLy8gSWYgbm90LCB3ZSdsbCByZXNvbHZlIHRoZSBpbnN0cnVjdGlvbnMgYXQgbmF2aWdhdGlvbiB0aW1lXG4gICAgaWYgKGlzUHJlc2VudChjb21wb25lbnRJbnN0cnVjdGlvbikgJiYgaXNQcmVzZW50KGNvbXBvbmVudEluc3RydWN0aW9uLmNvbXBvbmVudFR5cGUpKSB7XG4gICAgICBsZXQgY2hpbGRJbnN0cnVjdGlvbjogSW5zdHJ1Y3Rpb24gPSBudWxsO1xuICAgICAgaWYgKGNvbXBvbmVudEluc3RydWN0aW9uLnRlcm1pbmFsKSB7XG4gICAgICAgIGlmIChsaW5rUGFyYW1JbmRleCA+PSBsaW5rUGFyYW1zLmxlbmd0aCkge1xuICAgICAgICAgIC8vIFRPRE86IHRocm93IHRoYXQgdGhlcmUgYXJlIGV4dHJhIGxpbmsgcGFyYW1zIGJleW9uZCB0aGUgdGVybWluYWwgY29tcG9uZW50XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBjaGlsZEFuY2VzdG9yQ29tcG9uZW50czogSW5zdHJ1Y3Rpb25bXSA9IGFuY2VzdG9ySW5zdHJ1Y3Rpb25zLmNvbmNhdChbaW5zdHJ1Y3Rpb25dKTtcbiAgICAgICAgbGV0IHJlbWFpbmluZ0xpbmtQYXJhbXMgPSBsaW5rUGFyYW1zLnNsaWNlKGxpbmtQYXJhbUluZGV4KTtcbiAgICAgICAgY2hpbGRJbnN0cnVjdGlvbiA9IHRoaXMuX2dlbmVyYXRlKHJlbWFpbmluZ0xpbmtQYXJhbXMsIGNoaWxkQW5jZXN0b3JDb21wb25lbnRzLCBudWxsLCBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9vcmlnaW5hbExpbmspO1xuICAgICAgfVxuICAgICAgaW5zdHJ1Y3Rpb24uY2hpbGQgPSBjaGlsZEluc3RydWN0aW9uO1xuICAgIH1cblxuICAgIHJldHVybiBpbnN0cnVjdGlvbjtcbiAgfVxuXG4gIHB1YmxpYyBoYXNSb3V0ZShuYW1lOiBzdHJpbmcsIHBhcmVudENvbXBvbmVudDogYW55KTogYm9vbGVhbiB7XG4gICAgdmFyIHJ1bGVzID0gdGhpcy5fcnVsZXMuZ2V0KHBhcmVudENvbXBvbmVudCk7XG4gICAgaWYgKGlzQmxhbmsocnVsZXMpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBydWxlcy5oYXNSb3V0ZShuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBnZW5lcmF0ZURlZmF1bHQoY29tcG9uZW50Q3Vyc29yOiBUeXBlKTogSW5zdHJ1Y3Rpb24ge1xuICAgIGlmIChpc0JsYW5rKGNvbXBvbmVudEN1cnNvcikpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBydWxlcyA9IHRoaXMuX3J1bGVzLmdldChjb21wb25lbnRDdXJzb3IpO1xuICAgIGlmIChpc0JsYW5rKHJ1bGVzKSB8fCBpc0JsYW5rKHJ1bGVzLmRlZmF1bHRSdWxlKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRDaGlsZCA9IG51bGw7XG4gICAgaWYgKGlzUHJlc2VudChydWxlcy5kZWZhdWx0UnVsZS5oYW5kbGVyLmNvbXBvbmVudFR5cGUpKSB7XG4gICAgICB2YXIgY29tcG9uZW50SW5zdHJ1Y3Rpb24gPSBydWxlcy5kZWZhdWx0UnVsZS5nZW5lcmF0ZSh7fSk7XG4gICAgICBpZiAoIXJ1bGVzLmRlZmF1bHRSdWxlLnRlcm1pbmFsKSB7XG4gICAgICAgIGRlZmF1bHRDaGlsZCA9IHRoaXMuZ2VuZXJhdGVEZWZhdWx0KHJ1bGVzLmRlZmF1bHRSdWxlLmhhbmRsZXIuY29tcG9uZW50VHlwZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IERlZmF1bHRJbnN0cnVjdGlvbihjb21wb25lbnRJbnN0cnVjdGlvbiwgZGVmYXVsdENoaWxkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFVucmVzb2x2ZWRJbnN0cnVjdGlvbigoKSA9PiB7XG4gICAgICByZXR1cm4gcnVsZXMuZGVmYXVsdFJ1bGUuaGFuZGxlci5yZXNvbHZlQ29tcG9uZW50VHlwZSgpLnRoZW4oXG4gICAgICAgICAgKF8pID0+IHRoaXMuZ2VuZXJhdGVEZWZhdWx0KGNvbXBvbmVudEN1cnNvcikpO1xuICAgIH0pO1xuICB9XG59XG5cbi8qXG4gKiBHaXZlbjogWycvYS9iJywge2M6IDJ9XVxuICogUmV0dXJuczogWycnLCAnYScsICdiJywge2M6IDJ9XVxuICovXG5mdW5jdGlvbiBzcGxpdEFuZEZsYXR0ZW5MaW5rUGFyYW1zKGxpbmtQYXJhbXM6IGFueVtdKTogYW55W10ge1xuICB2YXIgYWNjdW11bGF0aW9uID0gW107XG4gIGxpbmtQYXJhbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtOiBhbnkpIHtcbiAgICBpZiAoaXNTdHJpbmcoaXRlbSkpIHtcbiAgICAgIHZhciBzdHJJdGVtOiBzdHJpbmcgPSA8c3RyaW5nPml0ZW07XG4gICAgICBhY2N1bXVsYXRpb24gPSBhY2N1bXVsYXRpb24uY29uY2F0KHN0ckl0ZW0uc3BsaXQoJy8nKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjY3VtdWxhdGlvbi5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhY2N1bXVsYXRpb247XG59XG5cblxuLypcbiAqIEdpdmVuIGEgbGlzdCBvZiBpbnN0cnVjdGlvbnMsIHJldHVybnMgdGhlIG1vc3Qgc3BlY2lmaWMgaW5zdHJ1Y3Rpb25cbiAqL1xuZnVuY3Rpb24gbW9zdFNwZWNpZmljKGluc3RydWN0aW9uczogSW5zdHJ1Y3Rpb25bXSk6IEluc3RydWN0aW9uIHtcbiAgaW5zdHJ1Y3Rpb25zID0gaW5zdHJ1Y3Rpb25zLmZpbHRlcigoaW5zdHJ1Y3Rpb24pID0+IGlzUHJlc2VudChpbnN0cnVjdGlvbikpO1xuICBpZiAoaW5zdHJ1Y3Rpb25zLmxlbmd0aCA9PSAwKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKGluc3RydWN0aW9ucy5sZW5ndGggPT0gMSkge1xuICAgIHJldHVybiBpbnN0cnVjdGlvbnNbMF07XG4gIH1cbiAgdmFyIGZpcnN0ID0gaW5zdHJ1Y3Rpb25zWzBdO1xuICB2YXIgcmVzdCA9IGluc3RydWN0aW9ucy5zbGljZSgxKTtcbiAgcmV0dXJuIHJlc3QucmVkdWNlKChpbnN0cnVjdGlvbjogSW5zdHJ1Y3Rpb24sIGNvbnRlbmRlcjogSW5zdHJ1Y3Rpb24pID0+IHtcbiAgICBpZiAoY29tcGFyZVNwZWNpZmljaXR5U3RyaW5ncyhjb250ZW5kZXIuc3BlY2lmaWNpdHksIGluc3RydWN0aW9uLnNwZWNpZmljaXR5KSA9PSAtMSkge1xuICAgICAgcmV0dXJuIGNvbnRlbmRlcjtcbiAgICB9XG4gICAgcmV0dXJuIGluc3RydWN0aW9uO1xuICB9LCBmaXJzdCk7XG59XG5cbi8qXG4gKiBFeHBlY3RzIHN0cmluZ3MgdG8gYmUgaW4gdGhlIGZvcm0gb2YgXCJbMC0yXStcIlxuICogUmV0dXJucyAtMSBpZiBzdHJpbmcgQSBzaG91bGQgYmUgc29ydGVkIGFib3ZlIHN0cmluZyBCLCAxIGlmIGl0IHNob3VsZCBiZSBzb3J0ZWQgYWZ0ZXIsXG4gKiBvciAwIGlmIHRoZXkgYXJlIHRoZSBzYW1lLlxuICovXG5mdW5jdGlvbiBjb21wYXJlU3BlY2lmaWNpdHlTdHJpbmdzKGE6IHN0cmluZywgYjogc3RyaW5nKTogbnVtYmVyIHtcbiAgdmFyIGwgPSBNYXRoLm1pbihhLmxlbmd0aCwgYi5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGw7IGkgKz0gMSkge1xuICAgIHZhciBhaSA9IFN0cmluZ1dyYXBwZXIuY2hhckNvZGVBdChhLCBpKTtcbiAgICB2YXIgYmkgPSBTdHJpbmdXcmFwcGVyLmNoYXJDb2RlQXQoYiwgaSk7XG4gICAgdmFyIGRpZmZlcmVuY2UgPSBiaSAtIGFpO1xuICAgIGlmIChkaWZmZXJlbmNlICE9IDApIHtcbiAgICAgIHJldHVybiBkaWZmZXJlbmNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYS5sZW5ndGggLSBiLmxlbmd0aDtcbn1cblxuZnVuY3Rpb24gYXNzZXJ0VGVybWluYWxDb21wb25lbnQoY29tcG9uZW50LCBwYXRoKSB7XG4gIGlmICghaXNUeXBlKGNvbXBvbmVudCkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgYW5ub3RhdGlvbnMgPSByZWZsZWN0b3IuYW5ub3RhdGlvbnMoY29tcG9uZW50KTtcbiAgaWYgKGlzUHJlc2VudChhbm5vdGF0aW9ucykpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFubm90YXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgYW5ub3RhdGlvbiA9IGFubm90YXRpb25zW2ldO1xuXG4gICAgICBpZiAoYW5ub3RhdGlvbiBpbnN0YW5jZW9mIFJvdXRlQ29uZmlnKSB7XG4gICAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFxuICAgICAgICAgICAgYENoaWxkIHJvdXRlcyBhcmUgbm90IGFsbG93ZWQgZm9yIFwiJHtwYXRofVwiLiBVc2UgXCIuLi5cIiBvbiB0aGUgcGFyZW50J3Mgcm91dGUgcGF0aC5gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
