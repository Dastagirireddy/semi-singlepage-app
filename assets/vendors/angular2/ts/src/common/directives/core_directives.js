System.register(['angular2/src/facade/lang', './ng_class', './ng_for', './ng_if', './ng_template_outlet', './ng_style', './ng_switch', './ng_plural'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, ng_class_1, ng_for_1, ng_if_1, ng_template_outlet_1, ng_style_1, ng_switch_1, ng_plural_1;
    var CORE_DIRECTIVES;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (ng_class_1_1) {
                ng_class_1 = ng_class_1_1;
            },
            function (ng_for_1_1) {
                ng_for_1 = ng_for_1_1;
            },
            function (ng_if_1_1) {
                ng_if_1 = ng_if_1_1;
            },
            function (ng_template_outlet_1_1) {
                ng_template_outlet_1 = ng_template_outlet_1_1;
            },
            function (ng_style_1_1) {
                ng_style_1 = ng_style_1_1;
            },
            function (ng_switch_1_1) {
                ng_switch_1 = ng_switch_1_1;
            },
            function (ng_plural_1_1) {
                ng_plural_1 = ng_plural_1_1;
            }],
        execute: function() {
            /**
             * A collection of Angular core directives that are likely to be used in each and every Angular
             * application.
             *
             * This collection can be used to quickly enumerate all the built-in directives in the `directives`
             * property of the `@Component` annotation.
             *
             * ### Example ([live demo](http://plnkr.co/edit/yakGwpCdUkg0qfzX5m8g?p=preview))
             *
             * Instead of writing:
             *
             * ```typescript
             * import {NgClass, NgIf, NgFor, NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/common';
             * import {OtherDirective} from './myDirectives';
             *
             * @Component({
             *   selector: 'my-component',
             *   templateUrl: 'myComponent.html',
             *   directives: [NgClass, NgIf, NgFor, NgSwitch, NgSwitchWhen, NgSwitchDefault, OtherDirective]
             * })
             * export class MyComponent {
             *   ...
             * }
             * ```
             * one could import all the core directives at once:
             *
             * ```typescript
             * import {CORE_DIRECTIVES} from 'angular2/common';
             * import {OtherDirective} from './myDirectives';
             *
             * @Component({
             *   selector: 'my-component',
             *   templateUrl: 'myComponent.html',
             *   directives: [CORE_DIRECTIVES, OtherDirective]
             * })
             * export class MyComponent {
             *   ...
             * }
             * ```
             */
            exports_1("CORE_DIRECTIVES", CORE_DIRECTIVES = lang_1.CONST_EXPR([
                ng_class_1.NgClass,
                ng_for_1.NgFor,
                ng_if_1.NgIf,
                ng_template_outlet_1.NgTemplateOutlet,
                ng_style_1.NgStyle,
                ng_switch_1.NgSwitch,
                ng_switch_1.NgSwitchWhen,
                ng_switch_1.NgSwitchDefault,
                ng_plural_1.NgPlural,
                ng_plural_1.NgPluralCase
            ]));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZGlyZWN0aXZlcy9jb3JlX2RpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQWlEYSxlQUFlOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBeEM1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBdUNHO1lBQ1UsNkJBQUEsZUFBZSxHQUFXLGlCQUFVLENBQUM7Z0JBQ2hELGtCQUFPO2dCQUNQLGNBQUs7Z0JBQ0wsWUFBSTtnQkFDSixxQ0FBZ0I7Z0JBQ2hCLGtCQUFPO2dCQUNQLG9CQUFRO2dCQUNSLHdCQUFZO2dCQUNaLDJCQUFlO2dCQUNmLG9CQUFRO2dCQUNSLHdCQUFZO2FBQ2IsQ0FBQyxDQUFBLENBQUMiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9kaXJlY3RpdmVzL2NvcmVfZGlyZWN0aXZlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q09OU1RfRVhQUiwgVHlwZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7TmdDbGFzc30gZnJvbSAnLi9uZ19jbGFzcyc7XG5pbXBvcnQge05nRm9yfSBmcm9tICcuL25nX2Zvcic7XG5pbXBvcnQge05nSWZ9IGZyb20gJy4vbmdfaWYnO1xuaW1wb3J0IHtOZ1RlbXBsYXRlT3V0bGV0fSBmcm9tICcuL25nX3RlbXBsYXRlX291dGxldCc7XG5pbXBvcnQge05nU3R5bGV9IGZyb20gJy4vbmdfc3R5bGUnO1xuaW1wb3J0IHtOZ1N3aXRjaCwgTmdTd2l0Y2hXaGVuLCBOZ1N3aXRjaERlZmF1bHR9IGZyb20gJy4vbmdfc3dpdGNoJztcbmltcG9ydCB7TmdQbHVyYWwsIE5nUGx1cmFsQ2FzZX0gZnJvbSAnLi9uZ19wbHVyYWwnO1xuXG4vKipcbiAqIEEgY29sbGVjdGlvbiBvZiBBbmd1bGFyIGNvcmUgZGlyZWN0aXZlcyB0aGF0IGFyZSBsaWtlbHkgdG8gYmUgdXNlZCBpbiBlYWNoIGFuZCBldmVyeSBBbmd1bGFyXG4gKiBhcHBsaWNhdGlvbi5cbiAqXG4gKiBUaGlzIGNvbGxlY3Rpb24gY2FuIGJlIHVzZWQgdG8gcXVpY2tseSBlbnVtZXJhdGUgYWxsIHRoZSBidWlsdC1pbiBkaXJlY3RpdmVzIGluIHRoZSBgZGlyZWN0aXZlc2BcbiAqIHByb3BlcnR5IG9mIHRoZSBgQENvbXBvbmVudGAgYW5ub3RhdGlvbi5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQveWFrR3dwQ2RVa2cwcWZ6WDVtOGc/cD1wcmV2aWV3KSlcbiAqXG4gKiBJbnN0ZWFkIG9mIHdyaXRpbmc6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHtOZ0NsYXNzLCBOZ0lmLCBOZ0ZvciwgTmdTd2l0Y2gsIE5nU3dpdGNoV2hlbiwgTmdTd2l0Y2hEZWZhdWx0fSBmcm9tICdhbmd1bGFyMi9jb21tb24nO1xuICogaW1wb3J0IHtPdGhlckRpcmVjdGl2ZX0gZnJvbSAnLi9teURpcmVjdGl2ZXMnO1xuICpcbiAqIEBDb21wb25lbnQoe1xuICogICBzZWxlY3RvcjogJ215LWNvbXBvbmVudCcsXG4gKiAgIHRlbXBsYXRlVXJsOiAnbXlDb21wb25lbnQuaHRtbCcsXG4gKiAgIGRpcmVjdGl2ZXM6IFtOZ0NsYXNzLCBOZ0lmLCBOZ0ZvciwgTmdTd2l0Y2gsIE5nU3dpdGNoV2hlbiwgTmdTd2l0Y2hEZWZhdWx0LCBPdGhlckRpcmVjdGl2ZV1cbiAqIH0pXG4gKiBleHBvcnQgY2xhc3MgTXlDb21wb25lbnQge1xuICogICAuLi5cbiAqIH1cbiAqIGBgYFxuICogb25lIGNvdWxkIGltcG9ydCBhbGwgdGhlIGNvcmUgZGlyZWN0aXZlcyBhdCBvbmNlOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7Q09SRV9ESVJFQ1RJVkVTfSBmcm9tICdhbmd1bGFyMi9jb21tb24nO1xuICogaW1wb3J0IHtPdGhlckRpcmVjdGl2ZX0gZnJvbSAnLi9teURpcmVjdGl2ZXMnO1xuICpcbiAqIEBDb21wb25lbnQoe1xuICogICBzZWxlY3RvcjogJ215LWNvbXBvbmVudCcsXG4gKiAgIHRlbXBsYXRlVXJsOiAnbXlDb21wb25lbnQuaHRtbCcsXG4gKiAgIGRpcmVjdGl2ZXM6IFtDT1JFX0RJUkVDVElWRVMsIE90aGVyRGlyZWN0aXZlXVxuICogfSlcbiAqIGV4cG9ydCBjbGFzcyBNeUNvbXBvbmVudCB7XG4gKiAgIC4uLlxuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBjb25zdCBDT1JFX0RJUkVDVElWRVM6IFR5cGVbXSA9IENPTlNUX0VYUFIoW1xuICBOZ0NsYXNzLFxuICBOZ0ZvcixcbiAgTmdJZixcbiAgTmdUZW1wbGF0ZU91dGxldCxcbiAgTmdTdHlsZSxcbiAgTmdTd2l0Y2gsXG4gIE5nU3dpdGNoV2hlbixcbiAgTmdTd2l0Y2hEZWZhdWx0LFxuICBOZ1BsdXJhbCxcbiAgTmdQbHVyYWxDYXNlXG5dKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
