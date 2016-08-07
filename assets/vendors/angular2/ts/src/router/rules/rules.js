System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/promise', 'angular2/src/facade/collection', '../url_parser', '../instruction'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lang_1, exceptions_1, promise_1, collection_1, url_parser_1, instruction_1;
    var RouteMatch, PathMatch, RedirectMatch, RedirectRule, RouteRule;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (promise_1_1) {
                promise_1 = promise_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (url_parser_1_1) {
                url_parser_1 = url_parser_1_1;
            },
            function (instruction_1_1) {
                instruction_1 = instruction_1_1;
            }],
        execute: function() {
            // RouteMatch objects hold information about a match between a rule and a URL
            RouteMatch = (function () {
                function RouteMatch() {
                }
                return RouteMatch;
            }());
            exports_1("RouteMatch", RouteMatch);
            PathMatch = (function (_super) {
                __extends(PathMatch, _super);
                function PathMatch(instruction, remaining, remainingAux) {
                    _super.call(this);
                    this.instruction = instruction;
                    this.remaining = remaining;
                    this.remainingAux = remainingAux;
                }
                return PathMatch;
            }(RouteMatch));
            exports_1("PathMatch", PathMatch);
            RedirectMatch = (function (_super) {
                __extends(RedirectMatch, _super);
                function RedirectMatch(redirectTo, specificity) {
                    _super.call(this);
                    this.redirectTo = redirectTo;
                    this.specificity = specificity;
                }
                return RedirectMatch;
            }(RouteMatch));
            exports_1("RedirectMatch", RedirectMatch);
            RedirectRule = (function () {
                function RedirectRule(_pathRecognizer, redirectTo) {
                    this._pathRecognizer = _pathRecognizer;
                    this.redirectTo = redirectTo;
                    this.hash = this._pathRecognizer.hash;
                }
                Object.defineProperty(RedirectRule.prototype, "path", {
                    get: function () { return this._pathRecognizer.toString(); },
                    set: function (val) { throw new exceptions_1.BaseException('you cannot set the path of a RedirectRule directly'); },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Returns `null` or a `ParsedUrl` representing the new path to match
                 */
                RedirectRule.prototype.recognize = function (beginningSegment) {
                    var match = null;
                    if (lang_1.isPresent(this._pathRecognizer.matchUrl(beginningSegment))) {
                        match = new RedirectMatch(this.redirectTo, this._pathRecognizer.specificity);
                    }
                    return promise_1.PromiseWrapper.resolve(match);
                };
                RedirectRule.prototype.generate = function (params) {
                    throw new exceptions_1.BaseException("Tried to generate a redirect.");
                };
                return RedirectRule;
            }());
            exports_1("RedirectRule", RedirectRule);
            // represents something like '/foo/:bar'
            RouteRule = (function () {
                // TODO: cache component instruction instances by params and by ParsedUrl instance
                function RouteRule(_routePath, handler, _routeName) {
                    this._routePath = _routePath;
                    this.handler = handler;
                    this._routeName = _routeName;
                    this._cache = new collection_1.Map();
                    this.specificity = this._routePath.specificity;
                    this.hash = this._routePath.hash;
                    this.terminal = this._routePath.terminal;
                }
                Object.defineProperty(RouteRule.prototype, "path", {
                    get: function () { return this._routePath.toString(); },
                    set: function (val) { throw new exceptions_1.BaseException('you cannot set the path of a RouteRule directly'); },
                    enumerable: true,
                    configurable: true
                });
                RouteRule.prototype.recognize = function (beginningSegment) {
                    var _this = this;
                    var res = this._routePath.matchUrl(beginningSegment);
                    if (lang_1.isBlank(res)) {
                        return null;
                    }
                    return this.handler.resolveComponentType().then(function (_) {
                        var componentInstruction = _this._getInstruction(res.urlPath, res.urlParams, res.allParams);
                        return new PathMatch(componentInstruction, res.rest, res.auxiliary);
                    });
                };
                RouteRule.prototype.generate = function (params) {
                    var generated = this._routePath.generateUrl(params);
                    var urlPath = generated.urlPath;
                    var urlParams = generated.urlParams;
                    return this._getInstruction(urlPath, url_parser_1.convertUrlParamsToArray(urlParams), params);
                };
                RouteRule.prototype.generateComponentPathValues = function (params) {
                    return this._routePath.generateUrl(params);
                };
                RouteRule.prototype._getInstruction = function (urlPath, urlParams, params) {
                    if (lang_1.isBlank(this.handler.componentType)) {
                        throw new exceptions_1.BaseException("Tried to get instruction before the type was loaded.");
                    }
                    var hashKey = urlPath + '?' + urlParams.join('&');
                    if (this._cache.has(hashKey)) {
                        return this._cache.get(hashKey);
                    }
                    var instruction = new instruction_1.ComponentInstruction(urlPath, urlParams, this.handler.data, this.handler.componentType, this.terminal, this.specificity, params, this._routeName);
                    this._cache.set(hashKey, instruction);
                    return instruction;
                };
                return RouteRule;
            }());
            exports_1("RouteRule", RouteRule);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvcnVsZXMvcnVsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQVdBLDZFQUE2RTtZQUM3RTtnQkFBQTtnQkFBa0MsQ0FBQztnQkFBRCxpQkFBQztZQUFELENBQWxDLEFBQW1DLElBQUE7WUFBbkMsbUNBQW1DLENBQUE7WUFFbkM7Z0JBQStCLDZCQUFVO2dCQUN2QyxtQkFBbUIsV0FBaUMsRUFBUyxTQUFjLEVBQ3hELFlBQW1CO29CQUNwQyxpQkFBTyxDQUFDO29CQUZTLGdCQUFXLEdBQVgsV0FBVyxDQUFzQjtvQkFBUyxjQUFTLEdBQVQsU0FBUyxDQUFLO29CQUN4RCxpQkFBWSxHQUFaLFlBQVksQ0FBTztnQkFFdEMsQ0FBQztnQkFDSCxnQkFBQztZQUFELENBTEEsQUFLQyxDQUw4QixVQUFVLEdBS3hDO1lBTEQsaUNBS0MsQ0FBQTtZQUVEO2dCQUFtQyxpQ0FBVTtnQkFDM0MsdUJBQW1CLFVBQWlCLEVBQVMsV0FBVztvQkFBSSxpQkFBTyxDQUFDO29CQUFqRCxlQUFVLEdBQVYsVUFBVSxDQUFPO29CQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFBO2dCQUFhLENBQUM7Z0JBQ3hFLG9CQUFDO1lBQUQsQ0FGQSxBQUVDLENBRmtDLFVBQVUsR0FFNUM7WUFGRCx5Q0FFQyxDQUFBO1lBVUQ7Z0JBR0Usc0JBQW9CLGVBQTBCLEVBQVMsVUFBaUI7b0JBQXBELG9CQUFlLEdBQWYsZUFBZSxDQUFXO29CQUFTLGVBQVUsR0FBVixVQUFVLENBQU87b0JBQ3RFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7Z0JBQ3hDLENBQUM7Z0JBRUQsc0JBQUksOEJBQUk7eUJBQVIsY0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7eUJBQ3RELFVBQVMs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REEsQUEwREMsSUFBQTtZQTFERCxpQ0EwREMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvcm91dGVyL3J1bGVzL3J1bGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc1ByZXNlbnQsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge1Byb21pc2VXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL3Byb21pc2UnO1xuaW1wb3J0IHtNYXB9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5cbmltcG9ydCB7Um91dGVIYW5kbGVyfSBmcm9tICcuL3JvdXRlX2hhbmRsZXJzL3JvdXRlX2hhbmRsZXInO1xuaW1wb3J0IHtVcmwsIGNvbnZlcnRVcmxQYXJhbXNUb0FycmF5fSBmcm9tICcuLi91cmxfcGFyc2VyJztcbmltcG9ydCB7Q29tcG9uZW50SW5zdHJ1Y3Rpb259IGZyb20gJy4uL2luc3RydWN0aW9uJztcbmltcG9ydCB7Um91dGVQYXRoLCBHZW5lcmF0ZWRVcmx9IGZyb20gJy4vcm91dGVfcGF0aHMvcm91dGVfcGF0aCc7XG5cblxuLy8gUm91dGVNYXRjaCBvYmplY3RzIGhvbGQgaW5mb3JtYXRpb24gYWJvdXQgYSBtYXRjaCBiZXR3ZWVuIGEgcnVsZSBhbmQgYSBVUkxcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSb3V0ZU1hdGNoIHt9XG5cbmV4cG9ydCBjbGFzcyBQYXRoTWF0Y2ggZXh0ZW5kcyBSb3V0ZU1hdGNoIHtcbiAgY29uc3RydWN0b3IocHVibGljIGluc3RydWN0aW9uOiBDb21wb25lbnRJbnN0cnVjdGlvbiwgcHVibGljIHJlbWFpbmluZzogVXJsLFxuICAgICAgICAgICAgICBwdWJsaWMgcmVtYWluaW5nQXV4OiBVcmxbXSkge1xuICAgIHN1cGVyKCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlZGlyZWN0TWF0Y2ggZXh0ZW5kcyBSb3V0ZU1hdGNoIHtcbiAgY29uc3RydWN0b3IocHVibGljIHJlZGlyZWN0VG86IGFueVtdLCBwdWJsaWMgc3BlY2lmaWNpdHkpIHsgc3VwZXIoKTsgfVxufVxuXG4vLyBSdWxlcyBhcmUgcmVzcG9uc2libGUgZm9yIHJlY29nbml6aW5nIFVSTCBzZWdtZW50cyBhbmQgZ2VuZXJhdGluZyBpbnN0cnVjdGlvbnNcbmV4cG9ydCBpbnRlcmZhY2UgQWJzdHJhY3RSdWxlIHtcbiAgaGFzaDogc3RyaW5nO1xuICBwYXRoOiBzdHJpbmc7XG4gIHJlY29nbml6ZShiZWdpbm5pbmdTZWdtZW50OiBVcmwpOiBQcm9taXNlPFJvdXRlTWF0Y2g+O1xuICBnZW5lcmF0ZShwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogQ29tcG9uZW50SW5zdHJ1Y3Rpb247XG59XG5cbmV4cG9ydCBjbGFzcyBSZWRpcmVjdFJ1bGUgaW1wbGVtZW50cyBBYnN0cmFjdFJ1bGUge1xuICBwdWJsaWMgaGFzaDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BhdGhSZWNvZ25pemVyOiBSb3V0ZVBhdGgsIHB1YmxpYyByZWRpcmVjdFRvOiBhbnlbXSkge1xuICAgIHRoaXMuaGFzaCA9IHRoaXMuX3BhdGhSZWNvZ25pemVyLmhhc2g7XG4gIH1cblxuICBnZXQgcGF0aCgpIHsgcmV0dXJuIHRoaXMuX3BhdGhSZWNvZ25pemVyLnRvU3RyaW5nKCk7IH1cbiAgc2V0IHBhdGgodmFsKSB7IHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKCd5b3UgY2Fubm90IHNldCB0aGUgcGF0aCBvZiBhIFJlZGlyZWN0UnVsZSBkaXJlY3RseScpOyB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYG51bGxgIG9yIGEgYFBhcnNlZFVybGAgcmVwcmVzZW50aW5nIHRoZSBuZXcgcGF0aCB0byBtYXRjaFxuICAgKi9cbiAgcmVjb2duaXplKGJlZ2lubmluZ1NlZ21lbnQ6IFVybCk6IFByb21pc2U8Um91dGVNYXRjaD4ge1xuICAgIHZhciBtYXRjaCA9IG51bGw7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl9wYXRoUmVjb2duaXplci5tYXRjaFVybChiZWdpbm5pbmdTZWdtZW50KSkpIHtcbiAgICAgIG1hdGNoID0gbmV3IFJlZGlyZWN0TWF0Y2godGhpcy5yZWRpcmVjdFRvLCB0aGlzLl9wYXRoUmVjb2duaXplci5zcGVjaWZpY2l0eSk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlV3JhcHBlci5yZXNvbHZlKG1hdGNoKTtcbiAgfVxuXG4gIGdlbmVyYXRlKHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0pOiBDb21wb25lbnRJbnN0cnVjdGlvbiB7XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYFRyaWVkIHRvIGdlbmVyYXRlIGEgcmVkaXJlY3QuYCk7XG4gIH1cbn1cblxuXG4vLyByZXByZXNlbnRzIHNvbWV0aGluZyBsaWtlICcvZm9vLzpiYXInXG5leHBvcnQgY2xhc3MgUm91dGVSdWxlIGltcGxlbWVudHMgQWJzdHJhY3RSdWxlIHtcbiAgc3BlY2lmaWNpdHk6IHN0cmluZztcbiAgdGVybWluYWw6IGJvb2xlYW47XG4gIGhhc2g6IHN0cmluZztcblxuICBwcml2YXRlIF9jYWNoZTogTWFwPHN0cmluZywgQ29tcG9uZW50SW5zdHJ1Y3Rpb24+ID0gbmV3IE1hcDxzdHJpbmcsIENvbXBvbmVudEluc3RydWN0aW9uPigpO1xuXG4gIC8vIFRPRE86IGNhY2hlIGNvbXBvbmVudCBpbnN0cnVjdGlvbiBpbnN0YW5jZXMgYnkgcGFyYW1zIGFuZCBieSBQYXJzZWRVcmwgaW5zdGFuY2VcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yb3V0ZVBhdGg6IFJvdXRlUGF0aCwgcHVibGljIGhhbmRsZXI6IFJvdXRlSGFuZGxlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfcm91dGVOYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNwZWNpZmljaXR5ID0gdGhpcy5fcm91dGVQYXRoLnNwZWNpZmljaXR5O1xuICAgIHRoaXMuaGFzaCA9IHRoaXMuX3JvdXRlUGF0aC5oYXNoO1xuICAgIHRoaXMudGVybWluYWwgPSB0aGlzLl9yb3V0ZVBhdGgudGVybWluYWw7XG4gIH1cblxuICBnZXQgcGF0aCgpIHsgcmV0dXJuIHRoaXMuX3JvdXRlUGF0aC50b1N0cmluZygpOyB9XG4gIHNldCBwYXRoKHZhbCkgeyB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbigneW91IGNhbm5vdCBzZXQgdGhlIHBhdGggb2YgYSBSb3V0ZVJ1bGUgZGlyZWN0bHknKTsgfVxuXG4gIHJlY29nbml6ZShiZWdpbm5pbmdTZWdtZW50OiBVcmwpOiBQcm9taXNlPFJvdXRlTWF0Y2g+IHtcbiAgICB2YXIgcmVzID0gdGhpcy5fcm91dGVQYXRoLm1hdGNoVXJsKGJlZ2lubmluZ1NlZ21lbnQpO1xuICAgIGlmIChpc0JsYW5rKHJlcykpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZXIucmVzb2x2ZUNvbXBvbmVudFR5cGUoKS50aGVuKChfKSA9PiB7XG4gICAgICB2YXIgY29tcG9uZW50SW5zdHJ1Y3Rpb24gPSB0aGlzLl9nZXRJbnN0cnVjdGlvbihyZXMudXJsUGF0aCwgcmVzLnVybFBhcmFtcywgcmVzLmFsbFBhcmFtcyk7XG4gICAgICByZXR1cm4gbmV3IFBhdGhNYXRjaChjb21wb25lbnRJbnN0cnVjdGlvbiwgcmVzLnJlc3QsIHJlcy5hdXhpbGlhcnkpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2VuZXJhdGUocGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSk6IENvbXBvbmVudEluc3RydWN0aW9uIHtcbiAgICB2YXIgZ2VuZXJhdGVkID0gdGhpcy5fcm91dGVQYXRoLmdlbmVyYXRlVXJsKHBhcmFtcyk7XG4gICAgdmFyIHVybFBhdGggPSBnZW5lcmF0ZWQudXJsUGF0aDtcbiAgICB2YXIgdXJsUGFyYW1zID0gZ2VuZXJhdGVkLnVybFBhcmFtcztcbiAgICByZXR1cm4gdGhpcy5fZ2V0SW5zdHJ1Y3Rpb24odXJsUGF0aCwgY29udmVydFVybFBhcmFtc1RvQXJyYXkodXJsUGFyYW1zKSwgcGFyYW1zKTtcbiAgfVxuXG4gIGdlbmVyYXRlQ29tcG9uZW50UGF0aFZhbHVlcyhwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogR2VuZXJhdGVkVXJsIHtcbiAgICByZXR1cm4gdGhpcy5fcm91dGVQYXRoLmdlbmVyYXRlVXJsKHBhcmFtcyk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRJbnN0cnVjdGlvbih1cmxQYXRoOiBzdHJpbmcsIHVybFBhcmFtczogc3RyaW5nW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0pOiBDb21wb25lbnRJbnN0cnVjdGlvbiB7XG4gICAgaWYgKGlzQmxhbmsodGhpcy5oYW5kbGVyLmNvbXBvbmVudFR5cGUpKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgVHJpZWQgdG8gZ2V0IGluc3RydWN0aW9uIGJlZm9yZSB0aGUgdHlwZSB3YXMgbG9hZGVkLmApO1xuICAgIH1cbiAgICB2YXIgaGFzaEtleSA9IHVybFBhdGggKyAnPycgKyB1cmxQYXJhbXMuam9pbignJicpO1xuICAgIGlmICh0aGlzLl9jYWNoZS5oYXMoaGFzaEtleSkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jYWNoZS5nZXQoaGFzaEtleSk7XG4gICAgfVxuICAgIHZhciBpbnN0cnVjdGlvbiA9XG4gICAgICAgIG5ldyBDb21wb25lbnRJbnN0cnVjdGlvbih1cmxQYXRoLCB1cmxQYXJhbXMsIHRoaXMuaGFuZGxlci5kYXRhLCB0aGlzLmhhbmRsZXIuY29tcG9uZW50VHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGVybWluYWwsIHRoaXMuc3BlY2lmaWNpdHksIHBhcmFtcywgdGhpcy5fcm91dGVOYW1lKTtcbiAgICB0aGlzLl9jYWNoZS5zZXQoaGFzaEtleSwgaW5zdHJ1Y3Rpb24pO1xuXG4gICAgcmV0dXJuIGluc3RydWN0aW9uO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
