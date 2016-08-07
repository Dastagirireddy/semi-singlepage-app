System.register(['angular2/src/facade/lang', 'angular2/src/facade/collection', 'angular2/src/facade/exceptions', './element', './exceptions', 'angular2/src/core/change_detection/change_detection', 'angular2/src/core/di', 'angular2/src/core/render/api', 'angular2/src/core/application_tokens'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var lang_1, collection_1, exceptions_1, element_1, exceptions_2, change_detection_1, di_1, api_1, application_tokens_1;
    var ViewUtils, EMPTY_ARR, MAX_INTERPOLATION_VALUES;
    function flattenNestedViewRenderNodes(nodes) {
        return _flattenNestedViewRenderNodes(nodes, []);
    }
    exports_1("flattenNestedViewRenderNodes", flattenNestedViewRenderNodes);
    function _flattenNestedViewRenderNodes(nodes, renderNodes) {
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (node instanceof element_1.AppElement) {
                var appEl = node;
                renderNodes.push(appEl.nativeElement);
                if (lang_1.isPresent(appEl.nestedViews)) {
                    for (var k = 0; k < appEl.nestedViews.length; k++) {
                        _flattenNestedViewRenderNodes(appEl.nestedViews[k].rootNodesOrAppElements, renderNodes);
                    }
                }
            }
            else {
                renderNodes.push(node);
            }
        }
        return renderNodes;
    }
    function ensureSlotCount(projectableNodes, expectedSlotCount) {
        var res;
        if (lang_1.isBlank(projectableNodes)) {
            res = EMPTY_ARR;
        }
        else if (projectableNodes.length < expectedSlotCount) {
            var givenSlotCount = projectableNodes.length;
            res = collection_1.ListWrapper.createFixedSize(expectedSlotCount);
            for (var i = 0; i < expectedSlotCount; i++) {
                res[i] = (i < givenSlotCount) ? projectableNodes[i] : EMPTY_ARR;
            }
        }
        else {
            res = projectableNodes;
        }
        return res;
    }
    exports_1("ensureSlotCount", ensureSlotCount);
    function interpolate(valueCount, c0, a1, c1, a2, c2, a3, c3, a4, c4, a5, c5, a6, c6, a7, c7, a8, c8, a9, c9) {
        switch (valueCount) {
            case 1:
                return c0 + _toStringWithNull(a1) + c1;
            case 2:
                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2;
            case 3:
                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                    c3;
            case 4:
                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                    c3 + _toStringWithNull(a4) + c4;
            case 5:
                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                    c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5;
            case 6:
                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                    c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) +
                    c6;
            case 7:
                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                    c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) +
                    c6 + _toStringWithNull(a7) + c7;
            case 8:
                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                    c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) +
                    c6 + _toStringWithNull(a7) + c7 + _toStringWithNull(a8) + c8;
            case 9:
                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                    c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) +
                    c6 + _toStringWithNull(a7) + c7 + _toStringWithNull(a8) + c8 + _toStringWithNull(a9) +
                    c9;
            default:
                throw new exceptions_1.BaseException("Does not support more than 9 expressions");
        }
    }
    exports_1("interpolate", interpolate);
    function _toStringWithNull(v) {
        return v != null ? v.toString() : '';
    }
    function checkBinding(throwOnChange, oldValue, newValue) {
        if (throwOnChange) {
            if (!change_detection_1.devModeEqual(oldValue, newValue)) {
                throw new exceptions_2.ExpressionChangedAfterItHasBeenCheckedException(oldValue, newValue, null);
            }
            return false;
        }
        else {
            return !lang_1.looseIdentical(oldValue, newValue);
        }
    }
    exports_1("checkBinding", checkBinding);
    function arrayLooseIdentical(a, b) {
        if (a.length != b.length)
            return false;
        for (var i = 0; i < a.length; ++i) {
            if (!lang_1.looseIdentical(a[i], b[i]))
                return false;
        }
        return true;
    }
    exports_1("arrayLooseIdentical", arrayLooseIdentical);
    function mapLooseIdentical(m1, m2) {
        var k1 = collection_1.StringMapWrapper.keys(m1);
        var k2 = collection_1.StringMapWrapper.keys(m2);
        if (k1.length != k2.length) {
            return false;
        }
        var key;
        for (var i = 0; i < k1.length; i++) {
            key = k1[i];
            if (!lang_1.looseIdentical(m1[key], m2[key])) {
                return false;
            }
        }
        return true;
    }
    exports_1("mapLooseIdentical", mapLooseIdentical);
    function castByValue(input, value) {
        return input;
    }
    exports_1("castByValue", castByValue);
    function pureProxy1(fn) {
        var result;
        var v0;
        v0 = change_detection_1.uninitialized;
        return function (p0) {
            if (!lang_1.looseIdentical(v0, p0)) {
                v0 = p0;
                result = fn(p0);
            }
            return result;
        };
    }
    exports_1("pureProxy1", pureProxy1);
    function pureProxy2(fn) {
        var result;
        var v0, v1;
        v0 = v1 = change_detection_1.uninitialized;
        return function (p0, p1) {
            if (!lang_1.looseIdentical(v0, p0) || !lang_1.looseIdentical(v1, p1)) {
                v0 = p0;
                v1 = p1;
                result = fn(p0, p1);
            }
            return result;
        };
    }
    exports_1("pureProxy2", pureProxy2);
    function pureProxy3(fn) {
        var result;
        var v0, v1, v2;
        v0 = v1 = v2 = change_detection_1.uninitialized;
        return function (p0, p1, p2) {
            if (!lang_1.looseIdentical(v0, p0) || !lang_1.looseIdentical(v1, p1) || !lang_1.looseIdentical(v2, p2)) {
                v0 = p0;
                v1 = p1;
                v2 = p2;
                result = fn(p0, p1, p2);
            }
            return result;
        };
    }
    exports_1("pureProxy3", pureProxy3);
    function pureProxy4(fn) {
        var result;
        var v0, v1, v2, v3;
        v0 = v1 = v2 = v3 = change_detection_1.uninitialized;
        return function (p0, p1, p2, p3) {
            if (!lang_1.looseIdentical(v0, p0) || !lang_1.looseIdentical(v1, p1) || !lang_1.looseIdentical(v2, p2) ||
                !lang_1.looseIdentical(v3, p3)) {
                v0 = p0;
                v1 = p1;
                v2 = p2;
                v3 = p3;
                result = fn(p0, p1, p2, p3);
            }
            return result;
        };
    }
    exports_1("pureProxy4", pureProxy4);
    function pureProxy5(fn) {
        var result;
        var v0, v1, v2, v3, v4;
        v0 = v1 = v2 = v3 = v4 = change_detection_1.uninitialized;
        return function (p0, p1, p2, p3, p4) {
            if (!lang_1.looseIdentical(v0, p0) || !lang_1.looseIdentical(v1, p1) || !lang_1.looseIdentical(v2, p2) ||
                !lang_1.looseIdentical(v3, p3) || !lang_1.looseIdentical(v4, p4)) {
                v0 = p0;
                v1 = p1;
                v2 = p2;
                v3 = p3;
                v4 = p4;
                result = fn(p0, p1, p2, p3, p4);
            }
            return result;
        };
    }
    exports_1("pureProxy5", pureProxy5);
    function pureProxy6(fn) {
        var result;
        var v0, v1, v2, v3, v4, v5;
        v0 = v1 = v2 = v3 = v4 = v5 = change_detection_1.uninitialized;
        return function (p0, p1, p2, p3, p4, p5) {
            if (!lang_1.looseIdentical(v0, p0) || !lang_1.looseIdentical(v1, p1) || !lang_1.looseIdentical(v2, p2) ||
                !lang_1.looseIdentical(v3, p3) || !lang_1.looseIdentical(v4, p4) || !lang_1.looseIdentical(v5, p5)) {
                v0 = p0;
                v1 = p1;
                v2 = p2;
                v3 = p3;
                v4 = p4;
                v5 = p5;
                result = fn(p0, p1, p2, p3, p4, p5);
            }
            return result;
        };
    }
    exports_1("pureProxy6", pureProxy6);
    function pureProxy7(fn) {
        var result;
        var v0, v1, v2, v3, v4, v5, v6;
        v0 = v1 = v2 = v3 = v4 = v5 = v6 = change_detection_1.uninitialized;
        return function (p0, p1, p2, p3, p4, p5, p6) {
            if (!lang_1.looseIdentical(v0, p0) || !lang_1.looseIdentical(v1, p1) || !lang_1.looseIdentical(v2, p2) ||
                !lang_1.looseIdentical(v3, p3) || !lang_1.looseIdentical(v4, p4) || !lang_1.looseIdentical(v5, p5) ||
                !lang_1.looseIdentical(v6, p6)) {
                v0 = p0;
                v1 = p1;
                v2 = p2;
                v3 = p3;
                v4 = p4;
                v5 = p5;
                v6 = p6;
                result = fn(p0, p1, p2, p3, p4, p5, p6);
            }
            return result;
        };
    }
    exports_1("pureProxy7", pureProxy7);
    function pureProxy8(fn) {
        var result;
        var v0, v1, v2, v3, v4, v5, v6, v7;
        v0 = v1 = v2 = v3 = v4 = v5 = v6 = v7 = change_detection_1.uninitialized;
        return function (p0, p1, p2, p3, p4, p5, p6, p7) {
            if (!lang_1.looseIdentical(v0, p0) || !lang_1.looseIdentical(v1, p1) || !lang_1.looseIdentical(v2, p2) ||
                !lang_1.looseIdentical(v3, p3) || !lang_1.looseIdentical(v4, p4) || !lang_1.looseIdentical(v5, p5) ||
                !lang_1.looseIdentical(v6, p6) || !lang_1.looseIdentical(v7, p7)) {
                v0 = p0;
                v1 = p1;
                v2 = p2;
                v3 = p3;
                v4 = p4;
                v5 = p5;
                v6 = p6;
                v7 = p7;
                result = fn(p0, p1, p2, p3, p4, p5, p6, p7);
            }
            return result;
        };
    }
    exports_1("pureProxy8", pureProxy8);
    function pureProxy9(fn) {
        var result;
        var v0, v1, v2, v3, v4, v5, v6, v7, v8;
        v0 = v1 = v2 = v3 = v4 = v5 = v6 = v7 = v8 = change_detection_1.uninitialized;
        return function (p0, p1, p2, p3, p4, p5, p6, p7, p8) {
            if (!lang_1.looseIdentical(v0, p0) || !lang_1.looseIdentical(v1, p1) || !lang_1.looseIdentical(v2, p2) ||
                !lang_1.looseIdentical(v3, p3) || !lang_1.looseIdentical(v4, p4) || !lang_1.looseIdentical(v5, p5) ||
                !lang_1.looseIdentical(v6, p6) || !lang_1.looseIdentical(v7, p7) || !lang_1.looseIdentical(v8, p8)) {
                v0 = p0;
                v1 = p1;
                v2 = p2;
                v3 = p3;
                v4 = p4;
                v5 = p5;
                v6 = p6;
                v7 = p7;
                v8 = p8;
                result = fn(p0, p1, p2, p3, p4, p5, p6, p7, p8);
            }
            return result;
        };
    }
    exports_1("pureProxy9", pureProxy9);
    function pureProxy10(fn) {
        var result;
        var v0, v1, v2, v3, v4, v5, v6, v7, v8, v9;
        v0 = v1 = v2 = v3 = v4 = v5 = v6 = v7 = v8 = v9 = change_detection_1.uninitialized;
        return function (p0, p1, p2, p3, p4, p5, p6, p7, p8, p9) {
            if (!lang_1.looseIdentical(v0, p0) || !lang_1.looseIdentical(v1, p1) || !lang_1.looseIdentical(v2, p2) ||
                !lang_1.looseIdentical(v3, p3) || !lang_1.looseIdentical(v4, p4) || !lang_1.looseIdentical(v5, p5) ||
                !lang_1.looseIdentical(v6, p6) || !lang_1.looseIdentical(v7, p7) || !lang_1.looseIdentical(v8, p8) ||
                !lang_1.looseIdentical(v9, p9)) {
                v0 = p0;
                v1 = p1;
                v2 = p2;
                v3 = p3;
                v4 = p4;
                v5 = p5;
                v6 = p6;
                v7 = p7;
                v8 = p8;
                v9 = p9;
                result = fn(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9);
            }
            return result;
        };
    }
    exports_1("pureProxy10", pureProxy10);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (element_1_1) {
                element_1 = element_1_1;
            },
            function (exceptions_2_1) {
                exceptions_2 = exceptions_2_1;
            },
            function (change_detection_1_1) {
                change_detection_1 = change_detection_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (api_1_1) {
                api_1 = api_1_1;
            },
            function (application_tokens_1_1) {
                application_tokens_1 = application_tokens_1_1;
            }],
        execute: function() {
            ViewUtils = (function () {
                function ViewUtils(_renderer, _appId) {
                    this._renderer = _renderer;
                    this._appId = _appId;
                    this._nextCompTypeId = 0;
                }
                /**
                 * Used by the generated code
                 */
                ViewUtils.prototype.createRenderComponentType = function (templateUrl, slotCount, encapsulation, styles) {
                    return new api_1.RenderComponentType(this._appId + "-" + this._nextCompTypeId++, templateUrl, slotCount, encapsulation, styles);
                };
                /** @internal */
                ViewUtils.prototype.renderComponent = function (renderComponentType) {
                    return this._renderer.renderComponent(renderComponentType);
                };
                ViewUtils = __decorate([
                    di_1.Injectable(),
                    __param(1, di_1.Inject(application_tokens_1.APP_ID)), 
                    __metadata('design:paramtypes', [api_1.RootRenderer, String])
                ], ViewUtils);
                return ViewUtils;
            }());
            exports_1("ViewUtils", ViewUtils);
            EMPTY_ARR = lang_1.CONST_EXPR([]);
            exports_1("MAX_INTERPOLATION_VALUES", MAX_INTERPOLATION_VALUES = 9);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2xpbmtlci92aWV3X3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7bUJBOERNLFNBQVMsRUFrQkYsd0JBQXdCO0lBeENyQyxzQ0FBNkMsS0FBWTtRQUN2RCxNQUFNLENBQUMsNkJBQTZCLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFGRCx1RUFFQyxDQUFBO0lBRUQsdUNBQXVDLEtBQVksRUFBRSxXQUFrQjtRQUNyRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN0QyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxZQUFZLG9CQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixJQUFJLEtBQUssR0FBZSxJQUFJLENBQUM7Z0JBQzdCLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUN0QyxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDbEQsNkJBQTZCLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsRUFBRSxXQUFXLENBQUMsQ0FBQztvQkFDMUYsQ0FBQztnQkFDSCxDQUFDO1lBQ0gsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENB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LEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsZ0NBQWEsQ0FBQztRQUNoRSxNQUFNLENBQUMsVUFBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQzVDLEVBQUUsQ0FBQyxDQUFDLENBQUMscUJBQWMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxxQkFBYyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFjLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDN0UsQ0FBQyxxQkFBYyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFjLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMscUJBQWMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO2dCQUM3RSxDQUFDLHFCQUFjLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMscUJBQWMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxxQkFBYyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7Z0JBQzdFLENBQUMscUJBQWMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixFQUFFLEdBQUcsRUFBRSxDQUFDO2dCQUNSLEVBQUUsR0FBRyxFQUFFLENBQUM7Z0JBQ1IsRUFBRSxHQUFHLEVBQUUsQ0FBQztnQkFDUixFQUFFLEdBQUcsRUFBRSxDQUFDO2dCQUNSLEVBQUUsR0FBRyxFQUFFLENBQUM7Z0JBQ1IsRUFBRSxHQUFHLEVBQUUsQ0FBQztnQkFDUixFQUFFLEdBQUcsRUFBRSxDQUFDO2dCQUNSLEVBQUUsR0FBRyxFQUFFLENBQUM7Z0JBQ1IsRUFBRSxHQUFHLEVBQUUsQ0FBQztnQkFDUixFQUFFLEdBQUcsRUFBRSxDQUFDO2dCQUNSLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDdEQsQ0FBQztZQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQXpCRCxxQ0F5QkMsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQTFWRDtnQkFHRSxtQkFBb0IsU0FBdUIsRUFBMEIsTUFBYztvQkFBL0QsY0FBUyxHQUFULFNBQVMsQ0FBYztvQkFBMEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtvQkFGM0Usb0JBQWUsR0FBVyxDQUFDLENBQUM7Z0JBRWtELENBQUM7Z0JBRXZGOzttQkFFRztnQkFDSCw2Q0FBeUIsR0FBekIsVUFBMEIsV0FBbUIsRUFBRSxTQUFpQixFQUN0QyxhQUFnQyxFQUNoQyxNQUE2QjtvQkFDckQsTUFBTSxDQUFDLElBQUkseUJBQW1CLENBQUksSUFBSSxDQUFDLE1BQU0sU0FBSSxJQUFJLENBQUMsZUFBZSxFQUFJLEVBQUUsV0FBVyxFQUN2RCxTQUFTLEVBQUUsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNuRSxDQUFDO2dCQUVELGdCQUFnQjtnQkFDaEIsbUNBQWUsR0FBZixVQUFnQixtQkFBd0M7b0JBQ3RELE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUM3RCxDQUFDO2dCQW5CSDtvQkFBQyxlQUFVLEVBQUU7K0JBSW1DLFdBQU0sQ0FBQywyQkFBTSxDQUFDOzs2QkFKakQ7Z0JBb0JiLGdCQUFDO1lBQUQsQ0FuQkEsQUFtQkMsSUFBQTtZQW5CRCxpQ0FtQkMsQ0FBQTtZQXdCSyxTQUFTLEdBQUcsaUJBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQWtCcEIsc0NBQUEsd0JBQXdCLEdBQUcsQ0FBQyxDQUFBLENBQUMiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvbGlua2VyL3ZpZXdfdXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBpc0JsYW5rLFxuICBpc1ByZXNlbnQsXG4gIFR5cGUsXG4gIHN0cmluZ2lmeSxcbiAgQ09OU1RfRVhQUixcbiAgbG9vc2VJZGVudGljYWxcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7TGlzdFdyYXBwZXIsIFN0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge0FwcEVsZW1lbnR9IGZyb20gJy4vZWxlbWVudCc7XG5pbXBvcnQge0V4cHJlc3Npb25DaGFuZ2VkQWZ0ZXJJdEhhc0JlZW5DaGVja2VkRXhjZXB0aW9ufSBmcm9tICcuL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtkZXZNb2RlRXF1YWwsIHVuaW5pdGlhbGl6ZWR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdGlvbic7XG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtSb290UmVuZGVyZXIsIFJlbmRlckNvbXBvbmVudFR5cGUsIFJlbmRlcmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9yZW5kZXIvYXBpJztcbmltcG9ydCB7QVBQX0lEfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9hcHBsaWNhdGlvbl90b2tlbnMnO1xuaW1wb3J0IHtWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbWV0YWRhdGEvdmlldyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBWaWV3VXRpbHMge1xuICBwcml2YXRlIF9uZXh0Q29tcFR5cGVJZDogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yZW5kZXJlcjogUm9vdFJlbmRlcmVyLCBASW5qZWN0KEFQUF9JRCkgcHJpdmF0ZSBfYXBwSWQ6IHN0cmluZykge31cblxuICAvKipcbiAgICogVXNlZCBieSB0aGUgZ2VuZXJhdGVkIGNvZGVcbiAgICovXG4gIGNyZWF0ZVJlbmRlckNvbXBvbmVudFR5cGUodGVtcGxhdGVVcmw6IHN0cmluZywgc2xvdENvdW50OiBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVzOiBBcnJheTxzdHJpbmcgfCBhbnlbXT4pOiBSZW5kZXJDb21wb25lbnRUeXBlIHtcbiAgICByZXR1cm4gbmV3IFJlbmRlckNvbXBvbmVudFR5cGUoYCR7dGhpcy5fYXBwSWR9LSR7dGhpcy5fbmV4dENvbXBUeXBlSWQrK31gLCB0ZW1wbGF0ZVVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdENvdW50LCBlbmNhcHN1bGF0aW9uLCBzdHlsZXMpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICByZW5kZXJDb21wb25lbnQocmVuZGVyQ29tcG9uZW50VHlwZTogUmVuZGVyQ29tcG9uZW50VHlwZSk6IFJlbmRlcmVyIHtcbiAgICByZXR1cm4gdGhpcy5fcmVuZGVyZXIucmVuZGVyQ29tcG9uZW50KHJlbmRlckNvbXBvbmVudFR5cGUpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuTmVzdGVkVmlld1JlbmRlck5vZGVzKG5vZGVzOiBhbnlbXSk6IGFueVtdIHtcbiAgcmV0dXJuIF9mbGF0dGVuTmVzdGVkVmlld1JlbmRlck5vZGVzKG5vZGVzLCBbXSk7XG59XG5cbmZ1bmN0aW9uIF9mbGF0dGVuTmVzdGVkVmlld1JlbmRlck5vZGVzKG5vZGVzOiBhbnlbXSwgcmVuZGVyTm9kZXM6IGFueVtdKTogYW55W10ge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIG5vZGUgPSBub2Rlc1tpXTtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEFwcEVsZW1lbnQpIHtcbiAgICAgIHZhciBhcHBFbCA9IDxBcHBFbGVtZW50Pm5vZGU7XG4gICAgICByZW5kZXJOb2Rlcy5wdXNoKGFwcEVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgaWYgKGlzUHJlc2VudChhcHBFbC5uZXN0ZWRWaWV3cykpIHtcbiAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBhcHBFbC5uZXN0ZWRWaWV3cy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgIF9mbGF0dGVuTmVzdGVkVmlld1JlbmRlck5vZGVzKGFwcEVsLm5lc3RlZFZpZXdzW2tdLnJvb3ROb2Rlc09yQXBwRWxlbWVudHMsIHJlbmRlck5vZGVzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZW5kZXJOb2Rlcy5wdXNoKG5vZGUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVuZGVyTm9kZXM7XG59XG5cbmNvbnN0IEVNUFRZX0FSUiA9IENPTlNUX0VYUFIoW10pO1xuXG5leHBvcnQgZnVuY3Rpb24gZW5zdXJlU2xvdENvdW50KHByb2plY3RhYmxlTm9kZXM6IGFueVtdW10sIGV4cGVjdGVkU2xvdENvdW50OiBudW1iZXIpOiBhbnlbXVtdIHtcbiAgdmFyIHJlcztcbiAgaWYgKGlzQmxhbmsocHJvamVjdGFibGVOb2RlcykpIHtcbiAgICByZXMgPSBFTVBUWV9BUlI7XG4gIH0gZWxzZSBpZiAocHJvamVjdGFibGVOb2Rlcy5sZW5ndGggPCBleHBlY3RlZFNsb3RDb3VudCkge1xuICAgIHZhciBnaXZlblNsb3RDb3VudCA9IHByb2plY3RhYmxlTm9kZXMubGVuZ3RoO1xuICAgIHJlcyA9IExpc3RXcmFwcGVyLmNyZWF0ZUZpeGVkU2l6ZShleHBlY3RlZFNsb3RDb3VudCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBlY3RlZFNsb3RDb3VudDsgaSsrKSB7XG4gICAgICByZXNbaV0gPSAoaSA8IGdpdmVuU2xvdENvdW50KSA/IHByb2plY3RhYmxlTm9kZXNbaV0gOiBFTVBUWV9BUlI7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJlcyA9IHByb2plY3RhYmxlTm9kZXM7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuZXhwb3J0IGNvbnN0IE1BWF9JTlRFUlBPTEFUSU9OX1ZBTFVFUyA9IDk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnRlcnBvbGF0ZSh2YWx1ZUNvdW50OiBudW1iZXIsIGMwOiBzdHJpbmcsIGExOiBhbnksIGMxOiBzdHJpbmcsIGEyPzogYW55LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMyPzogc3RyaW5nLCBhMz86IGFueSwgYzM/OiBzdHJpbmcsIGE0PzogYW55LCBjND86IHN0cmluZywgYTU/OiBhbnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYzU/OiBzdHJpbmcsIGE2PzogYW55LCBjNj86IHN0cmluZywgYTc/OiBhbnksIGM3Pzogc3RyaW5nLCBhOD86IGFueSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjOD86IHN0cmluZywgYTk/OiBhbnksIGM5Pzogc3RyaW5nKTogc3RyaW5nIHtcbiAgc3dpdGNoICh2YWx1ZUNvdW50KSB7XG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIGMwICsgX3RvU3RyaW5nV2l0aE51bGwoYTEpICsgYzE7XG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuIGMwICsgX3RvU3RyaW5nV2l0aE51bGwoYTEpICsgYzEgKyBfdG9TdHJpbmdXaXRoTnVsbChhMikgKyBjMjtcbiAgICBjYXNlIDM6XG4gICAgICByZXR1cm4gYzAgKyBfdG9TdHJpbmdXaXRoTnVsbChhMSkgKyBjMSArIF90b1N0cmluZ1dpdGhOdWxsKGEyKSArIGMyICsgX3RvU3RyaW5nV2l0aE51bGwoYTMpICtcbiAgICAgICAgICAgICBjMztcbiAgICBjYXNlIDQ6XG4gICAgICByZXR1cm4gYzAgKyBfdG9TdHJpbmdXaXRoTnVsbChhMSkgKyBjMSArIF90b1N0cmluZ1dpdGhOdWxsKGEyKSArIGMyICsgX3RvU3RyaW5nV2l0aE51bGwoYTMpICtcbiAgICAgICAgICAgICBjMyArIF90b1N0cmluZ1dpdGhOdWxsKGE0KSArIGM0O1xuICAgIGNhc2UgNTpcbiAgICAgIHJldHVybiBjMCArIF90b1N0cmluZ1dpdGhOdWxsKGExKSArIGMxICsgX3RvU3RyaW5nV2l0aE51bGwoYTIpICsgYzIgKyBfdG9TdHJpbmdXaXRoTnVsbChhMykgK1xuICAgICAgICAgICAgIGMzICsgX3RvU3RyaW5nV2l0aE51bGwoYTQpICsgYzQgKyBfdG9TdHJpbmdXaXRoTnVsbChhNSkgKyBjNTtcbiAgICBjYXNlIDY6XG4gICAgICByZXR1cm4gYzAgKyBfdG9TdHJpbmdXaXRoTnVsbChhMSkgKyBjMSArIF90b1N0cmluZ1dpdGhOdWxsKGEyKSArIGMyICsgX3RvU3RyaW5nV2l0aE51bGwoYTMpICtcbiAgICAgICAgICAgICBjMyArIF90b1N0cmluZ1dpdGhOdWxsKGE0KSArIGM0ICsgX3RvU3RyaW5nV2l0aE51bGwoYTUpICsgYzUgKyBfdG9TdHJpbmdXaXRoTnVsbChhNikgK1xuICAgICAgICAgICAgIGM2O1xuICAgIGNhc2UgNzpcbiAgICAgIHJldHVybiBjMCArIF90b1N0cmluZ1dpdGhOdWxsKGExKSArIGMxICsgX3RvU3RyaW5nV2l0aE51bGwoYTIpICsgYzIgKyBfdG9TdHJpbmdXaXRoTnVsbChhMykgK1xuICAgICAgICAgICAgIGMzICsgX3RvU3RyaW5nV2l0aE51bGwoYTQpICsgYzQgKyBfdG9TdHJpbmdXaXRoTnVsbChhNSkgKyBjNSArIF90b1N0cmluZ1dpdGhOdWxsKGE2KSArXG4gICAgICAgICAgICAgYzYgKyBfdG9TdHJpbmdXaXRoTnVsbChhNykgKyBjNztcbiAgICBjYXNlIDg6XG4gICAgICByZXR1cm4gYzAgKyBfdG9TdHJpbmdXaXRoTnVsbChhMSkgKyBjMSArIF90b1N0cmluZ1dpdGhOdWxsKGEyKSArIGMyICsgX3RvU3RyaW5nV2l0aE51bGwoYTMpICtcbiAgICAgICAgICAgICBjMyArIF90b1N0cmluZ1dpdGhOdWxsKGE0KSArIGM0ICsgX3RvU3RyaW5nV2l0aE51bGwoYTUpICsgYzUgKyBfdG9TdHJpbmdXaXRoTnVsbChhNikgK1xuICAgICAgICAgICAgIGM2ICsgX3RvU3RyaW5nV2l0aE51bGwoYTcpICsgYzcgKyBfdG9TdHJpbmdXaXRoTnVsbChhOCkgKyBjODtcbiAgICBjYXNlIDk6XG4gICAgICByZXR1cm4gYzAgKyBfdG9TdHJpbmdXaXRoTnVsbChhMSkgKyBjMSArIF90b1N0cmluZ1dpdGhOdWxsKGEyKSArIGMyICsgX3RvU3RyaW5nV2l0aE51bGwoYTMpICtcbiAgICAgICAgICAgICBjMyArIF90b1N0cmluZ1dpdGhOdWxsKGE0KSArIGM0ICsgX3RvU3RyaW5nV2l0aE51bGwoYTUpICsgYzUgKyBfdG9TdHJpbmdXaXRoTnVsbChhNikgK1xuICAgICAgICAgICAgIGM2ICsgX3RvU3RyaW5nV2l0aE51bGwoYTcpICsgYzcgKyBfdG9TdHJpbmdXaXRoTnVsbChhOCkgKyBjOCArIF90b1N0cmluZ1dpdGhOdWxsKGE5KSArXG4gICAgICAgICAgICAgYzk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBEb2VzIG5vdCBzdXBwb3J0IG1vcmUgdGhhbiA5IGV4cHJlc3Npb25zYCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX3RvU3RyaW5nV2l0aE51bGwodjogYW55KTogc3RyaW5nIHtcbiAgcmV0dXJuIHYgIT0gbnVsbCA/IHYudG9TdHJpbmcoKSA6ICcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tCaW5kaW5nKHRocm93T25DaGFuZ2U6IGJvb2xlYW4sIG9sZFZhbHVlOiBhbnksIG5ld1ZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgaWYgKHRocm93T25DaGFuZ2UpIHtcbiAgICBpZiAoIWRldk1vZGVFcXVhbChvbGRWYWx1ZSwgbmV3VmFsdWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXhwcmVzc2lvbkNoYW5nZWRBZnRlckl0SGFzQmVlbkNoZWNrZWRFeGNlcHRpb24ob2xkVmFsdWUsIG5ld1ZhbHVlLCBudWxsKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAhbG9vc2VJZGVudGljYWwob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlMb29zZUlkZW50aWNhbChhOiBhbnlbXSwgYjogYW55W10pOiBib29sZWFuIHtcbiAgaWYgKGEubGVuZ3RoICE9IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYS5sZW5ndGg7ICsraSkge1xuICAgIGlmICghbG9vc2VJZGVudGljYWwoYVtpXSwgYltpXSkpIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hcExvb3NlSWRlbnRpY2FsPFY+KG0xOiB7W2tleTogc3RyaW5nXTogVn0sIG0yOiB7W2tleTogc3RyaW5nXTogVn0pOiBib29sZWFuIHtcbiAgdmFyIGsxID0gU3RyaW5nTWFwV3JhcHBlci5rZXlzKG0xKTtcbiAgdmFyIGsyID0gU3RyaW5nTWFwV3JhcHBlci5rZXlzKG0yKTtcbiAgaWYgKGsxLmxlbmd0aCAhPSBrMi5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGtleTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrMS5sZW5ndGg7IGkrKykge1xuICAgIGtleSA9IGsxW2ldO1xuICAgIGlmICghbG9vc2VJZGVudGljYWwobTFba2V5XSwgbTJba2V5XSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYXN0QnlWYWx1ZTxUPihpbnB1dDogYW55LCB2YWx1ZTogVCk6IFQge1xuICByZXR1cm4gPFQ+aW5wdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwdXJlUHJveHkxPFAwLCBSPihmbjogKHAwOiBQMCkgPT4gUik6IChwMDogUDApID0+IFIge1xuICB2YXIgcmVzdWx0OiBSO1xuICB2YXIgdjA7XG4gIHYwID0gdW5pbml0aWFsaXplZDtcbiAgcmV0dXJuIChwMCkgPT4ge1xuICAgIGlmICghbG9vc2VJZGVudGljYWwodjAsIHAwKSkge1xuICAgICAgdjAgPSBwMDtcbiAgICAgIHJlc3VsdCA9IGZuKHAwKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHB1cmVQcm94eTI8UDAsIFAxLCBSPihmbjogKHAwOiBQMCwgcDE6IFAxKSA9PiBSKTogKHAwOiBQMCwgcDE6IFAxKSA9PiBSIHtcbiAgdmFyIHJlc3VsdDogUjtcbiAgdmFyIHYwLCB2MTtcbiAgdjAgPSB2MSA9IHVuaW5pdGlhbGl6ZWQ7XG4gIHJldHVybiAocDAsIHAxKSA9PiB7XG4gICAgaWYgKCFsb29zZUlkZW50aWNhbCh2MCwgcDApIHx8ICFsb29zZUlkZW50aWNhbCh2MSwgcDEpKSB7XG4gICAgICB2MCA9IHAwO1xuICAgICAgdjEgPSBwMTtcbiAgICAgIHJlc3VsdCA9IGZuKHAwLCBwMSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwdXJlUHJveHkzPFAwLCBQMSwgUDIsIFI+KGZuOiAocDA6IFAwLCBwMTogUDEsIHAyOiBQMikgPT4gUik6IChwMDogUDAsIHAxOiBQMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwMjogUDIpID0+IFIge1xuICB2YXIgcmVzdWx0OiBSO1xuICB2YXIgdjAsIHYxLCB2MjtcbiAgdjAgPSB2MSA9IHYyID0gdW5pbml0aWFsaXplZDtcbiAgcmV0dXJuIChwMCwgcDEsIHAyKSA9PiB7XG4gICAgaWYgKCFsb29zZUlkZW50aWNhbCh2MCwgcDApIHx8ICFsb29zZUlkZW50aWNhbCh2MSwgcDEpIHx8ICFsb29zZUlkZW50aWNhbCh2MiwgcDIpKSB7XG4gICAgICB2MCA9IHAwO1xuICAgICAgdjEgPSBwMTtcbiAgICAgIHYyID0gcDI7XG4gICAgICByZXN1bHQgPSBmbihwMCwgcDEsIHAyKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHB1cmVQcm94eTQ8UDAsIFAxLCBQMiwgUDMsIFI+KGZuOiAocDA6IFAwLCBwMTogUDEsIHAyOiBQMiwgcDM6IFAzKSA9PiBSKTogKFxuICAgIHAwOiBQMCwgcDE6IFAxLCBwMjogUDIsIHAzOiBQMykgPT4gUiB7XG4gIHZhciByZXN1bHQ6IFI7XG4gIHZhciB2MCwgdjEsIHYyLCB2MztcbiAgdjAgPSB2MSA9IHYyID0gdjMgPSB1bmluaXRpYWxpemVkO1xuICByZXR1cm4gKHAwLCBwMSwgcDIsIHAzKSA9PiB7XG4gICAgaWYgKCFsb29zZUlkZW50aWNhbCh2MCwgcDApIHx8ICFsb29zZUlkZW50aWNhbCh2MSwgcDEpIHx8ICFsb29zZUlkZW50aWNhbCh2MiwgcDIpIHx8XG4gICAgICAgICFsb29zZUlkZW50aWNhbCh2MywgcDMpKSB7XG4gICAgICB2MCA9IHAwO1xuICAgICAgdjEgPSBwMTtcbiAgICAgIHYyID0gcDI7XG4gICAgICB2MyA9IHAzO1xuICAgICAgcmVzdWx0ID0gZm4ocDAsIHAxLCBwMiwgcDMpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHVyZVByb3h5NTxQMCwgUDEsIFAyLCBQMywgUDQsIFI+KFxuICAgIGZuOiAocDA6IFAwLCBwMTogUDEsIHAyOiBQMiwgcDM6IFAzLCBwNDogUDQpID0+IFIpOiAocDA6IFAwLCBwMTogUDEsIHAyOiBQMiwgcDM6IFAzLCBwNDogUDQpID0+XG4gICAgUiB7XG4gIHZhciByZXN1bHQ6IFI7XG4gIHZhciB2MCwgdjEsIHYyLCB2MywgdjQ7XG4gIHYwID0gdjEgPSB2MiA9IHYzID0gdjQgPSB1bmluaXRpYWxpemVkO1xuICByZXR1cm4gKHAwLCBwMSwgcDIsIHAzLCBwNCkgPT4ge1xuICAgIGlmICghbG9vc2VJZGVudGljYWwodjAsIHAwKSB8fCAhbG9vc2VJZGVudGljYWwodjEsIHAxKSB8fCAhbG9vc2VJZGVudGljYWwodjIsIHAyKSB8fFxuICAgICAgICAhbG9vc2VJZGVudGljYWwodjMsIHAzKSB8fCAhbG9vc2VJZGVudGljYWwodjQsIHA0KSkge1xuICAgICAgdjAgPSBwMDtcbiAgICAgIHYxID0gcDE7XG4gICAgICB2MiA9IHAyO1xuICAgICAgdjMgPSBwMztcbiAgICAgIHY0ID0gcDQ7XG4gICAgICByZXN1bHQgPSBmbihwMCwgcDEsIHAyLCBwMywgcDQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBwdXJlUHJveHk2PFAwLCBQMSwgUDIsIFAzLCBQNCwgUDUsIFI+KFxuICAgIGZuOiAocDA6IFAwLCBwMTogUDEsIHAyOiBQMiwgcDM6IFAzLCBwNDogUDQsIHA1OiBQNSkgPT4gUik6IChwMDogUDAsIHAxOiBQMSwgcDI6IFAyLCBwMzogUDMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHA0OiBQNCwgcDU6IFA1KSA9PiBSIHtcbiAgdmFyIHJlc3VsdDogUjtcbiAgdmFyIHYwLCB2MSwgdjIsIHYzLCB2NCwgdjU7XG4gIHYwID0gdjEgPSB2MiA9IHYzID0gdjQgPSB2NSA9IHVuaW5pdGlhbGl6ZWQ7XG4gIHJldHVybiAocDAsIHAxLCBwMiwgcDMsIHA0LCBwNSkgPT4ge1xuICAgIGlmICghbG9vc2VJZGVudGljYWwodjAsIHAwKSB8fCAhbG9vc2VJZGVudGljYWwodjEsIHAxKSB8fCAhbG9vc2VJZGVudGljYWwodjIsIHAyKSB8fFxuICAgICAgICAhbG9vc2VJZGVudGljYWwodjMsIHAzKSB8fCAhbG9vc2VJZGVudGljYWwodjQsIHA0KSB8fCAhbG9vc2VJZGVudGljYWwodjUsIHA1KSkge1xuICAgICAgdjAgPSBwMDtcbiAgICAgIHYxID0gcDE7XG4gICAgICB2MiA9IHAyO1xuICAgICAgdjMgPSBwMztcbiAgICAgIHY0ID0gcDQ7XG4gICAgICB2NSA9IHA1O1xuICAgICAgcmVzdWx0ID0gZm4ocDAsIHAxLCBwMiwgcDMsIHA0LCBwNSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwdXJlUHJveHk3PFAwLCBQMSwgUDIsIFAzLCBQNCwgUDUsIFA2LCBSPihcbiAgICBmbjogKHAwOiBQMCwgcDE6IFAxLCBwMjogUDIsIHAzOiBQMywgcDQ6IFA0LCBwNTogUDUsIHA2OiBQNikgPT5cbiAgICAgICAgUik6IChwMDogUDAsIHAxOiBQMSwgcDI6IFAyLCBwMzogUDMsIHA0OiBQNCwgcDU6IFA1LCBwNjogUDYpID0+IFIge1xuICB2YXIgcmVzdWx0OiBSO1xuICB2YXIgdjAsIHYxLCB2MiwgdjMsIHY0LCB2NSwgdjY7XG4gIHYwID0gdjEgPSB2MiA9IHYzID0gdjQgPSB2NSA9IHY2ID0gdW5pbml0aWFsaXplZDtcbiAgcmV0dXJuIChwMCwgcDEsIHAyLCBwMywgcDQsIHA1LCBwNikgPT4ge1xuICAgIGlmICghbG9vc2VJZGVudGljYWwodjAsIHAwKSB8fCAhbG9vc2VJZGVudGljYWwodjEsIHAxKSB8fCAhbG9vc2VJZGVudGljYWwodjIsIHAyKSB8fFxuICAgICAgICAhbG9vc2VJZGVudGljYWwodjMsIHAzKSB8fCAhbG9vc2VJZGVudGljYWwodjQsIHA0KSB8fCAhbG9vc2VJZGVudGljYWwodjUsIHA1KSB8fFxuICAgICAgICAhbG9vc2VJZGVudGljYWwodjYsIHA2KSkge1xuICAgICAgdjAgPSBwMDtcbiAgICAgIHYxID0gcDE7XG4gICAgICB2MiA9IHAyO1xuICAgICAgdjMgPSBwMztcbiAgICAgIHY0ID0gcDQ7XG4gICAgICB2NSA9IHA1O1xuICAgICAgdjYgPSBwNjtcbiAgICAgIHJlc3VsdCA9IGZuKHAwLCBwMSwgcDIsIHAzLCBwNCwgcDUsIHA2KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHB1cmVQcm94eTg8UDAsIFAxLCBQMiwgUDMsIFA0LCBQNSwgUDYsIFA3LCBSPihcbiAgICBmbjogKHAwOiBQMCwgcDE6IFAxLCBwMjogUDIsIHAzOiBQMywgcDQ6IFA0LCBwNTogUDUsIHA2OiBQNiwgcDc6IFA3KSA9PlxuICAgICAgICBSKTogKHAwOiBQMCwgcDE6IFAxLCBwMjogUDIsIHAzOiBQMywgcDQ6IFA0LCBwNTogUDUsIHA2OiBQNiwgcDc6IFA3KSA9PiBSIHtcbiAgdmFyIHJlc3VsdDogUjtcbiAgdmFyIHYwLCB2MSwgdjIsIHYzLCB2NCwgdjUsIHY2LCB2NztcbiAgdjAgPSB2MSA9IHYyID0gdjMgPSB2NCA9IHY1ID0gdjYgPSB2NyA9IHVuaW5pdGlhbGl6ZWQ7XG4gIHJldHVybiAocDAsIHAxLCBwMiwgcDMsIHA0LCBwNSwgcDYsIHA3KSA9PiB7XG4gICAgaWYgKCFsb29zZUlkZW50aWNhbCh2MCwgcDApIHx8ICFsb29zZUlkZW50aWNhbCh2MSwgcDEpIHx8ICFsb29zZUlkZW50aWNhbCh2MiwgcDIpIHx8XG4gICAgICAgICFsb29zZUlkZW50aWNhbCh2MywgcDMpIHx8ICFsb29zZUlkZW50aWNhbCh2NCwgcDQpIHx8ICFsb29zZUlkZW50aWNhbCh2NSwgcDUpIHx8XG4gICAgICAgICFsb29zZUlkZW50aWNhbCh2NiwgcDYpIHx8ICFsb29zZUlkZW50aWNhbCh2NywgcDcpKSB7XG4gICAgICB2MCA9IHAwO1xuICAgICAgdjEgPSBwMTtcbiAgICAgIHYyID0gcDI7XG4gICAgICB2MyA9IHAzO1xuICAgICAgdjQgPSBwNDtcbiAgICAgIHY1ID0gcDU7XG4gICAgICB2NiA9IHA2O1xuICAgICAgdjcgPSBwNztcbiAgICAgIHJlc3VsdCA9IGZuKHAwLCBwMSwgcDIsIHAzLCBwNCwgcDUsIHA2LCBwNyk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwdXJlUHJveHk5PFAwLCBQMSwgUDIsIFAzLCBQNCwgUDUsIFA2LCBQNywgUDgsIFI+KFxuICAgIGZuOiAocDA6IFAwLCBwMTogUDEsIHAyOiBQMiwgcDM6IFAzLCBwNDogUDQsIHA1OiBQNSwgcDY6IFA2LCBwNzogUDcsIHA4OiBQOCkgPT5cbiAgICAgICAgUik6IChwMDogUDAsIHAxOiBQMSwgcDI6IFAyLCBwMzogUDMsIHA0OiBQNCwgcDU6IFA1LCBwNjogUDYsIHA3OiBQNywgcDg6IFA4KSA9PiBSIHtcbiAgdmFyIHJlc3VsdDogUjtcbiAgdmFyIHYwLCB2MSwgdjIsIHYzLCB2NCwgdjUsIHY2LCB2Nywgdjg7XG4gIHYwID0gdjEgPSB2MiA9IHYzID0gdjQgPSB2NSA9IHY2ID0gdjcgPSB2OCA9IHVuaW5pdGlhbGl6ZWQ7XG4gIHJldHVybiAocDAsIHAxLCBwMiwgcDMsIHA0LCBwNSwgcDYsIHA3LCBwOCkgPT4ge1xuICAgIGlmICghbG9vc2VJZGVudGljYWwodjAsIHAwKSB8fCAhbG9vc2VJZGVudGljYWwodjEsIHAxKSB8fCAhbG9vc2VJZGVudGljYWwodjIsIHAyKSB8fFxuICAgICAgICAhbG9vc2VJZGVudGljYWwodjMsIHAzKSB8fCAhbG9vc2VJZGVudGljYWwodjQsIHA0KSB8fCAhbG9vc2VJZGVudGljYWwodjUsIHA1KSB8fFxuICAgICAgICAhbG9vc2VJZGVudGljYWwodjYsIHA2KSB8fCAhbG9vc2VJZGVudGljYWwodjcsIHA3KSB8fCAhbG9vc2VJZGVudGljYWwodjgsIHA4KSkge1xuICAgICAgdjAgPSBwMDtcbiAgICAgIHYxID0gcDE7XG4gICAgICB2MiA9IHAyO1xuICAgICAgdjMgPSBwMztcbiAgICAgIHY0ID0gcDQ7XG4gICAgICB2NSA9IHA1O1xuICAgICAgdjYgPSBwNjtcbiAgICAgIHY3ID0gcDc7XG4gICAgICB2OCA9IHA4O1xuICAgICAgcmVzdWx0ID0gZm4ocDAsIHAxLCBwMiwgcDMsIHA0LCBwNSwgcDYsIHA3LCBwOCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwdXJlUHJveHkxMDxQMCwgUDEsIFAyLCBQMywgUDQsIFA1LCBQNiwgUDcsIFA4LCBQOSwgUj4oXG4gICAgZm46IChwMDogUDAsIHAxOiBQMSwgcDI6IFAyLCBwMzogUDMsIHA0OiBQNCwgcDU6IFA1LCBwNjogUDYsIHA3OiBQNywgcDg6IFA4LCBwOTogUDkpID0+XG4gICAgICAgIFIpOiAocDA6IFAwLCBwMTogUDEsIHAyOiBQMiwgcDM6IFAzLCBwNDogUDQsIHA1OiBQNSwgcDY6IFA2LCBwNzogUDcsIHA4OiBQOCwgcDk6IFA5KSA9PiBSIHtcbiAgdmFyIHJlc3VsdDogUjtcbiAgdmFyIHYwLCB2MSwgdjIsIHYzLCB2NCwgdjUsIHY2LCB2NywgdjgsIHY5O1xuICB2MCA9IHYxID0gdjIgPSB2MyA9IHY0ID0gdjUgPSB2NiA9IHY3ID0gdjggPSB2OSA9IHVuaW5pdGlhbGl6ZWQ7XG4gIHJldHVybiAocDAsIHAxLCBwMiwgcDMsIHA0LCBwNSwgcDYsIHA3LCBwOCwgcDkpID0+IHtcbiAgICBpZiAoIWxvb3NlSWRlbnRpY2FsKHYwLCBwMCkgfHwgIWxvb3NlSWRlbnRpY2FsKHYxLCBwMSkgfHwgIWxvb3NlSWRlbnRpY2FsKHYyLCBwMikgfHxcbiAgICAgICAgIWxvb3NlSWRlbnRpY2FsKHYzLCBwMykgfHwgIWxvb3NlSWRlbnRpY2FsKHY0LCBwNCkgfHwgIWxvb3NlSWRlbnRpY2FsKHY1LCBwNSkgfHxcbiAgICAgICAgIWxvb3NlSWRlbnRpY2FsKHY2LCBwNikgfHwgIWxvb3NlSWRlbnRpY2FsKHY3LCBwNykgfHwgIWxvb3NlSWRlbnRpY2FsKHY4LCBwOCkgfHxcbiAgICAgICAgIWxvb3NlSWRlbnRpY2FsKHY5LCBwOSkpIHtcbiAgICAgIHYwID0gcDA7XG4gICAgICB2MSA9IHAxO1xuICAgICAgdjIgPSBwMjtcbiAgICAgIHYzID0gcDM7XG4gICAgICB2NCA9IHA0O1xuICAgICAgdjUgPSBwNTtcbiAgICAgIHY2ID0gcDY7XG4gICAgICB2NyA9IHA3O1xuICAgICAgdjggPSBwODtcbiAgICAgIHY5ID0gcDk7XG4gICAgICByZXN1bHQgPSBmbihwMCwgcDEsIHAyLCBwMywgcDQsIHA1LCBwNiwgcDcsIHA4LCBwOSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
