// Reflect.defineMetadata ( metadataKey, metadataValue, target, propertyKey )
// - https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#reflectdefinemetadata--metadatakey-metadatavalue-target-propertykey-    
System.register(["../../Reflect", "assert"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var assert;
    function ReflectDefineMetadataInvalidTarget() {
        assert.throws(function () { return Reflect.defineMetadata("key", "value", undefined, undefined); }, TypeError);
    }
    exports_1("ReflectDefineMetadataInvalidTarget", ReflectDefineMetadataInvalidTarget);
    function ReflectDefineMetadataValidTargetWithoutTargetKey() {
        assert.doesNotThrow(function () { return Reflect.defineMetadata("key", "value", {}, undefined); });
    }
    exports_1("ReflectDefineMetadataValidTargetWithoutTargetKey", ReflectDefineMetadataValidTargetWithoutTargetKey);
    function ReflectDefineMetadataValidTargetWithTargetKey() {
        assert.doesNotThrow(function () { return Reflect.defineMetadata("key", "value", {}, "name"); });
    }
    exports_1("ReflectDefineMetadataValidTargetWithTargetKey", ReflectDefineMetadataValidTargetWithTargetKey);
    return {
        setters:[
            function (_1) {},
            function (assert_1) {
                assert = assert_1;
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvcmVmbGVjdC1tZXRhZGF0YS90ZXN0L3JlZmxlY3QvcmVmbGVjdC1kZWZpbmVtZXRhZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw2RUFBNkU7QUFDN0UseUpBQXlKOzs7OztJQUt6SjtRQUNJLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQTVELENBQTRELEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDakcsQ0FBQztJQUZELG1GQUVDLENBQUE7SUFFRDtRQUNJLE1BQU0sQ0FBQyxZQUFZLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFHLEVBQUUsU0FBUyxDQUFDLEVBQXRELENBQXNELENBQUMsQ0FBQztJQUN0RixDQUFDO0lBRkQsK0dBRUMsQ0FBQTtJQUVEO1FBQ0ksTUFBTSxDQUFDLFlBQVksQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUcsRUFBRSxNQUFNLENBQUMsRUFBbkQsQ0FBbUQsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFGRCx5R0FFQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvcmVmbGVjdC1tZXRhZGF0YS90ZXN0L3JlZmxlY3QvcmVmbGVjdC1kZWZpbmVtZXRhZGF0YS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEgKCBtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSApXHJcbi8vIC0gaHR0cHM6Ly9naXRodWIuY29tL2pvbmF0aGFuZHR1cm5lci9kZWNvcmF0b3JzL2Jsb2IvbWFzdGVyL3NwZWNzL21ldGFkYXRhLm1kI3JlZmxlY3RkZWZpbmVtZXRhZGF0YS0tbWV0YWRhdGFrZXktbWV0YWRhdGF2YWx1ZS10YXJnZXQtcHJvcGVydHlrZXktICAgIFxyXG5cclxuaW1wb3J0IFwiLi4vLi4vUmVmbGVjdFwiO1xyXG5pbXBvcnQgKiBhcyBhc3NlcnQgZnJvbSBcImFzc2VydFwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3REZWZpbmVNZXRhZGF0YUludmFsaWRUYXJnZXQoKSB7XHJcbiAgICBhc3NlcnQudGhyb3dzKCgpID0+IFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXlcIiwgXCJ2YWx1ZVwiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCksIFR5cGVFcnJvcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0RGVmaW5lTWV0YWRhdGFWYWxpZFRhcmdldFdpdGhvdXRUYXJnZXRLZXkoKSB7XHJcbiAgICBhc3NlcnQuZG9lc05vdFRocm93KCgpID0+IFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXlcIiwgXCJ2YWx1ZVwiLCB7IH0sIHVuZGVmaW5lZCkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdERlZmluZU1ldGFkYXRhVmFsaWRUYXJnZXRXaXRoVGFyZ2V0S2V5KCkge1xyXG4gICAgYXNzZXJ0LmRvZXNOb3RUaHJvdygoKSA9PiBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwia2V5XCIsIFwidmFsdWVcIiwgeyB9LCBcIm5hbWVcIikpO1xyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
