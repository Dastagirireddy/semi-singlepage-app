System.register(['angular2/src/facade/lang', 'angular2/src/facade/collection'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lang_1, collection_1;
    var EventListener, DebugNode, DebugElement, _nativeNodeToDebugNode;
    function asNativeElements(debugEls) {
        return debugEls.map(function (el) { return el.nativeElement; });
    }
    exports_1("asNativeElements", asNativeElements);
    function _queryElementChildren(element, predicate, matches) {
        element.childNodes.forEach(function (node) {
            if (node instanceof DebugElement) {
                if (predicate(node)) {
                    matches.push(node);
                }
                _queryElementChildren(node, predicate, matches);
            }
        });
    }
    function _queryNodeChildren(parentNode, predicate, matches) {
        if (parentNode instanceof DebugElement) {
            parentNode.childNodes.forEach(function (node) {
                if (predicate(node)) {
                    matches.push(node);
                }
                if (node instanceof DebugElement) {
                    _queryNodeChildren(node, predicate, matches);
                }
            });
        }
    }
    function getDebugNode(nativeNode) {
        return _nativeNodeToDebugNode.get(nativeNode);
    }
    exports_1("getDebugNode", getDebugNode);
    function getAllDebugNodes() {
        return collection_1.MapWrapper.values(_nativeNodeToDebugNode);
    }
    exports_1("getAllDebugNodes", getAllDebugNodes);
    function indexDebugNode(node) {
        _nativeNodeToDebugNode.set(node.nativeNode, node);
    }
    exports_1("indexDebugNode", indexDebugNode);
    function removeDebugNodeFromIndex(node) {
        _nativeNodeToDebugNode.delete(node.nativeNode);
    }
    exports_1("removeDebugNodeFromIndex", removeDebugNodeFromIndex);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            }],
        execute: function() {
            EventListener = (function () {
                function EventListener(name, callback) {
                    this.name = name;
                    this.callback = callback;
                }
                ;
                return EventListener;
            }());
            exports_1("EventListener", EventListener);
            DebugNode = (function () {
                function DebugNode(nativeNode, parent, _debugInfo) {
                    this._debugInfo = _debugInfo;
                    this.nativeNode = nativeNode;
                    if (lang_1.isPresent(parent) && parent instanceof DebugElement) {
                        parent.addChild(this);
                    }
                    else {
                        this.parent = null;
                    }
                    this.listeners = [];
                }
                Object.defineProperty(DebugNode.prototype, "injector", {
                    get: function () { return lang_1.isPresent(this._debugInfo) ? this._debugInfo.injector : null; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DebugNode.prototype, "componentInstance", {
                    get: function () {
                        return lang_1.isPresent(this._debugInfo) ? this._debugInfo.component : null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DebugNode.prototype, "locals", {
                    get: function () {
                        return lang_1.isPresent(this._debugInfo) ? this._debugInfo.locals : null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DebugNode.prototype, "providerTokens", {
                    get: function () {
                        return lang_1.isPresent(this._debugInfo) ? this._debugInfo.providerTokens : null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DebugNode.prototype, "source", {
                    get: function () { return lang_1.isPresent(this._debugInfo) ? this._debugInfo.source : null; },
                    enumerable: true,
                    configurable: true
                });
                DebugNode.prototype.inject = function (token) { return this.injector.get(token); };
                DebugNode.prototype.getLocal = function (name) { return this.locals[name]; };
                return DebugNode;
            }());
            exports_1("DebugNode", DebugNode);
            DebugElement = (function (_super) {
                __extends(DebugElement, _super);
                function DebugElement(nativeNode, parent, _debugInfo) {
                    _super.call(this, nativeNode, parent, _debugInfo);
                    this.properties = {};
                    this.attributes = {};
                    this.childNodes = [];
                    this.nativeElement = nativeNode;
                }
                DebugElement.prototype.addChild = function (child) {
                    if (lang_1.isPresent(child)) {
                        this.childNodes.push(child);
                        child.parent = this;
                    }
                };
                DebugElement.prototype.removeChild = function (child) {
                    var childIndex = this.childNodes.indexOf(child);
                    if (childIndex !== -1) {
                        child.parent = null;
                        this.childNodes.splice(childIndex, 1);
                    }
                };
                DebugElement.prototype.insertChildrenAfter = function (child, newChildren) {
                    var siblingIndex = this.childNodes.indexOf(child);
                    if (siblingIndex !== -1) {
                        var previousChildren = this.childNodes.slice(0, siblingIndex + 1);
                        var nextChildren = this.childNodes.slice(siblingIndex + 1);
                        this.childNodes =
                            collection_1.ListWrapper.concat(collection_1.ListWrapper.concat(previousChildren, newChildren), nextChildren);
                        for (var i = 0; i < newChildren.length; ++i) {
                            var newChild = newChildren[i];
                            if (lang_1.isPresent(newChild.parent)) {
                                newChild.parent.removeChild(newChild);
                            }
                            newChild.parent = this;
                        }
                    }
                };
                DebugElement.prototype.query = function (predicate) {
                    var results = this.queryAll(predicate);
                    return results.length > 0 ? results[0] : null;
                };
                DebugElement.prototype.queryAll = function (predicate) {
                    var matches = [];
                    _queryElementChildren(this, predicate, matches);
                    return matches;
                };
                DebugElement.prototype.queryAllNodes = function (predicate) {
                    var matches = [];
                    _queryNodeChildren(this, predicate, matches);
                    return matches;
                };
                Object.defineProperty(DebugElement.prototype, "children", {
                    get: function () {
                        var children = [];
                        this.childNodes.forEach(function (node) {
                            if (node instanceof DebugElement) {
                                children.push(node);
                            }
                        });
                        return children;
                    },
                    enumerable: true,
                    configurable: true
                });
                DebugElement.prototype.triggerEventHandler = function (eventName, eventObj) {
                    this.listeners.forEach(function (listener) {
                        if (listener.name == eventName) {
                            listener.callback(eventObj);
                        }
                    });
                };
                return DebugElement;
            }(DebugNode));
            exports_1("DebugElement", DebugElement);
            // Need to keep the nodes in a global Map so that multiple angular apps are supported.
            _nativeNodeToDebugNode = new Map();
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2RlYnVnL2RlYnVnX25vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O2dEQTZKSSxzQkFBc0I7SUEvQjFCLDBCQUFpQyxRQUF3QjtRQUN2RCxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEVBQUUsSUFBSyxPQUFBLEVBQUUsQ0FBQyxhQUFhLEVBQWhCLENBQWdCLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRkQsK0NBRUMsQ0FBQTtJQUVELCtCQUErQixPQUFxQixFQUFFLFNBQWtDLEVBQ3pELE9BQXVCO1FBQ3BELE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtZQUM3QixFQUFFLENBQUMsQ0FBQyxJQUFJLFlBQVksWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDakMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDckIsQ0FBQztnQkFDRCxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ2xELENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw0QkFBNEIsVUFBcUIsRUFBRSxTQUErQixFQUN0RCxPQUFvQjtRQUM5QyxFQUFFLENBQUMsQ0FBQyxVQUFVLFlBQVksWUFBWSxDQUFDLENBQUMsQ0FBQztZQUN2QyxVQUFVLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7Z0JBQ2hDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3JCLENBQUM7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxZQUFZLFlBQVksQ0FB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QWpGaUMsU0FBUyxHQWlGMUM7WUFqRkQsdUNBaUZDLENBQUE7WUFnQ0Qsc0ZBQXNGO1lBQ2xGLHNCQUFzQixHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2RlYnVnL2RlYnVnX25vZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzUHJlc2VudCwgVHlwZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7UHJlZGljYXRlLCBMaXN0V3JhcHBlciwgTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7SW5qZWN0b3J9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7UmVuZGVyRGVidWdJbmZvfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9yZW5kZXIvYXBpJztcblxuZXhwb3J0IGNsYXNzIEV2ZW50TGlzdGVuZXIgeyBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgY2FsbGJhY2s6IEZ1bmN0aW9uKXt9OyB9XG5cbmV4cG9ydCBjbGFzcyBEZWJ1Z05vZGUge1xuICBuYXRpdmVOb2RlOiBhbnk7XG4gIGxpc3RlbmVyczogRXZlbnRMaXN0ZW5lcltdO1xuICBwYXJlbnQ6IERlYnVnRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihuYXRpdmVOb2RlOiBhbnksIHBhcmVudDogRGVidWdOb2RlLCBwcml2YXRlIF9kZWJ1Z0luZm86IFJlbmRlckRlYnVnSW5mbykge1xuICAgIHRoaXMubmF0aXZlTm9kZSA9IG5hdGl2ZU5vZGU7XG4gICAgaWYgKGlzUHJlc2VudChwYXJlbnQpICYmIHBhcmVudCBpbnN0YW5jZW9mIERlYnVnRWxlbWVudCkge1xuICAgICAgcGFyZW50LmFkZENoaWxkKHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMubGlzdGVuZXJzID0gW107XG4gIH1cblxuICBnZXQgaW5qZWN0b3IoKTogSW5qZWN0b3IgeyByZXR1cm4gaXNQcmVzZW50KHRoaXMuX2RlYnVnSW5mbykgPyB0aGlzLl9kZWJ1Z0luZm8uaW5qZWN0b3IgOiBudWxsOyB9XG5cbiAgZ2V0IGNvbXBvbmVudEluc3RhbmNlKCk6IGFueSB7XG4gICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLl9kZWJ1Z0luZm8pID8gdGhpcy5fZGVidWdJbmZvLmNvbXBvbmVudCA6IG51bGw7XG4gIH1cblxuICBnZXQgbG9jYWxzKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuX2RlYnVnSW5mbykgPyB0aGlzLl9kZWJ1Z0luZm8ubG9jYWxzIDogbnVsbDtcbiAgfVxuXG4gIGdldCBwcm92aWRlclRva2VucygpOiBhbnlbXSB7XG4gICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLl9kZWJ1Z0luZm8pID8gdGhpcy5fZGVidWdJbmZvLnByb3ZpZGVyVG9rZW5zIDogbnVsbDtcbiAgfVxuXG4gIGdldCBzb3VyY2UoKTogc3RyaW5nIHsgcmV0dXJuIGlzUHJlc2VudCh0aGlzLl9kZWJ1Z0luZm8pID8gdGhpcy5fZGVidWdJbmZvLnNvdXJjZSA6IG51bGw7IH1cblxuICBpbmplY3QodG9rZW46IGFueSk6IGFueSB7IHJldHVybiB0aGlzLmluamVjdG9yLmdldCh0b2tlbik7IH1cblxuICBnZXRMb2NhbChuYW1lOiBzdHJpbmcpOiBhbnkgeyByZXR1cm4gdGhpcy5sb2NhbHNbbmFtZV07IH1cbn1cblxuZXhwb3J0IGNsYXNzIERlYnVnRWxlbWVudCBleHRlbmRzIERlYnVnTm9kZSB7XG4gIG5hbWU6IHN0cmluZztcbiAgcHJvcGVydGllczoge1trZXk6IHN0cmluZ106IHN0cmluZ307XG4gIGF0dHJpYnV0ZXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuICBjaGlsZE5vZGVzOiBEZWJ1Z05vZGVbXTtcbiAgbmF0aXZlRWxlbWVudDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKG5hdGl2ZU5vZGU6IGFueSwgcGFyZW50OiBhbnksIF9kZWJ1Z0luZm86IFJlbmRlckRlYnVnSW5mbykge1xuICAgIHN1cGVyKG5hdGl2ZU5vZGUsIHBhcmVudCwgX2RlYnVnSW5mbyk7XG4gICAgdGhpcy5wcm9wZXJ0aWVzID0ge307XG4gICAgdGhpcy5hdHRyaWJ1dGVzID0ge307XG4gICAgdGhpcy5jaGlsZE5vZGVzID0gW107XG4gICAgdGhpcy5uYXRpdmVFbGVtZW50ID0gbmF0aXZlTm9kZTtcbiAgfVxuXG4gIGFkZENoaWxkKGNoaWxkOiBEZWJ1Z05vZGUpIHtcbiAgICBpZiAoaXNQcmVzZW50KGNoaWxkKSkge1xuICAgICAgdGhpcy5jaGlsZE5vZGVzLnB1c2goY2hpbGQpO1xuICAgICAgY2hpbGQucGFyZW50ID0gdGhpcztcbiAgICB9XG4gIH1cblxuICByZW1vdmVDaGlsZChjaGlsZDogRGVidWdOb2RlKSB7XG4gICAgdmFyIGNoaWxkSW5kZXggPSB0aGlzLmNoaWxkTm9kZXMuaW5kZXhPZihjaGlsZCk7XG4gICAgaWYgKGNoaWxkSW5kZXggIT09IC0xKSB7XG4gICAgICBjaGlsZC5wYXJlbnQgPSBudWxsO1xuICAgICAgdGhpcy5jaGlsZE5vZGVzLnNwbGljZShjaGlsZEluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBpbnNlcnRDaGlsZHJlbkFmdGVyKGNoaWxkOiBEZWJ1Z05vZGUsIG5ld0NoaWxkcmVuOiBEZWJ1Z05vZGVbXSkge1xuICAgIHZhciBzaWJsaW5nSW5kZXggPSB0aGlzLmNoaWxkTm9kZXMuaW5kZXhPZihjaGlsZCk7XG4gICAgaWYgKHNpYmxpbmdJbmRleCAhPT0gLTEpIHtcbiAgICAgIHZhciBwcmV2aW91c0NoaWxkcmVuID0gdGhpcy5jaGlsZE5vZGVzLnNsaWNlKDAsIHNpYmxpbmdJbmRleCArIDEpO1xuICAgICAgdmFyIG5leHRDaGlsZHJlbiA9IHRoaXMuY2hpbGROb2Rlcy5zbGljZShzaWJsaW5nSW5kZXggKyAxKTtcbiAgICAgIHRoaXMuY2hpbGROb2RlcyA9XG4gICAgICAgICAgTGlzdFdyYXBwZXIuY29uY2F0KExpc3RXcmFwcGVyLmNvbmNhdChwcmV2aW91c0NoaWxkcmVuLCBuZXdDaGlsZHJlbiksIG5leHRDaGlsZHJlbik7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5ld0NoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBuZXdDaGlsZCA9IG5ld0NoaWxkcmVuW2ldO1xuICAgICAgICBpZiAoaXNQcmVzZW50KG5ld0NoaWxkLnBhcmVudCkpIHtcbiAgICAgICAgICBuZXdDaGlsZC5wYXJlbnQucmVtb3ZlQ2hpbGQobmV3Q2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIG5ld0NoaWxkLnBhcmVudCA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcXVlcnkocHJlZGljYXRlOiBQcmVkaWNhdGU8RGVidWdFbGVtZW50Pik6IERlYnVnRWxlbWVudCB7XG4gICAgdmFyIHJlc3VsdHMgPSB0aGlzLnF1ZXJ5QWxsKHByZWRpY2F0ZSk7XG4gICAgcmV0dXJuIHJlc3VsdHMubGVuZ3RoID4gMCA/IHJlc3VsdHNbMF0gOiBudWxsO1xuICB9XG5cbiAgcXVlcnlBbGwocHJlZGljYXRlOiBQcmVkaWNhdGU8RGVidWdFbGVtZW50Pik6IERlYnVnRWxlbWVudFtdIHtcbiAgICB2YXIgbWF0Y2hlczogRGVidWdFbGVtZW50W10gPSBbXTtcbiAgICBfcXVlcnlFbGVtZW50Q2hpbGRyZW4odGhpcywgcHJlZGljYXRlLCBtYXRjaGVzKTtcbiAgICByZXR1cm4gbWF0Y2hlcztcbiAgfVxuXG4gIHF1ZXJ5QWxsTm9kZXMocHJlZGljYXRlOiBQcmVkaWNhdGU8RGVidWdOb2RlPik6IERlYnVnTm9kZVtdIHtcbiAgICB2YXIgbWF0Y2hlczogRGVidWdOb2RlW10gPSBbXTtcbiAgICBfcXVlcnlOb2RlQ2hpbGRyZW4odGhpcywgcHJlZGljYXRlLCBtYXRjaGVzKTtcbiAgICByZXR1cm4gbWF0Y2hlcztcbiAgfVxuXG4gIGdldCBjaGlsZHJlbigpOiBEZWJ1Z0VsZW1lbnRbXSB7XG4gICAgdmFyIGNoaWxkcmVuOiBEZWJ1Z0VsZW1lbnRbXSA9IFtdO1xuICAgIHRoaXMuY2hpbGROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIERlYnVnRWxlbWVudCkge1xuICAgICAgICBjaGlsZHJlbi5wdXNoKG5vZGUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuXG4gIHRyaWdnZXJFdmVudEhhbmRsZXIoZXZlbnROYW1lOiBzdHJpbmcsIGV2ZW50T2JqOiBhbnkpIHtcbiAgICB0aGlzLmxpc3RlbmVycy5mb3JFYWNoKChsaXN0ZW5lcikgPT4ge1xuICAgICAgaWYgKGxpc3RlbmVyLm5hbWUgPT0gZXZlbnROYW1lKSB7XG4gICAgICAgIGxpc3RlbmVyLmNhbGxiYWNrKGV2ZW50T2JqKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNOYXRpdmVFbGVtZW50cyhkZWJ1Z0VsczogRGVidWdFbGVtZW50W10pOiBhbnkge1xuICByZXR1cm4gZGVidWdFbHMubWFwKChlbCkgPT4gZWwubmF0aXZlRWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIF9xdWVyeUVsZW1lbnRDaGlsZHJlbihlbGVtZW50OiBEZWJ1Z0VsZW1lbnQsIHByZWRpY2F0ZTogUHJlZGljYXRlPERlYnVnRWxlbWVudD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlczogRGVidWdFbGVtZW50W10pIHtcbiAgZWxlbWVudC5jaGlsZE5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBEZWJ1Z0VsZW1lbnQpIHtcbiAgICAgIGlmIChwcmVkaWNhdGUobm9kZSkpIHtcbiAgICAgICAgbWF0Y2hlcy5wdXNoKG5vZGUpO1xuICAgICAgfVxuICAgICAgX3F1ZXJ5RWxlbWVudENoaWxkcmVuKG5vZGUsIHByZWRpY2F0ZSwgbWF0Y2hlcyk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gX3F1ZXJ5Tm9kZUNoaWxkcmVuKHBhcmVudE5vZGU6IERlYnVnTm9kZSwgcHJlZGljYXRlOiBQcmVkaWNhdGU8RGVidWdOb2RlPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVzOiBEZWJ1Z05vZGVbXSkge1xuICBpZiAocGFyZW50Tm9kZSBpbnN0YW5jZW9mIERlYnVnRWxlbWVudCkge1xuICAgIHBhcmVudE5vZGUuY2hpbGROb2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgaWYgKHByZWRpY2F0ZShub2RlKSkge1xuICAgICAgICBtYXRjaGVzLnB1c2gobm9kZSk7XG4gICAgICB9XG4gICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIERlYnVnRWxlbWVudCkge1xuICAgICAgICBfcXVlcnlOb2RlQ2hpbGRyZW4obm9kZSwgcHJlZGljYXRlLCBtYXRjaGVzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG4vLyBOZWVkIHRvIGtlZXAgdGhlIG5vZGVzIGluIGEgZ2xvYmFsIE1hcCBzbyB0aGF0IG11bHRpcGxlIGFuZ3VsYXIgYXBwcyBhcmUgc3VwcG9ydGVkLlxudmFyIF9uYXRpdmVOb2RlVG9EZWJ1Z05vZGUgPSBuZXcgTWFwPGFueSwgRGVidWdOb2RlPigpO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVidWdOb2RlKG5hdGl2ZU5vZGU6IGFueSk6IERlYnVnTm9kZSB7XG4gIHJldHVybiBfbmF0aXZlTm9kZVRvRGVidWdOb2RlLmdldChuYXRpdmVOb2RlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFsbERlYnVnTm9kZXMoKTogRGVidWdOb2RlW10ge1xuICByZXR1cm4gTWFwV3JhcHBlci52YWx1ZXMoX25hdGl2ZU5vZGVUb0RlYnVnTm9kZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbmRleERlYnVnTm9kZShub2RlOiBEZWJ1Z05vZGUpIHtcbiAgX25hdGl2ZU5vZGVUb0RlYnVnTm9kZS5zZXQobm9kZS5uYXRpdmVOb2RlLCBub2RlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZURlYnVnTm9kZUZyb21JbmRleChub2RlOiBEZWJ1Z05vZGUpIHtcbiAgX25hdGl2ZU5vZGVUb0RlYnVnTm9kZS5kZWxldGUobm9kZS5uYXRpdmVOb2RlKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
