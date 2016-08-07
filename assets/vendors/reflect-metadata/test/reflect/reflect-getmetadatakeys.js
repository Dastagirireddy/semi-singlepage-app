// Reflect.getMetadataKeys ( target [, propertyKey] )
// - https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#reflectgetmetadatakeys--target--propertykey-
System.register(["../../Reflect", "assert"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var assert;
    function ReflectGetMetadataKeysInvalidTarget() {
        // 1. If Type(target) is not Object, throw a TypeError exception.
        assert.throws(function () { return Reflect.getMetadataKeys(undefined, undefined); }, TypeError);
    }
    exports_1("ReflectGetMetadataKeysInvalidTarget", ReflectGetMetadataKeysInvalidTarget);
    function ReflectGetMetadataKeysWithoutTargetKeyWhenNotDefined() {
        var obj = {};
        var result = Reflect.getMetadataKeys(obj, undefined);
        assert.deepEqual(result, []);
    }
    exports_1("ReflectGetMetadataKeysWithoutTargetKeyWhenNotDefined", ReflectGetMetadataKeysWithoutTargetKeyWhenNotDefined);
    function ReflectGetMetadataKeysWithoutTargetKeyWhenDefined() {
        var obj = {};
        Reflect.defineMetadata("key", "value", obj, undefined);
        var result = Reflect.getMetadataKeys(obj, undefined);
        assert.deepEqual(result, ["key"]);
    }
    exports_1("ReflectGetMetadataKeysWithoutTargetKeyWhenDefined", ReflectGetMetadataKeysWithoutTargetKeyWhenDefined);
    function ReflectGetMetadataKeysWithoutTargetKeyWhenDefinedOnPrototype() {
        var prototype = {};
        var obj = Object.create(prototype);
        Reflect.defineMetadata("key", "value", prototype, undefined);
        var result = Reflect.getMetadataKeys(obj, undefined);
        assert.deepEqual(result, ["key"]);
    }
    exports_1("ReflectGetMetadataKeysWithoutTargetKeyWhenDefinedOnPrototype", ReflectGetMetadataKeysWithoutTargetKeyWhenDefinedOnPrototype);
    function ReflectGetMetadataKeysOrderWithoutTargetKey() {
        var obj = {};
        Reflect.defineMetadata("key1", "value", obj, undefined);
        Reflect.defineMetadata("key0", "value", obj, undefined);
        var result = Reflect.getMetadataKeys(obj, undefined);
        assert.deepEqual(result, ["key1", "key0"]);
    }
    exports_1("ReflectGetMetadataKeysOrderWithoutTargetKey", ReflectGetMetadataKeysOrderWithoutTargetKey);
    function ReflectGetMetadataKeysOrderAfterRedefineWithoutTargetKey() {
        var obj = {};
        Reflect.defineMetadata("key1", "value", obj, undefined);
        Reflect.defineMetadata("key0", "value", obj, undefined);
        Reflect.defineMetadata("key1", "value", obj, undefined);
        var result = Reflect.getMetadataKeys(obj, undefined);
        assert.deepEqual(result, ["key1", "key0"]);
    }
    exports_1("ReflectGetMetadataKeysOrderAfterRedefineWithoutTargetKey", ReflectGetMetadataKeysOrderAfterRedefineWithoutTargetKey);
    function ReflectGetMetadataKeysOrderWithoutTargetKeyWhenDefinedOnPrototype() {
        var prototype = {};
        Reflect.defineMetadata("key2", "value", prototype, undefined);
        var obj = Object.create(prototype);
        Reflect.defineMetadata("key1", "value", obj, undefined);
        Reflect.defineMetadata("key0", "value", obj, undefined);
        var result = Reflect.getMetadataKeys(obj, undefined);
        assert.deepEqual(result, ["key1", "key0", "key2"]);
    }
    exports_1("ReflectGetMetadataKeysOrderWithoutTargetKeyWhenDefinedOnPrototype", ReflectGetMetadataKeysOrderWithoutTargetKeyWhenDefinedOnPrototype);
    function ReflectGetMetadataKeysWithTargetKeyWhenNotDefined() {
        var obj = {};
        var result = Reflect.getMetadataKeys(obj, "name");
        assert.deepEqual(result, []);
    }
    exports_1("ReflectGetMetadataKeysWithTargetKeyWhenNotDefined", ReflectGetMetadataKeysWithTargetKeyWhenNotDefined);
    function ReflectGetMetadataKeysWithTargetKeyWhenDefined() {
        var obj = {};
        Reflect.defineMetadata("key", "value", obj, "name");
        var result = Reflect.getMetadataKeys(obj, "name");
        assert.deepEqual(result, ["key"]);
    }
    exports_1("ReflectGetMetadataKeysWithTargetKeyWhenDefined", ReflectGetMetadataKeysWithTargetKeyWhenDefined);
    function ReflectGetMetadataKeysWithTargetKeyWhenDefinedOnPrototype() {
        var prototype = {};
        var obj = Object.create(prototype);
        Reflect.defineMetadata("key", "value", prototype, "name");
        var result = Reflect.getMetadataKeys(obj, "name");
        assert.deepEqual(result, ["key"]);
    }
    exports_1("ReflectGetMetadataKeysWithTargetKeyWhenDefinedOnPrototype", ReflectGetMetadataKeysWithTargetKeyWhenDefinedOnPrototype);
    function ReflectGetMetadataKeysOrderAfterRedefineWithTargetKey() {
        var obj = {};
        Reflect.defineMetadata("key1", "value", obj, "name");
        Reflect.defineMetadata("key0", "value", obj, "name");
        Reflect.defineMetadata("key1", "value", obj, "name");
        var result = Reflect.getMetadataKeys(obj, "name");
        assert.deepEqual(result, ["key1", "key0"]);
    }
    exports_1("ReflectGetMetadataKeysOrderAfterRedefineWithTargetKey", ReflectGetMetadataKeysOrderAfterRedefineWithTargetKey);
    function ReflectGetMetadataKeysOrderWithTargetKeyWhenDefinedOnPrototype() {
        var prototype = {};
        Reflect.defineMetadata("key2", "value", prototype, "name");
        var obj = Object.create(prototype);
        Reflect.defineMetadata("key1", "value", obj, "name");
        Reflect.defineMetadata("key0", "value", obj, "name");
        var result = Reflect.getMetadataKeys(obj, "name");
        assert.deepEqual(result, ["key1", "key0", "key2"]);
    }
    exports_1("ReflectGetMetadataKeysOrderWithTargetKeyWhenDefinedOnPrototype", ReflectGetMetadataKeysOrderWithTargetKeyWhenDefinedOnPrototype);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3JlZmxlY3QtbWV0YWRhdGEvdGVzdC9yZWZsZWN0L3JlZmxlY3QtZ2V0bWV0YWRhdGFrZXlzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFEQUFxRDtBQUNyRCw2SEFBNkg7Ozs7O0lBSzdIO1FBQ0ksaUVBQWlFO1FBQ2pFLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxFQUE3QyxDQUE2QyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFIRCxxRkFHQyxDQUFBO0lBRUQ7UUFDSSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNyRCxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBSkQsdUhBSUMsQ0FBQTtJQUVEO1FBQ0ksSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN2RCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNyRCxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUxELGlIQUtDLENBQUE7SUFFRDtRQUNJLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENB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UyxDQUFDLENBQUM7UUFDbkMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNyRCxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3JELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2xELE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFSRCwySUFRQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL3JlZmxlY3QtbWV0YWRhdGEvdGVzdC9yZWZsZWN0L3JlZmxlY3QtZ2V0bWV0YWRhdGFrZXlzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gUmVmbGVjdC5nZXRNZXRhZGF0YUtleXMgKCB0YXJnZXQgWywgcHJvcGVydHlLZXldIClcclxuLy8gLSBodHRwczovL2dpdGh1Yi5jb20vam9uYXRoYW5kdHVybmVyL2RlY29yYXRvcnMvYmxvYi9tYXN0ZXIvc3BlY3MvbWV0YWRhdGEubWQjcmVmbGVjdGdldG1ldGFkYXRha2V5cy0tdGFyZ2V0LS1wcm9wZXJ0eWtleS1cclxuXHJcbmltcG9ydCBcIi4uLy4uL1JlZmxlY3RcIjtcclxuaW1wb3J0ICogYXMgYXNzZXJ0IGZyb20gXCJhc3NlcnRcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0R2V0TWV0YWRhdGFLZXlzSW52YWxpZFRhcmdldCgpIHtcclxuICAgIC8vIDEuIElmIFR5cGUodGFyZ2V0KSBpcyBub3QgT2JqZWN0LCB0aHJvdyBhIFR5cGVFcnJvciBleGNlcHRpb24uXHJcbiAgICBhc3NlcnQudGhyb3dzKCgpID0+IFJlZmxlY3QuZ2V0TWV0YWRhdGFLZXlzKHVuZGVmaW5lZCwgdW5kZWZpbmVkKSwgVHlwZUVycm9yKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RHZXRNZXRhZGF0YUtleXNXaXRob3V0VGFyZ2V0S2V5V2hlbk5vdERlZmluZWQoKSB7XHJcbiAgICBsZXQgb2JqID0ge307XHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YUtleXMob2JqLCB1bmRlZmluZWQpO1xyXG4gICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIFtdKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RHZXRNZXRhZGF0YUtleXNXaXRob3V0VGFyZ2V0S2V5V2hlbkRlZmluZWQoKSB7XHJcbiAgICBsZXQgb2JqID0ge307XHJcbiAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwia2V5XCIsIFwidmFsdWVcIiwgb2JqLCB1bmRlZmluZWQpO1xyXG4gICAgbGV0IHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGFLZXlzKG9iaiwgdW5kZWZpbmVkKTtcclxuICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LCBbXCJrZXlcIl0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdEdldE1ldGFkYXRhS2V5c1dpdGhvdXRUYXJnZXRLZXlXaGVuRGVmaW5lZE9uUHJvdG90eXBlKCkge1xyXG4gICAgbGV0IHByb3RvdHlwZSA9IHt9O1xyXG4gICAgbGV0IG9iaiA9IE9iamVjdC5jcmVhdGUocHJvdG90eXBlKTtcclxuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXlcIiwgXCJ2YWx1ZVwiLCBwcm90b3R5cGUsIHVuZGVmaW5lZCk7XHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YUtleXMob2JqLCB1bmRlZmluZWQpO1xyXG4gICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIFtcImtleVwiXSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0R2V0TWV0YWRhdGFLZXlzT3JkZXJXaXRob3V0VGFyZ2V0S2V5KCkge1xyXG4gICAgbGV0IG9iaiA9IHt9O1xyXG4gICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleTFcIiwgXCJ2YWx1ZVwiLCBvYmosIHVuZGVmaW5lZCk7XHJcbiAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwia2V5MFwiLCBcInZhbHVlXCIsIG9iaiwgdW5kZWZpbmVkKTtcclxuICAgIGxldCByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhS2V5cyhvYmosIHVuZGVmaW5lZCk7XHJcbiAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdCwgW1wia2V5MVwiLCBcImtleTBcIl0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdEdldE1ldGFkYXRhS2V5c09yZGVyQWZ0ZXJSZWRlZmluZVdpdGhvdXRUYXJnZXRLZXkoKSB7XHJcbiAgICBsZXQgb2JqID0ge307XHJcbiAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwia2V5MVwiLCBcInZhbHVlXCIsIG9iaiwgdW5kZWZpbmVkKTtcclxuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXkwXCIsIFwidmFsdWVcIiwgb2JqLCB1bmRlZmluZWQpO1xyXG4gICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleTFcIiwgXCJ2YWx1ZVwiLCBvYmosIHVuZGVmaW5lZCk7XHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YUtleXMob2JqLCB1bmRlZmluZWQpO1xyXG4gICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIFtcImtleTFcIiwgXCJrZXkwXCJdKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RHZXRNZXRhZGF0YUtleXNPcmRlcldpdGhvdXRUYXJnZXRLZXlXaGVuRGVmaW5lZE9uUHJvdG90eXBlKCkge1xyXG4gICAgbGV0IHByb3RvdHlwZSA9IHt9O1xyXG4gICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleTJcIiwgXCJ2YWx1ZVwiLCBwcm90b3R5cGUsIHVuZGVmaW5lZCk7XHJcbiAgICBsZXQgb2JqID0gT2JqZWN0LmNyZWF0ZShwcm90b3R5cGUpO1xyXG4gICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleTFcIiwgXCJ2YWx1ZVwiLCBvYmosIHVuZGVmaW5lZCk7XHJcbiAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwia2V5MFwiLCBcInZhbHVlXCIsIG9iaiwgdW5kZWZpbmVkKTtcclxuICAgIGxldCByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhS2V5cyhvYmosIHVuZGVmaW5lZCk7XHJcbiAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdCwgW1wia2V5MVwiLCBcImtleTBcIiwgXCJrZXkyXCJdKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RHZXRNZXRhZGF0YUtleXNXaXRoVGFyZ2V0S2V5V2hlbk5vdERlZmluZWQoKSB7XHJcbiAgICBsZXQgb2JqID0ge307XHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YUtleXMob2JqLCBcIm5hbWVcIik7XHJcbiAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdCwgW10pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdEdldE1ldGFkYXRhS2V5c1dpdGhUYXJnZXRLZXlXaGVuRGVmaW5lZCgpIHtcclxuICAgIGxldCBvYmogPSB7fTtcclxuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXlcIiwgXCJ2YWx1ZVwiLCBvYmosIFwibmFtZVwiKTtcclxuICAgIGxldCByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhS2V5cyhvYmosIFwibmFtZVwiKTtcclxuICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LCBbXCJrZXlcIl0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdEdldE1ldGFkYXRhS2V5c1dpdGhUYXJnZXRLZXlXaGVuRGVmaW5lZE9uUHJvdG90eXBlKCkge1xyXG4gICAgbGV0IHByb3RvdHlwZSA9IHt9O1xyXG4gICAgbGV0IG9iaiA9IE9iamVjdC5jcmVhdGUocHJvdG90eXBlKTtcclxuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXlcIiwgXCJ2YWx1ZVwiLCBwcm90b3R5cGUsIFwibmFtZVwiKTtcclxuICAgIGxldCByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhS2V5cyhvYmosIFwibmFtZVwiKTtcclxuICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LCBbXCJrZXlcIl0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdEdldE1ldGFkYXRhS2V5c09yZGVyQWZ0ZXJSZWRlZmluZVdpdGhUYXJnZXRLZXkoKSB7XHJcbiAgICBsZXQgb2JqID0ge307XHJcbiAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwia2V5MVwiLCBcInZhbHVlXCIsIG9iaiwgXCJuYW1lXCIpO1xyXG4gICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleTBcIiwgXCJ2YWx1ZVwiLCBvYmosIFwibmFtZVwiKTtcclxuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXkxXCIsIFwidmFsdWVcIiwgb2JqLCBcIm5hbWVcIik7XHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YUtleXMob2JqLCBcIm5hbWVcIik7XHJcbiAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdCwgW1wia2V5MVwiLCBcImtleTBcIl0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdEdldE1ldGFkYXRhS2V5c09yZGVyV2l0aFRhcmdldEtleVdoZW5EZWZpbmVkT25Qcm90b3R5cGUoKSB7XHJcbiAgICBsZXQgcHJvdG90eXBlID0ge307XHJcbiAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwia2V5MlwiLCBcInZhbHVlXCIsIHByb3RvdHlwZSwgXCJuYW1lXCIpO1xyXG4gICAgbGV0IG9iaiA9IE9iamVjdC5jcmVhdGUocHJvdG90eXBlKTtcclxuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXkxXCIsIFwidmFsdWVcIiwgb2JqLCBcIm5hbWVcIik7XHJcbiAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwia2V5MFwiLCBcInZhbHVlXCIsIG9iaiwgXCJuYW1lXCIpO1xyXG4gICAgbGV0IHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGFLZXlzKG9iaiwgXCJuYW1lXCIpO1xyXG4gICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIFtcImtleTFcIiwgXCJrZXkwXCIsIFwia2V5MlwiXSk7XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
