System.register(['angular2/src/core/di', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var di_1, lang_1;
    var APP_ID, APP_ID_RANDOM_PROVIDER, PLATFORM_INITIALIZER, APP_INITIALIZER, PACKAGE_ROOT_URL;
    function _appIdRandomProviderFactory() {
        return "" + _randomChar() + _randomChar() + _randomChar();
    }
    function _randomChar() {
        return lang_1.StringWrapper.fromCharCode(97 + lang_1.Math.floor(lang_1.Math.random() * 25));
    }
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
             * A DI Token representing a unique string id assigned to the application by Angular and used
             * primarily for prefixing application attributes and CSS styles when
             * {@link ViewEncapsulation#Emulated} is being used.
             *
             * If you need to avoid randomly generated value to be used as an application id, you can provide
             * a custom value via a DI provider <!-- TODO: provider --> configuring the root {@link Injector}
             * using this token.
             */
            exports_1("APP_ID", APP_ID = lang_1.CONST_EXPR(new di_1.OpaqueToken('AppId')));
            /**
             * Providers that will generate a random APP_ID_TOKEN.
             */
            exports_1("APP_ID_RANDOM_PROVIDER", APP_ID_RANDOM_PROVIDER = lang_1.CONST_EXPR(new di_1.Provider(APP_ID, { useFactory: _appIdRandomProviderFactory, deps: [] })));
            /**
             * A function that will be executed when a platform is initialized.
             */
            exports_1("PLATFORM_INITIALIZER", PLATFORM_INITIALIZER = lang_1.CONST_EXPR(new di_1.OpaqueToken("Platform Initializer")));
            /**
             * A function that will be executed when an application is initialized.
             */
            exports_1("APP_INITIALIZER", APP_INITIALIZER = lang_1.CONST_EXPR(new di_1.OpaqueToken("Application Initializer")));
            /**
             * A token which indicates the root directory of the application
             */
            exports_1("PACKAGE_ROOT_URL", PACKAGE_ROOT_URL = lang_1.CONST_EXPR(new di_1.OpaqueToken("Application Packages Root URL")));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2FwcGxpY2F0aW9uX3Rva2Vucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBWWEsTUFBTSxFQVNOLHNCQUFzQixFQVV0QixvQkFBb0IsRUFNcEIsZUFBZSxFQUtmLGdCQUFnQjtJQTVCN0I7UUFDRSxNQUFNLENBQUMsS0FBRyxXQUFXLEVBQUUsR0FBRyxXQUFXLEVBQUUsR0FBRyxXQUFXLEVBQUksQ0FBQztJQUM1RCxDQUFDO0lBUUQ7UUFDRSxNQUFNLENBQUMsb0JBQWEsQ0FBQyxZQUFZLENBQUMsRUFBRSxHQUFHLFdBQUksQ0FBQyxLQUFLLENBQUMsV0FBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekUsQ0FBQzs7Ozs7Ozs7OztZQXZCRDs7Ozs7Ozs7ZUFRRztZQUNVLG9CQUFBLE1BQU0sR0FBZ0IsaUJBQVUsQ0FBQyxJQUFJLGdCQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQSxDQUFDO1lBTXhFOztlQUVHO1lBQ1Usb0NBQUEsc0JBQXNCLEdBQy9CLGlCQUFVLENBQUMsSUFBSSxhQUFRLENBQUMsTUFBTSxFQUFFLEVBQUMsVUFBVSxFQUFFLDJCQUEyQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQztZQU0xRjs7ZUFFRztZQUNVLGtDQUFBLG9CQUFvQixHQUM3QixpQkFBVSxDQUFDLElBQUksZ0JBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUEsQ0FBQztZQUV4RDs7ZUFFRztZQUNVLDZCQUFBLGVBQWUsR0FBZ0IsaUJBQVUsQ0FBQyxJQUFJLGdCQUFXLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFFbkc7O2VBRUc7WUFDVSw4QkFBQSxnQkFBZ0IsR0FDekIsaUJBQVUsQ0FBQyxJQUFJLGdCQUFXLENBQUMsK0JBQStCLENBQUMsQ0FBQyxDQUFBLENBQUMiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvYXBwbGljYXRpb25fdG9rZW5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPcGFxdWVUb2tlbiwgUHJvdmlkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7Q09OU1RfRVhQUiwgTWF0aCwgU3RyaW5nV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuLyoqXG4gKiBBIERJIFRva2VuIHJlcHJlc2VudGluZyBhIHVuaXF1ZSBzdHJpbmcgaWQgYXNzaWduZWQgdG8gdGhlIGFwcGxpY2F0aW9uIGJ5IEFuZ3VsYXIgYW5kIHVzZWRcbiAqIHByaW1hcmlseSBmb3IgcHJlZml4aW5nIGFwcGxpY2F0aW9uIGF0dHJpYnV0ZXMgYW5kIENTUyBzdHlsZXMgd2hlblxuICoge0BsaW5rIFZpZXdFbmNhcHN1bGF0aW9uI0VtdWxhdGVkfSBpcyBiZWluZyB1c2VkLlxuICpcbiAqIElmIHlvdSBuZWVkIHRvIGF2b2lkIHJhbmRvbWx5IGdlbmVyYXRlZCB2YWx1ZSB0byBiZSB1c2VkIGFzIGFuIGFwcGxpY2F0aW9uIGlkLCB5b3UgY2FuIHByb3ZpZGVcbiAqIGEgY3VzdG9tIHZhbHVlIHZpYSBhIERJIHByb3ZpZGVyIDwhLS0gVE9ETzogcHJvdmlkZXIgLS0+IGNvbmZpZ3VyaW5nIHRoZSByb290IHtAbGluayBJbmplY3Rvcn1cbiAqIHVzaW5nIHRoaXMgdG9rZW4uXG4gKi9cbmV4cG9ydCBjb25zdCBBUFBfSUQ6IE9wYXF1ZVRva2VuID0gQ09OU1RfRVhQUihuZXcgT3BhcXVlVG9rZW4oJ0FwcElkJykpO1xuXG5mdW5jdGlvbiBfYXBwSWRSYW5kb21Qcm92aWRlckZhY3RvcnkoKSB7XG4gIHJldHVybiBgJHtfcmFuZG9tQ2hhcigpfSR7X3JhbmRvbUNoYXIoKX0ke19yYW5kb21DaGFyKCl9YDtcbn1cblxuLyoqXG4gKiBQcm92aWRlcnMgdGhhdCB3aWxsIGdlbmVyYXRlIGEgcmFuZG9tIEFQUF9JRF9UT0tFTi5cbiAqL1xuZXhwb3J0IGNvbnN0IEFQUF9JRF9SQU5ET01fUFJPVklERVI6IFByb3ZpZGVyID1cbiAgICBDT05TVF9FWFBSKG5ldyBQcm92aWRlcihBUFBfSUQsIHt1c2VGYWN0b3J5OiBfYXBwSWRSYW5kb21Qcm92aWRlckZhY3RvcnksIGRlcHM6IFtdfSkpO1xuXG5mdW5jdGlvbiBfcmFuZG9tQ2hhcigpOiBzdHJpbmcge1xuICByZXR1cm4gU3RyaW5nV3JhcHBlci5mcm9tQ2hhckNvZGUoOTcgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNSkpO1xufVxuXG4vKipcbiAqIEEgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIHdoZW4gYSBwbGF0Zm9ybSBpcyBpbml0aWFsaXplZC5cbiAqL1xuZXhwb3J0IGNvbnN0IFBMQVRGT1JNX0lOSVRJQUxJWkVSOiBPcGFxdWVUb2tlbiA9XG4gICAgQ09OU1RfRVhQUihuZXcgT3BhcXVlVG9rZW4oXCJQbGF0Zm9ybSBJbml0aWFsaXplclwiKSk7XG5cbi8qKlxuICogQSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgd2hlbiBhbiBhcHBsaWNhdGlvbiBpcyBpbml0aWFsaXplZC5cbiAqL1xuZXhwb3J0IGNvbnN0IEFQUF9JTklUSUFMSVpFUjogT3BhcXVlVG9rZW4gPSBDT05TVF9FWFBSKG5ldyBPcGFxdWVUb2tlbihcIkFwcGxpY2F0aW9uIEluaXRpYWxpemVyXCIpKTtcblxuLyoqXG4gKiBBIHRva2VuIHdoaWNoIGluZGljYXRlcyB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhlIGFwcGxpY2F0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBQQUNLQUdFX1JPT1RfVVJMOiBPcGFxdWVUb2tlbiA9XG4gICAgQ09OU1RfRVhQUihuZXcgT3BhcXVlVG9rZW4oXCJBcHBsaWNhdGlvbiBQYWNrYWdlcyBSb290IFVSTFwiKSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
