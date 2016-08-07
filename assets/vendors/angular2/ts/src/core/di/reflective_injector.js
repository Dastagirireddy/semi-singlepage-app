System.register(['angular2/src/facade/collection', './reflective_provider', './reflective_exceptions', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions', './reflective_key', './metadata', './injector'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var collection_1, reflective_provider_1, reflective_exceptions_1, lang_1, exceptions_1, reflective_key_1, metadata_1, injector_1;
    var __unused, _MAX_CONSTRUCTION_COUNTER, UNDEFINED, ReflectiveProtoInjectorInlineStrategy, ReflectiveProtoInjectorDynamicStrategy, ReflectiveProtoInjector, ReflectiveInjectorInlineStrategy, ReflectiveInjectorDynamicStrategy, ReflectiveInjector, ReflectiveInjector_, INJECTOR_KEY;
    function _mapProviders(injector, fn) {
        var res = [];
        for (var i = 0; i < injector._proto.numberOfProviders; ++i) {
            res.push(fn(injector._proto.getProviderAtIndex(i)));
        }
        return res;
    }
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (reflective_provider_1_1) {
                reflective_provider_1 = reflective_provider_1_1;
            },
            function (reflective_exceptions_1_1) {
                reflective_exceptions_1 = reflective_exceptions_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (reflective_key_1_1) {
                reflective_key_1 = reflective_key_1_1;
            },
            function (metadata_1_1) {
                metadata_1 = metadata_1_1;
            },
            function (injector_1_1) {
                injector_1 = injector_1_1;
            }],
        execute: function() {
             // avoid unused import when Type union types are erased
            // Threshold for the dynamic version
            _MAX_CONSTRUCTION_COUNTER = 10;
            UNDEFINED = lang_1.CONST_EXPR(new Object());
            ReflectiveProtoInjectorInlineStrategy = (function () {
                function ReflectiveProtoInjectorInlineStrategy(protoEI, providers) {
                    this.provider0 = null;
                    this.provider1 = null;
                    this.provider2 = null;
                    this.provider3 = null;
                    this.provider4 = null;
                    this.provider5 = null;
                    this.provider6 = null;
                    this.provider7 = null;
                    this.provider8 = null;
                    this.provider9 = null;
                    this.keyId0 = null;
                    this.keyId1 = null;
                    this.keyId2 = null;
                    this.keyId3 = null;
                    this.keyId4 = null;
                    this.keyId5 = null;
                    this.keyId6 = null;
                    this.keyId7 = null;
                    this.keyId8 = null;
                    this.keyId9 = null;
                    var length = providers.length;
                    if (length > 0) {
                        this.provider0 = providers[0];
                        this.keyId0 = providers[0].key.id;
                    }
                    if (length > 1) {
                        this.provider1 = providers[1];
                        this.keyId1 = providers[1].key.id;
                    }
                    if (length > 2) {
                        this.provider2 = providers[2];
                        this.keyId2 = providers[2].key.id;
                    }
                    if (length > 3) {
                        this.provider3 = providers[3];
                        this.keyId3 = providers[3].key.id;
                    }
                    if (length > 4) {
                        this.provider4 = providers[4];
                        this.keyId4 = providers[4].key.id;
                    }
                    if (length > 5) {
                        this.provider5 = providers[5];
                        this.keyId5 = providers[5].key.id;
                    }
                    if (length > 6) {
                        this.provider6 = providers[6];
                        this.keyId6 = providers[6].key.id;
                    }
                    if (length > 7) {
                        this.provider7 = providers[7];
                        this.keyId7 = providers[7].key.id;
                    }
                    if (length > 8) {
                        this.provider8 = providers[8];
                        this.keyId8 = providers[8].key.id;
                    }
                    if (length > 9) {
                        this.provider9 = providers[9];
                        this.keyId9 = providers[9].key.id;
                    }
                }
                ReflectiveProtoInjectorInlineStrategy.prototype.getProviderAtIndex = function (index) {
                    if (index == 0)
                        return this.provider0;
                    if (index == 1)
                        return this.provider1;
                    if (index == 2)
                        return this.provider2;
                    if (index == 3)
                        return this.provider3;
                    if (index == 4)
                        return this.provider4;
                    if (index == 5)
                        return this.provider5;
                    if (index == 6)
                        return this.provider6;
                    if (index == 7)
                        return this.provider7;
                    if (index == 8)
                        return this.provider8;
                    if (index == 9)
                        return this.provider9;
                    throw new reflective_exceptions_1.OutOfBoundsError(index);
                };
                ReflectiveProtoInjectorInlineStrategy.prototype.createInjectorStrategy = function (injector) {
                    return new ReflectiveInjectorInlineStrategy(injector, this);
                };
                return ReflectiveProtoInjectorInlineStrategy;
            }());
            exports_1("ReflectiveProtoInjectorInlineStrategy", ReflectiveProtoInjectorInlineStrategy);
            ReflectiveProtoInjectorDynamicStrategy = (function () {
                function ReflectiveProtoInjectorDynamicStrategy(protoInj, providers) {
                    this.providers = providers;
                    var len = providers.length;
                    this.keyIds = collection_1.ListWrapper.createFixedSize(len);
                    for (var i = 0; i < len; i++) {
                        this.keyIds[i] = providers[i].key.id;
                    }
                }
                ReflectiveProtoInjectorDynamicStrategy.prototype.getProviderAtIndex = function (index) {
                    if (index < 0 || index >= this.providers.length) {
                        throw new reflective_exceptions_1.OutOfBoundsError(index);
                    }
                    return this.providers[index];
                };
                ReflectiveProtoInjectorDynamicStrategy.prototype.createInjectorStrategy = function (ei) {
                    return new ReflectiveInjectorDynamicStrategy(this, ei);
                };
                return ReflectiveProtoInjectorDynamicStrategy;
            }());
            exports_1("ReflectiveProtoInjectorDynamicStrategy", ReflectiveProtoInjectorDynamicStrategy);
            ReflectiveProtoInjector = (function () {
                function ReflectiveProtoInjector(providers) {
                    this.numberOfProviders = providers.length;
                    this._strategy = providers.length > _MAX_CONSTRUCTION_COUNTER ?
                        new ReflectiveProtoInjectorDynamicStrategy(this, providers) :
                        new ReflectiveProtoInjectorInlineStrategy(this, providers);
                }
                ReflectiveProtoInjector.fromResolvedProviders = function (providers) {
                    return new ReflectiveProtoInjector(providers);
                };
                ReflectiveProtoInjector.prototype.getProviderAtIndex = function (index) {
                    return this._strategy.getProviderAtIndex(index);
                };
                return ReflectiveProtoInjector;
            }());
            exports_1("ReflectiveProtoInjector", ReflectiveProtoInjector);
            ReflectiveInjectorInlineStrategy = (function () {
                function ReflectiveInjectorInlineStrategy(injector, protoStrategy) {
                    this.injector = injector;
                    this.protoStrategy = protoStrategy;
                    this.obj0 = UNDEFINED;
                    this.obj1 = UNDEFINED;
                    this.obj2 = UNDEFINED;
                    this.obj3 = UNDEFINED;
                    this.obj4 = UNDEFINED;
                    this.obj5 = UNDEFINED;
                    this.obj6 = UNDEFINED;
                    this.obj7 = UNDEFINED;
                    this.obj8 = UNDEFINED;
                    this.obj9 = UNDEFINED;
                }
                ReflectiveInjectorInlineStrategy.prototype.resetConstructionCounter = function () { this.injector._constructionCounter = 0; };
                ReflectiveInjectorInlineStrategy.prototype.instantiateProvider = function (provider) {
                    return this.injector._new(provider);
                };
                ReflectiveInjectorInlineStrategy.prototype.getObjByKeyId = function (keyId) {
                    var p = this.protoStrategy;
                    var inj = this.injector;
                    if (p.keyId0 === keyId) {
                        if (this.obj0 === UNDEFINED) {
                            this.obj0 = inj._new(p.provider0);
                        }
                        return this.obj0;
                    }
                    if (p.keyId1 === keyId) {
                        if (this.obj1 === UNDEFINED) {
                            this.obj1 = inj._new(p.provider1);
                        }
                        return this.obj1;
                    }
                    if (p.keyId2 === keyId) {
                        if (this.obj2 === UNDEFINED) {
                            this.obj2 = inj._new(p.provider2);
                        }
                        return this.obj2;
                    }
                    if (p.keyId3 === keyId) {
                        if (this.obj3 === UNDEFINED) {
                            this.obj3 = inj._new(p.provider3);
                        }
                        return this.obj3;
                    }
                    if (p.keyId4 === keyId) {
                        if (this.obj4 === UNDEFINED) {
                            this.obj4 = inj._new(p.provider4);
                        }
                        return this.obj4;
                    }
                    if (p.keyId5 === keyId) {
                        if (this.obj5 === UNDEFINED) {
                            this.obj5 = inj._new(p.provider5);
                        }
                        return this.obj5;
                    }
                    if (p.keyId6 === keyId) {
                        if (this.obj6 === UNDEFINED) {
                            this.obj6 = inj._new(p.provider6);
                        }
                        return this.obj6;
                    }
                    if (p.keyId7 === keyId) {
                        if (this.obj7 === UNDEFINED) {
                            this.obj7 = inj._new(p.provider7);
                        }
                        return this.obj7;
                    }
                    if (p.keyId8 === keyId) {
                        if (this.obj8 === UNDEFINED) {
                            this.obj8 = inj._new(p.provider8);
                        }
                        return this.obj8;
                    }
                    if (p.keyId9 === keyId) {
                        if (this.obj9 === UNDEFINED) {
                            this.obj9 = inj._new(p.provider9);
                        }
                        return this.obj9;
                    }
                    return UNDEFINED;
                };
                ReflectiveInjectorInlineStrategy.prototype.getObjAtIndex = function (index) {
                    if (index == 0)
                        return this.obj0;
                    if (index == 1)
                        return this.obj1;
                    if (index == 2)
                        return this.obj2;
                    if (index == 3)
                        return this.obj3;
                    if (index == 4)
                        return this.obj4;
                    if (index == 5)
                        return this.obj5;
                    if (index == 6)
                        return this.obj6;
                    if (index == 7)
                        return this.obj7;
                    if (index == 8)
                        return this.obj8;
                    if (index == 9)
                        return this.obj9;
                    throw new reflective_exceptions_1.OutOfBoundsError(index);
                };
                ReflectiveInjectorInlineStrategy.prototype.getMaxNumberOfObjects = function () { return _MAX_CONSTRUCTION_COUNTER; };
                return ReflectiveInjectorInlineStrategy;
            }());
            exports_1("ReflectiveInjectorInlineStrategy", ReflectiveInjectorInlineStrategy);
            ReflectiveInjectorDynamicStrategy = (function () {
                function ReflectiveInjectorDynamicStrategy(protoStrategy, injector) {
                    this.protoStrategy = protoStrategy;
                    this.injector = injector;
                    this.objs = collection_1.ListWrapper.createFixedSize(protoStrategy.providers.length);
                    collection_1.ListWrapper.fill(this.objs, UNDEFINED);
                }
                ReflectiveInjectorDynamicStrategy.prototype.resetConstructionCounter = function () { this.injector._constructionCounter = 0; };
                ReflectiveInjectorDynamicStrategy.prototype.instantiateProvider = function (provider) {
                    return this.injector._new(provider);
                };
                ReflectiveInjectorDynamicStrategy.prototype.getObjByKeyId = function (keyId) {
                    var p = this.protoStrategy;
                    for (var i = 0; i < p.keyIds.length; i++) {
                        if (p.keyIds[i] === keyId) {
                            if (this.objs[i] === UNDEFINED) {
                                this.objs[i] = this.injector._new(p.providers[i]);
                            }
                            return this.objs[i];
                        }
                    }
                    return UNDEFINED;
                };
                ReflectiveInjectorDynamicStrategy.prototype.getObjAtIndex = function (index) {
                    if (index < 0 || index >= this.objs.length) {
                        throw new reflective_exceptions_1.OutOfBoundsError(index);
                    }
                    return this.objs[index];
                };
                ReflectiveInjectorDynamicStrategy.prototype.getMaxNumberOfObjects = function () { return this.objs.length; };
                return ReflectiveInjectorDynamicStrategy;
            }());
            exports_1("ReflectiveInjectorDynamicStrategy", ReflectiveInjectorDynamicStrategy);
            /**
             * A ReflectiveDependency injection container used for instantiating objects and resolving
             * dependencies.
             *
             * An `Injector` is a replacement for a `new` operator, which can automatically resolve the
             * constructor dependencies.
             *
             * In typical use, application code asks for the dependencies in the constructor and they are
             * resolved by the `Injector`.
             *
             * ### Example ([live demo](http://plnkr.co/edit/jzjec0?p=preview))
             *
             * The following example creates an `Injector` configured to create `Engine` and `Car`.
             *
             * ```typescript
             * @Injectable()
             * class Engine {
             * }
             *
             * @Injectable()
             * class Car {
             *   constructor(public engine:Engine) {}
             * }
             *
             * var injector = ReflectiveInjector.resolveAndCreate([Car, Engine]);
             * var car = injector.get(Car);
             * expect(car instanceof Car).toBe(true);
             * expect(car.engine instanceof Engine).toBe(true);
             * ```
             *
             * Notice, we don't use the `new` operator because we explicitly want to have the `Injector`
             * resolve all of the object's dependencies automatically.
             */
            ReflectiveInjector = (function () {
                function ReflectiveInjector() {
                }
                /**
                 * Turns an array of provider definitions into an array of resolved providers.
                 *
                 * A resolution is a process of flattening multiple nested arrays and converting individual
                 * providers into an array of {@link ResolvedReflectiveProvider}s.
                 *
                 * ### Example ([live demo](http://plnkr.co/edit/AiXTHi?p=preview))
                 *
                 * ```typescript
                 * @Injectable()
                 * class Engine {
                 * }
                 *
                 * @Injectable()
                 * class Car {
                 *   constructor(public engine:Engine) {}
                 * }
                 *
                 * var providers = ReflectiveInjector.resolve([Car, [[Engine]]]);
                 *
                 * expect(providers.length).toEqual(2);
                 *
                 * expect(providers[0] instanceof ResolvedReflectiveProvider).toBe(true);
                 * expect(providers[0].key.displayName).toBe("Car");
                 * expect(providers[0].dependencies.length).toEqual(1);
                 * expect(providers[0].factory).toBeDefined();
                 *
                 * expect(providers[1].key.displayName).toBe("Engine");
                 * });
                 * ```
                 *
                 * See {@link ReflectiveInjector#fromResolvedProviders} for more info.
                 */
                ReflectiveInjector.resolve = function (providers) {
                    return reflective_provider_1.resolveReflectiveProviders(providers);
                };
                /**
                 * Resolves an array of providers and creates an injector from those providers.
                 *
                 * The passed-in providers can be an array of `Type`, {@link Provider},
                 * or a recursive array of more providers.
                 *
                 * ### Example ([live demo](http://plnkr.co/edit/ePOccA?p=preview))
                 *
                 * ```typescript
                 * @Injectable()
                 * class Engine {
                 * }
                 *
                 * @Injectable()
                 * class Car {
                 *   constructor(public engine:Engine) {}
                 * }
                 *
                 * var injector = ReflectiveInjector.resolveAndCreate([Car, Engine]);
                 * expect(injector.get(Car) instanceof Car).toBe(true);
                 * ```
                 *
                 * This function is slower than the corresponding `fromResolvedProviders`
                 * because it needs to resolve the passed-in providers first.
                 * See {@link Injector#resolve} and {@link Injector#fromResolvedProviders}.
                 */
                ReflectiveInjector.resolveAndCreate = function (providers, parent) {
                    if (parent === void 0) { parent = null; }
                    var ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
                    return ReflectiveInjector.fromResolvedProviders(ResolvedReflectiveProviders, parent);
                };
                /**
                 * Creates an injector from previously resolved providers.
                 *
                 * This API is the recommended way to construct injectors in performance-sensitive parts.
                 *
                 * ### Example ([live demo](http://plnkr.co/edit/KrSMci?p=preview))
                 *
                 * ```typescript
                 * @Injectable()
                 * class Engine {
                 * }
                 *
                 * @Injectable()
                 * class Car {
                 *   constructor(public engine:Engine) {}
                 * }
                 *
                 * var providers = ReflectiveInjector.resolve([Car, Engine]);
                 * var injector = ReflectiveInjector.fromResolvedProviders(providers);
                 * expect(injector.get(Car) instanceof Car).toBe(true);
                 * ```
                 */
                ReflectiveInjector.fromResolvedProviders = function (providers, parent) {
                    if (parent === void 0) { parent = null; }
                    return new ReflectiveInjector_(ReflectiveProtoInjector.fromResolvedProviders(providers), parent);
                };
                /**
                 * @deprecated
                 */
                ReflectiveInjector.fromResolvedBindings = function (providers) {
                    return ReflectiveInjector.fromResolvedProviders(providers);
                };
                Object.defineProperty(ReflectiveInjector.prototype, "parent", {
                    /**
                     * Parent of this injector.
                     *
                     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
                     * -->
                     *
                     * ### Example ([live demo](http://plnkr.co/edit/eosMGo?p=preview))
                     *
                     * ```typescript
                     * var parent = ReflectiveInjector.resolveAndCreate([]);
                     * var child = parent.resolveAndCreateChild([]);
                     * expect(child.parent).toBe(parent);
                     * ```
                     */
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * @internal
                 */
                ReflectiveInjector.prototype.debugContext = function () { return null; };
                /**
                 * Resolves an array of providers and creates a child injector from those providers.
                 *
                 * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
                 * -->
                 *
                 * The passed-in providers can be an array of `Type`, {@link Provider},
                 * or a recursive array of more providers.
                 *
                 * ### Example ([live demo](http://plnkr.co/edit/opB3T4?p=preview))
                 *
                 * ```typescript
                 * class ParentProvider {}
                 * class ChildProvider {}
                 *
                 * var parent = ReflectiveInjector.resolveAndCreate([ParentProvider]);
                 * var child = parent.resolveAndCreateChild([ChildProvider]);
                 *
                 * expect(child.get(ParentProvider) instanceof ParentProvider).toBe(true);
                 * expect(child.get(ChildProvider) instanceof ChildProvider).toBe(true);
                 * expect(child.get(ParentProvider)).toBe(parent.get(ParentProvider));
                 * ```
                 *
                 * This function is slower than the corresponding `createChildFromResolved`
                 * because it needs to resolve the passed-in providers first.
                 * See {@link Injector#resolve} and {@link Injector#createChildFromResolved}.
                 */
                ReflectiveInjector.prototype.resolveAndCreateChild = function (providers) {
                    return exceptions_1.unimplemented();
                };
                /**
                 * Creates a child injector from previously resolved providers.
                 *
                 * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
                 * -->
                 *
                 * This API is the recommended way to construct injectors in performance-sensitive parts.
                 *
                 * ### Example ([live demo](http://plnkr.co/edit/VhyfjN?p=preview))
                 *
                 * ```typescript
                 * class ParentProvider {}
                 * class ChildProvider {}
                 *
                 * var parentProviders = ReflectiveInjector.resolve([ParentProvider]);
                 * var childProviders = ReflectiveInjector.resolve([ChildProvider]);
                 *
                 * var parent = ReflectiveInjector.fromResolvedProviders(parentProviders);
                 * var child = parent.createChildFromResolved(childProviders);
                 *
                 * expect(child.get(ParentProvider) instanceof ParentProvider).toBe(true);
                 * expect(child.get(ChildProvider) instanceof ChildProvider).toBe(true);
                 * expect(child.get(ParentProvider)).toBe(parent.get(ParentProvider));
                 * ```
                 */
                ReflectiveInjector.prototype.createChildFromResolved = function (providers) {
                    return exceptions_1.unimplemented();
                };
                /**
                 * Resolves a provider and instantiates an object in the context of the injector.
                 *
                 * The created object does not get cached by the injector.
                 *
                 * ### Example ([live demo](http://plnkr.co/edit/yvVXoB?p=preview))
                 *
                 * ```typescript
                 * @Injectable()
                 * class Engine {
                 * }
                 *
                 * @Injectable()
                 * class Car {
                 *   constructor(public engine:Engine) {}
                 * }
                 *
                 * var injector = ReflectiveInjector.resolveAndCreate([Engine]);
                 *
                 * var car = injector.resolveAndInstantiate(Car);
                 * expect(car.engine).toBe(injector.get(Engine));
                 * expect(car).not.toBe(injector.resolveAndInstantiate(Car));
                 * ```
                 */
                ReflectiveInjector.prototype.resolveAndInstantiate = function (provider) { return exceptions_1.unimplemented(); };
                /**
                 * Instantiates an object using a resolved provider in the context of the injector.
                 *
                 * The created object does not get cached by the injector.
                 *
                 * ### Example ([live demo](http://plnkr.co/edit/ptCImQ?p=preview))
                 *
                 * ```typescript
                 * @Injectable()
                 * class Engine {
                 * }
                 *
                 * @Injectable()
                 * class Car {
                 *   constructor(public engine:Engine) {}
                 * }
                 *
                 * var injector = ReflectiveInjector.resolveAndCreate([Engine]);
                 * var carProvider = ReflectiveInjector.resolve([Car])[0];
                 * var car = injector.instantiateResolved(carProvider);
                 * expect(car.engine).toBe(injector.get(Engine));
                 * expect(car).not.toBe(injector.instantiateResolved(carProvider));
                 * ```
                 */
                ReflectiveInjector.prototype.instantiateResolved = function (provider) { return exceptions_1.unimplemented(); };
                return ReflectiveInjector;
            }());
            exports_1("ReflectiveInjector", ReflectiveInjector);
            ReflectiveInjector_ = (function () {
                /**
                 * Private
                 */
                function ReflectiveInjector_(_proto /* ProtoInjector */, _parent, _debugContext) {
                    if (_parent === void 0) { _parent = null; }
                    if (_debugContext === void 0) { _debugContext = null; }
                    this._debugContext = _debugContext;
                    /** @internal */
                    this._constructionCounter = 0;
                    this._proto = _proto;
                    this._parent = _parent;
                    this._strategy = _proto._strategy.createInjectorStrategy(this);
                }
                /**
                 * @internal
                 */
                ReflectiveInjector_.prototype.debugContext = function () { return this._debugContext(); };
                ReflectiveInjector_.prototype.get = function (token, notFoundValue) {
                    if (notFoundValue === void 0) { notFoundValue = injector_1.THROW_IF_NOT_FOUND; }
                    return this._getByKey(reflective_key_1.ReflectiveKey.get(token), null, null, notFoundValue);
                };
                ReflectiveInjector_.prototype.getAt = function (index) { return this._strategy.getObjAtIndex(index); };
                Object.defineProperty(ReflectiveInjector_.prototype, "parent", {
                    get: function () { return this._parent; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ReflectiveInjector_.prototype, "internalStrategy", {
                    /**
                     * @internal
                     * Internal. Do not use.
                     * We return `any` not to export the InjectorStrategy type.
                     */
                    get: function () { return this._strategy; },
                    enumerable: true,
                    configurable: true
                });
                ReflectiveInjector_.prototype.resolveAndCreateChild = function (providers) {
                    var ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
                    return this.createChildFromResolved(ResolvedReflectiveProviders);
                };
                ReflectiveInjector_.prototype.createChildFromResolved = function (providers) {
                    var proto = new ReflectiveProtoInjector(providers);
                    var inj = new ReflectiveInjector_(proto);
                    inj._parent = this;
                    return inj;
                };
                ReflectiveInjector_.prototype.resolveAndInstantiate = function (provider) {
                    return this.instantiateResolved(ReflectiveInjector.resolve([provider])[0]);
                };
                ReflectiveInjector_.prototype.instantiateResolved = function (provider) {
                    return this._instantiateProvider(provider);
                };
                /** @internal */
                ReflectiveInjector_.prototype._new = function (provider) {
                    if (this._constructionCounter++ > this._strategy.getMaxNumberOfObjects()) {
                        throw new reflective_exceptions_1.CyclicDependencyError(this, provider.key);
                    }
                    return this._instantiateProvider(provider);
                };
                ReflectiveInjector_.prototype._instantiateProvider = function (provider) {
                    if (provider.multiProvider) {
                        var res = collection_1.ListWrapper.createFixedSize(provider.resolvedFactories.length);
                        for (var i = 0; i < provider.resolvedFactories.length; ++i) {
                            res[i] = this._instantiate(provider, provider.resolvedFactories[i]);
                        }
                        return res;
                    }
                    else {
                        return this._instantiate(provider, provider.resolvedFactories[0]);
                    }
                };
                ReflectiveInjector_.prototype._instantiate = function (provider, ResolvedReflectiveFactory) {
                    var factory = ResolvedReflectiveFactory.factory;
                    var deps = ResolvedReflectiveFactory.dependencies;
                    var length = deps.length;
                    var d0;
                    var d1;
                    var d2;
                    var d3;
                    var d4;
                    var d5;
                    var d6;
                    var d7;
                    var d8;
                    var d9;
                    var d10;
                    var d11;
                    var d12;
                    var d13;
                    var d14;
                    var d15;
                    var d16;
                    var d17;
                    var d18;
                    var d19;
                    try {
                        d0 = length > 0 ? this._getByReflectiveDependency(provider, deps[0]) : null;
                        d1 = length > 1 ? this._getByReflectiveDependency(provider, deps[1]) : null;
                        d2 = length > 2 ? this._getByReflectiveDependency(provider, deps[2]) : null;
                        d3 = length > 3 ? this._getByReflectiveDependency(provider, deps[3]) : null;
                        d4 = length > 4 ? this._getByReflectiveDependency(provider, deps[4]) : null;
                        d5 = length > 5 ? this._getByReflectiveDependency(provider, deps[5]) : null;
                        d6 = length > 6 ? this._getByReflectiveDependency(provider, deps[6]) : null;
                        d7 = length > 7 ? this._getByReflectiveDependency(provider, deps[7]) : null;
                        d8 = length > 8 ? this._getByReflectiveDependency(provider, deps[8]) : null;
                        d9 = length > 9 ? this._getByReflectiveDependency(provider, deps[9]) : null;
                        d10 = length > 10 ? this._getByReflectiveDependency(provider, deps[10]) : null;
                        d11 = length > 11 ? this._getByReflectiveDependency(provider, deps[11]) : null;
                        d12 = length > 12 ? this._getByReflectiveDependency(provider, deps[12]) : null;
                        d13 = length > 13 ? this._getByReflectiveDependency(provider, deps[13]) : null;
                        d14 = length > 14 ? this._getByReflectiveDependency(provider, deps[14]) : null;
                        d15 = length > 15 ? this._getByReflectiveDependency(provider, deps[15]) : null;
                        d16 = length > 16 ? this._getByReflectiveDependency(provider, deps[16]) : null;
                        d17 = length > 17 ? this._getByReflectiveDependency(provider, deps[17]) : null;
                        d18 = length > 18 ? this._getByReflectiveDependency(provider, deps[18]) : null;
                        d19 = length > 19 ? this._getByReflectiveDependency(provider, deps[19]) : null;
                    }
                    catch (e) {
                        if (e instanceof reflective_exceptions_1.AbstractProviderError || e instanceof reflective_exceptions_1.InstantiationError) {
                            e.addKey(this, provider.key);
                        }
                        throw e;
                    }
                    var obj;
                    try {
                        switch (length) {
                            case 0:
                                obj = factory();
                                break;
                            case 1:
                                obj = factory(d0);
                                break;
                            case 2:
                                obj = factory(d0, d1);
                                break;
                            case 3:
                                obj = factory(d0, d1, d2);
                                break;
                            case 4:
                                obj = factory(d0, d1, d2, d3);
                                break;
                            case 5:
                                obj = factory(d0, d1, d2, d3, d4);
                                break;
                            case 6:
                                obj = factory(d0, d1, d2, d3, d4, d5);
                                break;
                            case 7:
                                obj = factory(d0, d1, d2, d3, d4, d5, d6);
                                break;
                            case 8:
                                obj = factory(d0, d1, d2, d3, d4, d5, d6, d7);
                                break;
                            case 9:
                                obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8);
                                break;
                            case 10:
                                obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9);
                                break;
                            case 11:
                                obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10);
                                break;
                            case 12:
                                obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11);
                                break;
                            case 13:
                                obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12);
                                break;
                            case 14:
                                obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13);
                                break;
                            case 15:
                                obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14);
                                break;
                            case 16:
                                obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15);
                                break;
                            case 17:
                                obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16);
                                break;
                            case 18:
                                obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17);
                                break;
                            case 19:
                                obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18);
                                break;
                            case 20:
                                obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18, d19);
                                break;
                            default:
                                throw new exceptions_1.BaseException("Cannot instantiate '" + provider.key.displayName + "' because it has more than 20 dependencies");
                        }
                    }
                    catch (e) {
                        throw new reflective_exceptions_1.InstantiationError(this, e, e.stack, provider.key);
                    }
                    return obj;
                };
                ReflectiveInjector_.prototype._getByReflectiveDependency = function (provider, dep) {
                    return this._getByKey(dep.key, dep.lowerBoundVisibility, dep.upperBoundVisibility, dep.optional ? null : injector_1.THROW_IF_NOT_FOUND);
                };
                ReflectiveInjector_.prototype._getByKey = function (key, lowerBoundVisibility, upperBoundVisibility, notFoundValue) {
                    if (key === INJECTOR_KEY) {
                        return this;
                    }
                    if (upperBoundVisibility instanceof metadata_1.SelfMetadata) {
                        return this._getByKeySelf(key, notFoundValue);
                    }
                    else {
                        return this._getByKeyDefault(key, notFoundValue, lowerBoundVisibility);
                    }
                };
                /** @internal */
                ReflectiveInjector_.prototype._throwOrNull = function (key, notFoundValue) {
                    if (notFoundValue !== injector_1.THROW_IF_NOT_FOUND) {
                        return notFoundValue;
                    }
                    else {
                        throw new reflective_exceptions_1.NoProviderError(this, key);
                    }
                };
                /** @internal */
                ReflectiveInjector_.prototype._getByKeySelf = function (key, notFoundValue) {
                    var obj = this._strategy.getObjByKeyId(key.id);
                    return (obj !== UNDEFINED) ? obj : this._throwOrNull(key, notFoundValue);
                };
                /** @internal */
                ReflectiveInjector_.prototype._getByKeyDefault = function (key, notFoundValue, lowerBoundVisibility) {
                    var inj;
                    if (lowerBoundVisibility instanceof metadata_1.SkipSelfMetadata) {
                        inj = this._parent;
                    }
                    else {
                        inj = this;
                    }
                    while (inj instanceof ReflectiveInjector_) {
                        var inj_ = inj;
                        var obj = inj_._strategy.getObjByKeyId(key.id);
                        if (obj !== UNDEFINED)
                            return obj;
                        inj = inj_._parent;
                    }
                    if (inj !== null) {
                        return inj.get(key.token, notFoundValue);
                    }
                    else {
                        return this._throwOrNull(key, notFoundValue);
                    }
                };
                Object.defineProperty(ReflectiveInjector_.prototype, "displayName", {
                    get: function () {
                        return "ReflectiveInjector(providers: [" + _mapProviders(this, function (b) { return (" \"" + b.key.displayName + "\" "); }).join(", ") + "])";
                    },
                    enumerable: true,
                    configurable: true
                });
                ReflectiveInjector_.prototype.toString = function () { return this.displayName; };
                return ReflectiveInjector_;
            }());
            exports_1("ReflectiveInjector_", ReflectiveInjector_);
            INJECTOR_KEY = reflective_key_1.ReflectiveKey.get(injector_1.Injector);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2RpL3JlZmxlY3RpdmVfaW5qZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQXNCSSxRQUFRLEVBR04seUJBQXlCLEVBQ3pCLFNBQVMsd05BbzFCWCxZQUFZO0lBRWhCLHVCQUF1QixRQUE2QixFQUFFLEVBQVk7UUFDaEUsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDM0QsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEQsQ0FBQztRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDYixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBaDJCa0IsQ0FBRSx1REFBdUQ7WUFFNUUsb0NBQW9DO1lBQzlCLHlCQUF5QixHQUFHLEVBQUUsQ0FBQztZQUMvQixTQUFTLEdBQUcsaUJBQVUsQ0FBQyxJQUFJLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFPM0M7Z0JBdUJFLCtDQUFZLE9BQWdDLEVBQUUsU0FBdUM7b0JBdEJyRixjQUFTLEdBQStCLElBQUksQ0FBQztvQkFDN0MsY0FBUyxHQUErQixJQUFJLENBQUM7b0JBQzdDLGNBQVMsR0FBK0IsSUFBSSxDQUFDO29CQUM3QyxjQUFTLEdBQStCLElBQUksQ0FBQztvQkFDN0MsY0FBUyxHQUErQixJQUFJLENBQUM7b0JBQzdDLGNBQVMsR0FBK0IsSUFBSSxDQUFDO29CQUM3QyxjQUFTLEdBQStCLElBQUksQ0FBQztvQkFDN0MsY0FBUyxHQUErQixJQUFJLENBQUM7b0JBQzdDLGNBQVMsR0FBK0IsSUFBSSxDQUFDO29CQUM3QyxjQUFTLEdBQStCLElBQUksQ0FBQztvQkFFN0MsV0FBTSxHQUFXLElBQUksQ0FBQztvQkFDdEIsV0FBTSxHQUFXLElBQUksQ0FBQztvQkFDdEIsV0FBTSxHQUFXLElBQUksQ0FBQztvQkFDdEIsV0FBTSxHQUFXLElBQUksQ0FBQztvQkFDdEIsV0FBTSxHQUFXLElBQUksQ0FBQztvQkFDdEIsV0FBTSxHQUFXLElBQUksQ0FBQztvQkFDdEIsV0FBTSxHQUFXLElBQUksQ0FBQztvQkFDdEIsV0FBTSxHQUFXLElBQUksQ0FBQztvQkFDdEIsV0FBTSxHQUFXLElBQUksQ0FBQztvQkFDdEIsV0FBTSxHQUFXLElBQUksQ0FBQztvQkFHcEIsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztvQkFFOUIsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ3BDLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ3BDLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ3BDLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ3BDLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ3BDLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ3BDLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ3BDLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ3BDLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ3BDLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ3BDLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCxrRUFBa0IsR0FBbEIsVUFBbUIsS0FBYTtvQkFDOUIsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQzt3QkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFDdEMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQzt3QkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFDdEMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQzt3QkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFDdEMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQzt3QkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFDdEMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQzt3QkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFDdEMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQzt3QkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNB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RCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQzs0QkFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDcEMsQ0FBQzt3QkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDbkIsQ0FBQztvQkFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQzs0QkFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDcEMsQ0FBQzt3QkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDbkIsQ0FBQztvQkFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQzs0QkFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDcEMsQ0FBQzt3QkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDbkIsQ0FBQztvQkFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQzs0QkFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDcEMsQ0FBQzt3QkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDbkIsQ0FBQztvQkFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQzs0QkFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDcEMsQ0FBQzt3QkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDbkIsQ0FBQztvQkFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQzs0QkFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDcEMsQ0FBQzt3QkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDbkIsQ0FBQztvQkFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQzs0QkFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDcEMsQ0FBQzt3QkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDbkIsQ0FBQztvQkFDRCxFQUFFLENBQUMsQ0FB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QVEsQ0FBQztvQkFDYixJQUFJLEdBQVEsQ0FBQztvQkFDYixJQUFJLENBQUM7d0JBQ0gsRUFBRSxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7d0JBQzVFLEVBQUUsR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO3dCQUM1RSxFQUFFLEdBQUcsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQzt3QkFDNUUsRUFBRSxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7d0JBQzVFLEVBQUUsR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO3dCQUM1RSxFQUFFLEdBQUcsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQzt3QkFDNUUsRUFBRSxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7d0JBQzVFLEVBQUUsR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO3dCQUM1RSxFQUFFLEdBQUcsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQzt3QkFDNUUsRUFBRSxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7d0JBQzVFLEdBQUcsR0FBRyxNQUFNLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO3dCQUMvRSxHQUFHLEdBQUcsTUFBTSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQzt3QkFDL0UsR0FBRyxHQUFHLE1BQU0sR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7d0JBQy9FLEdBQUcsR0FBRyxNQUFNLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO3dCQUMvRSxHQUFHLEdBQUcsTUFBTSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQzt3QkFDL0UsR0FBRyxHQUFHLE1BQU0sR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7d0JBQy9FLEdBQUcsR0FBRyxNQUFNLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO3dCQUMvRSxHQUFHLEdBQUcsTUFBTSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQzt3QkFDL0UsR0FBRyxHQUFHLE1BQU0sR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7d0JBQy9FLEdBQUcsR0FBRyxNQUFNLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO29CQUNqRixDQUFFO29CQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ1gsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLDZDQUFxQixJQUFJLENBQUMsWUFBWSwwQ0FBa0IsQ0FBQyxDQUFDLENBQUM7NEJBQzFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDL0IsQ0FBQzt3QkFDRCxNQUFNLENBQUMsQ0FBQztvQkFDVixDQUFDO29CQUVELElBQUksR0FBRyxDQUFDO29CQUNSLElBQUksQ0FBQzt3QkFDSCxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOzRCQUNmLEtBQUssQ0FBQztnQ0FDSixHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUM7Z0NBQ2hCLEtBQUssQ0FBQzs0QkFDUixLQUFLLENBQUM7Z0NBQ0osR0FBRyxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQ0FDbEIsS0FBSyxDQUFDOzRCQUNSLEtBQUssQ0FBQztnQ0FDSixHQUFHLEdBQUcsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQ0FDdEIsS0FBSyxDQUFDOzRCQUNSLEtBQUssQ0FBQztnQ0FDSixHQUFHLEdBQUcsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0NBQzFCLEtBQUssQ0FBQzs0QkFDUixLQUFLLENBQUM7Z0NBQ0osR0FBRyxHQUFHLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQ0FDOUIsS0FBSyxDQUFDOzRCQUNSLEtBQUssQ0FBQztnQ0FDSixHQUFHLEdBQUcsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQ0FDbEMsS0FBSyxDQUFDOzRCQUNSLEtBQUssQ0FBQztnQ0FDSixHQUFHLEdBQUcsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0NBQ3RDLEtBQUssQ0FBQzs0QkFDUixLQUFLLENBQUM7Z0NBQ0osR0FBRyxHQUFHLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQ0FDMUMsS0FBSyxDQUFDOzRCQUNSLEtBQUssQ0FBQztnQ0FDSixHQUFHLEdBQUcsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQ0FDOUMsS0FBSyxDQUFDOzRCQUNSLEtBQUssQ0FBQztnQ0FDSixHQUFHLEdBQUcsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0NBQ2xELEtBQUssQ0FBQzs0QkFDUixLQUFLLEVBQUU7Z0NBQ0wsR0FBRyxHQUFHLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQ0FDdEQsS0FBSyxDQUFDOzRCQUNSLEtBQUssRUFBRTtnQ0FDTCxHQUFHLEdBQUcsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztnQ0FDM0QsS0FBSyxDQUFDOzRCQUNSLEtBQUssRUFBRTtnQ0FDTCxHQUFHLEdBQUcsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0NBQ2hFLEtBQUssQ0FBQzs0QkFDUixLQUFLLEVBQUU7Z0NBQ0wsR0FBRyxHQUFHLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQ0FDckUsS0FBSyxDQUFDOzRCQUNSLEtBQUssRUFBRTtnQ0FDTCxHQUFHLEdBQUcsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQ0FDMUUsS0FBSyxDQUFDOzRCQUNSLEtBQUssRUFBRTtnQ0FDTCxHQUFHLEdBQUcsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0NBQy9FLEtBQUssQ0FBQzs0QkFDUixLQUFLLEVBQUU7Z0NBQ0wsR0FBRyxHQUFHLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQ0FDcEYsS0FBSyxDQUFDOzRCQUNSLEtBQUssRUFBRTtnQ0FDTCxHQUFHLEdBQUcsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQ0FDekYsS0FBSyxDQUFDOzRCQUNSLEtBQUssRUFBRTtnQ0FDTCxHQUFHLEdBQUcsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUs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b0JBQy9DLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCxzQkFBSSw0Q0FBVzt5QkFBZjt3QkFDRSxNQUFNLENBQUMsb0NBQWtDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsVUFBQyxDQUE2QixJQUFLLE9BQUEsU0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsU0FBSSxFQUExQixDQUEwQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFJLENBQUM7b0JBQzdJLENBQUM7OzttQkFBQTtnQkFFRCxzQ0FBUSxHQUFSLGNBQXFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDakQsMEJBQUM7WUFBRCxDQWxSQSxBQWtSQyxJQUFBO1lBbFJELHFEQWtSQyxDQUFBO1lBRUcsWUFBWSxHQUFHLDhCQUFhLENBQUMsR0FBRyxDQUFDLG1CQUFRLENBQUMsQ0FBQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29yZS9kaS9yZWZsZWN0aXZlX2luamVjdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNYXAsIE1hcFdyYXBwZXIsIExpc3RXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtQcm92aWRlciwgUHJvdmlkZXJCdWlsZGVyLCBwcm92aWRlfSBmcm9tICcuL3Byb3ZpZGVyJztcbmltcG9ydCB7XG4gIFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyLFxuICBSZWZsZWN0aXZlRGVwZW5kZW5jeSxcbiAgUmVzb2x2ZWRSZWZsZWN0aXZlRmFjdG9yeSxcbiAgcmVzb2x2ZVJlZmxlY3RpdmVQcm92aWRlcnNcbn0gZnJvbSAnLi9yZWZsZWN0aXZlX3Byb3ZpZGVyJztcbmltcG9ydCB7XG4gIEFic3RyYWN0UHJvdmlkZXJFcnJvcixcbiAgTm9Qcm92aWRlckVycm9yLFxuICBDeWNsaWNEZXBlbmRlbmN5RXJyb3IsXG4gIEluc3RhbnRpYXRpb25FcnJvcixcbiAgSW52YWxpZFByb3ZpZGVyRXJyb3IsXG4gIE91dE9mQm91bmRzRXJyb3Jcbn0gZnJvbSAnLi9yZWZsZWN0aXZlX2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtUeXBlLCBDT05TVF9FWFBSLCBpc1ByZXNlbnR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb24sIHVuaW1wbGVtZW50ZWR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge1JlZmxlY3RpdmVLZXl9IGZyb20gJy4vcmVmbGVjdGl2ZV9rZXknO1xuaW1wb3J0IHtTZWxmTWV0YWRhdGEsIEhvc3RNZXRhZGF0YSwgU2tpcFNlbGZNZXRhZGF0YX0gZnJvbSAnLi9tZXRhZGF0YSc7XG5pbXBvcnQge0luamVjdG9yLCBUSFJPV19JRl9OT1RfRk9VTkR9IGZyb20gJy4vaW5qZWN0b3InO1xuXG52YXIgX191bnVzZWQ6IFR5cGU7ICAvLyBhdm9pZCB1bnVzZWQgaW1wb3J0IHdoZW4gVHlwZSB1bmlvbiB0eXBlcyBhcmUgZXJhc2VkXG5cbi8vIFRocmVzaG9sZCBmb3IgdGhlIGR5bmFtaWMgdmVyc2lvblxuY29uc3QgX01BWF9DT05TVFJVQ1RJT05fQ09VTlRFUiA9IDEwO1xuY29uc3QgVU5ERUZJTkVEID0gQ09OU1RfRVhQUihuZXcgT2JqZWN0KCkpO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlZmxlY3RpdmVQcm90b0luamVjdG9yU3RyYXRlZ3kge1xuICBnZXRQcm92aWRlckF0SW5kZXgoaW5kZXg6IG51bWJlcik6IFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyO1xuICBjcmVhdGVJbmplY3RvclN0cmF0ZWd5KGluajogUmVmbGVjdGl2ZUluamVjdG9yXyk6IFJlZmxlY3RpdmVJbmplY3RvclN0cmF0ZWd5O1xufVxuXG5leHBvcnQgY2xhc3MgUmVmbGVjdGl2ZVByb3RvSW5qZWN0b3JJbmxpbmVTdHJhdGVneSBpbXBsZW1lbnRzIFJlZmxlY3RpdmVQcm90b0luamVjdG9yU3RyYXRlZ3kge1xuICBwcm92aWRlcjA6IFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyID0gbnVsbDtcbiAgcHJvdmlkZXIxOiBSZXNvbHZlZFJlZmxlY3RpdmVQcm92aWRlciA9IG51bGw7XG4gIHByb3ZpZGVyMjogUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXIgPSBudWxsO1xuICBwcm92aWRlcjM6IFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyID0gbnVsbDtcbiAgcHJvdmlkZXI0OiBSZXNvbHZlZFJlZmxlY3RpdmVQcm92aWRlciA9IG51bGw7XG4gIHByb3ZpZGVyNTogUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXIgPSBudWxsO1xuICBwcm92aWRlcjY6IFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyID0gbnVsbDtcbiAgcHJvdmlkZXI3OiBSZXNvbHZlZFJlZmxlY3RpdmVQcm92aWRlciA9IG51bGw7XG4gIHByb3ZpZGVyODogUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXIgPSBudWxsO1xuICBwcm92aWRlcjk6IFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyID0gbnVsbDtcblxuICBrZXlJZDA6IG51bWJlciA9IG51bGw7XG4gIGtleUlkMTogbnVtYmVyID0gbnVsbDtcbiAga2V5SWQyOiBudW1iZXIgPSBudWxsO1xuICBrZXlJZDM6IG51bWJlciA9IG51bGw7XG4gIGtleUlkNDogbnVtYmVyID0gbnVsbDtcbiAga2V5SWQ1OiBudW1iZXIgPSBudWxsO1xuICBrZXlJZDY6IG51bWJlciA9IG51bGw7XG4gIGtleUlkNzogbnVtYmVyID0gbnVsbDtcbiAga2V5SWQ4OiBudW1iZXIgPSBudWxsO1xuICBrZXlJZDk6IG51bWJlciA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJvdG9FSTogUmVmbGVjdGl2ZVByb3RvSW5qZWN0b3IsIHByb3ZpZGVyczogUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXJbXSkge1xuICAgIHZhciBsZW5ndGggPSBwcm92aWRlcnMubGVuZ3RoO1xuXG4gICAgaWYgKGxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMucHJvdmlkZXIwID0gcHJvdmlkZXJzWzBdO1xuICAgICAgdGhpcy5rZXlJZDAgPSBwcm92aWRlcnNbMF0ua2V5LmlkO1xuICAgIH1cbiAgICBpZiAobGVuZ3RoID4gMSkge1xuICAgICAgdGhpcy5wcm92aWRlcjEgPSBwcm92aWRlcnNbMV07XG4gICAgICB0aGlzLmtleUlkMSA9IHByb3ZpZGVyc1sxXS5rZXkuaWQ7XG4gICAgfVxuICAgIGlmIChsZW5ndGggPiAyKSB7XG4gICAgICB0aGlzLnByb3ZpZGVyMiA9IHByb3ZpZGVyc1syXTtcbiAgICAgIHRoaXMua2V5SWQyID0gcHJvdmlkZXJzWzJdLmtleS5pZDtcbiAgICB9XG4gICAgaWYgKGxlbmd0aCA+IDMpIHtcbiAgICAgIHRoaXMucHJvdmlkZXIzID0gcHJvdmlkZXJzWzNdO1xuICAgICAgdGhpcy5rZXlJZDMgPSBwcm92aWRlcnNbM10ua2V5LmlkO1xuICAgIH1cbiAgICBpZiAobGVuZ3RoID4gNCkge1xuICAgICAgdGhpcy5wcm92aWRlcjQgPSBwcm92aWRlcnNbNF07XG4gICAgICB0aGlzLmtleUlkNCA9IHByb3ZpZGVyc1s0XS5rZXkuaWQ7XG4gICAgfVxuICAgIGlmIChsZW5ndGggPiA1KSB7XG4gICAgICB0aGlzLnByb3ZpZGVyNSA9IHByb3ZpZGVyc1s1XTtcbiAgICAgIHRoaXMua2V5SWQ1ID0gcHJvdmlkZXJzWzVdLmtleS5pZDtcbiAgICB9XG4gICAgaWYgKGxlbmd0aCA+IDYpIHtcbiAgICAgIHRoaXMucHJvdmlkZXI2ID0gcHJvdmlkZXJzWzZdO1xuICAgICAgdGhpcy5rZXlJZDYgPSBwcm92aWRlcnNbNl0ua2V5LmlkO1xuICAgIH1cbiAgICBpZiAobGVuZ3RoID4gNykge1xuICAgICAgdGhpcy5wcm92aWRlcjcgPSBwcm92aWRlcnNbN107XG4gICAgICB0aGlzLmtleUlkNyA9IHByb3ZpZGVyc1s3XS5rZXkuaWQ7XG4gICAgfVxuICAgIGlmIChsZW5ndGggPiA4KSB7XG4gICAgICB0aGlzLnByb3ZpZGVyOCA9IHByb3ZpZGVyc1s4XTtcbiAgICAgIHRoaXMua2V5SWQ4ID0gcHJvdmlkZXJzWzhdLmtleS5pZDtcbiAgICB9XG4gICAgaWYgKGxlbmd0aCA+IDkpIHtcbiAgICAgIHRoaXMucHJvdmlkZXI5ID0gcHJvdmlkZXJzWzldO1xuICAgICAgdGhpcy5rZXlJZDkgPSBwcm92aWRlcnNbOV0ua2V5LmlkO1xuICAgIH1cbiAgfVxuXG4gIGdldFByb3ZpZGVyQXRJbmRleChpbmRleDogbnVtYmVyKTogUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXIge1xuICAgIGlmIChpbmRleCA9PSAwKSByZXR1cm4gdGhpcy5wcm92aWRlcjA7XG4gICAgaWYgKGluZGV4ID09IDEpIHJldHVybiB0aGlzLnByb3ZpZGVyMTtcbiAgICBpZiAoaW5kZXggPT0gMikgcmV0dXJuIHRoaXMucHJvdmlkZXIyO1xuICAgIGlmIChpbmRleCA9PSAzKSByZXR1cm4gdGhpcy5wcm92aWRlcjM7XG4gICAgaWYgKGluZGV4ID09IDQpIHJldHVybiB0aGlzLnByb3ZpZGVyNDtcbiAgICBpZiAoaW5kZXggPT0gNSkgcmV0dXJuIHRoaXMucHJvdmlkZXI1O1xuICAgIGlmIChpbmRleCA9PSA2KSByZXR1cm4gdGhpcy5wcm92aWRlcjY7XG4gICAgaWYgKGluZGV4ID09IDcpIHJldHVybiB0aGlzLnByb3ZpZGVyNztcbiAgICBpZiAoaW5kZXggPT0gOCkgcmV0dXJuIHRoaXMucHJvdmlkZXI4O1xuICAgIGlmIChpbmRleCA9PSA5KSByZXR1cm4gdGhpcy5wcm92aWRlcjk7XG4gICAgdGhyb3cgbmV3IE91dE9mQm91bmRzRXJyb3IoaW5kZXgpO1xuICB9XG5cbiAgY3JlYXRlSW5qZWN0b3JTdHJhdGVneShpbmplY3RvcjogUmVmbGVjdGl2ZUluamVjdG9yXyk6IFJlZmxlY3RpdmVJbmplY3RvclN0cmF0ZWd5IHtcbiAgICByZXR1cm4gbmV3IFJlZmxlY3RpdmVJbmplY3RvcklubGluZVN0cmF0ZWd5KGluamVjdG9yLCB0aGlzKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVmbGVjdGl2ZVByb3RvSW5qZWN0b3JEeW5hbWljU3RyYXRlZ3kgaW1wbGVtZW50cyBSZWZsZWN0aXZlUHJvdG9JbmplY3RvclN0cmF0ZWd5IHtcbiAga2V5SWRzOiBudW1iZXJbXTtcblxuICBjb25zdHJ1Y3Rvcihwcm90b0luajogUmVmbGVjdGl2ZVByb3RvSW5qZWN0b3IsIHB1YmxpYyBwcm92aWRlcnM6IFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyW10pIHtcbiAgICB2YXIgbGVuID0gcHJvdmlkZXJzLmxlbmd0aDtcblxuICAgIHRoaXMua2V5SWRzID0gTGlzdFdyYXBwZXIuY3JlYXRlRml4ZWRTaXplKGxlbik7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB0aGlzLmtleUlkc1tpXSA9IHByb3ZpZGVyc1tpXS5rZXkuaWQ7XG4gICAgfVxuICB9XG5cbiAgZ2V0UHJvdmlkZXJBdEluZGV4KGluZGV4OiBudW1iZXIpOiBSZXNvbHZlZFJlZmxlY3RpdmVQcm92aWRlciB7XG4gICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLnByb3ZpZGVycy5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBPdXRPZkJvdW5kc0Vycm9yKGluZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucHJvdmlkZXJzW2luZGV4XTtcbiAgfVxuXG4gIGNyZWF0ZUluamVjdG9yU3RyYXRlZ3koZWk6IFJlZmxlY3RpdmVJbmplY3Rvcl8pOiBSZWZsZWN0aXZlSW5qZWN0b3JTdHJhdGVneSB7XG4gICAgcmV0dXJuIG5ldyBSZWZsZWN0aXZlSW5qZWN0b3JEeW5hbWljU3RyYXRlZ3kodGhpcywgZWkpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZWZsZWN0aXZlUHJvdG9JbmplY3RvciB7XG4gIHN0YXRpYyBmcm9tUmVzb2x2ZWRQcm92aWRlcnMocHJvdmlkZXJzOiBSZXNvbHZlZFJlZmxlY3RpdmVQcm92aWRlcltdKTogUmVmbGVjdGl2ZVByb3RvSW5qZWN0b3Ige1xuICAgIHJldHVybiBuZXcgUmVmbGVjdGl2ZVByb3RvSW5qZWN0b3IocHJvdmlkZXJzKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3N0cmF0ZWd5OiBSZWZsZWN0aXZlUHJvdG9JbmplY3RvclN0cmF0ZWd5O1xuICBudW1iZXJPZlByb3ZpZGVyczogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHByb3ZpZGVyczogUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXJbXSkge1xuICAgIHRoaXMubnVtYmVyT2ZQcm92aWRlcnMgPSBwcm92aWRlcnMubGVuZ3RoO1xuICAgIHRoaXMuX3N0cmF0ZWd5ID0gcHJvdmlkZXJzLmxlbmd0aCA+IF9NQVhfQ09OU1RSVUNUSU9OX0NPVU5URVIgP1xuICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBSZWZsZWN0aXZlUHJvdG9JbmplY3RvckR5bmFtaWNTdHJhdGVneSh0aGlzLCBwcm92aWRlcnMpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUmVmbGVjdGl2ZVByb3RvSW5qZWN0b3JJbmxpbmVTdHJhdGVneSh0aGlzLCBwcm92aWRlcnMpO1xuICB9XG5cbiAgZ2V0UHJvdmlkZXJBdEluZGV4KGluZGV4OiBudW1iZXIpOiBSZXNvbHZlZFJlZmxlY3RpdmVQcm92aWRlciB7XG4gICAgcmV0dXJuIHRoaXMuX3N0cmF0ZWd5LmdldFByb3ZpZGVyQXRJbmRleChpbmRleCk7XG4gIH1cbn1cblxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVmbGVjdGl2ZUluamVjdG9yU3RyYXRlZ3kge1xuICBnZXRPYmpCeUtleUlkKGtleUlkOiBudW1iZXIpOiBhbnk7XG4gIGdldE9iakF0SW5kZXgoaW5kZXg6IG51bWJlcik6IGFueTtcbiAgZ2V0TWF4TnVtYmVyT2ZPYmplY3RzKCk6IG51bWJlcjtcblxuICByZXNldENvbnN0cnVjdGlvbkNvdW50ZXIoKTogdm9pZDtcbiAgaW5zdGFudGlhdGVQcm92aWRlcihwcm92aWRlcjogUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXIpOiBhbnk7XG59XG5cbmV4cG9ydCBjbGFzcyBSZWZsZWN0aXZlSW5qZWN0b3JJbmxpbmVTdHJhdGVneSBpbXBsZW1lbnRzIFJlZmxlY3RpdmVJbmplY3RvclN0cmF0ZWd5IHtcbiAgb2JqMDogYW55ID0gVU5ERUZJTkVEO1xuICBvYmoxOiBhbnkgPSBVTkRFRklORUQ7XG4gIG9iajI6IGFueSA9IFVOREVGSU5FRDtcbiAgb2JqMzogYW55ID0gVU5ERUZJTkVEO1xuICBvYmo0OiBhbnkgPSBVTkRFRklORUQ7XG4gIG9iajU6IGFueSA9IFVOREVGSU5FRDtcbiAgb2JqNjogYW55ID0gVU5ERUZJTkVEO1xuICBvYmo3OiBhbnkgPSBVTkRFRklORUQ7XG4gIG9iajg6IGFueSA9IFVOREVGSU5FRDtcbiAgb2JqOTogYW55ID0gVU5ERUZJTkVEO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpbmplY3RvcjogUmVmbGVjdGl2ZUluamVjdG9yXyxcbiAgICAgICAgICAgICAgcHVibGljIHByb3RvU3RyYXRlZ3k6IFJlZmxlY3RpdmVQcm90b0luamVjdG9ySW5saW5lU3RyYXRlZ3kpIHt9XG5cbiAgcmVzZXRDb25zdHJ1Y3Rpb25Db3VudGVyKCk6IHZvaWQgeyB0aGlzLmluamVjdG9yLl9jb25zdHJ1Y3Rpb25Db3VudGVyID0gMDsgfVxuXG4gIGluc3RhbnRpYXRlUHJvdmlkZXIocHJvdmlkZXI6IFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbmplY3Rvci5fbmV3KHByb3ZpZGVyKTtcbiAgfVxuXG4gIGdldE9iakJ5S2V5SWQoa2V5SWQ6IG51bWJlcik6IGFueSB7XG4gICAgdmFyIHAgPSB0aGlzLnByb3RvU3RyYXRlZ3k7XG4gICAgdmFyIGluaiA9IHRoaXMuaW5qZWN0b3I7XG5cbiAgICBpZiAocC5rZXlJZDAgPT09IGtleUlkKSB7XG4gICAgICBpZiAodGhpcy5vYmowID09PSBVTkRFRklORUQpIHtcbiAgICAgICAgdGhpcy5vYmowID0gaW5qLl9uZXcocC5wcm92aWRlcjApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMub2JqMDtcbiAgICB9XG4gICAgaWYgKHAua2V5SWQxID09PSBrZXlJZCkge1xuICAgICAgaWYgKHRoaXMub2JqMSA9PT0gVU5ERUZJTkVEKSB7XG4gICAgICAgIHRoaXMub2JqMSA9IGluai5fbmV3KHAucHJvdmlkZXIxKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLm9iajE7XG4gICAgfVxuICAgIGlmIChwLmtleUlkMiA9PT0ga2V5SWQpIHtcbiAgICAgIGlmICh0aGlzLm9iajIgPT09IFVOREVGSU5FRCkge1xuICAgICAgICB0aGlzLm9iajIgPSBpbmouX25ldyhwLnByb3ZpZGVyMik7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5vYmoyO1xuICAgIH1cbiAgICBpZiAocC5rZXlJZDMgPT09IGtleUlkKSB7XG4gICAgICBpZiAodGhpcy5vYmozID09PSBVTkRFRklORUQpIHtcbiAgICAgICAgdGhpcy5vYmozID0gaW5qLl9uZXcocC5wcm92aWRlcjMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMub2JqMztcbiAgICB9XG4gICAgaWYgKHAua2V5SWQ0ID09PSBrZXlJZCkge1xuICAgICAgaWYgKHRoaXMub2JqNCA9PT0gVU5ERUZJTkVEKSB7XG4gICAgICAgIHRoaXMub2JqNCA9IGluai5fbmV3KHAucHJvdmlkZXI0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLm9iajQ7XG4gICAgfVxuICAgIGlmIChwLmtleUlkNSA9PT0ga2V5SWQpIHtcbiAgICAgIGlmICh0aGlzLm9iajUgPT09IFVOREVGSU5FRCkge1xuICAgICAgICB0aGlzLm9iajUgPSBpbmouX25ldyhwLnByb3ZpZGVyNSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5vYmo1O1xuICAgIH1cbiAgICBpZiAocC5rZXlJZDYgPT09IGtleUlkKSB7XG4gICAgICBpZiAodGhpcy5vYmo2ID09PSBVTkRFRklORUQpIHtcbiAgICAgICAgdGhpcy5vYmo2ID0gaW5qLl9uZXcocC5wcm92aWRlcjYpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMub2JqNjtcbiAgICB9XG4gICAgaWYgKHAua2V5SWQ3ID09PSBrZXlJZCkge1xuICAgICAgaWYgKHRoaXMub2JqNyA9PT0gVU5ERUZJTkVEKSB7XG4gICAgICAgIHRoaXMub2JqNyA9IGluai5fbmV3KHAucHJvdmlkZXI3KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLm9iajc7XG4gICAgfVxuICAgIGlmIChwLmtleUlkOCA9PT0ga2V5SWQpIHtcbiAgICAgIGlmICh0aGlzLm9iajggPT09IFVOREVGSU5FRCkge1xuICAgICAgICB0aGlzLm9iajggPSBpbmouX25ldyhwLnByb3ZpZGVyOCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5vYmo4O1xuICAgIH1cbiAgICBpZiAocC5rZXlJZDkgPT09IGtleUlkKSB7XG4gICAgICBpZiAodGhpcy5vYmo5ID09PSBVTkRFRklORUQpIHtcbiAgICAgICAgdGhpcy5vYmo5ID0gaW5qLl9uZXcocC5wcm92aWRlcjkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMub2JqOTtcbiAgICB9XG5cbiAgICByZXR1cm4gVU5ERUZJTkVEO1xuICB9XG5cbiAgZ2V0T2JqQXRJbmRleChpbmRleDogbnVtYmVyKTogYW55IHtcbiAgICBpZiAoaW5kZXggPT0gMCkgcmV0dXJuIHRoaXMub2JqMDtcbiAgICBpZiAoaW5kZXggPT0gMSkgcmV0dXJuIHRoaXMub2JqMTtcbiAgICBpZiAoaW5kZXggPT0gMikgcmV0dXJuIHRoaXMub2JqMjtcbiAgICBpZiAoaW5kZXggPT0gMykgcmV0dXJuIHRoaXMub2JqMztcbiAgICBpZiAoaW5kZXggPT0gNCkgcmV0dXJuIHRoaXMub2JqNDtcbiAgICBpZiAoaW5kZXggPT0gNSkgcmV0dXJuIHRoaXMub2JqNTtcbiAgICBpZiAoaW5kZXggPT0gNikgcmV0dXJuIHRoaXMub2JqNjtcbiAgICBpZiAoaW5kZXggPT0gNykgcmV0dXJuIHRoaXMub2JqNztcbiAgICBpZiAoaW5kZXggPT0gOCkgcmV0dXJuIHRoaXMub2JqODtcbiAgICBpZiAoaW5kZXggPT0gOSkgcmV0dXJuIHRoaXMub2JqOTtcbiAgICB0aHJvdyBuZXcgT3V0T2ZCb3VuZHNFcnJvcihpbmRleCk7XG4gIH1cblxuICBnZXRNYXhOdW1iZXJPZk9iamVjdHMoKTogbnVtYmVyIHsgcmV0dXJuIF9NQVhfQ09OU1RSVUNUSU9OX0NPVU5URVI7IH1cbn1cblxuXG5leHBvcnQgY2xhc3MgUmVmbGVjdGl2ZUluamVjdG9yRHluYW1pY1N0cmF0ZWd5IGltcGxlbWVudHMgUmVmbGVjdGl2ZUluamVjdG9yU3RyYXRlZ3kge1xuICBvYmpzOiBhbnlbXTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJvdG9TdHJhdGVneTogUmVmbGVjdGl2ZVByb3RvSW5qZWN0b3JEeW5hbWljU3RyYXRlZ3ksXG4gICAgICAgICAgICAgIHB1YmxpYyBpbmplY3RvcjogUmVmbGVjdGl2ZUluamVjdG9yXykge1xuICAgIHRoaXMub2JqcyA9IExpc3RXcmFwcGVyLmNyZWF0ZUZpeGVkU2l6ZShwcm90b1N0cmF0ZWd5LnByb3ZpZGVycy5sZW5ndGgpO1xuICAgIExpc3RXcmFwcGVyLmZpbGwodGhpcy5vYmpzLCBVTkRFRklORUQpO1xuICB9XG5cbiAgcmVzZXRDb25zdHJ1Y3Rpb25Db3VudGVyKCk6IHZvaWQgeyB0aGlzLmluamVjdG9yLl9jb25zdHJ1Y3Rpb25Db3VudGVyID0gMDsgfVxuXG4gIGluc3RhbnRpYXRlUHJvdmlkZXIocHJvdmlkZXI6IFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbmplY3Rvci5fbmV3KHByb3ZpZGVyKTtcbiAgfVxuXG4gIGdldE9iakJ5S2V5SWQoa2V5SWQ6IG51bWJlcik6IGFueSB7XG4gICAgdmFyIHAgPSB0aGlzLnByb3RvU3RyYXRlZ3k7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHAua2V5SWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocC5rZXlJZHNbaV0gPT09IGtleUlkKSB7XG4gICAgICAgIGlmICh0aGlzLm9ianNbaV0gPT09IFVOREVGSU5FRCkge1xuICAgICAgICAgIHRoaXMub2Jqc1tpXSA9IHRoaXMuaW5qZWN0b3IuX25ldyhwLnByb3ZpZGVyc1tpXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5vYmpzW2ldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBVTkRFRklORUQ7XG4gIH1cblxuICBnZXRPYmpBdEluZGV4KGluZGV4OiBudW1iZXIpOiBhbnkge1xuICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5vYmpzLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IE91dE9mQm91bmRzRXJyb3IoaW5kZXgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm9ianNbaW5kZXhdO1xuICB9XG5cbiAgZ2V0TWF4TnVtYmVyT2ZPYmplY3RzKCk6IG51bWJlciB7IHJldHVybiB0aGlzLm9ianMubGVuZ3RoOyB9XG59XG5cbi8qKlxuICogQSBSZWZsZWN0aXZlRGVwZW5kZW5jeSBpbmplY3Rpb24gY29udGFpbmVyIHVzZWQgZm9yIGluc3RhbnRpYXRpbmcgb2JqZWN0cyBhbmQgcmVzb2x2aW5nXG4gKiBkZXBlbmRlbmNpZXMuXG4gKlxuICogQW4gYEluamVjdG9yYCBpcyBhIHJlcGxhY2VtZW50IGZvciBhIGBuZXdgIG9wZXJhdG9yLCB3aGljaCBjYW4gYXV0b21hdGljYWxseSByZXNvbHZlIHRoZVxuICogY29uc3RydWN0b3IgZGVwZW5kZW5jaWVzLlxuICpcbiAqIEluIHR5cGljYWwgdXNlLCBhcHBsaWNhdGlvbiBjb2RlIGFza3MgZm9yIHRoZSBkZXBlbmRlbmNpZXMgaW4gdGhlIGNvbnN0cnVjdG9yIGFuZCB0aGV5IGFyZVxuICogcmVzb2x2ZWQgYnkgdGhlIGBJbmplY3RvcmAuXG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L2p6amVjMD9wPXByZXZpZXcpKVxuICpcbiAqIFRoZSBmb2xsb3dpbmcgZXhhbXBsZSBjcmVhdGVzIGFuIGBJbmplY3RvcmAgY29uZmlndXJlZCB0byBjcmVhdGUgYEVuZ2luZWAgYW5kIGBDYXJgLlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIEBJbmplY3RhYmxlKClcbiAqIGNsYXNzIEVuZ2luZSB7XG4gKiB9XG4gKlxuICogQEluamVjdGFibGUoKVxuICogY2xhc3MgQ2FyIHtcbiAqICAgY29uc3RydWN0b3IocHVibGljIGVuZ2luZTpFbmdpbmUpIHt9XG4gKiB9XG4gKlxuICogdmFyIGluamVjdG9yID0gUmVmbGVjdGl2ZUluamVjdG9yLnJlc29sdmVBbmRDcmVhdGUoW0NhciwgRW5naW5lXSk7XG4gKiB2YXIgY2FyID0gaW5qZWN0b3IuZ2V0KENhcik7XG4gKiBleHBlY3QoY2FyIGluc3RhbmNlb2YgQ2FyKS50b0JlKHRydWUpO1xuICogZXhwZWN0KGNhci5lbmdpbmUgaW5zdGFuY2VvZiBFbmdpbmUpLnRvQmUodHJ1ZSk7XG4gKiBgYGBcbiAqXG4gKiBOb3RpY2UsIHdlIGRvbid0IHVzZSB0aGUgYG5ld2Agb3BlcmF0b3IgYmVjYXVzZSB3ZSBleHBsaWNpdGx5IHdhbnQgdG8gaGF2ZSB0aGUgYEluamVjdG9yYFxuICogcmVzb2x2ZSBhbGwgb2YgdGhlIG9iamVjdCdzIGRlcGVuZGVuY2llcyBhdXRvbWF0aWNhbGx5LlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVmbGVjdGl2ZUluamVjdG9yIGltcGxlbWVudHMgSW5qZWN0b3Ige1xuICAvKipcbiAgICogVHVybnMgYW4gYXJyYXkgb2YgcHJvdmlkZXIgZGVmaW5pdGlvbnMgaW50byBhbiBhcnJheSBvZiByZXNvbHZlZCBwcm92aWRlcnMuXG4gICAqXG4gICAqIEEgcmVzb2x1dGlvbiBpcyBhIHByb2Nlc3Mgb2YgZmxhdHRlbmluZyBtdWx0aXBsZSBuZXN0ZWQgYXJyYXlzIGFuZCBjb252ZXJ0aW5nIGluZGl2aWR1YWxcbiAgICogcHJvdmlkZXJzIGludG8gYW4gYXJyYXkgb2Yge0BsaW5rIFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyfXMuXG4gICAqXG4gICAqICMjIyBFeGFtcGxlIChbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC9BaVhUSGk/cD1wcmV2aWV3KSlcbiAgICpcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBASW5qZWN0YWJsZSgpXG4gICAqIGNsYXNzIEVuZ2luZSB7XG4gICAqIH1cbiAgICpcbiAgICogQEluamVjdGFibGUoKVxuICAgKiBjbGFzcyBDYXIge1xuICAgKiAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbmdpbmU6RW5naW5lKSB7fVxuICAgKiB9XG4gICAqXG4gICAqIHZhciBwcm92aWRlcnMgPSBSZWZsZWN0aXZlSW5qZWN0b3IucmVzb2x2ZShbQ2FyLCBbW0VuZ2luZV1dXSk7XG4gICAqXG4gICAqIGV4cGVjdChwcm92aWRlcnMubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgKlxuICAgKiBleHBlY3QocHJvdmlkZXJzWzBdIGluc3RhbmNlb2YgUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXIpLnRvQmUodHJ1ZSk7XG4gICAqIGV4cGVjdChwcm92aWRlcnNbMF0ua2V5LmRpc3BsYXlOYW1lKS50b0JlKFwiQ2FyXCIpO1xuICAgKiBleHBlY3QocHJvdmlkZXJzWzBdLmRlcGVuZGVuY2llcy5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAqIGV4cGVjdChwcm92aWRlcnNbMF0uZmFjdG9yeSkudG9CZURlZmluZWQoKTtcbiAgICpcbiAgICogZXhwZWN0KHByb3ZpZGVyc1sxXS5rZXkuZGlzcGxheU5hbWUpLnRvQmUoXCJFbmdpbmVcIik7XG4gICAqIH0pO1xuICAgKiBgYGBcbiAgICpcbiAgICogU2VlIHtAbGluayBSZWZsZWN0aXZlSW5qZWN0b3IjZnJvbVJlc29sdmVkUHJvdmlkZXJzfSBmb3IgbW9yZSBpbmZvLlxuICAgKi9cbiAgc3RhdGljIHJlc29sdmUocHJvdmlkZXJzOiBBcnJheTxUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXT4pOiBSZXNvbHZlZFJlZmxlY3RpdmVQcm92aWRlcltdIHtcbiAgICByZXR1cm4gcmVzb2x2ZVJlZmxlY3RpdmVQcm92aWRlcnMocHJvdmlkZXJzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNvbHZlcyBhbiBhcnJheSBvZiBwcm92aWRlcnMgYW5kIGNyZWF0ZXMgYW4gaW5qZWN0b3IgZnJvbSB0aG9zZSBwcm92aWRlcnMuXG4gICAqXG4gICAqIFRoZSBwYXNzZWQtaW4gcHJvdmlkZXJzIGNhbiBiZSBhbiBhcnJheSBvZiBgVHlwZWAsIHtAbGluayBQcm92aWRlcn0sXG4gICAqIG9yIGEgcmVjdXJzaXZlIGFycmF5IG9mIG1vcmUgcHJvdmlkZXJzLlxuICAgKlxuICAgKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvZVBPY2NBP3A9cHJldmlldykpXG4gICAqXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogQEluamVjdGFibGUoKVxuICAgKiBjbGFzcyBFbmdpbmUge1xuICAgKiB9XG4gICAqXG4gICAqIEBJbmplY3RhYmxlKClcbiAgICogY2xhc3MgQ2FyIHtcbiAgICogICBjb25zdHJ1Y3RvcihwdWJsaWMgZW5naW5lOkVuZ2luZSkge31cbiAgICogfVxuICAgKlxuICAgKiB2YXIgaW5qZWN0b3IgPSBSZWZsZWN0aXZlSW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZShbQ2FyLCBFbmdpbmVdKTtcbiAgICogZXhwZWN0KGluamVjdG9yLmdldChDYXIpIGluc3RhbmNlb2YgQ2FyKS50b0JlKHRydWUpO1xuICAgKiBgYGBcbiAgICpcbiAgICogVGhpcyBmdW5jdGlvbiBpcyBzbG93ZXIgdGhhbiB0aGUgY29ycmVzcG9uZGluZyBgZnJvbVJlc29sdmVkUHJvdmlkZXJzYFxuICAgKiBiZWNhdXNlIGl0IG5lZWRzIHRvIHJlc29sdmUgdGhlIHBhc3NlZC1pbiBwcm92aWRlcnMgZmlyc3QuXG4gICAqIFNlZSB7QGxpbmsgSW5qZWN0b3IjcmVzb2x2ZX0gYW5kIHtAbGluayBJbmplY3RvciNmcm9tUmVzb2x2ZWRQcm92aWRlcnN9LlxuICAgKi9cbiAgc3RhdGljIHJlc29sdmVBbmRDcmVhdGUocHJvdmlkZXJzOiBBcnJheTxUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXT4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudDogSW5qZWN0b3IgPSBudWxsKTogUmVmbGVjdGl2ZUluamVjdG9yIHtcbiAgICB2YXIgUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXJzID0gUmVmbGVjdGl2ZUluamVjdG9yLnJlc29sdmUocHJvdmlkZXJzKTtcbiAgICByZXR1cm4gUmVmbGVjdGl2ZUluamVjdG9yLmZyb21SZXNvbHZlZFByb3ZpZGVycyhSZXNvbHZlZFJlZmxlY3RpdmVQcm92aWRlcnMsIHBhcmVudCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbmplY3RvciBmcm9tIHByZXZpb3VzbHkgcmVzb2x2ZWQgcHJvdmlkZXJzLlxuICAgKlxuICAgKiBUaGlzIEFQSSBpcyB0aGUgcmVjb21tZW5kZWQgd2F5IHRvIGNvbnN0cnVjdCBpbmplY3RvcnMgaW4gcGVyZm9ybWFuY2Utc2Vuc2l0aXZlIHBhcnRzLlxuICAgKlxuICAgKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvS3JTTWNpP3A9cHJldmlldykpXG4gICAqXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogQEluamVjdGFibGUoKVxuICAgKiBjbGFzcyBFbmdpbmUge1xuICAgKiB9XG4gICAqXG4gICAqIEBJbmplY3RhYmxlKClcbiAgICogY2xhc3MgQ2FyIHtcbiAgICogICBjb25zdHJ1Y3RvcihwdWJsaWMgZW5naW5lOkVuZ2luZSkge31cbiAgICogfVxuICAgKlxuICAgKiB2YXIgcHJvdmlkZXJzID0gUmVmbGVjdGl2ZUluamVjdG9yLnJlc29sdmUoW0NhciwgRW5naW5lXSk7XG4gICAqIHZhciBpbmplY3RvciA9IFJlZmxlY3RpdmVJbmplY3Rvci5mcm9tUmVzb2x2ZWRQcm92aWRlcnMocHJvdmlkZXJzKTtcbiAgICogZXhwZWN0KGluamVjdG9yLmdldChDYXIpIGluc3RhbmNlb2YgQ2FyKS50b0JlKHRydWUpO1xuICAgKiBgYGBcbiAgICovXG4gIHN0YXRpYyBmcm9tUmVzb2x2ZWRQcm92aWRlcnMocHJvdmlkZXJzOiBSZXNvbHZlZFJlZmxlY3RpdmVQcm92aWRlcltdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudDogSW5qZWN0b3IgPSBudWxsKTogUmVmbGVjdGl2ZUluamVjdG9yIHtcbiAgICByZXR1cm4gbmV3IFJlZmxlY3RpdmVJbmplY3Rvcl8oUmVmbGVjdGl2ZVByb3RvSW5qZWN0b3IuZnJvbVJlc29sdmVkUHJvdmlkZXJzKHByb3ZpZGVycyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudCk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWRcbiAgICovXG4gIHN0YXRpYyBmcm9tUmVzb2x2ZWRCaW5kaW5ncyhwcm92aWRlcnM6IFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyW10pOiBSZWZsZWN0aXZlSW5qZWN0b3Ige1xuICAgIHJldHVybiBSZWZsZWN0aXZlSW5qZWN0b3IuZnJvbVJlc29sdmVkUHJvdmlkZXJzKHByb3ZpZGVycyk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBQYXJlbnQgb2YgdGhpcyBpbmplY3Rvci5cbiAgICpcbiAgICogPCEtLSBUT0RPOiBBZGQgYSBsaW5rIHRvIHRoZSBzZWN0aW9uIG9mIHRoZSB1c2VyIGd1aWRlIHRhbGtpbmcgYWJvdXQgaGllcmFyY2hpY2FsIGluamVjdGlvbi5cbiAgICogLS0+XG4gICAqXG4gICAqICMjIyBFeGFtcGxlIChbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC9lb3NNR28/cD1wcmV2aWV3KSlcbiAgICpcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiB2YXIgcGFyZW50ID0gUmVmbGVjdGl2ZUluamVjdG9yLnJlc29sdmVBbmRDcmVhdGUoW10pO1xuICAgKiB2YXIgY2hpbGQgPSBwYXJlbnQucmVzb2x2ZUFuZENyZWF0ZUNoaWxkKFtdKTtcbiAgICogZXhwZWN0KGNoaWxkLnBhcmVudCkudG9CZShwYXJlbnQpO1xuICAgKiBgYGBcbiAgICovXG4gIGdldCBwYXJlbnQoKTogSW5qZWN0b3IgeyByZXR1cm4gdW5pbXBsZW1lbnRlZCgpOyB9XG5cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBkZWJ1Z0NvbnRleHQoKTogYW55IHsgcmV0dXJuIG51bGw7IH1cblxuICAvKipcbiAgICogUmVzb2x2ZXMgYW4gYXJyYXkgb2YgcHJvdmlkZXJzIGFuZCBjcmVhdGVzIGEgY2hpbGQgaW5qZWN0b3IgZnJvbSB0aG9zZSBwcm92aWRlcnMuXG4gICAqXG4gICAqIDwhLS0gVE9ETzogQWRkIGEgbGluayB0byB0aGUgc2VjdGlvbiBvZiB0aGUgdXNlciBndWlkZSB0YWxraW5nIGFib3V0IGhpZXJhcmNoaWNhbCBpbmplY3Rpb24uXG4gICAqIC0tPlxuICAgKlxuICAgKiBUaGUgcGFzc2VkLWluIHByb3ZpZGVycyBjYW4gYmUgYW4gYXJyYXkgb2YgYFR5cGVgLCB7QGxpbmsgUHJvdmlkZXJ9LFxuICAgKiBvciBhIHJlY3Vyc2l2ZSBhcnJheSBvZiBtb3JlIHByb3ZpZGVycy5cbiAgICpcbiAgICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L29wQjNUND9wPXByZXZpZXcpKVxuICAgKlxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIGNsYXNzIFBhcmVudFByb3ZpZGVyIHt9XG4gICAqIGNsYXNzIENoaWxkUHJvdmlkZXIge31cbiAgICpcbiAgICogdmFyIHBhcmVudCA9IFJlZmxlY3RpdmVJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKFtQYXJlbnRQcm92aWRlcl0pO1xuICAgKiB2YXIgY2hpbGQgPSBwYXJlbnQucmVzb2x2ZUFuZENyZWF0ZUNoaWxkKFtDaGlsZFByb3ZpZGVyXSk7XG4gICAqXG4gICAqIGV4cGVjdChjaGlsZC5nZXQoUGFyZW50UHJvdmlkZXIpIGluc3RhbmNlb2YgUGFyZW50UHJvdmlkZXIpLnRvQmUodHJ1ZSk7XG4gICAqIGV4cGVjdChjaGlsZC5nZXQoQ2hpbGRQcm92aWRlcikgaW5zdGFuY2VvZiBDaGlsZFByb3ZpZGVyKS50b0JlKHRydWUpO1xuICAgKiBleHBlY3QoY2hpbGQuZ2V0KFBhcmVudFByb3ZpZGVyKSkudG9CZShwYXJlbnQuZ2V0KFBhcmVudFByb3ZpZGVyKSk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHNsb3dlciB0aGFuIHRoZSBjb3JyZXNwb25kaW5nIGBjcmVhdGVDaGlsZEZyb21SZXNvbHZlZGBcbiAgICogYmVjYXVzZSBpdCBuZWVkcyB0byByZXNvbHZlIHRoZSBwYXNzZWQtaW4gcHJvdmlkZXJzIGZpcnN0LlxuICAgKiBTZWUge0BsaW5rIEluamVjdG9yI3Jlc29sdmV9IGFuZCB7QGxpbmsgSW5qZWN0b3IjY3JlYXRlQ2hpbGRGcm9tUmVzb2x2ZWR9LlxuICAgKi9cbiAgcmVzb2x2ZUFuZENyZWF0ZUNoaWxkKHByb3ZpZGVyczogQXJyYXk8VHlwZSB8IFByb3ZpZGVyIHwgYW55W10+KTogUmVmbGVjdGl2ZUluamVjdG9yIHtcbiAgICByZXR1cm4gdW5pbXBsZW1lbnRlZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBjaGlsZCBpbmplY3RvciBmcm9tIHByZXZpb3VzbHkgcmVzb2x2ZWQgcHJvdmlkZXJzLlxuICAgKlxuICAgKiA8IS0tIFRPRE86IEFkZCBhIGxpbmsgdG8gdGhlIHNlY3Rpb24gb2YgdGhlIHVzZXIgZ3VpZGUgdGFsa2luZyBhYm91dCBoaWVyYXJjaGljYWwgaW5qZWN0aW9uLlxuICAgKiAtLT5cbiAgICpcbiAgICogVGhpcyBBUEkgaXMgdGhlIHJlY29tbWVuZGVkIHdheSB0byBjb25zdHJ1Y3QgaW5qZWN0b3JzIGluIHBlcmZvcm1hbmNlLXNlbnNpdGl2ZSBwYXJ0cy5cbiAgICpcbiAgICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L1ZoeWZqTj9wPXByZXZpZXcpKVxuICAgKlxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIGNsYXNzIFBhcmVudFByb3ZpZGVyIHt9XG4gICAqIGNsYXNzIENoaWxkUHJvdmlkZXIge31cbiAgICpcbiAgICogdmFyIHBhcmVudFByb3ZpZGVycyA9IFJlZmxlY3RpdmVJbmplY3Rvci5yZXNvbHZlKFtQYXJlbnRQcm92aWRlcl0pO1xuICAgKiB2YXIgY2hpbGRQcm92aWRlcnMgPSBSZWZsZWN0aXZlSW5qZWN0b3IucmVzb2x2ZShbQ2hpbGRQcm92aWRlcl0pO1xuICAgKlxuICAgKiB2YXIgcGFyZW50ID0gUmVmbGVjdGl2ZUluamVjdG9yLmZyb21SZXNvbHZlZFByb3ZpZGVycyhwYXJlbnRQcm92aWRlcnMpO1xuICAgKiB2YXIgY2hpbGQgPSBwYXJlbnQuY3JlYXRlQ2hpbGRGcm9tUmVzb2x2ZWQoY2hpbGRQcm92aWRlcnMpO1xuICAgKlxuICAgKiBleHBlY3QoY2hpbGQuZ2V0KFBhcmVudFByb3ZpZGVyKSBpbnN0YW5jZW9mIFBhcmVudFByb3ZpZGVyKS50b0JlKHRydWUpO1xuICAgKiBleHBlY3QoY2hpbGQuZ2V0KENoaWxkUHJvdmlkZXIpIGluc3RhbmNlb2YgQ2hpbGRQcm92aWRlcikudG9CZSh0cnVlKTtcbiAgICogZXhwZWN0KGNoaWxkLmdldChQYXJlbnRQcm92aWRlcikpLnRvQmUocGFyZW50LmdldChQYXJlbnRQcm92aWRlcikpO1xuICAgKiBgYGBcbiAgICovXG4gIGNyZWF0ZUNoaWxkRnJvbVJlc29sdmVkKHByb3ZpZGVyczogUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXJbXSk6IFJlZmxlY3RpdmVJbmplY3RvciB7XG4gICAgcmV0dXJuIHVuaW1wbGVtZW50ZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNvbHZlcyBhIHByb3ZpZGVyIGFuZCBpbnN0YW50aWF0ZXMgYW4gb2JqZWN0IGluIHRoZSBjb250ZXh0IG9mIHRoZSBpbmplY3Rvci5cbiAgICpcbiAgICogVGhlIGNyZWF0ZWQgb2JqZWN0IGRvZXMgbm90IGdldCBjYWNoZWQgYnkgdGhlIGluamVjdG9yLlxuICAgKlxuICAgKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQveXZWWG9CP3A9cHJldmlldykpXG4gICAqXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogQEluamVjdGFibGUoKVxuICAgKiBjbGFzcyBFbmdpbmUge1xuICAgKiB9XG4gICAqXG4gICAqIEBJbmplY3RhYmxlKClcbiAgICogY2xhc3MgQ2FyIHtcbiAgICogICBjb25zdHJ1Y3RvcihwdWJsaWMgZW5naW5lOkVuZ2luZSkge31cbiAgICogfVxuICAgKlxuICAgKiB2YXIgaW5qZWN0b3IgPSBSZWZsZWN0aXZlSW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZShbRW5naW5lXSk7XG4gICAqXG4gICAqIHZhciBjYXIgPSBpbmplY3Rvci5yZXNvbHZlQW5kSW5zdGFudGlhdGUoQ2FyKTtcbiAgICogZXhwZWN0KGNhci5lbmdpbmUpLnRvQmUoaW5qZWN0b3IuZ2V0KEVuZ2luZSkpO1xuICAgKiBleHBlY3QoY2FyKS5ub3QudG9CZShpbmplY3Rvci5yZXNvbHZlQW5kSW5zdGFudGlhdGUoQ2FyKSk7XG4gICAqIGBgYFxuICAgKi9cbiAgcmVzb2x2ZUFuZEluc3RhbnRpYXRlKHByb3ZpZGVyOiBUeXBlIHwgUHJvdmlkZXIpOiBhbnkgeyByZXR1cm4gdW5pbXBsZW1lbnRlZCgpOyB9XG5cbiAgLyoqXG4gICAqIEluc3RhbnRpYXRlcyBhbiBvYmplY3QgdXNpbmcgYSByZXNvbHZlZCBwcm92aWRlciBpbiB0aGUgY29udGV4dCBvZiB0aGUgaW5qZWN0b3IuXG4gICAqXG4gICAqIFRoZSBjcmVhdGVkIG9iamVjdCBkb2VzIG5vdCBnZXQgY2FjaGVkIGJ5IHRoZSBpbmplY3Rvci5cbiAgICpcbiAgICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L3B0Q0ltUT9wPXByZXZpZXcpKVxuICAgKlxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIEBJbmplY3RhYmxlKClcbiAgICogY2xhc3MgRW5naW5lIHtcbiAgICogfVxuICAgKlxuICAgKiBASW5qZWN0YWJsZSgpXG4gICAqIGNsYXNzIENhciB7XG4gICAqICAgY29uc3RydWN0b3IocHVibGljIGVuZ2luZTpFbmdpbmUpIHt9XG4gICAqIH1cbiAgICpcbiAgICogdmFyIGluamVjdG9yID0gUmVmbGVjdGl2ZUluamVjdG9yLnJlc29sdmVBbmRDcmVhdGUoW0VuZ2luZV0pO1xuICAgKiB2YXIgY2FyUHJvdmlkZXIgPSBSZWZsZWN0aXZlSW5qZWN0b3IucmVzb2x2ZShbQ2FyXSlbMF07XG4gICAqIHZhciBjYXIgPSBpbmplY3Rvci5pbnN0YW50aWF0ZVJlc29sdmVkKGNhclByb3ZpZGVyKTtcbiAgICogZXhwZWN0KGNhci5lbmdpbmUpLnRvQmUoaW5qZWN0b3IuZ2V0KEVuZ2luZSkpO1xuICAgKiBleHBlY3QoY2FyKS5ub3QudG9CZShpbmplY3Rvci5pbnN0YW50aWF0ZVJlc29sdmVkKGNhclByb3ZpZGVyKSk7XG4gICAqIGBgYFxuICAgKi9cbiAgaW5zdGFudGlhdGVSZXNvbHZlZChwcm92aWRlcjogUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXIpOiBhbnkgeyByZXR1cm4gdW5pbXBsZW1lbnRlZCgpOyB9XG5cbiAgYWJzdHJhY3QgZ2V0KHRva2VuOiBhbnksIG5vdEZvdW5kVmFsdWU/OiBhbnkpOiBhbnk7XG59XG5cbmV4cG9ydCBjbGFzcyBSZWZsZWN0aXZlSW5qZWN0b3JfIGltcGxlbWVudHMgUmVmbGVjdGl2ZUluamVjdG9yIHtcbiAgcHJpdmF0ZSBfc3RyYXRlZ3k6IFJlZmxlY3RpdmVJbmplY3RvclN0cmF0ZWd5O1xuICAvKiogQGludGVybmFsICovXG4gIF9jb25zdHJ1Y3Rpb25Db3VudGVyOiBudW1iZXIgPSAwO1xuICAvKiogQGludGVybmFsICovXG4gIHB1YmxpYyBfcHJvdG86IGFueSAvKiBQcm90b0luamVjdG9yICovO1xuICAvKiogQGludGVybmFsICovXG4gIHB1YmxpYyBfcGFyZW50OiBJbmplY3RvcjtcbiAgLyoqXG4gICAqIFByaXZhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKF9wcm90bzogYW55IC8qIFByb3RvSW5qZWN0b3IgKi8sIF9wYXJlbnQ6IEluamVjdG9yID0gbnVsbCxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfZGVidWdDb250ZXh0OiBGdW5jdGlvbiA9IG51bGwpIHtcbiAgICB0aGlzLl9wcm90byA9IF9wcm90bztcbiAgICB0aGlzLl9wYXJlbnQgPSBfcGFyZW50O1xuICAgIHRoaXMuX3N0cmF0ZWd5ID0gX3Byb3RvLl9zdHJhdGVneS5jcmVhdGVJbmplY3RvclN0cmF0ZWd5KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZGVidWdDb250ZXh0KCk6IGFueSB7IHJldHVybiB0aGlzLl9kZWJ1Z0NvbnRleHQoKTsgfVxuXG4gIGdldCh0b2tlbjogYW55LCBub3RGb3VuZFZhbHVlOiBhbnkgPSBUSFJPV19JRl9OT1RfRk9VTkQpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9nZXRCeUtleShSZWZsZWN0aXZlS2V5LmdldCh0b2tlbiksIG51bGwsIG51bGwsIG5vdEZvdW5kVmFsdWUpO1xuICB9XG5cbiAgZ2V0QXQoaW5kZXg6IG51bWJlcik6IGFueSB7IHJldHVybiB0aGlzLl9zdHJhdGVneS5nZXRPYmpBdEluZGV4KGluZGV4KTsgfVxuXG4gIGdldCBwYXJlbnQoKTogSW5qZWN0b3IgeyByZXR1cm4gdGhpcy5fcGFyZW50OyB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKiBJbnRlcm5hbC4gRG8gbm90IHVzZS5cbiAgICogV2UgcmV0dXJuIGBhbnlgIG5vdCB0byBleHBvcnQgdGhlIEluamVjdG9yU3RyYXRlZ3kgdHlwZS5cbiAgICovXG4gIGdldCBpbnRlcm5hbFN0cmF0ZWd5KCk6IGFueSB7IHJldHVybiB0aGlzLl9zdHJhdGVneTsgfVxuXG4gIHJlc29sdmVBbmRDcmVhdGVDaGlsZChwcm92aWRlcnM6IEFycmF5PFR5cGUgfCBQcm92aWRlciB8IGFueVtdPik6IFJlZmxlY3RpdmVJbmplY3RvciB7XG4gICAgdmFyIFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVycyA9IFJlZmxlY3RpdmVJbmplY3Rvci5yZXNvbHZlKHByb3ZpZGVycyk7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlQ2hpbGRGcm9tUmVzb2x2ZWQoUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXJzKTtcbiAgfVxuXG4gIGNyZWF0ZUNoaWxkRnJvbVJlc29sdmVkKHByb3ZpZGVyczogUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXJbXSk6IFJlZmxlY3RpdmVJbmplY3RvciB7XG4gICAgdmFyIHByb3RvID0gbmV3IFJlZmxlY3RpdmVQcm90b0luamVjdG9yKHByb3ZpZGVycyk7XG4gICAgdmFyIGluaiA9IG5ldyBSZWZsZWN0aXZlSW5qZWN0b3JfKHByb3RvKTtcbiAgICBpbmouX3BhcmVudCA9IHRoaXM7XG4gICAgcmV0dXJuIGluajtcbiAgfVxuXG4gIHJlc29sdmVBbmRJbnN0YW50aWF0ZShwcm92aWRlcjogVHlwZSB8IFByb3ZpZGVyKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW50aWF0ZVJlc29sdmVkKFJlZmxlY3RpdmVJbmplY3Rvci5yZXNvbHZlKFtwcm92aWRlcl0pWzBdKTtcbiAgfVxuXG4gIGluc3RhbnRpYXRlUmVzb2x2ZWQocHJvdmlkZXI6IFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5faW5zdGFudGlhdGVQcm92aWRlcihwcm92aWRlcik7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9uZXcocHJvdmlkZXI6IFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyKTogYW55IHtcbiAgICBpZiAodGhpcy5fY29uc3RydWN0aW9uQ291bnRlcisrID4gdGhpcy5fc3RyYXRlZ3kuZ2V0TWF4TnVtYmVyT2ZPYmplY3RzKCkpIHtcbiAgICAgIHRocm93IG5ldyBDeWNsaWNEZXBlbmRlbmN5RXJyb3IodGhpcywgcHJvdmlkZXIua2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2luc3RhbnRpYXRlUHJvdmlkZXIocHJvdmlkZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5zdGFudGlhdGVQcm92aWRlcihwcm92aWRlcjogUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXIpOiBhbnkge1xuICAgIGlmIChwcm92aWRlci5tdWx0aVByb3ZpZGVyKSB7XG4gICAgICB2YXIgcmVzID0gTGlzdFdyYXBwZXIuY3JlYXRlRml4ZWRTaXplKHByb3ZpZGVyLnJlc29sdmVkRmFjdG9yaWVzLmxlbmd0aCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3ZpZGVyLnJlc29sdmVkRmFjdG9yaWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHJlc1tpXSA9IHRoaXMuX2luc3RhbnRpYXRlKHByb3ZpZGVyLCBwcm92aWRlci5yZXNvbHZlZEZhY3Rvcmllc1tpXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5faW5zdGFudGlhdGUocHJvdmlkZXIsIHByb3ZpZGVyLnJlc29sdmVkRmFjdG9yaWVzWzBdKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pbnN0YW50aWF0ZShwcm92aWRlcjogUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgIFJlc29sdmVkUmVmbGVjdGl2ZUZhY3Rvcnk6IFJlc29sdmVkUmVmbGVjdGl2ZUZhY3RvcnkpOiBhbnkge1xuICAgIHZhciBmYWN0b3J5ID0gUmVzb2x2ZWRSZWZsZWN0aXZlRmFjdG9yeS5mYWN0b3J5O1xuICAgIHZhciBkZXBzID0gUmVzb2x2ZWRSZWZsZWN0aXZlRmFjdG9yeS5kZXBlbmRlbmNpZXM7XG4gICAgdmFyIGxlbmd0aCA9IGRlcHMubGVuZ3RoO1xuXG4gICAgdmFyIGQwOiBhbnk7XG4gICAgdmFyIGQxOiBhbnk7XG4gICAgdmFyIGQyOiBhbnk7XG4gICAgdmFyIGQzOiBhbnk7XG4gICAgdmFyIGQ0OiBhbnk7XG4gICAgdmFyIGQ1OiBhbnk7XG4gICAgdmFyIGQ2OiBhbnk7XG4gICAgdmFyIGQ3OiBhbnk7XG4gICAgdmFyIGQ4OiBhbnk7XG4gICAgdmFyIGQ5OiBhbnk7XG4gICAgdmFyIGQxMDogYW55O1xuICAgIHZhciBkMTE6IGFueTtcbiAgICB2YXIgZDEyOiBhbnk7XG4gICAgdmFyIGQxMzogYW55O1xuICAgIHZhciBkMTQ6IGFueTtcbiAgICB2YXIgZDE1OiBhbnk7XG4gICAgdmFyIGQxNjogYW55O1xuICAgIHZhciBkMTc6IGFueTtcbiAgICB2YXIgZDE4OiBhbnk7XG4gICAgdmFyIGQxOTogYW55O1xuICAgIHRyeSB7XG4gICAgICBkMCA9IGxlbmd0aCA+IDAgPyB0aGlzLl9nZXRCeVJlZmxlY3RpdmVEZXBlbmRlbmN5KHByb3ZpZGVyLCBkZXBzWzBdKSA6IG51bGw7XG4gICAgICBkMSA9IGxlbmd0aCA+IDEgPyB0aGlzLl9nZXRCeVJlZmxlY3RpdmVEZXBlbmRlbmN5KHByb3ZpZGVyLCBkZXBzWzFdKSA6IG51bGw7XG4gICAgICBkMiA9IGxlbmd0aCA+IDIgPyB0aGlzLl9nZXRCeVJlZmxlY3RpdmVEZXBlbmRlbmN5KHByb3ZpZGVyLCBkZXBzWzJdKSA6IG51bGw7XG4gICAgICBkMyA9IGxlbmd0aCA+IDMgPyB0aGlzLl9nZXRCeVJlZmxlY3RpdmVEZXBlbmRlbmN5KHByb3ZpZGVyLCBkZXBzWzNdKSA6IG51bGw7XG4gICAgICBkNCA9IGxlbmd0aCA+IDQgPyB0aGlzLl9nZXRCeVJlZmxlY3RpdmVEZXBlbmRlbmN5KHByb3ZpZGVyLCBkZXBzWzRdKSA6IG51bGw7XG4gICAgICBkNSA9IGxlbmd0aCA+IDUgPyB0aGlzLl9nZXRCeVJlZmxlY3RpdmVEZXBlbmRlbmN5KHByb3ZpZGVyLCBkZXBzWzVdKSA6IG51bGw7XG4gICAgICBkNiA9IGxlbmd0aCA+IDYgPyB0aGlzLl9nZXRCeVJlZmxlY3RpdmVEZXBlbmRlbmN5KHByb3ZpZGVyLCBkZXBzWzZdKSA6IG51bGw7XG4gICAgICBkNyA9IGxlbmd0aCA+IDcgPyB0aGlzLl9nZXRCeVJlZmxlY3RpdmVEZXBlbmRlbmN5KHByb3ZpZGVyLCBkZXBzWzddKSA6IG51bGw7XG4gICAgICBkOCA9IGxlbmd0aCA+IDggPyB0aGlzLl9nZXRCeVJlZmxlY3RpdmVEZXBlbmRlbmN5KHByb3ZpZGVyLCBkZXBzWzhdKSA6IG51bGw7XG4gICAgICBkOSA9IGxlbmd0aCA+IDkgPyB0aGlzLl9nZXRCeVJlZmxlY3RpdmVEZXBlbmRlbmN5KHByb3ZpZGVyLCBkZXBzWzldKSA6IG51bGw7XG4gICAgICBkMTAgPSBsZW5ndGggPiAxMCA/IHRoaXMuX2dldEJ5UmVmbGVjdGl2ZURlcGVuZGVuY3kocHJvdmlkZXIsIGRlcHNbMTBdKSA6IG51bGw7XG4gICAgICBkMTEgPSBsZW5ndGggPiAxMSA/IHRoaXMuX2dldEJ5UmVmbGVjdGl2ZURlcGVuZGVuY3kocHJvdmlkZXIsIGRlcHNbMTFdKSA6IG51bGw7XG4gICAgICBkMTIgPSBsZW5ndGggPiAxMiA/IHRoaXMuX2dldEJ5UmVmbGVjdGl2ZURlcGVuZGVuY3kocHJvdmlkZXIsIGRlcHNbMTJdKSA6IG51bGw7XG4gICAgICBkMTMgPSBsZW5ndGggPiAxMyA/IHRoaXMuX2dldEJ5UmVmbGVjdGl2ZURlcGVuZGVuY3kocHJvdmlkZXIsIGRlcHNbMTNdKSA6IG51bGw7XG4gICAgICBkMTQgPSBsZW5ndGggPiAxNCA/IHRoaXMuX2dldEJ5UmVmbGVjdGl2ZURlcGVuZGVuY3kocHJvdmlkZXIsIGRlcHNbMTRdKSA6IG51bGw7XG4gICAgICBkMTUgPSBsZW5ndGggPiAxNSA/IHRoaXMuX2dldEJ5UmVmbGVjdGl2ZURlcGVuZGVuY3kocHJvdmlkZXIsIGRlcHNbMTVdKSA6IG51bGw7XG4gICAgICBkMTYgPSBsZW5ndGggPiAxNiA/IHRoaXMuX2dldEJ5UmVmbGVjdGl2ZURlcGVuZGVuY3kocHJvdmlkZXIsIGRlcHNbMTZdKSA6IG51bGw7XG4gICAgICBkMTcgPSBsZW5ndGggPiAxNyA/IHRoaXMuX2dldEJ5UmVmbGVjdGl2ZURlcGVuZGVuY3kocHJvdmlkZXIsIGRlcHNbMTddKSA6IG51bGw7XG4gICAgICBkMTggPSBsZW5ndGggPiAxOCA/IHRoaXMuX2dldEJ5UmVmbGVjdGl2ZURlcGVuZGVuY3kocHJvdmlkZXIsIGRlcHNbMThdKSA6IG51bGw7XG4gICAgICBkMTkgPSBsZW5ndGggPiAxOSA/IHRoaXMuX2dldEJ5UmVmbGVjdGl2ZURlcGVuZGVuY3kocHJvdmlkZXIsIGRlcHNbMTldKSA6IG51bGw7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUgaW5zdGFuY2VvZiBBYnN0cmFjdFByb3ZpZGVyRXJyb3IgfHwgZSBpbnN0YW5jZW9mIEluc3RhbnRpYXRpb25FcnJvcikge1xuICAgICAgICBlLmFkZEtleSh0aGlzLCBwcm92aWRlci5rZXkpO1xuICAgICAgfVxuICAgICAgdGhyb3cgZTtcbiAgICB9XG5cbiAgICB2YXIgb2JqO1xuICAgIHRyeSB7XG4gICAgICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgb2JqID0gZmFjdG9yeSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgb2JqID0gZmFjdG9yeShkMCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBvYmogPSBmYWN0b3J5KGQwLCBkMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBvYmogPSBmYWN0b3J5KGQwLCBkMSwgZDIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgb2JqID0gZmFjdG9yeShkMCwgZDEsIGQyLCBkMyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNTpcbiAgICAgICAgICBvYmogPSBmYWN0b3J5KGQwLCBkMSwgZDIsIGQzLCBkNCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNjpcbiAgICAgICAgICBvYmogPSBmYWN0b3J5KGQwLCBkMSwgZDIsIGQzLCBkNCwgZDUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgb2JqID0gZmFjdG9yeShkMCwgZDEsIGQyLCBkMywgZDQsIGQ1LCBkNik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgODpcbiAgICAgICAgICBvYmogPSBmYWN0b3J5KGQwLCBkMSwgZDIsIGQzLCBkNCwgZDUsIGQ2LCBkNyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgOTpcbiAgICAgICAgICBvYmogPSBmYWN0b3J5KGQwLCBkMSwgZDIsIGQzLCBkNCwgZDUsIGQ2LCBkNywgZDgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgIG9iaiA9IGZhY3RvcnkoZDAsIGQxLCBkMiwgZDMsIGQ0LCBkNSwgZDYsIGQ3LCBkOCwgZDkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDExOlxuICAgICAgICAgIG9iaiA9IGZhY3RvcnkoZDAsIGQxLCBkMiwgZDMsIGQ0LCBkNSwgZDYsIGQ3LCBkOCwgZDksIGQxMCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgb2JqID0gZmFjdG9yeShkMCwgZDEsIGQyLCBkMywgZDQsIGQ1LCBkNiwgZDcsIGQ4LCBkOSwgZDEwLCBkMTEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgIG9iaiA9IGZhY3RvcnkoZDAsIGQxLCBkMiwgZDMsIGQ0LCBkNSwgZDYsIGQ3LCBkOCwgZDksIGQxMCwgZDExLCBkMTIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE0OlxuICAgICAgICAgIG9iaiA9IGZhY3RvcnkoZDAsIGQxLCBkMiwgZDMsIGQ0LCBkNSwgZDYsIGQ3LCBkOCwgZDksIGQxMCwgZDExLCBkMTIsIGQxMyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTU6XG4gICAgICAgICAgb2JqID0gZmFjdG9yeShkMCwgZDEsIGQyLCBkMywgZDQsIGQ1LCBkNiwgZDcsIGQ4LCBkOSwgZDEwLCBkMTEsIGQxMiwgZDEzLCBkMTQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE2OlxuICAgICAgICAgIG9iaiA9IGZhY3RvcnkoZDAsIGQxLCBkMiwgZDMsIGQ0LCBkNSwgZDYsIGQ3LCBkOCwgZDksIGQxMCwgZDExLCBkMTIsIGQxMywgZDE0LCBkMTUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE3OlxuICAgICAgICAgIG9iaiA9IGZhY3RvcnkoZDAsIGQxLCBkMiwgZDMsIGQ0LCBkNSwgZDYsIGQ3LCBkOCwgZDksIGQxMCwgZDExLCBkMTIsIGQxMywgZDE0LCBkMTUsIGQxNik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTg6XG4gICAgICAgICAgb2JqID0gZmFjdG9yeShkMCwgZDEsIGQyLCBkMywgZDQsIGQ1LCBkNiwgZDcsIGQ4LCBkOSwgZDEwLCBkMTEsIGQxMiwgZDEzLCBkMTQsIGQxNSwgZDE2LFxuICAgICAgICAgICAgICAgICAgICAgICAgZDE3KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOTpcbiAgICAgICAgICBvYmogPSBmYWN0b3J5KGQwLCBkMSwgZDIsIGQzLCBkNCwgZDUsIGQ2LCBkNywgZDgsIGQ5LCBkMTAsIGQxMSwgZDEyLCBkMTMsIGQxNCwgZDE1LCBkMTYsXG4gICAgICAgICAgICAgICAgICAgICAgICBkMTcsIGQxOCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjA6XG4gICAgICAgICAgb2JqID0gZmFjdG9yeShkMCwgZDEsIGQyLCBkMywgZDQsIGQ1LCBkNiwgZDcsIGQ4LCBkOSwgZDEwLCBkMTEsIGQxMiwgZDEzLCBkMTQsIGQxNSwgZDE2LFxuICAgICAgICAgICAgICAgICAgICAgICAgZDE3LCBkMTgsIGQxOSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgICAgICAgIGBDYW5ub3QgaW5zdGFudGlhdGUgJyR7cHJvdmlkZXIua2V5LmRpc3BsYXlOYW1lfScgYmVjYXVzZSBpdCBoYXMgbW9yZSB0aGFuIDIwIGRlcGVuZGVuY2llc2ApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBJbnN0YW50aWF0aW9uRXJyb3IodGhpcywgZSwgZS5zdGFjaywgcHJvdmlkZXIua2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEJ5UmVmbGVjdGl2ZURlcGVuZGVuY3kocHJvdmlkZXI6IFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcDogUmVmbGVjdGl2ZURlcGVuZGVuY3kpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9nZXRCeUtleShkZXAua2V5LCBkZXAubG93ZXJCb3VuZFZpc2liaWxpdHksIGRlcC51cHBlckJvdW5kVmlzaWJpbGl0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwLm9wdGlvbmFsID8gbnVsbCA6IFRIUk9XX0lGX05PVF9GT1VORCk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRCeUtleShrZXk6IFJlZmxlY3RpdmVLZXksIGxvd2VyQm91bmRWaXNpYmlsaXR5OiBPYmplY3QsIHVwcGVyQm91bmRWaXNpYmlsaXR5OiBPYmplY3QsXG4gICAgICAgICAgICAgICAgICAgIG5vdEZvdW5kVmFsdWU6IGFueSk6IGFueSB7XG4gICAgaWYgKGtleSA9PT0gSU5KRUNUT1JfS0VZKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAodXBwZXJCb3VuZFZpc2liaWxpdHkgaW5zdGFuY2VvZiBTZWxmTWV0YWRhdGEpIHtcbiAgICAgIHJldHVybiB0aGlzLl9nZXRCeUtleVNlbGYoa2V5LCBub3RGb3VuZFZhbHVlKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5fZ2V0QnlLZXlEZWZhdWx0KGtleSwgbm90Rm91bmRWYWx1ZSwgbG93ZXJCb3VuZFZpc2liaWxpdHkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3Rocm93T3JOdWxsKGtleTogUmVmbGVjdGl2ZUtleSwgbm90Rm91bmRWYWx1ZTogYW55KTogYW55IHtcbiAgICBpZiAobm90Rm91bmRWYWx1ZSAhPT0gVEhST1dfSUZfTk9UX0ZPVU5EKSB7XG4gICAgICByZXR1cm4gbm90Rm91bmRWYWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IE5vUHJvdmlkZXJFcnJvcih0aGlzLCBrZXkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2dldEJ5S2V5U2VsZihrZXk6IFJlZmxlY3RpdmVLZXksIG5vdEZvdW5kVmFsdWU6IGFueSk6IGFueSB7XG4gICAgdmFyIG9iaiA9IHRoaXMuX3N0cmF0ZWd5LmdldE9iakJ5S2V5SWQoa2V5LmlkKTtcbiAgICByZXR1cm4gKG9iaiAhPT0gVU5ERUZJTkVEKSA/IG9iaiA6IHRoaXMuX3Rocm93T3JOdWxsKGtleSwgbm90Rm91bmRWYWx1ZSk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9nZXRCeUtleURlZmF1bHQoa2V5OiBSZWZsZWN0aXZlS2V5LCBub3RGb3VuZFZhbHVlOiBhbnksIGxvd2VyQm91bmRWaXNpYmlsaXR5OiBPYmplY3QpOiBhbnkge1xuICAgIHZhciBpbmo6IEluamVjdG9yO1xuXG4gICAgaWYgKGxvd2VyQm91bmRWaXNpYmlsaXR5IGluc3RhbmNlb2YgU2tpcFNlbGZNZXRhZGF0YSkge1xuICAgICAgaW5qID0gdGhpcy5fcGFyZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICBpbmogPSB0aGlzO1xuICAgIH1cblxuICAgIHdoaWxlIChpbmogaW5zdGFuY2VvZiBSZWZsZWN0aXZlSW5qZWN0b3JfKSB7XG4gICAgICB2YXIgaW5qXyA9IDxSZWZsZWN0aXZlSW5qZWN0b3JfPmluajtcbiAgICAgIHZhciBvYmogPSBpbmpfLl9zdHJhdGVneS5nZXRPYmpCeUtleUlkKGtleS5pZCk7XG4gICAgICBpZiAob2JqICE9PSBVTkRFRklORUQpIHJldHVybiBvYmo7XG4gICAgICBpbmogPSBpbmpfLl9wYXJlbnQ7XG4gICAgfVxuICAgIGlmIChpbmogIT09IG51bGwpIHtcbiAgICAgIHJldHVybiBpbmouZ2V0KGtleS50b2tlbiwgbm90Rm91bmRWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLl90aHJvd09yTnVsbChrZXksIG5vdEZvdW5kVmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBkaXNwbGF5TmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgUmVmbGVjdGl2ZUluamVjdG9yKHByb3ZpZGVyczogWyR7X21hcFByb3ZpZGVycyh0aGlzLCAoYjogUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXIpID0+IGAgXCIke2Iua2V5LmRpc3BsYXlOYW1lfVwiIGApLmpvaW4oXCIsIFwiKX1dKWA7XG4gIH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5kaXNwbGF5TmFtZTsgfVxufVxuXG52YXIgSU5KRUNUT1JfS0VZID0gUmVmbGVjdGl2ZUtleS5nZXQoSW5qZWN0b3IpO1xuXG5mdW5jdGlvbiBfbWFwUHJvdmlkZXJzKGluamVjdG9yOiBSZWZsZWN0aXZlSW5qZWN0b3JfLCBmbjogRnVuY3Rpb24pOiBhbnlbXSB7XG4gIHZhciByZXMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmplY3Rvci5fcHJvdG8ubnVtYmVyT2ZQcm92aWRlcnM7ICsraSkge1xuICAgIHJlcy5wdXNoKGZuKGluamVjdG9yLl9wcm90by5nZXRQcm92aWRlckF0SW5kZXgoaSkpKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
