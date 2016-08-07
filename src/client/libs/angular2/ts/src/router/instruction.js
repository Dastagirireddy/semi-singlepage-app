System.register(['angular2/src/facade/collection', 'angular2/src/facade/lang', 'angular2/src/facade/async'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var collection_1, lang_1, async_1;
    var RouteParams, RouteData, BLANK_ROUTE_DATA, Instruction, ResolvedInstruction, DefaultInstruction, UnresolvedInstruction, RedirectInstruction, ComponentInstruction;
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            }],
        execute: function() {
            /**
             * `RouteParams` is an immutable map of parameters for the given route
             * based on the url matcher and optional parameters for that route.
             *
             * You can inject `RouteParams` into the constructor of a component to use it.
             *
             * ### Example
             *
             * ```
             * import {Component} from 'angular2/core';
             * import {bootstrap} from 'angular2/platform/browser';
             * import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, RouteParams} from
             * 'angular2/router';
             *
             * @Component({directives: [ROUTER_DIRECTIVES]})
             * @RouteConfig([
             *  {path: '/user/:id', component: UserCmp, name: 'UserCmp'},
             * ])
             * class AppCmp {}
             *
             * @Component({ template: 'user: {{id}}' })
             * class UserCmp {
             *   id: string;
             *   constructor(params: RouteParams) {
             *     this.id = params.get('id');
             *   }
             * }
             *
             * bootstrap(AppCmp, ROUTER_PROVIDERS);
             * ```
             */
            RouteParams = (function () {
                function RouteParams(params) {
                    this.params = params;
                }
                RouteParams.prototype.get = function (param) { return lang_1.normalizeBlank(collection_1.StringMapWrapper.get(this.params, param)); };
                return RouteParams;
            }());
            exports_1("RouteParams", RouteParams);
            /**
             * `RouteData` is an immutable map of additional data you can configure in your {@link Route}.
             *
             * You can inject `RouteData` into the constructor of a component to use it.
             *
             * ### Example
             *
             * ```
             * import {Component} from 'angular2/core';
             * import {bootstrap} from 'angular2/platform/browser';
             * import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, RouteData} from
             * 'angular2/router';
             *
             * @Component({directives: [ROUTER_DIRECTIVES]})
             * @RouteConfig([
             *  {path: '/user/:id', component: UserCmp, name: 'UserCmp', data: {isAdmin: true}},
             * ])
             * class AppCmp {}
             *
             * @Component({
             *   ...,
             *   template: 'user: {{isAdmin}}'
             * })
             * class UserCmp {
             *   string: isAdmin;
             *   constructor(data: RouteData) {
             *     this.isAdmin = data.get('isAdmin');
             *   }
             * }
             *
             * bootstrap(AppCmp, ROUTER_PROVIDERS);
             * ```
             */
            RouteData = (function () {
                function RouteData(data) {
                    if (data === void 0) { data = lang_1.CONST_EXPR({}); }
                    this.data = data;
                }
                RouteData.prototype.get = function (key) { return lang_1.normalizeBlank(collection_1.StringMapWrapper.get(this.data, key)); };
                return RouteData;
            }());
            exports_1("RouteData", RouteData);
            exports_1("BLANK_ROUTE_DATA", BLANK_ROUTE_DATA = new RouteData());
            /**
             * `Instruction` is a tree of {@link ComponentInstruction}s with all the information needed
             * to transition each component in the app to a given route, including all auxiliary routes.
             *
             * `Instruction`s can be created using {@link Router#generate}, and can be used to
             * perform route changes with {@link Router#navigateByInstruction}.
             *
             * ### Example
             *
             * ```
             * import {Component} from 'angular2/core';
             * import {bootstrap} from 'angular2/platform/browser';
             * import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig} from 'angular2/router';
             *
             * @Component({directives: [ROUTER_DIRECTIVES]})
             * @RouteConfig([
             *  {...},
             * ])
             * class AppCmp {
             *   constructor(router: Router) {
             *     var instruction = router.generate(['/MyRoute']);
             *     router.navigateByInstruction(instruction);
             *   }
             * }
             *
             * bootstrap(AppCmp, ROUTER_PROVIDERS);
             * ```
             */
            Instruction = (function () {
                function Instruction(component, child, auxInstruction) {
                    this.component = component;
                    this.child = child;
                    this.auxInstruction = auxInstruction;
                }
                Object.defineProperty(Instruction.prototype, "urlPath", {
                    get: function () { return lang_1.isPresent(this.component) ? this.component.urlPath : ''; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Instruction.prototype, "urlParams", {
                    get: function () { return lang_1.isPresent(this.component) ? this.component.urlParams : []; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Instruction.prototype, "specificity", {
                    get: function () {
                        var total = '';
                        if (lang_1.isPresent(this.component)) {
                            total += this.component.specificity;
                        }
                        if (lang_1.isPresent(this.child)) {
                            total += this.child.specificity;
                        }
                        return total;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * converts the instruction into a URL string
                 */
                Instruction.prototype.toRootUrl = function () { return this.toUrlPath() + this.toUrlQuery(); };
                /** @internal */
                Instruction.prototype._toNonRootUrl = function () {
                    return this._stringifyPathMatrixAuxPrefixed() +
                        (lang_1.isPresent(this.child) ? this.child._toNonRootUrl() : '');
                };
                Instruction.prototype.toUrlQuery = function () { return this.urlParams.length > 0 ? ('?' + this.urlParams.join('&')) : ''; };
                /**
                 * Returns a new instruction that shares the state of the existing instruction, but with
                 * the given child {@link Instruction} replacing the existing child.
                 */
                Instruction.prototype.replaceChild = function (child) {
                    return new ResolvedInstruction(this.component, child, this.auxInstruction);
                };
                /**
                 * If the final URL for the instruction is ``
                 */
                Instruction.prototype.toUrlPath = function () {
                    return this.urlPath + this._stringifyAux() +
                        (lang_1.isPresent(this.child) ? this.child._toNonRootUrl() : '');
                };
                // default instructions override these
                Instruction.prototype.toLinkUrl = function () {
                    return this.urlPath + this._stringifyAux() +
                        (lang_1.isPresent(this.child) ? this.child._toLinkUrl() : '') + this.toUrlQuery();
                };
                // this is the non-root version (called recursively)
                /** @internal */
                Instruction.prototype._toLinkUrl = function () {
                    return this._stringifyPathMatrixAuxPrefixed() +
                        (lang_1.isPresent(this.child) ? this.child._toLinkUrl() : '');
                };
                /** @internal */
                Instruction.prototype._stringifyPathMatrixAuxPrefixed = function () {
                    var primary = this._stringifyPathMatrixAux();
                    if (primary.length > 0) {
                        primary = '/' + primary;
                    }
                    return primary;
                };
                /** @internal */
                Instruction.prototype._stringifyMatrixParams = function () {
                    return this.urlParams.length > 0 ? (';' + this.urlParams.join(';')) : '';
                };
                /** @internal */
                Instruction.prototype._stringifyPathMatrixAux = function () {
                    if (lang_1.isBlank(this.component)) {
                        return '';
                    }
                    return this.urlPath + this._stringifyMatrixParams() + this._stringifyAux();
                };
                /** @internal */
                Instruction.prototype._stringifyAux = function () {
                    var routes = [];
                    collection_1.StringMapWrapper.forEach(this.auxInstruction, function (auxInstruction, _) {
                        routes.push(auxInstruction._stringifyPathMatrixAux());
                    });
                    if (routes.length > 0) {
                        return '(' + routes.join('//') + ')';
                    }
                    return '';
                };
                return Instruction;
            }());
            exports_1("Instruction", Instruction);
            /**
             * a resolved instruction has an outlet instruction for itself, but maybe not for...
             */
            ResolvedInstruction = (function (_super) {
                __extends(ResolvedInstruction, _super);
                function ResolvedInstruction(component, child, auxInstruction) {
                    _super.call(this, component, child, auxInstruction);
                }
                ResolvedInstruction.prototype.resolveComponent = function () {
                    return async_1.PromiseWrapper.resolve(this.component);
                };
                return ResolvedInstruction;
            }(Instruction));
            exports_1("ResolvedInstruction", ResolvedInstruction);
            /**
             * Represents a resolved default route
             */
            DefaultInstruction = (function (_super) {
                __extends(DefaultInstruction, _super);
                function DefaultInstruction(component, child) {
                    _super.call(this, component, child, {});
                }
                DefaultInstruction.prototype.toLinkUrl = function () { return ''; };
                /** @internal */
                DefaultInstruction.prototype._toLinkUrl = function () { return ''; };
                return DefaultInstruction;
            }(ResolvedInstruction));
            exports_1("DefaultInstruction", DefaultInstruction);
            /**
             * Represents a component that may need to do some redirection or lazy loading at a later time.
             */
            UnresolvedInstruction = (function (_super) {
                __extends(UnresolvedInstruction, _super);
                function UnresolvedInstruction(_resolver, _urlPath, _urlParams) {
                    if (_urlPath === void 0) { _urlPath = ''; }
                    if (_urlParams === void 0) { _urlParams = lang_1.CONST_EXPR([]); }
                    _super.call(this, null, null, {});
                    this._resolver = _resolver;
                    this._urlPath = _urlPath;
                    this._urlParams = _urlParams;
                }
                Object.defineProperty(UnresolvedInstruction.prototype, "urlPath", {
                    get: function () {
                        if (lang_1.isPresent(this.component)) {
                            return this.component.urlPath;
                        }
                        if (lang_1.isPresent(this._urlPath)) {
                            return this._urlPath;
                        }
                        return '';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UnresolvedInstruction.prototype, "urlParams", {
                    get: function () {
                        if (lang_1.isPresent(this.component)) {
                            return this.component.urlParams;
                        }
                        if (lang_1.isPresent(this._urlParams)) {
                            return this._urlParams;
                        }
                        return [];
                    },
                    enumerable: true,
                    configurable: true
                });
                UnresolvedInstruction.prototype.resolveComponent = function () {
                    var _this = this;
                    if (lang_1.isPresent(this.component)) {
                        return async_1.PromiseWrapper.resolve(this.component);
                    }
                    return this._resolver().then(function (instruction) {
                        _this.child = lang_1.isPresent(instruction) ? instruction.child : null;
                        return _this.component = lang_1.isPresent(instruction) ? instruction.component : null;
                    });
                };
                return UnresolvedInstruction;
            }(Instruction));
            exports_1("UnresolvedInstruction", UnresolvedInstruction);
            RedirectInstruction = (function (_super) {
                __extends(RedirectInstruction, _super);
                function RedirectInstruction(component, child, auxInstruction, _specificity) {
                    _super.call(this, component, child, auxInstruction);
                    this._specificity = _specificity;
                }
                Object.defineProperty(RedirectInstruction.prototype, "specificity", {
                    get: function () { return this._specificity; },
                    enumerable: true,
                    configurable: true
                });
                return RedirectInstruction;
            }(ResolvedInstruction));
            exports_1("RedirectInstruction", RedirectInstruction);
            /**
             * A `ComponentInstruction` represents the route state for a single component.
             *
             * `ComponentInstructions` is a public API. Instances of `ComponentInstruction` are passed
             * to route lifecycle hooks, like {@link CanActivate}.
             *
             * `ComponentInstruction`s are [hash consed](https://en.wikipedia.org/wiki/Hash_consing). You should
             * never construct one yourself with "new." Instead, rely on {@link Router/RouteRecognizer} to
             * construct `ComponentInstruction`s.
             *
             * You should not modify this object. It should be treated as immutable.
             */
            ComponentInstruction = (function () {
                /**
                 * @internal
                 */
                function ComponentInstruction(urlPath, urlParams, data, componentType, terminal, specificity, params) {
                    if (params === void 0) { params = null; }
                    this.urlPath = urlPath;
                    this.urlParams = urlParams;
                    this.componentType = componentType;
                    this.terminal = terminal;
                    this.specificity = specificity;
                    this.params = params;
                    this.reuse = false;
                    this.routeData = lang_1.isPresent(data) ? data : BLANK_ROUTE_DATA;
                }
                return ComponentInstruction;
            }());
            exports_1("ComponentInstruction", ComponentInstruction);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9pbnN0cnVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Z0NBaUZXLGdCQUFnQjs7Ozs7Ozs7Ozs7OztZQTVFM0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQThCRztZQUNIO2dCQUNFLHFCQUFtQixNQUErQjtvQkFBL0IsV0FBTSxHQUFOLE1BQU0sQ0FBeUI7Z0JBQUcsQ0FBQztnQkFFdEQseUJBQUcsR0FBSCxVQUFJLEtBQWEsSUFBWSxNQUFNLENBQUMscUJBQWMsQ0FBQyw2QkFBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakcsa0JBQUM7WUFBRCxDQUpBLEFBSUMsSUFBQTtZQUpELHFDQUlDLENBQUE7WUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFnQ0c7WUFDSDtnQkFDRSxtQkFBbUIsSUFBMkM7b0JBQWxELG9CQUFrRCxHQUFsRCxPQUFvQyxpQkFBVSxDQUFDLEVBQUUsQ0FBQztvQkFBM0MsU0FBSSxHQUFKLElBQUksQ0FBdUM7Z0JBQUcsQ0FBQztnQkFFbEUsdUJBQUcsR0FBSCxVQUFJLEdBQVcsSUFBUyxNQUFNLENBQUMscUJBQWMsQ0FBQyw2QkFBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEYsZ0JBQUM7WUFBRCxDQUpBLEFBSUMsSUFBQTtZQUpELGlDQUlDLENBQUE7WUFFVSw4QkFBQSxnQkFBZ0IsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFBLENBQUM7WUFFOUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQTJCRztZQUNIO2dCQUNFLHFCQUFtQixTQUErQixFQUFTLEtBQWtCLEVBQzFELGNBQTRDO29CQUQ1QyxjQUFTLEdBQVQs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QUFtQixFQUNuRSxNQUFzQztvQkFBN0Msc0JBQTZDLEdBQTdDLGFBQTZDO29CQUZ0QyxZQUFPLEdBQVAsT0FBTyxDQUFRO29CQUFTLGNBQVMsR0FBVCxTQUFTLENBQVU7b0JBQzNDLGtCQUFhLEdBQWIsYUFBYSxDQUFBO29CQUFTLGFBQVEsR0FBUixRQUFRLENBQVM7b0JBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQVE7b0JBQ25FLFdBQU0sR0FBTixNQUFNLENBQWdDO29CQVJ6RCxVQUFLLEdBQVksS0FBSyxDQUFDO29CQVNyQixJQUFJLENBQUMsU0FBUyxHQUFHLGdCQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLGdCQUFnQixDQUFDO2dCQUM3RCxDQUFDO2dCQUNILDJCQUFDO1lBQUQsQ0FaQSxBQVlDLElBQUE7WUFaRCx1REFZQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9pbnN0cnVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TWFwLCBNYXBXcmFwcGVyLCBTdHJpbmdNYXBXcmFwcGVyLCBMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7aXNQcmVzZW50LCBpc0JsYW5rLCBub3JtYWxpemVCbGFuaywgVHlwZSwgQ09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7UHJvbWlzZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYXN5bmMnO1xuXG5cbi8qKlxuICogYFJvdXRlUGFyYW1zYCBpcyBhbiBpbW11dGFibGUgbWFwIG9mIHBhcmFtZXRlcnMgZm9yIHRoZSBnaXZlbiByb3V0ZVxuICogYmFzZWQgb24gdGhlIHVybCBtYXRjaGVyIGFuZCBvcHRpb25hbCBwYXJhbWV0ZXJzIGZvciB0aGF0IHJvdXRlLlxuICpcbiAqIFlvdSBjYW4gaW5qZWN0IGBSb3V0ZVBhcmFtc2AgaW50byB0aGUgY29uc3RydWN0b3Igb2YgYSBjb21wb25lbnQgdG8gdXNlIGl0LlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgXG4gKiBpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG4gKiBpbXBvcnQge2Jvb3RzdHJhcH0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vYnJvd3Nlcic7XG4gKiBpbXBvcnQge1JvdXRlciwgUk9VVEVSX0RJUkVDVElWRVMsIFJPVVRFUl9QUk9WSURFUlMsIFJvdXRlQ29uZmlnLCBSb3V0ZVBhcmFtc30gZnJvbVxuICogJ2FuZ3VsYXIyL3JvdXRlcic7XG4gKlxuICogQENvbXBvbmVudCh7ZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTXX0pXG4gKiBAUm91dGVDb25maWcoW1xuICogIHtwYXRoOiAnL3VzZXIvOmlkJywgY29tcG9uZW50OiBVc2VyQ21wLCBuYW1lOiAnVXNlckNtcCd9LFxuICogXSlcbiAqIGNsYXNzIEFwcENtcCB7fVxuICpcbiAqIEBDb21wb25lbnQoeyB0ZW1wbGF0ZTogJ3VzZXI6IHt7aWR9fScgfSlcbiAqIGNsYXNzIFVzZXJDbXAge1xuICogICBpZDogc3RyaW5nO1xuICogICBjb25zdHJ1Y3RvcihwYXJhbXM6IFJvdXRlUGFyYW1zKSB7XG4gKiAgICAgdGhpcy5pZCA9IHBhcmFtcy5nZXQoJ2lkJyk7XG4gKiAgIH1cbiAqIH1cbiAqXG4gKiBib290c3RyYXAoQXBwQ21wLCBST1VURVJfUFJPVklERVJTKTtcbiAqIGBgYFxuICovXG5leHBvcnQgY2xhc3MgUm91dGVQYXJhbXMge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGFyYW1zOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSkge31cblxuICBnZXQocGFyYW06IHN0cmluZyk6IHN0cmluZyB7IHJldHVybiBub3JtYWxpemVCbGFuayhTdHJpbmdNYXBXcmFwcGVyLmdldCh0aGlzLnBhcmFtcywgcGFyYW0pKTsgfVxufVxuXG4vKipcbiAqIGBSb3V0ZURhdGFgIGlzIGFuIGltbXV0YWJsZSBtYXAgb2YgYWRkaXRpb25hbCBkYXRhIHlvdSBjYW4gY29uZmlndXJlIGluIHlvdXIge0BsaW5rIFJvdXRlfS5cbiAqXG4gKiBZb3UgY2FuIGluamVjdCBgUm91dGVEYXRhYCBpbnRvIHRoZSBjb25zdHJ1Y3RvciBvZiBhIGNvbXBvbmVudCB0byB1c2UgaXQuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGBcbiAqIGltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbiAqIGltcG9ydCB7Ym9vdHN0cmFwfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9icm93c2VyJztcbiAqIGltcG9ydCB7Um91dGVyLCBST1VURVJfRElSRUNUSVZFUywgUk9VVEVSX1BST1ZJREVSUywgUm91dGVDb25maWcsIFJvdXRlRGF0YX0gZnJvbVxuICogJ2FuZ3VsYXIyL3JvdXRlcic7XG4gKlxuICogQENvbXBvbmVudCh7ZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTXX0pXG4gKiBAUm91dGVDb25maWcoW1xuICogIHtwYXRoOiAnL3VzZXIvOmlkJywgY29tcG9uZW50OiBVc2VyQ21wLCBuYW1lOiAnVXNlckNtcCcsIGRhdGE6IHtpc0FkbWluOiB0cnVlfX0sXG4gKiBdKVxuICogY2xhc3MgQXBwQ21wIHt9XG4gKlxuICogQENvbXBvbmVudCh7XG4gKiAgIC4uLixcbiAqICAgdGVtcGxhdGU6ICd1c2VyOiB7e2lzQWRtaW59fSdcbiAqIH0pXG4gKiBjbGFzcyBVc2VyQ21wIHtcbiAqICAgc3RyaW5nOiBpc0FkbWluO1xuICogICBjb25zdHJ1Y3RvcihkYXRhOiBSb3V0ZURhdGEpIHtcbiAqICAgICB0aGlzLmlzQWRtaW4gPSBkYXRhLmdldCgnaXNBZG1pbicpO1xuICogICB9XG4gKiB9XG4gKlxuICogYm9vdHN0cmFwKEFwcENtcCwgUk9VVEVSX1BST1ZJREVSUyk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNsYXNzIFJvdXRlRGF0YSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSA9IENPTlNUX0VYUFIoe30pKSB7fVxuXG4gIGdldChrZXk6IHN0cmluZyk6IGFueSB7IHJldHVybiBub3JtYWxpemVCbGFuayhTdHJpbmdNYXBXcmFwcGVyLmdldCh0aGlzLmRhdGEsIGtleSkpOyB9XG59XG5cbmV4cG9ydCB2YXIgQkxBTktfUk9VVEVfREFUQSA9IG5ldyBSb3V0ZURhdGEoKTtcblxuLyoqXG4gKiBgSW5zdHJ1Y3Rpb25gIGlzIGEgdHJlZSBvZiB7QGxpbmsgQ29tcG9uZW50SW5zdHJ1Y3Rpb259cyB3aXRoIGFsbCB0aGUgaW5mb3JtYXRpb24gbmVlZGVkXG4gKiB0byB0cmFuc2l0aW9uIGVhY2ggY29tcG9uZW50IGluIHRoZSBhcHAgdG8gYSBnaXZlbiByb3V0ZSwgaW5jbHVkaW5nIGFsbCBhdXhpbGlhcnkgcm91dGVzLlxuICpcbiAqIGBJbnN0cnVjdGlvbmBzIGNhbiBiZSBjcmVhdGVkIHVzaW5nIHtAbGluayBSb3V0ZXIjZ2VuZXJhdGV9LCBhbmQgY2FuIGJlIHVzZWQgdG9cbiAqIHBlcmZvcm0gcm91dGUgY2hhbmdlcyB3aXRoIHtAbGluayBSb3V0ZXIjbmF2aWdhdGVCeUluc3RydWN0aW9ufS5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYFxuICogaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuICogaW1wb3J0IHtib290c3RyYXB9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXInO1xuICogaW1wb3J0IHtSb3V0ZXIsIFJPVVRFUl9ESVJFQ1RJVkVTLCBST1VURVJfUFJPVklERVJTLCBSb3V0ZUNvbmZpZ30gZnJvbSAnYW5ndWxhcjIvcm91dGVyJztcbiAqXG4gKiBAQ29tcG9uZW50KHtkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVNdfSlcbiAqIEBSb3V0ZUNvbmZpZyhbXG4gKiAgey4uLn0sXG4gKiBdKVxuICogY2xhc3MgQXBwQ21wIHtcbiAqICAgY29uc3RydWN0b3Iocm91dGVyOiBSb3V0ZXIpIHtcbiAqICAgICB2YXIgaW5zdHJ1Y3Rpb24gPSByb3V0ZXIuZ2VuZXJhdGUoWycvTXlSb3V0ZSddKTtcbiAqICAgICByb3V0ZXIubmF2aWdhdGVCeUluc3RydWN0aW9uKGluc3RydWN0aW9uKTtcbiAqICAgfVxuICogfVxuICpcbiAqIGJvb3RzdHJhcChBcHBDbXAsIFJPVVRFUl9QUk9WSURFUlMpO1xuICogYGBgXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJbnN0cnVjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb21wb25lbnQ6IENvbXBvbmVudEluc3RydWN0aW9uLCBwdWJsaWMgY2hpbGQ6IEluc3RydWN0aW9uLFxuICAgICAgICAgICAgICBwdWJsaWMgYXV4SW5zdHJ1Y3Rpb246IHtba2V5OiBzdHJpbmddOiBJbnN0cnVjdGlvbn0pIHt9XG5cbiAgZ2V0IHVybFBhdGgoKTogc3RyaW5nIHsgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmNvbXBvbmVudCkgPyB0aGlzLmNvbXBvbmVudC51cmxQYXRoIDogJyc7IH1cblxuICBnZXQgdXJsUGFyYW1zKCk6IHN0cmluZ1tdIHsgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmNvbXBvbmVudCkgPyB0aGlzLmNvbXBvbmVudC51cmxQYXJhbXMgOiBbXTsgfVxuXG4gIGdldCBzcGVjaWZpY2l0eSgpOiBzdHJpbmcge1xuICAgIHZhciB0b3RhbCA9ICcnO1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5jb21wb25lbnQpKSB7XG4gICAgICB0b3RhbCArPSB0aGlzLmNvbXBvbmVudC5zcGVjaWZpY2l0eTtcbiAgICB9XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLmNoaWxkKSkge1xuICAgICAgdG90YWwgKz0gdGhpcy5jaGlsZC5zcGVjaWZpY2l0eTtcbiAgICB9XG4gICAgcmV0dXJuIHRvdGFsO1xuICB9XG5cbiAgYWJzdHJhY3QgcmVzb2x2ZUNvbXBvbmVudCgpOiBQcm9taXNlPENvbXBvbmVudEluc3RydWN0aW9uPjtcblxuICAvKipcbiAgICogY29udmVydHMgdGhlIGluc3RydWN0aW9uIGludG8gYSBVUkwgc3RyaW5nXG4gICAqL1xuICB0b1Jvb3RVcmwoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMudG9VcmxQYXRoKCkgKyB0aGlzLnRvVXJsUXVlcnkoKTsgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3RvTm9uUm9vdFVybCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9zdHJpbmdpZnlQYXRoTWF0cml4QXV4UHJlZml4ZWQoKSArXG4gICAgICAgICAgIChpc1ByZXNlbnQodGhpcy5jaGlsZCkgPyB0aGlzLmNoaWxkLl90b05vblJvb3RVcmwoKSA6ICcnKTtcbiAgfVxuXG4gIHRvVXJsUXVlcnkoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMudXJsUGFyYW1zLmxlbmd0aCA+IDAgPyAoJz8nICsgdGhpcy51cmxQYXJhbXMuam9pbignJicpKSA6ICcnOyB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBuZXcgaW5zdHJ1Y3Rpb24gdGhhdCBzaGFyZXMgdGhlIHN0YXRlIG9mIHRoZSBleGlzdGluZyBpbnN0cnVjdGlvbiwgYnV0IHdpdGhcbiAgICogdGhlIGdpdmVuIGNoaWxkIHtAbGluayBJbnN0cnVjdGlvbn0gcmVwbGFjaW5nIHRoZSBleGlzdGluZyBjaGlsZC5cbiAgICovXG4gIHJlcGxhY2VDaGlsZChjaGlsZDogSW5zdHJ1Y3Rpb24pOiBJbnN0cnVjdGlvbiB7XG4gICAgcmV0dXJuIG5ldyBSZXNvbHZlZEluc3RydWN0aW9uKHRoaXMuY29tcG9uZW50LCBjaGlsZCwgdGhpcy5hdXhJbnN0cnVjdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogSWYgdGhlIGZpbmFsIFVSTCBmb3IgdGhlIGluc3RydWN0aW9uIGlzIGBgXG4gICAqL1xuICB0b1VybFBhdGgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy51cmxQYXRoICsgdGhpcy5fc3RyaW5naWZ5QXV4KCkgK1xuICAgICAgICAgICAoaXNQcmVzZW50KHRoaXMuY2hpbGQpID8gdGhpcy5jaGlsZC5fdG9Ob25Sb290VXJsKCkgOiAnJyk7XG4gIH1cblxuICAvLyBkZWZhdWx0IGluc3RydWN0aW9ucyBvdmVycmlkZSB0aGVzZVxuICB0b0xpbmtVcmwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy51cmxQYXRoICsgdGhpcy5fc3RyaW5naWZ5QXV4KCkgK1xuICAgICAgICAgICAoaXNQcmVzZW50KHRoaXMuY2hpbGQpID8gdGhpcy5jaGlsZC5fdG9MaW5rVXJsKCkgOiAnJykgKyB0aGlzLnRvVXJsUXVlcnkoKTtcbiAgfVxuXG4gIC8vIHRoaXMgaXMgdGhlIG5vbi1yb290IHZlcnNpb24gKGNhbGxlZCByZWN1cnNpdmVseSlcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfdG9MaW5rVXJsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3N0cmluZ2lmeVBhdGhNYXRyaXhBdXhQcmVmaXhlZCgpICtcbiAgICAgICAgICAgKGlzUHJlc2VudCh0aGlzLmNoaWxkKSA/IHRoaXMuY2hpbGQuX3RvTGlua1VybCgpIDogJycpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc3RyaW5naWZ5UGF0aE1hdHJpeEF1eFByZWZpeGVkKCk6IHN0cmluZyB7XG4gICAgdmFyIHByaW1hcnkgPSB0aGlzLl9zdHJpbmdpZnlQYXRoTWF0cml4QXV4KCk7XG4gICAgaWYgKHByaW1hcnkubGVuZ3RoID4gMCkge1xuICAgICAgcHJpbWFyeSA9ICcvJyArIHByaW1hcnk7XG4gICAgfVxuICAgIHJldHVybiBwcmltYXJ5O1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc3RyaW5naWZ5TWF0cml4UGFyYW1zKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudXJsUGFyYW1zLmxlbmd0aCA+IDAgPyAoJzsnICsgdGhpcy51cmxQYXJhbXMuam9pbignOycpKSA6ICcnO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc3RyaW5naWZ5UGF0aE1hdHJpeEF1eCgpOiBzdHJpbmcge1xuICAgIGlmIChpc0JsYW5rKHRoaXMuY29tcG9uZW50KSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy51cmxQYXRoICsgdGhpcy5fc3RyaW5naWZ5TWF0cml4UGFyYW1zKCkgKyB0aGlzLl9zdHJpbmdpZnlBdXgoKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3N0cmluZ2lmeUF1eCgpOiBzdHJpbmcge1xuICAgIHZhciByb3V0ZXMgPSBbXTtcbiAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2godGhpcy5hdXhJbnN0cnVjdGlvbiwgKGF1eEluc3RydWN0aW9uOiBJbnN0cnVjdGlvbiwgXzogc3RyaW5nKSA9PiB7XG4gICAgICByb3V0ZXMucHVzaChhdXhJbnN0cnVjdGlvbi5fc3RyaW5naWZ5UGF0aE1hdHJpeEF1eCgpKTtcbiAgICB9KTtcbiAgICBpZiAocm91dGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiAnKCcgKyByb3V0ZXMuam9pbignLy8nKSArICcpJztcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG59XG5cblxuLyoqXG4gKiBhIHJlc29sdmVkIGluc3RydWN0aW9uIGhhcyBhbiBvdXRsZXQgaW5zdHJ1Y3Rpb24gZm9yIGl0c2VsZiwgYnV0IG1heWJlIG5vdCBmb3IuLi5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlc29sdmVkSW5zdHJ1Y3Rpb24gZXh0ZW5kcyBJbnN0cnVjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKGNvbXBvbmVudDogQ29tcG9uZW50SW5zdHJ1Y3Rpb24sIGNoaWxkOiBJbnN0cnVjdGlvbixcbiAgICAgICAgICAgICAgYXV4SW5zdHJ1Y3Rpb246IHtba2V5OiBzdHJpbmddOiBJbnN0cnVjdGlvbn0pIHtcbiAgICBzdXBlcihjb21wb25lbnQsIGNoaWxkLCBhdXhJbnN0cnVjdGlvbik7XG4gIH1cblxuICByZXNvbHZlQ29tcG9uZW50KCk6IFByb21pc2U8Q29tcG9uZW50SW5zdHJ1Y3Rpb24+IHtcbiAgICByZXR1cm4gUHJvbWlzZVdyYXBwZXIucmVzb2x2ZSh0aGlzLmNvbXBvbmVudCk7XG4gIH1cbn1cblxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSByZXNvbHZlZCBkZWZhdWx0IHJvdXRlXG4gKi9cbmV4cG9ydCBjbGFzcyBEZWZhdWx0SW5zdHJ1Y3Rpb24gZXh0ZW5kcyBSZXNvbHZlZEluc3RydWN0aW9uIHtcbiAgY29uc3RydWN0b3IoY29tcG9uZW50OiBDb21wb25lbnRJbnN0cnVjdGlvbiwgY2hpbGQ6IERlZmF1bHRJbnN0cnVjdGlvbikge1xuICAgIHN1cGVyKGNvbXBvbmVudCwgY2hpbGQsIHt9KTtcbiAgfVxuXG4gIHRvTGlua1VybCgpOiBzdHJpbmcgeyByZXR1cm4gJyc7IH1cblxuICAvKiogQGludGVybmFsICovXG4gIF90b0xpbmtVcmwoKTogc3RyaW5nIHsgcmV0dXJuICcnOyB9XG59XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY29tcG9uZW50IHRoYXQgbWF5IG5lZWQgdG8gZG8gc29tZSByZWRpcmVjdGlvbiBvciBsYXp5IGxvYWRpbmcgYXQgYSBsYXRlciB0aW1lLlxuICovXG5leHBvcnQgY2xhc3MgVW5yZXNvbHZlZEluc3RydWN0aW9uIGV4dGVuZHMgSW5zdHJ1Y3Rpb24ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yZXNvbHZlcjogKCkgPT4gUHJvbWlzZTxJbnN0cnVjdGlvbj4sIHByaXZhdGUgX3VybFBhdGg6IHN0cmluZyA9ICcnLFxuICAgICAgICAgICAgICBwcml2YXRlIF91cmxQYXJhbXM6IHN0cmluZ1tdID0gQ09OU1RfRVhQUihbXSkpIHtcbiAgICBzdXBlcihudWxsLCBudWxsLCB7fSk7XG4gIH1cblxuICBnZXQgdXJsUGF0aCgpOiBzdHJpbmcge1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5jb21wb25lbnQpKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb21wb25lbnQudXJsUGF0aDtcbiAgICB9XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl91cmxQYXRoKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3VybFBhdGg7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGdldCB1cmxQYXJhbXMoKTogc3RyaW5nW10ge1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5jb21wb25lbnQpKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb21wb25lbnQudXJsUGFyYW1zO1xuICAgIH1cbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuX3VybFBhcmFtcykpIHtcbiAgICAgIHJldHVybiB0aGlzLl91cmxQYXJhbXM7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHJlc29sdmVDb21wb25lbnQoKTogUHJvbWlzZTxDb21wb25lbnRJbnN0cnVjdGlvbj4ge1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5jb21wb25lbnQpKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZVdyYXBwZXIucmVzb2x2ZSh0aGlzLmNvbXBvbmVudCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9yZXNvbHZlcigpLnRoZW4oKGluc3RydWN0aW9uOiBJbnN0cnVjdGlvbikgPT4ge1xuICAgICAgdGhpcy5jaGlsZCA9IGlzUHJlc2VudChpbnN0cnVjdGlvbikgPyBpbnN0cnVjdGlvbi5jaGlsZCA6IG51bGw7XG4gICAgICByZXR1cm4gdGhpcy5jb21wb25lbnQgPSBpc1ByZXNlbnQoaW5zdHJ1Y3Rpb24pID8gaW5zdHJ1Y3Rpb24uY29tcG9uZW50IDogbnVsbDtcbiAgICB9KTtcbiAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBSZWRpcmVjdEluc3RydWN0aW9uIGV4dGVuZHMgUmVzb2x2ZWRJbnN0cnVjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKGNvbXBvbmVudDogQ29tcG9uZW50SW5zdHJ1Y3Rpb24sIGNoaWxkOiBJbnN0cnVjdGlvbixcbiAgICAgICAgICAgICAgYXV4SW5zdHJ1Y3Rpb246IHtba2V5OiBzdHJpbmddOiBJbnN0cnVjdGlvbn0sIHByaXZhdGUgX3NwZWNpZmljaXR5OiBzdHJpbmcpIHtcbiAgICBzdXBlcihjb21wb25lbnQsIGNoaWxkLCBhdXhJbnN0cnVjdGlvbik7XG4gIH1cblxuICBnZXQgc3BlY2lmaWNpdHkoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3NwZWNpZmljaXR5OyB9XG59XG5cblxuLyoqXG4gKiBBIGBDb21wb25lbnRJbnN0cnVjdGlvbmAgcmVwcmVzZW50cyB0aGUgcm91dGUgc3RhdGUgZm9yIGEgc2luZ2xlIGNvbXBvbmVudC5cbiAqXG4gKiBgQ29tcG9uZW50SW5zdHJ1Y3Rpb25zYCBpcyBhIHB1YmxpYyBBUEkuIEluc3RhbmNlcyBvZiBgQ29tcG9uZW50SW5zdHJ1Y3Rpb25gIGFyZSBwYXNzZWRcbiAqIHRvIHJvdXRlIGxpZmVjeWNsZSBob29rcywgbGlrZSB7QGxpbmsgQ2FuQWN0aXZhdGV9LlxuICpcbiAqIGBDb21wb25lbnRJbnN0cnVjdGlvbmBzIGFyZSBbaGFzaCBjb25zZWRdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0hhc2hfY29uc2luZykuIFlvdSBzaG91bGRcbiAqIG5ldmVyIGNvbnN0cnVjdCBvbmUgeW91cnNlbGYgd2l0aCBcIm5ldy5cIiBJbnN0ZWFkLCByZWx5IG9uIHtAbGluayBSb3V0ZXIvUm91dGVSZWNvZ25pemVyfSB0b1xuICogY29uc3RydWN0IGBDb21wb25lbnRJbnN0cnVjdGlvbmBzLlxuICpcbiAqIFlvdSBzaG91bGQgbm90IG1vZGlmeSB0aGlzIG9iamVjdC4gSXQgc2hvdWxkIGJlIHRyZWF0ZWQgYXMgaW1tdXRhYmxlLlxuICovXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50SW5zdHJ1Y3Rpb24ge1xuICByZXVzZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgcm91dGVEYXRhOiBSb3V0ZURhdGE7XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgY29uc3RydWN0b3IocHVibGljIHVybFBhdGg6IHN0cmluZywgcHVibGljIHVybFBhcmFtczogc3RyaW5nW10sIGRhdGE6IFJvdXRlRGF0YSxcbiAgICAgICAgICAgICAgcHVibGljIGNvbXBvbmVudFR5cGUsIHB1YmxpYyB0ZXJtaW5hbDogYm9vbGVhbiwgcHVibGljIHNwZWNpZmljaXR5OiBzdHJpbmcsXG4gICAgICAgICAgICAgIHB1YmxpYyBwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0gbnVsbCkge1xuICAgIHRoaXMucm91dGVEYXRhID0gaXNQcmVzZW50KGRhdGEpID8gZGF0YSA6IEJMQU5LX1JPVVRFX0RBVEE7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
