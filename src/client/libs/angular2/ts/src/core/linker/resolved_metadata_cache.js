System.register(['../di', 'angular2/src/facade/lang', './element', './directive_resolver', '../pipes/pipe_provider', './pipe_resolver'], function(exports_1, context_1) {
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
    var di_1, lang_1, element_1, directive_resolver_1, pipe_provider_1, pipe_resolver_1;
    var ResolvedMetadataCache, CODEGEN_RESOLVED_METADATA_CACHE;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (element_1_1) {
                element_1 = element_1_1;
            },
            function (directive_resolver_1_1) {
                directive_resolver_1 = directive_resolver_1_1;
            },
            function (pipe_provider_1_1) {
                pipe_provider_1 = pipe_provider_1_1;
            },
            function (pipe_resolver_1_1) {
                pipe_resolver_1 = pipe_resolver_1_1;
            }],
        execute: function() {
            ResolvedMetadataCache = (function () {
                function ResolvedMetadataCache(_directiveResolver, _pipeResolver) {
                    this._directiveResolver = _directiveResolver;
                    this._pipeResolver = _pipeResolver;
                    this._directiveCache = new Map();
                    this._pipeCache = new Map();
                }
                ResolvedMetadataCache.prototype.getResolvedDirectiveMetadata = function (type) {
                    var result = this._directiveCache.get(type);
                    if (lang_1.isBlank(result)) {
                        result = element_1.DirectiveProvider.createFromType(type, this._directiveResolver.resolve(type));
                        this._directiveCache.set(type, result);
                    }
                    return result;
                };
                ResolvedMetadataCache.prototype.getResolvedPipeMetadata = function (type) {
                    var result = this._pipeCache.get(type);
                    if (lang_1.isBlank(result)) {
                        result = pipe_provider_1.PipeProvider.createFromType(type, this._pipeResolver.resolve(type));
                        this._pipeCache.set(type, result);
                    }
                    return result;
                };
                ResolvedMetadataCache = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [directive_resolver_1.DirectiveResolver, pipe_resolver_1.PipeResolver])
                ], ResolvedMetadataCache);
                return ResolvedMetadataCache;
            }());
            exports_1("ResolvedMetadataCache", ResolvedMetadataCache);
            exports_1("CODEGEN_RESOLVED_METADATA_CACHE", CODEGEN_RESOLVED_METADATA_CACHE = new ResolvedMetadataCache(directive_resolver_1.CODEGEN_DIRECTIVE_RESOLVER, pipe_resolver_1.CODEGEN_PIPE_RESOLVER));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvbGlua2VyL3Jlc29sdmVkX21ldGFkYXRhX2NhY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7K0JBaUNXLCtCQUErQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQXpCMUM7Z0JBSUUsK0JBQW9CLGtCQUFxQyxFQUFVLGFBQTJCO29CQUExRSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO29CQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFjO29CQUh0RixvQkFBZSxHQUFpQyxJQUFJLEdBQUcsRUFBMkIsQ0FBQztvQkFDbkYsZUFBVSxHQUE0QixJQUFJLEdBQUcsRUFBc0IsQ0FBQztnQkFFcUIsQ0FBQztnQkFFbEcsNERBQTRCLEdBQTVCLFVBQTZCLElBQVU7b0JBQ3JDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM1QyxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNwQixNQUFNLEdBQUcsMkJBQWlCLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ3ZGLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDekMsQ0FBQztvQkFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNoQixDQUFDO2dCQUVELHVEQUF1QixHQUF2QixVQUF3QixJQUFVO29CQUNoQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDdkMsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDcEIsTUFBTSxHQUFHLDRCQUFZLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUM3RSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQ3BDLENBQUM7b0JBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDaEIsQ0FBQztnQkF2Qkg7b0JBQUMsZUFBVSxFQUFFOzt5Q0FBQTtnQkF3QmIsNEJBQUM7WUFBRCxDQXZCQSxBQXVCQyxJQUFBO1lBdkJELHlEQXVCQyxDQUFBO1lBRVUsNkNBQUEsK0JBQStCLEdBQ3RDLElBQUkscUJBQXFCLENBQUMsK0NBQTBCLEVBQUUscUNBQXFCLENBQUMsQ0FBQSxDQUFDIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvbGlua2VyL3Jlc29sdmVkX21ldGFkYXRhX2NhY2hlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICcuLi9kaSc7XG5pbXBvcnQge1R5cGUsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0RpcmVjdGl2ZVByb3ZpZGVyfSBmcm9tICcuL2VsZW1lbnQnO1xuaW1wb3J0IHtEaXJlY3RpdmVSZXNvbHZlciwgQ09ERUdFTl9ESVJFQ1RJVkVfUkVTT0xWRVJ9IGZyb20gJy4vZGlyZWN0aXZlX3Jlc29sdmVyJztcbmltcG9ydCB7UGlwZVByb3ZpZGVyfSBmcm9tICcuLi9waXBlcy9waXBlX3Byb3ZpZGVyJztcbmltcG9ydCB7UGlwZVJlc29sdmVyLCBDT0RFR0VOX1BJUEVfUkVTT0xWRVJ9IGZyb20gJy4vcGlwZV9yZXNvbHZlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZXNvbHZlZE1ldGFkYXRhQ2FjaGUge1xuICBwcml2YXRlIF9kaXJlY3RpdmVDYWNoZTogTWFwPFR5cGUsIERpcmVjdGl2ZVByb3ZpZGVyPiA9IG5ldyBNYXA8VHlwZSwgRGlyZWN0aXZlUHJvdmlkZXI+KCk7XG4gIHByaXZhdGUgX3BpcGVDYWNoZTogTWFwPFR5cGUsIFBpcGVQcm92aWRlcj4gPSBuZXcgTWFwPFR5cGUsIFBpcGVQcm92aWRlcj4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9kaXJlY3RpdmVSZXNvbHZlcjogRGlyZWN0aXZlUmVzb2x2ZXIsIHByaXZhdGUgX3BpcGVSZXNvbHZlcjogUGlwZVJlc29sdmVyKSB7fVxuXG4gIGdldFJlc29sdmVkRGlyZWN0aXZlTWV0YWRhdGEodHlwZTogVHlwZSk6IERpcmVjdGl2ZVByb3ZpZGVyIHtcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5fZGlyZWN0aXZlQ2FjaGUuZ2V0KHR5cGUpO1xuICAgIGlmIChpc0JsYW5rKHJlc3VsdCkpIHtcbiAgICAgIHJlc3VsdCA9IERpcmVjdGl2ZVByb3ZpZGVyLmNyZWF0ZUZyb21UeXBlKHR5cGUsIHRoaXMuX2RpcmVjdGl2ZVJlc29sdmVyLnJlc29sdmUodHlwZSkpO1xuICAgICAgdGhpcy5fZGlyZWN0aXZlQ2FjaGUuc2V0KHR5cGUsIHJlc3VsdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBnZXRSZXNvbHZlZFBpcGVNZXRhZGF0YSh0eXBlOiBUeXBlKTogUGlwZVByb3ZpZGVyIHtcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5fcGlwZUNhY2hlLmdldCh0eXBlKTtcbiAgICBpZiAoaXNCbGFuayhyZXN1bHQpKSB7XG4gICAgICByZXN1bHQgPSBQaXBlUHJvdmlkZXIuY3JlYXRlRnJvbVR5cGUodHlwZSwgdGhpcy5fcGlwZVJlc29sdmVyLnJlc29sdmUodHlwZSkpO1xuICAgICAgdGhpcy5fcGlwZUNhY2hlLnNldCh0eXBlLCByZXN1bHQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG5cbmV4cG9ydCB2YXIgQ09ERUdFTl9SRVNPTFZFRF9NRVRBREFUQV9DQUNIRSA9XG4gICAgbmV3IFJlc29sdmVkTWV0YWRhdGFDYWNoZShDT0RFR0VOX0RJUkVDVElWRV9SRVNPTFZFUiwgQ09ERUdFTl9QSVBFX1JFU09MVkVSKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
