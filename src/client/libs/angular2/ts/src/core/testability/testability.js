System.register(['angular2/src/core/di', 'angular2/src/facade/collection', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions', '../zone/ng_zone', 'angular2/src/facade/async'], function(exports_1, context_1) {
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
    var di_1, collection_1, lang_1, exceptions_1, ng_zone_1, async_1;
    var Testability, TestabilityRegistry, _NoopGetTestability, _testabilityGetter;
    /**
     * Set the {@link GetTestability} implementation used by the Angular testing framework.
     */
    function setTestabilityGetter(getter) {
        _testabilityGetter = getter;
    }
    exports_1("setTestabilityGetter", setTestabilityGetter);
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
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (ng_zone_1_1) {
                ng_zone_1 = ng_zone_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            }],
        execute: function() {
            /**
             * The Testability service provides testing hooks that can be accessed from
             * the browser and by services such as Protractor. Each bootstrapped Angular
             * application on the page will have an instance of Testability.
             */
            Testability = (function () {
                function Testability(_ngZone) {
                    this._ngZone = _ngZone;
                    /** @internal */
                    this._pendingCount = 0;
                    this._isZoneStable = true;
                    /**
                     * Whether any work was done since the last 'whenStable' callback. This is
                     * useful to detect if this could have potentially destabilized another
                     * component while it is stabilizing.
                     * @internal
                     */
                    this._didWork = false;
                    /** @internal */
                    this._callbacks = [];
                    this._watchAngularEvents();
                }
                /** @internal */
                Testability.prototype._watchAngularEvents = function () {
                    var _this = this;
                    async_1.ObservableWrapper.subscribe(this._ngZone.onUnstable, function (_) {
                        _this._didWork = true;
                        _this._isZoneStable = false;
                    });
                    this._ngZone.runOutsideAngular(function () {
                        async_1.ObservableWrapper.subscribe(_this._ngZone.onStable, function (_) {
                            ng_zone_1.NgZone.assertNotInAngularZone();
                            lang_1.scheduleMicroTask(function () {
                                _this._isZoneStable = true;
                                _this._runCallbacksIfReady();
                            });
                        });
                    });
                };
                Testability.prototype.increasePendingRequestCount = function () {
                    this._pendingCount += 1;
                    this._didWork = true;
                    return this._pendingCount;
                };
                Testability.prototype.decreasePendingRequestCount = function () {
                    this._pendingCount -= 1;
                    if (this._pendingCount < 0) {
                        throw new exceptions_1.BaseException('pending async requests below zero');
                    }
                    this._runCallbacksIfReady();
                    return this._pendingCount;
                };
                Testability.prototype.isStable = function () {
                    return this._isZoneStable && this._pendingCount == 0 && !this._ngZone.hasPendingMacrotasks;
                };
                /** @internal */
                Testability.prototype._runCallbacksIfReady = function () {
                    var _this = this;
                    if (this.isStable()) {
                        // Schedules the call backs in a new frame so that it is always async.
                        lang_1.scheduleMicroTask(function () {
                            while (_this._callbacks.length !== 0) {
                                (_this._callbacks.pop())(_this._didWork);
                            }
                            _this._didWork = false;
                        });
                    }
                    else {
                        // Not Ready
                        this._didWork = true;
                    }
                };
                Testability.prototype.whenStable = function (callback) {
                    this._callbacks.push(callback);
                    this._runCallbacksIfReady();
                };
                Testability.prototype.getPendingRequestCount = function () { return this._pendingCount; };
                Testability.prototype.findBindings = function (using, provider, exactMatch) {
                    // TODO(juliemr): implement.
                    return [];
                };
                Testability.prototype.findProviders = function (using, provider, exactMatch) {
                    // TODO(juliemr): implement.
                    return [];
                };
                Testability = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [ng_zone_1.NgZone])
                ], Testability);
                return Testability;
            }());
            exports_1("Testability", Testability);
            /**
             * A global registry of {@link Testability} instances for specific elements.
             */
            TestabilityRegistry = (function () {
                function TestabilityRegistry() {
                    /** @internal */
                    this._applications = new collection_1.Map();
                    _testabilityGetter.addToWindow(this);
                }
                TestabilityRegistry.prototype.registerApplication = function (token, testability) {
                    this._applications.set(token, testability);
                };
                TestabilityRegistry.prototype.getTestability = function (elem) { return this._applications.get(elem); };
                TestabilityRegistry.prototype.getAllTestabilities = function () { return collection_1.MapWrapper.values(this._applications); };
                TestabilityRegistry.prototype.getAllRootElements = function () { return collection_1.MapWrapper.keys(this._applications); };
                TestabilityRegistry.prototype.findTestabilityInTree = function (elem, findInAncestors) {
                    if (findInAncestors === void 0) { findInAncestors = true; }
                    return _testabilityGetter.findTestabilityInTree(this, elem, findInAncestors);
                };
                TestabilityRegistry = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], TestabilityRegistry);
                return TestabilityRegistry;
            }());
            exports_1("TestabilityRegistry", TestabilityRegistry);
            _NoopGetTestability = (function () {
                function _NoopGetTestability() {
                }
                _NoopGetTestability.prototype.addToWindow = function (registry) { };
                _NoopGetTestability.prototype.findTestabilityInTree = function (registry, elem, findInAncestors) {
                    return null;
                };
                _NoopGetTestability = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [])
                ], _NoopGetTestability);
                return _NoopGetTestability;
            }());
            _testabilityGetter = lang_1.CONST_EXPR(new _NoopGetTestability());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvdGVzdGFiaWxpdHkvdGVzdGFiaWxpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OzsrREF1Skksa0JBQWtCO0lBUHRCOztPQUVHO0lBQ0gsOEJBQXFDLE1BQXNCO1FBQ3pELGtCQUFrQixHQUFHLE1BQU0sQ0FBQztJQUM5QixDQUFDO0lBRkQsdURBRUMsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQTdJRDs7OztlQUlHO1lBRUg7Z0JBYUUscUJBQW9CLE9BQWU7b0JBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtvQkFabkMsZ0JBQWdCO29CQUNoQixrQkFBYSxHQUFXLENBQUMsQ0FBQztvQkFDMUIsa0JBQWEsR0FBWSxJQUFJLENBQUM7b0JBQzlCOzs7Ozt1QkFLRztvQkFDSCxhQUFRLEdBQVksS0FBSyxDQUFDO29CQUMxQixnQkFBZ0I7b0JBQ2hCLGVBQVUsR0FBZSxFQUFFLENBQUM7b0JBQ1csSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7Z0JBQUMsQ0FBQztnQkFFcEUsZ0JBQWdCO2dCQUNoQix5Q0FBbUIsR0FBbkI7b0JBQUEsaUJBZUM7b0JBZEMseUJBQWlCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFVBQUMsQ0FBQzt3QkFDckQsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7d0JBQ3JCLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO29CQUM3QixDQUFDLENBQUMsQ0FBQztvQkFFSCxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDO3dCQUM3Qix5QkFBaUIsQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsVUFBQyxDQUFDOzRCQUNuRCxnQkFBTSxDQUFDLHNCQUFzQixFQUFFLENBQUM7NEJBQ2hDLHdCQUFpQixDQUFDO2dDQUNoQixLQUFJLENBQUMs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QUFDLENBQUM7Z0JBQzdDLENBQUM7Z0JBRUQsNENBQWMsR0FBZCxVQUFlLElBQVMsSUFBaUIsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFL0UsaURBQW1CLEdBQW5CLGNBQXVDLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUV0RixnREFBa0IsR0FBbEIsY0FBOEIsTUFBTSxDQUFDLHVCQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTNFLG1EQUFxQixHQUFyQixVQUFzQixJQUFVLEVBQUUsZUFBK0I7b0JBQS9CLCtCQUErQixHQUEvQixzQkFBK0I7b0JBQy9ELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO2dCQUMvRSxDQUFDO2dCQW5CSDtvQkFBQyxlQUFVLEVBQUU7O3VDQUFBO2dCQW9CYiwwQkFBQztZQUFELENBbkJBLEFBbUJDLElBQUE7WUFuQkQscURBbUJDLENBQUE7WUFhRDtnQkFBQTtnQkFNQSxDQUFDO2dCQUxDLHlDQUFXLEdBQVgsVUFBWSxRQUE2QixJQUFTLENBQUM7Z0JBQ25ELG1EQUFxQixHQUFyQixVQUFzQixRQUE2QixFQUFFLElBQVMsRUFDeEMsZUFBd0I7b0JBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQztnQkFOSDtvQkFBQyxZQUFLLEVBQUU7O3VDQUFBO2dCQU9SLDBCQUFDO1lBQUQsQ0FOQSxBQU1DLElBQUE7WUFTRyxrQkFBa0IsR0FBbUIsaUJBQVUsQ0FBQyxJQUFJLG1CQUFtQixFQUFFLENBQUMsQ0FBQyIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL3Rlc3RhYmlsaXR5L3Rlc3RhYmlsaXR5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge01hcCwgTWFwV3JhcHBlciwgTGlzdFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge0NPTlNULCBDT05TVF9FWFBSLCBzY2hlZHVsZU1pY3JvVGFza30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7Tmdab25lfSBmcm9tICcuLi96b25lL25nX3pvbmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5cblxuLyoqXG4gKiBUaGUgVGVzdGFiaWxpdHkgc2VydmljZSBwcm92aWRlcyB0ZXN0aW5nIGhvb2tzIHRoYXQgY2FuIGJlIGFjY2Vzc2VkIGZyb21cbiAqIHRoZSBicm93c2VyIGFuZCBieSBzZXJ2aWNlcyBzdWNoIGFzIFByb3RyYWN0b3IuIEVhY2ggYm9vdHN0cmFwcGVkIEFuZ3VsYXJcbiAqIGFwcGxpY2F0aW9uIG9uIHRoZSBwYWdlIHdpbGwgaGF2ZSBhbiBpbnN0YW5jZSBvZiBUZXN0YWJpbGl0eS5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRlc3RhYmlsaXR5IHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcGVuZGluZ0NvdW50OiBudW1iZXIgPSAwO1xuICBfaXNab25lU3RhYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgLyoqXG4gICAqIFdoZXRoZXIgYW55IHdvcmsgd2FzIGRvbmUgc2luY2UgdGhlIGxhc3QgJ3doZW5TdGFibGUnIGNhbGxiYWNrLiBUaGlzIGlzXG4gICAqIHVzZWZ1bCB0byBkZXRlY3QgaWYgdGhpcyBjb3VsZCBoYXZlIHBvdGVudGlhbGx5IGRlc3RhYmlsaXplZCBhbm90aGVyXG4gICAqIGNvbXBvbmVudCB3aGlsZSBpdCBpcyBzdGFiaWxpemluZy5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBfZGlkV29yazogYm9vbGVhbiA9IGZhbHNlO1xuICAvKiogQGludGVybmFsICovXG4gIF9jYWxsYmFja3M6IEZ1bmN0aW9uW10gPSBbXTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUpIHsgdGhpcy5fd2F0Y2hBbmd1bGFyRXZlbnRzKCk7IH1cblxuICAvKiogQGludGVybmFsICovXG4gIF93YXRjaEFuZ3VsYXJFdmVudHMoKTogdm9pZCB7XG4gICAgT2JzZXJ2YWJsZVdyYXBwZXIuc3Vic2NyaWJlKHRoaXMuX25nWm9uZS5vblVuc3RhYmxlLCAoXykgPT4ge1xuICAgICAgdGhpcy5fZGlkV29yayA9IHRydWU7XG4gICAgICB0aGlzLl9pc1pvbmVTdGFibGUgPSBmYWxzZTtcbiAgICB9KTtcblxuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBPYnNlcnZhYmxlV3JhcHBlci5zdWJzY3JpYmUodGhpcy5fbmdab25lLm9uU3RhYmxlLCAoXykgPT4ge1xuICAgICAgICBOZ1pvbmUuYXNzZXJ0Tm90SW5Bbmd1bGFyWm9uZSgpO1xuICAgICAgICBzY2hlZHVsZU1pY3JvVGFzaygoKSA9PiB7XG4gICAgICAgICAgdGhpcy5faXNab25lU3RhYmxlID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLl9ydW5DYWxsYmFja3NJZlJlYWR5KCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBpbmNyZWFzZVBlbmRpbmdSZXF1ZXN0Q291bnQoKTogbnVtYmVyIHtcbiAgICB0aGlzLl9wZW5kaW5nQ291bnQgKz0gMTtcbiAgICB0aGlzLl9kaWRXb3JrID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcy5fcGVuZGluZ0NvdW50O1xuICB9XG5cbiAgZGVjcmVhc2VQZW5kaW5nUmVxdWVzdENvdW50KCk6IG51bWJlciB7XG4gICAgdGhpcy5fcGVuZGluZ0NvdW50IC09IDE7XG4gICAgaWYgKHRoaXMuX3BlbmRpbmdDb3VudCA8IDApIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKCdwZW5kaW5nIGFzeW5jIHJlcXVlc3RzIGJlbG93IHplcm8nKTtcbiAgICB9XG4gICAgdGhpcy5fcnVuQ2FsbGJhY2tzSWZSZWFkeSgpO1xuICAgIHJldHVybiB0aGlzLl9wZW5kaW5nQ291bnQ7XG4gIH1cblxuICBpc1N0YWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNab25lU3RhYmxlICYmIHRoaXMuX3BlbmRpbmdDb3VudCA9PSAwICYmICF0aGlzLl9uZ1pvbmUuaGFzUGVuZGluZ01hY3JvdGFza3M7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9ydW5DYWxsYmFja3NJZlJlYWR5KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzU3RhYmxlKCkpIHtcbiAgICAgIC8vIFNjaGVkdWxlcyB0aGUgY2FsbCBiYWNrcyBpbiBhIG5ldyBmcmFtZSBzbyB0aGF0IGl0IGlzIGFsd2F5cyBhc3luYy5cbiAgICAgIHNjaGVkdWxlTWljcm9UYXNrKCgpID0+IHtcbiAgICAgICAgd2hpbGUgKHRoaXMuX2NhbGxiYWNrcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAodGhpcy5fY2FsbGJhY2tzLnBvcCgpKSh0aGlzLl9kaWRXb3JrKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kaWRXb3JrID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTm90IFJlYWR5XG4gICAgICB0aGlzLl9kaWRXb3JrID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICB3aGVuU3RhYmxlKGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMuX2NhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICB0aGlzLl9ydW5DYWxsYmFja3NJZlJlYWR5KCk7XG4gIH1cblxuICBnZXRQZW5kaW5nUmVxdWVzdENvdW50KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9wZW5kaW5nQ291bnQ7IH1cblxuICBmaW5kQmluZGluZ3ModXNpbmc6IGFueSwgcHJvdmlkZXI6IHN0cmluZywgZXhhY3RNYXRjaDogYm9vbGVhbik6IGFueVtdIHtcbiAgICAvLyBUT0RPKGp1bGllbXIpOiBpbXBsZW1lbnQuXG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgZmluZFByb3ZpZGVycyh1c2luZzogYW55LCBwcm92aWRlcjogc3RyaW5nLCBleGFjdE1hdGNoOiBib29sZWFuKTogYW55W10ge1xuICAgIC8vIFRPRE8oanVsaWVtcik6IGltcGxlbWVudC5cbiAgICByZXR1cm4gW107XG4gIH1cbn1cblxuLyoqXG4gKiBBIGdsb2JhbCByZWdpc3RyeSBvZiB7QGxpbmsgVGVzdGFiaWxpdHl9IGluc3RhbmNlcyBmb3Igc3BlY2lmaWMgZWxlbWVudHMuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUZXN0YWJpbGl0eVJlZ2lzdHJ5IHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfYXBwbGljYXRpb25zID0gbmV3IE1hcDxhbnksIFRlc3RhYmlsaXR5PigpO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyBfdGVzdGFiaWxpdHlHZXR0ZXIuYWRkVG9XaW5kb3codGhpcyk7IH1cblxuICByZWdpc3RlckFwcGxpY2F0aW9uKHRva2VuOiBhbnksIHRlc3RhYmlsaXR5OiBUZXN0YWJpbGl0eSkge1xuICAgIHRoaXMuX2FwcGxpY2F0aW9ucy5zZXQodG9rZW4sIHRlc3RhYmlsaXR5KTtcbiAgfVxuXG4gIGdldFRlc3RhYmlsaXR5KGVsZW06IGFueSk6IFRlc3RhYmlsaXR5IHsgcmV0dXJuIHRoaXMuX2FwcGxpY2F0aW9ucy5nZXQoZWxlbSk7IH1cblxuICBnZXRBbGxUZXN0YWJpbGl0aWVzKCk6IFRlc3RhYmlsaXR5W10geyByZXR1cm4gTWFwV3JhcHBlci52YWx1ZXModGhpcy5fYXBwbGljYXRpb25zKTsgfVxuXG4gIGdldEFsbFJvb3RFbGVtZW50cygpOiBhbnlbXSB7IHJldHVybiBNYXBXcmFwcGVyLmtleXModGhpcy5fYXBwbGljYXRpb25zKTsgfVxuXG4gIGZpbmRUZXN0YWJpbGl0eUluVHJlZShlbGVtOiBOb2RlLCBmaW5kSW5BbmNlc3RvcnM6IGJvb2xlYW4gPSB0cnVlKTogVGVzdGFiaWxpdHkge1xuICAgIHJldHVybiBfdGVzdGFiaWxpdHlHZXR0ZXIuZmluZFRlc3RhYmlsaXR5SW5UcmVlKHRoaXMsIGVsZW0sIGZpbmRJbkFuY2VzdG9ycyk7XG4gIH1cbn1cblxuLyoqXG4gKiBBZGFwdGVyIGludGVyZmFjZSBmb3IgcmV0cmlldmluZyB0aGUgYFRlc3RhYmlsaXR5YCBzZXJ2aWNlIGFzc29jaWF0ZWQgZm9yIGFcbiAqIHBhcnRpY3VsYXIgY29udGV4dC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBHZXRUZXN0YWJpbGl0eSB7XG4gIGFkZFRvV2luZG93KHJlZ2lzdHJ5OiBUZXN0YWJpbGl0eVJlZ2lzdHJ5KTogdm9pZDtcbiAgZmluZFRlc3RhYmlsaXR5SW5UcmVlKHJlZ2lzdHJ5OiBUZXN0YWJpbGl0eVJlZ2lzdHJ5LCBlbGVtOiBhbnksXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5kSW5BbmNlc3RvcnM6IGJvb2xlYW4pOiBUZXN0YWJpbGl0eTtcbn1cblxuQENPTlNUKClcbmNsYXNzIF9Ob29wR2V0VGVzdGFiaWxpdHkgaW1wbGVtZW50cyBHZXRUZXN0YWJpbGl0eSB7XG4gIGFkZFRvV2luZG93KHJlZ2lzdHJ5OiBUZXN0YWJpbGl0eVJlZ2lzdHJ5KTogdm9pZCB7fVxuICBmaW5kVGVzdGFiaWxpdHlJblRyZWUocmVnaXN0cnk6IFRlc3RhYmlsaXR5UmVnaXN0cnksIGVsZW06IGFueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmRJbkFuY2VzdG9yczogYm9vbGVhbik6IFRlc3RhYmlsaXR5IHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG4vKipcbiAqIFNldCB0aGUge0BsaW5rIEdldFRlc3RhYmlsaXR5fSBpbXBsZW1lbnRhdGlvbiB1c2VkIGJ5IHRoZSBBbmd1bGFyIHRlc3RpbmcgZnJhbWV3b3JrLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0VGVzdGFiaWxpdHlHZXR0ZXIoZ2V0dGVyOiBHZXRUZXN0YWJpbGl0eSk6IHZvaWQge1xuICBfdGVzdGFiaWxpdHlHZXR0ZXIgPSBnZXR0ZXI7XG59XG5cbnZhciBfdGVzdGFiaWxpdHlHZXR0ZXI6IEdldFRlc3RhYmlsaXR5ID0gQ09OU1RfRVhQUihuZXcgX05vb3BHZXRUZXN0YWJpbGl0eSgpKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
