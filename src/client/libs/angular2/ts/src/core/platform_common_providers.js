System.register(['angular2/src/facade/lang', 'angular2/src/core/di', 'angular2/src/core/console', './reflection/reflection', './reflection/reflector_reader', 'angular2/src/core/testability/testability'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, di_1, console_1, reflection_1, reflector_reader_1, testability_1;
    var PLATFORM_COMMON_PROVIDERS;
    function _reflector() {
        return reflection_1.reflector;
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (console_1_1) {
                console_1 = console_1_1;
            },
            function (reflection_1_1) {
                reflection_1 = reflection_1_1;
            },
            function (reflector_reader_1_1) {
                reflector_reader_1 = reflector_reader_1_1;
            },
            function (testability_1_1) {
                testability_1 = testability_1_1;
            }],
        execute: function() {
            /**
             * A default set of providers which should be included in any Angular platform.
             */
            exports_1("PLATFORM_COMMON_PROVIDERS", PLATFORM_COMMON_PROVIDERS = lang_1.CONST_EXPR([
                new di_1.Provider(reflection_1.Reflector, { useFactory: _reflector, deps: [] }),
                new di_1.Provider(reflector_reader_1.ReflectorReader, { useExisting: reflection_1.Reflector }),
                testability_1.TestabilityRegistry,
                console_1.Console
            ]));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvcGxhdGZvcm1fY29tbW9uX3Byb3ZpZGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBY2EseUJBQXlCO0lBUHRDO1FBQ0UsTUFBTSxDQUFDLHNCQUFTLENBQUM7SUFDbkIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUVEOztlQUVHO1lBQ1UsdUNBQUEseUJBQXlCLEdBQW1DLGlCQUFVLENBQUM7Z0JBQ2xGLElBQUksYUFBUSxDQUFDLHNCQUFTLEVBQUUsRUFBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUMsQ0FBQztnQkFDM0QsSUFBSSxhQUFRLENBQUMsa0NBQWUsRUFBRSxFQUFDLFdBQVcsRUFBRSxzQkFBUyxFQUFDLENBQUM7Z0JBQ3ZELGlDQUFtQjtnQkFDbkIsaUJBQU87YUFDUixDQUFDLENBQUEsQ0FBQyIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL3BsYXRmb3JtX2NvbW1vbl9wcm92aWRlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1R5cGUsIGlzQmxhbmssIGlzUHJlc2VudCwgYXNzZXJ0aW9uc0VuYWJsZWQsIENPTlNUX0VYUFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge3Byb3ZpZGUsIFByb3ZpZGVyLCBJbmplY3RvciwgT3BhcXVlVG9rZW59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7Q29uc29sZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvY29uc29sZSc7XG5pbXBvcnQge1JlZmxlY3RvciwgcmVmbGVjdG9yfSBmcm9tICcuL3JlZmxlY3Rpb24vcmVmbGVjdGlvbic7XG5pbXBvcnQge1JlZmxlY3RvclJlYWRlcn0gZnJvbSAnLi9yZWZsZWN0aW9uL3JlZmxlY3Rvcl9yZWFkZXInO1xuaW1wb3J0IHtUZXN0YWJpbGl0eVJlZ2lzdHJ5fSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS90ZXN0YWJpbGl0eS90ZXN0YWJpbGl0eSc7XG5cbmZ1bmN0aW9uIF9yZWZsZWN0b3IoKTogUmVmbGVjdG9yIHtcbiAgcmV0dXJuIHJlZmxlY3Rvcjtcbn1cblxuLyoqXG4gKiBBIGRlZmF1bHQgc2V0IG9mIHByb3ZpZGVycyB3aGljaCBzaG91bGQgYmUgaW5jbHVkZWQgaW4gYW55IEFuZ3VsYXIgcGxhdGZvcm0uXG4gKi9cbmV4cG9ydCBjb25zdCBQTEFURk9STV9DT01NT05fUFJPVklERVJTOiBBcnJheTxUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXT4gPSBDT05TVF9FWFBSKFtcbiAgbmV3IFByb3ZpZGVyKFJlZmxlY3Rvciwge3VzZUZhY3Rvcnk6IF9yZWZsZWN0b3IsIGRlcHM6IFtdfSksXG4gIG5ldyBQcm92aWRlcihSZWZsZWN0b3JSZWFkZXIsIHt1c2VFeGlzdGluZzogUmVmbGVjdG9yfSksXG4gIFRlc3RhYmlsaXR5UmVnaXN0cnksXG4gIENvbnNvbGVcbl0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
