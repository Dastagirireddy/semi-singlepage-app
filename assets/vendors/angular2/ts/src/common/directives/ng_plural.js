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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZGlyZWN0aXZlcy9uZ19wbHVyYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztRQWNNLGlCQUFpQjs7Ozs7Ozs7Ozs7Ozs7OztZQUFqQixpQkFBaUIsR0FBRyxPQUFPLENBQUM7WUFFbEM7Z0JBQUE7Z0JBQXVGLENBQUM7Z0JBQUQscUJBQUM7WUFBRCxDQUF2RixBQUF3RixJQUFBO1lBQXhGLDJDQUF3RixDQUFBO1lBRXhGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFzREc7WUFHSDtnQkFHRSxzQkFBOEMsS0FBYSxFQUFFLFFBQXFCLEVBQ3RFLGFBQStCO29CQURHLFVBQUssR0FBTCxLQUFLLENBQVE7b0JBRXpELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxzQkFBVSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDdkQsQ0FBQztnQkFQSDtvQkFBQyxnQkFBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFDLENBQUM7K0JBSXpCLGdCQUFTLENBQUMsY0FBYyxDQUFDOztnQ0FKQTtnQkFReEMsbUJBQUM7WUFBRCxDQVBBLEFBT0MsSUFBQTtZQVBELHVDQU9DLENBQUE7WUFJRDtnQkFNRSxrQkFBb0IsYUFBNkI7b0JBQTdCLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtvQkFIekMsZUFBVSxHQUFHLElBQUksZ0JBQUcsRUFBbUIsQ0FBQztvQkFDakIsVUFBSyxHQUE0QixJQUFJLENBQUM7Z0JBRWpCLENBQUM7Z0JBR3JELHNCQUFJLDhCQUFRO3lCQUFaLFVBQWEsS0FBYTt3QkFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7d0JBQzFCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDckIsQ0FBQzs7O21CQUFBO2dCQUVELHFDQUFrQixHQUFsQjtvQkFBQSxpQkFL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Yy9jb21tb24vZGlyZWN0aXZlcy9uZ19wbHVyYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFRlbXBsYXRlUmVmLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIFF1ZXJ5TGlzdCxcbiAgQXR0cmlidXRlLFxuICBBZnRlckNvbnRlbnRJbml0LFxuICBJbnB1dFxufSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7aXNQcmVzZW50LCBOdW1iZXJXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtNYXB9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge1N3aXRjaFZpZXd9IGZyb20gJy4vbmdfc3dpdGNoJztcblxuY29uc3QgX0NBVEVHT1JZX0RFRkFVTFQgPSAnb3RoZXInO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTmdMb2NhbGl6YXRpb24geyBhYnN0cmFjdCBnZXRQbHVyYWxDYXRlZ29yeSh2YWx1ZTogYW55KTogc3RyaW5nOyB9XG5cbi8qKlxuICogYG5nUGx1cmFsYCBpcyBhbiBpMThuIGRpcmVjdGl2ZSB0aGF0IGRpc3BsYXlzIERPTSBzdWItdHJlZXMgdGhhdCBtYXRjaCB0aGUgc3dpdGNoIGV4cHJlc3Npb25cbiAqIHZhbHVlLCBvciBmYWlsaW5nIHRoYXQsIERPTSBzdWItdHJlZXMgdGhhdCBtYXRjaCB0aGUgc3dpdGNoIGV4cHJlc3Npb24ncyBwbHVyYWxpemF0aW9uIGNhdGVnb3J5LlxuICpcbiAqIFRvIHVzZSB0aGlzIGRpcmVjdGl2ZSwgeW91IG11c3QgcHJvdmlkZSBhbiBleHRlbnNpb24gb2YgYE5nTG9jYWxpemF0aW9uYCB0aGF0IG1hcHMgdmFsdWVzIHRvXG4gKiBjYXRlZ29yeSBuYW1lcy4gWW91IHRoZW4gZGVmaW5lIGEgY29udGFpbmVyIGVsZW1lbnQgdGhhdCBzZXRzIHRoZSBgW25nUGx1cmFsXWAgYXR0cmlidXRlIHRvIGFcbiAqIHN3aXRjaCBleHByZXNzaW9uLlxuICogICAgLSBJbm5lciBlbGVtZW50cyBkZWZpbmVkIHdpdGggYW4gYFtuZ1BsdXJhbENhc2VdYCBhdHRyaWJ1dGUgd2lsbCBkaXNwbGF5IGJhc2VkIG9uIHRoZWlyXG4gKiBleHByZXNzaW9uLlxuICogICAgLSBJZiBgW25nUGx1cmFsQ2FzZV1gIGlzIHNldCB0byBhIHZhbHVlIHN0YXJ0aW5nIHdpdGggYD1gLCBpdCB3aWxsIG9ubHkgZGlzcGxheSBpZiB0aGUgdmFsdWVcbiAqIG1hdGNoZXMgdGhlIHN3aXRjaCBleHByZXNzaW9uIGV4YWN0bHkuXG4gKiAgICAtIE90aGVyd2lzZSwgdGhlIHZpZXcgd2lsbCBiZSB0cmVhdGVkIGFzIGEgXCJjYXRlZ29yeSBtYXRjaFwiLCBhbmQgd2lsbCBvbmx5IGRpc3BsYXkgaWYgZXhhY3RcbiAqIHZhbHVlIG1hdGNoZXMgYXJlbid0IGZvdW5kIGFuZCB0aGUgdmFsdWUgbWFwcyB0byBpdHMgY2F0ZWdvcnkgdXNpbmcgdGhlIGBnZXRQbHVyYWxDYXRlZ29yeWBcbiAqIGZ1bmN0aW9uIHByb3ZpZGVkLlxuICpcbiAqIElmIG5vIG1hdGNoaW5nIHZpZXdzIGFyZSBmb3VuZCBmb3IgYSBzd2l0Y2ggZXhwcmVzc2lvbiwgaW5uZXIgZWxlbWVudHMgbWFya2VkXG4gKiBgW25nUGx1cmFsQ2FzZV09XCJvdGhlclwiYCB3aWxsIGJlIGRpc3BsYXllZC5cbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjbGFzcyBNeUxvY2FsaXphdGlvbiBleHRlbmRzIE5nTG9jYWxpemF0aW9uIHtcbiAqICAgIGdldFBsdXJhbENhdGVnb3J5KHZhbHVlOiBhbnkpIHtcbiAqICAgICAgIGlmKHZhbHVlIDwgNSkge1xuICogICAgICAgICAgcmV0dXJuICdmZXcnO1xuICogICAgICAgfVxuICogICAgfVxuICogfVxuICpcbiAqIEBDb21wb25lbnQoe1xuICogICAgc2VsZWN0b3I6ICdhcHAnLFxuICogICAgcHJvdmlkZXJzOiBbcHJvdmlkZShOZ0xvY2FsaXphdGlvbiwge3VzZUNsYXNzOiBNeUxvY2FsaXphdGlvbn0pXVxuICogfSlcbiAqIEBWaWV3KHtcbiAqICAgdGVtcGxhdGU6IGBcbiAqICAgICA8cD5WYWx1ZSA9IHt7dmFsdWV9fTwvcD5cbiAqICAgICA8YnV0dG9uIChjbGljayk9XCJpbmMoKVwiPkluY3JlbWVudDwvYnV0dG9uPlxuICpcbiAqICAgICA8ZGl2IFtuZ1BsdXJhbF09XCJ2YWx1ZVwiPlxuICogICAgICAgPHRlbXBsYXRlIG5nUGx1cmFsQ2FzZT1cIj0wXCI+dGhlcmUgaXMgbm90aGluZzwvdGVtcGxhdGU+XG4gKiAgICAgICA8dGVtcGxhdGUgbmdQbHVyYWxDYXNlPVwiPTFcIj50aGVyZSBpcyBvbmU8L3RlbXBsYXRlPlxuICogICAgICAgPHRlbXBsYXRlIG5nUGx1cmFsQ2FzZT1cImZld1wiPnRoZXJlIGFyZSBhIGZldzwvdGVtcGxhdGU+XG4gKiAgICAgICA8dGVtcGxhdGUgbmdQbHVyYWxDYXNlPVwib3RoZXJcIj50aGVyZSBpcyBzb21lIG51bWJlcjwvdGVtcGxhdGU+XG4gKiAgICAgPC9kaXY+XG4gKiAgIGAsXG4gKiAgIGRpcmVjdGl2ZXM6IFtOZ1BsdXJhbCwgTmdQbHVyYWxDYXNlXVxuICogfSlcbiAqIGV4cG9ydCBjbGFzcyBBcHAge1xuICogICB2YWx1ZSA9ICdpbml0JztcbiAqXG4gKiAgIGluYygpIHtcbiAqICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZSA9PT0gJ2luaXQnID8gMCA6IHRoaXMudmFsdWUgKyAxO1xuICogICB9XG4gKiB9XG4gKlxuICogYGBgXG4gKi9cblxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmdQbHVyYWxDYXNlXSd9KVxuZXhwb3J0IGNsYXNzIE5nUGx1cmFsQ2FzZSB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3ZpZXc6IFN3aXRjaFZpZXc7XG4gIGNvbnN0cnVjdG9yKEBBdHRyaWJ1dGUoJ25nUGx1cmFsQ2FzZScpIHB1YmxpYyB2YWx1ZTogc3RyaW5nLCB0ZW1wbGF0ZTogVGVtcGxhdGVSZWYsXG4gICAgICAgICAgICAgIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICB0aGlzLl92aWV3ID0gbmV3IFN3aXRjaFZpZXcodmlld0NvbnRhaW5lciwgdGVtcGxhdGUpO1xuICB9XG59XG5cblxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmdQbHVyYWxdJ30pXG5leHBvcnQgY2xhc3MgTmdQbHVyYWwgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgcHJpdmF0ZSBfc3dpdGNoVmFsdWU6IG51bWJlcjtcbiAgcHJpdmF0ZSBfYWN0aXZlVmlldzogU3dpdGNoVmlldztcbiAgcHJpdmF0ZSBfY2FzZVZpZXdzID0gbmV3IE1hcDxhbnksIFN3aXRjaFZpZXc+KCk7XG4gIEBDb250ZW50Q2hpbGRyZW4oTmdQbHVyYWxDYXNlKSBjYXNlczogUXVlcnlMaXN0PE5nUGx1cmFsQ2FzZT4gPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2xvY2FsaXphdGlvbjogTmdMb2NhbGl6YXRpb24pIHt9XG5cbiAgQElucHV0KClcbiAgc2V0IG5nUGx1cmFsKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9zd2l0Y2hWYWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX3VwZGF0ZVZpZXcoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLmNhc2VzLmZvckVhY2goKHBsdXJhbENhc2U6IE5nUGx1cmFsQ2FzZSk6IHZvaWQgPT4ge1xuICAgICAgdGhpcy5fY2FzZVZpZXdzLnNldCh0aGlzLl9mb3JtYXRWYWx1ZShwbHVyYWxDYXNlKSwgcGx1cmFsQ2FzZS5fdmlldyk7XG4gICAgfSk7XG4gICAgdGhpcy5fdXBkYXRlVmlldygpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfdXBkYXRlVmlldygpOiB2b2lkIHtcbiAgICB0aGlzLl9jbGVhclZpZXdzKCk7XG5cbiAgICB2YXIgdmlldzogU3dpdGNoVmlldyA9IHRoaXMuX2Nhc2VWaWV3cy5nZXQodGhpcy5fc3dpdGNoVmFsdWUpO1xuICAgIGlmICghaXNQcmVzZW50KHZpZXcpKSB2aWV3ID0gdGhpcy5fZ2V0Q2F0ZWdvcnlWaWV3KHRoaXMuX3N3aXRjaFZhbHVlKTtcblxuICAgIHRoaXMuX2FjdGl2YXRlVmlldyh2aWV3KTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NsZWFyVmlld3MoKSB7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl9hY3RpdmVWaWV3KSkgdGhpcy5fYWN0aXZlVmlldy5kZXN0cm95KCk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9hY3RpdmF0ZVZpZXcodmlldzogU3dpdGNoVmlldykge1xuICAgIGlmICghaXNQcmVzZW50KHZpZXcpKSByZXR1cm47XG4gICAgdGhpcy5fYWN0aXZlVmlldyA9IHZpZXc7XG4gICAgdGhpcy5fYWN0aXZlVmlldy5jcmVhdGUoKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2dldENhdGVnb3J5Vmlldyh2YWx1ZTogbnVtYmVyKTogU3dpdGNoVmlldyB7XG4gICAgdmFyIGNhdGVnb3J5OiBzdHJpbmcgPSB0aGlzLl9sb2NhbGl6YXRpb24uZ2V0UGx1cmFsQ2F0ZWdvcnkodmFsdWUpO1xuICAgIHZhciBjYXRlZ29yeVZpZXc6IFN3aXRjaFZpZXcgPSB0aGlzLl9jYXNlVmlld3MuZ2V0KGNhdGVnb3J5KTtcbiAgICByZXR1cm4gaXNQcmVzZW50KGNhdGVnb3J5VmlldykgPyBjYXRlZ29yeVZpZXcgOiB0aGlzLl9jYXNlVmlld3MuZ2V0KF9DQVRFR09SWV9ERUZBVUxUKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2lzVmFsdWVWaWV3KHBsdXJhbENhc2U6IE5nUGx1cmFsQ2FzZSk6IGJvb2xlYW4geyByZXR1cm4gcGx1cmFsQ2FzZS52YWx1ZVswXSA9PT0gXCI9XCI7IH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9mb3JtYXRWYWx1ZShwbHVyYWxDYXNlOiBOZ1BsdXJhbENhc2UpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9pc1ZhbHVlVmlldyhwbHVyYWxDYXNlKSA/IHRoaXMuX3N0cmlwVmFsdWUocGx1cmFsQ2FzZS52YWx1ZSkgOiBwbHVyYWxDYXNlLnZhbHVlO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc3RyaXBWYWx1ZSh2YWx1ZTogc3RyaW5nKTogbnVtYmVyIHsgcmV0dXJuIE51bWJlcldyYXBwZXIucGFyc2VJbnQodmFsdWUuc3Vic3RyaW5nKDEpLCAxMCk7IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
