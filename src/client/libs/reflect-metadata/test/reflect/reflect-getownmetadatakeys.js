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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvcmVmbGVjdC1tZXRhZGF0YS90ZXN0L3JlZmxlY3QvcmVmbGVjdC1nZXRvd25tZXRhZGF0YWtleXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNERBQTREO0FBQzVELG9JQUFvSTs7Ozs7SUFLcEk7UUFDSSxpRUFBaUU7UUFDakUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsRUFBaEQsQ0FBZ0QsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBSEQsbUdBR0MsQ0FBQTtJQUVEO1FBQ0ksSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN4RCxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBSkQsNkhBSUMsQ0FBQTtJQUVEO1FBQ0ksSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN2RCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBTEQsdUhBS0MsQ0FBQTtJQUVEO1FBQ0ksSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFB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QU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3JELE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDckQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNyRCxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFQRCwrSEFPQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvcmVmbGVjdC1tZXRhZGF0YS90ZXN0L3JlZmxlY3QvcmVmbGVjdC1nZXRvd25tZXRhZGF0YWtleXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBSZWZsZWN0LmdldE93bk1ldGFkYXRhS2V5c0tleXMgKCB0YXJnZXQgWywgcHJvcGVydHlLZXldIClcclxuLy8gLSBodHRwczovL2dpdGh1Yi5jb20vam9uYXRoYW5kdHVybmVyL2RlY29yYXRvcnMvYmxvYi9tYXN0ZXIvc3BlY3MvbWV0YWRhdGEubWQjcmVmbGVjdGdldG93bm1ldGFkYXRha2V5c2tleXMtLXRhcmdldC0tcHJvcGVydHlrZXktXHJcblxyXG5pbXBvcnQgXCIuLi8uLi9SZWZsZWN0XCI7XHJcbmltcG9ydCAqIGFzIGFzc2VydCBmcm9tIFwiYXNzZXJ0XCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdEdldE93bk1ldGFkYXRhS2V5c0tleXNJbnZhbGlkVGFyZ2V0KCkge1xyXG4gICAgLy8gMS4gSWYgVHlwZSh0YXJnZXQpIGlzIG5vdCBPYmplY3QsIHRocm93IGEgVHlwZUVycm9yIGV4Y2VwdGlvbi5cclxuICAgIGFzc2VydC50aHJvd3MoKCkgPT4gUmVmbGVjdC5nZXRPd25NZXRhZGF0YUtleXModW5kZWZpbmVkLCB1bmRlZmluZWQpLCBUeXBlRXJyb3IpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdEdldE93bk1ldGFkYXRhS2V5c1dpdGhvdXRUYXJnZXRLZXlXaGVuTm90RGVmaW5lZCgpIHtcclxuICAgIGxldCBvYmogPSB7fTtcclxuICAgIGxldCByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhS2V5cyhvYmosIHVuZGVmaW5lZCk7XHJcbiAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdCwgW10pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdEdldE93bk1ldGFkYXRhS2V5c1dpdGhvdXRUYXJnZXRLZXlXaGVuRGVmaW5lZCgpIHtcclxuICAgIGxldCBvYmogPSB7fTtcclxuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXlcIiwgXCJ2YWx1ZVwiLCBvYmosIHVuZGVmaW5lZCk7XHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YUtleXMob2JqLCB1bmRlZmluZWQpO1xyXG4gICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIFtcImtleVwiXSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0R2V0T3duTWV0YWRhdGFLZXlzV2l0aG91dFRhcmdldEtleVdoZW5EZWZpbmVkT25Qcm90b3R5cGUoKSB7XHJcbiAgICBsZXQgcHJvdG90eXBlID0ge307XHJcbiAgICBsZXQgb2JqID0gT2JqZWN0LmNyZWF0ZShwcm90b3R5cGUpO1xyXG4gICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleVwiLCBcInZhbHVlXCIsIHByb3RvdHlwZSwgdW5kZWZpbmVkKTtcclxuICAgIGxldCByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhS2V5cyhvYmosIHVuZGVmaW5lZCk7XHJcbiAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdCwgW10pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdEdldE93bk1ldGFkYXRhS2V5c09yZGVyV2l0aG91dFRhcmdldEtleSgpIHtcclxuICAgIGxldCBvYmogPSB7fTtcclxuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXkxXCIsIFwidmFsdWVcIiwgb2JqLCB1bmRlZmluZWQpO1xyXG4gICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleTBcIiwgXCJ2YWx1ZVwiLCBvYmosIHVuZGVmaW5lZCk7XHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YUtleXMob2JqLCB1bmRlZmluZWQpO1xyXG4gICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIFtcImtleTFcIiwgXCJrZXkwXCJdKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RHZXRPd25NZXRhZGF0YUtleXNPcmRlckFmdGVyUmVkZWZpbmVXaXRob3V0VGFyZ2V0S2V5KCkge1xyXG4gICAgbGV0IG9iaiA9IHt9O1xyXG4gICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleTFcIiwgXCJ2YWx1ZVwiLCBvYmosIHVuZGVmaW5lZCk7XHJcbiAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwia2V5MFwiLCBcInZhbHVlXCIsIG9iaiwgdW5kZWZpbmVkKTtcclxuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXkxXCIsIFwidmFsdWVcIiwgb2JqLCB1bmRlZmluZWQpO1xyXG4gICAgbGV0IHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGFLZXlzKG9iaiwgdW5kZWZpbmVkKTtcclxuICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LCBbXCJrZXkxXCIsIFwia2V5MFwiXSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0R2V0T3duTWV0YWRhdGFLZXlzV2l0aFRhcmdldEtleVdoZW5Ob3REZWZpbmVkKCkge1xyXG4gICAgbGV0IG9iaiA9IHt9O1xyXG4gICAgbGV0IHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGFLZXlzKG9iaiwgXCJuYW1lXCIpO1xyXG4gICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIFtdKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RHZXRPd25NZXRhZGF0YUtleXNXaXRoVGFyZ2V0S2V5V2hlbkRlZmluZWQoKSB7XHJcbiAgICBsZXQgb2JqID0ge307XHJcbiAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwia2V5XCIsIFwidmFsdWVcIiwgb2JqLCBcIm5hbWVcIik7XHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YUtleXMob2JqLCBcIm5hbWVcIik7XHJcbiAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdCwgW1wia2V5XCJdKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RHZXRPd25NZXRhZGF0YUtleXNXaXRoVGFyZ2V0S2V5V2hlbkRlZmluZWRPblByb3RvdHlwZSgpIHtcclxuICAgIGxldCBwcm90b3R5cGUgPSB7fTtcclxuICAgIGxldCBvYmogPSBPYmplY3QuY3JlYXRlKHByb3RvdHlwZSk7XHJcbiAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwia2V5XCIsIFwidmFsdWVcIiwgcHJvdG90eXBlLCBcIm5hbWVcIik7XHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YUtleXMob2JqLCBcIm5hbWVcIik7XHJcbiAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdCwgW10pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdEdldE93bk1ldGFkYXRhS2V5c09yZGVyQWZ0ZXJSZWRlZmluZVdpdGhUYXJnZXRLZXkoKSB7XHJcbiAgICBsZXQgb2JqID0ge307XHJcbiAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwia2V5MVwiLCBcInZhbHVlXCIsIG9iaiwgXCJuYW1lXCIpO1xyXG4gICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleTBcIiwgXCJ2YWx1ZVwiLCBvYmosIFwibmFtZVwiKTtcclxuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXkxXCIsIFwidmFsdWVcIiwgb2JqLCBcIm5hbWVcIik7XHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YUtleXMob2JqLCBcIm5hbWVcIik7XHJcbiAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdCwgW1wia2V5MVwiLCBcImtleTBcIl0pO1xyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
