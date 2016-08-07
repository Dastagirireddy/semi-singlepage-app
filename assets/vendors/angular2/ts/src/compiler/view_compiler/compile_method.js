System.register(['angular2/src/facade/lang', 'angular2/src/facade/collection', '../output/output_ast'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, collection_1, o;
    var _DebugState, NULL_DEBUG_STATE, CompileMethod;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (o_1) {
                o = o_1;
            }],
        execute: function() {
            _DebugState = (function () {
                function _DebugState(nodeIndex, sourceAst) {
                    this.nodeIndex = nodeIndex;
                    this.sourceAst = sourceAst;
                }
                return _DebugState;
            }());
            NULL_DEBUG_STATE = new _DebugState(null, null);
            CompileMethod = (function () {
                function CompileMethod(_view) {
                    this._view = _view;
                    this._newState = NULL_DEBUG_STATE;
                    this._currState = NULL_DEBUG_STATE;
                    this._bodyStatements = [];
                    this._debugEnabled = this._view.genConfig.genDebugInfo;
                }
                CompileMethod.prototype._updateDebugContextIfNeeded = function () {
                    if (this._newState.nodeIndex !== this._currState.nodeIndex ||
                        this._newState.sourceAst !== this._currState.sourceAst) {
                        var expr = this._updateDebugContext(this._newState);
                        if (lang_1.isPresent(expr)) {
                            this._bodyStatements.push(expr.toStmt());
                        }
                    }
                };
                CompileMethod.prototype._updateDebugContext = function (newState) {
                    this._currState = this._newState = newState;
                    if (this._debugEnabled) {
                        var sourceLocation = lang_1.isPresent(newState.sourceAst) ? newState.sourceAst.sourceSpan.start : null;
                        return o.THIS_EXPR.callMethod('debug', [
                            o.literal(newState.nodeIndex),
                            lang_1.isPresent(sourceLocation) ? o.literal(sourceLocation.line) : o.NULL_EXPR,
                            lang_1.isPresent(sourceLocation) ? o.literal(sourceLocation.col) : o.NULL_EXPR
                        ]);
                    }
                    else {
                        return null;
                    }
                };
                CompileMethod.prototype.resetDebugInfoExpr = function (nodeIndex, templateAst) {
                    var res = this._updateDebugContext(new _DebugState(nodeIndex, templateAst));
                    return lang_1.isPresent(res) ? res : o.NULL_EXPR;
                };
                CompileMethod.prototype.resetDebugInfo = function (nodeIndex, templateAst) {
                    this._newState = new _DebugState(nodeIndex, templateAst);
                };
                CompileMethod.prototype.addStmt = function (stmt) {
                    this._updateDebugContextIfNeeded();
                    this._bodyStatements.push(stmt);
                };
                CompileMethod.prototype.addStmts = function (stmts) {
                    this._updateDebugContextIfNeeded();
                    collection_1.ListWrapper.addAll(this._bodyStatements, stmts);
                };
                CompileMethod.prototype.finish = function () { return this._bodyStatements; };
                CompileMethod.prototype.isEmpty = function () { return this._bodyStatements.length === 0; };
                return CompileMethod;
            }());
            exports_1("CompileMethod", CompileMethod);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci92aWV3X2NvbXBpbGVyL2NvbXBpbGVfbWV0aG9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7cUJBWUksZ0JBQWdCOzs7Ozs7Ozs7Ozs7O1lBSnBCO2dCQUNFLHFCQUFtQixTQUFpQixFQUFTLFNBQXNCO29CQUFoRCxjQUFTLEdBQVQsU0FBUyxDQUFRO29CQUFTLGNBQVMsR0FBVCxTQUFTLENBQWE7Z0JBQUcsQ0FBQztnQkFDekUsa0JBQUM7WUFBRCxDQUZBLEFBRUMsSUFBQTtZQUVHLGdCQUFnQixHQUFHLElBQUksV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVuRDtnQkFRRSx1QkFBb0IsS0FBa0I7b0JBQWxCLFVBQUssR0FBTCxLQUFLLENBQWE7b0JBUDlCLGNBQVMsR0FBZ0IsZ0JBQWdCLENBQUM7b0JBQzFDLGVBQVUsR0FBZ0IsZ0JBQWdCLENBQUM7b0JBSTNDLG9CQUFlLEdBQWtCLEVBQUUsQ0FBQztvQkFHMUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUM7Z0JBQ3pELENBQUM7Z0JBRU8sbURBQTJCLEdBQW5DO29CQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUzt3QkFDdEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO3dCQUMzRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUNwRCxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDcEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7d0JBQzNDLENBQUM7b0JBQ0gsQ0FBQztnQkFDSCxDQUFDO2dCQUVPLDJDQUFtQixHQUEzQixVQUE0QixRQUFxQjtvQkFDL0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztvQkFDNUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7d0JBQ3ZCLElBQUksY0FBYyxHQUNkLGdCQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7d0JBRS9FLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUU7NEJBQ3JDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQzs0QkFDN0IsZ0JBQVMsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUzs0QkFDeEUsZ0JBQVMsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUzt5QkFDeEUsQ0FBQyxDQUFDO29CQUNMLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDZCxDQUFDO2dCQUNILENBQUM7Z0JBRUQsMENBQWtCLEdBQWxCLFVBQW1CLFNBQWlCLEVBQUUsV0FBd0I7b0JBQzVELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDNUUsTUFBTSxDQUFDLGdCQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQzVDLENBQUM7Z0JBRUQsc0NBQWMsR0FBZCxVQUFlLFNBQWlCLEVBQUUsV0FBd0I7b0JBQ3hELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxXQUFXLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUMzRCxDQUFDO2dCQUVELCtCQUFPLEdBQVAsVUFBUSxJQUFpQjtvQkFDdkIsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7b0JBQ25DLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQyxDQUFDO2dCQUVELGdDQUFRLEdBQVIsVUFBUyxLQUFvQjtvQkFDM0IsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7b0JBQ25DLHdCQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ2xELENBQUM7Z0JBRUQsOEJBQU0sR0FBTixjQUEwQixNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7Z0JBRXhELCtCQUFPLEdBQVAsY0FBcUIsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xFLG9CQUFDO1lBQUQsQ0E1REEsQUE0REMsSUFBQTtZQTVERCx5Q0E0REMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tcGlsZXIvdmlld19jb21waWxlci9jb21waWxlX21ldGhvZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNQcmVzZW50LCBpc0JsYW5rfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtNYXBXcmFwcGVyLCBMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcblxuaW1wb3J0ICogYXMgbyBmcm9tICcuLi9vdXRwdXQvb3V0cHV0X2FzdCc7XG5pbXBvcnQge1RlbXBsYXRlQXN0fSBmcm9tICcuLi90ZW1wbGF0ZV9hc3QnO1xuXG5pbXBvcnQge0NvbXBpbGVWaWV3fSBmcm9tICcuL2NvbXBpbGVfdmlldyc7XG5cbmNsYXNzIF9EZWJ1Z1N0YXRlIHtcbiAgY29uc3RydWN0b3IocHVibGljIG5vZGVJbmRleDogbnVtYmVyLCBwdWJsaWMgc291cmNlQXN0OiBUZW1wbGF0ZUFzdCkge31cbn1cblxudmFyIE5VTExfREVCVUdfU1RBVEUgPSBuZXcgX0RlYnVnU3RhdGUobnVsbCwgbnVsbCk7XG5cbmV4cG9ydCBjbGFzcyBDb21waWxlTWV0aG9kIHtcbiAgcHJpdmF0ZSBfbmV3U3RhdGU6IF9EZWJ1Z1N0YXRlID0gTlVMTF9ERUJVR19TVEFURTtcbiAgcHJpdmF0ZSBfY3VyclN0YXRlOiBfRGVidWdTdGF0ZSA9IE5VTExfREVCVUdfU1RBVEU7XG5cbiAgcHJpdmF0ZSBfZGVidWdFbmFibGVkOiBib29sZWFuO1xuXG4gIHByaXZhdGUgX2JvZHlTdGF0ZW1lbnRzOiBvLlN0YXRlbWVudFtdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfdmlldzogQ29tcGlsZVZpZXcpIHtcbiAgICB0aGlzLl9kZWJ1Z0VuYWJsZWQgPSB0aGlzLl92aWV3LmdlbkNvbmZpZy5nZW5EZWJ1Z0luZm87XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVEZWJ1Z0NvbnRleHRJZk5lZWRlZCgpIHtcbiAgICBpZiAodGhpcy5fbmV3U3RhdGUubm9kZUluZGV4ICE9PSB0aGlzLl9jdXJyU3RhdGUubm9kZUluZGV4IHx8XG4gICAgICAgIHRoaXMuX25ld1N0YXRlLnNvdXJjZUFzdCAhPT0gdGhpcy5fY3VyclN0YXRlLnNvdXJjZUFzdCkge1xuICAgICAgdmFyIGV4cHIgPSB0aGlzLl91cGRhdGVEZWJ1Z0NvbnRleHQodGhpcy5fbmV3U3RhdGUpO1xuICAgICAgaWYgKGlzUHJlc2VudChleHByKSkge1xuICAgICAgICB0aGlzLl9ib2R5U3RhdGVtZW50cy5wdXNoKGV4cHIudG9TdG10KCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZURlYnVnQ29udGV4dChuZXdTdGF0ZTogX0RlYnVnU3RhdGUpOiBvLkV4cHJlc3Npb24ge1xuICAgIHRoaXMuX2N1cnJTdGF0ZSA9IHRoaXMuX25ld1N0YXRlID0gbmV3U3RhdGU7XG4gICAgaWYgKHRoaXMuX2RlYnVnRW5hYmxlZCkge1xuICAgICAgdmFyIHNvdXJjZUxvY2F0aW9uID1cbiAgICAgICAgICBpc1ByZXNlbnQobmV3U3RhdGUuc291cmNlQXN0KSA/IG5ld1N0YXRlLnNvdXJjZUFzdC5zb3VyY2VTcGFuLnN0YXJ0IDogbnVsbDtcblxuICAgICAgcmV0dXJuIG8uVEhJU19FWFBSLmNhbGxNZXRob2QoJ2RlYnVnJywgW1xuICAgICAgICBvLmxpdGVyYWwobmV3U3RhdGUubm9kZUluZGV4KSxcbiAgICAgICAgaXNQcmVzZW50KHNvdXJjZUxvY2F0aW9uKSA/IG8ubGl0ZXJhbChzb3VyY2VMb2NhdGlvbi5saW5lKSA6IG8uTlVMTF9FWFBSLFxuICAgICAgICBpc1ByZXNlbnQoc291cmNlTG9jYXRpb24pID8gby5saXRlcmFsKHNvdXJjZUxvY2F0aW9uLmNvbCkgOiBvLk5VTExfRVhQUlxuICAgICAgXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHJlc2V0RGVidWdJbmZvRXhwcihub2RlSW5kZXg6IG51bWJlciwgdGVtcGxhdGVBc3Q6IFRlbXBsYXRlQXN0KTogby5FeHByZXNzaW9uIHtcbiAgICB2YXIgcmVzID0gdGhpcy5fdXBkYXRlRGVidWdDb250ZXh0KG5ldyBfRGVidWdTdGF0ZShub2RlSW5kZXgsIHRlbXBsYXRlQXN0KSk7XG4gICAgcmV0dXJuIGlzUHJlc2VudChyZXMpID8gcmVzIDogby5OVUxMX0VYUFI7XG4gIH1cblxuICByZXNldERlYnVnSW5mbyhub2RlSW5kZXg6IG51bWJlciwgdGVtcGxhdGVBc3Q6IFRlbXBsYXRlQXN0KSB7XG4gICAgdGhpcy5fbmV3U3RhdGUgPSBuZXcgX0RlYnVnU3RhdGUobm9kZUluZGV4LCB0ZW1wbGF0ZUFzdCk7XG4gIH1cblxuICBhZGRTdG10KHN0bXQ6IG8uU3RhdGVtZW50KSB7XG4gICAgdGhpcy5fdXBkYXRlRGVidWdDb250ZXh0SWZOZWVkZWQoKTtcbiAgICB0aGlzLl9ib2R5U3RhdGVtZW50cy5wdXNoKHN0bXQpO1xuICB9XG5cbiAgYWRkU3RtdHMoc3RtdHM6IG8uU3RhdGVtZW50W10pIHtcbiAgICB0aGlzLl91cGRhdGVEZWJ1Z0NvbnRleHRJZk5lZWRlZCgpO1xuICAgIExpc3RXcmFwcGVyLmFkZEFsbCh0aGlzLl9ib2R5U3RhdGVtZW50cywgc3RtdHMpO1xuICB9XG5cbiAgZmluaXNoKCk6IG8uU3RhdGVtZW50W10geyByZXR1cm4gdGhpcy5fYm9keVN0YXRlbWVudHM7IH1cblxuICBpc0VtcHR5KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fYm9keVN0YXRlbWVudHMubGVuZ3RoID09PSAwOyB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
