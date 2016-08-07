System.register(['angular2/src/facade/lang', 'angular2/src/core/metadata/lifecycle_hooks'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, lifecycle_hooks_1;
    function hasLifecycleHook(lcInterface, token) {
        if (!(token instanceof lang_1.Type))
            return false;
        var proto = token.prototype;
        switch (lcInterface) {
            case lifecycle_hooks_1.LifecycleHooks.AfterContentInit:
                return !!proto.ngAfterContentInit;
            case lifecycle_hooks_1.LifecycleHooks.AfterContentChecked:
                return !!proto.ngAfterContentChecked;
            case lifecycle_hooks_1.LifecycleHooks.AfterViewInit:
                return !!proto.ngAfterViewInit;
            case lifecycle_hooks_1.LifecycleHooks.AfterViewChecked:
                return !!proto.ngAfterViewChecked;
            case lifecycle_hooks_1.LifecycleHooks.OnChanges:
                return !!proto.ngOnChanges;
            case lifecycle_hooks_1.LifecycleHooks.DoCheck:
                return !!proto.ngDoCheck;
            case lifecycle_hooks_1.LifecycleHooks.OnDestroy:
                return !!proto.ngOnDestroy;
            case lifecycle_hooks_1.LifecycleHooks.OnInit:
                return !!proto.ngOnInit;
            default:
                return false;
        }
    }
    exports_1("hasLifecycleHook", hasLifecycleHook);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (lifecycle_hooks_1_1) {
                lifecycle_hooks_1 = lifecycle_hooks_1_1;
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9kaXJlY3RpdmVfbGlmZWN5Y2xlX3JlZmxlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0lBR0EsMEJBQWlDLFdBQTJCLEVBQUUsS0FBSztRQUNqRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxZQUFZLFdBQUksQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUUzQyxJQUFJLEtBQUssR0FBUyxLQUFNLENBQUMsU0FBUyxDQUFDO1FBRW5DLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDcEIsS0FBSyxnQ0FBYyxDQUFDLGdCQUFnQjtnQkFDbEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUM7WUFDcEMsS0FBSyxnQ0FBYyxDQUFDLG1CQUFtQjtnQkFDckMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUM7WUFDdkMsS0FBSyxnQ0FBYyxDQUFDLGFBQWE7Z0JBQy9CLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQztZQUNqQyxLQUFLLGdDQUFjLENBQUMsZ0JBQWdCO2dCQUNsQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQztZQUNwQyxLQUFLLGdDQUFjLENBQUMsU0FBUztnQkFDM0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO1lBQzdCLEtBQUssZ0NBQWMsQ0FBQyxPQUFPO2dCQUN6QixNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFDM0IsS0FBSyxnQ0FBYyxDQUFDLFNBQVM7Z0JBQzNCLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztZQUM3QixLQUFLLGdDQUFjLENBQUMsTUFBTTtnQkFDeEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1lBQzFCO2dCQUNFLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztJQUNILENBQUM7SUF6QkQsK0NBeUJDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL2RpcmVjdGl2ZV9saWZlY3ljbGVfcmVmbGVjdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUeXBlfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtMaWZlY3ljbGVIb29rc30gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbWV0YWRhdGEvbGlmZWN5Y2xlX2hvb2tzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGhhc0xpZmVjeWNsZUhvb2sobGNJbnRlcmZhY2U6IExpZmVjeWNsZUhvb2tzLCB0b2tlbik6IGJvb2xlYW4ge1xuICBpZiAoISh0b2tlbiBpbnN0YW5jZW9mIFR5cGUpKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIHByb3RvID0gKDxhbnk+dG9rZW4pLnByb3RvdHlwZTtcblxuICBzd2l0Y2ggKGxjSW50ZXJmYWNlKSB7XG4gICAgY2FzZSBMaWZlY3ljbGVIb29rcy5BZnRlckNvbnRlbnRJbml0OlxuICAgICAgcmV0dXJuICEhcHJvdG8ubmdBZnRlckNvbnRlbnRJbml0O1xuICAgIGNhc2UgTGlmZWN5Y2xlSG9va3MuQWZ0ZXJDb250ZW50Q2hlY2tlZDpcbiAgICAgIHJldHVybiAhIXByb3RvLm5nQWZ0ZXJDb250ZW50Q2hlY2tlZDtcbiAgICBjYXNlIExpZmVjeWNsZUhvb2tzLkFmdGVyVmlld0luaXQ6XG4gICAgICByZXR1cm4gISFwcm90by5uZ0FmdGVyVmlld0luaXQ7XG4gICAgY2FzZSBMaWZlY3ljbGVIb29rcy5BZnRlclZpZXdDaGVja2VkOlxuICAgICAgcmV0dXJuICEhcHJvdG8ubmdBZnRlclZpZXdDaGVja2VkO1xuICAgIGNhc2UgTGlmZWN5Y2xlSG9va3MuT25DaGFuZ2VzOlxuICAgICAgcmV0dXJuICEhcHJvdG8ubmdPbkNoYW5nZXM7XG4gICAgY2FzZSBMaWZlY3ljbGVIb29rcy5Eb0NoZWNrOlxuICAgICAgcmV0dXJuICEhcHJvdG8ubmdEb0NoZWNrO1xuICAgIGNhc2UgTGlmZWN5Y2xlSG9va3MuT25EZXN0cm95OlxuICAgICAgcmV0dXJuICEhcHJvdG8ubmdPbkRlc3Ryb3k7XG4gICAgY2FzZSBMaWZlY3ljbGVIb29rcy5PbkluaXQ6XG4gICAgICByZXR1cm4gISFwcm90by5uZ09uSW5pdDtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
