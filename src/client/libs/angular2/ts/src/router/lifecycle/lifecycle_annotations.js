/**
 * This indirection is needed to free up Component, etc symbols in the public API
 * to be used by the decorator versions of these annotations.
 */
System.register(['angular2/src/core/util/decorators', './lifecycle_annotations_impl'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var decorators_1, lifecycle_annotations_impl_1;
    var CanActivate;
    return {
        setters:[
            function (decorators_1_1) {
                decorators_1 = decorators_1_1;
            },
            function (lifecycle_annotations_impl_1_1) {
                lifecycle_annotations_impl_1 = lifecycle_annotations_impl_1_1;
                exports_1({
                    "routerCanReuse": lifecycle_annotations_impl_1_1["routerCanReuse"],
                    "routerCanDeactivate": lifecycle_annotations_impl_1_1["routerCanDeactivate"],
                    "routerOnActivate": lifecycle_annotations_impl_1_1["routerOnActivate"],
                    "routerOnReuse": lifecycle_annotations_impl_1_1["routerOnReuse"],
                    "routerOnDeactivate": lifecycle_annotations_impl_1_1["routerOnDeactivate"]
                });
            }],
        execute: function() {
            /**
             * Defines route lifecycle hook `CanActivate`, which is called by the router to determine
             * if a component can be instantiated as part of a navigation.
             *
             * <aside class="is-right">
             * Note that unlike other lifecycle hooks, this one uses an annotation rather than an interface.
             * This is because the `CanActivate` function is called before the component is instantiated.
             * </aside>
             *
             * The `CanActivate` hook is called with two {@link ComponentInstruction}s as parameters, the first
             * representing the current route being navigated to, and the second parameter representing the
             * previous route or `null`.
             *
             * ```typescript
             * @CanActivate((next, prev) => boolean | Promise<boolean>)
             * ```
             *
             * If `CanActivate` returns or resolves to `false`, the navigation is cancelled.
             * If `CanActivate` throws or rejects, the navigation is also cancelled.
             * If `CanActivate` returns or resolves to `true`, navigation continues, the component is
             * instantiated, and the {@link OnActivate} hook of that component is called if implemented.
             *
             * ### Example
             *
             * {@example router/ts/can_activate/can_activate_example.ts region='canActivate' }
             */
            exports_1("CanActivate", CanActivate = decorators_1.makeDecorator(lifecycle_annotations_impl_1.CanActivate));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9saWZlY3ljbGUvbGlmZWN5Y2xlX2Fubm90YXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRzs7Ozs7UUF3Q1EsV0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7WUExQnRCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBeUJHO1lBQ1EseUJBQUEsV0FBVyxHQUVsQiwwQkFBYSxDQUFDLHdDQUFxQixDQUFDLENBQUEsQ0FBQyIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvbGlmZWN5Y2xlL2xpZmVjeWNsZV9hbm5vdGF0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGhpcyBpbmRpcmVjdGlvbiBpcyBuZWVkZWQgdG8gZnJlZSB1cCBDb21wb25lbnQsIGV0YyBzeW1ib2xzIGluIHRoZSBwdWJsaWMgQVBJXG4gKiB0byBiZSB1c2VkIGJ5IHRoZSBkZWNvcmF0b3IgdmVyc2lvbnMgb2YgdGhlc2UgYW5ub3RhdGlvbnMuXG4gKi9cblxuaW1wb3J0IHttYWtlRGVjb3JhdG9yfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS91dGlsL2RlY29yYXRvcnMnO1xuaW1wb3J0IHtDYW5BY3RpdmF0ZSBhcyBDYW5BY3RpdmF0ZUFubm90YXRpb259IGZyb20gJy4vbGlmZWN5Y2xlX2Fubm90YXRpb25zX2ltcGwnO1xuaW1wb3J0IHtDb21wb25lbnRJbnN0cnVjdGlvbn0gZnJvbSAnLi4vaW5zdHJ1Y3Rpb24nO1xuXG5leHBvcnQge1xuICByb3V0ZXJDYW5SZXVzZSxcbiAgcm91dGVyQ2FuRGVhY3RpdmF0ZSxcbiAgcm91dGVyT25BY3RpdmF0ZSxcbiAgcm91dGVyT25SZXVzZSxcbiAgcm91dGVyT25EZWFjdGl2YXRlXG59IGZyb20gJy4vbGlmZWN5Y2xlX2Fubm90YXRpb25zX2ltcGwnO1xuXG4vKipcbiAqIERlZmluZXMgcm91dGUgbGlmZWN5Y2xlIGhvb2sgYENhbkFjdGl2YXRlYCwgd2hpY2ggaXMgY2FsbGVkIGJ5IHRoZSByb3V0ZXIgdG8gZGV0ZXJtaW5lXG4gKiBpZiBhIGNvbXBvbmVudCBjYW4gYmUgaW5zdGFudGlhdGVkIGFzIHBhcnQgb2YgYSBuYXZpZ2F0aW9uLlxuICpcbiAqIDxhc2lkZSBjbGFzcz1cImlzLXJpZ2h0XCI+XG4gKiBOb3RlIHRoYXQgdW5saWtlIG90aGVyIGxpZmVjeWNsZSBob29rcywgdGhpcyBvbmUgdXNlcyBhbiBhbm5vdGF0aW9uIHJhdGhlciB0aGFuIGFuIGludGVyZmFjZS5cbiAqIFRoaXMgaXMgYmVjYXVzZSB0aGUgYENhbkFjdGl2YXRlYCBmdW5jdGlvbiBpcyBjYWxsZWQgYmVmb3JlIHRoZSBjb21wb25lbnQgaXMgaW5zdGFudGlhdGVkLlxuICogPC9hc2lkZT5cbiAqXG4gKiBUaGUgYENhbkFjdGl2YXRlYCBob29rIGlzIGNhbGxlZCB3aXRoIHR3byB7QGxpbmsgQ29tcG9uZW50SW5zdHJ1Y3Rpb259cyBhcyBwYXJhbWV0ZXJzLCB0aGUgZmlyc3RcbiAqIHJlcHJlc2VudGluZyB0aGUgY3VycmVudCByb3V0ZSBiZWluZyBuYXZpZ2F0ZWQgdG8sIGFuZCB0aGUgc2Vjb25kIHBhcmFtZXRlciByZXByZXNlbnRpbmcgdGhlXG4gKiBwcmV2aW91cyByb3V0ZSBvciBgbnVsbGAuXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogQENhbkFjdGl2YXRlKChuZXh0LCBwcmV2KSA9PiBib29sZWFuIHwgUHJvbWlzZTxib29sZWFuPilcbiAqIGBgYFxuICpcbiAqIElmIGBDYW5BY3RpdmF0ZWAgcmV0dXJucyBvciByZXNvbHZlcyB0byBgZmFsc2VgLCB0aGUgbmF2aWdhdGlvbiBpcyBjYW5jZWxsZWQuXG4gKiBJZiBgQ2FuQWN0aXZhdGVgIHRocm93cyBvciByZWplY3RzLCB0aGUgbmF2aWdhdGlvbiBpcyBhbHNvIGNhbmNlbGxlZC5cbiAqIElmIGBDYW5BY3RpdmF0ZWAgcmV0dXJucyBvciByZXNvbHZlcyB0byBgdHJ1ZWAsIG5hdmlnYXRpb24gY29udGludWVzLCB0aGUgY29tcG9uZW50IGlzXG4gKiBpbnN0YW50aWF0ZWQsIGFuZCB0aGUge0BsaW5rIE9uQWN0aXZhdGV9IGhvb2sgb2YgdGhhdCBjb21wb25lbnQgaXMgY2FsbGVkIGlmIGltcGxlbWVudGVkLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIHJvdXRlci90cy9jYW5fYWN0aXZhdGUvY2FuX2FjdGl2YXRlX2V4YW1wbGUudHMgcmVnaW9uPSdjYW5BY3RpdmF0ZScgfVxuICovXG5leHBvcnQgdmFyIENhbkFjdGl2YXRlOiAoaG9vazogKG5leHQ6IENvbXBvbmVudEluc3RydWN0aW9uLCBwcmV2OiBDb21wb25lbnRJbnN0cnVjdGlvbikgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJvbWlzZTxib29sZWFuPnwgYm9vbGVhbikgPT4gQ2xhc3NEZWNvcmF0b3IgPVxuICAgIG1ha2VEZWNvcmF0b3IoQ2FuQWN0aXZhdGVBbm5vdGF0aW9uKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
