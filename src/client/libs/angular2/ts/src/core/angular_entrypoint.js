System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var lang_1;
    var AngularEntrypoint;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * Marks a function or method as an Angular 2 entrypoint. Only necessary in Dart code.
             *
             * The optional `name` parameter will be reflected in logs when the entry point is processed.
             *
             * See [the wiki][] for detailed documentation.
             * [the wiki]: https://github.com/angular/angular/wiki/Angular-2-Dart-Transformer#entry_points
             *
             * ## Example
             *
             * ```
             * @AngularEntrypoint("name-for-debug")
             * void main() {
             *   bootstrap(MyComponent);
             * }
             * ```
             */
            AngularEntrypoint = (function () {
                function AngularEntrypoint(name) {
                    this.name = name;
                }
                AngularEntrypoint = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [String])
                ], AngularEntrypoint);
                return AngularEntrypoint;
            }());
            exports_1("AngularEntrypoint", AngularEntrypoint);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvYW5ndWxhcl9lbnRyeXBvaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFnQkc7WUFFSDtnQkFDRSwyQkFBbUIsSUFBYTtvQkFBYixTQUFJLEdBQUosSUFBSSxDQUFTO2dCQUFHLENBQUM7Z0JBRnRDO29CQUFDLFlBQUssRUFBRTs7cUNBQUE7Z0JBR1Isd0JBQUM7WUFBRCxDQUZBLEFBRUMsSUFBQTtZQUZELGlEQUVDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29yZS9hbmd1bGFyX2VudHJ5cG9pbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NPTlNUfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG4vKipcbiAqIE1hcmtzIGEgZnVuY3Rpb24gb3IgbWV0aG9kIGFzIGFuIEFuZ3VsYXIgMiBlbnRyeXBvaW50LiBPbmx5IG5lY2Vzc2FyeSBpbiBEYXJ0IGNvZGUuXG4gKlxuICogVGhlIG9wdGlvbmFsIGBuYW1lYCBwYXJhbWV0ZXIgd2lsbCBiZSByZWZsZWN0ZWQgaW4gbG9ncyB3aGVuIHRoZSBlbnRyeSBwb2ludCBpcyBwcm9jZXNzZWQuXG4gKlxuICogU2VlIFt0aGUgd2lraV1bXSBmb3IgZGV0YWlsZWQgZG9jdW1lbnRhdGlvbi5cbiAqIFt0aGUgd2lraV06IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvd2lraS9Bbmd1bGFyLTItRGFydC1UcmFuc2Zvcm1lciNlbnRyeV9wb2ludHNcbiAqXG4gKiAjIyBFeGFtcGxlXG4gKlxuICogYGBgXG4gKiBAQW5ndWxhckVudHJ5cG9pbnQoXCJuYW1lLWZvci1kZWJ1Z1wiKVxuICogdm9pZCBtYWluKCkge1xuICogICBib290c3RyYXAoTXlDb21wb25lbnQpO1xuICogfVxuICogYGBgXG4gKi9cbkBDT05TVCgpXG5leHBvcnQgY2xhc3MgQW5ndWxhckVudHJ5cG9pbnQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZT86IFN0cmluZykge31cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
