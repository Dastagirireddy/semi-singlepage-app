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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvcnVsZXMvcm91dGVfcGF0aHMvcmVnZXhfcm91dGVfcGF0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztZQU9BO2dCQU9FLHdCQUFvQixTQUFpQixFQUFVLFdBQTRCO29CQUF2RCxjQUFTLEdBQVQsU0FBUyxDQUFRO29CQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFpQjtvQkFMcEUsYUFBUSxHQUFZLElBQUksQ0FBQztvQkFDekIsZ0JBQVcsR0FBVyxHQUFHLENBQUM7b0JBSy9CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxvQkFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3JELENBQUM7Z0JBRUQsaUNBQVEsR0FBUixVQUFTLEdBQVE7b0JBQ2YsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUM3QixJQUFJLE1BQU0sR0FBNEIsRUFBRSxDQUFDO29CQUN6QyxJQUFJLE9BQU8sR0FBRyxvQkFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUMxRCxJQUFJLEtBQUssR0FBRywyQkFBb0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBRS9DLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ2QsQ0FBQztvQkFFRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO3dCQUN6QyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNsQyxDQUFDO29CQUVELE1BQU0sQ0FBQyxJQUFJLHVCQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN2RCxDQUFDO2dCQUVELG9DQUFXLEdBQVgsVUFBWSxNQUE0QixJQUFrQixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTVGLGlDQUFRLEdBQVIsY0FBcUIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxxQkFBQztZQUFELENBaENBLEFBZ0NDLElBQUE7WUFoQ0QsMkNBZ0NDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9ydWxlcy9yb3V0ZV9wYXRocy9yZWdleF9yb3V0ZV9wYXRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWdFeHBXcmFwcGVyLCBSZWdFeHBNYXRjaGVyV3JhcHBlciwgaXNCbGFua30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7VXJsLCBSb290VXJsfSBmcm9tICcuLi8uLi91cmxfcGFyc2VyJztcbmltcG9ydCB7Um91dGVQYXRoLCBHZW5lcmF0ZWRVcmwsIE1hdGNoZWRVcmx9IGZyb20gJy4vcm91dGVfcGF0aCc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBSZWdleFNlcmlhbGl6ZXIgeyAocGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSk6IEdlbmVyYXRlZFVybDsgfVxuXG5leHBvcnQgY2xhc3MgUmVnZXhSb3V0ZVBhdGggaW1wbGVtZW50cyBSb3V0ZVBhdGgge1xuICBwdWJsaWMgaGFzaDogc3RyaW5nO1xuICBwdWJsaWMgdGVybWluYWw6IGJvb2xlYW4gPSB0cnVlO1xuICBwdWJsaWMgc3BlY2lmaWNpdHk6IHN0cmluZyA9ICcyJztcblxuICBwcml2YXRlIF9yZWdleDogUmVnRXhwO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JlU3RyaW5nOiBzdHJpbmcsIHByaXZhdGUgX3NlcmlhbGl6ZXI6IFJlZ2V4U2VyaWFsaXplcikge1xuICAgIHRoaXMuaGFzaCA9IHRoaXMuX3JlU3RyaW5nO1xuICAgIHRoaXMuX3JlZ2V4ID0gUmVnRXhwV3JhcHBlci5jcmVhdGUodGhpcy5fcmVTdHJpbmcpO1xuICB9XG5cbiAgbWF0Y2hVcmwodXJsOiBVcmwpOiBNYXRjaGVkVXJsIHtcbiAgICB2YXIgdXJsUGF0aCA9IHVybC50b1N0cmluZygpO1xuICAgIHZhciBwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gICAgdmFyIG1hdGNoZXIgPSBSZWdFeHBXcmFwcGVyLm1hdGNoZXIodGhpcy5fcmVnZXgsIHVybFBhdGgpO1xuICAgIHZhciBtYXRjaCA9IFJlZ0V4cE1hdGNoZXJXcmFwcGVyLm5leHQobWF0Y2hlcik7XG5cbiAgICBpZiAoaXNCbGFuayhtYXRjaCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0Y2gubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHBhcmFtc1tpLnRvU3RyaW5nKCldID0gbWF0Y2hbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBNYXRjaGVkVXJsKHVybFBhdGgsIFtdLCBwYXJhbXMsIFtdLCBudWxsKTtcbiAgfVxuXG4gIGdlbmVyYXRlVXJsKHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0pOiBHZW5lcmF0ZWRVcmwgeyByZXR1cm4gdGhpcy5fc2VyaWFsaXplcihwYXJhbXMpOyB9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3JlU3RyaW5nOyB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
