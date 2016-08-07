System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/collection', './abstract_change_detector', './change_detection_util', './proto_record', './codegen_name_util', './codegen_logic_util', './codegen_facade', './constants', './proto_change_detector'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, exceptions_1, collection_1, abstract_change_detector_1, change_detection_util_1, proto_record_1, codegen_name_util_1, codegen_logic_util_1, codegen_facade_1, constants_1, proto_change_detector_1;
    var IS_CHANGED_LOCAL, CHANGES_LOCAL, ChangeDetectorJITGenerator;
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
            function (proto_record_1_1) {
                proto_record_1 = proto_record_1_1;
            },
            function (codegen_name_util_1_1) {
                codegen_name_util_1 = codegen_name_util_1_1;
            },
            function (codegen_logic_util_1_1) {
                codegen_logic_util_1 = codegen_logic_util_1_1;
            },
            function (codegen_facade_1_1) {
                codegen_facade_1 = codegen_facade_1_1;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            },
            function (proto_change_detector_1_1) {
                proto_change_detector_1 = proto_change_detector_1_1;
            }],
        execute: function() {
            /**
             * The code generator takes a list of proto records and creates a function/class
             * that "emulates" what the developer would write by hand to implement the same
             * kind of behaviour.
             *
             * This code should be kept in sync with the Dart transformer's
             * `angular2.transform.template_compiler.change_detector_codegen` library. If you make updates
             * here, please make equivalent changes there.
            */
            IS_CHANGED_LOCAL = "isChanged";
            CHANGES_LOCAL = "changes";
            ChangeDetectorJITGenerator = (function () {
                function ChangeDetectorJITGenerator(definition, changeDetectionUtilVarName, abstractChangeDetectorVarName, changeDetectorStateVarName) {
                    this.changeDetectionUtilVarName = changeDetectionUtilVarName;
                    this.abstractChangeDetectorVarName = abstractChangeDetectorVarName;
                    this.changeDetectorStateVarName = changeDetectorStateVarName;
                    var propertyBindingRecords = proto_change_detector_1.createPropertyRecords(definition);
                    var eventBindingRecords = proto_change_detector_1.createEventRecords(definition);
                    var propertyBindingTargets = definition.bindingRecords.map(function (b) { return b.target; });
                    this.id = definition.id;
                    this.changeDetectionStrategy = definition.strategy;
                    this.genConfig = definition.genConfig;
                    this.records = propertyBindingRecords;
                    this.propertyBindingTargets = propertyBindingTargets;
                    this.eventBindings = eventBindingRecords;
                    this.directiveRecords = definition.directiveRecords;
                    this._names = new codegen_name_util_1.CodegenNameUtil(this.records, this.eventBindings, this.directiveRecords, this.changeDetectionUtilVarName);
                    this._logic = new codegen_logic_util_1.CodegenLogicUtil(this._names, this.changeDetectionUtilVarName, this.changeDetectorStateVarName);
                    this.typeName = codegen_name_util_1.sanitizeName("ChangeDetector_" + this.id);
                }
                ChangeDetectorJITGenerator.prototype.generate = function () {
                    var factorySource = "\n      " + this.generateSource() + "\n      return function() {\n        return new " + this.typeName + "();\n      }\n    ";
                    return new Function(this.abstractChangeDetectorVarName, this.changeDetectionUtilVarName, this.changeDetectorStateVarName, factorySource)(abstract_change_detector_1.AbstractChangeDetector, change_detection_util_1.ChangeDetectionUtil, constants_1.ChangeDetectorState);
                };
                ChangeDetectorJITGenerator.prototype.generateSource = function () {
                    return "\n      var " + this.typeName + " = function " + this.typeName + "() {\n        " + this.abstractChangeDetectorVarName + ".call(\n            this, " + JSON.stringify(this.id) + ", " + this.records.length + ",\n            " + this.typeName + ".gen_propertyBindingTargets, " + this.typeName + ".gen_directiveIndices,\n            " + codegen_facade_1.codify(this.changeDetectionStrategy) + ");\n        this.dehydrateDirectives(false);\n      }\n\n      " + this.typeName + ".prototype = Object.create(" + this.abstractChangeDetectorVarName + ".prototype);\n\n      " + this.typeName + ".prototype.detectChangesInRecordsInternal = function(throwOnChange) {\n        " + this._names.genInitLocals() + "\n        var " + IS_CHANGED_LOCAL + " = false;\n        var " + CHANGES_LOCAL + " = null;\n\n        " + this._genAllRecords(this.records) + "\n      }\n\n      " + this._maybeGenHandleEventInternal() + "\n\n      " + this._maybeGenAfterContentLifecycleCallbacks() + "\n\n      " + this._maybeGenAfterViewLifecycleCallbacks() + "\n\n      " + this._maybeGenHydrateDirectives() + "\n\n      " + this._maybeGenDehydrateDirectives() + "\n\n      " + this._genPropertyBindingTargets() + "\n\n      " + this._genDirectiveIndices() + "\n    ";
                };
                /** @internal */
                ChangeDetectorJITGenerator.prototype._genPropertyBindingTargets = function () {
                    var targets = this._logic.genPropertyBindingTargets(this.propertyBindingTargets, this.genConfig.genDebugInfo);
                    return this.typeName + ".gen_propertyBindingTargets = " + targets + ";";
                };
                /** @internal */
                ChangeDetectorJITGenerator.prototype._genDirectiveIndices = function () {
                    var indices = this._logic.genDirectiveIndices(this.directiveRecords);
                    return this.typeName + ".gen_directiveIndices = " + indices + ";";
                };
                /** @internal */
                ChangeDetectorJITGenerator.prototype._maybeGenHandleEventInternal = function () {
                    var _this = this;
                    if (this.eventBindings.length > 0) {
                        var handlers = this.eventBindings.map(function (eb) { return _this._genEventBinding(eb); }).join("\n");
                        return "\n        " + this.typeName + ".prototype.handleEventInternal = function(eventName, elIndex, locals) {\n          var " + this._names.getPreventDefaultAccesor() + " = false;\n          " + this._names.genInitEventLocals() + "\n          " + handlers + "\n          return " + this._names.getPreventDefaultAccesor() + ";\n        }\n      ";
                    }
                    else {
                        return '';
                    }
                };
                /** @internal */
                ChangeDetectorJITGenerator.prototype._genEventBinding = function (eb) {
                    var _this = this;
                    var codes = [];
                    this._endOfBlockIdxs = [];
                    collection_1.ListWrapper.forEachWithIndex(eb.records, function (r, i) {
                        var code;
                        if (r.isConditionalSkipRecord()) {
                            code = _this._genConditionalSkip(r, _this._names.getEventLocalName(eb, i));
                        }
                        else if (r.isUnconditionalSkipRecord()) {
                            code = _this._genUnconditionalSkip(r);
                        }
                        else {
                            code = _this._genEventBindingEval(eb, r);
                        }
                        code += _this._genEndOfSkipBlock(i);
                        codes.push(code);
                    });
                    return "\n    if (eventName === \"" + eb.eventName + "\" && elIndex === " + eb.elIndex + ") {\n      " + codes.join("\n") + "\n    }";
                };
                /** @internal */
                ChangeDetectorJITGenerator.prototype._genEventBindingEval = function (eb, r) {
                    if (r.lastInBinding) {
                        var evalRecord = this._logic.genEventBindingEvalValue(eb, r);
                        var markPath = this._genMarkPathToRootAsCheckOnce(r);
                        var prevDefault = this._genUpdatePreventDefault(eb, r);
                        return markPath + "\n" + evalRecord + "\n" + prevDefault;
                    }
                    else {
                        return this._logic.genEventBindingEvalValue(eb, r);
                    }
                };
                /** @internal */
                ChangeDetectorJITGenerator.prototype._genMarkPathToRootAsCheckOnce = function (r) {
                    var br = r.bindingRecord;
                    if (br.isDefaultChangeDetection()) {
                        return "";
                    }
                    else {
                        return this._names.getDetectorName(br.directiveRecord.directiveIndex) + ".markPathToRootAsCheckOnce();";
                    }
                };
                /** @internal */
                ChangeDetectorJITGenerator.prototype._genUpdatePreventDefault = function (eb, r) {
                    var local = this._names.getEventLocalName(eb, r.selfIndex);
                    return "if (" + local + " === false) { " + this._names.getPreventDefaultAccesor() + " = true};";
                };
                /** @internal */
                ChangeDetectorJITGenerator.prototype._maybeGenDehydrateDirectives = function () {
                    var destroyPipesCode = this._names.genPipeOnDestroy();
                    var destroyDirectivesCode = this._logic.genDirectivesOnDestroy(this.directiveRecords);
                    var dehydrateFieldsCode = this._names.genDehydrateFields();
                    if (!destroyPipesCode && !destroyDirectivesCode && !dehydrateFieldsCode)
                        return '';
                    return this.typeName + ".prototype.dehydrateDirectives = function(destroyPipes) {\n        if (destroyPipes) {\n          " + destroyPipesCode + "\n          " + destroyDirectivesCode + "\n        }\n        " + dehydrateFieldsCode + "\n    }";
                };
                /** @internal */
                ChangeDetectorJITGenerator.prototype._maybeGenHydrateDirectives = function () {
                    var hydrateDirectivesCode = this._logic.genHydrateDirectives(this.directiveRecords);
                    var hydrateDetectorsCode = this._logic.genHydrateDetectors(this.directiveRecords);
                    if (!hydrateDirectivesCode && !hydrateDetectorsCode)
                        return '';
                    return this.typeName + ".prototype.hydrateDirectives = function(directives) {\n      " + hydrateDirectivesCode + "\n      " + hydrateDetectorsCode + "\n    }";
                };
                /** @internal */
                ChangeDetectorJITGenerator.prototype._maybeGenAfterContentLifecycleCallbacks = function () {
                    var notifications = this._logic.genContentLifecycleCallbacks(this.directiveRecords);
                    if (notifications.length > 0) {
                        var directiveNotifications = notifications.join("\n");
                        return "\n        " + this.typeName + ".prototype.afterContentLifecycleCallbacksInternal = function() {\n          " + directiveNotifications + "\n        }\n      ";
                    }
                    else {
                        return '';
                    }
                };
                /** @internal */
                ChangeDetectorJITGenerator.prototype._maybeGenAfterViewLifecycleCallbacks = function () {
                    var notifications = this._logic.genViewLifecycleCallbacks(this.directiveRecords);
                    if (notifications.length > 0) {
                        var directiveNotifications = notifications.join("\n");
                        return "\n        " + this.typeName + ".prototype.afterViewLifecycleCallbacksInternal = function() {\n          " + directiveNotifications + "\n        }\n      ";
                    }
                    else {
                        return '';
                    }
                };
                /** @internal */
                ChangeDetectorJITGenerator.prototype._genAllRecords = function (rs) {
                    var codes = [];
                    this._endOfBlockIdxs = [];
                    for (var i = 0; i < rs.length; i++) {
                        var code = void 0;
                        var r = rs[i];
                        if (r.isLifeCycleRecord()) {
                            code = this._genDirectiveLifecycle(r);
                        }
                        else if (r.isPipeRecord()) {
                            code = this._genPipeCheck(r);
                        }
                        else if (r.isConditionalSkipRecord()) {
                            code = this._genConditionalSkip(r, this._names.getLocalName(r.contextIndex));
                        }
                        else if (r.isUnconditionalSkipRecord()) {
                            code = this._genUnconditionalSkip(r);
                        }
                        else {
                            code = this._genReferenceCheck(r);
                        }
                        code = "\n        " + this._maybeFirstInBinding(r) + "\n        " + code + "\n        " + this._maybeGenLastInDirective(r) + "\n        " + this._genEndOfSkipBlock(i) + "\n      ";
                        codes.push(code);
                    }
                    return codes.join("\n");
                };
                /** @internal */
                ChangeDetectorJITGenerator.prototype._genConditionalSkip = function (r, condition) {
                    var maybeNegate = r.mode === proto_record_1.RecordType.SkipRecordsIf ? '!' : '';
                    this._endOfBlockIdxs.push(r.fixedArgs[0] - 1);
                    return "if (" + maybeNegate + condition + ") {";
                };
                /** @internal */
                ChangeDetectorJITGenerator.prototype._genUnconditionalSkip = function (r) {
                    this._endOfBlockIdxs.pop();
                    this._endOfBlockIdxs.push(r.fixedArgs[0] - 1);
                    return "} else {";
                };
                /** @internal */
                ChangeDetectorJITGenerator.prototype._genEndOfSkipBlock = function (protoIndex) {
                    if (!collection_1.ListWrapper.isEmpty(this._endOfBlockIdxs)) {
                        var endOfBlock = collection_1.ListWrapper.last(this._endOfBlockIdxs);
                        if (protoIndex === endOfBlock) {
                            this._endOfBlockIdxs.pop();
                            return '}';
                        }
                    }
                    return '';
                };
                /** @internal */
                ChangeDetectorJITGenerator.prototype._genDirectiveLifecycle = function (r) {
                    if (r.name === "DoCheck") {
                        return this._genOnCheck(r);
                    }
                    else if (r.name === "OnInit") {
                        return this._genOnInit(r);
                    }
                    else if (r.name === "OnChanges") {
                        return this._genOnChange(r);
                    }
                    else {
                        throw new exceptions_1.BaseException("Unknown lifecycle event '" + r.name + "'");
                    }
                };
                /** @internal */
                ChangeDetectorJITGenerator.prototype._genPipeCheck = function (r) {
                    var _this = this;
                    var context = this._names.getLocalName(r.contextIndex);
                    var argString = r.args.map(function (arg) { return _this._names.getLocalName(arg); }).join(", ");
                    var oldValue = this._names.getFieldName(r.selfIndex);
                    var newValue = this._names.getLocalName(r.selfIndex);
                    var pipe = this._names.getPipeName(r.selfIndex);
                    var pipeName = r.name;
                    var init = "\n      if (" + pipe + " === " + this.changeDetectionUtilVarName + ".uninitialized) {\n        " + pipe + " = " + this._names.getPipesAccessorName() + ".get('" + pipeName + "');\n      }\n    ";
                    var read = newValue + " = " + pipe + ".pipe.transform(" + context + ", [" + argString + "]);";
                    var contexOrArgCheck = r.args.map(function (a) { return _this._names.getChangeName(a); });
                    contexOrArgCheck.push(this._names.getChangeName(r.contextIndex));
                    var condition = "!" + pipe + ".pure || (" + contexOrArgCheck.join(" || ") + ")";
                    var check = "\n      " + this._genThrowOnChangeCheck(oldValue, newValue) + "\n      if (" + this.changeDetectionUtilVarName + ".looseNotIdentical(" + oldValue + ", " + newValue + ")) {\n        " + newValue + " = " + this.changeDetectionUtilVarName + ".unwrapValue(" + newValue + ")\n        " + this._genChangeMarker(r) + "\n        " + this._genUpdateDirectiveOrElement(r) + "\n        " + this._genAddToChanges(r) + "\n        " + oldValue + " = " + newValue + ";\n      }\n    ";
                    var genCode = r.shouldBeChecked() ? "" + read + check : read;
                    if (r.isUsedByOtherRecord()) {
                        return init + " if (" + condition + ") { " + genCode + " } else { " + newValue + " = " + oldValue + "; }";
                    }
                    else {
                        return init + " if (" + condition + ") { " + genCode + " }";
                    }
                };
                /** @internal */
                ChangeDetectorJITGenerator.prototype._genReferenceCheck = function (r) {
                    var _this = this;
                    var oldValue = this._names.getFieldName(r.selfIndex);
                    var newValue = this._names.getLocalName(r.selfIndex);
                    var read = "\n      " + this._logic.genPropertyBindingEvalValue(r) + "\n    ";
                    var check = "\n      " + this._genThrowOnChangeCheck(oldValue, newValue) + "\n      if (" + this.changeDetectionUtilVarName + ".looseNotIdentical(" + oldValue + ", " + newValue + ")) {\n        " + this._genChangeMarker(r) + "\n        " + this._genUpdateDirectiveOrElement(r) + "\n        " + this._genAddToChanges(r) + "\n        " + oldValue + " = " + newValue + ";\n      }\n    ";
                    var genCode = r.shouldBeChecked() ? "" + read + check : read;
                    if (r.isPureFunction()) {
                        var condition = r.args.map(function (a) { return _this._names.getChangeName(a); }).join(" || ");
                        if (r.isUsedByOtherRecord()) {
                            return "if (" + condition + ") { " + genCode + " } else { " + newValue + " = " + oldValue + "; }";
                        }
                        else {
                            return "if (" + condition + ") { " + genCode + " }";
                        }
                    }
                    else {
                        return genCode;
                    }
                };
                /** @internal */
                ChangeDetectorJITGenerator.prototype._genChangeMarker = function (r) {
                    return r.argumentToPureFunction ? this._names.getChangeName(r.selfIndex) + " = true" : "";
                };
                /** @internal */
                ChangeDetectorJITGenerator.prototype._genUpdateDirectiveOrElement = function (r) {
                    if (!r.lastInBinding)
                        return "";
                    var newValue = this._names.getLocalName(r.selfIndex);
                    var notifyDebug = this.genConfig.logBindingUpdate ? "this.logBindingUpdate(" + newValue + ");" : "";
                    var br = r.bindingRecord;
                    if (br.target.isDirective()) {
                        var directiveProperty = this._names.getDirectiveName(br.directiveRecord.directiveIndex) + "." + br.target.name;
                        return "\n        " + directiveProperty + " = " + newValue + ";\n        " + notifyDebug + "\n        " + IS_CHANGED_LOCAL + " = true;\n      ";
                    }
                    else {
                        return "\n        this.notifyDispatcher(" + newValue + ");\n        " + notifyDebug + "\n      ";
                    }
                };
                /** @internal */
                ChangeDetectorJITGenerator.prototype._genThrowOnChangeCheck = function (oldValue, newValue) {
                    if (lang_1.assertionsEnabled()) {
                        return "\n        if (throwOnChange && !" + this.changeDetectionUtilVarName + ".devModeEqual(" + oldValue + ", " + newValue + ")) {\n          this.throwOnChangeError(" + oldValue + ", " + newValue + ");\n        }\n        ";
                    }
                    else {
                        return '';
                    }
                };
                /** @internal */
                ChangeDetectorJITGenerator.prototype._genAddToChanges = function (r) {
                    var newValue = this._names.getLocalName(r.selfIndex);
                    var oldValue = this._names.getFieldName(r.selfIndex);
                    if (!r.bindingRecord.callOnChanges())
                        return "";
                    return CHANGES_LOCAL + " = this.addChange(" + CHANGES_LOCAL + ", " + oldValue + ", " + newValue + ");";
                };
                /** @internal */
                ChangeDetectorJITGenerator.prototype._maybeFirstInBinding = function (r) {
                    var prev = change_detection_util_1.ChangeDetectionUtil.protoByIndex(this.records, r.selfIndex - 1);
                    var firstInBinding = lang_1.isBlank(prev) || prev.bindingRecord !== r.bindingRecord;
                    return firstInBinding && !r.bindingRecord.isDirectiveLifecycle() ?
                        this._names.getPropertyBindingIndex() + " = " + r.propertyBindingIndex + ";" :
                        '';
                };
                /** @internal */
                ChangeDetectorJITGenerator.prototype._maybeGenLastInDirective = function (r) {
                    if (!r.lastInDirective)
                        return "";
                    return "\n      " + CHANGES_LOCAL + " = null;\n      " + this._genNotifyOnPushDetectors(r) + "\n      " + IS_CHANGED_LOCAL + " = false;\n    ";
                };
                /** @internal */
                ChangeDetectorJITGenerator.prototype._genOnCheck = function (r) {
                    var br = r.bindingRecord;
                    return "if (!throwOnChange) " + this._names.getDirectiveName(br.directiveRecord.directiveIndex) + ".ngDoCheck();";
                };
                /** @internal */
                ChangeDetectorJITGenerator.prototype._genOnInit = function (r) {
                    var br = r.bindingRecord;
                    return "if (!throwOnChange && " + this._names.getStateName() + " === " + this.changeDetectorStateVarName + ".NeverChecked) " + this._names.getDirectiveName(br.directiveRecord.directiveIndex) + ".ngOnInit();";
                };
                /** @internal */
                ChangeDetectorJITGenerator.prototype._genOnChange = function (r) {
                    var br = r.bindingRecord;
                    return "if (!throwOnChange && " + CHANGES_LOCAL + ") " + this._names.getDirectiveName(br.directiveRecord.directiveIndex) + ".ngOnChanges(" + CHANGES_LOCAL + ");";
                };
                /** @internal */
                ChangeDetectorJITGenerator.prototype._genNotifyOnPushDetectors = function (r) {
                    var br = r.bindingRecord;
                    if (!r.lastInDirective || br.isDefaultChangeDetection())
                        return "";
                    var retVal = "\n      if(" + IS_CHANGED_LOCAL + ") {\n        " + this._names.getDetectorName(br.directiveRecord.directiveIndex) + ".markAsCheckOnce();\n      }\n    ";
                    return retVal;
                };
                return ChangeDetectorJITGenerator;
            }());
            exports_1("ChangeDetectorJITGenerator", ChangeDetectorJITGenerator);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0aW9uX2ppdF9nZW5lcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQTJCTSxnQkFBZ0IsRUFDaEIsYUFBYTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQVZuQjs7Ozs7Ozs7Y0FRRTtZQUNJLGdCQUFnQixHQUFHLFdBQVcsQ0FBQztZQUMvQixhQUFhLEdBQUcsU0FBUyxDQUFDO1lBRWhDO2dCQWFFLG9DQUFZLFVBQW9DLEVBQVUsMEJBQWtDLEVBQ3hFLDZCQUFxQyxFQUNyQywwQkFBa0M7b0JBRkksK0JBQTBCLEdBQTFCLDBCQUEwQixDQUFRO29CQUN4RSxrQ0FBNkIsR0FBN0IsNkJBQTZCLENBQVE7b0JBQ3JDLCtCQUEwQixHQUExQiwwQkFBMEIsQ0FBUTtvQkFDcEQsSUFBSSxzQkFBc0IsR0FBRyw2Q0FBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDL0QsSUFBSSxtQkFBbUIsR0FBRywwQ0FBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDekQsSUFBSSxzQkFBc0IsR0FBRyxVQUFVLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLEVBQVIsQ0FBUSxDQUFDLENBQUM7b0JBQzFFLElBQUksQ0FBQyxFQUFFLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQztvQkFDeEIsSUFBSSxDQUFDLHVCQUF1QixHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7b0JBQ25ELElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQztvQkFFdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztvQkFDdEMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLHNCQUFzQixDQUFDO29CQUNyRCxJQUFJLENBQUMsYUFBYSxHQUFHLG1CQUFtQixDQUFDO29CQUN6QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDO29CQUNwRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksbUNBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUN2RCxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztvQkFDbkUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLHFDQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLDBCQUEwQixFQUM1QyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztvQkFDcEUsSUFBSSxDQUFDLFFBQVEsR0FBRyxnQ0FBWSxDQUFDLG9CQUFrQixJQUFJLENBQUMsRUFBSSxDQUFDLENBQUM7Z0JBQzVELENBQUM7Z0JBRUQsNkNBQVEsR0FBUjtvQkFDRSxJQUFJLGFBQWEsR0FBRyxhQUNoQixJQUFJLENBQUMsY0FBYyxFQUFFLHdEQUVSLElBQUksQ0FBQyxRQUFRLHVCQUU3QixDQUFDO29CQUNGLE1BQU0sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsSUFBSSxDQUFDLDBCQUEwQixFQUNuRSxJQUFJLENBQUMsMEJBQTBCLEVBQUUsYUFBYSxDQUFDLENBQy9ELGlEQUFzQixFQUFFLDJDQUFtQixFQUFFLCtCQUFtQixDQUFDLENBQUM7Z0JBQ3hFLENBQUM7Z0JBRUQsbURBQWMsR0FBZDtvQkFDRSxNQUFNLENBQUMsaUJBQ0MsSUFBSSxDQUFDLFFBQVEsb0JBQWUsSUFBSSxDQUFDLFFBQVEsc0JBQzNDLElBQUksQ0FBQyw2QkFBNkIsa0NBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSx1QkFDckQsSUFBSSxDQUFDLFFBQVEscUNBQWdDLElBQUksQ0FBQyxRQUFRLDRDQUMxRCx1QkFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyx1RUFJMUMsSUFBSSxDQUFDLFFBQVEsbUNBQThCLElBQUksQ0FBQyw2QkFBNkIsOEJBRTdFLElBQUksQ0FBQyxRQUFRLHVGQUNYLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLHNCQUN2QixnQkFBZ0IsK0JBQ2hCLGFBQWEsNEJBRWpCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQywyQkFHbkMsSUFBSSxDQUFDLDRCQUE0QixFQUFFLGtCQUVuQyxJQUFJLENBQUMsdUNBQXVDLEVBQUUsa0JBRTlDLElBQUksQ0FBQyxvQ0FBb0MsRUFBRSxrQkFFM0MsSUFBSSxDQUFDLDBCQUEwQixFQUFFLGtCQUVqQyxJQUFJLENBQUMsNEJBQTRCLEVBQUUsa0JBRW5DLElBQUksQ0FBQywwQkFBMEIsRUFBRSxrQkFFakMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLFdBQzlCLENBQUM7Z0JBQ0osQ0FBQztnQkFFRCxnQkFBZ0I7Z0JBQ2hCLCtEQUEwQixHQUExQjtvQkFDRSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDakYsTUFBTSxDQUFJLElBQUksQ0FBQyxRQUFRLHNDQUFpQyxPQUFPLE1BQUcsQ0FBQztnQkFDckUsQ0FBQztnQkFFRCxnQkFBZ0I7Z0JBQ2hCLHlEQUFvQixHQUFwQjtvQkFDRSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUNyRSxNQUFNLENBQUksSUFBSSxDQUFDLFFBQVEsZ0NBQTJCLE9BQU8sTUFBRyxDQUFDO2dCQUMvRCxDQUFDO2dCQUVELGdCQUFnQjtnQkFDaEIsaUVBQTRCLEdBQTVCO29CQUFBLGlCQWNDO29CQWJDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2xDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxFQUF6QixDQUF5QixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNsRixNQUFNLENBQUMsZUFDSCxJQUFJLENBQUMsUUFBUSwrRkFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLHdCQUF3QixFQUFFLDZCQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLG9CQUNoQyxRQUFRLDJCQUNELElBQUksQ0FBQyxNQUFNLENBQUMsd0JBQXdCLEVBQUUseUJBRWxELENBQUM7b0JBQ0osQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixNQUFNLENBQUMsRUFBRSxDQUFDO29CQUNaLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCxnQkFBZ0I7Z0JBQ2hCLHFEQUFnQixHQUFoQixVQUFpQixFQUFnQjtvQkFBakMsaUJBd0JDO29CQXZCQyxJQUFJLEtBQUssR0FBYSxFQUFFLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO29CQUUxQix3QkFBVyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFDLEVBQUUsQ0FBQzt3QkFDNUMsSUFBSSxJQUFJLENBQUM7d0JBRVQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUNoQyxJQUFJLEdBQUcsS0FBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsRUFBRSxLQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMzRSxDQUFDO3dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMseUJBQXlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQ3pDLElBQUksR0FBRyxLQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3ZDLENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ04sSUFBSSxHQUFHLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQzFDLENBQUM7d0JBRUQsSUFBSSxJQUFJLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFFbkMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbkIsQ0FBQyxDQUFDLENBQUM7b0JBRUgsTUFBTSxDQUFDLCtCQUNjLEVBQUUsQ0FBQyxTQUFTLDBCQUFvQixFQUFFLENBQUMsT0FBTyxtQkFDM0QsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFDbEIsQ0FBQztnQkFDTCxDQUFDO2dCQUVELGdCQUFnQjtnQkFDaEIseURBQW9CLEdBQXBCLFVBQXFCLEVBQWdCLEVBQUUsQ0FBYztvQkFDbkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7d0JBQ3BCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUM3RCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3JELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ3ZELE1BQU0sQ0FBSSxRQUFRLFVBQUssVUFBVSxVQUFLLFdBQWEsQ0FBQztvQkFDdEQsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3JELENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCxnQkFBZ0I7Z0JBQ2hCLGtFQUE2QixHQUE3QixVQUE4QixDQUFjO29CQUMxQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDO29CQUN6QixFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ2xDLE1BQU0sQ0FBQyxFQUFFLENBQUM7b0JBQ1osQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixNQUFNLENBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsa0NBQStCLENBQUM7b0JBQzFHLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCxnQkFBZ0I7Z0JBQ2hCLDZEQUF3QixHQUF4QixVQUF5QixFQUFnQixFQUFFLENBQWM7b0JBQ3ZELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDM0QsTUFBTSxDQUFDLFNBQU8sS0FBSyxzQkFBaUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRSxjQUFXLENBQUM7Z0JBQ3hGLENBQUM7Z0JBRUQsZ0JBQWdCO2dCQUNoQixpRUFBNEIsR0FBNUI7b0JBQ0UsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3RELElBQUkscUJBQXFCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFDdEYsSUFBSSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLENBQUM7b0JBQzNELEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxxQkFBcUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDO3dCQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7b0JBQ25GLE1BQU0sQ0FBSSxJQUFJLENBQUMsUUFBUSwwR0FFZixnQkFBZ0Isb0JBQ2hCLHFCQUFxQiw2QkFFdkIsbUJBQW1CLFlBQ3ZCLENBQUM7Z0JBQ0wsQ0FBQztnQkFFRCxnQkFBZ0I7Z0JBQ2hCLCtEQUEwQixHQUExQjtvQkFDRSxJQUFJLHFCQUFxQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7b0JBQ3BGLElBQUksb0JBQW9CLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFDbEYsRUFBRSxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsSUFBSSxDQUFDLG9CQUFvQixDQUFDO3dCQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7b0JBQy9ELE1BQU0sQ0FBSSxJQUFJLENBQUMsUUFBUSxxRUFDbkIscUJBQXFCLGdCQUNyQixvQkFBb0IsWUFDdEIsQ0FBQztnQkFDTCxDQUFDO2dCQUVELGdCQUFnQjtnQkFDaEIsNEVBQXVDLEdBQXZDO29CQUNFLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsNEJBQTRCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7b0JBQ3BGLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDN0IsSUFBSSxzQkFBc0IsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN0RCxNQUFNLENBQUMsZUFDSCxJQUFJLENBQUMsUUFBUSxvRkFDWCxzQkFBc0Isd0JBRTNCLENBQUM7b0JBQ0osQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixNQUFNLENBQUMsRUFBRSxDQUFDO29CQUNaLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCxnQkFBZ0I7Z0JBQ2hCLHlFQUFvQyxHQUFwQztvQkFDRSxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUNqRixFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzdCLElBQUksc0JBQXNCLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDdEQsTUFBTSxDQUFDLGVBQ0gsSUFBSSxDQUFDLFFBQVEsaUZBQ1gsc0JBQXNCLHdCQUUzQixDQUFDO29CQUNKLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sTUFBTSxDQUFDLEVBQUUsQ0FBQztvQkFDWixDQUFDO2dCQUNILENBQUM7Z0JBRUQsZ0JBQWdCO2dCQUNoQixtREFBYyxHQUFkLFVBQWUsRUFBaUI7b0JBQzlCLElBQUksS0FBSyxHQUFhLEVBQUUsQ0FBQztvQkFDekIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7b0JBRTFCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUNuQyxJQUFJLElBQUksU0FBQSxDQUFDO3dCQUNULElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFFZCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQzFCLElBQUksR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3hDLENBQUM7d0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQzVCLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMvQixDQUFDO3dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQ3ZDLElBQUksR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO3dCQUMvRSxDQUFDO3dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMseUJBQXlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQ3pDLElBQUksR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3ZDLENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ04sSUFBSSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDcEMsQ0FBQzt3QkFFRCxJQUFJLEdBQUcsZUFDSCxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLGtCQUM1QixJQUFJLGtCQUNKLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsa0JBQ2hDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsYUFDN0IsQ0FBQzt3QkFFRixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNuQixDQUFDO29CQUVELE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMxQixDQUFDO2dCQUVELGdCQUFnQjtnQkFDaEIsd0RBQW1CLEdBQW5CLFVBQW9CLENBQWMsRUFBRSxTQUFpQjtvQkFDbkQsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyx5QkFBVSxDQUFDLGFBQWEsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDO29CQUNqRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUU5QyxNQUFNLENBQUMsU0FBTyxXQUFXLEdBQUcsU0FBUyxRQUFLLENBQUM7Z0JBQzdDLENBQUM7Z0JBRUQsZ0JBQWdCO2dCQUNoQiwwREFBcUIsR0FBckIsVUFBc0IsQ0FBYztvQkFDbEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDM0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDOUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztnQkFDcEIsQ0FBQztnQkFFRCxnQkFBZ0I7Z0JBQ2hCLHVEQUFrQixHQUFsQixVQUFtQixVQUFrQjtvQkFDbkMsRUFBRSxDQUFDLENBQUMsQ0FBQyx3QkFBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMvQyxJQUFJLFVBQVUsR0FBRyx3QkFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7d0JBQ3hELEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDOzRCQUM5QixJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDOzRCQUMzQixNQUFNLENBQUMsR0FBRyxDQUFDO3dCQUNiLENBQUM7b0JBQ0gsQ0FBQztvQkFFRCxNQUFNLENBQUMsRUFBRSxDQUFDO2dCQUNaLENBQUM7Z0JBRUQsZ0JBQWdCO2dCQUNoQiwyREFBc0IsR0FBdEIsVUFBdUIsQ0FBYztvQkFDbkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO3dCQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO3dCQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUIsQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO3dCQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixNQUFNLElBQUksMEJBQWEsQ0FBQyw4QkFBNEIsQ0FBQyxDQUFDLElBQUksTUFBRyxDQUFDLENBQUM7b0JBQ2pFLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCxnQkFBZ0I7Z0JBQ2hCLGtEQUFhLEdBQWIsVUFBYyxDQUFjO29CQUE1QixpQkF1Q0M7b0JBdENDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDdkQsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFHLElBQUssT0FBQSxLQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBN0IsQ0FBNkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFFOUUsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNyRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBRXJELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDaEQsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFFdEIsSUFBSSxJQUFJLEdBQUcsaUJBQ0gsSUFBSSxhQUFRLElBQUksQ0FBQywwQkFBMEIsbUNBQzdDLElBQUksV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLG9CQUFvQixFQUFFLGNBQVMsUUFBUSx1QkFFbEUsQ0FBQztvQkFDRixJQUFJLElBQUksR0FBTSxRQUFRLFdBQU0sSUFBSSx3QkFBbUIsT0FBTyxXQUFNLFNBQVMsUUFBSyxDQUFDO29CQUUvRSxJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQTVCLENBQTRCLENBQUMsQ0FBQztvQkFDdkUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO29CQUNqRSxJQUFJLFNBQVMsR0FBRyxNQUFJLElBQUksa0JBQWEsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFHLENBQUM7b0JBRXRFLElBQUksS0FBSyxHQUFHLGFBQ1IsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsb0JBQzNDLElBQUksQ0FBQywwQkFBMEIsMkJBQXNCLFFBQVEsVUFBSyxRQUFRLHNCQUM1RSxRQUFRLFdBQU0sSUFBSSxDQUFDLDBCQUEwQixxQkFBZ0IsUUFBUSxtQkFDckUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxrQkFDeEIsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxrQkFDcEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxrQkFDeEIsUUFBUSxXQUFNLFFBQVEscUJBRTNCLENBQUM7b0JBRUYsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLGVBQWUsRUFBRSxHQUFHLEtBQUcsSUFBSSxHQUFHLEtBQU8sR0FBRyxJQUFJLENBQUM7b0JBRTdELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDNUIsTUFBTSxDQUFJLElBQUksYUFBUSxTQUFTLFlBQU8sT0FBTyxrQkFBYSxRQUFRLFdBQU0sUUFBUSxRQUFLLENBQUM7b0JBQ3hGLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sTUFBTSxDQUFJLElBQUksYUFBUSxTQUFTLFlBQU8sT0FBTyxPQUFJLENBQUM7b0JBQ3BELENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCxnQkFBZ0I7Z0JBQ2hCLHVEQUFrQixHQUFsQixVQUFtQixDQUFjO29CQUFqQyxpQkE2QkM7b0JBNUJDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDckQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNyRCxJQUFJLElBQUksR0FBRyxhQUNQLElBQUksQ0FBQyxNQUFNLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFDLFdBQzdDLENBQUM7b0JBRUYsSUFBSSxLQUFLLEdBQUcsYUFDUixJQUFJLENBQUMsc0JBQXNCLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxvQkFDM0MsSUFBSSxDQUFDLDBCQUEwQiwyQkFBc0IsUUFBUSxVQUFLLFFBQVEsc0JBQzVFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsa0JBQ3hCLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUMsa0JBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsa0JBQ3hCLFFBQVEsV0FBTSxRQUFRLHFCQUUzQixDQUFDO29CQUVGLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxlQUFlLEVBQUUsR0FBRyxLQUFHLElBQUksR0FBRyxLQUFPLEdBQUcsSUFBSSxDQUFDO29CQUU3RCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUN2QixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUE1QixDQUE0QixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUM3RSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQzVCLE1BQU0sQ0FBQyxTQUFPLFNBQVMsWUFBTyxPQUFPLGtCQUFhLFFBQVEsV0FBTSxRQUFRLFFBQUssQ0FBQzt3QkFDaEYsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDTixNQUFNLENBQUMsU0FBTyxTQUFTLFlBQU8sT0FBTyxPQUFJLENBQUM7d0JBQzVDLENBQUM7b0JBQ0gsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixNQUFNLENBQUMsT0FBTyxDQUFDO29CQUNqQixDQUFDO2dCQUNILENBQUM7Z0JBRUQsZ0JBQWdCO2dCQUNoQixxREFBZ0IsR0FBaEIsVUFBaUIsQ0FBYztvQkFDN0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsR0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFlBQVMsR0FBRyxFQUFFLENBQUM7Z0JBQzVGLENBQUM7Z0JBRUQsZ0JBQWdCO2dCQUNoQixpRUFBNEIsR0FBNUIsVUFBNkIsQ0FBYztvQkFDekMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7b0JBRWhDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDckQsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsR0FBRywyQkFBeUIsUUFBUSxPQUFJLEdBQUcsRUFBRSxDQUFDO29CQUUvRixJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDO29CQUN6QixFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDNUIsSUFBSSxpQkFBaUIsR0FDZCxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLFNBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFNLENBQUM7d0JBQzNGLE1BQU0sQ0FBQyxlQUNILGlCQUFpQixXQUFNLFFBQVEsbUJBQy9CLFdBQVcsa0JBQ1gsZ0JBQWdCLHFCQUNuQixDQUFDO29CQUNKLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sTUFBTSxDQUFDLHFDQUNtQixRQUFRLG9CQUM5QixXQUFXLGFBQ2QsQ0FBQztvQkFDSixDQUFDO2dCQUNILENBQUM7Z0JBRUQsZ0JBQWdCO2dCQUNoQiwyREFBc0IsR0FBdEIsVUFBdUIsUUFBZ0IsRUFBRSxRQUFnQjtvQkFDdkQsRUFBRSxDQUFDLENBQUMsd0JBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ3hCLE1BQU0sQ0FBQyxxQ0FDbUIsSUFBSSxDQUFDLDBCQUEwQixzQkFBaUIsUUFBUSxVQUFLLFFBQVEsZ0RBQ2pFLFFBQVEsVUFBSyxRQUFRLDRCQUVoRCxDQUFDO29CQUNOLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sTUFBTSxDQUFDLEVBQUUsQ0FBQztvQkFDWixDQUFDO2dCQUNILENBQUM7Z0JBRUQsZ0JBQWdCO2dCQUNoQixxREFBZ0IsR0FBaEIsVUFBaUIsQ0FBYztvQkFDN0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNyRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3JELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQzt3QkFBQyxNQUFNLENBQUMsRUFBRSxDQUFDO29CQUNoRCxNQUFNLENBQUksYUFBYSwwQkFBcUIsYUFBYSxVQUFLLFFBQVEsVUFBSyxRQUFRLE9BQUksQ0FBQztnQkFDMUYsQ0FBQztnQkFFRCxnQkFBZ0I7Z0JBQ2hCLHlEQUFvQixHQUFwQixVQUFxQixDQUFjO29CQUNqQyxJQUFJLElBQUksR0FBRywyQ0FBbUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUMzRSxJQUFJLGNBQWMsR0FBRyxjQUFPLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxDQUFDLENBQUMsYUFBYSxDQUFDO29CQUM3RSxNQUFNLENBQUMsY0FBYyxJQUFJLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsRUFBRTt3QkFDbEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsRUFBRSxXQUFNLENBQUMsQ0FBQyxvQkFBb0IsTUFBRzt3QkFDdkUsRUFBRSxDQUFDO2dCQUNoQixDQUFDO2dCQUVELGdCQUFnQjtnQkFDaEIsNkRBQXdCLEdBQXhCLFVBQXlCLENBQWM7b0JBQ3JDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQzt3QkFBQyxNQUFNLENBQUMsRUFBRSxDQUFDO29CQUNsQyxNQUFNLENBQUMsYUFDSCxhQUFhLHdCQUNiLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsZ0JBQ2pDLGdCQUFnQixvQkFDbkIsQ0FBQztnQkFDSixDQUFDO2dCQUVELGdCQUFnQjtnQkFDaEIsZ0RBQVcsR0FBWCxVQUFZLENBQWM7b0JBQ3hCLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUM7b0JBQ3pCLE1BQU0sQ0FBQyx5QkFBdUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxrQkFBZSxDQUFDO2dCQUMvRyxDQUFDO2dCQUVELGdCQUFnQjtnQkFDaEIsK0NBQVUsR0FBVixVQUFXLENBQWM7b0JBQ3ZCLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUM7b0JBQ3pCLE1BQU0sQ0FBQywyQkFBeUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsYUFBUSxJQUFJLENBQUMsMEJBQTBCLHVCQUFrQixJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLGlCQUFjLENBQUM7Z0JBQ25NLENBQUM7Z0JBRUQsZ0JBQWdCO2dCQUNoQixpREFBWSxHQUFaLFVBQWEsQ0FBYztvQkFDekIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQztvQkFDekIsTUFBTSxDQUFDLDJCQUF5QixhQUFhLFVBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxxQkFBZ0IsYUFBYSxPQUFJLENBQUM7Z0JBQ3JKLENBQUM7Z0JBRUQsZ0JBQWdCO2dCQUNoQiw4REFBeUIsR0FBekIsVUFBMEIsQ0FBYztvQkFDdEMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQztvQkFDekIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7b0JBQ25FLElBQUksTUFBTSxHQUFHLGdCQUNOLGdCQUFnQixxQkFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsdUNBRW5FLENBQUM7b0JBQ0YsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDaEIsQ0FBQztnQkFDSCxpQ0FBQztZQUFELENBdGRBLEFBc2RDLElBQUE7WUF0ZEQsbUVBc2RDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2NoYW5nZV9kZXRlY3Rpb25faml0X2dlbmVyYXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VHlwZSwgYXNzZXJ0aW9uc0VuYWJsZWQsIGlzQmxhbmssIGlzUHJlc2VudCwgU3RyaW5nV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7TGlzdFdyYXBwZXIsIE1hcFdyYXBwZXIsIFN0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5cbmltcG9ydCB7QWJzdHJhY3RDaGFuZ2VEZXRlY3Rvcn0gZnJvbSAnLi9hYnN0cmFjdF9jaGFuZ2VfZGV0ZWN0b3InO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25VdGlsfSBmcm9tICcuL2NoYW5nZV9kZXRlY3Rpb25fdXRpbCc7XG5pbXBvcnQge0RpcmVjdGl2ZUluZGV4LCBEaXJlY3RpdmVSZWNvcmR9IGZyb20gJy4vZGlyZWN0aXZlX3JlY29yZCc7XG5cbmltcG9ydCB7UHJvdG9SZWNvcmQsIFJlY29yZFR5cGV9IGZyb20gJy4vcHJvdG9fcmVjb3JkJztcbmltcG9ydCB7Q29kZWdlbk5hbWVVdGlsLCBzYW5pdGl6ZU5hbWV9IGZyb20gJy4vY29kZWdlbl9uYW1lX3V0aWwnO1xuaW1wb3J0IHtDb2RlZ2VuTG9naWNVdGlsfSBmcm9tICcuL2NvZGVnZW5fbG9naWNfdXRpbCc7XG5pbXBvcnQge2NvZGlmeX0gZnJvbSAnLi9jb2RlZ2VuX2ZhY2FkZSc7XG5pbXBvcnQge0V2ZW50QmluZGluZ30gZnJvbSAnLi9ldmVudF9iaW5kaW5nJztcbmltcG9ydCB7QmluZGluZ1RhcmdldH0gZnJvbSAnLi9iaW5kaW5nX3JlY29yZCc7XG5pbXBvcnQge0NoYW5nZURldGVjdG9yR2VuQ29uZmlnLCBDaGFuZ2VEZXRlY3RvckRlZmluaXRpb259IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclN0YXRlfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQge2NyZWF0ZVByb3BlcnR5UmVjb3JkcywgY3JlYXRlRXZlbnRSZWNvcmRzfSBmcm9tICcuL3Byb3RvX2NoYW5nZV9kZXRlY3Rvcic7XG5cbi8qKlxuICogVGhlIGNvZGUgZ2VuZXJhdG9yIHRha2VzIGEgbGlzdCBvZiBwcm90byByZWNvcmRzIGFuZCBjcmVhdGVzIGEgZnVuY3Rpb24vY2xhc3NcbiAqIHRoYXQgXCJlbXVsYXRlc1wiIHdoYXQgdGhlIGRldmVsb3BlciB3b3VsZCB3cml0ZSBieSBoYW5kIHRvIGltcGxlbWVudCB0aGUgc2FtZVxuICoga2luZCBvZiBiZWhhdmlvdXIuXG4gKlxuICogVGhpcyBjb2RlIHNob3VsZCBiZSBrZXB0IGluIHN5bmMgd2l0aCB0aGUgRGFydCB0cmFuc2Zvcm1lcidzXG4gKiBgYW5ndWxhcjIudHJhbnNmb3JtLnRlbXBsYXRlX2NvbXBpbGVyLmNoYW5nZV9kZXRlY3Rvcl9jb2RlZ2VuYCBsaWJyYXJ5LiBJZiB5b3UgbWFrZSB1cGRhdGVzXG4gKiBoZXJlLCBwbGVhc2UgbWFrZSBlcXVpdmFsZW50IGNoYW5nZXMgdGhlcmUuXG4qL1xuY29uc3QgSVNfQ0hBTkdFRF9MT0NBTCA9IFwiaXNDaGFuZ2VkXCI7XG5jb25zdCBDSEFOR0VTX0xPQ0FMID0gXCJjaGFuZ2VzXCI7XG5cbmV4cG9ydCBjbGFzcyBDaGFuZ2VEZXRlY3RvckpJVEdlbmVyYXRvciB7XG4gIHByaXZhdGUgX2xvZ2ljOiBDb2RlZ2VuTG9naWNVdGlsO1xuICBwcml2YXRlIF9uYW1lczogQ29kZWdlbk5hbWVVdGlsO1xuICBwcml2YXRlIF9lbmRPZkJsb2NrSWR4czogbnVtYmVyW107XG4gIHByaXZhdGUgaWQ6IHN0cmluZztcbiAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3Rpb25TdHJhdGVneTogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3k7XG4gIHByaXZhdGUgcmVjb3JkczogUHJvdG9SZWNvcmRbXTtcbiAgcHJpdmF0ZSBwcm9wZXJ0eUJpbmRpbmdUYXJnZXRzOiBCaW5kaW5nVGFyZ2V0W107XG4gIHByaXZhdGUgZXZlbnRCaW5kaW5nczogRXZlbnRCaW5kaW5nW107XG4gIHByaXZhdGUgZGlyZWN0aXZlUmVjb3JkczogYW55W107XG4gIHByaXZhdGUgZ2VuQ29uZmlnOiBDaGFuZ2VEZXRlY3RvckdlbkNvbmZpZztcbiAgdHlwZU5hbWU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihkZWZpbml0aW9uOiBDaGFuZ2VEZXRlY3RvckRlZmluaXRpb24sIHByaXZhdGUgY2hhbmdlRGV0ZWN0aW9uVXRpbFZhck5hbWU6IHN0cmluZyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBhYnN0cmFjdENoYW5nZURldGVjdG9yVmFyTmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yU3RhdGVWYXJOYW1lOiBzdHJpbmcpIHtcbiAgICB2YXIgcHJvcGVydHlCaW5kaW5nUmVjb3JkcyA9IGNyZWF0ZVByb3BlcnR5UmVjb3JkcyhkZWZpbml0aW9uKTtcbiAgICB2YXIgZXZlbnRCaW5kaW5nUmVjb3JkcyA9IGNyZWF0ZUV2ZW50UmVjb3JkcyhkZWZpbml0aW9uKTtcbiAgICB2YXIgcHJvcGVydHlCaW5kaW5nVGFyZ2V0cyA9IGRlZmluaXRpb24uYmluZGluZ1JlY29yZHMubWFwKGIgPT4gYi50YXJnZXQpO1xuICAgIHRoaXMuaWQgPSBkZWZpbml0aW9uLmlkO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgPSBkZWZpbml0aW9uLnN0cmF0ZWd5O1xuICAgIHRoaXMuZ2VuQ29uZmlnID0gZGVmaW5pdGlvbi5nZW5Db25maWc7XG5cbiAgICB0aGlzLnJlY29yZHMgPSBwcm9wZXJ0eUJpbmRpbmdSZWNvcmRzO1xuICAgIHRoaXMucHJvcGVydHlCaW5kaW5nVGFyZ2V0cyA9IHByb3BlcnR5QmluZGluZ1RhcmdldHM7XG4gICAgdGhpcy5ldmVudEJpbmRpbmdzID0gZXZlbnRCaW5kaW5nUmVjb3JkcztcbiAgICB0aGlzLmRpcmVjdGl2ZVJlY29yZHMgPSBkZWZpbml0aW9uLmRpcmVjdGl2ZVJlY29yZHM7XG4gICAgdGhpcy5fbmFtZXMgPSBuZXcgQ29kZWdlbk5hbWVVdGlsKHRoaXMucmVjb3JkcywgdGhpcy5ldmVudEJpbmRpbmdzLCB0aGlzLmRpcmVjdGl2ZVJlY29yZHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0aW9uVXRpbFZhck5hbWUpO1xuICAgIHRoaXMuX2xvZ2ljID0gbmV3IENvZGVnZW5Mb2dpY1V0aWwodGhpcy5fbmFtZXMsIHRoaXMuY2hhbmdlRGV0ZWN0aW9uVXRpbFZhck5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yU3RhdGVWYXJOYW1lKTtcbiAgICB0aGlzLnR5cGVOYW1lID0gc2FuaXRpemVOYW1lKGBDaGFuZ2VEZXRlY3Rvcl8ke3RoaXMuaWR9YCk7XG4gIH1cblxuICBnZW5lcmF0ZSgpOiBGdW5jdGlvbiB7XG4gICAgdmFyIGZhY3RvcnlTb3VyY2UgPSBgXG4gICAgICAke3RoaXMuZ2VuZXJhdGVTb3VyY2UoKX1cbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyAke3RoaXMudHlwZU5hbWV9KCk7XG4gICAgICB9XG4gICAgYDtcbiAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKHRoaXMuYWJzdHJhY3RDaGFuZ2VEZXRlY3RvclZhck5hbWUsIHRoaXMuY2hhbmdlRGV0ZWN0aW9uVXRpbFZhck5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yU3RhdGVWYXJOYW1lLCBmYWN0b3J5U291cmNlKShcbiAgICAgICAgQWJzdHJhY3RDaGFuZ2VEZXRlY3RvciwgQ2hhbmdlRGV0ZWN0aW9uVXRpbCwgQ2hhbmdlRGV0ZWN0b3JTdGF0ZSk7XG4gIH1cblxuICBnZW5lcmF0ZVNvdXJjZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgXG4gICAgICB2YXIgJHt0aGlzLnR5cGVOYW1lfSA9IGZ1bmN0aW9uICR7dGhpcy50eXBlTmFtZX0oKSB7XG4gICAgICAgICR7dGhpcy5hYnN0cmFjdENoYW5nZURldGVjdG9yVmFyTmFtZX0uY2FsbChcbiAgICAgICAgICAgIHRoaXMsICR7SlNPTi5zdHJpbmdpZnkodGhpcy5pZCl9LCAke3RoaXMucmVjb3Jkcy5sZW5ndGh9LFxuICAgICAgICAgICAgJHt0aGlzLnR5cGVOYW1lfS5nZW5fcHJvcGVydHlCaW5kaW5nVGFyZ2V0cywgJHt0aGlzLnR5cGVOYW1lfS5nZW5fZGlyZWN0aXZlSW5kaWNlcyxcbiAgICAgICAgICAgICR7Y29kaWZ5KHRoaXMuY2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kpfSk7XG4gICAgICAgIHRoaXMuZGVoeWRyYXRlRGlyZWN0aXZlcyhmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgICR7dGhpcy50eXBlTmFtZX0ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSgke3RoaXMuYWJzdHJhY3RDaGFuZ2VEZXRlY3RvclZhck5hbWV9LnByb3RvdHlwZSk7XG5cbiAgICAgICR7dGhpcy50eXBlTmFtZX0ucHJvdG90eXBlLmRldGVjdENoYW5nZXNJblJlY29yZHNJbnRlcm5hbCA9IGZ1bmN0aW9uKHRocm93T25DaGFuZ2UpIHtcbiAgICAgICAgJHt0aGlzLl9uYW1lcy5nZW5Jbml0TG9jYWxzKCl9XG4gICAgICAgIHZhciAke0lTX0NIQU5HRURfTE9DQUx9ID0gZmFsc2U7XG4gICAgICAgIHZhciAke0NIQU5HRVNfTE9DQUx9ID0gbnVsbDtcblxuICAgICAgICAke3RoaXMuX2dlbkFsbFJlY29yZHModGhpcy5yZWNvcmRzKX1cbiAgICAgIH1cblxuICAgICAgJHt0aGlzLl9tYXliZUdlbkhhbmRsZUV2ZW50SW50ZXJuYWwoKX1cblxuICAgICAgJHt0aGlzLl9tYXliZUdlbkFmdGVyQ29udGVudExpZmVjeWNsZUNhbGxiYWNrcygpfVxuXG4gICAgICAke3RoaXMuX21heWJlR2VuQWZ0ZXJWaWV3TGlmZWN5Y2xlQ2FsbGJhY2tzKCl9XG5cbiAgICAgICR7dGhpcy5fbWF5YmVHZW5IeWRyYXRlRGlyZWN0aXZlcygpfVxuXG4gICAgICAke3RoaXMuX21heWJlR2VuRGVoeWRyYXRlRGlyZWN0aXZlcygpfVxuXG4gICAgICAke3RoaXMuX2dlblByb3BlcnR5QmluZGluZ1RhcmdldHMoKX1cblxuICAgICAgJHt0aGlzLl9nZW5EaXJlY3RpdmVJbmRpY2VzKCl9XG4gICAgYDtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2dlblByb3BlcnR5QmluZGluZ1RhcmdldHMoKTogc3RyaW5nIHtcbiAgICB2YXIgdGFyZ2V0cyA9IHRoaXMuX2xvZ2ljLmdlblByb3BlcnR5QmluZGluZ1RhcmdldHModGhpcy5wcm9wZXJ0eUJpbmRpbmdUYXJnZXRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdlbkNvbmZpZy5nZW5EZWJ1Z0luZm8pO1xuICAgIHJldHVybiBgJHt0aGlzLnR5cGVOYW1lfS5nZW5fcHJvcGVydHlCaW5kaW5nVGFyZ2V0cyA9ICR7dGFyZ2V0c307YDtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2dlbkRpcmVjdGl2ZUluZGljZXMoKTogc3RyaW5nIHtcbiAgICB2YXIgaW5kaWNlcyA9IHRoaXMuX2xvZ2ljLmdlbkRpcmVjdGl2ZUluZGljZXModGhpcy5kaXJlY3RpdmVSZWNvcmRzKTtcbiAgICByZXR1cm4gYCR7dGhpcy50eXBlTmFtZX0uZ2VuX2RpcmVjdGl2ZUluZGljZXMgPSAke2luZGljZXN9O2A7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9tYXliZUdlbkhhbmRsZUV2ZW50SW50ZXJuYWwoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5ldmVudEJpbmRpbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgIHZhciBoYW5kbGVycyA9IHRoaXMuZXZlbnRCaW5kaW5ncy5tYXAoZWIgPT4gdGhpcy5fZ2VuRXZlbnRCaW5kaW5nKGViKSkuam9pbihcIlxcblwiKTtcbiAgICAgIHJldHVybiBgXG4gICAgICAgICR7dGhpcy50eXBlTmFtZX0ucHJvdG90eXBlLmhhbmRsZUV2ZW50SW50ZXJuYWwgPSBmdW5jdGlvbihldmVudE5hbWUsIGVsSW5kZXgsIGxvY2Fscykge1xuICAgICAgICAgIHZhciAke3RoaXMuX25hbWVzLmdldFByZXZlbnREZWZhdWx0QWNjZXNvcigpfSA9IGZhbHNlO1xuICAgICAgICAgICR7dGhpcy5fbmFtZXMuZ2VuSW5pdEV2ZW50TG9jYWxzKCl9XG4gICAgICAgICAgJHtoYW5kbGVyc31cbiAgICAgICAgICByZXR1cm4gJHt0aGlzLl9uYW1lcy5nZXRQcmV2ZW50RGVmYXVsdEFjY2Vzb3IoKX07XG4gICAgICAgIH1cbiAgICAgIGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9nZW5FdmVudEJpbmRpbmcoZWI6IEV2ZW50QmluZGluZyk6IHN0cmluZyB7XG4gICAgbGV0IGNvZGVzOiBTdHJpbmdbXSA9IFtdO1xuICAgIHRoaXMuX2VuZE9mQmxvY2tJZHhzID0gW107XG5cbiAgICBMaXN0V3JhcHBlci5mb3JFYWNoV2l0aEluZGV4KGViLnJlY29yZHMsIChyLCBpKSA9PiB7XG4gICAgICBsZXQgY29kZTtcblxuICAgICAgaWYgKHIuaXNDb25kaXRpb25hbFNraXBSZWNvcmQoKSkge1xuICAgICAgICBjb2RlID0gdGhpcy5fZ2VuQ29uZGl0aW9uYWxTa2lwKHIsIHRoaXMuX25hbWVzLmdldEV2ZW50TG9jYWxOYW1lKGViLCBpKSk7XG4gICAgICB9IGVsc2UgaWYgKHIuaXNVbmNvbmRpdGlvbmFsU2tpcFJlY29yZCgpKSB7XG4gICAgICAgIGNvZGUgPSB0aGlzLl9nZW5VbmNvbmRpdGlvbmFsU2tpcChyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvZGUgPSB0aGlzLl9nZW5FdmVudEJpbmRpbmdFdmFsKGViLCByKTtcbiAgICAgIH1cblxuICAgICAgY29kZSArPSB0aGlzLl9nZW5FbmRPZlNraXBCbG9jayhpKTtcblxuICAgICAgY29kZXMucHVzaChjb2RlKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBgXG4gICAgaWYgKGV2ZW50TmFtZSA9PT0gXCIke2ViLmV2ZW50TmFtZX1cIiAmJiBlbEluZGV4ID09PSAke2ViLmVsSW5kZXh9KSB7XG4gICAgICAke2NvZGVzLmpvaW4oXCJcXG5cIil9XG4gICAgfWA7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9nZW5FdmVudEJpbmRpbmdFdmFsKGViOiBFdmVudEJpbmRpbmcsIHI6IFByb3RvUmVjb3JkKTogc3RyaW5nIHtcbiAgICBpZiAoci5sYXN0SW5CaW5kaW5nKSB7XG4gICAgICB2YXIgZXZhbFJlY29yZCA9IHRoaXMuX2xvZ2ljLmdlbkV2ZW50QmluZGluZ0V2YWxWYWx1ZShlYiwgcik7XG4gICAgICB2YXIgbWFya1BhdGggPSB0aGlzLl9nZW5NYXJrUGF0aFRvUm9vdEFzQ2hlY2tPbmNlKHIpO1xuICAgICAgdmFyIHByZXZEZWZhdWx0ID0gdGhpcy5fZ2VuVXBkYXRlUHJldmVudERlZmF1bHQoZWIsIHIpO1xuICAgICAgcmV0dXJuIGAke21hcmtQYXRofVxcbiR7ZXZhbFJlY29yZH1cXG4ke3ByZXZEZWZhdWx0fWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLl9sb2dpYy5nZW5FdmVudEJpbmRpbmdFdmFsVmFsdWUoZWIsIHIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2dlbk1hcmtQYXRoVG9Sb290QXNDaGVja09uY2UocjogUHJvdG9SZWNvcmQpOiBzdHJpbmcge1xuICAgIHZhciBiciA9IHIuYmluZGluZ1JlY29yZDtcbiAgICBpZiAoYnIuaXNEZWZhdWx0Q2hhbmdlRGV0ZWN0aW9uKCkpIHtcbiAgICAgIHJldHVybiBcIlwiO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5fbmFtZXMuZ2V0RGV0ZWN0b3JOYW1lKGJyLmRpcmVjdGl2ZVJlY29yZC5kaXJlY3RpdmVJbmRleCl9Lm1hcmtQYXRoVG9Sb290QXNDaGVja09uY2UoKTtgO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2dlblVwZGF0ZVByZXZlbnREZWZhdWx0KGViOiBFdmVudEJpbmRpbmcsIHI6IFByb3RvUmVjb3JkKTogc3RyaW5nIHtcbiAgICB2YXIgbG9jYWwgPSB0aGlzLl9uYW1lcy5nZXRFdmVudExvY2FsTmFtZShlYiwgci5zZWxmSW5kZXgpO1xuICAgIHJldHVybiBgaWYgKCR7bG9jYWx9ID09PSBmYWxzZSkgeyAke3RoaXMuX25hbWVzLmdldFByZXZlbnREZWZhdWx0QWNjZXNvcigpfSA9IHRydWV9O2A7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9tYXliZUdlbkRlaHlkcmF0ZURpcmVjdGl2ZXMoKTogc3RyaW5nIHtcbiAgICB2YXIgZGVzdHJveVBpcGVzQ29kZSA9IHRoaXMuX25hbWVzLmdlblBpcGVPbkRlc3Ryb3koKTtcbiAgICB2YXIgZGVzdHJveURpcmVjdGl2ZXNDb2RlID0gdGhpcy5fbG9naWMuZ2VuRGlyZWN0aXZlc09uRGVzdHJveSh0aGlzLmRpcmVjdGl2ZVJlY29yZHMpO1xuICAgIHZhciBkZWh5ZHJhdGVGaWVsZHNDb2RlID0gdGhpcy5fbmFtZXMuZ2VuRGVoeWRyYXRlRmllbGRzKCk7XG4gICAgaWYgKCFkZXN0cm95UGlwZXNDb2RlICYmICFkZXN0cm95RGlyZWN0aXZlc0NvZGUgJiYgIWRlaHlkcmF0ZUZpZWxkc0NvZGUpIHJldHVybiAnJztcbiAgICByZXR1cm4gYCR7dGhpcy50eXBlTmFtZX0ucHJvdG90eXBlLmRlaHlkcmF0ZURpcmVjdGl2ZXMgPSBmdW5jdGlvbihkZXN0cm95UGlwZXMpIHtcbiAgICAgICAgaWYgKGRlc3Ryb3lQaXBlcykge1xuICAgICAgICAgICR7ZGVzdHJveVBpcGVzQ29kZX1cbiAgICAgICAgICAke2Rlc3Ryb3lEaXJlY3RpdmVzQ29kZX1cbiAgICAgICAgfVxuICAgICAgICAke2RlaHlkcmF0ZUZpZWxkc0NvZGV9XG4gICAgfWA7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9tYXliZUdlbkh5ZHJhdGVEaXJlY3RpdmVzKCk6IHN0cmluZyB7XG4gICAgdmFyIGh5ZHJhdGVEaXJlY3RpdmVzQ29kZSA9IHRoaXMuX2xvZ2ljLmdlbkh5ZHJhdGVEaXJlY3RpdmVzKHRoaXMuZGlyZWN0aXZlUmVjb3Jkcyk7XG4gICAgdmFyIGh5ZHJhdGVEZXRlY3RvcnNDb2RlID0gdGhpcy5fbG9naWMuZ2VuSHlkcmF0ZURldGVjdG9ycyh0aGlzLmRpcmVjdGl2ZVJlY29yZHMpO1xuICAgIGlmICghaHlkcmF0ZURpcmVjdGl2ZXNDb2RlICYmICFoeWRyYXRlRGV0ZWN0b3JzQ29kZSkgcmV0dXJuICcnO1xuICAgIHJldHVybiBgJHt0aGlzLnR5cGVOYW1lfS5wcm90b3R5cGUuaHlkcmF0ZURpcmVjdGl2ZXMgPSBmdW5jdGlvbihkaXJlY3RpdmVzKSB7XG4gICAgICAke2h5ZHJhdGVEaXJlY3RpdmVzQ29kZX1cbiAgICAgICR7aHlkcmF0ZURldGVjdG9yc0NvZGV9XG4gICAgfWA7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9tYXliZUdlbkFmdGVyQ29udGVudExpZmVjeWNsZUNhbGxiYWNrcygpOiBzdHJpbmcge1xuICAgIHZhciBub3RpZmljYXRpb25zID0gdGhpcy5fbG9naWMuZ2VuQ29udGVudExpZmVjeWNsZUNhbGxiYWNrcyh0aGlzLmRpcmVjdGl2ZVJlY29yZHMpO1xuICAgIGlmIChub3RpZmljYXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIHZhciBkaXJlY3RpdmVOb3RpZmljYXRpb25zID0gbm90aWZpY2F0aW9ucy5qb2luKFwiXFxuXCIpO1xuICAgICAgcmV0dXJuIGBcbiAgICAgICAgJHt0aGlzLnR5cGVOYW1lfS5wcm90b3R5cGUuYWZ0ZXJDb250ZW50TGlmZWN5Y2xlQ2FsbGJhY2tzSW50ZXJuYWwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAke2RpcmVjdGl2ZU5vdGlmaWNhdGlvbnN9XG4gICAgICAgIH1cbiAgICAgIGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9tYXliZUdlbkFmdGVyVmlld0xpZmVjeWNsZUNhbGxiYWNrcygpOiBzdHJpbmcge1xuICAgIHZhciBub3RpZmljYXRpb25zID0gdGhpcy5fbG9naWMuZ2VuVmlld0xpZmVjeWNsZUNhbGxiYWNrcyh0aGlzLmRpcmVjdGl2ZVJlY29yZHMpO1xuICAgIGlmIChub3RpZmljYXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIHZhciBkaXJlY3RpdmVOb3RpZmljYXRpb25zID0gbm90aWZpY2F0aW9ucy5qb2luKFwiXFxuXCIpO1xuICAgICAgcmV0dXJuIGBcbiAgICAgICAgJHt0aGlzLnR5cGVOYW1lfS5wcm90b3R5cGUuYWZ0ZXJWaWV3TGlmZWN5Y2xlQ2FsbGJhY2tzSW50ZXJuYWwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAke2RpcmVjdGl2ZU5vdGlmaWNhdGlvbnN9XG4gICAgICAgIH1cbiAgICAgIGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9nZW5BbGxSZWNvcmRzKHJzOiBQcm90b1JlY29yZFtdKTogc3RyaW5nIHtcbiAgICB2YXIgY29kZXM6IFN0cmluZ1tdID0gW107XG4gICAgdGhpcy5fZW5kT2ZCbG9ja0lkeHMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBjb2RlO1xuICAgICAgbGV0IHIgPSByc1tpXTtcblxuICAgICAgaWYgKHIuaXNMaWZlQ3ljbGVSZWNvcmQoKSkge1xuICAgICAgICBjb2RlID0gdGhpcy5fZ2VuRGlyZWN0aXZlTGlmZWN5Y2xlKHIpO1xuICAgICAgfSBlbHNlIGlmIChyLmlzUGlwZVJlY29yZCgpKSB7XG4gICAgICAgIGNvZGUgPSB0aGlzLl9nZW5QaXBlQ2hlY2socik7XG4gICAgICB9IGVsc2UgaWYgKHIuaXNDb25kaXRpb25hbFNraXBSZWNvcmQoKSkge1xuICAgICAgICBjb2RlID0gdGhpcy5fZ2VuQ29uZGl0aW9uYWxTa2lwKHIsIHRoaXMuX25hbWVzLmdldExvY2FsTmFtZShyLmNvbnRleHRJbmRleCkpO1xuICAgICAgfSBlbHNlIGlmIChyLmlzVW5jb25kaXRpb25hbFNraXBSZWNvcmQoKSkge1xuICAgICAgICBjb2RlID0gdGhpcy5fZ2VuVW5jb25kaXRpb25hbFNraXAocik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb2RlID0gdGhpcy5fZ2VuUmVmZXJlbmNlQ2hlY2socik7XG4gICAgICB9XG5cbiAgICAgIGNvZGUgPSBgXG4gICAgICAgICR7dGhpcy5fbWF5YmVGaXJzdEluQmluZGluZyhyKX1cbiAgICAgICAgJHtjb2RlfVxuICAgICAgICAke3RoaXMuX21heWJlR2VuTGFzdEluRGlyZWN0aXZlKHIpfVxuICAgICAgICAke3RoaXMuX2dlbkVuZE9mU2tpcEJsb2NrKGkpfVxuICAgICAgYDtcblxuICAgICAgY29kZXMucHVzaChjb2RlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29kZXMuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2dlbkNvbmRpdGlvbmFsU2tpcChyOiBQcm90b1JlY29yZCwgY29uZGl0aW9uOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBtYXliZU5lZ2F0ZSA9IHIubW9kZSA9PT0gUmVjb3JkVHlwZS5Ta2lwUmVjb3Jkc0lmID8gJyEnIDogJyc7XG4gICAgdGhpcy5fZW5kT2ZCbG9ja0lkeHMucHVzaChyLmZpeGVkQXJnc1swXSAtIDEpO1xuXG4gICAgcmV0dXJuIGBpZiAoJHttYXliZU5lZ2F0ZX0ke2NvbmRpdGlvbn0pIHtgO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZ2VuVW5jb25kaXRpb25hbFNraXAocjogUHJvdG9SZWNvcmQpOiBzdHJpbmcge1xuICAgIHRoaXMuX2VuZE9mQmxvY2tJZHhzLnBvcCgpO1xuICAgIHRoaXMuX2VuZE9mQmxvY2tJZHhzLnB1c2goci5maXhlZEFyZ3NbMF0gLSAxKTtcbiAgICByZXR1cm4gYH0gZWxzZSB7YDtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2dlbkVuZE9mU2tpcEJsb2NrKHByb3RvSW5kZXg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgaWYgKCFMaXN0V3JhcHBlci5pc0VtcHR5KHRoaXMuX2VuZE9mQmxvY2tJZHhzKSkge1xuICAgICAgbGV0IGVuZE9mQmxvY2sgPSBMaXN0V3JhcHBlci5sYXN0KHRoaXMuX2VuZE9mQmxvY2tJZHhzKTtcbiAgICAgIGlmIChwcm90b0luZGV4ID09PSBlbmRPZkJsb2NrKSB7XG4gICAgICAgIHRoaXMuX2VuZE9mQmxvY2tJZHhzLnBvcCgpO1xuICAgICAgICByZXR1cm4gJ30nO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2dlbkRpcmVjdGl2ZUxpZmVjeWNsZShyOiBQcm90b1JlY29yZCk6IHN0cmluZyB7XG4gICAgaWYgKHIubmFtZSA9PT0gXCJEb0NoZWNrXCIpIHtcbiAgICAgIHJldHVybiB0aGlzLl9nZW5PbkNoZWNrKHIpO1xuICAgIH0gZWxzZSBpZiAoci5uYW1lID09PSBcIk9uSW5pdFwiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZ2VuT25Jbml0KHIpO1xuICAgIH0gZWxzZSBpZiAoci5uYW1lID09PSBcIk9uQ2hhbmdlc1wiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZ2VuT25DaGFuZ2Uocik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBVbmtub3duIGxpZmVjeWNsZSBldmVudCAnJHtyLm5hbWV9J2ApO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2dlblBpcGVDaGVjayhyOiBQcm90b1JlY29yZCk6IHN0cmluZyB7XG4gICAgdmFyIGNvbnRleHQgPSB0aGlzLl9uYW1lcy5nZXRMb2NhbE5hbWUoci5jb250ZXh0SW5kZXgpO1xuICAgIHZhciBhcmdTdHJpbmcgPSByLmFyZ3MubWFwKChhcmcpID0+IHRoaXMuX25hbWVzLmdldExvY2FsTmFtZShhcmcpKS5qb2luKFwiLCBcIik7XG5cbiAgICB2YXIgb2xkVmFsdWUgPSB0aGlzLl9uYW1lcy5nZXRGaWVsZE5hbWUoci5zZWxmSW5kZXgpO1xuICAgIHZhciBuZXdWYWx1ZSA9IHRoaXMuX25hbWVzLmdldExvY2FsTmFtZShyLnNlbGZJbmRleCk7XG5cbiAgICB2YXIgcGlwZSA9IHRoaXMuX25hbWVzLmdldFBpcGVOYW1lKHIuc2VsZkluZGV4KTtcbiAgICB2YXIgcGlwZU5hbWUgPSByLm5hbWU7XG5cbiAgICB2YXIgaW5pdCA9IGBcbiAgICAgIGlmICgke3BpcGV9ID09PSAke3RoaXMuY2hhbmdlRGV0ZWN0aW9uVXRpbFZhck5hbWV9LnVuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgJHtwaXBlfSA9ICR7dGhpcy5fbmFtZXMuZ2V0UGlwZXNBY2Nlc3Nvck5hbWUoKX0uZ2V0KCcke3BpcGVOYW1lfScpO1xuICAgICAgfVxuICAgIGA7XG4gICAgdmFyIHJlYWQgPSBgJHtuZXdWYWx1ZX0gPSAke3BpcGV9LnBpcGUudHJhbnNmb3JtKCR7Y29udGV4dH0sIFske2FyZ1N0cmluZ31dKTtgO1xuXG4gICAgdmFyIGNvbnRleE9yQXJnQ2hlY2sgPSByLmFyZ3MubWFwKChhKSA9PiB0aGlzLl9uYW1lcy5nZXRDaGFuZ2VOYW1lKGEpKTtcbiAgICBjb250ZXhPckFyZ0NoZWNrLnB1c2godGhpcy5fbmFtZXMuZ2V0Q2hhbmdlTmFtZShyLmNvbnRleHRJbmRleCkpO1xuICAgIHZhciBjb25kaXRpb24gPSBgISR7cGlwZX0ucHVyZSB8fCAoJHtjb250ZXhPckFyZ0NoZWNrLmpvaW4oXCIgfHwgXCIpfSlgO1xuXG4gICAgdmFyIGNoZWNrID0gYFxuICAgICAgJHt0aGlzLl9nZW5UaHJvd09uQ2hhbmdlQ2hlY2sob2xkVmFsdWUsIG5ld1ZhbHVlKX1cbiAgICAgIGlmICgke3RoaXMuY2hhbmdlRGV0ZWN0aW9uVXRpbFZhck5hbWV9Lmxvb3NlTm90SWRlbnRpY2FsKCR7b2xkVmFsdWV9LCAke25ld1ZhbHVlfSkpIHtcbiAgICAgICAgJHtuZXdWYWx1ZX0gPSAke3RoaXMuY2hhbmdlRGV0ZWN0aW9uVXRpbFZhck5hbWV9LnVud3JhcFZhbHVlKCR7bmV3VmFsdWV9KVxuICAgICAgICAke3RoaXMuX2dlbkNoYW5nZU1hcmtlcihyKX1cbiAgICAgICAgJHt0aGlzLl9nZW5VcGRhdGVEaXJlY3RpdmVPckVsZW1lbnQocil9XG4gICAgICAgICR7dGhpcy5fZ2VuQWRkVG9DaGFuZ2VzKHIpfVxuICAgICAgICAke29sZFZhbHVlfSA9ICR7bmV3VmFsdWV9O1xuICAgICAgfVxuICAgIGA7XG5cbiAgICB2YXIgZ2VuQ29kZSA9IHIuc2hvdWxkQmVDaGVja2VkKCkgPyBgJHtyZWFkfSR7Y2hlY2t9YCA6IHJlYWQ7XG5cbiAgICBpZiAoci5pc1VzZWRCeU90aGVyUmVjb3JkKCkpIHtcbiAgICAgIHJldHVybiBgJHtpbml0fSBpZiAoJHtjb25kaXRpb259KSB7ICR7Z2VuQ29kZX0gfSBlbHNlIHsgJHtuZXdWYWx1ZX0gPSAke29sZFZhbHVlfTsgfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgJHtpbml0fSBpZiAoJHtjb25kaXRpb259KSB7ICR7Z2VuQ29kZX0gfWA7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZ2VuUmVmZXJlbmNlQ2hlY2socjogUHJvdG9SZWNvcmQpOiBzdHJpbmcge1xuICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMuX25hbWVzLmdldEZpZWxkTmFtZShyLnNlbGZJbmRleCk7XG4gICAgdmFyIG5ld1ZhbHVlID0gdGhpcy5fbmFtZXMuZ2V0TG9jYWxOYW1lKHIuc2VsZkluZGV4KTtcbiAgICB2YXIgcmVhZCA9IGBcbiAgICAgICR7dGhpcy5fbG9naWMuZ2VuUHJvcGVydHlCaW5kaW5nRXZhbFZhbHVlKHIpfVxuICAgIGA7XG5cbiAgICB2YXIgY2hlY2sgPSBgXG4gICAgICAke3RoaXMuX2dlblRocm93T25DaGFuZ2VDaGVjayhvbGRWYWx1ZSwgbmV3VmFsdWUpfVxuICAgICAgaWYgKCR7dGhpcy5jaGFuZ2VEZXRlY3Rpb25VdGlsVmFyTmFtZX0ubG9vc2VOb3RJZGVudGljYWwoJHtvbGRWYWx1ZX0sICR7bmV3VmFsdWV9KSkge1xuICAgICAgICAke3RoaXMuX2dlbkNoYW5nZU1hcmtlcihyKX1cbiAgICAgICAgJHt0aGlzLl9nZW5VcGRhdGVEaXJlY3RpdmVPckVsZW1lbnQocil9XG4gICAgICAgICR7dGhpcy5fZ2VuQWRkVG9DaGFuZ2VzKHIpfVxuICAgICAgICAke29sZFZhbHVlfSA9ICR7bmV3VmFsdWV9O1xuICAgICAgfVxuICAgIGA7XG5cbiAgICB2YXIgZ2VuQ29kZSA9IHIuc2hvdWxkQmVDaGVja2VkKCkgPyBgJHtyZWFkfSR7Y2hlY2t9YCA6IHJlYWQ7XG5cbiAgICBpZiAoci5pc1B1cmVGdW5jdGlvbigpKSB7XG4gICAgICB2YXIgY29uZGl0aW9uID0gci5hcmdzLm1hcCgoYSkgPT4gdGhpcy5fbmFtZXMuZ2V0Q2hhbmdlTmFtZShhKSkuam9pbihcIiB8fCBcIik7XG4gICAgICBpZiAoci5pc1VzZWRCeU90aGVyUmVjb3JkKCkpIHtcbiAgICAgICAgcmV0dXJuIGBpZiAoJHtjb25kaXRpb259KSB7ICR7Z2VuQ29kZX0gfSBlbHNlIHsgJHtuZXdWYWx1ZX0gPSAke29sZFZhbHVlfTsgfWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYGlmICgke2NvbmRpdGlvbn0pIHsgJHtnZW5Db2RlfSB9YDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGdlbkNvZGU7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZ2VuQ2hhbmdlTWFya2VyKHI6IFByb3RvUmVjb3JkKTogc3RyaW5nIHtcbiAgICByZXR1cm4gci5hcmd1bWVudFRvUHVyZUZ1bmN0aW9uID8gYCR7dGhpcy5fbmFtZXMuZ2V0Q2hhbmdlTmFtZShyLnNlbGZJbmRleCl9ID0gdHJ1ZWAgOiBgYDtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2dlblVwZGF0ZURpcmVjdGl2ZU9yRWxlbWVudChyOiBQcm90b1JlY29yZCk6IHN0cmluZyB7XG4gICAgaWYgKCFyLmxhc3RJbkJpbmRpbmcpIHJldHVybiBcIlwiO1xuXG4gICAgdmFyIG5ld1ZhbHVlID0gdGhpcy5fbmFtZXMuZ2V0TG9jYWxOYW1lKHIuc2VsZkluZGV4KTtcbiAgICB2YXIgbm90aWZ5RGVidWcgPSB0aGlzLmdlbkNvbmZpZy5sb2dCaW5kaW5nVXBkYXRlID8gYHRoaXMubG9nQmluZGluZ1VwZGF0ZSgke25ld1ZhbHVlfSk7YCA6IFwiXCI7XG5cbiAgICB2YXIgYnIgPSByLmJpbmRpbmdSZWNvcmQ7XG4gICAgaWYgKGJyLnRhcmdldC5pc0RpcmVjdGl2ZSgpKSB7XG4gICAgICB2YXIgZGlyZWN0aXZlUHJvcGVydHkgPVxuICAgICAgICAgIGAke3RoaXMuX25hbWVzLmdldERpcmVjdGl2ZU5hbWUoYnIuZGlyZWN0aXZlUmVjb3JkLmRpcmVjdGl2ZUluZGV4KX0uJHtici50YXJnZXQubmFtZX1gO1xuICAgICAgcmV0dXJuIGBcbiAgICAgICAgJHtkaXJlY3RpdmVQcm9wZXJ0eX0gPSAke25ld1ZhbHVlfTtcbiAgICAgICAgJHtub3RpZnlEZWJ1Z31cbiAgICAgICAgJHtJU19DSEFOR0VEX0xPQ0FMfSA9IHRydWU7XG4gICAgICBgO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYFxuICAgICAgICB0aGlzLm5vdGlmeURpc3BhdGNoZXIoJHtuZXdWYWx1ZX0pO1xuICAgICAgICAke25vdGlmeURlYnVnfVxuICAgICAgYDtcbiAgICB9XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9nZW5UaHJvd09uQ2hhbmdlQ2hlY2sob2xkVmFsdWU6IHN0cmluZywgbmV3VmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKGFzc2VydGlvbnNFbmFibGVkKCkpIHtcbiAgICAgIHJldHVybiBgXG4gICAgICAgIGlmICh0aHJvd09uQ2hhbmdlICYmICEke3RoaXMuY2hhbmdlRGV0ZWN0aW9uVXRpbFZhck5hbWV9LmRldk1vZGVFcXVhbCgke29sZFZhbHVlfSwgJHtuZXdWYWx1ZX0pKSB7XG4gICAgICAgICAgdGhpcy50aHJvd09uQ2hhbmdlRXJyb3IoJHtvbGRWYWx1ZX0sICR7bmV3VmFsdWV9KTtcbiAgICAgICAgfVxuICAgICAgICBgO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZ2VuQWRkVG9DaGFuZ2VzKHI6IFByb3RvUmVjb3JkKTogc3RyaW5nIHtcbiAgICB2YXIgbmV3VmFsdWUgPSB0aGlzLl9uYW1lcy5nZXRMb2NhbE5hbWUoci5zZWxmSW5kZXgpO1xuICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMuX25hbWVzLmdldEZpZWxkTmFtZShyLnNlbGZJbmRleCk7XG4gICAgaWYgKCFyLmJpbmRpbmdSZWNvcmQuY2FsbE9uQ2hhbmdlcygpKSByZXR1cm4gXCJcIjtcbiAgICByZXR1cm4gYCR7Q0hBTkdFU19MT0NBTH0gPSB0aGlzLmFkZENoYW5nZSgke0NIQU5HRVNfTE9DQUx9LCAke29sZFZhbHVlfSwgJHtuZXdWYWx1ZX0pO2A7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9tYXliZUZpcnN0SW5CaW5kaW5nKHI6IFByb3RvUmVjb3JkKTogc3RyaW5nIHtcbiAgICB2YXIgcHJldiA9IENoYW5nZURldGVjdGlvblV0aWwucHJvdG9CeUluZGV4KHRoaXMucmVjb3Jkcywgci5zZWxmSW5kZXggLSAxKTtcbiAgICB2YXIgZmlyc3RJbkJpbmRpbmcgPSBpc0JsYW5rKHByZXYpIHx8IHByZXYuYmluZGluZ1JlY29yZCAhPT0gci5iaW5kaW5nUmVjb3JkO1xuICAgIHJldHVybiBmaXJzdEluQmluZGluZyAmJiAhci5iaW5kaW5nUmVjb3JkLmlzRGlyZWN0aXZlTGlmZWN5Y2xlKCkgP1xuICAgICAgICAgICAgICAgYCR7dGhpcy5fbmFtZXMuZ2V0UHJvcGVydHlCaW5kaW5nSW5kZXgoKX0gPSAke3IucHJvcGVydHlCaW5kaW5nSW5kZXh9O2AgOlxuICAgICAgICAgICAgICAgJyc7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9tYXliZUdlbkxhc3RJbkRpcmVjdGl2ZShyOiBQcm90b1JlY29yZCk6IHN0cmluZyB7XG4gICAgaWYgKCFyLmxhc3RJbkRpcmVjdGl2ZSkgcmV0dXJuIFwiXCI7XG4gICAgcmV0dXJuIGBcbiAgICAgICR7Q0hBTkdFU19MT0NBTH0gPSBudWxsO1xuICAgICAgJHt0aGlzLl9nZW5Ob3RpZnlPblB1c2hEZXRlY3RvcnMocil9XG4gICAgICAke0lTX0NIQU5HRURfTE9DQUx9ID0gZmFsc2U7XG4gICAgYDtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2dlbk9uQ2hlY2socjogUHJvdG9SZWNvcmQpOiBzdHJpbmcge1xuICAgIHZhciBiciA9IHIuYmluZGluZ1JlY29yZDtcbiAgICByZXR1cm4gYGlmICghdGhyb3dPbkNoYW5nZSkgJHt0aGlzLl9uYW1lcy5nZXREaXJlY3RpdmVOYW1lKGJyLmRpcmVjdGl2ZVJlY29yZC5kaXJlY3RpdmVJbmRleCl9Lm5nRG9DaGVjaygpO2A7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9nZW5PbkluaXQocjogUHJvdG9SZWNvcmQpOiBzdHJpbmcge1xuICAgIHZhciBiciA9IHIuYmluZGluZ1JlY29yZDtcbiAgICByZXR1cm4gYGlmICghdGhyb3dPbkNoYW5nZSAmJiAke3RoaXMuX25hbWVzLmdldFN0YXRlTmFtZSgpfSA9PT0gJHt0aGlzLmNoYW5nZURldGVjdG9yU3RhdGVWYXJOYW1lfS5OZXZlckNoZWNrZWQpICR7dGhpcy5fbmFtZXMuZ2V0RGlyZWN0aXZlTmFtZShici5kaXJlY3RpdmVSZWNvcmQuZGlyZWN0aXZlSW5kZXgpfS5uZ09uSW5pdCgpO2A7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9nZW5PbkNoYW5nZShyOiBQcm90b1JlY29yZCk6IHN0cmluZyB7XG4gICAgdmFyIGJyID0gci5iaW5kaW5nUmVjb3JkO1xuICAgIHJldHVybiBgaWYgKCF0aHJvd09uQ2hhbmdlICYmICR7Q0hBTkdFU19MT0NBTH0pICR7dGhpcy5fbmFtZXMuZ2V0RGlyZWN0aXZlTmFtZShici5kaXJlY3RpdmVSZWNvcmQuZGlyZWN0aXZlSW5kZXgpfS5uZ09uQ2hhbmdlcygke0NIQU5HRVNfTE9DQUx9KTtgO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZ2VuTm90aWZ5T25QdXNoRGV0ZWN0b3JzKHI6IFByb3RvUmVjb3JkKTogc3RyaW5nIHtcbiAgICB2YXIgYnIgPSByLmJpbmRpbmdSZWNvcmQ7XG4gICAgaWYgKCFyLmxhc3RJbkRpcmVjdGl2ZSB8fCBici5pc0RlZmF1bHRDaGFuZ2VEZXRlY3Rpb24oKSkgcmV0dXJuIFwiXCI7XG4gICAgdmFyIHJldFZhbCA9IGBcbiAgICAgIGlmKCR7SVNfQ0hBTkdFRF9MT0NBTH0pIHtcbiAgICAgICAgJHt0aGlzLl9uYW1lcy5nZXREZXRlY3Rvck5hbWUoYnIuZGlyZWN0aXZlUmVjb3JkLmRpcmVjdGl2ZUluZGV4KX0ubWFya0FzQ2hlY2tPbmNlKCk7XG4gICAgICB9XG4gICAgYDtcbiAgICByZXR1cm4gcmV0VmFsO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
