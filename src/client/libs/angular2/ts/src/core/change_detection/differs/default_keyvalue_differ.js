System.register(['angular2/src/facade/collection', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions'], function(exports_1, context_1) {
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
    var collection_1, lang_1, exceptions_1;
    var DefaultKeyValueDifferFactory, DefaultKeyValueDiffer, KeyValueChangeRecord;
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
            DefaultKeyValueDifferFactory = (function () {
                function DefaultKeyValueDifferFactory() {
                }
                DefaultKeyValueDifferFactory.prototype.supports = function (obj) { return obj instanceof Map || lang_1.isJsObject(obj); };
                DefaultKeyValueDifferFactory.prototype.create = function (cdRef) { return new DefaultKeyValueDiffer(); };
                DefaultKeyValueDifferFactory = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [])
                ], DefaultKeyValueDifferFactory);
                return DefaultKeyValueDifferFactory;
            }());
            exports_1("DefaultKeyValueDifferFactory", DefaultKeyValueDifferFactory);
            DefaultKeyValueDiffer = (function () {
                function DefaultKeyValueDiffer() {
                    this._records = new Map();
                    this._mapHead = null;
                    this._previousMapHead = null;
                    this._changesHead = null;
                    this._changesTail = null;
                    this._additionsHead = null;
                    this._additionsTail = null;
                    this._removalsHead = null;
                    this._removalsTail = null;
                }
                Object.defineProperty(DefaultKeyValueDiffer.prototype, "isDirty", {
                    get: function () {
                        return this._additionsHead !== null || this._changesHead !== null ||
                            this._removalsHead !== null;
                    },
                    enumerable: true,
                    configurable: true
                });
                DefaultKeyValueDiffer.prototype.forEachItem = function (fn) {
                    var record;
                    for (record = this._mapHead; record !== null; record = record._next) {
                        fn(record);
                    }
                };
                DefaultKeyValueDiffer.prototype.forEachPreviousItem = function (fn) {
                    var record;
                    for (record = this._previousMapHead; record !== null; record = record._nextPrevious) {
                        fn(record);
                    }
                };
                DefaultKeyValueDiffer.prototype.forEachChangedItem = function (fn) {
                    var record;
                    for (record = this._changesHead; record !== null; record = record._nextChanged) {
                        fn(record);
                    }
                };
                DefaultKeyValueDiffer.prototype.forEachAddedItem = function (fn) {
                    var record;
                    for (record = this._additionsHead; record !== null; record = record._nextAdded) {
                        fn(record);
                    }
                };
                DefaultKeyValueDiffer.prototype.forEachRemovedItem = function (fn) {
                    var record;
                    for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
                        fn(record);
                    }
                };
                DefaultKeyValueDiffer.prototype.diff = function (map) {
                    if (lang_1.isBlank(map))
                        map = collection_1.MapWrapper.createFromPairs([]);
                    if (!(map instanceof Map || lang_1.isJsObject(map))) {
                        throw new exceptions_1.BaseException("Error trying to diff '" + map + "'");
                    }
                    if (this.check(map)) {
                        return this;
                    }
                    else {
                        return null;
                    }
                };
                DefaultKeyValueDiffer.prototype.onDestroy = function () { };
                DefaultKeyValueDiffer.prototype.check = function (map) {
                    var _this = this;
                    this._reset();
                    var records = this._records;
                    var oldSeqRecord = this._mapHead;
                    var lastOldSeqRecord = null;
                    var lastNewSeqRecord = null;
                    var seqChanged = false;
                    this._forEach(map, function (value, key) {
                        var newSeqRecord;
                        if (oldSeqRecord !== null && key === oldSeqRecord.key) {
                            newSeqRecord = oldSeqRecord;
                            if (!lang_1.looseIdentical(value, oldSeqRecord.currentValue)) {
                                oldSeqRecord.previousValue = oldSeqRecord.currentValue;
                                oldSeqRecord.currentValue = value;
                                _this._addToChanges(oldSeqRecord);
                            }
                        }
                        else {
                            seqChanged = true;
                            if (oldSeqRecord !== null) {
                                oldSeqRecord._next = null;
                                _this._removeFromSeq(lastOldSeqRecord, oldSeqRecord);
                                _this._addToRemovals(oldSeqRecord);
                            }
                            if (records.has(key)) {
                                newSeqRecord = records.get(key);
                            }
                            else {
                                newSeqRecord = new KeyValueChangeRecord(key);
                                records.set(key, newSeqRecord);
                                newSeqRecord.currentValue = value;
                                _this._addToAdditions(newSeqRecord);
                            }
                        }
                        if (seqChanged) {
                            if (_this._isInRemovals(newSeqRecord)) {
                                _this._removeFromRemovals(newSeqRecord);
                            }
                            if (lastNewSeqRecord == null) {
                                _this._mapHead = newSeqRecord;
                            }
                            else {
                                lastNewSeqRecord._next = newSeqRecord;
                            }
                        }
                        lastOldSeqRecord = oldSeqRecord;
                        lastNewSeqRecord = newSeqRecord;
                        oldSeqRecord = oldSeqRecord === null ? null : oldSeqRecord._next;
                    });
                    this._truncate(lastOldSeqRecord, oldSeqRecord);
                    return this.isDirty;
                };
                /** @internal */
                DefaultKeyValueDiffer.prototype._reset = function () {
                    if (this.isDirty) {
                        var record;
                        // Record the state of the mapping
                        for (record = this._previousMapHead = this._mapHead; record !== null; record = record._next) {
                            record._nextPrevious = record._next;
                        }
                        for (record = this._changesHead; record !== null; record = record._nextChanged) {
                            record.previousValue = record.currentValue;
                        }
                        for (record = this._additionsHead; record != null; record = record._nextAdded) {
                            record.previousValue = record.currentValue;
                        }
                        // todo(vicb) once assert is supported
                        // assert(() {
                        //  var r = _changesHead;
                        //  while (r != null) {
                        //    var nextRecord = r._nextChanged;
                        //    r._nextChanged = null;
                        //    r = nextRecord;
                        //  }
                        //
                        //  r = _additionsHead;
                        //  while (r != null) {
                        //    var nextRecord = r._nextAdded;
                        //    r._nextAdded = null;
                        //    r = nextRecord;
                        //  }
                        //
                        //  r = _removalsHead;
                        //  while (r != null) {
                        //    var nextRecord = r._nextRemoved;
                        //    r._nextRemoved = null;
                        //    r = nextRecord;
                        //  }
                        //
                        //  return true;
                        //});
                        this._changesHead = this._changesTail = null;
                        this._additionsHead = this._additionsTail = null;
                        this._removalsHead = this._removalsTail = null;
                    }
                };
                /** @internal */
                DefaultKeyValueDiffer.prototype._truncate = function (lastRecord, record) {
                    while (record !== null) {
                        if (lastRecord === null) {
                            this._mapHead = null;
                        }
                        else {
                            lastRecord._next = null;
                        }
                        var nextRecord = record._next;
                        // todo(vicb) assert
                        // assert((() {
                        //  record._next = null;
                        //  return true;
                        //}));
                        this._addToRemovals(record);
                        lastRecord = record;
                        record = nextRecord;
                    }
                    for (var rec = this._removalsHead; rec !== null; rec = rec._nextRemoved) {
                        rec.previousValue = rec.currentValue;
                        rec.currentValue = null;
                        this._records.delete(rec.key);
                    }
                };
                /** @internal */
                DefaultKeyValueDiffer.prototype._isInRemovals = function (record) {
                    return record === this._removalsHead || record._nextRemoved !== null ||
                        record._prevRemoved !== null;
                };
                /** @internal */
                DefaultKeyValueDiffer.prototype._addToRemovals = function (record) {
                    // todo(vicb) assert
                    // assert(record._next == null);
                    // assert(record._nextAdded == null);
                    // assert(record._nextChanged == null);
                    // assert(record._nextRemoved == null);
                    // assert(record._prevRemoved == null);
                    if (this._removalsHead === null) {
                        this._removalsHead = this._removalsTail = record;
                    }
                    else {
                        this._removalsTail._nextRemoved = record;
                        record._prevRemoved = this._removalsTail;
                        this._removalsTail = record;
                    }
                };
                /** @internal */
                DefaultKeyValueDiffer.prototype._removeFromSeq = function (prev, record) {
                    var next = record._next;
                    if (prev === null) {
                        this._mapHead = next;
                    }
                    else {
                        prev._next = next;
                    }
                    // todo(vicb) assert
                    // assert((() {
                    //  record._next = null;
                    //  return true;
                    //})());
                };
                /** @internal */
                DefaultKeyValueDiffer.prototype._removeFromRemovals = function (record) {
                    // todo(vicb) assert
                    // assert(record._next == null);
                    // assert(record._nextAdded == null);
                    // assert(record._nextChanged == null);
                    var prev = record._prevRemoved;
                    var next = record._nextRemoved;
                    if (prev === null) {
                        this._removalsHead = next;
                    }
                    else {
                        prev._nextRemoved = next;
                    }
                    if (next === null) {
                        this._removalsTail = prev;
                    }
                    else {
                        next._prevRemoved = prev;
                    }
                    record._prevRemoved = record._nextRemoved = null;
                };
                /** @internal */
                DefaultKeyValueDiffer.prototype._addToAdditions = function (record) {
                    // todo(vicb): assert
                    // assert(record._next == null);
                    // assert(record._nextAdded == null);
                    // assert(record._nextChanged == null);
                    // assert(record._nextRemoved == null);
                    // assert(record._prevRemoved == null);
                    if (this._additionsHead === null) {
                        this._additionsHead = this._additionsTail = record;
                    }
                    else {
                        this._additionsTail._nextAdded = record;
                        this._additionsTail = record;
                    }
                };
                /** @internal */
                DefaultKeyValueDiffer.prototype._addToChanges = function (record) {
                    // todo(vicb) assert
                    // assert(record._nextAdded == null);
                    // assert(record._nextChanged == null);
                    // assert(record._nextRemoved == null);
                    // assert(record._prevRemoved == null);
                    if (this._changesHead === null) {
                        this._changesHead = this._changesTail = record;
                    }
                    else {
                        this._changesTail._nextChanged = record;
                        this._changesTail = record;
                    }
                };
                DefaultKeyValueDiffer.prototype.toString = function () {
                    var items = [];
                    var previous = [];
                    var changes = [];
                    var additions = [];
                    var removals = [];
                    var record;
                    for (record = this._mapHead; record !== null; record = record._next) {
                        items.push(lang_1.stringify(record));
                    }
                    for (record = this._previousMapHead; record !== null; record = record._nextPrevious) {
                        previous.push(lang_1.stringify(record));
                    }
                    for (record = this._changesHead; record !== null; record = record._nextChanged) {
                        changes.push(lang_1.stringify(record));
                    }
                    for (record = this._additionsHead; record !== null; record = record._nextAdded) {
                        additions.push(lang_1.stringify(record));
                    }
                    for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
                        removals.push(lang_1.stringify(record));
                    }
                    return "map: " + items.join(', ') + "\n" + "previous: " + previous.join(', ') + "\n" +
                        "additions: " + additions.join(', ') + "\n" + "changes: " + changes.join(', ') + "\n" +
                        "removals: " + removals.join(', ') + "\n";
                };
                /** @internal */
                DefaultKeyValueDiffer.prototype._forEach = function (obj, fn) {
                    if (obj instanceof Map) {
                        obj.forEach(fn);
                    }
                    else {
                        collection_1.StringMapWrapper.forEach(obj, fn);
                    }
                };
                return DefaultKeyValueDiffer;
            }());
            exports_1("DefaultKeyValueDiffer", DefaultKeyValueDiffer);
            KeyValueChangeRecord = (function () {
                function KeyValueChangeRecord(key) {
                    this.key = key;
                    this.previousValue = null;
                    this.currentValue = null;
                    /** @internal */
                    this._nextPrevious = null;
                    /** @internal */
                    this._next = null;
                    /** @internal */
                    this._nextAdded = null;
                    /** @internal */
                    this._nextRemoved = null;
                    /** @internal */
                    this._prevRemoved = null;
                    /** @internal */
                    this._nextChanged = null;
                }
                KeyValueChangeRecord.prototype.toString = function () {
                    return lang_1.looseIdentical(this.previousValue, this.currentValue) ?
                        lang_1.stringify(this.key) :
                        (lang_1.stringify(this.key) + '[' + lang_1.stringify(this.previousValue) + '->' +
                            lang_1.stringify(this.currentValue) + ']');
                };
                return KeyValueChangeRecord;
            }());
            exports_1("KeyValueChangeRecord", KeyValueChangeRecord);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9kaWZmZXJzL2RlZmF1bHRfa2V5dmFsdWVfZGlmZmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBT0E7Z0JBQUE7Z0JBSUEsQ0FBQztnQkFIQywrQ0FBUSxHQUFSLFVBQVMsR0FBUSxJQUFhLE1BQU0sQ0FBQyxHQUFHLFlBQVksR0FBRyxJQUFJLGlCQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU3RSw2Q0FBTSxHQUFOLFVBQU8sS0FBd0IsSUFBb0IsTUFBTSxDQUFDLElBQUkscUJBQXFCLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBSjFGO29CQUFDLFlBQUssRUFBRTs7Z0RBQUE7Z0JBS1IsbUNBQUM7WUFBRCxDQUpBLEFBSUMsSUFBQTtZQUpELHVFQUlDLENBQUE7WUFFRDtnQkFBQTtvQkFDVSxhQUFRLEdBQWtCLElBQUksR0FBRyxFQUFFLENBQUM7b0JBQ3BDLGFBQVEsR0FBeUIsSUFBSSxDQUFDO29CQUN0QyxxQkFBZ0IsR0FBeUIsSUFBSSxDQUFDO29CQUM5QyxpQkFBWSxHQUF5QixJQUFJLENBQUM7b0JBQzFDLGlCQUFZLEdBQXlCLElBQUksQ0FBQztvQkFDMUMsbUJBQWMsR0FBeUIsSUFBSSxDQUFDO29CQUM1QyxtQkFBYyxHQUF5QixJQUFJLENBQUM7b0JBQzVDLGtCQUFhLEdBQXlCLElBQUksQ0FBQztvQkFDM0Msa0JBQWEsR0FBeUIsSUFBSSxDQUFDO2dCQXVUckQsQ0FBQztnQkFyVEMsc0JBQUksMENBQU87eUJBQVg7d0JBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSTs0QkFDMUQsSUFBSSxDQUFDLGFBQWEsS0FBSyxJQUFJLENBQUM7b0JBQ3JDLENBQUM7OzttQkFBQTtnQkFFRCwyQ0FB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QUNoRSxnQkFBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsQ0FBQztnQkFDSCwyQkFBQztZQUFELENBekJBLEFBeUJDLElBQUE7WUF6QkQsdURBeUJDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2RpZmZlcnMvZGVmYXVsdF9rZXl2YWx1ZV9kaWZmZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01hcFdyYXBwZXIsIFN0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge3N0cmluZ2lmeSwgbG9vc2VJZGVudGljYWwsIGlzSnNPYmplY3QsIENPTlNULCBpc0JsYW5rfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnLi4vY2hhbmdlX2RldGVjdG9yX3JlZic7XG5pbXBvcnQge0tleVZhbHVlRGlmZmVyLCBLZXlWYWx1ZURpZmZlckZhY3Rvcnl9IGZyb20gJy4uL2RpZmZlcnMva2V5dmFsdWVfZGlmZmVycyc7XG5cbkBDT05TVCgpXG5leHBvcnQgY2xhc3MgRGVmYXVsdEtleVZhbHVlRGlmZmVyRmFjdG9yeSBpbXBsZW1lbnRzIEtleVZhbHVlRGlmZmVyRmFjdG9yeSB7XG4gIHN1cHBvcnRzKG9iajogYW55KTogYm9vbGVhbiB7IHJldHVybiBvYmogaW5zdGFuY2VvZiBNYXAgfHwgaXNKc09iamVjdChvYmopOyB9XG5cbiAgY3JlYXRlKGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZik6IEtleVZhbHVlRGlmZmVyIHsgcmV0dXJuIG5ldyBEZWZhdWx0S2V5VmFsdWVEaWZmZXIoKTsgfVxufVxuXG5leHBvcnQgY2xhc3MgRGVmYXVsdEtleVZhbHVlRGlmZmVyIGltcGxlbWVudHMgS2V5VmFsdWVEaWZmZXIge1xuICBwcml2YXRlIF9yZWNvcmRzOiBNYXA8YW55LCBhbnk+ID0gbmV3IE1hcCgpO1xuICBwcml2YXRlIF9tYXBIZWFkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZCA9IG51bGw7XG4gIHByaXZhdGUgX3ByZXZpb3VzTWFwSGVhZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQgPSBudWxsO1xuICBwcml2YXRlIF9jaGFuZ2VzSGVhZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQgPSBudWxsO1xuICBwcml2YXRlIF9jaGFuZ2VzVGFpbDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQgPSBudWxsO1xuICBwcml2YXRlIF9hZGRpdGlvbnNIZWFkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZCA9IG51bGw7XG4gIHByaXZhdGUgX2FkZGl0aW9uc1RhaWw6IEtleVZhbHVlQ2hhbmdlUmVjb3JkID0gbnVsbDtcbiAgcHJpdmF0ZSBfcmVtb3ZhbHNIZWFkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZCA9IG51bGw7XG4gIHByaXZhdGUgX3JlbW92YWxzVGFpbDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQgPSBudWxsO1xuXG4gIGdldCBpc0RpcnR5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9hZGRpdGlvbnNIZWFkICE9PSBudWxsIHx8IHRoaXMuX2NoYW5nZXNIZWFkICE9PSBudWxsIHx8XG4gICAgICAgICAgIHRoaXMuX3JlbW92YWxzSGVhZCAhPT0gbnVsbDtcbiAgfVxuXG4gIGZvckVhY2hJdGVtKGZuOiBGdW5jdGlvbikge1xuICAgIHZhciByZWNvcmQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkO1xuICAgIGZvciAocmVjb3JkID0gdGhpcy5fbWFwSGVhZDsgcmVjb3JkICE9PSBudWxsOyByZWNvcmQgPSByZWNvcmQuX25leHQpIHtcbiAgICAgIGZuKHJlY29yZCk7XG4gICAgfVxuICB9XG5cbiAgZm9yRWFjaFByZXZpb3VzSXRlbShmbjogRnVuY3Rpb24pIHtcbiAgICB2YXIgcmVjb3JkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZDtcbiAgICBmb3IgKHJlY29yZCA9IHRoaXMuX3ByZXZpb3VzTWFwSGVhZDsgcmVjb3JkICE9PSBudWxsOyByZWNvcmQgPSByZWNvcmQuX25leHRQcmV2aW91cykge1xuICAgICAgZm4ocmVjb3JkKTtcbiAgICB9XG4gIH1cblxuICBmb3JFYWNoQ2hhbmdlZEl0ZW0oZm46IEZ1bmN0aW9uKSB7XG4gICAgdmFyIHJlY29yZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQ7XG4gICAgZm9yIChyZWNvcmQgPSB0aGlzLl9jaGFuZ2VzSGVhZDsgcmVjb3JkICE9PSBudWxsOyByZWNvcmQgPSByZWNvcmQuX25leHRDaGFuZ2VkKSB7XG4gICAgICBmbihyZWNvcmQpO1xuICAgIH1cbiAgfVxuXG4gIGZvckVhY2hBZGRlZEl0ZW0oZm46IEZ1bmN0aW9uKSB7XG4gICAgdmFyIHJlY29yZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQ7XG4gICAgZm9yIChyZWNvcmQgPSB0aGlzLl9hZGRpdGlvbnNIZWFkOyByZWNvcmQgIT09IG51bGw7IHJlY29yZCA9IHJlY29yZC5fbmV4dEFkZGVkKSB7XG4gICAgICBmbihyZWNvcmQpO1xuICAgIH1cbiAgfVxuXG4gIGZvckVhY2hSZW1vdmVkSXRlbShmbjogRnVuY3Rpb24pIHtcbiAgICB2YXIgcmVjb3JkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZDtcbiAgICBmb3IgKHJlY29yZCA9IHRoaXMuX3JlbW92YWxzSGVhZDsgcmVjb3JkICE9PSBudWxsOyByZWNvcmQgPSByZWNvcmQuX25leHRSZW1vdmVkKSB7XG4gICAgICBmbihyZWNvcmQpO1xuICAgIH1cbiAgfVxuXG4gIGRpZmYobWFwOiBNYXA8YW55LCBhbnk+KTogYW55IHtcbiAgICBpZiAoaXNCbGFuayhtYXApKSBtYXAgPSBNYXBXcmFwcGVyLmNyZWF0ZUZyb21QYWlycyhbXSk7XG4gICAgaWYgKCEobWFwIGluc3RhbmNlb2YgTWFwIHx8IGlzSnNPYmplY3QobWFwKSkpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBFcnJvciB0cnlpbmcgdG8gZGlmZiAnJHttYXB9J2ApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNoZWNrKG1hcCkpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBvbkRlc3Ryb3koKSB7fVxuXG4gIGNoZWNrKG1hcDogTWFwPGFueSwgYW55Pik6IGJvb2xlYW4ge1xuICAgIHRoaXMuX3Jlc2V0KCk7XG4gICAgdmFyIHJlY29yZHMgPSB0aGlzLl9yZWNvcmRzO1xuICAgIHZhciBvbGRTZXFSZWNvcmQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkID0gdGhpcy5fbWFwSGVhZDtcbiAgICB2YXIgbGFzdE9sZFNlcVJlY29yZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQgPSBudWxsO1xuICAgIHZhciBsYXN0TmV3U2VxUmVjb3JkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZCA9IG51bGw7XG4gICAgdmFyIHNlcUNoYW5nZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHRoaXMuX2ZvckVhY2gobWFwLCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgdmFyIG5ld1NlcVJlY29yZDtcbiAgICAgIGlmIChvbGRTZXFSZWNvcmQgIT09IG51bGwgJiYga2V5ID09PSBvbGRTZXFSZWNvcmQua2V5KSB7XG4gICAgICAgIG5ld1NlcVJlY29yZCA9IG9sZFNlcVJlY29yZDtcbiAgICAgICAgaWYgKCFsb29zZUlkZW50aWNhbCh2YWx1ZSwgb2xkU2VxUmVjb3JkLmN1cnJlbnRWYWx1ZSkpIHtcbiAgICAgICAgICBvbGRTZXFSZWNvcmQucHJldmlvdXNWYWx1ZSA9IG9sZFNlcVJlY29yZC5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgb2xkU2VxUmVjb3JkLmN1cnJlbnRWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgIHRoaXMuX2FkZFRvQ2hhbmdlcyhvbGRTZXFSZWNvcmQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXFDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgaWYgKG9sZFNlcVJlY29yZCAhPT0gbnVsbCkge1xuICAgICAgICAgIG9sZFNlcVJlY29yZC5fbmV4dCA9IG51bGw7XG4gICAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbVNlcShsYXN0T2xkU2VxUmVjb3JkLCBvbGRTZXFSZWNvcmQpO1xuICAgICAgICAgIHRoaXMuX2FkZFRvUmVtb3ZhbHMob2xkU2VxUmVjb3JkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVjb3Jkcy5oYXMoa2V5KSkge1xuICAgICAgICAgIG5ld1NlcVJlY29yZCA9IHJlY29yZHMuZ2V0KGtleSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3U2VxUmVjb3JkID0gbmV3IEtleVZhbHVlQ2hhbmdlUmVjb3JkKGtleSk7XG4gICAgICAgICAgcmVjb3Jkcy5zZXQoa2V5LCBuZXdTZXFSZWNvcmQpO1xuICAgICAgICAgIG5ld1NlcVJlY29yZC5jdXJyZW50VmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICB0aGlzLl9hZGRUb0FkZGl0aW9ucyhuZXdTZXFSZWNvcmQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzZXFDaGFuZ2VkKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0luUmVtb3ZhbHMobmV3U2VxUmVjb3JkKSkge1xuICAgICAgICAgIHRoaXMuX3JlbW92ZUZyb21SZW1vdmFscyhuZXdTZXFSZWNvcmQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsYXN0TmV3U2VxUmVjb3JkID09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLl9tYXBIZWFkID0gbmV3U2VxUmVjb3JkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxhc3ROZXdTZXFSZWNvcmQuX25leHQgPSBuZXdTZXFSZWNvcmQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxhc3RPbGRTZXFSZWNvcmQgPSBvbGRTZXFSZWNvcmQ7XG4gICAgICBsYXN0TmV3U2VxUmVjb3JkID0gbmV3U2VxUmVjb3JkO1xuICAgICAgb2xkU2VxUmVjb3JkID0gb2xkU2VxUmVjb3JkID09PSBudWxsID8gbnVsbCA6IG9sZFNlcVJlY29yZC5fbmV4dDtcbiAgICB9KTtcbiAgICB0aGlzLl90cnVuY2F0ZShsYXN0T2xkU2VxUmVjb3JkLCBvbGRTZXFSZWNvcmQpO1xuICAgIHJldHVybiB0aGlzLmlzRGlydHk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9yZXNldCgpIHtcbiAgICBpZiAodGhpcy5pc0RpcnR5KSB7XG4gICAgICB2YXIgcmVjb3JkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZDtcbiAgICAgIC8vIFJlY29yZCB0aGUgc3RhdGUgb2YgdGhlIG1hcHBpbmdcbiAgICAgIGZvciAocmVjb3JkID0gdGhpcy5fcHJldmlvdXNNYXBIZWFkID0gdGhpcy5fbWFwSGVhZDsgcmVjb3JkICE9PSBudWxsOyByZWNvcmQgPSByZWNvcmQuX25leHQpIHtcbiAgICAgICAgcmVjb3JkLl9uZXh0UHJldmlvdXMgPSByZWNvcmQuX25leHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAocmVjb3JkID0gdGhpcy5fY2hhbmdlc0hlYWQ7IHJlY29yZCAhPT0gbnVsbDsgcmVjb3JkID0gcmVjb3JkLl9uZXh0Q2hhbmdlZCkge1xuICAgICAgICByZWNvcmQucHJldmlvdXNWYWx1ZSA9IHJlY29yZC5jdXJyZW50VmFsdWU7XG4gICAgICB9XG5cbiAgICAgIGZvciAocmVjb3JkID0gdGhpcy5fYWRkaXRpb25zSGVhZDsgcmVjb3JkICE9IG51bGw7IHJlY29yZCA9IHJlY29yZC5fbmV4dEFkZGVkKSB7XG4gICAgICAgIHJlY29yZC5wcmV2aW91c1ZhbHVlID0gcmVjb3JkLmN1cnJlbnRWYWx1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gdG9kbyh2aWNiKSBvbmNlIGFzc2VydCBpcyBzdXBwb3J0ZWRcbiAgICAgIC8vIGFzc2VydCgoKSB7XG4gICAgICAvLyAgdmFyIHIgPSBfY2hhbmdlc0hlYWQ7XG4gICAgICAvLyAgd2hpbGUgKHIgIT0gbnVsbCkge1xuICAgICAgLy8gICAgdmFyIG5leHRSZWNvcmQgPSByLl9uZXh0Q2hhbmdlZDtcbiAgICAgIC8vICAgIHIuX25leHRDaGFuZ2VkID0gbnVsbDtcbiAgICAgIC8vICAgIHIgPSBuZXh0UmVjb3JkO1xuICAgICAgLy8gIH1cbiAgICAgIC8vXG4gICAgICAvLyAgciA9IF9hZGRpdGlvbnNIZWFkO1xuICAgICAgLy8gIHdoaWxlIChyICE9IG51bGwpIHtcbiAgICAgIC8vICAgIHZhciBuZXh0UmVjb3JkID0gci5fbmV4dEFkZGVkO1xuICAgICAgLy8gICAgci5fbmV4dEFkZGVkID0gbnVsbDtcbiAgICAgIC8vICAgIHIgPSBuZXh0UmVjb3JkO1xuICAgICAgLy8gIH1cbiAgICAgIC8vXG4gICAgICAvLyAgciA9IF9yZW1vdmFsc0hlYWQ7XG4gICAgICAvLyAgd2hpbGUgKHIgIT0gbnVsbCkge1xuICAgICAgLy8gICAgdmFyIG5leHRSZWNvcmQgPSByLl9uZXh0UmVtb3ZlZDtcbiAgICAgIC8vICAgIHIuX25leHRSZW1vdmVkID0gbnVsbDtcbiAgICAgIC8vICAgIHIgPSBuZXh0UmVjb3JkO1xuICAgICAgLy8gIH1cbiAgICAgIC8vXG4gICAgICAvLyAgcmV0dXJuIHRydWU7XG4gICAgICAvL30pO1xuICAgICAgdGhpcy5fY2hhbmdlc0hlYWQgPSB0aGlzLl9jaGFuZ2VzVGFpbCA9IG51bGw7XG4gICAgICB0aGlzLl9hZGRpdGlvbnNIZWFkID0gdGhpcy5fYWRkaXRpb25zVGFpbCA9IG51bGw7XG4gICAgICB0aGlzLl9yZW1vdmFsc0hlYWQgPSB0aGlzLl9yZW1vdmFsc1RhaWwgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3RydW5jYXRlKGxhc3RSZWNvcmQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkLCByZWNvcmQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkKSB7XG4gICAgd2hpbGUgKHJlY29yZCAhPT0gbnVsbCkge1xuICAgICAgaWYgKGxhc3RSZWNvcmQgPT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5fbWFwSGVhZCA9IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsYXN0UmVjb3JkLl9uZXh0ID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHZhciBuZXh0UmVjb3JkID0gcmVjb3JkLl9uZXh0O1xuICAgICAgLy8gdG9kbyh2aWNiKSBhc3NlcnRcbiAgICAgIC8vIGFzc2VydCgoKCkge1xuICAgICAgLy8gIHJlY29yZC5fbmV4dCA9IG51bGw7XG4gICAgICAvLyAgcmV0dXJuIHRydWU7XG4gICAgICAvL30pKTtcbiAgICAgIHRoaXMuX2FkZFRvUmVtb3ZhbHMocmVjb3JkKTtcbiAgICAgIGxhc3RSZWNvcmQgPSByZWNvcmQ7XG4gICAgICByZWNvcmQgPSBuZXh0UmVjb3JkO1xuICAgIH1cblxuICAgIGZvciAodmFyIHJlYzogS2V5VmFsdWVDaGFuZ2VSZWNvcmQgPSB0aGlzLl9yZW1vdmFsc0hlYWQ7IHJlYyAhPT0gbnVsbDsgcmVjID0gcmVjLl9uZXh0UmVtb3ZlZCkge1xuICAgICAgcmVjLnByZXZpb3VzVmFsdWUgPSByZWMuY3VycmVudFZhbHVlO1xuICAgICAgcmVjLmN1cnJlbnRWYWx1ZSA9IG51bGw7XG4gICAgICB0aGlzLl9yZWNvcmRzLmRlbGV0ZShyZWMua2V5KTtcbiAgICB9XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9pc0luUmVtb3ZhbHMocmVjb3JkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZCkge1xuICAgIHJldHVybiByZWNvcmQgPT09IHRoaXMuX3JlbW92YWxzSGVhZCB8fCByZWNvcmQuX25leHRSZW1vdmVkICE9PSBudWxsIHx8XG4gICAgICAgICAgIHJlY29yZC5fcHJldlJlbW92ZWQgIT09IG51bGw7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9hZGRUb1JlbW92YWxzKHJlY29yZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQpIHtcbiAgICAvLyB0b2RvKHZpY2IpIGFzc2VydFxuICAgIC8vIGFzc2VydChyZWNvcmQuX25leHQgPT0gbnVsbCk7XG4gICAgLy8gYXNzZXJ0KHJlY29yZC5fbmV4dEFkZGVkID09IG51bGwpO1xuICAgIC8vIGFzc2VydChyZWNvcmQuX25leHRDaGFuZ2VkID09IG51bGwpO1xuICAgIC8vIGFzc2VydChyZWNvcmQuX25leHRSZW1vdmVkID09IG51bGwpO1xuICAgIC8vIGFzc2VydChyZWNvcmQuX3ByZXZSZW1vdmVkID09IG51bGwpO1xuICAgIGlmICh0aGlzLl9yZW1vdmFsc0hlYWQgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbW92YWxzSGVhZCA9IHRoaXMuX3JlbW92YWxzVGFpbCA9IHJlY29yZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVtb3ZhbHNUYWlsLl9uZXh0UmVtb3ZlZCA9IHJlY29yZDtcbiAgICAgIHJlY29yZC5fcHJldlJlbW92ZWQgPSB0aGlzLl9yZW1vdmFsc1RhaWw7XG4gICAgICB0aGlzLl9yZW1vdmFsc1RhaWwgPSByZWNvcmQ7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcmVtb3ZlRnJvbVNlcShwcmV2OiBLZXlWYWx1ZUNoYW5nZVJlY29yZCwgcmVjb3JkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZCkge1xuICAgIHZhciBuZXh0ID0gcmVjb3JkLl9uZXh0O1xuICAgIGlmIChwcmV2ID09PSBudWxsKSB7XG4gICAgICB0aGlzLl9tYXBIZWFkID0gbmV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJldi5fbmV4dCA9IG5leHQ7XG4gICAgfVxuICAgIC8vIHRvZG8odmljYikgYXNzZXJ0XG4gICAgLy8gYXNzZXJ0KCgoKSB7XG4gICAgLy8gIHJlY29yZC5fbmV4dCA9IG51bGw7XG4gICAgLy8gIHJldHVybiB0cnVlO1xuICAgIC8vfSkoKSk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9yZW1vdmVGcm9tUmVtb3ZhbHMocmVjb3JkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZCkge1xuICAgIC8vIHRvZG8odmljYikgYXNzZXJ0XG4gICAgLy8gYXNzZXJ0KHJlY29yZC5fbmV4dCA9PSBudWxsKTtcbiAgICAvLyBhc3NlcnQocmVjb3JkLl9uZXh0QWRkZWQgPT0gbnVsbCk7XG4gICAgLy8gYXNzZXJ0KHJlY29yZC5fbmV4dENoYW5nZWQgPT0gbnVsbCk7XG5cbiAgICB2YXIgcHJldiA9IHJlY29yZC5fcHJldlJlbW92ZWQ7XG4gICAgdmFyIG5leHQgPSByZWNvcmQuX25leHRSZW1vdmVkO1xuICAgIGlmIChwcmV2ID09PSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW1vdmFsc0hlYWQgPSBuZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICBwcmV2Ll9uZXh0UmVtb3ZlZCA9IG5leHQ7XG4gICAgfVxuICAgIGlmIChuZXh0ID09PSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW1vdmFsc1RhaWwgPSBwcmV2O1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0Ll9wcmV2UmVtb3ZlZCA9IHByZXY7XG4gICAgfVxuICAgIHJlY29yZC5fcHJldlJlbW92ZWQgPSByZWNvcmQuX25leHRSZW1vdmVkID0gbnVsbDtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2FkZFRvQWRkaXRpb25zKHJlY29yZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQpIHtcbiAgICAvLyB0b2RvKHZpY2IpOiBhc3NlcnRcbiAgICAvLyBhc3NlcnQocmVjb3JkLl9uZXh0ID09IG51bGwpO1xuICAgIC8vIGFzc2VydChyZWNvcmQuX25leHRBZGRlZCA9PSBudWxsKTtcbiAgICAvLyBhc3NlcnQocmVjb3JkLl9uZXh0Q2hhbmdlZCA9PSBudWxsKTtcbiAgICAvLyBhc3NlcnQocmVjb3JkLl9uZXh0UmVtb3ZlZCA9PSBudWxsKTtcbiAgICAvLyBhc3NlcnQocmVjb3JkLl9wcmV2UmVtb3ZlZCA9PSBudWxsKTtcbiAgICBpZiAodGhpcy5fYWRkaXRpb25zSGVhZCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5fYWRkaXRpb25zSGVhZCA9IHRoaXMuX2FkZGl0aW9uc1RhaWwgPSByZWNvcmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2FkZGl0aW9uc1RhaWwuX25leHRBZGRlZCA9IHJlY29yZDtcbiAgICAgIHRoaXMuX2FkZGl0aW9uc1RhaWwgPSByZWNvcmQ7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfYWRkVG9DaGFuZ2VzKHJlY29yZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQpIHtcbiAgICAvLyB0b2RvKHZpY2IpIGFzc2VydFxuICAgIC8vIGFzc2VydChyZWNvcmQuX25leHRBZGRlZCA9PSBudWxsKTtcbiAgICAvLyBhc3NlcnQocmVjb3JkLl9uZXh0Q2hhbmdlZCA9PSBudWxsKTtcbiAgICAvLyBhc3NlcnQocmVjb3JkLl9uZXh0UmVtb3ZlZCA9PSBudWxsKTtcbiAgICAvLyBhc3NlcnQocmVjb3JkLl9wcmV2UmVtb3ZlZCA9PSBudWxsKTtcbiAgICBpZiAodGhpcy5fY2hhbmdlc0hlYWQgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuX2NoYW5nZXNIZWFkID0gdGhpcy5fY2hhbmdlc1RhaWwgPSByZWNvcmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2NoYW5nZXNUYWlsLl9uZXh0Q2hhbmdlZCA9IHJlY29yZDtcbiAgICAgIHRoaXMuX2NoYW5nZXNUYWlsID0gcmVjb3JkO1xuICAgIH1cbiAgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgdmFyIGl0ZW1zID0gW107XG4gICAgdmFyIHByZXZpb3VzID0gW107XG4gICAgdmFyIGNoYW5nZXMgPSBbXTtcbiAgICB2YXIgYWRkaXRpb25zID0gW107XG4gICAgdmFyIHJlbW92YWxzID0gW107XG4gICAgdmFyIHJlY29yZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQ7XG5cbiAgICBmb3IgKHJlY29yZCA9IHRoaXMuX21hcEhlYWQ7IHJlY29yZCAhPT0gbnVsbDsgcmVjb3JkID0gcmVjb3JkLl9uZXh0KSB7XG4gICAgICBpdGVtcy5wdXNoKHN0cmluZ2lmeShyZWNvcmQpKTtcbiAgICB9XG4gICAgZm9yIChyZWNvcmQgPSB0aGlzLl9wcmV2aW91c01hcEhlYWQ7IHJlY29yZCAhPT0gbnVsbDsgcmVjb3JkID0gcmVjb3JkLl9uZXh0UHJldmlvdXMpIHtcbiAgICAgIHByZXZpb3VzLnB1c2goc3RyaW5naWZ5KHJlY29yZCkpO1xuICAgIH1cbiAgICBmb3IgKHJlY29yZCA9IHRoaXMuX2NoYW5nZXNIZWFkOyByZWNvcmQgIT09IG51bGw7IHJlY29yZCA9IHJlY29yZC5fbmV4dENoYW5nZWQpIHtcbiAgICAgIGNoYW5nZXMucHVzaChzdHJpbmdpZnkocmVjb3JkKSk7XG4gICAgfVxuICAgIGZvciAocmVjb3JkID0gdGhpcy5fYWRkaXRpb25zSGVhZDsgcmVjb3JkICE9PSBudWxsOyByZWNvcmQgPSByZWNvcmQuX25leHRBZGRlZCkge1xuICAgICAgYWRkaXRpb25zLnB1c2goc3RyaW5naWZ5KHJlY29yZCkpO1xuICAgIH1cbiAgICBmb3IgKHJlY29yZCA9IHRoaXMuX3JlbW92YWxzSGVhZDsgcmVjb3JkICE9PSBudWxsOyByZWNvcmQgPSByZWNvcmQuX25leHRSZW1vdmVkKSB7XG4gICAgICByZW1vdmFscy5wdXNoKHN0cmluZ2lmeShyZWNvcmQpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gXCJtYXA6IFwiICsgaXRlbXMuam9pbignLCAnKSArIFwiXFxuXCIgKyBcInByZXZpb3VzOiBcIiArIHByZXZpb3VzLmpvaW4oJywgJykgKyBcIlxcblwiICtcbiAgICAgICAgICAgXCJhZGRpdGlvbnM6IFwiICsgYWRkaXRpb25zLmpvaW4oJywgJykgKyBcIlxcblwiICsgXCJjaGFuZ2VzOiBcIiArIGNoYW5nZXMuam9pbignLCAnKSArIFwiXFxuXCIgK1xuICAgICAgICAgICBcInJlbW92YWxzOiBcIiArIHJlbW92YWxzLmpvaW4oJywgJykgKyBcIlxcblwiO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZm9yRWFjaChvYmosIGZuOiBGdW5jdGlvbikge1xuICAgIGlmIChvYmogaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICg8TWFwPGFueSwgYW55Pj5vYmopLmZvckVhY2goPGFueT5mbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIFN0cmluZ01hcFdyYXBwZXIuZm9yRWFjaChvYmosIGZuKTtcbiAgICB9XG4gIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgS2V5VmFsdWVDaGFuZ2VSZWNvcmQge1xuICBwcmV2aW91c1ZhbHVlOiBhbnkgPSBudWxsO1xuICBjdXJyZW50VmFsdWU6IGFueSA9IG51bGw7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfbmV4dFByZXZpb3VzOiBLZXlWYWx1ZUNoYW5nZVJlY29yZCA9IG51bGw7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX25leHQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkID0gbnVsbDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfbmV4dEFkZGVkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZCA9IG51bGw7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX25leHRSZW1vdmVkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZCA9IG51bGw7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3ByZXZSZW1vdmVkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZCA9IG51bGw7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX25leHRDaGFuZ2VkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGtleTogYW55KSB7fVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGxvb3NlSWRlbnRpY2FsKHRoaXMucHJldmlvdXNWYWx1ZSwgdGhpcy5jdXJyZW50VmFsdWUpID9cbiAgICAgICAgICAgICAgIHN0cmluZ2lmeSh0aGlzLmtleSkgOlxuICAgICAgICAgICAgICAgKHN0cmluZ2lmeSh0aGlzLmtleSkgKyAnWycgKyBzdHJpbmdpZnkodGhpcy5wcmV2aW91c1ZhbHVlKSArICctPicgK1xuICAgICAgICAgICAgICAgIHN0cmluZ2lmeSh0aGlzLmN1cnJlbnRWYWx1ZSkgKyAnXScpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
