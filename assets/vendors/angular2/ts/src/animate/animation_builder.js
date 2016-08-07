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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9hbmltYXRlL2FuaW1hdGlvbl9idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBTUE7Z0JBQ0U7OzttQkFHRztnQkFDSCwwQkFBbUIsY0FBOEI7b0JBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtnQkFBRyxDQUFDO2dCQUVyRDs7O21CQUdHO2dCQUNILDhCQUFHLEdBQUgsY0FBNkIsTUFBTSxDQUFDLElBQUksMkNBQW1CLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFackY7b0JBQUMsZUFBVSxFQUFFOztvQ0FBQTtnQkFhYix1QkFBQztZQUFELENBWkEsQUFZQyxJQUFBO1lBWkQsK0NBWUMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvYW5pbWF0ZS9hbmltYXRpb25fYnVpbGRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuXG5pbXBvcnQge0Nzc0FuaW1hdGlvbkJ1aWxkZXJ9IGZyb20gJy4vY3NzX2FuaW1hdGlvbl9idWlsZGVyJztcbmltcG9ydCB7QnJvd3NlckRldGFpbHN9IGZyb20gJy4vYnJvd3Nlcl9kZXRhaWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFuaW1hdGlvbkJ1aWxkZXIge1xuICAvKipcbiAgICogVXNlZCBmb3IgRElcbiAgICogQHBhcmFtIGJyb3dzZXJEZXRhaWxzXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgYnJvd3NlckRldGFpbHM6IEJyb3dzZXJEZXRhaWxzKSB7fVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IENTUyBBbmltYXRpb25cbiAgICogQHJldHVybnMge0Nzc0FuaW1hdGlvbkJ1aWxkZXJ9XG4gICAqL1xuICBjc3MoKTogQ3NzQW5pbWF0aW9uQnVpbGRlciB7IHJldHVybiBuZXcgQ3NzQW5pbWF0aW9uQnVpbGRlcih0aGlzLmJyb3dzZXJEZXRhaWxzKTsgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
