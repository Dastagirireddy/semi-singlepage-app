System.register(['angular2/core', './sidebar.component'], function(exports_1, context_1) {
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
    var core_1, sidebar_component_1;
    var AnalyticsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (sidebar_component_1_1) {
                sidebar_component_1 = sidebar_component_1_1;
            }],
        execute: function() {
            AnalyticsComponent = (function () {
                function AnalyticsComponent() {
                }
                AnalyticsComponent = __decorate([
                    core_1.Component({
                        selector: 'analytics-cmp',
                        templateUrl: '../partials/dashboard.html',
                        directives: [sidebar_component_1.SidebarComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AnalyticsComponent);
                return AnalyticsComponent;
            }());
            exports_1("AnalyticsComponent", AnalyticsComponent);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuYWx5dGljcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFTQTtnQkFBQTtnQkFFQSxDQUFDO2dCQVBEO29CQUFDLGdCQUFTLENBQUM7d0JBQ1YsUUFBUSxFQUFFLGVBQWU7d0JBQ3pCLFdBQVcsRUFBRSw0QkFBNEI7d0JBQ3pDLFVBQVUsRUFBRSxDQUFDLG9DQUFnQixDQUFDO3FCQUM5QixDQUFDOztzQ0FBQTtnQkFHRix5QkFBQztZQUFELENBRkEsQUFFQyxJQUFBO1lBRkQsbURBRUMsQ0FBQSIsImZpbGUiOiJhbmFseXRpY3MuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtTaWRlYmFyQ29tcG9uZW50fSBmcm9tICcuL3NpZGViYXIuY29tcG9uZW50JztcblxuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdhbmFseXRpY3MtY21wJyxcblx0dGVtcGxhdGVVcmw6ICcuLi9wYXJ0aWFscy9kYXNoYm9hcmQuaHRtbCcsXG5cdGRpcmVjdGl2ZXM6IFtTaWRlYmFyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBBbmFseXRpY3NDb21wb25lbnQge1xuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
