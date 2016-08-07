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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9ydWxlcy9yb3V0ZV9wYXRocy9wYXJhbV9yb3V0ZV9wYXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7eUdBZ1JJLGNBQWMsRUFDZCxZQUFZLEVBQ1osa0JBQWtCLEVBQ2xCLG1CQUFtQixFQUNuQixnQkFBZ0IsRUFnQmhCLG9CQUFvQixFQUNwQix1QkFBdUIsRUFDdkIsc0JBQXNCLEVBQ3RCLGdCQUFnQixFQUNoQixrQkFBa0I7SUFsQnRCLDhCQUE4QixLQUFhO1FBQ3pDLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUM7UUFFRCxLQUFLLEdBQUcsb0JBQWEsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMvRCxLQUFLLEdBQUcsb0JBQWEsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM3RCxLQUFLLEdBQUcsb0JBQWEsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ25FLEtBQUssR0FBRyxvQkFBYSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEUsS0FBSyxHQUFHLG9CQUFhLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVqRSxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQVFELDhCQUE4QixLQUFhO1FBQ3pDLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUM7UUFFRCxLQUFLLEdBQUcsb0JB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LEtBQUssQ0FBQztZQUMzQixtQkFBbUIsR0FBRyxLQUFLLENBQUM7WUFDNUIsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1lBZ0J4QixvQkFBb0IsR0FBRyxPQUFPLENBQUM7WUFDL0IsdUJBQXVCLEdBQUcsT0FBTyxDQUFDO1lBQ2xDLHNCQUFzQixHQUFHLE9BQU8sQ0FBQztZQUNqQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUM7WUFDM0Isa0JBQWtCLEdBQUcsT0FBTyxDQUFDIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9ydWxlcy9yb3V0ZV9wYXRocy9wYXJhbV9yb3V0ZV9wYXRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWdFeHBXcmFwcGVyLCBTdHJpbmdXcmFwcGVyLCBpc1ByZXNlbnQsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge1N0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5cbmltcG9ydCB7VG91Y2hNYXAsIG5vcm1hbGl6ZVN0cmluZ30gZnJvbSAnLi4vLi4vdXRpbHMnO1xuaW1wb3J0IHtVcmwsIFJvb3RVcmwsIGNvbnZlcnRVcmxQYXJhbXNUb0FycmF5fSBmcm9tICcuLi8uLi91cmxfcGFyc2VyJztcbmltcG9ydCB7Um91dGVQYXRoLCBHZW5lcmF0ZWRVcmwsIE1hdGNoZWRVcmx9IGZyb20gJy4vcm91dGVfcGF0aCc7XG5cblxuXG4vKipcbiAqIGBQYXJhbVJvdXRlUGF0aGBzIGFyZSBtYWRlIHVwIG9mIGBQYXRoU2VnbWVudGBzLCBlYWNoIG9mIHdoaWNoIGNhblxuICogbWF0Y2ggYSBzZWdtZW50IG9mIGEgVVJMLiBEaWZmZXJlbnQga2luZCBvZiBgUGF0aFNlZ21lbnRgcyBtYXRjaFxuICogVVJMIHNlZ21lbnRzIGluIGRpZmZlcmVudCB3YXlzLi4uXG4gKi9cbmludGVyZmFjZSBQYXRoU2VnbWVudCB7XG4gIG5hbWU6IHN0cmluZztcbiAgZ2VuZXJhdGUocGFyYW1zOiBUb3VjaE1hcCk6IHN0cmluZztcbiAgbWF0Y2gocGF0aDogc3RyaW5nKTogYm9vbGVhbjtcbiAgc3BlY2lmaWNpdHk6IHN0cmluZztcbiAgaGFzaDogc3RyaW5nO1xufVxuXG4vKipcbiAqIElkZW50aWZpZWQgYnkgYSBgLi4uYCBVUkwgc2VnbWVudC4gVGhpcyBpbmRpY2F0ZXMgdGhhdCB0aGVcbiAqIFJvdXRlIHdpbGwgY29udGludWUgdG8gYmUgbWF0Y2hlZCBieSBjaGlsZCBgUm91dGVyYHMuXG4gKi9cbmNsYXNzIENvbnRpbnVhdGlvblBhdGhTZWdtZW50IGltcGxlbWVudHMgUGF0aFNlZ21lbnQge1xuICBuYW1lOiBzdHJpbmcgPSAnJztcbiAgc3BlY2lmaWNpdHkgPSAnJztcbiAgaGFzaCA9ICcuLi4nO1xuICBnZW5lcmF0ZShwYXJhbXM6IFRvdWNoTWFwKTogc3RyaW5nIHsgcmV0dXJuICcnOyB9XG4gIG1hdGNoKHBhdGg6IHN0cmluZyk6IGJvb2xlYW4geyByZXR1cm4gdHJ1ZTsgfVxufVxuXG4vKipcbiAqIElkZW50aWZpZWQgYnkgYSBzdHJpbmcgbm90IHN0YXJ0aW5nIHdpdGggYSBgOmAgb3IgYCpgLlxuICogT25seSBtYXRjaGVzIHRoZSBVUkwgc2VnbWVudHMgdGhhdCBlcXVhbCB0aGUgc2VnbWVudCBwYXRoXG4gKi9cbmNsYXNzIFN0YXRpY1BhdGhTZWdtZW50IGltcGxlbWVudHMgUGF0aFNlZ21lbnQge1xuICBuYW1lOiBzdHJpbmcgPSAnJztcbiAgc3BlY2lmaWNpdHkgPSAnMic7XG4gIGhhc2g6IHN0cmluZztcbiAgY29uc3RydWN0b3IocHVibGljIHBhdGg6IHN0cmluZykgeyB0aGlzLmhhc2ggPSBwYXRoOyB9XG4gIG1hdGNoKHBhdGg6IHN0cmluZyk6IGJvb2xlYW4geyByZXR1cm4gcGF0aCA9PSB0aGlzLnBhdGg7IH1cbiAgZ2VuZXJhdGUocGFyYW1zOiBUb3VjaE1hcCk6IHN0cmluZyB7IHJldHVybiB0aGlzLnBhdGg7IH1cbn1cblxuLyoqXG4gKiBJZGVudGlmaWVkIGJ5IGEgc3RyaW5nIHN0YXJ0aW5nIHdpdGggYDpgLiBJbmRpY2F0ZXMgYSBzZWdtZW50XG4gKiB0aGF0IGNhbiBjb250YWluIGEgdmFsdWUgdGhhdCB3aWxsIGJlIGV4dHJhY3RlZCBhbmQgcHJvdmlkZWQgdG9cbiAqIGEgbWF0Y2hpbmcgYEluc3RydWN0aW9uYC5cbiAqL1xuY2xhc3MgRHluYW1pY1BhdGhTZWdtZW50IGltcGxlbWVudHMgUGF0aFNlZ21lbnQge1xuICBzdGF0aWMgcGFyYW1NYXRjaGVyID0gL146KFteXFwvXSspJC9nO1xuICBzcGVjaWZpY2l0eSA9ICcxJztcbiAgaGFzaCA9ICc6JztcbiAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge31cbiAgbWF0Y2gocGF0aDogc3RyaW5nKTogYm9vbGVhbiB7IHJldHVybiBwYXRoLmxlbmd0aCA+IDA7IH1cbiAgZ2VuZXJhdGUocGFyYW1zOiBUb3VjaE1hcCk6IHN0cmluZyB7XG4gICAgaWYgKCFTdHJpbmdNYXBXcmFwcGVyLmNvbnRhaW5zKHBhcmFtcy5tYXAsIHRoaXMubmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFxuICAgICAgICAgIGBSb3V0ZSBnZW5lcmF0b3IgZm9yICcke3RoaXMubmFtZX0nIHdhcyBub3QgaW5jbHVkZWQgaW4gcGFyYW1ldGVycyBwYXNzZWQuYCk7XG4gICAgfVxuICAgIHJldHVybiBlbmNvZGVEeW5hbWljU2VnbWVudChub3JtYWxpemVTdHJpbmcocGFyYW1zLmdldCh0aGlzLm5hbWUpKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBJZGVudGlmaWVkIGJ5IGEgc3RyaW5nIHN0YXJ0aW5nIHdpdGggYCpgIEluZGljYXRlcyB0aGF0IGFsbCB0aGUgZm9sbG93aW5nXG4gKiBzZWdtZW50cyBtYXRjaCB0aGlzIHJvdXRlIGFuZCB0aGF0IHRoZSB2YWx1ZSBvZiB0aGVzZSBzZWdtZW50cyBzaG91bGRcbiAqIGJlIHByb3ZpZGVkIHRvIGEgbWF0Y2hpbmcgYEluc3RydWN0aW9uYC5cbiAqL1xuY2xhc3MgU3RhclBhdGhTZWdtZW50IGltcGxlbWVudHMgUGF0aFNlZ21lbnQge1xuICBzdGF0aWMgd2lsZGNhcmRNYXRjaGVyID0gL15cXCooW15cXC9dKykkL2c7XG4gIHNwZWNpZmljaXR5ID0gJzAnO1xuICBoYXNoID0gJyonO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7fVxuICBtYXRjaChwYXRoOiBzdHJpbmcpOiBib29sZWFuIHsgcmV0dXJuIHRydWU7IH1cbiAgZ2VuZXJhdGUocGFyYW1zOiBUb3VjaE1hcCk6IHN0cmluZyB7IHJldHVybiBub3JtYWxpemVTdHJpbmcocGFyYW1zLmdldCh0aGlzLm5hbWUpKTsgfVxufVxuXG4vKipcbiAqIFBhcnNlcyBhIFVSTCBzdHJpbmcgdXNpbmcgYSBnaXZlbiBtYXRjaGVyIERTTCwgYW5kIGdlbmVyYXRlcyBVUkxzIGZyb20gcGFyYW0gbWFwc1xuICovXG5leHBvcnQgY2xhc3MgUGFyYW1Sb3V0ZVBhdGggaW1wbGVtZW50cyBSb3V0ZVBhdGgge1xuICBzcGVjaWZpY2l0eTogc3RyaW5nO1xuICB0ZXJtaW5hbDogYm9vbGVhbiA9IHRydWU7XG4gIGhhc2g6IHN0cmluZztcblxuICBwcml2YXRlIF9zZWdtZW50czogUGF0aFNlZ21lbnRbXTtcblxuICAvKipcbiAgICogVGFrZXMgYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBtYXRjaGVyIERTTFxuICAgKi9cbiAgY29uc3RydWN0b3IocHVibGljIHJvdXRlUGF0aDogc3RyaW5nKSB7XG4gICAgdGhpcy5fYXNzZXJ0VmFsaWRQYXRoKHJvdXRlUGF0aCk7XG5cbiAgICB0aGlzLl9wYXJzZVBhdGhTdHJpbmcocm91dGVQYXRoKTtcbiAgICB0aGlzLnNwZWNpZmljaXR5ID0gdGhpcy5fY2FsY3VsYXRlU3BlY2lmaWNpdHkoKTtcbiAgICB0aGlzLmhhc2ggPSB0aGlzLl9jYWxjdWxhdGVIYXNoKCk7XG5cbiAgICB2YXIgbGFzdFNlZ21lbnQgPSB0aGlzLl9zZWdtZW50c1t0aGlzLl9zZWdtZW50cy5sZW5ndGggLSAxXTtcbiAgICB0aGlzLnRlcm1pbmFsID0gIShsYXN0U2VnbWVudCBpbnN0YW5jZW9mIENvbnRpbnVhdGlvblBhdGhTZWdtZW50KTtcbiAgfVxuXG4gIG1hdGNoVXJsKHVybDogVXJsKTogTWF0Y2hlZFVybCB7XG4gICAgdmFyIG5leHRVcmxTZWdtZW50ID0gdXJsO1xuICAgIHZhciBjdXJyZW50VXJsU2VnbWVudDogVXJsO1xuICAgIHZhciBwb3NpdGlvbmFsUGFyYW1zID0ge307XG4gICAgdmFyIGNhcHR1cmVkOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9zZWdtZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdmFyIHBhdGhTZWdtZW50ID0gdGhpcy5fc2VnbWVudHNbaV07XG5cbiAgICAgIGN1cnJlbnRVcmxTZWdtZW50ID0gbmV4dFVybFNlZ21lbnQ7XG4gICAgICBpZiAocGF0aFNlZ21lbnQgaW5zdGFuY2VvZiBDb250aW51YXRpb25QYXRoU2VnbWVudCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaWYgKGlzUHJlc2VudChjdXJyZW50VXJsU2VnbWVudCkpIHtcbiAgICAgICAgLy8gdGhlIHN0YXIgc2VnbWVudCBjb25zdW1lcyBhbGwgb2YgdGhlIHJlbWFpbmluZyBVUkwsIGluY2x1ZGluZyBtYXRyaXggcGFyYW1zXG4gICAgICAgIGlmIChwYXRoU2VnbWVudCBpbnN0YW5jZW9mIFN0YXJQYXRoU2VnbWVudCkge1xuICAgICAgICAgIHBvc2l0aW9uYWxQYXJhbXNbcGF0aFNlZ21lbnQubmFtZV0gPSBjdXJyZW50VXJsU2VnbWVudC50b1N0cmluZygpO1xuICAgICAgICAgIGNhcHR1cmVkLnB1c2goY3VycmVudFVybFNlZ21lbnQudG9TdHJpbmcoKSk7XG4gICAgICAgICAgbmV4dFVybFNlZ21lbnQgPSBudWxsO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FwdHVyZWQucHVzaChjdXJyZW50VXJsU2VnbWVudC5wYXRoKTtcblxuICAgICAgICBpZiAocGF0aFNlZ21lbnQgaW5zdGFuY2VvZiBEeW5hbWljUGF0aFNlZ21lbnQpIHtcbiAgICAgICAgICBwb3NpdGlvbmFsUGFyYW1zW3BhdGhTZWdtZW50Lm5hbWVdID0gZGVjb2RlRHluYW1pY1NlZ21lbnQoY3VycmVudFVybFNlZ21lbnQucGF0aCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXBhdGhTZWdtZW50Lm1hdGNoKGN1cnJlbnRVcmxTZWdtZW50LnBhdGgpKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBuZXh0VXJsU2VnbWVudCA9IGN1cnJlbnRVcmxTZWdtZW50LmNoaWxkO1xuICAgICAgfSBlbHNlIGlmICghcGF0aFNlZ21lbnQubWF0Y2goJycpKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnRlcm1pbmFsICYmIGlzUHJlc2VudChuZXh0VXJsU2VnbWVudCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciB1cmxQYXRoID0gY2FwdHVyZWQuam9pbignLycpO1xuXG4gICAgdmFyIGF1eGlsaWFyeSA9IFtdO1xuICAgIHZhciB1cmxQYXJhbXMgPSBbXTtcbiAgICB2YXIgYWxsUGFyYW1zID0gcG9zaXRpb25hbFBhcmFtcztcbiAgICBpZiAoaXNQcmVzZW50KGN1cnJlbnRVcmxTZWdtZW50KSkge1xuICAgICAgLy8gSWYgdGhpcyBpcyB0aGUgcm9vdCBjb21wb25lbnQsIHJlYWQgcXVlcnkgcGFyYW1zLiBPdGhlcndpc2UsIHJlYWQgbWF0cml4IHBhcmFtcy5cbiAgICAgIHZhciBwYXJhbXNTZWdtZW50ID0gdXJsIGluc3RhbmNlb2YgUm9vdFVybCA/IHVybCA6IGN1cnJlbnRVcmxTZWdtZW50O1xuXG4gICAgICBpZiAoaXNQcmVzZW50KHBhcmFtc1NlZ21lbnQucGFyYW1zKSkge1xuICAgICAgICBhbGxQYXJhbXMgPSBTdHJpbmdNYXBXcmFwcGVyLm1lcmdlKHBhcmFtc1NlZ21lbnQucGFyYW1zLCBwb3NpdGlvbmFsUGFyYW1zKTtcbiAgICAgICAgdXJsUGFyYW1zID0gY29udmVydFVybFBhcmFtc1RvQXJyYXkocGFyYW1zU2VnbWVudC5wYXJhbXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWxsUGFyYW1zID0gcG9zaXRpb25hbFBhcmFtcztcbiAgICAgIH1cbiAgICAgIGF1eGlsaWFyeSA9IGN1cnJlbnRVcmxTZWdtZW50LmF1eGlsaWFyeTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IE1hdGNoZWRVcmwodXJsUGF0aCwgdXJsUGFyYW1zLCBhbGxQYXJhbXMsIGF1eGlsaWFyeSwgbmV4dFVybFNlZ21lbnQpO1xuICB9XG5cblxuICBnZW5lcmF0ZVVybChwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogR2VuZXJhdGVkVXJsIHtcbiAgICB2YXIgcGFyYW1Ub2tlbnMgPSBuZXcgVG91Y2hNYXAocGFyYW1zKTtcblxuICAgIHZhciBwYXRoID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3NlZ21lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgc2VnbWVudCA9IHRoaXMuX3NlZ21lbnRzW2ldO1xuICAgICAgaWYgKCEoc2VnbWVudCBpbnN0YW5jZW9mIENvbnRpbnVhdGlvblBhdGhTZWdtZW50KSkge1xuICAgICAgICBwYXRoLnB1c2goc2VnbWVudC5nZW5lcmF0ZShwYXJhbVRva2VucykpO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgdXJsUGF0aCA9IHBhdGguam9pbignLycpO1xuXG4gICAgdmFyIG5vblBvc2l0aW9uYWxQYXJhbXMgPSBwYXJhbVRva2Vucy5nZXRVbnVzZWQoKTtcbiAgICB2YXIgdXJsUGFyYW1zID0gbm9uUG9zaXRpb25hbFBhcmFtcztcblxuICAgIHJldHVybiBuZXcgR2VuZXJhdGVkVXJsKHVybFBhdGgsIHVybFBhcmFtcyk7XG4gIH1cblxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLnJvdXRlUGF0aDsgfVxuXG4gIHByaXZhdGUgX3BhcnNlUGF0aFN0cmluZyhyb3V0ZVBhdGg6IHN0cmluZykge1xuICAgIC8vIG5vcm1hbGl6ZSByb3V0ZSBhcyBub3Qgc3RhcnRpbmcgd2l0aCBhIFwiL1wiLiBSZWNvZ25pdGlvbiB3aWxsXG4gICAgLy8gYWxzbyBub3JtYWxpemUuXG4gICAgaWYgKHJvdXRlUGF0aC5zdGFydHNXaXRoKFwiL1wiKSkge1xuICAgICAgcm91dGVQYXRoID0gcm91dGVQYXRoLnN1YnN0cmluZygxKTtcbiAgICB9XG5cbiAgICB2YXIgc2VnbWVudFN0cmluZ3MgPSByb3V0ZVBhdGguc3BsaXQoJy8nKTtcbiAgICB0aGlzLl9zZWdtZW50cyA9IFtdO1xuXG4gICAgdmFyIGxpbWl0ID0gc2VnbWVudFN0cmluZ3MubGVuZ3RoIC0gMTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBsaW1pdDsgaSsrKSB7XG4gICAgICB2YXIgc2VnbWVudCA9IHNlZ21lbnRTdHJpbmdzW2ldLCBtYXRjaDtcblxuICAgICAgaWYgKGlzUHJlc2VudChtYXRjaCA9IFJlZ0V4cFdyYXBwZXIuZmlyc3RNYXRjaChEeW5hbWljUGF0aFNlZ21lbnQucGFyYW1NYXRjaGVyLCBzZWdtZW50KSkpIHtcbiAgICAgICAgdGhpcy5fc2VnbWVudHMucHVzaChuZXcgRHluYW1pY1BhdGhTZWdtZW50KG1hdGNoWzFdKSk7XG4gICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudChcbiAgICAgICAgICAgICAgICAgICAgIG1hdGNoID0gUmVnRXhwV3JhcHBlci5maXJzdE1hdGNoKFN0YXJQYXRoU2VnbWVudC53aWxkY2FyZE1hdGNoZXIsIHNlZ21lbnQpKSkge1xuICAgICAgICB0aGlzLl9zZWdtZW50cy5wdXNoKG5ldyBTdGFyUGF0aFNlZ21lbnQobWF0Y2hbMV0pKTtcbiAgICAgIH0gZWxzZSBpZiAoc2VnbWVudCA9PSAnLi4uJykge1xuICAgICAgICBpZiAoaSA8IGxpbWl0KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgICAgICAgIGBVbmV4cGVjdGVkIFwiLi4uXCIgYmVmb3JlIHRoZSBlbmQgb2YgdGhlIHBhdGggZm9yIFwiJHtyb3V0ZVBhdGh9XCIuYCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2VnbWVudHMucHVzaChuZXcgQ29udGludWF0aW9uUGF0aFNlZ21lbnQoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zZWdtZW50cy5wdXNoKG5ldyBTdGF0aWNQYXRoU2VnbWVudChzZWdtZW50KSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY2FsY3VsYXRlU3BlY2lmaWNpdHkoKTogc3RyaW5nIHtcbiAgICAvLyBUaGUgXCJzcGVjaWZpY2l0eVwiIG9mIGEgcGF0aCBpcyB1c2VkIHRvIGRldGVybWluZSB3aGljaCByb3V0ZSBpcyB1c2VkIHdoZW4gbXVsdGlwbGUgcm91dGVzXG4gICAgLy8gbWF0Y2hcbiAgICAvLyBhIFVSTC4gU3RhdGljIHNlZ21lbnRzIChsaWtlIFwiL2Zvb1wiKSBhcmUgdGhlIG1vc3Qgc3BlY2lmaWMsIGZvbGxvd2VkIGJ5IGR5bmFtaWMgc2VnbWVudHNcbiAgICAvLyAobGlrZVxuICAgIC8vIFwiLzppZFwiKS4gU3RhciBzZWdtZW50cyBhZGQgbm8gc3BlY2lmaWNpdHkuIFNlZ21lbnRzIGF0IHRoZSBzdGFydCBvZiB0aGUgcGF0aCBhcmUgbW9yZVxuICAgIC8vIHNwZWNpZmljXG4gICAgLy8gdGhhbiBwcm9jZWVkaW5nIG9uZXMuXG4gICAgLy9cbiAgICAvLyBUaGUgY29kZSBiZWxvdyB1c2VzIHBsYWNlIHZhbHVlcyB0byBjb21iaW5lIHRoZSBkaWZmZXJlbnQgdHlwZXMgb2Ygc2VnbWVudHMgaW50byBhIHNpbmdsZVxuICAgIC8vIHN0cmluZyB0aGF0IHdlIGNhbiBzb3J0IGxhdGVyLiBFYWNoIHN0YXRpYyBzZWdtZW50IGlzIG1hcmtlZCBhcyBhIHNwZWNpZmljaXR5IG9mIFwiMixcIiBlYWNoXG4gICAgLy8gZHluYW1pYyBzZWdtZW50IGlzIHdvcnRoIFwiMVwiIHNwZWNpZmljaXR5LCBhbmQgc3RhcnMgYXJlIHdvcnRoIFwiMFwiIHNwZWNpZmljaXR5LlxuICAgIHZhciBpLCBsZW5ndGggPSB0aGlzLl9zZWdtZW50cy5sZW5ndGgsIHNwZWNpZmljaXR5O1xuICAgIGlmIChsZW5ndGggPT0gMCkge1xuICAgICAgLy8gYSBzaW5nbGUgc2xhc2ggKG9yIFwiZW1wdHkgc2VnbWVudFwiIGlzIGFzIHNwZWNpZmljIGFzIGEgc3RhdGljIHNlZ21lbnRcbiAgICAgIHNwZWNpZmljaXR5ICs9ICcyJztcbiAgICB9IGVsc2Uge1xuICAgICAgc3BlY2lmaWNpdHkgPSAnJztcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBzcGVjaWZpY2l0eSArPSB0aGlzLl9zZWdtZW50c1tpXS5zcGVjaWZpY2l0eTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNwZWNpZmljaXR5O1xuICB9XG5cbiAgcHJpdmF0ZSBfY2FsY3VsYXRlSGFzaCgpOiBzdHJpbmcge1xuICAgIC8vIHRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBkZXRlcm1pbmUgd2hldGhlciBhIHJvdXRlIGNvbmZpZyBwYXRoIGxpa2UgYC9mb28vOmlkYCBjb2xsaWRlcyB3aXRoXG4gICAgLy8gYC9mb28vOm5hbWVgXG4gICAgdmFyIGksIGxlbmd0aCA9IHRoaXMuX3NlZ21lbnRzLmxlbmd0aDtcbiAgICB2YXIgaGFzaFBhcnRzID0gW107XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBoYXNoUGFydHMucHVzaCh0aGlzLl9zZWdtZW50c1tpXS5oYXNoKTtcbiAgICB9XG4gICAgcmV0dXJuIGhhc2hQYXJ0cy5qb2luKCcvJyk7XG4gIH1cblxuICBwcml2YXRlIF9hc3NlcnRWYWxpZFBhdGgocGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKFN0cmluZ1dyYXBwZXIuY29udGFpbnMocGF0aCwgJyMnKSkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgICAgYFBhdGggXCIke3BhdGh9XCIgc2hvdWxkIG5vdCBpbmNsdWRlIFwiI1wiLiBVc2UgXCJIYXNoTG9jYXRpb25TdHJhdGVneVwiIGluc3RlYWQuYCk7XG4gICAgfVxuICAgIHZhciBpbGxlZ2FsQ2hhcmFjdGVyID0gUmVnRXhwV3JhcHBlci5maXJzdE1hdGNoKFBhcmFtUm91dGVQYXRoLlJFU0VSVkVEX0NIQVJTLCBwYXRoKTtcbiAgICBpZiAoaXNQcmVzZW50KGlsbGVnYWxDaGFyYWN0ZXIpKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcbiAgICAgICAgICBgUGF0aCBcIiR7cGF0aH1cIiBjb250YWlucyBcIiR7aWxsZWdhbENoYXJhY3RlclswXX1cIiB3aGljaCBpcyBub3QgYWxsb3dlZCBpbiBhIHJvdXRlIGNvbmZpZy5gKTtcbiAgICB9XG4gIH1cbiAgc3RhdGljIFJFU0VSVkVEX0NIQVJTID0gUmVnRXhwV3JhcHBlci5jcmVhdGUoJy8vfFxcXFwofFxcXFwpfDt8XFxcXD98PScpO1xufVxuXG5sZXQgUkVHRVhQX1BFUkNFTlQgPSAvJS9nO1xubGV0IFJFR0VYUF9TTEFTSCA9IC9cXC8vZztcbmxldCBSRUdFWFBfT1BFTl9QQVJFTlQgPSAvXFwoL2c7XG5sZXQgUkVHRVhQX0NMT1NFX1BBUkVOVCA9IC9cXCkvZztcbmxldCBSRUdFWFBfU0VNSUNPTE9OID0gLzsvZztcblxuZnVuY3Rpb24gZW5jb2RlRHluYW1pY1NlZ21lbnQodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChpc0JsYW5rKHZhbHVlKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmFsdWUgPSBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGwodmFsdWUsIFJFR0VYUF9QRVJDRU5ULCAnJTI1Jyk7XG4gIHZhbHVlID0gU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsKHZhbHVlLCBSRUdFWFBfU0xBU0gsICclMkYnKTtcbiAgdmFsdWUgPSBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGwodmFsdWUsIFJFR0VYUF9PUEVOX1BBUkVOVCwgJyUyOCcpO1xuICB2YWx1ZSA9IFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbCh2YWx1ZSwgUkVHRVhQX0NMT1NFX1BBUkVOVCwgJyUyOScpO1xuICB2YWx1ZSA9IFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbCh2YWx1ZSwgUkVHRVhQX1NFTUlDT0xPTiwgJyUzQicpO1xuXG4gIHJldHVybiB2YWx1ZTtcbn1cblxubGV0IFJFR0VYUF9FTkNfU0VNSUNPTE9OID0gLyUzQi9pZztcbmxldCBSRUdFWFBfRU5DX0NMT1NFX1BBUkVOVCA9IC8lMjkvaWc7XG5sZXQgUkVHRVhQX0VOQ19PUEVOX1BBUkVOVCA9IC8lMjgvaWc7XG5sZXQgUkVHRVhQX0VOQ19TTEFTSCA9IC8lMkYvaWc7XG5sZXQgUkVHRVhQX0VOQ19QRVJDRU5UID0gLyUyNS9pZztcblxuZnVuY3Rpb24gZGVjb2RlRHluYW1pY1NlZ21lbnQodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChpc0JsYW5rKHZhbHVlKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmFsdWUgPSBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGwodmFsdWUsIFJFR0VYUF9FTkNfU0VNSUNPTE9OLCAnOycpO1xuICB2YWx1ZSA9IFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbCh2YWx1ZSwgUkVHRVhQX0VOQ19DTE9TRV9QQVJFTlQsICcpJyk7XG4gIHZhbHVlID0gU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsKHZhbHVlLCBSRUdFWFBfRU5DX09QRU5fUEFSRU5ULCAnKCcpO1xuICB2YWx1ZSA9IFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbCh2YWx1ZSwgUkVHRVhQX0VOQ19TTEFTSCwgJy8nKTtcbiAgdmFsdWUgPSBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGwodmFsdWUsIFJFR0VYUF9FTkNfUEVSQ0VOVCwgJyUnKTtcblxuICByZXR1cm4gdmFsdWU7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
