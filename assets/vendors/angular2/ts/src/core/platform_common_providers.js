System.register(['angular2/src/facade/lang', 'angular2/src/core/di', 'angular2/src/core/console', './reflection/reflection', './reflection/reflector_reader', 'angular2/src/core/testability/testability', './application_ref'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, di_1, console_1, reflection_1, reflector_reader_1, testability_1, application_ref_1;
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
            },
            function (application_ref_1_1) {
                application_ref_1 = application_ref_1_1;
            }],
        execute: function() {
            /**
             * A default set of providers which should be included in any Angular platform.
             */
            exports_1("PLATFORM_COMMON_PROVIDERS", PLATFORM_COMMON_PROVIDERS = lang_1.CONST_EXPR([
                application_ref_1.PLATFORM_CORE_PROVIDERS,
                new di_1.Provider(reflection_1.Reflector, { useFactory: _reflector, deps: [] }),
                new di_1.Provider(reflector_reader_1.ReflectorReader, { useExisting: reflection_1.Reflector }),
                testability_1.TestabilityRegistry,
                console_1.Console
            ]));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL3BsYXRmb3JtX2NvbW1vbl9wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQWVhLHlCQUF5QjtJQVB0QztRQUNFLE1BQU0sQ0FBQyxzQkFBUyxDQUFDO0lBQ25CLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFFRDs7ZUFFRztZQUNVLHVDQUFBLHlCQUF5QixHQUFtQyxpQkFBVSxDQUFDO2dCQUNsRix5Q0FBdUI7Z0JBQ3ZCLElBQUksYUFBUSxDQUFDLHNCQUFTLEVBQUUsRUFBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUMsQ0FBQztnQkFDM0QsSUFBSSxhQUFRLENBQUMsa0NBQWUsRUFBRSxFQUFDLFdBQVcsRUFBRSxzQkFBUyxFQUFDLENBQUM7Z0JBQ3ZELGlDQUFtQjtnQkFDbkIsaUJBQU87YUFDUixDQUFDLENBQUEsQ0FBQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29yZS9wbGF0Zm9ybV9jb21tb25fcHJvdmlkZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUeXBlLCBpc0JsYW5rLCBpc1ByZXNlbnQsIGFzc2VydGlvbnNFbmFibGVkLCBDT05TVF9FWFBSfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtwcm92aWRlLCBQcm92aWRlciwgSW5qZWN0b3IsIE9wYXF1ZVRva2VufSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge0NvbnNvbGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2NvbnNvbGUnO1xuaW1wb3J0IHtSZWZsZWN0b3IsIHJlZmxlY3Rvcn0gZnJvbSAnLi9yZWZsZWN0aW9uL3JlZmxlY3Rpb24nO1xuaW1wb3J0IHtSZWZsZWN0b3JSZWFkZXJ9IGZyb20gJy4vcmVmbGVjdGlvbi9yZWZsZWN0b3JfcmVhZGVyJztcbmltcG9ydCB7VGVzdGFiaWxpdHlSZWdpc3RyeX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvdGVzdGFiaWxpdHkvdGVzdGFiaWxpdHknO1xuaW1wb3J0IHtQTEFURk9STV9DT1JFX1BST1ZJREVSU30gZnJvbSAnLi9hcHBsaWNhdGlvbl9yZWYnO1xuXG5mdW5jdGlvbiBfcmVmbGVjdG9yKCk6IFJlZmxlY3RvciB7XG4gIHJldHVybiByZWZsZWN0b3I7XG59XG5cbi8qKlxuICogQSBkZWZhdWx0IHNldCBvZiBwcm92aWRlcnMgd2hpY2ggc2hvdWxkIGJlIGluY2x1ZGVkIGluIGFueSBBbmd1bGFyIHBsYXRmb3JtLlxuICovXG5leHBvcnQgY29uc3QgUExBVEZPUk1fQ09NTU9OX1BST1ZJREVSUzogQXJyYXk8VHlwZSB8IFByb3ZpZGVyIHwgYW55W10+ID0gQ09OU1RfRVhQUihbXG4gIFBMQVRGT1JNX0NPUkVfUFJPVklERVJTLFxuICBuZXcgUHJvdmlkZXIoUmVmbGVjdG9yLCB7dXNlRmFjdG9yeTogX3JlZmxlY3RvciwgZGVwczogW119KSxcbiAgbmV3IFByb3ZpZGVyKFJlZmxlY3RvclJlYWRlciwge3VzZUV4aXN0aW5nOiBSZWZsZWN0b3J9KSxcbiAgVGVzdGFiaWxpdHlSZWdpc3RyeSxcbiAgQ29uc29sZVxuXSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
