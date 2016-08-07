System.register(['angular2/src/facade/lang', './forms', './directives'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, forms_1, directives_1;
    var COMMON_DIRECTIVES;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (directives_1_1) {
                directives_1 = directives_1_1;
            }],
        execute: function() {
            /**
             * A collection of Angular core directives that are likely to be used in each and every Angular
             * application. This includes core directives (e.g., NgIf and NgFor), and forms directives (e.g.,
             * NgModel).
             *
             * This collection can be used to quickly enumerate all the built-in directives in the `directives`
             * property of the `@Component` decorator.
             *
             * ### Example
             *
             * Instead of writing:
             *
             * ```typescript
             * import {NgClass, NgIf, NgFor, NgSwitch, NgSwitchWhen, NgSwitchDefault, NgModel, NgForm} from
             * 'angular2/common';
             * import {OtherDirective} from './myDirectives';
             *
             * @Component({
             *   selector: 'my-component',
             *   templateUrl: 'myComponent.html',
             *   directives: [NgClass, NgIf, NgFor, NgSwitch, NgSwitchWhen, NgSwitchDefault, NgModel, NgForm,
             * OtherDirective]
             * })
             * export class MyComponent {
             *   ...
             * }
             * ```
             * one could import all the common directives at once:
             *
             * ```typescript
             * import {COMMON_DIRECTIVES} from 'angular2/common';
             * import {OtherDirective} from './myDirectives';
             *
             * @Component({
             *   selector: 'my-component',
             *   templateUrl: 'myComponent.html',
             *   directives: [COMMON_DIRECTIVES, OtherDirective]
             * })
             * export class MyComponent {
             *   ...
             * }
             * ```
             */
            exports_1("COMMON_DIRECTIVES", COMMON_DIRECTIVES = lang_1.CONST_EXPR([directives_1.CORE_DIRECTIVES, forms_1.FORM_DIRECTIVES]));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vY29tbW9uX2RpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQWdEYSxpQkFBaUI7Ozs7Ozs7Ozs7Ozs7WUEzQzlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUEwQ0c7WUFDVSwrQkFBQSxpQkFBaUIsR0FBYSxpQkFBVSxDQUFDLENBQUMsNEJBQWUsRUFBRSx1QkFBZSxDQUFDLENBQUMsQ0FBQSxDQUFDIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vY29tbW9uX2RpcmVjdGl2ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NPTlNUX0VYUFIsIFR5cGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbmltcG9ydCB7Rk9STV9ESVJFQ1RJVkVTfSBmcm9tICcuL2Zvcm1zJztcbmltcG9ydCB7Q09SRV9ESVJFQ1RJVkVTfSBmcm9tICcuL2RpcmVjdGl2ZXMnO1xuXG4vKipcbiAqIEEgY29sbGVjdGlvbiBvZiBBbmd1bGFyIGNvcmUgZGlyZWN0aXZlcyB0aGF0IGFyZSBsaWtlbHkgdG8gYmUgdXNlZCBpbiBlYWNoIGFuZCBldmVyeSBBbmd1bGFyXG4gKiBhcHBsaWNhdGlvbi4gVGhpcyBpbmNsdWRlcyBjb3JlIGRpcmVjdGl2ZXMgKGUuZy4sIE5nSWYgYW5kIE5nRm9yKSwgYW5kIGZvcm1zIGRpcmVjdGl2ZXMgKGUuZy4sXG4gKiBOZ01vZGVsKS5cbiAqXG4gKiBUaGlzIGNvbGxlY3Rpb24gY2FuIGJlIHVzZWQgdG8gcXVpY2tseSBlbnVtZXJhdGUgYWxsIHRoZSBidWlsdC1pbiBkaXJlY3RpdmVzIGluIHRoZSBgZGlyZWN0aXZlc2BcbiAqIHByb3BlcnR5IG9mIHRoZSBgQENvbXBvbmVudGAgZGVjb3JhdG9yLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogSW5zdGVhZCBvZiB3cml0aW5nOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7TmdDbGFzcywgTmdJZiwgTmdGb3IsIE5nU3dpdGNoLCBOZ1N3aXRjaFdoZW4sIE5nU3dpdGNoRGVmYXVsdCwgTmdNb2RlbCwgTmdGb3JtfSBmcm9tXG4gKiAnYW5ndWxhcjIvY29tbW9uJztcbiAqIGltcG9ydCB7T3RoZXJEaXJlY3RpdmV9IGZyb20gJy4vbXlEaXJlY3RpdmVzJztcbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICAgc2VsZWN0b3I6ICdteS1jb21wb25lbnQnLFxuICogICB0ZW1wbGF0ZVVybDogJ215Q29tcG9uZW50Lmh0bWwnLFxuICogICBkaXJlY3RpdmVzOiBbTmdDbGFzcywgTmdJZiwgTmdGb3IsIE5nU3dpdGNoLCBOZ1N3aXRjaFdoZW4sIE5nU3dpdGNoRGVmYXVsdCwgTmdNb2RlbCwgTmdGb3JtLFxuICogT3RoZXJEaXJlY3RpdmVdXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIE15Q29tcG9uZW50IHtcbiAqICAgLi4uXG4gKiB9XG4gKiBgYGBcbiAqIG9uZSBjb3VsZCBpbXBvcnQgYWxsIHRoZSBjb21tb24gZGlyZWN0aXZlcyBhdCBvbmNlOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7Q09NTU9OX0RJUkVDVElWRVN9IGZyb20gJ2FuZ3VsYXIyL2NvbW1vbic7XG4gKiBpbXBvcnQge090aGVyRGlyZWN0aXZlfSBmcm9tICcuL215RGlyZWN0aXZlcyc7XG4gKlxuICogQENvbXBvbmVudCh7XG4gKiAgIHNlbGVjdG9yOiAnbXktY29tcG9uZW50JyxcbiAqICAgdGVtcGxhdGVVcmw6ICdteUNvbXBvbmVudC5odG1sJyxcbiAqICAgZGlyZWN0aXZlczogW0NPTU1PTl9ESVJFQ1RJVkVTLCBPdGhlckRpcmVjdGl2ZV1cbiAqIH0pXG4gKiBleHBvcnQgY2xhc3MgTXlDb21wb25lbnQge1xuICogICAuLi5cbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgY29uc3QgQ09NTU9OX0RJUkVDVElWRVM6IFR5cGVbXVtdID0gQ09OU1RfRVhQUihbQ09SRV9ESVJFQ1RJVkVTLCBGT1JNX0RJUkVDVElWRVNdKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
