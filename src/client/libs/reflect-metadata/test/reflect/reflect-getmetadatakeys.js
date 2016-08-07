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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvcmVmbGVjdC1tZXRhZGF0YS90ZXN0L3JlZmxlY3QvcmVmbGVjdC1nZXRtZXRhZGF0YWtleXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEscURBQXFEO0FBQ3JELDZIQUE2SDs7Ozs7SUFLN0g7UUFDSSxpRUFBaUU7UUFDakUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQTdDLENBQTZDLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUhELHFGQUdDLENBQUE7SUFFRDtRQUNJLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3JELE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFKRCx1SEFJQyxDQUFBO0lBRUQ7UUFDSSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYixPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3JELE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBTEQsaUhBS0MsQ0FBQTtJQUVEO1FBQ0ksSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM3RCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNyRCxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQU5ELHVJQU1DLENBQUE7SUFFRDtRQUNJLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDeEQsT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN4RCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNyRCxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFORCxxR0FNQyxDQUFBO0lBRUQ7UUFDSSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYixPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3hELE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDeEQsT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN4RCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNyRCxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFQRCwrSEFPQyxDQUFBO0lBRUQ7UUFDSSxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDbkIsT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM5RCxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDeEQsT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN4RCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNyRCxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBUkQsaUpBUUMsQ0FBQTtJQUVEO1FBQ0ksSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUpELGlIQUlDLENBQUE7SUFFRDtRQUNJLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFMRCwyR0FLQyxDQUFBO0lBRUQ7UUFDSSxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuQyxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzFELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2xELE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBTkQsaUlBTUMsQ0FBQTtJQUVEO1FBQ0ksSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNyRCxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3JELE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDckQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBUEQseUhBT0MsQ0FBQTtJQUVEO1FBQ0ksSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ25CLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDM0QsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuQyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3JELE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDckQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQVJELDJJQVFDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9yZWZsZWN0LW1ldGFkYXRhL3Rlc3QvcmVmbGVjdC9yZWZsZWN0LWdldG1ldGFkYXRha2V5cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFJlZmxlY3QuZ2V0TWV0YWRhdGFLZXlzICggdGFyZ2V0IFssIHByb3BlcnR5S2V5XSApXHJcbi8vIC0gaHR0cHM6Ly9naXRodWIuY29tL2pvbmF0aGFuZHR1cm5lci9kZWNvcmF0b3JzL2Jsb2IvbWFzdGVyL3NwZWNzL21ldGFkYXRhLm1kI3JlZmxlY3RnZXRtZXRhZGF0YWtleXMtLXRhcmdldC0tcHJvcGVydHlrZXktXHJcblxyXG5pbXBvcnQgXCIuLi8uLi9SZWZsZWN0XCI7XHJcbmltcG9ydCAqIGFzIGFzc2VydCBmcm9tIFwiYXNzZXJ0XCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdEdldE1ldGFkYXRhS2V5c0ludmFsaWRUYXJnZXQoKSB7XHJcbiAgICAvLyAxLiBJZiBUeXBlKHRhcmdldCkgaXMgbm90IE9iamVjdCwgdGhyb3cgYSBUeXBlRXJyb3IgZXhjZXB0aW9uLlxyXG4gICAgYXNzZXJ0LnRocm93cygoKSA9PiBSZWZsZWN0LmdldE1ldGFkYXRhS2V5cyh1bmRlZmluZWQsIHVuZGVmaW5lZCksIFR5cGVFcnJvcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0R2V0TWV0YWRhdGFLZXlzV2l0aG91dFRhcmdldEtleVdoZW5Ob3REZWZpbmVkKCkge1xyXG4gICAgbGV0IG9iaiA9IHt9O1xyXG4gICAgbGV0IHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGFLZXlzKG9iaiwgdW5kZWZpbmVkKTtcclxuICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LCBbXSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0R2V0TWV0YWRhdGFLZXlzV2l0aG91dFRhcmdldEtleVdoZW5EZWZpbmVkKCkge1xyXG4gICAgbGV0IG9iaiA9IHt9O1xyXG4gICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleVwiLCBcInZhbHVlXCIsIG9iaiwgdW5kZWZpbmVkKTtcclxuICAgIGxldCByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhS2V5cyhvYmosIHVuZGVmaW5lZCk7XHJcbiAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdCwgW1wia2V5XCJdKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RHZXRNZXRhZGF0YUtleXNXaXRob3V0VGFyZ2V0S2V5V2hlbkRlZmluZWRPblByb3RvdHlwZSgpIHtcclxuICAgIGxldCBwcm90b3R5cGUgPSB7fTtcclxuICAgIGxldCBvYmogPSBPYmplY3QuY3JlYXRlKHByb3RvdHlwZSk7XHJcbiAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwia2V5XCIsIFwidmFsdWVcIiwgcHJvdG90eXBlLCB1bmRlZmluZWQpO1xyXG4gICAgbGV0IHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGFLZXlzKG9iaiwgdW5kZWZpbmVkKTtcclxuICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LCBbXCJrZXlcIl0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdEdldE1ldGFkYXRhS2V5c09yZGVyV2l0aG91dFRhcmdldEtleSgpIHtcclxuICAgIGxldCBvYmogPSB7fTtcclxuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXkxXCIsIFwidmFsdWVcIiwgb2JqLCB1bmRlZmluZWQpO1xyXG4gICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleTBcIiwgXCJ2YWx1ZVwiLCBvYmosIHVuZGVmaW5lZCk7XHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YUtleXMob2JqLCB1bmRlZmluZWQpO1xyXG4gICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIFtcImtleTFcIiwgXCJrZXkwXCJdKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RHZXRNZXRhZGF0YUtleXNPcmRlckFmdGVyUmVkZWZpbmVXaXRob3V0VGFyZ2V0S2V5KCkge1xyXG4gICAgbGV0IG9iaiA9IHt9O1xyXG4gICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleTFcIiwgXCJ2YWx1ZVwiLCBvYmosIHVuZGVmaW5lZCk7XHJcbiAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwia2V5MFwiLCBcInZhbHVlXCIsIG9iaiwgdW5kZWZpbmVkKTtcclxuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXkxXCIsIFwidmFsdWVcIiwgb2JqLCB1bmRlZmluZWQpO1xyXG4gICAgbGV0IHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGFLZXlzKG9iaiwgdW5kZWZpbmVkKTtcclxuICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LCBbXCJrZXkxXCIsIFwia2V5MFwiXSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0R2V0TWV0YWRhdGFLZXlzT3JkZXJXaXRob3V0VGFyZ2V0S2V5V2hlbkRlZmluZWRPblByb3RvdHlwZSgpIHtcclxuICAgIGxldCBwcm90b3R5cGUgPSB7fTtcclxuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXkyXCIsIFwidmFsdWVcIiwgcHJvdG90eXBlLCB1bmRlZmluZWQpO1xyXG4gICAgbGV0IG9iaiA9IE9iamVjdC5jcmVhdGUocHJvdG90eXBlKTtcclxuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXkxXCIsIFwidmFsdWVcIiwgb2JqLCB1bmRlZmluZWQpO1xyXG4gICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleTBcIiwgXCJ2YWx1ZVwiLCBvYmosIHVuZGVmaW5lZCk7XHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YUtleXMob2JqLCB1bmRlZmluZWQpO1xyXG4gICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIFtcImtleTFcIiwgXCJrZXkwXCIsIFwia2V5MlwiXSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0R2V0TWV0YWRhdGFLZXlzV2l0aFRhcmdldEtleVdoZW5Ob3REZWZpbmVkKCkge1xyXG4gICAgbGV0IG9iaiA9IHt9O1xyXG4gICAgbGV0IHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGFLZXlzKG9iaiwgXCJuYW1lXCIpO1xyXG4gICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIFtdKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RHZXRNZXRhZGF0YUtleXNXaXRoVGFyZ2V0S2V5V2hlbkRlZmluZWQoKSB7XHJcbiAgICBsZXQgb2JqID0ge307XHJcbiAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwia2V5XCIsIFwidmFsdWVcIiwgb2JqLCBcIm5hbWVcIik7XHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YUtleXMob2JqLCBcIm5hbWVcIik7XHJcbiAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdCwgW1wia2V5XCJdKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RHZXRNZXRhZGF0YUtleXNXaXRoVGFyZ2V0S2V5V2hlbkRlZmluZWRPblByb3RvdHlwZSgpIHtcclxuICAgIGxldCBwcm90b3R5cGUgPSB7fTtcclxuICAgIGxldCBvYmogPSBPYmplY3QuY3JlYXRlKHByb3RvdHlwZSk7XHJcbiAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwia2V5XCIsIFwidmFsdWVcIiwgcHJvdG90eXBlLCBcIm5hbWVcIik7XHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YUtleXMob2JqLCBcIm5hbWVcIik7XHJcbiAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdCwgW1wia2V5XCJdKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RHZXRNZXRhZGF0YUtleXNPcmRlckFmdGVyUmVkZWZpbmVXaXRoVGFyZ2V0S2V5KCkge1xyXG4gICAgbGV0IG9iaiA9IHt9O1xyXG4gICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleTFcIiwgXCJ2YWx1ZVwiLCBvYmosIFwibmFtZVwiKTtcclxuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXkwXCIsIFwidmFsdWVcIiwgb2JqLCBcIm5hbWVcIik7XHJcbiAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwia2V5MVwiLCBcInZhbHVlXCIsIG9iaiwgXCJuYW1lXCIpO1xyXG4gICAgbGV0IHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGFLZXlzKG9iaiwgXCJuYW1lXCIpO1xyXG4gICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIFtcImtleTFcIiwgXCJrZXkwXCJdKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RHZXRNZXRhZGF0YUtleXNPcmRlcldpdGhUYXJnZXRLZXlXaGVuRGVmaW5lZE9uUHJvdG90eXBlKCkge1xyXG4gICAgbGV0IHByb3RvdHlwZSA9IHt9O1xyXG4gICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleTJcIiwgXCJ2YWx1ZVwiLCBwcm90b3R5cGUsIFwibmFtZVwiKTtcclxuICAgIGxldCBvYmogPSBPYmplY3QuY3JlYXRlKHByb3RvdHlwZSk7XHJcbiAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwia2V5MVwiLCBcInZhbHVlXCIsIG9iaiwgXCJuYW1lXCIpO1xyXG4gICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleTBcIiwgXCJ2YWx1ZVwiLCBvYmosIFwibmFtZVwiKTtcclxuICAgIGxldCByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhS2V5cyhvYmosIFwibmFtZVwiKTtcclxuICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LCBbXCJrZXkxXCIsIFwia2V5MFwiLCBcImtleTJcIl0pO1xyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
