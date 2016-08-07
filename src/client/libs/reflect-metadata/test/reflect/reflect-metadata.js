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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvcmVmbGVjdC1tZXRhZGF0YS90ZXN0L3JlZmxlY3QvcmVmbGVjdC1tZXRhZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxrREFBa0Q7QUFDbEQsNEhBQTRIOzs7OztJQUs1SDtRQUNJLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzlDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUhELDZGQUdDLENBQUE7SUFFRDtRQUNJLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBTSxPQUFBLFNBQVMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLEVBQTVCLENBQTRCLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUhELHVJQUdDLENBQUE7SUFFRDtRQUNJLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBTSxPQUFBLFNBQVMsQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLEVBQXhCLENBQXdCLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUhELDZJQUdDLENBQUE7SUFFRDtRQUNJLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELElBQUksTUFBTSxHQUFHLGNBQWEsQ0FBQyxDQUFBO1FBQzNCLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVsQixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDOUQsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQVBELHVJQU9DLENBQUE7SUFFRDtRQUNJLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtRQUNmLFNBQVMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFMUIsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzNELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFQRCxpSUFPQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvcmVmbGVjdC1tZXRhZGF0YS90ZXN0L3JlZmxlY3QvcmVmbGVjdC1tZXRhZGF0YS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFJlZmxlY3QubWV0YWRhdGEgKCBtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSApXHJcbi8vIC0gaHR0cHM6Ly9naXRodWIuY29tL2pvbmF0aGFuZHR1cm5lci9kZWNvcmF0b3JzL2Jsb2IvbWFzdGVyL3NwZWNzL21ldGFkYXRhLm1kI3JlZmxlY3RtZXRhZGF0YS0tbWV0YWRhdGFrZXktbWV0YWRhdGF2YWx1ZS1cclxuXHJcbmltcG9ydCBcIi4uLy4uL1JlZmxlY3RcIjtcclxuaW1wb3J0ICogYXMgYXNzZXJ0IGZyb20gXCJhc3NlcnRcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0TWV0YWRhdGFSZXR1cm5zRGVjb3JhdG9yRnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5tZXRhZGF0YShcImtleVwiLCBcInZhbHVlXCIpO1xyXG4gICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiByZXN1bHQsIFwiZnVuY3Rpb25cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0TWV0YWRhdGFEZWNvcmF0b3JUaHJvd3NXaXRoSW52YWxpZFRhcmdldFdpdGhUYXJnZXRLZXkoKSB7XHJcbiAgICBsZXQgZGVjb3JhdG9yID0gUmVmbGVjdC5tZXRhZGF0YShcImtleVwiLCBcInZhbHVlXCIpO1xyXG4gICAgYXNzZXJ0LnRocm93cygoKSA9PiBkZWNvcmF0b3IodW5kZWZpbmVkLCBcIm5hbWVcIiksIFR5cGVFcnJvcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0TWV0YWRhdGFEZWNvcmF0b3JUaHJvd3NXaXRoSW52YWxpZFRhcmdldFdpdGhvdXRUYXJnZXRLZXkoKSB7XHJcbiAgICBsZXQgZGVjb3JhdG9yID0gUmVmbGVjdC5tZXRhZGF0YShcImtleVwiLCBcInZhbHVlXCIpO1xyXG4gICAgYXNzZXJ0LnRocm93cygoKSA9PiBkZWNvcmF0b3Ioe30sIHVuZGVmaW5lZCksIFR5cGVFcnJvcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0TWV0YWRhdGFEZWNvcmF0b3JTZXRzTWV0YWRhdGFPblRhcmdldFdpdGhvdXRUYXJnZXRLZXkoKSB7XHJcbiAgICBsZXQgZGVjb3JhdG9yID0gUmVmbGVjdC5tZXRhZGF0YShcImtleVwiLCBcInZhbHVlXCIpO1xyXG4gICAgbGV0IHRhcmdldCA9IGZ1bmN0aW9uICgpIHt9XHJcbiAgICBkZWNvcmF0b3IodGFyZ2V0KTtcclxuXHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5oYXNPd25NZXRhZGF0YShcImtleVwiLCB0YXJnZXQsIHVuZGVmaW5lZCk7XHJcbiAgICBhc3NlcnQuZXF1YWwocmVzdWx0LCB0cnVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3RNZXRhZGF0YURlY29yYXRvclNldHNNZXRhZGF0YU9uVGFyZ2V0V2l0aFRhcmdldEtleSgpIHtcclxuICAgIGxldCBkZWNvcmF0b3IgPSBSZWZsZWN0Lm1ldGFkYXRhKFwia2V5XCIsIFwidmFsdWVcIik7XHJcbiAgICBsZXQgdGFyZ2V0ID0ge31cclxuICAgIGRlY29yYXRvcih0YXJnZXQsIFwibmFtZVwiKTtcclxuXHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5oYXNPd25NZXRhZGF0YShcImtleVwiLCB0YXJnZXQsIFwibmFtZVwiKTtcclxuICAgIGFzc2VydC5lcXVhbChyZXN1bHQsIHRydWUpO1xyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
