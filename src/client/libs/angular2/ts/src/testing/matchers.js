System.register(['angular2/src/platform/dom/dom_adapter', 'angular2/src/facade/lang', 'angular2/src/facade/collection'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var dom_adapter_1, lang_1, collection_1;
    var _global, expect;
    function elementText(n) {
        var hasNodes = function (n) {
            var children = dom_adapter_1.DOM.childNodes(n);
            return children && children.length > 0;
        };
        if (n instanceof Array) {
            return n.map(elementText).join("");
        }
        if (dom_adapter_1.DOM.isCommentNode(n)) {
            return '';
        }
        if (dom_adapter_1.DOM.isElementNode(n) && dom_adapter_1.DOM.tagName(n) == 'CONTENT') {
            return elementText(Array.prototype.slice.apply(dom_adapter_1.DOM.getDistributedNodes(n)));
        }
        if (dom_adapter_1.DOM.hasShadowRoot(n)) {
            return elementText(dom_adapter_1.DOM.childNodesAsList(dom_adapter_1.DOM.getShadowRoot(n)));
        }
        if (hasNodes(n)) {
            return elementText(dom_adapter_1.DOM.childNodesAsList(n));
        }
        return dom_adapter_1.DOM.getText(n);
    }
    return {
        setters:[
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            }],
        execute: function() {
            _global = (typeof window === 'undefined' ? lang_1.global : window);
            /**
             * Jasmine matching function with Angular matchers mixed in.
             *
             * ## Example
             *
             * {@example testing/ts/matchers.ts region='toHaveText'}
             */
            exports_1("expect", expect = _global.expect);
            // Some Map polyfills don't polyfill Map.toString correctly, which
            // gives us bad error messages in tests.
            // The only way to do this in Jasmine is to monkey patch a method
            // to the object :-(
            Map.prototype['jasmineToString'] = function () {
                var m = this;
                if (!m) {
                    return '' + m;
                }
                var res = [];
                m.forEach(function (v, k) { res.push(k + ":" + v); });
                return "{ " + res.join(',') + " }";
            };
            _global.beforeEach(function () {
                jasmine.addMatchers({
                    // Custom handler for Map as Jasmine does not support it yet
                    toEqual: function (util, customEqualityTesters) {
                        return {
                            compare: function (actual, expected) {
                                return { pass: util.equals(actual, expected, [compareMap]) };
                            }
                        };
                        function compareMap(actual, expected) {
                            if (actual instanceof Map) {
                                var pass = actual.size === expected.size;
                                if (pass) {
                                    actual.forEach(function (v, k) { pass = pass && util.equals(v, expected.get(k)); });
                                }
                                return pass;
                            }
                            else {
                                return undefined;
                            }
                        }
                    },
                    toBePromise: function () {
                        return {
                            compare: function (actual, expectedClass) {
                                var pass = typeof actual === 'object' && typeof actual.then === 'function';
                                return { pass: pass, get message() { return 'Expected ' + actual + ' to be a promise'; } };
                            }
                        };
                    },
                    toBeAnInstanceOf: function () {
                        return {
                            compare: function (actual, expectedClass) {
                                var pass = typeof actual === 'object' && actual instanceof expectedClass;
                                return {
                                    pass: pass,
                                    get message() {
                                        return 'Expected ' + actual + ' to be an instance of ' + expectedClass;
                                    }
                                };
                            }
                        };
                    },
                    toHaveText: function () {
                        return {
                            compare: function (actual, expectedText) {
                                var actualText = elementText(actual);
                                return {
                                    pass: actualText == expectedText,
                                    get message() { return 'Expected ' + actualText + ' to be equal to ' + expectedText; }
                                };
                            }
                        };
                    },
                    toHaveCssClass: function () {
                        return { compare: buildError(false), negativeCompare: buildError(true) };
                        function buildError(isNot) {
                            return function (actual, className) {
                                return {
                                    pass: dom_adapter_1.DOM.hasClass(actual, className) == !isNot,
                                    get message() {
                                        return "Expected " + actual.outerHTML + " " + (isNot ? 'not ' : '') + "to contain the CSS class \"" + className + "\"";
                                    }
                                };
                            };
                        }
                    },
                    toHaveCssStyle: function () {
                        return {
                            compare: function (actual, styles) {
                                var allPassed;
                                if (lang_1.isString(styles)) {
                                    allPassed = dom_adapter_1.DOM.hasStyle(actual, styles);
                                }
                                else {
                                    allPassed = !collection_1.StringMapWrapper.isEmpty(styles);
                                    collection_1.StringMapWrapper.forEach(styles, function (style, prop) {
                                        allPassed = allPassed && dom_adapter_1.DOM.hasStyle(actual, prop, style);
                                    });
                                }
                                return {
                                    pass: allPassed,
                                    get message() {
                                        var expectedValueStr = lang_1.isString(styles) ? styles : JSON.stringify(styles);
                                        return "Expected " + actual.outerHTML + " " + (!allPassed ? ' ' : 'not ') + "to contain the\n                      CSS " + (lang_1.isString(styles) ? 'property' : 'styles') + " \"" + expectedValueStr + "\"";
                                    }
                                };
                            }
                        };
                    },
                    toContainError: function () {
                        return {
                            compare: function (actual, expectedText) {
                                var errorMessage = actual.toString();
                                return {
                                    pass: errorMessage.indexOf(expectedText) > -1,
                                    get message() { return 'Expected ' + errorMessage + ' to contain ' + expectedText; }
                                };
                            }
                        };
                    },
                    toThrowErrorWith: function () {
                        return {
                            compare: function (actual, expectedText) {
                                try {
                                    actual();
                                    return {
                                        pass: false,
                                        get message() { return "Was expected to throw, but did not throw"; }
                                    };
                                }
                                catch (e) {
                                    var errorMessage = e.toString();
                                    return {
                                        pass: errorMessage.indexOf(expectedText) > -1,
                                        get message() { return 'Expected ' + errorMessage + ' to contain ' + expectedText; }
                                    };
                                }
                            }
                        };
                    },
                    toMatchPattern: function () {
                        return { compare: buildError(false), negativeCompare: buildError(true) };
                        function buildError(isNot) {
                            return function (actual, regex) {
                                return {
                                    pass: regex.test(actual) == !isNot,
                                    get message() {
                                        return "Expected " + actual + " " + (isNot ? 'not ' : '') + "to match " + regex.toString();
                                    }
                                };
                            };
                        }
                    },
                    toImplement: function () {
                        return {
                            compare: function (actualObject, expectedInterface) {
                                var objProps = Object.keys(actualObject.constructor.prototype);
                                var intProps = Object.keys(expectedInterface.prototype);
                                var missedMethods = [];
                                intProps.forEach(function (k) {
                                    if (!actualObject.constructor.prototype[k])
                                        missedMethods.push(k);
                                });
                                return {
                                    pass: missedMethods.length == 0,
                                    get message() {
                                        return 'Expected ' + actualObject + ' to have the following methods: ' +
                                            missedMethods.join(", ");
                                    }
                                };
                            }
                        };
                    }
                });
            });
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3Rlc3RpbmcvbWF0Y2hlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQStGSSxPQUFPLEVBU0EsTUFBTTtJQTBMakIscUJBQXFCLENBQUM7UUFDcEIsSUFBSSxRQUFRLEdBQUcsVUFBQyxDQUFDO1lBQ2YsSUFBSSxRQUFRLEdBQUcsaUJBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUM7UUFFRixFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN2QixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckMsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLGlCQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ1osQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLGlCQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLGlCQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDeEQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsaUJBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUUsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLGlCQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsV0FBVyxDQUFDLGlCQUFHLENBQUMsZ0JBQWdCLENBQUMs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RSxDQUFDLENBQUMsQ0FBQztnQ0FFSCxNQUFNLENBQUM7b0NBQ0wsSUFBSSxFQUFFLGFBQWEsQ0FBQyxNQUFNLElBQUksQ0FBQztvQ0FDL0IsSUFBSSxPQUFPO3dDQUNULE1BQU0sQ0FBQyxXQUFXLEdBQUcsWUFBWSxHQUFHLGtDQUFrQzs0Q0FDL0QsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQ0FDbEMsQ0FBQztpQ0FDRixDQUFDOzRCQUNKLENBQUM7eUJBQ0YsQ0FBQztvQkFDSixDQUFDO2lCQUNGLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3Rlc3RpbmcvbWF0Y2hlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RPTX0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fYWRhcHRlcic7XG5pbXBvcnQge2dsb2JhbCwgaXNTdHJpbmd9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge1N0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5cbi8qKlxuICogSmFzbWluZSBtYXRjaGVycyB0aGF0IGNoZWNrIEFuZ3VsYXIgc3BlY2lmaWMgY29uZGl0aW9ucy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ01hdGNoZXJzIGV4dGVuZHMgamFzbWluZS5NYXRjaGVycyB7XG4gIC8qKlxuICAgKiBFeHBlY3QgdGhlIHZhbHVlIHRvIGJlIGEgYFByb21pc2VgLlxuICAgKlxuICAgKiAjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9CZVByb21pc2UnfVxuICAgKi9cbiAgdG9CZVByb21pc2UoKTogYm9vbGVhbjtcblxuICAvKipcbiAgICogRXhwZWN0IHRoZSB2YWx1ZSB0byBiZSBhbiBpbnN0YW5jZSBvZiBhIGNsYXNzLlxuICAgKlxuICAgKiAjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9CZUFuSW5zdGFuY2VPZid9XG4gICAqL1xuICB0b0JlQW5JbnN0YW5jZU9mKGV4cGVjdGVkOiBhbnkpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgdGhlIGVsZW1lbnQgdG8gaGF2ZSBleGFjdGx5IHRoZSBnaXZlbiB0ZXh0LlxuICAgKlxuICAgKiAjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9IYXZlVGV4dCd9XG4gICAqL1xuICB0b0hhdmVUZXh0KGV4cGVjdGVkOiBhbnkpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgdGhlIGVsZW1lbnQgdG8gaGF2ZSB0aGUgZ2l2ZW4gQ1NTIGNsYXNzLlxuICAgKlxuICAgKiAjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9IYXZlQ3NzQ2xhc3MnfVxuICAgKi9cbiAgdG9IYXZlQ3NzQ2xhc3MoZXhwZWN0ZWQ6IGFueSk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEV4cGVjdCB0aGUgZWxlbWVudCB0byBoYXZlIHRoZSBnaXZlbiBDU1Mgc3R5bGVzLlxuICAgKlxuICAgKiAjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9IYXZlQ3NzU3R5bGUnfVxuICAgKi9cbiAgdG9IYXZlQ3NzU3R5bGUoZXhwZWN0ZWQ6IGFueSk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEV4cGVjdCBhIGNsYXNzIHRvIGltcGxlbWVudCB0aGUgaW50ZXJmYWNlIG9mIHRoZSBnaXZlbiBjbGFzcy5cbiAgICpcbiAgICogIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgdGVzdGluZy90cy9tYXRjaGVycy50cyByZWdpb249J3RvSW1wbGVtZW50J31cbiAgICovXG4gIHRvSW1wbGVtZW50KGV4cGVjdGVkOiBhbnkpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgYW4gZXhjZXB0aW9uIHRvIGNvbnRhaW4gdGhlIGdpdmVuIGVycm9yIHRleHQuXG4gICAqXG4gICAqICMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIHRlc3RpbmcvdHMvbWF0Y2hlcnMudHMgcmVnaW9uPSd0b0NvbnRhaW5FcnJvcid9XG4gICAqL1xuICB0b0NvbnRhaW5FcnJvcihleHBlY3RlZDogYW55KTogYm9vbGVhbjtcblxuICAvKipcbiAgICogRXhwZWN0IGEgZnVuY3Rpb24gdG8gdGhyb3cgYW4gZXJyb3Igd2l0aCB0aGUgZ2l2ZW4gZXJyb3IgdGV4dCB3aGVuIGV4ZWN1dGVkLlxuICAgKlxuICAgKiAjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9UaHJvd0Vycm9yV2l0aCd9XG4gICAqL1xuICB0b1Rocm93RXJyb3JXaXRoKGV4cGVjdGVkTWVzc2FnZTogYW55KTogYm9vbGVhbjtcblxuICAvKipcbiAgICogRXhwZWN0IGEgc3RyaW5nIHRvIG1hdGNoIHRoZSBnaXZlbiByZWd1bGFyIGV4cHJlc3Npb24uXG4gICAqXG4gICAqICMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIHRlc3RpbmcvdHMvbWF0Y2hlcnMudHMgcmVnaW9uPSd0b01hdGNoUGF0dGVybid9XG4gICAqL1xuICB0b01hdGNoUGF0dGVybihleHBlY3RlZE1lc3NhZ2U6IGFueSk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEludmVydCB0aGUgbWF0Y2hlcnMuXG4gICAqL1xuICBub3Q6IE5nTWF0Y2hlcnM7XG59XG5cbnZhciBfZ2xvYmFsID0gPGFueT4odHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB3aW5kb3cpO1xuXG4vKipcbiAqIEphc21pbmUgbWF0Y2hpbmcgZnVuY3Rpb24gd2l0aCBBbmd1bGFyIG1hdGNoZXJzIG1peGVkIGluLlxuICpcbiAqICMjIEV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgdGVzdGluZy90cy9tYXRjaGVycy50cyByZWdpb249J3RvSGF2ZVRleHQnfVxuICovXG5leHBvcnQgdmFyIGV4cGVjdDogKGFjdHVhbDogYW55KSA9PiBOZ01hdGNoZXJzID0gPGFueT5fZ2xvYmFsLmV4cGVjdDtcblxuXG4vLyBTb21lIE1hcCBwb2x5ZmlsbHMgZG9uJ3QgcG9seWZpbGwgTWFwLnRvU3RyaW5nIGNvcnJlY3RseSwgd2hpY2hcbi8vIGdpdmVzIHVzIGJhZCBlcnJvciBtZXNzYWdlcyBpbiB0ZXN0cy5cbi8vIFRoZSBvbmx5IHdheSB0byBkbyB0aGlzIGluIEphc21pbmUgaXMgdG8gbW9ua2V5IHBhdGNoIGEgbWV0aG9kXG4vLyB0byB0aGUgb2JqZWN0IDotKFxuTWFwLnByb3RvdHlwZVsnamFzbWluZVRvU3RyaW5nJ10gPSBmdW5jdGlvbigpIHtcbiAgdmFyIG0gPSB0aGlzO1xuICBpZiAoIW0pIHtcbiAgICByZXR1cm4gJycgKyBtO1xuICB9XG4gIHZhciByZXMgPSBbXTtcbiAgbS5mb3JFYWNoKCh2LCBrKSA9PiB7IHJlcy5wdXNoKGAke2t9OiR7dn1gKTsgfSk7XG4gIHJldHVybiBgeyAke3Jlcy5qb2luKCcsJyl9IH1gO1xufTtcblxuX2dsb2JhbC5iZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICBqYXNtaW5lLmFkZE1hdGNoZXJzKHtcbiAgICAvLyBDdXN0b20gaGFuZGxlciBmb3IgTWFwIGFzIEphc21pbmUgZG9lcyBub3Qgc3VwcG9ydCBpdCB5ZXRcbiAgICB0b0VxdWFsOiBmdW5jdGlvbih1dGlsLCBjdXN0b21FcXVhbGl0eVRlc3RlcnMpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbXBhcmU6IGZ1bmN0aW9uKGFjdHVhbCwgZXhwZWN0ZWQpIHtcbiAgICAgICAgICByZXR1cm4ge3Bhc3M6IHV0aWwuZXF1YWxzKGFjdHVhbCwgZXhwZWN0ZWQsIFtjb21wYXJlTWFwXSl9O1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBmdW5jdGlvbiBjb21wYXJlTWFwKGFjdHVhbCwgZXhwZWN0ZWQpIHtcbiAgICAgICAgaWYgKGFjdHVhbCBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICAgIHZhciBwYXNzID0gYWN0dWFsLnNpemUgPT09IGV4cGVjdGVkLnNpemU7XG4gICAgICAgICAgaWYgKHBhc3MpIHtcbiAgICAgICAgICAgIGFjdHVhbC5mb3JFYWNoKCh2LCBrKSA9PiB7IHBhc3MgPSBwYXNzICYmIHV0aWwuZXF1YWxzKHYsIGV4cGVjdGVkLmdldChrKSk7IH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcGFzcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHRvQmVQcm9taXNlOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbXBhcmU6IGZ1bmN0aW9uKGFjdHVhbCwgZXhwZWN0ZWRDbGFzcykge1xuICAgICAgICAgIHZhciBwYXNzID0gdHlwZW9mIGFjdHVhbCA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGFjdHVhbC50aGVuID09PSAnZnVuY3Rpb24nO1xuICAgICAgICAgIHJldHVybiB7cGFzczogcGFzcywgZ2V0IG1lc3NhZ2UoKSB7IHJldHVybiAnRXhwZWN0ZWQgJyArIGFjdHVhbCArICcgdG8gYmUgYSBwcm9taXNlJzsgfX07XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSxcblxuICAgIHRvQmVBbkluc3RhbmNlT2Y6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29tcGFyZTogZnVuY3Rpb24oYWN0dWFsLCBleHBlY3RlZENsYXNzKSB7XG4gICAgICAgICAgdmFyIHBhc3MgPSB0eXBlb2YgYWN0dWFsID09PSAnb2JqZWN0JyAmJiBhY3R1YWwgaW5zdGFuY2VvZiBleHBlY3RlZENsYXNzO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYXNzOiBwYXNzLFxuICAgICAgICAgICAgZ2V0IG1lc3NhZ2UoKSB7XG4gICAgICAgICAgICAgIHJldHVybiAnRXhwZWN0ZWQgJyArIGFjdHVhbCArICcgdG8gYmUgYW4gaW5zdGFuY2Ugb2YgJyArIGV4cGVjdGVkQ2xhc3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgdG9IYXZlVGV4dDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb21wYXJlOiBmdW5jdGlvbihhY3R1YWwsIGV4cGVjdGVkVGV4dCkge1xuICAgICAgICAgIHZhciBhY3R1YWxUZXh0ID0gZWxlbWVudFRleHQoYWN0dWFsKTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGFzczogYWN0dWFsVGV4dCA9PSBleHBlY3RlZFRleHQsXG4gICAgICAgICAgICBnZXQgbWVzc2FnZSgpIHsgcmV0dXJuICdFeHBlY3RlZCAnICsgYWN0dWFsVGV4dCArICcgdG8gYmUgZXF1YWwgdG8gJyArIGV4cGVjdGVkVGV4dDsgfVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSxcblxuICAgIHRvSGF2ZUNzc0NsYXNzOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7Y29tcGFyZTogYnVpbGRFcnJvcihmYWxzZSksIG5lZ2F0aXZlQ29tcGFyZTogYnVpbGRFcnJvcih0cnVlKX07XG5cbiAgICAgIGZ1bmN0aW9uIGJ1aWxkRXJyb3IoaXNOb3QpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGFjdHVhbCwgY2xhc3NOYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhc3M6IERPTS5oYXNDbGFzcyhhY3R1YWwsIGNsYXNzTmFtZSkgPT0gIWlzTm90LFxuICAgICAgICAgICAgZ2V0IG1lc3NhZ2UoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBgRXhwZWN0ZWQgJHthY3R1YWwub3V0ZXJIVE1MfSAke2lzTm90ID8gJ25vdCAnIDogJyd9dG8gY29udGFpbiB0aGUgQ1NTIGNsYXNzIFwiJHtjbGFzc05hbWV9XCJgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSxcblxuICAgIHRvSGF2ZUNzc1N0eWxlOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbXBhcmU6IGZ1bmN0aW9uKGFjdHVhbCwgc3R5bGVzKSB7XG4gICAgICAgICAgdmFyIGFsbFBhc3NlZDtcbiAgICAgICAgICBpZiAoaXNTdHJpbmcoc3R5bGVzKSkge1xuICAgICAgICAgICAgYWxsUGFzc2VkID0gRE9NLmhhc1N0eWxlKGFjdHVhbCwgc3R5bGVzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWxsUGFzc2VkID0gIVN0cmluZ01hcFdyYXBwZXIuaXNFbXB0eShzdHlsZXMpO1xuICAgICAgICAgICAgU3RyaW5nTWFwV3JhcHBlci5mb3JFYWNoKHN0eWxlcywgKHN0eWxlLCBwcm9wKSA9PiB7XG4gICAgICAgICAgICAgIGFsbFBhc3NlZCA9IGFsbFBhc3NlZCAmJiBET00uaGFzU3R5bGUoYWN0dWFsLCBwcm9wLCBzdHlsZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGFzczogYWxsUGFzc2VkLFxuICAgICAgICAgICAgZ2V0IG1lc3NhZ2UoKSB7XG4gICAgICAgICAgICAgIHZhciBleHBlY3RlZFZhbHVlU3RyID0gaXNTdHJpbmcoc3R5bGVzKSA/IHN0eWxlcyA6IEpTT04uc3RyaW5naWZ5KHN0eWxlcyk7XG4gICAgICAgICAgICAgIHJldHVybiBgRXhwZWN0ZWQgJHthY3R1YWwub3V0ZXJIVE1MfSAkeyFhbGxQYXNzZWQgPyAnICcgOiAnbm90ICd9dG8gY29udGFpbiB0aGVcbiAgICAgICAgICAgICAgICAgICAgICBDU1MgJHtpc1N0cmluZyhzdHlsZXMpID8gJ3Byb3BlcnR5JyA6ICdzdHlsZXMnfSBcIiR7ZXhwZWN0ZWRWYWx1ZVN0cn1cImA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgdG9Db250YWluRXJyb3I6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29tcGFyZTogZnVuY3Rpb24oYWN0dWFsLCBleHBlY3RlZFRleHQpIHtcbiAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gYWN0dWFsLnRvU3RyaW5nKCk7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhc3M6IGVycm9yTWVzc2FnZS5pbmRleE9mKGV4cGVjdGVkVGV4dCkgPiAtMSxcbiAgICAgICAgICAgIGdldCBtZXNzYWdlKCkgeyByZXR1cm4gJ0V4cGVjdGVkICcgKyBlcnJvck1lc3NhZ2UgKyAnIHRvIGNvbnRhaW4gJyArIGV4cGVjdGVkVGV4dDsgfVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSxcblxuICAgIHRvVGhyb3dFcnJvcldpdGg6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29tcGFyZTogZnVuY3Rpb24oYWN0dWFsLCBleHBlY3RlZFRleHQpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgYWN0dWFsKCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBwYXNzOiBmYWxzZSxcbiAgICAgICAgICAgICAgZ2V0IG1lc3NhZ2UoKSB7IHJldHVybiBcIldhcyBleHBlY3RlZCB0byB0aHJvdywgYnV0IGRpZCBub3QgdGhyb3dcIjsgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gZS50b1N0cmluZygpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgcGFzczogZXJyb3JNZXNzYWdlLmluZGV4T2YoZXhwZWN0ZWRUZXh0KSA+IC0xLFxuICAgICAgICAgICAgICBnZXQgbWVzc2FnZSgpIHsgcmV0dXJuICdFeHBlY3RlZCAnICsgZXJyb3JNZXNzYWdlICsgJyB0byBjb250YWluICcgKyBleHBlY3RlZFRleHQ7IH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0sXG5cbiAgICB0b01hdGNoUGF0dGVybigpIHtcbiAgICAgIHJldHVybiB7Y29tcGFyZTogYnVpbGRFcnJvcihmYWxzZSksIG5lZ2F0aXZlQ29tcGFyZTogYnVpbGRFcnJvcih0cnVlKX07XG5cbiAgICAgIGZ1bmN0aW9uIGJ1aWxkRXJyb3IoaXNOb3QpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGFjdHVhbCwgcmVnZXgpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGFzczogcmVnZXgudGVzdChhY3R1YWwpID09ICFpc05vdCxcbiAgICAgICAgICAgIGdldCBtZXNzYWdlKCkge1xuICAgICAgICAgICAgICByZXR1cm4gYEV4cGVjdGVkICR7YWN0dWFsfSAke2lzTm90ID8gJ25vdCAnIDogJyd9dG8gbWF0Y2ggJHtyZWdleC50b1N0cmluZygpfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdG9JbXBsZW1lbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29tcGFyZTogZnVuY3Rpb24oYWN0dWFsT2JqZWN0LCBleHBlY3RlZEludGVyZmFjZSkge1xuICAgICAgICAgIHZhciBvYmpQcm9wcyA9IE9iamVjdC5rZXlzKGFjdHVhbE9iamVjdC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUpO1xuICAgICAgICAgIHZhciBpbnRQcm9wcyA9IE9iamVjdC5rZXlzKGV4cGVjdGVkSW50ZXJmYWNlLnByb3RvdHlwZSk7XG5cbiAgICAgICAgICB2YXIgbWlzc2VkTWV0aG9kcyA9IFtdO1xuICAgICAgICAgIGludFByb3BzLmZvckVhY2goKGspID0+IHtcbiAgICAgICAgICAgIGlmICghYWN0dWFsT2JqZWN0LmNvbnN0cnVjdG9yLnByb3RvdHlwZVtrXSkgbWlzc2VkTWV0aG9kcy5wdXNoKGspO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhc3M6IG1pc3NlZE1ldGhvZHMubGVuZ3RoID09IDAsXG4gICAgICAgICAgICBnZXQgbWVzc2FnZSgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICdFeHBlY3RlZCAnICsgYWN0dWFsT2JqZWN0ICsgJyB0byBoYXZlIHRoZSBmb2xsb3dpbmcgbWV0aG9kczogJyArXG4gICAgICAgICAgICAgICAgICAgICBtaXNzZWRNZXRob2RzLmpvaW4oXCIsIFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG59KTtcblxuZnVuY3Rpb24gZWxlbWVudFRleHQobikge1xuICB2YXIgaGFzTm9kZXMgPSAobikgPT4ge1xuICAgIHZhciBjaGlsZHJlbiA9IERPTS5jaGlsZE5vZGVzKG4pO1xuICAgIHJldHVybiBjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGggPiAwO1xuICB9O1xuXG4gIGlmIChuIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICByZXR1cm4gbi5tYXAoZWxlbWVudFRleHQpLmpvaW4oXCJcIik7XG4gIH1cblxuICBpZiAoRE9NLmlzQ29tbWVudE5vZGUobikpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBpZiAoRE9NLmlzRWxlbWVudE5vZGUobikgJiYgRE9NLnRhZ05hbWUobikgPT0gJ0NPTlRFTlQnKSB7XG4gICAgcmV0dXJuIGVsZW1lbnRUZXh0KEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShET00uZ2V0RGlzdHJpYnV0ZWROb2RlcyhuKSkpO1xuICB9XG5cbiAgaWYgKERPTS5oYXNTaGFkb3dSb290KG4pKSB7XG4gICAgcmV0dXJuIGVsZW1lbnRUZXh0KERPTS5jaGlsZE5vZGVzQXNMaXN0KERPTS5nZXRTaGFkb3dSb290KG4pKSk7XG4gIH1cblxuICBpZiAoaGFzTm9kZXMobikpIHtcbiAgICByZXR1cm4gZWxlbWVudFRleHQoRE9NLmNoaWxkTm9kZXNBc0xpc3QobikpO1xuICB9XG5cbiAgcmV0dXJuIERPTS5nZXRUZXh0KG4pO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
