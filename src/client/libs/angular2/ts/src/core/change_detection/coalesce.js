System.register(['angular2/src/facade/lang', 'angular2/src/facade/collection', './proto_record'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, collection_1, proto_record_1;
    /**
     * Removes "duplicate" records. It assumes that record evaluation does not have side-effects.
     *
     * Records that are not last in bindings are removed and all the indices of the records that depend
     * on them are updated.
     *
     * Records that are last in bindings CANNOT be removed, and instead are replaced with very cheap
     * SELF records.
     *
     * @internal
     */
    function coalesce(srcRecords) {
        var dstRecords = [];
        var excludedIdxs = [];
        var indexMap = new collection_1.Map();
        var skipDepth = 0;
        var skipSources = collection_1.ListWrapper.createFixedSize(srcRecords.length);
        for (var protoIndex = 0; protoIndex < srcRecords.length; protoIndex++) {
            var skipRecord = skipSources[protoIndex];
            if (lang_1.isPresent(skipRecord)) {
                skipDepth--;
                skipRecord.fixedArgs[0] = dstRecords.length;
            }
            var src = srcRecords[protoIndex];
            var dst = _cloneAndUpdateIndexes(src, dstRecords, indexMap);
            if (dst.isSkipRecord()) {
                dstRecords.push(dst);
                skipDepth++;
                skipSources[dst.fixedArgs[0]] = dst;
            }
            else {
                var record = _mayBeAddRecord(dst, dstRecords, excludedIdxs, skipDepth > 0);
                indexMap.set(src.selfIndex, record.selfIndex);
            }
        }
        return _optimizeSkips(dstRecords);
    }
    exports_1("coalesce", coalesce);
    /**
     * - Conditional skip of 1 record followed by an unconditional skip of N are replaced by  a
     *   conditional skip of N with the negated condition,
     * - Skips of 0 records are removed
     */
    function _optimizeSkips(srcRecords) {
        var dstRecords = [];
        var skipSources = collection_1.ListWrapper.createFixedSize(srcRecords.length);
        var indexMap = new collection_1.Map();
        for (var protoIndex = 0; protoIndex < srcRecords.length; protoIndex++) {
            var skipRecord = skipSources[protoIndex];
            if (lang_1.isPresent(skipRecord)) {
                skipRecord.fixedArgs[0] = dstRecords.length;
            }
            var src = srcRecords[protoIndex];
            if (src.isSkipRecord()) {
                if (src.isConditionalSkipRecord() && src.fixedArgs[0] === protoIndex + 2 &&
                    protoIndex < srcRecords.length - 1 &&
                    srcRecords[protoIndex + 1].mode === proto_record_1.RecordType.SkipRecords) {
                    src.mode = src.mode === proto_record_1.RecordType.SkipRecordsIf ? proto_record_1.RecordType.SkipRecordsIfNot :
                        proto_record_1.RecordType.SkipRecordsIf;
                    src.fixedArgs[0] = srcRecords[protoIndex + 1].fixedArgs[0];
                    protoIndex++;
                }
                if (src.fixedArgs[0] > protoIndex + 1) {
                    var dst = _cloneAndUpdateIndexes(src, dstRecords, indexMap);
                    dstRecords.push(dst);
                    skipSources[dst.fixedArgs[0]] = dst;
                }
            }
            else {
                var dst = _cloneAndUpdateIndexes(src, dstRecords, indexMap);
                dstRecords.push(dst);
                indexMap.set(src.selfIndex, dst.selfIndex);
            }
        }
        return dstRecords;
    }
    /**
     * Add a new record or re-use one of the existing records.
     */
    function _mayBeAddRecord(record, dstRecords, excludedIdxs, excluded) {
        var match = _findFirstMatch(record, dstRecords, excludedIdxs);
        if (lang_1.isPresent(match)) {
            if (record.lastInBinding) {
                dstRecords.push(_createSelfRecord(record, match.selfIndex, dstRecords.length + 1));
                match.referencedBySelf = true;
            }
            else {
                if (record.argumentToPureFunction) {
                    match.argumentToPureFunction = true;
                }
            }
            return match;
        }
        if (excluded) {
            excludedIdxs.push(record.selfIndex);
        }
        dstRecords.push(record);
        return record;
    }
    /**
     * Returns the first `ProtoRecord` that matches the record.
     */
    function _findFirstMatch(record, dstRecords, excludedIdxs) {
        return dstRecords.find(
        // TODO(vicb): optimize excludedIdxs.indexOf (sorted array)
        function (rr) { return excludedIdxs.indexOf(rr.selfIndex) == -1 && rr.mode !== proto_record_1.RecordType.DirectiveLifecycle &&
            _haveSameDirIndex(rr, record) && rr.mode === record.mode &&
            lang_1.looseIdentical(rr.funcOrValue, record.funcOrValue) &&
            rr.contextIndex === record.contextIndex && lang_1.looseIdentical(rr.name, record.name) &&
            collection_1.ListWrapper.equals(rr.args, record.args); });
    }
    /**
     * Clone the `ProtoRecord` and changes the indexes for the ones in the destination array for:
     * - the arguments,
     * - the context,
     * - self
     */
    function _cloneAndUpdateIndexes(record, dstRecords, indexMap) {
        var args = record.args.map(function (src) { return _srcToDstSelfIndex(indexMap, src); });
        var contextIndex = _srcToDstSelfIndex(indexMap, record.contextIndex);
        var selfIndex = dstRecords.length + 1;
        return new proto_record_1.ProtoRecord(record.mode, record.name, record.funcOrValue, args, record.fixedArgs, contextIndex, record.directiveIndex, selfIndex, record.bindingRecord, record.lastInBinding, record.lastInDirective, record.argumentToPureFunction, record.referencedBySelf, record.propertyBindingIndex);
    }
    /**
     * Returns the index in the destination array corresponding to the index in the src array.
     * When the element is not present in the destination array, return the source index.
     */
    function _srcToDstSelfIndex(indexMap, srcIdx) {
        var dstIdx = indexMap.get(srcIdx);
        return lang_1.isPresent(dstIdx) ? dstIdx : srcIdx;
    }
    function _createSelfRecord(r, contextIndex, selfIndex) {
        return new proto_record_1.ProtoRecord(proto_record_1.RecordType.Self, "self", null, [], r.fixedArgs, contextIndex, r.directiveIndex, selfIndex, r.bindingRecord, r.lastInBinding, r.lastInDirective, false, false, r.propertyBindingIndex);
    }
    function _haveSameDirIndex(a, b) {
        var di1 = lang_1.isBlank(a.directiveIndex) ? null : a.directiveIndex.directiveIndex;
        var ei1 = lang_1.isBlank(a.directiveIndex) ? null : a.directiveIndex.elementIndex;
        var di2 = lang_1.isBlank(b.directiveIndex) ? null : b.directiveIndex.directiveIndex;
        var ei2 = lang_1.isBlank(b.directiveIndex) ? null : b.directiveIndex.elementIndex;
        return di1 === di2 && ei1 === ei2;
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (proto_record_1_1) {
                proto_record_1 = proto_record_1_1;
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9jb2FsZXNjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0lBSUE7Ozs7Ozs7Ozs7T0FVRztJQUNILGtCQUF5QixVQUF5QjtRQUNoRCxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksUUFBUSxHQUF3QixJQUFJLGdCQUFHLEVBQWtCLENBQUM7UUFDOUQsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksV0FBVyxHQUFrQix3QkFBVyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFaEYsR0FBRyxDQUFDLENBQUMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFLFVBQVUsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUM7WUFDdEUsSUFBSSxVQUFVLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3pDLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixTQUFTLEVBQUUsQ0FBQztnQkFDWixVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7WUFDOUMsQ0FBQztZQUVELElBQUksR0FBRyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNqQyxJQUFJLEdBQUcsR0FBRyxzQkFBc0IsQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBRTVELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3JCLFNBQVMsRUFBRSxDQUFDO2dCQUNaLFdB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QUFJLEdBQUcsR0FBRyxjQUFPLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQztRQUM3RSxJQUFJLEdBQUcsR0FBRyxjQUFPLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQztRQUUzRSxNQUFNLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxHQUFHLEtBQUssR0FBRyxDQUFDO0lBQ3BDLENBQUMiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2NvYWxlc2NlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc1ByZXNlbnQsIGlzQmxhbmssIGxvb3NlSWRlbnRpY2FsfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtMaXN0V3JhcHBlciwgTWFwfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtSZWNvcmRUeXBlLCBQcm90b1JlY29yZH0gZnJvbSAnLi9wcm90b19yZWNvcmQnO1xuXG4vKipcbiAqIFJlbW92ZXMgXCJkdXBsaWNhdGVcIiByZWNvcmRzLiBJdCBhc3N1bWVzIHRoYXQgcmVjb3JkIGV2YWx1YXRpb24gZG9lcyBub3QgaGF2ZSBzaWRlLWVmZmVjdHMuXG4gKlxuICogUmVjb3JkcyB0aGF0IGFyZSBub3QgbGFzdCBpbiBiaW5kaW5ncyBhcmUgcmVtb3ZlZCBhbmQgYWxsIHRoZSBpbmRpY2VzIG9mIHRoZSByZWNvcmRzIHRoYXQgZGVwZW5kXG4gKiBvbiB0aGVtIGFyZSB1cGRhdGVkLlxuICpcbiAqIFJlY29yZHMgdGhhdCBhcmUgbGFzdCBpbiBiaW5kaW5ncyBDQU5OT1QgYmUgcmVtb3ZlZCwgYW5kIGluc3RlYWQgYXJlIHJlcGxhY2VkIHdpdGggdmVyeSBjaGVhcFxuICogU0VMRiByZWNvcmRzLlxuICpcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgZnVuY3Rpb24gY29hbGVzY2Uoc3JjUmVjb3JkczogUHJvdG9SZWNvcmRbXSk6IFByb3RvUmVjb3JkW10ge1xuICBsZXQgZHN0UmVjb3JkcyA9IFtdO1xuICBsZXQgZXhjbHVkZWRJZHhzID0gW107XG4gIGxldCBpbmRleE1hcDogTWFwPG51bWJlciwgbnVtYmVyPiA9IG5ldyBNYXA8bnVtYmVyLCBudW1iZXI+KCk7XG4gIGxldCBza2lwRGVwdGggPSAwO1xuICBsZXQgc2tpcFNvdXJjZXM6IFByb3RvUmVjb3JkW10gPSBMaXN0V3JhcHBlci5jcmVhdGVGaXhlZFNpemUoc3JjUmVjb3Jkcy5sZW5ndGgpO1xuXG4gIGZvciAobGV0IHByb3RvSW5kZXggPSAwOyBwcm90b0luZGV4IDwgc3JjUmVjb3Jkcy5sZW5ndGg7IHByb3RvSW5kZXgrKykge1xuICAgIGxldCBza2lwUmVjb3JkID0gc2tpcFNvdXJjZXNbcHJvdG9JbmRleF07XG4gICAgaWYgKGlzUHJlc2VudChza2lwUmVjb3JkKSkge1xuICAgICAgc2tpcERlcHRoLS07XG4gICAgICBza2lwUmVjb3JkLmZpeGVkQXJnc1swXSA9IGRzdFJlY29yZHMubGVuZ3RoO1xuICAgIH1cblxuICAgIGxldCBzcmMgPSBzcmNSZWNvcmRzW3Byb3RvSW5kZXhdO1xuICAgIGxldCBkc3QgPSBfY2xvbmVBbmRVcGRhdGVJbmRleGVzKHNyYywgZHN0UmVjb3JkcywgaW5kZXhNYXApO1xuXG4gICAgaWYgKGRzdC5pc1NraXBSZWNvcmQoKSkge1xuICAgICAgZHN0UmVjb3Jkcy5wdXNoKGRzdCk7XG4gICAgICBza2lwRGVwdGgrKztcbiAgICAgIHNraXBTb3VyY2VzW2RzdC5maXhlZEFyZ3NbMF1dID0gZHN0O1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgcmVjb3JkID0gX21heUJlQWRkUmVjb3JkKGRzdCwgZHN0UmVjb3JkcywgZXhjbHVkZWRJZHhzLCBza2lwRGVwdGggPiAwKTtcbiAgICAgIGluZGV4TWFwLnNldChzcmMuc2VsZkluZGV4LCByZWNvcmQuc2VsZkluZGV4KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gX29wdGltaXplU2tpcHMoZHN0UmVjb3Jkcyk7XG59XG5cbi8qKlxuICogLSBDb25kaXRpb25hbCBza2lwIG9mIDEgcmVjb3JkIGZvbGxvd2VkIGJ5IGFuIHVuY29uZGl0aW9uYWwgc2tpcCBvZiBOIGFyZSByZXBsYWNlZCBieSAgYVxuICogICBjb25kaXRpb25hbCBza2lwIG9mIE4gd2l0aCB0aGUgbmVnYXRlZCBjb25kaXRpb24sXG4gKiAtIFNraXBzIG9mIDAgcmVjb3JkcyBhcmUgcmVtb3ZlZFxuICovXG5mdW5jdGlvbiBfb3B0aW1pemVTa2lwcyhzcmNSZWNvcmRzOiBQcm90b1JlY29yZFtdKTogUHJvdG9SZWNvcmRbXSB7XG4gIGxldCBkc3RSZWNvcmRzID0gW107XG4gIGxldCBza2lwU291cmNlcyA9IExpc3RXcmFwcGVyLmNyZWF0ZUZpeGVkU2l6ZShzcmNSZWNvcmRzLmxlbmd0aCk7XG4gIGxldCBpbmRleE1hcDogTWFwPG51bWJlciwgbnVtYmVyPiA9IG5ldyBNYXA8bnVtYmVyLCBudW1iZXI+KCk7XG5cbiAgZm9yIChsZXQgcHJvdG9JbmRleCA9IDA7IHByb3RvSW5kZXggPCBzcmNSZWNvcmRzLmxlbmd0aDsgcHJvdG9JbmRleCsrKSB7XG4gICAgbGV0IHNraXBSZWNvcmQgPSBza2lwU291cmNlc1twcm90b0luZGV4XTtcbiAgICBpZiAoaXNQcmVzZW50KHNraXBSZWNvcmQpKSB7XG4gICAgICBza2lwUmVjb3JkLmZpeGVkQXJnc1swXSA9IGRzdFJlY29yZHMubGVuZ3RoO1xuICAgIH1cblxuICAgIGxldCBzcmMgPSBzcmNSZWNvcmRzW3Byb3RvSW5kZXhdO1xuXG4gICAgaWYgKHNyYy5pc1NraXBSZWNvcmQoKSkge1xuICAgICAgaWYgKHNyYy5pc0NvbmRpdGlvbmFsU2tpcFJlY29yZCgpICYmIHNyYy5maXhlZEFyZ3NbMF0gPT09IHByb3RvSW5kZXggKyAyICYmXG4gICAgICAgICAgcHJvdG9JbmRleCA8IHNyY1JlY29yZHMubGVuZ3RoIC0gMSAmJlxuICAgICAgICAgIHNyY1JlY29yZHNbcHJvdG9JbmRleCArIDFdLm1vZGUgPT09IFJlY29yZFR5cGUuU2tpcFJlY29yZHMpIHtcbiAgICAgICAgc3JjLm1vZGUgPSBzcmMubW9kZSA9PT0gUmVjb3JkVHlwZS5Ta2lwUmVjb3Jkc0lmID8gUmVjb3JkVHlwZS5Ta2lwUmVjb3Jkc0lmTm90IDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVjb3JkVHlwZS5Ta2lwUmVjb3Jkc0lmO1xuICAgICAgICBzcmMuZml4ZWRBcmdzWzBdID0gc3JjUmVjb3Jkc1twcm90b0luZGV4ICsgMV0uZml4ZWRBcmdzWzBdO1xuICAgICAgICBwcm90b0luZGV4Kys7XG4gICAgICB9XG5cbiAgICAgIGlmIChzcmMuZml4ZWRBcmdzWzBdID4gcHJvdG9JbmRleCArIDEpIHtcbiAgICAgICAgbGV0IGRzdCA9IF9jbG9uZUFuZFVwZGF0ZUluZGV4ZXMoc3JjLCBkc3RSZWNvcmRzLCBpbmRleE1hcCk7XG4gICAgICAgIGRzdFJlY29yZHMucHVzaChkc3QpO1xuICAgICAgICBza2lwU291cmNlc1tkc3QuZml4ZWRBcmdzWzBdXSA9IGRzdDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZHN0ID0gX2Nsb25lQW5kVXBkYXRlSW5kZXhlcyhzcmMsIGRzdFJlY29yZHMsIGluZGV4TWFwKTtcbiAgICAgIGRzdFJlY29yZHMucHVzaChkc3QpO1xuICAgICAgaW5kZXhNYXAuc2V0KHNyYy5zZWxmSW5kZXgsIGRzdC5zZWxmSW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkc3RSZWNvcmRzO1xufVxuXG4vKipcbiAqIEFkZCBhIG5ldyByZWNvcmQgb3IgcmUtdXNlIG9uZSBvZiB0aGUgZXhpc3RpbmcgcmVjb3Jkcy5cbiAqL1xuZnVuY3Rpb24gX21heUJlQWRkUmVjb3JkKHJlY29yZDogUHJvdG9SZWNvcmQsIGRzdFJlY29yZHM6IFByb3RvUmVjb3JkW10sIGV4Y2x1ZGVkSWR4czogbnVtYmVyW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgZXhjbHVkZWQ6IGJvb2xlYW4pOiBQcm90b1JlY29yZCB7XG4gIGxldCBtYXRjaCA9IF9maW5kRmlyc3RNYXRjaChyZWNvcmQsIGRzdFJlY29yZHMsIGV4Y2x1ZGVkSWR4cyk7XG5cbiAgaWYgKGlzUHJlc2VudChtYXRjaCkpIHtcbiAgICBpZiAocmVjb3JkLmxhc3RJbkJpbmRpbmcpIHtcbiAgICAgIGRzdFJlY29yZHMucHVzaChfY3JlYXRlU2VsZlJlY29yZChyZWNvcmQsIG1hdGNoLnNlbGZJbmRleCwgZHN0UmVjb3Jkcy5sZW5ndGggKyAxKSk7XG4gICAgICBtYXRjaC5yZWZlcmVuY2VkQnlTZWxmID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHJlY29yZC5hcmd1bWVudFRvUHVyZUZ1bmN0aW9uKSB7XG4gICAgICAgIG1hdGNoLmFyZ3VtZW50VG9QdXJlRnVuY3Rpb24gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXRjaDtcbiAgfVxuXG4gIGlmIChleGNsdWRlZCkge1xuICAgIGV4Y2x1ZGVkSWR4cy5wdXNoKHJlY29yZC5zZWxmSW5kZXgpO1xuICB9XG5cbiAgZHN0UmVjb3Jkcy5wdXNoKHJlY29yZCk7XG4gIHJldHVybiByZWNvcmQ7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZmlyc3QgYFByb3RvUmVjb3JkYCB0aGF0IG1hdGNoZXMgdGhlIHJlY29yZC5cbiAqL1xuZnVuY3Rpb24gX2ZpbmRGaXJzdE1hdGNoKHJlY29yZDogUHJvdG9SZWNvcmQsIGRzdFJlY29yZHM6IFByb3RvUmVjb3JkW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgZXhjbHVkZWRJZHhzOiBudW1iZXJbXSk6IFByb3RvUmVjb3JkIHtcbiAgcmV0dXJuIGRzdFJlY29yZHMuZmluZChcbiAgICAgIC8vIFRPRE8odmljYik6IG9wdGltaXplIGV4Y2x1ZGVkSWR4cy5pbmRleE9mIChzb3J0ZWQgYXJyYXkpXG4gICAgICByciA9PiBleGNsdWRlZElkeHMuaW5kZXhPZihyci5zZWxmSW5kZXgpID09IC0xICYmIHJyLm1vZGUgIT09IFJlY29yZFR5cGUuRGlyZWN0aXZlTGlmZWN5Y2xlICYmXG4gICAgICAgICAgICBfaGF2ZVNhbWVEaXJJbmRleChyciwgcmVjb3JkKSAmJiByci5tb2RlID09PSByZWNvcmQubW9kZSAmJlxuICAgICAgICAgICAgbG9vc2VJZGVudGljYWwocnIuZnVuY09yVmFsdWUsIHJlY29yZC5mdW5jT3JWYWx1ZSkgJiZcbiAgICAgICAgICAgIHJyLmNvbnRleHRJbmRleCA9PT0gcmVjb3JkLmNvbnRleHRJbmRleCAmJiBsb29zZUlkZW50aWNhbChyci5uYW1lLCByZWNvcmQubmFtZSkgJiZcbiAgICAgICAgICAgIExpc3RXcmFwcGVyLmVxdWFscyhyci5hcmdzLCByZWNvcmQuYXJncykpO1xufVxuXG4vKipcbiAqIENsb25lIHRoZSBgUHJvdG9SZWNvcmRgIGFuZCBjaGFuZ2VzIHRoZSBpbmRleGVzIGZvciB0aGUgb25lcyBpbiB0aGUgZGVzdGluYXRpb24gYXJyYXkgZm9yOlxuICogLSB0aGUgYXJndW1lbnRzLFxuICogLSB0aGUgY29udGV4dCxcbiAqIC0gc2VsZlxuICovXG5mdW5jdGlvbiBfY2xvbmVBbmRVcGRhdGVJbmRleGVzKHJlY29yZDogUHJvdG9SZWNvcmQsIGRzdFJlY29yZHM6IFByb3RvUmVjb3JkW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4TWFwOiBNYXA8bnVtYmVyLCBudW1iZXI+KTogUHJvdG9SZWNvcmQge1xuICBsZXQgYXJncyA9IHJlY29yZC5hcmdzLm1hcChzcmMgPT4gX3NyY1RvRHN0U2VsZkluZGV4KGluZGV4TWFwLCBzcmMpKTtcbiAgbGV0IGNvbnRleHRJbmRleCA9IF9zcmNUb0RzdFNlbGZJbmRleChpbmRleE1hcCwgcmVjb3JkLmNvbnRleHRJbmRleCk7XG4gIGxldCBzZWxmSW5kZXggPSBkc3RSZWNvcmRzLmxlbmd0aCArIDE7XG5cbiAgcmV0dXJuIG5ldyBQcm90b1JlY29yZChyZWNvcmQubW9kZSwgcmVjb3JkLm5hbWUsIHJlY29yZC5mdW5jT3JWYWx1ZSwgYXJncywgcmVjb3JkLmZpeGVkQXJncyxcbiAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0SW5kZXgsIHJlY29yZC5kaXJlY3RpdmVJbmRleCwgc2VsZkluZGV4LCByZWNvcmQuYmluZGluZ1JlY29yZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICByZWNvcmQubGFzdEluQmluZGluZywgcmVjb3JkLmxhc3RJbkRpcmVjdGl2ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICByZWNvcmQuYXJndW1lbnRUb1B1cmVGdW5jdGlvbiwgcmVjb3JkLnJlZmVyZW5jZWRCeVNlbGYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgcmVjb3JkLnByb3BlcnR5QmluZGluZ0luZGV4KTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBpbmRleCBpbiB0aGUgZGVzdGluYXRpb24gYXJyYXkgY29ycmVzcG9uZGluZyB0byB0aGUgaW5kZXggaW4gdGhlIHNyYyBhcnJheS5cbiAqIFdoZW4gdGhlIGVsZW1lbnQgaXMgbm90IHByZXNlbnQgaW4gdGhlIGRlc3RpbmF0aW9uIGFycmF5LCByZXR1cm4gdGhlIHNvdXJjZSBpbmRleC5cbiAqL1xuZnVuY3Rpb24gX3NyY1RvRHN0U2VsZkluZGV4KGluZGV4TWFwOiBNYXA8bnVtYmVyLCBudW1iZXI+LCBzcmNJZHg6IG51bWJlcik6IG51bWJlciB7XG4gIHZhciBkc3RJZHggPSBpbmRleE1hcC5nZXQoc3JjSWR4KTtcbiAgcmV0dXJuIGlzUHJlc2VudChkc3RJZHgpID8gZHN0SWR4IDogc3JjSWR4O1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlU2VsZlJlY29yZChyOiBQcm90b1JlY29yZCwgY29udGV4dEluZGV4OiBudW1iZXIsIHNlbGZJbmRleDogbnVtYmVyKTogUHJvdG9SZWNvcmQge1xuICByZXR1cm4gbmV3IFByb3RvUmVjb3JkKFJlY29yZFR5cGUuU2VsZiwgXCJzZWxmXCIsIG51bGwsIFtdLCByLmZpeGVkQXJncywgY29udGV4dEluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgIHIuZGlyZWN0aXZlSW5kZXgsIHNlbGZJbmRleCwgci5iaW5kaW5nUmVjb3JkLCByLmxhc3RJbkJpbmRpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgci5sYXN0SW5EaXJlY3RpdmUsIGZhbHNlLCBmYWxzZSwgci5wcm9wZXJ0eUJpbmRpbmdJbmRleCk7XG59XG5cbmZ1bmN0aW9uIF9oYXZlU2FtZURpckluZGV4KGE6IFByb3RvUmVjb3JkLCBiOiBQcm90b1JlY29yZCk6IGJvb2xlYW4ge1xuICB2YXIgZGkxID0gaXNCbGFuayhhLmRpcmVjdGl2ZUluZGV4KSA/IG51bGwgOiBhLmRpcmVjdGl2ZUluZGV4LmRpcmVjdGl2ZUluZGV4O1xuICB2YXIgZWkxID0gaXNCbGFuayhhLmRpcmVjdGl2ZUluZGV4KSA/IG51bGwgOiBhLmRpcmVjdGl2ZUluZGV4LmVsZW1lbnRJbmRleDtcblxuICB2YXIgZGkyID0gaXNCbGFuayhiLmRpcmVjdGl2ZUluZGV4KSA/IG51bGwgOiBiLmRpcmVjdGl2ZUluZGV4LmRpcmVjdGl2ZUluZGV4O1xuICB2YXIgZWkyID0gaXNCbGFuayhiLmRpcmVjdGl2ZUluZGV4KSA/IG51bGwgOiBiLmRpcmVjdGl2ZUluZGV4LmVsZW1lbnRJbmRleDtcblxuICByZXR1cm4gZGkxID09PSBkaTIgJiYgZWkxID09PSBlaTI7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
