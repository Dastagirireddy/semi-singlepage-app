System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1;
    var Map, Set, createMapFromPairs, createMapFromMap, _clearValues, _arrayFromMap, MapWrapper, StringMapWrapper, ListWrapper, createSetFromList, SetWrapper;
    function _flattenArray(source, target) {
        if (lang_1.isPresent(source)) {
            for (var i = 0; i < source.length; i++) {
                var item = source[i];
                if (lang_1.isArray(item)) {
                    _flattenArray(item, target);
                }
                else {
                    target.push(item);
                }
            }
        }
        return target;
    }
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
                ListWrapper.flatten = function (list) {
                    var target = [];
                    _flattenArray(list, target);
                    return target;
                };
                ListWrapper.addAll = function (list, source) {
                    for (var i = 0; i < source.length; i++) {
                        list.push(source[i]);
                    }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9mYWNhZGUvY29sbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBU1csR0FBRyxFQUNILEdBQUcsRUFJVixrQkFBa0IsRUFnQmxCLGdCQUFnQixFQWFoQixZQUFZLEVBaUJaLGFBQWEsNkNBc1JiLGlCQUFpQjtJQW5EckIsdUJBQXVCLE1BQWEsRUFBRSxNQUFhO1FBQ2pELEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUN2QyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xCLGFBQWEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQzlCLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEIsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBR0QsNEJBQW1DLEdBQVE7UUFDekMsRUFBRSxDQUFDLENBQUMsQ0FBQyxpQkFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNuQyxNQUFNLENBQUMsY0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNaLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxHQUFHLENBQUM7Z0JBQ3JCLHdCQUFpQixFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBRSwwQ0FBMEM7SUFDbEYsQ0FBQztJQUxELG1EQUtDLENBQUE7SUFFRCwyQkFBa0MsQ0FBTSxFQUFFLENBQU0sRUFBRSxVQUFvQjtRQUNwRSxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsd0JBQWlCLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDekMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLHdCQUFpQixFQUFFLENBQUMsRUFBRSxDQUFDO1FBRXpDLE9BQU8sSUFBSSxFQUFFLENBQUM7WUFDWixJQUFJLEtBQUssR0FBRyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDN0IsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzdCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQztnQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQztnQkFBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQzNDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDMUQsQ0FBQztJQUNILENBQUM7SUFYRCxpREFXQyxDQUFBO0lBRUQseUJBQWdDLEdBQVEsRUFBRSxFQUFZO1FBQ3BELEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ3BDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLENBQUM7UUFDSCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsd0JBQWlCLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDMUMsSUFBSSxJQUFJLENBQUM7WUFDVCxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUN4QyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pCLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQVpELDZDQVlDLENBQUE7Ozs7Ozs7WUFyVVUsaUJBQUEsR0FBRyxHQUFHLGFBQU0sQ0FBQyxHQUFHLENBQUEsQ0FBQztZQUNqQixpQkFBQSxHQUFHLEdBQUcsYUFBTSxDQUFDLEdBQUcsQ0FBQSxDQUFDO1lBRTVCLDRFQUE0RTtZQUM1RSxzRUFBc0U7WUFDbEUsa0JBQWtCLEdBQW9DLENBQUM7Z0JBQ3pELElBQUksQ0FBQztvQkFDSCxFQUFFLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdEMsTUFBTSxDQUFDLDRCQUE0QixLQUFZLElBQW1CLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0YsQ0FBQztnQkFDSCxDQUFFO2dCQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsQ0FBQztnQkFDRCxNQUFNLENBQUMsdUNBQXVDLEtBQVk7b0JBQ3hELElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7b0JBQ3BCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUN0QyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1QixDQUFDO29CQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7Z0JBQ2IsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNELGdCQUFnQixHQUF3QyxDQUFDO2dCQUMzRCxJQUFJLENBQUM7b0JBQ0gsRUFBRSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDNUIsTUFBTSxDQUFDLDBCQUEwQixDQUFnQixJQUFtQixNQUFNLENBQUMsSUFBSSxHQUFHLENBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2hHLENBQUM7Z0JBQ0gsQ0FBRTtnQkFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNiLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLHFDQUFxQyxDQUFnQjtvQkFDMUQsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztvQkFDcEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQztnQkFDYixDQUFDLENBQUM7WUFDSixDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ0QsWUFBWSxHQUF5QixDQUFDO2dCQUN4QyxFQUFFLENBQUMsQ0FBTyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNuQyxNQUFNLENBQUMsc0JBQXNCLENBQWdCO3dCQUMzQyxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQzNCLElBQUksQ0FBQyxDQUFDO3dCQUNOLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFTLFdBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7NEJBQy9DLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFDdkIsQ0FBQztvQkFDSCxDQUFDLENBQUM7Z0JBQ0osQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixNQUFNLENBQUMsa0NBQWtDLENBQWdCO3dCQUN2RCxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzQyxDQUFDLENBQUM7Z0JBQ0osQ0FBQztZQUNILENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDTCxpR0FBaUc7WUFDakcscUZBQXFGO1lBQ2pGLGFBQWEsR0FBb0QsQ0FBQztnQkFDcEUsSUFBSSxDQUFDO29CQUNILEVBQUUsQ0FBQyxDQUFPLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ3JDLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBZ0IsRUFBRSxTQUFrQjs0QkFDckUsTUFBTSxDQUFDLFNBQVMsR0FBUyxLQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFTLEtBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7d0JBQ2pGLENBQUMsQ0FBQztvQkFDSixDQUFDO2dCQUNILENBQUU7Z0JBQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDYixDQUFDO2dCQUNELE1BQU0sQ0FBQyx1Q0FBdUMsQ0FBZ0IsRUFBRSxTQUFrQjtvQkFDaEYsSUFBSSxHQUFHLEdBQUcsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDckQsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDO3dCQUNiLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDM0IsQ0FBQyxFQUFFLENBQUM7b0JBQ04sQ0FBQyxDQUFDLENBQUM7b0JBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQztnQkFDYixDQUFDLENBQUM7WUFDSixDQUFDLENBQUMsRUFBRSxDQUFDO1lBRUw7Z0JBQUE7Z0JBbUJBLENBQUM7Z0JBbEJRLGdCQUFLLEdBQVosVUFBbUIsQ0FBWSxJQUFlLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BFLDhCQUFtQixHQUExQixVQUE4QixTQUE2QjtvQkFDekQsSUFBSSxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQWEsQ0FBQztvQkFDbEMsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDM0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3BDLENBQUM7b0JBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDaEIsQ0FBQztnQkFDTSxzQkFBVyxHQUFsQixVQUFzQixDQUFpQjtvQkFDckMsSUFBSSxDQUFDLEdBQXVCLEVBQUUsQ0FBQztvQkFDL0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFSLENBQVEsQ0FBQyxDQUFDO29CQUM5QixNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNYLENBQUM7Z0JBQ00sMEJBQWUsR0FBdEIsVUFBdUIsS0FBWSxJQUFtQixNQUFNLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsRixzQkFBVyxHQUFsQixVQUFtQixDQUFnQixJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELG1CQUFRLEdBQWYsVUFBbUIsQ0FBSSxJQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxlQUFJLEdBQVgsVUFBZSxDQUFjLElBQVMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRSxpQkFBTSxHQUFiLFVBQWlCLENBQWMsSUFBUyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFFLGlCQUFDO1lBQUQsQ0FuQkEsQUFtQkMsSUFBQTtZQW5CRCxtQ0FtQkMsQ0FBQTtZQUVEOztlQUVHO1lBQ0g7Z0JBQUE7Z0JBcUVBLENBQUM7Z0JBcEVRLHVCQUFNLEdBQWI7b0JBQ0UseURBQXlEO29CQUN6RCxlQUFlO29CQUNmLDJDQUEyQztvQkFDM0MsTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDWixDQUFDO2dCQUNNLHlCQUFRLEdBQWYsVUFBZ0IsR0FBeUIsRUFBRSxHQUFXO29CQUNwRCxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakMsQ0FBQztnQkFDTSxvQkFBRyxHQUFWLFVBQWMsR0FBdUIsRUFBRSxHQUFXO29CQUNoRCxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDO2dCQUN4RCxDQUFDO2dCQUNNLG9CQUFHLEdBQVYsVUFBYyxHQUF1QixFQUFFLEdBQVcsRUFBRSxLQUFRLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzVFLHFCQUFJLEdBQVgsVUFBWSxHQUF5QixJQUFjLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEUsdUJBQU0sR0FBYixVQUFpQixHQUF1QjtvQkFDdEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUM7d0JBQ2xDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2YsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDWCxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ1QsQ0FBQztnQkFDTSx3QkFBTyxHQUFkLFVBQWUsR0FBeUI7b0JBQ3RDLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ3JCLE1BQU0sQ0FBQyxLQUFLLENBQUM7b0JBQ2YsQ0FBQztvQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNkLENBQUM7Z0JBQ00sdUJBQU0sR0FBYixVQUFlLEdBQXlCLEVBQUUsR0FBVyxJQUFJLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEUsd0JBQU8sR0FBZCxVQUFxQixHQUF1QixFQUFFLFFBQXFDO29CQUNqRixHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNyQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDN0IsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFDNUIsQ0FBQztvQkFDSCxDQUFDO2dCQUNILENBQUM7Z0JBRU0sc0JBQUssR0FBWixVQUFnQixFQUFzQixFQUFFLEVBQXNCO29CQUM1RCxJQUFJLENBQUMsR0FBdUIsRUFBRSxDQUFDO29CQUUvQixHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUNwQixFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDNUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDckIsQ0FBQztvQkFDSCxDQUFDO29CQUVELEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ3BCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUM1QixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNyQixDQUFDO29CQUNILENBQUM7b0JBRUQsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDWCxDQUFDO2dCQUVNLHVCQUFNLEdBQWIsVUFBaUIsRUFBc0IsRUFBRSxFQUFzQjtvQkFDN0QsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDekIsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDekIsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFDM0IsTUFBTSxDQUFDLEtBQUssQ0FBQztvQkFDZixDQUFDO29CQUNELElBQUksR0FBRyxDQUFDO29CQUNSLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUNuQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNaLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN4QixNQUFNLENBQUMsS0FBSyxDQUFDO3dCQUNmLENBQUM7b0JBQ0gsQ0FBQztvQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNkLENBQUM7Z0JBQ0gsdUJBQUM7WUFBRCxDQXJFQSxBQXFFQyxJQUFBO1lBckVELCtDQXFFQyxDQUFBO1lBUUQ7Z0JBQUE7Z0JBeUdBLENBQUM7Z0JBeEdDLDZFQUE2RTtnQkFDN0UscUJBQXFCO2dCQUNkLDJCQUFlLEdBQXRCLFVBQXVCLElBQVksSUFBVyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRSw4QkFBa0IsR0FBekIsVUFBMEIsSUFBWSxJQUFXLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25FLGlCQUFLLEdBQVosVUFBZ0IsS0FBVSxJQUFTLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEQsNEJBQWdCLEdBQXZCLFVBQTJCLEtBQVUsRUFBRSxFQUE2QjtvQkFDbEUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQ3RDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ2xCLENBQUM7Z0JBQ0gsQ0FBQztnQkFDTSxpQkFBSyxHQUFaLFVBQWdCLEtBQVU7b0JBQ3hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ3hCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLENBQUM7Z0JBQ00sZ0JBQUksR0FBWCxVQUFlLEtBQVU7b0JBQ3ZCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQzdDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDakMsQ0FBQztnQkFDTSxtQkFBTyxHQUFkLFVBQWtCLEtBQVUsRUFBRSxLQUFRLEVBQUUsVUFBc0I7b0JBQXRCLDBCQUFzQixHQUF0QixjQUFzQjtvQkFDNUQsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUMxQyxDQUFDO2dCQUNNLG9CQUFRLEdBQWYsVUFBbUIsSUFBUyxFQUFFLEVBQUssSUFBYSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFFLG9CQUFRLEdBQWYsVUFBbUIsS0FBVTtvQkFDM0IsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDakMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDckIsQ0FBQztnQkFDTSxrQkFBTSxHQUFiLFVBQWMsQ0FBUSxFQUFFLENBQVEsSUFBVyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pELGtCQUFNLEdBQWIsVUFBaUIsSUFBUyxFQUFFLEtBQWEsRUFBRSxLQUFRLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0Usb0JBQVEsR0FBZixVQUFtQixJQUFTLEVBQUUsS0FBYTtvQkFDekMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQztnQkFDYixDQUFDO2dCQUNNLHFCQUFTLEdBQWhCLFVBQW9CLElBQVMsRUFBRSxLQUFVO29CQUN2QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQzt3QkFDdEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLENBQUM7Z0JBQ0gsQ0FBQztnQkFDTSxrQkFBTSxHQUFiLFVBQWlCLElBQVMsRUFBRSxFQUFLO29CQUMvQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUM3QixFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNkLENBQUM7b0JBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFDZixDQUFDO2dCQUNNLGlCQUFLLEdBQVosVUFBYSxJQUFXLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxtQkFBTyxHQUFkLFVBQWUsSUFBVyxJQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFELGdCQUFJLEdBQVgsVUFBWSxJQUFXLEVBQUUsS0FBVSxFQUFFLEtBQWlCLEVBQUUsR0FBa0I7b0JBQXJDLHFCQUFpQixHQUFqQixTQUFpQjtvQkFBRSxtQkFBa0IsR0FBbEIsVUFBa0I7b0JBQ3hFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEtBQUssSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQzVELENBQUM7Z0JBQ00sa0JBQU0sR0FBYixVQUFjLENBQVEsRUFBRSxDQUFRO29CQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUM7d0JBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztvQkFDdkMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7d0JBQ2xDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztvQkFDbEMsQ0FBQztvQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNkLENBQUM7Z0JBQ00saUJBQUssR0FBWixVQUFnQixDQUFNLEVBQUUsSUFBZ0IsRUFBRSxFQUFpQjtvQkFBbkMsb0JBQWdCLEdBQWhCLFFBQWdCO29CQUFFLGtCQUFpQixHQUFqQixTQUFpQjtvQkFDekQsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxJQUFJLEdBQUcsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUNyRCxDQUFDO2dCQUNNLGtCQUFNLEdBQWIsVUFBaUIsQ0FBTSxFQUFFLElBQVksRUFBRSxNQUFjLElBQVMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkYsZ0JBQUksR0FBWCxVQUFlLENBQU0sRUFBRSxTQUFrQztvQkFDdkQsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3pCLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3BCLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNYLENBQUM7Z0JBQ0gsQ0FBQztnQkFDTSxvQkFBUSxHQUFmLFVBQW1CLENBQU0sSUFBWSxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDcEQsa0JBQU0sR0FBYixVQUFpQixDQUFNLElBQVksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUV2RCxtQkFBTyxHQUFkLFVBQWtCLElBQVMsRUFBRSxTQUEyQjtvQkFDdEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNkLENBQUM7b0JBQ0QsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO29CQUNwQixJQUFJLFFBQVEsR0FBRyxDQUFDLFFBQVEsQ0FBQztvQkFDekIsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7d0JBQ2pELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDNUIsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDdkIsUUFBUSxDQUFDO3dCQUNYLENBQUM7d0JBQ0QsSUFBSSxjQUFjLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUMxQyxFQUFFLENBQUMsQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQzs0QkFDOUIsUUFBUSxHQUFHLFNBQVMsQ0FBQzs0QkFDckIsUUFBUSxHQUFHLGNBQWMsQ0FBQzt3QkFDNUIsQ0FBQztvQkFDSCxDQUFDO29CQUNELE1BQU0sQ0FBQyxRQUFRLENBQUM7Z0JBQ2xCLENBQUM7Z0JBRU0sbUJBQU8sR0FBZCxVQUFrQixJQUFvQjtvQkFDcEMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO29CQUNoQixhQUFhLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUM1QixNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNoQixDQUFDO2dCQUVNLGtCQUFNLEdBQWIsVUFBaUIsSUFBYyxFQUFFLE1BQWdCO29CQUMvQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkIsQ0FBQztnQkFDSCxDQUFDO2dCQUNILGtCQUFDO1lBQUQsQ0F6R0EsQUF5R0MsSUFBQTtZQXpHRCxxQ0F5R0MsQ0FBQTtZQW1ERCw0RUFBNEU7WUFDNUUsc0VBQXNFO1lBQ2xFLGlCQUFpQixHQUE2QixDQUFDO2dCQUNqRCxJQUFJLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwQixNQUFNLENBQUMsMkJBQTJCLEdBQVUsSUFBYyxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25GLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sTUFBTSxDQUFDLHNDQUFzQyxHQUFVO3dCQUNyRCxJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDdkIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs0QkFDNUIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0NBQ3BDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ2xCLENBQUM7d0JBQ0gsQ0FBQzt3QkFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO29CQUNiLENBQUMsQ0FBQztnQkFDSixDQUFDO1lBQ0gsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNMO2dCQUFBO2dCQUlBLENBQUM7Z0JBSFEseUJBQWMsR0FBckIsVUFBeUIsR0FBUSxJQUFZLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RFLGNBQUcsR0FBVixVQUFjLENBQVMsRUFBRSxHQUFNLElBQWEsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6RCxpQkFBTSxHQUFiLFVBQWlCLENBQVMsRUFBRSxDQUFJLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELGlCQUFDO1lBQUQsQ0FKQSxBQUlDLElBQUE7WUFKRCxtQ0FJQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9mYWNhZGUvY29sbGVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGlzSnNPYmplY3QsXG4gIGdsb2JhbCxcbiAgaXNQcmVzZW50LFxuICBpc0JsYW5rLFxuICBpc0FycmF5LFxuICBnZXRTeW1ib2xJdGVyYXRvclxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG5leHBvcnQgdmFyIE1hcCA9IGdsb2JhbC5NYXA7XG5leHBvcnQgdmFyIFNldCA9IGdsb2JhbC5TZXQ7XG5cbi8vIFNhZmFyaSBhbmQgSW50ZXJuZXQgRXhwbG9yZXIgZG8gbm90IHN1cHBvcnQgdGhlIGl0ZXJhYmxlIHBhcmFtZXRlciB0byB0aGVcbi8vIE1hcCBjb25zdHJ1Y3Rvci4gIFdlIHdvcmsgYXJvdW5kIHRoYXQgYnkgbWFudWFsbHkgYWRkaW5nIHRoZSBpdGVtcy5cbnZhciBjcmVhdGVNYXBGcm9tUGFpcnM6IHsocGFpcnM6IGFueVtdKTogTWFwPGFueSwgYW55Pn0gPSAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgaWYgKG5ldyBNYXAoPGFueT5bWzEsIDJdXSkuc2l6ZSA9PT0gMSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGNyZWF0ZU1hcEZyb21QYWlycyhwYWlyczogYW55W10pOiBNYXA8YW55LCBhbnk+IHsgcmV0dXJuIG5ldyBNYXAocGFpcnMpOyB9O1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiBjcmVhdGVNYXBBbmRQb3B1bGF0ZUZyb21QYWlycyhwYWlyczogYW55W10pOiBNYXA8YW55LCBhbnk+IHtcbiAgICB2YXIgbWFwID0gbmV3IE1hcCgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFpcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBwYWlyID0gcGFpcnNbaV07XG4gICAgICBtYXAuc2V0KHBhaXJbMF0sIHBhaXJbMV0pO1xuICAgIH1cbiAgICByZXR1cm4gbWFwO1xuICB9O1xufSkoKTtcbnZhciBjcmVhdGVNYXBGcm9tTWFwOiB7KG06IE1hcDxhbnksIGFueT4pOiBNYXA8YW55LCBhbnk+fSA9IChmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICBpZiAobmV3IE1hcCg8YW55Pm5ldyBNYXAoKSkpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBjcmVhdGVNYXBGcm9tTWFwKG06IE1hcDxhbnksIGFueT4pOiBNYXA8YW55LCBhbnk+IHsgcmV0dXJuIG5ldyBNYXAoPGFueT5tKTsgfTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlTWFwQW5kUG9wdWxhdGVGcm9tTWFwKG06IE1hcDxhbnksIGFueT4pOiBNYXA8YW55LCBhbnk+IHtcbiAgICB2YXIgbWFwID0gbmV3IE1hcCgpO1xuICAgIG0uZm9yRWFjaCgodiwgaykgPT4geyBtYXAuc2V0KGssIHYpOyB9KTtcbiAgICByZXR1cm4gbWFwO1xuICB9O1xufSkoKTtcbnZhciBfY2xlYXJWYWx1ZXM6IHsobTogTWFwPGFueSwgYW55Pil9ID0gKGZ1bmN0aW9uKCkge1xuICBpZiAoKDxhbnk+KG5ldyBNYXAoKSkua2V5cygpKS5uZXh0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIF9jbGVhclZhbHVlcyhtOiBNYXA8YW55LCBhbnk+KSB7XG4gICAgICB2YXIga2V5SXRlcmF0b3IgPSBtLmtleXMoKTtcbiAgICAgIHZhciBrO1xuICAgICAgd2hpbGUgKCEoKGsgPSAoPGFueT5rZXlJdGVyYXRvcikubmV4dCgpKS5kb25lKSkge1xuICAgICAgICBtLnNldChrLnZhbHVlLCBudWxsKTtcbiAgICAgIH1cbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmdW5jdGlvbiBfY2xlYXJWYWx1ZXNXaXRoRm9yZUVhY2gobTogTWFwPGFueSwgYW55Pikge1xuICAgICAgbS5mb3JFYWNoKCh2LCBrKSA9PiB7IG0uc2V0KGssIG51bGwpOyB9KTtcbiAgICB9O1xuICB9XG59KSgpO1xuLy8gU2FmYXJpIGRvZXNuJ3QgaW1wbGVtZW50IE1hcEl0ZXJhdG9yLm5leHQoKSwgd2hpY2ggaXMgdXNlZCBpcyBUcmFjZXVyJ3MgcG9seWZpbGwgb2YgQXJyYXkuZnJvbVxuLy8gVE9ETyhtbGF2YWwpOiByZW1vdmUgdGhlIHdvcmsgYXJvdW5kIG9uY2Ugd2UgaGF2ZSBhIHdvcmtpbmcgcG9seWZpbGwgb2YgQXJyYXkuZnJvbVxudmFyIF9hcnJheUZyb21NYXA6IHsobTogTWFwPGFueSwgYW55PiwgZ2V0VmFsdWVzOiBib29sZWFuKTogYW55W119ID0gKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIGlmICgoPGFueT4obmV3IE1hcCgpKS52YWx1ZXMoKSkubmV4dCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGNyZWF0ZUFycmF5RnJvbU1hcChtOiBNYXA8YW55LCBhbnk+LCBnZXRWYWx1ZXM6IGJvb2xlYW4pOiBhbnlbXSB7XG4gICAgICAgIHJldHVybiBnZXRWYWx1ZXMgPyAoPGFueT5BcnJheSkuZnJvbShtLnZhbHVlcygpKSA6ICg8YW55PkFycmF5KS5mcm9tKG0ua2V5cygpKTtcbiAgICAgIH07XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uIGNyZWF0ZUFycmF5RnJvbU1hcFdpdGhGb3JlYWNoKG06IE1hcDxhbnksIGFueT4sIGdldFZhbHVlczogYm9vbGVhbik6IGFueVtdIHtcbiAgICB2YXIgcmVzID0gTGlzdFdyYXBwZXIuY3JlYXRlRml4ZWRTaXplKG0uc2l6ZSksIGkgPSAwO1xuICAgIG0uZm9yRWFjaCgodiwgaykgPT4ge1xuICAgICAgcmVzW2ldID0gZ2V0VmFsdWVzID8gdiA6IGs7XG4gICAgICBpKys7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcztcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBjbGFzcyBNYXBXcmFwcGVyIHtcbiAgc3RhdGljIGNsb25lPEssIFY+KG06IE1hcDxLLCBWPik6IE1hcDxLLCBWPiB7IHJldHVybiBjcmVhdGVNYXBGcm9tTWFwKG0pOyB9XG4gIHN0YXRpYyBjcmVhdGVGcm9tU3RyaW5nTWFwPFQ+KHN0cmluZ01hcDoge1trZXk6IHN0cmluZ106IFR9KTogTWFwPHN0cmluZywgVD4ge1xuICAgIHZhciByZXN1bHQgPSBuZXcgTWFwPHN0cmluZywgVD4oKTtcbiAgICBmb3IgKHZhciBwcm9wIGluIHN0cmluZ01hcCkge1xuICAgICAgcmVzdWx0LnNldChwcm9wLCBzdHJpbmdNYXBbcHJvcF0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIHN0YXRpYyB0b1N0cmluZ01hcDxUPihtOiBNYXA8c3RyaW5nLCBUPik6IHtba2V5OiBzdHJpbmddOiBUfSB7XG4gICAgdmFyIHI6IHtba2V5OiBzdHJpbmddOiBUfSA9IHt9O1xuICAgIG0uZm9yRWFjaCgodiwgaykgPT4gcltrXSA9IHYpO1xuICAgIHJldHVybiByO1xuICB9XG4gIHN0YXRpYyBjcmVhdGVGcm9tUGFpcnMocGFpcnM6IGFueVtdKTogTWFwPGFueSwgYW55PiB7IHJldHVybiBjcmVhdGVNYXBGcm9tUGFpcnMocGFpcnMpOyB9XG4gIHN0YXRpYyBjbGVhclZhbHVlcyhtOiBNYXA8YW55LCBhbnk+KSB7IF9jbGVhclZhbHVlcyhtKTsgfVxuICBzdGF0aWMgaXRlcmFibGU8VD4obTogVCk6IFQgeyByZXR1cm4gbTsgfVxuICBzdGF0aWMga2V5czxLPihtOiBNYXA8SywgYW55Pik6IEtbXSB7IHJldHVybiBfYXJyYXlGcm9tTWFwKG0sIGZhbHNlKTsgfVxuICBzdGF0aWMgdmFsdWVzPFY+KG06IE1hcDxhbnksIFY+KTogVltdIHsgcmV0dXJuIF9hcnJheUZyb21NYXAobSwgdHJ1ZSk7IH1cbn1cblxuLyoqXG4gKiBXcmFwcyBKYXZhc2NyaXB0IE9iamVjdHNcbiAqL1xuZXhwb3J0IGNsYXNzIFN0cmluZ01hcFdyYXBwZXIge1xuICBzdGF0aWMgY3JlYXRlKCk6IHtbazogLyphbnkqLyBzdHJpbmddOiBhbnl9IHtcbiAgICAvLyBOb3RlOiBXZSBhcmUgbm90IHVzaW5nIE9iamVjdC5jcmVhdGUobnVsbCkgaGVyZSBkdWUgdG9cbiAgICAvLyBwZXJmb3JtYW5jZSFcbiAgICAvLyBodHRwOi8vanNwZXJmLmNvbS9uZzItb2JqZWN0LWNyZWF0ZS1udWxsXG4gICAgcmV0dXJuIHt9O1xuICB9XG4gIHN0YXRpYyBjb250YWlucyhtYXA6IHtba2V5OiBzdHJpbmddOiBhbnl9LCBrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBtYXAuaGFzT3duUHJvcGVydHkoa2V5KTtcbiAgfVxuICBzdGF0aWMgZ2V0PFY+KG1hcDoge1trZXk6IHN0cmluZ106IFZ9LCBrZXk6IHN0cmluZyk6IFYge1xuICAgIHJldHVybiBtYXAuaGFzT3duUHJvcGVydHkoa2V5KSA/IG1hcFtrZXldIDogdW5kZWZpbmVkO1xuICB9XG4gIHN0YXRpYyBzZXQ8Vj4obWFwOiB7W2tleTogc3RyaW5nXTogVn0sIGtleTogc3RyaW5nLCB2YWx1ZTogVikgeyBtYXBba2V5XSA9IHZhbHVlOyB9XG4gIHN0YXRpYyBrZXlzKG1hcDoge1trZXk6IHN0cmluZ106IGFueX0pOiBzdHJpbmdbXSB7IHJldHVybiBPYmplY3Qua2V5cyhtYXApOyB9XG4gIHN0YXRpYyB2YWx1ZXM8VD4obWFwOiB7W2tleTogc3RyaW5nXTogVH0pOiBUW10ge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhtYXApLnJlZHVjZSgociwgYSkgPT4ge1xuICAgICAgci5wdXNoKG1hcFthXSk7XG4gICAgICByZXR1cm4gcjtcbiAgICB9LCBbXSk7XG4gIH1cbiAgc3RhdGljIGlzRW1wdHkobWFwOiB7W2tleTogc3RyaW5nXTogYW55fSk6IGJvb2xlYW4ge1xuICAgIGZvciAodmFyIHByb3AgaW4gbWFwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHN0YXRpYyBkZWxldGUgKG1hcDoge1trZXk6IHN0cmluZ106IGFueX0sIGtleTogc3RyaW5nKSB7IGRlbGV0ZSBtYXBba2V5XTsgfVxuICBzdGF0aWMgZm9yRWFjaDxLLCBWPihtYXA6IHtba2V5OiBzdHJpbmddOiBWfSwgY2FsbGJhY2s6IC8qKFYsIEspID0+IHZvaWQqLyBGdW5jdGlvbikge1xuICAgIGZvciAodmFyIHByb3AgaW4gbWFwKSB7XG4gICAgICBpZiAobWFwLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgIGNhbGxiYWNrKG1hcFtwcm9wXSwgcHJvcCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG1lcmdlPFY+KG0xOiB7W2tleTogc3RyaW5nXTogVn0sIG0yOiB7W2tleTogc3RyaW5nXTogVn0pOiB7W2tleTogc3RyaW5nXTogVn0ge1xuICAgIHZhciBtOiB7W2tleTogc3RyaW5nXTogVn0gPSB7fTtcblxuICAgIGZvciAodmFyIGF0dHIgaW4gbTEpIHtcbiAgICAgIGlmIChtMS5oYXNPd25Qcm9wZXJ0eShhdHRyKSkge1xuICAgICAgICBtW2F0dHJdID0gbTFbYXR0cl07XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgYXR0ciBpbiBtMikge1xuICAgICAgaWYgKG0yLmhhc093blByb3BlcnR5KGF0dHIpKSB7XG4gICAgICAgIG1bYXR0cl0gPSBtMlthdHRyXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbTtcbiAgfVxuXG4gIHN0YXRpYyBlcXVhbHM8Vj4obTE6IHtba2V5OiBzdHJpbmddOiBWfSwgbTI6IHtba2V5OiBzdHJpbmddOiBWfSk6IGJvb2xlYW4ge1xuICAgIHZhciBrMSA9IE9iamVjdC5rZXlzKG0xKTtcbiAgICB2YXIgazIgPSBPYmplY3Qua2V5cyhtMik7XG4gICAgaWYgKGsxLmxlbmd0aCAhPSBrMi5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGtleTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGsxLmxlbmd0aDsgaSsrKSB7XG4gICAgICBrZXkgPSBrMVtpXTtcbiAgICAgIGlmIChtMVtrZXldICE9PSBtMltrZXldKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuLyoqXG4gKiBBIGJvb2xlYW4tdmFsdWVkIGZ1bmN0aW9uIG92ZXIgYSB2YWx1ZSwgcG9zc2libHkgaW5jbHVkaW5nIGNvbnRleHQgaW5mb3JtYXRpb25cbiAqIHJlZ2FyZGluZyB0aGF0IHZhbHVlJ3MgcG9zaXRpb24gaW4gYW4gYXJyYXkuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUHJlZGljYXRlPFQ+IHsgKHZhbHVlOiBULCBpbmRleD86IG51bWJlciwgYXJyYXk/OiBUW10pOiBib29sZWFuOyB9XG5cbmV4cG9ydCBjbGFzcyBMaXN0V3JhcHBlciB7XG4gIC8vIEpTIGhhcyBubyB3YXkgdG8gZXhwcmVzcyBhIHN0YXRpY2FsbHkgZml4ZWQgc2l6ZSBsaXN0LCBidXQgZGFydCBkb2VzIHNvIHdlXG4gIC8vIGtlZXAgYm90aCBtZXRob2RzLlxuICBzdGF0aWMgY3JlYXRlRml4ZWRTaXplKHNpemU6IG51bWJlcik6IGFueVtdIHsgcmV0dXJuIG5ldyBBcnJheShzaXplKTsgfVxuICBzdGF0aWMgY3JlYXRlR3Jvd2FibGVTaXplKHNpemU6IG51bWJlcik6IGFueVtdIHsgcmV0dXJuIG5ldyBBcnJheShzaXplKTsgfVxuICBzdGF0aWMgY2xvbmU8VD4oYXJyYXk6IFRbXSk6IFRbXSB7IHJldHVybiBhcnJheS5zbGljZSgwKTsgfVxuICBzdGF0aWMgZm9yRWFjaFdpdGhJbmRleDxUPihhcnJheTogVFtdLCBmbjogKHQ6IFQsIG46IG51bWJlcikgPT4gdm9pZCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZuKGFycmF5W2ldLCBpKTtcbiAgICB9XG4gIH1cbiAgc3RhdGljIGZpcnN0PFQ+KGFycmF5OiBUW10pOiBUIHtcbiAgICBpZiAoIWFycmF5KSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gYXJyYXlbMF07XG4gIH1cbiAgc3RhdGljIGxhc3Q8VD4oYXJyYXk6IFRbXSk6IFQge1xuICAgIGlmICghYXJyYXkgfHwgYXJyYXkubGVuZ3RoID09IDApIHJldHVybiBudWxsO1xuICAgIHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcbiAgfVxuICBzdGF0aWMgaW5kZXhPZjxUPihhcnJheTogVFtdLCB2YWx1ZTogVCwgc3RhcnRJbmRleDogbnVtYmVyID0gMCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGFycmF5LmluZGV4T2YodmFsdWUsIHN0YXJ0SW5kZXgpO1xuICB9XG4gIHN0YXRpYyBjb250YWluczxUPihsaXN0OiBUW10sIGVsOiBUKTogYm9vbGVhbiB7IHJldHVybiBsaXN0LmluZGV4T2YoZWwpICE9PSAtMTsgfVxuICBzdGF0aWMgcmV2ZXJzZWQ8VD4oYXJyYXk6IFRbXSk6IFRbXSB7XG4gICAgdmFyIGEgPSBMaXN0V3JhcHBlci5jbG9uZShhcnJheSk7XG4gICAgcmV0dXJuIGEucmV2ZXJzZSgpO1xuICB9XG4gIHN0YXRpYyBjb25jYXQoYTogYW55W10sIGI6IGFueVtdKTogYW55W10geyByZXR1cm4gYS5jb25jYXQoYik7IH1cbiAgc3RhdGljIGluc2VydDxUPihsaXN0OiBUW10sIGluZGV4OiBudW1iZXIsIHZhbHVlOiBUKSB7IGxpc3Quc3BsaWNlKGluZGV4LCAwLCB2YWx1ZSk7IH1cbiAgc3RhdGljIHJlbW92ZUF0PFQ+KGxpc3Q6IFRbXSwgaW5kZXg6IG51bWJlcik6IFQge1xuICAgIHZhciByZXMgPSBsaXN0W2luZGV4XTtcbiAgICBsaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuICBzdGF0aWMgcmVtb3ZlQWxsPFQ+KGxpc3Q6IFRbXSwgaXRlbXM6IFRbXSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBpbmRleCA9IGxpc3QuaW5kZXhPZihpdGVtc1tpXSk7XG4gICAgICBsaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG4gIHN0YXRpYyByZW1vdmU8VD4obGlzdDogVFtdLCBlbDogVCk6IGJvb2xlYW4ge1xuICAgIHZhciBpbmRleCA9IGxpc3QuaW5kZXhPZihlbCk7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIGxpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3RhdGljIGNsZWFyKGxpc3Q6IGFueVtdKSB7IGxpc3QubGVuZ3RoID0gMDsgfVxuICBzdGF0aWMgaXNFbXB0eShsaXN0OiBhbnlbXSk6IGJvb2xlYW4geyByZXR1cm4gbGlzdC5sZW5ndGggPT0gMDsgfVxuICBzdGF0aWMgZmlsbChsaXN0OiBhbnlbXSwgdmFsdWU6IGFueSwgc3RhcnQ6IG51bWJlciA9IDAsIGVuZDogbnVtYmVyID0gbnVsbCkge1xuICAgIGxpc3QuZmlsbCh2YWx1ZSwgc3RhcnQsIGVuZCA9PT0gbnVsbCA/IGxpc3QubGVuZ3RoIDogZW5kKTtcbiAgfVxuICBzdGF0aWMgZXF1YWxzKGE6IGFueVtdLCBiOiBhbnlbXSk6IGJvb2xlYW4ge1xuICAgIGlmIChhLmxlbmd0aCAhPSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYS5sZW5ndGg7ICsraSkge1xuICAgICAgaWYgKGFbaV0gIT09IGJbaV0pIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgc3RhdGljIHNsaWNlPFQ+KGw6IFRbXSwgZnJvbTogbnVtYmVyID0gMCwgdG86IG51bWJlciA9IG51bGwpOiBUW10ge1xuICAgIHJldHVybiBsLnNsaWNlKGZyb20sIHRvID09PSBudWxsID8gdW5kZWZpbmVkIDogdG8pO1xuICB9XG4gIHN0YXRpYyBzcGxpY2U8VD4obDogVFtdLCBmcm9tOiBudW1iZXIsIGxlbmd0aDogbnVtYmVyKTogVFtdIHsgcmV0dXJuIGwuc3BsaWNlKGZyb20sIGxlbmd0aCk7IH1cbiAgc3RhdGljIHNvcnQ8VD4obDogVFtdLCBjb21wYXJlRm4/OiAoYTogVCwgYjogVCkgPT4gbnVtYmVyKSB7XG4gICAgaWYgKGlzUHJlc2VudChjb21wYXJlRm4pKSB7XG4gICAgICBsLnNvcnQoY29tcGFyZUZuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbC5zb3J0KCk7XG4gICAgfVxuICB9XG4gIHN0YXRpYyB0b1N0cmluZzxUPihsOiBUW10pOiBzdHJpbmcgeyByZXR1cm4gbC50b1N0cmluZygpOyB9XG4gIHN0YXRpYyB0b0pTT048VD4obDogVFtdKTogc3RyaW5nIHsgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGwpOyB9XG5cbiAgc3RhdGljIG1heGltdW08VD4obGlzdDogVFtdLCBwcmVkaWNhdGU6ICh0OiBUKSA9PiBudW1iZXIpOiBUIHtcbiAgICBpZiAobGlzdC5sZW5ndGggPT0gMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciBzb2x1dGlvbiA9IG51bGw7XG4gICAgdmFyIG1heFZhbHVlID0gLUluZmluaXR5O1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsaXN0Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdmFyIGNhbmRpZGF0ZSA9IGxpc3RbaW5kZXhdO1xuICAgICAgaWYgKGlzQmxhbmsoY2FuZGlkYXRlKSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHZhciBjYW5kaWRhdGVWYWx1ZSA9IHByZWRpY2F0ZShjYW5kaWRhdGUpO1xuICAgICAgaWYgKGNhbmRpZGF0ZVZhbHVlID4gbWF4VmFsdWUpIHtcbiAgICAgICAgc29sdXRpb24gPSBjYW5kaWRhdGU7XG4gICAgICAgIG1heFZhbHVlID0gY2FuZGlkYXRlVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzb2x1dGlvbjtcbiAgfVxuXG4gIHN0YXRpYyBmbGF0dGVuPFQ+KGxpc3Q6IEFycmF5PFQgfCBUW10+KTogVFtdIHtcbiAgICB2YXIgdGFyZ2V0ID0gW107XG4gICAgX2ZsYXR0ZW5BcnJheShsaXN0LCB0YXJnZXQpO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBzdGF0aWMgYWRkQWxsPFQ+KGxpc3Q6IEFycmF5PFQ+LCBzb3VyY2U6IEFycmF5PFQ+KTogdm9pZCB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxpc3QucHVzaChzb3VyY2VbaV0pO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBfZmxhdHRlbkFycmF5KHNvdXJjZTogYW55W10sIHRhcmdldDogYW55W10pOiBhbnlbXSB7XG4gIGlmIChpc1ByZXNlbnQoc291cmNlKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IHNvdXJjZVtpXTtcbiAgICAgIGlmIChpc0FycmF5KGl0ZW0pKSB7XG4gICAgICAgIF9mbGF0dGVuQXJyYXkoaXRlbSwgdGFyZ2V0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldC5wdXNoKGl0ZW0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBpc0xpc3RMaWtlSXRlcmFibGUob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgaWYgKCFpc0pzT2JqZWN0KG9iaikpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIGlzQXJyYXkob2JqKSB8fFxuICAgICAgICAgKCEob2JqIGluc3RhbmNlb2YgTWFwKSAmJiAgICAgIC8vIEpTIE1hcCBhcmUgaXRlcmFibGVzIGJ1dCByZXR1cm4gZW50cmllcyBhcyBbaywgdl1cbiAgICAgICAgICBnZXRTeW1ib2xJdGVyYXRvcigpIGluIG9iaik7ICAvLyBKUyBJdGVyYWJsZSBoYXZlIGEgU3ltYm9sLml0ZXJhdG9yIHByb3Bcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFyZUl0ZXJhYmxlc0VxdWFsKGE6IGFueSwgYjogYW55LCBjb21wYXJhdG9yOiBGdW5jdGlvbik6IGJvb2xlYW4ge1xuICB2YXIgaXRlcmF0b3IxID0gYVtnZXRTeW1ib2xJdGVyYXRvcigpXSgpO1xuICB2YXIgaXRlcmF0b3IyID0gYltnZXRTeW1ib2xJdGVyYXRvcigpXSgpO1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgbGV0IGl0ZW0xID0gaXRlcmF0b3IxLm5leHQoKTtcbiAgICBsZXQgaXRlbTIgPSBpdGVyYXRvcjIubmV4dCgpO1xuICAgIGlmIChpdGVtMS5kb25lICYmIGl0ZW0yLmRvbmUpIHJldHVybiB0cnVlO1xuICAgIGlmIChpdGVtMS5kb25lIHx8IGl0ZW0yLmRvbmUpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIWNvbXBhcmF0b3IoaXRlbTEudmFsdWUsIGl0ZW0yLnZhbHVlKSkgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpdGVyYXRlTGlzdExpa2Uob2JqOiBhbnksIGZuOiBGdW5jdGlvbikge1xuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZuKG9ialtpXSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBpdGVyYXRvciA9IG9ialtnZXRTeW1ib2xJdGVyYXRvcigpXSgpO1xuICAgIHZhciBpdGVtO1xuICAgIHdoaWxlICghKChpdGVtID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSkge1xuICAgICAgZm4oaXRlbS52YWx1ZSk7XG4gICAgfVxuICB9XG59XG5cbi8vIFNhZmFyaSBhbmQgSW50ZXJuZXQgRXhwbG9yZXIgZG8gbm90IHN1cHBvcnQgdGhlIGl0ZXJhYmxlIHBhcmFtZXRlciB0byB0aGVcbi8vIFNldCBjb25zdHJ1Y3Rvci4gIFdlIHdvcmsgYXJvdW5kIHRoYXQgYnkgbWFudWFsbHkgYWRkaW5nIHRoZSBpdGVtcy5cbnZhciBjcmVhdGVTZXRGcm9tTGlzdDogeyhsc3Q6IGFueVtdKTogU2V0PGFueT59ID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdGVzdCA9IG5ldyBTZXQoWzEsIDIsIDNdKTtcbiAgaWYgKHRlc3Quc2l6ZSA9PT0gMykge1xuICAgIHJldHVybiBmdW5jdGlvbiBjcmVhdGVTZXRGcm9tTGlzdChsc3Q6IGFueVtdKTogU2V0PGFueT4geyByZXR1cm4gbmV3IFNldChsc3QpOyB9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmdW5jdGlvbiBjcmVhdGVTZXRBbmRQb3B1bGF0ZUZyb21MaXN0KGxzdDogYW55W10pOiBTZXQ8YW55PiB7XG4gICAgICB2YXIgcmVzID0gbmV3IFNldChsc3QpO1xuICAgICAgaWYgKHJlcy5zaXplICE9PSBsc3QubGVuZ3RoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbHN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgcmVzLmFkZChsc3RbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH07XG4gIH1cbn0pKCk7XG5leHBvcnQgY2xhc3MgU2V0V3JhcHBlciB7XG4gIHN0YXRpYyBjcmVhdGVGcm9tTGlzdDxUPihsc3Q6IFRbXSk6IFNldDxUPiB7IHJldHVybiBjcmVhdGVTZXRGcm9tTGlzdChsc3QpOyB9XG4gIHN0YXRpYyBoYXM8VD4oczogU2V0PFQ+LCBrZXk6IFQpOiBib29sZWFuIHsgcmV0dXJuIHMuaGFzKGtleSk7IH1cbiAgc3RhdGljIGRlbGV0ZTxLPihtOiBTZXQ8Sz4sIGs6IEspIHsgbS5kZWxldGUoayk7IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
