System.register(['./about.component', './contact.component', './home.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var about_component_1, contact_component_1, home_component_1;
    var routes;
    return {
        setters:[
            function (about_component_1_1) {
                about_component_1 = about_component_1_1;
            },
            function (contact_component_1_1) {
                contact_component_1 = contact_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            }],
        execute: function() {
            exports_1("routes", routes = [{
                    path: '/about',
                    component: about_component_1.AboutComponent,
                    name: 'About'
                }, {
                    path: '/contact',
                    component: contact_component_1.ContactComponent,
                    name: 'Contact'
                }, {
                    path: '/',
                    component: home_component_1.HomeComponent,
                    name: 'Home',
                    useAsDefault: true
                }]);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5yb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQUlhLE1BQU07Ozs7Ozs7Ozs7Ozs7WUFBTixvQkFBQSxNQUFNLEdBQVUsQ0FBQztvQkFDN0IsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsU0FBUyxFQUFFLGdDQUFjO29CQUN6QixJQUFJLEVBQUUsT0FBTztpQkFDYixFQUFFO29CQUNGLElBQUksRUFBRSxVQUFVO29CQUNoQixTQUFTLEVBQUUsb0NBQWdCO29CQUMzQixJQUFJLEVBQUUsU0FBUztpQkFDZixFQUFFO29CQUNGLElBQUksRUFBRSxHQUFHO29CQUNULFNBQVMsRUFBRSw4QkFBYTtvQkFDeEIsSUFBSSxFQUFFLE1BQU07b0JBQ1osWUFBWSxFQUFFLElBQUk7aUJBQ2xCLENBQUMsQ0FBQSxDQUFDIiwiZmlsZSI6ImFwcC5yb3V0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Fib3V0Q29tcG9uZW50fSBmcm9tICcuL2Fib3V0LmNvbXBvbmVudCc7XG5pbXBvcnQge0NvbnRhY3RDb21wb25lbnR9IGZyb20gJy4vY29udGFjdC5jb21wb25lbnQnO1xuaW1wb3J0IHtIb21lQ29tcG9uZW50fSBmcm9tICcuL2hvbWUuY29tcG9uZW50JztcblxuZXhwb3J0IGNvbnN0IHJvdXRlczogYW55W10gPSBbe1xuXHRwYXRoOiAnL2Fib3V0Jyxcblx0Y29tcG9uZW50OiBBYm91dENvbXBvbmVudCwgXG5cdG5hbWU6ICdBYm91dCdcbn0sIHtcblx0cGF0aDogJy9jb250YWN0Jyxcblx0Y29tcG9uZW50OiBDb250YWN0Q29tcG9uZW50LFxuXHRuYW1lOiAnQ29udGFjdCdcbn0sIHtcblx0cGF0aDogJy8nLFxuXHRjb21wb25lbnQ6IEhvbWVDb21wb25lbnQsXG5cdG5hbWU6ICdIb21lJyxcblx0dXNlQXNEZWZhdWx0OiB0cnVlXG59XTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
