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
             * # Local Variables
             *
             * `NgFor` provides several exported values that can be aliased to local variables:
             *
             * * `index` will be set to the current loop iteration for each template context.
             * * `last` will be set to a boolean value indicating whether the item is the last one in the
             *   iteration.
             * * `even` will be set to a boolean value indicating whether this item has an even index.
             * * `odd` will be set to a boolean value indicating whether this item has an odd index.
             *
             * # Change Propagation
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
             * # Syntax
             *
             * - `<li *ngFor="#item of items; #i = index">...</li>`
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9kaXJlY3RpdmVzL25nX2Zvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQWtCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBZ0RHO1lBRUg7Z0JBTUUsZUFBb0IsY0FBZ0MsRUFBVSxZQUF5QixFQUNuRSxnQkFBaUMsRUFBVSxJQUF1QjtvQkFEbEUsbUJBQWMsR0FBZCxjQUFjLENBQWtCO29CQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFhO29CQUNuRSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO29CQUFVLFNBQUksR0FBSixJQUFJLENBQW1CO2dCQUFHLENBQUM7Z0JBRTFGLHNCQUFJLDBCQUFPO3lCQUFYLFVBQVksS0FBVTt3QkFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7d0JBQ3RCLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksZ0JBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzlDLElBQUksQ0FBQztnQ0FDSCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDOzRCQUN6RixDQUFFOzRCQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ1gsTUFBTSxJQUFJLDBCQUFhLENBQ25CLDZDQUEyQyxLQUFLLG1CQUFjLDhCQUF1QixDQUFDLEtBQUssQ0FBQyxnRUFBNkQsQ0FBQyxDQUFDOzRCQUNqSyxDQUFDO3dCQUNILENBQUM7b0JBQ0gsQ0FBQzs7O21CQUFBO2dCQUVELHNCQUFJLGdDQUFhO3lCQUFqQixV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QztnQkF6R0g7b0JBQUMsZ0JBQVMsQ0FBQyxFQUFDLFFBQVEsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsQ0FBQyxjQUFjLEVBQUUsU0FBUyxFQUFFLGVBQWUsQ0FBQyxFQUFDLENBQUM7O3lCQUFBO2dCQTBHaEcsWUFBQztZQUFELENBekdBLEFBeUdDLElBQUE7WUF6R0QseUJBeUdDLENBQUE7WUFFRDtnQkFHRSx5QkFBWSxNQUFXLEVBQUUsSUFBcUI7b0JBQzVDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO29CQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDbkIsQ0FBQztnQkFDSCxzQkFBQztZQUFELENBUEEsQUFPQyxJQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9kaXJlY3RpdmVzL25nX2Zvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERvQ2hlY2ssXG4gIERpcmVjdGl2ZSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIEl0ZXJhYmxlRGlmZmVyLFxuICBJdGVyYWJsZURpZmZlcnMsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFRlbXBsYXRlUmVmLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIFRyYWNrQnlGblxufSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7aXNQcmVzZW50LCBpc0JsYW5rLCBzdHJpbmdpZnksIGdldFR5cGVOYW1lRm9yRGVidWdnaW5nfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtcbiAgRGVmYXVsdEl0ZXJhYmxlRGlmZmVyLFxuICBDb2xsZWN0aW9uQ2hhbmdlUmVjb3JkXG59IGZyb20gXCIuLi8uLi9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vZGlmZmVycy9kZWZhdWx0X2l0ZXJhYmxlX2RpZmZlclwiO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9ufSBmcm9tIFwiLi4vLi4vZmFjYWRlL2V4Y2VwdGlvbnNcIjtcblxuLyoqXG4gKiBUaGUgYE5nRm9yYCBkaXJlY3RpdmUgaW5zdGFudGlhdGVzIGEgdGVtcGxhdGUgb25jZSBwZXIgaXRlbSBmcm9tIGFuIGl0ZXJhYmxlLiBUaGUgY29udGV4dCBmb3JcbiAqIGVhY2ggaW5zdGFudGlhdGVkIHRlbXBsYXRlIGluaGVyaXRzIGZyb20gdGhlIG91dGVyIGNvbnRleHQgd2l0aCB0aGUgZ2l2ZW4gbG9vcCB2YXJpYWJsZSBzZXRcbiAqIHRvIHRoZSBjdXJyZW50IGl0ZW0gZnJvbSB0aGUgaXRlcmFibGUuXG4gKlxuICogIyBMb2NhbCBWYXJpYWJsZXNcbiAqXG4gKiBgTmdGb3JgIHByb3ZpZGVzIHNldmVyYWwgZXhwb3J0ZWQgdmFsdWVzIHRoYXQgY2FuIGJlIGFsaWFzZWQgdG8gbG9jYWwgdmFyaWFibGVzOlxuICpcbiAqICogYGluZGV4YCB3aWxsIGJlIHNldCB0byB0aGUgY3VycmVudCBsb29wIGl0ZXJhdGlvbiBmb3IgZWFjaCB0ZW1wbGF0ZSBjb250ZXh0LlxuICogKiBgbGFzdGAgd2lsbCBiZSBzZXQgdG8gYSBib29sZWFuIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0aGUgaXRlbSBpcyB0aGUgbGFzdCBvbmUgaW4gdGhlXG4gKiAgIGl0ZXJhdGlvbi5cbiAqICogYGV2ZW5gIHdpbGwgYmUgc2V0IHRvIGEgYm9vbGVhbiB2YWx1ZSBpbmRpY2F0aW5nIHdoZXRoZXIgdGhpcyBpdGVtIGhhcyBhbiBldmVuIGluZGV4LlxuICogKiBgb2RkYCB3aWxsIGJlIHNldCB0byBhIGJvb2xlYW4gdmFsdWUgaW5kaWNhdGluZyB3aGV0aGVyIHRoaXMgaXRlbSBoYXMgYW4gb2RkIGluZGV4LlxuICpcbiAqICMgQ2hhbmdlIFByb3BhZ2F0aW9uXG4gKlxuICogV2hlbiB0aGUgY29udGVudHMgb2YgdGhlIGl0ZXJhdG9yIGNoYW5nZXMsIGBOZ0ZvcmAgbWFrZXMgdGhlIGNvcnJlc3BvbmRpbmcgY2hhbmdlcyB0byB0aGUgRE9NOlxuICpcbiAqICogV2hlbiBhbiBpdGVtIGlzIGFkZGVkLCBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgdGVtcGxhdGUgaXMgYWRkZWQgdG8gdGhlIERPTS5cbiAqICogV2hlbiBhbiBpdGVtIGlzIHJlbW92ZWQsIGl0cyB0ZW1wbGF0ZSBpbnN0YW5jZSBpcyByZW1vdmVkIGZyb20gdGhlIERPTS5cbiAqICogV2hlbiBpdGVtcyBhcmUgcmVvcmRlcmVkLCB0aGVpciByZXNwZWN0aXZlIHRlbXBsYXRlcyBhcmUgcmVvcmRlcmVkIGluIHRoZSBET00uXG4gKiAqIE90aGVyd2lzZSwgdGhlIERPTSBlbGVtZW50IGZvciB0aGF0IGl0ZW0gd2lsbCByZW1haW4gdGhlIHNhbWUuXG4gKlxuICogQW5ndWxhciB1c2VzIG9iamVjdCBpZGVudGl0eSB0byB0cmFjayBpbnNlcnRpb25zIGFuZCBkZWxldGlvbnMgd2l0aGluIHRoZSBpdGVyYXRvciBhbmQgcmVwcm9kdWNlXG4gKiB0aG9zZSBjaGFuZ2VzIGluIHRoZSBET00uIFRoaXMgaGFzIGltcG9ydGFudCBpbXBsaWNhdGlvbnMgZm9yIGFuaW1hdGlvbnMgYW5kIGFueSBzdGF0ZWZ1bFxuICogY29udHJvbHNcbiAqIChzdWNoIGFzIGA8aW5wdXQ+YCBlbGVtZW50cyB3aGljaCBhY2NlcHQgdXNlciBpbnB1dCkgdGhhdCBhcmUgcHJlc2VudC4gSW5zZXJ0ZWQgcm93cyBjYW4gYmVcbiAqIGFuaW1hdGVkIGluLCBkZWxldGVkIHJvd3MgY2FuIGJlIGFuaW1hdGVkIG91dCwgYW5kIHVuY2hhbmdlZCByb3dzIHJldGFpbiBhbnkgdW5zYXZlZCBzdGF0ZSBzdWNoXG4gKiBhcyB1c2VyIGlucHV0LlxuICpcbiAqIEl0IGlzIHBvc3NpYmxlIGZvciB0aGUgaWRlbnRpdGllcyBvZiBlbGVtZW50cyBpbiB0aGUgaXRlcmF0b3IgdG8gY2hhbmdlIHdoaWxlIHRoZSBkYXRhIGRvZXMgbm90LlxuICogVGhpcyBjYW4gaGFwcGVuLCBmb3IgZXhhbXBsZSwgaWYgdGhlIGl0ZXJhdG9yIHByb2R1Y2VkIGZyb20gYW4gUlBDIHRvIHRoZSBzZXJ2ZXIsIGFuZCB0aGF0XG4gKiBSUEMgaXMgcmUtcnVuLiBFdmVuIGlmIHRoZSBkYXRhIGhhc24ndCBjaGFuZ2VkLCB0aGUgc2Vjb25kIHJlc3BvbnNlIHdpbGwgcHJvZHVjZSBvYmplY3RzIHdpdGhcbiAqIGRpZmZlcmVudCBpZGVudGl0aWVzLCBhbmQgQW5ndWxhciB3aWxsIHRlYXIgZG93biB0aGUgZW50aXJlIERPTSBhbmQgcmVidWlsZCBpdCAoYXMgaWYgYWxsIG9sZFxuICogZWxlbWVudHMgd2VyZSBkZWxldGVkIGFuZCBhbGwgbmV3IGVsZW1lbnRzIGluc2VydGVkKS4gVGhpcyBpcyBhbiBleHBlbnNpdmUgb3BlcmF0aW9uIGFuZCBzaG91bGRcbiAqIGJlIGF2b2lkZWQgaWYgcG9zc2libGUuXG4gKlxuICogIyBTeW50YXhcbiAqXG4gKiAtIGA8bGkgKm5nRm9yPVwiI2l0ZW0gb2YgaXRlbXM7ICNpID0gaW5kZXhcIj4uLi48L2xpPmBcbiAqIC0gYDxsaSB0ZW1wbGF0ZT1cIm5nRm9yICNpdGVtIG9mIGl0ZW1zOyAjaSA9IGluZGV4XCI+Li4uPC9saT5gXG4gKiAtIGA8dGVtcGxhdGUgbmdGb3IgI2l0ZW0gW25nRm9yT2ZdPVwiaXRlbXNcIiAjaT1cImluZGV4XCI+PGxpPi4uLjwvbGk+PC90ZW1wbGF0ZT5gXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBTZWUgYSBbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC9LVnVYeERwMHFpbkdEeW8zMDdRVz9wPXByZXZpZXcpIGZvciBhIG1vcmUgZGV0YWlsZWRcbiAqIGV4YW1wbGUuXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25nRm9yXVtuZ0Zvck9mXScsIGlucHV0czogWyduZ0ZvclRyYWNrQnknLCAnbmdGb3JPZicsICduZ0ZvclRlbXBsYXRlJ119KVxuZXhwb3J0IGNsYXNzIE5nRm9yIGltcGxlbWVudHMgRG9DaGVjayB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX25nRm9yT2Y6IGFueTtcbiAgX25nRm9yVHJhY2tCeTogVHJhY2tCeUZuO1xuICBwcml2YXRlIF9kaWZmZXI6IEl0ZXJhYmxlRGlmZmVyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3ZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgX3RlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfaXRlcmFibGVEaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsIHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgc2V0IG5nRm9yT2YodmFsdWU6IGFueSkge1xuICAgIHRoaXMuX25nRm9yT2YgPSB2YWx1ZTtcbiAgICBpZiAoaXNCbGFuayh0aGlzLl9kaWZmZXIpICYmIGlzUHJlc2VudCh2YWx1ZSkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuX2RpZmZlciA9IHRoaXMuX2l0ZXJhYmxlRGlmZmVycy5maW5kKHZhbHVlKS5jcmVhdGUodGhpcy5fY2RyLCB0aGlzLl9uZ0ZvclRyYWNrQnkpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcbiAgICAgICAgICAgIGBDYW5ub3QgZmluZCBhIGRpZmZlciBzdXBwb3J0aW5nIG9iamVjdCAnJHt2YWx1ZX0nIG9mIHR5cGUgJyR7Z2V0VHlwZU5hbWVGb3JEZWJ1Z2dpbmcodmFsdWUpfScuIE5nRm9yIG9ubHkgc3VwcG9ydHMgYmluZGluZyB0byBJdGVyYWJsZXMgc3VjaCBhcyBBcnJheXMuYCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0IG5nRm9yVGVtcGxhdGUodmFsdWU6IFRlbXBsYXRlUmVmKSB7XG4gICAgaWYgKGlzUHJlc2VudCh2YWx1ZSkpIHtcbiAgICAgIHRoaXMuX3RlbXBsYXRlUmVmID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgc2V0IG5nRm9yVHJhY2tCeSh2YWx1ZTogVHJhY2tCeUZuKSB7IHRoaXMuX25nRm9yVHJhY2tCeSA9IHZhbHVlOyB9XG5cbiAgbmdEb0NoZWNrKCkge1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fZGlmZmVyKSkge1xuICAgICAgdmFyIGNoYW5nZXMgPSB0aGlzLl9kaWZmZXIuZGlmZih0aGlzLl9uZ0Zvck9mKTtcbiAgICAgIGlmIChpc1ByZXNlbnQoY2hhbmdlcykpIHRoaXMuX2FwcGx5Q2hhbmdlcyhjaGFuZ2VzKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9hcHBseUNoYW5nZXMoY2hhbmdlczogRGVmYXVsdEl0ZXJhYmxlRGlmZmVyKSB7XG4gICAgLy8gVE9ETyhyYWRvKTogY2hlY2sgaWYgY2hhbmdlIGRldGVjdGlvbiBjYW4gcHJvZHVjZSBhIGNoYW5nZSByZWNvcmQgdGhhdCBpc1xuICAgIC8vIGVhc2llciB0byBjb25zdW1lIHRoYW4gY3VycmVudC5cbiAgICB2YXIgcmVjb3JkVmlld1R1cGxlczogUmVjb3JkVmlld1R1cGxlW10gPSBbXTtcbiAgICBjaGFuZ2VzLmZvckVhY2hSZW1vdmVkSXRlbSgocmVtb3ZlZFJlY29yZDogQ29sbGVjdGlvbkNoYW5nZVJlY29yZCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjb3JkVmlld1R1cGxlcy5wdXNoKG5ldyBSZWNvcmRWaWV3VHVwbGUocmVtb3ZlZFJlY29yZCwgbnVsbCkpKTtcblxuICAgIGNoYW5nZXMuZm9yRWFjaE1vdmVkSXRlbSgobW92ZWRSZWNvcmQ6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNvcmRWaWV3VHVwbGVzLnB1c2gobmV3IFJlY29yZFZpZXdUdXBsZShtb3ZlZFJlY29yZCwgbnVsbCkpKTtcblxuICAgIHZhciBpbnNlcnRUdXBsZXMgPSB0aGlzLl9idWxrUmVtb3ZlKHJlY29yZFZpZXdUdXBsZXMpO1xuXG4gICAgY2hhbmdlcy5mb3JFYWNoQWRkZWRJdGVtKChhZGRlZFJlY29yZDogQ29sbGVjdGlvbkNoYW5nZVJlY29yZCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc2VydFR1cGxlcy5wdXNoKG5ldyBSZWNvcmRWaWV3VHVwbGUoYWRkZWRSZWNvcmQsIG51bGwpKSk7XG5cbiAgICB0aGlzLl9idWxrSW5zZXJ0KGluc2VydFR1cGxlcyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluc2VydFR1cGxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5fcGVyVmlld0NoYW5nZShpbnNlcnRUdXBsZXNbaV0udmlldywgaW5zZXJ0VHVwbGVzW2ldLnJlY29yZCk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDAsIGlsZW4gPSB0aGlzLl92aWV3Q29udGFpbmVyLmxlbmd0aDsgaSA8IGlsZW47IGkrKykge1xuICAgICAgdmFyIHZpZXdSZWYgPSA8RW1iZWRkZWRWaWV3UmVmPnRoaXMuX3ZpZXdDb250YWluZXIuZ2V0KGkpO1xuICAgICAgdmlld1JlZi5zZXRMb2NhbCgnbGFzdCcsIGkgPT09IGlsZW4gLSAxKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VzLmZvckVhY2hJZGVudGl0eUNoYW5nZSgocmVjb3JkKSA9PiB7XG4gICAgICB2YXIgdmlld1JlZiA9IDxFbWJlZGRlZFZpZXdSZWY+dGhpcy5fdmlld0NvbnRhaW5lci5nZXQocmVjb3JkLmN1cnJlbnRJbmRleCk7XG4gICAgICB2aWV3UmVmLnNldExvY2FsKCdcXCRpbXBsaWNpdCcsIHJlY29yZC5pdGVtKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3BlclZpZXdDaGFuZ2UodmlldzogRW1iZWRkZWRWaWV3UmVmLCByZWNvcmQ6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQpIHtcbiAgICB2aWV3LnNldExvY2FsKCdcXCRpbXBsaWNpdCcsIHJlY29yZC5pdGVtKTtcbiAgICB2aWV3LnNldExvY2FsKCdpbmRleCcsIHJlY29yZC5jdXJyZW50SW5kZXgpO1xuICAgIHZpZXcuc2V0TG9jYWwoJ2V2ZW4nLCAocmVjb3JkLmN1cnJlbnRJbmRleCAlIDIgPT0gMCkpO1xuICAgIHZpZXcuc2V0TG9jYWwoJ29kZCcsIChyZWNvcmQuY3VycmVudEluZGV4ICUgMiA9PSAxKSk7XG4gIH1cblxuICBwcml2YXRlIF9idWxrUmVtb3ZlKHR1cGxlczogUmVjb3JkVmlld1R1cGxlW10pOiBSZWNvcmRWaWV3VHVwbGVbXSB7XG4gICAgdHVwbGVzLnNvcnQoKGE6IFJlY29yZFZpZXdUdXBsZSwgYjogUmVjb3JkVmlld1R1cGxlKSA9PlxuICAgICAgICAgICAgICAgICAgICBhLnJlY29yZC5wcmV2aW91c0luZGV4IC0gYi5yZWNvcmQucHJldmlvdXNJbmRleCk7XG4gICAgdmFyIG1vdmVkVHVwbGVzOiBSZWNvcmRWaWV3VHVwbGVbXSA9IFtdO1xuICAgIGZvciAodmFyIGkgPSB0dXBsZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciB0dXBsZSA9IHR1cGxlc1tpXTtcbiAgICAgIC8vIHNlcGFyYXRlIG1vdmVkIHZpZXdzIGZyb20gcmVtb3ZlZCB2aWV3cy5cbiAgICAgIGlmIChpc1ByZXNlbnQodHVwbGUucmVjb3JkLmN1cnJlbnRJbmRleCkpIHtcbiAgICAgICAgdHVwbGUudmlldyA9IHRoaXMuX3ZpZXdDb250YWluZXIuZGV0YWNoKHR1cGxlLnJlY29yZC5wcmV2aW91c0luZGV4KTtcbiAgICAgICAgbW92ZWRUdXBsZXMucHVzaCh0dXBsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl92aWV3Q29udGFpbmVyLnJlbW92ZSh0dXBsZS5yZWNvcmQucHJldmlvdXNJbmRleCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtb3ZlZFR1cGxlcztcbiAgfVxuXG4gIHByaXZhdGUgX2J1bGtJbnNlcnQodHVwbGVzOiBSZWNvcmRWaWV3VHVwbGVbXSk6IFJlY29yZFZpZXdUdXBsZVtdIHtcbiAgICB0dXBsZXMuc29ydCgoYSwgYikgPT4gYS5yZWNvcmQuY3VycmVudEluZGV4IC0gYi5yZWNvcmQuY3VycmVudEluZGV4KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHR1cGxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHR1cGxlID0gdHVwbGVzW2ldO1xuICAgICAgaWYgKGlzUHJlc2VudCh0dXBsZS52aWV3KSkge1xuICAgICAgICB0aGlzLl92aWV3Q29udGFpbmVyLmluc2VydCh0dXBsZS52aWV3LCB0dXBsZS5yZWNvcmQuY3VycmVudEluZGV4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHR1cGxlLnZpZXcgPVxuICAgICAgICAgICAgdGhpcy5fdmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy5fdGVtcGxhdGVSZWYsIHR1cGxlLnJlY29yZC5jdXJyZW50SW5kZXgpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHVwbGVzO1xuICB9XG59XG5cbmNsYXNzIFJlY29yZFZpZXdUdXBsZSB7XG4gIHZpZXc6IEVtYmVkZGVkVmlld1JlZjtcbiAgcmVjb3JkOiBhbnk7XG4gIGNvbnN0cnVjdG9yKHJlY29yZDogYW55LCB2aWV3OiBFbWJlZGRlZFZpZXdSZWYpIHtcbiAgICB0aGlzLnJlY29yZCA9IHJlY29yZDtcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
