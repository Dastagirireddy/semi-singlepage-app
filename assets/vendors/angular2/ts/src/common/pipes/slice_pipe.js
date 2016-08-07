System.register(['angular2/src/facade/lang', 'angular2/src/facade/collection', 'angular2/core', './invalid_pipe_argument_exception'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var lang_1, collection_1, core_1, invalid_pipe_argument_exception_1;
    var SlicePipe;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (invalid_pipe_argument_exception_1_1) {
                invalid_pipe_argument_exception_1 = invalid_pipe_argument_exception_1_1;
            }],
        execute: function() {
            /**
             * Creates a new List or String containing only a subset (slice) of the
             * elements.
             *
             * The starting index of the subset to return is specified by the `start` parameter.
             *
             * The ending index of the subset to return is specified by the optional `end` parameter.
             *
             * ### Usage
             *
             *     expression | slice:start[:end]
             *
             * All behavior is based on the expected behavior of the JavaScript API
             * Array.prototype.slice() and String.prototype.slice()
             *
             * Where the input expression is a [List] or [String], and `start` is:
             *
             * - **a positive integer**: return the item at _start_ index and all items after
             * in the list or string expression.
             * - **a negative integer**: return the item at _start_ index from the end and all items after
             * in the list or string expression.
             * - **`|start|` greater than the size of the expression**: return an empty list or string.
             * - **`|start|` negative greater than the size of the expression**: return entire list or
             * string expression.
             *
             * and where `end` is:
             *
             * - **omitted**: return all items until the end of the input
             * - **a positive integer**: return all items before _end_ index of the list or string
             * expression.
             * - **a negative integer**: return all items before _end_ index from the end of the list
             * or string expression.
             *
             * When operating on a [List], the returned list is always a copy even when all
             * the elements are being returned.
             *
             * ## List Example
             *
             * This `ngFor` example:
             *
             * {@example core/pipes/ts/slice_pipe/slice_pipe_example.ts region='SlicePipe_list'}
             *
             * produces the following:
             *
             *     <li>b</li>
             *     <li>c</li>
             *
             * ## String Examples
             *
             * {@example core/pipes/ts/slice_pipe/slice_pipe_example.ts region='SlicePipe_string'}
             */
            SlicePipe = (function () {
                function SlicePipe() {
                }
                SlicePipe.prototype.transform = function (value, start, end) {
                    if (end === void 0) { end = null; }
                    if (!this.supports(value)) {
                        throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(SlicePipe, value);
                    }
                    if (lang_1.isBlank(value))
                        return value;
                    if (lang_1.isString(value)) {
                        return lang_1.StringWrapper.slice(value, start, end);
                    }
                    return collection_1.ListWrapper.slice(value, start, end);
                };
                SlicePipe.prototype.supports = function (obj) { return lang_1.isString(obj) || lang_1.isArray(obj); };
                SlicePipe = __decorate([
                    core_1.Pipe({ name: 'slice', pure: false }),
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], SlicePipe);
                return SlicePipe;
            }());
            exports_1("SlicePipe", SlicePipe);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vcGlwZXMvc2xpY2VfcGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUtBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQWtERztZQUlIO2dCQUFBO2dCQWFBLENBQUM7Z0JBWkMsNkJBQVMsR0FBVCxVQUFVLEtBQVUsRUFBRSxLQUFhLEVBQUUsR0FBa0I7b0JBQWxCLG1CQUFrQixHQUFsQixVQUFrQjtvQkFDckQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUIsTUFBTSxJQUFJLDhEQUE0QixDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDM0QsQ0FBQztvQkFDRCxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztvQkFDakMsRUFBRSxDQUFDLENBQUMsZUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDcEIsTUFBTSxDQUFDLG9CQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ2hELENBQUM7b0JBQ0QsTUFBTSxDQUFDLHdCQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQzlDLENBQUM7Z0JBRU8sNEJBQVEsR0FBaEIsVUFBaUIsR0FBUSxJQUFhLE1BQU0sQ0FBQyxlQUFRLENBQUMsR0FBRyxDQUFDLElBQUksY0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFkL0U7b0JBQUMsV0FBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFDLENBQUM7b0JBQ2xDLGlCQUFVLEVBQUU7OzZCQUFBO2dCQWNiLGdCQUFDO1lBQUQsQ0FiQSxBQWFDLElBQUE7WUFiRCxpQ0FhQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vcGlwZXMvc2xpY2VfcGlwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNCbGFuaywgaXNTdHJpbmcsIGlzQXJyYXksIFN0cmluZ1dyYXBwZXIsIENPTlNUfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7SW5qZWN0YWJsZSwgUGlwZVRyYW5zZm9ybSwgV3JhcHBlZFZhbHVlLCBQaXBlfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7SW52YWxpZFBpcGVBcmd1bWVudEV4Y2VwdGlvbn0gZnJvbSAnLi9pbnZhbGlkX3BpcGVfYXJndW1lbnRfZXhjZXB0aW9uJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IExpc3Qgb3IgU3RyaW5nIGNvbnRhaW5pbmcgb25seSBhIHN1YnNldCAoc2xpY2UpIG9mIHRoZVxuICogZWxlbWVudHMuXG4gKlxuICogVGhlIHN0YXJ0aW5nIGluZGV4IG9mIHRoZSBzdWJzZXQgdG8gcmV0dXJuIGlzIHNwZWNpZmllZCBieSB0aGUgYHN0YXJ0YCBwYXJhbWV0ZXIuXG4gKlxuICogVGhlIGVuZGluZyBpbmRleCBvZiB0aGUgc3Vic2V0IHRvIHJldHVybiBpcyBzcGVjaWZpZWQgYnkgdGhlIG9wdGlvbmFsIGBlbmRgIHBhcmFtZXRlci5cbiAqXG4gKiAjIyMgVXNhZ2VcbiAqXG4gKiAgICAgZXhwcmVzc2lvbiB8IHNsaWNlOnN0YXJ0WzplbmRdXG4gKlxuICogQWxsIGJlaGF2aW9yIGlzIGJhc2VkIG9uIHRoZSBleHBlY3RlZCBiZWhhdmlvciBvZiB0aGUgSmF2YVNjcmlwdCBBUElcbiAqIEFycmF5LnByb3RvdHlwZS5zbGljZSgpIGFuZCBTdHJpbmcucHJvdG90eXBlLnNsaWNlKClcbiAqXG4gKiBXaGVyZSB0aGUgaW5wdXQgZXhwcmVzc2lvbiBpcyBhIFtMaXN0XSBvciBbU3RyaW5nXSwgYW5kIGBzdGFydGAgaXM6XG4gKlxuICogLSAqKmEgcG9zaXRpdmUgaW50ZWdlcioqOiByZXR1cm4gdGhlIGl0ZW0gYXQgX3N0YXJ0XyBpbmRleCBhbmQgYWxsIGl0ZW1zIGFmdGVyXG4gKiBpbiB0aGUgbGlzdCBvciBzdHJpbmcgZXhwcmVzc2lvbi5cbiAqIC0gKiphIG5lZ2F0aXZlIGludGVnZXIqKjogcmV0dXJuIHRoZSBpdGVtIGF0IF9zdGFydF8gaW5kZXggZnJvbSB0aGUgZW5kIGFuZCBhbGwgaXRlbXMgYWZ0ZXJcbiAqIGluIHRoZSBsaXN0IG9yIHN0cmluZyBleHByZXNzaW9uLlxuICogLSAqKmB8c3RhcnR8YCBncmVhdGVyIHRoYW4gdGhlIHNpemUgb2YgdGhlIGV4cHJlc3Npb24qKjogcmV0dXJuIGFuIGVtcHR5IGxpc3Qgb3Igc3RyaW5nLlxuICogLSAqKmB8c3RhcnR8YCBuZWdhdGl2ZSBncmVhdGVyIHRoYW4gdGhlIHNpemUgb2YgdGhlIGV4cHJlc3Npb24qKjogcmV0dXJuIGVudGlyZSBsaXN0IG9yXG4gKiBzdHJpbmcgZXhwcmVzc2lvbi5cbiAqXG4gKiBhbmQgd2hlcmUgYGVuZGAgaXM6XG4gKlxuICogLSAqKm9taXR0ZWQqKjogcmV0dXJuIGFsbCBpdGVtcyB1bnRpbCB0aGUgZW5kIG9mIHRoZSBpbnB1dFxuICogLSAqKmEgcG9zaXRpdmUgaW50ZWdlcioqOiByZXR1cm4gYWxsIGl0ZW1zIGJlZm9yZSBfZW5kXyBpbmRleCBvZiB0aGUgbGlzdCBvciBzdHJpbmdcbiAqIGV4cHJlc3Npb24uXG4gKiAtICoqYSBuZWdhdGl2ZSBpbnRlZ2VyKio6IHJldHVybiBhbGwgaXRlbXMgYmVmb3JlIF9lbmRfIGluZGV4IGZyb20gdGhlIGVuZCBvZiB0aGUgbGlzdFxuICogb3Igc3RyaW5nIGV4cHJlc3Npb24uXG4gKlxuICogV2hlbiBvcGVyYXRpbmcgb24gYSBbTGlzdF0sIHRoZSByZXR1cm5lZCBsaXN0IGlzIGFsd2F5cyBhIGNvcHkgZXZlbiB3aGVuIGFsbFxuICogdGhlIGVsZW1lbnRzIGFyZSBiZWluZyByZXR1cm5lZC5cbiAqXG4gKiAjIyBMaXN0IEV4YW1wbGVcbiAqXG4gKiBUaGlzIGBuZ0ZvcmAgZXhhbXBsZTpcbiAqXG4gKiB7QGV4YW1wbGUgY29yZS9waXBlcy90cy9zbGljZV9waXBlL3NsaWNlX3BpcGVfZXhhbXBsZS50cyByZWdpb249J1NsaWNlUGlwZV9saXN0J31cbiAqXG4gKiBwcm9kdWNlcyB0aGUgZm9sbG93aW5nOlxuICpcbiAqICAgICA8bGk+YjwvbGk+XG4gKiAgICAgPGxpPmM8L2xpPlxuICpcbiAqICMjIFN0cmluZyBFeGFtcGxlc1xuICpcbiAqIHtAZXhhbXBsZSBjb3JlL3BpcGVzL3RzL3NsaWNlX3BpcGUvc2xpY2VfcGlwZV9leGFtcGxlLnRzIHJlZ2lvbj0nU2xpY2VQaXBlX3N0cmluZyd9XG4gKi9cblxuQFBpcGUoe25hbWU6ICdzbGljZScsIHB1cmU6IGZhbHNlfSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTbGljZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyID0gbnVsbCk6IGFueSB7XG4gICAgaWYgKCF0aGlzLnN1cHBvcnRzKHZhbHVlKSkge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRQaXBlQXJndW1lbnRFeGNlcHRpb24oU2xpY2VQaXBlLCB2YWx1ZSk7XG4gICAgfVxuICAgIGlmIChpc0JsYW5rKHZhbHVlKSkgcmV0dXJuIHZhbHVlO1xuICAgIGlmIChpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBTdHJpbmdXcmFwcGVyLnNsaWNlKHZhbHVlLCBzdGFydCwgZW5kKTtcbiAgICB9XG4gICAgcmV0dXJuIExpc3RXcmFwcGVyLnNsaWNlKHZhbHVlLCBzdGFydCwgZW5kKTtcbiAgfVxuXG4gIHByaXZhdGUgc3VwcG9ydHMob2JqOiBhbnkpOiBib29sZWFuIHsgcmV0dXJuIGlzU3RyaW5nKG9iaikgfHwgaXNBcnJheShvYmopOyB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
