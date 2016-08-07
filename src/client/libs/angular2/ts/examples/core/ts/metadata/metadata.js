System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var CustomDirective, Greet, Page, InputAttrDirective, InputDirective, Lowercase;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            // #docregion component
            Greet = (function () {
                function Greet() {
                    this.name = 'World';
                }
                Greet = __decorate([
                    core_1.Component({ selector: 'greet', template: 'Hello {{name}}!', directives: [CustomDirective] }), 
                    __metadata('design:paramtypes', [])
                ], Greet);
                return Greet;
            }());
            // #enddocregion
            // #docregion attributeFactory
            Page = (function () {
                function Page(title) {
                    this.title = title;
                }
                Page = __decorate([
                    core_1.Component({ selector: 'page', template: 'Title: {{title}}' }),
                    __param(0, core_1.Attribute('title')), 
                    __metadata('design:paramtypes', [String])
                ], Page);
                return Page;
            }());
            // #enddocregion
            // #docregion attributeMetadata
            InputAttrDirective = (function () {
                function InputAttrDirective(type) {
                    // type would be 'text' in this example
                }
                InputAttrDirective = __decorate([
                    core_1.Directive({ selector: 'input' }),
                    __param(0, core_1.Attribute('type')), 
                    __metadata('design:paramtypes', [String])
                ], InputAttrDirective);
                return InputAttrDirective;
            }());
            // #enddocregion
            // #docregion directive
            InputDirective = (function () {
                function InputDirective() {
                    // Add some logic.
                }
                InputDirective = __decorate([
                    core_1.Directive({ selector: 'input' }), 
                    __metadata('design:paramtypes', [])
                ], InputDirective);
                return InputDirective;
            }());
            // #enddocregion
            // #docregion pipe
            Lowercase = (function () {
                function Lowercase() {
                }
                Lowercase.prototype.transform = function (v, args) { return v.toLowerCase(); };
                Lowercase = __decorate([
                    core_1.Pipe({ name: 'lowercase' }), 
                    __metadata('design:paramtypes', [])
                ], Lowercase);
                return Lowercase;
            }());
        }
    }
});
// #enddocregion

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvY29yZS90cy9tZXRhZGF0YS9tZXRhZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O1FBRUksZUFBZTs7Ozs7OztZQUVuQix1QkFBdUI7WUFFdkI7Z0JBQUE7b0JBQ0UsU0FBSSxHQUFXLE9BQU8sQ0FBQztnQkFDekIsQ0FBQztnQkFIRDtvQkFBQyxnQkFBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFFLENBQUMsZUFBZSxDQUFDLEVBQUMsQ0FBQzs7eUJBQUE7Z0JBRzNGLFlBQUM7WUFBRCxDQUZBLEFBRUMsSUFBQTtZQUNELGdCQUFnQjtZQUVoQiw4QkFBOEI7WUFFOUI7Z0JBRUUsY0FBZ0MsS0FBYTtvQkFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFBQyxDQUFDO2dCQUh4RTtvQkFBQyxnQkFBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQzsrQkFHN0MsZ0JBQVMsQ0FBQyxPQUFPLENBQUM7O3dCQUgyQjtnQkFJNUQsV0FBQztZQUFELENBSEEsQUFHQyxJQUFBO1lBQ0QsZ0JBQWdCO1lBRWhCLCtCQUErQjtZQUUvQjtnQkFDRSw0QkFBK0IsSUFBWTtvQkFDekMsdUNBQXVDO2dCQUN6QyxDQUFDO2dCQUpIO29CQUFDLGdCQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFDLENBQUM7K0JBRWhCLGdCQUFTLENBQUMsTUFBTSxDQUFDOztzQ0FGRDtnQkFLL0IseUJBQUM7WUFBRCxDQUpBLEFBSUMsSUFBQTtZQUNELGdCQUFnQjtZQUVoQix1QkFBdUI7WUFFdkI7Z0JBQ0U7b0JBQ0Usa0JBQWtCO2dCQUNwQixDQUFDO2dCQUpIO29CQUFDLGdCQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFDLENBQUM7O2tDQUFBO2dCQUsvQixxQkFBQztZQUFELENBSkEsQUFJQyxJQUFBO1lBQ0QsZ0JBQWdCO1lBRWhCLGtCQUFrQjtZQUVsQjtnQkFBQTtnQkFFQSxDQUFDO2dCQURDLDZCQUFTLEdBQVQsVUFBVSxDQUFTLEVBQUUsSUFBVyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUYvRDtvQkFBQyxXQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFDLENBQUM7OzZCQUFBO2dCQUcxQixnQkFBQztZQUFELENBRkEsQUFFQyxJQUFBOzs7O0FBQ0QsZ0JBQWdCIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvY29yZS90cy9tZXRhZGF0YS9tZXRhZGF0YS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBBdHRyaWJ1dGUsIERpcmVjdGl2ZSwgUGlwZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5cbnZhciBDdXN0b21EaXJlY3RpdmU6IEZ1bmN0aW9uO1xuXG4vLyAjZG9jcmVnaW9uIGNvbXBvbmVudFxuQENvbXBvbmVudCh7c2VsZWN0b3I6ICdncmVldCcsIHRlbXBsYXRlOiAnSGVsbG8ge3tuYW1lfX0hJywgZGlyZWN0aXZlczogW0N1c3RvbURpcmVjdGl2ZV19KVxuY2xhc3MgR3JlZXQge1xuICBuYW1lOiBzdHJpbmcgPSAnV29ybGQnO1xufVxuLy8gI2VuZGRvY3JlZ2lvblxuXG4vLyAjZG9jcmVnaW9uIGF0dHJpYnV0ZUZhY3RvcnlcbkBDb21wb25lbnQoe3NlbGVjdG9yOiAncGFnZScsIHRlbXBsYXRlOiAnVGl0bGU6IHt7dGl0bGV9fSd9KVxuY2xhc3MgUGFnZSB7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKEBBdHRyaWJ1dGUoJ3RpdGxlJykgdGl0bGU6IHN0cmluZykgeyB0aGlzLnRpdGxlID0gdGl0bGU7IH1cbn1cbi8vICNlbmRkb2NyZWdpb25cblxuLy8gI2RvY3JlZ2lvbiBhdHRyaWJ1dGVNZXRhZGF0YVxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdpbnB1dCd9KVxuY2xhc3MgSW5wdXRBdHRyRGlyZWN0aXZlIHtcbiAgY29uc3RydWN0b3IoQEF0dHJpYnV0ZSgndHlwZScpIHR5cGU6IHN0cmluZykge1xuICAgIC8vIHR5cGUgd291bGQgYmUgJ3RleHQnIGluIHRoaXMgZXhhbXBsZVxuICB9XG59XG4vLyAjZW5kZG9jcmVnaW9uXG5cbi8vICNkb2NyZWdpb24gZGlyZWN0aXZlXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ2lucHV0J30pXG5jbGFzcyBJbnB1dERpcmVjdGl2ZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIEFkZCBzb21lIGxvZ2ljLlxuICB9XG59XG4vLyAjZW5kZG9jcmVnaW9uXG5cbi8vICNkb2NyZWdpb24gcGlwZVxuQFBpcGUoe25hbWU6ICdsb3dlcmNhc2UnfSlcbmNsYXNzIExvd2VyY2FzZSB7XG4gIHRyYW5zZm9ybSh2OiBzdHJpbmcsIGFyZ3M6IGFueVtdKSB7IHJldHVybiB2LnRvTG93ZXJDYXNlKCk7IH1cbn1cbi8vICNlbmRkb2NyZWdpb25cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
