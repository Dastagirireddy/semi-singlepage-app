System.register(['./segments', 'angular2/src/facade/exceptions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var segments_1, exceptions_1;
    var RouterUrlParser, DefaultRouterUrlParser;
    return {
        setters:[
            function (segments_1_1) {
                segments_1 = segments_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
            RouterUrlParser = (function () {
                function RouterUrlParser() {
                }
                return RouterUrlParser;
            }());
            exports_1("RouterUrlParser", RouterUrlParser);
            DefaultRouterUrlParser = (function (_super) {
                __extends(DefaultRouterUrlParser, _super);
                function DefaultRouterUrlParser() {
                    _super.apply(this, arguments);
                }
                DefaultRouterUrlParser.prototype.parse = function (url) {
                    if (url.length === 0) {
                        throw new exceptions_1.BaseException("Invalid url '" + url + "'");
                    }
                    return new segments_1.Tree(this._parseNodes(url));
                };
                DefaultRouterUrlParser.prototype._parseNodes = function (url) {
                    var index = url.indexOf("/", 1);
                    var children;
                    var currentUrl;
                    if (index > -1) {
                        children = this._parseNodes(url.substring(index + 1));
                        currentUrl = url.substring(0, index);
                    }
                    else {
                        children = [];
                        currentUrl = url;
                    }
                    return [new segments_1.UrlSegment(currentUrl, {}, "")].concat(children);
                };
                return DefaultRouterUrlParser;
            }(RouterUrlParser));
            exports_1("DefaultRouterUrlParser", DefaultRouterUrlParser);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9hbHRfcm91dGVyL3JvdXRlcl91cmxfcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFHQTtnQkFBQTtnQkFBdUYsQ0FBQztnQkFBRCxzQkFBQztZQUFELENBQXZGLEFBQXdGLElBQUE7WUFBeEYsNkNBQXdGLENBQUE7WUFFeEY7Z0JBQTRDLDBDQUFlO2dCQUEzRDtvQkFBNEMsOEJBQWU7Z0JBcUIzRCxDQUFDO2dCQXBCQyxzQ0FBSyxHQUFMLFVBQU0sR0FBVztvQkFDZixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3JCLE1BQU0sSUFBSSwwQkFBYSxDQUFDLGtCQUFnQixHQUFHLE1BQUcsQ0FBQyxDQUFDO29CQUNsRCxDQUFDO29CQUNELE1BQU0sQ0FBQyxJQUFJLGVBQUksQ0FBYSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JELENBQUM7Z0JBRU8sNENBQVcsR0FBbkIsVUFBb0IsR0FBVztvQkFDN0IsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ2hDLElBQUksUUFBc0IsQ0FBQztvQkFDM0IsSUFBSSxVQUFVLENBQUM7b0JBQ2YsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDZixRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN0RCxVQUFVLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ3ZDLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sUUFBUSxHQUFHLEVBQUUsQ0FBQzt3QkFDZCxVQUFVLEdBQUcsR0FBRyxDQUFDO29CQUNuQixDQUFDO29CQUNELE1BQU0sQ0FBQyxDQUFDLElBQUkscUJBQVUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMvRCxDQUFDO2dCQUNILDZCQUFDO1lBQUQsQ0FyQkEsQUFxQkMsQ0FyQjJDLGVBQWUsR0FxQjFEO1lBckJELDJEQXFCQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9hbHRfcm91dGVyL3JvdXRlcl91cmxfcGFyc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtVcmxTZWdtZW50LCBUcmVlfSBmcm9tICcuL3NlZ21lbnRzJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJvdXRlclVybFBhcnNlciB7IGFic3RyYWN0IHBhcnNlKHVybDogc3RyaW5nKTogVHJlZTxVcmxTZWdtZW50PjsgfVxuXG5leHBvcnQgY2xhc3MgRGVmYXVsdFJvdXRlclVybFBhcnNlciBleHRlbmRzIFJvdXRlclVybFBhcnNlciB7XG4gIHBhcnNlKHVybDogc3RyaW5nKTogVHJlZTxVcmxTZWdtZW50PiB7XG4gICAgaWYgKHVybC5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBJbnZhbGlkIHVybCAnJHt1cmx9J2ApO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFRyZWU8VXJsU2VnbWVudD4odGhpcy5fcGFyc2VOb2Rlcyh1cmwpKTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlTm9kZXModXJsOiBzdHJpbmcpOiBVcmxTZWdtZW50W10ge1xuICAgIGxldCBpbmRleCA9IHVybC5pbmRleE9mKFwiL1wiLCAxKTtcbiAgICBsZXQgY2hpbGRyZW46IFVybFNlZ21lbnRbXTtcbiAgICBsZXQgY3VycmVudFVybDtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgY2hpbGRyZW4gPSB0aGlzLl9wYXJzZU5vZGVzKHVybC5zdWJzdHJpbmcoaW5kZXggKyAxKSk7XG4gICAgICBjdXJyZW50VXJsID0gdXJsLnN1YnN0cmluZygwLCBpbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoaWxkcmVuID0gW107XG4gICAgICBjdXJyZW50VXJsID0gdXJsO1xuICAgIH1cbiAgICByZXR1cm4gW25ldyBVcmxTZWdtZW50KGN1cnJlbnRVcmwsIHt9LCBcIlwiKV0uY29uY2F0KGNoaWxkcmVuKTtcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
