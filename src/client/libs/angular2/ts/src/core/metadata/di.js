System.register(['angular2/src/facade/lang', 'angular2/src/core/di', 'angular2/src/core/di/metadata'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var lang_1, di_1, metadata_1;
    var AttributeMetadata, QueryMetadata, ContentChildrenMetadata, ContentChildMetadata, ViewQueryMetadata, ViewChildrenMetadata, ViewChildMetadata;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (metadata_1_1) {
                metadata_1 = metadata_1_1;
            }],
        execute: function() {
            /**
             * Specifies that a constant attribute value should be injected.
             *
             * The directive can inject constant string literals of host element attributes.
             *
             * ### Example
             *
             * Suppose we have an `<input>` element and want to know its `type`.
             *
             * ```html
             * <input type="text">
             * ```
             *
             * A decorator can inject string literal `text` like so:
             *
             * {@example core/ts/metadata/metadata.ts region='attributeMetadata'}
             */
            AttributeMetadata = (function (_super) {
                __extends(AttributeMetadata, _super);
                function AttributeMetadata(attributeName) {
                    _super.call(this);
                    this.attributeName = attributeName;
                }
                Object.defineProperty(AttributeMetadata.prototype, "token", {
                    get: function () {
                        // Normally one would default a token to a type of an injected value but here
                        // the type of a variable is "string" and we can't use primitive type as a return value
                        // so we use instance of Attribute instead. This doesn't matter much in practice as arguments
                        // with @Attribute annotation are injected by ElementInjector that doesn't take tokens into
                        // account.
                        return this;
                    },
                    enumerable: true,
                    configurable: true
                });
                AttributeMetadata.prototype.toString = function () { return "@Attribute(" + lang_1.stringify(this.attributeName) + ")"; };
                AttributeMetadata = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [String])
                ], AttributeMetadata);
                return AttributeMetadata;
            }(metadata_1.DependencyMetadata));
            exports_1("AttributeMetadata", AttributeMetadata);
            /**
             * Declares an injectable parameter to be a live list of directives or variable
             * bindings from the content children of a directive.
             *
             * ### Example ([live demo](http://plnkr.co/edit/lY9m8HLy7z06vDoUaSN2?p=preview))
             *
             * Assume that `<tabs>` component would like to get a list its children `<pane>`
             * components as shown in this example:
             *
             * ```html
             * <tabs>
             *   <pane title="Overview">...</pane>
             *   <pane *ngFor="#o of objects" [title]="o.title">{{o.text}}</pane>
             * </tabs>
             * ```
             *
             * The preferred solution is to query for `Pane` directives using this decorator.
             *
             * ```javascript
             * @Component({
             *   selector: 'pane',
             *   inputs: ['title']
             * })
             * class Pane {
             *   title:string;
             * }
             *
             * @Component({
             *  selector: 'tabs',
             *  template: `
             *    <ul>
             *      <li *ngFor="#pane of panes">{{pane.title}}</li>
             *    </ul>
             *    <ng-content></ng-content>
             *  `
             * })
             * class Tabs {
             *   panes: QueryList<Pane>;
             *   constructor(@Query(Pane) panes:QueryList<Pane>) {
              *    this.panes = panes;
              *  }
             * }
             * ```
             *
             * A query can look for variable bindings by passing in a string with desired binding symbol.
             *
             * ### Example ([live demo](http://plnkr.co/edit/sT2j25cH1dURAyBRCKx1?p=preview))
             * ```html
             * <seeker>
             *   <div #findme>...</div>
             * </seeker>
             *
             * @Component({ selector: 'seeker' })
             * class Seeker {
             *   constructor(@Query('findme') elList: QueryList<ElementRef>) {...}
             * }
             * ```
             *
             * In this case the object that is injected depend on the type of the variable
             * binding. It can be an ElementRef, a directive or a component.
             *
             * Passing in a comma separated list of variable bindings will query for all of them.
             *
             * ```html
             * <seeker>
             *   <div #find-me>...</div>
             *   <div #find-me-too>...</div>
             * </seeker>
             *
             *  @Component({
             *   selector: 'seeker'
             * })
             * class Seeker {
             *   constructor(@Query('findMe, findMeToo') elList: QueryList<ElementRef>) {...}
             * }
             * ```
             *
             * Configure whether query looks for direct children or all descendants
             * of the querying element, by using the `descendants` parameter.
             * It is set to `false` by default.
             *
             * ### Example ([live demo](http://plnkr.co/edit/wtGeB977bv7qvA5FTYl9?p=preview))
             * ```html
             * <container #first>
             *   <item>a</item>
             *   <item>b</item>
             *   <container #second>
             *     <item>c</item>
             *   </container>
             * </container>
             * ```
             *
             * When querying for items, the first container will see only `a` and `b` by default,
             * but with `Query(TextDirective, {descendants: true})` it will see `c` too.
             *
             * The queried directives are kept in a depth-first pre-order with respect to their
             * positions in the DOM.
             *
             * Query does not look deep into any subcomponent views.
             *
             * Query is updated as part of the change-detection cycle. Since change detection
             * happens after construction of a directive, QueryList will always be empty when observed in the
             * constructor.
             *
             * The injected object is an unmodifiable live list.
             * See {@link QueryList} for more details.
             */
            QueryMetadata = (function (_super) {
                __extends(QueryMetadata, _super);
                function QueryMetadata(_selector, _a) {
                    var _b = _a === void 0 ? {} : _a, _c = _b.descendants, descendants = _c === void 0 ? false : _c, _d = _b.first, first = _d === void 0 ? false : _d;
                    _super.call(this);
                    this._selector = _selector;
                    this.descendants = descendants;
                    this.first = first;
                }
                Object.defineProperty(QueryMetadata.prototype, "isViewQuery", {
                    /**
                     * always `false` to differentiate it with {@link ViewQueryMetadata}.
                     */
                    get: function () { return false; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(QueryMetadata.prototype, "selector", {
                    /**
                     * what this is querying for.
                     */
                    get: function () { return di_1.resolveForwardRef(this._selector); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(QueryMetadata.prototype, "isVarBindingQuery", {
                    /**
                     * whether this is querying for a variable binding or a directive.
                     */
                    get: function () { return lang_1.isString(this.selector); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(QueryMetadata.prototype, "varBindings", {
                    /**
                     * returns a list of variable bindings this is querying for.
                     * Only applicable if this is a variable bindings query.
                     */
                    get: function () { return this.selector.split(','); },
                    enumerable: true,
                    configurable: true
                });
                QueryMetadata.prototype.toString = function () { return "@Query(" + lang_1.stringify(this.selector) + ")"; };
                QueryMetadata = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [Object, Object])
                ], QueryMetadata);
                return QueryMetadata;
            }(metadata_1.DependencyMetadata));
            exports_1("QueryMetadata", QueryMetadata);
            // TODO: add an example after ContentChildren and ViewChildren are in master
            /**
             * Configures a content query.
             *
             * Content queries are set before the `ngAfterContentInit` callback is called.
             *
             * ### Example
             *
             * ```
             * @Directive({
             *   selector: 'someDir'
             * })
             * class SomeDir {
             *   @ContentChildren(ChildDirective) contentChildren: QueryList<ChildDirective>;
             *
             *   ngAfterContentInit() {
             *     // contentChildren is set
             *   }
             * }
             * ```
             */
            ContentChildrenMetadata = (function (_super) {
                __extends(ContentChildrenMetadata, _super);
                function ContentChildrenMetadata(_selector, _a) {
                    var _b = (_a === void 0 ? {} : _a).descendants, descendants = _b === void 0 ? false : _b;
                    _super.call(this, _selector, { descendants: descendants });
                }
                ContentChildrenMetadata = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [Object, Object])
                ], ContentChildrenMetadata);
                return ContentChildrenMetadata;
            }(QueryMetadata));
            exports_1("ContentChildrenMetadata", ContentChildrenMetadata);
            // TODO: add an example after ContentChild and ViewChild are in master
            /**
             * Configures a content query.
             *
             * Content queries are set before the `ngAfterContentInit` callback is called.
             *
             * ### Example
             *
             * ```
             * @Directive({
             *   selector: 'someDir'
             * })
             * class SomeDir {
             *   @ContentChild(ChildDirective) contentChild;
             *
             *   ngAfterContentInit() {
             *     // contentChild is set
             *   }
             * }
             * ```
             */
            ContentChildMetadata = (function (_super) {
                __extends(ContentChildMetadata, _super);
                function ContentChildMetadata(_selector) {
                    _super.call(this, _selector, { descendants: true, first: true });
                }
                ContentChildMetadata = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [Object])
                ], ContentChildMetadata);
                return ContentChildMetadata;
            }(QueryMetadata));
            exports_1("ContentChildMetadata", ContentChildMetadata);
            /**
             * Similar to {@link QueryMetadata}, but querying the component view, instead of
             * the content children.
             *
             * ### Example ([live demo](http://plnkr.co/edit/eNsFHDf7YjyM6IzKxM1j?p=preview))
             *
             * ```javascript
             * @Component({
             *   ...,
             *   template: `
             *     <item> a </item>
             *     <item> b </item>
             *     <item> c </item>
             *   `
             * })
             * class MyComponent {
             *   shown: boolean;
             *
             *   constructor(private @Query(Item) items:QueryList<Item>) {
             *     items.changes.subscribe(() => console.log(items.length));
             *   }
             * }
             * ```
             *
             * Supports the same querying parameters as {@link QueryMetadata}, except
             * `descendants`. This always queries the whole view.
             *
             * As `shown` is flipped between true and false, items will contain zero of one
             * items.
             *
             * Specifies that a {@link QueryList} should be injected.
             *
             * The injected object is an iterable and observable live list.
             * See {@link QueryList} for more details.
             */
            ViewQueryMetadata = (function (_super) {
                __extends(ViewQueryMetadata, _super);
                function ViewQueryMetadata(_selector, _a) {
                    var _b = _a === void 0 ? {} : _a, _c = _b.descendants, descendants = _c === void 0 ? false : _c, _d = _b.first, first = _d === void 0 ? false : _d;
                    _super.call(this, _selector, { descendants: descendants, first: first });
                }
                Object.defineProperty(ViewQueryMetadata.prototype, "isViewQuery", {
                    /**
                     * always `true` to differentiate it with {@link QueryMetadata}.
                     */
                    get: function () { return true; },
                    enumerable: true,
                    configurable: true
                });
                ViewQueryMetadata.prototype.toString = function () { return "@ViewQuery(" + lang_1.stringify(this.selector) + ")"; };
                ViewQueryMetadata = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [Object, Object])
                ], ViewQueryMetadata);
                return ViewQueryMetadata;
            }(QueryMetadata));
            exports_1("ViewQueryMetadata", ViewQueryMetadata);
            /**
             * Configures a view query.
             *
             * View queries are set before the `ngAfterViewInit` callback is called.
             *
             * ### Example
             *
             * ```
             * @Component({
             *   selector: 'someDir',
             *   templateUrl: 'someTemplate',
             *   directives: [ItemDirective]
             * })
             * class SomeDir {
             *   @ViewChildren(ItemDirective) viewChildren: QueryList<ItemDirective>;
             *
             *   ngAfterViewInit() {
             *     // viewChildren is set
             *   }
             * }
             * ```
             */
            ViewChildrenMetadata = (function (_super) {
                __extends(ViewChildrenMetadata, _super);
                function ViewChildrenMetadata(_selector) {
                    _super.call(this, _selector, { descendants: true });
                }
                ViewChildrenMetadata = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [Object])
                ], ViewChildrenMetadata);
                return ViewChildrenMetadata;
            }(ViewQueryMetadata));
            exports_1("ViewChildrenMetadata", ViewChildrenMetadata);
            /**
             * Configures a view query.
             *
             * View queries are set before the `ngAfterViewInit` callback is called.
             *
             * ### Example
             *
             * ```
             * @Component({
             *   selector: 'someDir',
             *   templateUrl: 'someTemplate',
             *   directives: [ItemDirective]
             * })
             * class SomeDir {
             *   @ViewChild(ItemDirective) viewChild:ItemDirective;
             *
             *   ngAfterViewInit() {
             *     // viewChild is set
             *   }
             * }
             * ```
             */
            ViewChildMetadata = (function (_super) {
                __extends(ViewChildMetadata, _super);
                function ViewChildMetadata(_selector) {
                    _super.call(this, _selector, { descendants: true, first: true });
                }
                ViewChildMetadata = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [Object])
                ], ViewChildMetadata);
                return ViewChildMetadata;
            }(ViewQueryMetadata));
            exports_1("ViewChildMetadata", ViewChildMetadata);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvbWV0YWRhdGEvZGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUlBOzs7Ozs7Ozs7Ozs7Ozs7O2VBZ0JHO1lBRUg7Z0JBQXVDLHFDQUFrQjtnQkFDdkQsMkJBQW1CLGFBQXFCO29CQUFJLGlCQUFPLENBQUM7b0JBQWpDLGtCQUFhLEdBQWIsYUFBYSxDQUFRO2dCQUFhLENBQUM7Z0JBRXRELHNCQUFJLG9DQUFLO3lCQUFUO3dCQUNFLDZFQUE2RTt3QkFDN0UsdUZBQXVGO3dCQUN2Riw2RkFBNkY7d0JBQzdGLDJGQUEyRjt3QkFDM0YsV0FBVzt3QkFDWCxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNkLENBQUM7OzttQkFBQTtnQkFDRCxvQ0FBUSxHQUFSLGNBQXFCLE1BQU0sQ0FBQyxnQkFBYyxnQkFBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBRyxDQUFDLENBQUMsQ0FBQztnQkFaL0U7b0JBQUMsWUFBSyxFQUFFOztxQ0FBQTtnQkFhUix3QkFBQztZQUFELENBWkEsQUFZQyxDQVpzQyw2QkFBa0IsR0FZeEQ7WUFaRCxpREFZQyxDQUFBO1lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUEwR0c7WUFFSDtnQkFBbUMsaUNBQWtCO2dCQVFuRCx1QkFBb0IsU0FBd0IsRUFDaEMsRUFBbUY7d0JBQW5GLDRCQUFtRixFQUFsRixtQkFBbUIsRUFBbkIsd0NBQW1CLEVBQUUsYUFBYSxFQUFiLGtDQUFhO29CQUM3QyxpQkFBTyxDQUFDO29CQUZVLGNBQVMsR0FBVCxTQUFTLENBQWU7b0JBRzFDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO29CQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDckIsQ0FBQztnQkFLRCxzQkFBSSxzQ0FBVztvQkFIZjs7dUJBRUc7eUJBQ0gsY0FBNkIsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFLNUMsc0JBQUksbUNBQVE7b0JBSFo7O3VCQUVHO3lCQUNILGNBQWlCLE1BQU0sQ0FBQyxzQkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBSzVELHNCQUFJLDRDQUFpQjtvQkFIckI7O3VCQUVHO3lCQUNILGNBQW1DLE1BQU0sQ0FBQyxlQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQU1wRSxzQkFBSSxzQ0FBVztvQkFKZjs7O3VCQUdHO3lCQUNILGNBQThCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFFaEUsZ0NBQVEsR0FBUixjQUFxQixNQUFNLENBQUMsWUFBVSxnQkFBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBRyxDQUFDLENBQUMsQ0FBQztnQkFyQ3RFO29CQUFDLFlBQUssRUFBRTs7aUNBQUE7Z0JBc0NSLG9CQUFDO1lBQUQsQ0FyQ0EsQUFxQ0MsQ0FyQ2tDLDZCQUFrQixHQXFDcEQ7WUFyQ0QseUNBcUNDLENBQUE7WUFFRCw0RUFBNEU7WUFDNUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFtQkc7WUFFSDtnQkFBNkMsMkNBQWE7Z0JBQ3hELGlDQUFZLFNBQXdCLEVBQUUsRUFBbUQ7d0JBQWxELDBDQUFtQixFQUFuQix3Q0FBbUI7b0JBQ3hELGtCQUFNLFNBQVMsRUFBRSxFQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUMsQ0FBQyxDQUFDO2dCQUMvQyxDQUFDO2dCQUpIO29CQUFDLFlBQUssRUFBRTs7MkNBQUE7Z0JBS1IsOEJBQUM7WUFBRCxDQUpBLEFBSUMsQ0FKNEMsYUFBYSxHQUl6RDtZQUpELDZEQUlDLENBQUE7WUFFRCxzRUFBc0U7WUFDdEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFtQkc7WUFFSDtnQkFBMEMsd0NBQWE7Z0JBQ3JELDhCQUFZLFNBQXdCO29CQUFJLGtCQUFNLFNBQVMsRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7Z0JBQUMsQ0FBQztnQkFGL0Y7b0JBQUMsWUFBSyxFQUFFOzt3Q0FBQTtnQkFHUiwyQkFBQztZQUFELENBRkEsQUFFQyxDQUZ5QyxhQUFhLEdBRXREO1lBRkQsdURBRUMsQ0FBQTtZQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBa0NHO1lBRUg7Z0JBQXVDLHFDQUFhO2dCQUNsRCwyQkFBWSxTQUF3QixFQUN4QixFQUFtRjt3QkFBbkYsNEJBQW1GLEVBQWxGLG1CQUFtQixFQUFuQix3Q0FBbUIsRUFBRSxhQUFhLEVBQWIsa0NBQWE7b0JBQzdDLGtCQUFNLFNBQVMsRUFBRSxFQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7Z0JBQzdELENBQUM7Z0JBS0Qsc0JBQUksMENBQVc7b0JBSGY7O3VCQUVHO3lCQUNILGNBQW9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBQ2xDLG9DQUFRLEdBQVIsY0FBcUIsTUFBTSxDQUFDLGdCQUFjLGdCQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFHLENBQUMsQ0FBQyxDQUFDO2dCQVgxRTtvQkFBQyxZQUFLLEVBQUU7O3FDQUFBO2dCQVlSLHdCQUFDO1lBQUQsQ0FYQSxBQVdDLENBWHNDLGFBQWEsR0FXbkQ7WUFYRCxpREFXQyxDQUFBO1lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQXFCRztZQUVIO2dCQUEwQyx3Q0FBaUI7Z0JBQ3pELDhCQUFZLFNBQXdCO29CQUFJLGtCQUFNLFNBQVMsRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO2dCQUFDLENBQUM7Z0JBRmxGO29CQUFDLFlBQUssRUFBRTs7d0NBQUE7Z0JBR1IsMkJBQUM7WUFBRCxDQUZBLEFBRUMsQ0FGeUMsaUJBQWlCLEdBRTFEO1lBRkQsdURBRUMsQ0FBQTtZQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFxQkc7WUFFSDtnQkFBdUMscUNBQWlCO2dCQUN0RCwyQkFBWSxTQUF3QjtvQkFBSSxrQkFBTSxTQUFTLEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO2dCQUFDLENBQUM7Z0JBRi9GO29CQUFDLFlBQUssRUFBRTs7cUNBQUE7Z0JBR1Isd0JBQUM7WUFBRCxDQUZBLEFBRUMsQ0FGc0MsaUJBQWlCLEdBRXZEO1lBRkQsaURBRUMsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL21ldGFkYXRhL2RpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDT05TVCwgVHlwZSwgc3RyaW5naWZ5LCBpc1ByZXNlbnQsIGlzU3RyaW5nfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtyZXNvbHZlRm9yd2FyZFJlZn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtEZXBlbmRlbmN5TWV0YWRhdGF9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpL21ldGFkYXRhJztcblxuLyoqXG4gKiBTcGVjaWZpZXMgdGhhdCBhIGNvbnN0YW50IGF0dHJpYnV0ZSB2YWx1ZSBzaG91bGQgYmUgaW5qZWN0ZWQuXG4gKlxuICogVGhlIGRpcmVjdGl2ZSBjYW4gaW5qZWN0IGNvbnN0YW50IHN0cmluZyBsaXRlcmFscyBvZiBob3N0IGVsZW1lbnQgYXR0cmlidXRlcy5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIFN1cHBvc2Ugd2UgaGF2ZSBhbiBgPGlucHV0PmAgZWxlbWVudCBhbmQgd2FudCB0byBrbm93IGl0cyBgdHlwZWAuXG4gKlxuICogYGBgaHRtbFxuICogPGlucHV0IHR5cGU9XCJ0ZXh0XCI+XG4gKiBgYGBcbiAqXG4gKiBBIGRlY29yYXRvciBjYW4gaW5qZWN0IHN0cmluZyBsaXRlcmFsIGB0ZXh0YCBsaWtlIHNvOlxuICpcbiAqIHtAZXhhbXBsZSBjb3JlL3RzL21ldGFkYXRhL21ldGFkYXRhLnRzIHJlZ2lvbj0nYXR0cmlidXRlTWV0YWRhdGEnfVxuICovXG5AQ09OU1QoKVxuZXhwb3J0IGNsYXNzIEF0dHJpYnV0ZU1ldGFkYXRhIGV4dGVuZHMgRGVwZW5kZW5jeU1ldGFkYXRhIHtcbiAgY29uc3RydWN0b3IocHVibGljIGF0dHJpYnV0ZU5hbWU6IHN0cmluZykgeyBzdXBlcigpOyB9XG5cbiAgZ2V0IHRva2VuKCk6IEF0dHJpYnV0ZU1ldGFkYXRhIHtcbiAgICAvLyBOb3JtYWxseSBvbmUgd291bGQgZGVmYXVsdCBhIHRva2VuIHRvIGEgdHlwZSBvZiBhbiBpbmplY3RlZCB2YWx1ZSBidXQgaGVyZVxuICAgIC8vIHRoZSB0eXBlIG9mIGEgdmFyaWFibGUgaXMgXCJzdHJpbmdcIiBhbmQgd2UgY2FuJ3QgdXNlIHByaW1pdGl2ZSB0eXBlIGFzIGEgcmV0dXJuIHZhbHVlXG4gICAgLy8gc28gd2UgdXNlIGluc3RhbmNlIG9mIEF0dHJpYnV0ZSBpbnN0ZWFkLiBUaGlzIGRvZXNuJ3QgbWF0dGVyIG11Y2ggaW4gcHJhY3RpY2UgYXMgYXJndW1lbnRzXG4gICAgLy8gd2l0aCBAQXR0cmlidXRlIGFubm90YXRpb24gYXJlIGluamVjdGVkIGJ5IEVsZW1lbnRJbmplY3RvciB0aGF0IGRvZXNuJ3QgdGFrZSB0b2tlbnMgaW50b1xuICAgIC8vIGFjY291bnQuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIGBAQXR0cmlidXRlKCR7c3RyaW5naWZ5KHRoaXMuYXR0cmlidXRlTmFtZSl9KWA7IH1cbn1cblxuLyoqXG4gKiBEZWNsYXJlcyBhbiBpbmplY3RhYmxlIHBhcmFtZXRlciB0byBiZSBhIGxpdmUgbGlzdCBvZiBkaXJlY3RpdmVzIG9yIHZhcmlhYmxlXG4gKiBiaW5kaW5ncyBmcm9tIHRoZSBjb250ZW50IGNoaWxkcmVuIG9mIGEgZGlyZWN0aXZlLlxuICpcbiAqICMjIyBFeGFtcGxlIChbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC9sWTltOEhMeTd6MDZ2RG9VYVNOMj9wPXByZXZpZXcpKVxuICpcbiAqIEFzc3VtZSB0aGF0IGA8dGFicz5gIGNvbXBvbmVudCB3b3VsZCBsaWtlIHRvIGdldCBhIGxpc3QgaXRzIGNoaWxkcmVuIGA8cGFuZT5gXG4gKiBjb21wb25lbnRzIGFzIHNob3duIGluIHRoaXMgZXhhbXBsZTpcbiAqXG4gKiBgYGBodG1sXG4gKiA8dGFicz5cbiAqICAgPHBhbmUgdGl0bGU9XCJPdmVydmlld1wiPi4uLjwvcGFuZT5cbiAqICAgPHBhbmUgKm5nRm9yPVwiI28gb2Ygb2JqZWN0c1wiIFt0aXRsZV09XCJvLnRpdGxlXCI+e3tvLnRleHR9fTwvcGFuZT5cbiAqIDwvdGFicz5cbiAqIGBgYFxuICpcbiAqIFRoZSBwcmVmZXJyZWQgc29sdXRpb24gaXMgdG8gcXVlcnkgZm9yIGBQYW5lYCBkaXJlY3RpdmVzIHVzaW5nIHRoaXMgZGVjb3JhdG9yLlxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIEBDb21wb25lbnQoe1xuICogICBzZWxlY3RvcjogJ3BhbmUnLFxuICogICBpbnB1dHM6IFsndGl0bGUnXVxuICogfSlcbiAqIGNsYXNzIFBhbmUge1xuICogICB0aXRsZTpzdHJpbmc7XG4gKiB9XG4gKlxuICogQENvbXBvbmVudCh7XG4gKiAgc2VsZWN0b3I6ICd0YWJzJyxcbiAqICB0ZW1wbGF0ZTogYFxuICogICAgPHVsPlxuICogICAgICA8bGkgKm5nRm9yPVwiI3BhbmUgb2YgcGFuZXNcIj57e3BhbmUudGl0bGV9fTwvbGk+XG4gKiAgICA8L3VsPlxuICogICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICogIGBcbiAqIH0pXG4gKiBjbGFzcyBUYWJzIHtcbiAqICAgcGFuZXM6IFF1ZXJ5TGlzdDxQYW5lPjtcbiAqICAgY29uc3RydWN0b3IoQFF1ZXJ5KFBhbmUpIHBhbmVzOlF1ZXJ5TGlzdDxQYW5lPikge1xuICAqICAgIHRoaXMucGFuZXMgPSBwYW5lcztcbiAgKiAgfVxuICogfVxuICogYGBgXG4gKlxuICogQSBxdWVyeSBjYW4gbG9vayBmb3IgdmFyaWFibGUgYmluZGluZ3MgYnkgcGFzc2luZyBpbiBhIHN0cmluZyB3aXRoIGRlc2lyZWQgYmluZGluZyBzeW1ib2wuXG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L3NUMmoyNWNIMWRVUkF5QlJDS3gxP3A9cHJldmlldykpXG4gKiBgYGBodG1sXG4gKiA8c2Vla2VyPlxuICogICA8ZGl2ICNmaW5kbWU+Li4uPC9kaXY+XG4gKiA8L3NlZWtlcj5cbiAqXG4gKiBAQ29tcG9uZW50KHsgc2VsZWN0b3I6ICdzZWVrZXInIH0pXG4gKiBjbGFzcyBTZWVrZXIge1xuICogICBjb25zdHJ1Y3RvcihAUXVlcnkoJ2ZpbmRtZScpIGVsTGlzdDogUXVlcnlMaXN0PEVsZW1lbnRSZWY+KSB7Li4ufVxuICogfVxuICogYGBgXG4gKlxuICogSW4gdGhpcyBjYXNlIHRoZSBvYmplY3QgdGhhdCBpcyBpbmplY3RlZCBkZXBlbmQgb24gdGhlIHR5cGUgb2YgdGhlIHZhcmlhYmxlXG4gKiBiaW5kaW5nLiBJdCBjYW4gYmUgYW4gRWxlbWVudFJlZiwgYSBkaXJlY3RpdmUgb3IgYSBjb21wb25lbnQuXG4gKlxuICogUGFzc2luZyBpbiBhIGNvbW1hIHNlcGFyYXRlZCBsaXN0IG9mIHZhcmlhYmxlIGJpbmRpbmdzIHdpbGwgcXVlcnkgZm9yIGFsbCBvZiB0aGVtLlxuICpcbiAqIGBgYGh0bWxcbiAqIDxzZWVrZXI+XG4gKiAgIDxkaXYgI2ZpbmQtbWU+Li4uPC9kaXY+XG4gKiAgIDxkaXYgI2ZpbmQtbWUtdG9vPi4uLjwvZGl2PlxuICogPC9zZWVrZXI+XG4gKlxuICogIEBDb21wb25lbnQoe1xuICogICBzZWxlY3RvcjogJ3NlZWtlcidcbiAqIH0pXG4gKiBjbGFzcyBTZWVrZXIge1xuICogICBjb25zdHJ1Y3RvcihAUXVlcnkoJ2ZpbmRNZSwgZmluZE1lVG9vJykgZWxMaXN0OiBRdWVyeUxpc3Q8RWxlbWVudFJlZj4pIHsuLi59XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBDb25maWd1cmUgd2hldGhlciBxdWVyeSBsb29rcyBmb3IgZGlyZWN0IGNoaWxkcmVuIG9yIGFsbCBkZXNjZW5kYW50c1xuICogb2YgdGhlIHF1ZXJ5aW5nIGVsZW1lbnQsIGJ5IHVzaW5nIHRoZSBgZGVzY2VuZGFudHNgIHBhcmFtZXRlci5cbiAqIEl0IGlzIHNldCB0byBgZmFsc2VgIGJ5IGRlZmF1bHQuXG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L3d0R2VCOTc3YnY3cXZBNUZUWWw5P3A9cHJldmlldykpXG4gKiBgYGBodG1sXG4gKiA8Y29udGFpbmVyICNmaXJzdD5cbiAqICAgPGl0ZW0+YTwvaXRlbT5cbiAqICAgPGl0ZW0+YjwvaXRlbT5cbiAqICAgPGNvbnRhaW5lciAjc2Vjb25kPlxuICogICAgIDxpdGVtPmM8L2l0ZW0+XG4gKiAgIDwvY29udGFpbmVyPlxuICogPC9jb250YWluZXI+XG4gKiBgYGBcbiAqXG4gKiBXaGVuIHF1ZXJ5aW5nIGZvciBpdGVtcywgdGhlIGZpcnN0IGNvbnRhaW5lciB3aWxsIHNlZSBvbmx5IGBhYCBhbmQgYGJgIGJ5IGRlZmF1bHQsXG4gKiBidXQgd2l0aCBgUXVlcnkoVGV4dERpcmVjdGl2ZSwge2Rlc2NlbmRhbnRzOiB0cnVlfSlgIGl0IHdpbGwgc2VlIGBjYCB0b28uXG4gKlxuICogVGhlIHF1ZXJpZWQgZGlyZWN0aXZlcyBhcmUga2VwdCBpbiBhIGRlcHRoLWZpcnN0IHByZS1vcmRlciB3aXRoIHJlc3BlY3QgdG8gdGhlaXJcbiAqIHBvc2l0aW9ucyBpbiB0aGUgRE9NLlxuICpcbiAqIFF1ZXJ5IGRvZXMgbm90IGxvb2sgZGVlcCBpbnRvIGFueSBzdWJjb21wb25lbnQgdmlld3MuXG4gKlxuICogUXVlcnkgaXMgdXBkYXRlZCBhcyBwYXJ0IG9mIHRoZSBjaGFuZ2UtZGV0ZWN0aW9uIGN5Y2xlLiBTaW5jZSBjaGFuZ2UgZGV0ZWN0aW9uXG4gKiBoYXBwZW5zIGFmdGVyIGNvbnN0cnVjdGlvbiBvZiBhIGRpcmVjdGl2ZSwgUXVlcnlMaXN0IHdpbGwgYWx3YXlzIGJlIGVtcHR5IHdoZW4gb2JzZXJ2ZWQgaW4gdGhlXG4gKiBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBUaGUgaW5qZWN0ZWQgb2JqZWN0IGlzIGFuIHVubW9kaWZpYWJsZSBsaXZlIGxpc3QuXG4gKiBTZWUge0BsaW5rIFF1ZXJ5TGlzdH0gZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xuQENPTlNUKClcbmV4cG9ydCBjbGFzcyBRdWVyeU1ldGFkYXRhIGV4dGVuZHMgRGVwZW5kZW5jeU1ldGFkYXRhIHtcbiAgLyoqXG4gICAqIHdoZXRoZXIgd2Ugd2FudCB0byBxdWVyeSBvbmx5IGRpcmVjdCBjaGlsZHJlbiAoZmFsc2UpIG9yIGFsbFxuICAgKiBjaGlsZHJlbiAodHJ1ZSkuXG4gICAqL1xuICBkZXNjZW5kYW50czogYm9vbGVhbjtcbiAgZmlyc3Q6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VsZWN0b3I6IFR5cGUgfCBzdHJpbmcsXG4gICAgICAgICAgICAgIHtkZXNjZW5kYW50cyA9IGZhbHNlLCBmaXJzdCA9IGZhbHNlfToge2Rlc2NlbmRhbnRzPzogYm9vbGVhbiwgZmlyc3Q/OiBib29sZWFufSA9IHt9KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmRlc2NlbmRhbnRzID0gZGVzY2VuZGFudHM7XG4gICAgdGhpcy5maXJzdCA9IGZpcnN0O1xuICB9XG5cbiAgLyoqXG4gICAqIGFsd2F5cyBgZmFsc2VgIHRvIGRpZmZlcmVudGlhdGUgaXQgd2l0aCB7QGxpbmsgVmlld1F1ZXJ5TWV0YWRhdGF9LlxuICAgKi9cbiAgZ2V0IGlzVmlld1F1ZXJ5KCk6IGJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cblxuICAvKipcbiAgICogd2hhdCB0aGlzIGlzIHF1ZXJ5aW5nIGZvci5cbiAgICovXG4gIGdldCBzZWxlY3RvcigpIHsgcmV0dXJuIHJlc29sdmVGb3J3YXJkUmVmKHRoaXMuX3NlbGVjdG9yKTsgfVxuXG4gIC8qKlxuICAgKiB3aGV0aGVyIHRoaXMgaXMgcXVlcnlpbmcgZm9yIGEgdmFyaWFibGUgYmluZGluZyBvciBhIGRpcmVjdGl2ZS5cbiAgICovXG4gIGdldCBpc1ZhckJpbmRpbmdRdWVyeSgpOiBib29sZWFuIHsgcmV0dXJuIGlzU3RyaW5nKHRoaXMuc2VsZWN0b3IpOyB9XG5cbiAgLyoqXG4gICAqIHJldHVybnMgYSBsaXN0IG9mIHZhcmlhYmxlIGJpbmRpbmdzIHRoaXMgaXMgcXVlcnlpbmcgZm9yLlxuICAgKiBPbmx5IGFwcGxpY2FibGUgaWYgdGhpcyBpcyBhIHZhcmlhYmxlIGJpbmRpbmdzIHF1ZXJ5LlxuICAgKi9cbiAgZ2V0IHZhckJpbmRpbmdzKCk6IHN0cmluZ1tdIHsgcmV0dXJuIHRoaXMuc2VsZWN0b3Iuc3BsaXQoJywnKTsgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiBgQFF1ZXJ5KCR7c3RyaW5naWZ5KHRoaXMuc2VsZWN0b3IpfSlgOyB9XG59XG5cbi8vIFRPRE86IGFkZCBhbiBleGFtcGxlIGFmdGVyIENvbnRlbnRDaGlsZHJlbiBhbmQgVmlld0NoaWxkcmVuIGFyZSBpbiBtYXN0ZXJcbi8qKlxuICogQ29uZmlndXJlcyBhIGNvbnRlbnQgcXVlcnkuXG4gKlxuICogQ29udGVudCBxdWVyaWVzIGFyZSBzZXQgYmVmb3JlIHRoZSBgbmdBZnRlckNvbnRlbnRJbml0YCBjYWxsYmFjayBpcyBjYWxsZWQuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGBcbiAqIEBEaXJlY3RpdmUoe1xuICogICBzZWxlY3RvcjogJ3NvbWVEaXInXG4gKiB9KVxuICogY2xhc3MgU29tZURpciB7XG4gKiAgIEBDb250ZW50Q2hpbGRyZW4oQ2hpbGREaXJlY3RpdmUpIGNvbnRlbnRDaGlsZHJlbjogUXVlcnlMaXN0PENoaWxkRGlyZWN0aXZlPjtcbiAqXG4gKiAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAqICAgICAvLyBjb250ZW50Q2hpbGRyZW4gaXMgc2V0XG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICovXG5AQ09OU1QoKVxuZXhwb3J0IGNsYXNzIENvbnRlbnRDaGlsZHJlbk1ldGFkYXRhIGV4dGVuZHMgUXVlcnlNZXRhZGF0YSB7XG4gIGNvbnN0cnVjdG9yKF9zZWxlY3RvcjogVHlwZSB8IHN0cmluZywge2Rlc2NlbmRhbnRzID0gZmFsc2V9OiB7ZGVzY2VuZGFudHM/OiBib29sZWFufSA9IHt9KSB7XG4gICAgc3VwZXIoX3NlbGVjdG9yLCB7ZGVzY2VuZGFudHM6IGRlc2NlbmRhbnRzfSk7XG4gIH1cbn1cblxuLy8gVE9ETzogYWRkIGFuIGV4YW1wbGUgYWZ0ZXIgQ29udGVudENoaWxkIGFuZCBWaWV3Q2hpbGQgYXJlIGluIG1hc3RlclxuLyoqXG4gKiBDb25maWd1cmVzIGEgY29udGVudCBxdWVyeS5cbiAqXG4gKiBDb250ZW50IHF1ZXJpZXMgYXJlIHNldCBiZWZvcmUgdGhlIGBuZ0FmdGVyQ29udGVudEluaXRgIGNhbGxiYWNrIGlzIGNhbGxlZC5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYFxuICogQERpcmVjdGl2ZSh7XG4gKiAgIHNlbGVjdG9yOiAnc29tZURpcidcbiAqIH0pXG4gKiBjbGFzcyBTb21lRGlyIHtcbiAqICAgQENvbnRlbnRDaGlsZChDaGlsZERpcmVjdGl2ZSkgY29udGVudENoaWxkO1xuICpcbiAqICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICogICAgIC8vIGNvbnRlbnRDaGlsZCBpcyBzZXRcbiAqICAgfVxuICogfVxuICogYGBgXG4gKi9cbkBDT05TVCgpXG5leHBvcnQgY2xhc3MgQ29udGVudENoaWxkTWV0YWRhdGEgZXh0ZW5kcyBRdWVyeU1ldGFkYXRhIHtcbiAgY29uc3RydWN0b3IoX3NlbGVjdG9yOiBUeXBlIHwgc3RyaW5nKSB7IHN1cGVyKF9zZWxlY3Rvciwge2Rlc2NlbmRhbnRzOiB0cnVlLCBmaXJzdDogdHJ1ZX0pOyB9XG59XG5cbi8qKlxuICogU2ltaWxhciB0byB7QGxpbmsgUXVlcnlNZXRhZGF0YX0sIGJ1dCBxdWVyeWluZyB0aGUgY29tcG9uZW50IHZpZXcsIGluc3RlYWQgb2ZcbiAqIHRoZSBjb250ZW50IGNoaWxkcmVuLlxuICpcbiAqICMjIyBFeGFtcGxlIChbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC9lTnNGSERmN1lqeU02SXpLeE0xaj9wPXByZXZpZXcpKVxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIEBDb21wb25lbnQoe1xuICogICAuLi4sXG4gKiAgIHRlbXBsYXRlOiBgXG4gKiAgICAgPGl0ZW0+IGEgPC9pdGVtPlxuICogICAgIDxpdGVtPiBiIDwvaXRlbT5cbiAqICAgICA8aXRlbT4gYyA8L2l0ZW0+XG4gKiAgIGBcbiAqIH0pXG4gKiBjbGFzcyBNeUNvbXBvbmVudCB7XG4gKiAgIHNob3duOiBib29sZWFuO1xuICpcbiAqICAgY29uc3RydWN0b3IocHJpdmF0ZSBAUXVlcnkoSXRlbSkgaXRlbXM6UXVlcnlMaXN0PEl0ZW0+KSB7XG4gKiAgICAgaXRlbXMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gY29uc29sZS5sb2coaXRlbXMubGVuZ3RoKSk7XG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICpcbiAqIFN1cHBvcnRzIHRoZSBzYW1lIHF1ZXJ5aW5nIHBhcmFtZXRlcnMgYXMge0BsaW5rIFF1ZXJ5TWV0YWRhdGF9LCBleGNlcHRcbiAqIGBkZXNjZW5kYW50c2AuIFRoaXMgYWx3YXlzIHF1ZXJpZXMgdGhlIHdob2xlIHZpZXcuXG4gKlxuICogQXMgYHNob3duYCBpcyBmbGlwcGVkIGJldHdlZW4gdHJ1ZSBhbmQgZmFsc2UsIGl0ZW1zIHdpbGwgY29udGFpbiB6ZXJvIG9mIG9uZVxuICogaXRlbXMuXG4gKlxuICogU3BlY2lmaWVzIHRoYXQgYSB7QGxpbmsgUXVlcnlMaXN0fSBzaG91bGQgYmUgaW5qZWN0ZWQuXG4gKlxuICogVGhlIGluamVjdGVkIG9iamVjdCBpcyBhbiBpdGVyYWJsZSBhbmQgb2JzZXJ2YWJsZSBsaXZlIGxpc3QuXG4gKiBTZWUge0BsaW5rIFF1ZXJ5TGlzdH0gZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xuQENPTlNUKClcbmV4cG9ydCBjbGFzcyBWaWV3UXVlcnlNZXRhZGF0YSBleHRlbmRzIFF1ZXJ5TWV0YWRhdGEge1xuICBjb25zdHJ1Y3Rvcihfc2VsZWN0b3I6IFR5cGUgfCBzdHJpbmcsXG4gICAgICAgICAgICAgIHtkZXNjZW5kYW50cyA9IGZhbHNlLCBmaXJzdCA9IGZhbHNlfToge2Rlc2NlbmRhbnRzPzogYm9vbGVhbiwgZmlyc3Q/OiBib29sZWFufSA9IHt9KSB7XG4gICAgc3VwZXIoX3NlbGVjdG9yLCB7ZGVzY2VuZGFudHM6IGRlc2NlbmRhbnRzLCBmaXJzdDogZmlyc3R9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhbHdheXMgYHRydWVgIHRvIGRpZmZlcmVudGlhdGUgaXQgd2l0aCB7QGxpbmsgUXVlcnlNZXRhZGF0YX0uXG4gICAqL1xuICBnZXQgaXNWaWV3UXVlcnkoKSB7IHJldHVybiB0cnVlOyB9XG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiBgQFZpZXdRdWVyeSgke3N0cmluZ2lmeSh0aGlzLnNlbGVjdG9yKX0pYDsgfVxufVxuXG4vKipcbiAqIENvbmZpZ3VyZXMgYSB2aWV3IHF1ZXJ5LlxuICpcbiAqIFZpZXcgcXVlcmllcyBhcmUgc2V0IGJlZm9yZSB0aGUgYG5nQWZ0ZXJWaWV3SW5pdGAgY2FsbGJhY2sgaXMgY2FsbGVkLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgXG4gKiBAQ29tcG9uZW50KHtcbiAqICAgc2VsZWN0b3I6ICdzb21lRGlyJyxcbiAqICAgdGVtcGxhdGVVcmw6ICdzb21lVGVtcGxhdGUnLFxuICogICBkaXJlY3RpdmVzOiBbSXRlbURpcmVjdGl2ZV1cbiAqIH0pXG4gKiBjbGFzcyBTb21lRGlyIHtcbiAqICAgQFZpZXdDaGlsZHJlbihJdGVtRGlyZWN0aXZlKSB2aWV3Q2hpbGRyZW46IFF1ZXJ5TGlzdDxJdGVtRGlyZWN0aXZlPjtcbiAqXG4gKiAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAqICAgICAvLyB2aWV3Q2hpbGRyZW4gaXMgc2V0XG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICovXG5AQ09OU1QoKVxuZXhwb3J0IGNsYXNzIFZpZXdDaGlsZHJlbk1ldGFkYXRhIGV4dGVuZHMgVmlld1F1ZXJ5TWV0YWRhdGEge1xuICBjb25zdHJ1Y3Rvcihfc2VsZWN0b3I6IFR5cGUgfCBzdHJpbmcpIHsgc3VwZXIoX3NlbGVjdG9yLCB7ZGVzY2VuZGFudHM6IHRydWV9KTsgfVxufVxuXG4vKipcbiAqIENvbmZpZ3VyZXMgYSB2aWV3IHF1ZXJ5LlxuICpcbiAqIFZpZXcgcXVlcmllcyBhcmUgc2V0IGJlZm9yZSB0aGUgYG5nQWZ0ZXJWaWV3SW5pdGAgY2FsbGJhY2sgaXMgY2FsbGVkLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgXG4gKiBAQ29tcG9uZW50KHtcbiAqICAgc2VsZWN0b3I6ICdzb21lRGlyJyxcbiAqICAgdGVtcGxhdGVVcmw6ICdzb21lVGVtcGxhdGUnLFxuICogICBkaXJlY3RpdmVzOiBbSXRlbURpcmVjdGl2ZV1cbiAqIH0pXG4gKiBjbGFzcyBTb21lRGlyIHtcbiAqICAgQFZpZXdDaGlsZChJdGVtRGlyZWN0aXZlKSB2aWV3Q2hpbGQ6SXRlbURpcmVjdGl2ZTtcbiAqXG4gKiAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAqICAgICAvLyB2aWV3Q2hpbGQgaXMgc2V0XG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICovXG5AQ09OU1QoKVxuZXhwb3J0IGNsYXNzIFZpZXdDaGlsZE1ldGFkYXRhIGV4dGVuZHMgVmlld1F1ZXJ5TWV0YWRhdGEge1xuICBjb25zdHJ1Y3Rvcihfc2VsZWN0b3I6IFR5cGUgfCBzdHJpbmcpIHsgc3VwZXIoX3NlbGVjdG9yLCB7ZGVzY2VuZGFudHM6IHRydWUsIGZpcnN0OiB0cnVlfSk7IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
