// Reflect.defineMetadata ( metadataKey, metadataValue, target, propertyKey )
// - https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#reflectdefinemetadata--metadatakey-metadatavalue-target-propertykey-    
System.register(["../../Reflect", "assert"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var assert;
    function ReflectDefineMetadataInvalidTarget() {
        assert.throws(function () { return Reflect.defineMetadata("key", "value", undefined, undefined); }, TypeError);
    }
    exports_1("ReflectDefineMetadataInvalidTarget", ReflectDefineMetadataInvalidTarget);
    function ReflectDefineMetadataValidTargetWithoutTargetKey() {
        assert.doesNotThrow(function () { return Reflect.defineMetadata("key", "value", {}, undefined); });
    }
    exports_1("ReflectDefineMetadataValidTargetWithoutTargetKey", ReflectDefineMetadataValidTargetWithoutTargetKey);
    function ReflectDefineMetadataValidTargetWithTargetKey() {
        assert.doesNotThrow(function () { return Reflect.defineMetadata("key", "value", {}, "name"); });
    }
    exports_1("ReflectDefineMetadataValidTargetWithTargetKey", ReflectDefineMetadataValidTargetWithTargetKey);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3JlZmxlY3QtbWV0YWRhdGEvdGVzdC9yZWZsZWN0L3JlZmxlY3QtZGVmaW5lbWV0YWRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNkVBQTZFO0FBQzdFLHlKQUF5Sjs7Ozs7SUFLeko7UUFDSSxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxFQUE1RCxDQUE0RCxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ2pHLENBQUM7SUFGRCxtRkFFQyxDQUFBO0lBRUQ7UUFDSSxNQUFNLENBQUMsWUFBWSxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRyxFQUFFLFNBQVMsQ0FBQyxFQUF0RCxDQUFzRCxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUZELCtHQUVDLENBQUE7SUFFRDtRQUNJLE1BQU0sQ0FBQyxZQUFZLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFHLEVBQUUsTUFBTSxDQUFDLEVBQW5ELENBQW1ELENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRkQseUdBRUMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9yZWZsZWN0LW1ldGFkYXRhL3Rlc3QvcmVmbGVjdC9yZWZsZWN0LWRlZmluZW1ldGFkYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gUmVmbGVjdC5kZWZpbmVNZXRhZGF0YSAoIG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlLCB0YXJnZXQsIHByb3BlcnR5S2V5IClcclxuLy8gLSBodHRwczovL2dpdGh1Yi5jb20vam9uYXRoYW5kdHVybmVyL2RlY29yYXRvcnMvYmxvYi9tYXN0ZXIvc3BlY3MvbWV0YWRhdGEubWQjcmVmbGVjdGRlZmluZW1ldGFkYXRhLS1tZXRhZGF0YWtleS1tZXRhZGF0YXZhbHVlLXRhcmdldC1wcm9wZXJ0eWtleS0gICAgXHJcblxyXG5pbXBvcnQgXCIuLi8uLi9SZWZsZWN0XCI7XHJcbmltcG9ydCAqIGFzIGFzc2VydCBmcm9tIFwiYXNzZXJ0XCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVmbGVjdERlZmluZU1ldGFkYXRhSW52YWxpZFRhcmdldCgpIHtcclxuICAgIGFzc2VydC50aHJvd3MoKCkgPT4gUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleVwiLCBcInZhbHVlXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKSwgVHlwZUVycm9yKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlZmxlY3REZWZpbmVNZXRhZGF0YVZhbGlkVGFyZ2V0V2l0aG91dFRhcmdldEtleSgpIHtcclxuICAgIGFzc2VydC5kb2VzTm90VGhyb3coKCkgPT4gUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleVwiLCBcInZhbHVlXCIsIHsgfSwgdW5kZWZpbmVkKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWZsZWN0RGVmaW5lTWV0YWRhdGFWYWxpZFRhcmdldFdpdGhUYXJnZXRLZXkoKSB7XHJcbiAgICBhc3NlcnQuZG9lc05vdFRocm93KCgpID0+IFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXlcIiwgXCJ2YWx1ZVwiLCB7IH0sIFwibmFtZVwiKSk7XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
