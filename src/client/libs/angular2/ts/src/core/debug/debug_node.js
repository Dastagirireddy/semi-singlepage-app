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
                function DebugNode(nativeNode, parent) {
                    this.nativeNode = nativeNode;
                    if (lang_1.isPresent(parent) && parent instanceof DebugElement) {
                        parent.addChild(this);
                    }
                    else {
                        this.parent = null;
                    }
                    this.listeners = [];
                    this.providerTokens = [];
                }
                DebugNode.prototype.setDebugInfo = function (info) {
                    this.injector = info.injector;
                    this.providerTokens = info.providerTokens;
                    this.locals = info.locals;
                    this.componentInstance = info.component;
                };
                DebugNode.prototype.inject = function (token) { return this.injector.get(token); };
                DebugNode.prototype.getLocal = function (name) { return this.locals.get(name); };
                return DebugNode;
            }());
            exports_1("DebugNode", DebugNode);
            DebugElement = (function (_super) {
                __extends(DebugElement, _super);
                function DebugElement(nativeNode, parent) {
                    _super.call(this, nativeNode, parent);
                    this.properties = new Map();
                    this.attributes = new Map();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvZGVidWcvZGVidWdfbm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Z0RBMEpJLHNCQUFzQjtJQS9CMUIsMEJBQWlDLFFBQXdCO1FBQ3ZELE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUMsRUFBRSxJQUFLLE9BQUEsRUFBRSxDQUFDLGFBQWEsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFGRCwrQ0FFQyxDQUFBO0lBRUQsK0JBQStCLE9BQXFCLEVBQUUsU0FBa0MsRUFDekQsT0FBdUI7UUFDcEQsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO1lBQzdCLEVBQUUsQ0FBQyxDQUFDLElBQUksWUFBWSxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwQixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNyQixDQUFDO2dCQUNELHFCQUFxQixDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDbEQsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDRCQUE0QixVQUFxQixFQUFFLFNBQStCLEVBQ3RELE9BQW9CO1FBQzlDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsWUFBWSxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLFVBQVUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtnQkFDaEMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDckIsQ0FBQztnQkFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLFlBQVksWUFB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QyxPQUFPLENBQUMsVUFBQyxJQUFJOzRCQUMzQixFQUFFLENBQUMsQ0FBQyxJQUFJLFlBQVksWUFBWSxDQUFDLENBQUMsQ0FBQztnQ0FDakMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDdEIsQ0FBQzt3QkFDSCxDQUFDLENBQUMsQ0FBQzt3QkFDSCxNQUFNLENBQUMsUUFBUSxDQUFDO29CQUNsQixDQUFDOzs7bUJBQUE7Z0JBRUQsMENBQW1CLEdBQW5CLFVBQW9CLFNBQWlCLEVBQUUsUUFBZTtvQkFDcEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUFRO3dCQUM5QixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7NEJBQy9CLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQzlCLENBQUM7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQztnQkFDSCxtQkFBQztZQUFELENBakZBLEFBaUZDLENBakZpQyxTQUFTLEdBaUYxQztZQWpGRCx1Q0FpRkMsQ0FBQTtZQWdDRCxzRkFBc0Y7WUFDbEYsc0JBQXNCLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUMiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29yZS9kZWJ1Zy9kZWJ1Z19ub2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc1ByZXNlbnR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge1ByZWRpY2F0ZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7SW5qZWN0b3J9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7TGlzdFdyYXBwZXIsIE1hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge1JlbmRlckRlYnVnSW5mb30gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVuZGVyL2FwaSc7XG5cbmV4cG9ydCBjbGFzcyBFdmVudExpc3RlbmVyIHsgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZywgcHVibGljIGNhbGxiYWNrOiBGdW5jdGlvbil7fTsgfVxuXG5leHBvcnQgY2xhc3MgRGVidWdOb2RlIHtcbiAgbmF0aXZlTm9kZTogYW55O1xuICBsaXN0ZW5lcnM6IEV2ZW50TGlzdGVuZXJbXTtcbiAgcGFyZW50OiBEZWJ1Z0VsZW1lbnQ7XG4gIHByb3ZpZGVyVG9rZW5zOiBhbnlbXTtcbiAgbG9jYWxzOiBNYXA8c3RyaW5nLCBhbnk+O1xuICBpbmplY3RvcjogSW5qZWN0b3I7XG4gIGNvbXBvbmVudEluc3RhbmNlOiBhbnk7XG5cbiAgY29uc3RydWN0b3IobmF0aXZlTm9kZTogYW55LCBwYXJlbnQ6IERlYnVnTm9kZSkge1xuICAgIHRoaXMubmF0aXZlTm9kZSA9IG5hdGl2ZU5vZGU7XG4gICAgaWYgKGlzUHJlc2VudChwYXJlbnQpICYmIHBhcmVudCBpbnN0YW5jZW9mIERlYnVnRWxlbWVudCkge1xuICAgICAgcGFyZW50LmFkZENoaWxkKHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMubGlzdGVuZXJzID0gW107XG4gICAgdGhpcy5wcm92aWRlclRva2VucyA9IFtdO1xuICB9XG5cbiAgc2V0RGVidWdJbmZvKGluZm86IFJlbmRlckRlYnVnSW5mbykge1xuICAgIHRoaXMuaW5qZWN0b3IgPSBpbmZvLmluamVjdG9yO1xuICAgIHRoaXMucHJvdmlkZXJUb2tlbnMgPSBpbmZvLnByb3ZpZGVyVG9rZW5zO1xuICAgIHRoaXMubG9jYWxzID0gaW5mby5sb2NhbHM7XG4gICAgdGhpcy5jb21wb25lbnRJbnN0YW5jZSA9IGluZm8uY29tcG9uZW50O1xuICB9XG5cbiAgaW5qZWN0KHRva2VuOiBhbnkpOiBhbnkgeyByZXR1cm4gdGhpcy5pbmplY3Rvci5nZXQodG9rZW4pOyB9XG5cbiAgZ2V0TG9jYWwobmFtZTogc3RyaW5nKTogYW55IHsgcmV0dXJuIHRoaXMubG9jYWxzLmdldChuYW1lKTsgfVxufVxuXG5leHBvcnQgY2xhc3MgRGVidWdFbGVtZW50IGV4dGVuZHMgRGVidWdOb2RlIHtcbiAgbmFtZTogc3RyaW5nO1xuICBwcm9wZXJ0aWVzOiBNYXA8c3RyaW5nLCBhbnk+O1xuICBhdHRyaWJ1dGVzOiBNYXA8c3RyaW5nLCBhbnk+O1xuICBjaGlsZE5vZGVzOiBEZWJ1Z05vZGVbXTtcbiAgbmF0aXZlRWxlbWVudDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKG5hdGl2ZU5vZGU6IGFueSwgcGFyZW50OiBhbnkpIHtcbiAgICBzdXBlcihuYXRpdmVOb2RlLCBwYXJlbnQpO1xuICAgIHRoaXMucHJvcGVydGllcyA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gICAgdGhpcy5hdHRyaWJ1dGVzID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICB0aGlzLmNoaWxkTm9kZXMgPSBbXTtcbiAgICB0aGlzLm5hdGl2ZUVsZW1lbnQgPSBuYXRpdmVOb2RlO1xuICB9XG5cbiAgYWRkQ2hpbGQoY2hpbGQ6IERlYnVnTm9kZSkge1xuICAgIGlmIChpc1ByZXNlbnQoY2hpbGQpKSB7XG4gICAgICB0aGlzLmNoaWxkTm9kZXMucHVzaChjaGlsZCk7XG4gICAgICBjaGlsZC5wYXJlbnQgPSB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUNoaWxkKGNoaWxkOiBEZWJ1Z05vZGUpIHtcbiAgICB2YXIgY2hpbGRJbmRleCA9IHRoaXMuY2hpbGROb2Rlcy5pbmRleE9mKGNoaWxkKTtcbiAgICBpZiAoY2hpbGRJbmRleCAhPT0gLTEpIHtcbiAgICAgIGNoaWxkLnBhcmVudCA9IG51bGw7XG4gICAgICB0aGlzLmNoaWxkTm9kZXMuc3BsaWNlKGNoaWxkSW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIGluc2VydENoaWxkcmVuQWZ0ZXIoY2hpbGQ6IERlYnVnTm9kZSwgbmV3Q2hpbGRyZW46IERlYnVnTm9kZVtdKSB7XG4gICAgdmFyIHNpYmxpbmdJbmRleCA9IHRoaXMuY2hpbGROb2Rlcy5pbmRleE9mKGNoaWxkKTtcbiAgICBpZiAoc2libGluZ0luZGV4ICE9PSAtMSkge1xuICAgICAgdmFyIHByZXZpb3VzQ2hpbGRyZW4gPSB0aGlzLmNoaWxkTm9kZXMuc2xpY2UoMCwgc2libGluZ0luZGV4ICsgMSk7XG4gICAgICB2YXIgbmV4dENoaWxkcmVuID0gdGhpcy5jaGlsZE5vZGVzLnNsaWNlKHNpYmxpbmdJbmRleCArIDEpO1xuICAgICAgdGhpcy5jaGlsZE5vZGVzID1cbiAgICAgICAgICBMaXN0V3JhcHBlci5jb25jYXQoTGlzdFdyYXBwZXIuY29uY2F0KHByZXZpb3VzQ2hpbGRyZW4sIG5ld0NoaWxkcmVuKSwgbmV4dENoaWxkcmVuKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmV3Q2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIG5ld0NoaWxkID0gbmV3Q2hpbGRyZW5baV07XG4gICAgICAgIGlmIChpc1ByZXNlbnQobmV3Q2hpbGQucGFyZW50KSkge1xuICAgICAgICAgIG5ld0NoaWxkLnBhcmVudC5yZW1vdmVDaGlsZChuZXdDaGlsZCk7XG4gICAgICAgIH1cbiAgICAgICAgbmV3Q2hpbGQucGFyZW50ID0gdGhpcztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBxdWVyeShwcmVkaWNhdGU6IFByZWRpY2F0ZTxEZWJ1Z0VsZW1lbnQ+KTogRGVidWdFbGVtZW50IHtcbiAgICB2YXIgcmVzdWx0cyA9IHRoaXMucXVlcnlBbGwocHJlZGljYXRlKTtcbiAgICByZXR1cm4gcmVzdWx0cy5sZW5ndGggPiAwID8gcmVzdWx0c1swXSA6IG51bGw7XG4gIH1cblxuICBxdWVyeUFsbChwcmVkaWNhdGU6IFByZWRpY2F0ZTxEZWJ1Z0VsZW1lbnQ+KTogRGVidWdFbGVtZW50W10ge1xuICAgIHZhciBtYXRjaGVzOiBEZWJ1Z0VsZW1lbnRbXSA9IFtdO1xuICAgIF9xdWVyeUVsZW1lbnRDaGlsZHJlbih0aGlzLCBwcmVkaWNhdGUsIG1hdGNoZXMpO1xuICAgIHJldHVybiBtYXRjaGVzO1xuICB9XG5cbiAgcXVlcnlBbGxOb2RlcyhwcmVkaWNhdGU6IFByZWRpY2F0ZTxEZWJ1Z05vZGU+KTogRGVidWdOb2RlW10ge1xuICAgIHZhciBtYXRjaGVzOiBEZWJ1Z05vZGVbXSA9IFtdO1xuICAgIF9xdWVyeU5vZGVDaGlsZHJlbih0aGlzLCBwcmVkaWNhdGUsIG1hdGNoZXMpO1xuICAgIHJldHVybiBtYXRjaGVzO1xuICB9XG5cbiAgZ2V0IGNoaWxkcmVuKCk6IERlYnVnRWxlbWVudFtdIHtcbiAgICB2YXIgY2hpbGRyZW46IERlYnVnRWxlbWVudFtdID0gW107XG4gICAgdGhpcy5jaGlsZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgRGVidWdFbGVtZW50KSB7XG4gICAgICAgIGNoaWxkcmVuLnB1c2gobm9kZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG5cbiAgdHJpZ2dlckV2ZW50SGFuZGxlcihldmVudE5hbWU6IHN0cmluZywgZXZlbnRPYmo6IEV2ZW50KSB7XG4gICAgdGhpcy5saXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIpID0+IHtcbiAgICAgIGlmIChsaXN0ZW5lci5uYW1lID09IGV2ZW50TmFtZSkge1xuICAgICAgICBsaXN0ZW5lci5jYWxsYmFjayhldmVudE9iaik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzTmF0aXZlRWxlbWVudHMoZGVidWdFbHM6IERlYnVnRWxlbWVudFtdKTogYW55IHtcbiAgcmV0dXJuIGRlYnVnRWxzLm1hcCgoZWwpID0+IGVsLm5hdGl2ZUVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiBfcXVlcnlFbGVtZW50Q2hpbGRyZW4oZWxlbWVudDogRGVidWdFbGVtZW50LCBwcmVkaWNhdGU6IFByZWRpY2F0ZTxEZWJ1Z0VsZW1lbnQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXM6IERlYnVnRWxlbWVudFtdKSB7XG4gIGVsZW1lbnQuY2hpbGROb2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgIGlmIChub2RlIGluc3RhbmNlb2YgRGVidWdFbGVtZW50KSB7XG4gICAgICBpZiAocHJlZGljYXRlKG5vZGUpKSB7XG4gICAgICAgIG1hdGNoZXMucHVzaChub2RlKTtcbiAgICAgIH1cbiAgICAgIF9xdWVyeUVsZW1lbnRDaGlsZHJlbihub2RlLCBwcmVkaWNhdGUsIG1hdGNoZXMpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIF9xdWVyeU5vZGVDaGlsZHJlbihwYXJlbnROb2RlOiBEZWJ1Z05vZGUsIHByZWRpY2F0ZTogUHJlZGljYXRlPERlYnVnTm9kZT4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlczogRGVidWdOb2RlW10pIHtcbiAgaWYgKHBhcmVudE5vZGUgaW5zdGFuY2VvZiBEZWJ1Z0VsZW1lbnQpIHtcbiAgICBwYXJlbnROb2RlLmNoaWxkTm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgIGlmIChwcmVkaWNhdGUobm9kZSkpIHtcbiAgICAgICAgbWF0Y2hlcy5wdXNoKG5vZGUpO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBEZWJ1Z0VsZW1lbnQpIHtcbiAgICAgICAgX3F1ZXJ5Tm9kZUNoaWxkcmVuKG5vZGUsIHByZWRpY2F0ZSwgbWF0Y2hlcyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuLy8gTmVlZCB0byBrZWVwIHRoZSBub2RlcyBpbiBhIGdsb2JhbCBNYXAgc28gdGhhdCBtdWx0aXBsZSBhbmd1bGFyIGFwcHMgYXJlIHN1cHBvcnRlZC5cbnZhciBfbmF0aXZlTm9kZVRvRGVidWdOb2RlID0gbmV3IE1hcDxhbnksIERlYnVnTm9kZT4oKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlYnVnTm9kZShuYXRpdmVOb2RlOiBhbnkpOiBEZWJ1Z05vZGUge1xuICByZXR1cm4gX25hdGl2ZU5vZGVUb0RlYnVnTm9kZS5nZXQobmF0aXZlTm9kZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBbGxEZWJ1Z05vZGVzKCk6IERlYnVnTm9kZVtdIHtcbiAgcmV0dXJuIE1hcFdyYXBwZXIudmFsdWVzKF9uYXRpdmVOb2RlVG9EZWJ1Z05vZGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5kZXhEZWJ1Z05vZGUobm9kZTogRGVidWdOb2RlKSB7XG4gIF9uYXRpdmVOb2RlVG9EZWJ1Z05vZGUuc2V0KG5vZGUubmF0aXZlTm9kZSwgbm9kZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVEZWJ1Z05vZGVGcm9tSW5kZXgobm9kZTogRGVidWdOb2RlKSB7XG4gIF9uYXRpdmVOb2RlVG9EZWJ1Z05vZGUuZGVsZXRlKG5vZGUubmF0aXZlTm9kZSk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
