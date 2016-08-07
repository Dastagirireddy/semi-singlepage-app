// Reflect.decorate ( decorators, target [, propertyKey [, descriptor] ] )
System.register(["../../Reflect", "assert"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var assert;
    function ReflectDecorateThrowsIfDecoratorsArgumentNotArrayForFunctionOverload() {
        var target = function () { };
        assert.throws(function () { return Reflect.decorate(undefined, target, undefined, undefined); }, TypeError);
    }
    exports_1("ReflectDecorateThrowsIfDecoratorsArgumentNotArrayForFunctionOverload", ReflectDecorateThrowsIfDecoratorsArgumentNotArrayForFunctionOverload);
    function ReflectDecorateThrowsIfTargetArgumentNotFunctionForFunctionOverload() {
        var decorators = [];
        var target = {};
        assert.throws(function () { return Reflect.decorate(decorators, target, undefined, undefined); }, TypeError);
    }
    exports_1("ReflectDecorateThrowsIfTargetArgumentNotFunctionForFunctionOverload", ReflectDecorateThrowsIfTargetArgumentNotFunctionForFunctionOverload);
    function ReflectDecorateThrowsIfDecoratorsArgumentNotArrayForPropertyOverload() {
        var target = {};
        var name = "name";
        assert.throws(function () { return Reflect.decorate(undefined, target, name, undefined); }, TypeError);
    }
    exports_1("ReflectDecorateThrowsIfDecoratorsArgumentNotArrayForPropertyOverload", ReflectDecorateThrowsIfDecoratorsArgumentNotArrayForPropertyOverload);
    function ReflectDecorateThrowsIfTargetArgumentNotObjectForPropertyOverload() {
        var decorators = [];
        var target = 1;
        var name = "name";
        assert.throws(function () { return Reflect.decorate(decorators, target, name, undefined); }, TypeError);
    }
    exports_1("ReflectDecorateThrowsIfTargetArgumentNotObjectForPropertyOverload", ReflectDecorateThrowsIfTargetArgumentNotObjectForPropertyOverload);
    function ReflectDecorateThrowsIfDecoratorsArgumentNotArrayForPropertyDescriptorOverload() {
        var target = {};
        var name = "name";
        var descriptor = {};
        assert.throws(function () { return Reflect.decorate(undefined, target, name, descriptor); }, TypeError);
    }
    exports_1("ReflectDecorateThrowsIfDecoratorsArgumentNotArrayForPropertyDescriptorOverload", ReflectDecorateThrowsIfDecoratorsArgumentNotArrayForPropertyDescriptorOverload);
    function ReflectDecorateThrowsIfTargetArgumentNotObjectForPropertyDescriptorOverload() {
        var decorators = [];
        var target = 1;
        var name = "name";
        var descriptor = {};
        assert.throws(function () { return Reflect.decorate(decorators, target, name, descriptor); }, TypeError);
    }
    exports_1("ReflectDecorateThrowsIfTargetArgumentNotObjectForPropertyDescriptorOverload", ReflectDecorateThrowsIfTargetArgumentNotObjectForPropertyDescriptorOverload);
    function ReflectDecorateExecutesDecoratorsInReverseOrderForFunctionOverload() {
        var order = [];
        var decorators = [
            function (target) { order.push(0); },
            function (target) { order.push(1); }
        ];
        var target = function () { };
        Reflect.decorate(decorators, target);
        assert.deepEqual(order, [1, 0]);
    }
    exports_1("ReflectDecorateExecutesDecoratorsInReverseOrderForFunctionOverload", ReflectDecorateExecutesDecoratorsInReverseOrderForFunctionOverload);
    function ReflectDecorateExecutesDecoratorsInReverseOrderForPropertyOverload() {
        var order = [];
        var decorators = [
            function (target, name) { order.push(0); },
            function (target, name) { order.push(1); }
        ];
        var target = {};
        var name = "name";
        Reflect.decorate(decorators, target, name, undefined);
        assert.deepEqual(order, [1, 0]);
    }
    exports_1("ReflectDecorateExecutesDecoratorsInReverseOrderForPropertyOverload", ReflectDecorateExecutesDecoratorsInReverseOrderForPropertyOverload);
    function ReflectDecorateExecutesDecoratorsInReverseOrderForPropertyDescriptorOverload() {
        var order = [];
        var decorators = [
            function (target, name) { order.push(0); },
            function (target, name) { order.push(1); }
        ];
        var target = {};
        var name = "name";
        var descriptor = {};
        Reflect.decorate(decorators, target, name, descriptor);
        assert.deepEqual(order, [1, 0]);
    }
    exports_1("ReflectDecorateExecutesDecoratorsInReverseOrderForPropertyDescriptorOverload", ReflectDecorateExecutesDecoratorsInReverseOrderForPropertyDescriptorOverload);
    function ReflectDecoratorPipelineForFunctionOverload() {
        var A = function A() { };
        var B = function B() { };
        var decorators = [
            function (target) { return undefined; },
            function (target) { return A; },
            function (target) { return B; }
        ];
        var target = function () { };
        var result = Reflect.decorate(decorators, target);
        assert.strictEqual(result, A);
    }
    exports_1("ReflectDecoratorPipelineForFunctionOverload", ReflectDecoratorPipelineForFunctionOverload);
    function ReflectDecoratorPipelineForPropertyOverload() {
        var A = {};
        var B = {};
        var decorators = [
            function (target, name) { return undefined; },
            function (target, name) { return A; },
            function (target, name) { return B; }
        ];
        var target = {};
        var result = Reflect.decorate(decorators, target, "name", undefined);
        assert.strictEqual(result, undefined);
    }
    exports_1("ReflectDecoratorPipelineForPropertyOverload", ReflectDecoratorPipelineForPropertyOverload);
    function ReflectDecoratorPipelineForPropertyDescriptorOverload() {
        var A = {};
        var B = {};
        var C = {};
        var decorators = [
            function (target, name) { return undefined; },
            function (target, name) { return A; },
            function (target, name) { return B; }
        ];
        var target = {};
        var result = Reflect.decorate(decorators, target, "name", C);
        assert.strictEqual(result, A);
    }
    exports_1("ReflectDecoratorPipelineForPropertyDescriptorOverload", ReflectDecoratorPipelineForPropertyDescriptorOverload);
    function ReflectDecoratorCorrectTargetInPipelineForFunctionOverload() {
        var sent = [];
        var A = function A() { };
        var B = function B() { };
        var decorators = [
            function (target) { sent.push(target); return undefined; },
            function (target) { sent.push(target); return undefined; },
            function (target) { sent.push(target); return A; },
            function (target) { sent.push(target); return B; }
        ];
        var target = function () { };
        Reflect.decorate(decorators, target);
        assert.deepEqual(sent, [target, B, A, A]);
    }
    exports_1("ReflectDecoratorCorrectTargetInPipelineForFunctionOverload", ReflectDecoratorCorrectTargetInPipelineForFunctionOverload);
    function ReflectDecoratorCorrectTargetInPipelineForPropertyOverload() {
        var sent = [];
        var decorators = [
            function (target, name) { sent.push(target); },
            function (target, name) { sent.push(target); },
            function (target, name) { sent.push(target); },
            function (target, name) { sent.push(target); }
        ];
        var target = {};
        Reflect.decorate(decorators, target, "name");
        assert.deepEqual(sent, [target, target, target, target]);
    }
    exports_1("ReflectDecoratorCorrectTargetInPipelineForPropertyOverload", ReflectDecoratorCorrectTargetInPipelineForPropertyOverload);
    function ReflectDecoratorCorrectNameInPipelineForPropertyOverload() {
        var sent = [];
        var decorators = [
            function (target, name) { sent.push(name); },
            function (target, name) { sent.push(name); },
            function (target, name) { sent.push(name); },
            function (target, name) { sent.push(name); }
        ];
        var target = {};
        Reflect.decorate(decorators, target, "name");
        assert.deepEqual(sent, ["name", "name", "name", "name"]);
    }
    exports_1("ReflectDecoratorCorrectNameInPipelineForPropertyOverload", ReflectDecoratorCorrectNameInPipelineForPropertyOverload);
    function ReflectDecoratorCorrectTargetInPipelineForPropertyDescriptorOverload() {
        var sent = [];
        var A = {};
        var B = {};
        var C = {};
        var decorators = [
            function (target, name) { sent.push(target); return undefined; },
            function (target, name) { sent.push(target); return undefined; },
            function (target, name) { sent.push(target); return A; },
            function (target, name) { sent.push(target); return B; }
        ];
        var target = {};
        Reflect.decorate(decorators, target, "name", C);
        assert.deepEqual(sent, [target, target, target, target]);
    }
    exports_1("ReflectDecoratorCorrectTargetInPipelineForPropertyDescriptorOverload", ReflectDecoratorCorrectTargetInPipelineForPropertyDescriptorOverload);
    function ReflectDecoratorCorrectNameInPipelineForPropertyDescriptorOverload() {
        var sent = [];
        var A = {};
        var B = {};
        var C = {};
        var decorators = [
            function (target, name) { sent.push(name); return undefined; },
            function (target, name) { sent.push(name); return undefined; },
            function (target, name) { sent.push(name); return A; },
            function (target, name) { sent.push(name); return B; }
        ];
        var target = {};
        Reflect.decorate(decorators, target, "name", C);
        assert.deepEqual(sent, ["name", "name", "name", "name"]);
    }
    exports_1("ReflectDecoratorCorrectNameInPipelineForPropertyDescriptorOverload", ReflectDecoratorCorrectNameInPipelineForPropertyDescriptorOverload);
    function ReflectDecoratorCorrectDescriptorInPipelineForPropertyDescriptorOverload() {
        var sent = [];
        var A = {};
        var B = {};
        var C = {};
        var decorators = [
            function (target, name, descriptor) { sent.push(descriptor); return undefined; },
            function (target, name, descriptor) { sent.push(descriptor); return undefined; },
            function (target, name, descriptor) { sent.push(descriptor); return A; },
            function (target, name, descriptor) { sent.push(descriptor); return B; }
        ];
        var target = {};
        Reflect.decorate(decorators, target, "name", C);
        assert.deepEqual(sent, [C, B, A, A]);
    }
    exports_1("ReflectDecoratorCorrectDescriptorInPipelineForPropertyDescriptorOverload", ReflectDecoratorCorrectDescriptorInPipelineForPropertyDescriptorOverload);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvcmVmbGVjdC1tZXRhZGF0YS90ZXN0L3JlZmxlY3QvcmVmbGVjdC1kZWNvcmF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwRUFBMEU7Ozs7O0lBSzFFO1FBQ0ksSUFBSSxNQUFNLEdBQUcsY0FBYSxDQUFDLENBQUM7UUFDNUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsRUFBekQsQ0FBeUQsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBSEQsdUpBR0MsQ0FBQTtJQUVEO1FBQ0ksSUFBSSxVQUFVLEdBQTZELEVBQUUsQ0FBQztRQUM5RSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsRUFBMUQsQ0FBMEQsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUMvRixDQUFDO0lBSkQscUpBSUMsQ0FBQTtJQUVEO1FBQ0ksSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUNsQixNQUFNLENBQUMsTUFBTSxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxFQUFwRCxDQUFvRCxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7SUFKRCx1SkFJQyxDQUFBO0lBRUQ7UUFDSSxJQUFJLFVBQVUsR0FBNkQsRUFBRSxDQUFDO1FBQzlFLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUNsQixNQUFNLENBQUMsTUFBTSxDQUFDLGNB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LFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDNUgsVUFBQyxNQUFjLEVBQUUsSUFBcUIsRUFBRSxVQUE4QixJQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwSCxVQUFDLE1BQWMsRUFBRSxJQUFxQixFQUFFLFVBQThCLElBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3ZILENBQUM7UUFDRixJQUFJLE1BQU0sR0FBRyxFQUFHLENBQUM7UUFDakIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRCxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQWRELCtKQWNDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9yZWZsZWN0LW1ldGFkYXRhL3Rlc3QvcmVmbGVjdC9yZWZsZWN0LWRlY29yYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gUmVmbGVjdC5kZWNvcmF0ZSAoIGRlY29yYXRvcnMsIHRhcmdldCBbLCBwcm9wZXJ0eUtleSBbLCBkZXNjcmlwdG9yXSBdIClcclxuXHJcbmltcG9ydCBcIi4uLy4uL1JlZmxlY3RcIjtcclxuaW1wb3J0ICogYXMgYXNzZXJ0IGZyb20gXCJhc3NlcnRcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0RGVjb3JhdGVUaHJvd3NJZkRlY29yYXRvcnNBcmd1bWVudE5vdEFycmF5Rm9yRnVuY3Rpb25PdmVybG9hZCgpIHtcclxuICAgIGxldCB0YXJnZXQgPSBmdW5jdGlvbigpIHsgfTtcclxuICAgIGFzc2VydC50aHJvd3MoKCkgPT4gUmVmbGVjdC5kZWNvcmF0ZSh1bmRlZmluZWQsIHRhcmdldCwgdW5kZWZpbmVkLCB1bmRlZmluZWQpLCBUeXBlRXJyb3IpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdERlY29yYXRlVGhyb3dzSWZUYXJnZXRBcmd1bWVudE5vdEZ1bmN0aW9uRm9yRnVuY3Rpb25PdmVybG9hZCgpIHtcclxuICAgIGxldCBkZWNvcmF0b3JzOiAoQ2xhc3NEZWNvcmF0b3IgfCBNZXRob2REZWNvcmF0b3IgfCBQcm9wZXJ0eURlY29yYXRvcilbXSA9IFtdO1xyXG4gICAgbGV0IHRhcmdldCA9IHt9O1xyXG4gICAgYXNzZXJ0LnRocm93cygoKSA9PiBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwgdW5kZWZpbmVkLCB1bmRlZmluZWQpLCBUeXBlRXJyb3IpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdERlY29yYXRlVGhyb3dzSWZEZWNvcmF0b3JzQXJndW1lbnROb3RBcnJheUZvclByb3BlcnR5T3ZlcmxvYWQoKSB7XHJcbiAgICBsZXQgdGFyZ2V0ID0ge307XHJcbiAgICBsZXQgbmFtZSA9IFwibmFtZVwiO1xyXG4gICAgYXNzZXJ0LnRocm93cygoKSA9PiBSZWZsZWN0LmRlY29yYXRlKHVuZGVmaW5lZCwgdGFyZ2V0LCBuYW1lLCB1bmRlZmluZWQpLCBUeXBlRXJyb3IpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdERlY29yYXRlVGhyb3dzSWZUYXJnZXRBcmd1bWVudE5vdE9iamVjdEZvclByb3BlcnR5T3ZlcmxvYWQoKSB7XHJcbiAgICBsZXQgZGVjb3JhdG9yczogKENsYXNzRGVjb3JhdG9yIHwgTWV0aG9kRGVjb3JhdG9yIHwgUHJvcGVydHlEZWNvcmF0b3IpW10gPSBbXTtcclxuICAgIGxldCB0YXJnZXQgPSAxO1xyXG4gICAgbGV0IG5hbWUgPSBcIm5hbWVcIjtcclxuICAgIGFzc2VydC50aHJvd3MoKCkgPT4gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIG5hbWUsIHVuZGVmaW5lZCksIFR5cGVFcnJvcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0RGVjb3JhdGVUaHJvd3NJZkRlY29yYXRvcnNBcmd1bWVudE5vdEFycmF5Rm9yUHJvcGVydHlEZXNjcmlwdG9yT3ZlcmxvYWQoKSB7XHJcbiAgICBsZXQgdGFyZ2V0ID0ge307XHJcbiAgICBsZXQgbmFtZSA9IFwibmFtZVwiO1xyXG4gICAgbGV0IGRlc2NyaXB0b3IgPSB7fTtcclxuICAgIGFzc2VydC50aHJvd3MoKCkgPT4gUmVmbGVjdC5kZWNvcmF0ZSh1bmRlZmluZWQsIHRhcmdldCwgbmFtZSwgZGVzY3JpcHRvciksIFR5cGVFcnJvcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0RGVjb3JhdGVUaHJvd3NJZlRhcmdldEFyZ3VtZW50Tm90T2JqZWN0Rm9yUHJvcGVydHlEZXNjcmlwdG9yT3ZlcmxvYWQoKSB7XHJcbiAgICBsZXQgZGVjb3JhdG9yczogKENsYXNzRGVjb3JhdG9yIHwgTWV0aG9kRGVjb3JhdG9yIHwgUHJvcGVydHlEZWNvcmF0b3IpW10gPSBbXTtcclxuICAgIGxldCB0YXJnZXQgPSAxO1xyXG4gICAgbGV0IG5hbWUgPSBcIm5hbWVcIjtcclxuICAgIGxldCBkZXNjcmlwdG9yID0ge307XHJcbiAgICBhc3NlcnQudGhyb3dzKCgpID0+IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBuYW1lLCBkZXNjcmlwdG9yKSwgVHlwZUVycm9yKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3REZWNvcmF0ZUV4ZWN1dGVzRGVjb3JhdG9yc0luUmV2ZXJzZU9yZGVyRm9yRnVuY3Rpb25PdmVybG9hZCgpIHtcclxuICAgIGxldCBvcmRlcjogbnVtYmVyW10gPSBbXTtcclxuICAgIGxldCBkZWNvcmF0b3JzID0gW1xyXG4gICAgICAgICh0YXJnZXQ6IEZ1bmN0aW9uKTogdm9pZCA9PiB7IG9yZGVyLnB1c2goMCk7IH0sXHJcbiAgICAgICAgKHRhcmdldDogRnVuY3Rpb24pOiB2b2lkID0+IHsgb3JkZXIucHVzaCgxKTsgfVxyXG4gICAgXTtcclxuICAgIGxldCB0YXJnZXQgPSBmdW5jdGlvbigpIHsgfTtcclxuICAgIFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0KTtcclxuICAgIGFzc2VydC5kZWVwRXF1YWwob3JkZXIsIFsxLCAwXSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0RGVjb3JhdGVFeGVjdXRlc0RlY29yYXRvcnNJblJldmVyc2VPcmRlckZvclByb3BlcnR5T3ZlcmxvYWQoKSB7XHJcbiAgICBsZXQgb3JkZXI6IG51bWJlcltdID0gW107XHJcbiAgICBsZXQgZGVjb3JhdG9ycyA9IFtcclxuICAgICAgICAodGFyZ2V0OiBPYmplY3QsIG5hbWU6IHN0cmluZyB8IHN5bWJvbCk6IHZvaWQgPT4geyBvcmRlci5wdXNoKDApOyB9LFxyXG4gICAgICAgICh0YXJnZXQ6IE9iamVjdCwgbmFtZTogc3RyaW5nIHwgc3ltYm9sKTogdm9pZCA9PiB7IG9yZGVyLnB1c2goMSk7IH1cclxuICAgIF07XHJcbiAgICBsZXQgdGFyZ2V0ID0ge307XHJcbiAgICBsZXQgbmFtZSA9IFwibmFtZVwiO1xyXG4gICAgUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIG5hbWUsIHVuZGVmaW5lZCk7XHJcbiAgICBhc3NlcnQuZGVlcEVxdWFsKG9yZGVyLCBbMSwgMF0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdERlY29yYXRlRXhlY3V0ZXNEZWNvcmF0b3JzSW5SZXZlcnNlT3JkZXJGb3JQcm9wZXJ0eURlc2NyaXB0b3JPdmVybG9hZCgpIHtcclxuICAgIGxldCBvcmRlcjogbnVtYmVyW10gPSBbXTtcclxuICAgIGxldCBkZWNvcmF0b3JzID0gW1xyXG4gICAgICAgICh0YXJnZXQ6IE9iamVjdCwgbmFtZTogc3RyaW5nIHwgc3ltYm9sKTogdm9pZCA9PiB7IG9yZGVyLnB1c2goMCk7IH0sXHJcbiAgICAgICAgKHRhcmdldDogT2JqZWN0LCBuYW1lOiBzdHJpbmcgfCBzeW1ib2wpOiB2b2lkID0+IHsgb3JkZXIucHVzaCgxKTsgfVxyXG4gICAgXTtcclxuICAgIGxldCB0YXJnZXQgPSB7fTtcclxuICAgIGxldCBuYW1lID0gXCJuYW1lXCI7XHJcbiAgICBsZXQgZGVzY3JpcHRvciA9IHt9O1xyXG4gICAgUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIG5hbWUsIGRlc2NyaXB0b3IpO1xyXG4gICAgYXNzZXJ0LmRlZXBFcXVhbChvcmRlciwgWzEsIDBdKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3REZWNvcmF0b3JQaXBlbGluZUZvckZ1bmN0aW9uT3ZlcmxvYWQoKSB7XHJcbiAgICBsZXQgQSA9IGZ1bmN0aW9uIEEoKTogdm9pZCB7IH07XHJcbiAgICBsZXQgQiA9IGZ1bmN0aW9uIEIoKTogdm9pZCB7IH07XHJcbiAgICBsZXQgZGVjb3JhdG9ycyA9IFtcclxuICAgICAgICAodGFyZ2V0OiBGdW5jdGlvbik6IGFueSA9PiB7IHJldHVybiB1bmRlZmluZWQ7IH0sXHJcbiAgICAgICAgKHRhcmdldDogRnVuY3Rpb24pOiBhbnkgPT4geyByZXR1cm4gQTsgfSxcclxuICAgICAgICAodGFyZ2V0OiBGdW5jdGlvbik6IGFueSA9PiB7IHJldHVybiBCOyB9XHJcbiAgICBdO1xyXG4gICAgbGV0IHRhcmdldCA9IGZ1bmN0aW9uICgpOiB2b2lkIHsgfTtcclxuICAgIGxldCByZXN1bHQgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCk7XHJcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwocmVzdWx0LCBBKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3REZWNvcmF0b3JQaXBlbGluZUZvclByb3BlcnR5T3ZlcmxvYWQoKSB7XHJcbiAgICBsZXQgQSA9IHt9O1xyXG4gICAgbGV0IEIgPSB7fTtcclxuICAgIGxldCBkZWNvcmF0b3JzID0gW1xyXG4gICAgICAgICh0YXJnZXQ6IE9iamVjdCwgbmFtZTogc3RyaW5nIHwgc3ltYm9sKTogYW55ID0+IHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcclxuICAgICAgICAodGFyZ2V0OiBPYmplY3QsIG5hbWU6IHN0cmluZyB8IHN5bWJvbCk6IGFueSA9PiB7IHJldHVybiBBOyB9LFxyXG4gICAgICAgICh0YXJnZXQ6IE9iamVjdCwgbmFtZTogc3RyaW5nIHwgc3ltYm9sKTogYW55ID0+IHsgcmV0dXJuIEI7IH1cclxuICAgIF07XHJcbiAgICBsZXQgdGFyZ2V0ID0ge307XHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIFwibmFtZVwiLCB1bmRlZmluZWQpO1xyXG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlc3VsdCwgdW5kZWZpbmVkKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3REZWNvcmF0b3JQaXBlbGluZUZvclByb3BlcnR5RGVzY3JpcHRvck92ZXJsb2FkKCkge1xyXG4gICAgbGV0IEEgPSB7fTtcclxuICAgIGxldCBCID0ge307XHJcbiAgICBsZXQgQyA9IHt9O1xyXG4gICAgbGV0IGRlY29yYXRvcnMgPSBbXHJcbiAgICAgICAgKHRhcmdldDogT2JqZWN0LCBuYW1lOiBzdHJpbmcgfCBzeW1ib2wpOiBhbnkgPT4geyByZXR1cm4gdW5kZWZpbmVkOyB9LFxyXG4gICAgICAgICh0YXJnZXQ6IE9iamVjdCwgbmFtZTogc3RyaW5nIHwgc3ltYm9sKTogYW55ID0+IHsgcmV0dXJuIEE7IH0sXHJcbiAgICAgICAgKHRhcmdldDogT2JqZWN0LCBuYW1lOiBzdHJpbmcgfCBzeW1ib2wpOiBhbnkgPT4geyByZXR1cm4gQjsgfVxyXG4gICAgXTtcclxuICAgIGxldCB0YXJnZXQgPSB7fTtcclxuICAgIGxldCByZXN1bHQgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwgXCJuYW1lXCIsIEMpO1xyXG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlc3VsdCwgQSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0RGVjb3JhdG9yQ29ycmVjdFRhcmdldEluUGlwZWxpbmVGb3JGdW5jdGlvbk92ZXJsb2FkKCkge1xyXG4gICAgbGV0IHNlbnQ6IEZ1bmN0aW9uW10gPSBbXTtcclxuICAgIGxldCBBID0gZnVuY3Rpb24gQSgpOiB2b2lkIHsgfTtcclxuICAgIGxldCBCID0gZnVuY3Rpb24gQigpOiB2b2lkIHsgfTtcclxuICAgIGxldCBkZWNvcmF0b3JzID0gW1xyXG4gICAgICAgICh0YXJnZXQ6IEZ1bmN0aW9uKTogYW55ID0+IHsgc2VudC5wdXNoKHRhcmdldCk7IHJldHVybiB1bmRlZmluZWQ7IH0sXHJcbiAgICAgICAgKHRhcmdldDogRnVuY3Rpb24pOiBhbnkgPT4geyBzZW50LnB1c2godGFyZ2V0KTsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcclxuICAgICAgICAodGFyZ2V0OiBGdW5jdGlvbik6IGFueSA9PiB7IHNlbnQucHVzaCh0YXJnZXQpOyByZXR1cm4gQTsgfSxcclxuICAgICAgICAodGFyZ2V0OiBGdW5jdGlvbik6IGFueSA9PiB7IHNlbnQucHVzaCh0YXJnZXQpOyByZXR1cm4gQjsgfVxyXG4gICAgXTtcclxuICAgIGxldCB0YXJnZXQgPSBmdW5jdGlvbiAoKTogdm9pZCB7IH07XHJcbiAgICBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCk7XHJcbiAgICBhc3NlcnQuZGVlcEVxdWFsKHNlbnQsIFt0YXJnZXQsIEIsIEEsIEFdKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3REZWNvcmF0b3JDb3JyZWN0VGFyZ2V0SW5QaXBlbGluZUZvclByb3BlcnR5T3ZlcmxvYWQoKSB7XHJcbiAgICBsZXQgc2VudDogT2JqZWN0W10gPSBbXTtcclxuICAgIGxldCBkZWNvcmF0b3JzID0gW1xyXG4gICAgICAgICh0YXJnZXQ6IE9iamVjdCwgbmFtZTogc3RyaW5nIHwgc3ltYm9sKTogYW55ID0+IHsgc2VudC5wdXNoKHRhcmdldCk7IH0sXHJcbiAgICAgICAgKHRhcmdldDogT2JqZWN0LCBuYW1lOiBzdHJpbmcgfCBzeW1ib2wpOiBhbnkgPT4geyBzZW50LnB1c2godGFyZ2V0KTsgfSxcclxuICAgICAgICAodGFyZ2V0OiBPYmplY3QsIG5hbWU6IHN0cmluZyB8IHN5bWJvbCk6IGFueSA9PiB7IHNlbnQucHVzaCh0YXJnZXQpOyB9LFxyXG4gICAgICAgICh0YXJnZXQ6IE9iamVjdCwgbmFtZTogc3RyaW5nIHwgc3ltYm9sKTogYW55ID0+IHsgc2VudC5wdXNoKHRhcmdldCk7IH1cclxuICAgIF07XHJcbiAgICBsZXQgdGFyZ2V0ID0geyB9O1xyXG4gICAgUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIFwibmFtZVwiKTtcclxuICAgIGFzc2VydC5kZWVwRXF1YWwoc2VudCwgW3RhcmdldCwgdGFyZ2V0LCB0YXJnZXQsIHRhcmdldF0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdERlY29yYXRvckNvcnJlY3ROYW1lSW5QaXBlbGluZUZvclByb3BlcnR5T3ZlcmxvYWQoKSB7XHJcbiAgICBsZXQgc2VudDogKHN5bWJvbCB8IHN0cmluZylbXSA9IFtdO1xyXG4gICAgbGV0IGRlY29yYXRvcnMgPSBbXHJcbiAgICAgICAgKHRhcmdldDogT2JqZWN0LCBuYW1lOiBzdHJpbmcgfCBzeW1ib2wpOiBhbnkgPT4geyBzZW50LnB1c2gobmFtZSk7IH0sXHJcbiAgICAgICAgKHRhcmdldDogT2JqZWN0LCBuYW1lOiBzdHJpbmcgfCBzeW1ib2wpOiBhbnkgPT4geyBzZW50LnB1c2gobmFtZSk7IH0sXHJcbiAgICAgICAgKHRhcmdldDogT2JqZWN0LCBuYW1lOiBzdHJpbmcgfCBzeW1ib2wpOiBhbnkgPT4geyBzZW50LnB1c2gobmFtZSk7IH0sXHJcbiAgICAgICAgKHRhcmdldDogT2JqZWN0LCBuYW1lOiBzdHJpbmcgfCBzeW1ib2wpOiBhbnkgPT4geyBzZW50LnB1c2gobmFtZSk7IH1cclxuICAgIF07XHJcbiAgICBsZXQgdGFyZ2V0ID0geyB9O1xyXG4gICAgUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIFwibmFtZVwiKTtcclxuICAgIGFzc2VydC5kZWVwRXF1YWwoc2VudCwgW1wibmFtZVwiLCBcIm5hbWVcIiwgXCJuYW1lXCIsIFwibmFtZVwiXSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0RGVjb3JhdG9yQ29ycmVjdFRhcmdldEluUGlwZWxpbmVGb3JQcm9wZXJ0eURlc2NyaXB0b3JPdmVybG9hZCgpIHtcclxuICAgIGxldCBzZW50OiBPYmplY3RbXSA9IFtdO1xyXG4gICAgbGV0IEEgPSB7IH07XHJcbiAgICBsZXQgQiA9IHsgfTtcclxuICAgIGxldCBDID0geyB9O1xyXG4gICAgbGV0IGRlY29yYXRvcnMgPSBbXHJcbiAgICAgICAgKHRhcmdldDogT2JqZWN0LCBuYW1lOiBzdHJpbmcgfCBzeW1ib2wpOiBhbnkgPT4geyBzZW50LnB1c2godGFyZ2V0KTsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcclxuICAgICAgICAodGFyZ2V0OiBPYmplY3QsIG5hbWU6IHN0cmluZyB8IHN5bWJvbCk6IGFueSA9PiB7IHNlbnQucHVzaCh0YXJnZXQpOyByZXR1cm4gdW5kZWZpbmVkOyB9LFxyXG4gICAgICAgICh0YXJnZXQ6IE9iamVjdCwgbmFtZTogc3RyaW5nIHwgc3ltYm9sKTogYW55ID0+IHsgc2VudC5wdXNoKHRhcmdldCk7IHJldHVybiBBOyB9LFxyXG4gICAgICAgICh0YXJnZXQ6IE9iamVjdCwgbmFtZTogc3RyaW5nIHwgc3ltYm9sKTogYW55ID0+IHsgc2VudC5wdXNoKHRhcmdldCk7IHJldHVybiBCOyB9XHJcbiAgICBdO1xyXG4gICAgbGV0IHRhcmdldCA9IHsgfTtcclxuICAgIFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBcIm5hbWVcIiwgQyk7XHJcbiAgICBhc3NlcnQuZGVlcEVxdWFsKHNlbnQsIFt0YXJnZXQsIHRhcmdldCwgdGFyZ2V0LCB0YXJnZXRdKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3REZWNvcmF0b3JDb3JyZWN0TmFtZUluUGlwZWxpbmVGb3JQcm9wZXJ0eURlc2NyaXB0b3JPdmVybG9hZCgpIHtcclxuICAgIGxldCBzZW50OiAoc3ltYm9sIHwgc3RyaW5nKVtdID0gW107XHJcbiAgICBsZXQgQSA9IHsgfTtcclxuICAgIGxldCBCID0geyB9O1xyXG4gICAgbGV0IEMgPSB7IH07XHJcbiAgICBsZXQgZGVjb3JhdG9ycyA9IFtcclxuICAgICAgICAodGFyZ2V0OiBPYmplY3QsIG5hbWU6IHN0cmluZyB8IHN5bWJvbCk6IGFueSA9PiB7IHNlbnQucHVzaChuYW1lKTsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcclxuICAgICAgICAodGFyZ2V0OiBPYmplY3QsIG5hbWU6IHN0cmluZyB8IHN5bWJvbCk6IGFueSA9PiB7IHNlbnQucHVzaChuYW1lKTsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcclxuICAgICAgICAodGFyZ2V0OiBPYmplY3QsIG5hbWU6IHN0cmluZyB8IHN5bWJvbCk6IGFueSA9PiB7IHNlbnQucHVzaChuYW1lKTsgcmV0dXJuIEE7IH0sXHJcbiAgICAgICAgKHRhcmdldDogT2JqZWN0LCBuYW1lOiBzdHJpbmcgfCBzeW1ib2wpOiBhbnkgPT4geyBzZW50LnB1c2gobmFtZSk7IHJldHVybiBCOyB9XHJcbiAgICBdO1xyXG4gICAgbGV0IHRhcmdldCA9IHsgfTtcclxuICAgIFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBcIm5hbWVcIiwgQyk7XHJcbiAgICBhc3NlcnQuZGVlcEVxdWFsKHNlbnQsIFtcIm5hbWVcIiwgXCJuYW1lXCIsIFwibmFtZVwiLCBcIm5hbWVcIl0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdERlY29yYXRvckNvcnJlY3REZXNjcmlwdG9ySW5QaXBlbGluZUZvclByb3BlcnR5RGVzY3JpcHRvck92ZXJsb2FkKCkge1xyXG4gICAgbGV0IHNlbnQ6IFByb3BlcnR5RGVzY3JpcHRvcltdID0gW107XHJcbiAgICBsZXQgQSA9IHsgfTtcclxuICAgIGxldCBCID0geyB9O1xyXG4gICAgbGV0IEMgPSB7IH07XHJcbiAgICBsZXQgZGVjb3JhdG9ycyA9IFtcclxuICAgICAgICAodGFyZ2V0OiBPYmplY3QsIG5hbWU6IHN0cmluZyB8IHN5bWJvbCwgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKTogYW55ID0+IHsgc2VudC5wdXNoKGRlc2NyaXB0b3IpOyByZXR1cm4gdW5kZWZpbmVkOyB9LFxyXG4gICAgICAgICh0YXJnZXQ6IE9iamVjdCwgbmFtZTogc3RyaW5nIHwgc3ltYm9sLCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpOiBhbnkgPT4geyBzZW50LnB1c2goZGVzY3JpcHRvcik7IHJldHVybiB1bmRlZmluZWQ7IH0sXHJcbiAgICAgICAgKHRhcmdldDogT2JqZWN0LCBuYW1lOiBzdHJpbmcgfCBzeW1ib2wsIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcik6IGFueSA9PiB7IHNlbnQucHVzaChkZXNjcmlwdG9yKTsgcmV0dXJuIEE7IH0sXHJcbiAgICAgICAgKHRhcmdldDogT2JqZWN0LCBuYW1lOiBzdHJpbmcgfCBzeW1ib2wsIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcik6IGFueSA9PiB7IHNlbnQucHVzaChkZXNjcmlwdG9yKTsgcmV0dXJuIEI7IH1cclxuICAgIF07XHJcbiAgICBsZXQgdGFyZ2V0ID0geyB9O1xyXG4gICAgUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIFwibmFtZVwiLCBDKTtcclxuICAgIGFzc2VydC5kZWVwRXF1YWwoc2VudCwgW0MsIEIsIEEsIEFdKTtcclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
