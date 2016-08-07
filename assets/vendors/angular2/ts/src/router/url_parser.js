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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvdXJsX3BhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7c0JBaUZJLFVBQVUsRUFLVixvQkFBb0IsYUEySmIsTUFBTTtJQTdPakIsaUNBQXdDLFNBQStCO1FBQ3JFLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUNyQixFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDWixDQUFDO1FBQ0QsNkJBQWdCLENBQUMsT0FBTyxDQUNwQixTQUFTLEVBQUUsVUFBQyxLQUFLLEVBQUUsR0FBRyxJQUFPLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRyxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQ3JCLENBQUM7SUFSRCw2REFRQyxDQUFBO0lBRUQsK0VBQStFO0lBQy9FLHlCQUFnQyxTQUErQixFQUFFLE1BQVk7UUFBWixzQkFBWSxHQUFaLFlBQVk7UUFDM0UsTUFBTSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRkQsNkNBRUMsQ0FBQTtJQXdERCwyQkFBa0MsWUFBc0I7UUFDdEQsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNyRCxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQU5ELGlEQU1DLENBQUE7SUFHRCx5QkFBeUIsR0FBVztRQUNsQyxJQUFJLEtBQUssR0FBRyxvQkFBYSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdEQsTUFBTSxDQUFDLGdCQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQsaUNBQWlDLEdBQVc7UUFDMUMsSUFBSSxLQUFLLEdBQUcsb0JBQWEsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDaEUsTUFBTSxDQUFDLGdCQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMxQyxDQUFDOzs7Ozs7Ozs7Ozs7O1lBdkVEOztlQUVHO1lBQ0g7Z0JBQ0UsYUFBbUIsSUFBWSxFQUFTLEtBQWlCLEVBQ3RDLFNBQWlDLEVBQ2pDLE1BQTZDO29CQUYvQixxQkFBd0IsR0FBeEIsWUFBd0I7b0JBQzdDLHlCQUF3QyxHQUF4QyxZQUEwQixpQkFBVSxDQUFDLEVBQUUsQ0FBQztvQkFDeEMsc0JBQW9ELEdBQXBELFNBQXNDLGlCQUFVLENBQUMsRUFBRSxDQUFDO29CQUY3QyxTQUFJLEdBQUosSUFBSSxDQUFRO29CQUFTLFVBQUssR0FBTCxLQUFLLENBQVk7b0JBQ3RDLGNBQVMsR0FBVCxTQUFTLENBQXdCO29CQUNqQyxXQUFNLEdBQU4sTUFBTSxDQUF1QztnQkFBRyxDQUFDO2dCQUVwRSxzQkFBUSxHQUFSO29CQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQzlGLENBQUM7Z0JBRUQsNkJBQWUsR0FBZixjQUE0QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRTlFLGdCQUFnQjtnQkFDaEIsMEJBQVksR0FBWjtvQkFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQzt3QkFDckIsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQWxCLENBQWtCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO3dCQUMxRSxFQUFFLENBQUM7Z0JBQ2hCLENBQUM7Z0JBRU8sbUNBQXFCLEdBQTdCO29CQUNFLElBQUksV0FBVyxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUNwRCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzNCLE1BQU0sQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDO29CQUMzQixDQUFDO29CQUNELE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQ1osQ0FBQztnQkFFRCxnQkFBZ0I7Z0JBQ2hCLDBCQUFZLEdBQVosY0FBeUIsTUFBTSxDQUFDLGdCQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMvRixVQUFDO1lBQUQsQ0E1QkEsQUE0QkMsSUFBQTtZQTVCRCxxQkE0QkMsQ0FBQTtZQUVEO2dCQUE2QiwyQkFBRztnQkFDOUIsaUJBQVksSUFBWSxFQUFFLEtBQWlCLEVBQUUsU0FBaUMsRUFDbEUsTUFBbUM7b0JBRHJCLHFCQUFpQixHQUFqQixZQUFpQjtvQkFBRSx5QkFBaUMsR0FBakMsWUFBbUIsaUJBQVUsQ0FBQyxFQUFFLENBQUM7b0JBQ2xFLHNCQUFtQyxHQUFuQyxhQUFtQztvQkFDN0Msa0JBQU0sSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ3hDLENBQUM7Z0JBRUQsMEJBQVEsR0FBUjtvQkFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2dCQUM3RixDQUFDO2dCQUVELGlDQUFlLEdBQWYsY0FBNEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUVyRSxzQ0FBb0IsR0FBNUI7b0JBQ0UsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3pCLE1BQU0sQ0FBQyxFQUFFLENBQUM7b0JBQ1osQ0FBQztvQkFFRCxNQUFNLENBQUMsR0FBRyxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzVDLENBQUM7Z0JBQ0gsY0FBQztZQUFELENBbkJBLEFBbUJDLENBbkI0QixHQUFHLEdBbUIvQjtZQW5CRCw2QkFtQkMsQ0FBQTtZQVVHLFVBQVUsR0FBRyxvQkFBYSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBSzNELG9CQUFvQixHQUFHLG9CQUFhLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFNckU7Z0JBQUE7Z0JBbUpBLENBQUM7Z0JBaEpDLGtDQUFjLEdBQWQsVUFBZSxHQUFXLElBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFaEYsMkJBQU8sR0FBUCxVQUFRLEdBQVc7b0JBQ2pCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNyQyxNQUFNLElBQUksMEJBQWEsQ0FBQyxnQkFBYSxHQUFHLFFBQUksQ0FBQyxDQUFDO29CQUNoRCxDQUFDO29CQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMxRCxDQUFDO2dCQUVELHlCQUFLLEdBQUwsVUFBTSxHQUFXO29CQUNmLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO29CQUN0QixFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRSxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUM1QixNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ3JCLENBQUM7b0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDMUIsQ0FBQztnQkFFRCw0Q0FBNEM7Z0JBQzVDLDZCQUFTLEdBQVQ7b0JBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3BCLENBQUM7b0JBQ0QsSUFBSSxJQUFJLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFFbkIsSUFBSSxHQUFHLEdBQVUsRUFBRSxDQUFDO29CQUNwQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDN0IsR0FBRyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO29CQUNwQyxDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM3Qiw2Q0FBNkM7d0JBQzdDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO29CQUMzQixDQUFDO29CQUNELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztvQkFDakIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMzRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNsQixLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUM5QixDQUFDO29CQUNELElBQUksV0FBVyxHQUF5QixJQUFJLENBQUM7b0JBQzdDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM3QixXQUFXLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3hDLENBQUM7b0JBQ0QsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUNwRCxDQUFDO2dCQUVELDZDQUE2QztnQkFDN0MsZ0NBQVksR0FBWjtvQkFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNkLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3BCLENBQUM7b0JBQ0QsSUFBSSxJQUFJLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFFbkIsSUFBSSxZQUFZLEdBQXlCLElBQUksQ0FBQztvQkFDOUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzdCLFlBQVksR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztvQkFDMUMsQ0FBQztvQkFDRCxJQUFJLEdBQUcsR0FBVSxFQUFFLENBQUM7b0JBQ3BCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM3QixHQUFHLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7b0JBQ3BDLENBQUM7b0JBQ0QsSUFBSSxLQUFLLEdBQVEsSUFBSSxDQUFDO29CQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzNELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ2xCLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQzlCLENBQUM7b0JBQ0QsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUNqRCxDQUFDO2dCQUVELG9DQUFnQixHQUFoQjtvQkFDRSxJQUFJLE1BQU0sR0FBeUIsRUFBRSxDQUFDO29CQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNsQixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUM3QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7d0JBQzlELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQy9CLENBQUM7b0JBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDaEIsQ0FBQztnQkFFRCxxQ0FBaUIsR0FBakI7b0JBQ0UsSUFBSSxNQUFNLEdBQXlCLEVBQUUsQ0FBQztvQkFDdEMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO3dCQUM5RCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUMxQixDQUFDO29CQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQ2hCLENBQUM7Z0JBRUQsOEJBQVUsR0FBVixVQUFXLE1BQTRCO29CQUNyQyxJQUFJLEdBQUcsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUMzQyxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNqQixNQUFNLENBQUM7b0JBQ1QsQ0FBQztvQkFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNsQixJQUFJLEtBQUssR0FBUSxJQUFJLENBQUM7b0JBQ3RCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNsQixJQUFJLFVBQVUsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUNsRCxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDMUIsS0FBSyxHQUFHLFVBQVUsQ0FBQzs0QkFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDdEIsQ0FBQztvQkFDSCxDQUFDO29CQUVELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7Z0JBQ3RCLENBQUM7Z0JBRUQsbUNBQWUsR0FBZixVQUFnQixNQUE0QjtvQkFDMUMsSUFBSSxHQUFHLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDM0MsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDakIsTUFBTSxDQUFDO29CQUNULENBQUM7b0JBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDbEIsSUFBSSxLQUFLLEdBQVEsSUFBSSxDQUFDO29CQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDbEIsSUFBSSxVQUFVLEdBQUcsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUMxRCxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDMUIsS0FBSyxHQUFHLFVBQVUsQ0FBQzs0QkFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDdEIsQ0FBQztvQkFDSCxDQUFDO29CQUVELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7Z0JBQ3RCLENBQUM7Z0JBRUQsd0NBQW9CLEdBQXBCO29CQUNFLElBQUksTUFBTSxHQUFVLEVBQUUsQ0FBQztvQkFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFFbEIsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7d0JBQy9ELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7d0JBQ2pDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNyQixDQUFDO29CQUNILENBQUM7b0JBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFFbEIsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDaEIsQ0FBQztnQkFDSCxnQkFBQztZQUFELENBbkpBLEFBbUpDLElBQUE7WUFuSkQsaUNBbUpDLENBQUE7WUFFVSxvQkFBQSxNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQSxDQUFDIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvdXJsX3BhcnNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3RyaW5nTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7aXNQcmVzZW50LCBpc0JsYW5rLCBSZWdFeHBXcmFwcGVyLCBDT05TVF9FWFBSfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9uLCBXcmFwcGVkRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydFVybFBhcmFtc1RvQXJyYXkodXJsUGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSk6IHN0cmluZ1tdIHtcbiAgdmFyIHBhcmFtc0FycmF5ID0gW107XG4gIGlmIChpc0JsYW5rKHVybFBhcmFtcykpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgU3RyaW5nTWFwV3JhcHBlci5mb3JFYWNoKFxuICAgICAgdXJsUGFyYW1zLCAodmFsdWUsIGtleSkgPT4geyBwYXJhbXNBcnJheS5wdXNoKCh2YWx1ZSA9PT0gdHJ1ZSkgPyBrZXkgOiBrZXkgKyAnPScgKyB2YWx1ZSk7IH0pO1xuICByZXR1cm4gcGFyYW1zQXJyYXk7XG59XG5cbi8vIENvbnZlcnQgYW4gb2JqZWN0IG9mIHVybCBwYXJhbWV0ZXJzIGludG8gYSBzdHJpbmcgdGhhdCBjYW4gYmUgdXNlZCBpbiBhbiBVUkxcbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemVQYXJhbXModXJsUGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSwgam9pbmVyID0gJyYnKTogc3RyaW5nIHtcbiAgcmV0dXJuIGNvbnZlcnRVcmxQYXJhbXNUb0FycmF5KHVybFBhcmFtcykuam9pbihqb2luZXIpO1xufVxuXG4vKipcbiAqIFRoaXMgY2xhc3MgcmVwcmVzZW50cyBhIHBhcnNlZCBVUkxcbiAqL1xuZXhwb3J0IGNsYXNzIFVybCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwYXRoOiBzdHJpbmcsIHB1YmxpYyBjaGlsZDogVXJsID0gbnVsbCxcbiAgICAgICAgICAgICAgcHVibGljIGF1eGlsaWFyeTogVXJsW10gPSBDT05TVF9FWFBSKFtdKSxcbiAgICAgICAgICAgICAgcHVibGljIHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0gPSBDT05TVF9FWFBSKHt9KSkge31cblxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBhdGggKyB0aGlzLl9tYXRyaXhQYXJhbXNUb1N0cmluZygpICsgdGhpcy5fYXV4VG9TdHJpbmcoKSArIHRoaXMuX2NoaWxkU3RyaW5nKCk7XG4gIH1cblxuICBzZWdtZW50VG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMucGF0aCArIHRoaXMuX21hdHJpeFBhcmFtc1RvU3RyaW5nKCk7IH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9hdXhUb1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmF1eGlsaWFyeS5sZW5ndGggPiAwID9cbiAgICAgICAgICAgICAgICgnKCcgKyB0aGlzLmF1eGlsaWFyeS5tYXAoc2libGluZyA9PiBzaWJsaW5nLnRvU3RyaW5nKCkpLmpvaW4oJy8vJykgKyAnKScpIDpcbiAgICAgICAgICAgICAgICcnO1xuICB9XG5cbiAgcHJpdmF0ZSBfbWF0cml4UGFyYW1zVG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICB2YXIgcGFyYW1TdHJpbmcgPSBzZXJpYWxpemVQYXJhbXModGhpcy5wYXJhbXMsICc7Jyk7XG4gICAgaWYgKHBhcmFtU3RyaW5nLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiAnOycgKyBwYXJhbVN0cmluZztcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY2hpbGRTdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmNoaWxkKSA/ICgnLycgKyB0aGlzLmNoaWxkLnRvU3RyaW5nKCkpIDogJyc7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFJvb3RVcmwgZXh0ZW5kcyBVcmwge1xuICBjb25zdHJ1Y3RvcihwYXRoOiBzdHJpbmcsIGNoaWxkOiBVcmwgPSBudWxsLCBhdXhpbGlhcnk6IFVybFtdID0gQ09OU1RfRVhQUihbXSksXG4gICAgICAgICAgICAgIHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0gPSBudWxsKSB7XG4gICAgc3VwZXIocGF0aCwgY2hpbGQsIGF1eGlsaWFyeSwgcGFyYW1zKTtcbiAgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucGF0aCArIHRoaXMuX2F1eFRvU3RyaW5nKCkgKyB0aGlzLl9jaGlsZFN0cmluZygpICsgdGhpcy5fcXVlcnlQYXJhbXNUb1N0cmluZygpO1xuICB9XG5cbiAgc2VnbWVudFRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLnBhdGggKyB0aGlzLl9xdWVyeVBhcmFtc1RvU3RyaW5nKCk7IH1cblxuICBwcml2YXRlIF9xdWVyeVBhcmFtc1RvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgaWYgKGlzQmxhbmsodGhpcy5wYXJhbXMpKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuICc/JyArIHNlcmlhbGl6ZVBhcmFtcyh0aGlzLnBhcmFtcyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhdGhTZWdtZW50c1RvVXJsKHBhdGhTZWdtZW50czogc3RyaW5nW10pOiBVcmwge1xuICB2YXIgdXJsID0gbmV3IFVybChwYXRoU2VnbWVudHNbcGF0aFNlZ21lbnRzLmxlbmd0aCAtIDFdKTtcbiAgZm9yICh2YXIgaSA9IHBhdGhTZWdtZW50cy5sZW5ndGggLSAyOyBpID49IDA7IGkgLT0gMSkge1xuICAgIHVybCA9IG5ldyBVcmwocGF0aFNlZ21lbnRzW2ldLCB1cmwpO1xuICB9XG4gIHJldHVybiB1cmw7XG59XG5cbnZhciBTRUdNRU5UX1JFID0gUmVnRXhwV3JhcHBlci5jcmVhdGUoJ15bXlxcXFwvXFxcXChcXFxcKVxcXFw/Oz0mI10rJyk7XG5mdW5jdGlvbiBtYXRjaFVybFNlZ21lbnQoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICB2YXIgbWF0Y2ggPSBSZWdFeHBXcmFwcGVyLmZpcnN0TWF0Y2goU0VHTUVOVF9SRSwgc3RyKTtcbiAgcmV0dXJuIGlzUHJlc2VudChtYXRjaCkgPyBtYXRjaFswXSA6ICcnO1xufVxudmFyIFFVRVJZX1BBUkFNX1ZBTFVFX1JFID0gUmVnRXhwV3JhcHBlci5jcmVhdGUoJ15bXlxcXFwoXFxcXClcXFxcPzsmI10rJyk7XG5mdW5jdGlvbiBtYXRjaFVybFF1ZXJ5UGFyYW1WYWx1ZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIHZhciBtYXRjaCA9IFJlZ0V4cFdyYXBwZXIuZmlyc3RNYXRjaChRVUVSWV9QQVJBTV9WQUxVRV9SRSwgc3RyKTtcbiAgcmV0dXJuIGlzUHJlc2VudChtYXRjaCkgPyBtYXRjaFswXSA6ICcnO1xufVxuXG5leHBvcnQgY2xhc3MgVXJsUGFyc2VyIHtcbiAgcHJpdmF0ZSBfcmVtYWluaW5nOiBzdHJpbmc7XG5cbiAgcGVla1N0YXJ0c1dpdGgoc3RyOiBzdHJpbmcpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3JlbWFpbmluZy5zdGFydHNXaXRoKHN0cik7IH1cblxuICBjYXB0dXJlKHN0cjogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9yZW1haW5pbmcuc3RhcnRzV2l0aChzdHIpKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgRXhwZWN0ZWQgXCIke3N0cn1cIi5gKTtcbiAgICB9XG4gICAgdGhpcy5fcmVtYWluaW5nID0gdGhpcy5fcmVtYWluaW5nLnN1YnN0cmluZyhzdHIubGVuZ3RoKTtcbiAgfVxuXG4gIHBhcnNlKHVybDogc3RyaW5nKTogVXJsIHtcbiAgICB0aGlzLl9yZW1haW5pbmcgPSB1cmw7XG4gICAgaWYgKHVybCA9PSAnJyB8fCB1cmwgPT0gJy8nKSB7XG4gICAgICByZXR1cm4gbmV3IFVybCgnJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnBhcnNlUm9vdCgpO1xuICB9XG5cbiAgLy8gc2VnbWVudCArIChhdXggc2VnbWVudHMpICsgKHF1ZXJ5IHBhcmFtcylcbiAgcGFyc2VSb290KCk6IFJvb3RVcmwge1xuICAgIGlmICh0aGlzLnBlZWtTdGFydHNXaXRoKCcvJykpIHtcbiAgICAgIHRoaXMuY2FwdHVyZSgnLycpO1xuICAgIH1cbiAgICB2YXIgcGF0aCA9IG1hdGNoVXJsU2VnbWVudCh0aGlzLl9yZW1haW5pbmcpO1xuICAgIHRoaXMuY2FwdHVyZShwYXRoKTtcblxuICAgIHZhciBhdXg6IFVybFtdID0gW107XG4gICAgaWYgKHRoaXMucGVla1N0YXJ0c1dpdGgoJygnKSkge1xuICAgICAgYXV4ID0gdGhpcy5wYXJzZUF1eGlsaWFyeVJvdXRlcygpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wZWVrU3RhcnRzV2l0aCgnOycpKSB7XG4gICAgICAvLyBUT0RPOiBzaG91bGQgdGhlc2UgcGFyYW1zIGp1c3QgYmUgZHJvcHBlZD9cbiAgICAgIHRoaXMucGFyc2VNYXRyaXhQYXJhbXMoKTtcbiAgICB9XG4gICAgdmFyIGNoaWxkID0gbnVsbDtcbiAgICBpZiAodGhpcy5wZWVrU3RhcnRzV2l0aCgnLycpICYmICF0aGlzLnBlZWtTdGFydHNXaXRoKCcvLycpKSB7XG4gICAgICB0aGlzLmNhcHR1cmUoJy8nKTtcbiAgICAgIGNoaWxkID0gdGhpcy5wYXJzZVNlZ21lbnQoKTtcbiAgICB9XG4gICAgdmFyIHF1ZXJ5UGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSA9IG51bGw7XG4gICAgaWYgKHRoaXMucGVla1N0YXJ0c1dpdGgoJz8nKSkge1xuICAgICAgcXVlcnlQYXJhbXMgPSB0aGlzLnBhcnNlUXVlcnlQYXJhbXMoKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBSb290VXJsKHBhdGgsIGNoaWxkLCBhdXgsIHF1ZXJ5UGFyYW1zKTtcbiAgfVxuXG4gIC8vIHNlZ21lbnQgKyAobWF0cml4IHBhcmFtcykgKyAoYXV4IHNlZ21lbnRzKVxuICBwYXJzZVNlZ21lbnQoKTogVXJsIHtcbiAgICBpZiAodGhpcy5fcmVtYWluaW5nLmxlbmd0aCA9PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMucGVla1N0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgdGhpcy5jYXB0dXJlKCcvJyk7XG4gICAgfVxuICAgIHZhciBwYXRoID0gbWF0Y2hVcmxTZWdtZW50KHRoaXMuX3JlbWFpbmluZyk7XG4gICAgdGhpcy5jYXB0dXJlKHBhdGgpO1xuXG4gICAgdmFyIG1hdHJpeFBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0gPSBudWxsO1xuICAgIGlmICh0aGlzLnBlZWtTdGFydHNXaXRoKCc7JykpIHtcbiAgICAgIG1hdHJpeFBhcmFtcyA9IHRoaXMucGFyc2VNYXRyaXhQYXJhbXMoKTtcbiAgICB9XG4gICAgdmFyIGF1eDogVXJsW10gPSBbXTtcbiAgICBpZiAodGhpcy5wZWVrU3RhcnRzV2l0aCgnKCcpKSB7XG4gICAgICBhdXggPSB0aGlzLnBhcnNlQXV4aWxpYXJ5Um91dGVzKCk7XG4gICAgfVxuICAgIHZhciBjaGlsZDogVXJsID0gbnVsbDtcbiAgICBpZiAodGhpcy5wZWVrU3RhcnRzV2l0aCgnLycpICYmICF0aGlzLnBlZWtTdGFydHNXaXRoKCcvLycpKSB7XG4gICAgICB0aGlzLmNhcHR1cmUoJy8nKTtcbiAgICAgIGNoaWxkID0gdGhpcy5wYXJzZVNlZ21lbnQoKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBVcmwocGF0aCwgY2hpbGQsIGF1eCwgbWF0cml4UGFyYW1zKTtcbiAgfVxuXG4gIHBhcnNlUXVlcnlQYXJhbXMoKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgIHZhciBwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge307XG4gICAgdGhpcy5jYXB0dXJlKCc/Jyk7XG4gICAgdGhpcy5wYXJzZVF1ZXJ5UGFyYW0ocGFyYW1zKTtcbiAgICB3aGlsZSAodGhpcy5fcmVtYWluaW5nLmxlbmd0aCA+IDAgJiYgdGhpcy5wZWVrU3RhcnRzV2l0aCgnJicpKSB7XG4gICAgICB0aGlzLmNhcHR1cmUoJyYnKTtcbiAgICAgIHRoaXMucGFyc2VRdWVyeVBhcmFtKHBhcmFtcyk7XG4gICAgfVxuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICBwYXJzZU1hdHJpeFBhcmFtcygpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgdmFyIHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICB3aGlsZSAodGhpcy5fcmVtYWluaW5nLmxlbmd0aCA+IDAgJiYgdGhpcy5wZWVrU3RhcnRzV2l0aCgnOycpKSB7XG4gICAgICB0aGlzLmNhcHR1cmUoJzsnKTtcbiAgICAgIHRoaXMucGFyc2VQYXJhbShwYXJhbXMpO1xuICAgIH1cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG5cbiAgcGFyc2VQYXJhbShwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogdm9pZCB7XG4gICAgdmFyIGtleSA9IG1hdGNoVXJsU2VnbWVudCh0aGlzLl9yZW1haW5pbmcpO1xuICAgIGlmIChpc0JsYW5rKGtleSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jYXB0dXJlKGtleSk7XG4gICAgdmFyIHZhbHVlOiBhbnkgPSB0cnVlO1xuICAgIGlmICh0aGlzLnBlZWtTdGFydHNXaXRoKCc9JykpIHtcbiAgICAgIHRoaXMuY2FwdHVyZSgnPScpO1xuICAgICAgdmFyIHZhbHVlTWF0Y2ggPSBtYXRjaFVybFNlZ21lbnQodGhpcy5fcmVtYWluaW5nKTtcbiAgICAgIGlmIChpc1ByZXNlbnQodmFsdWVNYXRjaCkpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZU1hdGNoO1xuICAgICAgICB0aGlzLmNhcHR1cmUodmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHBhcmFtc1trZXldID0gdmFsdWU7XG4gIH1cblxuICBwYXJzZVF1ZXJ5UGFyYW0ocGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSk6IHZvaWQge1xuICAgIHZhciBrZXkgPSBtYXRjaFVybFNlZ21lbnQodGhpcy5fcmVtYWluaW5nKTtcbiAgICBpZiAoaXNCbGFuayhrZXkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY2FwdHVyZShrZXkpO1xuICAgIHZhciB2YWx1ZTogYW55ID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5wZWVrU3RhcnRzV2l0aCgnPScpKSB7XG4gICAgICB0aGlzLmNhcHR1cmUoJz0nKTtcbiAgICAgIHZhciB2YWx1ZU1hdGNoID0gbWF0Y2hVcmxRdWVyeVBhcmFtVmFsdWUodGhpcy5fcmVtYWluaW5nKTtcbiAgICAgIGlmIChpc1ByZXNlbnQodmFsdWVNYXRjaCkpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZU1hdGNoO1xuICAgICAgICB0aGlzLmNhcHR1cmUodmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHBhcmFtc1trZXldID0gdmFsdWU7XG4gIH1cblxuICBwYXJzZUF1eGlsaWFyeVJvdXRlcygpOiBVcmxbXSB7XG4gICAgdmFyIHJvdXRlczogVXJsW10gPSBbXTtcbiAgICB0aGlzLmNhcHR1cmUoJygnKTtcblxuICAgIHdoaWxlICghdGhpcy5wZWVrU3RhcnRzV2l0aCgnKScpICYmIHRoaXMuX3JlbWFpbmluZy5sZW5ndGggPiAwKSB7XG4gICAgICByb3V0ZXMucHVzaCh0aGlzLnBhcnNlU2VnbWVudCgpKTtcbiAgICAgIGlmICh0aGlzLnBlZWtTdGFydHNXaXRoKCcvLycpKSB7XG4gICAgICAgIHRoaXMuY2FwdHVyZSgnLy8nKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jYXB0dXJlKCcpJyk7XG5cbiAgICByZXR1cm4gcm91dGVzO1xuICB9XG59XG5cbmV4cG9ydCB2YXIgcGFyc2VyID0gbmV3IFVybFBhcnNlcigpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
