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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9zY2hlbWEvZG9tX2VsZW1lbnRfc2NoZW1hX3JlZ2lzdHJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQVFNLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFBZCxjQUFjLEdBQ2hCLGlCQUFVLENBQUMsRUFBQyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsS0FBSyxFQUFFLDRCQUE0QixFQUFDLENBQUMsQ0FBQztZQUcvRjtnQkFBOEMsNENBQXFCO2dCQUFuRTtvQkFBOEMsOEJBQXFCO29CQUN6RCxtQkFBYyxHQUFHLElBQUksR0FBRyxFQUFtQixDQUFDO2dCQTZCdEQsQ0FBQztnQkEzQlMsbURBQWdCLEdBQXhCLFVBQXlCLE9BQWU7b0JBQ3RDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUMvQyxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNyQixJQUFJLFNBQVMsR0FBRyx1QkFBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUNyQyxPQUFPLEdBQUcsZ0JBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ25CLGlCQUFHLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQy9ELGlCQUFHLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM5QyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQzVDLENBQUM7b0JBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsQ0FBQztnQkFFRCw4Q0FBVyxHQUFYLFVBQVksT0FBZSxFQUFFLFFBQWdCO29CQUMzQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDaEMsNkVBQTZFO3dCQUM3RSwwQkFBMEI7d0JBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ2QsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3pDLE1BQU0sQ0FBQyxpQkFBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ3hDLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCxvREFBaUIsR0FBakIsVUFBa0IsUUFBZ0I7b0JBQ2hDLElBQUksY0FBYyxHQUFHLDZCQUFnQixDQUFDLEdBQUcsQ0FBQyxpQkFBRyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDdkUsTUFBTSxDQUFDLGdCQUFTLENBQUMsY0FBYyxDQUFDLEdBQUcsY0FBYyxHQUFHLFFBQVEsQ0FBQztnQkFDL0QsQ0FBQztnQkE5Qkg7b0JBQUMsZUFBVSxFQUFFOzs0Q0FBQTtnQkErQmIsK0JBQUM7WUFBRCxDQTlCQSxBQThCQyxDQTlCNkMsK0NBQXFCLEdBOEJsRTtZQTlCRCwrREE4QkMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tcGlsZXIvc2NoZW1hL2RvbV9lbGVtZW50X3NjaGVtYV9yZWdpc3RyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtpc1ByZXNlbnQsIGlzQmxhbmssIENPTlNUX0VYUFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge1N0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge0RPTX0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fYWRhcHRlcic7XG5pbXBvcnQge3NwbGl0TnNOYW1lfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvaHRtbF90YWdzJztcblxuaW1wb3J0IHtFbGVtZW50U2NoZW1hUmVnaXN0cnl9IGZyb20gJy4vZWxlbWVudF9zY2hlbWFfcmVnaXN0cnknO1xuXG5jb25zdCBOQU1FU1BBQ0VfVVJJUyA9XG4gICAgQ09OU1RfRVhQUih7J3hsaW5rJzogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnLCAnc3ZnJzogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJ30pO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRG9tRWxlbWVudFNjaGVtYVJlZ2lzdHJ5IGV4dGVuZHMgRWxlbWVudFNjaGVtYVJlZ2lzdHJ5IHtcbiAgcHJpdmF0ZSBfcHJvdG9FbGVtZW50cyA9IG5ldyBNYXA8c3RyaW5nLCBFbGVtZW50PigpO1xuXG4gIHByaXZhdGUgX2dldFByb3RvRWxlbWVudCh0YWdOYW1lOiBzdHJpbmcpOiBFbGVtZW50IHtcbiAgICB2YXIgZWxlbWVudCA9IHRoaXMuX3Byb3RvRWxlbWVudHMuZ2V0KHRhZ05hbWUpO1xuICAgIGlmIChpc0JsYW5rKGVsZW1lbnQpKSB7XG4gICAgICB2YXIgbnNBbmROYW1lID0gc3BsaXROc05hbWUodGFnTmFtZSk7XG4gICAgICBlbGVtZW50ID0gaXNQcmVzZW50KG5zQW5kTmFtZVswXSkgP1xuICAgICAgICAgICAgICAgICAgICBET00uY3JlYXRlRWxlbWVudE5TKE5BTUVTUEFDRV9VUklTW25zQW5kTmFtZVswXV0sIG5zQW5kTmFtZVsxXSkgOlxuICAgICAgICAgICAgICAgICAgICBET00uY3JlYXRlRWxlbWVudChuc0FuZE5hbWVbMV0pO1xuICAgICAgdGhpcy5fcHJvdG9FbGVtZW50cy5zZXQodGFnTmFtZSwgZWxlbWVudCk7XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgaGFzUHJvcGVydHkodGFnTmFtZTogc3RyaW5nLCBwcm9wTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKHRhZ05hbWUuaW5kZXhPZignLScpICE9PSAtMSkge1xuICAgICAgLy8gY2FuJ3QgdGVsbCBub3cgYXMgd2UgZG9uJ3Qga25vdyB3aGljaCBwcm9wZXJ0aWVzIGEgY3VzdG9tIGVsZW1lbnQgd2lsbCBnZXRcbiAgICAgIC8vIG9uY2UgaXQgaXMgaW5zdGFudGlhdGVkXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGVsbSA9IHRoaXMuX2dldFByb3RvRWxlbWVudCh0YWdOYW1lKTtcbiAgICAgIHJldHVybiBET00uaGFzUHJvcGVydHkoZWxtLCBwcm9wTmFtZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0TWFwcGVkUHJvcE5hbWUocHJvcE5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgdmFyIG1hcHBlZFByb3BOYW1lID0gU3RyaW5nTWFwV3JhcHBlci5nZXQoRE9NLmF0dHJUb1Byb3BNYXAsIHByb3BOYW1lKTtcbiAgICByZXR1cm4gaXNQcmVzZW50KG1hcHBlZFByb3BOYW1lKSA/IG1hcHBlZFByb3BOYW1lIDogcHJvcE5hbWU7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
