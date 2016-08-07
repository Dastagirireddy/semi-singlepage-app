System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/collection', './abstract_change_detector', './change_detection_util', './constants', './proto_record', 'angular2/src/core/reflection/reflection', 'angular2/src/facade/async'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lang_1, exceptions_1, collection_1, abstract_change_detector_1, change_detection_util_1, constants_1, proto_record_1, reflection_1, async_1;
    var DynamicChangeDetector;
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
            function (abstract_change_detector_1_1) {
                abstract_change_detector_1 = abstract_change_detector_1_1;
            },
            function (change_detection_util_1_1) {
                change_detection_util_1 = change_detection_util_1_1;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            },
            function (proto_record_1_1) {
                proto_record_1 = proto_record_1_1;
            },
            function (reflection_1_1) {
                reflection_1 = reflection_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            }],
        execute: function() {
            DynamicChangeDetector = (function (_super) {
                __extends(DynamicChangeDetector, _super);
                function DynamicChangeDetector(id, numberOfPropertyProtoRecords, propertyBindingTargets, directiveIndices, strategy, _records, _eventBindings, _directiveRecords, _genConfig) {
                    _super.call(this, id, numberOfPropertyProtoRecords, propertyBindingTargets, directiveIndices, strategy);
                    this._records = _records;
                    this._eventBindings = _eventBindings;
                    this._directiveRecords = _directiveRecords;
                    this._genConfig = _genConfig;
                    var len = _records.length + 1;
                    this.values = collection_1.ListWrapper.createFixedSize(len);
                    this.localPipes = collection_1.ListWrapper.createFixedSize(len);
                    this.prevContexts = collection_1.ListWrapper.createFixedSize(len);
                    this.changes = collection_1.ListWrapper.createFixedSize(len);
                    this.dehydrateDirectives(false);
                }
                DynamicChangeDetector.prototype.handleEventInternal = function (eventName, elIndex, locals) {
                    var _this = this;
                    var preventDefault = false;
                    this._matchingEventBindings(eventName, elIndex)
                        .forEach(function (rec) {
                        var res = _this._processEventBinding(rec, locals);
                        if (res === false) {
                            preventDefault = true;
                        }
                    });
                    return preventDefault;
                };
                /** @internal */
                DynamicChangeDetector.prototype._processEventBinding = function (eb, locals) {
                    var values = collection_1.ListWrapper.createFixedSize(eb.records.length);
                    values[0] = this.values[0];
                    for (var protoIdx = 0; protoIdx < eb.records.length; ++protoIdx) {
                        var proto = eb.records[protoIdx];
                        if (proto.isSkipRecord()) {
                            protoIdx += this._computeSkipLength(protoIdx, proto, values);
                        }
                        else {
                            if (proto.lastInBinding) {
                                this._markPathAsCheckOnce(proto);
                            }
                            var res = this._calculateCurrValue(proto, values, locals);
                            if (proto.lastInBinding) {
                                return res;
                            }
                            else {
                                this._writeSelf(proto, res, values);
                            }
                        }
                    }
                    throw new exceptions_1.BaseException("Cannot be reached");
                };
                DynamicChangeDetector.prototype._computeSkipLength = function (protoIndex, proto, values) {
                    if (proto.mode === proto_record_1.RecordType.SkipRecords) {
                        return proto.fixedArgs[0] - protoIndex - 1;
                    }
                    if (proto.mode === proto_record_1.RecordType.SkipRecordsIf) {
                        var condition = this._readContext(proto, values);
                        return condition ? proto.fixedArgs[0] - protoIndex - 1 : 0;
                    }
                    if (proto.mode === proto_record_1.RecordType.SkipRecordsIfNot) {
                        var condition = this._readContext(proto, values);
                        return condition ? 0 : proto.fixedArgs[0] - protoIndex - 1;
                    }
                    throw new exceptions_1.BaseException("Cannot be reached");
                };
                /** @internal */
                DynamicChangeDetector.prototype._markPathAsCheckOnce = function (proto) {
                    if (!proto.bindingRecord.isDefaultChangeDetection()) {
                        var dir = proto.bindingRecord.directiveRecord;
                        this._getDetectorFor(dir.directiveIndex).markPathToRootAsCheckOnce();
                    }
                };
                /** @internal */
                DynamicChangeDetector.prototype._matchingEventBindings = function (eventName, elIndex) {
                    return this._eventBindings.filter(function (eb) { return eb.eventName == eventName && eb.elIndex === elIndex; });
                };
                DynamicChangeDetector.prototype.hydrateDirectives = function (dispatcher) {
                    var _this = this;
                    this.values[0] = this.context;
                    this.dispatcher = dispatcher;
                    this.outputSubscriptions = [];
                    for (var i = 0; i < this._directiveRecords.length; ++i) {
                        var r = this._directiveRecords[i];
                        if (lang_1.isPresent(r.outputs)) {
                            r.outputs.forEach(function (output) {
                                var eventHandler = _this._createEventHandler(r.directiveIndex.elementIndex, output[1]);
                                var directive = _this._getDirectiveFor(r.directiveIndex);
                                var getter = reflection_1.reflector.getter(output[0]);
                                _this.outputSubscriptions.push(async_1.ObservableWrapper.subscribe(getter(directive), eventHandler));
                            });
                        }
                    }
                };
                DynamicChangeDetector.prototype._createEventHandler = function (boundElementIndex, eventName) {
                    var _this = this;
                    return function (event) { return _this.handleEvent(eventName, boundElementIndex, event); };
                };
                DynamicChangeDetector.prototype.dehydrateDirectives = function (destroyPipes) {
                    if (destroyPipes) {
                        this._destroyPipes();
                        this._destroyDirectives();
                    }
                    this.values[0] = null;
                    collection_1.ListWrapper.fill(this.values, change_detection_util_1.ChangeDetectionUtil.uninitialized, 1);
                    collection_1.ListWrapper.fill(this.changes, false);
                    collection_1.ListWrapper.fill(this.localPipes, null);
                    collection_1.ListWrapper.fill(this.prevContexts, change_detection_util_1.ChangeDetectionUtil.uninitialized);
                };
                /** @internal */
                DynamicChangeDetector.prototype._destroyPipes = function () {
                    for (var i = 0; i < this.localPipes.length; ++i) {
                        if (lang_1.isPresent(this.localPipes[i])) {
                            change_detection_util_1.ChangeDetectionUtil.callPipeOnDestroy(this.localPipes[i]);
                        }
                    }
                };
                /** @internal */
                DynamicChangeDetector.prototype._destroyDirectives = function () {
                    for (var i = 0; i < this._directiveRecords.length; ++i) {
                        var record = this._directiveRecords[i];
                        if (record.callOnDestroy) {
                            this._getDirectiveFor(record.directiveIndex).ngOnDestroy();
                        }
                    }
                };
                DynamicChangeDetector.prototype.checkNoChanges = function () { this.runDetectChanges(true); };
                DynamicChangeDetector.prototype.detectChangesInRecordsInternal = function (throwOnChange) {
                    var protos = this._records;
                    var changes = null;
                    var isChanged = false;
                    for (var protoIdx = 0; protoIdx < protos.length; ++protoIdx) {
                        var proto = protos[protoIdx];
                        var bindingRecord = proto.bindingRecord;
                        var directiveRecord = bindingRecord.directiveRecord;
                        if (this._firstInBinding(proto)) {
                            this.propertyBindingIndex = proto.propertyBindingIndex;
                        }
                        if (proto.isLifeCycleRecord()) {
                            if (proto.name === "DoCheck" && !throwOnChange) {
                                this._getDirectiveFor(directiveRecord.directiveIndex).ngDoCheck();
                            }
                            else if (proto.name === "OnInit" && !throwOnChange &&
                                this.state == constants_1.ChangeDetectorState.NeverChecked) {
                                this._getDirectiveFor(directiveRecord.directiveIndex).ngOnInit();
                            }
                            else if (proto.name === "OnChanges" && lang_1.isPresent(changes) && !throwOnChange) {
                                this._getDirectiveFor(directiveRecord.directiveIndex).ngOnChanges(changes);
                            }
                        }
                        else if (proto.isSkipRecord()) {
                            protoIdx += this._computeSkipLength(protoIdx, proto, this.values);
                        }
                        else {
                            var change = this._check(proto, throwOnChange, this.values, this.locals);
                            if (lang_1.isPresent(change)) {
                                this._updateDirectiveOrElement(change, bindingRecord);
                                isChanged = true;
                                changes = this._addChange(bindingRecord, change, changes);
                            }
                        }
                        if (proto.lastInDirective) {
                            changes = null;
                            if (isChanged && !bindingRecord.isDefaultChangeDetection()) {
                                this._getDetectorFor(directiveRecord.directiveIndex).markAsCheckOnce();
                            }
                            isChanged = false;
                        }
                    }
                };
                /** @internal */
                DynamicChangeDetector.prototype._firstInBinding = function (r) {
                    var prev = change_detection_util_1.ChangeDetectionUtil.protoByIndex(this._records, r.selfIndex - 1);
                    return lang_1.isBlank(prev) || prev.bindingRecord !== r.bindingRecord;
                };
                DynamicChangeDetector.prototype.afterContentLifecycleCallbacksInternal = function () {
                    var dirs = this._directiveRecords;
                    for (var i = dirs.length - 1; i >= 0; --i) {
                        var dir = dirs[i];
                        if (dir.callAfterContentInit && this.state == constants_1.ChangeDetectorState.NeverChecked) {
                            this._getDirectiveFor(dir.directiveIndex).ngAfterContentInit();
                        }
                        if (dir.callAfterContentChecked) {
                            this._getDirectiveFor(dir.directiveIndex).ngAfterContentChecked();
                        }
                    }
                };
                DynamicChangeDetector.prototype.afterViewLifecycleCallbacksInternal = function () {
                    var dirs = this._directiveRecords;
                    for (var i = dirs.length - 1; i >= 0; --i) {
                        var dir = dirs[i];
                        if (dir.callAfterViewInit && this.state == constants_1.ChangeDetectorState.NeverChecked) {
                            this._getDirectiveFor(dir.directiveIndex).ngAfterViewInit();
                        }
                        if (dir.callAfterViewChecked) {
                            this._getDirectiveFor(dir.directiveIndex).ngAfterViewChecked();
                        }
                    }
                };
                /** @internal */
                DynamicChangeDetector.prototype._updateDirectiveOrElement = function (change, bindingRecord) {
                    if (lang_1.isBlank(bindingRecord.directiveRecord)) {
                        _super.prototype.notifyDispatcher.call(this, change.currentValue);
                    }
                    else {
                        var directiveIndex = bindingRecord.directiveRecord.directiveIndex;
                        bindingRecord.setter(this._getDirectiveFor(directiveIndex), change.currentValue);
                    }
                    if (this._genConfig.logBindingUpdate) {
                        _super.prototype.logBindingUpdate.call(this, change.currentValue);
                    }
                };
                /** @internal */
                DynamicChangeDetector.prototype._addChange = function (bindingRecord, change, changes) {
                    if (bindingRecord.callOnChanges()) {
                        return _super.prototype.addChange.call(this, changes, change.previousValue, change.currentValue);
                    }
                    else {
                        return changes;
                    }
                };
                /** @internal */
                DynamicChangeDetector.prototype._getDirectiveFor = function (directiveIndex) {
                    return this.dispatcher.getDirectiveFor(directiveIndex);
                };
                /** @internal */
                DynamicChangeDetector.prototype._getDetectorFor = function (directiveIndex) {
                    return this.dispatcher.getDetectorFor(directiveIndex);
                };
                /** @internal */
                DynamicChangeDetector.prototype._check = function (proto, throwOnChange, values, locals) {
                    if (proto.isPipeRecord()) {
                        return this._pipeCheck(proto, throwOnChange, values);
                    }
                    else {
                        return this._referenceCheck(proto, throwOnChange, values, locals);
                    }
                };
                /** @internal */
                DynamicChangeDetector.prototype._referenceCheck = function (proto, throwOnChange, values, locals) {
                    if (this._pureFuncAndArgsDidNotChange(proto)) {
                        this._setChanged(proto, false);
                        return null;
                    }
                    var currValue = this._calculateCurrValue(proto, values, locals);
                    if (proto.shouldBeChecked()) {
                        var prevValue = this._readSelf(proto, values);
                        var detectedChange = throwOnChange ?
                            !change_detection_util_1.ChangeDetectionUtil.devModeEqual(prevValue, currValue) :
                            change_detection_util_1.ChangeDetectionUtil.looseNotIdentical(prevValue, currValue);
                        if (detectedChange) {
                            if (proto.lastInBinding) {
                                var change = change_detection_util_1.ChangeDetectionUtil.simpleChange(prevValue, currValue);
                                if (throwOnChange)
                                    this.throwOnChangeError(prevValue, currValue);
                                this._writeSelf(proto, currValue, values);
                                this._setChanged(proto, true);
                                return change;
                            }
                            else {
                                this._writeSelf(proto, currValue, values);
                                this._setChanged(proto, true);
                                return null;
                            }
                        }
                        else {
                            this._setChanged(proto, false);
                            return null;
                        }
                    }
                    else {
                        this._writeSelf(proto, currValue, values);
                        this._setChanged(proto, true);
                        return null;
                    }
                };
                DynamicChangeDetector.prototype._calculateCurrValue = function (proto, values, locals) {
                    switch (proto.mode) {
                        case proto_record_1.RecordType.Self:
                            return this._readContext(proto, values);
                        case proto_record_1.RecordType.Const:
                            return proto.funcOrValue;
                        case proto_record_1.RecordType.PropertyRead:
                            var context = this._readContext(proto, values);
                            return proto.funcOrValue(context);
                        case proto_record_1.RecordType.SafeProperty:
                            var context = this._readContext(proto, values);
                            return lang_1.isBlank(context) ? null : proto.funcOrValue(context);
                        case proto_record_1.RecordType.PropertyWrite:
                            var context = this._readContext(proto, values);
                            var value = this._readArgs(proto, values)[0];
                            proto.funcOrValue(context, value);
                            return value;
                        case proto_record_1.RecordType.KeyedWrite:
                            var context = this._readContext(proto, values);
                            var key = this._readArgs(proto, values)[0];
                            var value = this._readArgs(proto, values)[1];
                            context[key] = value;
                            return value;
                        case proto_record_1.RecordType.Local:
                            return locals.get(proto.name);
                        case proto_record_1.RecordType.InvokeMethod:
                            var context = this._readContext(proto, values);
                            var args = this._readArgs(proto, values);
                            return proto.funcOrValue(context, args);
                        case proto_record_1.RecordType.SafeMethodInvoke:
                            var context = this._readContext(proto, values);
                            if (lang_1.isBlank(context)) {
                                return null;
                            }
                            var args = this._readArgs(proto, values);
                            return proto.funcOrValue(context, args);
                        case proto_record_1.RecordType.KeyedRead:
                            var arg = this._readArgs(proto, values)[0];
                            return this._readContext(proto, values)[arg];
                        case proto_record_1.RecordType.Chain:
                            var args = this._readArgs(proto, values);
                            return args[args.length - 1];
                        case proto_record_1.RecordType.InvokeClosure:
                            return lang_1.FunctionWrapper.apply(this._readContext(proto, values), this._readArgs(proto, values));
                        case proto_record_1.RecordType.Interpolate:
                        case proto_record_1.RecordType.PrimitiveOp:
                        case proto_record_1.RecordType.CollectionLiteral:
                            return lang_1.FunctionWrapper.apply(proto.funcOrValue, this._readArgs(proto, values));
                        default:
                            throw new exceptions_1.BaseException("Unknown operation " + proto.mode);
                    }
                };
                DynamicChangeDetector.prototype._pipeCheck = function (proto, throwOnChange, values) {
                    var context = this._readContext(proto, values);
                    var selectedPipe = this._pipeFor(proto, context);
                    if (!selectedPipe.pure || this._argsOrContextChanged(proto)) {
                        var args = this._readArgs(proto, values);
                        var currValue = selectedPipe.pipe.transform(context, args);
                        if (proto.shouldBeChecked()) {
                            var prevValue = this._readSelf(proto, values);
                            var detectedChange = throwOnChange ?
                                !change_detection_util_1.ChangeDetectionUtil.devModeEqual(prevValue, currValue) :
                                change_detection_util_1.ChangeDetectionUtil.looseNotIdentical(prevValue, currValue);
                            if (detectedChange) {
                                currValue = change_detection_util_1.ChangeDetectionUtil.unwrapValue(currValue);
                                if (proto.lastInBinding) {
                                    var change = change_detection_util_1.ChangeDetectionUtil.simpleChange(prevValue, currValue);
                                    if (throwOnChange)
                                        this.throwOnChangeError(prevValue, currValue);
                                    this._writeSelf(proto, currValue, values);
                                    this._setChanged(proto, true);
                                    return change;
                                }
                                else {
                                    this._writeSelf(proto, currValue, values);
                                    this._setChanged(proto, true);
                                    return null;
                                }
                            }
                            else {
                                this._setChanged(proto, false);
                                return null;
                            }
                        }
                        else {
                            this._writeSelf(proto, currValue, values);
                            this._setChanged(proto, true);
                            return null;
                        }
                    }
                };
                DynamicChangeDetector.prototype._pipeFor = function (proto, context) {
                    var storedPipe = this._readPipe(proto);
                    if (lang_1.isPresent(storedPipe))
                        return storedPipe;
                    var pipe = this.pipes.get(proto.name);
                    this._writePipe(proto, pipe);
                    return pipe;
                };
                DynamicChangeDetector.prototype._readContext = function (proto, values) {
                    if (proto.contextIndex == -1) {
                        return this._getDirectiveFor(proto.directiveIndex);
                    }
                    return values[proto.contextIndex];
                };
                DynamicChangeDetector.prototype._readSelf = function (proto, values) { return values[proto.selfIndex]; };
                DynamicChangeDetector.prototype._writeSelf = function (proto, value, values) { values[proto.selfIndex] = value; };
                DynamicChangeDetector.prototype._readPipe = function (proto) { return this.localPipes[proto.selfIndex]; };
                DynamicChangeDetector.prototype._writePipe = function (proto, value) { this.localPipes[proto.selfIndex] = value; };
                DynamicChangeDetector.prototype._setChanged = function (proto, value) {
                    if (proto.argumentToPureFunction)
                        this.changes[proto.selfIndex] = value;
                };
                DynamicChangeDetector.prototype._pureFuncAndArgsDidNotChange = function (proto) {
                    return proto.isPureFunction() && !this._argsChanged(proto);
                };
                DynamicChangeDetector.prototype._argsChanged = function (proto) {
                    var args = proto.args;
                    for (var i = 0; i < args.length; ++i) {
                        if (this.changes[args[i]]) {
                            return true;
                        }
                    }
                    return false;
                };
                DynamicChangeDetector.prototype._argsOrContextChanged = function (proto) {
                    return this._argsChanged(proto) || this.changes[proto.contextIndex];
                };
                DynamicChangeDetector.prototype._readArgs = function (proto, values) {
                    var res = collection_1.ListWrapper.createFixedSize(proto.args.length);
                    var args = proto.args;
                    for (var i = 0; i < args.length; ++i) {
                        res[i] = values[args[i]];
                    }
                    return res;
                };
                return DynamicChangeDetector;
            }(abstract_change_detector_1.AbstractChangeDetector));
            exports_1("DynamicChangeDetector", DynamicChangeDetector);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9keW5hbWljX2NoYW5nZV9kZXRlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBZ0JBO2dCQUEyQyx5Q0FBMkI7Z0JBTXBFLCtCQUFZLEVBQVUsRUFBRSw0QkFBb0MsRUFDaEQsc0JBQXVDLEVBQUUsZ0JBQWtDLEVBQzNFLFFBQWlDLEVBQVUsUUFBdUIsRUFDMUQsY0FBOEIsRUFBVSxpQkFBb0MsRUFDNUUsVUFBbUM7b0JBQ3JELGtCQUFNLEVBQUUsRUFBRSw0QkFBNEIsRUFBRSxzQkFBc0IsRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFIdkMsYUFBUSxHQUFSLFFBQVEsQ0FBZTtvQkFDMUQsbUJBQWMsR0FBZCxjQUFjLENBQWdCO29CQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7b0JBQzVFLGVBQVUsR0FBVixVQUFVLENBQXlCO29CQUVyRCxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxDQUFDLE1BQU0sR0FBRyx3QkFBVyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDL0MsSUFBSSxDQUFDLFVBQVUsR0FBRyx3QkFBVyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDbkQsSUFBSSxDQUFDLFlBQVksR0FBRyx3QkFBVyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDckQsSUFBSSxDQUFDLE9BQU8sR0FBRyx3QkFBVyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFFaEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNsQyxDQUFDO2dCQUVELG1EQUFtQixHQUFuQixVQUFvQixTQUFpQixFQUFFLE9BQWUs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SSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztvQkFDdEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7d0JBQ3JDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzNCLENBQUM7b0JBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztnQkFDYixDQUFDO2dCQUNILDRCQUFDO1lBQUQsQ0F6ZEEsQUF5ZEMsQ0F6ZDBDLGlEQUFzQixHQXlkaEU7WUF6ZEQseURBeWRDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2R5bmFtaWNfY2hhbmdlX2RldGVjdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc1ByZXNlbnQsIGlzQmxhbmssIEZ1bmN0aW9uV3JhcHBlciwgU3RyaW5nV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7TGlzdFdyYXBwZXIsIE1hcFdyYXBwZXIsIFN0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5cbmltcG9ydCB7QWJzdHJhY3RDaGFuZ2VEZXRlY3Rvcn0gZnJvbSAnLi9hYnN0cmFjdF9jaGFuZ2VfZGV0ZWN0b3InO1xuaW1wb3J0IHtFdmVudEJpbmRpbmd9IGZyb20gJy4vZXZlbnRfYmluZGluZyc7XG5pbXBvcnQge0JpbmRpbmdSZWNvcmQsIEJpbmRpbmdUYXJnZXR9IGZyb20gJy4vYmluZGluZ19yZWNvcmQnO1xuaW1wb3J0IHtEaXJlY3RpdmVSZWNvcmQsIERpcmVjdGl2ZUluZGV4fSBmcm9tICcuL2RpcmVjdGl2ZV9yZWNvcmQnO1xuaW1wb3J0IHtMb2NhbHN9IGZyb20gJy4vcGFyc2VyL2xvY2Fscyc7XG5pbXBvcnQge0NoYW5nZURpc3BhdGNoZXIsIENoYW5nZURldGVjdG9yR2VuQ29uZmlnfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25VdGlsLCBTaW1wbGVDaGFuZ2V9IGZyb20gJy4vY2hhbmdlX2RldGVjdGlvbl91dGlsJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yU3RhdGV9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7UHJvdG9SZWNvcmQsIFJlY29yZFR5cGV9IGZyb20gJy4vcHJvdG9fcmVjb3JkJztcbmltcG9ydCB7cmVmbGVjdG9yfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9yZWZsZWN0aW9uL3JlZmxlY3Rpb24nO1xuaW1wb3J0IHtPYnNlcnZhYmxlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5cbmV4cG9ydCBjbGFzcyBEeW5hbWljQ2hhbmdlRGV0ZWN0b3IgZXh0ZW5kcyBBYnN0cmFjdENoYW5nZURldGVjdG9yPGFueT4ge1xuICB2YWx1ZXM6IGFueVtdO1xuICBjaGFuZ2VzOiBhbnlbXTtcbiAgbG9jYWxQaXBlczogYW55W107XG4gIHByZXZDb250ZXh0czogYW55W107XG5cbiAgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgbnVtYmVyT2ZQcm9wZXJ0eVByb3RvUmVjb3JkczogbnVtYmVyLFxuICAgICAgICAgICAgICBwcm9wZXJ0eUJpbmRpbmdUYXJnZXRzOiBCaW5kaW5nVGFyZ2V0W10sIGRpcmVjdGl2ZUluZGljZXM6IERpcmVjdGl2ZUluZGV4W10sXG4gICAgICAgICAgICAgIHN0cmF0ZWd5OiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgcHJpdmF0ZSBfcmVjb3JkczogUHJvdG9SZWNvcmRbXSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfZXZlbnRCaW5kaW5nczogRXZlbnRCaW5kaW5nW10sIHByaXZhdGUgX2RpcmVjdGl2ZVJlY29yZHM6IERpcmVjdGl2ZVJlY29yZFtdLFxuICAgICAgICAgICAgICBwcml2YXRlIF9nZW5Db25maWc6IENoYW5nZURldGVjdG9yR2VuQ29uZmlnKSB7XG4gICAgc3VwZXIoaWQsIG51bWJlck9mUHJvcGVydHlQcm90b1JlY29yZHMsIHByb3BlcnR5QmluZGluZ1RhcmdldHMsIGRpcmVjdGl2ZUluZGljZXMsIHN0cmF0ZWd5KTtcbiAgICB2YXIgbGVuID0gX3JlY29yZHMubGVuZ3RoICsgMTtcbiAgICB0aGlzLnZhbHVlcyA9IExpc3RXcmFwcGVyLmNyZWF0ZUZpeGVkU2l6ZShsZW4pO1xuICAgIHRoaXMubG9jYWxQaXBlcyA9IExpc3RXcmFwcGVyLmNyZWF0ZUZpeGVkU2l6ZShsZW4pO1xuICAgIHRoaXMucHJldkNvbnRleHRzID0gTGlzdFdyYXBwZXIuY3JlYXRlRml4ZWRTaXplKGxlbik7XG4gICAgdGhpcy5jaGFuZ2VzID0gTGlzdFdyYXBwZXIuY3JlYXRlRml4ZWRTaXplKGxlbik7XG5cbiAgICB0aGlzLmRlaHlkcmF0ZURpcmVjdGl2ZXMoZmFsc2UpO1xuICB9XG5cbiAgaGFuZGxlRXZlbnRJbnRlcm5hbChldmVudE5hbWU6IHN0cmluZywgZWxJbmRleDogbnVtYmVyLCBsb2NhbHM6IExvY2Fscyk6IGJvb2xlYW4ge1xuICAgIHZhciBwcmV2ZW50RGVmYXVsdCA9IGZhbHNlO1xuXG4gICAgdGhpcy5fbWF0Y2hpbmdFdmVudEJpbmRpbmdzKGV2ZW50TmFtZSwgZWxJbmRleClcbiAgICAgICAgLmZvckVhY2gocmVjID0+IHtcbiAgICAgICAgICB2YXIgcmVzID0gdGhpcy5fcHJvY2Vzc0V2ZW50QmluZGluZyhyZWMsIGxvY2Fscyk7XG4gICAgICAgICAgaWYgKHJlcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHByZXZlbnREZWZhdWx0ID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcHJvY2Vzc0V2ZW50QmluZGluZyhlYjogRXZlbnRCaW5kaW5nLCBsb2NhbHM6IExvY2Fscyk6IGFueSB7XG4gICAgdmFyIHZhbHVlcyA9IExpc3RXcmFwcGVyLmNyZWF0ZUZpeGVkU2l6ZShlYi5yZWNvcmRzLmxlbmd0aCk7XG4gICAgdmFsdWVzWzBdID0gdGhpcy52YWx1ZXNbMF07XG5cbiAgICBmb3IgKHZhciBwcm90b0lkeCA9IDA7IHByb3RvSWR4IDwgZWIucmVjb3Jkcy5sZW5ndGg7ICsrcHJvdG9JZHgpIHtcbiAgICAgIHZhciBwcm90byA9IGViLnJlY29yZHNbcHJvdG9JZHhdO1xuXG4gICAgICBpZiAocHJvdG8uaXNTa2lwUmVjb3JkKCkpIHtcbiAgICAgICAgcHJvdG9JZHggKz0gdGhpcy5fY29tcHV0ZVNraXBMZW5ndGgocHJvdG9JZHgsIHByb3RvLCB2YWx1ZXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHByb3RvLmxhc3RJbkJpbmRpbmcpIHtcbiAgICAgICAgICB0aGlzLl9tYXJrUGF0aEFzQ2hlY2tPbmNlKHByb3RvKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzID0gdGhpcy5fY2FsY3VsYXRlQ3VyclZhbHVlKHByb3RvLCB2YWx1ZXMsIGxvY2Fscyk7XG4gICAgICAgIGlmIChwcm90by5sYXN0SW5CaW5kaW5nKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl93cml0ZVNlbGYocHJvdG8sIHJlcywgdmFsdWVzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFwiQ2Fubm90IGJlIHJlYWNoZWRcIik7XG4gIH1cblxuICBwcml2YXRlIF9jb21wdXRlU2tpcExlbmd0aChwcm90b0luZGV4OiBudW1iZXIsIHByb3RvOiBQcm90b1JlY29yZCwgdmFsdWVzOiBhbnlbXSk6IG51bWJlciB7XG4gICAgaWYgKHByb3RvLm1vZGUgPT09IFJlY29yZFR5cGUuU2tpcFJlY29yZHMpIHtcbiAgICAgIHJldHVybiBwcm90by5maXhlZEFyZ3NbMF0gLSBwcm90b0luZGV4IC0gMTtcbiAgICB9XG5cbiAgICBpZiAocHJvdG8ubW9kZSA9PT0gUmVjb3JkVHlwZS5Ta2lwUmVjb3Jkc0lmKSB7XG4gICAgICBsZXQgY29uZGl0aW9uID0gdGhpcy5fcmVhZENvbnRleHQocHJvdG8sIHZhbHVlcyk7XG4gICAgICByZXR1cm4gY29uZGl0aW9uID8gcHJvdG8uZml4ZWRBcmdzWzBdIC0gcHJvdG9JbmRleCAtIDEgOiAwO1xuICAgIH1cblxuICAgIGlmIChwcm90by5tb2RlID09PSBSZWNvcmRUeXBlLlNraXBSZWNvcmRzSWZOb3QpIHtcbiAgICAgIGxldCBjb25kaXRpb24gPSB0aGlzLl9yZWFkQ29udGV4dChwcm90bywgdmFsdWVzKTtcbiAgICAgIHJldHVybiBjb25kaXRpb24gPyAwIDogcHJvdG8uZml4ZWRBcmdzWzBdIC0gcHJvdG9JbmRleCAtIDE7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXCJDYW5ub3QgYmUgcmVhY2hlZFwiKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX21hcmtQYXRoQXNDaGVja09uY2UocHJvdG86IFByb3RvUmVjb3JkKTogdm9pZCB7XG4gICAgaWYgKCFwcm90by5iaW5kaW5nUmVjb3JkLmlzRGVmYXVsdENoYW5nZURldGVjdGlvbigpKSB7XG4gICAgICB2YXIgZGlyID0gcHJvdG8uYmluZGluZ1JlY29yZC5kaXJlY3RpdmVSZWNvcmQ7XG4gICAgICB0aGlzLl9nZXREZXRlY3RvckZvcihkaXIuZGlyZWN0aXZlSW5kZXgpLm1hcmtQYXRoVG9Sb290QXNDaGVja09uY2UoKTtcbiAgICB9XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9tYXRjaGluZ0V2ZW50QmluZGluZ3MoZXZlbnROYW1lOiBzdHJpbmcsIGVsSW5kZXg6IG51bWJlcik6IEV2ZW50QmluZGluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fZXZlbnRCaW5kaW5ncy5maWx0ZXIoZWIgPT4gZWIuZXZlbnROYW1lID09IGV2ZW50TmFtZSAmJiBlYi5lbEluZGV4ID09PSBlbEluZGV4KTtcbiAgfVxuXG4gIGh5ZHJhdGVEaXJlY3RpdmVzKGRpc3BhdGNoZXI6IENoYW5nZURpc3BhdGNoZXIpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlc1swXSA9IHRoaXMuY29udGV4dDtcbiAgICB0aGlzLmRpc3BhdGNoZXIgPSBkaXNwYXRjaGVyO1xuXG4gICAgdGhpcy5vdXRwdXRTdWJzY3JpcHRpb25zID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9kaXJlY3RpdmVSZWNvcmRzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIgciA9IHRoaXMuX2RpcmVjdGl2ZVJlY29yZHNbaV07XG4gICAgICBpZiAoaXNQcmVzZW50KHIub3V0cHV0cykpIHtcbiAgICAgICAgci5vdXRwdXRzLmZvckVhY2gob3V0cHV0ID0+IHtcbiAgICAgICAgICB2YXIgZXZlbnRIYW5kbGVyID1cbiAgICAgICAgICAgICAgPGFueT50aGlzLl9jcmVhdGVFdmVudEhhbmRsZXIoci5kaXJlY3RpdmVJbmRleC5lbGVtZW50SW5kZXgsIG91dHB1dFsxXSk7XG4gICAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IHRoaXMuX2dldERpcmVjdGl2ZUZvcihyLmRpcmVjdGl2ZUluZGV4KTtcbiAgICAgICAgICB2YXIgZ2V0dGVyID0gcmVmbGVjdG9yLmdldHRlcihvdXRwdXRbMF0pO1xuICAgICAgICAgIHRoaXMub3V0cHV0U3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgICAgICAgICBPYnNlcnZhYmxlV3JhcHBlci5zdWJzY3JpYmUoZ2V0dGVyKGRpcmVjdGl2ZSksIGV2ZW50SGFuZGxlcikpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVFdmVudEhhbmRsZXIoYm91bmRFbGVtZW50SW5kZXg6IG51bWJlciwgZXZlbnROYW1lOiBzdHJpbmcpOiBGdW5jdGlvbiB7XG4gICAgcmV0dXJuIChldmVudCkgPT4gdGhpcy5oYW5kbGVFdmVudChldmVudE5hbWUsIGJvdW5kRWxlbWVudEluZGV4LCBldmVudCk7XG4gIH1cblxuXG4gIGRlaHlkcmF0ZURpcmVjdGl2ZXMoZGVzdHJveVBpcGVzOiBib29sZWFuKSB7XG4gICAgaWYgKGRlc3Ryb3lQaXBlcykge1xuICAgICAgdGhpcy5fZGVzdHJveVBpcGVzKCk7XG4gICAgICB0aGlzLl9kZXN0cm95RGlyZWN0aXZlcygpO1xuICAgIH1cbiAgICB0aGlzLnZhbHVlc1swXSA9IG51bGw7XG4gICAgTGlzdFdyYXBwZXIuZmlsbCh0aGlzLnZhbHVlcywgQ2hhbmdlRGV0ZWN0aW9uVXRpbC51bmluaXRpYWxpemVkLCAxKTtcbiAgICBMaXN0V3JhcHBlci5maWxsKHRoaXMuY2hhbmdlcywgZmFsc2UpO1xuICAgIExpc3RXcmFwcGVyLmZpbGwodGhpcy5sb2NhbFBpcGVzLCBudWxsKTtcbiAgICBMaXN0V3JhcHBlci5maWxsKHRoaXMucHJldkNvbnRleHRzLCBDaGFuZ2VEZXRlY3Rpb25VdGlsLnVuaW5pdGlhbGl6ZWQpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZGVzdHJveVBpcGVzKCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sb2NhbFBpcGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICBpZiAoaXNQcmVzZW50KHRoaXMubG9jYWxQaXBlc1tpXSkpIHtcbiAgICAgICAgQ2hhbmdlRGV0ZWN0aW9uVXRpbC5jYWxsUGlwZU9uRGVzdHJveSh0aGlzLmxvY2FsUGlwZXNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2Rlc3Ryb3lEaXJlY3RpdmVzKCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fZGlyZWN0aXZlUmVjb3Jkcy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIHJlY29yZCA9IHRoaXMuX2RpcmVjdGl2ZVJlY29yZHNbaV07XG4gICAgICBpZiAocmVjb3JkLmNhbGxPbkRlc3Ryb3kpIHtcbiAgICAgICAgdGhpcy5fZ2V0RGlyZWN0aXZlRm9yKHJlY29yZC5kaXJlY3RpdmVJbmRleCkubmdPbkRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjaGVja05vQ2hhbmdlcygpOiB2b2lkIHsgdGhpcy5ydW5EZXRlY3RDaGFuZ2VzKHRydWUpOyB9XG5cbiAgZGV0ZWN0Q2hhbmdlc0luUmVjb3Jkc0ludGVybmFsKHRocm93T25DaGFuZ2U6IGJvb2xlYW4pIHtcbiAgICB2YXIgcHJvdG9zID0gdGhpcy5fcmVjb3JkcztcblxuICAgIHZhciBjaGFuZ2VzID0gbnVsbDtcbiAgICB2YXIgaXNDaGFuZ2VkID0gZmFsc2U7XG4gICAgZm9yICh2YXIgcHJvdG9JZHggPSAwOyBwcm90b0lkeCA8IHByb3Rvcy5sZW5ndGg7ICsrcHJvdG9JZHgpIHtcbiAgICAgIHZhciBwcm90bzogUHJvdG9SZWNvcmQgPSBwcm90b3NbcHJvdG9JZHhdO1xuICAgICAgdmFyIGJpbmRpbmdSZWNvcmQgPSBwcm90by5iaW5kaW5nUmVjb3JkO1xuICAgICAgdmFyIGRpcmVjdGl2ZVJlY29yZCA9IGJpbmRpbmdSZWNvcmQuZGlyZWN0aXZlUmVjb3JkO1xuXG4gICAgICBpZiAodGhpcy5fZmlyc3RJbkJpbmRpbmcocHJvdG8pKSB7XG4gICAgICAgIHRoaXMucHJvcGVydHlCaW5kaW5nSW5kZXggPSBwcm90by5wcm9wZXJ0eUJpbmRpbmdJbmRleDtcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3RvLmlzTGlmZUN5Y2xlUmVjb3JkKCkpIHtcbiAgICAgICAgaWYgKHByb3RvLm5hbWUgPT09IFwiRG9DaGVja1wiICYmICF0aHJvd09uQ2hhbmdlKSB7XG4gICAgICAgICAgdGhpcy5fZ2V0RGlyZWN0aXZlRm9yKGRpcmVjdGl2ZVJlY29yZC5kaXJlY3RpdmVJbmRleCkubmdEb0NoZWNrKCk7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvdG8ubmFtZSA9PT0gXCJPbkluaXRcIiAmJiAhdGhyb3dPbkNoYW5nZSAmJlxuICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPT0gQ2hhbmdlRGV0ZWN0b3JTdGF0ZS5OZXZlckNoZWNrZWQpIHtcbiAgICAgICAgICB0aGlzLl9nZXREaXJlY3RpdmVGb3IoZGlyZWN0aXZlUmVjb3JkLmRpcmVjdGl2ZUluZGV4KS5uZ09uSW5pdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKHByb3RvLm5hbWUgPT09IFwiT25DaGFuZ2VzXCIgJiYgaXNQcmVzZW50KGNoYW5nZXMpICYmICF0aHJvd09uQ2hhbmdlKSB7XG4gICAgICAgICAgdGhpcy5fZ2V0RGlyZWN0aXZlRm9yKGRpcmVjdGl2ZVJlY29yZC5kaXJlY3RpdmVJbmRleCkubmdPbkNoYW5nZXMoY2hhbmdlcyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocHJvdG8uaXNTa2lwUmVjb3JkKCkpIHtcbiAgICAgICAgcHJvdG9JZHggKz0gdGhpcy5fY29tcHV0ZVNraXBMZW5ndGgocHJvdG9JZHgsIHByb3RvLCB0aGlzLnZhbHVlcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgY2hhbmdlID0gdGhpcy5fY2hlY2socHJvdG8sIHRocm93T25DaGFuZ2UsIHRoaXMudmFsdWVzLCB0aGlzLmxvY2Fscyk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoY2hhbmdlKSkge1xuICAgICAgICAgIHRoaXMuX3VwZGF0ZURpcmVjdGl2ZU9yRWxlbWVudChjaGFuZ2UsIGJpbmRpbmdSZWNvcmQpO1xuICAgICAgICAgIGlzQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgY2hhbmdlcyA9IHRoaXMuX2FkZENoYW5nZShiaW5kaW5nUmVjb3JkLCBjaGFuZ2UsIGNoYW5nZXMpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChwcm90by5sYXN0SW5EaXJlY3RpdmUpIHtcbiAgICAgICAgY2hhbmdlcyA9IG51bGw7XG4gICAgICAgIGlmIChpc0NoYW5nZWQgJiYgIWJpbmRpbmdSZWNvcmQuaXNEZWZhdWx0Q2hhbmdlRGV0ZWN0aW9uKCkpIHtcbiAgICAgICAgICB0aGlzLl9nZXREZXRlY3RvckZvcihkaXJlY3RpdmVSZWNvcmQuZGlyZWN0aXZlSW5kZXgpLm1hcmtBc0NoZWNrT25jZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaXNDaGFuZ2VkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZmlyc3RJbkJpbmRpbmcocjogUHJvdG9SZWNvcmQpOiBib29sZWFuIHtcbiAgICB2YXIgcHJldiA9IENoYW5nZURldGVjdGlvblV0aWwucHJvdG9CeUluZGV4KHRoaXMuX3JlY29yZHMsIHIuc2VsZkluZGV4IC0gMSk7XG4gICAgcmV0dXJuIGlzQmxhbmsocHJldikgfHwgcHJldi5iaW5kaW5nUmVjb3JkICE9PSByLmJpbmRpbmdSZWNvcmQ7XG4gIH1cblxuICBhZnRlckNvbnRlbnRMaWZlY3ljbGVDYWxsYmFja3NJbnRlcm5hbCgpIHtcbiAgICB2YXIgZGlycyA9IHRoaXMuX2RpcmVjdGl2ZVJlY29yZHM7XG4gICAgZm9yICh2YXIgaSA9IGRpcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgIHZhciBkaXIgPSBkaXJzW2ldO1xuICAgICAgaWYgKGRpci5jYWxsQWZ0ZXJDb250ZW50SW5pdCAmJiB0aGlzLnN0YXRlID09IENoYW5nZURldGVjdG9yU3RhdGUuTmV2ZXJDaGVja2VkKSB7XG4gICAgICAgIHRoaXMuX2dldERpcmVjdGl2ZUZvcihkaXIuZGlyZWN0aXZlSW5kZXgpLm5nQWZ0ZXJDb250ZW50SW5pdCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGlyLmNhbGxBZnRlckNvbnRlbnRDaGVja2VkKSB7XG4gICAgICAgIHRoaXMuX2dldERpcmVjdGl2ZUZvcihkaXIuZGlyZWN0aXZlSW5kZXgpLm5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFmdGVyVmlld0xpZmVjeWNsZUNhbGxiYWNrc0ludGVybmFsKCkge1xuICAgIHZhciBkaXJzID0gdGhpcy5fZGlyZWN0aXZlUmVjb3JkcztcbiAgICBmb3IgKHZhciBpID0gZGlycy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgdmFyIGRpciA9IGRpcnNbaV07XG4gICAgICBpZiAoZGlyLmNhbGxBZnRlclZpZXdJbml0ICYmIHRoaXMuc3RhdGUgPT0gQ2hhbmdlRGV0ZWN0b3JTdGF0ZS5OZXZlckNoZWNrZWQpIHtcbiAgICAgICAgdGhpcy5fZ2V0RGlyZWN0aXZlRm9yKGRpci5kaXJlY3RpdmVJbmRleCkubmdBZnRlclZpZXdJbml0KCk7XG4gICAgICB9XG4gICAgICBpZiAoZGlyLmNhbGxBZnRlclZpZXdDaGVja2VkKSB7XG4gICAgICAgIHRoaXMuX2dldERpcmVjdGl2ZUZvcihkaXIuZGlyZWN0aXZlSW5kZXgpLm5nQWZ0ZXJWaWV3Q2hlY2tlZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlRGlyZWN0aXZlT3JFbGVtZW50KGNoYW5nZSwgYmluZGluZ1JlY29yZCkge1xuICAgIGlmIChpc0JsYW5rKGJpbmRpbmdSZWNvcmQuZGlyZWN0aXZlUmVjb3JkKSkge1xuICAgICAgc3VwZXIubm90aWZ5RGlzcGF0Y2hlcihjaGFuZ2UuY3VycmVudFZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGRpcmVjdGl2ZUluZGV4ID0gYmluZGluZ1JlY29yZC5kaXJlY3RpdmVSZWNvcmQuZGlyZWN0aXZlSW5kZXg7XG4gICAgICBiaW5kaW5nUmVjb3JkLnNldHRlcih0aGlzLl9nZXREaXJlY3RpdmVGb3IoZGlyZWN0aXZlSW5kZXgpLCBjaGFuZ2UuY3VycmVudFZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZ2VuQ29uZmlnLmxvZ0JpbmRpbmdVcGRhdGUpIHtcbiAgICAgIHN1cGVyLmxvZ0JpbmRpbmdVcGRhdGUoY2hhbmdlLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIF9hZGRDaGFuZ2UoYmluZGluZ1JlY29yZDogQmluZGluZ1JlY29yZCwgY2hhbmdlLCBjaGFuZ2VzKSB7XG4gICAgaWYgKGJpbmRpbmdSZWNvcmQuY2FsbE9uQ2hhbmdlcygpKSB7XG4gICAgICByZXR1cm4gc3VwZXIuYWRkQ2hhbmdlKGNoYW5nZXMsIGNoYW5nZS5wcmV2aW91c1ZhbHVlLCBjaGFuZ2UuY3VycmVudFZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNoYW5nZXM7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIF9nZXREaXJlY3RpdmVGb3IoZGlyZWN0aXZlSW5kZXg6IERpcmVjdGl2ZUluZGV4KSB7XG4gICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hlci5nZXREaXJlY3RpdmVGb3IoZGlyZWN0aXZlSW5kZXgpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIF9nZXREZXRlY3RvckZvcihkaXJlY3RpdmVJbmRleDogRGlyZWN0aXZlSW5kZXgpIHtcbiAgICByZXR1cm4gdGhpcy5kaXNwYXRjaGVyLmdldERldGVjdG9yRm9yKGRpcmVjdGl2ZUluZGV4KTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJpdmF0ZSBfY2hlY2socHJvdG86IFByb3RvUmVjb3JkLCB0aHJvd09uQ2hhbmdlOiBib29sZWFuLCB2YWx1ZXM6IGFueVtdLFxuICAgICAgICAgICAgICAgICBsb2NhbHM6IExvY2Fscyk6IFNpbXBsZUNoYW5nZSB7XG4gICAgaWYgKHByb3RvLmlzUGlwZVJlY29yZCgpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcGlwZUNoZWNrKHByb3RvLCB0aHJvd09uQ2hhbmdlLCB2YWx1ZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVmZXJlbmNlQ2hlY2socHJvdG8sIHRocm93T25DaGFuZ2UsIHZhbHVlcywgbG9jYWxzKTtcbiAgICB9XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIHByaXZhdGUgX3JlZmVyZW5jZUNoZWNrKHByb3RvOiBQcm90b1JlY29yZCwgdGhyb3dPbkNoYW5nZTogYm9vbGVhbiwgdmFsdWVzOiBhbnlbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxzOiBMb2NhbHMpIHtcbiAgICBpZiAodGhpcy5fcHVyZUZ1bmNBbmRBcmdzRGlkTm90Q2hhbmdlKHByb3RvKSkge1xuICAgICAgdGhpcy5fc2V0Q2hhbmdlZChwcm90bywgZmFsc2UpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGN1cnJWYWx1ZSA9IHRoaXMuX2NhbGN1bGF0ZUN1cnJWYWx1ZShwcm90bywgdmFsdWVzLCBsb2NhbHMpO1xuXG4gICAgaWYgKHByb3RvLnNob3VsZEJlQ2hlY2tlZCgpKSB7XG4gICAgICB2YXIgcHJldlZhbHVlID0gdGhpcy5fcmVhZFNlbGYocHJvdG8sIHZhbHVlcyk7XG4gICAgICB2YXIgZGV0ZWN0ZWRDaGFuZ2UgPSB0aHJvd09uQ2hhbmdlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhQ2hhbmdlRGV0ZWN0aW9uVXRpbC5kZXZNb2RlRXF1YWwocHJldlZhbHVlLCBjdXJyVmFsdWUpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDaGFuZ2VEZXRlY3Rpb25VdGlsLmxvb3NlTm90SWRlbnRpY2FsKHByZXZWYWx1ZSwgY3VyclZhbHVlKTtcbiAgICAgIGlmIChkZXRlY3RlZENoYW5nZSkge1xuICAgICAgICBpZiAocHJvdG8ubGFzdEluQmluZGluZykge1xuICAgICAgICAgIHZhciBjaGFuZ2UgPSBDaGFuZ2VEZXRlY3Rpb25VdGlsLnNpbXBsZUNoYW5nZShwcmV2VmFsdWUsIGN1cnJWYWx1ZSk7XG4gICAgICAgICAgaWYgKHRocm93T25DaGFuZ2UpIHRoaXMudGhyb3dPbkNoYW5nZUVycm9yKHByZXZWYWx1ZSwgY3VyclZhbHVlKTtcblxuICAgICAgICAgIHRoaXMuX3dyaXRlU2VsZihwcm90bywgY3VyclZhbHVlLCB2YWx1ZXMpO1xuICAgICAgICAgIHRoaXMuX3NldENoYW5nZWQocHJvdG8sIHRydWUpO1xuICAgICAgICAgIHJldHVybiBjaGFuZ2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fd3JpdGVTZWxmKHByb3RvLCBjdXJyVmFsdWUsIHZhbHVlcyk7XG4gICAgICAgICAgdGhpcy5fc2V0Q2hhbmdlZChwcm90bywgdHJ1ZSk7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3NldENoYW5nZWQocHJvdG8sIGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fd3JpdGVTZWxmKHByb3RvLCBjdXJyVmFsdWUsIHZhbHVlcyk7XG4gICAgICB0aGlzLl9zZXRDaGFuZ2VkKHByb3RvLCB0cnVlKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NhbGN1bGF0ZUN1cnJWYWx1ZShwcm90bzogUHJvdG9SZWNvcmQsIHZhbHVlczogYW55W10sIGxvY2FsczogTG9jYWxzKSB7XG4gICAgc3dpdGNoIChwcm90by5tb2RlKSB7XG4gICAgICBjYXNlIFJlY29yZFR5cGUuU2VsZjpcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlYWRDb250ZXh0KHByb3RvLCB2YWx1ZXMpO1xuXG4gICAgICBjYXNlIFJlY29yZFR5cGUuQ29uc3Q6XG4gICAgICAgIHJldHVybiBwcm90by5mdW5jT3JWYWx1ZTtcblxuICAgICAgY2FzZSBSZWNvcmRUeXBlLlByb3BlcnR5UmVhZDpcbiAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLl9yZWFkQ29udGV4dChwcm90bywgdmFsdWVzKTtcbiAgICAgICAgcmV0dXJuIHByb3RvLmZ1bmNPclZhbHVlKGNvbnRleHQpO1xuXG4gICAgICBjYXNlIFJlY29yZFR5cGUuU2FmZVByb3BlcnR5OlxuICAgICAgICB2YXIgY29udGV4dCA9IHRoaXMuX3JlYWRDb250ZXh0KHByb3RvLCB2YWx1ZXMpO1xuICAgICAgICByZXR1cm4gaXNCbGFuayhjb250ZXh0KSA/IG51bGwgOiBwcm90by5mdW5jT3JWYWx1ZShjb250ZXh0KTtcblxuICAgICAgY2FzZSBSZWNvcmRUeXBlLlByb3BlcnR5V3JpdGU6XG4gICAgICAgIHZhciBjb250ZXh0ID0gdGhpcy5fcmVhZENvbnRleHQocHJvdG8sIHZhbHVlcyk7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuX3JlYWRBcmdzKHByb3RvLCB2YWx1ZXMpWzBdO1xuICAgICAgICBwcm90by5mdW5jT3JWYWx1ZShjb250ZXh0LCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcblxuICAgICAgY2FzZSBSZWNvcmRUeXBlLktleWVkV3JpdGU6XG4gICAgICAgIHZhciBjb250ZXh0ID0gdGhpcy5fcmVhZENvbnRleHQocHJvdG8sIHZhbHVlcyk7XG4gICAgICAgIHZhciBrZXkgPSB0aGlzLl9yZWFkQXJncyhwcm90bywgdmFsdWVzKVswXTtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5fcmVhZEFyZ3MocHJvdG8sIHZhbHVlcylbMV07XG4gICAgICAgIGNvbnRleHRba2V5XSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG5cbiAgICAgIGNhc2UgUmVjb3JkVHlwZS5Mb2NhbDpcbiAgICAgICAgcmV0dXJuIGxvY2Fscy5nZXQocHJvdG8ubmFtZSk7XG5cbiAgICAgIGNhc2UgUmVjb3JkVHlwZS5JbnZva2VNZXRob2Q6XG4gICAgICAgIHZhciBjb250ZXh0ID0gdGhpcy5fcmVhZENvbnRleHQocHJvdG8sIHZhbHVlcyk7XG4gICAgICAgIHZhciBhcmdzID0gdGhpcy5fcmVhZEFyZ3MocHJvdG8sIHZhbHVlcyk7XG4gICAgICAgIHJldHVybiBwcm90by5mdW5jT3JWYWx1ZShjb250ZXh0LCBhcmdzKTtcblxuICAgICAgY2FzZSBSZWNvcmRUeXBlLlNhZmVNZXRob2RJbnZva2U6XG4gICAgICAgIHZhciBjb250ZXh0ID0gdGhpcy5fcmVhZENvbnRleHQocHJvdG8sIHZhbHVlcyk7XG4gICAgICAgIGlmIChpc0JsYW5rKGNvbnRleHQpKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFyZ3MgPSB0aGlzLl9yZWFkQXJncyhwcm90bywgdmFsdWVzKTtcbiAgICAgICAgcmV0dXJuIHByb3RvLmZ1bmNPclZhbHVlKGNvbnRleHQsIGFyZ3MpO1xuXG4gICAgICBjYXNlIFJlY29yZFR5cGUuS2V5ZWRSZWFkOlxuICAgICAgICB2YXIgYXJnID0gdGhpcy5fcmVhZEFyZ3MocHJvdG8sIHZhbHVlcylbMF07XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWFkQ29udGV4dChwcm90bywgdmFsdWVzKVthcmddO1xuXG4gICAgICBjYXNlIFJlY29yZFR5cGUuQ2hhaW46XG4gICAgICAgIHZhciBhcmdzID0gdGhpcy5fcmVhZEFyZ3MocHJvdG8sIHZhbHVlcyk7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV07XG5cbiAgICAgIGNhc2UgUmVjb3JkVHlwZS5JbnZva2VDbG9zdXJlOlxuICAgICAgICByZXR1cm4gRnVuY3Rpb25XcmFwcGVyLmFwcGx5KHRoaXMuX3JlYWRDb250ZXh0KHByb3RvLCB2YWx1ZXMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlYWRBcmdzKHByb3RvLCB2YWx1ZXMpKTtcblxuICAgICAgY2FzZSBSZWNvcmRUeXBlLkludGVycG9sYXRlOlxuICAgICAgY2FzZSBSZWNvcmRUeXBlLlByaW1pdGl2ZU9wOlxuICAgICAgY2FzZSBSZWNvcmRUeXBlLkNvbGxlY3Rpb25MaXRlcmFsOlxuICAgICAgICByZXR1cm4gRnVuY3Rpb25XcmFwcGVyLmFwcGx5KHByb3RvLmZ1bmNPclZhbHVlLCB0aGlzLl9yZWFkQXJncyhwcm90bywgdmFsdWVzKSk7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBVbmtub3duIG9wZXJhdGlvbiAke3Byb3RvLm1vZGV9YCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcGlwZUNoZWNrKHByb3RvOiBQcm90b1JlY29yZCwgdGhyb3dPbkNoYW5nZTogYm9vbGVhbiwgdmFsdWVzOiBhbnlbXSkge1xuICAgIHZhciBjb250ZXh0ID0gdGhpcy5fcmVhZENvbnRleHQocHJvdG8sIHZhbHVlcyk7XG4gICAgdmFyIHNlbGVjdGVkUGlwZSA9IHRoaXMuX3BpcGVGb3IocHJvdG8sIGNvbnRleHQpO1xuICAgIGlmICghc2VsZWN0ZWRQaXBlLnB1cmUgfHwgdGhpcy5fYXJnc09yQ29udGV4dENoYW5nZWQocHJvdG8pKSB7XG4gICAgICB2YXIgYXJncyA9IHRoaXMuX3JlYWRBcmdzKHByb3RvLCB2YWx1ZXMpO1xuICAgICAgdmFyIGN1cnJWYWx1ZSA9IHNlbGVjdGVkUGlwZS5waXBlLnRyYW5zZm9ybShjb250ZXh0LCBhcmdzKTtcblxuICAgICAgaWYgKHByb3RvLnNob3VsZEJlQ2hlY2tlZCgpKSB7XG4gICAgICAgIHZhciBwcmV2VmFsdWUgPSB0aGlzLl9yZWFkU2VsZihwcm90bywgdmFsdWVzKTtcbiAgICAgICAgdmFyIGRldGVjdGVkQ2hhbmdlID0gdGhyb3dPbkNoYW5nZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhQ2hhbmdlRGV0ZWN0aW9uVXRpbC5kZXZNb2RlRXF1YWwocHJldlZhbHVlLCBjdXJyVmFsdWUpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENoYW5nZURldGVjdGlvblV0aWwubG9vc2VOb3RJZGVudGljYWwocHJldlZhbHVlLCBjdXJyVmFsdWUpO1xuICAgICAgICBpZiAoZGV0ZWN0ZWRDaGFuZ2UpIHtcbiAgICAgICAgICBjdXJyVmFsdWUgPSBDaGFuZ2VEZXRlY3Rpb25VdGlsLnVud3JhcFZhbHVlKGN1cnJWYWx1ZSk7XG5cbiAgICAgICAgICBpZiAocHJvdG8ubGFzdEluQmluZGluZykge1xuICAgICAgICAgICAgdmFyIGNoYW5nZSA9IENoYW5nZURldGVjdGlvblV0aWwuc2ltcGxlQ2hhbmdlKHByZXZWYWx1ZSwgY3VyclZhbHVlKTtcbiAgICAgICAgICAgIGlmICh0aHJvd09uQ2hhbmdlKSB0aGlzLnRocm93T25DaGFuZ2VFcnJvcihwcmV2VmFsdWUsIGN1cnJWYWx1ZSk7XG5cbiAgICAgICAgICAgIHRoaXMuX3dyaXRlU2VsZihwcm90bywgY3VyclZhbHVlLCB2YWx1ZXMpO1xuICAgICAgICAgICAgdGhpcy5fc2V0Q2hhbmdlZChwcm90bywgdHJ1ZSk7XG5cbiAgICAgICAgICAgIHJldHVybiBjaGFuZ2U7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fd3JpdGVTZWxmKHByb3RvLCBjdXJyVmFsdWUsIHZhbHVlcyk7XG4gICAgICAgICAgICB0aGlzLl9zZXRDaGFuZ2VkKHByb3RvLCB0cnVlKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9zZXRDaGFuZ2VkKHByb3RvLCBmYWxzZSk7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3dyaXRlU2VsZihwcm90bywgY3VyclZhbHVlLCB2YWx1ZXMpO1xuICAgICAgICB0aGlzLl9zZXRDaGFuZ2VkKHByb3RvLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcGlwZUZvcihwcm90bzogUHJvdG9SZWNvcmQsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RvcmVkUGlwZSA9IHRoaXMuX3JlYWRQaXBlKHByb3RvKTtcbiAgICBpZiAoaXNQcmVzZW50KHN0b3JlZFBpcGUpKSByZXR1cm4gc3RvcmVkUGlwZTtcblxuICAgIHZhciBwaXBlID0gdGhpcy5waXBlcy5nZXQocHJvdG8ubmFtZSk7XG4gICAgdGhpcy5fd3JpdGVQaXBlKHByb3RvLCBwaXBlKTtcbiAgICByZXR1cm4gcGlwZTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlYWRDb250ZXh0KHByb3RvOiBQcm90b1JlY29yZCwgdmFsdWVzOiBhbnlbXSkge1xuICAgIGlmIChwcm90by5jb250ZXh0SW5kZXggPT0gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzLl9nZXREaXJlY3RpdmVGb3IocHJvdG8uZGlyZWN0aXZlSW5kZXgpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWVzW3Byb3RvLmNvbnRleHRJbmRleF07XG4gIH1cblxuICBwcml2YXRlIF9yZWFkU2VsZihwcm90bzogUHJvdG9SZWNvcmQsIHZhbHVlczogYW55W10pIHsgcmV0dXJuIHZhbHVlc1twcm90by5zZWxmSW5kZXhdOyB9XG5cbiAgcHJpdmF0ZSBfd3JpdGVTZWxmKHByb3RvOiBQcm90b1JlY29yZCwgdmFsdWUsIHZhbHVlczogYW55W10pIHsgdmFsdWVzW3Byb3RvLnNlbGZJbmRleF0gPSB2YWx1ZTsgfVxuXG4gIHByaXZhdGUgX3JlYWRQaXBlKHByb3RvOiBQcm90b1JlY29yZCkgeyByZXR1cm4gdGhpcy5sb2NhbFBpcGVzW3Byb3RvLnNlbGZJbmRleF07IH1cblxuICBwcml2YXRlIF93cml0ZVBpcGUocHJvdG86IFByb3RvUmVjb3JkLCB2YWx1ZSkgeyB0aGlzLmxvY2FsUGlwZXNbcHJvdG8uc2VsZkluZGV4XSA9IHZhbHVlOyB9XG5cbiAgcHJpdmF0ZSBfc2V0Q2hhbmdlZChwcm90bzogUHJvdG9SZWNvcmQsIHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKHByb3RvLmFyZ3VtZW50VG9QdXJlRnVuY3Rpb24pIHRoaXMuY2hhbmdlc1twcm90by5zZWxmSW5kZXhdID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF9wdXJlRnVuY0FuZEFyZ3NEaWROb3RDaGFuZ2UocHJvdG86IFByb3RvUmVjb3JkKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHByb3RvLmlzUHVyZUZ1bmN0aW9uKCkgJiYgIXRoaXMuX2FyZ3NDaGFuZ2VkKHByb3RvKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FyZ3NDaGFuZ2VkKHByb3RvOiBQcm90b1JlY29yZCk6IGJvb2xlYW4ge1xuICAgIHZhciBhcmdzID0gcHJvdG8uYXJncztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICAgIGlmICh0aGlzLmNoYW5nZXNbYXJnc1tpXV0pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgX2FyZ3NPckNvbnRleHRDaGFuZ2VkKHByb3RvOiBQcm90b1JlY29yZCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9hcmdzQ2hhbmdlZChwcm90bykgfHwgdGhpcy5jaGFuZ2VzW3Byb3RvLmNvbnRleHRJbmRleF07XG4gIH1cblxuICBwcml2YXRlIF9yZWFkQXJncyhwcm90bzogUHJvdG9SZWNvcmQsIHZhbHVlczogYW55W10pIHtcbiAgICB2YXIgcmVzID0gTGlzdFdyYXBwZXIuY3JlYXRlRml4ZWRTaXplKHByb3RvLmFyZ3MubGVuZ3RoKTtcbiAgICB2YXIgYXJncyA9IHByb3RvLmFyZ3M7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgKytpKSB7XG4gICAgICByZXNbaV0gPSB2YWx1ZXNbYXJnc1tpXV07XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
