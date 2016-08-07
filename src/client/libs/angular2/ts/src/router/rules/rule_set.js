System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/collection', 'angular2/src/facade/async', './rules', '../route_config/route_config_impl', './route_handlers/async_route_handler', './route_handlers/sync_route_handler', './route_paths/param_route_path', './route_paths/regex_route_path'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, exceptions_1, collection_1, async_1, rules_1, route_config_impl_1, async_route_handler_1, sync_route_handler_1, param_route_path_1, regex_route_path_1;
    var RuleSet;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (rules_1_1) {
                rules_1 = rules_1_1;
            },
            function (route_config_impl_1_1) {
                route_config_impl_1 = route_config_impl_1_1;
            },
            function (async_route_handler_1_1) {
                async_route_handler_1 = async_route_handler_1_1;
            },
            function (sync_route_handler_1_1) {
                sync_route_handler_1 = sync_route_handler_1_1;
            },
            function (param_route_path_1_1) {
                param_route_path_1 = param_route_path_1_1;
            },
            function (regex_route_path_1_1) {
                regex_route_path_1 = regex_route_path_1_1;
            }],
        execute: function() {
            /**
             * A `RuleSet` is responsible for recognizing routes for a particular component.
             * It is consumed by `RouteRegistry`, which knows how to recognize an entire hierarchy of
             * components.
             */
            RuleSet = (function () {
                function RuleSet() {
                    this.rulesByName = new collection_1.Map();
                    // map from name to rule
                    this.auxRulesByName = new collection_1.Map();
                    // map from starting path to rule
                    this.auxRulesByPath = new collection_1.Map();
                    // TODO: optimize this into a trie
                    this.rules = [];
                    // the rule to use automatically when recognizing or generating from this rule set
                    this.defaultRule = null;
                }
                /**
                 * Configure additional rules in this rule set from a route definition
                 * @returns {boolean} true if the config is terminal
                 */
                RuleSet.prototype.config = function (config) {
                    var handler;
                    if (lang_1.isPresent(config.name) && config.name[0].toUpperCase() != config.name[0]) {
                        var suggestedName = config.name[0].toUpperCase() + config.name.substring(1);
                        throw new exceptions_1.BaseException("Route \"" + config.path + "\" with name \"" + config.name + "\" does not begin with an uppercase letter. Route names should be CamelCase like \"" + suggestedName + "\".");
                    }
                    if (config instanceof route_config_impl_1.AuxRoute) {
                        handler = new sync_route_handler_1.SyncRouteHandler(config.component, config.data);
                        var routePath_1 = this._getRoutePath(config);
                        var auxRule = new rules_1.RouteRule(routePath_1, handler);
                        this.auxRulesByPath.set(routePath_1.toString(), auxRule);
                        if (lang_1.isPresent(config.name)) {
                            this.auxRulesByName.set(config.name, auxRule);
                        }
                        return auxRule.terminal;
                    }
                    var useAsDefault = false;
                    if (config instanceof route_config_impl_1.Redirect) {
                        var routePath_2 = this._getRoutePath(config);
                        var redirector = new rules_1.RedirectRule(routePath_2, config.redirectTo);
                        this._assertNoHashCollision(redirector.hash, config.path);
                        this.rules.push(redirector);
                        return true;
                    }
                    if (config instanceof route_config_impl_1.Route) {
                        handler = new sync_route_handler_1.SyncRouteHandler(config.component, config.data);
                        useAsDefault = lang_1.isPresent(config.useAsDefault) && config.useAsDefault;
                    }
                    else if (config instanceof route_config_impl_1.AsyncRoute) {
                        handler = new async_route_handler_1.AsyncRouteHandler(config.loader, config.data);
                        useAsDefault = lang_1.isPresent(config.useAsDefault) && config.useAsDefault;
                    }
                    var routePath = this._getRoutePath(config);
                    var newRule = new rules_1.RouteRule(routePath, handler);
                    this._assertNoHashCollision(newRule.hash, config.path);
                    if (useAsDefault) {
                        if (lang_1.isPresent(this.defaultRule)) {
                            throw new exceptions_1.BaseException("Only one route can be default");
                        }
                        this.defaultRule = newRule;
                    }
                    this.rules.push(newRule);
                    if (lang_1.isPresent(config.name)) {
                        this.rulesByName.set(config.name, newRule);
                    }
                    return newRule.terminal;
                };
                /**
                 * Given a URL, returns a list of `RouteMatch`es, which are partial recognitions for some route.
                 */
                RuleSet.prototype.recognize = function (urlParse) {
                    var solutions = [];
                    this.rules.forEach(function (routeRecognizer) {
                        var pathMatch = routeRecognizer.recognize(urlParse);
                        if (lang_1.isPresent(pathMatch)) {
                            solutions.push(pathMatch);
                        }
                    });
                    // handle cases where we are routing just to an aux route
                    if (solutions.length == 0 && lang_1.isPresent(urlParse) && urlParse.auxiliary.length > 0) {
                        return [async_1.PromiseWrapper.resolve(new rules_1.PathMatch(null, null, urlParse.auxiliary))];
                    }
                    return solutions;
                };
                RuleSet.prototype.recognizeAuxiliary = function (urlParse) {
                    var routeRecognizer = this.auxRulesByPath.get(urlParse.path);
                    if (lang_1.isPresent(routeRecognizer)) {
                        return [routeRecognizer.recognize(urlParse)];
                    }
                    return [async_1.PromiseWrapper.resolve(null)];
                };
                RuleSet.prototype.hasRoute = function (name) { return this.rulesByName.has(name); };
                RuleSet.prototype.componentLoaded = function (name) {
                    return this.hasRoute(name) && lang_1.isPresent(this.rulesByName.get(name).handler.componentType);
                };
                RuleSet.prototype.loadComponent = function (name) {
                    return this.rulesByName.get(name).handler.resolveComponentType();
                };
                RuleSet.prototype.generate = function (name, params) {
                    var rule = this.rulesByName.get(name);
                    if (lang_1.isBlank(rule)) {
                        return null;
                    }
                    return rule.generate(params);
                };
                RuleSet.prototype.generateAuxiliary = function (name, params) {
                    var rule = this.auxRulesByName.get(name);
                    if (lang_1.isBlank(rule)) {
                        return null;
                    }
                    return rule.generate(params);
                };
                RuleSet.prototype._assertNoHashCollision = function (hash, path) {
                    this.rules.forEach(function (rule) {
                        if (hash == rule.hash) {
                            throw new exceptions_1.BaseException("Configuration '" + path + "' conflicts with existing route '" + rule.path + "'");
                        }
                    });
                };
                RuleSet.prototype._getRoutePath = function (config) {
                    if (lang_1.isPresent(config.regex)) {
                        if (lang_1.isFunction(config.serializer)) {
                            return new regex_route_path_1.RegexRoutePath(config.regex, config.serializer);
                        }
                        else {
                            throw new exceptions_1.BaseException("Route provides a regex property, '" + config.regex + "', but no serializer property");
                        }
                    }
                    if (lang_1.isPresent(config.path)) {
                        // Auxiliary routes do not have a slash at the start
                        var path = (config instanceof route_config_impl_1.AuxRoute && config.path.startsWith('/')) ?
                            config.path.substring(1) :
                            config.path;
                        return new param_route_path_1.ParamRoutePath(path);
                    }
                    throw new exceptions_1.BaseException('Route must provide either a path or regex property');
                };
                return RuleSet;
            }());
            exports_1("RuleSet", RuleSet);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9ydWxlcy9ydWxlX3NldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQXlCQTs7OztlQUlHO1lBQ0g7Z0JBQUE7b0JBQ0UsZ0JBQVcsR0FBRyxJQUFJLGdCQUFHLEVBQXFCLENBQUM7b0JBRTNDLHdCQUF3QjtvQkFDeEIsbUJBQWMsR0FBRyxJQUFJLGdCQUFHLEVBQXFCLENBQUM7b0JBRTlDLGlDQUFpQztvQkFDakMsbUJBQWMsR0FBRyxJQUFJLGdCQUFHLEVBQXFCLENBQUM7b0JBRTlDLGtDQUFrQztvQkFDbEMsVUFBSyxHQUFtQixFQUFFLENBQUM7b0JBRTNCLGtGQUFrRjtvQkFDbEYsZ0JBQVcsR0FBYyxJQUFJLENBQUM7Z0JBbUpoQyxDQUFDO2dCQWpKQzs7O21CQUdHO2dCQUNILHdCQUFNLEdBQU4sVUFBTyxNQUF1QjtvQkFDNUIsSUFBSSxPQUFPLENBQUM7b0JBRVosRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDN0UsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDNUUsTUFBTSxJQUFJLDBCQUFhLENBQ25CLGFBQVUsTUFBTSxDQUFDLElBQUksdUJBQWdCLE1BQU0sQ0FBQyxJQUFJLDJGQUFvRixhQUFhLFFBQUksQ0FBQyxDQUFDO29CQUM3SixDQUFDO29CQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sWUFBWSw0QkFBUSxD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QUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMzQixvREFBb0Q7d0JBQ3BELElBQUksSUFBSSxHQUFHLENBQUMsTUFBTSxZQUFZLDRCQUFRLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ3ZELE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs0QkFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQzt3QkFDM0IsTUFBTSxDQUFDLElBQUksaUNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbEMsQ0FBQztvQkFDRCxNQUFNLElBQUksMEJBQWEsQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO2dCQUNoRixDQUFDO2dCQUNILGNBQUM7WUFBRCxDQWhLQSxBQWdLQyxJQUFBO1lBaEtELDZCQWdLQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9ydWxlcy9ydWxlX3NldC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNCbGFuaywgaXNQcmVzZW50LCBpc0Z1bmN0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9uLCBXcmFwcGVkRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtNYXAsIE1hcFdyYXBwZXIsIExpc3RXcmFwcGVyLCBTdHJpbmdNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtQcm9taXNlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5cbmltcG9ydCB7QWJzdHJhY3RSdWxlLCBSb3V0ZVJ1bGUsIFJlZGlyZWN0UnVsZSwgUm91dGVNYXRjaCwgUGF0aE1hdGNofSBmcm9tICcuL3J1bGVzJztcbmltcG9ydCB7XG4gIFJvdXRlLFxuICBBc3luY1JvdXRlLFxuICBBdXhSb3V0ZSxcbiAgUmVkaXJlY3QsXG4gIFJvdXRlRGVmaW5pdGlvblxufSBmcm9tICcuLi9yb3V0ZV9jb25maWcvcm91dGVfY29uZmlnX2ltcGwnO1xuXG5pbXBvcnQge0FzeW5jUm91dGVIYW5kbGVyfSBmcm9tICcuL3JvdXRlX2hhbmRsZXJzL2FzeW5jX3JvdXRlX2hhbmRsZXInO1xuaW1wb3J0IHtTeW5jUm91dGVIYW5kbGVyfSBmcm9tICcuL3JvdXRlX2hhbmRsZXJzL3N5bmNfcm91dGVfaGFuZGxlcic7XG5cbmltcG9ydCB7Um91dGVQYXRofSBmcm9tICcuL3JvdXRlX3BhdGhzL3JvdXRlX3BhdGgnO1xuaW1wb3J0IHtQYXJhbVJvdXRlUGF0aH0gZnJvbSAnLi9yb3V0ZV9wYXRocy9wYXJhbV9yb3V0ZV9wYXRoJztcbmltcG9ydCB7UmVnZXhSb3V0ZVBhdGh9IGZyb20gJy4vcm91dGVfcGF0aHMvcmVnZXhfcm91dGVfcGF0aCc7XG5cbmltcG9ydCB7VXJsfSBmcm9tICcuLi91cmxfcGFyc2VyJztcbmltcG9ydCB7Q29tcG9uZW50SW5zdHJ1Y3Rpb259IGZyb20gJy4uL2luc3RydWN0aW9uJztcblxuXG4vKipcbiAqIEEgYFJ1bGVTZXRgIGlzIHJlc3BvbnNpYmxlIGZvciByZWNvZ25pemluZyByb3V0ZXMgZm9yIGEgcGFydGljdWxhciBjb21wb25lbnQuXG4gKiBJdCBpcyBjb25zdW1lZCBieSBgUm91dGVSZWdpc3RyeWAsIHdoaWNoIGtub3dzIGhvdyB0byByZWNvZ25pemUgYW4gZW50aXJlIGhpZXJhcmNoeSBvZlxuICogY29tcG9uZW50cy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJ1bGVTZXQge1xuICBydWxlc0J5TmFtZSA9IG5ldyBNYXA8c3RyaW5nLCBSb3V0ZVJ1bGU+KCk7XG5cbiAgLy8gbWFwIGZyb20gbmFtZSB0byBydWxlXG4gIGF1eFJ1bGVzQnlOYW1lID0gbmV3IE1hcDxzdHJpbmcsIFJvdXRlUnVsZT4oKTtcblxuICAvLyBtYXAgZnJvbSBzdGFydGluZyBwYXRoIHRvIHJ1bGVcbiAgYXV4UnVsZXNCeVBhdGggPSBuZXcgTWFwPHN0cmluZywgUm91dGVSdWxlPigpO1xuXG4gIC8vIFRPRE86IG9wdGltaXplIHRoaXMgaW50byBhIHRyaWVcbiAgcnVsZXM6IEFic3RyYWN0UnVsZVtdID0gW107XG5cbiAgLy8gdGhlIHJ1bGUgdG8gdXNlIGF1dG9tYXRpY2FsbHkgd2hlbiByZWNvZ25pemluZyBvciBnZW5lcmF0aW5nIGZyb20gdGhpcyBydWxlIHNldFxuICBkZWZhdWx0UnVsZTogUm91dGVSdWxlID0gbnVsbDtcblxuICAvKipcbiAgICogQ29uZmlndXJlIGFkZGl0aW9uYWwgcnVsZXMgaW4gdGhpcyBydWxlIHNldCBmcm9tIGEgcm91dGUgZGVmaW5pdGlvblxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgY29uZmlnIGlzIHRlcm1pbmFsXG4gICAqL1xuICBjb25maWcoY29uZmlnOiBSb3V0ZURlZmluaXRpb24pOiBib29sZWFuIHtcbiAgICBsZXQgaGFuZGxlcjtcblxuICAgIGlmIChpc1ByZXNlbnQoY29uZmlnLm5hbWUpICYmIGNvbmZpZy5uYW1lWzBdLnRvVXBwZXJDYXNlKCkgIT0gY29uZmlnLm5hbWVbMF0pIHtcbiAgICAgIGxldCBzdWdnZXN0ZWROYW1lID0gY29uZmlnLm5hbWVbMF0udG9VcHBlckNhc2UoKSArIGNvbmZpZy5uYW1lLnN1YnN0cmluZygxKTtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFxuICAgICAgICAgIGBSb3V0ZSBcIiR7Y29uZmlnLnBhdGh9XCIgd2l0aCBuYW1lIFwiJHtjb25maWcubmFtZX1cIiBkb2VzIG5vdCBiZWdpbiB3aXRoIGFuIHVwcGVyY2FzZSBsZXR0ZXIuIFJvdXRlIG5hbWVzIHNob3VsZCBiZSBDYW1lbENhc2UgbGlrZSBcIiR7c3VnZ2VzdGVkTmFtZX1cIi5gKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnIGluc3RhbmNlb2YgQXV4Um91dGUpIHtcbiAgICAgIGhhbmRsZXIgPSBuZXcgU3luY1JvdXRlSGFuZGxlcihjb25maWcuY29tcG9uZW50LCBjb25maWcuZGF0YSk7XG4gICAgICBsZXQgcm91dGVQYXRoID0gdGhpcy5fZ2V0Um91dGVQYXRoKGNvbmZpZyk7XG4gICAgICBsZXQgYXV4UnVsZSA9IG5ldyBSb3V0ZVJ1bGUocm91dGVQYXRoLCBoYW5kbGVyKTtcbiAgICAgIHRoaXMuYXV4UnVsZXNCeVBhdGguc2V0KHJvdXRlUGF0aC50b1N0cmluZygpLCBhdXhSdWxlKTtcbiAgICAgIGlmIChpc1ByZXNlbnQoY29uZmlnLm5hbWUpKSB7XG4gICAgICAgIHRoaXMuYXV4UnVsZXNCeU5hbWUuc2V0KGNvbmZpZy5uYW1lLCBhdXhSdWxlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhdXhSdWxlLnRlcm1pbmFsO1xuICAgIH1cblxuICAgIGxldCB1c2VBc0RlZmF1bHQgPSBmYWxzZTtcblxuICAgIGlmIChjb25maWcgaW5zdGFuY2VvZiBSZWRpcmVjdCkge1xuICAgICAgbGV0IHJvdXRlUGF0aCA9IHRoaXMuX2dldFJvdXRlUGF0aChjb25maWcpO1xuICAgICAgbGV0IHJlZGlyZWN0b3IgPSBuZXcgUmVkaXJlY3RSdWxlKHJvdXRlUGF0aCwgY29uZmlnLnJlZGlyZWN0VG8pO1xuICAgICAgdGhpcy5fYXNzZXJ0Tm9IYXNoQ29sbGlzaW9uKHJlZGlyZWN0b3IuaGFzaCwgY29uZmlnLnBhdGgpO1xuICAgICAgdGhpcy5ydWxlcy5wdXNoKHJlZGlyZWN0b3IpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZyBpbnN0YW5jZW9mIFJvdXRlKSB7XG4gICAgICBoYW5kbGVyID0gbmV3IFN5bmNSb3V0ZUhhbmRsZXIoY29uZmlnLmNvbXBvbmVudCwgY29uZmlnLmRhdGEpO1xuICAgICAgdXNlQXNEZWZhdWx0ID0gaXNQcmVzZW50KGNvbmZpZy51c2VBc0RlZmF1bHQpICYmIGNvbmZpZy51c2VBc0RlZmF1bHQ7XG4gICAgfSBlbHNlIGlmIChjb25maWcgaW5zdGFuY2VvZiBBc3luY1JvdXRlKSB7XG4gICAgICBoYW5kbGVyID0gbmV3IEFzeW5jUm91dGVIYW5kbGVyKGNvbmZpZy5sb2FkZXIsIGNvbmZpZy5kYXRhKTtcbiAgICAgIHVzZUFzRGVmYXVsdCA9IGlzUHJlc2VudChjb25maWcudXNlQXNEZWZhdWx0KSAmJiBjb25maWcudXNlQXNEZWZhdWx0O1xuICAgIH1cbiAgICBsZXQgcm91dGVQYXRoID0gdGhpcy5fZ2V0Um91dGVQYXRoKGNvbmZpZyk7XG4gICAgbGV0IG5ld1J1bGUgPSBuZXcgUm91dGVSdWxlKHJvdXRlUGF0aCwgaGFuZGxlcik7XG5cbiAgICB0aGlzLl9hc3NlcnROb0hhc2hDb2xsaXNpb24obmV3UnVsZS5oYXNoLCBjb25maWcucGF0aCk7XG5cbiAgICBpZiAodXNlQXNEZWZhdWx0KSB7XG4gICAgICBpZiAoaXNQcmVzZW50KHRoaXMuZGVmYXVsdFJ1bGUpKSB7XG4gICAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBPbmx5IG9uZSByb3V0ZSBjYW4gYmUgZGVmYXVsdGApO1xuICAgICAgfVxuICAgICAgdGhpcy5kZWZhdWx0UnVsZSA9IG5ld1J1bGU7XG4gICAgfVxuXG4gICAgdGhpcy5ydWxlcy5wdXNoKG5ld1J1bGUpO1xuICAgIGlmIChpc1ByZXNlbnQoY29uZmlnLm5hbWUpKSB7XG4gICAgICB0aGlzLnJ1bGVzQnlOYW1lLnNldChjb25maWcubmFtZSwgbmV3UnVsZSk7XG4gICAgfVxuICAgIHJldHVybiBuZXdSdWxlLnRlcm1pbmFsO1xuICB9XG5cblxuICAvKipcbiAgICogR2l2ZW4gYSBVUkwsIHJldHVybnMgYSBsaXN0IG9mIGBSb3V0ZU1hdGNoYGVzLCB3aGljaCBhcmUgcGFydGlhbCByZWNvZ25pdGlvbnMgZm9yIHNvbWUgcm91dGUuXG4gICAqL1xuICByZWNvZ25pemUodXJsUGFyc2U6IFVybCk6IFByb21pc2U8Um91dGVNYXRjaD5bXSB7XG4gICAgdmFyIHNvbHV0aW9ucyA9IFtdO1xuXG4gICAgdGhpcy5ydWxlcy5mb3JFYWNoKChyb3V0ZVJlY29nbml6ZXI6IEFic3RyYWN0UnVsZSkgPT4ge1xuICAgICAgdmFyIHBhdGhNYXRjaCA9IHJvdXRlUmVjb2duaXplci5yZWNvZ25pemUodXJsUGFyc2UpO1xuXG4gICAgICBpZiAoaXNQcmVzZW50KHBhdGhNYXRjaCkpIHtcbiAgICAgICAgc29sdXRpb25zLnB1c2gocGF0aE1hdGNoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGhhbmRsZSBjYXNlcyB3aGVyZSB3ZSBhcmUgcm91dGluZyBqdXN0IHRvIGFuIGF1eCByb3V0ZVxuICAgIGlmIChzb2x1dGlvbnMubGVuZ3RoID09IDAgJiYgaXNQcmVzZW50KHVybFBhcnNlKSAmJiB1cmxQYXJzZS5hdXhpbGlhcnkubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIFtQcm9taXNlV3JhcHBlci5yZXNvbHZlKG5ldyBQYXRoTWF0Y2gobnVsbCwgbnVsbCwgdXJsUGFyc2UuYXV4aWxpYXJ5KSldO1xuICAgIH1cblxuICAgIHJldHVybiBzb2x1dGlvbnM7XG4gIH1cblxuICByZWNvZ25pemVBdXhpbGlhcnkodXJsUGFyc2U6IFVybCk6IFByb21pc2U8Um91dGVNYXRjaD5bXSB7XG4gICAgdmFyIHJvdXRlUmVjb2duaXplcjogUm91dGVSdWxlID0gdGhpcy5hdXhSdWxlc0J5UGF0aC5nZXQodXJsUGFyc2UucGF0aCk7XG4gICAgaWYgKGlzUHJlc2VudChyb3V0ZVJlY29nbml6ZXIpKSB7XG4gICAgICByZXR1cm4gW3JvdXRlUmVjb2duaXplci5yZWNvZ25pemUodXJsUGFyc2UpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gW1Byb21pc2VXcmFwcGVyLnJlc29sdmUobnVsbCldO1xuICB9XG5cbiAgaGFzUm91dGUobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnJ1bGVzQnlOYW1lLmhhcyhuYW1lKTsgfVxuXG4gIGNvbXBvbmVudExvYWRlZChuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5oYXNSb3V0ZShuYW1lKSAmJiBpc1ByZXNlbnQodGhpcy5ydWxlc0J5TmFtZS5nZXQobmFtZSkuaGFuZGxlci5jb21wb25lbnRUeXBlKTtcbiAgfVxuXG4gIGxvYWRDb21wb25lbnQobmFtZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5ydWxlc0J5TmFtZS5nZXQobmFtZSkuaGFuZGxlci5yZXNvbHZlQ29tcG9uZW50VHlwZSgpO1xuICB9XG5cbiAgZ2VuZXJhdGUobmFtZTogc3RyaW5nLCBwYXJhbXM6IGFueSk6IENvbXBvbmVudEluc3RydWN0aW9uIHtcbiAgICB2YXIgcnVsZTogUm91dGVSdWxlID0gdGhpcy5ydWxlc0J5TmFtZS5nZXQobmFtZSk7XG4gICAgaWYgKGlzQmxhbmsocnVsZSkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gcnVsZS5nZW5lcmF0ZShwYXJhbXMpO1xuICB9XG5cbiAgZ2VuZXJhdGVBdXhpbGlhcnkobmFtZTogc3RyaW5nLCBwYXJhbXM6IGFueSk6IENvbXBvbmVudEluc3RydWN0aW9uIHtcbiAgICB2YXIgcnVsZTogUm91dGVSdWxlID0gdGhpcy5hdXhSdWxlc0J5TmFtZS5nZXQobmFtZSk7XG4gICAgaWYgKGlzQmxhbmsocnVsZSkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gcnVsZS5nZW5lcmF0ZShwYXJhbXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXNzZXJ0Tm9IYXNoQ29sbGlzaW9uKGhhc2g6IHN0cmluZywgcGF0aCkge1xuICAgIHRoaXMucnVsZXMuZm9yRWFjaCgocnVsZSkgPT4ge1xuICAgICAgaWYgKGhhc2ggPT0gcnVsZS5oYXNoKSB7XG4gICAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFxuICAgICAgICAgICAgYENvbmZpZ3VyYXRpb24gJyR7cGF0aH0nIGNvbmZsaWN0cyB3aXRoIGV4aXN0aW5nIHJvdXRlICcke3J1bGUucGF0aH0nYCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRSb3V0ZVBhdGgoY29uZmlnOiBSb3V0ZURlZmluaXRpb24pOiBSb3V0ZVBhdGgge1xuICAgIGlmIChpc1ByZXNlbnQoY29uZmlnLnJlZ2V4KSkge1xuICAgICAgaWYgKGlzRnVuY3Rpb24oY29uZmlnLnNlcmlhbGl6ZXIpKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVnZXhSb3V0ZVBhdGgoY29uZmlnLnJlZ2V4LCBjb25maWcuc2VyaWFsaXplcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcbiAgICAgICAgICAgIGBSb3V0ZSBwcm92aWRlcyBhIHJlZ2V4IHByb3BlcnR5LCAnJHtjb25maWcucmVnZXh9JywgYnV0IG5vIHNlcmlhbGl6ZXIgcHJvcGVydHlgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzUHJlc2VudChjb25maWcucGF0aCkpIHtcbiAgICAgIC8vIEF1eGlsaWFyeSByb3V0ZXMgZG8gbm90IGhhdmUgYSBzbGFzaCBhdCB0aGUgc3RhcnRcbiAgICAgIGxldCBwYXRoID0gKGNvbmZpZyBpbnN0YW5jZW9mIEF1eFJvdXRlICYmIGNvbmZpZy5wYXRoLnN0YXJ0c1dpdGgoJy8nKSkgP1xuICAgICAgICAgICAgICAgICAgICAgY29uZmlnLnBhdGguc3Vic3RyaW5nKDEpIDpcbiAgICAgICAgICAgICAgICAgICAgIGNvbmZpZy5wYXRoO1xuICAgICAgcmV0dXJuIG5ldyBQYXJhbVJvdXRlUGF0aChwYXRoKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oJ1JvdXRlIG11c3QgcHJvdmlkZSBlaXRoZXIgYSBwYXRoIG9yIHJlZ2V4IHByb3BlcnR5Jyk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
