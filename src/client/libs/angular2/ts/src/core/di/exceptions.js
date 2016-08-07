System.register(['angular2/src/facade/collection', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var collection_1, lang_1, exceptions_1;
    var AbstractProviderError, NoProviderError, CyclicDependencyError, InstantiationError, InvalidProviderError, NoAnnotationError, OutOfBoundsError, MixingMultiProvidersWithRegularProvidersError;
    function findFirstClosedCycle(keys) {
        var res = [];
        for (var i = 0; i < keys.length; ++i) {
            if (collection_1.ListWrapper.contains(res, keys[i])) {
                res.push(keys[i]);
                return res;
            }
            else {
                res.push(keys[i]);
            }
        }
        return res;
    }
    function constructResolvingPath(keys) {
        if (keys.length > 1) {
            var reversed = findFirstClosedCycle(collection_1.ListWrapper.reversed(keys));
            var tokenStrs = reversed.map(function (k) { return lang_1.stringify(k.token); });
            return " (" + tokenStrs.join(' -> ') + ")";
        }
        else {
            return "";
        }
    }
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
            /**
             * Base class for all errors arising from misconfigured providers.
             */
            AbstractProviderError = (function (_super) {
                __extends(AbstractProviderError, _super);
                function AbstractProviderError(injector, key, constructResolvingMessage) {
                    _super.call(this, "DI Exception");
                    this.keys = [key];
                    this.injectors = [injector];
                    this.constructResolvingMessage = constructResolvingMessage;
                    this.message = this.constructResolvingMessage(this.keys);
                }
                AbstractProviderError.prototype.addKey = function (injector, key) {
                    this.injectors.push(injector);
                    this.keys.push(key);
                    this.message = this.constructResolvingMessage(this.keys);
                };
                Object.defineProperty(AbstractProviderError.prototype, "context", {
                    get: function () { return this.injectors[this.injectors.length - 1].debugContext(); },
                    enumerable: true,
                    configurable: true
                });
                return AbstractProviderError;
            }(exceptions_1.BaseException));
            exports_1("AbstractProviderError", AbstractProviderError);
            /**
             * Thrown when trying to retrieve a dependency by `Key` from {@link Injector}, but the
             * {@link Injector} does not have a {@link Provider} for {@link Key}.
             *
             * ### Example ([live demo](http://plnkr.co/edit/vq8D3FRB9aGbnWJqtEPE?p=preview))
             *
             * ```typescript
             * class A {
             *   constructor(b:B) {}
             * }
             *
             * expect(() => Injector.resolveAndCreate([A])).toThrowError();
             * ```
             */
            NoProviderError = (function (_super) {
                __extends(NoProviderError, _super);
                function NoProviderError(injector, key) {
                    _super.call(this, injector, key, function (keys) {
                        var first = lang_1.stringify(collection_1.ListWrapper.first(keys).token);
                        return "No provider for " + first + "!" + constructResolvingPath(keys);
                    });
                }
                return NoProviderError;
            }(AbstractProviderError));
            exports_1("NoProviderError", NoProviderError);
            /**
             * Thrown when dependencies form a cycle.
             *
             * ### Example ([live demo](http://plnkr.co/edit/wYQdNos0Tzql3ei1EV9j?p=info))
             *
             * ```typescript
             * var injector = Injector.resolveAndCreate([
             *   provide("one", {useFactory: (two) => "two", deps: [[new Inject("two")]]}),
             *   provide("two", {useFactory: (one) => "one", deps: [[new Inject("one")]]})
             * ]);
             *
             * expect(() => injector.get("one")).toThrowError();
             * ```
             *
             * Retrieving `A` or `B` throws a `CyclicDependencyError` as the graph above cannot be constructed.
             */
            CyclicDependencyError = (function (_super) {
                __extends(CyclicDependencyError, _super);
                function CyclicDependencyError(injector, key) {
                    _super.call(this, injector, key, function (keys) {
                        return "Cannot instantiate cyclic dependency!" + constructResolvingPath(keys);
                    });
                }
                return CyclicDependencyError;
            }(AbstractProviderError));
            exports_1("CyclicDependencyError", CyclicDependencyError);
            /**
             * Thrown when a constructing type returns with an Error.
             *
             * The `InstantiationError` class contains the original error plus the dependency graph which caused
             * this object to be instantiated.
             *
             * ### Example ([live demo](http://plnkr.co/edit/7aWYdcqTQsP0eNqEdUAf?p=preview))
             *
             * ```typescript
             * class A {
             *   constructor() {
             *     throw new Error('message');
             *   }
             * }
             *
             * var injector = Injector.resolveAndCreate([A]);
            
             * try {
             *   injector.get(A);
             * } catch (e) {
             *   expect(e instanceof InstantiationError).toBe(true);
             *   expect(e.originalException.message).toEqual("message");
             *   expect(e.originalStack).toBeDefined();
             * }
             * ```
             */
            InstantiationError = (function (_super) {
                __extends(InstantiationError, _super);
                function InstantiationError(injector, originalException, originalStack, key) {
                    _super.call(this, "DI Exception", originalException, originalStack, null);
                    this.keys = [key];
                    this.injectors = [injector];
                }
                InstantiationError.prototype.addKey = function (injector, key) {
                    this.injectors.push(injector);
                    this.keys.push(key);
                };
                Object.defineProperty(InstantiationError.prototype, "wrapperMessage", {
                    get: function () {
                        var first = lang_1.stringify(collection_1.ListWrapper.first(this.keys).token);
                        return "Error during instantiation of " + first + "!" + constructResolvingPath(this.keys) + ".";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(InstantiationError.prototype, "causeKey", {
                    get: function () { return this.keys[0]; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(InstantiationError.prototype, "context", {
                    get: function () { return this.injectors[this.injectors.length - 1].debugContext(); },
                    enumerable: true,
                    configurable: true
                });
                return InstantiationError;
            }(exceptions_1.WrappedException));
            exports_1("InstantiationError", InstantiationError);
            /**
             * Thrown when an object other then {@link Provider} (or `Type`) is passed to {@link Injector}
             * creation.
             *
             * ### Example ([live demo](http://plnkr.co/edit/YatCFbPAMCL0JSSQ4mvH?p=preview))
             *
             * ```typescript
             * expect(() => Injector.resolveAndCreate(["not a type"])).toThrowError();
             * ```
             */
            InvalidProviderError = (function (_super) {
                __extends(InvalidProviderError, _super);
                function InvalidProviderError(provider) {
                    _super.call(this, "Invalid provider - only instances of Provider and Type are allowed, got: " +
                        provider.toString());
                }
                return InvalidProviderError;
            }(exceptions_1.BaseException));
            exports_1("InvalidProviderError", InvalidProviderError);
            /**
             * Thrown when the class has no annotation information.
             *
             * Lack of annotation information prevents the {@link Injector} from determining which dependencies
             * need to be injected into the constructor.
             *
             * ### Example ([live demo](http://plnkr.co/edit/rHnZtlNS7vJOPQ6pcVkm?p=preview))
             *
             * ```typescript
             * class A {
             *   constructor(b) {}
             * }
             *
             * expect(() => Injector.resolveAndCreate([A])).toThrowError();
             * ```
             *
             * This error is also thrown when the class not marked with {@link Injectable} has parameter types.
             *
             * ```typescript
             * class B {}
             *
             * class A {
             *   constructor(b:B) {} // no information about the parameter types of A is available at runtime.
             * }
             *
             * expect(() => Injector.resolveAndCreate([A,B])).toThrowError();
             * ```
             */
            NoAnnotationError = (function (_super) {
                __extends(NoAnnotationError, _super);
                function NoAnnotationError(typeOrFunc, params) {
                    _super.call(this, NoAnnotationError._genMessage(typeOrFunc, params));
                }
                NoAnnotationError._genMessage = function (typeOrFunc, params) {
                    var signature = [];
                    for (var i = 0, ii = params.length; i < ii; i++) {
                        var parameter = params[i];
                        if (lang_1.isBlank(parameter) || parameter.length == 0) {
                            signature.push('?');
                        }
                        else {
                            signature.push(parameter.map(lang_1.stringify).join(' '));
                        }
                    }
                    return "Cannot resolve all parameters for '" + lang_1.stringify(typeOrFunc) + "'(" +
                        signature.join(', ') + "). " +
                        "Make sure that all the parameters are decorated with Inject or have valid type annotations and that '" +
                        lang_1.stringify(typeOrFunc) + "' is decorated with Injectable.";
                };
                return NoAnnotationError;
            }(exceptions_1.BaseException));
            exports_1("NoAnnotationError", NoAnnotationError);
            /**
             * Thrown when getting an object by index.
             *
             * ### Example ([live demo](http://plnkr.co/edit/bRs0SX2OTQiJzqvjgl8P?p=preview))
             *
             * ```typescript
             * class A {}
             *
             * var injector = Injector.resolveAndCreate([A]);
             *
             * expect(() => injector.getAt(100)).toThrowError();
             * ```
             */
            OutOfBoundsError = (function (_super) {
                __extends(OutOfBoundsError, _super);
                function OutOfBoundsError(index) {
                    _super.call(this, "Index " + index + " is out-of-bounds.");
                }
                return OutOfBoundsError;
            }(exceptions_1.BaseException));
            exports_1("OutOfBoundsError", OutOfBoundsError);
            // TODO: add a working example after alpha38 is released
            /**
             * Thrown when a multi provider and a regular provider are bound to the same token.
             *
             * ### Example
             *
             * ```typescript
             * expect(() => Injector.resolveAndCreate([
             *   new Provider("Strings", {useValue: "string1", multi: true}),
             *   new Provider("Strings", {useValue: "string2", multi: false})
             * ])).toThrowError();
             * ```
             */
            MixingMultiProvidersWithRegularProvidersError = (function (_super) {
                __extends(MixingMultiProvidersWithRegularProvidersError, _super);
                function MixingMultiProvidersWithRegularProvidersError(provider1, provider2) {
                    _super.call(this, "Cannot mix multi providers and regular providers, got: " + provider1.toString() + " " +
                        provider2.toString());
                }
                return MixingMultiProvidersWithRegularProvidersError;
            }(exceptions_1.BaseException));
            exports_1("MixingMultiProvidersWithRegularProvidersError", MixingMultiProvidersWithRegularProvidersError);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvZGkvZXhjZXB0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBTUEsOEJBQThCLElBQVc7UUFDdkMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDckMsRUFBRSxDQUFDLENBQUMsd0JBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUNiLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLENBQUM7UUFDSCxDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRCxnQ0FBZ0MsSUFBVztRQUN6QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxRQUFRLEdBQUcsb0JBQW9CLENBQUMsd0JBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNoRSxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsZ0JBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQWxCLENBQWtCLENBQUMsQ0FBQztZQUN0RCxNQUFNLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFD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QyxDQUFDO2dCQUFDLENBQUM7Z0JBQ25FLHVCQUFDO1lBQUQsQ0FGQSxBQUVDLENBRnFDLDBCQUFhLEdBRWxEO1lBRkQsK0NBRUMsQ0FBQTtZQUVELHdEQUF3RDtZQUN4RDs7Ozs7Ozs7Ozs7ZUFXRztZQUNIO2dCQUFtRSxpRUFBYTtnQkFDOUUsdURBQVksU0FBUyxFQUFFLFNBQVM7b0JBQzlCLGtCQUFNLHlEQUF5RCxHQUFHLFNBQVMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxHQUFHO3dCQUN0RixTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDOUIsQ0FBQztnQkFDSCxvREFBQztZQUFELENBTEEsQUFLQyxDQUxrRSwwQkFBYSxHQUsvRTtZQUxELHlHQUtDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29yZS9kaS9leGNlcHRpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7c3RyaW5naWZ5LCBpc0JsYW5rfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9uLCBXcmFwcGVkRXhjZXB0aW9uLCB1bmltcGxlbWVudGVkfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtLZXl9IGZyb20gJy4va2V5JztcbmltcG9ydCB7SW5qZWN0b3J9IGZyb20gJy4vaW5qZWN0b3InO1xuXG5mdW5jdGlvbiBmaW5kRmlyc3RDbG9zZWRDeWNsZShrZXlzOiBhbnlbXSk6IGFueVtdIHtcbiAgdmFyIHJlcyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoTGlzdFdyYXBwZXIuY29udGFpbnMocmVzLCBrZXlzW2ldKSkge1xuICAgICAgcmVzLnB1c2goa2V5c1tpXSk7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXMucHVzaChrZXlzW2ldKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0UmVzb2x2aW5nUGF0aChrZXlzOiBhbnlbXSk6IHN0cmluZyB7XG4gIGlmIChrZXlzLmxlbmd0aCA+IDEpIHtcbiAgICB2YXIgcmV2ZXJzZWQgPSBmaW5kRmlyc3RDbG9zZWRDeWNsZShMaXN0V3JhcHBlci5yZXZlcnNlZChrZXlzKSk7XG4gICAgdmFyIHRva2VuU3RycyA9IHJldmVyc2VkLm1hcChrID0+IHN0cmluZ2lmeShrLnRva2VuKSk7XG4gICAgcmV0dXJuIFwiIChcIiArIHRva2VuU3Rycy5qb2luKCcgLT4gJykgKyBcIilcIjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxufVxuXG5cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgYWxsIGVycm9ycyBhcmlzaW5nIGZyb20gbWlzY29uZmlndXJlZCBwcm92aWRlcnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBBYnN0cmFjdFByb3ZpZGVyRXJyb3IgZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBtZXNzYWdlOiBzdHJpbmc7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBrZXlzOiBLZXlbXTtcblxuICAvKiogQGludGVybmFsICovXG4gIGluamVjdG9yczogSW5qZWN0b3JbXTtcblxuICAvKiogQGludGVybmFsICovXG4gIGNvbnN0cnVjdFJlc29sdmluZ01lc3NhZ2U6IEZ1bmN0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3Rvciwga2V5OiBLZXksIGNvbnN0cnVjdFJlc29sdmluZ01lc3NhZ2U6IEZ1bmN0aW9uKSB7XG4gICAgc3VwZXIoXCJESSBFeGNlcHRpb25cIik7XG4gICAgdGhpcy5rZXlzID0gW2tleV07XG4gICAgdGhpcy5pbmplY3RvcnMgPSBbaW5qZWN0b3JdO1xuICAgIHRoaXMuY29uc3RydWN0UmVzb2x2aW5nTWVzc2FnZSA9IGNvbnN0cnVjdFJlc29sdmluZ01lc3NhZ2U7XG4gICAgdGhpcy5tZXNzYWdlID0gdGhpcy5jb25zdHJ1Y3RSZXNvbHZpbmdNZXNzYWdlKHRoaXMua2V5cyk7XG4gIH1cblxuICBhZGRLZXkoaW5qZWN0b3I6IEluamVjdG9yLCBrZXk6IEtleSk6IHZvaWQge1xuICAgIHRoaXMuaW5qZWN0b3JzLnB1c2goaW5qZWN0b3IpO1xuICAgIHRoaXMua2V5cy5wdXNoKGtleSk7XG4gICAgdGhpcy5tZXNzYWdlID0gdGhpcy5jb25zdHJ1Y3RSZXNvbHZpbmdNZXNzYWdlKHRoaXMua2V5cyk7XG4gIH1cblxuICBnZXQgY29udGV4dCgpIHsgcmV0dXJuIHRoaXMuaW5qZWN0b3JzW3RoaXMuaW5qZWN0b3JzLmxlbmd0aCAtIDFdLmRlYnVnQ29udGV4dCgpOyB9XG59XG5cbi8qKlxuICogVGhyb3duIHdoZW4gdHJ5aW5nIHRvIHJldHJpZXZlIGEgZGVwZW5kZW5jeSBieSBgS2V5YCBmcm9tIHtAbGluayBJbmplY3Rvcn0sIGJ1dCB0aGVcbiAqIHtAbGluayBJbmplY3Rvcn0gZG9lcyBub3QgaGF2ZSBhIHtAbGluayBQcm92aWRlcn0gZm9yIHtAbGluayBLZXl9LlxuICpcbiAqICMjIyBFeGFtcGxlIChbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC92cThEM0ZSQjlhR2JuV0pxdEVQRT9wPXByZXZpZXcpKVxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNsYXNzIEEge1xuICogICBjb25zdHJ1Y3RvcihiOkIpIHt9XG4gKiB9XG4gKlxuICogZXhwZWN0KCgpID0+IEluamVjdG9yLnJlc29sdmVBbmRDcmVhdGUoW0FdKSkudG9UaHJvd0Vycm9yKCk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNsYXNzIE5vUHJvdmlkZXJFcnJvciBleHRlbmRzIEFic3RyYWN0UHJvdmlkZXJFcnJvciB7XG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3Rvciwga2V5OiBLZXkpIHtcbiAgICBzdXBlcihpbmplY3Rvciwga2V5LCBmdW5jdGlvbihrZXlzOiBhbnlbXSkge1xuICAgICAgdmFyIGZpcnN0ID0gc3RyaW5naWZ5KExpc3RXcmFwcGVyLmZpcnN0KGtleXMpLnRva2VuKTtcbiAgICAgIHJldHVybiBgTm8gcHJvdmlkZXIgZm9yICR7Zmlyc3R9ISR7Y29uc3RydWN0UmVzb2x2aW5nUGF0aChrZXlzKX1gO1xuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogVGhyb3duIHdoZW4gZGVwZW5kZW5jaWVzIGZvcm0gYSBjeWNsZS5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvd1lRZE5vczBUenFsM2VpMUVWOWo/cD1pbmZvKSlcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiB2YXIgaW5qZWN0b3IgPSBJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKFtcbiAqICAgcHJvdmlkZShcIm9uZVwiLCB7dXNlRmFjdG9yeTogKHR3bykgPT4gXCJ0d29cIiwgZGVwczogW1tuZXcgSW5qZWN0KFwidHdvXCIpXV19KSxcbiAqICAgcHJvdmlkZShcInR3b1wiLCB7dXNlRmFjdG9yeTogKG9uZSkgPT4gXCJvbmVcIiwgZGVwczogW1tuZXcgSW5qZWN0KFwib25lXCIpXV19KVxuICogXSk7XG4gKlxuICogZXhwZWN0KCgpID0+IGluamVjdG9yLmdldChcIm9uZVwiKSkudG9UaHJvd0Vycm9yKCk7XG4gKiBgYGBcbiAqXG4gKiBSZXRyaWV2aW5nIGBBYCBvciBgQmAgdGhyb3dzIGEgYEN5Y2xpY0RlcGVuZGVuY3lFcnJvcmAgYXMgdGhlIGdyYXBoIGFib3ZlIGNhbm5vdCBiZSBjb25zdHJ1Y3RlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIEN5Y2xpY0RlcGVuZGVuY3lFcnJvciBleHRlbmRzIEFic3RyYWN0UHJvdmlkZXJFcnJvciB7XG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3Rvciwga2V5OiBLZXkpIHtcbiAgICBzdXBlcihpbmplY3Rvciwga2V5LCBmdW5jdGlvbihrZXlzOiBhbnlbXSkge1xuICAgICAgcmV0dXJuIGBDYW5ub3QgaW5zdGFudGlhdGUgY3ljbGljIGRlcGVuZGVuY3khJHtjb25zdHJ1Y3RSZXNvbHZpbmdQYXRoKGtleXMpfWA7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBUaHJvd24gd2hlbiBhIGNvbnN0cnVjdGluZyB0eXBlIHJldHVybnMgd2l0aCBhbiBFcnJvci5cbiAqXG4gKiBUaGUgYEluc3RhbnRpYXRpb25FcnJvcmAgY2xhc3MgY29udGFpbnMgdGhlIG9yaWdpbmFsIGVycm9yIHBsdXMgdGhlIGRlcGVuZGVuY3kgZ3JhcGggd2hpY2ggY2F1c2VkXG4gKiB0aGlzIG9iamVjdCB0byBiZSBpbnN0YW50aWF0ZWQuXG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0LzdhV1lkY3FUUXNQMGVOcUVkVUFmP3A9cHJldmlldykpXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogY2xhc3MgQSB7XG4gKiAgIGNvbnN0cnVjdG9yKCkge1xuICogICAgIHRocm93IG5ldyBFcnJvcignbWVzc2FnZScpO1xuICogICB9XG4gKiB9XG4gKlxuICogdmFyIGluamVjdG9yID0gSW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZShbQV0pO1xuXG4gKiB0cnkge1xuICogICBpbmplY3Rvci5nZXQoQSk7XG4gKiB9IGNhdGNoIChlKSB7XG4gKiAgIGV4cGVjdChlIGluc3RhbmNlb2YgSW5zdGFudGlhdGlvbkVycm9yKS50b0JlKHRydWUpO1xuICogICBleHBlY3QoZS5vcmlnaW5hbEV4Y2VwdGlvbi5tZXNzYWdlKS50b0VxdWFsKFwibWVzc2FnZVwiKTtcbiAqICAgZXhwZWN0KGUub3JpZ2luYWxTdGFjaykudG9CZURlZmluZWQoKTtcbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgY2xhc3MgSW5zdGFudGlhdGlvbkVycm9yIGV4dGVuZHMgV3JhcHBlZEV4Y2VwdGlvbiB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAga2V5czogS2V5W107XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBpbmplY3RvcnM6IEluamVjdG9yW107XG5cbiAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yLCBvcmlnaW5hbEV4Y2VwdGlvbiwgb3JpZ2luYWxTdGFjaywga2V5OiBLZXkpIHtcbiAgICBzdXBlcihcIkRJIEV4Y2VwdGlvblwiLCBvcmlnaW5hbEV4Y2VwdGlvbiwgb3JpZ2luYWxTdGFjaywgbnVsbCk7XG4gICAgdGhpcy5rZXlzID0gW2tleV07XG4gICAgdGhpcy5pbmplY3RvcnMgPSBbaW5qZWN0b3JdO1xuICB9XG5cbiAgYWRkS2V5KGluamVjdG9yOiBJbmplY3Rvciwga2V5OiBLZXkpOiB2b2lkIHtcbiAgICB0aGlzLmluamVjdG9ycy5wdXNoKGluamVjdG9yKTtcbiAgICB0aGlzLmtleXMucHVzaChrZXkpO1xuICB9XG5cbiAgZ2V0IHdyYXBwZXJNZXNzYWdlKCk6IHN0cmluZyB7XG4gICAgdmFyIGZpcnN0ID0gc3RyaW5naWZ5KExpc3RXcmFwcGVyLmZpcnN0KHRoaXMua2V5cykudG9rZW4pO1xuICAgIHJldHVybiBgRXJyb3IgZHVyaW5nIGluc3RhbnRpYXRpb24gb2YgJHtmaXJzdH0hJHtjb25zdHJ1Y3RSZXNvbHZpbmdQYXRoKHRoaXMua2V5cyl9LmA7XG4gIH1cblxuICBnZXQgY2F1c2VLZXkoKTogS2V5IHsgcmV0dXJuIHRoaXMua2V5c1swXTsgfVxuXG4gIGdldCBjb250ZXh0KCkgeyByZXR1cm4gdGhpcy5pbmplY3RvcnNbdGhpcy5pbmplY3RvcnMubGVuZ3RoIC0gMV0uZGVidWdDb250ZXh0KCk7IH1cbn1cblxuLyoqXG4gKiBUaHJvd24gd2hlbiBhbiBvYmplY3Qgb3RoZXIgdGhlbiB7QGxpbmsgUHJvdmlkZXJ9IChvciBgVHlwZWApIGlzIHBhc3NlZCB0byB7QGxpbmsgSW5qZWN0b3J9XG4gKiBjcmVhdGlvbi5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvWWF0Q0ZiUEFNQ0wwSlNTUTRtdkg/cD1wcmV2aWV3KSlcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBleHBlY3QoKCkgPT4gSW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZShbXCJub3QgYSB0eXBlXCJdKSkudG9UaHJvd0Vycm9yKCk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNsYXNzIEludmFsaWRQcm92aWRlckVycm9yIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHByb3ZpZGVyKSB7XG4gICAgc3VwZXIoXCJJbnZhbGlkIHByb3ZpZGVyIC0gb25seSBpbnN0YW5jZXMgb2YgUHJvdmlkZXIgYW5kIFR5cGUgYXJlIGFsbG93ZWQsIGdvdDogXCIgK1xuICAgICAgICAgIHByb3ZpZGVyLnRvU3RyaW5nKCkpO1xuICB9XG59XG5cbi8qKlxuICogVGhyb3duIHdoZW4gdGhlIGNsYXNzIGhhcyBubyBhbm5vdGF0aW9uIGluZm9ybWF0aW9uLlxuICpcbiAqIExhY2sgb2YgYW5ub3RhdGlvbiBpbmZvcm1hdGlvbiBwcmV2ZW50cyB0aGUge0BsaW5rIEluamVjdG9yfSBmcm9tIGRldGVybWluaW5nIHdoaWNoIGRlcGVuZGVuY2llc1xuICogbmVlZCB0byBiZSBpbmplY3RlZCBpbnRvIHRoZSBjb25zdHJ1Y3Rvci5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvckhuWnRsTlM3dkpPUFE2cGNWa20/cD1wcmV2aWV3KSlcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjbGFzcyBBIHtcbiAqICAgY29uc3RydWN0b3IoYikge31cbiAqIH1cbiAqXG4gKiBleHBlY3QoKCkgPT4gSW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZShbQV0pKS50b1Rocm93RXJyb3IoKTtcbiAqIGBgYFxuICpcbiAqIFRoaXMgZXJyb3IgaXMgYWxzbyB0aHJvd24gd2hlbiB0aGUgY2xhc3Mgbm90IG1hcmtlZCB3aXRoIHtAbGluayBJbmplY3RhYmxlfSBoYXMgcGFyYW1ldGVyIHR5cGVzLlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNsYXNzIEIge31cbiAqXG4gKiBjbGFzcyBBIHtcbiAqICAgY29uc3RydWN0b3IoYjpCKSB7fSAvLyBubyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgcGFyYW1ldGVyIHR5cGVzIG9mIEEgaXMgYXZhaWxhYmxlIGF0IHJ1bnRpbWUuXG4gKiB9XG4gKlxuICogZXhwZWN0KCgpID0+IEluamVjdG9yLnJlc29sdmVBbmRDcmVhdGUoW0EsQl0pKS50b1Rocm93RXJyb3IoKTtcbiAqIGBgYFxuICovXG5leHBvcnQgY2xhc3MgTm9Bbm5vdGF0aW9uRXJyb3IgZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IodHlwZU9yRnVuYywgcGFyYW1zOiBhbnlbXVtdKSB7XG4gICAgc3VwZXIoTm9Bbm5vdGF0aW9uRXJyb3IuX2dlbk1lc3NhZ2UodHlwZU9yRnVuYywgcGFyYW1zKSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfZ2VuTWVzc2FnZSh0eXBlT3JGdW5jLCBwYXJhbXM6IGFueVtdW10pIHtcbiAgICB2YXIgc2lnbmF0dXJlID0gW107XG4gICAgZm9yICh2YXIgaSA9IDAsIGlpID0gcGFyYW1zLmxlbmd0aDsgaSA8IGlpOyBpKyspIHtcbiAgICAgIHZhciBwYXJhbWV0ZXIgPSBwYXJhbXNbaV07XG4gICAgICBpZiAoaXNCbGFuayhwYXJhbWV0ZXIpIHx8IHBhcmFtZXRlci5sZW5ndGggPT0gMCkge1xuICAgICAgICBzaWduYXR1cmUucHVzaCgnPycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2lnbmF0dXJlLnB1c2gocGFyYW1ldGVyLm1hcChzdHJpbmdpZnkpLmpvaW4oJyAnKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBcIkNhbm5vdCByZXNvbHZlIGFsbCBwYXJhbWV0ZXJzIGZvciAnXCIgKyBzdHJpbmdpZnkodHlwZU9yRnVuYykgKyBcIicoXCIgK1xuICAgICAgICAgICBzaWduYXR1cmUuam9pbignLCAnKSArIFwiKS4gXCIgK1xuICAgICAgICAgICBcIk1ha2Ugc3VyZSB0aGF0IGFsbCB0aGUgcGFyYW1ldGVycyBhcmUgZGVjb3JhdGVkIHdpdGggSW5qZWN0IG9yIGhhdmUgdmFsaWQgdHlwZSBhbm5vdGF0aW9ucyBhbmQgdGhhdCAnXCIgK1xuICAgICAgICAgICBzdHJpbmdpZnkodHlwZU9yRnVuYykgKyBcIicgaXMgZGVjb3JhdGVkIHdpdGggSW5qZWN0YWJsZS5cIjtcbiAgfVxufVxuXG4vKipcbiAqIFRocm93biB3aGVuIGdldHRpbmcgYW4gb2JqZWN0IGJ5IGluZGV4LlxuICpcbiAqICMjIyBFeGFtcGxlIChbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC9iUnMwU1gyT1RRaUp6cXZqZ2w4UD9wPXByZXZpZXcpKVxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNsYXNzIEEge31cbiAqXG4gKiB2YXIgaW5qZWN0b3IgPSBJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKFtBXSk7XG4gKlxuICogZXhwZWN0KCgpID0+IGluamVjdG9yLmdldEF0KDEwMCkpLnRvVGhyb3dFcnJvcigpO1xuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBPdXRPZkJvdW5kc0Vycm9yIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKGluZGV4KSB7IHN1cGVyKGBJbmRleCAke2luZGV4fSBpcyBvdXQtb2YtYm91bmRzLmApOyB9XG59XG5cbi8vIFRPRE86IGFkZCBhIHdvcmtpbmcgZXhhbXBsZSBhZnRlciBhbHBoYTM4IGlzIHJlbGVhc2VkXG4vKipcbiAqIFRocm93biB3aGVuIGEgbXVsdGkgcHJvdmlkZXIgYW5kIGEgcmVndWxhciBwcm92aWRlciBhcmUgYm91bmQgdG8gdGhlIHNhbWUgdG9rZW4uXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBleHBlY3QoKCkgPT4gSW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZShbXG4gKiAgIG5ldyBQcm92aWRlcihcIlN0cmluZ3NcIiwge3VzZVZhbHVlOiBcInN0cmluZzFcIiwgbXVsdGk6IHRydWV9KSxcbiAqICAgbmV3IFByb3ZpZGVyKFwiU3RyaW5nc1wiLCB7dXNlVmFsdWU6IFwic3RyaW5nMlwiLCBtdWx0aTogZmFsc2V9KVxuICogXSkpLnRvVGhyb3dFcnJvcigpO1xuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBNaXhpbmdNdWx0aVByb3ZpZGVyc1dpdGhSZWd1bGFyUHJvdmlkZXJzRXJyb3IgZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IocHJvdmlkZXIxLCBwcm92aWRlcjIpIHtcbiAgICBzdXBlcihcIkNhbm5vdCBtaXggbXVsdGkgcHJvdmlkZXJzIGFuZCByZWd1bGFyIHByb3ZpZGVycywgZ290OiBcIiArIHByb3ZpZGVyMS50b1N0cmluZygpICsgXCIgXCIgK1xuICAgICAgICAgIHByb3ZpZGVyMi50b1N0cmluZygpKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
