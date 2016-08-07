System.register(['angular2/src/facade/lang', './interfaces'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, interfaces_1;
    function hasLifecycleHook(lcInterface, token) {
        if (!(token instanceof lang_1.Type))
            return false;
        var proto = token.prototype;
        switch (lcInterface) {
            case interfaces_1.LifecycleHooks.AfterContentInit:
                return !!proto.ngAfterContentInit;
            case interfaces_1.LifecycleHooks.AfterContentChecked:
                return !!proto.ngAfterContentChecked;
            case interfaces_1.LifecycleHooks.AfterViewInit:
                return !!proto.ngAfterViewInit;
            case interfaces_1.LifecycleHooks.AfterViewChecked:
                return !!proto.ngAfterViewChecked;
            case interfaces_1.LifecycleHooks.OnChanges:
                return !!proto.ngOnChanges;
            case interfaces_1.LifecycleHooks.DoCheck:
                return !!proto.ngDoCheck;
            case interfaces_1.LifecycleHooks.OnDestroy:
                return !!proto.ngOnDestroy;
            case interfaces_1.LifecycleHooks.OnInit:
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
            function (interfaces_1_1) {
                interfaces_1 = interfaces_1_1;
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvbGlua2VyL2RpcmVjdGl2ZV9saWZlY3ljbGVfcmVmbGVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7SUFHQSwwQkFBaUMsV0FBMkIsRUFBRSxLQUFLO1FBQ2pFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFlBQVksV0FBSSxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBRTNDLElBQUksS0FBSyxHQUFTLEtBQU0sQ0FBQyxTQUFTLENBQUM7UUFFbkMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNwQixLQUFLLDJCQUFjLENBQUMsZ0JBQWdCO2dCQUNsQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQztZQUNwQyxLQUFLLDJCQUFjLENBQUMsbUJBQW1CO2dCQUNyQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQztZQUN2QyxLQUFLLDJCQUFjLENBQUMsYUFBYTtnQkFDL0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDO1lBQ2pDLEtBQUssMkJBQWMsQ0FBQyxnQkFBZ0I7Z0JBQ2xDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDO1lBQ3BDLEtBQUssMkJBQWMsQ0FBQyxTQUFTO2dCQUMzQixNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7WUFDN0IsS0FBSywyQkFBYyxDQUFDLE9BQU87Z0JBQ3pCLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztZQUMzQixLQUFLLDJCQUFjLENBQUMsU0FBUztnQkFDM0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO1lBQzdCLEtBQUssMkJBQWMsQ0FBQyxNQUFNO2dCQUN4QixNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDMUI7Z0JBQ0UsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO0lBQ0gsQ0FBQztJQXpCRCwrQ0F5QkMsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2xpbmtlci9kaXJlY3RpdmVfbGlmZWN5Y2xlX3JlZmxlY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VHlwZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7TGlmZWN5Y2xlSG9va3N9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNMaWZlY3ljbGVIb29rKGxjSW50ZXJmYWNlOiBMaWZlY3ljbGVIb29rcywgdG9rZW4pOiBib29sZWFuIHtcbiAgaWYgKCEodG9rZW4gaW5zdGFuY2VvZiBUeXBlKSkgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciBwcm90byA9ICg8YW55PnRva2VuKS5wcm90b3R5cGU7XG5cbiAgc3dpdGNoIChsY0ludGVyZmFjZSkge1xuICAgIGNhc2UgTGlmZWN5Y2xlSG9va3MuQWZ0ZXJDb250ZW50SW5pdDpcbiAgICAgIHJldHVybiAhIXByb3RvLm5nQWZ0ZXJDb250ZW50SW5pdDtcbiAgICBjYXNlIExpZmVjeWNsZUhvb2tzLkFmdGVyQ29udGVudENoZWNrZWQ6XG4gICAgICByZXR1cm4gISFwcm90by5uZ0FmdGVyQ29udGVudENoZWNrZWQ7XG4gICAgY2FzZSBMaWZlY3ljbGVIb29rcy5BZnRlclZpZXdJbml0OlxuICAgICAgcmV0dXJuICEhcHJvdG8ubmdBZnRlclZpZXdJbml0O1xuICAgIGNhc2UgTGlmZWN5Y2xlSG9va3MuQWZ0ZXJWaWV3Q2hlY2tlZDpcbiAgICAgIHJldHVybiAhIXByb3RvLm5nQWZ0ZXJWaWV3Q2hlY2tlZDtcbiAgICBjYXNlIExpZmVjeWNsZUhvb2tzLk9uQ2hhbmdlczpcbiAgICAgIHJldHVybiAhIXByb3RvLm5nT25DaGFuZ2VzO1xuICAgIGNhc2UgTGlmZWN5Y2xlSG9va3MuRG9DaGVjazpcbiAgICAgIHJldHVybiAhIXByb3RvLm5nRG9DaGVjaztcbiAgICBjYXNlIExpZmVjeWNsZUhvb2tzLk9uRGVzdHJveTpcbiAgICAgIHJldHVybiAhIXByb3RvLm5nT25EZXN0cm95O1xuICAgIGNhc2UgTGlmZWN5Y2xlSG9va3MuT25Jbml0OlxuICAgICAgcmV0dXJuICEhcHJvdG8ubmdPbkluaXQ7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
