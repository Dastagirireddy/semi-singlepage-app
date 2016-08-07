System.register(['./segments', './metadata/metadata', 'angular2/src/facade/lang', 'angular2/src/facade/promise', 'angular2/src/facade/exceptions', 'angular2/src/core/reflection/reflection'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var segments_1, metadata_1, lang_1, promise_1, exceptions_1, reflection_1;
    var _MatchingResult;
    function recognize(componentResolver, type, url) {
        return _recognize(componentResolver, type, url, url.root)
            .then(function (nodes) { return new segments_1.Tree(nodes); });
    }
    exports_1("recognize", recognize);
    function _recognize(componentResolver, type, url, current) {
        var metadata = _readMetadata(type); // should read from the factory instead
        var matched;
        try {
            matched = _match(metadata, url, current);
        }
        catch (e) {
            return promise_1.PromiseWrapper.reject(e, null);
        }
        return componentResolver.resolveComponent(matched.route.component)
            .then(function (factory) {
            var segment = new segments_1.RouteSegment(matched.consumedUrlSegments, matched.parameters, "", matched.route.component, factory);
            if (lang_1.isPresent(matched.leftOver)) {
                return _recognize(componentResolver, matched.route.component, url, matched.leftOver)
                    .then(function (children) { return [segment].concat(children); });
            }
            else {
                return [segment];
            }
        });
    }
    function _match(metadata, url, current) {
        for (var _i = 0, _a = metadata.routes; _i < _a.length; _i++) {
            var r = _a[_i];
            var matchingResult = _matchWithParts(r, url, current);
            if (lang_1.isPresent(matchingResult)) {
                return matchingResult;
            }
        }
        throw new exceptions_1.BaseException("Cannot match any routes");
    }
    function _matchWithParts(route, url, current) {
        var parts = route.path.split("/");
        var parameters = {};
        var consumedUrlSegments = [];
        var u = current;
        for (var i = 0; i < parts.length; ++i) {
            consumedUrlSegments.push(u);
            var p = parts[i];
            if (p.startsWith(":")) {
                var segment = u.segment;
                parameters[p.substring(1)] = segment;
            }
            else if (p != u.segment) {
                return null;
            }
            u = url.firstChild(u);
        }
        return new _MatchingResult(route, consumedUrlSegments, parameters, u);
    }
    function _readMetadata(componentType) {
        var metadata = reflection_1.reflector.annotations(componentType).filter(function (f) { return f instanceof metadata_1.RoutesMetadata; });
        if (metadata.length === 0) {
            throw new exceptions_1.BaseException("Component '" + lang_1.stringify(componentType) + "' does not have route configuration");
        }
        return metadata[0];
    }
    return {
        setters:[
            function (segments_1_1) {
                segments_1 = segments_1_1;
            },
            function (metadata_1_1) {
                metadata_1 = metadata_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (promise_1_1) {
                promise_1 = promise_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (reflection_1_1) {
                reflection_1 = reflection_1_1;
            }],
        execute: function() {
            _MatchingResult = (function () {
                function _MatchingResult(route, consumedUrlSegments, parameters, leftOver) {
                    this.route = route;
                    this.consumedUrlSegments = consumedUrlSegments;
                    this.parameters = parameters;
                    this.leftOver = leftOver;
                }
                return _MatchingResult;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9hbHRfcm91dGVyL3JlY29nbml6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztJQVFBLG1CQUEwQixpQkFBb0MsRUFBRSxJQUFVLEVBQ2hELEdBQXFCO1FBQzdDLE1BQU0sQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDO2FBQ3BELElBQUksQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLElBQUksZUFBSSxDQUFlLEtBQUssQ0FBQyxFQUE3QixDQUE2QixDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUpELGlDQUlDLENBQUE7SUFFRCxvQkFBb0IsaUJBQW9DLEVBQUUsSUFBVSxFQUFFLEdBQXFCLEVBQ3ZFLE9BQW1CO1FBQ3JDLElBQUksUUFBUSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFFLHVDQUF1QztRQUU1RSxJQUFJLE9BQU8sQ0FBQztRQUNaLElBQUksQ0FBQztZQUNILE9BQU8sR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMzQyxDQUFFO1FBQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNYLE1BQU0sQ0FBQyx3QkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQzthQUM3RCxJQUFJLENBQUMsVUFBQSxPQUFPO1lBQ1gsSUFBSSxPQUFPLEdBQUcsSUFBSSx1QkFBWSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsRUFDbkQsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFF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Q0FBQyxhQUFhLENBQUMsd0NBQXFDLENBQUMsQ0FBQztRQUNuRixDQUFDO1FBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBWkQ7Z0JBQ0UseUJBQW1CLEtBQW9CLEVBQVMsbUJBQWlDLEVBQzlELFVBQW1DLEVBQVMsUUFBb0I7b0JBRGhFLFVBQUssR0FBTCxLQUFLLENBQWU7b0JBQVMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFjO29CQUM5RCxlQUFVLEdBQVYsVUFBVSxDQUF5QjtvQkFBUyxhQUFRLEdBQVIsUUFBUSxDQUFZO2dCQUFHLENBQUM7Z0JBQ3pGLHNCQUFDO1lBQUQsQ0FIQSxBQUdDLElBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2FsdF9yb3V0ZXIvcmVjb2duaXplLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSb3V0ZVNlZ21lbnQsIFVybFNlZ21lbnQsIFRyZWV9IGZyb20gJy4vc2VnbWVudHMnO1xuaW1wb3J0IHtSb3V0ZXNNZXRhZGF0YSwgUm91dGVNZXRhZGF0YX0gZnJvbSAnLi9tZXRhZGF0YS9tZXRhZGF0YSc7XG5pbXBvcnQge1R5cGUsIGlzUHJlc2VudCwgc3RyaW5naWZ5fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtQcm9taXNlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9wcm9taXNlJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7Q29tcG9uZW50UmVzb2x2ZXJ9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtyZWZsZWN0b3J9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlZmxlY3Rpb24vcmVmbGVjdGlvbic7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWNvZ25pemUoY29tcG9uZW50UmVzb2x2ZXI6IENvbXBvbmVudFJlc29sdmVyLCB0eXBlOiBUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFRyZWU8VXJsU2VnbWVudD4pOiBQcm9taXNlPFRyZWU8Um91dGVTZWdtZW50Pj4ge1xuICByZXR1cm4gX3JlY29nbml6ZShjb21wb25lbnRSZXNvbHZlciwgdHlwZSwgdXJsLCB1cmwucm9vdClcbiAgICAgIC50aGVuKG5vZGVzID0+IG5ldyBUcmVlPFJvdXRlU2VnbWVudD4obm9kZXMpKTtcbn1cblxuZnVuY3Rpb24gX3JlY29nbml6ZShjb21wb25lbnRSZXNvbHZlcjogQ29tcG9uZW50UmVzb2x2ZXIsIHR5cGU6IFR5cGUsIHVybDogVHJlZTxVcmxTZWdtZW50PixcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudDogVXJsU2VnbWVudCk6IFByb21pc2U8Um91dGVTZWdtZW50W10+IHtcbiAgbGV0IG1ldGFkYXRhID0gX3JlYWRNZXRhZGF0YSh0eXBlKTsgIC8vIHNob3VsZCByZWFkIGZyb20gdGhlIGZhY3RvcnkgaW5zdGVhZFxuXG4gIGxldCBtYXRjaGVkO1xuICB0cnkge1xuICAgIG1hdGNoZWQgPSBfbWF0Y2gobWV0YWRhdGEsIHVybCwgY3VycmVudCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gUHJvbWlzZVdyYXBwZXIucmVqZWN0KGUsIG51bGwpO1xuICB9XG5cbiAgcmV0dXJuIGNvbXBvbmVudFJlc29sdmVyLnJlc29sdmVDb21wb25lbnQobWF0Y2hlZC5yb3V0ZS5jb21wb25lbnQpXG4gICAgICAudGhlbihmYWN0b3J5ID0+IHtcbiAgICAgICAgbGV0IHNlZ21lbnQgPSBuZXcgUm91dGVTZWdtZW50KG1hdGNoZWQuY29uc3VtZWRVcmxTZWdtZW50cywgbWF0Y2hlZC5wYXJhbWV0ZXJzLCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZC5yb3V0ZS5jb21wb25lbnQsIGZhY3RvcnkpO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQobWF0Y2hlZC5sZWZ0T3ZlcikpIHtcbiAgICAgICAgICByZXR1cm4gX3JlY29nbml6ZShjb21wb25lbnRSZXNvbHZlciwgbWF0Y2hlZC5yb3V0ZS5jb21wb25lbnQsIHVybCwgbWF0Y2hlZC5sZWZ0T3ZlcilcbiAgICAgICAgICAgICAgLnRoZW4oY2hpbGRyZW4gPT4gW3NlZ21lbnRdLmNvbmNhdChjaGlsZHJlbikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBbc2VnbWVudF07XG4gICAgICAgIH1cbiAgICAgIH0pO1xufVxuXG5mdW5jdGlvbiBfbWF0Y2gobWV0YWRhdGE6IFJvdXRlc01ldGFkYXRhLCB1cmw6IFRyZWU8VXJsU2VnbWVudD4sXG4gICAgICAgICAgICAgICAgY3VycmVudDogVXJsU2VnbWVudCk6IF9NYXRjaGluZ1Jlc3VsdCB7XG4gIGZvciAobGV0IHIgb2YgbWV0YWRhdGEucm91dGVzKSB7XG4gICAgbGV0IG1hdGNoaW5nUmVzdWx0ID0gX21hdGNoV2l0aFBhcnRzKHIsIHVybCwgY3VycmVudCk7XG4gICAgaWYgKGlzUHJlc2VudChtYXRjaGluZ1Jlc3VsdCkpIHtcbiAgICAgIHJldHVybiBtYXRjaGluZ1Jlc3VsdDtcbiAgICB9XG4gIH1cbiAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXCJDYW5ub3QgbWF0Y2ggYW55IHJvdXRlc1wiKTtcbn1cblxuZnVuY3Rpb24gX21hdGNoV2l0aFBhcnRzKHJvdXRlOiBSb3V0ZU1ldGFkYXRhLCB1cmw6IFRyZWU8VXJsU2VnbWVudD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudDogVXJsU2VnbWVudCk6IF9NYXRjaGluZ1Jlc3VsdCB7XG4gIGxldCBwYXJ0cyA9IHJvdXRlLnBhdGguc3BsaXQoXCIvXCIpO1xuICBsZXQgcGFyYW1ldGVycyA9IHt9O1xuICBsZXQgY29uc3VtZWRVcmxTZWdtZW50cyA9IFtdO1xuXG4gIGxldCB1ID0gY3VycmVudDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7ICsraSkge1xuICAgIGNvbnN1bWVkVXJsU2VnbWVudHMucHVzaCh1KTtcbiAgICBsZXQgcCA9IHBhcnRzW2ldO1xuICAgIGlmIChwLnN0YXJ0c1dpdGgoXCI6XCIpKSB7XG4gICAgICBsZXQgc2VnbWVudCA9IHUuc2VnbWVudDtcbiAgICAgIHBhcmFtZXRlcnNbcC5zdWJzdHJpbmcoMSldID0gc2VnbWVudDtcbiAgICB9IGVsc2UgaWYgKHAgIT0gdS5zZWdtZW50KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdSA9IHVybC5maXJzdENoaWxkKHUpO1xuICB9XG4gIHJldHVybiBuZXcgX01hdGNoaW5nUmVzdWx0KHJvdXRlLCBjb25zdW1lZFVybFNlZ21lbnRzLCBwYXJhbWV0ZXJzLCB1KTtcbn1cblxuY2xhc3MgX01hdGNoaW5nUmVzdWx0IHtcbiAgY29uc3RydWN0b3IocHVibGljIHJvdXRlOiBSb3V0ZU1ldGFkYXRhLCBwdWJsaWMgY29uc3VtZWRVcmxTZWdtZW50czogVXJsU2VnbWVudFtdLFxuICAgICAgICAgICAgICBwdWJsaWMgcGFyYW1ldGVyczoge1trZXk6IHN0cmluZ106IHN0cmluZ30sIHB1YmxpYyBsZWZ0T3ZlcjogVXJsU2VnbWVudCkge31cbn1cblxuZnVuY3Rpb24gX3JlYWRNZXRhZGF0YShjb21wb25lbnRUeXBlOiBUeXBlKSB7XG4gIGxldCBtZXRhZGF0YSA9IHJlZmxlY3Rvci5hbm5vdGF0aW9ucyhjb21wb25lbnRUeXBlKS5maWx0ZXIoZiA9PiBmIGluc3RhbmNlb2YgUm91dGVzTWV0YWRhdGEpO1xuICBpZiAobWV0YWRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgIGBDb21wb25lbnQgJyR7c3RyaW5naWZ5KGNvbXBvbmVudFR5cGUpfScgZG9lcyBub3QgaGF2ZSByb3V0ZSBjb25maWd1cmF0aW9uYCk7XG4gIH1cbiAgcmV0dXJuIG1ldGFkYXRhWzBdO1xufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
