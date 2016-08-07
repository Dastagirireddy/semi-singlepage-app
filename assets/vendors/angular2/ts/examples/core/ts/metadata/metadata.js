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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL2NvcmUvdHMvbWV0YWRhdGEvbWV0YWRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztRQUVJLGVBQWU7Ozs7Ozs7WUFFbkIsdUJBQXVCO1lBRXZCO2dCQUFBO29CQUNFLFNBQUksR0FBVyxPQUFPLENBQUM7Z0JBQ3pCLENBQUM7Z0JBSEQ7b0JBQUMsZ0JBQVMsQ0FBQyxFQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxDQUFDLGVBQWUsQ0FBQyxFQUFDLENBQUM7O3lCQUFBO2dCQUczRixZQUFDO1lBQUQsQ0FGQSxBQUVDLElBQUE7WUFDRCxnQkFBZ0I7WUFFaEIsOEJBQThCO1lBRTlCO2dCQUVFLGNBQWdDLEtBQWE7b0JBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQUMsQ0FBQztnQkFIeEU7b0JBQUMsZ0JBQVMsQ0FBQyxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixFQUFDLENBQUM7K0JBRzdDLGdCQUFTLENBQUMsT0FBTyxDQUFDOzt3QkFIMkI7Z0JBSTVELFdBQUM7WUFBRCxDQUhBLEFBR0MsSUFBQTtZQUNELGdCQUFnQjtZQUVoQiwrQkFBK0I7WUFFL0I7Z0JBQ0UsNEJBQStCLElBQVk7b0JBQ3pDLHVDQUF1QztnQkFDekMsQ0FBQztnQkFKSDtvQkFBQyxnQkFBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLE9BQU8sRUFBQyxDQUFDOytCQUVoQixnQkFBUyxDQUFDLE1BQU0sQ0FBQzs7c0NBRkQ7Z0JBSy9CLHlCQUFDO1lBQUQsQ0FKQSxBQUlDLElBQUE7WUFDRCxnQkFBZ0I7WUFFaEIsdUJBQXVCO1lBRXZCO2dCQUNFO29CQUNFLGtCQUFrQjtnQkFDcEIsQ0FBQztnQkFKSDtvQkFBQyxnQkFBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLE9BQU8sRUFBQyxDQUFDOztrQ0FBQTtnQkFLL0IscUJBQUM7WUFBRCxDQUpBLEFBSUMsSUFBQTtZQUNELGdCQUFnQjtZQUVoQixrQkFBa0I7WUFFbEI7Z0JBQUE7Z0JBRUEsQ0FBQztnQkFEQyw2QkFBUyxHQUFULFVBQVUsQ0FBUyxFQUFFLElBQVcsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFGL0Q7b0JBQUMsV0FBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBQyxDQUFDOzs2QkFBQTtnQkFHMUIsZ0JBQUM7WUFBRCxDQUZBLEFBRUMsSUFBQTs7OztBQUNELGdCQUFnQiIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9leGFtcGxlcy9jb3JlL3RzL21ldGFkYXRhL21ldGFkYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEF0dHJpYnV0ZSwgRGlyZWN0aXZlLCBQaXBlfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcblxudmFyIEN1c3RvbURpcmVjdGl2ZTogRnVuY3Rpb247XG5cbi8vICNkb2NyZWdpb24gY29tcG9uZW50XG5AQ29tcG9uZW50KHtzZWxlY3RvcjogJ2dyZWV0JywgdGVtcGxhdGU6ICdIZWxsbyB7e25hbWV9fSEnLCBkaXJlY3RpdmVzOiBbQ3VzdG9tRGlyZWN0aXZlXX0pXG5jbGFzcyBHcmVldCB7XG4gIG5hbWU6IHN0cmluZyA9ICdXb3JsZCc7XG59XG4vLyAjZW5kZG9jcmVnaW9uXG5cbi8vICNkb2NyZWdpb24gYXR0cmlidXRlRmFjdG9yeVxuQENvbXBvbmVudCh7c2VsZWN0b3I6ICdwYWdlJywgdGVtcGxhdGU6ICdUaXRsZToge3t0aXRsZX19J30pXG5jbGFzcyBQYWdlIHtcbiAgdGl0bGU6IHN0cmluZztcbiAgY29uc3RydWN0b3IoQEF0dHJpYnV0ZSgndGl0bGUnKSB0aXRsZTogc3RyaW5nKSB7IHRoaXMudGl0bGUgPSB0aXRsZTsgfVxufVxuLy8gI2VuZGRvY3JlZ2lvblxuXG4vLyAjZG9jcmVnaW9uIGF0dHJpYnV0ZU1ldGFkYXRhXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ2lucHV0J30pXG5jbGFzcyBJbnB1dEF0dHJEaXJlY3RpdmUge1xuICBjb25zdHJ1Y3RvcihAQXR0cmlidXRlKCd0eXBlJykgdHlwZTogc3RyaW5nKSB7XG4gICAgLy8gdHlwZSB3b3VsZCBiZSAndGV4dCcgaW4gdGhpcyBleGFtcGxlXG4gIH1cbn1cbi8vICNlbmRkb2NyZWdpb25cblxuLy8gI2RvY3JlZ2lvbiBkaXJlY3RpdmVcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnaW5wdXQnfSlcbmNsYXNzIElucHV0RGlyZWN0aXZlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gQWRkIHNvbWUgbG9naWMuXG4gIH1cbn1cbi8vICNlbmRkb2NyZWdpb25cblxuLy8gI2RvY3JlZ2lvbiBwaXBlXG5AUGlwZSh7bmFtZTogJ2xvd2VyY2FzZSd9KVxuY2xhc3MgTG93ZXJjYXNlIHtcbiAgdHJhbnNmb3JtKHY6IHN0cmluZywgYXJnczogYW55W10pIHsgcmV0dXJuIHYudG9Mb3dlckNhc2UoKTsgfVxufVxuLy8gI2VuZGRvY3JlZ2lvblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
