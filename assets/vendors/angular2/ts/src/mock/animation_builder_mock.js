System.register(['angular2/src/core/di', 'angular2/src/animate/animation_builder', 'angular2/src/animate/css_animation_builder', 'angular2/src/animate/animation', 'angular2/src/animate/browser_details'], function(exports_1, context_1) {
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
    var di_1, animation_builder_1, css_animation_builder_1, animation_1, browser_details_1;
    var MockAnimationBuilder, MockCssAnimationBuilder, MockBrowserAbstraction, MockAnimation;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (animation_builder_1_1) {
                animation_builder_1 = animation_builder_1_1;
            },
            function (css_animation_builder_1_1) {
                css_animation_builder_1 = css_animation_builder_1_1;
            },
            function (animation_1_1) {
                animation_1 = animation_1_1;
            },
            function (browser_details_1_1) {
                browser_details_1 = browser_details_1_1;
            }],
        execute: function() {
            MockAnimationBuilder = (function (_super) {
                __extends(MockAnimationBuilder, _super);
                function MockAnimationBuilder() {
                    _super.call(this, null);
                }
                MockAnimationBuilder.prototype.css = function () { return new MockCssAnimationBuilder(); };
                MockAnimationBuilder = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], MockAnimationBuilder);
                return MockAnimationBuilder;
            }(animation_builder_1.AnimationBuilder));
            exports_1("MockAnimationBuilder", MockAnimationBuilder);
            MockCssAnimationBuilder = (function (_super) {
                __extends(MockCssAnimationBuilder, _super);
                function MockCssAnimationBuilder() {
                    _super.call(this, null);
                }
                MockCssAnimationBuilder.prototype.start = function (element) { return new MockAnimation(element, this.data); };
                return MockCssAnimationBuilder;
            }(css_animation_builder_1.CssAnimationBuilder));
            MockBrowserAbstraction = (function (_super) {
                __extends(MockBrowserAbstraction, _super);
                function MockBrowserAbstraction() {
                    _super.apply(this, arguments);
                }
                MockBrowserAbstraction.prototype.doesElapsedTimeIncludesDelay = function () { this.elapsedTimeIncludesDelay = false; };
                return MockBrowserAbstraction;
            }(browser_details_1.BrowserDetails));
            MockAnimation = (function (_super) {
                __extends(MockAnimation, _super);
                function MockAnimation(element, data) {
                    _super.call(this, element, data, new MockBrowserAbstraction());
                }
                MockAnimation.prototype.wait = function (callback) { this._callback = callback; };
                MockAnimation.prototype.flush = function () {
                    this._callback(0);
                    this._callback = null;
                };
                return MockAnimation;
            }(animation_1.Animation));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9tb2NrL2FuaW1hdGlvbl9idWlsZGVyX21vY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQVFBO2dCQUEwQyx3Q0FBZ0I7Z0JBQ3hEO29CQUFnQixrQkFBTSxJQUFJLENBQUMsQ0FBQztnQkFBQyxDQUFDO2dCQUM5QixrQ0FBRyxHQUFILGNBQTZCLE1BQU0sQ0FBQyxJQUFJLHVCQUF1QixFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUh0RTtvQkFBQyxlQUFVLEVBQUU7O3dDQUFBO2dCQUliLDJCQUFDO1lBQUQsQ0FIQSxBQUdDLENBSHlDLG9DQUFnQixHQUd6RDtZQUhELHVEQUdDLENBQUE7WUFFRDtnQkFBc0MsMkNBQW1CO2dCQUN2RDtvQkFBZ0Isa0JBQU0sSUFBSSxDQUFDLENBQUM7Z0JBQUMsQ0FBQztnQkFDOUIsdUNBQUssR0FBTCxVQUFNLE9BQW9CLElBQWUsTUFBTSxDQUFDLElBQUksYUFBYSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxRiw4QkFBQztZQUFELENBSEEsQUFHQyxDQUhxQywyQ0FBbUIsR0FHeEQ7WUFFRDtnQkFBcUMsMENBQWM7Z0JBQW5EO29CQUFxQyw4QkFBYztnQkFFbkQsQ0FBQztnQkFEQyw2REFBNEIsR0FBNUIsY0FBdUMsSUFBSSxDQUFDLHdCQUF3QixHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2pGLDZCQUFDO1lBQUQsQ0FGQSxBQUVDLENBRm9DLGdDQUFjLEdBRWxEO1lBRUQ7Z0JBQTRCLGlDQUFTO2dCQUVuQyx1QkFBWSxPQUFvQixFQUFFLElBQXlCO29CQUN6RCxrQkFBTSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO2dCQUNyRCxDQUFDO2dCQUNELDRCQUFJLEdBQUosVUFBSyxRQUFrQixJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDdkQsNkJBQUssR0FBTDtvQkFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNsQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztnQkFDeEIsQ0FBQztnQkFDSCxvQkFBQztZQUFELENBVkEsQUFVQyxDQVYyQixxQkFBUyxHQVVwQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvbW9jay9hbmltYXRpb25fYnVpbGRlcl9tb2NrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge0FuaW1hdGlvbkJ1aWxkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9hbmltYXRlL2FuaW1hdGlvbl9idWlsZGVyJztcbmltcG9ydCB7Q3NzQW5pbWF0aW9uQnVpbGRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2FuaW1hdGUvY3NzX2FuaW1hdGlvbl9idWlsZGVyJztcbmltcG9ydCB7Q3NzQW5pbWF0aW9uT3B0aW9uc30gZnJvbSAnYW5ndWxhcjIvc3JjL2FuaW1hdGUvY3NzX2FuaW1hdGlvbl9vcHRpb25zJztcbmltcG9ydCB7QW5pbWF0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvYW5pbWF0ZS9hbmltYXRpb24nO1xuaW1wb3J0IHtCcm93c2VyRGV0YWlsc30gZnJvbSAnYW5ndWxhcjIvc3JjL2FuaW1hdGUvYnJvd3Nlcl9kZXRhaWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vY2tBbmltYXRpb25CdWlsZGVyIGV4dGVuZHMgQW5pbWF0aW9uQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKCkgeyBzdXBlcihudWxsKTsgfVxuICBjc3MoKTogQ3NzQW5pbWF0aW9uQnVpbGRlciB7IHJldHVybiBuZXcgTW9ja0Nzc0FuaW1hdGlvbkJ1aWxkZXIoKTsgfVxufVxuXG5jbGFzcyBNb2NrQ3NzQW5pbWF0aW9uQnVpbGRlciBleHRlbmRzIENzc0FuaW1hdGlvbkJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcigpIHsgc3VwZXIobnVsbCk7IH1cbiAgc3RhcnQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBBbmltYXRpb24geyByZXR1cm4gbmV3IE1vY2tBbmltYXRpb24oZWxlbWVudCwgdGhpcy5kYXRhKTsgfVxufVxuXG5jbGFzcyBNb2NrQnJvd3NlckFic3RyYWN0aW9uIGV4dGVuZHMgQnJvd3NlckRldGFpbHMge1xuICBkb2VzRWxhcHNlZFRpbWVJbmNsdWRlc0RlbGF5KCk6IHZvaWQgeyB0aGlzLmVsYXBzZWRUaW1lSW5jbHVkZXNEZWxheSA9IGZhbHNlOyB9XG59XG5cbmNsYXNzIE1vY2tBbmltYXRpb24gZXh0ZW5kcyBBbmltYXRpb24ge1xuICBwcml2YXRlIF9jYWxsYmFjazogRnVuY3Rpb247XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBkYXRhOiBDc3NBbmltYXRpb25PcHRpb25zKSB7XG4gICAgc3VwZXIoZWxlbWVudCwgZGF0YSwgbmV3IE1vY2tCcm93c2VyQWJzdHJhY3Rpb24oKSk7XG4gIH1cbiAgd2FpdChjYWxsYmFjazogRnVuY3Rpb24pIHsgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjazsgfVxuICBmbHVzaCgpIHtcbiAgICB0aGlzLl9jYWxsYmFjaygwKTtcbiAgICB0aGlzLl9jYWxsYmFjayA9IG51bGw7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
