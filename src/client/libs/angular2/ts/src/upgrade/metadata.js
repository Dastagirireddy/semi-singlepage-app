System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1;
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
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            COMPONENT_SELECTOR = /^[\w|-]*$/;
            SKEWER_CASE = /-(\w)/g;
            directiveResolver = new core_1.DirectiveResolver();
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3VwZ3JhZGUvbWV0YWRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQUdJLGtCQUFrQixFQUNsQixXQUFXLEVBQ1gsaUJBQWlCO0lBb0JyQiwwQkFBaUMsSUFBVTtRQUN6QyxJQUFJLGdCQUFnQixHQUFzQixpQkFBaUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUUsSUFBSSxRQUFRLEdBQUcsZ0JBQWdCLENBQUMsUUFBUSxDQUFDO1FBQ3pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxNQUFNLElBQUksS0FBSyxDQUFDLDREQUE0RCxHQUFHLFFBQVEsQ0FBQyxDQUFDO1FBQzNGLENBQUM7UUFDRCxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxVQUFDLEdBQUcsRUFBRSxNQUFjLElBQUssT0FBQSxNQUFNLENBQUMsV0FBVyxFQUFFLEVBQXBCLENBQW9CLENBQUMsQ0FBQztRQUM1RixNQUFNLENBQUM7WUFDTCxJQUFJLEVBQUUsSUFBSTtZQUNWLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLE1BQU0sRUFBRSxXQUFXLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDO1lBQzVDLE9BQU8sRUFBRSxXQUFXLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDO1NBQy9DLENBQUM7SUFDSixDQUFDO0lBYkQsK0NBYUMsQ0FBQTtJQUVELHFCQUE0QixLQUFlO1FBQ3pDLElBQUksU0FBUyxHQUFlLEVBQUUsQ0FBQztRQUMvQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1YsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ3RDLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2hDLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDM0IsSUFBSSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3pDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEUsU0FBUyxDQUFDLElBQUksQ0FBVztvQkFDdkIsSUFBSSxFQUFFLElBQUk7b0JBQ1YsSUFBSSxFQUFFLElBQUk7b0JBQ1YsV0FBVyxFQUFFLE1BQUksSUFBSSxNQUFHO29CQUN4QixTQUFTLEVBQUUsTUFBSSxJQUFJLE1BQUc7b0JBQ3RCLGdCQUFnQixFQUFFLE9BQUssSUFBSSxPQUFJO29CQUMvQixNQUFNLEVBQUUsT0FBSyxXQUFhO29CQUMxQixRQUFRLEVBQUUsU0FBTyxXQUFhO29CQUM5QixVQUFVLEVBQUUsV0FBUyxXQUFhO2lCQUNuQyxDQUFDLENBQUM7WUFDTCxDQUFDO1FBQ0gsQ0FBQztRQUNELE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQXJCRCxxQ0FxQkMsQ0FBQTs7Ozs7OztZQTFERyxrQkFBa0IsR0FBRyxXQUFXLENBQUM7WUFDakMsV0FBVyxHQUFHLFFBQVEsQ0FBQztZQUN2QixpQkFBaUIsR0FBRyxJQUFJLHdCQUFpQixFQUFFLENBQUMiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvdXBncmFkZS9tZXRhZGF0YS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VHlwZSwgRGlyZWN0aXZlUmVzb2x2ZXIsIERpcmVjdGl2ZU1ldGFkYXRhfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7c3RyaW5naWZ5fSBmcm9tICcuL3V0aWwnO1xuXG52YXIgQ09NUE9ORU5UX1NFTEVDVE9SID0gL15bXFx3fC1dKiQvO1xudmFyIFNLRVdFUl9DQVNFID0gLy0oXFx3KS9nO1xudmFyIGRpcmVjdGl2ZVJlc29sdmVyID0gbmV3IERpcmVjdGl2ZVJlc29sdmVyKCk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXR0clByb3Age1xuICBwcm9wOiBzdHJpbmc7XG4gIGF0dHI6IHN0cmluZztcbiAgYnJhY2tldEF0dHI6IHN0cmluZztcbiAgYnJhY2tldFBhcmVuQXR0cjogc3RyaW5nO1xuICBwYXJlbkF0dHI6IHN0cmluZztcbiAgb25BdHRyOiBzdHJpbmc7XG4gIGJpbmRBdHRyOiBzdHJpbmc7XG4gIGJpbmRvbkF0dHI6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb21wb25lbnRJbmZvIHtcbiAgdHlwZTogVHlwZTtcbiAgc2VsZWN0b3I6IHN0cmluZztcbiAgaW5wdXRzOiBBdHRyUHJvcFtdO1xuICBvdXRwdXRzOiBBdHRyUHJvcFtdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tcG9uZW50SW5mbyh0eXBlOiBUeXBlKTogQ29tcG9uZW50SW5mbyB7XG4gIHZhciByZXNvbHZlZE1ldGFkYXRhOiBEaXJlY3RpdmVNZXRhZGF0YSA9IGRpcmVjdGl2ZVJlc29sdmVyLnJlc29sdmUodHlwZSk7XG4gIHZhciBzZWxlY3RvciA9IHJlc29sdmVkTWV0YWRhdGEuc2VsZWN0b3I7XG4gIGlmICghc2VsZWN0b3IubWF0Y2goQ09NUE9ORU5UX1NFTEVDVE9SKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignT25seSBzZWxlY3RvcnMgbWF0Y2hpbmcgZWxlbWVudCBuYW1lcyBhcmUgc3VwcG9ydGVkLCBnb3Q6ICcgKyBzZWxlY3Rvcik7XG4gIH1cbiAgdmFyIHNlbGVjdG9yID0gc2VsZWN0b3IucmVwbGFjZShTS0VXRVJfQ0FTRSwgKGFsbCwgbGV0dGVyOiBzdHJpbmcpID0+IGxldHRlci50b1VwcGVyQ2FzZSgpKTtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIHNlbGVjdG9yOiBzZWxlY3RvcixcbiAgICBpbnB1dHM6IHBhcnNlRmllbGRzKHJlc29sdmVkTWV0YWRhdGEuaW5wdXRzKSxcbiAgICBvdXRwdXRzOiBwYXJzZUZpZWxkcyhyZXNvbHZlZE1ldGFkYXRhLm91dHB1dHMpXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUZpZWxkcyhuYW1lczogc3RyaW5nW10pOiBBdHRyUHJvcFtdIHtcbiAgdmFyIGF0dHJQcm9wczogQXR0clByb3BbXSA9IFtdO1xuICBpZiAobmFtZXMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcGFydHMgPSBuYW1lc1tpXS5zcGxpdCgnOicpO1xuICAgICAgdmFyIHByb3AgPSBwYXJ0c1swXS50cmltKCk7XG4gICAgICB2YXIgYXR0ciA9IChwYXJ0c1sxXSB8fCBwYXJ0c1swXSkudHJpbSgpO1xuICAgICAgdmFyIGNhcGl0YWxBdHRyID0gYXR0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGF0dHIuc3Vic3RyKDEpO1xuICAgICAgYXR0clByb3BzLnB1c2goPEF0dHJQcm9wPntcbiAgICAgICAgcHJvcDogcHJvcCxcbiAgICAgICAgYXR0cjogYXR0cixcbiAgICAgICAgYnJhY2tldEF0dHI6IGBbJHthdHRyfV1gLFxuICAgICAgICBwYXJlbkF0dHI6IGAoJHthdHRyfSlgLFxuICAgICAgICBicmFja2V0UGFyZW5BdHRyOiBgWygke2F0dHJ9KV1gLFxuICAgICAgICBvbkF0dHI6IGBvbiR7Y2FwaXRhbEF0dHJ9YCxcbiAgICAgICAgYmluZEF0dHI6IGBiaW5kJHtjYXBpdGFsQXR0cn1gLFxuICAgICAgICBiaW5kb25BdHRyOiBgYmluZG9uJHtjYXBpdGFsQXR0cn1gXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGF0dHJQcm9wcztcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
