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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL2NvbW1vbi9mb3Jtcy90cy92YWxpZGF0b3JzL3ZhbGlkYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFHQSxpQkFBaUI7WUFVakI7Z0JBQUE7Z0JBQ0EsQ0FBQztnQkFWRDtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSxTQUFTO3dCQUNuQixVQUFVLEVBQUUsQ0FBQywyQkFBa0IsQ0FBQzt3QkFDaEMsUUFBUSxFQUFFLGdGQUlYO3FCQUNBLENBQUM7OzBDQUFBO2dCQUVGLDZCQUFDO1lBQUQsQ0FEQSxBQUNDLElBQUE7WUFDRCxnQkFBZ0I7WUFFaEIsaUJBQWlCO1lBVWpCO2dCQUFBO2dCQUNBLENBQUM7Z0JBVkQ7b0JBQUMsZ0JBQVMsQ0FBQzt3QkFDVCxRQUFRLEVBQUUsU0FBUzt3QkFDbkIsVUFBVSxFQUFFLENBQUMsMkJBQWtCLENBQUM7d0JBQ2hDLFFBQVEsRUFBRSxnRkFJWDtxQkFDQSxDQUFDOzswQ0FBQTtnQkFFRiw2QkFBQztZQUFELENBREEsQUFDQyxJQUFBOzs7O0FBQ0QsZ0JBQWdCIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL2NvbW1vbi9mb3Jtcy90cy92YWxpZGF0b3JzL3ZhbGlkYXRvcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge01pbkxlbmd0aFZhbGlkYXRvciwgTWF4TGVuZ3RoVmFsaWRhdG9yfSBmcm9tICdhbmd1bGFyMi9jb21tb24nO1xuXG4vLyAjZG9jcmVnaW9uIG1pblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWluLWNtcCcsXG4gIGRpcmVjdGl2ZXM6IFtNaW5MZW5ndGhWYWxpZGF0b3JdLFxuICB0ZW1wbGF0ZTogYFxuPGZvcm0+XG4gIDxwPlllYXI6IDxpbnB1dCBuZ0NvbnRyb2w9XCJ5ZWFyXCIgbWlubGVuZ3RoPVwiMlwiPjwvcD5cbjwvZm9ybT5cbmBcbn0pXG5jbGFzcyBNaW5MZW5ndGhUZXN0Q29tcG9uZW50IHtcbn1cbi8vICNlbmRkb2NyZWdpb25cblxuLy8gI2RvY3JlZ2lvbiBtYXhcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21heC1jbXAnLFxuICBkaXJlY3RpdmVzOiBbTWF4TGVuZ3RoVmFsaWRhdG9yXSxcbiAgdGVtcGxhdGU6IGBcbjxmb3JtPlxuICA8cD5ZZWFyOiA8aW5wdXQgbmdDb250cm9sPVwieWVhclwiIG1heGxlbmd0aD1cIjRcIj48L3A+XG48L2Zvcm0+XG5gXG59KVxuY2xhc3MgTWF4TGVuZ3RoVGVzdENvbXBvbmVudCB7XG59XG4vLyAjZW5kZG9jcmVnaW9uXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
