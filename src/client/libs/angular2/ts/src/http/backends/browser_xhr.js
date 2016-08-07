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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2h0dHAvYmFja2VuZHMvYnJvd3Nlcl94aHIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFFQTs7OztlQUlHO1lBRUg7Z0JBQ0U7Z0JBQWUsQ0FBQztnQkFDaEIsMEJBQUssR0FBTCxjQUFlLE1BQU0sQ0FBTSxDQUFDLElBQUksY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBSHREO29CQUFDLGlCQUFVLEVBQUU7OzhCQUFBO2dCQUliLGlCQUFDO1lBQUQsQ0FIQSxBQUdDLElBQUE7WUFIRCxtQ0FHQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2h0dHAvYmFja2VuZHMvYnJvd3Nlcl94aHIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuXG4vKipcbiAqIEEgYmFja2VuZCBmb3IgaHR0cCB0aGF0IHVzZXMgdGhlIGBYTUxIdHRwUmVxdWVzdGAgYnJvd3NlciBBUEkuXG4gKlxuICogVGFrZSBjYXJlIG5vdCB0byBldmFsdWF0ZSB0aGlzIGluIG5vbi1icm93c2VyIGNvbnRleHRzLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQnJvd3NlclhociB7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgYnVpbGQoKTogYW55IHsgcmV0dXJuIDxhbnk+KG5ldyBYTUxIdHRwUmVxdWVzdCgpKTsgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
