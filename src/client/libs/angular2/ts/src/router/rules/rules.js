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
                function RouteRule(_routePath, handler) {
                    this._routePath = _routePath;
                    this.handler = handler;
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
                    var instruction = new instruction_1.ComponentInstruction(urlPath, urlParams, this.handler.data, this.handler.componentType, this.terminal, this.specificity, params);
                    this._cache.set(hashKey, instruction);
                    return instruction;
                };
                return RouteRule;
            }());
            exports_1("RouteRule", RouteRule);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9ydWxlcy9ydWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBWUEsNkVBQTZFO1lBQzdFO2dCQUFBO2dCQUFrQyxDQUFDO2dCQUFELGlCQUFDO1lBQUQsQ0FBbEMsQUFBbUMsSUFBQTtZQUFuQyxtQ0FBbUMsQ0FBQTtZQUVuQztnQkFBK0IsNkJBQVU7Z0JBQ3ZDLG1CQUFtQixXQUFpQyxFQUFTLFNBQWMsRUFDeEQsWUFBbUI7b0JBQ3BDLGlCQUFPLENBQUM7b0JBRlMsZ0JBQVcsR0FBWCxXQUFXLENBQXNCO29CQUFTLGNBQVMsR0FBVCxTQUFTLENBQUs7b0JBQ3hELGlCQUFZLEdBQVosWUFBWSxDQUFPO2dCQUV0QyxDQUFDO2dCQUNILGdCQUFDO1lBQUQsQ0FMQSxBQUtDLENBTDhCLFVBQVUsR0FLeEM7WUFMRCxpQ0FLQyxDQUFBO1lBRUQ7Z0JBQW1DLGlDQUFVO2dCQUMzQyx1QkFBbUIsVUFBaUIsRUFBUyxXQUFXO29CQUFJLGlCQUFPLENBQUM7b0JBQWpELGVBQVUsR0FBVixVQUFVLENBQU87b0JBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQUE7Z0JBQWEsQ0FBQztnQkFDeEUsb0JBQUM7WUFBRCxDQUZBLEFBRUMsQ0FGa0MsVUFBVSxHQUU1QztZQUZELHlDQUVDLENBQUE7WUFVRDtnQkFHRSxzQkFBb0IsZUFBMEIsRUFBUyxVQUFpQjtvQkFBcEQsb0JBQWUsR0FBZixlQUFlLENBQVc7b0JBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBTztvQkFDdEUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztnQkFDeEMsQ0FBQztnQkFFRCxzQkFBSSw4QkFBSTt5QkFBUixjQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQzt5QkFDdEQs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b2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvcnVsZXMvcnVsZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzUHJlc2VudCwgaXNCbGFua30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7UHJvbWlzZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvcHJvbWlzZSc7XG5pbXBvcnQge01hcH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcblxuaW1wb3J0IHtSb3V0ZUhhbmRsZXJ9IGZyb20gJy4vcm91dGVfaGFuZGxlcnMvcm91dGVfaGFuZGxlcic7XG5pbXBvcnQge1VybCwgY29udmVydFVybFBhcmFtc1RvQXJyYXl9IGZyb20gJy4uL3VybF9wYXJzZXInO1xuaW1wb3J0IHtDb21wb25lbnRJbnN0cnVjdGlvbn0gZnJvbSAnLi4vaW5zdHJ1Y3Rpb24nO1xuaW1wb3J0IHtSb3V0ZVBhdGh9IGZyb20gJy4vcm91dGVfcGF0aHMvcm91dGVfcGF0aCc7XG5pbXBvcnQge0dlbmVyYXRlZFVybH0gZnJvbSAnLi9yb3V0ZV9wYXRocy9yb3V0ZV9wYXRoJztcblxuXG4vLyBSb3V0ZU1hdGNoIG9iamVjdHMgaG9sZCBpbmZvcm1hdGlvbiBhYm91dCBhIG1hdGNoIGJldHdlZW4gYSBydWxlIGFuZCBhIFVSTFxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJvdXRlTWF0Y2gge31cblxuZXhwb3J0IGNsYXNzIFBhdGhNYXRjaCBleHRlbmRzIFJvdXRlTWF0Y2gge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgaW5zdHJ1Y3Rpb246IENvbXBvbmVudEluc3RydWN0aW9uLCBwdWJsaWMgcmVtYWluaW5nOiBVcmwsXG4gICAgICAgICAgICAgIHB1YmxpYyByZW1haW5pbmdBdXg6IFVybFtdKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVkaXJlY3RNYXRjaCBleHRlbmRzIFJvdXRlTWF0Y2gge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVkaXJlY3RUbzogYW55W10sIHB1YmxpYyBzcGVjaWZpY2l0eSkgeyBzdXBlcigpOyB9XG59XG5cbi8vIFJ1bGVzIGFyZSByZXNwb25zaWJsZSBmb3IgcmVjb2duaXppbmcgVVJMIHNlZ21lbnRzIGFuZCBnZW5lcmF0aW5nIGluc3RydWN0aW9uc1xuZXhwb3J0IGludGVyZmFjZSBBYnN0cmFjdFJ1bGUge1xuICBoYXNoOiBzdHJpbmc7XG4gIHBhdGg6IHN0cmluZztcbiAgcmVjb2duaXplKGJlZ2lubmluZ1NlZ21lbnQ6IFVybCk6IFByb21pc2U8Um91dGVNYXRjaD47XG4gIGdlbmVyYXRlKHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0pOiBDb21wb25lbnRJbnN0cnVjdGlvbjtcbn1cblxuZXhwb3J0IGNsYXNzIFJlZGlyZWN0UnVsZSBpbXBsZW1lbnRzIEFic3RyYWN0UnVsZSB7XG4gIHB1YmxpYyBoYXNoOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGF0aFJlY29nbml6ZXI6IFJvdXRlUGF0aCwgcHVibGljIHJlZGlyZWN0VG86IGFueVtdKSB7XG4gICAgdGhpcy5oYXNoID0gdGhpcy5fcGF0aFJlY29nbml6ZXIuaGFzaDtcbiAgfVxuXG4gIGdldCBwYXRoKCkgeyByZXR1cm4gdGhpcy5fcGF0aFJlY29nbml6ZXIudG9TdHJpbmcoKTsgfVxuICBzZXQgcGF0aCh2YWwpIHsgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oJ3lvdSBjYW5ub3Qgc2V0IHRoZSBwYXRoIG9mIGEgUmVkaXJlY3RSdWxlIGRpcmVjdGx5Jyk7IH1cblxuICAvKipcbiAgICogUmV0dXJucyBgbnVsbGAgb3IgYSBgUGFyc2VkVXJsYCByZXByZXNlbnRpbmcgdGhlIG5ldyBwYXRoIHRvIG1hdGNoXG4gICAqL1xuICByZWNvZ25pemUoYmVnaW5uaW5nU2VnbWVudDogVXJsKTogUHJvbWlzZTxSb3V0ZU1hdGNoPiB7XG4gICAgdmFyIG1hdGNoID0gbnVsbDtcbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuX3BhdGhSZWNvZ25pemVyLm1hdGNoVXJsKGJlZ2lubmluZ1NlZ21lbnQpKSkge1xuICAgICAgbWF0Y2ggPSBuZXcgUmVkaXJlY3RNYXRjaCh0aGlzLnJlZGlyZWN0VG8sIHRoaXMuX3BhdGhSZWNvZ25pemVyLnNwZWNpZmljaXR5KTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2VXcmFwcGVyLnJlc29sdmUobWF0Y2gpO1xuICB9XG5cbiAgZ2VuZXJhdGUocGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSk6IENvbXBvbmVudEluc3RydWN0aW9uIHtcbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgVHJpZWQgdG8gZ2VuZXJhdGUgYSByZWRpcmVjdC5gKTtcbiAgfVxufVxuXG5cbi8vIHJlcHJlc2VudHMgc29tZXRoaW5nIGxpa2UgJy9mb28vOmJhcidcbmV4cG9ydCBjbGFzcyBSb3V0ZVJ1bGUgaW1wbGVtZW50cyBBYnN0cmFjdFJ1bGUge1xuICBzcGVjaWZpY2l0eTogc3RyaW5nO1xuICB0ZXJtaW5hbDogYm9vbGVhbjtcbiAgaGFzaDogc3RyaW5nO1xuXG4gIHByaXZhdGUgX2NhY2hlOiBNYXA8c3RyaW5nLCBDb21wb25lbnRJbnN0cnVjdGlvbj4gPSBuZXcgTWFwPHN0cmluZywgQ29tcG9uZW50SW5zdHJ1Y3Rpb24+KCk7XG5cbiAgLy8gVE9ETzogY2FjaGUgY29tcG9uZW50IGluc3RydWN0aW9uIGluc3RhbmNlcyBieSBwYXJhbXMgYW5kIGJ5IFBhcnNlZFVybCBpbnN0YW5jZVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlUGF0aDogUm91dGVQYXRoLCBwdWJsaWMgaGFuZGxlcjogUm91dGVIYW5kbGVyKSB7XG4gICAgdGhpcy5zcGVjaWZpY2l0eSA9IHRoaXMuX3JvdXRlUGF0aC5zcGVjaWZpY2l0eTtcbiAgICB0aGlzLmhhc2ggPSB0aGlzLl9yb3V0ZVBhdGguaGFzaDtcbiAgICB0aGlzLnRlcm1pbmFsID0gdGhpcy5fcm91dGVQYXRoLnRlcm1pbmFsO1xuICB9XG5cbiAgZ2V0IHBhdGgoKSB7IHJldHVybiB0aGlzLl9yb3V0ZVBhdGgudG9TdHJpbmcoKTsgfVxuICBzZXQgcGF0aCh2YWwpIHsgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oJ3lvdSBjYW5ub3Qgc2V0IHRoZSBwYXRoIG9mIGEgUm91dGVSdWxlIGRpcmVjdGx5Jyk7IH1cblxuICByZWNvZ25pemUoYmVnaW5uaW5nU2VnbWVudDogVXJsKTogUHJvbWlzZTxSb3V0ZU1hdGNoPiB7XG4gICAgdmFyIHJlcyA9IHRoaXMuX3JvdXRlUGF0aC5tYXRjaFVybChiZWdpbm5pbmdTZWdtZW50KTtcbiAgICBpZiAoaXNCbGFuayhyZXMpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLnJlc29sdmVDb21wb25lbnRUeXBlKCkudGhlbigoXykgPT4ge1xuICAgICAgdmFyIGNvbXBvbmVudEluc3RydWN0aW9uID0gdGhpcy5fZ2V0SW5zdHJ1Y3Rpb24ocmVzLnVybFBhdGgsIHJlcy51cmxQYXJhbXMsIHJlcy5hbGxQYXJhbXMpO1xuICAgICAgcmV0dXJuIG5ldyBQYXRoTWF0Y2goY29tcG9uZW50SW5zdHJ1Y3Rpb24sIHJlcy5yZXN0LCByZXMuYXV4aWxpYXJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGdlbmVyYXRlKHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0pOiBDb21wb25lbnRJbnN0cnVjdGlvbiB7XG4gICAgdmFyIGdlbmVyYXRlZCA9IHRoaXMuX3JvdXRlUGF0aC5nZW5lcmF0ZVVybChwYXJhbXMpO1xuICAgIHZhciB1cmxQYXRoID0gZ2VuZXJhdGVkLnVybFBhdGg7XG4gICAgdmFyIHVybFBhcmFtcyA9IGdlbmVyYXRlZC51cmxQYXJhbXM7XG4gICAgcmV0dXJuIHRoaXMuX2dldEluc3RydWN0aW9uKHVybFBhdGgsIGNvbnZlcnRVcmxQYXJhbXNUb0FycmF5KHVybFBhcmFtcyksIHBhcmFtcyk7XG4gIH1cblxuICBnZW5lcmF0ZUNvbXBvbmVudFBhdGhWYWx1ZXMocGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSk6IEdlbmVyYXRlZFVybCB7XG4gICAgcmV0dXJuIHRoaXMuX3JvdXRlUGF0aC5nZW5lcmF0ZVVybChwYXJhbXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0SW5zdHJ1Y3Rpb24odXJsUGF0aDogc3RyaW5nLCB1cmxQYXJhbXM6IHN0cmluZ1tdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogQ29tcG9uZW50SW5zdHJ1Y3Rpb24ge1xuICAgIGlmIChpc0JsYW5rKHRoaXMuaGFuZGxlci5jb21wb25lbnRUeXBlKSkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYFRyaWVkIHRvIGdldCBpbnN0cnVjdGlvbiBiZWZvcmUgdGhlIHR5cGUgd2FzIGxvYWRlZC5gKTtcbiAgICB9XG4gICAgdmFyIGhhc2hLZXkgPSB1cmxQYXRoICsgJz8nICsgdXJsUGFyYW1zLmpvaW4oJyYnKTtcbiAgICBpZiAodGhpcy5fY2FjaGUuaGFzKGhhc2hLZXkpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY2FjaGUuZ2V0KGhhc2hLZXkpO1xuICAgIH1cbiAgICB2YXIgaW5zdHJ1Y3Rpb24gPVxuICAgICAgICBuZXcgQ29tcG9uZW50SW5zdHJ1Y3Rpb24odXJsUGF0aCwgdXJsUGFyYW1zLCB0aGlzLmhhbmRsZXIuZGF0YSwgdGhpcy5oYW5kbGVyLmNvbXBvbmVudFR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRlcm1pbmFsLCB0aGlzLnNwZWNpZmljaXR5LCBwYXJhbXMpO1xuICAgIHRoaXMuX2NhY2hlLnNldChoYXNoS2V5LCBpbnN0cnVjdGlvbik7XG5cbiAgICByZXR1cm4gaW5zdHJ1Y3Rpb247XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
