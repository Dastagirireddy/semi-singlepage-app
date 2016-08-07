System.register(['angular2/src/facade/lang', 'angular2/src/facade/collection', './view_type'], function(exports_1, context_1) {
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
    var lang_1, collection_1, view_type_1;
    var StaticNodeDebugInfo, DebugContext;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (view_type_1_1) {
                view_type_1 = view_type_1_1;
            }],
        execute: function() {
            StaticNodeDebugInfo = (function () {
                function StaticNodeDebugInfo(providerTokens, componentToken, refTokens) {
                    this.providerTokens = providerTokens;
                    this.componentToken = componentToken;
                    this.refTokens = refTokens;
                }
                StaticNodeDebugInfo = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [Array, Object, Object])
                ], StaticNodeDebugInfo);
                return StaticNodeDebugInfo;
            }());
            exports_1("StaticNodeDebugInfo", StaticNodeDebugInfo);
            DebugContext = (function () {
                function DebugContext(_view, _nodeIndex, _tplRow, _tplCol) {
                    this._view = _view;
                    this._nodeIndex = _nodeIndex;
                    this._tplRow = _tplRow;
                    this._tplCol = _tplCol;
                }
                Object.defineProperty(DebugContext.prototype, "_staticNodeInfo", {
                    get: function () {
                        return lang_1.isPresent(this._nodeIndex) ? this._view.staticNodeDebugInfos[this._nodeIndex] : null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DebugContext.prototype, "context", {
                    get: function () { return this._view.context; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DebugContext.prototype, "component", {
                    get: function () {
                        var staticNodeInfo = this._staticNodeInfo;
                        if (lang_1.isPresent(staticNodeInfo) && lang_1.isPresent(staticNodeInfo.componentToken)) {
                            return this.injector.get(staticNodeInfo.componentToken);
                        }
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DebugContext.prototype, "componentRenderElement", {
                    get: function () {
                        var componentView = this._view;
                        while (lang_1.isPresent(componentView.declarationAppElement) &&
                            componentView.type !== view_type_1.ViewType.COMPONENT) {
                            componentView = componentView.declarationAppElement.parentView;
                        }
                        return lang_1.isPresent(componentView.declarationAppElement) ?
                            componentView.declarationAppElement.nativeElement :
                            null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DebugContext.prototype, "injector", {
                    get: function () { return this._view.injector(this._nodeIndex); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DebugContext.prototype, "renderNode", {
                    get: function () {
                        if (lang_1.isPresent(this._nodeIndex) && lang_1.isPresent(this._view.allNodes)) {
                            return this._view.allNodes[this._nodeIndex];
                        }
                        else {
                            return null;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DebugContext.prototype, "providerTokens", {
                    get: function () {
                        var staticNodeInfo = this._staticNodeInfo;
                        return lang_1.isPresent(staticNodeInfo) ? staticNodeInfo.providerTokens : null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DebugContext.prototype, "source", {
                    get: function () {
                        return this._view.componentType.templateUrl + ":" + this._tplRow + ":" + this._tplCol;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DebugContext.prototype, "locals", {
                    get: function () {
                        var _this = this;
                        var varValues = {};
                        // TODO(tbosch): right now, the semantics of debugNode.locals are
                        // that it contains the variables of all elements, not just
                        // the given one. We preserve this for now to not have a breaking
                        // change, but should change this later!
                        collection_1.ListWrapper.forEachWithIndex(this._view.staticNodeDebugInfos, function (staticNodeInfo, nodeIndex) {
                            var refs = staticNodeInfo.refTokens;
                            collection_1.StringMapWrapper.forEach(refs, function (refToken, refName) {
                                var varValue;
                                if (lang_1.isBlank(refToken)) {
                                    varValue = lang_1.isPresent(_this._view.allNodes) ? _this._view.allNodes[nodeIndex] : null;
                                }
                                else {
                                    varValue = _this._view.injectorGet(refToken, nodeIndex, null);
                                }
                                varValues[refName] = varValue;
                            });
                        });
                        collection_1.StringMapWrapper.forEach(this._view.locals, function (localValue, localName) { varValues[localName] = localValue; });
                        return varValues;
                    },
                    enumerable: true,
                    configurable: true
                });
                return DebugContext;
            }());
            exports_1("DebugContext", DebugContext);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2xpbmtlci9kZWJ1Z19jb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBUUE7Z0JBQ0UsNkJBQW1CLGNBQXFCLEVBQVMsY0FBbUIsRUFDakQsU0FBK0I7b0JBRC9CLG1CQUFjLEdBQWQsY0FBYyxDQUFPO29CQUFTLG1CQUFjLEdBQWQsY0FBYyxDQUFLO29CQUNqRCxjQUFTLEdBQVQsU0FBUyxDQUFzQjtnQkFBRyxDQUFDO2dCQUh4RDtvQkFBQyxZQUFLLEVBQUU7O3VDQUFBO2dCQUlSLDBCQUFDO1lBQUQsQ0FIQSxBQUdDLElBQUE7WUFIRCxxREFHQyxDQUFBO1lBRUQ7Z0JBQ0Usc0JBQW9CLEtBQW1CLEVBQVUsVUFBa0IsRUFBVSxPQUFlLEVBQ3hFLE9BQWU7b0JBRGYsVUFBSyxHQUFMLEtBQUssQ0FBYztvQkFBVSxlQUFVLEdBQVYsVUFBVSxDQUFRO29CQUFVLFlBQU8sR0FBUCxPQUFPLENBQVE7b0JBQ3hFLFlBQU8sR0FBUCxPQUFPLENBQVE7Z0JBQUcsQ0FBQztnQkFFdkMsc0JBQVkseUNBQWU7eUJBQTNCO3dCQUNFLE1BQU0sQ0FBQyxnQkFBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUM7b0JBQzlGLENBQUM7OzttQkFBQTtnQkFFRCxzQkFBSSxpQ0FBTzt5QkFBWCxjQUFnQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBQzVDLHNCQUFJLG1DQUFTO3lCQUFiO3dCQUNFLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7d0JBQzFDLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsY0FBYyxDQUFDLElBQUksZ0JBQVMsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUMxRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO3dCQUMxRCxDQUFDO3dCQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ2QsQ0FBQzs7O21CQUFBO2dCQUNELHNCQUFJLGdEQUFzQjt5QkFBMUI7d0JBQ0UsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQzt3QkFDL0IsT0FBTyxnQkFBUyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQzs0QkFDOUMsYUFBYSxDQUFDLElBQUksS0FBSyxvQkFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDOzRCQUNqRCxhQUFhLEdBQUcsYUFBYSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQzt3QkFDakUsQ0FBQzt3QkFDRCxNQUFNLENBQUMsZ0JBQVMsQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUM7NEJBQzFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhOzRCQUNqRCxJQUFJLENBQUM7b0JBQ2xCLENBQUM7OzttQkFBQTtnQkFDRCxzQkFBSSxrQ0FBUTt5QkFBWixjQUEyQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUN6RSxzQkFBSSxvQ0FBVTt5QkFBZDt3QkFDRSxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxnQkFBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNqRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUM5QyxDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUM7d0JBQ2QsQ0FBQztvQkFDSCxDQUFDOzs7bUJBQUE7Z0JBQ0Qsc0JBQUksd0NBQWM7eUJBQWxCO3dCQUNFLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7d0JBQzFDLE1BQU0sQ0FBQyxnQkFBUyxDQUFDLGNBQWMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO29CQUMxRSxDQUFDOzs7bUJBQUE7Z0JBQ0Qsc0JBQUksZ0NBQU07eUJBQVY7d0JBQ0UsTUFBTSxDQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFdBQVcsU0FBSSxJQUFJLENBQUMsT0FBTyxTQUFJLElBQUksQ0FBQyxPQUFTLENBQUM7b0JBQ25GLENBQUM7OzttQkFBQTtnQkFDRCxzQkFBSSxnQ0FBTTt5QkFBVjt3QkFBQSxpQkF1QkM7d0JBdEJDLElBQUksU0FBUyxHQUE0QixFQUFFLENBQUM7d0JBQzVDLGlFQUFpRTt3QkFDakUsMkRBQTJEO3dCQUMzRCxpRUFBaUU7d0JBQ2pFLHdDQUF3Qzt3QkFDeEMsd0JBQVcsQ0FBQyxnQkFBZ0IsQ0FDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFDL0IsVUFBQyxjQUFtQyxFQUFFLFNBQWlCOzRCQUNyRCxJQUFJLElBQUksR0FBRyxjQUFjLENBQUMsU0FBUyxDQUFDOzRCQUNwQyw2QkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFVBQUMsUUFBUSxFQUFFLE9BQU87Z0NBQy9DLElBQUksUUFBUSxDQUFDO2dDQUNiLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBQ3RCLFFBQVEsR0FBRyxnQkFBUyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dDQUNwRixDQUFDO2dDQUFDLElBQUksQ0FBQyxDQUFDO29DQUNOLFFBQVEsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO2dDQUMvRCxDQUFDO2dDQUNELFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxRQUFRLENBQUM7NEJBQ2hDLENBQUMsQ0FBQyxDQUFDO3dCQUNMLENBQUMsQ0FBQyxDQUFDO3dCQUNQLDZCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFDakIsVUFBQyxVQUFVLEVBQUUsU0FBUyxJQUFPLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDNUYsTUFBTSxDQUFDLFNBQVMsQ0FBQztvQkFDbkIsQ0FBQzs7O21CQUFBO2dCQUNILG1CQUFDO1lBQUQsQ0FqRUEsQUFpRUMsSUFBQTtZQWpFRCx1Q0FpRUMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29yZS9saW5rZXIvZGVidWdfY29udGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNQcmVzZW50LCBpc0JsYW5rLCBDT05TVH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7TGlzdFdyYXBwZXIsIFN0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge0luamVjdG9yfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge1JlbmRlckRlYnVnSW5mb30gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVuZGVyL2FwaSc7XG5pbXBvcnQge0FwcFZpZXd9IGZyb20gJy4vdmlldyc7XG5pbXBvcnQge1ZpZXdUeXBlfSBmcm9tICcuL3ZpZXdfdHlwZSc7XG5cbkBDT05TVCgpXG5leHBvcnQgY2xhc3MgU3RhdGljTm9kZURlYnVnSW5mbyB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwcm92aWRlclRva2VuczogYW55W10sIHB1YmxpYyBjb21wb25lbnRUb2tlbjogYW55LFxuICAgICAgICAgICAgICBwdWJsaWMgcmVmVG9rZW5zOiB7W2tleTogc3RyaW5nXTogYW55fSkge31cbn1cblxuZXhwb3J0IGNsYXNzIERlYnVnQ29udGV4dCBpbXBsZW1lbnRzIFJlbmRlckRlYnVnSW5mbyB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3ZpZXc6IEFwcFZpZXc8YW55PiwgcHJpdmF0ZSBfbm9kZUluZGV4OiBudW1iZXIsIHByaXZhdGUgX3RwbFJvdzogbnVtYmVyLFxuICAgICAgICAgICAgICBwcml2YXRlIF90cGxDb2w6IG51bWJlcikge31cblxuICBwcml2YXRlIGdldCBfc3RhdGljTm9kZUluZm8oKTogU3RhdGljTm9kZURlYnVnSW5mbyB7XG4gICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLl9ub2RlSW5kZXgpID8gdGhpcy5fdmlldy5zdGF0aWNOb2RlRGVidWdJbmZvc1t0aGlzLl9ub2RlSW5kZXhdIDogbnVsbDtcbiAgfVxuXG4gIGdldCBjb250ZXh0KCkgeyByZXR1cm4gdGhpcy5fdmlldy5jb250ZXh0OyB9XG4gIGdldCBjb21wb25lbnQoKSB7XG4gICAgdmFyIHN0YXRpY05vZGVJbmZvID0gdGhpcy5fc3RhdGljTm9kZUluZm87XG4gICAgaWYgKGlzUHJlc2VudChzdGF0aWNOb2RlSW5mbykgJiYgaXNQcmVzZW50KHN0YXRpY05vZGVJbmZvLmNvbXBvbmVudFRva2VuKSkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5qZWN0b3IuZ2V0KHN0YXRpY05vZGVJbmZvLmNvbXBvbmVudFRva2VuKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgZ2V0IGNvbXBvbmVudFJlbmRlckVsZW1lbnQoKSB7XG4gICAgdmFyIGNvbXBvbmVudFZpZXcgPSB0aGlzLl92aWV3O1xuICAgIHdoaWxlIChpc1ByZXNlbnQoY29tcG9uZW50Vmlldy5kZWNsYXJhdGlvbkFwcEVsZW1lbnQpICYmXG4gICAgICAgICAgIGNvbXBvbmVudFZpZXcudHlwZSAhPT0gVmlld1R5cGUuQ09NUE9ORU5UKSB7XG4gICAgICBjb21wb25lbnRWaWV3ID0gY29tcG9uZW50Vmlldy5kZWNsYXJhdGlvbkFwcEVsZW1lbnQucGFyZW50VmlldztcbiAgICB9XG4gICAgcmV0dXJuIGlzUHJlc2VudChjb21wb25lbnRWaWV3LmRlY2xhcmF0aW9uQXBwRWxlbWVudCkgP1xuICAgICAgICAgICAgICAgY29tcG9uZW50Vmlldy5kZWNsYXJhdGlvbkFwcEVsZW1lbnQubmF0aXZlRWxlbWVudCA6XG4gICAgICAgICAgICAgICBudWxsO1xuICB9XG4gIGdldCBpbmplY3RvcigpOiBJbmplY3RvciB7IHJldHVybiB0aGlzLl92aWV3LmluamVjdG9yKHRoaXMuX25vZGVJbmRleCk7IH1cbiAgZ2V0IHJlbmRlck5vZGUoKTogYW55IHtcbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuX25vZGVJbmRleCkgJiYgaXNQcmVzZW50KHRoaXMuX3ZpZXcuYWxsTm9kZXMpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fdmlldy5hbGxOb2Rlc1t0aGlzLl9ub2RlSW5kZXhdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbiAgZ2V0IHByb3ZpZGVyVG9rZW5zKCk6IGFueVtdIHtcbiAgICB2YXIgc3RhdGljTm9kZUluZm8gPSB0aGlzLl9zdGF0aWNOb2RlSW5mbztcbiAgICByZXR1cm4gaXNQcmVzZW50KHN0YXRpY05vZGVJbmZvKSA/IHN0YXRpY05vZGVJbmZvLnByb3ZpZGVyVG9rZW5zIDogbnVsbDtcbiAgfVxuICBnZXQgc291cmNlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke3RoaXMuX3ZpZXcuY29tcG9uZW50VHlwZS50ZW1wbGF0ZVVybH06JHt0aGlzLl90cGxSb3d9OiR7dGhpcy5fdHBsQ29sfWA7XG4gIH1cbiAgZ2V0IGxvY2FscygpOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSB7XG4gICAgdmFyIHZhclZhbHVlczoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgICAvLyBUT0RPKHRib3NjaCk6IHJpZ2h0IG5vdywgdGhlIHNlbWFudGljcyBvZiBkZWJ1Z05vZGUubG9jYWxzIGFyZVxuICAgIC8vIHRoYXQgaXQgY29udGFpbnMgdGhlIHZhcmlhYmxlcyBvZiBhbGwgZWxlbWVudHMsIG5vdCBqdXN0XG4gICAgLy8gdGhlIGdpdmVuIG9uZS4gV2UgcHJlc2VydmUgdGhpcyBmb3Igbm93IHRvIG5vdCBoYXZlIGEgYnJlYWtpbmdcbiAgICAvLyBjaGFuZ2UsIGJ1dCBzaG91bGQgY2hhbmdlIHRoaXMgbGF0ZXIhXG4gICAgTGlzdFdyYXBwZXIuZm9yRWFjaFdpdGhJbmRleChcbiAgICAgICAgdGhpcy5fdmlldy5zdGF0aWNOb2RlRGVidWdJbmZvcyxcbiAgICAgICAgKHN0YXRpY05vZGVJbmZvOiBTdGF0aWNOb2RlRGVidWdJbmZvLCBub2RlSW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIHZhciByZWZzID0gc3RhdGljTm9kZUluZm8ucmVmVG9rZW5zO1xuICAgICAgICAgIFN0cmluZ01hcFdyYXBwZXIuZm9yRWFjaChyZWZzLCAocmVmVG9rZW4sIHJlZk5hbWUpID0+IHtcbiAgICAgICAgICAgIHZhciB2YXJWYWx1ZTtcbiAgICAgICAgICAgIGlmIChpc0JsYW5rKHJlZlRva2VuKSkge1xuICAgICAgICAgICAgICB2YXJWYWx1ZSA9IGlzUHJlc2VudCh0aGlzLl92aWV3LmFsbE5vZGVzKSA/IHRoaXMuX3ZpZXcuYWxsTm9kZXNbbm9kZUluZGV4XSA6IG51bGw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB2YXJWYWx1ZSA9IHRoaXMuX3ZpZXcuaW5qZWN0b3JHZXQocmVmVG9rZW4sIG5vZGVJbmRleCwgbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXJWYWx1ZXNbcmVmTmFtZV0gPSB2YXJWYWx1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgU3RyaW5nTWFwV3JhcHBlci5mb3JFYWNoKHRoaXMuX3ZpZXcubG9jYWxzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobG9jYWxWYWx1ZSwgbG9jYWxOYW1lKSA9PiB7IHZhclZhbHVlc1tsb2NhbE5hbWVdID0gbG9jYWxWYWx1ZTsgfSk7XG4gICAgcmV0dXJuIHZhclZhbHVlcztcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
