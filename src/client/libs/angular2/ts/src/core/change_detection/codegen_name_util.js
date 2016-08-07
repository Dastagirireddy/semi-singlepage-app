System.register(['angular2/src/facade/lang', 'angular2/src/facade/collection'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, collection_1;
    var _STATE_ACCESSOR, _CONTEXT_ACCESSOR, _PROP_BINDING_INDEX, _DIRECTIVES_ACCESSOR, _DISPATCHER_ACCESSOR, _LOCALS_ACCESSOR, _MODE_ACCESSOR, _PIPES_ACCESSOR, _PROTOS_ACCESSOR, CONTEXT_ACCESSOR, CONTEXT_INDEX, _FIELD_PREFIX, _whiteSpaceRegExp, CodegenNameUtil;
    /**
     * Returns `s` with all non-identifier characters removed.
     */
    function sanitizeName(s) {
        return lang_1.StringWrapper.replaceAll(s, _whiteSpaceRegExp, '');
    }
    exports_1("sanitizeName", sanitizeName);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            }],
        execute: function() {
            // The names of these fields must be kept in sync with abstract_change_detector.ts or change
            // detection will fail.
            _STATE_ACCESSOR = "state";
            _CONTEXT_ACCESSOR = "context";
            _PROP_BINDING_INDEX = "propertyBindingIndex";
            _DIRECTIVES_ACCESSOR = "directiveIndices";
            _DISPATCHER_ACCESSOR = "dispatcher";
            _LOCALS_ACCESSOR = "locals";
            _MODE_ACCESSOR = "mode";
            _PIPES_ACCESSOR = "pipes";
            _PROTOS_ACCESSOR = "protos";
            exports_1("CONTEXT_ACCESSOR", CONTEXT_ACCESSOR = "context");
            // `context` is always first.
            exports_1("CONTEXT_INDEX", CONTEXT_INDEX = 0);
            _FIELD_PREFIX = 'this.';
            _whiteSpaceRegExp = /\W/g;
            /**
             * Class responsible for providing field and local variable names for change detector classes.
             * Also provides some convenience functions, for example, declaring variables, destroying pipes,
             * and dehydrating the detector.
             */
            CodegenNameUtil = (function () {
                function CodegenNameUtil(_records, _eventBindings, _directiveRecords, _utilName) {
                    this._records = _records;
                    this._eventBindings = _eventBindings;
                    this._directiveRecords = _directiveRecords;
                    this._utilName = _utilName;
                    /** @internal */
                    this._sanitizedEventNames = new collection_1.Map();
                    this._sanitizedNames = collection_1.ListWrapper.createFixedSize(this._records.length + 1);
                    this._sanitizedNames[CONTEXT_INDEX] = CONTEXT_ACCESSOR;
                    for (var i = 0, iLen = this._records.length; i < iLen; ++i) {
                        this._sanitizedNames[i + 1] = sanitizeName("" + this._records[i].name + i);
                    }
                    for (var ebIndex = 0; ebIndex < _eventBindings.length; ++ebIndex) {
                        var eb = _eventBindings[ebIndex];
                        var names = [CONTEXT_ACCESSOR];
                        for (var i = 0, iLen = eb.records.length; i < iLen; ++i) {
                            names.push(sanitizeName("" + eb.records[i].name + i + "_" + ebIndex));
                        }
                        this._sanitizedEventNames.set(eb, names);
                    }
                }
                /** @internal */
                CodegenNameUtil.prototype._addFieldPrefix = function (name) { return "" + _FIELD_PREFIX + name; };
                CodegenNameUtil.prototype.getDispatcherName = function () { return this._addFieldPrefix(_DISPATCHER_ACCESSOR); };
                CodegenNameUtil.prototype.getPipesAccessorName = function () { return this._addFieldPrefix(_PIPES_ACCESSOR); };
                CodegenNameUtil.prototype.getProtosName = function () { return this._addFieldPrefix(_PROTOS_ACCESSOR); };
                CodegenNameUtil.prototype.getDirectivesAccessorName = function () { return this._addFieldPrefix(_DIRECTIVES_ACCESSOR); };
                CodegenNameUtil.prototype.getLocalsAccessorName = function () { return this._addFieldPrefix(_LOCALS_ACCESSOR); };
                CodegenNameUtil.prototype.getStateName = function () { return this._addFieldPrefix(_STATE_ACCESSOR); };
                CodegenNameUtil.prototype.getModeName = function () { return this._addFieldPrefix(_MODE_ACCESSOR); };
                CodegenNameUtil.prototype.getPropertyBindingIndex = function () { return this._addFieldPrefix(_PROP_BINDING_INDEX); };
                CodegenNameUtil.prototype.getLocalName = function (idx) { return "l_" + this._sanitizedNames[idx]; };
                CodegenNameUtil.prototype.getEventLocalName = function (eb, idx) {
                    return "l_" + this._sanitizedEventNames.get(eb)[idx];
                };
                CodegenNameUtil.prototype.getChangeName = function (idx) { return "c_" + this._sanitizedNames[idx]; };
                /**
                 * Generate a statement initializing local variables used when detecting changes.
                 */
                CodegenNameUtil.prototype.genInitLocals = function () {
                    var declarations = [];
                    var assignments = [];
                    for (var i = 0, iLen = this.getFieldCount(); i < iLen; ++i) {
                        if (i == CONTEXT_INDEX) {
                            declarations.push(this.getLocalName(i) + " = " + this.getFieldName(i));
                        }
                        else {
                            var rec = this._records[i - 1];
                            if (rec.argumentToPureFunction) {
                                var changeName = this.getChangeName(i);
                                declarations.push(this.getLocalName(i) + "," + changeName);
                                assignments.push(changeName);
                            }
                            else {
                                declarations.push("" + this.getLocalName(i));
                            }
                        }
                    }
                    var assignmentsCode = collection_1.ListWrapper.isEmpty(assignments) ? '' : assignments.join('=') + " = false;";
                    return "var " + declarations.join(',') + ";" + assignmentsCode;
                };
                /**
                 * Generate a statement initializing local variables for event handlers.
                 */
                CodegenNameUtil.prototype.genInitEventLocals = function () {
                    var _this = this;
                    var res = [(this.getLocalName(CONTEXT_INDEX) + " = " + this.getFieldName(CONTEXT_INDEX))];
                    this._sanitizedEventNames.forEach(function (names, eb) {
                        for (var i = 0; i < names.length; ++i) {
                            if (i !== CONTEXT_INDEX) {
                                res.push("" + _this.getEventLocalName(eb, i));
                            }
                        }
                    });
                    return res.length > 1 ? "var " + res.join(',') + ";" : '';
                };
                CodegenNameUtil.prototype.getPreventDefaultAccesor = function () { return "preventDefault"; };
                CodegenNameUtil.prototype.getFieldCount = function () { return this._sanitizedNames.length; };
                CodegenNameUtil.prototype.getFieldName = function (idx) { return this._addFieldPrefix(this._sanitizedNames[idx]); };
                CodegenNameUtil.prototype.getAllFieldNames = function () {
                    var fieldList = [];
                    for (var k = 0, kLen = this.getFieldCount(); k < kLen; ++k) {
                        if (k === 0 || this._records[k - 1].shouldBeChecked()) {
                            fieldList.push(this.getFieldName(k));
                        }
                    }
                    for (var i = 0, iLen = this._records.length; i < iLen; ++i) {
                        var rec = this._records[i];
                        if (rec.isPipeRecord()) {
                            fieldList.push(this.getPipeName(rec.selfIndex));
                        }
                    }
                    for (var j = 0, jLen = this._directiveRecords.length; j < jLen; ++j) {
                        var dRec = this._directiveRecords[j];
                        fieldList.push(this.getDirectiveName(dRec.directiveIndex));
                        if (!dRec.isDefaultChangeDetection()) {
                            fieldList.push(this.getDetectorName(dRec.directiveIndex));
                        }
                    }
                    return fieldList;
                };
                /**
                 * Generates statements which clear all fields so that the change detector is dehydrated.
                 */
                CodegenNameUtil.prototype.genDehydrateFields = function () {
                    var fields = this.getAllFieldNames();
                    collection_1.ListWrapper.removeAt(fields, CONTEXT_INDEX);
                    if (collection_1.ListWrapper.isEmpty(fields))
                        return '';
                    // At least one assignment.
                    fields.push(this._utilName + ".uninitialized;");
                    return fields.join(' = ');
                };
                /**
                 * Generates statements destroying all pipe variables.
                 */
                CodegenNameUtil.prototype.genPipeOnDestroy = function () {
                    var _this = this;
                    return this._records.filter(function (r) { return r.isPipeRecord(); })
                        .map(function (r) { return (_this._utilName + ".callPipeOnDestroy(" + _this.getPipeName(r.selfIndex) + ");"); })
                        .join('\n');
                };
                CodegenNameUtil.prototype.getPipeName = function (idx) {
                    return this._addFieldPrefix(this._sanitizedNames[idx] + "_pipe");
                };
                CodegenNameUtil.prototype.getDirectiveName = function (d) {
                    return this._addFieldPrefix("directive_" + d.name);
                };
                CodegenNameUtil.prototype.getDetectorName = function (d) { return this._addFieldPrefix("detector_" + d.name); };
                return CodegenNameUtil;
            }());
            exports_1("CodegenNameUtil", CodegenNameUtil);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9jb2RlZ2VuX25hbWVfdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBVU0sZUFBZSxFQUNmLGlCQUFpQixFQUNqQixtQkFBbUIsRUFDbkIsb0JBQW9CLEVBQ3BCLG9CQUFvQixFQUNwQixnQkFBZ0IsRUFDaEIsY0FBYyxFQUNkLGVBQWUsRUFDZixnQkFBZ0IsRUFDVCxnQkFBZ0IsRUFHaEIsYUFBYSxFQUNwQixhQUFhLEVBRWYsaUJBQWlCO0lBRXJCOztPQUVHO0lBQ0gsc0JBQTZCLENBQVM7UUFDcEMsTUFBTSxDQUFDLG9CQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRkQsdUNBRUMsQ0FBQTs7Ozs7Ozs7OztZQXhCRCw0RkFBNEY7WUFDNUYsdUJBQXVCO1lBQ2pCLGVBQWUsR0FBRyxPQUFPLENBQUM7WUFDMUIsaUJBQWlCLEdBQUcsU0FBUyxDQUFDO1lBQzlCLG1CQUFtQixHQUFHLHNCQUFzQixDQUFDO1lBQzdDLG9CQUFvQixHQUFHLGtCQUFrQixDQUFDO1lBQzFDLG9CQUFvQixHQUFHLFlBQVksQ0FBQztZQUNwQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUM7WUFDNUIsY0FBYyxHQUFHLE1BQU0sQ0FBQztZQUN4QixlQUFlLEdBQUcsT0FBTyxDQUFDO1lBQzFCLGdCQUFnQixHQUFHLFFBQVEsQ0FBQztZQUNyQiw4QkFBQSxnQkFBZ0IsR0FBRyxTQUFTLENBQUEsQ0FBQztZQUUxQyw2QkFBNkI7WUFDaEIsMkJBQUEsYUFBYSxHQUFHLENBQUMsQ0FBQSxDQUFDO1lBQ3pCLGFBQWEsR0FBRyxPQUFPLENBQUM7WUFFMUIsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1lBUzlCOzs7O2VBSUc7WUFDSDtnQkFVRSx5QkFBb0IsUUFBdUIsRUFBVSxjQUE4QixFQUMvRCxp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SkMsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vY29kZWdlbl9uYW1lX3V0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlZ0V4cFdyYXBwZXIsIFN0cmluZ1dyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0xpc3RXcmFwcGVyLCBNYXBXcmFwcGVyLCBNYXB9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5cbmltcG9ydCB7RGlyZWN0aXZlSW5kZXh9IGZyb20gJy4vZGlyZWN0aXZlX3JlY29yZCc7XG5cbmltcG9ydCB7UHJvdG9SZWNvcmR9IGZyb20gJy4vcHJvdG9fcmVjb3JkJztcbmltcG9ydCB7RXZlbnRCaW5kaW5nfSBmcm9tICcuL2V2ZW50X2JpbmRpbmcnO1xuXG4vLyBUaGUgbmFtZXMgb2YgdGhlc2UgZmllbGRzIG11c3QgYmUga2VwdCBpbiBzeW5jIHdpdGggYWJzdHJhY3RfY2hhbmdlX2RldGVjdG9yLnRzIG9yIGNoYW5nZVxuLy8gZGV0ZWN0aW9uIHdpbGwgZmFpbC5cbmNvbnN0IF9TVEFURV9BQ0NFU1NPUiA9IFwic3RhdGVcIjtcbmNvbnN0IF9DT05URVhUX0FDQ0VTU09SID0gXCJjb250ZXh0XCI7XG5jb25zdCBfUFJPUF9CSU5ESU5HX0lOREVYID0gXCJwcm9wZXJ0eUJpbmRpbmdJbmRleFwiO1xuY29uc3QgX0RJUkVDVElWRVNfQUNDRVNTT1IgPSBcImRpcmVjdGl2ZUluZGljZXNcIjtcbmNvbnN0IF9ESVNQQVRDSEVSX0FDQ0VTU09SID0gXCJkaXNwYXRjaGVyXCI7XG5jb25zdCBfTE9DQUxTX0FDQ0VTU09SID0gXCJsb2NhbHNcIjtcbmNvbnN0IF9NT0RFX0FDQ0VTU09SID0gXCJtb2RlXCI7XG5jb25zdCBfUElQRVNfQUNDRVNTT1IgPSBcInBpcGVzXCI7XG5jb25zdCBfUFJPVE9TX0FDQ0VTU09SID0gXCJwcm90b3NcIjtcbmV4cG9ydCBjb25zdCBDT05URVhUX0FDQ0VTU09SID0gXCJjb250ZXh0XCI7XG5cbi8vIGBjb250ZXh0YCBpcyBhbHdheXMgZmlyc3QuXG5leHBvcnQgY29uc3QgQ09OVEVYVF9JTkRFWCA9IDA7XG5jb25zdCBfRklFTERfUFJFRklYID0gJ3RoaXMuJztcblxudmFyIF93aGl0ZVNwYWNlUmVnRXhwID0gL1xcVy9nO1xuXG4vKipcbiAqIFJldHVybnMgYHNgIHdpdGggYWxsIG5vbi1pZGVudGlmaWVyIGNoYXJhY3RlcnMgcmVtb3ZlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhbml0aXplTmFtZShzOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsKHMsIF93aGl0ZVNwYWNlUmVnRXhwLCAnJyk7XG59XG5cbi8qKlxuICogQ2xhc3MgcmVzcG9uc2libGUgZm9yIHByb3ZpZGluZyBmaWVsZCBhbmQgbG9jYWwgdmFyaWFibGUgbmFtZXMgZm9yIGNoYW5nZSBkZXRlY3RvciBjbGFzc2VzLlxuICogQWxzbyBwcm92aWRlcyBzb21lIGNvbnZlbmllbmNlIGZ1bmN0aW9ucywgZm9yIGV4YW1wbGUsIGRlY2xhcmluZyB2YXJpYWJsZXMsIGRlc3Ryb3lpbmcgcGlwZXMsXG4gKiBhbmQgZGVoeWRyYXRpbmcgdGhlIGRldGVjdG9yLlxuICovXG5leHBvcnQgY2xhc3MgQ29kZWdlbk5hbWVVdGlsIHtcbiAgLyoqXG4gICAqIFJlY29yZCBuYW1lcyBzYW5pdGl6ZWQgZm9yIHVzZSBhcyBmaWVsZHMuXG4gICAqIFNlZSBbc2FuaXRpemVOYW1lXSBmb3IgZGV0YWlscy5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBfc2FuaXRpemVkTmFtZXM6IHN0cmluZ1tdO1xuICAvKiogQGludGVybmFsICovXG4gIF9zYW5pdGl6ZWRFdmVudE5hbWVzID0gbmV3IE1hcDxFdmVudEJpbmRpbmcsIHN0cmluZ1tdPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JlY29yZHM6IFByb3RvUmVjb3JkW10sIHByaXZhdGUgX2V2ZW50QmluZGluZ3M6IEV2ZW50QmluZGluZ1tdLFxuICAgICAgICAgICAgICBwcml2YXRlIF9kaXJlY3RpdmVSZWNvcmRzOiBhbnlbXSwgcHJpdmF0ZSBfdXRpbE5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuX3Nhbml0aXplZE5hbWVzID0gTGlzdFdyYXBwZXIuY3JlYXRlRml4ZWRTaXplKHRoaXMuX3JlY29yZHMubGVuZ3RoICsgMSk7XG4gICAgdGhpcy5fc2FuaXRpemVkTmFtZXNbQ09OVEVYVF9JTkRFWF0gPSBDT05URVhUX0FDQ0VTU09SO1xuICAgIGZvciAodmFyIGkgPSAwLCBpTGVuID0gdGhpcy5fcmVjb3Jkcy5sZW5ndGg7IGkgPCBpTGVuOyArK2kpIHtcbiAgICAgIHRoaXMuX3Nhbml0aXplZE5hbWVzW2kgKyAxXSA9IHNhbml0aXplTmFtZShgJHt0aGlzLl9yZWNvcmRzW2ldLm5hbWV9JHtpfWApO1xuICAgIH1cblxuICAgIGZvciAodmFyIGViSW5kZXggPSAwOyBlYkluZGV4IDwgX2V2ZW50QmluZGluZ3MubGVuZ3RoOyArK2ViSW5kZXgpIHtcbiAgICAgIHZhciBlYiA9IF9ldmVudEJpbmRpbmdzW2ViSW5kZXhdO1xuICAgICAgdmFyIG5hbWVzID0gW0NPTlRFWFRfQUNDRVNTT1JdO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGlMZW4gPSBlYi5yZWNvcmRzLmxlbmd0aDsgaSA8IGlMZW47ICsraSkge1xuICAgICAgICBuYW1lcy5wdXNoKHNhbml0aXplTmFtZShgJHtlYi5yZWNvcmRzW2ldLm5hbWV9JHtpfV8ke2ViSW5kZXh9YCkpO1xuICAgICAgfVxuICAgICAgdGhpcy5fc2FuaXRpemVkRXZlbnROYW1lcy5zZXQoZWIsIG5hbWVzKTtcbiAgICB9XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9hZGRGaWVsZFByZWZpeChuYW1lOiBzdHJpbmcpOiBzdHJpbmcgeyByZXR1cm4gYCR7X0ZJRUxEX1BSRUZJWH0ke25hbWV9YDsgfVxuXG4gIGdldERpc3BhdGNoZXJOYW1lKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9hZGRGaWVsZFByZWZpeChfRElTUEFUQ0hFUl9BQ0NFU1NPUik7IH1cblxuICBnZXRQaXBlc0FjY2Vzc29yTmFtZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fYWRkRmllbGRQcmVmaXgoX1BJUEVTX0FDQ0VTU09SKTsgfVxuXG4gIGdldFByb3Rvc05hbWUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2FkZEZpZWxkUHJlZml4KF9QUk9UT1NfQUNDRVNTT1IpOyB9XG5cbiAgZ2V0RGlyZWN0aXZlc0FjY2Vzc29yTmFtZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fYWRkRmllbGRQcmVmaXgoX0RJUkVDVElWRVNfQUNDRVNTT1IpOyB9XG5cbiAgZ2V0TG9jYWxzQWNjZXNzb3JOYW1lKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9hZGRGaWVsZFByZWZpeChfTE9DQUxTX0FDQ0VTU09SKTsgfVxuXG4gIGdldFN0YXRlTmFtZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fYWRkRmllbGRQcmVmaXgoX1NUQVRFX0FDQ0VTU09SKTsgfVxuXG4gIGdldE1vZGVOYW1lKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9hZGRGaWVsZFByZWZpeChfTU9ERV9BQ0NFU1NPUik7IH1cblxuICBnZXRQcm9wZXJ0eUJpbmRpbmdJbmRleCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fYWRkRmllbGRQcmVmaXgoX1BST1BfQklORElOR19JTkRFWCk7IH1cblxuICBnZXRMb2NhbE5hbWUoaWR4OiBudW1iZXIpOiBzdHJpbmcgeyByZXR1cm4gYGxfJHt0aGlzLl9zYW5pdGl6ZWROYW1lc1tpZHhdfWA7IH1cblxuICBnZXRFdmVudExvY2FsTmFtZShlYjogRXZlbnRCaW5kaW5nLCBpZHg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBsXyR7dGhpcy5fc2FuaXRpemVkRXZlbnROYW1lcy5nZXQoZWIpW2lkeF19YDtcbiAgfVxuXG4gIGdldENoYW5nZU5hbWUoaWR4OiBudW1iZXIpOiBzdHJpbmcgeyByZXR1cm4gYGNfJHt0aGlzLl9zYW5pdGl6ZWROYW1lc1tpZHhdfWA7IH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgYSBzdGF0ZW1lbnQgaW5pdGlhbGl6aW5nIGxvY2FsIHZhcmlhYmxlcyB1c2VkIHdoZW4gZGV0ZWN0aW5nIGNoYW5nZXMuXG4gICAqL1xuICBnZW5Jbml0TG9jYWxzKCk6IHN0cmluZyB7XG4gICAgdmFyIGRlY2xhcmF0aW9ucyA9IFtdO1xuICAgIHZhciBhc3NpZ25tZW50cyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBpTGVuID0gdGhpcy5nZXRGaWVsZENvdW50KCk7IGkgPCBpTGVuOyArK2kpIHtcbiAgICAgIGlmIChpID09IENPTlRFWFRfSU5ERVgpIHtcbiAgICAgICAgZGVjbGFyYXRpb25zLnB1c2goYCR7dGhpcy5nZXRMb2NhbE5hbWUoaSl9ID0gJHt0aGlzLmdldEZpZWxkTmFtZShpKX1gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZWMgPSB0aGlzLl9yZWNvcmRzW2kgLSAxXTtcbiAgICAgICAgaWYgKHJlYy5hcmd1bWVudFRvUHVyZUZ1bmN0aW9uKSB7XG4gICAgICAgICAgdmFyIGNoYW5nZU5hbWUgPSB0aGlzLmdldENoYW5nZU5hbWUoaSk7XG4gICAgICAgICAgZGVjbGFyYXRpb25zLnB1c2goYCR7dGhpcy5nZXRMb2NhbE5hbWUoaSl9LCR7Y2hhbmdlTmFtZX1gKTtcbiAgICAgICAgICBhc3NpZ25tZW50cy5wdXNoKGNoYW5nZU5hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlY2xhcmF0aW9ucy5wdXNoKGAke3RoaXMuZ2V0TG9jYWxOYW1lKGkpfWApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBhc3NpZ25tZW50c0NvZGUgPVxuICAgICAgICBMaXN0V3JhcHBlci5pc0VtcHR5KGFzc2lnbm1lbnRzKSA/ICcnIDogYCR7YXNzaWdubWVudHMuam9pbignPScpfSA9IGZhbHNlO2A7XG4gICAgcmV0dXJuIGB2YXIgJHtkZWNsYXJhdGlvbnMuam9pbignLCcpfTske2Fzc2lnbm1lbnRzQ29kZX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIGEgc3RhdGVtZW50IGluaXRpYWxpemluZyBsb2NhbCB2YXJpYWJsZXMgZm9yIGV2ZW50IGhhbmRsZXJzLlxuICAgKi9cbiAgZ2VuSW5pdEV2ZW50TG9jYWxzKCk6IHN0cmluZyB7XG4gICAgdmFyIHJlcyA9IFtgJHt0aGlzLmdldExvY2FsTmFtZShDT05URVhUX0lOREVYKX0gPSAke3RoaXMuZ2V0RmllbGROYW1lKENPTlRFWFRfSU5ERVgpfWBdO1xuICAgIHRoaXMuX3Nhbml0aXplZEV2ZW50TmFtZXMuZm9yRWFjaCgobmFtZXMsIGViKSA9PiB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChpICE9PSBDT05URVhUX0lOREVYKSB7XG4gICAgICAgICAgcmVzLnB1c2goYCR7dGhpcy5nZXRFdmVudExvY2FsTmFtZShlYiwgaSl9YCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzLmxlbmd0aCA+IDEgPyBgdmFyICR7cmVzLmpvaW4oJywnKX07YCA6ICcnO1xuICB9XG5cbiAgZ2V0UHJldmVudERlZmF1bHRBY2Nlc29yKCk6IHN0cmluZyB7IHJldHVybiBcInByZXZlbnREZWZhdWx0XCI7IH1cblxuICBnZXRGaWVsZENvdW50KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9zYW5pdGl6ZWROYW1lcy5sZW5ndGg7IH1cblxuICBnZXRGaWVsZE5hbWUoaWR4OiBudW1iZXIpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fYWRkRmllbGRQcmVmaXgodGhpcy5fc2FuaXRpemVkTmFtZXNbaWR4XSk7IH1cblxuICBnZXRBbGxGaWVsZE5hbWVzKCk6IHN0cmluZ1tdIHtcbiAgICB2YXIgZmllbGRMaXN0ID0gW107XG4gICAgZm9yICh2YXIgayA9IDAsIGtMZW4gPSB0aGlzLmdldEZpZWxkQ291bnQoKTsgayA8IGtMZW47ICsraykge1xuICAgICAgaWYgKGsgPT09IDAgfHwgdGhpcy5fcmVjb3Jkc1trIC0gMV0uc2hvdWxkQmVDaGVja2VkKCkpIHtcbiAgICAgICAgZmllbGRMaXN0LnB1c2godGhpcy5nZXRGaWVsZE5hbWUoaykpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwLCBpTGVuID0gdGhpcy5fcmVjb3Jkcy5sZW5ndGg7IGkgPCBpTGVuOyArK2kpIHtcbiAgICAgIHZhciByZWMgPSB0aGlzLl9yZWNvcmRzW2ldO1xuICAgICAgaWYgKHJlYy5pc1BpcGVSZWNvcmQoKSkge1xuICAgICAgICBmaWVsZExpc3QucHVzaCh0aGlzLmdldFBpcGVOYW1lKHJlYy5zZWxmSW5kZXgpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBqID0gMCwgakxlbiA9IHRoaXMuX2RpcmVjdGl2ZVJlY29yZHMubGVuZ3RoOyBqIDwgakxlbjsgKytqKSB7XG4gICAgICB2YXIgZFJlYyA9IHRoaXMuX2RpcmVjdGl2ZVJlY29yZHNbal07XG4gICAgICBmaWVsZExpc3QucHVzaCh0aGlzLmdldERpcmVjdGl2ZU5hbWUoZFJlYy5kaXJlY3RpdmVJbmRleCkpO1xuICAgICAgaWYgKCFkUmVjLmlzRGVmYXVsdENoYW5nZURldGVjdGlvbigpKSB7XG4gICAgICAgIGZpZWxkTGlzdC5wdXNoKHRoaXMuZ2V0RGV0ZWN0b3JOYW1lKGRSZWMuZGlyZWN0aXZlSW5kZXgpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZpZWxkTGlzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgc3RhdGVtZW50cyB3aGljaCBjbGVhciBhbGwgZmllbGRzIHNvIHRoYXQgdGhlIGNoYW5nZSBkZXRlY3RvciBpcyBkZWh5ZHJhdGVkLlxuICAgKi9cbiAgZ2VuRGVoeWRyYXRlRmllbGRzKCk6IHN0cmluZyB7XG4gICAgdmFyIGZpZWxkcyA9IHRoaXMuZ2V0QWxsRmllbGROYW1lcygpO1xuICAgIExpc3RXcmFwcGVyLnJlbW92ZUF0KGZpZWxkcywgQ09OVEVYVF9JTkRFWCk7XG4gICAgaWYgKExpc3RXcmFwcGVyLmlzRW1wdHkoZmllbGRzKSkgcmV0dXJuICcnO1xuXG4gICAgLy8gQXQgbGVhc3Qgb25lIGFzc2lnbm1lbnQuXG4gICAgZmllbGRzLnB1c2goYCR7dGhpcy5fdXRpbE5hbWV9LnVuaW5pdGlhbGl6ZWQ7YCk7XG4gICAgcmV0dXJuIGZpZWxkcy5qb2luKCcgPSAnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgc3RhdGVtZW50cyBkZXN0cm95aW5nIGFsbCBwaXBlIHZhcmlhYmxlcy5cbiAgICovXG4gIGdlblBpcGVPbkRlc3Ryb3koKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fcmVjb3Jkcy5maWx0ZXIociA9PiByLmlzUGlwZVJlY29yZCgpKVxuICAgICAgICAubWFwKHIgPT4gYCR7dGhpcy5fdXRpbE5hbWV9LmNhbGxQaXBlT25EZXN0cm95KCR7dGhpcy5nZXRQaXBlTmFtZShyLnNlbGZJbmRleCl9KTtgKVxuICAgICAgICAuam9pbignXFxuJyk7XG4gIH1cblxuICBnZXRQaXBlTmFtZShpZHg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2FkZEZpZWxkUHJlZml4KGAke3RoaXMuX3Nhbml0aXplZE5hbWVzW2lkeF19X3BpcGVgKTtcbiAgfVxuXG4gIGdldERpcmVjdGl2ZU5hbWUoZDogRGlyZWN0aXZlSW5kZXgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9hZGRGaWVsZFByZWZpeChgZGlyZWN0aXZlXyR7ZC5uYW1lfWApO1xuICB9XG5cbiAgZ2V0RGV0ZWN0b3JOYW1lKGQ6IERpcmVjdGl2ZUluZGV4KTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2FkZEZpZWxkUHJlZml4KGBkZXRlY3Rvcl8ke2QubmFtZX1gKTsgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
