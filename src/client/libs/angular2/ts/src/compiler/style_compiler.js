System.register(['./source_module', 'angular2/src/core/metadata/view', 'angular2/src/compiler/xhr', 'angular2/src/facade/lang', 'angular2/src/facade/async', 'angular2/src/compiler/shadow_css', 'angular2/src/compiler/url_resolver', './style_url_resolver', './util', 'angular2/src/core/di'], function(exports_1, context_1) {
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
    var source_module_1, view_1, xhr_1, lang_1, async_1, shadow_css_1, url_resolver_1, style_url_resolver_1, util_1, di_1;
    var COMPONENT_VARIABLE, HOST_ATTR, CONTENT_ATTR, StyleCompiler;
    return {
        setters:[
            function (source_module_1_1) {
                source_module_1 = source_module_1_1;
            },
            function (view_1_1) {
                view_1 = view_1_1;
            },
            function (xhr_1_1) {
                xhr_1 = xhr_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
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
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            }],
        execute: function() {
            COMPONENT_VARIABLE = '%COMP%';
            HOST_ATTR = "_nghost-" + COMPONENT_VARIABLE;
            CONTENT_ATTR = "_ngcontent-" + COMPONENT_VARIABLE;
            StyleCompiler = (function () {
                function StyleCompiler(_xhr, _urlResolver) {
                    this._xhr = _xhr;
                    this._urlResolver = _urlResolver;
                    this._styleCache = new Map();
                    this._shadowCss = new shadow_css_1.ShadowCss();
                }
                StyleCompiler.prototype.compileComponentRuntime = function (template) {
                    var styles = template.styles;
                    var styleAbsUrls = template.styleUrls;
                    return this._loadStyles(styles, styleAbsUrls, template.encapsulation === view_1.ViewEncapsulation.Emulated);
                };
                StyleCompiler.prototype.compileComponentCodeGen = function (template) {
                    var shim = template.encapsulation === view_1.ViewEncapsulation.Emulated;
                    return this._styleCodeGen(template.styles, template.styleUrls, shim);
                };
                StyleCompiler.prototype.compileStylesheetCodeGen = function (stylesheetUrl, cssText) {
                    var styleWithImports = style_url_resolver_1.extractStyleUrls(this._urlResolver, stylesheetUrl, cssText);
                    return [
                        this._styleModule(stylesheetUrl, false, this._styleCodeGen([styleWithImports.style], styleWithImports.styleUrls, false)),
                        this._styleModule(stylesheetUrl, true, this._styleCodeGen([styleWithImports.style], styleWithImports.styleUrls, true))
                    ];
                };
                StyleCompiler.prototype.clearCache = function () { this._styleCache.clear(); };
                StyleCompiler.prototype._loadStyles = function (plainStyles, absUrls, encapsulate) {
                    var _this = this;
                    var promises = absUrls.map(function (absUrl) {
                        var cacheKey = "" + absUrl + (encapsulate ? '.shim' : '');
                        var result = _this._styleCache.get(cacheKey);
                        if (lang_1.isBlank(result)) {
                            result = _this._xhr.get(absUrl).then(function (style) {
                                var styleWithImports = style_url_resolver_1.extractStyleUrls(_this._urlResolver, absUrl, style);
                                return _this._loadStyles([styleWithImports.style], styleWithImports.styleUrls, encapsulate);
                            });
                            _this._styleCache.set(cacheKey, result);
                        }
                        return result;
                    });
                    return async_1.PromiseWrapper.all(promises).then(function (nestedStyles) {
                        var result = plainStyles.map(function (plainStyle) { return _this._shimIfNeeded(plainStyle, encapsulate); });
                        nestedStyles.forEach(function (styles) { return result.push(styles); });
                        return result;
                    });
                };
                StyleCompiler.prototype._styleCodeGen = function (plainStyles, absUrls, shim) {
                    var _this = this;
                    var arrayPrefix = lang_1.IS_DART ? "const" : '';
                    var styleExpressions = plainStyles.map(function (plainStyle) { return util_1.escapeSingleQuoteString(_this._shimIfNeeded(plainStyle, shim)); });
                    for (var i = 0; i < absUrls.length; i++) {
                        var moduleUrl = this._createModuleUrl(absUrls[i], shim);
                        styleExpressions.push(source_module_1.moduleRef(moduleUrl) + "STYLES");
                    }
                    var expressionSource = arrayPrefix + " [" + styleExpressions.join(',') + "]";
                    return new source_module_1.SourceExpression([], expressionSource);
                };
                StyleCompiler.prototype._styleModule = function (stylesheetUrl, shim, expression) {
                    var moduleSource = "\n      " + expression.declarations.join('\n') + "\n      " + util_1.codeGenExportVariable('STYLES') + expression.expression + ";\n    ";
                    return new source_module_1.SourceModule(this._createModuleUrl(stylesheetUrl, shim), moduleSource);
                };
                StyleCompiler.prototype._shimIfNeeded = function (style, shim) {
                    return shim ? this._shadowCss.shimCssText(style, CONTENT_ATTR, HOST_ATTR) : style;
                };
                StyleCompiler.prototype._createModuleUrl = function (stylesheetUrl, shim) {
                    return shim ? stylesheetUrl + ".shim" + util_1.MODULE_SUFFIX : "" + stylesheetUrl + util_1.MODULE_SUFFIX;
                };
                StyleCompiler = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [xhr_1.XHR, url_resolver_1.UrlResolver])
                ], StyleCompiler);
                return StyleCompiler;
            }());
            exports_1("StyleCompiler", StyleCompiler);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL3N0eWxlX2NvbXBpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7UUFpQk0sa0JBQWtCLEVBQ2xCLFNBQVMsRUFDVCxZQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBRlosa0JBQWtCLEdBQUcsUUFBUSxDQUFDO1lBQzlCLFNBQVMsR0FBRyxhQUFXLGtCQUFvQixDQUFDO1lBQzVDLFlBQVksR0FBRyxnQkFBYyxrQkFBb0IsQ0FBQztZQUd4RDtnQkFJRSx1QkFBb0IsSUFBUyxFQUFVLFlBQXlCO29CQUE1QyxTQUFJLEdBQUosSUFBSSxDQUFLO29CQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFhO29CQUh4RCxnQkFBVyxHQUFtQyxJQUFJLEdBQUcsRUFBNkIsQ0FBQztvQkFDbkYsZUFBVSxHQUFjLElBQUksc0JBQVMsRUFBRSxDQUFDO2dCQUVtQixDQUFDO2dCQUVwRSwrQ0FBdUIsR0FBdkIsVUFBd0IsUUFBaUM7b0JBQ3ZELElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7b0JBQzdCLElBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7b0JBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQ3BCLFFBQVEsQ0FBQyxhQUFhLEtBQUssd0JBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2pGLENBQUM7Z0JBRUQsK0NBQXVCLEdBQXZCLFVBQXdCLFFBQWlDO29CQUN2RCxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxLQUFLLHdCQUFpQixDQUFDLFFBQVEsQ0FBQztvQkFDakUsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN2RSxDQUFDO2dC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Z0IsR0FBeEIsVUFBeUIsYUFBcUIsRUFBRSxJQUFhO29CQUMzRCxNQUFNLENBQUMsSUFBSSxHQUFNLGFBQWEsYUFBUSxvQkFBZSxHQUFHLEtBQUcsYUFBYSxHQUFHLG9CQUFlLENBQUM7Z0JBQzdGLENBQUM7Z0JBbkZIO29CQUFDLGVBQVUsRUFBRTs7aUNBQUE7Z0JBb0ZiLG9CQUFDO1lBQUQsQ0FuRkEsQUFtRkMsSUFBQTtZQW5GRCx5Q0FtRkMsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9zdHlsZV9jb21waWxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcGlsZVR5cGVNZXRhZGF0YSwgQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGF9IGZyb20gJy4vZGlyZWN0aXZlX21ldGFkYXRhJztcbmltcG9ydCB7U291cmNlTW9kdWxlLCBTb3VyY2VFeHByZXNzaW9uLCBtb2R1bGVSZWZ9IGZyb20gJy4vc291cmNlX21vZHVsZSc7XG5pbXBvcnQge1ZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9tZXRhZGF0YS92aWV3JztcbmltcG9ydCB7WEhSfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIveGhyJztcbmltcG9ydCB7SVNfREFSVCwgU3RyaW5nV3JhcHBlciwgaXNCbGFua30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7UHJvbWlzZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYXN5bmMnO1xuaW1wb3J0IHtTaGFkb3dDc3N9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9zaGFkb3dfY3NzJztcbmltcG9ydCB7VXJsUmVzb2x2ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci91cmxfcmVzb2x2ZXInO1xuaW1wb3J0IHtleHRyYWN0U3R5bGVVcmxzfSBmcm9tICcuL3N0eWxlX3VybF9yZXNvbHZlcic7XG5pbXBvcnQge1xuICBlc2NhcGVTaW5nbGVRdW90ZVN0cmluZyxcbiAgY29kZUdlbkV4cG9ydFZhcmlhYmxlLFxuICBjb2RlR2VuVG9TdHJpbmcsXG4gIE1PRFVMRV9TVUZGSVhcbn0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuXG5jb25zdCBDT01QT05FTlRfVkFSSUFCTEUgPSAnJUNPTVAlJztcbmNvbnN0IEhPU1RfQVRUUiA9IGBfbmdob3N0LSR7Q09NUE9ORU5UX1ZBUklBQkxFfWA7XG5jb25zdCBDT05URU5UX0FUVFIgPSBgX25nY29udGVudC0ke0NPTVBPTkVOVF9WQVJJQUJMRX1gO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3R5bGVDb21waWxlciB7XG4gIHByaXZhdGUgX3N0eWxlQ2FjaGU6IE1hcDxzdHJpbmcsIFByb21pc2U8c3RyaW5nW10+PiA9IG5ldyBNYXA8c3RyaW5nLCBQcm9taXNlPHN0cmluZ1tdPj4oKTtcbiAgcHJpdmF0ZSBfc2hhZG93Q3NzOiBTaGFkb3dDc3MgPSBuZXcgU2hhZG93Q3NzKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfeGhyOiBYSFIsIHByaXZhdGUgX3VybFJlc29sdmVyOiBVcmxSZXNvbHZlcikge31cblxuICBjb21waWxlQ29tcG9uZW50UnVudGltZSh0ZW1wbGF0ZTogQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGEpOiBQcm9taXNlPEFycmF5PHN0cmluZyB8IGFueVtdPj4ge1xuICAgIHZhciBzdHlsZXMgPSB0ZW1wbGF0ZS5zdHlsZXM7XG4gICAgdmFyIHN0eWxlQWJzVXJscyA9IHRlbXBsYXRlLnN0eWxlVXJscztcbiAgICByZXR1cm4gdGhpcy5fbG9hZFN0eWxlcyhzdHlsZXMsIHN0eWxlQWJzVXJscyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZS5lbmNhcHN1bGF0aW9uID09PSBWaWV3RW5jYXBzdWxhdGlvbi5FbXVsYXRlZCk7XG4gIH1cblxuICBjb21waWxlQ29tcG9uZW50Q29kZUdlbih0ZW1wbGF0ZTogQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGEpOiBTb3VyY2VFeHByZXNzaW9uIHtcbiAgICB2YXIgc2hpbSA9IHRlbXBsYXRlLmVuY2Fwc3VsYXRpb24gPT09IFZpZXdFbmNhcHN1bGF0aW9uLkVtdWxhdGVkO1xuICAgIHJldHVybiB0aGlzLl9zdHlsZUNvZGVHZW4odGVtcGxhdGUuc3R5bGVzLCB0ZW1wbGF0ZS5zdHlsZVVybHMsIHNoaW0pO1xuICB9XG5cbiAgY29tcGlsZVN0eWxlc2hlZXRDb2RlR2VuKHN0eWxlc2hlZXRVcmw6IHN0cmluZywgY3NzVGV4dDogc3RyaW5nKTogU291cmNlTW9kdWxlW10ge1xuICAgIHZhciBzdHlsZVdpdGhJbXBvcnRzID0gZXh0cmFjdFN0eWxlVXJscyh0aGlzLl91cmxSZXNvbHZlciwgc3R5bGVzaGVldFVybCwgY3NzVGV4dCk7XG4gICAgcmV0dXJuIFtcbiAgICAgIHRoaXMuX3N0eWxlTW9kdWxlKFxuICAgICAgICAgIHN0eWxlc2hlZXRVcmwsIGZhbHNlLFxuICAgICAgICAgIHRoaXMuX3N0eWxlQ29kZUdlbihbc3R5bGVXaXRoSW1wb3J0cy5zdHlsZV0sIHN0eWxlV2l0aEltcG9ydHMuc3R5bGVVcmxzLCBmYWxzZSkpLFxuICAgICAgdGhpcy5fc3R5bGVNb2R1bGUoc3R5bGVzaGVldFVybCwgdHJ1ZSwgdGhpcy5fc3R5bGVDb2RlR2VuKFtzdHlsZVdpdGhJbXBvcnRzLnN0eWxlXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZVdpdGhJbXBvcnRzLnN0eWxlVXJscywgdHJ1ZSkpXG4gICAgXTtcbiAgfVxuXG4gIGNsZWFyQ2FjaGUoKSB7IHRoaXMuX3N0eWxlQ2FjaGUuY2xlYXIoKTsgfVxuXG4gIHByaXZhdGUgX2xvYWRTdHlsZXMocGxhaW5TdHlsZXM6IHN0cmluZ1tdLCBhYnNVcmxzOiBzdHJpbmdbXSxcbiAgICAgICAgICAgICAgICAgICAgICBlbmNhcHN1bGF0ZTogYm9vbGVhbik6IFByb21pc2U8QXJyYXk8c3RyaW5nIHwgYW55W10+PiB7XG4gICAgdmFyIHByb21pc2VzOiBQcm9taXNlPHN0cmluZ1tdPltdID0gYWJzVXJscy5tYXAoKGFic1VybDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmdbXT4gPT4ge1xuICAgICAgdmFyIGNhY2hlS2V5ID0gYCR7YWJzVXJsfSR7ZW5jYXBzdWxhdGUgPyAnLnNoaW0nIDogJyd9YDtcbiAgICAgIHZhciByZXN1bHQ6IFByb21pc2U8c3RyaW5nW10+ID0gdGhpcy5fc3R5bGVDYWNoZS5nZXQoY2FjaGVLZXkpO1xuICAgICAgaWYgKGlzQmxhbmsocmVzdWx0KSkge1xuICAgICAgICByZXN1bHQgPSB0aGlzLl94aHIuZ2V0KGFic1VybCkudGhlbigoc3R5bGUpID0+IHtcbiAgICAgICAgICB2YXIgc3R5bGVXaXRoSW1wb3J0cyA9IGV4dHJhY3RTdHlsZVVybHModGhpcy5fdXJsUmVzb2x2ZXIsIGFic1VybCwgc3R5bGUpO1xuICAgICAgICAgIHJldHVybiB0aGlzLl9sb2FkU3R5bGVzKFtzdHlsZVdpdGhJbXBvcnRzLnN0eWxlXSwgc3R5bGVXaXRoSW1wb3J0cy5zdHlsZVVybHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5jYXBzdWxhdGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fc3R5bGVDYWNoZS5zZXQoY2FjaGVLZXksIHJlc3VsdCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pO1xuICAgIHJldHVybiBQcm9taXNlV3JhcHBlci5hbGw8c3RyaW5nW10+KHByb21pc2VzKS50aGVuKChuZXN0ZWRTdHlsZXM6IHN0cmluZ1tdW10pID0+IHtcbiAgICAgIHZhciByZXN1bHQ6IEFycmF5PHN0cmluZyB8IGFueVtdPiA9XG4gICAgICAgICAgcGxhaW5TdHlsZXMubWFwKHBsYWluU3R5bGUgPT4gdGhpcy5fc2hpbUlmTmVlZGVkKHBsYWluU3R5bGUsIGVuY2Fwc3VsYXRlKSk7XG4gICAgICBuZXN0ZWRTdHlsZXMuZm9yRWFjaChzdHlsZXMgPT4gcmVzdWx0LnB1c2goc3R5bGVzKSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3R5bGVDb2RlR2VuKHBsYWluU3R5bGVzOiBzdHJpbmdbXSwgYWJzVXJsczogc3RyaW5nW10sIHNoaW06IGJvb2xlYW4pOiBTb3VyY2VFeHByZXNzaW9uIHtcbiAgICB2YXIgYXJyYXlQcmVmaXggPSBJU19EQVJUID8gYGNvbnN0YCA6ICcnO1xuICAgIHZhciBzdHlsZUV4cHJlc3Npb25zID0gcGxhaW5TdHlsZXMubWFwKFxuICAgICAgICBwbGFpblN0eWxlID0+IGVzY2FwZVNpbmdsZVF1b3RlU3RyaW5nKHRoaXMuX3NoaW1JZk5lZWRlZChwbGFpblN0eWxlLCBzaGltKSkpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhYnNVcmxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbW9kdWxlVXJsID0gdGhpcy5fY3JlYXRlTW9kdWxlVXJsKGFic1VybHNbaV0sIHNoaW0pO1xuICAgICAgc3R5bGVFeHByZXNzaW9ucy5wdXNoKGAke21vZHVsZVJlZihtb2R1bGVVcmwpfVNUWUxFU2ApO1xuICAgIH1cbiAgICB2YXIgZXhwcmVzc2lvblNvdXJjZSA9IGAke2FycmF5UHJlZml4fSBbJHtzdHlsZUV4cHJlc3Npb25zLmpvaW4oJywnKX1dYDtcbiAgICByZXR1cm4gbmV3IFNvdXJjZUV4cHJlc3Npb24oW10sIGV4cHJlc3Npb25Tb3VyY2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3R5bGVNb2R1bGUoc3R5bGVzaGVldFVybDogc3RyaW5nLCBzaGltOiBib29sZWFuLFxuICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBTb3VyY2VFeHByZXNzaW9uKTogU291cmNlTW9kdWxlIHtcbiAgICB2YXIgbW9kdWxlU291cmNlID0gYFxuICAgICAgJHtleHByZXNzaW9uLmRlY2xhcmF0aW9ucy5qb2luKCdcXG4nKX1cbiAgICAgICR7Y29kZUdlbkV4cG9ydFZhcmlhYmxlKCdTVFlMRVMnKX0ke2V4cHJlc3Npb24uZXhwcmVzc2lvbn07XG4gICAgYDtcbiAgICByZXR1cm4gbmV3IFNvdXJjZU1vZHVsZSh0aGlzLl9jcmVhdGVNb2R1bGVVcmwoc3R5bGVzaGVldFVybCwgc2hpbSksIG1vZHVsZVNvdXJjZSk7XG4gIH1cblxuICBwcml2YXRlIF9zaGltSWZOZWVkZWQoc3R5bGU6IHN0cmluZywgc2hpbTogYm9vbGVhbik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHNoaW0gPyB0aGlzLl9zaGFkb3dDc3Muc2hpbUNzc1RleHQoc3R5bGUsIENPTlRFTlRfQVRUUiwgSE9TVF9BVFRSKSA6IHN0eWxlO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlTW9kdWxlVXJsKHN0eWxlc2hlZXRVcmw6IHN0cmluZywgc2hpbTogYm9vbGVhbik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHNoaW0gPyBgJHtzdHlsZXNoZWV0VXJsfS5zaGltJHtNT0RVTEVfU1VGRklYfWAgOiBgJHtzdHlsZXNoZWV0VXJsfSR7TU9EVUxFX1NVRkZJWH1gO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
