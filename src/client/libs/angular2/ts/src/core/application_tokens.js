System.register(['angular2/src/core/di', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var di_1, lang_1;
    var APP_COMPONENT_REF_PROMISE, APP_COMPONENT, APP_ID, APP_ID_RANDOM_PROVIDER, PLATFORM_INITIALIZER, APP_INITIALIZER, PACKAGE_ROOT_URL;
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
             *  @internal
             */
            exports_1("APP_COMPONENT_REF_PROMISE", APP_COMPONENT_REF_PROMISE = lang_1.CONST_EXPR(new di_1.OpaqueToken('Promise<ComponentRef>')));
            /**
             * An {@link angular2/di/OpaqueToken} representing the application root type in the {@link
             * Injector}.
             *
             * ```
             * @Component(...)
             * class MyApp {
             *   ...
             * }
             *
             * bootstrap(MyApp).then((appRef:ApplicationRef) {
             *   expect(appRef.injector.get(appComponentTypeToken)).toEqual(MyApp);
             * });
             *
             * ```
             */
            exports_1("APP_COMPONENT", APP_COMPONENT = lang_1.CONST_EXPR(new di_1.OpaqueToken('AppComponent')));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvYXBwbGljYXRpb25fdG9rZW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFNYSx5QkFBeUIsRUFrQnpCLGFBQWEsRUFXYixNQUFNLEVBU04sc0JBQXNCLEVBVXRCLG9CQUFvQixFQU1wQixlQUFlLEVBS2YsZ0JBQWdCO0lBNUI3QjtRQUNFLE1BQU0sQ0FBQyxLQUFHLFdBQVcsRUFBRSxHQUFHLFdBQVcsRUFBRSxHQUFHLFdBQVcsRUFBSSxDQUFDO0lBQzVELENBQUM7SUFRRDtRQUNFLE1BQU0sQ0FBQyxvQkFBYSxDQUFDLFlBQVksQ0FBQyxFQUFFLEdBQUcsV0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6RSxDQUFDOzs7Ozs7Ozs7O1lBOUNEOztlQUVHO1lBQ1UsdUNBQUEseUJBQXlCLEdBQUcsaUJBQVUsQ0FBQyxJQUFJLGdCQUFXLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFFOUY7Ozs7Ozs7Ozs7Ozs7OztlQWVHO1lBQ1UsMkJBQUEsYUFBYSxHQUFnQixpQkFBVSxDQUFDLElBQUksZ0JBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFFdEY7Ozs7Ozs7O2VBUUc7WUFDVSxvQkFBQSxNQUFNLEdBQWdCLGlCQUFVLENBQUMsSUFBSSxnQkFBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUEsQ0FBQztZQU14RTs7ZUFFRztZQUNVLG9DQUFBLHNCQUFzQixHQUMvQixpQkFBVSxDQUFDLElBQUksYUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFDLFVBQVUsRUFBRSwyQkFBMkIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFNMUY7O2VBRUc7WUFDVSxrQ0FBQSxvQkFBb0IsR0FDN0IsaUJBQVUsQ0FBQyxJQUFJLGdCQUFXLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFFeEQ7O2VBRUc7WUFDVSw2QkFBQSxlQUFlLEdBQWdCLGlCQUFVLENBQUMsSUFBSSxnQkFBVyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQSxDQUFDO1lBRW5HOztlQUVHO1lBQ1UsOEJBQUEsZ0JBQWdCLEdBQ3pCLGlCQUFVLENBQUMsSUFBSSxnQkFBVyxDQUFDLCtCQUErQixDQUFDLENBQUMsQ0FBQSxDQUFDIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvYXBwbGljYXRpb25fdG9rZW5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPcGFxdWVUb2tlbiwgUHJvdmlkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7Q09OU1RfRVhQUiwgTWF0aCwgU3RyaW5nV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuLyoqXG4gKiAgQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBBUFBfQ09NUE9ORU5UX1JFRl9QUk9NSVNFID0gQ09OU1RfRVhQUihuZXcgT3BhcXVlVG9rZW4oJ1Byb21pc2U8Q29tcG9uZW50UmVmPicpKTtcblxuLyoqXG4gKiBBbiB7QGxpbmsgYW5ndWxhcjIvZGkvT3BhcXVlVG9rZW59IHJlcHJlc2VudGluZyB0aGUgYXBwbGljYXRpb24gcm9vdCB0eXBlIGluIHRoZSB7QGxpbmtcbiAqIEluamVjdG9yfS5cbiAqXG4gKiBgYGBcbiAqIEBDb21wb25lbnQoLi4uKVxuICogY2xhc3MgTXlBcHAge1xuICogICAuLi5cbiAqIH1cbiAqXG4gKiBib290c3RyYXAoTXlBcHApLnRoZW4oKGFwcFJlZjpBcHBsaWNhdGlvblJlZikge1xuICogICBleHBlY3QoYXBwUmVmLmluamVjdG9yLmdldChhcHBDb21wb25lbnRUeXBlVG9rZW4pKS50b0VxdWFsKE15QXBwKTtcbiAqIH0pO1xuICpcbiAqIGBgYFxuICovXG5leHBvcnQgY29uc3QgQVBQX0NPTVBPTkVOVDogT3BhcXVlVG9rZW4gPSBDT05TVF9FWFBSKG5ldyBPcGFxdWVUb2tlbignQXBwQ29tcG9uZW50JykpO1xuXG4vKipcbiAqIEEgREkgVG9rZW4gcmVwcmVzZW50aW5nIGEgdW5pcXVlIHN0cmluZyBpZCBhc3NpZ25lZCB0byB0aGUgYXBwbGljYXRpb24gYnkgQW5ndWxhciBhbmQgdXNlZFxuICogcHJpbWFyaWx5IGZvciBwcmVmaXhpbmcgYXBwbGljYXRpb24gYXR0cmlidXRlcyBhbmQgQ1NTIHN0eWxlcyB3aGVuXG4gKiB7QGxpbmsgVmlld0VuY2Fwc3VsYXRpb24jRW11bGF0ZWR9IGlzIGJlaW5nIHVzZWQuXG4gKlxuICogSWYgeW91IG5lZWQgdG8gYXZvaWQgcmFuZG9tbHkgZ2VuZXJhdGVkIHZhbHVlIHRvIGJlIHVzZWQgYXMgYW4gYXBwbGljYXRpb24gaWQsIHlvdSBjYW4gcHJvdmlkZVxuICogYSBjdXN0b20gdmFsdWUgdmlhIGEgREkgcHJvdmlkZXIgPCEtLSBUT0RPOiBwcm92aWRlciAtLT4gY29uZmlndXJpbmcgdGhlIHJvb3Qge0BsaW5rIEluamVjdG9yfVxuICogdXNpbmcgdGhpcyB0b2tlbi5cbiAqL1xuZXhwb3J0IGNvbnN0IEFQUF9JRDogT3BhcXVlVG9rZW4gPSBDT05TVF9FWFBSKG5ldyBPcGFxdWVUb2tlbignQXBwSWQnKSk7XG5cbmZ1bmN0aW9uIF9hcHBJZFJhbmRvbVByb3ZpZGVyRmFjdG9yeSgpIHtcbiAgcmV0dXJuIGAke19yYW5kb21DaGFyKCl9JHtfcmFuZG9tQ2hhcigpfSR7X3JhbmRvbUNoYXIoKX1gO1xufVxuXG4vKipcbiAqIFByb3ZpZGVycyB0aGF0IHdpbGwgZ2VuZXJhdGUgYSByYW5kb20gQVBQX0lEX1RPS0VOLlxuICovXG5leHBvcnQgY29uc3QgQVBQX0lEX1JBTkRPTV9QUk9WSURFUjogUHJvdmlkZXIgPVxuICAgIENPTlNUX0VYUFIobmV3IFByb3ZpZGVyKEFQUF9JRCwge3VzZUZhY3Rvcnk6IF9hcHBJZFJhbmRvbVByb3ZpZGVyRmFjdG9yeSwgZGVwczogW119KSk7XG5cbmZ1bmN0aW9uIF9yYW5kb21DaGFyKCk6IHN0cmluZyB7XG4gIHJldHVybiBTdHJpbmdXcmFwcGVyLmZyb21DaGFyQ29kZSg5NyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1KSk7XG59XG5cbi8qKlxuICogQSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgd2hlbiBhIHBsYXRmb3JtIGlzIGluaXRpYWxpemVkLlxuICovXG5leHBvcnQgY29uc3QgUExBVEZPUk1fSU5JVElBTElaRVI6IE9wYXF1ZVRva2VuID1cbiAgICBDT05TVF9FWFBSKG5ldyBPcGFxdWVUb2tlbihcIlBsYXRmb3JtIEluaXRpYWxpemVyXCIpKTtcblxuLyoqXG4gKiBBIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBleGVjdXRlZCB3aGVuIGFuIGFwcGxpY2F0aW9uIGlzIGluaXRpYWxpemVkLlxuICovXG5leHBvcnQgY29uc3QgQVBQX0lOSVRJQUxJWkVSOiBPcGFxdWVUb2tlbiA9IENPTlNUX0VYUFIobmV3IE9wYXF1ZVRva2VuKFwiQXBwbGljYXRpb24gSW5pdGlhbGl6ZXJcIikpO1xuXG4vKipcbiAqIEEgdG9rZW4gd2hpY2ggaW5kaWNhdGVzIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGUgYXBwbGljYXRpb25cbiAqL1xuZXhwb3J0IGNvbnN0IFBBQ0tBR0VfUk9PVF9VUkw6IE9wYXF1ZVRva2VuID1cbiAgICBDT05TVF9FWFBSKG5ldyBPcGFxdWVUb2tlbihcIkFwcGxpY2F0aW9uIFBhY2thZ2VzIFJvb3QgVVJMXCIpKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
