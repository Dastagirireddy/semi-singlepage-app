System.register(['angular2/src/core/di', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var di_1, lang_1;
    var DOCUMENT;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * A DI Token representing the main rendering context. In a browser this is the DOM Document.
             *
             * Note: Document might not be available in the Application Context when Application and Rendering
             * Contexts are not the same (e.g. when running the application into a Web Worker).
             */
            exports_1("DOCUMENT", DOCUMENT = lang_1.CONST_EXPR(new di_1.OpaqueToken('DocumentToken')));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL2RvbS9kb21fdG9rZW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFTYSxRQUFROzs7Ozs7Ozs7O1lBTnJCOzs7OztlQUtHO1lBQ1Usc0JBQUEsUUFBUSxHQUFnQixpQkFBVSxDQUFDLElBQUksZ0JBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFBLENBQUMiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvcGxhdGZvcm0vZG9tL2RvbV90b2tlbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09wYXF1ZVRva2VufSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge0NPTlNUX0VYUFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbi8qKlxuICogQSBESSBUb2tlbiByZXByZXNlbnRpbmcgdGhlIG1haW4gcmVuZGVyaW5nIGNvbnRleHQuIEluIGEgYnJvd3NlciB0aGlzIGlzIHRoZSBET00gRG9jdW1lbnQuXG4gKlxuICogTm90ZTogRG9jdW1lbnQgbWlnaHQgbm90IGJlIGF2YWlsYWJsZSBpbiB0aGUgQXBwbGljYXRpb24gQ29udGV4dCB3aGVuIEFwcGxpY2F0aW9uIGFuZCBSZW5kZXJpbmdcbiAqIENvbnRleHRzIGFyZSBub3QgdGhlIHNhbWUgKGUuZy4gd2hlbiBydW5uaW5nIHRoZSBhcHBsaWNhdGlvbiBpbnRvIGEgV2ViIFdvcmtlcikuXG4gKi9cbmV4cG9ydCBjb25zdCBET0NVTUVOVDogT3BhcXVlVG9rZW4gPSBDT05TVF9FWFBSKG5ldyBPcGFxdWVUb2tlbignRG9jdW1lbnRUb2tlbicpKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
