System.register(['./metadata', '../util/decorators'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var metadata_1, decorators_1;
    var Inject, Optional, Injectable, Self, Host, SkipSelf;
    return {
        setters:[
            function (metadata_1_1) {
                metadata_1 = metadata_1_1;
            },
            function (decorators_1_1) {
                decorators_1 = decorators_1_1;
            }],
        execute: function() {
            /**
             * Factory for creating {@link InjectMetadata}.
             */
            exports_1("Inject", Inject = decorators_1.makeParamDecorator(metadata_1.InjectMetadata));
            /**
             * Factory for creating {@link OptionalMetadata}.
             */
            exports_1("Optional", Optional = decorators_1.makeParamDecorator(metadata_1.OptionalMetadata));
            /**
             * Factory for creating {@link InjectableMetadata}.
             */
            exports_1("Injectable", Injectable = decorators_1.makeDecorator(metadata_1.InjectableMetadata));
            /**
             * Factory for creating {@link SelfMetadata}.
             */
            exports_1("Self", Self = decorators_1.makeParamDecorator(metadata_1.SelfMetadata));
            /**
             * Factory for creating {@link HostMetadata}.
             */
            exports_1("Host", Host = decorators_1.makeParamDecorator(metadata_1.HostMetadata));
            /**
             * Factory for creating {@link SkipSelfMetadata}.
             */
            exports_1("SkipSelf", SkipSelf = decorators_1.makeParamDecorator(metadata_1.SkipSelfMetadata));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2RpL2RlY29yYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQTZEVyxNQUFNLEVBS04sUUFBUSxFQUtSLFVBQVUsRUFNVixJQUFJLEVBS0osSUFBSSxFQUtKLFFBQVE7Ozs7Ozs7Ozs7WUE3Qm5COztlQUVHO1lBQ1Esb0JBQUEsTUFBTSxHQUEwQiwrQkFBa0IsQ0FBQyx5QkFBYyxDQUFDLENBQUEsQ0FBQztZQUU5RTs7ZUFFRztZQUNRLHNCQUFBLFFBQVEsR0FBNEIsK0JBQWtCLENBQUMsMkJBQWdCLENBQUMsQ0FBQSxDQUFDO1lBRXBGOztlQUVHO1lBQ1Esd0JBQUEsVUFBVSxHQUNVLDBCQUFhLENBQUMsNkJBQWtCLENBQUMsQ0FBQSxDQUFDO1lBRWpFOztlQUVHO1lBQ1Esa0JBQUEsSUFBSSxHQUF3QiwrQkFBa0IsQ0FBQyx1QkFBWSxDQUFDLENBQUEsQ0FBQztZQUV4RTs7ZUFFRztZQUNRLGtCQUFBLElBQUksR0FBd0IsK0JBQWtCLENBQUMsdUJBQVksQ0FBQyxDQUFBLENBQUM7WUFFeEU7O2VBRUc7WUFDUSxzQkFBQSxRQUFRLEdBQTRCLCtCQUFrQixDQUFDLDJCQUFnQixDQUFDLENBQUEsQ0FBQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29yZS9kaS9kZWNvcmF0b3JzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSW5qZWN0TWV0YWRhdGEsXG4gIE9wdGlvbmFsTWV0YWRhdGEsXG4gIEluamVjdGFibGVNZXRhZGF0YSxcbiAgU2VsZk1ldGFkYXRhLFxuICBIb3N0TWV0YWRhdGEsXG4gIFNraXBTZWxmTWV0YWRhdGFcbn0gZnJvbSAnLi9tZXRhZGF0YSc7XG5pbXBvcnQge21ha2VEZWNvcmF0b3IsIG1ha2VQYXJhbURlY29yYXRvcn0gZnJvbSAnLi4vdXRpbC9kZWNvcmF0b3JzJztcblxuLyoqXG4gKiBGYWN0b3J5IGZvciBjcmVhdGluZyB7QGxpbmsgSW5qZWN0TWV0YWRhdGF9LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEluamVjdE1ldGFkYXRhRmFjdG9yeSB7XG4gICh0b2tlbjogYW55KTogYW55O1xuICBuZXcgKHRva2VuOiBhbnkpOiBJbmplY3RNZXRhZGF0YTtcbn1cblxuLyoqXG4gKiBGYWN0b3J5IGZvciBjcmVhdGluZyB7QGxpbmsgT3B0aW9uYWxNZXRhZGF0YX0uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9uYWxNZXRhZGF0YUZhY3Rvcnkge1xuICAoKTogYW55O1xuICBuZXcgKCk6IE9wdGlvbmFsTWV0YWRhdGE7XG59XG5cbi8qKlxuICogRmFjdG9yeSBmb3IgY3JlYXRpbmcge0BsaW5rIEluamVjdGFibGVNZXRhZGF0YX0uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW5qZWN0YWJsZU1ldGFkYXRhRmFjdG9yeSB7XG4gICgpOiBhbnk7XG4gIG5ldyAoKTogSW5qZWN0YWJsZU1ldGFkYXRhO1xufVxuXG4vKipcbiAqIEZhY3RvcnkgZm9yIGNyZWF0aW5nIHtAbGluayBTZWxmTWV0YWRhdGF9LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNlbGZNZXRhZGF0YUZhY3Rvcnkge1xuICAoKTogYW55O1xuICBuZXcgKCk6IFNlbGZNZXRhZGF0YTtcbn1cblxuLyoqXG4gKiBGYWN0b3J5IGZvciBjcmVhdGluZyB7QGxpbmsgSG9zdE1ldGFkYXRhfS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBIb3N0TWV0YWRhdGFGYWN0b3J5IHtcbiAgKCk6IGFueTtcbiAgbmV3ICgpOiBIb3N0TWV0YWRhdGE7XG59XG5cbi8qKlxuICogRmFjdG9yeSBmb3IgY3JlYXRpbmcge0BsaW5rIFNraXBTZWxmTWV0YWRhdGF9LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNraXBTZWxmTWV0YWRhdGFGYWN0b3J5IHtcbiAgKCk6IGFueTtcbiAgbmV3ICgpOiBTa2lwU2VsZk1ldGFkYXRhO1xufVxuXG4vKipcbiAqIEZhY3RvcnkgZm9yIGNyZWF0aW5nIHtAbGluayBJbmplY3RNZXRhZGF0YX0uXG4gKi9cbmV4cG9ydCB2YXIgSW5qZWN0OiBJbmplY3RNZXRhZGF0YUZhY3RvcnkgPSBtYWtlUGFyYW1EZWNvcmF0b3IoSW5qZWN0TWV0YWRhdGEpO1xuXG4vKipcbiAqIEZhY3RvcnkgZm9yIGNyZWF0aW5nIHtAbGluayBPcHRpb25hbE1ldGFkYXRhfS5cbiAqL1xuZXhwb3J0IHZhciBPcHRpb25hbDogT3B0aW9uYWxNZXRhZGF0YUZhY3RvcnkgPSBtYWtlUGFyYW1EZWNvcmF0b3IoT3B0aW9uYWxNZXRhZGF0YSk7XG5cbi8qKlxuICogRmFjdG9yeSBmb3IgY3JlYXRpbmcge0BsaW5rIEluamVjdGFibGVNZXRhZGF0YX0uXG4gKi9cbmV4cG9ydCB2YXIgSW5qZWN0YWJsZTogSW5qZWN0YWJsZU1ldGFkYXRhRmFjdG9yeSA9XG4gICAgPEluamVjdGFibGVNZXRhZGF0YUZhY3Rvcnk+bWFrZURlY29yYXRvcihJbmplY3RhYmxlTWV0YWRhdGEpO1xuXG4vKipcbiAqIEZhY3RvcnkgZm9yIGNyZWF0aW5nIHtAbGluayBTZWxmTWV0YWRhdGF9LlxuICovXG5leHBvcnQgdmFyIFNlbGY6IFNlbGZNZXRhZGF0YUZhY3RvcnkgPSBtYWtlUGFyYW1EZWNvcmF0b3IoU2VsZk1ldGFkYXRhKTtcblxuLyoqXG4gKiBGYWN0b3J5IGZvciBjcmVhdGluZyB7QGxpbmsgSG9zdE1ldGFkYXRhfS5cbiAqL1xuZXhwb3J0IHZhciBIb3N0OiBIb3N0TWV0YWRhdGFGYWN0b3J5ID0gbWFrZVBhcmFtRGVjb3JhdG9yKEhvc3RNZXRhZGF0YSk7XG5cbi8qKlxuICogRmFjdG9yeSBmb3IgY3JlYXRpbmcge0BsaW5rIFNraXBTZWxmTWV0YWRhdGF9LlxuICovXG5leHBvcnQgdmFyIFNraXBTZWxmOiBTa2lwU2VsZk1ldGFkYXRhRmFjdG9yeSA9IG1ha2VQYXJhbURlY29yYXRvcihTa2lwU2VsZk1ldGFkYXRhKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
