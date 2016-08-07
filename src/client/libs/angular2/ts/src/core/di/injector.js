System.register(['angular2/src/facade/collection', './provider', './exceptions', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions', './key', './metadata'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var collection_1, provider_1, exceptions_1, lang_1, exceptions_2, key_1, metadata_1;
    var _MAX_CONSTRUCTION_COUNTER, UNDEFINED, Visibility, ProtoInjectorInlineStrategy, ProtoInjectorDynamicStrategy, ProtoInjector, InjectorInlineStrategy, InjectorDynamicStrategy, ProviderWithVisibility, Injector, INJECTOR_KEY;
    function canSee(src, dst) {
        return (src === dst) ||
            (dst === Visibility.PublicAndPrivate || src === Visibility.PublicAndPrivate);
    }
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
            function (provider_1_1) {
                provider_1 = provider_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_2_1) {
                exceptions_2 = exceptions_2_1;
            },
            function (key_1_1) {
                key_1 = key_1_1;
            },
            function (metadata_1_1) {
                metadata_1 = metadata_1_1;
            }],
        execute: function() {
            // Threshold for the dynamic version
            _MAX_CONSTRUCTION_COUNTER = 10;
            exports_1("UNDEFINED", UNDEFINED = lang_1.CONST_EXPR(new Object()));
            /**
             * Visibility of a {@link Provider}.
             */
            (function (Visibility) {
                /**
                 * A `Public` {@link Provider} is only visible to regular (as opposed to host) child injectors.
                 */
                Visibility[Visibility["Public"] = 0] = "Public";
                /**
                 * A `Private` {@link Provider} is only visible to host (as opposed to regular) child injectors.
                 */
                Visibility[Visibility["Private"] = 1] = "Private";
                /**
                 * A `PublicAndPrivate` {@link Provider} is visible to both host and regular child injectors.
                 */
                Visibility[Visibility["PublicAndPrivate"] = 2] = "PublicAndPrivate";
            })(Visibility || (Visibility = {}));
            exports_1("Visibility", Visibility);
            ProtoInjectorInlineStrategy = (function () {
                function ProtoInjectorInlineStrategy(protoEI, bwv) {
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
                    this.visibility0 = null;
                    this.visibility1 = null;
                    this.visibility2 = null;
                    this.visibility3 = null;
                    this.visibility4 = null;
                    this.visibility5 = null;
                    this.visibility6 = null;
                    this.visibility7 = null;
                    this.visibility8 = null;
                    this.visibility9 = null;
                    var length = bwv.length;
                    if (length > 0) {
                        this.provider0 = bwv[0].provider;
                        this.keyId0 = bwv[0].getKeyId();
                        this.visibility0 = bwv[0].visibility;
                    }
                    if (length > 1) {
                        this.provider1 = bwv[1].provider;
                        this.keyId1 = bwv[1].getKeyId();
                        this.visibility1 = bwv[1].visibility;
                    }
                    if (length > 2) {
                        this.provider2 = bwv[2].provider;
                        this.keyId2 = bwv[2].getKeyId();
                        this.visibility2 = bwv[2].visibility;
                    }
                    if (length > 3) {
                        this.provider3 = bwv[3].provider;
                        this.keyId3 = bwv[3].getKeyId();
                        this.visibility3 = bwv[3].visibility;
                    }
                    if (length > 4) {
                        this.provider4 = bwv[4].provider;
                        this.keyId4 = bwv[4].getKeyId();
                        this.visibility4 = bwv[4].visibility;
                    }
                    if (length > 5) {
                        this.provider5 = bwv[5].provider;
                        this.keyId5 = bwv[5].getKeyId();
                        this.visibility5 = bwv[5].visibility;
                    }
                    if (length > 6) {
                        this.provider6 = bwv[6].provider;
                        this.keyId6 = bwv[6].getKeyId();
                        this.visibility6 = bwv[6].visibility;
                    }
                    if (length > 7) {
                        this.provider7 = bwv[7].provider;
                        this.keyId7 = bwv[7].getKeyId();
                        this.visibility7 = bwv[7].visibility;
                    }
                    if (length > 8) {
                        this.provider8 = bwv[8].provider;
                        this.keyId8 = bwv[8].getKeyId();
                        this.visibility8 = bwv[8].visibility;
                    }
                    if (length > 9) {
                        this.provider9 = bwv[9].provider;
                        this.keyId9 = bwv[9].getKeyId();
                        this.visibility9 = bwv[9].visibility;
                    }
                }
                ProtoInjectorInlineStrategy.prototype.getProviderAtIndex = function (index) {
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
                    throw new exceptions_1.OutOfBoundsError(index);
                };
                ProtoInjectorInlineStrategy.prototype.createInjectorStrategy = function (injector) {
                    return new InjectorInlineStrategy(injector, this);
                };
                return ProtoInjectorInlineStrategy;
            }());
            exports_1("ProtoInjectorInlineStrategy", ProtoInjectorInlineStrategy);
            ProtoInjectorDynamicStrategy = (function () {
                function ProtoInjectorDynamicStrategy(protoInj, bwv) {
                    var len = bwv.length;
                    this.providers = collection_1.ListWrapper.createFixedSize(len);
                    this.keyIds = collection_1.ListWrapper.createFixedSize(len);
                    this.visibilities = collection_1.ListWrapper.createFixedSize(len);
                    for (var i = 0; i < len; i++) {
                        this.providers[i] = bwv[i].provider;
                        this.keyIds[i] = bwv[i].getKeyId();
                        this.visibilities[i] = bwv[i].visibility;
                    }
                }
                ProtoInjectorDynamicStrategy.prototype.getProviderAtIndex = function (index) {
                    if (index < 0 || index >= this.providers.length) {
                        throw new exceptions_1.OutOfBoundsError(index);
                    }
                    return this.providers[index];
                };
                ProtoInjectorDynamicStrategy.prototype.createInjectorStrategy = function (ei) {
                    return new InjectorDynamicStrategy(this, ei);
                };
                return ProtoInjectorDynamicStrategy;
            }());
            exports_1("ProtoInjectorDynamicStrategy", ProtoInjectorDynamicStrategy);
            ProtoInjector = (function () {
                function ProtoInjector(bwv) {
                    this.numberOfProviders = bwv.length;
                    this._strategy = bwv.length > _MAX_CONSTRUCTION_COUNTER ?
                        new ProtoInjectorDynamicStrategy(this, bwv) :
                        new ProtoInjectorInlineStrategy(this, bwv);
                }
                ProtoInjector.fromResolvedProviders = function (providers) {
                    var bd = providers.map(function (b) { return new ProviderWithVisibility(b, Visibility.Public); });
                    return new ProtoInjector(bd);
                };
                ProtoInjector.prototype.getProviderAtIndex = function (index) {
                    return this._strategy.getProviderAtIndex(index);
                };
                return ProtoInjector;
            }());
            exports_1("ProtoInjector", ProtoInjector);
            InjectorInlineStrategy = (function () {
                function InjectorInlineStrategy(injector, protoStrategy) {
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
                InjectorInlineStrategy.prototype.resetConstructionCounter = function () { this.injector._constructionCounter = 0; };
                InjectorInlineStrategy.prototype.instantiateProvider = function (provider, visibility) {
                    return this.injector._new(provider, visibility);
                };
                InjectorInlineStrategy.prototype.getObjByKeyId = function (keyId, visibility) {
                    var p = this.protoStrategy;
                    var inj = this.injector;
                    if (p.keyId0 === keyId && canSee(p.visibility0, visibility)) {
                        if (this.obj0 === UNDEFINED) {
                            this.obj0 = inj._new(p.provider0, p.visibility0);
                        }
                        return this.obj0;
                    }
                    if (p.keyId1 === keyId && canSee(p.visibility1, visibility)) {
                        if (this.obj1 === UNDEFINED) {
                            this.obj1 = inj._new(p.provider1, p.visibility1);
                        }
                        return this.obj1;
                    }
                    if (p.keyId2 === keyId && canSee(p.visibility2, visibility)) {
                        if (this.obj2 === UNDEFINED) {
                            this.obj2 = inj._new(p.provider2, p.visibility2);
                        }
                        return this.obj2;
                    }
                    if (p.keyId3 === keyId && canSee(p.visibility3, visibility)) {
                        if (this.obj3 === UNDEFINED) {
                            this.obj3 = inj._new(p.provider3, p.visibility3);
                        }
                        return this.obj3;
                    }
                    if (p.keyId4 === keyId && canSee(p.visibility4, visibility)) {
                        if (this.obj4 === UNDEFINED) {
                            this.obj4 = inj._new(p.provider4, p.visibility4);
                        }
                        return this.obj4;
                    }
                    if (p.keyId5 === keyId && canSee(p.visibility5, visibility)) {
                        if (this.obj5 === UNDEFINED) {
                            this.obj5 = inj._new(p.provider5, p.visibility5);
                        }
                        return this.obj5;
                    }
                    if (p.keyId6 === keyId && canSee(p.visibility6, visibility)) {
                        if (this.obj6 === UNDEFINED) {
                            this.obj6 = inj._new(p.provider6, p.visibility6);
                        }
                        return this.obj6;
                    }
                    if (p.keyId7 === keyId && canSee(p.visibility7, visibility)) {
                        if (this.obj7 === UNDEFINED) {
                            this.obj7 = inj._new(p.provider7, p.visibility7);
                        }
                        return this.obj7;
                    }
                    if (p.keyId8 === keyId && canSee(p.visibility8, visibility)) {
                        if (this.obj8 === UNDEFINED) {
                            this.obj8 = inj._new(p.provider8, p.visibility8);
                        }
                        return this.obj8;
                    }
                    if (p.keyId9 === keyId && canSee(p.visibility9, visibility)) {
                        if (this.obj9 === UNDEFINED) {
                            this.obj9 = inj._new(p.provider9, p.visibility9);
                        }
                        return this.obj9;
                    }
                    return UNDEFINED;
                };
                InjectorInlineStrategy.prototype.getObjAtIndex = function (index) {
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
                    throw new exceptions_1.OutOfBoundsError(index);
                };
                InjectorInlineStrategy.prototype.getMaxNumberOfObjects = function () { return _MAX_CONSTRUCTION_COUNTER; };
                return InjectorInlineStrategy;
            }());
            exports_1("InjectorInlineStrategy", InjectorInlineStrategy);
            InjectorDynamicStrategy = (function () {
                function InjectorDynamicStrategy(protoStrategy, injector) {
                    this.protoStrategy = protoStrategy;
                    this.injector = injector;
                    this.objs = collection_1.ListWrapper.createFixedSize(protoStrategy.providers.length);
                    collection_1.ListWrapper.fill(this.objs, UNDEFINED);
                }
                InjectorDynamicStrategy.prototype.resetConstructionCounter = function () { this.injector._constructionCounter = 0; };
                InjectorDynamicStrategy.prototype.instantiateProvider = function (provider, visibility) {
                    return this.injector._new(provider, visibility);
                };
                InjectorDynamicStrategy.prototype.getObjByKeyId = function (keyId, visibility) {
                    var p = this.protoStrategy;
                    for (var i = 0; i < p.keyIds.length; i++) {
                        if (p.keyIds[i] === keyId && canSee(p.visibilities[i], visibility)) {
                            if (this.objs[i] === UNDEFINED) {
                                this.objs[i] = this.injector._new(p.providers[i], p.visibilities[i]);
                            }
                            return this.objs[i];
                        }
                    }
                    return UNDEFINED;
                };
                InjectorDynamicStrategy.prototype.getObjAtIndex = function (index) {
                    if (index < 0 || index >= this.objs.length) {
                        throw new exceptions_1.OutOfBoundsError(index);
                    }
                    return this.objs[index];
                };
                InjectorDynamicStrategy.prototype.getMaxNumberOfObjects = function () { return this.objs.length; };
                return InjectorDynamicStrategy;
            }());
            exports_1("InjectorDynamicStrategy", InjectorDynamicStrategy);
            ProviderWithVisibility = (function () {
                function ProviderWithVisibility(provider, visibility) {
                    this.provider = provider;
                    this.visibility = visibility;
                }
                ;
                ProviderWithVisibility.prototype.getKeyId = function () { return this.provider.key.id; };
                return ProviderWithVisibility;
            }());
            exports_1("ProviderWithVisibility", ProviderWithVisibility);
            /**
             * A dependency injection container used for instantiating objects and resolving dependencies.
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
             * var injector = Injector.resolveAndCreate([Car, Engine]);
             * var car = injector.get(Car);
             * expect(car instanceof Car).toBe(true);
             * expect(car.engine instanceof Engine).toBe(true);
             * ```
             *
             * Notice, we don't use the `new` operator because we explicitly want to have the `Injector`
             * resolve all of the object's dependencies automatically.
             */
            Injector = (function () {
                /**
                 * Private
                 */
                function Injector(_proto /* ProtoInjector */, _parent, _isHostBoundary, _depProvider, _debugContext) {
                    if (_parent === void 0) { _parent = null; }
                    if (_isHostBoundary === void 0) { _isHostBoundary = false; }
                    if (_depProvider === void 0) { _depProvider = null; }
                    if (_debugContext === void 0) { _debugContext = null; }
                    this._isHostBoundary = _isHostBoundary;
                    this._depProvider = _depProvider;
                    this._debugContext = _debugContext;
                    /** @internal */
                    this._constructionCounter = 0;
                    this._proto = _proto;
                    this._parent = _parent;
                    this._strategy = _proto._strategy.createInjectorStrategy(this);
                }
                /**
                 * Turns an array of provider definitions into an array of resolved providers.
                 *
                 * A resolution is a process of flattening multiple nested arrays and converting individual
                 * providers into an array of {@link ResolvedProvider}s.
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
                 * var providers = Injector.resolve([Car, [[Engine]]]);
                 *
                 * expect(providers.length).toEqual(2);
                 *
                 * expect(providers[0] instanceof ResolvedProvider).toBe(true);
                 * expect(providers[0].key.displayName).toBe("Car");
                 * expect(providers[0].dependencies.length).toEqual(1);
                 * expect(providers[0].factory).toBeDefined();
                 *
                 * expect(providers[1].key.displayName).toBe("Engine");
                 * });
                 * ```
                 *
                 * See {@link Injector#fromResolvedProviders} for more info.
                 */
                Injector.resolve = function (providers) {
                    return provider_1.resolveProviders(providers);
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
                 * var injector = Injector.resolveAndCreate([Car, Engine]);
                 * expect(injector.get(Car) instanceof Car).toBe(true);
                 * ```
                 *
                 * This function is slower than the corresponding `fromResolvedProviders`
                 * because it needs to resolve the passed-in providers first.
                 * See {@link Injector#resolve} and {@link Injector#fromResolvedProviders}.
                 */
                Injector.resolveAndCreate = function (providers) {
                    var resolvedProviders = Injector.resolve(providers);
                    return Injector.fromResolvedProviders(resolvedProviders);
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
                 * var providers = Injector.resolve([Car, Engine]);
                 * var injector = Injector.fromResolvedProviders(providers);
                 * expect(injector.get(Car) instanceof Car).toBe(true);
                 * ```
                 */
                Injector.fromResolvedProviders = function (providers) {
                    return new Injector(ProtoInjector.fromResolvedProviders(providers));
                };
                /**
                 * @deprecated
                 */
                Injector.fromResolvedBindings = function (providers) {
                    return Injector.fromResolvedProviders(providers);
                };
                Object.defineProperty(Injector.prototype, "hostBoundary", {
                    /**
                     * Whether this injector is a boundary to a host.
                     * @internal
                     */
                    get: function () { return this._isHostBoundary; },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * @internal
                 */
                Injector.prototype.debugContext = function () { return this._debugContext(); };
                /**
                 * Retrieves an instance from the injector based on the provided token.
                 * Throws {@link NoProviderError} if not found.
                 *
                 * ### Example ([live demo](http://plnkr.co/edit/HeXSHg?p=preview))
                 *
                 * ```typescript
                 * var injector = Injector.resolveAndCreate([
                 *   provide("validToken", {useValue: "Value"})
                 * ]);
                 * expect(injector.get("validToken")).toEqual("Value");
                 * expect(() => injector.get("invalidToken")).toThrowError();
                 * ```
                 *
                 * `Injector` returns itself when given `Injector` as a token.
                 *
                 * ```typescript
                 * var injector = Injector.resolveAndCreate([]);
                 * expect(injector.get(Injector)).toBe(injector);
                 * ```
                 */
                Injector.prototype.get = function (token) {
                    return this._getByKey(key_1.Key.get(token), null, null, false, Visibility.PublicAndPrivate);
                };
                /**
                 * Retrieves an instance from the injector based on the provided token.
                 * Returns null if not found.
                 *
                 * ### Example ([live demo](http://plnkr.co/edit/tpEbEy?p=preview))
                 *
                 * ```typescript
                 * var injector = Injector.resolveAndCreate([
                 *   provide("validToken", {useValue: "Value"})
                 * ]);
                 * expect(injector.getOptional("validToken")).toEqual("Value");
                 * expect(injector.getOptional("invalidToken")).toBe(null);
                 * ```
                 *
                 * `Injector` returns itself when given `Injector` as a token.
                 *
                 * ```typescript
                 * var injector = Injector.resolveAndCreate([]);
                 * expect(injector.getOptional(Injector)).toBe(injector);
                 * ```
                 */
                Injector.prototype.getOptional = function (token) {
                    return this._getByKey(key_1.Key.get(token), null, null, true, Visibility.PublicAndPrivate);
                };
                /**
                 * @internal
                 */
                Injector.prototype.getAt = function (index) { return this._strategy.getObjAtIndex(index); };
                Object.defineProperty(Injector.prototype, "parent", {
                    /**
                     * Parent of this injector.
                     *
                     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
                     * -->
                     *
                     * ### Example ([live demo](http://plnkr.co/edit/eosMGo?p=preview))
                     *
                     * ```typescript
                     * var parent = Injector.resolveAndCreate([]);
                     * var child = parent.resolveAndCreateChild([]);
                     * expect(child.parent).toBe(parent);
                     * ```
                     */
                    get: function () { return this._parent; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Injector.prototype, "internalStrategy", {
                    /**
                     * @internal
                     * Internal. Do not use.
                     * We return `any` not to export the InjectorStrategy type.
                     */
                    get: function () { return this._strategy; },
                    enumerable: true,
                    configurable: true
                });
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
                 * var parent = Injector.resolveAndCreate([ParentProvider]);
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
                Injector.prototype.resolveAndCreateChild = function (providers) {
                    var resolvedProviders = Injector.resolve(providers);
                    return this.createChildFromResolved(resolvedProviders);
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
                 * var parentProviders = Injector.resolve([ParentProvider]);
                 * var childProviders = Injector.resolve([ChildProvider]);
                 *
                 * var parent = Injector.fromResolvedProviders(parentProviders);
                 * var child = parent.createChildFromResolved(childProviders);
                 *
                 * expect(child.get(ParentProvider) instanceof ParentProvider).toBe(true);
                 * expect(child.get(ChildProvider) instanceof ChildProvider).toBe(true);
                 * expect(child.get(ParentProvider)).toBe(parent.get(ParentProvider));
                 * ```
                 */
                Injector.prototype.createChildFromResolved = function (providers) {
                    var bd = providers.map(function (b) { return new ProviderWithVisibility(b, Visibility.Public); });
                    var proto = new ProtoInjector(bd);
                    var inj = new Injector(proto);
                    inj._parent = this;
                    return inj;
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
                 * var injector = Injector.resolveAndCreate([Engine]);
                 *
                 * var car = injector.resolveAndInstantiate(Car);
                 * expect(car.engine).toBe(injector.get(Engine));
                 * expect(car).not.toBe(injector.resolveAndInstantiate(Car));
                 * ```
                 */
                Injector.prototype.resolveAndInstantiate = function (provider) {
                    return this.instantiateResolved(Injector.resolve([provider])[0]);
                };
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
                 * var injector = Injector.resolveAndCreate([Engine]);
                 * var carProvider = Injector.resolve([Car])[0];
                 * var car = injector.instantiateResolved(carProvider);
                 * expect(car.engine).toBe(injector.get(Engine));
                 * expect(car).not.toBe(injector.instantiateResolved(carProvider));
                 * ```
                 */
                Injector.prototype.instantiateResolved = function (provider) {
                    return this._instantiateProvider(provider, Visibility.PublicAndPrivate);
                };
                /** @internal */
                Injector.prototype._new = function (provider, visibility) {
                    if (this._constructionCounter++ > this._strategy.getMaxNumberOfObjects()) {
                        throw new exceptions_1.CyclicDependencyError(this, provider.key);
                    }
                    return this._instantiateProvider(provider, visibility);
                };
                Injector.prototype._instantiateProvider = function (provider, visibility) {
                    if (provider.multiProvider) {
                        var res = collection_1.ListWrapper.createFixedSize(provider.resolvedFactories.length);
                        for (var i = 0; i < provider.resolvedFactories.length; ++i) {
                            res[i] = this._instantiate(provider, provider.resolvedFactories[i], visibility);
                        }
                        return res;
                    }
                    else {
                        return this._instantiate(provider, provider.resolvedFactories[0], visibility);
                    }
                };
                Injector.prototype._instantiate = function (provider, resolvedFactory, visibility) {
                    var factory = resolvedFactory.factory;
                    var deps = resolvedFactory.dependencies;
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
                        d0 = length > 0 ? this._getByDependency(provider, deps[0], visibility) : null;
                        d1 = length > 1 ? this._getByDependency(provider, deps[1], visibility) : null;
                        d2 = length > 2 ? this._getByDependency(provider, deps[2], visibility) : null;
                        d3 = length > 3 ? this._getByDependency(provider, deps[3], visibility) : null;
                        d4 = length > 4 ? this._getByDependency(provider, deps[4], visibility) : null;
                        d5 = length > 5 ? this._getByDependency(provider, deps[5], visibility) : null;
                        d6 = length > 6 ? this._getByDependency(provider, deps[6], visibility) : null;
                        d7 = length > 7 ? this._getByDependency(provider, deps[7], visibility) : null;
                        d8 = length > 8 ? this._getByDependency(provider, deps[8], visibility) : null;
                        d9 = length > 9 ? this._getByDependency(provider, deps[9], visibility) : null;
                        d10 = length > 10 ? this._getByDependency(provider, deps[10], visibility) : null;
                        d11 = length > 11 ? this._getByDependency(provider, deps[11], visibility) : null;
                        d12 = length > 12 ? this._getByDependency(provider, deps[12], visibility) : null;
                        d13 = length > 13 ? this._getByDependency(provider, deps[13], visibility) : null;
                        d14 = length > 14 ? this._getByDependency(provider, deps[14], visibility) : null;
                        d15 = length > 15 ? this._getByDependency(provider, deps[15], visibility) : null;
                        d16 = length > 16 ? this._getByDependency(provider, deps[16], visibility) : null;
                        d17 = length > 17 ? this._getByDependency(provider, deps[17], visibility) : null;
                        d18 = length > 18 ? this._getByDependency(provider, deps[18], visibility) : null;
                        d19 = length > 19 ? this._getByDependency(provider, deps[19], visibility) : null;
                    }
                    catch (e) {
                        if (e instanceof exceptions_1.AbstractProviderError || e instanceof exceptions_1.InstantiationError) {
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
                                throw new exceptions_2.BaseException("Cannot instantiate '" + provider.key.displayName + "' because it has more than 20 dependencies");
                        }
                    }
                    catch (e) {
                        throw new exceptions_1.InstantiationError(this, e, e.stack, provider.key);
                    }
                    return obj;
                };
                Injector.prototype._getByDependency = function (provider, dep, providerVisibility) {
                    var special = lang_1.isPresent(this._depProvider) ?
                        this._depProvider.getDependency(this, provider, dep) :
                        UNDEFINED;
                    if (special !== UNDEFINED) {
                        return special;
                    }
                    else {
                        return this._getByKey(dep.key, dep.lowerBoundVisibility, dep.upperBoundVisibility, dep.optional, providerVisibility);
                    }
                };
                Injector.prototype._getByKey = function (key, lowerBoundVisibility, upperBoundVisibility, optional, providerVisibility) {
                    if (key === INJECTOR_KEY) {
                        return this;
                    }
                    if (upperBoundVisibility instanceof metadata_1.SelfMetadata) {
                        return this._getByKeySelf(key, optional, providerVisibility);
                    }
                    else if (upperBoundVisibility instanceof metadata_1.HostMetadata) {
                        return this._getByKeyHost(key, optional, providerVisibility, lowerBoundVisibility);
                    }
                    else {
                        return this._getByKeyDefault(key, optional, providerVisibility, lowerBoundVisibility);
                    }
                };
                /** @internal */
                Injector.prototype._throwOrNull = function (key, optional) {
                    if (optional) {
                        return null;
                    }
                    else {
                        throw new exceptions_1.NoProviderError(this, key);
                    }
                };
                /** @internal */
                Injector.prototype._getByKeySelf = function (key, optional, providerVisibility) {
                    var obj = this._strategy.getObjByKeyId(key.id, providerVisibility);
                    return (obj !== UNDEFINED) ? obj : this._throwOrNull(key, optional);
                };
                /** @internal */
                Injector.prototype._getByKeyHost = function (key, optional, providerVisibility, lowerBoundVisibility) {
                    var inj = this;
                    if (lowerBoundVisibility instanceof metadata_1.SkipSelfMetadata) {
                        if (inj._isHostBoundary) {
                            return this._getPrivateDependency(key, optional, inj);
                        }
                        else {
                            inj = inj._parent;
                        }
                    }
                    while (inj != null) {
                        var obj = inj._strategy.getObjByKeyId(key.id, providerVisibility);
                        if (obj !== UNDEFINED)
                            return obj;
                        if (lang_1.isPresent(inj._parent) && inj._isHostBoundary) {
                            return this._getPrivateDependency(key, optional, inj);
                        }
                        else {
                            inj = inj._parent;
                        }
                    }
                    return this._throwOrNull(key, optional);
                };
                /** @internal */
                Injector.prototype._getPrivateDependency = function (key, optional, inj) {
                    var obj = inj._parent._strategy.getObjByKeyId(key.id, Visibility.Private);
                    return (obj !== UNDEFINED) ? obj : this._throwOrNull(key, optional);
                };
                /** @internal */
                Injector.prototype._getByKeyDefault = function (key, optional, providerVisibility, lowerBoundVisibility) {
                    var inj = this;
                    if (lowerBoundVisibility instanceof metadata_1.SkipSelfMetadata) {
                        providerVisibility = inj._isHostBoundary ? Visibility.PublicAndPrivate : Visibility.Public;
                        inj = inj._parent;
                    }
                    while (inj != null) {
                        var obj = inj._strategy.getObjByKeyId(key.id, providerVisibility);
                        if (obj !== UNDEFINED)
                            return obj;
                        providerVisibility = inj._isHostBoundary ? Visibility.PublicAndPrivate : Visibility.Public;
                        inj = inj._parent;
                    }
                    return this._throwOrNull(key, optional);
                };
                Object.defineProperty(Injector.prototype, "displayName", {
                    get: function () {
                        return "Injector(providers: [" + _mapProviders(this, function (b) { return (" \"" + b.key.displayName + "\" "); }).join(", ") + "])";
                    },
                    enumerable: true,
                    configurable: true
                });
                Injector.prototype.toString = function () { return this.displayName; };
                return Injector;
            }());
            exports_1("Injector", Injector);
            INJECTOR_KEY = key_1.Key.get(Injector);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvZGkvaW5qZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQXdCTSx5QkFBeUIsRUFFbEIsU0FBUywyS0EwOUJsQixZQUFZO0lBdDhCaEIsZ0JBQWdCLEdBQWUsRUFBRSxHQUFlO1FBQzlDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUM7WUFDYixDQUFDLEdBQUcsS0FBSyxVQUFVLENBQUMsZ0JBQWdCLElBQUksR0FBRyxLQUFLLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFzOEJELHVCQUF1QixRQUFrQixFQUFFLEVBQVk7UUFDckQsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDM0QsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEQsQ0FBQztRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDYixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBdCtCRCxvQ0FBb0M7WUFDOUIseUJBQXlCLEdBQUcsRUFBRSxDQUFDO1lBRXhCLHVCQUFBLFNBQVMsR0FBVyxpQkFBVSxDQUFDLElBQUksTUFBTSxFQUFFLENBQUMsQ0FBQSxDQUFDO1lBRTFEOztlQUVHO1lBQ0gsV0FBWSxVQUFVO2dCQUNwQjs7bUJBRUc7Z0JBQ0gsK0NBQU0sQ0FBQTtnQkFDTjs7bUJBRUc7Z0JBQ0gsaURBQU8sQ0FBQTtnQkFDUDs7bUJBRUc7Z0JBQ0gsbUVBQWdCLENBQUE7WUFDbEIsQ0FBQyxFQWJXLFVBQVUsS0FBVixVQUFVLFFBYXJC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QyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUN0QyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUN0QyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUN0QyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUN0QyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUN0QyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUN0QyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUN0QyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUN0QyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUN0QyxNQUFNLElBQUksNkJBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3BDLENBQUM7Z0JBRUQsNERBQXNCLEdBQXRCLFVBQXVCLFFBQWtCO29CQUN2QyxNQUFNLENBQUMsSUFBSSxzQkFBc0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3BELENBQUM7Z0JBQ0gsa0NBQUM7WUFBRCxDQTFHQSxBQTBHQyxJQUFBO1lBMUdELHFFQTBHQyxDQUFBO1lBRUQ7Z0JBS0Usc0NBQVksUUFBdUIs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QUMsQ0FBQyxDQUFDLENBQUM7d0JBQzVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQzs0QkFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUNuRCxDQUFDO3dCQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNuQixDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssS0FBSyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDNUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDOzRCQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBQ25ELENBQUM7d0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQ25CLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxLQUFLLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM1RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7NEJBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDbkQsQ0FBQzt3QkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDbkIsQ0FBQztvQkFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLEtBQUssSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQzs0QkFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUNuRCxDQUFDO3dCQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNuQixDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssS0FBSyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDNUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDOzRCQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBQ25ELENBQUM7d0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQ25CLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxLQUFLLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM1RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7NEJBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDbkQsQ0FBQzt3QkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDbkIsQ0FBQztvQkFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLEtBQUssSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQzs0QkFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUNuRCxDQUFDO3dCQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNuQixDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssS0FBSyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDNUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDOzRCQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBQ25ELENBQUM7d0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQ25CLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxLQUFLLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM1RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7NEJBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDbkQsQ0FBQzt3QkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDbkIsQ0FBQztvQkFFRCxNQUFNLENBQUMsU0FBUyxDQUFDO2dCQUNuQixDQUFDO2dCQUVELDhDQUFhLEdBQWIsVUFBYyxLQUFhO29CQUN6QixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNqQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNqQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNqQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNqQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNqQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNqQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNqQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNqQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNqQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFD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LENBQUM7b0JBQ2IsSUFBSSxHQUFRLENBQUM7b0JBQ2IsSUFBSSxDQUFDO3dCQUNILEVBQUUsR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQzt3QkFDOUUsRUFBRSxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDO3dCQUM5RSxFQUFFLEdBQUcsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUM7d0JBQzlFLEVBQUUsR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQzt3QkFDOUUsRUFBRSxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDO3dCQUM5RSxFQUFFLEdBQUcsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUM7d0JBQzlFLEVBQUUsR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQzt3QkFDOUUsRUFBRSxHQUFHLE1BQU0sR0FB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QUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOzRCQUNmLEtBQUssQ0FBQztnQ0FDSixHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUM7Z0NBQ2hCLEtBQUssQ0FBQzs0QkFDUixLQUFLLENBQUM7Z0NBQ0osR0FBRyxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQ0FDbEIsS0FBSyxDQUFDOzRCQUNSLEtBQUssQ0FBQztnQ0FDSixHQUFHLEdBQUcsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQ0FDdEIsS0FBSyxDQUFDOzRCQUNSLEtBQUssQ0FBQztnQ0FDSixHQUFHLEdBQUcsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0NBQzFCLEtBQUssQ0FBQzs0QkFDUixLQUFLLENBQUM7Z0NBQ0osR0FBRyxHQUFHLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQ0FDOUIsS0FBSyxDQUFDOzRCQUNSLEtBQUssQ0FBQztnQ0FDSixHQUFHLEdBQUcsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQ0FDbEMsS0FBSyxDQUFDOzRCQUNSLEtBQUssQ0FBQztnQ0FDSixHQUFHLEdBQUcsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0NBQ3RDLEtBQUssQ0FBQzs0QkFDUixLQUFLLENBQUM7Z0NBQ0osR0FBRyxHQUFHLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQ0FDMUMsS0FBSyxDQUFDOzRCQUNSLEtBQUssQ0FBQztnQ0FDSixHQUFHLEdBQUcsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQ0FDOUMsS0FBSyxDQUFDOzRCQUNSLEtBQUssQ0FBQztnQ0FDSixHQUFHLEdBQUcsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0NBQ2xELEtBQUssQ0FBQzs0QkFDUixLQUFLLEVBQUU7Z0NBQ0wsR0FBRyxHQUFHLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQ0FDdEQsS0FBSyxDQUFDOzRCQUNSLEtBQUssRUFBRTtnQ0FDTCxHQUFHLEdBQUcsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztnQ0FDM0QsS0FBSyxDQUFDOzRCQUNSLEtBQUssRUFBRTtnQ0FDTCxHQUFHLEdBQUcsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0NBQ2hFLEtBQUssQ0FBQzs0QkFDUixLQUFLLEVBQUU7Z0NBQ0wsR0FBRyxHQUFHLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQ0FDckUsS0FBSyxDQUFDOzRCQUNSLEtBQUssRUFBRTtnQ0FDTCxHQUFHLEdBQUcsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQ0FDMUUsS0FBSyxDQUFDOzRCQUNSLEtBQUssRUFBRTtnQ0FDTCxHQUFHLEdBQUcsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0NBQy9FLEtBQUssQ0FBQzs0QkFDUixLQUFLLEVBQUU7Z0NBQ0wsR0FBRyxHQUFHLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQ0FDcEYsS0FBSyxDQUFDOzRCQUNSLEtBQUssRUFBRTtnQ0FDTCxHQUFHLEdBQUcsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztn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QkFDMUMsQ0FBQztnQkFFRCxzQkFBSSxpQ0FBVzt5QkFBZjt3QkFDRSxNQUFNLENBQUMsMEJBQXdCLGFBQWEsQ0FBQyxJQUFJLEVBQUUsVUFBQyxDQUFtQixJQUFLLE9BQUEsU0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsU0FBSSxFQUExQixDQUEwQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFJLENBQUM7b0JBQ3pILENBQUM7OzttQkFBQTtnQkFFRCwyQkFBUSxHQUFSLGNBQXFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDakQsZUFBQztZQUFELENBN2tCQSxBQTZrQkMsSUFBQTtZQTdrQkQsK0JBNmtCQyxDQUFBO1lBRUcsWUFBWSxHQUFHLFNBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29yZS9kaS9pbmplY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TWFwLCBNYXBXcmFwcGVyLCBMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7XG4gIFJlc29sdmVkUHJvdmlkZXIsXG4gIFByb3ZpZGVyLFxuICBEZXBlbmRlbmN5LFxuICBQcm92aWRlckJ1aWxkZXIsXG4gIFJlc29sdmVkRmFjdG9yeSxcbiAgcHJvdmlkZSxcbiAgcmVzb2x2ZVByb3ZpZGVyc1xufSBmcm9tICcuL3Byb3ZpZGVyJztcbmltcG9ydCB7XG4gIEFic3RyYWN0UHJvdmlkZXJFcnJvcixcbiAgTm9Qcm92aWRlckVycm9yLFxuICBDeWNsaWNEZXBlbmRlbmN5RXJyb3IsXG4gIEluc3RhbnRpYXRpb25FcnJvcixcbiAgSW52YWxpZFByb3ZpZGVyRXJyb3IsXG4gIE91dE9mQm91bmRzRXJyb3Jcbn0gZnJvbSAnLi9leGNlcHRpb25zJztcbmltcG9ydCB7RnVuY3Rpb25XcmFwcGVyLCBUeXBlLCBpc1ByZXNlbnQsIGlzQmxhbmssIENPTlNUX0VYUFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge0tleX0gZnJvbSAnLi9rZXknO1xuaW1wb3J0IHtTZWxmTWV0YWRhdGEsIEhvc3RNZXRhZGF0YSwgU2tpcFNlbGZNZXRhZGF0YX0gZnJvbSAnLi9tZXRhZGF0YSc7XG5cbi8vIFRocmVzaG9sZCBmb3IgdGhlIGR5bmFtaWMgdmVyc2lvblxuY29uc3QgX01BWF9DT05TVFJVQ1RJT05fQ09VTlRFUiA9IDEwO1xuXG5leHBvcnQgY29uc3QgVU5ERUZJTkVEOiBPYmplY3QgPSBDT05TVF9FWFBSKG5ldyBPYmplY3QoKSk7XG5cbi8qKlxuICogVmlzaWJpbGl0eSBvZiBhIHtAbGluayBQcm92aWRlcn0uXG4gKi9cbmV4cG9ydCBlbnVtIFZpc2liaWxpdHkge1xuICAvKipcbiAgICogQSBgUHVibGljYCB7QGxpbmsgUHJvdmlkZXJ9IGlzIG9ubHkgdmlzaWJsZSB0byByZWd1bGFyIChhcyBvcHBvc2VkIHRvIGhvc3QpIGNoaWxkIGluamVjdG9ycy5cbiAgICovXG4gIFB1YmxpYyxcbiAgLyoqXG4gICAqIEEgYFByaXZhdGVgIHtAbGluayBQcm92aWRlcn0gaXMgb25seSB2aXNpYmxlIHRvIGhvc3QgKGFzIG9wcG9zZWQgdG8gcmVndWxhcikgY2hpbGQgaW5qZWN0b3JzLlxuICAgKi9cbiAgUHJpdmF0ZSxcbiAgLyoqXG4gICAqIEEgYFB1YmxpY0FuZFByaXZhdGVgIHtAbGluayBQcm92aWRlcn0gaXMgdmlzaWJsZSB0byBib3RoIGhvc3QgYW5kIHJlZ3VsYXIgY2hpbGQgaW5qZWN0b3JzLlxuICAgKi9cbiAgUHVibGljQW5kUHJpdmF0ZVxufVxuXG5mdW5jdGlvbiBjYW5TZWUoc3JjOiBWaXNpYmlsaXR5LCBkc3Q6IFZpc2liaWxpdHkpOiBib29sZWFuIHtcbiAgcmV0dXJuIChzcmMgPT09IGRzdCkgfHxcbiAgICAgICAgIChkc3QgPT09IFZpc2liaWxpdHkuUHVibGljQW5kUHJpdmF0ZSB8fCBzcmMgPT09IFZpc2liaWxpdHkuUHVibGljQW5kUHJpdmF0ZSk7XG59XG5cblxuZXhwb3J0IGludGVyZmFjZSBQcm90b0luamVjdG9yU3RyYXRlZ3kge1xuICBnZXRQcm92aWRlckF0SW5kZXgoaW5kZXg6IG51bWJlcik6IFJlc29sdmVkUHJvdmlkZXI7XG4gIGNyZWF0ZUluamVjdG9yU3RyYXRlZ3koaW5qOiBJbmplY3Rvcik6IEluamVjdG9yU3RyYXRlZ3k7XG59XG5cbmV4cG9ydCBjbGFzcyBQcm90b0luamVjdG9ySW5saW5lU3RyYXRlZ3kgaW1wbGVtZW50cyBQcm90b0luamVjdG9yU3RyYXRlZ3kge1xuICBwcm92aWRlcjA6IFJlc29sdmVkUHJvdmlkZXIgPSBudWxsO1xuICBwcm92aWRlcjE6IFJlc29sdmVkUHJvdmlkZXIgPSBudWxsO1xuICBwcm92aWRlcjI6IFJlc29sdmVkUHJvdmlkZXIgPSBudWxsO1xuICBwcm92aWRlcjM6IFJlc29sdmVkUHJvdmlkZXIgPSBudWxsO1xuICBwcm92aWRlcjQ6IFJlc29sdmVkUHJvdmlkZXIgPSBudWxsO1xuICBwcm92aWRlcjU6IFJlc29sdmVkUHJvdmlkZXIgPSBudWxsO1xuICBwcm92aWRlcjY6IFJlc29sdmVkUHJvdmlkZXIgPSBudWxsO1xuICBwcm92aWRlcjc6IFJlc29sdmVkUHJvdmlkZXIgPSBudWxsO1xuICBwcm92aWRlcjg6IFJlc29sdmVkUHJvdmlkZXIgPSBudWxsO1xuICBwcm92aWRlcjk6IFJlc29sdmVkUHJvdmlkZXIgPSBudWxsO1xuXG4gIGtleUlkMDogbnVtYmVyID0gbnVsbDtcbiAga2V5SWQxOiBudW1iZXIgPSBudWxsO1xuICBrZXlJZDI6IG51bWJlciA9IG51bGw7XG4gIGtleUlkMzogbnVtYmVyID0gbnVsbDtcbiAga2V5SWQ0OiBudW1iZXIgPSBudWxsO1xuICBrZXlJZDU6IG51bWJlciA9IG51bGw7XG4gIGtleUlkNjogbnVtYmVyID0gbnVsbDtcbiAga2V5SWQ3OiBudW1iZXIgPSBudWxsO1xuICBrZXlJZDg6IG51bWJlciA9IG51bGw7XG4gIGtleUlkOTogbnVtYmVyID0gbnVsbDtcblxuICB2aXNpYmlsaXR5MDogVmlzaWJpbGl0eSA9IG51bGw7XG4gIHZpc2liaWxpdHkxOiBWaXNpYmlsaXR5ID0gbnVsbDtcbiAgdmlzaWJpbGl0eTI6IFZpc2liaWxpdHkgPSBudWxsO1xuICB2aXNpYmlsaXR5MzogVmlzaWJpbGl0eSA9IG51bGw7XG4gIHZpc2liaWxpdHk0OiBWaXNpYmlsaXR5ID0gbnVsbDtcbiAgdmlzaWJpbGl0eTU6IFZpc2liaWxpdHkgPSBudWxsO1xuICB2aXNpYmlsaXR5NjogVmlzaWJpbGl0eSA9IG51bGw7XG4gIHZpc2liaWxpdHk3OiBWaXNpYmlsaXR5ID0gbnVsbDtcbiAgdmlzaWJpbGl0eTg6IFZpc2liaWxpdHkgPSBudWxsO1xuICB2aXNpYmlsaXR5OTogVmlzaWJpbGl0eSA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJvdG9FSTogUHJvdG9JbmplY3RvciwgYnd2OiBQcm92aWRlcldpdGhWaXNpYmlsaXR5W10pIHtcbiAgICB2YXIgbGVuZ3RoID0gYnd2Lmxlbmd0aDtcblxuICAgIGlmIChsZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnByb3ZpZGVyMCA9IGJ3dlswXS5wcm92aWRlcjtcbiAgICAgIHRoaXMua2V5SWQwID0gYnd2WzBdLmdldEtleUlkKCk7XG4gICAgICB0aGlzLnZpc2liaWxpdHkwID0gYnd2WzBdLnZpc2liaWxpdHk7XG4gICAgfVxuICAgIGlmIChsZW5ndGggPiAxKSB7XG4gICAgICB0aGlzLnByb3ZpZGVyMSA9IGJ3dlsxXS5wcm92aWRlcjtcbiAgICAgIHRoaXMua2V5SWQxID0gYnd2WzFdLmdldEtleUlkKCk7XG4gICAgICB0aGlzLnZpc2liaWxpdHkxID0gYnd2WzFdLnZpc2liaWxpdHk7XG4gICAgfVxuICAgIGlmIChsZW5ndGggPiAyKSB7XG4gICAgICB0aGlzLnByb3ZpZGVyMiA9IGJ3dlsyXS5wcm92aWRlcjtcbiAgICAgIHRoaXMua2V5SWQyID0gYnd2WzJdLmdldEtleUlkKCk7XG4gICAgICB0aGlzLnZpc2liaWxpdHkyID0gYnd2WzJdLnZpc2liaWxpdHk7XG4gICAgfVxuICAgIGlmIChsZW5ndGggPiAzKSB7XG4gICAgICB0aGlzLnByb3ZpZGVyMyA9IGJ3dlszXS5wcm92aWRlcjtcbiAgICAgIHRoaXMua2V5SWQzID0gYnd2WzNdLmdldEtleUlkKCk7XG4gICAgICB0aGlzLnZpc2liaWxpdHkzID0gYnd2WzNdLnZpc2liaWxpdHk7XG4gICAgfVxuICAgIGlmIChsZW5ndGggPiA0KSB7XG4gICAgICB0aGlzLnByb3ZpZGVyNCA9IGJ3dls0XS5wcm92aWRlcjtcbiAgICAgIHRoaXMua2V5SWQ0ID0gYnd2WzRdLmdldEtleUlkKCk7XG4gICAgICB0aGlzLnZpc2liaWxpdHk0ID0gYnd2WzRdLnZpc2liaWxpdHk7XG4gICAgfVxuICAgIGlmIChsZW5ndGggPiA1KSB7XG4gICAgICB0aGlzLnByb3ZpZGVyNSA9IGJ3dls1XS5wcm92aWRlcjtcbiAgICAgIHRoaXMua2V5SWQ1ID0gYnd2WzVdLmdldEtleUlkKCk7XG4gICAgICB0aGlzLnZpc2liaWxpdHk1ID0gYnd2WzVdLnZpc2liaWxpdHk7XG4gICAgfVxuICAgIGlmIChsZW5ndGggPiA2KSB7XG4gICAgICB0aGlzLnByb3ZpZGVyNiA9IGJ3dls2XS5wcm92aWRlcjtcbiAgICAgIHRoaXMua2V5SWQ2ID0gYnd2WzZdLmdldEtleUlkKCk7XG4gICAgICB0aGlzLnZpc2liaWxpdHk2ID0gYnd2WzZdLnZpc2liaWxpdHk7XG4gICAgfVxuICAgIGlmIChsZW5ndGggPiA3KSB7XG4gICAgICB0aGlzLnByb3ZpZGVyNyA9IGJ3dls3XS5wcm92aWRlcjtcbiAgICAgIHRoaXMua2V5SWQ3ID0gYnd2WzddLmdldEtleUlkKCk7XG4gICAgICB0aGlzLnZpc2liaWxpdHk3ID0gYnd2WzddLnZpc2liaWxpdHk7XG4gICAgfVxuICAgIGlmIChsZW5ndGggPiA4KSB7XG4gICAgICB0aGlzLnByb3ZpZGVyOCA9IGJ3dls4XS5wcm92aWRlcjtcbiAgICAgIHRoaXMua2V5SWQ4ID0gYnd2WzhdLmdldEtleUlkKCk7XG4gICAgICB0aGlzLnZpc2liaWxpdHk4ID0gYnd2WzhdLnZpc2liaWxpdHk7XG4gICAgfVxuICAgIGlmIChsZW5ndGggPiA5KSB7XG4gICAgICB0aGlzLnByb3ZpZGVyOSA9IGJ3dls5XS5wcm92aWRlcjtcbiAgICAgIHRoaXMua2V5SWQ5ID0gYnd2WzldLmdldEtleUlkKCk7XG4gICAgICB0aGlzLnZpc2liaWxpdHk5ID0gYnd2WzldLnZpc2liaWxpdHk7XG4gICAgfVxuICB9XG5cbiAgZ2V0UHJvdmlkZXJBdEluZGV4KGluZGV4OiBudW1iZXIpOiBSZXNvbHZlZFByb3ZpZGVyIHtcbiAgICBpZiAoaW5kZXggPT0gMCkgcmV0dXJuIHRoaXMucHJvdmlkZXIwO1xuICAgIGlmIChpbmRleCA9PSAxKSByZXR1cm4gdGhpcy5wcm92aWRlcjE7XG4gICAgaWYgKGluZGV4ID09IDIpIHJldHVybiB0aGlzLnByb3ZpZGVyMjtcbiAgICBpZiAoaW5kZXggPT0gMykgcmV0dXJuIHRoaXMucHJvdmlkZXIzO1xuICAgIGlmIChpbmRleCA9PSA0KSByZXR1cm4gdGhpcy5wcm92aWRlcjQ7XG4gICAgaWYgKGluZGV4ID09IDUpIHJldHVybiB0aGlzLnByb3ZpZGVyNTtcbiAgICBpZiAoaW5kZXggPT0gNikgcmV0dXJuIHRoaXMucHJvdmlkZXI2O1xuICAgIGlmIChpbmRleCA9PSA3KSByZXR1cm4gdGhpcy5wcm92aWRlcjc7XG4gICAgaWYgKGluZGV4ID09IDgpIHJldHVybiB0aGlzLnByb3ZpZGVyODtcbiAgICBpZiAoaW5kZXggPT0gOSkgcmV0dXJuIHRoaXMucHJvdmlkZXI5O1xuICAgIHRocm93IG5ldyBPdXRPZkJvdW5kc0Vycm9yKGluZGV4KTtcbiAgfVxuXG4gIGNyZWF0ZUluamVjdG9yU3RyYXRlZ3koaW5qZWN0b3I6IEluamVjdG9yKTogSW5qZWN0b3JTdHJhdGVneSB7XG4gICAgcmV0dXJuIG5ldyBJbmplY3RvcklubGluZVN0cmF0ZWd5KGluamVjdG9yLCB0aGlzKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJvdG9JbmplY3RvckR5bmFtaWNTdHJhdGVneSBpbXBsZW1lbnRzIFByb3RvSW5qZWN0b3JTdHJhdGVneSB7XG4gIHByb3ZpZGVyczogUmVzb2x2ZWRQcm92aWRlcltdO1xuICBrZXlJZHM6IG51bWJlcltdO1xuICB2aXNpYmlsaXRpZXM6IFZpc2liaWxpdHlbXTtcblxuICBjb25zdHJ1Y3Rvcihwcm90b0luajogUHJvdG9JbmplY3RvciwgYnd2OiBQcm92aWRlcldpdGhWaXNpYmlsaXR5W10pIHtcbiAgICB2YXIgbGVuID0gYnd2Lmxlbmd0aDtcblxuICAgIHRoaXMucHJvdmlkZXJzID0gTGlzdFdyYXBwZXIuY3JlYXRlRml4ZWRTaXplKGxlbik7XG4gICAgdGhpcy5rZXlJZHMgPSBMaXN0V3JhcHBlci5jcmVhdGVGaXhlZFNpemUobGVuKTtcbiAgICB0aGlzLnZpc2liaWxpdGllcyA9IExpc3RXcmFwcGVyLmNyZWF0ZUZpeGVkU2l6ZShsZW4pO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgdGhpcy5wcm92aWRlcnNbaV0gPSBid3ZbaV0ucHJvdmlkZXI7XG4gICAgICB0aGlzLmtleUlkc1tpXSA9IGJ3dltpXS5nZXRLZXlJZCgpO1xuICAgICAgdGhpcy52aXNpYmlsaXRpZXNbaV0gPSBid3ZbaV0udmlzaWJpbGl0eTtcbiAgICB9XG4gIH1cblxuICBnZXRQcm92aWRlckF0SW5kZXgoaW5kZXg6IG51bWJlcik6IFJlc29sdmVkUHJvdmlkZXIge1xuICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5wcm92aWRlcnMubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgT3V0T2ZCb3VuZHNFcnJvcihpbmRleCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnByb3ZpZGVyc1tpbmRleF07XG4gIH1cblxuICBjcmVhdGVJbmplY3RvclN0cmF0ZWd5KGVpOiBJbmplY3Rvcik6IEluamVjdG9yU3RyYXRlZ3kge1xuICAgIHJldHVybiBuZXcgSW5qZWN0b3JEeW5hbWljU3RyYXRlZ3kodGhpcywgZWkpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQcm90b0luamVjdG9yIHtcbiAgc3RhdGljIGZyb21SZXNvbHZlZFByb3ZpZGVycyhwcm92aWRlcnM6IFJlc29sdmVkUHJvdmlkZXJbXSk6IFByb3RvSW5qZWN0b3Ige1xuICAgIHZhciBiZCA9IHByb3ZpZGVycy5tYXAoYiA9PiBuZXcgUHJvdmlkZXJXaXRoVmlzaWJpbGl0eShiLCBWaXNpYmlsaXR5LlB1YmxpYykpO1xuICAgIHJldHVybiBuZXcgUHJvdG9JbmplY3RvcihiZCk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9zdHJhdGVneTogUHJvdG9JbmplY3RvclN0cmF0ZWd5O1xuICBudW1iZXJPZlByb3ZpZGVyczogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKGJ3djogUHJvdmlkZXJXaXRoVmlzaWJpbGl0eVtdKSB7XG4gICAgdGhpcy5udW1iZXJPZlByb3ZpZGVycyA9IGJ3di5sZW5ndGg7XG4gICAgdGhpcy5fc3RyYXRlZ3kgPSBid3YubGVuZ3RoID4gX01BWF9DT05TVFJVQ1RJT05fQ09VTlRFUiA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFByb3RvSW5qZWN0b3JEeW5hbWljU3RyYXRlZ3kodGhpcywgYnd2KSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFByb3RvSW5qZWN0b3JJbmxpbmVTdHJhdGVneSh0aGlzLCBid3YpO1xuICB9XG5cbiAgZ2V0UHJvdmlkZXJBdEluZGV4KGluZGV4OiBudW1iZXIpOiBSZXNvbHZlZFByb3ZpZGVyIHtcbiAgICByZXR1cm4gdGhpcy5fc3RyYXRlZ3kuZ2V0UHJvdmlkZXJBdEluZGV4KGluZGV4KTtcbiAgfVxufVxuXG5cblxuZXhwb3J0IGludGVyZmFjZSBJbmplY3RvclN0cmF0ZWd5IHtcbiAgZ2V0T2JqQnlLZXlJZChrZXlJZDogbnVtYmVyLCB2aXNpYmlsaXR5OiBWaXNpYmlsaXR5KTogYW55O1xuICBnZXRPYmpBdEluZGV4KGluZGV4OiBudW1iZXIpOiBhbnk7XG4gIGdldE1heE51bWJlck9mT2JqZWN0cygpOiBudW1iZXI7XG5cbiAgcmVzZXRDb25zdHJ1Y3Rpb25Db3VudGVyKCk6IHZvaWQ7XG4gIGluc3RhbnRpYXRlUHJvdmlkZXIocHJvdmlkZXI6IFJlc29sdmVkUHJvdmlkZXIsIHZpc2liaWxpdHk6IFZpc2liaWxpdHkpOiBhbnk7XG59XG5cbmV4cG9ydCBjbGFzcyBJbmplY3RvcklubGluZVN0cmF0ZWd5IGltcGxlbWVudHMgSW5qZWN0b3JTdHJhdGVneSB7XG4gIG9iajA6IGFueSA9IFVOREVGSU5FRDtcbiAgb2JqMTogYW55ID0gVU5ERUZJTkVEO1xuICBvYmoyOiBhbnkgPSBVTkRFRklORUQ7XG4gIG9iajM6IGFueSA9IFVOREVGSU5FRDtcbiAgb2JqNDogYW55ID0gVU5ERUZJTkVEO1xuICBvYmo1OiBhbnkgPSBVTkRFRklORUQ7XG4gIG9iajY6IGFueSA9IFVOREVGSU5FRDtcbiAgb2JqNzogYW55ID0gVU5ERUZJTkVEO1xuICBvYmo4OiBhbnkgPSBVTkRFRklORUQ7XG4gIG9iajk6IGFueSA9IFVOREVGSU5FRDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaW5qZWN0b3I6IEluamVjdG9yLCBwdWJsaWMgcHJvdG9TdHJhdGVneTogUHJvdG9JbmplY3RvcklubGluZVN0cmF0ZWd5KSB7fVxuXG4gIHJlc2V0Q29uc3RydWN0aW9uQ291bnRlcigpOiB2b2lkIHsgdGhpcy5pbmplY3Rvci5fY29uc3RydWN0aW9uQ291bnRlciA9IDA7IH1cblxuICBpbnN0YW50aWF0ZVByb3ZpZGVyKHByb3ZpZGVyOiBSZXNvbHZlZFByb3ZpZGVyLCB2aXNpYmlsaXR5OiBWaXNpYmlsaXR5KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbmplY3Rvci5fbmV3KHByb3ZpZGVyLCB2aXNpYmlsaXR5KTtcbiAgfVxuXG4gIGdldE9iakJ5S2V5SWQoa2V5SWQ6IG51bWJlciwgdmlzaWJpbGl0eTogVmlzaWJpbGl0eSk6IGFueSB7XG4gICAgdmFyIHAgPSB0aGlzLnByb3RvU3RyYXRlZ3k7XG4gICAgdmFyIGluaiA9IHRoaXMuaW5qZWN0b3I7XG5cbiAgICBpZiAocC5rZXlJZDAgPT09IGtleUlkICYmIGNhblNlZShwLnZpc2liaWxpdHkwLCB2aXNpYmlsaXR5KSkge1xuICAgICAgaWYgKHRoaXMub2JqMCA9PT0gVU5ERUZJTkVEKSB7XG4gICAgICAgIHRoaXMub2JqMCA9IGluai5fbmV3KHAucHJvdmlkZXIwLCBwLnZpc2liaWxpdHkwKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLm9iajA7XG4gICAgfVxuICAgIGlmIChwLmtleUlkMSA9PT0ga2V5SWQgJiYgY2FuU2VlKHAudmlzaWJpbGl0eTEsIHZpc2liaWxpdHkpKSB7XG4gICAgICBpZiAodGhpcy5vYmoxID09PSBVTkRFRklORUQpIHtcbiAgICAgICAgdGhpcy5vYmoxID0gaW5qLl9uZXcocC5wcm92aWRlcjEsIHAudmlzaWJpbGl0eTEpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMub2JqMTtcbiAgICB9XG4gICAgaWYgKHAua2V5SWQyID09PSBrZXlJZCAmJiBjYW5TZWUocC52aXNpYmlsaXR5MiwgdmlzaWJpbGl0eSkpIHtcbiAgICAgIGlmICh0aGlzLm9iajIgPT09IFVOREVGSU5FRCkge1xuICAgICAgICB0aGlzLm9iajIgPSBpbmouX25ldyhwLnByb3ZpZGVyMiwgcC52aXNpYmlsaXR5Mik7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5vYmoyO1xuICAgIH1cbiAgICBpZiAocC5rZXlJZDMgPT09IGtleUlkICYmIGNhblNlZShwLnZpc2liaWxpdHkzLCB2aXNpYmlsaXR5KSkge1xuICAgICAgaWYgKHRoaXMub2JqMyA9PT0gVU5ERUZJTkVEKSB7XG4gICAgICAgIHRoaXMub2JqMyA9IGluai5fbmV3KHAucHJvdmlkZXIzLCBwLnZpc2liaWxpdHkzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLm9iajM7XG4gICAgfVxuICAgIGlmIChwLmtleUlkNCA9PT0ga2V5SWQgJiYgY2FuU2VlKHAudmlzaWJpbGl0eTQsIHZpc2liaWxpdHkpKSB7XG4gICAgICBpZiAodGhpcy5vYmo0ID09PSBVTkRFRklORUQpIHtcbiAgICAgICAgdGhpcy5vYmo0ID0gaW5qLl9uZXcocC5wcm92aWRlcjQsIHAudmlzaWJpbGl0eTQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMub2JqNDtcbiAgICB9XG4gICAgaWYgKHAua2V5SWQ1ID09PSBrZXlJZCAmJiBjYW5TZWUocC52aXNpYmlsaXR5NSwgdmlzaWJpbGl0eSkpIHtcbiAgICAgIGlmICh0aGlzLm9iajUgPT09IFVOREVGSU5FRCkge1xuICAgICAgICB0aGlzLm9iajUgPSBpbmouX25ldyhwLnByb3ZpZGVyNSwgcC52aXNpYmlsaXR5NSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5vYmo1O1xuICAgIH1cbiAgICBpZiAocC5rZXlJZDYgPT09IGtleUlkICYmIGNhblNlZShwLnZpc2liaWxpdHk2LCB2aXNpYmlsaXR5KSkge1xuICAgICAgaWYgKHRoaXMub2JqNiA9PT0gVU5ERUZJTkVEKSB7XG4gICAgICAgIHRoaXMub2JqNiA9IGluai5fbmV3KHAucHJvdmlkZXI2LCBwLnZpc2liaWxpdHk2KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLm9iajY7XG4gICAgfVxuICAgIGlmIChwLmtleUlkNyA9PT0ga2V5SWQgJiYgY2FuU2VlKHAudmlzaWJpbGl0eTcsIHZpc2liaWxpdHkpKSB7XG4gICAgICBpZiAodGhpcy5vYmo3ID09PSBVTkRFRklORUQpIHtcbiAgICAgICAgdGhpcy5vYmo3ID0gaW5qLl9uZXcocC5wcm92aWRlcjcsIHAudmlzaWJpbGl0eTcpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMub2JqNztcbiAgICB9XG4gICAgaWYgKHAua2V5SWQ4ID09PSBrZXlJZCAmJiBjYW5TZWUocC52aXNpYmlsaXR5OCwgdmlzaWJpbGl0eSkpIHtcbiAgICAgIGlmICh0aGlzLm9iajggPT09IFVOREVGSU5FRCkge1xuICAgICAgICB0aGlzLm9iajggPSBpbmouX25ldyhwLnByb3ZpZGVyOCwgcC52aXNpYmlsaXR5OCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5vYmo4O1xuICAgIH1cbiAgICBpZiAocC5rZXlJZDkgPT09IGtleUlkICYmIGNhblNlZShwLnZpc2liaWxpdHk5LCB2aXNpYmlsaXR5KSkge1xuICAgICAgaWYgKHRoaXMub2JqOSA9PT0gVU5ERUZJTkVEKSB7XG4gICAgICAgIHRoaXMub2JqOSA9IGluai5fbmV3KHAucHJvdmlkZXI5LCBwLnZpc2liaWxpdHk5KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLm9iajk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFVOREVGSU5FRDtcbiAgfVxuXG4gIGdldE9iakF0SW5kZXgoaW5kZXg6IG51bWJlcik6IGFueSB7XG4gICAgaWYgKGluZGV4ID09IDApIHJldHVybiB0aGlzLm9iajA7XG4gICAgaWYgKGluZGV4ID09IDEpIHJldHVybiB0aGlzLm9iajE7XG4gICAgaWYgKGluZGV4ID09IDIpIHJldHVybiB0aGlzLm9iajI7XG4gICAgaWYgKGluZGV4ID09IDMpIHJldHVybiB0aGlzLm9iajM7XG4gICAgaWYgKGluZGV4ID09IDQpIHJldHVybiB0aGlzLm9iajQ7XG4gICAgaWYgKGluZGV4ID09IDUpIHJldHVybiB0aGlzLm9iajU7XG4gICAgaWYgKGluZGV4ID09IDYpIHJldHVybiB0aGlzLm9iajY7XG4gICAgaWYgKGluZGV4ID09IDcpIHJldHVybiB0aGlzLm9iajc7XG4gICAgaWYgKGluZGV4ID09IDgpIHJldHVybiB0aGlzLm9iajg7XG4gICAgaWYgKGluZGV4ID09IDkpIHJldHVybiB0aGlzLm9iajk7XG4gICAgdGhyb3cgbmV3IE91dE9mQm91bmRzRXJyb3IoaW5kZXgpO1xuICB9XG5cbiAgZ2V0TWF4TnVtYmVyT2ZPYmplY3RzKCk6IG51bWJlciB7IHJldHVybiBfTUFYX0NPTlNUUlVDVElPTl9DT1VOVEVSOyB9XG59XG5cblxuZXhwb3J0IGNsYXNzIEluamVjdG9yRHluYW1pY1N0cmF0ZWd5IGltcGxlbWVudHMgSW5qZWN0b3JTdHJhdGVneSB7XG4gIG9ianM6IGFueVtdO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwcm90b1N0cmF0ZWd5OiBQcm90b0luamVjdG9yRHluYW1pY1N0cmF0ZWd5LCBwdWJsaWMgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgdGhpcy5vYmpzID0gTGlzdFdyYXBwZXIuY3JlYXRlRml4ZWRTaXplKHByb3RvU3RyYXRlZ3kucHJvdmlkZXJzLmxlbmd0aCk7XG4gICAgTGlzdFdyYXBwZXIuZmlsbCh0aGlzLm9ianMsIFVOREVGSU5FRCk7XG4gIH1cblxuICByZXNldENvbnN0cnVjdGlvbkNvdW50ZXIoKTogdm9pZCB7IHRoaXMuaW5qZWN0b3IuX2NvbnN0cnVjdGlvbkNvdW50ZXIgPSAwOyB9XG5cbiAgaW5zdGFudGlhdGVQcm92aWRlcihwcm92aWRlcjogUmVzb2x2ZWRQcm92aWRlciwgdmlzaWJpbGl0eTogVmlzaWJpbGl0eSk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5qZWN0b3IuX25ldyhwcm92aWRlciwgdmlzaWJpbGl0eSk7XG4gIH1cblxuICBnZXRPYmpCeUtleUlkKGtleUlkOiBudW1iZXIsIHZpc2liaWxpdHk6IFZpc2liaWxpdHkpOiBhbnkge1xuICAgIHZhciBwID0gdGhpcy5wcm90b1N0cmF0ZWd5O1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwLmtleUlkcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHAua2V5SWRzW2ldID09PSBrZXlJZCAmJiBjYW5TZWUocC52aXNpYmlsaXRpZXNbaV0sIHZpc2liaWxpdHkpKSB7XG4gICAgICAgIGlmICh0aGlzLm9ianNbaV0gPT09IFVOREVGSU5FRCkge1xuICAgICAgICAgIHRoaXMub2Jqc1tpXSA9IHRoaXMuaW5qZWN0b3IuX25ldyhwLnByb3ZpZGVyc1tpXSwgcC52aXNpYmlsaXRpZXNbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub2Jqc1tpXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gVU5ERUZJTkVEO1xuICB9XG5cbiAgZ2V0T2JqQXRJbmRleChpbmRleDogbnVtYmVyKTogYW55IHtcbiAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMub2Jqcy5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBPdXRPZkJvdW5kc0Vycm9yKGluZGV4KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5vYmpzW2luZGV4XTtcbiAgfVxuXG4gIGdldE1heE51bWJlck9mT2JqZWN0cygpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5vYmpzLmxlbmd0aDsgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJvdmlkZXJXaXRoVmlzaWJpbGl0eSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwcm92aWRlcjogUmVzb2x2ZWRQcm92aWRlciwgcHVibGljIHZpc2liaWxpdHk6IFZpc2liaWxpdHkpe307XG5cbiAgZ2V0S2V5SWQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMucHJvdmlkZXIua2V5LmlkOyB9XG59XG5cbi8qKlxuICogVXNlZCB0byBwcm92aWRlIGRlcGVuZGVuY2llcyB0aGF0IGNhbm5vdCBiZSBlYXNpbHkgZXhwcmVzc2VkIGFzIHByb3ZpZGVycy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEZXBlbmRlbmN5UHJvdmlkZXIge1xuICBnZXREZXBlbmRlbmN5KGluamVjdG9yOiBJbmplY3RvciwgcHJvdmlkZXI6IFJlc29sdmVkUHJvdmlkZXIsIGRlcGVuZGVuY3k6IERlcGVuZGVuY3kpOiBhbnk7XG59XG5cbi8qKlxuICogQSBkZXBlbmRlbmN5IGluamVjdGlvbiBjb250YWluZXIgdXNlZCBmb3IgaW5zdGFudGlhdGluZyBvYmplY3RzIGFuZCByZXNvbHZpbmcgZGVwZW5kZW5jaWVzLlxuICpcbiAqIEFuIGBJbmplY3RvcmAgaXMgYSByZXBsYWNlbWVudCBmb3IgYSBgbmV3YCBvcGVyYXRvciwgd2hpY2ggY2FuIGF1dG9tYXRpY2FsbHkgcmVzb2x2ZSB0aGVcbiAqIGNvbnN0cnVjdG9yIGRlcGVuZGVuY2llcy5cbiAqXG4gKiBJbiB0eXBpY2FsIHVzZSwgYXBwbGljYXRpb24gY29kZSBhc2tzIGZvciB0aGUgZGVwZW5kZW5jaWVzIGluIHRoZSBjb25zdHJ1Y3RvciBhbmQgdGhleSBhcmVcbiAqIHJlc29sdmVkIGJ5IHRoZSBgSW5qZWN0b3JgLlxuICpcbiAqICMjIyBFeGFtcGxlIChbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC9qemplYzA/cD1wcmV2aWV3KSlcbiAqXG4gKiBUaGUgZm9sbG93aW5nIGV4YW1wbGUgY3JlYXRlcyBhbiBgSW5qZWN0b3JgIGNvbmZpZ3VyZWQgdG8gY3JlYXRlIGBFbmdpbmVgIGFuZCBgQ2FyYC5cbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBASW5qZWN0YWJsZSgpXG4gKiBjbGFzcyBFbmdpbmUge1xuICogfVxuICpcbiAqIEBJbmplY3RhYmxlKClcbiAqIGNsYXNzIENhciB7XG4gKiAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbmdpbmU6RW5naW5lKSB7fVxuICogfVxuICpcbiAqIHZhciBpbmplY3RvciA9IEluamVjdG9yLnJlc29sdmVBbmRDcmVhdGUoW0NhciwgRW5naW5lXSk7XG4gKiB2YXIgY2FyID0gaW5qZWN0b3IuZ2V0KENhcik7XG4gKiBleHBlY3QoY2FyIGluc3RhbmNlb2YgQ2FyKS50b0JlKHRydWUpO1xuICogZXhwZWN0KGNhci5lbmdpbmUgaW5zdGFuY2VvZiBFbmdpbmUpLnRvQmUodHJ1ZSk7XG4gKiBgYGBcbiAqXG4gKiBOb3RpY2UsIHdlIGRvbid0IHVzZSB0aGUgYG5ld2Agb3BlcmF0b3IgYmVjYXVzZSB3ZSBleHBsaWNpdGx5IHdhbnQgdG8gaGF2ZSB0aGUgYEluamVjdG9yYFxuICogcmVzb2x2ZSBhbGwgb2YgdGhlIG9iamVjdCdzIGRlcGVuZGVuY2llcyBhdXRvbWF0aWNhbGx5LlxuICovXG5leHBvcnQgY2xhc3MgSW5qZWN0b3Ige1xuICAvKipcbiAgICogVHVybnMgYW4gYXJyYXkgb2YgcHJvdmlkZXIgZGVmaW5pdGlvbnMgaW50byBhbiBhcnJheSBvZiByZXNvbHZlZCBwcm92aWRlcnMuXG4gICAqXG4gICAqIEEgcmVzb2x1dGlvbiBpcyBhIHByb2Nlc3Mgb2YgZmxhdHRlbmluZyBtdWx0aXBsZSBuZXN0ZWQgYXJyYXlzIGFuZCBjb252ZXJ0aW5nIGluZGl2aWR1YWxcbiAgICogcHJvdmlkZXJzIGludG8gYW4gYXJyYXkgb2Yge0BsaW5rIFJlc29sdmVkUHJvdmlkZXJ9cy5cbiAgICpcbiAgICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L0FpWFRIaT9wPXByZXZpZXcpKVxuICAgKlxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIEBJbmplY3RhYmxlKClcbiAgICogY2xhc3MgRW5naW5lIHtcbiAgICogfVxuICAgKlxuICAgKiBASW5qZWN0YWJsZSgpXG4gICAqIGNsYXNzIENhciB7XG4gICAqICAgY29uc3RydWN0b3IocHVibGljIGVuZ2luZTpFbmdpbmUpIHt9XG4gICAqIH1cbiAgICpcbiAgICogdmFyIHByb3ZpZGVycyA9IEluamVjdG9yLnJlc29sdmUoW0NhciwgW1tFbmdpbmVdXV0pO1xuICAgKlxuICAgKiBleHBlY3QocHJvdmlkZXJzLmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICpcbiAgICogZXhwZWN0KHByb3ZpZGVyc1swXSBpbnN0YW5jZW9mIFJlc29sdmVkUHJvdmlkZXIpLnRvQmUodHJ1ZSk7XG4gICAqIGV4cGVjdChwcm92aWRlcnNbMF0ua2V5LmRpc3BsYXlOYW1lKS50b0JlKFwiQ2FyXCIpO1xuICAgKiBleHBlY3QocHJvdmlkZXJzWzBdLmRlcGVuZGVuY2llcy5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAqIGV4cGVjdChwcm92aWRlcnNbMF0uZmFjdG9yeSkudG9CZURlZmluZWQoKTtcbiAgICpcbiAgICogZXhwZWN0KHByb3ZpZGVyc1sxXS5rZXkuZGlzcGxheU5hbWUpLnRvQmUoXCJFbmdpbmVcIik7XG4gICAqIH0pO1xuICAgKiBgYGBcbiAgICpcbiAgICogU2VlIHtAbGluayBJbmplY3RvciNmcm9tUmVzb2x2ZWRQcm92aWRlcnN9IGZvciBtb3JlIGluZm8uXG4gICAqL1xuICBzdGF0aWMgcmVzb2x2ZShwcm92aWRlcnM6IEFycmF5PFR5cGUgfCBQcm92aWRlciB8IGFueVtdPik6IFJlc29sdmVkUHJvdmlkZXJbXSB7XG4gICAgcmV0dXJuIHJlc29sdmVQcm92aWRlcnMocHJvdmlkZXJzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNvbHZlcyBhbiBhcnJheSBvZiBwcm92aWRlcnMgYW5kIGNyZWF0ZXMgYW4gaW5qZWN0b3IgZnJvbSB0aG9zZSBwcm92aWRlcnMuXG4gICAqXG4gICAqIFRoZSBwYXNzZWQtaW4gcHJvdmlkZXJzIGNhbiBiZSBhbiBhcnJheSBvZiBgVHlwZWAsIHtAbGluayBQcm92aWRlcn0sXG4gICAqIG9yIGEgcmVjdXJzaXZlIGFycmF5IG9mIG1vcmUgcHJvdmlkZXJzLlxuICAgKlxuICAgKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvZVBPY2NBP3A9cHJldmlldykpXG4gICAqXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogQEluamVjdGFibGUoKVxuICAgKiBjbGFzcyBFbmdpbmUge1xuICAgKiB9XG4gICAqXG4gICAqIEBJbmplY3RhYmxlKClcbiAgICogY2xhc3MgQ2FyIHtcbiAgICogICBjb25zdHJ1Y3RvcihwdWJsaWMgZW5naW5lOkVuZ2luZSkge31cbiAgICogfVxuICAgKlxuICAgKiB2YXIgaW5qZWN0b3IgPSBJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKFtDYXIsIEVuZ2luZV0pO1xuICAgKiBleHBlY3QoaW5qZWN0b3IuZ2V0KENhcikgaW5zdGFuY2VvZiBDYXIpLnRvQmUodHJ1ZSk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHNsb3dlciB0aGFuIHRoZSBjb3JyZXNwb25kaW5nIGBmcm9tUmVzb2x2ZWRQcm92aWRlcnNgXG4gICAqIGJlY2F1c2UgaXQgbmVlZHMgdG8gcmVzb2x2ZSB0aGUgcGFzc2VkLWluIHByb3ZpZGVycyBmaXJzdC5cbiAgICogU2VlIHtAbGluayBJbmplY3RvciNyZXNvbHZlfSBhbmQge0BsaW5rIEluamVjdG9yI2Zyb21SZXNvbHZlZFByb3ZpZGVyc30uXG4gICAqL1xuICBzdGF0aWMgcmVzb2x2ZUFuZENyZWF0ZShwcm92aWRlcnM6IEFycmF5PFR5cGUgfCBQcm92aWRlciB8IGFueVtdPik6IEluamVjdG9yIHtcbiAgICB2YXIgcmVzb2x2ZWRQcm92aWRlcnMgPSBJbmplY3Rvci5yZXNvbHZlKHByb3ZpZGVycyk7XG4gICAgcmV0dXJuIEluamVjdG9yLmZyb21SZXNvbHZlZFByb3ZpZGVycyhyZXNvbHZlZFByb3ZpZGVycyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbmplY3RvciBmcm9tIHByZXZpb3VzbHkgcmVzb2x2ZWQgcHJvdmlkZXJzLlxuICAgKlxuICAgKiBUaGlzIEFQSSBpcyB0aGUgcmVjb21tZW5kZWQgd2F5IHRvIGNvbnN0cnVjdCBpbmplY3RvcnMgaW4gcGVyZm9ybWFuY2Utc2Vuc2l0aXZlIHBhcnRzLlxuICAgKlxuICAgKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvS3JTTWNpP3A9cHJldmlldykpXG4gICAqXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogQEluamVjdGFibGUoKVxuICAgKiBjbGFzcyBFbmdpbmUge1xuICAgKiB9XG4gICAqXG4gICAqIEBJbmplY3RhYmxlKClcbiAgICogY2xhc3MgQ2FyIHtcbiAgICogICBjb25zdHJ1Y3RvcihwdWJsaWMgZW5naW5lOkVuZ2luZSkge31cbiAgICogfVxuICAgKlxuICAgKiB2YXIgcHJvdmlkZXJzID0gSW5qZWN0b3IucmVzb2x2ZShbQ2FyLCBFbmdpbmVdKTtcbiAgICogdmFyIGluamVjdG9yID0gSW5qZWN0b3IuZnJvbVJlc29sdmVkUHJvdmlkZXJzKHByb3ZpZGVycyk7XG4gICAqIGV4cGVjdChpbmplY3Rvci5nZXQoQ2FyKSBpbnN0YW5jZW9mIENhcikudG9CZSh0cnVlKTtcbiAgICogYGBgXG4gICAqL1xuICBzdGF0aWMgZnJvbVJlc29sdmVkUHJvdmlkZXJzKHByb3ZpZGVyczogUmVzb2x2ZWRQcm92aWRlcltdKTogSW5qZWN0b3Ige1xuICAgIHJldHVybiBuZXcgSW5qZWN0b3IoUHJvdG9JbmplY3Rvci5mcm9tUmVzb2x2ZWRQcm92aWRlcnMocHJvdmlkZXJzKSk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWRcbiAgICovXG4gIHN0YXRpYyBmcm9tUmVzb2x2ZWRCaW5kaW5ncyhwcm92aWRlcnM6IFJlc29sdmVkUHJvdmlkZXJbXSk6IEluamVjdG9yIHtcbiAgICByZXR1cm4gSW5qZWN0b3IuZnJvbVJlc29sdmVkUHJvdmlkZXJzKHByb3ZpZGVycyk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9zdHJhdGVneTogSW5qZWN0b3JTdHJhdGVneTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY29uc3RydWN0aW9uQ291bnRlcjogbnVtYmVyID0gMDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwdWJsaWMgX3Byb3RvOiBhbnkgLyogUHJvdG9JbmplY3RvciAqLztcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwdWJsaWMgX3BhcmVudDogSW5qZWN0b3I7XG4gIC8qKlxuICAgKiBQcml2YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihfcHJvdG86IGFueSAvKiBQcm90b0luamVjdG9yICovLCBfcGFyZW50OiBJbmplY3RvciA9IG51bGwsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2lzSG9zdEJvdW5kYXJ5OiBib29sZWFuID0gZmFsc2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2RlcFByb3ZpZGVyOiBhbnkgLyogRGVwZW5kZW5jeVByb3ZpZGVyICovID0gbnVsbCxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfZGVidWdDb250ZXh0OiBGdW5jdGlvbiA9IG51bGwpIHtcbiAgICB0aGlzLl9wcm90byA9IF9wcm90bztcbiAgICB0aGlzLl9wYXJlbnQgPSBfcGFyZW50O1xuICAgIHRoaXMuX3N0cmF0ZWd5ID0gX3Byb3RvLl9zdHJhdGVneS5jcmVhdGVJbmplY3RvclN0cmF0ZWd5KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhpcyBpbmplY3RvciBpcyBhIGJvdW5kYXJ5IHRvIGEgaG9zdC5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBnZXQgaG9zdEJvdW5kYXJ5KCkgeyByZXR1cm4gdGhpcy5faXNIb3N0Qm91bmRhcnk7IH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBkZWJ1Z0NvbnRleHQoKTogYW55IHsgcmV0dXJuIHRoaXMuX2RlYnVnQ29udGV4dCgpOyB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyBhbiBpbnN0YW5jZSBmcm9tIHRoZSBpbmplY3RvciBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgdG9rZW4uXG4gICAqIFRocm93cyB7QGxpbmsgTm9Qcm92aWRlckVycm9yfSBpZiBub3QgZm91bmQuXG4gICAqXG4gICAqICMjIyBFeGFtcGxlIChbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC9IZVhTSGc/cD1wcmV2aWV3KSlcbiAgICpcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiB2YXIgaW5qZWN0b3IgPSBJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKFtcbiAgICogICBwcm92aWRlKFwidmFsaWRUb2tlblwiLCB7dXNlVmFsdWU6IFwiVmFsdWVcIn0pXG4gICAqIF0pO1xuICAgKiBleHBlY3QoaW5qZWN0b3IuZ2V0KFwidmFsaWRUb2tlblwiKSkudG9FcXVhbChcIlZhbHVlXCIpO1xuICAgKiBleHBlY3QoKCkgPT4gaW5qZWN0b3IuZ2V0KFwiaW52YWxpZFRva2VuXCIpKS50b1Rocm93RXJyb3IoKTtcbiAgICogYGBgXG4gICAqXG4gICAqIGBJbmplY3RvcmAgcmV0dXJucyBpdHNlbGYgd2hlbiBnaXZlbiBgSW5qZWN0b3JgIGFzIGEgdG9rZW4uXG4gICAqXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogdmFyIGluamVjdG9yID0gSW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZShbXSk7XG4gICAqIGV4cGVjdChpbmplY3Rvci5nZXQoSW5qZWN0b3IpKS50b0JlKGluamVjdG9yKTtcbiAgICogYGBgXG4gICAqL1xuICBnZXQodG9rZW46IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldEJ5S2V5KEtleS5nZXQodG9rZW4pLCBudWxsLCBudWxsLCBmYWxzZSwgVmlzaWJpbGl0eS5QdWJsaWNBbmRQcml2YXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgYW4gaW5zdGFuY2UgZnJvbSB0aGUgaW5qZWN0b3IgYmFzZWQgb24gdGhlIHByb3ZpZGVkIHRva2VuLlxuICAgKiBSZXR1cm5zIG51bGwgaWYgbm90IGZvdW5kLlxuICAgKlxuICAgKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvdHBFYkV5P3A9cHJldmlldykpXG4gICAqXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogdmFyIGluamVjdG9yID0gSW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZShbXG4gICAqICAgcHJvdmlkZShcInZhbGlkVG9rZW5cIiwge3VzZVZhbHVlOiBcIlZhbHVlXCJ9KVxuICAgKiBdKTtcbiAgICogZXhwZWN0KGluamVjdG9yLmdldE9wdGlvbmFsKFwidmFsaWRUb2tlblwiKSkudG9FcXVhbChcIlZhbHVlXCIpO1xuICAgKiBleHBlY3QoaW5qZWN0b3IuZ2V0T3B0aW9uYWwoXCJpbnZhbGlkVG9rZW5cIikpLnRvQmUobnVsbCk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBgSW5qZWN0b3JgIHJldHVybnMgaXRzZWxmIHdoZW4gZ2l2ZW4gYEluamVjdG9yYCBhcyBhIHRva2VuLlxuICAgKlxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIHZhciBpbmplY3RvciA9IEluamVjdG9yLnJlc29sdmVBbmRDcmVhdGUoW10pO1xuICAgKiBleHBlY3QoaW5qZWN0b3IuZ2V0T3B0aW9uYWwoSW5qZWN0b3IpKS50b0JlKGluamVjdG9yKTtcbiAgICogYGBgXG4gICAqL1xuICBnZXRPcHRpb25hbCh0b2tlbjogYW55KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0QnlLZXkoS2V5LmdldCh0b2tlbiksIG51bGwsIG51bGwsIHRydWUsIFZpc2liaWxpdHkuUHVibGljQW5kUHJpdmF0ZSk7XG4gIH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBnZXRBdChpbmRleDogbnVtYmVyKTogYW55IHsgcmV0dXJuIHRoaXMuX3N0cmF0ZWd5LmdldE9iakF0SW5kZXgoaW5kZXgpOyB9XG5cbiAgLyoqXG4gICAqIFBhcmVudCBvZiB0aGlzIGluamVjdG9yLlxuICAgKlxuICAgKiA8IS0tIFRPRE86IEFkZCBhIGxpbmsgdG8gdGhlIHNlY3Rpb24gb2YgdGhlIHVzZXIgZ3VpZGUgdGFsa2luZyBhYm91dCBoaWVyYXJjaGljYWwgaW5qZWN0aW9uLlxuICAgKiAtLT5cbiAgICpcbiAgICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L2Vvc01Hbz9wPXByZXZpZXcpKVxuICAgKlxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIHZhciBwYXJlbnQgPSBJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKFtdKTtcbiAgICogdmFyIGNoaWxkID0gcGFyZW50LnJlc29sdmVBbmRDcmVhdGVDaGlsZChbXSk7XG4gICAqIGV4cGVjdChjaGlsZC5wYXJlbnQpLnRvQmUocGFyZW50KTtcbiAgICogYGBgXG4gICAqL1xuICBnZXQgcGFyZW50KCk6IEluamVjdG9yIHsgcmV0dXJuIHRoaXMuX3BhcmVudDsgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICogSW50ZXJuYWwuIERvIG5vdCB1c2UuXG4gICAqIFdlIHJldHVybiBgYW55YCBub3QgdG8gZXhwb3J0IHRoZSBJbmplY3RvclN0cmF0ZWd5IHR5cGUuXG4gICAqL1xuICBnZXQgaW50ZXJuYWxTdHJhdGVneSgpOiBhbnkgeyByZXR1cm4gdGhpcy5fc3RyYXRlZ3k7IH1cblxuICAvKipcbiAgICogUmVzb2x2ZXMgYW4gYXJyYXkgb2YgcHJvdmlkZXJzIGFuZCBjcmVhdGVzIGEgY2hpbGQgaW5qZWN0b3IgZnJvbSB0aG9zZSBwcm92aWRlcnMuXG4gICAqXG4gICAqIDwhLS0gVE9ETzogQWRkIGEgbGluayB0byB0aGUgc2VjdGlvbiBvZiB0aGUgdXNlciBndWlkZSB0YWxraW5nIGFib3V0IGhpZXJhcmNoaWNhbCBpbmplY3Rpb24uXG4gICAqIC0tPlxuICAgKlxuICAgKiBUaGUgcGFzc2VkLWluIHByb3ZpZGVycyBjYW4gYmUgYW4gYXJyYXkgb2YgYFR5cGVgLCB7QGxpbmsgUHJvdmlkZXJ9LFxuICAgKiBvciBhIHJlY3Vyc2l2ZSBhcnJheSBvZiBtb3JlIHByb3ZpZGVycy5cbiAgICpcbiAgICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L29wQjNUND9wPXByZXZpZXcpKVxuICAgKlxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIGNsYXNzIFBhcmVudFByb3ZpZGVyIHt9XG4gICAqIGNsYXNzIENoaWxkUHJvdmlkZXIge31cbiAgICpcbiAgICogdmFyIHBhcmVudCA9IEluamVjdG9yLnJlc29sdmVBbmRDcmVhdGUoW1BhcmVudFByb3ZpZGVyXSk7XG4gICAqIHZhciBjaGlsZCA9IHBhcmVudC5yZXNvbHZlQW5kQ3JlYXRlQ2hpbGQoW0NoaWxkUHJvdmlkZXJdKTtcbiAgICpcbiAgICogZXhwZWN0KGNoaWxkLmdldChQYXJlbnRQcm92aWRlcikgaW5zdGFuY2VvZiBQYXJlbnRQcm92aWRlcikudG9CZSh0cnVlKTtcbiAgICogZXhwZWN0KGNoaWxkLmdldChDaGlsZFByb3ZpZGVyKSBpbnN0YW5jZW9mIENoaWxkUHJvdmlkZXIpLnRvQmUodHJ1ZSk7XG4gICAqIGV4cGVjdChjaGlsZC5nZXQoUGFyZW50UHJvdmlkZXIpKS50b0JlKHBhcmVudC5nZXQoUGFyZW50UHJvdmlkZXIpKTtcbiAgICogYGBgXG4gICAqXG4gICAqIFRoaXMgZnVuY3Rpb24gaXMgc2xvd2VyIHRoYW4gdGhlIGNvcnJlc3BvbmRpbmcgYGNyZWF0ZUNoaWxkRnJvbVJlc29sdmVkYFxuICAgKiBiZWNhdXNlIGl0IG5lZWRzIHRvIHJlc29sdmUgdGhlIHBhc3NlZC1pbiBwcm92aWRlcnMgZmlyc3QuXG4gICAqIFNlZSB7QGxpbmsgSW5qZWN0b3IjcmVzb2x2ZX0gYW5kIHtAbGluayBJbmplY3RvciNjcmVhdGVDaGlsZEZyb21SZXNvbHZlZH0uXG4gICAqL1xuICByZXNvbHZlQW5kQ3JlYXRlQ2hpbGQocHJvdmlkZXJzOiBBcnJheTxUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXT4pOiBJbmplY3RvciB7XG4gICAgdmFyIHJlc29sdmVkUHJvdmlkZXJzID0gSW5qZWN0b3IucmVzb2x2ZShwcm92aWRlcnMpO1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUNoaWxkRnJvbVJlc29sdmVkKHJlc29sdmVkUHJvdmlkZXJzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgY2hpbGQgaW5qZWN0b3IgZnJvbSBwcmV2aW91c2x5IHJlc29sdmVkIHByb3ZpZGVycy5cbiAgICpcbiAgICogPCEtLSBUT0RPOiBBZGQgYSBsaW5rIHRvIHRoZSBzZWN0aW9uIG9mIHRoZSB1c2VyIGd1aWRlIHRhbGtpbmcgYWJvdXQgaGllcmFyY2hpY2FsIGluamVjdGlvbi5cbiAgICogLS0+XG4gICAqXG4gICAqIFRoaXMgQVBJIGlzIHRoZSByZWNvbW1lbmRlZCB3YXkgdG8gY29uc3RydWN0IGluamVjdG9ycyBpbiBwZXJmb3JtYW5jZS1zZW5zaXRpdmUgcGFydHMuXG4gICAqXG4gICAqICMjIyBFeGFtcGxlIChbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC9WaHlmak4/cD1wcmV2aWV3KSlcbiAgICpcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBjbGFzcyBQYXJlbnRQcm92aWRlciB7fVxuICAgKiBjbGFzcyBDaGlsZFByb3ZpZGVyIHt9XG4gICAqXG4gICAqIHZhciBwYXJlbnRQcm92aWRlcnMgPSBJbmplY3Rvci5yZXNvbHZlKFtQYXJlbnRQcm92aWRlcl0pO1xuICAgKiB2YXIgY2hpbGRQcm92aWRlcnMgPSBJbmplY3Rvci5yZXNvbHZlKFtDaGlsZFByb3ZpZGVyXSk7XG4gICAqXG4gICAqIHZhciBwYXJlbnQgPSBJbmplY3Rvci5mcm9tUmVzb2x2ZWRQcm92aWRlcnMocGFyZW50UHJvdmlkZXJzKTtcbiAgICogdmFyIGNoaWxkID0gcGFyZW50LmNyZWF0ZUNoaWxkRnJvbVJlc29sdmVkKGNoaWxkUHJvdmlkZXJzKTtcbiAgICpcbiAgICogZXhwZWN0KGNoaWxkLmdldChQYXJlbnRQcm92aWRlcikgaW5zdGFuY2VvZiBQYXJlbnRQcm92aWRlcikudG9CZSh0cnVlKTtcbiAgICogZXhwZWN0KGNoaWxkLmdldChDaGlsZFByb3ZpZGVyKSBpbnN0YW5jZW9mIENoaWxkUHJvdmlkZXIpLnRvQmUodHJ1ZSk7XG4gICAqIGV4cGVjdChjaGlsZC5nZXQoUGFyZW50UHJvdmlkZXIpKS50b0JlKHBhcmVudC5nZXQoUGFyZW50UHJvdmlkZXIpKTtcbiAgICogYGBgXG4gICAqL1xuICBjcmVhdGVDaGlsZEZyb21SZXNvbHZlZChwcm92aWRlcnM6IFJlc29sdmVkUHJvdmlkZXJbXSk6IEluamVjdG9yIHtcbiAgICB2YXIgYmQgPSBwcm92aWRlcnMubWFwKGIgPT4gbmV3IFByb3ZpZGVyV2l0aFZpc2liaWxpdHkoYiwgVmlzaWJpbGl0eS5QdWJsaWMpKTtcbiAgICB2YXIgcHJvdG8gPSBuZXcgUHJvdG9JbmplY3RvcihiZCk7XG4gICAgdmFyIGluaiA9IG5ldyBJbmplY3Rvcihwcm90byk7XG4gICAgaW5qLl9wYXJlbnQgPSB0aGlzO1xuICAgIHJldHVybiBpbmo7XG4gIH1cblxuICAvKipcbiAgICogUmVzb2x2ZXMgYSBwcm92aWRlciBhbmQgaW5zdGFudGlhdGVzIGFuIG9iamVjdCBpbiB0aGUgY29udGV4dCBvZiB0aGUgaW5qZWN0b3IuXG4gICAqXG4gICAqIFRoZSBjcmVhdGVkIG9iamVjdCBkb2VzIG5vdCBnZXQgY2FjaGVkIGJ5IHRoZSBpbmplY3Rvci5cbiAgICpcbiAgICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L3l2VlhvQj9wPXByZXZpZXcpKVxuICAgKlxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIEBJbmplY3RhYmxlKClcbiAgICogY2xhc3MgRW5naW5lIHtcbiAgICogfVxuICAgKlxuICAgKiBASW5qZWN0YWJsZSgpXG4gICAqIGNsYXNzIENhciB7XG4gICAqICAgY29uc3RydWN0b3IocHVibGljIGVuZ2luZTpFbmdpbmUpIHt9XG4gICAqIH1cbiAgICpcbiAgICogdmFyIGluamVjdG9yID0gSW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZShbRW5naW5lXSk7XG4gICAqXG4gICAqIHZhciBjYXIgPSBpbmplY3Rvci5yZXNvbHZlQW5kSW5zdGFudGlhdGUoQ2FyKTtcbiAgICogZXhwZWN0KGNhci5lbmdpbmUpLnRvQmUoaW5qZWN0b3IuZ2V0KEVuZ2luZSkpO1xuICAgKiBleHBlY3QoY2FyKS5ub3QudG9CZShpbmplY3Rvci5yZXNvbHZlQW5kSW5zdGFudGlhdGUoQ2FyKSk7XG4gICAqIGBgYFxuICAgKi9cbiAgcmVzb2x2ZUFuZEluc3RhbnRpYXRlKHByb3ZpZGVyOiBUeXBlIHwgUHJvdmlkZXIpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmluc3RhbnRpYXRlUmVzb2x2ZWQoSW5qZWN0b3IucmVzb2x2ZShbcHJvdmlkZXJdKVswXSk7XG4gIH1cblxuICAvKipcbiAgICogSW5zdGFudGlhdGVzIGFuIG9iamVjdCB1c2luZyBhIHJlc29sdmVkIHByb3ZpZGVyIGluIHRoZSBjb250ZXh0IG9mIHRoZSBpbmplY3Rvci5cbiAgICpcbiAgICogVGhlIGNyZWF0ZWQgb2JqZWN0IGRvZXMgbm90IGdldCBjYWNoZWQgYnkgdGhlIGluamVjdG9yLlxuICAgKlxuICAgKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvcHRDSW1RP3A9cHJldmlldykpXG4gICAqXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogQEluamVjdGFibGUoKVxuICAgKiBjbGFzcyBFbmdpbmUge1xuICAgKiB9XG4gICAqXG4gICAqIEBJbmplY3RhYmxlKClcbiAgICogY2xhc3MgQ2FyIHtcbiAgICogICBjb25zdHJ1Y3RvcihwdWJsaWMgZW5naW5lOkVuZ2luZSkge31cbiAgICogfVxuICAgKlxuICAgKiB2YXIgaW5qZWN0b3IgPSBJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKFtFbmdpbmVdKTtcbiAgICogdmFyIGNhclByb3ZpZGVyID0gSW5qZWN0b3IucmVzb2x2ZShbQ2FyXSlbMF07XG4gICAqIHZhciBjYXIgPSBpbmplY3Rvci5pbnN0YW50aWF0ZVJlc29sdmVkKGNhclByb3ZpZGVyKTtcbiAgICogZXhwZWN0KGNhci5lbmdpbmUpLnRvQmUoaW5qZWN0b3IuZ2V0KEVuZ2luZSkpO1xuICAgKiBleHBlY3QoY2FyKS5ub3QudG9CZShpbmplY3Rvci5pbnN0YW50aWF0ZVJlc29sdmVkKGNhclByb3ZpZGVyKSk7XG4gICAqIGBgYFxuICAgKi9cbiAgaW5zdGFudGlhdGVSZXNvbHZlZChwcm92aWRlcjogUmVzb2x2ZWRQcm92aWRlcik6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2luc3RhbnRpYXRlUHJvdmlkZXIocHJvdmlkZXIsIFZpc2liaWxpdHkuUHVibGljQW5kUHJpdmF0ZSk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9uZXcocHJvdmlkZXI6IFJlc29sdmVkUHJvdmlkZXIsIHZpc2liaWxpdHk6IFZpc2liaWxpdHkpOiBhbnkge1xuICAgIGlmICh0aGlzLl9jb25zdHJ1Y3Rpb25Db3VudGVyKysgPiB0aGlzLl9zdHJhdGVneS5nZXRNYXhOdW1iZXJPZk9iamVjdHMoKSkge1xuICAgICAgdGhyb3cgbmV3IEN5Y2xpY0RlcGVuZGVuY3lFcnJvcih0aGlzLCBwcm92aWRlci5rZXkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5faW5zdGFudGlhdGVQcm92aWRlcihwcm92aWRlciwgdmlzaWJpbGl0eSk7XG4gIH1cblxuICBwcml2YXRlIF9pbnN0YW50aWF0ZVByb3ZpZGVyKHByb3ZpZGVyOiBSZXNvbHZlZFByb3ZpZGVyLCB2aXNpYmlsaXR5OiBWaXNpYmlsaXR5KTogYW55IHtcbiAgICBpZiAocHJvdmlkZXIubXVsdGlQcm92aWRlcikge1xuICAgICAgdmFyIHJlcyA9IExpc3RXcmFwcGVyLmNyZWF0ZUZpeGVkU2l6ZShwcm92aWRlci5yZXNvbHZlZEZhY3Rvcmllcy5sZW5ndGgpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm92aWRlci5yZXNvbHZlZEZhY3Rvcmllcy5sZW5ndGg7ICsraSkge1xuICAgICAgICByZXNbaV0gPSB0aGlzLl9pbnN0YW50aWF0ZShwcm92aWRlciwgcHJvdmlkZXIucmVzb2x2ZWRGYWN0b3JpZXNbaV0sIHZpc2liaWxpdHkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbnRpYXRlKHByb3ZpZGVyLCBwcm92aWRlci5yZXNvbHZlZEZhY3Rvcmllc1swXSwgdmlzaWJpbGl0eSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaW5zdGFudGlhdGUocHJvdmlkZXI6IFJlc29sdmVkUHJvdmlkZXIsIHJlc29sdmVkRmFjdG9yeTogUmVzb2x2ZWRGYWN0b3J5LFxuICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5OiBWaXNpYmlsaXR5KTogYW55IHtcbiAgICB2YXIgZmFjdG9yeSA9IHJlc29sdmVkRmFjdG9yeS5mYWN0b3J5O1xuICAgIHZhciBkZXBzID0gcmVzb2x2ZWRGYWN0b3J5LmRlcGVuZGVuY2llcztcbiAgICB2YXIgbGVuZ3RoID0gZGVwcy5sZW5ndGg7XG5cbiAgICB2YXIgZDA6IGFueTtcbiAgICB2YXIgZDE6IGFueTtcbiAgICB2YXIgZDI6IGFueTtcbiAgICB2YXIgZDM6IGFueTtcbiAgICB2YXIgZDQ6IGFueTtcbiAgICB2YXIgZDU6IGFueTtcbiAgICB2YXIgZDY6IGFueTtcbiAgICB2YXIgZDc6IGFueTtcbiAgICB2YXIgZDg6IGFueTtcbiAgICB2YXIgZDk6IGFueTtcbiAgICB2YXIgZDEwOiBhbnk7XG4gICAgdmFyIGQxMTogYW55O1xuICAgIHZhciBkMTI6IGFueTtcbiAgICB2YXIgZDEzOiBhbnk7XG4gICAgdmFyIGQxNDogYW55O1xuICAgIHZhciBkMTU6IGFueTtcbiAgICB2YXIgZDE2OiBhbnk7XG4gICAgdmFyIGQxNzogYW55O1xuICAgIHZhciBkMTg6IGFueTtcbiAgICB2YXIgZDE5OiBhbnk7XG4gICAgdHJ5IHtcbiAgICAgIGQwID0gbGVuZ3RoID4gMCA/IHRoaXMuX2dldEJ5RGVwZW5kZW5jeShwcm92aWRlciwgZGVwc1swXSwgdmlzaWJpbGl0eSkgOiBudWxsO1xuICAgICAgZDEgPSBsZW5ndGggPiAxID8gdGhpcy5fZ2V0QnlEZXBlbmRlbmN5KHByb3ZpZGVyLCBkZXBzWzFdLCB2aXNpYmlsaXR5KSA6IG51bGw7XG4gICAgICBkMiA9IGxlbmd0aCA+IDIgPyB0aGlzLl9nZXRCeURlcGVuZGVuY3kocHJvdmlkZXIsIGRlcHNbMl0sIHZpc2liaWxpdHkpIDogbnVsbDtcbiAgICAgIGQzID0gbGVuZ3RoID4gMyA/IHRoaXMuX2dldEJ5RGVwZW5kZW5jeShwcm92aWRlciwgZGVwc1szXSwgdmlzaWJpbGl0eSkgOiBudWxsO1xuICAgICAgZDQgPSBsZW5ndGggPiA0ID8gdGhpcy5fZ2V0QnlEZXBlbmRlbmN5KHByb3ZpZGVyLCBkZXBzWzRdLCB2aXNpYmlsaXR5KSA6IG51bGw7XG4gICAgICBkNSA9IGxlbmd0aCA+IDUgPyB0aGlzLl9nZXRCeURlcGVuZGVuY3kocHJvdmlkZXIsIGRlcHNbNV0sIHZpc2liaWxpdHkpIDogbnVsbDtcbiAgICAgIGQ2ID0gbGVuZ3RoID4gNiA/IHRoaXMuX2dldEJ5RGVwZW5kZW5jeShwcm92aWRlciwgZGVwc1s2XSwgdmlzaWJpbGl0eSkgOiBudWxsO1xuICAgICAgZDcgPSBsZW5ndGggPiA3ID8gdGhpcy5fZ2V0QnlEZXBlbmRlbmN5KHByb3ZpZGVyLCBkZXBzWzddLCB2aXNpYmlsaXR5KSA6IG51bGw7XG4gICAgICBkOCA9IGxlbmd0aCA+IDggPyB0aGlzLl9nZXRCeURlcGVuZGVuY3kocHJvdmlkZXIsIGRlcHNbOF0sIHZpc2liaWxpdHkpIDogbnVsbDtcbiAgICAgIGQ5ID0gbGVuZ3RoID4gOSA/IHRoaXMuX2dldEJ5RGVwZW5kZW5jeShwcm92aWRlciwgZGVwc1s5XSwgdmlzaWJpbGl0eSkgOiBudWxsO1xuICAgICAgZDEwID0gbGVuZ3RoID4gMTAgPyB0aGlzLl9nZXRCeURlcGVuZGVuY3kocHJvdmlkZXIsIGRlcHNbMTBdLCB2aXNpYmlsaXR5KSA6IG51bGw7XG4gICAgICBkMTEgPSBsZW5ndGggPiAxMSA/IHRoaXMuX2dldEJ5RGVwZW5kZW5jeShwcm92aWRlciwgZGVwc1sxMV0sIHZpc2liaWxpdHkpIDogbnVsbDtcbiAgICAgIGQxMiA9IGxlbmd0aCA+IDEyID8gdGhpcy5fZ2V0QnlEZXBlbmRlbmN5KHByb3ZpZGVyLCBkZXBzWzEyXSwgdmlzaWJpbGl0eSkgOiBudWxsO1xuICAgICAgZDEzID0gbGVuZ3RoID4gMTMgPyB0aGlzLl9nZXRCeURlcGVuZGVuY3kocHJvdmlkZXIsIGRlcHNbMTNdLCB2aXNpYmlsaXR5KSA6IG51bGw7XG4gICAgICBkMTQgPSBsZW5ndGggPiAxNCA/IHRoaXMuX2dldEJ5RGVwZW5kZW5jeShwcm92aWRlciwgZGVwc1sxNF0sIHZpc2liaWxpdHkpIDogbnVsbDtcbiAgICAgIGQxNSA9IGxlbmd0aCA+IDE1ID8gdGhpcy5fZ2V0QnlEZXBlbmRlbmN5KHByb3ZpZGVyLCBkZXBzWzE1XSwgdmlzaWJpbGl0eSkgOiBudWxsO1xuICAgICAgZDE2ID0gbGVuZ3RoID4gMTYgPyB0aGlzLl9nZXRCeURlcGVuZGVuY3kocHJvdmlkZXIsIGRlcHNbMTZdLCB2aXNpYmlsaXR5KSA6IG51bGw7XG4gICAgICBkMTcgPSBsZW5ndGggPiAxNyA/IHRoaXMuX2dldEJ5RGVwZW5kZW5jeShwcm92aWRlciwgZGVwc1sxN10sIHZpc2liaWxpdHkpIDogbnVsbDtcbiAgICAgIGQxOCA9IGxlbmd0aCA+IDE4ID8gdGhpcy5fZ2V0QnlEZXBlbmRlbmN5KHByb3ZpZGVyLCBkZXBzWzE4XSwgdmlzaWJpbGl0eSkgOiBudWxsO1xuICAgICAgZDE5ID0gbGVuZ3RoID4gMTkgPyB0aGlzLl9nZXRCeURlcGVuZGVuY3kocHJvdmlkZXIsIGRlcHNbMTldLCB2aXNpYmlsaXR5KSA6IG51bGw7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUgaW5zdGFuY2VvZiBBYnN0cmFjdFByb3ZpZGVyRXJyb3IgfHwgZSBpbnN0YW5jZW9mIEluc3RhbnRpYXRpb25FcnJvcikge1xuICAgICAgICBlLmFkZEtleSh0aGlzLCBwcm92aWRlci5rZXkpO1xuICAgICAgfVxuICAgICAgdGhyb3cgZTtcbiAgICB9XG5cbiAgICB2YXIgb2JqO1xuICAgIHRyeSB7XG4gICAgICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgb2JqID0gZmFjdG9yeSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgb2JqID0gZmFjdG9yeShkMCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBvYmogPSBmYWN0b3J5KGQwLCBkMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBvYmogPSBmYWN0b3J5KGQwLCBkMSwgZDIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgb2JqID0gZmFjdG9yeShkMCwgZDEsIGQyLCBkMyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNTpcbiAgICAgICAgICBvYmogPSBmYWN0b3J5KGQwLCBkMSwgZDIsIGQzLCBkNCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNjpcbiAgICAgICAgICBvYmogPSBmYWN0b3J5KGQwLCBkMSwgZDIsIGQzLCBkNCwgZDUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgb2JqID0gZmFjdG9yeShkMCwgZDEsIGQyLCBkMywgZDQsIGQ1LCBkNik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgODpcbiAgICAgICAgICBvYmogPSBmYWN0b3J5KGQwLCBkMSwgZDIsIGQzLCBkNCwgZDUsIGQ2LCBkNyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgOTpcbiAgICAgICAgICBvYmogPSBmYWN0b3J5KGQwLCBkMSwgZDIsIGQzLCBkNCwgZDUsIGQ2LCBkNywgZDgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgIG9iaiA9IGZhY3RvcnkoZDAsIGQxLCBkMiwgZDMsIGQ0LCBkNSwgZDYsIGQ3LCBkOCwgZDkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDExOlxuICAgICAgICAgIG9iaiA9IGZhY3RvcnkoZDAsIGQxLCBkMiwgZDMsIGQ0LCBkNSwgZDYsIGQ3LCBkOCwgZDksIGQxMCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgb2JqID0gZmFjdG9yeShkMCwgZDEsIGQyLCBkMywgZDQsIGQ1LCBkNiwgZDcsIGQ4LCBkOSwgZDEwLCBkMTEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgIG9iaiA9IGZhY3RvcnkoZDAsIGQxLCBkMiwgZDMsIGQ0LCBkNSwgZDYsIGQ3LCBkOCwgZDksIGQxMCwgZDExLCBkMTIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE0OlxuICAgICAgICAgIG9iaiA9IGZhY3RvcnkoZDAsIGQxLCBkMiwgZDMsIGQ0LCBkNSwgZDYsIGQ3LCBkOCwgZDksIGQxMCwgZDExLCBkMTIsIGQxMyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTU6XG4gICAgICAgICAgb2JqID0gZmFjdG9yeShkMCwgZDEsIGQyLCBkMywgZDQsIGQ1LCBkNiwgZDcsIGQ4LCBkOSwgZDEwLCBkMTEsIGQxMiwgZDEzLCBkMTQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE2OlxuICAgICAgICAgIG9iaiA9IGZhY3RvcnkoZDAsIGQxLCBkMiwgZDMsIGQ0LCBkNSwgZDYsIGQ3LCBkOCwgZDksIGQxMCwgZDExLCBkMTIsIGQxMywgZDE0LCBkMTUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE3OlxuICAgICAgICAgIG9iaiA9IGZhY3RvcnkoZDAsIGQxLCBkMiwgZDMsIGQ0LCBkNSwgZDYsIGQ3LCBkOCwgZDksIGQxMCwgZDExLCBkMTIsIGQxMywgZDE0LCBkMTUsIGQxNik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTg6XG4gICAgICAgICAgb2JqID0gZmFjdG9yeShkMCwgZDEsIGQyLCBkMywgZDQsIGQ1LCBkNiwgZDcsIGQ4LCBkOSwgZDEwLCBkMTEsIGQxMiwgZDEzLCBkMTQsIGQxNSwgZDE2LFxuICAgICAgICAgICAgICAgICAgICAgICAgZDE3KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOTpcbiAgICAgICAgICBvYmogPSBmYWN0b3J5KGQwLCBkMSwgZDIsIGQzLCBkNCwgZDUsIGQ2LCBkNywgZDgsIGQ5LCBkMTAsIGQxMSwgZDEyLCBkMTMsIGQxNCwgZDE1LCBkMTYsXG4gICAgICAgICAgICAgICAgICAgICAgICBkMTcsIGQxOCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjA6XG4gICAgICAgICAgb2JqID0gZmFjdG9yeShkMCwgZDEsIGQyLCBkMywgZDQsIGQ1LCBkNiwgZDcsIGQ4LCBkOSwgZDEwLCBkMTEsIGQxMiwgZDEzLCBkMTQsIGQxNSwgZDE2LFxuICAgICAgICAgICAgICAgICAgICAgICAgZDE3LCBkMTgsIGQxOSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgICAgICAgIGBDYW5ub3QgaW5zdGFudGlhdGUgJyR7cHJvdmlkZXIua2V5LmRpc3BsYXlOYW1lfScgYmVjYXVzZSBpdCBoYXMgbW9yZSB0aGFuIDIwIGRlcGVuZGVuY2llc2ApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBJbnN0YW50aWF0aW9uRXJyb3IodGhpcywgZSwgZS5zdGFjaywgcHJvdmlkZXIua2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEJ5RGVwZW5kZW5jeShwcm92aWRlcjogUmVzb2x2ZWRQcm92aWRlciwgZGVwOiBEZXBlbmRlbmN5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXJWaXNpYmlsaXR5OiBWaXNpYmlsaXR5KTogYW55IHtcbiAgICB2YXIgc3BlY2lhbCA9IGlzUHJlc2VudCh0aGlzLl9kZXBQcm92aWRlcikgP1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlcFByb3ZpZGVyLmdldERlcGVuZGVuY3kodGhpcywgcHJvdmlkZXIsIGRlcCkgOlxuICAgICAgICAgICAgICAgICAgICAgIFVOREVGSU5FRDtcbiAgICBpZiAoc3BlY2lhbCAhPT0gVU5ERUZJTkVEKSB7XG4gICAgICByZXR1cm4gc3BlY2lhbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX2dldEJ5S2V5KGRlcC5rZXksIGRlcC5sb3dlckJvdW5kVmlzaWJpbGl0eSwgZGVwLnVwcGVyQm91bmRWaXNpYmlsaXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcC5vcHRpb25hbCwgcHJvdmlkZXJWaXNpYmlsaXR5KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9nZXRCeUtleShrZXk6IEtleSwgbG93ZXJCb3VuZFZpc2liaWxpdHk6IE9iamVjdCwgdXBwZXJCb3VuZFZpc2liaWxpdHk6IE9iamVjdCxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uYWw6IGJvb2xlYW4sIHByb3ZpZGVyVmlzaWJpbGl0eTogVmlzaWJpbGl0eSk6IGFueSB7XG4gICAgaWYgKGtleSA9PT0gSU5KRUNUT1JfS0VZKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAodXBwZXJCb3VuZFZpc2liaWxpdHkgaW5zdGFuY2VvZiBTZWxmTWV0YWRhdGEpIHtcbiAgICAgIHJldHVybiB0aGlzLl9nZXRCeUtleVNlbGYoa2V5LCBvcHRpb25hbCwgcHJvdmlkZXJWaXNpYmlsaXR5KTtcblxuICAgIH0gZWxzZSBpZiAodXBwZXJCb3VuZFZpc2liaWxpdHkgaW5zdGFuY2VvZiBIb3N0TWV0YWRhdGEpIHtcbiAgICAgIHJldHVybiB0aGlzLl9nZXRCeUtleUhvc3Qoa2V5LCBvcHRpb25hbCwgcHJvdmlkZXJWaXNpYmlsaXR5LCBsb3dlckJvdW5kVmlzaWJpbGl0eSk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX2dldEJ5S2V5RGVmYXVsdChrZXksIG9wdGlvbmFsLCBwcm92aWRlclZpc2liaWxpdHksIGxvd2VyQm91bmRWaXNpYmlsaXR5KTtcbiAgICB9XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF90aHJvd09yTnVsbChrZXk6IEtleSwgb3B0aW9uYWw6IGJvb2xlYW4pOiBhbnkge1xuICAgIGlmIChvcHRpb25hbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBOb1Byb3ZpZGVyRXJyb3IodGhpcywga2V5KTtcbiAgICB9XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9nZXRCeUtleVNlbGYoa2V5OiBLZXksIG9wdGlvbmFsOiBib29sZWFuLCBwcm92aWRlclZpc2liaWxpdHk6IFZpc2liaWxpdHkpOiBhbnkge1xuICAgIHZhciBvYmogPSB0aGlzLl9zdHJhdGVneS5nZXRPYmpCeUtleUlkKGtleS5pZCwgcHJvdmlkZXJWaXNpYmlsaXR5KTtcbiAgICByZXR1cm4gKG9iaiAhPT0gVU5ERUZJTkVEKSA/IG9iaiA6IHRoaXMuX3Rocm93T3JOdWxsKGtleSwgb3B0aW9uYWwpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZ2V0QnlLZXlIb3N0KGtleTogS2V5LCBvcHRpb25hbDogYm9vbGVhbiwgcHJvdmlkZXJWaXNpYmlsaXR5OiBWaXNpYmlsaXR5LFxuICAgICAgICAgICAgICAgIGxvd2VyQm91bmRWaXNpYmlsaXR5OiBPYmplY3QpOiBhbnkge1xuICAgIHZhciBpbmo6IEluamVjdG9yID0gdGhpcztcblxuICAgIGlmIChsb3dlckJvdW5kVmlzaWJpbGl0eSBpbnN0YW5jZW9mIFNraXBTZWxmTWV0YWRhdGEpIHtcbiAgICAgIGlmIChpbmouX2lzSG9zdEJvdW5kYXJ5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRQcml2YXRlRGVwZW5kZW5jeShrZXksIG9wdGlvbmFsLCBpbmopO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5qID0gaW5qLl9wYXJlbnQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgd2hpbGUgKGluaiAhPSBudWxsKSB7XG4gICAgICB2YXIgb2JqID0gaW5qLl9zdHJhdGVneS5nZXRPYmpCeUtleUlkKGtleS5pZCwgcHJvdmlkZXJWaXNpYmlsaXR5KTtcbiAgICAgIGlmIChvYmogIT09IFVOREVGSU5FRCkgcmV0dXJuIG9iajtcblxuICAgICAgaWYgKGlzUHJlc2VudChpbmouX3BhcmVudCkgJiYgaW5qLl9pc0hvc3RCb3VuZGFyeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UHJpdmF0ZURlcGVuZGVuY3koa2V5LCBvcHRpb25hbCwgaW5qKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluaiA9IGluai5fcGFyZW50O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl90aHJvd09yTnVsbChrZXksIG9wdGlvbmFsKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2dldFByaXZhdGVEZXBlbmRlbmN5KGtleTogS2V5LCBvcHRpb25hbDogYm9vbGVhbiwgaW5qOiBJbmplY3Rvcik6IGFueSB7XG4gICAgdmFyIG9iaiA9IGluai5fcGFyZW50Ll9zdHJhdGVneS5nZXRPYmpCeUtleUlkKGtleS5pZCwgVmlzaWJpbGl0eS5Qcml2YXRlKTtcbiAgICByZXR1cm4gKG9iaiAhPT0gVU5ERUZJTkVEKSA/IG9iaiA6IHRoaXMuX3Rocm93T3JOdWxsKGtleSwgb3B0aW9uYWwpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZ2V0QnlLZXlEZWZhdWx0KGtleTogS2V5LCBvcHRpb25hbDogYm9vbGVhbiwgcHJvdmlkZXJWaXNpYmlsaXR5OiBWaXNpYmlsaXR5LFxuICAgICAgICAgICAgICAgICAgIGxvd2VyQm91bmRWaXNpYmlsaXR5OiBPYmplY3QpOiBhbnkge1xuICAgIHZhciBpbmo6IEluamVjdG9yID0gdGhpcztcblxuICAgIGlmIChsb3dlckJvdW5kVmlzaWJpbGl0eSBpbnN0YW5jZW9mIFNraXBTZWxmTWV0YWRhdGEpIHtcbiAgICAgIHByb3ZpZGVyVmlzaWJpbGl0eSA9IGluai5faXNIb3N0Qm91bmRhcnkgPyBWaXNpYmlsaXR5LlB1YmxpY0FuZFByaXZhdGUgOiBWaXNpYmlsaXR5LlB1YmxpYztcbiAgICAgIGluaiA9IGluai5fcGFyZW50O1xuICAgIH1cblxuICAgIHdoaWxlIChpbmogIT0gbnVsbCkge1xuICAgICAgdmFyIG9iaiA9IGluai5fc3RyYXRlZ3kuZ2V0T2JqQnlLZXlJZChrZXkuaWQsIHByb3ZpZGVyVmlzaWJpbGl0eSk7XG4gICAgICBpZiAob2JqICE9PSBVTkRFRklORUQpIHJldHVybiBvYmo7XG5cbiAgICAgIHByb3ZpZGVyVmlzaWJpbGl0eSA9IGluai5faXNIb3N0Qm91bmRhcnkgPyBWaXNpYmlsaXR5LlB1YmxpY0FuZFByaXZhdGUgOiBWaXNpYmlsaXR5LlB1YmxpYztcbiAgICAgIGluaiA9IGluai5fcGFyZW50O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl90aHJvd09yTnVsbChrZXksIG9wdGlvbmFsKTtcbiAgfVxuXG4gIGdldCBkaXNwbGF5TmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgSW5qZWN0b3IocHJvdmlkZXJzOiBbJHtfbWFwUHJvdmlkZXJzKHRoaXMsIChiOiBSZXNvbHZlZFByb3ZpZGVyKSA9PiBgIFwiJHtiLmtleS5kaXNwbGF5TmFtZX1cIiBgKS5qb2luKFwiLCBcIil9XSlgO1xuICB9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuZGlzcGxheU5hbWU7IH1cbn1cblxudmFyIElOSkVDVE9SX0tFWSA9IEtleS5nZXQoSW5qZWN0b3IpO1xuXG5cbmZ1bmN0aW9uIF9tYXBQcm92aWRlcnMoaW5qZWN0b3I6IEluamVjdG9yLCBmbjogRnVuY3Rpb24pOiBhbnlbXSB7XG4gIHZhciByZXMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmplY3Rvci5fcHJvdG8ubnVtYmVyT2ZQcm92aWRlcnM7ICsraSkge1xuICAgIHJlcy5wdXNoKGZuKGluamVjdG9yLl9wcm90by5nZXRQcm92aWRlckF0SW5kZXgoaSkpKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
