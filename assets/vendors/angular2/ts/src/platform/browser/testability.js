System.register(['angular2/src/facade/collection', 'angular2/src/facade/lang', 'angular2/src/platform/dom/dom_adapter', 'angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var collection_1, lang_1, dom_adapter_1, core_1;
    var PublicTestability, BrowserGetTestability;
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            PublicTestability = (function () {
                function PublicTestability(testability) {
                    this._testability = testability;
                }
                PublicTestability.prototype.isStable = function () { return this._testability.isStable(); };
                PublicTestability.prototype.whenStable = function (callback) { this._testability.whenStable(callback); };
                PublicTestability.prototype.findBindings = function (using, provider, exactMatch) {
                    return this.findProviders(using, provider, exactMatch);
                };
                PublicTestability.prototype.findProviders = function (using, provider, exactMatch) {
                    return this._testability.findBindings(using, provider, exactMatch);
                };
                return PublicTestability;
            }());
            BrowserGetTestability = (function () {
                function BrowserGetTestability() {
                }
                BrowserGetTestability.init = function () { core_1.setTestabilityGetter(new BrowserGetTestability()); };
                BrowserGetTestability.prototype.addToWindow = function (registry) {
                    lang_1.global.getAngularTestability = function (elem, findInAncestors) {
                        if (findInAncestors === void 0) { findInAncestors = true; }
                        var testability = registry.findTestabilityInTree(elem, findInAncestors);
                        if (testability == null) {
                            throw new Error('Could not find testability for element.');
                        }
                        return new PublicTestability(testability);
                    };
                    lang_1.global.getAllAngularTestabilities = function () {
                        var testabilities = registry.getAllTestabilities();
                        return testabilities.map(function (testability) { return new PublicTestability(testability); });
                    };
                    lang_1.global.getAllAngularRootElements = function () { return registry.getAllRootElements(); };
                    var whenAllStable = function (callback) {
                        var testabilities = lang_1.global.getAllAngularTestabilities();
                        var count = testabilities.length;
                        var didWork = false;
                        var decrement = function (didWork_) {
                            didWork = didWork || didWork_;
                            count--;
                            if (count == 0) {
                                callback(didWork);
                            }
                        };
                        testabilities.forEach(function (testability) { testability.whenStable(decrement); });
                    };
                    if (!lang_1.global.frameworkStabilizers) {
                        lang_1.global.frameworkStabilizers = collection_1.ListWrapper.createGrowableSize(0);
                    }
                    lang_1.global.frameworkStabilizers.push(whenAllStable);
                };
                BrowserGetTestability.prototype.findTestabilityInTree = function (registry, elem, findInAncestors) {
                    if (elem == null) {
                        return null;
                    }
                    var t = registry.getTestability(elem);
                    if (lang_1.isPresent(t)) {
                        return t;
                    }
                    else if (!findInAncestors) {
                        return null;
                    }
                    if (dom_adapter_1.DOM.isShadowRoot(elem)) {
                        return this.findTestabilityInTree(registry, dom_adapter_1.DOM.getHost(elem), true);
                    }
                    return this.findTestabilityInTree(registry, dom_adapter_1.DOM.parentElement(elem), true);
                };
                return BrowserGetTestability;
            }());
            exports_1("BrowserGetTestability", BrowserGetTestability);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9icm93c2VyL3Rlc3RhYmlsaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBZUE7Z0JBSUUsMkJBQVksV0FBd0I7b0JBQUksSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7Z0JBQUMsQ0FBQztnQkFFMUUsb0NBQVEsR0FBUixjQUFzQixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRTVELHNDQUFVLEdBQVYsVUFBVyxRQUFrQixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFMUUsd0NBQVksR0FBWixVQUFhLEtBQVUsRUFBRSxRQUFnQixFQUFFLFVBQW1CO29CQUM1RCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUN6RCxDQUFDO2dCQUVELHlDQUFhLEdBQWIsVUFBYyxLQUFVLEVBQUUsUUFBZ0IsRUFBRSxVQUFtQjtvQkFDN0QsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ3JFLENBQUM7Z0JBQ0gsd0JBQUM7WUFBRCxDQWpCQSxBQWlCQyxJQUFBO1lBRUQ7Z0JBQUE7Z0JBdURBLENBQUM7Z0JBdERRLDBCQUFJLEdBQVgsY0FBZ0IsMkJBQW9CLENBQUMsSUFBSSxxQkFBcUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVwRSwyQ0FBVyxHQUFYLFVBQVksUUFBNkI7b0JBQ3ZDLGFBQU0sQ0FBQyxxQkFBcUIsR0FBRyxVQUFDLElBQVMsRUFBRSxlQUErQjt3QkFBL0IsK0JBQStCLEdBQS9CLHNCQUErQjt3QkFDeEUsSUFBSSxXQUFX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QUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUM3RSxDQUFDO2dCQUNILDRCQUFDO1lBQUQsQ0F2REEsQUF1REMsSUFBQTtZQXZERCx5REF1REMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvcGxhdGZvcm0vYnJvd3Nlci90ZXN0YWJpbGl0eS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TWFwLCBNYXBXcmFwcGVyLCBMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7Q09OU1QsIENPTlNUX0VYUFIsIGdsb2JhbCwgaXNQcmVzZW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9uLCBXcmFwcGVkRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtQcm9taXNlV3JhcHBlciwgT2JzZXJ2YWJsZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYXN5bmMnO1xuXG5pbXBvcnQge0RPTX0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fYWRhcHRlcic7XG5cbmltcG9ydCB7XG4gIEluamVjdGFibGUsXG4gIFRlc3RhYmlsaXR5UmVnaXN0cnksXG4gIFRlc3RhYmlsaXR5LFxuICBHZXRUZXN0YWJpbGl0eSxcbiAgc2V0VGVzdGFiaWxpdHlHZXR0ZXJcbn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5cbmNsYXNzIFB1YmxpY1Rlc3RhYmlsaXR5IHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfdGVzdGFiaWxpdHk6IFRlc3RhYmlsaXR5O1xuXG4gIGNvbnN0cnVjdG9yKHRlc3RhYmlsaXR5OiBUZXN0YWJpbGl0eSkgeyB0aGlzLl90ZXN0YWJpbGl0eSA9IHRlc3RhYmlsaXR5OyB9XG5cbiAgaXNTdGFibGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl90ZXN0YWJpbGl0eS5pc1N0YWJsZSgpOyB9XG5cbiAgd2hlblN0YWJsZShjYWxsYmFjazogRnVuY3Rpb24pIHsgdGhpcy5fdGVzdGFiaWxpdHkud2hlblN0YWJsZShjYWxsYmFjayk7IH1cblxuICBmaW5kQmluZGluZ3ModXNpbmc6IGFueSwgcHJvdmlkZXI6IHN0cmluZywgZXhhY3RNYXRjaDogYm9vbGVhbik6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5maW5kUHJvdmlkZXJzKHVzaW5nLCBwcm92aWRlciwgZXhhY3RNYXRjaCk7XG4gIH1cblxuICBmaW5kUHJvdmlkZXJzKHVzaW5nOiBhbnksIHByb3ZpZGVyOiBzdHJpbmcsIGV4YWN0TWF0Y2g6IGJvb2xlYW4pOiBhbnlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3Rlc3RhYmlsaXR5LmZpbmRCaW5kaW5ncyh1c2luZywgcHJvdmlkZXIsIGV4YWN0TWF0Y2gpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBCcm93c2VyR2V0VGVzdGFiaWxpdHkgaW1wbGVtZW50cyBHZXRUZXN0YWJpbGl0eSB7XG4gIHN0YXRpYyBpbml0KCkgeyBzZXRUZXN0YWJpbGl0eUdldHRlcihuZXcgQnJvd3NlckdldFRlc3RhYmlsaXR5KCkpOyB9XG5cbiAgYWRkVG9XaW5kb3cocmVnaXN0cnk6IFRlc3RhYmlsaXR5UmVnaXN0cnkpOiB2b2lkIHtcbiAgICBnbG9iYWwuZ2V0QW5ndWxhclRlc3RhYmlsaXR5ID0gKGVsZW06IGFueSwgZmluZEluQW5jZXN0b3JzOiBib29sZWFuID0gdHJ1ZSkgPT4ge1xuICAgICAgdmFyIHRlc3RhYmlsaXR5ID0gcmVnaXN0cnkuZmluZFRlc3RhYmlsaXR5SW5UcmVlKGVsZW0sIGZpbmRJbkFuY2VzdG9ycyk7XG4gICAgICBpZiAodGVzdGFiaWxpdHkgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIHRlc3RhYmlsaXR5IGZvciBlbGVtZW50LicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBQdWJsaWNUZXN0YWJpbGl0eSh0ZXN0YWJpbGl0eSk7XG4gICAgfTtcblxuICAgIGdsb2JhbC5nZXRBbGxBbmd1bGFyVGVzdGFiaWxpdGllcyA9ICgpID0+IHtcbiAgICAgIHZhciB0ZXN0YWJpbGl0aWVzID0gcmVnaXN0cnkuZ2V0QWxsVGVzdGFiaWxpdGllcygpO1xuICAgICAgcmV0dXJuIHRlc3RhYmlsaXRpZXMubWFwKCh0ZXN0YWJpbGl0eSkgPT4geyByZXR1cm4gbmV3IFB1YmxpY1Rlc3RhYmlsaXR5KHRlc3RhYmlsaXR5KTsgfSk7XG4gICAgfTtcblxuICAgIGdsb2JhbC5nZXRBbGxBbmd1bGFyUm9vdEVsZW1lbnRzID0gKCkgPT4gcmVnaXN0cnkuZ2V0QWxsUm9vdEVsZW1lbnRzKCk7XG5cbiAgICB2YXIgd2hlbkFsbFN0YWJsZSA9IChjYWxsYmFjaykgPT4ge1xuICAgICAgdmFyIHRlc3RhYmlsaXRpZXMgPSBnbG9iYWwuZ2V0QWxsQW5ndWxhclRlc3RhYmlsaXRpZXMoKTtcbiAgICAgIHZhciBjb3VudCA9IHRlc3RhYmlsaXRpZXMubGVuZ3RoO1xuICAgICAgdmFyIGRpZFdvcmsgPSBmYWxzZTtcbiAgICAgIHZhciBkZWNyZW1lbnQgPSBmdW5jdGlvbihkaWRXb3JrXykge1xuICAgICAgICBkaWRXb3JrID0gZGlkV29yayB8fCBkaWRXb3JrXztcbiAgICAgICAgY291bnQtLTtcbiAgICAgICAgaWYgKGNvdW50ID09IDApIHtcbiAgICAgICAgICBjYWxsYmFjayhkaWRXb3JrKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHRlc3RhYmlsaXRpZXMuZm9yRWFjaChmdW5jdGlvbih0ZXN0YWJpbGl0eSkgeyB0ZXN0YWJpbGl0eS53aGVuU3RhYmxlKGRlY3JlbWVudCk7IH0pO1xuICAgIH07XG5cbiAgICBpZiAoIWdsb2JhbC5mcmFtZXdvcmtTdGFiaWxpemVycykge1xuICAgICAgZ2xvYmFsLmZyYW1ld29ya1N0YWJpbGl6ZXJzID0gTGlzdFdyYXBwZXIuY3JlYXRlR3Jvd2FibGVTaXplKDApO1xuICAgIH1cbiAgICBnbG9iYWwuZnJhbWV3b3JrU3RhYmlsaXplcnMucHVzaCh3aGVuQWxsU3RhYmxlKTtcbiAgfVxuXG4gIGZpbmRUZXN0YWJpbGl0eUluVHJlZShyZWdpc3RyeTogVGVzdGFiaWxpdHlSZWdpc3RyeSwgZWxlbTogYW55LFxuICAgICAgICAgICAgICAgICAgICAgICAgZmluZEluQW5jZXN0b3JzOiBib29sZWFuKTogVGVzdGFiaWxpdHkge1xuICAgIGlmIChlbGVtID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgdCA9IHJlZ2lzdHJ5LmdldFRlc3RhYmlsaXR5KGVsZW0pO1xuICAgIGlmIChpc1ByZXNlbnQodCkpIHtcbiAgICAgIHJldHVybiB0O1xuICAgIH0gZWxzZSBpZiAoIWZpbmRJbkFuY2VzdG9ycykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmIChET00uaXNTaGFkb3dSb290KGVsZW0pKSB7XG4gICAgICByZXR1cm4gdGhpcy5maW5kVGVzdGFiaWxpdHlJblRyZWUocmVnaXN0cnksIERPTS5nZXRIb3N0KGVsZW0pLCB0cnVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZmluZFRlc3RhYmlsaXR5SW5UcmVlKHJlZ2lzdHJ5LCBET00ucGFyZW50RWxlbWVudChlbGVtKSwgdHJ1ZSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
