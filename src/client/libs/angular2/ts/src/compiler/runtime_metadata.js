System.register(['angular2/src/core/di', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions', './directive_metadata', 'angular2/src/core/metadata/directives', 'angular2/src/core/linker/directive_resolver', 'angular2/src/core/linker/pipe_resolver', 'angular2/src/core/linker/view_resolver', 'angular2/src/core/linker/directive_lifecycle_reflector', 'angular2/src/core/linker/interfaces', 'angular2/src/core/reflection/reflection', 'angular2/src/core/platform_directives_and_pipes', './util', './assertions', 'angular2/src/compiler/url_resolver'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var di_1, lang_1, exceptions_1, cpl, md, directive_resolver_1, pipe_resolver_1, view_resolver_1, directive_lifecycle_reflector_1, interfaces_1, reflection_1, di_2, platform_directives_and_pipes_1, util_1, assertions_1, url_resolver_1;
    var RuntimeMetadataResolver;
    function flattenDirectives(view, platformDirectives) {
        var directives = [];
        if (lang_1.isPresent(platformDirectives)) {
            flattenArray(platformDirectives, directives);
        }
        if (lang_1.isPresent(view.directives)) {
            flattenArray(view.directives, directives);
        }
        return directives;
    }
    function flattenPipes(view, platformPipes) {
        var pipes = [];
        if (lang_1.isPresent(platformPipes)) {
            flattenArray(platformPipes, pipes);
        }
        if (lang_1.isPresent(view.pipes)) {
            flattenArray(view.pipes, pipes);
        }
        return pipes;
    }
    function flattenArray(tree, out) {
        for (var i = 0; i < tree.length; i++) {
            var item = di_1.resolveForwardRef(tree[i]);
            if (lang_1.isArray(item)) {
                flattenArray(item, out);
            }
            else {
                out.push(item);
            }
        }
    }
    function isValidType(value) {
        return lang_1.isPresent(value) && (value instanceof lang_1.Type);
    }
    function calcModuleUrl(type, cmpMetadata) {
        var moduleId = cmpMetadata.moduleId;
        if (lang_1.isPresent(moduleId)) {
            var scheme = url_resolver_1.getUrlScheme(moduleId);
            return lang_1.isPresent(scheme) && scheme.length > 0 ? moduleId :
                "package:" + moduleId + util_1.MODULE_SUFFIX;
        }
        else {
            return reflection_1.reflector.importUri(type);
        }
    }
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
                di_2 = di_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (cpl_1) {
                cpl = cpl_1;
            },
            function (md_1) {
                md = md_1;
            },
            function (directive_resolver_1_1) {
                directive_resolver_1 = directive_resolver_1_1;
            },
            function (pipe_resolver_1_1) {
                pipe_resolver_1 = pipe_resolver_1_1;
            },
            function (view_resolver_1_1) {
                view_resolver_1 = view_resolver_1_1;
            },
            function (directive_lifecycle_reflector_1_1) {
                directive_lifecycle_reflector_1 = directive_lifecycle_reflector_1_1;
            },
            function (interfaces_1_1) {
                interfaces_1 = interfaces_1_1;
            },
            function (reflection_1_1) {
                reflection_1 = reflection_1_1;
            },
            function (platform_directives_and_pipes_1_1) {
                platform_directives_and_pipes_1 = platform_directives_and_pipes_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (assertions_1_1) {
                assertions_1 = assertions_1_1;
            },
            function (url_resolver_1_1) {
                url_resolver_1 = url_resolver_1_1;
            }],
        execute: function() {
            RuntimeMetadataResolver = (function () {
                function RuntimeMetadataResolver(_directiveResolver, _pipeResolver, _viewResolver, _platformDirectives, _platformPipes) {
                    this._directiveResolver = _directiveResolver;
                    this._pipeResolver = _pipeResolver;
                    this._viewResolver = _viewResolver;
                    this._platformDirectives = _platformDirectives;
                    this._platformPipes = _platformPipes;
                    this._directiveCache = new Map();
                    this._pipeCache = new Map();
                    this._anonymousTypes = new Map();
                    this._anonymousTypeIndex = 0;
                }
                /**
                 * Wrap the stringify method to avoid naming things `function (arg1...) {`
                 */
                RuntimeMetadataResolver.prototype.sanitizeName = function (obj) {
                    var result = lang_1.stringify(obj);
                    if (result.indexOf('(') < 0) {
                        return result;
                    }
                    var found = this._anonymousTypes.get(obj);
                    if (!found) {
                        this._anonymousTypes.set(obj, this._anonymousTypeIndex++);
                        found = this._anonymousTypes.get(obj);
                    }
                    return "anonymous_type_" + found + "_";
                };
                RuntimeMetadataResolver.prototype.getDirectiveMetadata = function (directiveType) {
                    var meta = this._directiveCache.get(directiveType);
                    if (lang_1.isBlank(meta)) {
                        var dirMeta = this._directiveResolver.resolve(directiveType);
                        var moduleUrl = null;
                        var templateMeta = null;
                        var changeDetectionStrategy = null;
                        if (dirMeta instanceof md.ComponentMetadata) {
                            assertions_1.assertArrayOfStrings('styles', dirMeta.styles);
                            var cmpMeta = dirMeta;
                            moduleUrl = calcModuleUrl(directiveType, cmpMeta);
                            var viewMeta = this._viewResolver.resolve(directiveType);
                            assertions_1.assertArrayOfStrings('styles', viewMeta.styles);
                            templateMeta = new cpl.CompileTemplateMetadata({
                                encapsulation: viewMeta.encapsulation,
                                template: viewMeta.template,
                                templateUrl: viewMeta.templateUrl,
                                styles: viewMeta.styles,
                                styleUrls: viewMeta.styleUrls
                            });
                            changeDetectionStrategy = cmpMeta.changeDetection;
                        }
                        meta = cpl.CompileDirectiveMetadata.create({
                            selector: dirMeta.selector,
                            exportAs: dirMeta.exportAs,
                            isComponent: lang_1.isPresent(templateMeta),
                            dynamicLoadable: true,
                            type: new cpl.CompileTypeMetadata({ name: this.sanitizeName(directiveType), moduleUrl: moduleUrl, runtime: directiveType }),
                            template: templateMeta,
                            changeDetection: changeDetectionStrategy,
                            inputs: dirMeta.inputs,
                            outputs: dirMeta.outputs,
                            host: dirMeta.host,
                            lifecycleHooks: interfaces_1.LIFECYCLE_HOOKS_VALUES.filter(function (hook) { return directive_lifecycle_reflector_1.hasLifecycleHook(hook, directiveType); })
                        });
                        this._directiveCache.set(directiveType, meta);
                    }
                    return meta;
                };
                RuntimeMetadataResolver.prototype.getPipeMetadata = function (pipeType) {
                    var meta = this._pipeCache.get(pipeType);
                    if (lang_1.isBlank(meta)) {
                        var pipeMeta = this._pipeResolver.resolve(pipeType);
                        var moduleUrl = reflection_1.reflector.importUri(pipeType);
                        meta = new cpl.CompilePipeMetadata({
                            type: new cpl.CompileTypeMetadata({ name: this.sanitizeName(pipeType), moduleUrl: moduleUrl, runtime: pipeType }),
                            name: pipeMeta.name,
                            pure: pipeMeta.pure
                        });
                        this._pipeCache.set(pipeType, meta);
                    }
                    return meta;
                };
                RuntimeMetadataResolver.prototype.getViewDirectivesMetadata = function (component) {
                    var _this = this;
                    var view = this._viewResolver.resolve(component);
                    var directives = flattenDirectives(view, this._platformDirectives);
                    for (var i = 0; i < directives.length; i++) {
                        if (!isValidType(directives[i])) {
                            throw new exceptions_1.BaseException("Unexpected directive value '" + lang_1.stringify(directives[i]) + "' on the View of component '" + lang_1.stringify(component) + "'");
                        }
                    }
                    return directives.map(function (type) { return _this.getDirectiveMetadata(type); });
                };
                RuntimeMetadataResolver.prototype.getViewPipesMetadata = function (component) {
                    var _this = this;
                    var view = this._viewResolver.resolve(component);
                    var pipes = flattenPipes(view, this._platformPipes);
                    for (var i = 0; i < pipes.length; i++) {
                        if (!isValidType(pipes[i])) {
                            throw new exceptions_1.BaseException("Unexpected piped value '" + lang_1.stringify(pipes[i]) + "' on the View of component '" + lang_1.stringify(component) + "'");
                        }
                    }
                    return pipes.map(function (type) { return _this.getPipeMetadata(type); });
                };
                RuntimeMetadataResolver = __decorate([
                    di_2.Injectable(),
                    __param(3, di_2.Optional()),
                    __param(3, di_2.Inject(platform_directives_and_pipes_1.PLATFORM_DIRECTIVES)),
                    __param(4, di_2.Optional()),
                    __param(4, di_2.Inject(platform_directives_and_pipes_1.PLATFORM_PIPES)), 
                    __metadata('design:paramtypes', [directive_resolver_1.DirectiveResolver, pipe_resolver_1.PipeResolver, view_resolver_1.ViewResolver, Array, Array])
                ], RuntimeMetadataResolver);
                return RuntimeMetadataResolver;
            }());
            exports_1("RuntimeMetadataResolver", RuntimeMetadataResolver);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL3J1bnRpbWVfbWV0YWRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF5SUEsMkJBQTJCLElBQWtCLEVBQUUsa0JBQXlCO1FBQ3RFLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNwQixFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxzQkFBc0IsSUFBa0IsRUFBRSxhQUFvQjtRQUM1RCxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDZixFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixZQUFZLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEMsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsc0JBQXNCLElBQVcsRUFBRSxHQUF3QjtRQUN6RCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFN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bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9ydW50aW1lX21ldGFkYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtyZXNvbHZlRm9yd2FyZFJlZn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtcbiAgVHlwZSxcbiAgaXNCbGFuayxcbiAgaXNQcmVzZW50LFxuICBpc0FycmF5LFxuICBzdHJpbmdpZnksXG4gIFJlZ0V4cFdyYXBwZXJcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCAqIGFzIGNwbCBmcm9tICcuL2RpcmVjdGl2ZV9tZXRhZGF0YSc7XG5pbXBvcnQgKiBhcyBtZCBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9tZXRhZGF0YS9kaXJlY3RpdmVzJztcbmltcG9ydCB7RGlyZWN0aXZlUmVzb2x2ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9kaXJlY3RpdmVfcmVzb2x2ZXInO1xuaW1wb3J0IHtQaXBlUmVzb2x2ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9waXBlX3Jlc29sdmVyJztcbmltcG9ydCB7Vmlld1Jlc29sdmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvdmlld19yZXNvbHZlcic7XG5pbXBvcnQge1ZpZXdNZXRhZGF0YX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbWV0YWRhdGEvdmlldyc7XG5pbXBvcnQge2hhc0xpZmVjeWNsZUhvb2t9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9kaXJlY3RpdmVfbGlmZWN5Y2xlX3JlZmxlY3Rvcic7XG5pbXBvcnQge0xpZmVjeWNsZUhvb2tzLCBMSUZFQ1lDTEVfSE9PS1NfVkFMVUVTfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvaW50ZXJmYWNlcyc7XG5pbXBvcnQge3JlZmxlY3Rvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVmbGVjdGlvbi9yZWZsZWN0aW9uJztcbmltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0LCBPcHRpb25hbH0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtQTEFURk9STV9ESVJFQ1RJVkVTLCBQTEFURk9STV9QSVBFU30gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcGxhdGZvcm1fZGlyZWN0aXZlc19hbmRfcGlwZXMnO1xuaW1wb3J0IHtNT0RVTEVfU1VGRklYfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHthc3NlcnRBcnJheU9mU3RyaW5nc30gZnJvbSAnLi9hc3NlcnRpb25zJztcbmltcG9ydCB7Z2V0VXJsU2NoZW1lfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvdXJsX3Jlc29sdmVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJ1bnRpbWVNZXRhZGF0YVJlc29sdmVyIHtcbiAgcHJpdmF0ZSBfZGlyZWN0aXZlQ2FjaGUgPSBuZXcgTWFwPFR5cGUsIGNwbC5Db21waWxlRGlyZWN0aXZlTWV0YWRhdGE+KCk7XG4gIHByaXZhdGUgX3BpcGVDYWNoZSA9IG5ldyBNYXA8VHlwZSwgY3BsLkNvbXBpbGVQaXBlTWV0YWRhdGE+KCk7XG4gIHByaXZhdGUgX2Fub255bW91c1R5cGVzID0gbmV3IE1hcDxPYmplY3QsIG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfYW5vbnltb3VzVHlwZUluZGV4ID0gMDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9kaXJlY3RpdmVSZXNvbHZlcjogRGlyZWN0aXZlUmVzb2x2ZXIsIHByaXZhdGUgX3BpcGVSZXNvbHZlcjogUGlwZVJlc29sdmVyLFxuICAgICAgICAgICAgICBwcml2YXRlIF92aWV3UmVzb2x2ZXI6IFZpZXdSZXNvbHZlcixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChQTEFURk9STV9ESVJFQ1RJVkVTKSBwcml2YXRlIF9wbGF0Zm9ybURpcmVjdGl2ZXM6IFR5cGVbXSxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChQTEFURk9STV9QSVBFUykgcHJpdmF0ZSBfcGxhdGZvcm1QaXBlczogVHlwZVtdKSB7fVxuXG4gIC8qKlxuICAgKiBXcmFwIHRoZSBzdHJpbmdpZnkgbWV0aG9kIHRvIGF2b2lkIG5hbWluZyB0aGluZ3MgYGZ1bmN0aW9uIChhcmcxLi4uKSB7YFxuICAgKi9cbiAgcHJpdmF0ZSBzYW5pdGl6ZU5hbWUob2JqOiBhbnkpOiBzdHJpbmcge1xuICAgIGxldCByZXN1bHQgPSBzdHJpbmdpZnkob2JqKTtcbiAgICBpZiAocmVzdWx0LmluZGV4T2YoJygnKSA8IDApIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGxldCBmb3VuZCA9IHRoaXMuX2Fub255bW91c1R5cGVzLmdldChvYmopO1xuICAgIGlmICghZm91bmQpIHtcbiAgICAgIHRoaXMuX2Fub255bW91c1R5cGVzLnNldChvYmosIHRoaXMuX2Fub255bW91c1R5cGVJbmRleCsrKTtcbiAgICAgIGZvdW5kID0gdGhpcy5fYW5vbnltb3VzVHlwZXMuZ2V0KG9iaik7XG4gICAgfVxuICAgIHJldHVybiBgYW5vbnltb3VzX3R5cGVfJHtmb3VuZH1fYDtcbiAgfVxuXG4gIGdldERpcmVjdGl2ZU1ldGFkYXRhKGRpcmVjdGl2ZVR5cGU6IFR5cGUpOiBjcGwuQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhIHtcbiAgICB2YXIgbWV0YSA9IHRoaXMuX2RpcmVjdGl2ZUNhY2hlLmdldChkaXJlY3RpdmVUeXBlKTtcbiAgICBpZiAoaXNCbGFuayhtZXRhKSkge1xuICAgICAgdmFyIGRpck1ldGEgPSB0aGlzLl9kaXJlY3RpdmVSZXNvbHZlci5yZXNvbHZlKGRpcmVjdGl2ZVR5cGUpO1xuICAgICAgdmFyIG1vZHVsZVVybCA9IG51bGw7XG4gICAgICB2YXIgdGVtcGxhdGVNZXRhID0gbnVsbDtcbiAgICAgIHZhciBjaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSA9IG51bGw7XG5cbiAgICAgIGlmIChkaXJNZXRhIGluc3RhbmNlb2YgbWQuQ29tcG9uZW50TWV0YWRhdGEpIHtcbiAgICAgICAgYXNzZXJ0QXJyYXlPZlN0cmluZ3MoJ3N0eWxlcycsIGRpck1ldGEuc3R5bGVzKTtcbiAgICAgICAgdmFyIGNtcE1ldGEgPSA8bWQuQ29tcG9uZW50TWV0YWRhdGE+ZGlyTWV0YTtcbiAgICAgICAgbW9kdWxlVXJsID0gY2FsY01vZHVsZVVybChkaXJlY3RpdmVUeXBlLCBjbXBNZXRhKTtcbiAgICAgICAgdmFyIHZpZXdNZXRhID0gdGhpcy5fdmlld1Jlc29sdmVyLnJlc29sdmUoZGlyZWN0aXZlVHlwZSk7XG4gICAgICAgIGFzc2VydEFycmF5T2ZTdHJpbmdzKCdzdHlsZXMnLCB2aWV3TWV0YS5zdHlsZXMpO1xuICAgICAgICB0ZW1wbGF0ZU1ldGEgPSBuZXcgY3BsLkNvbXBpbGVUZW1wbGF0ZU1ldGFkYXRhKHtcbiAgICAgICAgICBlbmNhcHN1bGF0aW9uOiB2aWV3TWV0YS5lbmNhcHN1bGF0aW9uLFxuICAgICAgICAgIHRlbXBsYXRlOiB2aWV3TWV0YS50ZW1wbGF0ZSxcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogdmlld01ldGEudGVtcGxhdGVVcmwsXG4gICAgICAgICAgc3R5bGVzOiB2aWV3TWV0YS5zdHlsZXMsXG4gICAgICAgICAgc3R5bGVVcmxzOiB2aWV3TWV0YS5zdHlsZVVybHNcbiAgICAgICAgfSk7XG4gICAgICAgIGNoYW5nZURldGVjdGlvblN0cmF0ZWd5ID0gY21wTWV0YS5jaGFuZ2VEZXRlY3Rpb247XG4gICAgICB9XG4gICAgICBtZXRhID0gY3BsLkNvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YS5jcmVhdGUoe1xuICAgICAgICBzZWxlY3RvcjogZGlyTWV0YS5zZWxlY3RvcixcbiAgICAgICAgZXhwb3J0QXM6IGRpck1ldGEuZXhwb3J0QXMsXG4gICAgICAgIGlzQ29tcG9uZW50OiBpc1ByZXNlbnQodGVtcGxhdGVNZXRhKSxcbiAgICAgICAgZHluYW1pY0xvYWRhYmxlOiB0cnVlLFxuICAgICAgICB0eXBlOiBuZXcgY3BsLkNvbXBpbGVUeXBlTWV0YWRhdGEoXG4gICAgICAgICAgICB7bmFtZTogdGhpcy5zYW5pdGl6ZU5hbWUoZGlyZWN0aXZlVHlwZSksIG1vZHVsZVVybDogbW9kdWxlVXJsLCBydW50aW1lOiBkaXJlY3RpdmVUeXBlfSksXG4gICAgICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZU1ldGEsXG4gICAgICAgIGNoYW5nZURldGVjdGlvbjogY2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgICAgIGlucHV0czogZGlyTWV0YS5pbnB1dHMsXG4gICAgICAgIG91dHB1dHM6IGRpck1ldGEub3V0cHV0cyxcbiAgICAgICAgaG9zdDogZGlyTWV0YS5ob3N0LFxuICAgICAgICBsaWZlY3ljbGVIb29rczogTElGRUNZQ0xFX0hPT0tTX1ZBTFVFUy5maWx0ZXIoaG9vayA9PiBoYXNMaWZlY3ljbGVIb29rKGhvb2ssIGRpcmVjdGl2ZVR5cGUpKVxuICAgICAgfSk7XG4gICAgICB0aGlzLl9kaXJlY3RpdmVDYWNoZS5zZXQoZGlyZWN0aXZlVHlwZSwgbWV0YSk7XG4gICAgfVxuICAgIHJldHVybiBtZXRhO1xuICB9XG5cbiAgZ2V0UGlwZU1ldGFkYXRhKHBpcGVUeXBlOiBUeXBlKTogY3BsLkNvbXBpbGVQaXBlTWV0YWRhdGEge1xuICAgIHZhciBtZXRhID0gdGhpcy5fcGlwZUNhY2hlLmdldChwaXBlVHlwZSk7XG4gICAgaWYgKGlzQmxhbmsobWV0YSkpIHtcbiAgICAgIHZhciBwaXBlTWV0YSA9IHRoaXMuX3BpcGVSZXNvbHZlci5yZXNvbHZlKHBpcGVUeXBlKTtcbiAgICAgIHZhciBtb2R1bGVVcmwgPSByZWZsZWN0b3IuaW1wb3J0VXJpKHBpcGVUeXBlKTtcbiAgICAgIG1ldGEgPSBuZXcgY3BsLkNvbXBpbGVQaXBlTWV0YWRhdGEoe1xuICAgICAgICB0eXBlOiBuZXcgY3BsLkNvbXBpbGVUeXBlTWV0YWRhdGEoXG4gICAgICAgICAgICB7bmFtZTogdGhpcy5zYW5pdGl6ZU5hbWUocGlwZVR5cGUpLCBtb2R1bGVVcmw6IG1vZHVsZVVybCwgcnVudGltZTogcGlwZVR5cGV9KSxcbiAgICAgICAgbmFtZTogcGlwZU1ldGEubmFtZSxcbiAgICAgICAgcHVyZTogcGlwZU1ldGEucHVyZVxuICAgICAgfSk7XG4gICAgICB0aGlzLl9waXBlQ2FjaGUuc2V0KHBpcGVUeXBlLCBtZXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIG1ldGE7XG4gIH1cblxuICBnZXRWaWV3RGlyZWN0aXZlc01ldGFkYXRhKGNvbXBvbmVudDogVHlwZSk6IGNwbC5Db21waWxlRGlyZWN0aXZlTWV0YWRhdGFbXSB7XG4gICAgdmFyIHZpZXcgPSB0aGlzLl92aWV3UmVzb2x2ZXIucmVzb2x2ZShjb21wb25lbnQpO1xuICAgIHZhciBkaXJlY3RpdmVzID0gZmxhdHRlbkRpcmVjdGl2ZXModmlldywgdGhpcy5fcGxhdGZvcm1EaXJlY3RpdmVzKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRpcmVjdGl2ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghaXNWYWxpZFR5cGUoZGlyZWN0aXZlc1tpXSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgICAgICBgVW5leHBlY3RlZCBkaXJlY3RpdmUgdmFsdWUgJyR7c3RyaW5naWZ5KGRpcmVjdGl2ZXNbaV0pfScgb24gdGhlIFZpZXcgb2YgY29tcG9uZW50ICcke3N0cmluZ2lmeShjb21wb25lbnQpfSdgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGlyZWN0aXZlcy5tYXAodHlwZSA9PiB0aGlzLmdldERpcmVjdGl2ZU1ldGFkYXRhKHR5cGUpKTtcbiAgfVxuXG4gIGdldFZpZXdQaXBlc01ldGFkYXRhKGNvbXBvbmVudDogVHlwZSk6IGNwbC5Db21waWxlUGlwZU1ldGFkYXRhW10ge1xuICAgIHZhciB2aWV3ID0gdGhpcy5fdmlld1Jlc29sdmVyLnJlc29sdmUoY29tcG9uZW50KTtcbiAgICB2YXIgcGlwZXMgPSBmbGF0dGVuUGlwZXModmlldywgdGhpcy5fcGxhdGZvcm1QaXBlcyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwaXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCFpc1ZhbGlkVHlwZShwaXBlc1tpXSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgICAgICBgVW5leHBlY3RlZCBwaXBlZCB2YWx1ZSAnJHtzdHJpbmdpZnkocGlwZXNbaV0pfScgb24gdGhlIFZpZXcgb2YgY29tcG9uZW50ICcke3N0cmluZ2lmeShjb21wb25lbnQpfSdgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHBpcGVzLm1hcCh0eXBlID0+IHRoaXMuZ2V0UGlwZU1ldGFkYXRhKHR5cGUpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmbGF0dGVuRGlyZWN0aXZlcyh2aWV3OiBWaWV3TWV0YWRhdGEsIHBsYXRmb3JtRGlyZWN0aXZlczogYW55W10pOiBUeXBlW10ge1xuICBsZXQgZGlyZWN0aXZlcyA9IFtdO1xuICBpZiAoaXNQcmVzZW50KHBsYXRmb3JtRGlyZWN0aXZlcykpIHtcbiAgICBmbGF0dGVuQXJyYXkocGxhdGZvcm1EaXJlY3RpdmVzLCBkaXJlY3RpdmVzKTtcbiAgfVxuICBpZiAoaXNQcmVzZW50KHZpZXcuZGlyZWN0aXZlcykpIHtcbiAgICBmbGF0dGVuQXJyYXkodmlldy5kaXJlY3RpdmVzLCBkaXJlY3RpdmVzKTtcbiAgfVxuICByZXR1cm4gZGlyZWN0aXZlcztcbn1cblxuZnVuY3Rpb24gZmxhdHRlblBpcGVzKHZpZXc6IFZpZXdNZXRhZGF0YSwgcGxhdGZvcm1QaXBlczogYW55W10pOiBUeXBlW10ge1xuICBsZXQgcGlwZXMgPSBbXTtcbiAgaWYgKGlzUHJlc2VudChwbGF0Zm9ybVBpcGVzKSkge1xuICAgIGZsYXR0ZW5BcnJheShwbGF0Zm9ybVBpcGVzLCBwaXBlcyk7XG4gIH1cbiAgaWYgKGlzUHJlc2VudCh2aWV3LnBpcGVzKSkge1xuICAgIGZsYXR0ZW5BcnJheSh2aWV3LnBpcGVzLCBwaXBlcyk7XG4gIH1cbiAgcmV0dXJuIHBpcGVzO1xufVxuXG5mdW5jdGlvbiBmbGF0dGVuQXJyYXkodHJlZTogYW55W10sIG91dDogQXJyYXk8VHlwZSB8IGFueVtdPik6IHZvaWQge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRyZWUubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IHJlc29sdmVGb3J3YXJkUmVmKHRyZWVbaV0pO1xuICAgIGlmIChpc0FycmF5KGl0ZW0pKSB7XG4gICAgICBmbGF0dGVuQXJyYXkoaXRlbSwgb3V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWRUeXBlKHZhbHVlOiBUeXBlKTogYm9vbGVhbiB7XG4gIHJldHVybiBpc1ByZXNlbnQodmFsdWUpICYmICh2YWx1ZSBpbnN0YW5jZW9mIFR5cGUpO1xufVxuXG5mdW5jdGlvbiBjYWxjTW9kdWxlVXJsKHR5cGU6IFR5cGUsIGNtcE1ldGFkYXRhOiBtZC5Db21wb25lbnRNZXRhZGF0YSk6IHN0cmluZyB7XG4gIHZhciBtb2R1bGVJZCA9IGNtcE1ldGFkYXRhLm1vZHVsZUlkO1xuICBpZiAoaXNQcmVzZW50KG1vZHVsZUlkKSkge1xuICAgIHZhciBzY2hlbWUgPSBnZXRVcmxTY2hlbWUobW9kdWxlSWQpO1xuICAgIHJldHVybiBpc1ByZXNlbnQoc2NoZW1lKSAmJiBzY2hlbWUubGVuZ3RoID4gMCA/IG1vZHVsZUlkIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgcGFja2FnZToke21vZHVsZUlkfSR7TU9EVUxFX1NVRkZJWH1gO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiByZWZsZWN0b3IuaW1wb3J0VXJpKHR5cGUpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
