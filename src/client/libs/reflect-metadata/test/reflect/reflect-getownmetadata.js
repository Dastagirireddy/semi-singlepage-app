// Reflect.getOwnMetadata ( metadataKey, target [, propertyKey] )
// - https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#reflectgetownmetadata--metadatakey-target--propertykey-
System.register(["../../Reflect", "assert"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var assert;
    function ReflectGetOwnMetadataInvalidTarget() {
        assert.throws(function () { return Reflect.getOwnMetadata("key", undefined, undefined); }, TypeError);
    }
    exports_1("ReflectGetOwnMetadataInvalidTarget", ReflectGetOwnMetadataInvalidTarget);
    function ReflectGetOwnMetadataWithoutTargetKeyWhenNotDefined() {
        var obj = {};
        var result = Reflect.getOwnMetadata("key", obj, undefined);
        assert.equal(result, undefined);
    }
    exports_1("ReflectGetOwnMetadataWithoutTargetKeyWhenNotDefined", ReflectGetOwnMetadataWithoutTargetKeyWhenNotDefined);
    function ReflectGetOwnMetadataWithoutTargetKeyWhenDefined() {
        var obj = {};
        Reflect.defineMetadata("key", "value", obj, undefined);
        var result = Reflect.getOwnMetadata("key", obj, undefined);
        assert.equal(result, "value");
    }
    exports_1("ReflectGetOwnMetadataWithoutTargetKeyWhenDefined", ReflectGetOwnMetadataWithoutTargetKeyWhenDefined);
    function ReflectGetOwnMetadataWithoutTargetKeyWhenDefinedOnPrototype() {
        var prototype = {};
        var obj = Object.create(prototype);
        Reflect.defineMetadata("key", "value", prototype, undefined);
        var result = Reflect.getOwnMetadata("key", obj, undefined);
        assert.equal(result, undefined);
    }
    exports_1("ReflectGetOwnMetadataWithoutTargetKeyWhenDefinedOnPrototype", ReflectGetOwnMetadataWithoutTargetKeyWhenDefinedOnPrototype);
    function ReflectGetOwnMetadataWithTargetKeyWhenNotDefined() {
        var obj = {};
        var result = Reflect.getOwnMetadata("key", obj, "name");
        assert.equal(result, undefined);
    }
    exports_1("ReflectGetOwnMetadataWithTargetKeyWhenNotDefined", ReflectGetOwnMetadataWithTargetKeyWhenNotDefined);
    function ReflectGetOwnMetadataWithTargetKeyWhenDefined() {
        var obj = {};
        Reflect.defineMetadata("key", "value", obj, "name");
        var result = Reflect.getOwnMetadata("key", obj, "name");
        assert.equal(result, "value");
    }
    exports_1("ReflectGetOwnMetadataWithTargetKeyWhenDefined", ReflectGetOwnMetadataWithTargetKeyWhenDefined);
    function ReflectGetOwnMetadataWithTargetKeyWhenDefinedOnPrototype() {
        var prototype = {};
        var obj = Object.create(prototype);
        Reflect.defineMetadata("key", "value", prototype, "name");
        var result = Reflect.getOwnMetadata("key", obj, "name");
        assert.equal(result, undefined);
    }
    exports_1("ReflectGetOwnMetadataWithTargetKeyWhenDefinedOnPrototype", ReflectGetOwnMetadataWithTargetKeyWhenDefinedOnPrototype);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvcmVmbGVjdC1tZXRhZGF0YS90ZXN0L3JlZmxlY3QvcmVmbGVjdC1nZXRvd25tZXRhZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxpRUFBaUU7QUFDakUsd0lBQXdJOzs7OztJQUt4STtRQUNJLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsRUFBbkQsQ0FBbUQsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBRkQsbUZBRUMsQ0FBQTtJQUVEO1FBQ0ksSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzNELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFKRCxxSEFJQyxDQUFBO0lBRUQ7UUFDSSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYixPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMzRCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBTEQsK0dBS0MsQ0FBQTtJQUVEO1FBQ0ksSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM3RCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDM0QsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQU5ELHFJQU1DLENBQUE7SUFFRDtRQUNJLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN4RCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBSkQsK0dBSUMsQ0FBQTtJQUVEO1FBQ0ksSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNwRCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDeEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUxELHlHQUtDLENBQUE7SUFFRDtRQUNJLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDMUQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFORCwrSEFNQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvcmVmbGVjdC1tZXRhZGF0YS90ZXN0L3JlZmxlY3QvcmVmbGVjdC1nZXRvd25tZXRhZGF0YS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFJlZmxlY3QuZ2V0T3duTWV0YWRhdGEgKCBtZXRhZGF0YUtleSwgdGFyZ2V0IFssIHByb3BlcnR5S2V5XSApXHJcbi8vIC0gaHR0cHM6Ly9naXRodWIuY29tL2pvbmF0aGFuZHR1cm5lci9kZWNvcmF0b3JzL2Jsb2IvbWFzdGVyL3NwZWNzL21ldGFkYXRhLm1kI3JlZmxlY3RnZXRvd25tZXRhZGF0YS0tbWV0YWRhdGFrZXktdGFyZ2V0LS1wcm9wZXJ0eWtleS1cclxuXHJcbmltcG9ydCBcIi4uLy4uL1JlZmxlY3RcIjtcclxuaW1wb3J0ICogYXMgYXNzZXJ0IGZyb20gXCJhc3NlcnRcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0R2V0T3duTWV0YWRhdGFJbnZhbGlkVGFyZ2V0KCkge1xyXG4gICAgYXNzZXJ0LnRocm93cygoKSA9PiBSZWZsZWN0LmdldE93bk1ldGFkYXRhKFwia2V5XCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKSwgVHlwZUVycm9yKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RHZXRPd25NZXRhZGF0YVdpdGhvdXRUYXJnZXRLZXlXaGVuTm90RGVmaW5lZCgpIHtcclxuICAgIGxldCBvYmogPSB7fTtcclxuICAgIGxldCByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhKFwia2V5XCIsIG9iaiwgdW5kZWZpbmVkKTtcclxuICAgIGFzc2VydC5lcXVhbChyZXN1bHQsIHVuZGVmaW5lZCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0R2V0T3duTWV0YWRhdGFXaXRob3V0VGFyZ2V0S2V5V2hlbkRlZmluZWQoKSB7XHJcbiAgICBsZXQgb2JqID0ge307XHJcbiAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwia2V5XCIsIFwidmFsdWVcIiwgb2JqLCB1bmRlZmluZWQpO1xyXG4gICAgbGV0IHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGEoXCJrZXlcIiwgb2JqLCB1bmRlZmluZWQpO1xyXG4gICAgYXNzZXJ0LmVxdWFsKHJlc3VsdCwgXCJ2YWx1ZVwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RHZXRPd25NZXRhZGF0YVdpdGhvdXRUYXJnZXRLZXlXaGVuRGVmaW5lZE9uUHJvdG90eXBlKCkge1xyXG4gICAgbGV0IHByb3RvdHlwZSA9IHt9O1xyXG4gICAgbGV0IG9iaiA9IE9iamVjdC5jcmVhdGUocHJvdG90eXBlKTtcclxuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXlcIiwgXCJ2YWx1ZVwiLCBwcm90b3R5cGUsIHVuZGVmaW5lZCk7XHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YShcImtleVwiLCBvYmosIHVuZGVmaW5lZCk7XHJcbiAgICBhc3NlcnQuZXF1YWwocmVzdWx0LCB1bmRlZmluZWQpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdEdldE93bk1ldGFkYXRhV2l0aFRhcmdldEtleVdoZW5Ob3REZWZpbmVkKCkge1xyXG4gICAgbGV0IG9iaiA9IHt9O1xyXG4gICAgbGV0IHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGEoXCJrZXlcIiwgb2JqLCBcIm5hbWVcIik7XHJcbiAgICBhc3NlcnQuZXF1YWwocmVzdWx0LCB1bmRlZmluZWQpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdEdldE93bk1ldGFkYXRhV2l0aFRhcmdldEtleVdoZW5EZWZpbmVkKCkge1xyXG4gICAgbGV0IG9iaiA9IHt9O1xyXG4gICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleVwiLCBcInZhbHVlXCIsIG9iaiwgXCJuYW1lXCIpO1xyXG4gICAgbGV0IHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGEoXCJrZXlcIiwgb2JqLCBcIm5hbWVcIik7XHJcbiAgICBhc3NlcnQuZXF1YWwocmVzdWx0LCBcInZhbHVlXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdEdldE93bk1ldGFkYXRhV2l0aFRhcmdldEtleVdoZW5EZWZpbmVkT25Qcm90b3R5cGUoKSB7XHJcbiAgICBsZXQgcHJvdG90eXBlID0ge307XHJcbiAgICBsZXQgb2JqID0gT2JqZWN0LmNyZWF0ZShwcm90b3R5cGUpO1xyXG4gICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleVwiLCBcInZhbHVlXCIsIHByb3RvdHlwZSwgXCJuYW1lXCIpO1xyXG4gICAgbGV0IHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGEoXCJrZXlcIiwgb2JqLCBcIm5hbWVcIik7XHJcbiAgICBhc3NlcnQuZXF1YWwocmVzdWx0LCB1bmRlZmluZWQpO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
