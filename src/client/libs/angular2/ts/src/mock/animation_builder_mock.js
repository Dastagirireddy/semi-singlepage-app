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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL21vY2svYW5pbWF0aW9uX2J1aWxkZXJfbW9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBUUE7Z0JBQTBDLHdDQUFnQjtnQkFDeEQ7b0JBQWdCLGtCQUFNLElBQUksQ0FBQyxDQUFDO2dCQUFDLENBQUM7Z0JBQzlCLGtDQUFHLEdBQUgsY0FBNkIsTUFBTSxDQUFDLElBQUksdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBSHRFO29CQUFDLGVBQVUsRUFBRTs7d0NBQUE7Z0JBSWIsMkJBQUM7WUFBRCxDQUhBLEFBR0MsQ0FIeUMsb0NBQWdCLEdBR3pEO1lBSEQsdURBR0MsQ0FBQTtZQUVEO2dCQUFzQywyQ0FBbUI7Z0JBQ3ZEO29CQUFnQixrQkFBTSxJQUFJLENBQUMsQ0FBQztnQkFBQyxDQUFDO2dCQUM5Qix1Q0FBSyxHQUFMLFVBQU0sT0FBb0IsSUFBZSxNQUFNLENBQUMsSUFBSSxhQUFhLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFGLDhCQUFDO1lBQUQsQ0FIQSxBQUdDLENBSHFDLDJDQUFtQixHQUd4RDtZQUVEO2dCQUFxQywwQ0FBYztnQkFBbkQ7b0JBQXFDLDhCQUFjO2dCQUVuRCxDQUFDO2dCQURDLDZEQUE0QixHQUE1QixjQUF1QyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDakYsNkJBQUM7WUFBRCxDQUZBLEFBRUMsQ0FGb0MsZ0NBQWMsR0FFbEQ7WUFFRDtnQkFBNEIsaUNBQVM7Z0JBRW5DLHVCQUFZLE9BQW9CLEVBQUUsSUFBeUI7b0JBQ3pELGtCQUFNLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxzQkFBc0IsRUFBRSxDQUFDLENBQUM7Z0JBQ3JELENBQUM7Z0JBQ0QsNEJBQUksR0FBSixVQUFLLFFBQWtCLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUN2RCw2QkFBSyxHQUFMO29CQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixDQUFDO2dCQUNILG9CQUFDO1lBQUQsQ0FWQSxBQVVDLENBVjJCLHFCQUFTLEdBVXBDIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL21vY2svYW5pbWF0aW9uX2J1aWxkZXJfbW9jay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtBbmltYXRpb25CdWlsZGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvYW5pbWF0ZS9hbmltYXRpb25fYnVpbGRlcic7XG5pbXBvcnQge0Nzc0FuaW1hdGlvbkJ1aWxkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9hbmltYXRlL2Nzc19hbmltYXRpb25fYnVpbGRlcic7XG5pbXBvcnQge0Nzc0FuaW1hdGlvbk9wdGlvbnN9IGZyb20gJ2FuZ3VsYXIyL3NyYy9hbmltYXRlL2Nzc19hbmltYXRpb25fb3B0aW9ucyc7XG5pbXBvcnQge0FuaW1hdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2FuaW1hdGUvYW5pbWF0aW9uJztcbmltcG9ydCB7QnJvd3NlckRldGFpbHN9IGZyb20gJ2FuZ3VsYXIyL3NyYy9hbmltYXRlL2Jyb3dzZXJfZGV0YWlscyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNb2NrQW5pbWF0aW9uQnVpbGRlciBleHRlbmRzIEFuaW1hdGlvbkJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcigpIHsgc3VwZXIobnVsbCk7IH1cbiAgY3NzKCk6IENzc0FuaW1hdGlvbkJ1aWxkZXIgeyByZXR1cm4gbmV3IE1vY2tDc3NBbmltYXRpb25CdWlsZGVyKCk7IH1cbn1cblxuY2xhc3MgTW9ja0Nzc0FuaW1hdGlvbkJ1aWxkZXIgZXh0ZW5kcyBDc3NBbmltYXRpb25CdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7IHN1cGVyKG51bGwpOyB9XG4gIHN0YXJ0KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogQW5pbWF0aW9uIHsgcmV0dXJuIG5ldyBNb2NrQW5pbWF0aW9uKGVsZW1lbnQsIHRoaXMuZGF0YSk7IH1cbn1cblxuY2xhc3MgTW9ja0Jyb3dzZXJBYnN0cmFjdGlvbiBleHRlbmRzIEJyb3dzZXJEZXRhaWxzIHtcbiAgZG9lc0VsYXBzZWRUaW1lSW5jbHVkZXNEZWxheSgpOiB2b2lkIHsgdGhpcy5lbGFwc2VkVGltZUluY2x1ZGVzRGVsYXkgPSBmYWxzZTsgfVxufVxuXG5jbGFzcyBNb2NrQW5pbWF0aW9uIGV4dGVuZHMgQW5pbWF0aW9uIHtcbiAgcHJpdmF0ZSBfY2FsbGJhY2s6IEZ1bmN0aW9uO1xuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBIVE1MRWxlbWVudCwgZGF0YTogQ3NzQW5pbWF0aW9uT3B0aW9ucykge1xuICAgIHN1cGVyKGVsZW1lbnQsIGRhdGEsIG5ldyBNb2NrQnJvd3NlckFic3RyYWN0aW9uKCkpO1xuICB9XG4gIHdhaXQoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7IHRoaXMuX2NhbGxiYWNrID0gY2FsbGJhY2s7IH1cbiAgZmx1c2goKSB7XG4gICAgdGhpcy5fY2FsbGJhY2soMCk7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSBudWxsO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
