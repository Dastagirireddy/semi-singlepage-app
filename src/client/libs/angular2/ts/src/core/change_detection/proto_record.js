System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var RecordType, ProtoRecord;
    return {
        setters:[],
        execute: function() {
            (function (RecordType) {
                RecordType[RecordType["Self"] = 0] = "Self";
                RecordType[RecordType["Const"] = 1] = "Const";
                RecordType[RecordType["PrimitiveOp"] = 2] = "PrimitiveOp";
                RecordType[RecordType["PropertyRead"] = 3] = "PropertyRead";
                RecordType[RecordType["PropertyWrite"] = 4] = "PropertyWrite";
                RecordType[RecordType["Local"] = 5] = "Local";
                RecordType[RecordType["InvokeMethod"] = 6] = "InvokeMethod";
                RecordType[RecordType["InvokeClosure"] = 7] = "InvokeClosure";
                RecordType[RecordType["KeyedRead"] = 8] = "KeyedRead";
                RecordType[RecordType["KeyedWrite"] = 9] = "KeyedWrite";
                RecordType[RecordType["Pipe"] = 10] = "Pipe";
                RecordType[RecordType["Interpolate"] = 11] = "Interpolate";
                RecordType[RecordType["SafeProperty"] = 12] = "SafeProperty";
                RecordType[RecordType["CollectionLiteral"] = 13] = "CollectionLiteral";
                RecordType[RecordType["SafeMethodInvoke"] = 14] = "SafeMethodInvoke";
                RecordType[RecordType["DirectiveLifecycle"] = 15] = "DirectiveLifecycle";
                RecordType[RecordType["Chain"] = 16] = "Chain";
                RecordType[RecordType["SkipRecordsIf"] = 17] = "SkipRecordsIf";
                RecordType[RecordType["SkipRecordsIfNot"] = 18] = "SkipRecordsIfNot";
                RecordType[RecordType["SkipRecords"] = 19] = "SkipRecords"; // Skip records unconditionally
            })(RecordType || (RecordType = {}));
            exports_1("RecordType", RecordType);
            ProtoRecord = (function () {
                function ProtoRecord(mode, name, funcOrValue, args, fixedArgs, contextIndex, directiveIndex, selfIndex, bindingRecord, lastInBinding, lastInDirective, argumentToPureFunction, referencedBySelf, propertyBindingIndex) {
                    this.mode = mode;
                    this.name = name;
                    this.funcOrValue = funcOrValue;
                    this.args = args;
                    this.fixedArgs = fixedArgs;
                    this.contextIndex = contextIndex;
                    this.directiveIndex = directiveIndex;
                    this.selfIndex = selfIndex;
                    this.bindingRecord = bindingRecord;
                    this.lastInBinding = lastInBinding;
                    this.lastInDirective = lastInDirective;
                    this.argumentToPureFunction = argumentToPureFunction;
                    this.referencedBySelf = referencedBySelf;
                    this.propertyBindingIndex = propertyBindingIndex;
                }
                ProtoRecord.prototype.isPureFunction = function () {
                    return this.mode === RecordType.Interpolate || this.mode === RecordType.CollectionLiteral;
                };
                ProtoRecord.prototype.isUsedByOtherRecord = function () { return !this.lastInBinding || this.referencedBySelf; };
                ProtoRecord.prototype.shouldBeChecked = function () {
                    return this.argumentToPureFunction || this.lastInBinding || this.isPureFunction() ||
                        this.isPipeRecord();
                };
                ProtoRecord.prototype.isPipeRecord = function () { return this.mode === RecordType.Pipe; };
                ProtoRecord.prototype.isConditionalSkipRecord = function () {
                    return this.mode === RecordType.SkipRecordsIfNot || this.mode === RecordType.SkipRecordsIf;
                };
                ProtoRecord.prototype.isUnconditionalSkipRecord = function () { return this.mode === RecordType.SkipRecords; };
                ProtoRecord.prototype.isSkipRecord = function () {
                    return this.isConditionalSkipRecord() || this.isUnconditionalSkipRecord();
                };
                ProtoRecord.prototype.isLifeCycleRecord = function () { return this.mode === RecordType.DirectiveLifecycle; };
                return ProtoRecord;
            }());
            exports_1("ProtoRecord", ProtoRecord);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9wcm90b19yZWNvcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQUdBLFdBQVksVUFBVTtnQkFDcEIsMkNBQUksQ0FBQTtnQkFDSiw2Q0FBSyxDQUFBO2dCQUNMLHlEQUFXLENBQUE7Z0JBQ1gsMkRBQVksQ0FBQTtnQkFDWiw2REFBYSxDQUFBO2dCQUNiLDZDQUFLLENBQUE7Z0JBQ0wsMkRBQVksQ0FBQTtnQkFDWiw2REFBYSxDQUFBO2dCQUNiLHFEQUFTLENBQUE7Z0JBQ1QsdURBQVUsQ0FBQTtnQkFDViw0Q0FBSSxDQUFBO2dCQUNKLDBEQUFXLENBQUE7Z0JBQ1gsNERBQVksQ0FBQTtnQkFDWixzRUFBaUIsQ0FBQTtnQkFDakIsb0VBQWdCLENBQUE7Z0JBQ2hCLHdFQUFrQixDQUFBO2dCQUNsQiw4Q0FBSyxDQUFBO2dCQUNMLDhEQUFhLENBQUE7Z0JBQ2Isb0VBQWdCLENBQUE7Z0JBQ2hCLDBEQUFXLENBQUEsQ0FBUSwrQkFBK0I7WUFDcEQsQ0FBQyxFQXJCVyxVQUFVLEtBQVYsVUFBVSxRQXFCckI7Z0RBQUE7WUFFRDtnQkFDRSxxQkFBbUIsSUFBZ0IsRUFBUyxJQUFZLEVBQVMsV0FBVyxFQUFTLElBQVcsRUFDN0UsU0FBZ0IsRUFBUyxZQUFvQixFQUM3QyxjQUE4QixFQUFTLFNBQWlCLEVBQ3hELGFBQTRCLEVBQVMsYUFBc0IsRUFDM0QsZUFBd0IsRUFBUyxzQkFBK0IsRUFDaEUsZ0JBQXlCLEVBQVMsb0JBQTRCO29CQUw5RCxTQUFJLEdBQUosSUFBSSxDQUFZO29CQUFTLFNBQUksR0FBSixJQUFJLENBQVE7b0JBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQUE7b0JBQVMsU0FBSSxHQUFKLElBQUksQ0FBTztvQkFDN0UsY0FBUyxHQUFULFNBQVMsQ0FBTztvQkFBUyxpQkFBWSxHQUFaLFlBQVksQ0FBUTtvQkFDN0MsbUJBQWMsR0FBZCxjQUFjLENBQWdCO29CQUFTLGNBQVMsR0FBVCxTQUFTLENBQVE7b0JBQ3hELGtCQUFhLEdBQWIsYUFBYSxDQUFlO29CQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFTO29CQUMzRCxvQkFBZSxHQUFmLGVBQWUsQ0FBUztvQkFBUywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQVM7b0JBQ2hFLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBUztvQkFBUyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQVE7Z0JBQUcsQ0FBQztnQkFFckYsb0NBQWMsR0FBZDtvQkFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLGlCQUFpQixDQUFDO2dCQUM1RixDQUFDO2dCQUVELHlDQUFtQixHQUFuQixjQUFpQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7Z0JBRXZGLHFDQUFlLEdBQWY7b0JBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7d0JBQzFFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDN0IsQ0FBQztnQkFFRCxrQ0FBWSxHQUFaLGNBQTBCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUVqRSw2Q0FBdUIsR0FBdkI7b0JBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLGFBQWEsQ0FBQztnQkFDN0YsQ0FBQztnQkFFRCwrQ0FBeUIsR0FBekIsY0FBdUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBRXJGLGtDQUFZLEdBQVo7b0JBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO2dCQUM1RSxDQUFDO2dCQUVELHVDQUFpQixHQUFqQixjQUErQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO2dCQUN0RixrQkFBQztZQUFELENBaENBLEFBZ0NDLElBQUE7WUFoQ0QscUNBZ0NDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL3Byb3RvX3JlY29yZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QmluZGluZ1JlY29yZH0gZnJvbSAnLi9iaW5kaW5nX3JlY29yZCc7XG5pbXBvcnQge0RpcmVjdGl2ZUluZGV4fSBmcm9tICcuL2RpcmVjdGl2ZV9yZWNvcmQnO1xuXG5leHBvcnQgZW51bSBSZWNvcmRUeXBlIHtcbiAgU2VsZixcbiAgQ29uc3QsXG4gIFByaW1pdGl2ZU9wLFxuICBQcm9wZXJ0eVJlYWQsXG4gIFByb3BlcnR5V3JpdGUsXG4gIExvY2FsLFxuICBJbnZva2VNZXRob2QsXG4gIEludm9rZUNsb3N1cmUsXG4gIEtleWVkUmVhZCxcbiAgS2V5ZWRXcml0ZSxcbiAgUGlwZSxcbiAgSW50ZXJwb2xhdGUsXG4gIFNhZmVQcm9wZXJ0eSxcbiAgQ29sbGVjdGlvbkxpdGVyYWwsXG4gIFNhZmVNZXRob2RJbnZva2UsXG4gIERpcmVjdGl2ZUxpZmVjeWNsZSxcbiAgQ2hhaW4sXG4gIFNraXBSZWNvcmRzSWYsICAgICAvLyBTa2lwIHJlY29yZHMgd2hlbiB0aGUgY29uZGl0aW9uIGlzIHRydWVcbiAgU2tpcFJlY29yZHNJZk5vdCwgIC8vIFNraXAgcmVjb3JkcyB3aGVuIHRoZSBjb25kaXRpb24gaXMgZmFsc2VcbiAgU2tpcFJlY29yZHMgICAgICAgIC8vIFNraXAgcmVjb3JkcyB1bmNvbmRpdGlvbmFsbHlcbn1cblxuZXhwb3J0IGNsYXNzIFByb3RvUmVjb3JkIHtcbiAgY29uc3RydWN0b3IocHVibGljIG1vZGU6IFJlY29yZFR5cGUsIHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyBmdW5jT3JWYWx1ZSwgcHVibGljIGFyZ3M6IGFueVtdLFxuICAgICAgICAgICAgICBwdWJsaWMgZml4ZWRBcmdzOiBhbnlbXSwgcHVibGljIGNvbnRleHRJbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgICBwdWJsaWMgZGlyZWN0aXZlSW5kZXg6IERpcmVjdGl2ZUluZGV4LCBwdWJsaWMgc2VsZkluZGV4OiBudW1iZXIsXG4gICAgICAgICAgICAgIHB1YmxpYyBiaW5kaW5nUmVjb3JkOiBCaW5kaW5nUmVjb3JkLCBwdWJsaWMgbGFzdEluQmluZGluZzogYm9vbGVhbixcbiAgICAgICAgICAgICAgcHVibGljIGxhc3RJbkRpcmVjdGl2ZTogYm9vbGVhbiwgcHVibGljIGFyZ3VtZW50VG9QdXJlRnVuY3Rpb246IGJvb2xlYW4sXG4gICAgICAgICAgICAgIHB1YmxpYyByZWZlcmVuY2VkQnlTZWxmOiBib29sZWFuLCBwdWJsaWMgcHJvcGVydHlCaW5kaW5nSW5kZXg6IG51bWJlcikge31cblxuICBpc1B1cmVGdW5jdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlID09PSBSZWNvcmRUeXBlLkludGVycG9sYXRlIHx8IHRoaXMubW9kZSA9PT0gUmVjb3JkVHlwZS5Db2xsZWN0aW9uTGl0ZXJhbDtcbiAgfVxuXG4gIGlzVXNlZEJ5T3RoZXJSZWNvcmQoKTogYm9vbGVhbiB7IHJldHVybiAhdGhpcy5sYXN0SW5CaW5kaW5nIHx8IHRoaXMucmVmZXJlbmNlZEJ5U2VsZjsgfVxuXG4gIHNob3VsZEJlQ2hlY2tlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5hcmd1bWVudFRvUHVyZUZ1bmN0aW9uIHx8IHRoaXMubGFzdEluQmluZGluZyB8fCB0aGlzLmlzUHVyZUZ1bmN0aW9uKCkgfHxcbiAgICAgICAgICAgdGhpcy5pc1BpcGVSZWNvcmQoKTtcbiAgfVxuXG4gIGlzUGlwZVJlY29yZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMubW9kZSA9PT0gUmVjb3JkVHlwZS5QaXBlOyB9XG5cbiAgaXNDb25kaXRpb25hbFNraXBSZWNvcmQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubW9kZSA9PT0gUmVjb3JkVHlwZS5Ta2lwUmVjb3Jkc0lmTm90IHx8IHRoaXMubW9kZSA9PT0gUmVjb3JkVHlwZS5Ta2lwUmVjb3Jkc0lmO1xuICB9XG5cbiAgaXNVbmNvbmRpdGlvbmFsU2tpcFJlY29yZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMubW9kZSA9PT0gUmVjb3JkVHlwZS5Ta2lwUmVjb3JkczsgfVxuXG4gIGlzU2tpcFJlY29yZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc0NvbmRpdGlvbmFsU2tpcFJlY29yZCgpIHx8IHRoaXMuaXNVbmNvbmRpdGlvbmFsU2tpcFJlY29yZCgpO1xuICB9XG5cbiAgaXNMaWZlQ3ljbGVSZWNvcmQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLm1vZGUgPT09IFJlY29yZFR5cGUuRGlyZWN0aXZlTGlmZWN5Y2xlOyB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
