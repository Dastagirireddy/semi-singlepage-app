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
    function isNumber(obj) {
        return typeof obj === 'number';
    }
    exports_1("isNumber", isNumber);
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
            if (isPresent(Symbol) && isPresent(Symbol.iterator)) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2ZhY2FkZS9sYW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O1FBd0JJLFdBQVcsRUFnQkYsT0FBTyxFQUloQixPQUFPLEVBSUEsSUFBSSxFQXVCSixJQUFJLEVBQ0osSUFBSSxFQUVYLFFBQVEsRUFDUixXQUFXLGdFQXVQSixNQUFNLDJFQTRIYixlQUFlO0lBMVpuQiwyQkFBa0MsRUFBWTtRQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFGRCxpREFFQyxDQUFBO0lBeUJELGlDQUF3QyxJQUFVO1FBQ2hELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QixDQUFDO1FBQ0QsTUFBTSxDQUFDLE9BQU8sSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFMRCw2REFLQyxDQUFBO0lBU0Q7UUFDRSxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFGRCwrQkFFQyxDQUFBO0lBRUQ7Ozs7Ozs7T0FPRztJQUNIO1FBQ0UsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNoQix1RUFBdUU7WUFDdkUsTUFBTSwrQ0FBK0MsQ0FBQztRQUN4RCxDQUFDO1FBQ0QsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUNuQixDQUFDO0lBTkQsMkNBTUMsQ0FBQTtJQUVEO1FBQ0UsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRkQsaURBRUMsQ0FBQTtJQVNELDRFQUE0RTtJQUM1RSxnRUFBZ0U7SUFDaEUsb0JBQThCLElBQU87UUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFGRCxtQ0FFQyxDQUFBO0lBRUQ7UUFDRSxNQUFNLENBQUMs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QVksRUFBRSxLQUFpQixFQUFFLEdBQWUsRUFBRSxJQUFnQixFQUNsRSxPQUFtQixFQUFFLE9BQW1CLEVBQUUsWUFBd0I7b0JBRHBELHFCQUFpQixHQUFqQixTQUFpQjtvQkFBRSxtQkFBZSxHQUFmLE9BQWU7b0JBQUUsb0JBQWdCLEdBQWhCLFFBQWdCO29CQUNsRSx1QkFBbUIsR0FBbkIsV0FBbUI7b0JBQUUsdUJBQW1CLEdBQW5CLFdBQW1CO29CQUFFLDRCQUF3QixHQUF4QixnQkFBd0I7b0JBQzlFLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQzlFLENBQUM7Z0JBQ00seUJBQWEsR0FBcEIsVUFBcUIsR0FBVyxJQUFVLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFELHNCQUFVLEdBQWpCLFVBQWtCLEVBQVUsSUFBVSxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyRCxvQkFBUSxHQUFmLFVBQWdCLElBQVUsSUFBWSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDdkQsZUFBRyxHQUFWLGNBQXFCLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDbEMsa0JBQU0sR0FBYixVQUFjLElBQVUsSUFBWSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDN0Qsa0JBQUM7WUFBRCxDQVZBLEFBVUMsSUFBQTtZQVZELHFDQVVDLENBQUE7WUFxQkcsZUFBZSxHQUFHLElBQUksQ0FBQyIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9mYWNhZGUvbGFuZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgQnJvd3Nlck5vZGVHbG9iYWwge1xuICBPYmplY3Q6IHR5cGVvZiBPYmplY3Q7XG4gIEFycmF5OiB0eXBlb2YgQXJyYXk7XG4gIE1hcDogdHlwZW9mIE1hcDtcbiAgU2V0OiB0eXBlb2YgU2V0O1xuICBEYXRlOiBEYXRlQ29uc3RydWN0b3I7XG4gIFJlZ0V4cDogUmVnRXhwQ29uc3RydWN0b3I7XG4gIEpTT046IHR5cGVvZiBKU09OO1xuICBNYXRoOiBhbnk7ICAvLyB0eXBlb2YgTWF0aDtcbiAgYXNzZXJ0KGNvbmRpdGlvbjogYW55KTogdm9pZDtcbiAgUmVmbGVjdDogYW55O1xuICBnZXRBbmd1bGFyVGVzdGFiaWxpdHk6IEZ1bmN0aW9uO1xuICBnZXRBbGxBbmd1bGFyVGVzdGFiaWxpdGllczogRnVuY3Rpb247XG4gIGdldEFsbEFuZ3VsYXJSb290RWxlbWVudHM6IEZ1bmN0aW9uO1xuICBmcmFtZXdvcmtTdGFiaWxpemVyczogQXJyYXk8RnVuY3Rpb24+O1xuICBzZXRUaW1lb3V0OiBGdW5jdGlvbjtcbiAgY2xlYXJUaW1lb3V0OiBGdW5jdGlvbjtcbiAgc2V0SW50ZXJ2YWw6IEZ1bmN0aW9uO1xuICBjbGVhckludGVydmFsOiBGdW5jdGlvbjtcbiAgZW5jb2RlVVJJOiBGdW5jdGlvbjtcbn1cblxuLy8gVE9ETyhqdGVwbGl0ejYwMik6IExvYWQgV29ya2VyR2xvYmFsU2NvcGUgZnJvbSBsaWIud2Vid29ya2VyLmQudHMgZmlsZSAjMzQ5MlxuZGVjbGFyZSB2YXIgV29ya2VyR2xvYmFsU2NvcGU7XG52YXIgZ2xvYmFsU2NvcGU6IEJyb3dzZXJOb2RlR2xvYmFsO1xuaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gIGlmICh0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgIT09ICd1bmRlZmluZWQnICYmIHNlbGYgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZSkge1xuICAgIC8vIFRPRE86IFJlcGxhY2UgYW55IHdpdGggV29ya2VyR2xvYmFsU2NvcGUgZnJvbSBsaWIud2Vid29ya2VyLmQudHMgIzM0OTJcbiAgICBnbG9iYWxTY29wZSA9IDxhbnk+c2VsZjtcbiAgfSBlbHNlIHtcbiAgICBnbG9iYWxTY29wZSA9IDxhbnk+Z2xvYmFsO1xuICB9XG59IGVsc2Uge1xuICBnbG9iYWxTY29wZSA9IDxhbnk+d2luZG93O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2NoZWR1bGVNaWNyb1Rhc2soZm46IEZ1bmN0aW9uKSB7XG4gIFpvbmUuY3VycmVudC5zY2hlZHVsZU1pY3JvVGFzaygnc2NoZWR1bGVNaWNyb3Rhc2snLCBmbik7XG59XG5cbmV4cG9ydCBjb25zdCBJU19EQVJUID0gZmFsc2U7XG5cbi8vIE5lZWQgdG8gZGVjbGFyZSBhIG5ldyB2YXJpYWJsZSBmb3IgZ2xvYmFsIGhlcmUgc2luY2UgVHlwZVNjcmlwdFxuLy8gZXhwb3J0cyB0aGUgb3JpZ2luYWwgdmFsdWUgb2YgdGhlIHN5bWJvbC5cbnZhciBfZ2xvYmFsOiBCcm93c2VyTm9kZUdsb2JhbCA9IGdsb2JhbFNjb3BlO1xuXG5leHBvcnQge19nbG9iYWwgYXMgZ2xvYmFsfTtcblxuZXhwb3J0IHZhciBUeXBlID0gRnVuY3Rpb247XG5cbi8qKlxuICogUnVudGltZSByZXByZXNlbnRhdGlvbiBhIHR5cGUgdGhhdCBhIENvbXBvbmVudCBvciBvdGhlciBvYmplY3QgaXMgaW5zdGFuY2VzIG9mLlxuICpcbiAqIEFuIGV4YW1wbGUgb2YgYSBgVHlwZWAgaXMgYE15Q3VzdG9tQ29tcG9uZW50YCBjbGFzcywgd2hpY2ggaW4gSmF2YVNjcmlwdCBpcyBiZSByZXByZXNlbnRlZCBieVxuICogdGhlIGBNeUN1c3RvbUNvbXBvbmVudGAgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVHlwZSBleHRlbmRzIEZ1bmN0aW9uIHt9XG5cbi8qKlxuICogUnVudGltZSByZXByZXNlbnRhdGlvbiBvZiBhIHR5cGUgdGhhdCBpcyBjb25zdHJ1Y3RhYmxlIChub24tYWJzdHJhY3QpLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbmNyZXRlVHlwZSBleHRlbmRzIFR5cGUgeyBuZXcgKC4uLmFyZ3MpOiBhbnk7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFR5cGVOYW1lRm9yRGVidWdnaW5nKHR5cGU6IFR5cGUpOiBzdHJpbmcge1xuICBpZiAodHlwZVsnbmFtZSddKSB7XG4gICAgcmV0dXJuIHR5cGVbJ25hbWUnXTtcbiAgfVxuICByZXR1cm4gdHlwZW9mIHR5cGU7XG59XG5cblxuZXhwb3J0IHZhciBNYXRoID0gX2dsb2JhbC5NYXRoO1xuZXhwb3J0IHZhciBEYXRlID0gX2dsb2JhbC5EYXRlO1xuXG52YXIgX2Rldk1vZGU6IGJvb2xlYW4gPSB0cnVlO1xudmFyIF9tb2RlTG9ja2VkOiBib29sZWFuID0gZmFsc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2NrTW9kZSgpIHtcbiAgX21vZGVMb2NrZWQgPSB0cnVlO1xufVxuXG4vKipcbiAqIERpc2FibGUgQW5ndWxhcidzIGRldmVsb3BtZW50IG1vZGUsIHdoaWNoIHR1cm5zIG9mZiBhc3NlcnRpb25zIGFuZCBvdGhlclxuICogY2hlY2tzIHdpdGhpbiB0aGUgZnJhbWV3b3JrLlxuICpcbiAqIE9uZSBpbXBvcnRhbnQgYXNzZXJ0aW9uIHRoaXMgZGlzYWJsZXMgdmVyaWZpZXMgdGhhdCBhIGNoYW5nZSBkZXRlY3Rpb24gcGFzc1xuICogZG9lcyBub3QgcmVzdWx0IGluIGFkZGl0aW9uYWwgY2hhbmdlcyB0byBhbnkgYmluZGluZ3MgKGFsc28ga25vd24gYXNcbiAqIHVuaWRpcmVjdGlvbmFsIGRhdGEgZmxvdykuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbmFibGVQcm9kTW9kZSgpIHtcbiAgaWYgKF9tb2RlTG9ja2VkKSB7XG4gICAgLy8gQ2Fubm90IHVzZSBCYXNlRXhjZXB0aW9uIGFzIHRoYXQgZW5kcyB1cCBpbXBvcnRpbmcgZnJvbSBmYWNhZGUvbGFuZy5cbiAgICB0aHJvdyAnQ2Fubm90IGVuYWJsZSBwcm9kIG1vZGUgYWZ0ZXIgcGxhdGZvcm0gc2V0dXAuJztcbiAgfVxuICBfZGV2TW9kZSA9IGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0aW9uc0VuYWJsZWQoKTogYm9vbGVhbiB7XG4gIHJldHVybiBfZGV2TW9kZTtcbn1cblxuLy8gVE9ETzogcmVtb3ZlIGNhbGxzIHRvIGFzc2VydCBpbiBwcm9kdWN0aW9uIGVudmlyb25tZW50XG4vLyBOb3RlOiBDYW4ndCBqdXN0IGV4cG9ydCB0aGlzIGFuZCBpbXBvcnQgaW4gaW4gb3RoZXIgZmlsZXNcbi8vIGFzIGBhc3NlcnRgIGlzIGEgcmVzZXJ2ZWQga2V5d29yZCBpbiBEYXJ0XG5fZ2xvYmFsLmFzc2VydCA9IGZ1bmN0aW9uIGFzc2VydChjb25kaXRpb24pIHtcbiAgLy8gVE9ETzogdG8gYmUgZml4ZWQgcHJvcGVybHkgdmlhICMyODMwLCBub29wIGZvciBub3dcbn07XG5cbi8vIFRoaXMgZnVuY3Rpb24gaXMgbmVlZGVkIG9ubHkgdG8gcHJvcGVybHkgc3VwcG9ydCBEYXJ0J3MgY29uc3QgZXhwcmVzc2lvbnNcbi8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci90czJkYXJ0L3B1bGwvMTUxIGZvciBtb3JlIGluZm9cbmV4cG9ydCBmdW5jdGlvbiBDT05TVF9FWFBSPFQ+KGV4cHI6IFQpOiBUIHtcbiAgcmV0dXJuIGV4cHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDT05TVCgpOiBDbGFzc0RlY29yYXRvciAmIFByb3BlcnR5RGVjb3JhdG9yIHtcbiAgcmV0dXJuICh0YXJnZXQpID0+IHRhcmdldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJlc2VudChvYmo6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gb2JqICE9PSB1bmRlZmluZWQgJiYgb2JqICE9PSBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCbGFuayhvYmo6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gb2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwic3RyaW5nXCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Z1bmN0aW9uKG9iajogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1R5cGUob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIGlzRnVuY3Rpb24ob2JqKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nTWFwKG9iajogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiBvYmogIT09IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1Byb21pc2Uob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mICg8YW55Pl9nbG9iYWwpLlByb21pc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FycmF5KG9iajogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KG9iaik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcihvYmopOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdudW1iZXInO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEYXRlKG9iaik6IGJvb2xlYW4ge1xuICByZXR1cm4gb2JqIGluc3RhbmNlb2YgRGF0ZSAmJiAhaXNOYU4ob2JqLnZhbHVlT2YoKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub29wKCkge31cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeSh0b2tlbik6IHN0cmluZyB7XG4gIGlmICh0eXBlb2YgdG9rZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHRva2VuO1xuICB9XG5cbiAgaWYgKHRva2VuID09PSB1bmRlZmluZWQgfHwgdG9rZW4gPT09IG51bGwpIHtcbiAgICByZXR1cm4gJycgKyB0b2tlbjtcbiAgfVxuXG4gIGlmICh0b2tlbi5uYW1lKSB7XG4gICAgcmV0dXJuIHRva2VuLm5hbWU7XG4gIH1cbiAgaWYgKHRva2VuLm92ZXJyaWRkZW5OYW1lKSB7XG4gICAgcmV0dXJuIHRva2VuLm92ZXJyaWRkZW5OYW1lO1xuICB9XG5cbiAgdmFyIHJlcyA9IHRva2VuLnRvU3RyaW5nKCk7XG4gIHZhciBuZXdMaW5lSW5kZXggPSByZXMuaW5kZXhPZihcIlxcblwiKTtcbiAgcmV0dXJuIChuZXdMaW5lSW5kZXggPT09IC0xKSA/IHJlcyA6IHJlcy5zdWJzdHJpbmcoMCwgbmV3TGluZUluZGV4KTtcbn1cblxuLy8gc2VyaWFsaXplIC8gZGVzZXJpYWxpemUgZW51bSBleGlzdCBvbmx5IGZvciBjb25zaXN0ZW5jeSB3aXRoIGRhcnQgQVBJXG4vLyBlbnVtcyBpbiB0eXBlc2NyaXB0IGRvbid0IG5lZWQgdG8gYmUgc2VyaWFsaXplZFxuXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplRW51bSh2YWwpOiBudW1iZXIge1xuICByZXR1cm4gdmFsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVzZXJpYWxpemVFbnVtKHZhbCwgdmFsdWVzOiBNYXA8bnVtYmVyLCBhbnk+KTogYW55IHtcbiAgcmV0dXJuIHZhbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVFbnVtVG9rZW4oZW51bVZhbHVlLCB2YWwpOiBzdHJpbmcge1xuICByZXR1cm4gZW51bVZhbHVlW3ZhbF07XG59XG5cbmV4cG9ydCBjbGFzcyBTdHJpbmdXcmFwcGVyIHtcbiAgc3RhdGljIGZyb21DaGFyQ29kZShjb2RlOiBudW1iZXIpOiBzdHJpbmcgeyByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTsgfVxuXG4gIHN0YXRpYyBjaGFyQ29kZUF0KHM6IHN0cmluZywgaW5kZXg6IG51bWJlcik6IG51bWJlciB7IHJldHVybiBzLmNoYXJDb2RlQXQoaW5kZXgpOyB9XG5cbiAgc3RhdGljIHNwbGl0KHM6IHN0cmluZywgcmVnRXhwOiBSZWdFeHApOiBzdHJpbmdbXSB7IHJldHVybiBzLnNwbGl0KHJlZ0V4cCk7IH1cblxuICBzdGF0aWMgZXF1YWxzKHM6IHN0cmluZywgczI6IHN0cmluZyk6IGJvb2xlYW4geyByZXR1cm4gcyA9PT0gczI7IH1cblxuICBzdGF0aWMgc3RyaXBMZWZ0KHM6IHN0cmluZywgY2hhclZhbDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAocyAmJiBzLmxlbmd0aCkge1xuICAgICAgdmFyIHBvcyA9IDA7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNbaV0gIT0gY2hhclZhbCkgYnJlYWs7XG4gICAgICAgIHBvcysrO1xuICAgICAgfVxuICAgICAgcyA9IHMuc3Vic3RyaW5nKHBvcyk7XG4gICAgfVxuICAgIHJldHVybiBzO1xuICB9XG5cbiAgc3RhdGljIHN0cmlwUmlnaHQoczogc3RyaW5nLCBjaGFyVmFsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmIChzICYmIHMubGVuZ3RoKSB7XG4gICAgICB2YXIgcG9zID0gcy5sZW5ndGg7XG4gICAgICBmb3IgKHZhciBpID0gcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBpZiAoc1tpXSAhPSBjaGFyVmFsKSBicmVhaztcbiAgICAgICAgcG9zLS07XG4gICAgICB9XG4gICAgICBzID0gcy5zdWJzdHJpbmcoMCwgcG9zKTtcbiAgICB9XG4gICAgcmV0dXJuIHM7XG4gIH1cblxuICBzdGF0aWMgcmVwbGFjZShzOiBzdHJpbmcsIGZyb206IHN0cmluZywgcmVwbGFjZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gcy5yZXBsYWNlKGZyb20sIHJlcGxhY2UpO1xuICB9XG5cbiAgc3RhdGljIHJlcGxhY2VBbGwoczogc3RyaW5nLCBmcm9tOiBSZWdFeHAsIHJlcGxhY2U6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHMucmVwbGFjZShmcm9tLCByZXBsYWNlKTtcbiAgfVxuXG4gIHN0YXRpYyBzbGljZTxUPihzOiBzdHJpbmcsIGZyb206IG51bWJlciA9IDAsIHRvOiBudW1iZXIgPSBudWxsKTogc3RyaW5nIHtcbiAgICByZXR1cm4gcy5zbGljZShmcm9tLCB0byA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IHRvKTtcbiAgfVxuXG4gIHN0YXRpYyByZXBsYWNlQWxsTWFwcGVkKHM6IHN0cmluZywgZnJvbTogUmVnRXhwLCBjYjogRnVuY3Rpb24pOiBzdHJpbmcge1xuICAgIHJldHVybiBzLnJlcGxhY2UoZnJvbSwgZnVuY3Rpb24oLi4ubWF0Y2hlcykge1xuICAgICAgLy8gUmVtb3ZlIG9mZnNldCAmIHN0cmluZyBmcm9tIHRoZSByZXN1bHQgYXJyYXlcbiAgICAgIG1hdGNoZXMuc3BsaWNlKC0yLCAyKTtcbiAgICAgIC8vIFRoZSBjYWxsYmFjayByZWNlaXZlcyBtYXRjaCwgcDEsIC4uLiwgcG5cbiAgICAgIHJldHVybiBjYihtYXRjaGVzKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBjb250YWlucyhzOiBzdHJpbmcsIHN1YnN0cjogc3RyaW5nKTogYm9vbGVhbiB7IHJldHVybiBzLmluZGV4T2Yoc3Vic3RyKSAhPSAtMTsgfVxuXG4gIHN0YXRpYyBjb21wYXJlKGE6IHN0cmluZywgYjogc3RyaW5nKTogbnVtYmVyIHtcbiAgICBpZiAoYSA8IGIpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9IGVsc2UgaWYgKGEgPiBiKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTdHJpbmdKb2luZXIge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGFydHMgPSBbXSkge31cblxuICBhZGQocGFydDogc3RyaW5nKTogdm9pZCB7IHRoaXMucGFydHMucHVzaChwYXJ0KTsgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLnBhcnRzLmpvaW4oXCJcIik7IH1cbn1cblxuZXhwb3J0IGNsYXNzIE51bWJlclBhcnNlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIG5hbWU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbWVzc2FnZTogc3RyaW5nKSB7IHN1cGVyKCk7IH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5tZXNzYWdlOyB9XG59XG5cblxuZXhwb3J0IGNsYXNzIE51bWJlcldyYXBwZXIge1xuICBzdGF0aWMgdG9GaXhlZChuOiBudW1iZXIsIGZyYWN0aW9uRGlnaXRzOiBudW1iZXIpOiBzdHJpbmcgeyByZXR1cm4gbi50b0ZpeGVkKGZyYWN0aW9uRGlnaXRzKTsgfVxuXG4gIHN0YXRpYyBlcXVhbChhOiBudW1iZXIsIGI6IG51bWJlcik6IGJvb2xlYW4geyByZXR1cm4gYSA9PT0gYjsgfVxuXG4gIHN0YXRpYyBwYXJzZUludEF1dG9SYWRpeCh0ZXh0OiBzdHJpbmcpOiBudW1iZXIge1xuICAgIHZhciByZXN1bHQ6IG51bWJlciA9IHBhcnNlSW50KHRleHQpO1xuICAgIGlmIChpc05hTihyZXN1bHQpKSB7XG4gICAgICB0aHJvdyBuZXcgTnVtYmVyUGFyc2VFcnJvcihcIkludmFsaWQgaW50ZWdlciBsaXRlcmFsIHdoZW4gcGFyc2luZyBcIiArIHRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgc3RhdGljIHBhcnNlSW50KHRleHQ6IHN0cmluZywgcmFkaXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKHJhZGl4ID09IDEwKSB7XG4gICAgICBpZiAoL14oXFwtfFxcKyk/WzAtOV0rJC8udGVzdCh0ZXh0KSkge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQodGV4dCwgcmFkaXgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocmFkaXggPT0gMTYpIHtcbiAgICAgIGlmICgvXihcXC18XFwrKT9bMC05QUJDREVGYWJjZGVmXSskLy50ZXN0KHRleHQpKSB7XG4gICAgICAgIHJldHVybiBwYXJzZUludCh0ZXh0LCByYWRpeCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciByZXN1bHQ6IG51bWJlciA9IHBhcnNlSW50KHRleHQsIHJhZGl4KTtcbiAgICAgIGlmICghaXNOYU4ocmVzdWx0KSkge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBuZXcgTnVtYmVyUGFyc2VFcnJvcihcIkludmFsaWQgaW50ZWdlciBsaXRlcmFsIHdoZW4gcGFyc2luZyBcIiArIHRleHQgKyBcIiBpbiBiYXNlIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRpeCk7XG4gIH1cblxuICAvLyBUT0RPOiBOYU4gaXMgYSB2YWxpZCBsaXRlcmFsIGJ1dCBpcyByZXR1cm5lZCBieSBwYXJzZUZsb2F0IHRvIGluZGljYXRlIGFuIGVycm9yLlxuICBzdGF0aWMgcGFyc2VGbG9hdCh0ZXh0OiBzdHJpbmcpOiBudW1iZXIgeyByZXR1cm4gcGFyc2VGbG9hdCh0ZXh0KTsgfVxuXG4gIHN0YXRpYyBnZXQgTmFOKCk6IG51bWJlciB7IHJldHVybiBOYU47IH1cblxuICBzdGF0aWMgaXNOYU4odmFsdWU6IGFueSk6IGJvb2xlYW4geyByZXR1cm4gaXNOYU4odmFsdWUpOyB9XG5cbiAgc3RhdGljIGlzSW50ZWdlcih2YWx1ZTogYW55KTogYm9vbGVhbiB7IHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKTsgfVxufVxuXG5leHBvcnQgdmFyIFJlZ0V4cCA9IF9nbG9iYWwuUmVnRXhwO1xuXG5leHBvcnQgY2xhc3MgUmVnRXhwV3JhcHBlciB7XG4gIHN0YXRpYyBjcmVhdGUocmVnRXhwU3RyOiBzdHJpbmcsIGZsYWdzOiBzdHJpbmcgPSAnJyk6IFJlZ0V4cCB7XG4gICAgZmxhZ3MgPSBmbGFncy5yZXBsYWNlKC9nL2csICcnKTtcbiAgICByZXR1cm4gbmV3IF9nbG9iYWwuUmVnRXhwKHJlZ0V4cFN0ciwgZmxhZ3MgKyAnZycpO1xuICB9XG4gIHN0YXRpYyBmaXJzdE1hdGNoKHJlZ0V4cDogUmVnRXhwLCBpbnB1dDogc3RyaW5nKTogUmVnRXhwRXhlY0FycmF5IHtcbiAgICAvLyBSZXNldCBtdWx0aW1hdGNoIHJlZ2V4IHN0YXRlXG4gICAgcmVnRXhwLmxhc3RJbmRleCA9IDA7XG4gICAgcmV0dXJuIHJlZ0V4cC5leGVjKGlucHV0KTtcbiAgfVxuICBzdGF0aWMgdGVzdChyZWdFeHA6IFJlZ0V4cCwgaW5wdXQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJlZ0V4cC5sYXN0SW5kZXggPSAwO1xuICAgIHJldHVybiByZWdFeHAudGVzdChpbnB1dCk7XG4gIH1cbiAgc3RhdGljIG1hdGNoZXIocmVnRXhwOiBSZWdFeHAsIGlucHV0OiBzdHJpbmcpOiB7XG4gICAgcmU6IFJlZ0V4cDtcbiAgICBpbnB1dDogc3RyaW5nXG4gIH1cbiAge1xuICAgIC8vIFJlc2V0IHJlZ2V4IHN0YXRlIGZvciB0aGUgY2FzZVxuICAgIC8vIHNvbWVvbmUgZGlkIG5vdCBsb29wIG92ZXIgYWxsIG1hdGNoZXNcbiAgICAvLyBsYXN0IHRpbWUuXG4gICAgcmVnRXhwLmxhc3RJbmRleCA9IDA7XG4gICAgcmV0dXJuIHtyZTogcmVnRXhwLCBpbnB1dDogaW5wdXR9O1xuICB9XG4gIHN0YXRpYyByZXBsYWNlQWxsKHJlZ0V4cDogUmVnRXhwLCBpbnB1dDogc3RyaW5nLCByZXBsYWNlOiBGdW5jdGlvbik6IHN0cmluZyB7XG4gICAgbGV0IGMgPSByZWdFeHAuZXhlYyhpbnB1dCk7XG4gICAgbGV0IHJlcyA9ICcnO1xuICAgIHJlZ0V4cC5sYXN0SW5kZXggPSAwO1xuICAgIGxldCBwcmV2ID0gMDtcbiAgICB3aGlsZSAoYykge1xuICAgICAgcmVzICs9IGlucHV0LnN1YnN0cmluZyhwcmV2LCBjLmluZGV4KTtcbiAgICAgIHJlcyArPSByZXBsYWNlKGMpO1xuICAgICAgcHJldiA9IGMuaW5kZXggKyBjWzBdLmxlbmd0aDtcbiAgICAgIHJlZ0V4cC5sYXN0SW5kZXggPSBwcmV2O1xuICAgICAgYyA9IHJlZ0V4cC5leGVjKGlucHV0KTtcbiAgICB9XG4gICAgcmVzICs9IGlucHV0LnN1YnN0cmluZyhwcmV2KTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZWdFeHBNYXRjaGVyV3JhcHBlciB7XG4gIHN0YXRpYyBuZXh0KG1hdGNoZXI6IHtcbiAgICByZTogUmVnRXhwO1xuICAgIGlucHV0OiBzdHJpbmdcbiAgfSk6IFJlZ0V4cEV4ZWNBcnJheSB7XG4gICAgcmV0dXJuIG1hdGNoZXIucmUuZXhlYyhtYXRjaGVyLmlucHV0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRnVuY3Rpb25XcmFwcGVyIHtcbiAgc3RhdGljIGFwcGx5KGZuOiBGdW5jdGlvbiwgcG9zQXJnczogYW55KTogYW55IHsgcmV0dXJuIGZuLmFwcGx5KG51bGwsIHBvc0FyZ3MpOyB9XG59XG5cbi8vIEpTIGhhcyBOYU4gIT09IE5hTlxuZXhwb3J0IGZ1bmN0aW9uIGxvb3NlSWRlbnRpY2FsKGEsIGIpOiBib29sZWFuIHtcbiAgcmV0dXJuIGEgPT09IGIgfHwgdHlwZW9mIGEgPT09IFwibnVtYmVyXCIgJiYgdHlwZW9mIGIgPT09IFwibnVtYmVyXCIgJiYgaXNOYU4oYSkgJiYgaXNOYU4oYik7XG59XG5cbi8vIEpTIGNvbnNpZGVycyBOYU4gaXMgdGhlIHNhbWUgYXMgTmFOIGZvciBtYXAgS2V5ICh3aGlsZSBOYU4gIT09IE5hTiBvdGhlcndpc2UpXG4vLyBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWFwXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWFwS2V5PFQ+KHZhbHVlOiBUKTogVCB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUJsYW5rKG9iajogT2JqZWN0KTogYW55IHtcbiAgcmV0dXJuIGlzQmxhbmsob2JqKSA/IG51bGwgOiBvYmo7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVCb29sKG9iajogYm9vbGVhbik6IGJvb2xlYW4ge1xuICByZXR1cm4gaXNCbGFuayhvYmopID8gZmFsc2UgOiBvYmo7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0pzT2JqZWN0KG86IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gbyAhPT0gbnVsbCAmJiAodHlwZW9mIG8gPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgbyA9PT0gXCJvYmplY3RcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmludChvYmo6IEVycm9yIHwgT2JqZWN0KSB7XG4gIGNvbnNvbGUubG9nKG9iaik7XG59XG5cbi8vIENhbid0IGJlIGFsbCB1cHBlcmNhc2UgYXMgb3VyIHRyYW5zcGlsZXIgd291bGQgdGhpbmsgaXQgaXMgYSBzcGVjaWFsIGRpcmVjdGl2ZS4uLlxuZXhwb3J0IGNsYXNzIEpzb24ge1xuICBzdGF0aWMgcGFyc2Uoczogc3RyaW5nKTogT2JqZWN0IHsgcmV0dXJuIF9nbG9iYWwuSlNPTi5wYXJzZShzKTsgfVxuICBzdGF0aWMgc3RyaW5naWZ5KGRhdGE6IE9iamVjdCk6IHN0cmluZyB7XG4gICAgLy8gRGFydCBkb2Vzbid0IHRha2UgMyBhcmd1bWVudHNcbiAgICByZXR1cm4gX2dsb2JhbC5KU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGF0ZVdyYXBwZXIge1xuICBzdGF0aWMgY3JlYXRlKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciA9IDEsIGRheTogbnVtYmVyID0gMSwgaG91cjogbnVtYmVyID0gMCxcbiAgICAgICAgICAgICAgICBtaW51dGVzOiBudW1iZXIgPSAwLCBzZWNvbmRzOiBudW1iZXIgPSAwLCBtaWxsaXNlY29uZHM6IG51bWJlciA9IDApOiBEYXRlIHtcbiAgICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXksIGhvdXIsIG1pbnV0ZXMsIHNlY29uZHMsIG1pbGxpc2Vjb25kcyk7XG4gIH1cbiAgc3RhdGljIGZyb21JU09TdHJpbmcoc3RyOiBzdHJpbmcpOiBEYXRlIHsgcmV0dXJuIG5ldyBEYXRlKHN0cik7IH1cbiAgc3RhdGljIGZyb21NaWxsaXMobXM6IG51bWJlcik6IERhdGUgeyByZXR1cm4gbmV3IERhdGUobXMpOyB9XG4gIHN0YXRpYyB0b01pbGxpcyhkYXRlOiBEYXRlKTogbnVtYmVyIHsgcmV0dXJuIGRhdGUuZ2V0VGltZSgpOyB9XG4gIHN0YXRpYyBub3coKTogRGF0ZSB7IHJldHVybiBuZXcgRGF0ZSgpOyB9XG4gIHN0YXRpYyB0b0pzb24oZGF0ZTogRGF0ZSk6IHN0cmluZyB7IHJldHVybiBkYXRlLnRvSlNPTigpOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRWYWx1ZU9uUGF0aChnbG9iYWw6IGFueSwgcGF0aDogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gIHZhciBwYXJ0cyA9IHBhdGguc3BsaXQoJy4nKTtcbiAgdmFyIG9iajogYW55ID0gZ2xvYmFsO1xuICB3aGlsZSAocGFydHMubGVuZ3RoID4gMSkge1xuICAgIHZhciBuYW1lID0gcGFydHMuc2hpZnQoKTtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KG5hbWUpICYmIGlzUHJlc2VudChvYmpbbmFtZV0pKSB7XG4gICAgICBvYmogPSBvYmpbbmFtZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIG9iaiA9IG9ialtuYW1lXSA9IHt9O1xuICAgIH1cbiAgfVxuICBpZiAob2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsKSB7XG4gICAgb2JqID0ge307XG4gIH1cbiAgb2JqW3BhcnRzLnNoaWZ0KCldID0gdmFsdWU7XG59XG5cbi8vIFdoZW4gU3ltYm9sLml0ZXJhdG9yIGRvZXNuJ3QgZXhpc3QsIHJldHJpZXZlcyB0aGUga2V5IHVzZWQgaW4gZXM2LXNoaW1cbmRlY2xhcmUgdmFyIFN5bWJvbDtcbnZhciBfc3ltYm9sSXRlcmF0b3IgPSBudWxsO1xuZXhwb3J0IGZ1bmN0aW9uIGdldFN5bWJvbEl0ZXJhdG9yKCk6IHN0cmluZyB8IHN5bWJvbCB7XG4gIGlmIChpc0JsYW5rKF9zeW1ib2xJdGVyYXRvcikpIHtcbiAgICBpZiAoaXNQcmVzZW50KFN5bWJvbCkgJiYgaXNQcmVzZW50KFN5bWJvbC5pdGVyYXRvcikpIHtcbiAgICAgIF9zeW1ib2xJdGVyYXRvciA9IFN5bWJvbC5pdGVyYXRvcjtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZXM2LXNoaW0gc3BlY2lmaWMgbG9naWNcbiAgICAgIHZhciBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTWFwLnByb3RvdHlwZSk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgIGlmIChrZXkgIT09ICdlbnRyaWVzJyAmJiBrZXkgIT09ICdzaXplJyAmJlxuICAgICAgICAgICAgTWFwLnByb3RvdHlwZVtrZXldID09PSBNYXAucHJvdG90eXBlWydlbnRyaWVzJ10pIHtcbiAgICAgICAgICBfc3ltYm9sSXRlcmF0b3IgPSBrZXk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIF9zeW1ib2xJdGVyYXRvcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV2YWxFeHByZXNzaW9uKHNvdXJjZVVybDogc3RyaW5nLCBleHByOiBzdHJpbmcsIGRlY2xhcmF0aW9uczogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcnM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogYW55IHtcbiAgdmFyIGZuQm9keSA9IGAke2RlY2xhcmF0aW9uc31cXG5yZXR1cm4gJHtleHByfVxcbi8vIyBzb3VyY2VVUkw9JHtzb3VyY2VVcmx9YDtcbiAgdmFyIGZuQXJnTmFtZXMgPSBbXTtcbiAgdmFyIGZuQXJnVmFsdWVzID0gW107XG4gIGZvciAodmFyIGFyZ05hbWUgaW4gdmFycykge1xuICAgIGZuQXJnTmFtZXMucHVzaChhcmdOYW1lKTtcbiAgICBmbkFyZ1ZhbHVlcy5wdXNoKHZhcnNbYXJnTmFtZV0pO1xuICB9XG4gIHJldHVybiBuZXcgRnVuY3Rpb24oLi4uZm5BcmdOYW1lcy5jb25jYXQoZm5Cb2R5KSkoLi4uZm5BcmdWYWx1ZXMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQcmltaXRpdmUob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuICFpc0pzT2JqZWN0KG9iaik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNDb25zdHJ1Y3Rvcih2YWx1ZTogT2JqZWN0LCB0eXBlOiBUeXBlKTogYm9vbGVhbiB7XG4gIHJldHVybiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gdHlwZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJpdFdpc2VPcih2YWx1ZXM6IG51bWJlcltdKTogbnVtYmVyIHtcbiAgcmV0dXJuIHZhbHVlcy5yZWR1Y2UoKGEsIGIpID0+IHsgcmV0dXJuIGEgfCBiOyB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJpdFdpc2VBbmQodmFsdWVzOiBudW1iZXJbXSk6IG51bWJlciB7XG4gIHJldHVybiB2YWx1ZXMucmVkdWNlKChhLCBiKSA9PiB7IHJldHVybiBhICYgYjsgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGUoczogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIF9nbG9iYWwuZW5jb2RlVVJJKHMpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
