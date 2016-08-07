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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3JlZmxlY3QtbWV0YWRhdGEvdGVzdC9yZWZsZWN0L3JlZmxlY3QtZ2V0b3dubWV0YWRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsaUVBQWlFO0FBQ2pFLHdJQUF3STs7Ozs7SUFLeEk7UUFDSSxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQW5ELENBQW1ELEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQUZELG1GQUVDLENBQUE7SUFFRDtRQUNJLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMzRCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBSkQscUhBSUMsQ0FBQTtJQUVEO1FBQ0ksSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN2RCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDM0QsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUxELCtHQUtDLENBQUE7SUFFRDtRQUNJLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDN0QsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzNELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFORCxxSUFNQyxDQUFBO0lBRUQ7UUFDSSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDeEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUpELCtHQUlDLENBQUE7SUFFRDtRQUNJLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFMRCx5R0FLQyxDQUFBO0lBRUQ7UUFDSSxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuQyxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzFELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN4RCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBTkQsK0hBTUMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9yZWZsZWN0LW1ldGFkYXRhL3Rlc3QvcmVmbGVjdC9yZWZsZWN0LWdldG93bm1ldGFkYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gUmVmbGVjdC5nZXRPd25NZXRhZGF0YSAoIG1ldGFkYXRhS2V5LCB0YXJnZXQgWywgcHJvcGVydHlLZXldIClcclxuLy8gLSBodHRwczovL2dpdGh1Yi5jb20vam9uYXRoYW5kdHVybmVyL2RlY29yYXRvcnMvYmxvYi9tYXN0ZXIvc3BlY3MvbWV0YWRhdGEubWQjcmVmbGVjdGdldG93bm1ldGFkYXRhLS1tZXRhZGF0YWtleS10YXJnZXQtLXByb3BlcnR5a2V5LVxyXG5cclxuaW1wb3J0IFwiLi4vLi4vUmVmbGVjdFwiO1xyXG5pbXBvcnQgKiBhcyBhc3NlcnQgZnJvbSBcImFzc2VydFwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RHZXRPd25NZXRhZGF0YUludmFsaWRUYXJnZXQoKSB7XHJcbiAgICBhc3NlcnQudGhyb3dzKCgpID0+IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGEoXCJrZXlcIiwgdW5kZWZpbmVkLCB1bmRlZmluZWQpLCBUeXBlRXJyb3IpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdEdldE93bk1ldGFkYXRhV2l0aG91dFRhcmdldEtleVdoZW5Ob3REZWZpbmVkKCkge1xyXG4gICAgbGV0IG9iaiA9IHt9O1xyXG4gICAgbGV0IHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGEoXCJrZXlcIiwgb2JqLCB1bmRlZmluZWQpO1xyXG4gICAgYXNzZXJ0LmVxdWFsKHJlc3VsdCwgdW5kZWZpbmVkKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RHZXRPd25NZXRhZGF0YVdpdGhvdXRUYXJnZXRLZXlXaGVuRGVmaW5lZCgpIHtcclxuICAgIGxldCBvYmogPSB7fTtcclxuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXlcIiwgXCJ2YWx1ZVwiLCBvYmosIHVuZGVmaW5lZCk7XHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YShcImtleVwiLCBvYmosIHVuZGVmaW5lZCk7XHJcbiAgICBhc3NlcnQuZXF1YWwocmVzdWx0LCBcInZhbHVlXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdEdldE93bk1ldGFkYXRhV2l0aG91dFRhcmdldEtleVdoZW5EZWZpbmVkT25Qcm90b3R5cGUoKSB7XHJcbiAgICBsZXQgcHJvdG90eXBlID0ge307XHJcbiAgICBsZXQgb2JqID0gT2JqZWN0LmNyZWF0ZShwcm90b3R5cGUpO1xyXG4gICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleVwiLCBcInZhbHVlXCIsIHByb3RvdHlwZSwgdW5kZWZpbmVkKTtcclxuICAgIGxldCByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhKFwia2V5XCIsIG9iaiwgdW5kZWZpbmVkKTtcclxuICAgIGFzc2VydC5lcXVhbChyZXN1bHQsIHVuZGVmaW5lZCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0R2V0T3duTWV0YWRhdGFXaXRoVGFyZ2V0S2V5V2hlbk5vdERlZmluZWQoKSB7XHJcbiAgICBsZXQgb2JqID0ge307XHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YShcImtleVwiLCBvYmosIFwibmFtZVwiKTtcclxuICAgIGFzc2VydC5lcXVhbChyZXN1bHQsIHVuZGVmaW5lZCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0R2V0T3duTWV0YWRhdGFXaXRoVGFyZ2V0S2V5V2hlbkRlZmluZWQoKSB7XHJcbiAgICBsZXQgb2JqID0ge307XHJcbiAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwia2V5XCIsIFwidmFsdWVcIiwgb2JqLCBcIm5hbWVcIik7XHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YShcImtleVwiLCBvYmosIFwibmFtZVwiKTtcclxuICAgIGFzc2VydC5lcXVhbChyZXN1bHQsIFwidmFsdWVcIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0R2V0T3duTWV0YWRhdGFXaXRoVGFyZ2V0S2V5V2hlbkRlZmluZWRPblByb3RvdHlwZSgpIHtcclxuICAgIGxldCBwcm90b3R5cGUgPSB7fTtcclxuICAgIGxldCBvYmogPSBPYmplY3QuY3JlYXRlKHByb3RvdHlwZSk7XHJcbiAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwia2V5XCIsIFwidmFsdWVcIiwgcHJvdG90eXBlLCBcIm5hbWVcIik7XHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YShcImtleVwiLCBvYmosIFwibmFtZVwiKTtcclxuICAgIGFzc2VydC5lcXVhbChyZXN1bHQsIHVuZGVmaW5lZCk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
