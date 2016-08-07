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
    var core_1;
    var BrowserXhr;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            /**
             * A backend for http that uses the `XMLHttpRequest` browser API.
             *
             * Take care not to evaluate this in non-browser contexts.
             */
            BrowserXhr = (function () {
                function BrowserXhr() {
                }
                BrowserXhr.prototype.build = function () { return (new XMLHttpRequest()); };
                BrowserXhr = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], BrowserXhr);
                return BrowserXhr;
            }());
            exports_1("BrowserXhr", BrowserXhr);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9odHRwL2JhY2tlbmRzL2Jyb3dzZXJfeGhyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBRUE7Ozs7ZUFJRztZQUVIO2dCQUNFO2dCQUFlLENBQUM7Z0JBQ2hCLDBCQUFLLEdBQUwsY0FBZSxNQUFNLENBQU0sQ0FBQyxJQUFJLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUh0RDtvQkFBQyxpQkFBVSxFQUFFOzs4QkFBQTtnQkFJYixpQkFBQztZQUFELENBSEEsQUFHQyxJQUFBO1lBSEQsbUNBR0MsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvaHR0cC9iYWNrZW5kcy9icm93c2VyX3hoci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5cbi8qKlxuICogQSBiYWNrZW5kIGZvciBodHRwIHRoYXQgdXNlcyB0aGUgYFhNTEh0dHBSZXF1ZXN0YCBicm93c2VyIEFQSS5cbiAqXG4gKiBUYWtlIGNhcmUgbm90IHRvIGV2YWx1YXRlIHRoaXMgaW4gbm9uLWJyb3dzZXIgY29udGV4dHMuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCcm93c2VyWGhyIHtcbiAgY29uc3RydWN0b3IoKSB7fVxuICBidWlsZCgpOiBhbnkgeyByZXR1cm4gPGFueT4obmV3IFhNTEh0dHBSZXF1ZXN0KCkpOyB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
