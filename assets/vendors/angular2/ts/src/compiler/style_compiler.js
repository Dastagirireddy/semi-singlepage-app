System.register(['./compile_metadata', './output/output_ast', 'angular2/src/core/metadata/view', 'angular2/src/compiler/shadow_css', 'angular2/src/compiler/url_resolver', './style_url_resolver', 'angular2/src/core/di', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var compile_metadata_1, o, view_1, shadow_css_1, url_resolver_1, style_url_resolver_1, di_1, lang_1;
    var COMPONENT_VARIABLE, HOST_ATTR, CONTENT_ATTR, StylesCompileDependency, StylesCompileResult, StyleCompiler;
    function getStylesVarName(component) {
        var result = "styles";
        if (lang_1.isPresent(component)) {
            result += "_" + component.type.name;
        }
        return result;
    }
    return {
        setters:[
            function (compile_metadata_1_1) {
                compile_metadata_1 = compile_metadata_1_1;
            },
            function (o_1) {
                o = o_1;
            },
            function (view_1_1) {
                view_1 = view_1_1;
            },
            function (shadow_css_1_1) {
                shadow_css_1 = shadow_css_1_1;
            },
            function (url_resolver_1_1) {
                url_resolver_1 = url_resolver_1_1;
            },
            function (style_url_resolver_1_1) {
                style_url_resolver_1 = style_url_resolver_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            COMPONENT_VARIABLE = '%COMP%';
            HOST_ATTR = "_nghost-" + COMPONENT_VARIABLE;
            CONTENT_ATTR = "_ngcontent-" + COMPONENT_VARIABLE;
            StylesCompileDependency = (function () {
                function StylesCompileDependency(sourceUrl, isShimmed, valuePlaceholder) {
                    this.sourceUrl = sourceUrl;
                    this.isShimmed = isShimmed;
                    this.valuePlaceholder = valuePlaceholder;
                }
                return StylesCompileDependency;
            }());
            exports_1("StylesCompileDependency", StylesCompileDependency);
            StylesCompileResult = (function () {
                function StylesCompileResult(statements, stylesVar, dependencies) {
                    this.statements = statements;
                    this.stylesVar = stylesVar;
                    this.dependencies = dependencies;
                }
                return StylesCompileResult;
            }());
            exports_1("StylesCompileResult", StylesCompileResult);
            StyleCompiler = (function () {
                function StyleCompiler(_urlResolver) {
                    this._urlResolver = _urlResolver;
                    this._shadowCss = new shadow_css_1.ShadowCss();
                }
                StyleCompiler.prototype.compileComponent = function (comp) {
                    var shim = comp.template.encapsulation === view_1.ViewEncapsulation.Emulated;
                    return this._compileStyles(getStylesVarName(comp), comp.template.styles, comp.template.styleUrls, shim);
                };
                StyleCompiler.prototype.compileStylesheet = function (stylesheetUrl, cssText, isShimmed) {
                    var styleWithImports = style_url_resolver_1.extractStyleUrls(this._urlResolver, stylesheetUrl, cssText);
                    return this._compileStyles(getStylesVarName(null), [styleWithImports.style], styleWithImports.styleUrls, isShimmed);
                };
                StyleCompiler.prototype._compileStyles = function (stylesVar, plainStyles, absUrls, shim) {
                    var _this = this;
                    var styleExpressions = plainStyles.map(function (plainStyle) { return o.literal(_this._shimIfNeeded(plainStyle, shim)); });
                    var dependencies = [];
                    for (var i = 0; i < absUrls.length; i++) {
                        var identifier = new compile_metadata_1.CompileIdentifierMetadata({ name: getStylesVarName(null) });
                        dependencies.push(new StylesCompileDependency(absUrls[i], shim, identifier));
                        styleExpressions.push(new o.ExternalExpr(identifier));
                    }
                    // styles variable contains plain strings and arrays of other styles arrays (recursive),
                    // so we set its type to dynamic.
                    var stmt = o.variable(stylesVar)
                        .set(o.literalArr(styleExpressions, new o.ArrayType(o.DYNAMIC_TYPE, [o.TypeModifier.Const])))
                        .toDeclStmt(null, [o.StmtModifier.Final]);
                    return new StylesCompileResult([stmt], stylesVar, dependencies);
                };
                StyleCompiler.prototype._shimIfNeeded = function (style, shim) {
                    return shim ? this._shadowCss.shimCssText(style, CONTENT_ATTR, HOST_ATTR) : style;
                };
                StyleCompiler = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [url_resolver_1.UrlResolver])
                ], StyleCompiler);
                return StyleCompiler;
            }());
            exports_1("StyleCompiler", StyleCompiler);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9zdHlsZV9jb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBYU0sa0JBQWtCLEVBQ2xCLFNBQVMsRUFDVCxZQUFZO0lBdURsQiwwQkFBMEIsU0FBbUM7UUFDM0QsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDO1FBQ3RCLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sSUFBSSxNQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBTSxDQUFDO1FBQ3RDLENBQUM7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2hCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUEvREssa0JBQWtCLEdBQUcsUUFBUSxDQUFDO1lBQzlCLFNBQVMsR0FBRyxhQUFXLGtCQUFvQixDQUFDO1lBQzVDLFlBQVksR0FBRyxnQkFBYyxrQkFBb0IsQ0FBQztZQUV4RDtnQkFDRSxpQ0FBbUIsU0FBaUIsRUFBUyxTQUFrQixFQUM1QyxnQkFBMkM7b0JBRDNDLGNBQVMsR0FBVCxTQUFTLENBQVE7b0JBQVMsY0FBUyxHQUFULFNBQVMsQ0FBUztvQkFDNUMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUEyQjtnQkFBRyxDQUFDO2dCQUNwRSw4QkFBQztZQUFELENBSEEsQUFHQyxJQUFBO1lBSEQsNkRBR0MsQ0FBQTtZQUVEO2dCQUNFLDZCQUFtQixVQUF5QixFQUFTLFNBQWlCLEVBQ25ELFlBQXVDO29CQUR2QyxlQUFVLEdBQVYsVUFBVSxDQUFlO29CQUFTLGNBQVMsR0FBVCxTQUFTLENBQVE7b0JBQ25ELGlCQUFZLEdBQVosWUFBWSxDQUEyQjtnQkFBRyxDQUFDO2dCQUNoRSwwQkFBQztZQUFELENBSEEsQUFHQyxJQUFBO1lBSEQscURBR0MsQ0FBQTtZQUdEO2dCQUdFLHVCQUFvQixZQUF5QjtvQkFBekIsaUJB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OztpQ0FBQTtnQkF5Q2Isb0JBQUM7WUFBRCxDQXhDQSxBQXdDQyxJQUFBO1lBeENELHlDQXdDQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9zdHlsZV9jb21waWxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBpbGVUZW1wbGF0ZU1ldGFkYXRhLFxuICBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhLFxuICBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGFcbn0gZnJvbSAnLi9jb21waWxlX21ldGFkYXRhJztcbmltcG9ydCAqIGFzIG8gZnJvbSAnLi9vdXRwdXQvb3V0cHV0X2FzdCc7XG5pbXBvcnQge1ZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9tZXRhZGF0YS92aWV3JztcbmltcG9ydCB7U2hhZG93Q3NzfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvc2hhZG93X2Nzcyc7XG5pbXBvcnQge1VybFJlc29sdmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvdXJsX3Jlc29sdmVyJztcbmltcG9ydCB7ZXh0cmFjdFN0eWxlVXJsc30gZnJvbSAnLi9zdHlsZV91cmxfcmVzb2x2ZXInO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge2lzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuY29uc3QgQ09NUE9ORU5UX1ZBUklBQkxFID0gJyVDT01QJSc7XG5jb25zdCBIT1NUX0FUVFIgPSBgX25naG9zdC0ke0NPTVBPTkVOVF9WQVJJQUJMRX1gO1xuY29uc3QgQ09OVEVOVF9BVFRSID0gYF9uZ2NvbnRlbnQtJHtDT01QT05FTlRfVkFSSUFCTEV9YDtcblxuZXhwb3J0IGNsYXNzIFN0eWxlc0NvbXBpbGVEZXBlbmRlbmN5IHtcbiAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZVVybDogc3RyaW5nLCBwdWJsaWMgaXNTaGltbWVkOiBib29sZWFuLFxuICAgICAgICAgICAgICBwdWJsaWMgdmFsdWVQbGFjZWhvbGRlcjogQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSkge31cbn1cblxuZXhwb3J0IGNsYXNzIFN0eWxlc0NvbXBpbGVSZXN1bHQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgc3RhdGVtZW50czogby5TdGF0ZW1lbnRbXSwgcHVibGljIHN0eWxlc1Zhcjogc3RyaW5nLFxuICAgICAgICAgICAgICBwdWJsaWMgZGVwZW5kZW5jaWVzOiBTdHlsZXNDb21waWxlRGVwZW5kZW5jeVtdKSB7fVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3R5bGVDb21waWxlciB7XG4gIHByaXZhdGUgX3NoYWRvd0NzczogU2hhZG93Q3NzID0gbmV3IFNoYWRvd0NzcygpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3VybFJlc29sdmVyOiBVcmxSZXNvbHZlcikge31cblxuICBjb21waWxlQ29tcG9uZW50KGNvbXA6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSk6IFN0eWxlc0NvbXBpbGVSZXN1bHQge1xuICAgIHZhciBzaGltID0gY29tcC50ZW1wbGF0ZS5lbmNhcHN1bGF0aW9uID09PSBWaWV3RW5jYXBzdWxhdGlvbi5FbXVsYXRlZDtcbiAgICByZXR1cm4gdGhpcy5fY29tcGlsZVN0eWxlcyhnZXRTdHlsZXNWYXJOYW1lKGNvbXApLCBjb21wLnRlbXBsYXRlLnN0eWxlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wLnRlbXBsYXRlLnN0eWxlVXJscywgc2hpbSk7XG4gIH1cblxuICBjb21waWxlU3R5bGVzaGVldChzdHlsZXNoZWV0VXJsOiBzdHJpbmcsIGNzc1RleHQ6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgaXNTaGltbWVkOiBib29sZWFuKTogU3R5bGVzQ29tcGlsZVJlc3VsdCB7XG4gICAgdmFyIHN0eWxlV2l0aEltcG9ydHMgPSBleHRyYWN0U3R5bGVVcmxzKHRoaXMuX3VybFJlc29sdmVyLCBzdHlsZXNoZWV0VXJsLCBjc3NUZXh0KTtcbiAgICByZXR1cm4gdGhpcy5fY29tcGlsZVN0eWxlcyhnZXRTdHlsZXNWYXJOYW1lKG51bGwpLCBbc3R5bGVXaXRoSW1wb3J0cy5zdHlsZV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVXaXRoSW1wb3J0cy5zdHlsZVVybHMsIGlzU2hpbW1lZCk7XG4gIH1cblxuICBwcml2YXRlIF9jb21waWxlU3R5bGVzKHN0eWxlc1Zhcjogc3RyaW5nLCBwbGFpblN0eWxlczogc3RyaW5nW10sIGFic1VybHM6IHN0cmluZ1tdLFxuICAgICAgICAgICAgICAgICAgICAgICAgIHNoaW06IGJvb2xlYW4pOiBTdHlsZXNDb21waWxlUmVzdWx0IHtcbiAgICB2YXIgc3R5bGVFeHByZXNzaW9ucyA9XG4gICAgICAgIHBsYWluU3R5bGVzLm1hcChwbGFpblN0eWxlID0+IG8ubGl0ZXJhbCh0aGlzLl9zaGltSWZOZWVkZWQocGxhaW5TdHlsZSwgc2hpbSkpKTtcbiAgICB2YXIgZGVwZW5kZW5jaWVzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhYnNVcmxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKHtuYW1lOiBnZXRTdHlsZXNWYXJOYW1lKG51bGwpfSk7XG4gICAgICBkZXBlbmRlbmNpZXMucHVzaChuZXcgU3R5bGVzQ29tcGlsZURlcGVuZGVuY3koYWJzVXJsc1tpXSwgc2hpbSwgaWRlbnRpZmllcikpO1xuICAgICAgc3R5bGVFeHByZXNzaW9ucy5wdXNoKG5ldyBvLkV4dGVybmFsRXhwcihpZGVudGlmaWVyKSk7XG4gICAgfVxuICAgIC8vIHN0eWxlcyB2YXJpYWJsZSBjb250YWlucyBwbGFpbiBzdHJpbmdzIGFuZCBhcnJheXMgb2Ygb3RoZXIgc3R5bGVzIGFycmF5cyAocmVjdXJzaXZlKSxcbiAgICAvLyBzbyB3ZSBzZXQgaXRzIHR5cGUgdG8gZHluYW1pYy5cbiAgICB2YXIgc3RtdCA9IG8udmFyaWFibGUoc3R5bGVzVmFyKVxuICAgICAgICAgICAgICAgICAgIC5zZXQoby5saXRlcmFsQXJyKHN0eWxlRXhwcmVzc2lvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IG8uQXJyYXlUeXBlKG8uRFlOQU1JQ19UWVBFLCBbby5UeXBlTW9kaWZpZXIuQ29uc3RdKSkpXG4gICAgICAgICAgICAgICAgICAgLnRvRGVjbFN0bXQobnVsbCwgW28uU3RtdE1vZGlmaWVyLkZpbmFsXSk7XG4gICAgcmV0dXJuIG5ldyBTdHlsZXNDb21waWxlUmVzdWx0KFtzdG10XSwgc3R5bGVzVmFyLCBkZXBlbmRlbmNpZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2hpbUlmTmVlZGVkKHN0eWxlOiBzdHJpbmcsIHNoaW06IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgIHJldHVybiBzaGltID8gdGhpcy5fc2hhZG93Q3NzLnNoaW1Dc3NUZXh0KHN0eWxlLCBDT05URU5UX0FUVFIsIEhPU1RfQVRUUikgOiBzdHlsZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRTdHlsZXNWYXJOYW1lKGNvbXBvbmVudDogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhKTogc3RyaW5nIHtcbiAgdmFyIHJlc3VsdCA9IGBzdHlsZXNgO1xuICBpZiAoaXNQcmVzZW50KGNvbXBvbmVudCkpIHtcbiAgICByZXN1bHQgKz0gYF8ke2NvbXBvbmVudC50eXBlLm5hbWV9YDtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
