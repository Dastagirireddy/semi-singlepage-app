System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', '../output/output_ast', '../identifiers', './util'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, exceptions_1, o, identifiers_1, util_1;
    var _PurePipeProxy, CompilePipe;
    function _findPipeMeta(view, name) {
        var pipeMeta = null;
        for (var i = view.pipeMetas.length - 1; i >= 0; i--) {
            var localPipeMeta = view.pipeMetas[i];
            if (localPipeMeta.name == name) {
                pipeMeta = localPipeMeta;
                break;
            }
        }
        if (lang_1.isBlank(pipeMeta)) {
            throw new exceptions_1.BaseException("Illegal state: Could not find pipe " + name + " although the parser should have detected this error!");
        }
        return pipeMeta;
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (o_1) {
                o = o_1;
            },
            function (identifiers_1_1) {
                identifiers_1 = identifiers_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            }],
        execute: function() {
            _PurePipeProxy = (function () {
                function _PurePipeProxy(instance, argCount) {
                    this.instance = instance;
                    this.argCount = argCount;
                }
                return _PurePipeProxy;
            }());
            CompilePipe = (function () {
                function CompilePipe(view, name) {
                    this.view = view;
                    this._purePipeProxies = [];
                    this.meta = _findPipeMeta(view, name);
                    this.instance = o.THIS_EXPR.prop("_pipe_" + name + "_" + view.pipeCount++);
                }
                Object.defineProperty(CompilePipe.prototype, "pure", {
                    get: function () { return this.meta.pure; },
                    enumerable: true,
                    configurable: true
                });
                CompilePipe.prototype.create = function () {
                    var _this = this;
                    var deps = this.meta.type.diDeps.map(function (diDep) {
                        if (diDep.token.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.ChangeDetectorRef))) {
                            return o.THIS_EXPR.prop('ref');
                        }
                        return util_1.injectFromViewParentInjector(diDep.token, false);
                    });
                    this.view.fields.push(new o.ClassField(this.instance.name, o.importType(this.meta.type), [o.StmtModifier.Private]));
                    this.view.createMethod.resetDebugInfo(null, null);
                    this.view.createMethod.addStmt(o.THIS_EXPR.prop(this.instance.name)
                        .set(o.importExpr(this.meta.type).instantiate(deps))
                        .toStmt());
                    this._purePipeProxies.forEach(function (purePipeProxy) {
                        util_1.createPureProxy(_this.instance.prop('transform').callMethod(o.BuiltinMethod.bind, [_this.instance]), purePipeProxy.argCount, purePipeProxy.instance, _this.view);
                    });
                };
                CompilePipe.prototype.call = function (callingView, args) {
                    if (this.meta.pure) {
                        var purePipeProxy = new _PurePipeProxy(o.THIS_EXPR.prop(this.instance.name + "_" + this._purePipeProxies.length), args.length);
                        this._purePipeProxies.push(purePipeProxy);
                        return util_1.getPropertyInView(o.importExpr(identifiers_1.Identifiers.castByValue)
                            .callFn([purePipeProxy.instance, this.instance.prop('transform')]), callingView, this.view)
                            .callFn(args);
                    }
                    else {
                        return util_1.getPropertyInView(this.instance, callingView, this.view).callMethod('transform', args);
                    }
                };
                return CompilePipe;
            }());
            exports_1("CompilePipe", CompilePipe);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci92aWV3X2NvbXBpbGVyL2NvbXBpbGVfcGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztJQTZEQSx1QkFBdUIsSUFBaUIsRUFBRSxJQUFZO1FBQ3BELElBQUksUUFBUSxHQUF3QixJQUFJLENBQUM7UUFDekMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNwRCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDL0IsUUFBUSxHQUFHLGFBQWEsQ0FBQztnQkFDekIsS0FBSyxDQUFDO1lBQ1IsQ0FBQztRQUNILENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLE1BQU0sSUFBSSwwQkFBYSxDQUNuQix3Q0FBc0MsSUFBSSwwREFBdUQsQ0FBQyxDQUFDO1FBQ3pHLENBQUM7UUFDRCxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ2xCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFuRUQ7Z0JBQ0Usd0JBQW1CLFFBQXdCLEVBQVMsUUFBZ0I7b0JBQWpELGFBQVEsR0FBUixRQUFRLENBQWdCO29CQUFTLGFBQVEsR0FBUixRQUFRLENBQVE7Z0JBQUcsQ0FBQztnQkFDMUUscUJBQUM7WUFBRCxDQUZBLEFBRUMsSUFBQTtZQUVEO2dCQUtFLHFCQUFtQixJQUFpQixFQUFFLElBQVk7b0JBQS9CLFNBQUksR0FBSixJQUFJLENBQWE7b0JBRjVCLHFCQUFnQixHQUFxQixFQUFFLENBQUM7b0JBRzlDLElBQUksQ0FB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QVcsQ0FBQzs2QkFDaEMsTUFBTSxDQUFDLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQ3RFLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDOzZCQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3BCLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sTUFBTSxDQUFDLHdCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNoRyxDQUFDO2dCQUNILENBQUM7Z0JBQ0gsa0JBQUM7WUFBRCxDQTlDQSxBQThDQyxJQUFBO1lBOUNELHFDQThDQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci92aWV3X2NvbXBpbGVyL2NvbXBpbGVfcGlwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNCbGFuaywgaXNQcmVzZW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0ICogYXMgbyBmcm9tICcuLi9vdXRwdXQvb3V0cHV0X2FzdCc7XG5pbXBvcnQge0NvbXBpbGVWaWV3fSBmcm9tICcuL2NvbXBpbGVfdmlldyc7XG5pbXBvcnQge0NvbXBpbGVQaXBlTWV0YWRhdGF9IGZyb20gJy4uL2NvbXBpbGVfbWV0YWRhdGEnO1xuaW1wb3J0IHtJZGVudGlmaWVycywgaWRlbnRpZmllclRva2VufSBmcm9tICcuLi9pZGVudGlmaWVycyc7XG5pbXBvcnQge2luamVjdEZyb21WaWV3UGFyZW50SW5qZWN0b3IsIGNyZWF0ZVB1cmVQcm94eSwgZ2V0UHJvcGVydHlJblZpZXd9IGZyb20gJy4vdXRpbCc7XG5cbmNsYXNzIF9QdXJlUGlwZVByb3h5IHtcbiAgY29uc3RydWN0b3IocHVibGljIGluc3RhbmNlOiBvLlJlYWRQcm9wRXhwciwgcHVibGljIGFyZ0NvdW50OiBudW1iZXIpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21waWxlUGlwZSB7XG4gIG1ldGE6IENvbXBpbGVQaXBlTWV0YWRhdGE7XG4gIGluc3RhbmNlOiBvLlJlYWRQcm9wRXhwcjtcbiAgcHJpdmF0ZSBfcHVyZVBpcGVQcm94aWVzOiBfUHVyZVBpcGVQcm94eVtdID0gW107XG5cbiAgY29uc3RydWN0b3IocHVibGljIHZpZXc6IENvbXBpbGVWaWV3LCBuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLm1ldGEgPSBfZmluZFBpcGVNZXRhKHZpZXcsIG5hbWUpO1xuICAgIHRoaXMuaW5zdGFuY2UgPSBvLlRISVNfRVhQUi5wcm9wKGBfcGlwZV8ke25hbWV9XyR7dmlldy5waXBlQ291bnQrK31gKTtcbiAgfVxuXG4gIGdldCBwdXJlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5tZXRhLnB1cmU7IH1cblxuICBjcmVhdGUoKTogdm9pZCB7XG4gICAgdmFyIGRlcHMgPSB0aGlzLm1ldGEudHlwZS5kaURlcHMubWFwKChkaURlcCkgPT4ge1xuICAgICAgaWYgKGRpRGVwLnRva2VuLmVxdWFsc1RvKGlkZW50aWZpZXJUb2tlbihJZGVudGlmaWVycy5DaGFuZ2VEZXRlY3RvclJlZikpKSB7XG4gICAgICAgIHJldHVybiBvLlRISVNfRVhQUi5wcm9wKCdyZWYnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbmplY3RGcm9tVmlld1BhcmVudEluamVjdG9yKGRpRGVwLnRva2VuLCBmYWxzZSk7XG4gICAgfSk7XG4gICAgdGhpcy52aWV3LmZpZWxkcy5wdXNoKG5ldyBvLkNsYXNzRmllbGQodGhpcy5pbnN0YW5jZS5uYW1lLCBvLmltcG9ydFR5cGUodGhpcy5tZXRhLnR5cGUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtvLlN0bXRNb2RpZmllci5Qcml2YXRlXSkpO1xuICAgIHRoaXMudmlldy5jcmVhdGVNZXRob2QucmVzZXREZWJ1Z0luZm8obnVsbCwgbnVsbCk7XG4gICAgdGhpcy52aWV3LmNyZWF0ZU1ldGhvZC5hZGRTdG10KG8uVEhJU19FWFBSLnByb3AodGhpcy5pbnN0YW5jZS5uYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNldChvLmltcG9ydEV4cHIodGhpcy5tZXRhLnR5cGUpLmluc3RhbnRpYXRlKGRlcHMpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvU3RtdCgpKTtcbiAgICB0aGlzLl9wdXJlUGlwZVByb3hpZXMuZm9yRWFjaCgocHVyZVBpcGVQcm94eSkgPT4ge1xuICAgICAgY3JlYXRlUHVyZVByb3h5KFxuICAgICAgICAgIHRoaXMuaW5zdGFuY2UucHJvcCgndHJhbnNmb3JtJykuY2FsbE1ldGhvZChvLkJ1aWx0aW5NZXRob2QuYmluZCwgW3RoaXMuaW5zdGFuY2VdKSxcbiAgICAgICAgICBwdXJlUGlwZVByb3h5LmFyZ0NvdW50LCBwdXJlUGlwZVByb3h5Lmluc3RhbmNlLCB0aGlzLnZpZXcpO1xuICAgIH0pO1xuICB9XG5cbiAgY2FsbChjYWxsaW5nVmlldzogQ29tcGlsZVZpZXcsIGFyZ3M6IG8uRXhwcmVzc2lvbltdKTogby5FeHByZXNzaW9uIHtcbiAgICBpZiAodGhpcy5tZXRhLnB1cmUpIHtcbiAgICAgIHZhciBwdXJlUGlwZVByb3h5ID0gbmV3IF9QdXJlUGlwZVByb3h5KFxuICAgICAgICAgIG8uVEhJU19FWFBSLnByb3AoYCR7dGhpcy5pbnN0YW5jZS5uYW1lfV8ke3RoaXMuX3B1cmVQaXBlUHJveGllcy5sZW5ndGh9YCksIGFyZ3MubGVuZ3RoKTtcbiAgICAgIHRoaXMuX3B1cmVQaXBlUHJveGllcy5wdXNoKHB1cmVQaXBlUHJveHkpO1xuICAgICAgcmV0dXJuIGdldFByb3BlcnR5SW5WaWV3KFxuICAgICAgICAgICAgICAgICBvLmltcG9ydEV4cHIoSWRlbnRpZmllcnMuY2FzdEJ5VmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICAuY2FsbEZuKFtwdXJlUGlwZVByb3h5Lmluc3RhbmNlLCB0aGlzLmluc3RhbmNlLnByb3AoJ3RyYW5zZm9ybScpXSksXG4gICAgICAgICAgICAgICAgIGNhbGxpbmdWaWV3LCB0aGlzLnZpZXcpXG4gICAgICAgICAgLmNhbGxGbihhcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGdldFByb3BlcnR5SW5WaWV3KHRoaXMuaW5zdGFuY2UsIGNhbGxpbmdWaWV3LCB0aGlzLnZpZXcpLmNhbGxNZXRob2QoJ3RyYW5zZm9ybScsIGFyZ3MpO1xuICAgIH1cbiAgfVxufVxuXG5cbmZ1bmN0aW9uIF9maW5kUGlwZU1ldGEodmlldzogQ29tcGlsZVZpZXcsIG5hbWU6IHN0cmluZyk6IENvbXBpbGVQaXBlTWV0YWRhdGEge1xuICB2YXIgcGlwZU1ldGE6IENvbXBpbGVQaXBlTWV0YWRhdGEgPSBudWxsO1xuICBmb3IgKHZhciBpID0gdmlldy5waXBlTWV0YXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICB2YXIgbG9jYWxQaXBlTWV0YSA9IHZpZXcucGlwZU1ldGFzW2ldO1xuICAgIGlmIChsb2NhbFBpcGVNZXRhLm5hbWUgPT0gbmFtZSkge1xuICAgICAgcGlwZU1ldGEgPSBsb2NhbFBpcGVNZXRhO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGlmIChpc0JsYW5rKHBpcGVNZXRhKSkge1xuICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFxuICAgICAgICBgSWxsZWdhbCBzdGF0ZTogQ291bGQgbm90IGZpbmQgcGlwZSAke25hbWV9IGFsdGhvdWdoIHRoZSBwYXJzZXIgc2hvdWxkIGhhdmUgZGV0ZWN0ZWQgdGhpcyBlcnJvciFgKTtcbiAgfVxuICByZXR1cm4gcGlwZU1ldGE7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
