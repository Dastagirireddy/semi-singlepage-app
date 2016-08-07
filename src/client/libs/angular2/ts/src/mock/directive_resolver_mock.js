System.register(['angular2/src/core/di', 'angular2/src/facade/collection', 'angular2/src/facade/lang', '../core/metadata', 'angular2/src/core/linker/directive_resolver'], function(exports_1, context_1) {
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
                        providers = dm.providers.concat(providerOverrides);
                    }
                    if (dm instanceof metadata_1.ComponentMetadata) {
                        var viewProviders = dm.viewProviders;
                        if (lang_1.isPresent(viewProviderOverrides)) {
                            viewProviders = dm.viewProviders.concat(viewProviderOverrides);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL21vY2svZGlyZWN0aXZlX3Jlc29sdmVyX21vY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQU1BOzs7ZUFHRztZQUVIO2dCQUEyQyx5Q0FBaUI7Z0JBQTVEO29CQUEyQyw4QkFBaUI7b0JBQ2xELHVCQUFrQixHQUFHLElBQUksZ0JBQUcsRUFBZSxDQUFDO29CQUM1QywwQkFBcUIsR0FBRyxJQUFJLGdCQUFHLEVBQWUsQ0FBQztnQkFpRXpELENBQUM7Z0JBL0RDLHVDQUFPLEdBQVAsVUFBUSxJQUFVO29CQUNoQixJQUFJLEVBQUUsR0FBRyxnQkFBSyxDQUFDLE9BQU8sWUFBQyxJQUFJLENBQUMsQ0FBQztvQkFFN0IsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMxRCxJQUFJLHFCQUFxQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBRWpFLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0JBQzdCLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2pDLFNBQVMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO29CQUNyRCxDQUFDO29CQUVELEVBQUUsQ0FBQyxDQUFDLEVBQUUsWUFBWSw0QkFBaUIsQ0FBQyxDQUFDLENBQUM7d0JBQ3BDLElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUM7d0JBQ3JDLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3JDLGFBQWEsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO3dCQUNqRSxDQUFDO3dCQUVELE1BQU0sQ0FBQyxJQUFJLDRCQUFpQixDQUFDOzRCQUMzQixRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVE7NEJBQ3JCLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTTs0QkFDakIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPOzRCQUNuQixJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUk7NEJBQ2IsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFROzRCQUNyQixRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVE7NEJBQ3JCLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTzs0QkFDbkIsZUFBZSxFQUFFLEVBQUUsQ0FBQyxlQUFlOzRCQUNuQyxTQUFTLEVBQUUsU0FBUzs0QkFDcEIsYUFBYSxFQUFFLGFBQWE7eUJBQzdCLENBQUMsQ0FBQztvQkFDTCxDQUFDO29CQUVELE1BQU0sQ0FBQyxJQUFJLDRCQUFpQixDQUFDO3dCQUMzQixRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVE7d0JBQ3JCLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTTt3QkFDakIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPO3dCQUNuQixJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUk7d0JBQ2IsU0FBUyxFQUFFLFNBQVM7d0JBQ3BCLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUTt3QkFDckIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPO3FCQUNwQixDQUFDLENBQUM7Z0JBQ0wsQ0FBQztnQkFFRDs7bUJBRUc7Z0JBQ0gsbURBQW1CLEdBQW5CLFVBQW9CLElBQVUsRUFBRSxRQUFlO29CQUM3QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDOUMsQ0FBQztnQkFFRDs7bUJBRUc7Z0JBQ0gsdURBQXVCLEdBQXZCLFVBQXdCLElBQVUsRUFBRSxZQUFtQjtvQkFDckQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ3JELENBQUM7Z0JBRUQsb0RBQW9CLEdBQXBCLFVBQXFCLElBQVUsRUFBRSxTQUFnQjtvQkFDL0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQy9DLENBQUM7Z0JBRUQsd0RBQXdCLEdBQXhCLFVBQXlCLElBQVUsRUFBRSxhQUFvQjtvQkFDdkQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQ3RELENBQUM7Z0JBbkVIO29CQUFDLGVBQVUsRUFBRTs7eUNBQUE7Z0JBb0ViLDRCQUFDO1lBQUQsQ0FuRUEsQUFtRUMsQ0FuRTBDLHNDQUFpQixHQW1FM0Q7WUFuRUQseURBbUVDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvbW9jay9kaXJlY3RpdmVfcmVzb2x2ZXJfbW9jay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtNYXAsIE1hcFdyYXBwZXIsIExpc3RXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtUeXBlLCBpc1ByZXNlbnQsIHN0cmluZ2lmeSwgaXNCbGFuaywgcHJpbnR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0RpcmVjdGl2ZU1ldGFkYXRhLCBDb21wb25lbnRNZXRhZGF0YX0gZnJvbSAnLi4vY29yZS9tZXRhZGF0YSc7XG5pbXBvcnQge0RpcmVjdGl2ZVJlc29sdmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvZGlyZWN0aXZlX3Jlc29sdmVyJztcblxuLyoqXG4gKiBBbiBpbXBsZW1lbnRhdGlvbiBvZiB7QGxpbmsgRGlyZWN0aXZlUmVzb2x2ZXJ9IHRoYXQgYWxsb3dzIG92ZXJyaWRpbmdcbiAqIHZhcmlvdXMgcHJvcGVydGllcyBvZiBkaXJlY3RpdmVzLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9ja0RpcmVjdGl2ZVJlc29sdmVyIGV4dGVuZHMgRGlyZWN0aXZlUmVzb2x2ZXIge1xuICBwcml2YXRlIF9wcm92aWRlck92ZXJyaWRlcyA9IG5ldyBNYXA8VHlwZSwgYW55W10+KCk7XG4gIHByaXZhdGUgdmlld1Byb3ZpZGVyT3ZlcnJpZGVzID0gbmV3IE1hcDxUeXBlLCBhbnlbXT4oKTtcblxuICByZXNvbHZlKHR5cGU6IFR5cGUpOiBEaXJlY3RpdmVNZXRhZGF0YSB7XG4gICAgdmFyIGRtID0gc3VwZXIucmVzb2x2ZSh0eXBlKTtcblxuICAgIHZhciBwcm92aWRlck92ZXJyaWRlcyA9IHRoaXMuX3Byb3ZpZGVyT3ZlcnJpZGVzLmdldCh0eXBlKTtcbiAgICB2YXIgdmlld1Byb3ZpZGVyT3ZlcnJpZGVzID0gdGhpcy52aWV3UHJvdmlkZXJPdmVycmlkZXMuZ2V0KHR5cGUpO1xuXG4gICAgdmFyIHByb3ZpZGVycyA9IGRtLnByb3ZpZGVycztcbiAgICBpZiAoaXNQcmVzZW50KHByb3ZpZGVyT3ZlcnJpZGVzKSkge1xuICAgICAgcHJvdmlkZXJzID0gZG0ucHJvdmlkZXJzLmNvbmNhdChwcm92aWRlck92ZXJyaWRlcyk7XG4gICAgfVxuXG4gICAgaWYgKGRtIGluc3RhbmNlb2YgQ29tcG9uZW50TWV0YWRhdGEpIHtcbiAgICAgIHZhciB2aWV3UHJvdmlkZXJzID0gZG0udmlld1Byb3ZpZGVycztcbiAgICAgIGlmIChpc1ByZXNlbnQodmlld1Byb3ZpZGVyT3ZlcnJpZGVzKSkge1xuICAgICAgICB2aWV3UHJvdmlkZXJzID0gZG0udmlld1Byb3ZpZGVycy5jb25jYXQodmlld1Byb3ZpZGVyT3ZlcnJpZGVzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBDb21wb25lbnRNZXRhZGF0YSh7XG4gICAgICAgIHNlbGVjdG9yOiBkbS5zZWxlY3RvcixcbiAgICAgICAgaW5wdXRzOiBkbS5pbnB1dHMsXG4gICAgICAgIG91dHB1dHM6IGRtLm91dHB1dHMsXG4gICAgICAgIGhvc3Q6IGRtLmhvc3QsXG4gICAgICAgIGV4cG9ydEFzOiBkbS5leHBvcnRBcyxcbiAgICAgICAgbW9kdWxlSWQ6IGRtLm1vZHVsZUlkLFxuICAgICAgICBxdWVyaWVzOiBkbS5xdWVyaWVzLFxuICAgICAgICBjaGFuZ2VEZXRlY3Rpb246IGRtLmNoYW5nZURldGVjdGlvbixcbiAgICAgICAgcHJvdmlkZXJzOiBwcm92aWRlcnMsXG4gICAgICAgIHZpZXdQcm92aWRlcnM6IHZpZXdQcm92aWRlcnNcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRGlyZWN0aXZlTWV0YWRhdGEoe1xuICAgICAgc2VsZWN0b3I6IGRtLnNlbGVjdG9yLFxuICAgICAgaW5wdXRzOiBkbS5pbnB1dHMsXG4gICAgICBvdXRwdXRzOiBkbS5vdXRwdXRzLFxuICAgICAgaG9zdDogZG0uaG9zdCxcbiAgICAgIHByb3ZpZGVyczogcHJvdmlkZXJzLFxuICAgICAgZXhwb3J0QXM6IGRtLmV4cG9ydEFzLFxuICAgICAgcXVlcmllczogZG0ucXVlcmllc1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkXG4gICAqL1xuICBzZXRCaW5kaW5nc092ZXJyaWRlKHR5cGU6IFR5cGUsIGJpbmRpbmdzOiBhbnlbXSk6IHZvaWQge1xuICAgIHRoaXMuX3Byb3ZpZGVyT3ZlcnJpZGVzLnNldCh0eXBlLCBiaW5kaW5ncyk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWRcbiAgICovXG4gIHNldFZpZXdCaW5kaW5nc092ZXJyaWRlKHR5cGU6IFR5cGUsIHZpZXdCaW5kaW5nczogYW55W10pOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdQcm92aWRlck92ZXJyaWRlcy5zZXQodHlwZSwgdmlld0JpbmRpbmdzKTtcbiAgfVxuXG4gIHNldFByb3ZpZGVyc092ZXJyaWRlKHR5cGU6IFR5cGUsIHByb3ZpZGVyczogYW55W10pOiB2b2lkIHtcbiAgICB0aGlzLl9wcm92aWRlck92ZXJyaWRlcy5zZXQodHlwZSwgcHJvdmlkZXJzKTtcbiAgfVxuXG4gIHNldFZpZXdQcm92aWRlcnNPdmVycmlkZSh0eXBlOiBUeXBlLCB2aWV3UHJvdmlkZXJzOiBhbnlbXSk6IHZvaWQge1xuICAgIHRoaXMudmlld1Byb3ZpZGVyT3ZlcnJpZGVzLnNldCh0eXBlLCB2aWV3UHJvdmlkZXJzKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
