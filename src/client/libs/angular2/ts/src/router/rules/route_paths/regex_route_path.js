System.register(['angular2/src/facade/lang', './route_path'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, route_path_1;
    var RegexRoutePath;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (route_path_1_1) {
                route_path_1 = route_path_1_1;
            }],
        execute: function() {
            RegexRoutePath = (function () {
                function RegexRoutePath(_reString, _serializer) {
                    this._reString = _reString;
                    this._serializer = _serializer;
                    this.terminal = true;
                    this.specificity = '2';
                    this.hash = this._reString;
                    this._regex = lang_1.RegExpWrapper.create(this._reString);
                }
                RegexRoutePath.prototype.matchUrl = function (url) {
                    var urlPath = url.toString();
                    var params = {};
                    var matcher = lang_1.RegExpWrapper.matcher(this._regex, urlPath);
                    var match = lang_1.RegExpMatcherWrapper.next(matcher);
                    if (lang_1.isBlank(match)) {
                        return null;
                    }
                    for (var i = 0; i < match.length; i += 1) {
                        params[i.toString()] = match[i];
                    }
                    return new route_path_1.MatchedUrl(urlPath, [], params, [], null);
                };
                RegexRoutePath.prototype.generateUrl = function (params) { return this._serializer(params); };
                RegexRoutePath.prototype.toString = function () { return this._reString; };
                return RegexRoutePath;
            }());
            exports_1("RegexRoutePath", RegexRoutePath);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9ydWxlcy9yb3V0ZV9wYXRocy9yZWdleF9yb3V0ZV9wYXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O1lBT0E7Z0JBT0Usd0JBQW9CLFNBQWlCLEVBQVUsV0FBNEI7b0JBQXZELGNBQVMsR0FBVCxTQUFTLENBQVE7b0JBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO29CQUxwRSxhQUFRLEdBQVksSUFBSSxDQUFDO29CQUN6QixnQkFBVyxHQUFXLEdBQUcsQ0FBQztvQkFLL0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLG9CQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDckQsQ0FBQztnQkFFRCxpQ0FBUSxHQUFSLFVBQVMsR0FBUTtvQkFDZixJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQzdCLElBQUksTUFBTSxHQUE0QixFQUFFLENBQUM7b0JBQ3pDLElBQUksT0FBTyxHQUFHLG9CQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQzFELElBQUksS0FBSyxHQUFHLDJCQUFvQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFFL0MsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDZCxDQUFDO29CQUVELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7d0JBQ3pDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xDLENBQUM7b0JBRUQsTUFBTSxDQUFDLElBQUksdUJBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZELENBQUM7Z0JBRUQsb0NBQVcsR0FBWCxVQUFZLE1BQTRCLElBQWtCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFNUYsaUNBQVEsR0FBUixjQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDdkMscUJBQUM7WUFBRCxDQWhDQSxBQWdDQyxJQUFBO1lBaENELDJDQWdDQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9ydWxlcy9yb3V0ZV9wYXRocy9yZWdleF9yb3V0ZV9wYXRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWdFeHBXcmFwcGVyLCBSZWdFeHBNYXRjaGVyV3JhcHBlciwgaXNCbGFua30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7VXJsLCBSb290VXJsfSBmcm9tICcuLi8uLi91cmxfcGFyc2VyJztcbmltcG9ydCB7Um91dGVQYXRoLCBHZW5lcmF0ZWRVcmwsIE1hdGNoZWRVcmx9IGZyb20gJy4vcm91dGVfcGF0aCc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBSZWdleFNlcmlhbGl6ZXIgeyAocGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSk6IEdlbmVyYXRlZFVybDsgfVxuXG5leHBvcnQgY2xhc3MgUmVnZXhSb3V0ZVBhdGggaW1wbGVtZW50cyBSb3V0ZVBhdGgge1xuICBwdWJsaWMgaGFzaDogc3RyaW5nO1xuICBwdWJsaWMgdGVybWluYWw6IGJvb2xlYW4gPSB0cnVlO1xuICBwdWJsaWMgc3BlY2lmaWNpdHk6IHN0cmluZyA9ICcyJztcblxuICBwcml2YXRlIF9yZWdleDogUmVnRXhwO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JlU3RyaW5nOiBzdHJpbmcsIHByaXZhdGUgX3NlcmlhbGl6ZXI6IFJlZ2V4U2VyaWFsaXplcikge1xuICAgIHRoaXMuaGFzaCA9IHRoaXMuX3JlU3RyaW5nO1xuICAgIHRoaXMuX3JlZ2V4ID0gUmVnRXhwV3JhcHBlci5jcmVhdGUodGhpcy5fcmVTdHJpbmcpO1xuICB9XG5cbiAgbWF0Y2hVcmwodXJsOiBVcmwpOiBNYXRjaGVkVXJsIHtcbiAgICB2YXIgdXJsUGF0aCA9IHVybC50b1N0cmluZygpO1xuICAgIHZhciBwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gICAgdmFyIG1hdGNoZXIgPSBSZWdFeHBXcmFwcGVyLm1hdGNoZXIodGhpcy5fcmVnZXgsIHVybFBhdGgpO1xuICAgIHZhciBtYXRjaCA9IFJlZ0V4cE1hdGNoZXJXcmFwcGVyLm5leHQobWF0Y2hlcik7XG5cbiAgICBpZiAoaXNCbGFuayhtYXRjaCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0Y2gubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHBhcmFtc1tpLnRvU3RyaW5nKCldID0gbWF0Y2hbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBNYXRjaGVkVXJsKHVybFBhdGgsIFtdLCBwYXJhbXMsIFtdLCBudWxsKTtcbiAgfVxuXG4gIGdlbmVyYXRlVXJsKHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0pOiBHZW5lcmF0ZWRVcmwgeyByZXR1cm4gdGhpcy5fc2VyaWFsaXplcihwYXJhbXMpOyB9XG5cbiAgdG9TdHJpbmcoKSB7IHJldHVybiB0aGlzLl9yZVN0cmluZzsgfVxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
