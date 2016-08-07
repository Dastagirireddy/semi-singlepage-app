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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9kb20vZG9tX3Rva2Vucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBU2EsUUFBUTs7Ozs7Ozs7OztZQU5yQjs7Ozs7ZUFLRztZQUNVLHNCQUFBLFFBQVEsR0FBZ0IsaUJBQVUsQ0FBQyxJQUFJLGdCQUFXLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQSxDQUFDIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9kb20vZG9tX3Rva2Vucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T3BhcXVlVG9rZW59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7Q09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuLyoqXG4gKiBBIERJIFRva2VuIHJlcHJlc2VudGluZyB0aGUgbWFpbiByZW5kZXJpbmcgY29udGV4dC4gSW4gYSBicm93c2VyIHRoaXMgaXMgdGhlIERPTSBEb2N1bWVudC5cbiAqXG4gKiBOb3RlOiBEb2N1bWVudCBtaWdodCBub3QgYmUgYXZhaWxhYmxlIGluIHRoZSBBcHBsaWNhdGlvbiBDb250ZXh0IHdoZW4gQXBwbGljYXRpb24gYW5kIFJlbmRlcmluZ1xuICogQ29udGV4dHMgYXJlIG5vdCB0aGUgc2FtZSAoZS5nLiB3aGVuIHJ1bm5pbmcgdGhlIGFwcGxpY2F0aW9uIGludG8gYSBXZWIgV29ya2VyKS5cbiAqL1xuZXhwb3J0IGNvbnN0IERPQ1VNRU5UOiBPcGFxdWVUb2tlbiA9IENPTlNUX0VYUFIobmV3IE9wYXF1ZVRva2VuKCdEb2N1bWVudFRva2VuJykpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
