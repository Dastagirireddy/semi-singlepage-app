System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/collection', 'angular2/src/core/di'], function(exports_1, context_1) {
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
    var lang_1, exceptions_1, collection_1, di_1;
    var IterableDiffers;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            }],
        execute: function() {
            /**
             * A repository of different iterable diffing strategies used by NgFor, NgClass, and others.
             */
            IterableDiffers = (function () {
                function IterableDiffers(factories) {
                    this.factories = factories;
                }
                IterableDiffers.create = function (factories, parent) {
                    if (lang_1.isPresent(parent)) {
                        var copied = collection_1.ListWrapper.clone(parent.factories);
                        factories = factories.concat(copied);
                        return new IterableDiffers(factories);
                    }
                    else {
                        return new IterableDiffers(factories);
                    }
                };
                /**
                 * Takes an array of {@link IterableDifferFactory} and returns a provider used to extend the
                 * inherited {@link IterableDiffers} instance with the provided factories and return a new
                 * {@link IterableDiffers} instance.
                 *
                 * The following example shows how to extend an existing list of factories,
                       * which will only be applied to the injector for this component and its children.
                       * This step is all that's required to make a new {@link IterableDiffer} available.
                 *
                 * ### Example
                 *
                 * ```
                 * @Component({
                 *   viewProviders: [
                 *     IterableDiffers.extend([new ImmutableListDiffer()])
                 *   ]
                 * })
                 * ```
                 */
                IterableDiffers.extend = function (factories) {
                    return new di_1.Provider(IterableDiffers, {
                        useFactory: function (parent) {
                            if (lang_1.isBlank(parent)) {
                                // Typically would occur when calling IterableDiffers.extend inside of dependencies passed
                                // to
                                // bootstrap(), which would override default pipes instead of extending them.
                                throw new exceptions_1.BaseException('Cannot extend IterableDiffers without a parent injector');
                            }
                            return IterableDiffers.create(factories, parent);
                        },
                        // Dependency technically isn't optional, but we can provide a better error message this way.
                        deps: [[IterableDiffers, new di_1.SkipSelfMetadata(), new di_1.OptionalMetadata()]]
                    });
                };
                IterableDiffers.prototype.find = function (iterable) {
                    var factory = this.factories.find(function (f) { return f.supports(iterable); });
                    if (lang_1.isPresent(factory)) {
                        return factory;
                    }
                    else {
                        throw new exceptions_1.BaseException("Cannot find a differ supporting object '" + iterable + "' of type '" + lang_1.getTypeNameForDebugging(iterable) + "'");
                    }
                };
                IterableDiffers = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [Array])
                ], IterableDiffers);
                return IterableDiffers;
            }());
            exports_1("IterableDiffers", IterableDiffers);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vZGlmZmVycy9pdGVyYWJsZV9kaWZmZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBOEJBOztlQUVHO1lBRUg7Z0JBQ0UseUJBQW1CLFNBQWtDO29CQUFsQyxjQUFTLEdBQVQsU0FBUyxDQUF5QjtnQkFBRyxDQUFDO2dCQUVsRCxzQkFBTSxHQUFiLFVBQWMsU0FBa0MsRUFBRSxNQUF3QjtvQkFDeEUsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3RCLElBQUksTUFBTSxHQUFHLHdCQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDakQsU0FBUyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ3JDLE1BQU0sQ0FBQyxJQUFJLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDeEMsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixNQUFNLENBQUMsSUFBSSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3hDLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQWtCRztnQkFDSSxzQkFBTSxHQUFiLFVBQWMsU0FBa0M7b0JBQzlDLE1BQU0sQ0FBQyxJQUFJLGFBQVEsQ0FBQyxlQUFlLEVBQUU7d0JBQ25DLFVBQVUsRUFBRSxVQUFDLE1BQXVCOzRCQUNsQyxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUNwQiwwRkFBMEY7Z0NBQzFGLEtBQUs7Z0NBQ0wsNkVBQTZFO2dDQUM3RSxNQUFNLElBQUksMEJBQWEsQ0FBQyx5REFBeUQsQ0FBQyxDQUFDOzRCQUNyRixDQUFDOzRCQUNELE1BQU0sQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFDbkQsQ0FBQzt3QkFDRCw2RkFBNkY7d0JBQzdGLElBQUksRUFBRSxDQUFDLENBQUMsZUFBZSxFQUFFLElBQUkscUJBQWdCLEVBQUUsRUFBRSxJQUFJLHFCQUFnQixFQUFFLENBQUMsQ0FBQztxQkFDMUUsQ0FBQyxDQUFDO2dCQUNMLENBQUM7Z0JBRUQsOEJBQUksR0FBSixVQUFLLFFBQWE7b0JBQ2hCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDO29CQUM3RCxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdkIsTUFBTSxDQUFDLE9BQU8sQ0FBQztvQkFDakIsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixNQUFNLElBQUksMEJBQWEsQ0FDbkIsNkNBQTJDLFFBQVEsbUJBQWMsOEJBQXVCLENBQUMsUUFBUSxDQUFDLE1BQUcsQ0FBQyxDQUFDO29CQUM3RyxDQUFDO2dCQUNILENBQUM7Z0JBekRIO29CQUFDLFlBQUssRUFBRTs7bUNBQUE7Z0JBMERSLHNCQUFDO1lBQUQsQ0F6REEsQUF5REMsSUFBQTtZQXpERCw2Q0F5REMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2RpZmZlcnMvaXRlcmFibGVfZGlmZmVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNCbGFuaywgaXNQcmVzZW50LCBDT05TVCwgZ2V0VHlwZU5hbWVGb3JEZWJ1Z2dpbmd9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge0xpc3RXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnLi4vY2hhbmdlX2RldGVjdG9yX3JlZic7XG5pbXBvcnQge1Byb3ZpZGVyLCBTa2lwU2VsZk1ldGFkYXRhLCBPcHRpb25hbE1ldGFkYXRhLCBJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5cbi8qKlxuICogQSBzdHJhdGVneSBmb3IgdHJhY2tpbmcgY2hhbmdlcyBvdmVyIHRpbWUgdG8gYW4gaXRlcmFibGUuIFVzZWQgZm9yIHtAbGluayBOZ0Zvcn0gdG9cbiAqIHJlc3BvbmQgdG8gY2hhbmdlcyBpbiBhbiBpdGVyYWJsZSBieSBlZmZlY3RpbmcgZXF1aXZhbGVudCBjaGFuZ2VzIGluIHRoZSBET00uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSXRlcmFibGVEaWZmZXIge1xuICBkaWZmKG9iamVjdDogYW55KTogYW55O1xuICBvbkRlc3Ryb3koKTtcbn1cblxuLyoqXG4gICogQW4gb3B0aW9uYWwgZnVuY3Rpb24gcGFzc2VkIGludG8ge0BsaW5rIE5nRm9yfSB0aGF0IGRlZmluZXMgaG93IHRvIHRyYWNrXG4gICogaXRlbXMgaW4gYW4gaXRlcmFibGUgKGUuZy4gYnkgaW5kZXggb3IgaWQpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVHJhY2tCeUZuIHsgKGluZGV4OiBudW1iZXIsIGl0ZW06IGFueSk6IGFueTsgfVxuXG5cbi8qKlxuICogUHJvdmlkZXMgYSBmYWN0b3J5IGZvciB7QGxpbmsgSXRlcmFibGVEaWZmZXJ9LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEl0ZXJhYmxlRGlmZmVyRmFjdG9yeSB7XG4gIHN1cHBvcnRzKG9iamVjdHM6IGFueSk6IGJvb2xlYW47XG4gIGNyZWF0ZShjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHRyYWNrQnlGbj86IFRyYWNrQnlGbik6IEl0ZXJhYmxlRGlmZmVyO1xufVxuXG4vKipcbiAqIEEgcmVwb3NpdG9yeSBvZiBkaWZmZXJlbnQgaXRlcmFibGUgZGlmZmluZyBzdHJhdGVnaWVzIHVzZWQgYnkgTmdGb3IsIE5nQ2xhc3MsIGFuZCBvdGhlcnMuXG4gKi9cbkBDT05TVCgpXG5leHBvcnQgY2xhc3MgSXRlcmFibGVEaWZmZXJzIHtcbiAgY29uc3RydWN0b3IocHVibGljIGZhY3RvcmllczogSXRlcmFibGVEaWZmZXJGYWN0b3J5W10pIHt9XG5cbiAgc3RhdGljIGNyZWF0ZShmYWN0b3JpZXM6IEl0ZXJhYmxlRGlmZmVyRmFjdG9yeVtdLCBwYXJlbnQ/OiBJdGVyYWJsZURpZmZlcnMpOiBJdGVyYWJsZURpZmZlcnMge1xuICAgIGlmIChpc1ByZXNlbnQocGFyZW50KSkge1xuICAgICAgdmFyIGNvcGllZCA9IExpc3RXcmFwcGVyLmNsb25lKHBhcmVudC5mYWN0b3JpZXMpO1xuICAgICAgZmFjdG9yaWVzID0gZmFjdG9yaWVzLmNvbmNhdChjb3BpZWQpO1xuICAgICAgcmV0dXJuIG5ldyBJdGVyYWJsZURpZmZlcnMoZmFjdG9yaWVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBJdGVyYWJsZURpZmZlcnMoZmFjdG9yaWVzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGFrZXMgYW4gYXJyYXkgb2Yge0BsaW5rIEl0ZXJhYmxlRGlmZmVyRmFjdG9yeX0gYW5kIHJldHVybnMgYSBwcm92aWRlciB1c2VkIHRvIGV4dGVuZCB0aGVcbiAgICogaW5oZXJpdGVkIHtAbGluayBJdGVyYWJsZURpZmZlcnN9IGluc3RhbmNlIHdpdGggdGhlIHByb3ZpZGVkIGZhY3RvcmllcyBhbmQgcmV0dXJuIGEgbmV3XG4gICAqIHtAbGluayBJdGVyYWJsZURpZmZlcnN9IGluc3RhbmNlLlxuICAgKlxuICAgKiBUaGUgZm9sbG93aW5nIGV4YW1wbGUgc2hvd3MgaG93IHRvIGV4dGVuZCBhbiBleGlzdGluZyBsaXN0IG9mIGZhY3RvcmllcyxcbiAgICAgICAgICogd2hpY2ggd2lsbCBvbmx5IGJlIGFwcGxpZWQgdG8gdGhlIGluamVjdG9yIGZvciB0aGlzIGNvbXBvbmVudCBhbmQgaXRzIGNoaWxkcmVuLlxuICAgICAgICAgKiBUaGlzIHN0ZXAgaXMgYWxsIHRoYXQncyByZXF1aXJlZCB0byBtYWtlIGEgbmV3IHtAbGluayBJdGVyYWJsZURpZmZlcn0gYXZhaWxhYmxlLlxuICAgKlxuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiBgYGBcbiAgICogQENvbXBvbmVudCh7XG4gICAqICAgdmlld1Byb3ZpZGVyczogW1xuICAgKiAgICAgSXRlcmFibGVEaWZmZXJzLmV4dGVuZChbbmV3IEltbXV0YWJsZUxpc3REaWZmZXIoKV0pXG4gICAqICAgXVxuICAgKiB9KVxuICAgKiBgYGBcbiAgICovXG4gIHN0YXRpYyBleHRlbmQoZmFjdG9yaWVzOiBJdGVyYWJsZURpZmZlckZhY3RvcnlbXSk6IFByb3ZpZGVyIHtcbiAgICByZXR1cm4gbmV3IFByb3ZpZGVyKEl0ZXJhYmxlRGlmZmVycywge1xuICAgICAgdXNlRmFjdG9yeTogKHBhcmVudDogSXRlcmFibGVEaWZmZXJzKSA9PiB7XG4gICAgICAgIGlmIChpc0JsYW5rKHBhcmVudCkpIHtcbiAgICAgICAgICAvLyBUeXBpY2FsbHkgd291bGQgb2NjdXIgd2hlbiBjYWxsaW5nIEl0ZXJhYmxlRGlmZmVycy5leHRlbmQgaW5zaWRlIG9mIGRlcGVuZGVuY2llcyBwYXNzZWRcbiAgICAgICAgICAvLyB0b1xuICAgICAgICAgIC8vIGJvb3RzdHJhcCgpLCB3aGljaCB3b3VsZCBvdmVycmlkZSBkZWZhdWx0IHBpcGVzIGluc3RlYWQgb2YgZXh0ZW5kaW5nIHRoZW0uXG4gICAgICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oJ0Nhbm5vdCBleHRlbmQgSXRlcmFibGVEaWZmZXJzIHdpdGhvdXQgYSBwYXJlbnQgaW5qZWN0b3InKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gSXRlcmFibGVEaWZmZXJzLmNyZWF0ZShmYWN0b3JpZXMsIHBhcmVudCk7XG4gICAgICB9LFxuICAgICAgLy8gRGVwZW5kZW5jeSB0ZWNobmljYWxseSBpc24ndCBvcHRpb25hbCwgYnV0IHdlIGNhbiBwcm92aWRlIGEgYmV0dGVyIGVycm9yIG1lc3NhZ2UgdGhpcyB3YXkuXG4gICAgICBkZXBzOiBbW0l0ZXJhYmxlRGlmZmVycywgbmV3IFNraXBTZWxmTWV0YWRhdGEoKSwgbmV3IE9wdGlvbmFsTWV0YWRhdGEoKV1dXG4gICAgfSk7XG4gIH1cblxuICBmaW5kKGl0ZXJhYmxlOiBhbnkpOiBJdGVyYWJsZURpZmZlckZhY3Rvcnkge1xuICAgIHZhciBmYWN0b3J5ID0gdGhpcy5mYWN0b3JpZXMuZmluZChmID0+IGYuc3VwcG9ydHMoaXRlcmFibGUpKTtcbiAgICBpZiAoaXNQcmVzZW50KGZhY3RvcnkpKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgICAgYENhbm5vdCBmaW5kIGEgZGlmZmVyIHN1cHBvcnRpbmcgb2JqZWN0ICcke2l0ZXJhYmxlfScgb2YgdHlwZSAnJHtnZXRUeXBlTmFtZUZvckRlYnVnZ2luZyhpdGVyYWJsZSl9J2ApO1xuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
