System.register(['angular2/src/facade/lang', '../compile_metadata', 'angular2/src/core/change_detection/change_detection', 'angular2/src/core/metadata/view', 'angular2/src/core/linker/view_type', '../output/output_ast', '../identifiers'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, compile_metadata_1, change_detection_1, view_1, view_type_1, o, identifiers_1;
    var ViewTypeEnum, ViewEncapsulationEnum, ChangeDetectorStateEnum, ChangeDetectionStrategyEnum, ViewConstructorVars, ViewProperties, EventHandlerVars, InjectMethodVars, DetectChangesVars;
    function _enumExpression(classIdentifier, value) {
        if (lang_1.isBlank(value))
            return o.NULL_EXPR;
        var name = lang_1.resolveEnumToken(classIdentifier.runtime, value);
        return o.importExpr(new compile_metadata_1.CompileIdentifierMetadata({
            name: classIdentifier.name + "." + name,
            moduleUrl: classIdentifier.moduleUrl,
            runtime: value
        }));
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (compile_metadata_1_1) {
                compile_metadata_1 = compile_metadata_1_1;
            },
            function (change_detection_1_1) {
                change_detection_1 = change_detection_1_1;
            },
            function (view_1_1) {
                view_1 = view_1_1;
            },
            function (view_type_1_1) {
                view_type_1 = view_type_1_1;
            },
            function (o_1) {
                o = o_1;
            },
            function (identifiers_1_1) {
                identifiers_1 = identifiers_1_1;
            }],
        execute: function() {
            ViewTypeEnum = (function () {
                function ViewTypeEnum() {
                }
                ViewTypeEnum.fromValue = function (value) {
                    return _enumExpression(identifiers_1.Identifiers.ViewType, value);
                };
                ViewTypeEnum.HOST = ViewTypeEnum.fromValue(view_type_1.ViewType.HOST);
                ViewTypeEnum.COMPONENT = ViewTypeEnum.fromValue(view_type_1.ViewType.COMPONENT);
                ViewTypeEnum.EMBEDDED = ViewTypeEnum.fromValue(view_type_1.ViewType.EMBEDDED);
                return ViewTypeEnum;
            }());
            exports_1("ViewTypeEnum", ViewTypeEnum);
            ViewEncapsulationEnum = (function () {
                function ViewEncapsulationEnum() {
                }
                ViewEncapsulationEnum.fromValue = function (value) {
                    return _enumExpression(identifiers_1.Identifiers.ViewEncapsulation, value);
                };
                ViewEncapsulationEnum.Emulated = ViewEncapsulationEnum.fromValue(view_1.ViewEncapsulation.Emulated);
                ViewEncapsulationEnum.Native = ViewEncapsulationEnum.fromValue(view_1.ViewEncapsulation.Native);
                ViewEncapsulationEnum.None = ViewEncapsulationEnum.fromValue(view_1.ViewEncapsulation.None);
                return ViewEncapsulationEnum;
            }());
            exports_1("ViewEncapsulationEnum", ViewEncapsulationEnum);
            ChangeDetectorStateEnum = (function () {
                function ChangeDetectorStateEnum() {
                }
                ChangeDetectorStateEnum.fromValue = function (value) {
                    return _enumExpression(identifiers_1.Identifiers.ChangeDetectorState, value);
                };
                ChangeDetectorStateEnum.NeverChecked = ChangeDetectorStateEnum.fromValue(change_detection_1.ChangeDetectorState.NeverChecked);
                ChangeDetectorStateEnum.CheckedBefore = ChangeDetectorStateEnum.fromValue(change_detection_1.ChangeDetectorState.CheckedBefore);
                ChangeDetectorStateEnum.Errored = ChangeDetectorStateEnum.fromValue(change_detection_1.ChangeDetectorState.Errored);
                return ChangeDetectorStateEnum;
            }());
            exports_1("ChangeDetectorStateEnum", ChangeDetectorStateEnum);
            ChangeDetectionStrategyEnum = (function () {
                function ChangeDetectionStrategyEnum() {
                }
                ChangeDetectionStrategyEnum.fromValue = function (value) {
                    return _enumExpression(identifiers_1.Identifiers.ChangeDetectionStrategy, value);
                };
                ChangeDetectionStrategyEnum.CheckOnce = ChangeDetectionStrategyEnum.fromValue(change_detection_1.ChangeDetectionStrategy.CheckOnce);
                ChangeDetectionStrategyEnum.Checked = ChangeDetectionStrategyEnum.fromValue(change_detection_1.ChangeDetectionStrategy.Checked);
                ChangeDetectionStrategyEnum.CheckAlways = ChangeDetectionStrategyEnum.fromValue(change_detection_1.ChangeDetectionStrategy.CheckAlways);
                ChangeDetectionStrategyEnum.Detached = ChangeDetectionStrategyEnum.fromValue(change_detection_1.ChangeDetectionStrategy.Detached);
                ChangeDetectionStrategyEnum.OnPush = ChangeDetectionStrategyEnum.fromValue(change_detection_1.ChangeDetectionStrategy.OnPush);
                ChangeDetectionStrategyEnum.Default = ChangeDetectionStrategyEnum.fromValue(change_detection_1.ChangeDetectionStrategy.Default);
                return ChangeDetectionStrategyEnum;
            }());
            exports_1("ChangeDetectionStrategyEnum", ChangeDetectionStrategyEnum);
            ViewConstructorVars = (function () {
                function ViewConstructorVars() {
                }
                ViewConstructorVars.viewUtils = o.variable('viewUtils');
                ViewConstructorVars.parentInjector = o.variable('parentInjector');
                ViewConstructorVars.declarationEl = o.variable('declarationEl');
                return ViewConstructorVars;
            }());
            exports_1("ViewConstructorVars", ViewConstructorVars);
            ViewProperties = (function () {
                function ViewProperties() {
                }
                ViewProperties.renderer = o.THIS_EXPR.prop('renderer');
                ViewProperties.projectableNodes = o.THIS_EXPR.prop('projectableNodes');
                ViewProperties.viewUtils = o.THIS_EXPR.prop('viewUtils');
                return ViewProperties;
            }());
            exports_1("ViewProperties", ViewProperties);
            EventHandlerVars = (function () {
                function EventHandlerVars() {
                }
                EventHandlerVars.event = o.variable('$event');
                return EventHandlerVars;
            }());
            exports_1("EventHandlerVars", EventHandlerVars);
            InjectMethodVars = (function () {
                function InjectMethodVars() {
                }
                InjectMethodVars.token = o.variable('token');
                InjectMethodVars.requestNodeIndex = o.variable('requestNodeIndex');
                InjectMethodVars.notFoundResult = o.variable('notFoundResult');
                return InjectMethodVars;
            }());
            exports_1("InjectMethodVars", InjectMethodVars);
            DetectChangesVars = (function () {
                function DetectChangesVars() {
                }
                DetectChangesVars.throwOnChange = o.variable("throwOnChange");
                DetectChangesVars.changes = o.variable("changes");
                DetectChangesVars.changed = o.variable("changed");
                DetectChangesVars.valUnwrapper = o.variable("valUnwrapper");
                return DetectChangesVars;
            }());
            exports_1("DetectChangesVars", DetectChangesVars);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci92aWV3X2NvbXBpbGVyL2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztJQVdBLHlCQUF5QixlQUEwQyxFQUFFLEtBQVU7UUFDN0UsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDdkMsSUFBSSxJQUFJLEdBQUcsdUJBQWdCLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM1RCxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLDRDQUF5QixDQUFDO1lBQ2hELElBQUksRUFBSyxlQUFlLENBQUMsSUFBSSxTQUFJLElBQU07WUFDdkMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxTQUFTO1lBQ3BDLE9BQU8sRUFBRSxLQUFLO1NBQ2YsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBRUQ7Z0JBQUE7Z0JBT0EsQ0FBQztnQkFOUSxzQkFBUyxHQUFoQixVQUFpQixLQUFlO29CQUM5QixNQUFNLENBQUMsZUFBZSxDQUFDLHlCQUFXLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN0RCxDQUFDO2dCQUNNLGlCQUFJLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxvQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM3QyxzQkFBUyxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsb0JBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDdkQscUJBQVEsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLG9CQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzlELG1CQUFDO1lBQUQsQ0FQQSxBQU9DLElBQUE7WUFQRCx1Q0FPQyxDQUFBO1lBRUQ7Z0JBQUE7Z0JBT0EsQ0FBQztnQkFOUSwrQkFBUyxH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QUFBO2dCQUFxRSxDQUFDO2dCQUEvQixzQkFBSyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQUMsdUJBQUM7WUFBRCxDQUFyRSxBQUFzRSxJQUFBO1lBQXRFLCtDQUFzRSxDQUFBO1lBRXRFO2dCQUFBO2dCQUlBLENBQUM7Z0JBSFEsc0JBQUssR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM1QixpQ0FBZ0IsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQ2xELCtCQUFjLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUN2RCx1QkFBQztZQUFELENBSkEsQUFJQyxJQUFBO1lBSkQsK0NBSUMsQ0FBQTtZQUVEO2dCQUFBO2dCQUtBLENBQUM7Z0JBSlEsK0JBQWEsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUM1Qyx5QkFBTyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2hDLHlCQUFPLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDaEMsOEJBQVksR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUNuRCx3QkFBQztZQUFELENBTEEsQUFLQyxJQUFBO1lBTEQsaURBS0MsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tcGlsZXIvdmlld19jb21waWxlci9jb25zdGFudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3NlcmlhbGl6ZUVudW0sIGlzQmxhbmssIHJlc29sdmVFbnVtVG9rZW59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0NvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEsIENvbXBpbGVUb2tlbk1ldGFkYXRhfSBmcm9tICcuLi9jb21waWxlX21ldGFkYXRhJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yU3RhdGUsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdGlvbic7XG5pbXBvcnQge1ZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9tZXRhZGF0YS92aWV3JztcbmltcG9ydCB7Vmlld1R5cGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci92aWV3X3R5cGUnO1xuaW1wb3J0ICogYXMgbyBmcm9tICcuLi9vdXRwdXQvb3V0cHV0X2FzdCc7XG5pbXBvcnQge0lkZW50aWZpZXJzfSBmcm9tICcuLi9pZGVudGlmaWVycyc7XG5cbmZ1bmN0aW9uIF9lbnVtRXhwcmVzc2lvbihjbGFzc0lkZW50aWZpZXI6IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEsIHZhbHVlOiBhbnkpOiBvLkV4cHJlc3Npb24ge1xuICBpZiAoaXNCbGFuayh2YWx1ZSkpIHJldHVybiBvLk5VTExfRVhQUjtcbiAgdmFyIG5hbWUgPSByZXNvbHZlRW51bVRva2VuKGNsYXNzSWRlbnRpZmllci5ydW50aW1lLCB2YWx1ZSk7XG4gIHJldHVybiBvLmltcG9ydEV4cHIobmV3IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEoe1xuICAgIG5hbWU6IGAke2NsYXNzSWRlbnRpZmllci5uYW1lfS4ke25hbWV9YCxcbiAgICBtb2R1bGVVcmw6IGNsYXNzSWRlbnRpZmllci5tb2R1bGVVcmwsXG4gICAgcnVudGltZTogdmFsdWVcbiAgfSkpO1xufVxuXG5leHBvcnQgY2xhc3MgVmlld1R5cGVFbnVtIHtcbiAgc3RhdGljIGZyb21WYWx1ZSh2YWx1ZTogVmlld1R5cGUpOiBvLkV4cHJlc3Npb24ge1xuICAgIHJldHVybiBfZW51bUV4cHJlc3Npb24oSWRlbnRpZmllcnMuVmlld1R5cGUsIHZhbHVlKTtcbiAgfVxuICBzdGF0aWMgSE9TVCA9IFZpZXdUeXBlRW51bS5mcm9tVmFsdWUoVmlld1R5cGUuSE9TVCk7XG4gIHN0YXRpYyBDT01QT05FTlQgPSBWaWV3VHlwZUVudW0uZnJvbVZhbHVlKFZpZXdUeXBlLkNPTVBPTkVOVCk7XG4gIHN0YXRpYyBFTUJFRERFRCA9IFZpZXdUeXBlRW51bS5mcm9tVmFsdWUoVmlld1R5cGUuRU1CRURERUQpO1xufVxuXG5leHBvcnQgY2xhc3MgVmlld0VuY2Fwc3VsYXRpb25FbnVtIHtcbiAgc3RhdGljIGZyb21WYWx1ZSh2YWx1ZTogVmlld0VuY2Fwc3VsYXRpb24pOiBvLkV4cHJlc3Npb24ge1xuICAgIHJldHVybiBfZW51bUV4cHJlc3Npb24oSWRlbnRpZmllcnMuVmlld0VuY2Fwc3VsYXRpb24sIHZhbHVlKTtcbiAgfVxuICBzdGF0aWMgRW11bGF0ZWQgPSBWaWV3RW5jYXBzdWxhdGlvbkVudW0uZnJvbVZhbHVlKFZpZXdFbmNhcHN1bGF0aW9uLkVtdWxhdGVkKTtcbiAgc3RhdGljIE5hdGl2ZSA9IFZpZXdFbmNhcHN1bGF0aW9uRW51bS5mcm9tVmFsdWUoVmlld0VuY2Fwc3VsYXRpb24uTmF0aXZlKTtcbiAgc3RhdGljIE5vbmUgPSBWaWV3RW5jYXBzdWxhdGlvbkVudW0uZnJvbVZhbHVlKFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUpO1xufVxuXG5leHBvcnQgY2xhc3MgQ2hhbmdlRGV0ZWN0b3JTdGF0ZUVudW0ge1xuICBzdGF0aWMgZnJvbVZhbHVlKHZhbHVlOiBDaGFuZ2VEZXRlY3RvclN0YXRlKTogby5FeHByZXNzaW9uIHtcbiAgICByZXR1cm4gX2VudW1FeHByZXNzaW9uKElkZW50aWZpZXJzLkNoYW5nZURldGVjdG9yU3RhdGUsIHZhbHVlKTtcbiAgfVxuICBzdGF0aWMgTmV2ZXJDaGVja2VkID0gQ2hhbmdlRGV0ZWN0b3JTdGF0ZUVudW0uZnJvbVZhbHVlKENoYW5nZURldGVjdG9yU3RhdGUuTmV2ZXJDaGVja2VkKTtcbiAgc3RhdGljIENoZWNrZWRCZWZvcmUgPSBDaGFuZ2VEZXRlY3RvclN0YXRlRW51bS5mcm9tVmFsdWUoQ2hhbmdlRGV0ZWN0b3JTdGF0ZS5DaGVja2VkQmVmb3JlKTtcbiAgc3RhdGljIEVycm9yZWQgPSBDaGFuZ2VEZXRlY3RvclN0YXRlRW51bS5mcm9tVmFsdWUoQ2hhbmdlRGV0ZWN0b3JTdGF0ZS5FcnJvcmVkKTtcbn1cblxuZXhwb3J0IGNsYXNzIENoYW5nZURldGVjdGlvblN0cmF0ZWd5RW51bSB7XG4gIHN0YXRpYyBmcm9tVmFsdWUodmFsdWU6IENoYW5nZURldGVjdGlvblN0cmF0ZWd5KTogby5FeHByZXNzaW9uIHtcbiAgICByZXR1cm4gX2VudW1FeHByZXNzaW9uKElkZW50aWZpZXJzLkNoYW5nZURldGVjdGlvblN0cmF0ZWd5LCB2YWx1ZSk7XG4gIH1cbiAgc3RhdGljIENoZWNrT25jZSA9IENoYW5nZURldGVjdGlvblN0cmF0ZWd5RW51bS5mcm9tVmFsdWUoQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuQ2hlY2tPbmNlKTtcbiAgc3RhdGljIENoZWNrZWQgPSBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneUVudW0uZnJvbVZhbHVlKENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkNoZWNrZWQpO1xuICBzdGF0aWMgQ2hlY2tBbHdheXMgPSBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneUVudW0uZnJvbVZhbHVlKENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkNoZWNrQWx3YXlzKTtcbiAgc3RhdGljIERldGFjaGVkID0gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lFbnVtLmZyb21WYWx1ZShDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZXRhY2hlZCk7XG4gIHN0YXRpYyBPblB1c2ggPSBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneUVudW0uZnJvbVZhbHVlKENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCk7XG4gIHN0YXRpYyBEZWZhdWx0ID0gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lFbnVtLmZyb21WYWx1ZShDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0KTtcbn1cblxuZXhwb3J0IGNsYXNzIFZpZXdDb25zdHJ1Y3RvclZhcnMge1xuICBzdGF0aWMgdmlld1V0aWxzID0gby52YXJpYWJsZSgndmlld1V0aWxzJyk7XG4gIHN0YXRpYyBwYXJlbnRJbmplY3RvciA9IG8udmFyaWFibGUoJ3BhcmVudEluamVjdG9yJyk7XG4gIHN0YXRpYyBkZWNsYXJhdGlvbkVsID0gby52YXJpYWJsZSgnZGVjbGFyYXRpb25FbCcpO1xufVxuXG5leHBvcnQgY2xhc3MgVmlld1Byb3BlcnRpZXMge1xuICBzdGF0aWMgcmVuZGVyZXIgPSBvLlRISVNfRVhQUi5wcm9wKCdyZW5kZXJlcicpO1xuICBzdGF0aWMgcHJvamVjdGFibGVOb2RlcyA9IG8uVEhJU19FWFBSLnByb3AoJ3Byb2plY3RhYmxlTm9kZXMnKTtcbiAgc3RhdGljIHZpZXdVdGlscyA9IG8uVEhJU19FWFBSLnByb3AoJ3ZpZXdVdGlscycpO1xufVxuXG5leHBvcnQgY2xhc3MgRXZlbnRIYW5kbGVyVmFycyB7IHN0YXRpYyBldmVudCA9IG8udmFyaWFibGUoJyRldmVudCcpOyB9XG5cbmV4cG9ydCBjbGFzcyBJbmplY3RNZXRob2RWYXJzIHtcbiAgc3RhdGljIHRva2VuID0gby52YXJpYWJsZSgndG9rZW4nKTtcbiAgc3RhdGljIHJlcXVlc3ROb2RlSW5kZXggPSBvLnZhcmlhYmxlKCdyZXF1ZXN0Tm9kZUluZGV4Jyk7XG4gIHN0YXRpYyBub3RGb3VuZFJlc3VsdCA9IG8udmFyaWFibGUoJ25vdEZvdW5kUmVzdWx0Jyk7XG59XG5cbmV4cG9ydCBjbGFzcyBEZXRlY3RDaGFuZ2VzVmFycyB7XG4gIHN0YXRpYyB0aHJvd09uQ2hhbmdlID0gby52YXJpYWJsZShgdGhyb3dPbkNoYW5nZWApO1xuICBzdGF0aWMgY2hhbmdlcyA9IG8udmFyaWFibGUoYGNoYW5nZXNgKTtcbiAgc3RhdGljIGNoYW5nZWQgPSBvLnZhcmlhYmxlKGBjaGFuZ2VkYCk7XG4gIHN0YXRpYyB2YWxVbndyYXBwZXIgPSBvLnZhcmlhYmxlKGB2YWxVbndyYXBwZXJgKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
