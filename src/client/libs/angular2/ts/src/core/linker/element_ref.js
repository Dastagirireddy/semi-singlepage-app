System.register(['angular2/src/facade/exceptions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var exceptions_1;
    var ElementRef, ElementRef_;
    return {
        setters:[
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
            /**
             * Represents a location in a View that has an injection, change-detection and render context
             * associated with it.
             *
             * An `ElementRef` is created for each element in the Template that contains a Directive, Component
             * or data-binding.
             *
             * An `ElementRef` is backed by a render-specific element. In the browser, this is usually a DOM
             * element.
             */
            ElementRef = (function () {
                function ElementRef() {
                }
                Object.defineProperty(ElementRef.prototype, "nativeElement", {
                    /**
                     * The underlying native element or `null` if direct access to native elements is not supported
                     * (e.g. when the application runs in a web worker).
                     *
                     * <div class="callout is-critical">
                     *   <header>Use with caution</header>
                     *   <p>
                     *    Use this API as the last resort when direct access to DOM is needed. Use templating and
                     *    data-binding provided by Angular instead. Alternatively you take a look at {@link Renderer}
                     *    which provides API that can safely be used even when direct access to native elements is not
                     *    supported.
                     *   </p>
                     *   <p>
                     *    Relying on direct DOM access creates tight coupling between your application and rendering
                     *    layers which will make it impossible to separate the two and deploy your application into a
                     *    web worker.
                     *   </p>
                     * </div>
                     */
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                return ElementRef;
            }());
            exports_1("ElementRef", ElementRef);
            ElementRef_ = (function () {
                function ElementRef_(_appElement) {
                    this._appElement = _appElement;
                }
                Object.defineProperty(ElementRef_.prototype, "internalElement", {
                    get: function () { return this._appElement; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ElementRef_.prototype, "nativeElement", {
                    get: function () { return this._appElement.nativeElement; },
                    enumerable: true,
                    configurable: true
                });
                return ElementRef_;
            }());
            exports_1("ElementRef_", ElementRef_);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvbGlua2VyL2VsZW1lbnRfcmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O1lBR0E7Ozs7Ozs7OztlQVNHO1lBQ0g7Z0JBQUE7Z0JBcUJBLENBQUM7Z0JBREMsc0JBQUkscUNBQWE7b0JBbkJqQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VCQWtCRzt5QkFDSCxjQUEyQixNQUFNLENBQUMsMEJBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUN0RCxpQkFBQztZQUFELENBckJBLEFBcUJDLElBQUE7WUFyQkQsbUNBcUJDLENBQUE7WUFFRDtnQkFDRSxxQkFBb0IsV0FBdUI7b0JBQXZCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO2dCQUFHLENBQUM7Z0JBRS9DLHNCQUFJLHdDQUFlO3lCQUFuQixjQUFvQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFFOUQsc0JBQUksc0NBQWE7eUJBQWpCLGNBQXNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFDaEUsa0JBQUM7WUFBRCxDQU5BLEFBTUMsSUFBQTtZQU5ELHFDQU1DLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29yZS9saW5rZXIvZWxlbWVudF9yZWYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3VuaW1wbGVtZW50ZWR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge0FwcEVsZW1lbnR9IGZyb20gJy4vZWxlbWVudCc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGxvY2F0aW9uIGluIGEgVmlldyB0aGF0IGhhcyBhbiBpbmplY3Rpb24sIGNoYW5nZS1kZXRlY3Rpb24gYW5kIHJlbmRlciBjb250ZXh0XG4gKiBhc3NvY2lhdGVkIHdpdGggaXQuXG4gKlxuICogQW4gYEVsZW1lbnRSZWZgIGlzIGNyZWF0ZWQgZm9yIGVhY2ggZWxlbWVudCBpbiB0aGUgVGVtcGxhdGUgdGhhdCBjb250YWlucyBhIERpcmVjdGl2ZSwgQ29tcG9uZW50XG4gKiBvciBkYXRhLWJpbmRpbmcuXG4gKlxuICogQW4gYEVsZW1lbnRSZWZgIGlzIGJhY2tlZCBieSBhIHJlbmRlci1zcGVjaWZpYyBlbGVtZW50LiBJbiB0aGUgYnJvd3NlciwgdGhpcyBpcyB1c3VhbGx5IGEgRE9NXG4gKiBlbGVtZW50LlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRWxlbWVudFJlZiB7XG4gIC8qKlxuICAgKiBUaGUgdW5kZXJseWluZyBuYXRpdmUgZWxlbWVudCBvciBgbnVsbGAgaWYgZGlyZWN0IGFjY2VzcyB0byBuYXRpdmUgZWxlbWVudHMgaXMgbm90IHN1cHBvcnRlZFxuICAgKiAoZS5nLiB3aGVuIHRoZSBhcHBsaWNhdGlvbiBydW5zIGluIGEgd2ViIHdvcmtlcikuXG4gICAqXG4gICAqIDxkaXYgY2xhc3M9XCJjYWxsb3V0IGlzLWNyaXRpY2FsXCI+XG4gICAqICAgPGhlYWRlcj5Vc2Ugd2l0aCBjYXV0aW9uPC9oZWFkZXI+XG4gICAqICAgPHA+XG4gICAqICAgIFVzZSB0aGlzIEFQSSBhcyB0aGUgbGFzdCByZXNvcnQgd2hlbiBkaXJlY3QgYWNjZXNzIHRvIERPTSBpcyBuZWVkZWQuIFVzZSB0ZW1wbGF0aW5nIGFuZFxuICAgKiAgICBkYXRhLWJpbmRpbmcgcHJvdmlkZWQgYnkgQW5ndWxhciBpbnN0ZWFkLiBBbHRlcm5hdGl2ZWx5IHlvdSB0YWtlIGEgbG9vayBhdCB7QGxpbmsgUmVuZGVyZXJ9XG4gICAqICAgIHdoaWNoIHByb3ZpZGVzIEFQSSB0aGF0IGNhbiBzYWZlbHkgYmUgdXNlZCBldmVuIHdoZW4gZGlyZWN0IGFjY2VzcyB0byBuYXRpdmUgZWxlbWVudHMgaXMgbm90XG4gICAqICAgIHN1cHBvcnRlZC5cbiAgICogICA8L3A+XG4gICAqICAgPHA+XG4gICAqICAgIFJlbHlpbmcgb24gZGlyZWN0IERPTSBhY2Nlc3MgY3JlYXRlcyB0aWdodCBjb3VwbGluZyBiZXR3ZWVuIHlvdXIgYXBwbGljYXRpb24gYW5kIHJlbmRlcmluZ1xuICAgKiAgICBsYXllcnMgd2hpY2ggd2lsbCBtYWtlIGl0IGltcG9zc2libGUgdG8gc2VwYXJhdGUgdGhlIHR3byBhbmQgZGVwbG95IHlvdXIgYXBwbGljYXRpb24gaW50byBhXG4gICAqICAgIHdlYiB3b3JrZXIuXG4gICAqICAgPC9wPlxuICAgKiA8L2Rpdj5cbiAgICovXG4gIGdldCBuYXRpdmVFbGVtZW50KCk6IGFueSB7IHJldHVybiB1bmltcGxlbWVudGVkKCk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIEVsZW1lbnRSZWZfIGltcGxlbWVudHMgRWxlbWVudFJlZiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2FwcEVsZW1lbnQ6IEFwcEVsZW1lbnQpIHt9XG5cbiAgZ2V0IGludGVybmFsRWxlbWVudCgpOiBBcHBFbGVtZW50IHsgcmV0dXJuIHRoaXMuX2FwcEVsZW1lbnQ7IH1cblxuICBnZXQgbmF0aXZlRWxlbWVudCgpIHsgcmV0dXJuIHRoaXMuX2FwcEVsZW1lbnQubmF0aXZlRWxlbWVudDsgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
