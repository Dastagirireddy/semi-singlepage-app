System.register(['angular2/src/facade/collection', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var collection_1, lang_1, exceptions_1;
    var Url, RootUrl, SEGMENT_RE, QUERY_PARAM_VALUE_RE, UrlParser, parser;
    function convertUrlParamsToArray(urlParams) {
        var paramsArray = [];
        if (lang_1.isBlank(urlParams)) {
            return [];
        }
        collection_1.StringMapWrapper.forEach(urlParams, function (value, key) { paramsArray.push((value === true) ? key : key + '=' + value); });
        return paramsArray;
    }
    exports_1("convertUrlParamsToArray", convertUrlParamsToArray);
    // Convert an object of url parameters into a string that can be used in an URL
    function serializeParams(urlParams, joiner) {
        if (joiner === void 0) { joiner = '&'; }
        return convertUrlParamsToArray(urlParams).join(joiner);
    }
    exports_1("serializeParams", serializeParams);
    function pathSegmentsToUrl(pathSegments) {
        var url = new Url(pathSegments[pathSegments.length - 1]);
        for (var i = pathSegments.length - 2; i >= 0; i -= 1) {
            url = new Url(pathSegments[i], url);
        }
        return url;
    }
    exports_1("pathSegmentsToUrl", pathSegmentsToUrl);
    function matchUrlSegment(str) {
        var match = lang_1.RegExpWrapper.firstMatch(SEGMENT_RE, str);
        return lang_1.isPresent(match) ? match[0] : '';
    }
    function matchUrlQueryParamValue(str) {
        var match = lang_1.RegExpWrapper.firstMatch(QUERY_PARAM_VALUE_RE, str);
        return lang_1.isPresent(match) ? match[0] : '';
    }
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
            /**
             * This class represents a parsed URL
             */
            Url = (function () {
                function Url(path, child, auxiliary, params) {
                    if (child === void 0) { child = null; }
                    if (auxiliary === void 0) { auxiliary = lang_1.CONST_EXPR([]); }
                    if (params === void 0) { params = lang_1.CONST_EXPR({}); }
                    this.path = path;
                    this.child = child;
                    this.auxiliary = auxiliary;
                    this.params = params;
                }
                Url.prototype.toString = function () {
                    return this.path + this._matrixParamsToString() + this._auxToString() + this._childString();
                };
                Url.prototype.segmentToString = function () { return this.path + this._matrixParamsToString(); };
                /** @internal */
                Url.prototype._auxToString = function () {
                    return this.auxiliary.length > 0 ?
                        ('(' + this.auxiliary.map(function (sibling) { return sibling.toString(); }).join('//') + ')') :
                        '';
                };
                Url.prototype._matrixParamsToString = function () {
                    var paramString = serializeParams(this.params, ';');
                    if (paramString.length > 0) {
                        return ';' + paramString;
                    }
                    return '';
                };
                /** @internal */
                Url.prototype._childString = function () { return lang_1.isPresent(this.child) ? ('/' + this.child.toString()) : ''; };
                return Url;
            }());
            exports_1("Url", Url);
            RootUrl = (function (_super) {
                __extends(RootUrl, _super);
                function RootUrl(path, child, auxiliary, params) {
                    if (child === void 0) { child = null; }
                    if (auxiliary === void 0) { auxiliary = lang_1.CONST_EXPR([]); }
                    if (params === void 0) { params = null; }
                    _super.call(this, path, child, auxiliary, params);
                }
                RootUrl.prototype.toString = function () {
                    return this.path + this._auxToString() + this._childString() + this._queryParamsToString();
                };
                RootUrl.prototype.segmentToString = function () { return this.path + this._queryParamsToString(); };
                RootUrl.prototype._queryParamsToString = function () {
                    if (lang_1.isBlank(this.params)) {
                        return '';
                    }
                    return '?' + serializeParams(this.params);
                };
                return RootUrl;
            }(Url));
            exports_1("RootUrl", RootUrl);
            SEGMENT_RE = lang_1.RegExpWrapper.create('^[^\\/\\(\\)\\?;=&#]+');
            QUERY_PARAM_VALUE_RE = lang_1.RegExpWrapper.create('^[^\\(\\)\\?;&#]+');
            UrlParser = (function () {
                function UrlParser() {
                }
                UrlParser.prototype.peekStartsWith = function (str) { return this._remaining.startsWith(str); };
                UrlParser.prototype.capture = function (str) {
                    if (!this._remaining.startsWith(str)) {
                        throw new exceptions_1.BaseException("Expected \"" + str + "\".");
                    }
                    this._remaining = this._remaining.substring(str.length);
                };
                UrlParser.prototype.parse = function (url) {
                    this._remaining = url;
                    if (url == '' || url == '/') {
                        return new Url('');
                    }
                    return this.parseRoot();
                };
                // segment + (aux segments) + (query params)
                UrlParser.prototype.parseRoot = function () {
                    if (this.peekStartsWith('/')) {
                        this.capture('/');
                    }
                    var path = matchUrlSegment(this._remaining);
                    this.capture(path);
                    var aux = [];
                    if (this.peekStartsWith('(')) {
                        aux = this.parseAuxiliaryRoutes();
                    }
                    if (this.peekStartsWith(';')) {
                        // TODO: should these params just be dropped?
                        this.parseMatrixParams();
                    }
                    var child = null;
                    if (this.peekStartsWith('/') && !this.peekStartsWith('//')) {
                        this.capture('/');
                        child = this.parseSegment();
                    }
                    var queryParams = null;
                    if (this.peekStartsWith('?')) {
                        queryParams = this.parseQueryParams();
                    }
                    return new RootUrl(path, child, aux, queryParams);
                };
                // segment + (matrix params) + (aux segments)
                UrlParser.prototype.parseSegment = function () {
                    if (this._remaining.length == 0) {
                        return null;
                    }
                    if (this.peekStartsWith('/')) {
                        this.capture('/');
                    }
                    var path = matchUrlSegment(this._remaining);
                    this.capture(path);
                    var matrixParams = null;
                    if (this.peekStartsWith(';')) {
                        matrixParams = this.parseMatrixParams();
                    }
                    var aux = [];
                    if (this.peekStartsWith('(')) {
                        aux = this.parseAuxiliaryRoutes();
                    }
                    var child = null;
                    if (this.peekStartsWith('/') && !this.peekStartsWith('//')) {
                        this.capture('/');
                        child = this.parseSegment();
                    }
                    return new Url(path, child, aux, matrixParams);
                };
                UrlParser.prototype.parseQueryParams = function () {
                    var params = {};
                    this.capture('?');
                    this.parseQueryParam(params);
                    while (this._remaining.length > 0 && this.peekStartsWith('&')) {
                        this.capture('&');
                        this.parseQueryParam(params);
                    }
                    return params;
                };
                UrlParser.prototype.parseMatrixParams = function () {
                    var params = {};
                    while (this._remaining.length > 0 && this.peekStartsWith(';')) {
                        this.capture(';');
                        this.parseParam(params);
                    }
                    return params;
                };
                UrlParser.prototype.parseParam = function (params) {
                    var key = matchUrlSegment(this._remaining);
                    if (lang_1.isBlank(key)) {
                        return;
                    }
                    this.capture(key);
                    var value = true;
                    if (this.peekStartsWith('=')) {
                        this.capture('=');
                        var valueMatch = matchUrlSegment(this._remaining);
                        if (lang_1.isPresent(valueMatch)) {
                            value = valueMatch;
                            this.capture(value);
                        }
                    }
                    params[key] = value;
                };
                UrlParser.prototype.parseQueryParam = function (params) {
                    var key = matchUrlSegment(this._remaining);
                    if (lang_1.isBlank(key)) {
                        return;
                    }
                    this.capture(key);
                    var value = true;
                    if (this.peekStartsWith('=')) {
                        this.capture('=');
                        var valueMatch = matchUrlQueryParamValue(this._remaining);
                        if (lang_1.isPresent(valueMatch)) {
                            value = valueMatch;
                            this.capture(value);
                        }
                    }
                    params[key] = value;
                };
                UrlParser.prototype.parseAuxiliaryRoutes = function () {
                    var routes = [];
                    this.capture('(');
                    while (!this.peekStartsWith(')') && this._remaining.length > 0) {
                        routes.push(this.parseSegment());
                        if (this.peekStartsWith('//')) {
                            this.capture('//');
                        }
                    }
                    this.capture(')');
                    return routes;
                };
                return UrlParser;
            }());
            exports_1("UrlParser", UrlParser);
            exports_1("parser", parser = new UrlParser());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci91cmxfcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztzQkFpRkksVUFBVSxFQUtWLG9CQUFvQixhQTJKYixNQUFNO0lBN09qQixpQ0FBd0MsU0FBK0I7UUFDckUsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNaLENBQUM7UUFDRCw2QkFBZ0IsQ0FBQyxPQUFPLENBQ3BCLFNBQVMsRUFBRSxVQUFDLEtBQUssRUFBRSxHQUFHLElBQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xHLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQVJELDZEQVFDLENBQUE7SUFFRCwrRUFBK0U7SUFDL0UseUJBQWdDLFNBQStCLEVBQUUsTUFBWTtRQUFaLHNCQUFZLEdBQVosWUFBWTtRQUMzRSxNQUFNLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFGRCw2Q0FFQyxDQUFBO0lBd0RELDJCQUFrQyxZQUFzQjtRQUN0RCxJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lB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Q0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQzt3QkFDL0QsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQzt3QkFDakMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3JCLENBQUM7b0JBQ0gsQ0FBQztvQkFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUVsQixNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNoQixDQUFDO2dCQUNILGdCQUFDO1lBQUQsQ0FuSkEsQUFtSkMsSUFBQTtZQW5KRCxpQ0FtSkMsQ0FBQTtZQUVVLG9CQUFBLE1BQU0sR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFBLENBQUMiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvcm91dGVyL3VybF9wYXJzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge2lzUHJlc2VudCwgaXNCbGFuaywgUmVnRXhwV3JhcHBlciwgQ09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbiwgV3JhcHBlZEV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRVcmxQYXJhbXNUb0FycmF5KHVybFBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0pOiBzdHJpbmdbXSB7XG4gIHZhciBwYXJhbXNBcnJheSA9IFtdO1xuICBpZiAoaXNCbGFuayh1cmxQYXJhbXMpKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIFN0cmluZ01hcFdyYXBwZXIuZm9yRWFjaChcbiAgICAgIHVybFBhcmFtcywgKHZhbHVlLCBrZXkpID0+IHsgcGFyYW1zQXJyYXkucHVzaCgodmFsdWUgPT09IHRydWUpID8ga2V5IDoga2V5ICsgJz0nICsgdmFsdWUpOyB9KTtcbiAgcmV0dXJuIHBhcmFtc0FycmF5O1xufVxuXG4vLyBDb252ZXJ0IGFuIG9iamVjdCBvZiB1cmwgcGFyYW1ldGVycyBpbnRvIGEgc3RyaW5nIHRoYXQgY2FuIGJlIHVzZWQgaW4gYW4gVVJMXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplUGFyYW1zKHVybFBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0sIGpvaW5lciA9ICcmJyk6IHN0cmluZyB7XG4gIHJldHVybiBjb252ZXJ0VXJsUGFyYW1zVG9BcnJheSh1cmxQYXJhbXMpLmpvaW4oam9pbmVyKTtcbn1cblxuLyoqXG4gKiBUaGlzIGNsYXNzIHJlcHJlc2VudHMgYSBwYXJzZWQgVVJMXG4gKi9cbmV4cG9ydCBjbGFzcyBVcmwge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGF0aDogc3RyaW5nLCBwdWJsaWMgY2hpbGQ6IFVybCA9IG51bGwsXG4gICAgICAgICAgICAgIHB1YmxpYyBhdXhpbGlhcnk6IFVybFtdID0gQ09OU1RfRVhQUihbXSksXG4gICAgICAgICAgICAgIHB1YmxpYyBwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0gQ09OU1RfRVhQUih7fSkpIHt9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wYXRoICsgdGhpcy5fbWF0cml4UGFyYW1zVG9TdHJpbmcoKSArIHRoaXMuX2F1eFRvU3RyaW5nKCkgKyB0aGlzLl9jaGlsZFN0cmluZygpO1xuICB9XG5cbiAgc2VnbWVudFRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLnBhdGggKyB0aGlzLl9tYXRyaXhQYXJhbXNUb1N0cmluZygpOyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfYXV4VG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5hdXhpbGlhcnkubGVuZ3RoID4gMCA/XG4gICAgICAgICAgICAgICAoJygnICsgdGhpcy5hdXhpbGlhcnkubWFwKHNpYmxpbmcgPT4gc2libGluZy50b1N0cmluZygpKS5qb2luKCcvLycpICsgJyknKSA6XG4gICAgICAgICAgICAgICAnJztcbiAgfVxuXG4gIHByaXZhdGUgX21hdHJpeFBhcmFtc1RvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgdmFyIHBhcmFtU3RyaW5nID0gc2VyaWFsaXplUGFyYW1zKHRoaXMucGFyYW1zLCAnOycpO1xuICAgIGlmIChwYXJhbVN0cmluZy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gJzsnICsgcGFyYW1TdHJpbmc7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NoaWxkU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiBpc1ByZXNlbnQodGhpcy5jaGlsZCkgPyAoJy8nICsgdGhpcy5jaGlsZC50b1N0cmluZygpKSA6ICcnOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBSb290VXJsIGV4dGVuZHMgVXJsIHtcbiAgY29uc3RydWN0b3IocGF0aDogc3RyaW5nLCBjaGlsZDogVXJsID0gbnVsbCwgYXV4aWxpYXJ5OiBVcmxbXSA9IENPTlNUX0VYUFIoW10pLFxuICAgICAgICAgICAgICBwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0gbnVsbCkge1xuICAgIHN1cGVyKHBhdGgsIGNoaWxkLCBhdXhpbGlhcnksIHBhcmFtcyk7XG4gIH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBhdGggKyB0aGlzLl9hdXhUb1N0cmluZygpICsgdGhpcy5fY2hpbGRTdHJpbmcoKSArIHRoaXMuX3F1ZXJ5UGFyYW1zVG9TdHJpbmcoKTtcbiAgfVxuXG4gIHNlZ21lbnRUb1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5wYXRoICsgdGhpcy5fcXVlcnlQYXJhbXNUb1N0cmluZygpOyB9XG5cbiAgcHJpdmF0ZSBfcXVlcnlQYXJhbXNUb1N0cmluZygpOiBzdHJpbmcge1xuICAgIGlmIChpc0JsYW5rKHRoaXMucGFyYW1zKSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHJldHVybiAnPycgKyBzZXJpYWxpemVQYXJhbXModGhpcy5wYXJhbXMpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRoU2VnbWVudHNUb1VybChwYXRoU2VnbWVudHM6IHN0cmluZ1tdKTogVXJsIHtcbiAgdmFyIHVybCA9IG5ldyBVcmwocGF0aFNlZ21lbnRzW3BhdGhTZWdtZW50cy5sZW5ndGggLSAxXSk7XG4gIGZvciAodmFyIGkgPSBwYXRoU2VnbWVudHMubGVuZ3RoIC0gMjsgaSA+PSAwOyBpIC09IDEpIHtcbiAgICB1cmwgPSBuZXcgVXJsKHBhdGhTZWdtZW50c1tpXSwgdXJsKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufVxuXG52YXIgU0VHTUVOVF9SRSA9IFJlZ0V4cFdyYXBwZXIuY3JlYXRlKCdeW15cXFxcL1xcXFwoXFxcXClcXFxcPzs9JiNdKycpO1xuZnVuY3Rpb24gbWF0Y2hVcmxTZWdtZW50KHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgdmFyIG1hdGNoID0gUmVnRXhwV3JhcHBlci5maXJzdE1hdGNoKFNFR01FTlRfUkUsIHN0cik7XG4gIHJldHVybiBpc1ByZXNlbnQobWF0Y2gpID8gbWF0Y2hbMF0gOiAnJztcbn1cbnZhciBRVUVSWV9QQVJBTV9WQUxVRV9SRSA9IFJlZ0V4cFdyYXBwZXIuY3JlYXRlKCdeW15cXFxcKFxcXFwpXFxcXD87JiNdKycpO1xuZnVuY3Rpb24gbWF0Y2hVcmxRdWVyeVBhcmFtVmFsdWUoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICB2YXIgbWF0Y2ggPSBSZWdFeHBXcmFwcGVyLmZpcnN0TWF0Y2goUVVFUllfUEFSQU1fVkFMVUVfUkUsIHN0cik7XG4gIHJldHVybiBpc1ByZXNlbnQobWF0Y2gpID8gbWF0Y2hbMF0gOiAnJztcbn1cblxuZXhwb3J0IGNsYXNzIFVybFBhcnNlciB7XG4gIHByaXZhdGUgX3JlbWFpbmluZzogc3RyaW5nO1xuXG4gIHBlZWtTdGFydHNXaXRoKHN0cjogc3RyaW5nKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9yZW1haW5pbmcuc3RhcnRzV2l0aChzdHIpOyB9XG5cbiAgY2FwdHVyZShzdHI6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fcmVtYWluaW5nLnN0YXJ0c1dpdGgoc3RyKSkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYEV4cGVjdGVkIFwiJHtzdHJ9XCIuYCk7XG4gICAgfVxuICAgIHRoaXMuX3JlbWFpbmluZyA9IHRoaXMuX3JlbWFpbmluZy5zdWJzdHJpbmcoc3RyLmxlbmd0aCk7XG4gIH1cblxuICBwYXJzZSh1cmw6IHN0cmluZyk6IFVybCB7XG4gICAgdGhpcy5fcmVtYWluaW5nID0gdXJsO1xuICAgIGlmICh1cmwgPT0gJycgfHwgdXJsID09ICcvJykge1xuICAgICAgcmV0dXJuIG5ldyBVcmwoJycpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wYXJzZVJvb3QoKTtcbiAgfVxuXG4gIC8vIHNlZ21lbnQgKyAoYXV4IHNlZ21lbnRzKSArIChxdWVyeSBwYXJhbXMpXG4gIHBhcnNlUm9vdCgpOiBSb290VXJsIHtcbiAgICBpZiAodGhpcy5wZWVrU3RhcnRzV2l0aCgnLycpKSB7XG4gICAgICB0aGlzLmNhcHR1cmUoJy8nKTtcbiAgICB9XG4gICAgdmFyIHBhdGggPSBtYXRjaFVybFNlZ21lbnQodGhpcy5fcmVtYWluaW5nKTtcbiAgICB0aGlzLmNhcHR1cmUocGF0aCk7XG5cbiAgICB2YXIgYXV4OiBVcmxbXSA9IFtdO1xuICAgIGlmICh0aGlzLnBlZWtTdGFydHNXaXRoKCcoJykpIHtcbiAgICAgIGF1eCA9IHRoaXMucGFyc2VBdXhpbGlhcnlSb3V0ZXMoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucGVla1N0YXJ0c1dpdGgoJzsnKSkge1xuICAgICAgLy8gVE9ETzogc2hvdWxkIHRoZXNlIHBhcmFtcyBqdXN0IGJlIGRyb3BwZWQ/XG4gICAgICB0aGlzLnBhcnNlTWF0cml4UGFyYW1zKCk7XG4gICAgfVxuICAgIHZhciBjaGlsZCA9IG51bGw7XG4gICAgaWYgKHRoaXMucGVla1N0YXJ0c1dpdGgoJy8nKSAmJiAhdGhpcy5wZWVrU3RhcnRzV2l0aCgnLy8nKSkge1xuICAgICAgdGhpcy5jYXB0dXJlKCcvJyk7XG4gICAgICBjaGlsZCA9IHRoaXMucGFyc2VTZWdtZW50KCk7XG4gICAgfVxuICAgIHZhciBxdWVyeVBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0gPSBudWxsO1xuICAgIGlmICh0aGlzLnBlZWtTdGFydHNXaXRoKCc/JykpIHtcbiAgICAgIHF1ZXJ5UGFyYW1zID0gdGhpcy5wYXJzZVF1ZXJ5UGFyYW1zKCk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUm9vdFVybChwYXRoLCBjaGlsZCwgYXV4LCBxdWVyeVBhcmFtcyk7XG4gIH1cblxuICAvLyBzZWdtZW50ICsgKG1hdHJpeCBwYXJhbXMpICsgKGF1eCBzZWdtZW50cylcbiAgcGFyc2VTZWdtZW50KCk6IFVybCB7XG4gICAgaWYgKHRoaXMuX3JlbWFpbmluZy5sZW5ndGggPT0gMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmICh0aGlzLnBlZWtTdGFydHNXaXRoKCcvJykpIHtcbiAgICAgIHRoaXMuY2FwdHVyZSgnLycpO1xuICAgIH1cbiAgICB2YXIgcGF0aCA9IG1hdGNoVXJsU2VnbWVudCh0aGlzLl9yZW1haW5pbmcpO1xuICAgIHRoaXMuY2FwdHVyZShwYXRoKTtcblxuICAgIHZhciBtYXRyaXhQYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0gbnVsbDtcbiAgICBpZiAodGhpcy5wZWVrU3RhcnRzV2l0aCgnOycpKSB7XG4gICAgICBtYXRyaXhQYXJhbXMgPSB0aGlzLnBhcnNlTWF0cml4UGFyYW1zKCk7XG4gICAgfVxuICAgIHZhciBhdXg6IFVybFtdID0gW107XG4gICAgaWYgKHRoaXMucGVla1N0YXJ0c1dpdGgoJygnKSkge1xuICAgICAgYXV4ID0gdGhpcy5wYXJzZUF1eGlsaWFyeVJvdXRlcygpO1xuICAgIH1cbiAgICB2YXIgY2hpbGQ6IFVybCA9IG51bGw7XG4gICAgaWYgKHRoaXMucGVla1N0YXJ0c1dpdGgoJy8nKSAmJiAhdGhpcy5wZWVrU3RhcnRzV2l0aCgnLy8nKSkge1xuICAgICAgdGhpcy5jYXB0dXJlKCcvJyk7XG4gICAgICBjaGlsZCA9IHRoaXMucGFyc2VTZWdtZW50KCk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgVXJsKHBhdGgsIGNoaWxkLCBhdXgsIG1hdHJpeFBhcmFtcyk7XG4gIH1cblxuICBwYXJzZVF1ZXJ5UGFyYW1zKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICB2YXIgcGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9O1xuICAgIHRoaXMuY2FwdHVyZSgnPycpO1xuICAgIHRoaXMucGFyc2VRdWVyeVBhcmFtKHBhcmFtcyk7XG4gICAgd2hpbGUgKHRoaXMuX3JlbWFpbmluZy5sZW5ndGggPiAwICYmIHRoaXMucGVla1N0YXJ0c1dpdGgoJyYnKSkge1xuICAgICAgdGhpcy5jYXB0dXJlKCcmJyk7XG4gICAgICB0aGlzLnBhcnNlUXVlcnlQYXJhbShwYXJhbXMpO1xuICAgIH1cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG5cbiAgcGFyc2VNYXRyaXhQYXJhbXMoKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgIHZhciBwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge307XG4gICAgd2hpbGUgKHRoaXMuX3JlbWFpbmluZy5sZW5ndGggPiAwICYmIHRoaXMucGVla1N0YXJ0c1dpdGgoJzsnKSkge1xuICAgICAgdGhpcy5jYXB0dXJlKCc7Jyk7XG4gICAgICB0aGlzLnBhcnNlUGFyYW0ocGFyYW1zKTtcbiAgICB9XG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfVxuXG4gIHBhcnNlUGFyYW0ocGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSk6IHZvaWQge1xuICAgIHZhciBrZXkgPSBtYXRjaFVybFNlZ21lbnQodGhpcy5fcmVtYWluaW5nKTtcbiAgICBpZiAoaXNCbGFuayhrZXkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY2FwdHVyZShrZXkpO1xuICAgIHZhciB2YWx1ZTogYW55ID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5wZWVrU3RhcnRzV2l0aCgnPScpKSB7XG4gICAgICB0aGlzLmNhcHR1cmUoJz0nKTtcbiAgICAgIHZhciB2YWx1ZU1hdGNoID0gbWF0Y2hVcmxTZWdtZW50KHRoaXMuX3JlbWFpbmluZyk7XG4gICAgICBpZiAoaXNQcmVzZW50KHZhbHVlTWF0Y2gpKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWVNYXRjaDtcbiAgICAgICAgdGhpcy5jYXB0dXJlKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwYXJhbXNba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcGFyc2VRdWVyeVBhcmFtKHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0pOiB2b2lkIHtcbiAgICB2YXIga2V5ID0gbWF0Y2hVcmxTZWdtZW50KHRoaXMuX3JlbWFpbmluZyk7XG4gICAgaWYgKGlzQmxhbmsoa2V5KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmNhcHR1cmUoa2V5KTtcbiAgICB2YXIgdmFsdWU6IGFueSA9IHRydWU7XG4gICAgaWYgKHRoaXMucGVla1N0YXJ0c1dpdGgoJz0nKSkge1xuICAgICAgdGhpcy5jYXB0dXJlKCc9Jyk7XG4gICAgICB2YXIgdmFsdWVNYXRjaCA9IG1hdGNoVXJsUXVlcnlQYXJhbVZhbHVlKHRoaXMuX3JlbWFpbmluZyk7XG4gICAgICBpZiAoaXNQcmVzZW50KHZhbHVlTWF0Y2gpKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWVNYXRjaDtcbiAgICAgICAgdGhpcy5jYXB0dXJlKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwYXJhbXNba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcGFyc2VBdXhpbGlhcnlSb3V0ZXMoKTogVXJsW10ge1xuICAgIHZhciByb3V0ZXM6IFVybFtdID0gW107XG4gICAgdGhpcy5jYXB0dXJlKCcoJyk7XG5cbiAgICB3aGlsZSAoIXRoaXMucGVla1N0YXJ0c1dpdGgoJyknKSAmJiB0aGlzLl9yZW1haW5pbmcubGVuZ3RoID4gMCkge1xuICAgICAgcm91dGVzLnB1c2godGhpcy5wYXJzZVNlZ21lbnQoKSk7XG4gICAgICBpZiAodGhpcy5wZWVrU3RhcnRzV2l0aCgnLy8nKSkge1xuICAgICAgICB0aGlzLmNhcHR1cmUoJy8vJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY2FwdHVyZSgnKScpO1xuXG4gICAgcmV0dXJuIHJvdXRlcztcbiAgfVxufVxuXG5leHBvcnQgdmFyIHBhcnNlciA9IG5ldyBVcmxQYXJzZXIoKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
