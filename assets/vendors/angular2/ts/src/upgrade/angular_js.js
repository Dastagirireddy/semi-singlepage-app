System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var angular, e, bootstrap, module, element, version, resumeBootstrap, getTestability;
    function noNg() {
        throw new Error('AngularJS v1.x is not loaded!');
    }
    return {
        setters:[],
        execute: function() {
            angular = {
                bootstrap: noNg,
                module: noNg,
                element: noNg,
                version: noNg,
                resumeBootstrap: noNg,
                getTestability: noNg
            };
            try {
                if (window.hasOwnProperty('angular')) {
                    angular = window.angular;
                }
            }
            catch (e) {
            }
            exports_1("bootstrap", bootstrap = angular.bootstrap);
            exports_1("module", module = angular.module);
            exports_1("element", element = angular.element);
            exports_1("version", version = angular.version);
            exports_1("resumeBootstrap", resumeBootstrap = angular.resumeBootstrap);
            exports_1("getTestability", getTestability = angular.getTestability);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy91cGdyYWRlL2FuZ3VsYXJfanMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O1FBMEhJLE9BQU8sRUFxQkYsQ0FBQyxFQUlDLFNBQVMsRUFDVCxNQUFNLEVBQ04sT0FBTyxFQUNQLE9BQU8sRUFDUCxlQUFlLEVBQ2YsY0FBYztJQWxDekI7UUFDRSxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7SUFDbkQsQ0FBQzs7OztZQUVHLE9BQU8sR0FPRTtnQkFDUCxTQUFTLEVBQUUsSUFBSTtnQkFDZixNQUFNLEVBQUUsSUFBSTtnQkFDWixPQUFPLEVBQUUsSUFBSTtnQkFDYixPQUFPLEVBQUUsSUFBSTtnQkFDYixlQUFlLEVBQUUsSUFBSTtnQkFDckIsY0FBYyxFQUFFLElBQUk7YUFDckIsQ0FBQztZQUdOLElBQUksQ0FBQztnQkFDSCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckMsT0FBTyxHQUFTLE1BQU8sQ0FBQyxPQUFPLENBQUM7Z0JBQ2xDLENBQUM7WUFDSCxDQUFFO1lBQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUViLENBQUM7WUFFVSx1QkFBQSxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQSxDQUFDO1lBQzlCLG9CQUFBLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFBLENBQUM7WUFDeEIscUJBQUEsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUEsQ0FBQztZQUMxQixxQkFBQSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQSxDQUFDO1lBQzFCLDZCQUFBLGVBQWUsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFBLENBQUM7WUFDMUMsNEJBQUEsY0FBYyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUEsQ0FBQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvdXBncmFkZS9hbmd1bGFyX2pzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBJTW9kdWxlIHtcbiAgY29uZmlnKGZuOiBhbnkpOiBJTW9kdWxlO1xuICBkaXJlY3RpdmUoc2VsZWN0b3I6IHN0cmluZywgZmFjdG9yeTogYW55KTogSU1vZHVsZTtcbiAgY29tcG9uZW50KHNlbGVjdG9yOiBzdHJpbmcsIGNvbXBvbmVudDogSUNvbXBvbmVudCk6IElNb2R1bGU7XG4gIGNvbnRyb2xsZXIobmFtZTogc3RyaW5nLCB0eXBlOiBhbnkpOiBJTW9kdWxlO1xuICBmYWN0b3J5KGtleTogc3RyaW5nLCBmYWN0b3J5Rm46IGFueSk6IElNb2R1bGU7XG4gIHZhbHVlKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogSU1vZHVsZTtcbiAgcnVuKGE6IGFueSk6IHZvaWQ7XG59XG5leHBvcnQgaW50ZXJmYWNlIElDb21waWxlU2VydmljZSB7XG4gIChlbGVtZW50OiBFbGVtZW50IHwgTm9kZUxpc3QgfCBzdHJpbmcsIHRyYW5zY2x1ZGU/OiBGdW5jdGlvbik6IElMaW5rRm47XG59XG5leHBvcnQgaW50ZXJmYWNlIElMaW5rRm4ge1xuICAoc2NvcGU6IElTY29wZSwgY2xvbmVBdHRhY2hGbj86IEZ1bmN0aW9uLCBvcHRpb25zPzogSUxpbmtGbk9wdGlvbnMpOiB2b2lkO1xufVxuZXhwb3J0IGludGVyZmFjZSBJTGlua0ZuT3B0aW9ucyB7XG4gIHBhcmVudEJvdW5kVHJhbnNjbHVkZUZuPzogRnVuY3Rpb247XG4gIHRyYW5zY2x1ZGVDb250cm9sbGVycz86IHtba2V5OiBzdHJpbmddOiBhbnl9O1xuICBmdXR1cmVQYXJlbnRFbGVtZW50PzogTm9kZTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSVJvb3RTY29wZVNlcnZpY2Uge1xuICAkbmV3KGlzb2xhdGU/OiBib29sZWFuKTogSVNjb3BlO1xuICAkaWQ6IHN0cmluZztcbiAgJHdhdGNoKGV4cHI6IGFueSwgZm4/OiAoYTE/OiBhbnksIGEyPzogYW55KSA9PiB2b2lkKTogRnVuY3Rpb247XG4gICRkZXN0cm95KCk6IGFueTtcbiAgJGFwcGx5KCk6IGFueTtcbiAgJGFwcGx5KGV4cDogc3RyaW5nKTogYW55O1xuICAkYXBwbHkoZXhwOiBGdW5jdGlvbik6IGFueTtcbiAgJCRjaGlsZFRhaWw6IElTY29wZTtcbiAgJCRjaGlsZEhlYWQ6IElTY29wZTtcbiAgJCRuZXh0U2libGluZzogSVNjb3BlO1xufVxuZXhwb3J0IGludGVyZmFjZSBJU2NvcGUgZXh0ZW5kcyBJUm9vdFNjb3BlU2VydmljZSB7fVxuZXhwb3J0IGludGVyZmFjZSBJQW5ndWxhckJvb3RzdHJhcENvbmZpZyB7fVxuZXhwb3J0IGludGVyZmFjZSBJRGlyZWN0aXZlIHtcbiAgY29tcGlsZT86IElEaXJlY3RpdmVDb21waWxlRm47XG4gIGNvbnRyb2xsZXI/OiBhbnk7XG4gIGNvbnRyb2xsZXJBcz86IHN0cmluZztcbiAgYmluZFRvQ29udHJvbGxlcj86IGJvb2xlYW4gfCBPYmplY3Q7XG4gIGxpbms/OiBJRGlyZWN0aXZlTGlua0ZuIHwgSURpcmVjdGl2ZVByZVBvc3Q7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIHByaW9yaXR5PzogbnVtYmVyO1xuICByZXBsYWNlPzogYm9vbGVhbjtcbiAgcmVxdWlyZT86IGFueTtcbiAgcmVzdHJpY3Q/OiBzdHJpbmc7XG4gIHNjb3BlPzogYW55O1xuICB0ZW1wbGF0ZT86IGFueTtcbiAgdGVtcGxhdGVVcmw/OiBhbnk7XG4gIHRlcm1pbmFsPzogYm9vbGVhbjtcbiAgdHJhbnNjbHVkZT86IGFueTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSURpcmVjdGl2ZUNvbXBpbGVGbiB7XG4gICh0ZW1wbGF0ZUVsZW1lbnQ6IElBdWdtZW50ZWRKUXVlcnksIHRlbXBsYXRlQXR0cmlidXRlczogSUF0dHJpYnV0ZXMsXG4gICB0cmFuc2NsdWRlOiBJVHJhbnNjbHVkZUZ1bmN0aW9uKTogSURpcmVjdGl2ZVByZVBvc3Q7XG59XG5leHBvcnQgaW50ZXJmYWNlIElEaXJlY3RpdmVQcmVQb3N0IHtcbiAgcHJlPzogSURpcmVjdGl2ZUxpbmtGbjtcbiAgcG9zdD86IElEaXJlY3RpdmVMaW5rRm47XG59XG5leHBvcnQgaW50ZXJmYWNlIElEaXJlY3RpdmVMaW5rRm4ge1xuICAoc2NvcGU6IElTY29wZSwgaW5zdGFuY2VFbGVtZW50OiBJQXVnbWVudGVkSlF1ZXJ5LCBpbnN0YW5jZUF0dHJpYnV0ZXM6IElBdHRyaWJ1dGVzLFxuICAgY29udHJvbGxlcjogYW55LCB0cmFuc2NsdWRlOiBJVHJhbnNjbHVkZUZ1bmN0aW9uKTogdm9pZDtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbXBvbmVudCB7XG4gIGJpbmRpbmdzPzogT2JqZWN0O1xuICBjb250cm9sbGVyPzogYW55O1xuICBjb250cm9sbGVyQXM/OiBzdHJpbmc7XG4gIHJlcXVpcmU/OiBhbnk7XG4gIHRlbXBsYXRlPzogYW55O1xuICB0ZW1wbGF0ZVVybD86IGFueTtcbiAgdHJhbnNjbHVkZT86IGFueTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSUF0dHJpYnV0ZXMgeyAkb2JzZXJ2ZShhdHRyOiBzdHJpbmcsIGZuOiAodjogc3RyaW5nKSA9PiB2b2lkKTogdm9pZDsgfVxuZXhwb3J0IGludGVyZmFjZSBJVHJhbnNjbHVkZUZ1bmN0aW9uIHtcbiAgLy8gSWYgdGhlIHNjb3BlIGlzIHByb3ZpZGVkLCB0aGVuIHRoZSBjbG9uZUF0dGFjaEZuIG11c3QgYmUgYXMgd2VsbC5cbiAgKHNjb3BlOiBJU2NvcGUsIGNsb25lQXR0YWNoRm46IElDbG9uZUF0dGFjaEZ1bmN0aW9uKTogSUF1Z21lbnRlZEpRdWVyeTtcbiAgLy8gSWYgb25lIGFyZ3VtZW50IGlzIHByb3ZpZGVkLCB0aGVuIGl0J3MgYXNzdW1lZCB0byBiZSB0aGUgY2xvbmVBdHRhY2hGbi5cbiAgKGNsb25lQXR0YWNoRm4/OiBJQ2xvbmVBdHRhY2hGdW5jdGlvbik6IElBdWdtZW50ZWRKUXVlcnk7XG59XG5leHBvcnQgaW50ZXJmYWNlIElDbG9uZUF0dGFjaEZ1bmN0aW9uIHtcbiAgLy8gTGV0J3MgaGludCBidXQgbm90IGZvcmNlIGNsb25lQXR0YWNoRm4ncyBzaWduYXR1cmVcbiAgKGNsb25lZEVsZW1lbnQ/OiBJQXVnbWVudGVkSlF1ZXJ5LCBzY29wZT86IElTY29wZSk6IGFueTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSUF1Z21lbnRlZEpRdWVyeSB7XG4gIGJpbmQobmFtZTogc3RyaW5nLCBmbjogKCkgPT4gdm9pZCk6IHZvaWQ7XG4gIGRhdGEobmFtZTogc3RyaW5nLCB2YWx1ZT86IGFueSk6IGFueTtcbiAgaW5oZXJpdGVkRGF0YShuYW1lOiBzdHJpbmcsIHZhbHVlPzogYW55KTogYW55O1xuICBjb250ZW50cygpOiBJQXVnbWVudGVkSlF1ZXJ5O1xuICBwYXJlbnQoKTogSUF1Z21lbnRlZEpRdWVyeTtcbiAgbGVuZ3RoOiBudW1iZXI7XG4gIFtpbmRleDogbnVtYmVyXTogTm9kZTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSVBhcnNlU2VydmljZSB7IChleHByZXNzaW9uOiBzdHJpbmcpOiBJQ29tcGlsZWRFeHByZXNzaW9uOyB9XG5leHBvcnQgaW50ZXJmYWNlIElDb21waWxlZEV4cHJlc3Npb24geyBhc3NpZ24oY29udGV4dDogYW55LCB2YWx1ZTogYW55KTogYW55OyB9XG5leHBvcnQgaW50ZXJmYWNlIElIdHRwQmFja2VuZFNlcnZpY2Uge1xuICAobWV0aG9kOiBzdHJpbmcsIHVybDogc3RyaW5nLCBwb3N0PzogYW55LCBjYWxsYmFjaz86IEZ1bmN0aW9uLCBoZWFkZXJzPzogYW55LCB0aW1lb3V0PzogbnVtYmVyLFxuICAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbik6IHZvaWQ7XG59XG5leHBvcnQgaW50ZXJmYWNlIElDYWNoZU9iamVjdCB7XG4gIHB1dDxUPihrZXk6IHN0cmluZywgdmFsdWU/OiBUKTogVDtcbiAgZ2V0KGtleTogc3RyaW5nKTogYW55O1xufVxuZXhwb3J0IGludGVyZmFjZSBJVGVtcGxhdGVDYWNoZVNlcnZpY2UgZXh0ZW5kcyBJQ2FjaGVPYmplY3Qge31cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbnRyb2xsZXJTZXJ2aWNlIHtcbiAgKGNvbnRyb2xsZXJDb25zdHJ1Y3RvcjogRnVuY3Rpb24sIGxvY2Fscz86IGFueSwgbGF0ZXI/OiBhbnksIGlkZW50PzogYW55KTogYW55O1xuICAoY29udHJvbGxlck5hbWU6IHN0cmluZywgbG9jYWxzPzogYW55KTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElJbmplY3RvclNlcnZpY2UgeyBnZXQoa2V5OiBzdHJpbmcpOiBhbnk7IH1cblxuZXhwb3J0IGludGVyZmFjZSBJVGVzdGFiaWxpdHlTZXJ2aWNlIHtcbiAgZmluZEJpbmRpbmdzKGVsZW1lbnQ6IEVsZW1lbnQsIGV4cHJlc3Npb246IHN0cmluZywgb3B0X2V4YWN0TWF0Y2g/OiBib29sZWFuKTogRWxlbWVudFtdO1xuICBmaW5kTW9kZWxzKGVsZW1lbnQ6IEVsZW1lbnQsIGV4cHJlc3Npb246IHN0cmluZywgb3B0X2V4YWN0TWF0Y2g/OiBib29sZWFuKTogRWxlbWVudFtdO1xuICBnZXRMb2NhdGlvbigpOiBzdHJpbmc7XG4gIHNldExvY2F0aW9uKHVybDogc3RyaW5nKTogdm9pZDtcbiAgd2hlblN0YWJsZShjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkO1xufVxuXG5mdW5jdGlvbiBub05nKCkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ0FuZ3VsYXJKUyB2MS54IGlzIG5vdCBsb2FkZWQhJyk7XG59XG5cbnZhciBhbmd1bGFyOlxuICAgIHtcbiAgICAgIGJvb3RzdHJhcDogKGU6IEVsZW1lbnQsIG1vZHVsZXM6IHN0cmluZ1tdLCBjb25maWc6IElBbmd1bGFyQm9vdHN0cmFwQ29uZmlnKSA9PiB2b2lkLFxuICAgICAgbW9kdWxlOiAocHJlZml4OiBzdHJpbmcsIGRlcGVuZGVuY2llcz86IHN0cmluZ1tdKSA9PiBJTW9kdWxlLFxuICAgICAgZWxlbWVudDogKGU6IEVsZW1lbnQpID0+IElBdWdtZW50ZWRKUXVlcnksXG4gICAgICB2ZXJzaW9uOiB7bWFqb3I6IG51bWJlcn0sIHJlc3VtZUJvb3RzdHJhcD86ICgpID0+IHZvaWQsXG4gICAgICBnZXRUZXN0YWJpbGl0eTogKGU6IEVsZW1lbnQpID0+IElUZXN0YWJpbGl0eVNlcnZpY2VcbiAgICB9ID0gPGFueT57XG4gICAgICBib290c3RyYXA6IG5vTmcsXG4gICAgICBtb2R1bGU6IG5vTmcsXG4gICAgICBlbGVtZW50OiBub05nLFxuICAgICAgdmVyc2lvbjogbm9OZyxcbiAgICAgIHJlc3VtZUJvb3RzdHJhcDogbm9OZyxcbiAgICAgIGdldFRlc3RhYmlsaXR5OiBub05nXG4gICAgfTtcblxuXG50cnkge1xuICBpZiAod2luZG93Lmhhc093blByb3BlcnR5KCdhbmd1bGFyJykpIHtcbiAgICBhbmd1bGFyID0gKDxhbnk+d2luZG93KS5hbmd1bGFyO1xuICB9XG59IGNhdGNoIChlKSB7XG4gIC8vIGlnbm9yZSBpbiBDSlMgbW9kZS5cbn1cblxuZXhwb3J0IHZhciBib290c3RyYXAgPSBhbmd1bGFyLmJvb3RzdHJhcDtcbmV4cG9ydCB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGU7XG5leHBvcnQgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQ7XG5leHBvcnQgdmFyIHZlcnNpb24gPSBhbmd1bGFyLnZlcnNpb247XG5leHBvcnQgdmFyIHJlc3VtZUJvb3RzdHJhcCA9IGFuZ3VsYXIucmVzdW1lQm9vdHN0cmFwO1xuZXhwb3J0IHZhciBnZXRUZXN0YWJpbGl0eSA9IGFuZ3VsYXIuZ2V0VGVzdGFiaWxpdHk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=