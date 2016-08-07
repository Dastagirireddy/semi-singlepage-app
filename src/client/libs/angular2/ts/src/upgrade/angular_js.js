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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3VwZ3JhZGUvYW5ndWxhcl9qcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7UUErR0ksT0FBTyxFQXFCRixDQUFDLEVBSUMsU0FBUyxFQUNULE1BQU0sRUFDTixPQUFPLEVBQ1AsT0FBTyxFQUNQLGVBQWUsRUFDZixjQUFjO0lBbEN6QjtRQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztJQUNuRCxDQUFDOzs7O1lBRUcsT0FBTyxHQU9FO2dCQUNQLFNBQVMsRUFBRSxJQUFJO2dCQUNmLE1BQU0sRUFBRSxJQUFJO2dCQUNaLE9BQU8sRUFBRSxJQUFJO2dCQUNiLE9BQU8sRUFBRSxJQUFJO2dCQUNiLGVBQWUsRUFBRSxJQUFJO2dCQUNyQixjQUFjLEVBQUUsSUFBSTthQUNyQixDQUFDO1lBR04sSUFBSSxDQUFDO2dCQUNILEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNyQyxPQUFPLEdBQVMsTUFBTyxDQUFDLE9BQU8sQ0FBQztnQkFDbEMsQ0FBQztZQUNILENBQUU7WUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRWIsQ0FBQztZQUVVLHVCQUFBLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFBLENBQUM7WUFDOUIsb0JBQUEsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUEsQ0FBQztZQUN4QixxQkFBQSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQSxDQUFDO1lBQzFCLHFCQUFBLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFBLENBQUM7WUFDMUIsNkJBQUEsZUFBZSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUEsQ0FBQztZQUMxQyw0QkFBQSxjQUFjLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQSxDQUFDIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3VwZ3JhZGUvYW5ndWxhcl9qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgSU1vZHVsZSB7XG4gIGNvbmZpZyhmbjogYW55KTogSU1vZHVsZTtcbiAgZGlyZWN0aXZlKHNlbGVjdG9yOiBzdHJpbmcsIGZhY3Rvcnk6IGFueSk6IElNb2R1bGU7XG4gIGNvbnRyb2xsZXIobmFtZTogc3RyaW5nLCB0eXBlOiBhbnkpOiBJTW9kdWxlO1xuICBmYWN0b3J5KGtleTogc3RyaW5nLCBmYWN0b3J5Rm46IGFueSk6IElNb2R1bGU7XG4gIHZhbHVlKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogSU1vZHVsZTtcbiAgcnVuKGE6IGFueSk6IHZvaWQ7XG59XG5leHBvcnQgaW50ZXJmYWNlIElDb21waWxlU2VydmljZSB7XG4gIChlbGVtZW50OiBFbGVtZW50IHwgTm9kZUxpc3QgfCBzdHJpbmcsIHRyYW5zY2x1ZGU/OiBGdW5jdGlvbik6IElMaW5rRm47XG59XG5leHBvcnQgaW50ZXJmYWNlIElMaW5rRm4ge1xuICAoc2NvcGU6IElTY29wZSwgY2xvbmVBdHRhY2hGbj86IEZ1bmN0aW9uLCBvcHRpb25zPzogSUxpbmtGbk9wdGlvbnMpOiB2b2lkO1xufVxuZXhwb3J0IGludGVyZmFjZSBJTGlua0ZuT3B0aW9ucyB7XG4gIHBhcmVudEJvdW5kVHJhbnNjbHVkZUZuPzogRnVuY3Rpb247XG4gIHRyYW5zY2x1ZGVDb250cm9sbGVycz86IHtba2V5OiBzdHJpbmddOiBhbnl9O1xuICBmdXR1cmVQYXJlbnRFbGVtZW50PzogTm9kZTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSVJvb3RTY29wZVNlcnZpY2Uge1xuICAkbmV3KGlzb2xhdGU/OiBib29sZWFuKTogSVNjb3BlO1xuICAkaWQ6IHN0cmluZztcbiAgJHdhdGNoKGV4cHI6IGFueSwgZm4/OiAoYTE/OiBhbnksIGEyPzogYW55KSA9PiB2b2lkKTogRnVuY3Rpb247XG4gICRhcHBseSgpOiBhbnk7XG4gICRhcHBseShleHA6IHN0cmluZyk6IGFueTtcbiAgJGFwcGx5KGV4cDogRnVuY3Rpb24pOiBhbnk7XG4gICQkY2hpbGRUYWlsOiBJU2NvcGU7XG4gICQkY2hpbGRIZWFkOiBJU2NvcGU7XG4gICQkbmV4dFNpYmxpbmc6IElTY29wZTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSVNjb3BlIGV4dGVuZHMgSVJvb3RTY29wZVNlcnZpY2Uge31cbmV4cG9ydCBpbnRlcmZhY2UgSUFuZ3VsYXJCb290c3RyYXBDb25maWcge31cbmV4cG9ydCBpbnRlcmZhY2UgSURpcmVjdGl2ZSB7XG4gIGNvbXBpbGU/OiBJRGlyZWN0aXZlQ29tcGlsZUZuO1xuICBjb250cm9sbGVyPzogYW55O1xuICBjb250cm9sbGVyQXM/OiBzdHJpbmc7XG4gIGJpbmRUb0NvbnRyb2xsZXI/OiBib29sZWFuIHwgT2JqZWN0O1xuICBsaW5rPzogSURpcmVjdGl2ZUxpbmtGbiB8IElEaXJlY3RpdmVQcmVQb3N0O1xuICBuYW1lPzogc3RyaW5nO1xuICBwcmlvcml0eT86IG51bWJlcjtcbiAgcmVwbGFjZT86IGJvb2xlYW47XG4gIHJlcXVpcmU/OiBhbnk7XG4gIHJlc3RyaWN0Pzogc3RyaW5nO1xuICBzY29wZT86IGFueTtcbiAgdGVtcGxhdGU/OiBhbnk7XG4gIHRlbXBsYXRlVXJsPzogYW55O1xuICB0ZXJtaW5hbD86IGJvb2xlYW47XG4gIHRyYW5zY2x1ZGU/OiBhbnk7XG59XG5leHBvcnQgaW50ZXJmYWNlIElEaXJlY3RpdmVDb21waWxlRm4ge1xuICAodGVtcGxhdGVFbGVtZW50OiBJQXVnbWVudGVkSlF1ZXJ5LCB0ZW1wbGF0ZUF0dHJpYnV0ZXM6IElBdHRyaWJ1dGVzLFxuICAgdHJhbnNjbHVkZTogSVRyYW5zY2x1ZGVGdW5jdGlvbik6IElEaXJlY3RpdmVQcmVQb3N0O1xufVxuZXhwb3J0IGludGVyZmFjZSBJRGlyZWN0aXZlUHJlUG9zdCB7XG4gIHByZT86IElEaXJlY3RpdmVMaW5rRm47XG4gIHBvc3Q/OiBJRGlyZWN0aXZlTGlua0ZuO1xufVxuZXhwb3J0IGludGVyZmFjZSBJRGlyZWN0aXZlTGlua0ZuIHtcbiAgKHNjb3BlOiBJU2NvcGUsIGluc3RhbmNlRWxlbWVudDogSUF1Z21lbnRlZEpRdWVyeSwgaW5zdGFuY2VBdHRyaWJ1dGVzOiBJQXR0cmlidXRlcyxcbiAgIGNvbnRyb2xsZXI6IGFueSwgdHJhbnNjbHVkZTogSVRyYW5zY2x1ZGVGdW5jdGlvbik6IHZvaWQ7XG59XG5leHBvcnQgaW50ZXJmYWNlIElBdHRyaWJ1dGVzIHsgJG9ic2VydmUoYXR0cjogc3RyaW5nLCBmbjogKHY6IHN0cmluZykgPT4gdm9pZCk6IHZvaWQ7IH1cbmV4cG9ydCBpbnRlcmZhY2UgSVRyYW5zY2x1ZGVGdW5jdGlvbiB7XG4gIC8vIElmIHRoZSBzY29wZSBpcyBwcm92aWRlZCwgdGhlbiB0aGUgY2xvbmVBdHRhY2hGbiBtdXN0IGJlIGFzIHdlbGwuXG4gIChzY29wZTogSVNjb3BlLCBjbG9uZUF0dGFjaEZuOiBJQ2xvbmVBdHRhY2hGdW5jdGlvbik6IElBdWdtZW50ZWRKUXVlcnk7XG4gIC8vIElmIG9uZSBhcmd1bWVudCBpcyBwcm92aWRlZCwgdGhlbiBpdCdzIGFzc3VtZWQgdG8gYmUgdGhlIGNsb25lQXR0YWNoRm4uXG4gIChjbG9uZUF0dGFjaEZuPzogSUNsb25lQXR0YWNoRnVuY3Rpb24pOiBJQXVnbWVudGVkSlF1ZXJ5O1xufVxuZXhwb3J0IGludGVyZmFjZSBJQ2xvbmVBdHRhY2hGdW5jdGlvbiB7XG4gIC8vIExldCdzIGhpbnQgYnV0IG5vdCBmb3JjZSBjbG9uZUF0dGFjaEZuJ3Mgc2lnbmF0dXJlXG4gIChjbG9uZWRFbGVtZW50PzogSUF1Z21lbnRlZEpRdWVyeSwgc2NvcGU/OiBJU2NvcGUpOiBhbnk7XG59XG5leHBvcnQgaW50ZXJmYWNlIElBdWdtZW50ZWRKUXVlcnkge1xuICBiaW5kKG5hbWU6IHN0cmluZywgZm46ICgpID0+IHZvaWQpOiB2b2lkO1xuICBkYXRhKG5hbWU6IHN0cmluZywgdmFsdWU/OiBhbnkpOiBhbnk7XG4gIGluaGVyaXRlZERhdGEobmFtZTogc3RyaW5nLCB2YWx1ZT86IGFueSk6IGFueTtcbiAgY29udGVudHMoKTogSUF1Z21lbnRlZEpRdWVyeTtcbiAgcGFyZW50KCk6IElBdWdtZW50ZWRKUXVlcnk7XG4gIGxlbmd0aDogbnVtYmVyO1xuICBbaW5kZXg6IG51bWJlcl06IE5vZGU7XG59XG5leHBvcnQgaW50ZXJmYWNlIElQYXJzZVNlcnZpY2UgeyAoZXhwcmVzc2lvbjogc3RyaW5nKTogSUNvbXBpbGVkRXhwcmVzc2lvbjsgfVxuZXhwb3J0IGludGVyZmFjZSBJQ29tcGlsZWRFeHByZXNzaW9uIHsgYXNzaWduKGNvbnRleHQ6IGFueSwgdmFsdWU6IGFueSk6IGFueTsgfVxuZXhwb3J0IGludGVyZmFjZSBJSHR0cEJhY2tlbmRTZXJ2aWNlIHtcbiAgKG1ldGhvZDogc3RyaW5nLCB1cmw6IHN0cmluZywgcG9zdD86IGFueSwgY2FsbGJhY2s/OiBGdW5jdGlvbiwgaGVhZGVycz86IGFueSwgdGltZW91dD86IG51bWJlcixcbiAgIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW4pOiB2b2lkO1xufVxuZXhwb3J0IGludGVyZmFjZSBJQ2FjaGVPYmplY3Qge1xuICBwdXQ8VD4oa2V5OiBzdHJpbmcsIHZhbHVlPzogVCk6IFQ7XG4gIGdldChrZXk6IHN0cmluZyk6IGFueTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSVRlbXBsYXRlQ2FjaGVTZXJ2aWNlIGV4dGVuZHMgSUNhY2hlT2JqZWN0IHt9XG5leHBvcnQgaW50ZXJmYWNlIElDb250cm9sbGVyU2VydmljZSB7XG4gIChjb250cm9sbGVyQ29uc3RydWN0b3I6IEZ1bmN0aW9uLCBsb2NhbHM/OiBhbnksIGxhdGVyPzogYW55LCBpZGVudD86IGFueSk6IGFueTtcbiAgKGNvbnRyb2xsZXJOYW1lOiBzdHJpbmcsIGxvY2Fscz86IGFueSk6IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJSW5qZWN0b3JTZXJ2aWNlIHsgZ2V0KGtleTogc3RyaW5nKTogYW55OyB9XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVRlc3RhYmlsaXR5U2VydmljZSB7XG4gIGZpbmRCaW5kaW5ncyhlbGVtZW50OiBFbGVtZW50LCBleHByZXNzaW9uOiBzdHJpbmcsIG9wdF9leGFjdE1hdGNoPzogYm9vbGVhbik6IEVsZW1lbnRbXTtcbiAgZmluZE1vZGVscyhlbGVtZW50OiBFbGVtZW50LCBleHByZXNzaW9uOiBzdHJpbmcsIG9wdF9leGFjdE1hdGNoPzogYm9vbGVhbik6IEVsZW1lbnRbXTtcbiAgZ2V0TG9jYXRpb24oKTogc3RyaW5nO1xuICBzZXRMb2NhdGlvbih1cmw6IHN0cmluZyk6IHZvaWQ7XG4gIHdoZW5TdGFibGUoY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZDtcbn1cblxuZnVuY3Rpb24gbm9OZygpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdBbmd1bGFySlMgdjEueCBpcyBub3QgbG9hZGVkIScpO1xufVxuXG52YXIgYW5ndWxhcjpcbiAgICB7XG4gICAgICBib290c3RyYXA6IChlOiBFbGVtZW50LCBtb2R1bGVzOiBzdHJpbmdbXSwgY29uZmlnOiBJQW5ndWxhckJvb3RzdHJhcENvbmZpZykgPT4gdm9pZCxcbiAgICAgIG1vZHVsZTogKHByZWZpeDogc3RyaW5nLCBkZXBlbmRlbmNpZXM/OiBzdHJpbmdbXSkgPT4gSU1vZHVsZSxcbiAgICAgIGVsZW1lbnQ6IChlOiBFbGVtZW50KSA9PiBJQXVnbWVudGVkSlF1ZXJ5LFxuICAgICAgdmVyc2lvbjoge21ham9yOiBudW1iZXJ9LCByZXN1bWVCb290c3RyYXA/OiAoKSA9PiB2b2lkLFxuICAgICAgZ2V0VGVzdGFiaWxpdHk6IChlOiBFbGVtZW50KSA9PiBJVGVzdGFiaWxpdHlTZXJ2aWNlXG4gICAgfSA9IDxhbnk+e1xuICAgICAgYm9vdHN0cmFwOiBub05nLFxuICAgICAgbW9kdWxlOiBub05nLFxuICAgICAgZWxlbWVudDogbm9OZyxcbiAgICAgIHZlcnNpb246IG5vTmcsXG4gICAgICByZXN1bWVCb290c3RyYXA6IG5vTmcsXG4gICAgICBnZXRUZXN0YWJpbGl0eTogbm9OZ1xuICAgIH07XG5cblxudHJ5IHtcbiAgaWYgKHdpbmRvdy5oYXNPd25Qcm9wZXJ0eSgnYW5ndWxhcicpKSB7XG4gICAgYW5ndWxhciA9ICg8YW55PndpbmRvdykuYW5ndWxhcjtcbiAgfVxufSBjYXRjaCAoZSkge1xuICAvLyBpZ25vcmUgaW4gQ0pTIG1vZGUuXG59XG5cbmV4cG9ydCB2YXIgYm9vdHN0cmFwID0gYW5ndWxhci5ib290c3RyYXA7XG5leHBvcnQgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlO1xuZXhwb3J0IHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50O1xuZXhwb3J0IHZhciB2ZXJzaW9uID0gYW5ndWxhci52ZXJzaW9uO1xuZXhwb3J0IHZhciByZXN1bWVCb290c3RyYXAgPSBhbmd1bGFyLnJlc3VtZUJvb3RzdHJhcDtcbmV4cG9ydCB2YXIgZ2V0VGVzdGFiaWxpdHkgPSBhbmd1bGFyLmdldFRlc3RhYmlsaXR5O1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9