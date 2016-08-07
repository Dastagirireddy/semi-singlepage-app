System.register(['angular2/src/core/di', './css_animation_builder', './browser_details'], function(exports_1, context_1) {
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
    var di_1, css_animation_builder_1, browser_details_1;
    var AnimationBuilder;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (css_animation_builder_1_1) {
                css_animation_builder_1 = css_animation_builder_1_1;
            },
            function (browser_details_1_1) {
                browser_details_1 = browser_details_1_1;
            }],
        execute: function() {
            AnimationBuilder = (function () {
                /**
                 * Used for DI
                 * @param browserDetails
                 */
                function AnimationBuilder(browserDetails) {
                    this.browserDetails = browserDetails;
                }
                /**
                 * Creates a new CSS Animation
                 * @returns {CssAnimationBuilder}
                 */
                AnimationBuilder.prototype.css = function () { return new css_animation_builder_1.CssAnimationBuilder(this.browserDetails); };
                AnimationBuilder = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [browser_details_1.BrowserDetails])
                ], AnimationBuilder);
                return AnimationBuilder;
            }());
            exports_1("AnimationBuilder", AnimationBuilder);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2FuaW1hdGUvYW5pbWF0aW9uX2J1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFNQTtnQkFDRTs7O21CQUdHO2dCQUNILDBCQUFtQixjQUE4QjtvQkFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO2dCQUFHLENBQUM7Z0JBRXJEOzs7bUJBR0c7Z0JBQ0gsOEJBQUcsR0FBSCxjQUE2QixNQUFNLENBQUMsSUFBSSwyQ0FBbUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQVpyRjtvQkFBQyxlQUFVLEVBQUU7O29DQUFBO2dCQWFiLHVCQUFDO1lBQUQsQ0FaQSxBQVlDLElBQUE7WUFaRCwrQ0FZQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2FuaW1hdGUvYW5pbWF0aW9uX2J1aWxkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcblxuaW1wb3J0IHtDc3NBbmltYXRpb25CdWlsZGVyfSBmcm9tICcuL2Nzc19hbmltYXRpb25fYnVpbGRlcic7XG5pbXBvcnQge0Jyb3dzZXJEZXRhaWxzfSBmcm9tICcuL2Jyb3dzZXJfZGV0YWlscyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBbmltYXRpb25CdWlsZGVyIHtcbiAgLyoqXG4gICAqIFVzZWQgZm9yIERJXG4gICAqIEBwYXJhbSBicm93c2VyRGV0YWlsc1xuICAgKi9cbiAgY29uc3RydWN0b3IocHVibGljIGJyb3dzZXJEZXRhaWxzOiBCcm93c2VyRGV0YWlscykge31cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBDU1MgQW5pbWF0aW9uXG4gICAqIEByZXR1cm5zIHtDc3NBbmltYXRpb25CdWlsZGVyfVxuICAgKi9cbiAgY3NzKCk6IENzc0FuaW1hdGlvbkJ1aWxkZXIgeyByZXR1cm4gbmV3IENzc0FuaW1hdGlvbkJ1aWxkZXIodGhpcy5icm93c2VyRGV0YWlscyk7IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
