/**
 * @module
 * @description
 * The `di` module provides dependency injection container services.
 */
System.register(['./di/metadata', './di/decorators', './di/forward_ref', './di/injector', './di/reflective_injector', './di/provider', './di/reflective_provider', './di/reflective_key', './di/reflective_exceptions', './di/opaque_token'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var exportedNames_1 = {
        'InjectMetadata': true,
        'OptionalMetadata': true,
        'InjectableMetadata': true,
        'SelfMetadata': true,
        'HostMetadata': true,
        'SkipSelfMetadata': true,
        'DependencyMetadata': true,
        'forwardRef': true,
        'resolveForwardRef': true,
        'ForwardRefFn': true,
        'Injector': true,
        'ReflectiveInjector': true,
        'Binding': true,
        'ProviderBuilder': true,
        'bind': true,
        'Provider': true,
        'provide': true,
        'ResolvedReflectiveBinding': true,
        'ResolvedReflectiveFactory': true,
        'ReflectiveDependency': true,
        'ResolvedReflectiveProvider': true,
        'ReflectiveKey': true,
        'NoProviderError': true,
        'AbstractProviderError': true,
        'CyclicDependencyError': true,
        'InstantiationError': true,
        'InvalidProviderError': true,
        'NoAnnotationError': true,
        'OutOfBoundsError': true,
        'OpaqueToken': true
    };
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (metadata_1_1) {
                exports_1({
                    "InjectMetadata": metadata_1_1["InjectMetadata"],
                    "OptionalMetadata": metadata_1_1["OptionalMetadata"],
                    "InjectableMetadata": metadata_1_1["InjectableMetadata"],
                    "SelfMetadata": metadata_1_1["SelfMetadata"],
                    "HostMetadata": metadata_1_1["HostMetadata"],
                    "SkipSelfMetadata": metadata_1_1["SkipSelfMetadata"],
                    "DependencyMetadata": metadata_1_1["DependencyMetadata"]
                });
            },
            function (decorators_1_1) {
                exportStar_1(decorators_1_1);
            },
            function (forward_ref_1_1) {
                exports_1({
                    "forwardRef": forward_ref_1_1["forwardRef"],
                    "resolveForwardRef": forward_ref_1_1["resolveForwardRef"],
                    "ForwardRefFn": forward_ref_1_1["ForwardRefFn"]
                });
            },
            function (injector_1_1) {
                exports_1({
                    "Injector": injector_1_1["Injector"]
                });
            },
            function (reflective_injector_1_1) {
                exports_1({
                    "ReflectiveInjector": reflective_injector_1_1["ReflectiveInjector"]
                });
            },
            function (provider_1_1) {
                exports_1({
                    "Binding": provider_1_1["Binding"],
                    "ProviderBuilder": provider_1_1["ProviderBuilder"],
                    "bind": provider_1_1["bind"],
                    "Provider": provider_1_1["Provider"],
                    "provide": provider_1_1["provide"]
                });
            },
            function (reflective_provider_1_1) {
                exports_1({
                    "ResolvedReflectiveBinding": reflective_provider_1_1["ResolvedReflectiveBinding"],
                    "ResolvedReflectiveFactory": reflective_provider_1_1["ResolvedReflectiveFactory"],
                    "ReflectiveDependency": reflective_provider_1_1["ReflectiveDependency"],
                    "ResolvedReflectiveProvider": reflective_provider_1_1["ResolvedReflectiveProvider"]
                });
            },
            function (reflective_key_1_1) {
                exports_1({
                    "ReflectiveKey": reflective_key_1_1["ReflectiveKey"]
                });
            },
            function (reflective_exceptions_1_1) {
                exports_1({
                    "NoProviderError": reflective_exceptions_1_1["NoProviderError"],
                    "AbstractProviderError": reflective_exceptions_1_1["AbstractProviderError"],
                    "CyclicDependencyError": reflective_exceptions_1_1["CyclicDependencyError"],
                    "InstantiationError": reflective_exceptions_1_1["InstantiationError"],
                    "InvalidProviderError": reflective_exceptions_1_1["InvalidProviderError"],
                    "NoAnnotationError": reflective_exceptions_1_1["NoAnnotationError"],
                    "OutOfBoundsError": reflective_exceptions_1_1["OutOfBoundsError"]
                });
            },
            function (opaque_token_1_1) {
                exports_1({
                    "OpaqueToken": opaque_token_1_1["OpaqueToken"]
                });
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2RpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUciLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvZGkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBtb2R1bGVcbiAqIEBkZXNjcmlwdGlvblxuICogVGhlIGBkaWAgbW9kdWxlIHByb3ZpZGVzIGRlcGVuZGVuY3kgaW5qZWN0aW9uIGNvbnRhaW5lciBzZXJ2aWNlcy5cbiAqL1xuXG5leHBvcnQge1xuICBJbmplY3RNZXRhZGF0YSxcbiAgT3B0aW9uYWxNZXRhZGF0YSxcbiAgSW5qZWN0YWJsZU1ldGFkYXRhLFxuICBTZWxmTWV0YWRhdGEsXG4gIEhvc3RNZXRhZGF0YSxcbiAgU2tpcFNlbGZNZXRhZGF0YSxcbiAgRGVwZW5kZW5jeU1ldGFkYXRhXG59IGZyb20gJy4vZGkvbWV0YWRhdGEnO1xuXG4vLyB3ZSBoYXZlIHRvIHJlZXhwb3J0ICogYmVjYXVzZSBEYXJ0IGFuZCBUUyBleHBvcnQgdHdvIGRpZmZlcmVudCBzZXRzIG9mIHR5cGVzXG5leHBvcnQgKiBmcm9tICcuL2RpL2RlY29yYXRvcnMnO1xuXG5leHBvcnQge2ZvcndhcmRSZWYsIHJlc29sdmVGb3J3YXJkUmVmLCBGb3J3YXJkUmVmRm59IGZyb20gJy4vZGkvZm9yd2FyZF9yZWYnO1xuXG5leHBvcnQge0luamVjdG9yfSBmcm9tICcuL2RpL2luamVjdG9yJztcbmV4cG9ydCB7UmVmbGVjdGl2ZUluamVjdG9yfSBmcm9tICcuL2RpL3JlZmxlY3RpdmVfaW5qZWN0b3InO1xuZXhwb3J0IHtcbiAgQmluZGluZyxcbiAgUHJvdmlkZXJCdWlsZGVyLFxuICBiaW5kLFxuXG4gIFByb3ZpZGVyLFxuICBwcm92aWRlXG59IGZyb20gJy4vZGkvcHJvdmlkZXInO1xuZXhwb3J0IHtcbiAgUmVzb2x2ZWRSZWZsZWN0aXZlQmluZGluZyxcbiAgUmVzb2x2ZWRSZWZsZWN0aXZlRmFjdG9yeSxcbiAgUmVmbGVjdGl2ZURlcGVuZGVuY3ksXG5cbiAgUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXJcbn0gZnJvbSAnLi9kaS9yZWZsZWN0aXZlX3Byb3ZpZGVyJztcbmV4cG9ydCB7UmVmbGVjdGl2ZUtleX0gZnJvbSAnLi9kaS9yZWZsZWN0aXZlX2tleSc7XG5leHBvcnQge1xuICBOb1Byb3ZpZGVyRXJyb3IsXG4gIEFic3RyYWN0UHJvdmlkZXJFcnJvcixcbiAgQ3ljbGljRGVwZW5kZW5jeUVycm9yLFxuICBJbnN0YW50aWF0aW9uRXJyb3IsXG4gIEludmFsaWRQcm92aWRlckVycm9yLFxuICBOb0Fubm90YXRpb25FcnJvcixcbiAgT3V0T2ZCb3VuZHNFcnJvclxufSBmcm9tICcuL2RpL3JlZmxlY3RpdmVfZXhjZXB0aW9ucyc7XG5leHBvcnQge09wYXF1ZVRva2VufSBmcm9tICcuL2RpL29wYXF1ZV90b2tlbic7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
