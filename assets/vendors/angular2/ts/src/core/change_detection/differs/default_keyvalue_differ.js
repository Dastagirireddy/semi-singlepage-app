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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vZGlmZmVycy9kZWZhdWx0X2tleXZhbHVlX2RpZmZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQU9BO2dCQUFBO2dCQUlBLENBQUM7Z0JBSEMsK0NBQVEsR0FBUixVQUFTLEdBQVEsSUFBYSxNQUFNLENBQUMsR0FBRyxZQUFZLEdBQUcsSUFBSSxpQkFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFN0UsNkNBQU0sR0FBTixVQUFPLEtBQXdCLElBQW9CLE1BQU0sQ0FBQyxJQUFJLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUoxRjtvQkFBQyxZQUFLLEVBQUU7O2dEQUFBO2dCQUtSLG1DQUFDO1lBQUQsQ0FKQSxBQUlDLElBQUE7WUFKRCx1RUFJQyxDQUFBO1lBRUQ7Z0JBQUE7b0JBQ1UsYUFBUSxHQUFrQixJQUFJLEdBQUcsRUFBRSxDQUFDO29CQUNwQyxhQUFRLEdBQXlCLElBQUksQ0FBQztvQkFDdEMscUJBQWdCLEdBQXlCLElBQUksQ0FBQztvQkFDOUMsaUJBQVksR0FBeUIsSUFBSSxDQUFDO29CQUMxQyxpQkFBWSxHQUF5QixJQUFJLENBQUM7b0JBQzFDLG1CQUFjLEdBQXlCLElBQUksQ0FBQztvQkFDNUMsbUJBQWMsR0FBeUIsSUFBSSxDQUFDO29CQUM1QyxrQkFBYSxHQUF5QixJQUFJLENBQUM7b0JBQzNDLGtCQUFhLEdBQXlCLElBQUksQ0FBQztnQkF1VHJELENBQUM7Z0JBclRDLHNCQUFJLDBDQUFPO3lCQUFYO3dCQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUk7NEJBQzFELElBQUksQ0FBQyxhQUFhLEtBQUssSUFBSSxDQUFDO29CQUNyQyxDQUFDOzs7bUJBQUE7Z0JBRUQsMkNBQVcsR0FBWCxVQUFZLEVBQVk7b0JBQ3RCLElBQUksTUFBNEIsQ0FBQztvQkFDakMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxLQUFLLElBQUksRUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO3dCQUNwRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2IsQ0FBQztnQkFDSCxDQUFDO2dCQUVELG1EQUFtQixHQUFuQixVQUFvQixFQUFZO29CQUM5QixJQUFJLE1BQTRCLENBQUM7b0JBQ2pDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxLQUFLLElBQUksRUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO3dCQUNwRixFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2IsQ0FBQztnQkFDSCxDQUFDO2dCQUVELGtEQUFrQixHQUFsQixVQUFtQixFQUFZO29CQUM3QixJQUFJLE1BQTRCLENBQUM7b0JBQ2pDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLE1BQU0sS0FBSyxJQUFJLEVBQUUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFDL0UsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNiLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCxnREFBZ0IsR0FBaEIsVUFBaUIsRUFBWTtvQkFDM0IsSUFBSSxNQUE0QixDQUFDO29CQUNqQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxNQUFNLEtBQUssSUFBSSxFQUFFLE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7d0JBQy9FLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDYixDQUFDO2dCQUNILENBQUM7Z0JBRUQsa0RBQWtCLEdBQWxCLFVBQW1CLEVBQVk7b0JBQzdCLElBQUksTUFBNEIsQ0FBQztvQkFDakMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsTUFBTSxLQUFLLElBQUksRUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO3dCQUNoRixFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2IsQ0FBQztnQkFDSCxDQUFDO2dCQUVELG9DQUFJLEdBQUosVUFBSyxHQUFrQjtvQkFDckIsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUFDLEdBQUcsR0FBRyx1QkFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDdkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxHQUFHLElBQUksaUJBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDN0MsTUFBTSxJQUFJLDBCQUFhLENBQUMsMkJBQXlCLEdBQUcsTUFBRyxDQUFDLENBQUM7b0JBQzNELENBQUM7b0JBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ2QsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNkLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCx5Q0FBUyxHQUFULGNBQWEsQ0FBQztnQkFFZCxxQ0FBSyxHQUFMLFVBQU0sR0FBa0I7b0JBQXhCLGlCQWtEQztvQkFqREMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNkLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQzVCLElBQUksWUFBWSxHQUF5QixJQUFJLENBQUMsUUFBUSxDQUFDO29CQUN2RCxJQUFJLGdCQUFnQixHQUF5QixJQUFJLENBQUM7b0JBQ2xELElBQUksZ0JBQWdCLEdBQXlCLElBQUksQ0FBQztvQkFDbEQsSUFBSSxVQUFVLEdBQVksS0FBSyxDQUFDO29CQUVoQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxVQUFDLEtBQUssRUFBRSxHQUFHO3dCQUM1QixJQUFJLFlBQVksQ0FBQzt3QkFDakIsRUFBRSxDQUFDLENBQUMsWUFBWSxLQUFLLElBQUksSUFBSSxHQUFHLEtBQUssWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7NEJBQ3RELFlBQVksR0FBRyxZQUFZLENBQUM7NEJBQzVCLEVBQUUsQ0FBQyxDQUFDLENBQUMscUJBQWMsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDdEQsWUFBWSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDO2dDQUN2RCxZQUFZLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztnQ0FDbEMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQzs0QkFDbkMsQ0FBQzt3QkFDSCxDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLFVBQVUsR0FBRyxJQUFJLENBQUM7NEJBQ2xCLEVBQUUsQ0FBQyxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dDQUMxQixZQUFZLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztnQ0FDMUIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsRUFBRSxZQUFZLENBQUMsQ0FBQztnQ0FDcEQsS0FBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQzs0QkFDcEMsQ0FBQzs0QkFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDckIsWUFBWSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ2xDLENBQUM7NEJBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ04sWUFBWSxHQUFHLElBQUksb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFDO2dDQUMvQixZQUFZLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztnQ0FDbEMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQzs0QkFDckMsQ0FBQzt3QkFDSCxDQUFDO3dCQUVELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7NEJBQ2YsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ3JDLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsQ0FBQzs0QkFDekMsQ0FBQzs0QkFDRCxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dDQUM3QixLQUFJLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQzs0QkFDL0IsQ0FBQzs0QkFBQyxJQUFJLENBQUMsQ0FBQztnQ0FDTixnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDOzRCQUN4QyxDQUFDO3dCQUNILENBQUM7d0JBQ0QsZ0JBQWdCLEdBQUcsWUFBWSxDQUFDO3dCQUNoQyxnQkFBZ0IsR0FBRyxZQUFZLENBQUM7d0JBQ2hDLFlBQVksR0FBRyxZQUFZLEtBQUssSUFBSSxHQUFHLElBQUksR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO29CQUNuRSxDQUFDLENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixFQUFFLFlBQVksQ0FBQyxDQUFDO29CQUMvQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDdEIsQ0FBQztnQkFFRCxnQkFBZ0I7Z0JBQ2hCLHNDQUFNLEdBQU47b0JBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQ2pCLElBQUksTUFBNEIsQ0FBQzt3QkFDakMsa0NBQWtDO3dCQUNsQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxLQUFLLElBQUksRUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDOzRCQUM1RixNQUFNLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7d0JBQ3RDLENBQUM7d0JBRUQsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsTUFBTSxLQUFLLElBQUksRUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDOzRCQUMvRSxNQUFNLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUM7d0JBQzdDLENBQUM7d0JBRUQsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsTUFBTSxJQUFJLElBQUksRUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDOzRCQUM5RSxNQUFNLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUM7d0JBQzdDLENBQUM7d0JBRUQsc0NBQXNDO3dCQUN0QyxjQUFjO3dCQUNkLHlCQUF5Qjt3QkFDekIsdUJBQXVCO3dCQUN2QixzQ0FBc0M7d0JBQ3RDLDRCQUE0Qjt3QkFDNUIscUJBQXFCO3dCQUNyQixLQUFLO3dCQUNMLEVBQUU7d0JBQ0YsdUJBQXVCO3dCQUN2Qix1QkFBdUI7d0JBQ3ZCLG9DQUFvQzt3QkFDcEMsMEJBQTBCO3dCQUMxQixxQkFBcUI7d0JBQ3JCLEtBQUs7d0JBQ0wsRUFBRTt3QkFDRixzQkFBc0I7d0JBQ3RCLHVCQUF1Qjt3QkFDdkIsc0NBQXNDO3dCQUN0Qyw0QkFBNEI7d0JBQzVCLHFCQUFxQjt3QkFDckIsS0FBSzt3QkFDTCxFQUFFO3dCQUNGLGdCQUFnQjt3QkFDaEIsS0FBSzt3QkFDTCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO3dCQUM3QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO3dCQUNqRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO29CQUNqRCxDQUFDO2dCQUNILENBQUM7Z0JBRUQsZ0JBQWdCO2dCQUNoQix5Q0FBUyxHQUFULFVBQVUsVUFBZ0MsRUFBRSxNQUE0QjtvQkFDdEUsT0FBTyxNQUFNLEtBQUssSUFBSSxFQUFFLENBQUM7d0JBQ3ZCLEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQzt3QkFDdkIsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDTixVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQzt3QkFDMUIsQ0FBQzt3QkFDRCxJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO3dCQUM5QixvQkFBb0I7d0JBQ3BCLGVBQWU7d0JBQ2Ysd0JBQXdCO3dCQUN4QixnQkFBZ0I7d0JBQ2hCLE1BQU07d0JBQ04sSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDNUIsVUFBVSxHQUFHLE1BQU0sQ0FBQzt3QkFDcEIsTUFBTSxHQUFHLFVBQVUsQ0FBQztvQkFDdEIsQ0FBQztvQkFFRCxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBeUIsSUFBSSxDQUFDLGFBQWEsRUFBRSxHQUFHLEtBQUssSUFBSSxFQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7d0JBQzlGLEdBQUcsQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQzt3QkFDckMsR0FBRyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7d0JBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEMsQ0FBQztnQkFDSCxDQUFDO2dCQUVELGdCQUFnQjtnQkFDaEIsNkNBQWEsR0FBYixVQUFjLE1BQTRCO29CQUN4QyxNQUFNLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxhQUFhLElBQUksTUFBTSxDQUFDLFlBQVksS0FBSyxJQUFJO3dCQUM3RCxNQUFNLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQztnQkFDdEMsQ0FBQztnQkFFRCxnQkFBZ0I7Z0JBQ2hCLDhDQUFjLEdBQWQsVUFBZSxNQUE0QjtvQkFDekMsb0JBQW9CO29CQUNwQixnQ0FBZ0M7b0JBQ2hDLHFDQUFxQztvQkFDckMsdUNBQXVDO29CQUN2Qyx1Q0FBdUM7b0JBQ3ZDLHVDQUF1QztvQkFDdkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO29CQUNuRCxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQzt3QkFDekMsTUFBTSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO3dCQUN6QyxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztvQkFDOUIsQ0FBQztnQkFDSCxDQUFDO2dCQUVELGdCQUFnQjtnQkFDaEIsOENBQWMsR0FBZCxVQUFlLElBQTBCLEVBQUUsTUFBNEI7b0JBQ3JFLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7b0JBQ3hCLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztvQkFDdkIsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztvQkFDcEIsQ0FBQztvQkFDRCxvQkFBb0I7b0JBQ3BCLGVBQWU7b0JBQ2Ysd0JBQXdCO29CQUN4QixnQkFBZ0I7b0JBQ2hCLFFBQVE7Z0JBQ1YsQ0FBQztnQkFFRCxnQkFBZ0I7Z0JBQ2hCLG1EQUFtQixHQUFuQixVQUFvQixNQUE0QjtvQkFDOUMsb0JBQW9CO29CQUNwQixnQ0FBZ0M7b0JBQ2hDLHFDQUFxQztvQkFDckMsdUNBQXVDO29CQUV2QyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO29CQUMvQixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO29CQUMvQixFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDbEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7b0JBQzVCLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7b0JBQzNCLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ2xCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO29CQUM1QixDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO29CQUMzQixDQUFDO29CQUNELE1BQU0sQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7Z0JBQ25ELENBQUM7Z0JBRUQsZ0JBQWdCO2dCQUNoQiwrQ0FBZSxHQUFmLFVBQWdCLE1BQTRCO29CQUMxQyxxQkFBcUI7b0JBQ3JCLGdDQUFnQztvQkFDaEMscUNBQXFDO29CQUNyQyx1Q0FBdUM7b0JBQ3ZDLHVDQUF1QztvQkFDdkMsdUNBQXVDO29CQUN2QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ2pDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUM7b0JBQ3JELENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO3dCQUN4QyxJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQztvQkFDL0IsQ0FBQztnQkFDSCxDQUFDO2dCQUVELGdCQUFnQjtnQkFDaEIsNkNBQWEsR0FBYixVQUFjLE1BQTRCO29CQUN4QyxvQkFBb0I7b0JBQ3BCLHFDQUFxQztvQkFDckMsdUNBQXVDO29CQUN2Qyx1Q0FBdUM7b0JBQ3ZDLHVDQUF1QztvQkFDdkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO29CQUNqRCxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQzt3QkFDeEMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7b0JBQzdCLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCx3Q0FBUSxHQUFSO29CQUNFLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztvQkFDZixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7b0JBQ2xCLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztvQkFDakIsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO29CQUNuQixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7b0JBQ2xCLElBQUksTUFBNEIsQ0FBQztvQkFFakMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxLQUFLLElBQUksRUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO3dCQUNwRSxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDaEMsQ0FBQztvQkFDRCxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLE1BQU0sS0FBSyxJQUFJLEVBQUUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQzt3QkFDcEYsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ25DLENBQUM7b0JBQ0QsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsTUFBTSxLQUFLLElBQUksRUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO3dCQUMvRSxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDbEMsQ0FBQztvQkFDRCxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxNQUFNLEtBQUssSUFBSSxFQUFFLE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7d0JBQy9FLFNBQVMsQ0FBQyxJQUFJLENBQUMsZ0JBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNwQyxDQUFDO29CQUNELEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLE1BQU0sS0FBSyxJQUFJLEVBQUUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFDaEYsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ25DLENBQUM7b0JBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxZQUFZLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJO3dCQUM3RSxhQUFhLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsV0FBVyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSTt3QkFDckYsWUFBWSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUNuRCxDQUFDO2dCQUVELGdCQUFnQjtnQkFDaEIsd0NBQVEsR0FBUixVQUFTLEdBQUcsRUFBRSxFQUFZO29CQUN4QixFQUFFLENBQUMsQ0FBQyxHQUFHLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDUCxHQUFJLENBQUMsT0FBTyxDQUFNLEVBQUUsQ0FBQyxDQUFDO29CQUN4QyxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLDZCQUFnQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQ3BDLENBQUM7Z0JBQ0gsQ0FBQztnQkFDSCw0QkFBQztZQUFELENBaFVBLEFBZ1VDLElBQUE7WUFoVUQseURBZ1VDLENBQUE7WUFHRDtnQkFpQkUsOEJBQW1CLEdBQVE7b0JBQVIsUUFBRyxHQUFILEdBQUcsQ0FBSztvQkFoQjNCLGtCQUFhLEdBQVEsSUFBSSxDQUFDO29CQUMxQixpQkFBWSxHQUFRLElBQUksQ0FBQztvQkFFekIsZ0JBQWdCO29CQUNoQixrQkFBYSxHQUF5QixJQUFJLENBQUM7b0JBQzNDLGdCQUFnQjtvQkFDaEIsVUFBSyxHQUF5QixJQUFJLENBQUM7b0JBQ25DLGdCQUFnQjtvQkFDaEIsZUFBVSxHQUF5QixJQUFJLENBQUM7b0JBQ3hDLGdCQUFnQjtvQkFDaEIsaUJBQVksR0FBeUIsSUFBSSxDQUFDO29CQUMxQyxnQkFBZ0I7b0JBQ2hCLGlCQUFZLEdBQXlCLElBQUksQ0FBQztvQkFDMUMsZ0JBQWdCO29CQUNoQixpQkFBWSxHQUF5QixJQUFJLENBQUM7Z0JBRVosQ0FBQztnQkFFL0IsdUNBQVEsR0FBUjtvQkFDRSxNQUFNLENBQUMscUJBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7d0JBQ2pELGdCQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzt3QkFDbkIsQ0FBQyxnQkFBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsSUFBSTs0QkFDaEUsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELENBQUM7Z0JBQ0gsMkJBQUM7WUFBRCxDQXpCQSxBQXlCQyxJQUFBO1lBekJELHVEQXlCQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vZGlmZmVycy9kZWZhdWx0X2tleXZhbHVlX2RpZmZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TWFwV3JhcHBlciwgU3RyaW5nTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7c3RyaW5naWZ5LCBsb29zZUlkZW50aWNhbCwgaXNKc09iamVjdCwgQ09OU1QsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge0NoYW5nZURldGVjdG9yUmVmfSBmcm9tICcuLi9jaGFuZ2VfZGV0ZWN0b3JfcmVmJztcbmltcG9ydCB7S2V5VmFsdWVEaWZmZXIsIEtleVZhbHVlRGlmZmVyRmFjdG9yeX0gZnJvbSAnLi4vZGlmZmVycy9rZXl2YWx1ZV9kaWZmZXJzJztcblxuQENPTlNUKClcbmV4cG9ydCBjbGFzcyBEZWZhdWx0S2V5VmFsdWVEaWZmZXJGYWN0b3J5IGltcGxlbWVudHMgS2V5VmFsdWVEaWZmZXJGYWN0b3J5IHtcbiAgc3VwcG9ydHMob2JqOiBhbnkpOiBib29sZWFuIHsgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIE1hcCB8fCBpc0pzT2JqZWN0KG9iaik7IH1cblxuICBjcmVhdGUoY2RSZWY6IENoYW5nZURldGVjdG9yUmVmKTogS2V5VmFsdWVEaWZmZXIgeyByZXR1cm4gbmV3IERlZmF1bHRLZXlWYWx1ZURpZmZlcigpOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBEZWZhdWx0S2V5VmFsdWVEaWZmZXIgaW1wbGVtZW50cyBLZXlWYWx1ZURpZmZlciB7XG4gIHByaXZhdGUgX3JlY29yZHM6IE1hcDxhbnksIGFueT4gPSBuZXcgTWFwKCk7XG4gIHByaXZhdGUgX21hcEhlYWQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkID0gbnVsbDtcbiAgcHJpdmF0ZSBfcHJldmlvdXNNYXBIZWFkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZCA9IG51bGw7XG4gIHByaXZhdGUgX2NoYW5nZXNIZWFkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZCA9IG51bGw7XG4gIHByaXZhdGUgX2NoYW5nZXNUYWlsOiBLZXlWYWx1ZUNoYW5nZVJlY29yZCA9IG51bGw7XG4gIHByaXZhdGUgX2FkZGl0aW9uc0hlYWQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkID0gbnVsbDtcbiAgcHJpdmF0ZSBfYWRkaXRpb25zVGFpbDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQgPSBudWxsO1xuICBwcml2YXRlIF9yZW1vdmFsc0hlYWQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkID0gbnVsbDtcbiAgcHJpdmF0ZSBfcmVtb3ZhbHNUYWlsOiBLZXlWYWx1ZUNoYW5nZVJlY29yZCA9IG51bGw7XG5cbiAgZ2V0IGlzRGlydHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2FkZGl0aW9uc0hlYWQgIT09IG51bGwgfHwgdGhpcy5fY2hhbmdlc0hlYWQgIT09IG51bGwgfHxcbiAgICAgICAgICAgdGhpcy5fcmVtb3ZhbHNIZWFkICE9PSBudWxsO1xuICB9XG5cbiAgZm9yRWFjaEl0ZW0oZm46IEZ1bmN0aW9uKSB7XG4gICAgdmFyIHJlY29yZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQ7XG4gICAgZm9yIChyZWNvcmQgPSB0aGlzLl9tYXBIZWFkOyByZWNvcmQgIT09IG51bGw7IHJlY29yZCA9IHJlY29yZC5fbmV4dCkge1xuICAgICAgZm4ocmVjb3JkKTtcbiAgICB9XG4gIH1cblxuICBmb3JFYWNoUHJldmlvdXNJdGVtKGZuOiBGdW5jdGlvbikge1xuICAgIHZhciByZWNvcmQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkO1xuICAgIGZvciAocmVjb3JkID0gdGhpcy5fcHJldmlvdXNNYXBIZWFkOyByZWNvcmQgIT09IG51bGw7IHJlY29yZCA9IHJlY29yZC5fbmV4dFByZXZpb3VzKSB7XG4gICAgICBmbihyZWNvcmQpO1xuICAgIH1cbiAgfVxuXG4gIGZvckVhY2hDaGFuZ2VkSXRlbShmbjogRnVuY3Rpb24pIHtcbiAgICB2YXIgcmVjb3JkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZDtcbiAgICBmb3IgKHJlY29yZCA9IHRoaXMuX2NoYW5nZXNIZWFkOyByZWNvcmQgIT09IG51bGw7IHJlY29yZCA9IHJlY29yZC5fbmV4dENoYW5nZWQpIHtcbiAgICAgIGZuKHJlY29yZCk7XG4gICAgfVxuICB9XG5cbiAgZm9yRWFjaEFkZGVkSXRlbShmbjogRnVuY3Rpb24pIHtcbiAgICB2YXIgcmVjb3JkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZDtcbiAgICBmb3IgKHJlY29yZCA9IHRoaXMuX2FkZGl0aW9uc0hlYWQ7IHJlY29yZCAhPT0gbnVsbDsgcmVjb3JkID0gcmVjb3JkLl9uZXh0QWRkZWQpIHtcbiAgICAgIGZuKHJlY29yZCk7XG4gICAgfVxuICB9XG5cbiAgZm9yRWFjaFJlbW92ZWRJdGVtKGZuOiBGdW5jdGlvbikge1xuICAgIHZhciByZWNvcmQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkO1xuICAgIGZvciAocmVjb3JkID0gdGhpcy5fcmVtb3ZhbHNIZWFkOyByZWNvcmQgIT09IG51bGw7IHJlY29yZCA9IHJlY29yZC5fbmV4dFJlbW92ZWQpIHtcbiAgICAgIGZuKHJlY29yZCk7XG4gICAgfVxuICB9XG5cbiAgZGlmZihtYXA6IE1hcDxhbnksIGFueT4pOiBhbnkge1xuICAgIGlmIChpc0JsYW5rKG1hcCkpIG1hcCA9IE1hcFdyYXBwZXIuY3JlYXRlRnJvbVBhaXJzKFtdKTtcbiAgICBpZiAoIShtYXAgaW5zdGFuY2VvZiBNYXAgfHwgaXNKc09iamVjdChtYXApKSkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYEVycm9yIHRyeWluZyB0byBkaWZmICcke21hcH0nYCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY2hlY2sobWFwKSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIG9uRGVzdHJveSgpIHt9XG5cbiAgY2hlY2sobWFwOiBNYXA8YW55LCBhbnk+KTogYm9vbGVhbiB7XG4gICAgdGhpcy5fcmVzZXQoKTtcbiAgICB2YXIgcmVjb3JkcyA9IHRoaXMuX3JlY29yZHM7XG4gICAgdmFyIG9sZFNlcVJlY29yZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQgPSB0aGlzLl9tYXBIZWFkO1xuICAgIHZhciBsYXN0T2xkU2VxUmVjb3JkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZCA9IG51bGw7XG4gICAgdmFyIGxhc3ROZXdTZXFSZWNvcmQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkID0gbnVsbDtcbiAgICB2YXIgc2VxQ2hhbmdlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgdGhpcy5fZm9yRWFjaChtYXAsICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICB2YXIgbmV3U2VxUmVjb3JkO1xuICAgICAgaWYgKG9sZFNlcVJlY29yZCAhPT0gbnVsbCAmJiBrZXkgPT09IG9sZFNlcVJlY29yZC5rZXkpIHtcbiAgICAgICAgbmV3U2VxUmVjb3JkID0gb2xkU2VxUmVjb3JkO1xuICAgICAgICBpZiAoIWxvb3NlSWRlbnRpY2FsKHZhbHVlLCBvbGRTZXFSZWNvcmQuY3VycmVudFZhbHVlKSkge1xuICAgICAgICAgIG9sZFNlcVJlY29yZC5wcmV2aW91c1ZhbHVlID0gb2xkU2VxUmVjb3JkLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICBvbGRTZXFSZWNvcmQuY3VycmVudFZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgdGhpcy5fYWRkVG9DaGFuZ2VzKG9sZFNlcVJlY29yZCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlcUNoYW5nZWQgPSB0cnVlO1xuICAgICAgICBpZiAob2xkU2VxUmVjb3JkICE9PSBudWxsKSB7XG4gICAgICAgICAgb2xkU2VxUmVjb3JkLl9uZXh0ID0gbnVsbDtcbiAgICAgICAgICB0aGlzLl9yZW1vdmVGcm9tU2VxKGxhc3RPbGRTZXFSZWNvcmQsIG9sZFNlcVJlY29yZCk7XG4gICAgICAgICAgdGhpcy5fYWRkVG9SZW1vdmFscyhvbGRTZXFSZWNvcmQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZWNvcmRzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgbmV3U2VxUmVjb3JkID0gcmVjb3Jkcy5nZXQoa2V5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdTZXFSZWNvcmQgPSBuZXcgS2V5VmFsdWVDaGFuZ2VSZWNvcmQoa2V5KTtcbiAgICAgICAgICByZWNvcmRzLnNldChrZXksIG5ld1NlcVJlY29yZCk7XG4gICAgICAgICAgbmV3U2VxUmVjb3JkLmN1cnJlbnRWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgIHRoaXMuX2FkZFRvQWRkaXRpb25zKG5ld1NlcVJlY29yZCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHNlcUNoYW5nZWQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzSW5SZW1vdmFscyhuZXdTZXFSZWNvcmQpKSB7XG4gICAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbVJlbW92YWxzKG5ld1NlcVJlY29yZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxhc3ROZXdTZXFSZWNvcmQgPT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuX21hcEhlYWQgPSBuZXdTZXFSZWNvcmQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGFzdE5ld1NlcVJlY29yZC5fbmV4dCA9IG5ld1NlcVJlY29yZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGFzdE9sZFNlcVJlY29yZCA9IG9sZFNlcVJlY29yZDtcbiAgICAgIGxhc3ROZXdTZXFSZWNvcmQgPSBuZXdTZXFSZWNvcmQ7XG4gICAgICBvbGRTZXFSZWNvcmQgPSBvbGRTZXFSZWNvcmQgPT09IG51bGwgPyBudWxsIDogb2xkU2VxUmVjb3JkLl9uZXh0O1xuICAgIH0pO1xuICAgIHRoaXMuX3RydW5jYXRlKGxhc3RPbGRTZXFSZWNvcmQsIG9sZFNlcVJlY29yZCk7XG4gICAgcmV0dXJuIHRoaXMuaXNEaXJ0eTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3Jlc2V0KCkge1xuICAgIGlmICh0aGlzLmlzRGlydHkpIHtcbiAgICAgIHZhciByZWNvcmQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkO1xuICAgICAgLy8gUmVjb3JkIHRoZSBzdGF0ZSBvZiB0aGUgbWFwcGluZ1xuICAgICAgZm9yIChyZWNvcmQgPSB0aGlzLl9wcmV2aW91c01hcEhlYWQgPSB0aGlzLl9tYXBIZWFkOyByZWNvcmQgIT09IG51bGw7IHJlY29yZCA9IHJlY29yZC5fbmV4dCkge1xuICAgICAgICByZWNvcmQuX25leHRQcmV2aW91cyA9IHJlY29yZC5fbmV4dDtcbiAgICAgIH1cblxuICAgICAgZm9yIChyZWNvcmQgPSB0aGlzLl9jaGFuZ2VzSGVhZDsgcmVjb3JkICE9PSBudWxsOyByZWNvcmQgPSByZWNvcmQuX25leHRDaGFuZ2VkKSB7XG4gICAgICAgIHJlY29yZC5wcmV2aW91c1ZhbHVlID0gcmVjb3JkLmN1cnJlbnRWYWx1ZTtcbiAgICAgIH1cblxuICAgICAgZm9yIChyZWNvcmQgPSB0aGlzLl9hZGRpdGlvbnNIZWFkOyByZWNvcmQgIT0gbnVsbDsgcmVjb3JkID0gcmVjb3JkLl9uZXh0QWRkZWQpIHtcbiAgICAgICAgcmVjb3JkLnByZXZpb3VzVmFsdWUgPSByZWNvcmQuY3VycmVudFZhbHVlO1xuICAgICAgfVxuXG4gICAgICAvLyB0b2RvKHZpY2IpIG9uY2UgYXNzZXJ0IGlzIHN1cHBvcnRlZFxuICAgICAgLy8gYXNzZXJ0KCgpIHtcbiAgICAgIC8vICB2YXIgciA9IF9jaGFuZ2VzSGVhZDtcbiAgICAgIC8vICB3aGlsZSAociAhPSBudWxsKSB7XG4gICAgICAvLyAgICB2YXIgbmV4dFJlY29yZCA9IHIuX25leHRDaGFuZ2VkO1xuICAgICAgLy8gICAgci5fbmV4dENoYW5nZWQgPSBudWxsO1xuICAgICAgLy8gICAgciA9IG5leHRSZWNvcmQ7XG4gICAgICAvLyAgfVxuICAgICAgLy9cbiAgICAgIC8vICByID0gX2FkZGl0aW9uc0hlYWQ7XG4gICAgICAvLyAgd2hpbGUgKHIgIT0gbnVsbCkge1xuICAgICAgLy8gICAgdmFyIG5leHRSZWNvcmQgPSByLl9uZXh0QWRkZWQ7XG4gICAgICAvLyAgICByLl9uZXh0QWRkZWQgPSBudWxsO1xuICAgICAgLy8gICAgciA9IG5leHRSZWNvcmQ7XG4gICAgICAvLyAgfVxuICAgICAgLy9cbiAgICAgIC8vICByID0gX3JlbW92YWxzSGVhZDtcbiAgICAgIC8vICB3aGlsZSAociAhPSBudWxsKSB7XG4gICAgICAvLyAgICB2YXIgbmV4dFJlY29yZCA9IHIuX25leHRSZW1vdmVkO1xuICAgICAgLy8gICAgci5fbmV4dFJlbW92ZWQgPSBudWxsO1xuICAgICAgLy8gICAgciA9IG5leHRSZWNvcmQ7XG4gICAgICAvLyAgfVxuICAgICAgLy9cbiAgICAgIC8vICByZXR1cm4gdHJ1ZTtcbiAgICAgIC8vfSk7XG4gICAgICB0aGlzLl9jaGFuZ2VzSGVhZCA9IHRoaXMuX2NoYW5nZXNUYWlsID0gbnVsbDtcbiAgICAgIHRoaXMuX2FkZGl0aW9uc0hlYWQgPSB0aGlzLl9hZGRpdGlvbnNUYWlsID0gbnVsbDtcbiAgICAgIHRoaXMuX3JlbW92YWxzSGVhZCA9IHRoaXMuX3JlbW92YWxzVGFpbCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfdHJ1bmNhdGUobGFzdFJlY29yZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQsIHJlY29yZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQpIHtcbiAgICB3aGlsZSAocmVjb3JkICE9PSBudWxsKSB7XG4gICAgICBpZiAobGFzdFJlY29yZCA9PT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9tYXBIZWFkID0gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxhc3RSZWNvcmQuX25leHQgPSBudWxsO1xuICAgICAgfVxuICAgICAgdmFyIG5leHRSZWNvcmQgPSByZWNvcmQuX25leHQ7XG4gICAgICAvLyB0b2RvKHZpY2IpIGFzc2VydFxuICAgICAgLy8gYXNzZXJ0KCgoKSB7XG4gICAgICAvLyAgcmVjb3JkLl9uZXh0ID0gbnVsbDtcbiAgICAgIC8vICByZXR1cm4gdHJ1ZTtcbiAgICAgIC8vfSkpO1xuICAgICAgdGhpcy5fYWRkVG9SZW1vdmFscyhyZWNvcmQpO1xuICAgICAgbGFzdFJlY29yZCA9IHJlY29yZDtcbiAgICAgIHJlY29yZCA9IG5leHRSZWNvcmQ7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgcmVjOiBLZXlWYWx1ZUNoYW5nZVJlY29yZCA9IHRoaXMuX3JlbW92YWxzSGVhZDsgcmVjICE9PSBudWxsOyByZWMgPSByZWMuX25leHRSZW1vdmVkKSB7XG4gICAgICByZWMucHJldmlvdXNWYWx1ZSA9IHJlYy5jdXJyZW50VmFsdWU7XG4gICAgICByZWMuY3VycmVudFZhbHVlID0gbnVsbDtcbiAgICAgIHRoaXMuX3JlY29yZHMuZGVsZXRlKHJlYy5rZXkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2lzSW5SZW1vdmFscyhyZWNvcmQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkKSB7XG4gICAgcmV0dXJuIHJlY29yZCA9PT0gdGhpcy5fcmVtb3ZhbHNIZWFkIHx8IHJlY29yZC5fbmV4dFJlbW92ZWQgIT09IG51bGwgfHxcbiAgICAgICAgICAgcmVjb3JkLl9wcmV2UmVtb3ZlZCAhPT0gbnVsbDtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2FkZFRvUmVtb3ZhbHMocmVjb3JkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZCkge1xuICAgIC8vIHRvZG8odmljYikgYXNzZXJ0XG4gICAgLy8gYXNzZXJ0KHJlY29yZC5fbmV4dCA9PSBudWxsKTtcbiAgICAvLyBhc3NlcnQocmVjb3JkLl9uZXh0QWRkZWQgPT0gbnVsbCk7XG4gICAgLy8gYXNzZXJ0KHJlY29yZC5fbmV4dENoYW5nZWQgPT0gbnVsbCk7XG4gICAgLy8gYXNzZXJ0KHJlY29yZC5fbmV4dFJlbW92ZWQgPT0gbnVsbCk7XG4gICAgLy8gYXNzZXJ0KHJlY29yZC5fcHJldlJlbW92ZWQgPT0gbnVsbCk7XG4gICAgaWYgKHRoaXMuX3JlbW92YWxzSGVhZCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVtb3ZhbHNIZWFkID0gdGhpcy5fcmVtb3ZhbHNUYWlsID0gcmVjb3JkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZW1vdmFsc1RhaWwuX25leHRSZW1vdmVkID0gcmVjb3JkO1xuICAgICAgcmVjb3JkLl9wcmV2UmVtb3ZlZCA9IHRoaXMuX3JlbW92YWxzVGFpbDtcbiAgICAgIHRoaXMuX3JlbW92YWxzVGFpbCA9IHJlY29yZDtcbiAgICB9XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9yZW1vdmVGcm9tU2VxKHByZXY6IEtleVZhbHVlQ2hhbmdlUmVjb3JkLCByZWNvcmQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkKSB7XG4gICAgdmFyIG5leHQgPSByZWNvcmQuX25leHQ7XG4gICAgaWYgKHByZXYgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuX21hcEhlYWQgPSBuZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICBwcmV2Ll9uZXh0ID0gbmV4dDtcbiAgICB9XG4gICAgLy8gdG9kbyh2aWNiKSBhc3NlcnRcbiAgICAvLyBhc3NlcnQoKCgpIHtcbiAgICAvLyAgcmVjb3JkLl9uZXh0ID0gbnVsbDtcbiAgICAvLyAgcmV0dXJuIHRydWU7XG4gICAgLy99KSgpKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3JlbW92ZUZyb21SZW1vdmFscyhyZWNvcmQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkKSB7XG4gICAgLy8gdG9kbyh2aWNiKSBhc3NlcnRcbiAgICAvLyBhc3NlcnQocmVjb3JkLl9uZXh0ID09IG51bGwpO1xuICAgIC8vIGFzc2VydChyZWNvcmQuX25leHRBZGRlZCA9PSBudWxsKTtcbiAgICAvLyBhc3NlcnQocmVjb3JkLl9uZXh0Q2hhbmdlZCA9PSBudWxsKTtcblxuICAgIHZhciBwcmV2ID0gcmVjb3JkLl9wcmV2UmVtb3ZlZDtcbiAgICB2YXIgbmV4dCA9IHJlY29yZC5fbmV4dFJlbW92ZWQ7XG4gICAgaWYgKHByZXYgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbW92YWxzSGVhZCA9IG5leHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByZXYuX25leHRSZW1vdmVkID0gbmV4dDtcbiAgICB9XG4gICAgaWYgKG5leHQgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbW92YWxzVGFpbCA9IHByZXY7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHQuX3ByZXZSZW1vdmVkID0gcHJldjtcbiAgICB9XG4gICAgcmVjb3JkLl9wcmV2UmVtb3ZlZCA9IHJlY29yZC5fbmV4dFJlbW92ZWQgPSBudWxsO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfYWRkVG9BZGRpdGlvbnMocmVjb3JkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZCkge1xuICAgIC8vIHRvZG8odmljYik6IGFzc2VydFxuICAgIC8vIGFzc2VydChyZWNvcmQuX25leHQgPT0gbnVsbCk7XG4gICAgLy8gYXNzZXJ0KHJlY29yZC5fbmV4dEFkZGVkID09IG51bGwpO1xuICAgIC8vIGFzc2VydChyZWNvcmQuX25leHRDaGFuZ2VkID09IG51bGwpO1xuICAgIC8vIGFzc2VydChyZWNvcmQuX25leHRSZW1vdmVkID09IG51bGwpO1xuICAgIC8vIGFzc2VydChyZWNvcmQuX3ByZXZSZW1vdmVkID09IG51bGwpO1xuICAgIGlmICh0aGlzLl9hZGRpdGlvbnNIZWFkID09PSBudWxsKSB7XG4gICAgICB0aGlzLl9hZGRpdGlvbnNIZWFkID0gdGhpcy5fYWRkaXRpb25zVGFpbCA9IHJlY29yZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYWRkaXRpb25zVGFpbC5fbmV4dEFkZGVkID0gcmVjb3JkO1xuICAgICAgdGhpcy5fYWRkaXRpb25zVGFpbCA9IHJlY29yZDtcbiAgICB9XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9hZGRUb0NoYW5nZXMocmVjb3JkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZCkge1xuICAgIC8vIHRvZG8odmljYikgYXNzZXJ0XG4gICAgLy8gYXNzZXJ0KHJlY29yZC5fbmV4dEFkZGVkID09IG51bGwpO1xuICAgIC8vIGFzc2VydChyZWNvcmQuX25leHRDaGFuZ2VkID09IG51bGwpO1xuICAgIC8vIGFzc2VydChyZWNvcmQuX25leHRSZW1vdmVkID09IG51bGwpO1xuICAgIC8vIGFzc2VydChyZWNvcmQuX3ByZXZSZW1vdmVkID09IG51bGwpO1xuICAgIGlmICh0aGlzLl9jaGFuZ2VzSGVhZCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5fY2hhbmdlc0hlYWQgPSB0aGlzLl9jaGFuZ2VzVGFpbCA9IHJlY29yZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fY2hhbmdlc1RhaWwuX25leHRDaGFuZ2VkID0gcmVjb3JkO1xuICAgICAgdGhpcy5fY2hhbmdlc1RhaWwgPSByZWNvcmQ7XG4gICAgfVxuICB9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICB2YXIgaXRlbXMgPSBbXTtcbiAgICB2YXIgcHJldmlvdXMgPSBbXTtcbiAgICB2YXIgY2hhbmdlcyA9IFtdO1xuICAgIHZhciBhZGRpdGlvbnMgPSBbXTtcbiAgICB2YXIgcmVtb3ZhbHMgPSBbXTtcbiAgICB2YXIgcmVjb3JkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZDtcblxuICAgIGZvciAocmVjb3JkID0gdGhpcy5fbWFwSGVhZDsgcmVjb3JkICE9PSBudWxsOyByZWNvcmQgPSByZWNvcmQuX25leHQpIHtcbiAgICAgIGl0ZW1zLnB1c2goc3RyaW5naWZ5KHJlY29yZCkpO1xuICAgIH1cbiAgICBmb3IgKHJlY29yZCA9IHRoaXMuX3ByZXZpb3VzTWFwSGVhZDsgcmVjb3JkICE9PSBudWxsOyByZWNvcmQgPSByZWNvcmQuX25leHRQcmV2aW91cykge1xuICAgICAgcHJldmlvdXMucHVzaChzdHJpbmdpZnkocmVjb3JkKSk7XG4gICAgfVxuICAgIGZvciAocmVjb3JkID0gdGhpcy5fY2hhbmdlc0hlYWQ7IHJlY29yZCAhPT0gbnVsbDsgcmVjb3JkID0gcmVjb3JkLl9uZXh0Q2hhbmdlZCkge1xuICAgICAgY2hhbmdlcy5wdXNoKHN0cmluZ2lmeShyZWNvcmQpKTtcbiAgICB9XG4gICAgZm9yIChyZWNvcmQgPSB0aGlzLl9hZGRpdGlvbnNIZWFkOyByZWNvcmQgIT09IG51bGw7IHJlY29yZCA9IHJlY29yZC5fbmV4dEFkZGVkKSB7XG4gICAgICBhZGRpdGlvbnMucHVzaChzdHJpbmdpZnkocmVjb3JkKSk7XG4gICAgfVxuICAgIGZvciAocmVjb3JkID0gdGhpcy5fcmVtb3ZhbHNIZWFkOyByZWNvcmQgIT09IG51bGw7IHJlY29yZCA9IHJlY29yZC5fbmV4dFJlbW92ZWQpIHtcbiAgICAgIHJlbW92YWxzLnB1c2goc3RyaW5naWZ5KHJlY29yZCkpO1xuICAgIH1cblxuICAgIHJldHVybiBcIm1hcDogXCIgKyBpdGVtcy5qb2luKCcsICcpICsgXCJcXG5cIiArIFwicHJldmlvdXM6IFwiICsgcHJldmlvdXMuam9pbignLCAnKSArIFwiXFxuXCIgK1xuICAgICAgICAgICBcImFkZGl0aW9uczogXCIgKyBhZGRpdGlvbnMuam9pbignLCAnKSArIFwiXFxuXCIgKyBcImNoYW5nZXM6IFwiICsgY2hhbmdlcy5qb2luKCcsICcpICsgXCJcXG5cIiArXG4gICAgICAgICAgIFwicmVtb3ZhbHM6IFwiICsgcmVtb3ZhbHMuam9pbignLCAnKSArIFwiXFxuXCI7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9mb3JFYWNoKG9iaiwgZm46IEZ1bmN0aW9uKSB7XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgKDxNYXA8YW55LCBhbnk+Pm9iaikuZm9yRWFjaCg8YW55PmZuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgU3RyaW5nTWFwV3JhcHBlci5mb3JFYWNoKG9iaiwgZm4pO1xuICAgIH1cbiAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBLZXlWYWx1ZUNoYW5nZVJlY29yZCB7XG4gIHByZXZpb3VzVmFsdWU6IGFueSA9IG51bGw7XG4gIGN1cnJlbnRWYWx1ZTogYW55ID0gbnVsbDtcblxuICAvKiogQGludGVybmFsICovXG4gIF9uZXh0UHJldmlvdXM6IEtleVZhbHVlQ2hhbmdlUmVjb3JkID0gbnVsbDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfbmV4dDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQgPSBudWxsO1xuICAvKiogQGludGVybmFsICovXG4gIF9uZXh0QWRkZWQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkID0gbnVsbDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfbmV4dFJlbW92ZWQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkID0gbnVsbDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcHJldlJlbW92ZWQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkID0gbnVsbDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfbmV4dENoYW5nZWQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMga2V5OiBhbnkpIHt9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbG9vc2VJZGVudGljYWwodGhpcy5wcmV2aW91c1ZhbHVlLCB0aGlzLmN1cnJlbnRWYWx1ZSkgP1xuICAgICAgICAgICAgICAgc3RyaW5naWZ5KHRoaXMua2V5KSA6XG4gICAgICAgICAgICAgICAoc3RyaW5naWZ5KHRoaXMua2V5KSArICdbJyArIHN0cmluZ2lmeSh0aGlzLnByZXZpb3VzVmFsdWUpICsgJy0+JyArXG4gICAgICAgICAgICAgICAgc3RyaW5naWZ5KHRoaXMuY3VycmVudFZhbHVlKSArICddJyk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
