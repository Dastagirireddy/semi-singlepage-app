System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var globalScope, IS_DART, _global, Type, Math, Date, _devMode, _modeLocked, StringWrapper, StringJoiner, NumberParseError, NumberWrapper, RegExp, RegExpWrapper, RegExpMatcherWrapper, FunctionWrapper, Json, DateWrapper, _symbolIterator;
    function scheduleMicroTask(fn) {
        Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
    }
    exports_1("scheduleMicroTask", scheduleMicroTask);
    function getTypeNameForDebugging(type) {
        if (type['name']) {
            return type['name'];
        }
        return typeof type;
    }
    exports_1("getTypeNameForDebugging", getTypeNameForDebugging);
    function lockMode() {
        _modeLocked = true;
    }
    exports_1("lockMode", lockMode);
    /**
     * Disable Angular's development mode, which turns off assertions and other
     * checks within the framework.
     *
     * One important assertion this disables verifies that a change detection pass
     * does not result in additional changes to any bindings (also known as
     * unidirectional data flow).
     */
    function enableProdMode() {
        if (_modeLocked) {
            // Cannot use BaseException as that ends up importing from facade/lang.
            throw 'Cannot enable prod mode after platform setup.';
        }
        _devMode = false;
    }
    exports_1("enableProdMode", enableProdMode);
    function assertionsEnabled() {
        return _devMode;
    }
    exports_1("assertionsEnabled", assertionsEnabled);
    // This function is needed only to properly support Dart's const expressions
    // see https://github.com/angular/ts2dart/pull/151 for more info
    function CONST_EXPR(expr) {
        return expr;
    }
    exports_1("CONST_EXPR", CONST_EXPR);
    function CONST() {
        return function (target) { return target; };
    }
    exports_1("CONST", CONST);
    function isPresent(obj) {
        return obj !== undefined && obj !== null;
    }
    exports_1("isPresent", isPresent);
    function isBlank(obj) {
        return obj === undefined || obj === null;
    }
    exports_1("isBlank", isBlank);
    function isBoolean(obj) {
        return typeof obj === "boolean";
    }
    exports_1("isBoolean", isBoolean);
    function isNumber(obj) {
        return typeof obj === "number";
    }
    exports_1("isNumber", isNumber);
    function isString(obj) {
        return typeof obj === "string";
    }
    exports_1("isString", isString);
    function isFunction(obj) {
        return typeof obj === "function";
    }
    exports_1("isFunction", isFunction);
    function isType(obj) {
        return isFunction(obj);
    }
    exports_1("isType", isType);
    function isStringMap(obj) {
        return typeof obj === 'object' && obj !== null;
    }
    exports_1("isStringMap", isStringMap);
    function isPromise(obj) {
        return obj instanceof _global.Promise;
    }
    exports_1("isPromise", isPromise);
    function isArray(obj) {
        return Array.isArray(obj);
    }
    exports_1("isArray", isArray);
    function isDate(obj) {
        return obj instanceof Date && !isNaN(obj.valueOf());
    }
    exports_1("isDate", isDate);
    function noop() { }
    exports_1("noop", noop);
    function stringify(token) {
        if (typeof token === 'string') {
            return token;
        }
        if (token === undefined || token === null) {
            return '' + token;
        }
        if (token.name) {
            return token.name;
        }
        if (token.overriddenName) {
            return token.overriddenName;
        }
        var res = token.toString();
        var newLineIndex = res.indexOf("\n");
        return (newLineIndex === -1) ? res : res.substring(0, newLineIndex);
    }
    exports_1("stringify", stringify);
    // serialize / deserialize enum exist only for consistency with dart API
    // enums in typescript don't need to be serialized
    function serializeEnum(val) {
        return val;
    }
    exports_1("serializeEnum", serializeEnum);
    function deserializeEnum(val, values) {
        return val;
    }
    exports_1("deserializeEnum", deserializeEnum);
    function resolveEnumToken(enumValue, val) {
        return enumValue[val];
    }
    exports_1("resolveEnumToken", resolveEnumToken);
    // JS has NaN !== NaN
    function looseIdentical(a, b) {
        return a === b || typeof a === "number" && typeof b === "number" && isNaN(a) && isNaN(b);
    }
    exports_1("looseIdentical", looseIdentical);
    // JS considers NaN is the same as NaN for map Key (while NaN !== NaN otherwise)
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
    function getMapKey(value) {
        return value;
    }
    exports_1("getMapKey", getMapKey);
    function normalizeBlank(obj) {
        return isBlank(obj) ? null : obj;
    }
    exports_1("normalizeBlank", normalizeBlank);
    function normalizeBool(obj) {
        return isBlank(obj) ? false : obj;
    }
    exports_1("normalizeBool", normalizeBool);
    function isJsObject(o) {
        return o !== null && (typeof o === "function" || typeof o === "object");
    }
    exports_1("isJsObject", isJsObject);
    function print(obj) {
        console.log(obj);
    }
    exports_1("print", print);
    function warn(obj) {
        console.warn(obj);
    }
    exports_1("warn", warn);
    function setValueOnPath(global, path, value) {
        var parts = path.split('.');
        var obj = global;
        while (parts.length > 1) {
            var name = parts.shift();
            if (obj.hasOwnProperty(name) && isPresent(obj[name])) {
                obj = obj[name];
            }
            else {
                obj = obj[name] = {};
            }
        }
        if (obj === undefined || obj === null) {
            obj = {};
        }
        obj[parts.shift()] = value;
    }
    exports_1("setValueOnPath", setValueOnPath);
    function getSymbolIterator() {
        if (isBlank(_symbolIterator)) {
            if (isPresent(globalScope.Symbol) && isPresent(Symbol.iterator)) {
                _symbolIterator = Symbol.iterator;
            }
            else {
                // es6-shim specific logic
                var keys = Object.getOwnPropertyNames(Map.prototype);
                for (var i = 0; i < keys.length; ++i) {
                    var key = keys[i];
                    if (key !== 'entries' && key !== 'size' &&
                        Map.prototype[key] === Map.prototype['entries']) {
                        _symbolIterator = key;
                    }
                }
            }
        }
        return _symbolIterator;
    }
    exports_1("getSymbolIterator", getSymbolIterator);
    function evalExpression(sourceUrl, expr, declarations, vars) {
        var fnBody = declarations + "\nreturn " + expr + "\n//# sourceURL=" + sourceUrl;
        var fnArgNames = [];
        var fnArgValues = [];
        for (var argName in vars) {
            fnArgNames.push(argName);
            fnArgValues.push(vars[argName]);
        }
        return new (Function.bind.apply(Function, [void 0].concat(fnArgNames.concat(fnBody))))().apply(void 0, fnArgValues);
    }
    exports_1("evalExpression", evalExpression);
    function isPrimitive(obj) {
        return !isJsObject(obj);
    }
    exports_1("isPrimitive", isPrimitive);
    function hasConstructor(value, type) {
        return value.constructor === type;
    }
    exports_1("hasConstructor", hasConstructor);
    function bitWiseOr(values) {
        return values.reduce(function (a, b) { return a | b; });
    }
    exports_1("bitWiseOr", bitWiseOr);
    function bitWiseAnd(values) {
        return values.reduce(function (a, b) { return a & b; });
    }
    exports_1("bitWiseAnd", bitWiseAnd);
    function escape(s) {
        return _global.encodeURI(s);
    }
    exports_1("escape", escape);
    return {
        setters:[],
        execute: function() {
            if (typeof window === 'undefined') {
                if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
                    // TODO: Replace any with WorkerGlobalScope from lib.webworker.d.ts #3492
                    globalScope = self;
                }
                else {
                    globalScope = global;
                }
            }
            else {
                globalScope = window;
            }
            exports_1("IS_DART", IS_DART = false);
            // Need to declare a new variable for global here since TypeScript
            // exports the original value of the symbol.
            _global = globalScope;
            exports_1("global", _global);
            exports_1("Type", Type = Function);
            exports_1("Math", Math = _global.Math);
            exports_1("Date", Date = _global.Date);
            _devMode = true;
            _modeLocked = false;
            // TODO: remove calls to assert in production environment
            // Note: Can't just export this and import in in other files
            // as `assert` is a reserved keyword in Dart
            _global.assert = function assert(condition) {
                // TODO: to be fixed properly via #2830, noop for now
            };
            StringWrapper = (function () {
                function StringWrapper() {
                }
                StringWrapper.fromCharCode = function (code) { return String.fromCharCode(code); };
                StringWrapper.charCodeAt = function (s, index) { return s.charCodeAt(index); };
                StringWrapper.split = function (s, regExp) { return s.split(regExp); };
                StringWrapper.equals = function (s, s2) { return s === s2; };
                StringWrapper.stripLeft = function (s, charVal) {
                    if (s && s.length) {
                        var pos = 0;
                        for (var i = 0; i < s.length; i++) {
                            if (s[i] != charVal)
                                break;
                            pos++;
                        }
                        s = s.substring(pos);
                    }
                    return s;
                };
                StringWrapper.stripRight = function (s, charVal) {
                    if (s && s.length) {
                        var pos = s.length;
                        for (var i = s.length - 1; i >= 0; i--) {
                            if (s[i] != charVal)
                                break;
                            pos--;
                        }
                        s = s.substring(0, pos);
                    }
                    return s;
                };
                StringWrapper.replace = function (s, from, replace) {
                    return s.replace(from, replace);
                };
                StringWrapper.replaceAll = function (s, from, replace) {
                    return s.replace(from, replace);
                };
                StringWrapper.slice = function (s, from, to) {
                    if (from === void 0) { from = 0; }
                    if (to === void 0) { to = null; }
                    return s.slice(from, to === null ? undefined : to);
                };
                StringWrapper.replaceAllMapped = function (s, from, cb) {
                    return s.replace(from, function () {
                        var matches = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            matches[_i - 0] = arguments[_i];
                        }
                        // Remove offset & string from the result array
                        matches.splice(-2, 2);
                        // The callback receives match, p1, ..., pn
                        return cb(matches);
                    });
                };
                StringWrapper.contains = function (s, substr) { return s.indexOf(substr) != -1; };
                StringWrapper.compare = function (a, b) {
                    if (a < b) {
                        return -1;
                    }
                    else if (a > b) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                };
                return StringWrapper;
            }());
            exports_1("StringWrapper", StringWrapper);
            StringJoiner = (function () {
                function StringJoiner(parts) {
                    if (parts === void 0) { parts = []; }
                    this.parts = parts;
                }
                StringJoiner.prototype.add = function (part) { this.parts.push(part); };
                StringJoiner.prototype.toString = function () { return this.parts.join(""); };
                return StringJoiner;
            }());
            exports_1("StringJoiner", StringJoiner);
            NumberParseError = (function (_super) {
                __extends(NumberParseError, _super);
                function NumberParseError(message) {
                    _super.call(this);
                    this.message = message;
                }
                NumberParseError.prototype.toString = function () { return this.message; };
                return NumberParseError;
            }(Error));
            exports_1("NumberParseError", NumberParseError);
            NumberWrapper = (function () {
                function NumberWrapper() {
                }
                NumberWrapper.toFixed = function (n, fractionDigits) { return n.toFixed(fractionDigits); };
                NumberWrapper.equal = function (a, b) { return a === b; };
                NumberWrapper.parseIntAutoRadix = function (text) {
                    var result = parseInt(text);
                    if (isNaN(result)) {
                        throw new NumberParseError("Invalid integer literal when parsing " + text);
                    }
                    return result;
                };
                NumberWrapper.parseInt = function (text, radix) {
                    if (radix == 10) {
                        if (/^(\-|\+)?[0-9]+$/.test(text)) {
                            return parseInt(text, radix);
                        }
                    }
                    else if (radix == 16) {
                        if (/^(\-|\+)?[0-9ABCDEFabcdef]+$/.test(text)) {
                            return parseInt(text, radix);
                        }
                    }
                    else {
                        var result = parseInt(text, radix);
                        if (!isNaN(result)) {
                            return result;
                        }
                    }
                    throw new NumberParseError("Invalid integer literal when parsing " + text + " in base " +
                        radix);
                };
                // TODO: NaN is a valid literal but is returned by parseFloat to indicate an error.
                NumberWrapper.parseFloat = function (text) { return parseFloat(text); };
                Object.defineProperty(NumberWrapper, "NaN", {
                    get: function () { return NaN; },
                    enumerable: true,
                    configurable: true
                });
                NumberWrapper.isNaN = function (value) { return isNaN(value); };
                NumberWrapper.isInteger = function (value) { return Number.isInteger(value); };
                return NumberWrapper;
            }());
            exports_1("NumberWrapper", NumberWrapper);
            exports_1("RegExp", RegExp = _global.RegExp);
            RegExpWrapper = (function () {
                function RegExpWrapper() {
                }
                RegExpWrapper.create = function (regExpStr, flags) {
                    if (flags === void 0) { flags = ''; }
                    flags = flags.replace(/g/g, '');
                    return new _global.RegExp(regExpStr, flags + 'g');
                };
                RegExpWrapper.firstMatch = function (regExp, input) {
                    // Reset multimatch regex state
                    regExp.lastIndex = 0;
                    return regExp.exec(input);
                };
                RegExpWrapper.test = function (regExp, input) {
                    regExp.lastIndex = 0;
                    return regExp.test(input);
                };
                RegExpWrapper.matcher = function (regExp, input) {
                    // Reset regex state for the case
                    // someone did not loop over all matches
                    // last time.
                    regExp.lastIndex = 0;
                    return { re: regExp, input: input };
                };
                RegExpWrapper.replaceAll = function (regExp, input, replace) {
                    var c = regExp.exec(input);
                    var res = '';
                    regExp.lastIndex = 0;
                    var prev = 0;
                    while (c) {
                        res += input.substring(prev, c.index);
                        res += replace(c);
                        prev = c.index + c[0].length;
                        regExp.lastIndex = prev;
                        c = regExp.exec(input);
                    }
                    res += input.substring(prev);
                    return res;
                };
                return RegExpWrapper;
            }());
            exports_1("RegExpWrapper", RegExpWrapper);
            RegExpMatcherWrapper = (function () {
                function RegExpMatcherWrapper() {
                }
                RegExpMatcherWrapper.next = function (matcher) {
                    return matcher.re.exec(matcher.input);
                };
                return RegExpMatcherWrapper;
            }());
            exports_1("RegExpMatcherWrapper", RegExpMatcherWrapper);
            FunctionWrapper = (function () {
                function FunctionWrapper() {
                }
                FunctionWrapper.apply = function (fn, posArgs) { return fn.apply(null, posArgs); };
                return FunctionWrapper;
            }());
            exports_1("FunctionWrapper", FunctionWrapper);
            // Can't be all uppercase as our transpiler would think it is a special directive...
            Json = (function () {
                function Json() {
                }
                Json.parse = function (s) { return _global.JSON.parse(s); };
                Json.stringify = function (data) {
                    // Dart doesn't take 3 arguments
                    return _global.JSON.stringify(data, null, 2);
                };
                return Json;
            }());
            exports_1("Json", Json);
            DateWrapper = (function () {
                function DateWrapper() {
                }
                DateWrapper.create = function (year, month, day, hour, minutes, seconds, milliseconds) {
                    if (month === void 0) { month = 1; }
                    if (day === void 0) { day = 1; }
                    if (hour === void 0) { hour = 0; }
                    if (minutes === void 0) { minutes = 0; }
                    if (seconds === void 0) { seconds = 0; }
                    if (milliseconds === void 0) { milliseconds = 0; }
                    return new Date(year, month - 1, day, hour, minutes, seconds, milliseconds);
                };
                DateWrapper.fromISOString = function (str) { return new Date(str); };
                DateWrapper.fromMillis = function (ms) { return new Date(ms); };
                DateWrapper.toMillis = function (date) { return date.getTime(); };
                DateWrapper.now = function () { return new Date(); };
                DateWrapper.toJson = function (date) { return date.toJSON(); };
                return DateWrapper;
            }());
            exports_1("DateWrapper", DateWrapper);
            _symbolIterator = null;
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9mYWNhZGUvbGFuZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztRQXdCSSxXQUFXLEVBZ0JGLE9BQU8sRUFJaEIsT0FBTyxFQUlBLElBQUksRUF1QkosSUFBSSxFQUNKLElBQUksRUFFWCxRQUFRLEVBQ1IsV0FBVyxnRUEyUEosTUFBTSwyRUFnSWIsZUFBZTtJQWxhbkIsMkJBQWtDLEVBQVk7UUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRkQsaURBRUMsQ0FBQTtJQXlCRCxpQ0FBd0MsSUFBVTtRQUNoRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxPQUFPLElBQUksQ0FBQztJQUNyQixDQUFDO0lBTEQsNkRBS0MsQ0FBQTtJQVNEO1FBQ0UsV0FBVyxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRkQsK0JBRUMsQ0FBQTtJQUVEOzs7Ozs7O09BT0c7SUFDSDtRQUNFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDaEIsdUVBQXVFO1lBQ3ZFLE1BQU0sK0NBQStDLENBQUM7UUFDeEQsQ0FBQztRQUNELFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDbkIsQ0FBQztJQU5ELDJDQU1DLENBQUE7SUFFRDtRQUNFLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUZELGlEQUVDLENBQUE7SUFTRCw0RUFBNEU7SUFDNUUsZ0VBQWdFO0lBQ2hFLG9CQUE4QixJQUFPO1FBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRkQsbUNBRUMsQ0FBQTtJQUVEO1FBQ0UsTUFBTSxDQUFDLFVBQUMs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QyxDQUFDLENBQUM7Z0JBQzdELGtCQUFDO1lBQUQsQ0FWQSxBQVVDLElBQUE7WUFWRCxxQ0FVQyxDQUFBO1lBcUJHLGVBQWUsR0FBRyxJQUFJLENBQUMiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2ZhY2FkZS9sYW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBCcm93c2VyTm9kZUdsb2JhbCB7XG4gIE9iamVjdDogdHlwZW9mIE9iamVjdDtcbiAgQXJyYXk6IHR5cGVvZiBBcnJheTtcbiAgTWFwOiB0eXBlb2YgTWFwO1xuICBTZXQ6IHR5cGVvZiBTZXQ7XG4gIERhdGU6IERhdGVDb25zdHJ1Y3RvcjtcbiAgUmVnRXhwOiBSZWdFeHBDb25zdHJ1Y3RvcjtcbiAgSlNPTjogdHlwZW9mIEpTT047XG4gIE1hdGg6IGFueTsgIC8vIHR5cGVvZiBNYXRoO1xuICBhc3NlcnQoY29uZGl0aW9uOiBhbnkpOiB2b2lkO1xuICBSZWZsZWN0OiBhbnk7XG4gIGdldEFuZ3VsYXJUZXN0YWJpbGl0eTogRnVuY3Rpb247XG4gIGdldEFsbEFuZ3VsYXJUZXN0YWJpbGl0aWVzOiBGdW5jdGlvbjtcbiAgZ2V0QWxsQW5ndWxhclJvb3RFbGVtZW50czogRnVuY3Rpb247XG4gIGZyYW1ld29ya1N0YWJpbGl6ZXJzOiBBcnJheTxGdW5jdGlvbj47XG4gIHNldFRpbWVvdXQ6IEZ1bmN0aW9uO1xuICBjbGVhclRpbWVvdXQ6IEZ1bmN0aW9uO1xuICBzZXRJbnRlcnZhbDogRnVuY3Rpb247XG4gIGNsZWFySW50ZXJ2YWw6IEZ1bmN0aW9uO1xuICBlbmNvZGVVUkk6IEZ1bmN0aW9uO1xufVxuXG4vLyBUT0RPKGp0ZXBsaXR6NjAyKTogTG9hZCBXb3JrZXJHbG9iYWxTY29wZSBmcm9tIGxpYi53ZWJ3b3JrZXIuZC50cyBmaWxlICMzNDkyXG5kZWNsYXJlIHZhciBXb3JrZXJHbG9iYWxTY29wZTtcbnZhciBnbG9iYWxTY29wZTogQnJvd3Nlck5vZGVHbG9iYWw7XG5pZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgaWYgKHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlKSB7XG4gICAgLy8gVE9ETzogUmVwbGFjZSBhbnkgd2l0aCBXb3JrZXJHbG9iYWxTY29wZSBmcm9tIGxpYi53ZWJ3b3JrZXIuZC50cyAjMzQ5MlxuICAgIGdsb2JhbFNjb3BlID0gPGFueT5zZWxmO1xuICB9IGVsc2Uge1xuICAgIGdsb2JhbFNjb3BlID0gPGFueT5nbG9iYWw7XG4gIH1cbn0gZWxzZSB7XG4gIGdsb2JhbFNjb3BlID0gPGFueT53aW5kb3c7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzY2hlZHVsZU1pY3JvVGFzayhmbjogRnVuY3Rpb24pIHtcbiAgWm9uZS5jdXJyZW50LnNjaGVkdWxlTWljcm9UYXNrKCdzY2hlZHVsZU1pY3JvdGFzaycsIGZuKTtcbn1cblxuZXhwb3J0IGNvbnN0IElTX0RBUlQgPSBmYWxzZTtcblxuLy8gTmVlZCB0byBkZWNsYXJlIGEgbmV3IHZhcmlhYmxlIGZvciBnbG9iYWwgaGVyZSBzaW5jZSBUeXBlU2NyaXB0XG4vLyBleHBvcnRzIHRoZSBvcmlnaW5hbCB2YWx1ZSBvZiB0aGUgc3ltYm9sLlxudmFyIF9nbG9iYWw6IEJyb3dzZXJOb2RlR2xvYmFsID0gZ2xvYmFsU2NvcGU7XG5cbmV4cG9ydCB7X2dsb2JhbCBhcyBnbG9iYWx9O1xuXG5leHBvcnQgdmFyIFR5cGUgPSBGdW5jdGlvbjtcblxuLyoqXG4gKiBSdW50aW1lIHJlcHJlc2VudGF0aW9uIGEgdHlwZSB0aGF0IGEgQ29tcG9uZW50IG9yIG90aGVyIG9iamVjdCBpcyBpbnN0YW5jZXMgb2YuXG4gKlxuICogQW4gZXhhbXBsZSBvZiBhIGBUeXBlYCBpcyBgTXlDdXN0b21Db21wb25lbnRgIGNsYXNzLCB3aGljaCBpbiBKYXZhU2NyaXB0IGlzIGJlIHJlcHJlc2VudGVkIGJ5XG4gKiB0aGUgYE15Q3VzdG9tQ29tcG9uZW50YCBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUeXBlIGV4dGVuZHMgRnVuY3Rpb24ge31cblxuLyoqXG4gKiBSdW50aW1lIHJlcHJlc2VudGF0aW9uIG9mIGEgdHlwZSB0aGF0IGlzIGNvbnN0cnVjdGFibGUgKG5vbi1hYnN0cmFjdCkuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29uY3JldGVUeXBlIGV4dGVuZHMgVHlwZSB7IG5ldyAoLi4uYXJncyk6IGFueTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHlwZU5hbWVGb3JEZWJ1Z2dpbmcodHlwZTogVHlwZSk6IHN0cmluZyB7XG4gIGlmICh0eXBlWyduYW1lJ10pIHtcbiAgICByZXR1cm4gdHlwZVsnbmFtZSddO1xuICB9XG4gIHJldHVybiB0eXBlb2YgdHlwZTtcbn1cblxuXG5leHBvcnQgdmFyIE1hdGggPSBfZ2xvYmFsLk1hdGg7XG5leHBvcnQgdmFyIERhdGUgPSBfZ2xvYmFsLkRhdGU7XG5cbnZhciBfZGV2TW9kZTogYm9vbGVhbiA9IHRydWU7XG52YXIgX21vZGVMb2NrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuZXhwb3J0IGZ1bmN0aW9uIGxvY2tNb2RlKCkge1xuICBfbW9kZUxvY2tlZCA9IHRydWU7XG59XG5cbi8qKlxuICogRGlzYWJsZSBBbmd1bGFyJ3MgZGV2ZWxvcG1lbnQgbW9kZSwgd2hpY2ggdHVybnMgb2ZmIGFzc2VydGlvbnMgYW5kIG90aGVyXG4gKiBjaGVja3Mgd2l0aGluIHRoZSBmcmFtZXdvcmsuXG4gKlxuICogT25lIGltcG9ydGFudCBhc3NlcnRpb24gdGhpcyBkaXNhYmxlcyB2ZXJpZmllcyB0aGF0IGEgY2hhbmdlIGRldGVjdGlvbiBwYXNzXG4gKiBkb2VzIG5vdCByZXN1bHQgaW4gYWRkaXRpb25hbCBjaGFuZ2VzIHRvIGFueSBiaW5kaW5ncyAoYWxzbyBrbm93biBhc1xuICogdW5pZGlyZWN0aW9uYWwgZGF0YSBmbG93KS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZVByb2RNb2RlKCkge1xuICBpZiAoX21vZGVMb2NrZWQpIHtcbiAgICAvLyBDYW5ub3QgdXNlIEJhc2VFeGNlcHRpb24gYXMgdGhhdCBlbmRzIHVwIGltcG9ydGluZyBmcm9tIGZhY2FkZS9sYW5nLlxuICAgIHRocm93ICdDYW5ub3QgZW5hYmxlIHByb2QgbW9kZSBhZnRlciBwbGF0Zm9ybSBzZXR1cC4nO1xuICB9XG4gIF9kZXZNb2RlID0gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRpb25zRW5hYmxlZCgpOiBib29sZWFuIHtcbiAgcmV0dXJuIF9kZXZNb2RlO1xufVxuXG4vLyBUT0RPOiByZW1vdmUgY2FsbHMgdG8gYXNzZXJ0IGluIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRcbi8vIE5vdGU6IENhbid0IGp1c3QgZXhwb3J0IHRoaXMgYW5kIGltcG9ydCBpbiBpbiBvdGhlciBmaWxlc1xuLy8gYXMgYGFzc2VydGAgaXMgYSByZXNlcnZlZCBrZXl3b3JkIGluIERhcnRcbl9nbG9iYWwuYXNzZXJ0ID0gZnVuY3Rpb24gYXNzZXJ0KGNvbmRpdGlvbikge1xuICAvLyBUT0RPOiB0byBiZSBmaXhlZCBwcm9wZXJseSB2aWEgIzI4MzAsIG5vb3AgZm9yIG5vd1xufTtcblxuLy8gVGhpcyBmdW5jdGlvbiBpcyBuZWVkZWQgb25seSB0byBwcm9wZXJseSBzdXBwb3J0IERhcnQncyBjb25zdCBleHByZXNzaW9uc1xuLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL3RzMmRhcnQvcHVsbC8xNTEgZm9yIG1vcmUgaW5mb1xuZXhwb3J0IGZ1bmN0aW9uIENPTlNUX0VYUFI8VD4oZXhwcjogVCk6IFQge1xuICByZXR1cm4gZXhwcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENPTlNUKCk6IENsYXNzRGVjb3JhdG9yICYgUHJvcGVydHlEZWNvcmF0b3Ige1xuICByZXR1cm4gKHRhcmdldCkgPT4gdGFyZ2V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQcmVzZW50KG9iajogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBvYmogIT09IHVuZGVmaW5lZCAmJiBvYmogIT09IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JsYW5rKG9iajogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBvYmogPT09IHVuZGVmaW5lZCB8fCBvYmogPT09IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4ob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwiYm9vbGVhblwiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwibnVtYmVyXCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyhvYmo6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJzdHJpbmdcIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRnVuY3Rpb24ob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVHlwZShvYmo6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gaXNGdW5jdGlvbihvYmopO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmdNYXAob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIG9iaiAhPT0gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvbWlzZShvYmo6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gb2JqIGluc3RhbmNlb2YgKDxhbnk+X2dsb2JhbCkuUHJvbWlzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQXJyYXkob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkob2JqKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGF0ZShvYmopOiBib29sZWFuIHtcbiAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIERhdGUgJiYgIWlzTmFOKG9iai52YWx1ZU9mKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9vcCgpIHt9XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnkodG9rZW4pOiBzdHJpbmcge1xuICBpZiAodHlwZW9mIHRva2VuID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuXG4gIGlmICh0b2tlbiA9PT0gdW5kZWZpbmVkIHx8IHRva2VuID09PSBudWxsKSB7XG4gICAgcmV0dXJuICcnICsgdG9rZW47XG4gIH1cblxuICBpZiAodG9rZW4ubmFtZSkge1xuICAgIHJldHVybiB0b2tlbi5uYW1lO1xuICB9XG4gIGlmICh0b2tlbi5vdmVycmlkZGVuTmFtZSkge1xuICAgIHJldHVybiB0b2tlbi5vdmVycmlkZGVuTmFtZTtcbiAgfVxuXG4gIHZhciByZXMgPSB0b2tlbi50b1N0cmluZygpO1xuICB2YXIgbmV3TGluZUluZGV4ID0gcmVzLmluZGV4T2YoXCJcXG5cIik7XG4gIHJldHVybiAobmV3TGluZUluZGV4ID09PSAtMSkgPyByZXMgOiByZXMuc3Vic3RyaW5nKDAsIG5ld0xpbmVJbmRleCk7XG59XG5cbi8vIHNlcmlhbGl6ZSAvIGRlc2VyaWFsaXplIGVudW0gZXhpc3Qgb25seSBmb3IgY29uc2lzdGVuY3kgd2l0aCBkYXJ0IEFQSVxuLy8gZW51bXMgaW4gdHlwZXNjcmlwdCBkb24ndCBuZWVkIHRvIGJlIHNlcmlhbGl6ZWRcblxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZUVudW0odmFsKTogbnVtYmVyIHtcbiAgcmV0dXJuIHZhbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc2VyaWFsaXplRW51bSh2YWwsIHZhbHVlczogTWFwPG51bWJlciwgYW55Pik6IGFueSB7XG4gIHJldHVybiB2YWw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlRW51bVRva2VuKGVudW1WYWx1ZSwgdmFsKTogc3RyaW5nIHtcbiAgcmV0dXJuIGVudW1WYWx1ZVt2YWxdO1xufVxuXG5leHBvcnQgY2xhc3MgU3RyaW5nV3JhcHBlciB7XG4gIHN0YXRpYyBmcm9tQ2hhckNvZGUoY29kZTogbnVtYmVyKTogc3RyaW5nIHsgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7IH1cblxuICBzdGF0aWMgY2hhckNvZGVBdChzOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiBudW1iZXIgeyByZXR1cm4gcy5jaGFyQ29kZUF0KGluZGV4KTsgfVxuXG4gIHN0YXRpYyBzcGxpdChzOiBzdHJpbmcsIHJlZ0V4cDogUmVnRXhwKTogc3RyaW5nW10geyByZXR1cm4gcy5zcGxpdChyZWdFeHApOyB9XG5cbiAgc3RhdGljIGVxdWFscyhzOiBzdHJpbmcsIHMyOiBzdHJpbmcpOiBib29sZWFuIHsgcmV0dXJuIHMgPT09IHMyOyB9XG5cbiAgc3RhdGljIHN0cmlwTGVmdChzOiBzdHJpbmcsIGNoYXJWYWw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKHMgJiYgcy5sZW5ndGgpIHtcbiAgICAgIHZhciBwb3MgPSAwO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzW2ldICE9IGNoYXJWYWwpIGJyZWFrO1xuICAgICAgICBwb3MrKztcbiAgICAgIH1cbiAgICAgIHMgPSBzLnN1YnN0cmluZyhwb3MpO1xuICAgIH1cbiAgICByZXR1cm4gcztcbiAgfVxuXG4gIHN0YXRpYyBzdHJpcFJpZ2h0KHM6IHN0cmluZywgY2hhclZhbDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAocyAmJiBzLmxlbmd0aCkge1xuICAgICAgdmFyIHBvcyA9IHMubGVuZ3RoO1xuICAgICAgZm9yICh2YXIgaSA9IHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgaWYgKHNbaV0gIT0gY2hhclZhbCkgYnJlYWs7XG4gICAgICAgIHBvcy0tO1xuICAgICAgfVxuICAgICAgcyA9IHMuc3Vic3RyaW5nKDAsIHBvcyk7XG4gICAgfVxuICAgIHJldHVybiBzO1xuICB9XG5cbiAgc3RhdGljIHJlcGxhY2Uoczogc3RyaW5nLCBmcm9tOiBzdHJpbmcsIHJlcGxhY2U6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHMucmVwbGFjZShmcm9tLCByZXBsYWNlKTtcbiAgfVxuXG4gIHN0YXRpYyByZXBsYWNlQWxsKHM6IHN0cmluZywgZnJvbTogUmVnRXhwLCByZXBsYWNlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBzLnJlcGxhY2UoZnJvbSwgcmVwbGFjZSk7XG4gIH1cblxuICBzdGF0aWMgc2xpY2U8VD4oczogc3RyaW5nLCBmcm9tOiBudW1iZXIgPSAwLCB0bzogbnVtYmVyID0gbnVsbCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHMuc2xpY2UoZnJvbSwgdG8gPT09IG51bGwgPyB1bmRlZmluZWQgOiB0byk7XG4gIH1cblxuICBzdGF0aWMgcmVwbGFjZUFsbE1hcHBlZChzOiBzdHJpbmcsIGZyb206IFJlZ0V4cCwgY2I6IEZ1bmN0aW9uKTogc3RyaW5nIHtcbiAgICByZXR1cm4gcy5yZXBsYWNlKGZyb20sIGZ1bmN0aW9uKC4uLm1hdGNoZXMpIHtcbiAgICAgIC8vIFJlbW92ZSBvZmZzZXQgJiBzdHJpbmcgZnJvbSB0aGUgcmVzdWx0IGFycmF5XG4gICAgICBtYXRjaGVzLnNwbGljZSgtMiwgMik7XG4gICAgICAvLyBUaGUgY2FsbGJhY2sgcmVjZWl2ZXMgbWF0Y2gsIHAxLCAuLi4sIHBuXG4gICAgICByZXR1cm4gY2IobWF0Y2hlcyk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgY29udGFpbnMoczogc3RyaW5nLCBzdWJzdHI6IHN0cmluZyk6IGJvb2xlYW4geyByZXR1cm4gcy5pbmRleE9mKHN1YnN0cikgIT0gLTE7IH1cblxuICBzdGF0aWMgY29tcGFyZShhOiBzdHJpbmcsIGI6IHN0cmluZyk6IG51bWJlciB7XG4gICAgaWYgKGEgPCBiKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfSBlbHNlIGlmIChhID4gYikge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgU3RyaW5nSm9pbmVyIHtcbiAgY29uc3RydWN0b3IocHVibGljIHBhcnRzID0gW10pIHt9XG5cbiAgYWRkKHBhcnQ6IHN0cmluZyk6IHZvaWQgeyB0aGlzLnBhcnRzLnB1c2gocGFydCk7IH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5wYXJ0cy5qb2luKFwiXCIpOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBOdW1iZXJQYXJzZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBuYW1lOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG1lc3NhZ2U6IHN0cmluZykgeyBzdXBlcigpOyB9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMubWVzc2FnZTsgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBOdW1iZXJXcmFwcGVyIHtcbiAgc3RhdGljIHRvRml4ZWQobjogbnVtYmVyLCBmcmFjdGlvbkRpZ2l0czogbnVtYmVyKTogc3RyaW5nIHsgcmV0dXJuIG4udG9GaXhlZChmcmFjdGlvbkRpZ2l0cyk7IH1cblxuICBzdGF0aWMgZXF1YWwoYTogbnVtYmVyLCBiOiBudW1iZXIpOiBib29sZWFuIHsgcmV0dXJuIGEgPT09IGI7IH1cblxuICBzdGF0aWMgcGFyc2VJbnRBdXRvUmFkaXgodGV4dDogc3RyaW5nKTogbnVtYmVyIHtcbiAgICB2YXIgcmVzdWx0OiBudW1iZXIgPSBwYXJzZUludCh0ZXh0KTtcbiAgICBpZiAoaXNOYU4ocmVzdWx0KSkge1xuICAgICAgdGhyb3cgbmV3IE51bWJlclBhcnNlRXJyb3IoXCJJbnZhbGlkIGludGVnZXIgbGl0ZXJhbCB3aGVuIHBhcnNpbmcgXCIgKyB0ZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZUludCh0ZXh0OiBzdHJpbmcsIHJhZGl4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmIChyYWRpeCA9PSAxMCkge1xuICAgICAgaWYgKC9eKFxcLXxcXCspP1swLTldKyQvLnRlc3QodGV4dCkpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHRleHQsIHJhZGl4KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJhZGl4ID09IDE2KSB7XG4gICAgICBpZiAoL14oXFwtfFxcKyk/WzAtOUFCQ0RFRmFiY2RlZl0rJC8udGVzdCh0ZXh0KSkge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQodGV4dCwgcmFkaXgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcmVzdWx0OiBudW1iZXIgPSBwYXJzZUludCh0ZXh0LCByYWRpeCk7XG4gICAgICBpZiAoIWlzTmFOKHJlc3VsdCkpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IE51bWJlclBhcnNlRXJyb3IoXCJJbnZhbGlkIGludGVnZXIgbGl0ZXJhbCB3aGVuIHBhcnNpbmcgXCIgKyB0ZXh0ICsgXCIgaW4gYmFzZSBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFkaXgpO1xuICB9XG5cbiAgLy8gVE9ETzogTmFOIGlzIGEgdmFsaWQgbGl0ZXJhbCBidXQgaXMgcmV0dXJuZWQgYnkgcGFyc2VGbG9hdCB0byBpbmRpY2F0ZSBhbiBlcnJvci5cbiAgc3RhdGljIHBhcnNlRmxvYXQodGV4dDogc3RyaW5nKTogbnVtYmVyIHsgcmV0dXJuIHBhcnNlRmxvYXQodGV4dCk7IH1cblxuICBzdGF0aWMgZ2V0IE5hTigpOiBudW1iZXIgeyByZXR1cm4gTmFOOyB9XG5cbiAgc3RhdGljIGlzTmFOKHZhbHVlOiBhbnkpOiBib29sZWFuIHsgcmV0dXJuIGlzTmFOKHZhbHVlKTsgfVxuXG4gIHN0YXRpYyBpc0ludGVnZXIodmFsdWU6IGFueSk6IGJvb2xlYW4geyByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7IH1cbn1cblxuZXhwb3J0IHZhciBSZWdFeHAgPSBfZ2xvYmFsLlJlZ0V4cDtcblxuZXhwb3J0IGNsYXNzIFJlZ0V4cFdyYXBwZXIge1xuICBzdGF0aWMgY3JlYXRlKHJlZ0V4cFN0cjogc3RyaW5nLCBmbGFnczogc3RyaW5nID0gJycpOiBSZWdFeHAge1xuICAgIGZsYWdzID0gZmxhZ3MucmVwbGFjZSgvZy9nLCAnJyk7XG4gICAgcmV0dXJuIG5ldyBfZ2xvYmFsLlJlZ0V4cChyZWdFeHBTdHIsIGZsYWdzICsgJ2cnKTtcbiAgfVxuICBzdGF0aWMgZmlyc3RNYXRjaChyZWdFeHA6IFJlZ0V4cCwgaW5wdXQ6IHN0cmluZyk6IFJlZ0V4cEV4ZWNBcnJheSB7XG4gICAgLy8gUmVzZXQgbXVsdGltYXRjaCByZWdleCBzdGF0ZVxuICAgIHJlZ0V4cC5sYXN0SW5kZXggPSAwO1xuICAgIHJldHVybiByZWdFeHAuZXhlYyhpbnB1dCk7XG4gIH1cbiAgc3RhdGljIHRlc3QocmVnRXhwOiBSZWdFeHAsIGlucHV0OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZWdFeHAubGFzdEluZGV4ID0gMDtcbiAgICByZXR1cm4gcmVnRXhwLnRlc3QoaW5wdXQpO1xuICB9XG4gIHN0YXRpYyBtYXRjaGVyKHJlZ0V4cDogUmVnRXhwLCBpbnB1dDogc3RyaW5nKToge1xuICAgIHJlOiBSZWdFeHA7XG4gICAgaW5wdXQ6IHN0cmluZ1xuICB9XG4gIHtcbiAgICAvLyBSZXNldCByZWdleCBzdGF0ZSBmb3IgdGhlIGNhc2VcbiAgICAvLyBzb21lb25lIGRpZCBub3QgbG9vcCBvdmVyIGFsbCBtYXRjaGVzXG4gICAgLy8gbGFzdCB0aW1lLlxuICAgIHJlZ0V4cC5sYXN0SW5kZXggPSAwO1xuICAgIHJldHVybiB7cmU6IHJlZ0V4cCwgaW5wdXQ6IGlucHV0fTtcbiAgfVxuICBzdGF0aWMgcmVwbGFjZUFsbChyZWdFeHA6IFJlZ0V4cCwgaW5wdXQ6IHN0cmluZywgcmVwbGFjZTogRnVuY3Rpb24pOiBzdHJpbmcge1xuICAgIGxldCBjID0gcmVnRXhwLmV4ZWMoaW5wdXQpO1xuICAgIGxldCByZXMgPSAnJztcbiAgICByZWdFeHAubGFzdEluZGV4ID0gMDtcbiAgICBsZXQgcHJldiA9IDA7XG4gICAgd2hpbGUgKGMpIHtcbiAgICAgIHJlcyArPSBpbnB1dC5zdWJzdHJpbmcocHJldiwgYy5pbmRleCk7XG4gICAgICByZXMgKz0gcmVwbGFjZShjKTtcbiAgICAgIHByZXYgPSBjLmluZGV4ICsgY1swXS5sZW5ndGg7XG4gICAgICByZWdFeHAubGFzdEluZGV4ID0gcHJldjtcbiAgICAgIGMgPSByZWdFeHAuZXhlYyhpbnB1dCk7XG4gICAgfVxuICAgIHJlcyArPSBpbnB1dC5zdWJzdHJpbmcocHJldik7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVnRXhwTWF0Y2hlcldyYXBwZXIge1xuICBzdGF0aWMgbmV4dChtYXRjaGVyOiB7XG4gICAgcmU6IFJlZ0V4cDtcbiAgICBpbnB1dDogc3RyaW5nXG4gIH0pOiBSZWdFeHBFeGVjQXJyYXkge1xuICAgIHJldHVybiBtYXRjaGVyLnJlLmV4ZWMobWF0Y2hlci5pbnB1dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEZ1bmN0aW9uV3JhcHBlciB7XG4gIHN0YXRpYyBhcHBseShmbjogRnVuY3Rpb24sIHBvc0FyZ3M6IGFueSk6IGFueSB7IHJldHVybiBmbi5hcHBseShudWxsLCBwb3NBcmdzKTsgfVxufVxuXG4vLyBKUyBoYXMgTmFOICE9PSBOYU5cbmV4cG9ydCBmdW5jdGlvbiBsb29zZUlkZW50aWNhbChhLCBiKTogYm9vbGVhbiB7XG4gIHJldHVybiBhID09PSBiIHx8IHR5cGVvZiBhID09PSBcIm51bWJlclwiICYmIHR5cGVvZiBiID09PSBcIm51bWJlclwiICYmIGlzTmFOKGEpICYmIGlzTmFOKGIpO1xufVxuXG4vLyBKUyBjb25zaWRlcnMgTmFOIGlzIHRoZSBzYW1lIGFzIE5hTiBmb3IgbWFwIEtleSAod2hpbGUgTmFOICE9PSBOYU4gb3RoZXJ3aXNlKVxuLy8gc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hcFxuZXhwb3J0IGZ1bmN0aW9uIGdldE1hcEtleTxUPih2YWx1ZTogVCk6IFQge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVCbGFuayhvYmo6IE9iamVjdCk6IGFueSB7XG4gIHJldHVybiBpc0JsYW5rKG9iaikgPyBudWxsIDogb2JqO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplQm9vbChvYmo6IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgcmV0dXJuIGlzQmxhbmsob2JqKSA/IGZhbHNlIDogb2JqO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNKc09iamVjdChvOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIG8gIT09IG51bGwgJiYgKHR5cGVvZiBvID09PSBcImZ1bmN0aW9uXCIgfHwgdHlwZW9mIG8gPT09IFwib2JqZWN0XCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJpbnQob2JqOiBFcnJvciB8IE9iamVjdCkge1xuICBjb25zb2xlLmxvZyhvYmopO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd2FybihvYmo6IEVycm9yIHwgT2JqZWN0KSB7XG4gIGNvbnNvbGUud2FybihvYmopO1xufVxuXG4vLyBDYW4ndCBiZSBhbGwgdXBwZXJjYXNlIGFzIG91ciB0cmFuc3BpbGVyIHdvdWxkIHRoaW5rIGl0IGlzIGEgc3BlY2lhbCBkaXJlY3RpdmUuLi5cbmV4cG9ydCBjbGFzcyBKc29uIHtcbiAgc3RhdGljIHBhcnNlKHM6IHN0cmluZyk6IE9iamVjdCB7IHJldHVybiBfZ2xvYmFsLkpTT04ucGFyc2Uocyk7IH1cbiAgc3RhdGljIHN0cmluZ2lmeShkYXRhOiBPYmplY3QpOiBzdHJpbmcge1xuICAgIC8vIERhcnQgZG9lc24ndCB0YWtlIDMgYXJndW1lbnRzXG4gICAgcmV0dXJuIF9nbG9iYWwuSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMik7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIERhdGVXcmFwcGVyIHtcbiAgc3RhdGljIGNyZWF0ZSh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIgPSAxLCBkYXk6IG51bWJlciA9IDEsIGhvdXI6IG51bWJlciA9IDAsXG4gICAgICAgICAgICAgICAgbWludXRlczogbnVtYmVyID0gMCwgc2Vjb25kczogbnVtYmVyID0gMCwgbWlsbGlzZWNvbmRzOiBudW1iZXIgPSAwKTogRGF0ZSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5LCBob3VyLCBtaW51dGVzLCBzZWNvbmRzLCBtaWxsaXNlY29uZHMpO1xuICB9XG4gIHN0YXRpYyBmcm9tSVNPU3RyaW5nKHN0cjogc3RyaW5nKTogRGF0ZSB7IHJldHVybiBuZXcgRGF0ZShzdHIpOyB9XG4gIHN0YXRpYyBmcm9tTWlsbGlzKG1zOiBudW1iZXIpOiBEYXRlIHsgcmV0dXJuIG5ldyBEYXRlKG1zKTsgfVxuICBzdGF0aWMgdG9NaWxsaXMoZGF0ZTogRGF0ZSk6IG51bWJlciB7IHJldHVybiBkYXRlLmdldFRpbWUoKTsgfVxuICBzdGF0aWMgbm93KCk6IERhdGUgeyByZXR1cm4gbmV3IERhdGUoKTsgfVxuICBzdGF0aWMgdG9Kc29uKGRhdGU6IERhdGUpOiBzdHJpbmcgeyByZXR1cm4gZGF0ZS50b0pTT04oKTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0VmFsdWVPblBhdGgoZ2xvYmFsOiBhbnksIHBhdGg6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICB2YXIgcGFydHMgPSBwYXRoLnNwbGl0KCcuJyk7XG4gIHZhciBvYmo6IGFueSA9IGdsb2JhbDtcbiAgd2hpbGUgKHBhcnRzLmxlbmd0aCA+IDEpIHtcbiAgICB2YXIgbmFtZSA9IHBhcnRzLnNoaWZ0KCk7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShuYW1lKSAmJiBpc1ByZXNlbnQob2JqW25hbWVdKSkge1xuICAgICAgb2JqID0gb2JqW25hbWVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmogPSBvYmpbbmFtZV0gPSB7fTtcbiAgICB9XG4gIH1cbiAgaWYgKG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbCkge1xuICAgIG9iaiA9IHt9O1xuICB9XG4gIG9ialtwYXJ0cy5zaGlmdCgpXSA9IHZhbHVlO1xufVxuXG4vLyBXaGVuIFN5bWJvbC5pdGVyYXRvciBkb2Vzbid0IGV4aXN0LCByZXRyaWV2ZXMgdGhlIGtleSB1c2VkIGluIGVzNi1zaGltXG5kZWNsYXJlIHZhciBTeW1ib2w7XG52YXIgX3N5bWJvbEl0ZXJhdG9yID0gbnVsbDtcbmV4cG9ydCBmdW5jdGlvbiBnZXRTeW1ib2xJdGVyYXRvcigpOiBzdHJpbmcgfCBzeW1ib2wge1xuICBpZiAoaXNCbGFuayhfc3ltYm9sSXRlcmF0b3IpKSB7XG4gICAgaWYgKGlzUHJlc2VudCgoPGFueT5nbG9iYWxTY29wZSkuU3ltYm9sKSAmJiBpc1ByZXNlbnQoU3ltYm9sLml0ZXJhdG9yKSkge1xuICAgICAgX3N5bWJvbEl0ZXJhdG9yID0gU3ltYm9sLml0ZXJhdG9yO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBlczYtc2hpbSBzcGVjaWZpYyBsb2dpY1xuICAgICAgdmFyIGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhNYXAucHJvdG90eXBlKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgaWYgKGtleSAhPT0gJ2VudHJpZXMnICYmIGtleSAhPT0gJ3NpemUnICYmXG4gICAgICAgICAgICBNYXAucHJvdG90eXBlW2tleV0gPT09IE1hcC5wcm90b3R5cGVbJ2VudHJpZXMnXSkge1xuICAgICAgICAgIF9zeW1ib2xJdGVyYXRvciA9IGtleTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gX3N5bWJvbEl0ZXJhdG9yO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXZhbEV4cHJlc3Npb24oc291cmNlVXJsOiBzdHJpbmcsIGV4cHI6IHN0cmluZywgZGVjbGFyYXRpb25zOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyczoge1trZXk6IHN0cmluZ106IGFueX0pOiBhbnkge1xuICB2YXIgZm5Cb2R5ID0gYCR7ZGVjbGFyYXRpb25zfVxcbnJldHVybiAke2V4cHJ9XFxuLy8jIHNvdXJjZVVSTD0ke3NvdXJjZVVybH1gO1xuICB2YXIgZm5BcmdOYW1lcyA9IFtdO1xuICB2YXIgZm5BcmdWYWx1ZXMgPSBbXTtcbiAgZm9yICh2YXIgYXJnTmFtZSBpbiB2YXJzKSB7XG4gICAgZm5BcmdOYW1lcy5wdXNoKGFyZ05hbWUpO1xuICAgIGZuQXJnVmFsdWVzLnB1c2godmFyc1thcmdOYW1lXSk7XG4gIH1cbiAgcmV0dXJuIG5ldyBGdW5jdGlvbiguLi5mbkFyZ05hbWVzLmNvbmNhdChmbkJvZHkpKSguLi5mbkFyZ1ZhbHVlcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1ByaW1pdGl2ZShvYmo6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gIWlzSnNPYmplY3Qob2JqKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc0NvbnN0cnVjdG9yKHZhbHVlOiBPYmplY3QsIHR5cGU6IFR5cGUpOiBib29sZWFuIHtcbiAgcmV0dXJuIHZhbHVlLmNvbnN0cnVjdG9yID09PSB0eXBlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYml0V2lzZU9yKHZhbHVlczogbnVtYmVyW10pOiBudW1iZXIge1xuICByZXR1cm4gdmFsdWVzLnJlZHVjZSgoYSwgYikgPT4geyByZXR1cm4gYSB8IGI7IH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYml0V2lzZUFuZCh2YWx1ZXM6IG51bWJlcltdKTogbnVtYmVyIHtcbiAgcmV0dXJuIHZhbHVlcy5yZWR1Y2UoKGEsIGIpID0+IHsgcmV0dXJuIGEgJiBiOyB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZShzOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gX2dsb2JhbC5lbmNvZGVVUkkocyk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
