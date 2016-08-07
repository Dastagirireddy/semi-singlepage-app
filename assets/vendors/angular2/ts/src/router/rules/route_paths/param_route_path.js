System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/collection', '../../utils', '../../url_parser', './route_path'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, exceptions_1, collection_1, utils_1, url_parser_1, route_path_1;
    var ContinuationPathSegment, StaticPathSegment, DynamicPathSegment, StarPathSegment, ParamRoutePath, REGEXP_PERCENT, REGEXP_SLASH, REGEXP_OPEN_PARENT, REGEXP_CLOSE_PARENT, REGEXP_SEMICOLON, REGEXP_ENC_SEMICOLON, REGEXP_ENC_CLOSE_PARENT, REGEXP_ENC_OPEN_PARENT, REGEXP_ENC_SLASH, REGEXP_ENC_PERCENT;
    function encodeDynamicSegment(value) {
        if (lang_1.isBlank(value)) {
            return null;
        }
        value = lang_1.StringWrapper.replaceAll(value, REGEXP_PERCENT, '%25');
        value = lang_1.StringWrapper.replaceAll(value, REGEXP_SLASH, '%2F');
        value = lang_1.StringWrapper.replaceAll(value, REGEXP_OPEN_PARENT, '%28');
        value = lang_1.StringWrapper.replaceAll(value, REGEXP_CLOSE_PARENT, '%29');
        value = lang_1.StringWrapper.replaceAll(value, REGEXP_SEMICOLON, '%3B');
        return value;
    }
    function decodeDynamicSegment(value) {
        if (lang_1.isBlank(value)) {
            return null;
        }
        value = lang_1.StringWrapper.replaceAll(value, REGEXP_ENC_SEMICOLON, ';');
        value = lang_1.StringWrapper.replaceAll(value, REGEXP_ENC_CLOSE_PARENT, ')');
        value = lang_1.StringWrapper.replaceAll(value, REGEXP_ENC_OPEN_PARENT, '(');
        value = lang_1.StringWrapper.replaceAll(value, REGEXP_ENC_SLASH, '/');
        value = lang_1.StringWrapper.replaceAll(value, REGEXP_ENC_PERCENT, '%');
        return value;
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (url_parser_1_1) {
                url_parser_1 = url_parser_1_1;
            },
            function (route_path_1_1) {
                route_path_1 = route_path_1_1;
            }],
        execute: function() {
            /**
             * Identified by a `...` URL segment. This indicates that the
             * Route will continue to be matched by child `Router`s.
             */
            ContinuationPathSegment = (function () {
                function ContinuationPathSegment() {
                    this.name = '';
                    this.specificity = '';
                    this.hash = '...';
                }
                ContinuationPathSegment.prototype.generate = function (params) { return ''; };
                ContinuationPathSegment.prototype.match = function (path) { return true; };
                return ContinuationPathSegment;
            }());
            /**
             * Identified by a string not starting with a `:` or `*`.
             * Only matches the URL segments that equal the segment path
             */
            StaticPathSegment = (function () {
                function StaticPathSegment(path) {
                    this.path = path;
                    this.name = '';
                    this.specificity = '2';
                    this.hash = path;
                }
                StaticPathSegment.prototype.match = function (path) { return path == this.path; };
                StaticPathSegment.prototype.generate = function (params) { return this.path; };
                return StaticPathSegment;
            }());
            /**
             * Identified by a string starting with `:`. Indicates a segment
             * that can contain a value that will be extracted and provided to
             * a matching `Instruction`.
             */
            DynamicPathSegment = (function () {
                function DynamicPathSegment(name) {
                    this.name = name;
                    this.specificity = '1';
                    this.hash = ':';
                }
                DynamicPathSegment.prototype.match = function (path) { return path.length > 0; };
                DynamicPathSegment.prototype.generate = function (params) {
                    if (!collection_1.StringMapWrapper.contains(params.map, this.name)) {
                        throw new exceptions_1.BaseException("Route generator for '" + this.name + "' was not included in parameters passed.");
                    }
                    return encodeDynamicSegment(utils_1.normalizeString(params.get(this.name)));
                };
                DynamicPathSegment.paramMatcher = /^:([^\/]+)$/g;
                return DynamicPathSegment;
            }());
            /**
             * Identified by a string starting with `*` Indicates that all the following
             * segments match this route and that the value of these segments should
             * be provided to a matching `Instruction`.
             */
            StarPathSegment = (function () {
                function StarPathSegment(name) {
                    this.name = name;
                    this.specificity = '0';
                    this.hash = '*';
                }
                StarPathSegment.prototype.match = function (path) { return true; };
                StarPathSegment.prototype.generate = function (params) { return utils_1.normalizeString(params.get(this.name)); };
                StarPathSegment.wildcardMatcher = /^\*([^\/]+)$/g;
                return StarPathSegment;
            }());
            /**
             * Parses a URL string using a given matcher DSL, and generates URLs from param maps
             */
            ParamRoutePath = (function () {
                /**
                 * Takes a string representing the matcher DSL
                 */
                function ParamRoutePath(routePath) {
                    this.routePath = routePath;
                    this.terminal = true;
                    this._assertValidPath(routePath);
                    this._parsePathString(routePath);
                    this.specificity = this._calculateSpecificity();
                    this.hash = this._calculateHash();
                    var lastSegment = this._segments[this._segments.length - 1];
                    this.terminal = !(lastSegment instanceof ContinuationPathSegment);
                }
                ParamRoutePath.prototype.matchUrl = function (url) {
                    var nextUrlSegment = url;
                    var currentUrlSegment;
                    var positionalParams = {};
                    var captured = [];
                    for (var i = 0; i < this._segments.length; i += 1) {
                        var pathSegment = this._segments[i];
                        currentUrlSegment = nextUrlSegment;
                        if (pathSegment instanceof ContinuationPathSegment) {
                            break;
                        }
                        if (lang_1.isPresent(currentUrlSegment)) {
                            // the star segment consumes all of the remaining URL, including matrix params
                            if (pathSegment instanceof StarPathSegment) {
                                positionalParams[pathSegment.name] = currentUrlSegment.toString();
                                captured.push(currentUrlSegment.toString());
                                nextUrlSegment = null;
                                break;
                            }
                            captured.push(currentUrlSegment.path);
                            if (pathSegment instanceof DynamicPathSegment) {
                                positionalParams[pathSegment.name] = decodeDynamicSegment(currentUrlSegment.path);
                            }
                            else if (!pathSegment.match(currentUrlSegment.path)) {
                                return null;
                            }
                            nextUrlSegment = currentUrlSegment.child;
                        }
                        else if (!pathSegment.match('')) {
                            return null;
                        }
                    }
                    if (this.terminal && lang_1.isPresent(nextUrlSegment)) {
                        return null;
                    }
                    var urlPath = captured.join('/');
                    var auxiliary = [];
                    var urlParams = [];
                    var allParams = positionalParams;
                    if (lang_1.isPresent(currentUrlSegment)) {
                        // If this is the root component, read query params. Otherwise, read matrix params.
                        var paramsSegment = url instanceof url_parser_1.RootUrl ? url : currentUrlSegment;
                        if (lang_1.isPresent(paramsSegment.params)) {
                            allParams = collection_1.StringMapWrapper.merge(paramsSegment.params, positionalParams);
                            urlParams = url_parser_1.convertUrlParamsToArray(paramsSegment.params);
                        }
                        else {
                            allParams = positionalParams;
                        }
                        auxiliary = currentUrlSegment.auxiliary;
                    }
                    return new route_path_1.MatchedUrl(urlPath, urlParams, allParams, auxiliary, nextUrlSegment);
                };
                ParamRoutePath.prototype.generateUrl = function (params) {
                    var paramTokens = new utils_1.TouchMap(params);
                    var path = [];
                    for (var i = 0; i < this._segments.length; i++) {
                        var segment = this._segments[i];
                        if (!(segment instanceof ContinuationPathSegment)) {
                            path.push(segment.generate(paramTokens));
                        }
                    }
                    var urlPath = path.join('/');
                    var nonPositionalParams = paramTokens.getUnused();
                    var urlParams = nonPositionalParams;
                    return new route_path_1.GeneratedUrl(urlPath, urlParams);
                };
                ParamRoutePath.prototype.toString = function () { return this.routePath; };
                ParamRoutePath.prototype._parsePathString = function (routePath) {
                    // normalize route as not starting with a "/". Recognition will
                    // also normalize.
                    if (routePath.startsWith("/")) {
                        routePath = routePath.substring(1);
                    }
                    var segmentStrings = routePath.split('/');
                    this._segments = [];
                    var limit = segmentStrings.length - 1;
                    for (var i = 0; i <= limit; i++) {
                        var segment = segmentStrings[i], match;
                        if (lang_1.isPresent(match = lang_1.RegExpWrapper.firstMatch(DynamicPathSegment.paramMatcher, segment))) {
                            this._segments.push(new DynamicPathSegment(match[1]));
                        }
                        else if (lang_1.isPresent(match = lang_1.RegExpWrapper.firstMatch(StarPathSegment.wildcardMatcher, segment))) {
                            this._segments.push(new StarPathSegment(match[1]));
                        }
                        else if (segment == '...') {
                            if (i < limit) {
                                throw new exceptions_1.BaseException("Unexpected \"...\" before the end of the path for \"" + routePath + "\".");
                            }
                            this._segments.push(new ContinuationPathSegment());
                        }
                        else {
                            this._segments.push(new StaticPathSegment(segment));
                        }
                    }
                };
                ParamRoutePath.prototype._calculateSpecificity = function () {
                    // The "specificity" of a path is used to determine which route is used when multiple routes
                    // match
                    // a URL. Static segments (like "/foo") are the most specific, followed by dynamic segments
                    // (like
                    // "/:id"). Star segments add no specificity. Segments at the start of the path are more
                    // specific
                    // than proceeding ones.
                    //
                    // The code below uses place values to combine the different types of segments into a single
                    // string that we can sort later. Each static segment is marked as a specificity of "2," each
                    // dynamic segment is worth "1" specificity, and stars are worth "0" specificity.
                    var i, length = this._segments.length, specificity;
                    if (length == 0) {
                        // a single slash (or "empty segment" is as specific as a static segment
                        specificity += '2';
                    }
                    else {
                        specificity = '';
                        for (i = 0; i < length; i++) {
                            specificity += this._segments[i].specificity;
                        }
                    }
                    return specificity;
                };
                ParamRoutePath.prototype._calculateHash = function () {
                    // this function is used to determine whether a route config path like `/foo/:id` collides with
                    // `/foo/:name`
                    var i, length = this._segments.length;
                    var hashParts = [];
                    for (i = 0; i < length; i++) {
                        hashParts.push(this._segments[i].hash);
                    }
                    return hashParts.join('/');
                };
                ParamRoutePath.prototype._assertValidPath = function (path) {
                    if (lang_1.StringWrapper.contains(path, '#')) {
                        throw new exceptions_1.BaseException("Path \"" + path + "\" should not include \"#\". Use \"HashLocationStrategy\" instead.");
                    }
                    var illegalCharacter = lang_1.RegExpWrapper.firstMatch(ParamRoutePath.RESERVED_CHARS, path);
                    if (lang_1.isPresent(illegalCharacter)) {
                        throw new exceptions_1.BaseException("Path \"" + path + "\" contains \"" + illegalCharacter[0] + "\" which is not allowed in a route config.");
                    }
                };
                ParamRoutePath.RESERVED_CHARS = lang_1.RegExpWrapper.create('//|\\(|\\)|;|\\?|=');
                return ParamRoutePath;
            }());
            exports_1("ParamRoutePath", ParamRoutePath);
            REGEXP_PERCENT = /%/g;
            REGEXP_SLASH = /\//g;
            REGEXP_OPEN_PARENT = /\(/g;
            REGEXP_CLOSE_PARENT = /\)/g;
            REGEXP_SEMICOLON = /;/g;
            REGEXP_ENC_SEMICOLON = /%3B/ig;
            REGEXP_ENC_CLOSE_PARENT = /%29/ig;
            REGEXP_ENC_OPEN_PARENT = /%28/ig;
            REGEXP_ENC_SLASH = /%2F/ig;
            REGEXP_ENC_PERCENT = /%25/ig;
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvcnVsZXMvcm91dGVfcGF0aHMvcGFyYW1fcm91dGVfcGF0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O3lHQWdSSSxjQUFjLEVBQ2QsWUFBWSxFQUNaLGtCQUFrQixFQUNsQixtQkFBbUIsRUFDbkIsZ0JBQWdCLEVBZ0JoQixvQkFBb0IsRUFDcEIsdUJBQXVCLEVBQ3ZCLHNCQUFzQixFQUN0QixnQkFBZ0IsRUFDaEIsa0JBQWtCO0lBbEJ0Qiw4QkFBOEIsS0FBYTtRQUN6QyxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBRUQsS0FBSyxHQUFHLG9CQUFhLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDL0QsS0FBSyxHQUFHLG9CQUFhLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0QsS0FBSyxHQUFHLG9CQUFhLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNuRSxLQUFLLEdBQUcsb0JBQWEsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLEtBQUssR0FBRyxvQkFBYSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFakUsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7SUFRRCw4QkFBOEIsS0FBYTtRQUN6QyxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBRUQsS0FBSyxHQUFHLG9CQUFhLENB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LENBQUM7WUFDM0IsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1lBQzVCLGdCQUFnQixHQUFHLElBQUksQ0FBQztZQWdCeEIsb0JBQW9CLEdBQUcsT0FBTyxDQUFDO1lBQy9CLHVCQUF1QixHQUFHLE9BQU8sQ0FBQztZQUNsQyxzQkFBc0IsR0FBRyxPQUFPLENBQUM7WUFDakMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDO1lBQzNCLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvcm91dGVyL3J1bGVzL3JvdXRlX3BhdGhzL3BhcmFtX3JvdXRlX3BhdGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlZ0V4cFdyYXBwZXIsIFN0cmluZ1dyYXBwZXIsIGlzUHJlc2VudCwgaXNCbGFua30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7U3RyaW5nTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcblxuaW1wb3J0IHtUb3VjaE1hcCwgbm9ybWFsaXplU3RyaW5nfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQge1VybCwgUm9vdFVybCwgY29udmVydFVybFBhcmFtc1RvQXJyYXl9IGZyb20gJy4uLy4uL3VybF9wYXJzZXInO1xuaW1wb3J0IHtSb3V0ZVBhdGgsIEdlbmVyYXRlZFVybCwgTWF0Y2hlZFVybH0gZnJvbSAnLi9yb3V0ZV9wYXRoJztcblxuXG5cbi8qKlxuICogYFBhcmFtUm91dGVQYXRoYHMgYXJlIG1hZGUgdXAgb2YgYFBhdGhTZWdtZW50YHMsIGVhY2ggb2Ygd2hpY2ggY2FuXG4gKiBtYXRjaCBhIHNlZ21lbnQgb2YgYSBVUkwuIERpZmZlcmVudCBraW5kIG9mIGBQYXRoU2VnbWVudGBzIG1hdGNoXG4gKiBVUkwgc2VnbWVudHMgaW4gZGlmZmVyZW50IHdheXMuLi5cbiAqL1xuaW50ZXJmYWNlIFBhdGhTZWdtZW50IHtcbiAgbmFtZTogc3RyaW5nO1xuICBnZW5lcmF0ZShwYXJhbXM6IFRvdWNoTWFwKTogc3RyaW5nO1xuICBtYXRjaChwYXRoOiBzdHJpbmcpOiBib29sZWFuO1xuICBzcGVjaWZpY2l0eTogc3RyaW5nO1xuICBoYXNoOiBzdHJpbmc7XG59XG5cbi8qKlxuICogSWRlbnRpZmllZCBieSBhIGAuLi5gIFVSTCBzZWdtZW50LiBUaGlzIGluZGljYXRlcyB0aGF0IHRoZVxuICogUm91dGUgd2lsbCBjb250aW51ZSB0byBiZSBtYXRjaGVkIGJ5IGNoaWxkIGBSb3V0ZXJgcy5cbiAqL1xuY2xhc3MgQ29udGludWF0aW9uUGF0aFNlZ21lbnQgaW1wbGVtZW50cyBQYXRoU2VnbWVudCB7XG4gIG5hbWU6IHN0cmluZyA9ICcnO1xuICBzcGVjaWZpY2l0eSA9ICcnO1xuICBoYXNoID0gJy4uLic7XG4gIGdlbmVyYXRlKHBhcmFtczogVG91Y2hNYXApOiBzdHJpbmcgeyByZXR1cm4gJyc7IH1cbiAgbWF0Y2gocGF0aDogc3RyaW5nKTogYm9vbGVhbiB7IHJldHVybiB0cnVlOyB9XG59XG5cbi8qKlxuICogSWRlbnRpZmllZCBieSBhIHN0cmluZyBub3Qgc3RhcnRpbmcgd2l0aCBhIGA6YCBvciBgKmAuXG4gKiBPbmx5IG1hdGNoZXMgdGhlIFVSTCBzZWdtZW50cyB0aGF0IGVxdWFsIHRoZSBzZWdtZW50IHBhdGhcbiAqL1xuY2xhc3MgU3RhdGljUGF0aFNlZ21lbnQgaW1wbGVtZW50cyBQYXRoU2VnbWVudCB7XG4gIG5hbWU6IHN0cmluZyA9ICcnO1xuICBzcGVjaWZpY2l0eSA9ICcyJztcbiAgaGFzaDogc3RyaW5nO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGF0aDogc3RyaW5nKSB7IHRoaXMuaGFzaCA9IHBhdGg7IH1cbiAgbWF0Y2gocGF0aDogc3RyaW5nKTogYm9vbGVhbiB7IHJldHVybiBwYXRoID09IHRoaXMucGF0aDsgfVxuICBnZW5lcmF0ZShwYXJhbXM6IFRvdWNoTWFwKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMucGF0aDsgfVxufVxuXG4vKipcbiAqIElkZW50aWZpZWQgYnkgYSBzdHJpbmcgc3RhcnRpbmcgd2l0aCBgOmAuIEluZGljYXRlcyBhIHNlZ21lbnRcbiAqIHRoYXQgY2FuIGNvbnRhaW4gYSB2YWx1ZSB0aGF0IHdpbGwgYmUgZXh0cmFjdGVkIGFuZCBwcm92aWRlZCB0b1xuICogYSBtYXRjaGluZyBgSW5zdHJ1Y3Rpb25gLlxuICovXG5jbGFzcyBEeW5hbWljUGF0aFNlZ21lbnQgaW1wbGVtZW50cyBQYXRoU2VnbWVudCB7XG4gIHN0YXRpYyBwYXJhbU1hdGNoZXIgPSAvXjooW15cXC9dKykkL2c7XG4gIHNwZWNpZmljaXR5ID0gJzEnO1xuICBoYXNoID0gJzonO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7fVxuICBtYXRjaChwYXRoOiBzdHJpbmcpOiBib29sZWFuIHsgcmV0dXJuIHBhdGgubGVuZ3RoID4gMDsgfVxuICBnZW5lcmF0ZShwYXJhbXM6IFRvdWNoTWFwKTogc3RyaW5nIHtcbiAgICBpZiAoIVN0cmluZ01hcFdyYXBwZXIuY29udGFpbnMocGFyYW1zLm1hcCwgdGhpcy5uYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgICAgYFJvdXRlIGdlbmVyYXRvciBmb3IgJyR7dGhpcy5uYW1lfScgd2FzIG5vdCBpbmNsdWRlZCBpbiBwYXJhbWV0ZXJzIHBhc3NlZC5gKTtcbiAgICB9XG4gICAgcmV0dXJuIGVuY29kZUR5bmFtaWNTZWdtZW50KG5vcm1hbGl6ZVN0cmluZyhwYXJhbXMuZ2V0KHRoaXMubmFtZSkpKTtcbiAgfVxufVxuXG4vKipcbiAqIElkZW50aWZpZWQgYnkgYSBzdHJpbmcgc3RhcnRpbmcgd2l0aCBgKmAgSW5kaWNhdGVzIHRoYXQgYWxsIHRoZSBmb2xsb3dpbmdcbiAqIHNlZ21lbnRzIG1hdGNoIHRoaXMgcm91dGUgYW5kIHRoYXQgdGhlIHZhbHVlIG9mIHRoZXNlIHNlZ21lbnRzIHNob3VsZFxuICogYmUgcHJvdmlkZWQgdG8gYSBtYXRjaGluZyBgSW5zdHJ1Y3Rpb25gLlxuICovXG5jbGFzcyBTdGFyUGF0aFNlZ21lbnQgaW1wbGVtZW50cyBQYXRoU2VnbWVudCB7XG4gIHN0YXRpYyB3aWxkY2FyZE1hdGNoZXIgPSAvXlxcKihbXlxcL10rKSQvZztcbiAgc3BlY2lmaWNpdHkgPSAnMCc7XG4gIGhhc2ggPSAnKic7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHt9XG4gIG1hdGNoKHBhdGg6IHN0cmluZyk6IGJvb2xlYW4geyByZXR1cm4gdHJ1ZTsgfVxuICBnZW5lcmF0ZShwYXJhbXM6IFRvdWNoTWFwKTogc3RyaW5nIHsgcmV0dXJuIG5vcm1hbGl6ZVN0cmluZyhwYXJhbXMuZ2V0KHRoaXMubmFtZSkpOyB9XG59XG5cbi8qKlxuICogUGFyc2VzIGEgVVJMIHN0cmluZyB1c2luZyBhIGdpdmVuIG1hdGNoZXIgRFNMLCBhbmQgZ2VuZXJhdGVzIFVSTHMgZnJvbSBwYXJhbSBtYXBzXG4gKi9cbmV4cG9ydCBjbGFzcyBQYXJhbVJvdXRlUGF0aCBpbXBsZW1lbnRzIFJvdXRlUGF0aCB7XG4gIHNwZWNpZmljaXR5OiBzdHJpbmc7XG4gIHRlcm1pbmFsOiBib29sZWFuID0gdHJ1ZTtcbiAgaGFzaDogc3RyaW5nO1xuXG4gIHByaXZhdGUgX3NlZ21lbnRzOiBQYXRoU2VnbWVudFtdO1xuXG4gIC8qKlxuICAgKiBUYWtlcyBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIG1hdGNoZXIgRFNMXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcm91dGVQYXRoOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9hc3NlcnRWYWxpZFBhdGgocm91dGVQYXRoKTtcblxuICAgIHRoaXMuX3BhcnNlUGF0aFN0cmluZyhyb3V0ZVBhdGgpO1xuICAgIHRoaXMuc3BlY2lmaWNpdHkgPSB0aGlzLl9jYWxjdWxhdGVTcGVjaWZpY2l0eSgpO1xuICAgIHRoaXMuaGFzaCA9IHRoaXMuX2NhbGN1bGF0ZUhhc2goKTtcblxuICAgIHZhciBsYXN0U2VnbWVudCA9IHRoaXMuX3NlZ21lbnRzW3RoaXMuX3NlZ21lbnRzLmxlbmd0aCAtIDFdO1xuICAgIHRoaXMudGVybWluYWwgPSAhKGxhc3RTZWdtZW50IGluc3RhbmNlb2YgQ29udGludWF0aW9uUGF0aFNlZ21lbnQpO1xuICB9XG5cbiAgbWF0Y2hVcmwodXJsOiBVcmwpOiBNYXRjaGVkVXJsIHtcbiAgICB2YXIgbmV4dFVybFNlZ21lbnQgPSB1cmw7XG4gICAgdmFyIGN1cnJlbnRVcmxTZWdtZW50OiBVcmw7XG4gICAgdmFyIHBvc2l0aW9uYWxQYXJhbXMgPSB7fTtcbiAgICB2YXIgY2FwdHVyZWQ6IHN0cmluZ1tdID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3NlZ21lbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgcGF0aFNlZ21lbnQgPSB0aGlzLl9zZWdtZW50c1tpXTtcblxuICAgICAgY3VycmVudFVybFNlZ21lbnQgPSBuZXh0VXJsU2VnbWVudDtcbiAgICAgIGlmIChwYXRoU2VnbWVudCBpbnN0YW5jZW9mIENvbnRpbnVhdGlvblBhdGhTZWdtZW50KSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNQcmVzZW50KGN1cnJlbnRVcmxTZWdtZW50KSkge1xuICAgICAgICAvLyB0aGUgc3RhciBzZWdtZW50IGNvbnN1bWVzIGFsbCBvZiB0aGUgcmVtYWluaW5nIFVSTCwgaW5jbHVkaW5nIG1hdHJpeCBwYXJhbXNcbiAgICAgICAgaWYgKHBhdGhTZWdtZW50IGluc3RhbmNlb2YgU3RhclBhdGhTZWdtZW50KSB7XG4gICAgICAgICAgcG9zaXRpb25hbFBhcmFtc1twYXRoU2VnbWVudC5uYW1lXSA9IGN1cnJlbnRVcmxTZWdtZW50LnRvU3RyaW5nKCk7XG4gICAgICAgICAgY2FwdHVyZWQucHVzaChjdXJyZW50VXJsU2VnbWVudC50b1N0cmluZygpKTtcbiAgICAgICAgICBuZXh0VXJsU2VnbWVudCA9IG51bGw7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXB0dXJlZC5wdXNoKGN1cnJlbnRVcmxTZWdtZW50LnBhdGgpO1xuXG4gICAgICAgIGlmIChwYXRoU2VnbWVudCBpbnN0YW5jZW9mIER5bmFtaWNQYXRoU2VnbWVudCkge1xuICAgICAgICAgIHBvc2l0aW9uYWxQYXJhbXNbcGF0aFNlZ21lbnQubmFtZV0gPSBkZWNvZGVEeW5hbWljU2VnbWVudChjdXJyZW50VXJsU2VnbWVudC5wYXRoKTtcbiAgICAgICAgfSBlbHNlIGlmICghcGF0aFNlZ21lbnQubWF0Y2goY3VycmVudFVybFNlZ21lbnQucGF0aCkpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIG5leHRVcmxTZWdtZW50ID0gY3VycmVudFVybFNlZ21lbnQuY2hpbGQ7XG4gICAgICB9IGVsc2UgaWYgKCFwYXRoU2VnbWVudC5tYXRjaCgnJykpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudGVybWluYWwgJiYgaXNQcmVzZW50KG5leHRVcmxTZWdtZW50KSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIHVybFBhdGggPSBjYXB0dXJlZC5qb2luKCcvJyk7XG5cbiAgICB2YXIgYXV4aWxpYXJ5ID0gW107XG4gICAgdmFyIHVybFBhcmFtcyA9IFtdO1xuICAgIHZhciBhbGxQYXJhbXMgPSBwb3NpdGlvbmFsUGFyYW1zO1xuICAgIGlmIChpc1ByZXNlbnQoY3VycmVudFVybFNlZ21lbnQpKSB7XG4gICAgICAvLyBJZiB0aGlzIGlzIHRoZSByb290IGNvbXBvbmVudCwgcmVhZCBxdWVyeSBwYXJhbXMuIE90aGVyd2lzZSwgcmVhZCBtYXRyaXggcGFyYW1zLlxuICAgICAgdmFyIHBhcmFtc1NlZ21lbnQgPSB1cmwgaW5zdGFuY2VvZiBSb290VXJsID8gdXJsIDogY3VycmVudFVybFNlZ21lbnQ7XG5cbiAgICAgIGlmIChpc1ByZXNlbnQocGFyYW1zU2VnbWVudC5wYXJhbXMpKSB7XG4gICAgICAgIGFsbFBhcmFtcyA9IFN0cmluZ01hcFdyYXBwZXIubWVyZ2UocGFyYW1zU2VnbWVudC5wYXJhbXMsIHBvc2l0aW9uYWxQYXJhbXMpO1xuICAgICAgICB1cmxQYXJhbXMgPSBjb252ZXJ0VXJsUGFyYW1zVG9BcnJheShwYXJhbXNTZWdtZW50LnBhcmFtcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbGxQYXJhbXMgPSBwb3NpdGlvbmFsUGFyYW1zO1xuICAgICAgfVxuICAgICAgYXV4aWxpYXJ5ID0gY3VycmVudFVybFNlZ21lbnQuYXV4aWxpYXJ5O1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgTWF0Y2hlZFVybCh1cmxQYXRoLCB1cmxQYXJhbXMsIGFsbFBhcmFtcywgYXV4aWxpYXJ5LCBuZXh0VXJsU2VnbWVudCk7XG4gIH1cblxuXG4gIGdlbmVyYXRlVXJsKHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0pOiBHZW5lcmF0ZWRVcmwge1xuICAgIHZhciBwYXJhbVRva2VucyA9IG5ldyBUb3VjaE1hcChwYXJhbXMpO1xuXG4gICAgdmFyIHBhdGggPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fc2VnbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBzZWdtZW50ID0gdGhpcy5fc2VnbWVudHNbaV07XG4gICAgICBpZiAoIShzZWdtZW50IGluc3RhbmNlb2YgQ29udGludWF0aW9uUGF0aFNlZ21lbnQpKSB7XG4gICAgICAgIHBhdGgucHVzaChzZWdtZW50LmdlbmVyYXRlKHBhcmFtVG9rZW5zKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciB1cmxQYXRoID0gcGF0aC5qb2luKCcvJyk7XG5cbiAgICB2YXIgbm9uUG9zaXRpb25hbFBhcmFtcyA9IHBhcmFtVG9rZW5zLmdldFVudXNlZCgpO1xuICAgIHZhciB1cmxQYXJhbXMgPSBub25Qb3NpdGlvbmFsUGFyYW1zO1xuXG4gICAgcmV0dXJuIG5ldyBHZW5lcmF0ZWRVcmwodXJsUGF0aCwgdXJsUGFyYW1zKTtcbiAgfVxuXG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMucm91dGVQYXRoOyB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VQYXRoU3RyaW5nKHJvdXRlUGF0aDogc3RyaW5nKSB7XG4gICAgLy8gbm9ybWFsaXplIHJvdXRlIGFzIG5vdCBzdGFydGluZyB3aXRoIGEgXCIvXCIuIFJlY29nbml0aW9uIHdpbGxcbiAgICAvLyBhbHNvIG5vcm1hbGl6ZS5cbiAgICBpZiAocm91dGVQYXRoLnN0YXJ0c1dpdGgoXCIvXCIpKSB7XG4gICAgICByb3V0ZVBhdGggPSByb3V0ZVBhdGguc3Vic3RyaW5nKDEpO1xuICAgIH1cblxuICAgIHZhciBzZWdtZW50U3RyaW5ncyA9IHJvdXRlUGF0aC5zcGxpdCgnLycpO1xuICAgIHRoaXMuX3NlZ21lbnRzID0gW107XG5cbiAgICB2YXIgbGltaXQgPSBzZWdtZW50U3RyaW5ncy5sZW5ndGggLSAxO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGxpbWl0OyBpKyspIHtcbiAgICAgIHZhciBzZWdtZW50ID0gc2VnbWVudFN0cmluZ3NbaV0sIG1hdGNoO1xuXG4gICAgICBpZiAoaXNQcmVzZW50KG1hdGNoID0gUmVnRXhwV3JhcHBlci5maXJzdE1hdGNoKER5bmFtaWNQYXRoU2VnbWVudC5wYXJhbU1hdGNoZXIsIHNlZ21lbnQpKSkge1xuICAgICAgICB0aGlzLl9zZWdtZW50cy5wdXNoKG5ldyBEeW5hbWljUGF0aFNlZ21lbnQobWF0Y2hbMV0pKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KFxuICAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSBSZWdFeHBXcmFwcGVyLmZpcnN0TWF0Y2goU3RhclBhdGhTZWdtZW50LndpbGRjYXJkTWF0Y2hlciwgc2VnbWVudCkpKSB7XG4gICAgICAgIHRoaXMuX3NlZ21lbnRzLnB1c2gobmV3IFN0YXJQYXRoU2VnbWVudChtYXRjaFsxXSkpO1xuICAgICAgfSBlbHNlIGlmIChzZWdtZW50ID09ICcuLi4nKSB7XG4gICAgICAgIGlmIChpIDwgbGltaXQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcbiAgICAgICAgICAgICAgYFVuZXhwZWN0ZWQgXCIuLi5cIiBiZWZvcmUgdGhlIGVuZCBvZiB0aGUgcGF0aCBmb3IgXCIke3JvdXRlUGF0aH1cIi5gKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zZWdtZW50cy5wdXNoKG5ldyBDb250aW51YXRpb25QYXRoU2VnbWVudCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3NlZ21lbnRzLnB1c2gobmV3IFN0YXRpY1BhdGhTZWdtZW50KHNlZ21lbnQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jYWxjdWxhdGVTcGVjaWZpY2l0eSgpOiBzdHJpbmcge1xuICAgIC8vIFRoZSBcInNwZWNpZmljaXR5XCIgb2YgYSBwYXRoIGlzIHVzZWQgdG8gZGV0ZXJtaW5lIHdoaWNoIHJvdXRlIGlzIHVzZWQgd2hlbiBtdWx0aXBsZSByb3V0ZXNcbiAgICAvLyBtYXRjaFxuICAgIC8vIGEgVVJMLiBTdGF0aWMgc2VnbWVudHMgKGxpa2UgXCIvZm9vXCIpIGFyZSB0aGUgbW9zdCBzcGVjaWZpYywgZm9sbG93ZWQgYnkgZHluYW1pYyBzZWdtZW50c1xuICAgIC8vIChsaWtlXG4gICAgLy8gXCIvOmlkXCIpLiBTdGFyIHNlZ21lbnRzIGFkZCBubyBzcGVjaWZpY2l0eS4gU2VnbWVudHMgYXQgdGhlIHN0YXJ0IG9mIHRoZSBwYXRoIGFyZSBtb3JlXG4gICAgLy8gc3BlY2lmaWNcbiAgICAvLyB0aGFuIHByb2NlZWRpbmcgb25lcy5cbiAgICAvL1xuICAgIC8vIFRoZSBjb2RlIGJlbG93IHVzZXMgcGxhY2UgdmFsdWVzIHRvIGNvbWJpbmUgdGhlIGRpZmZlcmVudCB0eXBlcyBvZiBzZWdtZW50cyBpbnRvIGEgc2luZ2xlXG4gICAgLy8gc3RyaW5nIHRoYXQgd2UgY2FuIHNvcnQgbGF0ZXIuIEVhY2ggc3RhdGljIHNlZ21lbnQgaXMgbWFya2VkIGFzIGEgc3BlY2lmaWNpdHkgb2YgXCIyLFwiIGVhY2hcbiAgICAvLyBkeW5hbWljIHNlZ21lbnQgaXMgd29ydGggXCIxXCIgc3BlY2lmaWNpdHksIGFuZCBzdGFycyBhcmUgd29ydGggXCIwXCIgc3BlY2lmaWNpdHkuXG4gICAgdmFyIGksIGxlbmd0aCA9IHRoaXMuX3NlZ21lbnRzLmxlbmd0aCwgc3BlY2lmaWNpdHk7XG4gICAgaWYgKGxlbmd0aCA9PSAwKSB7XG4gICAgICAvLyBhIHNpbmdsZSBzbGFzaCAob3IgXCJlbXB0eSBzZWdtZW50XCIgaXMgYXMgc3BlY2lmaWMgYXMgYSBzdGF0aWMgc2VnbWVudFxuICAgICAgc3BlY2lmaWNpdHkgKz0gJzInO1xuICAgIH0gZWxzZSB7XG4gICAgICBzcGVjaWZpY2l0eSA9ICcnO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHNwZWNpZmljaXR5ICs9IHRoaXMuX3NlZ21lbnRzW2ldLnNwZWNpZmljaXR5O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3BlY2lmaWNpdHk7XG4gIH1cblxuICBwcml2YXRlIF9jYWxjdWxhdGVIYXNoKCk6IHN0cmluZyB7XG4gICAgLy8gdGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGRldGVybWluZSB3aGV0aGVyIGEgcm91dGUgY29uZmlnIHBhdGggbGlrZSBgL2Zvby86aWRgIGNvbGxpZGVzIHdpdGhcbiAgICAvLyBgL2Zvby86bmFtZWBcbiAgICB2YXIgaSwgbGVuZ3RoID0gdGhpcy5fc2VnbWVudHMubGVuZ3RoO1xuICAgIHZhciBoYXNoUGFydHMgPSBbXTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGhhc2hQYXJ0cy5wdXNoKHRoaXMuX3NlZ21lbnRzW2ldLmhhc2gpO1xuICAgIH1cbiAgICByZXR1cm4gaGFzaFBhcnRzLmpvaW4oJy8nKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Fzc2VydFZhbGlkUGF0aChwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAoU3RyaW5nV3JhcHBlci5jb250YWlucyhwYXRoLCAnIycpKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcbiAgICAgICAgICBgUGF0aCBcIiR7cGF0aH1cIiBzaG91bGQgbm90IGluY2x1ZGUgXCIjXCIuIFVzZSBcIkhhc2hMb2NhdGlvblN0cmF0ZWd5XCIgaW5zdGVhZC5gKTtcbiAgICB9XG4gICAgdmFyIGlsbGVnYWxDaGFyYWN0ZXIgPSBSZWdFeHBXcmFwcGVyLmZpcnN0TWF0Y2goUGFyYW1Sb3V0ZVBhdGguUkVTRVJWRURfQ0hBUlMsIHBhdGgpO1xuICAgIGlmIChpc1ByZXNlbnQoaWxsZWdhbENoYXJhY3RlcikpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFxuICAgICAgICAgIGBQYXRoIFwiJHtwYXRofVwiIGNvbnRhaW5zIFwiJHtpbGxlZ2FsQ2hhcmFjdGVyWzBdfVwiIHdoaWNoIGlzIG5vdCBhbGxvd2VkIGluIGEgcm91dGUgY29uZmlnLmApO1xuICAgIH1cbiAgfVxuICBzdGF0aWMgUkVTRVJWRURfQ0hBUlMgPSBSZWdFeHBXcmFwcGVyLmNyZWF0ZSgnLy98XFxcXCh8XFxcXCl8O3xcXFxcP3w9Jyk7XG59XG5cbmxldCBSRUdFWFBfUEVSQ0VOVCA9IC8lL2c7XG5sZXQgUkVHRVhQX1NMQVNIID0gL1xcLy9nO1xubGV0IFJFR0VYUF9PUEVOX1BBUkVOVCA9IC9cXCgvZztcbmxldCBSRUdFWFBfQ0xPU0VfUEFSRU5UID0gL1xcKS9nO1xubGV0IFJFR0VYUF9TRU1JQ09MT04gPSAvOy9nO1xuXG5mdW5jdGlvbiBlbmNvZGVEeW5hbWljU2VnbWVudCh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKGlzQmxhbmsodmFsdWUpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2YWx1ZSA9IFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbCh2YWx1ZSwgUkVHRVhQX1BFUkNFTlQsICclMjUnKTtcbiAgdmFsdWUgPSBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGwodmFsdWUsIFJFR0VYUF9TTEFTSCwgJyUyRicpO1xuICB2YWx1ZSA9IFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbCh2YWx1ZSwgUkVHRVhQX09QRU5fUEFSRU5ULCAnJTI4Jyk7XG4gIHZhbHVlID0gU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsKHZhbHVlLCBSRUdFWFBfQ0xPU0VfUEFSRU5ULCAnJTI5Jyk7XG4gIHZhbHVlID0gU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsKHZhbHVlLCBSRUdFWFBfU0VNSUNPTE9OLCAnJTNCJyk7XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5sZXQgUkVHRVhQX0VOQ19TRU1JQ09MT04gPSAvJTNCL2lnO1xubGV0IFJFR0VYUF9FTkNfQ0xPU0VfUEFSRU5UID0gLyUyOS9pZztcbmxldCBSRUdFWFBfRU5DX09QRU5fUEFSRU5UID0gLyUyOC9pZztcbmxldCBSRUdFWFBfRU5DX1NMQVNIID0gLyUyRi9pZztcbmxldCBSRUdFWFBfRU5DX1BFUkNFTlQgPSAvJTI1L2lnO1xuXG5mdW5jdGlvbiBkZWNvZGVEeW5hbWljU2VnbWVudCh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKGlzQmxhbmsodmFsdWUpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2YWx1ZSA9IFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbCh2YWx1ZSwgUkVHRVhQX0VOQ19TRU1JQ09MT04sICc7Jyk7XG4gIHZhbHVlID0gU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsKHZhbHVlLCBSRUdFWFBfRU5DX0NMT1NFX1BBUkVOVCwgJyknKTtcbiAgdmFsdWUgPSBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGwodmFsdWUsIFJFR0VYUF9FTkNfT1BFTl9QQVJFTlQsICcoJyk7XG4gIHZhbHVlID0gU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsKHZhbHVlLCBSRUdFWFBfRU5DX1NMQVNILCAnLycpO1xuICB2YWx1ZSA9IFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbCh2YWx1ZSwgUkVHRVhQX0VOQ19QRVJDRU5ULCAnJScpO1xuXG4gIHJldHVybiB2YWx1ZTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
