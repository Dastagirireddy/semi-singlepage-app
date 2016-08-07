System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/collection'], function(exports_1, context_1) {
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
    var lang_1, exceptions_1, collection_1, lang_2;
    var DefaultIterableDifferFactory, trackByIdentity, DefaultIterableDiffer, CollectionChangeRecord, _DuplicateItemRecordList, _DuplicateMap;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
                lang_2 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            }],
        execute: function() {
            DefaultIterableDifferFactory = (function () {
                function DefaultIterableDifferFactory() {
                }
                DefaultIterableDifferFactory.prototype.supports = function (obj) { return collection_1.isListLikeIterable(obj); };
                DefaultIterableDifferFactory.prototype.create = function (cdRef, trackByFn) {
                    return new DefaultIterableDiffer(trackByFn);
                };
                DefaultIterableDifferFactory = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [])
                ], DefaultIterableDifferFactory);
                return DefaultIterableDifferFactory;
            }());
            exports_1("DefaultIterableDifferFactory", DefaultIterableDifferFactory);
            trackByIdentity = function (index, item) { return item; };
            DefaultIterableDiffer = (function () {
                function DefaultIterableDiffer(_trackByFn) {
                    this._trackByFn = _trackByFn;
                    this._length = null;
                    this._collection = null;
                    // Keeps track of the used records at any point in time (during & across `_check()` calls)
                    this._linkedRecords = null;
                    // Keeps track of the removed records at any point in time during `_check()` calls.
                    this._unlinkedRecords = null;
                    this._previousItHead = null;
                    this._itHead = null;
                    this._itTail = null;
                    this._additionsHead = null;
                    this._additionsTail = null;
                    this._movesHead = null;
                    this._movesTail = null;
                    this._removalsHead = null;
                    this._removalsTail = null;
                    // Keeps track of records where custom track by is the same, but item identity has changed
                    this._identityChangesHead = null;
                    this._identityChangesTail = null;
                    this._trackByFn = lang_2.isPresent(this._trackByFn) ? this._trackByFn : trackByIdentity;
                }
                Object.defineProperty(DefaultIterableDiffer.prototype, "collection", {
                    get: function () { return this._collection; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DefaultIterableDiffer.prototype, "length", {
                    get: function () { return this._length; },
                    enumerable: true,
                    configurable: true
                });
                DefaultIterableDiffer.prototype.forEachItem = function (fn) {
                    var record;
                    for (record = this._itHead; record !== null; record = record._next) {
                        fn(record);
                    }
                };
                DefaultIterableDiffer.prototype.forEachPreviousItem = function (fn) {
                    var record;
                    for (record = this._previousItHead; record !== null; record = record._nextPrevious) {
                        fn(record);
                    }
                };
                DefaultIterableDiffer.prototype.forEachAddedItem = function (fn) {
                    var record;
                    for (record = this._additionsHead; record !== null; record = record._nextAdded) {
                        fn(record);
                    }
                };
                DefaultIterableDiffer.prototype.forEachMovedItem = function (fn) {
                    var record;
                    for (record = this._movesHead; record !== null; record = record._nextMoved) {
                        fn(record);
                    }
                };
                DefaultIterableDiffer.prototype.forEachRemovedItem = function (fn) {
                    var record;
                    for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
                        fn(record);
                    }
                };
                DefaultIterableDiffer.prototype.forEachIdentityChange = function (fn) {
                    var record;
                    for (record = this._identityChangesHead; record !== null; record = record._nextIdentityChange) {
                        fn(record);
                    }
                };
                DefaultIterableDiffer.prototype.diff = function (collection) {
                    if (lang_2.isBlank(collection))
                        collection = [];
                    if (!collection_1.isListLikeIterable(collection)) {
                        throw new exceptions_1.BaseException("Error trying to diff '" + collection + "'");
                    }
                    if (this.check(collection)) {
                        return this;
                    }
                    else {
                        return null;
                    }
                };
                DefaultIterableDiffer.prototype.onDestroy = function () { };
                DefaultIterableDiffer.prototype.check = function (collection) {
                    var _this = this;
                    this._reset();
                    var record = this._itHead;
                    var mayBeDirty = false;
                    var index;
                    var item;
                    var itemTrackBy;
                    if (lang_2.isArray(collection)) {
                        if (collection !== this._collection || !collection_1.ListWrapper.isImmutable(collection)) {
                            var list = collection;
                            this._length = collection.length;
                            for (index = 0; index < this._length; index++) {
                                item = list[index];
                                itemTrackBy = this._trackByFn(index, item);
                                if (record === null || !lang_2.looseIdentical(record.trackById, itemTrackBy)) {
                                    record = this._mismatch(record, item, itemTrackBy, index);
                                    mayBeDirty = true;
                                }
                                else {
                                    if (mayBeDirty) {
                                        // TODO(misko): can we limit this to duplicates only?
                                        record = this._verifyReinsertion(record, item, itemTrackBy, index);
                                    }
                                    if (!lang_2.looseIdentical(record.item, item))
                                        this._addIdentityChange(record, item);
                                }
                                record = record._next;
                            }
                            this._truncate(record);
                        }
                    }
                    else {
                        index = 0;
                        collection_1.iterateListLike(collection, function (item) {
                            itemTrackBy = _this._trackByFn(index, item);
                            if (record === null || !lang_2.looseIdentical(record.trackById, itemTrackBy)) {
                                record = _this._mismatch(record, item, itemTrackBy, index);
                                mayBeDirty = true;
                            }
                            else {
                                if (mayBeDirty) {
                                    // TODO(misko): can we limit this to duplicates only?
                                    record = _this._verifyReinsertion(record, item, itemTrackBy, index);
                                }
                                if (!lang_2.looseIdentical(record.item, item))
                                    _this._addIdentityChange(record, item);
                            }
                            record = record._next;
                            index++;
                        });
                        this._length = index;
                        this._truncate(record);
                    }
                    this._collection = collection;
                    return this.isDirty;
                };
                Object.defineProperty(DefaultIterableDiffer.prototype, "isDirty", {
                    /* CollectionChanges is considered dirty if it has any additions, moves, removals, or identity
                     * changes.
                     */
                    get: function () {
                        return this._additionsHead !== null || this._movesHead !== null ||
                            this._removalsHead !== null || this._identityChangesHead !== null;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Reset the state of the change objects to show no changes. This means set previousKey to
                 * currentKey, and clear all of the queues (additions, moves, removals).
                 * Set the previousIndexes of moved and added items to their currentIndexes
                 * Reset the list of additions, moves and removals
                 *
                 * @internal
                 */
                DefaultIterableDiffer.prototype._reset = function () {
                    if (this.isDirty) {
                        var record;
                        var nextRecord;
                        for (record = this._previousItHead = this._itHead; record !== null; record = record._next) {
                            record._nextPrevious = record._next;
                        }
                        for (record = this._additionsHead; record !== null; record = record._nextAdded) {
                            record.previousIndex = record.currentIndex;
                        }
                        this._additionsHead = this._additionsTail = null;
                        for (record = this._movesHead; record !== null; record = nextRecord) {
                            record.previousIndex = record.currentIndex;
                            nextRecord = record._nextMoved;
                        }
                        this._movesHead = this._movesTail = null;
                        this._removalsHead = this._removalsTail = null;
                        this._identityChangesHead = this._identityChangesTail = null;
                    }
                };
                /**
                 * This is the core function which handles differences between collections.
                 *
                 * - `record` is the record which we saw at this position last time. If null then it is a new
                 *   item.
                 * - `item` is the current item in the collection
                 * - `index` is the position of the item in the collection
                 *
                 * @internal
                 */
                DefaultIterableDiffer.prototype._mismatch = function (record, item, itemTrackBy, index) {
                    // The previous record after which we will append the current one.
                    var previousRecord;
                    if (record === null) {
                        previousRecord = this._itTail;
                    }
                    else {
                        previousRecord = record._prev;
                        // Remove the record from the collection since we know it does not match the item.
                        this._remove(record);
                    }
                    // Attempt to see if we have seen the item before.
                    record = this._linkedRecords === null ? null : this._linkedRecords.get(itemTrackBy, index);
                    if (record !== null) {
                        // We have seen this before, we need to move it forward in the collection.
                        // But first we need to check if identity changed, so we can update in view if necessary
                        if (!lang_2.looseIdentical(record.item, item))
                            this._addIdentityChange(record, item);
                        this._moveAfter(record, previousRecord, index);
                    }
                    else {
                        // Never seen it, check evicted list.
                        record = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy);
                        if (record !== null) {
                            // It is an item which we have evicted earlier: reinsert it back into the list.
                            // But first we need to check if identity changed, so we can update in view if necessary
                            if (!lang_2.looseIdentical(record.item, item))
                                this._addIdentityChange(record, item);
                            this._reinsertAfter(record, previousRecord, index);
                        }
                        else {
                            // It is a new item: add it.
                            record =
                                this._addAfter(new CollectionChangeRecord(item, itemTrackBy), previousRecord, index);
                        }
                    }
                    return record;
                };
                /**
                 * This check is only needed if an array contains duplicates. (Short circuit of nothing dirty)
                 *
                 * Use case: `[a, a]` => `[b, a, a]`
                 *
                 * If we did not have this check then the insertion of `b` would:
                 *   1) evict first `a`
                 *   2) insert `b` at `0` index.
                 *   3) leave `a` at index `1` as is. <-- this is wrong!
                 *   3) reinsert `a` at index 2. <-- this is wrong!
                 *
                 * The correct behavior is:
                 *   1) evict first `a`
                 *   2) insert `b` at `0` index.
                 *   3) reinsert `a` at index 1.
                 *   3) move `a` at from `1` to `2`.
                 *
                 *
                 * Double check that we have not evicted a duplicate item. We need to check if the item type may
                 * have already been removed:
                 * The insertion of b will evict the first 'a'. If we don't reinsert it now it will be reinserted
                 * at the end. Which will show up as the two 'a's switching position. This is incorrect, since a
                 * better way to think of it is as insert of 'b' rather then switch 'a' with 'b' and then add 'a'
                 * at the end.
                 *
                 * @internal
                 */
                DefaultIterableDiffer.prototype._verifyReinsertion = function (record, item, itemTrackBy, index) {
                    var reinsertRecord = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy);
                    if (reinsertRecord !== null) {
                        record = this._reinsertAfter(reinsertRecord, record._prev, index);
                    }
                    else if (record.currentIndex != index) {
                        record.currentIndex = index;
                        this._addToMoves(record, index);
                    }
                    return record;
                };
                /**
                 * Get rid of any excess {@link CollectionChangeRecord}s from the previous collection
                 *
                 * - `record` The first excess {@link CollectionChangeRecord}.
                 *
                 * @internal
                 */
                DefaultIterableDiffer.prototype._truncate = function (record) {
                    // Anything after that needs to be removed;
                    while (record !== null) {
                        var nextRecord = record._next;
                        this._addToRemovals(this._unlink(record));
                        record = nextRecord;
                    }
                    if (this._unlinkedRecords !== null) {
                        this._unlinkedRecords.clear();
                    }
                    if (this._additionsTail !== null) {
                        this._additionsTail._nextAdded = null;
                    }
                    if (this._movesTail !== null) {
                        this._movesTail._nextMoved = null;
                    }
                    if (this._itTail !== null) {
                        this._itTail._next = null;
                    }
                    if (this._removalsTail !== null) {
                        this._removalsTail._nextRemoved = null;
                    }
                    if (this._identityChangesTail !== null) {
                        this._identityChangesTail._nextIdentityChange = null;
                    }
                };
                /** @internal */
                DefaultIterableDiffer.prototype._reinsertAfter = function (record, prevRecord, index) {
                    if (this._unlinkedRecords !== null) {
                        this._unlinkedRecords.remove(record);
                    }
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
                    this._insertAfter(record, prevRecord, index);
                    this._addToMoves(record, index);
                    return record;
                };
                /** @internal */
                DefaultIterableDiffer.prototype._moveAfter = function (record, prevRecord, index) {
                    this._unlink(record);
                    this._insertAfter(record, prevRecord, index);
                    this._addToMoves(record, index);
                    return record;
                };
                /** @internal */
                DefaultIterableDiffer.prototype._addAfter = function (record, prevRecord, index) {
                    this._insertAfter(record, prevRecord, index);
                    if (this._additionsTail === null) {
                        // todo(vicb)
                        // assert(this._additionsHead === null);
                        this._additionsTail = this._additionsHead = record;
                    }
                    else {
                        // todo(vicb)
                        // assert(_additionsTail._nextAdded === null);
                        // assert(record._nextAdded === null);
                        this._additionsTail = this._additionsTail._nextAdded = record;
                    }
                    return record;
                };
                /** @internal */
                DefaultIterableDiffer.prototype._insertAfter = function (record, prevRecord, index) {
                    // todo(vicb)
                    // assert(record != prevRecord);
                    // assert(record._next === null);
                    // assert(record._prev === null);
                    var next = prevRecord === null ? this._itHead : prevRecord._next;
                    // todo(vicb)
                    // assert(next != record);
                    // assert(prevRecord != record);
                    record._next = next;
                    record._prev = prevRecord;
                    if (next === null) {
                        this._itTail = record;
                    }
                    else {
                        next._prev = record;
                    }
                    if (prevRecord === null) {
                        this._itHead = record;
                    }
                    else {
                        prevRecord._next = record;
                    }
                    if (this._linkedRecords === null) {
                        this._linkedRecords = new _DuplicateMap();
                    }
                    this._linkedRecords.put(record);
                    record.currentIndex = index;
                    return record;
                };
                /** @internal */
                DefaultIterableDiffer.prototype._remove = function (record) {
                    return this._addToRemovals(this._unlink(record));
                };
                /** @internal */
                DefaultIterableDiffer.prototype._unlink = function (record) {
                    if (this._linkedRecords !== null) {
                        this._linkedRecords.remove(record);
                    }
                    var prev = record._prev;
                    var next = record._next;
                    // todo(vicb)
                    // assert((record._prev = null) === null);
                    // assert((record._next = null) === null);
                    if (prev === null) {
                        this._itHead = next;
                    }
                    else {
                        prev._next = next;
                    }
                    if (next === null) {
                        this._itTail = prev;
                    }
                    else {
                        next._prev = prev;
                    }
                    return record;
                };
                /** @internal */
                DefaultIterableDiffer.prototype._addToMoves = function (record, toIndex) {
                    // todo(vicb)
                    // assert(record._nextMoved === null);
                    if (record.previousIndex === toIndex) {
                        return record;
                    }
                    if (this._movesTail === null) {
                        // todo(vicb)
                        // assert(_movesHead === null);
                        this._movesTail = this._movesHead = record;
                    }
                    else {
                        // todo(vicb)
                        // assert(_movesTail._nextMoved === null);
                        this._movesTail = this._movesTail._nextMoved = record;
                    }
                    return record;
                };
                /** @internal */
                DefaultIterableDiffer.prototype._addToRemovals = function (record) {
                    if (this._unlinkedRecords === null) {
                        this._unlinkedRecords = new _DuplicateMap();
                    }
                    this._unlinkedRecords.put(record);
                    record.currentIndex = null;
                    record._nextRemoved = null;
                    if (this._removalsTail === null) {
                        // todo(vicb)
                        // assert(_removalsHead === null);
                        this._removalsTail = this._removalsHead = record;
                        record._prevRemoved = null;
                    }
                    else {
                        // todo(vicb)
                        // assert(_removalsTail._nextRemoved === null);
                        // assert(record._nextRemoved === null);
                        record._prevRemoved = this._removalsTail;
                        this._removalsTail = this._removalsTail._nextRemoved = record;
                    }
                    return record;
                };
                /** @internal */
                DefaultIterableDiffer.prototype._addIdentityChange = function (record, item) {
                    record.item = item;
                    if (this._identityChangesTail === null) {
                        this._identityChangesTail = this._identityChangesHead = record;
                    }
                    else {
                        this._identityChangesTail = this._identityChangesTail._nextIdentityChange = record;
                    }
                    return record;
                };
                DefaultIterableDiffer.prototype.toString = function () {
                    var list = [];
                    this.forEachItem(function (record) { return list.push(record); });
                    var previous = [];
                    this.forEachPreviousItem(function (record) { return previous.push(record); });
                    var additions = [];
                    this.forEachAddedItem(function (record) { return additions.push(record); });
                    var moves = [];
                    this.forEachMovedItem(function (record) { return moves.push(record); });
                    var removals = [];
                    this.forEachRemovedItem(function (record) { return removals.push(record); });
                    var identityChanges = [];
                    this.forEachIdentityChange(function (record) { return identityChanges.push(record); });
                    return "collection: " + list.join(', ') + "\n" + "previous: " + previous.join(', ') + "\n" +
                        "additions: " + additions.join(', ') + "\n" + "moves: " + moves.join(', ') + "\n" +
                        "removals: " + removals.join(', ') + "\n" + "identityChanges: " +
                        identityChanges.join(', ') + "\n";
                };
                return DefaultIterableDiffer;
            }());
            exports_1("DefaultIterableDiffer", DefaultIterableDiffer);
            CollectionChangeRecord = (function () {
                function CollectionChangeRecord(item, trackById) {
                    this.item = item;
                    this.trackById = trackById;
                    this.currentIndex = null;
                    this.previousIndex = null;
                    /** @internal */
                    this._nextPrevious = null;
                    /** @internal */
                    this._prev = null;
                    /** @internal */
                    this._next = null;
                    /** @internal */
                    this._prevDup = null;
                    /** @internal */
                    this._nextDup = null;
                    /** @internal */
                    this._prevRemoved = null;
                    /** @internal */
                    this._nextRemoved = null;
                    /** @internal */
                    this._nextAdded = null;
                    /** @internal */
                    this._nextMoved = null;
                    /** @internal */
                    this._nextIdentityChange = null;
                }
                CollectionChangeRecord.prototype.toString = function () {
                    return this.previousIndex === this.currentIndex ?
                        lang_2.stringify(this.item) :
                        lang_2.stringify(this.item) + '[' + lang_2.stringify(this.previousIndex) + '->' +
                            lang_2.stringify(this.currentIndex) + ']';
                };
                return CollectionChangeRecord;
            }());
            exports_1("CollectionChangeRecord", CollectionChangeRecord);
            // A linked list of CollectionChangeRecords with the same CollectionChangeRecord.item
            _DuplicateItemRecordList = (function () {
                function _DuplicateItemRecordList() {
                    /** @internal */
                    this._head = null;
                    /** @internal */
                    this._tail = null;
                }
                /**
                 * Append the record to the list of duplicates.
                 *
                 * Note: by design all records in the list of duplicates hold the same value in record.item.
                 */
                _DuplicateItemRecordList.prototype.add = function (record) {
                    if (this._head === null) {
                        this._head = this._tail = record;
                        record._nextDup = null;
                        record._prevDup = null;
                    }
                    else {
                        // todo(vicb)
                        // assert(record.item ==  _head.item ||
                        //       record.item is num && record.item.isNaN && _head.item is num && _head.item.isNaN);
                        this._tail._nextDup = record;
                        record._prevDup = this._tail;
                        record._nextDup = null;
                        this._tail = record;
                    }
                };
                // Returns a CollectionChangeRecord having CollectionChangeRecord.trackById == trackById and
                // CollectionChangeRecord.currentIndex >= afterIndex
                _DuplicateItemRecordList.prototype.get = function (trackById, afterIndex) {
                    var record;
                    for (record = this._head; record !== null; record = record._nextDup) {
                        if ((afterIndex === null || afterIndex < record.currentIndex) &&
                            lang_2.looseIdentical(record.trackById, trackById)) {
                            return record;
                        }
                    }
                    return null;
                };
                /**
                 * Remove one {@link CollectionChangeRecord} from the list of duplicates.
                 *
                 * Returns whether the list of duplicates is empty.
                 */
                _DuplicateItemRecordList.prototype.remove = function (record) {
                    // todo(vicb)
                    // assert(() {
                    //  // verify that the record being removed is in the list.
                    //  for (CollectionChangeRecord cursor = _head; cursor != null; cursor = cursor._nextDup) {
                    //    if (identical(cursor, record)) return true;
                    //  }
                    //  return false;
                    //});
                    var prev = record._prevDup;
                    var next = record._nextDup;
                    if (prev === null) {
                        this._head = next;
                    }
                    else {
                        prev._nextDup = next;
                    }
                    if (next === null) {
                        this._tail = prev;
                    }
                    else {
                        next._prevDup = prev;
                    }
                    return this._head === null;
                };
                return _DuplicateItemRecordList;
            }());
            _DuplicateMap = (function () {
                function _DuplicateMap() {
                    this.map = new Map();
                }
                _DuplicateMap.prototype.put = function (record) {
                    // todo(vicb) handle corner cases
                    var key = lang_2.getMapKey(record.trackById);
                    var duplicates = this.map.get(key);
                    if (!lang_2.isPresent(duplicates)) {
                        duplicates = new _DuplicateItemRecordList();
                        this.map.set(key, duplicates);
                    }
                    duplicates.add(record);
                };
                /**
                 * Retrieve the `value` using key. Because the CollectionChangeRecord value may be one which we
                 * have already iterated over, we use the afterIndex to pretend it is not there.
                 *
                 * Use case: `[a, b, c, a, a]` if we are at index `3` which is the second `a` then asking if we
                 * have any more `a`s needs to return the last `a` not the first or second.
                 */
                _DuplicateMap.prototype.get = function (trackById, afterIndex) {
                    if (afterIndex === void 0) { afterIndex = null; }
                    var key = lang_2.getMapKey(trackById);
                    var recordList = this.map.get(key);
                    return lang_2.isBlank(recordList) ? null : recordList.get(trackById, afterIndex);
                };
                /**
                 * Removes a {@link CollectionChangeRecord} from the list of duplicates.
                 *
                 * The list of duplicates also is removed from the map if it gets empty.
                 */
                _DuplicateMap.prototype.remove = function (record) {
                    var key = lang_2.getMapKey(record.trackById);
                    // todo(vicb)
                    // assert(this.map.containsKey(key));
                    var recordList = this.map.get(key);
                    // Remove the list of duplicates when it gets empty
                    if (recordList.remove(record)) {
                        this.map.delete(key);
                    }
                    return record;
                };
                Object.defineProperty(_DuplicateMap.prototype, "isEmpty", {
                    get: function () { return this.map.size === 0; },
                    enumerable: true,
                    configurable: true
                });
                _DuplicateMap.prototype.clear = function () { this.map.clear(); };
                _DuplicateMap.prototype.toString = function () { return '_DuplicateMap(' + lang_2.stringify(this.map) + ')'; };
                return _DuplicateMap;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9kaWZmZXJzL2RlZmF1bHRfaXRlcmFibGVfZGlmZmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7c0NBd0JJLGVBQWU7Ozs7Ozs7Ozs7Ozs7O1lBUG5CO2dCQUFBO2dCQUtBLENBQUM7Z0JBSkMsK0NBQVEsR0FBUixVQUFTLEdBQVcsSUFBYSxNQUFNLENBQUMsK0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsRSw2Q0FBTSxHQUFOLFVBQU8sS0FBd0IsRUFBRSxTQUFxQjtvQkFDcEQsTUFBTSxDQUFDLElBQUkscUJBQXFCLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzlDLENBQUM7Z0JBTEg7b0JBQUMsWUFBSyxFQUFFOztnREFBQTtnQkFNUixtQ0FBQztZQUFELENBTEEsQUFLQyxJQUFBO1lBTEQsdUVBS0MsQ0FBQTtZQUVHLGVBQWUsR0FBRyxVQUFDLEtBQWEsRUFBRSxJQUFTLElBQUssT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDO1lBRXpEO2dCQW9CRSwrQkFBb0IsVUFBc0I7b0JBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7b0JBbkJsQyxZQUFPLEdBQVcsSUFBSSxDQUFDO29CQUN2QixnQkFBVyxHQUFHLElBQUksQ0FBQztvQkFDM0IsMEZBQTBGO29CQUNsRixtQkFBYyxHQUFrQixJQUFJLENBQUM7b0JBQzdDLG1GQUFtRjtvQkFDM0UscUJBQWdCLEdBQWtCLElBQUksQ0FBQztvQkFDdkMsb0JBQWUsR0FBMkIsSUFBSSxDQUFDO29CQUMvQyxZQUFPLEdBQTJCLElBQUksQ0FBQztvQkFDdkMsWUFBTyxHQUEyQixJQUFJLENBQUM7b0JBQ3ZDLG1CQUFjLEdBQTJCLElBQUksQ0FBQztvQkFDOUMsbUJBQWMsR0FBMkIsSUFBSSxDQUFDO29CQUM5QyxlQUFVLEdBQTJCLElBQUksQ0FBQztvQkFDMUMs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TUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDdkIsQ0FBQztvQkFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNoQixDQUFDO2dCQUVELHNCQUFJLGtDQUFPO3lCQUFYLGNBQXlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBRXRELDZCQUFLLEdBQUwsY0FBVSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFN0IsZ0NBQVEsR0FBUixjQUFxQixNQUFNLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDN0Usb0JBQUM7WUFBRCxDQW5EQSxBQW1EQyxJQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9kaWZmZXJzL2RlZmF1bHRfaXRlcmFibGVfZGlmZmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDT05TVH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7aXNMaXN0TGlrZUl0ZXJhYmxlLCBpdGVyYXRlTGlzdExpa2UsIExpc3RXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuXG5pbXBvcnQge1xuICBpc0JsYW5rLFxuICBpc1ByZXNlbnQsXG4gIHN0cmluZ2lmeSxcbiAgZ2V0TWFwS2V5LFxuICBsb29zZUlkZW50aWNhbCxcbiAgaXNBcnJheVxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG5pbXBvcnQge0NoYW5nZURldGVjdG9yUmVmfSBmcm9tICcuLi9jaGFuZ2VfZGV0ZWN0b3JfcmVmJztcbmltcG9ydCB7SXRlcmFibGVEaWZmZXIsIEl0ZXJhYmxlRGlmZmVyRmFjdG9yeSwgVHJhY2tCeUZufSBmcm9tICcuLi9kaWZmZXJzL2l0ZXJhYmxlX2RpZmZlcnMnO1xuXG5AQ09OU1QoKVxuZXhwb3J0IGNsYXNzIERlZmF1bHRJdGVyYWJsZURpZmZlckZhY3RvcnkgaW1wbGVtZW50cyBJdGVyYWJsZURpZmZlckZhY3Rvcnkge1xuICBzdXBwb3J0cyhvYmo6IE9iamVjdCk6IGJvb2xlYW4geyByZXR1cm4gaXNMaXN0TGlrZUl0ZXJhYmxlKG9iaik7IH1cbiAgY3JlYXRlKGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgdHJhY2tCeUZuPzogVHJhY2tCeUZuKTogRGVmYXVsdEl0ZXJhYmxlRGlmZmVyIHtcbiAgICByZXR1cm4gbmV3IERlZmF1bHRJdGVyYWJsZURpZmZlcih0cmFja0J5Rm4pO1xuICB9XG59XG5cbnZhciB0cmFja0J5SWRlbnRpdHkgPSAoaW5kZXg6IG51bWJlciwgaXRlbTogYW55KSA9PiBpdGVtO1xuXG5leHBvcnQgY2xhc3MgRGVmYXVsdEl0ZXJhYmxlRGlmZmVyIGltcGxlbWVudHMgSXRlcmFibGVEaWZmZXIge1xuICBwcml2YXRlIF9sZW5ndGg6IG51bWJlciA9IG51bGw7XG4gIHByaXZhdGUgX2NvbGxlY3Rpb24gPSBudWxsO1xuICAvLyBLZWVwcyB0cmFjayBvZiB0aGUgdXNlZCByZWNvcmRzIGF0IGFueSBwb2ludCBpbiB0aW1lIChkdXJpbmcgJiBhY3Jvc3MgYF9jaGVjaygpYCBjYWxscylcbiAgcHJpdmF0ZSBfbGlua2VkUmVjb3JkczogX0R1cGxpY2F0ZU1hcCA9IG51bGw7XG4gIC8vIEtlZXBzIHRyYWNrIG9mIHRoZSByZW1vdmVkIHJlY29yZHMgYXQgYW55IHBvaW50IGluIHRpbWUgZHVyaW5nIGBfY2hlY2soKWAgY2FsbHMuXG4gIHByaXZhdGUgX3VubGlua2VkUmVjb3JkczogX0R1cGxpY2F0ZU1hcCA9IG51bGw7XG4gIHByaXZhdGUgX3ByZXZpb3VzSXRIZWFkOiBDb2xsZWN0aW9uQ2hhbmdlUmVjb3JkID0gbnVsbDtcbiAgcHJpdmF0ZSBfaXRIZWFkOiBDb2xsZWN0aW9uQ2hhbmdlUmVjb3JkID0gbnVsbDtcbiAgcHJpdmF0ZSBfaXRUYWlsOiBDb2xsZWN0aW9uQ2hhbmdlUmVjb3JkID0gbnVsbDtcbiAgcHJpdmF0ZSBfYWRkaXRpb25zSGVhZDogQ29sbGVjdGlvbkNoYW5nZVJlY29yZCA9IG51bGw7XG4gIHByaXZhdGUgX2FkZGl0aW9uc1RhaWw6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQgPSBudWxsO1xuICBwcml2YXRlIF9tb3Zlc0hlYWQ6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQgPSBudWxsO1xuICBwcml2YXRlIF9tb3Zlc1RhaWw6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQgPSBudWxsO1xuICBwcml2YXRlIF9yZW1vdmFsc0hlYWQ6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQgPSBudWxsO1xuICBwcml2YXRlIF9yZW1vdmFsc1RhaWw6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQgPSBudWxsO1xuICAvLyBLZWVwcyB0cmFjayBvZiByZWNvcmRzIHdoZXJlIGN1c3RvbSB0cmFjayBieSBpcyB0aGUgc2FtZSwgYnV0IGl0ZW0gaWRlbnRpdHkgaGFzIGNoYW5nZWRcbiAgcHJpdmF0ZSBfaWRlbnRpdHlDaGFuZ2VzSGVhZDogQ29sbGVjdGlvbkNoYW5nZVJlY29yZCA9IG51bGw7XG4gIHByaXZhdGUgX2lkZW50aXR5Q2hhbmdlc1RhaWw6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3RyYWNrQnlGbj86IFRyYWNrQnlGbikge1xuICAgIHRoaXMuX3RyYWNrQnlGbiA9IGlzUHJlc2VudCh0aGlzLl90cmFja0J5Rm4pID8gdGhpcy5fdHJhY2tCeUZuIDogdHJhY2tCeUlkZW50aXR5O1xuICB9XG5cbiAgZ2V0IGNvbGxlY3Rpb24oKSB7IHJldHVybiB0aGlzLl9jb2xsZWN0aW9uOyB9XG5cbiAgZ2V0IGxlbmd0aCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbGVuZ3RoOyB9XG5cbiAgZm9yRWFjaEl0ZW0oZm46IEZ1bmN0aW9uKSB7XG4gICAgdmFyIHJlY29yZDogQ29sbGVjdGlvbkNoYW5nZVJlY29yZDtcbiAgICBmb3IgKHJlY29yZCA9IHRoaXMuX2l0SGVhZDsgcmVjb3JkICE9PSBudWxsOyByZWNvcmQgPSByZWNvcmQuX25leHQpIHtcbiAgICAgIGZuKHJlY29yZCk7XG4gICAgfVxuICB9XG5cbiAgZm9yRWFjaFByZXZpb3VzSXRlbShmbjogRnVuY3Rpb24pIHtcbiAgICB2YXIgcmVjb3JkOiBDb2xsZWN0aW9uQ2hhbmdlUmVjb3JkO1xuICAgIGZvciAocmVjb3JkID0gdGhpcy5fcHJldmlvdXNJdEhlYWQ7IHJlY29yZCAhPT0gbnVsbDsgcmVjb3JkID0gcmVjb3JkLl9uZXh0UHJldmlvdXMpIHtcbiAgICAgIGZuKHJlY29yZCk7XG4gICAgfVxuICB9XG5cbiAgZm9yRWFjaEFkZGVkSXRlbShmbjogRnVuY3Rpb24pIHtcbiAgICB2YXIgcmVjb3JkOiBDb2xsZWN0aW9uQ2hhbmdlUmVjb3JkO1xuICAgIGZvciAocmVjb3JkID0gdGhpcy5fYWRkaXRpb25zSGVhZDsgcmVjb3JkICE9PSBudWxsOyByZWNvcmQgPSByZWNvcmQuX25leHRBZGRlZCkge1xuICAgICAgZm4ocmVjb3JkKTtcbiAgICB9XG4gIH1cblxuICBmb3JFYWNoTW92ZWRJdGVtKGZuOiBGdW5jdGlvbikge1xuICAgIHZhciByZWNvcmQ6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQ7XG4gICAgZm9yIChyZWNvcmQgPSB0aGlzLl9tb3Zlc0hlYWQ7IHJlY29yZCAhPT0gbnVsbDsgcmVjb3JkID0gcmVjb3JkLl9uZXh0TW92ZWQpIHtcbiAgICAgIGZuKHJlY29yZCk7XG4gICAgfVxuICB9XG5cbiAgZm9yRWFjaFJlbW92ZWRJdGVtKGZuOiBGdW5jdGlvbikge1xuICAgIHZhciByZWNvcmQ6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQ7XG4gICAgZm9yIChyZWNvcmQgPSB0aGlzLl9yZW1vdmFsc0hlYWQ7IHJlY29yZCAhPT0gbnVsbDsgcmVjb3JkID0gcmVjb3JkLl9uZXh0UmVtb3ZlZCkge1xuICAgICAgZm4ocmVjb3JkKTtcbiAgICB9XG4gIH1cblxuICBmb3JFYWNoSWRlbnRpdHlDaGFuZ2UoZm46IEZ1bmN0aW9uKSB7XG4gICAgdmFyIHJlY29yZDogQ29sbGVjdGlvbkNoYW5nZVJlY29yZDtcbiAgICBmb3IgKHJlY29yZCA9IHRoaXMuX2lkZW50aXR5Q2hhbmdlc0hlYWQ7IHJlY29yZCAhPT0gbnVsbDsgcmVjb3JkID0gcmVjb3JkLl9uZXh0SWRlbnRpdHlDaGFuZ2UpIHtcbiAgICAgIGZuKHJlY29yZCk7XG4gICAgfVxuICB9XG5cbiAgZGlmZihjb2xsZWN0aW9uOiBhbnkpOiBEZWZhdWx0SXRlcmFibGVEaWZmZXIge1xuICAgIGlmIChpc0JsYW5rKGNvbGxlY3Rpb24pKSBjb2xsZWN0aW9uID0gW107XG4gICAgaWYgKCFpc0xpc3RMaWtlSXRlcmFibGUoY29sbGVjdGlvbikpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBFcnJvciB0cnlpbmcgdG8gZGlmZiAnJHtjb2xsZWN0aW9ufSdgKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jaGVjayhjb2xsZWN0aW9uKSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIG9uRGVzdHJveSgpIHt9XG5cbiAgY2hlY2soY29sbGVjdGlvbjogYW55KTogYm9vbGVhbiB7XG4gICAgdGhpcy5fcmVzZXQoKTtcblxuICAgIHZhciByZWNvcmQ6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQgPSB0aGlzLl9pdEhlYWQ7XG4gICAgdmFyIG1heUJlRGlydHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICB2YXIgaW5kZXg6IG51bWJlcjtcbiAgICB2YXIgaXRlbTtcbiAgICB2YXIgaXRlbVRyYWNrQnk7XG4gICAgaWYgKGlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICAgIGlmIChjb2xsZWN0aW9uICE9PSB0aGlzLl9jb2xsZWN0aW9uIHx8ICFMaXN0V3JhcHBlci5pc0ltbXV0YWJsZShjb2xsZWN0aW9uKSkge1xuICAgICAgICB2YXIgbGlzdCA9IGNvbGxlY3Rpb247XG4gICAgICAgIHRoaXMuX2xlbmd0aCA9IGNvbGxlY3Rpb24ubGVuZ3RoO1xuXG4gICAgICAgIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuX2xlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgIGl0ZW0gPSBsaXN0W2luZGV4XTtcbiAgICAgICAgICBpdGVtVHJhY2tCeSA9IHRoaXMuX3RyYWNrQnlGbihpbmRleCwgaXRlbSk7XG4gICAgICAgICAgaWYgKHJlY29yZCA9PT0gbnVsbCB8fCAhbG9vc2VJZGVudGljYWwocmVjb3JkLnRyYWNrQnlJZCwgaXRlbVRyYWNrQnkpKSB7XG4gICAgICAgICAgICByZWNvcmQgPSB0aGlzLl9taXNtYXRjaChyZWNvcmQsIGl0ZW0sIGl0ZW1UcmFja0J5LCBpbmRleCk7XG4gICAgICAgICAgICBtYXlCZURpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG1heUJlRGlydHkpIHtcbiAgICAgICAgICAgICAgLy8gVE9ETyhtaXNrbyk6IGNhbiB3ZSBsaW1pdCB0aGlzIHRvIGR1cGxpY2F0ZXMgb25seT9cbiAgICAgICAgICAgICAgcmVjb3JkID0gdGhpcy5fdmVyaWZ5UmVpbnNlcnRpb24ocmVjb3JkLCBpdGVtLCBpdGVtVHJhY2tCeSwgaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFsb29zZUlkZW50aWNhbChyZWNvcmQuaXRlbSwgaXRlbSkpIHRoaXMuX2FkZElkZW50aXR5Q2hhbmdlKHJlY29yZCwgaXRlbSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVjb3JkID0gcmVjb3JkLl9uZXh0O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3RydW5jYXRlKHJlY29yZCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGluZGV4ID0gMDtcbiAgICAgIGl0ZXJhdGVMaXN0TGlrZShjb2xsZWN0aW9uLCAoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtVHJhY2tCeSA9IHRoaXMuX3RyYWNrQnlGbihpbmRleCwgaXRlbSk7XG4gICAgICAgIGlmIChyZWNvcmQgPT09IG51bGwgfHwgIWxvb3NlSWRlbnRpY2FsKHJlY29yZC50cmFja0J5SWQsIGl0ZW1UcmFja0J5KSkge1xuICAgICAgICAgIHJlY29yZCA9IHRoaXMuX21pc21hdGNoKHJlY29yZCwgaXRlbSwgaXRlbVRyYWNrQnksIGluZGV4KTtcbiAgICAgICAgICBtYXlCZURpcnR5ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAobWF5QmVEaXJ0eSkge1xuICAgICAgICAgICAgLy8gVE9ETyhtaXNrbyk6IGNhbiB3ZSBsaW1pdCB0aGlzIHRvIGR1cGxpY2F0ZXMgb25seT9cbiAgICAgICAgICAgIHJlY29yZCA9IHRoaXMuX3ZlcmlmeVJlaW5zZXJ0aW9uKHJlY29yZCwgaXRlbSwgaXRlbVRyYWNrQnksIGluZGV4KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFsb29zZUlkZW50aWNhbChyZWNvcmQuaXRlbSwgaXRlbSkpIHRoaXMuX2FkZElkZW50aXR5Q2hhbmdlKHJlY29yZCwgaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVjb3JkID0gcmVjb3JkLl9uZXh0O1xuICAgICAgICBpbmRleCsrO1xuICAgICAgfSk7XG4gICAgICB0aGlzLl9sZW5ndGggPSBpbmRleDtcbiAgICAgIHRoaXMuX3RydW5jYXRlKHJlY29yZCk7XG4gICAgfVxuXG4gICAgdGhpcy5fY29sbGVjdGlvbiA9IGNvbGxlY3Rpb247XG4gICAgcmV0dXJuIHRoaXMuaXNEaXJ0eTtcbiAgfVxuXG4gIC8qIENvbGxlY3Rpb25DaGFuZ2VzIGlzIGNvbnNpZGVyZWQgZGlydHkgaWYgaXQgaGFzIGFueSBhZGRpdGlvbnMsIG1vdmVzLCByZW1vdmFscywgb3IgaWRlbnRpdHlcbiAgICogY2hhbmdlcy5cbiAgICovXG4gIGdldCBpc0RpcnR5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9hZGRpdGlvbnNIZWFkICE9PSBudWxsIHx8IHRoaXMuX21vdmVzSGVhZCAhPT0gbnVsbCB8fFxuICAgICAgICAgICB0aGlzLl9yZW1vdmFsc0hlYWQgIT09IG51bGwgfHwgdGhpcy5faWRlbnRpdHlDaGFuZ2VzSGVhZCAhPT0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgc3RhdGUgb2YgdGhlIGNoYW5nZSBvYmplY3RzIHRvIHNob3cgbm8gY2hhbmdlcy4gVGhpcyBtZWFucyBzZXQgcHJldmlvdXNLZXkgdG9cbiAgICogY3VycmVudEtleSwgYW5kIGNsZWFyIGFsbCBvZiB0aGUgcXVldWVzIChhZGRpdGlvbnMsIG1vdmVzLCByZW1vdmFscykuXG4gICAqIFNldCB0aGUgcHJldmlvdXNJbmRleGVzIG9mIG1vdmVkIGFuZCBhZGRlZCBpdGVtcyB0byB0aGVpciBjdXJyZW50SW5kZXhlc1xuICAgKiBSZXNldCB0aGUgbGlzdCBvZiBhZGRpdGlvbnMsIG1vdmVzIGFuZCByZW1vdmFsc1xuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIF9yZXNldCgpIHtcbiAgICBpZiAodGhpcy5pc0RpcnR5KSB7XG4gICAgICB2YXIgcmVjb3JkOiBDb2xsZWN0aW9uQ2hhbmdlUmVjb3JkO1xuICAgICAgdmFyIG5leHRSZWNvcmQ6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQ7XG5cbiAgICAgIGZvciAocmVjb3JkID0gdGhpcy5fcHJldmlvdXNJdEhlYWQgPSB0aGlzLl9pdEhlYWQ7IHJlY29yZCAhPT0gbnVsbDsgcmVjb3JkID0gcmVjb3JkLl9uZXh0KSB7XG4gICAgICAgIHJlY29yZC5fbmV4dFByZXZpb3VzID0gcmVjb3JkLl9uZXh0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHJlY29yZCA9IHRoaXMuX2FkZGl0aW9uc0hlYWQ7IHJlY29yZCAhPT0gbnVsbDsgcmVjb3JkID0gcmVjb3JkLl9uZXh0QWRkZWQpIHtcbiAgICAgICAgcmVjb3JkLnByZXZpb3VzSW5kZXggPSByZWNvcmQuY3VycmVudEluZGV4O1xuICAgICAgfVxuICAgICAgdGhpcy5fYWRkaXRpb25zSGVhZCA9IHRoaXMuX2FkZGl0aW9uc1RhaWwgPSBudWxsO1xuXG4gICAgICBmb3IgKHJlY29yZCA9IHRoaXMuX21vdmVzSGVhZDsgcmVjb3JkICE9PSBudWxsOyByZWNvcmQgPSBuZXh0UmVjb3JkKSB7XG4gICAgICAgIHJlY29yZC5wcmV2aW91c0luZGV4ID0gcmVjb3JkLmN1cnJlbnRJbmRleDtcbiAgICAgICAgbmV4dFJlY29yZCA9IHJlY29yZC5fbmV4dE1vdmVkO1xuICAgICAgfVxuICAgICAgdGhpcy5fbW92ZXNIZWFkID0gdGhpcy5fbW92ZXNUYWlsID0gbnVsbDtcbiAgICAgIHRoaXMuX3JlbW92YWxzSGVhZCA9IHRoaXMuX3JlbW92YWxzVGFpbCA9IG51bGw7XG4gICAgICB0aGlzLl9pZGVudGl0eUNoYW5nZXNIZWFkID0gdGhpcy5faWRlbnRpdHlDaGFuZ2VzVGFpbCA9IG51bGw7XG5cbiAgICAgIC8vIHRvZG8odmljYikgd2hlbiBhc3NlcnQgZ2V0cyBzdXBwb3J0ZWRcbiAgICAgIC8vIGFzc2VydCghdGhpcy5pc0RpcnR5KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBpcyB0aGUgY29yZSBmdW5jdGlvbiB3aGljaCBoYW5kbGVzIGRpZmZlcmVuY2VzIGJldHdlZW4gY29sbGVjdGlvbnMuXG4gICAqXG4gICAqIC0gYHJlY29yZGAgaXMgdGhlIHJlY29yZCB3aGljaCB3ZSBzYXcgYXQgdGhpcyBwb3NpdGlvbiBsYXN0IHRpbWUuIElmIG51bGwgdGhlbiBpdCBpcyBhIG5ld1xuICAgKiAgIGl0ZW0uXG4gICAqIC0gYGl0ZW1gIGlzIHRoZSBjdXJyZW50IGl0ZW0gaW4gdGhlIGNvbGxlY3Rpb25cbiAgICogLSBgaW5kZXhgIGlzIHRoZSBwb3NpdGlvbiBvZiB0aGUgaXRlbSBpbiB0aGUgY29sbGVjdGlvblxuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIF9taXNtYXRjaChyZWNvcmQ6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQsIGl0ZW06IGFueSwgaXRlbVRyYWNrQnk6IGFueSxcbiAgICAgICAgICAgIGluZGV4OiBudW1iZXIpOiBDb2xsZWN0aW9uQ2hhbmdlUmVjb3JkIHtcbiAgICAvLyBUaGUgcHJldmlvdXMgcmVjb3JkIGFmdGVyIHdoaWNoIHdlIHdpbGwgYXBwZW5kIHRoZSBjdXJyZW50IG9uZS5cbiAgICB2YXIgcHJldmlvdXNSZWNvcmQ6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQ7XG5cbiAgICBpZiAocmVjb3JkID09PSBudWxsKSB7XG4gICAgICBwcmV2aW91c1JlY29yZCA9IHRoaXMuX2l0VGFpbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJldmlvdXNSZWNvcmQgPSByZWNvcmQuX3ByZXY7XG4gICAgICAvLyBSZW1vdmUgdGhlIHJlY29yZCBmcm9tIHRoZSBjb2xsZWN0aW9uIHNpbmNlIHdlIGtub3cgaXQgZG9lcyBub3QgbWF0Y2ggdGhlIGl0ZW0uXG4gICAgICB0aGlzLl9yZW1vdmUocmVjb3JkKTtcbiAgICB9XG5cbiAgICAvLyBBdHRlbXB0IHRvIHNlZSBpZiB3ZSBoYXZlIHNlZW4gdGhlIGl0ZW0gYmVmb3JlLlxuICAgIHJlY29yZCA9IHRoaXMuX2xpbmtlZFJlY29yZHMgPT09IG51bGwgPyBudWxsIDogdGhpcy5fbGlua2VkUmVjb3Jkcy5nZXQoaXRlbVRyYWNrQnksIGluZGV4KTtcbiAgICBpZiAocmVjb3JkICE9PSBudWxsKSB7XG4gICAgICAvLyBXZSBoYXZlIHNlZW4gdGhpcyBiZWZvcmUsIHdlIG5lZWQgdG8gbW92ZSBpdCBmb3J3YXJkIGluIHRoZSBjb2xsZWN0aW9uLlxuICAgICAgLy8gQnV0IGZpcnN0IHdlIG5lZWQgdG8gY2hlY2sgaWYgaWRlbnRpdHkgY2hhbmdlZCwgc28gd2UgY2FuIHVwZGF0ZSBpbiB2aWV3IGlmIG5lY2Vzc2FyeVxuICAgICAgaWYgKCFsb29zZUlkZW50aWNhbChyZWNvcmQuaXRlbSwgaXRlbSkpIHRoaXMuX2FkZElkZW50aXR5Q2hhbmdlKHJlY29yZCwgaXRlbSk7XG5cbiAgICAgIHRoaXMuX21vdmVBZnRlcihyZWNvcmQsIHByZXZpb3VzUmVjb3JkLCBpbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE5ldmVyIHNlZW4gaXQsIGNoZWNrIGV2aWN0ZWQgbGlzdC5cbiAgICAgIHJlY29yZCA9IHRoaXMuX3VubGlua2VkUmVjb3JkcyA9PT0gbnVsbCA/IG51bGwgOiB0aGlzLl91bmxpbmtlZFJlY29yZHMuZ2V0KGl0ZW1UcmFja0J5KTtcbiAgICAgIGlmIChyZWNvcmQgIT09IG51bGwpIHtcbiAgICAgICAgLy8gSXQgaXMgYW4gaXRlbSB3aGljaCB3ZSBoYXZlIGV2aWN0ZWQgZWFybGllcjogcmVpbnNlcnQgaXQgYmFjayBpbnRvIHRoZSBsaXN0LlxuICAgICAgICAvLyBCdXQgZmlyc3Qgd2UgbmVlZCB0byBjaGVjayBpZiBpZGVudGl0eSBjaGFuZ2VkLCBzbyB3ZSBjYW4gdXBkYXRlIGluIHZpZXcgaWYgbmVjZXNzYXJ5XG4gICAgICAgIGlmICghbG9vc2VJZGVudGljYWwocmVjb3JkLml0ZW0sIGl0ZW0pKSB0aGlzLl9hZGRJZGVudGl0eUNoYW5nZShyZWNvcmQsIGl0ZW0pO1xuXG4gICAgICAgIHRoaXMuX3JlaW5zZXJ0QWZ0ZXIocmVjb3JkLCBwcmV2aW91c1JlY29yZCwgaW5kZXgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSXQgaXMgYSBuZXcgaXRlbTogYWRkIGl0LlxuICAgICAgICByZWNvcmQgPVxuICAgICAgICAgICAgdGhpcy5fYWRkQWZ0ZXIobmV3IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQoaXRlbSwgaXRlbVRyYWNrQnkpLCBwcmV2aW91c1JlY29yZCwgaW5kZXgpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVjb3JkO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgY2hlY2sgaXMgb25seSBuZWVkZWQgaWYgYW4gYXJyYXkgY29udGFpbnMgZHVwbGljYXRlcy4gKFNob3J0IGNpcmN1aXQgb2Ygbm90aGluZyBkaXJ0eSlcbiAgICpcbiAgICogVXNlIGNhc2U6IGBbYSwgYV1gID0+IGBbYiwgYSwgYV1gXG4gICAqXG4gICAqIElmIHdlIGRpZCBub3QgaGF2ZSB0aGlzIGNoZWNrIHRoZW4gdGhlIGluc2VydGlvbiBvZiBgYmAgd291bGQ6XG4gICAqICAgMSkgZXZpY3QgZmlyc3QgYGFgXG4gICAqICAgMikgaW5zZXJ0IGBiYCBhdCBgMGAgaW5kZXguXG4gICAqICAgMykgbGVhdmUgYGFgIGF0IGluZGV4IGAxYCBhcyBpcy4gPC0tIHRoaXMgaXMgd3JvbmchXG4gICAqICAgMykgcmVpbnNlcnQgYGFgIGF0IGluZGV4IDIuIDwtLSB0aGlzIGlzIHdyb25nIVxuICAgKlxuICAgKiBUaGUgY29ycmVjdCBiZWhhdmlvciBpczpcbiAgICogICAxKSBldmljdCBmaXJzdCBgYWBcbiAgICogICAyKSBpbnNlcnQgYGJgIGF0IGAwYCBpbmRleC5cbiAgICogICAzKSByZWluc2VydCBgYWAgYXQgaW5kZXggMS5cbiAgICogICAzKSBtb3ZlIGBhYCBhdCBmcm9tIGAxYCB0byBgMmAuXG4gICAqXG4gICAqXG4gICAqIERvdWJsZSBjaGVjayB0aGF0IHdlIGhhdmUgbm90IGV2aWN0ZWQgYSBkdXBsaWNhdGUgaXRlbS4gV2UgbmVlZCB0byBjaGVjayBpZiB0aGUgaXRlbSB0eXBlIG1heVxuICAgKiBoYXZlIGFscmVhZHkgYmVlbiByZW1vdmVkOlxuICAgKiBUaGUgaW5zZXJ0aW9uIG9mIGIgd2lsbCBldmljdCB0aGUgZmlyc3QgJ2EnLiBJZiB3ZSBkb24ndCByZWluc2VydCBpdCBub3cgaXQgd2lsbCBiZSByZWluc2VydGVkXG4gICAqIGF0IHRoZSBlbmQuIFdoaWNoIHdpbGwgc2hvdyB1cCBhcyB0aGUgdHdvICdhJ3Mgc3dpdGNoaW5nIHBvc2l0aW9uLiBUaGlzIGlzIGluY29ycmVjdCwgc2luY2UgYVxuICAgKiBiZXR0ZXIgd2F5IHRvIHRoaW5rIG9mIGl0IGlzIGFzIGluc2VydCBvZiAnYicgcmF0aGVyIHRoZW4gc3dpdGNoICdhJyB3aXRoICdiJyBhbmQgdGhlbiBhZGQgJ2EnXG4gICAqIGF0IHRoZSBlbmQuXG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgX3ZlcmlmeVJlaW5zZXJ0aW9uKHJlY29yZDogQ29sbGVjdGlvbkNoYW5nZVJlY29yZCwgaXRlbTogYW55LCBpdGVtVHJhY2tCeTogYW55LFxuICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IG51bWJlcik6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQge1xuICAgIHZhciByZWluc2VydFJlY29yZDogQ29sbGVjdGlvbkNoYW5nZVJlY29yZCA9XG4gICAgICAgIHRoaXMuX3VubGlua2VkUmVjb3JkcyA9PT0gbnVsbCA/IG51bGwgOiB0aGlzLl91bmxpbmtlZFJlY29yZHMuZ2V0KGl0ZW1UcmFja0J5KTtcbiAgICBpZiAocmVpbnNlcnRSZWNvcmQgIT09IG51bGwpIHtcbiAgICAgIHJlY29yZCA9IHRoaXMuX3JlaW5zZXJ0QWZ0ZXIocmVpbnNlcnRSZWNvcmQsIHJlY29yZC5fcHJldiwgaW5kZXgpO1xuICAgIH0gZWxzZSBpZiAocmVjb3JkLmN1cnJlbnRJbmRleCAhPSBpbmRleCkge1xuICAgICAgcmVjb3JkLmN1cnJlbnRJbmRleCA9IGluZGV4O1xuICAgICAgdGhpcy5fYWRkVG9Nb3ZlcyhyZWNvcmQsIGluZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlY29yZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgcmlkIG9mIGFueSBleGNlc3Mge0BsaW5rIENvbGxlY3Rpb25DaGFuZ2VSZWNvcmR9cyBmcm9tIHRoZSBwcmV2aW91cyBjb2xsZWN0aW9uXG4gICAqXG4gICAqIC0gYHJlY29yZGAgVGhlIGZpcnN0IGV4Y2VzcyB7QGxpbmsgQ29sbGVjdGlvbkNoYW5nZVJlY29yZH0uXG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgX3RydW5jYXRlKHJlY29yZDogQ29sbGVjdGlvbkNoYW5nZVJlY29yZCkge1xuICAgIC8vIEFueXRoaW5nIGFmdGVyIHRoYXQgbmVlZHMgdG8gYmUgcmVtb3ZlZDtcbiAgICB3aGlsZSAocmVjb3JkICE9PSBudWxsKSB7XG4gICAgICB2YXIgbmV4dFJlY29yZDogQ29sbGVjdGlvbkNoYW5nZVJlY29yZCA9IHJlY29yZC5fbmV4dDtcbiAgICAgIHRoaXMuX2FkZFRvUmVtb3ZhbHModGhpcy5fdW5saW5rKHJlY29yZCkpO1xuICAgICAgcmVjb3JkID0gbmV4dFJlY29yZDtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3VubGlua2VkUmVjb3JkcyAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5fdW5saW5rZWRSZWNvcmRzLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2FkZGl0aW9uc1RhaWwgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX2FkZGl0aW9uc1RhaWwuX25leHRBZGRlZCA9IG51bGw7XG4gICAgfVxuICAgIGlmICh0aGlzLl9tb3Zlc1RhaWwgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX21vdmVzVGFpbC5fbmV4dE1vdmVkID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2l0VGFpbCAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5faXRUYWlsLl9uZXh0ID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3JlbW92YWxzVGFpbCAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVtb3ZhbHNUYWlsLl9uZXh0UmVtb3ZlZCA9IG51bGw7XG4gICAgfVxuICAgIGlmICh0aGlzLl9pZGVudGl0eUNoYW5nZXNUYWlsICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl9pZGVudGl0eUNoYW5nZXNUYWlsLl9uZXh0SWRlbnRpdHlDaGFuZ2UgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3JlaW5zZXJ0QWZ0ZXIocmVjb3JkOiBDb2xsZWN0aW9uQ2hhbmdlUmVjb3JkLCBwcmV2UmVjb3JkOiBDb2xsZWN0aW9uQ2hhbmdlUmVjb3JkLFxuICAgICAgICAgICAgICAgICBpbmRleDogbnVtYmVyKTogQ29sbGVjdGlvbkNoYW5nZVJlY29yZCB7XG4gICAgaWYgKHRoaXMuX3VubGlua2VkUmVjb3JkcyAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5fdW5saW5rZWRSZWNvcmRzLnJlbW92ZShyZWNvcmQpO1xuICAgIH1cbiAgICB2YXIgcHJldiA9IHJlY29yZC5fcHJldlJlbW92ZWQ7XG4gICAgdmFyIG5leHQgPSByZWNvcmQuX25leHRSZW1vdmVkO1xuXG4gICAgaWYgKHByZXYgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbW92YWxzSGVhZCA9IG5leHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByZXYuX25leHRSZW1vdmVkID0gbmV4dDtcbiAgICB9XG4gICAgaWYgKG5leHQgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbW92YWxzVGFpbCA9IHByZXY7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHQuX3ByZXZSZW1vdmVkID0gcHJldjtcbiAgICB9XG5cbiAgICB0aGlzLl9pbnNlcnRBZnRlcihyZWNvcmQsIHByZXZSZWNvcmQsIGluZGV4KTtcbiAgICB0aGlzLl9hZGRUb01vdmVzKHJlY29yZCwgaW5kZXgpO1xuICAgIHJldHVybiByZWNvcmQ7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9tb3ZlQWZ0ZXIocmVjb3JkOiBDb2xsZWN0aW9uQ2hhbmdlUmVjb3JkLCBwcmV2UmVjb3JkOiBDb2xsZWN0aW9uQ2hhbmdlUmVjb3JkLFxuICAgICAgICAgICAgIGluZGV4OiBudW1iZXIpOiBDb2xsZWN0aW9uQ2hhbmdlUmVjb3JkIHtcbiAgICB0aGlzLl91bmxpbmsocmVjb3JkKTtcbiAgICB0aGlzLl9pbnNlcnRBZnRlcihyZWNvcmQsIHByZXZSZWNvcmQsIGluZGV4KTtcbiAgICB0aGlzLl9hZGRUb01vdmVzKHJlY29yZCwgaW5kZXgpO1xuICAgIHJldHVybiByZWNvcmQ7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9hZGRBZnRlcihyZWNvcmQ6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQsIHByZXZSZWNvcmQ6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQsXG4gICAgICAgICAgICBpbmRleDogbnVtYmVyKTogQ29sbGVjdGlvbkNoYW5nZVJlY29yZCB7XG4gICAgdGhpcy5faW5zZXJ0QWZ0ZXIocmVjb3JkLCBwcmV2UmVjb3JkLCBpbmRleCk7XG5cbiAgICBpZiAodGhpcy5fYWRkaXRpb25zVGFpbCA9PT0gbnVsbCkge1xuICAgICAgLy8gdG9kbyh2aWNiKVxuICAgICAgLy8gYXNzZXJ0KHRoaXMuX2FkZGl0aW9uc0hlYWQgPT09IG51bGwpO1xuICAgICAgdGhpcy5fYWRkaXRpb25zVGFpbCA9IHRoaXMuX2FkZGl0aW9uc0hlYWQgPSByZWNvcmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHRvZG8odmljYilcbiAgICAgIC8vIGFzc2VydChfYWRkaXRpb25zVGFpbC5fbmV4dEFkZGVkID09PSBudWxsKTtcbiAgICAgIC8vIGFzc2VydChyZWNvcmQuX25leHRBZGRlZCA9PT0gbnVsbCk7XG4gICAgICB0aGlzLl9hZGRpdGlvbnNUYWlsID0gdGhpcy5fYWRkaXRpb25zVGFpbC5fbmV4dEFkZGVkID0gcmVjb3JkO1xuICAgIH1cbiAgICByZXR1cm4gcmVjb3JkO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfaW5zZXJ0QWZ0ZXIocmVjb3JkOiBDb2xsZWN0aW9uQ2hhbmdlUmVjb3JkLCBwcmV2UmVjb3JkOiBDb2xsZWN0aW9uQ2hhbmdlUmVjb3JkLFxuICAgICAgICAgICAgICAgaW5kZXg6IG51bWJlcik6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQge1xuICAgIC8vIHRvZG8odmljYilcbiAgICAvLyBhc3NlcnQocmVjb3JkICE9IHByZXZSZWNvcmQpO1xuICAgIC8vIGFzc2VydChyZWNvcmQuX25leHQgPT09IG51bGwpO1xuICAgIC8vIGFzc2VydChyZWNvcmQuX3ByZXYgPT09IG51bGwpO1xuXG4gICAgdmFyIG5leHQ6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQgPSBwcmV2UmVjb3JkID09PSBudWxsID8gdGhpcy5faXRIZWFkIDogcHJldlJlY29yZC5fbmV4dDtcbiAgICAvLyB0b2RvKHZpY2IpXG4gICAgLy8gYXNzZXJ0KG5leHQgIT0gcmVjb3JkKTtcbiAgICAvLyBhc3NlcnQocHJldlJlY29yZCAhPSByZWNvcmQpO1xuICAgIHJlY29yZC5fbmV4dCA9IG5leHQ7XG4gICAgcmVjb3JkLl9wcmV2ID0gcHJldlJlY29yZDtcbiAgICBpZiAobmV4dCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5faXRUYWlsID0gcmVjb3JkO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0Ll9wcmV2ID0gcmVjb3JkO1xuICAgIH1cbiAgICBpZiAocHJldlJlY29yZCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5faXRIZWFkID0gcmVjb3JkO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcmV2UmVjb3JkLl9uZXh0ID0gcmVjb3JkO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9saW5rZWRSZWNvcmRzID09PSBudWxsKSB7XG4gICAgICB0aGlzLl9saW5rZWRSZWNvcmRzID0gbmV3IF9EdXBsaWNhdGVNYXAoKTtcbiAgICB9XG4gICAgdGhpcy5fbGlua2VkUmVjb3Jkcy5wdXQocmVjb3JkKTtcblxuICAgIHJlY29yZC5jdXJyZW50SW5kZXggPSBpbmRleDtcbiAgICByZXR1cm4gcmVjb3JkO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcmVtb3ZlKHJlY29yZDogQ29sbGVjdGlvbkNoYW5nZVJlY29yZCk6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQge1xuICAgIHJldHVybiB0aGlzLl9hZGRUb1JlbW92YWxzKHRoaXMuX3VubGluayhyZWNvcmQpKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3VubGluayhyZWNvcmQ6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQpOiBDb2xsZWN0aW9uQ2hhbmdlUmVjb3JkIHtcbiAgICBpZiAodGhpcy5fbGlua2VkUmVjb3JkcyAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5fbGlua2VkUmVjb3Jkcy5yZW1vdmUocmVjb3JkKTtcbiAgICB9XG5cbiAgICB2YXIgcHJldiA9IHJlY29yZC5fcHJldjtcbiAgICB2YXIgbmV4dCA9IHJlY29yZC5fbmV4dDtcblxuICAgIC8vIHRvZG8odmljYilcbiAgICAvLyBhc3NlcnQoKHJlY29yZC5fcHJldiA9IG51bGwpID09PSBudWxsKTtcbiAgICAvLyBhc3NlcnQoKHJlY29yZC5fbmV4dCA9IG51bGwpID09PSBudWxsKTtcblxuICAgIGlmIChwcmV2ID09PSBudWxsKSB7XG4gICAgICB0aGlzLl9pdEhlYWQgPSBuZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICBwcmV2Ll9uZXh0ID0gbmV4dDtcbiAgICB9XG4gICAgaWYgKG5leHQgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuX2l0VGFpbCA9IHByZXY7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHQuX3ByZXYgPSBwcmV2O1xuICAgIH1cblxuICAgIHJldHVybiByZWNvcmQ7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9hZGRUb01vdmVzKHJlY29yZDogQ29sbGVjdGlvbkNoYW5nZVJlY29yZCwgdG9JbmRleDogbnVtYmVyKTogQ29sbGVjdGlvbkNoYW5nZVJlY29yZCB7XG4gICAgLy8gdG9kbyh2aWNiKVxuICAgIC8vIGFzc2VydChyZWNvcmQuX25leHRNb3ZlZCA9PT0gbnVsbCk7XG5cbiAgICBpZiAocmVjb3JkLnByZXZpb3VzSW5kZXggPT09IHRvSW5kZXgpIHtcbiAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX21vdmVzVGFpbCA9PT0gbnVsbCkge1xuICAgICAgLy8gdG9kbyh2aWNiKVxuICAgICAgLy8gYXNzZXJ0KF9tb3Zlc0hlYWQgPT09IG51bGwpO1xuICAgICAgdGhpcy5fbW92ZXNUYWlsID0gdGhpcy5fbW92ZXNIZWFkID0gcmVjb3JkO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0b2RvKHZpY2IpXG4gICAgICAvLyBhc3NlcnQoX21vdmVzVGFpbC5fbmV4dE1vdmVkID09PSBudWxsKTtcbiAgICAgIHRoaXMuX21vdmVzVGFpbCA9IHRoaXMuX21vdmVzVGFpbC5fbmV4dE1vdmVkID0gcmVjb3JkO1xuICAgIH1cblxuICAgIHJldHVybiByZWNvcmQ7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9hZGRUb1JlbW92YWxzKHJlY29yZDogQ29sbGVjdGlvbkNoYW5nZVJlY29yZCk6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQge1xuICAgIGlmICh0aGlzLl91bmxpbmtlZFJlY29yZHMgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuX3VubGlua2VkUmVjb3JkcyA9IG5ldyBfRHVwbGljYXRlTWFwKCk7XG4gICAgfVxuICAgIHRoaXMuX3VubGlua2VkUmVjb3Jkcy5wdXQocmVjb3JkKTtcbiAgICByZWNvcmQuY3VycmVudEluZGV4ID0gbnVsbDtcbiAgICByZWNvcmQuX25leHRSZW1vdmVkID0gbnVsbDtcblxuICAgIGlmICh0aGlzLl9yZW1vdmFsc1RhaWwgPT09IG51bGwpIHtcbiAgICAgIC8vIHRvZG8odmljYilcbiAgICAgIC8vIGFzc2VydChfcmVtb3ZhbHNIZWFkID09PSBudWxsKTtcbiAgICAgIHRoaXMuX3JlbW92YWxzVGFpbCA9IHRoaXMuX3JlbW92YWxzSGVhZCA9IHJlY29yZDtcbiAgICAgIHJlY29yZC5fcHJldlJlbW92ZWQgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0b2RvKHZpY2IpXG4gICAgICAvLyBhc3NlcnQoX3JlbW92YWxzVGFpbC5fbmV4dFJlbW92ZWQgPT09IG51bGwpO1xuICAgICAgLy8gYXNzZXJ0KHJlY29yZC5fbmV4dFJlbW92ZWQgPT09IG51bGwpO1xuICAgICAgcmVjb3JkLl9wcmV2UmVtb3ZlZCA9IHRoaXMuX3JlbW92YWxzVGFpbDtcbiAgICAgIHRoaXMuX3JlbW92YWxzVGFpbCA9IHRoaXMuX3JlbW92YWxzVGFpbC5fbmV4dFJlbW92ZWQgPSByZWNvcmQ7XG4gICAgfVxuICAgIHJldHVybiByZWNvcmQ7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9hZGRJZGVudGl0eUNoYW5nZShyZWNvcmQ6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQsIGl0ZW06IGFueSkge1xuICAgIHJlY29yZC5pdGVtID0gaXRlbTtcbiAgICBpZiAodGhpcy5faWRlbnRpdHlDaGFuZ2VzVGFpbCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5faWRlbnRpdHlDaGFuZ2VzVGFpbCA9IHRoaXMuX2lkZW50aXR5Q2hhbmdlc0hlYWQgPSByZWNvcmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2lkZW50aXR5Q2hhbmdlc1RhaWwgPSB0aGlzLl9pZGVudGl0eUNoYW5nZXNUYWlsLl9uZXh0SWRlbnRpdHlDaGFuZ2UgPSByZWNvcmQ7XG4gICAgfVxuICAgIHJldHVybiByZWNvcmQ7XG4gIH1cblxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgdmFyIGxpc3QgPSBbXTtcbiAgICB0aGlzLmZvckVhY2hJdGVtKChyZWNvcmQpID0+IGxpc3QucHVzaChyZWNvcmQpKTtcblxuICAgIHZhciBwcmV2aW91cyA9IFtdO1xuICAgIHRoaXMuZm9yRWFjaFByZXZpb3VzSXRlbSgocmVjb3JkKSA9PiBwcmV2aW91cy5wdXNoKHJlY29yZCkpO1xuXG4gICAgdmFyIGFkZGl0aW9ucyA9IFtdO1xuICAgIHRoaXMuZm9yRWFjaEFkZGVkSXRlbSgocmVjb3JkKSA9PiBhZGRpdGlvbnMucHVzaChyZWNvcmQpKTtcblxuICAgIHZhciBtb3ZlcyA9IFtdO1xuICAgIHRoaXMuZm9yRWFjaE1vdmVkSXRlbSgocmVjb3JkKSA9PiBtb3Zlcy5wdXNoKHJlY29yZCkpO1xuXG4gICAgdmFyIHJlbW92YWxzID0gW107XG4gICAgdGhpcy5mb3JFYWNoUmVtb3ZlZEl0ZW0oKHJlY29yZCkgPT4gcmVtb3ZhbHMucHVzaChyZWNvcmQpKTtcblxuICAgIHZhciBpZGVudGl0eUNoYW5nZXMgPSBbXTtcbiAgICB0aGlzLmZvckVhY2hJZGVudGl0eUNoYW5nZSgocmVjb3JkKSA9PiBpZGVudGl0eUNoYW5nZXMucHVzaChyZWNvcmQpKTtcblxuICAgIHJldHVybiBcImNvbGxlY3Rpb246IFwiICsgbGlzdC5qb2luKCcsICcpICsgXCJcXG5cIiArIFwicHJldmlvdXM6IFwiICsgcHJldmlvdXMuam9pbignLCAnKSArIFwiXFxuXCIgK1xuICAgICAgICAgICBcImFkZGl0aW9uczogXCIgKyBhZGRpdGlvbnMuam9pbignLCAnKSArIFwiXFxuXCIgKyBcIm1vdmVzOiBcIiArIG1vdmVzLmpvaW4oJywgJykgKyBcIlxcblwiICtcbiAgICAgICAgICAgXCJyZW1vdmFsczogXCIgKyByZW1vdmFscy5qb2luKCcsICcpICsgXCJcXG5cIiArIFwiaWRlbnRpdHlDaGFuZ2VzOiBcIiArXG4gICAgICAgICAgIGlkZW50aXR5Q2hhbmdlcy5qb2luKCcsICcpICsgXCJcXG5cIjtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ29sbGVjdGlvbkNoYW5nZVJlY29yZCB7XG4gIGN1cnJlbnRJbmRleDogbnVtYmVyID0gbnVsbDtcbiAgcHJldmlvdXNJbmRleDogbnVtYmVyID0gbnVsbDtcblxuICAvKiogQGludGVybmFsICovXG4gIF9uZXh0UHJldmlvdXM6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQgPSBudWxsO1xuICAvKiogQGludGVybmFsICovXG4gIF9wcmV2OiBDb2xsZWN0aW9uQ2hhbmdlUmVjb3JkID0gbnVsbDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfbmV4dDogQ29sbGVjdGlvbkNoYW5nZVJlY29yZCA9IG51bGw7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3ByZXZEdXA6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQgPSBudWxsO1xuICAvKiogQGludGVybmFsICovXG4gIF9uZXh0RHVwOiBDb2xsZWN0aW9uQ2hhbmdlUmVjb3JkID0gbnVsbDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcHJldlJlbW92ZWQ6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQgPSBudWxsO1xuICAvKiogQGludGVybmFsICovXG4gIF9uZXh0UmVtb3ZlZDogQ29sbGVjdGlvbkNoYW5nZVJlY29yZCA9IG51bGw7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX25leHRBZGRlZDogQ29sbGVjdGlvbkNoYW5nZVJlY29yZCA9IG51bGw7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX25leHRNb3ZlZDogQ29sbGVjdGlvbkNoYW5nZVJlY29yZCA9IG51bGw7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX25leHRJZGVudGl0eUNoYW5nZTogQ29sbGVjdGlvbkNoYW5nZVJlY29yZCA9IG51bGw7XG5cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaXRlbTogYW55LCBwdWJsaWMgdHJhY2tCeUlkOiBhbnkpIHt9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wcmV2aW91c0luZGV4ID09PSB0aGlzLmN1cnJlbnRJbmRleCA/XG4gICAgICAgICAgICAgICBzdHJpbmdpZnkodGhpcy5pdGVtKSA6XG4gICAgICAgICAgICAgICBzdHJpbmdpZnkodGhpcy5pdGVtKSArICdbJyArIHN0cmluZ2lmeSh0aGlzLnByZXZpb3VzSW5kZXgpICsgJy0+JyArXG4gICAgICAgICAgICAgICAgICAgc3RyaW5naWZ5KHRoaXMuY3VycmVudEluZGV4KSArICddJztcbiAgfVxufVxuXG4vLyBBIGxpbmtlZCBsaXN0IG9mIENvbGxlY3Rpb25DaGFuZ2VSZWNvcmRzIHdpdGggdGhlIHNhbWUgQ29sbGVjdGlvbkNoYW5nZVJlY29yZC5pdGVtXG5jbGFzcyBfRHVwbGljYXRlSXRlbVJlY29yZExpc3Qge1xuICAvKiogQGludGVybmFsICovXG4gIF9oZWFkOiBDb2xsZWN0aW9uQ2hhbmdlUmVjb3JkID0gbnVsbDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfdGFpbDogQ29sbGVjdGlvbkNoYW5nZVJlY29yZCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEFwcGVuZCB0aGUgcmVjb3JkIHRvIHRoZSBsaXN0IG9mIGR1cGxpY2F0ZXMuXG4gICAqXG4gICAqIE5vdGU6IGJ5IGRlc2lnbiBhbGwgcmVjb3JkcyBpbiB0aGUgbGlzdCBvZiBkdXBsaWNhdGVzIGhvbGQgdGhlIHNhbWUgdmFsdWUgaW4gcmVjb3JkLml0ZW0uXG4gICAqL1xuICBhZGQocmVjb3JkOiBDb2xsZWN0aW9uQ2hhbmdlUmVjb3JkKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2hlYWQgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuX2hlYWQgPSB0aGlzLl90YWlsID0gcmVjb3JkO1xuICAgICAgcmVjb3JkLl9uZXh0RHVwID0gbnVsbDtcbiAgICAgIHJlY29yZC5fcHJldkR1cCA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHRvZG8odmljYilcbiAgICAgIC8vIGFzc2VydChyZWNvcmQuaXRlbSA9PSAgX2hlYWQuaXRlbSB8fFxuICAgICAgLy8gICAgICAgcmVjb3JkLml0ZW0gaXMgbnVtICYmIHJlY29yZC5pdGVtLmlzTmFOICYmIF9oZWFkLml0ZW0gaXMgbnVtICYmIF9oZWFkLml0ZW0uaXNOYU4pO1xuICAgICAgdGhpcy5fdGFpbC5fbmV4dER1cCA9IHJlY29yZDtcbiAgICAgIHJlY29yZC5fcHJldkR1cCA9IHRoaXMuX3RhaWw7XG4gICAgICByZWNvcmQuX25leHREdXAgPSBudWxsO1xuICAgICAgdGhpcy5fdGFpbCA9IHJlY29yZDtcbiAgICB9XG4gIH1cblxuICAvLyBSZXR1cm5zIGEgQ29sbGVjdGlvbkNoYW5nZVJlY29yZCBoYXZpbmcgQ29sbGVjdGlvbkNoYW5nZVJlY29yZC50cmFja0J5SWQgPT0gdHJhY2tCeUlkIGFuZFxuICAvLyBDb2xsZWN0aW9uQ2hhbmdlUmVjb3JkLmN1cnJlbnRJbmRleCA+PSBhZnRlckluZGV4XG4gIGdldCh0cmFja0J5SWQ6IGFueSwgYWZ0ZXJJbmRleDogbnVtYmVyKTogQ29sbGVjdGlvbkNoYW5nZVJlY29yZCB7XG4gICAgdmFyIHJlY29yZDogQ29sbGVjdGlvbkNoYW5nZVJlY29yZDtcbiAgICBmb3IgKHJlY29yZCA9IHRoaXMuX2hlYWQ7IHJlY29yZCAhPT0gbnVsbDsgcmVjb3JkID0gcmVjb3JkLl9uZXh0RHVwKSB7XG4gICAgICBpZiAoKGFmdGVySW5kZXggPT09IG51bGwgfHwgYWZ0ZXJJbmRleCA8IHJlY29yZC5jdXJyZW50SW5kZXgpICYmXG4gICAgICAgICAgbG9vc2VJZGVudGljYWwocmVjb3JkLnRyYWNrQnlJZCwgdHJhY2tCeUlkKSkge1xuICAgICAgICByZXR1cm4gcmVjb3JkO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgb25lIHtAbGluayBDb2xsZWN0aW9uQ2hhbmdlUmVjb3JkfSBmcm9tIHRoZSBsaXN0IG9mIGR1cGxpY2F0ZXMuXG4gICAqXG4gICAqIFJldHVybnMgd2hldGhlciB0aGUgbGlzdCBvZiBkdXBsaWNhdGVzIGlzIGVtcHR5LlxuICAgKi9cbiAgcmVtb3ZlKHJlY29yZDogQ29sbGVjdGlvbkNoYW5nZVJlY29yZCk6IGJvb2xlYW4ge1xuICAgIC8vIHRvZG8odmljYilcbiAgICAvLyBhc3NlcnQoKCkge1xuICAgIC8vICAvLyB2ZXJpZnkgdGhhdCB0aGUgcmVjb3JkIGJlaW5nIHJlbW92ZWQgaXMgaW4gdGhlIGxpc3QuXG4gICAgLy8gIGZvciAoQ29sbGVjdGlvbkNoYW5nZVJlY29yZCBjdXJzb3IgPSBfaGVhZDsgY3Vyc29yICE9IG51bGw7IGN1cnNvciA9IGN1cnNvci5fbmV4dER1cCkge1xuICAgIC8vICAgIGlmIChpZGVudGljYWwoY3Vyc29yLCByZWNvcmQpKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyAgfVxuICAgIC8vICByZXR1cm4gZmFsc2U7XG4gICAgLy99KTtcblxuICAgIHZhciBwcmV2OiBDb2xsZWN0aW9uQ2hhbmdlUmVjb3JkID0gcmVjb3JkLl9wcmV2RHVwO1xuICAgIHZhciBuZXh0OiBDb2xsZWN0aW9uQ2hhbmdlUmVjb3JkID0gcmVjb3JkLl9uZXh0RHVwO1xuICAgIGlmIChwcmV2ID09PSBudWxsKSB7XG4gICAgICB0aGlzLl9oZWFkID0gbmV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJldi5fbmV4dER1cCA9IG5leHQ7XG4gICAgfVxuICAgIGlmIChuZXh0ID09PSBudWxsKSB7XG4gICAgICB0aGlzLl90YWlsID0gcHJldjtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV4dC5fcHJldkR1cCA9IHByZXY7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9oZWFkID09PSBudWxsO1xuICB9XG59XG5cbmNsYXNzIF9EdXBsaWNhdGVNYXAge1xuICBtYXAgPSBuZXcgTWFwPGFueSwgX0R1cGxpY2F0ZUl0ZW1SZWNvcmRMaXN0PigpO1xuXG4gIHB1dChyZWNvcmQ6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQpIHtcbiAgICAvLyB0b2RvKHZpY2IpIGhhbmRsZSBjb3JuZXIgY2FzZXNcbiAgICB2YXIga2V5ID0gZ2V0TWFwS2V5KHJlY29yZC50cmFja0J5SWQpO1xuXG4gICAgdmFyIGR1cGxpY2F0ZXMgPSB0aGlzLm1hcC5nZXQoa2V5KTtcbiAgICBpZiAoIWlzUHJlc2VudChkdXBsaWNhdGVzKSkge1xuICAgICAgZHVwbGljYXRlcyA9IG5ldyBfRHVwbGljYXRlSXRlbVJlY29yZExpc3QoKTtcbiAgICAgIHRoaXMubWFwLnNldChrZXksIGR1cGxpY2F0ZXMpO1xuICAgIH1cbiAgICBkdXBsaWNhdGVzLmFkZChyZWNvcmQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlIHRoZSBgdmFsdWVgIHVzaW5nIGtleS4gQmVjYXVzZSB0aGUgQ29sbGVjdGlvbkNoYW5nZVJlY29yZCB2YWx1ZSBtYXkgYmUgb25lIHdoaWNoIHdlXG4gICAqIGhhdmUgYWxyZWFkeSBpdGVyYXRlZCBvdmVyLCB3ZSB1c2UgdGhlIGFmdGVySW5kZXggdG8gcHJldGVuZCBpdCBpcyBub3QgdGhlcmUuXG4gICAqXG4gICAqIFVzZSBjYXNlOiBgW2EsIGIsIGMsIGEsIGFdYCBpZiB3ZSBhcmUgYXQgaW5kZXggYDNgIHdoaWNoIGlzIHRoZSBzZWNvbmQgYGFgIHRoZW4gYXNraW5nIGlmIHdlXG4gICAqIGhhdmUgYW55IG1vcmUgYGFgcyBuZWVkcyB0byByZXR1cm4gdGhlIGxhc3QgYGFgIG5vdCB0aGUgZmlyc3Qgb3Igc2Vjb25kLlxuICAgKi9cbiAgZ2V0KHRyYWNrQnlJZDogYW55LCBhZnRlckluZGV4OiBudW1iZXIgPSBudWxsKTogQ29sbGVjdGlvbkNoYW5nZVJlY29yZCB7XG4gICAgdmFyIGtleSA9IGdldE1hcEtleSh0cmFja0J5SWQpO1xuXG4gICAgdmFyIHJlY29yZExpc3QgPSB0aGlzLm1hcC5nZXQoa2V5KTtcbiAgICByZXR1cm4gaXNCbGFuayhyZWNvcmRMaXN0KSA/IG51bGwgOiByZWNvcmRMaXN0LmdldCh0cmFja0J5SWQsIGFmdGVySW5kZXgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSB7QGxpbmsgQ29sbGVjdGlvbkNoYW5nZVJlY29yZH0gZnJvbSB0aGUgbGlzdCBvZiBkdXBsaWNhdGVzLlxuICAgKlxuICAgKiBUaGUgbGlzdCBvZiBkdXBsaWNhdGVzIGFsc28gaXMgcmVtb3ZlZCBmcm9tIHRoZSBtYXAgaWYgaXQgZ2V0cyBlbXB0eS5cbiAgICovXG4gIHJlbW92ZShyZWNvcmQ6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQpOiBDb2xsZWN0aW9uQ2hhbmdlUmVjb3JkIHtcbiAgICB2YXIga2V5ID0gZ2V0TWFwS2V5KHJlY29yZC50cmFja0J5SWQpO1xuICAgIC8vIHRvZG8odmljYilcbiAgICAvLyBhc3NlcnQodGhpcy5tYXAuY29udGFpbnNLZXkoa2V5KSk7XG4gICAgdmFyIHJlY29yZExpc3Q6IF9EdXBsaWNhdGVJdGVtUmVjb3JkTGlzdCA9IHRoaXMubWFwLmdldChrZXkpO1xuICAgIC8vIFJlbW92ZSB0aGUgbGlzdCBvZiBkdXBsaWNhdGVzIHdoZW4gaXQgZ2V0cyBlbXB0eVxuICAgIGlmIChyZWNvcmRMaXN0LnJlbW92ZShyZWNvcmQpKSB7XG4gICAgICB0aGlzLm1hcC5kZWxldGUoa2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlY29yZDtcbiAgfVxuXG4gIGdldCBpc0VtcHR5KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5tYXAuc2l6ZSA9PT0gMDsgfVxuXG4gIGNsZWFyKCkgeyB0aGlzLm1hcC5jbGVhcigpOyB9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuICdfRHVwbGljYXRlTWFwKCcgKyBzdHJpbmdpZnkodGhpcy5tYXApICsgJyknOyB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
