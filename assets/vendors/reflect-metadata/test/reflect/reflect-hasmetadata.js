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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3JlZmxlY3QtbWV0YWRhdGEvdGVzdC9yZWZsZWN0L3JlZmxlY3QtaGFzbWV0YWRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsOERBQThEO0FBQzlELHFJQUFxSTs7Ozs7SUFLckk7UUFDSSxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQWhELENBQWdELEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUZELDZFQUVDLENBQUE7SUFFRDtRQUNJLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN4RCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBSkQsK0dBSUMsQ0FBQTtJQUVEO1FBQ0ksSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN2RCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDeEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUxELHlHQUtDLENBQUE7SUFFRDtRQUNJLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDN0QsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFORCwrSEFNQyxDQUFBO0lBRUQ7UUFDSSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDckQsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUpELHlHQUlDLENBQUE7SUFFRDtRQUNJLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3JELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFMRCxtR0FLQyxDQUFBO0lBRUQ7UUFDSSxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuQyxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzFELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNyRCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBTkQseUhBTUMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9yZWZsZWN0LW1ldGFkYXRhL3Rlc3QvcmVmbGVjdC9yZWZsZWN0LWhhc21ldGFkYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gUmVmbGVjdC5oYXNNZXRhZGF0YSAoIG1ldGFkYXRhS2V5LCB0YXJnZXQgWywgcHJvcGVydHlLZXldIClcclxuLy8gLSBodHRwczovL2dpdGh1Yi5jb20vam9uYXRoYW5kdHVybmVyL2RlY29yYXRvcnMvYmxvYi9tYXN0ZXIvc3BlY3MvbWV0YWRhdGEubWQjcmVmbGVjdGhhc21ldGFkYXRhLS1tZXRhZGF0YWtleS10YXJnZXQtLXByb3BlcnR5a2V5LVxyXG5cclxuaW1wb3J0IFwiLi4vLi4vUmVmbGVjdFwiO1xyXG5pbXBvcnQgKiBhcyBhc3NlcnQgZnJvbSBcImFzc2VydFwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RIYXNNZXRhZGF0YUludmFsaWRUYXJnZXQoKSB7XHJcbiAgICBhc3NlcnQudGhyb3dzKCgpID0+IFJlZmxlY3QuaGFzTWV0YWRhdGEoXCJrZXlcIiwgdW5kZWZpbmVkLCB1bmRlZmluZWQpLCBUeXBlRXJyb3IpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdEhhc01ldGFkYXRhV2l0aG91dFRhcmdldEtleVdoZW5Ob3REZWZpbmVkKCkge1xyXG4gICAgbGV0IG9iaiA9IHt9O1xyXG4gICAgbGV0IHJlc3VsdCA9IFJlZmxlY3QuaGFzTWV0YWRhdGEoXCJrZXlcIiwgb2JqLCB1bmRlZmluZWQpO1xyXG4gICAgYXNzZXJ0LmVxdWFsKHJlc3VsdCwgZmFsc2UpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdEhhc01ldGFkYXRhV2l0aG91dFRhcmdldEtleVdoZW5EZWZpbmVkKCkge1xyXG4gICAgbGV0IG9iaiA9IHt9O1xyXG4gICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleVwiLCBcInZhbHVlXCIsIG9iaiwgdW5kZWZpbmVkKTtcclxuICAgIGxldCByZXN1bHQgPSBSZWZsZWN0Lmhhc01ldGFkYXRhKFwia2V5XCIsIG9iaiwgdW5kZWZpbmVkKTtcclxuICAgIGFzc2VydC5lcXVhbChyZXN1bHQsIHRydWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdEhhc01ldGFkYXRhV2l0aG91dFRhcmdldEtleVdoZW5EZWZpbmVkT25Qcm90b3R5cGUoKSB7XHJcbiAgICBsZXQgcHJvdG90eXBlID0ge307XHJcbiAgICBsZXQgb2JqID0gT2JqZWN0LmNyZWF0ZShwcm90b3R5cGUpO1xyXG4gICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleVwiLCBcInZhbHVlXCIsIHByb3RvdHlwZSwgdW5kZWZpbmVkKTtcclxuICAgIGxldCByZXN1bHQgPSBSZWZsZWN0Lmhhc01ldGFkYXRhKFwia2V5XCIsIG9iaiwgdW5kZWZpbmVkKTtcclxuICAgIGFzc2VydC5lcXVhbChyZXN1bHQsIHRydWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdEhhc01ldGFkYXRhV2l0aFRhcmdldEtleVdoZW5Ob3REZWZpbmVkKCkge1xyXG4gICAgbGV0IG9iaiA9IHt9O1xyXG4gICAgbGV0IHJlc3VsdCA9IFJlZmxlY3QuaGFzTWV0YWRhdGEoXCJrZXlcIiwgb2JqLCBcIm5hbWVcIik7XHJcbiAgICBhc3NlcnQuZXF1YWwocmVzdWx0LCBmYWxzZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0SGFzTWV0YWRhdGFXaXRoVGFyZ2V0S2V5V2hlbkRlZmluZWQoKSB7XHJcbiAgICBsZXQgb2JqID0ge307XHJcbiAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwia2V5XCIsIFwidmFsdWVcIiwgb2JqLCBcIm5hbWVcIik7XHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5oYXNNZXRhZGF0YShcImtleVwiLCBvYmosIFwibmFtZVwiKTtcclxuICAgIGFzc2VydC5lcXVhbChyZXN1bHQsIHRydWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdEhhc01ldGFkYXRhV2l0aFRhcmdldEtleVdoZW5EZWZpbmVkT25Qcm90b3R5cGUoKSB7XHJcbiAgICBsZXQgcHJvdG90eXBlID0ge307XHJcbiAgICBsZXQgb2JqID0gT2JqZWN0LmNyZWF0ZShwcm90b3R5cGUpO1xyXG4gICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleVwiLCBcInZhbHVlXCIsIHByb3RvdHlwZSwgXCJuYW1lXCIpO1xyXG4gICAgbGV0IHJlc3VsdCA9IFJlZmxlY3QuaGFzTWV0YWRhdGEoXCJrZXlcIiwgb2JqLCBcIm5hbWVcIik7XHJcbiAgICBhc3NlcnQuZXF1YWwocmVzdWx0LCB0cnVlKTtcclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
