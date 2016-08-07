/**
 * @module
 * @description
 * The `di` module provides dependency injection container services.
 */
System.register(['./di/metadata', './di/decorators', './di/forward_ref', './di/injector', './di/provider', './di/key', './di/exceptions', './di/opaque_token'], function(exports_1, context_1) {
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
        'Binding': true,
        'ProviderBuilder': true,
        'ResolvedBinding': true,
        'ResolvedFactory': true,
        'Dependency': true,
        'bind': true,
        'Provider': true,
        'ResolvedProvider': true,
        'provide': true,
        'Key': true,
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
            function (provider_1_1) {
                exports_1({
                    "Binding": provider_1_1["Binding"],
                    "ProviderBuilder": provider_1_1["ProviderBuilder"],
                    "ResolvedBinding": provider_1_1["ResolvedBinding"],
                    "ResolvedFactory": provider_1_1["ResolvedFactory"],
                    "Dependency": provider_1_1["Dependency"],
                    "bind": provider_1_1["bind"],
                    "Provider": provider_1_1["Provider"],
                    "ResolvedProvider": provider_1_1["ResolvedProvider"],
                    "provide": provider_1_1["provide"]
                });
            },
            function (key_1_1) {
                exports_1({
                    "Key": key_1_1["Key"]
                });
            },
            function (exceptions_1_1) {
                exports_1({
                    "NoProviderError": exceptions_1_1["NoProviderError"],
                    "AbstractProviderError": exceptions_1_1["AbstractProviderError"],
                    "CyclicDependencyError": exceptions_1_1["CyclicDependencyError"],
                    "InstantiationError": exceptions_1_1["InstantiationError"],
                    "InvalidProviderError": exceptions_1_1["InvalidProviderError"],
                    "NoAnnotationError": exceptions_1_1["NoAnnotationError"],
                    "OutOfBoundsError": exceptions_1_1["OutOfBoundsError"]
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvZGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRyIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2RpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbW9kdWxlXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoZSBgZGlgIG1vZHVsZSBwcm92aWRlcyBkZXBlbmRlbmN5IGluamVjdGlvbiBjb250YWluZXIgc2VydmljZXMuXG4gKi9cblxuZXhwb3J0IHtcbiAgSW5qZWN0TWV0YWRhdGEsXG4gIE9wdGlvbmFsTWV0YWRhdGEsXG4gIEluamVjdGFibGVNZXRhZGF0YSxcbiAgU2VsZk1ldGFkYXRhLFxuICBIb3N0TWV0YWRhdGEsXG4gIFNraXBTZWxmTWV0YWRhdGEsXG4gIERlcGVuZGVuY3lNZXRhZGF0YVxufSBmcm9tICcuL2RpL21ldGFkYXRhJztcblxuLy8gd2UgaGF2ZSB0byByZWV4cG9ydCAqIGJlY2F1c2UgRGFydCBhbmQgVFMgZXhwb3J0IHR3byBkaWZmZXJlbnQgc2V0cyBvZiB0eXBlc1xuZXhwb3J0ICogZnJvbSAnLi9kaS9kZWNvcmF0b3JzJztcblxuZXhwb3J0IHtmb3J3YXJkUmVmLCByZXNvbHZlRm9yd2FyZFJlZiwgRm9yd2FyZFJlZkZufSBmcm9tICcuL2RpL2ZvcndhcmRfcmVmJztcbmV4cG9ydCB7SW5qZWN0b3J9IGZyb20gJy4vZGkvaW5qZWN0b3InO1xuZXhwb3J0IHtcbiAgQmluZGluZyxcbiAgUHJvdmlkZXJCdWlsZGVyLFxuICBSZXNvbHZlZEJpbmRpbmcsXG4gIFJlc29sdmVkRmFjdG9yeSxcbiAgRGVwZW5kZW5jeSxcbiAgYmluZCxcblxuICBQcm92aWRlcixcbiAgUmVzb2x2ZWRQcm92aWRlcixcbiAgcHJvdmlkZVxufSBmcm9tICcuL2RpL3Byb3ZpZGVyJztcbmV4cG9ydCB7S2V5fSBmcm9tICcuL2RpL2tleSc7XG5leHBvcnQge1xuICBOb1Byb3ZpZGVyRXJyb3IsXG4gIEFic3RyYWN0UHJvdmlkZXJFcnJvcixcbiAgQ3ljbGljRGVwZW5kZW5jeUVycm9yLFxuICBJbnN0YW50aWF0aW9uRXJyb3IsXG4gIEludmFsaWRQcm92aWRlckVycm9yLFxuICBOb0Fubm90YXRpb25FcnJvcixcbiAgT3V0T2ZCb3VuZHNFcnJvclxufSBmcm9tICcuL2RpL2V4Y2VwdGlvbnMnO1xuZXhwb3J0IHtPcGFxdWVUb2tlbn0gZnJvbSAnLi9kaS9vcGFxdWVfdG9rZW4nO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
