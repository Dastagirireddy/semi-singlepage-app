System.register(['angular2/src/core/di', 'angular2/src/facade/collection', 'angular2/src/facade/lang', '../core/metadata', 'angular2/src/compiler/directive_resolver'], function(exports_1, context_1) {
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
    var di_1, collection_1, lang_1, metadata_1, directive_resolver_1;
    var MockDirectiveResolver;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (metadata_1_1) {
                metadata_1 = metadata_1_1;
            },
            function (directive_resolver_1_1) {
                directive_resolver_1 = directive_resolver_1_1;
            }],
        execute: function() {
            /**
             * An implementation of {@link DirectiveResolver} that allows overriding
             * various properties of directives.
             */
            MockDirectiveResolver = (function (_super) {
                __extends(MockDirectiveResolver, _super);
                function MockDirectiveResolver() {
                    _super.apply(this, arguments);
                    this._providerOverrides = new collection_1.Map();
                    this.viewProviderOverrides = new collection_1.Map();
                }
                MockDirectiveResolver.prototype.resolve = function (type) {
                    var dm = _super.prototype.resolve.call(this, type);
                    var providerOverrides = this._providerOverrides.get(type);
                    var viewProviderOverrides = this.viewProviderOverrides.get(type);
                    var providers = dm.providers;
                    if (lang_1.isPresent(providerOverrides)) {
                        var originalViewProviders = lang_1.isPresent(dm.providers) ? dm.providers : [];
                        providers = originalViewProviders.concat(providerOverrides);
                    }
                    if (dm instanceof metadata_1.ComponentMetadata) {
                        var viewProviders = dm.viewProviders;
                        if (lang_1.isPresent(viewProviderOverrides)) {
                            var originalViewProviders = lang_1.isPresent(dm.viewProviders) ? dm.viewProviders : [];
                            viewProviders = originalViewProviders.concat(viewProviderOverrides);
                        }
                        return new metadata_1.ComponentMetadata({
                            selector: dm.selector,
                            inputs: dm.inputs,
                            outputs: dm.outputs,
                            host: dm.host,
                            exportAs: dm.exportAs,
                            moduleId: dm.moduleId,
                            queries: dm.queries,
                            changeDetection: dm.changeDetection,
                            providers: providers,
                            viewProviders: viewProviders
                        });
                    }
                    return new metadata_1.DirectiveMetadata({
                        selector: dm.selector,
                        inputs: dm.inputs,
                        outputs: dm.outputs,
                        host: dm.host,
                        providers: providers,
                        exportAs: dm.exportAs,
                        queries: dm.queries
                    });
                };
                /**
                 * @deprecated
                 */
                MockDirectiveResolver.prototype.setBindingsOverride = function (type, bindings) {
                    this._providerOverrides.set(type, bindings);
                };
                /**
                 * @deprecated
                 */
                MockDirectiveResolver.prototype.setViewBindingsOverride = function (type, viewBindings) {
                    this.viewProviderOverrides.set(type, viewBindings);
                };
                MockDirectiveResolver.prototype.setProvidersOverride = function (type, providers) {
                    this._providerOverrides.set(type, providers);
                };
                MockDirectiveResolver.prototype.setViewProvidersOverride = function (type, viewProviders) {
                    this.viewProviderOverrides.set(type, viewProviders);
                };
                MockDirectiveResolver = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], MockDirectiveResolver);
                return MockDirectiveResolver;
            }(directive_resolver_1.DirectiveResolver));
            exports_1("MockDirectiveResolver", MockDirectiveResolver);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9tb2NrL2RpcmVjdGl2ZV9yZXNvbHZlcl9tb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFNQTs7O2VBR0c7WUFFSDtnQkFBMkMseUNBQWlCO2dCQUE1RDtvQkFBMkMsOEJBQWlCO29CQUNsRCx1QkFBa0IsR0FBRyxJQUFJLGdCQUFHLEVBQWUsQ0FBQztvQkFDNUMsMEJBQXFCLEdBQUcsSUFBSSxnQkFBRyxFQUFlLENBQUM7Z0JBbUV6RCxDQUFDO2dCQWpFQyx1Q0FBTyxHQUFQLFVBQVEsSUFBVTtvQkFDaEIsSUFBSSxFQUFFLEdBQUcsZ0JBQUssQ0FBQyxPQUFPLFlBQUMsSUFBSSxDQUFDLENBQUM7b0JBRTdCLElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDMUQsSUFBSSxxQkFBcUIsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUVqRSxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDO29CQUM3QixFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNqQyxJQUFJLHFCQUFxQixHQUFHLGdCQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO3dCQUN4RSxTQUFTLEdBQUcscUJBQXFCLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7b0JBQzlELENBQUM7b0JBRUQsRUFBRSxDQUFDLENBQUMsRUFBRSxZQUFZLDRCQUFpQixDQUFDLENBQUMsQ0FBQzt3QkFDcEMsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQzt3QkFDckMsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDckMsSUFBSSxxQkFBcUIsR0FBRyxnQkFBUyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQzs0QkFDaEYsYUFBYSxHQUFHLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO3dCQUN0RSxDQUFDO3dCQUVELE1BQU0sQ0FBQyxJQUFJLDRCQUFpQixDQUFDOzRCQUMzQixRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVE7NEJBQ3JCLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTTs0QkFDakIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPOzRCQUNuQixJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUk7NEJBQ2IsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFROzRCQUNyQixRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVE7NEJBQ3JCLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTzs0QkFDbkIsZUFBZSxFQUFFLEVBQUUsQ0FBQyxlQUFlOzRCQUNuQyxTQUFTLEVBQUUsU0FBUzs0QkFDcEIsYUFBYSxFQUFFLGFBQWE7eUJBQzdCLENBQUMsQ0FBQztvQkFDTCxDQUFDO29CQUVELE1BQU0sQ0FBQyxJQUFJLDRCQUFpQixDQUFDO3dCQUMzQixRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVE7d0JBQ3JCLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTTt3QkFDakIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPO3dCQUNuQixJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUk7d0JBQ2IsU0FBUyxFQUFFLFNBQVM7d0JBQ3BCLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUTt3QkFDckIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPO3FCQUNwQixDQUFDLENBQUM7Z0JBQ0wsQ0FBQztnQkFFRDs7bUJBRUc7Z0JBQ0gsbURBQW1CLEdBQW5CLFVBQW9CLElBQVUsRUFBRSxRQUFlO29CQUM3QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDOUMsQ0FBQztnQkFFRDs7bUJBRUc7Z0JBQ0gsdURBQXVCLEdBQXZCLFVBQXdCLElBQVUsRUFBRSxZQUFtQjtvQkFDckQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ3JELENBQUM7Z0JBRUQsb0RBQW9CLEdBQXBCLFVBQXFCLElBQVUsRUFBRSxTQUFnQjtvQkFDL0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQy9DLENBQUM7Z0JBRUQsd0RBQXdCLEdBQXhCLFVBQXlCLElBQVUsRUFBRSxhQUFvQjtvQkFDdkQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQ3RELENBQUM7Z0JBckVIO29CQUFDLGVBQVUsRUFBRTs7eUNBQUE7Z0JBc0ViLDRCQUFDO1lBQUQsQ0FyRUEsQUFxRUMsQ0FyRTBDLHNDQUFpQixHQXFFM0Q7WUFyRUQseURBcUVDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL21vY2svZGlyZWN0aXZlX3Jlc29sdmVyX21vY2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7TWFwLCBNYXBXcmFwcGVyLCBMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7VHlwZSwgaXNQcmVzZW50LCBzdHJpbmdpZnksIGlzQmxhbmssIHByaW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtEaXJlY3RpdmVNZXRhZGF0YSwgQ29tcG9uZW50TWV0YWRhdGF9IGZyb20gJy4uL2NvcmUvbWV0YWRhdGEnO1xuaW1wb3J0IHtEaXJlY3RpdmVSZXNvbHZlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL2RpcmVjdGl2ZV9yZXNvbHZlcic7XG5cbi8qKlxuICogQW4gaW1wbGVtZW50YXRpb24gb2Yge0BsaW5rIERpcmVjdGl2ZVJlc29sdmVyfSB0aGF0IGFsbG93cyBvdmVycmlkaW5nXG4gKiB2YXJpb3VzIHByb3BlcnRpZXMgb2YgZGlyZWN0aXZlcy5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vY2tEaXJlY3RpdmVSZXNvbHZlciBleHRlbmRzIERpcmVjdGl2ZVJlc29sdmVyIHtcbiAgcHJpdmF0ZSBfcHJvdmlkZXJPdmVycmlkZXMgPSBuZXcgTWFwPFR5cGUsIGFueVtdPigpO1xuICBwcml2YXRlIHZpZXdQcm92aWRlck92ZXJyaWRlcyA9IG5ldyBNYXA8VHlwZSwgYW55W10+KCk7XG5cbiAgcmVzb2x2ZSh0eXBlOiBUeXBlKTogRGlyZWN0aXZlTWV0YWRhdGEge1xuICAgIHZhciBkbSA9IHN1cGVyLnJlc29sdmUodHlwZSk7XG5cbiAgICB2YXIgcHJvdmlkZXJPdmVycmlkZXMgPSB0aGlzLl9wcm92aWRlck92ZXJyaWRlcy5nZXQodHlwZSk7XG4gICAgdmFyIHZpZXdQcm92aWRlck92ZXJyaWRlcyA9IHRoaXMudmlld1Byb3ZpZGVyT3ZlcnJpZGVzLmdldCh0eXBlKTtcblxuICAgIHZhciBwcm92aWRlcnMgPSBkbS5wcm92aWRlcnM7XG4gICAgaWYgKGlzUHJlc2VudChwcm92aWRlck92ZXJyaWRlcykpIHtcbiAgICAgIHZhciBvcmlnaW5hbFZpZXdQcm92aWRlcnMgPSBpc1ByZXNlbnQoZG0ucHJvdmlkZXJzKSA/IGRtLnByb3ZpZGVycyA6IFtdO1xuICAgICAgcHJvdmlkZXJzID0gb3JpZ2luYWxWaWV3UHJvdmlkZXJzLmNvbmNhdChwcm92aWRlck92ZXJyaWRlcyk7XG4gICAgfVxuXG4gICAgaWYgKGRtIGluc3RhbmNlb2YgQ29tcG9uZW50TWV0YWRhdGEpIHtcbiAgICAgIHZhciB2aWV3UHJvdmlkZXJzID0gZG0udmlld1Byb3ZpZGVycztcbiAgICAgIGlmIChpc1ByZXNlbnQodmlld1Byb3ZpZGVyT3ZlcnJpZGVzKSkge1xuICAgICAgICB2YXIgb3JpZ2luYWxWaWV3UHJvdmlkZXJzID0gaXNQcmVzZW50KGRtLnZpZXdQcm92aWRlcnMpID8gZG0udmlld1Byb3ZpZGVycyA6IFtdO1xuICAgICAgICB2aWV3UHJvdmlkZXJzID0gb3JpZ2luYWxWaWV3UHJvdmlkZXJzLmNvbmNhdCh2aWV3UHJvdmlkZXJPdmVycmlkZXMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IENvbXBvbmVudE1ldGFkYXRhKHtcbiAgICAgICAgc2VsZWN0b3I6IGRtLnNlbGVjdG9yLFxuICAgICAgICBpbnB1dHM6IGRtLmlucHV0cyxcbiAgICAgICAgb3V0cHV0czogZG0ub3V0cHV0cyxcbiAgICAgICAgaG9zdDogZG0uaG9zdCxcbiAgICAgICAgZXhwb3J0QXM6IGRtLmV4cG9ydEFzLFxuICAgICAgICBtb2R1bGVJZDogZG0ubW9kdWxlSWQsXG4gICAgICAgIHF1ZXJpZXM6IGRtLnF1ZXJpZXMsXG4gICAgICAgIGNoYW5nZURldGVjdGlvbjogZG0uY2hhbmdlRGV0ZWN0aW9uLFxuICAgICAgICBwcm92aWRlcnM6IHByb3ZpZGVycyxcbiAgICAgICAgdmlld1Byb3ZpZGVyczogdmlld1Byb3ZpZGVyc1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBEaXJlY3RpdmVNZXRhZGF0YSh7XG4gICAgICBzZWxlY3RvcjogZG0uc2VsZWN0b3IsXG4gICAgICBpbnB1dHM6IGRtLmlucHV0cyxcbiAgICAgIG91dHB1dHM6IGRtLm91dHB1dHMsXG4gICAgICBob3N0OiBkbS5ob3N0LFxuICAgICAgcHJvdmlkZXJzOiBwcm92aWRlcnMsXG4gICAgICBleHBvcnRBczogZG0uZXhwb3J0QXMsXG4gICAgICBxdWVyaWVzOiBkbS5xdWVyaWVzXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWRcbiAgICovXG4gIHNldEJpbmRpbmdzT3ZlcnJpZGUodHlwZTogVHlwZSwgYmluZGluZ3M6IGFueVtdKTogdm9pZCB7XG4gICAgdGhpcy5fcHJvdmlkZXJPdmVycmlkZXMuc2V0KHR5cGUsIGJpbmRpbmdzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZFxuICAgKi9cbiAgc2V0Vmlld0JpbmRpbmdzT3ZlcnJpZGUodHlwZTogVHlwZSwgdmlld0JpbmRpbmdzOiBhbnlbXSk6IHZvaWQge1xuICAgIHRoaXMudmlld1Byb3ZpZGVyT3ZlcnJpZGVzLnNldCh0eXBlLCB2aWV3QmluZGluZ3MpO1xuICB9XG5cbiAgc2V0UHJvdmlkZXJzT3ZlcnJpZGUodHlwZTogVHlwZSwgcHJvdmlkZXJzOiBhbnlbXSk6IHZvaWQge1xuICAgIHRoaXMuX3Byb3ZpZGVyT3ZlcnJpZGVzLnNldCh0eXBlLCBwcm92aWRlcnMpO1xuICB9XG5cbiAgc2V0Vmlld1Byb3ZpZGVyc092ZXJyaWRlKHR5cGU6IFR5cGUsIHZpZXdQcm92aWRlcnM6IGFueVtdKTogdm9pZCB7XG4gICAgdGhpcy52aWV3UHJvdmlkZXJPdmVycmlkZXMuc2V0KHR5cGUsIHZpZXdQcm92aWRlcnMpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
