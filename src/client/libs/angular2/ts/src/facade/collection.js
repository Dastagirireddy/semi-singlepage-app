System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1;
    var Map, Set, createMapFromPairs, createMapFromMap, _clearValues, _arrayFromMap, MapWrapper, StringMapWrapper, ListWrapper, createSetFromList, SetWrapper;
    function isListLikeIterable(obj) {
        if (!lang_1.isJsObject(obj))
            return false;
        return lang_1.isArray(obj) ||
            (!(obj instanceof Map) &&
                lang_1.getSymbolIterator() in obj); // JS Iterable have a Symbol.iterator prop
    }
    exports_1("isListLikeIterable", isListLikeIterable);
    function areIterablesEqual(a, b, comparator) {
        var iterator1 = a[lang_1.getSymbolIterator()]();
        var iterator2 = b[lang_1.getSymbolIterator()]();
        while (true) {
            var item1 = iterator1.next();
            var item2 = iterator2.next();
            if (item1.done && item2.done)
                return true;
            if (item1.done || item2.done)
                return false;
            if (!comparator(item1.value, item2.value))
                return false;
        }
    }
    exports_1("areIterablesEqual", areIterablesEqual);
    function iterateListLike(obj, fn) {
        if (lang_1.isArray(obj)) {
            for (var i = 0; i < obj.length; i++) {
                fn(obj[i]);
            }
        }
        else {
            var iterator = obj[lang_1.getSymbolIterator()]();
            var item;
            while (!((item = iterator.next()).done)) {
                fn(item.value);
            }
        }
    }
    exports_1("iterateListLike", iterateListLike);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            exports_1("Map", Map = lang_1.global.Map);
            exports_1("Set", Set = lang_1.global.Set);
            // Safari and Internet Explorer do not support the iterable parameter to the
            // Map constructor.  We work around that by manually adding the items.
            createMapFromPairs = (function () {
                try {
                    if (new Map([[1, 2]]).size === 1) {
                        return function createMapFromPairs(pairs) { return new Map(pairs); };
                    }
                }
                catch (e) {
                }
                return function createMapAndPopulateFromPairs(pairs) {
                    var map = new Map();
                    for (var i = 0; i < pairs.length; i++) {
                        var pair = pairs[i];
                        map.set(pair[0], pair[1]);
                    }
                    return map;
                };
            })();
            createMapFromMap = (function () {
                try {
                    if (new Map(new Map())) {
                        return function createMapFromMap(m) { return new Map(m); };
                    }
                }
                catch (e) {
                }
                return function createMapAndPopulateFromMap(m) {
                    var map = new Map();
                    m.forEach(function (v, k) { map.set(k, v); });
                    return map;
                };
            })();
            _clearValues = (function () {
                if ((new Map()).keys().next) {
                    return function _clearValues(m) {
                        var keyIterator = m.keys();
                        var k;
                        while (!((k = keyIterator.next()).done)) {
                            m.set(k.value, null);
                        }
                    };
                }
                else {
                    return function _clearValuesWithForeEach(m) {
                        m.forEach(function (v, k) { m.set(k, null); });
                    };
                }
            })();
            // Safari doesn't implement MapIterator.next(), which is used is Traceur's polyfill of Array.from
            // TODO(mlaval): remove the work around once we have a working polyfill of Array.from
            _arrayFromMap = (function () {
                try {
                    if ((new Map()).values().next) {
                        return function createArrayFromMap(m, getValues) {
                            return getValues ? Array.from(m.values()) : Array.from(m.keys());
                        };
                    }
                }
                catch (e) {
                }
                return function createArrayFromMapWithForeach(m, getValues) {
                    var res = ListWrapper.createFixedSize(m.size), i = 0;
                    m.forEach(function (v, k) {
                        res[i] = getValues ? v : k;
                        i++;
                    });
                    return res;
                };
            })();
            MapWrapper = (function () {
                function MapWrapper() {
                }
                MapWrapper.clone = function (m) { return createMapFromMap(m); };
                MapWrapper.createFromStringMap = function (stringMap) {
                    var result = new Map();
                    for (var prop in stringMap) {
                        result.set(prop, stringMap[prop]);
                    }
                    return result;
                };
                MapWrapper.toStringMap = function (m) {
                    var r = {};
                    m.forEach(function (v, k) { return r[k] = v; });
                    return r;
                };
                MapWrapper.createFromPairs = function (pairs) { return createMapFromPairs(pairs); };
                MapWrapper.clearValues = function (m) { _clearValues(m); };
                MapWrapper.iterable = function (m) { return m; };
                MapWrapper.keys = function (m) { return _arrayFromMap(m, false); };
                MapWrapper.values = function (m) { return _arrayFromMap(m, true); };
                return MapWrapper;
            }());
            exports_1("MapWrapper", MapWrapper);
            /**
             * Wraps Javascript Objects
             */
            StringMapWrapper = (function () {
                function StringMapWrapper() {
                }
                StringMapWrapper.create = function () {
                    // Note: We are not using Object.create(null) here due to
                    // performance!
                    // http://jsperf.com/ng2-object-create-null
                    return {};
                };
                StringMapWrapper.contains = function (map, key) {
                    return map.hasOwnProperty(key);
                };
                StringMapWrapper.get = function (map, key) {
                    return map.hasOwnProperty(key) ? map[key] : undefined;
                };
                StringMapWrapper.set = function (map, key, value) { map[key] = value; };
                StringMapWrapper.keys = function (map) { return Object.keys(map); };
                StringMapWrapper.values = function (map) {
                    return Object.keys(map).reduce(function (r, a) {
                        r.push(map[a]);
                        return r;
                    }, []);
                };
                StringMapWrapper.isEmpty = function (map) {
                    for (var prop in map) {
                        return false;
                    }
                    return true;
                };
                StringMapWrapper.delete = function (map, key) { delete map[key]; };
                StringMapWrapper.forEach = function (map, callback) {
                    for (var prop in map) {
                        if (map.hasOwnProperty(prop)) {
                            callback(map[prop], prop);
                        }
                    }
                };
                StringMapWrapper.merge = function (m1, m2) {
                    var m = {};
                    for (var attr in m1) {
                        if (m1.hasOwnProperty(attr)) {
                            m[attr] = m1[attr];
                        }
                    }
                    for (var attr in m2) {
                        if (m2.hasOwnProperty(attr)) {
                            m[attr] = m2[attr];
                        }
                    }
                    return m;
                };
                StringMapWrapper.equals = function (m1, m2) {
                    var k1 = Object.keys(m1);
                    var k2 = Object.keys(m2);
                    if (k1.length != k2.length) {
                        return false;
                    }
                    var key;
                    for (var i = 0; i < k1.length; i++) {
                        key = k1[i];
                        if (m1[key] !== m2[key]) {
                            return false;
                        }
                    }
                    return true;
                };
                return StringMapWrapper;
            }());
            exports_1("StringMapWrapper", StringMapWrapper);
            ListWrapper = (function () {
                function ListWrapper() {
                }
                // JS has no way to express a statically fixed size list, but dart does so we
                // keep both methods.
                ListWrapper.createFixedSize = function (size) { return new Array(size); };
                ListWrapper.createGrowableSize = function (size) { return new Array(size); };
                ListWrapper.clone = function (array) { return array.slice(0); };
                ListWrapper.createImmutable = function (array) {
                    var result = ListWrapper.clone(array);
                    Object.seal(result);
                    return result;
                };
                ListWrapper.forEachWithIndex = function (array, fn) {
                    for (var i = 0; i < array.length; i++) {
                        fn(array[i], i);
                    }
                };
                ListWrapper.first = function (array) {
                    if (!array)
                        return null;
                    return array[0];
                };
                ListWrapper.last = function (array) {
                    if (!array || array.length == 0)
                        return null;
                    return array[array.length - 1];
                };
                ListWrapper.indexOf = function (array, value, startIndex) {
                    if (startIndex === void 0) { startIndex = 0; }
                    return array.indexOf(value, startIndex);
                };
                ListWrapper.contains = function (list, el) { return list.indexOf(el) !== -1; };
                ListWrapper.reversed = function (array) {
                    var a = ListWrapper.clone(array);
                    return a.reverse();
                };
                ListWrapper.concat = function (a, b) { return a.concat(b); };
                ListWrapper.insert = function (list, index, value) { list.splice(index, 0, value); };
                ListWrapper.removeAt = function (list, index) {
                    var res = list[index];
                    list.splice(index, 1);
                    return res;
                };
                ListWrapper.removeAll = function (list, items) {
                    for (var i = 0; i < items.length; ++i) {
                        var index = list.indexOf(items[i]);
                        list.splice(index, 1);
                    }
                };
                ListWrapper.remove = function (list, el) {
                    var index = list.indexOf(el);
                    if (index > -1) {
                        list.splice(index, 1);
                        return true;
                    }
                    return false;
                };
                ListWrapper.clear = function (list) { list.length = 0; };
                ListWrapper.isEmpty = function (list) { return list.length == 0; };
                ListWrapper.fill = function (list, value, start, end) {
                    if (start === void 0) { start = 0; }
                    if (end === void 0) { end = null; }
                    list.fill(value, start, end === null ? list.length : end);
                };
                ListWrapper.equals = function (a, b) {
                    if (a.length != b.length)
                        return false;
                    for (var i = 0; i < a.length; ++i) {
                        if (a[i] !== b[i])
                            return false;
                    }
                    return true;
                };
                ListWrapper.slice = function (l, from, to) {
                    if (from === void 0) { from = 0; }
                    if (to === void 0) { to = null; }
                    return l.slice(from, to === null ? undefined : to);
                };
                ListWrapper.splice = function (l, from, length) { return l.splice(from, length); };
                ListWrapper.sort = function (l, compareFn) {
                    if (lang_1.isPresent(compareFn)) {
                        l.sort(compareFn);
                    }
                    else {
                        l.sort();
                    }
                };
                ListWrapper.toString = function (l) { return l.toString(); };
                ListWrapper.toJSON = function (l) { return JSON.stringify(l); };
                ListWrapper.maximum = function (list, predicate) {
                    if (list.length == 0) {
                        return null;
                    }
                    var solution = null;
                    var maxValue = -Infinity;
                    for (var index = 0; index < list.length; index++) {
                        var candidate = list[index];
                        if (lang_1.isBlank(candidate)) {
                            continue;
                        }
                        var candidateValue = predicate(candidate);
                        if (candidateValue > maxValue) {
                            solution = candidate;
                            maxValue = candidateValue;
                        }
                    }
                    return solution;
                };
                ListWrapper.isImmutable = function (list) { return Object.isSealed(list); };
                ListWrapper.flatten = function (array) {
                    var res = [];
                    array.forEach(function (a) { return res = res.concat(a); });
                    return res;
                };
                return ListWrapper;
            }());
            exports_1("ListWrapper", ListWrapper);
            // Safari and Internet Explorer do not support the iterable parameter to the
            // Set constructor.  We work around that by manually adding the items.
            createSetFromList = (function () {
                var test = new Set([1, 2, 3]);
                if (test.size === 3) {
                    return function createSetFromList(lst) { return new Set(lst); };
                }
                else {
                    return function createSetAndPopulateFromList(lst) {
                        var res = new Set(lst);
                        if (res.size !== lst.length) {
                            for (var i = 0; i < lst.length; i++) {
                                res.add(lst[i]);
                            }
                        }
                        return res;
                    };
                }
            })();
            SetWrapper = (function () {
                function SetWrapper() {
                }
                SetWrapper.createFromList = function (lst) { return createSetFromList(lst); };
                SetWrapper.has = function (s, key) { return s.has(key); };
                SetWrapper.delete = function (m, k) { m.delete(k); };
                return SetWrapper;
            }());
            exports_1("SetWrapper", SetWrapper);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFTVyxHQUFHLEVBQ0gsR0FBRyxFQUlWLGtCQUFrQixFQWdCbEIsZ0JBQWdCLEVBYWhCLFlBQVksRUFpQlosYUFBYSw2Q0F1UWIsaUJBQWlCO0lBcENyQiw0QkFBbUMsR0FBUTtRQUN6QyxFQUFFLENBQUMsQ0FBQyxDQUFDLGlCQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxjQUFPLENBQUMsR0FBRyxDQUFDO1lBQ1osQ0FBQyxDQUFDLENBQUMsR0FBRyxZQUFZLEdBQUcsQ0FBQztnQkFDckIsd0JBQWlCLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFFLDBDQUEwQztJQUNsRixDQUFDO0lBTEQsbURBS0MsQ0FBQTtJQUVELDJCQUFrQyxDQUFNLEVBQUUsQ0FBTSxFQUFFLFVBQW9CO1FBQ3BFLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyx3QkFBaUIsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUN6QyxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsd0JBQWlCLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFFekMsT0FBTyxJQUFJLEVBQUUsQ0FBQztZQUNaLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM3QixJQUFJLEtBQUssR0FBRyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDN0IsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDMUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDM0MsRUFBRSxD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Z0JBQ3pELGlCQUFNLEdBQWIsVUFBaUIsQ0FBUyxFQUFFLENBQUksSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEQsaUJBQUM7WUFBRCxDQUpBLEFBSUMsSUFBQTtZQUpELG1DQUlDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvZmFjYWRlL2NvbGxlY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBpc0pzT2JqZWN0LFxuICBnbG9iYWwsXG4gIGlzUHJlc2VudCxcbiAgaXNCbGFuayxcbiAgaXNBcnJheSxcbiAgZ2V0U3ltYm9sSXRlcmF0b3Jcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuZXhwb3J0IHZhciBNYXAgPSBnbG9iYWwuTWFwO1xuZXhwb3J0IHZhciBTZXQgPSBnbG9iYWwuU2V0O1xuXG4vLyBTYWZhcmkgYW5kIEludGVybmV0IEV4cGxvcmVyIGRvIG5vdCBzdXBwb3J0IHRoZSBpdGVyYWJsZSBwYXJhbWV0ZXIgdG8gdGhlXG4vLyBNYXAgY29uc3RydWN0b3IuICBXZSB3b3JrIGFyb3VuZCB0aGF0IGJ5IG1hbnVhbGx5IGFkZGluZyB0aGUgaXRlbXMuXG52YXIgY3JlYXRlTWFwRnJvbVBhaXJzOiB7KHBhaXJzOiBhbnlbXSk6IE1hcDxhbnksIGFueT59ID0gKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIGlmIChuZXcgTWFwKDxhbnk+W1sxLCAyXV0pLnNpemUgPT09IDEpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBjcmVhdGVNYXBGcm9tUGFpcnMocGFpcnM6IGFueVtdKTogTWFwPGFueSwgYW55PiB7IHJldHVybiBuZXcgTWFwKHBhaXJzKTsgfTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlTWFwQW5kUG9wdWxhdGVGcm9tUGFpcnMocGFpcnM6IGFueVtdKTogTWFwPGFueSwgYW55PiB7XG4gICAgdmFyIG1hcCA9IG5ldyBNYXAoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcGFpciA9IHBhaXJzW2ldO1xuICAgICAgbWFwLnNldChwYWlyWzBdLCBwYWlyWzFdKTtcbiAgICB9XG4gICAgcmV0dXJuIG1hcDtcbiAgfTtcbn0pKCk7XG52YXIgY3JlYXRlTWFwRnJvbU1hcDogeyhtOiBNYXA8YW55LCBhbnk+KTogTWFwPGFueSwgYW55Pn0gPSAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgaWYgKG5ldyBNYXAoPGFueT5uZXcgTWFwKCkpKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlTWFwRnJvbU1hcChtOiBNYXA8YW55LCBhbnk+KTogTWFwPGFueSwgYW55PiB7IHJldHVybiBuZXcgTWFwKDxhbnk+bSk7IH07XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uIGNyZWF0ZU1hcEFuZFBvcHVsYXRlRnJvbU1hcChtOiBNYXA8YW55LCBhbnk+KTogTWFwPGFueSwgYW55PiB7XG4gICAgdmFyIG1hcCA9IG5ldyBNYXAoKTtcbiAgICBtLmZvckVhY2goKHYsIGspID0+IHsgbWFwLnNldChrLCB2KTsgfSk7XG4gICAgcmV0dXJuIG1hcDtcbiAgfTtcbn0pKCk7XG52YXIgX2NsZWFyVmFsdWVzOiB7KG06IE1hcDxhbnksIGFueT4pfSA9IChmdW5jdGlvbigpIHtcbiAgaWYgKCg8YW55PihuZXcgTWFwKCkpLmtleXMoKSkubmV4dCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBfY2xlYXJWYWx1ZXMobTogTWFwPGFueSwgYW55Pikge1xuICAgICAgdmFyIGtleUl0ZXJhdG9yID0gbS5rZXlzKCk7XG4gICAgICB2YXIgaztcbiAgICAgIHdoaWxlICghKChrID0gKDxhbnk+a2V5SXRlcmF0b3IpLm5leHQoKSkuZG9uZSkpIHtcbiAgICAgICAgbS5zZXQoay52YWx1ZSwgbnVsbCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gX2NsZWFyVmFsdWVzV2l0aEZvcmVFYWNoKG06IE1hcDxhbnksIGFueT4pIHtcbiAgICAgIG0uZm9yRWFjaCgodiwgaykgPT4geyBtLnNldChrLCBudWxsKTsgfSk7XG4gICAgfTtcbiAgfVxufSkoKTtcbi8vIFNhZmFyaSBkb2Vzbid0IGltcGxlbWVudCBNYXBJdGVyYXRvci5uZXh0KCksIHdoaWNoIGlzIHVzZWQgaXMgVHJhY2V1cidzIHBvbHlmaWxsIG9mIEFycmF5LmZyb21cbi8vIFRPRE8obWxhdmFsKTogcmVtb3ZlIHRoZSB3b3JrIGFyb3VuZCBvbmNlIHdlIGhhdmUgYSB3b3JraW5nIHBvbHlmaWxsIG9mIEFycmF5LmZyb21cbnZhciBfYXJyYXlGcm9tTWFwOiB7KG06IE1hcDxhbnksIGFueT4sIGdldFZhbHVlczogYm9vbGVhbik6IGFueVtdfSA9IChmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICBpZiAoKDxhbnk+KG5ldyBNYXAoKSkudmFsdWVzKCkpLm5leHQpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBjcmVhdGVBcnJheUZyb21NYXAobTogTWFwPGFueSwgYW55PiwgZ2V0VmFsdWVzOiBib29sZWFuKTogYW55W10ge1xuICAgICAgICByZXR1cm4gZ2V0VmFsdWVzID8gKDxhbnk+QXJyYXkpLmZyb20obS52YWx1ZXMoKSkgOiAoPGFueT5BcnJheSkuZnJvbShtLmtleXMoKSk7XG4gICAgICB9O1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiBjcmVhdGVBcnJheUZyb21NYXBXaXRoRm9yZWFjaChtOiBNYXA8YW55LCBhbnk+LCBnZXRWYWx1ZXM6IGJvb2xlYW4pOiBhbnlbXSB7XG4gICAgdmFyIHJlcyA9IExpc3RXcmFwcGVyLmNyZWF0ZUZpeGVkU2l6ZShtLnNpemUpLCBpID0gMDtcbiAgICBtLmZvckVhY2goKHYsIGspID0+IHtcbiAgICAgIHJlc1tpXSA9IGdldFZhbHVlcyA/IHYgOiBrO1xuICAgICAgaSsrO1xuICAgIH0pO1xuICAgIHJldHVybiByZXM7XG4gIH07XG59KSgpO1xuXG5leHBvcnQgY2xhc3MgTWFwV3JhcHBlciB7XG4gIHN0YXRpYyBjbG9uZTxLLCBWPihtOiBNYXA8SywgVj4pOiBNYXA8SywgVj4geyByZXR1cm4gY3JlYXRlTWFwRnJvbU1hcChtKTsgfVxuICBzdGF0aWMgY3JlYXRlRnJvbVN0cmluZ01hcDxUPihzdHJpbmdNYXA6IHtba2V5OiBzdHJpbmddOiBUfSk6IE1hcDxzdHJpbmcsIFQ+IHtcbiAgICB2YXIgcmVzdWx0ID0gbmV3IE1hcDxzdHJpbmcsIFQ+KCk7XG4gICAgZm9yICh2YXIgcHJvcCBpbiBzdHJpbmdNYXApIHtcbiAgICAgIHJlc3VsdC5zZXQocHJvcCwgc3RyaW5nTWFwW3Byb3BdKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBzdGF0aWMgdG9TdHJpbmdNYXA8VD4obTogTWFwPHN0cmluZywgVD4pOiB7W2tleTogc3RyaW5nXTogVH0ge1xuICAgIHZhciByOiB7W2tleTogc3RyaW5nXTogVH0gPSB7fTtcbiAgICBtLmZvckVhY2goKHYsIGspID0+IHJba10gPSB2KTtcbiAgICByZXR1cm4gcjtcbiAgfVxuICBzdGF0aWMgY3JlYXRlRnJvbVBhaXJzKHBhaXJzOiBhbnlbXSk6IE1hcDxhbnksIGFueT4geyByZXR1cm4gY3JlYXRlTWFwRnJvbVBhaXJzKHBhaXJzKTsgfVxuICBzdGF0aWMgY2xlYXJWYWx1ZXMobTogTWFwPGFueSwgYW55PikgeyBfY2xlYXJWYWx1ZXMobSk7IH1cbiAgc3RhdGljIGl0ZXJhYmxlPFQ+KG06IFQpOiBUIHsgcmV0dXJuIG07IH1cbiAgc3RhdGljIGtleXM8Sz4obTogTWFwPEssIGFueT4pOiBLW10geyByZXR1cm4gX2FycmF5RnJvbU1hcChtLCBmYWxzZSk7IH1cbiAgc3RhdGljIHZhbHVlczxWPihtOiBNYXA8YW55LCBWPik6IFZbXSB7IHJldHVybiBfYXJyYXlGcm9tTWFwKG0sIHRydWUpOyB9XG59XG5cbi8qKlxuICogV3JhcHMgSmF2YXNjcmlwdCBPYmplY3RzXG4gKi9cbmV4cG9ydCBjbGFzcyBTdHJpbmdNYXBXcmFwcGVyIHtcbiAgc3RhdGljIGNyZWF0ZSgpOiB7W2s6IC8qYW55Ki8gc3RyaW5nXTogYW55fSB7XG4gICAgLy8gTm90ZTogV2UgYXJlIG5vdCB1c2luZyBPYmplY3QuY3JlYXRlKG51bGwpIGhlcmUgZHVlIHRvXG4gICAgLy8gcGVyZm9ybWFuY2UhXG4gICAgLy8gaHR0cDovL2pzcGVyZi5jb20vbmcyLW9iamVjdC1jcmVhdGUtbnVsbFxuICAgIHJldHVybiB7fTtcbiAgfVxuICBzdGF0aWMgY29udGFpbnMobWFwOiB7W2tleTogc3RyaW5nXTogYW55fSwga2V5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbWFwLmhhc093blByb3BlcnR5KGtleSk7XG4gIH1cbiAgc3RhdGljIGdldDxWPihtYXA6IHtba2V5OiBzdHJpbmddOiBWfSwga2V5OiBzdHJpbmcpOiBWIHtcbiAgICByZXR1cm4gbWFwLmhhc093blByb3BlcnR5KGtleSkgPyBtYXBba2V5XSA6IHVuZGVmaW5lZDtcbiAgfVxuICBzdGF0aWMgc2V0PFY+KG1hcDoge1trZXk6IHN0cmluZ106IFZ9LCBrZXk6IHN0cmluZywgdmFsdWU6IFYpIHsgbWFwW2tleV0gPSB2YWx1ZTsgfVxuICBzdGF0aWMga2V5cyhtYXA6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogc3RyaW5nW10geyByZXR1cm4gT2JqZWN0LmtleXMobWFwKTsgfVxuICBzdGF0aWMgdmFsdWVzPFQ+KG1hcDoge1trZXk6IHN0cmluZ106IFR9KTogVFtdIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMobWFwKS5yZWR1Y2UoKHIsIGEpID0+IHtcbiAgICAgIHIucHVzaChtYXBbYV0pO1xuICAgICAgcmV0dXJuIHI7XG4gICAgfSwgW10pO1xuICB9XG4gIHN0YXRpYyBpc0VtcHR5KG1hcDoge1trZXk6IHN0cmluZ106IGFueX0pOiBib29sZWFuIHtcbiAgICBmb3IgKHZhciBwcm9wIGluIG1hcCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBzdGF0aWMgZGVsZXRlIChtYXA6IHtba2V5OiBzdHJpbmddOiBhbnl9LCBrZXk6IHN0cmluZykgeyBkZWxldGUgbWFwW2tleV07IH1cbiAgc3RhdGljIGZvckVhY2g8SywgVj4obWFwOiB7W2tleTogc3RyaW5nXTogVn0sIGNhbGxiYWNrOiAvKihWLCBLKSA9PiB2b2lkKi8gRnVuY3Rpb24pIHtcbiAgICBmb3IgKHZhciBwcm9wIGluIG1hcCkge1xuICAgICAgaWYgKG1hcC5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICBjYWxsYmFjayhtYXBbcHJvcF0sIHByb3ApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBtZXJnZTxWPihtMToge1trZXk6IHN0cmluZ106IFZ9LCBtMjoge1trZXk6IHN0cmluZ106IFZ9KToge1trZXk6IHN0cmluZ106IFZ9IHtcbiAgICB2YXIgbToge1trZXk6IHN0cmluZ106IFZ9ID0ge307XG5cbiAgICBmb3IgKHZhciBhdHRyIGluIG0xKSB7XG4gICAgICBpZiAobTEuaGFzT3duUHJvcGVydHkoYXR0cikpIHtcbiAgICAgICAgbVthdHRyXSA9IG0xW2F0dHJdO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIGF0dHIgaW4gbTIpIHtcbiAgICAgIGlmIChtMi5oYXNPd25Qcm9wZXJ0eShhdHRyKSkge1xuICAgICAgICBtW2F0dHJdID0gbTJbYXR0cl07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG07XG4gIH1cblxuICBzdGF0aWMgZXF1YWxzPFY+KG0xOiB7W2tleTogc3RyaW5nXTogVn0sIG0yOiB7W2tleTogc3RyaW5nXTogVn0pOiBib29sZWFuIHtcbiAgICB2YXIgazEgPSBPYmplY3Qua2V5cyhtMSk7XG4gICAgdmFyIGsyID0gT2JqZWN0LmtleXMobTIpO1xuICAgIGlmIChrMS5sZW5ndGggIT0gazIubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBrZXk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrMS5sZW5ndGg7IGkrKykge1xuICAgICAga2V5ID0gazFbaV07XG4gICAgICBpZiAobTFba2V5XSAhPT0gbTJba2V5XSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbi8qKlxuICogQSBib29sZWFuLXZhbHVlZCBmdW5jdGlvbiBvdmVyIGEgdmFsdWUsIHBvc3NpYmx5IGluY2x1ZGluZyBjb250ZXh0IGluZm9ybWF0aW9uXG4gKiByZWdhcmRpbmcgdGhhdCB2YWx1ZSdzIHBvc2l0aW9uIGluIGFuIGFycmF5LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFByZWRpY2F0ZTxUPiB7ICh2YWx1ZTogVCwgaW5kZXg/OiBudW1iZXIsIGFycmF5PzogVFtdKTogYm9vbGVhbjsgfVxuXG5leHBvcnQgY2xhc3MgTGlzdFdyYXBwZXIge1xuICAvLyBKUyBoYXMgbm8gd2F5IHRvIGV4cHJlc3MgYSBzdGF0aWNhbGx5IGZpeGVkIHNpemUgbGlzdCwgYnV0IGRhcnQgZG9lcyBzbyB3ZVxuICAvLyBrZWVwIGJvdGggbWV0aG9kcy5cbiAgc3RhdGljIGNyZWF0ZUZpeGVkU2l6ZShzaXplOiBudW1iZXIpOiBhbnlbXSB7IHJldHVybiBuZXcgQXJyYXkoc2l6ZSk7IH1cbiAgc3RhdGljIGNyZWF0ZUdyb3dhYmxlU2l6ZShzaXplOiBudW1iZXIpOiBhbnlbXSB7IHJldHVybiBuZXcgQXJyYXkoc2l6ZSk7IH1cbiAgc3RhdGljIGNsb25lPFQ+KGFycmF5OiBUW10pOiBUW10geyByZXR1cm4gYXJyYXkuc2xpY2UoMCk7IH1cbiAgc3RhdGljIGNyZWF0ZUltbXV0YWJsZTxUPihhcnJheTogVFtdKTogVFtdIHtcbiAgICB2YXIgcmVzdWx0ID0gTGlzdFdyYXBwZXIuY2xvbmUoYXJyYXkpO1xuICAgIE9iamVjdC5zZWFsKHJlc3VsdCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBzdGF0aWMgZm9yRWFjaFdpdGhJbmRleDxUPihhcnJheTogVFtdLCBmbjogKHQ6IFQsIG46IG51bWJlcikgPT4gdm9pZCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZuKGFycmF5W2ldLCBpKTtcbiAgICB9XG4gIH1cbiAgc3RhdGljIGZpcnN0PFQ+KGFycmF5OiBUW10pOiBUIHtcbiAgICBpZiAoIWFycmF5KSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gYXJyYXlbMF07XG4gIH1cbiAgc3RhdGljIGxhc3Q8VD4oYXJyYXk6IFRbXSk6IFQge1xuICAgIGlmICghYXJyYXkgfHwgYXJyYXkubGVuZ3RoID09IDApIHJldHVybiBudWxsO1xuICAgIHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcbiAgfVxuICBzdGF0aWMgaW5kZXhPZjxUPihhcnJheTogVFtdLCB2YWx1ZTogVCwgc3RhcnRJbmRleDogbnVtYmVyID0gMCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGFycmF5LmluZGV4T2YodmFsdWUsIHN0YXJ0SW5kZXgpO1xuICB9XG4gIHN0YXRpYyBjb250YWluczxUPihsaXN0OiBUW10sIGVsOiBUKTogYm9vbGVhbiB7IHJldHVybiBsaXN0LmluZGV4T2YoZWwpICE9PSAtMTsgfVxuICBzdGF0aWMgcmV2ZXJzZWQ8VD4oYXJyYXk6IFRbXSk6IFRbXSB7XG4gICAgdmFyIGEgPSBMaXN0V3JhcHBlci5jbG9uZShhcnJheSk7XG4gICAgcmV0dXJuIGEucmV2ZXJzZSgpO1xuICB9XG4gIHN0YXRpYyBjb25jYXQoYTogYW55W10sIGI6IGFueVtdKTogYW55W10geyByZXR1cm4gYS5jb25jYXQoYik7IH1cbiAgc3RhdGljIGluc2VydDxUPihsaXN0OiBUW10sIGluZGV4OiBudW1iZXIsIHZhbHVlOiBUKSB7IGxpc3Quc3BsaWNlKGluZGV4LCAwLCB2YWx1ZSk7IH1cbiAgc3RhdGljIHJlbW92ZUF0PFQ+KGxpc3Q6IFRbXSwgaW5kZXg6IG51bWJlcik6IFQge1xuICAgIHZhciByZXMgPSBsaXN0W2luZGV4XTtcbiAgICBsaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuICBzdGF0aWMgcmVtb3ZlQWxsPFQ+KGxpc3Q6IFRbXSwgaXRlbXM6IFRbXSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBpbmRleCA9IGxpc3QuaW5kZXhPZihpdGVtc1tpXSk7XG4gICAgICBsaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG4gIHN0YXRpYyByZW1vdmU8VD4obGlzdDogVFtdLCBlbDogVCk6IGJvb2xlYW4ge1xuICAgIHZhciBpbmRleCA9IGxpc3QuaW5kZXhPZihlbCk7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIGxpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3RhdGljIGNsZWFyKGxpc3Q6IGFueVtdKSB7IGxpc3QubGVuZ3RoID0gMDsgfVxuICBzdGF0aWMgaXNFbXB0eShsaXN0OiBhbnlbXSk6IGJvb2xlYW4geyByZXR1cm4gbGlzdC5sZW5ndGggPT0gMDsgfVxuICBzdGF0aWMgZmlsbChsaXN0OiBhbnlbXSwgdmFsdWU6IGFueSwgc3RhcnQ6IG51bWJlciA9IDAsIGVuZDogbnVtYmVyID0gbnVsbCkge1xuICAgIGxpc3QuZmlsbCh2YWx1ZSwgc3RhcnQsIGVuZCA9PT0gbnVsbCA/IGxpc3QubGVuZ3RoIDogZW5kKTtcbiAgfVxuICBzdGF0aWMgZXF1YWxzKGE6IGFueVtdLCBiOiBhbnlbXSk6IGJvb2xlYW4ge1xuICAgIGlmIChhLmxlbmd0aCAhPSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYS5sZW5ndGg7ICsraSkge1xuICAgICAgaWYgKGFbaV0gIT09IGJbaV0pIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgc3RhdGljIHNsaWNlPFQ+KGw6IFRbXSwgZnJvbTogbnVtYmVyID0gMCwgdG86IG51bWJlciA9IG51bGwpOiBUW10ge1xuICAgIHJldHVybiBsLnNsaWNlKGZyb20sIHRvID09PSBudWxsID8gdW5kZWZpbmVkIDogdG8pO1xuICB9XG4gIHN0YXRpYyBzcGxpY2U8VD4obDogVFtdLCBmcm9tOiBudW1iZXIsIGxlbmd0aDogbnVtYmVyKTogVFtdIHsgcmV0dXJuIGwuc3BsaWNlKGZyb20sIGxlbmd0aCk7IH1cbiAgc3RhdGljIHNvcnQ8VD4obDogVFtdLCBjb21wYXJlRm4/OiAoYTogVCwgYjogVCkgPT4gbnVtYmVyKSB7XG4gICAgaWYgKGlzUHJlc2VudChjb21wYXJlRm4pKSB7XG4gICAgICBsLnNvcnQoY29tcGFyZUZuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbC5zb3J0KCk7XG4gICAgfVxuICB9XG4gIHN0YXRpYyB0b1N0cmluZzxUPihsOiBUW10pOiBzdHJpbmcgeyByZXR1cm4gbC50b1N0cmluZygpOyB9XG4gIHN0YXRpYyB0b0pTT048VD4obDogVFtdKTogc3RyaW5nIHsgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGwpOyB9XG5cbiAgc3RhdGljIG1heGltdW08VD4obGlzdDogVFtdLCBwcmVkaWNhdGU6ICh0OiBUKSA9PiBudW1iZXIpOiBUIHtcbiAgICBpZiAobGlzdC5sZW5ndGggPT0gMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciBzb2x1dGlvbiA9IG51bGw7XG4gICAgdmFyIG1heFZhbHVlID0gLUluZmluaXR5O1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsaXN0Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdmFyIGNhbmRpZGF0ZSA9IGxpc3RbaW5kZXhdO1xuICAgICAgaWYgKGlzQmxhbmsoY2FuZGlkYXRlKSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHZhciBjYW5kaWRhdGVWYWx1ZSA9IHByZWRpY2F0ZShjYW5kaWRhdGUpO1xuICAgICAgaWYgKGNhbmRpZGF0ZVZhbHVlID4gbWF4VmFsdWUpIHtcbiAgICAgICAgc29sdXRpb24gPSBjYW5kaWRhdGU7XG4gICAgICAgIG1heFZhbHVlID0gY2FuZGlkYXRlVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzb2x1dGlvbjtcbiAgfVxuXG4gIHN0YXRpYyBpc0ltbXV0YWJsZShsaXN0OiBhbnlbXSk6IGJvb2xlYW4geyByZXR1cm4gT2JqZWN0LmlzU2VhbGVkKGxpc3QpOyB9XG4gIHN0YXRpYyBmbGF0dGVuPFQ+KGFycmF5OiBUW11bXSk6IFRbXSB7XG4gICAgbGV0IHJlcyA9IFtdO1xuICAgIGFycmF5LmZvckVhY2goKGEpID0+IHJlcyA9IHJlcy5jb25jYXQoYSkpO1xuICAgIHJldHVybiByZXM7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTGlzdExpa2VJdGVyYWJsZShvYmo6IGFueSk6IGJvb2xlYW4ge1xuICBpZiAoIWlzSnNPYmplY3Qob2JqKSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gaXNBcnJheShvYmopIHx8XG4gICAgICAgICAoIShvYmogaW5zdGFuY2VvZiBNYXApICYmICAgICAgLy8gSlMgTWFwIGFyZSBpdGVyYWJsZXMgYnV0IHJldHVybiBlbnRyaWVzIGFzIFtrLCB2XVxuICAgICAgICAgIGdldFN5bWJvbEl0ZXJhdG9yKCkgaW4gb2JqKTsgIC8vIEpTIEl0ZXJhYmxlIGhhdmUgYSBTeW1ib2wuaXRlcmF0b3IgcHJvcFxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJlSXRlcmFibGVzRXF1YWwoYTogYW55LCBiOiBhbnksIGNvbXBhcmF0b3I6IEZ1bmN0aW9uKTogYm9vbGVhbiB7XG4gIHZhciBpdGVyYXRvcjEgPSBhW2dldFN5bWJvbEl0ZXJhdG9yKCldKCk7XG4gIHZhciBpdGVyYXRvcjIgPSBiW2dldFN5bWJvbEl0ZXJhdG9yKCldKCk7XG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBsZXQgaXRlbTEgPSBpdGVyYXRvcjEubmV4dCgpO1xuICAgIGxldCBpdGVtMiA9IGl0ZXJhdG9yMi5uZXh0KCk7XG4gICAgaWYgKGl0ZW0xLmRvbmUgJiYgaXRlbTIuZG9uZSkgcmV0dXJuIHRydWU7XG4gICAgaWYgKGl0ZW0xLmRvbmUgfHwgaXRlbTIuZG9uZSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghY29tcGFyYXRvcihpdGVtMS52YWx1ZSwgaXRlbTIudmFsdWUpKSByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGl0ZXJhdGVMaXN0TGlrZShvYmo6IGFueSwgZm46IEZ1bmN0aW9uKSB7XG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuICAgICAgZm4ob2JqW2ldKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGl0ZXJhdG9yID0gb2JqW2dldFN5bWJvbEl0ZXJhdG9yKCldKCk7XG4gICAgdmFyIGl0ZW07XG4gICAgd2hpbGUgKCEoKGl0ZW0gPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpKSB7XG4gICAgICBmbihpdGVtLnZhbHVlKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gU2FmYXJpIGFuZCBJbnRlcm5ldCBFeHBsb3JlciBkbyBub3Qgc3VwcG9ydCB0aGUgaXRlcmFibGUgcGFyYW1ldGVyIHRvIHRoZVxuLy8gU2V0IGNvbnN0cnVjdG9yLiAgV2Ugd29yayBhcm91bmQgdGhhdCBieSBtYW51YWxseSBhZGRpbmcgdGhlIGl0ZW1zLlxudmFyIGNyZWF0ZVNldEZyb21MaXN0OiB7KGxzdDogYW55W10pOiBTZXQ8YW55Pn0gPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB0ZXN0ID0gbmV3IFNldChbMSwgMiwgM10pO1xuICBpZiAodGVzdC5zaXplID09PSAzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGNyZWF0ZVNldEZyb21MaXN0KGxzdDogYW55W10pOiBTZXQ8YW55PiB7IHJldHVybiBuZXcgU2V0KGxzdCk7IH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGNyZWF0ZVNldEFuZFBvcHVsYXRlRnJvbUxpc3QobHN0OiBhbnlbXSk6IFNldDxhbnk+IHtcbiAgICAgIHZhciByZXMgPSBuZXcgU2V0KGxzdCk7XG4gICAgICBpZiAocmVzLnNpemUgIT09IGxzdC5sZW5ndGgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICByZXMuYWRkKGxzdFtpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXM7XG4gICAgfTtcbiAgfVxufSkoKTtcbmV4cG9ydCBjbGFzcyBTZXRXcmFwcGVyIHtcbiAgc3RhdGljIGNyZWF0ZUZyb21MaXN0PFQ+KGxzdDogVFtdKTogU2V0PFQ+IHsgcmV0dXJuIGNyZWF0ZVNldEZyb21MaXN0KGxzdCk7IH1cbiAgc3RhdGljIGhhczxUPihzOiBTZXQ8VD4sIGtleTogVCk6IGJvb2xlYW4geyByZXR1cm4gcy5oYXMoa2V5KTsgfVxuICBzdGF0aWMgZGVsZXRlPEs+KG06IFNldDxLPiwgazogSykgeyBtLmRlbGV0ZShrKTsgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
