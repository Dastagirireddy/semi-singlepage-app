System.register(['angular2/src/core/di', 'angular2/src/facade/lang', 'angular2/src/facade/collection', 'angular2/src/platform/dom/dom_adapter', 'angular2/src/compiler/html_tags', './element_schema_registry'], function(exports_1, context_1) {
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
    var di_1, lang_1, collection_1, dom_adapter_1, html_tags_1, element_schema_registry_1;
    var NAMESPACE_URIS, DomElementSchemaRegistry;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            },
            function (html_tags_1_1) {
                html_tags_1 = html_tags_1_1;
            },
            function (element_schema_registry_1_1) {
                element_schema_registry_1 = element_schema_registry_1_1;
            }],
        execute: function() {
            NAMESPACE_URIS = lang_1.CONST_EXPR({ 'xlink': 'http://www.w3.org/1999/xlink', 'svg': 'http://www.w3.org/2000/svg' });
            DomElementSchemaRegistry = (function (_super) {
                __extends(DomElementSchemaRegistry, _super);
                function DomElementSchemaRegistry() {
                    _super.apply(this, arguments);
                    this._protoElements = new Map();
                }
                DomElementSchemaRegistry.prototype._getProtoElement = function (tagName) {
                    var element = this._protoElements.get(tagName);
                    if (lang_1.isBlank(element)) {
                        var nsAndName = html_tags_1.splitNsName(tagName);
                        element = lang_1.isPresent(nsAndName[0]) ?
                            dom_adapter_1.DOM.createElementNS(NAMESPACE_URIS[nsAndName[0]], nsAndName[1]) :
                            dom_adapter_1.DOM.createElement(nsAndName[1]);
                        this._protoElements.set(tagName, element);
                    }
                    return element;
                };
                DomElementSchemaRegistry.prototype.hasProperty = function (tagName, propName) {
                    if (tagName.indexOf('-') !== -1) {
                        // can't tell now as we don't know which properties a custom element will get
                        // once it is instantiated
                        return true;
                    }
                    else {
                        var elm = this._getProtoElement(tagName);
                        return dom_adapter_1.DOM.hasProperty(elm, propName);
                    }
                };
                DomElementSchemaRegistry.prototype.getMappedPropName = function (propName) {
                    var mappedPropName = collection_1.StringMapWrapper.get(dom_adapter_1.DOM.attrToPropMap, propName);
                    return lang_1.isPresent(mappedPropName) ? mappedPropName : propName;
                };
                DomElementSchemaRegistry = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], DomElementSchemaRegistry);
                return DomElementSchemaRegistry;
            }(element_schema_registry_1.ElementSchemaRegistry));
            exports_1("DomElementSchemaRegistry", DomElementSchemaRegistry);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL3NjaGVtYS9kb21fZWxlbWVudF9zY2hlbWFfcmVnaXN0cnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBUU0sY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUFkLGNBQWMsR0FDaEIsaUJBQVUsQ0FBQyxFQUFDLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxLQUFLLEVBQUUsNEJBQTRCLEVBQUMsQ0FBQyxDQUFDO1lBRy9GO2dCQUE4Qyw0Q0FBcUI7Z0JBQW5FO29CQUE4Qyw4QkFBcUI7b0JBQ3pELG1CQUFjLEdBQUcsSUFBSSxHQUFHLEVBQW1CLENBQUM7Z0JBNkJ0RCxDQUFDO2dCQTNCUyxtREFBZ0IsR0FBeEIsVUFBeUIsT0FBZTtvQkFDdEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQy9DLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3JCLElBQUksU0FBUyxHQUFHLHVCQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3JDLE9BQU8sR0FBRyxnQkFBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDbkIsaUJBQUcsQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDL0QsaUJBQUcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzlDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDNUMsQ0FBQztvQkFDRCxNQUFNLENBQUMsT0FBTyxDQUFDO2dCQUNqQixDQUFDO2dCQUVELDhDQUFXLEdBQVgsVUFBWSxPQUFlLEVBQUUsUUFBZ0I7b0JBQzNDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNoQyw2RUFBNkU7d0JBQzdFLDBCQUEwQjt3QkFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDZCxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDekMsTUFBTSxDQUFDLGlCQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDeEMsQ0FBQztnQkFDSCxDQUFDO2dCQUVELG9EQUFpQixHQUFqQixVQUFrQixRQUFnQjtvQkFDaEMsSUFBSSxjQUFjLEdBQUcsNkJBQWdCLENBQUMsR0FBRyxDQUFDLGlCQUFHLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUN2RSxNQUFNLENBQUMsZ0JBQVMsQ0FBQyxjQUFjLENBQUMsR0FBRyxjQUFjLEdBQUcsUUFBUSxDQUFDO2dCQUMvRCxDQUFDO2dCQTlCSDtvQkFBQyxlQUFVLEVBQUU7OzRDQUFBO2dCQStCYiwrQkFBQztZQUFELENBOUJBLEFBOEJDLENBOUI2QywrQ0FBcUIsR0E4QmxFO1lBOUJELCtEQThCQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL3NjaGVtYS9kb21fZWxlbWVudF9zY2hlbWFfcmVnaXN0cnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7aXNQcmVzZW50LCBpc0JsYW5rLCBDT05TVF9FWFBSfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtTdHJpbmdNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtET019IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZG9tX2FkYXB0ZXInO1xuaW1wb3J0IHtzcGxpdE5zTmFtZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL2h0bWxfdGFncyc7XG5cbmltcG9ydCB7RWxlbWVudFNjaGVtYVJlZ2lzdHJ5fSBmcm9tICcuL2VsZW1lbnRfc2NoZW1hX3JlZ2lzdHJ5JztcblxuY29uc3QgTkFNRVNQQUNFX1VSSVMgPVxuICAgIENPTlNUX0VYUFIoeyd4bGluayc6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJywgJ3N2Zyc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyd9KTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERvbUVsZW1lbnRTY2hlbWFSZWdpc3RyeSBleHRlbmRzIEVsZW1lbnRTY2hlbWFSZWdpc3RyeSB7XG4gIHByaXZhdGUgX3Byb3RvRWxlbWVudHMgPSBuZXcgTWFwPHN0cmluZywgRWxlbWVudD4oKTtcblxuICBwcml2YXRlIF9nZXRQcm90b0VsZW1lbnQodGFnTmFtZTogc3RyaW5nKTogRWxlbWVudCB7XG4gICAgdmFyIGVsZW1lbnQgPSB0aGlzLl9wcm90b0VsZW1lbnRzLmdldCh0YWdOYW1lKTtcbiAgICBpZiAoaXNCbGFuayhlbGVtZW50KSkge1xuICAgICAgdmFyIG5zQW5kTmFtZSA9IHNwbGl0TnNOYW1lKHRhZ05hbWUpO1xuICAgICAgZWxlbWVudCA9IGlzUHJlc2VudChuc0FuZE5hbWVbMF0pID9cbiAgICAgICAgICAgICAgICAgICAgRE9NLmNyZWF0ZUVsZW1lbnROUyhOQU1FU1BBQ0VfVVJJU1tuc0FuZE5hbWVbMF1dLCBuc0FuZE5hbWVbMV0pIDpcbiAgICAgICAgICAgICAgICAgICAgRE9NLmNyZWF0ZUVsZW1lbnQobnNBbmROYW1lWzFdKTtcbiAgICAgIHRoaXMuX3Byb3RvRWxlbWVudHMuc2V0KHRhZ05hbWUsIGVsZW1lbnQpO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIGhhc1Byb3BlcnR5KHRhZ05hbWU6IHN0cmluZywgcHJvcE5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICh0YWdOYW1lLmluZGV4T2YoJy0nKSAhPT0gLTEpIHtcbiAgICAgIC8vIGNhbid0IHRlbGwgbm93IGFzIHdlIGRvbid0IGtub3cgd2hpY2ggcHJvcGVydGllcyBhIGN1c3RvbSBlbGVtZW50IHdpbGwgZ2V0XG4gICAgICAvLyBvbmNlIGl0IGlzIGluc3RhbnRpYXRlZFxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBlbG0gPSB0aGlzLl9nZXRQcm90b0VsZW1lbnQodGFnTmFtZSk7XG4gICAgICByZXR1cm4gRE9NLmhhc1Byb3BlcnR5KGVsbSwgcHJvcE5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGdldE1hcHBlZFByb3BOYW1lKHByb3BOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHZhciBtYXBwZWRQcm9wTmFtZSA9IFN0cmluZ01hcFdyYXBwZXIuZ2V0KERPTS5hdHRyVG9Qcm9wTWFwLCBwcm9wTmFtZSk7XG4gICAgcmV0dXJuIGlzUHJlc2VudChtYXBwZWRQcm9wTmFtZSkgPyBtYXBwZWRQcm9wTmFtZSA6IHByb3BOYW1lO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
