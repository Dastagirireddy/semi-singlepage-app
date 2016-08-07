System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', './forward_ref'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, exceptions_1, forward_ref_1;
    var Key, KeyRegistry, _globalKeyRegistry;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (forward_ref_1_1) {
                forward_ref_1 = forward_ref_1_1;
            }],
        execute: function() {
            /**
             * A unique object used for retrieving items from the {@link Injector}.
             *
             * Keys have:
             * - a system-wide unique `id`.
             * - a `token`.
             *
             * `Key` is used internally by {@link Injector} because its system-wide unique `id` allows the
             * injector to store created objects in a more efficient way.
             *
             * `Key` should not be created directly. {@link Injector} creates keys automatically when resolving
             * providers.
             */
            Key = (function () {
                /**
                 * Private
                 */
                function Key(token, id) {
                    this.token = token;
                    this.id = id;
                    if (lang_1.isBlank(token)) {
                        throw new exceptions_1.BaseException('Token must be defined!');
                    }
                }
                Object.defineProperty(Key.prototype, "displayName", {
                    /**
                     * Returns a stringified token.
                     */
                    get: function () { return lang_1.stringify(this.token); },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Retrieves a `Key` for a token.
                 */
                Key.get = function (token) { return _globalKeyRegistry.get(forward_ref_1.resolveForwardRef(token)); };
                Object.defineProperty(Key, "numberOfKeys", {
                    /**
                     * @returns the number of keys registered in the system.
                     */
                    get: function () { return _globalKeyRegistry.numberOfKeys; },
                    enumerable: true,
                    configurable: true
                });
                return Key;
            }());
            exports_1("Key", Key);
            /**
             * @internal
             */
            KeyRegistry = (function () {
                function KeyRegistry() {
                    this._allKeys = new Map();
                }
                KeyRegistry.prototype.get = function (token) {
                    if (token instanceof Key)
                        return token;
                    if (this._allKeys.has(token)) {
                        return this._allKeys.get(token);
                    }
                    var newKey = new Key(token, Key.numberOfKeys);
                    this._allKeys.set(token, newKey);
                    return newKey;
                };
                Object.defineProperty(KeyRegistry.prototype, "numberOfKeys", {
                    get: function () { return this._allKeys.size; },
                    enumerable: true,
                    configurable: true
                });
                return KeyRegistry;
            }());
            exports_1("KeyRegistry", KeyRegistry);
            _globalKeyRegistry = new KeyRegistry();
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvZGkva2V5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7MEJBZ0VJLGtCQUFrQjs7Ozs7Ozs7Ozs7OztZQTVEdEI7Ozs7Ozs7Ozs7OztlQVlHO1lBQ0g7Z0JBQ0U7O21CQUVHO2dCQUNILGFBQW1CLEtBQWEsRUFBUyxFQUFVO29CQUFoQyxVQUFLLEdBQUwsS0FBSyxDQUFRO29CQUFTLE9BQUUsR0FBRixFQUFFLENBQVE7b0JBQ2pELEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ25CLE1BQU0sSUFBSSwwQkFBYSxDQUFDLHdCQUF3QixDQUFDLENBQUM7b0JBQ3BELENBQUM7Z0JBQ0gsQ0FBQztnQkFLRCxzQkFBSSw0QkFBVztvQkFIZjs7dUJBRUc7eUJBQ0gsY0FBNEIsTUFBTSxDQUFDLGdCQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUUzRDs7bUJBRUc7Z0JBQ0ksT0FBRyxHQUFWLFVBQVcsS0FBYSxJQUFTLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsK0JBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBSzNGLHNCQUFXLG1CQUFZO29CQUh2Qjs7dUJBRUc7eUJBQ0gsY0FBb0MsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFDL0UsVUFBQztZQUFELENBeEJBLEFBd0JDLElBQUE7WUF4QkQscUJBd0JDLENBQUE7WUFFRDs7ZUFFRztZQUNIO2dCQUFBO29CQUNVLGFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBZSxDQUFDO2dCQWU1QyxDQUFDO2dCQWJDLHlCQUFHLEdBQUgsVUFBSSxLQUFhO29CQUNmLEVBQUUsQ0FBQyxDQUFDLEtBQUssWUFBWSxHQUFHLENBQUM7d0JBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztvQkFFdkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2xDLENBQUM7b0JBRUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUNqQyxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNoQixDQUFDO2dCQUVELHNCQUFJLHFDQUFZO3lCQUFoQixjQUE2QixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBQzNELGtCQUFDO1lBQUQsQ0FoQkEsQUFnQkMsSUFBQTtZQWhCRCxxQ0FnQkMsQ0FBQTtZQUVHLGtCQUFrQixHQUFHLElBQUksV0FBVyxFQUFFLENBQUMiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29yZS9kaS9rZXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3N0cmluZ2lmeSwgQ09OU1QsIFR5cGUsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb24sIFdyYXBwZWRFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge3Jlc29sdmVGb3J3YXJkUmVmfSBmcm9tICcuL2ZvcndhcmRfcmVmJztcblxuLyoqXG4gKiBBIHVuaXF1ZSBvYmplY3QgdXNlZCBmb3IgcmV0cmlldmluZyBpdGVtcyBmcm9tIHRoZSB7QGxpbmsgSW5qZWN0b3J9LlxuICpcbiAqIEtleXMgaGF2ZTpcbiAqIC0gYSBzeXN0ZW0td2lkZSB1bmlxdWUgYGlkYC5cbiAqIC0gYSBgdG9rZW5gLlxuICpcbiAqIGBLZXlgIGlzIHVzZWQgaW50ZXJuYWxseSBieSB7QGxpbmsgSW5qZWN0b3J9IGJlY2F1c2UgaXRzIHN5c3RlbS13aWRlIHVuaXF1ZSBgaWRgIGFsbG93cyB0aGVcbiAqIGluamVjdG9yIHRvIHN0b3JlIGNyZWF0ZWQgb2JqZWN0cyBpbiBhIG1vcmUgZWZmaWNpZW50IHdheS5cbiAqXG4gKiBgS2V5YCBzaG91bGQgbm90IGJlIGNyZWF0ZWQgZGlyZWN0bHkuIHtAbGluayBJbmplY3Rvcn0gY3JlYXRlcyBrZXlzIGF1dG9tYXRpY2FsbHkgd2hlbiByZXNvbHZpbmdcbiAqIHByb3ZpZGVycy5cbiAqL1xuZXhwb3J0IGNsYXNzIEtleSB7XG4gIC8qKlxuICAgKiBQcml2YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdG9rZW46IE9iamVjdCwgcHVibGljIGlkOiBudW1iZXIpIHtcbiAgICBpZiAoaXNCbGFuayh0b2tlbikpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKCdUb2tlbiBtdXN0IGJlIGRlZmluZWQhJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBzdHJpbmdpZmllZCB0b2tlbi5cbiAgICovXG4gIGdldCBkaXNwbGF5TmFtZSgpOiBzdHJpbmcgeyByZXR1cm4gc3RyaW5naWZ5KHRoaXMudG9rZW4pOyB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyBhIGBLZXlgIGZvciBhIHRva2VuLlxuICAgKi9cbiAgc3RhdGljIGdldCh0b2tlbjogT2JqZWN0KTogS2V5IHsgcmV0dXJuIF9nbG9iYWxLZXlSZWdpc3RyeS5nZXQocmVzb2x2ZUZvcndhcmRSZWYodG9rZW4pKTsgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB0aGUgbnVtYmVyIG9mIGtleXMgcmVnaXN0ZXJlZCBpbiB0aGUgc3lzdGVtLlxuICAgKi9cbiAgc3RhdGljIGdldCBudW1iZXJPZktleXMoKTogbnVtYmVyIHsgcmV0dXJuIF9nbG9iYWxLZXlSZWdpc3RyeS5udW1iZXJPZktleXM7IH1cbn1cblxuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNsYXNzIEtleVJlZ2lzdHJ5IHtcbiAgcHJpdmF0ZSBfYWxsS2V5cyA9IG5ldyBNYXA8T2JqZWN0LCBLZXk+KCk7XG5cbiAgZ2V0KHRva2VuOiBPYmplY3QpOiBLZXkge1xuICAgIGlmICh0b2tlbiBpbnN0YW5jZW9mIEtleSkgcmV0dXJuIHRva2VuO1xuXG4gICAgaWYgKHRoaXMuX2FsbEtleXMuaGFzKHRva2VuKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2FsbEtleXMuZ2V0KHRva2VuKTtcbiAgICB9XG5cbiAgICB2YXIgbmV3S2V5ID0gbmV3IEtleSh0b2tlbiwgS2V5Lm51bWJlck9mS2V5cyk7XG4gICAgdGhpcy5fYWxsS2V5cy5zZXQodG9rZW4sIG5ld0tleSk7XG4gICAgcmV0dXJuIG5ld0tleTtcbiAgfVxuXG4gIGdldCBudW1iZXJPZktleXMoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2FsbEtleXMuc2l6ZTsgfVxufVxuXG52YXIgX2dsb2JhbEtleVJlZ2lzdHJ5ID0gbmV3IEtleVJlZ2lzdHJ5KCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
