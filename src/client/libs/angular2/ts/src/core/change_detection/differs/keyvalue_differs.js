System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/collection', 'angular2/src/core/di'], function(exports_1, context_1) {
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
    var lang_1, exceptions_1, collection_1, di_1;
    var KeyValueDiffers;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            }],
        execute: function() {
            /**
             * A repository of different Map diffing strategies used by NgClass, NgStyle, and others.
             */
            KeyValueDiffers = (function () {
                function KeyValueDiffers(factories) {
                    this.factories = factories;
                }
                KeyValueDiffers.create = function (factories, parent) {
                    if (lang_1.isPresent(parent)) {
                        var copied = collection_1.ListWrapper.clone(parent.factories);
                        factories = factories.concat(copied);
                        return new KeyValueDiffers(factories);
                    }
                    else {
                        return new KeyValueDiffers(factories);
                    }
                };
                /**
                 * Takes an array of {@link KeyValueDifferFactory} and returns a provider used to extend the
                 * inherited {@link KeyValueDiffers} instance with the provided factories and return a new
                 * {@link KeyValueDiffers} instance.
                 *
                 * The following example shows how to extend an existing list of factories,
                       * which will only be applied to the injector for this component and its children.
                       * This step is all that's required to make a new {@link KeyValueDiffer} available.
                 *
                 * ### Example
                 *
                 * ```
                 * @Component({
                 *   viewProviders: [
                 *     KeyValueDiffers.extend([new ImmutableMapDiffer()])
                 *   ]
                 * })
                 * ```
                 */
                KeyValueDiffers.extend = function (factories) {
                    return new di_1.Provider(KeyValueDiffers, {
                        useFactory: function (parent) {
                            if (lang_1.isBlank(parent)) {
                                // Typically would occur when calling KeyValueDiffers.extend inside of dependencies passed
                                // to
                                // bootstrap(), which would override default pipes instead of extending them.
                                throw new exceptions_1.BaseException('Cannot extend KeyValueDiffers without a parent injector');
                            }
                            return KeyValueDiffers.create(factories, parent);
                        },
                        // Dependency technically isn't optional, but we can provide a better error message this way.
                        deps: [[KeyValueDiffers, new di_1.SkipSelfMetadata(), new di_1.OptionalMetadata()]]
                    });
                };
                KeyValueDiffers.prototype.find = function (kv) {
                    var factory = this.factories.find(function (f) { return f.supports(kv); });
                    if (lang_1.isPresent(factory)) {
                        return factory;
                    }
                    else {
                        throw new exceptions_1.BaseException("Cannot find a differ supporting object '" + kv + "'");
                    }
                };
                KeyValueDiffers = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [Array])
                ], KeyValueDiffers);
                return KeyValueDiffers;
            }());
            exports_1("KeyValueDiffers", KeyValueDiffers);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9kaWZmZXJzL2tleXZhbHVlX2RpZmZlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFzQkE7O2VBRUc7WUFFSDtnQkFDRSx5QkFBbUIsU0FBa0M7b0JBQWxDLGNBQVMsR0FBVCxTQUFTLENBQXlCO2dCQUFHLENBQUM7Z0JBRWxELHNCQUFNLEdBQWIsVUFBYyxTQUFrQyxFQUFFLE1BQXdCO29CQUN4RSxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdEIsSUFBSSxNQUFNLEdBQUcsd0JBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUNqRCxTQUFTLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDckMsTUFBTSxDQUFDLElBQUksZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUN4QyxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLE1BQU0sQ0FBQyxJQUFJLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDeEMsQ0FBQztnQkFDSCxDQUFDO2dCQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7bUJBa0JHO2dCQUNJLHNCQUFNLEdBQWIsVUFBYyxTQUFrQztvQkFDOUMsTUFBTSxDQUFDLElBQUksYUFBUSxDQUFDLGVBQWUsRUFBRTt3QkFDbkMsVUFBVSxFQUFFLFVBQUMsTUFBdUI7NEJBQ2xDLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ3BCLDBGQUEwRjtnQ0FDMUYsS0FBSztnQ0FDTCw2RUFBNkU7Z0NBQzdFLE1BQU0sSUFBSSwwQkFBYSxDQUFDLHlEQUF5RCxDQUFDLENBQUM7NEJBQ3JGLENBQUM7NEJBQ0QsTUFBTSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO3dCQUNuRCxDQUFDO3dCQUNELDZGQUE2Rjt3QkFDN0YsSUFBSSxFQUFFLENBQUMsQ0FBQyxlQUFlLEVBQUUsSUFBSSxxQkFBZ0IsRUFBRSxFQUFFLElBQUkscUJBQWdCLEVBQUUsQ0FBQyxDQUFDO3FCQUMxRSxDQUFDLENBQUM7Z0JBQ0wsQ0FBQztnQkFFRCw4QkFBSSxHQUFKLFVBQUssRUFBVTtvQkFDYixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQWQsQ0FBYyxDQUFDLENBQUM7b0JBQ3ZELEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN2QixNQUFNLENBQUMsT0FBTyxDQUFDO29CQUNqQixDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLE1BQU0sSUFBSSwwQkFBYSxDQUFDLDZDQUEyQyxFQUFFLE1BQUcsQ0FBQyxDQUFDO29CQUM1RSxDQUFDO2dCQUNILENBQUM7Z0JBeERIO29CQUFDLFlBQUssRUFBRTs7bUNBQUE7Z0JBeURSLHNCQUFDO1lBQUQsQ0F4REEsQUF3REMsSUFBQTtZQXhERCw2Q0F3REMsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vZGlmZmVycy9rZXl2YWx1ZV9kaWZmZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc0JsYW5rLCBpc1ByZXNlbnQsIENPTlNUfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gJy4uL2NoYW5nZV9kZXRlY3Rvcl9yZWYnO1xuaW1wb3J0IHtQcm92aWRlciwgU2tpcFNlbGZNZXRhZGF0YSwgT3B0aW9uYWxNZXRhZGF0YSwgSW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuXG4vKipcbiAqIEEgZGlmZmVyIHRoYXQgdHJhY2tzIGNoYW5nZXMgbWFkZSB0byBhbiBvYmplY3Qgb3ZlciB0aW1lLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEtleVZhbHVlRGlmZmVyIHtcbiAgZGlmZihvYmplY3Q6IGFueSk7XG4gIG9uRGVzdHJveSgpO1xufVxuXG4vKipcbiAqIFByb3ZpZGVzIGEgZmFjdG9yeSBmb3Ige0BsaW5rIEtleVZhbHVlRGlmZmVyfS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBLZXlWYWx1ZURpZmZlckZhY3Rvcnkge1xuICBzdXBwb3J0cyhvYmplY3RzOiBhbnkpOiBib29sZWFuO1xuICBjcmVhdGUoY2RSZWY6IENoYW5nZURldGVjdG9yUmVmKTogS2V5VmFsdWVEaWZmZXI7XG59XG5cbi8qKlxuICogQSByZXBvc2l0b3J5IG9mIGRpZmZlcmVudCBNYXAgZGlmZmluZyBzdHJhdGVnaWVzIHVzZWQgYnkgTmdDbGFzcywgTmdTdHlsZSwgYW5kIG90aGVycy5cbiAqL1xuQENPTlNUKClcbmV4cG9ydCBjbGFzcyBLZXlWYWx1ZURpZmZlcnMge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZmFjdG9yaWVzOiBLZXlWYWx1ZURpZmZlckZhY3RvcnlbXSkge31cblxuICBzdGF0aWMgY3JlYXRlKGZhY3RvcmllczogS2V5VmFsdWVEaWZmZXJGYWN0b3J5W10sIHBhcmVudD86IEtleVZhbHVlRGlmZmVycyk6IEtleVZhbHVlRGlmZmVycyB7XG4gICAgaWYgKGlzUHJlc2VudChwYXJlbnQpKSB7XG4gICAgICB2YXIgY29waWVkID0gTGlzdFdyYXBwZXIuY2xvbmUocGFyZW50LmZhY3Rvcmllcyk7XG4gICAgICBmYWN0b3JpZXMgPSBmYWN0b3JpZXMuY29uY2F0KGNvcGllZCk7XG4gICAgICByZXR1cm4gbmV3IEtleVZhbHVlRGlmZmVycyhmYWN0b3JpZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IEtleVZhbHVlRGlmZmVycyhmYWN0b3JpZXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUYWtlcyBhbiBhcnJheSBvZiB7QGxpbmsgS2V5VmFsdWVEaWZmZXJGYWN0b3J5fSBhbmQgcmV0dXJucyBhIHByb3ZpZGVyIHVzZWQgdG8gZXh0ZW5kIHRoZVxuICAgKiBpbmhlcml0ZWQge0BsaW5rIEtleVZhbHVlRGlmZmVyc30gaW5zdGFuY2Ugd2l0aCB0aGUgcHJvdmlkZWQgZmFjdG9yaWVzIGFuZCByZXR1cm4gYSBuZXdcbiAgICoge0BsaW5rIEtleVZhbHVlRGlmZmVyc30gaW5zdGFuY2UuXG4gICAqXG4gICAqIFRoZSBmb2xsb3dpbmcgZXhhbXBsZSBzaG93cyBob3cgdG8gZXh0ZW5kIGFuIGV4aXN0aW5nIGxpc3Qgb2YgZmFjdG9yaWVzLFxuICAgICAgICAgKiB3aGljaCB3aWxsIG9ubHkgYmUgYXBwbGllZCB0byB0aGUgaW5qZWN0b3IgZm9yIHRoaXMgY29tcG9uZW50IGFuZCBpdHMgY2hpbGRyZW4uXG4gICAgICAgICAqIFRoaXMgc3RlcCBpcyBhbGwgdGhhdCdzIHJlcXVpcmVkIHRvIG1ha2UgYSBuZXcge0BsaW5rIEtleVZhbHVlRGlmZmVyfSBhdmFpbGFibGUuXG4gICAqXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIGBgYFxuICAgKiBAQ29tcG9uZW50KHtcbiAgICogICB2aWV3UHJvdmlkZXJzOiBbXG4gICAqICAgICBLZXlWYWx1ZURpZmZlcnMuZXh0ZW5kKFtuZXcgSW1tdXRhYmxlTWFwRGlmZmVyKCldKVxuICAgKiAgIF1cbiAgICogfSlcbiAgICogYGBgXG4gICAqL1xuICBzdGF0aWMgZXh0ZW5kKGZhY3RvcmllczogS2V5VmFsdWVEaWZmZXJGYWN0b3J5W10pOiBQcm92aWRlciB7XG4gICAgcmV0dXJuIG5ldyBQcm92aWRlcihLZXlWYWx1ZURpZmZlcnMsIHtcbiAgICAgIHVzZUZhY3Rvcnk6IChwYXJlbnQ6IEtleVZhbHVlRGlmZmVycykgPT4ge1xuICAgICAgICBpZiAoaXNCbGFuayhwYXJlbnQpKSB7XG4gICAgICAgICAgLy8gVHlwaWNhbGx5IHdvdWxkIG9jY3VyIHdoZW4gY2FsbGluZyBLZXlWYWx1ZURpZmZlcnMuZXh0ZW5kIGluc2lkZSBvZiBkZXBlbmRlbmNpZXMgcGFzc2VkXG4gICAgICAgICAgLy8gdG9cbiAgICAgICAgICAvLyBib290c3RyYXAoKSwgd2hpY2ggd291bGQgb3ZlcnJpZGUgZGVmYXVsdCBwaXBlcyBpbnN0ZWFkIG9mIGV4dGVuZGluZyB0aGVtLlxuICAgICAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKCdDYW5ub3QgZXh0ZW5kIEtleVZhbHVlRGlmZmVycyB3aXRob3V0IGEgcGFyZW50IGluamVjdG9yJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEtleVZhbHVlRGlmZmVycy5jcmVhdGUoZmFjdG9yaWVzLCBwYXJlbnQpO1xuICAgICAgfSxcbiAgICAgIC8vIERlcGVuZGVuY3kgdGVjaG5pY2FsbHkgaXNuJ3Qgb3B0aW9uYWwsIGJ1dCB3ZSBjYW4gcHJvdmlkZSBhIGJldHRlciBlcnJvciBtZXNzYWdlIHRoaXMgd2F5LlxuICAgICAgZGVwczogW1tLZXlWYWx1ZURpZmZlcnMsIG5ldyBTa2lwU2VsZk1ldGFkYXRhKCksIG5ldyBPcHRpb25hbE1ldGFkYXRhKCldXVxuICAgIH0pO1xuICB9XG5cbiAgZmluZChrdjogT2JqZWN0KTogS2V5VmFsdWVEaWZmZXJGYWN0b3J5IHtcbiAgICB2YXIgZmFjdG9yeSA9IHRoaXMuZmFjdG9yaWVzLmZpbmQoZiA9PiBmLnN1cHBvcnRzKGt2KSk7XG4gICAgaWYgKGlzUHJlc2VudChmYWN0b3J5KSkge1xuICAgICAgcmV0dXJuIGZhY3Rvcnk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBDYW5ub3QgZmluZCBhIGRpZmZlciBzdXBwb3J0aW5nIG9iamVjdCAnJHtrdn0nYCk7XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
