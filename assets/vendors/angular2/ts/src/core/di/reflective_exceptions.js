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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2RpL3JlZmxlY3RpdmVfZXhjZXB0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBTUEsOEJBQThCLElBQVc7UUFDdkMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDckMsRUFBRSxDQUFDLENBQUMsd0JBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUNiLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLENBQUM7UUFDSCxDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRCxnQ0FBZ0MsSUFBVztRQUN6QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxRQUFRLEdBQUcsb0JBQW9CLENBQUMsd0JBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNoRSxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsZ0JBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQWxCLENBQWtCLENBQUMsQ0FBQztZQUN0RCxNQUFNLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFB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QUssdUJBQW9CLENBQUMsQ0FBQztnQkFBQyxDQUFDO2dCQUNuRSx1QkFBQztZQUFELENBRkEsQUFFQyxDQUZxQywwQkFBYSxHQUVsRDtZQUZELCtDQUVDLENBQUE7WUFFRCx3REFBd0Q7WUFDeEQ7Ozs7Ozs7Ozs7O2VBV0c7WUFDSDtnQkFBbUUsaUVBQWE7Z0JBQzlFLHVEQUFZLFNBQVMsRUFBRSxTQUFTO29CQUM5QixrQkFBTSx5REFBeUQsR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFFLEdBQUcsR0FBRzt3QkFDdEYsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQzlCLENBQUM7Z0JBQ0gsb0RBQUM7WUFBRCxDQUxBLEFBS0MsQ0FMa0UsMEJBQWEsR0FLL0U7WUFMRCx5R0FLQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2RpL3JlZmxlY3RpdmVfZXhjZXB0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TGlzdFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge3N0cmluZ2lmeSwgaXNCbGFua30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbiwgV3JhcHBlZEV4Y2VwdGlvbiwgdW5pbXBsZW1lbnRlZH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7UmVmbGVjdGl2ZUtleX0gZnJvbSAnLi9yZWZsZWN0aXZlX2tleSc7XG5pbXBvcnQge1JlZmxlY3RpdmVJbmplY3Rvcn0gZnJvbSAnLi9yZWZsZWN0aXZlX2luamVjdG9yJztcblxuZnVuY3Rpb24gZmluZEZpcnN0Q2xvc2VkQ3ljbGUoa2V5czogYW55W10pOiBhbnlbXSB7XG4gIHZhciByZXMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKExpc3RXcmFwcGVyLmNvbnRhaW5zKHJlcywga2V5c1tpXSkpIHtcbiAgICAgIHJlcy5wdXNoKGtleXNbaV0pO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzLnB1c2goa2V5c1tpXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdFJlc29sdmluZ1BhdGgoa2V5czogYW55W10pOiBzdHJpbmcge1xuICBpZiAoa2V5cy5sZW5ndGggPiAxKSB7XG4gICAgdmFyIHJldmVyc2VkID0gZmluZEZpcnN0Q2xvc2VkQ3ljbGUoTGlzdFdyYXBwZXIucmV2ZXJzZWQoa2V5cykpO1xuICAgIHZhciB0b2tlblN0cnMgPSByZXZlcnNlZC5tYXAoayA9PiBzdHJpbmdpZnkoay50b2tlbikpO1xuICAgIHJldHVybiBcIiAoXCIgKyB0b2tlblN0cnMuam9pbignIC0+ICcpICsgXCIpXCI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cbn1cblxuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIGFsbCBlcnJvcnMgYXJpc2luZyBmcm9tIG1pc2NvbmZpZ3VyZWQgcHJvdmlkZXJzLlxuICovXG5leHBvcnQgY2xhc3MgQWJzdHJhY3RQcm92aWRlckVycm9yIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgbWVzc2FnZTogc3RyaW5nO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAga2V5czogUmVmbGVjdGl2ZUtleVtdO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgaW5qZWN0b3JzOiBSZWZsZWN0aXZlSW5qZWN0b3JbXTtcblxuICAvKiogQGludGVybmFsICovXG4gIGNvbnN0cnVjdFJlc29sdmluZ01lc3NhZ2U6IEZ1bmN0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBSZWZsZWN0aXZlSW5qZWN0b3IsIGtleTogUmVmbGVjdGl2ZUtleSxcbiAgICAgICAgICAgICAgY29uc3RydWN0UmVzb2x2aW5nTWVzc2FnZTogRnVuY3Rpb24pIHtcbiAgICBzdXBlcihcIkRJIEV4Y2VwdGlvblwiKTtcbiAgICB0aGlzLmtleXMgPSBba2V5XTtcbiAgICB0aGlzLmluamVjdG9ycyA9IFtpbmplY3Rvcl07XG4gICAgdGhpcy5jb25zdHJ1Y3RSZXNvbHZpbmdNZXNzYWdlID0gY29uc3RydWN0UmVzb2x2aW5nTWVzc2FnZTtcbiAgICB0aGlzLm1lc3NhZ2UgPSB0aGlzLmNvbnN0cnVjdFJlc29sdmluZ01lc3NhZ2UodGhpcy5rZXlzKTtcbiAgfVxuXG4gIGFkZEtleShpbmplY3RvcjogUmVmbGVjdGl2ZUluamVjdG9yLCBrZXk6IFJlZmxlY3RpdmVLZXkpOiB2b2lkIHtcbiAgICB0aGlzLmluamVjdG9ycy5wdXNoKGluamVjdG9yKTtcbiAgICB0aGlzLmtleXMucHVzaChrZXkpO1xuICAgIHRoaXMubWVzc2FnZSA9IHRoaXMuY29uc3RydWN0UmVzb2x2aW5nTWVzc2FnZSh0aGlzLmtleXMpO1xuICB9XG5cbiAgZ2V0IGNvbnRleHQoKSB7IHJldHVybiB0aGlzLmluamVjdG9yc1t0aGlzLmluamVjdG9ycy5sZW5ndGggLSAxXS5kZWJ1Z0NvbnRleHQoKTsgfVxufVxuXG4vKipcbiAqIFRocm93biB3aGVuIHRyeWluZyB0byByZXRyaWV2ZSBhIGRlcGVuZGVuY3kgYnkgYEtleWAgZnJvbSB7QGxpbmsgSW5qZWN0b3J9LCBidXQgdGhlXG4gKiB7QGxpbmsgSW5qZWN0b3J9IGRvZXMgbm90IGhhdmUgYSB7QGxpbmsgUHJvdmlkZXJ9IGZvciB7QGxpbmsgS2V5fS5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvdnE4RDNGUkI5YUdibldKcXRFUEU/cD1wcmV2aWV3KSlcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjbGFzcyBBIHtcbiAqICAgY29uc3RydWN0b3IoYjpCKSB7fVxuICogfVxuICpcbiAqIGV4cGVjdCgoKSA9PiBJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKFtBXSkpLnRvVGhyb3dFcnJvcigpO1xuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBOb1Byb3ZpZGVyRXJyb3IgZXh0ZW5kcyBBYnN0cmFjdFByb3ZpZGVyRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihpbmplY3RvcjogUmVmbGVjdGl2ZUluamVjdG9yLCBrZXk6IFJlZmxlY3RpdmVLZXkpIHtcbiAgICBzdXBlcihpbmplY3Rvciwga2V5LCBmdW5jdGlvbihrZXlzOiBhbnlbXSkge1xuICAgICAgdmFyIGZpcnN0ID0gc3RyaW5naWZ5KExpc3RXcmFwcGVyLmZpcnN0KGtleXMpLnRva2VuKTtcbiAgICAgIHJldHVybiBgTm8gcHJvdmlkZXIgZm9yICR7Zmlyc3R9ISR7Y29uc3RydWN0UmVzb2x2aW5nUGF0aChrZXlzKX1gO1xuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogVGhyb3duIHdoZW4gZGVwZW5kZW5jaWVzIGZvcm0gYSBjeWNsZS5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvd1lRZE5vczBUenFsM2VpMUVWOWo/cD1pbmZvKSlcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiB2YXIgaW5qZWN0b3IgPSBJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKFtcbiAqICAgcHJvdmlkZShcIm9uZVwiLCB7dXNlRmFjdG9yeTogKHR3bykgPT4gXCJ0d29cIiwgZGVwczogW1tuZXcgSW5qZWN0KFwidHdvXCIpXV19KSxcbiAqICAgcHJvdmlkZShcInR3b1wiLCB7dXNlRmFjdG9yeTogKG9uZSkgPT4gXCJvbmVcIiwgZGVwczogW1tuZXcgSW5qZWN0KFwib25lXCIpXV19KVxuICogXSk7XG4gKlxuICogZXhwZWN0KCgpID0+IGluamVjdG9yLmdldChcIm9uZVwiKSkudG9UaHJvd0Vycm9yKCk7XG4gKiBgYGBcbiAqXG4gKiBSZXRyaWV2aW5nIGBBYCBvciBgQmAgdGhyb3dzIGEgYEN5Y2xpY0RlcGVuZGVuY3lFcnJvcmAgYXMgdGhlIGdyYXBoIGFib3ZlIGNhbm5vdCBiZSBjb25zdHJ1Y3RlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIEN5Y2xpY0RlcGVuZGVuY3lFcnJvciBleHRlbmRzIEFic3RyYWN0UHJvdmlkZXJFcnJvciB7XG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBSZWZsZWN0aXZlSW5qZWN0b3IsIGtleTogUmVmbGVjdGl2ZUtleSkge1xuICAgIHN1cGVyKGluamVjdG9yLCBrZXksIGZ1bmN0aW9uKGtleXM6IGFueVtdKSB7XG4gICAgICByZXR1cm4gYENhbm5vdCBpbnN0YW50aWF0ZSBjeWNsaWMgZGVwZW5kZW5jeSEke2NvbnN0cnVjdFJlc29sdmluZ1BhdGgoa2V5cyl9YDtcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIFRocm93biB3aGVuIGEgY29uc3RydWN0aW5nIHR5cGUgcmV0dXJucyB3aXRoIGFuIEVycm9yLlxuICpcbiAqIFRoZSBgSW5zdGFudGlhdGlvbkVycm9yYCBjbGFzcyBjb250YWlucyB0aGUgb3JpZ2luYWwgZXJyb3IgcGx1cyB0aGUgZGVwZW5kZW5jeSBncmFwaCB3aGljaCBjYXVzZWRcbiAqIHRoaXMgb2JqZWN0IHRvIGJlIGluc3RhbnRpYXRlZC5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvN2FXWWRjcVRRc1AwZU5xRWRVQWY/cD1wcmV2aWV3KSlcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjbGFzcyBBIHtcbiAqICAgY29uc3RydWN0b3IoKSB7XG4gKiAgICAgdGhyb3cgbmV3IEVycm9yKCdtZXNzYWdlJyk7XG4gKiAgIH1cbiAqIH1cbiAqXG4gKiB2YXIgaW5qZWN0b3IgPSBJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKFtBXSk7XG5cbiAqIHRyeSB7XG4gKiAgIGluamVjdG9yLmdldChBKTtcbiAqIH0gY2F0Y2ggKGUpIHtcbiAqICAgZXhwZWN0KGUgaW5zdGFuY2VvZiBJbnN0YW50aWF0aW9uRXJyb3IpLnRvQmUodHJ1ZSk7XG4gKiAgIGV4cGVjdChlLm9yaWdpbmFsRXhjZXB0aW9uLm1lc3NhZ2UpLnRvRXF1YWwoXCJtZXNzYWdlXCIpO1xuICogICBleHBlY3QoZS5vcmlnaW5hbFN0YWNrKS50b0JlRGVmaW5lZCgpO1xuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBJbnN0YW50aWF0aW9uRXJyb3IgZXh0ZW5kcyBXcmFwcGVkRXhjZXB0aW9uIHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBrZXlzOiBSZWZsZWN0aXZlS2V5W107XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBpbmplY3RvcnM6IFJlZmxlY3RpdmVJbmplY3RvcltdO1xuXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBSZWZsZWN0aXZlSW5qZWN0b3IsIG9yaWdpbmFsRXhjZXB0aW9uLCBvcmlnaW5hbFN0YWNrLCBrZXk6IFJlZmxlY3RpdmVLZXkpIHtcbiAgICBzdXBlcihcIkRJIEV4Y2VwdGlvblwiLCBvcmlnaW5hbEV4Y2VwdGlvbiwgb3JpZ2luYWxTdGFjaywgbnVsbCk7XG4gICAgdGhpcy5rZXlzID0gW2tleV07XG4gICAgdGhpcy5pbmplY3RvcnMgPSBbaW5qZWN0b3JdO1xuICB9XG5cbiAgYWRkS2V5KGluamVjdG9yOiBSZWZsZWN0aXZlSW5qZWN0b3IsIGtleTogUmVmbGVjdGl2ZUtleSk6IHZvaWQge1xuICAgIHRoaXMuaW5qZWN0b3JzLnB1c2goaW5qZWN0b3IpO1xuICAgIHRoaXMua2V5cy5wdXNoKGtleSk7XG4gIH1cblxuICBnZXQgd3JhcHBlck1lc3NhZ2UoKTogc3RyaW5nIHtcbiAgICB2YXIgZmlyc3QgPSBzdHJpbmdpZnkoTGlzdFdyYXBwZXIuZmlyc3QodGhpcy5rZXlzKS50b2tlbik7XG4gICAgcmV0dXJuIGBFcnJvciBkdXJpbmcgaW5zdGFudGlhdGlvbiBvZiAke2ZpcnN0fSEke2NvbnN0cnVjdFJlc29sdmluZ1BhdGgodGhpcy5rZXlzKX0uYDtcbiAgfVxuXG4gIGdldCBjYXVzZUtleSgpOiBSZWZsZWN0aXZlS2V5IHsgcmV0dXJuIHRoaXMua2V5c1swXTsgfVxuXG4gIGdldCBjb250ZXh0KCkgeyByZXR1cm4gdGhpcy5pbmplY3RvcnNbdGhpcy5pbmplY3RvcnMubGVuZ3RoIC0gMV0uZGVidWdDb250ZXh0KCk7IH1cbn1cblxuLyoqXG4gKiBUaHJvd24gd2hlbiBhbiBvYmplY3Qgb3RoZXIgdGhlbiB7QGxpbmsgUHJvdmlkZXJ9IChvciBgVHlwZWApIGlzIHBhc3NlZCB0byB7QGxpbmsgSW5qZWN0b3J9XG4gKiBjcmVhdGlvbi5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvWWF0Q0ZiUEFNQ0wwSlNTUTRtdkg/cD1wcmV2aWV3KSlcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBleHBlY3QoKCkgPT4gSW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZShbXCJub3QgYSB0eXBlXCJdKSkudG9UaHJvd0Vycm9yKCk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNsYXNzIEludmFsaWRQcm92aWRlckVycm9yIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHByb3ZpZGVyKSB7XG4gICAgc3VwZXIoXCJJbnZhbGlkIHByb3ZpZGVyIC0gb25seSBpbnN0YW5jZXMgb2YgUHJvdmlkZXIgYW5kIFR5cGUgYXJlIGFsbG93ZWQsIGdvdDogXCIgK1xuICAgICAgICAgIHByb3ZpZGVyLnRvU3RyaW5nKCkpO1xuICB9XG59XG5cbi8qKlxuICogVGhyb3duIHdoZW4gdGhlIGNsYXNzIGhhcyBubyBhbm5vdGF0aW9uIGluZm9ybWF0aW9uLlxuICpcbiAqIExhY2sgb2YgYW5ub3RhdGlvbiBpbmZvcm1hdGlvbiBwcmV2ZW50cyB0aGUge0BsaW5rIEluamVjdG9yfSBmcm9tIGRldGVybWluaW5nIHdoaWNoIGRlcGVuZGVuY2llc1xuICogbmVlZCB0byBiZSBpbmplY3RlZCBpbnRvIHRoZSBjb25zdHJ1Y3Rvci5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvckhuWnRsTlM3dkpPUFE2cGNWa20/cD1wcmV2aWV3KSlcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjbGFzcyBBIHtcbiAqICAgY29uc3RydWN0b3IoYikge31cbiAqIH1cbiAqXG4gKiBleHBlY3QoKCkgPT4gSW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZShbQV0pKS50b1Rocm93RXJyb3IoKTtcbiAqIGBgYFxuICpcbiAqIFRoaXMgZXJyb3IgaXMgYWxzbyB0aHJvd24gd2hlbiB0aGUgY2xhc3Mgbm90IG1hcmtlZCB3aXRoIHtAbGluayBJbmplY3RhYmxlfSBoYXMgcGFyYW1ldGVyIHR5cGVzLlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNsYXNzIEIge31cbiAqXG4gKiBjbGFzcyBBIHtcbiAqICAgY29uc3RydWN0b3IoYjpCKSB7fSAvLyBubyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgcGFyYW1ldGVyIHR5cGVzIG9mIEEgaXMgYXZhaWxhYmxlIGF0IHJ1bnRpbWUuXG4gKiB9XG4gKlxuICogZXhwZWN0KCgpID0+IEluamVjdG9yLnJlc29sdmVBbmRDcmVhdGUoW0EsQl0pKS50b1Rocm93RXJyb3IoKTtcbiAqIGBgYFxuICovXG5leHBvcnQgY2xhc3MgTm9Bbm5vdGF0aW9uRXJyb3IgZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IodHlwZU9yRnVuYywgcGFyYW1zOiBhbnlbXVtdKSB7XG4gICAgc3VwZXIoTm9Bbm5vdGF0aW9uRXJyb3IuX2dlbk1lc3NhZ2UodHlwZU9yRnVuYywgcGFyYW1zKSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfZ2VuTWVzc2FnZSh0eXBlT3JGdW5jLCBwYXJhbXM6IGFueVtdW10pIHtcbiAgICB2YXIgc2lnbmF0dXJlID0gW107XG4gICAgZm9yICh2YXIgaSA9IDAsIGlpID0gcGFyYW1zLmxlbmd0aDsgaSA8IGlpOyBpKyspIHtcbiAgICAgIHZhciBwYXJhbWV0ZXIgPSBwYXJhbXNbaV07XG4gICAgICBpZiAoaXNCbGFuayhwYXJhbWV0ZXIpIHx8IHBhcmFtZXRlci5sZW5ndGggPT0gMCkge1xuICAgICAgICBzaWduYXR1cmUucHVzaCgnPycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2lnbmF0dXJlLnB1c2gocGFyYW1ldGVyLm1hcChzdHJpbmdpZnkpLmpvaW4oJyAnKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBcIkNhbm5vdCByZXNvbHZlIGFsbCBwYXJhbWV0ZXJzIGZvciAnXCIgKyBzdHJpbmdpZnkodHlwZU9yRnVuYykgKyBcIicoXCIgK1xuICAgICAgICAgICBzaWduYXR1cmUuam9pbignLCAnKSArIFwiKS4gXCIgK1xuICAgICAgICAgICBcIk1ha2Ugc3VyZSB0aGF0IGFsbCB0aGUgcGFyYW1ldGVycyBhcmUgZGVjb3JhdGVkIHdpdGggSW5qZWN0IG9yIGhhdmUgdmFsaWQgdHlwZSBhbm5vdGF0aW9ucyBhbmQgdGhhdCAnXCIgK1xuICAgICAgICAgICBzdHJpbmdpZnkodHlwZU9yRnVuYykgKyBcIicgaXMgZGVjb3JhdGVkIHdpdGggSW5qZWN0YWJsZS5cIjtcbiAgfVxufVxuXG4vKipcbiAqIFRocm93biB3aGVuIGdldHRpbmcgYW4gb2JqZWN0IGJ5IGluZGV4LlxuICpcbiAqICMjIyBFeGFtcGxlIChbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC9iUnMwU1gyT1RRaUp6cXZqZ2w4UD9wPXByZXZpZXcpKVxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNsYXNzIEEge31cbiAqXG4gKiB2YXIgaW5qZWN0b3IgPSBJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKFtBXSk7XG4gKlxuICogZXhwZWN0KCgpID0+IGluamVjdG9yLmdldEF0KDEwMCkpLnRvVGhyb3dFcnJvcigpO1xuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBPdXRPZkJvdW5kc0Vycm9yIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKGluZGV4KSB7IHN1cGVyKGBJbmRleCAke2luZGV4fSBpcyBvdXQtb2YtYm91bmRzLmApOyB9XG59XG5cbi8vIFRPRE86IGFkZCBhIHdvcmtpbmcgZXhhbXBsZSBhZnRlciBhbHBoYTM4IGlzIHJlbGVhc2VkXG4vKipcbiAqIFRocm93biB3aGVuIGEgbXVsdGkgcHJvdmlkZXIgYW5kIGEgcmVndWxhciBwcm92aWRlciBhcmUgYm91bmQgdG8gdGhlIHNhbWUgdG9rZW4uXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBleHBlY3QoKCkgPT4gSW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZShbXG4gKiAgIG5ldyBQcm92aWRlcihcIlN0cmluZ3NcIiwge3VzZVZhbHVlOiBcInN0cmluZzFcIiwgbXVsdGk6IHRydWV9KSxcbiAqICAgbmV3IFByb3ZpZGVyKFwiU3RyaW5nc1wiLCB7dXNlVmFsdWU6IFwic3RyaW5nMlwiLCBtdWx0aTogZmFsc2V9KVxuICogXSkpLnRvVGhyb3dFcnJvcigpO1xuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBNaXhpbmdNdWx0aVByb3ZpZGVyc1dpdGhSZWd1bGFyUHJvdmlkZXJzRXJyb3IgZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IocHJvdmlkZXIxLCBwcm92aWRlcjIpIHtcbiAgICBzdXBlcihcIkNhbm5vdCBtaXggbXVsdGkgcHJvdmlkZXJzIGFuZCByZWd1bGFyIHByb3ZpZGVycywgZ290OiBcIiArIHByb3ZpZGVyMS50b1N0cmluZygpICsgXCIgXCIgK1xuICAgICAgICAgIHByb3ZpZGVyMi50b1N0cmluZygpKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
