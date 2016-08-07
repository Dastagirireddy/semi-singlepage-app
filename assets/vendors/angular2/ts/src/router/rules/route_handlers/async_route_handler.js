System.register(['angular2/src/facade/lang', '../../instruction'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, instruction_1;
    var AsyncRouteHandler;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (instruction_1_1) {
                instruction_1 = instruction_1_1;
            }],
        execute: function() {
            AsyncRouteHandler = (function () {
                function AsyncRouteHandler(_loader, data) {
                    if (data === void 0) { data = null; }
                    this._loader = _loader;
                    /** @internal */
                    this._resolvedComponent = null;
                    this.data = lang_1.isPresent(data) ? new instruction_1.RouteData(data) : instruction_1.BLANK_ROUTE_DATA;
                }
                AsyncRouteHandler.prototype.resolveComponentType = function () {
                    var _this = this;
                    if (lang_1.isPresent(this._resolvedComponent)) {
                        return this._resolvedComponent;
                    }
                    return this._resolvedComponent = this._loader().then(function (componentType) {
                        _this.componentType = componentType;
                        return componentType;
                    });
                };
                return AsyncRouteHandler;
            }());
            exports_1("AsyncRouteHandler", AsyncRouteHandler);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvcnVsZXMvcm91dGVfaGFuZGxlcnMvYXN5bmNfcm91dGVfaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztZQU1BO2dCQU1FLDJCQUFvQixPQUE0QixFQUFFLElBQWlDO29CQUFqQyxvQkFBaUMsR0FBakMsV0FBaUM7b0JBQS9ELFlBQU8sR0FBUCxPQUFPLENBQXFCO29CQUxoRCxnQkFBZ0I7b0JBQ2hCLHVCQUFrQixHQUFrQixJQUFJLENBQUM7b0JBS3ZDLElBQUksQ0FBQyxJQUFJLEdBQUcsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLHVCQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsOEJBQWdCLENBQUM7Z0JBQ3ZFLENBQUM7Z0JBRUQsZ0RBQW9CLEdBQXBCO29CQUFBLGlCQVNDO29CQVJDLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO29CQUNqQyxDQUFDO29CQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLGFBQWE7d0JBQ2pFLEtBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO3dCQUNuQyxNQUFNLENBQUMsYUFBYSxDQUFDO29CQUN2QixDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDO2dCQUNILHdCQUFDO1lBQUQsQ0FwQkEsQUFvQkMsSUFBQTtZQXBCRCxpREFvQkMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvcm91dGVyL3J1bGVzL3JvdXRlX2hhbmRsZXJzL2FzeW5jX3JvdXRlX2hhbmRsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzUHJlc2VudCwgVHlwZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuaW1wb3J0IHtSb3V0ZUhhbmRsZXJ9IGZyb20gJy4vcm91dGVfaGFuZGxlcic7XG5pbXBvcnQge1JvdXRlRGF0YSwgQkxBTktfUk9VVEVfREFUQX0gZnJvbSAnLi4vLi4vaW5zdHJ1Y3Rpb24nO1xuXG5cbmV4cG9ydCBjbGFzcyBBc3luY1JvdXRlSGFuZGxlciBpbXBsZW1lbnRzIFJvdXRlSGFuZGxlciB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3Jlc29sdmVkQ29tcG9uZW50OiBQcm9taXNlPFR5cGU+ID0gbnVsbDtcbiAgY29tcG9uZW50VHlwZTogVHlwZTtcbiAgcHVibGljIGRhdGE6IFJvdXRlRGF0YTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9sb2FkZXI6ICgpID0+IFByb21pc2U8VHlwZT4sIGRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0gbnVsbCkge1xuICAgIHRoaXMuZGF0YSA9IGlzUHJlc2VudChkYXRhKSA/IG5ldyBSb3V0ZURhdGEoZGF0YSkgOiBCTEFOS19ST1VURV9EQVRBO1xuICB9XG5cbiAgcmVzb2x2ZUNvbXBvbmVudFR5cGUoKTogUHJvbWlzZTxUeXBlPiB7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl9yZXNvbHZlZENvbXBvbmVudCkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXNvbHZlZENvbXBvbmVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fcmVzb2x2ZWRDb21wb25lbnQgPSB0aGlzLl9sb2FkZXIoKS50aGVuKChjb21wb25lbnRUeXBlKSA9PiB7XG4gICAgICB0aGlzLmNvbXBvbmVudFR5cGUgPSBjb21wb25lbnRUeXBlO1xuICAgICAgcmV0dXJuIGNvbXBvbmVudFR5cGU7XG4gICAgfSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
