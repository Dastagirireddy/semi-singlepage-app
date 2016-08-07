// Reflect.hasMetadata ( metadataKey, target [, propertyKey] )
// - https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#reflecthasmetadata--metadatakey-target--propertykey-
System.register(["../../Reflect", "assert"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var assert;
    function ReflectHasMetadataInvalidTarget() {
        assert.throws(function () { return Reflect.hasMetadata("key", undefined, undefined); }, TypeError);
    }
    exports_1("ReflectHasMetadataInvalidTarget", ReflectHasMetadataInvalidTarget);
    function ReflectHasMetadataWithoutTargetKeyWhenNotDefined() {
        var obj = {};
        var result = Reflect.hasMetadata("key", obj, undefined);
        assert.equal(result, false);
    }
    exports_1("ReflectHasMetadataWithoutTargetKeyWhenNotDefined", ReflectHasMetadataWithoutTargetKeyWhenNotDefined);
    function ReflectHasMetadataWithoutTargetKeyWhenDefined() {
        var obj = {};
        Reflect.defineMetadata("key", "value", obj, undefined);
        var result = Reflect.hasMetadata("key", obj, undefined);
        assert.equal(result, true);
    }
    exports_1("ReflectHasMetadataWithoutTargetKeyWhenDefined", ReflectHasMetadataWithoutTargetKeyWhenDefined);
    function ReflectHasMetadataWithoutTargetKeyWhenDefinedOnPrototype() {
        var prototype = {};
        var obj = Object.create(prototype);
        Reflect.defineMetadata("key", "value", prototype, undefined);
        var result = Reflect.hasMetadata("key", obj, undefined);
        assert.equal(result, true);
    }
    exports_1("ReflectHasMetadataWithoutTargetKeyWhenDefinedOnPrototype", ReflectHasMetadataWithoutTargetKeyWhenDefinedOnPrototype);
    function ReflectHasMetadataWithTargetKeyWhenNotDefined() {
        var obj = {};
        var result = Reflect.hasMetadata("key", obj, "name");
        assert.equal(result, false);
    }
    exports_1("ReflectHasMetadataWithTargetKeyWhenNotDefined", ReflectHasMetadataWithTargetKeyWhenNotDefined);
    function ReflectHasMetadataWithTargetKeyWhenDefined() {
        var obj = {};
        Reflect.defineMetadata("key", "value", obj, "name");
        var result = Reflect.hasMetadata("key", obj, "name");
        assert.equal(result, true);
    }
    exports_1("ReflectHasMetadataWithTargetKeyWhenDefined", ReflectHasMetadataWithTargetKeyWhenDefined);
    function ReflectHasMetadataWithTargetKeyWhenDefinedOnPrototype() {
        var prototype = {};
        var obj = Object.create(prototype);
        Reflect.defineMetadata("key", "value", prototype, "name");
        var result = Reflect.hasMetadata("key", obj, "name");
        assert.equal(result, true);
    }
    exports_1("ReflectHasMetadataWithTargetKeyWhenDefinedOnPrototype", ReflectHasMetadataWithTargetKeyWhenDefinedOnPrototype);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvcmVmbGVjdC1tZXRhZGF0YS90ZXN0L3JlZmxlY3QvcmVmbGVjdC1oYXNtZXRhZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw4REFBOEQ7QUFDOUQscUlBQXFJOzs7OztJQUtySTtRQUNJLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsRUFBaEQsQ0FBZ0QsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBRkQsNkVBRUMsQ0FBQTtJQUVEO1FBQ0ksSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFKRCwrR0FJQyxDQUFBO0lBRUQ7UUFDSSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYixPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN4RCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBTEQseUdBS0MsQ0FBQTtJQUVEO1FBQ0ksSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM3RCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDeEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQU5ELCtIQU1DLENBQUE7SUFFRDtRQUNJLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNyRCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBSkQseUdBSUMsQ0FBQTtJQUVEO1FBQ0ksSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNwRCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDckQsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUxELG1HQUtDLENBQUE7SUFFRDtRQUNJLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDMUQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3JELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFORCx5SEFNQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvcmVmbGVjdC1tZXRhZGF0YS90ZXN0L3JlZmxlY3QvcmVmbGVjdC1oYXNtZXRhZGF0YS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFJlZmxlY3QuaGFzTWV0YWRhdGEgKCBtZXRhZGF0YUtleSwgdGFyZ2V0IFssIHByb3BlcnR5S2V5XSApXHJcbi8vIC0gaHR0cHM6Ly9naXRodWIuY29tL2pvbmF0aGFuZHR1cm5lci9kZWNvcmF0b3JzL2Jsb2IvbWFzdGVyL3NwZWNzL21ldGFkYXRhLm1kI3JlZmxlY3RoYXNtZXRhZGF0YS0tbWV0YWRhdGFrZXktdGFyZ2V0LS1wcm9wZXJ0eWtleS1cclxuXHJcbmltcG9ydCBcIi4uLy4uL1JlZmxlY3RcIjtcclxuaW1wb3J0ICogYXMgYXNzZXJ0IGZyb20gXCJhc3NlcnRcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0SGFzTWV0YWRhdGFJbnZhbGlkVGFyZ2V0KCkge1xyXG4gICAgYXNzZXJ0LnRocm93cygoKSA9PiBSZWZsZWN0Lmhhc01ldGFkYXRhKFwia2V5XCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKSwgVHlwZUVycm9yKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RIYXNNZXRhZGF0YVdpdGhvdXRUYXJnZXRLZXlXaGVuTm90RGVmaW5lZCgpIHtcclxuICAgIGxldCBvYmogPSB7fTtcclxuICAgIGxldCByZXN1bHQgPSBSZWZsZWN0Lmhhc01ldGFkYXRhKFwia2V5XCIsIG9iaiwgdW5kZWZpbmVkKTtcclxuICAgIGFzc2VydC5lcXVhbChyZXN1bHQsIGZhbHNlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RIYXNNZXRhZGF0YVdpdGhvdXRUYXJnZXRLZXlXaGVuRGVmaW5lZCgpIHtcclxuICAgIGxldCBvYmogPSB7fTtcclxuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXlcIiwgXCJ2YWx1ZVwiLCBvYmosIHVuZGVmaW5lZCk7XHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5oYXNNZXRhZGF0YShcImtleVwiLCBvYmosIHVuZGVmaW5lZCk7XHJcbiAgICBhc3NlcnQuZXF1YWwocmVzdWx0LCB0cnVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RIYXNNZXRhZGF0YVdpdGhvdXRUYXJnZXRLZXlXaGVuRGVmaW5lZE9uUHJvdG90eXBlKCkge1xyXG4gICAgbGV0IHByb3RvdHlwZSA9IHt9O1xyXG4gICAgbGV0IG9iaiA9IE9iamVjdC5jcmVhdGUocHJvdG90eXBlKTtcclxuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXlcIiwgXCJ2YWx1ZVwiLCBwcm90b3R5cGUsIHVuZGVmaW5lZCk7XHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5oYXNNZXRhZGF0YShcImtleVwiLCBvYmosIHVuZGVmaW5lZCk7XHJcbiAgICBhc3NlcnQuZXF1YWwocmVzdWx0LCB0cnVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RIYXNNZXRhZGF0YVdpdGhUYXJnZXRLZXlXaGVuTm90RGVmaW5lZCgpIHtcclxuICAgIGxldCBvYmogPSB7fTtcclxuICAgIGxldCByZXN1bHQgPSBSZWZsZWN0Lmhhc01ldGFkYXRhKFwia2V5XCIsIG9iaiwgXCJuYW1lXCIpO1xyXG4gICAgYXNzZXJ0LmVxdWFsKHJlc3VsdCwgZmFsc2UpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdEhhc01ldGFkYXRhV2l0aFRhcmdldEtleVdoZW5EZWZpbmVkKCkge1xyXG4gICAgbGV0IG9iaiA9IHt9O1xyXG4gICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleVwiLCBcInZhbHVlXCIsIG9iaiwgXCJuYW1lXCIpO1xyXG4gICAgbGV0IHJlc3VsdCA9IFJlZmxlY3QuaGFzTWV0YWRhdGEoXCJrZXlcIiwgb2JqLCBcIm5hbWVcIik7XHJcbiAgICBhc3NlcnQuZXF1YWwocmVzdWx0LCB0cnVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RIYXNNZXRhZGF0YVdpdGhUYXJnZXRLZXlXaGVuRGVmaW5lZE9uUHJvdG90eXBlKCkge1xyXG4gICAgbGV0IHByb3RvdHlwZSA9IHt9O1xyXG4gICAgbGV0IG9iaiA9IE9iamVjdC5jcmVhdGUocHJvdG90eXBlKTtcclxuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXlcIiwgXCJ2YWx1ZVwiLCBwcm90b3R5cGUsIFwibmFtZVwiKTtcclxuICAgIGxldCByZXN1bHQgPSBSZWZsZWN0Lmhhc01ldGFkYXRhKFwia2V5XCIsIG9iaiwgXCJuYW1lXCIpO1xyXG4gICAgYXNzZXJ0LmVxdWFsKHJlc3VsdCwgdHJ1ZSk7XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
