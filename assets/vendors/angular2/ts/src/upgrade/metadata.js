System.register(['angular2/compiler'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var compiler_1;
    var COMPONENT_SELECTOR, SKEWER_CASE, directiveResolver;
    function getComponentInfo(type) {
        var resolvedMetadata = directiveResolver.resolve(type);
        var selector = resolvedMetadata.selector;
        if (!selector.match(COMPONENT_SELECTOR)) {
            throw new Error('Only selectors matching element names are supported, got: ' + selector);
        }
        var selector = selector.replace(SKEWER_CASE, function (all, letter) { return letter.toUpperCase(); });
        return {
            type: type,
            selector: selector,
            inputs: parseFields(resolvedMetadata.inputs),
            outputs: parseFields(resolvedMetadata.outputs)
        };
    }
    exports_1("getComponentInfo", getComponentInfo);
    function parseFields(names) {
        var attrProps = [];
        if (names) {
            for (var i = 0; i < names.length; i++) {
                var parts = names[i].split(':');
                var prop = parts[0].trim();
                var attr = (parts[1] || parts[0]).trim();
                var capitalAttr = attr.charAt(0).toUpperCase() + attr.substr(1);
                attrProps.push({
                    prop: prop,
                    attr: attr,
                    bracketAttr: "[" + attr + "]",
                    parenAttr: "(" + attr + ")",
                    bracketParenAttr: "[(" + attr + ")]",
                    onAttr: "on" + capitalAttr,
                    bindAttr: "bind" + capitalAttr,
                    bindonAttr: "bindon" + capitalAttr
                });
            }
        }
        return attrProps;
    }
    exports_1("parseFields", parseFields);
    return {
        setters:[
            function (compiler_1_1) {
                compiler_1 = compiler_1_1;
            }],
        execute: function() {
            COMPONENT_SELECTOR = /^[\w|-]*$/;
            SKEWER_CASE = /-(\w)/g;
            directiveResolver = new compiler_1.DirectiveResolver();
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy91cGdyYWRlL21ldGFkYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFJSSxrQkFBa0IsRUFDbEIsV0FBVyxFQUNYLGlCQUFpQjtJQW9CckIsMEJBQWlDLElBQVU7UUFDekMsSUFBSSxnQkFBZ0IsR0FBc0IsaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFFLElBQUksUUFBUSxHQUFHLGdCQUFnQixDQUFDLFFBQVEsQ0FBQztRQUN6QyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsTUFBTSxJQUFJLEtBQUssQ0FBQyw0REFBNEQsR0FBRyxRQUFRLENBQUMsQ0FBQztRQUMzRixDQUFDO1FBQ0QsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsVUFBQyxHQUFHLEVBQUUsTUFBYyxJQUFLLE9BQUEsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUFwQixDQUFvQixDQUFDLENBQUM7UUFDNUYsTUFBTSxDQUFDO1lBQ0wsSUFBSSxFQUFFLElBQUk7WUFDVixRQUFRLEVBQUUsUUFBUTtZQUNsQixNQUFNLEVBQUUsV0FBVyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQztZQUM1QyxPQUFPLEVBQUUsV0FBVyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQztTQUMvQyxDQUFDO0lBQ0osQ0FBQztJQWJELCtDQWFDLENBQUE7SUFFRCxxQkFBNEIsS0FBZTtRQUN6QyxJQUFJLFNBQVMsR0FBZSxFQUFFLENBQUM7UUFDL0IsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNWLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUN0QyxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzNCLElBQUksSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN6QyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hFLFNBQVMsQ0FBQyxJQUFJLENBQVc7b0JBQ3ZCLElBQUksRUFBRSxJQUFJO29CQUNWLElBQUksRUFBRSxJQUFJO29CQUNWLFdBQVcsRUFBRSxNQUFJLElBQUksTUFBRztvQkFDeEIsU0FBUyxFQUFFLE1BQUksSUFBSSxNQUFHO29CQUN0QixnQkFBZ0IsRUFBRSxPQUFLLElBQUksT0FBSTtvQkFDL0IsTUFBTSxFQUFFLE9BQUssV0FBYTtvQkFDMUIsUUFBUSxFQUFFLFNBQU8sV0FBYTtvQkFDOUIsVUFBVSxFQUFFLFdBQVMsV0FBYTtpQkFDbkMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFyQkQscUNBcUJDLENBQUE7Ozs7Ozs7WUExREcsa0JBQWtCLEdBQUcsV0FBVyxDQUFDO1lBQ2pDLFdBQVcsR0FBRyxRQUFRLENBQUM7WUFDdkIsaUJBQWlCLEdBQUcsSUFBSSw0QkFBaUIsRUFBRSxDQUFDIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy91cGdyYWRlL21ldGFkYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUeXBlLCBEaXJlY3RpdmVNZXRhZGF0YX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0RpcmVjdGl2ZVJlc29sdmVyfSBmcm9tICdhbmd1bGFyMi9jb21waWxlcic7XG5pbXBvcnQge3N0cmluZ2lmeX0gZnJvbSAnLi91dGlsJztcblxudmFyIENPTVBPTkVOVF9TRUxFQ1RPUiA9IC9eW1xcd3wtXSokLztcbnZhciBTS0VXRVJfQ0FTRSA9IC8tKFxcdykvZztcbnZhciBkaXJlY3RpdmVSZXNvbHZlciA9IG5ldyBEaXJlY3RpdmVSZXNvbHZlcigpO1xuXG5leHBvcnQgaW50ZXJmYWNlIEF0dHJQcm9wIHtcbiAgcHJvcDogc3RyaW5nO1xuICBhdHRyOiBzdHJpbmc7XG4gIGJyYWNrZXRBdHRyOiBzdHJpbmc7XG4gIGJyYWNrZXRQYXJlbkF0dHI6IHN0cmluZztcbiAgcGFyZW5BdHRyOiBzdHJpbmc7XG4gIG9uQXR0cjogc3RyaW5nO1xuICBiaW5kQXR0cjogc3RyaW5nO1xuICBiaW5kb25BdHRyOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcG9uZW50SW5mbyB7XG4gIHR5cGU6IFR5cGU7XG4gIHNlbGVjdG9yOiBzdHJpbmc7XG4gIGlucHV0czogQXR0clByb3BbXTtcbiAgb3V0cHV0czogQXR0clByb3BbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbXBvbmVudEluZm8odHlwZTogVHlwZSk6IENvbXBvbmVudEluZm8ge1xuICB2YXIgcmVzb2x2ZWRNZXRhZGF0YTogRGlyZWN0aXZlTWV0YWRhdGEgPSBkaXJlY3RpdmVSZXNvbHZlci5yZXNvbHZlKHR5cGUpO1xuICB2YXIgc2VsZWN0b3IgPSByZXNvbHZlZE1ldGFkYXRhLnNlbGVjdG9yO1xuICBpZiAoIXNlbGVjdG9yLm1hdGNoKENPTVBPTkVOVF9TRUxFQ1RPUikpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ09ubHkgc2VsZWN0b3JzIG1hdGNoaW5nIGVsZW1lbnQgbmFtZXMgYXJlIHN1cHBvcnRlZCwgZ290OiAnICsgc2VsZWN0b3IpO1xuICB9XG4gIHZhciBzZWxlY3RvciA9IHNlbGVjdG9yLnJlcGxhY2UoU0tFV0VSX0NBU0UsIChhbGwsIGxldHRlcjogc3RyaW5nKSA9PiBsZXR0ZXIudG9VcHBlckNhc2UoKSk7XG4gIHJldHVybiB7XG4gICAgdHlwZTogdHlwZSxcbiAgICBzZWxlY3Rvcjogc2VsZWN0b3IsXG4gICAgaW5wdXRzOiBwYXJzZUZpZWxkcyhyZXNvbHZlZE1ldGFkYXRhLmlucHV0cyksXG4gICAgb3V0cHV0czogcGFyc2VGaWVsZHMocmVzb2x2ZWRNZXRhZGF0YS5vdXRwdXRzKVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VGaWVsZHMobmFtZXM6IHN0cmluZ1tdKTogQXR0clByb3BbXSB7XG4gIHZhciBhdHRyUHJvcHM6IEF0dHJQcm9wW10gPSBbXTtcbiAgaWYgKG5hbWVzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHBhcnRzID0gbmFtZXNbaV0uc3BsaXQoJzonKTtcbiAgICAgIHZhciBwcm9wID0gcGFydHNbMF0udHJpbSgpO1xuICAgICAgdmFyIGF0dHIgPSAocGFydHNbMV0gfHwgcGFydHNbMF0pLnRyaW0oKTtcbiAgICAgIHZhciBjYXBpdGFsQXR0ciA9IGF0dHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBhdHRyLnN1YnN0cigxKTtcbiAgICAgIGF0dHJQcm9wcy5wdXNoKDxBdHRyUHJvcD57XG4gICAgICAgIHByb3A6IHByb3AsXG4gICAgICAgIGF0dHI6IGF0dHIsXG4gICAgICAgIGJyYWNrZXRBdHRyOiBgWyR7YXR0cn1dYCxcbiAgICAgICAgcGFyZW5BdHRyOiBgKCR7YXR0cn0pYCxcbiAgICAgICAgYnJhY2tldFBhcmVuQXR0cjogYFsoJHthdHRyfSldYCxcbiAgICAgICAgb25BdHRyOiBgb24ke2NhcGl0YWxBdHRyfWAsXG4gICAgICAgIGJpbmRBdHRyOiBgYmluZCR7Y2FwaXRhbEF0dHJ9YCxcbiAgICAgICAgYmluZG9uQXR0cjogYGJpbmRvbiR7Y2FwaXRhbEF0dHJ9YFxuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBhdHRyUHJvcHM7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
