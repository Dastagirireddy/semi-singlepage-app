// Reflect.getOwnMetadataKeysKeys ( target [, propertyKey] )
// - https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#reflectgetownmetadatakeyskeys--target--propertykey-
System.register(["../../Reflect", "assert"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var assert;
    function ReflectGetOwnMetadataKeysKeysInvalidTarget() {
        // 1. If Type(target) is not Object, throw a TypeError exception.
        assert.throws(function () { return Reflect.getOwnMetadataKeys(undefined, undefined); }, TypeError);
    }
    exports_1("ReflectGetOwnMetadataKeysKeysInvalidTarget", ReflectGetOwnMetadataKeysKeysInvalidTarget);
    function ReflectGetOwnMetadataKeysWithoutTargetKeyWhenNotDefined() {
        var obj = {};
        var result = Reflect.getOwnMetadataKeys(obj, undefined);
        assert.deepEqual(result, []);
    }
    exports_1("ReflectGetOwnMetadataKeysWithoutTargetKeyWhenNotDefined", ReflectGetOwnMetadataKeysWithoutTargetKeyWhenNotDefined);
    function ReflectGetOwnMetadataKeysWithoutTargetKeyWhenDefined() {
        var obj = {};
        Reflect.defineMetadata("key", "value", obj, undefined);
        var result = Reflect.getOwnMetadataKeys(obj, undefined);
        assert.deepEqual(result, ["key"]);
    }
    exports_1("ReflectGetOwnMetadataKeysWithoutTargetKeyWhenDefined", ReflectGetOwnMetadataKeysWithoutTargetKeyWhenDefined);
    function ReflectGetOwnMetadataKeysWithoutTargetKeyWhenDefinedOnPrototype() {
        var prototype = {};
        var obj = Object.create(prototype);
        Reflect.defineMetadata("key", "value", prototype, undefined);
        var result = Reflect.getOwnMetadataKeys(obj, undefined);
        assert.deepEqual(result, []);
    }
    exports_1("ReflectGetOwnMetadataKeysWithoutTargetKeyWhenDefinedOnPrototype", ReflectGetOwnMetadataKeysWithoutTargetKeyWhenDefinedOnPrototype);
    function ReflectGetOwnMetadataKeysOrderWithoutTargetKey() {
        var obj = {};
        Reflect.defineMetadata("key1", "value", obj, undefined);
        Reflect.defineMetadata("key0", "value", obj, undefined);
        var result = Reflect.getOwnMetadataKeys(obj, undefined);
        assert.deepEqual(result, ["key1", "key0"]);
    }
    exports_1("ReflectGetOwnMetadataKeysOrderWithoutTargetKey", ReflectGetOwnMetadataKeysOrderWithoutTargetKey);
    function ReflectGetOwnMetadataKeysOrderAfterRedefineWithoutTargetKey() {
        var obj = {};
        Reflect.defineMetadata("key1", "value", obj, undefined);
        Reflect.defineMetadata("key0", "value", obj, undefined);
        Reflect.defineMetadata("key1", "value", obj, undefined);
        var result = Reflect.getOwnMetadataKeys(obj, undefined);
        assert.deepEqual(result, ["key1", "key0"]);
    }
    exports_1("ReflectGetOwnMetadataKeysOrderAfterRedefineWithoutTargetKey", ReflectGetOwnMetadataKeysOrderAfterRedefineWithoutTargetKey);
    function ReflectGetOwnMetadataKeysWithTargetKeyWhenNotDefined() {
        var obj = {};
        var result = Reflect.getOwnMetadataKeys(obj, "name");
        assert.deepEqual(result, []);
    }
    exports_1("ReflectGetOwnMetadataKeysWithTargetKeyWhenNotDefined", ReflectGetOwnMetadataKeysWithTargetKeyWhenNotDefined);
    function ReflectGetOwnMetadataKeysWithTargetKeyWhenDefined() {
        var obj = {};
        Reflect.defineMetadata("key", "value", obj, "name");
        var result = Reflect.getOwnMetadataKeys(obj, "name");
        assert.deepEqual(result, ["key"]);
    }
    exports_1("ReflectGetOwnMetadataKeysWithTargetKeyWhenDefined", ReflectGetOwnMetadataKeysWithTargetKeyWhenDefined);
    function ReflectGetOwnMetadataKeysWithTargetKeyWhenDefinedOnPrototype() {
        var prototype = {};
        var obj = Object.create(prototype);
        Reflect.defineMetadata("key", "value", prototype, "name");
        var result = Reflect.getOwnMetadataKeys(obj, "name");
        assert.deepEqual(result, []);
    }
    exports_1("ReflectGetOwnMetadataKeysWithTargetKeyWhenDefinedOnPrototype", ReflectGetOwnMetadataKeysWithTargetKeyWhenDefinedOnPrototype);
    function ReflectGetOwnMetadataKeysOrderAfterRedefineWithTargetKey() {
        var obj = {};
        Reflect.defineMetadata("key1", "value", obj, "name");
        Reflect.defineMetadata("key0", "value", obj, "name");
        Reflect.defineMetadata("key1", "value", obj, "name");
        var result = Reflect.getOwnMetadataKeys(obj, "name");
        assert.deepEqual(result, ["key1", "key0"]);
    }
    exports_1("ReflectGetOwnMetadataKeysOrderAfterRedefineWithTargetKey", ReflectGetOwnMetadataKeysOrderAfterRedefineWithTargetKey);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3JlZmxlY3QtbWV0YWRhdGEvdGVzdC9yZWZsZWN0L3JlZmxlY3QtZ2V0b3dubWV0YWRhdGFrZXlzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDREQUE0RDtBQUM1RCxvSUFBb0k7Ozs7O0lBS3BJO1FBQ0ksaUVBQWlFO1FBQ2pFLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQWhELENBQWdELEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUhELG1HQUdDLENBQUE7SUFFRDtRQUNJLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDeEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUpELDZIQUlDLENBQUE7SUFFRDtRQUNJLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDdkQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN4RCxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUxELHVIQUtDLENBQUE7SUFFRDtRQUNJLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FB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QUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNyRCxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3JELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDckQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBUEQsK0hBT0MsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9yZWZsZWN0LW1ldGFkYXRhL3Rlc3QvcmVmbGVjdC9yZWZsZWN0LWdldG93bm1ldGFkYXRha2V5cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFJlZmxlY3QuZ2V0T3duTWV0YWRhdGFLZXlzS2V5cyAoIHRhcmdldCBbLCBwcm9wZXJ0eUtleV0gKVxyXG4vLyAtIGh0dHBzOi8vZ2l0aHViLmNvbS9qb25hdGhhbmR0dXJuZXIvZGVjb3JhdG9ycy9ibG9iL21hc3Rlci9zcGVjcy9tZXRhZGF0YS5tZCNyZWZsZWN0Z2V0b3dubWV0YWRhdGFrZXlza2V5cy0tdGFyZ2V0LS1wcm9wZXJ0eWtleS1cclxuXHJcbmltcG9ydCBcIi4uLy4uL1JlZmxlY3RcIjtcclxuaW1wb3J0ICogYXMgYXNzZXJ0IGZyb20gXCJhc3NlcnRcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0R2V0T3duTWV0YWRhdGFLZXlzS2V5c0ludmFsaWRUYXJnZXQoKSB7XHJcbiAgICAvLyAxLiBJZiBUeXBlKHRhcmdldCkgaXMgbm90IE9iamVjdCwgdGhyb3cgYSBUeXBlRXJyb3IgZXhjZXB0aW9uLlxyXG4gICAgYXNzZXJ0LnRocm93cygoKSA9PiBSZWZsZWN0LmdldE93bk1ldGFkYXRhS2V5cyh1bmRlZmluZWQsIHVuZGVmaW5lZCksIFR5cGVFcnJvcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0R2V0T3duTWV0YWRhdGFLZXlzV2l0aG91dFRhcmdldEtleVdoZW5Ob3REZWZpbmVkKCkge1xyXG4gICAgbGV0IG9iaiA9IHt9O1xyXG4gICAgbGV0IHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGFLZXlzKG9iaiwgdW5kZWZpbmVkKTtcclxuICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LCBbXSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0R2V0T3duTWV0YWRhdGFLZXlzV2l0aG91dFRhcmdldEtleVdoZW5EZWZpbmVkKCkge1xyXG4gICAgbGV0IG9iaiA9IHt9O1xyXG4gICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleVwiLCBcInZhbHVlXCIsIG9iaiwgdW5kZWZpbmVkKTtcclxuICAgIGxldCByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhS2V5cyhvYmosIHVuZGVmaW5lZCk7XHJcbiAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdCwgW1wia2V5XCJdKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RHZXRPd25NZXRhZGF0YUtleXNXaXRob3V0VGFyZ2V0S2V5V2hlbkRlZmluZWRPblByb3RvdHlwZSgpIHtcclxuICAgIGxldCBwcm90b3R5cGUgPSB7fTtcclxuICAgIGxldCBvYmogPSBPYmplY3QuY3JlYXRlKHByb3RvdHlwZSk7XHJcbiAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwia2V5XCIsIFwidmFsdWVcIiwgcHJvdG90eXBlLCB1bmRlZmluZWQpO1xyXG4gICAgbGV0IHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGFLZXlzKG9iaiwgdW5kZWZpbmVkKTtcclxuICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LCBbXSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0R2V0T3duTWV0YWRhdGFLZXlzT3JkZXJXaXRob3V0VGFyZ2V0S2V5KCkge1xyXG4gICAgbGV0IG9iaiA9IHt9O1xyXG4gICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleTFcIiwgXCJ2YWx1ZVwiLCBvYmosIHVuZGVmaW5lZCk7XHJcbiAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwia2V5MFwiLCBcInZhbHVlXCIsIG9iaiwgdW5kZWZpbmVkKTtcclxuICAgIGxldCByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhS2V5cyhvYmosIHVuZGVmaW5lZCk7XHJcbiAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdCwgW1wia2V5MVwiLCBcImtleTBcIl0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdEdldE93bk1ldGFkYXRhS2V5c09yZGVyQWZ0ZXJSZWRlZmluZVdpdGhvdXRUYXJnZXRLZXkoKSB7XHJcbiAgICBsZXQgb2JqID0ge307XHJcbiAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwia2V5MVwiLCBcInZhbHVlXCIsIG9iaiwgdW5kZWZpbmVkKTtcclxuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXkwXCIsIFwidmFsdWVcIiwgb2JqLCB1bmRlZmluZWQpO1xyXG4gICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleTFcIiwgXCJ2YWx1ZVwiLCBvYmosIHVuZGVmaW5lZCk7XHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YUtleXMob2JqLCB1bmRlZmluZWQpO1xyXG4gICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIFtcImtleTFcIiwgXCJrZXkwXCJdKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RHZXRPd25NZXRhZGF0YUtleXNXaXRoVGFyZ2V0S2V5V2hlbk5vdERlZmluZWQoKSB7XHJcbiAgICBsZXQgb2JqID0ge307XHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YUtleXMob2JqLCBcIm5hbWVcIik7XHJcbiAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdCwgW10pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdEdldE93bk1ldGFkYXRhS2V5c1dpdGhUYXJnZXRLZXlXaGVuRGVmaW5lZCgpIHtcclxuICAgIGxldCBvYmogPSB7fTtcclxuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXlcIiwgXCJ2YWx1ZVwiLCBvYmosIFwibmFtZVwiKTtcclxuICAgIGxldCByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhS2V5cyhvYmosIFwibmFtZVwiKTtcclxuICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LCBbXCJrZXlcIl0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdEdldE93bk1ldGFkYXRhS2V5c1dpdGhUYXJnZXRLZXlXaGVuRGVmaW5lZE9uUHJvdG90eXBlKCkge1xyXG4gICAgbGV0IHByb3RvdHlwZSA9IHt9O1xyXG4gICAgbGV0IG9iaiA9IE9iamVjdC5jcmVhdGUocHJvdG90eXBlKTtcclxuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXlcIiwgXCJ2YWx1ZVwiLCBwcm90b3R5cGUsIFwibmFtZVwiKTtcclxuICAgIGxldCByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhS2V5cyhvYmosIFwibmFtZVwiKTtcclxuICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LCBbXSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0R2V0T3duTWV0YWRhdGFLZXlzT3JkZXJBZnRlclJlZGVmaW5lV2l0aFRhcmdldEtleSgpIHtcclxuICAgIGxldCBvYmogPSB7fTtcclxuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXkxXCIsIFwidmFsdWVcIiwgb2JqLCBcIm5hbWVcIik7XHJcbiAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwia2V5MFwiLCBcInZhbHVlXCIsIG9iaiwgXCJuYW1lXCIpO1xyXG4gICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleTFcIiwgXCJ2YWx1ZVwiLCBvYmosIFwibmFtZVwiKTtcclxuICAgIGxldCByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhS2V5cyhvYmosIFwibmFtZVwiKTtcclxuICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LCBbXCJrZXkxXCIsIFwia2V5MFwiXSk7XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
