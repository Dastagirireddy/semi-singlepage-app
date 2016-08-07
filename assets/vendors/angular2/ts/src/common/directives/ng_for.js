System.register(['angular2/core', 'angular2/src/facade/lang', "../../facade/exceptions"], function(exports_1, context_1) {
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
    var core_1, lang_1, exceptions_1;
    var NgFor, RecordViewTuple;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
            /**
             * The `NgFor` directive instantiates a template once per item from an iterable. The context for
             * each instantiated template inherits from the outer context with the given loop variable set
             * to the current item from the iterable.
             *
             * ### Local Variables
             *
             * `NgFor` provides several exported values that can be aliased to local variables:
             *
             * * `index` will be set to the current loop iteration for each template context.
             * * `first` will be set to a boolean value indicating whether the item is the first one in the
             *   iteration.
             * * `last` will be set to a boolean value indicating whether the item is the last one in the
             *   iteration.
             * * `even` will be set to a boolean value indicating whether this item has an even index.
             * * `odd` will be set to a boolean value indicating whether this item has an odd index.
             *
             * ### Change Propagation
             *
             * When the contents of the iterator changes, `NgFor` makes the corresponding changes to the DOM:
             *
             * * When an item is added, a new instance of the template is added to the DOM.
             * * When an item is removed, its template instance is removed from the DOM.
             * * When items are reordered, their respective templates are reordered in the DOM.
             * * Otherwise, the DOM element for that item will remain the same.
             *
             * Angular uses object identity to track insertions and deletions within the iterator and reproduce
             * those changes in the DOM. This has important implications for animations and any stateful
             * controls
             * (such as `<input>` elements which accept user input) that are present. Inserted rows can be
             * animated in, deleted rows can be animated out, and unchanged rows retain any unsaved state such
             * as user input.
             *
             * It is possible for the identities of elements in the iterator to change while the data does not.
             * This can happen, for example, if the iterator produced from an RPC to the server, and that
             * RPC is re-run. Even if the data hasn't changed, the second response will produce objects with
             * different identities, and Angular will tear down the entire DOM and rebuild it (as if all old
             * elements were deleted and all new elements inserted). This is an expensive operation and should
             * be avoided if possible.
             *
             * ### Syntax
             *
             * - `<li *ngFor="let item of items; #i = index">...</li>`
             * - `<li template="ngFor #item of items; #i = index">...</li>`
             * - `<template ngFor #item [ngForOf]="items" #i="index"><li>...</li></template>`
             *
             * ### Example
             *
             * See a [live demo](http://plnkr.co/edit/KVuXxDp0qinGDyo307QW?p=preview) for a more detailed
             * example.
             */
            NgFor = (function () {
                function NgFor(_viewContainer, _templateRef, _iterableDiffers, _cdr) {
                    this._viewContainer = _viewContainer;
                    this._templateRef = _templateRef;
                    this._iterableDiffers = _iterableDiffers;
                    this._cdr = _cdr;
                }
                Object.defineProperty(NgFor.prototype, "ngForOf", {
                    set: function (value) {
                        this._ngForOf = value;
                        if (lang_1.isBlank(this._differ) && lang_1.isPresent(value)) {
                            try {
                                this._differ = this._iterableDiffers.find(value).create(this._cdr, this._ngForTrackBy);
                            }
                            catch (e) {
                                throw new exceptions_1.BaseException("Cannot find a differ supporting object '" + value + "' of type '" + lang_1.getTypeNameForDebugging(value) + "'. NgFor only supports binding to Iterables such as Arrays.");
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgFor.prototype, "ngForTemplate", {
                    set: function (value) {
                        if (lang_1.isPresent(value)) {
                            this._templateRef = value;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgFor.prototype, "ngForTrackBy", {
                    set: function (value) { this._ngForTrackBy = value; },
                    enumerable: true,
                    configurable: true
                });
                NgFor.prototype.ngDoCheck = function () {
                    if (lang_1.isPresent(this._differ)) {
                        var changes = this._differ.diff(this._ngForOf);
                        if (lang_1.isPresent(changes))
                            this._applyChanges(changes);
                    }
                };
                NgFor.prototype._applyChanges = function (changes) {
                    var _this = this;
                    // TODO(rado): check if change detection can produce a change record that is
                    // easier to consume than current.
                    var recordViewTuples = [];
                    changes.forEachRemovedItem(function (removedRecord) {
                        return recordViewTuples.push(new RecordViewTuple(removedRecord, null));
                    });
                    changes.forEachMovedItem(function (movedRecord) {
                        return recordViewTuples.push(new RecordViewTuple(movedRecord, null));
                    });
                    var insertTuples = this._bulkRemove(recordViewTuples);
                    changes.forEachAddedItem(function (addedRecord) {
                        return insertTuples.push(new RecordViewTuple(addedRecord, null));
                    });
                    this._bulkInsert(insertTuples);
                    for (var i = 0; i < insertTuples.length; i++) {
                        this._perViewChange(insertTuples[i].view, insertTuples[i].record);
                    }
                    for (var i = 0, ilen = this._viewContainer.length; i < ilen; i++) {
                        var viewRef = this._viewContainer.get(i);
                        viewRef.setLocal('first', i === 0);
                        viewRef.setLocal('last', i === ilen - 1);
                    }
                    changes.forEachIdentityChange(function (record) {
                        var viewRef = _this._viewContainer.get(record.currentIndex);
                        viewRef.setLocal('\$implicit', record.item);
                    });
                };
                NgFor.prototype._perViewChange = function (view, record) {
                    view.setLocal('\$implicit', record.item);
                    view.setLocal('index', record.currentIndex);
                    view.setLocal('even', (record.currentIndex % 2 == 0));
                    view.setLocal('odd', (record.currentIndex % 2 == 1));
                };
                NgFor.prototype._bulkRemove = function (tuples) {
                    tuples.sort(function (a, b) {
                        return a.record.previousIndex - b.record.previousIndex;
                    });
                    var movedTuples = [];
                    for (var i = tuples.length - 1; i >= 0; i--) {
                        var tuple = tuples[i];
                        // separate moved views from removed views.
                        if (lang_1.isPresent(tuple.record.currentIndex)) {
                            tuple.view = this._viewContainer.detach(tuple.record.previousIndex);
                            movedTuples.push(tuple);
                        }
                        else {
                            this._viewContainer.remove(tuple.record.previousIndex);
                        }
                    }
                    return movedTuples;
                };
                NgFor.prototype._bulkInsert = function (tuples) {
                    tuples.sort(function (a, b) { return a.record.currentIndex - b.record.currentIndex; });
                    for (var i = 0; i < tuples.length; i++) {
                        var tuple = tuples[i];
                        if (lang_1.isPresent(tuple.view)) {
                            this._viewContainer.insert(tuple.view, tuple.record.currentIndex);
                        }
                        else {
                            tuple.view =
                                this._viewContainer.createEmbeddedView(this._templateRef, tuple.record.currentIndex);
                        }
                    }
                    return tuples;
                };
                NgFor = __decorate([
                    core_1.Directive({ selector: '[ngFor][ngForOf]', inputs: ['ngForTrackBy', 'ngForOf', 'ngForTemplate'] }), 
                    __metadata('design:paramtypes', [core_1.ViewContainerRef, core_1.TemplateRef, core_1.IterableDiffers, core_1.ChangeDetectorRef])
                ], NgFor);
                return NgFor;
            }());
            exports_1("NgFor", NgFor);
            RecordViewTuple = (function () {
                function RecordViewTuple(record, view) {
                    this.record = record;
                    this.view = view;
                }
                return RecordViewTuple;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZGlyZWN0aXZlcy9uZ19mb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFrQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBa0RHO1lBRUg7Z0JBT0UsZUFBb0IsY0FBZ0MsRUFBVSxZQUF5QixFQUNuRSxnQkFBaUMsRUFBVSxJQUF1QjtvQkFEbEUsbUJBQWMsR0FBZCxjQUFjLENBQWtCO29CQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFhO29CQUNuRSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO29CQUFVLFNBQUksR0FBSixJQUFJLENBQW1CO2dCQUFHLENBQUM7Z0JBRTFGLHNCQUFJLDBCQUFPO3lCQUFYLFVBQVksS0FBVTt3QkFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7d0JBQ3RCLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksZ0JBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzlDLElBQUksQ0FBQztnQ0FDSCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDOzRCQUN6RixDQUFFOzRCQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ1gsTUFBTSxJQUFJLDBCQUFhLENBQ25CLDZDQUEyQyxLQUFLLG1CQUFjLDhCQUF1QixDQUFDLEtBQUssQ0FBQyxnRUFBNkQsQ0FBQyxDQUFDOzRCQUNqSyxDQUFDO3dCQUNILENBQUM7b0JBQ0gsQ0FBQzs7O21CQUFBO2dCQUVELHNCQUFJLGdDQUFhO3lCQUFqQixVQUFr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O3dCQUMzRixDQUFDO29CQUNILENBQUM7b0JBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDaEIsQ0FBQztnQkEzR0g7b0JBQUMsZ0JBQVMsQ0FBQyxFQUFDLFFBQVEsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsQ0FBQyxjQUFjLEVBQUUsU0FBUyxFQUFFLGVBQWUsQ0FBQyxFQUFDLENBQUM7O3lCQUFBO2dCQTRHaEcsWUFBQztZQUFELENBM0dBLEFBMkdDLElBQUE7WUEzR0QseUJBMkdDLENBQUE7WUFFRDtnQkFHRSx5QkFBWSxNQUFXLEVBQUUsSUFBcUI7b0JBQzVDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO29CQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDbkIsQ0FBQztnQkFDSCxzQkFBQztZQUFELENBUEEsQUFPQyxJQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZGlyZWN0aXZlcy9uZ19mb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEb0NoZWNrLFxuICBEaXJlY3RpdmUsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBJdGVyYWJsZURpZmZlcixcbiAgSXRlcmFibGVEaWZmZXJzLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBUZW1wbGF0ZVJlZixcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBUcmFja0J5Rm5cbn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge2lzUHJlc2VudCwgaXNCbGFuaywgc3RyaW5naWZ5LCBnZXRUeXBlTmFtZUZvckRlYnVnZ2luZ30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7XG4gIERlZmF1bHRJdGVyYWJsZURpZmZlcixcbiAgQ29sbGVjdGlvbkNoYW5nZVJlY29yZFxufSBmcm9tIFwiLi4vLi4vY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2RpZmZlcnMvZGVmYXVsdF9pdGVyYWJsZV9kaWZmZXJcIjtcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSBcIi4uLy4uL2ZhY2FkZS9leGNlcHRpb25zXCI7XG5cbi8qKlxuICogVGhlIGBOZ0ZvcmAgZGlyZWN0aXZlIGluc3RhbnRpYXRlcyBhIHRlbXBsYXRlIG9uY2UgcGVyIGl0ZW0gZnJvbSBhbiBpdGVyYWJsZS4gVGhlIGNvbnRleHQgZm9yXG4gKiBlYWNoIGluc3RhbnRpYXRlZCB0ZW1wbGF0ZSBpbmhlcml0cyBmcm9tIHRoZSBvdXRlciBjb250ZXh0IHdpdGggdGhlIGdpdmVuIGxvb3AgdmFyaWFibGUgc2V0XG4gKiB0byB0aGUgY3VycmVudCBpdGVtIGZyb20gdGhlIGl0ZXJhYmxlLlxuICpcbiAqICMjIyBMb2NhbCBWYXJpYWJsZXNcbiAqXG4gKiBgTmdGb3JgIHByb3ZpZGVzIHNldmVyYWwgZXhwb3J0ZWQgdmFsdWVzIHRoYXQgY2FuIGJlIGFsaWFzZWQgdG8gbG9jYWwgdmFyaWFibGVzOlxuICpcbiAqICogYGluZGV4YCB3aWxsIGJlIHNldCB0byB0aGUgY3VycmVudCBsb29wIGl0ZXJhdGlvbiBmb3IgZWFjaCB0ZW1wbGF0ZSBjb250ZXh0LlxuICogKiBgZmlyc3RgIHdpbGwgYmUgc2V0IHRvIGEgYm9vbGVhbiB2YWx1ZSBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIGl0ZW0gaXMgdGhlIGZpcnN0IG9uZSBpbiB0aGVcbiAqICAgaXRlcmF0aW9uLlxuICogKiBgbGFzdGAgd2lsbCBiZSBzZXQgdG8gYSBib29sZWFuIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0aGUgaXRlbSBpcyB0aGUgbGFzdCBvbmUgaW4gdGhlXG4gKiAgIGl0ZXJhdGlvbi5cbiAqICogYGV2ZW5gIHdpbGwgYmUgc2V0IHRvIGEgYm9vbGVhbiB2YWx1ZSBpbmRpY2F0aW5nIHdoZXRoZXIgdGhpcyBpdGVtIGhhcyBhbiBldmVuIGluZGV4LlxuICogKiBgb2RkYCB3aWxsIGJlIHNldCB0byBhIGJvb2xlYW4gdmFsdWUgaW5kaWNhdGluZyB3aGV0aGVyIHRoaXMgaXRlbSBoYXMgYW4gb2RkIGluZGV4LlxuICpcbiAqICMjIyBDaGFuZ2UgUHJvcGFnYXRpb25cbiAqXG4gKiBXaGVuIHRoZSBjb250ZW50cyBvZiB0aGUgaXRlcmF0b3IgY2hhbmdlcywgYE5nRm9yYCBtYWtlcyB0aGUgY29ycmVzcG9uZGluZyBjaGFuZ2VzIHRvIHRoZSBET006XG4gKlxuICogKiBXaGVuIGFuIGl0ZW0gaXMgYWRkZWQsIGEgbmV3IGluc3RhbmNlIG9mIHRoZSB0ZW1wbGF0ZSBpcyBhZGRlZCB0byB0aGUgRE9NLlxuICogKiBXaGVuIGFuIGl0ZW0gaXMgcmVtb3ZlZCwgaXRzIHRlbXBsYXRlIGluc3RhbmNlIGlzIHJlbW92ZWQgZnJvbSB0aGUgRE9NLlxuICogKiBXaGVuIGl0ZW1zIGFyZSByZW9yZGVyZWQsIHRoZWlyIHJlc3BlY3RpdmUgdGVtcGxhdGVzIGFyZSByZW9yZGVyZWQgaW4gdGhlIERPTS5cbiAqICogT3RoZXJ3aXNlLCB0aGUgRE9NIGVsZW1lbnQgZm9yIHRoYXQgaXRlbSB3aWxsIHJlbWFpbiB0aGUgc2FtZS5cbiAqXG4gKiBBbmd1bGFyIHVzZXMgb2JqZWN0IGlkZW50aXR5IHRvIHRyYWNrIGluc2VydGlvbnMgYW5kIGRlbGV0aW9ucyB3aXRoaW4gdGhlIGl0ZXJhdG9yIGFuZCByZXByb2R1Y2VcbiAqIHRob3NlIGNoYW5nZXMgaW4gdGhlIERPTS4gVGhpcyBoYXMgaW1wb3J0YW50IGltcGxpY2F0aW9ucyBmb3IgYW5pbWF0aW9ucyBhbmQgYW55IHN0YXRlZnVsXG4gKiBjb250cm9sc1xuICogKHN1Y2ggYXMgYDxpbnB1dD5gIGVsZW1lbnRzIHdoaWNoIGFjY2VwdCB1c2VyIGlucHV0KSB0aGF0IGFyZSBwcmVzZW50LiBJbnNlcnRlZCByb3dzIGNhbiBiZVxuICogYW5pbWF0ZWQgaW4sIGRlbGV0ZWQgcm93cyBjYW4gYmUgYW5pbWF0ZWQgb3V0LCBhbmQgdW5jaGFuZ2VkIHJvd3MgcmV0YWluIGFueSB1bnNhdmVkIHN0YXRlIHN1Y2hcbiAqIGFzIHVzZXIgaW5wdXQuXG4gKlxuICogSXQgaXMgcG9zc2libGUgZm9yIHRoZSBpZGVudGl0aWVzIG9mIGVsZW1lbnRzIGluIHRoZSBpdGVyYXRvciB0byBjaGFuZ2Ugd2hpbGUgdGhlIGRhdGEgZG9lcyBub3QuXG4gKiBUaGlzIGNhbiBoYXBwZW4sIGZvciBleGFtcGxlLCBpZiB0aGUgaXRlcmF0b3IgcHJvZHVjZWQgZnJvbSBhbiBSUEMgdG8gdGhlIHNlcnZlciwgYW5kIHRoYXRcbiAqIFJQQyBpcyByZS1ydW4uIEV2ZW4gaWYgdGhlIGRhdGEgaGFzbid0IGNoYW5nZWQsIHRoZSBzZWNvbmQgcmVzcG9uc2Ugd2lsbCBwcm9kdWNlIG9iamVjdHMgd2l0aFxuICogZGlmZmVyZW50IGlkZW50aXRpZXMsIGFuZCBBbmd1bGFyIHdpbGwgdGVhciBkb3duIHRoZSBlbnRpcmUgRE9NIGFuZCByZWJ1aWxkIGl0IChhcyBpZiBhbGwgb2xkXG4gKiBlbGVtZW50cyB3ZXJlIGRlbGV0ZWQgYW5kIGFsbCBuZXcgZWxlbWVudHMgaW5zZXJ0ZWQpLiBUaGlzIGlzIGFuIGV4cGVuc2l2ZSBvcGVyYXRpb24gYW5kIHNob3VsZFxuICogYmUgYXZvaWRlZCBpZiBwb3NzaWJsZS5cbiAqXG4gKiAjIyMgU3ludGF4XG4gKlxuICogLSBgPGxpICpuZ0Zvcj1cImxldCBpdGVtIG9mIGl0ZW1zOyAjaSA9IGluZGV4XCI+Li4uPC9saT5gXG4gKiAtIGA8bGkgdGVtcGxhdGU9XCJuZ0ZvciAjaXRlbSBvZiBpdGVtczsgI2kgPSBpbmRleFwiPi4uLjwvbGk+YFxuICogLSBgPHRlbXBsYXRlIG5nRm9yICNpdGVtIFtuZ0Zvck9mXT1cIml0ZW1zXCIgI2k9XCJpbmRleFwiPjxsaT4uLi48L2xpPjwvdGVtcGxhdGU+YFxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogU2VlIGEgW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvS1Z1WHhEcDBxaW5HRHlvMzA3UVc/cD1wcmV2aWV3KSBmb3IgYSBtb3JlIGRldGFpbGVkXG4gKiBleGFtcGxlLlxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1tuZ0Zvcl1bbmdGb3JPZl0nLCBpbnB1dHM6IFsnbmdGb3JUcmFja0J5JywgJ25nRm9yT2YnLCAnbmdGb3JUZW1wbGF0ZSddfSlcbmV4cG9ydCBjbGFzcyBOZ0ZvciBpbXBsZW1lbnRzIERvQ2hlY2sge1xuICAvKiogQGludGVybmFsICovXG4gIF9uZ0Zvck9mOiBhbnk7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX25nRm9yVHJhY2tCeTogVHJhY2tCeUZuO1xuICBwcml2YXRlIF9kaWZmZXI6IEl0ZXJhYmxlRGlmZmVyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3ZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgX3RlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfaXRlcmFibGVEaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsIHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgc2V0IG5nRm9yT2YodmFsdWU6IGFueSkge1xuICAgIHRoaXMuX25nRm9yT2YgPSB2YWx1ZTtcbiAgICBpZiAoaXNCbGFuayh0aGlzLl9kaWZmZXIpICYmIGlzUHJlc2VudCh2YWx1ZSkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuX2RpZmZlciA9IHRoaXMuX2l0ZXJhYmxlRGlmZmVycy5maW5kKHZhbHVlKS5jcmVhdGUodGhpcy5fY2RyLCB0aGlzLl9uZ0ZvclRyYWNrQnkpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcbiAgICAgICAgICAgIGBDYW5ub3QgZmluZCBhIGRpZmZlciBzdXBwb3J0aW5nIG9iamVjdCAnJHt2YWx1ZX0nIG9mIHR5cGUgJyR7Z2V0VHlwZU5hbWVGb3JEZWJ1Z2dpbmcodmFsdWUpfScuIE5nRm9yIG9ubHkgc3VwcG9ydHMgYmluZGluZyB0byBJdGVyYWJsZXMgc3VjaCBhcyBBcnJheXMuYCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0IG5nRm9yVGVtcGxhdGUodmFsdWU6IFRlbXBsYXRlUmVmKSB7XG4gICAgaWYgKGlzUHJlc2VudCh2YWx1ZSkpIHtcbiAgICAgIHRoaXMuX3RlbXBsYXRlUmVmID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgc2V0IG5nRm9yVHJhY2tCeSh2YWx1ZTogVHJhY2tCeUZuKSB7IHRoaXMuX25nRm9yVHJhY2tCeSA9IHZhbHVlOyB9XG5cbiAgbmdEb0NoZWNrKCkge1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fZGlmZmVyKSkge1xuICAgICAgdmFyIGNoYW5nZXMgPSB0aGlzLl9kaWZmZXIuZGlmZih0aGlzLl9uZ0Zvck9mKTtcbiAgICAgIGlmIChpc1ByZXNlbnQoY2hhbmdlcykpIHRoaXMuX2FwcGx5Q2hhbmdlcyhjaGFuZ2VzKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9hcHBseUNoYW5nZXMoY2hhbmdlczogRGVmYXVsdEl0ZXJhYmxlRGlmZmVyKSB7XG4gICAgLy8gVE9ETyhyYWRvKTogY2hlY2sgaWYgY2hhbmdlIGRldGVjdGlvbiBjYW4gcHJvZHVjZSBhIGNoYW5nZSByZWNvcmQgdGhhdCBpc1xuICAgIC8vIGVhc2llciB0byBjb25zdW1lIHRoYW4gY3VycmVudC5cbiAgICB2YXIgcmVjb3JkVmlld1R1cGxlczogUmVjb3JkVmlld1R1cGxlW10gPSBbXTtcbiAgICBjaGFuZ2VzLmZvckVhY2hSZW1vdmVkSXRlbSgocmVtb3ZlZFJlY29yZDogQ29sbGVjdGlvbkNoYW5nZVJlY29yZCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjb3JkVmlld1R1cGxlcy5wdXNoKG5ldyBSZWNvcmRWaWV3VHVwbGUocmVtb3ZlZFJlY29yZCwgbnVsbCkpKTtcblxuICAgIGNoYW5nZXMuZm9yRWFjaE1vdmVkSXRlbSgobW92ZWRSZWNvcmQ6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNvcmRWaWV3VHVwbGVzLnB1c2gobmV3IFJlY29yZFZpZXdUdXBsZShtb3ZlZFJlY29yZCwgbnVsbCkpKTtcblxuICAgIHZhciBpbnNlcnRUdXBsZXMgPSB0aGlzLl9idWxrUmVtb3ZlKHJlY29yZFZpZXdUdXBsZXMpO1xuXG4gICAgY2hhbmdlcy5mb3JFYWNoQWRkZWRJdGVtKChhZGRlZFJlY29yZDogQ29sbGVjdGlvbkNoYW5nZVJlY29yZCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc2VydFR1cGxlcy5wdXNoKG5ldyBSZWNvcmRWaWV3VHVwbGUoYWRkZWRSZWNvcmQsIG51bGwpKSk7XG5cbiAgICB0aGlzLl9idWxrSW5zZXJ0KGluc2VydFR1cGxlcyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluc2VydFR1cGxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5fcGVyVmlld0NoYW5nZShpbnNlcnRUdXBsZXNbaV0udmlldywgaW5zZXJ0VHVwbGVzW2ldLnJlY29yZCk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDAsIGlsZW4gPSB0aGlzLl92aWV3Q29udGFpbmVyLmxlbmd0aDsgaSA8IGlsZW47IGkrKykge1xuICAgICAgdmFyIHZpZXdSZWYgPSA8RW1iZWRkZWRWaWV3UmVmPnRoaXMuX3ZpZXdDb250YWluZXIuZ2V0KGkpO1xuICAgICAgdmlld1JlZi5zZXRMb2NhbCgnZmlyc3QnLCBpID09PSAwKTtcbiAgICAgIHZpZXdSZWYuc2V0TG9jYWwoJ2xhc3QnLCBpID09PSBpbGVuIC0gMSk7XG4gICAgfVxuXG4gICAgY2hhbmdlcy5mb3JFYWNoSWRlbnRpdHlDaGFuZ2UoKHJlY29yZCkgPT4ge1xuICAgICAgdmFyIHZpZXdSZWYgPSA8RW1iZWRkZWRWaWV3UmVmPnRoaXMuX3ZpZXdDb250YWluZXIuZ2V0KHJlY29yZC5jdXJyZW50SW5kZXgpO1xuICAgICAgdmlld1JlZi5zZXRMb2NhbCgnXFwkaW1wbGljaXQnLCByZWNvcmQuaXRlbSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9wZXJWaWV3Q2hhbmdlKHZpZXc6IEVtYmVkZGVkVmlld1JlZiwgcmVjb3JkOiBDb2xsZWN0aW9uQ2hhbmdlUmVjb3JkKSB7XG4gICAgdmlldy5zZXRMb2NhbCgnXFwkaW1wbGljaXQnLCByZWNvcmQuaXRlbSk7XG4gICAgdmlldy5zZXRMb2NhbCgnaW5kZXgnLCByZWNvcmQuY3VycmVudEluZGV4KTtcbiAgICB2aWV3LnNldExvY2FsKCdldmVuJywgKHJlY29yZC5jdXJyZW50SW5kZXggJSAyID09IDApKTtcbiAgICB2aWV3LnNldExvY2FsKCdvZGQnLCAocmVjb3JkLmN1cnJlbnRJbmRleCAlIDIgPT0gMSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVsa1JlbW92ZSh0dXBsZXM6IFJlY29yZFZpZXdUdXBsZVtdKTogUmVjb3JkVmlld1R1cGxlW10ge1xuICAgIHR1cGxlcy5zb3J0KChhOiBSZWNvcmRWaWV3VHVwbGUsIGI6IFJlY29yZFZpZXdUdXBsZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgYS5yZWNvcmQucHJldmlvdXNJbmRleCAtIGIucmVjb3JkLnByZXZpb3VzSW5kZXgpO1xuICAgIHZhciBtb3ZlZFR1cGxlczogUmVjb3JkVmlld1R1cGxlW10gPSBbXTtcbiAgICBmb3IgKHZhciBpID0gdHVwbGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgdHVwbGUgPSB0dXBsZXNbaV07XG4gICAgICAvLyBzZXBhcmF0ZSBtb3ZlZCB2aWV3cyBmcm9tIHJlbW92ZWQgdmlld3MuXG4gICAgICBpZiAoaXNQcmVzZW50KHR1cGxlLnJlY29yZC5jdXJyZW50SW5kZXgpKSB7XG4gICAgICAgIHR1cGxlLnZpZXcgPSA8RW1iZWRkZWRWaWV3UmVmPnRoaXMuX3ZpZXdDb250YWluZXIuZGV0YWNoKHR1cGxlLnJlY29yZC5wcmV2aW91c0luZGV4KTtcbiAgICAgICAgbW92ZWRUdXBsZXMucHVzaCh0dXBsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl92aWV3Q29udGFpbmVyLnJlbW92ZSh0dXBsZS5yZWNvcmQucHJldmlvdXNJbmRleCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtb3ZlZFR1cGxlcztcbiAgfVxuXG4gIHByaXZhdGUgX2J1bGtJbnNlcnQodHVwbGVzOiBSZWNvcmRWaWV3VHVwbGVbXSk6IFJlY29yZFZpZXdUdXBsZVtdIHtcbiAgICB0dXBsZXMuc29ydCgoYSwgYikgPT4gYS5yZWNvcmQuY3VycmVudEluZGV4IC0gYi5yZWNvcmQuY3VycmVudEluZGV4KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHR1cGxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHR1cGxlID0gdHVwbGVzW2ldO1xuICAgICAgaWYgKGlzUHJlc2VudCh0dXBsZS52aWV3KSkge1xuICAgICAgICB0aGlzLl92aWV3Q29udGFpbmVyLmluc2VydCh0dXBsZS52aWV3LCB0dXBsZS5yZWNvcmQuY3VycmVudEluZGV4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHR1cGxlLnZpZXcgPVxuICAgICAgICAgICAgdGhpcy5fdmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy5fdGVtcGxhdGVSZWYsIHR1cGxlLnJlY29yZC5jdXJyZW50SW5kZXgpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHVwbGVzO1xuICB9XG59XG5cbmNsYXNzIFJlY29yZFZpZXdUdXBsZSB7XG4gIHZpZXc6IEVtYmVkZGVkVmlld1JlZjtcbiAgcmVjb3JkOiBhbnk7XG4gIGNvbnN0cnVjdG9yKHJlY29yZDogYW55LCB2aWV3OiBFbWJlZGRlZFZpZXdSZWYpIHtcbiAgICB0aGlzLnJlY29yZCA9IHJlY29yZDtcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
