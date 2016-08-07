System.register(['angular2/src/facade/lang', 'angular2/src/facade/collection'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, collection_1;
    var uninitialized, WrappedValue, ValueUnwrapper, SimpleChange;
    function devModeEqual(a, b) {
        if (collection_1.isListLikeIterable(a) && collection_1.isListLikeIterable(b)) {
            return collection_1.areIterablesEqual(a, b, devModeEqual);
        }
        else if (!collection_1.isListLikeIterable(a) && !lang_1.isPrimitive(a) && !collection_1.isListLikeIterable(b) &&
            !lang_1.isPrimitive(b)) {
            return true;
        }
        else {
            return lang_1.looseIdentical(a, b);
        }
    }
    exports_1("devModeEqual", devModeEqual);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
                exports_1({
                    "looseIdentical": lang_1_1["looseIdentical"]
                });
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            }],
        execute: function() {
            exports_1("uninitialized", uninitialized = lang_1.CONST_EXPR(new Object()));
            /**
             * Indicates that the result of a {@link PipeMetadata} transformation has changed even though the
             * reference
             * has not changed.
             *
             * The wrapped value will be unwrapped by change detection, and the unwrapped value will be stored.
             *
             * Example:
             *
             * ```
             * if (this._latestValue === this._latestReturnedValue) {
             *    return this._latestReturnedValue;
             *  } else {
             *    this._latestReturnedValue = this._latestValue;
             *    return WrappedValue.wrap(this._latestValue); // this will force update
             *  }
             * ```
             */
            WrappedValue = (function () {
                function WrappedValue(wrapped) {
                    this.wrapped = wrapped;
                }
                WrappedValue.wrap = function (value) { return new WrappedValue(value); };
                return WrappedValue;
            }());
            exports_1("WrappedValue", WrappedValue);
            /**
             * Helper class for unwrapping WrappedValue s
             */
            ValueUnwrapper = (function () {
                function ValueUnwrapper() {
                    this.hasWrappedValue = false;
                }
                ValueUnwrapper.prototype.unwrap = function (value) {
                    if (value instanceof WrappedValue) {
                        this.hasWrappedValue = true;
                        return value.wrapped;
                    }
                    return value;
                };
                ValueUnwrapper.prototype.reset = function () { this.hasWrappedValue = false; };
                return ValueUnwrapper;
            }());
            exports_1("ValueUnwrapper", ValueUnwrapper);
            /**
             * Represents a basic change from a previous to a new value.
             */
            SimpleChange = (function () {
                function SimpleChange(previousValue, currentValue) {
                    this.previousValue = previousValue;
                    this.currentValue = currentValue;
                }
                /**
                 * Check whether the new value is the first value assigned.
                 */
                SimpleChange.prototype.isFirstChange = function () { return this.previousValue === uninitialized; };
                return SimpleChange;
            }());
            exports_1("SimpleChange", SimpleChange);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdGlvbl91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFRVyxhQUFhO0lBRXhCLHNCQUE2QixDQUFNLEVBQUUsQ0FBTTtRQUN6QyxFQUFFLENBQUMsQ0FBQywrQkFBa0IsQ0FBQyxDQUFDLENBQUMsSUFBSSwrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkQsTUFBTSxDQUFDLDhCQUFpQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFFL0MsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLCtCQUFrQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLCtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUNuRSxDQUFDLGtCQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFFZCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMscUJBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDOUIsQ0FBQztJQUNILENBQUM7SUFYRCx1Q0FXQyxDQUFBOzs7Ozs7Ozs7Ozs7O1lBYlUsMkJBQUEsYUFBYSxHQUFXLGlCQUFVLENBQVMsSUFBSSxNQUFNLEVBQUUsQ0FBQyxDQUFBLENBQUM7WUFlcEU7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBaUJHO1lBQ0g7Z0JBQ0Usc0JBQW1CLE9BQVk7b0JBQVosWUFBTyxHQUFQLE9BQU8sQ0FBSztnQkFBRyxDQUFDO2dCQUU1QixpQkFBSSxHQUFYLFVBQVksS0FBVSxJQUFrQixNQUFNLENBQUMsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzRSxtQkFBQztZQUFELENBSkEsQUFJQyxJQUFBO1lBSkQsdUNBSUMsQ0FBQTtZQUVEOztlQUVHO1lBQ0g7Z0JBQUE7b0JBQ1Msb0JBQWUsR0FBRyxLQUFLLENBQUM7Z0JBV2pDLENBQUM7Z0JBVEMsK0JBQU0sR0FBTixVQUFPLEtBQVU7b0JBQ2YsRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLFlBQVksQ0FBQyxDQUFDLENBQUM7d0JBQ2xDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO3dCQUM1QixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztvQkFDdkIsQ0FBQztvQkFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNmLENBQUM7Z0JBRUQsOEJBQUssR0FBTCxjQUFVLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDM0MscUJBQUM7WUFBRCxDQVpBLEFBWUMsSUFBQTtZQVpELDJDQVlDLENBQUE7WUFFRDs7ZUFFRztZQUNIO2dCQUNFLHNCQUFtQixhQUFrQixFQUFTLFlBQWlCO29CQUE1QyxrQkFBYSxHQUFiLGFBQWEsQ0FBSztvQkFBUyxpQkFBWSxHQUFaLFlBQVksQ0FBSztnQkFBRyxDQUFDO2dCQUVuRTs7bUJBRUc7Z0JBQ0gsb0NBQWEsR0FBYixjQUEyQixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUMzRSxtQkFBQztZQUFELENBUEEsQUFPQyxJQUFBO1lBUEQsdUNBT0MsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2NoYW5nZV9kZXRlY3Rpb25fdXRpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q09OU1RfRVhQUiwgaXNCbGFuaywgbG9vc2VJZGVudGljYWwsIGlzUHJpbWl0aXZlfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtcbiAgU3RyaW5nTWFwV3JhcHBlcixcbiAgaXNMaXN0TGlrZUl0ZXJhYmxlLFxuICBhcmVJdGVyYWJsZXNFcXVhbFxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuXG5leHBvcnQge2xvb3NlSWRlbnRpY2FsfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuZXhwb3J0IHZhciB1bmluaXRpYWxpemVkOiBPYmplY3QgPSBDT05TVF9FWFBSPE9iamVjdD4obmV3IE9iamVjdCgpKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRldk1vZGVFcXVhbChhOiBhbnksIGI6IGFueSk6IGJvb2xlYW4ge1xuICBpZiAoaXNMaXN0TGlrZUl0ZXJhYmxlKGEpICYmIGlzTGlzdExpa2VJdGVyYWJsZShiKSkge1xuICAgIHJldHVybiBhcmVJdGVyYWJsZXNFcXVhbChhLCBiLCBkZXZNb2RlRXF1YWwpO1xuXG4gIH0gZWxzZSBpZiAoIWlzTGlzdExpa2VJdGVyYWJsZShhKSAmJiAhaXNQcmltaXRpdmUoYSkgJiYgIWlzTGlzdExpa2VJdGVyYWJsZShiKSAmJlxuICAgICAgICAgICAgICFpc1ByaW1pdGl2ZShiKSkge1xuICAgIHJldHVybiB0cnVlO1xuXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxvb3NlSWRlbnRpY2FsKGEsIGIpO1xuICB9XG59XG5cbi8qKlxuICogSW5kaWNhdGVzIHRoYXQgdGhlIHJlc3VsdCBvZiBhIHtAbGluayBQaXBlTWV0YWRhdGF9IHRyYW5zZm9ybWF0aW9uIGhhcyBjaGFuZ2VkIGV2ZW4gdGhvdWdoIHRoZVxuICogcmVmZXJlbmNlXG4gKiBoYXMgbm90IGNoYW5nZWQuXG4gKlxuICogVGhlIHdyYXBwZWQgdmFsdWUgd2lsbCBiZSB1bndyYXBwZWQgYnkgY2hhbmdlIGRldGVjdGlvbiwgYW5kIHRoZSB1bndyYXBwZWQgdmFsdWUgd2lsbCBiZSBzdG9yZWQuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBcbiAqIGlmICh0aGlzLl9sYXRlc3RWYWx1ZSA9PT0gdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZSkge1xuICogICAgcmV0dXJuIHRoaXMuX2xhdGVzdFJldHVybmVkVmFsdWU7XG4gKiAgfSBlbHNlIHtcbiAqICAgIHRoaXMuX2xhdGVzdFJldHVybmVkVmFsdWUgPSB0aGlzLl9sYXRlc3RWYWx1ZTtcbiAqICAgIHJldHVybiBXcmFwcGVkVmFsdWUud3JhcCh0aGlzLl9sYXRlc3RWYWx1ZSk7IC8vIHRoaXMgd2lsbCBmb3JjZSB1cGRhdGVcbiAqICB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNsYXNzIFdyYXBwZWRWYWx1ZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB3cmFwcGVkOiBhbnkpIHt9XG5cbiAgc3RhdGljIHdyYXAodmFsdWU6IGFueSk6IFdyYXBwZWRWYWx1ZSB7IHJldHVybiBuZXcgV3JhcHBlZFZhbHVlKHZhbHVlKTsgfVxufVxuXG4vKipcbiAqIEhlbHBlciBjbGFzcyBmb3IgdW53cmFwcGluZyBXcmFwcGVkVmFsdWUgc1xuICovXG5leHBvcnQgY2xhc3MgVmFsdWVVbndyYXBwZXIge1xuICBwdWJsaWMgaGFzV3JhcHBlZFZhbHVlID0gZmFsc2U7XG5cbiAgdW53cmFwKHZhbHVlOiBhbnkpOiBhbnkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFdyYXBwZWRWYWx1ZSkge1xuICAgICAgdGhpcy5oYXNXcmFwcGVkVmFsdWUgPSB0cnVlO1xuICAgICAgcmV0dXJuIHZhbHVlLndyYXBwZWQ7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJlc2V0KCkgeyB0aGlzLmhhc1dyYXBwZWRWYWx1ZSA9IGZhbHNlOyB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGJhc2ljIGNoYW5nZSBmcm9tIGEgcHJldmlvdXMgdG8gYSBuZXcgdmFsdWUuXG4gKi9cbmV4cG9ydCBjbGFzcyBTaW1wbGVDaGFuZ2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJldmlvdXNWYWx1ZTogYW55LCBwdWJsaWMgY3VycmVudFZhbHVlOiBhbnkpIHt9XG5cbiAgLyoqXG4gICAqIENoZWNrIHdoZXRoZXIgdGhlIG5ldyB2YWx1ZSBpcyB0aGUgZmlyc3QgdmFsdWUgYXNzaWduZWQuXG4gICAqL1xuICBpc0ZpcnN0Q2hhbmdlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5wcmV2aW91c1ZhbHVlID09PSB1bmluaXRpYWxpemVkOyB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
