System.register(['angular2/core', 'angular2/src/facade/lang', 'angular2/src/facade/collection', './ng_switch'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, lang_1, collection_1, ng_switch_1;
    var _CATEGORY_DEFAULT, NgLocalization, NgPluralCase, NgPlural;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (ng_switch_1_1) {
                ng_switch_1 = ng_switch_1_1;
            }],
        execute: function() {
            _CATEGORY_DEFAULT = 'other';
            NgLocalization = (function () {
                function NgLocalization() {
                }
                return NgLocalization;
            }());
            exports_1("NgLocalization", NgLocalization);
            /**
             * `ngPlural` is an i18n directive that displays DOM sub-trees that match the switch expression
             * value, or failing that, DOM sub-trees that match the switch expression's pluralization category.
             *
             * To use this directive, you must provide an extension of `NgLocalization` that maps values to
             * category names. You then define a container element that sets the `[ngPlural]` attribute to a
             * switch expression.
             *    - Inner elements defined with an `[ngPluralCase]` attribute will display based on their
             * expression.
             *    - If `[ngPluralCase]` is set to a value starting with `=`, it will only display if the value
             * matches the switch expression exactly.
             *    - Otherwise, the view will be treated as a "category match", and will only display if exact
             * value matches aren't found and the value maps to its category using the `getPluralCategory`
             * function provided.
             *
             * If no matching views are found for a switch expression, inner elements marked
             * `[ngPluralCase]="other"` will be displayed.
             *
             * ```typescript
             * class MyLocalization extends NgLocalization {
             *    getPluralCategory(value: any) {
             *       if(value < 5) {
             *          return 'few';
             *       }
             *    }
             * }
             *
             * @Component({
             *    selector: 'app',
             *    providers: [provide(NgLocalization, {useClass: MyLocalization})]
             * })
             * @View({
             *   template: `
             *     <p>Value = {{value}}</p>
             *     <button (click)="inc()">Increment</button>
             *
             *     <div [ngPlural]="value">
             *       <template ngPluralCase="=0">there is nothing</template>
             *       <template ngPluralCase="=1">there is one</template>
             *       <template ngPluralCase="few">there are a few</template>
             *       <template ngPluralCase="other">there is some number</template>
             *     </div>
             *   `,
             *   directives: [NgPlural, NgPluralCase]
             * })
             * export class App {
             *   value = 'init';
             *
             *   inc() {
             *     this.value = this.value === 'init' ? 0 : this.value + 1;
             *   }
             * }
             *
             * ```
             */
            NgPluralCase = (function () {
                function NgPluralCase(value, template, viewContainer) {
                    this.value = value;
                    this._view = new ng_switch_1.SwitchView(viewContainer, template);
                }
                NgPluralCase = __decorate([
                    core_1.Directive({ selector: '[ngPluralCase]' }),
                    __param(0, core_1.Attribute('ngPluralCase')), 
                    __metadata('design:paramtypes', [String, core_1.TemplateRef, core_1.ViewContainerRef])
                ], NgPluralCase);
                return NgPluralCase;
            }());
            exports_1("NgPluralCase", NgPluralCase);
            NgPlural = (function () {
                function NgPlural(_localization) {
                    this._localization = _localization;
                    this._caseViews = new collection_1.Map();
                    this.cases = null;
                }
                Object.defineProperty(NgPlural.prototype, "ngPlural", {
                    set: function (value) {
                        this._switchValue = value;
                        this._updateView();
                    },
                    enumerable: true,
                    configurable: true
                });
                NgPlural.prototype.ngAfterContentInit = function () {
                    var _this = this;
                    this.cases.forEach(function (pluralCase) {
                        _this._caseViews.set(_this._formatValue(pluralCase), pluralCase._view);
                    });
                    this._updateView();
                };
                /** @internal */
                NgPlural.prototype._updateView = function () {
                    this._clearViews();
                    var view = this._caseViews.get(this._switchValue);
                    if (!lang_1.isPresent(view))
                        view = this._getCategoryView(this._switchValue);
                    this._activateView(view);
                };
                /** @internal */
                NgPlural.prototype._clearViews = function () {
                    if (lang_1.isPresent(this._activeView))
                        this._activeView.destroy();
                };
                /** @internal */
                NgPlural.prototype._activateView = function (view) {
                    if (!lang_1.isPresent(view))
                        return;
                    this._activeView = view;
                    this._activeView.create();
                };
                /** @internal */
                NgPlural.prototype._getCategoryView = function (value) {
                    var category = this._localization.getPluralCategory(value);
                    var categoryView = this._caseViews.get(category);
                    return lang_1.isPresent(categoryView) ? categoryView : this._caseViews.get(_CATEGORY_DEFAULT);
                };
                /** @internal */
                NgPlural.prototype._isValueView = function (pluralCase) { return pluralCase.value[0] === "="; };
                /** @internal */
                NgPlural.prototype._formatValue = function (pluralCase) {
                    return this._isValueView(pluralCase) ? this._stripValue(pluralCase.value) : pluralCase.value;
                };
                /** @internal */
                NgPlural.prototype._stripValue = function (value) { return lang_1.NumberWrapper.parseInt(value.substring(1), 10); };
                __decorate([
                    core_1.ContentChildren(NgPluralCase), 
                    __metadata('design:type', core_1.QueryList)
                ], NgPlural.prototype, "cases", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number), 
                    __metadata('design:paramtypes', [Number])
                ], NgPlural.prototype, "ngPlural", null);
                NgPlural = __decorate([
                    core_1.Directive({ selector: '[ngPlural]' }), 
                    __metadata('design:paramtypes', [NgLocalization])
                ], NgPlural);
                return NgPlural;
            }());
            exports_1("NgPlural", NgPlural);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9kaXJlY3RpdmVzL25nX3BsdXJhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O1FBY00saUJBQWlCOzs7Ozs7Ozs7Ozs7Ozs7O1lBQWpCLGlCQUFpQixHQUFHLE9BQU8sQ0FBQztZQUVsQztnQkFBQTtnQkFBdUYsQ0FBQztnQkFBRCxxQkFBQztZQUFELENBQXZGLEFBQXdGLElBQUE7WUFBeEYsMkNBQXdGLENBQUE7WUFFeEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQXNERztZQUdIO2dCQUVFLHNCQUE4QyxLQUFhLEVBQUUsUUFBcUIsRUFDdEUsYUFBK0I7b0JBREcsVUFBSyxHQUFMLEtBQUssQ0FBUTtvQkFFekQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLHNCQUFVLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUN2RCxDQUFDO2dCQU5IO29CQUFDLGdCQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUsZ0JBQWdCLEVBQUMsQ0FBQzsrQkFHekIsZ0JBQVMsQ0FBQyxjQUFjLENBQUM7O2dDQUhBO2dCQU94QyxtQkFBQztZQUFELENBTkEsQUFNQyxJQUFBO1lBTkQsdUNBTUMsQ0FBQTtZQUlEO2dCQU1FLGtCQUFvQixhQUE2QjtvQkFBN0Isa0JBQWEsR0FBYixhQUFhLENBQWdCO29CQUh6QyxlQUFVLEdBQUcsSUFBSSxnQkFBRyxFQUFtQixDQUFDO29CQUNqQixVQUFLLEdBQTRCLElBQUksQ0FBQztnQkFFakIsQ0FBQztnQkFHckQsc0JBQUksOEJBQVE7eUJBQVosVUFBYSxLQUFhO3dCQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQzt3QkFDMUIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUNyQixDQUFDOzs7bUJBQUE7Z0JBRUQscUNBQWtCLEdBQWxCO29CQUFB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bGFyMi90cy9zcmMvY29tbW9uL2RpcmVjdGl2ZXMvbmdfcGx1cmFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBUZW1wbGF0ZVJlZixcbiAgQ29udGVudENoaWxkcmVuLFxuICBRdWVyeUxpc3QsXG4gIEF0dHJpYnV0ZSxcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgSW5wdXRcbn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge2lzUHJlc2VudCwgTnVtYmVyV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7TWFwfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtTd2l0Y2hWaWV3fSBmcm9tICcuL25nX3N3aXRjaCc7XG5cbmNvbnN0IF9DQVRFR09SWV9ERUZBVUxUID0gJ290aGVyJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE5nTG9jYWxpemF0aW9uIHsgYWJzdHJhY3QgZ2V0UGx1cmFsQ2F0ZWdvcnkodmFsdWU6IGFueSk6IHN0cmluZzsgfVxuXG4vKipcbiAqIGBuZ1BsdXJhbGAgaXMgYW4gaTE4biBkaXJlY3RpdmUgdGhhdCBkaXNwbGF5cyBET00gc3ViLXRyZWVzIHRoYXQgbWF0Y2ggdGhlIHN3aXRjaCBleHByZXNzaW9uXG4gKiB2YWx1ZSwgb3IgZmFpbGluZyB0aGF0LCBET00gc3ViLXRyZWVzIHRoYXQgbWF0Y2ggdGhlIHN3aXRjaCBleHByZXNzaW9uJ3MgcGx1cmFsaXphdGlvbiBjYXRlZ29yeS5cbiAqXG4gKiBUbyB1c2UgdGhpcyBkaXJlY3RpdmUsIHlvdSBtdXN0IHByb3ZpZGUgYW4gZXh0ZW5zaW9uIG9mIGBOZ0xvY2FsaXphdGlvbmAgdGhhdCBtYXBzIHZhbHVlcyB0b1xuICogY2F0ZWdvcnkgbmFtZXMuIFlvdSB0aGVuIGRlZmluZSBhIGNvbnRhaW5lciBlbGVtZW50IHRoYXQgc2V0cyB0aGUgYFtuZ1BsdXJhbF1gIGF0dHJpYnV0ZSB0byBhXG4gKiBzd2l0Y2ggZXhwcmVzc2lvbi5cbiAqICAgIC0gSW5uZXIgZWxlbWVudHMgZGVmaW5lZCB3aXRoIGFuIGBbbmdQbHVyYWxDYXNlXWAgYXR0cmlidXRlIHdpbGwgZGlzcGxheSBiYXNlZCBvbiB0aGVpclxuICogZXhwcmVzc2lvbi5cbiAqICAgIC0gSWYgYFtuZ1BsdXJhbENhc2VdYCBpcyBzZXQgdG8gYSB2YWx1ZSBzdGFydGluZyB3aXRoIGA9YCwgaXQgd2lsbCBvbmx5IGRpc3BsYXkgaWYgdGhlIHZhbHVlXG4gKiBtYXRjaGVzIHRoZSBzd2l0Y2ggZXhwcmVzc2lvbiBleGFjdGx5LlxuICogICAgLSBPdGhlcndpc2UsIHRoZSB2aWV3IHdpbGwgYmUgdHJlYXRlZCBhcyBhIFwiY2F0ZWdvcnkgbWF0Y2hcIiwgYW5kIHdpbGwgb25seSBkaXNwbGF5IGlmIGV4YWN0XG4gKiB2YWx1ZSBtYXRjaGVzIGFyZW4ndCBmb3VuZCBhbmQgdGhlIHZhbHVlIG1hcHMgdG8gaXRzIGNhdGVnb3J5IHVzaW5nIHRoZSBgZ2V0UGx1cmFsQ2F0ZWdvcnlgXG4gKiBmdW5jdGlvbiBwcm92aWRlZC5cbiAqXG4gKiBJZiBubyBtYXRjaGluZyB2aWV3cyBhcmUgZm91bmQgZm9yIGEgc3dpdGNoIGV4cHJlc3Npb24sIGlubmVyIGVsZW1lbnRzIG1hcmtlZFxuICogYFtuZ1BsdXJhbENhc2VdPVwib3RoZXJcImAgd2lsbCBiZSBkaXNwbGF5ZWQuXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogY2xhc3MgTXlMb2NhbGl6YXRpb24gZXh0ZW5kcyBOZ0xvY2FsaXphdGlvbiB7XG4gKiAgICBnZXRQbHVyYWxDYXRlZ29yeSh2YWx1ZTogYW55KSB7XG4gKiAgICAgICBpZih2YWx1ZSA8IDUpIHtcbiAqICAgICAgICAgIHJldHVybiAnZmV3JztcbiAqICAgICAgIH1cbiAqICAgIH1cbiAqIH1cbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICAgIHNlbGVjdG9yOiAnYXBwJyxcbiAqICAgIHByb3ZpZGVyczogW3Byb3ZpZGUoTmdMb2NhbGl6YXRpb24sIHt1c2VDbGFzczogTXlMb2NhbGl6YXRpb259KV1cbiAqIH0pXG4gKiBAVmlldyh7XG4gKiAgIHRlbXBsYXRlOiBgXG4gKiAgICAgPHA+VmFsdWUgPSB7e3ZhbHVlfX08L3A+XG4gKiAgICAgPGJ1dHRvbiAoY2xpY2spPVwiaW5jKClcIj5JbmNyZW1lbnQ8L2J1dHRvbj5cbiAqXG4gKiAgICAgPGRpdiBbbmdQbHVyYWxdPVwidmFsdWVcIj5cbiAqICAgICAgIDx0ZW1wbGF0ZSBuZ1BsdXJhbENhc2U9XCI9MFwiPnRoZXJlIGlzIG5vdGhpbmc8L3RlbXBsYXRlPlxuICogICAgICAgPHRlbXBsYXRlIG5nUGx1cmFsQ2FzZT1cIj0xXCI+dGhlcmUgaXMgb25lPC90ZW1wbGF0ZT5cbiAqICAgICAgIDx0ZW1wbGF0ZSBuZ1BsdXJhbENhc2U9XCJmZXdcIj50aGVyZSBhcmUgYSBmZXc8L3RlbXBsYXRlPlxuICogICAgICAgPHRlbXBsYXRlIG5nUGx1cmFsQ2FzZT1cIm90aGVyXCI+dGhlcmUgaXMgc29tZSBudW1iZXI8L3RlbXBsYXRlPlxuICogICAgIDwvZGl2PlxuICogICBgLFxuICogICBkaXJlY3RpdmVzOiBbTmdQbHVyYWwsIE5nUGx1cmFsQ2FzZV1cbiAqIH0pXG4gKiBleHBvcnQgY2xhc3MgQXBwIHtcbiAqICAgdmFsdWUgPSAnaW5pdCc7XG4gKlxuICogICBpbmMoKSB7XG4gKiAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWUgPT09ICdpbml0JyA/IDAgOiB0aGlzLnZhbHVlICsgMTtcbiAqICAgfVxuICogfVxuICpcbiAqIGBgYFxuICovXG5cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25nUGx1cmFsQ2FzZV0nfSlcbmV4cG9ydCBjbGFzcyBOZ1BsdXJhbENhc2Uge1xuICBfdmlldzogU3dpdGNoVmlldztcbiAgY29uc3RydWN0b3IoQEF0dHJpYnV0ZSgnbmdQbHVyYWxDYXNlJykgcHVibGljIHZhbHVlOiBzdHJpbmcsIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZixcbiAgICAgICAgICAgICAgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZikge1xuICAgIHRoaXMuX3ZpZXcgPSBuZXcgU3dpdGNoVmlldyh2aWV3Q29udGFpbmVyLCB0ZW1wbGF0ZSk7XG4gIH1cbn1cblxuXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1tuZ1BsdXJhbF0nfSlcbmV4cG9ydCBjbGFzcyBOZ1BsdXJhbCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICBwcml2YXRlIF9zd2l0Y2hWYWx1ZTogbnVtYmVyO1xuICBwcml2YXRlIF9hY3RpdmVWaWV3OiBTd2l0Y2hWaWV3O1xuICBwcml2YXRlIF9jYXNlVmlld3MgPSBuZXcgTWFwPGFueSwgU3dpdGNoVmlldz4oKTtcbiAgQENvbnRlbnRDaGlsZHJlbihOZ1BsdXJhbENhc2UpIGNhc2VzOiBRdWVyeUxpc3Q8TmdQbHVyYWxDYXNlPiA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbG9jYWxpemF0aW9uOiBOZ0xvY2FsaXphdGlvbikge31cblxuICBASW5wdXQoKVxuICBzZXQgbmdQbHVyYWwodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3N3aXRjaFZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5fdXBkYXRlVmlldygpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuY2FzZXMuZm9yRWFjaCgocGx1cmFsQ2FzZTogTmdQbHVyYWxDYXNlKTogdm9pZCA9PiB7XG4gICAgICB0aGlzLl9jYXNlVmlld3Muc2V0KHRoaXMuX2Zvcm1hdFZhbHVlKHBsdXJhbENhc2UpLCBwbHVyYWxDYXNlLl92aWV3KTtcbiAgICB9KTtcbiAgICB0aGlzLl91cGRhdGVWaWV3KCk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF91cGRhdGVWaWV3KCk6IHZvaWQge1xuICAgIHRoaXMuX2NsZWFyVmlld3MoKTtcblxuICAgIHZhciB2aWV3OiBTd2l0Y2hWaWV3ID0gdGhpcy5fY2FzZVZpZXdzLmdldCh0aGlzLl9zd2l0Y2hWYWx1ZSk7XG4gICAgaWYgKCFpc1ByZXNlbnQodmlldykpIHZpZXcgPSB0aGlzLl9nZXRDYXRlZ29yeVZpZXcodGhpcy5fc3dpdGNoVmFsdWUpO1xuXG4gICAgdGhpcy5fYWN0aXZhdGVWaWV3KHZpZXcpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY2xlYXJWaWV3cygpIHtcbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuX2FjdGl2ZVZpZXcpKSB0aGlzLl9hY3RpdmVWaWV3LmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2FjdGl2YXRlVmlldyh2aWV3OiBTd2l0Y2hWaWV3KSB7XG4gICAgaWYgKCFpc1ByZXNlbnQodmlldykpIHJldHVybjtcbiAgICB0aGlzLl9hY3RpdmVWaWV3ID0gdmlldztcbiAgICB0aGlzLl9hY3RpdmVWaWV3LmNyZWF0ZSgpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZ2V0Q2F0ZWdvcnlWaWV3KHZhbHVlOiBudW1iZXIpOiBTd2l0Y2hWaWV3IHtcbiAgICB2YXIgY2F0ZWdvcnk6IHN0cmluZyA9IHRoaXMuX2xvY2FsaXphdGlvbi5nZXRQbHVyYWxDYXRlZ29yeSh2YWx1ZSk7XG4gICAgdmFyIGNhdGVnb3J5VmlldzogU3dpdGNoVmlldyA9IHRoaXMuX2Nhc2VWaWV3cy5nZXQoY2F0ZWdvcnkpO1xuICAgIHJldHVybiBpc1ByZXNlbnQoY2F0ZWdvcnlWaWV3KSA/IGNhdGVnb3J5VmlldyA6IHRoaXMuX2Nhc2VWaWV3cy5nZXQoX0NBVEVHT1JZX0RFRkFVTFQpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfaXNWYWx1ZVZpZXcocGx1cmFsQ2FzZTogTmdQbHVyYWxDYXNlKTogYm9vbGVhbiB7IHJldHVybiBwbHVyYWxDYXNlLnZhbHVlWzBdID09PSBcIj1cIjsgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2Zvcm1hdFZhbHVlKHBsdXJhbENhc2U6IE5nUGx1cmFsQ2FzZSk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzVmFsdWVWaWV3KHBsdXJhbENhc2UpID8gdGhpcy5fc3RyaXBWYWx1ZShwbHVyYWxDYXNlLnZhbHVlKSA6IHBsdXJhbENhc2UudmFsdWU7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9zdHJpcFZhbHVlKHZhbHVlOiBzdHJpbmcpOiBudW1iZXIgeyByZXR1cm4gTnVtYmVyV3JhcHBlci5wYXJzZUludCh2YWx1ZS5zdWJzdHJpbmcoMSksIDEwKTsgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
