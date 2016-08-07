System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', './forward_ref'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, exceptions_1, forward_ref_1;
    var ReflectiveKey, KeyRegistry, _globalKeyRegistry;
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
             * A unique object used for retrieving items from the {@link ReflectiveInjector}.
             *
             * Keys have:
             * - a system-wide unique `id`.
             * - a `token`.
             *
             * `Key` is used internally by {@link ReflectiveInjector} because its system-wide unique `id` allows
             * the
             * injector to store created objects in a more efficient way.
             *
             * `Key` should not be created directly. {@link ReflectiveInjector} creates keys automatically when
             * resolving
             * providers.
             */
            ReflectiveKey = (function () {
                /**
                 * Private
                 */
                function ReflectiveKey(token, id) {
                    this.token = token;
                    this.id = id;
                    if (lang_1.isBlank(token)) {
                        throw new exceptions_1.BaseException('Token must be defined!');
                    }
                }
                Object.defineProperty(ReflectiveKey.prototype, "displayName", {
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
                ReflectiveKey.get = function (token) {
                    return _globalKeyRegistry.get(forward_ref_1.resolveForwardRef(token));
                };
                Object.defineProperty(ReflectiveKey, "numberOfKeys", {
                    /**
                     * @returns the number of keys registered in the system.
                     */
                    get: function () { return _globalKeyRegistry.numberOfKeys; },
                    enumerable: true,
                    configurable: true
                });
                return ReflectiveKey;
            }());
            exports_1("ReflectiveKey", ReflectiveKey);
            /**
             * @internal
             */
            KeyRegistry = (function () {
                function KeyRegistry() {
                    this._allKeys = new Map();
                }
                KeyRegistry.prototype.get = function (token) {
                    if (token instanceof ReflectiveKey)
                        return token;
                    if (this._allKeys.has(token)) {
                        return this._allKeys.get(token);
                    }
                    var newKey = new ReflectiveKey(token, ReflectiveKey.numberOfKeys);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2RpL3JlZmxlY3RpdmVfa2V5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7b0NBb0VJLGtCQUFrQjs7Ozs7Ozs7Ozs7OztZQWhFdEI7Ozs7Ozs7Ozs7Ozs7O2VBY0c7WUFDSDtnQkFDRTs7bUJBRUc7Z0JBQ0gsdUJBQW1CLEtBQWEsRUFBUyxFQUFVO29CQUFoQyxVQUFLLEdBQUwsS0FBSyxDQUFRO29CQUFTLE9BQUUsR0FBRixFQUFFLENBQVE7b0JBQ2pELEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ25CLE1BQU0sSUFBSSwwQkFBYSxDQUFDLHdCQUF3QixDQUFDLENBQUM7b0JBQ3BELENBQUM7Z0JBQ0gsQ0FBQztnQkFLRCxzQkFBSSxzQ0FBVztvQkFIZjs7dUJBRUc7eUJBQ0gsY0FBNEIsTUFBTSxDQUFDLGdCQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUUzRDs7bUJBRUc7Z0JBQ0ksaUJBQUcsR0FBVixVQUFXLEtBQWE7b0JBQ3RCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsK0JBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDMUQsQ0FBQztnQkFLRCxzQkFBVyw2QkFBWTtvQkFIdkI7O3VCQUVHO3lCQUNILGNBQW9DLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBQy9FLG9CQUFDO1lBQUQsQ0ExQkEsQUEwQkMsSUFBQTtZQTFCRCx5Q0EwQkMsQ0FBQTtZQUVEOztlQUVHO1lBQ0g7Z0JBQUE7b0JBQ1UsYUFBUSxHQUFHLElBQUksR0FBRyxFQUF5QixDQUFDO2dCQWV0RCxDQUFDO2dCQWJDLHlCQUFHLEdBQUgsVUFBSSxLQUFhO29CQUNmLEVBQUUsQ0FBQyxDQUFDLEtBQUssWUFBWSxhQUFhLENBQUM7d0JBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztvQkFFakQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2xDLENBQUM7b0JBRUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxhQUFhLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDbEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUNqQyxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNoQixDQUFDO2dCQUVELHNCQUFJLHFDQUFZO3lCQUFoQixjQUE2QixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBQzNELGtCQUFDO1lBQUQsQ0FoQkEsQUFnQkMsSUFBQTtZQWhCRCxxQ0FnQkMsQ0FBQTtZQUVHLGtCQUFrQixHQUFHLElBQUksV0FBVyxFQUFFLENBQUMiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvZGkvcmVmbGVjdGl2ZV9rZXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3N0cmluZ2lmeSwgQ09OU1QsIFR5cGUsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb24sIFdyYXBwZWRFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge3Jlc29sdmVGb3J3YXJkUmVmfSBmcm9tICcuL2ZvcndhcmRfcmVmJztcblxuLyoqXG4gKiBBIHVuaXF1ZSBvYmplY3QgdXNlZCBmb3IgcmV0cmlldmluZyBpdGVtcyBmcm9tIHRoZSB7QGxpbmsgUmVmbGVjdGl2ZUluamVjdG9yfS5cbiAqXG4gKiBLZXlzIGhhdmU6XG4gKiAtIGEgc3lzdGVtLXdpZGUgdW5pcXVlIGBpZGAuXG4gKiAtIGEgYHRva2VuYC5cbiAqXG4gKiBgS2V5YCBpcyB1c2VkIGludGVybmFsbHkgYnkge0BsaW5rIFJlZmxlY3RpdmVJbmplY3Rvcn0gYmVjYXVzZSBpdHMgc3lzdGVtLXdpZGUgdW5pcXVlIGBpZGAgYWxsb3dzXG4gKiB0aGVcbiAqIGluamVjdG9yIHRvIHN0b3JlIGNyZWF0ZWQgb2JqZWN0cyBpbiBhIG1vcmUgZWZmaWNpZW50IHdheS5cbiAqXG4gKiBgS2V5YCBzaG91bGQgbm90IGJlIGNyZWF0ZWQgZGlyZWN0bHkuIHtAbGluayBSZWZsZWN0aXZlSW5qZWN0b3J9IGNyZWF0ZXMga2V5cyBhdXRvbWF0aWNhbGx5IHdoZW5cbiAqIHJlc29sdmluZ1xuICogcHJvdmlkZXJzLlxuICovXG5leHBvcnQgY2xhc3MgUmVmbGVjdGl2ZUtleSB7XG4gIC8qKlxuICAgKiBQcml2YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdG9rZW46IE9iamVjdCwgcHVibGljIGlkOiBudW1iZXIpIHtcbiAgICBpZiAoaXNCbGFuayh0b2tlbikpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKCdUb2tlbiBtdXN0IGJlIGRlZmluZWQhJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBzdHJpbmdpZmllZCB0b2tlbi5cbiAgICovXG4gIGdldCBkaXNwbGF5TmFtZSgpOiBzdHJpbmcgeyByZXR1cm4gc3RyaW5naWZ5KHRoaXMudG9rZW4pOyB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyBhIGBLZXlgIGZvciBhIHRva2VuLlxuICAgKi9cbiAgc3RhdGljIGdldCh0b2tlbjogT2JqZWN0KTogUmVmbGVjdGl2ZUtleSB7XG4gICAgcmV0dXJuIF9nbG9iYWxLZXlSZWdpc3RyeS5nZXQocmVzb2x2ZUZvcndhcmRSZWYodG9rZW4pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB0aGUgbnVtYmVyIG9mIGtleXMgcmVnaXN0ZXJlZCBpbiB0aGUgc3lzdGVtLlxuICAgKi9cbiAgc3RhdGljIGdldCBudW1iZXJPZktleXMoKTogbnVtYmVyIHsgcmV0dXJuIF9nbG9iYWxLZXlSZWdpc3RyeS5udW1iZXJPZktleXM7IH1cbn1cblxuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNsYXNzIEtleVJlZ2lzdHJ5IHtcbiAgcHJpdmF0ZSBfYWxsS2V5cyA9IG5ldyBNYXA8T2JqZWN0LCBSZWZsZWN0aXZlS2V5PigpO1xuXG4gIGdldCh0b2tlbjogT2JqZWN0KTogUmVmbGVjdGl2ZUtleSB7XG4gICAgaWYgKHRva2VuIGluc3RhbmNlb2YgUmVmbGVjdGl2ZUtleSkgcmV0dXJuIHRva2VuO1xuXG4gICAgaWYgKHRoaXMuX2FsbEtleXMuaGFzKHRva2VuKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2FsbEtleXMuZ2V0KHRva2VuKTtcbiAgICB9XG5cbiAgICB2YXIgbmV3S2V5ID0gbmV3IFJlZmxlY3RpdmVLZXkodG9rZW4sIFJlZmxlY3RpdmVLZXkubnVtYmVyT2ZLZXlzKTtcbiAgICB0aGlzLl9hbGxLZXlzLnNldCh0b2tlbiwgbmV3S2V5KTtcbiAgICByZXR1cm4gbmV3S2V5O1xuICB9XG5cbiAgZ2V0IG51bWJlck9mS2V5cygpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fYWxsS2V5cy5zaXplOyB9XG59XG5cbnZhciBfZ2xvYmFsS2V5UmVnaXN0cnkgPSBuZXcgS2V5UmVnaXN0cnkoKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
