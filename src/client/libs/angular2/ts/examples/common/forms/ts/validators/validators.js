System.register(['angular2/core', 'angular2/common'], function(exports_1, context_1) {
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
    var core_1, common_1;
    var MinLengthTestComponent, MaxLengthTestComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            // #docregion min
            MinLengthTestComponent = (function () {
                function MinLengthTestComponent() {
                }
                MinLengthTestComponent = __decorate([
                    core_1.Component({
                        selector: 'min-cmp',
                        directives: [common_1.MinLengthValidator],
                        template: "\n<form>\n  <p>Year: <input ngControl=\"year\" minlength=\"2\"></p>\n</form>\n"
                    }), 
                    __metadata('design:paramtypes', [])
                ], MinLengthTestComponent);
                return MinLengthTestComponent;
            }());
            // #enddocregion
            // #docregion max
            MaxLengthTestComponent = (function () {
                function MaxLengthTestComponent() {
                }
                MaxLengthTestComponent = __decorate([
                    core_1.Component({
                        selector: 'max-cmp',
                        directives: [common_1.MaxLengthValidator],
                        template: "\n<form>\n  <p>Year: <input ngControl=\"year\" maxlength=\"4\"></p>\n</form>\n"
                    }), 
                    __metadata('design:paramtypes', [])
                ], MaxLengthTestComponent);
                return MaxLengthTestComponent;
            }());
        }
    }
});
// #enddocregion

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvY29tbW9uL2Zvcm1zL3RzL3ZhbGlkYXRvcnMvdmFsaWRhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUdBLGlCQUFpQjtZQVVqQjtnQkFBQTtnQkFDQSxDQUFDO2dCQVZEO29CQUFDLGdCQUFTLENBQUM7d0JBQ1QsUUFBUSxFQUFFLFNBQVM7d0JBQ25CLFVBQVUsRUFBRSxDQUFDLDJCQUFrQixDQUFDO3dCQUNoQyxRQUFRLEVBQUUsZ0ZBSVg7cUJBQ0EsQ0FBQzs7MENBQUE7Z0JBRUYsNkJBQUM7WUFBRCxDQURBLEFBQ0MsSUFBQTtZQUNELGdCQUFnQjtZQUVoQixpQkFBaUI7WUFVakI7Z0JBQUE7Z0JBQ0EsQ0FBQztnQkFWRDtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSxTQUFTO3dCQUNuQixVQUFVLEVBQUUsQ0FBQywyQkFBa0IsQ0FBQzt3QkFDaEMsUUFBUSxFQUFFLGdGQUlYO3FCQUNBLENBQUM7OzBDQUFBO2dCQUVGLDZCQUFDO1lBQUQsQ0FEQSxBQUNDLElBQUE7Ozs7QUFDRCxnQkFBZ0IiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9leGFtcGxlcy9jb21tb24vZm9ybXMvdHMvdmFsaWRhdG9ycy92YWxpZGF0b3JzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtNaW5MZW5ndGhWYWxpZGF0b3IsIE1heExlbmd0aFZhbGlkYXRvcn0gZnJvbSAnYW5ndWxhcjIvY29tbW9uJztcblxuLy8gI2RvY3JlZ2lvbiBtaW5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21pbi1jbXAnLFxuICBkaXJlY3RpdmVzOiBbTWluTGVuZ3RoVmFsaWRhdG9yXSxcbiAgdGVtcGxhdGU6IGBcbjxmb3JtPlxuICA8cD5ZZWFyOiA8aW5wdXQgbmdDb250cm9sPVwieWVhclwiIG1pbmxlbmd0aD1cIjJcIj48L3A+XG48L2Zvcm0+XG5gXG59KVxuY2xhc3MgTWluTGVuZ3RoVGVzdENvbXBvbmVudCB7XG59XG4vLyAjZW5kZG9jcmVnaW9uXG5cbi8vICNkb2NyZWdpb24gbWF4XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXgtY21wJyxcbiAgZGlyZWN0aXZlczogW01heExlbmd0aFZhbGlkYXRvcl0sXG4gIHRlbXBsYXRlOiBgXG48Zm9ybT5cbiAgPHA+WWVhcjogPGlucHV0IG5nQ29udHJvbD1cInllYXJcIiBtYXhsZW5ndGg9XCI0XCI+PC9wPlxuPC9mb3JtPlxuYFxufSlcbmNsYXNzIE1heExlbmd0aFRlc3RDb21wb25lbnQge1xufVxuLy8gI2VuZGRvY3JlZ2lvblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
