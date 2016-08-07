System.register(['angular2/core', 'angular2/src/facade/lang', 'angular2/src/facade/collection'], function(exports_1, context_1) {
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
    var core_1, lang_1, collection_1;
    var _WHEN_DEFAULT, SwitchView, NgSwitch, NgSwitchWhen, NgSwitchDefault;
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
            }],
        execute: function() {
            _WHEN_DEFAULT = lang_1.CONST_EXPR(new Object());
            SwitchView = (function () {
                function SwitchView(_viewContainerRef, _templateRef) {
                    this._viewContainerRef = _viewContainerRef;
                    this._templateRef = _templateRef;
                }
                SwitchView.prototype.create = function () { this._viewContainerRef.createEmbeddedView(this._templateRef); };
                SwitchView.prototype.destroy = function () { this._viewContainerRef.clear(); };
                return SwitchView;
            }());
            exports_1("SwitchView", SwitchView);
            /**
             * Adds or removes DOM sub-trees when their match expressions match the switch expression.
             *
             * Elements within `NgSwitch` but without `NgSwitchWhen` or `NgSwitchDefault` directives will be
             * preserved at the location as specified in the template.
             *
             * `NgSwitch` simply inserts nested elements based on which match expression matches the value
             * obtained from the evaluated switch expression. In other words, you define a container element
             * (where you place the directive with a switch expression on the
             * `[ngSwitch]="..."` attribute), define any inner elements inside of the directive and
             * place a `[ngSwitchWhen]` attribute per element.
             *
             * The `ngSwitchWhen` property is used to inform `NgSwitch` which element to display when the
             * expression is evaluated. If a matching expression is not found via a `ngSwitchWhen` property
             * then an element with the `ngSwitchDefault` attribute is displayed.
             *
             * ### Example ([live demo](http://plnkr.co/edit/DQMTII95CbuqWrl3lYAs?p=preview))
             *
             * ```typescript
             * @Component({
             *   selector: 'app',
             *   template: `
             *     <p>Value = {{value}}</p>
             *     <button (click)="inc()">Increment</button>
             *
             *     <div [ngSwitch]="value">
             *       <p *ngSwitchWhen="'init'">increment to start</p>
             *       <p *ngSwitchWhen="0">0, increment again</p>
             *       <p *ngSwitchWhen="1">1, increment again</p>
             *       <p *ngSwitchWhen="2">2, stop incrementing</p>
             *       <p *ngSwitchDefault>&gt; 2, STOP!</p>
             *     </div>
             *
             *     <!-- alternate syntax -->
             *
             *     <p [ngSwitch]="value">
             *       <template ngSwitchWhen="init">increment to start</template>
             *       <template [ngSwitchWhen]="0">0, increment again</template>
             *       <template [ngSwitchWhen]="1">1, increment again</template>
             *       <template [ngSwitchWhen]="2">2, stop incrementing</template>
             *       <template ngSwitchDefault>&gt; 2, STOP!</template>
             *     </p>
             *   `,
             *   directives: [NgSwitch, NgSwitchWhen, NgSwitchDefault]
             * })
             * export class App {
             *   value = 'init';
             *
             *   inc() {
             *     this.value = this.value === 'init' ? 0 : this.value + 1;
             *   }
             * }
             *
             * bootstrap(App).catch(err => console.error(err));
             * ```
             */
            NgSwitch = (function () {
                function NgSwitch() {
                    this._useDefault = false;
                    this._valueViews = new collection_1.Map();
                    this._activeViews = [];
                }
                Object.defineProperty(NgSwitch.prototype, "ngSwitch", {
                    set: function (value) {
                        // Empty the currently active ViewContainers
                        this._emptyAllActiveViews();
                        // Add the ViewContainers matching the value (with a fallback to default)
                        this._useDefault = false;
                        var views = this._valueViews.get(value);
                        if (lang_1.isBlank(views)) {
                            this._useDefault = true;
                            views = lang_1.normalizeBlank(this._valueViews.get(_WHEN_DEFAULT));
                        }
                        this._activateViews(views);
                        this._switchValue = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                /** @internal */
                NgSwitch.prototype._onWhenValueChanged = function (oldWhen, newWhen, view) {
                    this._deregisterView(oldWhen, view);
                    this._registerView(newWhen, view);
                    if (oldWhen === this._switchValue) {
                        view.destroy();
                        collection_1.ListWrapper.remove(this._activeViews, view);
                    }
                    else if (newWhen === this._switchValue) {
                        if (this._useDefault) {
                            this._useDefault = false;
                            this._emptyAllActiveViews();
                        }
                        view.create();
                        this._activeViews.push(view);
                    }
                    // Switch to default when there is no more active ViewContainers
                    if (this._activeViews.length === 0 && !this._useDefault) {
                        this._useDefault = true;
                        this._activateViews(this._valueViews.get(_WHEN_DEFAULT));
                    }
                };
                /** @internal */
                NgSwitch.prototype._emptyAllActiveViews = function () {
                    var activeContainers = this._activeViews;
                    for (var i = 0; i < activeContainers.length; i++) {
                        activeContainers[i].destroy();
                    }
                    this._activeViews = [];
                };
                /** @internal */
                NgSwitch.prototype._activateViews = function (views) {
                    // TODO(vicb): assert(this._activeViews.length === 0);
                    if (lang_1.isPresent(views)) {
                        for (var i = 0; i < views.length; i++) {
                            views[i].create();
                        }
                        this._activeViews = views;
                    }
                };
                /** @internal */
                NgSwitch.prototype._registerView = function (value, view) {
                    var views = this._valueViews.get(value);
                    if (lang_1.isBlank(views)) {
                        views = [];
                        this._valueViews.set(value, views);
                    }
                    views.push(view);
                };
                /** @internal */
                NgSwitch.prototype._deregisterView = function (value, view) {
                    // `_WHEN_DEFAULT` is used a marker for non-registered whens
                    if (value === _WHEN_DEFAULT)
                        return;
                    var views = this._valueViews.get(value);
                    if (views.length == 1) {
                        this._valueViews.delete(value);
                    }
                    else {
                        collection_1.ListWrapper.remove(views, view);
                    }
                };
                NgSwitch = __decorate([
                    core_1.Directive({ selector: '[ngSwitch]', inputs: ['ngSwitch'] }), 
                    __metadata('design:paramtypes', [])
                ], NgSwitch);
                return NgSwitch;
            }());
            exports_1("NgSwitch", NgSwitch);
            /**
             * Insert the sub-tree when the `ngSwitchWhen` expression evaluates to the same value as the
             * enclosing switch expression.
             *
             * If multiple match expression match the switch expression value, all of them are displayed.
             *
             * See {@link NgSwitch} for more details and example.
             */
            NgSwitchWhen = (function () {
                function NgSwitchWhen(viewContainer, templateRef, ngSwitch) {
                    // `_WHEN_DEFAULT` is used as a marker for a not yet initialized value
                    /** @internal */
                    this._value = _WHEN_DEFAULT;
                    this._switch = ngSwitch;
                    this._view = new SwitchView(viewContainer, templateRef);
                }
                Object.defineProperty(NgSwitchWhen.prototype, "ngSwitchWhen", {
                    set: function (value) {
                        this._switch._onWhenValueChanged(this._value, value, this._view);
                        this._value = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                NgSwitchWhen = __decorate([
                    core_1.Directive({ selector: '[ngSwitchWhen]', inputs: ['ngSwitchWhen'] }),
                    __param(2, core_1.Host()), 
                    __metadata('design:paramtypes', [core_1.ViewContainerRef, core_1.TemplateRef, NgSwitch])
                ], NgSwitchWhen);
                return NgSwitchWhen;
            }());
            exports_1("NgSwitchWhen", NgSwitchWhen);
            /**
             * Default case statements are displayed when no match expression matches the switch expression
             * value.
             *
             * See {@link NgSwitch} for more details and example.
             */
            NgSwitchDefault = (function () {
                function NgSwitchDefault(viewContainer, templateRef, sswitch) {
                    sswitch._registerView(_WHEN_DEFAULT, new SwitchView(viewContainer, templateRef));
                }
                NgSwitchDefault = __decorate([
                    core_1.Directive({ selector: '[ngSwitchDefault]' }),
                    __param(2, core_1.Host()), 
                    __metadata('design:paramtypes', [core_1.ViewContainerRef, core_1.TemplateRef, NgSwitch])
                ], NgSwitchDefault);
                return NgSwitchDefault;
            }());
            exports_1("NgSwitchDefault", NgSwitchDefault);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vZGlyZWN0aXZlcy9uZ19zd2l0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztRQUlNLGFBQWE7Ozs7Ozs7Ozs7Ozs7WUFBYixhQUFhLEdBQUcsaUJBQVUsQ0FBQyxJQUFJLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFFL0M7Z0JBQ0Usb0JBQW9CLGlCQUFtQyxFQUFVLFlBQXlCO29CQUF0RSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO29CQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFhO2dCQUFHLENBQUM7Z0JBRTlGLDJCQUFNLEdBQU4sY0FBaUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRWhGLDRCQUFPLEdBQVAsY0FBa0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDckQsaUJBQUM7WUFBRCxDQU5BLEFBTUMsSUFBQTtZQU5ELG1DQU1DLENBQUE7WUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQXVERztZQUVIO2dCQUFBO29CQUVVLGdCQUFXLEdBQVksS0FBSyxDQUFDO29CQUM3QixnQkFBVyxHQUFHLElBQUksZ0JBQUcsRUFBcUIsQ0FBQztvQkFDM0MsaUJBQVksR0FBaUIsRUFBRSxDQUFDO2dCQW1GMUMsQ0FBQztnQkFqRkMsc0JBQUksOEJBQVE7eUJBQVosVUFBYSxLQUFVO3dCQUNyQiw0Q0FBNEM7d0JBQzVDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO3dCQUU1Qix5RUFBeUU7d0JBQ3pFLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO3dCQUN6QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENB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bmdfc3dpdGNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEhvc3QsIFZpZXdDb250YWluZXJSZWYsIFRlbXBsYXRlUmVmfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7aXNQcmVzZW50LCBpc0JsYW5rLCBub3JtYWxpemVCbGFuaywgQ09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7TGlzdFdyYXBwZXIsIE1hcH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcblxuY29uc3QgX1dIRU5fREVGQVVMVCA9IENPTlNUX0VYUFIobmV3IE9iamVjdCgpKTtcblxuZXhwb3J0IGNsYXNzIFN3aXRjaFZpZXcge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIF90ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWYpIHt9XG5cbiAgY3JlYXRlKCk6IHZvaWQgeyB0aGlzLl92aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLl90ZW1wbGF0ZVJlZik7IH1cblxuICBkZXN0cm95KCk6IHZvaWQgeyB0aGlzLl92aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7IH1cbn1cblxuLyoqXG4gKiBBZGRzIG9yIHJlbW92ZXMgRE9NIHN1Yi10cmVlcyB3aGVuIHRoZWlyIG1hdGNoIGV4cHJlc3Npb25zIG1hdGNoIHRoZSBzd2l0Y2ggZXhwcmVzc2lvbi5cbiAqXG4gKiBFbGVtZW50cyB3aXRoaW4gYE5nU3dpdGNoYCBidXQgd2l0aG91dCBgTmdTd2l0Y2hXaGVuYCBvciBgTmdTd2l0Y2hEZWZhdWx0YCBkaXJlY3RpdmVzIHdpbGwgYmVcbiAqIHByZXNlcnZlZCBhdCB0aGUgbG9jYXRpb24gYXMgc3BlY2lmaWVkIGluIHRoZSB0ZW1wbGF0ZS5cbiAqXG4gKiBgTmdTd2l0Y2hgIHNpbXBseSBpbnNlcnRzIG5lc3RlZCBlbGVtZW50cyBiYXNlZCBvbiB3aGljaCBtYXRjaCBleHByZXNzaW9uIG1hdGNoZXMgdGhlIHZhbHVlXG4gKiBvYnRhaW5lZCBmcm9tIHRoZSBldmFsdWF0ZWQgc3dpdGNoIGV4cHJlc3Npb24uIEluIG90aGVyIHdvcmRzLCB5b3UgZGVmaW5lIGEgY29udGFpbmVyIGVsZW1lbnRcbiAqICh3aGVyZSB5b3UgcGxhY2UgdGhlIGRpcmVjdGl2ZSB3aXRoIGEgc3dpdGNoIGV4cHJlc3Npb24gb24gdGhlXG4gKiBgW25nU3dpdGNoXT1cIi4uLlwiYCBhdHRyaWJ1dGUpLCBkZWZpbmUgYW55IGlubmVyIGVsZW1lbnRzIGluc2lkZSBvZiB0aGUgZGlyZWN0aXZlIGFuZFxuICogcGxhY2UgYSBgW25nU3dpdGNoV2hlbl1gIGF0dHJpYnV0ZSBwZXIgZWxlbWVudC5cbiAqXG4gKiBUaGUgYG5nU3dpdGNoV2hlbmAgcHJvcGVydHkgaXMgdXNlZCB0byBpbmZvcm0gYE5nU3dpdGNoYCB3aGljaCBlbGVtZW50IHRvIGRpc3BsYXkgd2hlbiB0aGVcbiAqIGV4cHJlc3Npb24gaXMgZXZhbHVhdGVkLiBJZiBhIG1hdGNoaW5nIGV4cHJlc3Npb24gaXMgbm90IGZvdW5kIHZpYSBhIGBuZ1N3aXRjaFdoZW5gIHByb3BlcnR5XG4gKiB0aGVuIGFuIGVsZW1lbnQgd2l0aCB0aGUgYG5nU3dpdGNoRGVmYXVsdGAgYXR0cmlidXRlIGlzIGRpc3BsYXllZC5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvRFFNVElJOTVDYnVxV3JsM2xZQXM/cD1wcmV2aWV3KSlcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBAQ29tcG9uZW50KHtcbiAqICAgc2VsZWN0b3I6ICdhcHAnLFxuICogICB0ZW1wbGF0ZTogYFxuICogICAgIDxwPlZhbHVlID0ge3t2YWx1ZX19PC9wPlxuICogICAgIDxidXR0b24gKGNsaWNrKT1cImluYygpXCI+SW5jcmVtZW50PC9idXR0b24+XG4gKlxuICogICAgIDxkaXYgW25nU3dpdGNoXT1cInZhbHVlXCI+XG4gKiAgICAgICA8cCAqbmdTd2l0Y2hXaGVuPVwiJ2luaXQnXCI+aW5jcmVtZW50IHRvIHN0YXJ0PC9wPlxuICogICAgICAgPHAgKm5nU3dpdGNoV2hlbj1cIjBcIj4wLCBpbmNyZW1lbnQgYWdhaW48L3A+XG4gKiAgICAgICA8cCAqbmdTd2l0Y2hXaGVuPVwiMVwiPjEsIGluY3JlbWVudCBhZ2FpbjwvcD5cbiAqICAgICAgIDxwICpuZ1N3aXRjaFdoZW49XCIyXCI+Miwgc3RvcCBpbmNyZW1lbnRpbmc8L3A+XG4gKiAgICAgICA8cCAqbmdTd2l0Y2hEZWZhdWx0PiZndDsgMiwgU1RPUCE8L3A+XG4gKiAgICAgPC9kaXY+XG4gKlxuICogICAgIDwhLS0gYWx0ZXJuYXRlIHN5bnRheCAtLT5cbiAqXG4gKiAgICAgPHAgW25nU3dpdGNoXT1cInZhbHVlXCI+XG4gKiAgICAgICA8dGVtcGxhdGUgbmdTd2l0Y2hXaGVuPVwiaW5pdFwiPmluY3JlbWVudCB0byBzdGFydDwvdGVtcGxhdGU+XG4gKiAgICAgICA8dGVtcGxhdGUgW25nU3dpdGNoV2hlbl09XCIwXCI+MCwgaW5jcmVtZW50IGFnYWluPC90ZW1wbGF0ZT5cbiAqICAgICAgIDx0ZW1wbGF0ZSBbbmdTd2l0Y2hXaGVuXT1cIjFcIj4xLCBpbmNyZW1lbnQgYWdhaW48L3RlbXBsYXRlPlxuICogICAgICAgPHRlbXBsYXRlIFtuZ1N3aXRjaFdoZW5dPVwiMlwiPjIsIHN0b3AgaW5jcmVtZW50aW5nPC90ZW1wbGF0ZT5cbiAqICAgICAgIDx0ZW1wbGF0ZSBuZ1N3aXRjaERlZmF1bHQ+Jmd0OyAyLCBTVE9QITwvdGVtcGxhdGU+XG4gKiAgICAgPC9wPlxuICogICBgLFxuICogICBkaXJlY3RpdmVzOiBbTmdTd2l0Y2gsIE5nU3dpdGNoV2hlbiwgTmdTd2l0Y2hEZWZhdWx0XVxuICogfSlcbiAqIGV4cG9ydCBjbGFzcyBBcHAge1xuICogICB2YWx1ZSA9ICdpbml0JztcbiAqXG4gKiAgIGluYygpIHtcbiAqICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZSA9PT0gJ2luaXQnID8gMCA6IHRoaXMudmFsdWUgKyAxO1xuICogICB9XG4gKiB9XG4gKlxuICogYm9vdHN0cmFwKEFwcCkuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoZXJyKSk7XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmdTd2l0Y2hdJywgaW5wdXRzOiBbJ25nU3dpdGNoJ119KVxuZXhwb3J0IGNsYXNzIE5nU3dpdGNoIHtcbiAgcHJpdmF0ZSBfc3dpdGNoVmFsdWU6IGFueTtcbiAgcHJpdmF0ZSBfdXNlRGVmYXVsdDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF92YWx1ZVZpZXdzID0gbmV3IE1hcDxhbnksIFN3aXRjaFZpZXdbXT4oKTtcbiAgcHJpdmF0ZSBfYWN0aXZlVmlld3M6IFN3aXRjaFZpZXdbXSA9IFtdO1xuXG4gIHNldCBuZ1N3aXRjaCh2YWx1ZTogYW55KSB7XG4gICAgLy8gRW1wdHkgdGhlIGN1cnJlbnRseSBhY3RpdmUgVmlld0NvbnRhaW5lcnNcbiAgICB0aGlzLl9lbXB0eUFsbEFjdGl2ZVZpZXdzKCk7XG5cbiAgICAvLyBBZGQgdGhlIFZpZXdDb250YWluZXJzIG1hdGNoaW5nIHRoZSB2YWx1ZSAod2l0aCBhIGZhbGxiYWNrIHRvIGRlZmF1bHQpXG4gICAgdGhpcy5fdXNlRGVmYXVsdCA9IGZhbHNlO1xuICAgIHZhciB2aWV3cyA9IHRoaXMuX3ZhbHVlVmlld3MuZ2V0KHZhbHVlKTtcbiAgICBpZiAoaXNCbGFuayh2aWV3cykpIHtcbiAgICAgIHRoaXMuX3VzZURlZmF1bHQgPSB0cnVlO1xuICAgICAgdmlld3MgPSBub3JtYWxpemVCbGFuayh0aGlzLl92YWx1ZVZpZXdzLmdldChfV0hFTl9ERUZBVUxUKSk7XG4gICAgfVxuICAgIHRoaXMuX2FjdGl2YXRlVmlld3Modmlld3MpO1xuXG4gICAgdGhpcy5fc3dpdGNoVmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX29uV2hlblZhbHVlQ2hhbmdlZChvbGRXaGVuOiBhbnksIG5ld1doZW46IGFueSwgdmlldzogU3dpdGNoVmlldyk6IHZvaWQge1xuICAgIHRoaXMuX2RlcmVnaXN0ZXJWaWV3KG9sZFdoZW4sIHZpZXcpO1xuICAgIHRoaXMuX3JlZ2lzdGVyVmlldyhuZXdXaGVuLCB2aWV3KTtcblxuICAgIGlmIChvbGRXaGVuID09PSB0aGlzLl9zd2l0Y2hWYWx1ZSkge1xuICAgICAgdmlldy5kZXN0cm95KCk7XG4gICAgICBMaXN0V3JhcHBlci5yZW1vdmUodGhpcy5fYWN0aXZlVmlld3MsIHZpZXcpO1xuICAgIH0gZWxzZSBpZiAobmV3V2hlbiA9PT0gdGhpcy5fc3dpdGNoVmFsdWUpIHtcbiAgICAgIGlmICh0aGlzLl91c2VEZWZhdWx0KSB7XG4gICAgICAgIHRoaXMuX3VzZURlZmF1bHQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZW1wdHlBbGxBY3RpdmVWaWV3cygpO1xuICAgICAgfVxuICAgICAgdmlldy5jcmVhdGUoKTtcbiAgICAgIHRoaXMuX2FjdGl2ZVZpZXdzLnB1c2godmlldyk7XG4gICAgfVxuXG4gICAgLy8gU3dpdGNoIHRvIGRlZmF1bHQgd2hlbiB0aGVyZSBpcyBubyBtb3JlIGFjdGl2ZSBWaWV3Q29udGFpbmVyc1xuICAgIGlmICh0aGlzLl9hY3RpdmVWaWV3cy5sZW5ndGggPT09IDAgJiYgIXRoaXMuX3VzZURlZmF1bHQpIHtcbiAgICAgIHRoaXMuX3VzZURlZmF1bHQgPSB0cnVlO1xuICAgICAgdGhpcy5fYWN0aXZhdGVWaWV3cyh0aGlzLl92YWx1ZVZpZXdzLmdldChfV0hFTl9ERUZBVUxUKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZW1wdHlBbGxBY3RpdmVWaWV3cygpOiB2b2lkIHtcbiAgICB2YXIgYWN0aXZlQ29udGFpbmVycyA9IHRoaXMuX2FjdGl2ZVZpZXdzO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWN0aXZlQ29udGFpbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgYWN0aXZlQ29udGFpbmVyc1tpXS5kZXN0cm95KCk7XG4gICAgfVxuICAgIHRoaXMuX2FjdGl2ZVZpZXdzID0gW107XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9hY3RpdmF0ZVZpZXdzKHZpZXdzOiBTd2l0Y2hWaWV3W10pOiB2b2lkIHtcbiAgICAvLyBUT0RPKHZpY2IpOiBhc3NlcnQodGhpcy5fYWN0aXZlVmlld3MubGVuZ3RoID09PSAwKTtcbiAgICBpZiAoaXNQcmVzZW50KHZpZXdzKSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2aWV3cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2aWV3c1tpXS5jcmVhdGUoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2FjdGl2ZVZpZXdzID0gdmlld3M7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcmVnaXN0ZXJWaWV3KHZhbHVlOiBhbnksIHZpZXc6IFN3aXRjaFZpZXcpOiB2b2lkIHtcbiAgICB2YXIgdmlld3MgPSB0aGlzLl92YWx1ZVZpZXdzLmdldCh2YWx1ZSk7XG4gICAgaWYgKGlzQmxhbmsodmlld3MpKSB7XG4gICAgICB2aWV3cyA9IFtdO1xuICAgICAgdGhpcy5fdmFsdWVWaWV3cy5zZXQodmFsdWUsIHZpZXdzKTtcbiAgICB9XG4gICAgdmlld3MucHVzaCh2aWV3KTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2RlcmVnaXN0ZXJWaWV3KHZhbHVlOiBhbnksIHZpZXc6IFN3aXRjaFZpZXcpOiB2b2lkIHtcbiAgICAvLyBgX1dIRU5fREVGQVVMVGAgaXMgdXNlZCBhIG1hcmtlciBmb3Igbm9uLXJlZ2lzdGVyZWQgd2hlbnNcbiAgICBpZiAodmFsdWUgPT09IF9XSEVOX0RFRkFVTFQpIHJldHVybjtcbiAgICB2YXIgdmlld3MgPSB0aGlzLl92YWx1ZVZpZXdzLmdldCh2YWx1ZSk7XG4gICAgaWYgKHZpZXdzLmxlbmd0aCA9PSAxKSB7XG4gICAgICB0aGlzLl92YWx1ZVZpZXdzLmRlbGV0ZSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIExpc3RXcmFwcGVyLnJlbW92ZSh2aWV3cywgdmlldyk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogSW5zZXJ0IHRoZSBzdWItdHJlZSB3aGVuIHRoZSBgbmdTd2l0Y2hXaGVuYCBleHByZXNzaW9uIGV2YWx1YXRlcyB0byB0aGUgc2FtZSB2YWx1ZSBhcyB0aGVcbiAqIGVuY2xvc2luZyBzd2l0Y2ggZXhwcmVzc2lvbi5cbiAqXG4gKiBJZiBtdWx0aXBsZSBtYXRjaCBleHByZXNzaW9uIG1hdGNoIHRoZSBzd2l0Y2ggZXhwcmVzc2lvbiB2YWx1ZSwgYWxsIG9mIHRoZW0gYXJlIGRpc3BsYXllZC5cbiAqXG4gKiBTZWUge0BsaW5rIE5nU3dpdGNofSBmb3IgbW9yZSBkZXRhaWxzIGFuZCBleGFtcGxlLlxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1tuZ1N3aXRjaFdoZW5dJywgaW5wdXRzOiBbJ25nU3dpdGNoV2hlbiddfSlcbmV4cG9ydCBjbGFzcyBOZ1N3aXRjaFdoZW4ge1xuICAvLyBgX1dIRU5fREVGQVVMVGAgaXMgdXNlZCBhcyBhIG1hcmtlciBmb3IgYSBub3QgeWV0IGluaXRpYWxpemVkIHZhbHVlXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3ZhbHVlOiBhbnkgPSBfV0hFTl9ERUZBVUxUO1xuICAvKiogQGludGVybmFsICovXG4gIF92aWV3OiBTd2l0Y2hWaWV3O1xuICBwcml2YXRlIF9zd2l0Y2g6IE5nU3dpdGNoO1xuXG4gIGNvbnN0cnVjdG9yKHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZixcbiAgICAgICAgICAgICAgQEhvc3QoKSBuZ1N3aXRjaDogTmdTd2l0Y2gpIHtcbiAgICB0aGlzLl9zd2l0Y2ggPSBuZ1N3aXRjaDtcbiAgICB0aGlzLl92aWV3ID0gbmV3IFN3aXRjaFZpZXcodmlld0NvbnRhaW5lciwgdGVtcGxhdGVSZWYpO1xuICB9XG5cbiAgc2V0IG5nU3dpdGNoV2hlbih2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fc3dpdGNoLl9vbldoZW5WYWx1ZUNoYW5nZWQodGhpcy5fdmFsdWUsIHZhbHVlLCB0aGlzLl92aWV3KTtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICB9XG59XG5cbi8qKlxuICogRGVmYXVsdCBjYXNlIHN0YXRlbWVudHMgYXJlIGRpc3BsYXllZCB3aGVuIG5vIG1hdGNoIGV4cHJlc3Npb24gbWF0Y2hlcyB0aGUgc3dpdGNoIGV4cHJlc3Npb25cbiAqIHZhbHVlLlxuICpcbiAqIFNlZSB7QGxpbmsgTmdTd2l0Y2h9IGZvciBtb3JlIGRldGFpbHMgYW5kIGV4YW1wbGUuXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25nU3dpdGNoRGVmYXVsdF0nfSlcbmV4cG9ydCBjbGFzcyBOZ1N3aXRjaERlZmF1bHQge1xuICBjb25zdHJ1Y3Rvcih2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLCB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWYsXG4gICAgICAgICAgICAgIEBIb3N0KCkgc3N3aXRjaDogTmdTd2l0Y2gpIHtcbiAgICBzc3dpdGNoLl9yZWdpc3RlclZpZXcoX1dIRU5fREVGQVVMVCwgbmV3IFN3aXRjaFZpZXcodmlld0NvbnRhaW5lciwgdGVtcGxhdGVSZWYpKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
