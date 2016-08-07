System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1;
    var MODULE_REGEXP, SourceModule, SourceExpression, SourceExpressions, SourceWithImports;
    function moduleRef(moduleUrl) {
        return "#MODULE[" + moduleUrl + "]";
    }
    exports_1("moduleRef", moduleRef);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            MODULE_REGEXP = /#MODULE\[([^\]]*)\]/g;
            /**
             * Represents generated source code with module references. Internal to the Angular compiler.
             */
            SourceModule = (function () {
                function SourceModule(moduleUrl, sourceWithModuleRefs) {
                    this.moduleUrl = moduleUrl;
                    this.sourceWithModuleRefs = sourceWithModuleRefs;
                }
                SourceModule.getSourceWithoutImports = function (sourceWithModuleRefs) {
                    return lang_1.StringWrapper.replaceAllMapped(sourceWithModuleRefs, MODULE_REGEXP, function (match) { return ''; });
                };
                SourceModule.prototype.getSourceWithImports = function () {
                    var _this = this;
                    var moduleAliases = {};
                    var imports = [];
                    var newSource = lang_1.StringWrapper.replaceAllMapped(this.sourceWithModuleRefs, MODULE_REGEXP, function (match) {
                        var moduleUrl = match[1];
                        var alias = moduleAliases[moduleUrl];
                        if (lang_1.isBlank(alias)) {
                            if (moduleUrl == _this.moduleUrl) {
                                alias = '';
                            }
                            else {
                                alias = "import" + imports.length;
                                imports.push([moduleUrl, alias]);
                            }
                            moduleAliases[moduleUrl] = alias;
                        }
                        return alias.length > 0 ? alias + "." : '';
                    });
                    return new SourceWithImports(newSource, imports);
                };
                return SourceModule;
            }());
            exports_1("SourceModule", SourceModule);
            SourceExpression = (function () {
                function SourceExpression(declarations, expression) {
                    this.declarations = declarations;
                    this.expression = expression;
                }
                return SourceExpression;
            }());
            exports_1("SourceExpression", SourceExpression);
            SourceExpressions = (function () {
                function SourceExpressions(declarations, expressions) {
                    this.declarations = declarations;
                    this.expressions = expressions;
                }
                return SourceExpressions;
            }());
            exports_1("SourceExpressions", SourceExpressions);
            /**
             * Represents generated source code with imports. Internal to the Angular compiler.
             */
            SourceWithImports = (function () {
                function SourceWithImports(source, imports) {
                    this.source = source;
                    this.imports = imports;
                }
                return SourceWithImports;
            }());
            exports_1("SourceWithImports", SourceWithImports);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL3NvdXJjZV9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQUVJLGFBQWE7SUFFakIsbUJBQTBCLFNBQVM7UUFDakMsTUFBTSxDQUFDLGFBQVcsU0FBUyxNQUFHLENBQUM7SUFDakMsQ0FBQztJQUZELGlDQUVDLENBQUE7Ozs7Ozs7WUFKRyxhQUFhLEdBQUcsc0JBQXNCLENBQUM7WUFNM0M7O2VBRUc7WUFDSDtnQkFLRSxzQkFBbUIsU0FBaUIsRUFBUyxvQkFBNEI7b0JBQXRELGNBQVMsR0FBVCxTQUFTLENBQVE7b0JBQVMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFRO2dCQUFHLENBQUM7Z0JBSnRFLG9DQUF1QixHQUE5QixVQUErQixvQkFBNEI7b0JBQ3pELE1BQU0sQ0FBQyxvQkFBYSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixFQUFFLGFBQWEsRUFBRSxVQUFDLEtBQUssSUFBSyxPQUFBLEVBQUUsRUFBRixDQUFFLENBQUMsQ0FBQztnQkFDNUYsQ0FBQztnQkFJRCwyQ0FBb0IsR0FBcEI7b0JBQUEsaUJBbUJDO29CQWxCQyxJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUM7b0JBQ3ZCLElBQUksT0FBTyxHQUFlLEVBQUUsQ0FBQztvQkFDN0IsSUFBSSxTQUFTLEdBQ1Qsb0JBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsYUFBYSxFQUFFLFVBQUMsS0FBSzt3QkFDN0UsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN6QixJQUFJLEtBQUssR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQ3JDLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ25CLEVBQUUsQ0FBQyxDQUFDLFNBQVMsSUFBSSxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQ0FDaEMsS0FBSyxHQUFHLEVBQUUsQ0FBQzs0QkFDYixDQUFDOzRCQUFDLElBQUksQ0FBQyxDQUFDO2dDQUNOLEtBQUssR0FBRyxXQUFTLE9BQU8sQ0FBQyxNQUFRLENBQUM7Z0NBQ2xDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQzs0QkFDbkMsQ0FBQzs0QkFDRCxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsS0FBSyxDQUFDO3dCQUNuQyxDQUFDO3dCQUNELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBTSxLQUFLLE1BQUcsR0FBRyxFQUFFLENBQUM7b0JBQzdDLENBQUMsQ0FBQyxDQUFDO29CQUNQLE1BQU0sQ0FBQyxJQUFJLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDbkQsQ0FBQztnQkFDSCxtQkFBQztZQUFELENBM0JBLEFBMkJDLElBQUE7WUEzQkQsdUNBMkJDLENBQUE7WUFFRDtnQkFDRSwwQkFBbUIsWUFBc0IsRUFBUyxVQUFrQjtvQkFBakQsaUJBQVksR0FBWixZQUFZLENBQVU7b0JBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBUTtnQkFBRyxDQUFDO2dCQUMxRSx1QkFBQztZQUFELENBRkEsQUFFQyxJQUFBO1lBRkQsK0NBRUMsQ0FBQTtZQUVEO2dCQUNFLDJCQUFtQixZQUFzQixFQUFTLFdBQXFCO29CQUFwRCxpQkFBWSxHQUFaLFlBQVksQ0FBVTtvQkFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBVTtnQkFBRyxDQUFDO2dCQUM3RSx3QkFBQztZQUFELENBRkEsQUFFQyxJQUFBO1lBRkQsaURBRUMsQ0FBQTtZQUVEOztlQUVHO1lBQ0g7Z0JBQ0UsMkJBQW1CLE1BQWMsRUFBUyxPQUFtQjtvQkFBMUMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtvQkFBUyxZQUFPLEdBQVAsT0FBTyxDQUFZO2dCQUFHLENBQUM7Z0JBQ25FLHdCQUFDO1lBQUQsQ0FGQSxBQUVDLElBQUE7WUFGRCxpREFFQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL3NvdXJjZV9tb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N0cmluZ1dyYXBwZXIsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbnZhciBNT0RVTEVfUkVHRVhQID0gLyNNT0RVTEVcXFsoW15cXF1dKilcXF0vZztcblxuZXhwb3J0IGZ1bmN0aW9uIG1vZHVsZVJlZihtb2R1bGVVcmwpOiBzdHJpbmcge1xuICByZXR1cm4gYCNNT0RVTEVbJHttb2R1bGVVcmx9XWA7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBnZW5lcmF0ZWQgc291cmNlIGNvZGUgd2l0aCBtb2R1bGUgcmVmZXJlbmNlcy4gSW50ZXJuYWwgdG8gdGhlIEFuZ3VsYXIgY29tcGlsZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBTb3VyY2VNb2R1bGUge1xuICBzdGF0aWMgZ2V0U291cmNlV2l0aG91dEltcG9ydHMoc291cmNlV2l0aE1vZHVsZVJlZnM6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbE1hcHBlZChzb3VyY2VXaXRoTW9kdWxlUmVmcywgTU9EVUxFX1JFR0VYUCwgKG1hdGNoKSA9PiAnJyk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbW9kdWxlVXJsOiBzdHJpbmcsIHB1YmxpYyBzb3VyY2VXaXRoTW9kdWxlUmVmczogc3RyaW5nKSB7fVxuXG4gIGdldFNvdXJjZVdpdGhJbXBvcnRzKCk6IFNvdXJjZVdpdGhJbXBvcnRzIHtcbiAgICB2YXIgbW9kdWxlQWxpYXNlcyA9IHt9O1xuICAgIHZhciBpbXBvcnRzOiBzdHJpbmdbXVtdID0gW107XG4gICAgdmFyIG5ld1NvdXJjZSA9XG4gICAgICAgIFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbE1hcHBlZCh0aGlzLnNvdXJjZVdpdGhNb2R1bGVSZWZzLCBNT0RVTEVfUkVHRVhQLCAobWF0Y2gpID0+IHtcbiAgICAgICAgICB2YXIgbW9kdWxlVXJsID0gbWF0Y2hbMV07XG4gICAgICAgICAgdmFyIGFsaWFzID0gbW9kdWxlQWxpYXNlc1ttb2R1bGVVcmxdO1xuICAgICAgICAgIGlmIChpc0JsYW5rKGFsaWFzKSkge1xuICAgICAgICAgICAgaWYgKG1vZHVsZVVybCA9PSB0aGlzLm1vZHVsZVVybCkge1xuICAgICAgICAgICAgICBhbGlhcyA9ICcnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYWxpYXMgPSBgaW1wb3J0JHtpbXBvcnRzLmxlbmd0aH1gO1xuICAgICAgICAgICAgICBpbXBvcnRzLnB1c2goW21vZHVsZVVybCwgYWxpYXNdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1vZHVsZUFsaWFzZXNbbW9kdWxlVXJsXSA9IGFsaWFzO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gYWxpYXMubGVuZ3RoID4gMCA/IGAke2FsaWFzfS5gIDogJyc7XG4gICAgICAgIH0pO1xuICAgIHJldHVybiBuZXcgU291cmNlV2l0aEltcG9ydHMobmV3U291cmNlLCBpbXBvcnRzKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgU291cmNlRXhwcmVzc2lvbiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkZWNsYXJhdGlvbnM6IHN0cmluZ1tdLCBwdWJsaWMgZXhwcmVzc2lvbjogc3RyaW5nKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgU291cmNlRXhwcmVzc2lvbnMge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGVjbGFyYXRpb25zOiBzdHJpbmdbXSwgcHVibGljIGV4cHJlc3Npb25zOiBzdHJpbmdbXSkge31cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGdlbmVyYXRlZCBzb3VyY2UgY29kZSB3aXRoIGltcG9ydHMuIEludGVybmFsIHRvIHRoZSBBbmd1bGFyIGNvbXBpbGVyLlxuICovXG5leHBvcnQgY2xhc3MgU291cmNlV2l0aEltcG9ydHMge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgc291cmNlOiBzdHJpbmcsIHB1YmxpYyBpbXBvcnRzOiBzdHJpbmdbXVtdKSB7fVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
