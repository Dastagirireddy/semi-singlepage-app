System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var PlatformLocation;
    return {
        setters:[],
        execute: function() {
            /**
             * This class should not be used directly by an application developer. Instead, use
             * {@link Location}.
             *
             * `PlatformLocation` encapsulates all calls to DOM apis, which allows the Router to be platform
             * agnostic.
             * This means that we can have different implementation of `PlatformLocation` for the different
             * platforms
             * that angular supports. For example, the default `PlatformLocation` is {@link
             * BrowserPlatformLocation},
             * however when you run your app in a WebWorker you use {@link WebWorkerPlatformLocation}.
             *
             * The `PlatformLocation` class is used directly by all implementations of {@link LocationStrategy}
             * when
             * they need to interact with the DOM apis like pushState, popState, etc...
             *
             * {@link LocationStrategy} in turn is used by the {@link Location} service which is used directly
             * by
             * the {@link Router} in order to navigate between routes. Since all interactions between {@link
             * Router} /
             * {@link Location} / {@link LocationStrategy} and DOM apis flow through the `PlatformLocation`
             * class
             * they are all platform independent.
             */
            PlatformLocation = (function () {
                function PlatformLocation() {
                }
                Object.defineProperty(PlatformLocation.prototype, "pathname", {
                    /* abstract */ get: function () { return null; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PlatformLocation.prototype, "search", {
                    /* abstract */ get: function () { return null; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PlatformLocation.prototype, "hash", {
                    /* abstract */ get: function () { return null; },
                    enumerable: true,
                    configurable: true
                });
                return PlatformLocation;
            }());
            exports_1("PlatformLocation", PlatformLocation);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3JvdXRlci9sb2NhdGlvbi9wbGF0Zm9ybV9sb2NhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O1lBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBdUJHO1lBQ0g7Z0JBQUE7Z0JBZ0JBLENBQUM7Z0JBWGdCLHNCQUFJLHNDQUFRO29CQUEzQixjQUFjLE1BQUMsY0FBeUIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFDdkMsc0JBQUksb0NBQU07b0JBQXpCLGNBQWMsTUFBQyxjQUF1QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUNyQyxzQkFBSSxrQ0FBSTtvQkFBdkIsY0FBYyxNQUFDLGNBQXFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBU3BELHVCQUFDO1lBQUQsQ0FoQkEsQUFnQkMsSUFBQTtZQWhCRCwrQ0FnQkMsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9yb3V0ZXIvbG9jYXRpb24vcGxhdGZvcm1fbG9jYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRoaXMgY2xhc3Mgc2hvdWxkIG5vdCBiZSB1c2VkIGRpcmVjdGx5IGJ5IGFuIGFwcGxpY2F0aW9uIGRldmVsb3Blci4gSW5zdGVhZCwgdXNlXG4gKiB7QGxpbmsgTG9jYXRpb259LlxuICpcbiAqIGBQbGF0Zm9ybUxvY2F0aW9uYCBlbmNhcHN1bGF0ZXMgYWxsIGNhbGxzIHRvIERPTSBhcGlzLCB3aGljaCBhbGxvd3MgdGhlIFJvdXRlciB0byBiZSBwbGF0Zm9ybVxuICogYWdub3N0aWMuXG4gKiBUaGlzIG1lYW5zIHRoYXQgd2UgY2FuIGhhdmUgZGlmZmVyZW50IGltcGxlbWVudGF0aW9uIG9mIGBQbGF0Zm9ybUxvY2F0aW9uYCBmb3IgdGhlIGRpZmZlcmVudFxuICogcGxhdGZvcm1zXG4gKiB0aGF0IGFuZ3VsYXIgc3VwcG9ydHMuIEZvciBleGFtcGxlLCB0aGUgZGVmYXVsdCBgUGxhdGZvcm1Mb2NhdGlvbmAgaXMge0BsaW5rXG4gKiBCcm93c2VyUGxhdGZvcm1Mb2NhdGlvbn0sXG4gKiBob3dldmVyIHdoZW4geW91IHJ1biB5b3VyIGFwcCBpbiBhIFdlYldvcmtlciB5b3UgdXNlIHtAbGluayBXZWJXb3JrZXJQbGF0Zm9ybUxvY2F0aW9ufS5cbiAqXG4gKiBUaGUgYFBsYXRmb3JtTG9jYXRpb25gIGNsYXNzIGlzIHVzZWQgZGlyZWN0bHkgYnkgYWxsIGltcGxlbWVudGF0aW9ucyBvZiB7QGxpbmsgTG9jYXRpb25TdHJhdGVneX1cbiAqIHdoZW5cbiAqIHRoZXkgbmVlZCB0byBpbnRlcmFjdCB3aXRoIHRoZSBET00gYXBpcyBsaWtlIHB1c2hTdGF0ZSwgcG9wU3RhdGUsIGV0Yy4uLlxuICpcbiAqIHtAbGluayBMb2NhdGlvblN0cmF0ZWd5fSBpbiB0dXJuIGlzIHVzZWQgYnkgdGhlIHtAbGluayBMb2NhdGlvbn0gc2VydmljZSB3aGljaCBpcyB1c2VkIGRpcmVjdGx5XG4gKiBieVxuICogdGhlIHtAbGluayBSb3V0ZXJ9IGluIG9yZGVyIHRvIG5hdmlnYXRlIGJldHdlZW4gcm91dGVzLiBTaW5jZSBhbGwgaW50ZXJhY3Rpb25zIGJldHdlZW4ge0BsaW5rXG4gKiBSb3V0ZXJ9IC9cbiAqIHtAbGluayBMb2NhdGlvbn0gLyB7QGxpbmsgTG9jYXRpb25TdHJhdGVneX0gYW5kIERPTSBhcGlzIGZsb3cgdGhyb3VnaCB0aGUgYFBsYXRmb3JtTG9jYXRpb25gXG4gKiBjbGFzc1xuICogdGhleSBhcmUgYWxsIHBsYXRmb3JtIGluZGVwZW5kZW50LlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGxhdGZvcm1Mb2NhdGlvbiB7XG4gIGFic3RyYWN0IGdldEJhc2VIcmVmRnJvbURPTSgpOiBzdHJpbmc7XG4gIGFic3RyYWN0IG9uUG9wU3RhdGUoZm46IFVybENoYW5nZUxpc3RlbmVyKTogdm9pZDtcbiAgYWJzdHJhY3Qgb25IYXNoQ2hhbmdlKGZuOiBVcmxDaGFuZ2VMaXN0ZW5lcik6IHZvaWQ7XG5cbiAgLyogYWJzdHJhY3QgKi8gZ2V0IHBhdGhuYW1lKCk6IHN0cmluZyB7IHJldHVybiBudWxsOyB9XG4gIC8qIGFic3RyYWN0ICovIGdldCBzZWFyY2goKTogc3RyaW5nIHsgcmV0dXJuIG51bGw7IH1cbiAgLyogYWJzdHJhY3QgKi8gZ2V0IGhhc2goKTogc3RyaW5nIHsgcmV0dXJuIG51bGw7IH1cblxuICBhYnN0cmFjdCByZXBsYWNlU3RhdGUoc3RhdGU6IGFueSwgdGl0bGU6IHN0cmluZywgdXJsOiBzdHJpbmcpOiB2b2lkO1xuXG4gIGFic3RyYWN0IHB1c2hTdGF0ZShzdGF0ZTogYW55LCB0aXRsZTogc3RyaW5nLCB1cmw6IHN0cmluZyk6IHZvaWQ7XG5cbiAgYWJzdHJhY3QgZm9yd2FyZCgpOiB2b2lkO1xuXG4gIGFic3RyYWN0IGJhY2soKTogdm9pZDtcbn1cblxuLyoqXG4gKiBBIHNlcmlhbGl6YWJsZSB2ZXJzaW9uIG9mIHRoZSBldmVudCBmcm9tIG9uUG9wU3RhdGUgb3Igb25IYXNoQ2hhbmdlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVXJsQ2hhbmdlRXZlbnQgeyB0eXBlOiBzdHJpbmc7IH1cblxuZXhwb3J0IGludGVyZmFjZSBVcmxDaGFuZ2VMaXN0ZW5lciB7IChlOiBVcmxDaGFuZ2VFdmVudCk6IGFueTsgfVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
