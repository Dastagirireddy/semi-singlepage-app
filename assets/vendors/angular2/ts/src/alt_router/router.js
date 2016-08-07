System.register(['angular2/core', 'angular2/src/facade/lang', './recognize', './segments', './lifecycle_reflector'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, lang_1, recognize_1, segments_1, lifecycle_reflector_1;
    var RouterOutletMap, Router;
    function _loadSegments(currTree, curr, prevTree, prev, router, parentOutletMap) {
        var outlet = parentOutletMap._outlets[curr.outlet];
        var outletMap;
        if (segments_1.equalSegments(curr, prev)) {
            outletMap = outlet.outletMap;
        }
        else {
            outletMap = new RouterOutletMap();
            var resolved = core_1.ReflectiveInjector.resolve([core_1.provide(RouterOutletMap, { useValue: outletMap }), core_1.provide(segments_1.RouteSegment, { useValue: curr })]);
            var ref = outlet.load(segments_1.routeSegmentComponentFactory(curr), resolved, outletMap);
            if (lifecycle_reflector_1.hasLifecycleHook("routerOnActivate", ref.instance)) {
                ref.instance.routerOnActivate(curr, prev, currTree, prevTree);
            }
        }
        if (lang_1.isPresent(currTree.firstChild(curr))) {
            var cc = currTree.firstChild(curr);
            var pc = lang_1.isBlank(prevTree) ? null : prevTree.firstChild(prev);
            _loadSegments(currTree, cc, prevTree, pc, router, outletMap);
        }
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (recognize_1_1) {
                recognize_1 = recognize_1_1;
            },
            function (segments_1_1) {
                segments_1 = segments_1_1;
            },
            function (lifecycle_reflector_1_1) {
                lifecycle_reflector_1 = lifecycle_reflector_1_1;
            }],
        execute: function() {
            RouterOutletMap = (function () {
                function RouterOutletMap() {
                    /** @internal */
                    this._outlets = {};
                }
                RouterOutletMap.prototype.registerOutlet = function (name, outlet) { this._outlets[name] = outlet; };
                return RouterOutletMap;
            }());
            exports_1("RouterOutletMap", RouterOutletMap);
            Router = (function () {
                function Router(_componentType, _componentResolver, _urlParser, _routerOutletMap) {
                    this._componentType = _componentType;
                    this._componentResolver = _componentResolver;
                    this._urlParser = _urlParser;
                    this._routerOutletMap = _routerOutletMap;
                }
                Router.prototype.navigateByUrl = function (url) {
                    var _this = this;
                    var urlSegmentTree = this._urlParser.parse(url.substring(1));
                    return recognize_1.recognize(this._componentResolver, this._componentType, urlSegmentTree)
                        .then(function (currTree) {
                        var prevRoot = lang_1.isPresent(_this.prevTree) ? _this.prevTree.root : null;
                        _loadSegments(currTree, currTree.root, _this.prevTree, prevRoot, _this, _this._routerOutletMap);
                        _this.prevTree = currTree;
                    });
                };
                return Router;
            }());
            exports_1("Router", Router);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9hbHRfcm91dGVyL3JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztJQStCQSx1QkFBdUIsUUFBNEIsRUFBRSxJQUFrQixFQUNoRCxRQUE0QixFQUFFLElBQWtCLEVBQUUsTUFBYyxFQUNoRSxlQUFnQztRQUNyRCxJQUFJLE1BQU0sR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVuRCxJQUFJLFNBQVMsQ0FBQztRQUNkLEVBQUUsQ0FBQyxDQUFDLHdCQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUMvQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixTQUFTLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztZQUNsQyxJQUFJLFFBQVEsR0FBRyx5QkFBa0IsQ0FBQyxPQUFPLENBQ3JDLENBQUMsY0FBTyxDQUFDLGVBQWUsRUFBRSxFQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUMsQ0FBQyxFQUFFLGNBQU8sQ0FBQyx1QkFBWSxFQUFFLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hHLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsdUNBQTRCLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQy9FLEVBQUUsQ0FBQyxDQUFDLHNDQUFnQixDQUFDLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZELEdBQUcsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDaEUsQ0FBQztRQUNILENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQyxJQUFJLEVBQUUsR0FBRyxjQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUQsYUFBYSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDL0QsQ0FBQztJQUNILENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUE5Q0Q7Z0JBQUE7b0JBQ0UsZ0JBQWdCO29CQUNoQixhQUFRLEdBQW1DLEVBQUUsQ0FBQztnQkFFaEQsQ0FBQztnQkFEQyx3Q0FBYyxHQUFkLFVBQWUsSUFBWSxFQUFFLE1BQW9CLElBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUM1RixzQkFBQztZQUFELENBSkEsQUFJQyxJQUFBO1lBSkQsNkNBSUMsQ0FBQTtZQUVEO2dCQUVFLGdCQUFvQixjQUFvQixFQUFVLGtCQUFxQyxFQUNuRSxVQUEyQixFQUFVLGdCQUFpQztvQkFEdEUsbUJBQWMsR0FBZCxjQUFjLENBQU07b0JBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtvQkFDbkUsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7b0JBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtnQkFBRyxDQUFDO2dCQUU5Riw4QkFBYSxHQUFiLFVBQWMsR0FBVztvQkFBekIsaUJBU0M7b0JBUkMsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3RCxNQUFNLENBQUMscUJBQVMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxjQUFjLENBQUM7eUJBQ3pFLElBQUksQ0FBQyxVQUFBLFFBQVE7d0JBQ1osSUFBSSxRQUFRLEdBQUcsZ0JBQVMsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO3dCQUNwRSxhQUFhLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSSxFQUN0RCxLQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzt3QkFDckMsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7b0JBQzNCLENBQUMsQ0FBQyxDQUFDO2dCQUNULENBQUM7Z0JBQ0gsYUFBQztZQUFELENBZkEsQUFlQyxJQUFBO1lBZkQsMkJBZUMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvYWx0X3JvdXRlci9yb3V0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3Byb3ZpZGUsIFJlZmxlY3RpdmVJbmplY3RvciwgQ29tcG9uZW50UmVzb2x2ZXJ9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtSb3V0ZXJPdXRsZXR9IGZyb20gJy4vZGlyZWN0aXZlcy9yb3V0ZXJfb3V0bGV0JztcbmltcG9ydCB7VHlwZSwgaXNCbGFuaywgaXNQcmVzZW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtSb3V0ZXJVcmxQYXJzZXJ9IGZyb20gJy4vcm91dGVyX3VybF9wYXJzZXInO1xuaW1wb3J0IHtyZWNvZ25pemV9IGZyb20gJy4vcmVjb2duaXplJztcbmltcG9ydCB7ZXF1YWxTZWdtZW50cywgcm91dGVTZWdtZW50Q29tcG9uZW50RmFjdG9yeSwgUm91dGVTZWdtZW50LCBUcmVlfSBmcm9tICcuL3NlZ21lbnRzJztcbmltcG9ydCB7aGFzTGlmZWN5Y2xlSG9va30gZnJvbSAnLi9saWZlY3ljbGVfcmVmbGVjdG9yJztcblxuZXhwb3J0IGNsYXNzIFJvdXRlck91dGxldE1hcCB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX291dGxldHM6IHtbbmFtZTogc3RyaW5nXTogUm91dGVyT3V0bGV0fSA9IHt9O1xuICByZWdpc3Rlck91dGxldChuYW1lOiBzdHJpbmcsIG91dGxldDogUm91dGVyT3V0bGV0KTogdm9pZCB7IHRoaXMuX291dGxldHNbbmFtZV0gPSBvdXRsZXQ7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFJvdXRlciB7XG4gIHByaXZhdGUgcHJldlRyZWU6IFRyZWU8Um91dGVTZWdtZW50PjtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY29tcG9uZW50VHlwZTogVHlwZSwgcHJpdmF0ZSBfY29tcG9uZW50UmVzb2x2ZXI6IENvbXBvbmVudFJlc29sdmVyLFxuICAgICAgICAgICAgICBwcml2YXRlIF91cmxQYXJzZXI6IFJvdXRlclVybFBhcnNlciwgcHJpdmF0ZSBfcm91dGVyT3V0bGV0TWFwOiBSb3V0ZXJPdXRsZXRNYXApIHt9XG5cbiAgbmF2aWdhdGVCeVVybCh1cmw6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCB1cmxTZWdtZW50VHJlZSA9IHRoaXMuX3VybFBhcnNlci5wYXJzZSh1cmwuc3Vic3RyaW5nKDEpKTtcbiAgICByZXR1cm4gcmVjb2duaXplKHRoaXMuX2NvbXBvbmVudFJlc29sdmVyLCB0aGlzLl9jb21wb25lbnRUeXBlLCB1cmxTZWdtZW50VHJlZSlcbiAgICAgICAgLnRoZW4oY3VyclRyZWUgPT4ge1xuICAgICAgICAgIGxldCBwcmV2Um9vdCA9IGlzUHJlc2VudCh0aGlzLnByZXZUcmVlKSA/IHRoaXMucHJldlRyZWUucm9vdCA6IG51bGw7XG4gICAgICAgICAgX2xvYWRTZWdtZW50cyhjdXJyVHJlZSwgY3VyclRyZWUucm9vdCwgdGhpcy5wcmV2VHJlZSwgcHJldlJvb3QsIHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3V0ZXJPdXRsZXRNYXApO1xuICAgICAgICAgIHRoaXMucHJldlRyZWUgPSBjdXJyVHJlZTtcbiAgICAgICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2xvYWRTZWdtZW50cyhjdXJyVHJlZTogVHJlZTxSb3V0ZVNlZ21lbnQ+LCBjdXJyOiBSb3V0ZVNlZ21lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgIHByZXZUcmVlOiBUcmVlPFJvdXRlU2VnbWVudD4sIHByZXY6IFJvdXRlU2VnbWVudCwgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgIHBhcmVudE91dGxldE1hcDogUm91dGVyT3V0bGV0TWFwKTogdm9pZCB7XG4gIGxldCBvdXRsZXQgPSBwYXJlbnRPdXRsZXRNYXAuX291dGxldHNbY3Vyci5vdXRsZXRdO1xuXG4gIGxldCBvdXRsZXRNYXA7XG4gIGlmIChlcXVhbFNlZ21lbnRzKGN1cnIsIHByZXYpKSB7XG4gICAgb3V0bGV0TWFwID0gb3V0bGV0Lm91dGxldE1hcDtcbiAgfSBlbHNlIHtcbiAgICBvdXRsZXRNYXAgPSBuZXcgUm91dGVyT3V0bGV0TWFwKCk7XG4gICAgbGV0IHJlc29sdmVkID0gUmVmbGVjdGl2ZUluamVjdG9yLnJlc29sdmUoXG4gICAgICAgIFtwcm92aWRlKFJvdXRlck91dGxldE1hcCwge3VzZVZhbHVlOiBvdXRsZXRNYXB9KSwgcHJvdmlkZShSb3V0ZVNlZ21lbnQsIHt1c2VWYWx1ZTogY3Vycn0pXSk7XG4gICAgbGV0IHJlZiA9IG91dGxldC5sb2FkKHJvdXRlU2VnbWVudENvbXBvbmVudEZhY3RvcnkoY3VyciksIHJlc29sdmVkLCBvdXRsZXRNYXApO1xuICAgIGlmIChoYXNMaWZlY3ljbGVIb29rKFwicm91dGVyT25BY3RpdmF0ZVwiLCByZWYuaW5zdGFuY2UpKSB7XG4gICAgICByZWYuaW5zdGFuY2Uucm91dGVyT25BY3RpdmF0ZShjdXJyLCBwcmV2LCBjdXJyVHJlZSwgcHJldlRyZWUpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChpc1ByZXNlbnQoY3VyclRyZWUuZmlyc3RDaGlsZChjdXJyKSkpIHtcbiAgICBsZXQgY2MgPSBjdXJyVHJlZS5maXJzdENoaWxkKGN1cnIpO1xuICAgIGxldCBwYyA9IGlzQmxhbmsocHJldlRyZWUpID8gbnVsbCA6IHByZXZUcmVlLmZpcnN0Q2hpbGQocHJldik7XG4gICAgX2xvYWRTZWdtZW50cyhjdXJyVHJlZSwgY2MsIHByZXZUcmVlLCBwYywgcm91dGVyLCBvdXRsZXRNYXApO1xuICB9XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
