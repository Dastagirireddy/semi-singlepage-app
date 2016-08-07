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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9kb20vc2hhcmVkX3N0eWxlc19ob3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFNQTtnQkFNRTtvQkFMQSxnQkFBZ0I7b0JBQ2hCLFlBQU8sR0FBYSxFQUFFLENBQUM7b0JBQ3ZCLGdCQUFnQjtvQkFDaEIsZUFBVSxHQUFHLElBQUksR0FBRyxFQUFVLENBQUM7Z0JBRWhCLENBQUM7Z0JBRWhCLG9DQUFTLEdBQVQsVUFBVSxNQUFnQjtvQkFBMUIsaUJBVUM7b0JBVEMsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO29CQUNuQixNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSzt3QkFDbEIsRUFBRSxDQUFDLENBQUMsQ0FBQyx1QkFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDNUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQzNCLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUN6QixTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUN4QixDQUFDO29CQUNILENBQUMsQ0FBQyxDQUFDO29CQUNILElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2hDLENBQUM7Z0JBRUQsd0NBQWEsR0FBYixVQUFjLFNBQW1CLElBQUcsQ0FBQztnQkFFckMsdUNBQVksR0FBWixjQUEyQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBdkJuRDtvQkFBQyxlQUFVLEVBQUU7O29DQUFBO2dCQXdCYix1QkFBQztZQUFELENBdkJBLEFBdUJDLElBQUE7WUF2QkQsK0NBdUJDLENBQUE7WUFHRDtnQkFBeUMsdUNBQWdCO2dCQUV2RCw2QkFBOEIsR0FBUTtvQkFDcEMsaUJBQU8sQ0FBQztvQkFGRixlQUFVLEdBQUcsSUFBSSxHQUFHLEVBQVEsQ0FBQztvQkFHbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNoQyxDQUFDO2dCQUNELGdCQUFnQjtnQkFDaEIsOENBQWdCLEdBQWhCLFVBQWlCLE1BQWdCLEVBQUUsSUFBVTtvQkFDM0MsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQ3ZDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdEIsaUJBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLGlCQUFHLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDdkQsQ0FBQztnQkFDSCxDQUFDO2dCQUNELHFDQUFPLEdBQVAsVUFBUSxRQUFjO29CQUNwQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2hDLENBQUM7Z0JBQ0Qsd0NBQVUsR0FBVixVQUFXLFFBQWMsSUFBSSx1QkFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFNUUsMkNBQWEsR0FBYixVQUFjLFNBQW1CO29CQUFqQyxpQkFFQztvQkFEQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLFFBQVEsSUFBTyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pGLENBQUM7Z0JBdEJIO29CQUFDLGVBQVUsRUFBRTsrQkFHRSxXQUFNLENBQUMscUJBQVEsQ0FBQzs7dUNBSGxCO2dCQXVCYiwwQkFBQztZQUFELENBdEJBLEFBc0JDLENBdEJ3QyxnQkFBZ0IsR0FzQnhEO1lBdEJELHFEQXNCQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9kb20vc2hhcmVkX3N0eWxlc19ob3N0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtET019IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZG9tX2FkYXB0ZXInO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7U2V0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJy4vZG9tX3Rva2Vucyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTaGFyZWRTdHlsZXNIb3N0IHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc3R5bGVzOiBzdHJpbmdbXSA9IFtdO1xuICAvKiogQGludGVybmFsICovXG4gIF9zdHlsZXNTZXQgPSBuZXcgU2V0PHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgYWRkU3R5bGVzKHN0eWxlczogc3RyaW5nW10pIHtcbiAgICB2YXIgYWRkaXRpb25zID0gW107XG4gICAgc3R5bGVzLmZvckVhY2goc3R5bGUgPT4ge1xuICAgICAgaWYgKCFTZXRXcmFwcGVyLmhhcyh0aGlzLl9zdHlsZXNTZXQsIHN0eWxlKSkge1xuICAgICAgICB0aGlzLl9zdHlsZXNTZXQuYWRkKHN0eWxlKTtcbiAgICAgICAgdGhpcy5fc3R5bGVzLnB1c2goc3R5bGUpO1xuICAgICAgICBhZGRpdGlvbnMucHVzaChzdHlsZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5vblN0eWxlc0FkZGVkKGFkZGl0aW9ucyk7XG4gIH1cblxuICBvblN0eWxlc0FkZGVkKGFkZGl0aW9uczogc3RyaW5nW10pIHt9XG5cbiAgZ2V0QWxsU3R5bGVzKCk6IHN0cmluZ1tdIHsgcmV0dXJuIHRoaXMuX3N0eWxlczsgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRG9tU2hhcmVkU3R5bGVzSG9zdCBleHRlbmRzIFNoYXJlZFN0eWxlc0hvc3Qge1xuICBwcml2YXRlIF9ob3N0Tm9kZXMgPSBuZXcgU2V0PE5vZGU+KCk7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIGRvYzogYW55KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9ob3N0Tm9kZXMuYWRkKGRvYy5oZWFkKTtcbiAgfVxuICAvKiogQGludGVybmFsICovXG4gIF9hZGRTdHlsZXNUb0hvc3Qoc3R5bGVzOiBzdHJpbmdbXSwgaG9zdDogTm9kZSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc3R5bGUgPSBzdHlsZXNbaV07XG4gICAgICBET00uYXBwZW5kQ2hpbGQoaG9zdCwgRE9NLmNyZWF0ZVN0eWxlRWxlbWVudChzdHlsZSkpO1xuICAgIH1cbiAgfVxuICBhZGRIb3N0KGhvc3ROb2RlOiBOb2RlKSB7XG4gICAgdGhpcy5fYWRkU3R5bGVzVG9Ib3N0KHRoaXMuX3N0eWxlcywgaG9zdE5vZGUpO1xuICAgIHRoaXMuX2hvc3ROb2Rlcy5hZGQoaG9zdE5vZGUpO1xuICB9XG4gIHJlbW92ZUhvc3QoaG9zdE5vZGU6IE5vZGUpIHsgU2V0V3JhcHBlci5kZWxldGUodGhpcy5faG9zdE5vZGVzLCBob3N0Tm9kZSk7IH1cblxuICBvblN0eWxlc0FkZGVkKGFkZGl0aW9uczogc3RyaW5nW10pIHtcbiAgICB0aGlzLl9ob3N0Tm9kZXMuZm9yRWFjaCgoaG9zdE5vZGUpID0+IHsgdGhpcy5fYWRkU3R5bGVzVG9Ib3N0KGFkZGl0aW9ucywgaG9zdE5vZGUpOyB9KTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
