System.register(['angular2/src/platform/dom/dom_adapter', 'angular2/src/core/di', 'angular2/src/facade/collection', './dom_tokens'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var dom_adapter_1, di_1, collection_1, dom_tokens_1;
    var SharedStylesHost, DomSharedStylesHost;
    return {
        setters:[
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (dom_tokens_1_1) {
                dom_tokens_1 = dom_tokens_1_1;
            }],
        execute: function() {
            SharedStylesHost = (function () {
                function SharedStylesHost() {
                    /** @internal */
                    this._styles = [];
                    /** @internal */
                    this._stylesSet = new Set();
                }
                SharedStylesHost.prototype.addStyles = function (styles) {
                    var _this = this;
                    var additions = [];
                    styles.forEach(function (style) {
                        if (!collection_1.SetWrapper.has(_this._stylesSet, style)) {
                            _this._stylesSet.add(style);
                            _this._styles.push(style);
                            additions.push(style);
                        }
                    });
                    this.onStylesAdded(additions);
                };
                SharedStylesHost.prototype.onStylesAdded = function (additions) { };
                SharedStylesHost.prototype.getAllStyles = function () { return this._styles; };
                SharedStylesHost = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], SharedStylesHost);
                return SharedStylesHost;
            }());
            exports_1("SharedStylesHost", SharedStylesHost);
            DomSharedStylesHost = (function (_super) {
                __extends(DomSharedStylesHost, _super);
                function DomSharedStylesHost(doc) {
                    _super.call(this);
                    this._hostNodes = new Set();
                    this._hostNodes.add(doc.head);
                }
                /** @internal */
                DomSharedStylesHost.prototype._addStylesToHost = function (styles, host) {
                    for (var i = 0; i < styles.length; i++) {
                        var style = styles[i];
                        dom_adapter_1.DOM.appendChild(host, dom_adapter_1.DOM.createStyleElement(style));
                    }
                };
                DomSharedStylesHost.prototype.addHost = function (hostNode) {
                    this._addStylesToHost(this._styles, hostNode);
                    this._hostNodes.add(hostNode);
                };
                DomSharedStylesHost.prototype.removeHost = function (hostNode) { collection_1.SetWrapper.delete(this._hostNodes, hostNode); };
                DomSharedStylesHost.prototype.onStylesAdded = function (additions) {
                    var _this = this;
                    this._hostNodes.forEach(function (hostNode) { _this._addStylesToHost(additions, hostNode); });
                };
                DomSharedStylesHost = __decorate([
                    di_1.Injectable(),
                    __param(0, di_1.Inject(dom_tokens_1.DOCUMENT)), 
                    __metadata('design:paramtypes', [Object])
                ], DomSharedStylesHost);
                return DomSharedStylesHost;
            }(SharedStylesHost));
            exports_1("DomSharedStylesHost", DomSharedStylesHost);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL2RvbS9zaGFyZWRfc3R5bGVzX2hvc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQU1BO2dCQU1FO29CQUxBLGdCQUFnQjtvQkFDaEIsWUFBTyxHQUFhLEVBQUUsQ0FBQztvQkFDdkIsZ0JBQWdCO29CQUNoQixlQUFVLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztnQkFFaEIsQ0FBQztnQkFFaEIsb0NBQVMsR0FBVCxVQUFVLE1BQWdCO29CQUExQixpQkFVQztvQkFUQyxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7b0JBQ25CLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO3dCQUNsQixFQUFFLENBQUMsQ0FBQyxDQUFDLHVCQUFVLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUM1QyxLQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDM0IsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQ3pCLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3hCLENBQUM7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDaEMsQ0FBQztnQkFFRCx3Q0FBYSxHQUFiLFVBQWMsU0FBbUIsSUFBRyxDQUFDO2dCQUVyQyx1Q0FBWSxHQUFaLGNBQTJCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkF2Qm5EO29CQUFDLGVBQVUsRUFBRTs7b0NBQUE7Z0JBd0JiLHVCQUFDO1lBQUQsQ0F2QkEsQUF1QkMsSUFBQTtZQXZCRCwrQ0F1QkMsQ0FBQTtZQUdEO2dCQUF5Qyx1Q0FBZ0I7Z0JBRXZELDZCQUE4QixHQUFRO29CQUNwQyxpQkFBTyxDQUFDO29CQUZGLGVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBUSxDQUFDO29CQUduQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hDLENBQUM7Z0JBQ0QsZ0JBQWdCO2dCQUNoQiw4Q0FBZ0IsR0FBaEIsVUFBaUIsTUFBZ0IsRUFBRSxJQUFVO29CQUMzQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDdkMsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN0QixpQkFBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsaUJBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUN2RCxDQUFDO2dCQUNILENBQUM7Z0JBQ0QscUNBQU8sR0FBUCxVQUFRLFFBQWM7b0JBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDaEMsQ0FBQztnQkFDRCx3Q0FBVSxHQUFWLFVBQVcsUUFBYyxJQUFJLHVCQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU1RSwyQ0FBYSxHQUFiLFVBQWMsU0FBbUI7b0JBQWpDLGlCQUVDO29CQURDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBUSxJQUFPLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekYsQ0FBQztnQkF0Qkg7b0JBQUMsZUFBVSxFQUFFOytCQUdFLFdBQU0sQ0FBQyxxQkFBUSxDQUFDOzt1Q0FIbEI7Z0JBdUJiLDBCQUFDO1lBQUQsQ0F0QkEsQUFzQkMsQ0F0QndDLGdCQUFnQixHQXNCeEQ7WUF0QkQscURBc0JDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvcGxhdGZvcm0vZG9tL3NoYXJlZF9zdHlsZXNfaG9zdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RE9NfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9hZGFwdGVyJztcbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge1NldFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICcuL2RvbV90b2tlbnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2hhcmVkU3R5bGVzSG9zdCB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3N0eWxlczogc3RyaW5nW10gPSBbXTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc3R5bGVzU2V0ID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGFkZFN0eWxlcyhzdHlsZXM6IHN0cmluZ1tdKSB7XG4gICAgdmFyIGFkZGl0aW9ucyA9IFtdO1xuICAgIHN0eWxlcy5mb3JFYWNoKHN0eWxlID0+IHtcbiAgICAgIGlmICghU2V0V3JhcHBlci5oYXModGhpcy5fc3R5bGVzU2V0LCBzdHlsZSkpIHtcbiAgICAgICAgdGhpcy5fc3R5bGVzU2V0LmFkZChzdHlsZSk7XG4gICAgICAgIHRoaXMuX3N0eWxlcy5wdXNoKHN0eWxlKTtcbiAgICAgICAgYWRkaXRpb25zLnB1c2goc3R5bGUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMub25TdHlsZXNBZGRlZChhZGRpdGlvbnMpO1xuICB9XG5cbiAgb25TdHlsZXNBZGRlZChhZGRpdGlvbnM6IHN0cmluZ1tdKSB7fVxuXG4gIGdldEFsbFN0eWxlcygpOiBzdHJpbmdbXSB7IHJldHVybiB0aGlzLl9zdHlsZXM7IH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERvbVNoYXJlZFN0eWxlc0hvc3QgZXh0ZW5kcyBTaGFyZWRTdHlsZXNIb3N0IHtcbiAgcHJpdmF0ZSBfaG9zdE5vZGVzID0gbmV3IFNldDxOb2RlPigpO1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBkb2M6IGFueSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5faG9zdE5vZGVzLmFkZChkb2MuaGVhZCk7XG4gIH1cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfYWRkU3R5bGVzVG9Ib3N0KHN0eWxlczogc3RyaW5nW10sIGhvc3Q6IE5vZGUpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHN0eWxlID0gc3R5bGVzW2ldO1xuICAgICAgRE9NLmFwcGVuZENoaWxkKGhvc3QsIERPTS5jcmVhdGVTdHlsZUVsZW1lbnQoc3R5bGUpKTtcbiAgICB9XG4gIH1cbiAgYWRkSG9zdChob3N0Tm9kZTogTm9kZSkge1xuICAgIHRoaXMuX2FkZFN0eWxlc1RvSG9zdCh0aGlzLl9zdHlsZXMsIGhvc3ROb2RlKTtcbiAgICB0aGlzLl9ob3N0Tm9kZXMuYWRkKGhvc3ROb2RlKTtcbiAgfVxuICByZW1vdmVIb3N0KGhvc3ROb2RlOiBOb2RlKSB7IFNldFdyYXBwZXIuZGVsZXRlKHRoaXMuX2hvc3ROb2RlcywgaG9zdE5vZGUpOyB9XG5cbiAgb25TdHlsZXNBZGRlZChhZGRpdGlvbnM6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5faG9zdE5vZGVzLmZvckVhY2goKGhvc3ROb2RlKSA9PiB7IHRoaXMuX2FkZFN0eWxlc1RvSG9zdChhZGRpdGlvbnMsIGhvc3ROb2RlKTsgfSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
