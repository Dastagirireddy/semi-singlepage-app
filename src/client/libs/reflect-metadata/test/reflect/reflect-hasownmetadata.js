// Reflect.hasOwnMetadata ( metadataKey, target [, propertyKey] )
// - https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#reflecthasownmetadata--metadatakey-target--propertykey-
System.register(["../../Reflect", "assert"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var assert;
    function ReflectHasOwnMetadataInvalidTarget() {
        assert.throws(function () { return Reflect.hasOwnMetadata("key", undefined, undefined); }, TypeError);
    }
    exports_1("ReflectHasOwnMetadataInvalidTarget", ReflectHasOwnMetadataInvalidTarget);
    function ReflectHasOwnMetadataWithoutTargetKeyWhenNotDefined() {
        var obj = {};
        var result = Reflect.hasOwnMetadata("key", obj, undefined);
        assert.equal(result, false);
    }
    exports_1("ReflectHasOwnMetadataWithoutTargetKeyWhenNotDefined", ReflectHasOwnMetadataWithoutTargetKeyWhenNotDefined);
    function ReflectHasOwnMetadataWithoutTargetKeyWhenDefined() {
        var obj = {};
        Reflect.defineMetadata("key", "value", obj, undefined);
        var result = Reflect.hasOwnMetadata("key", obj, undefined);
        assert.equal(result, true);
    }
    exports_1("ReflectHasOwnMetadataWithoutTargetKeyWhenDefined", ReflectHasOwnMetadataWithoutTargetKeyWhenDefined);
    function ReflectHasOwnMetadataWithoutTargetKeyWhenDefinedOnPrototype() {
        var prototype = {};
        var obj = Object.create(prototype);
        Reflect.defineMetadata("key", "value", prototype, undefined);
        var result = Reflect.hasOwnMetadata("key", obj, undefined);
        assert.equal(result, false);
    }
    exports_1("ReflectHasOwnMetadataWithoutTargetKeyWhenDefinedOnPrototype", ReflectHasOwnMetadataWithoutTargetKeyWhenDefinedOnPrototype);
    function ReflectHasOwnMetadataWithTargetKeyWhenNotDefined() {
        var obj = {};
        var result = Reflect.hasOwnMetadata("key", obj, "name");
        assert.equal(result, false);
    }
    exports_1("ReflectHasOwnMetadataWithTargetKeyWhenNotDefined", ReflectHasOwnMetadataWithTargetKeyWhenNotDefined);
    function ReflectHasOwnMetadataWithTargetKeyWhenDefined() {
        var obj = {};
        Reflect.defineMetadata("key", "value", obj, "name");
        var result = Reflect.hasOwnMetadata("key", obj, "name");
        assert.equal(result, true);
    }
    exports_1("ReflectHasOwnMetadataWithTargetKeyWhenDefined", ReflectHasOwnMetadataWithTargetKeyWhenDefined);
    function ReflectHasOwnMetadataWithTargetKeyWhenDefinedOnPrototype() {
        var prototype = {};
        var obj = Object.create(prototype);
        Reflect.defineMetadata("key", "value", prototype, "name");
        var result = Reflect.hasOwnMetadata("key", obj, "name");
        assert.equal(result, false);
    }
    exports_1("ReflectHasOwnMetadataWithTargetKeyWhenDefinedOnPrototype", ReflectHasOwnMetadataWithTargetKeyWhenDefinedOnPrototype);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvcmVmbGVjdC1tZXRhZGF0YS90ZXN0L3JlZmxlY3QvcmVmbGVjdC1oYXNvd25tZXRhZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxpRUFBaUU7QUFDakUsd0lBQXdJOzs7OztJQUt4STtRQUNJLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsRUFBbkQsQ0FBbUQsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBRkQsbUZBRUMsQ0FBQTtJQUVEO1FBQ0ksSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzNELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFKRCxxSEFJQyxDQUFBO0lBRUQ7UUFDSSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYixPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMzRCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBTEQsK0dBS0MsQ0FBQTtJQUVEO1FBQ0ksSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM3RCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDM0QsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQU5ELHFJQU1DLENBQUE7SUFFRDtRQUNJLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN4RCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBSkQsK0dBSUMsQ0FBQTtJQUVEO1FBQ0ksSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNwRCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDeEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUxELHlHQUtDLENBQUE7SUFFRDtRQUNJLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDMUQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFORCwrSEFNQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvcmVmbGVjdC1tZXRhZGF0YS90ZXN0L3JlZmxlY3QvcmVmbGVjdC1oYXNvd25tZXRhZGF0YS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFJlZmxlY3QuaGFzT3duTWV0YWRhdGEgKCBtZXRhZGF0YUtleSwgdGFyZ2V0IFssIHByb3BlcnR5S2V5XSApXHJcbi8vIC0gaHR0cHM6Ly9naXRodWIuY29tL2pvbmF0aGFuZHR1cm5lci9kZWNvcmF0b3JzL2Jsb2IvbWFzdGVyL3NwZWNzL21ldGFkYXRhLm1kI3JlZmxlY3RoYXNvd25tZXRhZGF0YS0tbWV0YWRhdGFrZXktdGFyZ2V0LS1wcm9wZXJ0eWtleS1cclxuXHJcbmltcG9ydCBcIi4uLy4uL1JlZmxlY3RcIjtcclxuaW1wb3J0ICogYXMgYXNzZXJ0IGZyb20gXCJhc3NlcnRcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0SGFzT3duTWV0YWRhdGFJbnZhbGlkVGFyZ2V0KCkge1xyXG4gICAgYXNzZXJ0LnRocm93cygoKSA9PiBSZWZsZWN0Lmhhc093bk1ldGFkYXRhKFwia2V5XCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKSwgVHlwZUVycm9yKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RIYXNPd25NZXRhZGF0YVdpdGhvdXRUYXJnZXRLZXlXaGVuTm90RGVmaW5lZCgpIHtcclxuICAgIGxldCBvYmogPSB7fTtcclxuICAgIGxldCByZXN1bHQgPSBSZWZsZWN0Lmhhc093bk1ldGFkYXRhKFwia2V5XCIsIG9iaiwgdW5kZWZpbmVkKTtcclxuICAgIGFzc2VydC5lcXVhbChyZXN1bHQsIGZhbHNlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RIYXNPd25NZXRhZGF0YVdpdGhvdXRUYXJnZXRLZXlXaGVuRGVmaW5lZCgpIHtcclxuICAgIGxldCBvYmogPSB7fTtcclxuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXlcIiwgXCJ2YWx1ZVwiLCBvYmosIHVuZGVmaW5lZCk7XHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5oYXNPd25NZXRhZGF0YShcImtleVwiLCBvYmosIHVuZGVmaW5lZCk7XHJcbiAgICBhc3NlcnQuZXF1YWwocmVzdWx0LCB0cnVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RIYXNPd25NZXRhZGF0YVdpdGhvdXRUYXJnZXRLZXlXaGVuRGVmaW5lZE9uUHJvdG90eXBlKCkge1xyXG4gICAgbGV0IHByb3RvdHlwZSA9IHt9O1xyXG4gICAgbGV0IG9iaiA9IE9iamVjdC5jcmVhdGUocHJvdG90eXBlKTtcclxuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXlcIiwgXCJ2YWx1ZVwiLCBwcm90b3R5cGUsIHVuZGVmaW5lZCk7XHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5oYXNPd25NZXRhZGF0YShcImtleVwiLCBvYmosIHVuZGVmaW5lZCk7XHJcbiAgICBhc3NlcnQuZXF1YWwocmVzdWx0LCBmYWxzZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0SGFzT3duTWV0YWRhdGFXaXRoVGFyZ2V0S2V5V2hlbk5vdERlZmluZWQoKSB7XHJcbiAgICBsZXQgb2JqID0ge307XHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5oYXNPd25NZXRhZGF0YShcImtleVwiLCBvYmosIFwibmFtZVwiKTtcclxuICAgIGFzc2VydC5lcXVhbChyZXN1bHQsIGZhbHNlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RIYXNPd25NZXRhZGF0YVdpdGhUYXJnZXRLZXlXaGVuRGVmaW5lZCgpIHtcclxuICAgIGxldCBvYmogPSB7fTtcclxuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXlcIiwgXCJ2YWx1ZVwiLCBvYmosIFwibmFtZVwiKTtcclxuICAgIGxldCByZXN1bHQgPSBSZWZsZWN0Lmhhc093bk1ldGFkYXRhKFwia2V5XCIsIG9iaiwgXCJuYW1lXCIpO1xyXG4gICAgYXNzZXJ0LmVxdWFsKHJlc3VsdCwgdHJ1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0SGFzT3duTWV0YWRhdGFXaXRoVGFyZ2V0S2V5V2hlbkRlZmluZWRPblByb3RvdHlwZSgpIHtcclxuICAgIGxldCBwcm90b3R5cGUgPSB7fTtcclxuICAgIGxldCBvYmogPSBPYmplY3QuY3JlYXRlKHByb3RvdHlwZSk7XHJcbiAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwia2V5XCIsIFwidmFsdWVcIiwgcHJvdG90eXBlLCBcIm5hbWVcIik7XHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5oYXNPd25NZXRhZGF0YShcImtleVwiLCBvYmosIFwibmFtZVwiKTtcclxuICAgIGFzc2VydC5lcXVhbChyZXN1bHQsIGZhbHNlKTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
