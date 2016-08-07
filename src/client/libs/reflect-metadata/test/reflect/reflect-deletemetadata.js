// Reflect.deleteMetadata ( metadataKey, target [, propertyKey] )
// - https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#reflectdeletemetadata--metadatakey-target--propertykey-
System.register(["../../Reflect", "assert"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var assert;
    function ReflectDeleteMetadataInvalidTarget() {
        assert.throws(function () { return Reflect.deleteMetadata("key", undefined, undefined); }, TypeError);
    }
    exports_1("ReflectDeleteMetadataInvalidTarget", ReflectDeleteMetadataInvalidTarget);
    function ReflectDeleteMetadataWhenNotDefinedWithoutTargetKey() {
        var obj = {};
        var result = Reflect.deleteMetadata("key", obj, undefined);
        assert.equal(result, false);
    }
    exports_1("ReflectDeleteMetadataWhenNotDefinedWithoutTargetKey", ReflectDeleteMetadataWhenNotDefinedWithoutTargetKey);
    function ReflectDeleteMetadataWhenDefinedWithoutTargetKey() {
        var obj = {};
        Reflect.defineMetadata("key", "value", obj, undefined);
        var result = Reflect.deleteMetadata("key", obj, undefined);
        assert.equal(result, true);
    }
    exports_1("ReflectDeleteMetadataWhenDefinedWithoutTargetKey", ReflectDeleteMetadataWhenDefinedWithoutTargetKey);
    function ReflectDeleteMetadataWhenDefinedOnPrototypeWithoutTargetKey() {
        var prototype = {};
        Reflect.defineMetadata("key", "value", prototype, undefined);
        var obj = Object.create(prototype);
        var result = Reflect.deleteMetadata("key", obj, undefined);
        assert.equal(result, false);
    }
    exports_1("ReflectDeleteMetadataWhenDefinedOnPrototypeWithoutTargetKey", ReflectDeleteMetadataWhenDefinedOnPrototypeWithoutTargetKey);
    function ReflectHasOwnMetadataAfterDeleteMetadata() {
        var obj = {};
        Reflect.defineMetadata("key", "value", obj, undefined);
        Reflect.deleteMetadata("key", obj, undefined);
        var result = Reflect.hasOwnMetadata("key", obj, undefined);
        assert.equal(result, false);
    }
    exports_1("ReflectHasOwnMetadataAfterDeleteMetadata", ReflectHasOwnMetadataAfterDeleteMetadata);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvcmVmbGVjdC1tZXRhZGF0YS90ZXN0L3JlZmxlY3QvcmVmbGVjdC1kZWxldGVtZXRhZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxpRUFBaUU7QUFDakUsd0lBQXdJOzs7OztJQUt4STtRQUNJLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsRUFBbkQsQ0FBbUQsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBRkQsbUZBRUMsQ0FBQTtJQUVEO1FBQ0ksSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzNELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFKRCxxSEFJQyxDQUFBO0lBRUQ7UUFDSSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYixPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMzRCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBTEQsK0dBS0MsQ0FBQTtJQUVEO1FBQ0ksSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ25CLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDN0QsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuQyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDM0QsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQU5ELHFJQU1DLENBQUE7SUFFRDtRQUNJLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDdkQsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzlDLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMzRCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBTkQsK0ZBTUMsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL3JlZmxlY3QtbWV0YWRhdGEvdGVzdC9yZWZsZWN0L3JlZmxlY3QtZGVsZXRlbWV0YWRhdGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBSZWZsZWN0LmRlbGV0ZU1ldGFkYXRhICggbWV0YWRhdGFLZXksIHRhcmdldCBbLCBwcm9wZXJ0eUtleV0gKVxyXG4vLyAtIGh0dHBzOi8vZ2l0aHViLmNvbS9qb25hdGhhbmR0dXJuZXIvZGVjb3JhdG9ycy9ibG9iL21hc3Rlci9zcGVjcy9tZXRhZGF0YS5tZCNyZWZsZWN0ZGVsZXRlbWV0YWRhdGEtLW1ldGFkYXRha2V5LXRhcmdldC0tcHJvcGVydHlrZXktXHJcblxyXG5pbXBvcnQgXCIuLi8uLi9SZWZsZWN0XCI7XHJcbmltcG9ydCAqIGFzIGFzc2VydCBmcm9tIFwiYXNzZXJ0XCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdERlbGV0ZU1ldGFkYXRhSW52YWxpZFRhcmdldCgpIHtcclxuICAgIGFzc2VydC50aHJvd3MoKCkgPT4gUmVmbGVjdC5kZWxldGVNZXRhZGF0YShcImtleVwiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCksIFR5cGVFcnJvcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0RGVsZXRlTWV0YWRhdGFXaGVuTm90RGVmaW5lZFdpdGhvdXRUYXJnZXRLZXkoKSB7XHJcbiAgICBsZXQgb2JqID0ge307XHJcbiAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5kZWxldGVNZXRhZGF0YShcImtleVwiLCBvYmosIHVuZGVmaW5lZCk7XHJcbiAgICBhc3NlcnQuZXF1YWwocmVzdWx0LCBmYWxzZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0RGVsZXRlTWV0YWRhdGFXaGVuRGVmaW5lZFdpdGhvdXRUYXJnZXRLZXkoKSB7XHJcbiAgICBsZXQgb2JqID0ge307XHJcbiAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwia2V5XCIsIFwidmFsdWVcIiwgb2JqLCB1bmRlZmluZWQpO1xyXG4gICAgbGV0IHJlc3VsdCA9IFJlZmxlY3QuZGVsZXRlTWV0YWRhdGEoXCJrZXlcIiwgb2JqLCB1bmRlZmluZWQpO1xyXG4gICAgYXNzZXJ0LmVxdWFsKHJlc3VsdCwgdHJ1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0RGVsZXRlTWV0YWRhdGFXaGVuRGVmaW5lZE9uUHJvdG90eXBlV2l0aG91dFRhcmdldEtleSgpIHtcclxuICAgIGxldCBwcm90b3R5cGUgPSB7fTtcclxuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXlcIiwgXCJ2YWx1ZVwiLCBwcm90b3R5cGUsIHVuZGVmaW5lZCk7XHJcbiAgICBsZXQgb2JqID0gT2JqZWN0LmNyZWF0ZShwcm90b3R5cGUpO1xyXG4gICAgbGV0IHJlc3VsdCA9IFJlZmxlY3QuZGVsZXRlTWV0YWRhdGEoXCJrZXlcIiwgb2JqLCB1bmRlZmluZWQpO1xyXG4gICAgYXNzZXJ0LmVxdWFsKHJlc3VsdCwgZmFsc2UpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdEhhc093bk1ldGFkYXRhQWZ0ZXJEZWxldGVNZXRhZGF0YSgpIHtcclxuICAgIGxldCBvYmogPSB7fTtcclxuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXlcIiwgXCJ2YWx1ZVwiLCBvYmosIHVuZGVmaW5lZCk7XHJcbiAgICBSZWZsZWN0LmRlbGV0ZU1ldGFkYXRhKFwia2V5XCIsIG9iaiwgdW5kZWZpbmVkKTtcclxuICAgIGxldCByZXN1bHQgPSBSZWZsZWN0Lmhhc093bk1ldGFkYXRhKFwia2V5XCIsIG9iaiwgdW5kZWZpbmVkKTtcclxuICAgIGFzc2VydC5lcXVhbChyZXN1bHQsIGZhbHNlKTtcclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
