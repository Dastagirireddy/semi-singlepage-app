// Reflect.metadata ( metadataKey, metadataValue )
// - https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#reflectmetadata--metadatakey-metadatavalue-
System.register(["../../Reflect", "assert"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var assert;
    function ReflectMetadataReturnsDecoratorFunction() {
        var result = Reflect.metadata("key", "value");
        assert.equal(typeof result, "function");
    }
    exports_1("ReflectMetadataReturnsDecoratorFunction", ReflectMetadataReturnsDecoratorFunction);
    function ReflectMetadataDecoratorThrowsWithInvalidTargetWithTargetKey() {
        var decorator = Reflect.metadata("key", "value");
        assert.throws(function () { return decorator(undefined, "name"); }, TypeError);
    }
    exports_1("ReflectMetadataDecoratorThrowsWithInvalidTargetWithTargetKey", ReflectMetadataDecoratorThrowsWithInvalidTargetWithTargetKey);
    function ReflectMetadataDecoratorThrowsWithInvalidTargetWithoutTargetKey() {
        var decorator = Reflect.metadata("key", "value");
        assert.throws(function () { return decorator({}, undefined); }, TypeError);
    }
    exports_1("ReflectMetadataDecoratorThrowsWithInvalidTargetWithoutTargetKey", ReflectMetadataDecoratorThrowsWithInvalidTargetWithoutTargetKey);
    function ReflectMetadataDecoratorSetsMetadataOnTargetWithoutTargetKey() {
        var decorator = Reflect.metadata("key", "value");
        var target = function () { };
        decorator(target);
        var result = Reflect.hasOwnMetadata("key", target, undefined);
        assert.equal(result, true);
    }
    exports_1("ReflectMetadataDecoratorSetsMetadataOnTargetWithoutTargetKey", ReflectMetadataDecoratorSetsMetadataOnTargetWithoutTargetKey);
    function ReflectMetadataDecoratorSetsMetadataOnTargetWithTargetKey() {
        var decorator = Reflect.metadata("key", "value");
        var target = {};
        decorator(target, "name");
        var result = Reflect.hasOwnMetadata("key", target, "name");
        assert.equal(result, true);
    }
    exports_1("ReflectMetadataDecoratorSetsMetadataOnTargetWithTargetKey", ReflectMetadataDecoratorSetsMetadataOnTargetWithTargetKey);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3JlZmxlY3QtbWV0YWRhdGEvdGVzdC9yZWZsZWN0L3JlZmxlY3QtbWV0YWRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsa0RBQWtEO0FBQ2xELDRIQUE0SDs7Ozs7SUFLNUg7UUFDSSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM5QyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFIRCw2RkFHQyxDQUFBO0lBRUQ7UUFDSSxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNqRCxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQU0sT0FBQSxTQUFTLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxFQUE1QixDQUE0QixFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFIRCx1SUFHQyxDQUFBO0lBRUQ7UUFDSSxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNqRCxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQU0sT0FBQSxTQUFTLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxFQUF4QixDQUF3QixFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFIRCw2SUFHQyxDQUFBO0lBRUQ7UUFDSSxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNqRCxJQUFJLE1BQU0sR0FBRyxjQUFhLENBQUMsQ0FBQTtRQUMzQixTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFbEIsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzlELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFQRCx1SUFPQyxDQUFBO0lBRUQ7UUFDSSxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNqRCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7UUFDZixTQUFTLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTFCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMzRCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBUEQsaUlBT0MsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9yZWZsZWN0LW1ldGFkYXRhL3Rlc3QvcmVmbGVjdC9yZWZsZWN0LW1ldGFkYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gUmVmbGVjdC5tZXRhZGF0YSAoIG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlIClcclxuLy8gLSBodHRwczovL2dpdGh1Yi5jb20vam9uYXRoYW5kdHVybmVyL2RlY29yYXRvcnMvYmxvYi9tYXN0ZXIvc3BlY3MvbWV0YWRhdGEubWQjcmVmbGVjdG1ldGFkYXRhLS1tZXRhZGF0YWtleS1tZXRhZGF0YXZhbHVlLVxyXG5cclxuaW1wb3J0IFwiLi4vLi4vUmVmbGVjdFwiO1xyXG5pbXBvcnQgKiBhcyBhc3NlcnQgZnJvbSBcImFzc2VydFwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RNZXRhZGF0YVJldHVybnNEZWNvcmF0b3JGdW5jdGlvbigpIHtcclxuICAgIGxldCByZXN1bHQgPSBSZWZsZWN0Lm1ldGFkYXRhKFwia2V5XCIsIFwidmFsdWVcIik7XHJcbiAgICBhc3NlcnQuZXF1YWwodHlwZW9mIHJlc3VsdCwgXCJmdW5jdGlvblwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RNZXRhZGF0YURlY29yYXRvclRocm93c1dpdGhJbnZhbGlkVGFyZ2V0V2l0aFRhcmdldEtleSgpIHtcclxuICAgIGxldCBkZWNvcmF0b3IgPSBSZWZsZWN0Lm1ldGFkYXRhKFwia2V5XCIsIFwidmFsdWVcIik7XHJcbiAgICBhc3NlcnQudGhyb3dzKCgpID0+IGRlY29yYXRvcih1bmRlZmluZWQsIFwibmFtZVwiKSwgVHlwZUVycm9yKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RNZXRhZGF0YURlY29yYXRvclRocm93c1dpdGhJbnZhbGlkVGFyZ2V0V2l0aG91dFRhcmdldEtleSgpIHtcclxuICAgIGxldCBkZWNvcmF0b3IgPSBSZWZsZWN0Lm1ldGFkYXRhKFwia2V5XCIsIFwidmFsdWVcIik7XHJcbiAgICBhc3NlcnQudGhyb3dzKCgpID0+IGRlY29yYXRvcih7fSwgdW5kZWZpbmVkKSwgVHlwZUVycm9yKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RNZXRhZGF0YURlY29yYXRvclNldHNNZXRhZGF0YU9uVGFyZ2V0V2l0aG91dFRhcmdldEtleSgpIHtcclxuICAgIGxldCBkZWNvcmF0b3IgPSBSZWZsZWN0Lm1ldGFkYXRhKFwia2V5XCIsIFwidmFsdWVcIik7XHJcbiAgICBsZXQgdGFyZ2V0ID0gZnVuY3Rpb24gKCkge31cclxuICAgIGRlY29yYXRvcih0YXJnZXQpO1xyXG5cclxuICAgIGxldCByZXN1bHQgPSBSZWZsZWN0Lmhhc093bk1ldGFkYXRhKFwia2V5XCIsIHRhcmdldCwgdW5kZWZpbmVkKTtcclxuICAgIGFzc2VydC5lcXVhbChyZXN1bHQsIHRydWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdE1ldGFkYXRhRGVjb3JhdG9yU2V0c01ldGFkYXRhT25UYXJnZXRXaXRoVGFyZ2V0S2V5KCkge1xyXG4gICAgbGV0IGRlY29yYXRvciA9IFJlZmxlY3QubWV0YWRhdGEoXCJrZXlcIiwgXCJ2YWx1ZVwiKTtcclxuICAgIGxldCB0YXJnZXQgPSB7fVxyXG4gICAgZGVjb3JhdG9yKHRhcmdldCwgXCJuYW1lXCIpO1xyXG5cclxuICAgIGxldCByZXN1bHQgPSBSZWZsZWN0Lmhhc093bk1ldGFkYXRhKFwia2V5XCIsIHRhcmdldCwgXCJuYW1lXCIpO1xyXG4gICAgYXNzZXJ0LmVxdWFsKHJlc3VsdCwgdHJ1ZSk7XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
